hna._i18nMap.addLanguages({
    "RP01": {"zh_CN": "找回密码", "en_US": "Flight number"},
    "RP02": {"zh_CN": "通过手机找回密码", "en_US": "Flight number"},
    "RP03": {"zh_CN": "重置密码", "en_US": "Flight number"},
    "RP04": {"zh_CN": "通过密保找回密码", "en_US": "Flight number"},
    "RP05": {"zh_CN": "下一步", "en_US": "Flight number"},
    "RP06": {"zh_CN": "新密码", "en_US": "Flight number"},
    "RP07": {"zh_CN": "修改密码", "en_US": "Flight number"}
});

var ajaxUrl = {
    resetPasswordByMobile: "/airU/userInfo/resetPasswordByMobile",
    getQuestionByUserName: "/airU/userInfo/getQuestionByUserName",
    resetPasswordByQuestion: "/airU/userInfo/resetPasswordByQuestion"
};

var _fromListUm = [
    {
        //提交通过手机找回密码信息
        "type": "resetPasswordByMobile",
        "fromCla": "by-mobile-form",
        "callback": resetPasswordByMobile
    },
    {
        //提交通过密保找回密码信息
        "type": "getQuestionByUserName",
        "fromCla": "by-question-form",
        "callback": getQuestionByUserName
    },
    {
        //提交通过密保找回密码信息
        "type": "resetPasswordByQuestion",
        "fromCla": "by-question-form",
        "callback": resetPasswordByQuestion
    }
];

//请求次数
var _requestCountByMobile = 0;
var _userName = "";
var _mobile = "";

var _requestCountByQuestion = 0;
var _question = "";
var _answer = "";


$(function () {

   // _createUserMenuEl("noLogin");
    createRetrievePasswordPanel();

    renderFrom();
    initElement();

    initInputUm();
    initSelectUm();
    initDateUm();
    initRadioUm();
    initTabUm();
    initSubmitUm();
    commonEventInit();
    initMobilePreData();

    hna.filterForm();
    hna.goToTop("1");
});


//创建安全设置面板
function createRetrievePasswordPanel() {
    try {
        var htmlEl = createEditPanelEl({
            "type": "retrieve",
            "title": _i18n("RP01"),
            "icon": "&#xe909;",
            "classStr": "update-setting-panel",
            "createHtmlFun": function () {
                var htmlEl =setUserMenuLeftEl(this);
                htmlEl += createTabPanelEl({
                    "dataArr": [
                        {
                            "title": _i18n("RP02"),
                            "createHtmlFun": getPasswordByMobileEl
                        },
                        {
                            "title": _i18n("RP04"),
                            "createHtmlFun": function () {
                                var html = '<form class="row ' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + ' by-question-form">';
                                html += createInputElUm({"eleType": "userName","verify":"PuserNameOrMobile"});
                                html += createSubmitBtnElUm("getQuestionByUserName", _i18n("RP05"));
                                html += '    </form>';
                                return html;
                            }
                        }
                    ]
                });
                return htmlEl;
            }
        });

        $(".search-result").html(htmlEl).show();
        $(".search-loading").hide();

        renderFrom();
        initElement();
    } catch (e) {
        JsErrorTips(e);
    }
}

function getPasswordByMobileEl() {
    var html = '';
    try {
        html = '<form class="row ' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + ' by-mobile-form">';
        html += createInputElUm({"eleType": "userName", "value": _userName,"verify":"PuserNameOrMobile"});
        html += createInputElUm({"eleType": "mobile", "value": _mobile});
        if (_requestCountByMobile > 3) {
            html += createMMVeLUm("hna_moveReg1");
        }
        html += createSubmitBtnElUm("resetPasswordByMobile", _i18n("RP03"));
        html += '    </form>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}

//提交通过手机找回密码信息
function resetPasswordByMobile(data) {
    var thisUser = new UserInfo(data);
    saveUserName(thisUser.userName);
    _userName = thisUser.userName;
    _mobile = getCurrentMobile(thisUser.mobile);
    var thisData = {
        "userName":thisUser.userName,
        "mobile":thisUser.mobile,
        "mmvCode":thisUser.mmvCode
    };
    sendAjaxUm(ajaxUrl.resetPasswordByMobile, thisData, function (data) {
        resetPasswordTips(data.message);
    }, function (data) {
        var message = data.message;
        var arr = (message.substring(0, message.indexOf("||")) || "").split("-");
        if(arr && arr.length == 2){
            _requestCountByMobile = parseInt(arr[1]+"") - parseInt(arr[0]+"");
        }else{
            _requestCountByMobile++;
        }

        $(".by-mobile-form").replaceWith(getPasswordByMobileEl());
        initMobilePreData();
        resetMmvEl("hna_moveReg1", "by-mobile-form");
    });
}


//提交通过用户名获取密保
function getQuestionByUserName(data) {
    saveUserName(data.userName);
    sendAjaxUm(ajaxUrl.getQuestionByUserName, data, function (data) {
        _question = data.data.question;
        if(!_question){
            hnaer.msg("您的账户没设置密保问题，请选择其他方式找回密码");
            return false;
        }else {
            $(".by-question-form").replaceWith(getPasswordByQuestionEl());
        }
        $(".by-question-form").replaceWith(getPasswordByQuestionEl());
        renderFrom();
    });
}
function getPasswordByQuestionEl() {
    var html = '';
    try {
        html = '<form class="row ' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + ' by-question-form">';
        html += createInputElUm({"eleType": "question", "value": _question, "readonly": true});
        html += createInputElUm({"eleType": "answer", "value": _answer});
        html += createInputElUm({"eleType": "password", "title": _i18n("RP06"), "showIcon": true});
        html += createInputElUm({"eleType": "password_re", "showIcon": true});
        if (_requestCountByQuestion > 3) {
            html += createMMVeLUm("hna_moveReg2");
        }
        html += createSubmitBtnElUm("resetPasswordByQuestion", _i18n("RP07"));
        html += '    </form>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//提交通过密保问题找回密码信息
function resetPasswordByQuestion(data) {
    _answer = data.answer;
    sendAjaxUm(ajaxUrl.resetPasswordByQuestion, data, function (data) {
        resetPasswordTips(data.message);
    }, function (data) {
        var message = data.message;
        var arr = (message.substring(0, message.indexOf("||")) || "").split("-");
        console.log(arr);
        if(arr && arr.length == 2){
            _requestCountByQuestion = parseInt(arr[1]+"") - parseInt(arr[0]+"");
        } else {
            _requestCountByQuestion++;
        }

        $(".by-question-form").replaceWith(getPasswordByQuestionEl());
        resetMmvEl("hna_moveReg2", "by-question-form");
    });
}

//密码修改成功提示跳转
function resetPasswordTips(tips) {
    _showSuccessTips(tips || "", function () {
        goToPage("/airU/login");
    });
}


//重置人机验证
function resetMmvEl(id, formName) {
    if ($("." + formName).find("#" + id).length == 0) {
        return false;
    }
    HNAmoveReg.eventInit({
        "id": id,
        "successMsg": _i18n("B13"),
        "callback": function (data) {
            $("." + formName).find("input[name='mmvCode']").val(data || "").attr("isavailable", "Y");
        }
    });
}