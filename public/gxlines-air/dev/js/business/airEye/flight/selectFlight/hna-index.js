hna._i18nMap.addLanguages({
    "F01": {"zh_CN": "航班号", "en_US": "Flight number"},
    "F02": {"zh_CN": "承运航空公司", "en_US": "Carrier Airlines"},
    "F03": {"zh_CN": "始发地", "en_US": "Originating"},
    "F04": {"zh_CN": "总行程时间", "en_US": "Total travel time"},
    "F05": {"zh_CN": "目的地", "en_US": "Destination"},
    "F06": {"zh_CN": "总飞行时间", "en_US": "Total flight time"},
    "F07": {"zh_CN": "出发日期", "en_US": "Departure date"},
    "F08": {"zh_CN": "总地面停留时间", "en_US": "Total ground residence time"},
    "F09": {"zh_CN": "起飞时间", "en_US": "Departure time"},
    "F10": {"zh_CN": "到达时间", "en_US": "Arrival time"},
    "F11": {"zh_CN": "机型", "en_US": "Model"},
    "F12": {"zh_CN": "系统正在获取航班信息，请等待。", "en_US": "System is getting flight information, please wait."},
    "F13": {"zh_CN": "航班信息", "en_US": "Flight information"},
    "F14": {"zh_CN": "重新查询", "en_US": "haha"},
    "F15": {"zh_CN": "下一步，添加乘机人", "en_US": "haha"},
    "F16": {"zh_CN": "不可用", "en_US": "haha"},
    "F17": {"zh_CN": "直飞", "en_US": "haha"},
    "F18": {"zh_CN": "转机", "en_US": "haha"},
    "F19": {"zh_CN": "经停", "en_US": "haha"},
    "F20": {"zh_CN": "航班详情", "en_US": "haha"},
    "F21": {"zh_CN": "有餐食", "en_US": "haha"},
    "F22": {"zh_CN": "机&emsp;型", "en_US": "haha"},
    "F23": {"zh_CN": "票量充足", "en_US": "haha"},
    //"F24": {"zh_CN": "舱/", "en_US": "haha"},
    "F24": {"zh_CN": "舱", "en_US": "haha"},
    "F25": {"zh_CN": "无折扣", "en_US": "haha"},
    "F26": {"zh_CN": "折", "en_US": "haha"},
    "F27": {"zh_CN": "无", "en_US": "haha"},
    "F28": {"zh_CN": "剩余座位", "en_US": "haha"},
    //"F29": {"zh_CN": "舱位/折扣", "en_US": "haha"},
    "F29": {"zh_CN": "舱位", "en_US": "haha"},
    "F30": {"zh_CN": "使用规定", "en_US": "haha"},
    "F31": {"zh_CN": "餐食", "en_US": "haha"},
    "F32": {"zh_CN": "自愿签转", "en_US": "haha"},
    "F33": {"zh_CN": "变更手续费", "en_US": "haha"},
    "F34": {"zh_CN": "退票手续费", "en_US": "haha"},
    "F35": {"zh_CN": "注意事项", "en_US": "haha"},
    "F36": {"zh_CN": "免费托运行李额", "en_US": "haha"},
    "F37": {"zh_CN": "随身携带行李额", "en_US": "haha"},
    "F38": {"zh_CN": "机型图", "en_US": "haha"},
    "F39": {"zh_CN": "不允许签转其他航空公司", "en_US": "haha"},
    "F40": {"zh_CN": "允许签转其他航空公司", "en_US": "haha"},
    "F41": {"zh_CN": "本产品不支持变更服务", "en_US": "haha"},
    "F42": {"zh_CN": "航班计划离站48小时(含)前,票价", "en_US": "haha"},
    "F43": {"zh_CN": "航班计划离站48小时内12小时(含)前,票价", "en_US": "haha"},
    "F44": {"zh_CN": "航班计划离站12小时内及离站后,票价", "en_US": "haha"},
    "F45": {"zh_CN": "退票收取票价100%手续费", "en_US": "haha"},
    "F47": {"zh_CN": "航班产品使用规定", "en_US": "haha"},
    "F48": {"zh_CN": "20KG免费托运行李", "en_US": "haha"},
    "F49": {"zh_CN": "无免费餐饮服务", "en_US": "haha"},
    "F50": {"zh_CN": "无餐食", "en_US": "haha"},
    "F51": {"zh_CN": "未找到航班", "en_US": "haha"},
    "F52": {"zh_CN": "的相关信息", "en_US": "haha"},
    "F53": {"zh_CN": "机型图正在加载中...", "en_US": "haha"},
    "F54": {"zh_CN": "抱歉，您查看的机型图暂时还没有...", "en_US": "haha"},
    "F55": {"zh_CN": "产品信息正在加载中...", "en_US": "haha"},
    "F56": {"zh_CN": "产品使用规定", "en_US": "haha"},
    "F57": {"zh_CN": "天", "en_US": "haha"},
    "F58": {"zh_CN": "小时", "en_US": "haha"},
    "F59": {"zh_CN": "分钟", "en_US": "haha"},
    "F60": {"zh_CN": "起飞", "en_US": "haha"},
    "F61": {"zh_CN": "到达", "en_US": "haha"}
});

