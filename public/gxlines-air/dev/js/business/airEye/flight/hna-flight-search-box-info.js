hna._i18nMap.addLanguages({
    "FI01": {"zh_CN": "成人", "en_US": "Flight number"},
    "FI02": {"zh_CN": "儿童", "en_US": "Flight number"},
    "FI03": {"zh_CN": "婴儿", "en_US": "Flight number"},
    "FI04":{"zh_CN":"重新查询","en_US":"Flight number"}
});
//创建查询结果信息面板
function createSearchInfo(state) {
    try {
        var outboundOptionDateInfo = hna._date.getDateInfo(_sInfo.outboundOption.departureDate);

        var html = '<ul>';
        if(_sInfo.tripType != "MC"){
            html += '       <li>';
            html += '           <label>出发</label><p class="search-dep-info">' + ((outboundOptionDateInfo.weekAbb || "--") + '，' + (outboundOptionDateInfo.dateCN || "--")) + '</p>';
            html += '       </li>';
            html += '       <li>';
            if (_sInfo.tripType == "RT") {
                var inboundOptionDateInfo = hna._date.getDateInfo(_sInfo.inboundOption.departureDate);
                html += '       <label>回程</label><p class="search-arr-info">' + ((inboundOptionDateInfo.weekAbb || "--") + '，' + (inboundOptionDateInfo.dateCN || "--")) + '</p>';
            }
            html += '       </li>';
        }else{
            html += '       <li>';
            html += '           <label>多航段</label><p class="search-dep-info">您选择了'+(_sInfo.multiCityOptions.length || 0)+'个航段</p>';
            html += '       </li>';
            html += '       <li>';
            html += '       </li>';
        }


        var adtCount = 1;
        var cnnCount = 0;
        var infCount = 0;
        (_sInfo.guestTypes || []).forEach(function (item) {
            if (item.code.toUpperCase() == "ADT") {
                adtCount = item.amount || 1;
            } else if (item.code.toUpperCase() == "CNN") {
                cnnCount = item.amount || 0;
            } else if (item.code.toUpperCase() == "INF") {
                infCount = item.amount || 0;
            }
        });
        html += '<li><label>旅客</label><p class="search-count">' + _i18n("FI01") + ' ×<span class="adtNum">' + adtCount + '</span>, ' + _i18n("FI02") + ' ×<span class="cnnNum">' + cnnCount + '</span>, ' + _i18n("FI03") + ' ×<span class="infNum">' + infCount + '</span></p></li>';
        if (state == "select") {
            html += '<li class="hnaui-right"><div class="hnaui-btn hnaui-btn-theme re-search-btn click-btn change-btn hnaui-right">' + _i18n("FI04") + ' <i class="hnaui-icon click-btn re-search-btn">&#xe615;</i></div></li>';
        }
        html += '</ul>';
        $(".search-info").html(html).show();
    } catch (e) {
        JsErrorTips(e);
    }
}