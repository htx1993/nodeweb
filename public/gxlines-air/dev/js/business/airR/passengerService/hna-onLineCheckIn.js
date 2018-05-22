hna._i18nMap.addLanguages({
    //placeholeder
    "passengerName-placeholder": {"zh_CN": "请输入乘机人姓名（中文姓名输入全称，英文姓名输入姓氏）", "en": "Please enter passenger name"},
    "cardNumber-ticketNumber-placeholder": {"zh_CN": "请输入客票号（格式：826-2387220535）", "en": ""},
    "cardNumber-ID_CARD-placeholder": {"zh_CN": "请输入身份证号", "en": ""},
    "cardNumber-2.DOC-placeholder": {"zh_CN": "请输入有效护照号", "en": ""},
    "phoneNumber-placeholder": {"zh_CN": "请输入手机号", "en": "Please enter phone number"},
    "verifyCode-placeholder": {"zh_CN": "请输入动态口令", "en": "Please enter verification code"},
    "e-mail-placeholder": {"zh_CN": "请输入邮箱（值机成功后发送邮件）", "en": "Please enter verification code"},

    //错误提示
    "passengerName-errorTip": {"zh_CN": "您输入的乘机人姓名格式错误！", "en": ""},
    "cardNumber-ticketNumber-errorTip": {"zh_CN": "您输入的客票号格式错误", "en": ""},
    "cardNumber-ID_CARD-errorTip": {"zh_CN": "您输入的身份证号格式错误", "en": ""},   //身份证错误提示
    "cardNumber-2.DOC-errorTip": {"zh_CN": "您输入的有效护照号格式错误", "en": ""},
    "mobile-errorTip": {"zh_CN": "您输入的电话号码格式错误！", "en": ""},
    "valiCode-errorTip": {"zh_CN": "您输入的动态口令格式错误！", "en": ""},
    "e-mail-errorTip": {"zh_CN": "您输入的邮箱号格式错误！", "en": ""},

    //空提示
    "passengerName-blank": {"zh_CN": "乘机人姓名不能为空！", "en": ""},
    "cardNumber-blank": {"zh_CN": "证件号不能为空！", "en": ""},
    "mobile-blank": {"zh_CN": "手机号不能为空！", "en": ""},
    "mmb-blank": {"zh_CN": "请先拖动滑块，完成拼图", "en": ""},
    "valiCode-blank": {"zh_CN": "动态口令不能为空！", "en": ""},

    //title
    "passengerName": {"zh_CN": "乘机人", "en": ""},
    "cardType": {"zh_CN": "证件类型", "en": ""},
    "cardNumber": {"zh_CN": "证件号码", "en": ""},
    "mobile": {"zh_CN": "手机号", "en": ""},
    "valiCode": {"zh_CN": "动态口令", "en": ""},
    "e-mail": {"zh_CN": "邮箱", "en": ""},
    "mmvSuccess": {"zh_CN": "验证通过", "en": " "},
    "tip": {"zh_CN": "提示", "en_US": ""},

    "dangerousRule": {"zh_CN": "请仔细阅读旅客携带危险品规定", "en_US": "Flight number"},
    "serveRule": {"zh_CN": "请仔细阅读《网上办理乘机手续服务协议》", "en_US": "Flight number"},
    "radioFlight": {"zh_CN": "请选择要网上值机的航段", "en_US": "Flight number"},

    //talbe td
    "tdSort": {"zh_CN": "行程序号", "en_US": "Flight number"},
    "select": {"zh_CN": "选择", "en_US": "Flight number"},
    "flightNumber": {"zh_CN": "航班号", "en_US": "Flight number"},
    "flightInfo": {"zh_CN": "航段信息", "en_US": "Flight number"},
    "flightTime": {"zh_CN": "起飞时间", "en_US": "Flight number"},
    "flightPlace": {"zh_CN": "起飞机场", "en_US": "Flight number"},
    "ticketNumber": {"zh_CN": "电子客票", "en_US": "Flight number"},
    "cabinNumber": {"zh_CN": "舱位", "en_US": "Flight number"},
    "ticketState": {"zh_CN": "客票状态", "en_US": "Flight number"},
    "checkedState": {"zh_CN": "值机状态", "en_US": "Flight number"},
    "seatNumber": {"zh_CN": "座位号", "en_US": "Flight number"},
    //天气预报
    "date": {"zh_CN": "日期", "en_US": "Flight number"},
    "weather": {"zh_CN": "天气", "en_US": "Flight number"},
    "temperature": {"zh_CN": "温度范围", "en_US": "Flight number"},
    "wind": {"zh_CN": "风向", "en_US": "Flight number"},
    //国际航班信息展示
    "surName": {"zh_CN": "姓", "en_US": "Flight number"},
    "givenName": {"zh_CN": "名", "en_US": "Flight number"},
    "gender": {"zh_CN": "性别", "en_US": "Flight number"},
    "docType": {"zh_CN": "证件类型", "en_US": "Flight number"},
    "docID": {"zh_CN": "证件号码", "en_US": "Flight number"},
    "birthDate": {"zh_CN": "出生日期", "en_US": "Flight number"},
    "expireDate": {"zh_CN": "证件有效期", "en_US": "Flight number"},
    "docHolderNationality": {"zh_CN": "国籍", "en_US": "Flight number"},
    "docIssueCountry": {"zh_CN": "签发国", "en_US": "Flight number"},
    "residenceCountry": {"zh_CN": "居住国", "en_US": "Flight number"}
});
var state = {
    "weatherState": {
        0: "今天",
        1: "明天",
        2: "后天"
    },
    "ticketState": {
        "OPEN FOR USE": "可用",
        "CHECKED IN": "已值机"
    },
    "checkedState": {
        "AC": "已值机",
        "NA": "未值机",
        "SB": "候补",
        "DL": "拉下"
    },
    "gender": {
        "M": "男",
        "F": "女"
    },
    "cardType": {
        "P": "护照",
        "T":"台胞证",
        "W":"港澳通行证",
        "C":"回乡证",
        "D":"赴台通行证",
        "A":"因公港澳通行证",
        "F":"其它证件"
    }

};

var ajaxUrl = {
    "sendMessage": "/airU/userInfo/sendMessage",

    "query": "/checkIn/query",           //查询行程信息
    "passenger": "/checkIn/passenger",  //获取乘机人信息
    "api": "/checkIn/api",             //获取API信息
    "seat": "/checkIn/seat",           //离港座位查询
    "check": "/checkIn/check",          //值机
    "print": "/checkIn/print",           //打印登机牌
    "reprint": "/checkIn/reprint",       //重打登机牌
    "cancel": "/checkIn/cancel",        //取消值机
    "weather": "/checkIn/weather"    //天气查询
};

var parameter = {   //接口数据
    "query": [],
    "passengerData": {},
    "check": {},

    "cardType": "",
    "cardNo": "",
    "phoneNumber": "",
    "email": "",

    "passenger": [],       //乘机人信息  选座用
    "tableTdList": [],     //信息确认表格列
    "tableTdList2": [],     //座位确认表格列
    "tableTdList3": [],    //天气预报
    "tableTdList4": []    //国际航班
};

var item = {};   //选中的航班信息

