var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var returnModel = require('./returnModel');

/**
 * 第一步，验证旧密保
 * answer
 **/
exports.checkAnswer = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (true) {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "密保答案正确"));
    }
    else {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "密保答案错误"));
    }
};


/**
 * 第二步，修改密保和答案
 * question
 * answer
 **/
exports.updateQuestion = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (true) {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "修改成功"));
    }
    else {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "修改失败"));
    }
};