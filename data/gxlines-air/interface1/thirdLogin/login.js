var request = require("request");
var path = require("path");
var utils = require('../utils');
var tool = require(path.join(process.cwd(), "data/tools/tool"));

var localSession = require(path.join(process.cwd(), "data/session"));

var grpcClient = require('../grpcClient');

var logger = require(path.join(process.cwd(), "data/tools/weblogs/log")).helper;

var failure = function (req, res, msg) {
    req.session.error = msg;
    res.redirect("/error");
};

var login = function (req, res, user) {
    var client = grpcClient.userClient(req);

    var _callback = function (err, response) {

        if (response && (response.status === "success" || response.code === "1000")) {
            if (response.data.mobile) {
                localSession.setSessionUserInfo(req, response.data);
                var lastPage = localSession.getLastPage(req);
                console.log("thirdLogin LastPage：" + lastPage);

                if (lastPage.indexOf("/airU/login") > -1 || !lastPage) {
                    lastPage = "/airU/logging"
                }
                res.redirect(lastPage);
            } else {
                localSession.setSessionForThird(req, response.data);
                res.redirect("/airU/userInfo_third");
            }
        }
        else {
            var msg = (response && response.message ) ? response.message : utils.alertMsg.LoginFailed;
            failure(req, res, msg);
        }
    };

    utils.GrpcCallback(req, res, client, "thirdPartysLogin", _callback, user);
};

var weibo = {
    token: function (req, res, next) {
        var code = req.query.code;
        //未授权
        if (!code) {
            res.redirect("/");
            return;
        }
        var options = {
            url: tool.url("weibo", "token", code),
            method: "POST"
        };
        request(options, function (err, response, body) {
            logger.writeInfo("weibo auth response: " + JSON.stringify(response));
            if (err || !body) {
                logger.writeErr("weibo auth error: " + JSON.stringify(err));
                failure(req, res, "用户授权验证失败！");
                return;
            }
            if (typeof body === "string") body = JSON.parse(body);
            weibo.user(body.uid, body.access_token, req, res);
        });
    },
    user: function (uid, token, req, res) {
        var opt = {
            url: tool.url("weibo", "user", token, uid),
            method: "GET"
        };
        request(opt, function (err, response, body) {
            if (err) {
                logger.writeErr("Get user info error: " + JSON.stringify(err));
                failure(req, res, "获取用户信息失败！");
            }
            var user = JSON.parse(body);
            var param = {
                thirdPartyId: uid,
                appName: "weibo",
                loginName: user.screen_name
            };
            login(req, res, param);
        });
    }
};


var alipay = {
    options: function (url, params) {
        return {
            url: url,
            json: true,
            form: params,
            headers: {
                "content-type": "application/x-www-form-urlencoded;charset=utf-8"
            }
        };
    },
    token: function (req, res, next) {
        var code = req.query.auth_code;
        //未授权
        if (!code) {
            res.redirect("/");
            return;
        }
        var opt = tool.url("alipay", "token", code);
        var options = alipay.options(opt.url, opt.params);
        request.post(options, function (err, response, body) {
            logger.writeInfo("alipay token response: " + JSON.stringify(body));
            if (err) {
                logger.writeErr("alipay token request error: " + JSON.stringify(err));
                failure(req, res, "用户授权验证失败！");
                return;
            }
            if ((body.code && body.code !== "10000") || body.error_response) {
                logger.writeErr("alipay token error: " + JSON.stringify(body));
                failure(req, res, "用户授权验证失败！");
                return;
            }
            var token = body.alipay_system_oauth_token_response.access_token;
            alipay.user(token, req, res);
        });
    },
    user: function (token, req, res) {
        var opt = tool.url("alipay", "user", token);
        var options = alipay.options(opt.url, opt.params);
        request.post(options, function (err, response, body) {
            logger.writeInfo("alipay get user response: " + JSON.stringify(body));
            if (err) {
                logger.writeErr("alipay get user info request error: " + JSON.stringify(err));
                failure(req, res, "获取用户信息失败！");
                return;
            }
            if ((body.code && body.code !== "10000")) {
                logger.writeErr("alipay get user info error: " + JSON.stringify(body));
                failure(req, res, "获取用户信息失败！");
                return;
            }
            var user = body.alipay_user_info_share_response;
            var param = {
                thirdPartyId: user.user_id,
                appName: "alipay",
                loginName: user.nick_name
            };
            login(req, res, param);
        });
    }
};

var weixin = {
    token: function (req, res, next) {
        var code = req.query.code;
        //未授权
        if (!code) {
            res.redirect("/");
            return;
        }
        var options = {
            url: tool.url("weixin", "token", code),
            method: "POST"
        };
        request(options, function (err, response, body) {
            logger.writeInfo("weixin auth response: " + JSON.stringify(response));
            if (err || !body) {
                logger.writeErr("weixin auth error: " + JSON.stringify(err));
                failure(req, res, "用户授权验证失败！");
                return;
            }
            if (typeof body === "string") body = JSON.parse(body);
            weixin.user(body.openid, body.access_token, req, res);
        });
    },
    user: function (uid, token, req, res) {
        var opt = {
            url: tool.url("weixin", "user", token, uid),
            method: "GET"
        };
        request(opt, function (err, response, body) {
            if (err) {
                logger.writeErr("Get user info error: " + JSON.stringify(err));
                failure(req, res, "获取用户信息失败！");
            }
            var user = JSON.parse(body);
            var param = {
                thirdPartyId: uid,
                appName: "weixin",
                loginName: user.nickname
            };
            login(req, res, param);
        });
    }
};


module.exports = {
    weibo: {
        auth: function (req, res, next) {
            res.redirect(tool.url("weibo", "auth"));
        },
        token: weibo.token,
        cancel: function (req, res, next) {
            res.redirect(localSession.getLastPage(req));
        }
    },
    weixin: {
        auth: function (req, res, next) {
            res.redirect(tool.url("weixin", "auth"));
        },
        token: weixin.token,
        cancel: function (req, res, next) {
            res.redirect(localSession.getLastPage(req));
        }
    },
    alipay: {
        auth: function (req, res, next) {
            var url = tool.url("alipay", "auth");
            res.redirect(url);
        },
        token: alipay.token,
        cancel: function (req, res, next) {
            res.redirect(localSession.getLastPage(req));
        }
    }
};