hna._i18nMap.addLanguages({
    "AJ01": {
        "zh_CN": "您可能因为长时间未操作的原因，会话已经超时，请返回首页重新查询航班！",
        "en_US": "You may have been out of service for a long time, the session has timed out, please return to the home page to check the flight!"
    },
    "AJ02": {"zh_CN": "系统出现未知异常，请联系管理员。", "en_US": "The system is unknown, please contact the administrator."}
});
(function ($) {
    hna = window.hna || {};
    //var _uniqueID = "";
    /**
     * ajax request
     * @param:url(string), 请求地址
     * @param:data(object), 请求参数
     * @param:type(string), 请求类型
     * @param:doneCallback(function), 请求成功后的回调函数
     * @param:failCallback(function), 请求失败后的回调函数
     * @param:alwaysCallback(function), 请求完成之后的回调函数
     */
    hna.ajax = function (obj) {
        if (!obj) {
            obj = {};
        }
        if (!obj.url) {
            return false;
        }

        var isLoading = obj.loading || "hide";

        var option = {};
        if (obj.resourcesType == "static") {
            //这里是加载静态资源里面的html文件
            var langDir = "zh";
            option.url = hna._static_host+ "/html/" + langDir + obj.url;
        } else {
            //这里加载的是后台接口
            option.url = hna._interface_host + obj.url;
        }

        option.type = obj.type || "POST";

        if(!obj.data){
            obj.data = {};
        }
        obj.data.languageCode = hna._lang_type;
        obj.data.pos = "pc";
        if (hna._env == "production") {
            option.data = {"q": hna.compile(JSON.stringify(obj.data || {}))};
        } else {
            option.data = {"q": JSON.stringify(obj.data || {})};
        }

        option.dataType = obj.dataType || "json";
        //option.beforeSend = function (xhr) {
        //    xhr.setRequestHeader("uniqueID", _uniqueID);
        //};
        if (obj.async === false) {
            option.async = false;
        }
        if (obj.contentType) {
            option.contentType = obj.async;
        }
        if (obj.jsonp) {
            option.jsonp = obj.jsonp;
        }
        if (obj.jsonpCallback) {
            option.jsonpCallback = obj.jsonpCallback;
        }
        if (obj.timeout) {
            option.timeout = obj.timeout;
        }
        if (obj.scriptCharset) {
            option.scriptCharset = obj.scriptCharset;
        }


        $.ajax(option).done(function (data, status, xhr) {
            //_uniqueID = xhr.getResponseHeader("uniqueID");
            if (data) {
                if (obj.resourcesType == "static") {
                    if (obj.doneCallback && typeof obj.doneCallback == "function") {
                        obj.doneCallback.call(null, data);
                    }
                } else {
                    if (data.code == 200) {
                        if (obj.doneCallback && typeof obj.doneCallback == "function") {
                            obj.doneCallback.call(null, data);
                        }
                    } else if (data.code == "201") {
                        //node服务session过期的情况，弹窗提示说明
                        sessionExpiredTips(data.message,"/airU/loginOut?service=" + hna.compile("/airU/login"));

                    }  else if (data.code == "900") {
                        //grpc服务session过期的情况，弹窗提示说明
                        sessionExpiredTips(data.message);

                    } else if (data.code == "801") {
                        //非正常行为的请求，弹出人机验证框
                        hnaer.closeAll();
                        HNAValidation.show();

                    } else if (data.data && data.data.status == "redirect") {
                        //为登录的错误重定向
                        window.top.location.href = "../nologin/error";

                    } else {
                        if (data.message) {
                            hnaer.open({
                                title: "错误提示",
                                area: "500px",
                                content: data.message
                            });
                        }
                    }
                }
            }

        }).fail(function (data) {
            if (obj.failCallback && typeof obj.failCallback == "function") {
                obj.failCallback.call(null, data);
            } else {
                hnaer.closeAll();
                hnaer.open({
                    title: "错误提示",
                    icon: 0,
                    //content:JSON.stringify(data),
                    content: _i18n("B11")
                });
            }
        }).always(function (data) {
            if (isLoading == "hide") {
                $(".search-loading").hide();
            }
            hna.loading(false);
            if (obj.alwaysCallback && typeof obj.alwaysCallback == "function") {
                obj.alwaysCallback.call(null, data);
            }
        });
    };

    //弹出文本框验证的错误信息
    function sessionExpiredTips(tips, url) {
        hnaer.closeAll();
        hnaer.open({
            title: _i18n("prompt"),
            content: tips || _i18n("AJ01"),
            area: "500px",
            icon: 0,
            btn: [_i18n("confirm")],
            yes: function () {
                hnaer.closeAll();
            },
            success: function () {

            },
            end: function () {
                goToPage(url || "/");
            }
        });
    }

    //hna.ajax({
    //    type : "POST",
    //    url : url,
    //    data : obj,
    //    doneCallback:function(data){
    //
    //    },
    //    failCallback:function(data){
    //
    //    },
    //    alwaysCallback:function(data){
    //
    //    }
    //});

})(jQuery);
