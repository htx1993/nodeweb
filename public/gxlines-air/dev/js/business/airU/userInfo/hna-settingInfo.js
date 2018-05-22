hna._i18nMap.addLanguages({
    "SI01": {"zh_CN": "下一步", "en_US": "Flight number"},
    "SI03": {"zh_CN": "操作成功！", "en_US": "Flight number"}
});
var ajaxUrl = window.ajaxUrl || {};
ajaxUrl.sendMessage = "/airU/userInfo/sendMessage";
ajaxUrl.sendEmail = "/airU/userInfo/sendEmail";

ajaxUrl.updatePassword = "/airU/userInfo/updatePassword";

ajaxUrl.checkMobile = "/airU/userInfo/checkMobile";
ajaxUrl.updateMobile = "/airU/userInfo/updateMobile";
ajaxUrl.isExistByMobile = "/airU/userInfo/isExistByMobile";

ajaxUrl.checkAnswer = "/airU/userInfo/checkAnswer";
ajaxUrl.updateQuestion = "/airU/userInfo/updateQuestion";

ajaxUrl.checkEmail = "/airU/userInfo/checkEmail";
ajaxUrl.updateEmail = "/airU/userInfo/updateEmail";
ajaxUrl.bindEmail = "/airU/userInfo/bindEmail";
ajaxUrl.isExistByEmail = "/airU/userInfo/isExistByEmail";


var _fromListUm = window._fromListUm || [];
_fromListUm.push({
    //提交修改密码信息
    "type": "updatePasswordForm",
    "fromCla": "update-password-form",
    "callback": updatePasswordForm
});
_fromListUm.push({
    //验证手机号
    "type": "checkMobileForm",
    "fromCla": "check-mobile-form",
    "callback": checkMobileForm
});
_fromListUm.push({
    //修改手机号
    "type": "updateMobileForm",
    "fromCla": "update-mobile-form",
    "callback": updateMobileForm
});
_fromListUm.push({
    //验证密保
    "type": "checkAnswerForm",
    "fromCla": "update-question-form",
    "callback": checkAnswerForm
});
_fromListUm.push({
    //修改密保
    "type": "updateQuestionForm",
    "fromCla": "update-question-form",
    "callback": updateQuestionForm
});
_fromListUm.push({
    //验证邮箱
    "type": "checkEmailForm",
    "fromCla": "check-email-form",
    "callback": checkEmailForm
});
_fromListUm.push({
    //修改邮箱
    "type": "updateEmailForm",
    "fromCla": "update-email-form",
    "callback": updateEmailForm
});
_fromListUm.push({
    //绑定邮箱
    "type": "bindEmailForm",
    "fromCla": "bind-email-form",
    "callback": bindEmailForm
});

var emailCal = "";
var _mobileIndex = 0;
var _emailIndex = 0;

