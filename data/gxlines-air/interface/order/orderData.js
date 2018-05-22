var Mock = require("mockjs");

//订单列表
//已出票  已预订  已取消  已退款
var _orderStateList = ["TICKETED","BOOKED","CANCELLED","REFUNDED","TICKETED"];
var _descriptionList = ["TSN - CKG [Tue, 26 Dec 2017]","CKG - TSN [Sat, 30 Dec 2017]","TSN - CKG, CKG - TSN [Tue, 26 Dec 2017 - Sat, 30 Dec 2017]","TSN - SYX [Tue, 16 Dec 2017]","SYX - CKG [Tue, 06 Dec 2017]",];
var orderList = Mock.mock({
    "orderList|50": [{
        "code|+1": 1000006560,
        "creationDate": "@datetime",
        "status|1": _orderStateList,
        "profileId": "80109",
        "description|1": _descriptionList,
        "source": "",
        "departureDateTime": "",
        "arrivalAirportCode": "CKG",
        "primaryAirRecordLocator": "MV6CBP",
        "customerLastName": "测试",
        "firstFlightAirlineCode": "PN",
        "firstFlightFlightNumber": "6382",
        "salesCurrency": "",
        "segments": [{"departure": "TSN", "arrival": "CKG"}, {"departure": "CKG", "arrival": "TSN"}]
    }]
});

