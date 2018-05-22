hna._i18nMap.addLanguages({
    "S01": {"zh_CN": "您的位置", "en_US": "Shopping Cart"},
    "S02": {"zh_CN": "首页", "en_US": "Shopping Cart"}
});

window.HNARules = HNARule = (function () {
    var text = '';
    var _current = '';
    //32
    var conT = $(".content .container ").offset().top -276;
    function init(options) {
        var data = options.data || {};
        var config = options.config || {};
        text = options.text || '';
        _current = linkClear(location.hash) || options.defaultLink || [];
        hna.hyperLinkClicked = false;
        if (!options.config.hasOwnProperty(_current.substring(1))) {
            goToPage("/404");
            return;
        }
        var list = search(data, _current).reverse();

        createCommon({
            "data": options.data,
            "href": _current,
            "config": options.config,
            "text": options.text,
            "list": list
        });


        $(document).on("click", function (e) {
            e.stopPropagation();
            try {
                var $this = $(e.target);

                if ($this.hasClass("hnaui-item-a")) {
                    var $href = $this.attr("href");
                    var $target = $this.attr("target");
                    if(!$target){
                        if ($href.charAt(0) != '#') {
                            location.href = $href;
                        } else if ($href != "#notice") {

                            //hashChange(data, config, $this.attr("href"), $this.data("location"));
                            navToggle($this);
                            addNavActive($this);
                            goToTop(conT);
                            $(".left-navcontent").removeClass("hna-fixed").css("top", "0");

                        }
                    }

                } else if ($this.hasClass("hnaui-breadcrumb-a")) {
                    //hashChange(data, config, $this.attr("href"), $this.data("location"));
                } else if ($this.hasClass("child-page-a")) {
                    hashChange(data, config, $this.attr("href"), $this.data("location"));
                }else if ($this.hasClass("hnaui-back-btn")){
                    location.href = '#domestticTransport';
                }
            } catch (ev) {
                JsErrorTips(ev);
            }
        });
        initElement();
        /*条规购物车滚动*/
        ruleCartScroll();

        $(window).on("hashchange", function () {
            try {
                if (hna.hyperLinkClicked) {
                    hna.hyperLinkClicked = false;
                    return;
                }
                if (location.hash != "#notice") {
                    if (location.hash != '') {
                        hashChange(data, config, location.hash);
                    }
                }
                addActive();
            } catch (e) {
                JsErrorTips(e);
            }

        });

        addActive();
    }

    function ruleCartScroll() {
        var $shoppingCart = $('.left-navcontent');
        if ($shoppingCart.length > 0) {
            var cartScrollTop = $shoppingCart.offset().top;
            var cartScrollWidth = $shoppingCart.outerWidth();
            var footerH = $("#footer-block").outerHeight();
            $(window).scroll(hna.throttle_duration(function () {
                var scrollTop = $(this).scrollTop();
                var cartH = $('.left-navcontent').outerHeight();
                var contentH = $(".home-block").height();
                var cssObj = {
                    "position": "static",
                    "width": cartScrollWidth,
                    "top": cartScrollTop,
                    "bottom": "auto",
                    "zIndex": 0
                };
                if (scrollTop <= cartScrollTop) {
                    cssObj.position = "static";
                    cssObj.width = cartScrollWidth;
                    cssObj.top = cartScrollTop;
                    cssObj.bottom = "auto";
                    cssObj.zIndex = 0;

                    $(".search-box").css("z-index", "");
                    $(".search-info").css("z-index", "");
                } else {
                    cssObj.position = "fixed";
                    cssObj.width = cartScrollWidth;
                    cssObj.zIndex = 1000;
                    if ((scrollTop + cartH + footerH) > contentH) {
                        var containerH = $('.hnaui-rule-right').parents('.container').outerHeight();
                        cssObj.position = "absolute";
                        cssObj.top = containerH - cartH;
                    } else {
                        cssObj.top = 0;
                        cssObj.bottom = "auto";
                    }
                }
                $(".left-navcontent").css(cssObj);
            }, 10, 100));
        }
    }
    function navToggle($this) {
        try {
            if ($this.parent().hasClass("hnaui-colla-title")) {
                if ($this.parent().siblings(".hnaui-colla-content").children("li").length == 0) {
                    toggleActive($this);
                }
            } else {
                toggleActive($this);
            }
        } catch (e) {
            JsErrorTips(e);
        }
    }

    function toggleActive($this) {
        $this.parents(".left-navcontent").toggleClass("active");
        $this.parents(".child-page").toggleClass("this");
        $(".nav-toggle").toggleClass("down");
    }
    function addActive() {
        try {
            $('.hnaui-item-a').each(function (index, item) {
                if (item.href.split("#")[1] == location.hash.split("#")[1]) {
                    $(this).parents(".hnaui-colla-item").find('.hnaui-colla-content').addClass("hnaui-show");
                    $(this).parents(".hnaui-colla-item").find('.hnaui-colla-icon').html('&#xe61a;');
                    $(this).parents(".hnaui-colla-item").siblings().find('.hnaui-colla-content').removeClass("hnaui-show");
                    $(this).parents(".hnaui-colla-item").siblings().find('.hnaui-colla-icon').html('&#xe602;');
                    addNavActive(this);
                }
            });
        } catch (e) {
            JsErrorTips(e);
        }
    }
    function addNavActive(that) {
        try {
            //一级菜单样式
            $(that).parents(".hnaui-collapse").find(".nav-active").removeClass("nav-active");
            //二级菜单样式
            $(that).parents(".hnaui-colla-content").find(".nav-active2").removeClass("nav-active2");
            $(that).parent('li').addClass("nav-active2");
            $(that).parents(".hnaui-colla-item").find(".hnaui-colla-title").addClass("nav-active");
        } catch (e) {
            JsErrorTips(e);
        }
    }

    // 创建骨架
    function createCommon(o) {
        "use strict";
        $(".slider-load").removeClass("slider-load");
        var html = '';
        try {
            html += '<div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 main-column hnaui-rule-left">';
            html += '<div class="hnaui-breadcrumb hnaui-elip" hna-separator="▸" style="visibility: visible">';
            html += createBreadcrumb(o.list);
            html += '</div>';
            html += '<div class="hna-info"></div>';
            html += '</div>';
            html += '<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 hnaui-rule-right"><div class="left-navcontent">';
            html += createNavcontent(o);
            html += '</div></div>';
            $(".child-page").html(html).show();
            getContent(o.config, o.href);
        } catch (e) {
            JsErrorTips(e);
        }
    }

    function createNavcontent(o) {
        try {
            var html = '';
            html += createTitle(o.text);
            html += createNav(o.data);
            return html;
        } catch (e) {
            JsErrorTips(e);
        }

    }
    function createTitle(text) {
        try {
            return '<div class="hnaui-title">' + text + '<a href="javascript:;" onclick="return false" class="nav-toggle click-btn"><i class="hnaui-icon nav-i up">&#xe920;</i><i class="hnaui-icon nav-i down">&#x2716;</i></a></div>';
        } catch (e) {
            JsErrorTips(e);
        }
    }

    function hashChange(data, config, href, callback) {
        try {
            goToTop(conT);
            if (arguments.length <= 3) {
                callback = href;
                href = location.hash;
            }
            toggle(data, config, linkClear(href), callback);
        } catch (e) {
            JsErrorTips(e);
        }
    }

    function linkClear(link, num) {
        try {
            var index = num || 0;
            return link.split("?")[index];
        } catch (e) {
            JsErrorTips(e);
        }
    }

    //创建一级目录
    function createNav(data) {
        try {
            var html = '<ul class="hnaui-collapse" hna-accordion="">';
            (data || []).forEach(function (item, index) {
                var target = item.target ? 'target="' + item.target + '"' : '';
                html += '<li class="hnaui-colla-item" >';
                html += '   <h2 class="hnaui-colla-title">';
                html += '       <a class="hnaui-item-a" href="' + (item.href || "javascript:;") + '" ' + target + '>' + (item.text) + '</a>';
                html += '   </h2>';
                html +=     (createUl(item.children || '', index));
                html += '</li>';
            });
            return html + '</ul>';
        } catch (e) {
            JsErrorTips(e);
        }
    }

    //创建二级目录
    function createUl(arr, index) {
        try {
            if (!arr) {
                arr = [];
            }
            var html = '';
            html += '<ul class="hnaui-colla-content ' + (index == 0 ? 'hnaui-show' : '') + '">';
            (arr || []).forEach(function (obj, index) {
                if (obj.children && !obj.single) {
                    html += '<li><a  class="hnaui-item-a" href="' + obj.href + '">' + obj.text + '</a></li>';
                }
            });
            html += '</ul>';
            return html;
        } catch (e) {
            JsErrorTips(e);
        }
    }

    //创建面包屑
    function createBreadcrumb(list) {
        if(!list){
            list = [];
        }
        try {

            var html = '<a href="/">' + _i18n("S02") + '</a>';

            // href="' + _current + '"
                html += '<a >' + text + '</a>';

            if((list[1])){
                html += '<a class="hnaui-breadcrumb-a hnaui-elip" href="' + ((list[0] || {}).href) + '" >' + (list[0] || {}).text + ' </a>';
                html += '<a class="hnaui-breadcrumb-a hnaui-elip" href="' + ((list[1] || {}).href) + '" ><cite>' + (list[1] || {}).text + '</cite> </a>';
            }else {
                html += '<a class="hnaui-breadcrumb-a hnaui-elip" href="' + ((list[0] || {}).href) + '" ><cite>' + (list[0] || {}).text + ' </cite></a>';
            }

            return html;
        } catch (e) {
            JsErrorTips(e);
        }
    }

    //切换导航
    function toggle(data, config, href, callback) {
        try {
            if (!href || (href.indexOf("#") != 0)) {
                if ($(".main-column-inner").length > 0) {
                    var container = $(".main-column-inner");
                    hna.mask(container);
                    return false;
                }

            }
            getContent(config, href, callback);

            var list = search(data, href).reverse();
            $(".hnaui-breadcrumb").html(createBreadcrumb(list));

            initElement();
        } catch (e) {
            JsErrorTips(e);
        }
    }

    function search(list, href) {
        try {
            var data = {children: list}, result = [];
            recurSearch(data, href, result);
            return result;
        } catch (e) {
            JsErrorTips(e);
        }
    }

    function recurSearch(item, href, result) {
        try {
            if (!item) {
                item = {};
            }
            var match = item.href == href, child;
            item.children = item.children || [];
            for (var i = 0; i < item.children.length; i++) {
                child = recurSearch(item.children[i], href, result);
                if (!child) {
                    continue;
                }
                result.push(child);
                match = match || child;
            }
            return match ? item : false;
        } catch (e) {
            JsErrorTips(e);
        }
    }
    //根据hash获取对应的html文件
    function getContent(config, hash) {
        try {
            $('.hna-info').addClass('slider-load');
            if (!hash || hash.indexOf("#") != 0) {
                return false;
            }
            if (hash.indexOf("#") == 0) {
                hash = config[hash.substring(1)];
            }
            hna.ajax({
                type: "GET",
                url: hash,
                resourcesType: "static",
                dataType: "html",
                doneCallback: function (data) {
                   if(data){
                       $('.hna-info').removeClass("slider-load");
                       if (data.indexOf("<!DOCTYPE html>") > -1) {
                           goToPage("/404");
                       } else {
                           $('.hna-info').html(data.format(_tel, hna._img_host, hna._server_host)).show();
                           if ($('.child-page').outerHeight() <= $('.left-navcontent').outerHeight()) {
                               $('.child-page').css("height", $('.left-navcontent').outerHeight() + 100);
                           }
                           var iframe = document.getElementById("iframeProve");

                          if(iframe){
                              if (!/*@cc_on!@*/0) { //if not IE
                                  iframe.onload = function(){
                                      $(document).find('#iframeProve').siblings('.slider-load').removeClass('slider-load');
                                  };
                              } else {
                                  iframe.onreadystatechange = function(){
                                      if (iframe.readyState == "complete"){
                                          $(document).find('#iframeProve').siblings('.slider-load').removeClass('slider-load');
                                      }
                                  };
                              }
                          }

                       }
                   }
                }
            });
        } catch (e) {
            JsErrorTips(e);
        }

    }
    function goToTop(str) {
        if (str) {
            $(document).scrollTop(parseInt(str, 10) );
        } else {
            hna.goToTop(1);
        }
    }
    return {
        init: init,
        createNavcontent: createNavcontent,
        goToTop: goToTop
    };
})();