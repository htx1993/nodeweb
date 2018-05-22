var Mock = require("mockjs");
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var _ = require('underscore');
var until = require(path.join(process.cwd(), 'data/tools/until'));

Mock.Random.extend({
    passTypes: ['ADT', 'CNN', 'INF'],
    passType: function (date) {
        return this.pick(this.passTypes)
    }
});
Mock.Random.passType();


var _passTypeList = ["ADT", "CNN", "INF", "ADT", "ADT", "ADT", "ADT"];
var _idTypeList = ["2.DOC", "MI_CARD", "OTHER_ID"];
var _idNoList = ["61062910", "rrssdsds", "gsdss", "cbvbcv445", "610622198810100910"];


//1.改期前，通过订单号查询到的航班信息2
//参数
var req1 = {
    "orderCode": "3423423432"
};
//返回结果
var changeOrderDetail = Mock.mock({
    "itemid": "/reservations/0000008444/items/1",
    "passengerList|2-4": [
        {
            "name": "@cname",
            "firstName": "@cfirst",
            "lastName": "@clast",
            "idType|1": _idTypeList,
            "idNo|1": _idNoList,
            "passType|1": _passTypeList,
            "ticketType": "电子客票",
            "birthday|1": ["2001-03-05", "1973-06-25", "1990-03-15", "2001-08-05"],
            "cardNo": "",
            "sysNo": ""
        }
    ],
    "flightList": [
        {
            "id": "/reservations/0000008444/items/1/itineraries/1/origins-destinations/1",
            "departureAirportLocationCode": "CKG",
            "departDate": "2018-02-26 20:00:00",
            "arrivalAirportLocationCode": "TSN",
            "arrivalDate": "2018-02-26 20:40:00",
            "airEquipType": "",
            "marketingAirlineCode": "PN",
            "flightNumber": "6903",
            "fareFamilyCode": "BASIC",
            "fareFamilyName": "超优惠",
            "shippingSpace": "J",
            "ticketAmount": "230",
            "travelerPrice": [
                {
                    "travelerType": "ADT",
                    "totalFare": 3240,
                    "totalFareCurrency": "CNY"
                },
                {
                    "travelerType": "CNN",
                    "totalFare": 1240,
                    "totalFareCurrency": "CNY"
                }
            ]
        },
        {
            "id": "/reservations/0000008444/items/1/itineraries/1/origins-destinations/1",
            "departureAirportLocationCode": "TSN",
            "departDate": "2018-02-28 22:00:00",
            "arrivalAirportLocationCode": "CKG",
            "arrivalDate": "2018-02-28 22:40:00",
            "airEquipType": "",
            "marketingAirlineCode": "PN",
            "flightNumber": "6902",
            "fareFamilyCode": "BASIC",
            "fareFamilyName": "超优惠",
            "shippingSpace": "J",
            "ticketAmount": "230",
            "travelerPrice": [
                {
                    "travelerType": "ADT",
                    "totalFare": 3240,
                    "totalFareCurrency": "CNY"
                },
                {
                    "travelerType": "CNN",
                    "totalFare": 1240,
                    "totalFareCurrency": "CNY"
                }
            ]
        }
    ],
    "paymentTimeout": 10,
    "islocked": {"status": false, "timeout": 0},
    "fareFamilies": [
        {
            "sequence": 1,
            "code": "BASIC",
            "name": "超优惠",
            "benefits": [{"code": "ENDORSEMENT_ALL", "name": "自愿签转", "text": "自愿签转:不允许签转."}, {
                "code": "CHANGE_FEE_ALL",
                "name": "变更服务费",
                "text": "变更服务费（每次）：航班计划离站时间14天（含）外 - 5%；        <br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；        <br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；        <br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；        <br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；        <br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。"
            }, {
                "code": "REFUND_FEE_ALL",
                "name": "退票费",
                "text": "退票费：航班计划离站时间14天（含）外 - 5%；        <br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；        <br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；        <br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；        <br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；        <br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。"
            }, {"code": "BAGGAGE_ALLOWANCE", "name": "免费托运行李", "text": "无免费托运行李额度."}, {
                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                "name": "免费非托运行李",
                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱."
            }, {"code": "MEAL_SERVICE", "name": "免费餐饮服务", "text": "免费餐饮服务：无免费机上餐食."}]
        }
    ],
    "status": "success"
});


