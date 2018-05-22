(function ($) {
    hna = window.hna || {};

    function JsDataSetting(info) {
        this.data = info.data || [];
        this.queue = info.queue || [];
        this.loading = info.loading || 0;//0:未加载,1:加载中,2:加载完成
        this.url = info.url || "";
        this.storeExpiration = (info.storeExpiration || 24) * 1000 * 60 * 60;
        this.uid = "HNA_" + (info.uid || "JSDATA").toUpperCase() + "_" + (hna._code || "");
    }
    var flightCity_setting = new JsDataSetting({
        url: (hna._static_host) + "/js/data/flightCityAll.js",
        uid: "flight_cities_all"
    });
    var flightCity_setting_panel = new JsDataSetting({
        url: (hna._static_host) + "/js/data/flightCity.js",
        uid: "flight_cities"
    });
    var country_setting = new JsDataSetting({
        url: (hna._static_host) + "/js/data/country.js",
        //url: "/base/getCountryList",
        uid: "country",
        storeExpiration: 24 * 365
    });
    var interTel_setting = new JsDataSetting({
        url: (hna._static_host) + "/js/data/country.js",
        uid: "country",
        //url: "/base/getInterTelList",
        //uid: "interTel",
        storeExpiration: 24 * 365
    });
    var province_setting = new JsDataSetting({
        url: (hna._static_host) + "/js/data/province.js",
        uid: "province",
        storeExpiration: 24 * 365
    });
    var notice_setting = new JsDataSetting({
        url: (hna._static_host) + "/js/data/notice.js",
        uid: "notice"
    });
    var banner_setting = new JsDataSetting({
        url: (hna._static_host) + "/js/data/banner.js",
        uid: "banner",
        storeExpiration: 1
    });
    var adver_setting = new JsDataSetting({
        url: (hna._static_host) + "/js/data/adver.js",
        uid: "adver",
        storeExpiration: 1
    });
    hna.jsData = {
        getFlightCityData: function (callback) {
            return getJsData(flightCity_setting, "getFlightCityData", callback);
        },
        getFlightCityData_panel: function (callback) {
            return getJsData(flightCity_setting_panel, "getFlightCityData_panel", callback);
        },
        getCountryData: function (callback) {
            return getJsData(country_setting, "getCountryData", callback);
        },
        getInterTelData: function (callback) {
            return getJsData(interTel_setting, "getInterTelData", callback);
        },
        getProvinceData: function (callback) {
            return getJsData(province_setting, "getProvinceData", callback);
        },
        getNoticeData: function (callback) {
            return getJsData(notice_setting, "getNoticeData", callback);
        },
        getBannerData: function (callback) {
            return getJsData(banner_setting, "getBannerData", callback);
        },
        getAdvertData: function (callback) {
            return getJsData(adver_setting, "getAdvertData", callback);
        }
    };

    /**
     * JS数据加载
     * @param url(string):加载地址,可省略,读取默认地址
     * @param force(boolean):是否强制请求数据,
     *   默认已请求过的话不再重新请求,force设为true则无论如何都会请求数据
     */
    function loadJSData(config, url, force) {
        if (arguments.length == 1 && typeof url == "boolean") {
            force = url;
            url = undefined;
        }
        if (url) {
            config.url = url;
        }
        if (config.loading >= 1 && !force) {
            return;
        }
        config.loading = 1;
        var store = hna._store.getStore(config.uid);
        if (store) {
            hnaCountryRequestCallback(config, store.data, true);
            return;
        }

        if (/(\/?\w+)+\.js$/.test(config.url)) {
            //从js文件取，跨域数据
            getCrossDomainJson(config.url, config.uid, function (data) {
                hnaCountryRequestCallback(config, data);
            });
        } else {
            //从接口读取
            hna.ajax({
                "url":config.url,
                "doneCallback":function(data){
                    hnaCountryRequestCallback(config, data);
                }
            });
        }
    }

    /**
     * 读取到JS数据后的回调函数
     * @param data(Array):读取到的数据
     */
    function hnaCountryRequestCallback(config, data, fromLocal) {
        config.data = data;
        config.loading = 2;
        if (!fromLocal) {
            hna._store.setStore(config.uid, {data: data}, config.storeExpiration);
        }
        if (config.queue.length > 0) {
            config.queue.forEach(function (f) {
                hna.jsData[f.name].call(null, f.callback);
            });
            config.queue = [];
        }
    }

    /**
     * 给定参数及回调函数，读取JS数据
     * @param method(string):来源方法
     * @param callback(function): 回调函数
     */
    function getJsData(config, method, callback) {
        if (config.loading < 2) {
            config.queue.push({
                "name": method,
                "callback": callback
            });
            loadJSData(config);
            return null;
        }
        var result = config.data;
        if (typeof callback == "function") {
            callback.call(null, result);
        }
        return result;
    }
})(jQuery);