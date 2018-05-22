var interfaceModel = require('../interfaceModel');
var returnModel = require('./returnModel');
var config = require('../config');
var utils = require('../utils');
var grpcClient = require('../grpcClient');

var GetClient = function (req) {
    return grpcClient.userClient(req);
};

//通过手机号码来随机重置密码，一步
/**
 * 通过用户名和手机号来重置随机密码
 * userName 用户名  需要转换成name
 * mobile  手机号码
 **/
exports.resetPasswordByMobile = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (queryInfo.userName && queryInfo.mobile) {
        var obj = {
            "name": queryInfo.userName,
            "mobile": queryInfo.mobile
        };

        var client = GetClient(req);

        var _callback =  function (err, response) {

            if (response && response.status == "success") {
                interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, utils.alertMsg.PasswordSendSuccess));
            } else {
                interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, response && response.message ? response.message : utils.alertMsg.PassMobileEmpty));

            }
        };

        utils.GrpcCallback(req, res, client, "resetMobilePwd", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.PassParamEmpty));

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
    if (queryInfo.userName) {
        var obj = {
            "name": queryInfo.userName,
        };

        var client = GetClient(req);

        var _callback = function (err, response) {

            if (response && response.status == "success") {

                req.session.QuestionUserName = queryInfo.userName;
                interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, "", {
                    "id": null,
                    "userId": null,
                    "question": response.data.securityQuestion,
                    "answer": null
                }));
            } else {
                interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.PassGetUserFailed));
            }
        };

        utils.GrpcCallback(req, res, client, "findUserExtByName", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.EmptyParam));
}
;
//2.第二步通过密保答案来设置新密码
/**
 * 第二步，提交密保答案和新密码
 * answer 密保答案
 * password 新密码
 **/
exports.resetPasswordByQuestion = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (queryInfo.password && queryInfo.answer) {
        var obj = {
            "name": req.session.QuestionUserName,
            "answer": queryInfo.answer,
            "newpwd": utils.uncompile(queryInfo.password)
        };

        var client = GetClient(req);

        var _callback = function (err, response) {

            if (response && response.status == "success") {
                utils.Response({
                    "status": "success",
                    "message": "密码修改成功",
                    "statusCode": "",
                    "data": ""
                }, res, interfaceModel);
            }
            else
                utils.Response(response, res, interfaceModel);
        };

        utils.GrpcCallback(req, res, client, "resetNamePwd", _callback, obj);
    }
    else
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.PassAnswerEmpty));
};


/**
 * 修改密码
 * password_old  旧密码
 * password_new  新密码
 **/
exports.updatePassword = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (queryInfo.oldPassword && queryInfo.password) {
        var userId = utils.GetUserID(req);
        var obj = {
            "userId": userId,
            "oldpwd": utils.uncompile(queryInfo.oldPassword),
            "newpwd": utils.uncompile(queryInfo.password)
        };

        var client = GetClient(req);

        var _callback = function (err, response) {
            utils.Response(response, res, interfaceModel);
        };

        utils.GrpcCallback(req, res, client, "updatePwd", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.PassAnswerEmpty));
};
