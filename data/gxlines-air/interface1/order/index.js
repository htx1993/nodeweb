'use strict';

var express = require('express');
var router = express.Router();
var utils = require('../utils');
var Refund = require('./ticket/Refund');
var changeOrder = require('./changeorder/index');

router.all('/createOrder', utils.CheckOTALogin, utils.GetTdpToken, require('./reservation/create').default);
router.post('/cancelOrder', utils.CheckOTALogin, utils.GetTdpToken, require('./reservation/cancel').default);

router.post('/getOrderList', utils.CheckLogin, utils.GetTdpToken, require('./order/OrderList').default);
router.post('/getOrderDetail', utils.CheckOTALogin, utils.GetTdpToken, require('./reservation/get').default);
router.post('/getOrderPaymentDetail', utils.CheckOTALogin, utils.GetTdpToken, require('./reservation/get').getOrderPaymentDetail);
router.post('/getOrderRefundDetail', utils.CheckOTALogin, utils.GetTdpToken, require('./reservation/get').getOrderRefundDetail);

router.post('/searchOtaOrder', utils.GetTdpToken, require('./order/OTAorder').default);


//退票
router.post('/getRefundDetail', utils.CheckOTALogin, utils.GetTdpToken, Refund.refundDetail);
router.post('/getRefundCostInfo', utils.CheckOTALogin, utils.GetTdpToken, Refund.refundCalculate);
router.post('/refundApply', utils.CheckOTALogin, utils.GetTdpToken, Refund.refundApply);
/**
 * 取消辅营
 *
 **/
router.post('/cancelMarket', utils.CheckLogin, utils.GetTdpToken, Refund.cancelMarket);


//升舱改期


router.post('/getChangeOrderInfoBefore', utils.CheckOTALogin, utils.GetTdpToken, changeOrder.getChangeOrderInfoBefore);
router.post('/getChangeOrderInfoAfter', utils.CheckOTALogin, utils.GetTdpToken, changeOrder.getChangeOrderInfoAfter);
router.post('/calculatedPrice', utils.CheckOTALogin, utils.GetTdpToken, changeOrder.calculatedPrice);
router.post('/updateShipSpaceInfo', utils.CheckOTALogin, utils.GetTdpToken, changeOrder.updateShipSpaceInfo);


module.exports = router;