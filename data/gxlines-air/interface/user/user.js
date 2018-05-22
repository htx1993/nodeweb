var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var returnModel = require('./returnModel');
var localSession = require(path.join(process.cwd(), 'data/session'));
var userData = require(path.join(process.cwd(), 'data/' + config.company + '/interface/user/userData'));

var userInfo = userData.userInfo;

/**
 * 获取用户信息
 * id  用户id
 * */
exports.getUserInfo = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (true) {
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, "", localSession.getSessionUserInfo(req)));
    } else {
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, "该用户不存在"));
    }
};


/**
 * 修改用户信息
 * id  用户id
 * userName 用户名 需要转换成name
 * lastName
 * firstName
 * sex
 * idType
 * idNo
 * birthday
 * mobile
 * phone
 * email
 * */
exports.updateUserInfo = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    console.log(JSON.stringify(queryInfo));
    if (true) {
        localSession.setSessionUserInfo(req, queryInfo);
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, "用户信息保存成功"));
    } else {
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, "用户信息保存失败"));
    }
};

/**
 * 绑定用户手机号码
 * id  用户id
 * mobile
 * */
exports.bindMobile = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (true) {
        localSession.setSessionUserInfo(req, userInfo);
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, "手机号码绑定成功"));
    } else {
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, "手机号码绑定失败"));
    }
};


/**
 * 注册用户
 * userName 用户名转 需要换成name
 * password
 * lastName
 * firstName
 * sex
 * idType
 * idNo
 * birthday
 * mobile
 * phone
 * email
 * question
 * answer
 **/
exports.registerUser = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (true) {
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(false, "该邮箱已经被占用，请更换邮箱"));
    }
    else {
        interfaceModel.sendJson(res, 200, returnModel.umRreturnModel(true, "恭喜您,注册成功,点击按钮跳转到首页", {
            userId: "10000",
            address: '/'
        }));
    }
};
