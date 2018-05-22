var config = require('./../../config');
var path = require('path');

var data = {
    "viewsUrl": "./../views/",
    "dataUrl": "./../data/",
    "otherUrl": {},
    "info": {

        //==========================================================airEye
        "index": {
            "href": "/",
            "url": "index",
            "css": ["common","portal"],
            "jsPageId": ["portal"]
        },
        "error": {
            "href": "/error",
            "url": "error",
            "css": ["common","error"],
            "jsPageId": ["error"]
        },
        "building": {
            "href": "/building",
            "url": "building",
            "css": ["common","error"],
            "jsPageId": ["error"]
        },

        //==========================================================查询航班，选择航班，出票流程
        "searchFlight": {
            "href": "/airEye/flight/search",
            "url": "pages/airEye/flight/searchFlight",
            "css": ["common","flight"],
            "jsPageId": ["searchFlight"]
        },
        "flexibleFlight": {
            "href": "/airEye/flight/flexible",
            "url": "pages/airEye/flight/flexibleFlight",
            "css": ["common","flight"],
            "jsPageId": ["flexibleFlight"]
        },
        "selectGetFlight": {
            "href": "/airEye/flight/select",
            "url": "pages/airEye/flight/selectFlight",
            "css": ["common","flight","user"],
            "jsPageId": ["selectFlight"]
        },
        "passenger": {
            "href": "/airEye/passenger",
            "url": "pages/airEye/passenger/index",
            "css": ["common","flight"],
            "jsPageId": ["passenger"],
            "mustLogin": true,
        },
        "product": {
            "href": "/airEye/product",
            "url": "pages/airEye/product/index",
            "css": ["common","flight"],
            "jsPageId": ["product"],
            "mustLogin": true,
        },
        "product_mmb": {
            "href": "/airEye/product_mmb",
            "url": "pages/airEye/product/index_mmb",
            "css": ["common","flight"],
            "jsPageId": ["product"],
            "mustLogin": true,
        },
        "seat": {
            "href": "/airEye/seat",
            "url": "pages/airEye/seat/index",
            "css": ["common","flight"],
            "jsPageId": ["seat"],
            "mustLogin": true,
        },
        "seat_mmb": {
            "href": "/airEye/seat_mmb",
            "url": "pages/airEye/seat/index_mmb",
            "css": ["common","flight"],
            "jsPageId": ["seat"],
            "mustLogin": true,
        },

        "searchOrder": {
            "href": "/airEye/order/searchOrder",
            "url": "pages/airEye/order/searchOrder",
            "css": ["common","order"],
            "jsPageId": ["searchOrder"],
        },
        "orderList": {
            "href": "/airEye/order/orderList",
            "url": "pages/airEye/order/orderList",
            "css": ["common","order"],
            "jsPageId": ["orderList"],
            "mustLogin":true,
        },
        "orderdetail": {
            "href": "/airEye/order/orderDetail",
            "url": "pages/airEye/order/orderDetail",
            "css": ["common","order"],
            "jsPageId": ["orderDetail"],
            "mustLogin": true,
        },
        "changeOrder": {
            "href": "/airEye/order/changeOrder",
            "url": "pages/airEye/order/changeOrder",
            "css": ["common","order"],
            "jsPageId": ["changeOrder"],
            "mustLogin": true,
        },
        "refundTickets": {
            "href": "/airEye/order/refundTickets",
            "url": "pages/airEye/order/refundTickets",
            "css": ["common","order"],
            "jsPageId": ["refundTickets"],
            "mustLogin":true,
        },


        //==========================================================规章制度说明页面
        //航班动态
        "flightStatus": {
            "href": "/airR/flightStatus",
            "url": "pages/airR/passengerService/flightStatus",
            "css": ["common","passengerService"],
            "jsPageId": ["flightStatus"],
        },
        //网上值机
        // "onLineCheckIn":{
        //     "href": "/airR/onLineCheckIn",
        //     "url": "pages/airR/passengerService/onlinecheckin",
        //     "css": ["common","passengerService"],
        //     "jsPageId": ["onLineCheckIn"],
        // },
        //不正常航班自助改期  退票进度查询  延误证明开具  机场信息
        "selfChangeService":{
            "href": "/airR/passengerService",
            "url": "pages/airR/passengerService/index",
            "css": ["common","passengerService"],
            "jsPageId": ["passengerService"],
        },



        //公告
        "notice": {
            "href": "/airR/notice",
            "url": "pages/airR/rules/index",
            "css": ["common","rules"],
            "jsPageId": ["notice"],
        },
        "rulesInfo":{
            "href": "/airR/rules",
            "url": "pages/airR/rules/index",
            "css": ["common","rules"],
            "jsPageId": ["rules"],
            "script":true
        },
        "singlePage":{
            "href": "/airR/singlePage",
            "url": "pages/airR/singlePage/index",
            "css": ["common","rules"],
            "jsPageId": ["rules"],
        },
        //==========================================================用户管理模块1
        "login": {
            "href": "/airU/login",
            "url": "pages/airU/login/index",
            "css": ["common","user"],
            "jsPageId": ["login"],
        },
        "loginOut": {
            "href": "/airU/loginOut",
            "url": "pages/airU/login/loginOut",
        },
        "register": {
            "href": "/airU/register",
            "url": "pages/airU/register/index",
            "css": ["common","user"],
            "jsPageId": ["register"],
        },
        "userInfo": {
            "href": "/airU/userInfo",
            "url": "pages/airU/userInfo/index",
            "css": ["common","user"],
            "jsPageId": ["userInfo"],
            "mustLogin":true,
        },
        "retrievePassword": {
            "href": "/airU/retrievePassword",
            "url": "pages/airU/retrievePassword/index",
            "css": ["common","user"],
            "jsPageId": ["retrievePassword"],
        },
        "userInfo_third": {
            "href": "/airU/userInfo_third",
            "url": "pages/airU/userInfo/index_third",
            "css": ["common","user"],
            "jsPageId": ["userInfo"]
        },

        //==========================================================支付模块
        "payment": {
            "href": "/airP/payment",
            "url": "pages/airP/payment",
            "css": ["common","payment"],
            "jsPageId": ["payment"],
            "mustLogin": true,
        },

        "loading": {
            "href": "/loading",
            "url": "loading",
            "css": ["common"],
            "jsPageId": ["default"]
        },

        "icon": {
            "href": "/icon",
            "url": "pages/icon/index",
            "css": ["common","icon"],
            "jsPageId": [""],
        },

        "mobile": {
            "href": "/mobile",
            "url": "mobile",
            "mobile": true
        },

        "mobileAll": {
            "href": "/mobile/*",
            "url": "mobile",
            "mobile": true
        },

        "all":{
            "href": "/*",
            "url": "error",
            "css": ["common", "error"],
            "jsPageId": ["error"],
            "params": {"flag": "noExist"}
        }
    }
};

module.exports = data;