'use strict';

var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var express = require('express');
var router = express.Router();
var compile = require(path.join(process.cwd(), 'data/tools/compile'));

var mmvPath = config.mmvHost + "/";

function getParameter(req) {
    var queryInfo = null;
    var method = req.method;
    if (method == "POST") {
        queryInfo = req.body;
    } else if (method == "GET") {
        queryInfo = req.query;
    }
    if (queryInfo.q) {
        queryInfo = JSON.parse(compile.uncompile(queryInfo.q || ""));
    }
    queryInfo.sessionID = req.sessionID;
    // console.log("==========getParameter=======");
    // console.log(queryInfo);
    return queryInfo;
}

function getHeader() {
    return {
        "Content-type": "application/json; charset=UTF-8",
        "Accept": "application/json; charset=UTF-8",
        'auth': {
            'user': 'username',
            'pass': 'password',
            'sendImmediately': false
        }
    };
}

function postForm(url, form, callback1, callback2) {
    console.log(mmvPath, url);
    var header = getHeader();
    var option = {
        json: true,
        header: header,
        body: form
    };
    request.post(mmvPath + url, option, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            callback1(body);
            console.log('request is success ');
        } else {
            console.log('request is error', error);
            console.log('request is response', response);
            console.log('request is body', body);
            var errorObj = {
                code: 900,
                "message": "您的会话已过期"
            };

            callback2({
                "q": compile.compile(JSON.stringify(errorObj))
            });
        }
    })
}

function getVerificationInfo(req, res, next) {
    var queryInfo = getParameter(req);

    postForm("mmv/getVerificationInfo", queryInfo, function (body) {
        console.log("==========getVerificationInfo=======");
        if (body.data) {
            body.data.bg = mmvPath + body.data.bg;
            body.data.slice = mmvPath + body.data.slice;
        }

        // console.log(body);
        res.json({
            "q": compile.compile(JSON.stringify(body))
        });
    }, function (err) {
        res.json(err);
    });
}
function getVerificationResult(req, res, next) {
    var queryInfo = getParameter(req);
    postForm("mmv/getVerificationResult", queryInfo, function (body) {
        // console.log("==========getVerificationResult=======");
        // console.log(body);
        if (body.data) {
            body.data.url = mmvPath + body.data.url;
        }
        if (body.sessionInfo) {
            session.setMMVInfo(req, body.sessionInfo);
        }
        delete body.sessionInfo;
        res.json({
            "q": compile.compile(JSON.stringify(body))
        });
    }, function (err) {
        res.json(err);
    });
}


var request = require("request");
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var session = require(path.join(process.cwd(), 'data/session'));

router.post('/getVerificationInfo', getVerificationInfo);
router.post('/getVerificationResult', getVerificationResult);


module.exports = router;