var _insuranceNameList = ["航意险", "航延险", "退票险"];
var _insuranceStateList = ["BOOKED", "CANCELLED", "RFND", "BOOKED"];
var _passTypeList = ["ADT","CNN","INF","ADT","ADT","ADT","ADT"];
var _idTypeList = ["ID_CARD","2.DOC","MI_CARD","OTHER_ID"];
var _idNoList = ["61062910","rrssdsds","gsdss","cbvbcv445","610622198810100910"];
var _mobileList = ["18621298014","1595325683","15833573697"];
var _flightCityList1 = ["CKG","TSN","SYX","XIY"];
var _flightCityList2 = ["INC","HET","TXN","CGO"];
var _marketList = ["咖喱牛肉饭（包含1份饮品）","10公斤逾重行李"];
var _marketStateList = ["BOOKED","CANCELLED","CHANGED"];
//订单信息
var orderDetail = Mock.mock({
    "orderInfo": {
        "orderCode": "0000008184",
        "orderState": "PARTIALLY_BOOKED",
        "orderAmount": "3020.00",
        "unpaidAmount": "3020.00",
        "paidAmount": "0",
        "createOrderDate": "@datetime",
        "ticketedDate": "@datetime",
        "paymentDate": "@datetime",
        "contactName": "@cname",
        "contactPhone": "186****8014",
        "contactEmail": "@email",
        "deductibleAmount": "0",
        "orderSource": "WESTAIR_WEB"
    },
    "passengerList|2-5": [
        {
            "info": {
                "name": "@cname",
                "firstName": "@cfirst",
                "lastName": "@clast",
                "idType|1": _idTypeList,
                "idNo|1": _idNoList,
                "passType|1": _passTypeList,
                "birthday": "@date",
                "ticketType": "电子客票",
                "cardNo": "",
                "sysNo": ""
            },
            "flightSegment|1-2": [
                {
                    "departureAirportLocationCode|1": _flightCityList1,
                    "departureTime": "@datetime",
                    "arrivalAirportLocationCode|1": _flightCityList2,
                    "arrivalTime": "@datetime",
                    "airEquipType": "",
                    "marketingAirlineCode": "PN",
                    "flightNumber": "6903",
                    "shippingSpace": "J",
                    "seatState": "",
                    "fareFamilyCode": "BASIC",
                    "fareFamilyName": "超优惠",
                    "ticketNo": "",
                    "ticketState": "",
                    "ticketAmount": "230",
                    "payableAmount": "280.0",
                    "totalAmount": "280.0",
                    "tax": [{"code": "CN", "name": "民航发展基金（国内）", "amount": "50"}],
                    "segid": ""
                }
            ],
            "productlist|2": [
                {
                    "id": "@id",
                    "code": "MEAL-T",
                    "type": "MEALS",
                    "name": "咖喱牛肉饭（包含1份饮品）",
                    "status|1": _marketStateList,
                    "baseFare": "30",
                    "baseFareCurrency": "CNY",
                    "totalFare": "30",
                    "totalFareCurrency": "CNY",
                    "description": "牛肉搭配土豆、洋葱、胡萝卜，浓郁的咖喱味道完美的融合在食材中，每一口都能令你充分体验咖喱的独特美味。",
                    "flightNumber": "6904",
                    "departureDate": "@datetime"
                },
                {
                    "id": "@id",
                    "code": "BAG_10KG",
                    "type": "BAGS",
                    "name": "10公斤 7.5折优惠",
                    "status": "BOOKED",
                    "baseFare": "60",
                    "baseFareCurrency": "CNY",
                    "totalFare": "60",
                    "totalFareCurrency": "CNY",
                    "description": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                    "flightNumber": "6904",
                    "departureDate": "2017-12-29 21:20:00"
                },
                {
                    "id": "@id",
                    "code": "VIP_LOUNGE",
                    "type": "LOUNGE",
                    "name": "机场贵宾厅",
                    "status": "BOOKED",
                    "baseFare": "38",
                    "baseFareCurrency": "CNY",
                    "totalFare": "38",
                    "totalFareCurrency": "CNY",
                    "description": "西部航空机场贵宾服务让等待也成为旅途的一部分，您不再因为排队安检而导致误机，让您可以轻轻松松品尝着咖啡下午茶，在贵宾休息室静候登机，不论您购买的是几折机票，均可申请购买西部航空机场贵宾服务，享受快速值机、快速安检、机场贵宾厅服务，西部航空让您的出行与众不同。",
                    "flightNumber": "6904",
                    "departureDate": "2017-12-29 21:20:00"
                },
                {
                    "id": "@id",
                    "code": "ON_FLIGHT_SUIT",
                    "type": "ON_FLIGHT_ITEM",
                    "name": "机上舒适设施",
                    "status": "BOOKED",
                    "baseFare": "70",
                    "baseFareCurrency": "CNY",
                    "totalFare": "70",
                    "totalFareCurrency": "CNY",
                    "description": "舒适的机上套装，在机上常保舒适温暖。舒适套装包含一个颈枕、一副眼罩与一张毛毯。 材质：眼罩：尼龙，毛毯：珊瑚绒，颈枕：毛绒/PVC 尺寸：毛毯：160cm×100cm，颈枕：11 x 11.5",
                    "flightNumber": "6904",
                    "departureDate": "2017-12-29 21:20:00"
                }
            ]
        }
    ],
    "action": [
        {"code": "TRAVEL_EXTRAS_OPTION", "description": "增值服务", "enabled": true},
        {"code": "ONLINE_PAYMENT", "description": " 在线支付", "enabled": true},
        {"code": "CANCEL_ORDER", "description": " 取消订单", "enabled": true},
        {"code": "ERROR_REFUND", "description": "支付差错退款", "enabled": true},
        {"code": "REFUND_ORDER", "description": "退票申请", "enabled": true},
        {"code": "CHANGE_ITINERARY", "description": "更改行程", "enabled": true},
        {"code": "SELECT_SEATS", "description": " 选座", "enabled": true}
    ],
    "pos": "WESTAIR_WEB",
    "islocked": {"status": true, "timeout": 0},
    "insuranceOffers|5-8": [
        {
            "insuranceId": "2c9184e31be3f624011be3f854500002",
            "code|+1": 1000000,
            "name|1": _insuranceNameList,
            "status|1": _insuranceStateList,
            "companyCode": "HTSS",
            "companyName": "华泰财产保险股份有限公司",
            "premium": "30",
            "repay": "1000000",
            "protocol": "116000006",
            "protocolProductName": "西部航B2C网站航意险",
            "description": "",
            "baseFare": "30",
            "baseFareCurrency": "CNY",
            "totalFare": "30",
            "totalFareCurrency": "CNY",
            "taxs": [],
            "fees": [],
            "lastName": "@last",
            "firstName": "@first",
            "idNo|1": _idNoList
        }
    ],
    "fareFamilies": [
        {
            "sequence": 1,
            "code": "BASIC",
            "name": "超自由",
            "benefits": [
                {
                    "code": "ENDORSEMENT_ALL",
                    "name": "自愿签转",
                    "text": "自愿签转:不允许签转."
                },
                {
                    "code": "CHANGE_FEE_ALL",
                    "name": "变更服务费",
                    "text": "变更服务费（每次）：航班计划离站时间14天（含）外 - 5%； <br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 5%； <br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 10%； <br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 20%； <br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 30%； <br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 50%。"
                },
                {
                    "code": "REFUND_FEE_ALL",
                    "name": "退票费",
                    "text": "退票费：航班计划离站时间14天（含）外 - 5%； <br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 10%； <br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 15%； <br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 25%； <br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 40%； <br>航班计划离站时间4小时（不含）内及航班计划离站时间后 - 60%。"
                },
                {
                    "code": "BAGGAGE_ALLOWANCE",
                    "name": "免费托运行李",
                    "text": "10KG免费托运行李."
                },
                {
                    "code": "CARRY_ON_BAGGAGE_ALLOWANCE",
                    "name": "免费非托运行李",
                    "text": "可免费携带一件7KG且体积不超过20cm x 30cm x 40cm的非托运行李进入客舱."
                },
                {
                    "code": "MEAL_SERVICE",
                    "name": "免费餐饮服务",
                    "text": "免费餐饮服务：无."
                }
            ]
        }
    ],
});
var _paymentTypeList = ["ALIPAY", "YEEPAY", "EASYPAY", "WXPAY"];
var _paymentStateList = ["ISSUING", "FAIL", "DONE"];
//支付信息
var paymentInfo = Mock.mock({
    "paymentInfo|2-4": [
        {
            "paymentNo|+1": 201711090920420000008184,
            "tradeNo|+1": 2017110921001004420549718410,
            "payChannel": "kuaijie",
            "payAmount": "3021.00",
            "totalPaidAmount": "3021.00",
            "merchantFee": 1,
            "tradeAmount": "3021.00",
            "requestDate": "@datetime",
            "responseDate": "@datetime",
            "payStatus|1": _paymentStateList,
            "orderType|1": "PAY_FOR_ORDER",
            "failureReason": "",
            "failureReasonDescription": "",
            "scheduleSequence": 2,
            "invoiceSequence": 1,
            "paymentIdentifier|+1": 2017110921001004420549718410,
            "outTradeNo": "",
            "bankGroupCode|1": _paymentTypeList
        }
    ]
});
//退款信息
var refundInfos = Mock.mock({
    "refundInfos|3": [
        {
            "id": "@id",
            "type": "ticket",
            "refundNo|+1": 20170804103300000588,
            "createTime": "@datetime",
            "createUser": "网站",
            "poundage": 330, //手续费
            "refund": 50,
            "ticketStatus": "二审通过",
            "remark": "826-2384934589 (TSN-NAY GS1113)<br>826-2384934589 (TSN-NAY GS1113)<br>826-2384934589 (TSN-NAY GS1113)",
            "operateTime": "@datetime",
            "auditDetailList": [
                {
                    "description": "werwerwerew",
                    "status": "一审",
                    "operateTime": "@datetime",
                }, {
                    "description": "werwerwerew",
                    "status": "一审",
                    "operateTime": "@datetime",
                }, {
                    "description": "werwerwerew",
                    "status": "一审",
                    "operateTime": "@datetime",
                },
            ]
        },
        {
            "id": "@id",
            "type": "component",
            "refundNo|+1": 20170803151500000041,
            "createTime": "@datetime",
            "createUser": "720001@hna.com",
            "poundage": 40,
            "refund": 0,
            "ticketStatus": "等待审核",
            "remark": "826-2384934589 (正宗卤肉饭_40.00)",
            "operateTime": "@datetime",
            "auditDetailList": []
        }
    ]
});


