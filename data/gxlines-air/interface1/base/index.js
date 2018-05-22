'use strict';

var express = require('express');
var router = express.Router();
var Mock = require("mockjs");
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var provinceData = require(path.join(process.cwd(), 'public/' + config.company + '/' + config.static_dir + '/js/data/province'));
var countryData = require(path.join(process.cwd(), 'public/' + config.company + '/' + config.static_dir + '/js/data/country'));

/**
 * 获取省市区数据
 **/
function getProvince(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var province = provinceData.getProvince();
    interfaceModel.sendJson(res, 200, province.data);
}

/**
 * 获取国家码
 **/
function getCountryList(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var country = countryData.getCountry();
    var newCountryList = [];
    (country.data || []).forEach(function(item){
        newCountryList.push({
            "code":item.code,
            "name":queryInfo.languageCode == "zh_CN" ? item.name : item.name_en
        });
    });
    interfaceModel.sendJson(res, 200, newCountryList);
}

/**
 * 获取国际电话区号
 **/
function getInterTelList(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var country = countryData.getCountry();
    var newInterTelListList = [];
    (country.data || []).forEach(function(item){
        newInterTelListList.push({
            "code":item.area_code,
            "name":queryInfo.languageCode == "zh_CN" ? item.name : item.name_en
        });
    });
    interfaceModel.sendJson(res, 200, newInterTelListList);
}

/**
 * 获取验证结果
 * mmvCode
 **/
function getVerificationResult(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    interfaceModel.sendJson(res, 200, {"status":"success"});
}

/**
 * 获取协议html片段
 **/
function getAgreementHtml(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var request = require('request');
    var originalUrl = "http://" + req.headers.host;

    console.log("getAgreementHtml:" + originalUrl + '/' + config.company + '/'+config.static_dir + "/html" + queryInfo.path);
    request(originalUrl + '/' + config.company + '/'+config.static_dir + "/html" + queryInfo.path, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            interfaceModel.sendJson(res, 200, {"status":"success","html":body});
        }else{
            interfaceModel.sendJson(res, 200, {"status":"failed"});
        }
    })
}

router.post('/province', getProvince);
router.post('/getCountryList', getCountryList);
router.post('/getInterTelList', getInterTelList);
router.post('/getVerificationResult', getVerificationResult);
router.post('/agreementHtml', getAgreementHtml);
module.exports = router;

