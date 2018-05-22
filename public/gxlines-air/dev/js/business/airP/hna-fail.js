//===============================================paymentFail================================================//
//创建支付错误页面
function initPaymentFail(tips) {
    try {
        var html = '';
        html += '<div class="hnaui-payment-result payment-fail">';
        html += '   <div class="hnaui-payment-tit">';
        html += '       <h2><i class="hnaui-icon">&#x2716;</i><span class="hnaui-payment-status">' + (tips || "系统错误") + '</span></h2>';
        html += '   </div>';
        html += '   <div class="hnaui-payment-text">';
        html += '       <p>如果想继续支付,请点击<a href="javascript:;" class="a-link order-detail click-btn">订单详情页</a></p>';
        html += '   </div>';
        html += '</div>';

        $(".container_full").html(html);
        getPaymentHtml();
    } catch (e) {
        JsErrorTips(e);
    }
}