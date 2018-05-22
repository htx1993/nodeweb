var config = require('../../config');
var interfaceModel = require('../../interfaceModel');
var utils = require('../../utils');
var grpcClient = require('../../grpcClient');
var trans = require('../../helper/TransSeatFlightInfo')

exports.getFlightInfo = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);


    if (reqBody.shoppingCartId) {

        var obj = {
            "shoppingCartId": reqBody.shoppingCartId,
        };

        var client = grpcClient.shopcartClient(req);

        var _callback = function (err, response) {
            if (!response) {
                interfaceModel.sendJson(res, 200, {});
                return;
            }
            interfaceModel.sendJson(res, 200, trans.shopcart(response.shoppingCart));
        };

        utils.GrpcCallback(req, res, client, "getShoppingCart", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);

};


exports.getMMBFlightInfo = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    var orderCode = reqBody.orderCode;

    if (orderCode) {
        var obj = {
            "reservationCode": orderCode
        };

        var client = grpcClient.reservationRetrieve(req);


        var _callback = function (err, response) {
            if (!response) {
                interfaceModel.sendJson(res, 400, utils.alertMsg.NoResponse);
                return;
            }

            interfaceModel.sendJson(res, 200, trans.reservation(response.reservation));

        };

        utils.GrpcCallback(req, res, client, "reservationRetrieve", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);

};
