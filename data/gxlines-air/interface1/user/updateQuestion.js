var interfaceModel = require('../interfaceModel');
var returnModel = require('./returnModel');
var config = require('../config');
var utils = require('../utils');
var grpcClient = require('../grpcClient');


var GetClient = function (req) {

    return grpcClient.userClient(req);
};


/**
 * 第一步，验证旧密保
 * answer
 **/
exports.checkAnswer = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (queryInfo.question && queryInfo.answer) {
        var userId = utils.GetUserID(req);
        var obj = {
            "userId": userId,
            "answer": queryInfo.answer
        };


        var client = GetClient(req);

        var _callback = function (err, response) {
            if (response.status == "success") {
                interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, "密保答案正确"));
            }
            else {
                interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, "密保答案错误"));
            }
        };

        utils.GrpcCallback(req, res, client, "checkAnswer", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.PassAnswerEmpty));

}
;


/**
 * 第二步，修改密保和答案
 * question
 * answer
 **/
exports.updateQuestion = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (queryInfo.question && queryInfo.answer) {
        var userId = utils.GetUserID(req);
        var obj = {
            "userId": userId,
            "newQuestion": queryInfo.question,
            "newAnswer": queryInfo.answer
        };

        var client = GetClient(req);


        var _callback = function (err, response) {
            utils.Response(response, res, interfaceModel);
        };

        utils.GrpcCallback(req, res, client, "updateQuestion", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, utils.alertMsg.PassAnswerEmpty));

};