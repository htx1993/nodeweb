hna._i18nMap.addLanguages({
    "ST01": {"zh_CN": "数据提交中，请稍后...", "en_US": ""}

});
//弹出文本框验证的错误信息
function _showValidationTips(tips, callback) {
    if (!tips || tips == "null") {
        return false;
    }
    hna.isBlur = true;
    try {
        hnaer.closeAll();
        hnaer.open({
            title: _i18n("prompt"),
            content: tips,
            area: "500px",
            icon: 0,
            btn: [_i18n("confirm")],
            yes: function () {
                hnaer.closeAll();
                if (hna.isFunction(callback)) {
                    callback();
                }
            },
            success: function () {

            },
            end: function () {
                hna.isBlur = false;
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

//ajax加载
function _showValidationLoading(tips, callback) {
    if (!tips) {
        tips = _i18n("ST01");
    }
    hna.isBlur = true;
    hnaer.closeAll();
    hnaer.open({
        title: false,
        content: tips,
        closeBtn: 0,
        btn: false,
        icon: 7,
        skin: "hnaui-hnaer-msg",
        end: function () {
            hna.isBlur = false;
            if (hna.isFunction(callback)) {
                callback();
            }
        }
    });
}

//弹窗询问
function _showConfirmTips(o, callback) {
    if (!o) {
        return false;
    }
    var title = _i18n("prompt");
    var content = "";
    var width = "500px";
    var height = "";
    var area = "";
    if (typeof (o) == "string") {
        content = o;
    } else {
        title = o.title || title;
        content = o.tips || content;
        width = o.width || width;
        height = o.height || height;
    }
    if (height) {
        area = [width, height];
    } else {
        area = width;
    }

    if (!content) {
        return false;
    }
    hnaer.open({
        title: title,
        area: area,
        content: content,
        btn: [_i18n("confirm"), _i18n("cancel")],
        yes: function () {
            hnaer.closeAll();
            if (hna.isFunction(callback)) {
                callback();
            }
        }
    });

}

//操作成功的弹窗，只能点击确定按钮
function _showSuccessTips(tips, callback) {
    hnaer.open({
        title: _i18n("prompt"),
        content: tips || "",
        area: "500px",
        btn: [_i18n("confirm")],
        closeBtn: 0,
        yes: function () {
            if (hna.isFunction(callback)) {
                callback();
            }
        }
    });
}

var _tipsLen = 20;
//简单提示语的弹窗，如果提示语的长度小于等于15，则使用msg，自动消失的；如果超过15个字，则使用手动关闭的弹窗
function _showMsg(tips, callback) {
    if (!tips) {
        return false;
    }

    if (tips.length <= _tipsLen) {
        hnaer.msg(tips, {time: 2000}, callback);
    } else {
        hnaer.open({
            title: _i18n("prompt"),
            content: tips,
            area: "500px",
            btn: [_i18n("confirm")],
            yes: function () {
                hnaer.closeAll();

            },
            end: function () {
                if (hna.isFunction(callback)) {
                    callback();
                }
            }
        });
    }
}

function _showCountDownTips(info, callback) {
    if (!info) {
        return false;
    }

    var countDownTime = parseInt(info.time + "", 10) || 5;
    var tips = (info.tips || "").format('<span class="count-down-time">' + countDownTime + '</span>');
    if (!tips) {
        return false;
    }

    hnaer.closeAll();
    hnaer.open({
        title: false,
        content: tips,
        closeBtn: 0,
        btn: false,
        icon: 1,
        skin: "hnaui-hnaer-msg",
        success: function (hnaerIndex) {
            var intervalFun = setInterval(function () {
                countDownTime--;
                if (countDownTime < 0) {
                    clearInterval(intervalFun);
                    hnaer.closeAll();
                    if (hna.isFunction(callback)) {
                        callback();
                    }
                } else {
                    $(hnaerIndex).find(".count-down-time").html(countDownTime);
                }
            }, 1000);
        }
    });
}


//弹窗服务条款
function _showServiceTermsTips(o){
    if(!o){
        o = {};
    }
    hnaer.open({
        type: 1,
        title: o.title,
        area: ['800px', '470px'],
        content: createLoadingEl(),
        scrollbar: true,
        success: function (hnaero) {
            hna.ajax({
                type: "GET",
                url: o.href,
                resourcesType: "static",
                dataType: "html",
                doneCallback: function (data) {
                    var html = '<div class="hna-info">'+data.format(_tel,hna._img_host)+'</div>';
                    $(hnaero).find(".hnaui-hnaer-content").html(html);
                }
            });
        }
    });
}


//创建加载动画
function createLoadingEl() {
    try {
        var html = '<div class="search-loading">';
        html += '       <div class="search-loading-content">';
        html += '           <i class="' + _classList[8] + ' hnaui-anim hnaui-anim-rotate hnaui-anim-loop loading-icon"></i>数据加载中，请稍后...';
        html += '       </div>';
        html += '   </div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}