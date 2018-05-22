var interfaceModel = require('../interfaceModel');
var config = require('../config');
var utils = require('../utils');
var grpcClient = require('../grpcClient');
var localSession = require('../../../session')
var compile = require('../../../tools/compile')
var _ = require('underscore')

exports.GetPaymentInfo = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    if (reqBody.orderCode) {

        var obj = {
            "reservationCode": reqBody.orderCode,
        };

        var client = grpcClient.PayAndIssueClient(req)

        var _callback = function (err, response) {
            utils.Response(response, res, interfaceModel, Trans);
        };

        utils.GrpcCallback(req, res, client, "checkOut", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);
};

exports.getBankUrl = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);


    if (reqBody.reservationCode) {

        var returnUrl = config.hostdomain + "/airP/payment?type=success&orderCode=" + compile.compile(reqBody.reservationCode);

        if (reqBody.pos && reqBody.pos == "mobile") {
            returnUrl = config.hostdomain + "/mobile/feedback/" + compile.compile(reqBody.reservationCode) + "?status1=success";
        }

        var userinfo = localSession.getSessionUserInfo(req)
        var obj = {
            "reservationCode": reqBody.reservationCode || "",
            "totalAmount": reqBody.unPaidTotalAmount,
            "bankId": reqBody.pid ? (reqBody.pid + "") : "1",
            "payPurpose": reqBody.payPurpose || "",
            "userName": userinfo ? userinfo.userName : "",
            "returnUrl": returnUrl || "",
            "fareFamilyCode": reqBody.faraFamilyCode || "",
            "intDom": reqBody.intDom || "dom"
        };
        var client = grpcClient.PayAndIssueClient(req)


        if (reqBody.unPaidTotalAmount == 0) {
            var _callback = function (err, response) {
                if (response && response.status == "success")
                    utils.Response({"url": "", "wxStateId": "0", "noPay": true}, res, interfaceModel);
                else
                    interfaceModel.sendJson(res, 400, "获取支付地址失败");
            };

            utils.GrpcCallback(req, res, client, "noPayIssue", _callback, obj);
        } else {
            var _callback = function (err, response) {
                if (response && response.status == "success")
                    utils.Response({"url": response.url, "wxStateId": response.wxStateId || 0}, res, interfaceModel);
                else
                    interfaceModel.sendJson(res, 400, "获取支付地址失败");
            };

            utils.GrpcCallback(req, res, client, "payOrder", _callback, obj);
        }
    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);
};


exports.getWXPaymentResult = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);


    if (reqBody.wxStateId) {


        var obj = {
            "wxStateId": reqBody.wxStateId
        };
        var client = grpcClient.PayAndIssueClient(req)

        var _callback = function (err, response) {
            if (response)
                utils.Response(response, res, interfaceModel);
            else
                interfaceModel.sendJson(res, 400, "获取支付状态失败");
        };

        utils.GrpcCallback(req, res, client, "wxpayState", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);
};


exports.getTicketStatus = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);


    if (reqBody.orderCode) {

        var obj = {
            "reservationCode": reqBody.orderCode
        };
        var client = grpcClient.PayAndIssueClient(req)

        var _callback = function (err, response) {
            if (response)
                utils.Response(response, res, interfaceModel);
            else
                interfaceModel.sendJson(res, 400, {status: 'failed'});
        };

        utils.GrpcCallback(req, res, client, "issueStatus", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);
};


exports.getPaymentProcessingFee = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    if (reqBody.bankId) {

        var obj = {
            "bankId": reqBody.bankId + "",
            "fareFamilyCode": reqBody.faraFamilyCode,
            "intDom": reqBody.intDom,
            "payPurpose": reqBody.payPurpose || "",
        };
        var client = grpcClient.PayAndIssueClient(req)

        var _callback = function (err, response) {
            interfaceModel.sendJson(res, 200, response);
        };

        utils.GrpcCallback(req, res, client, "matchRule", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 200, utils.alertMsg.EmptyParam);
};

function Trans(response) {
    if (response.status == "success") {
        var shopcart = response.shopCart;

        var reservationInfo = {
            "reservationCode": shopcart.reservationCode,
            "passengers": shopcart.passengers,
            "payPurpose": shopcart.payPurpose,
            "tripType": shopcart.tripType,
            "itinerarySegments": shopcart.itinerarySegments,
            "unPaidTotalAmount": shopcart.unPaidTotalAmount || 0,
            "unPaidItineraryPrice": shopcart.unPaidItineraryPrice || {},
            "unPaidInsurances": shopcart.unPaidInsurances,
            "unPaidAncillaries": shopcart.unPaidAncillaries,
            "changedItinerarySegments": shopcart.changedItinerarySegments,
            "changedItineraryPrice": shopcart.changedItineraryPrice,
            "changeFee": shopcart.changeFee,
            "ff": shopcart.ff,
            "payRestTime": shopcart.payRestTime,
            "faraFamilyCode": shopcart.ffCode,
        }

        var _bankInfos = [];

        _.each(shopcart.bankInfos, function (item) {
            var _bankitem = item;
            _bankitem.pid = item.id;
            _bankInfos.push(_bankitem)
        })

        var _otherbankInfos = [];

        _.each(shopcart.bankInfoOthers, function (item) {
            var _bankitem = item;
            _bankitem.pid = item.id;
            _otherbankInfos.push(_bankitem)
        })


        var order = {
            reservationInfo: reservationInfo,
            bankInfos: _bankInfos,
            bankInfoOthers: _otherbankInfos
        }

        return order
    }
    else
        return {message: response.message}
}
