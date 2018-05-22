//获取订单详情
function getOrderDetail() {
    try {
        $(".search-loading").show();
        _sendAjax(ajaxUrl.getOrderDetail, {"orderCode": _orderCode, "otaID":_otaID}, function (data) {
            if (data.success === false && data.msg) {
                createErrorTipsEl(data.msg);
            } else {
                $.extend(_oInfo, data);
                _tripType = data.tripType || "";

                _hasLoading = true;
                createOrderDetailEl();
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

//获取订单详情里面的付款信息
function getOrderPaymentDetail() {
    try {
        $(".search-loading").show();
        _sendAjax(ajaxUrl.getOrderPaymentDetail, {"orderCode": _orderCode}, function (data) {
            if (data) {
                _oInfo.paymentInfo = data.paymentInfo || [];

                if(_hasLoading){
                    createOrderDetailEl();
                }
            }
        }, "show");
    } catch (e) {
        JsErrorTips(e);
    }
}
//获取订单详情里面的付款信息
function getOrderRefundDetail() {
    try {
        $(".search-loading").show();
        _sendAjax(ajaxUrl.getOrderRefundDetail, {"orderCode": _orderCode}, function (data) {
            if (data) {
                _oInfo.refundInfos = data.refundInfos || [];

                if(_hasLoading){
                    createOrderDetailEl();
                }
            }
        }, "show");
    } catch (e) {
        JsErrorTips(e);
    }
}


//过滤订单信息
function filterOrderInfoData(){
    _orderInfo.title = _i18n("CT05");
    _orderInfo.icon = "&#xe90c;";
    _orderInfo.list = [];
    var o = _oInfo.orderInfo || {};
    _orderInfo.list.push({"text":o.orderCode || "--", "title":_i18n("OT12")});
    _orderInfo.list.push({text: _filterOrderState(o.orderState || "--"), title: _i18n("OT11")});
    _orderInfo.list.push({text: _formatMoney(o.orderAmount || "0" + ""), title: _i18n("OT14")});
    _orderInfo.list.push({text: _formatMoney(o.paidAmount || "0" + ""), title: _i18n("OT19")});
    _orderInfo.list.push({text: filterDate(o.createOrderDate || "--"), title: _i18n("OT16")});
    _orderInfo.list.push({text: filterDate(o.ticketedDate || "--"), title: _i18n("OT17")});
    _orderInfo.list.push({text: filterDate(o.paymentDate || "--"), title: _i18n("OT18")});
    _orderInfo.list.push({text: _formatMoney(o.unpaidAmount || "0" + ""), title: _i18n("OT15")});
    _orderInfo.list.push({text: (o.firstName ? getFullName(o.firstName,o.lastName) : o.contactName) || "--", title: _i18n("OT20")});
    _orderInfo.list.push({text: o.contactPhone || "--", title: _i18n("OT21")});
    _orderInfo.list.push({text: o.contactEmail || "--", title: _i18n("OT22")});
    _orderInfo.list.push({text: _filterOrderSource(o.orderSource || "--"), title: _i18n("OT24")});

}
//过滤辅营和选座的数据
function filterMarketSeatData(){
    var passengerList = _oInfo.passengerList || [];
    var marketList = [];
    var seatList = [];
    (passengerList || []).forEach(function (o, i) {
        var passengerInfo = o.info;
        (o.productlist || []).forEach(function (ooo, iii) {
            var obj = {
                "id":ooo.id,
                "code":ooo.code,
                "passengerName":(passengerInfo.firstName ? getFullName(passengerInfo.firstName,passengerInfo.lastName) : passengerInfo.name) || "--",
                "typeName":_filterMarketType(ooo.type || ""),
                "productName":ooo.name || "",
                "amount":_formatMoney(ooo.totalFare || "0", ooo.totalFareCurrency),
                "flightNumber":(ooo.marketingAirlineCode || "") + (ooo.flightNumber || ""),
                "flightDate":filterDate(ooo.departureDate || "--"),
                "status":_filterOrderState(ooo.status || "--")
            };
            if(ooo.type == "SEATFEE"){
                obj.seatNum = ooo.seatNum;
                seatList.push(obj);
            }else{
                marketList.push(obj);
            }
        });
    });


    _productInfo.marketInfo = {
        "title":_i18n("CT03"),
        "icon":"&#xe918;",
        "list":marketList,
        "thTitleList":[_i18n("OT40"),_i18n("OT41"),_i18n("OT42"),_i18n("OT43"),_i18n("OT02"),_i18n("OT44"),_i18n("OT45")],
        "tdValueFiled":["passengerName","typeName","productName","amount","flightNumber","flightDate","status"],
        "classStr":"hanui-panel-market",
        "cancelStr":_i18n("OB10")
    };
    // _productInfo.seatInfo = {
    //     "title":_i18n("CT06"),
    //     "icon":"&#xe902;",
    //     "list":seatList,
    //     "thTitleList":[_i18n("OT40"),_i18n("OT41"),_i18n("OT42"),_i18n("OT43"),_i18n("OT02"),_i18n("OT33"),_i18n("OT44"),_i18n("OT45")],
    //     "tdValueFiled":["passengerName","typeName","productName","amount","flightNumber","seatNum","flightDate","status"],
    //     "classStr":"hanui-panel-market",
    //     "cancelStr":_i18n("OB13")
    // };

    var insuranceList = [];
    (_oInfo.insuranceOffers || []).forEach(function(o,i){
        insuranceList.push({
            id: o.id,
            fullName:getFullName(o.firstName, o.lastName),
            idNo: o.idNo,
            companyName: o.companyName,
            productName: o.name,
            totalFare:_formatMoney(o.totalFare, o.totalFareCurrency),
            repay:_formatMoney(o.repay, o.totalFareCurrency),
            status:_filterInsuranceState(o.status)
        });
    });
    _productInfo.insuranceInfo = {
        "title":_i18n("CT07"),
        "icon":"&#xe918;",
        "list":insuranceList,
        "thTitleList":["被保人","证件号码","承保公司","保险名称","保险费","理赔金额","保单状态"],
        "tdValueFiled":["fullName","idNo","companyName","productName","totalFare","repay","status"],
        "classStr":"hanui-panel-insurance",
        "cancelStr":_i18n("OB12")
    };

    var paymentList = [];
    (_oInfo.paymentInfo || []).forEach(function(o,i){
        paymentList.push({
            id: o.id,
            paymentNo: o.paymentNo,
            bankGroupCode: _filterPaymentInformation(o.bankGroupCode) || "--",
            payAmount: _formatMoney(o.payAmount || "0"),
            merchantFee: _formatMoney(o.merchantFee || "0"),
            requestDate:filterDate(o.requestDate || "--"),
            responseDate:filterDate(o.responseDate) || "--",
            payStatus:filterDate(_filterPaymentResult(o.payStatus, o.orderType) || "--"),
            orderType:_filterPaymentInformation(o.orderType) || "--"
        });
    });
    _productInfo.paymentInfo = {
        "title":_i18n("CT04"),
        "icon":"&#xe917;",
        "list":paymentList,
        "thTitleList":[_i18n("OP01"),_i18n("OP02"),_i18n("OP03"),_i18n("OP04"),_i18n("OP05"),_i18n("OP06"),_i18n("OP07")],
        "tdValueFiled":["paymentNo","bankGroupCode","payAmount","requestDate","responseDate","payStatus","orderType"],
        "classStr":"hanui-panel-payment",
        "cancelStr":""
    };

    var refundInfos = _oInfo.refundInfos || [];
    var refundList = [];
    var veteranCamp = [];
    (refundInfos || []).forEach(function (o, index) {
        var obj = {
            "refundNo": o.refundNo,
            "createTime": o.createTime,
            "createUser": o.createUser,
            "poundage":_formatMoney(o.poundage),
            "ticketStatus":createRefundpRrogress(o.ticketStatus || "--", o.auditDetailList || []),
            "refund":_formatMoney(o.refund || 0),
            "remark": o.remark,
            "operateTime":o.ticketStatus == "等待审核"?"--": o.operateTime
        };
        if (o.type == "ticket") {
            refundList.push(obj);
        } else if (o.type == "component") {
            veteranCamp.push(obj);
        }
    });
    _productInfo.refundInfo = {
        "title":_i18n("DR09"),
        "icon":"&#xe917;",
        "list":refundList,
        "thTitleList":[_i18n("DR02"),_i18n("DR03"),_i18n("DR04"),_i18n("DR11"),_i18n("DR05"),_i18n("DR06"),_i18n("DR07"),_i18n("DR08")],
        "tdValueFiled":["refundNo","createTime","createUser","poundage","ticketStatus","refund","remark","operateTime"],
        "classStr":"hanui-panel-refund",
        "cancelStr":""
    };
    _productInfo.veteranCampInfo = {
        "title":_i18n("DR10"),
        "icon":"&#xe917;",
        "list":veteranCamp,
        "thTitleList":[_i18n("DR02"),_i18n("DR03"),_i18n("DR04"),_i18n("DR11"),_i18n("DR05"),_i18n("DR06"),_i18n("DR07"),_i18n("DR08")],
        "tdValueFiled":["refundNo","createTime","createUser","poundage","ticketStatus","refund","remark","operateTime"],
        "classStr":"hanui-panel-refund",
        "cancelStr":""
    };
}

//取消订单
function cancelOrder() {
    try {
        _showConfirmTips(_i18n("OW01"), function () {
            hna.loading();
            _sendAjax(ajaxUrl.cancelOrder, {"orderCode": _orderCode}, function (data) {
                hnaer.closeAll();
                if (data.status == "success") {
                    _showCountDownTips({
                        "tips": _i18n("OW02") + _i18n("OW021"),
                        "time": 2
                    }, getOrderDetail);
                } else {
                    _showMsg(data.message);
                }
            });
        });
    } catch (e) {
        JsErrorTips(e);
        return false;
    }
}

//打印此页
function preview(oper) {
    try {
        if (oper < 10) {
            var userList = [];
            $(".hna-userList li").each(function () {
                userList.push($(this).html());
            });
            $(".hna-userList").hide();
            $('.hnaui-tab-content .hnaui-tab-item').each(function (index) {
                var str = "<p class='print-title'>"+userList[index] +"</p>";
                $(this).addClass("hnaui-show").before(str);
            });
            $('.print-title-img').show();
            $(".hnaui-push-right").hide();
            bdhtml = window.document.body.innerHTML;//获取当前页的html代码
            sprnstr = "<!--startprint-->";//设置打印开始区域
            eprnstr = "<!--endprint-->";//设置打印结束区域
            prnhtml = bdhtml.substring(bdhtml.indexOf(sprnstr) + 18); //从开始代码向后取html
            prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));//从结束代码向前取html

            window.document.body.innerHTML = prnhtml;
            window.print();
            window.document.body.innerHTML = bdhtml;
            $('.hnaui-tab-content .hnaui-tab-item').each(function (index) {
                if(index>0){
                    $(this).removeClass("hnaui-show");
                }
            });
            $(".hna-userList").show();
            $(".print-title").each(function () {
                $(this).remove();
            });
            userList = [];
            $('.print-title-img').hide();
            $(".hnaui-push-right").show();
        } else {
            window.print();
        }
    } catch (e) {
        JsErrorTips(e);
        return false;
    }
}

//取消辅营
function cancelMarket() {
    try {
        var marketList = [];
        $(".hanui-panel-market").find("input[type='checkbox']:checked").each(function () {
            var $this = $(this);
            marketList.push($this.val());
        });
        if (marketList.length < 1) {
            _showMsg(_i18n("OW04"));
            return false;
        }

        _showConfirmTips(_i18n("OW03"), function () {
            hnaer.closeAll();
            hna.loading();
            _sendAjax(ajaxUrl.cancelMarket, {"marketList": marketList, "orderCode": _orderCode}, function (data) {
                hnaer.closeAll();
                if (data.status == "success") {
                    _showCountDownTips({
                        "tips": data.message + _i18n("OW021"),
                        "time": 2
                    }, getOrderDetail);
                } else {
                    _showMsg(data.message);
                }
            });
        });
    } catch (e) {
        JsErrorTips(e);
        return false;
    }
}

//取消保险
function continueInsurance() {
    try {
        var insuranceList = [];
        $(".hanui-panel-insurance").find("input[type='checkbox']:checked").each(function () {
            var $this = $(this);
            insuranceList.push($this.val());
        });
        if (insuranceList.length < 1) {
            _showMsg(_i18n("OW07"));
            return false;
        }

        _showConfirmTips(_i18n("OW06"), function () {
            hnaer.closeAll();
            hna.loading();
            _sendAjax(ajaxUrl.cancelInsurance, {"insuranceList": insuranceList, "orderCode": _orderCode}, function (data) {
                hnaer.closeAll();
                if (data.status == "success") {
                    _showCountDownTips({
                        "tips": data.message + _i18n("OW021"),
                        "time": 2
                    }, getOrderDetail);
                } else {
                    _showMsg(data.message);
                }
            });
        });
    } catch (e) {
        JsErrorTips(e);
        return false;
    }
}

//继续支付
function continuePayment() {
    try {
        _showConfirmTips(_i18n("OW05"), function () {
            hnaer.closeAll();
            hna.loading();
            goToPage("/airP/payment?type=content&orderCode=" + hna.compile(_orderCode));
        });
    } catch (e) {
        JsErrorTips(e);
        return false;
    }
}

//获取航班号的动态
function getFlightNumberStatus(thisP){
    try {
        var html = '<div class="view-flight hnaui-clear">';
        html += '<div class="view-content">';
        html += '<p class="tips"><i class="hnaui-icon hnaui-anim hnaui-anim-rotate hnaui-anim-loop loading-icon">&#xe63e;</i>' + _i18n("DR12") + '</p></div>';
        html += '</div>';
        hnaer.open({
            type: 1,
            content: html,
            area: ['680px', '415px'],//470
            title: false,
            //btn: [_i18n("close")],
            yes: function (index) {
                hnaer.close(index);
            },
            success: function (hnaero) {
                getFlightStatusList(hnaero , thisP);
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}
function getFlightStatusList(hnaero , thisP){
    var flightNo = thisP.html();
    var depCode = thisP.parents("td").prev().find("i:first").data("dep");
    var arrCode = thisP.parents("td").prev().find("i:last").data("arr");
    var depTime = thisP.parents("td").next().find("i:first").data("date");
    var searchData = {
        "flightNo":flightNo,
        "depCode": depCode,
        "arrCode": arrCode,
        "date":hna._date.getDateInfo(depTime).date
    };
    hna.ajax({
        url: ajaxUrl.getFlightStatusList,
        data: searchData,
        doneCallback: function (data) {
            if (data && data.code == "200") {
                if (data.data && data.data.data && data.data.data.length > 0) {
                    $(hnaero).find(".view-flight").html(createFlightNumberEl(data.data.data[0]));
                }else{
                    flightNumberNoResult(hnaero , flightNo);
                }
            }else{
                flightNumberNoResult(hnaero , flightNo);
            }
        },
        failCallback:function(){
            flightNumberNoResult(hnaero , flightNo);
        }
    });
}
function createFlightNumberEl(info){
    var company = _filterAirLine(info.ac.substr(0,2));//承运航司
    //var depDate = hna._date.getDateInfo(info.datop);//出发时间
    var depDate = hna._date.getDateInfo(info.std);//出发时间
    var depCity = getCityNameByCode(info.depStn, "name");//起飞机场
    var arrCity = getCityNameByCode(info.arrStn , "name");
    
    var html = '';
    try {
        html += '<div class="flightInfo-stroke">';
        html += '   <h3 class="hnaui-shadow">'+ (info.flightNo || '') +'&nbsp;航班动态</h3>';
        html += '   <p><span>'+ (company || '') +'</span><span>'+ (info.flightNo || '') +'</span><span>'+ (depDate.date || '') +' '+ (depDate.week || '') +'<b>出发</b></span></p>';
        html += '</div>';
        html += '<ul class="flightInfo-detail">';
        html += '   <li><p><span>飞机号：'+ (info.ac || '') +'</span><br><span class="plantype">机型：'+ (info.acType || '') +'</span></p></li>';
        html += '   <li><p><span>起飞机场：'+ (depCity || '') +'</span><br><span class="plantype">到达机场：'+ (arrCity || '') +'</span></p></li>';
        html += '   <li><p><span>计划起飞：'+ (info.std || '--') +'</span><br><span class="plantype">计划到达：'+ (info.sta || '--') +'</span></p></li>';
        html += '   <li><p><span>预计起飞：'+ (info.etd || '--') +'</span><br><span class="plantype">预计到达：'+ (info.eta || '--') +'</span></p></li>';
        html += '   <li><p><span>实际起飞：'+ (info.atd || '--') +'</span><br><span class="plantype">实际到达：'+ (info.ata || '--') +'</span></p></li>';        
        html += '   <li><p><span>航班状态：'+ (info.status || '') +'</span><br><span class="plantype">机龄：'+ (info.flightAge || '') +'</span></p></li>';
        html += '   <li><p><span>登机口：'+ (info.gate || '') +'</span><br><span class="plantype">历史上准点率：'+ (info.probability || '') +'</span></p></li>';        
        html += '</ul>';

    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
function flightNumberNoResult(hnaero , flightNo){
    $(hnaero).find(".view-flight").html('<div class="view-content"><p class="tips">未找到航班'+ (flightNo || '') +'的相关信息</p></div>');
}
