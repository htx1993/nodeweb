//特价机票数据
var speTicketCitys = {};
var speTicketList = [];

//ajax请求特价机票数据
function speTicketReq(){
    hna.ajax({
        url: ajaxUrl.getTicketList,
        data: {},
        doneCallback: function(data){
            var list = data.data.data;
            handleTicketList(list);//处理数据;
            createTicketUl(data);//创建dom节点;
            initTicket();//初始化特价机票组件;
            portalAutoScroll();
        },
        alwaysCallback: function(data){

        }
    });
}

//根据特价机票数据创建dom节点
function createTicketUl(data){
    try{
        var html = '';
        var str = '';
        if(!data.data.data || data.code != 200 || data.data.data.length <= 0){//数据异常的情况
            html += '<p class="no-speticket">暂无特价机票！</p>';
        }else{
            html += createSpeTicket();
            str += createSpeCitys();
            str += createSpeChange();
        }
        $("#hnaui_ticket_content").html(html);
        $(".city-change").html(str);
    }catch(ev){
        JsErrorTips(ev);
    }
}

//遍历特价机票数据排序并提取相同的出发城市到citys;
function handleTicketList(data){
    try{
        if(!data) { data = [];}
        var dataObj = {};//用于存放相同出发城市的数据
        speTicketList = [];//用于存放排序后合并的数组;
        speTicketCitys = {};//存放提取出来的出发城市;
        (data || []).forEach(function(item,index){
            if(item.org){
                if(!speTicketCitys[item.org]){
                    speTicketCitys[item.org] = item.org;
                }
                if(!dataObj[item.org]){
                    dataObj[item.org] = [];
                }
                dataObj[item.org].push(item);
            }
        });
        for(var key in dataObj){
            if(dataObj.hasOwnProperty(key)){
                var titles = hna.cloneObj(dataObj[key]);
                speTicketList = speTicketList.concat(titles);
            }
        }
    }catch(ev){
        JsErrorTips(ev);
    }
}

//创建有特价机票的节点
function createSpeTicket(flag){
    var html = '';
    try{
        html += '<ul class="hnaui-ticket-list">';
        (speTicketList || []).forEach(function(item,index){
            var depCity = getObjByCode(item.org).city || "";
            var arrCity = getObjByCode(item.dst).city || "";
            var depDate = item.date.split(" ")[0];
            html += '<li class="col-xs-6 col-sm-4 col-md-2 col-lg-2 hnaui-special-ticket hnaairlines_'+(item.org || "")+'">';
            html += '<div>';
            html += '<h3><span class="hnaui-ticket-dep">'+depCity+'</span>';
            html +=      '<i class="hnaui-icon">&#xe901;</i>';
            html += '<span class="hnaui-ticket-arr">'+arrCity+'</span></h3>';
            html += '<p class="hnaui-ticket-date">'+depDate+'</p>';
            html += '<p class="hnaui-ticket-price">￥<dfn>'+item.amount+'</dfn>起</p>';
            if(!flag){
                html += '<p class="hnaui-buy-ticket">';
                html += '<span> 立即预订</span>';
                html += '</p>';
            }
            
            html += '<input type="hidden" name="ticketParamers" value="'+item.tripType+' | '+item.org+' | '+item.dst+' | '+depDate+' |  | '+item.currency+' | ">';
            html += '</div>';
            html += '</li>';

        });
        html += '</ul>';
    }catch(ev){
        JsErrorTips(ev);
        html = '';
    }
    return html;
}

//创建特价机票城市节点
function createSpeCitys(){
    var html = '';
    try{
        html += '<ul class="hnaui-city">';
        for(var key in speTicketCitys){
            if(speTicketCitys.hasOwnProperty(key)){
                var item = speTicketCitys[key];
                var depCity = getObjByCode(item).city;
                html += '<li class="hnaui-elip" data-val="'+item+'">'+depCity+'</li>';
            }
        }
        html += '</ul>';
    }catch(ev){
        JsErrorTips(ev);
        html = '';
    }
    return html;
}
//创建前进后退按钮
function createSpeChange(){
    var html = '';
    try{
        html += '<ul class="hnaui-prev-next">';
        html += '<li class="prev disabled"><i class="prev hnaui-icon">&#xe603;</i></li>';
        html += '<li class="next"><i class="next hnaui-icon">&#xe602;</i></li>';
        html += '</ul>';
    }catch(ev){
        JsErrorTips(ev);
        html = '';
    }
    return html;
}


