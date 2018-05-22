'use strict';

var express = require('express');
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));

var uniqCtl = require('./uniqcheck');//唯一性检查

var user = require('./user');//用户信息
var password = require('./password');//修改密码
var passenger = require('./passenger');//乘机人
var address = require('./address');//邮寄地址
var email = require('./email');//邮箱
var question = require('./question');//修改密保
var mobile = require('./mobile');//修改手机号码
var coupon = require('./coupon');//优惠券

var login = require('./login');//用户登录

var flightStatus = require('./flightStatus');//用户登录


var router = express.Router();

/////////////////////////////////用户信息相关//////////////////////////////////////////////////////
/**
 * 获取用户信息
 * */
router.post('/userInfo/getUserInfo', interfaceModel.checkLogin, user.getUserInfo);
/**
 * 修改用户信息
 * */
router.post('/userInfo/updateUserInfo', interfaceModel.checkLogin, user.updateUserInfo);
/**
 * 通过id，绑定手机号码
 **/
router.post('/userInfo/bindMobile', user.bindMobile);
/**
 * 注册用户
 **/
router.post('/userInfo/registerUser', user.registerUser);



/////////////////////////////////密码相关//////////////////////////////////////////////////////
/**
 * 通过用户名和手机号来重置随机密码
 **/
router.post('/userInfo/resetPasswordByMobile', password.resetPasswordByMobile);
/**
 * 第一步，通过用户名获取密保问题
 **/
router.post('/userInfo/getQuestionByUserName', password.getQuestionByUserName);
/**
 * 第二步，提交密保答案和新密码
 **/
router.post('/userInfo/resetPasswordByQuestion', password.resetPasswordByQuestion);


/**
 * 修改密码
 **/
router.post('/userInfo/updatePassword', interfaceModel.checkLogin, password.updatePassword);


///////////////////////////////修改手机号码////////////////////////////////////////////////////////
/**
 * 第一步，验证旧手机号码
 **/
router.post('/userInfo/checkMobile', interfaceModel.checkLogin, mobile.checkMobile);
/**
 * 第二步，修改手机号码
 **/
router.post('/userInfo/updateMobile', interfaceModel.checkLogin, mobile.updateMobile);

/**
 * 给手机发送短信
 * mobile 手机号码
 **/
router.post('/userInfo/sendMessage', mobile.sendMessage);


/////////////////////////////////邮箱相关//////////////////////////////////////////////////////
/**
 * 给邮箱发送邮件
 * email 邮箱
 **/
router.post('/userInfo/sendEmail', email.sendEmail);
/**
 * 验证邮箱
 **/
router.post('/userInfo/checkEmail', interfaceModel.checkLogin, email.checkEmail);
/**
 * 修改邮箱
 **/
router.post('/userInfo/updateEmail', interfaceModel.checkLogin, email.updateEmail);
/**
 * 绑定邮箱
 **/
router.post('/userInfo/bindEmail', interfaceModel.checkLogin, email.bindEmail);



////////////////////////////////修改密保///////////////////////////////////////////////////////
/**
 * 验证旧密保
 **/
router.post('/userInfo/checkAnswer', interfaceModel.checkLogin, question.checkAnswer);
/**
 * 修改密保和答案
 **/
router.post('/userInfo/updateQuestion', interfaceModel.checkLogin, question.updateQuestion);



///////////////////////////////乘机人相关////////////////////////////////////////////////////////
/**
 * 查询乘机人列表
 **/
router.post('/userInfo/getPassengerInfo', interfaceModel.checkLogin, passenger.GetPassengerList);
/**
 * 修改乘机人
 **/
router.post('/userInfo/updatePassenger', interfaceModel.checkLogin, passenger.updatepassenger);
/**
 * 新增乘机人
 **/
router.post('/userInfo/addPassenger', interfaceModel.checkLogin, passenger.addpassenger);
/**
 * 删除乘机人
 **/
router.post('/userInfo/deletePassenger', interfaceModel.checkLogin, passenger.deletepassenger);


////////////////////////////////邮寄地址相关///////////////////////////////////////////////////////
/**
 * 查询邮寄地址
 **/
router.post('/userInfo/getMailAddressInfo', interfaceModel.checkLogin, address.GetAddressList);
/**
 * 修改邮寄地址
 **/
router.post('/userInfo/updateMailAddress', interfaceModel.checkLogin, address.updateMailAddress);
/**
 * 新增邮寄地址
 **/
router.post('/userInfo/addMailAddress', interfaceModel.checkLogin, address.addMailAddress);
/**
 * 删除邮寄地址
 **/
router.post('/userInfo/deleteMailAddress', interfaceModel.checkLogin, address.deleteMailAddress);



////////////////////////////////唯一检验相关，注册页面///////////////////////////////////////////////////////
/**
 * 校验邮件是否已经存在
 **/
router.post('/userInfo/isExistByEmail', uniqCtl.isExistByEmail);
/**
 * 校验证件号码是否已经存在
 **/
router.post('/userInfo/isExistByIdNo', uniqCtl.isExistByIdNo);
/**
 * 校验手机号码是否已经存在
 **/
router.post('/userInfo/isExistByMobile', uniqCtl.isExistByMobile);
/**
 * 校验用户名是否已经存在
 **/
router.post('/userInfo/isExistByUserName', uniqCtl.isExistByName);


////////////////////////////////用户登录///////////////////////////////////////////////////////
/**
 * 用户通过用户名和密码登录
 **/
router.post('/login/loginByName', login.loginByName);
/**
 * 用户通过手机号和动态口令登录
 **/
router.post('/login/loginSendMobile', login.loginSendMobile);
/**
 * 用户通过手机号和动态口令登录
 **/
router.post('/login/loginByMobile', login.loginByMobile);
/**
 * 用户登出
 **/
router.post('/login/loginOut', login.loginOut);


////////////////////////////////优惠券///////////////////////////////////////////////////////
/**
 * 查询优惠券
 **/
router.post('/userInfo/getCouponList', coupon.getCouponList);


////////////////////////////////航班动态///////////////////////////////////////////////////////
/**
 * 查询航班动态
 **/
router.post('/getFlightStatusList', flightStatus.getFlightStatusList);


module.exports = router;