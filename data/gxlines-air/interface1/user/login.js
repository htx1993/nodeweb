var interfaceModel = require('../interfaceModel');
var returnModel = require('./returnModel');
var localSession = require('../../../../data/session');
var config = require('../config');
var utils = require('../utils');
var grpcClient = require('../grpcClient');

var path = require('path')
var compile = require(path.join(process.cwd(), 'data/tools/compile'));

var GetClient = function (req) {
    return grpcClient.userClient(req);
};

var isUrl = function (str_url) {
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
        + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
        + "[a-z]{2,6})" // first level domain- .com or .museum
        + "(:[0-9]{1,4})?" // 端口- :80
        + "((/?)|" // a slash isn't required if there is no file name
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
    return str_url.match(re)
};


var SetGotoUrl = function (serviceUrl, response) {
    var gotoUrl = "/";
    console.log("serviceUrl:" + serviceUrl)
    if (serviceUrl) {
        //解密回调地址
        gotoUrl = compile.uncompile(escape(decodeURIComponent(compile.uncompile(serviceUrl))));
        var matchList = isUrl(gotoUrl);
        console.log("gotoUrl:" + gotoUrl)
        console.log("matchList:" + JSON.stringify(matchList))
        //筛选出了带有host的字符串，表示有非法入侵
        if (matchList && matchList.length > 0 && gotoUrl.indexOf(config.hostdomain) == -1) {
            gotoUrl = "/"
        }

    }
    //如果用户名为空，则跳到用户中心完善信息
    if (response && response.data && !response.data.name) {
        gotoUrl = "/airU/userInfo";
    }
    var _gotoUrl = compile.compile(encodeURIComponent(unescape(compile.compile(gotoUrl))));
    // var _gotoUrl = compile.compile(encodeURIComponent(gotoUrl));

    return _gotoUrl;
}

/**
 * 通过用户名登录
 * userName  用户名
 * password  密码
 **/
exports.loginByName = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    var mmvResult = localSession.judgeMMVResult(req, reqBody.mmvCode);
    if (mmvResult) {
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, mmvResult));
        return;
    }

    var obj = {
        "loginType": 0,
        "loginName": reqBody.userName,
        "password": utils.uncompile(reqBody.password)
    };

    var client = GetClient(req);

    var _callback = function (err, response) {
        if (response && response.status == "success") {
            localSession.setSessionUserInfo(req, response.data);

            var responseData = localSession.getSessionUserInfo(req)
            responseData.url = SetGotoUrl(reqBody.service, response);
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, response.message || utils.alertMsg.LoginSuccess, responseData));

        }
        else {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, (response && response.message ) ? response.message : utils.alertMsg.LoginFailed));
        }
    };

    utils.GrpcCallback(req, res, client, "login", _callback, obj);
};


/**
 * 通过手机号登录
 * mobile  手机号
 * valiCode  动态口令
 **/
exports.loginByMobile = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    var mmvResult = localSession.judgeMMVResult(req, reqBody.mmvCode);
    if (mmvResult) {
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, mmvResult));
        return;
    }

    if (reqBody.mobile && reqBody.valiCode) {

        var obj = {
            "loginType": 1,
            "loginName": reqBody.mobile,
            "password": reqBody.valiCode
        };

        var client = GetClient(req);

        var _callback = function (err, response) {
            if (response && response.status == "success") {
                localSession.setSessionUserInfo(req, response.data);

                var responseData = localSession.getSessionUserInfo(req);
                responseData.url = SetGotoUrl(reqBody.service, response);
                interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, response.message || utils.alertMsg.LoginSuccess, responseData));

            }
            else {
                interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, (response && response.message ) ? response.message : utils.alertMsg.LoginFailed));
            }
        };

        utils.GrpcCallback(req, res, client, "login", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.LoginMobileEmpty));
}
;

//调用UM接口发送短信验证码
exports.loginSendMobile = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    var mmvResult = localSession.judgeMMVResult(req, reqBody.mmvCode);
    if (mmvResult) {
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, mmvResult));
        return;
    }

    if (reqBody.mobile) {
        var client = GetClient(req);
        var obj = {
            "codeType": "sms",
            "mobile": reqBody.mobile
        };

        var _callback = function (err, response) {
            if (response && response.status == "success") {
                interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, utils.alertMsg.LoginMobileSendSuccess));
            }
            else {
                interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, (response && response.message ) ? response.message : utils.alertMsg.LoginMobileSendFailed));
            }
        };

        utils.GrpcCallback(req, res, client, "sendCodes", _callback, obj);

    }
};


/**
 * 登出
 **/
exports.loginOut = function (req, res, next) {
    localSession.setSessionUserInfo(req, null);
    localSession.setSessionForOTA(req);
    req.session.lfsusersessionid = null;
    interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, utils.alertMsg.LoginOutSuccess));

};

/**
 * 获取登录信息
 **/
exports.getlogininfo = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);
    var userSession = localSession.getSessionUserInfo(req);
    var result = {};
    if (userSession && userSession.userSessionId && userSession.userId) {
        result = {
            "status": "success", data: {
                userName: userSession.userName,
                lastName: userSession.lastName,
                firstName: userSession.firstName
            }
        };
    }
    else {
        result = {
            "status": "failed", data: {}
        };
    }
    var _callback = reqBody.callback;
    if (_callback && /^[0-9a-zA-Z_]{1,}$/.test(_callback)) {
        var callback = _callback + '(' + JSON.stringify(result) + ');';
        res.end(callback);
    }
    else {
        res.end(JSON.stringify(result));
    }
};