//优惠机票
function initTicket(fn1) {
    //特惠机票开始
    var count = 0;//一页显示多少初始化;
    var $ticketContent = $("#hnaui_ticket_content");//显示区域
    var v_width = $ticketContent.width();//显示区域总宽度
    var $ticketList = $(".hnaui-ticket-list");//ul总宽度 99999
    var ticket_len = $ticketList.find("li").length;//li个数
    var liSpacing = 14;//两个li之间的间距
    var one_liw = $ticketList.find("li").outerWidth(true);//单个li的宽度
    var boxes = Math.ceil(v_width / one_liw);//一页显示个数
    var page_count = Math.ceil(ticket_len / boxes);//页数
    var $ul_width = one_liw * (ticket_len + 1);
    
    
    $('.hnaui-ticket-list').css("width", $ul_width);
    function resetDefault() {
        try {
            boxes = Math.ceil(v_width / one_liw);//一页显示个数
            page_count = Math.ceil(ticket_len / boxes);//页数
        } catch (e) {
            JsErrorTips(e);
        }

    }

    $ticketContent.addClass("has-ticket");

    function resetLiWidth() {
        try {
            var _w = $(window).width();
            v_width = $ticketContent.width();//显示区域总宽度
            count = 3;
            if(v_width > 1000){
                count = 5;
            }
           /* if (_w <= 500) {
                count = 2;
            }*/
           /* else if (_w > 500 && _w <= 768) {
                count = 1;
            }*/
            /* else if (_w > 768 && _w <= 992) {
             count = 4;
             }*/
            // else if (_w > 992 && _w <= 1024) {
            //     count = 5;
            // }
            one_liw = v_width / count;
            $('#hnaui_ticket_content .hnaui-ticket-list li').css('width', (one_liw - liSpacing) + 'px');
            $ticketList.css('left', '0');
            $('.hnaui-city li').removeClass('hnaui-this').eq(0).addClass('hnaui-this');
            resetDefault();
        } catch (e) {
            JsErrorTips(e);
        }
    }

    resetLiWidth();
    function page() {
        return Math.round(-$ticketList.position().left / one_liw) || 0;//获取当前页前面有几个li
    }
    //往后 按钮
    function next() {
        try {
            if (!$ticketList.is(":animated")) {
                if (ticket_len - page() > boxes) {
                    $(this).attr("disabled", false).removeClass('disabled');
                    var left = $ticketList.position().left - v_width;
                    $ticketList.animate({left: left}, "slow", function () {
                        AjustPrevAndNext();
                        ajustCity();
                        if(fn1 && typeof(fn1) == "function"){
                            fn1();
                        }
                    });
                }
            }
        } catch (e) {
            JsErrorTips(e);
        }
    }
    //前进 按钮
    function prev() {
        try {
            if (!$ticketList.is(":animated")) {
                var left = '';
                if(fn1 && typeof(fn1) == "function") {
                    $(".hnaui-ticket-list li").each(function(index , item) {
                        if((ticket_len - 6) < index && index < (ticket_len)){
                            if(index == (ticket_len - 5)) {
                                $(".hnaui-ticket-list").prepend(item.outerHTML);
                            }else{
                                $(".hnaui-ticket-list li").eq(index - ticket_len + 4).after(item.outerHTML);
                            }
                            $(item).remove();
                        }
                    });
                    $(".hnaui-ticket-list").css("left" , -(v_width));
                    left = ($ticketList.position().left + v_width) > 0 ? 0 : $ticketList.position().left + v_width;
                    $ticketList.animate({left: left}, "slow", function () {
                        AjustPrevAndNext();
                        ajustCity();
                    });
                }else if (page() != 0) {
                    $(this).attr("disabled", false).removeClass('disabled');
                    left = ($ticketList.position().left + v_width) > 0 ? 0 : $ticketList.position().left + v_width;
                    $ticketList.animate({left: left}, "slow", function () {
                        AjustPrevAndNext();
                        ajustCity();
                    });
                }
            }
        } catch (e) {
            JsErrorTips(e);
        }
    }

    function AjustPrevAndNext() {
        try {
            $(".hnaui-ticket .hnaui-prev-next .prev,.hnaui-ticket .hnaui-prev-next .next").attr('disbled', false).removeClass('disabled');
            if (ticket_len - page() <= boxes) {
                $(".hnaui-ticket .hnaui-prev-next .next").addClass('disabled');
            }
            if (page() == 0) {
               $(".hnaui-ticket .hnaui-prev-next .prev").addClass('disabled');
            }
        } catch (e) {
            JsErrorTips(e);
        }
    }

    function ajustCity() {
        try {
            var index = Math.ceil(-$ticketList.position().left / one_liw);
            if(index > ticket_len - 1) {
                index = ticket_len - 1;
            }
            var className = $ticketContent.find("li").eq(index).attr('class').split('_')[1];
            $('.hnaui-city li').removeClass('hnaui-this');
            $('.hnaui-city li[data-val=' + className + ']').addClass('hnaui-this');

        } catch (e) {
            JsErrorTips(e);
        }
    }

    $('.hnaui-city li').click(function () {
        var index = $('.hnaairlines_' + $(this).attr('data-val')).index();
        var num_width = one_liw * index;
        $ticketList.animate({left: -num_width}, "slow", AjustPrevAndNext);
        $(this).addClass('hnaui-this').siblings().removeClass('hnaui-this');

    });
    $(document).on("click", ".hnaui-ticket .hnaui-prev-next .prev,.hnaui-ticket .hnaui-prev-next .next", function (e) {
        e.stopPropagation();
        try {
            var $this = $(e.target);
            if ($this.hasClass("next")) {
                next();
            } else if ($this.hasClass("prev")) {
                prev();
            }
        } catch (ev) {
            JsErrorTips(ev);
        }
    });
    $(window).resize(hna.throttle_duration(function () {
            resetLiWidth();
        })
    );

    $(document).on("click", ".hnaui-ticket-list li", function (e) {
        e = e || window.event;
        try {
            var $this = $(this);
            //预定特价机票
            reserveSpecialTicket($this);

        } catch (ev) {
            JsErrorTips(ev);
        }
    });
}

