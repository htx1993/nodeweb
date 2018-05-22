'use strict';

var Mock = require("mockjs");

var express = require('express');
var router = express.Router();
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var shoppingCartInfo = require(path.join(process.cwd(), 'data/' + config.company + '/interface/shoppingCart/data'));

function getShoppingCartInfo(req, res, next) {
    interfaceModel.sendJson(res, 200, {
        "status":"success",
        "message":"nnnnnnn",
        "shoppingCart":shoppingCartInfo.shoppingCartInfo
    });
};

router.post('/getShoppingCartInfo', interfaceModel.checkLogin, getShoppingCartInfo);

module.exports = router;