hna._i18nMap.addLanguages({
    "CO01": {"zh_CN": "预订内容", "en_US": "Shopping Cart"},

    "OC01": {"zh_CN": "旅客姓名", "en_US": "Shopping Cart"},
    "OC02": {"zh_CN": "证件类型", "en_US": "Shopping Cart"},
    "OC03": {"zh_CN": "证件号码", "en_US": "Shopping Cart"},
    "OC04": {"zh_CN": "出生日期", "en_US": "Shopping Cart"},
    "OC05": {"zh_CN": "旅客类型", "en_US": "Shopping Cart"},
    "OC06": {"zh_CN": "旅客信息", "en_US": "Shopping Cart"},
    "OC07": {"zh_CN": "承运人", "en_US": "Shopping Cart"},
    "OC08": {"zh_CN": "出发-到达城市", "en_US": "Shopping Cart"},
    "OC09": {"zh_CN": "起飞-到达时间", "en_US": "Shopping Cart"},
    "OC10": {"zh_CN": "舱位", "en_US": "Shopping Cart"},
    "OC11": {"zh_CN": "产品名称", "en_US": "Shopping Cart"},
    "OC12": {"zh_CN": "原票面价格", "en_US": "Shopping Cart"},
    "OC13": {"zh_CN": "新出行日期", "en_US": "Shopping Cart"},
    "OC14": {"zh_CN": "原航段信息", "en_US": "Shopping Cart"},

    "OC15": {"zh_CN": "新航班号", "en_US": "Shopping Cart"},
    "OC16": {"zh_CN": "原航班号", "en_US": "Shopping Cart"},
    "OC17": {"zh_CN": "原航班", "en_US": "Shopping Cart"},
    "OC18": {"zh_CN": "新航班", "en_US": "Shopping Cart"},
    "OC20": {"zh_CN": "机型", "en_US": "Shopping Cart"},
    "OC23": {"zh_CN": "新票面价", "en_US": "Shopping Cart"},
    "OC24": {"zh_CN": "剩余座位", "en_US": "Shopping Cart"},
    "OC25": {"zh_CN": "变更性质", "en_US": "Shopping Cart"},
    "OC26": {"zh_CN": "选择", "en_US": "Shopping Cart"},
    "OC27": {"zh_CN": "票价补偿", "en_US": "Shopping Cart"},
    "OC28": {"zh_CN": "改期手续费", "en_US": "Shopping Cart"},

    "OC29": {"zh_CN": "请选择舱位", "en_US": "Shopping Cart"},
    "OC30": {"zh_CN": "其他证件无证件号", "en_US": "Shopping Cart"},
    "OC31": {"zh_CN": "搜索", "en_US": "Shopping Cart"},
    "OC32": {"zh_CN": "提交", "en_US": "Shopping Cart"},
    "OC33": {"zh_CN": "请选择", "en_US": "Shopping Cart"},
    "OC34": {"zh_CN": "查询舱位中，请稍后...", "en_US": "Shopping Cart"},
    "OC35": {"zh_CN": "您有未选择的航段！", "en_US": "Shopping Cart"},
    "OC36": {"zh_CN": "请输入要改期的航班日期", "en_US": "Shopping Cart"},
    "OC37": {
        "zh_CN": "1、请您确认改期信息，在您点击“确认改期”之后，我们将为您提供10分钟的支付时间供您完成改期支付，在此期间您的改期信息将被保留且无法修改；",
        "en_US": "Shopping Cart"
    },
    "OC38": {"zh_CN": "2、若点击改期后，关闭该页面，则还可以在10分钟内查找该订单继续支付，但是无法购买辅营产品；", "en_US": "Shopping Cart"},
    "OC39": {"zh_CN": "3、根据销售情况，航班价格会随时波动，生成的订单与查询价格可能存在不一致的情况，以实际生成订单的价格为准。", "en_US": "Shopping Cart"},
    "OC40": {"zh_CN": "原航班的信息如下:", "en_US": "Shopping Cart"},
    "OC41": {"zh_CN": "新航班", "en_US": "Shopping Cart"},
    "OC42": {"zh_CN": "原航班", "en_US": "Shopping Cart"},
    "OC43": {"zh_CN": "非常抱歉！您所选择的时间内没有符合要求的航班。", "en_US": "Shopping Cart"},
    "OC44": {"zh_CN": "改期不能选择同一天", "en_US": "Shopping Cart"},
    "OC45": {"zh_CN": "改期手续费计算中，请稍后... ", "en_US": "Shopping Cart"},
    "OC46": {"zh_CN": "修改失败！", "en_US": "Shopping Cart"},
    "OC47": {"zh_CN": "两段航程不能为同一天！", "en_US": "Shopping Cart"},
    "OR10": {"zh_CN": "当前操作订单", "en_US": "Shopping Cart"},
    "OC48": {"zh_CN": "该航段出行日期必须大上一航段出行日期", "en_US": "Shopping Cart"},
    "OC49": {"zh_CN": "请至少选择一个航段进行改期查询！", "en_US": "Shopping Cart"},
    "OC50": {"zh_CN": "您的航班已起飞，不提供改期服务", "en_US": "Shopping Cart"},
    "OC51": {"zh_CN": "新航班的信息如下:", "en_US": "Shopping Cart"}
});
var ajaxUrl = {
    getChangeOrderInfoBefore: "/order/getChangeOrderInfoBefore",
    getChangeOrderInfoAfter: "/order/getChangeOrderInfoAfter",
    calculatedPrice: "/order/calculatedPrice",
    updateShipSpaceInfo: "/order/updateShipSpaceInfo"
};

