hna._i18nMap.addLanguages({
    "P01": {"zh_CN": "航班号", "en_US": "Flight number"},
    "CE01": {"zh_CN": "请输入", "en_US": "Flight number"},
    "P02": {"zh_CN": "机上餐食", "en_US": "Shopping Cart"},
    "P03": {"zh_CN": "餐食", "en_US": "Shopping Cart"},
    "P04": {"zh_CN": "预购行李", "en_US": "Shopping Cart"},
    "P05": {"zh_CN": "行李", "en_US": "Shopping Cart"},
    "P061": {"zh_CN": "航班意外险", "en_US": "Shopping Cart"},
    "P062": {"zh_CN": "航班延误险", "en_US": "Shopping Cart"},
    "P063": {"zh_CN": "退票损失险", "en_US": "Shopping Cart"},
    "P07": {"zh_CN": "你有需要去支付的辅营，点击\"确认\"按钮跳转到订单详情页面继续支付！", "en_US": "Shopping Cart"},
    "P08": {"zh_CN": "暂时没有需要添加的辅营项目，点击\"确认\"按钮跳转到订单详情页面！", "en_US": "Shopping Cart"},
    "P09": {"zh_CN": "重新查询", "en_US": "Shopping Cart"},
    "P10": {"zh_CN": "确认支付", "en_US": "Shopping Cart"},
    "P11": {"zh_CN": "选择座位", "en_US": "Shopping Cart"},
    "P12": {"zh_CN": "该趟航班没有需要添加的辅营", "en_US": "Shopping Cart"},
    "P13": {"zh_CN": "总价：", "en_US": "Shopping Cart"},
    "P14": {"zh_CN": "请选择", "en_US": "Shopping Cart"},
    "P15": {"zh_CN": "最高可获赔{0}元", "en_US": "Shopping Cart"},
    "P16": {"zh_CN": "北京市", "en_US": "Shopping Cart"},
    "P17": {"zh_CN": "朝阳区", "en_US": "Shopping Cart"},
    "P18": {"zh_CN": "北京", "en_US": "Shopping Cart"},
    "P19": {"zh_CN": "您没有添加辅营项目，点击\"确定\"按钮跳转到订单详情页面，点击\"取消\"将继续留在该页面。", "en_US": "Shopping Cart"}
});

var ajaxUrl = {
    getProductInfo: "/product/getProductInfo",
    addProductInfo: "/product/addProductInfo",
    getMMBProductInfo: "/product/getMMBProductInfo",
    addMMBProductInfo: "/product/addMMBProductInfo"
};
var _classList = ["hnaui-form", "hnaui-form-pane", "hnaui-form-item", "hnaui-form-label", "hnaui-input-block", "p-panel", "hanui-panel-content", "hnaui-clear", "hnaui-icon", "hnaui-btn", "hnaui-verifybtn"];

hna.isBlur = false;

var _mailList = [];

//辅营产品
var _marketList = [];
//航班乘机人数组
var _flightPassengerList = [];
//航班信息
var _flightInfoList = ((hna._processData.getShoppingCartInfo() || {}).cartInfo || {}).bounds || [];
//乘机人信息
var _passengerInfoList = hna._processData.getPassengerInfo() || [];

var _orderCode = "";
var _flightSegmentStr = "";

var _shoppingCartId = "";

//订单号
var _orderCode = "";
//是否是MMB添加辅营
var isMMB = false;

//是否有行程单
var _hasAddress = false;

var browserRule = /^.*(Safari)+.*$/;
if (browserRule.test(navigator.userAgent)) {
    window.onpageshow = function (event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
}

$(function () {
    $(document).on("click", ".click-btn", function (e) {
        e.stopPropagation();
        try {
            var $this = $(e.target);
            if ($this.hasClass("hnaui-btn-disabled")) {
                return false;
            }

            if ($this.hasClass("re-search-btn")) {
                //重新查询
                goToPage("/airEye/flight/select");

            } else if ($this.hasClass("create-order-btn")) {
                //弹窗信息确认
                createOrderGeneration();

            } else if ($this.hasClass("payment-btn")) {
                //去支付
                submitFormActive();

            } else if ($this.hasClass("passenger-btn")) {
                //返回乘机人信息页面
                goToPage("/airEye/passenger");

            } else if ($this.hasClass("order-detail-btn")) {
                //返回订单详情页面
                goToOrderDetail();

            } else if ($this.hasClass("re-choose-btn")) {
                //重新选择辅营
                $(".hnaui-order-generation").remove();

            }

        } catch (ev) {
            JsErrorTips(ev);
        }
    });

    try {
        hna.jsData.getFlightCityData(function (data) {
            _flightCityData = data;

            var request = hna.getRequest() || {};
            _orderCode = hna.uncompile(request.orderCode || "");
            _flightSegmentStr = hna.uncompile(request.flight || "");
            if (_orderCode) {
                isMMB = true;
                setSInfo();
            }

            if (!hasRepeatOrderCoder(_orderCode)) {
                return false;
            }
            if (isMMB) {
                createMMBInitEl();
                HNACart.loading();
                HNACart.createCartDetail({
                    "totalPrice": 0,
                    "currency": hna._currency.code,
                    "flag":"mmb_market"
                });
            } else {
                _shoppingCartId = hna._processData.getShoppingCartId();
                setFlightState("flight-state-product");
                _getShoppingCartInfo();
                createMainProcessInitEl();
            }
            hna.filterForm();
        });
        hna.goToTop("1");

    } catch (e) {
        JsErrorTips(e);
    }
});

//过滤辅营数据
function filterMarketData() {
    (_marketList || []).forEach(function (o, i) {
        var obj = {};
        obj.code = o.code;
        obj.flightSegments = [];
        (o.flightSegments || []).forEach(function (oo, ii) {
            if (ii == 0) {
                obj.flightSegments.push(oo);
            } else {
                var bl1 = false;
                for (var a = 0, a1 = obj.flightSegments.length; a < a1; a++) {
                    var thisItem = obj.flightSegments[a];
                    if (thisItem.id == oo.id) {
                        thisItem.traveler.push.apply(thisItem.traveler, oo.traveler);
                        bl1 = true;
                        break;
                    }
                }
                if (!bl1) {
                    obj.flightSegments.push(oo);
                }
            }
        });
        _flightPassengerList.push(obj);
    });
}
function sendAjax(url, info, callback) {
    hna.ajax({
        url: url,
        data: info,
        doneCallback: function (data) {
            if (data && data.code == "200") {
                if (hna.isFunction(callback)) {
                    callback(data.data);
                }
            }
        }
    });
}