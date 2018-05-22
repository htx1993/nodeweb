//定义全局变量
hna._i18nMap.addLanguages({
    "AS01": {"zh_CN": "航班号", "en_US": "Flight number"},
    "AS02": {"zh_CN": "出发地", "en_US": "Flight number"},
    "AS03": {"zh_CN": "乘机楼", "en_US": "Flight number"},
    "AS04": {"zh_CN": "计划出发", "en_US": "Flight number"},
    "AS05": {"zh_CN": "实际出发", "en_US": "Flight number"},
    "AS06": {"zh_CN": "目的地", "en_US": "Flight number"},
    "AS07": {"zh_CN": "接机楼", "en_US": "Flight number"},
    "AS08": {"zh_CN": "计划到达", "en_US": "Flight number"},
    "AS09": {"zh_CN": "实际到达", "en_US": "Flight number"},
    "AS10": {"zh_CN": "状态", "en_US": "Flight number"},
    "AS11": {"zh_CN": "计划起飞", "en_US": "Flight number"},
    "AS12": {"zh_CN": "预计起飞", "en_US": "Flight number"},
    "AS13": {"zh_CN": "实际起飞", "en_US": "Flight number"},
    "AS14": {"zh_CN": "登机口", "en_US": "Flight number"},
    "AS15": {"zh_CN": "当地天气", "en_US": "Flight number"},
    "AS16": {"zh_CN": "计划到达", "en_US": "Flight number"},
    "AS17": {"zh_CN": "预计到达", "en_US": "Flight number"},
    "AS18": {"zh_CN": "实际到达", "en_US": "Flight number"},
    "AS19": {"zh_CN": "接机口", "en_US": "Flight number"},
    "AS20": {"zh_CN": "准点率", "en_US": "Flight number"},
    "AS21": {"zh_CN": "型号", "en_US": "Flight number"},
    "AS22": {"zh_CN": "机龄", "en_US": "Flight number"},
    "AS23": {"zh_CN": "准点率", "en_US": "Flight number"},
    "AS24": {"zh_CN": "航班号不符合规则，请重新输入！", "en_US": "Flight number"},
    "AS25": {"zh_CN": "请输入航班号！", "en_US": "Flight number"},
    "AS26": {"zh_CN": "请输入正确航班号！", "en_US": "Flight number"},
    "AS27": {"zh_CN": "正在请求航班信息", "en_US": "Flight number"},
    "AS271": {"zh_CN": "请查询航班信息", "en_US": "Flight number"},
    "AS28": {"zh_CN": "未查询到航班信息", "en_US": "Flight number"},
    "AS29": {"zh_CN": "共", "en_US": "Flight number"},
    "AS30": {"zh_CN": "页", "en_US": "Flight number"},
    "AS31": {"zh_CN": "条", "en_US": "Flight number"},
    "AS32": {"zh_CN": "第", "en_US": "Flight number"},
    "AS33": {"zh_CN": "上一页", "en_US": "Flight number"},
    "AS34": {"zh_CN": "下一页", "en_US": "Flight number"},
    "AS35": {"zh_CN": "云", "en_US": "Flight number"},
    "AS36": {"zh_CN": "雨", "en_US": "Flight number"},
    "AS37": {"zh_CN": "晴", "en_US": "Flight number"},
    "AS38": {"zh_CN": "雾", "en_US": "Flight number"},
    "AS39": {"zh_CN": "雪", "en_US": "Flight number"},
    "AS40": {"zh_CN": "行李转盘", "en_US": "Flight number"},
    "AS41": {"zh_CN": "乌鲁木齐航空", "en_US": "Flight number"},
    "AS42": {"zh_CN": "未读取到航班信息", "en_US": "Flight number"},
    "AS43": {"zh_CN": "航班详情", "en_US": "Flight number"},
    "AS44": {"zh_CN": "错误提示", "en_US": "Flight number"},
    "AS45": {"zh_CN": "请选择出发城市！", "en_US": "Flight number"},
    "AS46": {"zh_CN": "请选择到达城市！", "en_US": "Flight number"},
    "AS47": {"zh_CN": "共{0}条，每页{1}条，共{2}页", "en_US": "Shopping Cart"},
    "AS48": {"zh_CN": "到第", "en_US": "Shopping Cart"},
    "AS49": {"zh_CN": "到达", "en_US": "Shopping Cart"},
    "AS50": {"zh_CN": "计划", "en_US": "Shopping Cart"},
    "AS51": {"zh_CN": "取消", "en_US": "Shopping Cart"}
});
//原始数据
var dataSource = [];
//总数据
var flightStatusList = [];
//当前页数据
var currentPageData = [];
//分页数据
var pagData = {
    //总条数
    "total": 0,
    //每页显示的条数
    "pageSize": 20,
    //总页数
    "pageCount": 0,
    //当前页码
    "pageCurrent": 1
};

