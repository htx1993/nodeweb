var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var returnModel = require('./returnModel');


/**
 * 第一步，验证旧手机号码
 * mobile
 * verificationCode 动态口令
 **/
exports.checkMobile = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (true) {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true));
    }
    else {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "手机号码错误"));
    }
};


/**
 * 第二步，修改手机号码
 * mobile
 * verificationCode 动态口令
 **/
exports.updateMobile = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (false) {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "修改成功"));
    }
    else {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "修改失败"));
    }
};


/**
 * 发送短信
 **/
exports.sendMessage = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (true){
        interfaceModel.sendJson(res,200, returnModel.umRreturnModel(true, "手机验证码发送成功"));
    } else{
        interfaceModel.sendJson(res,200, returnModel.umRreturnModel(false, "手机号不能为空"));
    }
};