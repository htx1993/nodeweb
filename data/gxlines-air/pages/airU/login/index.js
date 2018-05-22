var path = require('path');
var localSession = require(path.join(process.cwd(), 'data/session'));


module.exports.init = function (obj,callback) {
    if (!obj) obj = {};
    if (!obj.config) obj.config = {};

    localSession.setBeforeLoginUrl(obj.request, obj.request.query.service);
    if(typeof (callback) == "function") callback({"title":"会员登录"});
}