var Mock = require("mockjs");
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var returnModel = require('./returnModel');


var couponList = Mock.mock({
    'data|30': [{
        'id|+1': 1,
        'userId': '@string("number", 3)',
        "receiveName": "@cname()",
        "province": "@province()",
        "city": "@city()",
        "county": "@county()",
        "address": "刘家村3号",
        "mobile": '186' + '@string("number", 8)',
        "phone": '027-' + '@string("number", 8)',
        "postCode": '@zip',
        "email": '@email()'
    }]
});

var couponList1 = Mock.mock({
    "content|36": [
        {
            "id": 5004,
            "userId": 11,
            "mobile": null,
            "status": 0,
            "couponCode": "A3W7771WDR",
            "couponType": null,
            "policyCode": "0002",
            "policyName": "周年庆",
            "activityCode": "0002",
            "activityName": "满500减50",
            "promotionCode": "50REDUCEPROMO",
            "promotionName": "满500减50",
            "activeCode": "0YWGQ7EKMNYBN3J",
            "orderCode": null,
            "fullPrice": 500,
            "reducePrice": 50,
            "fareFamilyCode": "",
            "cabin": "",
            "origin": "AQG",
            "destination": "AAT",
            "flightStartDate": 1474966359000,
            "flightEndDate": 1474966359000,
            "sendType": 1,
            "validStartDate": "2016-09-20",
            "validEndDate": "2016-10-20",
            "sendTime": 1474598358000,
            "usedTime": 1474966359000,
            "remark": null
        }
    ],
    "last": true,
    "totalElements": 5,
    "totalPages": 1,
    "sort": null,
    "numberOfElements": 5,
    "first": false,
    "size": 10,
    "number": 1
})
//获取优惠券列表
/**
 * 查询优惠券
 * user_id 用户id
 * pageIndex 当前页序号
 * pageSize 每一页记录的数量
 **/
exports.getCouponList = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var result = interfaceModel.setPagingInfo(couponList.data, queryInfo);
    interfaceModel.sendJson(res, 200, result);
};
