hna._i18nMap.addLanguages({
    "UL01": {"zh_CN": "用户名", "en_US": "Flight number"},
    "UL03": {"zh_CN": "登录", "en_US": "Flight number"}
});

var ajaxUrlUm = {
    "sendMessage": "/airU/login/loginSendMobile",
    "loginByName": "/airU/login/loginByName",
    "loginByMobile": "/airU/login/loginByMobile"
};
$(function () {
    $(document).on('click', '.logintext-phone>span', function () {
        $('.login-phone-password-num').toggleClass('hnaui-show');
        if ($('.login-phone-password').is(':hidden')) {
            $('.logintext-phone span').text('手机密码登录');
        } else {
            $('.logintext-phone span').text('手机验证码登录');
        }
    });

});
var _fromListUm = [
    {
        //通过用户名登录
        "type": "loginByName",
        "fromCla": "login-by-name",
        "callback": loginByName
    },
    {
        //通过手机号码和密码登录
        "type": "loginByMobile",
        "fromCla": "login-by-mobile",
        "callback": loginByMobile
    },
    {
        //通过手机号码和验证码登录
        "type": "loginByMobile1",
        "fromCla": "login-by-mobile1",
        "callback": loginByMobile1
    }
];

var _currentMobile = "";
var _currentMobile1 = "";

