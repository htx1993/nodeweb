//拼接页面信息
function createRefundTicketsEl(data) {
    try {
        _guestsList = data.guests || [];
        var html = '';
        html += createOrderCode(data.orderNo || _orderCode);
        html += createRefundDetails();
        html += createInvoluntaryRefundEl();
        $('.search-result').html(html).show();
        $(".search-submit").replaceWith(createSubmitBtnEl());
        hna.goToTop("1");

        if (!(data.status == "REFUNDED" || data.status == "CANCELLED")) {
            setNextBtnStep("1");
        } else {
            setNextBtnStep("3");
        }

        //如果表体里面都是已经退票了的，则把表头上的复选框设置为不可选状态
        //如果表体里面没有任何复选框，则把下面的按钮都隐藏，追加显示返回按钮，返回到订单详情页面
        var checkboxLen = $(".hnaui-order-info tbody").find("input[type='checkbox']").length;
        if (checkboxLen < 1) {
            $(".hnaui-order-info thead").find("input[type='checkbox']").prop("disabled", true);
            setNextBtnStep("3");
        }

        renderFrom();
        initCheckbox();
        initSelect();
        hna.verifyForm();
    } catch (e) {
        JsErrorTips(e);
    }
}
//创建退票展示页
function createRefundDetails() {
    try {
        var num = 0;
        var RefundTitle = [_i18n("OR12"), _i18n("OR51"), _i18n("OR13"), _i18n("OR52"), _i18n("OR14"), _i18n("OR15"), _i18n("OR16")];
        var html = '';
        html += '<div class="hnaui-panel hnaui-order-info hnaui-shadow">';
        html += '   <div class="hnaui-panel-title"><i class="hnaui-icon">&#xe90c;</i>' + _i18n("OR50") + '</div>';
        html += '   <table class="hnaui-panel-content hnaui-table hnaui-table-mobile hnaui-form">';
        html += '       <thead>';
        html += '       <tr>';
        html += '       <th>' + _i18n("OR12") + '</th>';
        html += '       <th>' + createCheckbox({"flag": "all"}) + '</th>';
        html += '       <th>' + _i18n("OR51") + '</th>';
        html += '       <th>' + _i18n("OR13") + '</th>';
        html += '       <th>' + _i18n("OR52") + '</th>';
        html += '       <th>' + _i18n("OR14") + '</th>';
        html += '       <th>' + _i18n("OR15") + '</th>';
        html += '       <th>' + _i18n("OR16") + '</th>';
        html += '       </tr>';
        html += '       </thead>';
        html += '       <tbody>';
        (_guestsList || []).forEach(function (item, index) {
            num++;
            var rowCount = item.paxs.length;
            html += '   <tr>';
            html += createTdEl({text: item.guestFirstName? getFullName(item.guestFirstName,item.guestLastName) : item.name + "<br>" + _filterPassType(item.type), title: RefundTitle[0], rowSpan: rowCount});

            (item.paxs || []).forEach(function (subItem, subIndex) {
                html += subIndex > 1 ? '<tr>' : '';
                html += createTdEl({
                    text: subItem.ticketStatus == "OPEN" ? createCheckbox({
                        "value": subItem.id,
                        "index": index + "_" + subIndex
                    }) : "--",
                    title: _i18n("OR18")
                });
                html += createTdEl({text: subItem.flightNo || "--", title: _i18n("OR51")});

                if(getCityNameByCode(subItem.org,"other")){
                    _isDomestic = "Y";
                }
                if(getCityNameByCode(subItem.dst,"other")){
                    _isDomestic = "Y";
                }
                html += createTdEl({
                    text: "<i class='hnaui-icon'>&#xe90f;</i>" + (getCityNameByCode(subItem.org) || '--') + '</br>' + "<i class='hnaui-icon'>&#xe910;</i>" + (getCityNameByCode(subItem.dst) || "--"),
                    title: RefundTitle[2]
                });
                html += createTdEl({
                    text: "<i class='hnaui-icon'>&#xe60e;</i>" + subItem.flightDate || "--",
                    title: _i18n("OR52")
                });
                html += createTdEl({text: subItem.ticketNo || "--", title: RefundTitle[4]});
                html += createTdEl({
                    text: isTrfund(_filterTicketState(subItem.ticketStatus) || "--"), title: RefundTitle[5]
                });
                //html += createTdEl({text: subItem.refundRule || "--", title: RefundTitle[6]});
                //html += createTdEl({text: createTaxFareFamilyEl({title:"查看退票政策",refundRule:getRefundRule("VOLUNTARY")},"refund") || "--", title: RefundTitle[6]});
                html += createTdEl({text: createTaxFareFamilyEl({title:"查看退票政策（当前舱位："+subItem.cabin+"舱）",refundRule:subItem.refundRule || "--"},"refund") || "--", title: RefundTitle[6]});
                html += '</tr>';
            });

        });
        html += '       </tbody>';
        html += '   </table>';
        html += refundDescription();
        html += '</div>';
        html += '<div class="hnaui-panel hnaui-refund-cost hnaui-shadow"></div>';
        if (num < 1) {
            return '';
        } else {
            return html;
        }

    } catch (e) {
        JsErrorTips(e);
        return '';
    }
}
function isTrfund(code) {
    if (code == _i18n("OR53") || code == _i18n("OR54")) {
        return "<strong style='color: red'>" + code + "</strong>";
    } else {
        return code;
    }

}
function createTdEl(o) {
    try {
        if (!o) {
            return "";
        }
        var cs = o.colSpan ? ' colspan="7"' : '';
        var rs = o.rowSpan ? ' rowspan=' + o.rowSpan + '' : '';
        return '<td' + cs + ' ' + rs + ' ><div class="td-text">' + (o.text || "") + '</div><div class="td-title">' + (o.title || "") + '</div></td>';

    } catch (e) {
        JsErrorTips(e);
        return '';
    }
}
function createCheckbox(o) {
    try {
        if (!o) {
            o = {};
        }
        var filter = "oneChoose";
        if (o.flag == "all") {
            filter = "allChoose";
        }
        return '<input type="checkbox" name="' + filter + '" hna-skin="primary" hna-filter="' + filter + '" value="' + (o.value || "") + '" data-index="' + (o.index || "") + '">';

    } catch (e) {
        JsErrorTips(e);
        return '';
    }
}