//2.修改新的出行日期，查询到的符合新日期的航班信息
//参数
var req2 = {
    "itemid": "0000021021~items~1",
    "changelist": [
        {
            "flightid": "0000021021~items~1~itineraries~1~origins-destinations~1",
            "target": {
                "originCode": "TSN",
                "originDate": "2017-08-04",
                "destinationCode": "CKG"
            }
        },
        {
            "flightid": "0000021021~items~1~itineraries~1~origins-destinations~1",
            "target": {
                "originCode": "TSN",
                "originDate": "2017-08-04",
                "destinationCode": "CKG"
            }
        }
    ]
};
//返回结果
var getChangeOrderList = {
    "airChangeSearch": {
        "originDestinationGroup": [
            {
                "originDestinationId": "0000136044~items~1~itineraries~1~origins-destinations~1",
                "date": "2017-09-21",
                "originCode": "TSN",
                "originName": "阿克苏机场",
                "destinationCode": "CKG",
                "destinationName": "阿勒泰机场",
                "originDestinationOption": [
                    {
                        "itinerary": {
                            "id": "599c287ceb10843d0b6dc2c6~itineraries~3",
                            "duration": 40,
                            "arrivalOffset": 0,
                            "flightSegment": [
                                {
                                    "id": "UQ_2001_2017-09-21_AKU_AAT",
                                    "flightNumber": "2001",
                                    "duration": 40,
                                    "layover": 0,
                                    "stopQuantity": 0,
                                    "markingAirline": {"code": "UQ", "name": "Urumqi Airlines "},
                                    "operatingAirline": {"code": "", "name": ""},
                                    "departure": {
                                        "date": "2017-09-21",
                                        "time": "17:30:00",
                                        "terminal": "",
                                        "gate": "",
                                        "airport": {"code": "CKG", "name": "阿克苏机场"}
                                    },
                                    "arrival": {
                                        "date": "2017-09-21",
                                        "time": "18:50:00",
                                        "terminal": "",
                                        "gate": "",
                                        "airport": {"code": "TSN", "name": "阿勒泰机场"}
                                    },
                                    "aircraft": {"code": "738", "name": "Boeing 737_800"},
                                }
                            ]
                        },
                        "itineraryPrice": [
                            {
                                "id": "599c287ceb10843d0b6dc2c6~itinerary-prices~1",
                                "fareFamily": {
                                    "id": "",
                                    "code": "UQYH",
                                    "name": "超惠游",
                                    "benefit": [{
                                        "id": "",
                                        "code": "CHANGE_FEE",
                                        "name": "变更服务费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 20%; \n 航班计划离站时间48小时内及12小时（含）前: 30%; \n 航班计划离站时间12小时内及航班离站后：40%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "REFUND_FEE",
                                        "name": "退票费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 40%; \n 航班计划离站时间48小时内及12小时（含）前: 60%; \n 航班计划离站时间12小时内及航班离站后：80%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "ENDORSEMENT_ALL",
                                        "name": "允许签转",
                                        "shortDescription": "签转：不允许",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "BAGGAGE_ALLOWANCE",
                                        "name": "免费托运行李",
                                        "shortDescription": "无免费托运行李额度",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                        "name": "免费非托运行李",
                                        "shortDescription": "可免费携带一件5KG且体积不超过20cm x 40cm x 55cm的非托运行李进入客舱",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "MEAL_SERVICE",
                                        "name": "免费餐饮服务",
                                        "shortDescription": "无免费餐饮服务",
                                        "longDescription": ""
                                    }]
                                },
                                "travelerPrice": [
                                    {
                                        "travelerType": "ADT",
                                        "baseFare": "520",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "520",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 2,
                                        "bookingClass":"C"
                                    }, {
                                        "travelerType": "CNN",
                                        "baseFare": "1170",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "1170",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 1,
                                        "bookingClass":"C"
                                    }]
                            },
                            {
                                "id": "599c287ceb10843d0b6dc2c6~itinerary-prices~5",
                                "fareFamily": {
                                    "id": "",
                                    "code": "UQZY",
                                    "name": "超自游",
                                    "benefit": [{
                                        "id": "",
                                        "code": "CHANGE_FEE",
                                        "name": "变更服务费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 10%; \n 航班计划离站时间48小时内及12小时（含）前: 20%; \n 航班计划离站时间12小时内及航班离站后：30%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "REFUND_FEE",
                                        "name": "退票费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 20%; \n 航班计划离站时间48小时内及12小时（含）前: 30%; \n 航班计划离站时间12小时内及航班离站后：50%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "ENDORSEMENT_ALL",
                                        "name": "允许签转",
                                        "shortDescription": "签转：不允许(Y舱除外）",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "BAGGAGE_ALLOWANCE",
                                        "name": "免费托运行李",
                                        "shortDescription": "20KG免费托运行李",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                        "name": "免费非托运行李",
                                        "shortDescription": "可免费携带一件5KG且体积不超过20cm x 40cm x 55cm的非托运行李进入客舱",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "MEAL_SERVICE",
                                        "name": "免费餐饮服务",
                                        "shortDescription": "无免费餐饮服务",
                                        "longDescription": ""
                                    }]
                                },
                                "travelerPrice": [
                                    {
                                        "travelerType": "ADT",
                                        "baseFare": "520",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "520",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 2,
                                        "bookingClass":"C"
                                    }, {
                                        "travelerType": "CNN",
                                        "baseFare": "1170",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "1170",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 1,
                                        "bookingClass":"C"
                                    }
                                ]
                            },
                            {
                                "id": "599c287ceb10843d0b6dc2c6~itinerary-prices~1",
                                "fareFamily": {
                                    "id": "",
                                    "code": "UQYH",
                                    "name": "超惠游",
                                    "benefit": [{
                                        "id": "",
                                        "code": "CHANGE_FEE",
                                        "name": "变更服务费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 20%; \n 航班计划离站时间48小时内及12小时（含）前: 30%; \n 航班计划离站时间12小时内及航班离站后：40%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "REFUND_FEE",
                                        "name": "退票费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 40%; \n 航班计划离站时间48小时内及12小时（含）前: 60%; \n 航班计划离站时间12小时内及航班离站后：80%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "ENDORSEMENT_ALL",
                                        "name": "允许签转",
                                        "shortDescription": "签转：不允许",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "BAGGAGE_ALLOWANCE",
                                        "name": "免费托运行李",
                                        "shortDescription": "无免费托运行李额度",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                        "name": "免费非托运行李",
                                        "shortDescription": "可免费携带一件5KG且体积不超过20cm x 40cm x 55cm的非托运行李进入客舱",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "MEAL_SERVICE",
                                        "name": "免费餐饮服务",
                                        "shortDescription": "无免费餐饮服务",
                                        "longDescription": ""
                                    }]
                                },
                                "travelerPrice": [
                                    {
                                        "travelerType": "ADT",
                                        "baseFare": "520",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "520",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 2,
                                        "bookingClass":"C"
                                    }, {
                                        "travelerType": "CNN",
                                        "baseFare": "1170",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "1170",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 1,
                                        "bookingClass":"C"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "itinerary": {
                            "duration": 25,
                            "arrivalOffset": 0,
                            "flightSegment": [
                                {
                                    "id": "UQ_2003_2017-09-21_AKU_AAT",
                                    "flightNumber": "2003",
                                    "duration": 25,
                                    "layover": 0,
                                    "stopQuantity": 0,
                                    "markingAirline": {"code": "UQ", "name": "Urumqi Airlines "},
                                    "operatingAirline": {"code": "", "name": ""},
                                    "departure": {
                                        "date": "2017-09-21",
                                        "time": "19:55:00",
                                        "terminal": "",
                                        "gate": "",
                                        "airport": {"code": "CKG", "name": "阿克苏机场"}
                                    },
                                    "arrival": {
                                        "date": "2017-09-21",
                                        "time": "21:30:00",
                                        "terminal": "",
                                        "gate": "",
                                        "airport": {"code": "TSN", "name": "阿勒泰机场"}
                                    },
                                    "aircraft": {"code": "738", "name": "Boeing 737_800"},
                                    "stopCity": []
                                }]
                        },
                        "itineraryPrice": [
                            {
                                "id": "599c287ceb10843d0b6dc2c6~itinerary-prices~3",
                                "fareFamily": {
                                    "id": "",
                                    "code": "UQYH",
                                    "name": "超惠游",
                                    "benefit": [{
                                        "id": "",
                                        "code": "CHANGE_FEE",
                                        "name": "变更服务费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 20%; \n 航班计划离站时间48小时内及12小时（含）前: 30%; \n 航班计划离站时间12小时内及航班离站后：40%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "REFUND_FEE",
                                        "name": "退票费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 40%; \n 航班计划离站时间48小时内及12小时（含）前: 60%; \n 航班计划离站时间12小时内及航班离站后：80%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "ENDORSEMENT_ALL",
                                        "name": "允许签转",
                                        "shortDescription": "签转：不允许",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "BAGGAGE_ALLOWANCE",
                                        "name": "免费托运行李",
                                        "shortDescription": "无免费托运行李额度",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                        "name": "免费非托运行李",
                                        "shortDescription": "可免费携带一件5KG且体积不超过20cm x 40cm x 55cm的非托运行李进入客舱",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "MEAL_SERVICE",
                                        "name": "免费餐饮服务",
                                        "shortDescription": "无免费餐饮服务",
                                        "longDescription": ""
                                    }]
                                },
                                "travelerPrice": [
                                    {
                                        "travelerType": "ADT",
                                        "baseFare": "520",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "520",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 2,
                                        "bookingClass":"C"
                                    }, {
                                        "travelerType": "CNN",
                                        "baseFare": "1170",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "1170",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 1,
                                        "bookingClass":"C"
                                    }
                                ]
                            },
                            {
                                "id": "599c287ceb10843d0b6dc2c6~itinerary-prices~5",
                                "fareFamily": {
                                    "id": "",
                                    "code": "UQZY",
                                    "name": "超自游",
                                    "benefit": [{
                                        "id": "",
                                        "code": "CHANGE_FEE",
                                        "name": "变更服务费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 10%; \n 航班计划离站时间48小时内及12小时（含）前: 20%; \n 航班计划离站时间12小时内及航班离站后：30%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "REFUND_FEE",
                                        "name": "退票费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 20%; \n 航班计划离站时间48小时内及12小时（含）前: 30%; \n 航班计划离站时间12小时内及航班离站后：50%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "ENDORSEMENT_ALL",
                                        "name": "允许签转",
                                        "shortDescription": "签转：不允许(Y舱除外）",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "BAGGAGE_ALLOWANCE",
                                        "name": "免费托运行李",
                                        "shortDescription": "20KG免费托运行李",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                        "name": "免费非托运行李",
                                        "shortDescription": "可免费携带一件5KG且体积不超过20cm x 40cm x 55cm的非托运行李进入客舱",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "MEAL_SERVICE",
                                        "name": "免费餐饮服务",
                                        "shortDescription": "无免费餐饮服务",
                                        "longDescription": ""
                                    }]
                                },
                                "travelerPrice": [
                                    {
                                        "travelerType": "ADT",
                                        "baseFare": "520",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "520",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 2,
                                        "bookingClass":"C"
                                    }, {
                                        "travelerType": "CNN",
                                        "baseFare": "1170",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "1170",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 1,
                                        "bookingClass":"C"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "source": null
            },
            {
                "originDestinationId": "0000136044~items~1~itineraries~1~origins-destinations~2",
                "date": "2017-09-29",
                "originCode": "CKG",
                "originName": "阿勒泰机场",
                "destinationCode": "TSN",
                "destinationName": "阿克苏机场",
                "originDestinationOption": [
                    {
                        "itinerary": {
                            "id": "599c287ceb10843d0b6dc2c6~itineraries~3",
                            "duration": 190,
                            "arrivalOffset": 0,
                            "flightSegment": [
                                {
                                    "id": "UQ_2002_2017-09-29_AAT_AKU",
                                    "flightNumber": "2002",
                                    "duration": 190,
                                    "layover": 0,
                                    "stopQuantity": 0,
                                    "markingAirline": {"code": "UQ", "name": "Urumqi Airlines "},
                                    "operatingAirline": {"code": "", "name": ""},
                                    "departure": {
                                        "date": "2017-09-29",
                                        "time": "21:40:00",
                                        "terminal": "",
                                        "gate": "",
                                        "airport": {"code": "TSN", "name": "阿勒泰机场"}
                                    },
                                    "arrival": {
                                        "date": "2017-09-29",
                                        "time": "22:50:00",
                                        "terminal": "",
                                        "gate": "",
                                        "airport": {"code": "CKG", "name": "阿克苏机场"}
                                    },
                                    "aircraft": {"code": "738", "name": "Boeing 737_800"},
                                    "stopCity": []
                                }
                            ]
                        },
                        "itineraryPrice": [
                            {
                                "id": "599c287ceb10843d0b6dc2c6~itinerary-prices~5",
                                "fareFamily": {
                                    "id": "",
                                    "code": "UQZY",
                                    "name": "超自游",
                                    "benefit": [{
                                        "id": "",
                                        "code": "CHANGE_FEE",
                                        "name": "变更服务费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 10%; \n 航班计划离站时间48小时内及12小时（含）前: 20%; \n 航班计划离站时间12小时内及航班离站后：30%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "REFUND_FEE",
                                        "name": "退票费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 20%; \n 航班计划离站时间48小时内及12小时（含）前: 30%; \n 航班计划离站时间12小时内及航班离站后：50%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "ENDORSEMENT_ALL",
                                        "name": "允许签转",
                                        "shortDescription": "签转：不允许(Y舱除外）",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "BAGGAGE_ALLOWANCE",
                                        "name": "免费托运行李",
                                        "shortDescription": "20KG免费托运行李",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                        "name": "免费非托运行李",
                                        "shortDescription": "可免费携带一件5KG且体积不超过20cm x 40cm x 55cm的非托运行李进入客舱",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "MEAL_SERVICE",
                                        "name": "免费餐饮服务",
                                        "shortDescription": "无免费餐饮服务",
                                        "longDescription": ""
                                    }]
                                },
                                "travelerPrice": [
                                    {
                                        "travelerType": "ADT",
                                        "baseFare": "520",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "520",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 2,
                                        "bookingClass":"C"
                                    }, {
                                        "travelerType": "CNN",
                                        "baseFare": "1170",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "1170",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 1,
                                        "bookingClass":"C"
                                    }
                                ]
                            },
                            {
                                "id": "599c287ceb10843d0b6dc2c6~itinerary-prices~1",
                                "fareFamily": {
                                    "id": "",
                                    "code": "UQYH",
                                    "name": "超惠游",
                                    "benefit": [{
                                        "id": "",
                                        "code": "CHANGE_FEE",
                                        "name": "变更服务费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 20%; \n 航班计划离站时间48小时内及12小时（含）前: 30%; \n 航班计划离站时间12小时内及航班离站后：40%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "REFUND_FEE",
                                        "name": "退票费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 40%; \n 航班计划离站时间48小时内及12小时（含）前: 60%; \n 航班计划离站时间12小时内及航班离站后：80%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "ENDORSEMENT_ALL",
                                        "name": "允许签转",
                                        "shortDescription": "签转：不允许",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "BAGGAGE_ALLOWANCE",
                                        "name": "免费托运行李",
                                        "shortDescription": "无免费托运行李额度",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                        "name": "免费非托运行李",
                                        "shortDescription": "可免费携带一件5KG且体积不超过20cm x 40cm x 55cm的非托运行李进入客舱",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "MEAL_SERVICE",
                                        "name": "免费餐饮服务",
                                        "shortDescription": "无免费餐饮服务",
                                        "longDescription": ""
                                    }]
                                },
                                "travelerPrice": [
                                    {
                                        "travelerType": "ADT",
                                        "baseFare": "520",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "520",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 2,
                                        "bookingClass":"C"
                                    }, {
                                        "travelerType": "CNN",
                                        "baseFare": "1170",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "1170",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 1,
                                        "bookingClass":"C"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "itinerary": {
                            "id": "599c287ceb10843d0b6dc2c6~itineraries~4",
                            "duration": 215,
                            "arrivalOffset": 1,
                            "flightSegment": [
                                {
                                    "id": "UQ_2004_2017-09-29_AAT_AKU",
                                    "flightNumber": "2004",
                                    "duration": 215,
                                    "layover": 0,
                                    "stopQuantity": 0,
                                    "markingAirline": {"code": "UQ", "name": "Urumqi Airlines "},
                                    "operatingAirline": {"code": "", "name": ""},
                                    "departure": {
                                        "date": "2017-09-29",
                                        "time": "22:35:00",
                                        "terminal": "",
                                        "gate": "",
                                        "airport": {"code": "TSN", "name": "阿勒泰机场"}
                                    },
                                    "arrival": {
                                        "date": "2017-09-30",
                                        "time": "00:10:00",
                                        "terminal": "",
                                        "gate": "",
                                        "airport": {"code": "CKG", "name": "阿克苏机场"}
                                    },
                                    "aircraft": {"code": "738", "name": "Boeing 737_800"},
                                    "stopCity": []
                                }
                            ]
                        },
                        "itineraryPrice": [
                            {
                                "id": "599c287ceb10843d0b6dc2c6~itinerary-prices~7",
                                "fareFamily": {
                                    "id": "",
                                    "code": "UQZY",
                                    "name": "超自游",
                                    "benefit": [{
                                        "id": "",
                                        "code": "CHANGE_FEE",
                                        "name": "变更服务费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 10%; \n 航班计划离站时间48小时内及12小时（含）前: 20%; \n 航班计划离站时间12小时内及航班离站后：30%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "REFUND_FEE",
                                        "name": "退票费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 20%; \n 航班计划离站时间48小时内及12小时（含）前: 30%; \n 航班计划离站时间12小时内及航班离站后：50%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "ENDORSEMENT_ALL",
                                        "name": "允许签转",
                                        "shortDescription": "签转：不允许(Y舱除外）",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "BAGGAGE_ALLOWANCE",
                                        "name": "免费托运行李",
                                        "shortDescription": "20KG免费托运行李",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                        "name": "免费非托运行李",
                                        "shortDescription": "可免费携带一件5KG且体积不超过20cm x 40cm x 55cm的非托运行李进入客舱",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "MEAL_SERVICE",
                                        "name": "免费餐饮服务",
                                        "shortDescription": "无免费餐饮服务",
                                        "longDescription": ""
                                    }]
                                },
                                "travelerPrice": [
                                    {
                                        "travelerType": "ADT",
                                        "baseFare": "520",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "520",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 2,
                                        "bookingClass":"C"
                                    }, {
                                        "travelerType": "CNN",
                                        "baseFare": "1170",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "1170",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 1,
                                        "bookingClass":"C"
                                    }
                                ]
                            },
                            {
                                "id": "599c287ceb10843d0b6dc2c6~itinerary-prices~1",
                                "fareFamily": {
                                    "id": "",
                                    "code": "UQYH",
                                    "name": "超惠游",
                                    "benefit": [{
                                        "id": "",
                                        "code": "CHANGE_FEE",
                                        "name": "变更服务费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 20%; \n 航班计划离站时间48小时内及12小时（含）前: 30%; \n 航班计划离站时间12小时内及航班离站后：40%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "REFUND_FEE",
                                        "name": "退票费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 40%; \n 航班计划离站时间48小时内及12小时（含）前: 60%; \n 航班计划离站时间12小时内及航班离站后：80%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "ENDORSEMENT_ALL",
                                        "name": "允许签转",
                                        "shortDescription": "签转：不允许",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "BAGGAGE_ALLOWANCE",
                                        "name": "免费托运行李",
                                        "shortDescription": "无免费托运行李额度",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                        "name": "免费非托运行李",
                                        "shortDescription": "可免费携带一件5KG且体积不超过20cm x 40cm x 55cm的非托运行李进入客舱",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "MEAL_SERVICE",
                                        "name": "免费餐饮服务",
                                        "shortDescription": "无免费餐饮服务",
                                        "longDescription": ""
                                    }]
                                },
                                "travelerPrice": [
                                    {
                                        "travelerType": "ADT",
                                        "baseFare": "520",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "520",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 2,
                                        "bookingClass":"C"
                                    }, {
                                        "travelerType": "CNN",
                                        "baseFare": "1170",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "1170",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 1,
                                        "bookingClass":"C"
                                    }
                                ]
                            },
                            {
                                "id": "599c287ceb10843d0b6dc2c6~itinerary-prices~1",
                                "fareFamily": {
                                    "id": "",
                                    "code": "UQYH",
                                    "name": "超惠游",
                                    "benefit": [{
                                        "id": "",
                                        "code": "CHANGE_FEE",
                                        "name": "变更服务费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 20%; \n 航班计划离站时间48小时内及12小时（含）前: 30%; \n 航班计划离站时间12小时内及航班离站后：40%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "REFUND_FEE",
                                        "name": "退票费",
                                        "shortDescription": "航班计划离站时间48小时前（含）: 40%; \n 航班计划离站时间48小时内及12小时（含）前: 60%; \n 航班计划离站时间12小时内及航班离站后：80%",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "ENDORSEMENT_ALL",
                                        "name": "允许签转",
                                        "shortDescription": "签转：不允许",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "BAGGAGE_ALLOWANCE",
                                        "name": "免费托运行李",
                                        "shortDescription": "无免费托运行李额度",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                        "name": "免费非托运行李",
                                        "shortDescription": "可免费携带一件5KG且体积不超过20cm x 40cm x 55cm的非托运行李进入客舱",
                                        "longDescription": ""
                                    }, {
                                        "id": "",
                                        "code": "MEAL_SERVICE",
                                        "name": "免费餐饮服务",
                                        "shortDescription": "无免费餐饮服务",
                                        "longDescription": ""
                                    }]
                                },
                                "travelerPrice": [
                                    {
                                        "travelerType": "ADT",
                                        "baseFare": "520",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "520",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 2,
                                        "bookingClass":"C"
                                    }, {
                                        "travelerType": "CNN",
                                        "baseFare": "1170",
                                        "baseFareCurrency": "CNY",
                                        "totalFare": "1170",
                                        "totalFareCurrency": "CNY",
                                        "quantity": 1,
                                        "bookingClass":"C"
                                    }
                                ]
                            }
                        ]
                    }
                ],
            }
        ]
    },
    "status": "success"
}


//3.选择了新航班之后，计算税费
//参数
var req3 = {
    "itemid": "0000021021~items~1",
    "changelist": [
        {
            "flightid": "0000021021~items~1~itineraries~1~origins-destinations~1",
            "target": {
                "originCode": "TSN",
                "originDate": "2017-08-04",
                "destinationCode": "CKG"
            }
        },
        {
            "flightid": "0000021021~items~1~itineraries~1~origins-destinations~1",
            "target": {
                "originCode": "TSN",
                "originDate": "2017-08-04",
                "destinationCode": "CKG"
            }
        }
    ]
};
//返回结果
var catulateReturn = {
    "airChangePrice": {
        "change": {
            "id": "59720a90eed78f257c87d733~changes~0",
            "type": "CHANGE",
            "totalSupplementaryFare": 56,
            "totalChangeFare": 1680.0
        }
    },
    "status": "success"
}


//4.最后的提交
//参数
var req4 = {
    "changeid": "59720a90eed78f257c87d733~changes~0"
};
//返回的结果
var ensureReturn = {
    "pos": "",
    "status": "success"
}


/**
 * 获取升舱改期之前的航班信息
 * orderCode 订单号
 * flightNumber 航班号
 **/
exports.getChangeOrderInfoBefore = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);

    console.log("getChangeOrderInfoBefore:" + JSON.stringify(queryInfo));

    interfaceModel.sendJson(res, 200, changeOrderDetail);
};


/**
 * 获取改期之后的新航班信息
 **/
exports.getChangeOrderInfoAfter = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);

    console.log("getChangeOrderInfoAfter:" + JSON.stringify(queryInfo));

    var data = until.cloneObj(getChangeOrderList);
    if (queryInfo.changelist.length == 1) {
        data.airChangeSearch.originDestinationGroup.splice(0, 1);
    }

    interfaceModel.sendJson(res, 200, data);
};

/**
 * 计算价格
 **/
exports.calculatedPrice = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);

    console.log("calculatedPrice:" + JSON.stringify(queryInfo))
    interfaceModel.sendJson(res, 200, catulateReturn);
};

/**
 * 修改选择的舱位信息
 **/
exports.updateShipSpaceInfo = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);

    console.log("updateShipSpaceInfo:" + JSON.stringify(queryInfo))
    interfaceModel.sendJson(res, 200, ensureReturn);
};
