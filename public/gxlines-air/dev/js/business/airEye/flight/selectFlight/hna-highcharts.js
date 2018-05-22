/**
 * Created by lmm on 2016/6/28.
 */
//在画面上引入 <script src="http://code.highcharts.com/highcharts.js"></script> 相应的js文件
//在画面上添加一个id=container的div容器，并设置宽高
//对容器进行操作
hna._i18nMap.addLanguages({
    "PT01": {"zh_CN": "航班价格趋势图", "en_US": "Flight number"},
    "PT02": {"zh_CN": "机票", "en_US": "Flight number"},
    "PT03": {"zh_CN": "机票走势！", "en_US": "Flight number"},
    "PT04": {"zh_CN": "价格", "en_US": "Flight number"},
    "PT05": {"zh_CN": "由于座位、票价及汇率变化，部分价格可能与实际不符，请以实际购票为准", "en_US": "Flight number"},
    "PT06": {"zh_CN": "没有数据", "en_US": "Flight number"}
});

window.HNAPriceTrend = HNAPriceTrend = (function () {
    //ajax的url
    var ajaxUrl = {
        "getPriceTrend": "/flight/getPriceTrend"
    };
    //币种
    var currencyCode = "CNY";
    var currencyInfo = _getCurrencyInfo(currencyCode);

    //设置标题
    var title = {
        text: _i18n("PT02")//标题
    };

    //设置子标题
    var subtitle = {
        text: _i18n("PT03")//子标题
    };

    //X轴
    var xAxis = {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        lineColor: "#C0D0E0",//设置基线的样式
        lineWidth: 1,//线宽
        //gridLineWidth:1,//网格线宽度
        //showLastLabel:true,//是否显示最后一个标签
        tickInterval: 1,//设置间隔数
        labels: {
            formatter: function () {
                var thisday = this.value || "1970-01-01";
                return thisday.substring(thisday.lastIndexOf("-") + 1);
            }
        }
    };

    //Y轴
    var yAxis = {
        labels: {
            formatter: function () {
                return (currencyInfo.symbol) + this.value;
            }
        },
        title: {//标题
            text: _i18n("PT04")
        },
        plotLines: [{//主线样式
            value: 0,
            width: 1,
            color: '#f00'
        }],
        max: 2000,//最大值
        //min:0,//最小值
        //gridLineColor:"#f00",//网格颜色
        //lineColor:"#C0D0E0",//设置基线的样式
        lineWidth: 0//线宽
    };

    //划过时 plotOptions
    var tooltip = {
        valueSuffix: " " + currencyInfo.name,//后缀内容
        backgroundColor: "#fff",//背景颜色
        shadow: true,//是否有阴影
        borderWidth: 0//边宽
    };

    //标题样式
    var legend = {
        layout: 'horizontal',//显示为垂直或水平
        align: 'right',//位置
        verticalAlign: 'top',//对其方式
        borderWidth: 0,//是否有边界
        animation: true               // 是否启用动画效果
    };

    //数据源
    var series = [];

    //图表显示
    var plotOptions = {
        line: {//线样式
            dataLabels: {
                enabled: false//折线上面是否显示线上点的数据
            },
            enableMouseTracking: true//鼠标划过时 是否随着变化
        },
        series: {
            cursor: 'pointer',
            events: {
                click: function (e) {
                    var obj = {
                        tripType: "OW",
                        airplaneCity1: e.point.series.options.startCity || "",
                        airplaneCity1_value: e.point.series.options.startCityV || "",
                        airplaneCity2: e.point.series.options.endCity || "",
                        airplaneCity2_value: e.point.series.options.endCityV || "",
                        goday: e.point.category || "",
                        flexiableSearch: false
                    };
                    //submitRecomFlig(obj);
                }
            }
        }
    };
    //右下角的版权提示内容 和 能连接到的地址
    var credits = {
        text: '',//内容
        href: 'http://www.example.com'//链接
    };

    //线条颜色
    var optionSet = {colors: []};
    var optionColors = ['#C60B74', '#00A0EA'];

    function init(o) {
        if (!o) {
            return false;
        }
        createPriceTrendPanel(o.id);

        var arr = [];
        var outboundOption = _sInfo.outboundOption;
        if (!outboundOption.originLocationCode) {
            noData();
            return false;
        }
        arr.push({
            "org": outboundOption.originLocationCode,
            "dst": outboundOption.destinationLocationCode
        });
        arr.push({
            "org": outboundOption.destinationLocationCode,
            "dst": outboundOption.originLocationCode
        });
        var startDate = hna._date.getDateInfo().date;
        var endDate = hna._date.addDate(30, startDate);
        var queryData = {
            "query": arr,
            "startDate": startDate,
            "endDate": endDate
        };

        series = [];
        optionSet.colors = [];
        //获取数据
        hna.ajax({
            loading: "show",
            url: ajaxUrl.getPriceTrend,
            data: queryData,
            doneCallback: function (data) {
                if (data.code == "200") {
                    var priceData = data.data;
                    if (priceData.length > 0) {
                        var maxPrice = 0;
                        for (var a = 0, a1 = priceData.length; a < a1; a++) {
                            var obj = getFaresPrice(priceData[a].fares);
                            maxPrice = obj.maxPrice > maxPrice ? obj.maxPrice : maxPrice;
                            yAxis.max = maxPrice;                              //Y轴最大值
                            xAxis.categories = obj.day;
                            currencyCode = obj.currency;
                            currencyInfo = _getCurrencyInfo(currencyCode);
                            tooltip.valueSuffix = " " + currencyInfo.name;

                            series.push({
                                name: getCityNameByCode(priceData[a].org, "city") + "-" + getCityNameByCode(priceData[a].dst, "city"),
                                startCity: getCityNameByCode(priceData[a].org, "city"),
                                startCityV: priceData[a].org,
                                endCity: getCityNameByCode(priceData[a].dst, "city"),
                                endCityV: priceData[a].dst,
                                data: obj.data
                            });
                            optionSet.colors.push(optionColors[a]);
                        }
                        highchartInit();
                    } else {
                        noData();
                    }
                } else {
                    noData();
                }
            },
            failCallback: function (data) {
                noData();
            }
        });
    }

    //没有价格数据
    function noData() {
        $(".price-trend-panel .price-search-loading").hide();
        $("#no_price_date").html(_i18n("PT06")).show();
        $("#priceTrendPanel").hide();
    }

    //处理后台返回的数据
    function getFaresPrice(arr) {
        if (!arr) {
            arr = [];
        }
        var len = arr.length;
        var newArr = [];
        var dayArr = [];
        var maxPrice = 0;
        for (var a = 0; a < len; a++) {
            var amount = parseFloat(arr[a].amount + "", 10);
            newArr.push(amount || 0);
            maxPrice = maxPrice < amount ? amount : maxPrice;
            dayArr.push(arr[a].date || "1970-01-01");
        }
        return {"data": newArr, "day": dayArr, "maxPrice": maxPrice, "currency": arr[0].currency || "CNY"};
    }

    //初始化图标
    function highchartInit() {
        //初始化
        var json = {};
        json.title = title;//副标题选项
        json.subtitle = subtitle;//副标题选项
        json.xAxis = xAxis;//x
        json.yAxis = yAxis;//y
        json.tooltip = tooltip;//划过显示的提示信息
        json.legend = legend;//图例 显示
        json.plotOptions = plotOptions;//图表样式
        json.series = series;//数据
        json.credits = credits;//版权信息
        Highcharts.setOptions({//显示样式
            colors: optionSet.colors
        });

        $('#priceTrendPanel').highcharts(json, function () {
            $(".price-trend-panel .price-search-loading").hide();
            $("#priceTrendPanel").show();
            $("#no_price_date").hide();
        });//把图表添加到画面
    }

    function createPriceTrendPanel(id) {
        if (!id) {
            return false;
        }
        try {
            var html = '<div class="p-panel hnaui-panel hnaui-shadow price-trend-panel" id="' + id + '">';
            html += '       <div class="hnaui-panel-title"><i class="hnaui-icon">&#xe91d;</i>' + _i18n("PT01") + '</div>';
            html += '       <div class="hnaui-panel-content">';
            html += $(".search-loading")[0].outerHTML.replace("search-loading", "price-search-loading");
            html += '           <div id="priceTrendPanel" style="width:800px;height: 300px;margin: 0 auto;display: none;"></div>';
            html += '           <div id="no_price_date" style="display: none;text-align: center;padding-top: 60px;font-size: 16px;"></div>';
            html += '           <div class="tips">' + _i18n("PT05") + '</div>';
            html += '       </div>';
            html += '   </div>';
            $("#" + id).replaceWith(html);
            $(".price-trend-panel .price-search-loading").show();
        } catch (e) {
            JsErrorTips(e);
        }
    }

    return {
        init: init
    };
})();
