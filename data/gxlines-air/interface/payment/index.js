'use strict';

var express = require('express');
var router = express.Router();
var Mock = require("mockjs");
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));


var paymentInfo = Mock.mock({
    "reservationInfo": {
        "reservationCode": "0000008184",
        "passengers|3-5": [
            {
                "contactName": "@cname",
                "cardType|1": ["身份证","军官证","护照","其他"],
                "cardNo|1": ["erer34","dda324fsdfsdf","246784367437894324","rrrr"],
                "ageType|1": ["成人", "儿童", "婴儿"],
                "mobilePhone": "18621298014",
                "description": "<p>PN6903</p><p>Chongqing - Wanxian</p><br/><p>PN6904</p><p>Wanxian - Chongqing</p>",
                "unPaidTotalAmount": 0,
                "changeFee": 0
            }
        ],
        "payPurpose": "PAY_FOR_ORDER",
        "tripType": "RT",
        "itinerarySegments": [{
            "carrierCode": "PN",
            "flightNumber": "6903",
            "departureDate": "2017-12-04",
            "departureWeek": "星期一",
            "departureTime": "20:00",
            "startAirportCode": "CKG",
            "startAirportName": "Chongqing",
            "departureTerminal": "",
            "arrivalDate": "2017-12-04",
            "arrivalWeek": "星期一",
            "arrivalTime": "20:40",
            "endAirportCode": "TSN",
            "endAirportName": "Wanxian",
            "arrivalTerminal": ""
        }, {
            "carrierCode": "PN",
            "flightNumber": "6904",
            "departureDate": "2017-12-12",
            "departureWeek": "星期二",
            "departureTime": "21:20",
            "startAirportCode": "TSN",
            "startAirportName": "Wanxian",
            "departureTerminal": "",
            "arrivalDate": "2017-12-12",
            "arrivalWeek": "星期二",
            "arrivalTime": "22:00",
            "endAirportCode": "CKG",
            "endAirportName": "Chongqing",
            "arrivalTerminal": ""
        }],
        "unPaidTotalAmount": "3020",
        "unPaidItineraryPrice": {
            "adtPrice": "460",
            "adtQuantity": "2",
            "cnnPrice": "460",
            "cnnQuantity": "1",
            "infPrice": "320",
            "infQuantity": "",
            "taxes": [{"chineseName": "", "englishName": "", "fee": "0", "valid": true}, {
                "chineseName": "",
                "englishName": "",
                "fee": "200",
                "valid": true
            }],
            "totalAmount": "1900"
        },
        "unPaidInsurances": [],
        "unPaidAncillaries": [],
        "changedItinerarySegments": [],
        "changedItineraryPrice": {
            "adtPrice": "0",
            "adtQuantity": "0",
            "cnnPrice": "0",
            "cnnQuantity": "0",
            "infPrice": "0",
            "infQuantity": "",
            "taxes": [],
            "totalAmount": "0"
        },
        "changeFee": 0,
        "ff": 0,
        "payRestTime": "580715",
        "faraFamilyCode": "BASIC"
    },
    "bankInfos": [
        {
            "id": 7,
            "deleteFlag": 0,
            "createTime": "2016-08-08 10:20:00",
            "bankName": "工商银行",
            "status": 0,
            "seq": 1,
            "intDom": "DOM",
            "isBank": "0",
            "merchantFeeRate": 0,
            "bankCode": "ICBC",
            "paymentType": "EASYPAY",
            "pid": 7
        }, {
            "id": 9,
            "deleteFlag": 0,
            "createTime": "2016-08-08 10:49:00",
            "bankName": "建设银行",
            "status": 0,
            "seq": 2,
            "intDom": "DOM",
            "isBank": "0",
            "merchantFeeRate": 0,
            "bankCode": "CCB",
            "paymentType": "EASYPAY",
            "pid": 9
        }, {
            "id": 11,
            "deleteFlag": 0,
            "createTime": "2016-08-08 10:42:00",
            "bankName": "招商银行",
            "status": 0,
            "seq": 3,
            "intDom": "DOM",
            "isBank": "0",
            "merchantFeeRate": 0,
            "bankCode": "CMB",
            "paymentType": "ALIPAY",
            "pid": 11
        }, {
            "id": 13,
            "deleteFlag": 0,
            "createTime": "2016-08-08 10:42:00",
            "bankName": "农业银行",
            "status": 0,
            "seq": 4,
            "intDom": "DOM",
            "isBank": "0",
            "merchantFeeRate": 0,
            "bankCode": "ABC",
            "paymentType": "EASYPAY",
            "pid": 13
        }, {
            "id": 15,
            "deleteFlag": 0,
            "createTime": "2016-08-08 10:42:00",
            "bankName": "中国银行",
            "status": 0,
            "seq": 5,
            "intDom": "DOM",
            "isBank": "0",
            "merchantFeeRate": 0,
            "bankCode": "BOC",
            "paymentType": "EASYPAY",
            "pid": 15
        }, {
            "id": 17,
            "deleteFlag": 0,
            "createTime": "2016-08-08 10:42:00",
            "bankName": "交通银行",
            "status": 0,
            "seq": 6,
            "intDom": "DOM",
            "isBank": "0",
            "merchantFeeRate": 0,
            "bankCode": "BCM",
            "paymentType": "EASYPAY",
            "pid": 17
        }, {
            "id": 19,
            "deleteFlag": 0,
            "createTime": "2016-08-08 10:42:00",
            "bankName": "光大银行",
            "status": 0,
            "seq": 7,
            "intDom": "DOM",
            "isBank": "0",
            "merchantFeeRate": 0,
            "bankCode": "CEB",
            "paymentType": "EASYPAY",
            "pid": 19
        }, {
            "id": 21,
            "deleteFlag": 0,
            "createTime": "2016-08-08 10:42:00",
            "bankName": "兴业银行",
            "status": 0,
            "seq": 8,
            "intDom": "DOM",
            "isBank": "0",
            "merchantFeeRate": 0,
            "bankCode": "CIB",
            "paymentType": "ALIPAY",
            "pid": 21
        }, {
            "id": 23,
            "deleteFlag": 0,
            "createTime": "2016-08-08 10:42:00",
            "bankName": "广发银行",
            "status": 0,
            "seq": 9,
            "intDom": "DOM",
            "isBank": "0",
            "merchantFeeRate": 0,
            "bankCode": "GDB",
            "paymentType": "ALIPAY",
            "pid": 23
        }, {
            "id": 25,
            "deleteFlag": 0,
            "createTime": "2016-08-08 10:42:00",
            "bankName": "邮政银行",
            "status": 0,
            "seq": 10,
            "intDom": "DOM",
            "isBank": "0",
            "merchantFeeRate": 0,
            "bankCode": "PSBC",
            "paymentType": "EASYPAY",
            "pid": 25
        }, {
            "id": 27,
            "deleteFlag": 0,
            "createTime": "2016-08-08 10:42:00",
            "bankName": "浦发银行",
            "status": 0,
            "seq": 11,
            "intDom": "DOM",
            "isBank": "0",
            "merchantFeeRate": 0,
            "bankCode": "SPDB",
            "paymentType": "EASYPAY",
            "pid": 27
        }, {
            "id": 29,
            "deleteFlag": 0,
            "createTime": "2016-08-08 10:42:00",
            "bankName": "民生银行",
            "status": 0,
            "seq": 12,
            "intDom": "DOM",
            "isBank": "0",
            "merchantFeeRate": 0,
            "bankCode": "CMBC",
            "paymentType": "EASYPAY",
            "pid": 29
        }, {
            "id": 31,
            "deleteFlag": 0,
            "createTime": "2016-08-08 10:42:00",
            "bankName": "平安银行",
            "status": 0,
            "seq": 13,
            "intDom": "DOM",
            "isBank": "0",
            "merchantFeeRate": 0,
            "bankCode": "SPA",
            "paymentType": "EASYPAY",
            "pid": 31
        }, {
            "id": 33,
            "deleteFlag": 0,
            "createTime": "2016-08-08 10:42:00",
            "bankName": "北京银行",
            "status": 0,
            "seq": 14,
            "intDom": "DOM",
            "isBank": "0",
            "merchantFeeRate": 0,
            "bankCode": "BCCB",
            "paymentType": "ALIPAY",
            "pid": 33
        }],
    "bankInfoOthers": [
        {
            "id": 33,
            "deleteFlag": 0,
            "createTime": "2016-08-08 10:42:41",
            "bankName": "支付宝",
            "status": 0,
            "seq": 0,
            "intDom": "DOM",
            "isBank": "1",
            "merchantFeeRate": 0,
            "bankCode": "ALIPAY",
            "paymentType": "ALIPAY",
            "pid": 17
        }, {
            "id": 19,
            "deleteFlag": 0,
            "createTime": "2016-08-08 10:42:41",
            "bankName": "微信",
            "status": 0,
            "seq": 0,
            "intDom": "DOM",
            "isBank": "1",
            "merchantFeeRate": 0,
            "bankCode": "WXPAY",
            "paymentType": "WXPAY",
            "pid": 19
        }, {
            "id": 21,
            "deleteFlag": 0,
            "createTime": "2016-08-08 10:42:41",
            "bankName": "易宝",
            "status": 0,
            "seq": 0,
            "intDom": "DOM",
            "isBank": "1",
            "merchantFeeRate": 0,
            "bankCode": "YEEPAY",
            "paymentType": "YEEPAY",
            "pid": 21
        }]
});


