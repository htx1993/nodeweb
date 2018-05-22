'use strict';

var express = require('express');
var router = express.Router();
var path = require("path");
var localSession = require(path.join(process.cwd(), "data/session"));

var login = function (req, res, next) {
    localSession.setSessionForThird({"id":88888});
    res.redirect("/airU/userInfo_third");
};

router.get("/login/weibo", login);
router.get("/login/weixin", login);
router.get("/login/alipay", login);

module.exports = router;