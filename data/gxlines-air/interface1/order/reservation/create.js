var config = require('../../config');
var interfaceModel = require('../../interfaceModel');
var utils = require('../../utils');
var grpcClient = require('../../grpcClient');

exports.default = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    if (reqBody.shoppingCartId) {
        var obj = {
            "shoppingCartId": reqBody.shoppingCartId,
        };

        var client = grpcClient.reservationCreateClient(req);

        var _callback = function (err, response) {
            utils.Response(response, res, interfaceModel);
        };

        utils.GrpcCallback(req, res, client, "createReservation", _callback, obj);
    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);

};