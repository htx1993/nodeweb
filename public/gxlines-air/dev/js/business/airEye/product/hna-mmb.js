//初始化MMB页面element
function createMMBInitEl() {
    try {
        initMMBProductData();
    } catch (e) {
        JsErrorTips(e);
    }
}

//mmb获取辅营页面产品数据
function initMMBProductData() {
    sendAjax(ajaxUrl.getMMBProductInfo, {"orderCode": _orderCode}, function (data) {
        if (data.needToPay) {
            _showSuccessTips(_i18n("P07"), function () {
                goToOrderDetail();
            });
        } else {
            _marketList = data.group || [];
            if (_marketList.length > 0) {
                filterMarketData();
                createSearchResult();
            } else {
                _showSuccessTips(_i18n("P08"), function () {
                    goToOrderDetail();
                });
            }
        }
    });
}


var _chooseMarketInfo = [];
//mmb辅营，获取选择的辅营信息1
function getMMBChooseMarketInfo() {
    _chooseMarketInfo = [];
    $(".hnaui-meals,.hnaui-baggage,.hnaui-viphall,.hnaui-facilities,.hnaui-safe").each(function () {
        var productName = $(this).find(".market-name").text();
        $(this).find(".flight-list").each(function () {
            var $this = $(this);
            var $flightName = $this.find(".flight-name");
            var market = {
                "departureCode": $flightName.data("dep"),
                "arrivalCode": $flightName.data("arr"),
                "flightTitle": $flightName.html(),
                "passengerName": "",
                "marketInfo": {}
            };
            $this.find("ul>li").each(function () {
                var $subThis = $(this);
                market.passengerName = $subThis.find(".tit-name").text();
                $subThis.find("input[type=checkbox]:checked").each(function () {
                    var $thisInput = $(this);
                    market.marketInfo = {
                        "name": $thisInput.siblings(".product-name").text(),
                        "price": $thisInput.data("price"),
                        "currency": $thisInput.data("currency"),
                        "productName": productName
                    };
                    filterChooseMarketInfo(market);
                });
                $subThis.find("select>option:selected").each(function () {
                    var $thisInput = $(this);
                    if($thisInput.val() != "-1"){
                        market.marketInfo = {
                            "name": $thisInput.data("title"),
                            "price": $thisInput.data("price"),
                            "currency": $thisInput.data("currency"),
                            "productName": productName
                        };
                        filterChooseMarketInfo(market);
                    }
                });
            });
        });
    });
}
function filterChooseMarketInfo(info) {
    var bl1 = true;
    var bl2 = true;
    var bl3 = true;
    var index1 = 0;
    var index2 = 0;
    var arr = hna.cloneObj(_chooseMarketInfo);
    for (var a = 0, a1 = arr.length; a < a1; a++) {
        var item = arr[a];
        if (item.departureCode == info.departureCode && item.arrivalCode == info.arrivalCode) {
            index1 = a;
            bl1 = false;
            for (var b = 0, b1 = item.passenger.length; b < b1; b++) {
                var subItem = item.passenger[b];
                if (subItem.name == info.passengerName) {
                    index2 = b;
                    bl2 = false;
                    for (var c = 0, c1 = subItem.marketList.length; c < c1; c++) {
                        var o = subItem.marketList[c];
                        if (o.name == info.marketInfo.name) {
                            bl3 = false;
                            break;
                        }
                    }
                    break;
                }
            }
            break;
        }
    }
    if (bl1) {
        _chooseMarketInfo.push({
            departureCode: info.departureCode,
            arrivalCode: info.arrivalCode,
            flightTitle: info.flightTitle,
            passenger: [
                {
                    "name": info.passengerName,
                    "marketList": [info.marketInfo]
                }
            ]
        });
        bl2 = false;
        bl3 = false;
    }

    if (bl2) {
        _chooseMarketInfo[index1].passenger.push(
            {
                "name": info.passengerName,
                "marketList": [info.marketInfo]
            }
        );
        bl3 = false;
    }

    if (bl3) {
        _chooseMarketInfo[index1].passenger[index2].marketList.push(info.marketInfo);
    }
}
//var _chooseSafeInfo = [];
//function getMMBChooseSafeInfo(){
//    _chooseSafeInfo = [];
//    $(".hnaui-safe").each(function () {
//        var $this = $(this);
//
//        var market = {
//            "flightTitle": "",
//            "passenger": []
//        };
//        $this.find(".flight-name").each(function(){
//            market.flightTitle += $(this).prop("outerHTML");
//        });
//
//        $this.find("ul>li").each(function () {
//            var $subThis = $(this);
//            var passenger = {};
//            passenger.name = $subThis.find(".tit-name").text();
//            passenger.marketList = [];
//            $subThis.find("input[type=checkbox]:checked").each(function () {
//                var $thisInput = $(this);
//                passenger.marketList.push({
//                    "name": $thisInput.siblings(".product-name").text(),
//                    "price": $thisInput.data("price"),
//                    "currency": $thisInput.data("currency")
//                });
//            });
//            if(passenger.marketList.length > 0){
//                market.passenger.push(passenger);
//            }
//        });
//        if(market.passenger.length > 0){
//            _chooseSafeInfo.push(market);
//        }
//    });
//}