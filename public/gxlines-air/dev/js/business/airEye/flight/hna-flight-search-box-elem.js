hna._i18nMap.addLanguages({
    "FB01": {"zh_CN": "搜索", "en_US": "Flight number"},
    "FB02": {"zh_CN": "出发城市", "en_US": "Flight number"},
    "FB03": {"zh_CN": "到达城市", "en_US": "Flight number"},
    "FB04": {"zh_CN": "出发日期", "en_US": "Flight number"},
    "FB05": {"zh_CN": "返回日期", "en_US": "Flight number"},
    "FB06": {"zh_CN": "舱位", "en_US": "Flight number"},
    "FB07": {"zh_CN": "币别", "en_US": "Flight number"}
});
//************************************************************************//
//创建查询航班面板
function createSearchBox(state) {
    if (!state) {
        state = "";
    }
    try {
        var html = '<form class="hnaui-form ' + state + '" id="searchFlightBox">';
        html += createTypeItemEl(state);
        html += createSearchItemEl(state);
        if (state == "select") {
            html += '<i class="hnaui-icon search-box-up click-btn"></i>';
        }
        html += '<input type="hidden" id="isDomestic" value="' + _sInfo.isDomestic + '">';
        html += '</form>';
        $(".search-box").html(html).show();

        renderFrom();
        initSearchEvent();
    } catch (e) {
        JsErrorTips(e);
    }
}
function createTypeItemEl(state) {
    var html = "";
    try {
        html = '<ul class="hnaui-form-item hnaui-type-choose">';
        html += '            <li>';
        html += createRadioEl(_searchBoxConfig.tripType, _sInfo.tripType);
        html += '            </li>';
        if (state == "flexible" && _searchBoxConfig.hasFlexible) {
            html += '            <li>';
            html += createRadioEl(_searchBoxConfig.flexible, _sInfo.flexible, "flexible-item");
            html += '            </li>';
        }
        html += '    </ul>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建行程类型控件
function createRadioEl(info, value, cla) {
    var html = "";
    try {
        if (!info) {
            return false;
        }
        html = '<div class="hnaui-form-item radio-type ' + cla + '">';
        //html += '<label class="hnaui-form-label">'+info.title+':</label>';
        html += '<div class="hnaui-input-inline">';
        (info.list || []).forEach(function (item) {
            html += '<input type="radio" name="' + info.name + '" value="' + item.value + '" class="' + item.cla + '" title="' + item.title + '" hna-filter="' + info.name + '" ' + (value == item.value ? "checked" : "") + '>';
        });
        html += '</div>';
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建航班查询面板里面的单程和往返程的元素
function createSearchItemEl(state) {
    var html = "";
    try {
        html = '<div class="hnaui-form-item">';
        html += '       <div class="row">';
        html += '            <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 input-icon hna-one-way">';
        html +=                  createCityEl("dep");
        html +=                  createDateEl("goDate");
        html += '            </div>';
        html += '            <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 input-icon hna-one-way">';
        html +=                  createCityEl("arr");
        html +=                  createDateEl("backDate");
        html += '            </div>';

        html += '            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 hna-other-search">';
        html += '                <div class="row">';
        html += '                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 guest-types">';
        //乘机人类型和数量选择
        html +=                          createGuestTypesEl();
        html += '                    </div>';
        html += '                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 guest-types">';
        //舱位选择
        html +=                          createSelectEl("cabinClass");
        html += '                    </div>';

        html += '                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 lang-type" style="display: none;">';
        html +=                        createSelectEl("currencyType");
        html +=                     '</div>';
        html += '                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6  lang-button hnaui-push-right">';
        html += '                        <div class="hnaui-input-inline">';
        html += '                            <div class="hnaui-btn hnaui-btn-theme search-btn click-btn '+(state == "flexible" ? "search-bottom" : "")+'">' + _i18n("FB01") + '<i class="hnaui-icon"></i></div>';
        html += '                        </div>';
        html += '                    </div>';
        html += '                </div>';
        html += '            </div>';
        html += '        </div>';
        html += '    </div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建航班查询面板
//创建出发和到达城市控件
function createCityEl(flag, index) {
    var html = "";
    try {
        if (!flag) {
            flag = "dep";
        }
        var defaultTitle = _i18n("FB02");
        var defaultCode = "originLocationCode";
        var defaultName = "originLocationName";
        var defaultIsDomestic = "oriIsDomestic";
        var defaultCodeV = _sInfo.outboundOption[defaultCode];
        var defaultNameV = _sInfo.outboundOption[defaultName];
        var defaultIsDomesticV = _sInfo.outboundOption[defaultIsDomestic];
        var defaultFocus = "destinationLocationName";
        var defaultMaxLen = 30;
        //var defaultIcon = "&#xe90f;";
        var defaultIcon = "";
        var defaultVerify = "cityName";
        var defaultClass = "location";

        if (flag == "arr") {
            defaultTitle = _i18n("FB03");
            defaultCode = "destinationLocationCode";
            defaultName = "destinationLocationName";
            defaultIsDomestic = "desIsDomestic";
            defaultCodeV = _sInfo.outboundOption[defaultCode];
            defaultNameV = _sInfo.outboundOption[defaultName];
            defaultIsDomesticV = _sInfo.outboundOption[defaultIsDomestic];
            defaultFocus = "goDate";
            //defaultIcon = "&#xe910;";
            defaultClass = "";
        }
        if (index == null || index == undefined) {
            index = "";
        } else {
            var item = _sInfo.multiCityOptions[index] || {};
            defaultCodeV = item[defaultCode] || "";
            defaultNameV = item[defaultName] || "";
            defaultIsDomesticV = item[defaultIsDomestic] || "";
        }
        html = '<div class="hnaui-input-inline '+defaultClass+'">';
        html += '       <input type="text" id="' + defaultName + index + '" value="' + defaultNameV + '" data-focus="#' + defaultFocus + index + '" data-related="#' + defaultCode + index + '" hna-verify="' + defaultVerify + '" autocomplete="off" name="' + defaultName + '" class="hnaui-input p-city" maxlength="' + defaultMaxLen + '" hna-title="' + defaultTitle + '" hna-icon="&#xe901;">';
        html += '       <input type="hidden" id="' + defaultCode + index + '" value="' + defaultCodeV + '" name="locationCode">';
        html += '       <input type="hidden" id="' + defaultIsDomestic + index + '" value="' + defaultIsDomesticV + '" name="locationDom">';
        if (flag == "dep") {
            html += '<div class="hnaui-change-icon"><span class="hna-change-text click-btn">换</span></div>';
        }
        html += '   </div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建出发和到达日期控件
function createDateEl(elType) {
    var html = "";
    try {
        if (elType == null || elType == undefined) {
            elType = "goDate";
        }
        var defaultTitle = _i18n("FB04");
        var defaultValue = "";
        if (elType == "goDate") {
            defaultValue = _sInfo.outboundOption.departureDate;
        } else if (elType == "backDate") {
            defaultTitle = _i18n("FB05");
            defaultValue = _sInfo.inboundOption.departureDate;
        } else {
            var item = _sInfo.multiCityOptions[elType] || {};
            defaultValue = item.departureDate || "";
            elType = "goDate" + elType;
        }
        html = '<div class="hnaui-input-inline">';
        html += '<input type="text" id="' + elType + '" hna-verify="date" autocomplete="off" class="hnaui-input f-date" maxlength="10" value="' + defaultValue + '" hna-title="' + defaultTitle + '" hna-icon="&#xe637;">';
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建乘机人类型和数量选择控件
function createGuestTypesEl() {
    var html = '';
    try {
        html += '<div class="hnaui-select-type hnaui-clear">';
        
        for (var s = 0, s1 = _searchBoxConfig.guestTypes.length; s < s1; s++) {
            var guest = _searchBoxConfig.guestTypes[s] || {};
            html +=         '<div class="hnaui-type">';
            html +=             '<p class="title">'+ (guest.title) + (guest.dec) + '</p>';
            html +=             '<p class="choose-type hnaui-input-num"><span class="cut">—</span>';
            html +=             '<input type="text" class="num" value="'+ (_sInfo.guestTypes[s].amount || guest.min) +'" max="'+ (guest.max) +'" min="'+ (guest.min) +'" id="adtCount">';
            html +=             '<span class="add">+</span></p>';
            html +=         '</div>';
        }
        html +=     '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建下拉框
function createSelectEl(eleType) {
    var html = '';
    try {
        if (!eleType) {
            eleType = "cabinClass";
        }
        var defaultName = "cabinClass";
        var defaultTitle = _i18n("FB06");
        var defaultFilter = "cabinClass";
        var defaultClass = "cabin-class";
        var defaultDataArr = _searchBoxConfig.cabinClassList || [];
        var defaultValue = _sInfo.cabinClass;
        var defaultView = _searchBoxConfig.showCabinCass ? "visible" : "hidden";
        if (eleType == "currencyType") {
            defaultName = "currencyType";
            defaultTitle = _i18n("FB07");
            defaultFilter = "currencyType";
            defaultClass = "currency-type";
            defaultDataArr = _searchBoxConfig.currencyTypes || [];
            defaultValue = _sInfo.currencyType;
            defaultView = _searchBoxConfig.showCurrency ? "visible" : "hidden";
        }

        html += '<div class="hnaui-input-inline ' + defaultClass + '" style="visibility:'+defaultView+';">';
        html += '       <select name="' + defaultName + '" hna-filter="' + defaultFilter + '" hna-title="' + defaultTitle + '">';
        html += '           <option value=""></option>';
        defaultDataArr.forEach(function (item) {
            html += '       <option value="' + (item.type || "") + '" ' + (defaultValue == item.type ? "selected" : "") + '>' + (item.title || "") + '</option>';
        });
        html += '       </select>';
        html += '   </div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}

