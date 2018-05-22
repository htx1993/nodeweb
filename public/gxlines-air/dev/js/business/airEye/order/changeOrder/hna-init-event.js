var refundThList = [
    "旅客姓名",
    "航段",
    "航班号",
    "出发日期",
    "舱位",
    "产品名称"
];
var refundThListAfter = [
    "旅客姓名",
    "航段",
    "航班号",
    "出发日期",
    "舱位",
    "产品名称"
];
//初始化出发时间和返回时间
function initDate() {
    try {
        $(document).on("click focus", ".o-date", function (e) {
            e.stopPropagation();
            try {
                var $this = $(e.target);
                if ($this.hasClass("hnaui-btn-disabled")) {
                    return false;
                }

                //$this.attr("readonly", "readonly");
                var currentData = hna._date.getDateInfo().date;
                var pDateOption = {};
                var BirthdayMin = getBirthdayMin();
                var Birthday = [currentData, BirthdayMin];
                pDateOption.elem = this;
                pDateOption.dateType = "searchFlight";
                pDateOption.holidayList = [{"date":'6.14',"text":"周年庆"}];
                pDateOption.init = false;
                pDateOption.min = hna._date.getDateInfo(Birthday.max()).date;
                //结果是通过年加的 所以加要减掉1天
                pDateOption.max = hna._date.addDate(-1, getBirthday());
                //console.log(pDateOption.max);
                var thisName = $this.attr("name");
                var thisIndex = parseInt(thisName.substring(thisName.lastIndexOf("_") + 1) + "", 10);

                //最小值不能小于上一航班的新日期或者上一航班原始的到达时间
                var $prevDate = $("input[name='date_" + (thisIndex - 1) + "']");
                var prevDateV = $prevDate.val() || $prevDate.parents("td").find("input[name='arrivalDate']").val() || "";
                if (prevDateV && currentData < prevDateV) {
                    //pDateOption.min = hna._date.addDate(1, prevDateV);
                    //5367
                    pDateOption.min = hna._date.getDateInfo(prevDateV).date;
                }

                //最大值不能大于下一航班的新日期或者下一航班原始的出发时间
                var $nextDate = $("input[name='date_" + (thisIndex + 1) + "']");
                var nextDateV = $nextDate.val() || $nextDate.parents("td").find("input[name='departDate']").val() || "";
                if (nextDateV) {
                    //pDateOption.max = hna._date.addDate(-1, nextDateV);
                    //5367
                    if (nextDateV <= pDateOption.max) {
                        pDateOption.max = hna._date.getDateInfo(nextDateV).date;
                    }
                }

                pDateOption.start = $this.val() || pDateOption.min;
                pDateOption.choose = function (dates) {
                    $this.parents(".hnaui-placeholder").toggleClass("hnaui-input-active", !!dates);
                };

                if (!globalDate) {
                    globalDate = hna.initDatePanel;
                }
                globalDate(pDateOption);
            } catch (ev) {
                JsErrorTips(ev);
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

//监听单选按钮改变事件
function initRadio() {
    try {
        globalFrom.on('radio(fareFamily)', function (data) {
            var $this = $(data.elem);
            var thisName = $this.attr("name");
            var thisIndex = thisName.substring(thisName.lastIndexOf("_") + 1);

            var $newForm = $("form.new-flight-form");
            var radioChecked = $newForm.find("input[type='radio']:checked");
            var radioCheckedCount = radioChecked.length;
            if (radioCheckedCount >= _tripCount) {
                //开始计算改期费
                var fromInfo = {};
                fromInfo.itemid = $newForm.find("input[name='itemid']").val();
                fromInfo.changelist = [];
                radioChecked.each(function () {
                    var $this = $(this);
                    fromInfo.changelist.push({
                        "flightid": $this.parents("td").find("input[name='flightid']").val(),
                        "itineraryPriceId": $this.val()
                    });
                });
                _showValidationLoading(_i18n("OC45"));
                _sendAjax(ajaxUrl.calculatedPrice, fromInfo, function (data) {
                    hnaer.closeAll();
                    if(data.status == "success"){
                        $(".submit-btn").removeClass("hnaui-btn-disabled");
                        var airChangePrice = data.airChangePrice;
                        var change = airChangePrice.change;
                        var $newForm = $("form.new-flight-form");
                        $newForm.find("input[name='changeid']").val(change.id || "");
                        $newForm.find(".totalSupplementaryFare .td-text").html(_formatMoney(change.totalSupplementaryFare));
                        $newForm.find(".totalChangeFare .td-text").html(_formatMoney(change.totalChangeFare));
                        if (_changeList[0] && _changeList[0].newFlight) {
                            var $tbody = $this.parents("tbody");
                            _changeList[0].newFlight.totalSupplementaryFare = $tbody.find(".totalSupplementaryFare .td-text").html();
                            _changeList[0].newFlight.totalChangeFare = $tbody.find(".totalChangeFare .td-text").html();
                        }
                    }else{
                        _showValidationTips(data.message);
                    }
                });
            }
            if (_changeList[thisIndex]) {
                _changeList[thisIndex].newFlight = getNewFlightInfo($this);
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

//获取新航段的信息
function getNewFlightInfo (thisP) {
    var info = {};
    var $root = thisP.parents("td");
    var $tbody = thisP.parents("tbody");
    info.flightNumber = $root.find("input[name='flightNumber']").val();
    info.flightSegment = $root.find("input[name='flightSegment']").val();
    info.depDate = $root.find("input[name='depDate']").val();
    info.cabin = $root.find("input[name='cabin']").val();
    info.fareFamily = $root.find("input[name='fareFamily']").val();
    info.totalSupplementaryFare = $tbody.find(".totalSupplementaryFare .td-text").html();
    info.totalChangeFare = $tbody.find(".totalChangeFare .td-text").html();
    return info;
}

//验证提交信息
function initSubmit() {
    try {
        globalFrom.on("submit(search-btn)", function (data) {
            return getNewFlightInformation();
        });

        globalFrom.on("submit(submit-btn)", function (data) {
            return submitNewShipSpaceInformation();
        });
    } catch (ev) {
        JsErrorTips(ev);
    }
}
//查询改期之后的航班信息
function getNewFlightInformation() {
    try {
        var bl = true;
        var flightCount = 0;
        _tripeTypeChangeList = [];
        $(".o-date").each(function () {
            var $this = $(this);
            var thisName = $this.attr("name");
            var thisIndex = thisName.substring(thisName.lastIndexOf("_") + 1);
            if ($this.val()) {
                flightCount++;
            }
        });
        if (flightCount < 1) {
            _showMsg(_i18n("OC49"));
            return false;
        }

        if (bl) {
            // $(".search-btn").addClass('hnaui-btn-disabled');
            _showValidationLoading(_i18n("OC34"));

            var $oldForm = $("form.old-flight-form");
            var fromInfo = {};
            fromInfo.itemid = $oldForm.find("input[name='itemid']").val();
            fromInfo.changelist = [];
            var count = 0;
            $(".o-date").each(function () {
                var $this = $(this);
                var bl = false;
                if ($this.val()) {
                    fromInfo.changelist.push({
                        "flightid": $this.parents("tr").find("input[name='flightid']").val(),
                        "target": {
                            "originCode": $this.parents("tr").find("input[name='originCode']").val(),
                            "destinationCode": $this.parents("tr").find("input[name='destinationCode']").val(),
                            "originDate": $this.parents("tr").find("input.o-date").val() || hna._date.getDateInfo($this.find("input[name='departDate']").val()).date || ""
                        }
                    });
                    bl = true;
                }
                _tripeTypeChangeList.push({
                    "index": count,
                    "change": bl
                });
                count++;
            });
            $("input[type='radio']").removeAttr('checked');
            _sendAjax(ajaxUrl.getChangeOrderInfoAfter, fromInfo, function (data) {
                _newFlightInfo = data && data.airChangeSearch;
                hnaer.closeAll();
                if (data.message) {
                    _showMsg(data.message);
                    $(".search-btn").removeClass("hnaui-btn-disabled");
                    $(".hna-new-flight").html("").hide();
                } else {
                    var html = '';
                    if (_newFlightInfo.originDestinationGroup.length == 0) {
                        _showMsg(_i18n("OC43"));
                        $(".search-btn").removeClass("hnaui-btn-disabled");
                        $(".hna-new-flight").html("").hide();
                    } else {
                        _tripCount = 0;
                        html = createNewFlightInformation();
                        $('.hna-new-flight').html(html).show();

                        // $(".submit-btn").addClass("hnaui-btn-disabled");
                        //隐藏搜索按钮，日期控件不能点击
                        //  var $oldForm = $("form.old-flight-form");
                        // $oldForm.find(".search-btn").hide();
                        //$oldForm.find(".o-date").addClass("hnaui-btn-disabled");
                    }

                    renderFrom();
                    initRadio();
                }
            });
            return true;
        } else {
            return false;
        }

    } catch (e) {
        JsErrorTips(e);
        return false;
    }
}
//提交选择的新舱位 弹出确认信息框
function submitNewShipSpaceInformation() {
    try {
        if ($(".submit-btn").hasClass("hnaui-btn-disabled")) {
            return false;
        }

        var $newForm = $("form.new-flight-form");
        var checkItem = $newForm.find("input[type='radio']:checked");
        if (checkItem.length != _tripCount) {
            _showMsg(_i18n("OC35"));
            return false;
        }

        var changeLength = _changeList.length;
        var passengerLength = _passengerList.length;
        var html = '<div class="hnaui-tab-item change-confirm-layer hnaui-show">';
        html += '<p>' + _i18n("OC37") + '</p>';
        html += '<p>' + _i18n("OC38") + '</p>';
        html += '<p>' + _i18n("OC39") + '</p><br>';
         html += '<p>票价补偿：<span style="color:red;">'+ ((_changeList[0].newFlight || {}).totalSupplementaryFare || "") +'</span></p>';
        html += '<p>改期手续费：<span style="color:red;">'+ ((_changeList[0].newFlight || {}).totalChangeFare || "") +'</span></p>';
        html += '<p>' + _i18n("OC40") + '</p>';
       
        html += '<table class="hnaui-table hnaui-table-mobile" >';
        html += '<thead><tr>';
        (refundThList || []).forEach(function(item) {
            html += '<th>'+ item +'</th>';
        });
        html += '</tr></thead>';
        html += '<tbody>';
        (_passengerList || []).forEach(function (oo) {
            (_changeList || []).forEach(function (o) {
                if (o && o.oldFlight && o.newFlight) {
                    html += '<tr>';
                    html += createTdEl({text: (oo.name || "--"), title: _i18n("OC01")});
                    //航段
                    html += createTdEl({text: "<i class='hnaui-icon'>&#xe90f;</i>" + (getCityNameByCode(o.oldFlight.departureAirportLocationCode) || "--") + "<br><i class='hnaui-icon'>&#xe910;</i>" + (getCityNameByCode(o.oldFlight.arrivalAirportLocationCode) || "")});
                    //航班号
                    html += createTdEl({text: (o.oldFlight.marketingAirlineCode || "--") + (o.oldFlight.flightNumber || "--")});
                    //出发日期
                    html += createTdEl({text: (o.oldFlight.departDate || "--")});
                    //舱位
                    html += createTdEl({text: o.oldFlight.shippingSpace || "--"});
                    //退改规则
                    html += createTdEl({text: createTaxFareFamilyEl(o.oldFlight, "fareFamilyName", _fareFamilies)});
                    html += '</tr>';
                }
            });
        });

        html += '</table>';
        html += '<p>' + _i18n("OC51") + '</p>';
        html += '<table class="hnaui-table hnaui-table-mobile" >';
        html += '<thead><tr>';
        (refundThListAfter || []).forEach(function(item) {
            html += '<th>'+ item +'</th>';
        });
        html += '</tr></thead>';
        html += '<tbody>';
        (_passengerList || []).forEach(function (oo , index1) {
            (_changeList || []).forEach(function (o , index2) {
                if (o && o.oldFlight && o.newFlight) {
                    html += '<tr>';
                    html += createTdEl({text: (oo.name || "--"), title: _i18n("OC01")});
                    //航段
                    html += createTdEl({text: o.newFlight.flightSegment || ""});
                    //航班号
                    html += createTdEl({text: o.newFlight.flightNumber || ""});
                    //出发日期
                    html += createTdEl({text: o.newFlight.depDate || "--"});
                    //舱位
                    html += createTdEl({text: o.newFlight.cabin || "--"});
                    //退改规则
                    html += createTdEl({text: o.newFlight.fareFamily || ""});
                    // if (index1 == 0 && index2 == 0) {
                    //     //票价补偿
                    //     html += createTdEl({
                    //         text: o.newFlight.totalSupplementaryFare || "",
                    //         rowSpan: changeLength * passengerLength
                    //     });
                    //     //改期手续费
                    //     html += createTdEl({
                    //         text: o.newFlight.totalChangeFare || "",
                    //         rowSpan: changeLength * passengerLength
                    //     });
                    // }
                    html += '</tr>';
                }
            });
        });

        html += '</table>';
        html += '</div>';
        _showConfirmTips({"tips": html, "width": "700px"}, function () {
            var fromInfo = {};
            fromInfo.changeid = $newForm.find("input[name='changeid']").val();
            fromInfo.orderCode = _orderCode;
            hna.loading();
            _sendAjax(ajaxUrl.updateShipSpaceInfo, fromInfo, function (data) {
                if (data.status == "success") {
                    hna.loading();
                    goToPage("/airP/payment?type=content&orderCode=" + hna.compile(_orderCode));
                } else {
                    _showMsg(_i18n("OC46"));
                }
            });
        });
        return true;
    } catch (e) {
        JsErrorTips(e);
        return false;
    }
}