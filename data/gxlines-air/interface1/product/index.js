'use strict';

var express = require('express');
var router = express.Router();
var config = require('../config');
var utils = require('../utils');
var grpcClient = require('../grpcClient');

var localSession = require('../../../session');
var interfaceModel = require('../interfaceModel');
var _ = require('underscore');

function getProductInfo(req, res, next) {

    var reqBody = interfaceModel.getParameter(req);
    console.log(reqBody);
    if (!reqBody.shoppingCartId) {
        interfaceModel.sendJson(res, 400, utils.alertMsg.SearchFuyinFailed);
        return;
    }
    var obj = {
        "touchpoint": "BOOKING_PREPAYMENT",
        "shoppingCartId": reqBody.shoppingCartId,
        "reservationCode": ""
    };

    var client = grpcClient.productClient(req);

    var _callback = function (err, response) {

        if (!response) {
            response = {
                "userSession": "",
                "error": [],
                "warning": [],
                "touchpoint": "MMB_TRAVEL_EXTRAS",
                "group": []
            }
        }
        utils.Response(response, res, interfaceModel);
    };

    utils.GrpcCallback(req, res, client, "queryMerchandizing", _callback, obj);

};

function getMMBProductInfo(req, res, next) {

    var reqBody = interfaceModel.getParameter(req);

    var obj = {
        "touchpoint": "MMB_TRAVEL_EXTRAS",
        "reservationCode": reqBody.orderCode,
        "shoppingCartId": ""
    };


    var client = grpcClient.productClient(req);

    var _callback = function (err, response) {
        if (!response) {
            response =
                {
                    "userSession": "",
                    "error": [],
                    "warning": [],
                    "touchpoint": "MMB_TRAVEL_EXTRAS",
                    "group": []
                }
        }
        utils.Response(response, res, interfaceModel);
    };

    utils.GrpcCallback(req, res, client, "queryMerchandizing", _callback, obj);

};

function addProductInfo(req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    if (!reqBody.shoppingCartId) {
        interfaceModel.sendJson(res, 400, utils.alertMsg.SearchFuyinFailed);
        return;
    }
    if (reqBody.offerId) {
        var productlist = reqBody.offerId.split('@');
        var obj = {
            "merchandizingId": productlist,
            "shoppingCartId": reqBody.shoppingCartId,
        };


        var client = grpcClient.productClient(req);

        var _callback = function (err, response) {
            if (!response || response.status !== "success") {
                interfaceModel.sendJson(res, 400, utils.alertMsg.BuyFuyinFailed);
            }
            else
                CreateOrder(reqBody, req, res);
        };

        utils.GrpcCallback(req, res, client, "priceAncillary", _callback, obj);
    }
    else
        CreateOrder(reqBody, req, res);
};

function addMMBProductInfo(req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    if (!reqBody.orderCode) {
        interfaceModel.sendJson(res, 400, utils.alertMsg.SearchFuyinFailed);
        return;
    }



    if (reqBody.offerId) {

        var mmbProduct = reqBody.offerId.split("@");
        var productlist = [];
        _.each(mmbProduct, function (mmbItem) {
            var mmblist = mmbItem.split('|');
            var mmbls = mmblist.length > 1 ? mmblist[1] : mmblist[0]
            productlist.push(mmbls)
        })
        var obj = {
            "merchandizingId": productlist,
            "reservationCode": reqBody.orderCode,
        };


        var client = grpcClient.productClient(req);

        var _callback = function (err, response) {
            if (response) {
                utils.Response(response, res, interfaceModel);
            }
            else
                interfaceModel.sendJson(res, 400, utils.alertMsg.BuyFuyinFailed);
        };

        utils.GrpcCallback(req, res, client, "addMerchandizing", _callback, obj);
    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.SelectFuyinEmpty);
};

function CreateOrder(reqBody, req, res) {
    var obj = {
        "shoppingCartId": reqBody.shoppingCartId,
    };

    var client = grpcClient.reservationCreateClient(req);

    var _callback = function (err, response) {
        if (response) {

            if (response.status == "success") {
                localSession.setOrderNo(req, {"reservationCode": response.reservation.code});
                interfaceModel.sendJson(res, 200, {
                    orderCode: response.reservation.code,
                    status: "success"
                });
            }
            else {
                if (response && response.code == "0482") {
                    interfaceModel.sendJson(res, 200, {
                        status: "failed", "message": response.message, "code": "0001"
                    })
                }
                else {
                    interfaceModel.sendJson(res, 200, {
                        status: "failed", "message": response.message, "code": "0002"
                    })
                }
            }

        }
        else
            interfaceModel.sendJson(res, 400, utils.alertMsg.CreateOrderFailed);
    };

    utils.GrpcCallback(req, res, client, "createReservation", _callback, obj);

}

router.post('/getProductInfo', utils.CheckLogin, utils.GetTdpToken, getProductInfo);
router.all('/addProductInfo', utils.CheckLogin, utils.GetTdpToken, addProductInfo);

router.post('/getMMBProductInfo', utils.CheckLogin, utils.GetTdpToken, getMMBProductInfo);
router.post('/addMMBProductInfo', utils.CheckLogin, utils.GetTdpToken, addMMBProductInfo);

module.exports = router;