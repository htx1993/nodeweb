var path = require('path');
var localSession = require(path.join(process.cwd(), 'data/session'));

module.exports.init = function(obj, callback){
    if (!obj) obj = {};

    if(typeof (callback) == "function") callback({"title":"用户中心", "info":{}});
}