var interfaceModel = require('../../interfaceModel');
var config = require('../../config');
var utils = require('../../utils');
var grpcClient = require('../../grpcClient');
var _ = require('underscore');
var path = require('path');
var _GXList = require(path.join(process.cwd(), 'data/common/flightCity.js')).flightCityList;

exports.default = function (req, res, next) {


    var reqBody = JSON.parse(interfaceModel.getParameter(req));
    var passengerCount = "";
    for (var i = 0; i < reqBody.guestTypes.length; i++) {
        var guestItem = reqBody.guestTypes[i];
        if (guestItem.amount > 0) {
            passengerCount += guestItem.code + ":" + guestItem.amount + ",";
        }
    }
    passengerCount = SubLastStr(passengerCount) || "ADT:1";

    var origin = "", destination = "", departureDate = "";
    var originDestinationList = [];
    if (reqBody.tripType == "MC") {
        for (var i = 0; i < reqBody.multiCityOptions.length; i++) {
            var item = reqBody.multiCityOptions[i];
            originDestinationList.push({
                "origin": item.originLocationCode,
                "destination": item.destinationLocationCode,
                "departureDate": item.departureDate,
            })
        }
    }
    else {
        origin = reqBody.outboundOption.originLocationCode;
        destination = reqBody.outboundOption.destinationLocationCode;
        departureDate = reqBody.outboundOption.departureDate;
        originDestinationList.push({
            "origin": origin,
            "destination": destination,
            "departureDate": departureDate,
        })
        if (reqBody.tripType == "RT")
            originDestinationList.push({
                "origin": destination,
                "destination": origin,
                "departureDate": reqBody.inboundOption.departureDate,
            })
    }

    if (!CheckFlightList(originDestinationList)) {
        interfaceModel.sendJson(res, 200, {"_errorMsg": "UnSafe Flight"});
        return;
    }

    var obj = {
        "originDestinations": originDestinationList,
        "passenger": passengerCount,
        "cabin": reqBody.cabinClass || "Economy",
        "flexible": true,
        "offset": 3
    };


    var client = grpcClient.searchflightInfoClient(req);

    var _callback = function (err, response) {

        //查询次数过多
        if (response && response.code == "0416") {
            interfaceModel.sendJson(res, 801, {"_errorMsg": "Too Many Search"});
            return;
        }

        if (!response || response.originDestinations.length == 0) {
            interfaceModel.sendJson(res, 200, {"_errorMsg": "No Flight Found"});
            return;
        }


        //如果lfs返回id，则记录
        if (response.id) {
            req.session.lfsusersessionid = response.id;
        }

        utils.Response(response, res, interfaceModel);
    };

    utils.GrpcCallback(req, res, client, "airLowFareSearch", _callback, obj);

};


function CheckFlightList(_flightList) {
    console.log("_flightList:" + JSON.stringify(_flightList));
    var filterList = [];
    _.each(_flightList, function (_flightItem) {
        var filterItem = _.filter(_GXList, function (_GXListItem) {
            return (_GXListItem.original == _flightItem.origin && _GXListItem.destination == _flightItem.destination) || (_GXListItem.original == _flightItem.destination && _GXListItem.destination == _flightItem.origin);
        });

        if (filterItem.length > 0) {
            filterList.push(filterItem[0]);
        }
    });

    console.log("filterList:" + JSON.stringify(filterList));

    return filterList.length > 0;
};

function SubLastStr(str) {
    return str.substring(0, str.length - 1);
}