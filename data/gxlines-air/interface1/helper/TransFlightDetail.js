var _ = require('underscore');


var returnObj = {
    "error": [],
    "warning": [{
        "type": "SERVICE",
        "code": "LANGUAGE_SUBSTITUTION",
        "description": "Language was substituted for zh_CN"
    }],
    "flightDetails": {
        "flightNumber": "1113",
        "flightDuration": "120",
        "groundDuration": "0",
        "tripDuration": "120",
        "miles": "0",
        "marketingAirline": {"code": "GS", "name": "Air Foyle Limited"},
        "flightLeg": [{
            "id": "",
            "duration": "0",
            "departure": {
                "date": "2017-06-30",
                "time": "13:00:00",
                "terminal": "",
                "gate": "",
                "airport": {"code": "A:TSN", "name": ""}
            },
            "arrival": {
                "date": "2017-06-30",
                "time": "15:00:00",
                "terminal": "",
                "gate": "",
                "airport": {"code": "A:NAY", "name": ""}
            },
            "operatingAirline": null,
            "aircraft": {"code": "190", "name": "Embraer ERJ-190 with 106 seats"},
            "cabin": [{"type": "Economy", "meal": [{"code": "Breakfast"}]}]
        }]
    }
};

module.exports = function (resBody) {

    var detail = resBody.data;

    var flightLegList = [];

    for (var i = 0; i < detail.flightLeg.length; i++) {
        var flightLeg = detail.flightLeg[i];
        var item = {
            "departure": {
                "date": flightLeg.departureDate,
                "code": flightLeg.departureAirport,
            },
            "arrival": {
                "date": flightLeg.arrivalDate,
                "code": flightLeg.arrivalAirport,
            },
            "aircraft": {
                "code": flightLeg.aircraft,
                "name": flightLeg.aircraftName,
            }
        };

        flightLegList.push(item)
    }
    return {
        "flightNumber": detail.flightNumber,
        "flightDuration": detail.flightDuration,
        "groundDuration": detail.groundDuration,
        "tripDuration": detail.tripDuration,
        "AirlineCode": detail.marketingAirline,
        "flightLeg": flightLegList
    };
};