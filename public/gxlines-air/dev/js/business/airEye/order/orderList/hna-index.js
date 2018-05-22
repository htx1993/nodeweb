hna._i18nMap.addLanguages({
    "C01": {"zh_CN": "预订内容", "en_US": "Shopping Cart"},
    "OL01": {"zh_CN": "订单列表", "en_US": "Shopping Cart"},
    "OL02": {"zh_CN": "订单查询", "en_US": "Shopping Cart"},
    "OT07": {"zh_CN": "航段", "en_US": "Shopping Cart"},
    "OT09": {"zh_CN": "到达日期", "en_US": "Shopping Cart"},
    "OT10": {"zh_CN": "订票时间", "en_US": "Shopping Cart"},
    "OT11": {"zh_CN": "订单状态", "en_US": "Shopping Cart"},
    "OD01": {"zh_CN": "订单开始日期", "en_US": "Shopping Cart"},
    "OD02": {"zh_CN": "订单结束日期", "en_US": "Shopping Cart"},
    "OD03": {"zh_CN": "名", "en_US": "Shopping Cart"},
    "OD04": {"zh_CN": "姓", "en_US": "Shopping Cart"},
    "OI01": {"zh_CN": "全选", "en_US": "Shopping Cart"}
});

var ajaxUrl = {
    getOrderList: "/order/getOrderList"
};

var orderFrom = {};
var _currentPage = {};
var fromData = hna._store.getStore('orderFrom')||{};
var _orderCurrentIndex = fromData.orderCurrentIndex|| 1;
var from = fromData.from||{};
hna.isBlur = false;

$(function () {
    try {
        _createUserMenuEl("hasLogin");
        selectOrderList();
        createOrderSearchBoxEl();
        createOrderListPanelEl();

        hna.jsData.getFlightCityData(function (data) {
            _flightCityData = data;

            initPaging();
        });
        hna.goToTop("1");
    } catch (e) {
        JsErrorTips(e);
        return false;
    }
});

function initPaging(){
    var config = {
        "searchForm": 'searchOrder',//搜索的表单
        "searchBtn": "search-btn", //搜索的按钮
        "searchResult": "order-list-panel", //展示的位置
        "url": "/order/getOrderList",//ajax地址
        "pageSize": 10,//   默认每页显示多少
        "pageCurrent":_orderCurrentIndex,//默认页码
        "searchInit": true,
        "columns": [
            {
                "fieldTitle": _i18n("OT05"),
                "dom": "seq"
            },
            {
                "fieldName": "code",
                "fieldTitle": _i18n("OT04"),
                "renderFun": function (val, row) {
                    return '<a class="a-link" href="javascript:;" onClick="openOrderDetail(\'' + hna.compile(row.code+"") +'\');return false;">' + val + '</a>';
                }
            },
            {
                "fieldName": "firstFlightFlightNumber",
                "fieldTitle": _i18n("OT06"),
                "renderFun": function (val, row) {
                    return filterFlightSegments(row, "flightNumber");
                }
            },
            {
                "fieldName": "description",
                "fieldTitle": _i18n("OT07"),
                "renderFun": function (val, row) {
                    return filterFlightSegments(row, "city");
                }
            },
            {
                "fieldName": "description",
                "fieldTitle": _i18n("OT08"),
                "renderFun": function (val, row) {
                    return filterFlightSegments(row, "takeOffTime");
                }
            },
            {
                "fieldName": "creationDate",
                "fieldTitle": _i18n("OT10"),
                "renderFun": function (val) {
                    return hna._date.getDateInfo(val).date;
                }
            },
            {
                "fieldName": "status",
                "fieldTitle": _i18n("OT11"),
                "renderFun": function (val) {
                    return _filterOrderState(val);
                }
            }
        ]
    };
    _currentPage = HNAPag.initPaging(config);
}

//过滤航班信息
function filterFlightSegments(row, flag) {
    var html = '';
    try {
        var description = row.description;
        if (flag == "flightNumber") {
            html += row.firstFlightAirlineCode + row.firstFlightFlightNumber;
        } else if (flag == "city") {
            var flightCity = (description || "").substring(0,description.indexOf("["));
            var flightCityArr = (flightCity || "").split(",");
            (flightCityArr || []).forEach(function(item,index){
                var subArr = (item || "").replace(/\s/g,"").split("-");
                if(index>0){
                    html += '<br>';
                }
                html += "<i class='hnaui-icon'>&#xe90f;</i>" + getCityNameByCode(subArr[0]) + "(" + subArr[0] + ")&emsp;-&emsp;" + "<i class='hnaui-icon'>&#xe910;</i>" + getCityNameByCode(subArr[1]) + "(" + subArr[1] + ")";
            });
        } else if (flag == "takeOffTime") {
            var flightT = (description || "").substring(description.indexOf("[") + 1,description.indexOf("]"));
            var flightTArr = (flightT || "").split("-");
            html += "<i class='hnaui-icon'>&#xe60e;</i>" + hna._date.getDateInfo(flightTArr[0]).date;
        }

    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}


//跳转到订单详情页面
function openOrderDetail(val) {
    try {
        orderFrom.orderCurrentIndex = _orderCurrentIndex;
        orderFrom.from = hna.getFormParameter($("#searchOrder"));

        _orderCurrentIndex = _currentPage.pageCurrent;
        hna._store.setStore('orderFrom',orderFrom,1000*60*20);
        goToPage("/airEye/order/orderDetail?orderCode=" + val);
    } catch (e) {
        JsErrorTips(e);
    }

}

//tab-title默认选择我的订单
function selectOrderList() {
    $(".hnaui-tab-title li").each(function(index , item) {
        $(item).removeClass("hnaui-this");
        if(index === 4){
            $(item).addClass("hnaui-this");
        }
    });
}
