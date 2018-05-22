hna._i18nMap.addLanguages({
    "S01": {"zh_CN": "航班号", "en_US": "Flight number"},
    "S02": {"zh_CN": "最多只能有", "en_US": "Flight number"},
    "S03": {"zh_CN": "个航段！", "en_US": "Flight number"},
    "S04": {"zh_CN": "点击新增航段", "en_US": "Flight number"},
    "S05": {"zh_CN": "请选择第", "en_US": "Flight number"},
    "S06": {"zh_CN": "航段出发的城市！", "en_US": "Flight number"},
    "S07": {"zh_CN": "出发城市和到达城市不能相同！", "en_US": "Flight number"},
    "S08": {"zh_CN": "多航段查询不能购买国际航班！", "en_US": "Flight number"},
    "S09": {"zh_CN": "航段出发的日期", "en_US": "Flight number"},
    "S10": {"zh_CN": "第", "en_US": "Flight number"},
    "S11": {"zh_CN": "航段", "en_US": "Flight number"}
});

//是否需要展示历史搜索记录
var _isExtra = true;
//是否需要读取历史搜索数据
var _isHistory = false;

var _flightCityData = [];

var ajaxUrl = {
    searchFlightInfo: "/flight/searchFlightInfo"
};

$(function () {
    //页面点击事件
    $(document).on("click", ".click-btn", function (e) {
        e.stopPropagation();
        try {
            var $this = $(e.target);
            if ($this.hasClass("hnaui-btn-disabled")) {
                return false;
            }

            var $multiWay = null;
            if ($this.hasClass("search-btn")) {//提交搜索
                var lock = getSearchBoxParam();
                if(!lock){
                    return false;
                }
                saveSearchFlightInfo();
                if (_sInfo.flexible === "Y") {
                    goToPage("/airEye/flight/flexible");
                }else{
                    searchFlightFun({
                        beforeCallbackFun: function () {
                            hna.loading();
                        },
                        doneCallbackFun: function () {
                            goToPage("/airEye/flight/select");
                        },
                        alwaysCallbackFun: function () {
                        }
                    });
                }
            } else if ($this.hasClass("hna-multi-way-add")) {//新增航段
                $multiWay = $(".hna-multi-way-item:visible");
                var max = _searchBoxConfig.multiWayCount.max || 0;
                if ($multiWay.length >= max) {
                    _showMsg(_i18n("S02") + max + _i18n("S03"));
                } else {
                    $multiWay.find(".close-btn").hide();
                    $multiWay.last().next().show().find(".close-btn").show();
                }
            } else if ($this.hasClass("close-btn")) {//删除航段
                $this.parents(".hna-multi-way-item").hide();
                $multiWay = $(".hna-multi-way-item:visible");
                var min = _searchBoxConfig.multiWayCount.min || 0;
                if ($multiWay.length > min) {
                    $multiWay.last().find(".close-btn").show();
                }
                $this.parents(".hna-multi-way-item").find("input").each(function (index,item) {
                    $(item).val('');
                });
                _sInfo.multiCityOptions = [];
            } else if ($this.hasClass("hna-change-text")) {//交换城市
                changeCity($this);
            }
        } catch (ev) {
            JsErrorTips(ev);
        }
    });

    //清空本地的新订单号
    hna._processData.saveNewOrderCoder();

    hna.jsData.getFlightCityData(function(data){
        _flightCityData = data;
        setFlightState("flight-state-search");
        _sInfo = getSearchFlightInfo();
        createInitEl();
        //清空本地的航班结果
        saveSearchFlightResult();
        hna.goToTop("1");
    });
});

//初始化页面element
function createInitEl() {
    try {
        createSearchBox("flexible");
        $(".search-box").show();
        $(".search-loading").hide();
        if(_isExtra){//历史搜索记录
            //获取城市机场数据
            createSpeTicketReq(_isHistory);
        }
    } catch (e) {
        JsErrorTips(e);
    }
}

