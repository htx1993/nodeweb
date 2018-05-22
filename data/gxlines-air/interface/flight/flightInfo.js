var flightInfo = {
    "status": "success",
    "code": "1000",
    "message": "操作成功",
    "id": "5a03ab4c85b5917f45b708eb",
    "criteria": {
        "searchType": "",
        "flexible": true,
        "roundtrip": false,
        "cabin": "Economy",
        "travelerCompositions": ["ADT:2", "CNN:1", "INF:1"]
    },
    "originDestinations": [
        {
            "origin": "CKG",
            "destination": "TSN",
            "departureDate": "2017-12-25 00:00:00",
            "originName": "Chongqing",
            "destinationName": "",
            "departureDates": [
                {"date": "2017-12-23", "minPrice": "230", "currency": "CNY"},
                {"date": "2017-12-24", "minPrice": "230", "currency": "CNY"},
                {"date": "2017-12-25", "minPrice": "230", "currency": "CNY"},
                {"date": "2017-12-26", "minPrice": "230", "currency": "CNY"},
                {"date": "2017-12-27", "minPrice": "230", "currency": "CNY"},
                {"date": "2017-12-28", "minPrice": "230", "currency": "CNY"},
                {"date": "2017-12-29", "minPrice": "230", "currency": "CNY"}
            ],
            "airItineraries": [
                {
                    "id": "5a03ab5185b5917f45b708ec/itineraries/4",
                    "duration": 40,
                    "arrivalOffset": 0,
                    "flightSegments": [
                        {
                            "id": "GX_6903_2017-12-04_CKG_TSN",
                            "flightNumber": "6903",
                            "duration": 40,
                            "layover": 0,
                            "marketingAirlineCode": "GX",
                            "marketingAirlineName": "Pan American Airways Corp. ",
                            "operatingAirlineCode": "",
                            "operatingAirlineName": "",
                            "departureDate": "2017-12-24",
                            "departureTime": "09:09:00",
                            "departureTerminal": "--",
                            "departureGate": "",
                            "departureAirportCode": "CKG",
                            "departureAirportName": "Chongqing",
                            "arrivalDate": "2017-12-24",
                            "arrivalTime": "12:40:00",
                            "arrivalTerminal": "--",
                            "arrivalGate": "",
                            "arrivalAirportCode": "TSN",
                            "arrivalAirportName": "Wanxian",
                            "aircraftCode": "194",
                            "aircraftName": "Airbus_195",
                            "stopQuantity": 1,
                            "stopCitys": ["CKG"]
                        }
                    ],
                    "airItineraryPrices": [
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/4",
                            "fareFamilyCode": "BUNDLE",
                            "fareFamilyName": "零花钱",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "无免费托运行李额度",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/4",
                            "fareFamilyCode": "BASIC",
                            "fareFamilyName": "超优惠",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "无免费托运行李额度",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/8",
                            "fareFamilyCode": "PLUS",
                            "fareFamilyName": "超级旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务;       \n<br>专享呼叫电话;       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "400",
                                "baseFareCurrency": "CNY",
                                "totalFare": "400",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "400",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "PI/LXJ",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/9",
                            "fareFamilyCode": "FLEX",
                            "fareFamilyName": "超自由",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 20%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 30%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 50%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 15%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 25%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 40%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 60%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "10KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/10",
                            "fareFamilyCode": "LUXE",
                            "fareFamilyName": "尊享旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务；       \n<br>优先行李；       \n<br>专享呼叫电话；       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "优先值机；       \n<br>头等舱通道过安检；       \n<br>头等舱休息室。",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "520",
                                "baseFareCurrency": "CNY",
                                "totalFare": "520",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "520",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CI/LXJ",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }
                    ]
                },
                {
                    "id": "5a03ab5185b5917f45b708ec/itineraries/4",
                    "duration": 40,
                    "arrivalOffset": 0,
                    "flightSegments": [
                        {
                            "id": "GX_6903_2017-12-04_CKG_TSN",
                            "flightNumber": "6903",
                            "duration": 40,
                            "layover": 0,
                            "marketingAirlineCode": "GX",
                            "marketingAirlineName": "Pan American Airways Corp. ",
                            "operatingAirlineCode": "",
                            "operatingAirlineName": "",
                            "departureDate": "2017-12-24",
                            "departureTime": "10:10:00",
                            "departureTerminal": "--",
                            "departureGate": "",
                            "departureAirportCode": "CKG",
                            "departureAirportName": "Chongqing",
                            "arrivalDate": "2017-12-24",
                            "arrivalTime": "13:20:00",
                            "arrivalTerminal": "--",
                            "arrivalGate": "",
                            "arrivalAirportCode": "TSN",
                            "arrivalAirportName": "Wanxian",
                            "aircraftCode": "194",
                            "aircraftName": "Airbus_195",
                            "stopQuantity": 0,
                            "stopCitys": []
                        },
                        {
                            "id": "GX_6903_2017-12-04_CKG_TSN",
                            "flightNumber": "6903",
                            "duration": 40,
                            "layover": 0,
                            "marketingAirlineCode": "GX",
                            "marketingAirlineName": "Pan American Airways Corp. ",
                            "operatingAirlineCode": "",
                            "operatingAirlineName": "",
                            "departureDate": "2017-12-24",
                            "departureTime": "10:10:00",
                            "departureTerminal": "--",
                            "departureGate": "",
                            "departureAirportCode": "TSN",
                            "departureAirportName": "Chongqing",
                            "arrivalDate": "2017-12-24",
                            "arrivalTime": "13:20:00",
                            "arrivalTerminal": "--",
                            "arrivalGate": "",
                            "arrivalAirportCode": "CKG",
                            "arrivalAirportName": "Wanxian",
                            "aircraftCode": "194",
                            "aircraftName": "Airbus_195",
                            "stopQuantity": 0,
                            "stopCitys": []
                        }
                    ],
                    "airItineraryPrices": [
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/4",
                            "fareFamilyCode": "BUNDLE",
                            "fareFamilyName": "零花钱",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "无免费托运行李额度",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/4",
                            "fareFamilyCode": "BASIC",
                            "fareFamilyName": "超优惠",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "无免费托运行李额度",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/8",
                            "fareFamilyCode": "PLUS",
                            "fareFamilyName": "超级旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务;       \n<br>专享呼叫电话;       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "400",
                                "baseFareCurrency": "CNY",
                                "totalFare": "400",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "400",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "PI/LXJ",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/9",
                            "fareFamilyCode": "FLEX",
                            "fareFamilyName": "超自由",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 20%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 30%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 50%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 15%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 25%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 40%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 60%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "10KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/10",
                            "fareFamilyCode": "LUXE",
                            "fareFamilyName": "尊享旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务；       \n<br>优先行李；       \n<br>专享呼叫电话；       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "优先值机；       \n<br>头等舱通道过安检；       \n<br>头等舱休息室。",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "520",
                                "baseFareCurrency": "CNY",
                                "totalFare": "520",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "520",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CI/LXJ",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }
                    ]
                },
                {
                    "id": "5a03ab5185b5917f45b708ec/itineraries/4",
                    "duration": 40,
                    "arrivalOffset": 0,
                    "flightSegments": [
                        {
                            "id": "GX_6903_2017-12-04_CKG_TSN",
                            "flightNumber": "6903",
                            "duration": 40,
                            "layover": 0,
                            "marketingAirlineCode": "GX",
                            "marketingAirlineName": "Pan American Airways Corp. ",
                            "operatingAirlineCode": "",
                            "operatingAirlineName": "",
                            "departureDate": "2017-12-24",
                            "departureTime": "11:11:00",
                            "departureTerminal": "--",
                            "departureGate": "",
                            "departureAirportCode": "CKG",
                            "departureAirportName": "Chongqing",
                            "arrivalDate": "2017-12-24",
                            "arrivalTime": "14:10:00",
                            "arrivalTerminal": "--",
                            "arrivalGate": "",
                            "arrivalAirportCode": "TSN",
                            "arrivalAirportName": "Wanxian",
                            "aircraftCode": "195",
                            "aircraftName": "Airbus_195",
                            "stopQuantity": 0,
                            "stopCitys": []
                        }
                    ],
                    "airItineraryPrices": [
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/4",
                            "fareFamilyCode": "BUNDLE",
                            "fareFamilyName": "零花钱",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "无免费托运行李额度",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/4",
                            "fareFamilyCode": "BASIC",
                            "fareFamilyName": "超优惠",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "无免费托运行李额度",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/8",
                            "fareFamilyCode": "PLUS",
                            "fareFamilyName": "超级旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务;       \n<br>专享呼叫电话;       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "400",
                                "baseFareCurrency": "CNY",
                                "totalFare": "400",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "400",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "PI/LXJ",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/9",
                            "fareFamilyCode": "FLEX",
                            "fareFamilyName": "超自由",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 20%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 30%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 50%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 15%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 25%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 40%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 60%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "10KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/10",
                            "fareFamilyCode": "LUXE",
                            "fareFamilyName": "尊享旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务；       \n<br>优先行李；       \n<br>专享呼叫电话；       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "优先值机；       \n<br>头等舱通道过安检；       \n<br>头等舱休息室。",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "520",
                                "baseFareCurrency": "CNY",
                                "totalFare": "520",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "520",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CI/LXJ",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }
                    ]
                },
                {
                    "id": "5a03ab5185b5917f45b708ec/itineraries/4",
                    "duration": 40,
                    "arrivalOffset": 0,
                    "flightSegments": [
                        {
                            "id": "GX_6903_2017-12-04_CKG_TSN",
                            "flightNumber": "6903",
                            "duration": 40,
                            "layover": 0,
                            "marketingAirlineCode": "GX",
                            "marketingAirlineName": "Pan American Airways Corp. ",
                            "operatingAirlineCode": "",
                            "operatingAirlineName": "",
                            "departureDate": "2017-12-24",
                            "departureTime": "14:11:00",
                            "departureTerminal": "--",
                            "departureGate": "",
                            "departureAirportCode": "CKG",
                            "departureAirportName": "Chongqing",
                            "arrivalDate": "2017-12-24",
                            "arrivalTime": "17:10:00",
                            "arrivalTerminal": "--",
                            "arrivalGate": "",
                            "arrivalAirportCode": "TSN",
                            "arrivalAirportName": "Wanxian",
                            "aircraftCode": "195",
                            "aircraftName": "Airbus_195",
                            "stopQuantity": 0,
                            "stopCitys": []
                        }
                    ],
                    "airItineraryPrices": [
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/4",
                            "fareFamilyCode": "BUNDLE",
                            "fareFamilyName": "零花钱",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "无免费托运行李额度",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/4",
                            "fareFamilyCode": "BASIC",
                            "fareFamilyName": "超优惠",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "无免费托运行李额度",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/8",
                            "fareFamilyCode": "PLUS",
                            "fareFamilyName": "超级旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务;       \n<br>专享呼叫电话;       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "400",
                                "baseFareCurrency": "CNY",
                                "totalFare": "400",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "400",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "PI/LXJ",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/9",
                            "fareFamilyCode": "FLEX",
                            "fareFamilyName": "超自由",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 20%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 30%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 50%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 15%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 25%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 40%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 60%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "10KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/10",
                            "fareFamilyCode": "LUXE",
                            "fareFamilyName": "尊享旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务；       \n<br>优先行李；       \n<br>专享呼叫电话；       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "优先值机；       \n<br>头等舱通道过安检；       \n<br>头等舱休息室。",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "520",
                                "baseFareCurrency": "CNY",
                                "totalFare": "520",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "520",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CI/LXJ",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }
                    ]
                },
                {
                    "id": "5a03ab5185b5917f45b708ec/itineraries/4",
                    "duration": 40,
                    "arrivalOffset": 0,
                    "flightSegments": [
                        {
                            "id": "GX_6903_2017-12-04_CKG_TSN",
                            "flightNumber": "6903",
                            "duration": 40,
                            "layover": 0,
                            "marketingAirlineCode": "GX",
                            "marketingAirlineName": "Pan American Airways Corp. ",
                            "operatingAirlineCode": "",
                            "operatingAirlineName": "",
                            "departureDate": "2017-12-24",
                            "departureTime": "17:11:00",
                            "departureTerminal": "--",
                            "departureGate": "",
                            "departureAirportCode": "CKG",
                            "departureAirportName": "Chongqing",
                            "arrivalDate": "2017-12-24",
                            "arrivalTime": "19:50:00",
                            "arrivalTerminal": "--",
                            "arrivalGate": "",
                            "arrivalAirportCode": "TSN",
                            "arrivalAirportName": "Wanxian",
                            "aircraftCode": "195",
                            "aircraftName": "Airbus_195",
                            "stopQuantity": 0,
                            "stopCitys": []
                        }
                    ],
                    "airItineraryPrices": [
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/4",
                            "fareFamilyCode": "BUNDLE",
                            "fareFamilyName": "零花钱",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "无免费托运行李额度",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/4",
                            "fareFamilyCode": "BASIC",
                            "fareFamilyName": "超优惠",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "无免费托运行李额度",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/8",
                            "fareFamilyCode": "PLUS",
                            "fareFamilyName": "超级旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务;       \n<br>专享呼叫电话;       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "400",
                                "baseFareCurrency": "CNY",
                                "totalFare": "400",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "400",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "PI/LXJ",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/9",
                            "fareFamilyCode": "FLEX",
                            "fareFamilyName": "超自由",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 20%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 30%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 50%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 15%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 25%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 40%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 60%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "10KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/10",
                            "fareFamilyCode": "LUXE",
                            "fareFamilyName": "尊享旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务；       \n<br>优先行李；       \n<br>专享呼叫电话；       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "优先值机；       \n<br>头等舱通道过安检；       \n<br>头等舱休息室。",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "520",
                                "baseFareCurrency": "CNY",
                                "totalFare": "520",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "520",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CI/LXJ",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }
                    ]
                },
                {
                    "id": "5a03ab5185b5917f45b708ec/itineraries/4",
                    "duration": 40,
                    "arrivalOffset": 0,
                    "flightSegments": [
                        {
                            "id": "GX_6903_2017-12-04_CKG_TSN",
                            "flightNumber": "6903",
                            "duration": 40,
                            "layover": 0,
                            "marketingAirlineCode": "GX",
                            "marketingAirlineName": "Pan American Airways Corp. ",
                            "operatingAirlineCode": "",
                            "operatingAirlineName": "",
                            "departureDate": "2017-12-24",
                            "departureTime": "20:41:00",
                            "departureTerminal": "--",
                            "departureGate": "",
                            "departureAirportCode": "CKG",
                            "departureAirportName": "Chongqing",
                            "arrivalDate": "2017-12-24",
                            "arrivalTime": "23:20:00",
                            "arrivalTerminal": "--",
                            "arrivalGate": "",
                            "arrivalAirportCode": "TSN",
                            "arrivalAirportName": "Wanxian",
                            "aircraftCode": "195",
                            "aircraftName": "Airbus_195",
                            "stopQuantity": 0,
                            "stopCitys": []
                        }
                    ],
                    "airItineraryPrices": [
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/4",
                            "fareFamilyCode": "BUNDLE",
                            "fareFamilyName": "零花钱",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "无免费托运行李额度",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/4",
                            "fareFamilyCode": "BASIC",
                            "fareFamilyName": "超优惠",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "无免费托运行李额度",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/8",
                            "fareFamilyCode": "PLUS",
                            "fareFamilyName": "超级旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务;       \n<br>专享呼叫电话;       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "400",
                                "baseFareCurrency": "CNY",
                                "totalFare": "400",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "400",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "PI/LXJ",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/9",
                            "fareFamilyCode": "FLEX",
                            "fareFamilyName": "超自由",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 20%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 30%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 50%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 15%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 25%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 40%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 60%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "10KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 4,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        },
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/10",
                            "fareFamilyCode": "LUXE",
                            "fareFamilyName": "尊享旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务；       \n<br>优先行李；       \n<br>专享呼叫电话；       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "优先值机；       \n<br>头等舱通道过安检；       \n<br>头等舱休息室。",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "520",
                                "baseFareCurrency": "CNY",
                                "totalFare": "520",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "520",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CI/LXJ",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }
                    ]
                }
            ]
        },
        {
            "origin": "TSN",
            "destination": "CKG",
            "departureDate": "2017-12-28 00:00:00",
            "originName": "Wanxian",
            "destinationName": "",
            "departureDates": [
                {"date": "2017-12-23", "minPrice": "230", "currency": "CNY"}, {
                    "date": "2017-12-24",
                    "minPrice": "230",
                    "currency": "CNY"
                }, {"date": "2017-12-25", "minPrice": "230", "currency": "CNY"}, {
                    "date": "2017-12-26",
                    "minPrice": "230",
                    "currency": "CNY"
                }, {"date": "2017-12-27", "minPrice": "230", "currency": "CNY"}, {
                    "date": "2017-12-28",
                    "minPrice": "230",
                    "currency": "CNY"
                }, {"date": "2017-12-29", "minPrice": "230", "currency": "CNY"}],
            "airItineraries": [
                {
                    "id": "5a03ab5185b5917f45b708ec/itineraries/11",
                    "duration": 40,
                    "arrivalOffset": 0,
                    "flightSegments": [
                        {
                            "id": "GX_6904_2017-12-12_TSN_CKG",
                            "flightNumber": "6904",
                            "duration": 40,
                            "layover": 0,
                            "marketingAirlineCode": "GX",
                            "marketingAirlineName": "Pan American Airways Corp. ",
                            "operatingAirlineCode": "",
                            "operatingAirlineName": "",
                            "departureDate": "2017-12-12",
                            "departureTime": "11:20:00",
                            "departureTerminal": "--",
                            "departureGate": "",
                            "departureAirportCode": "TSN",
                            "departureAirportName": "Wanxian",
                            "arrivalDate": "2017-12-12",
                            "arrivalTime": "14:00:00",
                            "arrivalTerminal": "--",
                            "arrivalGate": "",
                            "arrivalAirportCode": "CKG",
                            "arrivalAirportName": "Chongqing",
                            "aircraftCode": "195",
                            "aircraftName": "Airbus_195",
                            "stopQuantity": 0,
                            "stopCitys": []
                        }
                    ],
                    "airItineraryPrices": [
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/14",
                            "fareFamilyCode": "BASIC",
                            "fareFamilyName": "超优惠",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "无免费托运行李额度",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }, {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/18",
                            "fareFamilyCode": "PLUS",
                            "fareFamilyName": "超级旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务;       \n<br>专享呼叫电话;       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "400",
                                "baseFareCurrency": "CNY",
                                "totalFare": "400",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "400",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "PI/LXJ",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }, {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/19",
                            "fareFamilyCode": "FLEX",
                            "fareFamilyName": "超自由",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 20%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 30%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 50%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 15%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 25%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 40%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 60%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "10KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }, {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/20",
                            "fareFamilyCode": "LUXE",
                            "fareFamilyName": "尊享旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务；       \n<br>优先行李；       \n<br>专享呼叫电话；       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "优先值机；       \n<br>头等舱通道过安检；       \n<br>头等舱休息室。",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "520",
                                "baseFareCurrency": "CNY",
                                "totalFare": "520",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "520",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CI/LXJ",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }]
                },
                {
                    "id": "5a03ab5185b5917f45b708ec/itineraries/11",
                    "duration": 40,
                    "arrivalOffset": 0,
                    "flightSegments": [
                        {
                            "id": "GX_6904_2017-12-12_TSN_CKG",
                            "flightNumber": "6904",
                            "duration": 40,
                            "layover": 0,
                            "marketingAirlineCode": "GX",
                            "marketingAirlineName": "Pan American Airways Corp. ",
                            "operatingAirlineCode": "",
                            "operatingAirlineName": "",
                            "departureDate": "2017-12-12",
                            "departureTime": "14:20:00",
                            "departureTerminal": "--",
                            "departureGate": "",
                            "departureAirportCode": "TSN",
                            "departureAirportName": "Wanxian",
                            "arrivalDate": "2017-12-12",
                            "arrivalTime": "16:30:00",
                            "arrivalTerminal": "--",
                            "arrivalGate": "",
                            "arrivalAirportCode": "CKG",
                            "arrivalAirportName": "Chongqing",
                            "aircraftCode": "195",
                            "aircraftName": "Airbus_195",
                            "stopQuantity": 0,
                            "stopCitys": []
                        }
                    ],
                    "airItineraryPrices": [
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/14",
                            "fareFamilyCode": "BASIC",
                            "fareFamilyName": "超优惠",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "无免费托运行李额度",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }, {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/18",
                            "fareFamilyCode": "PLUS",
                            "fareFamilyName": "超级旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务;       \n<br>专享呼叫电话;       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "400",
                                "baseFareCurrency": "CNY",
                                "totalFare": "400",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "400",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "PI/LXJ",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }, {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/19",
                            "fareFamilyCode": "FLEX",
                            "fareFamilyName": "超自由",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 20%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 30%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 50%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 15%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 25%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 40%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 60%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "10KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }, {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/20",
                            "fareFamilyCode": "LUXE",
                            "fareFamilyName": "尊享旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务；       \n<br>优先行李；       \n<br>专享呼叫电话；       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "优先值机；       \n<br>头等舱通道过安检；       \n<br>头等舱休息室。",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "520",
                                "baseFareCurrency": "CNY",
                                "totalFare": "520",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "520",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CI/LXJ",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }]
                },
                {
                    "id": "5a03ab5185b5917f45b708ec/itineraries/11",
                    "duration": 40,
                    "arrivalOffset": 0,
                    "flightSegments": [
                        {
                            "id": "GX_6904_2017-12-12_TSN_CKG",
                            "flightNumber": "6904",
                            "duration": 40,
                            "layover": 0,
                            "marketingAirlineCode": "GX",
                            "marketingAirlineName": "Pan American Airways Corp. ",
                            "operatingAirlineCode": "",
                            "operatingAirlineName": "",
                            "departureDate": "2017-12-12",
                            "departureTime": "17:20:00",
                            "departureTerminal": "--",
                            "departureGate": "",
                            "departureAirportCode": "TSN",
                            "departureAirportName": "Wanxian",
                            "arrivalDate": "2017-12-12",
                            "arrivalTime": "19:10:00",
                            "arrivalTerminal": "--",
                            "arrivalGate": "",
                            "arrivalAirportCode": "CKG",
                            "arrivalAirportName": "Chongqing",
                            "aircraftCode": "195",
                            "aircraftName": "Airbus_195",
                            "stopQuantity": 0,
                            "stopCitys": []
                        }
                    ],
                    "airItineraryPrices": [
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/14",
                            "fareFamilyCode": "BASIC",
                            "fareFamilyName": "超优惠",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "无免费托运行李额度",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }, {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/18",
                            "fareFamilyCode": "PLUS",
                            "fareFamilyName": "超级旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务;       \n<br>专享呼叫电话;       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "400",
                                "baseFareCurrency": "CNY",
                                "totalFare": "400",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "400",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "PI/LXJ",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }, {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/19",
                            "fareFamilyCode": "FLEX",
                            "fareFamilyName": "超自由",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 20%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 30%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 50%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 15%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 25%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 40%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 60%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "10KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }, {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/20",
                            "fareFamilyCode": "LUXE",
                            "fareFamilyName": "尊享旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务；       \n<br>优先行李；       \n<br>专享呼叫电话；       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "优先值机；       \n<br>头等舱通道过安检；       \n<br>头等舱休息室。",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "520",
                                "baseFareCurrency": "CNY",
                                "totalFare": "520",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "520",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CI/LXJ",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }]
                },
                {
                    "id": "5a03ab5185b5917f45b708ec/itineraries/11",
                    "duration": 40,
                    "arrivalOffset": 0,
                    "flightSegments": [
                        {
                            "id": "GX_6904_2017-12-12_TSN_CKG",
                            "flightNumber": "6904",
                            "duration": 40,
                            "layover": 0,
                            "marketingAirlineCode": "GX",
                            "marketingAirlineName": "Pan American Airways Corp. ",
                            "operatingAirlineCode": "",
                            "operatingAirlineName": "",
                            "departureDate": "2017-12-12",
                            "departureTime": "20:20:00",
                            "departureTerminal": "--",
                            "departureGate": "",
                            "departureAirportCode": "TSN",
                            "departureAirportName": "Wanxian",
                            "arrivalDate": "2017-12-12",
                            "arrivalTime": "22:50:00",
                            "arrivalTerminal": "--",
                            "arrivalGate": "",
                            "arrivalAirportCode": "CKG",
                            "arrivalAirportName": "Chongqing",
                            "aircraftCode": "195",
                            "aircraftName": "Airbus_195",
                            "stopQuantity": 0,
                            "stopCitys": []
                        }
                    ],
                    "airItineraryPrices": [
                        {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/14",
                            "fareFamilyCode": "BASIC",
                            "fareFamilyName": "超优惠",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "无免费托运行李额度",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "J/15",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "J",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }, {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/18",
                            "fareFamilyCode": "PLUS",
                            "fareFamilyName": "超级旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务;       \n<br>专享呼叫电话;       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "400",
                                "baseFareCurrency": "CNY",
                                "totalFare": "400",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "400",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "PI/LXJ",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "P",
                                    "cabinClass": "F",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }, {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/19",
                            "fareFamilyCode": "FLEX",
                            "fareFamilyName": "超自由",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 20%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 30%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 50%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 15%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 25%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 40%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 60%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "10KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "无",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "not included",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "730",
                                "baseFareCurrency": "CNY",
                                "totalFare": "730",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "730",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "Q/47",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "160",
                                "baseFareCurrency": "CNY",
                                "totalFare": "160",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "160",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "YIN10",
                                    "bookingClass": "Q",
                                    "cabinClass": "Y",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }, {
                            "id": "5a03ab5185b5917f45b708ec/itinerary-prices/20",
                            "fareFamilyCode": "LUXE",
                            "fareFamilyName": "尊享旅行家",
                            "benefits": [{
                                "id": "ENDORSEMENT",
                                "code": "ENDORSEMENT",
                                "name": "自愿签转",
                                "text": "不允许签转",
                                "language": "zh_CN"
                            }, {
                                "id": "CHANGE_FEE",
                                "code": "CHANGE_FEE",
                                "name": "变更服务费",
                                "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                                "language": "zh_CN"
                            }, {
                                "id": "REFUND_FEE",
                                "code": "REFUND_FEE",
                                "name": "退票费",
                                "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                                "language": "zh_CN"
                            }, {
                                "id": "BAGGAGE_ALLOWANCE",
                                "code": "BAGGAGE_ALLOWANCE",
                                "name": "免费托运行李",
                                "text": "30KG免费托运行李",
                                "language": "zh_CN"
                            }, {
                                "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                                "name": "免费非托运行李",
                                "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                                "language": "zh_CN"
                            }, {
                                "id": "MEAL_SERVICE",
                                "code": "MEAL_SERVICE",
                                "name": "免费餐饮服务",
                                "text": "免费餐饮",
                                "language": "zh_CN"
                            }, {
                                "id": "ADDITIONAL_SERVICE",
                                "code": "ADDITIONAL_SERVICE",
                                "name": "增值服务",
                                "text": "一次免费信息变更服务；       \n<br>优先行李；       \n<br>专享呼叫电话；       \n<br>经济舱前三排座椅。",
                                "language": "zh_CN"
                            }, {
                                "id": "INFLIGHT_SERVICE",
                                "code": "INFLIGHT_SERVICE",
                                "name": "客舱服务",
                                "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                                "language": "zh_CN"
                            }, {
                                "id": "AIRPORT_SERVICE",
                                "code": "AIRPORT_SERVICE",
                                "name": "地面服务",
                                "text": "优先值机；       \n<br>头等舱通道过安检；       \n<br>头等舱休息室。",
                                "language": "zh_CN"
                            }],
                            "travelerPrices": [{
                                "travelerType": "ADT",
                                "baseFare": "520",
                                "baseFareCurrency": "CNY",
                                "totalFare": "520",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "520",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CI/LXJ",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "CNN",
                                "baseFare": "1170",
                                "baseFareCurrency": "CNY",
                                "totalFare": "1170",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "1170",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CCH50",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }, {
                                "travelerType": "INF",
                                "baseFare": "230",
                                "baseFareCurrency": "CNY",
                                "totalFare": "230",
                                "totalFareCurrency": "CNY",
                                "farePrices": [{
                                    "baseFare": "230",
                                    "baseFareCurrency": "CNY",
                                    "basisFareCode": "CIN10",
                                    "bookingClass": "C",
                                    "cabinClass": "C",
                                    "inventoryQuantity": 5,
                                    "inventoryStatus": "",
                                    "totalFare": "",
                                    "totalFareCurrency": ""
                                }]
                            }]
                        }]
                }
            ]
        },
        {
            "origin": "TSN",
            "destination": "CKG",
            "departureDate": "2017-12-12 00:00:00",
            "originName": "Wanxian",
            "destinationName": "",
            "departureDates": [{"date": "2017-12-09", "minPrice": "230", "currency": "CNY"}, {
                "date": "2017-12-10",
                "minPrice": "230",
                "currency": "CNY"
            }, {"date": "2017-12-11", "minPrice": "230", "currency": "CNY"}, {
                "date": "2017-12-12",
                "minPrice": "230",
                "currency": "CNY"
            }, {"date": "2017-12-13", "minPrice": "230", "currency": "CNY"}, {
                "date": "2017-12-14",
                "minPrice": "230",
                "currency": "CNY"
            }, {"date": "2017-12-15", "minPrice": "230", "currency": "CNY"}],
            "airItineraries": [{
                "id": "5a03ab5185b5917f45b708ec/itineraries/11",
                "duration": 40,
                "arrivalOffset": 0,
                "flightSegments": [{
                    "id": "GX_6904_2017-12-12_TSN_CKG",
                    "flightNumber": "6904",
                    "duration": 40,
                    "layover": 0,
                    "marketingAirlineCode": "GX",
                    "marketingAirlineName": "Pan American Airways Corp. ",
                    "operatingAirlineCode": "",
                    "operatingAirlineName": "",
                    "departureDate": "2017-12-12",
                    "departureTime": "21:20:00",
                    "departureTerminal": "--",
                    "departureGate": "",
                    "departureAirportCode": "TSN",
                    "departureAirportName": "Wanxian",
                    "arrivalDate": "2017-12-12",
                    "arrivalTime": "22:00:00",
                    "arrivalTerminal": "--",
                    "arrivalGate": "",
                    "arrivalAirportCode": "CKG",
                    "arrivalAirportName": "Chongqing",
                    "aircraftCode": "195",
                    "aircraftName": "Airbus_195",
                    "stopQuantity": 0,
                    "stopCitys": []
                }],
                "airItineraryPrices": [{
                    "id": "5a03ab5185b5917f45b708ec/itinerary-prices/14",
                    "fareFamilyCode": "BASIC",
                    "fareFamilyName": "超优惠",
                    "benefits": [{
                        "id": "ENDORSEMENT",
                        "code": "ENDORSEMENT",
                        "name": "自愿签转",
                        "text": "不允许签转",
                        "language": "zh_CN"
                    }, {
                        "id": "CHANGE_FEE",
                        "code": "CHANGE_FEE",
                        "name": "变更服务费",
                        "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                        "language": "zh_CN"
                    }, {
                        "id": "REFUND_FEE",
                        "code": "REFUND_FEE",
                        "name": "退票费",
                        "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                        "language": "zh_CN"
                    }, {
                        "id": "BAGGAGE_ALLOWANCE",
                        "code": "BAGGAGE_ALLOWANCE",
                        "name": "免费托运行李",
                        "text": "无免费托运行李额度",
                        "language": "zh_CN"
                    }, {
                        "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                        "name": "免费非托运行李",
                        "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                        "language": "zh_CN"
                    }, {
                        "id": "MEAL_SERVICE",
                        "code": "MEAL_SERVICE",
                        "name": "免费餐饮服务",
                        "text": "无",
                        "language": "zh_CN"
                    }, {
                        "id": "ADDITIONAL_SERVICE",
                        "code": "ADDITIONAL_SERVICE",
                        "name": "增值服务",
                        "text": "not included",
                        "language": "zh_CN"
                    }, {
                        "id": "INFLIGHT_SERVICE",
                        "code": "INFLIGHT_SERVICE",
                        "name": "客舱服务",
                        "text": "not included",
                        "language": "zh_CN"
                    }, {
                        "id": "AIRPORT_SERVICE",
                        "code": "AIRPORT_SERVICE",
                        "name": "地面服务",
                        "text": "not included",
                        "language": "zh_CN"
                    }],
                    "travelerPrices": [{
                        "travelerType": "ADT",
                        "baseFare": "230",
                        "baseFareCurrency": "CNY",
                        "totalFare": "230",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "230",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "J/15",
                            "bookingClass": "J",
                            "cabinClass": "C",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }, {
                        "travelerType": "CNN",
                        "baseFare": "230",
                        "baseFareCurrency": "CNY",
                        "totalFare": "230",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "230",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "J/15",
                            "bookingClass": "J",
                            "cabinClass": "C",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }, {
                        "travelerType": "INF",
                        "baseFare": "160",
                        "baseFareCurrency": "CNY",
                        "totalFare": "160",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "160",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "YIN10",
                            "bookingClass": "J",
                            "cabinClass": "C",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }]
                }, {
                    "id": "5a03ab5185b5917f45b708ec/itinerary-prices/18",
                    "fareFamilyCode": "PLUS",
                    "fareFamilyName": "超级旅行家",
                    "benefits": [{
                        "id": "ENDORSEMENT",
                        "code": "ENDORSEMENT",
                        "name": "自愿签转",
                        "text": "不允许签转",
                        "language": "zh_CN"
                    }, {
                        "id": "CHANGE_FEE",
                        "code": "CHANGE_FEE",
                        "name": "变更服务费",
                        "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                        "language": "zh_CN"
                    }, {
                        "id": "REFUND_FEE",
                        "code": "REFUND_FEE",
                        "name": "退票费",
                        "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                        "language": "zh_CN"
                    }, {
                        "id": "BAGGAGE_ALLOWANCE",
                        "code": "BAGGAGE_ALLOWANCE",
                        "name": "免费托运行李",
                        "text": "30KG免费托运行李",
                        "language": "zh_CN"
                    }, {
                        "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                        "name": "免费非托运行李",
                        "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                        "language": "zh_CN"
                    }, {
                        "id": "MEAL_SERVICE",
                        "code": "MEAL_SERVICE",
                        "name": "免费餐饮服务",
                        "text": "免费餐饮",
                        "language": "zh_CN"
                    }, {
                        "id": "ADDITIONAL_SERVICE",
                        "code": "ADDITIONAL_SERVICE",
                        "name": "增值服务",
                        "text": "一次免费信息变更服务;       \n<br>专享呼叫电话;       \n<br>经济舱前三排座椅。",
                        "language": "zh_CN"
                    }, {
                        "id": "INFLIGHT_SERVICE",
                        "code": "INFLIGHT_SERVICE",
                        "name": "客舱服务",
                        "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                        "language": "zh_CN"
                    }, {
                        "id": "AIRPORT_SERVICE",
                        "code": "AIRPORT_SERVICE",
                        "name": "地面服务",
                        "text": "not included",
                        "language": "zh_CN"
                    }],
                    "travelerPrices": [{
                        "travelerType": "ADT",
                        "baseFare": "400",
                        "baseFareCurrency": "CNY",
                        "totalFare": "400",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "400",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "PI/LXJ",
                            "bookingClass": "P",
                            "cabinClass": "F",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }, {
                        "travelerType": "CNN",
                        "baseFare": "1170",
                        "baseFareCurrency": "CNY",
                        "totalFare": "1170",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "1170",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "CCH50",
                            "bookingClass": "P",
                            "cabinClass": "F",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }, {
                        "travelerType": "INF",
                        "baseFare": "230",
                        "baseFareCurrency": "CNY",
                        "totalFare": "230",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "230",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "CIN10",
                            "bookingClass": "P",
                            "cabinClass": "F",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }]
                }, {
                    "id": "5a03ab5185b5917f45b708ec/itinerary-prices/19",
                    "fareFamilyCode": "FLEX",
                    "fareFamilyName": "超自由",
                    "benefits": [{
                        "id": "ENDORSEMENT",
                        "code": "ENDORSEMENT",
                        "name": "自愿签转",
                        "text": "不允许签转",
                        "language": "zh_CN"
                    }, {
                        "id": "CHANGE_FEE",
                        "code": "CHANGE_FEE",
                        "name": "变更服务费",
                        "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 20%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 30%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 50%。",
                        "language": "zh_CN"
                    }, {
                        "id": "REFUND_FEE",
                        "code": "REFUND_FEE",
                        "name": "退票费",
                        "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 15%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 25%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 40%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 60%。",
                        "language": "zh_CN"
                    }, {
                        "id": "BAGGAGE_ALLOWANCE",
                        "code": "BAGGAGE_ALLOWANCE",
                        "name": "免费托运行李",
                        "text": "10KG免费托运行李",
                        "language": "zh_CN"
                    }, {
                        "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                        "name": "免费非托运行李",
                        "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                        "language": "zh_CN"
                    }, {
                        "id": "MEAL_SERVICE",
                        "code": "MEAL_SERVICE",
                        "name": "免费餐饮服务",
                        "text": "无",
                        "language": "zh_CN"
                    }, {
                        "id": "ADDITIONAL_SERVICE",
                        "code": "ADDITIONAL_SERVICE",
                        "name": "增值服务",
                        "text": "not included",
                        "language": "zh_CN"
                    }, {
                        "id": "INFLIGHT_SERVICE",
                        "code": "INFLIGHT_SERVICE",
                        "name": "客舱服务",
                        "text": "not included",
                        "language": "zh_CN"
                    }, {
                        "id": "AIRPORT_SERVICE",
                        "code": "AIRPORT_SERVICE",
                        "name": "地面服务",
                        "text": "not included",
                        "language": "zh_CN"
                    }],
                    "travelerPrices": [{
                        "travelerType": "ADT",
                        "baseFare": "730",
                        "baseFareCurrency": "CNY",
                        "totalFare": "730",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "730",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "Q/47",
                            "bookingClass": "Q",
                            "cabinClass": "Y",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }, {
                        "travelerType": "CNN",
                        "baseFare": "730",
                        "baseFareCurrency": "CNY",
                        "totalFare": "730",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "730",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "Q/47",
                            "bookingClass": "Q",
                            "cabinClass": "Y",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }, {
                        "travelerType": "INF",
                        "baseFare": "160",
                        "baseFareCurrency": "CNY",
                        "totalFare": "160",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "160",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "YIN10",
                            "bookingClass": "Q",
                            "cabinClass": "Y",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }]
                }, {
                    "id": "5a03ab5185b5917f45b708ec/itinerary-prices/20",
                    "fareFamilyCode": "LUXE",
                    "fareFamilyName": "尊享旅行家",
                    "benefits": [{
                        "id": "ENDORSEMENT",
                        "code": "ENDORSEMENT",
                        "name": "自愿签转",
                        "text": "不允许签转",
                        "language": "zh_CN"
                    }, {
                        "id": "CHANGE_FEE",
                        "code": "CHANGE_FEE",
                        "name": "变更服务费",
                        "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                        "language": "zh_CN"
                    }, {
                        "id": "REFUND_FEE",
                        "code": "REFUND_FEE",
                        "name": "退票费",
                        "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                        "language": "zh_CN"
                    }, {
                        "id": "BAGGAGE_ALLOWANCE",
                        "code": "BAGGAGE_ALLOWANCE",
                        "name": "免费托运行李",
                        "text": "30KG免费托运行李",
                        "language": "zh_CN"
                    }, {
                        "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                        "name": "免费非托运行李",
                        "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                        "language": "zh_CN"
                    }, {
                        "id": "MEAL_SERVICE",
                        "code": "MEAL_SERVICE",
                        "name": "免费餐饮服务",
                        "text": "免费餐饮",
                        "language": "zh_CN"
                    }, {
                        "id": "ADDITIONAL_SERVICE",
                        "code": "ADDITIONAL_SERVICE",
                        "name": "增值服务",
                        "text": "一次免费信息变更服务；       \n<br>优先行李；       \n<br>专享呼叫电话；       \n<br>经济舱前三排座椅。",
                        "language": "zh_CN"
                    }, {
                        "id": "INFLIGHT_SERVICE",
                        "code": "INFLIGHT_SERVICE",
                        "name": "客舱服务",
                        "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                        "language": "zh_CN"
                    }, {
                        "id": "AIRPORT_SERVICE",
                        "code": "AIRPORT_SERVICE",
                        "name": "地面服务",
                        "text": "优先值机；       \n<br>头等舱通道过安检；       \n<br>头等舱休息室。",
                        "language": "zh_CN"
                    }],
                    "travelerPrices": [{
                        "travelerType": "ADT",
                        "baseFare": "520",
                        "baseFareCurrency": "CNY",
                        "totalFare": "520",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "520",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "CI/LXJ",
                            "bookingClass": "C",
                            "cabinClass": "C",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }, {
                        "travelerType": "CNN",
                        "baseFare": "1170",
                        "baseFareCurrency": "CNY",
                        "totalFare": "1170",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "1170",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "CCH50",
                            "bookingClass": "C",
                            "cabinClass": "C",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }, {
                        "travelerType": "INF",
                        "baseFare": "230",
                        "baseFareCurrency": "CNY",
                        "totalFare": "230",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "230",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "CIN10",
                            "bookingClass": "C",
                            "cabinClass": "C",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }]
                }]
            }]
        },
        {
            "origin": "TSN",
            "destination": "CKG",
            "departureDate": "2017-12-12 00:00:00",
            "originName": "Wanxian",
            "destinationName": "",
            "departureDates": [{"date": "2017-12-09", "minPrice": "230", "currency": "CNY"}, {
                "date": "2017-12-10",
                "minPrice": "230",
                "currency": "CNY"
            }, {"date": "2017-12-11", "minPrice": "230", "currency": "CNY"}, {
                "date": "2017-12-12",
                "minPrice": "230",
                "currency": "CNY"
            }, {"date": "2017-12-13", "minPrice": "230", "currency": "CNY"}, {
                "date": "2017-12-14",
                "minPrice": "230",
                "currency": "CNY"
            }, {"date": "2017-12-15", "minPrice": "230", "currency": "CNY"}],
            "airItineraries": [{
                "id": "5a03ab5185b5917f45b708ec/itineraries/11",
                "duration": 40,
                "arrivalOffset": 0,
                "flightSegments": [{
                    "id": "GX_6904_2017-12-12_TSN_CKG",
                    "flightNumber": "6904",
                    "duration": 40,
                    "layover": 0,
                    "marketingAirlineCode": "GX",
                    "marketingAirlineName": "Pan American Airways Corp. ",
                    "operatingAirlineCode": "",
                    "operatingAirlineName": "",
                    "departureDate": "2017-12-12",
                    "departureTime": "21:20:00",
                    "departureTerminal": "--",
                    "departureGate": "",
                    "departureAirportCode": "TSN",
                    "departureAirportName": "Wanxian",
                    "arrivalDate": "2017-12-12",
                    "arrivalTime": "22:00:00",
                    "arrivalTerminal": "--",
                    "arrivalGate": "",
                    "arrivalAirportCode": "CKG",
                    "arrivalAirportName": "Chongqing",
                    "aircraftCode": "195",
                    "aircraftName": "Airbus_195",
                    "stopQuantity": 0,
                    "stopCitys": []
                }],
                "airItineraryPrices": [{
                    "id": "5a03ab5185b5917f45b708ec/itinerary-prices/14",
                    "fareFamilyCode": "BASIC",
                    "fareFamilyName": "超优惠",
                    "benefits": [{
                        "id": "ENDORSEMENT",
                        "code": "ENDORSEMENT",
                        "name": "自愿签转",
                        "text": "不允许签转",
                        "language": "zh_CN"
                    }, {
                        "id": "CHANGE_FEE",
                        "code": "CHANGE_FEE",
                        "name": "变更服务费",
                        "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 20%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 40%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 60%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 不得变更，按自愿退票办理。",
                        "language": "zh_CN"
                    }, {
                        "id": "REFUND_FEE",
                        "code": "REFUND_FEE",
                        "name": "退票费",
                        "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                        "language": "zh_CN"
                    }, {
                        "id": "BAGGAGE_ALLOWANCE",
                        "code": "BAGGAGE_ALLOWANCE",
                        "name": "免费托运行李",
                        "text": "无免费托运行李额度",
                        "language": "zh_CN"
                    }, {
                        "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                        "name": "免费非托运行李",
                        "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                        "language": "zh_CN"
                    }, {
                        "id": "MEAL_SERVICE",
                        "code": "MEAL_SERVICE",
                        "name": "免费餐饮服务",
                        "text": "无",
                        "language": "zh_CN"
                    }, {
                        "id": "ADDITIONAL_SERVICE",
                        "code": "ADDITIONAL_SERVICE",
                        "name": "增值服务",
                        "text": "not included",
                        "language": "zh_CN"
                    }, {
                        "id": "INFLIGHT_SERVICE",
                        "code": "INFLIGHT_SERVICE",
                        "name": "客舱服务",
                        "text": "not included",
                        "language": "zh_CN"
                    }, {
                        "id": "AIRPORT_SERVICE",
                        "code": "AIRPORT_SERVICE",
                        "name": "地面服务",
                        "text": "not included",
                        "language": "zh_CN"
                    }],
                    "travelerPrices": [{
                        "travelerType": "ADT",
                        "baseFare": "230",
                        "baseFareCurrency": "CNY",
                        "totalFare": "230",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "230",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "J/15",
                            "bookingClass": "J",
                            "cabinClass": "C",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }, {
                        "travelerType": "CNN",
                        "baseFare": "230",
                        "baseFareCurrency": "CNY",
                        "totalFare": "230",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "230",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "J/15",
                            "bookingClass": "J",
                            "cabinClass": "C",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }, {
                        "travelerType": "INF",
                        "baseFare": "160",
                        "baseFareCurrency": "CNY",
                        "totalFare": "160",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "160",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "YIN10",
                            "bookingClass": "J",
                            "cabinClass": "C",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }]
                }, {
                    "id": "5a03ab5185b5917f45b708ec/itinerary-prices/18",
                    "fareFamilyCode": "PLUS",
                    "fareFamilyName": "超级旅行家",
                    "benefits": [{
                        "id": "ENDORSEMENT",
                        "code": "ENDORSEMENT",
                        "name": "自愿签转",
                        "text": "不允许签转",
                        "language": "zh_CN"
                    }, {
                        "id": "CHANGE_FEE",
                        "code": "CHANGE_FEE",
                        "name": "变更服务费",
                        "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                        "language": "zh_CN"
                    }, {
                        "id": "REFUND_FEE",
                        "code": "REFUND_FEE",
                        "name": "退票费",
                        "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                        "language": "zh_CN"
                    }, {
                        "id": "BAGGAGE_ALLOWANCE",
                        "code": "BAGGAGE_ALLOWANCE",
                        "name": "免费托运行李",
                        "text": "30KG免费托运行李",
                        "language": "zh_CN"
                    }, {
                        "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                        "name": "免费非托运行李",
                        "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                        "language": "zh_CN"
                    }, {
                        "id": "MEAL_SERVICE",
                        "code": "MEAL_SERVICE",
                        "name": "免费餐饮服务",
                        "text": "免费餐饮",
                        "language": "zh_CN"
                    }, {
                        "id": "ADDITIONAL_SERVICE",
                        "code": "ADDITIONAL_SERVICE",
                        "name": "增值服务",
                        "text": "一次免费信息变更服务;       \n<br>专享呼叫电话;       \n<br>经济舱前三排座椅。",
                        "language": "zh_CN"
                    }, {
                        "id": "INFLIGHT_SERVICE",
                        "code": "INFLIGHT_SERVICE",
                        "name": "客舱服务",
                        "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                        "language": "zh_CN"
                    }, {
                        "id": "AIRPORT_SERVICE",
                        "code": "AIRPORT_SERVICE",
                        "name": "地面服务",
                        "text": "not included",
                        "language": "zh_CN"
                    }],
                    "travelerPrices": [{
                        "travelerType": "ADT",
                        "baseFare": "400",
                        "baseFareCurrency": "CNY",
                        "totalFare": "400",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "400",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "PI/LXJ",
                            "bookingClass": "P",
                            "cabinClass": "F",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }, {
                        "travelerType": "CNN",
                        "baseFare": "1170",
                        "baseFareCurrency": "CNY",
                        "totalFare": "1170",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "1170",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "CCH50",
                            "bookingClass": "P",
                            "cabinClass": "F",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }, {
                        "travelerType": "INF",
                        "baseFare": "230",
                        "baseFareCurrency": "CNY",
                        "totalFare": "230",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "230",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "CIN10",
                            "bookingClass": "P",
                            "cabinClass": "F",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }]
                }, {
                    "id": "5a03ab5185b5917f45b708ec/itinerary-prices/19",
                    "fareFamilyCode": "FLEX",
                    "fareFamilyName": "超自由",
                    "benefits": [{
                        "id": "ENDORSEMENT",
                        "code": "ENDORSEMENT",
                        "name": "自愿签转",
                        "text": "不允许签转",
                        "language": "zh_CN"
                    }, {
                        "id": "CHANGE_FEE",
                        "code": "CHANGE_FEE",
                        "name": "变更服务费",
                        "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 20%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 30%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 50%。",
                        "language": "zh_CN"
                    }, {
                        "id": "REFUND_FEE",
                        "code": "REFUND_FEE",
                        "name": "退票费",
                        "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 15%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 25%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 40%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 60%。",
                        "language": "zh_CN"
                    }, {
                        "id": "BAGGAGE_ALLOWANCE",
                        "code": "BAGGAGE_ALLOWANCE",
                        "name": "免费托运行李",
                        "text": "10KG免费托运行李",
                        "language": "zh_CN"
                    }, {
                        "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                        "name": "免费非托运行李",
                        "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                        "language": "zh_CN"
                    }, {
                        "id": "MEAL_SERVICE",
                        "code": "MEAL_SERVICE",
                        "name": "免费餐饮服务",
                        "text": "无",
                        "language": "zh_CN"
                    }, {
                        "id": "ADDITIONAL_SERVICE",
                        "code": "ADDITIONAL_SERVICE",
                        "name": "增值服务",
                        "text": "not included",
                        "language": "zh_CN"
                    }, {
                        "id": "INFLIGHT_SERVICE",
                        "code": "INFLIGHT_SERVICE",
                        "name": "客舱服务",
                        "text": "not included",
                        "language": "zh_CN"
                    }, {
                        "id": "AIRPORT_SERVICE",
                        "code": "AIRPORT_SERVICE",
                        "name": "地面服务",
                        "text": "not included",
                        "language": "zh_CN"
                    }],
                    "travelerPrices": [{
                        "travelerType": "ADT",
                        "baseFare": "730",
                        "baseFareCurrency": "CNY",
                        "totalFare": "730",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "730",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "Q/47",
                            "bookingClass": "Q",
                            "cabinClass": "Y",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }, {
                        "travelerType": "CNN",
                        "baseFare": "730",
                        "baseFareCurrency": "CNY",
                        "totalFare": "730",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "730",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "Q/47",
                            "bookingClass": "Q",
                            "cabinClass": "Y",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }, {
                        "travelerType": "INF",
                        "baseFare": "160",
                        "baseFareCurrency": "CNY",
                        "totalFare": "160",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "160",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "YIN10",
                            "bookingClass": "Q",
                            "cabinClass": "Y",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }]
                }, {
                    "id": "5a03ab5185b5917f45b708ec/itinerary-prices/20",
                    "fareFamilyCode": "LUXE",
                    "fareFamilyName": "尊享旅行家",
                    "benefits": [{
                        "id": "ENDORSEMENT",
                        "code": "ENDORSEMENT",
                        "name": "自愿签转",
                        "text": "不允许签转",
                        "language": "zh_CN"
                    }, {
                        "id": "CHANGE_FEE",
                        "code": "CHANGE_FEE",
                        "name": "变更服务费",
                        "text": "航班计划离站时间14天（含）外 - 免费；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 免费；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 5%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 5%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 10%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 20%。",
                        "language": "zh_CN"
                    }, {
                        "id": "REFUND_FEE",
                        "code": "REFUND_FEE",
                        "name": "退票费",
                        "text": "航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 15%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 20%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 30%。",
                        "language": "zh_CN"
                    }, {
                        "id": "BAGGAGE_ALLOWANCE",
                        "code": "BAGGAGE_ALLOWANCE",
                        "name": "免费托运行李",
                        "text": "30KG免费托运行李",
                        "language": "zh_CN"
                    }, {
                        "id": "CARRY_ON_BAGGAGE_ALLOWANCE",
                        "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                        "name": "免费非托运行李",
                        "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱",
                        "language": "zh_CN"
                    }, {
                        "id": "MEAL_SERVICE",
                        "code": "MEAL_SERVICE",
                        "name": "免费餐饮服务",
                        "text": "免费餐饮",
                        "language": "zh_CN"
                    }, {
                        "id": "ADDITIONAL_SERVICE",
                        "code": "ADDITIONAL_SERVICE",
                        "name": "增值服务",
                        "text": "一次免费信息变更服务；       \n<br>优先行李；       \n<br>专享呼叫电话；       \n<br>经济舱前三排座椅。",
                        "language": "zh_CN"
                    }, {
                        "id": "INFLIGHT_SERVICE",
                        "code": "INFLIGHT_SERVICE",
                        "name": "客舱服务",
                        "text": "迎宾矿泉；       \n<br>毛毯；       \n<br>中文报纸。",
                        "language": "zh_CN"
                    }, {
                        "id": "AIRPORT_SERVICE",
                        "code": "AIRPORT_SERVICE",
                        "name": "地面服务",
                        "text": "优先值机；       \n<br>头等舱通道过安检；       \n<br>头等舱休息室。",
                        "language": "zh_CN"
                    }],
                    "travelerPrices": [{
                        "travelerType": "ADT",
                        "baseFare": "520",
                        "baseFareCurrency": "CNY",
                        "totalFare": "520",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "520",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "CI/LXJ",
                            "bookingClass": "C",
                            "cabinClass": "C",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }, {
                        "travelerType": "CNN",
                        "baseFare": "1170",
                        "baseFareCurrency": "CNY",
                        "totalFare": "1170",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "1170",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "CCH50",
                            "bookingClass": "C",
                            "cabinClass": "C",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }, {
                        "travelerType": "INF",
                        "baseFare": "230",
                        "baseFareCurrency": "CNY",
                        "totalFare": "230",
                        "totalFareCurrency": "CNY",
                        "farePrices": [{
                            "baseFare": "230",
                            "baseFareCurrency": "CNY",
                            "basisFareCode": "CIN10",
                            "bookingClass": "C",
                            "cabinClass": "C",
                            "inventoryQuantity": 5,
                            "inventoryStatus": "",
                            "totalFare": "",
                            "totalFareCurrency": ""
                        }]
                    }]
                }]
            }]
        }
    ],
    "replaceable": false
};

var flightDetail = {
    "flightNumber": "6205",
    "flightDuration": "130",
    "groundDuration": "0",
    "tripDuration": "130",
    "miles": "0",
    "marketingAirline": "GX",
    "flightLeg": [
        {
            "aircraft": "320",
            "aircraftName": "Airbus_195",
            "departureDate": "2017-10-18 19:50:00",
            "departureTerminal": "--",
            "departureAirport": "CKG",
            "arrivalDate": "2017-10-18 22:00:00",
            "arrivalTerminal": "--",
            "arrivalAirport": "JJN"
        },
        {
            "aircraft": "320",
            "aircraftName": "Airbus_195",
            "departureDate": "2017-10-18 19:50:00",
            "departureTerminal": "--",
            "departureAirport": "JJN",
            "arrivalDate": "2017-10-18 22:00:00",
            "arrivalTerminal": "--",
            "arrivalAirport": "CAN"
        }
    ]
};

var priceInfo = {
    "org": "AKU",
    "dst": "AQG",
    "fares": [
        {"date": "2017-12-07", "currency": "USD", "amount": 210, "discount": "0.6"},
        {"date": "2017-12-08", "currency": "CNY", "amount": 460, "discount": "0.6"},
        {"date": "2017-12-09", "currency": "CNY", "amount": 810, "discount": "0.6"},
        {"date": "2017-12-10", "currency": "CNY", "amount": 210, "discount": "0.6"},
        {"date": "2017-12-11", "currency": "CNY", "amount": 410.3, "discount": "0.6"},
        {"date": "2017-12-12", "currency": "CNY", "amount": 210, "discount": "0.6"},
        {"date": "2017-12-13", "currency": "CNY", "amount": 210, "discount": "0.6"},
        {"date": "2017-12-14", "currency": "CNY", "amount": 510, "discount": "0.6"},
        {"date": "2017-12-15", "currency": "CNY", "amount": 210, "discount": "0.6"},
        {"date": "2017-12-16", "currency": "CNY", "amount": 710, "discount": "0.6"},
        {"date": "2017-12-17", "currency": "CNY", "amount": 210, "discount": "0.6"},
        {"date": "2017-12-18", "currency": "CNY", "amount": 50, "discount": "0.6"},
        {"date": "2017-12-19", "currency": "CNY", "amount": 210, "discount": "0.6"},
        {"date": "2017-12-20", "currency": "CNY", "amount": 210, "discount": "0.6"},
        {"date": "2017-12-21", "currency": "CNY", "amount": 210, "discount": "0.6"},
        {"date": "2017-12-22", "currency": "CNY", "amount": 210, "discount": "0.6"},
        {"date": "2017-12-23", "currency": "CNY", "amount": 210, "discount": "0.6"},
        {"date": "2017-12-24", "currency": "CNY", "amount": 210, "discount": "0.6"},
        {"date": "2017-12-25", "currency": "CNY", "amount": 210, "discount": "0.6"},
    ]
};

exports.flightInfo = flightInfo;
exports.flightDetail = flightDetail;
exports.priceInfo = priceInfo;