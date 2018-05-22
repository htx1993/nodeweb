var _ = require('underscore');
var utils = require('../utils');
var config = require('../config')

module.exports = function (TdpResBody) {

    var resveration = TdpResBody.reservation;
    var orderInfo = {
        "orderCode": resveration.code,//订单编号
        "orderState": resveration.status,//订单状态
        "orderAmount": resveration.totalFare,//订单金额
        "unpaidAmount": resveration.payNowValue,//未支付金额
        "paidAmount": resveration.paidValue || 0,//已支付金额
        "createOrderDate": resveration.creationDate,//订单创建时间
        "ticketedDate": resveration.ticketTime || "",//出票时间
        "paymentDate": resveration.payTime || "",//支付时间
        "contactName": resveration.customer.lastName + resveration.customer.firstName,//订单联系人
        "contactPhone": resveration.customer.mobile,//联系电话
        "contactEmail": resveration.customer.email,//联系邮箱
        "deductibleAmount": "0",//积分折扣金额
        "orderSource": resveration.source || ""//数据来源
    };

    var passengerList = [];
    var insurancelist = [];

    for (var i = 0; i < resveration.travelers.length; i++) {

        var traveler = resveration.travelers[i];

        var travelerinfo = {
            "name": traveler.lastName + traveler.firstName,
            "lastName": traveler.lastName,
            "firstName": traveler.firstName,
            "idType": traveler.idNoType,
            "idNo": traveler.idNo,
            "passType": traveler.type,
            "birthday": traveler.dateOfBirth || "",
            "ticketType": "电子客票",
            "cardNo": "",//常旅客卡号
            "sysNo": ""//系统编号
        };

        var travelerflightsegment = traveler.flightSegments;
        var flightList = [];

        _.each(traveler.insuranceOffers, function (item) {
            item.lastName = traveler.lastName;
            item.firstName = traveler.firstName;
            item.idNo = traveler.idNo;
            insurancelist.push(item)
        });

        for (var j = 0; j < travelerflightsegment.length; j++) {
            var flight = travelerflightsegment[j];

            var taxLits = [];
            var totalTaxes = 0;
            _.each(flight.taxs, function (item) {
                var taxItem = {code: item.code, "name": item.description, "amount": item.amount};
                totalTaxes += parseFloat(item.amount)
                if (item.amount > 0)
                    taxLits.push(taxItem)
            });
            _.each(flight.fees, function (item) {
                var taxItem = {code: item.code, "name": item.description, "amount": item.amount};
                totalTaxes += parseFloat(item.amount)
                if (item.amount > 0)
                    taxLits.push(taxItem)
            });

            var flightInfo = {
                "departureAirportLocationCode": flight.departureAirportCode,
                "departureTime": flight.departureDate,
                "arrivalAirportLocationCode": flight.arrivalAirportCode,
                "arrivalTime": flight.arrivalDate,
                "airEquipType": flight.aircraftName + flight.aircraftCode,
                "marketingAirlineCode": flight.marketingAirlineCode,
                "flightNumber": flight.flightNumber,
                "shippingSpace": flight.bookingClass,
                "seatState": "",
                "fareFamilyCode": flight.fareFamilyCode,
                "fareFamilyName": flight.fareFamilyName,
                "ticketNo": flight.ticketNumber || '',
                "ticketState": flight.ticketStatus,
                "ticketAmount": flight.baseFare,
                "payableAmount": flight.totalFare,
                "totalAmount": flight.totalFare,
                "taxTotal": flight.totalTaxes,
                "tax": taxLits,
                "products": [],
                "segid": flight.segid || ""

            };
            flightList.push(flightInfo);

        }

        var itemObj = {
            "info": travelerinfo,
            "flightSegment": flightList,
            "productlist": traveler.ancillaryOffers || []
        };

        passengerList.push(itemObj);

    }

    var actionlist = [];

    _.each(resveration.actions, function (item) {
        actionlist.push({
            "code": item.code,
            "description": item.description,
            "enabled": item.enable,
        })
    })

    var orderdetail = {
        "orderInfo": orderInfo,
        "passengerList": passengerList,
        "action": [],
        "pos": resveration.source || config.pos,
        "islocked": {
            "status": false,
            "timeout": 0
        },
        "action": actionlist,
        "insuranceOffers": insurancelist || [],
        "fareFamilies": resveration.fareFamilies
    };

    if (resveration.userName && resveration.expiryDate) {
        orderdetail.islocked =
            {
                "status": true,
                "timeout": 30,
                "message": "订单锁定中,请稍后进行操作"
            }
    }
    return orderdetail
};
