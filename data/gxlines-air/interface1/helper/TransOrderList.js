var _ = require('underscore');
var utils = require('../utils');
exports.TransOrder = function (orderList) {
    if (orderList && orderList.datas) {
        var list = orderList.datas;
        var transList = [];

        _.each(list, function (item) {

            var flightlist = [];

            _.each(item.segments, function (flight) {
                var flightItem = {
                    "id": "",
                    "duration": "",
                    "segments": [
                        {
                            "flightNumber": item.firstFlightFlightNumber,
                            "marketingAirline": item.firstFlightAirlineCode,
                            "departureCity": flight.departure,
                            "arrivalCity": flight.arrival,
                            "takeOffTime": "2017-11-09",
                            "arrivalTime": "",
                            "ticketNo": ""
                        }
                    ]
                };

                flightlist.push(flightItem)

            })

            var transItem = {
                "creationDate": item.creationDate,
                "orderCode": item.code,
                "key": "",
                "status": item.status,
                "originDestinationOptions": flightlist
            };
            transList.push(transItem)
        });

        return transList;
    }
    else return [];
};