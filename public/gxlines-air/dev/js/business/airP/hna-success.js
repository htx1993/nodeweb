//===============================================paymentSuccess================================================//
var ticketNowTime = 0;
//初始化支付成功页面
function initPaymentSuccess() {
    setFlightState("flight-state-success");
    createPaymentSuccessEl();
    ticketNowTime = hna._date.getDateInfo().millisecond;
    getTicketStatus();

    //清空本地的新订单号
    hna._processData.saveNewOrderCoder();
}
//创建支付成功页面
function createPaymentSuccessEl() {
    try {
        var html = '';
        html += '<div class="hnaui-payment-result">';
        html +='<div class="content-success-text">';
        html += '   <div class="hnaui-payment-tit">';
        html += '       <h2><i class="hnaui-icon">&#xe618;</i><span class="hnaui-payment-status">支付成功</span></h2>';
        html += '   </div>';
        html += '   <div class="hnaui-payment-text">';
        html += '       <p class="hnaui-payment-info">感谢您使用北部湾航空官网订票</p>';
        html += '   </div>';
        html += '   <div class="hnaui-ticket-loading">';
        html += '       <div class="search-loading">';
        html += '           <div class="search-loading-content">';
        html += '               <i class="hnaui-icon hnaui-anim hnaui-anim-rotate hnaui-anim-loop loading-icon">&#xe63e;</i>努力出票中，请稍后...';
        html += '           </div>';
        html += '       </div>';
        html += '   </div>';
        html += '</div>';
        html +='</div>';

        $(".container_full").html(html);
        getPaymentHtml();
    } catch (e) {
        JsErrorTips(e);
    }
}

var ticketCountDownTime = 5;
//支付成功之后，获取机票状态,间隔3秒轮询一次，持续一分钟
function getTicketStatus() {
    if(hna._date.getDateInfo().millisecond - ticketNowTime > 60 * 1000){
        goToOrderDetail();
        return false;
    }
    setTimeout(function () {
        hna.ajax({
            url: ajaxUrl.getTicketStatus,
            data: {
                "orderCode": _orderCode
            },
            loading:"show",
            doneCallback: function (data) {
                if (data && data.code == 200 && data.data.status == "success") {
                    $(".hnaui-payment-status").html("出票成功");
                    $(".hnaui-payment-info").html('<span class = "count-down-text">' + ticketCountDownTime + '</span>秒后，页面跳转到<a href="javascript:;" class="a-link order-detail click-btn">订单详情页</a>');
                    $(".hnaui-ticket-loading").hide();
                    ticketCountDown();
                } else {
                    getTicketStatus();
                }
            },
            failCallback: function () {
                getTicketStatus();
            }
        });
    }, 3000);
}

//跳转到订单详情页面的倒计时
function ticketCountDown() {
    var interval = setInterval(function () {
        ticketCountDownTime--;
        if (ticketCountDownTime < 0) {
            clearInterval(interval);
            goToOrderDetail();
        } else {
            $(".count-down-text").html(ticketCountDownTime);
        }
    }, 1000);
}

