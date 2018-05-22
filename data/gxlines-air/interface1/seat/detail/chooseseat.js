var config = require('../../config');
var utils = require('../../utils');
var grpcClient = require('../../grpcClient');
var interfaceModel = require('../../interfaceModel');
var _ = require('underscore');

exports.chooseSeat = function (req, res, next) {

    var reqBody = interfaceModel.getParameter(req);
    if (!reqBody.shoppingCartId) {
        interfaceModel.sendJson(res, 400, '订单号不能为空');
        return;
    }

    var seatlist = [];

    if (reqBody.flightSegment && reqBody.flightSegment.length > 0) {
        for (var i = 0; i < reqBody.flightSegment.length; i++) {
            var flightItem = reqBody.flightSegment[i];
            if (flightItem.seatInfo && flightItem.seatInfo.length > 0) {
                _.each(flightItem.seatInfo, function (item) {
                    seatlist.push({
                        "travelerId": item.id,
                        "seatRef": item.ref,
                    })
                })
            }
        }
    }


    var obj = {
        shoppingCartId: reqBody.shoppingCartId,
        selectSeat: seatlist
    }

    var client = grpcClient.seatClient(req);


    var _callback = function (err, response) {
        utils.Response(response, res, interfaceModel);
    };

    utils.GrpcCallback(req, res, client, "seatMapPrice", _callback, obj);
}
;


exports.chooseMMBSeat = function (req, res, next) {

    var reqBody = interfaceModel.getParameter(req);
    if (!reqBody.orderCode) {
        interfaceModel.sendJson(res, 400, '订单号不能为空');
        return;
    }

    var seatlist = [];

    if (reqBody.flightSegment && reqBody.flightSegment.length > 0) {
        for (var i = 0; i < reqBody.flightSegment.length; i++) {
            var flightItem = reqBody.flightSegment[i];
            if (flightItem.seatInfo && flightItem.seatInfo.length > 0) {
                _.each(flightItem.seatInfo, function (item) {
                    seatlist.push({
                        "ancillaryPriceId": item.uri,
                        "travelerId": item.id,
                        "seatMapId": item.seatMapId,
                        "seatId": item.seatId
                    })
                })
            }
        }
    }


    var obj = {
        reservationCode: reqBody.orderCode,
        seats: seatlist
    }

    var client = grpcClient.seatClient(req);


    var _callback = function (err, response) {
        utils.Response(response, res, interfaceModel);
    };

    utils.GrpcCallback(req, res, client, "addSeatMap", _callback, obj);
}
;

var obj = {
    reservationCode: "",
    seats: [{
        "ancillaryPriceId": "",
        "travelerId": "",
        "seatMapId": "",
        "seatId": ""
    }, {
        "ancillaryPriceId": "",
        "travelerId": "",
        "seatMapId": "",
        "seatId": ""
    }]
}