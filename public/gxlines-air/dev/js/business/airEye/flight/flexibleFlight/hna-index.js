hna._i18nMap.addLanguages({
    "FF01":{"zh_CN":"前一月","en_US":"Flight number"},
    "FF02":{"zh_CN":"后一月","en_US":"Flight number"},
    "FF03":{"zh_CN":"不含税费","en_US":"Flight number"},
    "FF04":{"zh_CN":"返回","en_US":"Flight number"},
    "FF05":{"zh_CN":"选择这一天","en_US":"Flight number"},
    "FF06":{"zh_CN":"星期日","en_US":"Flight number"},
    "FF07":{"zh_CN":"星期一","en_US":"Flight number"},
    "FF08":{"zh_CN":"星期二","en_US":"Flight number"},
    "FF09":{"zh_CN":"星期三","en_US":"Flight number"},
    "FF10":{"zh_CN":"星期四","en_US":"Flight number"},
    "FF11":{"zh_CN":"星期五","en_US":"Flight number"},
    "FF12":{"zh_CN":"星期六","en_US":"Flight number"}
});

var ajaxUrl={
    getPriceTrend:"/flight/getPriceTrend"
};

var _index = 0;
//本地时间
var _currentDay = hna._date.getDateInfo().date;
var _fInfo = "";

var _searchCity = [];

var _firstDate = "";
var _lastDate = "";

$(function(){
    //页面点击事件
    $(document).on("click",".click-btn",function(e){
        e.stopPropagation();
        try{
            var $this = $(e.target);
            var currentDay = '';
            if($this.hasClass("hnaui-btn-disabled")){
                return false;
            }
            if($this.hasClass("return-btn")){
                //返回
                history.back();

            } else if($this.hasClass("submit-btn")){
                //继续购票
                continueBuyTickets();

            } else if($this.hasClass("preweek")){
                //前一月
                getPrevMonthData();

            } else if($this.hasClass("nextweek")){
                //后一月
                getNextMonthData();

            } else if($this.hasClass("price-td")){
                //选择
                if ($this.hasClass("active")) {
                    return false;
                }
                setSubmitBtnState($this);

            } else if($this.hasClass("look-td")){
                //选择
                setSubmitBtnState($this);

                continueBuyTickets();

            }
        }catch(err){
            JsErrorTips(err);
        }
    });

    try{
        //设置购票进度条
        setFlightState("flight-state-search");
        var request = hna.getRequest() || {};
        _index = request.index || "0";

        hna.jsData.getFlightCityData(function (data) {
            _flightCityData = data;

            //获取查询航班的参数
            _sInfo = getSearchFlightInfo();
            //获取查询行航班的结果
            getPriceTrend();
        });
        hna.goToTop("1");
    }catch(e){
        JsErrorTips(e);
    }
});