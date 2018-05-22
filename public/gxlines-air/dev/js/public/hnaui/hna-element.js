/**

 @Name：hnaui.element 常用元素操作
 @Author：贤心
 @License：MIT

 */

hnaui.define('jquery', function (exports) {
    "use strict";

    var $ = hnaui.jquery,
        hint = hnaui.hint(),
        device = hnaui.device(),
        MOD_NAME = 'element', THIS = 'hnaui-this', SHOW = 'hnaui-show',
        Element = function () {
            this.config = {};
        };

    //全局设置
    Element.prototype.set = function (options) {
        var that = this;
        $.extend(true, that.config, options);
        return that;
    };

    //表单事件监听
    Element.prototype.on = function (events, callback) {
        return hnaui.onevent(MOD_NAME, events, callback);
    };

    //外部Tab新增
    Element.prototype.tabAdd = function (filter, options) {
        var TITLE = '.hnaui-tab-title',
            tabElem = $('.hnaui-tab[hna-filter=' + filter + ']'),
            titElem = tabElem.children(TITLE),
            contElem = tabElem.children('.hnaui-tab-content');
        titElem.append('<li hna-id="' + (options.id || '') + '">' + (options.title || 'unnaming') + '</li>');
        contElem.append('<div class="hnaui-tab-item">' + (options.content || '') + '</div>');
        call.hideTabMore(true);
        call.tabAuto();
        return this;
    };

    //外部Tab删除
    Element.prototype.tabDelete = function (filter, layid) {
        var TITLE = '.hnaui-tab-title',
            tabElem = $('.hnaui-tab[hna-filter=' + filter + ']'),
            titElem = tabElem.children(TITLE),
            liElem = titElem.find('>li[hna-id="' + layid + '"]');
        call.tabDelete(null, liElem);
        return this;
    };

    //外部Tab切换
    Element.prototype.tabChange = function (filter, layid) {
        var TITLE = '.hnaui-tab-title',
            tabElem = $('.hnaui-tab[hna-filter=' + filter + ']'),
            titElem = tabElem.children(TITLE),
            liElem = titElem.find('>li[hna-id="' + layid + '"]');
        call.tabClick(null, null, liElem);
        return this;
    };

    //动态改变进度条
    Element.prototype.progress = function (filter, percent) {
        var ELEM = 'hnaui-progress',
            elem = $('.' + ELEM + '[hna-filter=' + filter + ']'),
            elemBar = elem.find('.' + ELEM + '-bar'),
            text = elemBar.find('.' + ELEM + '-text');
        elemBar.css('width', percent);
        text.text(percent);
        return this;
    };

    var NAV_ELEM = '.hnaui-nav', NAV_ITEM = 'hnaui-nav-item', NAV_BAR = 'hnaui-nav-bar',
        NAV_TREE = 'hnaui-nav-tree', NAV_CHILD = 'hnaui-nav-child', NAV_MORE = 'hnaui-nav-more',
        NAV_ANIM = 'hnaui-anim hnaui-anim-upbit',

    //基础事件体
        call = {
            //Tab点击
            tabClick: function (e, index, liElem) {
                var othis = liElem || $(this),
                    index = index || othis.parent().children('li').index(othis),
                    parents = othis.parents('.hnaui-tab').eq(0),
                    item = parents.children('.hnaui-tab-content').children('.hnaui-tab-item'),
                    filter = parents.attr('hna-filter');

                othis.addClass(THIS).siblings().removeClass(THIS);
                item.eq(index).addClass(SHOW).siblings().removeClass(SHOW);

                hnaui.event.call(this, MOD_NAME, 'tab(' + filter + ')', {
                    elem: parents,
                    index: index
                });
            },

            //Tab删除
            tabDelete: function (e, othis) {
                var li = othis || $(this).parent(), index = li.index();
                var parents = li.parents('.hnaui-tab').eq(0);
                var item = parents.children('.hnaui-tab-content').children('.hnaui-tab-item')

                if (li.hasClass(THIS)) {
                    if (li.next()[0]) {
                        call.tabClick.call(li.next()[0], null, index + 1);
                    } else if (li.prev()[0]) {
                        call.tabClick.call(li.prev()[0], null, index - 1);
                    }
                }

                li.remove();
                item.eq(index).remove();
                setTimeout(function () {
                    call.tabAuto();
                }, 50);
            },

            //Tab自适应
            tabAuto: function () {
                var SCROLL = 'hnaui-tab-scroll', MORE = 'hnaui-tab-more', BAR = 'hnaui-tab-bar',
                    CLOSE = 'hnaui-tab-close', that = this;

                $('.hnaui-tab').each(function () {
                    var othis = $(this),
                        title = othis.children('.hnaui-tab-title'),
                        item = othis.children('.hnaui-tab-content').children('.hnaui-tab-item'),
                        STOPE = 'hna-stope="tabmore"',
                        span = $('<span class="hnaui-unselect hnaui-tab-bar" ' + STOPE + '><i ' + STOPE + ' class="hnaui-icon">&#xe61a;</i></span>');

                    if (that === window && device.ie != 8) {
                        call.hideTabMore(true)
                    }

                    //允许关闭
                    if (othis.attr('hna-allowClose')) {
                        title.find('li').each(function () {
                            var li = $(this);
                            if (!li.find('.' + CLOSE)[0]) {
                                var close = $('<i class="hnaui-icon hnaui-unselect ' + CLOSE + '">&#x2716;</i>');
                                close.on('click', call.tabDelete);
                                li.append(close);
                            }
                        });
                    }

                    //响应式
                    if (title.prop('scrollWidth') > title.outerWidth() + 1) {
                        if (title.find('.' + BAR)[0]) return;
                        title.append(span);
                        othis.attr('overflow', '');
                        span.on('click', function (e) {
                            title[this.title ? 'removeClass' : 'addClass'](MORE);
                            this.title = this.title ? '' : '收缩';
                        });
                    } else {
                        title.find('.' + BAR).remove();
                        othis.removeAttr('overflow');
                    }
                });
            },
            //隐藏更多Tab
            hideTabMore: function (e) {
                var tsbTitle = $('.hnaui-tab-title');
                if (e === true || $(e.target).attr('hna-stope') !== 'tabmore') {
                    tsbTitle.removeClass('hnaui-tab-more');
                    tsbTitle.find('.hnaui-tab-bar').attr('title', '');
                }
            },

            //点击选中
            clickThis: function () {
                var othis = $(this), parents = othis.parents(NAV_ELEM),
                    filter = parents.attr('hna-filter');

                if (othis.find('.' + NAV_CHILD)[0]) return;
                parents.find('.' + THIS).removeClass(THIS);
                othis.addClass(THIS);
                hnaui.event.call(this, MOD_NAME, 'nav(' + filter + ')', othis);
            },
            //点击子菜单选中
            clickChild: function () {
                var othis = $(this), parents = othis.parents(NAV_ELEM),
                    filter = parents.attr('hna-filter');
                parents.find('.' + THIS).removeClass(THIS);
                othis.addClass(THIS);
                hnaui.event.call(this, MOD_NAME, 'nav(' + filter + ')', othis);
            },
            //展开二级菜单
            showChild: function () {
                var othis = $(this), parents = othis.parents(NAV_ELEM);
                var parent = othis.parent(), child = othis.siblings('.' + NAV_CHILD);
                if (parents.hasClass(NAV_TREE)) {
                    child.removeClass(NAV_ANIM);
                    parent[child.css('display') === 'none' ? 'addClass' : 'removeClass'](NAV_ITEM + 'ed');
                }
            },

            //折叠面板
            collapse: function () {
                var othis = $(this), icon = othis.find('.hnaui-colla-icon'),
                    elemCont = othis.siblings('.hnaui-colla-content'),
                    parents = othis.parents('.hnaui-collapse').eq(0),
                    filter = parents.attr('hna-filter'),
                    isNone = elemCont.css('display') === 'none';
                //是否手风琴
                if (typeof parents.attr('hna-accordion') === 'string') {
                    var show = parents.children('.hnaui-colla-item').children('.' + SHOW);
                    show.siblings('.hnaui-colla-title').children('.hnaui-colla-icon').html('&#xe602;');
                    show.removeClass(SHOW);
                }
                elemCont[isNone ? 'addClass' : 'removeClass'](SHOW);
                icon.html(isNone ? '&#xe61a;' : '&#xe602;');

                hnaui.event.call(this, MOD_NAME, 'collapse(' + filter + ')', {
                    title: othis,
                    content: elemCont,
                    show: isNone
                });
            }
        };

    //初始化元素操作
    Element.prototype.init = function (type) {
        var that = this, items = {

            //Tab选项卡
            tab: function () {
                call.tabAuto.call({});
            },

            //导航菜单
            nav: function () {
                var TIME = 200, timer, timerMore, timeEnd, follow = function (bar, nav) {
                    var othis = $(this), child = othis.find('.' + NAV_CHILD);

                    if (nav.hasClass(NAV_TREE)) {
                        bar.css({
                            top: othis.position().top,
                            height: othis.children('a').height(),
                            opacity: 1
                        });
                    } else {
                        child.addClass(NAV_ANIM);
                        bar.css({
                            left: othis.position().left + parseFloat(othis.css('marginLeft')),
                            top: othis.position().top + othis.height() - 5
                        });

                        timer = setTimeout(function () {
                            bar.css({
                                width: othis.width(),
                                opacity: 1
                            });
                        }, device.ie && device.ie < 10 ? 0 : TIME);

                        clearTimeout(timeEnd);
                        if (child.css('display') === 'block') {
                            clearTimeout(timerMore);
                        }
                        timerMore = setTimeout(function () {
                            child.addClass(SHOW)
                            othis.find('.' + NAV_MORE).addClass(NAV_MORE + 'd');
                        }, 300);
                    }
                }

                $(NAV_ELEM).each(function () {
                    var othis = $(this),
                        bar = $('<span class="' + NAV_BAR + '"></span>'),
                        itemElem = othis.find('.' + NAV_ITEM);

                    //Hover滑动效果
                    if (!othis.find('.' + NAV_BAR)[0]) {
                        othis.append(bar);
                        itemElem.on('mouseenter', function () {
                            follow.call(this, bar, othis);
                        }).on('mouseleave', function () {
                            if (!othis.hasClass(NAV_TREE)) {
                                clearTimeout(timerMore);
                                timerMore = setTimeout(function () {
                                    othis.find('.' + NAV_CHILD).removeClass(SHOW);
                                    othis.find('.' + NAV_MORE).removeClass(NAV_MORE + 'd');
                                }, 300);
                            }
                        });
                        othis.on('mouseleave', function () {
                            clearTimeout(timer)
                            timeEnd = setTimeout(function () {
                                if (othis.hasClass(NAV_TREE)) {
                                    bar.css({
                                        height: 0,
                                        top: bar.position().top + bar.height() / 2,
                                        opacity: 0
                                    });
                                } else {
                                    bar.css({
                                        width: 0,
                                        left: bar.position().left + bar.width() / 2,
                                        opacity: 0
                                    });
                                }
                            }, TIME);
                        });
                    }

                    itemElem.each(function () {
                        var oitem = $(this), child = oitem.find('.' + NAV_CHILD);

                        //二级菜单
                        if (child[0] && !oitem.find('.' + NAV_MORE)[0]) {
                            var one = oitem.children('a');
                            one.append('<span class="' + NAV_MORE + '"></span>');
                        }

                        oitem.off('click', call.clickThis).on('click', call.clickThis); //点击选中
                        oitem.children('a').off('click', call.showChild).on('click', call.showChild); //展开二级菜单
                        child.children('dd').off('click', call.clickChild).on('click', call.clickChild); //点击子菜单选中
                    });
                });
            },

            //面包屑
            breadcrumb: function () {
                var ELEM = '.hnaui-breadcrumb';

                $(ELEM).each(function () {
                    var othis = $(this),
                        separator = othis.attr('hna-separator') || '>',
                        aNode = othis.find('a');
                    if (aNode.find('.hnaui-box')[0]) return;
                    aNode.each(function (index) {
                        if (index === aNode.length - 1) return;
                        $(this).append('<span class="hnaui-box">' + separator + '</span>');
                    });
                    othis.css('visibility', 'visible');
                });
            },

            //进度条
            progress: function () {
                var ELEM = 'hnaui-progress';

                $('.' + ELEM).each(function () {
                    var othis = $(this),
                        elemBar = othis.find('.hnaui-progress-bar'),
                        width = elemBar.attr('hna-percent');
                    elemBar.css('width', width);
                    if (othis.attr('hna-showPercent')) {
                        setTimeout(function () {
                            var percent = Math.round(elemBar.width() / othis.width() * 100);
                            if (percent > 100) percent = 100;
                            elemBar.html('<span class="' + ELEM + '-text">' + percent + '%</span>');
                        }, 350);
                    }
                });
            },

            //折叠面板
            collapse: function () {
                var ELEM = 'hnaui-collapse';

                $('.' + ELEM).each(function () {
                    var elemItem = $(this).find('.hnaui-colla-item')
                    elemItem.each(function () {
                        var othis = $(this),
                            elemTitle = othis.find('.hnaui-colla-title'),
                            elemCont = othis.find('.hnaui-colla-content'),
                            isNone = elemCont.css('display') === 'none';

                        //初始状态
                        elemTitle.find('.hnaui-colla-icon').remove();
                        elemTitle.append('<i class="hnaui-icon hnaui-colla-icon">' + (isNone ? '&#xe602;' : '&#xe61a;') + '</i>');

                        //点击标题
                        elemTitle.off('click', call.collapse).on('click', call.collapse);
                    });

                });
            }
        };

        return hnaui.each(items, function (index, item) {
            item();
        });
    };

    var element = new Element(), dom = $(document);
    element.init();

    var TITLE = '.hnaui-tab-title li';
    dom.on('click', TITLE, call.tabClick); //Tab切换
    dom.on('click', call.hideTabMore); //隐藏展开的Tab
    $(window).on('resize', call.tabAuto); //自适应

    exports(MOD_NAME, function (options) {
        return element.set(options);
    });
});

