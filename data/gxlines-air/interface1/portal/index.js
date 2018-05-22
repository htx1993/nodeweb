'use strict';

var express = require('express');
var router = express.Router();
var Mock = require("mockjs");
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));

var bannerList = [
    {
        "name":"ewrwer",
        "imgPath":"/images/portal/banner/banner01.jpg",
        "jumpPath":"javascript:;",
        "target":"_blank"
    },
    {
        "name":"ewrwer",
        "imgPath":"/images/portal/banner/banner02.jpg",
        "jumpPath":"javascript:;",
        "target":"_blank"
    },
];

/**
 * 获取banner图列表
 **/
function getBannerList(req, res, next){
    var queryInfo = interfaceModel.getParameter(req);
    interfaceModel.sendJson(res, 200, bannerList);
}


router.post('/getBannerList', getBannerList);
module.exports = router;