var searchCount = 0;

var _searchDate = 0;

var depDetailsConfig = [
    {"configLeft": _i18n("AS11"), "configRight": "stdHm"},
    {"configLeft": _i18n("AS12"), "configRight": "etdHm"},
    {"configLeft": _i18n("AS13"), "configRight": "atdHm"},
    {"configLeft": _i18n("AS14"), "configRight": "depBuilding"},
    {"configLeft": _i18n("AS15"), "configRight": "weatherType", "configRightT": "temperature", "type": "depWeather"}
];
var arrDetailsConfig = [
    {"configLeft": _i18n("AS16"), "configRight": "staHm"},
    {"configLeft": _i18n("AS17"), "configRight": "etaHm"},
    {"configLeft": _i18n("AS18"), "configRight": "ataHm"},
    {"configLeft": _i18n("AS40"), "configRight": "baggage"},
    {"configLeft": _i18n("AS15"), "configRight": "weatherType", "configRightT": "temperature", "type": "arrWeather"}
];
var infoDetailsConfig = [
    {"configLeft": _i18n("AS21"), "configRight": "acType"},
    {"configLeft": _i18n("AS22"), "configRight": "flightAge"},
    {"configLeft": _i18n("AS23"), "configRight": "probability", "type": "percent"}
];

//ajax的URl
var ajaxUrl = {
    getFlightStatusList: "/airU/getFlightStatusList"
};

