hna._i18nMap.addLanguages({
    //"UR01": {"zh_CN": "验证通过", "en_US": "Flight number"}
});

var ajaxUrl = {
    "sendMessage": "/airU/userInfo/sendMessage",

    "isExistByUserName": "/airU/userInfo/isExistByUserName",
    "isExistByMobile": "/airU/userInfo/isExistByMobile",
    "isExistByEmail": "/airU/userInfo/isExistByEmail",

    "registerUser": "/airU/userInfo/registerUser"
};
var _fromListUm = [
    {
        //注册
        "type": "registerForm",
        "fromCla": "register-form",
        "callback": registerFun
    }
];

var _userInfo = {};

$(function () {
    $(document).on('click', '.han-agreement', function () {
        _showServiceTermsTips({"title": _i18n("Agr01"), "href": "/airU/registration-protocol.html"});
    });
    _userInfo = new UserInfo();

   // _createUserMenuEl("noLogin");
    createRegisterEl();

    renderFrom();
    initElement();

    initInputUm();
    initSelectUm();
    initDateUm();
    initRadioUm();
    initCheckbox();
    initSubmitUm();
    commonEventInit();
    initMobilePreData();

    hna.filterForm();
    hna.goToTop("1");
});

//重新渲染登录窗口里面的文本框
function createRegisterEl() {
    var o = {};
    _userInfo.password = "";
    _userInfo.password_re = "";
    for (var key in _userInfo) {
        if (_userInfo.hasOwnProperty(key)) {
            o[key] = {"eleType": key, "value": _userInfo[key]};
        }
    }
    o.userName.uniqueUrl = ajaxUrl.isExistByUserName;
    o.mobile.uniqueUrl = ajaxUrl.isExistByMobile;
    o.email.uniqueUrl = ajaxUrl.isExistByEmail;

    o.userName.placeholder = _i18n("UN01");
    o.password.placeholder = _i18n("Pw01");
    o.password_re.placeholder = _i18n("Pw01");

    var objPlaceholder = getInputPlaceholderByIdNo(o.idType.value);
    o.firstName.placeholder = objPlaceholder.firstNamePlaceholder;
    o.lastName.placeholder = objPlaceholder.lastNamePlaceholder;
    o.idNo.placeholder = objPlaceholder.idNoPlaceholder;

    o.birthday.showIcon = true;
    o.birthday.readonly = true;
    o.password.showIcon = true;
    o.password_re.showIcon = true;

    var html = '<div class="hnaui-user-panel ' + _classList[5] + ' ' + _classList[7] + ' hnaui-edit-panel">';
    html += '       <h1><i class="' + _classList[8] + '">&#xe912;</i>' + _i18n("Tit27") + '</h1>';
    html += '       <div class="' + _classList[6] + ' ' + _classList[7] + ' ' + layoutLeftCla + '">';
    html += '           <form class="' + _classList[0] + ' ' + _classList[1] + ' register-form row">';
    html += createHiddenInputUm(o.id);
    html += createInputElUm(o.userName);
    html += createInputElUm(o.password);
    html += createInputElUm(o.password_re);
    html += createInputElUm(o.lastName);
    html += createInputElUm(o.firstName);
    html += createSelectElUm(o.idType);
    html += createInputElUm(o.idNo);
    html += createInputElUm(o.birthday);
    html += createRadioElUm(o.sex);
    html += createInputElUm(o.mobile);
    html += createMMVeLUm("hna_moveReg");
    html += createInputElUm({"eleType": "valiCode", "rightBtn": true});
    html += createInputElUm(o.email);
    html += createInputElUm(o.question);
    html += createInputElUm(o.answer);
    html += '               <div class="' + _col12 + '">';
    html += '                   <div class="' + _classList[2] + ' ' + _classList[7] + '">';
    html += '                       <div class="' + _classList[4] + '">';
    html += '                           <input type="checkbox" hna-skin="primary" hna-filter="agreement" name="agreement"> ' + _i18n("Agr03") + '<a href="javascript:;" onclick="return false"  class="hnaui-text-color han-agreement">' + _i18n("Agr01") + '</a>';
    html += '                       </div>';
    html += '                   </div>';
    html += '               </div>';
    html += createRegisterBtnEl();
    html += '           </form>';
    html += '       </div>';
    html += '       <div class="' + _classList[6] + ' ' + layoutRightCla + '">';
    html += createAdverTextEl();
    html += createAdverEl("register");
    html += '       </div>';
    html += '   </div>';
    $(".search-result").html(html).show();
    resetMmvVerifyEl();
    $(".search-loading").hide();
}
//创建注册按钮
function createRegisterBtnEl() {
    var html = '<div class="' + _classList[2] + ' ' + _classList[7] + ' search-submit' + _col12 + '">';
    html += '       <a class="' + _classList[9] + ' ' + _classList[9] + '-theme ' + _classList[9] + '-model hnaui-register-btn" hna-submit hna-filter="registerForm"><i class="' + _classList[8] + '">&#xe610;</i>注册</a>';
    html += '   </div>';
    html += '';
    return html;
}

//去掉注册页面的注册按钮不可用样式hnaui-btn-disabled
function setRegisterBtnStyle() {
    //验证唯一性的错误锁
    var unAvailableCount = 0;
    var $isAvailable = $("input[isavailable]").each(function () {
        var $this = $(this);
        if ($this.attr("isavailable") != "Y") {
            unAvailableCount++;
        }
    });
    //$(".hnaui-register-btn").toggleClass("hnaui-btn-disabled", (unAvailableCount > 0 || _uqLockLoadingCount > 0));
}

//注册
function registerFun(data) {
    if ($(".hnaui-register-btn").hasClass("hnaui-btn-disabled")) {
        return false;
    }

    if ($("input[name='agreement']:checked").length < 1) {
        _showValidationTips(_i18n("Agr02"));
        return false;
    }

    var registerInfo = new UserInfo(data);
    sendAjaxUm(ajaxUrl.registerUser, registerInfo, function (data) {
        saveUserName(registerInfo.name);
        _showCountDownTips({"tips":data.message + _i18n("Tp01"),"time":2},function(){
            goToPage("/");
        });
    }, function () {
        resetMmvVerifyEl();
    });
}


//监听注册协议被选中
function initCheckbox() {
    try {
        globalFrom.on('checkbox(agreement)', function (data) {
            setRegisterBtnStyle();
        });
    } catch (e) {

    }
}

//注册失败，重置人机验证和发送短息
function resetMmvVerifyEl() {
    resetMmvEl();
    resetVerifyEl();
    renderFrom();
}

//重置发送短息
function resetVerifyEl() {
    var html = createInputElUm({"eleType": "valiCode", "rightBtn": true});
    $(".hnaui-verifybtn").parents(".p-input").replaceWith(html);
    var $mobile = $(".register-form").find("input[name='mobile']");
    var $mmvCode = $(".register-form").find("input[name='mmvCode']");
    $(".register-form ." + _classList[10]).VerificationCode({
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
            resetMmvEl();
        }
    });
}

//重置人机验证
function resetMmvEl() {
    var html = createMMVeLUm("hna_moveReg");
    $(".p-mmv").parent().replaceWith(html);
    HNAmoveReg.eventInit({
        "id": "hna_moveReg",
        "successMsg": _i18n("B13"),
        "callback": function (data) {
            $(".register-form").find("input[name='mmvCode']").val(data || "").attr("isavailable", "Y");
        }
    });
}
