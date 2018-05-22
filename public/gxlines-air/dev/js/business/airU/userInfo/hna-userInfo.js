//当前用户信息
var _userInfo = {};
//当前用户id
var _userId = "";

var ajaxUrl = window.ajaxUrl || {};
ajaxUrl.updateUserInfo = "/airU/userInfo/updateUserInfo";
ajaxUrl.isExistByUserName = "/airU/userInfo/isExistByUserName";
ajaxUrl.isExistByMobile = "/airU/userInfo/isExistByMobile";
ajaxUrl.isExistByEmail = "/airU/userInfo/isExistByEmail";

var _fromListUm = window._fromListUm || [];
_fromListUm.push({
    //提交用户信息
    "type": "userInfoForm",
    "fromCla": "user-info-form",
    "callback": updateUserInfo
});

//创建个人资料面板
function createUserInfoPanel() {
    try {
        var o = {};
        for (var key in _userInfo) {
            if (_userInfo.hasOwnProperty(key)) {
                o[key] = {"eleType": key, "value": _userInfo[key]};
            }
        }
        o.userName.uniqueUrl = ajaxUrl.isExistByUserName;
        o.mobile.uniqueUrl = ajaxUrl.isExistByMobile;
        o.email.uniqueUrl = ajaxUrl.isExistByEmail;

        if (o.userName.value) {
            o.userName.readonly = true;
            o.userName.showIcon = true;
        }

        if (o.idType.value == "ID_CARD") {
            o.birthday.readonly = true;
        }
        if (o.mobile.value) {
            o.mobile.readonly = true;
            o.mobile.showIcon = true;
        }
        if (o.email.value) {
            o.email.readonly = true;
            o.email.showIcon = true;
        }
        o.birthday.showIcon = true;
        o.phone.required = false;

        o.userName.placeholder = _i18n("UN01");
        var objPlaceholder = getInputPlaceholderByIdNo(o.idType.value);
        o.firstName.placeholder = objPlaceholder.firstNamePlaceholder;
        o.lastName.placeholder = objPlaceholder.lastNamePlaceholder;
        o.idNo.placeholder = objPlaceholder.idNoPlaceholder;

        //国家码和手机号码绑定
        o.mobile.mobilePreV = _userInfo.mobilePre;

        var htmlEl = createEditPanelEl({
            "type": "user",
            "title": _i18n("Tit01"),
            "icon": "&#xe612;",
            "classStr": "update-user-panel",
            "createHtmlFun": function () {
                var html = '       <form class="row ' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + ' user-info-form">';
                html += createHiddenInputUm(o.id);
                html += createInputElUm(o.userName);
                if (!o.userName.value) {
                    o.password.placeholder = _i18n("Pw01");
                    o.password_re.placeholder = _i18n("Pw01");
                    html += createInputElUm(o.password);
                    html += createInputElUm(o.password_re);
                }

                //不注册 直接手机登录  联系人姓和名 到乘机人过滤
                var reg = /^([A-Za-z\s]|[\u4E00-\u9FA5])+$/;
                if (!reg.test(o.firstName.value) || !reg.test(o.lastName.value)) {
                    o.firstName.value = "";
                    o.lastName.value = "";
                }

                html += createInputElUm(o.lastName);
                html += createInputElUm(o.firstName);
                html += createRadioElUm(o.sex);
                html += createSelectElUm(o.idType);
                html += createInputElUm(o.idNo);
                html += createInputElUm(o.birthday);
                html += createInputElUm(o.mobile);
                if(!o.mobile.value){
                    html += createMMVeLUm("hna_moveReg");
                    html += createInputElUm({"eleType": "valiCode", "rightBtn": true});
                }
                html += createInputElUm(o.phone);
                html += createInputElUm(o.email);
                if (!o.userName.value) {
                    html += createInputElUm(o.question);
                    html += createInputElUm(o.answer);
                }
                if(o.userName.value){
                    html += '<div class="hnaui-left" style="color:#c21084;font-size: 12px;">*如需修改手机号码、邮箱，请到安全设置中操作</div>';
                }
                html += createSubmitBtnElUm("userInfoForm");
                html += '           </form>';
                return html;
            }
        });

        $(".search-result").html(htmlEl).show();
        resetMmvVerifyEl();
        if (o.idType.value == "ID_CARD") {
            setTimeout(function () {
                $("input[name='idNo']").trigger("blur");
            }, 10);
        }

        renderFrom();
        initMobilePreData();
    } catch (e) {
        JsErrorTips(e);
    }
}

function updateUserInfo(data) {
    var thisUser = new UserInfo(data);
    updateRecord(ajaxUrl.updateUserInfo, thisUser, function () {
        var userQuestion = _userInfo.question;
        $.extend(_userInfo, thisUser);
        createUserInfoPanel();
        $(".hna-btnalink").find("span").html(getFullName(_userInfo.firstName , _userInfo.lastName));
        
        _userInfo.question = userQuestion;
        _userInfo.isRegister = "Y";
        //location.reload();
    });
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
    var $verifybtn = $(".hnaui-verifybtn");
    if($verifybtn.length > 0){
        $verifybtn.parents(".p-input").replaceWith(html);
        var $mobile = $(".user-info-form").find("input[name='mobile']");
        var $mmvCode = $(".user-info-form").find("input[name='mmvCode']");
        $(".user-info-form ." + _classList[10]).VerificationCode({
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
}

//重置人机验证
function resetMmvEl() {
    var html = createMMVeLUm("hna_moveReg");
    var $mmv = $(".p-mmv");
    if($mmv.length > 0){
        $mmv.parent().replaceWith(html);
        HNAmoveReg.eventInit({
            "id": "hna_moveReg",
            "successMsg": _i18n("B13"),
            "callback": function (data) {
                $(".user-info-form").find("input[name='mmvCode']").val(data || "").attr("isavailable", "Y");
            }
        });
    }

}