//创建表格的整体结构，此处创建的html字符串放入到HTML结构的hnaui-status-list节点下
function createTableContentEl() {      //表格头部数据
    try {
        var html = createTableHeadEl();
        html += createTableBodyEl();
        html += createTablePageEl();
        $(".hnaui-status-content").html(html);
        setPrevNextBtnStatus();
        renderFrom();
    } catch (e) {
        JsErrorTips(e);
    }
}
function createTableHeadEl() {
    var html = '';
    try {
        html += '   <ul class="hnaui-status-header hnaui-clear">';
        html += '       <li>' + _i18n("AS01") + '</li>';
        html += '       <li>' + _i18n("AS02") + '</li>';
        //html += '       <li>' + _i18n("AS03") + '</li>';
        html += '       <li>' + _i18n("AS04") + '</li>';
        html += '       <li>' + _i18n("AS05") + '</li>';
        html += '       <li>' + _i18n("AS06") + '</li>';
        //html += '       <li>' + _i18n("AS07") + '</li>';
        html += '       <li>' + _i18n("AS08") + '</li>';
        html += '       <li>' + _i18n("AS09") + '</li>';
        html += '       <li>' + _i18n("AS10") + '</li>';
        html += '   </ul>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
function createTableBodyEl() {
    var html = '';
    try {
        html += '   <div class="hnaui-status-list">';
        //第一次进入页面时，ajax请求之前，数据为空，页面显示效果
        if (searchCount < 1) {
            html += '<div class="no-data-show" id="no_data">' + _i18n("AS271") + '</div>';
        } else {
            if (currentPageData.length > 0) {
                //ajax请求已经完成，数据不为空时正常展示数据
                html += createBodyTrList();
            } else {
                //ajax请求已经完成，数据为空，展示页面没有信息
                html += '<div class="no-data-show">' + _i18n("AS28") + '</div>';
            }
        }
        html += '   </div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
function createTablePageEl() {
    var html = '';
    try {
        html += '   <div class="hnaui-form hnaui-hnapage hnaui-laypage hnaui-laypage-default hnaui-push-right">';
        html += '       <p class="page-text">'+_i18n("AS47",[pagData.total,pagData.pageSize,pagData.pageCount])+'</p>';
        html += '       <p>';
        html += '           <a href="javascript:;" class="hnaui-laypage-prev page-btn hnaui-btn-disabled click-btn"><i class="hnaui-icon"></i>'+_i18n("AS33")+'</a>';
        html += '           <span class="hnaui-laypage-total">'+_i18n("AS48")+' <input type="number" id="pageCurrent" min="1" max="' + pagData.pageCount + '" autocomplete="off" value="' + pagData.pageCurrent + '"> '+_i18n("AS30")+' </span>';
        html += '           <a href="javascript:;" class="hnaui-laypage-next page-btn hnaui-btn-disabled click-btn">'+_i18n("AS34")+'<i class="hnaui-icon"></i></a>';
        html += '       </p>';
        html += '   </div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
function createBodyTrList() {
    var html = '';
    try {
        (currentPageData || []).forEach(function (item, index) {
            var airType = item.ac.substring(0, 2);
            html += '<ul class="click-btn table-td"  data-index="' + (index || 0 ) + '">';
            html += createBodyTdEl({
                "cla": "flight-td",
                "index": index,
                "text": item.flightNo
            });
            html += createBodyTdEl({
                "cla": "flight-no",
                "index": index,
                "text": ((_filterAirLine(airType) || "") + ' ' + (item.flightNo || ""))
            });
            html += createBodyTdEl({
                "cla": "dep-city",
                "index": index,
                "text": (item.depCity + ' ' + (item.depBuilding || ""))
            });
            html += createBodyTdEl({
                "cla": "arr-city",
                "index": index,
                "text": (item.arrCity + ' ' + (item.arrBuilding || ""))
            });
            html += createBodyTdEl({
                // "cla": "",
                "index": index,
                "text": item.depCity
            });
            //html += createBodyTdEl({
            //    //"cla": "",
            //    "index": index,
            //    "text": item.depBuilding
            //});
            html += createBodyTdEl({
                // "cla": "",
                "index": index,
                "text": item.etdHm
            });
            html += createBodyTdEl({
                "cla": "atd-hm",
                "index": index,
                "text": item.atdHm
            });
            html += createBodyTdEl({
                //"cla": "",
                "index": index,
                "text": item.arrCity
            });
            //html += createBodyTdEl({
            //    //"cla": "",
            //    "index": index,
            //    "text": item.arrBuilding
            //});
            html += createBodyTdEl({
                //"cla": "",
                "index": index,
                "text": item.etaHm
            });
            html += createBodyTdEl({
                "cla": "ata-hm",
                "index": index,
                "text": item.ataHm
            });
            var cla = '';
            if (item.status == _i18n("AS49")) {
                cla = 'status-arr';
            } else if (item.status == _i18n("AS50")) {
                cla = 'status-plan';
            } else if (item.status == _i18n("AS51")) {
                cla = 'status-del';
            }
            html += createBodyTdEl({
                "cla": "status " + cla,
                "index": index,
                "text": item.status
            });

            html += '<div class="mobile-time-icon hnaui-icon">&#xe92c;</div>';//1.5
            html += '</ul>';
        });

        return html;
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
function createBodyTdEl(o) {
    var html = '';
    if (!o) {
        o = {};
    }
    try {
        html += '<li class="' + (o.cla || "") + '">' + (o.text || "--") + '</li>';

    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}


function viewFlight(flightInfo) {     //创建点击弹出框的“航班详情”
    try {
        if (!flightInfo) {
            flightInfo = {};
        }
        var html = '<div class="hnaui-view-flight hnaui-clear">';
        html += '       <div class="view-content"><i class="hnaui-icon hnaui-anim hnaui-anim-rotate hnaui-anim-loop loading-icon">&#xe63e;</i>';
        html += '           <p class="tips">' + _i18n("AS42") + '</p>';
        html += '       </div>';
        html += '   </div>';

        hnaer.closeAll();
        hnaer.open({
            title: _i18n("AS43"),
            content: html,
            area: '700px',
            btn: false,
            skin:'hnaui-layer-content',
            success: function (hnaero) {
                var html = '<ul class="hnaui-flight-status hnaui-clear">';
                html += '        <li class="column-one">' + flightInfo.depCity + '</li>';
                html += '        <li class="column-two">' + flightInfo.flightNo + '</li>';
                html += '        <li class="column-three">' + flightInfo.arrCity + '</li>';
                html += '</ul>';
                html += '<ul class="flight-details hnaui-clear">';
                html += '<li class="column-one">'+ createDetailsContent(depDetailsConfig, flightInfo)+'</li>';
                html += '<li class="column-two">'+ createDetailsContent(infoDetailsConfig, flightInfo)+'</li>';
                html += '<li class="column-three">'+ createDetailsContent(arrDetailsConfig, flightInfo)+'</li>';
                html += '</ul>';
                $(hnaero).find(".hnaui-view-flight").html(html);
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}
function createDetailsContent(detailsConfig, flightInfo) {
    try {
        var html = '';
        for (var i = 0; i < detailsConfig.length; i++) {
            html += '<p>';
            html += '<span>' + detailsConfig[i].configLeft + '</span>';
            html += '<em>：</em>';
            var subHtml = "";
            if (detailsConfig[i].type == "depWeather" || detailsConfig[i].type == "arrWeather") {
                var weatherConfig = detailsConfig[i].configRight;
                var temperatureConfig = detailsConfig[i].configRightT;
                var weatherInfo = '';
                if (detailsConfig[i].type == "depWeather") {
                    weatherInfo = flightInfo.weathers[flightInfo.depStn] || "";  //出发城市天气情况
                } else {
                    weatherInfo = flightInfo.weathers[flightInfo.arrStn] || "";      //到达城市天气情况
                }

                var iconStr = "";
                if (weatherInfo) {
                    if (weatherInfo[weatherConfig].indexOf(_i18n("AS35")) == 1) {  //云
                        iconStr = "&#xe927;";
                    } else if (weatherInfo[weatherConfig].indexOf(_i18n("AS36")) == 1) {  //雨
                        iconStr = "&#xe924;";
                    } else if (weatherInfo[weatherConfig].indexOf(_i18n("AS37")) == 1) {  //晴
                        iconStr = "&#xe926;";
                    } else if (weatherInfo[weatherConfig].indexOf(_i18n("AS38")) == 1) {   //雾
                        iconStr = "&#xe928;";
                    } else if (weatherInfo[weatherConfig].indexOf(_i18n("AS39")) == 1) {    //雪
                        iconStr = "&#xe925;";
                    }
                    subHtml =  '<span class="hnaui-icon weather-icon">' + iconStr + '</span>' + (weatherInfo[weatherConfig] || " ") + ' ' + (weatherInfo[temperatureConfig] || " ");
                }
            } else if (detailsConfig[i].type == "percent") {
                subHtml = (flightInfo[detailsConfig[i].configRight] || " ") + '%';
            } else {
                subHtml = (flightInfo[detailsConfig[i].configRight] || " ");
            }
            html += '<span class="text-right">' + subHtml + '</span>';
            html += '</p>';
        }
        return html;
    } catch (e) {
        JsErrorTips(e);
    }
}


//前端分页
function pagingFun() {
    //获取总条数
    pagData.total = flightStatusList.length;
    //计算总页数
    pagData.pageCount = Math.ceil(pagData.total / pagData.pageSize);
    var startIndex = pagData.pageSize * (pagData.pageCurrent - 1);
    var endIndex = pagData.pageSize * pagData.pageCurrent;
    //截取当前页的数组
    if (hna.isArray(flightStatusList)) {
        currentPageData = flightStatusList.slice(startIndex, endIndex);
    }
    //设置上一步，下一步，input的状态
    setPrevNextBtnStatus();
}
function initPag() {
    pagData = {
        //总条数
        "total": 0,
        //每页显示的条数
        "pageSize": 20,
        //总页数
        "pageCount": 0,
        //当前页码
        "pageCurrent": 1
    };
}
//设置上一页下一页的可点击状态
function setPrevNextBtnStatus() {
    $(".hnaui-laypage-prev").toggleClass('hnaui-btn-disabled', pagData.pageCurrent == "1");
    $(".hnaui-laypage-next").toggleClass('hnaui-btn-disabled', pagData.pageCurrent == pagData.pageCount);
}
//上一页
function prevPage() {
    pagData.pageCurrent--;
    if (pagData.pageCurrent < 1) {
        pagData.pageCurrent = 1;
        return false;
    }
    pagingFun();
    createTableContentEl();
}
//下一页
function nextPage() {
    pagData.pageCurrent++;
    if (pagData.pageCurrent > pagData.pageCount) {
        pagData.pageCurrent = pagData.pageCount;
        return false;
    }
    pagingFun();
    createTableContentEl();
}
function setPageCurrent(value) {
    var $pageCurrent = $("#pageCurrent");
    var thisPage = value || $pageCurrent.val();
    thisPage = parseInt(thisPage, 10);
    if (hna.isNaN(thisPage)) {
        thisPage = 1;
    }

    var thisMin = 1;
    var thisMax = pagData.pageCount;
    thisPage = thisPage < thisMin ? thisMin : thisPage;
    thisPage = thisPage > thisMax ? thisMax : thisPage;

    $pageCurrent.val(thisPage);
    pagData.pageCurrent = thisPage;

    pagingFun();
    createTableContentEl();
}


$(function () {
    $(document).on("click", ".click-btn", function (e) {
        e.stopPropagation();
        try {
            var $this = $(this);
            if ($this.hasClass("hnaui-btn-disabled")) {
                return false;
            }
            if ($this.hasClass("btn-search")) {    //搜索按钮的点击事件，会将ajax的请求参数进行相应赋值，然后发送ajax请求
                var searchType = $("input[name='type']:checked").val();
                if (searchType == "flight") {
                    var flightNo = $("input[name='flightNo']").val() || "";
                    if(flightNo){
                        if(!(new RegExp(hna.regex.flightNumber)).test(flightNo) || flightNo.substring(0,2).toUpperCase() != hna._code){
                            _showMsg(_i18n("AS26"));
                            return false;
                        }
                    }
                }else{
                    if (!$.trim($("input[name='depCity']").val())) {
                        $("input[name='depCode']").val("");
                    }
                    if (!$.trim($("input[name='arrCity']").val())) {
                        $("input[name='arrCode']").val("");
                    }
                }

                var currentDate = $("select[name='date']").find("option:selected").val();
                $(".search-loading").show();
                $(".hnaui-status-list").html('<div class="no-data-show" id="no_data">' + _i18n("AS27") + '</div>');
                $('.hnaui-status-content').show();

                getFlightStatusList();
                // if(currentDate == _searchDate){
                //     searchFlight();
                // }else{
                //     _searchDate = currentDate;
                //     getFlightStatusList();
                // }
            } else if ($this.hasClass("hnaui-laypage-next")) {
                nextPage();
            } else if ($this.hasClass("hnaui-laypage-prev")) {
                prevPage();
            } else if ($this.hasClass("table-td")) {
                var flightIndex = $this.data("index");
                var flightInfo = currentPageData[flightIndex];
                $(".table-td").removeClass('select-info');
                $this.addClass('select-info');
                viewFlight(flightInfo);
            } else if ($this.hasClass("change-btn")) {
                changeCity();
            }
        } catch (f) {
            JsErrorTips(f);
        }
    });
    $(document).on("blur", "#pageCurrent", function (e) {
        e.stopPropagation();
        setPageCurrent($(this).val() + "");
    });
    $(document).on("keyup", "#pageCurrent", function (e) {
        e.stopPropagation();
        e.stopPropagation();
        if (e.which == 13) {
            setPageCurrent($(this).val() + "");
        }
    });

    renderFrom();
    initRadio();
    initCity();
    initPag();

    hna.jsData.getFlightCityData(function (data) {
        _flightCityData = data;
        createTableContentEl();
        if (getUrlParameter()) {
            getFlightStatusList();
        }
    });

});

//监听单选按钮改变事件
function initRadio() {
    try {
        globalFrom.on('radio(searchType)', function (data) {
            var $this = $(data.elem);
            $("#query-by-city").toggle(data.value == "city");
            $("#query-by-flight").toggle(data.value == "flight");
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
                    $(this.target).val(row.city).focus();
                    $($(this.target).data("related")).val(row.code);
                }
            }
        };
        //点击输入框初始化面板
        $("#depCity").on("click", function () {
            $("#depCity").flightCity(config);
        });
        $("#arrCity").on("focus", function () {
            $("#arrCity").flightCity(config);
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

//获取url里面的参数
function getUrlParameter() {
    var flightNumber = (hna.getRequest() || {}).flightNumber || "";
    if (flightNumber && flightNumber !== "undefined") {
        $("#flight_query").siblings(".hnaui-form-radio").trigger("click");
        $("#flight_no").val(flightNumber);
        if (!(new RegExp(hna.regex.flightNumber)).test(flightNumber)) {
            _showMsg(_i18n("AS26"));
            $(".search-loading").hide();
            return false;
        }
    }
    return true;
}

//ajax请求
function getFlightStatusList() {
    var info = hna.getFormParameter($(".search-flight-status"));
    var data = {};
    if(info.type == "city"){
        data = {"date": info.date, "depCode":info.depCode, "arrCode":info.arrCode};
    }else{
        data = {"date": info.date, "flightNo":info.flightNo.toUpperCase()};
    }

    try {
        initPag();
        searchCount++;
        hna.ajax({
            url: ajaxUrl.getFlightStatusList,
            data: data,
            loading: "show",
            doneCallback: function (data) {
                dataSource = [];
                flightStatusList = [];
                if (data && data.code == "200") {
                    dataSource = data.data.data;
                    flightStatusList = hna.cloneObj(dataSource);
                } else {
                    hnaer.open({
                        title: _i18n("AS44"),
                        content: data.message
                    });
                }
            },
            failCallback: function (err) {
                dataSource = [];
                flightStatusList = [];
            },
            alwaysCallback: function () {
                //searchFlight();
                pagingFun();
                createTableContentEl();
                $(".search-loading").hide();
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

//按需搜索航班
function searchFlight(){
    //获取页面表单值
    var info = hna.getFormParameter($(".search-flight-status"));
    searchCount++;

    flightStatusList = [];

    if(info.type == "city"){
        dataSource.forEach(function(item){
            if((!info.depCode || (info.depCode && info.depCode == item.depStn)) && (!info.arrCode || (info.arrCode && info.arrCode == item.arrStn))){
                flightStatusList.push(item);
            }
        });
    }else {
        dataSource.forEach(function(item){
            if((!info.flightNo || (info.flightNo && info.flightNo.toUpperCase() == item.flightNo))){
                flightStatusList.push(item);
            }
        });
    }

    setTimeout(function(){
        pagingFun();
        createTableContentEl();
        $(".search-loading").hide();
    },400);
}

//点击城市交换功能
function changeCity() {
    //交换三字码
    try {
        var originCode = $("#depCity").val();
        var destinationCode = $("#arrCity").val();
        $("#depCity").val(destinationCode);
        $("#arrCity").val(originCode);
        //交换城市
        var originName = $("#depCode").val();
        var destinationName = $("#arrCode").val();
        $("#depCode").val(destinationName);
        $("#arrCode").val(originName);
    } catch (e) {
        JsErrorTips(e);
    }
}