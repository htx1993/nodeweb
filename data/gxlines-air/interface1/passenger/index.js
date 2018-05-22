'use strict';

var express = require('express');
var utils = require('../utils');
var router = express.Router();


router.post('/getTravellers', utils.CheckLogin, utils.GetTdpToken, require('./GetPassenger').GetPassengerList);
router.post('/addTravellers', utils.CheckLogin, utils.GetTdpToken, require('./addPassenger').default);

module.exports = router;