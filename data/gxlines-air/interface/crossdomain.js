var path = require('path');
var config = require(path.join(process.cwd(), 'config'));

module.exports = function(res){
    res.header('Access-Control-Allow-Origin', config.mobileReq);
    //res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    return res;
}