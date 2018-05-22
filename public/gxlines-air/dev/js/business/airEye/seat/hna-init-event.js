//监听radio控件改变事件
function initRadio() {
    try {
        globalFrom.on('radio(currentFlight)', function (data) {
            var thisV = data.value;
            HNAChooseSeat.getSeatMapInfo({
                //当前的机型编号
                currentAirEquipType:_fInfo[data.value].aircraftCode,
                //当前航班号
                currentFlightNumber:_fInfo[data.value].flightNumber,
                //需要选择座位的乘机人信息
                seatTravellers:_fInfo[thisV].passengerList,
                //需要选择座位的航班id
                flightSegmentId:_fInfo[thisV].flightSegmentId,
                beforeFun:function(){
                    setFlightRadioStatus(true);
                },
                afterFun:function(){
                    setFlightRadioStatus(false);
                }
            });
        });
    } catch (e) {
        JsErrorTips(e);
    }
}



//过滤选择座位需要的数据
function filterSeatData(data){
    if(!data){
        data = {};
    }
    if(!data.travelerInfo){
        data.travelerInfo = [];
    }
    var seatInfoList = [];
    var passengerList = [];
    data.travelerInfo.forEach(function(item){
        if((item.type).toUpperCase() != "INF"){
            passengerList.push({
                "id": item.uri,
                "firstName": item.firstName,
                "lastName": item.lastName,
                "passType": item.type,
                "seatlist":item.seatlist
            });
        }
    });
    (data.bounds || []).forEach(function(item){
        seatInfoList.push({
            "flightSegmentId": item.flightUrl,

            "aircraftCode": item.aircraftCode,
            "aircraftName":item.aircraftName,
            "fareFamilyCode": item.fareFamilyCode,
            "fareFamilyName": item.fareFamilyName,
            "desigCode": item.desigCode,

            "arrivalAirportCode": item.destination,
            "arrivalDate": item.arrivalDate,

            "departureAirportCode": item.origin,
            "departureDate": item.departureDate,

            "flightNumber": item.flightNumber,

            "passengerList":passengerList
        });
    });
    return seatInfoList;
}

//设置航班前面的单选按钮的可选状态
function setFlightRadioStatus(bl) {
    $("input[name='currentFlight']").each(function () {
        $(this).prop("disabled", bl);
    });
    renderFrom();
}

//提交选择的座位信息
function submitSeatInfo() {
    try {
        hna.loading();
        if(isMMB){
            createOrderGeneration();
            var $hnauiOrderGeneration = $(".hnaui-order-generation");
            hna.ajax({
                url: ajaxUrl.chooseMMBSeat,
                data: {
                    "orderCode": _orderCode,
                    "flightSegment": _hasChooseData
                },
                doneCallback: function (data) {
                    if (data && data.code == "200" && data.data.status == "success") {
                        $hnauiOrderGeneration.find(".hnaui-push-center").before('<br><p class="btn-tips" style="color:red;display: none;">您所选择的座位信息已经添加到订单'+_orderCode+'里面，点击“继续支付”按钮，进入订单详情页面，可继续支付。</p>');
                        hna._processData.saveNewOrderCoder(_orderCode, $(".hnaui-order-generation").prop("outerHTML"));

                        goToPage("/airP/payment?type=content&orderCode=" + hna.compile(_orderCode));
                    }else{
                        //goToPage("/airP/order/orderDetail?orderCode=" + hna.compile(_orderCode));
                        _showMsg(data.data.message);
                    }
                }
            });
        }else{
            hna.ajax({
                url: ajaxUrl.chooseSeat,
                data: {
                    "shoppingCartId": _shoppingCartId,
                    "flightSegment": _hasChooseData
                },
                doneCallback: function (data) {
                    if (data && data.code == "200" && data.data.status == "success") {
                        goToPage("/airEye/product");
                    }else{
                        _showMsg(data.data.message);
                    }
                }
            });
        }
    } catch (e) {
        JsErrorTips(e);
    }
}
