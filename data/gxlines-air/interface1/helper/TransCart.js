var _ = require('underscore');

exports.TransAirPrice = function (resBody) {
    return resBody;
    if (!resBody)
        return {
            "tripType": "",
            "tripGroupVoList": [],
            "totalAmout": "",
            "offerId": "",
            "guestPriceList": [],
            "taxList": []
        };

    var guestPriceList = [];
    var taxList = [];

    for (var i = 0; i < resBody.shoppingCart.travelerInfo.length; i++) {
        var guestItem = resBody.shoppingCart.travelerInfo[i];
        var guestPriceItem = {
            paxCode: guestItem.travelerType,
            paxPrice: guestItem.fare,
            paxQuantity: guestItem.amount,
            paxTotalPrice: guestItem.fare * guestItem.amount
        };

        guestPriceList.push(guestPriceItem)

    }

    for (var k = 0; k < resBody.shoppingCart.taxs.length; k++) {
        var item = resBody.shoppingCart.taxs[k];
        var taxItem = {
            "value": item.taxFare,
            "des": item.name || item.code
        };
        taxList.push(taxItem);
    }

    var tripGroupVoList = [];

    for (var i = 0; i < resBody.shoppingCart.bounds.length; i++) {
        var flightSegment = resBody.shoppingCart.bounds[i];
        var flightSegmentVoList = [];
        var flightSegmentItem = {
            "amountOfStops": flightSegment.stopQuantity,
            "arrivalAirport": flightSegment.origin,
            "arrivalAirportLocationCode": flightSegment.origin,
            "arrivalTime": flightSegment.arrivalDate,
            "departureAirport": flightSegment.destination,
            "departureAirportLocationCode": flightSegment.destination,
            "departureTime": flightSegment.departureDate,
            "flightNumber": flightSegment.flightNumber
        };
        flightSegmentVoList.push(flightSegmentItem)

        var subAirLine = {
            "amountOfStops": 0,
            "flightSegmentVoList": flightSegmentVoList,
            "id": 0,
            "stopCityList": []
        };


        tripGroupVoList.push(subAirLine);

    }

    return {
        "tripType": "RT",
        "tripGroupVoList": tripGroupVoList,
        "totalAmout": resBody.shoppingCart.totalPrice,
        // "offerId": resBody.shoppingCart.airTaxFeeCalculateoffer.offerId["0"],
        "shoppingCartId": resBody.shoppingCart.shoppingCartId,
        "guestPriceList": guestPriceList,
        "taxList": taxList
    };
};

exports.TransShopCart = function (resBody) {

    if (!resBody || !resBody.shoppingCart.item.air)
        return {
            "tripType": "",
            "tripGroupVoList": [],
            "totalAmout": "",
            "shoppingCartId": "",
            "guestPriceList": [],
            "taxList": [],
        };

    var guestPrice = resBody.shoppingCart.item.air.itineraryPrice.travelerPrice;
    var taxPrice = resBody.shoppingCart.item.price.tax;
    var priceList = GetPrice(guestPrice, taxPrice);

    var flightSegmentList = resBody.shoppingCart.item.air.itinerary.originDestination;

    var totalAmount = resBody.shoppingCart.totalPrice;

    return {
        "tripType": "RT",
        "tripGroupVoList": GetAirLine(flightSegmentList),
        "totalAmout": totalAmount,
        "shoppingCartId": resBody.shoppingCart.id,
        "guestPriceList": priceList.guestPrice,
        "taxList": priceList.taxList,
    };
};

function GetPrice(guestPrice, taxLists) {


    var guestPriceList = [];
    var taxList = [];

    for (var i = 0; i < guestPrice.length; i++) {
        var guestItem = guestPrice[i];
        var guestType = guestItem.travelerType;
        var guestPriceItem = {
            paxCode: guestType,
            paxPrice: guestItem.baseFare,
            paxQuantity: guestItem.travelerQuantity,
            paxTotalPrice: guestItem.baseFare * guestItem.travelerQuantity
        };

        guestPriceList.push(guestPriceItem)

    }


    var tax = taxLists;

    for (var k = 0; k < tax.length; k++) {
        var item = tax[k];
        var taxItem = {
            "value": item.amount,
            "des": item.name
        };
        taxList.push(taxItem);
    }

    return {"guestPrice": guestPriceList, "taxList": taxList}
};

function GetAirLine(flightSegmentList) {
    var tripGroupVoList = [];

    for (var i = 0; i < flightSegmentList.length; i++) {
        var flightSegmentLine = flightSegmentList[i].flightSegment;
        var flightSegmentVoList = [];
        for (var j = 0; j < flightSegmentLine.length; j++) {
            var flightSegment = flightSegmentLine[j];
            var flightSegmentItem = {
                "airEquipType": flightSegment.aircraft.code,
                "amountOfStops": flightSegment.stopQuantity,
                "arrivalAirport": flightSegment.arrival.airport.name,
                "arrivalAirportLocationCode": flightSegment.arrival.airport.code,
                "arrivalTime": flightSegment.arrival.date + ' ' + flightSegment.arrival.time,
                "departureAirport": flightSegment.departure.airport.name,
                "departureAirportLocationCode": flightSegment.departure.airport.code,
                "departureTime": flightSegment.departure.date + ' ' + flightSegment.departure.time,
                "flightNumber": flightSegment.flightNumber,
                "hasMeal": false,
                "marketingAirlineCode": flightSegment.markingAirline.code,
                "stopCityList": []
            };
            flightSegmentVoList.push(flightSegmentItem)
        }

        var subAirLine = {
            "amountOfStops": 0,
            "flightSegmentVoList": flightSegmentVoList,
            "id": 0,
            "stopCityList": []
        };


        tripGroupVoList.push(subAirLine);

    }

    return tripGroupVoList;

}