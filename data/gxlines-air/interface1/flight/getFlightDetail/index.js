var interfaceModel = require('../../interfaceModel');
var config = require('../../config');
var utils = require('../../utils');
var grpcClient = require('../../grpcClient');


exports.default = function (req, res, next) {

    var reqBody = interfaceModel.getParameter(req);
    if (!reqBody.flightNumber) {
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);
        return;
    }
    var obj = {
        "flightNumber": reqBody.flightNumber,
        "marketingAirline": reqBody.marketingAirline,
        "departureDate": reqBody.departureDate,
        "departureAirport": reqBody.departureAirport,
        "arrivalAirport": reqBody.arrivalAirport,
    };

    var client = grpcClient.flightDetailClient(req);

    var _callback = function (err, response) {
        if (!response) {
            interfaceModel.sendJson(res, 200, {
                "flightNumber": "",
                "flightDuration": "",
                "groundDuration": "",
                "tripDuration": "",
                "AirlineCode": "",
                "flightLeg": []
            });
            return;
        }
        utils.Response(response.data, res, interfaceModel);
    }

    utils.GrpcCallback(req, res, client, "flightDetail", _callback, obj);

};