//获取url里的订单号
var _orderCode = getOrderCodeBuyUrl() || '';
//获取url里的订单号
var _flightNumber = "";

var _tripType = "OW";
//单选按钮 类型个数
var _tripCount = 0;

//该航班里面的乘机人信息
var _passengerList = [];
var _fareFamilies = [];
//该航班乘机人类型，数量，机票基础价格
var _passTypeInfo = {
    "ADT": {
        count: 0,
        baseFare: 0
    },
    "CNN": {
        count: 0,
        baseFare: 0
    },
    "INF": {
        count: 0,
        baseFare: 0
    }
};
//改期前的航班信息
var _oldFlightList = [];
//改期后的航班信息
var _newFlightInfo = {};

var _itemID = "";

var addTime = -2;

//航班机场信息

//改期信息提示
var _changeList = [];

//支付时限
var _paymentTimeout = "30";

//改期行程的数组
var _tripeTypeChangeList = [];

$(function () {
    //页面点击事件
    $(document).on("click", ".click-btn", function (e) {
        e.stopPropagation();
        try {
            var $this = $(e.target);
            if ($this.hasClass("hnaui-btn-disabled")) {
                return false;
            }

            if ($this.hasClass("order-detail-btn")) {
                //返回订单详情页面
                goToPage("/airEye/order/orderDetail?orderCode=" + hna.compile(_orderCode));

            }

        } catch (ev) {
            JsErrorTips(ev);
        }
    });

    try {
        hna.jsData.getFlightCityData(function (data) {
            _flightCityData = data;
            createChangeOrderEl();
            getOldFlightInformation();
        });
        hna.goToTop("1");
    } catch (e) {
        JsErrorTips(e);
    }
});


//获取生日最小值
function getBirthday() {
    var birthdayList = [];
    isAddBirthday().forEach(function (obj, index) {
        birthdayList.push(addBirthdayMax(obj.birthday, obj.passType));
    });
    return birthdayList.min();

}
function getBirthdayMin() {
    var birthdayList = [];
    isAddBirthday().forEach(function (obj, index) {
        // console.log(obj);
        birthdayList.push(addBirthdayMin(obj.birthday, obj.passType));
    });
    return birthdayList.max();
}

//添加最大值
function addBirthdayMax(birthday, type) {
    var bir = '';
    if (type == "CNN") {
        bir = hna._date.addYear(12, birthday);
    } else if (type == "INF") {
        bir = hna._date.addYear(2, birthday);
    } else {
        bir = hna._date.addYear(200, birthday);
    }
    return bir;
}

function addBirthdayMin(birthday, type) {
    var bir = '';
    if (type == "CNN") {
        bir = hna._date.addYear(2, birthday);
    } else if (type == "INF") {
        bir = hna._date.addDate(13, birthday);
    } else {
        bir = hna._date.addYear(12, birthday);
    }
    return bir;
}






//格式化数据
function formattedData(data) {
    try {
        _tripType = data.tripType;
        _itemID = data.itemid;
        _passengerList = data.passengerList;
        _oldFlightList = data.flightList;
        _fareFamilies = data.fareFamilies;
        getBirthday();
    } catch (e) {
        JsErrorTips(e);
        return false;
    }
}
//给所有成人添加出生日 做日期控制
function isAddBirthday() {
    var birList = hna.cloneObj(_passengerList);
    (birList || []).forEach(function (item, index) {
        if (item.passType == "ADT") {
            item.birthday = "1980-01-01";
        }
    });
    return birList;
}
