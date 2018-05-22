var interfaceModel = require('../../interfaceModel');
var config = require('../../config');
var utils = require('../../utils');
var grpcClient = require('../../grpcClient');
var crypto = require('crypto');
var _ = require('underscore');
var Trans = require('../../helper/TransRefund');

var GetClient = function (req) {
    return grpcClient.RefundClient(req);
};

//退票查询接口
exports.refundDetail = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);
    if (reqBody.orderCode) {
        var resCode = reqBody.orderCode;
        var obj = {
            "resCode": resCode,
        };


        var client = GetClient(req);


        var _callback = function (err, response) {
            utils.Response(response, res, interfaceModel, Trans.TransRefundDetail);
        };

        utils.GrpcCallback(req, res, client, "refundDetail", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);
};

//退票费计算接口
exports.refundCalculate = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);
    if (reqBody.orderCode) {
        var resCode = reqBody.orderCode;
        var refundType = reqBody.refundType;
        var obj = {
            "paxIds": reqBody.paxIds,
            "resCode": resCode,
            "refundType": refundType,
        };


        var client = GetClient(req);


        var _callback = function (err, response) {
            if (!response) {
                response = {
                    "status": "failed",
                    "message": "您的退票提交失败，请刷新页面后重新提交!"
                }
            }

            if (response && response.message.indexOf('Do not find valid CompontType for pax') > -1) {
                response = {
                    "status": "failed",
                    "code": "0001",
                    "message": "业务处理中，请刷新页面后重新提交!"
                }
            }
            utils.Response(response, res, interfaceModel);
        };

        utils.GrpcCallback(req, res, client, "refundCalculate", _callback, obj);
    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);

};

//退票接口
exports.refundApply = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);
    if (reqBody.orderCode) {
        var resCode = reqBody.orderCode;
        var refundType = reqBody.refundType;
        var obj = {
            "paxIds": reqBody.paxIds,
            "resCode": resCode,
            "refundType": refundType,
            "remark": refundType == "VOLUNTARY" ? "自愿退票" : (reqBody.remark || "非自愿退票"),
        };


        var client = GetClient(req);


        var _callback = function (err, response) {
            if (!response) {
                response = {
                    "status": "failed",
                    "message": "您的退票提交失败，请刷新页面后重新提交!"
                }
            }
            interfaceModel.sendJson(res, 200, response);
        };

        utils.GrpcCallback(req, res, client, "refundApply", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);

};

//退辅营
exports.cancelMarket = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);
    if (reqBody.orderCode && reqBody.marketList) {
        var resCode = reqBody.orderCode;
        var resComList = "";
        var paxIds = "";
        _.each(reqBody.marketList, function (marketItem) {
            if (marketItem.indexOf('@') > -1) {
                var paxId = marketItem.split('@')[1];
                if (paxId.indexOf('~') > -1) {
                    paxIds += paxId.split('~')[0] + ",";
                    resComList += paxId.split('~')[1] + ',';
                }
            }
        });
        var obj = {
            "paxIds": paxIds,
            "resCode": resCode,
            "refundType": "BACKEND",
            "resComponentSquences": resComList,
            "applicantName": "",
        };


        var client = GetClient(req);


        var _callback = function (err, response) {
            interfaceModel.sendJson(res, 200, {
                "status": response.success ? "success" : "failed",
                "message": response.msg
            });
        };

        utils.GrpcCallback(req, res, client, "refundAncillaryAndInsurance", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);
};