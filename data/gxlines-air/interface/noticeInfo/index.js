'use strict';

var express = require('express');
var router = express.Router();
var Mock = require("mockjs");
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));


var noticeList = Mock.mock({
    "noticeList|50": [{
        "pid|+1":1,
        "content":"@cparagraph(200)",
        "createTime|1484195576000-1484295576000":1484195576000,
        "creator":"@cname()",
        "deleteFlag":0,
        "publishTime":'@datetime("yyyy-MM-dd hh:mm:ss")',
        "status|0-1":0,
        "title":"@ctitle(30)"
    }]
});

/**
 * 获取公告列表
 **/
function getNoticeList(req, res, next){
    var queryInfo = interfaceModel.getParameter(req);
    var result = interfaceModel.setPagingInfo(noticeList.noticeList, queryInfo);
    interfaceModel.sendJson(res, 200, result);
}

/**
 * 获取公告详情
 **/
function getNoticeDetail(req, res, next){
    var queryInfo = interfaceModel.getParameter(req);
    interfaceModel.sendJson(res, 200, noticeList.noticeList[0]);
}


router.post('/getNoticeList', getNoticeList);
router.post('/getNoticeDetail', getNoticeDetail);
module.exports = router;
