hna._i18nMap.addLanguages({
    "HL01": {"zh_CN": "正在处理，请等待...", "en_US": "Processing, please wait..."},
    "HL02": {"zh_CN": "直到下一个页面显示前，", "en_US": "Until the next page is displayed,"},
    "HL03": {
        "zh_CN": "请不要点击浏览器的刷新、后退或停止按钮。我们可能最多需要60秒处理您的请求。",
        "en_US": "Please do not click on the browser's refresh, back or stop button. We may take up to 60 seconds to process your request."
    }
});
(function ($) {

    /**
     * 数据处理等待状态时显示效果
     * @param:flag(boolean), 标识位,true为show,false为hide,默认为true
     */
    hna.loading = function (flag) {
        if (flag === undefined) {
            flag = true;
        }
        var root = $(".hna-loading");
        if (!flag) {
            clearInterval(root.hide().data("interval"));
            return;
        }
        var animate = function () {
            var max = $(".hna-loading-progress").width(),
                bar = $(".hna-loading-bar"),
                plane = $(".hna-loading-plane"),
                interval = setInterval(function () {
                    var width = bar.width() + 2;
                    bar.width(width);
                    plane.css("left", width - 8);
                    if (width >= max) {
                        bar.width(0);
                        plane.css("left", -15);
                    }

                }, 32);
            $(".hna-loading").data("interval", interval);
        };
        if (root.length > 0) {
            if (root.is(":visible")) {
                return;
            }
            root.show();
            animate();
            return;
        }
        setTimeout(function () {
            var html = "<div class='hna-loading'><div class='hna-loading-mask'></div>" +
                "<div class='hna-loading-content'><p style='margin-top: 30px;'>" + _i18n("HL01") + "</p>" +
                "<div class='hna-loading-progress'><span class='hna-loading-plane'></span>" +
                "<div class='hna-loading-bar'></div></div><p>" + _i18n("HL02") +
                "" + _i18n("HL03") + "</p></div></div>";
            $("body").append(html);
            animate();
        }, 0);

        $(window).on("unload", clearInterval(root.hide().data("interval")));
    };
})(jQuery);