var inputList = [
    {
        "name": "passengerName",    //乘机人
        "tips": _i18n("passengerName"),
        "reg": /^([\u2E80-\uFE4F]{2,30}$)|^([A-Za-z]{2,30})$/,    //姓名规则
        "maxLen": 30,
        "errorTips": _i18n("passengerName-errorTip"),
        "blankTips": _i18n("passengerName-blank"),
        "placeholder": _i18n("passengerName-placeholder")
    },
    {
        "name": "cardType",    //证件类型
        "tips": _i18n("cardType")
    },
    {
        "name": "cardNumber",    //证件号码
        "tips": _i18n("cardNumber"),
        "reg": /^([\d]){3}[-]{1}[\d]{10}$/,
        "maxLen": 14,
        "errorTips": _i18n("cardNumber-ticketNumber-errorTip"),
        "blankTips": _i18n("cardNumber-blank"),
        "placeholder": _i18n("cardNumber-ticketNumber-placeholder")
    },
    {
        "name": "mobile",   //手机号码
        "tips": _i18n("mobile"),
        "reg": /^1[3|4|5|7|8]\d{9}$/,
        "maxLen": 11,
        "errorTips": _i18n("mobile-errorTip"),
        "blankTips": _i18n("mobile-blank"),
        "placeholder": _i18n("phoneNumber-placeholder")
    },
    {
        "name": "valiCode",   //动态口令
        "tips": _i18n("valiCode"),
        "reg": /^[\da-zA-Z]{6}$/,
        "maxLen": 6,
        "errorTips": _i18n("valiCode-errorTip"),
        "blankTips": _i18n("valiCode-blank"),
        "placeholder": _i18n("verifyCode-placeholder")
    },
    {
        "name": "mmvCode",  //人机验证
        "tips": _i18n("B12"),
        "blankTips": _i18n("mmb-blank")
    },
    {
        "name": "e-mail",   //邮箱
        "tips": _i18n("e-mail"),
        "reg": /^[\u4e00-\u9fa5\w]+([-+.][\u4e00-\u9fa5\w]+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        "maxLen": 50,
        "errorTips": _i18n("e-mail-errorTip"),
        "placeholder": _i18n("e-mail-placeholder")
    }
];   //表单规则

var Templates = {
    /*jshint multistr: true */
    form: '<form class="hnaui-form hnaui-form-pane onlineCheckin-form" >\
                 <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-input" >\
                     <div class="hnaui-form-item">\
                         <input type="radio" name="radio" value="checkin" class="online-type-checkin"  title="办理乘机手续" hna-filter="handleType" checked>\
                         <input type="radio" name="radio" value="query" class="online-type-query" title="值机记录查询" hna-filter="handleType">\
                      </div>\
                 </div>\
                 <div class="checkin-form"></div>\
                </form>',
    //common
    button: '<div class="search-submit hnaui-clear">\
        {1}\
     <a class="hnaui-btn hnaui-btn-theme hnaui-btn-model" >\
     <i class="hnaui-icon">&#xe615;</i>{0}</a>\
     </div>',

    a: '<a class="hnaui-btn hnaui-btn-theme hnaui-btn-model cancel-seat-btn" ><i class="hnaui-icon">&#xe615;</i>{0}</a>',

    checkbox: '<div class="p-checkbox hnaui-form">\
                    <input type="checkbox" title="{0}" hna-skin="primary">\
                    <a href="{1}" target="_blank">{2}</a>\
                 </div>',
    nav: {
        div: '<div class="flight-state hnaui-shadow"><div class="container"><div class="row">\
                <ul class="flight-step hnaui-clear">{0}</ul>\
            </div></div></div>',
        li: '<li class="{0}">\
            <a title="{1}" href="javascript:;"><span class="index">{2}</span><span class="m_hide">{1}</span></a>\
        </li>'
    },
//表单
    bar1: {
        content: '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-input">\
                        {3}\
                       <div class="hnaui-form-item">{0}{1}{2}</div>\
                 </div>',
        label: '<label class="hnaui-form-label">{1}{0}</label>',
        span: '<span class="hnaui-required">* </span>',
        input:'<div class="hnaui-input-block {4}">\
                 <input type="text" name="{0}" autocomplete="off" class="hnaui-input {0}" value maxlength="{1}" hna-required="Y" placeholder="{2}">\
                 {3}\
         </div>',
        //动态口令
        a:'<a class="hnaui-btn hnaui-btn-small hnaui-verifybtn">发送动态口令</a>',
        //提示
        tip:'<div class="hnaui-warning bounceInRight">\
             <i class="hnaui-icon"></i>\
            <span class="error-tips"></span>\
         </div>'
        //mobilePre:'<div class="hnaui-mobile-pre"></div>'
    },

//表格
    bar2: {
        title: '<div class="hnaui-panel-title content-nav">\
                    {0}\
             </div>',
        content: '<div class="hnaui-panel-content">\
                    <table class="hnaui-table hnaui-table-mobile hnaui-form">\
                        <thead><tr>{1}</tr></thead>\
                        <tbody>{0}</tbody>\
                    </table>\
                 </div>',
        tr: '<tr>{0}</tr>',
        td: {
            th: '<th>{0}</th>',
            td: '<td>\
                     <div class="td-text">{0}</div>\
                     <div class="td-title">{1}</div>\
                 </td>'
        },
        input: '<input type="radio" name="selectFlight" title=" " class="" value="{0}"/>'
    }
};

var Renders = {
    //common
    button: function (value, num) {
        return Templates.button.format(value, num);
    },
    checkbox: function (title,link,name) {
        return Templates.checkbox.format(title,link,name);
    },
    a: function (title) {
        return Templates.a.format(title);
    },
    nav: {
        div: function (lis) {
            return Templates.nav.div.format(lis);
        },
        li: function (cls, title, index) {
            return Templates.nav.li.format(cls, title, index);
        }
    },
    //进度1
    bar1: {
        content: function(title,name,length,placeholder){
            if(name == "mobile"){
                return Templates.bar1.content.format(this.label(title),this.input(name,length,placeholder),this.tip(),"");
            }else{
                return Templates.bar1.content.format(this.label(title),this.input(name,length,placeholder),this.tip(),"");
            }
        },
        label: function(title){
            if(title == "邮箱"){
                return Templates.bar1.label.format(title,"");
            }else{
                return Templates.bar1.label.format(title,Templates.bar1.span);
            }
        },
        input: function(name,length,placeholder){
            if(name == "valiCode"){
                return Templates.bar1.input.format(name,length,placeholder,Templates.bar1.a,"");
            }else if(name == "mobile"){
                return Templates.bar1.input.format(name,length,placeholder,"","hnaui-mobile-next");
            }else{
                return Templates.bar1.input.format(name,length,placeholder,"","");
            }
        },
        tip: function(){
            return Templates.bar1.tip;
        },
        mobilePre: function(){
            return Templates.bar1.mobilePre;
        }
    },
    //进度2
    bar2: {
        title: function (passenger) {
            return Templates.bar2.title.format(passenger);
        },
        content: function (tr, th) {
            return Templates.bar2.content.format(tr, th);
        },
        tr: function (td) {
            return Templates.bar2.tr.format(td);
        },
        th: function (title) {
            return Templates.bar2.td.th.format(title);
        },
        td: function (content, hidden) {
            return Templates.bar2.td.td.format(content, hidden);
        },
        input: function (value) {
            return Templates.bar2.input.format(value);
        }

    }
};

//票号处理
function handleTk(tkNo) {
    var newTkNo = tkNo.split("-").join("");
    return newTkNo;
}
//ajax的req
function obj(opt) {
    if (!opt){
        opt = {};
    }
    return {
        "seatOrPassenger": {
            "flightDate": item.tourDate,
            "flightNo": item.airlineCode + item.flightNumber,
            "toCity": item.toCity.code,
            "fromCity": item.fromCity.code,
            "tkNo": handleTk(item.tktNumber),
            "flightClass": item.tourClass
        },
        "api": {
            "airlineCode": item.airlineCode,
            "flightNumber": item.flightNumber,
            "flightDate": item.tourDate,
            "fromCity": item.fromCity.code,
            "toCity": item.toCity.code,
            "tkNo": handleTk(item.tktNumber),
            "hostNumber": parameter.passengerData.hostNum
        },
        "check": {
            "flightDate": item.tourDate,
            "flightNo": item.airlineCode + item.flightNumber,
            "cardAirLine": parameter.passengerData.cardAirLine,
            "cardId": parameter.passengerData.cardId,
            //  "gender": "",   //性别
            "phoneNumber": parameter.phoneNumber,
            "email": parameter.email,
            "chd": parameter.passengerData.chd,
            "certType": parameter.cardType,
            "certId": parameter.cardNo,
            "toCity": item.toCity.code,
            "fromCity": item.fromCity.code,
            "tkNo": handleTk(item.tktNumber),
            //   "snr": "false",
            "asrSeatNo": parameter.passengerData.asrSeatNo,
            "seatNo": opt.seat || parameter.passengerData.asrSeat,
            "tourIndex": item.tourIndex,
            "pName": item.pName,
            "fromCityNameCn": item.fromCity.nameCn,
            "fromCityNameEn": item.fromCity.nameEn,
            "fromCityAirportNameCn": item.fromCity.airportCn,
            "fromCityAirportNameEn": item.fromCity.airportEn,
            "toCityNameCn": item.toCity.nameCn,
            "toCityNameEn": item.toCity.nameEn,
            "toCityAirportNameCn": item.toCity.airportCn,
            "toCityAirportNameEn": item.toCity.airportEn,
            "checkinSource":"WEB"
        },
        "print": {
            "dataStream": opt.dataStream,
            "name": item.pName,
            "nameEn": parameter.passengerData.pEnName,  //英文名（拼音）
            "idNo": parameter.cardNo,    //证件号
            "tkNo": handleTk(item.tktNumber),
            "fqt": parameter.passengerData.cardId,   //常客卡号
            "serial": parameter.check.boardingNumber,   //登记号
            "flightDate": item.tourDate,
            "flightNo": item.airlineCode + item.flightNumber,
            "toCity": item.toCity.code,
            "fromCity": item.fromCity.code,
            "toAirport": item.toCity.airportCn,
            "fromAirport": item.fromCity.airportCn,
            "boardTime": parameter.passengerData.bordingTime,   //登机时间
            "gate": parameter.passengerData.boardingGateNumber,   //登机口
            "cabin": parameter.passengerData.cabinType,   //舱位
            "seat": parameter.check.seatNo || parameter.passengerData.asrSeat  //座位号
        },
        "reprint": {
            "flightDate": item.tourDate,
            "airlineCode": item.airlineCode,
            "flightNumber": item.flightNumber,
            "toCity": item.toCity.code,
            "fromCity": item.fromCity.code,
            "tkNo": handleTk(item.tktNumber),
            "tourIndex": item.tourIndex,
            "passengerName": parameter.passengerData.pEnName,
            "reissue": "true"   //是否重打
        },
        "cancel": {
            "flightDate": item.tourDate,
            "flightNo": item.airlineCode + item.flightNumber,
            "certType": parameter.cardType,
            "certId": parameter.cardNo,
            "toCity": item.toCity.code,
            "fromCity": item.fromCity.code,
            "tkNo": handleTk(item.tktNumber)
        },
        "weather": {
            "airportCode": item.toCity.code
        }
    };
}

$(function () {
    creatNav();    //进度条
    checkinContent("checkin-content");   //容器
    createContentE1();

    createFormEl();   //表单面板
    textDiscription();  //右侧文字描述
    selectType();    //切换下拉框类型

    //  getPassengerInfo();  //fangbian

    renderFrom();
    initElement();

    blurVerify();    //校验

    hna.filterForm();
    hna.goToTop("1");

    $(".hnaui-warning").on("click", ".hnaui-icon", function () {
        $(this).parent().hide();
    });
});

//创建进度条
function creatNav() {
    var html = "";
    var lis = [
        {
            "cls": "flight-print-board-card",
            "title": "打印登机牌",
            "index": "5"
        },
        {
            "cls": "flight-seat-confirm",
            "title": "座位确认",
            "index": "4"
        },
        {
            "cls": "flight-seat-choose",
            "title": "选择座位",
            "index": "3"
        },
        {
            "cls": "flight-flight-confirm",
            "title": "信息确认",
            "index": "2"
        },
        {
            "cls": "flight-checkin-query current",
            "title": "查询信息",
            "index": "1"
        }
    ];
    html += Renders.nav.div(createLi(lis));
    $(".checkin-query").html(html);
}
function createLi(lis) {
    var html = "";
    lis.forEach(function (item, index) {
        html += Renders.nav.li(item.cls, item.title, item.index);
    });
    return html;
}
//进度条选择状态样式
function navStyle(cls) {
    $(".flight-step li").removeClass("current");
    $("." + cls).addClass("current");
}

//容器
function checkinContent(cls) {
    var html = "";
    html += '<div class="hnaui-user-panel hnaui-shadow p-panel hnaui-edit-panel choose-seat  user-left">';
    html += '   <h1><i class="hnaui-icon">&#xe615;</i>网上值机</h1>';
    html += '   <div class="hnaui-panel-content hnaui-clear online-check">';
    html += '       <div class="progress-bar"></div>';
    html += '   </div>';
    html += '   <div class="text-discription"></div>';
    html += '</div>';
    $(".passenger-service-checkin ." + cls).replaceWith(html);
}

//右侧文字描述
function textDiscription() {
    var html = "";
    html += '<div class="hanui-panel-content text-info">';
    html +='<h1>温馨提示</h1>';
    html += '<ul>';
    html +='<li class="guide-tip"><a href="../airR/rules?type=customService#securityIns" target="_blank">常见问题</a><a href="../airR/rules?type=customService#securityIns" target="_blank"> 操作指南</a><a href="../airR/rules?type=customService#securityIns" target="_blank">开通城市</a></li>';
    html += '<li>1、网上办理乘机手续您可根据自己的喜好选择座位，并自行打印A4纸登机牌，持此登机牌和购票时登记的证件，可直接通过安检和登机。</li>';
    html += '<li>2、网上办理乘机手续仅适用于普通成人。对于年龄超过70岁、病患、担架、残疾、孕妇、携带婴儿旅客等特殊旅客请到机场人工柜台和自助终端办理。</li>';
    html += '<li>3、由于安全载重平衡要求，个别网上值机旅客会产生所选座位与实际发放座位不一致情况，请以现场实际发放座位为准。</li>';
    html += '<li>4、办理网上值机选座前请先阅读<a href="../airR/rules?type=customService#securityIns" target="_blank"><strong>《安检须知》</strong></a></li>';
    html += '</ul>';
    html += '</div>';
    return $(".text-discription").replaceWith(html);
}

function inputSelectE1(){
    var html = "";
    html += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-select">';
    html += '   <div class="hnaui-form-item">';
    html += '       <label class="hnaui-form-label"><span class="hnaui-required">* </span>证件类型</label>';
    html += '       <div class="hnaui-input-block">';
    html += '           <select name="cardType" class="cardType" hna-filter="PidType">';
    html += '               <option value="TN">客票号</option>';
    html += '               <option value="NI">身份证号</option>';
    html += '               <option value="PP">有效护照</option>';
    html += '           </select>';
    html += '       </div>';
    html += '   </div>';
    html += '</div>';
    return html;
}

//表单面板
var _currentMobile = "";
function createFormEl() {
    var html = "";
    for (var i = 0, i1 = inputList.length; i < i1; i++) {
        if(i == 1){
            html += inputSelectE1();
        }else if(i == 5){
            html += createMMVeL("hna_moveReg_mobile");
        }else{
            html += Renders.bar1.content(inputList[i].tips,inputList[i].name,inputList[i].maxLen,inputList[i].placeholder);
        }
    }
    html += Renders.checkbox("我已阅读并接受","../airR/rules?type=customService#securityIns","《旅客携带危险品规定》");
    html += Renders.button("办理", "");
    html += Renders.button("查询", "");
    $(".checkin-form").html(html);
    initMobilePreData();
    $(".search-loading").hide();
    radioType();    //单选框类型
    if (!($(".onlineCheckin-form input[name='e-mail']").val())) {
        $(".onlineCheckin-form input[name='e-mail']").attr("isavailable", "Y");
    }

    //人机验证及动态口令
    _currentMobile = $(".onlineCheckin-form").find("input[name='mobile']").val();
    resetMmvEl();
    resetVerifyEl();
}

//单选框类型
function radioType() {
    $($(".search-submit")[1]).css("display", "none");
    globalFrom.on("radio(handleType)", function () {
        $(".search-submit").toggle();
    });
}

//表单外层
function createContentE1() {
    var html = "";
    html += Templates.form;
    $(".passenger-service-checkin .progress-bar").append(html);
}

//切换下拉框类型
function selectType() {
    globalFrom.on("select(PidType)", function (data) {
        var $tip = $("input[name='cardNumber']").parent().next();
        $("input[name='cardNumber']").val("");
        $tip.hide();
        var opt = {
            maxlength: 14,
            placeholder: _i18n("cardNumber-ticketNumber-placeholder")
        };
        if (data.value == "NI") {
            opt = {
                maxlength: 18,
                placeholder: _i18n("cardNumber-ID_CARD-placeholder")
            };
            inputList[2].reg = /^([1-9]\d{5}(18|19|([2]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
            inputList[2].errorTips = _i18n("cardNumber-ID_CARD-errorTip");
        } else if (data.value == "PP") {
            opt = {
                maxlength: 50,
                placeholder: _i18n("cardNumber-2.DOC-placeholder")
            };
            inputList[2].reg = /^[\da-zA-Z]{4,50}$/;
            inputList[2].errorTips = _i18n("cardNumber-2.DOC-errorTip");
        } else if (data.value == "TN") {
            inputList[2].reg = /^([\d]){3}[-]{1}[\d]{10}$/;
            inputList[2].errorTips = _i18n("cardNumber-ticketNumber-errorTip");
        }
        credentialNoRefresh(opt);
    });

    globalFrom.on("select(PmobilePre)", function (data) {
        var $tip = $("input[name='mobile']").parent().next();
        $("input[name='mobile']").val("");
        $tip.hide();
        if (data.value == "86") {
            inputList[3].reg = /^1[3|4|5|7|8]\d{9}$/;
        } else {
            inputList[3].reg = /^[\d]{1,11}$/;
        }
    });
}
//刷新数据
function credentialNoRefresh(opt) {
    for (var key in opt) {
        if(opt.hasOwnProperty(key)){
            $("input[name='cardNumber']").attr(key, opt[key]);
            if($("span.placeholder").length > 0){
                //IE8,9
                $($("span.placeholder")[2]).html(opt.placeholder);
            }
        }
    }
}

//表单失焦校验
function blurVerify() {
    try {
        //表单失焦验证
        $(document).on("blur", "input", function (e) {
            e.stopPropagation();
            var $this = $(this);
            var thisV = ($this.val() || "").trim();
            $this.val(thisV);
            var tipBox = $this.parent(".hnaui-input-block").next();

            function tip(icon, description) {
                tipBox.show();
                tipBox.find(".hnaui-icon").html(icon);
                tipBox.find(".error-tips").html(description);
            }

            function verify(obj) {
                if ($this.hasClass(obj.cls)) {
                    if (!obj.reg.test($this.val())) {
                        tipBox.find(".hnaui-icon").removeClass("verify-ok");
                        tip(obj.icon1, obj.description);
                        $this.attr("isavailable", "N");
                    } else {
                        tipBox.find(".hnaui-icon").addClass("verify-ok");
                        tip(obj.icon2, "");
                        $this.attr("isavailable", "Y");
                    }
                }
            }

            if (thisV) {
                var obj = {};
                for (var i = 0, i1 = inputList.length; i < i1; i++) {
                    if (i == 5) {
                        continue;
                    } else {
                        obj.cls = inputList[i].name;
                        obj.reg = inputList[i].reg;
                        obj.icon1 = "&#x2716;";
                        obj.icon2 = "&#xe605;";
                        obj.description = inputList[i].errorTips;
                        verify(obj);
                    }
                }
            } else {
                tipBox.hide();
                $this.removeClass("hna-filter-error");
                $this.attr("isavailable", "N");
                if (!($(".onlineCheckin-form input[name='e-mail']").val())) {
                    $(".onlineCheckin-form input[name='e-mail']").attr("isavailable", "Y");
                }
            }
        });
        //点击查询校验
        $(".search-submit").on("click", ".hnaui-btn", function (e) {
            e.stopPropagation();
            hna.goToTop("1");
            var inputs = $(".onlineCheckin-form input[isavailable]");
            var flag = true;
            for (var i = 0, i1 = inputs.length; i < i1; i++) {
                var inputV = $(inputs[i]).val();
                var isavailable = $(inputs[i]).attr("isavailable");
                if (isavailable != "Y") {
                    flag = false;
                    if (i != 0) {
                        i++;
                    }
                    var content = "";
                    if (!inputV) {
                        content = inputList[i].blankTips;
                        layerOpen(content);
                        break;
                    } else {
                        content = inputList[i].errorTips;
                        layerOpen(content);
                        break;
                    }
                }
            }
            if (flag) {
                if (!($(".p-checkbox .hnaui-form-checkbox").hasClass("hnaui-form-checked"))) {
                    layerOpen(_i18n("dangerousRule"));
                } else {
                    var obj = {};
                    obj.checkType = $("input[name='radio']:checked").val();  //类型
                    obj.passengerName = $(inputs[0]).val();     //乘机人姓名
                    obj.certificateType = $(".onlineCheckin-form select.cardType").val();  //证件类型
                    obj.certificateNumber = $(inputs[1]).val();   //证件号码
                    obj.mobile = $("input[name='mobile']").val();
                    obj.verifyCode = $("input[name='valiCode']").val();

                    parameter.cardType = obj.certificateType;
                    parameter.cardNo = obj.certificateNumber;
                    parameter.phoneNumber = obj.mobile;
                    parameter.email = $("input[name='e-mail']").val();
                    getPassengerInfo(obj);
                }
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

//弹出层
function layerOpen(content) {
    hnaer.open({
        title: _i18n("tip"),
        content: content,
        icon: 0,
        area: "500px",
        yes: function () {
            hnaer.closeAll();
            $(".search-loading").hide();
        }
    });
}

//查询失败，重置人机验证和发送动态口令
function resetMmvVerifyEl() {
    resetMmvEl("html");
    resetVerifyEl("html");
    renderFrom();
}

//重置动态口令
function resetVerifyEl(ele) {
    if(ele){
        var html = Renders.bar1.content(inputList[4].tips,inputList[4].name,inputList[4].maxLen,inputList[4].placeholder);
        $(".hnaui-verifybtn").parents(".p-input").replaceWith(html);
    }

    var $mobile = $(".onlineCheckin-form").find("input[name='mobile']");
    var $mmvCode = $(".onlineCheckin-form").find("input[name='mmvCode']");
    $(".onlineCheckin-form .hnaui-verifybtn").VerificationCode({
        "url": ajaxUrl.sendMessage,
        "getData": function () {
            return {
                "mobile": $mobile.val() || "",
                "mmvCode": $mmvCode.val() || ""
            };
        },
        "verifyElem": [
            {
                "elem": $mobile,
                "tips": _i18n("B15")
            },
            {
                "elem": $mmvCode,
                "tips": _i18n("B14")
            }
        ],
        "failCallback": function () {
            resetMmvEl();
        }
    });
}

//重置人机验证
function resetMmvEl(ele) {
    if(ele){
        var html = createMMVeL("hna_moveReg_mobile");
        $(".p-mmv").parent().replaceWith(html);
    }
    HNAmoveReg.eventInit({
        "id": "hna_moveReg_mobile",
        "successMsg": _i18n("mmvSuccess"),
        "callback": function (data) {
            $(".onlineCheckin-form").find("input[name='mmvCode']").val(data || "").attr("isavailable", "Y");
        }
    });
}

//创建人机验证El
function createMMVeL(id) {
    var html = '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">';
    html += '       <div class="hnaui-form-item p-mmv">';
    html += '           <label class="hnaui-form-label">' + _i18n("B12") + '</label>';
    html += '           <input type="hidden" name="mmvCode" hna-verify="PmmvCode" hna-required="Y" isavailable="N">';
    html += '           <div id="' + (id || "") + '" class="hna-mmv">';
    html += '               <div class="hna-animate">';
    html += '                   <span class="hna-animate-circles hna-animate-an1"></span>';
    html += '                   <span class="hna-animate-circles hna-animate-an2"></span>';
    html += '                   <span class="hna-animate-circles hna-animate-an3"></span>';
    html += '                   <div class="hna-animate-line"></div>';
    html += '               </div>';
    html += '           </div>';
    html += '       </div>';
    html += '   </div>';
    return html;
}

/***********************信息查询--确认信息***********************************/
function getPassengerInfo(obj) {
    try {
        $(".search-loading").show();
        hna.ajax({
            url: ajaxUrl.query,
            data: obj,
            doneCallback: function (data) {
                if (data.code == 200) {
                    if (data.data.error && data.data.error.length > 0) {
                        layerOpen(data.data.error);
                        resetMmvVerifyEl();
                        return;
                    }
                    if (data.data.data.length < 1) {
                        layerOpen("未查询到可用数据，请稍后再试");
                    } else {
                        parameter.query = data.data.data;
                        //进度条样式
                        navStyle("flight-flight-confirm");
                        createInforConfirmE1();        //表格
                        textDiscription();      //右侧文字描述

                        renderFrom();
                        initElement();

                        comfirmInfo();          //确认信息

                        hna.goToTop("1");

                    }

                }
            },
            failCallback: function (err) {
                resetMmvVerifyEl();
                layerOpen("请求失败");
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

//表格
function createInforConfirmE1() {
    var html = "";
    html += Renders.bar2.title(parameter.query[0].pName.split("/").reverse().join(".") + "的航班信息");
    html += Renders.bar2.content(createTr(parameter.query), createTd("th"));
    html += Renders.checkbox("我已阅读并接受","../airR/rules?type=customService#securityIns","《网上办理乘机手续服务协议》");
    html += Renders.button("确认", "");
    $(".onlineCheckin-form").replaceWith(html);
}
function createTr(data) {
    var html = "";
    if (!data) {
        parameter.tableTdList = [
            {
                "content": (item.airlineCode + item.flightNumber) || "--",  //航班号
                "hidden": _i18n("flightNumber")
            },
            {
                "content": (item.fromCity.airportCn + "-" + item.toCity.airportCn) || "--",     //航班信息
                "hidden": _i18n("flightInfo")
            },
            {
                "content": (handleDate(item.tourDate) + " " + handleTime(item.tourTime)) || "--",     //起飞时间
                "hidden": _i18n("flightTime")
            },
            {
                "content": item.tktNumber || "--",     //票号
                "hidden": _i18n("ticketNumber")
            },
            {
                "content": item.tourClass || "--",     //舱位
                "hidden": _i18n("cabinNumber")
            },
            {
                "content": state.ticketState[item.status] || "--",     //状态
                "hidden": _i18n("ticketState")
            }
        ];
        var td = createTd("td");
        html += Renders.bar2.tr(td);
    } else {
        data.forEach(function (item, index) {
            parameter.tableTdList = [
                {
                    "content": item.tourIndex || "--",  //行程序号
                    "hidden": _i18n("tdSort")
                },
                {
                    "content": (item.airlineCode + item.flightNumber) || "--",  //航班号
                    "hidden": _i18n("flightNumber")
                },
                {
                    "content": (item.fromCity.airportCn + "-" + item.toCity.airportCn) || "--",     //航班信息
                    "hidden": _i18n("flightInfo")
                },
                {
                    "content": (handleDate(item.tourDate) + " " + handleTime(item.tourTime)) || "--",     //起飞时间
                    "hidden": _i18n("flightTime")
                },
                {
                    "content": item.tktNumber || "--",     //票号
                    "hidden": _i18n("ticketNumber")
                },
                {
                    "content": item.tourClass || "--",     //舱位
                    "hidden": _i18n("cabinNumber")
                },
                {
                    "content": state.ticketState[item.status] || "--",     //状态
                    "hidden": _i18n("ticketState")
                },
                {
                    "content": selectFlight(index, item),   //选择
                    "hidden": _i18n("select")
                }
            ];
            var td = createTd("td");
            html += Renders.bar2.tr(td);
        });
    }
    return html;
}
function createTd(t) {
    var html = "";
    parameter.tableTdList.forEach(function (tdItem, tdIndex) {
        if (t == "td") {
            html += Renders.bar2.td(tdItem.content, tdItem.hidden);
        } else if (t == "th") {
            html += Renders.bar2.th(tdItem.hidden);
        }
    });
    return html;
}

//起飞时间处理
function handleDate(date) {
    var newDate = "";
    if (!date) {
        return;
    }
    for (var i = 0, i1 = date.length; i < i1; i++) {
        if (i == 3 || i == 5) {
            newDate += date[i] + "-";
            continue;
        }
        newDate += date[i];
    }
    return newDate;
}
function handleTime(time) {
    var newTime = "";
    if (!time) {
        return;
    }
    for (var j = 0, j1 = time.length; j < j1; j++) {
        if (j == 1) {
            newTime += time[j] + ":";
            continue;
        }
        newTime += time[j];
    }
    return newTime;
}

//单选框
function selectFlight(value, item) {
    var html = "";
    html += Templates.bar2.input.format(value);
    return html;
}

/***********************信息确认--选座座位/座位确认***********************************/
function comfirmInfo() {
    $(".search-submit").on("click", ".hnaui-btn", function (e) {
        e.stopPropagation();
        hna.goToTop("1");
        parameter.passenger = [];
        var radioP = $(".hnaui-table input[name='selectFlight']:checked");
        if (radioP.length < 1) {
            layerOpen(_i18n("radioFlight"));
        } else {
            if ($(".p-checkbox input[type='checkbox']:checked").length < 1) {
                layerOpen(_i18n("serveRule"));
            } else {
                var objP = {};  //座位选择用的乘机人信息
                item = parameter.query[radioP.val()];
                if (item.cityIsCheckIn == "true") {
                    objP.id = item.tourIndex;
                    objP.firstName = item.pName.split("/")[1];
                    objP.lastName = item.pName.split("/")[0];
                    parameter.passenger.push(objP);
                    acquirePassengerInfo();

                } else {
                    layerOpen("抱歉，该航线不符合网上值机的条件，请您到机场值机柜台咨询");
                }
            }
        }

    });
}

//获取乘机人信息
function acquirePassengerInfo() {
    $(".search-loading").show();
    hna.ajax({
        url: ajaxUrl.passenger,
        data: obj().seatOrPassenger,
        doneCallback: function (data) {
            if (data.code == 200) {
                if (data.data.error && data.data.error.length > 0) {
                    layerOpen(data.data.error);
                    return;
                }
                parameter.passengerData = data.data;
                //是否值机
                if (item.status == "OPEN FOR USE") {
                    if (item.toCityStatus == "I" || item.fromCityStatus == "I") {
                        createInternationalFlightE1();
                        acquireApiInfo();
                    } else {
                        judgeSeat();  //判断有无座位
                    }
                } else {
                    existSeat();  //值机（有座位）
                }

            }
        },
        failCallback: function (err) {
            layerOpen("请求失败");
        }
    });
}

//获取国际航班api
function acquireApiInfo() {
    hna.ajax({
        url: ajaxUrl.api,
        data: obj().api,
        doneCallback: function (data) {
            if (data.code == 200) {
                if (data.data.error && data.data.error.length > 0) {
                    layerOpen(data.data.error);
                    return;
                }
                createInternationalE1(data.data);      //创建国际航班面板
                comfirmMessage();             //确认信息
            }
        },
        failCallback: function (err) {
            layerOpen("请求失败");
        }
    });
}
function createInternationalFlightE1(){
    var html = "";
    html += Renders.bar2.title(parameter.query[0].pName.split("/").reverse().join(".") + "的航班信息");
    html += Renders.bar2.content(createTr(), createTd("th"));

    html += Renders.bar2.title("国际航班旅客需确认的信息");
    html += '<div class="travellerInfoConfirm">';
    html += '<div class="icon-div"><i class="hnaui-icon hnaui-anim hnaui-anim-rotate hnaui-anim-loop">&#xe63d;</i></div>';
    html += '</div>';
    html += Renders.button("信息确认", "");
    $(".progress-bar").html(html);
}
//创建国际航班面板
function createInternationalE1(data) {
    var html = "";
    html += Renders.bar2.content(createTr4(data), createTd4("th"));
    $(".travellerInfoConfirm").html(html);
}

function createTr4(data) {
    var country = "";
    var issuingCountry = "";
    var residenceCountry = "";
    //获取城市机场数据
    var rep = HNA_COUNTRY_8L.data;
    if(rep.length < 1){
        return;
    }
    for(var i=0,i1=rep.length;i<i1;i++){
        var item = rep[i];
        if(data.apiInfo.docHolderNationality == item.code){
            country = item.name;
        }
        if(data.apiInfo.docIssueCountry == item.code){
            issuingCountry = item.name;
        }
        if(data.apiInfo.residenceCountry == item.code){
            residenceCountry = item.name;
        }
    }

    var html = "";
    parameter.tableTdList4 = [
        {
            "content": data.apiInfo.surName || "--",  //旅客姓
            "hidden": _i18n("surName")
        },
        {
            "content": data.apiInfo.givenName || "--",  //旅客名
            "hidden": _i18n("givenName")
        },
        {
            "content": state.gender[data.apiInfo.gender] || "--",     //性别
            "hidden": _i18n("gender")
        },
        {
            "content": state.cardType[data.apiInfo.docType] || "--",     //证件类型
            "hidden": _i18n("docType")
        },
        {
            "content": data.apiInfo.docID || "--",     //证件号码
            "hidden": _i18n("docID")
        },
        {
            "content": handleDate(handleBT(data.apiInfo.birthDate)) || "--",     //出生日期
            "hidden": _i18n("birthDate")
        },
        {
            "content": handleDate(handleBT(data.apiInfo.expireDate, "passport")) || "--",     //证件有效期
            "hidden": _i18n("expireDate")
        },
        {
            "content": country || "--",    //国籍
            "hidden": _i18n("docHolderNationality")
        },
        {
            "content": issuingCountry || "--",   //签发国家
            "hidden": _i18n("docIssueCountry")
        }
    ];
    if (item.isNorthAmerica == "true" ) {
        parameter.tableTdList4.push({
            "content": residenceCountry || "--",   //居住国家
            "hidden": _i18n("residenceCountry")
        });
    }
    var td = createTd4("td");
    html += Renders.bar2.tr(td);
    return html;
}

//生日 证件日期处理
function handleBT(string,passport) {
    var newS = "";
    if(string[0] == 0 || passport){
        newS = 20;
    }else{
        newS = 19;
    }
    newS += string;
    return newS;
}
function createTd4(t) {
    var html = "";
    parameter.tableTdList4.forEach(function (tdItem, tdIndex) {
        if (t == "td") {
            html += Renders.bar2.td(tdItem.content, tdItem.hidden);
        } else if (t == "th") {
            html += Renders.bar2.th(tdItem.hidden);
        }
    });
    return html;
}
//确认信息
function comfirmMessage() {
    $(".search-submit").on("click", ".hnaui-btn", function (e) {
        e.stopPropagation();
        hna.goToTop("1");
        var tdC = $(".travellerInfoConfirm .hnaui-table .td-text");
        var flag = true;
        for (var i = 0, i1 = tdC.length; i < i1; i++) {
            var item = tdC[i];
            if (item.innerHTML == "--") {
                flag = false;
                break;
            }
        }
        if (!flag) {
            layerOpen("抱歉，您无法办理网上值机，请您核查客票信息后到机场办理值机手续。");
        } else {
            judgeSeat();  //判断有无座位
        }

    });
}
//判断有无座位
function judgeSeat() {
    if (parameter.passengerData.asrSeat) {  //item.asrSeat
        //已经有座位的----------值机/未值机
        existSeat();
    } else {
        navStyle("flight-seat-choose");
        createSelectSeat();   //创建选座
    }
}

//原本有座位的
function existSeat() {
    //进度条样式
    navStyle("flight-seat-confirm");
    if (parameter.passengerData.pCiStatus == "AC") {
        $(".progress-bar").replaceWith(creatSeatConfirmE2(parameter.passengerData.asrSeat || item.asrSeat));
        //已经值机过的------重新打印/取消值机
        checkedIn();
    } else {
        $(".progress-bar").replaceWith(creatSeatConfirmE1(parameter.passengerData.asrSeat || item.asrSeat));
        //未值机--------值机/修改座位
        printBoard(parameter.passengerData.asrSeat || item.asrSeat);
    }
}
//已经值机过的------重新打印/取消值机
function checkedIn() {
    $(".search-submit").on("click", ".hnaui-btn", function (e) {
        e.stopPropagation();
        hna.goToTop("1");
        $(".search-loading").show();
        var $this = $(this);
        if ($this.hasClass("cancel-seat-btn")) {   //取消值机
            cancelCheakIn();
        } else {   //重新打印
            reprintBoardingCheck();
        }
    });
}

function cancelCheakIn() {
    hna.ajax({
        url: ajaxUrl.cancel,
        data: obj().cancel,
        doneCallback: function (data) {
            if (data.code == 200) {
                if (data.data.error && data.data.error.length > 0) {
                    layerOpen(data.data.error);
                    return;
                }
                hnaer.open({
                    title: _i18n("tip"),
                    content: "取消值机成功",
                    icon: 0,
                    closeBtn: 0,
                    btn: ["我知道了"],
                    area: "500px",
                    yes: function () {
                        hnaer.closeAll();
                        location.reload();
                    }
                });
                return;
            }
        },
        failCallback: function (err) {
            layerOpen("请求失败");
        }
    });
}

//创建座位选择面板
function createSelectSeat() {
    var html = "";
    html += createSeatContentEl();
    $(".choose-seat").replaceWith(html);
    HNAChooseSeat.init({
        ajaxUrl: ajaxUrl.seat,
        ajaxData: obj().seatOrPassenger,
        chooseCallback: function (res) {
            $(".counter-checkIn").show();
            hna.goToTop("1");
            navStyle("flight-seat-confirm");  //进度样式
            checkinContent("hnaui-flight-seat");  //容器
            $(".progress-bar").append(creatSeatConfirmE1(res));
            textDiscription();  //右侧文字描述
            printBoard(res);
        }
    });
    HNAChooseSeat.getSeatMapInfo({
        //当前的机型编号
        currentAirEquipType: parameter.passengerData.planeType,
        //当前航班号
        currentFlightNumber: item.airlineCode + item.flightNumber,
        //需要选择座位的乘机人信息
        seatTravellers: parameter.passenger
    });
    $(".counter-checkIn").hide();
}
//创建座位确认面板
function creatSeatConfirmE1(seatNo) {
    var html = "";
    html += Renders.bar2.title(parameter.query[0].pName.split("/").reverse().join(".") + "的航班信息");
    html += Renders.bar2.content(createTr2(seatNo), createTd2("th"));
    html += Renders.button("值机", Renders.a("修改座位"));
    return html;
}
function creatSeatConfirmE2(seatNo) {
    var html = "";
    html += Renders.bar2.title(parameter.query[0].pName.split("/").reverse().join(".") + "的航班信息");
    html += Renders.bar2.content(createTr2(seatNo), createTd2("th"));
    html += Renders.button("重新打印", Renders.a("取消值机"));
    return html;
}
function createTr2(seatNo) {
    var html = "";
    var statu = "";
    if (parameter.check.ticketStatus || parameter.check.ticketStatus == "") {
        statu = "已值机";
    }
    parameter.tableTdList2 = [
        {
            "content": (item.airlineCode + item.flightNumber) || "--",  //航班号
            "hidden": _i18n("flightNumber")
        },
        {
            "content": (item.fromCity.airportCn) || "--",     //起飞机场
            "hidden": _i18n("flightPlace")
        },
        {
            "content": (handleDate(item.tourDate) + " " + handleTime(item.tourTime)) || "--",     //起飞时间
            "hidden": _i18n("flightTime")
        },
        {
            "content": parameter.passengerData.cabinType || "--",     //舱位
            "hidden": _i18n("cabinNumber")
        },
        {
            "content": seatNo || "--",     //座位号
            "hidden": _i18n("seatNumber")
        },
        {
            "content": statu || state.checkedState[parameter.passengerData.pCiStatus] || "--",     //值机状态
            "hidden": _i18n("checkedState")
        }
    ];
    var td = createTd2("td");
    html += Renders.bar2.tr(td);
    return html;
}
function createTd2(t) {
    var html = "";
    parameter.tableTdList2.forEach(function (tdItem, tdIndex) {
        if (t == "td") {
            html += Renders.bar2.td(tdItem.content, tdItem.hidden);
        } else if (t == "th") {
            html += Renders.bar2.th(tdItem.hidden);
        }
    });
    return html;
}
//座位选择面板
function createSeatContentEl() {
    try {
        var html = '<div class="hnaui-flight-seat hnaui-panel hnaui-shadow hnaui-form">';
        html += '       <div class="hnaui-panel-title"><i class="hnaui-icon"></i><span id="currentFlightTitle"></span></div>';
        html += '       <div class="hnaui-seat-content hnaui-panel-content">';
        html += createLoading();
        html += '           <div class="hnaui-seat-item  hnaui-clear hnaui-show" id="currentFlightSeat"></div>';
        html += '       </div>';
        html += '   </div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}
//创建加载动画
function createLoading() {
    var html = '<div class="search-loading">';
    html += '       <div class="search-loading-content">';
    html += '           <i class="hnaui-icon hnaui-anim hnaui-anim-rotate hnaui-anim-loop loading-icon"></i>数据加载中，请稍后...';
    html += '       </div>';
    html += '   </div>';
    return html;
}

function planeSeatDisplay(a,b){
    $(".hnaui-plane").removeClass(a);
    $(".hnaui-plane").addClass(b);
}

var _animated = false;
//滚动座位分布图
function slideSeat(up) {
    try {
        if(_animated){
            return false;
        }
        // var h = $(".seat-map-wrapper").height();
        var $tab = $('.seat-map-wrapper table');
        var $tTop = $tab.position().top;
        var $tHeight = $tab.height();
        var newTop = 0;
        var bl = false;
        if (!$tab.is(":animated")) {
            if (up) {
                if($tTop<0){
                    bl = true;
                    newTop = $tTop + 400;
                    if(Math.abs(newTop)>= 400){
                        planeSeatDisplay("hnaui-plane-tail","hnaui-plane-middle");
                    }else{
                        planeSeatDisplay("hnaui-plane-middle","hnaui-plane-head");
                    }
                }
            } else {
                if ($tHeight - Math.abs($tTop) > 400) {
                    bl = true;
                    newTop = $tTop - 400;
                    if(Math.abs(newTop)<= 400){
                        planeSeatDisplay("hnaui-plane-head","hnaui-plane-middle");
                    }else{
                        planeSeatDisplay("hnaui-plane-middle","hnaui-plane-tail");
                    }
                }
            }
        }
        if(bl){
            _animated = true;
            $tab.animate({"top": newTop}, 800, function(){
                _animated = false;
            });
        }

    } catch (e) {
        JsErrorTips(e);
    }
}

/************************座位确认--打印登机牌****************************/
function printBoard(seat) {
    $(".search-submit").on("click", ".hnaui-btn", function (e) {
        e.stopPropagation();
        hna.goToTop("1");
        var $this = $(this);
        if ($this.hasClass("cancel-seat-btn")) {
            navStyle("flight-seat-choose");
            createSelectSeat();
        } else {
            $(".search-loading").show();
            comfirmSeat(seat);
        }
    });
}
//确认选座
function comfirmSeat(seat) {
    hna.ajax({
        url: ajaxUrl.check,
        data: obj({seat: seat}).check,
        doneCallback: function (data) {
            if (data.code == 200) {
                if (data.data.error && data.data.error.length > 0) {
                    layerOpen(data.data.error);
                    return;
                }
                parameter.check = data.data;
                navStyle("flight-print-board-card");
                createBoardCheckE1();
                acquireWeather();
            }
        },
        failCallback: function (err) {
            layerOpen("请求失败");
        }
    });
}
//获取天气信息
function acquireWeather() {
    hna.ajax({
        url: ajaxUrl.weather,
        data: obj().weather,
        doneCallback: function (data) {
            if (data.code == 200) {
                createWeatherE1(data.data);
                printBoardingCheck();   //打印登机牌
            }
        },
        failCallback: function (err) {
            layerOpen("请求失败");
        }
    });
}

//打印登机牌面板
function createBoardCheckE1() {
    var html = "";
    html += Renders.bar2.title(parameter.query[0].pName.split("/").reverse().join(".") + "的航班信息");
    html += Renders.bar2.content(createTr2(parameter.check.seatNo || parameter.passengerData.asrSeat), createTd2("th"));
    html += '<div class="weatherInfo">';
    html += '<div class="icon-div"><i class="hnaui-icon hnaui-anim hnaui-anim-rotate hnaui-anim-loop">&#xe63d;</i></div>';
    html += '</div>';
    html += Renders.button("打印登机牌", "");
    $(".online-check").html(html);
}
function createWeatherE1(data) {
    var html = "";
    if (data.whether && data.whether.length > 0) {
        html += Renders.bar2.title("到达城市天气预报");
        html += Renders.bar2.content(createTr3(data.whether), "");
    } else {
        html += '<div class="no-weatherInfo">未查询到天气信息</div>';
    }
    $(".weatherInfo").html(html);
}
function createTr3(data) {
    var html = "";
    data.forEach(function (wItem, index) {
        parameter.tableTdList3 = [
            {
                "content": state.weatherState[wItem.index] || "--",  //日期
                "hidden": _i18n("date")
            },
            {
                "content": (wItem.description) || "--",     //天气
                "hidden": _i18n("weather")
            },
            {
                /* "content": ( wItem.lTemperature || "--") + "-" + (wItem.hTemperature || "--"),     //温度范围*/
                "content": temperatureRange(wItem.lTemperature,wItem.hTemperature),
                "hidden": _i18n("temperature")
            },
            {
                "content": wItem.wind || "--",     //风向
                "hidden": _i18n("wind")
            }
        ];
        var td = createTd3("td");
        html += Renders.bar2.tr(td);
    });
    return html;
}
function temperatureRange(data1,data2){
    var data = "";
    if((!data1) && (!data2)){
        data = "--";
    }else{
        if(!data1){
            data = "--" + "-" + data2;
        }else if(!data2){
            data = data1 + "-" + "--";
        }else{
            data = data1 + "-" + data2;
        }
    }
    return data;
}
function createTd3(t) {
    var html = "";
    parameter.tableTdList3.forEach(function (tdItem, tdIndex) {
        if (t == "td") {
            html += Renders.bar2.td(tdItem.content, tdItem.hidden);
        } else if (t == "th") {
            html += Renders.bar2.th(tdItem.hidden);
        }
    });
    return html;
}
function printBoardingCheck() {
    $(".search-submit").on("click", ".hnaui-btn", function (e) {
        e.stopPropagation();
        hna.goToTop("1");
        $(".search-loading").show();
        hna.ajax({
            url: ajaxUrl.print,
            data: obj({dataStream: parameter.check.boardStream || parameter.reprint.dataFlow}).print,
            doneCallback: function (data) {
                if (data.code == 200) {
                    if (data.data.error && data.data.error.length > 0) {
                        layerOpen(data.data.error);
                        return;
                    }
                    window.open(data.data.url);
                    var link = $(".search-submit").next(".download-link");
                    if(link.length == 0){
                        link = "<div class='download-link'>如果没有弹出登机牌页面，请<a target='_blank' href='{0}'>点击此处</a>查看下载</div>";
                        $(".search-submit").after(link.format(data.data.url));
                    } else {
                        link.find("a").attr("href", data.data.url);
                    }
                }
            },
            failCallback: function (err) {
                layerOpen("请求失败");
            }
        });

    });
}

//重新打印登机牌
function reprintBoardingCheck() {
    hna.ajax({
        url: ajaxUrl.reprint,
        data: obj().reprint,
        doneCallback: function (data) {
            if (data.code == 200) {
                if (data.data.error && data.data.error.length > 0) {
                    layerOpen(data.data.error);
                    return;
                }
                parameter.reprint = data.data;
                navStyle("flight-print-board-card");
                createBoardCheckE1();
                acquireWeather();

            }
        },
        failCallback: function (err) {
            layerOpen("请求失败");
        }
    });
}

//初始化手机号码国际码
function initMobilePreData(info) {
    try {
        if (!info) {
            info = {};
        }
        hna.jsData.getInterTelData(function (data) {
            _InterTelList = data.data;

            $(".hnaui-mobile-pre").each(function () {
                var $this = $(this);
                var $thisSelect = $this.find("select");
                var thisV = $thisSelect.data("value");
                var thisReadonly = $thisSelect.prop("disabled");
                $this.replaceWith(createMobilePreEl({
                    "value": thisV,
                    "dataArr": _InterTelList,
                    "readonly": thisReadonly
                }));
            });
            if (globalFrom) {
                globalFrom.render("select");
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

function createMobilePreEl(o) {
    if (!o) {
        o = {};
    }
    var html = '';
    try {
        html += '<div class="hnaui-mobile-pre">';
        html += '<select name = "mobilePre" hna-filter="PmobilePre" data-value="' + (o.value || "") + '" ' + (o.readonly ? "disabled" : "") + ' hna-search>';
        (o.dataArr || [{"area_code": 86, "name": "中国"}]).forEach(function (item) {
            if(item.area_code){
                var selected = "";
                if ((!o.value && item.area_code == "86") || (o.value && o.value == item.area_code)) {
                    selected = "selected";
                }
                html += '<option value="' + (item.area_code || "") + '" ' + selected + '>' + (item.area_code || "") + '</option>';
            }
        });
        if (!o.dataArr) {
            html += '<option value="-1">数据加载中</option>';
        }
        html += '</select>';
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}

