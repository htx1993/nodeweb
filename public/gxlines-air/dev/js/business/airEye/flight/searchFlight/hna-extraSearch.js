//展示历史搜索记录或特价机票

//根据城市名转换成对应的三字码并判断该城市是否是国际城市;
function getObjByCode(code , filed){
    var obj = {};
    if (!filed) {
        filed = "city";
    }
    var flightLen = (_flightCityData || []).length;
    for (var a = 0, a1 = flightLen; a < a1; a++) {
        var item = _flightCityData[a];
        if (item.code == code) {
            obj.city = item[filed];
            obj.domestic = item.other ? "N" : "Y";
            return obj;
        }
    }
    return obj;
}

//ajax请求特价机票数据
function createSpeTicketReq(bl){
    var arr = hna._processData.getNewHistoryInfo();
    if(arr.length > 0 && bl) {
        speTicketList = arr;
        createHistoryUl();//创建dom节点;
        initTicket(handleUlNext);//初始化特价机票组件;
        autoScroll();
        return;
    }
    $(".search-loading").eq(0).show();
    hna.ajax({
        url: "/flight/aircommendline",
        data: {},
        doneCallback: function(data){
            var list = data.data.data;
            handleTicketList(list);//处理数据;
            createExtraUl(data);//创建dom节点;
            initTicket(handleUlNext);//初始化特价机票组件;
            autoScroll();
        },
        alwaysCallback: function(data){
            $(".search-loading").hide();
        }
    });
}

//根据历史记录创建
function createHistoryUl() {
    var html = '';
    html += createSpeTicket();
    html += createSpeChange();
    $("#hnaui_ticket_content").append(html);
}

//根据特价机票数据创建dom节点
function createExtraUl(data){
    try{
        var html = '';
        if(!data.data.data || data.code != 200 || data.data.data.length <= 0){//数据异常的情况
            html += '<p class="no-speticket">暂无推荐机票！</p>';
        }else{
            html += createSpeTicket("extra");
            html += createSpeChange();
        }
        $("#hnaui_ticket_content").append(html);
    }catch(ev){
        JsErrorTips(ev);
    }
}

//赋本地初始值
function setDefaultValue() {
    try {
        $("input[name='tripType']").each(function () {
            var $this = $(this);
            $this.prop("checked", $this.val() == _sInfo.tripType);
        });
        $("input[name='flexible']").each(function () {
            var $this = $(this);
            $this.prop("checked", $this.val() == _sInfo.flexible);
        });
        $("select[name='guestTypeAdt']").val(_sInfo.guestTypes[0].amount);
        $("select[name='guestTypeCnn']").val(_sInfo.guestTypes[1].amount);
        $("select[name='guestTypeInf']").val(_sInfo.guestTypes[2].amount);
        $("select[name='cabinClass']").val(_sInfo.cabinClass);
        $("select[name='currencyType']").val(_sInfo.currencyType);

        $("#originLocationName").val(_sInfo.outboundOption.originLocationName);
        $("#originLocationCode").val(_sInfo.outboundOption.originLocationCode);
        $("#oriIsDomestic").val(_sInfo.outboundOption.oriIsDomestic);

        $("#destinationLocationName").val(_sInfo.outboundOption.destinationLocationName);
        $("#destinationLocationCode").val(_sInfo.outboundOption.destinationLocationCode);
        $("#desIsDomestic").val(_sInfo.outboundOption.desIsDomestic);

        $("#goDate").val(_sInfo.outboundOption.departureDate);
        $("#backDate").val(_sInfo.inboundOption.departureDate);
    } catch (e) {
        JsErrorTips(e);
    }
}

//自动滚动
function autoScroll() {
    var interval = null;
    //每三秒点击翻页
    interval = setInterval(function(){
        $(".hnaui-prev-next .next").trigger("click");
    },3000);
    $("#hnaui_ticket_content").on("mouseover" , function(){
        clearInterval(interval);
    });
    $("#hnaui_ticket_content").on("mouseleave" , function(){
        interval = setInterval(function(){
            $(".hnaui-prev-next .next").trigger("click");
        },3000);
    });
}

//动画完成之后的执行函数
function handleUlNext() {
    $(".hnaui-ticket-list li").each(function(index , item) {
        if(index < 5){
            $(".hnaui-ticket-list").append(item.outerHTML);
            $(item).remove();
        }
    });
    $(".hnaui-ticket-list").css("left" , '0');
}