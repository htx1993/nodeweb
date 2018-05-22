hna._i18nMap.addLanguages({
    "SE01": {"zh_CN": "请选择出发城市！", "en_US": "Flight number"},
    "SE02": {"zh_CN": "请选择到达城市！", "en_US": "Flight number"},
    "SE03": {"zh_CN": "出发城市和到达城市不能相同！", "en_US": "Flight number"},
    "SE04": {"zh_CN": "请选择出发日期！", "en_US": "Flight number"},
    "SE05": {"zh_CN": "请选择返回日期！", "en_US": "Flight number"},
    "SE06": {"zh_CN": "乘机人数量不能超过", "en_US": "Flight number"},
    "SE07": {"zh_CN": "人", "en_US": "Flight number"},
    "SE08": {"zh_CN": "你选择的是国际票,乘机人不能有婴儿", "en_US": "Flight number"}
});
//查询航班的结果集
var _fInfo = {};

//国际票是否卖婴儿
var domesticBaby = _searchBoxConfig.domesticBaby;

//方便长属性压缩
var outboundOption = "outboundOption";
var inboundOption = "inboundOption";
var destinationLocationCode = "destinationLocationCode";
var destinationLocationName = "destinationLocationName";
var desIsDomestic = "desIsDomestic";
var departureDate = "departureDate";
var originLocationCode = "originLocationCode";
var originLocationName = "originLocationName";
var oriIsDomestic = "oriIsDomestic";
var multiCityOptions = "multiCityOptions";

//查询航班面板事件初始化
function initSearchEvent() {
    initTripType();
    initCity();
    initDate();
    initSelect();
    $('.hnaui-input-num').InputNum();
    hna.filterForm();

    if (_sInfo.tripType == "RT") {
        setFlexbleState();
    }
}

//************************************************************************//
//设置返回日期的状态
function setBackDateState(value, flag) {
    if (value == "RT") {
        $("#backDate").parent().removeClass("disabled-date");
        if (window.setHnaOtherSearch && hna.isFunction(window.setHnaOtherSearch)) {
            window.setHnaOtherSearch();
        }
    } else if (value == "OW") {
        $("#backDate").val("").trigger("blur").parent().addClass("disabled-date");
        if (window.setHnaOtherSearch && hna.isFunction(window.setHnaOtherSearch)) {
            window.setHnaOtherSearch();
        }
    } else {
        if (window.clickMultiWayFun && hna.isFunction(window.clickMultiWayFun)) {
            window.clickMultiWayFun(flag);
        }
    }
}
//设置灵活查询的显示状态
//如果是往返程的话，则隐藏“最优票价”
function setFlexbleState() {
    var $flexble = $(".flexible-item");
    if (_sInfo.tripType != "OW") {
        $flexble.find("input[name='radio']").first().prop("checked", true);
        $flexble.find("input[name='radio']").last().prop("checked", false);
        renderFrom();
    }
    $flexble.find(".hnaui-form-radio").last().css("visibility", (_sInfo.tripType == "OW" ? "visible" : "hidden"));
}

