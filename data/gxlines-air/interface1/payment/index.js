'use strict';

var express = require('express');
var router = express.Router();
var interfaceModel = require('../interfaceModel');
var paymentInfo = require('./getPaymentInfo');
var utils = require('../utils');

router.post('/getPaymentInfo', utils.CheckOTALogin, utils.GetTdpToken, paymentInfo.GetPaymentInfo);
router.post('/getBankUrl', utils.CheckOTALogin, utils.GetTdpToken, paymentInfo.getBankUrl);
router.post('/getWXPaymentResult', utils.CheckOTALogin, utils.GetTdpToken, paymentInfo.getWXPaymentResult);
router.post('/getWeChatCode', utils.CheckOTALogin, utils.GetTdpToken, paymentInfo.getBankUrl);
router.post('/getTicketStatus', utils.CheckOTALogin, utils.GetTdpToken, paymentInfo.getTicketStatus);

router.post('/getPaymentProcessingFee', utils.CheckOTALogin, utils.GetTdpToken, paymentInfo.getPaymentProcessingFee);

module.exports = router;