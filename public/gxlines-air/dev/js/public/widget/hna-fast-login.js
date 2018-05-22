hna._i18nMap.addLanguages({
    "FL01": {"zh_CN": "预订内容", "en_US": "Shopping Cart"}
});

window.HNALogin = HNALogin = (function ($, w, d, undefined) {
    var callback = null;

    function createInitEl() {
        var html = '';
        html += '<div class="hnaui-fast-login login-content  hnaui-user" style="display: none;">';
        html += '   <div class="hnaui-fast-mask"></div>';
        html += '   <div class="hnaui-fast-content">';
        html += '       <div class="hnaui-tab">';
        html += '           <span class="hnaui-icon close">&#x2716;</span>';
        html += '           <h2>欢迎登录</h2>';
        html += '           <ul class="hnaui-tab-title hnaui-logintab">';
        html += '               <li class="hnaui-login-user-name hnaui-this">手机号码登录</li>';
        html += '               <li class="hnaui-login-mobil">账号密码登录</li>';
        html += '           </ul>';
        html += '           <div class="hnaui-tab-content">';
        html += '               <div class="hnaui-tab-item hnaui-clear hnaui-show">';
        // html += '                   <p class="logintext-phone hnaui-push-right"><span>手机密码登录</span></p>';
        html += '                   <form class="hnaui-form hnaui-form-pane login-by-mobile login-phone-password-num login-phone-password p-panel"></form>';
        html += '                   <form class="hnaui-form hnaui-form-pane login-by-mobile1 row login-phone-password-num hnaui-show p-panel"></form>';
        html += '               </div>';
        html += '               <div class="hnaui-tab-item hnaui-clear">';
        // html += '                   <p class="logintext-phone hnaui-push-right"><span style="visibility: hidden">占位</span></p>';
        html += '                   <form class="hnaui-form hnaui-form-pane login-by-name row p-panel"></form>';
        html += '               </div>';
        html += '               <p class="hnaui-alink">';
        html += '                   <span class="trial-times">您今天还有<i>6</i>次尝试机会</span>';
        html += '                   <a href="/airU/retrievePassword" class="forget-password"><strong>忘记密码</strong></a> |';
        html += '                   <a href="/airU/register"><em class="subcolor">立即注册</em></a>';
        html += '               </p>';
        html += '               <p class="hnaui-alink">';
        html += '                   <a href="/airEye/order/searchOrder">老官网非会员订单查询 &gt;</a>';
        html += '               </p>';
        // html += '               <div class="third-login">';
        // html += '                   <p><span>使用第三方账号登录</span></p>';
        // html += '                   <ul>';
        // html += '                       <li>';
        // html += '                           <a href="/login/weixin" target="_blank"><span class="hnaui-icon">&#xe981;</span>微信</a>';
        // html += '                       </li>';
        // html += '                       <li>';
        // html += '                           <a href="/login/alipay" target="_blank"><span class="hnaui-icon">&#xe930;</span>支付宝</a>';
        // html += '                       </li>';
        // html += '                       <li>';
        // html += '                           <a href="/login/weibo" target="_blank"><span class="hnaui-icon">&#xe980;</span>微博</a>';
        // html += '                       </li>';
        // html += '                   </ul>';
        // html += '               </div>';

        html += '           </div>';
        html += '           <div class="no-login-tips"><span>密码错误超过5次，请次日重试</span></div>';
        html += '       </div>';
        html += '   </div>';
        html += '</div>';

        $("body").append(html);

        renderInputElUm();

        renderFrom();
        initElement();

        initInputUm();
        initSelectUm();
        initSubmitUm();
        commonEventInit();
        hna.filterForm();

        //弹出登录关闭
        $(document).on('click', '.hnaui-fast-login .close', function () {
            hideFastLogin();
        });
    }

    function hideFastLogin(){
        $('.hnaui-fast-login').hide();
    }

    function showFastLogin(o) {
        if (!o) {
            o = {};
        }
        callback = o.callback;

        var $fastLogin = $(".hnaui-fast-login");
        if ($fastLogin.length <= 0) {
            createInitEl();
            $fastLogin = $(".hnaui-fast-login");
        }
        $fastLogin.show();
    }

    function loginCallback(){
        if(hna.isFunction(callback)){
            callback();
        }
        hideFastLogin();
    }

    return {
        showFastLogin: showFastLogin,
        loginCallback: loginCallback
    };
})(jQuery, window, document);