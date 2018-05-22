hna._i18nMap.addLanguages({
    "OR01": {"zh_CN": "请选择退票类型", "en_US": "Shopping Cart"},
    "OR02": {"zh_CN": "自愿退票", "en_US": "Shopping Cart"},
    "OR03": {"zh_CN": "非自愿退票", "en_US": "Shopping Cart"},
    "OR04": {"zh_CN": "请选择需要退票的航段！", "en_US": "Shopping Cart"},
    "OR05": {"zh_CN": "非自愿退票，请输入退票原因！", "en_US": "Shopping Cart"},
    //"OR09": {"zh_CN": "退票成功,五秒钟刷新页面!", "en_US": "Shopping Cart"},
    "OR09": {"zh_CN": "退票成功，{0}秒钟后跳转到订单性情页面！", "en_US": "Shopping Cart"},
    "OR12": {"zh_CN": "乘客信息", "en_US": "Shopping Cart"},
    "OR13": {"zh_CN": "航段信息", "en_US": "Shopping Cart"},
    "OR14": {"zh_CN": "客票信息", "en_US": "Shopping Cart"},
    "OR15": {"zh_CN": "客票状态", "en_US": "Shopping Cart"},
    "OR16": {"zh_CN": "退票政策", "en_US": "Shopping Cart"},
    "OR17": {"zh_CN": "已退票", "en_US": "Shopping Cart"},
    "OR18": {"zh_CN": "选择", "en_US": "Shopping Cart"},
    "OR19": {"zh_CN": "机票费", "en_US": "Shopping Cart"},
    "OR20": {"zh_CN": "辅营费", "en_US": "Shopping Cart"},
    "OR21": {"zh_CN": "退票费用明细", "en_US": "Shopping Cart"},
    "OR22": {"zh_CN": "旅客费用总额", "en_US": "Shopping Cart"},
    "OR23": {"zh_CN": "应扣辅营费用", "en_US": "Shopping Cart"},
    "OR24": {"zh_CN": "返回", "en_US": "Shopping Cart"},
    "OR25": {"zh_CN": "退票类型：", "en_US": "Shopping Cart"},
    "OR26": {"zh_CN": "下一步", "en_US": "Shopping Cart"},
    "OR27": {"zh_CN": "应扣机票手续费", "en_US": "Shopping Cart"},
    "OR28": {"zh_CN": "应退总额", "en_US": "Shopping Cart"},
    "OR29": {"zh_CN": "支付处理费", "en_US": "Shopping Cart"},
    "OR30": {"zh_CN": "应退还机票总额：", "en_US": "Shopping Cart"},
    "OR31": {"zh_CN": "原票面价：", "en_US": "Shopping Cart"},
    "OR32": {"zh_CN": "退票手续费：", "en_US": "Shopping Cart"},
    "OR33": {"zh_CN": "其他费用：", "en_US": "Shopping Cart"},
    "OR34": {"zh_CN": "应退还辅营产品金额：", "en_US": "Shopping Cart"},
    "OR35": {"zh_CN": "逾重行李：", "en_US": "Shopping Cart"},
    "OR36": {"zh_CN": "贵宾厅：", "en_US": "Shopping Cart"},
    "OR37": {"zh_CN": "机上餐食：", "en_US": "Shopping Cart"},
    "OR38": {"zh_CN": "机上舒适设施：", "en_US": "Shopping Cart"},
    "OR39": {"zh_CN": "选座：", "en_US": "Shopping Cart"},
    "OR40": {"zh_CN": "短信服务费：", "en_US": "Shopping Cart"},
    "OR41": {"zh_CN": "权益包：", "en_US": "Shopping Cart"},
    "OR42": {"zh_CN": "航班意外险：", "en_US": "Shopping Cart"},
    "OR43": {"zh_CN": "航班延误险：", "en_US": "Shopping Cart"},
    "OR44": {"zh_CN": "退票损失险：", "en_US": "Shopping Cart"},
    "OR45": {"zh_CN": "其他：", "en_US": "Shopping Cart"},
    "OR46": {
        "zh_CN": "提交退票申请后，您的座位将立即取消，此操作不能回退！",
        "en_US": "Shopping Cart"
    },
    "OR47": {"zh_CN": "乘客姓名", "en_US": "Shopping Cart"},
    "OR48": {"zh_CN": "航段信息", "en_US": "Shopping Cart"},
    "OR49": {"zh_CN": "提交审核", "en_US": "Shopping Cart"},
    "OR50": {"zh_CN": "订单详情", "en_US": "Shopping Cart"},
    "OR51": {"zh_CN": "航班号", "en_US": "Shopping Cart"},
    "OR52": {"zh_CN": "日期", "en_US": "Shopping Cart"},
    "OR53": {"zh_CN": "已退改", "en_US": "Shopping Cart"},
    "OR54": {"zh_CN": "已退票", "en_US": "Shopping Cart"},
    "OR55": {"zh_CN": "退票类型", "en_US": "Shopping Cart"},
    "OR56": {"zh_CN": "支付处理费：", "en_US": "Shopping Cart"}
});
var ajaxUrl = {
    getRefundDetail: "/order/getRefundDetail",
    getRefundCostInfo: "/order/getRefundCostInfo",
    refundApply: "/order/refundApply"
};

//获取url里的订单号
var _orderCode = getOrderCodeBuyUrl();
var _refundTypeList = [
    {
        "code": "NO",
        "name": _i18n("OR01")
    },
    {
        "code": "VOLUNTARY",
        "name": _i18n("OR02")
    },
    {
        "code": "INVOLUNTARY",
        "name": _i18n("OR03")
    }
];
var _currentRefund = "";

//第二个接口和第三个接口的参数一样
var _costInfo = {};

//设置一个参数 记录netbtn的状态
var _currentStep = 1;

var _guestsList = [];

var _isDomestic = "N";
//退票完成
$(function () {
    //页面点击事件
    try {
        $(document).on("click", ".click-btn", function (e) {
            e.stopPropagation();
            var $this = $(e.target);
            if ($this.hasClass("hnaui-btn-disabled")) {
                return false;
            }
            if ($this.hasClass('back-btn')) {
                if (_currentStep == "2") {
                    setNextBtnStep("1");

                } else if (_currentStep == "1" || _currentStep == "3") {
                    goToPage("/airEye/order/orderDetail?orderCode=" + hna.compile(_orderCode));

                }

            } else if ($this.hasClass('next-btn')) {
                if (_currentStep == "1") {
                    if ($("input[type='checkbox'][name='oneChoose']:checked").length < 1) {
                        _showMsg(_i18n("OR04"));
                        return false;
                    }
                    if (getRefundType() == _refundTypeList[2].code) {
                        if (!$("#remark").val()) {
                            _showMsg(_i18n("OR05"));
                            return false;
                        }
                    }
                    getRefundCostInfo();
                } else if (_currentStep == '2') {
                    _showConfirmTips({"tips": createAlert(), "width": "700px"}, function () {
                        refundApply();
                    });
                }
            }
        });
    } catch (ev) {
        JsErrorTips(ev);
    }
    try {
        setFlightState("refund-Tickets-apply");
        hna.jsData.getFlightCityData(function (data) {
            _flightCityData = data;
            getRefundDetail();
        });
        hna.goToTop("1");
    } catch (e) {
        JsErrorTips(e);
    }


});