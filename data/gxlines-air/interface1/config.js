var path = require('path');
var config = require(path.join(process.cwd(), 'config.js'));

module.exports = {
    "pos": config.pos,
    "companyAbbCode": config.companyAbbCode,
    "etcdHosts": config.etcdHosts,//etcd集群地址
    "etcdUrl": config.etcdUrl,//etcd服务路径
    "needToken": config.needToken,//是否需要去请求token
    "client_id": config.client_id,
    "client_secret": config.client_secret,
    "client_status": config.client_status,
    "client_grant_type": config.client_grant_type,
    "signKey": config.signKey,//登录成功后调用用户中心接口需要的signKey
    "ticketSignKey": config.ticketSignKey,//生成订单后出票需要用的Signkey

    "airCompany": config.airCompany,//航司
    "emailTemlpateId": config.emailTemlpateId,//发送邮件的模板id
    "mobileTemlpateId": config.mobileTemlpateId,//发送短信的模板id

    "needssl": config.openssl,

    "RedisHost": config.RedisHost,
    "tokenDomain": config.tokenDomain,
    "hostdomain": config.hostdomain,
    "RedisPath": {"host": "10.142.16.216", "port": "6379"},
    "RedisTokenKey": config.RedisTokenKey,
    "third_login": config.third_login,
    "server_host": config.server_host
};