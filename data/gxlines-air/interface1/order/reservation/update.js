var config = require('../../config');
var interfaceModel = require('../../interfaceModel');
var Trans = require('../../helper/TransReservation');
var utils = require('../../utils');
var grpcClient = require('../../grpcClient');

exports.default = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    if (reqBody.reservationCode && reqBody.userSessionId) {
        var obj = {
            "reservationKey": reqBody.reservationCode
        };

        var client = grpcClient.reservationClient(req);

        var _callback = function (err, response) {
            utils.Response(response, res, interfaceModel, Trans);
        };

        utils.GrpcCallback(req, res, client, "updateReservation", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);

};