//创建多航段查询需要的控件 
function createMultiWayEl() {
    var html = '';
    try {
        var multiWayCount = _searchBoxConfig.multiWayCount.max || 0;
        for (var a = 0; a < multiWayCount; a++) {
            html += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 input-icon hna-multi-way hna-multi-way-item">';
            html += '   <div class="hnaui-input-inline hnaui-clear"><label class="hnaui-form-label"><i class="hnaui-icon"></i>' + _i18n("S10") + '<span>' + (a + 1) + '</span>' + _i18n("S11") + '<i class="hnaui-icon close-btn click-btn">ဆ</i></label></div>';
            html += '   <div class="hna-multi-way-content hnaui-clear">';
            html += createCityEl("dep", a);
            html += createCityEl("arr", a);
            html += createDateEl(a);
            html += '   </div>';
            html += '</div>';
        }
        html += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 input-icon hna-multi-way"><span class="hna-multi-way-title">' + _i18n("S04") + '</span><i class="hnaui-icon hna-multi-way-add click-btn"></i></div>';

    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}

function setHnaOtherSearch() {
    $(".hna-one-way").show();
    $(".hna-multi-way").hide();
    $(".hna-other-search").removeClass().addClass("col-xs-12 col-sm-12 col-md-6 col-lg-6 hna-other-search");
    $(".guest-types").removeClass().addClass("col-xs-12 col-sm-6 col-md-6 col-lg-6 guest-types");
    $(".lang-type").removeClass().addClass("col-xs-12 col-sm-6 col-md-6 col-lg-6 lang-type");
    $("input[name='flexible']").parents(".radio-type").show();
}

//点击多航段的操作
function clickMultiWayFun() {
    var $multiway = $(".hna-multi-way");
    if ($multiway.length <= 0) {
        var html = createMultiWayEl();
        $(html).insertBefore($("#searchFlightBox .hna-other-search"));

        renderFrom();
        initMultiWayCity();
    }
    var $hnaMultiWay = $(".hna-multi-way");
    var multiWayCount = _sInfo.multiCityOptions.length || _searchBoxConfig.multiWayCount.min;
    $hnaMultiWay.each(function (index, item) {
        if (index < multiWayCount) {
            $(item).show();
        }
    });
    $hnaMultiWay.last().show();
    var $multiWayItem = $(".hna-multi-way-item:visible");
    if($multiWayItem.length > _searchBoxConfig.multiWayCount.min){
        $multiWayItem.find(".close-btn").hide();
        $multiWayItem.last().find(".close-btn").show();
    }
    $(".hna-one-way").hide();
    $(".hna-other-search").removeClass().addClass("col-xs-12 col-sm-6 col-md-3 col-lg-3 hna-other-search hna-multi-way-other");
    $(".guest-types").removeClass().addClass("col-xs-12 col-sm-12 col-md-12 col-lg-12 guest-types");
    $(".lang-type").removeClass().addClass("col-xs-12 col-sm-12 col-md-12 col-lg-12 lang-type");
    $("input[name='flexible']").parents(".radio-type").hide();
}

//初始化多航段城市选择面板
function initMultiWayCity() {
    try {
        var config = {
            request: {
                sidx: "code"
            },
            handler: {
                onSelect: function (row) {
                    $(this.target).val(row.city);
                    // $(this.target).val(row.city).focus();ie不兼容
                    $($(this.target).data("related")).val(row.code);
                    if(hna.isPC()){
                        $($(this.target).data("focus")).trigger("click");
                    }

                    //判断该城市是国际城市还是国内城市
                    var thisId = $(this.target).attr("id");
                    var index = thisId.substring(thisId.indexOf("Name") + 4);
                    if (thisId.indexOf("originLocationName") > -1) {
                        $("#oriIsDomestic" + index).val(row.other ? "N" : "Y");
                    } else {
                        $("#desIsDomestic" + index).val(row.other ? "N" : "Y");
                    }
                    if(row.other){
                        domesticChange();
                    }
                }
            }
        };
        var $hnaMultiWayItemLen = $(".hna-multi-way-item").length;
        for (var a = 0; a < $hnaMultiWayItemLen; a++) {
            (function (a) {
                $("#originLocationName" + a).on("click focus", function () {
                    $("#originLocationName" + a).flightCity(config);
                });
                $("#destinationLocationName" + a).on("click focus", function () {
                    $("#destinationLocationName" + a).flightCity(config);
                });
            })(a);
        }
    } catch (e) {
        JsErrorTips(e);
    }
}

//验证选择多航段时，出发城市，到达城市和出发时间
function verificationMultiWay() {
    var bl = true;

    $(".hna-multi-way-item:visible").each(function (index, item) {
        var info = {};
        //判断出发城市
        var originLocationCode = $("#originLocationCode" + index).val();
        var originLocationName = $("#originLocationName" + index).val();
        if (!originLocationCode) {
            _showMsg(_i18n("S05") + (index + 1) + _i18n("S06"));
            bl = false;
            return false;
        }
        info.originLocationCode = originLocationCode;
        info.originLocationName = originLocationName;

        //判断到达城市
        var destinationLocationCode = $("#destinationLocationCode" + index).val();
        var destinationLocationName = $("#destinationLocationName" + index).val();
        if (!destinationLocationCode) {
            _showMsg(_i18n("S05") + (index + 1) + _i18n("S06"));
            bl = false;
            return false;
        }
        info.destinationLocationCode = destinationLocationCode;
        info.destinationLocationName = destinationLocationName;

        //判断出发城市和到达城市不一致
        if (originLocationCode == destinationLocationCode) {
            _showMsg(_i18n("S07"));
            bl = false;
            return false;
        }

        //判断航班是国内航班还是国际航班
        var oriIsDomestic = $("#oriIsDomestic" + index).val();
        info.oriIsDomestic = oriIsDomestic;
        var desIsDomestic = $("#desIsDomestic" + index).val();
        info.desIsDomestic = desIsDomestic;
        if (oriIsDomestic == "N" || desIsDomestic == "N") {
            _showMsg(_i18n("S08"));
            bl = false;
            return false;
        }

        //判断出发日期
        var goDate = $("#goDate" + index).val();
        if (!goDate) {
            _showMsg(_i18n("S05") + (index + 1) + _i18n("S09"));
            bl = false;
            return false;
        }
        info.departureDate = goDate;
        _sInfo.multiCityOptions[index] = info;
    });
    return bl;
}