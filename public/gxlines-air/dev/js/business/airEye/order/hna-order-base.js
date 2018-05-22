hna._i18nMap.addLanguages({
    "C01": {"zh_CN": "预订内容", "en_US": "Shopping Cart"},
    "OT01": {"zh_CN": "乘客姓", "en_US": "Shopping Cart"},
    "OT012": {"zh_CN": "乘客名", "en_US": "Shopping Cart"},
    "OT02": {"zh_CN": "航班号", "en_US": "Shopping Cart"},
    "OT03": {"zh_CN": "票号", "en_US": "Shopping Cart"},
    "OT04": {"zh_CN": "订单号", "en_US": "Shopping Cart"},
    "OT05": {"zh_CN": "序号", "en_US": "Shopping Cart"},
    "OT06": {"zh_CN": "航班号", "en_US": "Shopping Cart"},
    "OT08": {"zh_CN": "起飞日期", "en_US": "Shopping Cart"},
    "OR10": {"zh_CN": "我的订单", "en_US": "Shopping Cart"},
    "OR11": {"zh_CN": "您的订单号：", "en_US": "Shopping Cart"},
    "OR12": {"zh_CN": "去程", "en_US": "Shopping Cart"},
    "OR13": {"zh_CN": "返程", "en_US": "Shopping Cart"},
    "OR14": {"zh_CN": "第{0}航段", "en_US": "Shopping Cart"},
    "OR15": {"zh_CN": "新日期", "en_US": "Shopping Cart"},
    "OR16": {"zh_CN": ",请点击\"确认\"按钮，跳转到订单查询页面！", "en_US": "Shopping Cart"},
    "OR17": {"zh_CN": "支付出票中, {0}秒后可操作订单！", "en_US": "Shopping Cart"}
});


function getOrderCodeBuyUrl(){
    return hna.uncompile((hna.getRequest() || {}).orderCode || "");
}
function getOtaIDBuyUrl(){
    return hna.uncompile((hna.getRequest() || {}).otaID || "");
}

//提交ajax请求
function _sendAjax(url, info, callback, flag) {
    try {
        hna.ajax({
            url: url,
            data: info || {},
            loading: flag || "hide",
            doneCallback: function (data) {
                hnaer.closeAll();
                if (data && data.code == "200") {
                    if (hna.isFunction(callback)) {
                        callback(data.data || {});
                    }
                }
            }
        });
    } catch (e) {
        JsErrorTips(e);
        return false;
    }
}


//航段标题
function getTripTitle(tripType, index) {
    try {
        var tripTitle = "";
        var dateTitle = "";
        var dateCla = "";
        if (tripType == "OW") {
            tripTitle = _i18n("OR12");
            //dateTitle = "新的出行日期";
        } else if (tripType == "RT") {
            if (index == 0) {
                tripTitle = _i18n("OR12");
                //dateTitle = "新的出行日期";
            } else if (index > 0) {
                tripTitle = _i18n("OR13");
                //dateTitle = "新的返程日期";
            }
        } else {
            tripTitle = _i18n("OR14",parseInt(index + "", 10) + 1);
            //dateTitle = "第" + (parseInt(index + "", 10) + 1) + "航段新日期 ";
        }
        dateTitle = _i18n("OR15");
        var dateName = "date_" + index;
        return {
            "tripTitle": tripTitle,
            "dateTitle": dateTitle,
            "dateName": dateName
        };
    } catch (e) {
        JsErrorTips(e);
        return {};
    }
}

//过滤日期
function filterDate(date) {
    try {
        return (date + "").replace("T", " ");
    } catch (e) {
        JsErrorTips(e);
        return date;
    }
}

//订单错误的提示
function showOrderErrorTips(tips, callback){
    _showSuccessTips(tips + _i18n("OR16") ,function(){
        goToPage("/airEye/order/orderList");
    });
    //_showCountDownTips({
    //    "tips":tips + "，{0}秒后跳转到订单查询页面！",
    //    "time":5
    //},function(){
    //    goToPage("/airEye/order/orderList");
    //});
}


//订单锁定提示框
function showOrderLockTips(countDownTime, callback) {
    try {
        if (!countDownTime) {
            return false;
        }
        _showCountDownTips({
            "tips":_i18n("OR17"),
            "time":countDownTime
        },callback);

    } catch (e) {
        JsErrorTips(e);
        return false;
    }
}
//创建订单号
function createOrderCode(code) {
    try {
        var html = '';
        //html += '<div class="hnaui-panel hnaui-order-code hnaui-shadow">';
      //  html += '   <div class="hnaui-panel-title"><i class="hnaui-icon">&#xe90c;</i>' + _i18n("OR10") + '</div>';
        html += '   <div class="hna-order-num">';
        html += '       <p>' + _i18n("OR11") + '<strong class="subcolor">' + code + '</strong></p>';
        html += '   </div>';
       // html += '</div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return '';
    }
}


