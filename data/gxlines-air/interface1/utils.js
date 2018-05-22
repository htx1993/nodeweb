var grpc = require('grpc');
var request = require('request');
var config = require('./config');
var fs = require('fs');
var md5 = require('../../tools/md5');
var moment = require('moment');
var _ = require('underscore');
var interfaceReturn = require('./interfaceModel');
var localSession = require('../../session');
var grpcClient = require('./grpcClient');
var alertMsg = require('./alertMsg');
var redisClient = require('./redisClient');
var path = require('path');
var logger = require(path.join(process.cwd(), "data/tools/weblogs/log")).helper;

function ConsoleLog(msg) {
    console.log(msg);//控制台输出日志
    logger.writeInfo(msg);//打印日志
}

/*
 * 获取访问客户端的IP
 * */
function get_client_ip(req) {
    var ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0]
    }
    ConsoleLog("visit IP:" + ip);
    return ip;
};

/*
 * 设置grpcClient请求时的头部参数
 *
 * 现在设置的参数包括
 * client_id 请求的client_id
 * remoteIP 访问端的IP
 * token 请求token
 * trace-id 事件追踪ID，用于后台查询日志
 * currency-code 币种 用于多币种设置
 * userSessionId 当前操作用户的userSessionId
 * */
function Metadata(req) {
    var metadata = new grpc.Metadata();
    metadata.add('client_id', config.client_id);
    metadata.add('remoteIP', get_client_ip(req));

    if (config.needToken && req.session && req.session.oauthToken) {
        metadata.add('token', req.session.oauthToken.access_token)
    }
    if (getTraceId(req)) {
        metadata.add('trace-id', getTraceId(req))
    }
    metadata.add('currency-code', "CNY");

    var userSession = localSession.getSessionUserInfo(req);
    if (userSession && userSession.userSessionId) {
        metadata.add('userSessionId', userSession.userSessionId);
    }
    else if (req.session.lfsusersessionid) {
        metadata.add('userSessionId', req.session.lfsusersessionid);
    }
    else if (req.session.otaInfo) {
        metadata.add('userSessionId', req.session.otaInfo);
    }
    else {
        metadata.add('userSessionId', "");
    }

    ConsoleLog("Request METADATA:" + JSON.stringify(metadata));
    return metadata;
};

/*
 * 获取当前请求的traceid
 *
 * traceid从grpc头部获取,每次返回结果后设置在session中
 * */
function getTraceId(req) {
    if (req && req.session) {
        return req.session.traceid || ""
    }
    return ""

};

/*
 * 通过返回的头部信息设置TRACEID
 * */
function SetCallbackMetadata(req, res, metadata) {
    ConsoleLog("CALLBACK METADATA:" + JSON.stringify(metadata))

    if (metadata && metadata._internal_repr) {
        metadata = metadata._internal_repr;
        if (req && req.session) {
            if (metadata && metadata['trace-id'] && metadata['trace-id'].length > 0) {
                req.session.traceid = metadata['trace-id'][0];
                ConsoleLog("SET TRACEID :" + metadata['trace-id']);
            }
        }
    }

};

/*
 * 获取订票地址的接口签名
 *
 * pos 系统配置pos或者订单来源中的pos
 * ReservationCode 订单号
 *
 * 加密参数:
 * signSource pos
 * signKey 加密秘钥，从后台获取，写在顶层配置文件
 * signDate 当前日期
 * */
function GetTicketSignKey(ReservationCode, pos) {
    var signSource = pos || config.pos;
    var signKey = config.ticketSignKey;
    var signDate = moment().format('YYYYMMDD');

    return md5.encryption(ReservationCode + signSource + signDate + signKey);
};

/*
 * 获取GRPC服务地址
 * 轮询ETCD集群，获取GRPC节点后随机选取一个，并保存在当前请求的session中
 * */