//监听行程类型改变事件
function initTripType() {
    try {
        globalFrom.on('radio(tripType)', function (data) {
            setBackDateState(data.value, "click");
            _sInfo.tripType = data.value;
            //如果不是单程则将flexible值改为N;
            if (_sInfo.tripType != "OW") {
                _sInfo.flexible = "N";
                $("input[name='flexible']").each(function () {
                    var $this = $(this);
                    $this.prop("checked", $this.val() == "N");
                });
            }
            saveSearchFlightInfo(_sInfo);
            setFlexbleState();
        });
        setBackDateState(_sInfo.tripType);

        globalFrom.on('radio(flexible)', function (data) {
            _sInfo.flexible = data.value;
            saveSearchFlightInfo(_sInfo);
        });
    } catch (e) {
        JsErrorTips(e);
    }
}
//初始化城市选择面板
function initCity() {
    try {
        var config = {
            request: {
                sidx: "code"
            },
            handler: {
                onSelect: function (row) {
                    $(this.target).val(row.city);
                    //$(this.target).val(row.city).focus();此处IE内核会出问题;
                    $($(this.target).data("related")).val(row.code);
                    //$($(this.target).data("focus")).trigger("click");

                    //判断该城市是国际城市还是国内城市
                    if ($(this.target).attr("id") == "originLocationName") {
                        $("#oriIsDomestic").val(row.other ? "N" : "Y");
                    } else {
                        $("#desIsDomestic").val(row.other ? "N" : "Y");
                    }
                    //处理国际婴儿票
                    if (row.other) {
                        domesticChange();
                    }
                }
            }
        };
        //点击输入框初始化面板
        $("#originLocationName").on("click focus", function () {
            $("#originLocationName").flightCity(config);
        });
        $("#destinationLocationName").on("click focus", function () {
            $("#destinationLocationName").flightCity(config);
        });

    } catch (e) {
        JsErrorTips(e);
    }
}
//初始化出发时间和返回时间
function initDate() {
    try {
        $(document).on("click focus", ".f-date", function (e) {
            e = e || window.event;
            e.stopPropagation();
            try {
                var $this = $(e.target);
                var display = $("#hnadate_box").css("display");
                var currentDate = hna._date.getDateInfo().date;
                var pDateOption = {};
                pDateOption.elem = this;
               pDateOption.dateType = "searchFlight";
                pDateOption.init = false;
                pDateOption.holidayList = [{"date":'6.14',"text":"周年庆"}];
                var thisId = $this.attr("id");
                if (thisId == "goDate") {
                    pDateOption.min = currentDate;
                    var backDateV = $("#backDate").val();
                    if (backDateV) {
                        pDateOption.max = backDateV;
                    }
                } else if (thisId == "backDate") {
                    clickBackDate();
                    var goDateV = $("#goDate").val();
                    pDateOption.min = goDateV || currentDate;
                } else {
                    //获取该航段之前所有航段中日期不为空的最大日期，
                    var prevArr = [];
                    $this.parents(".hna-multi-way-item").prevAll(".hna-multi-way-item").find(".f-date").each(function () {
                        var thisValue = $(this).val() || "";
                        if (thisValue) {
                            prevArr.push(thisValue);
                        }
                    });
                    var prevMaxV = prevArr.max();
                    pDateOption.min = prevMaxV || currentDate;

                    //获取该航段之后所有航段中日期不为空的最小日期，
                    var nextArr = [];
                    $this.parents(".hna-multi-way-item").nextAll(".hna-multi-way-item").find(".f-date").each(function () {
                        var thisValue = $(this).val() || "";
                        if (thisValue) {
                            nextArr.push(thisValue);
                        }
                    });
                    var nextMinV = nextArr.min();
                    if (nextMinV) {
                        pDateOption.max = nextMinV;
                    }
                }
                pDateOption.start = $this.val() || pDateOption.min;
                pDateOption.choose = function (dates) {
                    $this.parents(".hnaui-placeholder").toggleClass("hnaui-input-active",!!dates);
                    if(!!dates){
                        if (_sInfo.tripType == "RT") {
                            if (thisId == "goDate") {
                                $("#backDate").focus();
                            }
                        }
                    }

                };
                if (!globalDate) {
                    globalDate =  hna.initDatePanel;
                }
                //if (display == "none" || !display) {
                //    globalDate(pDateOption);
                //}
                globalDate(pDateOption);
            } catch (ev) {
                JsErrorTips(ev);
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}
//模拟点击了返程日期
function clickBackDate() {
    try {
        $("#backDate").removeClass("disabled-date");
        $(".trip-type-rt").next(".hnaui-form-radio").trigger("click");
    } catch (e) {
        JsErrorTips(e);
    }
}
//监听下拉框改变事件
function initSelect() {
    try {
        //监听乘机人数量改变事件
        globalFrom.on('select(guestTypes)', function (data) {
            var $this = $(data.elem);
            if ($this.attr('name') == 'guestTypeInf' && data.value != '0' && !domesticBaby) {
                var internal = $('input[name="locationDom"]');
                for (var i = 0, len = internal.length; i < len; i++) {
                    if (internal.eq(i).val() == 'N') {
                        _showMsg(_i18n("SE08"));
                        $this.children().prop('selected', false);
                        $this.find("option[value='0']").prop('selected', true);
                        renderFrom();
                        break;
                    }
                }
            }
        });
        //监听舱位改变事件
        globalFrom.on('select(cabinClass)', function (data) {
        });
        //监听币别改变事件
        globalFrom.on('select(currencyType)', function (data) {
        });
    } catch (e) {
        JsErrorTips(e);
    }
}
//国际城市婴儿个数情况
function domesticChange() {
    if (!domesticBaby) {//如果没有国际婴儿票
        var option = $('select[name="guestTypeInf"] option[value="0"]');
        var selected = $('select[name="guestTypeInf"] option:selected');
        if (selected.val() != '0') {
            _showMsg(_i18n("SE08"));
            selected.prop('selected', false);
            option.prop('selected', true);
            renderFrom();
        }
    }
}
//交换值
function changeValue(ele1, ele2) {
    if (!ele1) {
        ele1 = {};
    }
    if (!ele2) {
        ele2 = {};
    }
    var value1 = ele1.val() || "";
    var value2 = ele2.val() || "";
    ele1.val(value2).trigger("blur");
    ele2.val(value1).trigger("blur");
}
//交换城市
function changeCity($this) {
    var originCity;
    var destinaCity;
    if($this.parents(".hna-multi-way-content").length > 0) {
        //出发城市
        originCity = $this.parents(".location").find('input[name="originLocationName"]');
        //到达城市
        destinaCity = $this.parents(".location").next().find('input[name="destinationLocationName"]');
    }else {
        //出发城市
        originCity = $this.parents(".search-box").find('input[name="originLocationName"]');
        //到达城市
        destinaCity = $this.parents(".search-box").find('input[name="destinationLocationName"]');
    }
    
    //出发城市的隐藏域
    var originCode = originCity.siblings('input[name="locationCode"]');
    var originDom = originCity.siblings('input[name="locationDom"]');

    //到达城市的隐藏域
    var destinaCode = destinaCity.siblings('input[name="locationCode"]');
    var destinaDom = destinaCity.siblings('input[name="locationDom"]');
    changeValue(originCity, destinaCity);
    changeValue(originCode, destinaCode);
    changeValue(originDom, destinaDom);
}
//************************************************************************//
//查询航班动作
function searchFlightFun(o) {
    if (!o) {
        o = {};
    }
    var defO = {
        beforeCallbackFun: "",
        doneCallbackFun: "",
        alwaysCallbackFun: ""
    };
    try {
        $.extend(defO, o);
        var searchFlightInfo = defO.data || getSearchBoxParam();
        if (isAvailability(searchFlightInfo)) {
            if (typeof (defO.beforeCallbackFun) == "function") {
                defO.beforeCallbackFun();
            }
            $(".search-btn").addClass("hnaui-btn-disabled");

            hna.jsData.getFlightCityData(function (data) {
                _flightCityData = data;
                hna.ajax({
                    url: "/flight/searchFlightInfo",
                    data: dataAdapter(searchFlightInfo),
                    doneCallback: function (data) {
                        saveSearchFlightResult(data.data);
                        if (typeof (defO.doneCallbackFun) == "function") {
                            defO.doneCallbackFun(data.data);
                        }
                    },
                    alwaysCallback: function (data) {
                        $(".search-btn").removeClass("hnaui-btn-disabled");
                        if (typeof (defO.alwaysCallbackFun) == "function") {
                            defO.alwaysCallbackFun();
                        }
                    }
                });
            });

        }
    } catch (e) {
        JsErrorTips(e);
    }
}

//数据适配处理,可以在这里修改后台需要参数的结构和属性名
function dataAdapter(info) {
    var ajaxData = {};
    ajaxData = hna.cloneObj(info);

    ajaxData.flexible = ajaxData.flexible == "N" ? false : true;
    delete ajaxData[outboundOption][originLocationName];
    delete ajaxData[outboundOption][oriIsDomestic];
    delete ajaxData[outboundOption][destinationLocationName];
    delete ajaxData[outboundOption][desIsDomestic];
    (ajaxData.multiCityOptions || []).forEach(function (item) {
        delete item[originLocationName];
        delete item[oriIsDomestic];
        delete item[destinationLocationName];
        delete item[desIsDomestic];
    });
    return JSON.stringify(ajaxData);
}
//获取查询面板里面的数据结构
function getSearchBoxParam() {
    try {
        var bl = true;
        hna.verifyForm($(".hnaui-search-box"), function () {
            var tripType = $("input[type='radio'][name='tripType']:checked").val();
            _sInfo.tripType = tripType;

            var flexible = $("input[type='radio'][name='flexible']:checked").val();
            _sInfo.flexible = flexible;

            _sInfo.cabinClass = $("select[name='cabinClass']").val();
            _sInfo.currencyType = $("select[name='currencyType']").val();


            if (tripType != "MC") {
                //如果是单程或者往返程
                //判断出发城市
                var originLocationCodeV = $("#originLocationCode").val();
                var originLocationNameV = $("#originLocationName").val();
                if (!originLocationCodeV || !originLocationNameV) {
                    _showMsg(_i18n("SE01"));
                    bl = false;
                    return false;
                }
                _sInfo[outboundOption][originLocationCode] = originLocationCodeV;
                _sInfo[outboundOption][originLocationName] = originLocationNameV;

                //判断到达城市
                var destinationLocationCodeV = $("#destinationLocationCode").val();
                var destinationLocationNameV = $("#destinationLocationName").val();
                if (!destinationLocationCodeV || !destinationLocationNameV) {
                    _showMsg(_i18n("SE02"));
                    bl = false;
                    return false;
                }
                _sInfo[outboundOption][destinationLocationCode] = destinationLocationCodeV;
                _sInfo[outboundOption][destinationLocationName] = destinationLocationNameV;

                //判断出发城市和到达城市不一致
                if (originLocationCodeV == destinationLocationCodeV) {
                    _showMsg(_i18n("SE03"));
                    bl = false;
                    return false;
                }

                //判断航班是国内航班还是国际航班
                var oriIsDomesticV = $("#oriIsDomestic").val();
                _sInfo[outboundOption][oriIsDomestic] = oriIsDomesticV;
                var desIsDomesticV = $("#desIsDomestic").val();
                _sInfo[outboundOption][desIsDomestic] = desIsDomesticV;
                if (oriIsDomesticV == "N" || desIsDomesticV == "N") {
                    _sInfo.isDomestic = "N";
                } else {
                    _sInfo.isDomestic = "Y";
                }

                //判断出发日期
                var goDate = $("#goDate").val();
                if (!goDate) {
                    _showMsg(_i18n("SE04"));
                    bl = false;
                    return false;
                }
                _sInfo[outboundOption][departureDate] = goDate;

                //判断到达日期
                var backDate = $("#backDate").val();
                if (!backDate && tripType == "RT") {
                    _showMsg(_i18n("SE05"));
                    bl = false;
                    return false;
                }
                _sInfo[inboundOption][departureDate] = backDate;
            } else {
                //如果是多航段
                if (window.verificationMultiWay && hna.isFunction(verificationMultiWay)) {
                    if (!verificationMultiWay()) {
                        bl = false;
                        return false;
                    }
                }
            }

            //判断乘机人总数量
            var adtCount = parseInt(($("select[name='guestTypeAdt']").val() || $("input.num").eq(0).val() || 0) + "", 10);
            var cnnCount = parseInt(($("select[name='guestTypeCnn']").val() || $("input.num").eq(1).val() || 0) + "", 10);
            var infCount = parseInt(($("select[name='guestTypeInf']").val() || $("input.num").eq(2).val() || 0) + "", 10);
            if (adtCount + cnnCount + infCount > _searchBoxConfig.guestTypeMaxCount) {
                _showMsg(_i18n("SE06") + _searchBoxConfig.guestTypeMaxCount + _i18n("SE07"));
                bl = false;
                return false;
            }
            _sInfo.guestTypes[0].amount = adtCount;
            _sInfo.guestTypes[1].amount = cnnCount;
            _sInfo.guestTypes[2].amount = infCount;


            $(".search-btn").removeClass("hnaui-btn-disabled");
        });
        if(bl){
            return _sInfo;
        }else{
            return bl;
        }
    } catch (e) {
        JsErrorTips(e);
        return false;
    }
}
//保存查询信息到本地3
function saveSearchFlightInfo(info) {
    try {
        var value = info || getSearchBoxParam();
        if (isAvailability(value)) {
            hna._store.setStore(searchFlightInfoKey, new SearchFlightInfo(value), 1000 * 60 * 60 * 24);
        }
    } catch (e) {
        JsErrorTips(e);
    }
}

//判断查询信息是否可用
function isAvailability(info) {
    // && ((info.tripType!="MC" && info[outboundOption][originLocationCode]) || (info.tripType=="MC" && info.multiCityOptions[0][originLocationCode]))
    if (info) {
        return true;
    }
    return false;
}

//查询航班的结果集的KEY
var searchFlightResultKey = "SEARCH_FLIGHT_RESULT" + "_" + (hna._code || "");
//保存航班的结果集到本地
function saveSearchFlightResult(o) {
    try {
        if (o) {
            _fInfo = o || {};
            processingData();
            hna._store.setStore(searchFlightResultKey, _fInfo, 1000 * 60 * 60 * 24);
        } else {
            hna._store.removeStore(searchFlightResultKey);
        }

    } catch (e) {
        JsErrorTips(e);
    }
}
//处理数据,补齐价格日历为7天，对航班按照起飞时间进行排序
function processingData() {
    if(!_fInfo.originDestinations){
        _fInfo.originDestinations = [];
    }
    //如果没有航班数据
    if (_fInfo.originDestinations.length == 0) {
        if (_sInfo.tripType == "MC") {
            (_sInfo[multiCityOptions] || []).forEach(function (item) {
                _fInfo.originDestinations.push({
                    "departureDate": item[departureDate],
                    "departureDates": [{//默认返回当天
                        currency: "CNY",
                        date: item[departureDate],
                        minPrice: 0
                    }],
                    "destination": item[destinationLocationCode],
                    "destinationName": item[destinationLocationName],
                    "airItineraries": [],
                    "origin": item[originLocationCode],
                    "originName": item[originLocationName]
                });
            });
        } else {
            _fInfo.originDestinations.push({
                "departureDate": _sInfo[outboundOption][departureDate],
                "departureDates": [{
                    currency: "CNY",
                    date: _sInfo[outboundOption][departureDate],
                    minPrice: 0
                }],
                "destination": _sInfo[outboundOption][destinationLocationCode],
                "destinationName": getCityNameByCode(_sInfo[outboundOption][destinationLocationCode], "name"),
                "airItineraries": [],
                "origin": _sInfo[outboundOption][originLocationCode],
                "originName": getCityNameByCode(_sInfo[outboundOption][originLocationCode], "name")
            });
            if (_sInfo.tripType == "RT") {
                _fInfo.originDestinations.push({
                    "departureDate": _sInfo[inboundOption][departureDate],
                    "departureDates": [{//默认返回当天
                        currency: "CNY",
                        date: _sInfo[inboundOption][departureDate],
                        minPrice: 0
                    }],
                    "destination": _sInfo[outboundOption][originLocationCode],
                    "destinationName": getCityNameByCode(_sInfo[outboundOption][originLocationCode], "name"),
                    "airItineraries": [],
                    "origin": _sInfo[outboundOption][destinationLocationCode],
                    "originName": getCityNameByCode(_sInfo[outboundOption][destinationLocationCode], "name")
                });
            }
        }
    }else{
        if(_sInfo.tripType == "OW"){
            _fInfo.originDestinations.length = 1;
        }  else if(_sInfo.tripType == "RT"){
            _fInfo.originDestinations.length = 2;
        } else if(_sInfo.tripType == "MC"){
            _fInfo.originDestinations.length = _sInfo.multiCityOptions.length;
        }
    }

    //对航班按照起飞时间进行排序
    (_fInfo.originDestinations || []).forEach(function (item, index) {
        ((item || {}).airItineraries || []).sort(function (a, b) {
            return a.flightSegments[0].departureTime > b.flightSegments[0].departureTime;
        });
    });

    //补全日历到七天;
    (_fInfo.originDestinations || []).forEach(function (item, index) {
        if ((item || {}).departureDates && ((item || {}).departureDates.length < 7)) {
            completeDate(item.departureDates, item.departureDate);
        }
    });
}

//如果日历长度小于7,则补全到7
function completeDate(dateList, activeDate) {
    activeDate = hna._date.getDateInfo(activeDate).date;
    var defaultLen = dateList.length;
    //acriveDate在中间,所有价格为空的价格日历
    var copyList = [];
    //生成copyList数组
    for(var i = -3; i < 4; i++){
        copyList.push({
            currency: "CNY",
            date: hna._date.addDate(i , activeDate),
            minPrice: 0
        });
    }
    //遍历dateList,更新copyList
    (dateList || []).forEach(function(item , index) {
        for(var j = 0, len = copyList.length; j < len; j++) {
            var subItem = copyList[j];
            if(subItem.date === item.date) {
                subItem.currency = item.currency;
                subItem.minPrice = item.minPrice;
                break;
            }
        }
    });
    //清空dateList并push copyList
    dateList.splice(0 , defaultLen);
    (copyList || []).forEach(function(item , index){
        dateList.push(item);
    });
}

//获取本地的航班的结果集
function getSearchFlightResult() {
    return hna._store.getStore(searchFlightResultKey);
}


//过滤日期中的非数字
function filterDate(date) {
    date = (date||"").replace(/[^\d]/g, "");
    date = date ? date*1 : "";
    return date;
}