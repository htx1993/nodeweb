var config = require('../../config');
var interfaceModel = require('../../interfaceModel');
var utils = require('../../utils');
var grpcClient = require('../../grpcClient');

exports.default = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    if (reqBody.orderCode) {
        var obj = {
            "reservationCode": reqBody.orderCode,
        };


        var client = grpcClient.RefundClient(req);

        var _callback = function (err, response) {

            if (!response)
                interfaceModel.sendJson(res, 200, {
                    "status": "failed",
                    "message": "取消订单失败，请稍后重试"
                });
            else
                interfaceModel.sendJson(res, 200, response);
        };

        utils.GrpcCallback(req, res, client, "cancelReservation", _callback, obj);
    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);

};