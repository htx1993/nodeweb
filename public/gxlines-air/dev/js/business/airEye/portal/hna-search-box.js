//初始化航班查询
function initFlightSearch() {
    //页面点击事件
    $(document).on("click", ".click-btn", function (e) {
        e.stopPropagation();
        try {
            var $this = $(e.target);
            if($this.hasClass("hnaui-btn-disabled")){
                return false;
            }
            if($this.hasClass("search-btn")){//提交搜索
                if(!$("#backDate").val()) {//如果返程日期为空重置为单程
                    $(".trip-type-ow").next(".hnaui-form-radio").trigger("click");
                }
                $(".flexible-item .trip-type-false").trigger("click");//固定为必须这天成行
                var lock = getSearchBoxParam();
                if(!lock){
                    return false;
                }
                saveSearchFlightInfo();
                if(_sInfo.flexible === "Y"){
                    goToPage("/airEye/flight/flexible");
                }else{
                    searchFlightFun({
                        beforeCallbackFun: function () {
                            hna.loading();
                        },
                        doneCallbackFun: function () {
                            goToPage("/airEye/flight/select");
                        },
                        alwaysCallbackFun: function () {
                        }
                    });
                }
            } else if ($this.hasClass("change-btn")) {//交换城市
                changeCity();
            }
        }catch(ev){
            JsErrorTips(ev);
        }
    });
    try {
        _sInfo = getSearchFlightInfo();
        if (_sInfo.tripType == "MC") {
            _sInfo.tripType = "OW";
            _sInfo.inboundOption.departureDate = "";
        }
        //清空本地的航班结果
        saveSearchFlightResult();

        setDefaultValue();
        renderFrom();
        initSearchEvent();
    } catch (e) {
        JsErrorTips(e);
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

//点击多航段的操作
function clickMultiWayFun() {
    try {
        _sInfo.tripType = "MC";
        saveSearchFlightInfo(_sInfo);
        goToPage("/airEye/flight/search");
    } catch (e) {
        JsErrorTips(e);
    }
}

//点击城市交换功能
function changeCity() {
    //交换三字码
    try {
        var originCode = $("#originLocationCode").val();
        var destinationCode = $("#destinationLocationCode").val();
        $("#originLocationCode").val(destinationCode);
        $("#destinationLocationCode").val(originCode);
        //交换城市
        var originName = $("#originLocationName").val();
        var destinationName = $("#destinationLocationName").val();
        $("#originLocationName").val(destinationName);
        $("#destinationLocationName").val(originName);
        //交换国际航班标识
        var originDom = $("#oriIsDomestic").val();
        var destinaDom = $("#desIsDomestic").val();
        $("#oriIsDomestic").val(destinaDom);
        $("#desIsDomestic").val(originDom);
    } catch (e) {
        JsErrorTips(e);
    }
}
