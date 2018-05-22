function getConfig(obj) {
    if (!obj) {
        obj = {};
    }
    return {
        baseUrl: (obj._static_host || "") + "/js/" || '',
        paths: {
            /*工具类配置*/
            jquery: 'public/lib/hna-jquery-1.9.1.min',
            highchart: 'public/lib/hna-highcharts.min',
            hnaui: 'public/lib/hnaui.min',
            qrcode: 'public/lib/hna-qrcode.min',

            mmv: hna._mmv_host + "/mmv/air/js/mmv",

            //hna_base_portal: 'business/airEye/portal/hna_base_portal',
            hna_base_flight: 'business/airEye/flight/hna-base-flight',
            hna_base_order: 'business/airEye/order/hna-base-order',
            hna_base_user: 'business/airU/hna-base-user',

            flight_city: 'public/widget/flight-city',
            seat_map: 'public/widget/seat-map',
            seat_map_checkin: 'public/widget/seat-map-checkin',
            fast_login: 'public/widget/fast-login',

            portalIndex: "business/airEye/portal/portal",

            shopping_cart: "business/airEye/shopping/cart",

            //查询，选择航班
            flight_searchFlight: "business/airEye/flight/searchFlight",
            flight_flexibleFlight: "business/airEye/flight/flexibleFlight",
            flight_selectFlight: "business/airEye/flight/selectFlight",
            flight_passenger: "business/airEye/passenger/passenger",
            flight_product: "business/airEye/product/product",
            flight_seat: "business/airEye/seat/seat",

            //订单相关
            searchOrder: "business/airEye/order/searchOrder",
            orderList: "business/airEye/order/orderList",
            orderDetail: "business/airEye/order/orderDetail",
            refundTickets: "business/airEye/order/refundTickets",
            changeOrder: "business/airEye/order/changeOrder",

            //导航静态页
            rulesInfo: "business/airR/rules/index",
            notice: "business/airR/notice/index",
            singlePage:"business/airR/singlePage/index",

            flightStatus: "business/airR/passengerService/flightStatus",
            onLineCheckIn: "business/airR/passengerService/onLineCheckIn",
            passengerService: "business/airR/passengerService/index",

            //用户中心
            login: "business/airU/login/index",
            register: "business/airU/register/index",
            userInfo: "business/airU/userInfo/index",
            retrievePassword: "business/airU/retrievePassword/index",

            //支付页面
            payment: "business/airP/index"
        },
        urlArgs: 'v=' + (obj._version || "1.0") // 修改这里的版本号
    };
}

function loadPageScript(pageid) {
    var fast_login = "";
    if(!_userId){
        fast_login = "fast_login";
    }
    switch (pageid) {
        case "portal":   //首页
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', fast_login, 'hna_base_flight', 'flight_city', "portalIndex"], function () {
                //console.log('load complete index');
            });
            break;
        case "searchFlight":   //航班查询页
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', fast_login, 'hna_base_flight', 'flight_city', "flight_searchFlight"], function () {
                //console.log('load complete searchFlight');
            });
            break;
        case "flexibleFlight":   //优惠机票日历页面
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', fast_login, 'hna_base_flight', "flight_flexibleFlight"], function () {
                //console.log('load complete flexibleFlight');
            });
            break;
        case "selectFlight":   //航班查询结果页
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', fast_login, 'hna_base_flight' ,'highchart', 'shopping_cart', 'flight_city', "flight_selectFlight"], function () {
                //console.log('load complete selectFlight');
            });
            break;
        case "passenger":   //乘机人页面
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', 'hna_base_flight', 'shopping_cart', "flight_passenger"], function () {
                //console.log('load complete passenger');
            });
            break;
        case "product":   //辅营页面
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', 'hna_base_flight', 'shopping_cart', "flight_product"], function () {
                //console.log('load complete product');
            });
            break;
        case "seat":   //选择座位页面
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', 'hna_base_flight', 'seat_map', "flight_seat"], function () {
                //console.log('load complete seat');
            });
            break;

        case "searchOrder":   //查询订单
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', fast_login, 'hna_base_order', 'searchOrder'], function () {
                //console.log('load complete searchOrder');
            });
            break;
        case "orderList":   //我的订单
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', 'hna_base_order', 'orderList'], function () {
                //console.log('load complete orderList');
            });
            break;
        case "orderDetail":   //订单详情页面
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', 'fast_login', 'hna_base_order', "orderDetail"], function () {
                //console.log('load complete orderDetail');
            });
            break;
        case "refundTickets":   //退票页面
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', 'fast_login', 'hna_base_order', "refundTickets"], function () {
                //console.log('load complete refundTickets');
            });
            break;
        case "changeOrder":   //升舱改期
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', 'fast_login', 'hna_base_order', "changeOrder"], function () {
                //console.log('load complete changeOrder');
            });
            break;

        case "rules":   //规章制度说明页面
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', fast_login, 'hna_base_flight', "rulesInfo"], function () {
                //console.log('load complete rulesInfo');
            });
            break;
        case "notice":   //通告
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', fast_login, 'hna_base_flight', "notice"], function () {
                //console.log('load complete notice');
            });
            break;
        case "flightStatus":   //航班动态
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', fast_login, 'hna_base_flight', 'flight_city', "flightStatus"], function () {
                //console.log('load complete flightStatus');
            });
            break;
        case "onLineCheckIn":   //网上值机
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', fast_login, 'hna_base_flight', 'seat_map_checkin', "onLineCheckIn"], function () {
                //console.log('load complete checkIn');
            });
            break;
        case "passengerService":   //网上值机
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', fast_login, 'hna_base_flight', "passengerService"], function () {
                //console.log('load complete checkIn');
            });
            break;

        //================================================================用户中心模块
        case "login":   //登录
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', 'hna_base_user', "login"], function () {
                //console.log('load complete login');
            });
            break;
        case "register":   //注册
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', 'hna_base_user', "register"], function () {
                //console.log('load complete register');
            });
            break;
        case "userInfo":   //用户管理
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', 'hna_base_user', "userInfo"], function () {
                //console.log('load complete userInfo');
            });
            break;
        case "retrievePassword":   //找回密码
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', 'hna_base_user', "retrievePassword"], function () {
                //console.log('load complete retrievePassword');
            });
            break;


        //================================================================支付模块
        case "payment":   //支付页面
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', 'qrcode', 'hna_base_flight', 'shopping_cart', "payment"], function () {
                //console.log('load complete payment');
            });
            break;



        case "default":   //默认页面
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', fast_login, "hna_base_flight"], function () {
                //console.log('load complete default');
            });
            break;
        default:
            hna.hnaLoader.load(['jquery', 'hnaui', 'mmv', fast_login, "hna_base_flight"], function () {
                //console.log('load complete');
            });
            break;
    }
}