var config = require('../../config');
var interfaceModel = require('../../interfaceModel');
var Trans = require('../../helper/TransReservation');
var utils = require('../../utils');
var grpcClient = require('../../grpcClient');
var localSession = require('../../../../session');
var _ = require('underscore')

exports.default = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    var orderNo = reqBody.orderCode || localSession.getOrderNo(req);

    if (orderNo) {
        var obj = {
            "reservationCode": orderNo,
        };

        var client = grpcClient.reservationRetrieve(req);


        var _callback = function (err, response) {
            if (!response) {
                interfaceModel.sendJson(res, 400, utils.alertMsg.NoResponse);
                return;
            }
            if (response.status !== "success") {
                interfaceModel.sendJson(res, 200, {
                    success: false,
                    msg: response.message,
                });
                return;
            }

            var orderDetail = Trans(response);

            interfaceModel.sendJson(res, 200, orderDetail);

        };

        utils.GrpcCallback(req, res, client, "reservationRetrieve", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);
}

exports.getOrderPaymentDetail = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);
    var orderNo = reqBody.orderCode;

    if (orderNo) {

        var paymentClient = grpcClient.PayAndIssueClient(req);

        var _paymentcallback = function (err1, response1) {

            if (response1 && response1.status == "success" && response1.data.length > 0) {
                interfaceModel.sendJson(res, 200, {paymentInfo: TransPaymentList(response1.data)});
            }
            else {
                interfaceModel.sendJson(res, 200, {paymentInfo: []});

            }
        };

        utils.GrpcCallback(req, res, paymentClient, "orderPaid", _paymentcallback, {
            "reservationCode": orderNo,
        });
    }
    else
        interfaceModel.sendJson(res, 200, {paymentInfo: []});

}

exports.getOrderRefundDetail = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);
    var orderNo = reqBody.orderCode;

    if (orderNo) {

        var refundClient = grpcClient.RefundClient(req);

        var _rechargecallback = function (err1, response2) {
            if (response2 && response2.refundList.length > 0) {
                interfaceModel.sendJson(res, 200, {refundInfos: response2.refundList});

            }
            else {
                interfaceModel.sendJson(res, 200, {refundInfos: []});
            }
        };

        utils.GrpcCallback(req, res, refundClient, "reimburses", _rechargecallback, {
            "reservationCode": orderNo,
        });
    } else
        interfaceModel.sendJson(res, 200, {refundInfos: []});
}

function TransPaymentList(paymentlist) {
    var _plist = [];
    _.each(paymentlist, function (item) {
        var paymentitem = {
            "paymentNo": item.paymentSeq,
            "tradeNo": item.tradeSeq,
            "payChannel": "kuaijie",
            "payAmount": item.amount,
            "totalPaidAmount": item.amount,
            "merchantFee": item.merchantFee,
            "tradeAmount": item.amount,
            "requestDate": item.payDate + ' ' + item.payTime,
            "responseDate": item.payDate + ' ' + item.payTime,
            "payStatus": item.status,
            "orderType": item.payPurpose,
            "failureReason": "",
            "failureReasonDescription": "",
            "scheduleSequence": 2,
            "invoiceSequence": 1,
            "paymentIdentifier": item.tradeSeq,
            "outTradeNo": "",
            "bankGroupCode": item.paymentType
        }
        _plist.push(paymentitem)
    })

    return _plist

}