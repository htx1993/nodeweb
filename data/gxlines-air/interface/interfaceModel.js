var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var crossdomain = require(path.join(process.cwd(), 'data/' + config.company + '/interface/crossdomain'));
var compile = require(path.join(process.cwd(), 'data/tools/compile'));

function sendJson(res, code, results){
    var returnObj = {
        code: code || 400
    };
    if (code == 200) {
        returnObj.data = results;
    }else {
        returnObj.message = results || "系统错误！";
    }

    res = crossdomain(res);
    setTimeout(function() {
        res.json(returnObj);
    }, 2500);
}

module.exports.sendJson = sendJson;


module.exports.getParameter = function(req, res) {
    var queryInfo = null;
    var method = req.method;
    if(method == "POST"){
        queryInfo = req.body;
    }else if(method == "GET"){
        queryInfo = req.query;
    }
    if(queryInfo.q){
        var q = queryInfo.q;
        if(config.env == 'production'){
            q = compile.uncompile(q);
        }
        queryInfo = JSON.parse(q);
    }
    return queryInfo;
}

//data是数组
//pageSize每页显示的数量
//pageCount总页数
//pageCurrent当前页
//total总条数
module.exports.getPagingInfo = function(data,pageSize,pageCount,pageCurrent,total) {
    var pageInfo ={
        data : data || [],
        pageSize :pageSize || 10,
        total : total || 0,
        pageCount : pageCount || 0,
        pageCurrent : pageCurrent || 0
    };
    return pageInfo;
}


module.exports.setPagingInfo = function(result,queryInfo) {
    //总数条
    var total = result.length;
    //每页的条数
    var pageSize =queryInfo.pageSize||10;
    //总的页数
    var pageCount = Math.ceil(total / pageSize);
    var pageCurrent = parseInt(queryInfo.pageIndex||1);
    pageCurrent = pageCurrent<1?1:pageCurrent;
    var start = (pageCurrent - 1) * pageSize;
    var end = start + pageSize;
    var data = result.slice(start,end);

    return {
        data : data || [],
        pageSize :pageSize || 10,
        total : total || 0,
        pageCount : pageCount || 0,
        pageCurrent : pageCurrent || 0
    };
}


module.exports.checkLogin = function (req, res, next) {
    //if (!req.session.userInfo) {
    //    sendJson(res, 900, "session已过期,请重新查询");
    //}else{
    //    next();
    //}
    next();
}
