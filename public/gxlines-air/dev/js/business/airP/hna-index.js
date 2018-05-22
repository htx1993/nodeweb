hna._i18nMap.addLanguages({
    "P01": {"zh_CN": "最多添加{0}个成人！", "en_US": "Flight number"}
});

var ajaxUrl = {
    getPaymentInfo: "/payment/getPaymentInfo",
    getPaymentProcessingFee: "/payment/getPaymentProcessingFee",
    getWeChatCode: "/payment/getWeChatCode",
    getWXPaymentResult:"/payment/getWXPaymentResult",
    getBankUrl: "/payment/getBankUrl",
    getTicketStatus: "/payment/getTicketStatus"
};

var _type = "";
var _status = "";
var _msg = "";
var _orderCode = "";
var _unPaidTotalAmount = "";
var _payPurpose = "";
var _faraFamilyCode = "";
//支付信息
var _paymentInfo = {};

var _tabIndex;

var paymentCountT = {
    m: 10,
    s: 0
};

var wxSetTimeOutFun = null;

$(function () {
    $(document).on("click", ".click-btn", function (e) {
        e.stopPropagation();
        try {
            var $this = $(e.target);
            if ($this.hasClass("hnaui-btn-disabled")) {
                return false;
            }
            if ($this.hasClass("order-detail")) {
                goToOrderDetail();

            } else if ($this.hasClass("hnaui-rule-note")) {
                showRuleNote();

            } else if ($this.hasClass("hnaui-btn-sure")) {
                //立即支付
                payment();

            } else if ($this.hasClass("reset-choose-btn")) {
                hnaer.closeAll();

            } else if ($this.hasClass("success-btn")) {
                goToPage("/airP/payment?type=success&orderCode=" + hna.compile(_orderCode));

            } else if ($this.hasClass("fail-btn")) {
                goToPage("/airP/payment?type=fail&orderCode=" + hna.compile(_orderCode));

            } else if ($this.hasClass("bank-item")) {
                //选择支付银行
                $(".bank-item").parent("li").removeClass("active");
                $this.parent("li").addClass("active");
                getPaymentProcessingFee($this);

            } else if ($this.hasClass("wx-close")) {
                //关闭二维码支付弹窗
                $(".webchat-pay").remove();
                clearTimeout(wxSetTimeOutFun);

            }
            return false;
        } catch (ev) {
            JsErrorTips(ev);
        }
    });

    hna.jsData.getFlightCityData(function (data) {
        _flightCityData = data;

        var request = hna.getRequest() || {};
        _type = request.type || "content";
        _status = request.status || "success";
        _msg = request.msg || "";
        _orderCode = hna.uncompile(request.orderCode || "");

        if (_type == "content") {
            initPaymentContent();
        } else if (_type == "success") {
            if(_status == "failed"){
                initPaymentFail(decodeURI(_msg));
            }else{
                initPaymentSuccess();
            }
        } else if (_type == "fail") {
            initPaymentFail();
        }
        hna.goToTop("1");
    });
});

//初始化支付选择页面
function initPaymentContent() {
    setFlightState("flight-state-payment");
    getPaymentInfo();
}
//获取支付信息
function getPaymentInfo() {
    try{
        hna.ajax({
            url: ajaxUrl.getPaymentInfo,
            data: {
                "orderCode":_orderCode
            },
            doneCallback: function (data) {
                if (data && data.code == 200 && data.data && data.data.reservationInfo && data.data.reservationInfo.reservationCode) {
                    _paymentInfo = data.data;
                    _orderCode = _paymentInfo.reservationInfo.reservationCode;
                    _unPaidTotalAmount = _paymentInfo.reservationInfo.unPaidTotalAmount;
                    _payPurpose = _paymentInfo.reservationInfo.payPurpose;
                    _faraFamilyCode = _paymentInfo.reservationInfo.faraFamilyCode;
                    setSInfo();
                    createPaymentContentEl();
                } else {
                    initPaymentFail(data.data.message);
                }
            }
        });
    }catch(e){
        JsErrorTips(e);
    }
}

//显示规定条款
function showRuleNote() {
    try{
        var html = '<div class="hanui-rule-text">';
        html += '<h3>机票购买条款</h3>';
        html += '<p>如果您选择网上支付，在所选择的银行网站页面上输入您的银行卡帐号和密码时，安全性将由银行全面提供支持和保障。使用银行卡支付的相关事宜，请参照银行相关说明。</p>';
        html += '<p>在执行支付操作之前，请首先记录下订票日期和订票编号，网上支付过程中，请不要关闭浏览器窗口，一旦出现故障可进入本站[我的订单]栏，据此查出订单记录进行重新处理或提交北部湾 便于后续的处理。</p>';
        html += '<p>如果在银行网站完成网上支付以后，不能正确返回北部湾航空的网站进行后续的操作，可登陆银行网站查询是否已支付，如果已进行支付请通知北部湾航空进行后台的处理。对于VISA国际信用卡支付，需要登录发卡行网站查询，或者与发卡行客服联系，以确认是否已经支付。</p>';
        //html += '<p>对于VISA国际信用卡支付，需要登录发卡行网站查询，或者与发卡行客服联系，以确认是否已经支付。</p></p>';
        html += '<p>如果您进行下一步支付操作，表明您已阅读并同意网上支付条款。</p>';
        html += '<a href="' + hna._server_host + '/airR/rules?type=passengerService#ticketNotes" target="_blank" class="a-link">网上购票须知</a>';
        html += '<a href="' + hna._server_host + '/airR/rules?type=passengerService#refundNotes" target="_blank" class="a-link">退票须知</a>';
        html += '<a href="' + hna._server_host + '/airR/rules?type=passengerService#machineDelayEmergencyPlan" target="_blank" class="a-link">机上延误应急预案</a>';
        html += '<a href="' + hna._server_host + '/airR/rules?type=passengerService#lithiumBattery" target="_blank" class="a-link">锂电池运输</a>';
        html += '<a href="' + hna._server_host + '/airR/rules?type=passengerService#passengerNameChangeFee" target="_blank" class="a-link">旅客名字变更收费服务</a>';
        html += '<a href="' + hna._server_host + '/airR/rules?type=passengerService#insurance" target="_blank" class="a-link">航空意外险</a>';
        html += '   </div>';

        hnaer.open({
            title: "规定条款",
            content: html || "",
            area: "700px",
            btn: [_i18n("confirm")],
            closeBtn: 0,
            yes: function () {
                hnaer.closeAll();
            }
        });
    }catch(e){
        JsErrorTips(e);
    }
}

function getPaymentHtml() {
    var $paymentContent = $("#paymentContent");
    var html = $paymentContent.html();
    $paymentContent.remove();
    return html;
}

//跳转到订单详情页面
function goToOrderDetail() {
    goToPage("/airEye/order/orderDetail?orderCode=" + hna.compile(_orderCode));
}