//预定特价机票
function reserveSpecialTicket(thisP){
    getTicketParams(thisP);
    setDefaultValue();//根据_sInfo填充查询面板参数;
    renderFrom();//重新渲染查询面板;
    var lock = getSearchBoxParam();//校验查询参数
    if(!lock){
        return false;
    }
    saveSearchFlightInfo();
    goToPage("/airEye/flight/flexible");
}

//通过thisP获取查询的相关参数并复制给_sInfo;
function getTicketParams(thisP){
    thisP = thisP instanceof $ ? thisP : $(thisP);
    var str = thisP.find('input[name="ticketParamers"]').val() || "";//获取参数的字符串;
    str = str.replace(/\s*/g,"");//去掉字符串所有的空格;
    var paramersArr = str.split("|");//将参数的字符串转换为数组;

    var depCode = paramersArr[1];//出发城市的三字码
    var depObj = getObjByCode(depCode);
    var depCity = depObj.city;
    var depDom = depObj.domestic;

    var arrCode = paramersArr[2];//到达城市的三字码
    var arrObj = getObjByCode(arrCode);
    var arrCity = arrObj.city;
    var arrDom = arrObj.domestic;

    if(paramersArr[0] == "undefined" || !paramersArr[0]){
        _sInfo.tripType = "OW";
    }else{
        _sInfo.tripType = paramersArr[0];
    }
    _sInfo.flexible = "Y";
    _sInfo.guestTypes[0].amount = 1;
    _sInfo.guestTypes[1].amount = 0;
    _sInfo.guestTypes[2].amount = 0;
    if(paramersArr[6] == "undefined" || !paramersArr[6]){
        _sInfo.cabinClass = "Economy";
    }else{
        _sInfo.cabinClass = paramersArr[6];
    }
    if(paramersArr[5] == "undefined" || !paramersArr[5]){
        _sInfo.currencyType = "CNY";
    }else{
        _sInfo.currencyType = paramersArr[5];
    }

    _sInfo.outboundOption.originLocationName = depCity;
    _sInfo.outboundOption.originLocationCode = depCode;
    _sInfo.outboundOption.oriIsDomestic = depDom;

    _sInfo.outboundOption.destinationLocationName = arrCity;
    _sInfo.outboundOption.destinationLocationCode = arrCode;
    _sInfo.outboundOption.desIsDomestic = arrDom;

    _sInfo.outboundOption.departureDate = paramersArr[3];
    //如果行程类型为往返程,赋值返回日期
    if(_sInfo.tripType == "RT") {
        _sInfo.inboundOption.departureDate = paramersArr[4];
    }
}

//首页特价机票自动滚动效果
function portalAutoScroll() {
    var nextBtn = $(".hnaui-ticket .hnaui-prev-next li.next");
    var cityBtn = $(".hnaui-ticket .hnaui-city li:first");
    var interval = null;
    //每三秒点击翻页
    interval = setInterval(function() {
        if(nextBtn.hasClass("disabled")) {
            cityBtn.trigger("click");
        }else {
            nextBtn.trigger("click");
        }
    } , 10000);
    $("#hnaui_ticket_content").on("mouseover" , function(){
        clearInterval(interval);
    });
    $("#hnaui_ticket_content").on("mouseleave" , function(){
        interval = setInterval(function() {
            if(nextBtn.hasClass("disabled")) {
                cityBtn.trigger("click");
            }else {
                nextBtn.trigger("click");
            }
        } , 10000);
    });
}
