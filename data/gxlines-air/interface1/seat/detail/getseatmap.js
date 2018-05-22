var config = require('../../config');
var utils = require('../../utils');
var grpcClient = require('../../grpcClient');
var interfaceModel = require('../../interfaceModel');
var Trans = require('../../helper/TransSeatMap');

function getSeatMapInfo(req, res, next) {

    var reqBody = interfaceModel.getParameter(req);
    if (!reqBody.flightSegmentId) {
        interfaceModel.sendJson(res, 400, '航班id不能为空');
        return;
    }
    var obj = {
        "flightSegmentId": reqBody.flightSegmentId
    };

    var client = grpcClient.seatClient(req);


    var _callback = function (err, response) {
        utils.Response(response, res, interfaceModel, Trans);
    };

    utils.GrpcCallback(req, res, client, "getSeatMap", _callback, obj);

};

exports.default = getSeatMapInfo;