var _ = require('underscore');
var utils = require('../utils');
var moment = require('moment');

exports.search = function (TdpResBody) {

    var resveration = TdpResBody.reservation;
    var passengerList = [];
    var flightList = [];
    var odidlist = [];

    for (var i = 0; i < resveration.travelers.length; i++) {

        var traveler = resveration.travelers[i];

        var travelerinfo = {
            "name": traveler.lastName + traveler.firstName,
            "lastName": traveler.lastName,
            "firstName": traveler.firstName,
            "idType": traveler.idNoType,
            "idNo": traveler.idNo,
            "passType": traveler.type,
            "ticketType": "电子客票",
            "birthday": traveler.dateOfBirth,
            "cardNo": "",//常旅客卡号
            "sysNo": ""//系统编号
        };

        passengerList.push(travelerinfo);

    }

    var flightSegments = resveration.travelers[0].flightSegments
    if (flightSegments.length > 0) {

        for (var j = 0; j < flightSegments.length; j++) {
            var item = flightSegments[j];
            if (odidlist.indexOf(item.originDestinationUri) > -1 || item.status !== "BOOKED") {
                continue;
            }


            var travelerPrice = [];
            for (var i = 0; i < resveration.travelers.length; i++) {

                var traveler = resveration.travelers[i];
                var flightPrice = _.filter(traveler.flightSegments, function (itemFlight) {
                    return itemFlight.id == item.id && itemFlight.status == "BOOKED"
                });

                var travelerPriceList = _.filter(travelerPrice, function (item) {
                    return item.travelerType == traveler.type
                })

                if (travelerPriceList.length > 0) {
                    continue;
                }
                var travelerPriceItem = {
                    "travelerType": traveler.type,
                    "totalFare": flightPrice[0].baseFare,
                    "totalFareCurrency": flightPrice[0].totalFareCurrency,
                };


                travelerPrice.push(travelerPriceItem);

            }

            var flightInfo = {
                "id": item.originDestinationUri,
                "departureAirportLocationCode": item.departureAirportCode,
                "departDate": item.departureDate,
                "arrivalAirportLocationCode": item.arrivalAirportCode,
                "arrivalDate": item.arrivalDate,
                "airEquipType": item.aircraftCode,
                "marketingAirlineCode": item.marketingAirlineCode,
                "flightNumber": item.flightNumber.replace(/[^0-9]/ig, ""),
                "fareFamilyName": item.fareFamilyName,
                "fareFamilyCode": item.fareFamilyCode,
                "shippingSpace": item.bookingClass || "Y",
                "ticketAmount": item.baseFare,
                "travelerPrice": travelerPrice
            };

            odidlist.push(item.originDestinationUri);
            flightList.push(flightInfo);

        }
    }

    return {
        "itemid": resveration.travelers[0].flightSegments[0].itemUri,
        "passengerList": passengerList,
        "flightList": flightList,
        "paymentTimeout": 10,
        "islocked": {
            "status": false,
            "timeout": 0
        },
        "fareFamilies": resveration.fareFamilies
    };
};

exports.search2 = function (reqBody) {

    var originDestinationGroup = [];
    for (var i = 0; i < reqBody.originDestination.length; i++) {
        var item = reqBody.originDestination[i];
        var flightlist = [];
        for (var j = 0; j < item.departureDateGroup.length; j++) {
            for (var k = 0; k < item.departureDateGroup[j].changeItinerary.length; k++) {
                var changeitem = item.departureDateGroup[j].changeItinerary[k];

                var travelerPriceList = [];

                _.each(changeitem.TravelerPrice, function (item) {
                    travelerPriceList.push({
                        "travelerType": item.travelerType,
                        "totalFare": item.baseFare,
                        "bookingClass": changeitem.bookingClass,
                        "inventoryQuantity": item.quantity || 0,
                        "totalFareCurrency": item.totalFareCurrency

                    })
                });

                var flightitem = {
                        "itinerary": {
                            "id": item.originDestinationId,
                            "duration": 40,
                            "arrivalOffset": 0,
                            "flightSegment": [{
                                "id": "UQ_2001_2017-09-21_AKU_AAT",
                                "flightNumber": changeitem.flightNumber,
                                "duration": 40,
                                "layover": 0,
                                "stopQuantity": 0,
                                "markingAirline": {
                                    "code": changeitem.marketingAirlineCode,
                                    "name": changeitem.marketingAirlineName
                                },
                                "operatingAirline": {"code": "", "name": ""},
                                "departure": {
                                    "date": changeitem.departureDate.split(' ')[0],
                                    "time": changeitem.departureDate.split(' ')[1],
                                    "terminal": "",
                                    "gate": "",
                                    "airport": {
                                        "code": changeitem.departureAirportCode,
                                        "name": changeitem.departureAirportCode
                                    }
                                },
                                "arrival": {
                                    "date": changeitem.arrivalDate.split(' ')[0],
                                    "time": changeitem.arrivalDate.split(' ')[1],
                                    "terminal": "",
                                    "gate": "",
                                    "airport": {
                                        "code": changeitem.arrivalAirportName,
                                        "name": changeitem.arrivalAirportName
                                    }
                                },
                                "aircraft": {"code": changeitem.aircraftCode, "name": changeitem.aircraftName}
                            }]
                        },
                        "itineraryPrice": [{
                            "id": changeitem.targetUri,
                            "fareFamily": {
                                "id": "",
                                "code": changeitem.fareFamilyCode,
                                "name": changeitem.fareFamilyCode,
                                "benefit": changeitem.benefits
                            },
                            "travelerPrice": travelerPriceList
                        }]
                    }
                    ;

                flightlist.push(flightitem)
            }
        }

        originDestinationGroup.push(
            {
                "originDestinationId": item.originDestinationId,
                "date": item.departureDateGroup[0].date,
                "originCode": item.departureAirportCode,
                "originName": item.departureAirportCode,
                "destinationCode": item.arrivalAirportCode,
                "destinationName": item.arrivalAirportCode,
                "originDestinationOption": flightlist
            }
        )

    }
    return {
        "airChangeSearch": {
            "originDestinationGroup": originDestinationGroup
        }
    }
}
;