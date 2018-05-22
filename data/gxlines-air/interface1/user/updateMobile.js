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
 * 第一步，验证旧手机号码
 * mobile
 * verificationCode 动态口令
 **/
exports.checkMobile = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);
    if (reqBody.mobile && reqBody.valiCode) {
        var checkcode = localSession.getMobileCode(req, reqBody.mobile);
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
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.LoginMobileEmpty));
};


/**
 * 第二步，修改手机号码
 * mobile
 * verificationCode 动态口令
 **/
exports.updateMobile = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);
    if (reqBody.mobile && reqBody.valiCode) {
        var checkcode = localSession.getMobileCode(req, reqBody.mobile);
        if (!checkcode) {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMCodeFailed));
            return;
        }
        if (checkcode == reqBody.valiCode) {

            var userInfo = localSession.getSessionUserInfo(req);
            var obj = {
                "userId": userInfo.userId,
                "newMobile": reqBody.mobile,
                "oldMobile": userInfo.mobile,
                "status": parseInt(userInfo.status) || 0,
            };

            var client = GetClient(req);

            var _callback = function (err, response) {
                if (response && response.status == "success") {

                    //更新mobile
                    var _userinfo = localSession.getSessionUserInfo(req);
                    _userinfo.mobile = reqBody.mobile;
                    localSession.setSessionUserInfo(req, _userinfo);

                    interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, utils.alertMsg.UMUpdateSuccess));
                } else {
                    interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, response && response.message ? response.message : utils.alertMsg.UMUpdateFailed));
                }
            };

            utils.GrpcCallback(req, res, client, "updateMobile", _callback, obj);

        }
        else {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMCodeError));
        }
    } else
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMMobileCantEmpty));
};


/**
 * 发送短信
 **/
exports.sendMessage = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    if (reqBody.mobile) {

        if (!localSession.checkMobileCode(req, reqBody.mobile)) {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMSendCodeAlready));
            return false;
        }
        var randomStr = Mock.mock('@string("number", 6)');


        var obj = {
            "mobile": reqBody.mobile,
            "templateId": config.mobileTemlpateId,
            "message": JSON.stringify({"code": randomStr}),
        };

        var client = GetClient(req);

        var _callback = function (err, response) {
            if (response && response.status == "success") {
                localSession.setMobileCode(req, reqBody.mobile, randomStr);

                interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, utils.alertMsg.LoginMobileSendSuccess));
            } else {
                interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.LoginMobileSendFailed));
            }
        };

        utils.GrpcCallback(req, res, client, "sendMsg", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.PassParamEmpty));
};