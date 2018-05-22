var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var returnModel = require('./returnModel');
var userData = require(path.join(process.cwd(), 'data/' + config.company + '/interface/user/userData'));

//获取邮寄地址列表
/**
 * 查询邮寄地址
 * user_id 用户id
 * pageIndex 当前页序号
 * pageSize 每一页记录的数量
 **/
exports.GetAddressList = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var result = interfaceModel.setPagingInfo(userData.addressList.data,queryInfo);
    interfaceModel.sendJson(res,200,result);
};


/**
 * 修改邮寄地址
 * user_id 用户id
 * id 该邮寄地址的id
 * receiveName 收件人姓名
 * province 省份
 * city 市区
 * county 县区
 * address 详细地址
 * postCode 邮编
 * mobile 手机号码
 * phone 固定电话
 * email 邮箱
 **/
exports.updateMailAddress = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (true) {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "修改成功"));
    }
    else {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "修改失败"));
    }
};

/**
 * 新增邮寄地址
 * 参数同上面的修改接口
 **/
exports.addMailAddress = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (true) {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "添加成功"));
    }
    else {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "添加失败"));
    }
};

/**
 * 删除邮寄地址
 * user_id 用户id
 * id 该邮寄地址id
 **/
exports.deleteMailAddress = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (true) {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "删除成功"));
    }
    else {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "删除失败"));
    }
};

