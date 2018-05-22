//初始化页面element
function createInitEl() {
    try {
        createSearchBox("select");
        createSearchInfo("select");

        //注意事项
        createAttentionPanel();
        createSubmitBtn();

        //如果查询的航班结果数据是可用的，就直接展示出来
        //如果该数据是不可用的，模拟点击查询按钮，重新查询
        if (isAvailability(_fInfo)) {
            setLoadingEL("init");
            createSearchResult();
            //航班价格趋势图
            HNAPriceTrend.init({"id":"price_trend_panel"});
            judgeSegmentShow(0 , "show");
        } else {
            $(".search-loading").hide();
            $(".search-result").show();
            $(".search-btn").trigger("click");
        }
    } catch (e) {
        JsErrorTips(e);
    }
}
//创建航班查询结果列表
function createSearchResult() {
    try {
        _fareFamilyRuleInfoList = [];//最长产品数组初始化;
        var html = '';
        html += '<div class="hnaui-choose-trip-info hnaui-clear hnaui-shadow"></div>';
        var arr = _fInfo.originDestinations;
        for (var a = 0, a1 = arr.length; a < a1; a++) {
            html += createFlightGroup(a);
        }
        html += createHiddenInput(arr.length);
        $(".search-result").html(html);
        setLoadingEL("hide");
        if(_type == "research") {
            $(".re-search-btn").trigger("click");
            _type = '';
        }
        hna.goToTop("1");

        renderFrom();
    } catch (e) {
        JsErrorTips(e);
    }
}
//创建航班列表里面的flight-group
function createFlightGroup(index) {
    try {
        var html = '<div class="hnaui-panel flight-group hnaui-shadow" data-index="' + (index) + '">';
        html += createFlightTripTitle(index);
        html += createFlightDateList(index);
        var flightCount = getTripFlightCount(index) || 0;
        for (var a = 0; a < flightCount; a++) {
            html += createFlightGroupItem(index, a);
        }
        html += createFlightNoResult(index);
        html += '</div>';
        html += '<div class="show-segment-con" data-index="' + (index) + '">';
        html += createFlightTripTitle(index);
        html += '<p class="hnaui-btn hnaui-btn-theme click-btn show-segment">选择</p>';
        html += '</div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}
//创建行程名称
function createFlightTripTitle(index) {
    var html = '';
    try {
        var tit = hna._processData.getTripTitle(index);
        var titleInfo = _fInfo.originDestinations[index];
        html += '<div class="flight-trip-title" data-dep="'+ (titleInfo.origin || '') +'" data-arr="'+ (titleInfo.destination||'') +'">';
        html += '   <h1 class="title_t1">' + tit + '</h1>';
        html += '   <h2 class="title_t2 hnaui-clear">';
        html += '       <span>' + getCityNameByCode(titleInfo.origin, "name") + '('+ (titleInfo.origin || '') + ')</span>';
        html += '       <span class="hnaui-icon flight-icon">&#xe901;</span>';
        html += '       <span>' + getCityNameByCode(titleInfo.destination, "name") + '('+ (titleInfo.destination || '') + ')</span>';
        html += '   </h2>';
        html += '   <span class="calendar-price click-btn">低价日历<i class="hnaui-icon">&#xe903;</i></span>';
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
function getOriginDestinations(index1) {
    return _fInfo.originDestinations[index1];
}
function getAirItineraries(index1, index2) {
    return (getOriginDestinations(index1) || {}).airItineraries[index2];
}
function getAirItineraryPrices(index1, index2) {
    return (getAirItineraries(index1, index2) || {}).airItineraryPrices;
}
function getTheOneFlightInfo(index1, index2, fareFamilyCode) {
    var airItinerarie = getAirItineraries(index1, index2);
    var airItineraryPrices = getAirItineraryPrices(index1, index2);
    var obj = airItinerarie.flightSegments || [];
    var len = obj.length - 1;
    var depDate = hna._date.getDateInfo(obj[0].departureDate + ' ' + obj[0].departureTime);
    var arrDate = hna._date.getDateInfo(obj[len].arrivalDate + ' ' + obj[len].arrivalTime);

    var originDestinations = getOriginDestinations(index1);

    var fareFamilyName = "";
    var price = "";
    var currency = "";
    if (fareFamilyCode) {
        (airItineraryPrices || []).forEach(function (item) {
            if (item.fareFamilyCode == fareFamilyCode) {
                fareFamilyName = item.fareFamilyName;
                //获取成人的票价
                (item.travelerPrices || []).forEach(function (subItem) {
                    if (subItem.travelerType == "ADT") {
                        price = subItem.totalFare;
                    }
                });
                var adtPrice = getAdtPrice(item.travelerPrices);
                price = adtPrice.price;
                currency = adtPrice.currency;
            }
        });
    }

    return {
        "flightNumber": obj[0].marketingAirlineCode + obj[0].flightNumber,
        "aircraftName": obj[0].aircraftName,
        "aircraftCode": obj[0].aircraftCode,
        "departureTime": depDate.shortTime,
        "departureDate": depDate.dateAbbCN,
        "departureWeek": depDate.weekAbb,
        "departureT": depDate.date + " " + depDate.time,
        "arrivalT": arrDate.date + " " + arrDate.time,
        "arrivalTime": arrDate.shortTime,
        "departureAirport": getCityNameByCode(originDestinations.origin, "name"),
        "arrivalAirport": getCityNameByCode(originDestinations.destination, "name"),
        "departureCity": getCityNameByCode(originDestinations.origin, "city"),
        "arrivalCity": getCityNameByCode(originDestinations.destination, "city"),
        "departureCode": originDestinations.origin,
        "arrivalCode": originDestinations.destination,
        "fareFamilyCode": fareFamilyCode,
        "fareFamilyName": fareFamilyName,
        "price": price,
        "currency": currency
    };
}
function createFlightGroupItem(index1, index2) {
    var html = "";
    try {
        var airItinerarie = getAirItineraries(index1, index2);

        var obj = airItinerarie.flightSegments;
        var len = obj.length - 1;
        var depDate = hna._date.getDateInfo(obj[0].departureDate);
        var o = getTheOneFlightInfo(index1, index2);

        html += '<div class="flight-group-item" data-index="' + (index2) + '" data-depdate="' + o.departureT + '" data-arrdate="' + o.arrivalT + '">';
        html += '   <dl>';
        html += '       <dt>';
        html += '           <div class="flight-no">';
        html += '               <p><span onclick="viewFlight(\'' + obj[0].flightNumber + '\',\'' + obj[0].marketingAirlineCode + '\',\'' + depDate.date + '\',\'' + obj[0].departureAirportCode + '\',\'' + obj[0].arrivalAirportCode + '\')">' + (o.flightNumber) + '</span></p>';
        html += '               <p><em  onclick="viewModels(\'' + obj[0].aircraftCode + '\')">' + (o.aircraftName) + '</em></p>';
        html += '           </div>';
        html += '           <div class="flight-info">';
        html += '               <p>';
        html += '                   <strong>' + (o.departureTime) + '</strong>';
        html += '                   <span class="hnaui-elip">' + (o.departureAirport) + '</span>';
        html += '               </p>';

        //航班情况，直飞，转机，经停
        if (obj.length == 1 && obj[0].stopCitys.length < 1 && obj[0].stopQuantity < 1) {
            html += '           <p class="line"><span>' + _i18n("F17") + '</span>';
        } else if (obj.length > 1) {
            html += '           <p class="stopover"><span>' + _i18n("F18") + '</span>';
        } else {
            html += '           <p class="stopover"><span>' + _i18n("F19") + '</span>';
        }
        //总飞行时间
        html += '                   <span class="duration">' + handleMinte(airItinerarie.duration || 0) + '</span>';
        html += '               </p>';

        html += '               <p>';

        //时间偏移量
        var arrivalOffsetStr = '';
        arrivalOffsetStr = airItinerarie.arrivalOffset > 0 ? '<i>+' + airItinerarie.arrivalOffset + '</i>' : '';
        html += '                   <strong>' + (o.arrivalTime) + arrivalOffsetStr + '</strong>';
        html += '                   <span class="hnaui-elip">' + (o.arrivalAirport) + '</span>';
        html += '               </p>';
        html += '           </div>';

        //最低价格
        var thisMinPrice = getMinPriceByFareFamily(index1, index2);
        var moneyInfo = _formatMoneyInfo(thisMinPrice.price, thisMinPrice.currency);
        html += '           <div class="btn click-btn show-fare-family hnaui-right">订票<i class="hnaui-icon">&#xe61a;</i></div>';
        html += '           <div class="price hnaui-right"><i>' + (moneyInfo.currency) + '</i><strong>' + (moneyInfo.money) + '</strong><em>起</em></div>';
        html += '           <div class="has-choose-fare hnaui-right"></div>';
        html += '       </dt>';

        //航班产品 farefamily
        var airItineraryPrices = getAirItineraryPrices(index1, index2);
        html += '       <dd class="fare-family-info">';
        html += '           <ul>';
        (airItineraryPrices || []).forEach(function (item) {
            html += createFareFamilyInfo(item);
        });
        html += '           </ul>';
        html += '       </dd>';
        html += '   </dl>';
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
function createFareFamilyInfo(o) {
    if (!o) {
        return "";
    }
    var html = "";
    try {
        html += '<li>';
        html += '   <div class="product-name">';
        html += '       <span>' + (o.fareFamilyName || "") + '</span>';
        html += '       <div class="rule-btn click-btn">退改签规则';
        html += createChangeRefundInfo(o.benefits);
        html += '       </div>';
        html += '   </div>';
        html += getProductRuleInfo(o.benefits);

        var adtPrice = getAdtPrice(o.travelerPrices);
        //显示成人的票价
        var moneyInfo = _formatMoneyInfo(adtPrice.price, adtPrice.currency);
        html += '       <div class="booking-class">' + adtPrice.bookingClass + '舱</div>';
        //显示成人的座位数量
        var quantityStr = _i18n("F23");
        var quantity = adtPrice.quantity + "";
        if (quantity && quantity <= 10 && quantity > 0) {
            quantityStr = '余票：' + quantity;
        }
        html += '       <p class="ticket-num">' + quantityStr + '</p>';
        html += '   <div class="price" data-price="'+ (moneyInfo.currency+moneyInfo.money) +'">';
        html += '       <strong><i>' + (moneyInfo.currency) + '</i>' + (moneyInfo.money) + '</strong>';
        html += '   </div>';
        html += '   <div class="buy-btn hnaui-right">';
        html += '       <span class="bookbtn click-btn choose-fare-family" data-id="' + (o.id) + '" data-code="' + (o.fareFamilyCode) + '">预订</span>';


        html += '   </div>';
        html += '</li>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
function createChangeRefundInfo(arr) {
    if (!arr || arr.length <= 0) {
        return '';
    }
    var html = "";
    try {
        html += '<div class="change-back-box hnaui-shadow">';
        html += '   <div class="content">';
        (arr || []).forEach(function (item) {
            if (item.code == "CHANGE_FEE" || item.code == "REFUND_FEE" || item.code == "ENDORSEMENT") {
                html += '       <p class="benefit-title">' + (item.name) + ':</p>';
                html += '       <p class="benefits-text">' + (item.text) + '</p>';
            }
        });
        html += '   </div>';
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
function getProductRuleInfo(arr) {
    if (!arr || arr.length <= 0) {
        return '';
    }
    var html = "";
    try {
        html += '<div class="pro-rule">';
        //html += '   <p><i class="hnaui-icon">&#xe91d;</i>可退可改</p>';
        (arr || []).forEach(function (item) {
            var icon = "";
            var text = "";
            if (item.code == "BAGGAGE_ALLOWANCE") {
                icon = "&#xe91c;";
                text = item.text;
            } else if (item.code == "CARRY_ON_BAGGAGE_ALLOWANCE") {
                icon = "&#xe91c;";
                text = item.text;
            } else if (item.code == "MEAL_SERVICE") {
                icon = "&#xe90e;";
                text = item.text;
            }
            if (icon && text) {
                html += '<p><i class="hnaui-icon">' + icon + '</i>' + text + '</p>';
            }
        });
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
function createHasChooseFlightInfo(thisP) {
    try {
        var $flightGroup = thisP.parents(".flight-group");
        var flightIndex = $flightGroup.data("index");

        var count = 0;
        (_hasChooseFlight || []).forEach(function (item, index) {
            var itemValueArr = (item || "").split("|");
            if (itemValueArr.length == 3) {
                var str = '';
                var title = hna._processData.getTripTitle(index);

                var o = getTheOneFlightInfo(index, itemValueArr[1], itemValueArr[2]);
                var moneyInfo = _formatMoneyInfo(o.price, o.currency);

                str += '           <span class="pro-name">' + o.fareFamilyName + '</span>';
                str += '           <em>' + moneyInfo.currency + '</em><strong>' + moneyInfo.money + '</strong>';

                if (index == flightIndex) {
                    $flightGroup.find(".has-choose-fare").hide();
                    thisP.parents(".flight-group-item").find(".has-choose-fare").html("<span>已选择：</span>" + str).show();
                }

                count++;
            }
        });

        //$(".hnaui-choose-trip-info").html(html).show();
        if (count == _fInfo.originDestinations.length) {
            $(".submit-btn").removeClass("hnaui-btn-disabled");
        }

    } catch (e) {
        JsErrorTips(e);
    }
}
//获取成人的票价
function getAdtPrice(travelerPrices) {
    var price = 0;
    var currency = "CNY";
    var farePrices = [];
    for (var a = 0, a1 = travelerPrices.length; a < a1; a++) {
        if (travelerPrices[a].travelerType == "ADT") {
            price = travelerPrices[a].totalFare;
            currency = travelerPrices[a].baseFareCurrency || "CNY";
            farePrices = travelerPrices[a].farePrices || 0;
            break;
        }
    }
    var bookingClass = ((farePrices || [])[0] || {}).bookingClass || "";
    var quantity = ((farePrices || [])[0] || {}).inventoryQuantity || "";
    return {
        price: price,
        currency: currency,
        farePrices: farePrices,
        bookingClass: bookingClass,
        quantity: quantity
    };
}
//获取一个航班中，价格最低的产品
function getMinPriceByFareFamily(index1, index2) {
    var airItineraryPrices = getAirItineraryPrices(index1, index2);
    var price = 0;
    var currency = "";
    (airItineraryPrices || []).forEach(function (item) {
        var adtPrice = getAdtPrice(item.travelerPrices);
        var thisPrice = parseFloat(adtPrice.price + "");
        if (price <= 0 || (price > 0 && price > thisPrice)) {
            price = thisPrice;
        }
        currency = adtPrice.currency;
    });
    return {
        price: price,
        currency: currency
    };
}

//创建没有航班的提示语
function createFlightNoResult(index) {
    try {
        var html = '';
        var flightCount = getTripFlightCount(index) || 0;
        if (flightCount <= 0) {
            html = '<div class="flight-no-result"><i class="no-flight"></i><div class="flight-no-result-info"><p>SORRY！您所选择的航段北部湾航空当天无此航班，十分抱歉！</p></div></div>';
        }
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}
//创建航班查询结果列表里面的隐藏域
function createHiddenInput(len) {
    var html = '';
    try {
        for (var a = 0; a < len || 0; a++) {
            html += '<input type="hidden" name="fareFamilyId_' + a + '" value="" class="fareFamilyId">';
        }
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建注意事项面板
function createAttentionPanel() {
    var html = '<div class="p-panel hnaui-panel hnaui-shadow hnaui-flight-attention flight-attention-panel">';
    html += '       <div class="hnaui-panel-title"><i class="hnaui-icon">&#xe91d;</i>' + _i18n("F35") + '</div>';
    html += '       <div class="hnaui-panel-content">';
    html += '           <p>1、无成人陪伴儿童、婴儿旅客、孕妇旅客、老年旅客、病患旅客、残疾旅客、酒醉旅客、军警残旅客等特殊旅客需致电北部湾航空呼叫中心{0}或北部湾航空直属售票处办理购票业务，网站不提供特殊旅客的购票业务。详情请阅读'.format(_tel) +
        ' <a class="a-link" href="' + hna._server_host + '/airR/rules?type=passengerService#specialPassenger" target="_blank">《特殊旅客须知》</a> ，致电{0}寻求人工客服帮助。</p>'.format(_tel);
    html += '           <p>2、根据销售情况，航班价格会随时波动，生成的订单与查询价格可能存在不一致的情况，以实际生成订单的价格为准；</p>';
    html += '           <p>3、支付后系统无法出票，若该订单无需再保障出票，请联系呼叫中心{0}退款；</p>'.format(_tel);
    html += '           <p>4、除北部湾航空另有规定以外，客票的所有航段必须按照客票所列明的航程，从始发地点开始顺序使用。如客票第一航段未被使用，而旅客在约定的经停地点开始旅行，该旅客运输无效，北部湾航空不予接受运输及退款；</p>';
    html += '           <p>5、如果您需要购买婴儿票，请在购买成人票时一并购买，如果您已购买成人票，需单独补购买婴儿票，请提前咨询{0}，并至少在航班起飞前2小时进行购买。</p>'.format(_tel);
    html += '       </div>';
    html += '   </div>';
    $(".flight-attention-panel").replaceWith(html);
}

//获取某一航段里面航班的数量
function getTripFlightCount(index) {
    var flightList = [];
    if (_fInfo.originDestinations && _fInfo.originDestinations[index]) {
        flightList = _fInfo.originDestinations[index].airItineraries;
    }
    return flightList.length;
}

//创建继续购票按钮
function createSubmitBtn() {
    var html = '<div class="hnaui-btn hnaui-btn-primary re-search-btn click-btn">' + _i18n("F14") + '</div>';
    html += '<div class="hnaui-btn hnaui-btn-theme submit-btn click-btn hnaui-btn-disabled">' + _i18n("F15") + '</div>';
    $(".search-submit").html(html);
}