'use strict';

var express = require('express');
var utils = require('../utils');
var router = express.Router();

var createShoppingCart = require('./detail/create');
var getShoppingCart = require('./detail/get');
var updateShoppingCart = require('./detail/update');
var deleteShoppingCart = require('./detail/delete');

router.post('/createShoppingCart', utils.CheckLogin, utils.GetTdpToken, createShoppingCart.default);
router.post('/getShoppingCartInfo', utils.CheckLogin, utils.GetTdpToken, getShoppingCart.default);
router.post('/updateShopcart', utils.CheckLogin, utils.GetTdpToken, updateShoppingCart.default);
router.post('/deleteShopcart', utils.CheckLogin, utils.GetTdpToken, deleteShoppingCart.default);

module.exports = router;