'use strict';

var express = require('express');
var router = express.Router();
var Mock = require("mockjs");
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));

var order = require('./order');//订单
var changeOrder = require('./changeOrder');//升舱改期
var refundTicket = require('./refundTicket');//退票




router.post('/createOrder', order.createOrder);
router.post('/getOrderList', order.getOrderList);

router.post('/getOrderDetail', order.getOrderDetail);
router.post('/getOrderPaymentDetail', order.getOrderPaymentDetail);
router.post('/getOrderRefundDetail', order.getOrderRefundDetail);
router.post('/sendTravelItinerary', order.sendTravelItinerary);

router.post('/cancelOrder', order.cancelOrder);
router.post('/getTicketUrl', order.getTicketUrl);
router.post('/cancelMarket', order.cancelMarket);
router.post('/getTicketUrl', order.getTicketUrl);

router.post('/getChangeOrderInfoBefore', changeOrder.getChangeOrderInfoBefore);
router.post('/getChangeOrderInfoAfter', changeOrder.getChangeOrderInfoAfter);
router.post('/calculatedPrice', changeOrder.calculatedPrice);
router.post('/updateShipSpaceInfo', changeOrder.updateShipSpaceInfo);

router.post('/getRefundDetail', refundTicket.getRefundDetail);
router.post('/getRefundCostInfo', refundTicket.getRefundCostInfo);
router.post('/refundApply', refundTicket.refundApply);

router.post('/searchOtaOrder', order.searchOtaOrder);

module.exports = router;