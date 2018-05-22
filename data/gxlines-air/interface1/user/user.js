var interfaceModel = require('../interfaceModel');
var returnModel = require('./returnModel');
var config = require('../config');
var utils = require('../utils');
var grpcClient = require('../grpcClient');
var localSession = require('../../../../data/session');

var GetClient = function (req) {

    return grpcClient.userClient(req);
};

/**
 * 注册用户
 * userName 用户名转 需要换成name
 * password
 * lastName
 * firstName
 * sex
 * idType
 * idNo
 * birthday
 * mobile
 * phone
 * email
 * question
 * answer
 **/
exports.registerUser = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    var mmvResult = localSession.judgeMMVResult(req, reqBody.mmvCode);
    if (mmvResult) {
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, mmvResult));
        return;
    }


    var checkcode = localSession.getMobileCode(req, reqBody.mobile);
    if (!checkcode) {
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMCodeFailed));
        return;
    }
    if (checkcode != reqBody.valiCode) {
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMCodeError));
        return;
    }

    var obj = {
        "name": reqBody.userName,
        "lastName": reqBody.lastName,
        "firstName": reqBody.firstName,
        "password": utils.uncompile(reqBody.password),
        "email": reqBody.email,
        "sex": reqBody.sex == "M" ? 0 : 1,
        "birthday": reqBody.birthday,
        "idType": utils.GetIdType(reqBody.idType),
        "idNo": reqBody.idNo,
        "phone": reqBody.phone || "",
        "question": reqBody.question,
        "answer": reqBody.answer,
        "mobile": reqBody.mobile
    };


    var client = GetClient(req);


    var _callback = function (err, response) {
        utils.Response(response, res, interfaceModel);
    };

    utils.GrpcCallback(req, res, client, "registerUser", _callback, obj);

};

/**
 * 获取用户信息
 * id  用户id
 * */
exports.getUserInfo = function (req, res, next) {
    var userId = utils.GetUserID(req);
    if (!userId) {
        interfaceModel.sendJson(res, 400, utils.alertMsg.UMNeedLogin);
        return;
    }
    var obj = {
        "userId": userId,
    };


    var client = GetClient(req);

    var _callback = function (err, response) {
        if (response) {
            response.data.idType = utils.GetIdStr(response.data.idType);
            response.data.answer = response.data.answer || "";
            response.data.userName = response.data.name;
            response.data.isEmailBind = response.data.emailBind ? "R" : "UR";
            response.data.isRegister = response.data.name ? "Y" : "N";
            utils.Response(response, res, interfaceModel);

        }
        else
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.PassGetUserFailed));
    };

    utils.GrpcCallback(req, res, client, "getUserInfoById", _callback, obj);

};


/**
 * 修改用户信息
 * id  用户id
 * userName 用户名 需要转换成name
 * lastName
 * firstName
 * sex
 * idType
 * idNo
 * birthday
 * mobile
 * phone
 * email
 * */
exports.updateUserInfo = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    var userId = utils.GetUserID(req);
    if (!userId) {
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMUpdateFailed));
        return;
    }

    //如果手机号为空，需要进行短信校验
    var userSession = localSession.getSessionUserInfo(req);
    if (!userSession.mobile) {
        if (!reqBody.mmvCode || !reqBody.valiCode) {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMUpdateFailed));
            return;
        }

        //验证图片验证
        var mmvResult = localSession.judgeMMVResult(req, reqBody.mmvCode);
        if (mmvResult) {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, mmvResult));
            return;
        }

        //验证手机验证码
        var checkcode = localSession.getMobileCode(req, reqBody.mobile);
        if (!checkcode) {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMCodeFailed));
            return;
        }
        if (checkcode != reqBody.valiCode) {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMCodeError));
            return;
        }
    }

    var obj = {
        "id": userId,
        "name": reqBody.userName,
        "lastName": reqBody.lastName,
        "firstName": reqBody.firstName,
        "password": utils.uncompile(reqBody.password),
        "email": reqBody.email,
        "sex": reqBody.sex == "M" ? 0 : 1,
        "birthday": reqBody.birthday,

        "idType": utils.GetIdType(reqBody.idType),
        "idNo": reqBody.idNo,


        "mobile": reqBody.mobile,

        "question": reqBody.question,
        "answer": reqBody.answer,
        "phone": reqBody.phone,
    };

    var client = GetClient(req);

    var _callback = function (err, response) {

        if (response && response.status == "success") {
            var userSession = localSession.getSessionUserInfo(req)
            obj.userId = userSession.userId;
            obj.userSessionId = userSession.userSessionId;
            obj.profileId = userSession.profileId;
            localSession.setSessionUserInfo(req, obj);
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, utils.alertMsg.UMUpdateSuccess));
        }
        else
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, response && response.message ? response.message : utils.alertMsg.UMUpdateFailed));
    };

    utils.GrpcCallback(req, res, client, "saveUserInfo", _callback, obj);
};

/**
 * 绑定用户手机号码
 * id  用户id
 * mobile
 * */
exports.bindMobile = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (queryInfo.mobile && queryInfo.valiCode && queryInfo.id) {

        var obj = {
            "mobile": queryInfo.mobile,
            "mobileCode": queryInfo.valiCode,
            "userId": parseInt(queryInfo.id)
        };


        var client = grpcClient.userClient(req);

        var _callback = function (err, response) {

            if (response && response.status == "success") {
                localSession.setSessionUserInfo(req, response.data);
                interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, "手机号码绑定成功"));
            } else {
                interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, response && response.message ? response.message : "手机号码绑定失败"));

            }
        };

        utils.GrpcCallback(req, res, client, "thirdPartysBindMobile", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.EmptyParam));

};