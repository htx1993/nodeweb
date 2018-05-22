var config = require('../../config');
var interfaceModel = require('../../interfaceModel');
var Trans = require('../../helper/TransCart').TransShopCart;
var utils = require('../../utils');
var grpcClient = require('../../grpcClient');

exports.default = function (req, res) {
    var reqBody = req.body;

    if (reqBody.shoppingCartId) {
        var obj = {
            "shoppingCartId": reqBody.shoppingCartId,
            "itemId": reqBody.itemId
        };

        var client = grpcClient.shopcartClient(req);

        var _callback = function (err, response) {
            if (!response) {
                interfaceModel.sendJson(res, 200, {
                    "tripType": "",
                    "tripGroupVoList": [],
                    "totalAmout": "",
                    "shoppingCartId": "",
                    "guestPriceList": [],
                    "taxList": [],
                });
                return;
            }
            utils.Response(response, res, interfaceModel, Trans);
        };

        utils.GrpcCallback(req, res, client, "deleteItem", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);

};