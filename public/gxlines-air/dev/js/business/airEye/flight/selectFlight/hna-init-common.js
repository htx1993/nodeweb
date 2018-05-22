//查询数据中和查询数据完成，控件隐藏显示处理
function setLoadingEL(flag) {
    if (flag == "hide") {
        //$(".search-box-up").trigger("click");
        $(".search-box").show();
        $(".search-loading").hide();
        $(".cart-loading").hide();
        $(".search-info").hide();
        $(".search-result").show();
        $(".search-submit").show();
    } else if (flag == "init") {
        $(".search-box").show();
        $(".search-loading").hide();
        $(".cart-loading").hide();
        $(".search-info").hide();
        $(".search-result").hide();
        $(".search-submit").hide();
    } else {
        $(".search-loading").show();
        $(".cart-loading").show();
        $(".search-info").hide();
        $(".search-result").show();
        $(".search-submit").hide();
    }
}

//判断航班选择面板的展示与隐藏
function judgeSegmentShow(index , flag) {
    var len = $(".flight-group").length;//总航段数
    if(flag == "show") {//点击展开的过程
        $(".flight-group").show();
        $(".show-segment-con").hide();
        return;
    }else if (flag == "showOne"){
        $(".flight-group").eq(index).show();
        $(".show-segment-con").eq(index).hide();
        return;
    }else{//预定某一产品的过程
        $(".flight-group").eq(index).hide();
        $(".show-segment-con").eq(index).show();
        //$(".show-segment-con").eq(index).addClass("active");
        
    }
    // var bl = true;
    // //判断后面航段是否有未选择的
    // $(".show-segment-con").each(function(index1 , item){
    //     if(!($(item).hasClass("active")) && (index1 > index) && bl){
    //         $(".flight-group").eq(index1).show();
    //         $(".show-segment-con").eq(index1).hide();
    //         bl = false;
    //     }
    // });

    // //判断前面航段是否有未选择的
    // if(bl){
    //     $(".show-segment-con").each(function(index1 , item){
    //         if(!($(item).hasClass("active")) && bl){
    //             $(".flight-group").eq(index1).show();
    //             $(".show-segment-con").eq(index1).hide();
    //             bl = false;
    //         }
    //     });
    // }
}

//根据index _sInfo获取shoppingInfo.bunds;
function getBoundsItem(index , arr) {
    if(!arr) {
        arr = [];
    }
    if(_sInfo.tripType == "OW") {
        return arr[0];
    }else if(_sInfo.tripType == "RT") {
        if(arr.length > 1) {
            return arr[index];
        }else{
            return arr[0];
        }
    }else if(_sInfo.tripType == "MC") {
        var count = 0;
        var info = _sInfo.multiCityOptions[index];
        (arr || []).forEach(function(item , subIndex){
            if(info.originLocationCode == item.origin && info.destinationLocationCode == item.destination && info.departureDate == hna._date.getDateInfo(item.departureDate).date){
                count = subIndex;
            }
        });
        return arr[count];
    }
}

//创建预定后的segment-con;
function createSegmentFFInfo(index , data , str) {
    var boundInfo = getBoundsItem(index , data.bounds);
    var depDate = hna._date.getDateInfo(boundInfo.departureDate);
    var arrDate = hna._date.getDateInfo(boundInfo.arrivalDate);
    var html = '';
    html += '<ul class="hnaui-clear">';
    html += '<li class="choose-i"><span>已选择'+ (hna._processData.getTripTitle(index)) +'航班</span></li>';
    html += '<li><div class=" hnaui-elip">航班: '+ (boundInfo.flightNumber || '') +'</div><div>'+ (depDate.dateCN) +','+ (depDate.weekAbb) +'</div></li>';
    html += '<li class="main-info">';
    html += '<p><em>'+ (depDate.shortTime || '--') +'</em>'+ (getCityNameByCode(boundInfo.origin || "")) +'</p>';
    html += '<p><em>'+ (arrDate.shortTime || '--') +'</em>'+ (getCityNameByCode(boundInfo.destination || "")) +'</p>';
    html += '</li>';
    html += '<li class="date-time"></li>';
    html +=     '<li class="ff-code">'+ (boundInfo.fareFamilyName) +'<strong> '+ (str) +'</strong></li>';
    html += '</ul>';
    html += '<p class="click-btn show-segment">重新选择</p>';
    $(".show-segment-con").eq(index).html(html);
}

//判断是继续选择航班产品，还是进入到下一页面
function setBuyTicketInfo(thisP) {
    var flightType = "direct";
    var fareFamilyCode = thisP.data("code");
    var flightGroupItemIndex = thisP.parents(".flight-group-item").data("index");
    var flightGroupIndex = thisP.parents(".flight-group").data("index");
    _hasChooseFlight[flightGroupIndex] = flightType + "|" + flightGroupItemIndex + "|" + fareFamilyCode;

    createHasChooseFlightInfo(thisP);
}

//弹出退改签规则提示弹框
function attenRule() {
    if(_sInfo.tripType !== "MC") {
        viewAttenRule();
    }else {
        continueBuyTickets();
    }
}

function viewAttenRule() {
    var html = '';
    html +='<div class="hna-layer-change-rule">';
    (_beniftList || []).forEach(function(item , index) {
        if (index == 0) {
            html += '<h2>去程退改签规则&nbsp;&nbsp;'+ item.cabinHtml +'</h2>';
        }else {
            html += '<h2>返程退改签规则&nbsp;&nbsp;'+ item.cabinHtml +'</h2>';
        }
        html += item.ruleHtml;
    });
    html +='</div>';
    hnaer.open({
        type: 1,
        content: html,
        area: ['580px', ''],
        title:"已选航班退改签规则",
        btn: [_i18n("confirm")],
        yes: function (index) {
            hnaer.close(index);
            continueBuyTickets();
        }
    });
}

