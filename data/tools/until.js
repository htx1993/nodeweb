//深度克隆
module.exports.cloneObj = function (obj) {
    var str, newObj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
        return;
    } else if (global.JSON) {
        str = JSON.stringify(obj), //序列化对象
            newObj = JSON.parse(str); //还原
    } else {
        for (var i in obj) {
            newObj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
        }
    }
    return newObj;
}

//获取本机的内网ip和外网ip

module.exports.getLocalIP = function () {
    var os = require('os'),
        iptable = [],
        ifaces = os.networkInterfaces();
    for (var key in ifaces) {
        ifaces[key].forEach(function (details, alias) {
            if (details.family == 'IPv4' && details.address !== '127.0.0.1' && !details.internal) {
                if(details.address.indexOf("10") == 0 || details.address.indexOf("172") == 0 || details.address.indexOf("192") == 0){
                    iptable.push({
                        "ip": details.address,
                        "family":details.family,
                        "typeName": key
                    });
                }
            }
        });
    }

    return iptable;
}
