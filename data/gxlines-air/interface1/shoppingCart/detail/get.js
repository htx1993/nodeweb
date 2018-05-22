var config = require('../../config');
var interfaceModel = require('../../interfaceModel');
var utils = require('../../utils');
var grpcClient = require('../../grpcClient');

exports.default = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    if (reqBody.shoppingCartId) {

        var obj = {
            "shoppingCartId": reqBody.shoppingCartId,
        };

        var client = grpcClient.shopcartClient(req);

        var _callback = function (err, response) {
            if (response && response.status == "success") {
                interfaceModel.sendJson(res, 200, {
                    "status": "success",
                    "code": "0000",
                    "message": "查询成功",
                    "shoppingCart": response.shoppingCart
                });
            }
            else {
                interfaceModel.sendJson(res, 200, {
                    "status": "failed",
                    "code": "0250",
                    "message": "当前操作已失效,请到航班搜索页面重新检索",
                    "data": null
                });
            }

        };

        utils.GrpcCallback(req, res, client, "getShoppingCart", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 200, {
            "status": "failed",
            "code": "0250",
            "message": "当前操作已失效,请到航班搜索页面重新检索",
            "shoppingCart": null
        });

};