//创建按钮取
function createSubmitBtnEl() {
    try {
        var html = '';
        html += '<div class="search-submit hnaui-form hnaui-clear">';
        html += '   <div class="hnaui-btn hnaui-btn-theme hnaui-btn-model back-btn click-btn" >' + _i18n("OR24") + ' <i class="hnaui-icon">&#xe922;</i></div>';
        html += '   <div class="hnaui-btn hnaui-btn-theme hnaui-btn-model next-btn click-btn hnaui-btn-disabled hnaui-right">' + _i18n("OR26") + ' <i class="hnaui-icon">&#xe610;</i></div>';
        html += '   <div class="hnaui-form-item refund-type-select">';
        html += '       <label class="hnaui-form-label">' + _i18n("OR25") + '</label>';
        html += '       <div class="hnaui-input-block">';
        html += '           <select name="refundType" hna-filter="refundType" >';
        (_refundTypeList || []).forEach(function (item) {
            html += '           <option value="' + (item.code || "") + '">' + (item.name || "--") + '</option>';
        });
        html += '           </select>';
        html += '       </div>';
        html += '   </div>';
        html += '</div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return '';
    }
}

//创建费用展示
function createRefundCostDetail(obj) {
    try {
        var typeList = [_i18n("OR19"), _i18n("OR20")];
        var html = '';
        var o = obj.data || {};
        html += '<div class="hnaui-panel-title"><i class="hnaui-icon">&#xe90c;</i>' + _i18n("OR21") + '</div>';
        html += '<p class="hnaui-total-price">';
        //旅客费用总额
        html += '<span> ' + _i18n("OR22") + ' <strong>（' + _formatMoney(o.totalPrice || 0) + '）</strong></span>';
        //应扣机票手续费
        html += '<em>-</em><span>' + _i18n("OR27") + '<strong>（' + _formatMoney(o.ticketPoundage || 0) + '）</strong></span>';
        //应扣辅营费用
        html += '<em>-</em><span>' + _i18n("OR23") + '<strong>（' + _formatMoney(o.totalOtherPoundage || 0) + '）</strong></span>';
        //应退总额
        html += '<em>=</em><span>' + _i18n("OR28") + '<strong>（' + _formatMoney(parseFloat((o.totalRefundMoney || 0)+"") - parseFloat((o.totalMerchantMoney || 0) + "")) + '）</strong></span>';
        //支付处理费
        //html += '<em>+</em><span>' + _i18n("OR29") + '<strong>（' + _formatMoney(o.totalMerchantMoney || 0) + '）</strong></span>';
        html += '</p>';
        html += '<table class="hnaui-panel-content hnaui-table hnaui-table-mobile">';
        html += '<tbody>';
        html += '<tr>';
        html += '<td>';
        html += '<ul>';
        html += '<li class="tit">' + typeList[0] + '</li>';
        //应退机票费用
        html += '<li class="hnaui-clear"><span>' + _i18n("OR30") + '</span><dfn>' + _formatMoney(parseFloat((o.ticketRefundMoney || 0)+"") - parseFloat((o.totalMerchantMoney || 0) + "")) + '</dfn></li>';
        //票价
        html += '<li class="hnaui-clear"><span>' + _i18n("OR31") + '</span><dfn>' + _formatMoney(o.totalMarketPrice || 0) + '</dfn></li>';
        //应扣机票手续费
        html += '<li class="hnaui-clear"><span>' + _i18n("OR32") + '</span><dfn>' + _formatMoney(o.ticketPoundage || 0) + '</dfn></li>';
        //民航发展基金
        ( o.paxSegTaxFeeVos || []).forEach(function (item, index) {
            html += '           <li class="hnaui-clear"><span>' + item.taxFeeDesc + '：</span><dfn>' + _formatMoney(item.taxFeeAmount || 0) + '</dfn></li>';
        });
        //其他
        html += '<li class="hnaui-clear"><span>' + _i18n("OR33") + '</span><dfn>' + _formatMoney(o.totalUntypeAncillaryMoney || 0) + '</dfn></li>';
        html += '</ul>';
        html += '</td>';
        html += '<td>';
        html += '<ul>';
        html += '<li class="tit">' + typeList[1] + '</li>';
        //应退还辅营产品金额
        html += '<li class="hnaui-clear"><span>' + _i18n("OR34") + '</span><dfn>' + _formatMoney(o.totalOtherRefundMoney || 0) + '</dfn></li>';
        //行李
        html += '<li class="hnaui-clear"><span>' + _i18n("OR35") + '</span><dfn>' + _formatMoney(o.totalBagsMoney || 0) + '</dfn></li>';
        //贵宾厅
        //html += '<li class="hnaui-clear"><span>' + _i18n("OR36") + '</span><dfn>' + _formatMoney(o.totalLuggagePrice || 0) + '</dfn></li>';
        //机上餐食
        html += '<li class="hnaui-clear"><span>' + _i18n("OR37") + '</span><dfn>' + _formatMoney(o.totalMealsMoney || 0) + '</dfn></li>';
        //机上舒适设施
        //html += '<li class="hnaui-clear"><span>' + _i18n("OR38") + '</span><dfn>' + _formatMoney(o.totalSuitMoney || 0) + '</dfn></li>';
        //选座
        //html += '<li class="hnaui-clear"><span>' + _i18n("OR39") + '</span><dfn>' + _formatMoney(o.totalSeatMoney || 0) + '</dfn></li>';
        //短信服务费
        //html += '<li><span>' + _i18n("OR40") + '</span><dfn>' + _formatMoney(o.totalSmsMoney || 0) + '</dfn></li>';
        //权益包
        //html += '<li><span>' + _i18n("OR41") + '</span><dfn>' + _formatMoney(o.totalConvenientMoney || 0) + '</dfn></li>';
        //支付处理费
        //html += '<li><span>' + _i18n("OR56") + '</span><dfn>' + _formatMoney(o.totalMerchantMoney || 0) + '</dfn></li>';
        //航班意外险
        //html += '<li><span>' + _i18n("OR42") + '</span><dfn>' + _formatMoney(o.totalLifeMoney || 0) + '</dfn></li>';
        //航班延误险
        //html += '<li><span>' + _i18n("OR43") + '</span><dfn>' + _formatMoney(o.totalDelayMoney || 0) + '</dfn></li>';
        //退票损失险
        //html += '<li><span>' + _i18n("OR44") + '</span><dfn>' + _formatMoney(o.totalRefundInsuranceMoney || 0) + '</dfn></li>';
        //其他
        html += '<li class="hnaui-clear"><span>' + _i18n("OR45") + '</span><dfn>' + _formatMoney(o.totalUntypeAncillaryMoney || 0) + '</dfn></li>';
        html += '</ul>';
        html += '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        $('.hnaui-refund-cost').html(html).show();
    } catch (e) {
        JsErrorTips(e);
    }
}

