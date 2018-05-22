hna._i18nMap.addLanguages({
    "FC01": {"zh_CN": "单程", "en_US": "Flight number"},
    "FC02": {"zh_CN": "往返", "en_US": "Flight number"},
    "FC03": {"zh_CN": "多航段", "en_US": "Flight number"},
    "FC04": {"zh_CN": "必须这天成行", "en_US": "Flight number"},
    "FC05": {"zh_CN": "只想要最优惠的票价", "en_US": "Flight number"},
    "FC06": {"zh_CN": "成人", "en_US": "Flight number"},
    "FC07": {"zh_CN": "儿童", "en_US": "Flight number"},
    "FC08": {"zh_CN": "婴儿", "en_US": "Flight number"},
    "FC09": {"zh_CN": "经济舱", "en_US": "Flight number"},
    "FC10": {"zh_CN": "头等舱/商务舱", "en_US": "Flight number"},
    "FC11": {"zh_CN": "中国人民币", "en_US": "Flight number"},
    "FC12": {"zh_CN": "美元", "en_US": "Flight number"},
    "FC13": {"zh_CN": "成人≥12岁", "en_US": "Flight number"},
    "FC14": {"zh_CN": "2岁≤儿童＜12岁", "en_US": "Flight number"},
    "FC15": {"zh_CN": "14天≤婴儿＜2岁", "en_US": "Flight number"}
});

//查询航班初始化的配置数据
var _searchBoxConfig = {
    //行程类型
    tripType: {
        "title": "行程类型",
        "name": "tripType",
        "list": [
            {
                "title": _i18n("FC01"),
                "value": "OW",
                "cla": "trip-type-ow"
            },
            {
                "title": _i18n("FC02"),
                "value": "RT",
                "cla": "trip-type-rt"
            },
            {
                "title": _i18n("FC03"),
                "value": "MC",
                "cla": "trip-type-mc"
            }
        ]
    },
    //搜索类型
    flexible: {
        "title": "搜索类型",
        "name": "flexible",
        "list": [
            {
                "title": _i18n("FC04"),
                "value": "N",
                "cla": "trip-type-false"
            },
            {
                "title": _i18n("FC05"),
                "value": "Y",
                "cla": "trip-type-true"
            }
        ],
        "searchConfig" : {//灵活查询的配置
            "totalDates" : 15,//需要查询的总天数
            "infoTitle" : 7,//一次查询返回的天数
            "blo" : true
        }
    },
    hasFlexible:true,
    //乘机人类型中的名称，最大值，最小值
    guestTypes: [
        {type: "adt", name: "guestTypeAdt", title:'',dec: _i18n("FC13"), min: 1, max: 4},
        {type: "cnn", name: "guestTypeCnn", title: '',dec: _i18n("FC14"), min: 0, max: 2},
        {type: "inf", name: "guestTypeInf", title:'',dec: _i18n("FC15"),min: 0, max: 1}
    ],
    //乘机人总数量
    guestTypeMaxCount: 4,
    //可选舱位
    cabinClassList: [
        {type: "Economy", title: _i18n("FC09")}
    ],
    showCabinCass : false,
    //可选币种
    currencyTypes: [
        {type: "CNY", title: _i18n("FC11")},
        {type: "USD", title: _i18n("FC12")}
    ],
    //是否显示币别下拉框
    showCurrency: false,
    //多航段的航段最小数量和最大数量
    multiWayCount: {
        min: 2,
        max: 5
    },
    //国际票是否卖婴儿
    domesticBaby : false,
    //机型图按钮的开关
    flightModelSwitch : true
};

//查询信息的KEY
var searchFlightInfoKey = "SEARCH_FLIGHT_INFO" + "_" + (hna._code || "");

//查询航班参数对象的构造函数
function SearchFlightInfo(info) {
    if (!info) {
        info = {};
    }

    //行程类型 单程OW 往返RT 多航段MC
    this.tripType = info.tripType || "OW";

    //单程和往返程中，出发城市，到达城市，出发时间
    this.outboundOption = info.outboundOption || {
            //出发城市三字码code
            originLocationCode: "",
            //出发城市名
            originLocationName: "",
            //出发城市是否为国内城市
            oriIsDomestic: "Y",
            //到达城市三字码code
            destinationLocationCode: "",
            //到达城市名
            destinationLocationName: "",
            //到达城市是否为国内城市
            desIsDomestic: "Y",
            //出发时间
            departureDate: ""
        };

    //多航段中，出发城市，到达城市，出发时间
    this.multiCityOptions = info.multiCityOptions || [];

    //返程中的返程时间
    this.inboundOption = info.inboundOption || {
            departureDate: ""
        };
    //判断出发时间是否大于当前时间

    if(this.outboundOption.departureDate){
        if((new Date(this.outboundOption.departureDate.replace(/-/g, '/')) < new Date())){
            this.outboundOption.departureDate = hna._date.getDateInfo(new Date()).date ;
        }
    }
    //判读返程时间是否大于等于出发时间
    if(this.inboundOption.departureDate){
        if((new Date(this.inboundOption.departureDate.replace(/-/g, '/')) < new Date(this.outboundOption.departureDate))){
            this.inboundOption.departureDate = this.outboundOption.departureDate ;
        }
    }
    //乘机人类型和数量 分别是成人数量 儿童数量 婴儿数量
    this.guestTypes = info.guestTypes || [
            {
                code: "ADT",//乘机人类型  成人
                amount: 1//乘机人数量
            },
            {
                code: "CNN",//乘机人类型  儿童
                amount: 0//乘机人数量
            },
            {
                code: "INF",//乘机人类型  婴儿
                amount: 0//乘机人数量
            }
        ];
    //舱位类型
    this.cabinClass = info.cabinClass || "Economy";
    //币别
    this.currencyType = info.currencyType || "CNY";
    //国内机票还是国际机票
    this.isDomestic = info.isDomestic || "Y";
    //是否灵活搜索所，N：只要这天的票；Y：只要最优惠的票
    this.flexible = info.flexible || "N";
    //语言
    this.languageCode = hna._lang_type;
    this.outboundOption.originLocationName = getCityNameByCode(this.outboundOption.originLocationCode,"city");
    this.outboundOption.oriIsDomestic = getCityNameByCode(this.outboundOption.originLocationCode,"other") ? "N" : "Y";
    this.outboundOption.destinationLocationName = getCityNameByCode(this.outboundOption.destinationLocationCode,"city");
    this.outboundOption.desIsDomestic = getCityNameByCode(this.outboundOption.destinationLocationCode,"other") ? "N" : "Y";

    this.isDomestic = this.outboundOption.oriIsDomestic == "N" || this.outboundOption.desIsDomestic == "N" ? "N" : "Y";
}

//查询航班的参数集合
var _sInfo = new SearchFlightInfo();

//获取本地的查询信息
function getSearchFlightInfo() {
    var info = hna._store.getStore(searchFlightInfoKey);
    var deInfo = new SearchFlightInfo(info);
    //保证至少有一个成人
    (deInfo.guestTypes || []).forEach(function (item) {
        if (item.code.toUpperCase() == "ADT" && item.amount < 1) {
            item.amount = 1;
        }
    });
    return deInfo;
}