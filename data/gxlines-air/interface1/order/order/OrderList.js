var config = require('../../config');
var interfaceModel = require('../../interfaceModel');
var utils = require('../../utils');
var grpcClient = require('../../grpcClient');

exports.default = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);

    var obj = {
        "reservationCode": reqBody.orderNo || "",
        "status": !reqBody.orderState ? "" : reqBody.orderState.replace(/(^\s*)|(\s*$)/g, ""),
        "flightNumber": reqBody.flightNumber ? reqBody.flightNumber.toLowerCase().replace(config.companyAbbCode.toLowerCase(), '') : "",
        "startDate": reqBody.orderBeginDate || "",
        "endDate": reqBody.orderEndDate || "",
        "firstName": reqBody.firstName || "",
        "lastName": reqBody.lastName || "",
        "ticketNo": reqBody.ticketNo || "",
        "pageNum": parseInt(reqBody.pageIndex) ? parseInt(reqBody.pageIndex) : 0,
        "pageSize": reqBody.pageSize || 100,
    };


    var client = grpcClient.reservationSearchClient(req);

    var _callback = function (err, response) {
        var detail = {};
        if (response) {

            detail = {
                data: response.datas,
                pageSize: response.pageSize,
                total: response.totalCount,
                pageCount: response.totalPage,
                pageCurrent: response.pageNo
            }
        } else {
            detail = {
                data: [],
                pageSize: 0,
                total: 0,
                pageCount: 0,
                pageCurrent: 0
            }
        }
        interfaceModel.sendJson(res, 200, detail);
    };

    utils.GrpcCallback(req, res, client, "reservationSearch", _callback, obj);

};