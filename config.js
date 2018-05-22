var path = require('path');
var until = require(path.join(process.cwd(), 'data/tools/until'));

var companyList = [
    {"code": "gxlines-air", "name": "北部湾航空有限责任公司", "abb_name": "北部湾航空", "abb_code": "GX"}
];
var currentIndex = 0;


var developConfig = {
    //服务器配置
    "host": ((until.getLocalIP() || [])[0]).ip || "localhost",//服务器IP
    "port": 3000,//启动服务的端口

    ///grpc服务端地址
    "etcdHosts": ["10.72.83.123:2379"],//etcd集群节点
    "etcdUrl": "/v2/keys/grpc/server/aireye",//etcd服务路径
    "openssl": true,
    //Redis配置
    // "RedisHost": {"host": "10.142.16.209", "port": "6379", "password": "123456"},
    "RedisHost": {
        sentinels: [
            {"host": "10.72.83.123", "port": "26379"},
            {"host": "10.72.83.124", "port": "26379"},
            {"host": "10.72.83.85", "port": "26379"}
        ],
        name: 'mymaster',
        "password": "Hj8*D&dlm3"
    },

    //grpc POS与语言配置
    "pos": "GXAIRLINES_WEB",
    "languageCode": "zh_CN",

    //token参数配置
    "client_id": "GXAIRLINES_WEB",
    "client_secret": "123456",
    "client_status": "NORMAL",
    "client_grant_type": "client_credentials",

    "tokenDomain": "www.gx-air.com",
    "RedisTokenKey": "UQ_NODEWEB_GRPC_TOKEN_UQ_AIR",


    "signKey": "AyGhNIr2+DtSn73vd1hFHg=U",//登录成功后调用用户中心接口需要的signKey
    "ticketSignKey": "abcdefgjklqwertyudc1b1q9ao2s0vvs123456789yudc1b1q9ao2s0vvs11c20dc4c192bb838bb0942107a6033123456017f439577838e10165e09e8b5b45c32c",//生成订单后出票需要用的Signkey

    "airCompany": "",//航司
    "emailTemlpateId": 127,//发送邮件的模板id
    "mobileTemlpateId": 118,//发送短信的模板id};

    "needToken": true,//是否需要去请求token

    //人机验证mmv项目路径配置
    "mmvHost": "http://www.westair.cn",
    //portal项目的路径
    // "portalHost": "http://www.westair.cn/portal/",
    "portalHost": "",
    //当前环境域名
    "hostdomain": "http://test.pn-air.com",

    //定时任务配置
    "schedule": {
        "headerurl": "http://10.176.3.116:8080/WestAirNew/navigation/list",
        "footurl": "http://10.176.3.116:8080/WestAirNew/footer/list",
        "sign": "pn123456",
    }
}

var port = parseInt(process.argv[2]) || developConfig.port;
var host = developConfig.host;
var hostPort = "http://" + host + ":" + port;

console.log('Listening at ' + hostPort + '\n')

//静态资源开发目录
var devDir = "dev";
//静态资源目录
var staticDir = "air";
//移动端的静态资源目录
var staticMobileDir = "mobile-air";

var third_login = {
    local: {
        callback: "http://www.westair.cn/login/callback/",
        cancel: "http://www.westair.cn/login/cancel/"
    },
    weibo: {
        url: {
            auth: "https://api.weibo.com/oauth2/authorize",
            token: "https://api.weibo.com/oauth2/access_token",
            user: "https://api.weibo.com/2/users/show.json"
        },
        app: {
            key: "2663330620",
            secret: "d02e7b6e78cbb20342182e495989fe07"
        }
    },
    weixin: {
        url: {
            auth: "https://open.weixin.qq.com/connect/qrconnect",
            token: "https://api.weixin.qq.com/sns/oauth2/access_token",
            user: "https://api.weixin.qq.com/sns/userinfo"
        },
        app: {
            key: "wxcfc40bafa9e34f8b",
            secret: "52428b6bdfecb56f1280ec8198c0af26"
        },
        scope: "snsapi_login"
    },
    alipay: {
        url: {
            auth: "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm",
            gateway: "https://openapi.alipay.com/gateway.do"
        },
        app: {
            key: "2017101909381867"
        },
        scope: "auth_user"
    },
};

module.exports = {
    //生产，开发环境标识 production
    "env": "",
    //机构编码1
    "company": companyList[currentIndex].code,
    //机构名称
    "companyName": companyList[currentIndex].name,
    //机构简称
    "companyAbbName": companyList[currentIndex].abb_name,
    "companyAbbCode": companyList[currentIndex].abb_code,
    //开发时的静态资源目录
    "dev_dir": devDir,
    //静态资源目录
    "static_dir": staticDir,
    "static_mobile_dir": staticMobileDir,
    //端口
    "port": port,
    //服务端路径前缀
    "server_host": hostPort,
    //接口路径前缀
    "interface_host": hostPort,
    //静态资源路径前缀 包括js,css文件
    "static_host": hostPort + "/" + companyList[currentIndex].code + "/" + staticDir,
    //移动端静态资源路径前缀 包括js,css文件
    "static_mobile_host": hostPort + "/" + companyList[currentIndex].code + "/" + staticMobileDir,
    //图片静态资源路径前缀
    "img_host": hostPort + "/" + companyList[currentIndex].code + "/" + staticDir,
    //版本号
    "version": "1.1.1-" + (new Date().getTime()),
    "setting": {
        cookieSecret: 'mysql',
        sessionTimeOut: 8000000,
        db: 'mysql',
        host: "localhost",
        user: "root",
        password: "",
        database: "uq-db",
        port: 3306
    },

    //开发配置

    "pos": developConfig.pos,
    "languageCode": developConfig.languageCode,
    "etcdUrl": developConfig.etcdUrl,
    "etcdHosts": developConfig.etcdHosts,
    "openssl": developConfig.openssl,

    "needToken": developConfig.needToken,
    "client_id": developConfig.client_id,
    "client_secret": developConfig.client_secret,
    "client_status": developConfig.client_status,
    "client_grant_type": developConfig.client_grant_type,
    "signKey": developConfig.signKey,
    "ticketSignKey": developConfig.ticketSignKey,

    "airCompany": developConfig.airCompany,
    "emailTemlpateId": developConfig.emailTemlpateId,
    "mobileTemlpateId": developConfig.mobileTemlpateId,

    "tokenDomain": developConfig.tokenDomain,
    "RedisTokenKey": developConfig.RedisTokenKey,
    //Redis配置
    "RedisHost": developConfig.RedisHost,

    //mmv配置
    "mmvHost": developConfig.mmvHost,
    "third_login": third_login,

    "mobileReq": "http://" + host + ":5000"
};
