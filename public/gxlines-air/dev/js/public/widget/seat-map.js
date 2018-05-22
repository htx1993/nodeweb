var HNA_FLIGHT_SEAT_LAYER_VA = {
    "145|ERJ": {
        "columns": ["A", false, "D", "F"],
        "reserved": ["1A", "3D", "3F", "12A", "12D", "12F"]
    },
    "190|ERJ": {
        "columns": ["A", "C", false, "D", "F"],
        "reserved": ["2D", "2F", "3C", "3D", "3F", "13A", "13C", "13D", "13F", "27C"]
    },
    "191": {
        "columns": ["A", "C", false, "D", "F"],
        "reserved": ["2D", "2F", "3C", "3D", "3F", "13A", "13C", "13D", "13F", "27C"]
    },
    "195": {
        "columns": ["A", "C", false, "D", "F"],
        "reserved": ["2D", "2F", "3C", "3D", "3F", "14A", "14C", "14D", "14F", "31C"]
    },
    "E90": {
        "columns": ["A", "C", false, "D", "F"],
        "reserved": ["3A", "3C", "3D", "3F", "11A", "11C", "11D", "11F", "25C"]
    },
    "320": {
        "columns": ["A", "B", "C", false, "D", "E", "F"],
        "reserved": ["3A", "3B", "3C", "3D", "3E", "3F", "10A", "10B", "10C", "10D", "10E", "10F", "11A", "11B", "11C", "11D", "11E", "11F", "27C"]
    },
    "32G": {
        "columns": ["A", "B", "C", false, "D", "E", "F"],
        "reserved": ["1A", "1B", "1C", "1D", "1E", "1F", "3C", "3D", "30C"]
    },
    "32I": {
        "columns": ["A", "B", "C", false, "D", "E", "F"],
        "reserved": ["1A", "1B", "1C", "1D", "1E", "1F", "3C", "3D", "12A", "12B", "12C", "12D", "12E", "12F", "13A", "13B", "13C", "13D", "13E", "13F", "30C"]
    },
    "32F": {
        "columns": ["A", "B", "C", false, "D", "E", "F"],
        "reserved": ["1A", "1B", "1C", "1D", "1E", "1F", "3C", "3D", "12A", "12B", "12C", "12D", "12E", "12F", "13A", "13B", "13C", "13D", "13E", "13F", "29C"]
    },
    "32T": {
        "columns": ["A", "B", "C", false, "D", "E", "F"],
        "reserved": ["3A", "3B", "3C", "3D", "3E", "3F", "10A", "10B", "10C", "10D", "10E", "10F", "11A", "11B", "11C", "11D", "11E", "11F", "27C"]
    },
    "32K": {
        "columns": ["A", "B", "C", false, "D", "E", "F"],
        "reserved": ["1A", "1B", "1C", "1D", "1E", "1F", "3C", "3D", "12A", "12B", "12C", "12D", "12E", "12F", "13A", "13B", "13C", "13D", "13E", "13F", "29C"]
    },
    "332": {
        "columns": ["A", "C", false, "D", "E", "F", "G", false, "H", "K"],
        "reserved": ["11A", "11C", "11D", "11G", "31A", "31C", "31D", "31E", "31F", "31G", "31H", "31K", "48A", "48C", "48D", "48E", "48F", "48G", "48H", "48K", "61C"]
    }
};


