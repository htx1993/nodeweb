//获取改期之前的航班信息
function getOldFlightInformation() {
    try {
        $(".search-loading").show();
        _sendAjax(ajaxUrl.getChangeOrderInfoBefore, {
            "orderCode": _orderCode,
            "flightNumber": _flightNumber,
            "otaID": _otaID
        }, function (data) {
            if (data.status == "failed" && data.message) {
                showOrderErrorTips(data.message);

            } else {
                _paymentTimeout = data.paymentTimeout ? data.paymentTimeout : _paymentTimeout;
                var countDownTime = data.islocked.timeout || 0;
                if (data.islocked && data.islocked.status && countDownTime > 0) {
                    showOrderLockTips(countDownTime, getOldFlightInformation);
                } else {
                    formattedData(data);
                    createChangeOrderEl(data);
                }
                hna.goToTop("1");

            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

//拼接页面信息
function createChangeOrderEl(data) {
    try {
        var html = createPromptTop(); //创建提示信息
        html += createOrderCode(_orderCode);//创建订单号
        html += createPassengerList();//创建用户信息
        html += createOldFlightInformation();//创建原航班信息
        html += createNewFlightInformation();//创建新航班信息
        html += createSubmitBtnEl();
        html += createPromptBottom();
        $('.search-result').html(html).show();
        renderFrom();
        initDate();

        initSubmit();
    } catch (e) {
        JsErrorTips(e);
        return false;
    }
}

//创建按钮
function createSubmitBtnEl() {
    var html = "";
    try {
        html += '<div class="submit-btn-panel hnaui-push-right">';
        html += '   <p class="hnaui-btn hnaui-btn-primary order-detail-btn click-btn">暂不改期，返回订单详情页</p>';
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}

//创建航班用户信息
function createPassengerList() {
    try {
        var passengerTitle = [_i18n("OC01"), _i18n("OC05"), _i18n("OC02"), _i18n("OC03"), _i18n("OC04")];
        var html = '<div class="hnaui-panel hnaui-shadow">';
        html += '       <div class="hnaui-panel-title"> <i class="hnaui-icon">&#xe613;</i>' + (_i18n("OC06")) + ' </div>';
        html += '           <table class="hnaui-panel-content hnaui-table hnaui-table-mobile">';
        html += '               <thead>';
        html += '               <tr>';
        (passengerTitle || []).forEach(function (item) {
            html += '               <th>' + (item || "") + '</th>';
        });
        html += '               </tr>';
        html += '               </thead>';
        html += '               <tbody>';
        (_passengerList || []).forEach(function (obj, index) {
            _passTypeInfo[(obj.passType).toUpperCase()].count++;

            html += '           <tr>';
            //旅客姓名
            html += createTdEl({text: getFullName(obj.firstName, obj.lastName) || "--", title: passengerTitle[0]});
            //旅客类型
            html += createTdEl({text: _filterPassType(obj.passType || "--"), title: passengerTitle[1]});
            //证件类型
            html += createTdEl({text: _filterIdType(obj.idType || "--"), title: passengerTitle[2]});
            //证件号码
            html += createTdEl({text: obj.idNo || "--", title: passengerTitle[3]});
            //出生日期
            html += createTdEl({text: obj.birthday || "--", title: passengerTitle[4]});
            html += '           </tr>';
        });
        html += '               </tbody>';
        html += '           </table>';
        html += '       </div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return '';
    }
}

//创建改期前的原始航班信息
function createOldFlightInformation() {
    try {
        var oldFlightInfoTitle = [_i18n("OC07"), _i18n("OC16"), _i18n("OC08"), _i18n("OC09"), _i18n("OC11"), _i18n("OC10"), _i18n("OC12"), _i18n("OC13")];
        var html = ' <div class="hnaui-panel hnaui-shadow">';
        html += '       <div class="hnaui-panel-title"><i class="hnaui-icon">&#xe90a;</i>' + _i18n("OC14") + ' </div>';
        html += '       <form class="hnaui-form hnaui-form-pane hnaui-panel-content old-flight-form">';
        html += '       <table class="hnaui-panel-content hnaui-table hnaui-table-mobile">';
        html += '           <thead>';
        html += '           <tr>';
        (oldFlightInfoTitle || []).forEach(function (item) {
            html += '           <th>' + (item || "--") + '</th>';
        });
        html += '           </tr>';
        html += '           </theadr>';
        html += '           <tbody>';
        (_oldFlightList || []).forEach(function (item, index) {
            var flightNumber = (item.marketingAirlineCode || "--") + (item.flightNumber || "--");
            _changeList.push({
                "oldFlight": item
            });
            html += '       <tr>';
            //航段_filterAirLine(subItem.marketingAirlineCode)
            //html += createTdEl({text: getTripTitle(_tripType, index).tripTitle, title: oldFlightInfoTitle[0]});
            html += createTdEl({text: _filterAirLine(item.marketingAirlineCode), title: oldFlightInfoTitle[0]});
            //航班号
            html += createTdEl({
                text: flightNumber,
                title: oldFlightInfoTitle[1]
            });
            //出发到达城市
            html += createTdEl({
                text: "<i class='hnaui-icon'>&#xe90f;</i>" + (getCityNameByCode(item.departureAirportLocationCode) || "--") + "<br><i class='hnaui-icon'>&#xe910;</i>" + (getCityNameByCode(item.arrivalAirportLocationCode) || ""),
                title: oldFlightInfoTitle[2]
            });
            //起飞到达时间
            html += createTdEl({
                text: "<i class='hnaui-icon'>&#xe60e;</i>" + (item.departDate || "--") + "<br><i class='hnaui-icon'>&#xe60e;</i>" + (item.arrivalDate || "--"),
                title: oldFlightInfoTitle[3]
            });

            //原票产品名称
            html += createTdEl({
                text: createTaxFareFamilyEl(item, "fareFamilyName", _fareFamilies),
                title: oldFlightInfoTitle[4]
            });
            //原票舱位
            html += createTdEl({
                text: item.shippingSpace || "--",
                title: oldFlightInfoTitle[5]
            });
            //原票面价
            html += createTdEl({
                //text: _formatMoney(item.ticketAmount) || 0,
                text: createTaxFareFamilyEl(item, "travellerPrice", filterTravellerPrice(item.travelerPrice)),
                title: oldFlightInfoTitle[6]
            });
            //新的出行日期
            html += '           <td class="hnaui-date-space">';
            html += '               <div class="td-text">' + isTime(item.departDate, index) + '</div><div class="td-title">' + oldFlightInfoTitle[7] + '</div>';
            html += createHiddenInput("flightid", item.id || "");
            html += createHiddenInput("departDate", item.departDate);
            html += createHiddenInput("arrivalDate", item.arrivalDate);
            html += createHiddenInput("originCode", item.departureAirportLocationCode || "");
            html += createHiddenInput("destinationCode", item.arrivalAirportLocationCode);
            html += '           </td>';
            html += '       </tr>';
        });
        html += '           </tbody>';
        html += '       </table>';
        html += createHiddenInput("itemid", _itemID);
        html += createSearchBtnEl('search-btn', '&#xe615;', _i18n("OC31"));//创建查询按钮
        html += '       </form>';
        html += '   </div>';
        return html;

    } catch (e) {
        JsErrorTips(e);
        return '';
    }
}

function filterTravellerPrice(arr) {
    (arr || []).forEach(function (item) {
        item.count = _passTypeInfo[item.travelerType].count;
    });
    return arr;
}

function isTime(departDate, index) {
    var time = new Date(departDate);
    var day = hna._date.addHour(addTime, new Date());
    if (day > time) {
        return _i18n("OC50");
    } else {
        return createDateEl(index);
    }

}


//创建改期后的新航班内容
function createNewFlightInformation() {
    try {
        var html = '';
        var originDestinationGroup = _newFlightInfo.originDestinationGroup || [];
        if (originDestinationGroup.length < 1) {
            html += '<div class="hnaui-panel hnaui-shadow hna-new-flight"></div>';
        } else {
            // _i18n("OC24") 剩余座位
            var newFlightTitleArr = [_i18n("OC07"), _i18n("OC15"), _i18n("OC08"), _i18n("OC09"), _i18n("OC20"), _i18n("OC11"), _i18n("OC10"), _i18n("OC23"), _i18n("OC26"), _i18n("OC27"), _i18n("OC28")];
            html += '       <div class="hnaui-panel-title"> <i class="hnaui-icon">&#xe90a;</i>' + _i18n("OC29") + '</div>';
            html += '       <div class="hanui-panel-content">';
            html += '           <form class="hnaui-form hnaui-form-pane hnaui-panel-content new-flight-form">';
            html += '               <div class="hnaui-tab-content">';
            html += '                   <div class="">';
            html += '                       <table class="hnaui-table hnaui-table-mobile">';
            html += '                           <thead>';
            html += '                           <tr>';
            (newFlightTitleArr || []).forEach(function (item) {
                html += '                           <th>' + (item || "--") + '</th>';
            });
            html += '                           </tr>';
            html += '                           </thead>';
            html += '                           <tbody>';
            var shipSpaceCount = 0;
            var subHtml = "";
            var changeCount = 0;
            (originDestinationGroup || []).forEach(function (o, i) {
                //隐藏没有选择新日期的航班
                var trClass = "tr-hide";
                if (_tripeTypeChangeList[i] && _tripeTypeChangeList[i].change) {
                    trClass = "";
                } else {
                    shipSpaceCount--;
                }

                if (i > 0 && changeCount > 0) {
                    subHtml += '<tr class="' + trClass + '"><td class="td-hr" colspan="' + (newFlightTitleArr.length - 2) + '">&nbsp;</td></tr>';
                    shipSpaceCount++;
                }
                if (!trClass) {
                    changeCount++;
                }

                _tripCount++;

                var originDestinationOption = o.originDestinationOption || [];
                var originDestinationOptionLen = 0;
                subHtml += '                    <tr class="' + trClass + '">';
                var originDestinationChange = [];
                if (_newFlightInfo && _newFlightInfo.itineraryChange) {
                    originDestinationChange = _newFlightInfo.itineraryChange.originDestinationChange || [];
                }
                var flightId = o.originDestinationId;
                if (originDestinationChange[i] && originDestinationChange[i].source) {
                    flightId = originDestinationChange[i].source.originDestinationId;
                }
                (originDestinationOption || []).forEach(function (oo, ii) {
                    if (ii > 1) {
                        html += '               <tr class="' + trClass + '">';
                    }
                    var itineraryPriceLen = oo.itineraryPrice.length;
                    var flightSegment = oo.itinerary.flightSegment || [];
                    var markingAirlineCode = flightSegment[0].markingAirline.code;
                    var flightNumber = markingAirlineCode + flightSegment[0].flightNumber;
                    var flightModel = flightSegment[0].aircraft.code;
                    var departureInfo = flightSegment[0].departure;
                    var arrivalInfo = flightSegment[flightSegment.length - 1].arrival;

                    //承运人
                    subHtml += createTdEl({
                        text: _filterAirLine(markingAirlineCode) || "--",
                        title: newFlightTitleArr[0],
                        //rowSpan: "TRIPCOUNT"
                        rowSpan: itineraryPriceLen
                    });
                    //新航班号
                    subHtml += createTdEl({
                        text: flightNumber || "--",
                        title: newFlightTitleArr[1],
                        rowSpan: itineraryPriceLen
                    });
                    //新航班的出发到达城市
                    subHtml += createTdEl({
                        text: "<i class='hnaui-icon'>&#xe90f;</i>" + (departureInfo.airport.name || "--") + "<br><i class='hnaui-icon'>&#xe910;</i>" + (arrivalInfo.airport.name || "--"),
                        title: newFlightTitleArr[2],
                        rowSpan: itineraryPriceLen
                    });
                    //新航班的起飞到达时间
                    var depDate = (departureInfo.date || "--") + " " + (departureInfo.time || "--");
                    var arrDate = (arrivalInfo.date || "--") + " " + (arrivalInfo.time || "--");
                    subHtml += createTdEl({
                        text: "<i class='hnaui-icon'>&#xe60e;</i>" + depDate + "<br><i class='hnaui-icon'>&#xe60e;</i>" + arrDate,
                        title: newFlightTitleArr[3],
                        rowSpan: itineraryPriceLen
                    });
                    //新航班的机型
                    subHtml += createTdEl({
                        text: flightModel || "--",
                        title: newFlightTitleArr[4],
                        rowSpan: itineraryPriceLen
                    });
                    (oo.itineraryPrice || []).forEach(function (ooo, iii) {
                        originDestinationOptionLen++;
                        shipSpaceCount++;
                        if (iii > 1) {
                            html += '               <tr class="' + trClass + '">';
                        }
                        var fareFamily = ooo.fareFamily || {};
                        //新航班的产品名称
                        subHtml += createTdEl({
                            text: createTaxFareFamilyEl(fareFamily, "fareFamilyName", fareFamily.benefit, true),
                            title: newFlightTitleArr[5]
                        });

                        var travelerPrice = ooo.travelerPrice || [];
                        var adtPrice = {};
                        (travelerPrice || []).forEach(function (item) {
                            if (item.travelerType == "ADT") {
                                adtPrice = item;
                            }
                        });

                        //新航班的舱位
                        subHtml += createTdEl({
                            //text: adtPrice.cabinClass || "--",
                            //根据帖子5093做的修改
                            text: adtPrice.bookingClass || "--",
                            title: newFlightTitleArr[6]
                        });
                        //新航班的新票面价
                        adtPrice.ticketAmount = adtPrice.totalFare;
                        subHtml += createTdEl({
                            //text: _formatMoney(adtPrice.baseFare) || "--",
                            text: createTaxFareFamilyEl(adtPrice, "travellerPrice", filterTravellerPrice(travelerPrice)),
                            title: newFlightTitleArr[7]
                        });
                        /* //新航班的剩余座位数量
                         subHtml += createTdEl({
                         text: adtPrice.inventoryQuantity || "--",
                         title: newFlightTitleArr[8]
                         });*/
                        //选择单选按钮
                        subHtml += createTdEl({
                            text: createRadioEl(
                                ooo.id,
                                i,
                                trClass,
                                [
                                    {
                                        "name": "flightid",
                                        "value": flightId
                                    },
                                    {
                                        "name": "depDate",
                                        "value": departureInfo.date + " " + departureInfo.time
                                    },
                                    {
                                        "name": "flightSegment",
                                        "value": "<i class='hnaui-icon'>&#xe90f;</i>" + (departureInfo.airport.name || "--") + "<br><i class='hnaui-icon'>&#xe910;</i>" + (arrivalInfo.airport.name || "--")
                                    },
                                    {
                                        "name": "flightNumber",
                                        "value": flightNumber || "--"
                                    },
                                    {
                                        "name": "cabin",
                                        "value": adtPrice.bookingClass || "--"
                                    },
                                    {
                                        "name": "fareFamily",
                                        "value": createTaxFareFamilyEl(fareFamily, "fareFamilyName", fareFamily.benefit, true)
                                    },
                                    {
                                        "name": "fareFamilyName",
                                        "value": fareFamily.name
                                    }
                                ]
                            ),
                            title: newFlightTitleArr[9]
                        });
                        //if (i < 1 && ii < 1 && iii < 1) {
                        if (changeCount == 1 && ii < 1 && iii < 1) {
                            //票价补偿
                            subHtml += createTdEl({
                                text: _formatMoney(0),
                                title: newFlightTitleArr[10],
                                rowSpan: "SSCOUNT",
                                cla: "totalSupplementaryFare"
                            });
                            //改期手续费
                            subHtml += createTdEl({
                                text: _formatMoney(0),
                                title: newFlightTitleArr[11],
                                rowSpan: "SSCOUNT",
                                cla: "totalChangeFare"
                            });
                        }
                        subHtml += '                </tr>';
                    });
                });
                subHtml = subHtml.replace(/TRIPCOUNT/g, originDestinationOptionLen);
            });
            html += subHtml.replace(/SSCOUNT/g, shipSpaceCount);
            html += '                           </tbody>';
            html += '                       </table>';
            html += '                   </div>';
            html += '               </div>';
            html += createHiddenInput("itemid", _itemID);
            html += createHiddenInput("changeid", "");
            html += '           </form>';
            html += createSearchBtnEl('submit-btn', '&#xe610;', _i18n("OC32"));
            html += '       </div>';
        }
        return html;
    } catch (e) {
        JsErrorTips(e);
        return '';
    }
}


//产品列表
function createRadioEl(value, index, bl, arr) {
    try {
        var html = '<input type="radio" title=" " value="' + (value || "--") + '" name="fareFamily_' + index + '" hna-filter="fareFamily" ' + (bl ? "checked" : "") + '>';
        (arr || []).forEach(function (o) {
            html += createHiddenInput(o.name, o.value);
        });

        return html;
    } catch (e) {
        JsErrorTips(e);
        return '';
    }
}

//创建日期文本框控件
function createDateEl(index) {
    try {
        var tripInfo = getTripTitle(_tripType, index);
        var html = '<div class="input-icon">';
        html += '       <div class="hnaui-input-inline">';
        html += '           <input type="text" name="' + tripInfo.dateName + '" hna-verify="departureDate" autocomplete="off" class="hnaui-input o-date" hna-title="' + tripInfo.dateTitle + '" hna-icon="&#xe637;">';
        html += '       </div>';
        html += '   </div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return '';
    }
}

//创建td
function createTdEl(o) {
    try {
        if (!o) {
            return "";
        }
        var cs = o.colSpan ? ' colspan="7"' : '';
        var rs = o.rowSpan ? ' rowspan=' + o.rowSpan + '' : '';
        var cla = o.cla ? 'class="' + (o.cla) + '"' : "";
        return '<td' + cs + ' ' + rs + ' ' + cla + '><div class="td-text">' + (o.text || "--") + '</div><div class="td-title">' + (o.title || "--") + '</div></td>';

    } catch (e) {
        JsErrorTips(e);
        return '';
    }
}

//创建按钮
function createSearchBtnEl(btnClass, btnIcon, btnName) {
    try {
        if (!btnClass) {
            btnClass = '';
        }
        if (!btnIcon) {
            btnIcon = '';
        }
        if (!btnName) {
            btnName = '';
        }
        var html = '<div class="search-submit hnaui-clear">';
        html += '       <a class="hnaui-btn ' + (btnClass) + ' click-btn hnaui-btn-theme hnaui-btn-model" hna-submit hna-filter="' + (btnClass || "--") + '"><i class="hnaui-icon">' + btnIcon + '</i>' + (btnName) + '</a>';
        html += '   </div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return '';
    }
}

//创建隐藏域
function createHiddenInput(name, value) {
    try {
        if (!name) {
            return "";
        }
        return '<input type="hidden" name="' + name + '" value="' + (value || "--") + '">';

    } catch (e) {
        JsErrorTips(e);
        return '';
    }
}