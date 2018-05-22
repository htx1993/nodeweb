'use strict';

var express = require('express');
var utils = require('../utils');
var router = express.Router();

var searchFlight = require('./searchFlightInfo/index');

var getFlightDetail = require('./getFlightDetail/index');
var selectFareFamilyCode = require('./selectFareFamilyCode/index');
var aircommend = require('./AirCommendLine');


router.post('/searchFlightInfo', utils.GetTdpToken, searchFlight.default);
router.post('/getFlightDetails', utils.GetTdpToken, getFlightDetail.default);
router.post('/selectFareFamilyCode', utils.GetTdpToken, selectFareFamilyCode.default);
router.all('/aircommendline', utils.GetTdpToken, aircommend.default);
router.all('/getPriceTrend', utils.GetTdpToken, aircommend.airTrend);

var baseInfo = require('./baseInfo');

router.all('/getLocation', utils.GetTdpToken, baseInfo.getLocation);
router.all('/getLocations', utils.GetTdpToken, baseInfo.getLocations);
router.all('/getAllLocations', baseInfo.getAllLocations);

module.exports = router;