window.HNAChooseSeat = HNAChooseSeat = (function ($, w, d, undefined) {
    var hasInit = false;
    var chooseSeatCallback = null;
    var cancelChooseSeatCallback = null;
    var panelID = "";
    var titleID = "";
    var _ajaxUrl = "";
    //需要选择座位的航班id
    var _flightSegmentId = "";
    //需要选择座位的乘机人信息
    var _seatTravellers = null;
    //需要选择座位的飞机座位信息
    var _seatMapInfo = null;
    var _timeFlag = "old";

    //当前的机型编号
    var _currentAirEquipType = "";
    //当前航班号
    var _currentFlightNumber = "";

    var classList = ["hnaui-btn-disabled", "hnaui-icon", "td-text", "td-title", "search-loading", "click-btn"];

    //飞机座位类型
    var _seatTypeList = [
        //{
        //    "type": "first",
        //    "title": "头等座位"
        //},
        //{
        //    "type": "vip",
        //    "title": "尊享座位"
        //},
        //{
        //    "type": "business",
        //    "title": "商务座位"
        //},
        //{
        //    "type": "select",
        //    "title": "优选座位"
        //},
        //{
        //    "type": "domeconomy",
        //    "title": "经济座位"
        //},
        //{
        //    "type": "standard",
        //    "title": "标准座位"
        //},
        //{
        //    "type": "exit",
        //    "title": "安全门座位"
        //},
        {
            "type": "blocked",
            "title": "已被他人选择"
        },
        {
            "type": "selected",
            "title": "选择座位"
        }
        //{
        //    "type": "comfort",
        //    "title": "舒适座位"
        //},
        //{
        //    "type": "select",
        //    "title": "普通座位"
        //},
        //{
        //    "type": "vip",
        //    "title": "伸展座位"
        //},
        //{
        //    "type": "standard",
        //    "title": "超惠座位"
        //}
    ];
    //创建某一个机型的座位分布图EL
    function createFlightSeatInfoEl() {
        try {
            var html = '';
            html += '   <div class="col-xs-12 col-sm-12 col-md-8 col-lg-3 plane-explain">';
            html += createPlaneExplainModuleEl();
            html += '   </div>';

            html += '   <div class="col-xs-12 col-sm-12 col-md-8 col-lg-5 plane-layout">';
            html += createPlaneLayoutMapModuleEl();
            html += '       </div>';
            html += '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 traveller-seat-info hnaui-right">';
            html += createTravellerSeatInfoModuleEl();
            html += createCurrentSeatInfoModuleEl();
            html += createSubmitBtnEl();
            html += '   </div>';
            html += '   </div>';

            $("#" + panelID).html(html);
            $("#" + titleID).html("航班-" + _currentFlightNumber);
            $(".hnaui-flight-seat ." + classList[4]).hide();
            renderFrom();
            $("input[name='currentTraveller']").first().siblings(".hnaui-form-radio").trigger("click");

            setTravellerSeatInfo();
        } catch (e) {
            JsErrorTips(e);
        }
    }

    //创建机型座位说明模块EL
    function createPlaneExplainModuleEl() {
        var html = '';
        try {
            html += '<div id="planeImg_' + (_currentAirEquipType || "") + '" class="hnaui-plane hnaui-plane-head"></div>';
            html += '   <table id="planeTypeInfo_' + (_currentAirEquipType || "") + '" class="hnaui-table table-seat-type"><tbody>';
            for (var a = 0, a1 = _seatTypeList.length; a < a1; a++) {
                html += '   <tr>';
                html += getOneSeatInfo(_seatTypeList[a]);
                html += '   </tr>';
            }
            html += '   </tbody>';
            html += '</table>';
        } catch (e) {
            JsErrorTips(e);
            html = "";
        }
        return html;
    }

    //根据座位类型，获取座位的相关信息
    function getOneSeatInfo(item) {
        if (!item) {
            item = {};
        }
        var html = '';
        try {
            html += '<td class="seat-type-item">';
            html += '   <i class="icon-seat icon-seat-' + (item.type || "") + ' ' + classList[1] + '">&#xe902;</i>';
            html += '   <div class="hnaui-seat-title">' + (item.title || "") + '</div>';
            if(item.price){
                html += '   <div class="hnaui-seat-price">' + _formatMoney(item.price, item.currency) + '</div>';
            }
            html += '</td>';
        } catch (e) {
            JsErrorTips(e);
            html = '';
        }
        return html;
    }

    //创建乘机人选择的座位信息展示模块El
    function createTravellerSeatInfoModuleEl() {
        var html = '';
        try {
            html += '<table id="travellers_' + (_currentAirEquipType || "") + '" class="hnaui-table table-traveller-info">';
            html += '   <thead>';
            html += '       <tr>';
            html += '           <th width="160">乘客姓名</th><th>座位号</th>';
            html += '           <th width="30" class="hnaui-push-center">操作</th>';
            html += '       </tr>';
            html += '   </thead>';
            html += '   <tbody>';
            _seatTravellers.forEach(function (item) {
                var traveller = new Traveller(item);
                html += '   <tr class="traveller-item">';
                html += '       <td>';
                html += '           <input type="radio" name="currentTraveller" hna-filter="currentTraveller" value="' + (traveller.id) + '" title="' + (traveller.fullName) + '(' + (_filterPassType(traveller.passType) || "") + ')">';
                html += '       </td>';
                html += '       <td class="traveller-seat"></td>';
                html += '       <td class="hnaui-push-center">';
                html += '           <i class="' + classList[1] + ' ' + classList[5] + ' traveller-close close-btn transition">&#x2716;</i>';
                html += '           <i class="' + classList[1] + ' ' + classList[5] + ' traveller-ok">&#xe605;</i>';
                html += '       </td>';
                html += '   </tr>';
            });
            html += '   <tr class="total">';
            html += '       <td class="title">所选座位的额外差价</td>';
            html += '       <td class="price" colspan="2"></td>';
            html += '   </tr>';
            html += '   </tbody>';
            html += '</table>';
        } catch (e) {
            JsErrorTips(e);
            html = "";
        }
        return html;
    }

    //创建鼠标选中的当前座位信息展示模块El
    function createCurrentSeatInfoModuleEl() {
        var html = '';
        try {
            html += '<table id="currentSeatInfo_' + (_currentAirEquipType || "") + '" class="hnaui-table table-current-seat">';
            html += '   <thead>';
            html += '       <tr><th colspan="4">当前的座位信息</th></tr>';
            html += '   </thead>';
            html += '   <tbody>';
            html += '       <tr><td width="70">座位类型：</td><td class="currentSeatTitle"></td><td width="70">座位编号：</td><td class="currentSeatCode"></td></tr>';
            html += '       <tr><td>座位状态：</td><td class="currentSeatState"></td><td>座位价格：</td><td class="currentSeatPrice"></td></tr>';
            html += '   </tbody>';
            html += '</table>';
            return html;
        } catch (e) {
            JsErrorTips(e);
            html = '';
        }
        return html;
    }

    //创建确定选座和暂不选座按钮
    function createSubmitBtnEl() {
        var html = '';
        try {
            html += '<div class="seat-submit hnaui-clear hnaui-push-center">';
            //html += '   <div class="hnaui-btn hnaui-btn-primary no-choose-seat-btn ' + classList[5] + ' hnaui-left">暂不选座</div>';
            html += '   <div class="hnaui-btn hnaui-btn-theme choose-seat-btn ' + classList[5] + ' ' + classList[0] + '">确定选座</div>';
            html += '</div>';
        } catch (e) {
            JsErrorTips(e);
            html = '';
        }
        return html;
    }

    //创建机型座位分布模块El
    function createPlaneLayoutMapModuleEl() {
        var html = '';
        try {
            html += '   <div class="hnui-seat-map hnaui-clear" id="seatMap_' + (_currentAirEquipType || "") + '">';
            html += '       <a class="seat-map-arrow seat-map-up">';
            html += '           <i class="seat-up click-btn ' + classList[1] + '">&#xe619;</i>';
            html += '       </a>';
            html += createSeatMapTitleEl();
            html += '       <div class="seat-map-wrapper">';
            html += createSeatMapContentEl();
            html += '           </div>';
            html += createSeatMapTitleEl();
            html += '       <a class="seat-map-arrow seat-map-down">';
            html += '           <i class="seat-down click-btn ' + classList[1] + '">&#xe61a;</i>';
            html += '       </a>';
            html += '   </div>';
        } catch (e) {
            JsErrorTips(e);
            html = "";
        }
        return html;
    }
    //获取座位分布图的横坐标的字母栏的数据
    function getSeatMapTitleList(){
        var arr = (((((_seatMapInfo.aircraft || {}).duck || [])[0] || {}).seatCabins || [])[0] || {}).sections || [];

        var list = [];
        (arr || []).forEach(function (item) {
            if ((item.columnRef || []).length < 1) {
                list.push(false);
            } else {
                (item.columnRef || []).forEach(function (subItem) {
                    list.push(subItem.id);
                });
            }
        });

        return list;
    }
    //获取座位分布图的座位数据
    function getSeatMapContentData(){
        return (((((_seatMapInfo.aircraft || {}).duck || [])[0] || {}).seatCabins || [])[0] || {}).row || [];
    }
    //获取每一个座位信息的数据
    function getSeatInfoData(){
        return _seatMapInfo.seatMaps;
    }
    //创建座位分布图的横坐标的字母栏
    function createSeatMapTitleEl() {
        var arr = getSeatMapTitleList();
        var html = '';
        try {
            html += '<ul class="seat-map-title hnaui-clear">';
            html += '<li></li>';
            (arr || []).forEach(function (item) {
                if(item){
                    html += '<li>' + (item.toUpperCase() || "") + '</li>';
                }else{
                    html += '<li class="aisle"></li>';
                }
            });
            html += '<li></li>';
            html += '</ul>';
        } catch (e) {
            JsErrorTips(e);
            html = "";
        }
        return html;
    }
    //创建座位分布图的座位
    function createSeatMapContentEl() {
        var seatMapArr = getSeatMapContentData();
        var html = '';
        try {
            html += '<table class="hnaui-table" hna-skin="line">';
            html += '   <tbody>';
            if(seatMapArr.length > 0){
                (seatMapArr || []).forEach(function (item, index) {
                    var number = item.number || "";
                    html += '   <tr  data-index="' + number + '">';
                    html += '       <td class="seat-map-index">' + number + '</td>';
                    var seatRef = filterSeatRefFun(item.seatRef) || [];
                    (seatRef || []).forEach(function (o) {
                        if (o.type == "aisle") {
                            html += '<td class="seat-map-aisle">';
                            if (index <= 0) {
                                html += '<i class="icon-seat ' + classList[1] + '">&#xe900;</i>';
                            }
                            html += '</td>';
                        } else {
                            var disabled = "";
                            if (o.type == "disabled" || o.type == "blocked") {
                                disabled = "disabled";
                                o.type = "blocked";
                            }
                            html += '<td class="seat-map-item ' + disabled + ' seat-index-' + o.id.toLowerCase() + '" ' +
                                'data-id="' + o.id.toUpperCase() + '" ' +
                                'data-index="'+ o.index +'" ' +
                                'data-uri="'+ o.uri +'" ' +
                                'data-ref="'+ o.ref +'" ' +
                                'data-price="'+ o.price +'" ' +
                                'data-currency="'+ o.currency +'" ' +
                                'data-type="' + o.type + '">';
                            html += '   <i class="icon-seat icon-seat-' + o.type + ' ' + classList[1] + '">&#xe902;</i>';
                            html += '</td>';
                        }
                    });
                    html += '       <td class="seat-map-index">' + number + '</td>';
                    html += '   </tr>';
                });
            }else{
                html += '<tr><td colspan="10" style="text-align: center">该航班暂时没有可选座位</td></tr>';

            }
            html += '   </tbody>';
            html += '</table>';
        } catch (e) {
            JsErrorTips(e);
            html = "";
        }
        return html;
    }
    //过滤数据
    function filterSeatRefFun(list) {
        if (!list) {
            list = {};
        }
        var colArr = [];
        var arr = getSeatMapTitleList();
        var count = 0;
        (arr || []).forEach(function (item) {
            if(item){
                var o = filterSeatInfo(hna.cloneObj(list[count]));
                colArr.push(o);
                count++;
            }else{
                colArr.push({"type":"aisle"});
            }
        });
        return colArr;
    }
    //获取座位信息，是否可用，座位类型
    function filterSeatInfo(o){
        if(!o){
            o = {};
        }
        var arr = getSeatInfoData() || [];
        for(var a= 0,a1=arr.length;a<a1;a++){
            var item = arr[a];
            if(item.id == o.id){
                o.uri = item.uri || "";
                o.ref = item.ref || "";
                o.price = item.totalFare;
                o.currency = item.totalFareCurrency;
                if(item.availability != "AVAILABLE"){
                    o.type = "blocked";
                }else{
                    o.type = (item.code || "").replace("_SEAT","").toLowerCase();
                }
                break;
            }
        }
        return o;
    }

    //获取该航班可用的座位
    function getSeatType(){
        var arr = getSeatInfoData() || [];
        for(var a= 0,a1=arr.length;a<a1;a++){
            var item = arr[a];
            var itemType = (item.code || "").replace("_SEAT","").toLowerCase();
            var bl = false;
            for(var b= 0,b1=_seatTypeList.length;b<b1;b++){
                var subItem = _seatTypeList[b];
                if(subItem.type == itemType){
                    bl = true;
                    break;
                }
            }
            if(!bl && itemType){
                _seatTypeList.push({
                    type: itemType,
                    title: item.description,
                    price: item.totalFare,
                    currency: item.totalFareCurrency
                });
            }
        }
    }

    //如果用户已经有选择的座位，则给添加上去
    function setTravellerSeatInfo(){
        _timeFlag = "old";
        (_seatTravellers || []).forEach(function(item,index){
            (item.seatlist || []).forEach(function(o){
                if(o.flightSegmentId == _flightSegmentId){
                    $(".traveller-item").eq(index).find(".hnaui-form-radio>.hnaui-icon").trigger("click");
                    $(".seat-index-"+ o.seatNum).trigger("mouseover").trigger("click");
                }
            });
        });
        _timeFlag = "new";
    }

    //重新设置乘机人选择的座位信息展示模块的内容
    function initTravellerSeatInfoModule() {
        var chooseCount = 0;
        var $tr = $("#travellers_" + _currentAirEquipType).find("tbody tr.traveller-item");
        $tr.each(function () {
            var $this = $(this);
            if (!$this.hasClass("has-ok")) {
                $this.find(".traveller-seat").html("");
                $this.find(".traveller-ok").hide();
                $this.find(".traveller-close").hide();
            } else {
                $this.find(".traveller-ok").hide();
                $this.find(".traveller-close").show();
                chooseCount++;
            }
        });

        $(".choose-seat-btn").toggleClass(classList[0], chooseCount != $tr.length);
        //$(".choose-seat-btn").toggleClass(classList[0], chooseCount>0);
    }

    //重新设置鼠标选中的当前座位信息展示模块的内容
    function initCurrentSeatInfoModule(o) {
        if (!o) {
            o = {};
        }

        //设置当前座位信息展示模块中的icon
        var html = "";
        if (o.type) {
            _seatTypeList.forEach(function (item) {
                if (item.type == o.type) {
                    html = '<i class="icon-seat icon-seat-' + (item.type || "") + ' ' + classList[1] + '">&#xe902;</i><div class="hnaui-seat-title">' + (item.title || "") + '</div>';
                    return;
                }
            });
        }
        $(".currentSeatTitle").html(html);
        //设置当前座位信息展示模块中的code
        $(".currentSeatCode").html(o.code || "");
        //设置当前座位信息展示模块中的状态
        $(".currentSeatState").html(o.state === "" ? "" : (o.state ? "不可选" : "可选择"));
        $(".currentSeatPrice").html(o.state === "" ? "" : (o.state ? "--" : _formatMoney(o.price, o.currency)));
    }

    //给一个旅客确定座位
    function travellerOkFun(thisP) {
        thisP = thisP instanceof $ ? thisP : $(thisP);
        var $tr = thisP.parents("tr");
        var $travellerSeat = $tr.find(".traveller-seat");
        var code = $travellerSeat.text() || "";
        var index = $travellerSeat.data("index") || "";
        var uri = $travellerSeat.data("uri") || "";
        var ref = $travellerSeat.data("ref") || "";
        if (code) {
            $("#seatMap_" + _currentAirEquipType).find(".seat-index-" + code.toLowerCase()).addClass("disabled").find(".icon-seat").addClass("icon-seat-selected");
            $tr.addClass("has-ok").find("input[name='currentTraveller']").prop("checked", false).prop("disabled", true);
            //激活下一个乘机人
            activationNextTravller($tr);
            //$tr.next("tr").find("input[name='currentTraveller']").prop("checked", true);
            renderFrom();
            initTravellerSeatInfoModule();
        }

        $(".table-traveller-info").find("input[type='radio']");
        var thisId = $tr.find("input[type='radio']").val();
        _seatTravellers.forEach(function(item){
            if(_timeFlag == "old"){
                if(item.id == thisId){
                    item.seatId_old = code;
                    item.seatId = code;
                    item.index_old = index;
                    item.index = index;
                    item.seatMapId_old = _seatMapInfo.id;
                    item.seatMapId = _seatMapInfo.id;
                    item.uri_old = uri;
                    item.uri = uri;
                    item.ref_old = ref;
                    item.ref = ref;
                }
            }else{
                if(item.id == thisId){
                    item.seatId = code;
                    item.index = index;
                    item.seatMapId = _seatMapInfo.id;
                    item.uri = uri;
                    item.ref = ref;
                }
            }

        });
        getTravellerTotalAmount();
    }
    //当前乘机人的座位选择好之后，激活下一个没有选座座位的乘机人
    function activationNextTravller(thisTr){
        thisTr.siblings().not($(".has-ok")).first().find("input[name='currentTraveller']").prop("checked", true);
    }

    //把一个旅客已经选择的座位删除
    function travellerCloseFun(thisP) {
        thisP = thisP instanceof $ ? thisP : $(thisP);
        var $tr = thisP.parents("tr");
        var code = $tr.find(".traveller-seat").text() || "";
        $("#seatMap_" + _currentAirEquipType).find(".seat-index-" + code.toLowerCase()).removeClass("disabled").find(".icon-seat").removeClass("icon-seat-selected");
        $tr.removeClass("has-ok").find("input[name='currentTraveller']").prop("checked", true).prop("disabled", false);
        renderFrom();
        initTravellerSeatInfoModule();
        getTravellerTotalAmount();
    }

    //统计所选座位的额外差价
    function getTravellerTotalAmount(){
        var total = 0;
        var currency = "";
        var $tableTravellerInfo = $(".table-traveller-info");
        $tableTravellerInfo.find("tr.has-ok").each(function(){
            var $travellerSeat = $(this).find(".traveller-seat");
            currency = $travellerSeat.data("currency");
            var price = parseFloat($travellerSeat.data("price") || "0");
            var oldprice = parseFloat($travellerSeat.data("oldprice") || "0");
            total += (price - oldprice);
        });

        $tableTravellerInfo.find(".price").html(_formatMoney(total,currency));

    }

    var _animated = false;
    //滚动座位分布图
    function slideSeat(up) {
        try {
            if(_animated){
                return false;
            }
            var h = $(".seat-map-wrapper").height();
            var $tab = $('.seat-map-wrapper table');
            var $tTop = $tab.position().top;
            var $tHeight = $tab.height();
            var newTop = 0;
            var bl = false;
            if (!$tab.is(":animated")) {
                if (up) {
                    if($tTop<0){
                        bl = true;
                        newTop = $tTop + h;
                        if(newTop>0){
                            newTop = 0;
                        }
                    }
                } else {
                    if ($tHeight - Math.abs($tTop) > h) {
                        bl = true;
                        newTop = $tTop - h;
                        if($tHeight - Math.abs(newTop) < h ){
                            newTop = h - $tHeight;
                        }
                    }
                }
            }
            if(bl){
                _animated = true;
                $tab.animate({"top": newTop}, 800, function(){
                    _animated = false;

                    var $hnauiPlaneHead = $(".hnaui-plane-head");
                    var baY = parseFloat(($hnauiPlaneHead.css("background-position-y") || "").replace("px",""));
                    if(up){
                        baY += 300;
                    }else{
                         baY -= 300;
                    }
                    $hnauiPlaneHead.css("background-position-y",baY);
                });
            }

        } catch (e) {
            JsErrorTips(e);
        }
    }

    function TravellerSeat(info){
        this.id = info.id || "";
        this.index = info.index || "";
        this.index_old = info.index_old || "";
        this.ref = info.ref || "";
        this.ref_old = info.ref_old || "";
        this.seatId = info.seatId || "";
        this.seatId_old = info.seatId_old || "";
        this.seatMapId = info.seatMapId || "";
        this.seatMapId_old = info.seatMapId_old || "";
        this.uri = info.uri || "";
        this.uri_old = info.uri_old || "";
        this.firstName = info.firstName || "";
        this.lastName = info.lastName || "";
        this.passType = info.passType || "";
    }

    function chooseSeat() {
        var arr = [];
        (_seatTravellers || []).forEach(function(item){
            arr.push(new TravellerSeat(item));
        });
        return {
            "flightSegmentId":_flightSegmentId,
            "seatInfo":arr
        };
    }

    //初始化事件
    function initEventSeat() {
        try {
            //页面点击事件
            $(document).on("click", "." + classList[5] + ",.seat-map-item", function (e) {
                e.stopPropagation();
                try {
                    var $this = $(e.target);
                    if ($this.hasClass(classList[0])) {
                        return false;
                    }
                    if ($this.hasClass("traveller-close")) {
                        //删除旅客选择的座位
                        travellerCloseFun($this);
                    } else if ($this.hasClass("traveller-ok")) {
                        //确定旅客选择的座位
                        travellerOkFun($this);
                    } else if ($this.hasClass("seat-map-item")) {
                        //相当于点击被选中的旅客的traveller-ok
                        if (!$this.hasClass("disabled")) {
                            $("input[name='currentTraveller']:checked").parents("tr").find(".traveller-ok").trigger("click");
                        }
                    } else if ($this.hasClass("seat-up")) {
                        slideSeat("up");
                    } else if ($this.hasClass("seat-down")) {
                        slideSeat();
                    } else if ($this.hasClass("choose-seat-btn")) {
                        //提交选择的座位
                        if (hna.isFunction(chooseSeatCallback)) {
                            chooseSeatCallback(chooseSeat());
                        }
                    } else if ($this.hasClass("no-choose-seat-btn")) {
                        //暂时不选择座位
                        if (hna.isFunction(cancelChooseSeatCallback)) {
                            cancelChooseSeatCallback();
                        }
                    }
                } catch (ev) {
                    JsErrorTips(ev);
                }
            });
            $(document).on("mouseover", ".seat-map-item", function (e) {
                e.stopPropagation();
                try {
                    var $this = $(e.target);

                    //获取鼠标选中的座位的code
                    var thisID = $this.data("id") || "";
                    var thisIndex = $this.data("index") || "";
                    var thisUri = $this.data("uri") || "";
                    var thisRef= $this.data("ref") || "";
                    var thisPrice= $this.data("price") || "";
                    var thisCurrency= $this.data("currency") || "";
                    //获取鼠标选中座位的类型type
                    var thisType = $this.data("type");
                    var isDisabled = $this.hasClass("disabled") || false;

                    initCurrentSeatInfoModule({
                        type: thisType,
                        code: thisID,
                        index: thisIndex,
                        state: isDisabled,
                        price:thisPrice,
                        currency:thisCurrency
                    });

                    if (isDisabled) {
                        thisID = "";
                        thisIndex = "";
                        thisUri = "";
                        thisRef = "";
                        thisPrice = "";
                        thisCurrency = "";
                    }

                    if (thisID) {
                        var currentTravellerTr = $("input[name='currentTraveller']:checked").parents("tr");
                        //_timeFlag
                        var $travellerSeat = currentTravellerTr.find(".traveller-seat");
                        $travellerSeat.html(thisID).data("index",thisIndex).data("uri",thisUri).data("ref",thisRef).data("currency",thisCurrency);
                        if(_timeFlag != "old"){
                            $travellerSeat.data("price",thisPrice);
                        }else{
                            $travellerSeat.data("oldprice",thisPrice).data("price",thisPrice);
                        }
                        currentTravellerTr.find(".traveller-close").hide();
                        currentTravellerTr.find(".traveller-ok").show();
                    }

                } catch (ev) {
                    JsErrorTips(ev);
                }
            });
            $(document).on("mouseout", ".hnui-seat-map", function (e) {
                e.stopPropagation();
                try {
                    var $this = $(e.target);
                    initCurrentSeatInfoModule({
                        type: "",
                        code: "",
                        index: "",
                        state: "",
                        price:"",
                        currency:""
                    });
                } catch (ev) {
                    JsErrorTips(ev);
                }
            });

            globalFrom.on('radio(currentTraveller)', function (data) {
                //var $this = $(data.elem);
                initTravellerSeatInfoModule();
            });
        } catch (e) {
            JsErrorTips(e);
        }
    }

    //获取航班座位信息
    function getSeatMapInfo(o) {
        if (!o) {
            o = {};
        }
        try {
            if (hna.isFunction(o.beforeFun)) {
                o.beforeFun();
            }

            _seatTravellers = o.seatTravellers;
            _currentAirEquipType = o.currentAirEquipType;
            _currentFlightNumber = o.currentFlightNumber;
            _flightSegmentId = o.flightSegmentId;

            $(".hnaui-flight-seat ." + classList[4]).show();
            hna.ajax({
                url: ajaxUrl.getSeatMapInfo,
                data: {
                    "flightSegmentId": _flightSegmentId
                },
                doneCallback: function (data) {
                    if (data && data.code == "200") {
                        _seatMapInfo = data.data || {};
                        getSeatType();
                        createFlightSeatInfoEl();
                    }
                    if (hna.isFunction(o.afterFun)) {
                        o.afterFun();
                    }
                }
            });
        } catch (e) {
            JsErrorTips(e);
        }
    }

    function init(o) {
        if (!o) {
            return false;
        }
        if (!hasInit) {
            initEventSeat();
        }
        hasInit = true;
        _ajaxUrl = o.ajaxUrl;
        panelID = o.id;
        titleID = o.titleId;
        chooseSeatCallback = o.chooseSeatCallback;
        cancelChooseSeatCallback = o.cancelChooseSeatCallback;
    }

    return {
        init: init,
        getSeatMapInfo: getSeatMapInfo
    };
})(jQuery, window, document);