var mmvCode_mobileCount = 0;
var mmvCode_emailCount = 0;
//创建安全设置面板
function createSettingInfoPanel() {
    mmvCode_mobileCount = 0;
    mmvCode_emailCount = 0;

    _mobileIndex = 0;
    _emailIndex = 0;

    try {
        var emailTitle = "";
        var emailBtn = "";
        if (_userInfo.isEmailBind == "R") {
            emailTitle = _i18n("Tit02");
            emailCal = "check-email-form";
            emailBtn = createSubmitBtnElUm("checkEmailForm", _i18n("Tit10"));
        } else {
            emailTitle = _i18n("Tit03");
            emailCal = "bind-email-form";
            emailBtn = createSubmitBtnElUm("bindEmailForm", _i18n("Tit03"));
        }

        var htmlEl = createEditPanelEl({
            "type": "setting",
            "title": _i18n("Tit04"),
            "icon": "&#xe614;",
            "classStr": "update-setting-panel",
            "createHtmlFun": function () {
                var arr = [];

                if(_userInfo.isRegister == "Y"){
                    _mobileIndex++;
                    _emailIndex++;
                    arr.push({
                        "title": _i18n("Tit05"),
                        "createHtmlFun": function () {
                            var html = '<form class="row ' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + ' update-password-form">';
                            html += createInputElUm({
                                "eleType": "oldPassword",
                                "title": _i18n("Tit06"),
                                "verify": "PpasswordLogin",
                                "showIcon": true
                            });
                            html += createInputElUm({
                                "eleType": "password",
                                "title": _i18n("Tit11"),
                                "showIcon": true
                            });
                            html += createInputElUm({"eleType": "password_re", "showIcon": true});
                            html += createSubmitBtnElUm("updatePasswordForm", _i18n("Tit05"));
                            html += '    </form>';
                            return html;
                        }
                    });
                }

                if(_userInfo.isRegister == "Y" && _userInfo.mobile != _userInfo.name && _userInfo.mobile){
                    _emailIndex++;
                    arr.push({
                        "title": _i18n("Tit07"),
                        "createHtmlFun": function () {
                            var html = '<form class="row ' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + ' check-mobile-form">';
                            html += createInputElUm({
                                "eleType": "mobile",
                                "value": _userInfo.mobile,
                                "readonly": true,
                                "showIcon": true,
                                "mobilePreV": _userInfo.mobilePre
                            });
                            html += createMMVeLUm("hna_moveReg_mobile");
                            html += createInputElUm({"eleType": "valiCode", "rightBtn": true});
                            html += createSubmitBtnElUm("checkMobileForm", _i18n("Tit12"));
                            html += '    </form>';
                            return html;
                        }
                    });
                }else{
                    _mobileIndex = 100;
                }

                if(_userInfo.isRegister == "Y" && _userInfo.question){
                    _emailIndex++;
                    arr.push({
                        "title": _i18n("Tit08"),
                        "createHtmlFun": function () {
                            var html = '<form class="row ' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + ' update-question-form">';
                            html += createInputElUm({
                                "eleType": "question",
                                "value": _userInfo.question,
                                "readonly": true,
                                "title": _i18n("Tit09"),
                                "showIcon": true
                            });
                            html += createInputElUm({"eleType": "answer", "title": _i18n("Tit13")});
                            html += createSubmitBtnElUm("checkAnswerForm", _i18n("SI01"));
                            html += '    </form>';
                            return html;
                        }
                    });
                }

                if(_userInfo.isRegister == "Y" && _userInfo.email != _userInfo.name && _userInfo.email){
                    arr.push({
                        "title": emailTitle,
                        "createHtmlFun": function () {

                            var html = '<form class="row ' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + ' ' + emailCal + '">';
                            html += createInputElUm({
                                "eleType": "email",
                                "value": _userInfo.email,
                                "readonly": true,
                                "title": _i18n("Tit16"),
                                "showIcon": true
                            });
                            html += createMMVeLUm("hna_moveReg_email");
                            html += createInputElUm({"eleType": "valiCode", "rightBtn": true});
                            html += emailBtn;
                            html += '    </form>';
                            return html;
                        }
                    });
                }else{
                    _emailIndex = 100;
                }
                return createTabPanelEl({
                    "type": "setting",
                    "dataArr": arr
                });
            }
        });

        $(".search-result").html(htmlEl).show();
        $(".search-loading").hide();

        renderFrom();
        initElement();
        initTabUm();
        initMobilePreData();

        resetMmvMobileEl()
        resetMmvEmailEl();
        resetVerifyMobileEl();
        resetVerifyEmailEl();
    } catch (e) {
        JsErrorTips(e);
    }
}


