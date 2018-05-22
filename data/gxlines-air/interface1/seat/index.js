'use strict';

var express = require('express');
var router = express.Router();
var utils = require('../utils');
router.all('/getFlightInfo', utils.CheckLogin, utils.GetTdpToken, require('./detail/getflightinfo').getFlightInfo);
router.all('/getSeatMapInfo', utils.CheckLogin, utils.GetTdpToken, require('./detail/getseatmap').default);
router.all('/chooseSeat', utils.CheckLogin, utils.GetTdpToken, require('./detail/chooseseat').chooseSeat);


router.post('/getMMBFlightInfo', utils.CheckLogin, utils.GetTdpToken, require('./detail/getflightinfo').getMMBFlightInfo);
router.post('/getMMBSeatMapInfo', utils.CheckLogin, utils.GetTdpToken, require('./detail/getseatmap').default);
router.post('/chooseMMBSeat', utils.CheckLogin, utils.GetTdpToken, require('./detail/chooseseat').chooseMMBSeat);

module.exports = router;