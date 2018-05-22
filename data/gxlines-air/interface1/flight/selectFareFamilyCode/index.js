var interfaceModel = require('../../interfaceModel');
var config = require('../../config');
var utils = require('../../utils');
var _ = require('underscore');
var grpcClient = require('../../grpcClient');

exports.default = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    console.log(reqBody)

    if (reqBody.tdpUrlId && !reqBody.flag) {

        var tdpUrlList = reqBody.tdpUrlId.split('||');

        var itineraryList = [];

        _.each(tdpUrlList, function (item) {
            itineraryList.push(item)
        });

        var obj = {
            "itineraryPriceId": itineraryList
        };


        var client = grpcClient.AirTaxFeeCalculate(req);

        var _callback = function (err, response) {

            if (response && response.status == "success") {
                utils.Response(response.shoppingCart, res, interfaceModel);
            }
            else if (response && response.status == "failed" && response.code == "0999" && response.message == "No Price Found.") {
                interfaceModel.sendJson(res, 200, {message: "当前价格已被预订，请重新搜索选择最新机票价格！"});
            }
            else if (response && response.status == "failed" && response.message.indexOf("Document with id") > -1 && response.message.indexOf("not found") > -1) {
                interfaceModel.sendJson(res, 200, {message: "当前页面已失效，请刷新后重新查询航班！"});
            }
            else {
                interfaceModel.sendJson(res, 200, {message: "暂时无法完成您的检索，请稍后重试！"});
            }


        };

        utils.GrpcCallback(req, res, client, "price", _callback, obj);
    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);

};