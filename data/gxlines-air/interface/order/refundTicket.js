var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var orderData = require(path.join(process.cwd(), 'data/' + config.company + '/interface/order/orderData'));


/**
 * 获取退票信息
 * orderCode 订单号
 **/
exports.getRefundDetail = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    orderData.refundInfo.orderNo = queryInfo.orderCode;
    interfaceModel.sendJson(res, 200, orderData.refundInfo);
};


var costInfo = {
    "success": true,
    "msg": "请求成功！",
    "operateCode": "0",
    "data": {
        "totalPrice": 19670, //旅客费用总额
        "poundage": 0,    //应扣手续费
        "ancillaryPoundage": 0, //应扣辅营手续费
        "totalRefundMoney": 19400,//应退总额
        "needRefundTicketFee": 0,//应退机票费用
        "totalMarketPrice": 19200,//票价
        "totalTaxFee": 200, //总税费
        "needRefundAncillaryMoney": 0,//应退还辅营产品金额
        "totalLuggagePrice": 0,//贵宾厅
        "totalMealPrice": 0,//机上餐食
        "totalInsurancePrice": 0,//订单总金额
        "totalOtherPoundage": 0,//应扣辅营费用
        "totalOtherRefundMoney": 270,//应退还辅营产品金额
        "totalBagsMoney": 230,//行李
        "totalMealsMoney": 40,//机上餐食
        "totalLoungesMoney": 0,//贵宾室费
        "totalSuitMoney": 0,//机上舒适设施
        "totalLifeMoney": 0,//航班意外险
        "totalDelayMoney": 0,//航班延误险
        "totalRefundInsuranceMoney": 0,//退票损失险
        "totalUntypeAncillaryMoney": 0,//其他
        "ticketRefundMoney": 19130,//应退机票费用
        "ticketPoundage": 0,//应扣机票手续费
        "refundType": "VOLUNTARY",
        "msg": "",
        "paxSegTaxFeeVos": [{
            "currencyCode": "CNY",
            "taxFeeAmount": 200,
            "taxFeeDesc": "民航发展基金",
            "taxFeeCode": "CN",
            "totalAmount": 0
        }],
        "totalSeatMoney": 0,
        "totalSmsMoney": 0,
        "totalConvenientMoney": 0,
        "totalMerchantMoney": 0,
        "totalItineraryMoney": 0
        /* "totalPrice": 1660,
         "poundage": 1360,
         "ancillaryPoundage": 0,
         "totalRefundMoney": 300,
         "needRefundTicketFee": 0,
         "totalMarketPrice": 1520,
         "totalTaxFee": 100,
         "needRefundAncillaryMoney": 0,
         "totalLuggagePrice": 0,
         "totalMealPrice": 0,
         "totalInsurancePrice": 0,
         "totalOtherPoundage": 40,
         "totalOtherRefundMoney": 0,
         "totalBagsMoney": 0,
         "totalMealsMoney": 0,
         "totalLoungesMoney": 0,
         "totalSuitMoney": 0,
         "totalLifeMoney": 0,
         "totalDelayMoney": 0,
         "totalRefundInsuranceMoney": 0,
         "totalUntypeAncillaryMoney": 0,
         "ticketRefundMoney": 300,
         "ticketPoundage": 1320,
         "refundType": "VOLUNTARY",
         "msg": "",
         "paxSegTaxFeeVos": [{
         "currencyCode": "CNY",
         "taxFeeAmount": 100,
         "taxFeeDesc": "民航发展基金",
         "taxFeeCode": "CN",
         "totalAmount": 0
         }],
         "totalSeatMoney": 0,
         "totalSmsMoney": 0,
         "totalConvenientMoney": 0,
         "totalMerchantMoney": 0,
         "totalItineraryMoney": 0*/
    }

};

/**
 * 获取获取退票的计费信息
 * orderCode 订单号
 * paxIds
 * refundType
 **/
exports.getRefundCostInfo = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    interfaceModel.sendJson(res, 200, {
        "status": "success",
        "message": "退票成功",
        "data": costInfo.data
    });
};


/**
 * 退票申请
 * orderCode 订单号
 * paxIds
 * refundType
 **/
exports.refundApply = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    interfaceModel.sendJson(res, 200, {
        "status": "success",
        "message": "退票成功"
    });
};

