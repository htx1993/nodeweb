hna._i18nMap.addLanguages({
    "C01": {"zh_CN": "预订内容", "en_US": "Shopping Cart"}
});

window.HNACart = HNACart = (function ($, w, d, undefined) {
    var shoppingCartId = "SHOPPING_CART_ID" + "_" + (hna._code || "");
    var shoppingCartInfo = {};
    var tripType = "";
    var _currency = "";
    var _seatInfo = {};
    //购物车事件监听
    function eventInit() {
        setCurrencySymbol();
        //购物车滚动到坐标处y时，让它fixed：y
        var $shoppingCart = $('#shoppingCart');
        if ($shoppingCart.length > 0) {
            var cartScrollTop = $shoppingCart.offset().top == 0 ? 130 : $shoppingCart.offset().top;
            var footerH = $("#footer-block").outerHeight();
            $(window).scroll(hna.throttle_duration(function () {
                var searchH = $('.search').outerHeight();
                var scrollTop = $(this).scrollTop();
                var cartH = $('#shoppingCart').outerHeight();
                var contentH = $(".home-block").height();
                var cssObj = {
                    "position": "static",
                    "width": "100%",
                    "top": "auto",
                    "bottom": "auto",
                    "zIndex": 0
                };
                if (scrollTop <= cartScrollTop + searchH) {
                    cssObj.position = "static";
                    cssObj.width = "100%";
                    cssObj.top = "auto";
                    cssObj.bottom = "auto";
                    cssObj.zIndex = 0;

                    // $(".search-box").css("z-index", "");
                    // $(".search-info").css("z-index", "");
                } else {
                    cssObj.position = "fixed";
                    cssObj.width = "inherit";
                    cssObj.zIndex = 2;
                    if ((scrollTop + cartH + footerH) > contentH) {
                        var containerH = $('.container_right').parents('.container').outerHeight();
                        cssObj.position = "absolute";
                        cssObj.top = containerH - cartH;
                    } else {
                        cssObj.top = 0;
                        cssObj.bottom = "auto";
                    }
                    // $(".search-box").css("z-index", "-1");
                    // $(".search-info").css("z-index", "-1");
                }
                $('#shoppingCart').css(cssObj);
            }, 10, 100));
        }


    }

    //显示加载动画
    function loading(flag) {
        if (flag == "hide") {
            $(".cart-loading").hide();
        } else {
            $(".cart-loading").show();
        }
    }

    //创建购物车明细
    function createCartDetail(info) {
        var html = '';
        if (arguments.length > 0) {
            if (!info) {
                info = {};
            }
            if (info.flag == "mmb_market") {
                html += '<div class="cost-detail market-cost-detail">';
                html += '   <p class="cart-no-detail">暂时没有预定内容</p>';
                html += '</div>';
                $("#shoppingCart .cart-detail").html(html);
                $("input[name='cartFlightAmount']").val(info.totalPrice || 0);
                setTotalAmount(info.totalPrice + "");
                setCurrencySymbol(info.currency);
            } else {
                var o = filterPaymentData(info);
                shoppingCartInfo = o.cartInfo;
                tripType = o.tripType;

                if (shoppingCartInfo.payPurpose != "PAY_FOR_CHANGE") {
                    html = createTripDetail(shoppingCartInfo.bounds);
                    html += createCostDetail(shoppingCartInfo.priceInfo, shoppingCartInfo.taxs);
                    html += createMarketCostDetail(shoppingCartInfo.marketList, "html");
                    html += '<div class="cost-detail market-cost-detail"></div>';
                    $("#shoppingCart .cart-detail").html(html);
                    setTotalAmount(shoppingCartInfo.totalAmout + "");
                    //$(".cart-total-amount").html(shoppingCartInfo.totalAmout);
                    $("input[name='cartFlightAmount']").val(shoppingCartInfo.totalAmout);
                } else {
                    html = '<h3>原航班</h3>';
                    html += createTripDetail(shoppingCartInfo.bounds_changed);
                    html += createCostTotal(shoppingCartInfo.totalPrice_changed, "原");
                    html += createMarketCostDetail(shoppingCartInfo.marketList, "html");

                    html += '<hr><h3>新航班</h3>';
                    html += createTripDetail(shoppingCartInfo.bounds);
                    html += createCostTotal(shoppingCartInfo.totalPrice, "新");

                    var priceInfo = _formatMoneyInfo(shoppingCartInfo.changeFee || 0, _currency);
                    html += '<div class="cost-detail">';
                    html += '   <h3 class="cost-title">改期手续费</h3>';
                    html += '   <div class="cost-info">';
                    html += '       <div class="sub-type cart-item">';
                    html += '           <span>总计</span>';
                    html += '           <span class="cart-item-right"><span>' + priceInfo.currency + '</span><span>' + priceInfo.money + '</span></span>';
                    html += '       </div>';
                    html += '   </div>';
                    html += '</div>';

                    html += '<div class="cost-detail market-cost-detail"></div>';
                    $("#shoppingCart .cart-detail").html(html);
                    setTotalAmount(shoppingCartInfo.totalAmout + "");
                    //$(".cart-total-amount").html(shoppingCartInfo.totalAmout);
                    $("input[name='cartFlightAmount']").val(shoppingCartInfo.totalAmout);
                }
            }
        } else {
            var oo = hna._processData.getShoppingCartInfo();
            shoppingCartInfo = oo.cartInfo;
            _currency = shoppingCartInfo.currency;
            if (shoppingCartInfo.offerId || shoppingCartInfo.shoppingCartId) {
                tripType = oo.tripType;
                html += createTripDetail(shoppingCartInfo.bounds);
                html += createCostDetail(shoppingCartInfo.priceInfo, shoppingCartInfo.taxs);
                html += '<div class="cost-detail market-cost-detail"></div>';
                $("#shoppingCart .cart-detail").html(html);
                $("input[name='cartFlightAmount']").val(shoppingCartInfo.totalPrice);
                setTotalAmount(shoppingCartInfo.totalPrice + "");
                setCurrencySymbol(shoppingCartInfo.currency);

                createMarketCostDetail(filterSeatData(shoppingCartInfo.ancillaryPriceOffer));
            }
        }

        loading("hide");
    }

    //创建航班信息内容
    function createTripDetail(bounds) {
        try {
            var info = {};
            var html = '';
            (bounds || []).forEach(function (item, index) {
                if (!item) {
                    item = {};
                }
                html += '<div class="trip-detail">';
                var depDate = hna._date.getDateInfo(item.departureDate);
                var arrDate = hna._date.getDateInfo(item.arrivalDate);
                info.date = depDate.date;
                info.desCode = item.destination;
                info.oriCode = item.origin;
                html += '   <h3 class="trip-type ' + getTripClass(index) + '">' + (hna._processData.getTripTitle(index,info)) + '</h3>';
                html += '   <div class="trip-info">';
                html += '       <div class="trip-date hnaui-elip">' + (depDate.weekAbb || "") + ', ' + (depDate.dateCN || "") + '</div>';
                html += '       <div class="trip-flight-no hnaui-elip">航班:<strong> ' + (item.flightNumber || "") + '</strong></div>';
                html += '       <div class="trip-city">';
                html += '           <span class="hnaui-elip"><em class="hnaui-elip">' + (depDate.shortTime || "") + '</em>' + getCityNameByCode(item.origin || "", "city") + '</span>';
                html += '           ';
                html += '           <i class="trip-city-icon"></i>';
                html += '           <span class="hnaui-elip"><em class="hnaui-elip">' + (arrDate.shortTime || "") + '</em>' + getCityNameByCode(item.destination || "", "city") + '</span>';
                html += '           ';
                html += '       </div>';
                /*       html += '       <div class="trip-time hnaui-clear">';
                 html += '           <span class="hnaui-elip">' + (depDate.shortTime || "") + '</span>';
                 html += '           <span class="hnaui-elip">' + (arrDate.shortTime || "") + '</span>';
                 html += '       </div>';
                 */
                html += '   </div>';

                html += '</div>';
            });
        } catch (e) {
            JsErrorTips(e);
            html = '';
        }
        return html;
    }

    //创建票价税费信息内容
    function createCostDetail(priceInfo, taxs) {
        var html = '';
        try {
            html += '<div class="cost-line">';
            html += '</div>';
            html += '<div class="cost-detail-list">';
            html += '   <h3 class="cost-title">票价及税费</h3>';
            html += '   <div class="cost-info">';
            (priceInfo || []).forEach(function (item) {
                html += '   <div class="sub-type cart-item">';
                html += '       <span>' + (_filterPassType(item.travelerType)) + '</span><span> x ' + (item.amount || 1) + '</span>';
                html += '       <span class="cart-item-right"><span>' + _formatMoney(item.fare || 0, _currency) + '</span></span>';
                html += '   </div>';
            });
            html += '   </div>';
            html += '   <div class="cost-info">';
            (taxs || []).forEach(function (item) {
                html += '   <div class="sub-type cart-item">';
                html += '       <span class="hnaui-taxs">' + (item.name || "") + '</span>';
                html += '       <span class="cart-item-right">' + _formatMoney(item.taxFare || 0, _currency) + '</span>';
                html += '   </div>';
            });
            html += '   </div>';
            html += '</div>';
        } catch (e) {
            JsErrorTips(e);
            html = '';
        }
        return html;
    }

    //创建辅营产品信息内容
    function createMarketCostDetail(arr, flag) {
        var html = '';
        var marketAmount = 0;
        try {
            if (!arr) {
                arr = [];
            }
            if(_seatInfo.name){
                arr.unshift(_seatInfo);
            }
            var hasMarket = false;
            if (arr.length > 0) {
                html += '   <h3 class="cost-title">辅营费用</h3>';
                html += '   <div class="cost-info">';
                (arr || []).forEach(function (item) {
                    var littleCount = 0;
                    if (item.list.length > 0) {
                        html += '<div class="sub-type cart-item"><span>-- ' + (item.name || "") + ' --</span></div>';
                        (item.list || []).forEach(function (subItem) {
                            html += '<div class="sub-type cart-item">';
                            html += '   <span>' + (subItem.name || "") + ' x ' + (subItem.quantity || 1) + '</span>';
                            html += '   <span class="cart-item-right"><span>' + _formatMoney(subItem.price || 0, subItem.currency) + '</span></span>';
                            html += '</div>';
                            //主流程里面的选座费用，已经包含在了总价里面，所以不需要再单独累加
                            if(subItem.code != "SEATFEE"){
                                marketAmount += (subItem.price || 0) * (subItem.quantity || 1);
                            }
                            hasMarket = true;
                            littleCount += (subItem.price * subItem.quantity);
                        });
                        html += '<div class="sub-type cart-item">';
                        html += '<span>小计：</span>';
                        html += '<span class="cart-item-right">'+ _formatMoney(littleCount || 0) + '</span>';
                        html += '</div>';
                        html += '</div>';
                    }
                });
                html += '   </div>';
            }
            if (!hasMarket) {
                if (window.isMMB) {
                    html = '<p class="cart-no-detail">暂时没有预定内容</p>';
                } else {
                    html = '';
                }
            }

            if (!flag) {
                $(".market-cost-detail").html(html);
                var flightAmount = parseFloat($("input[name='cartFlightAmount']").val() || "0");
                setTotalAmount((flightAmount + marketAmount) + "");
                setCurrencySymbol();
            }
        } catch (e) {
            JsErrorTips(e);
            html = '';
        }

        return html;
    }

    //创建支付处理费--针对支付页面
    function createPaymentProcessingFee(feeRate) {
        try {
            var totalAmount = $("input[name='cartFlightAmount']").val();
            var proFee = parseFloat(hna.toFixed(hna.toFixed(parseFloat(totalAmount + "") * parseFloat(feeRate + "")), 0) + "");

            var html = '';
            html += '<div class="cost-detail process-fee">';
            html += '   <h3 class="cost-title">支付处理费</h3>';
            html += '   <div class="cost-info">';
            var priceInfo = _formatMoneyInfo(proFee, _currency);
            html += '       <div class="sub-type cart-item"><span>费用</span><span class="cart-item-right"><span>1 * ' + priceInfo.currency + '</span><span>' + priceInfo.money + '</span></span></div>';
            html += '   </div>';
            html += '</div>';

            $("#shoppingCart .process-fee").remove();
            $("#shoppingCart .cart-detail").append(html);


            $(".cart-total-amount").html(_formatMoneyInfo((parseFloat(totalAmount + "") + proFee), _currency).money);

        } catch (e) {
            JsErrorTips(e);
        }
    }

    //创建票价和税费总额--针对改期
    function createCostTotal(total, title) {
        var html = '';
        try {
            html += '<div class="cost-detail">';
            html += '   <h3 class="cost-title">' + title + '票价及税费</h3>';
            html += '   <div class="cost-info">';
            html += '   <div class="sub-type cart-item">';
            html += '       <span>总计</span>';
            var priceInfo = _formatMoneyInfo(total || 0, _currency);
            html += '       <span class="cart-item-right"><span>' + priceInfo.currency + '</span><span>' + priceInfo.money + '</span></span>';
            html += '   </div>';
            html += '   </div>';
            html += '</div>';
        } catch (e) {
            JsErrorTips(e);
            html = '';
        }
        return html;
    }

    //清空购物车明细
    function clearCartDetail() {
        $("#shoppingCart .cart-detail").html('<p class="cart-no-detail">暂时没有预定内容</p>');
        setTotalAmount(0);
        $("input[name='cartFlightAmount']").val("");
    }

    //设置购物车里面总价格
    function setTotalAmount(total) {
        $(".cart-total-amount").html(hna.toFixed(total).toSeparate());
    }

    //设置购物车里面总价格的币别符号
    function setCurrencySymbol(currency) {
        $(".cart-total .currency").html(_formatMoneyInfo(0, currency).currency || hna._currency.symbol);
    }


    //根据index和tripType添加class
    function getTripClass(index) {
        var tripClass = "hnaui-ow";
        if (tripType == "OW") {
            tripClass = "hnaui-ow";
        } else if (tripType == "RT") {
            if (index > 0) {
                tripClass = "hnaui-rt ";
            }
        }
        return tripClass;
    }

    //过滤选座数据
    function filterSeatData(arr) {
        var obj = {
            "name": "选座",
            "list": []
        };
        (arr || []).forEach(function (item) {
            var bl = false;
            for(var a = 0,a1 = obj.list.length;a<a1;a++){
                if(obj.list[a].price == item.totalFare && item.ancillaryType == "SEATFEE"){
                    bl = true;
                    obj.list[a].quantity += 1;
                    break;
                }
            }
            if(!bl && item.ancillaryType == "SEATFEE"){
                obj.list.push({
                    code: item.ancillaryType,
                    currency: item.totalFareCurrency,
                    name: item.ancillaryName || "座位",
                    price: item.totalFare,
                    quantity: 1
                });
            }
        });
        _seatInfo = obj;
        return [];
    }

    //把支付页面的购物车数据，过滤成主流程的支付数据
    function filterPaymentData(data) {
        if (!data) {
            data = {};
        }
        var cartInfo = {};
        if (!data.unPaidItineraryPrice) {
            data.unPaidItineraryPrice = {};
        }
        cartInfo.bounds = getBounds(data.itinerarySegments) || [];
        cartInfo.priceInfo = getTravelerInfo(data.unPaidItineraryPrice) || [];
        cartInfo.taxs = getTaxList(data.unPaidItineraryPrice) || [];
        cartInfo.totalPrice = data.unPaidItineraryPrice.totalAmount || 0;

        //改期明细
        if (!data.changedItineraryPrice) {
            data.changedItineraryPrice = {};
        }
        cartInfo.bounds_changed = getBounds(data.changedItinerarySegments) || [];
        cartInfo.priceInfo_changed = getTravelerInfo(data.changedItineraryPrice) || [];
        cartInfo.taxs_changed = getTaxList(data.changedItineraryPrice) || [];
        cartInfo.totalPrice_changed = data.changedItineraryPrice.totalAmount || 0;

        //辅营明细
        cartInfo.marketList = getMarketList(data.unPaidAncillaries) || [];
        cartInfo.totalAmout = data.unPaidTotalAmount || 0;

        cartInfo.payPurpose = data.payPurpose;
        cartInfo.changeFee = data.changeFee || 0;

        _currency = "CNY";

        return {
            cartInfo: cartInfo,
            tripType: data.tripType
        };
    }

    //过滤航班信息
    function getBounds(arr) {
        var bounds = [];
        (arr || []).forEach(function (item) {
            var depDate = hna._date.getDateInfo(item.departureDate + " " + item.departureTime);
            var arrDate = hna._date.getDateInfo(item.arrivalDate + " " + item.arrivalTime);
            bounds.push({
                departureDate: depDate.date + " " + depDate.time,
                arrivalDate: arrDate.date + " " + arrDate.time,
                destination: item.endAirportCode,
                flightNumber: item.carrierCode + item.flightNumber,
                inBoundDate: "",
                origin: item.startAirportCode
            });
        });
        return bounds;
    }

    //过滤乘机人信息
    function getTravelerInfo(unPaidItineraryPrice) {
        var guestPriceList = [];
        if (!unPaidItineraryPrice) {
            unPaidItineraryPrice = {};
        }
        if (unPaidItineraryPrice.adtQuantity > 0) {
            guestPriceList.push({
                "travelerType": "ADT",
                "fare": unPaidItineraryPrice.adtPrice,
                "amount": unPaidItineraryPrice.adtQuantity
            });
        }
        if (unPaidItineraryPrice.cnnQuantity > 0) {
            guestPriceList.push({
                "travelerType": "CNN",
                "fare": unPaidItineraryPrice.cnnPrice,
                "amount": unPaidItineraryPrice.cnnQuantity
            });
        }
        if (unPaidItineraryPrice.infQuantity > 0) {
            guestPriceList.push({
                "travelerType": "INF",
                "fare": unPaidItineraryPrice.infPrice,
                "amount": unPaidItineraryPrice.infQuantity
            });
        }
        return guestPriceList;
    }

    //过滤税费信息
    function getTaxList(unPaidItineraryPrice) {
        var taxList = [];
        if (!unPaidItineraryPrice) {
            unPaidItineraryPrice = {};
        }
        (unPaidItineraryPrice.taxes || []).forEach(function (item) {
            taxList.push({
                name: (hna._lang_type == "zh_CN") ? item.chineseName : item.englishName,
                taxFare: item.fee || 0
            });
        });
        return taxList;
    }

    //过滤辅营信息
    function getMarketList(arr) {
        var marketList = [];
        (arr || []).forEach(function (item) {
            var obj = {};
            obj.name = _filterMarketType(item.type || "");
            obj.list = [];
            (item.priceItems || []).forEach(function (subItem) {
                obj.list.push(subItem);
            });
            marketList.push(obj);
        });
        return marketList;
    }

    return {
        eventInit: eventInit,
        loading: loading,
        createCartDetail: createCartDetail,
        clearCartDetail: clearCartDetail,
        createMarketCostDetail: createMarketCostDetail,
        createPaymentProcessingFee: createPaymentProcessingFee
    };
})(jQuery, window, document);
HNACart.eventInit();
