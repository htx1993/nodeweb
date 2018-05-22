//选择支付银行，支付1
function payment() {
    var $bankItemLi = $(".rec-pay li.active");
    if (_unPaidTotalAmount > 0) {
        if ($bankItemLi.length < 1) {
            _showMsg("请您选择支付银行！");
            return false;
        }
    }

    if ($("input[name='agree']:checked").length < 1) {
        _showMsg("请您确认已经阅读规定条款！");
        return false;
    }

    var $bank = $bankItemLi.find("img");
    var pid = $bank.data("id");
    var code = $bank.data("code");
    var intDom = $bank.data("dom");

    getBankUrl(pid, code, intDom);
}

//获取支付机构支付页面的url1
function getBankUrl(pid, code, intDom) {
    var tempwindow = null;
    if (code != "WXPAY") {
        _showValidationLoading("正在提交数据，请稍候...");
        if(_unPaidTotalAmount > 0){
            tempwindow = window.open("/loading", "_blank");
        }
    } else {
        showWXPay();
    }

    hna.ajax({
        url: ajaxUrl.getBankUrl,
        data: {
            "pid": pid,
            "reservationCode": _orderCode,
            "unPaidTotalAmount": _unPaidTotalAmount,
            "payPurpose": _payPurpose,
            "faraFamilyCode": _faraFamilyCode,
            "intDom": intDom
        },
        doneCallback: function (data) {
            if (data && data.code == 200) {
                if (data.data.noPay) {
                    goToPage("/airEye/order/orderDetail?orderCode=" + hna.compile(_orderCode));
                } else if (data.data.url) {
                    if (code == "WXPAY") {
                        $(".webchatimg").empty();
                        new QRCode("wx_img", {
                            text: data.data.url,
                            width: 128,
                            height: 128,
                            colorDark: "#000000",
                            colorLight: "#ffffff",
                            correctLevel: QRCode.CorrectLevel.H
                        });
                        getWXPaymentResult(data.data.wxStateId);
                    } else {
                        showSureContent();
                        tempwindow.location = data.data.url;
                    }
                }
            } else {
                _showMsg(data.data.messages);
            }
        }
    });
}

//轮询微信支付是否成功
function getWXPaymentResult(id) {
    wxSetTimeOutFun = setTimeout(function () {
        hna.ajax({
            url: ajaxUrl.getWXPaymentResult,
            data: {
                "wxStateId": id
            },
            doneCallback: function (data) {
                if (data && data.code == 200 && data.data.status == "success") {
                    goToPage("/airP/payment?type=success&orderCode=" + hna.compile(_orderCode));
                } else {
                    getWXPaymentResult(id);
                }
            },
            failCallback: function () {
                getWXPaymentResult(id);
            }
        });
    }, 3000);
}


//支付倒计时
function paymentCountDown() {
    var xm = paymentCountT.m;
    var xs = paymentCountT.s;
    var d = new Date("1111/1/1,0:" + xm + ":" + xs);
    var interval = setInterval(function () {
        var m = d.getMinutes();
        var s = d.getSeconds();
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        $(".hnaui-payment-timer").html('<em>' + m + '</em>分<em>' + s + '</em>秒');
        $(".wx-payment-timer").html(m + "分" + s + '秒');
        if (m == 0 && s == 0) {
            clearInterval(interval);
            goToPage("/");
        }
        d.setSeconds(s - 1);
    }, 1000);
}

