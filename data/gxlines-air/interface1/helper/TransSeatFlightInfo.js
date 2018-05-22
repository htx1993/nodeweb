var _ = require('underscore');

function shopcart(cart) {


    var seatInfo = {
        "bounds": [],
        "travelerInfo": [],
        "code": ""
    };

    if (!cart) {
        return seatInfo;
    }

    _.each(cart.bounds, function (item) {
        var boundItem = {
            "flightNumber": item.flightNumber,
            "inBoundDate": item.inBoundDate,
            "origin": item.origin,
            "destination": item.destination,
            "departureDate": item.departureDate,
            "arrivalDate": item.arrivalDate,
            "fareFamilyCode": item.fareFamilyCode || "",
            "fareFamilyName": item.fareFamilyName || "",
            "aircraftCode": item.aircraftName + item.aircraftCode || "",
            "aircraftName": item.aircraftName + item.aircraftCode || "",
            "desigCode": item.bookingClass || "",
            "flightUrl": item.flightUrl,
        };

        seatInfo.bounds.push(boundItem);
    })

    _.each(cart.travelerInfo, function (travler) {

        var traveleridList = cart.airTaxFeeCalculateoffer.travelerCompositionInfo;

        var travlerurl = _.filter(traveleridList, function (itemurl) {
            return itemurl.id == travler.id
        })
        var item = {
            "id": travler.id,
            "uri": travlerurl[0].uri,
            "firstName": travler.firstName,
            "lastName": travler.lastName,
            "type": travler.type,
            "idNo": travler.idNo,
            "idNoType": travler.idNoType,
            "seatlist": []
        };
        seatInfo.travelerInfo.push(item);
    })
    seatInfo.code = cart.shoppingCartId;

    return seatInfo;

}

function reservation(resver) {

    var seatInfo = {
        "bounds": [],
        "travelerInfo": [],
        "code": ""
    };

    if (!resver) {
        return seatInfo;
    }

    var flightlist = resver.travelers[0].flightSegments;

    _.each(flightlist, function (item) {
        var bound = {
            "flightNumber": item.marketingAirlineCode + item.flightNumber,
            "inBoundDate": item.departureDate,
            "origin": item.departureAirportCode,
            "destination": item.arrivalAirportCode,
            "departureDate": item.departureDate,
            "arrivalDate": item.arrivalDate,
            "fareFamilyCode": item.fareFamilyCode,
            "fareFamilyName": item.fareFamilyName,
            "aircraftCode": item.aircraftCode,
            "aircraftName": item.aircraftName + item.aircraftCode,
            "desigCode": item.bookingClass,
            "flightUrl": item.uri
        };

        seatInfo.bounds.push(bound)
    })

    _.each(resver.travelers, function (traveler) {

        var seatlist = [];
        var _seatlist = _.filter(traveler.ancillaryOffers, function (ancillaryitem) {
            return ancillaryitem.type == "SEATFEE";
        });

        _.each(_seatlist, function (seat) {
            var flightItem = _.filter(traveler.flightSegments, function (flight) {
                return flight.flightNumber == seat.flightNumber
            })
            if (flightItem.length > 0) {
                seatlist.push({"flightSegmentId": flightItem[0].uri, "seatNum": seat.seatNum})
            }
        })
        var traveleritem = {
            "id": traveler.id,
            "uri": traveler.uri,
            "firstName": traveler.firstName,
            "lastName": traveler.lastName,
            "type": traveler.type,
            "idNo": traveler.idNo,
            "idNoType": traveler.idNoType,
            "seatlist": seatlist
        };

        seatInfo.travelerInfo.push(traveleritem)
    });
    seatInfo.code = resver.code;

    return seatInfo;
}

module.exports = {
    shopcart: shopcart,
    reservation: reservation
}