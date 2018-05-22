var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var returnModel = require('./returnModel');
var userData = require(path.join(process.cwd(), 'data/' + config.company + '/interface/user/userData'));

//获取航班动态列表
/**
 * 查询邮寄地址
 * user_id 用户id
 * pageIndex 当前页序号
 * pageSize 每一页记录的数量
 **/
exports.getFlightStatusList = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    interfaceModel.sendJson(res, 200, userData.flightStatusList);
};