//申请退票的航班信息
var _ticketStatusList = ["CHECKIN","OPEN","RFND","BOARD","OPEN","OPEN"];
var refundInfo = Mock.mock({
    "orderNo": "0000008184",
    "guests|2-5": [
        {
            "sequence": "@id",
            "name": "@cname",
            "guestFirstName":"@cfirst",
            "guestLastName":"@clast",
            "type|1": ["ADULT","CHILD","INFANT"],
            "phone|1": _mobileList,
            "docNumber|1": _idNoList,
            "docType|1": _idTypeList,
            "paxs|1-3": [
                {
                    "name": "@cname",
                    "type": "ADULT",
                    "id": "@id",
                    "org|1": _flightCityList1,
                    "dst|1": _flightCityList2,
                    "flightNo|1": ["PN6903","PN6934","PN6977"],
                    "flightDate": "@date",
                    "depTime": "@time",
                    "resStatus": "BOOKED",
                    "ticketNo": "847-2473344242",
                    "ticketStatus|1": _ticketStatusList,
                    "guestSeq": "",
                    "cabin": "J",
                    "refundRule": "退票费：航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。",
                    "interTicket": "0",
                    "taxFees": "",
                    "frontTicketStatus": "OPEN"
                }
            ]
        }
    ],
    "fares": [
        {
            "org": "CKG",
            "dst": "TSN",
            "code": "BASIC",
            "description": "退票费：航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。"
        }, {
            "org": "TSN",
            "dst": "CKG",
            "code": "BASIC",
            "description": "退票费：航班计划离站时间14天（含）外 - 5%；       \n<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       \n<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       \n<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       \n<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       \n<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。"
        }],
    "status": "PARTIALLY_TICKETED"
});

exports.orderList = orderList.orderList;
exports.orderDetail = orderDetail;
exports.paymentInfo = paymentInfo;
exports.refundInfos = refundInfos;
exports.refundInfo = refundInfo;