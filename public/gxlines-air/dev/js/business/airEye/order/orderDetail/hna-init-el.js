//创建错误提示语
function createErrorTipsEl(tips) {
    try {
        var html = '';
        html += '<div class="hnaui-shadow hnaui-site-tips hnaui-border-box hnaui-clear hnaui-picture"><i class="hnaui-icon">&#xe60b;</i><span class="site-content">' + tips + '</span></div>';
        $(".search-result").html(html).show();
        hna.goToTop();

    } catch (e) {
        JsErrorTips(e);
    }
}
//创建订单详情面板
function createOrderDetailEl() {
    filterOrderInfoData();
    filterMarketSeatData();
    try {
        var html = '';
        if (_oInfo.islocked.status && _oInfo.islocked.message) {
            html += '<div class="hnaui-shadow hnaui-site-tips hnaui-border-box hnaui-clear hnaui-picture"><i class="hnaui-icon">&#xe60b;</i><span class="site-content">' + _oInfo.islocked.message + '</span></div>';
        }
        html += createOrderInfoEl();
        html += createPassengerFlightSegment();
        html += createBtnList();
        for (var key in _productInfo) {
            if (_productInfo.hasOwnProperty(key)) {
                html += createMarketPanel(_productInfo[key]);
            }
        }
        html += createOperationInstructionsEl();
        $(".search-result").html(html).show();
        hna.goToTop();

        renderFrom();
        initElement();
        initCheckbox();
    } catch (e) {
        JsErrorTips(e);
    }
}
//创建订单主要信息
function createOrderInfoEl() {
    var html = '';
    try {
        html = '<div class="hnaui-panel hnaui-shadow">';
        html += '       <div class="hnaui-panel-title"><i class="hnaui-icon">' + _orderInfo.icon + '</i>' + _orderInfo.title + '</div>';
        html += '       <table class="hanui-panel-content hnaui-table hnaui-table-mobile order-detail-panel">';
        html += '           <tbody>';
        var list = _orderInfo.list || [];
        var len = list.length;
        list.forEach(function (o, i) {
            var bl = false;
            if (i % 4 == 0) {
                html += '           <tr>';
                bl = true;
            }
            html += '               <th>' + o.title + '：</th>';
            html += createTdEl(o);
            if (((i > 0 && i % 4 == 0) || i == len - 1) && !bl) {
                html += '           </tr>';
            }
        });
        html += '           </tbody>';
        html += '       </table>';
        html += '   </div>';

    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}

//创建旅客及其航段信息
function createPassengerFlightSegment() {
    var html = '';
    try {
        var passengerList = _oInfo.passengerList || [];
        //保存建旅客及其航段信息并做空处理
        html += '<div class="hnaui-panel hnaui-shadow">';
        html += '   <div class="hnaui-panel-title"><i class="hnaui-icon">&#xe612;</i>' + _i18n("CT01") + '</div>';
        html += '   <div class="hnaui-panel-content hnaui-tab  hnaui-tab-brief">';
        html += '       <ul class="hnaui-tab-title hna-userList">';
        //创建用户
        html += createUser(passengerList);
        html += '       </ul>';
        //旅客信息
        html += '       <div class="hnaui-tab-content">';
        ( passengerList || []).forEach(function (item, index) {
            var info = item.info || {};
            html += '       <div class="hnaui-tab-item ' + (index == 0 ? 'hnaui-show' : '') + '">';
            html += '           <table class="hnaui-table hnaui-table-mobile lvk-info">';
            html += '                <tbody>';
            html += '               <tr>';
            html +='<th width="80px">'+_filterIdType(info.idType || "--")+'：</th>';
            html +='<td width="180px">'+(info.idNo || "--")+'</td>';
            html += '<th width="80px">' + _i18n("OT27") + '：</th>';
            html +='<td>'+_filterPassType(info.passType || "")+'</td>';
            html += '<th width="90px">' + _i18n("OT28") + '：</th>';
            html +='<td>'+(info.cardNo || "--")+'</td>';
            html += '<th width="80px">' + _i18n("OT29") + '：</th>';
            html +='<td>'+(info.ticketType || "--")+'</td>';
            html += '               </tr>';
            html += '                </tbody>';
            html += '           </table>';

            //旅客的航段信息
            html += '           <table class="hnaui-table hnaui-table-mobile">';
            html += '               <thead><tr>';
            //暂时注释<th>' + _i18n("OT33") + '</th><th>' + _i18n("OT34") + '</th>
            html += '                   <th>' + _i18n("OT48") + '</th>';
            html += '                   <th>' + _i18n("OT31") + '</th>';
            html += '                   <th>' + _i18n("OT02") + '</th>';
            html += '                   <th>' + _i18n("OT47") + '</th>';
            html += '                   <th>' + _i18n("OT32") + '</th>';
            html += '                   <th>' + _i18n("OT34") + '</th>';
            html += '                   <th>' + _i18n("OT03") + '</th>';
            html += '                   <th>' + _i18n("OT35") + '</th>';
            html += '                   <th>' + _i18n("OT36") + '</th>';
            html += '                   <th>' + _i18n("OT37") + '</th>';
            html += '                   <th>' + _i18n("OT38") + '</th>';
            html += '                   <th>' + _i18n("OT39") + '</th>';
            html += '               </tr></thead>';
            html += '               <tbody>';
            var flightSegment = item.flightSegment || [];
            _flightSegmentStr = "";
            (flightSegment || []).forEach(function (subItem, index) {
                if (index > 0) {
                    _flightSegmentStr += ",";
                }
                _flightSegmentStr += (subItem.departureAirportLocationCode + "-" + subItem.arrivalAirportLocationCode);

                //html += '           <tr class="hnaui-flight-title"><td colspan="12">' + (hna._processData.getTripTitle(index)) + _i18n("OT13") + '</td></tr>';
                html += '           <tr>';
                //承运人
                html += createTdEl({text: _filterAirLine(subItem.marketingAirlineCode), title: _i18n("OT48")});
                html += createTdEl({
                    text: "<i class='hnaui-icon' data-dep='" + (subItem.departureAirportLocationCode || "") + "'>&#xe90f;</i>" + ((getCityNameByCode(subItem.departureAirportLocationCode) || "") + (subItem.terminal || "")) + "</br><i class='hnaui-icon' data-arr='" + (subItem.arrivalAirportLocationCode || "") + "'>&#xe910;</i>" + (getCityNameByCode(subItem.arrivalAirportLocationCode) || ""),
                    title: _i18n("OT31")
                });
                html += createTdEl({
                    text: '<span class="flight-number-btn click-btn">' + (subItem.marketingAirlineCode || "") + (subItem.flightNumber || "") + '</span>',
                    title: _i18n("OT02")
                });
                html += createTdEl({
                    text: "<i class='hnaui-icon' data-date='" + (subItem.departureTime) + "'>&#xe60e;</i>" + (filterDate(subItem.departureTime) || "--") + "</br><i class='hnaui-icon'>&#xe60e;</i>" + (filterDate(subItem.arrivalTime) || "--"),
                    title: _i18n("OT47")
                });
                html += createTdEl({text: subItem.shippingSpace || "--", title: _i18n("OT32")});
                /*            html += createTdEl({text: subItem.seatState || "--", title: _i18n("OT33")});*/
                html += createTdEl({
                    text: createTaxFareFamilyEl(subItem, "fareFamilyName", _oInfo.fareFamilies),
                    title: _i18n("OT34")
                });
                html += createTdEl({text: subItem.ticketNo || "--", title: _i18n("OT03")});
                html += createTdEl({text: _formatMoney(subItem.ticketAmount || "0"), title: _i18n("OT35")});
                html += createTdEl({text: _formatMoney(subItem.payableAmount || "0"), title: _i18n("OT36")});
                //html += createTdEl({text:_formatMoney(subItem.taxTotal||""),title:"税费"});
                html += createTdEl({text: createTaxFareFamilyEl(subItem.tax || "", "tax"), title: _i18n("OT37")});
                html += createTdEl({text: _formatMoney(subItem.totalAmount || "0"), title: _i18n("OT38")});
                html += createTdEl({text: _filterTicketState(subItem.ticketState) || "--", title: _i18n("OT39")});
                html += '           </tr>';
            });
            html += '               </tbody>';
            html += '           </table>';
            html += '       </div>';
        });
        html += '       </div>';
        html += '   </div>';
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}


//创建按钮组
function createBtnList() {
    var html = '';
    try {
        var action = _oInfo.action;
        html += '<div class="hnaui-panel hnaui-shadow hnaui-push-right hnaui-clear hnaui-button-list">';
        (action || []).forEach(function (item) {
            // if (item.code == "CANCEL_REFUND" && item.enabled) {
            //     html += '       <button class="hnaui-btn hna-refundTickets click-btn"><i class="hnaui-icon">&#xe91a;</i>' + _i18n("OB01") + '</button>';
            // }
            if (item.code == "CHANGE_ITINERARY" && item.enabled) {
                html += '       <button class="hnaui-btn hna-changeOrder click-btn"><i class="hnaui-icon">&#xe919;</i>' + _i18n("OB02") + '</button>';
            }
            if (item.code == "ERROR_REFUND" && item.enabled) {
                html += '       <button class="hnaui-btn hna-payment click-btn"><i class="hnaui-icon">&#xe917;</i>' + _i18n("OB03") + '</button>';
            }
            // if (item.code == "SELECT_SEATS" && item.enabled) {
            //     html += '       <button class="hnaui-btn hna-changeSeat click-btn"><i class="hnaui-icon">&#xe902;</i>' + _i18n("OB11") + '</button>';
            // }
            if (item.code == "TRAVEL_EXTRAS_OPTION" && item.enabled) {
                html += '       <button class="hnaui-btn hna-changeMarket click-btn"><i class="hnaui-icon">&#xe91e;</i>' + _i18n("OB04") + '</button>';
            }
            if (item.code == "CANCEL_ORDER" && item.enabled) {
                html += '       <button class="hnaui-btn hna-cancelOrder click-btn"><i class="hnaui-icon">&#xe91f;</i>' + _i18n("OB05") + '</button>';
            }
            if (item.code == "ONLINE_PAYMENT" && item.enabled) {
                html += '       <button class="hnaui-btn hna-continue-payment click-btn"><i class="hnaui-icon">&#xe917;</i>' + _i18n("OB06") + '</button>';
            }
            if (item.code == "REFUND_ORDER" && item.enabled) {
                html += '       <button class="hnaui-btn hna-refundTickets click-btn"><i class="hnaui-icon">&#xe917;</i>' + _i18n("OB01") + '</button>';
            }
        });

        // if (_oInfo.orderInfo.orderState == "BOOKED") {
        //     html += '       <button class="hnaui-btn hna-continue-payment click-btn"><i class="hnaui-icon">&#xe917;</i>' + _i18n("OB06") + '</button>';
        //     html += '       <button class="hnaui-btn hna-cancelOrder click-btn"><i class="hnaui-icon">&#xe91f;</i>' + _i18n("OB05") + '</button>';
        // }
        // else if (_oInfo.orderInfo.orderState == "TICKETED") {
        //     html += '       <button class="hnaui-btn hna-changeMarket click-btn"><i class="hnaui-icon">&#xe91e;</i>' + _i18n("OB04") + '</button>';
        //     html += '       <button class="hnaui-btn hna-refundTickets click-btn"><i class="hnaui-icon">&#xe917;</i>' + _i18n("OB01") + '</button>';
        //     html += '       <button class="hnaui-btn hna-changeOrder click-btn"><i class="hnaui-icon">&#xe919;</i>' + _i18n("OB02") + '</button>';
        // }

        if (!_otaID) {
            html += '       <button class="hnaui-btn hna-orderList click-btn hnaui-left"><i class="hnaui-icon">&#xe90c;</i>' + _i18n("OB07") + '</button>';
        }

        //html += '       <button class="hnaui-btn hna-closeWindow click-btn"><i class="hnaui-icon">&#x2716;</i>' + _i18n("OB08") + '</button>';
        //html += '       <button class="hnaui-btn hna-send click-btn"><i class="hnaui-icon">&#xe609;</i>发送我的行程</button>';
        html += '       <button class="hnaui-btn hna-print click-btn"><i class="hnaui-icon">&#xe923;</i>' + _i18n("OB09") + '</button>';
        html += '    </div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}

//创建辅营，选座，保险，支付，退票，退辅营面板
function createMarketPanel(info) {
    var html = '';
    try {
        var list = info.list || [];
        if (list.length > 0) {
            html = '<div class="hnaui-panel hnaui-shadow ' + info.classStr + '">';
            html += '       <div class="hnaui-panel-title"><i class="hnaui-icon">' + info.icon + '</i>' + info.title + '</div>';
            html += '       <div class="hnaui-panel-content">';
            html += '           <table class="hnaui-table hnaui-table-mobile">';
            html += '               <thead>';
            html += '               <tr>';
            html += '                   <th>' + _i18n("OT05") + '</th>';
            (info.thTitleList || []).forEach(function (item) {
                html += '                   <th>' + item + '</th>';
            });
            if (_veteranCamp) {
                html += '                   <th>' + (createCheckbox({"flag": "all", "name": "market"})) + '</th>';
            }
            html += '               </tr>';
            html += '               </thead>';
            html += '               <tbody>';
            var cancelCount = 0;
            var index = 0;
            (list || []).forEach(function (o, i) {
                index++;
                html += '               <tr>';
                html += createTdEl({text: (index)});
                (info.tdValueFiled || []).forEach(function (filed) {
                    html += createTdEl({text: o[filed]});
                });
                if (_veteranCamp) {
                    if (o.status != "BOOKED") {
                        html += createTdEl({text: "--"});
                    } else {
                        cancelCount++;
                        html += createTdEl({
                            text: createCheckbox({
                                "value": (o.id || ""),
                                "name": "market"
                            })
                        });
                    }
                }
                html += '               </tr>';
            });
            html += '               </tbody>';
            html += '           </table>';
            html += '       </div>';
            if (_veteranCamp && info.cancelStr) {
                if (cancelCount > 0) {
                    html += '   <div class="hnaui-panel-footer hnaui-push-right hnaui-clear">';
                    html += '       <button class="hnaui-btn hna-cancelMarket click-btn"><i class="hnaui-icon">&#xe90c;</i>' + info.cancelStr + '</button>';
                    html += '   </div>';
                }
            }
            html += '</div>';
            if (index < 1) {
                html = '';
            }
        }
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}


//创建退费进度表
function createRefundpRrogress(ticketStatus, arr) {
    var html = '';
    try {
        if (!arr) {
            arr = [];
        }
        html += '<div class="hna-refund-ticket"><span class="active">' + ticketStatus + '</span>';
        if (arr.length > 0) {
            html += '<div class="hnaui-audit-process hnaui-shadow">';
            html += '<i class="hnaui-icon">&#xe623;</i>';
            html += '<ul class="">';
            ( arr || []).forEach(function (item, index) {
                html += '<li class=" ' + (index == arr.length - 1 ? 'noline' : '') + ' ' + (index == 0 ? '' : 'current') + '">';
                html += '<div>';
                html += '<p class="text">' + item.description + '(' + item.status + ')</p>';
                html += '<p class="time">' + item.operateTime + '</p>';
                html += '</div>';
                html += '</li>';
            });
            html += '</ul>';
            html += '</div>';
        }
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}

//创建表格td
function createTdEl(o) {
    try {
        if (!o) {
            return "";
        }
        var cs = o.colSpan ? ' colspan="7"' : '';
        //return '<td' + cs + '><div class="td-text">' + (o.text || "") + '</div><div class="td-title">' + (o.title || "") + '</div></td>';
        return '<td' + cs + ' ' + (o.width ? 'width="' + o.width + '"' : '') + '><div class="td-text">' + (o.text || "") + '</div></td>';
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}
//创建用户
function createUser(u) {
    var html = '';
    try {
        (u || []).forEach(function (item, index) {
            html += '<li class="' + (index == 0 ? 'hnaui-this' : '') + '">' + getFullName(item.info.firstName, item.info.lastName) + '(' + (_filterPassType(item.info.passType || "")) + ')</li>';
        });
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//全选按钮
function createCheckbox(o) {
    try {
        if (!o) {
            o = {};
        }
        var filter = "oneChoose";
        if (o.flag == "all") {
            filter = "allChoose";
        }
        return '<input type="checkbox" name="' + (o.name || "market") + '" hna-skin="primary" hna-filter="' + filter + '" value="' + (o.value || "") + '" data-index="' + (o.index || "") + '">';

    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}