//重置人机验证
function resetMmvMobileEl() {
    var html = createMMVeLUm("hna_moveReg_mobile");

    var $pmmv = $(".hnaui-tab-content").children().eq(_mobileIndex).find(".p-mmv");
    if($pmmv.length>0){
        $pmmv.parent().replaceWith(html);
        HNAmoveReg.eventInit({
            "id": "hna_moveReg_mobile",
            "successMsg": _i18n("B13"),
            "callback": function (data) {
                $(".check-mobile-form").find("input[name='mmvCode']").val(data || "").attr("isavailable", "Y");
            }
        });
    }
}
function resetMmvEmailEl() {
    var html = createMMVeLUm("hna_moveReg_email");

    var $pmmv = $(".hnaui-tab-content").children().eq(_emailIndex).find(".p-mmv");
    if($pmmv.length > 0 ){
        $pmmv.parent().replaceWith(html);
        HNAmoveReg.eventInit({
            "id": "hna_moveReg_email",
            "successMsg": _i18n("B13"),
            "callback": function (data) {
                $("." + emailCal).find("input[name='mmvCode']").val(data || "").attr("isavailable", "Y");
            }
        });
    }
}
function resetVerifyMobileEl() {
    var html = createInputElUm({"eleType": "valiCode", "rightBtn": true});

    var $verifybtn = $(".hnaui-tab-content").children().eq(_mobileIndex).find(".hnaui-verifybtn");
    if($verifybtn.length > 0){
        $verifybtn.parents(".p-input").replaceWith(html);
        var $mobile = $(".check-mobile-form").find("input[name='mobile']");
        var $mmvCode_mobile = $(".check-mobile-form").find("input[name='mmvCode']");
        $(".check-mobile-form ." + _classList[10]).VerificationCode({
            "url": ajaxUrl.sendMessage,
            "getData": function () {
                return {
                    "mobile": getMobileV($mobile),
                    "mmvCode": $mmvCode_mobile.val() || ""
                };
            },
            "verifyElem": [
                {
                    "elem": $mobile,
                    "tips": _i18n("B15")
                },
                {
                    "elem": $mmvCode_mobile,
                    "tips": _i18n("B14")
                }
            ],
            "failCallback": function () {
                resetMmvMobileEl();
            }
        });
        renderFrom();
    }

}
function resetVerifyMobileSecond() {
    var thisClass = "update-mobile-form";
    var html = createInputElUm({"eleType": "valiCode", "rightBtn": true});

    var $verifybtn = $(".hnaui-tab-content").children().eq(_mobileIndex).find(".hnaui-verifybtn");
    if($verifybtn.length > 0){
        $verifybtn.parents(".p-input").replaceWith(html);
        var $mobile = $("." + thisClass).find("input[name='mobile']");
        $("." + thisClass + " ." + _classList[10]).VerificationCode({
            "url": ajaxUrl.sendMessage,
            "getData": function () {
                return {
                    "mobile": getMobileV($mobile)
                };
            },
            "verifyElem": [
                {
                    "elem": $mobile,
                    "tips": _i18n("B15")
                }
            ]
        });
        renderFrom();
    }

}
function resetVerifyEmailEl() {
    var html = createInputElUm({"eleType": "valiCode", "rightBtn": true});

    var $verifybtn = $(".hnaui-tab-content").children().eq(_emailIndex).find(".hnaui-verifybtn");
    if($verifybtn.length > 0){
        $verifybtn.parents(".p-input").replaceWith(html);
        var $email = $("." + emailCal).find("input[name='email']");
        var $mmvCode_email = $("." + emailCal).find("input[name='mmvCode']");
        $("." + emailCal + " ." + _classList[10]).VerificationCode({
            "url": ajaxUrl.sendEmail,
            "getData": function () {
                return {
                    "email": $email.val() || "",
                    "mmvCode": $mmvCode_email.val() || ""
                };
            },
            "verifyElem": [
                {
                    "elem": $email,
                    "tips": _i18n("Ema01")
                },
                {
                    "elem": $mmvCode_email,
                    "tips": _i18n("B14")
                }
            ],
            "failCallback": function () {
                resetMmvEmailEl();
            }
        });
        renderFrom();
    }
}


//========================================================================================================
//修改密码,输入旧密码，新密码和新密码的确认
function updatePasswordForm(data) {
    sendAjaxUm(ajaxUrl.updatePassword, data, function (data) {
        _showSuccessTips(data.message || _i18n("SI03"), function () {
            goToPage("/airU/loginOut");
        });
    });
}


