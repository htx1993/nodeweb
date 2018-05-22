/**

 @Name：hnaer v3.0.3 Web弹层组件
 @Author：贤心
 @Site：http://hnaer.hnaui.com
 @License：MIT

 */

;!function (window, undefined) {
    "use strict";

    var ishnaui = window.hnaui && hnaui.define, $, win, ready = {
        getPath: function () {
            var js = document.scripts, script = js[js.length - 1], jsPath = script.src;
            if (script.getAttribute('merge')) return;
            return jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
        }(),

        config: {}, end: {}, minIndex: 0, minLeft: [],
        btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],

        //五种原始层模式
        type: ['dialog', 'page', 'iframe', 'loading', 'tips']
    };

//默认内置方法。
    var hnaer = {
        v: '3.0.3',
        ie: function () { //ie版本
            var agent = navigator.userAgent.toLowerCase();
            return (!!window.ActiveXObject || "ActiveXObject" in window) ? (
                (agent.match(/msie\s(\d+)/) || [])[1] || '11' //由于ie11并没有msie的标识
            ) : false;
        }(),
        index: (window.hnaer && window.hnaer.v) ? 100000 : 0,
        path: ready.getPath,
        config: function (options, fn) {
            options = options || {};
            hnaer.cache = ready.config = $.extend({}, ready.config, options);
            hnaer.path = ready.config.path || hnaer.path;
            typeof options.extend === 'string' && (options.extend = [options.extend]);

            if (ready.config.path) hnaer.ready();

            if (!options.extend) return this;

            ishnaui
                ? hnaui.addcss('modules/hnaer/' + options.extend)
                : hnaer.link('skin/' + options.extend);

            return this;
        },

        //载入CSS配件
        link: function (href, fn, cssname) {

            //未设置路径，则不主动加载css
            if (!hnaer.path) return;

            var head = $('head')[0], link = document.createElement('link');
            if (typeof fn === 'string') cssname = fn;
            var app = ((cssname || href)+"").replace(/\.|\//g, '');
            var id = 'hnauicss-' + app, timeout = 0;

            link.rel = 'stylesheet';
            link.href = hnaer.path + href;
            link.id = id;

            if (!$('#' + id)[0]) {
                head.appendChild(link);
            }

            if (typeof fn !== 'function') return;

            //轮询css是否加载完毕
            (function poll() {
                if (++timeout > 8 * 1000 / 100) {
                    return window.console && console.error('hnaer.css: Invalid');
                }
                ;
                parseInt($('#' + id).css('width')) === 1989 ? fn() : setTimeout(poll, 100);
            }());
        },

        ready: function (callback) {
            var cssname = 'skinhnaercss', ver = '303';
            //ishnaui ? hnaui.addcss('modules/hnaer/default/hnaer.css?v='+hnaer.v+ver, callback, cssname)
            //: hnaer.link('skin/default/hnaer.css?v='+hnaer.v+ver, callback, cssname);
            return this;
        },

        //各种快捷引用
        alert: function (content, options, yes) {
            var type = typeof options === 'function';
            if (type) yes = options;
            return hnaer.open($.extend({
                content: content,
                yes: yes
            }, type ? {} : options));
        },

        confirm: function (content, options, yes, cancel) {
            var type = typeof options === 'function';
            if (type) {
                cancel = yes;
                yes = options;
            }
            return hnaer.open($.extend({
                content: content,
                btn: ready.btn,
                yes: yes,
                btn2: cancel
            }, type ? {} : options));
        },

        msg: function (content, options, end) { //最常用提示层
            var type = typeof options === 'function', rskin = ready.config.skin;
            var skin = (rskin ? rskin + ' ' + rskin + '-msg' : '') || 'hnaui-hnaer-msg';
            var anim = doms.anim.length - 1;
            if (type) end = options;
            return hnaer.open($.extend({
                content: content,
                time: 3000,
                shade: false,
                skin: skin,
                title: false,
                closeBtn: false,
                btn: false,
                resize: false,
                end: end
            }, (type && !ready.config.skin) ? {
                skin: skin + ' hnaui-hnaer-hui',
                anim: anim
            } : function () {
                options = options || {};
                if (options.icon === -1 || options.icon === undefined && !ready.config.skin) {
                    options.skin = skin + ' ' + (options.skin || 'hnaui-hnaer-hui');
                }
                return options;
            }()));
        },

        load: function (icon, options) {
            return hnaer.open($.extend({
                type: 3,
                icon: icon || 0,
                resize: false,
                shade: 0.01
            }, options));
        },

        tips: function (content, follow, options) {
            return hnaer.open($.extend({
                type: 4,
                content: [content, follow],
                closeBtn: false,
                time: 3000,
                shade: false,
                resize: false,
                fixed: false,
                maxWidth: 210
            }, options));
        }
    };

    var Class = function (setings) {
        var that = this;
        that.index = ++hnaer.index;
        that.config = $.extend({}, that.config, ready.config, setings);
        document.body ? that.creat() : setTimeout(function () {
            that.creat();
        }, 30);
    };

    Class.pt = Class.prototype;

//缓存常用字符
    var doms = ['hnaui-hnaer', '.hnaui-hnaer-title', '.hnaui-hnaer-main', '.hnaui-hnaer-dialog', 'hnaui-hnaer-iframe', 'hnaui-hnaer-content', 'hnaui-hnaer-btn', 'hnaui-hnaer-close'];
    doms.anim = ['hnaer-anim', 'hnaer-anim-01', 'hnaer-anim-02', 'hnaer-anim-03', 'hnaer-anim-04', 'hnaer-anim-05', 'hnaer-anim-06'];
    var iconList = ['&#xe60b;','&#xe610;','&#x1007;','&#xe607;','&#xe90d;','&#x983;','&#xe650;','&#xe63d;'];
//默认配置
    Class.pt.config = {
        type: 0,
        shade: 0.3,
        fixed: true,
        move: doms[1],
        title: '&#x4FE1;&#x606F;',
        offset: 'auto',
        area: 'auto',
        closeBtn: 1,
        time: 0, //0表示不自动关闭
        zIndex: 19891014,
        maxWidth: 360,
        anim: 0,
        isOutAnim: true,
        icon: -1,
        moveType: 1,
        resize: true,
        scrollbar: true, //是否允许浏览器滚动条
        tips: 2
    };

//容器
    Class.pt.vessel = function (conType, callback) {
        var that = this, times = that.index, config = that.config;
        var zIndex = config.zIndex + times, titype = typeof config.title === 'object';
        var ismax = config.maxmin && (config.type === 1 || config.type === 2);
        var titleHTML = (config.title ? '<div class="hnaui-hnaer-title" style="' + (titype ? config.title[1] : '') + '">'
        + (titype ? config.title[0] : config.title)
        + '</div>' : '');

        config.zIndex = zIndex;
        var iconCls = "";
        var styleStr = "";
        if(config.icon == 7){
            iconCls = "hnaui-anim hnaui-anim-rotate hnaui-anim-loop";
            styleStr = 'style="display:inline-block;"';
        }
        callback([
            //遮罩
            config.shade ? ('<div class="hnaui-hnaer-shade" id="hnaui-hnaer-shade' + times + '" times="' + times + '" style="' + ('z-index:' + (zIndex - 1) + '; background-color:' + (config.shade[1] || '#000') + '; opacity:' + (config.shade[0] || config.shade) + '; filter:alpha(opacity=' + (config.shade[0] * 100 || config.shade * 100) + ');') + '"></div>') : '',
            //主体
            '<div class="' + doms[0] + (' hnaui-hnaer-' + ready.type[config.type]) + (((config.type == 0 || config.type == 2) && !config.shade) ? ' hnaui-hnaer-border' : ' ') +  ' ' + (config.skin || '') + '" id="' + doms[0] + times + '" type="' + ready.type[config.type] + '" times="' + times + '" showtime="' + config.time + '" conType="' + (conType ? 'object' : 'string') + '" style="z-index: ' + zIndex + '; width:' + config.area[0] + ';height:' + config.area[1] + (config.fixed ? '' : ';position:absolute;') + '">'
            + (conType && config.type != 2 ? '' : titleHTML)
            + '<div id="' + (config.id || '') + '" class="hnaui-hnaer-content' + ((config.type == 0 && config.icon !== -1) ? ' hnaui-hnaer-padding' : '') + (config.type == 3 ? ' hnaui-hnaer-loading' + config.icon : '') + '">'
            + (config.type == 0 && config.icon !== -1 ? '<i class="hnaui-hnaer-ico hnaui-icon '+iconCls+'" '+styleStr+'>'+iconList[config.icon]+ '</i>' : '')
            + (config.type == 1 && conType ? '' : (config.content || ''))
            + '</div>'
            + '<span class="hnaui-hnaer-setwin">' + function () {
                var closebtn = ismax ? '<a class="hnaui-hnaer-min" href="javascript:;" onclick="return false"><cite></cite></a><a class="hnaui-hnaer-ico hnaui-hnaer-max" href="javascript:;"></a>' : '';
                config.closeBtn && (closebtn += '<a class="hnaui-hnaer-ico ' + doms[7] + ' ' + doms[7] + (config.title ? config.closeBtn : (config.type == 4 ? '1' : '2')) + '" href="javascript:;"><i class="hnaui-icon">&#x2716;</i></a>');
                return closebtn;
            }() + '</span>'
            + (config.btn ? function () {
                var button = '';
                typeof config.btn === 'string' && (config.btn = [config.btn]);
                for (var i = 0, len = config.btn.length; i < len; i++) {
                    button += '<a class="' + doms[6] + '' + i + '">' + config.btn[i] + '</a>'
                }
                return '<div class="' + doms[6] + ' hnaui-hnaer-btn-' + (config.btnAlign || '') + '">' + button + '</div>'
            }() : '')
            + (config.resize ? '<span class="hnaui-hnaer-resize"></span>' : '')
            + '</div>'
        ], titleHTML, $('<div class="hnaui-hnaer-move"></div>'));
        return that;
    };

//创建骨架
    Class.pt.creat = function () {
        var that = this
            , config = that.config
            , times = that.index, nodeIndex
            , content = config.content
            , conType = typeof content === 'object'
            , body = $('body');

        if (config.id && $('#' + config.id)[0])  return;

        if (typeof config.area === 'string') {
            config.area = config.area === 'auto' ? ['', ''] : [config.area, ''];
        }

        //anim兼容旧版shift
        if (config.shift) {
            config.anim = config.shift;
        }

        if (hnaer.ie == 6) {
            config.fixed = false;
        }

        switch (config.type) {
            case 0:
                config.btn = ('btn' in config) ? config.btn : ready.btn[0];
                hnaer.closeAll('dialog');
                break;
            case 2:
                var content = config.content = conType ? config.content : [config.content || 'http://hnaer.hnaui.com', 'auto'];
                config.content = '<iframe scrolling="' + (config.content[1] || 'auto') + '" allowtransparency="true" id="' + doms[4] + '' + times + '" name="' + doms[4] + '' + times + '" onload="this.className=\'\';" class="hnaui-hnaer-load" frameborder="0" src="' + config.content[0] + '"></iframe>';
                break;
            case 3:
                delete config.title;
                delete config.closeBtn;
                config.icon === -1 && (config.icon === 0);
                hnaer.closeAll('loading');
                break;
            case 4:
                conType || (config.content = [config.content, 'body']);
                config.follow = config.content[1];
                config.content = config.content[0] + '<i class="hnaui-hnaer-TipsG"></i>';
                delete config.title;
                config.tips = typeof config.tips === 'object' ? config.tips : [config.tips, true];
                config.tipsMore || hnaer.closeAll('tips');
                break;
        }

        //建立容器
        that.vessel(conType, function (html, titleHTML, moveElem) {
            body.append(html[0]);
            conType ? function () {
                (config.type == 2 || config.type == 4) ? function () {
                    $('body').append(html[1]);
                }() : function () {
                    if (!content.parents('.' + doms[0])[0]) {
                        content.data('display', content.css('display')).show().addClass('hnaui-hnaer-wrap').wrap(html[1]);
                        $('#' + doms[0] + times).find('.' + doms[5]).before(titleHTML);
                    }
                }();
            }() : body.append(html[1]);
            $('.hnaui-hnaer-move')[0] || body.append(ready.moveElem = moveElem);
            that.hnaero = $('#' + doms[0] + times);
            config.scrollbar || doms.html.css('overflow', 'hidden').attr('hnaer-full', times);
        }).auto(times);

        config.type == 2 && hnaer.ie == 6 && that.hnaero.find('iframe').attr('src', content[0]);

        //坐标自适应浏览器窗口尺寸
        config.type == 4 ? that.tips() : that.offset();
        if (config.fixed) {
            win.on('resize', function () {
                that.offset();
                (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) && that.auto(times);
                config.type == 4 && that.tips();
            });
        }

        config.time <= 0 || setTimeout(function () {
            hnaer.close(that.index)
        }, config.time);
        that.move().callback();

        //为兼容jQuery3.0的css动画影响元素尺寸计算
        if (doms.anim[config.anim]) {
            that.hnaero.addClass(doms.anim[config.anim]);
        }
        ;

        //记录关闭动画
        if (config.isOutAnim) {
            that.hnaero.data('isOutAnim', true);
        }
    };

//自适应
    Class.pt.auto = function (index) {
        var that = this, config = that.config, hnaero = $('#' + doms[0] + index);
        if (config.area[0] === '' && config.maxWidth > 0) {
            //为了修复IE7下一个让人难以理解的bug
            if (hnaer.ie && hnaer.ie < 8 && config.btn) {
                hnaero.width(hnaero.innerWidth());
            }
            hnaero.outerWidth() > config.maxWidth && hnaero.width(config.maxWidth);
        }
        var area = [hnaero.innerWidth(), hnaero.innerHeight()];
        var titHeight = hnaero.find(doms[1]).outerHeight() || 0;
        var btnHeight = hnaero.find('.' + doms[6]).outerHeight() || 0;

        function setHeight(elem) {
            elem = hnaero.find(elem);

            var elemH = area[1];
            var maxH = document.documentElement.clientHeight || document.body.clientHeight - 30;
            if(elemH > maxH){
                elemH = maxH;
            }
            var elemH = elemH - titHeight - btnHeight - 2 * (parseFloat(elem.css('padding-top')) | 0);

            elem.height(elemH);
        }

        switch (config.type) {
            case 2:
                setHeight('iframe');
                break;
            default:
                if (config.area[1] === '') {
                    if (config.fixed && area[1] >= win.height()) {
                        area[1] = win.height();
                        setHeight('.' + doms[5]);
                    }
                } else {
                    setHeight('.' + doms[5]);
                }
                break;
        }
        return that;
    };

//计算坐标
    Class.pt.offset = function () {
        var that = this, config = that.config, hnaero = that.hnaero;
        var area = [hnaero.outerWidth(), hnaero.outerHeight()];
        var type = typeof config.offset === 'object';
        that.offsetTop = (win.height() - area[1]) / 2;
        that.offsetLeft = (win.width() - area[0]) / 2;

        if (type) {
            that.offsetTop = config.offset[0];
            that.offsetLeft = config.offset[1] || that.offsetLeft;
        } else if (config.offset !== 'auto') {

            if (config.offset === 't') { //上
                that.offsetTop = 0;
            } else if (config.offset === 'r') { //右
                that.offsetLeft = win.width() - area[0];
            } else if (config.offset === 'b') { //下
                that.offsetTop = win.height() - area[1];
            } else if (config.offset === 'l') { //左
                that.offsetLeft = 0;
            } else if (config.offset === 'lt') { //左上角
                that.offsetTop = 0;
                that.offsetLeft = 0;
            } else if (config.offset === 'lb') { //左下角
                that.offsetTop = win.height() - area[1];
                that.offsetLeft = 0;
            } else if (config.offset === 'rt') { //右上角
                that.offsetTop = 0;
                that.offsetLeft = win.width() - area[0];
            } else if (config.offset === 'rb') { //右下角
                that.offsetTop = win.height() - area[1];
                that.offsetLeft = win.width() - area[0];
            } else {
                that.offsetTop = config.offset;
            }

        }

        if (!config.fixed) {
            that.offsetTop = /%$/.test(that.offsetTop) ?
            win.height() * parseFloat(that.offsetTop) / 100
                : parseFloat(that.offsetTop);
            that.offsetLeft = /%$/.test(that.offsetLeft) ?
            win.width() * parseFloat(that.offsetLeft) / 100
                : parseFloat(that.offsetLeft);
            that.offsetTop += win.scrollTop();
            that.offsetLeft += win.scrollLeft();
        }

        if (hnaero.attr('minLeft')) {
            that.offsetTop = win.height() - (hnaero.find(doms[1]).outerHeight() || 0);
            that.offsetLeft = hnaero.css('left');
        }

        hnaero.css({top: that.offsetTop, left: that.offsetLeft});
    };

//Tips
    Class.pt.tips = function () {
        var that = this, config = that.config, hnaero = that.hnaero;
        var layArea = [hnaero.outerWidth(), hnaero.outerHeight()], follow = $(config.follow);
        if (!follow[0]) follow = $('body');
        var goal = {
            width: follow.outerWidth(),
            height: follow.outerHeight(),
            top: follow.offset().top,
            left: follow.offset().left
        }, tipsG = hnaero.find('.hnaui-hnaer-TipsG');

        var guide = config.tips[0];
        config.tips[1] || tipsG.remove();

        goal.autoLeft = function () {
            if (goal.left + layArea[0] - win.width() > 0) {
                goal.tipLeft = goal.left + goal.width - layArea[0];
                tipsG.css({right: 12, left: 'auto'});
            } else {
                goal.tipLeft = goal.left;
            }
            ;
        };

        //辨别tips的方位
        goal.where = [function () { //上
            goal.autoLeft();
            goal.tipTop = goal.top - layArea[1] - 10;
            tipsG.removeClass('hnaui-hnaer-TipsB').addClass('hnaui-hnaer-TipsT').css('border-right-color', config.tips[1]);
        }, function () { //右
            goal.tipLeft = goal.left + goal.width + 10;
            goal.tipTop = goal.top;
            tipsG.removeClass('hnaui-hnaer-TipsL').addClass('hnaui-hnaer-TipsR').css('border-bottom-color', config.tips[1]);
        }, function () { //下
            goal.autoLeft();
            goal.tipTop = goal.top + goal.height + 10;
            tipsG.removeClass('hnaui-hnaer-TipsT').addClass('hnaui-hnaer-TipsB').css('border-right-color', config.tips[1]);
        }, function () { //左
            goal.tipLeft = goal.left - layArea[0] - 10;
            goal.tipTop = goal.top;
            tipsG.removeClass('hnaui-hnaer-TipsR').addClass('hnaui-hnaer-TipsL').css('border-bottom-color', config.tips[1]);
        }];
        goal.where[guide - 1]();

        /* 8*2为小三角形占据的空间 */
        if (guide === 1) {
            goal.top - (win.scrollTop() + layArea[1] + 8 * 2) < 0 && goal.where[2]();
        } else if (guide === 2) {
            win.width() - (goal.left + goal.width + layArea[0] + 8 * 2) > 0 || goal.where[3]()
        } else if (guide === 3) {
            (goal.top - win.scrollTop() + goal.height + layArea[1] + 8 * 2) - win.height() > 0 && goal.where[0]();
        } else if (guide === 4) {
            layArea[0] + 8 * 2 - goal.left > 0 && goal.where[1]()
        }

        hnaero.find('.' + doms[5]).css({
            'background-color': config.tips[1],
            'padding-right': (config.closeBtn ? '30px' : '')
        });
        hnaero.css({
            left: goal.tipLeft - (config.fixed ? win.scrollLeft() : 0),
            top: goal.tipTop - (config.fixed ? win.scrollTop() : 0)
        });
    }

//拖拽层
    Class.pt.move = function () {
        var that = this
            , config = that.config
            , _DOC = $(document)
            , hnaero = that.hnaero
            , moveElem = hnaero.find(config.move)
            , resizeElem = hnaero.find('.hnaui-hnaer-resize')
            , dict = {};

        if (config.move) {
            moveElem.css('cursor', 'move');
        }

        moveElem.on('mousedown', function (e) {
            e.preventDefault();
            if (config.move) {
                dict.moveStart = true;
                dict.offset = [
                    e.clientX - parseFloat(hnaero.css('left'))
                    , e.clientY - parseFloat(hnaero.css('top'))
                ];
                ready.moveElem.css('cursor', 'move').show();
            }
        });

        resizeElem.on('mousedown', function (e) {
            e.preventDefault();
            dict.resizeStart = true;
            dict.offset = [e.clientX, e.clientY];
            dict.area = [
                hnaero.outerWidth()
                , hnaero.outerHeight()
            ];
            ready.moveElem.css('cursor', 'se-resize').show();
        });

        _DOC.on('mousemove', function (e) {

            //拖拽移动
            if (dict.moveStart) {
                var X = e.clientX - dict.offset[0]
                    , Y = e.clientY - dict.offset[1]
                    , fixed = hnaero.css('position') === 'fixed';

                e.preventDefault();

                dict.stX = fixed ? 0 : win.scrollLeft();
                dict.stY = fixed ? 0 : win.scrollTop();

                //控制元素不被拖出窗口外
                if (!config.moveOut) {
                    var setRig = win.width() - hnaero.outerWidth() + dict.stX
                        , setBot = win.height() - hnaero.outerHeight() + dict.stY;
                    X < dict.stX && (X = dict.stX);
                    X > setRig && (X = setRig);
                    Y < dict.stY && (Y = dict.stY);
                    Y > setBot && (Y = setBot);
                }

                hnaero.css({
                    left: X
                    , top: Y
                });
            }

            //Resize
            if (config.resize && dict.resizeStart) {
                var X = e.clientX - dict.offset[0]
                    , Y = e.clientY - dict.offset[1];

                e.preventDefault();

                hnaer.style(that.index, {
                    width: dict.area[0] + X
                    , height: dict.area[1] + Y
                })
                dict.isResize = true;
                config.resizing && config.resizing(hnaero);
            }
        }).on('mouseup', function (e) {
            if (dict.moveStart) {
                delete dict.moveStart;
                ready.moveElem.hide();
                config.moveEnd && config.moveEnd(hnaero);
            }
            if (dict.resizeStart) {
                delete dict.resizeStart;
                ready.moveElem.hide();
            }
        });

        return that;
    };

    Class.pt.callback = function () {
        var that = this, hnaero = that.hnaero, config = that.config;
        that.openhnaer();
        if (config.success) {
            if (config.type == 2) {
                hnaero.find('iframe').on('load', function () {
                    config.success(hnaero, that.index);
                });
            } else {
                config.success(hnaero, that.index);
            }
        }
        hnaer.ie == 6 && that.IE6(hnaero);

        //按钮
        hnaero.find('.' + doms[6]).children('a').on('click', function () {
            var index = $(this).index();
            if (index === 0) {
                if (config.yes) {
                    config.yes(that.index, hnaero)
                } else if (config['btn1']) {
                    config['btn1'](that.index, hnaero)
                } else {
                    hnaer.close(that.index);
                }
            } else {
                var close = config['btn' + (index + 1)] && config['btn' + (index + 1)](that.index, hnaero);
                close === false || hnaer.close(that.index);
            }
        });

        //取消
        function cancel() {
            var close = config.cancel && config.cancel(that.index, hnaero);
            close === false || hnaer.close(that.index);
        }

        //右上角关闭回调
        hnaero.find('.' + doms[7]).on('click', cancel);

        //点遮罩关闭
        if (config.shadeClose) {
            $('#hnaui-hnaer-shade' + that.index).on('click', function () {
                hnaer.close(that.index);
            });
        }

        //最小化
        hnaero.find('.hnaui-hnaer-min').on('click', function () {
            var min = config.min && config.min(hnaero);
            min === false || hnaer.min(that.index, config);
        });

        //全屏/还原
        hnaero.find('.hnaui-hnaer-max').on('click', function () {
            if ($(this).hasClass('hnaui-hnaer-maxmin')) {
                hnaer.restore(that.index);
                config.restore && config.restore(hnaero);
            } else {
                hnaer.full(that.index, config);
                setTimeout(function () {
                    config.full && config.full(hnaero);
                }, 100);
            }
        });

        config.end && (ready.end[that.index] = config.end);
    };

//for ie6 恢复select
    ready.reselect = function () {
        $.each($('select'), function (index, value) {
            var sthis = $(this);
            if (!sthis.parents('.' + doms[0])[0]) {
                (sthis.attr('hnaer') == 1 && $('.' + doms[0]).length < 1) && sthis.removeAttr('hnaer').show();
            }
            sthis = null;
        });
    };

    Class.pt.IE6 = function (hnaero) {
        //隐藏select
        $('select').each(function (index, value) {
            var sthis = $(this);
            if (!sthis.parents('.' + doms[0])[0]) {
                sthis.css('display') === 'none' || sthis.attr({'hnaer': '1'}).hide();
            }
            sthis = null;
        });
    };

//需依赖原型的对外方法
    Class.pt.openhnaer = function () {
        var that = this;

        //置顶当前窗口
        hnaer.zIndex = that.config.zIndex;
        hnaer.setTop = function (hnaero) {
            var setZindex = function () {
                hnaer.zIndex++;
                hnaero.css('z-index', hnaer.zIndex + 1);
            };
            hnaer.zIndex = parseInt(hnaero[0].style.zIndex);
            hnaero.on('mousedown', setZindex);
            return hnaer.zIndex;
        };
    };

    ready.record = function (hnaero) {
        var area = [
            hnaero.width(),
            hnaero.height(),
            hnaero.position().top,
            hnaero.position().left + parseFloat(hnaero.css('margin-left'))
        ];
        hnaero.find('.hnaui-hnaer-max').addClass('hnaui-hnaer-maxmin');
        hnaero.attr({area: area});
    };

    ready.rescollbar = function (index) {
        if (doms.html.attr('hnaer-full') == index) {
            if (doms.html[0].style.removeProperty) {
                doms.html[0].style.removeProperty('overflow');
            } else {
                doms.html[0].style.removeAttribute('overflow');
            }
            doms.html.removeAttr('hnaer-full');
        }
    };

    /** 内置成员 */

    window.hnaer = hnaer;

//获取子iframe的DOM
    hnaer.getChildFrame = function (selector, index) {
        index = index || $('.' + doms[4]).attr('times');
        return $('#' + doms[0] + index).find('iframe').contents().find(selector);
    };

//得到当前iframe层的索引，子iframe时使用
    hnaer.getFrameIndex = function (name) {
        return $('#' + name).parents('.' + doms[4]).attr('times');
    };

//iframe层自适应宽高
    hnaer.iframeAuto = function (index) {
        if (!index) return;
        var heg = hnaer.getChildFrame('html', index).outerHeight();
        var hnaero = $('#' + doms[0] + index);
        var titHeight = hnaero.find(doms[1]).outerHeight() || 0;
        var btnHeight = hnaero.find('.' + doms[6]).outerHeight() || 0;
        hnaero.css({height: heg + titHeight + btnHeight});
        hnaero.find('iframe').css({height: heg});
    };

//重置iframe url
    hnaer.iframeSrc = function (index, url) {
        $('#' + doms[0] + index).find('iframe').attr('src', url);
    };

//设定层的样式
    hnaer.style = function (index, options, limit) {
        var hnaero = $('#' + doms[0] + index)
            , contElem = hnaero.find('.hnaui-hnaer-content')
            , type = hnaero.attr('type')
            , titHeight = hnaero.find(doms[1]).outerHeight() || 0
            , btnHeight = hnaero.find('.' + doms[6]).outerHeight() || 0
            , minLeft = hnaero.attr('minLeft');

        if (type === ready.type[3] || type === ready.type[4]) {
            return;
        }

        if (!limit) {
            if (parseFloat(options.width) <= 260) {
                options.width = 260;
            }
            ;

            if (parseFloat(options.height) - titHeight - btnHeight <= 64) {
                options.height = 64 + titHeight + btnHeight;
            }
            ;
        }

        hnaero.css(options);
        btnHeight = hnaero.find('.' + doms[6]).outerHeight();

        if (type === ready.type[2]) {
            hnaero.find('iframe').css({
                height: parseFloat(options.height) - titHeight - btnHeight
            });
        } else {
            var contH = parseFloat(options.height) - titHeight - btnHeight
                - parseFloat(contElem.css('padding-top'))
                - parseFloat(contElem.css('padding-bottom'));
            contElem.css({
                height: contH
            })
        }
    };

//最小化
    hnaer.min = function (index, options) {
        var hnaero = $('#' + doms[0] + index)
            , titHeight = hnaero.find(doms[1]).outerHeight() || 0
            , left = hnaero.attr('minLeft') || (181 * ready.minIndex) + 'px'
            , position = hnaero.css('position');

        ready.record(hnaero);

        if (ready.minLeft[0]) {
            left = ready.minLeft[0];
            ready.minLeft.shift();
        }

        hnaero.attr('position', position);

        hnaer.style(index, {
            width: 180
            , height: titHeight
            , left: left
            , top: win.height() - titHeight
            , position: 'fixed'
            , overflow: 'hidden'
        }, true);

        hnaero.find('.hnaui-hnaer-min').hide();
        hnaero.attr('type') === 'page' && hnaero.find(doms[4]).hide();
        ready.rescollbar(index);

        if (!hnaero.attr('minLeft')) {
            ready.minIndex++;
        }
        hnaero.attr('minLeft', left);
    };

//还原
    hnaer.restore = function (index) {
        var hnaero = $('#' + doms[0] + index), area = hnaero.attr('area').split(',');
        var type = hnaero.attr('type');
        hnaer.style(index, {
            width: parseFloat(area[0]),
            height: parseFloat(area[1]),
            top: parseFloat(area[2]),
            left: parseFloat(area[3]),
            position: hnaero.attr('position'),
            overflow: 'visible'
        }, true);
        hnaero.find('.hnaui-hnaer-max').removeClass('hnaui-hnaer-maxmin');
        hnaero.find('.hnaui-hnaer-min').show();
        hnaero.attr('type') === 'page' && hnaero.find(doms[4]).show();
        ready.rescollbar(index);
    };

//全屏
    hnaer.full = function (index) {
        var hnaero = $('#' + doms[0] + index), timer;
        ready.record(hnaero);
        if (!doms.html.attr('hnaer-full')) {
            doms.html.css('overflow', 'hidden').attr('hnaer-full', index);
        }
        clearTimeout(timer);
        timer = setTimeout(function () {
            var isfix = hnaero.css('position') === 'fixed';
            hnaer.style(index, {
                top: isfix ? 0 : win.scrollTop(),
                left: isfix ? 0 : win.scrollLeft(),
                width: win.width(),
                height: win.height()
            }, true);
            hnaero.find('.hnaui-hnaer-min').hide();
        }, 100);
    };

//改变title
    hnaer.title = function (name, index) {
        var title = $('#' + doms[0] + (index || hnaer.index)).find(doms[1]);
        title.html(name);
    };

//关闭hnaer总方法
    hnaer.close = function (index) {
        var hnaero = $('#' + doms[0] + index), type = hnaero.attr('type'), closeAnim = 'hnaer-anim-close';
        if (!hnaero[0]) return;
        var WRAP = 'hnaui-hnaer-wrap', remove = function () {
            if (type === ready.type[1] && hnaero.attr('conType') === 'object') {
                hnaero.children(':not(.' + doms[5] + ')').remove();
                var wrap = hnaero.find('.' + WRAP);
                for (var i = 0; i < 2; i++) {
                    wrap.unwrap();
                }
                wrap.css('display', wrap.data('display')).removeClass(WRAP);
            } else {
                //低版本IE 回收 iframe
                if (type === ready.type[2]) {
                    try {
                        var iframe = $('#' + doms[4] + index)[0];
                        iframe.contentWindow.document.write('');
                        iframe.contentWindow.close();
                        hnaero.find('.' + doms[5])[0].removeChild(iframe);
                    } catch (e) {
                    }
                }
                hnaero[0].innerHTML = '';
                hnaero.remove();
            }
            typeof ready.end[index] === 'function' && ready.end[index]();
            delete ready.end[index];
        };

        if (hnaero.data('isOutAnim')) {
            hnaero.addClass(closeAnim);
        }

        $('#hnaui-hnaer-moves, #hnaui-hnaer-shade' + index).remove();
        hnaer.ie == 6 && ready.reselect();
        ready.rescollbar(index);
        if (hnaero.attr('minLeft')) {
            ready.minIndex--;
            ready.minLeft.push(hnaero.attr('minLeft'));
        }

        if ((hnaer.ie && hnaer.ie < 10) || !hnaero.data('isOutAnim')) {
            remove()
        } else {
            setTimeout(function () {
                remove();
            }, 200);
        }
    };

//关闭所有层
    hnaer.closeAll = function (type) {
        $.each($('.' + doms[0]), function () {
            var othis = $(this);
            var is = type ? (othis.attr('type') === type) : 1;
            is && hnaer.close(othis.attr('times'));
            is = null;
        });
    };

    /**

     拓展模块，hnaui开始合并在一起

     */

    var cache = hnaer.cache || {}, skin = function (type) {
        return (cache.skin ? (' ' + cache.skin + ' ' + cache.skin + '-' + type) : '');
    };

//仿系统prompt
    hnaer.prompt = function (options, yes) {
        var style = '';
        options = options || {};

        if (typeof options === 'function') yes = options;

        if (options.area) {
            var area = options.area;
            style = 'style="width: ' + area[0] + '; height: ' + area[1] + ';"';
            delete options.area;
        }
        var prompt, content = options.formType == 2 ? '<textarea class="hnaui-hnaer-input"' + style + '>' + (options.value || '') + '</textarea>' : function () {
            return '<input type="' + (options.formType == 1 ? 'password' : 'text') + '" class="hnaui-hnaer-input" value="' + (options.value || '') + '">';
        }();

        var success = options.success;
        delete options.success;

        return hnaer.open($.extend({
            type: 1
            , btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;']
            , content: content
            , skin: 'hnaui-hnaer-prompt' + skin('prompt')
            , maxWidth: win.width()
            , success: function (hnaero) {
                prompt = hnaero.find('.hnaui-hnaer-input');
                prompt.focus();
                typeof success === 'function' && success(hnaero);
            }
            , resize: false
            , yes: function (index) {
                var value = prompt.val();
                if (value === '') {
                    prompt.focus();
                } else if (value.length > (options.maxlength || 500)) {
                    hnaer.tips('&#x6700;&#x591A;&#x8F93;&#x5165;' + (options.maxlength || 500) + '&#x4E2A;&#x5B57;&#x6570;', prompt, {tips: 1});
                } else {
                    yes && yes(value, index, prompt);
                }
            }
        }, options));
    };

//tab层
    hnaer.tab = function (options) {
        options = options || {};

        var tab = options.tab || {}
            , success = options.success;

        delete options.success;

        return hnaer.open($.extend({
            type: 1,
            skin: 'hnaui-hnaer-tab' + skin('tab'),
            resize: false,
            title: function () {
                var len = tab.length, ii = 1, str = '';
                if (len > 0) {
                    str = '<span class="hnaui-hnaer-tabnow">' + tab[0].title + '</span>';
                    for (; ii < len; ii++) {
                        str += '<span>' + tab[ii].title + '</span>';
                    }
                }
                return str;
            }(),
            content: '<ul class="hnaui-hnaer-tabmain">' + function () {
                var len = tab.length, ii = 1, str = '';
                if (len > 0) {
                    str = '<li class="hnaui-hnaer-tabli xubox_tab_hnaer">' + (tab[0].content || 'no content') + '</li>';
                    for (; ii < len; ii++) {
                        str += '<li class="hnaui-hnaer-tabli">' + (tab[ii].content || 'no  content') + '</li>';
                    }
                }
                return str;
            }() + '</ul>',
            success: function (hnaero) {
                var btn = hnaero.find('.hnaui-hnaer-title').children();
                var main = hnaero.find('.hnaui-hnaer-tabmain').children();
                btn.on('mousedown', function (e) {
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
                    var othis = $(this), index = othis.index();
                    othis.addClass('hnaui-hnaer-tabnow').siblings().removeClass('hnaui-hnaer-tabnow');
                    main.eq(index).show().siblings().hide();
                    typeof options.change === 'function' && options.change(index);
                });
                typeof success === 'function' && success(hnaero);
            }
        }, options));
    };

//相册层
    hnaer.photos = function (options, loop, key) {
        var dict = {};
        options = options || {};
        if (!options.photos) return;
        var type = options.photos.constructor === Object;
        var photos = type ? options.photos : {}, data = photos.data || [];
        var start = photos.start || 0;
        dict.imgIndex = (start | 0) + 1;

        options.img = options.img || 'img';

        var success = options.success;
        delete options.success;

        if (!type) { //页面直接获取
            var parent = $(options.photos), pushData = function () {
                data = [];
                parent.find(options.img).each(function (index) {
                    var othis = $(this);
                    othis.attr('hnaer-index', index);
                    data.push({
                        alt: othis.attr('alt'),
                        pid: othis.attr('hnaer-pid'),
                        src: othis.attr('hnaer-src') || othis.attr('src'),
                        thumb: othis.attr('src')
                    });
                })
            };

            pushData();

            if (data.length === 0) return;

            loop || parent.on('click', options.img, function () {
                var othis = $(this), index = othis.attr('hnaer-index');
                hnaer.photos($.extend(options, {
                    photos: {
                        start: index,
                        data: data,
                        tab: options.tab
                    },
                    full: options.full
                }), true);
                pushData();
            })

            //不直接弹出
            if (!loop) return;

        } else if (data.length === 0) {
            return hnaer.msg('&#x6CA1;&#x6709;&#x56FE;&#x7247;');
        }

        //上一张
        dict.imgprev = function (key) {
            dict.imgIndex--;
            if (dict.imgIndex < 1) {
                dict.imgIndex = data.length;
            }
            dict.tabimg(key);
        };

        //下一张
        dict.imgnext = function (key, errorMsg) {
            dict.imgIndex++;
            if (dict.imgIndex > data.length) {
                dict.imgIndex = 1;
                if (errorMsg) {
                    return
                }
                ;
            }
            dict.tabimg(key)
        };

        //方向键
        dict.keyup = function (event) {
            if (!dict.end) {
                var code = event.keyCode;
                event.preventDefault();
                if (code === 37) {
                    dict.imgprev(true);
                } else if (code === 39) {
                    dict.imgnext(true);
                } else if (code === 27) {
                    hnaer.close(dict.index);
                }
            }
        }

        //切换
        dict.tabimg = function (key) {
            if (data.length <= 1) return;
            photos.start = dict.imgIndex - 1;
            hnaer.close(dict.index);
            return hnaer.photos(options, true, key);
            setTimeout(function () {
                hnaer.photos(options, true, key);
            }, 200);
        }

        //一些动作
        dict.event = function () {
            dict.bigimg.hover(function () {
                dict.imgsee.show();
            }, function () {
                dict.imgsee.hide();
            });

            dict.bigimg.find('.hnaui-hnaer-imgprev').on('click', function (event) {
                event.preventDefault();
                dict.imgprev();
            });

            dict.bigimg.find('.hnaui-hnaer-imgnext').on('click', function (event) {
                event.preventDefault();
                dict.imgnext();
            });

            $(document).on('keyup', dict.keyup);
        };

        //图片预加载
        function loadImage(url, callback, error) {
            var img = new Image();
            img.src = url;
            if (img.complete) {
                return callback(img);
            }
            img.onload = function () {
                img.onload = null;
                callback(img);
            };
            img.onerror = function (e) {
                img.onerror = null;
                error(e);
            };
        };

        dict.loadi = hnaer.load(1, {
            shade: 'shade' in options ? false : 0.9,
            scrollbar: false
        });

        loadImage(data[start].src, function (img) {
            hnaer.close(dict.loadi);
            dict.index = hnaer.open($.extend({
                type: 1,
                id: 'hnaui-hnaer-photos',
                area: function () {
                    var imgarea = [img.width, img.height];
                    var winarea = [$(window).width() - 100, $(window).height() - 100];

                    //如果 实际图片的宽或者高比 屏幕大（那么进行缩放）
                    if (!options.full && (imgarea[0] > winarea[0] || imgarea[1] > winarea[1])) {
                        var wh = [imgarea[0] / winarea[0], imgarea[1] / winarea[1]];//取宽度缩放比例、高度缩放比例
                        if (wh[0] > wh[1]) {//取缩放比例最大的进行缩放
                            imgarea[0] = imgarea[0] / wh[0];
                            imgarea[1] = imgarea[1] / wh[0];
                        } else if (wh[0] < wh[1]) {
                            imgarea[0] = imgarea[0] / wh[1];
                            imgarea[1] = imgarea[1] / wh[1];
                        }
                    }

                    return [imgarea[0] + 'px', imgarea[1] + 'px'];
                }(),
                title: false,
                shade: 0.9,
                shadeClose: true,
                closeBtn: false,
                move: '.hnaui-hnaer-phimg img',
                moveType: 1,
                scrollbar: false,
                moveOut: true,
                //anim: Math.random()*5|0,
                isOutAnim: false,
                skin: 'hnaui-hnaer-photos' + skin('photos'),
                content: '<div class="hnaui-hnaer-phimg">'
                + '<img src="' + data[start].src + '" alt="' + (data[start].alt || '') + '" hnaer-pid="' + data[start].pid + '">'
                + '<div class="hnaui-hnaer-imgsee">'
                + (data.length > 1 ? '<span class="hnaui-hnaer-imguide"><a href="javascript:;" class="hnaui-hnaer-iconext hnaui-hnaer-imgprev"></a><a href="javascript:;" class="hnaui-hnaer-iconext hnaui-hnaer-imgnext"></a></span>' : '')
                + '<div class="hnaui-hnaer-imgbar" style="display:' + (key ? 'block' : '') + '"><span class="hnaui-hnaer-imgtit"><a href="javascript:;">' + (data[start].alt || '') + '</a><em>' + dict.imgIndex + '/' + data.length + '</em></span></div>'
                + '</div>'
                + '</div>',
                success: function (hnaero, index) {
                    dict.bigimg = hnaero.find('.hnaui-hnaer-phimg');
                    dict.imgsee = hnaero.find('.hnaui-hnaer-imguide,.hnaui-hnaer-imgbar');
                    dict.event(hnaero);
                    options.tab && options.tab(data[start], hnaero);
                    typeof success === 'function' && success(hnaero);
                }, end: function () {
                    dict.end = true;
                    $(document).off('keyup', dict.keyup);
                }
            }, options));
        }, function () {
            hnaer.close(dict.loadi);
            hnaer.msg('&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;', {
                time: 30000,
                btn: ['&#x4E0B;&#x4E00;&#x5F20;', '&#x4E0D;&#x770B;&#x4E86;'],
                yes: function () {
                    data.length > 1 && dict.imgnext(true, true);
                }
            });
        });
    };

//主入口
    ready.run = function (_$) {
        $ = _$;
        win = $(window);
        doms.html = $('html');
        hnaer.open = function (deliver) {
            var o = new Class(deliver);
            return o.index;
        };
    };

//加载方式
    window.hnaui && hnaui.define ? (
        hnaer.ready()
            , hnaui.define('jquery', function (exports) { //hnaui加载
            hnaer.path = hnaui.cache.dir;
            ready.run(hnaui.jquery);

            //暴露模块
            window.hnaer = hnaer;
            exports('hnaer', hnaer);
        })
    ) : (
        (typeof define === 'function' && define.amd) ? define(['jquery'], function () { //requirejs加载
            ready.run(window.jQuery);
            return hnaer;
        }) : function () { //普通script标签加载
            ready.run(window.jQuery);
            hnaer.ready();
        }()
    );

}(window);
