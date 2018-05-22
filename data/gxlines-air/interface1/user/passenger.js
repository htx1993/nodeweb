var interfaceModel = require('../interfaceModel');
var config = require('../config');
var utils = require('../utils');
var grpcClient = require('../grpcClient');
var _ = require('underscore');

var Trans = function (obj) {
    return obj;
};

var GetClient = function (req) {

    return grpcClient.userClient(req);
};

/**
 * 查询乘机人列表
 * user_id 用户id
 * countryType 乘机人类型 0 1
 * pageIndex 当前页序号
 * pageSize 每一页记录的数量
 **/
exports.GetPassengerList = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    var userId = utils.GetUserID(req);
    if (!userId) {
        var passengerList = {
            data: [],
            pageCount: 0,
            pageCurrent: 1,
            pageSize: 5,
            total: 0
        };
        utils.Response(passengerList, res, interfaceModel, Trans);
        return;
    }

    if (reqBody.countryType) {

        var obj = {
            "userId": userId,
            "countryType": parseInt(reqBody.countryType),
            "pageNumber": parseInt(reqBody.pageIndex) == 0 ? parseInt(reqBody.pageIndex) + 1 : parseInt(reqBody.pageIndex),
            "pageSize": reqBody.pageSize,
           //"languageCode": config.languageCode
        };

        var client = GetClient(req);

        console.log('GetPassengerList:' + JSON.stringify(obj));

        var _callback = function (err, response) {
            console.log("GetPassengerRes:" + JSON.stringify(response));
            var passengerList = {};
            if (response) {
                _.each(response.content, function (item) {
                    // item.idType = utils.GetIdStr(item.idType)
                });
                passengerList = {
                    data: response.content,
                    pageCount: response.totalPages,
                    pageCurrent: response.number,
                    pageSize: response.size,
                    total: response.totalElements
                };
            } else
                passengerList = {
                    data: [],
                    pageCount: 0,
                    pageCurrent: 1,
                    pageSize: 5,
                    total: 0
                };
            utils.Response(passengerList, res, interfaceModel, Trans);
        };

        utils.GrpcCallback(req, res, client, "findUserPassenger", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);
};

/**
 * 修改乘机人
 * 国内乘机人
 *  * user_id 用户id
 * id 该乘机人id
 * countryType 0 国内乘机人 1国际乘机人
 * lastName
 * lastName
 * idType
 * idNo
 * birthday
 * mobile
 * phone
 * email
 *
 * 国际乘机人
 *  * user_id 用户id
 * id 该乘机人id
 * countryType 0 国内乘机人 1国际乘机人
 * lastName
 * lastName
 * sex
 * birthday
 * passType
 * country 国籍
 * cardIssueCountry 护照签发国
 * cardNo 护照号码
 * cardValidDate 护照有效期
 **/
exports.updatepassenger = function (req, res, next) {

    var reqBody = interfaceModel.getParameter(req);
    console.log(JSON.stringify(reqBody));
    var userId = utils.GetUserID(req);
    if (!userId) {
        interfaceModel.sendJson(res, 400, utils.alertMsg.UMUpdateFailed);
        return;
    }

    var obj = {
        "id": reqBody.id,
        "userId": userId,
        "countryType": parseInt(reqBody.countryType),
        "passType": reqBody.passType,
        "firstName": reqBody.firstName,
        "lastName": reqBody.lastName,
        "idType": utils.GetIdType(reqBody.idType),
        "idNo": reqBody.idNo,
        "sex": reqBody.sex == "M" ? 0 : 1,
        "birthday": reqBody.birthday,
        "mobile": reqBody.mobile,
        "phone": reqBody.phone,
        "email": reqBody.email,
        "country": reqBody.country,
        "cardIssueCountry": reqBody.cardIssueCountry,
        "cardValidDate": reqBody.cardValidDate,
        "version": reqBody.version,
       //"languageCode": config.languageCode
    };

    console.log('updatepassenger：' + JSON.stringify(obj));

    var client = GetClient(req);

    var _callback = function (err, response) {
        utils.Response(response, res, interfaceModel, Trans);
    };

    utils.GrpcCallback(req, res, client, "updateUserPassenger", _callback, obj);
};
/**
 * 新增乘机人
 **/
exports.addpassenger = function (req, res, next) {

    var reqBody = interfaceModel.getParameter(req);
    console.log(JSON.stringify(reqBody));
    var userId = utils.GetUserID(req);
    if (!userId) {
        interfaceModel.sendJson(res, 400, utils.alertMsg.UMAddFailed);
        return;
    }
    var obj = {
        "userId": userId,
        "countryType": parseInt(reqBody.countryType),
        "passType": reqBody.passType || "ADT",
        "firstName": reqBody.firstName,
        "lastName": reqBody.lastName,
        "idType": utils.GetIdType(reqBody.idType),
        "idNo": reqBody.idNo,
        "sex": reqBody.sex == "M" ? 0 : 1,
        "birthday": reqBody.birthday,
        "mobile": reqBody.mobile,
        "phone": reqBody.phone,
        "email": reqBody.email,
        "country": reqBody.country || "",
        "cardIssueCountry": reqBody.cardIssueCountry || "",
        "cardValidDate": reqBody.cardValidDate || "",
       //"languageCode": config.languageCode
    };

    console.log('addPassenger：' + JSON.stringify(obj));

    var client = GetClient(req);

    var _callback = function (err, response) {
        utils.Response(response, res, interfaceModel, Trans);
    };

    utils.GrpcCallback(req, res, client, "addUserPassenger", _callback, obj);

};
/**
 * 删除乘机人
 **/
exports.deletepassenger = function (req, res, next) {

    var reqBody = interfaceModel.getParameter(req);

    if (reqBody.id) {

        var obj = {
            "id": reqBody.id
        };
        var client = GetClient(req);

        var _callback = function (err, response) {
            utils.Response(response, res, interfaceModel, Trans);
        };

        utils.GrpcCallback(req, res, client, "deleteUserPassenger", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);
};