//获取购物车信息，跳转到下一页面
function continueBuyTickets() {
    try {
        //清空本地的航班结果
        saveSearchFlightResult();

        saveHistoryBuy();
        if(!_userId){
            HNALogin.showFastLogin({"callback":function(){
                goToPage("/airEye/passenger");
            }});
        }else{
            goToPage("/airEye/passenger");
        }

    } catch (e) {
        JsErrorTips(e);
    }
}

//获取航班起飞时间
function getFlightTime(fIndex, pIndex, flag) {
    if ((fIndex || fIndex == 0) && (pIndex || pIndex == 0)) {
        fIndex = parseInt(fIndex + "", 10);
        pIndex = parseInt(pIndex + "", 10);
        var flightSeg = _fInfo.originDestinations[fIndex].airItineraries[pIndex].flightSegments;
        if (flag === "dep") {
            var departime = flightSeg[0].departureTime;
            departime = filterDate(departime);
            return departime;
        } else if (flag === "arr") {
            var lastIndex = flightSeg.length - 1;
            var arrTime = flightSeg[lastIndex].arrivalTime;
            arrTime = filterDate(arrTime);
            return arrTime;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
//判断所选产品是否符合要求
function judgeProduct(blo, thisP) {
    //当前产品所处航段
    var flightIndex = thisP.parents(".flight-group").data("index");
    //当前航段的航班序号
    var planeIndex = thisP.data("index");
    //当前航班起飞时间
    var deTimeNow = getFlightTime(flightIndex, planeIndex, "dep");
    //当前航班最后降落时间
    var arTimeNow = getFlightTime(flightIndex, planeIndex, "arr");
    //附加时间
    var time = filterDate("02:00:00");
    //循环寻找所有航段,如果满足条件则跳出;
    for (var i = 0, len = $(".flight-group").length; i < len; i++) {
        var item = $(".flight-group").eq(i) || null;
        //选择产品的序号;
        var pIndexs = item.find(".has-choose").data("index");
        if ((i < flightIndex) && (pIndexs || pIndexs == 0)) {//处于前一航段并且已选则产品;
            var arTimePre = getFlightTime(i, pIndexs, "arr") || 0;
            if (deTimeNow <= arTimePre + time) {
                blo = true;
                break;
            }
        } else if ((i > flightIndex) && (pIndexs || pIndexs == 0)) {//处于后一航段且已选择产品;
            var deTimeNext = getFlightTime(i, pIndexs, "dep") || 0;
            if (arTimeNow + time >= deTimeNext) {
                blo = true;
                break;
            }
        }
    }
    return blo;
}
//分钟转换成小时分钟
function handleMinte(m) {
    if (!m) {
        m = 0;
    }
    m = parseInt(m + "", 10);
    var h = Math.floor(m / 60);//小时
    m %= 60;//分钟;
    h = h >= 10 ? h : '0' + h;
    m = m >= 10 ? m : '0' + m;
    var time = h + _i18n("F58") + m + _i18n("F59");
    return time;
}


function setFareFamilyId(id, flightIndex) {
    $("input[type='hidden'][name='fareFamilyId_" + flightIndex + "']").val(id);
}
function getFareFamilyId() {
    var fareFamilyIdArr = [];
    $("input.fareFamilyId").each(function () {
        var thisV = $(this).val();
        if (thisV) {
            fareFamilyIdArr.push(thisV);
        }
    });
    return fareFamilyIdArr;
}

//点击多航段的操作
var clickMultiWayCount = 0;
function clickMultiWayFun(flag) {
    clickMultiWayCount++;
    _sInfo.tripType = "MC";
    saveSearchFlightInfo(_sInfo);

    if (clickMultiWayCount < 2 && flag != "click") {
        return false;
    }
    goToPage("/airEye/flight/search");
}

//多航段时最低价格日历的查询
function searchMultiWay(data) {
    searchFlightFun({
        beforeCallbackFun: function () {
            saveSearchFlightInfo();
            setLoadingEL();
        },
        doneCallbackFun: function () {
            createSearchResult();
            judgeSegmentShow(0 , "show");
        },
        alwaysCallbackFun: function () {
            //清空本地的购物车数据
            hna._processData.saveShoppingCartInfo();
            //清空购物车明细
            HNACart.clearCartDetail();
            createSearchInfo("select");
            $(".submit-btn").addClass("hnaui-btn-disabled");
            setLoadingEL("hide");
        },
        data: data
    });
}

//历史购买记录存入本地
function saveHistoryBuy() {
    //获取历史记录数组;
    var historyArr = hna._processData.getNewHistoryInfo();
    $(".flight-group").each(function(index , item) {
        var info = {};
        var $item = $(item);
        info.org = $item.find(".flight-trip-title").data("dep") || '';
        info.dst = $item.find(".flight-trip-title").data("arr") || '';
        info.date = $item.find(".flight-group-item.active").data("depdate") || '';
        info.amount = $item.find(".flight-group-item.active .has-choose-fare strong").html() || 0;
        filterHistorySearch(info , historyArr);
        historyArr.unshift(info);
        if(historyArr.length > 10){
            historyArr.pop();
        }
    });
    //存入local
    hna._processData.saveNewHistoryInfo(historyArr);
}

//过滤相同出发到达出发时间的历史记录
function filterHistorySearch(obj , arr) {
    var date1 = hna._date.getDateInfo(obj.date).date;
    (arr || []).forEach(function(item , index){
        var date2 = hna._date.getDateInfo(item.date).date;
        if((item.org == obj.org) && (item.dst == obj.dst) && (date2 == date1)) {
            arr.splice(index , 1);//删除该元素
            return;
        }
    });
}

