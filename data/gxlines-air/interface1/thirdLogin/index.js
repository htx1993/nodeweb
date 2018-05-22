'use strict';

var express = require('express');
var utils = require('../utils');
var router = express.Router();

var login = require("./login");

router.get("/login/weibo", utils.GetTdpToken, login.weibo.auth);
router.get("/login/callback/weibo", utils.GetTdpToken, login.weibo.token);
router.get("/login/cancel/weibo", utils.GetTdpToken, login.weibo.cancel);

router.get("/login/weixin", utils.GetTdpToken, login.weixin.auth);
router.get("/login/callback/weixin", utils.GetTdpToken, login.weixin.token);
router.get("/login/cancel/weixin", utils.GetTdpToken, login.weixin.cancel);

router.get("/login/alipay", utils.GetTdpToken, login.alipay.auth);
router.get("/login/callback/alipay", utils.GetTdpToken, login.alipay.token);
router.get("/login/cancel/alipay", utils.GetTdpToken, login.alipay.cancel);


module.exports = router;