function GetEtcdUrl(req, res, next, tryTime, _callback) {
    var etcdHosts = config.etcdHosts;
    if (etcdHosts && etcdHosts.length > 0) {
        var etcdUrl = "http://" + etcdHosts[tryTime] + config.etcdUrl;
        request(etcdUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                if (body.node && body.node.key == "/grpc/server/aireye") {
                    var serverList = [];
                    _.each(body.node.nodes, function (nodeItem) {
                        if (nodeItem.value) {
                            serverList.push(nodeItem.value);
                        }
                    });
                    ConsoleLog(JSON.stringify(serverList));
                    if (serverList.length == 0) {
                        if (tryTime < etcdHosts.length) {
                            ConsoleLog("第" + tryTime + "次获取etcd服务节点");
                            tryTime++;
                            GetEtcdUrl(req, res, next, tryTime, _callback);
                        }
                        else {
                            interfaceReturn.sendJson(res, 200, []);
                        }
                    }
                    else {
                        if (req.session) {
                            req.session.grpcUrl = serverList.length == 1 ? serverList[0] : serverList[_.random(0, serverList.length - 1)];
                            if (_callback) {
                                _callback(req, res);
                            }
                            else {
                                GetTdpToken(req, res, next)
                            }
                        } else {
                            interfaceReturn.sendJson(res, 200, []);
                        }
                    }
                }
                else
                    interfaceReturn.sendJson(res, 200, []);
            }
            else
                interfaceReturn.sendJson(res, 200, []);
        });
    }
    else
        interfaceReturn.sendJson(res, 200, []);
}

/*
 * 获取REDIS中保存的全局token
 * 如果REDIS中的TOKEN不存在或者过期，则重新请求GRPC获取新的TOKEN并保存
 * */
function GetTdpToken(req, res, next) {

    res.traceid = getTraceId(req) || "";
    if (config.needToken) {
        redisClient.get(config.RedisTokenKey, function (err, result) {
            ConsoleLog("GET REDIS ERR:" + JSON.stringify(err));
            ConsoleLog("GET REDIS RESULT:" + JSON.stringify(result));

            req.session.oauthToken = JSON.parse(result);
            if (!isTokenTimeOut(req) && !err && result) {
                next();
            }

            else {

                var _callback = function (response) {
                    req.session.oauthToken = response;
                    next();
                };

                GetGrpcToken(req, res, _callback)
            }
        });

    }
    else
        next();
}


/*
 * 请求GRPO获取TOKEN
 * */
function GetGrpcToken(req, res, _callback) {
    var obj = {
        "grant_type": config.client_grant_type,
        "client_id": config.client_id,
        "client_secret": config.client_secret,
        "scope": "",
        "token": "",
        "username": "",
        "password": ""
    };

    ConsoleLog("GetAccessToken Req:" + JSON.stringify(obj));

    var client = grpcClient.oauthClient(req);

    var metadata = new grpc.Metadata();
    metadata.add('client_id', config.client_id);
    client.getAccessToken(obj, metadata, {}, function (err, response) {
        ConsoleLog("GetAccessToken err:" + JSON.stringify(err));
        ConsoleLog("GetAccessToken Res:" + JSON.stringify(response));
        if (response && response.access_token) {
            response.expires_in = new Date().getTime() + 7200000;
            redisClient.set(config.RedisTokenKey, JSON.stringify(response))

            if (typeof _callback == "function")
                _callback(response);
        }
        else {
            interfaceReturn.sendJson(res, 200, []);
        }
    });
}

/*
 * 检查TOKEN是否失效
 * */
function isTokenTimeOut(req) {
    //token的session不存在，等同失效
    if (!req.session.oauthToken)
        return true;

    var oauthToken = req.session.oauthToken;
    //离token过期还剩多少时间,如果为负则还没到时间，如果为正，则已过期
    var timeOutVal = moment().diff(moment(parseInt(oauthToken.expires_in))) / 1000 / 60;
    return timeOutVal >= -40;

};

/*
 * 获取请求中当前用户的UserSessionID
 * */
function GetUserSessionID(req) {
    var userSession = localSession.getSessionUserInfo(req);
    if (userSession && userSession.userSessionId) {
        return userSession.userSessionId
    }
    else if (req.session.lfsusersessionid) {
        return req.session.lfsusersessionid;
    }
    else {
        return "";
    }

};


/*
 *NODE端所有返回给前端的提示信息
 * */
module.exports.alertMsg = alertMsg;

module.exports.GetGrpcToken = GetGrpcToken;

module.exports.Metadata = Metadata;

module.exports.GetUserSessionID = GetUserSessionID;

/*
 * 判断字符串中是否有中文，用于判断返回的错误信息中是否是中文提示，屏蔽英文的系统错误
 * */
module.exports.isStrHasChinese = function (str) {
    return /[\u4E00-\u9FA5]/g.test(str);
}

//包装grpc服务端返回的信息
module.exports.Response = function (respon, res, interfaceModel, Trans) {
    interfaceModel.sendJson(res, 200, Trans ? Trans(respon) : respon);
};

//获取tdp的token,用于设置在grpcClient头部访问接口
module.exports.GetTdpToken = function (req, res, next) {
    if (req.session && req.session.grpcUrl)
        GetTdpToken(req, res, next);
    else {
        GetEtcdUrl(req, res, next, 0);
    }
};

