(function (w) {
    //联动数据
    hna._provinceData = [];
    var _pInfo = {};
    var renderFun = null;
    //省市区三级联动
    hna.initProvince = function (o) {
        hna.jsData.getProvinceData(function (data) {
            hna._provinceData = data.data || [];
            _pInfo = {
                "province": "北京",
                "city": "",
                "county": ""
            };
            selectEvent(o);
        });
    };

    function selectEvent(o) {
        if (!o) {
            o = {};
        }
        if (!o.data) {
            o.data = {};
        }
        for (var key in _pInfo) {
            if (o.data[key]) {
                _pInfo[key] = o.data[key];
            }
        }
        renderFun = o.renderFun;

        renderFun({"eleType": "province", "value": _pInfo.province, "dataArr": getProvinceData().arr});
        renderFun({"eleType": "city", "value": _pInfo.city, "dataArr": getCityData().arr});
        renderFun({"eleType": "county", "value": _pInfo.county, "dataArr": getCountyData().arr});

        if (w.globalFrom) {
            w.globalFrom.render("select");
            //监听省份下拉框改变事件
            w.globalFrom.on('select(Pprovince)', function (data) {
                //var $this = $(data.elem);
                _pInfo.province = data.value;
                _pInfo.city = "";
                _pInfo.county = "";
                var cityArr = getCityData().arr;
                var countyArr = getCountyData().arr;

                if (hna.isFunction(renderFun)) {
                    renderFun({"eleType": "city", "value": _pInfo.city, "dataArr": cityArr});
                    renderFun({"eleType": "county", "value": _pInfo.county, "dataArr": countyArr});
                    w.globalFrom.render("select");
                }
                //console.log(_pInfo);
            });
            //监听市区下拉框改变事件
            w.globalFrom.on('select(Pcity)', function (data) {
                //var $this = $(data.elem);
                _pInfo.city = data.value;
                _pInfo.county = "";
                var countyArr = getCountyData().arr;

                if (hna.isFunction(renderFun)) {
                    renderFun({"eleType": "county", "value": _pInfo.county, "dataArr": countyArr});
                    w.globalFrom.render("select");
                }
            });
            //监听县区下拉框改变事件
            w.globalFrom.on('select(Pcounty)', function (data) {
                //var $this = $(data.elem);
                _pInfo.county = data.value;
            });
        }
    }

    function getProvinceData() {
        var provinceArr = [];
        (hna._provinceData || []).forEach(function (item) {
            provinceArr.push({"code": item.name, "name": item.name});
        });
        if (!_pInfo.province) {
            _pInfo.province = provinceArr[0].code;
        }
        return {"arr": provinceArr};
    }

    function getCityData() {
        var cityArrData = [];
        for (var a = 0, a1 = hna._provinceData.length; a < a1; a++) {
            var item = hna._provinceData[a];
            if (_pInfo.province == item.name) {
                cityArrData = item.city;
                break;
            }
        }
        var cityArr = [];
        cityArrData.forEach(function (item) {
            cityArr.push({"code": item.name, "name": item.name});
        });
        if (!_pInfo.city) {
            _pInfo.city = cityArr[0].code;
        }
        return {"arr": cityArr, "data": cityArrData};
    }

    function getCountyData() {
        var cityArrData = getCityData().data;
        var countyArrData = [];
        for (var b = 0, b1 = cityArrData.length; b < b1; b++) {
            var item = cityArrData[b];
            if (_pInfo.city == item.name) {
                countyArrData = item.area;
                break;
            }
        }
        var countyArr = [];
        countyArrData.forEach(function (item) {
            countyArr.push({"code": item, "name": item});
        });
        if (!_pInfo.county) {
            _pInfo.county = countyArr[0].code;
        }
        return {"arr": countyArr};
    }
})(window);