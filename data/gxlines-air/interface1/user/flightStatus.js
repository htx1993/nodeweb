var interfaceModel = require('../interfaceModel');
var config = require('../config');
var utils = require('../utils');
var grpcClient = require('../grpcClient');
var _ = require('underscore');


exports.getFlightStatusList = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);

    var obj = {
        "flightNo": queryInfo.flightNo ? queryInfo.flightNo.toLowerCase().replace(config.companyAbbCode.toLowerCase(), '') : "",
        "startCityCode": queryInfo.depCode || "",
        "destCityCode": queryInfo.arrCode || "",
        "date": queryInfo.date,
    };

    var client = grpcClient.userClient(req);

    var _callback = function (err, response) {

        if (!response)
            response = {"data": []}
        utils.Response(response, res, interfaceModel);
    };

    if (/^[0-9]*$/.test(queryInfo.date)) {
        obj.date = parseInt(queryInfo.date);
        utils.GrpcCallback(req, res, client, "scheduledFlight", _callback, obj);
    } else
        utils.GrpcCallback(req, res, client, "flightDetail", _callback, obj);

};
