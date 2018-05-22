/**
 * 时间选择面板
 */
(function ($) {
    var hna = window.hna || {};


    //全局配置，如果采用默认均不需要改动
    var config = {
        path: '', //hnadate所在路径
        skin: 'default', //初始化皮肤
        format: 'YYYY-MM-DD', //日期格式
        min: '1900-01-01', //最小日期
        max: '2099-12-31', //最大日期
        isv: false,
        init: true,  //初始化的时候是否给文本框赋值
        adaptation: true ,  //是否适配文本框的宽度
        holidayList:[{"date":"1.1","text":'元 旦'},{"date":"5.1","text":'劳动节'},{"date":"10.1","text":'国庆节'}]
    };
    var DatePanel = {};
    var as=['DatePanel_box',"date-panel-title","date-panel-box",'date-panel-content','hnaui-clear',
        'btn-list','hnaui-left','hnaui-right','hnaui-icon','btn-disabled','hnaui-disabled','date-panel-item',
        'item-title','item-content','item-last','hnaui-table','hnaui-table-mobile','weekend','date-day','working-day',' this-item','date-panel-show',
        'date-panel-body','item-tag'];
    /**
     * 初始化面板
     */
    hna.initDatePanel=function (options) { //插件入口
        options = options || {};
        DatePanel.run(options);
        return hna.initDatePanel;
    };
    DatePanel.run = function (options) {
        var elem = options.elem;
        DatePanel.view(elem, options);
        // DatePanel.reshow();
    };
    DatePanel.view =function (elem, options) {
        var div = '' ,log = {};
        options = options || elem;
        DatePanel.minDay = new Date();
        DatePanel.elem = elem;
        DatePanel.options = options;
        DatePanel.options.start = DatePanel.options.start || '';
        if(DatePanel.options.holidayList){
            DatePanel.options.holidayList.forEach(function (itme) {
                config.holidayList.push(itme);
            });
        }
        DatePanel.holidayList = config.holidayList;
        if(DatePanel.options.max){
            DatePanel.options.max = DatePanel.options.max.match(/\d+/g).slice(0,3).join('-');
        }
        if(DatePanel.options.min){
            DatePanel.options.min = DatePanel.options.min.match(/\d+/g).slice(0,3).join('-');
        }
        DatePanel.mm = log.mm = [  DatePanel.options.min|| config.min, DatePanel.options.max || config.max];
        DatePanel.mins = log.mm[0].match(/^((?:19|20|21)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)? log.mm[0].match(/\d+/g).slice(0,3):hna._date.getDateInfo().date.match(/\d+/g).slice(0,3);
        DatePanel.maxs = log.mm[1].match(/^((?:19|20|21)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)? log.mm[1].match(/\d+/g).slice(0,3):hna._date.getDateInfo().date.match(/\d+/g).slice(0,3);
        DatePanel.min = new Date(DatePanel.mins.join('/'));
        DatePanel.max = new Date(DatePanel.maxs.join('/'));
        DatePanel.elemValue = $(DatePanel.elem).val();
        if(DatePanel.elemValue.length>=10){
            DatePanel.setLinePos(DatePanel.elem,10);
        }
        var netTime = hna._date.addMonth(1,DatePanel.elemValue ? DatePanel.elemValue:DatePanel.options.min).split('-');
        //  $(DatePanel.elem).attr('readonly',true);
        if(!DatePanel.box){
            var html = '';
            html += '<div id="'+as[0]+'" class="'+as[0]+'">';
            html += '   <div class="'+as[1]+'"><h2>'+ DatePanel.titleType(elem) +'</h2></div>';
            html +='       <div class="'+as[2]+'">';
            html += DatePanel.createBtnList();
            html += '        <div class="'+as[3]+' '+as[4]+'">';
            html += DatePanel.createPanelContent();
            html += '         </div>';
            html += '      </div>';

            html += '</div>';
            $(".home-block").append(html);
            DatePanel.box =  $('#'+ as[0]);
            DatePanel.isShow = true;
            html = null;
            DatePanel.event();
        } else {
            $('.date-panel-title h2').html(DatePanel.titleType(elem));
            var str =DatePanel.createPanelContent();
            $('.btn-list').replaceWith(DatePanel.createBtnList());
            $('.date-panel-content').html(str);
            $('#'+ as[0]).show();
            DatePanel.isLast();
            DatePanel.isShow = true;
        }
        DatePanel.follow(DatePanel.box);
        DatePanel.elemEvent();
    };
    DatePanel.isElemValue = function () {
        return DatePanel.elemValue ? DatePanel.elemValue:DatePanel.options.min;
    };
    DatePanel.createPanelContent = function () {
        var netTime = hna._date.addMonth(1,DatePanel.isElemValue()).split('-');
        var str = DatePanel.createItem(DatePanel.check(DatePanel.isElemValue()));
        str += DatePanel.createItem((DatePanel.elemValue ? DatePanel.elemValue:DatePanel.options.min).split('-'));
        str += DatePanel.createItem(netTime);
        str += DatePanel.createItem(hna._date.addMonth(2,DatePanel.isElemValue()).split('-'));
        return str;
    };
    //创建左右按钮
    DatePanel.elemEvent = function () {
        DatePanel.elem.onkeydown = function (e) {
            var numPos = 0;//存储按下的数字;
            var elem = DatePanel.elem;
            e = e || window.event;
            if( window.event){
                e.cancelBubble = true;
            }else {
                e.stopPropagation();
            }
            var code = e.keyCode || e.which;
            if ((code <= 57 && code >= 48) || (code <= 105 && code >= 96) || (code == 8) || (code == 13)) {
                var linePos = DatePanel.getLinePos(DatePanel.elem);//存储按下时的光标位置;
                var countStr = 0;//统计光标前的非数字个数;
                for (var i = 0; i < linePos; i++) {
                    if (isNaN(elem.value[i]) || elem.value[i] == " "){
                        countStr++;
                    }
                }
                var vi = linePos - countStr;//应替换掉的数字的下标;
                //  DatePanel.reshow();//清除提示
                if (!DatePanel.elem) {
                    DatePanel.elem = elem;//防止拖拽选择时为null;
                }
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
                var val = elem.value;
                val = (val + "").replace(/[^0-9]/ig, "");//清除非数字;
                var len = val.length;
                var valMon = val.slice(4, 6),//获取输入的月份;
                    valDate = val.slice(6, 8),//获取日期;
                    valYear = val.slice(0, 4);//获取输入的年份;
                valMon = parseInt(valMon,10) || 0;
                if (code == 13) {//如果按下回车键且格式正常
                    DatePanel.close();
                }
                var valM = val.slice(4, 6),valD = val.slice(6, 8);
                var pos = 0;//设置光标的下标;
                var viA = vi < 4 ? vi : (vi == 4 || vi == 5 ? vi + 1 : vi + 2);
                if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) {//如果输入数字
                    if( e.preventDefault){
                        e.preventDefault();
                    }else {
                        e.returnValue = false;
                    }


                    if (len < 8 && vi >= len) {//如果光标在日期的后面;
                        if (len < 4) {//输入年份阶段
                            elem.value = val + numPos;
                            //年份输完日历显示
                            //  DatePanel.viewDate(valYear, min[1] - 1, min[2]);
                        } else if (len == 4 && ((code >= 50 && code <= 57) || code >= 98)) {//用户开始输入月份且大于1
                            elem.value = val.slice(0, 4) + "-" + 0 + numPos;
                        } else if (len == 4) {//正常输入
                            elem.value = val.slice(0, 4) + "-" + numPos;
                        }else if (len == 5 && val[4] == 1 && ((code > 50 && code <= 57) || code > 98)) {//默认显示一月
                            elem.value = val.slice(0, 4) + "-" + 0 + 1;
                        } else if (len == 5 && val[4] == 0 && (code == 48 || code == 96)) {//月份00默认显示一月
                            elem.value = val.slice(0, 4) + "-" + 0 + 1;
                        } else if (len == 5 && val[4] == 0) {//月份0-9
                            elem.value = val.slice(0, 4) + "-" + 0 + numPos;
                        } else if (len == 5 && val[4] == 1) {//月份10-12
                            elem.value = val.slice(0, 4) + "-" + 1 + numPos;
                        }
                        else if (len == 6 && ((code > 51 && code <= 57) || code > 99)) {//输入日期且大于3
                            elem.value = val.slice(0, 4) + "-" + val.slice(4, 6) + "-" + 0 + numPos;
                        } else if (len == 6 && valMon == 2 && ((code > 50 && code <= 57) || code > 98)) {//月份为2时输入日期大于2
                            elem.value = val.slice(0, 4) + "-" + val.slice(4, 6) + "-" + 0 + numPos;
                        } else if (len == 7 && val[6] == 3 && ((code > 49 && code <= 57) || code > 97)) {//输入日期大于31时
                            elem.value = val.slice(0, 4) + "-" + val.slice(4, 6) + "-" + 0 + 3;
                        } else if (len == 7 && val[6] == 0 && (code == 48 || code == 96)) {//日期为00默认显示1
                            elem.value = val.slice(0, 4) + "-" + val.slice(4, 6) + "-" + 0 + 1;
                        }
                        else if (len == 6) {//正常输入
                            elem.value = val.slice(0, 4) + "-" + val.slice(4, 6) + "-" + numPos;
                        } else if (len == 7) {
                            elem.value = val.slice(0, 4) + "-" + val.slice(4, 6) + "-" + val[6] + numPos;
                        } else {//防止插入修改后格式乱掉
                            val = val.slice(0) + numPos;
                            valM = valM == 0 ? "01" : (valM > 12 ? "0" + numPos : valM);
                            valD = valD == 0 ? "01" : (valD > 31 ? "0" + numPos : valD);
                            if (val.length > 6) {
                                elem.value = val.slice(0, 4) + "-" + valM + "-" + valD;
                            } else if (val.length > 4 && val.length <= 6) {
                                elem.value = val.slice(0, 4) + "-" + valM;
                            } else {
                                elem.value = val.slice(0, 4);
                            }
                        }
                    } else if (len == 8) {//数字长度为8
                        val = val.slice(0, vi) + numPos + val.slice(vi + 1);
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
                        DatePanel.setLinePos(elem, pos);//设置光标位置
                    } else if (len < 8 && vi < len) {//数字长度小于8且光标在中间
                        val = val.slice(0, vi) + numPos + val.slice(vi);
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
                        } else if (val.length > 4 && val.length <= 6) {
                            elem.value = val.slice(0, 4) + "-" + valM;
                        } else {
                            elem.value = val.slice(0, 4);
                        }
                        DatePanel.setLinePos(elem, pos);//设置光标位置
                    }

                }
            } else {
                return false;
            }
        };
    };
    DatePanel.createBtnList=function () {
        var min = DatePanel.check(DatePanel.mm[0],"min");
        var max = DatePanel.check(DatePanel.mm[0],"max");
        var html ='<div class="'+as[5]+' '+as[4]+'">' +
            '<em class="'+as[6]+' '+as[8]+' ">&#xe603;</em>' +
            '<em class="'+as[7]+' '+as[8]+' "> &#xe602; </em>' +
            ' </div>';
        return html;
    };
    //创建日历每个月
    DatePanel.createItem =function (item) {
        var html = '';
        var date = item||DatePanel.mins;
        var str = date.join('-');
        html += ' <div class="'+as[11]+'">';
        html += '   <p class="'+as[12]+'" data-value="'+str+'">'+ date[0]+ '年 '+ date[1]+'月</p>';
        html += '   <div class="'+as[13]+'">';
        html +=  DatePanel.createDateTable(date);
        html += '   </div>';
        html += ' </div>';
        return html;
    };
    //判断是否最后一个
    DatePanel.isLast = function () {
        $($('.date-panel-item')[2]).addClass(as[14]).siblings().removeClass(as[14]);
    };
    //创星期标题
    DatePanel.createDateTable =function (date) {
        var weeks = ['日', '一', '二', '三', '四', '五', '六'];
        var html ='  <table class="'+as[15]+' '+as[16]+'">';
        html += '   <thead><tr>';
        weeks.forEach(function (item,index) {
            html += '<th>'+item+'</th>';
        });
        html += ' </tr></thead>';
        html += '<tbody>';
        html += DatePanel.createTbody(date);
        html += '</tbody>';
        html += '</table>';
        return html;
    } ;
    //创建 主体部分
    DatePanel.createTbody = function (date) {
        var d = new Date(date.join("/"));
        var y =   d.getFullYear();
        var o = DatePanel.getMonthRow(y,date[1]); //返回有多少行 星期几 和 月份天数
        var week = o.week; //星期
        var day = 1;   //日期从第一天开始
        var j=o.days; //月份总天数
        var html ='';
        for(var i=1;i<=o.i;i++){
            html += '<tr>';
            for(var a = 1;a<=7;a++){
                if(a>week && day<=j){
                    var time = new Date(''+y+'/'+ date[1] +'/'+day+'');
                    var dayClass =  '';
                    var effectiveSign ='';
                    if(time>=DatePanel.min && time<=DatePanel.max ){
                        if(time.getDay()== 0||time.getDay()== 6){
                            dayClass = as[17];
                            effectiveSign =as[18];
                        } else {
                            dayClass = as[19];
                            effectiveSign =as[18];
                        }
                    }else {
                        dayClass ='';
                    }
                    html += DatePanel.getDateTag(date[1],day,y,effectiveSign,dayClass);
                    day++;
                    week = -1;
                }else {
                    html += "<td>&nbsp</td>" ;
                }

            }
            html += '</tr>';
        }
        return html;
    };
    //根据年月 返回 时间表行数，每个月第一天星期几和每个月总天数
    DatePanel.getMonthRow = function (y,m) {
        var i = 5;
        var date =  y+'/'+ m+'/1';
        var d = new Date(date);
        var days = DatePanel.mGetDate(d);
        var day =d.getDay();
        if(days== 30 && day == 6 || days == 31 && day == 5){
            i = 6;
        }else if(days == 28 && day == 0){
            i = 4;
        }
        return {"i":i,"week":d.getDay(),'days':days};
    };
    //绑定事件
    DatePanel.event = function(){
        $(".home-block").addClass(as[22]);
        $(DatePanel.elem).css("ime-mode",'disabled');
        DatePanel.leftStop = true;
        DatePanel.rightStop = true;
        $('#'+as[0]+'').on('click',function(e){
            e.stopPropagation();
            var $this = $(e.target);
            var $thisV= null;
            if($this.hasClass(as[18])){
                $thisV = $this.data("value");
                if($thisV){
                    DatePanel.$thisV = $thisV;
                    $(DatePanel.elem).prop("value",DatePanel.$thisV);
                    DatePanel.close($thisV,DatePanel.elem);
                }
            }else if($this.hasClass(as[6])){
                if(DatePanel.leftStop){
                    DatePanel.sliderDate($this,'left');
                }
            }else if($this.hasClass(as[7])){
                if(DatePanel.rightStop){
                    DatePanel.sliderDate($this,'right');
                }

            }else {
                DatePanel.close();

            }
        });
        $(document).on('click',function (e) {
            var $this = $(e.target);
            if(DatePanel.isShow){
                if($this.parents('.tab-pane').length<=0){
                    DatePanel.close();
                }
            }
        });
        $(document).on('click','.click-btn',function (e) {
            var $this = $(e.target);
            if(DatePanel.isShow){
                if($this.parents('.tab-pane').length<=0){
                    DatePanel.close();
                }
            }
        });
        $(document).on('mouseover','.date-day',function (e) {
            var $this = $(e.srcElement || e.target);
            if($this.parent().hasClass('item-tag')){
                $this.parent('.date-day').addClass('day-hover').siblings().removeClass("day-hover");
            }else{
                $this.addClass('day-hover').siblings().removeClass("day-hover");
            }
        });
        $(document).on('mouseout','.date-day',function (e) {
            var $this = $(e.srcElement || e.target);

            $this.removeClass("day-hover");
        });
        $(document).on('mouseover','.btn-list .hnaui-icon',function () {
            $(this).addClass("btn-hover");
        });
        $(document).on('mouseout','.btn-list .hnaui-icon',function () {
            $(this).removeClass("btn-hover");
        });
    };

    //获取光标位置
    DatePanel.getLinePos = function (ctrl) {//获取光标位置,参数为目标元素
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
    };
    //设置光标位置
    DatePanel.setLinePos = function(ctrl, pos) {//设置光标位置函数
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
    };

    //滑动
    DatePanel.sliderDate = function ($this,direction) {
        if(direction=="right"){
            DatePanel.direction($this,'max',3,0);
        }else {
            DatePanel.direction($this,'min',0,3);
        }
    };
    //判断方向并且动态添加删除
    DatePanel.direction = function ($this,str,i,j) {
        var date = $($('.date-panel-item')[i]).find(".item-title").data('value');
        date =DatePanel.check(date,str);

        if(date){
            if(str=="min"){
                DatePanel.leftStop = false;
                $('.date-panel-content').stop(true).animate({"left":'0px'},200,function () {
                    DatePanel.slider(date,j,str);
                    DatePanel.leftStop = true;
                });
            }else {
                DatePanel.rightStop = false;
                $('.date-panel-content').stop(true).animate({"left":'-466px'},200,function () {
                    DatePanel.slider(date,j,str);
                    DatePanel.rightStop = true;
                });
            }
        }else {
            $this.addClass(as[9]).attr('disabled',"disabled") ;
        }
    };
    DatePanel.slider = function (date,j,str) {
        $('.'+as[11]+'').each(function (index,item) {
            if(index==j){
                $(item).remove();
            }
        });

        if(str=="min"){
            $('.'+as[3]+'').prepend(DatePanel.createItem(date));

        }else {
            $('.'+as[3]+'').append(DatePanel.createItem(date));
        }

        $('.date-panel-content').css({'left':'-233px'});
        DatePanel.isLast();
    };
    //方位辨别
    DatePanel.orien = function (obj, pos) {

        var tops, rect = DatePanel.elem.getBoundingClientRect();
        var objLeft = $(DatePanel.elem).offset().left+$(DatePanel.elem).outerWidth();
        if($(document).width()-obj.outerWidth()>objLeft){
            obj.css("left",($(DatePanel.elem).offset().left)+ 'px');
            obj.css('right','auto');
        }else {
            obj.css("right",$(document).width()-objLeft +'px');
            obj.css('left','auto');
        }
        if (rect.bottom + obj.outerHeight() / 1.5 <= $(document.body).outerHeight()) {
            tops = rect.bottom - 1;
        } else {
            tops = rect.top > obj.outerHeight() / 1.5 ? rect.top - obj.outerHeight() + 1 : $(document.body).outerHeight() - obj.outerHeight();
        }
        tops += 7;
        obj.css("top",Math.max(tops + (pos ? 0 : $(document).scrollTop()), 1) + 'px');
    };
    //吸附定位
    DatePanel.follow = function (obj) {
        if (DatePanel.options.fixed) {
            obj.css("position","fixed") ;
            DatePanel.orien(obj, 1);
        } else {
            obj.css("position","absolute") ;
            DatePanel.orien(obj);
        }
    };
    //获取 日期标题
    DatePanel.titleType = function (elem) {
        if($(elem).attr("id") == "goDate"){
            return "出发日期";
        }else if($(elem).attr("id") == "backDate"){
            return "返程日期 ";
        }else {
            if($(elem).attr("hna-title")){
                return $(elem).attr("hna-title");
            }else {
                return "选择日期";
            }
        }
    };
    //返回一个月的总天数
    DatePanel.mGetDate = function (date){
        var year =  date.getFullYear();
        var month = date.getMonth()+1;
        var d = new Date(year, month, 0);
        return d.getDate();
    };
    //判断表示节日
    DatePanel.getDateTag = function (m,day,y,effectiveSign,dayClass) {
        var md = m+'.'+day;
        var html ='';
        var str;
        var tag='';
        var days = day.toString().length <2 ?'0'+ day:day;
        m = m.toString().length <2 ? '0'+m:m;
        var time = y+'-'+m+'-'+days;
        var tagClass = '';
        if( md.substring(0, 1)==0){
            md = md.substring(1,md.length);
        }
        DatePanel.holidayList.forEach(function ( item,index) {
            if(md == item.date){
                str = item.text;
            }
        });
        if(str){
            tagClass = as[23];
            tag += '<em class="'+effectiveSign+'" data-value="'+time+'">'+str+'</em>';
        }else {
            tag = day;
        }
        html += '<td  class="'+ dayClass+' '+ effectiveSign +' '+tagClass+(time == DatePanel.elemValue ? as[20]:'') +'" data-value="'+time+'" >'+tag+'</td>' ;
        return html ;
    };
    //判断时间是否在范围内
    DatePanel.check=function (date,limit) {
        date =date.split('-');
        if(limit=="max"){
            if(parseInt(date[1],10)+1>12){
                date[1] = 1;
                date[0] = parseInt(date[0],10)+1;
            }else {
                date[1] = parseInt(date[1],10)+1;
            }
        }else {
            if((parseInt(date[1],10))-1<=0){
                date[1] = 12;
                date[0] = parseInt(date[0],10)-1;
            }else {
                date[1] = parseInt(date[1],10)-1;
            }
        }
        return date;
    };
    //关闭控件
    DatePanel.close = function ($thisV) {
        DatePanel.box.hide();
        DatePanel.isShow = false;
        var str =  DatePanel.elem ? $(DatePanel.elem).val().match(/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/):false;
        if(str){
            var elemValue = new Date($(DatePanel.elem).val().replace(/-/g, '/'));
            if(DatePanel.min<=elemValue && elemValue<=DatePanel.max ){
                DatePanel.elem = null;
                if($thisV){
                    if(typeof DatePanel.options.choose === 'function'){
                        DatePanel.options.choose($thisV);
                    }
                }
            }else {
                $(DatePanel.elem).val('');
                hnaer.msg('您输入的日期不在有效购机范围内，请重新输入！');
                $(DatePanel.elem).blur();
            }
        } else {
            if(DatePanel.elem){
                if($(DatePanel.elem).val() != ''){
                    $(DatePanel.elem).val('');
                    hnaer.msg('您输入的日期格式有误，请重新输入！');
                    $(DatePanel.elem).blur();
                }
            }
        }
    };
})(jQuery);

