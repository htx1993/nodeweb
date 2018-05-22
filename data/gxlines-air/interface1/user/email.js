var interfaceModel = require('../interfaceModel');
var returnModel = require('./returnModel');
var config = require('../config');
var utils = require('../utils');
var grpcClient = require('../grpcClient');
var Mock = require('mockjs');
var localSession = require('../../../session');

var GetClient = function (req) {
    return grpcClient.userClient(req);
};

/**
 * 发送邮件
 **/
exports.sendEmail = function (req, res) {
    var reqBody = interfaceModel.getParameter(req);
    if (reqBody.email) {
        if (!localSession.checkEmailCode(req, reqBody.email)) {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMSendCodeAlready));
            return false;
        }
        var randomStr = Mock.mock('@string("upper", 6)');

        var obj = {
            "cc": config.airCompany,
            "to": reqBody.email,
            "templateId": config.emailTemlpateId,
            "body": JSON.stringify({"code": randomStr}),
        };

        var client = GetClient(req);

        var _callback = function (err, response) {
            if (response && response.status == "success") {
                localSession.setEmailCode(req, reqBody.email, randomStr);
                interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, utils.alertMsg.UMSendEmailSuccess));
            } else {
                interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMSendEmailFailed));
            }
        };

        utils.GrpcCallback(req, res, client, "sendMail", _callback, obj);


    }
    else
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMEmailEmpty));

};

exports.checkEmail = function (req, res) {
    var reqBody = interfaceModel.getParameter(req);
    if (reqBody.email && reqBody.valiCode) {
        var checkcode = localSession.getEmailCode(req, reqBody.email);
        if (!checkcode) {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMCodeFailed));
            return;
        }
        if (checkcode == reqBody.valiCode) {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true));
        }
        else {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMCodeError));
        }
    } else
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMEmailCantEmpty));
};


/**
 * 修改邮箱
 **/
exports.updateEmail = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);
    if (reqBody.email && reqBody.valiCode) {
        var checkcode = localSession.getEmailCode(req, reqBody.email);
        if (!checkcode) {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMCodeFailed));
            return;
        }
        if (checkcode == reqBody.valiCode) {

            var userInfo = localSession.getSessionUserInfo(req);
            var obj = {
                "userId": userInfo.userId,
                "oldEmail": userInfo.email,
                "newEmail": reqBody.email
            };

            var client = GetClient(req);

            var _callback = function (err, response) {
                if (response && response.status == "success") {
                    //更新Email
                    var _userinfo = localSession.getSessionUserInfo(req);
                    _userinfo.email = reqBody.email;
                    localSession.setSessionUserInfo(req, _userinfo);

                    var obj2 = {
                        "userId": userInfo.userId,
                        "email": reqBody.email
                    };

                    var client2 = GetClient(req);

                    client2.emailBind(obj2, utils.Metadata(req), {}, function (err, response2) {

                        if (response2 && response2.status == "success") {

                            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, utils.alertMsg.UMUpdateSuccess));
                        } else {
                            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMUpdateFailed));
                        }
                    });
                } else {
                    interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, response && response.message ? response.message : utils.alertMsg.UMUpdateFailed));
                }
            };

            utils.GrpcCallback(req, res, client, "updateEmail", _callback, obj);


        }
        else {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMCodeError));
        }
    }
    else
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMMobileCantEmpty));
};

/**
 * 绑定邮箱
 **/
exports.bindEmail = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);
    if (reqBody.email && reqBody.valiCode) {
        var checkcode = localSession.getEmailCode(req, reqBody.email);
        if (!checkcode) {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMCodeFailed));
            return;
        }
        if (checkcode == reqBody.valiCode) {

            var userid = utils.GetUserID(req);
            var obj = {
                "userId": userid,
                "email": reqBody.email,
            };

            var client = GetClient(req);

            var _callback = function (err, response) {
                if (response && response.status == "success") {
                    interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, utils.alertMsg.UMUpdateSuccess));
                } else {
                    interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMUpdateFailed));
                }
            };

            utils.GrpcCallback(req, res, client, "emailBind", _callback, obj);

        }
        else {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMCodeError));
        }
    }
    else
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMEmailCantEmpty));
};