//========================================================================================================
//第一步，验证手机号，验证成功，再输入新的手机号码
function checkMobileForm(data) {
    var thisUser = new UserInfo(data);
    var thisData = {
        "mobile":thisUser.mobile,
        "mmvCode":thisUser.mmvCode,
        "valiCode":thisUser.valiCode
    };
    sendAjaxUm(ajaxUrl.checkMobile, thisData, function (data) {
        var thisClass = "update-mobile-form";
        var html = '<form class="row ' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + ' ' + thisClass + '">';
        html += createInputElUm({"eleType": "mobile", "uniqueUrl": ajaxUrl.isExistByMobile,"title":"新手机号码","placeholder":"请输入新的手机号码"});
        html += createInputElUm({"eleType": "valiCode", "rightBtn": true});
        html += createSubmitBtnElUm("updateMobileForm", _i18n("Tit07"));
        html += '    </form>';

        $(".check-mobile-form").replaceWith(html);
        initMobilePreData();
        resetVerifyMobileSecond();
    }, function () {
        resetMmvMobileEl();
        resetVerifyMobileEl();
    });
}
//第二步，修改手机号，手机号修改成功，刷新页面
function updateMobileForm(data) {
    var thisUser = new UserInfo(data);
    var thisData = {
        "mobile":thisUser.mobile,
        "mmvCode":thisUser.mmvCode,
        "valiCode":thisUser.valiCode
    };
    sendAjaxUm(ajaxUrl.updateMobile, thisData, function (data) {
        _showCountDownTips({"tips": (data.message || _i18n("SI03")) + _i18n("Msg04"), "time": 2}, function () {
            location.reload();
        });
    }, function () {
        resetVerifyMobileSecond();
    });
}


//========================================================================================================
//第一步，验证密保，验证成功之后，再输入新的密保问题和答案
function checkAnswerForm(data) {
    sendAjaxUm(ajaxUrl.checkAnswer, data, function (data) {
        var thisClass = "update-question-form";
        var html = '<form class="row ' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + ' ' + thisClass + '">';
        html += createInputElUm({"eleType": "question", "title": _i18n("Tit14")});
        html += createInputElUm({"eleType": "answer", "title": _i18n("Tit15")});
        html += createSubmitBtnElUm("updateQuestionForm", _i18n("Tit08"));
        html += '    </form>';

        $("." + thisClass).replaceWith(html);
        renderFrom();
    });
}
//第二步，修改密保，输入新的密保问题和新答案，修改成功之后，刷新页面
function updateQuestionForm(data) {
    sendAjaxUm(ajaxUrl.updateQuestion, data, function (data) {
        _showCountDownTips({"tips": (data.message || _i18n("SI03")) + _i18n("Msg04"), "time": 2}, function () {
            location.reload();
        });
    });
}

//========================================================================================================
//第一种情况，邮箱已经绑定，可以修改邮箱
//第一步，验证邮箱，验证成功，再输入新的邮箱
function checkEmailForm(data) {
    sendAjaxUm(ajaxUrl.checkEmail, data, function (data) {
        var thisClass = "update-email-form";
        var html = '<form class="row ' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + ' ' + thisClass + '">';
        html += createInputElUm({"eleType": "email", "uniqueUrl": ajaxUrl.isExistByEmail});
        html += createInputElUm({"eleType": "valiCode", "rightBtn": true});
        html += createSubmitBtnElUm("updateEmailForm", _i18n("Tit02"));
        html += '    </form>';

        $(".check-email-form").replaceWith(html);

        var $email = $("." + thisClass).find("input[name='email']");
        $("." + thisClass + " ." + _classList[10]).VerificationCode({
            "url": ajaxUrl.sendEmail,
            "getData": function () {
                return {
                    "email": $email.val() || ""
                };
            },
            "verifyElem": [
                {
                    "elem": $email,
                    "tips": _i18n("Mai01")
                }
            ]
        });
        renderFrom();
    }, function () {
        resetMmvEmailEl();
        resetVerifyEmailEl();
    });
}
//第二步，修改邮箱，邮箱修改成功，刷新页面
function updateEmailForm(data) {
    sendAjaxUm(ajaxUrl.updateEmail, data, function (data) {
        _showCountDownTips({"tips": (data.message || _i18n("SI03")) + _i18n("Msg04"), "time": 2}, function () {
            location.reload();
        });
    });
}

//第二种情况，邮箱没有绑定，只能绑定邮箱
function bindEmailForm(data) {
    sendAjaxUm(ajaxUrl.bindEmail, data, function (data) {
        _showCountDownTips({"tips": (data.message || _i18n("SI03")) + _i18n("Msg04"), "time": 2}, function () {
            location.reload();
        });
    }, function () {
        resetMmvEmailEl();
        resetVerifyEmailEl();
    });
}