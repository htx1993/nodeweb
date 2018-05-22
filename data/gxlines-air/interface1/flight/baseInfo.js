var interfaceModel = require('../interfaceModel');
var config = require('../config');
var utils = require('../utils');
var grpcClient = require('../grpcClient');
var _ = require('underscore')
var fs = require('fs');
var path = require('path');

var GetClient = function (req) {
    return grpcClient.InformationClient(req);
};

exports.getLocation = function (req, res, next) {


    var client = GetClient(req);

    var _cityresList = [];

    var _getlist = function (startidx) {
        utils.GrpcCallback(req, res, client, "getLocations", function (err, response) {
                _.each(response.location, function (item) {
                    _cityresList.push(item)
                });
                console.log(response.startIndex + " " + response.pageSize)
                var _callstartidx = parseInt(response.startIndex) + parseInt(response.pageSize)
                if (response.length == 100) {
                    _getlist(_callstartidx)
                }
                else
                    interfaceModel.sendJson(res, 200, _cityresList);
            },
            {
                pageSize: 100,
                startIndex: startidx
            });

    };

    _getlist(0);

};

/*
 *
 * 按照后台接口返回的三字码列表过滤筛选城市面板js
 *
 * 维护规则
 *  热门城市在请求接口时，带参数hotlist，按城市三字码顺序，| 分隔
 *  eg:hotlist=NNG|CSX|TNA|HAK|CTU|CKG|HGH|TSN|XIY
 *  flightcity.json中是所有城市信息
 *
 *   国内城市包括5个字段
 *    {
 "city": "乌兰浩特",//城市名
 "name": "乌兰浩特机场",//机场名
 "code": "HLH",//城市三字码
 "english": "ULANHOT Airport",//机场英文名
 "pinyin": "ULANHOT"//拼音
 },
 * 如果是国际港澳台，请多加一个字段 "other":true
 *
 * 面板排序方式在Letter中定义，生成js时会根据拼音首字母获取面板显示的index
 * */
