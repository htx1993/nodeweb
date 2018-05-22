//创建支付选择页面
function createPaymentContentEl() {
    try {
        var html = '<form class="hnaui-form">';
        html += createOrderInfoPanel();
        html += createPassengerInfoPanel();
        html += createBankInfoPanel();
        html += createSubmitPanel();
        html += '</form>';

        $(".container_full").replaceWith(getPaymentHtml());
        $(".search-result").html(html);
        HNACart.createCartDetail(_paymentInfo.reservationInfo);

        paymentCountDown();
        renderFrom();
    } catch (e) {
        JsErrorTips(e);
    }
}
//创建订单编号，倒计时面板
function createOrderInfoPanel() {
    paymentCountT.m = Math.floor((_paymentInfo.reservationInfo.payRestTime) / 1000 / 60);
    paymentCountT.s = Math.floor((_paymentInfo.reservationInfo.payRestTime) / 1000 - (paymentCountT.m * 60));
    paymentCountT.m = paymentCountT.m < 10 ? "0" + paymentCountT.m : paymentCountT.m;
    paymentCountT.s = paymentCountT.s < 10 ? "0" + paymentCountT.s : paymentCountT.s;
    var html = '';
    try {
        html += '<div class="hnaui-panel hnaui-shadow">';
        html += '   <div class="hnaui-panel-title"><i class="hnaui-icon">&#xe90c;</i>订单号</div>';
        html += '   <div class="hnaui-panel-content hnaui-order-info">';
        html += '       <p>订单已生成，订单号为： <strong>' + (_orderCode || "") + '</strong>，请仔细核对右侧信息并在 <span class="hnaui-payment-timer"><em>' + (paymentCountT.m || "--") + '</em>分<em>'+ (paymentCountT.s || "--") +'</em>秒</span>内完成支付。</p>';
        html += '       <p>系统会自动取消超过时限未支付的订单。请您及时付款！你还可以前往 <a href="javascript:;" class="a-link order-detail click-btn">我的订单</a> 查看订单状态。</p>';
        html += '   </div>';
        html += '</div>';
    } catch (e) {
        html = '';
        JsErrorTips(e);
    }
    return html;
}
//创建乘机人航班信息面板
function createPassengerInfoPanel() {
    var html = '';
    var thTitleList = ["乘机人姓名", "证件信息", "联系电话"];
    try {
        html += '<div class="hnaui-panel hnaui-shadow">';
        html += '   <div class="hnaui-panel-title"> <i class="hnaui-icon">&#xe916;</i>旅客信息 </div>';
        html += '   <div class="hnaui-panel-content hnaui-passenger-info">';
        html += '       <table class="hnaui-table hnaui-table-mobile">';
        html += '           <thead>';
        html += '           <tr>';
        (thTitleList || []).forEach(function (item) {
            html += '               <th>' + (item || "") + '</th>';
        });
        html += '           </tr>';
        html += '           </thead>';
        html += '           <tbody>';
        (_paymentInfo.reservationInfo.passengers || []).forEach(function (item) {
            html += '           <tr>';
            html += '<td>'+item.contactName+'（'+item.ageType+'）</td>';
            html += '<td>'+item.cardType+'（'+item.cardNo+'）</td>';
            html += '<td>'+item.mobilePhone+'</td>';
            html += '           </tr>';
        });
        html += '           </tbody>';
        html += '       </table>';
        html += '   </div>';
        html += '</div>';
    } catch (e) {
        html = '';
        JsErrorTips(e);
    }
    return html;
}
function createTd(o) {
    if (!o) {
        o = {};
    }
    var html = '';
    try {
        html += '<td><div class="td-text">' + (o.text || "") + '</div><div class="td-title">' + (o.title || "") + '</div></td>';
    } catch (e) {
        html = '';
        JsErrorTips(e);
    }
    return html;
}
//创建支付机构信息面板
function createBankInfoPanel() {
    if(_unPaidTotalAmount <= 0){
        return "";
    }
    var html = '';
    try {
        html += '<div class="hnaui-panel hnaui-shadow">';
        html += '   <div class="hnaui-panel-title"> <i class="hnaui-icon">&#xe917;</i> <span>付款方式</span> </div>';
        html += '   <div class="hnaui-panel-content hnaui-bank-info">';
        html += '       <p class="tit">推荐支付</p>';
        html += '       <ul class="rec-pay">';
        (_paymentInfo.bankInfoOthers || []).forEach(function (item,index) {
            html += createImgEl(item);
        });
        html += '       </ul>';
        html += '       <p class="tit">网银支付</p>';
        html += '       <ul class="rec-pay">';
        (_paymentInfo.bankInfos || []).forEach(function (item) {
            html += createImgEl(item);
        });
        html += '       </ul>';
        html += '   </div>';
        html += '</div>';
    } catch (e) {
        html = '';
        JsErrorTips(e);
    }
    return html;
}
function createImgEl(item){
    var html = '';
    try{
        html += '<li><img src="'+hna._img_host+'/images/payment/'+getBankPicUrl(item.bankCode)+'.jpg" class="bank-item click-btn" data-id="'+item.pid+'" data-dom="'+item.intDom+'" data-code="'+item.bankCode+'"><i class="hnaui-icon">&#xe618;</i></li>';
    }catch(e){
        JsErrorTips(e);
        html = '';
    }
    return html;
}
function getBankPicUrl(bankCode) {
    return ((bankCode || "") + "-bank").toLowerCase();

}
//创建提交信息面板
function createSubmitPanel() {
    var html = '';
    try {
        html += '<div class="hnaui-panel hnaui-shadow">';
        html += '   <div class="hnaui-panel-title"> <i class="hnaui-icon">&#xe918;</i>确认支付 </div>';
        html += '   <div class="hnaui-panel-content hnaui-submit-info">';
        html += '       <div class="hnaui-rule-content">';
        html += '           <div class="hnaui-item-box">';
        html += '               <p>如果您进行下一步支付操作，表明您已阅读并同意网上支付条款及以下条款。</p>';
        // html += '               <div class="hnaui-item-rule"><a href="javascript:;" class="a-link hnaui-rule-note click-btn">规定条款</a></div>';
        html += '<p><a href="' + hna._server_host + '/airR/rules?type=passengerService#domestticTransport" target="_blank" class="a-link">运输总条件</a></p>';
        html += '<p><a href="' + hna._server_host + '/airR/rules?type=passengerService#specialPassenger" target="_blank" class="a-link">特殊旅客须知</a></p>';
        html += '<p><a href="' + hna._server_host + '/airR/rules?type=passengerService#abnormalFlightServicer" target="_blank" class="a-link">不正常航班旅客服务指南</a></p>';
        html += '<p><a href="' + hna._server_host + '/airR/rules?type=passengerService#dangerousGoods" target="_blank" class="a-link">危险品运输管理规定</a></p>';
        html += '<p><a href="' + hna._server_host + '/airR/rules?type=passengerService#baggageLimit" target="_blank" class="a-link">行李运输限制</a></p>';
        // html += '<p><a href="' + hna._server_host + '/airR/rules?type=passengerService#lithiumBattery" target="_blank" class="a-link">锂电池航空运输管理规定</a></p>';
        html += '<p><a href="javascript:;" class="a-link hnaui-rule-note click-btn">其他规定条款</a></p>';
        html += '           </div>';
        html += '           <div class="hnaui-item-footer">';
        html += '               <input type="checkbox" name="agree" title="我已阅读并同意以上条款" hna-skin="primary" hna-filter="filter_2">';
        html += '           </div>';
        html += '       </div>';
        html += '   </div>';
        html += '       <div class="hnaui-payment-tips">';
        html += '           <p><span class="hna-tit">温馨提示：</span>完成在线支付需要60秒左右，在这段时间内，请不要点击浏览器的刷新或者后退键；返回支付结果前请勿关闭网页。</p>';
        html += '       </div>';
        html += '       <div class="hnaui-push-center">';
        html += '           <a class="hnaui-btn hnaui-btn-theme hnaui-btn-model hnaui-btn-sure click-btn">确认支付<i class="hnaui-icon"></i></a>';
        html += '       </div>';

        html += '</div>';
    } catch (e) {
        html = '';
        JsErrorTips(e);
    }
    return html;
}