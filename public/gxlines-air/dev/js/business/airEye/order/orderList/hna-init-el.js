//创建列表面板
function createOrderListPanelEl() {
    try {
        var html = '<div class="hnaui-panel">';
        html += '       <div class="hnaui-panel-title"><i class="hnaui-icon">&#xe90c;</i>' + _i18n("OL01") + '</div>';
        html += '       <div class="hnaui-panel-content order-list-panel"></div>';
        html += '   </div>';
        $(".search-result").html(html).show();
    } catch (e) {
        JsErrorTips(e);
        return false;
    }
}
//创建查询订单的面板
function createOrderSearchBoxEl() {
    try {
        var o = {};
        o.firstName = {"eleType": "firstName","value":from.firstName ? from.firstName:''};
        o.lastName = {"eleType": "lastName","value":from.lastName ? from.lastName:''};
        o.flightNumber = {"eleType": "flightNumber","value":from.flightNumber ? from.flightNumber:''};
        o.ticketNo = {"eleType": "ticketNo","value":from.ticketNo ? from.ticketNo:''};
        o.orderNo = {"eleType": "orderNo","value":from.orderNo ? from.orderNo:''};
        o.orderBeginDate = {"eleType": "orderBeginDate","value":from.orderBeginDate ? from.orderBeginDate:getCurrentMonthFirst()};
        o.orderEndDate = {"eleType": "orderEndDate","value":from.orderEndDate ? from.orderEndDate:''};


        //var html = '<div class="hnaui-panel-title"><i class="hnaui-icon">&#xe615;</i>' + _i18n("OL02") + '</div>';
        var html = '       <form class="hnaui-form hnaui-form-pane hnaui-panel-content p-panel" id="searchOrder">';
        html += '           <div class="hnaui-form-item">';
        html += '               <div class="row">';
        html += '                   <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 input-icon input-userName">';
        html += createInputEl(o.lastName);
        html += createInputEl(o.firstName);
        html += '                   </div>';
        html += '                   <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 input-icon">';
        html += createInputEl(o.flightNumber);
        html += '                   </div>';
        html += '                   <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 input-icon">';
        html += createInputEl(o.ticketNo);
        html += '                   </div>';
        html += '                   <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 input-icon">';
        html += createInputEl(o.orderNo);
        html += '                   </div>';
        html += createOrderStateEl();
        html += createDateEl(o.orderBeginDate);
        html += createDateEl(o.orderEndDate);
        html += createSearchBtnEl();
        html += '               </div>';
        html += '           </div>';
        html += '       </form>';
        $(".search-box").html(html).show();
        $(".search-loading").hide();
        $(".container_left").css("minHeight", "240px");

        renderFrom();
        initDate();
        initInput();
    } catch (e) {
        JsErrorTips(e);
    }
}
//创建普通文本输入框控件
function createInputEl(obj) {
    try {
        var o = new ControlElem(obj);
        //o.required = o.required === false ? "N" : "Y";
        o.required = false;

        if (o.eleType == "firstName") {
            // o.title = "乘客名字";
            o.title = _i18n("OD03");
            o.verify = "Pname";
        } else if (o.eleType == "lastName") {
            // o.title = "乘客姓氏";
            o.title = _i18n("OD04");
            o.verify = "Pname";
        }

        for (var a = 0, a1 = _verificationElemList.length; a < a1; a++) {
            var item = _verificationElemList[a];
            if (item.type == o.verify) {
                if (!o.title) {
                    o.title = (item.title || "") + (item.format ? "（" + item.format +"）" : "");
                }
                if (!o.maxLen || item.maxLen != 50) {
                    o.maxLen = item.maxLen || "";
                }
                if (!o.icon) {
                    o.icon = item.icon || "";
                }
                break;
            }
        }

        var html = '    <div class="hnaui-input-inline">';
        //html += '           <input type="text" hna-verify="' + o.verify + '" name="' + o.name + '" autocomplete="off" class="hnaui-input ' + o.classStr + '" data-placeholder="' + o.placeholder + '" maxlength="' + o.maxLen + '" ' + o.readonly + ' value="' + o.value + '" hna-required="' + o.required + '" hna-title="' + o.title + '" hna-icon="' + o.icon + '">';
        html += _createStandardInputEl(o, true);
        html += '       </div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}

//创建日期文本框控件
function createDateEl(o) {
    var html = '';
    try {
        if (!o) {
            o.eleType = "orderBeginDate";
        }
        var defaultTitle = _i18n("OD01");
        if (o.eleType == "orderEndDate") {
            defaultTitle = _i18n("OD02");
        }
        html = '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 input-icon">';
        html += '       <div class="hnaui-input-inline">';
        html += '           <input type="text" name="' + o.eleType + '" hna-verify="departureDate" autocomplete="off" class="hnaui-input o-date" hna-title="' + defaultTitle + '" hna-icon="&#xe637;" value="'+(o.value)+'">';
        html += '       </div>';
        html += '   </div>';

    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建订单状态下拉框
function createOrderStateEl() {
    var html = '';
    try {
        var defaultTitle = _i18n("OT11");
        html = '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 input-icon">';
        html += '            <div class="hnaui-input-inline">';
        html += '                <select name="orderState" hna-filter="guestTypes" hna-title="' + defaultTitle + '">';
        html += '                   <option value=" ">' + _i18n("OI01") + '</option>';
        (_orderStateList || []).forEach(function (item) {
            html += '             <option '+(from.orderState==item.code?'selected':'')+' value="' + (item.code || "") + '">' + (item.name || "") + '</option>';
        });
        html += '             </select>';
        html += '            </div>';
        html += '        </div>';

    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建查询按钮
function createSearchBtnEl() {
    var html = '';
    try {
        html = '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 input-icon hnaui-right">';
        html += '       <div class="hnaui-input-inline hnaui-push-right">';
        html += '           <div id="search-btn" class="hnaui-btn hnaui-btn-theme search-btn click-btn" hna-submit hna-filter="formSearchOrder">' + _i18n("OL02") + '<i class="hnaui-icon">&#xe615;</i></div>';
        html += '       </div>';
        html += '   </div>';

    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}