exports.getLocations = function (req, res, next) {

    var reqBody = interfaceModel.getParameter(req);

    var Letters = [{"code": "A", "index": "1"}, {"code": "B", "index": "1"}, {"code": "C", "index": "1"}, {
        "code": "D",
        "index": "1"
    }, {"code": "E", "index": "1"}, {"code": "F", "index": "1"}, {"code": "G", "index": "1"}, {
        "code": "H",
        "index": "1"
    }, {"code": "I", "index": "2"}, {"code": "J", "index": "2"}, {"code": "K", "index": "2"}, {
        "code": "L",
        "index": "2"
    }, {"code": "M", "index": "2"}, {"code": "N", "index": "2"}, {"code": "O", "index": "3"}, {
        "code": "P",
        "index": "3"
    }, {"code": "Q", "index": "3"}, {"code": "R", "index": "3"}, {"code": "S", "index": "3"}, {
        "code": "T",
        "index": "3"
    }, {"code": "U", "index": "3"}, {"code": "V", "index": "3"}, {"code": "W", "index": "3"}, {
        "code": "X",
        "index": "4"
    }, {"code": "Y", "index": "4"}, {"code": "Z", "index": "4"}];


//获取热门城市的参数
    var hotList = [];
    if (reqBody.hotlist) {
        var _hotList = reqBody.hotlist.split('|');
        for (var i = 0; i < _hotList.length; i++) {
            hotList.push({
                "index": i,
                "code": _hotList[i]
            })
        }
    }
    console.log("HotList:" + JSON.stringify(hotList));

    var _cityresList = [];

    var _setflightcitycallback = function () {

        //读取flightcity源文件
        var data = fs.readFileSync(path.join(process.cwd(), '/data/flightcity.json'), 'utf8');

        var _cityList = JSON.parse(data);
        //定义筛选的城市列表
        var cityList = [];
        //没有在flightcity数据中的城市，需要手工维护到flightcity.json中
        var _unCityList = [];
        _.each(_cityresList, function (item) {
                var selectList = _.filter(_cityList, function (filteritem) {
                    return filteritem.code == item.code
                });
                if (selectList.length > 0) {
                    // selectList[0].name = item.name.length > 0 ? item.name[0].name : selectList[0].name;
                    selectList[0].name = selectList[0].name;
                    //判断是否是国际港澳台
                    if (selectList[0].other) {
                        selectList[0].other = true;
                        cityList.push(selectList[0]);
                    }
                    else {
                        var cityLetter = selectList[0].pinyin.trim().substr(0, 1);
                        var letterList = _.filter(Letters, function (letitem) {
                            return letitem.code == cityLetter
                        });

                        if (letterList.length > 0) {

                            selectList[0].tab = letterList[0].index;
                            selectList[0].letter = cityLetter;

                            cityList.push(selectList[0]);
                        }
                    }
                }
                else {
                    _unCityList.push(item)
                }
            }
        );
        //添加热门城市属性
        _.each(cityList, function (item) {
            var hot = _.filter(hotList, function (hotItem) {
                return hotItem.code == item.code
            });
            if (hot.length > 0) {
                item.num = hot[0].index + 1;
            }
        });


        console.log(JSON.stringify(cityList))
        var topConfig = require(path.join(process.cwd(), 'config'));
        var writeStream = "var HNA_FLIGHT_CITIES_" + config.companyAbbCode + "=" + JSON.stringify(cityList) + ";"
            + 'if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports){module.exports.getCity=function(){return HNA_FLIGHT_CITIES_' + config.companyAbbCode + '}}};';
//写入js文件
        if (fs.existsSync(path.join(process.cwd(), 'public/' + topConfig.company + '/air'))) {

            fs.writeFile(path.join(process.cwd(), 'public/' + topConfig.company + '/air/js/data/flightCity.js'), writeStream, function (err) {
                if (err) console.log('写文件操作失败');
                else console.log('写文件操作成功');
            });
        }
        if (fs.existsSync(path.join(process.cwd(), 'public/' + topConfig.company + '/dev'))) {
            fs.writeFile(path.join(process.cwd(), 'public/' + topConfig.company + '/dev/js/data/flightCity.js'), writeStream, function (err) {
                if (err) console.log('写文件操作失败');
                else console.log('写文件操作成功');
            });
        }
        interfaceModel.sendJson(res, 200, _unCityList);
    };


    var client = GetClient(req);


    var _getlist = function (startidx) {
        utils.GrpcCallback(req, res, client, "getLocations", function (err, response) {
                _.each(response.location, function (item) {
                    _cityresList.push(item)
                });
                console.log(response.startIndex + " " + response.pageSize)
                var _callstartidx = parseInt(response.startIndex) + parseInt(response.pageSize)
                if (response.location.length == 100) {
                    _getlist(_callstartidx)
                }
                else
                    _setflightcitycallback();
            },
            {
                pageSize: 100,
                startIndex: startidx
            });

    }

    _getlist(0)


}
;

exports.getAllLocations = function (req, res, next) {
    var data = fs.readFileSync(path.join(process.cwd(), '/data/flightcity.json'), 'utf8');

    var _cityList = JSON.parse(data);
    var cityList = [];
    _.each(_cityList, function (item) {
        var cityitem = {
            "code": item.code,
            "name": item.name,
            "city": item.city
        };

        if (item.other) {
            cityitem.other = true
        }
        cityList.push(cityitem);

    });


    var topConfig = require(path.join(process.cwd(), 'config'));
    var writeStream = "var HNA_FLIGHT_CITIES_ALL_" + config.companyAbbCode + "=" + JSON.stringify(cityList);

    if (fs.existsSync(path.join(process.cwd(), 'public/' + topConfig.company + '/air'))) {

        fs.writeFile(path.join(process.cwd(), 'public/' + topConfig.company + '/air/js/data/flightCityAll.js'), writeStream, function (err) {
            if (err) console.log('写文件操作失败');
            else console.log('写文件操作成功');
        });
    }
    if (fs.existsSync(path.join(process.cwd(), 'public/' + topConfig.company + '/dev'))) {
        fs.writeFile(path.join(process.cwd(), 'public/' + topConfig.company + '/dev/js/data/flightCityAll.js'), writeStream, function (err) {
            if (err) console.log('写文件操作失败');
            else console.log('写文件操作成功');
        });
    }
    interfaceModel.sendJson(res, 200, writeStream);
}
