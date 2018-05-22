//查询
function searchFlightInfo() {
    if(_priceTrendServer && getSearchBoxParam()) {
        //航班价格趋势图
        HNAPriceTrend.init({"id":"price_trend_panel"});
    }
    searchFlightFun({
        beforeCallbackFun: function () {
            $("body").css("overflow", "auto");
            saveSearchFlightInfo();
            setLoadingEL();
            _hasChooseFlight = [];
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
            _priceTrendServer = true;
        }
    });
}
//重新查询
function reSearchFlightInfo() {
    if (_sInfo.tripType == "MC") {
        goToPage("/airEye/flight/search");
    } else {
        $(".search-info").fadeOut();
        $(".search-box").slideDown();
        hna.goToTop();
    }
}
//取消搜索
function cancelSearchFlightInfo() {
    $(".search-info").fadeIn();
    $(".search-box").slideUp();
}
//选择一个航班中的一个产品
function chooseFareFamily(thisP) {
    var $flightGroup = thisP.parents(".flight-group");
    var flightIndex = $flightGroup.data("index");

    var judgeInfo = judgeFlightTime(thisP);
    //是否进入不符合要求的判断条件,默认不进入1
    if(!judgeInfo.bl){
        _showMsg(judgeInfo.msg);
        return false;
    }

    if(_sInfo.tripType=='MC'){
        if(flightIndex==0){
            _hasChooseFlight=[];
            $('.submit-btn').addClass("hnaui-btn-disabled");
        }
        $("input.fareFamilyId").each(function (index) {
            if(flightIndex==0){
                $("input[type='hidden'][name='fareFamilyId_" + index + "']").val('');
            }
        });


    }
    
    var str = thisP.parents("li").find(".price").data("price");

    $flightGroup.find(".flight-group-item").removeClass("active");
    thisP.parents(".flight-group-item").addClass("active");
    var fareFamilyId = thisP.data("id");

    $(".search-loading").show();
    setFareFamilyId(fareFamilyId, flightIndex);
    changeBookBtnState(thisP);

    var fareFamilyIdArr = getFareFamilyId();
    HNACart.loading();
    hna.ajax({
        url: ajaxUrl.selectFareFamilyCode,
        data: {"tdpUrlId": fareFamilyIdArr.join("||")},
        doneCallback: function (data) {
            if (data.data && data.data.shoppingCartId) {
                hna._processData.saveShoppingCartInfo({
                    "tripType": _sInfo.tripType,
                    "cartInfo": data.data
                });
                HNACart.createCartDetail();
                createSegmentFFInfo(flightIndex , data.data , str);
                if(_sInfo.tripType=='MC'){
                    if(flightIndex==0){
                        $(".show-segment-con").each(function (index,item) {
                            if(index>0){
                                $(item).remove();
                            }
                        });
                        $(".flight-group").each(function (index,item) {
                            if(index>0){
                                $(item).replaceWith(createFlightGroup(index));
                            }
                        });
                        judgeSegmentShow(0,"show");
                    }
                        var activeCode=thisP.data('code');
                        $(".bookbtn").each(function (index,item) {
                            if($(item).parents(".flight-group").data("index")>0){
                                if($(item).data('code') != activeCode){
                                    $(item).addClass('hnaui-btn-disabled');
                                }else {
                                    $(item).removeClass('hnaui-btn-disabled');
                                }
                            }
                        });

                    }
                setBuyTicketInfo(thisP);
                judgeSegmentShow(flightIndex);
                if (_sInfo.tripType !== "MC") {//如果不是多航段
                    getBeniftInfo(thisP);
                }
            } else {
                thisP.removeClass("actived").html("预订");
                //把已经选中的单选按钮取消选中状态
                setFareFamilyId("", flightIndex);
                $("input[name='flightItineraryId_" + flightIndex + "']").each(function () {
                    $(this).prop("checked", false);
                });
                HNACart.loading("hide");
                _showMsg(data.data.message || "座位数不够或者系统暂时无法处理您的请求，请重新选择日期或者刷新页面后重试！");
            }
        }
    });
}
//判断所选择的航班的起飞时间和前一航班的降落时间的时间差
function judgeFlightTime(thisP){
    var $flightGroup = thisP.parents(".flight-group");
    var flightIndex = $flightGroup.data("index");
    var thisDepDate = thisP.parents(".flight-group-item").data("depdate");
    var thisArrDate = thisP.parents(".flight-group-item").data("arrdate");
    if((_sInfo.tripType != "OW")){
        for(var i = 0 , len = $(".flight-group").length; i < len ; i++){
            var arrDate = $(".flight-group").eq(i).find(".flight-group-item.active").data("arrdate");
            var depDate = $(".flight-group").eq(i).find(".flight-group-item.active").data("depdate");

            if((i < flightIndex) && arrDate && (hna._date.getDateInfo(thisDepDate).millisecond - hna._date.getDateInfo(arrDate).millisecond <= 2 * 60 * 60 * 1000)){
                return {
                    bl: false,
                    msg: "您选择的"+hna._processData.getTripTitle(flightIndex)+"的起飞时间与"+hna._processData.getTripTitle(i)+"的降落时间不得小于2小时！"
                };
            }
            if((i > flightIndex) && depDate && (hna._date.getDateInfo(depDate).millisecond - hna._date.getDateInfo(thisArrDate).millisecond <= 2 * 60 * 60 * 1000)){
                return {
                    bl: false,
                    msg: "您选择的"+hna._processData.getTripTitle(flightIndex)+"的降落时间与"+hna._processData.getTripTitle(i)+"的起飞时间不得小于2小时！"
                };
            }
        }
    }
    return {
        bl: true
    };
}
//重新选择航段的产品
function reChooseFlight(thisP) {
    var flightIndex = thisP.data("index");
    $(".flight-group").hide().eq(flightIndex).show();
    _hasChooseFlight[flightIndex] = "";
    createHasChooseFlightInfo();
}
//显示与隐藏产品信息
function toggleFareFamilyPanel(thisP) {
    thisP.toggleClass("btnshow");
    var $flightGroups = thisP.parents(".flight-group-item").siblings();
    $flightGroups.find(".fare-family-info").hide();
    $flightGroups.find(".show-fare-family").each(function () {
        $(this).removeClass("btnshow").html('订票<i class="hnaui-icon">&#xe61a;</i>');
    });
    $flightGroups.find(".price").css("visibility", "visible");

    var $thisFlightGroup = thisP.parents(".flight-group-item");
    $thisFlightGroup.find(".fare-family-info").toggle();

    if (thisP.hasClass("btnshow")) {
        thisP.html('收起<i class="hnaui-icon">&#xe619;</i>');
        $thisFlightGroup.find("dt .price").css("visibility", "hidden");
    } else {
        thisP.html('订票<i class="hnaui-icon">&#xe61a;</i>');
        $thisFlightGroup.find("dt .price").css("visibility", "visible");
    }
}
//显示与隐藏退改签规则
function toggleFareFamilyRule(thisP) {
    thisP.parents('.fare-family-info').find('.change-back-box').hide();
    thisP.parents('.product-name').find('.change-back-box').show();
}
//查看低价日历
function lowestPriceCalendar(thisP) {
    var index = thisP.parents(".flight-group").data("index");
    goToPage("/airEye/flight/flexible?index=" + index);
}

//改变预定按钮状态
function changeBookBtnState($this) {
    $this.parents(".flight-group").find(".bookbtn").each(function(index , item){
        $(item).removeClass("actived").html("预订");
    });
    $this.addClass("actived").html("已预订");
}

//获取退改签规则
function getBeniftInfo(thisP) {
    var $root = thisP.parents("li");
    var index = thisP.parents(".flight-group").data("index");
    var str = $root.find(".change-back-box .content").html();
    var cabinStr = $root.find(".booking-class").html();
    if (index == 0) {
        _beniftList[0] = {
            ruleHtml : str || "",
            cabinHtml : cabinStr || ""
        };
    }else {
        _beniftList[1] = {
            ruleHtml : str || "",
            cabinHtml : cabinStr || ""
        };
    }
}