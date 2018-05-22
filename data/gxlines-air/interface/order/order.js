var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var orderData = require(path.join(process.cwd(), 'data/' + config.company + '/interface/order/orderData'));
var localSession = require(path.join(process.cwd(), 'data/session'));
var _orderList = orderData.orderList;


/**
 * 创建订单
 **/
exports.createOrder = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var reservationCode = "555555555555555555";
    interfaceModel.sendJson(res, 200, reservationCode);
};


/**
 * 获取订单列表
 * userName 乘客姓名
 * flightNumber 航班号
 * ticketNo 票号
 * orderNo 订单号
 * orderState 订单状态
 * orderBeginDate 订单开始时间
 * orderEndDate 订单结束时间
 **/
exports.getOrderList = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var result = interfaceModel.setPagingInfo(_orderList, queryInfo);
    interfaceModel.sendJson(res, 200, result);
};


/**
 * 获取订单详情
 * orderCode 订单编号
 **/
exports.getOrderDetail = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    delete require.cache[require.resolve(path.join(process.cwd(), 'data/' + config.company + '/interface/order/orderData'))];
    var newOrderData = require(path.join(process.cwd(), 'data/' + config.company + '/interface/order/orderData'));

    var orderDetail = newOrderData.orderDetail;
    orderDetail.orderInfo.orderCode = queryInfo.orderCode;
    (_orderList || []).forEach(function(item){
        if(item.code == orderDetail.orderInfo.orderCode){
            orderDetail.orderInfo.orderState = item.status;
            if(item.status == "TICKETED"){
                (orderDetail.action||[]).forEach(function(o){
                    if(o.code == "ONLINE_PAYMENT"){
                        o.enabled = false;
                    }else{
                        o.enabled = true;
                    }
                });
            }
            if(item.status == "CANCELLED" || item.status == "REFUNDED"){
                (orderDetail.action||[]).forEach(function(o){
                    if(o.code == "TRAVEL_EXTRAS_OPTION" || o.code == "ONLINE_PAYMENT" || o.code == "CANCEL_ORDER" || o.code == "ERROR_REFUND" || o.code == "REFUND_ORDER" || o.code == "CHANGE_ITINERARY" || o.code == "SELECT_SEATS"){
                        o.enabled = false;
                    }else{
                        o.enabled = true;
                    }
                });
            }
            if(item.status == "BOOKED" || item.status == "QUOTE"){
                (orderDetail.action||[]).forEach(function(o){
                    if(o.code == "TRAVEL_EXTRAS_OPTION" || o.code == "ERROR_REFUND" || o.code == "REFUND_ORDER" || o.code == "CHANGE_ITINERARY" || o.code == "SELECT_SEATS"){
                        o.enabled = false;
                    }else{
                        o.enabled = true;
                    }
                });
            }
            //已出票  已预订  已报价  已取消  已退款
            //"TICKETED","BOOKED","QUOTE","CANCELLED","REFUNDED"
        }
    });
    orderDetail.success = true;
    orderDetail.msg = "ewrwerwerwer";
    interfaceModel.sendJson(res, 200, orderDetail);
};

/**
 * 获取订单详情里面的支付信息
 * orderCode 订单编号
 **/
exports.getOrderPaymentDetail = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var paymentInfo = orderData.paymentInfo;
    interfaceModel.sendJson(res, 200, paymentInfo);
};

/**
 * 获取订单详情里面的退款信息
 * orderCode 订单编号
 **/
exports.getOrderRefundDetail = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var refundInfos = orderData.refundInfos;
    interfaceModel.sendJson(res, 200, refundInfos);
};

/**
 * 发送行程单
 * orderCode 订单编号
 * email 邮箱
 **/
exports.sendTravelItinerary = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    interfaceModel.sendJson(res, 200, {"status": "success"});
};


/**
 * 取消订单
 * orderCode 订单编号
 **/
exports.cancelOrder = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    interfaceModel.sendJson(res, 200, {
        "status": "success",
        "message": "取消订单成功"
    });
};


/**
 * 获取获取出票接口
 * orderCode 订单编号
 **/
exports.getTicketUrl = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    interfaceModel.sendJson(res, 200, {"url": "http://va.tianjin-air.com/airsyspay/checkout"});
};


/**
 * 取消辅营
 *
 **/
exports.cancelMarket = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    interfaceModel.sendJson(res, 200, {
        "status": "success",
        "message": "取消辅营成功"
    });
};

/**
 * 继续支付
 *
 **/
exports.getTicketUrl = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    interfaceModel.sendJson(res, 200, {
        "reservationCode": "000012342",
        "url": config.server_host + "/airP/paymentContent",
        "message": "确认去支付"
    });
};


/**
 * 查询OTA订单
 *
 **/
exports.searchOtaOrder = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (true) {
        //假登录
        localSession.setSessionForOTA(req, "159334343434");
        interfaceModel.sendJson(res, 200, {
            "reservationCode": "000012342",
            "status": "success",
            "message": ""
        });
    } else {
        localSession.setSessionForOTA(req);
        interfaceModel.sendJson(res, 200, {
            "reservationCode": "000012342",
            "status": "failed",
            "message": "订单不存在"
        });
    }
};
