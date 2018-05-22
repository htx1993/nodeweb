var config = require('../../config');
var interfaceModel = require('../../interfaceModel');
var Trans = require('../../helper/TransCart').TransShopCart;
var utils = require('../../utils');
var grpcClient = require('../../grpcClient');

exports.default = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    if (reqBody.shoppingCartId) {
        var offerUri = "/offers/" + reqBody.offerId; //查询地址
        var obj = {
            // "pos": config.pos,
          //  "languageCode": config.languageCode,
            "shoppingCartId": reqBody.shoppingCartId,
            "offerRef": [{
                "uri": offerUri
            }]
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

        utils.GrpcCallback(req, res, client, "update", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);

};