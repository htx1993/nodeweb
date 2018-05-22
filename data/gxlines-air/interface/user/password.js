var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var returnModel = require('./returnModel');


//通过手机号码来随机重置密码，一步
/**
 * 通过用户名和手机号来重置随机密码
 * userName 用户名  需要转换成name
 * mobile  手机号码
 **/
exports.resetPasswordByMobile = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if(false){
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "新密码已经发送到你的手机，请及时登录系统并修改密码！"));
    }else{
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "5-10||手机号码对应的用户不存在"));
    }
};


//通过密保来主动设置新密码，分两步
//1.第一步通过用户名来获取密保问题
/**
 * 通过用户名来设置新密码分两步
 * 第一步，通过用户名获取密保问题
 * userName 用户名转 需要换成name
 **/
exports.getQuestionByUserName = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if(true){
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "", {"id": null, "userId": null, "question": "我母亲的名字？", "answer": null}));
    }else{
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "获取用户信息失败"));
    }
};
//2.第二步通过密保答案来设置新密码
/**
 * 第二步，提交密保答案和新密码
 * answer 密保答案
 * password 新密码
 **/
exports.resetPasswordByQuestion = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if(false){
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "密码修改成功"));
    }else{
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "8-10||密保答案错误"));
    }
};


/**
 * 修改密码
 * password_old  旧密码
 * password_new  新密码
 **/
exports.updatePassword = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if(true){
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "密码修改成功"));
    }else{
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "原始密码错误"));
    }
};
