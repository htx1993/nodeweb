//监听下拉框改变事件
function initSelect() {
    try {
        //监听辅营改变事件
        globalFrom.on('select(market)', function (data) {
            var $this = $(data.elem);
            var defaultTitle = "不需要购买";
            if(data.value == "-1"){
                defaultTitle = $this.find("option").first().data("default") || "请选择";
            }
            $this.siblings(".hnaui-form-select").find("dd").first().html(defaultTitle);

            addMarketInfoToCart();
        });
    } catch (e) {
        JsErrorTips(e);
    }
}
//监听复选框改变事件
function initCheckbox() {
    try {
        globalFrom.on('checkbox(market)', function (data) {
            addMarketInfoToCart();
        });
    } catch (e) {
        JsErrorTips(e);
    }
}
//判断是否阅读了协议
function judgeIsRead(){
    if ($("input[name='agreement']:checked").length <= 0) {
        _showValidationTips("请仔细阅读《北部湾航空旅客、行李国内运输总条件》！");
        return false;
    }
    return true;
}
//获取选择了的辅营
function getChooseMarket(){
    var offerIdList = [];
    $(".market-panel").not($(".hnaui-address-market")).find("select option:checked,input[type='checkbox']:checked").each(function () {
        var thisV = $(this).attr("value");
        if (thisV != '-1') {
            offerIdList.push(thisV);
        }
    });

    return offerIdList;
}
//提交
function submitFormActive(flag) {
    hna.verifyForm($(".search-result"), function () {
        var offerIdList = getChooseMarket() || [];

        var $hnauiOrderGeneration = $(".hnaui-order-generation");
        if (isMMB) {
            if (offerIdList.length < 1) {
                _showConfirmTips(_i18n("P19"), function () {
                    goToOrderDetail();
                });
                return false;
            }
            hna.loading();
            sendAjax(ajaxUrl.addMMBProductInfo, {
                "orderCode": _orderCode,
                "offerId": offerIdList.join("@"),
                "addressInfo": window.getAddressData()
            }, function (data) {
                if(data.status == "success"){
                    hna.loading();

                    //把新选购的辅营信息保存在本地
                    $hnauiOrderGeneration.find(".click-btn").removeClass("hnaui-btn-disabled").hide();
                    $hnauiOrderGeneration.hide();
                    $hnauiOrderGeneration.find(".continue-payment-btn").show();
                    $hnauiOrderGeneration.find(".hnaui-push-center").before('<br><p class="btn-tips" style="color:red;display: none;">您所选择的辅营产品已经添加到订单'+_orderCode+'里面，点击“继续支付”按钮，进入订单详情页面，可继续支付。</p>');
                    hna._processData.saveNewOrderCoder(_orderCode, $(".hnaui-order-generation").prop("outerHTML"));
                    goToPayment();
                }else{
                    hna.loading(false);
                    _showMsg(data.message);
                }
            });
        } else {
            $hnauiOrderGeneration.find(".order-code").html('订单正在生成中<i class="hnaui-icon hnaui-anim hnaui-anim-rotate hnaui-anim-loop loading-icon">&#xe63e;</i>');
            $hnauiOrderGeneration.find(".click-btn").addClass("hnaui-btn-disabled");

            sendAjax(ajaxUrl.addProductInfo, {
                "offerId": offerIdList.join("@"),
                "shoppingCartId": _shoppingCartId
            }, function (data) {

                $hnauiOrderGeneration.find(".click-btn").removeClass("hnaui-btn-disabled").hide();
                if(data.status == "success"){
                    _orderCode = data.orderCode;
                    //清空订单生成失败的提示
                    hna._processData.saveJudgeOrderKey();
                    $hnauiOrderGeneration.hide();
                    $hnauiOrderGeneration.find(".order-code").html("已生成订单：<span>" + _orderCode + "</span>");
                    $hnauiOrderGeneration.find(".cancel-order-btn").show();
                    $hnauiOrderGeneration.find(".continue-payment-btn").show();
                    $hnauiOrderGeneration.find(".hnaui-push-center").before('<br><p class="btn-tips" style="color:red;display: none;">订单已生成，请点击“取消订单”按钮取消订单，重新回到航班选择页面；或者点击“继续支付”按钮，进入订单详情页面，可继续支付。</p>');

                    //把新生成的订单号保存在本地
                    hna._processData.saveNewOrderCoder(_orderCode, $(".hnaui-order-generation").prop("outerHTML"));

                    goToPayment();
                }else{
                    //设置订单生成失败的提示语
                    hna._processData.saveJudgeOrderKey(data.message);

                    $hnauiOrderGeneration.find(".re-search-btn").show();
                    $hnauiOrderGeneration.find(".order-code").html(data.message);
                }
            });
        }
    });
    return false;
}
//去选择座位
function chooseSeat() {
    goToPage("/airEye/seat?orderCode=" + hna.compile(_orderCode));
}
//去支付
function goToPayment() {
    goToPage("/airP/payment?type=content&orderCode=" + hna.compile(_orderCode));
}
//去订单详情页面
function goToOrderDetail() {
    goToPage("/airEye/order/orderDetail?orderCode=" + hna.compile(_orderCode));
}
//获取辅营信息，添加到购物车
function addMarketInfoToCart() {
    var marketArr = [];
    $(".market-panel").each(function () {
        var $this = $(this);
        var obj = {};
        obj.name = $this.find(".market-name").html();
        obj.list = [];

        if(!$this.hasClass("hnaui-address-market")){
            $this.find("select option:checked").each(function () {
                var $$this = $(this);
                if ($$this.attr("value") != "-1") {
                    var o = {};
                    o.code = $$this.data("code");
                    o.name = $$this.data("title");
                    o.currency = $$this.data("currency");
                    o.price = parseFloat($$this.data("price"));
                    o.quantity = 1;
                    var bl = obj.list.any(function (item) {
                        if (item.code == o.code) {
                            item.quantity++;
                            return true;
                        } else {
                            return false;
                        }
                    });
                    if (!bl) {
                        obj.list.push(o);
                    }
                }
            });
        }

        $this.find("input[type='checkbox']:checked").each(function () {
            var $$this = $(this);
            var o = {};
            o.code = $$this.data("code");
            o.name = $$this.siblings(".product-name").text();
            o.currency = $$this.data("currency");
            o.price = parseFloat($$this.data("price"));
            o.quantity = 1;
            var bl = obj.list.any(function (item) {
                if (item.code == o.code) {
                    item.quantity++;
                    return true;
                } else {
                    return false;
                }
            });
            if (!bl) {
                obj.list.push(o);
            }
        });
        if(obj.list.length > 0){
            marketArr.push(obj);
        }
    });

    HNACart.createMarketCostDetail(marketArr);

    if(isMMB){
        $(".create-order-btn").toggleClass("hnaui-btn-disabled", getChooseMarket().length <= 0);
    }
}


