'use strict';
var Mock = require("mockjs");
var express = require('express');
var router = express.Router();
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var until = require(path.join(process.cwd(), 'data/tools/until'));
var moment = require(path.join(process.cwd(), 'data/tools/moment'));
var localSession = require(path.join(process.cwd(), 'data/session'));

var flightInfo = require(path.join(process.cwd(), 'data/' + config.company + '/interface/flight/flightInfo'));
var shoppingCartInfo = require(path.join(process.cwd(), 'data/' + config.company + '/interface/shoppingCart/data'));

var Random = Mock.Random;
var _sInfo = {};


//查询航班
function searchFlightInfo(req, res, next) {
    var queryInfo = JSON.parse(interfaceModel.getParameter(req));
    console.log(queryInfo);
    _sInfo = queryInfo;
    localSession.setFlightSearchInfo(req, _sInfo);
    console.log("======================searchFlightInfo=====start==================");
    console.log(_sInfo);
    console.log("======================searchFlightInfo=======end================");
    var flightData = until.cloneObj(flightInfo.flightInfo);
    if (_sInfo.tripType == "OW") {
        flightData.originDestinations.length = 1;
    } else if (_sInfo.tripType == "RT") {
        flightData.originDestinations.length = 2;
    } else if (_sInfo.tripType == "MC") {
        flightData.originDestinations.length = _sInfo.multiCityOptions.length;
    }
    (flightData.originDestinations || []).forEach(function (item, index) {
        if (_sInfo.tripType != "MC") {
            if (index == 0) {
                item.origin = _sInfo.outboundOption.originLocationCode;
                item.destination = _sInfo.outboundOption.destinationLocationCode;
                item.departureDate = _sInfo.outboundOption.departureDate;
            }
            if (index == 1) {
                item.origin = _sInfo.outboundOption.destinationLocationCode;
                item.destination = _sInfo.outboundOption.originLocationCode;
                item.departureDate = _sInfo.inboundOption.departureDate;
            }
        } else {
            item.origin = _sInfo.multiCityOptions[index].destinationLocationCode;
            item.destination = _sInfo.multiCityOptions[index].originLocationCode;
            item.departureDate = _sInfo.multiCityOptions[index].departureDate;
        }

        ((item || {}).departureDates || []).forEach(function (subItem, subIndex) {
            var m = moment(item.departureDate);
            subItem.date = m.add(subIndex - 3, 'days').format("YYYY-MM-DD");
        });

        ((item || {}).airItineraries || []).forEach(function (o) {
            var flightSegments = o.flightSegments;
            var len = flightSegments.length;
            flightSegments[0].departureAirportCode = item.origin;
            flightSegments[0].departureDate = item.departureDate;
            flightSegments[len - 1].arrivalAirportCode = item.destination;
            flightSegments[len - 1].arrivalDate = item.departureDate;
        });
    });

    interfaceModel.sendJson(res, 200, flightData);

};
//查询优惠价格日历
function flexibleFlightInfo(req, res, next) {
    var queryInfo = JSON.parse(interfaceModel.getParameter(req));
    interfaceModel.sendJson(res, 200, getFlightList(queryInfo.tripType, queryInfo.multiCityOptions.length || 1, queryInfo.outboundOption.departureDate));

};
//选择航班产品
function selectFareFamilyCode(req, res, next) {
    interfaceModel.sendJson(res, 200, shoppingCartInfo.shoppingCartInfo);
    // interfaceModel.sendJson(res, 200, {message: "当前价格已被预订，请重新搜索选择最新机票价格！"});
};
//获取航班明细
function getFlightDetails(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var flightDetail = flightInfo.flightDetail;
    var len = (flightDetail.flightLeg || []).length;
    flightDetail.flightLeg[0].departureAirport = queryInfo.departureAirport;
    flightDetail.flightLeg[len - 1].arrivalAirport = queryInfo.arrivalAirport;
    interfaceModel.sendJson(res, 200, flightDetail);
};

function airCommendLine(req, res, next) {
    var arr = [];
    var today = moment();
    for(var a=0;a<6;a++){
        arr.push(today.add(6, 'days').format("YYYY-MM-DD"));
    }

    var obj = Mock.mock({
        "status": "SUCCESS",
        "code": "",
        "citys": [{"city": "CKG"}],
        "data|20": [
            {
                "org|1": ["CKG","TSN","SYX","XIY"],
                "dst|1": ["INC","HET","TXN","CGO"],
                "flightNo": "GS7966",
                "date|1": arr,
                "amount|+6": 300,
                "basePrice|+9": 300,
                "discount": 0.36,
                "currency": "CNY",
                "expire": "1502072376259"
            }
        ]
    });
    interfaceModel.sendJson(res, 200, obj);
}

function getPriceTrend(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    console.log("================getPriceTrend======start==================");
    console.log(queryInfo);
    console.log("================getPriceTrend======end==================");
    var priceInfo = flightInfo.priceInfo;
    var priceArr = [];
    (queryInfo.query || []).forEach(function (item, index) {
        item.fares = priceInfo.fares;
        (item.fares || []).forEach(function (subItem, subIndex) {
            var m = moment(queryInfo.startDate);
            subItem.date = m.add(subIndex, 'days').format("YYYY-MM-DD");
        });
        priceArr.push(item);
    });
    interfaceModel.sendJson(res, 200, priceArr);
}


router.post('/searchFlightInfo', searchFlightInfo);
router.post('/flexibleFlightInfo', flexibleFlightInfo);
router.post('/selectFareFamilyCode', selectFareFamilyCode);
router.post('/getFlightDetails', getFlightDetails);
router.post('/aircommendline', airCommendLine);
router.post('/getPriceTrend', getPriceTrend);

module.exports = router;