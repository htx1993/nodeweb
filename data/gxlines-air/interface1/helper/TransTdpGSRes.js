var _ = require('underscore');
var _moment = require('../../../tools/moment')

module.exports = function (TdpResBody) {

    var odgroupVoList = [];
    for (var i = 0; i < TdpResBody.originDestinations.length; i++) {
        var originData = TdpResBody.originDestinations[i];
        odgroupVoList.push(GetAirLineInfo(originData));
    }

    return {
        "inputItinerarieIds": [],
        "odGroupsVo": {
            "odgroupVoList": odgroupVoList,
            "odgroupVoListAlternateMap": {}
        },
        "tripType": TdpResBody.criteria.roundtrip ? "RT" : "OW",
        "currentAlternateFlag": "original",
        "flightCartVo": {"discounts": [], "flightVoList": [], "guestPriceList": [], "insurances": [], "taxAndFee": []},
        "code": "success",
        "userSessionId": TdpResBody.id,
        "lowFareSearchId": TdpResBody.id
    };

};

function GetAirLineInfo(originData) {
    //航班日历
    var calendarList = originData.departureDates;

    var calendarViewVoList = [];

    for (var i = 0; i < calendarList.length; i++) {
        var item = calendarList[i];
        var calendarItem = {
            "basePrice": item.minPrice,
            "currency": item.currency,
            "date": _moment(item.date).format('YYYY-MM-DD'),
            "flightNo": "",
            "price": item.minPrice
        };
        calendarViewVoList.push(calendarItem);
    }

    //去程航班列表
    var airLineLst = [];

    for (var i = 0; i < originData.airItineraries.length; i++) {

        var item = originData.airItineraries[i];

        var itemItinerary = item.flightSegments;

        var itemAirList = [];

        for (var j = 0; j < itemItinerary.length; j++) {
            var itinerary = itemItinerary[j];
            var itemItiner = {
                "airEquipType": itinerary.aircraftCode,
                "amountOfStops": itinerary.stopQuantity,
                "arrivalAirport": itinerary.arrivalAirportName,
                "arrivalAirportLocationCode": itinerary.arrivalAirportCode,
                "arrivalTime": itinerary.arrivalTime,
                "departureAirport": itinerary.departureAirportName,
                "departureAirportLocationCode": itinerary.departureAirportCode,
                "departureTime": itinerary.departureTime,
                "flightNumber": itinerary.flightNumber,
                "hasMeal": false,
                "marketingAirlineCode": itinerary.marketingAirlineCode,
                "duration": itinerary.duration,
                "stopCityList": itinerary.stopCitys,
                "layover": itinerary.layover
            };
            itemAirList.push(itemItiner);
        }

        var airLineItem = {
            "arrivalOffset": item.arrivalOffset,
            "duration": item.duration,
            "flightSegmentVoList": itemAirList,
            "id": item.id,
        };

        var itemItineraryPrice = item.airItineraryPrices;
        var airList = [];

        for (var k = 0; k < itemItineraryPrice.length; k++) {

            var travelerPrice = _.filter(itemItineraryPrice[k].travelerPrices, function (priceItem) {
                return priceItem.travelerType == "ADT"
            });

            var _benefits = [];

            _.each(itemItineraryPrice[k].benefits, function (item) {
                _benefits.push({
                    code: item.code,
                    id: item.id,
                    longDescription: "",
                    name: item.name,
                    shortDescription: item.text
                })
            })

            var airPriceObj = {
                "amount": travelerPrice[0].farePrices[0].baseFare,

                "desigCode": travelerPrice[0].farePrices[0].bookingClass,
                "desigQuantity": travelerPrice[0].farePrices[0].inventoryQuantity,
                "discount": "10",
                "fareFamilyCode": itemItineraryPrice[k].fareFamilyCode,
                "fareFamilyName": itemItineraryPrice[k].fareFamilyName,
                "hasMeal": [false],
                "TdpPriceId": itemItineraryPrice[k].id,
                //退改签价格暂时写死
                "refundChange": {
                    "afterChange": {"allowed": false, "amount": 0},
                    "afterRefund": {"allowed": false, "amount": 0},
                    "beforeChange": {"allowed": false, "amount": 0},
                    "beforeRefund": {"allowed": true, "amount": 0, "currency": "CNY"}
                },
                "benefit": _benefits,
                "retPoint": "0"
            };

            airList.push({
                "code": itemItineraryPrice[k].fareFamilyCode,
                "data": airPriceObj
            });
        }


        airLineLst.push({
            "flightItineraryVoList": airList,
            "flightVo": airLineItem
        });
    }

    return {
        "activeDate": originData.date,
        "calendarViewVoList": calendarViewVoList,
        "destinationCode": originData.destination,
        "destinationName": originData.destinationName,
        "flightGroupVoList": airLineLst,
        "originCode": originData.origin,
        "originName": originData.originName,
    };

}
;

