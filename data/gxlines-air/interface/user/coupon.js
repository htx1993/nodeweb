var Mock = require("mockjs");
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var returnModel = require('./returnModel');


function getCouponListByStatus(status){
    if(status === null || status== "" || status === undefined){
        return Mock.mock({
            "data|36": [
                {
                    "id|+1": 5004,
                    "userId": 11,
                    "mobile": null,
                    "status|1": [0,1,2],
                    "couponCode": "A3W7771WDR",
                    "couponType": null,
                    "policyCode|1": 1001,
                    "policyName": "周年庆",
                    "activityCode|1": 1001,
                    "activityName|1": ["满100减10","满200减20","满500减50"],
                    "promotionCode": "50REDUCEPROMO",
                    "promotionName|1": ["满100减10","满200减20","满500减50"],
                    "activeCode": "0YWGQ7EKMNYBN3J",
                    "orderCode": null,
                    "fullPrice|1": [100,200,500],
                    "reducePrice|1": [10,20,50],
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
            ]
        });
    }else{
        return Mock.mock({
            "data|36": [
                {
                    "id|+1": 5004,
                    "userId": 11,
                    "mobile": null,
                    "status": status,
                    "couponCode": "A3W7771WDR",
                    "couponType": null,
                    "policyCode|1": 1001,
                    "policyName": "周年庆",
                    "activityCode|1": 1001,
                    "activityName|1": ["满100减10","满200减20","满500减50"],
                    "promotionCode": "50REDUCEPROMO",
                    "promotionName|1": ["满100减10","满200减20","满500减50"],
                    "activeCode": "0YWGQ7EKMNYBN3J",
                    "orderCode": null,
                    "fullPrice|1": [100,200,500],
                    "reducePrice|1": [10,20,50],
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
            ]
        });
    }

}



//获取优惠券列表
/**
 * 查询优惠券
 * user_id 用户id
 * pageIndex 当前页序号
 * pageSize 每一页记录的数量
 **/
exports.getCouponList = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var data = getCouponListByStatus(queryInfo.status).data;
    var result = interfaceModel.setPagingInfo(data, queryInfo);
    interfaceModel.sendJson(res, 200, result);
};
