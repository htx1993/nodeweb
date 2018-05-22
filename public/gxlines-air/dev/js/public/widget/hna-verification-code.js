hna._i18nMap.addLanguages({
    "VC01": {"zh_CN": "", "en_US": ""}
});
(function ($) {
    $.fn.VerificationCode = function (config) {
        var GirdId = Math.random().toFixed(6) * 1000000;
        var TIME = 180;
        var defaultConfig = {
            "id": "hnaui-verifybtn",
            "countdown": TIME,
            "tips": "",
            "lock": false,
            "url": "",
            "step": 0,
            "tipsArr": ['发送动态口令', '<i class="hnaui-icon hnaui-anim hnaui-anim-rotate hnaui-anim-loop">&#xe63e;</i>&emsp;发送中', "秒后重新发送"],
            "countdownTimeFun": null,
            //发送动态口令需要验证的元素
            "verifyElem": [],
            "verifyFun": null,
            "getData": null,
            "mmvCode": "",
            "failCallback": null
        };
        var that = this;

        $.extend(defaultConfig, config);
        renderTips(0);
        this.off().on("mouseup", function (e) {
            e.stopPropagation();
            if (defaultConfig.lock) {
                return false;
            }

            var bl = true;
            for (var a = 0, a1 = defaultConfig.verifyElem.length; a < a1; a++) {
                var item = defaultConfig.verifyElem[a];
                var itemElem = item.elem;

                //注册页面和安全设置页面的手机号码
                if (itemElem.hasClass("mobile") && itemElem.attr("verifying") == "Y") {
                    hnaer.msg("等待完成手机号码唯一性的验证！", {time: 1500});
                    bl = false;
                    break;
                }
                //安全设置页面的邮箱
                if (itemElem.hasClass("email") && itemElem.attr("verifying") == "Y") {
                    hnaer.msg("等待完成邮箱唯一性的验证！", {time: 1500});
                    bl = false;
                    break;
                }

                if (itemElem.attr("isavailable") != "Y") {
                    hnaer.msg(item.tips, {time: 1500});
                    bl = false;
                    break;
                }
            }
            if (!bl) {
                return false;
            }


            if (hna.isFunction(defaultConfig.verifyFun)) {
                if (!defaultConfig.verifyFun()) {
                    return false;
                }
            }

            if (hna.isFunction(defaultConfig.getData)) {
                defaultConfig.data = defaultConfig.getData();
            }
            countDownFun();
        });

        function countDownFun() {
            renderTips(1);
            hna.ajax({
                url: defaultConfig.url,
                data: defaultConfig.data,
                doneCallback: function (data) {
                    if (data && data.code == "200") {
                        if (data.data.status == "success") {
                            setIntervalFun();
                        } else {
                            if (hna.isFunction(defaultConfig.failCallback)) {
                                defaultConfig.failCallback();
                            }
                            hnaer.msg(data.data.message);
                            renderTips(0);
                        }
                    } else {
                        if (hna.isFunction(defaultConfig.failCallback)) {
                            defaultConfig.failCallback();
                        }
                        hnaer.msg(data.message);
                        renderTips(0);

                    }
                },
                failCallback: function (data) {
                    if (hna.isFunction(defaultConfig.failCallback)) {
                        defaultConfig.failCallback();
                    }
                    hnaer.msg(_i18n("B11"));
                    renderTips(0);
                }
            });
        }

        function setIntervalFun() {
            defaultConfig.countdownTimeFun = setInterval(function () {
                if (defaultConfig.countdown > 0) {
                    defaultConfig.countdown--;
                    renderTips(2);
                } else {
                    clearInterval(defaultConfig.countdownTimeFun);
                    renderTips(0);
                }
            }, 1000);
        }

        function renderTips(n) {
            defaultConfig.step = n;
            if (n === 0) {
                defaultConfig.countdown = TIME;
                defaultConfig.lock = false;
                clearInterval(defaultConfig.countdownTimeFun);
            } else {
                defaultConfig.lock = true;
            }
            defaultConfig.tips = (n == 2 ? '<i class="count-down">' + defaultConfig.countdown + '</i>' : '') + defaultConfig.tipsArr[defaultConfig.step];
            that.html(defaultConfig.tips);
        }
    };
})(jQuery);