//重新渲染登录窗口里面的文本框
function renderInputElUm() {
    try {
        _currentMobile = getCurrentMobile($(".login-by-mobile").find("input[name='mobile']").val());
        _currentMobile1 = getCurrentMobile($(".login-by-mobile1").find("input[name='mobile']").val());

        //账号和密码登录
        var html = '<form class="' + _classList[0] + ' ' + _classList[1] + ' login-by-name row p-panel">';
        html += createHiddenInputUm({"eleType": "service", "value": window._serviceUR, "filter": "N"});
        html += createInputElUm({
            "eleType": "userName",
            "verify":"PuserNameOrMobile",
            "showIcon": true,
            "tipsDirection": "up",
            "title": _i18n("UL01"),
            "value": getUserName(),
            "placeholder": "请输入用户名/手机号/邮箱"
        });
        html += createInputElUm({
            "eleType": "password",
            "verify":"PpasswordLogin",
            "showIcon": true,
            "title": "密&emsp;码",
            "tipsDirection": "up"
        });
        html += createMMVeLUm("hna_moveReg_userName");
        html += createLoginBtnEl("loginByName");
        html += '   </form>';

        html = html.replace("name=\"password\"", "");

        $(".login-by-name").replaceWith(html);
        HNAmoveReg.eventInit({
            "id": "hna_moveReg_userName",
            "successMsg": _i18n("B13"),
            "callback": function (data) {
                $(".login-by-name").find("input[name='mmvCode']").val(data || "").attr("isavailable", "Y");
            }
        });

        //手机号和密码登录
        html = '<form class="hnaui-form hnaui-form-pane login-by-mobile row login-phone-password-num login-phone-password p-panel">';
        html += createHiddenInputUm({"eleType": "service", "value": window._serviceUR, "filter": "N"});
        html += createInputElUm({
            "eleType": "mobile",
            "showIcon": true,
            "tipsDirection": "up",
            "value": _currentMobile,
            "isavailable": _currentMobile ? "Y" : ""
        });
        html += createInputElUm({
            "eleType": "password",
            "verify":"PpasswordLogin",
            "showIcon": true,
            "title": "密&emsp;码",
            "tipsDirection": "up"
        });
        html += createMMVeLUm("hna_moveReg_mobile");
        html += createLoginBtnEl("loginByMobile");
        html += '   </form>';
        initMobilePreData();
        $(".login-by-mobile").replaceWith(html);
        HNAmoveReg.eventInit({
            "id": "hna_moveReg_mobile",
            "successMsg": _i18n("B13"),
            "callback": function (data) {
                $(".login-by-mobile").find("input[name='mmvCode']").val(data || "").attr("isavailable", "Y");
            }
        });

        //手机号和验证码登录
        html = '<form class="hnaui-form hnaui-form-pane login-by-mobile1 row login-phone-password-num hnaui-show p-panel">';
        html += createHiddenInputUm({"eleType": "service", "value": window._serviceUR, "filter": "N"});
        html += createInputElUm({
            "eleType": "mobile",
            "showIcon": true,
            "tipsDirection": "up",
            "value": _currentMobile1,
            "isavailable": _currentMobile1 ? "Y" : ""
        });
        html += createMMVeLUm("hna_moveReg_mobile1");
        html += createInputElUm({"eleType": "valiCode", "rightBtn": true});
        
        html += createLoginBtnEl("loginByMobile1");
        html += '   </form>';
        $(".login-by-mobile1").replaceWith(html);
        initMobilePreData();
        HNAmoveReg.eventInit({
            "id": "hna_moveReg_mobile1",
            "successMsg": _i18n("B13"),
            "callback": function (data) {
                $(".login-by-mobile1").find("input[name='mmvCode']").val(data || "").attr("isavailable", "Y");
            }
        });

        var $mobile = $(".login-by-mobile1").find("input[name='mobile']");
        var $mmvCode = $(".login-by-mobile1").find("input[name='mmvCode']");
        $(".login-by-mobile1 ." + _classList[10]).VerificationCode({
            "url": ajaxUrlUm.sendMessage,
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
                renderInputElUm();
                $(".hnaui-logintab .hnaui-login-user-name").trigger("click");
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}
//创建登录按钮
function createLoginBtnEl(eleType) {
    var html = '';
    try {
        html += '<div class="' + _classList[2] + ' ' + _col12 + '">';
        html += '   <a class="' + _classList[9] + ' ' + _classList[9] + '-theme  hnaui-login-btn" hna-submit hna-filter="' + (eleType || "") + '"><i class="' + _classList[8] + '">&#xe913;</i>' + _i18n("UL03") + '</a>';
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}


//用户名户名登录回调
function loginByName(data) {
    try {
        var thisUser = new UserInfo(data);
        var thisData = {
            "userName": thisUser.userName,
            "password": thisUser.password,
            "mmvCode": thisUser.mmvCode,
            "valiCode": thisUser.valiCode,
            "service": thisUser.service
        };
        saveUserName(thisUser.userName);
        sendAjaxUm(ajaxUrlUm.loginByName, thisData, function (data) {
            goToPage_login(data.data);
        }, function (data) {
            loginFailed(data);
            renderInputElUm();
            setTimeout(function(){
                $("input[name='password']").val("")
            },500);
        });
    } catch (e) {
        JsErrorTips(e);
    }
}
//手机号和密码登录回调
function loginByMobile(data) {
    try {
        var thisUser = new UserInfo(data);
        var thisData = {
            "userName": thisUser.mobile,
            "password": thisUser.password,
            "mmvCode": thisUser.mmvCode,
            "valiCode": thisUser.valiCode,
            "service": thisUser.service
        };
        sendAjaxUm(ajaxUrlUm.loginByName, thisData, function (data) {
            goToPage_login(data.data);
        }, function (data) {
            loginFailed(data);
            renderInputElUm();
            $(".hnaui-logintab .hnaui-login-mobil").trigger("click");

            setTimeout(function(){
                $("input[name='password']").val("")
            },500);
        });
    } catch (e) {
        JsErrorTips(e);
    }
}
//手机号和验证码登录回调
function loginByMobile1(data) {
    try {
        var thisUser = new UserInfo(data);
        var thisData = {
            "mobile": thisUser.mobile,
            "mmvCode": thisUser.mmvCode,
            "valiCode": thisUser.valiCode,
            "service": thisUser.service
        };
        sendAjaxUm(ajaxUrlUm.loginByMobile, thisData, function (data) {
            goToPage_login(data.data);
        }, function (data) {
            loginFailed(data);
            renderInputElUm();
            $(".hnaui-logintab .hnaui-login-user-name").trigger("click");
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

//登录失败
function loginFailed(data) {
    if (data && data.data && (data.data.rialTimes + "")) {
        var n = data.data.rialTimes + "";
        if (n <= 3) {
            var $trialTimes = $(".trial-times");
            $trialTimes.find("i").html(n);
            $trialTimes.show();
        }
        if (n == 0) {
            $(".no-login-tips").show();
        }
    }
}

//登录成功的跳转
function goToPage_login(user) {
    try {
        $(".trial-times").hide();

        var url = user.url;
        var thisUser = new UserInfo(user);

        var html = '';
        html += '<p>';
        html += '   <a href="' + hna._server_host + '/airU/userInfo" class="hna-loginname"><i class="hnaui-icon">&#xe92a;</i><span class="hnaui-elip">欢迎您：' + thisUser.fullName + '</span></a><em>|</em>';
        html += '   <a href="' + hna._server_host + '/airU/loginOut" class="hna-tctext">退出</a>';
        html += '</p>';
        $(".header-block .hna-btnalink").html(html);

        _userId = thisUser.id;
        _isRegister = thisUser.isRegister;

        if (window.HNALogin) {
            if (hna.isFunction(HNALogin.loginCallback)) {
                HNALogin.loginCallback();
            }
        } else {
            if (url) {
                url = decodeURIComponent(hna.uncompile(url));
                //如果url是注册页面或者是找回密码页面，则把它设置为首页路径
                if (url.indexOf("/airU/register") > -1 || url.indexOf("/airU/retrievePassword") > -1 || url.indexOf("/airU/login") > -1) {
                    url = hna.compile("/");
                }
                window.top.location.href = hna.uncompile(url);
            }
        }
    } catch (e) {
        JsErrorTips(e);
    }
}

