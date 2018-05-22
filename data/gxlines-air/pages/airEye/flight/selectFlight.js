var path = require('path');
var localSession = require(path.join(process.cwd(), 'data/session'));


module.exports.init = function(obj,callback){
    if (!obj) obj = {};

    localSession.setFlightInfo(obj.request);

    if(obj.request.body.flexibleSearch == "true"){
        obj.response.redirect('/flight/flightsearchDate');
        return false;
    }

    if(typeof (callback) == "function") callback({"title":"航班查询结果页", "info":{}});
}