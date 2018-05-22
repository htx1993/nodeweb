hna._i18nMap.addLanguages({
    "FP01": {"zh_CN": "去程", "en_US": "Flight number"},
    "FP02": {"zh_CN": "返程", "en_US": "Flight number"},
    "FP03": {"zh_CN": "第", "en_US": "Flight number"},
    "FP04": {"zh_CN": "航段", "en_US": "Flight number"},
    "FP05": {"zh_CN": "推荐", "en_US": "Flight number"}
});
hna._processData = {};

//保存,获取shoppingCartId,shoppingCartInfo
hna._processData.shoppingCartKey = "SHOPPING_CART_INFO_" + hna._code;
hna._processData.getShoppingCartId = function () {
    var shoppingCartInfo = hna._processData.getShoppingCartInfo() || {};
    var id = (shoppingCartInfo.cartInfo && shoppingCartInfo.cartInfo.shoppingCartId) || "";
    if (!id) {
        _showMsg("页面数据丢失，两秒后跳转到首页！", function () {
            goToPage("/");
        });
    }
    return id;
};
hna._processData.getShoppingCartInfo = function () {
    return hna._store.getStore(hna._processData.shoppingCartKey);
};
hna._processData.saveShoppingCartInfo = function (info) {
    hna._store.setStore(hna._processData.shoppingCartKey, info || {});
};

//取第一航段的起飞时间为参照时间
hna._processData.getFlightDepartDateFirst = function () {
    return _getCartInfoDate();
};
//取最后一航段的起飞时间为参照时间
hna._processData.getFlightDepartDateLast = function () {
    return _getCartInfoDate("last");
};

//
function _getCartInfoDate(flag) {
    var shoppingCartInfo = hna._processData.getShoppingCartInfo() || {};
    var date = hna._date.getDateInfo().date;
    if (shoppingCartInfo.cartInfo) {
        var bounds = shoppingCartInfo.cartInfo.bounds || [];
        var index = 0;
        if (flag == "last") {
            index = bounds.length - 1;
        }
        date = hna._date.getDateInfo((bounds[index] || {}).departureDate).date;
    }
    return date;
}


hna._processData.getTripTitle = function (index, info) {
    var replaceable = (window._fInfo && _fInfo.replaceable) ? _i18n("FP05") : "";
    var tripTitle = _i18n("FP01");
    var type = (window._sInfo && _sInfo.tripType) || "";
    if (type == "RT") {
        if (info && info.oriCode) {
            var outboundOption = _sInfo.outboundOption;
            if (outboundOption.destinationLocationCode == info.oriCode) {
                tripTitle = _i18n("FP02");
            }
        } else {
            if (index > 0) {
                tripTitle = _i18n("FP02");
            }
        }
    } else if (type == "MC") {
        if (info && info.desCode && info.oriCode && info.date) {
            var multiCityOptions = _sInfo.multiCityOptions || [];
            for (var a = 0; a < multiCityOptions.length; a++) {
                if(multiCityOptions[a].originLocationCode == info.oriCode && multiCityOptions[a].destinationLocationCode == info.desCode && multiCityOptions[a].departureDate == info.date){
                    index = a;
                }
            }
        }
        tripTitle = _i18n("FP03") + "<span>" + (parseInt(index + "", 10) + 1) + "</span>" + _i18n("FP04");
    }
    return replaceable + tripTitle;
};


//保存,获取乘机人信息
hna._processData.passengerKey = "PASSENGER_LIST_INFO_" + hna._code;
hna._processData.getPassengerInfo = function () {
    return hna._store.getStore(hna._processData.passengerKey);
};

hna._processData.savePassengerInfo = function (info) {
    hna._store.setStore(hna._processData.passengerKey, info || {});
};


//保存新生成的订单号
hna._processData.newOrderCodeKey = "NEW_ORDER_CODE" + hna._code;
hna._processData.getNewOrderCoder = function () {
    return hna._store.getStore(hna._processData.newOrderCodeKey);
};

hna._processData.saveNewOrderCoder = function (code,html) {
    hna._store.setStore(hna._processData.newOrderCodeKey, {"code":code,"html":html} || "");
};

//保存历史查询记录
hna._processData.historySearchKey = "HISTORY_SEARCH_KEY";
hna._processData.saveNewHistoryInfo = function(arr) {
    hna._store.setStore(hna._processData.historySearchKey, arr || []);
};

hna._processData.getNewHistoryInfo = function () {
    return hna._store.getStore(hna._processData.historySearchKey) || [];
};

//判断订单是否生成
hna._processData.judgeOrderKey = "JUDGE_ORDERCREAT_KEY";
hna._processData.saveJudgeOrderKey = function(str) {
    hna._store.setStore(hna._processData.judgeOrderKey, str);
};

hna._processData.getJudgeOrderKey = function() {
    return hna._store.getStore(hna._processData.judgeOrderKey) || "";
};