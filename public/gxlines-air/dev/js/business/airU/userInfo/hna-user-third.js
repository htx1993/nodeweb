hna._i18nMap.addLanguages({
    //"UT01": {"zh_CN": "验证通过", "en_US": "Flight number"}
});
//当前用户信息
var _userInfo = {};
//当前用户id.
var _userId = "";

var ajaxUrl = window.ajaxUrl || {};
ajaxUrl.loginSendMobile = "/airU/login/loginSendMobile";
ajaxUrl.bindMobile = "/airU/userInfo/bindMobile";

var _fromList = window._fromList || [];
_fromList.push({
    //提交用户信息
    "type": "userInfoFormThird",
    "fromCla": "user-info-form-third",
    "callback": updateUserInfoThird
});

//创建个人资料面板
function createUserInfoPanelThird() {
    try {
        var o = {};
        for (var key in _userInfo) {
            if (_userInfo.hasOwnProperty(key)) {
                o[key] = {"eleType": key, "value": _userInfo[key]};
            }
        }

        var htmlEl = createEditPanelEl({
            "type": "user",
            "title": _i18n("Tit01"),
            "icon": "&#xe612;",
            "classStr": "update-user-panel",
            "createHtmlFun": function () {
                var html = '       <form class="row ' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + ' user-info-form-third">';
                html += createHiddenInputUm(o.id);
                html += createInputElUm(o.mobile);
                html += createMMVeLUm("hna_moveReg");
                html += createInputElUm({"eleType": "valiCode", "rightBtn": true});

                html += createSubmitBtnElUm("userInfoFormThird");
                html += '           </form>';
                return html;
            }
        });

        $(".search-result").html(htmlEl).show();

        resetMmvElThird();
        resetVerifyElThird();

        renderFrom();
        initMobilePreData();
    } catch (e) {
        JsErrorTips(e);
    }
}

function updateUserInfoThird(data) {
    var thisUser = new UserInfo(data);
    var thisData = {
        "id":thisUser.id,
        "mobile":thisUser.mobile,
        "valiCode":thisUser.valiCode
    };
    updateRecord(ajaxUrl.bindMobile, thisData, function () {
        goToPage("/airU/userInfo");
    });
}

//重置发送短息
function resetVerifyElThird() {
    var html = createInputElUm({"eleType": "valiCode", "rightBtn": true});
    $(".hnaui-verifybtn").parents(".p-input").replaceWith(html);
    var $mobile = $(".user-info-form-third").find("input[name='mobile']");
    var $mmvCode = $(".user-info-form-third").find("input[name='mmvCode']");
    $(".user-info-form-third ." + _classList[10]).VerificationCode({
        "url": ajaxUrl.sendMessage,
        "getData": function () {
            return {
                "mobile": getMobileV($mobile),
                "mmvCode": $mmvCode.val() || ""
            };
        },
        "verifyElem": [
            {
                "elem": $mobile,
                "tips": _i18n("B15")
            },
            {
                "elem": $mmvCode,
                "tips": _i18n("B14")
            }
        ],
        "failCallback": function () {
            resetMmvElThird();
        }
    });
}

//重置人机验证
function resetMmvElThird() {
    var html = createMMVeLUm("hna_moveReg");
    $(".p-mmv").parent().replaceWith(html);
    HNAmoveReg.eventInit({
        "id": "hna_moveReg",
        "successMsg": _i18n("B13"),
        "callback": function (data) {
            $(".user-info-form-third").find("input[name='mmvCode']").val(data || "").attr("isavailable", "Y");
        }
    });
}