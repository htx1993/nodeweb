/**

 @Name：hnaui.util 工具集
 @Author：贤心
 @License：MIT

 */

hnaui.define('jquery', function (exports) {
    "use strict";

    var $ = hnaui.jquery

        , util = {
        //固定块
        fixbar: function (options) {
            options = options || {};
            options.bgcolor = options.bgcolor ? ('background-color:' + options.bgcolor) : '';

            var TOP_BAR = 'hnaui-fixbar-top', timer, is, icon = [
                options.bar1 === true ? '&#xe606;' : options.bar1 //bar1 - 信息图标
                , options.bar2 === true ? '&#xe607;' : options.bar2 //bar2 - 问号图标
                , '&#xe604;' //置顶
            ]

                , dom = $(['<ul class="hnaui-fixbar">'
                , options.bar1 ? '<li class="hnaui-icon" hna-type="bar1" style="' + options.bgcolor + '">' + icon[0] + '</li>' : ''
                , options.bar2 ? '<li class="hnaui-icon" hna-type="bar2" style="' + options.bgcolor + '">' + icon[1] + '</li>' : ''
                , '<li class="hnaui-icon ' + TOP_BAR + '" hna-type="top" style="' + options.bgcolor + '">' + icon[2] + '</li>'
                , '</ul>'].join(''))

                , topbar = dom.find('.' + TOP_BAR)

                , scroll = function () {
                var stop = $(document).scrollTop();
                if (stop >= (options.showHeight || 200)) {
                    is || (topbar.show(), is = 1);
                } else {
                    is && (topbar.hide(), is = 0);
                }
            };

            if ($('.hnaui-fixbar')[0]) return;
            typeof options.css === 'object' && (dom.css(options.css));
            $('body').append(dom), scroll();

            //bar点击事件
            dom.find('li').on('click', function () {
                var othis = $(this), type = othis.attr('hna-type');
                if (type === 'top') {
                    $('html,body').animate({
                        scrollTop: 0
                    }, 200);
                    ;
                }
                options.click && options.click.call(this, type);
            });

            //Top显示控制
            $(document).on('scroll', function () {
                if (timer) clearTimeout(timer);
                timer = setTimeout(function () {
                    scroll();
                }, 100);
            });
        }
    };

    exports('util', util);
});