function setSInfo(){
    var arr = (_flightSegmentStr || "").split(",");
    if (arr.length == 1) {
        var subArr = (arr[0] || "").split("-");
        _sInfo.tripType = "OW";
        _sInfo.outboundOption.originLocationCode = subArr[0] || "";
        _sInfo.outboundOption.destinationLocationCode = subArr[1] || "";
    } else if (arr.length == 2) {
        var subArr0 = (arr[0] || "").split("-");
        var subArr1 = (arr[1] || "").split("-");
        if (subArr0[1] == subArr1[0]) {
            _sInfo.tripType = "RT";
            _sInfo.outboundOption.originLocationCode = subArr0[0] || "";
            _sInfo.outboundOption.destinationLocationCode = subArr0[1] || "";
        } else {
            _sInfo.tripType = "MC";
            setSInfoMultiCityOptions(_flightSegmentStr);
        }
    }else{
        _sInfo.tripType = "MC";
        setSInfoMultiCityOptions(_flightSegmentStr);
    }

    _sInfo = new SearchFlightInfo(hna.cloneObj(_sInfo));
}
function setSInfoMultiCityOptions(str) {
    var arr = (str || "").split(",");
    (arr || []).forEach(function (o) {
        var subArr = (o || "").split("-");
        _sInfo.multiCityOptions.push({
            originLocationCode: subArr[0] || "",
            destinationLocationCode: subArr[1] || ""
        });
    });
}

//如果没有辅营
function triggerHelpAlert() {
    // $("input[name='agreement']").prop("checked" , true);
    // renderFrom();
    $(".create-order-btn").trigger("click");
}