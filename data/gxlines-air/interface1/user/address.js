var interfaceModel = require('../interfaceModel');
var config = require('../config');
var utils = require('../utils');
var grpcClient = require('../grpcClient');
var Trans = function (obj) {
    return obj;
};

var GetClient = function (req) {
    return grpcClient.userClient(req);
};

//获取邮寄地址列表
/**
 * 查询邮寄地址
 * user_id 用户id
 * pageIndex 当前页序号
 * pageSize 每一页记录的数量
 **/
exports.GetAddressList = function (req, res, next) {
    var userId = utils.GetUserID(req);
    if (!userId) {
        interfaceModel.sendJson(res, 400, "查询地址失败");
        return;
    }

    var obj = {
        "userId": userId,
        //"languageCode": config.languageCode
    };

    var client = GetClient(req);

    var _callback = function (err, response) {
        var addressList = {};
        if (response) {
            addressList = {
                data: response.content,
                pageCount: response.totalPages,
                pageCurrent: response.number,
                pageSize: response.size,
                total: response.totalElements
            }
        }
        else
            addressList = {
                data: [],
                pageCount: 0,
                pageCurrent: 1,
                pageSize: 5,
                total: 0
            };
        utils.Response(addressList, res, interfaceModel, Trans);
    };

    utils.GrpcCallback(req, res, client, "findMailAddresses", _callback, obj);

};


/**
 * 修改邮寄地址
 * user_id 用户id
 * id 该邮寄地址的id
 * receiveName 收件人姓名
 * province 省份
 * city 市区
 * county 县区
 * address 详细地址
 * postCode 邮编
 * mobile 手机号码
 * phone 固定电话
 * email 邮箱
 **/
exports.updateMailAddress = function (req, res, next) {

    var reqBody = interfaceModel.getParameter(req);
    var userId = utils.GetUserID(req);
    if (!userId) {
        interfaceModel.sendJson(res, 400, "修改地址失败");
        return;
    }

    var obj = {
        "userId": userId,
        "id": reqBody.id,
        "receiveName": reqBody.receiveName,
        "province": reqBody.province,
        "city": reqBody.city,
        "county": reqBody.county,
        "address": reqBody.address,
        "mobile": reqBody.mobile,
        "phone": reqBody.phone,
        "postCode": reqBody.postCode,
        "email": reqBody.email,
        //"languageCode": config.languageCode
    };
    var client = GetClient(req);


    var _callback = function (err, response) {
        utils.Response(response, res, interfaceModel, Trans);
    };

    utils.GrpcCallback(req, res, client, "updateMailAddress", _callback, obj);

};

/**
 * 新增邮寄地址
 * 参数同上面的修改接口
 **/
exports.addMailAddress = function (req, res, next) {

    var reqBody = interfaceModel.getParameter(req);
    var userId = utils.GetUserID(req);
    if (!userId) {
        interfaceModel.sendJson(res, 400, "添加地址失败");
        return;
    }

    var obj = {
        "userId": userId,
        "receiveName": reqBody.receiveName,
        "province": reqBody.province,
        "city": reqBody.city,
        "county": reqBody.county,
        "address": reqBody.address,
        "mobile": reqBody.mobile,
        "phone": reqBody.phone,
        "postCode": reqBody.postCode,
        "email": reqBody.email,
        //"languageCode": config.languageCode
    };

    var client = GetClient(req);


    var _callback = function (err, response) {
        utils.Response(response, res, interfaceModel, Trans);
    };

    utils.GrpcCallback(req, res, client, "addMailAddress", _callback, obj);

};

/**
 * 删除邮寄地址
 * user_id 用户id
 * id 该邮寄地址id
 **/
exports.deleteMailAddress = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    if (reqBody.id) {

        var obj = {"id": reqBody.id};
        var client = GetClient(req);

        var _callback = function (err, response) {
            utils.Response(response, res, interfaceModel, Trans);
        };

        utils.GrpcCallback(req, res, client, "deleteMailAddress", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);
};
