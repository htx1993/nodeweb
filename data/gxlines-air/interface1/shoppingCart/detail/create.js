var config = require('../../config');
var interfaceModel = require('../../interfaceModel');
var Trans = require('../../helper/TransCart').TransShopCart;
var grpcClient = require('../../grpcClient');
var utils = require('../../utils');


exports.default = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    if (reqBody.offerId) {

        var obj = {
            "offerRef": [{
                "id": reqBody.offerId
            }]
        };

        console.log(JSON.stringify(obj));

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

        utils.GrpcCallback(req, res, client, "create", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);

};