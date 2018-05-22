var path = require('path');
var localSession = require(path.join(process.cwd(), 'data/session'));
var compile = require(path.join(process.cwd(), 'data/tools/compile'));

module.exports.init = function (obj, callback) {
    if (!obj) obj = {};
    if (!obj.config) obj.config = {};

    var query = obj.request.query || {};
    var service = compile.uncompile(query.service);
    obj.request.session.lfsusersessionid = null;
    localSession.setSessionUserInfo(obj.request, null);
    localSession.setSessionForOTA(obj.request);
    obj.response.redirect("/");
    return false;
}