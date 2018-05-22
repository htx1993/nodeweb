var Mock = require("mockjs");
var path = require('path');
var localSession = require(path.join(process.cwd(), 'data/session'));


module.exports.init = function (obj,callback) {
    if (!obj) obj = {};
    if (!obj.config) obj.config = {};

    var productList = [
        {
            "title":"行李",
            "subTitle":"提前预购超额行李，可享八折优惠。",
            "imgSrc":"/images/portal/luggage.jpg",
            "jumpHref":"/airR/rules?type=addedService#luggage"
        },
        {
            "title":"餐食",
            "subTitle":"现在预订您可以享受更大的折扣优惠。",
            "imgSrc":"/images/portal/meals.jpg",
            "jumpHref":"/airR/rules?type=addedService#meals"
        },
        {
            "title":"保险",
            "subTitle":"航空保险，为您的安全出行保驾护航。",
            "imgSrc":"/images/portal/insurance.jpg",
            "jumpHref":"http://www.auib.com.cn/beiBuGulf/product/getProductList"
        },
        {
            "title":"贵宾室",
            "subTitle":"贵宾室让您在踏上旅途前放松心灵。",
            "imgSrc":"/images/portal/viproom.jpg",
            "jumpHref":"/building"
        },
    ];

    var cityList = [
        {
            "depCity":"武汉",
            "depCode":"WUH",
        },
        {
            "depCity":"深圳",
            "depCode":"SZX",
        },
        {
            "depCity":"天津",
            "depCode":"TSN",
        },
        {
            "depCity":"大连",
            "depCode":"DLC",
        },
        {
            "depCity":"乌鲁木齐",
            "depCode":"URC",
        },
    ];
    var ticketList = [];
    function getTicketList(o){
        var cityTicketList = Mock.mock(
            {
                "list|10":[{
                    "tripType":"OW",
                    "depCity": o.depCity,
                    "depCode": o.depCode,
                    "arrCity":"天津",
                    "arrCode":"TSN",
                    "depDate":"2018-09-09",
                    "currency":"CNY",
                    "cabinClass":"Economy",
                    "price":390
                }]
            }
        );
        return cityTicketList.list;
    }

    for(var a= 0,a1=cityList.length;a<a1;a++){
        ticketList.push.apply(ticketList,getTicketList(cityList[a]));
    }

    console.log("=========================this is index");
    if(typeof (callback) == "function") callback({
        "title":"首页",
        "info":{},
        "productList":productList,
        "ticket":{
            "cityList":cityList,
            "ticketList":ticketList
        }
    });
}