//创建税费表，ff权标展示表
function createTaxFareFamilyEl(o, flag, arr, bl) {
    var html = '';
    try {
        var tableEl = "";
        if (flag == "tax") {
            var taxPrice = 0;
            tableEl = createTaxFareFamilyTable(o, flag);
            html += '<div class="hna-tax"><span class="active">' + _i18n("OT49") + _formatMoney(taxPrice) + '</span>';
        } else if (flag == "fareFamilyName") {
            if (bl) {
                tableEl = createTaxFareFamilyTable(arr, flag);
            } else {
                tableEl = createTaxFareFamilyTable(getFreFamilieInfo((o.fareFamilyCode || o.code), arr), flag);
            }
            html += "<div class='hna-tax hna-ff'><span>" + (o.fareFamilyName || o.name) + "</span><br/><b>退改签规则</b>";

        } else if (flag == "travellerPrice") {
            tableEl = createTaxFareFamilyTable(arr, flag);
            html += '<div class="hna-tax hna-traveller-price"><span class="active">' + _formatMoney(o.ticketAmount) + '</span>';
        } else if (flag == "refund") {
            tableEl = createTaxFareFamilyTable(o.refundRule, flag);
            html += '<div class="hna-tax hna-ff"><span class="active">' + o.title + '</span>';
        }

        if (tableEl) {
            html += "<div class='tax-table hnaui-shadow'>";
            html += "   <i class='hnaui-icon'>&#xe623;</i>";
            html += "   <div class='hnaui-tax-detail'>";
            html += tableEl;
            html += "   </div>";
            html += "</div>";
        }
        html += '</div>';

    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    function getFreFamilieInfo(code, arr) {
        var ffArr = [];
        for (var a = 0, a1 = (arr || []).length; a < a1; a++) {
            if (arr[a].code == code) {
                ffArr = arr[a].benefits;
                break;
            }
        }
        return ffArr;
    }

    function createTaxFareFamilyTable(arr, flag) {
        var subHtml = '';
        try {
            if (flag == "tax") {
                ( arr || []).forEach(function (item, index) {
                    subHtml += '<dl><dt class="hnaui-elip">' + item.name + '：</dt><dd><dfn>' + _formatMoney(item.amount) + '</dfn></dd></dl>';
                    taxPrice += parseFloat(item.amount + "");
                });
            } else if (flag == "fareFamilyName") {
                ( arr || []).forEach(function (item, index) {
                    subHtml += "<p>" + (index + 1) + "，" + (item.text || "").replace(/\<br\>/g, "") + "</p>";
                });
            } else if (flag == "travellerPrice") {
                ( arr || []).forEach(function (item, index) {
                    subHtml += '<p>' + item.count + (_filterPassType(item.travelerType) + "*" + _formatMoney(item.totalFare, item.totalFareCurrency)) + '';
                    subHtml += '    <span class="hnaui-right">总价' + _formatMoney(parseFloat(item.count + "") * parseFloat(item.totalFare + ""), item.totalFareCurrency) + '</span>';
                    subHtml += '</p>';
                });
            } else if (flag == "refund") {
                subHtml += '<p class="voluntary">'+ (arr || "") +'</p>';
                subHtml += '<p class="involuntary"></p>';
            }
        } catch (ev) {
            JsErrorTips(ev);
            subHtml = '';
        }
        return subHtml;
    }

    return html;
}


$(function () {
    //页面弹出框（税费和退票进度）
    $(document).on('mouseover', '.hna-tax', function (e) {
        e.stopPropagation();
        try {
            var $this = $(e.target);
            var $tdText = $this.parents(".td-text");
            $tdText.find(".tax-table").show();
            $tdText.find(".hnaui-audit-process").show();
        } catch (ev) {
            JsErrorTips(ev);
        }
    });
    $(document).on('mouseleave', '.hna-tax', function (e) {
        e.stopPropagation();
        try {
            var $this = $(e.target);
            var $tdText = $this.parents(".td-text");
            $tdText.find(".tax-table").hide();
            $tdText.find(".hnaui-audit-process").hide();
        } catch (ev) {
            JsErrorTips(ev);
        }
    });
});