var interfaceModel = require('../interfaceModel');
var config = require('../config');
var utils = require('../utils');
var grpcClient = require('../grpcClient');
var Mock = require('mockjs')
var _ = require('underscore')

exports.default = function (req, res, next) {

    var obj = {
    };


    var client = grpcClient.airCommendLineClient(req);

    var _callback = function (err, response) {
        if (!response || response.citys.length == 0) {
            interfaceModel.sendJson(res, 200, {
                "status": "FAILED",
                "code": "",
                "data": []
            });
        }
        else {
            var result = {
                "status": "SUCCESS",
                "citys": [],
                "data": []
            }
            _.each(response.citys, function (item) {
                result.citys.push({
                    "city": item
                })
            });

            _.each(response.data, function (item) {
                _.each(item.lines, function (_item) {
                    result.data.push(_item)
                })
            })
            utils.Response(result, res, interfaceModel);

        }
    };

    utils.GrpcCallback(req, res, client, "recommendLineSearch", _callback, obj);
};

exports.airTrend = function (req, res, next) {

    var reqBody = interfaceModel.getParameter(req);
    var fareslist = [];
    var client = grpcClient.AirFareTrendSearch(req);

    var _getlist = function (org, dst, _callback) {

        utils.GrpcCallback(req, res, client, "airFareTrends", function (err, response) {

            if (response && response.fares.length > 0) {
                fareslist.push({"org": response.org, "dst": response.dst, "fares": response.fares})
            }
            _callback();
        }, {
            org: org, dst: dst, "startDate": reqBody.startDate, "endDate": reqBody.endDate
        });
    }

    if (reqBody.query.length == 1 && reqBody.query[0].org && reqBody.query[0].dst) {
        _getlist(reqBody.query[0].org, reqBody.query[0].dst, function () {
            utils.Response(fareslist, res, interfaceModel);
        })
    }
    else if (reqBody.query.length == 2 && reqBody.query[0].org && reqBody.query[0].dst) {
        _getlist(reqBody.query[0].org, reqBody.query[0].dst, function () {
            _getlist(reqBody.query[1].org, reqBody.query[1].dst, function () {
                utils.Response(fareslist, res, interfaceModel);
            })
        })
    }
    else {
        utils.Response(fareslist, res, interfaceModel);
    }
}