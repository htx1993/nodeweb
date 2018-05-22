/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
//城市选择面板需要的tab方法，因为历史原因，需要这个一个方法  后面重写城市选择面板，把这个方法去掉

+function ($) {
    'use strict';

    // TAB CLASS DEFINITION
    // ====================

    var Tab = function (element) {
        // jscs:disable requireDollarBeforejQueryAssignment
        this.element = $(element);
        // jscs:enable requireDollarBeforejQueryAssignment
    };

    Tab.VERSION = '3.3.7';

    Tab.TRANSITION_DURATION = 150;

    Tab.prototype.show = function () {
        var $this = this.element;
        var $ul = $this.closest('ul:not(.dropdown-menu)');
        var selector = $this.data('target');

        if (!selector) {
            selector = $this.attr('href') + "";
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
        }

        if ($this.parent('li').hasClass('active')) return;

        var $previous = $ul.find('.active:last a');
        var hideEvent = $.Event('hide.bs.tab', {
            relatedTarget: $this[0]
        });
        var showEvent = $.Event('show.bs.tab', {
            relatedTarget: $previous[0]
        });

        $previous.trigger(hideEvent);
        $this.trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;

        var $target = $(selector);

        this.activate($this.closest('li'), $ul);
        this.activate($target, $target.parent(), function () {
            $previous.trigger({
                type: 'hidden.bs.tab',
                relatedTarget: $this[0]
            });
            $this.trigger({
                type: 'shown.bs.tab',
                relatedTarget: $previous[0]
            });
        });
    };

    Tab.prototype.activate = function (element, container, callback) {
        var $active = container.find('> .active');
        var transition = callback
            && $.support.transition
            && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

        function next() {
            $active
                .removeClass('active')
                .find('> .dropdown-menu > .active')
                .removeClass('active')
                .end()
                .find('[data-toggle="tab"]')
                .attr('aria-expanded', false)

            element
                .addClass('active')
                .find('[data-toggle="tab"]')
                .attr('aria-expanded', true)

            if (transition) {
                element[0].offsetWidth // reflow for transition
                element.addClass('in')
            } else {
                element.removeClass('fade')
            }

            if (element.parent('.dropdown-menu').length) {
                element
                    .closest('li.dropdown')
                    .addClass('active')
                    .end()
                    .find('[data-toggle="tab"]')
                    .attr('aria-expanded', true)
            }

            callback && callback()
        }

        $active.length && transition ?
            $active
                .one('bsTransitionEnd', next)
                .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
            next()

        $active.removeClass('in')
    }


    // TAB PLUGIN DEFINITION
    // =====================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.tab')

            if (!data) $this.data('bs.tab', (data = new Tab(this)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.tab

    $.fn.tab = Plugin
    $.fn.tab.Constructor = Tab


    // TAB NO CONFLICT
    // ===============

    $.fn.tab.noConflict = function () {
        $.fn.tab = old
        return this
    }


    // TAB DATA-API
    // ============

    var clickHandler = function (e) {
        e.preventDefault()
        Plugin.call($(this), 'show')
    }

    $(document)
        .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
        .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/*
 * 航班城市选择插件
 * @author: Moicen
 *
 * 显示可供选择的城市列表,便于用户选择城市查询航班.
 * 使用方法:$("input").flightCity(config);
 * config为初始化配置项,可供配置的选项有:
 * data(Array):插件使用的本底数据
 * request(Object):远程读取数据的请求属性(url ect.)
 * paginator(Object):分页设置
 * handler(Object):事件处理设置(onSelect表示选中事件)
 * container(jQuery plain object | selector):所属容器,默认为body,对于模态框,使用模态框最外层容器
 */
+function ($) {
    "use strict";
    //城市数据
    var _flightCityData = [];
    //格式化后的数据
    var airportData = {};
    var _that;
    $.fn.flightCity = function (config) {
        _that = $(this);
            if (!$(this).is("input")) return false;
            var guid = $(this).data("guid"),
                _config = $.extend(true, {}, config),
                fc = CACHE[guid];
            return guid ? (fc ? fc.self : null) : new FlightCity(this, _config);
    };

    var identity = 0,
        CACHE = {},
        uid = "HNA_FLIGHT_CITIES" + "_" + (hna._code || ""),
        storeExpiration = 1000 * 60 * 3,
        TAB_FLAGS = {SLIDER: 1, MOBILE_SLIDER: 2},
        HNAER = [
            {id: "hot", title: "热门城市"},
            {id: "1", title: "ABCDEF", rows: ["A", "B", "C", "D", "E", "F"]},
            {id: "2", title: "GHJKL", rows: ["G", "H", "J", "K", "L"]},
            {id: false, title: ">>", flag: 2},
            {id: "3", title: "MNOPQR", rows: ["M", "N", "O", "P", "Q", "R"]},
            {id: "4", title: "STWXYZ", rows: ["S", "T", "W", "X", "Y", "Z"]},
            {id: "other", title: "国际港澳台"}
        ],
        MaxLinesPerTab = 15,
        DIVIDERS = {min: 4, mid: 6, max: 8};

    var DEFAULT = {
        data: [], /*grid所存储的数据集*/
        request: {
            url: hna._static_host + "/js/data/flightCity.js",
            keyword: "",
            sord: 1, /*排序方向(1:ASC, -1:DESC)*/
            sidx: undefined     /*排序字段*/
        },
        snapshot: {data: []},
        paginator: {
            paging: true, /*是否显示分页*/
            pageSize: 12, /*分页尺寸（每页显示记录数）*/
            pageIndex: 1, /*当前页码*/
            records: 0, /*记录总数*/
            pageCount: 0        /*总页数*/
        },
        handler: {}
    };
    //控件所需原始目标元素的事件
    var EVENTS = {
        focus: function (e) {
            var root = e.data.root,
                container = e.data.container,
                target = e.currentTarget;
            if (root.is(":visible")) return;
            showPanel(target, root, container);
        },
        click: function (e) {
            var root = e.data.root,
                container = e.data.container,
                target = e.currentTarget;
            if (root.is(":visible")) return;
            showPanel(target, root, container);
        },
        blur: function (e) {
            var root = e.data.root;
            if (!$(this).data("mousein")) {
                //root.hide();
                hide(root);
            }
        },
        mouseover: function (e) {
            $(e.currentTarget).data("mousein", true);
        },
        mouseleave: function (e) {
            $(e.currentTarget).data("mousein", false);
        }
    };

    function genId() {
        var id = identity++,
            prefix;
        do prefix = (((1 + Math.random()) * 0x10000) | 0).toString(16);
        while (CACHE[prefix + id]);
        return prefix + id;
    }

    //构造函数
    function FlightCity(ele, config) {
        var guid = genId();
        CACHE[guid] = {
            target: ele,
            root: $('<div class="hna-flight-city">').attr("id", guid),
            list: $("<div class='hna-flight-city-list hnaui-hide'>"),
            panel: $("<div class='hna-flight-city-panel'>"),
            mask: $("<div class='hna-flight-city-mask'>").append('<img src="' + hna._img_host + '/images/ajax-loading.gif"><span>&nbsp;&nbsp;&nbsp;数据加载中，请稍等...</span>'),
            error: $("<div class='hna-flight-city-error'>").append('<span>数据加载失败，请稍后重试！</span>'),
            data: null,
            self: this
        };
        config.container = config.container || "body";
        config.hnaer = config.hnaer || HNAER;
        $.extend(true, CACHE[guid], DEFAULT, config, {guid: guid});
        init(guid);
        this.guid = guid;
        this.root = CACHE[guid].root;
        eleEventInit(guid);
        $(ele).data("guid", guid);
        if ($(ele).is(":focus")) $(ele).trigger("focus");
    }

    FlightCity.prototype.close = function () {
        this.root.hide();
    }
    //FlightCity生命周期结束
    FlightCity.prototype.destroy = function () {
        this.root.off("click", ".hna-flight-city-list a");
        this.root.off("click", ".hna-flight-city-panel a");
        CACHE[this.root.attr("id")] = null;
        this.root.remove();
    }
    FlightCity.prototype.clear = function () {
        var config = CACHE[this.guid];
        config.data = null;
        config.list.empty();
        config.panel.empty();
        pagerReset(config);
    }
    //加载数据
    FlightCity.prototype.load = function (data) {
        var config = CACHE[this.guid];
        config.data = data;
        reload(config, true);
    }
    //表格数据重载
    FlightCity.prototype.reload = function (obj) {
        var config = CACHE[this.guid];
        config.paginator.pageIndex = 1;
        this.load(obj);
    }

    FlightCity.prototype.refresh = function () {
        var config = CACHE[this.guid];
        config.paginator.pageIndex = 1;
        this.load(config.snapshot.data);
    }

    //目标元素事件注册
    function eleEventInit(guid) {
        var config = CACHE[guid],
            ele = config.target,
            root = config.root,
            container = config.container,
            event;
        if ($(ele).data("guid")) {
            for (event in EVENTS) {
                $(ele).off(event, EVENTS[event]);
            }
        }
        for (event in EVENTS) {
            $(ele).on(event, {root: root, container: container}, EVENTS[event]);
        }
        $(ele).on("hna.change", function () {
            config.request.keyword = this.value;
            search(config, true);
        })
        $(document).on('mousedown', function (e) {
            //点击在目标元素上,不作处理
            if ($(e.target).data("guid") == guid) {
                config.panel.removeClass("hnaui-hide");
                config.list.addClass("hnaui-hide");
                return;
            }
            //点击在插件元素之外且插件元素可见,则隐藏.
            if ($(e.target).closest("#" + root.attr("id")).length === 0 && root.is(":visible")) {
                //root.hide();
                config.panel.removeClass("hnaui-hide");
                config.list.addClass("hnaui-hide");
                hide(root);
            }
        });
        $(window).on('resize', function () {
            //窗体尺寸变化时重新计算表格位置并显示
            if (root.is(":visible")) show(ele, root, container);
        });
    }

    //显示面板
    function showPanel(target, root, container) {
        root.find(".hna-flight-city-list").addClass("hnaui-hide");
        root.find(".hna-flight-city-panel").removeClass("hide");
        show(target, root, container);
        var guid = $(target).data("guid"),
            config = CACHE[guid],
            value = $(target).val() + "";
        if (!value) return;
        value = value.replace(/\s+/g, "");
        var match = config.data.first(function (item) {
            return item.city == value || item.code == value || item.pinyin == value;
        });
        var selector = "a[href='#city-" + guid + "-{0}']",
            id = "hot";
        if (match && !match.num) {
            id = match.tab || "other";
        }
        config.panel.find(selector.format(id)).tab("show");
    }

    //显示表格
    function show(target, root, container) {
        place(target, root, container);
        root.show().addClass("hna-flight-city-show");
        $("#hnadate_box").hide();
    }

    //隐藏面板
    function hide(root) {
        root.hide().removeClass("hna-flight-city-show");
    }

    //计算并设置表格位置
    function place(target, root, container) {
        var left = $(target).offset().left,
            top = $(target).offset().top,
            rootHeight = root.outerHeight(),
            rootWidth = root.outerWidth();
        var containerHeight = $(container).height(),
            containerTop = $(container).scrollTop(),
            bodyHeight = scrollHeight(),
            bodyWidth = document.body.scrollWidth;

        //如果超过容器边界
        if (top + rootHeight > containerHeight + containerTop && top + rootHeight > bodyHeight) {
            top = top - $(target).outerHeight() - rootHeight;
        }

        var parent = $(target).parent(), width = $(target).outerWidth();
        if (parent.hasClass("input-group")) {
            width = parent.outerWidth();
        }
        if (left + rootWidth > bodyWidth) {
            left = left - rootWidth + width;
        }

        top = top + $(target).outerHeight() + 8;

        if (bodyWidth < 375 && root.find(".hna-flight-city-list").hasClass("hide")) {
            left = 10
        }
        ;
        root.css({left: left, top: top});
    }

    function scrollHeight() {
        return document.body.scrollHeight == 0 ?
            document.documentElement.scrollHeight :
            document.body.scrollHeight;
    }

    function toggle(input, list, panel, query) {
        var value = $(input).val(),
            config = CACHE[$(input).data("guid")];
        if (value) {
            if (!config.request.keyword) {
                config.request.keyword = value;
                search(config);
            }
            query = true;
        }
        panel.toggleClass("hnaui-hide", !!query);
        list.toggleClass("hnaui-hide", !query);
    }

    //初始化
    function init(guid) {
        var style = "position:absolute;background-color:#fff;margin:0;z-index:100;";
        var config = CACHE[guid];
        $(config.container).append(config.root.attr("style", style).hide());
        initCheck(config);
        rootInit(config);
        eventInit(config);

        var url = config.request.url;
        var buffer = (CACHE[url] = CACHE[url] || {});
        if (!buffer.queue) buffer.queue = [];
        var store = hna._store.getStore(uid || "");
        if (store) {
            buffer.data = store.data;
            if (!store.hnaer) {
                store.hnaer = arrange(store.data);
                setStore(uid, store);
            }
            config.hnaer = store.hnaer;
            buffer.loaded = true;
        }
        //如果尚未加载完成
        if (!buffer.loaded) {
            buffer.queue.push(guid);
            if (!buffer.loading) {
                request(url, buffer, config);
                buffer.loading = true;
            }
        } else {
            renderData(guid);
        }
    }

    function renderData(guid) {
        var config = CACHE[guid],
            data = CACHE[config.request.url].data;
        config.snapshot.data = data;
        config.data = data;
        config.paginator.records = data.length;
        config.request.loaded = true;
        config.mask.hide();
        config.error.hide();
        reload(config, true);
    }

    function arrange(data) {
        //if(data.length <= 50) return hnaer;
        var code, letter, dict = {}, total = 0, hasHot = false, hasOther = false;
        //从A到Z循环计算对应行数
        for (code = 65; code <= 90; code++) {
            letter = String.fromCharCode(code);
            var count = Math.ceil(data.count(function (item) {
                    if (item.num) hasHot = true;
                    if (item.other) hasOther = true;
                    return item.letter == letter;
                }) / 5);
            if (count == 0) continue;
            total += (dict[letter] = count);
        }
        //四舍五入取整
        var divider = Math.round(total / MaxLinesPerTab);
        divider = divider <= DIVIDERS.min ? DIVIDERS.min : (divider <= DIVIDERS.mid ? DIVIDERS.mid : DIVIDERS.max);
        return assign(calculate(total, dict, divider), divider, hasHot, hasOther);
    }

    function calculate(lines, dict, divider) {
        var count = 0, tab = [], tabs = [],
            limit = Math.ceil(lines / divider);
        for (var letter in dict) {
            if (count == limit) {
                count = 0;
                tab = [];
            }
            var current = dict[letter];
            if (count + current <= limit + 1) {
                count += current;
                tab.push(letter);
                if (count >= limit) {
                    tabs.push(tab);
                    tab = [];
                    count = 0;
                }
            } else {
                tabs.push(tab);
                tab = [letter];
                count = current;
            }
        }
        if (tab.length > 0) tabs.push(tab);
        return tabs;
    }

    function assign(tabs, divider, hasHot, hasOther) {
        var hnaer = hasHot ? [HNAER[0]] : [], tab;
        for (var i = 0; i < tabs.length; i++) {
            tab = tabs[i];
            hnaer.push({
                id: (i + 1).toString(),
                title: tab.join(""),
                rows: tab
            });
            if (i == tabs.length) break;
            var slider = {id: randomId(), title: ">>"};
            //mobile slider
            if ((i + 1) % 2 == 0 && (i + 1) != divider) {
                slider.flag = 2;
            }
            //slider for pc
            if (divider == DIVIDERS.mid && (i + 1) % 3 == 0 && (i + 1) != divider) {
                slider.flag = 1;
            }
            if (divider == DIVIDERS.max && (i + 1) % 4 == 0 && (i + 1) != divider) {
                slider.flag = 1;
            }
            if (slider.flag) hnaer.push(slider);
        }
        if (hasOther) {
            hnaer.push(HNAER[HNAER.length - 1]);
        }
        return hnaer;
    }

    //生成两位随机id
    function randomId() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(2, 4);
    }

    function request(url, buffer, config) {
        mask(config);
        if (/(\/?\w+)+\.js$/.test(url)) {
            //跨域js文件
            $.getScript(url).done(function () {
                loadBuffer(buffer, window[uid]);
                window[uid] = undefined;
            }).always(function () {
                unmask(config);
            });
        } else {
            //接口或同源json文件
            //$.getJSON(url).done(function(data){
            //    loadBuffer(buffer, data);
            //}).always(function(){
            //    unmask(config);
            //});
            hna.ajax({
                "url": url,
                "type": "POST",
                "doneCallback": function (data) {
                    if (data && data.code == "200" && data.data instanceof Array && data.data.length > 0) {
                        loadBuffer(buffer, data.data);
                    } else {
                        showError(buffer);
                    }
                },
                "failCallback": function () {
                    showError(buffer);
                },
                "alwaysCallback": function () {
                    unmask(config);
                }
            });
        }
    }

    function loadBuffer(buffer, data) {
        buffer.data = data;
        var hnaer = arrange(data);
        setStore(uid, {data: data, hnaer: hnaer});
        for (var key in CACHE) {
            if (CACHE[key]["hnaer"]) {
                CACHE[key]["hnaer"] = hnaer;
            }
        }

        buffer.queue.forEach(renderData);
        buffer.loaded = true;
    }

    function setStore(key, value) {
        hna._store.setStore(key, value, storeExpiration);
    }

    function mask(config) {
        config.mask.show();
    }

    function unmask(config) {
        config.mask.hide();
    }

    //显示数据加载失败的提示
    function showError(buffer) {
        buffer.queue.forEach(function (guid) {
            CACHE[guid].mask.hide();
            CACHE[guid].error.show();
        });
    }

    function hideError(buffer) {
        buffer.queue.forEach(function (guid) {
            CACHE[guid].error.hide();
        });
    }

    //初始化校验
    function initCheck(config) {
        //校验排序方向是否为整数
        if (isNaN(parseInt(config.request.sord, 10))) {
            config.request.sord = 1;
        }
        return config;
    }

    //list事件初始化
    function eventInit(config) {
        var ele = config.target,
            root = config.root;
        root.on("click", ".hna-flight-city-list ul.list a", function () {
            var ridx = parseInt($(this).parent().data("ridx"), 10);
            var row = readRow(config, ridx);
            if (typeof config.handler.onSelect == "function") {
                config.handler.onSelect.call(config, row);
                config.request.keyword = ele.val();
                search(config);
            }
            //root.hide();
            toggleInput(ele);
            hide(root);
        });
        root.on("click", ".hna-flight-city-panel dl a", function () {
            var ridx = parseInt($(this).data("ridx"), 10);
            var row = readRow(config, ridx, true);
            if (typeof config.handler.onSelect == "function") {
                config.handler.onSelect.call(config, row);
                config.request.keyword = ele.val();
                search(config);
            }
            //root.hide();
            toggleInput(ele);
            hide(root);
        });

        var timestamp = 0, SPAN = 50;
        //鼠标悬浮切换tab页
        root.on("mouseover", ".hna-flight-city-panel .nav li.tab > a", function () {
            if (new Date().getTime() - timestamp < SPAN) {
                return;
            }
            $(this).tab("show");
        });
        //阻止超链接点击事件的默认行为
        root.on("click", ".hna-flight-city-panel .nav li.tab > a", function (e) {
            e.preventDefault();
        });
        root.on("mouseover", ".hna-flight-city-panel .nav li.slide > a", function () {
            if (new Date().getTime() - timestamp < SPAN) {
                return;
            }
            var li = $(this).parent();
            var role = li.attr("role");
            var slide = ".slide[role='" + role + "']";
            if (li.hasClass("left")) {
                li.nextAll("li").hide();
                li.prevUntil(slide).not(".slide").show();
                li.prevAll(slide).last().show();
                li.removeClass("left").addClass("right");
                $(this).html(">>");
                li.prev("li.tab").find("a").tab("show");
            } else {
                li.prevAll("li").hide();
                li.nextUntil(slide).not(".slide").show();
                li.nextAll(slide).first().show();
                li.removeClass("right").addClass("left");
                $(this).html("<<");
                li.next("li.tab").find("a").tab("show");
            }
            timestamp = Date.now();
        });

        root.mouseover(function () {
            $(ele).data("mousein", true);
        });
        root.mouseleave(function () {
            $(ele).data("mousein", false);
        });


        ele.on("keydown", function (e) {
            $(this).data("keydown", true);
            toggle(this, config.list, config.panel, true);
            var code = e.which,
                selected = root.find(".list li.selected"),
                ridx = parseInt(selected.attr("data-ridx"), 10);

            //tab
            if (code == 9) {
                $(this).data("mousein", false);
                //root.hide();
                hide(root);
                return;
            }

            //enter
            if (code == 13) {
                e.preventDefault();
                if (isNaN(ridx)) return;
                var row = readRow(config, ridx);
                if (typeof config.handler.onSelect == "function") {
                    config.handler.onSelect.call(config, row);
                }
                //root.hide();

                hide(root);
                toggleInput(ele)
                return;
            }
            //Down
            if (code == 40) {
                selected.removeClass("selected");
                var current = ridx + 1;
                current = current > config.paginator.pageSize ? 1 : current;
                root.find(".list li[data-ridx='" + current + "']").addClass("selected");
                return;
            }
            //Up
            if (code == 38) {
                selected.removeClass("selected");
                var current = ridx - 1;
                current = current == 0 ? config.paginator.pageSize : current;
                root.find(".list li[data-ridx='" + current + "']").addClass("selected");
                return;
            }
        });

        ele.on("focus", function () {
            ele.data("interval", setInterval(function () {
                var prev = ele.data("prev-val") || "",
                    value = (ele.val() + "").replace(/\s+/g, "");
                if (prev != value) {
                    ele.data("prev-val", value);
                    config.request.keyword = value;
                    var results = search(config, !value.startWith(prev))
                    var info = root.find("p");
                    info.html(!value ? "输入中文/拼音/三字码或↑↓选择." :
                        (results.length == 0 ? "未找到包含(" + value + ")的结果" : value + ", 按拼音排序"));
                }
            }, 100));
        });

        ele.on("blur", function (e) {
            clearInterval(ele.data("interval"));
            if ($(this).data("mousein")) return;
            if ($(this).data("keydown")) {
                blur(config, $(this).val());
            }
            $(this).data("keydown", false);
        });
    }

    // 选择后自动切换输入框
    function toggleInput(ele) {
        ele.blur();
        if (ele[0].id === "originLocationName") {//如果当前为出发城市则切换到到达城市
            $("#destinationLocationName").focus();
        } else if (ele[0].id === "destinationLocationName") {//否则则切换到出发日期
            $("#goDate").focus().trigger("click");
        } else {//多航段
            ele.parents(".hnaui-input-inline").next().children(".hnaui-input").focus().trigger("click")
        }

        //ele.parents(".hnaui-input-inline").next().children(".hnaui-input").focus();
    }

    function isValidKey(code) {

        //var specials = [8/*backspace*/, 13/*enter*/, 32/*space*/, 46/*delete*/];
        if (code == 8 || code == 13 || code == 32 || code == 46)
            return true;

        var words = [
            {min: 65, max: 90}, /*letters*/
            {min: 48, max: 57}, /*main_numbers*/
            {min: 96, max: 105}, /*secondary_numbers*/
            {min: 186, max: 222}, /*symbols*/
        ];
        return words.any(function (item) {
            return code >= item.min && code <= item.max;
        });
    }

    //初始化
    function rootInit(config) {
        listInit(config);
        panelInit(config);
        //之前初始化的时候是默认把加载动画给隐藏了；
        //config.root.append(config.mask.hide());
        //初始化的时候是默认显示加载动画
        config.root.append(config.mask);

        config.root.append(config.error);
    }

    //列表初始化
    function listInit(config) {
        config.list.append("<p>输入中文/拼音/三字码或↑↓选择.</p>");
        config.list.append("<ul class='list'>" + loadData(config) + "</ul>");
        pagerInit(pagerOptionInit(config));
        config.root.append(config.list);
    }

    //面板初始化
    function panelInit(config) {
        config.root.append(config.panel.append(renderTabs(config)).append(renderPanes(config)));
    }

    //向表体填充数据
    function loadData(config) {
        if (!config.request.loaded) return "";
        var html = "",
            list = config.data,
            ridx = config.paginator.pageSize * (config.paginator.pageIndex - 1) + 1;
        /*行号起始值*/

        //截取当前页要显示的数据
        if (config.paginator.records > config.paginator.pageSize) {
            //数据超过一页时分页显示
            //数组下标从0计算，因此要比行号小1
            var start = ridx - 1;
            //slice方法返回的元素不包括end索引处的元素，因此再+1
            var end = config.paginator.pageSize * config.paginator.pageIndex;
            list = list.slice(start, Math.min(end, config.paginator.records));
        } else {
            ridx = 1;
        }
        if (list instanceof Array && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                var row = list[i], li = "<li " + (i == 0 ? "class='selected'" : "") + " data-ridx='" + ridx +
                    "'><a class='hyperlink' href='javascript:;' onclick='return false' ><span>" + row.code +
                    "</span>" + row.city + "(" + row.pinyin + ")</a></li>";
                html += li;
                //行号自增
                ridx++;
            }
        }
        return html;
    }

    //分页初始化
    function pagerInit(config) {
        if (!config) return;
        pagerHtmlInit(config);
        pageEventInit(config);
    }

    //分页操作初始化(根据数据列表计算分页数据)
    function pagerOptionInit(config, data) {

        if (!config.paginator.paging) return false;
        data = data || config.data || [];
        //数据总记录数
        config.paginator.records = data.length;
        //计算总页数
        var module = config.paginator.records % config.paginator.pageSize;
        config.paginator.pageCount = module == 0
            ? config.paginator.records / config.paginator.pageSize
            : Math.floor(config.paginator.records / config.paginator.pageSize) + 1;
        config.paginator.pageIndex = Math.max(Math.min(config.paginator.pageIndex, config.paginator.pageCount), 1);
        return config;
    }

    //列表数据刷新后分页控件重置
    function pagerReset(config) {
        config.list.find(".hna-flight-city-pager").remove();
        pagerInit(config);
    }

    //分页元素初始化
    function pagerHtmlInit(config) {
        var footer = $("<nav class='hna-flight-city-pager'></nav>");
        //翻页链接列表
        var pager = $("<ul class='pagination'>");
        if (config.paginator.pageCount > 0) {
            //上一页
            var prev = $("<li><a href='javascript:;' onclick='return false' data-pg_idx='prev'>&lt;</a></li>");
            if (config.paginator.pageIndex == 1) {
                prev.addClass("disabled");
                prev.find("a").attr("disabled", "disabled");
            }
            pager.append(prev);
            //显示最多5个页面链接
            var linkIndex = (config.paginator.pageIndex % 5 == 0 ? config.paginator.pageIndex / 5 - 1 : Math.floor(config.paginator.pageIndex / 5)) * 5;
            for (var i = linkIndex; i < Math.min(config.paginator.pageCount, linkIndex + 5); i++) {
                var li = $("<li><a href='javascript:;' onclick='return false' data-pg_idx='" + (i + 1) + "'>" + (i + 1) + "</a></li>");
                if ((i + 1) == config.paginator.pageIndex) {
                    li.addClass("active");
                }
                pager.append(li);
            }
            //下一页
            var next = $("<li><a href='javascript:;' data-pg_idx='next'>&gt;</a></li>");
            pager.append(next);
        }
        config.list.append(footer.append(pager));
    }

    //分页控件事件初始化
    function pageEventInit(config) {
        var root = config.root;
        //翻页链接点击事件
        root.find(".hna-flight-city-pager [data-pg_idx]").click(function () {
            var target = $(this).attr("data-pg_idx");
            var index = 1;
            switch (target) {
                case "first":   /*首页*/
                    if (!$(this).prop("disabled")) {
                        index = 1;
                    }
                    break;
                case "prev":    /*上一页*/
                    if (!$(this).prop("disabled")) {
                        index = config.paginator.pageIndex - 1;
                    }
                    break;
                case "next":    /*下一页*/
                    if (!$(this).prop("disabled")) {
                        index = config.paginator.pageIndex + 1;
                    }
                    break;
                case "last":    /*尾页*/
                    if (!$(this).prop("disabled")) {
                        index = config.paginator.pageCount;
                    }
                    break;
                default:        /*指定页*/
                    index = parseInt(target, 10);
                    break;
            }
            if (index == config.paginator.pageIndex) return;
            pageChange(config, index);
        });

    }

    //翻页事件
    function pageChange(config, index) {
        //防止跳转的页码超出界限
        config.paginator.pageIndex = Math.min(Math.max(1, index), config.paginator.pageCount);
        reload(config);
        pagerReset(pagerOptionInit(config));
    }

    function blur(config, value) {
        value = (value + "").replace(/\s+/g, "");
        var match = config.data.first(function (item) {
            return item.city == value || item.code == value || item.pinyin == value;
        });
        if (match) {
            if (typeof config.handler.onSelect == "function") {
                config.handler.onSelect.call(config, match);
            }
        } else {
            config.target.val("");
        }
    }

    //本地搜索
    function search(config, isDel) {
        //如果是字符串，则是guid
        if (typeof config == "string") {
            config = CACHE[config];
        }
        //按下删除键时,字符减少,从所有数据中筛选
        var kw = (config.request.keyword + "").replace(/\s+/g, ""),
            data = (isDel ? config.snapshot.data : config.data);

        data = kw ? match(data, kw) : config.snapshot.data;

        data = data.sort(function (x, y) {
            return x.pinyin - y.pinyin;
        });
        config.data = data;
        reload(config);
        return data;
    }

    //递归匹配关键字过滤数据
    function match(data, kw) {
        var result = [];
        //kw已为空，直接返回空数组
        if (kw.length == 0) return result;

        result = data.where(function (item) {
            var flag = false;
            if (item.english) flag = item.english.contains(kw, true);
            if (item.code) flag = flag || item.code.contains(kw, true);
            if (item.pinyin) {
                //把拼音里面的第一个字母转换成大写
                item.pinyin = item.pinyin.substring(0, 1).toUpperCase() + item.pinyin.substring(1);
                var matches = item.pinyin.match(/[A-Z]/g).join("");
                flag = flag || matches.startWith(kw, true) || item.pinyin.contains(kw, true);
            }
            if (item.city) flag = flag || item.city.contains(kw, true);
            return flag;
        })
        if (result.length > 0) return result;

        //未查找到，则将kw最后一位去掉再匹配
        kw = kw.substring(0, kw.length - 1);
        return match(data, kw);
    }

    //表格数据重新加载
    function reload(config, includePanel) {
        pagerReset(pagerOptionInit(config, config.data));
        config.list.find("ul.list").empty().append(loadData(config));
        if (includePanel) renderPanel(config);
        if (config.root.is(":visible")) {
            place(config.target, config.root, config.container);
        }
    }

    function renderPanel(config) {
        config.panel.empty().append(renderTabs(config)).append(renderPanes(config));
        var role = hna.isPC() ? "normal" : "mobile";
        config.panel.find("li.slide[role='" + role + "']").nextAll("li").hide();
        var first = config.panel.find("li:first-child").addClass("active");
        config.panel.find(first.find("a").attr("href")).addClass("active");
    }

    function renderTabs(config) {
        var tabs = '<ul class="nav nav-tabs hnaui-clear" role="tablist">' +
            config.hnaer.select(function (item) {
                var cls = item.flag ? "slide right" : "tab";
                var role = item.flag == 1 ? "normal" : (item.flag == 2 ? "mobile" : "");

                return '<li class="{0}" role="{4}"><a href="#city-{1}-{2}">{3}</a></li>'
                    .format(cls, config.guid, item.id, item.title, role);
            }).join("") + '</ul>';
        return tabs;
    }

    function renderPanes(config) {
        var content = $("<div class='tab-content'>"), panes = {}, nodes = {"hot": [], "other": []};
        if (config.snapshot.data.length == 0) return content;
        //generate details
        for (var i = 0; i < config.snapshot.data.length; i++) {
            var row = config.data[i],
                a = "<a data-ridx='{0}' href='javascript:;'>{1}</a>".format(i + 1, row.city);

            if (row.num) {
                nodes["hot"][row.num - 1] = a;
            }
            if (row.other) nodes["other"].push(a);
            if (row.tab) {
                nodes[row.letter] = nodes[row.letter] || [];
                nodes[row.letter].push(a);
            }
        }

        config.hnaer.forEach(function (cate) {
            if (cate.flag) return;
            panes[cate.id] = $("<div id='city-{0}-{1}' class='tab-pane'></div>".format(config.guid, cate.id));
            if (cate.rows) {
                nodes[cate.id] = {};
                cate.rows.forEach(function (row) {
                    nodes[cate.id][row] = nodes[row];
                });
            }
        });
        for (var key in panes) {
            var children = nodes[key], list = [];
            if (children instanceof Array) {
                panes[key].append("<dl><dd>" + children.join("") + "</dd></dl>");
            } else {
                //letters tab
                for (var letter in children) {
                    var arr = children[letter];
                    if (!arr || arr.length == 0) continue;
                    var dl = "<dl><dt>" + letter + "</dt><dd>" + children[letter].join("") + "</dd></dl>";
                    panes[key].append(dl);
                }
            }
            content.append(panes[key]);
        }
        return content;
    }

    //根据行号计算索引
    function ridx2idx(config, ridx, all) {
        var idx = ridx - 1, max = all ? config.snapshot.data.length : config.data.length;
        return Math.min(Math.max(idx, 0), max);
    }

    //读取指定行的数据
    function readRow(config, ridx, all) {
        var idx = ridx2idx(config, ridx, all);
        return all ? config.snapshot.data[idx] : config.data[idx];
    }

}(jQuery);