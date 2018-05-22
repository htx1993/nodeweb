var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var returnModel = require('./returnModel');
var userData = require(path.join(process.cwd(), 'data/' + config.company + '/interface/user/userData'));



/**
 * 查询乘机人列表
 * user_id 用户id
 * countryType 乘机人类型 0 1
 * pageIndex 当前页序号
 * pageSize 每一页记录的数量
 **/
exports.GetPassengerList = function (req, res, next) {
    var result = {};
    var dataArr = [];
    var queryInfo = interfaceModel.getParameter(req);
    if (queryInfo.countryType == 0) {
        dataArr = userData.passengerListDomestic.data;
    } else if (queryInfo.countryType == 1) {
        dataArr = userData.passengerListInternational.data;
    }

    result = interfaceModel.setPagingInfo(dataArr,queryInfo);

    interfaceModel.sendJson(res,200,result);
};

/**
 * 修改乘机人
 * 国内乘机人
 *  * user_id 用户id
 * id 该乘机人id
 * countryType 0 国内乘机人 1国际乘机人
 * lastName
 * lastName
 * idType
 * idNo
 * birthday
 * mobile
 * phone
 * email
 *
 * 国际乘机人
 *  * user_id 用户id
 * id 该乘机人id
 * countryType 0 国内乘机人 1国际乘机人
 * lastName
 * lastName
 * sex
 * birthday
 * passType
 * country 国籍
 * cardIssueCountry 护照签发国
 * cardNo 护照号码
 * cardValidDate 护照有效期
 **/
exports.updatepassenger = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (true) {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "修改成功"));
    }
    else {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "修改失败"));
    }
};
/**
 * 新增乘机人
 **/
exports.addpassenger = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (true) {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "添加成功"));
    }
    else {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "添加失败"));
    }
};
/**
 * 删除乘机人
 **/
exports.deletepassenger = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (true) {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(true, "删除成功"));
    }
    else {
        interfaceModel.sendJson(res,200,returnModel.umRreturnModel(false, "删除失败"));
    }
};