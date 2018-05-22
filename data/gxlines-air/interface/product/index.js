'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var localSession = require(path.join(process.cwd(), 'data/session'));
var productData = require(path.join(process.cwd(), 'data/' + config.company + '/interface/product/productData'));
var until = require(path.join(process.cwd(), 'data/tools/until'));

//两成人一儿童 往返程辅营 带保险1
var products = {
    "status": "success",
    "code": "1000",
    "message": "操作成功",
    "touchpoint": "",
    "group": [
        {
            "code": "GROUP_MEAL",
            "flightSegments": [{
                "id": "PN_6903_2017-12-04_CKG_TSN",
                "marketingAirlineCode": "PN",
                "flightNumber": "6903",
                "flightDate": "2017-12-04",
                "departureCode": "CKG",
                "arrivalCode": "TSN",
                "traveler": [{
                    "id": "0",
                    "name": "测试花江江",
                    "gender": "M",
                    "dateOfBirth": "1988-10-10",
                    "type": "ADT",
                    "merchandizingItem": [
                        {
                            "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_13",
                            "code": "MEAL-T",
                            "type": "MEALS",
                            "productType": "AIR_ANCILLARY_ITEMS",
                            "productGroup": "MEAL",
                            "name": "咖喱牛肉饭",
                            "longDescription": "鸡肉搭配土豆、洋葱、胡萝卜，浓郁的咖喱味道完美的融合在食材中",
                            "amount": "30",
                            "currency": "CNY",
                            "insuranceStartDate": "",
                            "insuranceEndDate": ""
                        }, {
                            "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_73",
                            "code": "MEAL-D",
                            "type": "MEALS",
                            "productType": "AIR_ANCILLARY_ITEMS",
                            "productGroup": "MEAL",
                            "name": "正宗台式卤肉饭",
                            "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                            "amount": "30",
                            "currency": "CNY",
                            "insuranceStartDate": "",
                            "insuranceEndDate": ""
                        }, {
                            "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_79",
                            "code": "MEAL-U",
                            "type": "MEALS",
                            "productType": "AIR_ANCILLARY_ITEMS",
                            "productGroup": "MEAL",
                            "name": "宫保鸡腿饭",
                            "longDescription": "肉嫩醇香，香辣味厚。特选牛肉，剖成薄片，采用传统工艺，配以多种天然香料，多道工序精心加工而成。",
                            "amount": "30",
                            "currency": "CNY",
                            "insuranceStartDate": "",
                            "insuranceEndDate": ""
                        }, {
                            "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_55",
                            "code": "SNACK-H",
                            "type": "MEALS",
                            "productType": "AIR_ANCILLARY_ITEMS",
                            "productGroup": "MEAL",
                            "name": "有友豆干",
                            "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                            "amount": "6",
                            "currency": "CNY",
                            "insuranceStartDate": "",
                            "insuranceEndDate": ""
                        }, {
                            "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_61",
                            "code": "SNACK-E",
                            "type": "MEALS",
                            "productType": "AIR_ANCILLARY_ITEMS",
                            "productGroup": "MEAL",
                            "name": "百事兴酒鬼花生",
                            "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                            "amount": "5",
                            "currency": "CNY",
                            "insuranceStartDate": "",
                            "insuranceEndDate": ""
                        }, {
                            "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_1",
                            "code": "DRINK-A",
                            "type": "MEALS",
                            "productType": "AIR_ANCILLARY_ITEMS",
                            "productGroup": "MEAL",
                            "name": "可口可乐",
                            "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                            "amount": "4",
                            "currency": "CNY",
                            "insuranceStartDate": "",
                            "insuranceEndDate": ""
                        }, {
                            "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_7",
                            "code": "DRINK-F",
                            "type": "MEALS",
                            "productType": "AIR_ANCILLARY_ITEMS",
                            "productGroup": "MEAL",
                            "name": "巴马丽琅矿泉水",
                            "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                            "amount": "4",
                            "currency": "CNY",
                            "insuranceStartDate": "",
                            "insuranceEndDate": ""
                        }, {
                            "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_67",
                            "code": "PROMO-T",
                            "type": "MEALS",
                            "productType": "AIR_ANCILLARY_ITEMS",
                            "productGroup": "MEAL",
                            "name": "咖喱牛肉饭（双人套餐）",
                            "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                            "amount": "45",
                            "currency": "CNY",
                            "insuranceStartDate": "",
                            "insuranceEndDate": ""
                        }]
                }]
            }, {
                "id": "PN_6903_2017-12-04_CKG_TSN",
                "marketingAirlineCode": "PN",
                "flightNumber": "6903",
                "flightDate": "2017-12-04",
                "departureCode": "CKG",
                "arrivalCode": "TSN",
                "traveler": [{
                    "id": "1",
                    "name": "测试成人一",
                    "gender": "M",
                    "dateOfBirth": "2005-11-02",
                    "type": "ADT",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_14",
                        "code": "MEAL-T",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "咖喱牛肉饭",
                        "longDescription": "鸡肉搭配土豆、洋葱、胡萝卜，浓郁的咖喱味道完美的融合在食材中",
                        "amount": "30",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_74",
                        "code": "MEAL-D",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "正宗台式卤肉饭",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "30",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_80",
                        "code": "MEAL-U",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "宫保鸡腿饭",
                        "longDescription": "肉嫩醇香，香辣味厚。特选牛肉，剖成薄片，采用传统工艺，配以多种天然香料，多道工序精心加工而成。",
                        "amount": "30",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_56",
                        "code": "SNACK-H",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "有友豆干",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "6",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_62",
                        "code": "SNACK-E",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "百事兴酒鬼花生",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "5",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_2",
                        "code": "DRINK-A",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "可口可乐",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "4",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_8",
                        "code": "DRINK-F",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "巴马丽琅矿泉水（350ml）",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "4",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_68",
                        "code": "PROMO-T",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "（双人超值套餐）咖喱牛肉饭+正宗台式卤肉饭（包含2份饮品）",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "45",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6903_2017-12-04_CKG_TSN",
                "marketingAirlineCode": "PN",
                "flightNumber": "6903",
                "flightDate": "2017-12-04",
                "departureCode": "CKG",
                "arrivalCode": "TSN",
                "traveler": [{
                    "id": "2",
                    "name": "测试儿童",
                    "gender": "M",
                    "dateOfBirth": "2015-09-28",
                    "type": "CNN",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_15",
                        "code": "MEAL-T",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "咖喱牛肉饭",
                        "longDescription": "鸡肉搭配土豆、洋葱、胡萝卜，浓郁的咖喱味道完美的融合在食材中",
                        "amount": "30",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_75",
                        "code": "MEAL-D",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "正宗台式卤肉饭",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "30",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_81",
                        "code": "MEAL-U",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "宫保鸡腿饭",
                        "longDescription": "肉嫩醇香，香辣味厚。特选牛肉，剖成薄片，采用传统工艺，配以多种天然香料，多道工序精心加工而成。",
                        "amount": "30",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_57",
                        "code": "SNACK-H",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "有友豆干",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "6",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_63",
                        "code": "SNACK-E",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "百事兴酒鬼花生",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "5",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_3",
                        "code": "DRINK-A",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "可口可乐",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "4",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_9",
                        "code": "DRINK-F",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "巴马丽琅矿泉水（350ml）",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "4",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_69",
                        "code": "PROMO-T",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "（双人超值套餐）咖喱牛肉饭+正宗台式卤肉饭（包含2份饮品）",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "45",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6904_2017-12-12_TSN_CKG",
                "marketingAirlineCode": "PN",
                "flightNumber": "6904",
                "flightDate": "2017-12-12",
                "departureCode": "TSN",
                "arrivalCode": "CKG",
                "traveler": [{
                    "id": "0",
                    "name": "测试花江江",
                    "gender": "M",
                    "dateOfBirth": "1988-10-10",
                    "type": "ADT",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_16",
                        "code": "MEAL-T",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "咖喱牛肉饭",
                        "longDescription": "鸡肉搭配土豆、洋葱、胡萝卜，浓郁的咖喱味道完美的融合在食材中",
                        "amount": "30",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_76",
                        "code": "MEAL-D",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "正宗台式卤肉饭",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "30",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_82",
                        "code": "MEAL-U",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "宫保鸡腿饭",
                        "longDescription": "肉嫩醇香，香辣味厚。特选牛肉，剖成薄片，采用传统工艺，配以多种天然香料，多道工序精心加工而成。",
                        "amount": "30",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_58",
                        "code": "SNACK-H",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "有友豆干",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "6",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_64",
                        "code": "SNACK-E",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "百事兴酒鬼花生",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "5",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_4",
                        "code": "DRINK-A",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "可口可乐",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "4",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_10",
                        "code": "DRINK-F",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "巴马丽琅矿泉水（350ml）",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "4",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_70",
                        "code": "PROMO-T",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "（双人超值套餐）咖喱牛肉饭+正宗台式卤肉饭（包含2份饮品）",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "45",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6904_2017-12-12_TSN_CKG",
                "marketingAirlineCode": "PN",
                "flightNumber": "6904",
                "flightDate": "2017-12-12",
                "departureCode": "TSN",
                "arrivalCode": "CKG",
                "traveler": [{
                    "id": "1",
                    "name": "测试成人一",
                    "gender": "M",
                    "dateOfBirth": "2005-11-02",
                    "type": "ADT",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_17",
                        "code": "MEAL-T",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "咖喱牛肉饭",
                        "longDescription": "鸡肉搭配土豆、洋葱、胡萝卜，浓郁的咖喱味道完美的融合在食材中",
                        "amount": "30",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_77",
                        "code": "MEAL-D",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "正宗台式卤肉饭",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "30",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_83",
                        "code": "MEAL-U",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "宫保鸡腿饭",
                        "longDescription": "肉嫩醇香，香辣味厚。特选牛肉，剖成薄片，采用传统工艺，配以多种天然香料，多道工序精心加工而成。",
                        "amount": "30",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_59",
                        "code": "SNACK-H",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "有友豆干",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "6",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_65",
                        "code": "SNACK-E",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "百事兴酒鬼花生",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "5",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_5",
                        "code": "DRINK-A",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "可口可乐",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "4",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_11",
                        "code": "DRINK-F",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "巴马丽琅矿泉水（350ml）",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "4",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_71",
                        "code": "PROMO-T",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "（双人超值套餐）咖喱牛肉饭+正宗台式卤肉饭（包含2份饮品）",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "45",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6904_2017-12-12_TSN_CKG",
                "marketingAirlineCode": "PN",
                "flightNumber": "6904",
                "flightDate": "2017-12-12",
                "departureCode": "TSN",
                "arrivalCode": "CKG",
                "traveler": [{
                    "id": "2",
                    "name": "测试儿童",
                    "gender": "M",
                    "dateOfBirth": "2015-09-28",
                    "type": "CNN",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_18",
                        "code": "MEAL-T",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "咖喱牛肉饭",
                        "longDescription": "鸡肉搭配土豆、洋葱、胡萝卜，浓郁的咖喱味道完美的融合在食材中",
                        "amount": "30",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_78",
                        "code": "MEAL-D",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "正宗台式卤肉饭",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "30",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_84",
                        "code": "MEAL-U",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "宫保鸡腿饭",
                        "longDescription": "肉嫩醇香，香辣味厚。特选牛肉，剖成薄片，采用传统工艺，配以多种天然香料，多道工序精心加工而成。",
                        "amount": "30",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_60",
                        "code": "SNACK-H",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "有友豆干",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "6",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_66",
                        "code": "SNACK-E",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "百事兴酒鬼花生",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "5",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_6",
                        "code": "DRINK-A",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "可口可乐",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "4",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_12",
                        "code": "DRINK-F",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "巴马丽琅矿泉水（350ml）",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "4",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_72",
                        "code": "PROMO-T",
                        "type": "MEALS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "MEAL",
                        "name": "（双人超值套餐）咖喱牛肉饭+正宗台式卤肉饭（包含2份饮品）",
                        "longDescription": "在强调绿色健康的理念下，以季节养生为主，西部航空公司为每一位旅客奉上中西式完美结合的国际感觉美食盛宴",
                        "amount": "45",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }],
            "insurance": null
        },
        {
            "code": "GROUP_CHECKED_ITEMS",
            "flightSegments": [{
                "id": "PN_6903_2017-12-04_CKG_TSN",
                "marketingAirlineCode": "PN",
                "flightNumber": "6903",
                "flightDate": "2017-12-04",
                "departureCode": "CKG",
                "arrivalCode": "TSN",
                "traveler": [{
                    "id": "0",
                    "name": "测试花江江",
                    "gender": "M",
                    "dateOfBirth": "1988-10-10",
                    "type": "ADT",
                    "merchandizingItem": [
                        {
                            "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_25",
                            "code": "BAG_40KG",
                            "type": "BAGS",
                            "productType": "AIR_ANCILLARY_ITEMS",
                            "productGroup": "EXTRA_BAGGAGE",
                            "name": "40公斤 7.5折优惠",
                            "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                            "amount": "240",
                            "currency": "CNY",
                            "insuranceStartDate": "",
                            "insuranceEndDate": ""
                        }, {
                            "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_31",
                            "code": "BAG_30KG",
                            "type": "BAGS",
                            "productType": "AIR_ANCILLARY_ITEMS",
                            "productGroup": "EXTRA_BAGGAGE",
                            "name": "30公斤 7.5折优惠",
                            "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                            "amount": "180",
                            "currency": "CNY",
                            "insuranceStartDate": "",
                            "insuranceEndDate": ""
                        }, {
                            "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_37",
                            "code": "BAG_20KG",
                            "type": "BAGS",
                            "productType": "AIR_ANCILLARY_ITEMS",
                            "productGroup": "EXTRA_BAGGAGE",
                            "name": "20公斤 7.5折优惠",
                            "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                            "amount": "120",
                            "currency": "CNY",
                            "insuranceStartDate": "",
                            "insuranceEndDate": ""
                        }, {
                            "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_43",
                            "code": "BAG_10KG",
                            "type": "BAGS",
                            "productType": "AIR_ANCILLARY_ITEMS",
                            "productGroup": "EXTRA_BAGGAGE",
                            "name": "10公斤 7.5折优惠",
                            "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                            "amount": "60",
                            "currency": "CNY",
                            "insuranceStartDate": "",
                            "insuranceEndDate": ""
                        }]
                }]
            }, {
                "id": "PN_6903_2017-12-04_CKG_TSN",
                "marketingAirlineCode": "PN",
                "flightNumber": "6903",
                "flightDate": "2017-12-04",
                "departureCode": "CKG",
                "arrivalCode": "TSN",
                "traveler": [{
                    "id": "1",
                    "name": "测试成人一",
                    "gender": "M",
                    "dateOfBirth": "2005-11-02",
                    "type": "ADT",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_26",
                        "code": "BAG_40KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "40公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "240",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_32",
                        "code": "BAG_30KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "30公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "180",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_38",
                        "code": "BAG_20KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "20公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "120",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_44",
                        "code": "BAG_10KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "10公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "60",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6903_2017-12-04_CKG_TSN",
                "marketingAirlineCode": "PN",
                "flightNumber": "6903",
                "flightDate": "2017-12-04",
                "departureCode": "CKG",
                "arrivalCode": "TSN",
                "traveler": [{
                    "id": "2",
                    "name": "测试儿童",
                    "gender": "M",
                    "dateOfBirth": "2015-09-28",
                    "type": "CNN",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_27",
                        "code": "BAG_40KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "40公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "240",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_33",
                        "code": "BAG_30KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "30公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "180",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_39",
                        "code": "BAG_20KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "20公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "120",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_45",
                        "code": "BAG_10KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "10公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "60",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6904_2017-12-12_TSN_CKG",
                "marketingAirlineCode": "PN",
                "flightNumber": "6904",
                "flightDate": "2017-12-12",
                "departureCode": "TSN",
                "arrivalCode": "CKG",
                "traveler": [{
                    "id": "0",
                    "name": "测试花江江",
                    "gender": "M",
                    "dateOfBirth": "1988-10-10",
                    "type": "ADT",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_28",
                        "code": "BAG_40KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "40公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "240",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_34",
                        "code": "BAG_30KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "30公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "180",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_40",
                        "code": "BAG_20KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "20公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "120",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_46",
                        "code": "BAG_10KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "10公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "60",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6904_2017-12-12_TSN_CKG",
                "marketingAirlineCode": "PN",
                "flightNumber": "6904",
                "flightDate": "2017-12-12",
                "departureCode": "TSN",
                "arrivalCode": "CKG",
                "traveler": [{
                    "id": "1",
                    "name": "测试成人一",
                    "gender": "M",
                    "dateOfBirth": "2005-11-02",
                    "type": "ADT",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_29",
                        "code": "BAG_40KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "40公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "240",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_35",
                        "code": "BAG_30KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "30公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "180",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_41",
                        "code": "BAG_20KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "20公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "120",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_47",
                        "code": "BAG_10KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "10公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "60",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6904_2017-12-12_TSN_CKG",
                "marketingAirlineCode": "PN",
                "flightNumber": "6904",
                "flightDate": "2017-12-12",
                "departureCode": "TSN",
                "arrivalCode": "CKG",
                "traveler": [{
                    "id": "2",
                    "name": "测试儿童",
                    "gender": "M",
                    "dateOfBirth": "2015-09-28",
                    "type": "CNN",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_30",
                        "code": "BAG_40KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "40公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "240",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_36",
                        "code": "BAG_30KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "30公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "180",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_42",
                        "code": "BAG_20KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "20公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "120",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_48",
                        "code": "BAG_10KG",
                        "type": "BAGS",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "EXTRA_BAGGAGE",
                        "name": "10公斤 7.5折优惠",
                        "longDescription": "官网购买行李额更方便，更优惠，优惠幅度最高50%。",
                        "amount": "60",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }],
            "insurance": null
        },
        {
            "code": "INSURANCE_GROUP",
            "flightSegments": [{
                "id": "CKG_TSN,TSN_CKG",
                "marketingAirlineCode": "",
                "flightNumber": "",
                "flightDate": "",
                "departureCode": "CKG",
                "arrivalCode": "CKG",
                "traveler": [{
                    "id": "1",
                    "name": "测试成人一",
                    "gender": "M",
                    "dateOfBirth": "2005-11-02",
                    "type": "ADT",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/INSURANCE_1_7",
                        "code": "REFUND_INSURANCE",
                        "type": "",
                        "productType": "",
                        "productGroup": "",
                        "name": "退票险",
                        "longDescription": "",
                        "amount": "40",
                        "currency": "CNY",
                        "insuranceStartDate": "2017-12-04T00:00:00",
                        "insuranceEndDate": "2017-12-12T00:00:00"
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/INSURANCE_1_4",
                        "code": "DELAY_INSURANCE",
                        "type": "",
                        "productType": "",
                        "productGroup": "",
                        "name": "航延险",
                        "longDescription": "",
                        "amount": "40",
                        "currency": "CNY",
                        "insuranceStartDate": "2017-12-04T00:00:00",
                        "insuranceEndDate": "2017-12-12T00:00:00"
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/INSURANCE_1_1",
                        "code": "LIFE_ASSURANCE",
                        "type": "",
                        "productType": "",
                        "productGroup": "",
                        "name": "航意险",
                        "longDescription": "",
                        "amount": "60",
                        "currency": "CNY",
                        "insuranceStartDate": "2017-12-04T00:00:00",
                        "insuranceEndDate": "2017-12-12T00:00:00"
                    }]
                }]
            }, {
                "id": "CKG_TSN,TSN_CKG",
                "marketingAirlineCode": "",
                "flightNumber": "",
                "flightDate": "",
                "departureCode": "CKG",
                "arrivalCode": "CKG",
                "traveler": [{
                    "id": "0",
                    "name": "测试花江江",
                    "gender": "M",
                    "dateOfBirth": "1988-10-10",
                    "type": "ADT",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/INSURANCE_1_8",
                        "code": "REFUND_INSURANCE",
                        "type": "",
                        "productType": "",
                        "productGroup": "",
                        "name": "退票险",
                        "longDescription": "",
                        "amount": "40",
                        "currency": "CNY",
                        "insuranceStartDate": "2017-12-04T00:00:00",
                        "insuranceEndDate": "2017-12-12T00:00:00"
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/INSURANCE_1_5",
                        "code": "DELAY_INSURANCE",
                        "type": "",
                        "productType": "",
                        "productGroup": "",
                        "name": "航延险",
                        "longDescription": "",
                        "amount": "40",
                        "currency": "CNY",
                        "insuranceStartDate": "2017-12-04T00:00:00",
                        "insuranceEndDate": "2017-12-12T00:00:00"
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/INSURANCE_1_2",
                        "code": "LIFE_ASSURANCE",
                        "type": "",
                        "productType": "",
                        "productGroup": "",
                        "name": "航意险",
                        "longDescription": "",
                        "amount": "60",
                        "currency": "CNY",
                        "insuranceStartDate": "2017-12-04T00:00:00",
                        "insuranceEndDate": "2017-12-12T00:00:00"
                    }]
                }]
            }, {
                "id": "CKG_TSN,TSN_CKG",
                "marketingAirlineCode": "",
                "flightNumber": "",
                "flightDate": "",
                "departureCode": "CKG",
                "arrivalCode": "CKG",
                "traveler": [{
                    "id": "2",
                    "name": "测试儿童",
                    "gender": "M",
                    "dateOfBirth": "2015-09-28",
                    "type": "CNN",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/INSURANCE_1_9",
                        "code": "REFUND_INSURANCE",
                        "type": "",
                        "productType": "",
                        "productGroup": "",
                        "name": "退票险",
                        "longDescription": "",
                        "amount": "40",
                        "currency": "CNY",
                        "insuranceStartDate": "2017-12-04T00:00:00",
                        "insuranceEndDate": "2017-12-12T00:00:00"
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/INSURANCE_1_3",
                        "code": "LIFE_ASSURANCE",
                        "type": "",
                        "productType": "",
                        "productGroup": "",
                        "name": "航意险",
                        "longDescription": "",
                        "amount": "60",
                        "currency": "CNY",
                        "insuranceStartDate": "2017-12-04T00:00:00",
                        "insuranceEndDate": "2017-12-12T00:00:00"
                    }, {
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/INSURANCE_1_6",
                        "code": "DELAY_INSURANCE",
                        "type": "",
                        "productType": "",
                        "productGroup": "",
                        "name": "航延险",
                        "longDescription": "",
                        "amount": "40",
                        "currency": "CNY",
                        "insuranceStartDate": "2017-12-04T00:00:00",
                        "insuranceEndDate": "2017-12-12T00:00:00"
                    }]
                }]
            }],
            "insurance": null
        },
        {
            "code": "GROUP_VIP_LOUNGE",
            "flightSegments": [{
                "id": "PN_6903_2017-12-04_CKG_TSN",
                "marketingAirlineCode": "PN",
                "flightNumber": "6903",
                "flightDate": "2017-12-04",
                "departureCode": "CKG",
                "arrivalCode": "TSN",
                "traveler": [{
                    "id": "0",
                    "name": "测试花江江",
                    "gender": "M",
                    "dateOfBirth": "1988-10-10",
                    "type": "ADT",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_19",
                        "code": "VIP_LOUNGE",
                        "type": "LOUNGE",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "VIP_LOUNGE",
                        "name": "机场贵宾厅",
                        "longDescription": "西部航空机场贵宾服务让等待也成为旅途的一部分，您不再因为排队安检而导致误机，让您可以轻轻松松品尝着咖啡下午茶，在贵宾休息室静候登机，不论您购买的是几折机票，均可申请购买西部航空机场贵宾服务，享受快速值机、快速安检、机场贵宾厅服务，西部航空让您的出行与众不同。",
                        "amount": "38",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6903_2017-12-04_CKG_TSN",
                "marketingAirlineCode": "PN",
                "flightNumber": "6903",
                "flightDate": "2017-12-04",
                "departureCode": "CKG",
                "arrivalCode": "TSN",
                "traveler": [{
                    "id": "1",
                    "name": "测试成人一",
                    "gender": "M",
                    "dateOfBirth": "2005-11-02",
                    "type": "ADT",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_20",
                        "code": "VIP_LOUNGE",
                        "type": "LOUNGE",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "VIP_LOUNGE",
                        "name": "机场贵宾厅",
                        "longDescription": "西部航空机场贵宾服务让等待也成为旅途的一部分，您不再因为排队安检而导致误机，让您可以轻轻松松品尝着咖啡下午茶，在贵宾休息室静候登机，不论您购买的是几折机票，均可申请购买西部航空机场贵宾服务，享受快速值机、快速安检、机场贵宾厅服务，西部航空让您的出行与众不同。",
                        "amount": "38",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6903_2017-12-04_CKG_TSN",
                "marketingAirlineCode": "PN",
                "flightNumber": "6903",
                "flightDate": "2017-12-04",
                "departureCode": "CKG",
                "arrivalCode": "TSN",
                "traveler": [{
                    "id": "2",
                    "name": "测试儿童",
                    "gender": "M",
                    "dateOfBirth": "2015-09-28",
                    "type": "CNN",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_21",
                        "code": "VIP_LOUNGE",
                        "type": "LOUNGE",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "VIP_LOUNGE",
                        "name": "机场贵宾厅",
                        "longDescription": "西部航空机场贵宾服务让等待也成为旅途的一部分，您不再因为排队安检而导致误机，让您可以轻轻松松品尝着咖啡下午茶，在贵宾休息室静候登机，不论您购买的是几折机票，均可申请购买西部航空机场贵宾服务，享受快速值机、快速安检、机场贵宾厅服务，西部航空让您的出行与众不同。",
                        "amount": "38",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6904_2017-12-12_TSN_CKG",
                "marketingAirlineCode": "PN",
                "flightNumber": "6904",
                "flightDate": "2017-12-12",
                "departureCode": "TSN",
                "arrivalCode": "CKG",
                "traveler": [{
                    "id": "0",
                    "name": "测试花江江",
                    "gender": "M",
                    "dateOfBirth": "1988-10-10",
                    "type": "ADT",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_22",
                        "code": "VIP_LOUNGE",
                        "type": "LOUNGE",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "VIP_LOUNGE",
                        "name": "机场贵宾厅",
                        "longDescription": "西部航空机场贵宾服务让等待也成为旅途的一部分，您不再因为排队安检而导致误机，让您可以轻轻松松品尝着咖啡下午茶，在贵宾休息室静候登机，不论您购买的是几折机票，均可申请购买西部航空机场贵宾服务，享受快速值机、快速安检、机场贵宾厅服务，西部航空让您的出行与众不同。",
                        "amount": "38",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6904_2017-12-12_TSN_CKG",
                "marketingAirlineCode": "PN",
                "flightNumber": "6904",
                "flightDate": "2017-12-12",
                "departureCode": "TSN",
                "arrivalCode": "CKG",
                "traveler": [{
                    "id": "1",
                    "name": "测试成人一",
                    "gender": "M",
                    "dateOfBirth": "2005-11-02",
                    "type": "ADT",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_23",
                        "code": "VIP_LOUNGE",
                        "type": "LOUNGE",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "VIP_LOUNGE",
                        "name": "机场贵宾厅",
                        "longDescription": "西部航空机场贵宾服务让等待也成为旅途的一部分，您不再因为排队安检而导致误机，让您可以轻轻松松品尝着咖啡下午茶，在贵宾休息室静候登机，不论您购买的是几折机票，均可申请购买西部航空机场贵宾服务，享受快速值机、快速安检、机场贵宾厅服务，西部航空让您的出行与众不同。",
                        "amount": "38",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6904_2017-12-12_TSN_CKG",
                "marketingAirlineCode": "PN",
                "flightNumber": "6904",
                "flightDate": "2017-12-12",
                "departureCode": "TSN",
                "arrivalCode": "CKG",
                "traveler": [{
                    "id": "2",
                    "name": "测试儿童",
                    "gender": "M",
                    "dateOfBirth": "2015-09-28",
                    "type": "CNN",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_24",
                        "code": "VIP_LOUNGE",
                        "type": "LOUNGE",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "VIP_LOUNGE",
                        "name": "机场贵宾厅",
                        "longDescription": "西部航空机场贵宾服务让等待也成为旅途的一部分，您不再因为排队安检而导致误机，让您可以轻轻松松品尝着咖啡下午茶，在贵宾休息室静候登机，不论您购买的是几折机票，均可申请购买西部航空机场贵宾服务，享受快速值机、快速安检、机场贵宾厅服务，西部航空让您的出行与众不同。",
                        "amount": "38",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }],
            "insurance": null
        },
        {
            "code": "GROUP_ON_FLIGHT_ITEM",
            "flightSegments": [{
                "id": "PN_6903_2017-12-04_CKG_TSN",
                "marketingAirlineCode": "PN",
                "flightNumber": "6903",
                "flightDate": "2017-12-04",
                "departureCode": "CKG",
                "arrivalCode": "TSN",
                "traveler": [{
                    "id": "0",
                    "name": "测试花江江",
                    "gender": "M",
                    "dateOfBirth": "1988-10-10",
                    "type": "ADT",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_49",
                        "code": "ON_FLIGHT_SUIT",
                        "type": "ON_FLIGHT_ITEM",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "ON_FLIGHT_ITEM",
                        "name": "机上舒适设施",
                        "longDescription": "舒适的机上套装，在机上常保舒适温暖。舒适套装包含一个颈枕、一副眼罩与一张毛毯。\r\n材质：眼罩：尼龙，毛毯：珊瑚绒，颈枕：毛绒/PVC\r\n尺寸：毛毯：160cm×100cm，颈枕：11\" x 11.5\"",
                        "amount": "70",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6903_2017-12-04_CKG_TSN",
                "marketingAirlineCode": "PN",
                "flightNumber": "6903",
                "flightDate": "2017-12-04",
                "departureCode": "CKG",
                "arrivalCode": "TSN",
                "traveler": [{
                    "id": "1",
                    "name": "测试成人一",
                    "gender": "M",
                    "dateOfBirth": "2005-11-02",
                    "type": "ADT",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_50",
                        "code": "ON_FLIGHT_SUIT",
                        "type": "ON_FLIGHT_ITEM",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "ON_FLIGHT_ITEM",
                        "name": "机上舒适设施",
                        "longDescription": "舒适的机上套装，在机上常保舒适温暖。舒适套装包含一个颈枕、一副眼罩与一张毛毯。\r\n材质：眼罩：尼龙，毛毯：珊瑚绒，颈枕：毛绒/PVC\r\n尺寸：毛毯：160cm×100cm，颈枕：11\" x 11.5\"",
                        "amount": "70",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6903_2017-12-04_CKG_TSN",
                "marketingAirlineCode": "PN",
                "flightNumber": "6903",
                "flightDate": "2017-12-04",
                "departureCode": "CKG",
                "arrivalCode": "TSN",
                "traveler": [{
                    "id": "2",
                    "name": "测试儿童",
                    "gender": "M",
                    "dateOfBirth": "2015-09-28",
                    "type": "CNN",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_51",
                        "code": "ON_FLIGHT_SUIT",
                        "type": "ON_FLIGHT_ITEM",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "ON_FLIGHT_ITEM",
                        "name": "机上舒适设施",
                        "longDescription": "舒适的机上套装，在机上常保舒适温暖。舒适套装包含一个颈枕、一副眼罩与一张毛毯。\r\n材质：眼罩：尼龙，毛毯：珊瑚绒，颈枕：毛绒/PVC\r\n尺寸：毛毯：160cm×100cm，颈枕：11\" x 11.5\"",
                        "amount": "70",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6904_2017-12-12_TSN_CKG",
                "marketingAirlineCode": "PN",
                "flightNumber": "6904",
                "flightDate": "2017-12-12",
                "departureCode": "TSN",
                "arrivalCode": "CKG",
                "traveler": [{
                    "id": "0",
                    "name": "测试花江江",
                    "gender": "M",
                    "dateOfBirth": "1988-10-10",
                    "type": "ADT",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_52",
                        "code": "ON_FLIGHT_SUIT",
                        "type": "ON_FLIGHT_ITEM",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "ON_FLIGHT_ITEM",
                        "name": "机上舒适设施",
                        "longDescription": "舒适的机上套装，在机上常保舒适温暖。舒适套装包含一个颈枕、一副眼罩与一张毛毯。\r\n材质：眼罩：尼龙，毛毯：珊瑚绒，颈枕：毛绒/PVC\r\n尺寸：毛毯：160cm×100cm，颈枕：11\" x 11.5\"",
                        "amount": "70",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6904_2017-12-12_TSN_CKG",
                "marketingAirlineCode": "PN",
                "flightNumber": "6904",
                "flightDate": "2017-12-12",
                "departureCode": "TSN",
                "arrivalCode": "CKG",
                "traveler": [{
                    "id": "1",
                    "name": "测试成人一",
                    "gender": "M",
                    "dateOfBirth": "2005-11-02",
                    "type": "ADT",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_53",
                        "code": "ON_FLIGHT_SUIT",
                        "type": "ON_FLIGHT_ITEM",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "ON_FLIGHT_ITEM",
                        "name": "机上舒适设施",
                        "longDescription": "舒适的机上套装，在机上常保舒适温暖。舒适套装包含一个颈枕、一副眼罩与一张毛毯。\r\n材质：眼罩：尼龙，毛毯：珊瑚绒，颈枕：毛绒/PVC\r\n尺寸：毛毯：160cm×100cm，颈枕：11\" x 11.5\"",
                        "amount": "70",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }, {
                "id": "PN_6904_2017-12-12_TSN_CKG",
                "marketingAirlineCode": "PN",
                "flightNumber": "6904",
                "flightDate": "2017-12-12",
                "departureCode": "TSN",
                "arrivalCode": "CKG",
                "traveler": [{
                    "id": "2",
                    "name": "测试儿童",
                    "gender": "M",
                    "dateOfBirth": "2015-09-28",
                    "type": "CNN",
                    "merchandizingItem": [{
                        "priceId": "/merchandizing/5a03ac6285b5917f45b70905/offers/ANCILLARYAIR_54",
                        "code": "ON_FLIGHT_SUIT",
                        "type": "ON_FLIGHT_ITEM",
                        "productType": "AIR_ANCILLARY_ITEMS",
                        "productGroup": "ON_FLIGHT_ITEM",
                        "name": "机上舒适设施",
                        "longDescription": "舒适的机上套装，在机上常保舒适温暖。舒适套装包含一个颈枕、一副眼罩与一张毛毯。\r\n材质：眼罩：尼龙，毛毯：珊瑚绒，颈枕：毛绒/PVC\r\n尺寸：毛毯：160cm×100cm，颈枕：11\" x 11.5\"",
                        "amount": "70",
                        "currency": "CNY",
                        "insuranceStartDate": "",
                        "insuranceEndDate": ""
                    }]
                }]
            }],
            "insurance": null
        }
    ]
};

function getProductTravelerList(flightData, travelerData, type) {
    var obj = {
        "id": flightData.flightId,
        "marketingAirlineCode": "PN",
        "flightNumber": "6903",
        "flightDate": flightData.departureDate,
        "departureCode": flightData.originLocationCode,
        "arrivalCode": flightData.destinationLocationCode,
        "traveler": [{
            "id": travelerData.id,
            "name": travelerData.fullName,
            "firstName": travelerData.firstName,
            "lastName": travelerData.lastName,
            "gender": travelerData.sex,
            "dateOfBirth": travelerData.birthday,
            "type": travelerData.passType,
            "merchandizingItem": productData[type]
        }]
    };
    return obj;
}


function getProductInfo(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var _passengerList = localSession.getPassengerList(req);
    var _sInfo = localSession.getFlightSearchInfo(req);
    var _productInfo = products;
    if (_sInfo.tripType != "MC") {
        _productInfo.group = [];
        var list = ["GROUP_MEAL", "GROUP_CHECKED_ITEMS", "GROUP_VIP_LOUNGE", "GROUP_ON_FLIGHT_ITEM", "INSURANCE_GROUP"];
        list.forEach(function (item) {
            var flightSegments = [];
            (_passengerList || []).forEach(function (o) {
                var flightId = "";
                var flightData = {};
                if(item != "INSURANCE_GROUP"){
                    if (_sInfo.tripType != "MC") {
                        flightId = _sInfo.outboundOption.originLocationCode + "_" + _sInfo.outboundOption.destinationLocationCode;
                        flightData = until.cloneObj(_sInfo.outboundOption);
                        flightData.flightId = flightId;
                        flightSegments.push(getProductTravelerList(flightData, o, item));
                        if (_sInfo.tripType == "RT") {
                            var obj = {
                                originLocationCode: _sInfo.outboundOption.destinationLocationCode,
                                destinationLocationCode: _sInfo.outboundOption.originLocationCode,
                                departureDate: _sInfo.inboundOption.departureDate
                            }
                            flightId = _sInfo.outboundOption.destinationLocationCode + "_" + _sInfo.outboundOption.originLocationCode;
                            flightData = obj;
                            flightData.flightId = flightId;
                            flightSegments.push(getProductTravelerList(flightData, o, item));
                        }
                    }else{
                        (_sInfo.multiCityOptions || []).forEach(function(subItem,subIndex){
                            flightId = subItem.originLocationCode + "_" + subItem.destinationLocationCode;
                            flightData = until.cloneObj(subItem);
                            flightData.flightId = flightId;
                            flightSegments.push(getProductTravelerList(flightData, o, item));
                        });
                    }
                }else{
                    flightData = until.cloneObj(_sInfo.outboundOption);
                    if (_sInfo.tripType != "MC") {
                        flightId = _sInfo.outboundOption.originLocationCode + "_" + _sInfo.outboundOption.destinationLocationCode;
                        if (_sInfo.tripType == "RT") {
                            flightId += ","+ _sInfo.outboundOption.destinationLocationCode + "_" + _sInfo.outboundOption.originLocationCode;
                        }

                    }else{
                        (_sInfo.multiCityOptions || []).forEach(function(subItem,subIndex){
                            if(subIndex > 0){
                                flightId += ",";
                            }
                            flightId += (_sInfo.outboundOption.destinationLocationCode + "_" + _sInfo.outboundOption.originLocationCode);
                        });
                    }
                    flightData.flightId = flightId;
                    flightSegments.push(getProductTravelerList(flightData, o, item));
                }
            });

            _productInfo.group.push({
                code: item,
                flightSegments: flightSegments
            });
        });
    }

    console.log("========================getProductInfo===start=========================");
    console.log(_sInfo);
    console.log(_passengerList);
    console.log("========================getProductInfo====end========================");
    //products.group = [];
    interfaceModel.sendJson(res, 200, _productInfo);
};
function addProductInfo(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    console.log("addProductInfo:" + JSON.stringify(queryInfo))
    interfaceModel.sendJson(res, 200, {
        "orderCode": "000012342",
        "message": "当前有旅客为失信被执行人，如有疑问联系执行法院",
        "status": "success",
        "code": "0002"
    });
};


var mmbProduct = {};


function getMMBProductInfo(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    //products.group = [];
    interfaceModel.sendJson(res, 200, products);
};

router.post('/getProductInfo', interfaceModel.checkLogin, getProductInfo);
router.post('/addProductInfo', interfaceModel.checkLogin, addProductInfo);

router.post('/getMMBProductInfo', interfaceModel.checkLogin, getMMBProductInfo);
router.post('/addMMBProductInfo', interfaceModel.checkLogin, addProductInfo);

module.exports = router;