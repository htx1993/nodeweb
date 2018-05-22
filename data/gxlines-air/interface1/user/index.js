'use strict';

var express = require('express');
var utils = require('../utils');

var uniqCtl = require('./uniqcheck');//唯一性检查

var user = require('./user');//用户信息
var password = require('./password');//修改密码
var passenger = require('./passenger');//乘机人
var address = require('./address');//邮寄地址
var email = require('./email');//邮箱
var updateQuestion = require('./updateQuestion');//修改密保
var updateMobile = require('./updateMobile');//修改手机号码
var coupon = require('./coupon');//优惠券

var login = require('./login');//用户登录
var oauth = require('./oauth');//权限验证

var router = express.Router();

/////////////////////////////////用户信息相关//////////////////////////////////////////////////////
/**
 * 获取用户信息
 * */
router.post('/userInfo/getUserInfo', utils.CheckLogin, utils.GetTdpToken, user.getUserInfo);
/**
 * 修改用户信息
 * */
router.post('/userInfo/updateUserInfo', utils.CheckLogin, utils.GetTdpToken, user.updateUserInfo);
/**
 * 注册用户
 **/
router.post('/userInfo/registerUser', utils.GetTdpToken, user.registerUser);

/**
 * 通过id，绑定手机号码
 **/
router.post('/userInfo/bindMobile', utils.GetTdpToken, user.bindMobile);


/////////////////////////////////密码相关//////////////////////////////////////////////////////
/**
 * 通过用户名和手机号来重置随机密码
 **/
router.post('/userInfo/resetPasswordByMobile', utils.GetTdpToken, password.resetPasswordByMobile);
/**
 * 第一步，通过用户名获取密保问题
 **/
router.post('/userInfo/getQuestionByUserName', utils.GetTdpToken, password.getQuestionByUserName);
/**
 * 第二步，提交密保答案和新密码
 **/
router.post('/userInfo/resetPasswordByQuestion', utils.GetTdpToken, password.resetPasswordByQuestion);


/**
 * 修改密码
 **/
router.post('/userInfo/updatePassword', utils.CheckLogin, utils.GetTdpToken, password.updatePassword);


///////////////////////////////修改手机号码////////////////////////////////////////////////////////
/**
 * 第一步，验证旧手机号码
 **/
router.post('/userInfo/checkMobile', utils.CheckLogin, utils.GetTdpToken, updateMobile.checkMobile);
/**
 * 第二步，修改手机号码
 **/
router.post('/userInfo/updateMobile', utils.CheckLogin, utils.GetTdpToken, updateMobile.updateMobile);

/**
 * 给手机发送短信
 * mobile 手机号码
 **/
router.post('/userInfo/sendMessage', utils.GetTdpToken, updateMobile.sendMessage);


/////////////////////////////////邮箱相关//////////////////////////////////////////////////////
/**
 * 给邮箱发送邮件
 * email 邮箱
 **/
router.post('/userInfo/checkEmail', utils.CheckLogin, utils.GetTdpToken, email.checkEmail);
/**
 * 给邮箱发送邮件
 * email 邮箱
 **/
router.post('/userInfo/sendEmail', utils.CheckLogin, utils.GetTdpToken, email.sendEmail);
/**
 * 修改邮箱
 **/
router.post('/userInfo/updateEmail', utils.CheckLogin, utils.GetTdpToken, email.updateEmail);
/**
 * 绑定邮箱
 **/
router.post('/userInfo/bindEmail', utils.CheckLogin, utils.GetTdpToken, email.bindEmail);


////////////////////////////////修改密保///////////////////////////////////////////////////////
/**
 * 验证旧密保
 **/
router.post('/userInfo/checkAnswer', utils.CheckLogin, utils.GetTdpToken, updateQuestion.checkAnswer);
/**
 * 修改密保和答案
 **/
router.post('/userInfo/updateQuestion', utils.CheckLogin, utils.GetTdpToken, updateQuestion.updateQuestion);


///////////////////////////////乘机人相关////////////////////////////////////////////////////////
/**
 * 查询乘机人列表
 **/
router.post('/userInfo/getPassengerInfo', utils.CheckLogin, utils.GetTdpToken, passenger.GetPassengerList);
/**
 * 修改乘机人
 **/
router.post('/userInfo/updatePassenger', utils.CheckLogin, utils.GetTdpToken, passenger.updatepassenger);
/**
 * 新增乘机人
 **/
router.post('/userInfo/addPassenger', utils.CheckLogin, utils.GetTdpToken, passenger.addpassenger);
/**
 * 删除乘机人
 **/
router.post('/userInfo/deletePassenger', utils.CheckLogin, utils.GetTdpToken, passenger.deletepassenger);


////////////////////////////////邮寄地址相关///////////////////////////////////////////////////////
/**
 * 查询邮寄地址
 **/
router.post('/userInfo/getMailAddressInfo', utils.CheckLogin, utils.GetTdpToken, address.GetAddressList);
/**
 * 修改邮寄地址
 **/
router.post('/userInfo/updateMailAddress', utils.CheckLogin, utils.GetTdpToken, address.updateMailAddress);
/**
 * 新增邮寄地址
 **/
router.post('/userInfo/addMailAddress', utils.CheckLogin, utils.GetTdpToken, address.addMailAddress);
/**
 * 删除邮寄地址
 **/
router.post('/userInfo/deleteMailAddress', utils.CheckLogin, utils.GetTdpToken, address.deleteMailAddress);


////////////////////////////////唯一检验相关，注册页面///////////////////////////////////////////////////////
/**
 * 校验邮件是否已经存在
 **/
router.post('/userInfo/isExistByEmail', utils.GetTdpToken, uniqCtl.isExistByEmail);
/**
 * 校验证件号码是否已经存在
 **/
router.post('/userInfo/isExistByIdNo', utils.GetTdpToken, uniqCtl.isExistByIdNo);
/**
 * 校验手机号码是否已经存在
 **/
router.post('/userInfo/isExistByMobile', utils.GetTdpToken, uniqCtl.isExistByMobile);
/**
 * 校验用户名是否已经存在
 **/
router.post('/userInfo/isExistByUserName', utils.GetTdpToken, uniqCtl.isExistByName);


////////////////////////////////用户登录///////////////////////////////////////////////////////
/**
 * 用户通过用户名和密码登录
 **/
router.post('/login/loginByName', utils.GetTdpToken, login.loginByName);
/**
 * 用户通过手机号和动态口令登录
 **/
router.post('/login/loginByMobile', utils.GetTdpToken, login.loginByMobile);
/**
 * 调用UM接口发送短信验证码
 **/
router.post('/login/loginSendMobile', utils.GetTdpToken, login.loginSendMobile);
/**
 * 用户登出
 **/
router.post('/login/loginOut', utils.GetTdpToken, login.loginOut);

router.get('/oauth', utils.GetTdpToken, oauth.default);

router.all('/Getlogininfo', login.getlogininfo);


////////////////////////////////航班动态///////////////////////////////////////////////////////
/**
 * 查询航班动态
 **/
router.all('/getFlightStatusList', utils.GetTdpToken, require('./flightStatus').getFlightStatusList);

////////////////////////////////优惠券///////////////////////////////////////////////////////
/**
 * 查询优惠券
 **/
router.post('/userInfo/getCouponList', coupon.getCouponList);


module.exports = router;