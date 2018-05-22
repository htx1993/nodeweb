var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var returnModel = require('./returnModel');
/**
 * 发送邮件
 **/
exports.sendEmail = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if(true){
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "邮件发送成功"));
    }else{
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "邮件发送失败"));
    }
};

/**
 * 验证邮箱
 **/
exports.checkEmail = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (true) {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true));
    }
    else {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "邮箱错误"));
    }
};


/**
 * 修改邮箱
 **/
exports.updateEmail = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if(true){
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "邮箱修改成功"));
    }else{
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "邮箱修改失败"));
    }
};

/**
 * 绑定邮箱
 **/
exports.bindEmail = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if(true){
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "邮箱绑定成功"));
    }else{
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "邮箱绑定失败"));
    }
};
