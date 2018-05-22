//特殊字符过滤
function judgmentLegitimacy(obj) {
    return true;
}
//合并对象
function extend(des, src, override) {
    if (src instanceof Array) {
        for (var i = 0, len = src.length; i < len; i++)
            extend(des, src[i], override);
    }
    for (var i in src) {
        if (override || !(i in des)) {
            des[i] = src[i];
        }
    }
    return des;
}

var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var localSession = require(path.join(process.cwd(), 'data/session'));
var baseDate = require(path.join(process.cwd(), 'data/' + config.company + '/base'));
var browser = require(path.join(process.cwd(), 'data/tools/browser'));
var compile = require(path.join(process.cwd(), 'data/tools/compile'));

module.exports = function (app) {
    //加载接口路由
    require('./' + config.company + '/interface_routes_config')(app);

    // 加载数据模块
    var documentData = null;
    var serverRoutesInfo = "";
    var defaultViewsUrl = "index";

    var server_routes_config = require('./' + config.company + '/server_routes_config');
    if (server_routes_config) {
        serverRoutesInfo = server_routes_config.info;
        for (var key in serverRoutesInfo) {
            (function (k) {
                var routesItem = serverRoutesInfo[k];
                app[(routesItem.method || "get")](routesItem.href, function (req, res) {

                    //判断请求的头部，是否为移动端，如果是移动端，则重定向到移动项目
                    var browserInfo = browser.browser(req);
                    if (browserInfo.mobile && routesItem.href.indexOf("/mobile") <= -1) {
                        res.redirect("/mobile");
                        return false;
                    } else if (!browserInfo.mobile && routesItem.href.indexOf("/mobile") > -1) {
                        res.redirect("/");
                        return false;
                    }

                    var errorInfo = "";
                    if (!judgmentLegitimacy(req.query)) {
                        k = 'error';
                        errorInfo = "提交的数据中存在不合法字符！";
                    }

                    //保存前一个页面的路径到session中
                    localSession.setCurrentPage(req, routesItem.href);

                    //这里过滤需要登录的页面
                    //如果是OTA订单，则，订单详情页面和升舱改期页面不需要登录
                    var otaBl = false;
                    var otaPageList = ["/airEye/order/orderDetail", "/airEye/order/changeOrder", "/airEye/order/refundTickets", "/airP/payment"];
                    if (otaPageList.indexOf(routesItem.href) > -1) {
                        if (localSession.hasLoginForOTA(req)) {
                            otaBl = true;
                        }
                    } else {
                        localSession.setSessionForOTA(req);
                    }
                    if ((routesItem.mustLogin && !(localSession.hasLogin(req) || otaBl) && req.params.flag != "mustLogin")) {
                        var service = compile.compile(config.server_host + req.url);
                        res.redirect('/airU/login?service=' + service);
                        return false;
                    }

                    //这里过滤首页，重定向到portal页面
                    if (routesItem.href == "/" && config.env == "production" && config.portalHost) {
                        res.redirect(config.portalHost);
                        return false;
                    }

                    if (!documentData) documentData = {};
                    //这个方法返回页面的业务数据，统一放在属性business中
                    try {
                        require(server_routes_config.dataUrl + config.company + "/" + routesItem.url).init({
                            "request": req,
                            "response": res,
                            "params": req.params,   //页面提交的数据
                            "config": routesItem,       //页面的配置数据
                            "errorInfo": errorInfo  //页面的错误提示数据
                        }, function (data) {
                            documentData.business = data;
                            appRend();
                        });
                    } catch (e) {
                        documentData.business = {};
                        appRend();
                    }

                    function appRend() {
                        //传到页面的对象documentData中。属性base是一些基础的配置数据
                        documentData.base = extend({}, [baseDate.init(), routesItem]);
                        documentData.base.server_host = config.server_host;
                        documentData.base.static_host = config.static_host;
                        documentData.base.static_mobile_host = config.static_mobile_host;
                        documentData.base.img_host = config.img_host;
                        documentData.base.interface_host = config.interface_host;
                        documentData.base.env = config.env;
                        documentData.base.mmv_host = config.mmvHost;
                        documentData.base.companyName = config.companyName;
                        documentData.base.companyAbbName = config.companyAbbName;
                        documentData.base.lang = req.query.lang || "zh_CN";
                        documentData.base.langName = req.query.lang == "en" ? "中文" : "EN";
                        documentData.base.version = config.version;

                        if (req.session) {
                            var msgs = req.session.messages || [];
                            res.locals.messages = msgs;
                            res.locals.hasMessages = !!msgs.length;

                            res.locals.hasLogin = !!req.session.userInfo;
                            res.locals.userInfo = req.session.userInfo;
                            res.locals.otaID = req.session.otaInfo;
                            req.session.messages = [];
                        }

                        res.locals.noFooter = routesItem.noFooter || false;
                        res.locals.currentUrl = compile.compile(config.server_host + routesItem.href);
                        // console.log(res.locals.footList);

                        res.render((config.company + "/" + routesItem.url) || defaultViewsUrl, documentData);
                    }
                });
            })(key);
        }
    }
};