/**
 * 获取支付信息
 **/
function getPaymentInfo(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    interfaceModel.sendJson(res, 200, paymentInfo);
}

/**
 * 获取支支付处理费

 **/
function getPaymentProcessingFee(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);

    var requestParam = {
        "bankId": queryInfo.bankId,
        "faraFamilyCode": queryInfo.faraFamilyCode,
        "intDom": queryInfo.intDom
    }
    interfaceModel.sendJson(res, 200, {"status": "success", "merchantFeeRate": 0.01});
}

/**
 * 获取微信二维码支付结果
 **/
function getWXPaymentResult(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    interfaceModel.sendJson(res, 200, {"status": "fail"});
}

/**
 * 获取支付机构的页面路径
 **/
function getBankUrl(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if(true){
        interfaceModel.sendJson(res, 200, {"url": "https://www.baidu.com", "wxStateId": "werwrwerwe", "noPay": false});
    } else {
        interfaceModel.sendJson(res, 400, "erwerwerwer");
    }
}

/**
 * 获取机票状态
 **/
function getTicketStatus(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    interfaceModel.sendJson(res, 200, {"status": "failed"});
}

router.post('/getPaymentInfo', getPaymentInfo);
router.post('/getPaymentProcessingFee', getPaymentProcessingFee);
router.post('/getWXPaymentResult', getWXPaymentResult);
router.post('/getBankUrl', getBankUrl);
router.post('/getTicketStatus', getTicketStatus);
module.exports = router;