//检查是否登录，用于接口权限控制
module.exports.CheckLogin = function (req, res, next) {
    var userSession = localSession.getSessionUserInfo(req);
    if (userSession && userSession.userSessionId && userSession.userId) {
        next();
    }
    else
        interfaceReturn.sendJson(res, 201, alertMsg.NeedLogin);

};

module.exports.CheckOTALogin = function (req, res, next) {
    var userSession = localSession.getSessionUserInfo(req);
    if (userSession && userSession.userSessionId && userSession.userId || localSession.hasLoginForOTA(req)) {
        next();
    }
    else
        interfaceReturn.sendJson(res, 201, alertMsg.NeedLogin);

};

//获取UM接口的签名
module.exports.GetSignKey = function (userid) {
    var signKey = config.signKey;
    var signDate = moment().add(32, 'days').format('YYYYMMDD');

    return md5.encryption(userid + signDate + signKey);
};

//获取UM接口的签名
module.exports.GetLoginSignKey = function (username) {
    var signKey = config.signKey;

    var sign = md5.encryption(username + signKey);
    return sign.toUpperCase();
};

//身份证类型转换
module.exports.GetIdType = function (idType) {
    var idTypeList = [{
        "key": 0, "value": "OTHER_ID"
    }, {
        "key": 1, "value": "ID_CARD"
    }, {
        "key": 2, "value": "2.DOC"
    }, {
        "key": 3, "value": "MI_CARD"
    }];

    var valList = _.filter(idTypeList, function (item) {
        return item.value == idType
    });

    if (valList.length > 0)
        return valList[0].key;
    else
        return 0;

};

//身份证类型转换
module.exports.GetIdStr = function (idNo) {
    var idTypeList = [{
        "key": 0, "value": "OTHER_ID"
    }, {
        "key": 1, "value": "ID_CARD"
    }, {
        "key": 2, "value": "2.DOC"
    }, {
        "key": 3, "value": "MI_CARD"
    }];

    var valList = _.filter(idTypeList, function (item) {
        return item.key == idNo
    });

    if (valList.length > 0)
        return valList[0].value;
    else
        return "OTHER_ID";

};

//解密从前端返回的密码
module.exports.uncompile = function (code) {
    if (code == null || code == "undefined" || code == "") return code;
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
};

module.exports.GetUserID = function (req) {
    var userinfo = localSession.getSessionUserInfo(req);
    if (userinfo && userinfo.userId) {
        return userinfo.userId
    }
    else
        return 0;
};

module.exports.GrpcCallback = function (req, res, client, funcname, _callback, requestParam) {
    ConsoleLog(funcname + " Req:" + JSON.stringify(requestParam))

    var call = client[funcname](requestParam || {}, Metadata(req), {}, function (err, response) {

        ConsoleLog(funcname + " Res:" + JSON.stringify(response))
        if (!response) {

            ConsoleLog(funcname + " Error:" + JSON.stringify(err))

            var reCallFunc = function (_req, _res) {
                var call2 = client[funcname](requestParam, Metadata(_req), {}, function (_err, _response) {

                    if (_err && _err.code && _err.code == 15) {
                        req.session.lfsusersessionid = null;
                        req.session.userInfo = null;
                        interfaceReturn.sendJson(res, 201, alertMsg.NeedLogin);
                        return false;
                    }
                    else {
                        ConsoleLog(funcname + " RESPONSE:" + JSON.stringify(_response))
                        _callback(_err, _response);
                    }

                });

                call2.on("metadata", function (metadata) {
                    SetCallbackMetadata(req, res, metadata);
                });
            };

            //token 失效
            if (err && err.code && err.code == 4) {
                ConsoleLog("TOKEN IS TIMEOUT,REFRESH TOKEN")
                GetGrpcToken(req, res, function (_tokenResponse) {
                    req.session.oauthToken = _tokenResponse;
                    reCallFunc(req, res);
                });
            }
            //grpc节点失效
            else if (err && err.code && err.code == 14) {
                ConsoleLog("GRPCNDOE IS TIMEOUT,REFRESH GRPCNDOE")
                GetEtcdUrl(req, res, function () {
                }, 0, reCallFunc);
            }
            //需要重新登录
            else if (err && err.code && err.code == 15) {
                req.session.lfsusersessionid = null;
                req.session.userInfo = null;
                reCallFunc(req, res);
            }
            else {
                interfaceReturn.sendJson(res, 200, []);
            }
        }
        else {
            _callback(err, response);
        }
    });

    call.on("metadata", function (metadata) {
        SetCallbackMetadata(req, res, metadata);
    })
};
