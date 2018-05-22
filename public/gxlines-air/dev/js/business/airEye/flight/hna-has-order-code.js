//刷新或者刚进入此页面的时候，判断是否有ordercode
function hasRepeatOrderCoder(code) {
    var newOrderInfo = hna._processData.getNewOrderCoder() || {};
    var orderCode = newOrderInfo.code;
    var orderHtml = newOrderInfo.html;
    if((code && orderCode == code && orderHtml) || (!code && orderHtml)){
        $(".hnaui-order-generation").remove();

        $("body").append(orderHtml);

        var $hnauiOrderGeneration = $(".hnaui-order-generation").show();
        $hnauiOrderGeneration.find(".btn-tips").show();
        var thisOrderCoder = $hnauiOrderGeneration.find(".order-code>span").text();

        $(".cancel-order-btn").off().on("click", function () {
            $hnauiOrderGeneration.hide();
            hna.loading();
            hna.ajax({
                url: "/order/cancelOrder",
                data: {"orderCode": thisOrderCoder},
                doneCallback: function (data) {
                    if (data && data.code == "200") {
                        goToPage("/airEye/flight/search");
                    } else {
                        _showMsg(data.message);
                    }
                }
            });
        });
        $(".continue-payment-btn").off().on("click", function () {
            goToPage("/airEye/order/orderDetail?orderCode=" + hna.compile(thisOrderCoder));
        });
        return false;
    }
    return true;
}

//刷新或者刚进入此页面的时候，判断是否生成订单失败
function hasSuccessOrder() {
    var tips = hna._processData.getJudgeOrderKey();
    if(tips) {//生成订单失败
        hnaer.closeAll();
        hnaer.open({
            title: _i18n("prompt"),
            content: tips || "",
            area: "500px",
            btn: [_i18n("confirm")],
            closeBtn: 0,
            yes: function () {
                goToPage("/airEye/flight/select");
            }
        });
        return false;
    }
    return true;
}