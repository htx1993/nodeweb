hna._i18nMap.addLanguages({
    "C01": {"zh_CN": "预订内容", "en_US": "Shopping Cart"}
});
var ajaxUrl = {
    getNoticeList: "/noticeInfo/getNoticeList",
    getBannerList: "/portal/getBannerList",
    getTicketList: "/flight/aircommendline"
};

$(function () {
    $(document).on("click", ".click-btn", function (e) {
        e = e || window.event;
        e.stopPropagation();
        try {
            var $this = $(e.target);

        } catch (ev) {
            JsErrorTips(ev);
        }
    });
    try {
        //获取城市机场数据1
        hna.jsData.getFlightCityData(function(data){
            _flightCityData = data;

            speTicketReq();
            initSlider();
            initFlightSearch();
            delayLoadImg();
            initNotice();
        });

    } catch (e) {
        JsErrorTips(e);
    }
});


//图片懒加载
function delayLoadImg() {
    try {
        $(".delay-load-img").each(function () {
            var $this = $(this);
            var thisSrc = hna._img_host + $this.data("src");

            _imgLoad(thisSrc, function () {
                $this.replaceWith('<img src="' + thisSrc + '">');
            });
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

//根据城市名转换成对应的三字码并判断该城市是否是国际城市;
function getObjByCode(code , filed){
    var obj = {};
    if (!filed) {
        filed = "city";
    }
    var flightLen = (_flightCityData || []).length;
    for (var a = 0, a1 = flightLen; a < a1; a++) {
        var item = _flightCityData[a];
        if (item.code == code) {
            obj.city = item[filed];
            obj.domestic = item.other ? "N" : "Y";
            return obj;
        }
    }
    return obj;
}

