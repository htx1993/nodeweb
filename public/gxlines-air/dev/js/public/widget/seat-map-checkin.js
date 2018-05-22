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


window.HNAChooseSeat = HNAChooseSeat = (function($, w, d, undefined){
    var hasInit = false;
    var selected = undefined;
    var _ajaxUrl = "";
    var _ajaxData = null;
    var _chooseCallback = null;
    var _cancelCallback = null;
    //需要选择座位的航班id
    var _flightSegmentId = "";
    //需要选择座位的乘机人信息
    var _seatTravellers = null;
    //需要选择座位的飞机座位信息
    var _seatMapInfo = null;

    //当前的机型编号
    var _currentAirEquipType = "";
    //当前航班号
    var _currentFlightNumber = "";

    var classList = ["hnaui-btn-disabled", "hnaui-icon", "td-text", "td-title", "search-loading", "click-btn"];

    //飞机座位类型
    var _seatTypeList = [
        {
            "type": "first",
            "title": "头等座位"
        },
        {
            "type": "vip",
            "title": "尊享座位"
        },
        {
            "type": "business",
            "title": "商务座位"
        },
        {
            "type": "comfort",
            "title": "便捷舒适座位"
        },
        {
            "type": "select",
            "title": "优选座位"
        },
        {
            "type": "normal",
            "title": "经济座位"
        },
        {
            "type": "standard",
            "title": "标准座位"
        },
        {
            "type": "exit",
            "title": "安全门座位"
        },
        {
            "type": "blocked",
            "title": "已被他人选择"
        },
        {
            "type": "selected",
            "title": "选择座位"
        }
    ];
    //创建某一个机型的座位分布图EL
    function createFlightSeatInfoEl() {
        try {
            var html = '';
            html += '   <div class="col-xs-12 col-sm-12 col-md-8 col-lg-3 plane-explain">';
            html += createPlaneExplainModuleEl();
            html += '   </div>';
            html += '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 traveller-seat-info">';
            html += createTravellerSeatInfoModuleEl();
            html += createCurrentSeatInfoModuleEl();
            html += createSubmitBtnEl();
            html += '   </div>';
            html += '   <div class="col-xs-12 col-sm-12 col-md-8 col-lg-5 plane-layout hnaui-right">';
            html += createPlaneLayoutMapModuleEl();
            html += '       </div>';
            html += '   </div>';

            $("#currentFlightSeat").html(html);
            $("#currentFlightTitle").html("航班-" + _currentFlightNumber);
            $(".hnaui-flight-seat ." + classList[4]).hide();
            renderFrom();
            $("input[name='currentTraveller']").first().siblings(".hnaui-form-radio").trigger("click");
        } catch (e) {
            JsErrorTips(e);
        }
    }
    //创建机型座位说明模块EL
    function createPlaneExplainModuleEl() {
        try {
            var html = '<div id="planeImg_' + (_currentAirEquipType || "") + '" class="hnaui-plane hnaui-plane-head"></div>';
            html += '<table id="planeTypeInfo_' + (_currentAirEquipType || "") + '" class="hnaui-table table-seat-type"><tbody>';
            for (var a = 0, a1 = _seatTypeList.length; a < a1; a++) {
                html += '<tr>';
                html += getOneSeatInfo(a);
                // html += getOneSeatInfo(a + 2);
                html += '</tr>';
            }
            html += '</tbody></table>';
            return html;
        } catch (e) {
            JsErrorTips(e);
            return "";
        }
    }
    //创建乘机人选择的座位信息展示模块El
    function createTravellerSeatInfoModuleEl() {
        try {
            var html = '<table id="travellers_' + (_currentAirEquipType || "") + '" class="hnaui-table table-traveller-info">';
            html += '<thead>';
            html += '<tr><th width="160">乘客姓名</th><th>座位号</th><th class="hnaui-push-right">操作</th></tr>';
            html += '</thead>';
            html += '<tbody>';
            _seatTravellers.forEach(function (item) {
                var traveller = new Traveller(item);
                html += '<tr>';
                html += '<td><input type="radio" name="currentTraveller" hna-filter="currentTraveller" value="' + (traveller.id) + '" title="' + (traveller.fullName) + '(' + (_filterPassType(traveller.passType) || "") + ')"></td>';
                html += '<td class="traveller-seat"></td>';
                html += '<td class="hnaui-push-right"><i class="' + classList[1] + ' ' + classList[5] + ' traveller-close close-btn transition">&#x2716;</i><i class="' + classList[1] + ' ' + classList[5] + ' traveller-ok">&#xe605;</i></td>';
                html += '</tr>';
            });
            html += '</tbody>';
            html += '</table>';
            return html;
        } catch (e) {
            JsErrorTips(e);
            return "";
        }
    }
    //创建鼠标选中的当前座位信息展示模块El
    function createCurrentSeatInfoModuleEl() {
        try {
            var html = '<table id="currentSeatInfo_' + (_currentAirEquipType || "") + '" class="hnaui-table table-current-seat">';
            html += '<thead><tr><th colspan="2">当前的座位信息</th></tr></thead>';
            html += '<tbody>';
            html += '<tr><td width="100">座位类型</td><td class="currentSeatTitle"></td></tr>';
            html += '<tr><td>座位编号</td><td class="currentSeatCode"></td></tr>';
            html += '<tr><td>座位状态</td><td class="currentSeatState"></td></tr>';
            html += '</tbody>';
            html += '</table>';
            return html;
        } catch (e) {
            JsErrorTips(e);
            return "";
        }
    }
    //创建确定选座和暂不选座按钮
    function createSubmitBtnEl() {
        var html = '<div class="seat-submit hnaui-clear">';
        html += '<div class="hnaui-btn hnaui-btn-theme hnaui-btn-model choose-seat-btn ' + classList[5] + ' ' + classList[0] + ' hnaui-right">确定选座 <i class="' + classList[1] + '">စ</i></div>';
        html += '</div>';
        return html;
    }
    //创建机型座位分布模块El
    function createPlaneLayoutMapModuleEl() {
        var seatMapArr = [];
        if (_seatMapInfo["0_0_" + _currentAirEquipType]) {
            seatMapArr = _seatMapInfo["0_0_" + _currentAirEquipType].data || [];
        }
        /*if(_seatMapInfo.seatMap.rows){
         seatMapArr = _seatMapInfo.seatMap.rows || [];
         }*/

        try {
            var html = '<div class="hnui-seat-map hnaui-clear" id="seatMap_' + (_currentAirEquipType || "") + '">';
            html += '       <a class="seat-map-arrow seat-map-up"><i class="seat-up click-btn ' + classList[1] + '"></i></a>';
            html += createSeatMapTitleEl();
            html += '       <div class="seat-map-wrapper">';
            html += '           <table class="hnaui-table" hna-skin="line"><tbody>';
            seatMapArr.forEach(function (item, index) {
                var title = item.title || "";
                html += '           <tr  data-index="' + title + '">';
                html += '               <td class="seat-map-index">' + title + '</td>';
                var subItem = filterSeatColsFun(item.cols) || [];
                subItem.forEach(function (o, i) {
                    var code = title + (o.colName || "");
                    var type = o.type || "";
                    if (type == "aisle") {
                        html += '           <td class="seat-map-aisle">';
                        if (i <= 0) {
                            html += '               <i class="icon-seat ' + classList[1] + '"></i>';
                        }
                        html += '           </td>';
                    } else {
                        var disabled = "";
                        if (type == "disabled") {
                            disabled = "disabled";
                            type = "blocked";
                        }
                        html += '           <td class="seat-map-item ' + disabled + ' seat-index-' + code.toLowerCase() + '" data-coordinate="' + code.toUpperCase() + '" data-type="' + type + '">';
                        html += '               <i class="icon-seat icon-seat-' + type + ' ' + classList[1] + '"></i>';
                        html += '           </td>';
                    }
                });
                html += '               <td class="seat-map-index">' + title + '</td>';
                html += '           </tr>';
            });
            html += '           </tbody></table>';
            html += '           </div>';
            html += createSeatMapTitleEl();
            html += '       <a class="seat-map-arrow seat-map-down"><i class="seat-down click-btn ' + classList[1] + '"></i></a>';
            html += '   </div>';
            return html;
        } catch (e) {
            JsErrorTips(e);
            return "";
        }
    }
    //创建座位分布图的横坐标的字母栏
    function createSeatMapTitleEl() {
        var o = hna.cloneObj(HNA_FLIGHT_SEAT_LAYER_VA[_currentAirEquipType]);
        try {
            var html = '<ul class="seat-map-title hnaui-clear">';
            var arr = o.columns || [];
            arr.push("");
            arr.unshift("");
            o.columns.forEach(function (item) {
                if (item === false) {
                    html += '<li class="aisle"></li>';
                } else {
                    html += '<li>' + (item.toUpperCase() || "") + '</li>';
                }
            });
            html += '</ul>';
            return html;
        } catch (e) {
            JsErrorTips(e);
            return "";
        }
    }
    //过滤数据
    function filterSeatColsFun(list) {
        if (!list) {
            list = {};
        }
        var colArr = hna.cloneObj(list);
        var arr = HNA_FLIGHT_SEAT_LAYER_VA[_currentAirEquipType].columns || [];
        arr.forEach(function (item, index) {
            if (item === false) {
                colArr.splice(index, 0, {"colName": "", "type": "aisle"});
            }
        });
        return colArr;
    }
    //根据座位类型，获取座位的相关信息
    function getOneSeatInfo(index) {
        try {
            var item = _seatTypeList[index || 0];
            var html = '<td class="seat-type-item">';
            html += '       <i class="icon-seat icon-seat-' + (item.type || "") + ' ' + classList[1] + '"></i>';
            html += '       <div class="hnaui-seat-title">' + (item.title || "") + '</div>';
            html += '   </td>';
            return html;
        } catch (e) {
            JsErrorTips(e);
            return "";
        }
    }
    //重新设置乘机人选择的座位信息展示模块的内容
    function initTravellerSeatInfoModule() {
        var chooseCount = 0;
        var $tr = $("#travellers_" + _currentAirEquipType).find("tbody tr");
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

        $(".submit-btn").toggleClass(classList[0], chooseCount != $tr.length);
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
                    html = '<i class="icon-seat icon-seat-' + (item.type || "") + ' ' + classList[1] + '"></i><div class="hnaui-seat-title">' + (item.title || "") + '</div>';
                    return;
                }
            });
        }
        $(".currentSeatTitle").html(html);
        //设置当前座位信息展示模块中的code
        $(".currentSeatCode").html(o.code || "");
        //设置当前座位信息展示模块中的状态
        $(".currentSeatState").html(o.state === "" ? "" : (o.state ? "不可选" : "可选择"));
    }
    //给一个旅客确定座位
    function travellerOkFun(thisP) {
        thisP = thisP instanceof $ ? thisP : $(thisP);
        var $tr = thisP.parents("tr");
        var code = $tr.find(".traveller-seat").text() || "";
        if (code) {
            $("#seatMap_" + _currentAirEquipType).find(".seat-index-" + code.toLowerCase()).addClass("disabled").find(".icon-seat").addClass("icon-seat-selected");
            $tr.addClass("has-ok").find("input[name='currentTraveller']").prop("checked", false).prop("disabled", true);
            $tr.next("tr").find("input[name='currentTraveller']").prop("checked", true);
            renderFrom();
            initTravellerSeatInfoModule();
            var thisId = $tr.find("input[type='radio']").val();
        }
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
    }

    //初始化事件
    function initEventSeat(){
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
                        chooseSeat();
                    } else if ($this.hasClass("traveller-ok")) {
                        //确定旅客选择的座位
                        travellerOkFun($this);
                        chooseSeat();
                    } else if ($this.hasClass("seat-map-item")) {
                        //相当于点击被选中的旅客的traveller-ok
                        if (!$this.hasClass("disabled")) {
                            $("input[name='currentTraveller']:checked").parents("tr").find(".traveller-ok").trigger("click");
                        }
                        selected = $this.data("coordinate");
                        chooseSeat();
                    } else if ($this.hasClass("seat-up")) {
                        slideSeat("up");
                    } else if ($this.hasClass("seat-down")) {
                        slideSeat();
                    } else if ($this.hasClass("choose-seat-btn")) {
                        //提交选择的座位
                        if(hna.isFunction(_chooseCallback)){
                            _chooseCallback(selected);
                        }
                    } else if ($this.hasClass("no-choose-seat-btn")) {
                        //暂时不选择座位
                        hna.loading();
                        if(hna.isFunction(_cancelCallback)){
                            _cancelCallback();
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
                    var thisCoordinate = $this.data("coordinate") || "";
                    //获取鼠标选中座位的类型type
                    var thisType = $this.data("type");
                    var isDisabled = $this.hasClass("disabled") || false;

                    initCurrentSeatInfoModule({
                        type: thisType,
                        code: thisCoordinate,
                        state: isDisabled
                    });


                    var travellerSeat = "";
                    if (!isDisabled) {
                        travellerSeat = thisCoordinate;
                    }
                    if (travellerSeat) {
                        var currentTravellerTr = $("input[name='currentTraveller']:checked").parents("tr");
                        currentTravellerTr.find(".traveller-seat").html(travellerSeat);
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
                        state: ""
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

    //确认按钮可用？
    function chooseSeat(){
        if($("input[name='currentTraveller']:disabled").length == $(".table-traveller-info tbody tr").length){
            $(".choose-seat-btn").removeClass("hnaui-btn-disabled");
        }else{
            $(".choose-seat-btn").addClass("hnaui-btn-disabled");
        }
    }

    //获取航班座位信息
    function getSeatMapInfo(o) {
        if(!o){
            o = {};
        }
        try {
            if(hna.isFunction(o.beforeFun)){
                o.beforeFun();
            }

            _seatTravellers = o.seatTravellers;
            _currentAirEquipType = o.currentAirEquipType;
            _currentFlightNumber = o.currentFlightNumber;
            _flightSegmentId = o.flightSegmentId;

            $(".hnaui-flight-seat ." + classList[4]).show();
            hna.ajax({
                url: _ajaxUrl,
                data: _ajaxData,
                doneCallback: function (data) {
                    if (data && data.code == "200") {
                        _seatMapInfo = data.data || {};
                        createFlightSeatInfoEl();
                    }
                    if(hna.isFunction(o.afterFun)){
                        o.afterFun();
                    }
                }
            });
        } catch (e) {
            JsErrorTips(e);
        }
    }

    function init(o){
        if(!o){
            return false;
        }
        if(!hasInit){
            initEventSeat();
        }
        hasInit = true;
        _ajaxUrl = o.ajaxUrl;
        _ajaxData = o.ajaxData;
        _chooseCallback = o.chooseCallback;
    }

    return {
        init:init,
        getSeatMapInfo:getSeatMapInfo
    };
})(jQuery, window, document);