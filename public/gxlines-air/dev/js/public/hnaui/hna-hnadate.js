/**

 @Name : hnadate v1.1 日期控件
 @Author: 贤心
 @Date: 2014-06-25

 */

hnaui.define(function (exports) {
    "use strict";

    var win = window;

    var isPc = true;

    //全局配置，如果采用默认均不需要改动
    var config = {
        path: '', //hnadate所在路径
        skin: 'default', //初始化皮肤
        format: 'YYYY-MM-DD', //日期格式
        min: '1900-01-01 00:00:00', //最小日期
        max: '2099-12-31 23:59:59', //最大日期
        isv: false,
        init: true,  //初始化的时候是否给文本框赋值
        adaptation: true   //是否适配文本框的宽度
    };

    var Dates = {}, doc = document, creats = 'createElement', byid = 'getElementById', tags = 'getElementsByTagName',
        bcns = "getElementsByClassName";
    var as = ['hnadate_box', 'hnadate_void', 'hnadate_click', 'hnadateSkin', 'skins/', '/hnadate.css', 'hnaui-anim', 'hnaui-anim-upbit', 'hnadate_table'];


    //主接口
    win.hnadate = function (options) {
        options = options || {};
        options.istoday = false;
        isPc = _isPC();
        if (!isPc) {
            document.activeElement.blur();
            //debugger;
            if (options.dateType == "searchFlight") {
                Dates.mobileRun(options);
            } else {
                if (!doc[bcns]('hnadate-mobile-all')[0]) {
                    Dates.DateM = Dates.FormatData(options);
                    Dates.mobileAll(options);
                }

            }
        } else {
            Dates.run(options);
        }
        return hnadate;
    };

    hnadate.v = '1.1';

    Dates.trim = function (str) {
        str = (str + "") || '';
        return str.replace(/^\s|\s$/g, '').replace(/\s+/g, ' ');
    };

    //补齐数位
    Dates.digit = function (num) {
        return num < 10 ? '0' + (num | 0) : num;
    };

    Dates.stopmp = function (e) {
        e = e || win.event;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        return this;
    };

    Dates.each = function (arr, fn) {
        var i = 0, len = arr.length;
        for (; i < len; i++) {
            if (fn(i, arr[i]) === false) {
                break;
            }
        }
    };

    Dates.hasClass = function (elem, cls) {
        elem = elem || {};
        return new RegExp('\\b' + cls + '\\b').test(elem.className);
    };

    Dates.addClass = function (elem, cls) {
        elem = elem || {};
        Dates.hasClass(elem, cls) || (elem.className += ' ' + cls);
        elem.className = Dates.trim(elem.className);
        return this;
    };

    Dates.removeClass = function (elem, cls) {
        elem = elem || {};
        if (Dates.hasClass(elem, cls)) {
            var reg = new RegExp('\\b' + cls + '\\b');
            elem.className = (elem.className + "").replace(reg, '');
        }
        return this;
    };

    //清除css属性
    Dates.removeCssAttr = function (elem, attr) {
        var s = elem.style;
        if (s.removeProperty) {
            s.removeProperty(attr);
        } else {
            s.removeAttribute(attr);
        }
    };

    //显示隐藏
    Dates.shde = function (elem, type) {
        elem.style.display = type ? 'none' : 'block';
    };

    //简易选择器
    Dates.query = function (node) {
        if (node && node.nodeType === 1) {
            if (node.tagName.toLowerCase() !== 'input') {
                throw new Error('选择器elem错误');
            }
            return node;
        }

        var node = (Dates.trim(node)).split(' '), elemId = doc[byid](node[0].substr(1)), arr;
        if (!elemId) {
            return;
        } else if (!node[1]) {
            return elemId;
        } else if (/^\./.test(node[1])) {
            var find, child = node[1].substr(1), exp = new RegExp('\\b' + child + '\\b');
            arr = []
            find = doc.getElementsByClassName ? elemId.getElementsByClassName(child) : elemId[tags]('*');
            Dates.each(find, function (ii, that) {
                exp.test(that.className) && arr.push(that);
            });
            return arr[0] ? arr : '';
        } else {
            arr = elemId[tags](node[1]);
            return arr[0] ? elemId[tags](node[1]) : '';
        }
    };

    //事件监听器
    Dates.on = function (elem, even, fn) {
        elem.attachEvent ? elem.attachEvent('on' + even, function () {
            fn.call(elem, win.even);
        }) : elem.addEventListener(even, fn, false);
        return Dates;
    };

    //阻断mouseup
    Dates.stopMosup = function (evt, elem) {
        if (evt !== 'mouseup') {
            Dates.on(elem, 'mouseup', function (ev) {
                Dates.stopmp(ev);
            });
        }
    };
    //获取光标位置
    Dates.getLinePos = function (ctrl) {//获取光标位置,参数为目标元素
        var carePos = 0;
        if (document.selection) {//ie支持
            ctrl.focus();
            var sel = document.selection.createRange();
            sel.moveStart("character", -ctrl.value.length);
            carePos = sel.text.length;
        } else if (ctrl.selectionStart || ctrl.selectionStart == 0) {
            carePos = ctrl.selectionStart;
        }
        return carePos;
    }
    //设置光标位置
    function setLinePos(ctrl, pos) {//设置光标位置函数
        if (ctrl.setSelectionRange) {
            ctrl.focus();
            ctrl.setSelectionRange(pos, pos);
        }
        else if (ctrl.createTextRange) {
            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    Dates.run = function (options) {//初始化日期控件函数
        var S = Dates.query, elem = options.elem, devt;
        var numPos = 0;//存储按下的数字;
        var linePos = 0;//光标所在文本框的位置;
        elem.onkeydown = function (e) {
            linePos = Dates.getLinePos(elem);//存储按下时的光标位置;
            var countStr = 0;//统计光标前的非数字个数;
            for (var i = 0; i < linePos; i++) {
                if (isNaN(elem.value[i]) || elem.value[i] == " ") countStr++;
            }
            var vi = linePos - countStr;//应替换掉的数字的下标;
            Dates.reshow();//清除提示
            if (!Dates.elem) {
                Dates.elem = elem;//防止拖拽选择时为null;
            }
            e = e || window.event;
            window.event ? e.cancelBubble = true : e.stopPropagation();
            var code = e.keyCode || e.which;
            //将按下的数字存入numPOS中
            switch (code) {
                case 96 :
                case 48 :
                    numPos = 0;
                    break;
                case 97 :
                case 49 :
                    numPos = 1;
                    break;
                case 98 :
                case 50 :
                    numPos = 2;
                    break;
                case 99 :
                case 51 :
                    numPos = 3;
                    break;
                case 100 :
                case 52 :
                    numPos = 4;
                    break;
                case 101 :
                case 53 :
                    numPos = 5;
                    break;
                case 102 :
                case 54 :
                    numPos = 6;
                    break;
                case 103 :
                case 55 :
                    numPos = 7;
                    break;
                case 104 :
                case 56 :
                    numPos = 8;
                    break;
                case 105 :
                case 57 :
                    numPos = 9;
                    break;
            }
            var val = elem.value,
                min = Dates.mins,
                max = Dates.maxs;
            val = (val + "").replace(/[^0-9]/ig, "");//清除非数字;
            var len = val.length;
            var valMon = val.slice(4, 6),//获取输入的月份;
                valDate = val.slice(6, 8),//获取日期;
                valYear = val.slice(0, 4);//获取输入的年份;
            valYear = parseInt(valYear) || 0;
            valMon = parseInt(valMon) || 0;
            valDate = parseInt(valDate) || 0;
            if (code == 13) {//如果按下回车键且格式正常
                //Dates.check() || Dates.close();
            } else {
                Dates.shde(Dates.box);//文本框输入时显示日期控件;
            }
            if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) {//如果输入数字
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                if (len < 8 && vi >= len) {//如果光标在日期的后面;
                    if (len < 4) {//输入年份阶段
                        elem.value = val + numPos;
                        //年份输完日历显示
                        Dates.viewDate(valYear, min[1] - 1, min[2]);
                    } else if (len == 4 && ((code >= 50 && code <= 57) || code >= 98)) {//用户开始输入月份且大于1
                        elem.value = val.slice(0, 4) + "-" + 0 + numPos;
                        Dates.viewDate(valYear, numPos - 1, min[2]);
                    } else if (len == 4) {//正常输入
                        elem.value = val.slice(0, 4) + "-" + numPos;
                    } else if (len == 5 && val[4] == 1 && ((code > 50 && code <= 57) || code > 98)) {//默认显示一月
                        elem.value = val.slice(0, 4) + "-" + 0 + 1;
                        Dates.viewDate(valYear, 0, min[2])
                    } else if (len == 5 && val[4] == 0 && (code == 48 || code == 96)) {//月份00默认显示一月
                        elem.value = val.slice(0, 4) + "-" + 0 + 1;
                        Dates.viewDate(valYear, 0, min[2])
                    } else if (len == 5 && val[4] == 0) {//月份0-9
                        elem.value = val.slice(0, 4) + "-" + 0 + numPos;
                        Dates.viewDate(valYear, numPos, min[2])
                    } else if (len == 5 && val[4] == 1) {//月份10-12
                        elem.value = val.slice(0, 4) + "-" + 1 + numPos;
                        Dates.viewDate(valYear, 10 + numPos, min[2])
                    }
                    else if (len == 6 && ((code > 51 && code <= 57) || code > 99)) {//输入日期且大于3
                        elem.value = val.slice(0, 4) + "-" + val.slice(4, 6) + "-" + 0 + numPos;
                        Dates.viewDate(valYear, valMon - 1, numPos);
                    } else if (len == 6 && valMon == 2 && ((code > 50 && code <= 57) || code > 98)) {//月份为2时输入日期大于2
                        elem.value = val.slice(0, 4) + "-" + val.slice(4, 6) + "-" + 0 + numPos;
                        Dates.viewDate(valYear, valMon - 1, numPos);
                    } else if (len == 7 && val[6] == 3 && ((code > 49 && code <= 57) || code > 97)) {//输入日期大于31时
                        elem.value = val.slice(0, 4) + "-" + val.slice(4, 6) + "-" + 0 + 3;
                        Dates.viewDate(valYear, valMon - 1, 3);
                    } else if (len == 7 && val[6] == 0 && (code == 48 || code == 96)) {//日期为00默认显示1
                        elem.value = val.slice(0, 4) + "-" + val.slice(4, 6) + "-" + 0 + 1;
                        Dates.viewDate(valYear, valMon - 1, 1);
                    }
                    else if (len == 6) {//正常输入
                        elem.value = val.slice(0, 4) + "-" + val.slice(4, 6) + "-" + numPos;
                    } else if (len == 7) {
                        elem.value = val.slice(0, 4) + "-" + val.slice(4, 6) + "-" + val[6] + numPos;
                        Dates.viewDate(valYear, valMon - 1, (val[6] + numPos) * 1);
                    } else {//防止插入修改后格式乱掉
                        val = val.slice(0) + numPos;
                        var valM = val.slice(4, 6),
                            valD = val.slice(6, 8);
                        valM = valM == 0 ? "01" : (valM > 12 ? "0" + numPos : valM);
                        valD = valD == 0 ? "01" : (valD > 31 ? "0" + numPos : valD);
                        if (val.length > 6) {
                            elem.value = val.slice(0, 4) + "-" + valM + "-" + valD;
                            Dates.viewDate(val.slice(0, 4) * 1, valM * 1 - 1, valD * 1);
                        } else if (val.length > 4 && val.length <= 6) {
                            elem.value = val.slice(0, 4) + "-" + valM;
                            Dates.viewDate(val.slice(0, 4) * 1, valM * 1 - 1, min[2]);
                        } else {
                            elem.value = val.slice(0, 4);
                        }
                    }
                } else if (len == 8) {//数字长度为8
                    val = val.slice(0, vi) + numPos + val.slice(vi + 1);
                    var valM = val.slice(4, 6),
                        valD = val.slice(6, 8);
                    var pos = 0;//设置光标的下标;
                    var viA = vi < 4 ? vi : (vi == 4 || vi == 5 ? vi + 1 : vi + 2);
                    if (vi == 3 || vi == 5) {
                        pos = viA + 2;
                    } else if (vi == 4 && (valM >= 12 || valM == 0)) {
                        pos = viA + 3;
                    } else if (vi == 6 && (valD >= 31 || valD == 0)) {
                        pos = viA + 2;
                    } else {
                        pos = viA + 1;
                    }
                    valM = valM == 0 ? "01" : (valM > 12 ? "0" + numPos : valM);
                    valD = valD == 0 ? "01" : (valD > 31 ? "0" + numPos : valD);
                    elem.value = val.slice(0, 4) + "-" + valM + "-" + valD;
                    setLinePos(elem, pos);//设置光标位置
                    Dates.viewDate(val.slice(0, 4) * 1, valM * 1 - 1, valD * 1);
                } else if (len < 8 && vi < len) {//数字长度小于8且光标在中间
                    val = val.slice(0, vi) + numPos + val.slice(vi);
                    var valM = val.slice(4, 6),
                        valD = val.slice(6, 8);
                    var pos = 0;//设置光标的下标;
                    var viA = vi < 4 ? vi : (vi == 4 || vi == 5 ? vi + 1 : vi + 2);
                    if (vi == 3 || vi == 5) {
                        pos = viA + 2;
                    } else if (vi == 4 && (valM >= 12 || valM == 0)) {
                        pos = viA + 3;
                    } else if (vi == 6 && (valD >= 31 || valD == 0)) {
                        pos = viA + 2;
                    } else {
                        pos = viA + 1;
                    }
                    valM = valM === "00" ? "01" : (valM > 12 ? "0" + val[4] : valM);
                    valD = valD === "00" ? "01" : (valD > 31 ? "0" + val[6] : valD);
                    if (val.length > 6) {
                        elem.value = val.slice(0, 4) + "-" + valM + "-" + valD;
                        Dates.viewDate(val.slice(0, 4) * 1, valM * 1 - 1, valD * 1);
                    } else if (val.length > 4 && val.length <= 6) {
                        elem.value = val.slice(0, 4) + "-" + valM;
                        Dates.viewDate(val.slice(0, 4) * 1, valM * 1 - 1, min[2]);
                    } else {
                        elem.value = val.slice(0, 4);
                    }
                    setLinePos(elem, pos);//设置光标位置
                }

            }
        }
        if (!elem) return;

        as.elemv = /textarea|input/.test(elem.tagName.toLocaleLowerCase()) ? 'value' : 'innerHTML';
        if (('init' in options ? options.init : config.init) && (!elem[as.elemv])) elem[as.elemv] = hnadate.now(null, options.format || config.format);

        Dates.view(elem, options);
        Dates.reshow();

    };

    Dates.scroll = function (type) {
        type = type ? 'scrollLeft' : 'scrollTop';
        return doc.body[type] | doc.documentElement[type];
    };

    Dates.winarea = function (type) {
        return document.documentElement[type ? 'clientWidth' : 'clientHeight']
    };

    //判断闰年
    Dates.isleap = function (year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    //检测是否在有效期
    Dates.checkVoid = function (YY, MM, DD) {
        var back = [];
        YY = YY | 0;
        MM = MM | 0;
        DD = DD | 0;
        if (YY < Dates.mins[0]) {
            back = ['y'];
        } else if (YY > Dates.maxs[0]) {
            back = ['y', 1];
        } else if (YY >= Dates.mins[0] && YY <= Dates.maxs[0]) {
            if (YY == Dates.mins[0]) {
                if (MM < Dates.mins[1]) {
                    back = ['m'];
                } else if (MM == Dates.mins[1]) {
                    if (DD < Dates.mins[2]) {
                        back = ['d'];
                    }
                }
            }
            if (YY == Dates.maxs[0]) {
                if (MM > Dates.maxs[1]) {
                    back = ['m', 1];
                } else if (MM == Dates.maxs[1]) {
                    if (DD > Dates.maxs[2]) {
                        back = ['d', 1];
                    }
                }
            }
        }
        return back;
    };

    //时分秒的有效检测
    Dates.timeVoid = function (times, index) {
        if (Dates.ymd[1] + 1 == Dates.mins[1] && Dates.ymd[2] == Dates.mins[2]) {
            if (index === 0 && (times < Dates.mins[3])) {
                return 1;
            } else if (index === 1 && times < Dates.mins[4]) {
                return 1;
            } else if (index === 2 && times < Dates.mins[5]) {
                return 1;
            }
        } else if (Dates.ymd[1] + 1 == Dates.maxs[1] && Dates.ymd[2] == Dates.maxs[2]) {
            if (index === 0 && times > Dates.maxs[3]) {
                return 1;
            } else if (index === 1 && times > Dates.maxs[4]) {
                return 1;
            } else if (index === 2 && times > Dates.maxs[5]) {
                return 1;
            }
        }
        if (times > (index ? 59 : 23)) {
            return 1;
        }
    };

    //检测日期是否合法
    Dates.check = function () {
        var reg = (Dates.options.format + "").replace(/YYYY|MM|DD|hh|mm|ss/g, '\\d+\\').replace(/\\$/g, '');
        var exp = new RegExp(reg), value = Dates.elem[as.elemv] + "";
        var arr = value.match(/\d+/g) || [], isvoid = Dates.checkVoid(arr[0], arr[1], arr[2]);
        if (value.replace(/\s/g, '') !== '') {
            if (!exp.test(value)) {
                Dates.elem[as.elemv] = '';
                Dates.msg('日期不符合格式，请重新选择。');
                return 1;
            } else if (isvoid[0]) {
                Dates.elem[as.elemv] = '';
                Dates.msg('日期不在有效期内，请重新选择。');
                return 1;
            } else {
                isvoid.value = Dates.elem[as.elemv].match(exp).join();
                arr = isvoid.value.match(/\d+/g);
                if (arr[1] < 1) {
                    arr[1] = 1;
                    isvoid.auto = 1;
                } else if (arr[1] > 12) {
                    arr[1] = 12;
                    isvoid.auto = 1;
                } else if (arr[1].length < 2) {
                    isvoid.auto = 1;
                }
                if (arr[2] < 1) {
                    arr[2] = 1;
                    isvoid.auto = 1;
                } else if (arr[2] > Dates.months[(arr[1] | 0) - 1]) {
                    arr[2] = 31;
                    isvoid.auto = 1;
                } else if (arr[2].length < 2) {
                    isvoid.auto = 1;
                }
                if (arr.length > 3) {
                    if (Dates.timeVoid(arr[3], 0)) {
                        isvoid.auto = 1;
                    }
                    ;
                    if (Dates.timeVoid(arr[4], 1)) {
                        isvoid.auto = 1;
                    }
                    ;
                    if (Dates.timeVoid(arr[5], 2)) {
                        isvoid.auto = 1;
                    }
                    ;
                }
                if (isvoid.auto) {
                    Dates.creation([arr[0], arr[1] | 0, arr[2] | 0], 1);
                } else if (isvoid.value !== Dates.elem[as.elemv]) {
                    Dates.elem[as.elemv] = isvoid.value;
                }
            }
        }
    };

    //生成日期
    Dates.months = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    Dates.viewDate = function (Y, M, D) {
        var S = Dates.query, log = {}, De = new Date();
        Y < (Dates.mins[0] | 0) && (Y = (Dates.mins[0] | 0));
        Y > (Dates.maxs[0] | 0) && (Y = (Dates.maxs[0] | 0));

        De.setFullYear(Y, M, D);
        log.ymd = [De.getFullYear(), De.getMonth(), De.getDate()];

        Dates.months[1] = Dates.isleap(log.ymd[0]) ? 29 : 28;

        De.setFullYear(log.ymd[0], log.ymd[1], 1);
        log.FDay = De.getDay();

        log.PDay = Dates.months[M === 0 ? 11 : M - 1] - log.FDay + 1;
        log.NDay = 1;

        //渲染日
        Dates.each(as.tds, function (i, elem) {
            var YY = log.ymd[0], MM = log.ymd[1] + 1, DD;
            elem.className = '';
            if (i < log.FDay) {
                elem.innerHTML = DD = i + log.PDay;
                Dates.addClass(elem, 'hnadate_nothis');
                MM === 1 && (YY -= 1);
                MM = MM === 1 ? 12 : MM - 1;
            } else if (i >= log.FDay && i < log.FDay + Dates.months[log.ymd[1]]) {
                elem.innerHTML = DD = i - log.FDay + 1;
                if (i - log.FDay + 1 === log.ymd[2]) {
                    Dates.addClass(elem, as[2]);
                    log.thisDay = elem;
                }
            } else {
                elem.innerHTML = DD = log.NDay++;
                Dates.addClass(elem, 'hnadate_nothis');
                MM === 12 && (YY += 1);
                MM = MM === 12 ? 1 : MM + 1;
            }

            if (Dates.checkVoid(YY, MM, DD)[0]) {
                Dates.addClass(elem, as[1]);
            }

            Dates.options.festival && Dates.festival(elem, MM + '.' + DD);
            elem.setAttribute('y', YY);
            elem.setAttribute('m', MM);
            elem.setAttribute('d', DD);
            YY = MM = DD = null;
        });

        Dates.valid = !Dates.hasClass(log.thisDay, as[1]);
        Dates.ymd = log.ymd;

        //锁定年月
        as.year.value = Dates.ymd[0] + '年';
        as.month.value = Dates.digit(Dates.ymd[1] + 1) + '月';

        //定位月
        Dates.each(as.mms, function (i, elem) {
            var getCheck = Dates.checkVoid(Dates.ymd[0], (elem.getAttribute('m') | 0) + 1);
            if (getCheck[0] === 'y' || getCheck[0] === 'm') {
                Dates.addClass(elem, as[1]);
            } else {
                Dates.removeClass(elem, as[1]);
            }
            Dates.removeClass(elem, as[2]);
            getCheck = null
        });
        Dates.addClass(as.mms[Dates.ymd[1]], as[2]);

        //定位时分秒
        log.times = [
            Dates.inymd[3] | 0 || 0,
            Dates.inymd[4] | 0 || 0,
            Dates.inymd[5] | 0 || 0
        ];
        Dates.each(new Array(3), function (i) {
            Dates.hmsin[i].value = Dates.digit(Dates.timeVoid(log.times[i], i) ? Dates.mins[i + 3] | 0 : log.times[i] | 0);
        });

        //确定按钮状态
        Dates[Dates.valid ? 'removeClass' : 'addClass'](as.ok, as[1]);
    };

    //节日
    Dates.festival = function (td, md) {
        var str;
        switch (md) {
            case '1.1':
                str = '元旦';
                break;
            case '3.8':
                str = '妇女';
                break;
            case '4.5':
                str = '清明';
                break;
            case '5.1':
                str = '劳动';
                break;
            case '6.1':
                str = '儿童';
                break;
            case '9.10':
                str = '教师';
                break;
            case '10.1':
                str = '国庆';
                break;
        }
        ;
        str && (td.innerHTML = str);
        str = null;
    };

    //生成年列表
    Dates.viewYears = function (YY) {
        var S = Dates.query, str = '';
        Dates.each(new Array(14), function (i) {
            if (i === 7) {
                str += '<li ' + (parseInt(as.year.value) === YY ? 'class="' + as[2] + '"' : '') + ' y="' + YY + '">' + YY + '年</li>';
            } else {
                str += '<li y="' + (YY - 7 + i) + '">' + (YY - 7 + i) + '年</li>';
            }
        });
        S('#hnadate_ys').innerHTML = str;
        Dates.each(S('#hnadate_ys li'), function (i, elem) {
            if (Dates.checkVoid(elem.getAttribute('y'))[0] === 'y') {
                Dates.addClass(elem, as[1]);
            } else {
                Dates.on(elem, 'click', function (ev) {
                    Dates.stopmp(ev).reshow();
                    Dates.viewDate(this.getAttribute('y') | 0, Dates.ymd[1], Dates.ymd[2]);
                });
            }
        });
    };

    //初始化面板数据
    Dates.initDate = function () {
        var S = Dates.query, log = {}, De = new Date();
        var ymd = Dates.elem[as.elemv].match(/\d+/g) || [];
        if (ymd.length < 3) {
            ymd = Dates.options.start.match(/\d+/g) || [];
            if (ymd.length < 3) {
                ymd = [De.getFullYear(), De.getMonth() + 1, De.getDate()];
            }
        }
        Dates.inymd = ymd;
        Dates.viewDate(ymd[0], ymd[1] - 1, ymd[2]);
    };

    //是否显示零件
    Dates.iswrite = function () {
        var S = Dates.query, log = {
            time: S('#hnadate_hms')
        };
        Dates.shde(log.time, !Dates.options.istime);
        Dates.shde(as.oclear, !('isclear' in Dates.options ? Dates.options.isclear : 1));
        Dates.shde(as.otoday, !('istoday' in Dates.options ? Dates.options.istoday : 1));
        Dates.shde(as.ok, !('issure' in Dates.options ? Dates.options.issure : 1));
    };

    //方位辨别
    Dates.orien = function (obj, pos) {
        var tops, rect = Dates.elem.getBoundingClientRect();
        obj.style.left = rect.left + (pos ? 0 : Dates.scroll(1)) + 'px';
        if (rect.bottom + obj.offsetHeight / 1.5 <= Dates.winarea()) {
            tops = rect.bottom - 1;
        } else {
            tops = rect.top > obj.offsetHeight / 1.5 ? rect.top - obj.offsetHeight + 1 : Dates.winarea() - obj.offsetHeight;
        }
        tops += 7;
        obj.style.top = Math.max(tops + (pos ? 0 : Dates.scroll()), 1) + 'px';
    };

    //吸附定位
    Dates.follow = function (obj) {
        if (Dates.options.fixed) {
            obj.style.position = 'fixed';
            Dates.orien(obj, 1);
        } else {
            obj.style.position = 'absolute';
            Dates.orien(obj);
        }
    };

    //生成表格
    Dates.viewtb = (function () {
        var tr, view = [], weeks = ['日', '一', '二', '三', '四', '五', '六'];
        var log = {}, table = doc[creats]('table'), thead = doc[creats]('thead');
        thead.appendChild(doc[creats]('tr'));
        log.creath = function (i) {
            var th = doc[creats]('th');
            th.innerHTML = weeks[i];
            thead[tags]('tr')[0].appendChild(th);
            th = null;
        };

        Dates.each(new Array(6), function (i) {
            view.push([]);
            tr = table.insertRow(0);
            Dates.each(new Array(7), function (j) {
                view[i][j] = 0;
                i === 0 && log.creath(j);
                tr.insertCell(j);
            });
        });

        table.insertBefore(thead, table.children[0]);
        table.id = table.className = as[8];
        tr = view = null;
        return table.outerHTML.toLowerCase();
    }());

    //渲染控件骨架
    Dates.view = function (elem, options) {
        var S = Dates.query, div, log = {};
        options = options || elem;

        Dates.elem = elem;
        Dates.options = options;
        Dates.options.format || (Dates.options.format = config.format);
        Dates.options.start = Dates.options.start || '';
        Dates.mm = log.mm = [Dates.options.min || config.min, Dates.options.max || config.max];
        Dates.mins = log.mm[0].match(/\d+/g);
        Dates.maxs = log.mm[1].match(/\d+/g);

        if (!Dates.box) {
            div = doc[creats]('div');
            div.id = as[0];
            div.className = as[0] + " " + as[6] + " " + as[7];
            div.style.cssText = 'position: absolute;';
            div.setAttribute('name', 'hnadate-v' + hnadate.v);

            div.innerHTML = log.html = '<div class="hnadate_top">'
                + '<div class="hnadate_ym hnadate_y" id="hnadate_YY">'
                + '<a class="hnadate_choose hnadate_chprev hnadate_tab"><cite></cite></a>'
                + '<input id="hnadate_y" readonly><label></label>'
                + '<a class="hnadate_choose hnadate_chnext hnadate_tab"><cite></cite></a>'
                + '<div class="hnadate_yms">'
                + '<a class="hnadate_tab hnadate_chtop"><cite></cite></a>'
                + '<ul id="hnadate_ys"></ul>'
                + '<a class="hnadate_tab hnadate_chdown"><cite></cite></a>'
                + '</div>'
                + '</div>'
                + '<div class="hnadate_ym hnadate_m" id="hnadate_MM">'
                + '<a class="hnadate_choose hnadate_chprev hnadate_tab"><cite></cite></a>'
                + '<input id="hnadate_m" readonly><label></label>'
                + '<a class="hnadate_choose hnadate_chnext hnadate_tab"><cite></cite></a>'
                + '<div class="hnadate_yms" id="hnadate_ms">' + function () {
                    var str = '';
                    Dates.each(new Array(12), function (i) {
                        str += '<span m="' + i + '">' + Dates.digit(i + 1) + '月</span>';
                    });
                    return str;
                }() + '</div>'
                + '</div>'
                + '</div>'

                + Dates.viewtb

                + '<div class="hnadate_bottom">'
                + '<ul id="hnadate_hms">'
                + '<li class="hnadate_sj">时间</li>'
                + '<li><input readonly>:</li>'
                + '<li><input readonly>:</li>'
                + '<li><input readonly></li>'
                + '</ul>'
                + '<div class="hnadate_time" id="hnadate_time"></div>'
                + '<div class="hnadate_btn">'
                + '<a id="hnadate_clear">清空</a>'
                + '<a id="hnadate_today">今天</a>'
                + '<a id="hnadate_ok">确认</a>'
                + '</div>'
                + (config.isv ? '<a href="http://sentsin.com/hnaui/hnadate/" class="hnadate_v" target="_blank">hnadate-v' + hnadate.v + '</a>' : '')
                + '</div>';
            doc.body.appendChild(div);
            Dates.box = S('#' + as[0]);
            Dates.events();
            div = null;
        } else {
            Dates.shde(Dates.box);
        }
        Dates.follow(Dates.box);
        options.zIndex ? Dates.box.style.zIndex = options.zIndex : Dates.removeCssAttr(Dates.box, 'z-index');
        Dates.stopMosup('click', Dates.box);

        Dates.initDate();
        Dates.iswrite();
        Dates.check();
        Dates.reWidth(options);
    };

    //重新定义控件试图的宽度
    Dates.reWidth = function (options) {
        if (('adaptation' in options ? options.adaptation : config.adaptation)) {
            var elemW = options.elem.offsetWidth;
            elemW = elemW < 240 ? 240 : elemW;
            doc[byid](as[0]).style.width = (elemW - 2) + "px";
            doc[byid](as[8]).style.width = (elemW - 12) + "px";
        }
    };

    //隐藏内部弹出元素
    Dates.reshow = function () {
        Dates.each(Dates.query('#' + as[0] + ' .hnadate_show'), function (i, elem) {
            Dates.removeClass(elem, 'hnadate_show');
        });
        return this;
    };

    //关闭控件
    Dates.close = function () {
        Dates.reshow();
        Dates.shde(Dates.query('#' + as[0]), 1);
        Dates.elem = null;
    };

    //转换日期格式
    Dates.parse = function (ymd, hms, format) {
        ymd = ymd.concat(hms);
        format = format || (Dates.options ? Dates.options.format : config.format);
        return (format + "").replace(/YYYY|MM|DD|hh|mm|ss/g, function (str, index) {
            ymd.index = ++ymd.index | 0;
            return Dates.digit(ymd[ymd.index]);
        });
    };

    //返回最终日期
    Dates.creation = function (ymd, hide) {
        var S = Dates.query, hms = Dates.hmsin;
        var getDates = "";
        if (ymd) {
            getDates = Dates.parse(ymd, [hms[0].value, hms[1].value, hms[2].value]);
        }
        Dates.elem[as.elemv] = getDates;
        if (!hide) {
            Dates.close();
            typeof Dates.options.choose === 'function' && Dates.options.choose(getDates);
        }
    };

    //事件
    Dates.events = function () {
        var S = Dates.query, log = {
            box: '#' + as[0]
        };

        Dates.addClass(doc.body, 'hnadate_body');

        as.tds = S('#' + as[8] + ' td');
        as.mms = S('#hnadate_ms span');
        as.year = S('#hnadate_y');
        as.month = S('#hnadate_m');

        //显示更多年月
        Dates.each(S(log.box + ' .hnadate_ym'), function (i, elem) {
            Dates.on(elem, 'click', function (ev) {
                Dates.stopmp(ev).reshow();
                Dates.addClass(this[tags]('div')[0], 'hnadate_show');
                if (!i) {
                    log.YY = parseInt(as.year.value);
                    Dates.viewYears(log.YY);
                }
            });
        });

        Dates.on(S(log.box), 'click', function () {
            Dates.reshow();
        });

        //切换年
        log.tabYear = function (type) {
            if (type === 0) {
                Dates.ymd[0]--;
            } else if (type === 1) {
                Dates.ymd[0]++;
            } else if (type === 2) {
                log.YY -= 14;
            } else {
                log.YY += 14;
            }
            if (type < 2) {
                Dates.viewDate(Dates.ymd[0], Dates.ymd[1], Dates.ymd[2]);
                Dates.reshow();
            } else {
                Dates.viewYears(log.YY);
            }
        };
        Dates.each(S('#hnadate_YY .hnadate_tab'), function (i, elem) {
            Dates.on(elem, 'click', function (ev) {
                Dates.stopmp(ev);
                log.tabYear(i);
            });
        });


        //切换月
        log.tabMonth = function (type) {
            if (type) {
                Dates.ymd[1]++;
                if (Dates.ymd[1] === 12) {
                    Dates.ymd[0]++;
                    Dates.ymd[1] = 0;
                }
            } else {
                Dates.ymd[1]--;
                if (Dates.ymd[1] === -1) {
                    Dates.ymd[0]--;
                    Dates.ymd[1] = 11;
                }
            }
            Dates.viewDate(Dates.ymd[0], Dates.ymd[1], Dates.ymd[2]);
        };
        Dates.each(S('#hnadate_MM .hnadate_tab'), function (i, elem) {
            Dates.on(elem, 'click', function (ev) {
                Dates.stopmp(ev).reshow();
                log.tabMonth(i);
            });
        });

        //选择月
        Dates.each(S('#hnadate_ms span'), function (i, elem) {
            Dates.on(elem, 'click', function (ev) {
                Dates.stopmp(ev).reshow();
                if (!Dates.hasClass(this, as[1])) {
                    Dates.viewDate(Dates.ymd[0], this.getAttribute('m') | 0, Dates.ymd[2]);
                }
            });
        });

        //选择日
        Dates.each(S('#' + as[8] + ' td'), function (i, elem) {
            Dates.on(elem, 'click', function (ev) {
                if (!Dates.hasClass(this, as[1])) {
                    Dates.stopmp(ev);
                    Dates.creation([this.getAttribute('y') | 0, this.getAttribute('m') | 0, this.getAttribute('d') | 0]);
                }
            });
        });

        //清空
        as.oclear = S('#hnadate_clear');
        Dates.on(as.oclear, 'click', function () {
            //Dates.elem[as.elemv] = '';
            //Dates.close();
            Dates.creation("");
        });

        //今天
        as.otoday = S('#hnadate_today');
        Dates.on(as.otoday, 'click', function () {
            var now = new Date();
            Dates.creation([now.getFullYear(), now.getMonth() + 1, now.getDate()]);
        });

        //确认
        as.ok = S('#hnadate_ok');
        Dates.on(as.ok, 'click', function () {
            if (Dates.valid) {
                Dates.creation([Dates.ymd[0], Dates.ymd[1] + 1, Dates.ymd[2]]);
            }
        });

        //选择时分秒
        log.times = S('#hnadate_time');
        Dates.hmsin = log.hmsin = S('#hnadate_hms input');
        log.hmss = ['小时', '分钟', '秒数'];
        log.hmsarr = [];

        //生成时分秒或警告信息
        Dates.msg = function (i, title) {
            var str = '<div class="hnadte_hsmtex">' + (title || '提示') + '<span>×</span></div>';
            if (typeof i === 'string') {
                str += '<p>' + i + '</p>';
                Dates.shde(S('#' + as[0]));
                Dates.removeClass(log.times, 'hnadate_time1').addClass(log.times, 'hnadate_msg');
            } else {
                if (!log.hmsarr[i]) {
                    str += '<div id="hnadate_hmsno" class="hnadate_hmsno">';
                    Dates.each(new Array(i === 0 ? 24 : 60), function (i) {
                        str += '<span>' + i + '</span>';
                    });
                    str += '</div>'
                    log.hmsarr[i] = str;
                } else {
                    str = log.hmsarr[i];
                }
                Dates.removeClass(log.times, 'hnadate_msg');
                Dates[i === 0 ? 'removeClass' : 'addClass'](log.times, 'hnadate_time1');
            }
            Dates.addClass(log.times, 'hnadate_show');
            log.times.innerHTML = str;
        };

        log.hmson = function (input, index) {
            var span = S('#hnadate_hmsno span'), set = Dates.valid ? null : 1;
            Dates.each(span, function (i, elem) {
                if (set) {
                    Dates.addClass(elem, as[1]);
                } else if (Dates.timeVoid(i, index)) {
                    Dates.addClass(elem, as[1]);
                } else {
                    Dates.on(elem, 'click', function (ev) {
                        if (!Dates.hasClass(this, as[1])) {
                            input.value = Dates.digit(this.innerHTML | 0);
                        }
                    });
                }
            });
            Dates.addClass(span[input.value | 0], 'hnadate_click');
        };

        //展开选择
        Dates.each(log.hmsin, function (i, elem) {
            Dates.on(elem, 'click', function (ev) {
                Dates.stopmp(ev).reshow();
                Dates.msg(i, log.hmss[i]);
                log.hmson(this, i);
            });
        });

        Dates.on(doc, 'mouseup', function (e) {
            e = e || window.event;
            var box = S('#' + as[0]);
            if (e.target == Dates.elem) return;
            if (box && box.style.display !== 'none') {
                Dates.check() || Dates.close();
            }
        }).on(doc, 'keyup', function (event) {
            event = event || win.event;
            var codes = event.keyCode;

            //如果在日期显示的时候按回车
            if (codes === 13 && Dates.elem) {
                //判断日期是否在有效期内
                if (Dates.ymd[0] < Dates.mins[0]) {
                    Dates.msg("日期不在有效期内请重新选择");
                } else if (Dates.ymd[0] == Dates.mins[0] && Dates.ymd[1] + 1 < Dates.mins[1]) {
                    Dates.msg("日期不在有效期内请重新选择");
                } else if (Dates.ymd[0] == Dates.mins[0] && Dates.ymd[1] + 1 == Dates.mins[1] && Dates.ymd[2] < Dates.mins[2]) {
                    Dates.msg("日期不在有效期内请重新选择");
                } else if (Dates.ymd[0] == Dates.maxs[0] && Dates.ymd[1] + 1 > Dates.maxs[1]) {
                    Dates.msg("日期不在有效期内请重新选择");
                } else if (Dates.ymd[0] == Dates.maxs[0] && Dates.ymd[1] + 1 == Dates.maxs[1] && Dates.ymd[2] > Dates.maxs[2]) {
                    Dates.msg("日期不在有效期内请重新选择");
                } else if (Dates.ymd[0] > Dates.maxs[0]) {
                    Dates.msg("日起不在有效期内请重新选择")
                } else {
                    Dates.creation([Dates.ymd[0], Dates.ymd[1] + 1, Dates.ymd[2]]);
                }
            }
        });
    };

    //重置定位
    hnadate.reset = function () {
        (Dates.box && Dates.elem) && Dates.follow(Dates.box);
    };

    //返回指定日期
    hnadate.now = function (timestamp, format) {
        var De = new Date((timestamp | 0) ? function (tamp) {
            return tamp < 86400000 ? (+new Date + tamp * 86400000) : tamp;
        }(parseInt(timestamp)) : +new Date);
        return Dates.parse(
            [De.getFullYear(), De.getMonth() + 1, De.getDate()],
            [De.getHours(), De.getMinutes(), De.getSeconds()],
            format
        );
    };
    exports('hnadate', hnadate);

});