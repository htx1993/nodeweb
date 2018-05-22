var interfaceModel = require('../interfaceModel');
var config = require('../config');
var utils = require('../utils');
var grpcClient = require('../grpcClient');
var returnModel = require('./returnModel');

var Trans = function (obj) {
    return obj;
};

var GetClient = function (req) {

    return grpcClient.userClient(req);
};


//检查唯一性

/**
 * 校验邮件是否已经存在
 * email 邮箱
 **/
exports.isExistByEmail = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);

    var obj = {"email": queryInfo.email};

    var client = GetClient(req);

    var _callback = function (err, response) {
        utils.Response(response, res, interfaceModel, Trans);
    };

    utils.GrpcCallback(req, res, client, "uniCheckByEmail", _callback, obj);

};

/**
 * 校验手机号码是否已经存在
 * mobile 手机号码
 **/
exports.isExistByMobile = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);

    var obj = {"mobile": queryInfo.mobile};

    var client = GetClient(req);

    var _callback = function (err, response) {
        utils.Response(response, res, interfaceModel, Trans);
    };

    utils.GrpcCallback(req, res, client, "uniCheckByMobile", _callback, obj);
};

/**
 * 校验用户名是否已经存在
 * userName 用户名 需要转换成name
 **/
exports.isExistByName = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);

    var obj = {"name": queryInfo.userName};

    var client = GetClient(req);

    var _callback = function (err, response) {
        utils.Response(response, res, interfaceModel, Trans);
    };

    utils.GrpcCallback(req, res, client, "uniCheckByName", _callback, obj);
};


/**
 * 校验邮件是否已经存在
 * email 邮箱
 **/
exports.isExistByEmailForLogin = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);

    var obj = {"userId": queryInfo.userId, "email": queryInfo.email};

    var client = GetClient(req);

    var _callback = function (err, response) {
        utils.Response(response, res, interfaceModel, Trans);
    };

    utils.GrpcCallback(req, res, client, "uniCheckByEmailForLogin", _callback, obj);

};

/**
 * 校验手机号码是否已经存在
 * mobile 手机号码
 **/
exports.isExistByMobileForLogin = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);

    var obj = {"userId": queryInfo.userId, "mobile": queryInfo.mobile};

    var client = GetClient(req);

    var _callback = function (err, response) {
        utils.Response(response, res, interfaceModel, Trans);
    };

    utils.GrpcCallback(req, res, client, "uniCheckByMobileForLogin", _callback, obj);

};

/**
 * 校验用户名是否已经存在
 * userName 用户名 需要转换成name
 **/
exports.isExistByNameForLogin = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);

    var obj = {"userId": queryInfo.userId, "name": queryInfo.userName};

    var client = GetClient(req);

    var _callback = function (err, response) {
        utils.Response(response, res, interfaceModel, Trans);
    };

    utils.GrpcCallback(req, res, client, "uniCheckByNameForLogin", _callback, obj);

};

/**
 * 校验证件号码是否已经存在
 * idNo 证件号码
 **/
exports.isExistByIdNo = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (queryInfo && queryInfo.idNo == "111") {
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.EmptyParam));
    } else {
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true));
    }
};
