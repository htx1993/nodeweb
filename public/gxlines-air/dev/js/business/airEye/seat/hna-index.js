hna._i18nMap.addLanguages({
    "P01": {"zh_CN": "航班号", "en_US": "Flight number"}
});

var ajaxUrl = {
    getFlightInfo: "/seat/getFlightInfo",
    getSeatMapInfo: "/seat/getSeatMapInfo",
    chooseSeat: "/seat/chooseSeat",
    getMMBFlightInfo: "/seat/getMMBFlightInfo",
    getMMBSeatMapInfo: "/seat/getMMBSeatMapInfo",
    chooseMMBSeat: "/seat/chooseMMBSeat"
};


var classList = ["hnaui-btn-disabled", "hnaui-icon", "td-text", "td-title", "search-loading", "click-btn"];

//航班信息
var _fInfo = null;

//选择座位之后的信息
var _hasChooseData = [];

var _shoppingCartId = "";

//获取url里的订单号
var _orderCode = hna.uncompile((hna.getRequest() || {}).orderCode || "");

//是否是MMB选择座位
var isMMB = false;

$(function () {
    if (_orderCode) {
        isMMB = true;
    }

    try {
        $(document).on("click", ".click-btn", function (e) {
            e.stopPropagation();
            try {
                var $this = $(e.target);
                if ($this.hasClass("hnaui-btn-disabled")) {
                    return false;
                }

                if ($this.hasClass("seat-mmb-btn")) {
                    //选择了座位
                    submitSeatInfo();

                } else if ($this.hasClass("cancel-submit-seat-btn")) {
                    //不选择座位，直接去支付
                    goToPage("/airP/payment?type=content&orderCode=" + hna.compile(_orderCode));

                } else if ($this.hasClass("order-detail-btn")) {
                    //不选择座位，回到订单详情页面.
                    goToPage("/airEye/order/orderDetail?orderCode=" + hna.compile(_orderCode));

                } else if ($this.hasClass("product-btn")) {
                    //暂不选座，去选择增值服务
                    goToPage("/airEye/product");goToPage("/airEye/product");

                } else if ($this.hasClass("seat-product-btn")) {
                    //座位选好了，去选择增值服务
                    submitSeatInfo();

                }

            } catch (ev) {
                JsErrorTips(ev);
            }
        });



        hna.jsData.getFlightCityData(function (data) {
            _flightCityData = data;

            if (!hasRepeatOrderCoder(_orderCode)) {
                return false;
            }

            if(isMMB){
                getMMBFlightInfo();
            }else{
                setFlightState("flight-state-product");
                _shoppingCartId = hna._processData.getShoppingCartId();
                getFlightInfo();
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
});