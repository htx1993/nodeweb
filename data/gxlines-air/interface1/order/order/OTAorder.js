var config = require('../../config');
var interfaceModel = require('../../interfaceModel');
var utils = require('../../utils');
var grpcClient = require('../../grpcClient');
var path = require('path')
var localSession = require(path.join(process.cwd(), 'data/session'));
var returnModel = require('../../user/returnModel');

exports.default = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    console.log("reqBody:" + JSON.stringify(reqBody));

    if (reqBody.orderCode && reqBody.valiCode && reqBody.mobile) {
        //检查手机验证码
        var checkcode = localSession.getMobileCode(req, reqBody.mobile);
        if (!checkcode) {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMCodeFailed));
            return;
        }
        if (checkcode !== reqBody.valiCode) {
            interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.UMCodeError));
            return;
        }

        var mobile = reqBody.mobile.indexOf('-') > -1 ? reqBody.mobile.split('-')[1]
            : reqBody.mobile;
        var obj = {
            "reservationCode": reqBody.orderCode || "",
            "mobile": mobile
        };


        var client = grpcClient.reservationCheck(req);

        var _callback = function (err, response) {
            if (response && response.status == "success") {
                localSession.setSessionForOTA(req, response.userSessionId);
                interfaceModel.sendJson(res, 200, {
                    "reservationCode": reqBody.orderCode,
                    "status": "success",
                    "message": "",
                    "otaID": response.userSessionId
                });
            } else {
                localSession.setSessionForOTA(req);
                interfaceModel.sendJson(res, 200, {
                    "reservationCode": reqBody.orderCode,
                    "status": "failed",
                    "message": response ? response.message : "请求失败"
                });
            }
        };

        utils.GrpcCallback(req, res, client, "reservationCheck", _callback, obj);
    }
    else
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.LoginMobileEmpty));
};