//显示支付结果提示
function showSureContent() {
    try {
        var html = '<div class="hnaui-sure-info">';
        html += '       <div class="hnaui-sure-title">请在新打开网页页面完成支付</div>';
        html += '        <div class="hnaui-sure-content">';
        html += '        <p>付款完成前请不要关闭此窗口</p>';
        html += '            <div class="hnaui-list">';
        html += '                <span><i class="hnaui-icon hnaui-green">&#xe605;</i>支付成功</span>';
        html += '                <a href="javascript:;" class="hnaui-finish-btn hnaui-btn click-btn order-detail">已完成付款</a>';
        html += '            </div>';
        html += '            <div class="hnaui-list">';
        html += '                <span><i class="hnaui-icon hnaui-red">&#x2716;</i>支付失败</span>';
        html += '                <a href="' + hna._server_host + '/airR/rules?type=singlePage&singleId=paymentProblem" target="_blank" class="hnaui-payment-fail hnaui-btn question-btn">付款遇到问题</a>';
        html += '                <a href="javascript:;" class="hnaui-payment-fail hnaui-btn click-btn reset-choose-btn">重新支付</a>';
        html += '            </div>';
        html += '        </div>';
        html += '    </div>';

        hnaer.closeAll();
        hnaer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            area: ['400px', 'auto'],
            content: html
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

//显示微信二维码
function showWXPay() {
    var html = '';
    try {
        html += '<div class="webchat-pay">';
        html += '   <div class="webchat-pay-con">';
        html += '       <p>';
        html += '           <i class="hnaui-icon wx-close click-btn">&#x2716;</i>';
        html += '       </p>';
        html += '       <dl class="hnaui-clear">';
        html += '           <dt class="hnaui-left">';
        html += '               <p>请使用微信扫一扫，扫描二维码支付</p>';
        html += '               <div class="webchatimg" id="wx_img">';
        //html += '                   <img src="'+hna._img_host+'/images/portal/weChat.jpg">';
        html += '                   <div class="loading-content">';
        html += '                       <i class="hnaui-icon hnaui-anim hnaui-anim-rotate hnaui-anim-loop loading-icon">&#xe63e;</i>';
        html += '                   </div>';
        html += '               </div>';
        html += '               <p>二维码有效时长为<span class="wx-payment-timer"></span>分钟，请尽快支付！</p>';
        html += '           </dt>';
        html += '           <dd class="hnaui-right"></dd>';
        html += '       </dl>';
        html += '   </div>';
        html += '   <div class="hnaui-fast-mask"></div>';
        html += '</div>';

        $(".webchat-pay").remove();
        $("body").append(html);
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}


//获取支付机构的支付处理费1
function getPaymentProcessingFee(thisP) {
    return false;
    var pid = thisP.data("id");
    var intDom = thisP.data("dom");

    _showValidationLoading("正在获取支付处理费，请稍候...");
    hna.ajax({
        url: ajaxUrl.getPaymentProcessingFee,
        data: {
            "bankId": pid,
            "faraFamilyCode": _faraFamilyCode,
            "intDom": intDom
        },
        doneCallback: function (data) {
            if (data && data.code == 200 && data.data.status) {
                HNACart.createPaymentProcessingFee(data.data.merchantFeeRate);
            } else {
                _showMsg("获取失败!");
            }
        },
        failCallback: function (data) {
            _showMsg("获取失败!");
        },
        alwaysCallback: function () {
            hnaer.closeAll();
        }
    });
}

function setSInfo() {
    var arr = (_paymentInfo && _paymentInfo.reservationInfo && _paymentInfo.reservationInfo.itinerarySegments) || [];
    if (arr.length == 1) {
        var subArr = arr[0] || {};
        _sInfo.tripType = "OW";
        _sInfo.outboundOption.originLocationCode = subArr.startAirportCode || "";
        _sInfo.outboundOption.destinationLocationCode = subArr.endAirportCode || "";
    } else if (arr.length == 2) {
        var subArr0 = arr[0] || {};
        var subArr1 = arr[1] || {};
        if (subArr0.startAirportCode == subArr1.endAirportCode) {
            _sInfo.tripType = "RT";
            _sInfo.outboundOption.originLocationCode = subArr0.startAirportCode || "";
            _sInfo.outboundOption.destinationLocationCode = subArr0.endAirportCode || "";
        } else {
            _sInfo.tripType = "MC";
            setSInfoMultiCityOptions();
        }
    } else {
        _sInfo.tripType = "MC";
        setSInfoMultiCityOptions();
    }

    _sInfo = new SearchFlightInfo(hna.cloneObj(_sInfo));
}

function setSInfoMultiCityOptions() {
    var arr = (_paymentInfo && _paymentInfo.reservationInfo && _paymentInfo.reservationInfo.itinerarySegments) || [];
    (arr || []).forEach(function (item) {
        _sInfo.multiCityOptions.push({
            originLocationCode: item.startAirportCode || "",
            destinationLocationCode: item.endAirportCode || ""
        });
    });
}