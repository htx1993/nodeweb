var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var returnModel = require('./returnModel');

//检查唯一性

/**
 * 校验邮件是否已经存在
 * email 邮箱
 **/
exports.isExistByEmail = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (queryInfo && queryInfo.email == "123@qq.com"){
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "该邮件已经存在！"));
    }else{
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true));
    }
};

/**
 * 校验证件号码是否已经存在
 * idNo 证件号码
 **/
exports.isExistByIdNo = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (queryInfo && queryInfo.idNo == "111"){
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "该证件号码已经存在！"));
    }else{
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true));
    }
};

/**
 * 校验手机号码是否已经存在
 * mobile 手机号码
 **/
exports.isExistByMobile = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (queryInfo && queryInfo.mobile == "15888888888"){
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "该手机号码已经存在！"));
    }else{
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true));
    }
};

/**
 * 校验用户名是否已经存在
 * userName 用户名 需要转换成name
 **/
exports.isExistByName = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (queryInfo && queryInfo.userName == "qwe123"){
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "该用户名已经存在！"));
    }else{
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true));
    }
};

