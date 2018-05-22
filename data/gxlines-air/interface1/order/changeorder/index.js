var config = require('../../config');
var interfaceModel = require('../../interfaceModel');
var Trans = require('../../helper/TransChangeOrder');
var utils = require('../../utils');
var grpcClient = require('../../grpcClient');
var Mock = require("mockjs");
var _ = require('underscore');

Mock.Random.extend({
    passTypes: ['ADT', 'CNN', 'INF'],
    passType: function (date) {
        return this.pick(this.passTypes)
    }
});
Mock.Random.passType();

/**
 * 获取升舱改期之前的航班信息
 * orderCode 订单号
 * flightNumber 航班号
 **/
exports.getChangeOrderInfoBefore = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    var orderNo = reqBody.orderCode;

    if (orderNo) {
        var obj = {
            "reservationCode": orderNo,
        };

        var client = grpcClient.reservationRetrieve(req);


        var _callback = function (err, response) {
            if (!response) {
                interfaceModel.sendJson(res, 400, utils.alertMsg.NoResponse);
                return;
            }
            if (response.status !== "success") {
                interfaceModel.sendJson(res, 200, {
                    status: "failed",
                    message: response.message,
                });
                return;
            }

            var orderDetail = Trans.search(response);

            interfaceModel.sendJson(res, 200, orderDetail);

        };

        utils.GrpcCallback(req, res, client, "reservationRetrieve", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);
}

/**
 * 获取改期之后的新航班信息
 **/
exports.getChangeOrderInfoAfter = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    var targetList = [];

    _.each(reqBody.changelist, function (item) {
        if (item.flightid && item.target) {
            var changeitem = {
                "originDestinationId": item.flightid,
                "origin": item.target.originCode,
                "destination": item.target.destinationCode,
                "departureDate": item.target.originDate
            };

            targetList.push(changeitem)
        }
    });
    var obj = {
        "itemId": reqBody.itemid,
        "originDestinationChanges": targetList
    };

    var client = grpcClient.airChangeClient(req);

    var _callback = function (err, response) {
        if (response && response.changeItinerary && response.changeItinerary.length == 0) {
            interfaceModel.sendJson(res, 200, {status: "failed", message: utils.alertMsg.NoPriceFound});
            return;
        }

        utils.Response(response, res, interfaceModel, Trans.search2);
    };

    utils.GrpcCallback(req, res, client, "changeSearch", _callback, obj);
};


/**
 * 修改选择的舱位信息
 **/
exports.calculatedPrice = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    var targetList = [];

    _.each(reqBody.changelist, function (item) {
        if (item.flightid && item.flightid != "--" && item.itineraryPriceId) {
            var changeitem = {
                "sourceUri": item.flightid,
                "targetUri": item.itineraryPriceId
            };
            targetList.push(changeitem)
        } else {
            var changeitem = {
                "sourceUri": "#",
                "targetUri": item.itineraryPriceId
            };

            targetList.push(changeitem)
        }
    });

    var obj = {
        "itemUri": reqBody.itemid,
        "originDestinationChange": targetList
    };

    var client = grpcClient.airChangeClient(req);

    var _callback = function (err, response) {
        if (response && response.status == "success") {
            var result = {
                "status": "success",
                "airChangePrice": {
                    "change": {
                        "id": response.changeSetUri,
                        "type": "CHANGE",
                        "totalSupplementaryFare": response.totalPayNowValue,
                        "totalChangeFare": response.totalServiceChargeValue
                    }
                }
            }

            utils.Response(result, res, interfaceModel);
        }
        else {
            interfaceModel.sendJson(res, 200, {"status": "failed", message: utils.alertMsg.NoPriceFound});
        }

    };

    utils.GrpcCallback(req, res, client, "changePrice", _callback, obj);

};


/**
 * 修改选择的舱位信息
 **/
exports.updateShipSpaceInfo = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);
    var obj = {
        "reservationCode": reqBody.orderCode,
        "changeSetRef": [reqBody.changeid]
    };

    var client = grpcClient.airChangeClient(req);

    var _callback = function (err, response) {
        // if (response && response.status == "success") {
        //     utils.Response({"url": "success"}, res, interfaceModel);
        // }
        // else
        //     utils.Response(response, res, interfaceModel);

        utils.Response(response, res, interfaceModel);
    };

    utils.GrpcCallback(req, res, client, "changeSet", _callback, obj);

};



