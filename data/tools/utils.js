var phantom = require('node-phantom');

//深度克隆1
var cloneObj = function(obj){
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
};
module.exports.cloneObj = cloneObj;

module.exports.phantom = function (url, dir, name, handler) {
    var phInstance = null;
    return phantom.create()
        .then(function (instance) {
            phInstance = instance;
            return instance.createPage();
        })
        .then(function (page) {
            page.open(url).then(function(status) {
                if(status === "success") {
                    page.render(dir + name).then(handler).then(function () {
                        phInstance.exit();
                    });
                } else {
                    console.log("file open error: ", url);
                    handler(true);
                    phInstance.exit();
                }
            });
        })
        .catch(function (error) {
            console.log(error);
            phInstance.exit();
        });
};