//创件确认警告
function createAlert() {
    try {
        var html = '';
        html += '       <p><b>' + _i18n("OR46") + '</b></p>';
        html += '       <table class="hnaui-table hnaui-table-mobile">';
        html += '           <thead><tr>';
        html += '               <th>' + _i18n("OR47") + '</th><th>' + _i18n("OR48") + '</th><th>' + _i18n("OR55") + '</th>';
        html += '           </tr></thead>';
        html += '           <tbody>';
        var $checkbox = $("input[name='oneChoose']:checked").each(function () {
            var $this = $(this);
            var arr = ($this.data("index") || "").split("_");
            var info = _guestsList[arr[0]].paxs[arr[1]];
            var nameStr = info.name;
            var flightStr = getCityNameByCode(info.org) + "-" + getCityNameByCode(info.dst) + " " + info.flightNo + " " + info.flightDate;
            html += '       <tr>';
            html += createTdEl({
                text: nameStr,
                title: _i18n("OR47")
            });
            html += createTdEl({text: flightStr, title: _i18n("OR48")});
            html += createTdEl({text: _currentRefund || "", title: _i18n("OR55")});
            html += '       </tr>';
        });
        html += '           </tbody>';
        html += '       </table>';
        html += refundTips();

        return html;
    } catch (e) {
        JsErrorTips(e);
        return '';
    }
}

