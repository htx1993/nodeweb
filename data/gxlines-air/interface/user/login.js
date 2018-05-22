var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var returnModel = require('./returnModel');
var localSession = require(path.join(process.cwd(), 'data/session'));
var userData = require(path.join(process.cwd(), 'data/' + config.company + '/interface/user/userData'));

var userInfo = userData.userInfo;
/**
 * 通过用户名登录
 * userName  用户名
 * password  密码
 **/
exports.loginByName = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);

    var mmvResult = localSession.judgeMMVResult(req,queryInfo.mmvCode);

    //if(!mmvResult){
    //    if(true){
    //        localSession.setSessionUserInfo(req, userInfo);
    //        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "登录成功",{"url":queryInfo.service || "/"}));
    //    }else{
    //        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "登录失败"));
    //    }
    //}else{
    //    interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, mmvResult));
    //}


    if(true){
        localSession.setSessionUserInfo(req, userInfo);
        var returnData = localSession.getSessionUserInfo(req);
        returnData.url = queryInfo.service || "/";
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "登录成功", returnData));
    }else{
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "登录失败"));
    }

};

/**
 * 通过手机号发送登录口令
 * mobile  手机号
 **/
exports.loginSendMobile = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (true){
        interfaceModel.sendJson(res,200, returnModel.umRreturnModel(true, "手机验证码发送成功"));
    } else{
        interfaceModel.sendJson(res,200, returnModel.umRreturnModel(false, "手机号不能为空"));
    }
};

/**
 * 通过手机号登录
 * mobile  手机号
 * valiCode  动态口令
 **/
exports.loginByMobile = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if(false){
        localSession.setSessionUserInfo(req, userInfo);
        var returnData = localSession.getSessionUserInfo(req);

        returnData.url = queryInfo.service || "/";
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "登录成功", returnData));
    }else{
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "登录失败", {"rialTimes":0}));
    }
};


/**
 * 登出
 **/
exports.loginOut = function (req, res, next) {
    if(true){
        localSession.setSessionUserInfo(req, null);
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "登出成功"));
    }else{
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "登录出失败"));
    }
};