var flightCityUrl = hna._static_host + "/js/data/flightCity.js";
var ajaxUrl = {
    searchFlightInfo: "/flight/searchFlightInfo",
    selectFareFamilyCode: "/flight/selectFareFamilyCode",
    getFlightDetails: "/flight/getFlightDetails"
};

var _hasChooseFlight = [];

var _priceTrendServer = true;//点击搜索是否初始化航班趋势图

var _beniftList = [];//退改签规则数组;

var _type = (hna.getRequest() || {}).type || "";

var browserRule = /^.*(Safari)+.*$/;
if (browserRule.test(navigator.userAgent)) {
    window.onpageshow = function (event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
}

$(function () {
    //页面点击事件
    $(document).on("click", ".click-btn", function (e) {
        e.stopPropagation();
        try {
            var $this = $(e.target);
            if ($this.hasClass("hnaui-btn-disabled")) {
                return false;
            }

            if ($this.hasClass("re-search-btn")) {
                //重新查询
                reSearchFlightInfo();

            } else if ($this.hasClass("search-btn")) {
                //提交搜索
                searchFlightInfo();

            } else if ($this.hasClass("search-box-up")) {
                //取消搜索
                cancelSearchFlightInfo();

            } else if ($this.hasClass("hna-change-text")) {
                //交换城市
                changeCity($this);

            } else if ($this.hasClass("show-fare-family")) {
                //显示与隐藏产品信息
                toggleFareFamilyPanel($this);

            } else if ($this.hasClass("show-segment")) {
                //显示与隐藏航班选择面板
                var segmentConIndex = $this.parents(".show-segment-con").data("index");
                judgeSegmentShow(segmentConIndex , "showOne");

            } else if ($this.hasClass("choose-fare-family")) {
                //预定
                chooseFareFamily($this);

            } else if($this.hasClass("re-choose-flight")){
                //重新选择航段
                reChooseFlight($this);

            } else if($this.hasClass("calendar-price")){
                //查看低价日历
                lowestPriceCalendar($this);

            } else if ($this.hasClass("submit-btn")) {
                //继续购票
                attenRule();

            }
        } catch (ev) {
            JsErrorTips(ev);
        }
    });

    try {
        //清空本地的新订单号
        hna._processData.saveNewOrderCoder();

        //清空订单生成失败的提示
        hna._processData.saveJudgeOrderKey();

        hna.jsData.getFlightCityData(function (data) {
            _flightCityData = data;
            //设置购票进度条
            setFlightState("flight-state-select");
            //清空本地的购物车数据
            hna._processData.saveShoppingCartInfo();
            //获取查询航班的参数
            _sInfo = getSearchFlightInfo();
            //获取查询行航班的结果
            _fInfo = getSearchFlightResult();
            createInitEl();

            renderFrom();


            hna.filterForm();
        });

    } catch (e) {
        JsErrorTips(e);
    }
});
