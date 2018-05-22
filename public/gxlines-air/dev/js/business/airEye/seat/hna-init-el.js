//页面DOM初始化
function createInitEl() {
    var html = createFlightInfoEl();
    html += createSeatContentEl();
    html += createSubmitBtnEl();
    html += createOperationInstructionsEl();
    $("." + classList[4]).hide();
    $(".search-result").html(html).show();

    renderFrom();
    initRadio();

    HNAChooseSeat.init({
        ajaxUrl:isMMB?ajaxUrl.getMMBSeatMapInfo:ajaxUrl.getSeatMapInfo,
        titleId:"currentFlightTitle",
        id:"currentFlightSeat",
        chooseSeatCallback:function(seatInfo){
            var bl = false;
            var info = hna.cloneObj(seatInfo);
            for(var a= 0,a1= _hasChooseData.length;a<a1;a++){
                if(_hasChooseData[a].flightSegmentId == info.flightSegmentId){
                    if(info.seatInfo){
                        _hasChooseData[a] = info;
                    }else{
                        _hasChooseData.splice(a,1);
                    }
                    bl = true;
                    break;
                }
            }
            if(!bl){
                _hasChooseData.push(info);
            }

            $(".seat-mmb-btn").toggleClass("hnaui-btn-disabled",_hasChooseData.length != _fInfo.length);
            $(".seat-product-btn").toggleClass("hnaui-btn-disabled",_hasChooseData.length != _fInfo.length);
        },
        cancelChooseSeatCallback:function(){
            goToPage("/airEye/order/orderDetail?orderCode=" + _orderCode);
        }
    });

    //模拟点击
    setTimeout(function () {
        $("input[name='currentFlight']").first().siblings(".hnaui-form-radio").trigger("click");
    }, 10);
}
//创建航班信息模块El
function createFlightInfoEl() {
    try {
        var html = '<div class="hnaui-panel hnaui-shadow">';
        html += '<div class="hnaui-panel-title"><i class="' + (classList[1]) + '"></i>航班信息</div>';
        html += '<table class="hnaui-panel-content hnaui-table hnaui-table-mobile table-flight-info">';
        html += '<thead><tr><th>航班号</th><th>航班日期</th><th>起点</th><th>终点</th><th>票价类型</th><th>舱位</th><th>机型</th></tr></thead>';
        html += '<tbody>';
        (_fInfo || []).forEach(function (item, index) {
            html += '<tr>';
            html += '<td>';
            html += '   <div class="' + classList[2] + '"><input type="radio" name="currentFlight" hna-filter="currentFlight" value="' + index + '" title="' + (item.flightNumber) + '"></div>';
            html += '   <div class="' + classList[3] + '">航班号</div>';
            html += '</td>';
            html += '<td>';
            html += '   <div class="' + classList[2] + '">'+(hna._date.getDateInfo(item.departureDate).date)+'</div>';
            html += '   <div class="' + classList[3] + '">航班日期</div>';
            html += '</td>';
            html += '<td><div class="' + classList[2] + '">' + getCityNameByCode(item.departureAirportCode || "") + '(' + (item.departureAirportCode || "") + ')</div><div class="' + classList[3] + '">起点</div></td>';
            html += '<td><div class="' + classList[2] + '">' + getCityNameByCode(item.arrivalAirportCode || "") + '(' + (item.arrivalAirportCode || "") + ')</div><div class="' + classList[3] + '">终点</div></td>';
            html += '<td><div class="' + classList[2] + '">' + (item.fareFamilyName || "--") + '</div><div class="' + classList[3] + '">票价类型</div></td>';
            html += '<td><div class="' + classList[2] + '">' + (item.desigCode || "") + '</div><div class="' + classList[3] + '">舱位</div></td>';
            html += '<td><div class="' + classList[2] + '">' + (item.aircraftCode || "") + '</div><div class="' + classList[3] + '">机型</div></td>';
            html += '</tr>';
        });
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}
//创建选择座位功能模块El
function createSeatContentEl() {
    try {
        var html = '<div class="hnaui-flight-seat hnaui-panel hnaui-shadow">';
        html += '       <div class="hnaui-panel-title"><i class="hnaui-icon"></i><span id="currentFlightTitle"></span></div>';
        html += '       <div class="hnaui-seat-content hnaui-panel-content">';
        html += createLoading();
        html += '           <div class="hnaui-seat-item  hnaui-clear hnaui-show" id="currentFlightSeat"></div>';
        html += '       </div>';
        html += '   </div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}
//创建操作说明模块
function createOperationInstructionsEl() {
    var html = '<div class="hnaui-collapse hnaui-shadow">';
    html += '<div class="hnaui-colla-item">';
    html += '<h2 class="hnaui-colla-title">机上座位预订服务规则说明</h2>';
    html += '<div class="hnaui-colla-content hnaui-show">';
    html += '<p> 1、提前选座，是指在订座系统中提前预选飞机上的座位，选座后还需值机，请您至少于航班起飞前90分钟到达各机场人工柜台处办理值机。</p>';
    html += '<p> 2、您预选的机上座位，我们会尽量为您保留。由于办理的时间离航班起飞时间较远，如遇特殊情况，座位可能会被调整或取消。</p>';
    html += '<p> 3、网上选座购买仅限航班起飞36小时前。</p>';
    html += '<p> 4、选座后，所选座位服务不可以在网上进行单独变更，只可在订单中取消已选座位。</p>';
    html += '<p> 5、可选座的座位在选座布局图中会做出明确的标识，有上锁标识的座位是不可选择的。</p>';
    html += '<p> 6、如有特殊情况请联系西部航空7*24小时热线{0}。</p>'.format(_tel);
    html += '<p> 7、选座适用旅客：成人和儿童（对于病患、担架、残疾、孕妇、携带婴儿的旅客等特殊旅客暂不提供网上选座服务）。</p>';
    html += '<p> 8、根据中国民用航空局规定，如果您选择紧急出口座位，需在15周岁以上，65周岁（不含）以下，具备人事行为能力，愿意并有能力履行相应义务。</p>';
    html += '<p> 9、由于安全载重平衡要求，个别旅客会产生所选座位与实际发放座位不一致情况，请以现场实际发放座位为准。</p>';
    html += '<p>本声明最终解释权归西部航空有限责任公司所有。</p>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    return html;
}

//创建继续购票按钮
function createSubmitBtnEl() {
    var html = "";
    try {
        html += '<div class="submit-btn-panel hnaui-push-right">';
        if(isMMB){
            html += '   <p class="hnaui-btn hnaui-btn-primary order-detail-btn click-btn">暂不选座，返回订单详情页</p>';
            html += '   <p class="hnaui-btn hnaui-btn-theme seat-mmb-btn click-btn hnaui-btn-disabled">座位选好了，去支付</p>';
        }else{
            html += '   <p class="hnaui-btn hnaui-btn-primary product-btn click-btn">暂不选座，去选择增值服务</p>';
            html += '   <p class="hnaui-btn hnaui-btn-theme seat-product-btn click-btn hnaui-btn-disabled">座位选好了，去选择增值服务</p>';
        }
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}

//创建加载动画
function createLoading() {
    var html = '<div class="' + classList[4] + '">';
    html += '       <div class="' + classList[4] + '-content">';
    html += '           <i class="' + classList[1] + ' hnaui-anim hnaui-anim-rotate hnaui-anim-loop loading-icon"></i>数据加载中，请稍后...';
    html += '       </div>';
    html += '   </div>';
    return html;
}

//创建弹窗，信息确认的内容1
function createOrderGeneration() {
    try {
        if (_hasChooseData.length <= 0) {
            return false;
        }

        var html = '';
        html += '<div class="hnaui-order-generation" style="display: none;">';
        html += '   <div class="gencontent hnaui-shadow">';
        html += '       <div class="gencontent-content">';
        //html += '       <h3 class="order-code" style="visibility: hidden;">订单正在生成中<i class="hnaui-icon hnaui-anim hnaui-anim-rotate hnaui-anim-loop loading-icon">&#xe63e;</i></h3>';


        if (isMMB) {
            html += '           <h3 class="order-code">准备支付，请确认信息<span style="display: none;">'+_orderCode+'</span></h3>';
            if (_hasChooseData.length > 0) {
                html += '           <p class="tit"><span>请确认选择的座位信息</span></p>';
                _fInfo.forEach(function (item,index) {
                    var tripeTitle = hna._processData.getTripTitle(index, item.departureAirportCode);
                    var flightTitle = getCityNameByCode(item.departureAirportCode || "", "city") + '&emsp;--&emsp;' + getCityNameByCode(item.arrivalAirportCode || "", "city");
                    html += '       <h3 class="flight-name"><span class="hnaui-ow">' + tripeTitle + '</span>' + flightTitle + '</h3>';
                    html += '       <ul>';
                    (_hasChooseData || []).forEach(function (subItem) {
                        if(item.flightSegmentId == subItem.flightSegmentId){
                            (subItem.seatInfo || []).forEach(function (o) {
                                html += '       <li>';
                                html += '           <p>' +getFullName(o.firstName, o.lastName) + '选择的座位号：<span class="hnaui-right">'+ o.seatId+'</span></p>';
                                html += '       </li>';
                            });
                        }
                    });
                    html += '       </ul>';
                });
                html += '<br>';
            }
        }

        html += '       </div>';
        html += '       <div class="hnaui-push-center">';
        //html += '           <p  class="hnaui-btn hnaui-btn-primary click-btn re-choose-btn">重新选择</p>';
        //html += '           <p  class="hnaui-btn hnaui-btn-theme click-btn payment-btn">信息确认</p>';
        html += '           <p  class="hnaui-btn hnaui-btn-theme click-btn continue-payment-btn">继续支付</p>';
        html += '       </div>';
        html += '   </div>';
        html += '   <div class="hna-loading-mask"></div>';
        html += '</div>';

        $(".hnaui-order-generation").remove();
        $("body").append(html);
    } catch (e) {
        JsErrorTips(e);
    }
}
