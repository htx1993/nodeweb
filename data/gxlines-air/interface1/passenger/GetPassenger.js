var interfaceModel = require('../interfaceModel');
var config = require('../config');
var utils = require('../utils');
var grpcClient = require('../grpcClient');
var localSession = require('../../../../data/session');
var _ = require('underscore');


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
        var passengerList = {"travellerList": [], "userInfo": localSession.getSessionUserInfo(req)};

        interfaceModel.sendJson(res, 200, passengerList);

        return;
    }

    var obj = {
        "userId": userId,
        "countryType": reqBody.countryType || 0,
        "pageNumber": 1,
        "pageSize": 50
    };

    var client = GetClient(req);

    var _callback = function (err, response) {
        var passengerList = {};
        if (response) {
            var passList = [];
            _.each(response.content, function (item) {

                var passItem = {
                        "id": item.id,
                        "userId": item.userId,
                        "countryType": item.countryType,
                        "passType": item.passType,
                        "firstName": item.firstName,
                        "lastName": item.lastName,
                        "name": item.lastName + item.firstName,
                        "sex": item.sex,
                        "birthday": item.birthday,
                        "idType": utils.GetIdStr(item.idType),
                        "idNo": item.idNo,
                        "mobile": item.mobile,
                        "phone": item.phone,
                        "email": item.email,
                        "country": item.country,
                        "cardIssueCountry": item.cardIssueCountry,
                        "cardValidDate": item.cardValidDate,
                        "createTime": null,
                        "updateTime": null,
                        "version": item.version,
                    }
                    ;
                passList.push(passItem)
            });
            passengerList = {"travellerList": passList, "userInfo": localSession.getSessionUserInfo(req)}
        } else
            passengerList = {"travellerList": [], "userInfo": localSession.getSessionUserInfo(req)};
        interfaceModel.sendJson(res, 200, passengerList);
    };

    utils.GrpcCallback(req, res, client, "findUserPassenger", _callback, obj);

};