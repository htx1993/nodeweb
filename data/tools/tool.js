var crypto = require("crypto");
var path = require("path");
var fs = require("fs");
var config = require(path.join(process.cwd(), "config"));


var helper = {
    parameter: function (params) {
        var names = [], parts = [];
        for (var name in params) {
            //剔除空值参数和sign参数
            if (params[name] && name !== "sign") {
                names.push(name);
            }
        }
        names.sort().forEach(function (name) {
            parts.push(name + "=" + params[name]);
        });
        return parts.join("&");
    },
    padding: function (num) {
        return (num < 10 ? "0" + num : num).toString();
    },
    timestamp: function () {
        var date = new Date();
        return date.getFullYear() + "-" + this.padding(date.getMonth() + 1)
            + "-" + this.padding(date.getDate()) + " " + this.padding(date.getHours()) + ":"
            + this.padding(date.getMinutes()) + ":" + this.padding(date.getSeconds());
    }
};

var secure = {
    key: function (type) {
        var file = path.join(process.cwd(), "data/pem/ali-" + type + ".pem");
        if (!fs.existsSync(file)) {
            return "";
        }
        return fs.readFileSync(file).toString();
    },
    sign: function (params) {
        var sign = crypto.createSign('RSA-SHA256');
        var content = helper.parameter(params);
        sign.update(content);
        var key = this.key("private");
        return sign.sign(key, 'base64');
    },
    verify: function(params, signature){
        var verify = crypto.createVerify("RSA-SHA256");
        var content = helper.parameter(params);
        verify.update(content);
        var key = this.key("public");
        return verify.verify(key, signature, "base64");
    }
};

var callback_url = config.third_login.local.callback;
var platforms = {
    opt: function (target) {
        return config.third_login[target];
    },
    weibo: {
        auth: function () {
            var opt = platforms.opt("weibo");
            var url = [opt.url.auth];
            url.push("?client_id=" + opt.app.key);
            url.push("&response_type=code&state=" + (new Date()).valueOf());
            url.push("&redirect_uri=" + encodeURIComponent(callback_url + "weibo"));
            return url.join("");
        },
        token: function (code) {
            var opt = platforms.opt("weibo");
            var url = [opt.url.token];
            url.push("?client_id=" + opt.app.key);
            url.push("&client_secret=" + opt.app.secret);
            url.push("&grant_type=authorization_code");
            url.push("&redirect_uri=" + encodeURIComponent(callback_url + "weibo"));
            url.push("&code=" + code);
            return url.join("");
        },
        user: function (token, uid) {
            var opt = platforms.opt("weibo");
            var url = [opt.url.user];
            url.push("?access_token=" + token);
            url.push("&uid=" + uid);
            return url.join("");
        }
    },
    weixin: {
        auth: function () {
            var opt = platforms.opt("weixin");
            var url = [opt.url.auth];
            url.push("?appid=" + opt.app.key);
            url.push("&redirect_uri=" + encodeURIComponent(callback_url + "weixin"));
            url.push("&scope=" + opt.scope);
            url.push("&response_type=code&state=" + (new Date()).valueOf());
            url.push("#wechat_redirect");
            return url.join("");
        },
        token: function (code) {
            var opt = platforms.opt("weixin");
            var url = [opt.url.token];
            url.push("?appid=" + opt.app.key);
            url.push("&secret=" + opt.app.secret);
            url.push("&grant_type=authorization_code");
            url.push("&code=" + code);
            return url.join("");
        },
        user: function (token, uid) {
            var opt = platforms.opt("weixin");
            var url = [opt.url.user];
            url.push("?access_token=" + token);
            url.push("&openid=" + uid);
            return url.join("");
        }
    },
    alipay: {
        auth: function () {
            var opt = platforms.opt("alipay");
            var url = [opt.url.auth];
            url.push("?app_id=" + opt.app.key);
            url.push("&scope=" + opt.scope);
            url.push("&state=" + (new Date()).valueOf());
            url.push("&redirect_uri=" + encodeURIComponent(callback_url + "alipay"));
            return url.join("");
        },
        token: function (code) {
            var opt = platforms.opt("alipay");
            var params = {
                app_id: opt.app.key,
                method: "alipay.system.oauth.token",
                format: "json",
                charset: "utf-8",
                sign_type: "RSA2",
                timestamp: helper.timestamp(),
                version: "1.0",
                grant_type: "authorization_code",
                code: code
            };
            params["sign"] = secure.sign(params);

            return { url: opt.url.gateway, params: params };
        },
        user: function (token) {
            var opt = platforms.opt("alipay");
            var params = {
                app_id: opt.app.key,
                method: "alipay.user.info.share",
                format: "json",
                charset: "utf-8",
                sign_type: "RSA2",
                timestamp: helper.timestamp(),
                version: "1.0",
                auth_token: token
            };
            params["sign"] = secure.sign(params);

            return { url: opt.url.gateway, params: params };
        }
    }
};

module.exports = {

    url: function (target, step) {
        var args = [].slice.apply(arguments, [2]);
        return platforms[target][step].apply(null, args);
    },

    sign: secure.sign,
    verify: secure.verify

};