function getRefundRule(type){
    var html = '';
    try{
        if(type == "VOLUNTARY"){
            html += '退票费：航班计划离站时间14天（含）外 - 5%；       ↵<br>航班计划离站时间14天（不含）内至航班计划离站时间7天（含）外 - 20%；       ↵<br>航班计划离站时间7天（不含）内至航班计划离站时间72小时（含）外 - 30%；       ↵<br>航班计划离站时间72小时（不含）内至航班计划离站时间24小时（含）外 - 50%；       ↵<br>航班计划离站时间24小时（不含）内至航班计划离站时间4小时（含）外 - 80%；       ↵<br>航班计划离站时间4小时（不含）内及航班计划离站时间后，收取票面100%退票费，即不得自愿退票。';
        }else{
            if(_isDomestic == "Y"){
                html += '退票政策：符合西部航空现行<a href="http://www.westair.cn/portal/travelHelpContent.html?menu=IR" target="_blank" class="a-link">《非自愿退改签》</a>、<a href="http://www.westair.cn/portal/travelHelpContent.html?menu=btxz" target="_blank" class="a-link">国际航班旅客因病退票管理规定》</a>《等业务规定中所列明的可免收退票手续费的情况，免收退票手续费。';
            }else{
                html += '退票政策：符合西部航空现行<a href="http://www.westair.cn/portal/travelHelpContent.html?menu=DF" target="_blank" class="a-link">《非自愿退改签》</a>、<a href="http://www.westair.cn/portal/travelHelpContent.html?menu=Over" target="_blank" class="a-link">《航班超售管理规定》</a>、<a href="http://www.westair.cn/portal/travelHelpContent.html?menu=btxz" target="_blank" class="a-link">《国内航班旅客因病退票管理规定》</a>等业务规定中所列明的可免收退票手续费的情况，免收退票手续费。';
            }
        }
    }catch(e){
        JsErrorTips(e);
        html = '';
    }
    return html;
}