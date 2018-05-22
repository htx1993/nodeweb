hna._i18nMap.addLanguages({
    "P01": {"zh_CN": "最多添加{0}个成人！", "en_US": "Flight number"},
    "P02": {"zh_CN": "最多添加{0}个儿童！", "en_US": "Flight number"},
    "P03": {"zh_CN": "最多添加{0}个婴儿！", "en_US": "Flight number"},
    "P04": {"zh_CN": "至少有一个成年人", "en_US": "Flight number"},
    "P05": {"zh_CN": "重新查询", "en_US": "Flight number"},
    "P06": {"zh_CN": "下一步，增值服务", "en_US": "Flight number"},
    "P07": {"zh_CN": "乘客", "en_US": "Flight number"},
    "P08": {"zh_CN": "成人", "en_US": "Flight number"},
    "P09": {"zh_CN": "儿童", "en_US": "Flight number"},
    "P10": {"zh_CN": "婴儿", "en_US": "Flight number"},
    "P11": {"zh_CN": "联系人", "en_US": "Flight number"},
    "P12": {"zh_CN": "设为订票联系人", "en_US": "Flight number"},
    "P13": {"zh_CN": "加入常用乘机人", "en_US": "Flight number"},
    "P14": {"zh_CN": "请手动输入乘机人信息", "en_US": "Flight number"},
    "P15": {"zh_CN": "请输入手机号码", "en_US": "Flight number"},
    "P16": {"zh_CN": "乘机人姓名", "en_US": "Flight number"},
    "P17": {"zh_CN": "请选择{0}", "en_US": "Flight number"},
    "P18": {"zh_CN": "请仔细阅读以下协议", "en_US": "Flight number"},
    "P19": {"zh_CN": "锂电池运输管理规定", "en_US": "Flight number"},
    "P20": {"zh_CN": "北部湾航空行李国内运输总条件", "en_US": "Flight number"},
    "P21": {"zh_CN": "购票须知", "en_US": "Flight number"},
    "P22": {"zh_CN": "退票须知", "en_US": "Flight number"},
    "P23": {"zh_CN": "已阅读并同意以上条款", "en_US": "Flight number"},
    "P24": {"zh_CN": "添加成人", "en_US": "Flight number"},
    "P25": {"zh_CN": "添加儿童", "en_US": "Flight number"},
    "P26": {"zh_CN": "添加婴儿", "en_US": "Flight number"},
    "P27": {"zh_CN": "请确认您已阅读并接受北部湾航空行李国内运输总条件，锂电池运输管理规定，购票须知，退票须知等协议！", "en_US": "Flight number"},
    "P28": {"zh_CN": "请先填写第一个乘机人的信息，再同步到联系人", "en_US": "Flight number"},
    "P29": {"zh_CN": "温馨提示：请您购票前检查身体健康情况是否适宜乘机，如需申请老年旅客特殊关怀服务，请拨打北部湾航空客户服务热线{0}进行咨询。", "en_US": "Flight number"},
    "P30": {"zh_CN": "你输入的身份证不属于成人！", "en_US": "Flight number"},
    "P31": {"zh_CN": "您的年龄超过网上购票限制，具体事宜可拨打{0}进行咨询。", "en_US": "Flight number"},
    "P32": {"zh_CN": "你输入的身份证不属于儿童！", "en_US": "Flight number"},
    "P33": {"zh_CN": "你输入的身份证不属于婴儿！", "en_US": "Flight number"},
    "P34": {"zh_CN": "名", "en_US": "Flight number"},
    "P35": {"zh_CN": "姓", "en_US": "Flight number"},
    "P36": {"zh_CN": "请输入15位或18位身份证号码", "en_US": "Flight number"},
    "P37": {"zh_CN": "名(英文，与护照上的一致)", "en_US": "Flight number"},
    "P38": {"zh_CN": "姓(英文，与护照上的一致)", "en_US": "Flight number"},
    "P39": {"zh_CN": "请输入准确的护照号码", "en_US": "Flight number"},
    "P40": {"zh_CN": "请输入准确的军官证号码", "en_US": "Flight number"},
    "P41": {"zh_CN": "请输入其他证件号码", "en_US": "Flight number"},
    "P42": {"zh_CN": "请确认您的信息", "en_US": "Flight number"},
    "P43": {"zh_CN": "{0}{1}和{2}{3}的证件号码相同，购买飞机票时不能有证件号相同的乘机人。", "en_US": "Flight number"},
    "P44": {"zh_CN": "请您确认订单信息，包括乘机人信息（{0}）、航班信息、联系人信息（联系人手机号：{1}）。", "en_US": "Flight number"},
    "P45": {"zh_CN": "未满18周岁的成人，不能携带儿童或婴儿旅客同行", "en_US": ""},
    "P46": {"zh_CN": "{0}{1}和{2}{3}的姓名相同，购买飞机票时不能有姓名相同的乘机人。", "en_US": "Flight number"},
    "P47": {"zh_CN": "特殊旅客", "en_US": "Flight number"},
    "P48": {"zh_CN": "不正常航班服务", "en_US": "Flight number"}
});

var ajaxUrl = {
    getTravellers: "/passenger/getTravellers",
    addTravellers: "/passenger/addTravellers",
    getCouponList: "/airU/userInfo/getCouponList",
    useCoupon: "/passenger/useCoupon"
};
//数据适配处理,可以在这里修改后台需要参数的结构和属性名

//全局的我的乘机人
var _Travellers = [];
//乘机人成人
var _TravellersAdt = [];
//乘机人儿童
var _TravellersCnn = [];
//乘机人婴儿
var _TravellersInf = [];

//用户信息
var _userInfo = {};

hna.isBlur = false;

//是否显示添加成人 儿童 婴儿的按钮
var btnHas = false;

//是否有优惠券功能
var couponHas = false;

//是否限制未满18周岁的成人不能携带儿童或者婴儿呢
var age18Has = true;
var hasAged = false;


//获取url里的offerid
// var _offerId = hna.uncompile((hna.getRequest() || {}).offerId || "");

var _currentDate = hna._date.getDateInfo().date;

var _countryData = [];
var _mobilePreData = [];
var hasMobilePre = true;

var _isChooseSeat = false;

var browserRule = /^.*(Safari)+.*$/;
if (browserRule.test(navigator.userAgent)) {
    window.onpageshow = function (event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
}

$(function () {
    //页面点击事件
    $(document).on("click", ".click-btn", function (e) {
        e.stopPropagation();
        try {
            var $this = $(e.target);
            if ($this.hasClass("hnaui-btn-disabled")) {
                return false;
            }
            if ($this.hasClass("p-panel-toggle")) {
                //显示隐藏乘机人面板
                $this.parents(".p-panel").find(".p-panel-body").toggle();
                $this.toggleClass("down");

            } else if ($this.hasClass("re-search-btn")) {
                //重新查询
                hna.loading();
                goToPage("/airEye/flight/select?type=research");

            } else if ($this.hasClass("hna-add-adt")) {
                //新增成人
                addPassengerPanel("ADT");

            } else if ($this.hasClass("hna-add-cnn")) {
                //新增儿童
                addPassengerPanel("CNN");

            } else if ($this.hasClass("hna-add-inf")) {
                //新增婴儿
                addPassengerPanel("INF");

            } else if ($this.hasClass("hnaui-remove-traveller")) {
                //删除乘机人
                deletePassengerPanel($this.parents(".p-panel"));
            } else if ($this.hasClass("service-terms")) {
                var thisHref = $this.data("href");
                var thisText = $this.text();
                $this.parents('.hnaui-attention').find('a').removeClass('hnaui-attention-active');
                $this.addClass("hnaui-attention-active");
                if (thisHref) {
                    //_showServiceTermsTips({"title": thisText, "href": thisHref});
                    getAttentionHtml({"title": thisText, "href": thisHref});
                }
            } else if ($this.hasClass("submit-coupon")) {
                //使用优惠券
                window.useCoupon();
            } else if ($this.hasClass("select-passenger")) {
                //选择获取取消常用乘机人
                $this.toggleClass("hnaui-select-active");
                renderPassengerInfo($this);
            }
        } catch (ev) {
            JsErrorTips(ev);
        }
        return false;
    });
    try {
        hna.jsData.getFlightCityData(function (data) {
            _flightCityData = data;

            if(!hasRepeatOrderCoder()){
                return false;
            }

            //判断是否有旅客证件号无法出票
            if(!hasSuccessOrder()) {
                return false;
            }

            setFlightState("flight-state-passenger");
            _getShoppingCartInfo();
            createInitEl();
            hna.filterForm();
            hna.goToTop("1");
        });
    } catch (e) {
        JsErrorTips(e);
    }
});
//增加乘机人面板
function addPassengerPanel(passType) {
    var index = 0;
    var tipsIndex = "P01";
    var claStr = passType.toLowerCase();
    var currentCount = _sInfo.guestTypes[index].amount;
    var cnnCount = _sInfo.guestTypes[1].amount;

    if (passType == "CNN") {
        index = 1;
        tipsIndex = "P02";
        currentCount = _sInfo.guestTypes[index].amount;
        if (currentCount < 1) {
            claStr = "adt";
        }
    } else if (passType == "INF") {
        index = 2;
        tipsIndex = "P03";
        currentCount = _sInfo.guestTypes[index].amount;
        if (currentCount < 1) {
            if (cnnCount < 1) {
                claStr = "adt";
            } else {
                claStr = "cnn";
            }
        }
    }
    var max = _searchBoxConfig.guestTypes[index].max;
    if (currentCount >= max) {
        _showMsg(_i18n(tipsIndex, max));
    } else {
        _sInfo.guestTypes[index].amount++;

        var referencePanel = $(".p-panel." + claStr).last();
        referencePanel.after(getPassengerPanelEl(passType));
        var thisPanel = referencePanel.next();
        thisPanel.find(".p-date").each(function () {
            pDateClickFun(this, true);
        });
        resetSelectData("country", thisPanel);
        resetSelectData("cardIssueCountry", thisPanel);
        resetSelectData("mobilePre", thisPanel);
        initPanelIndex();
        renderFrom();
    }
}
//删除乘机人面板
function deletePassengerPanel(thisPanel) {
    var passType = thisPanel.find('input[name="passType"]').val().toUpperCase();
    if (passType == "ADT" && _sInfo.guestTypes[0].amount <= 1) {
        _showMsg(_i18n("P04"));
        return false;
    }

    var index = 0;
    if (passType == "CNN") {
        index = 1;
    } else if (passType == "INF") {
        index = 2;
    }
    _sInfo.guestTypes[index].amount--;

    thisPanel.remove();
    initPanelIndex();
    renderFrom();
}
//填充乘机人信息面板
function renderPassengerInfo(thisP) {
    var thisArrData = [];
    var thisPassType = "";
    var $selectActive = thisP.parent().find(".hnaui-select-active");

    if (thisP.hasClass("p-adt")) {
        thisArrData = _TravellersAdt;
        thisPassType = "adt";

        if ($selectActive.length > _sInfo.guestTypes[0].amount) {
            thisP.toggleClass("hnaui-select-active");
            _showValidationTips("不能再选择成人，请取消其他成人信息以进行更换！");
            return false;
        }
    } else if (thisP.hasClass("p-cnn")) {
        thisArrData = _TravellersCnn;
        thisPassType = "cnn";

        if ($selectActive.length > _sInfo.guestTypes[1].amount) {
            thisP.toggleClass("hnaui-select-active");
            _showValidationTips("不能再选择儿童，请取消其他儿童信息以进行更换！");
            return false;
        }
    } else if (thisP.hasClass("p-inf")) {
        thisArrData = _TravellersInf;
        thisPassType = "inf";

        if ($selectActive.length > _sInfo.guestTypes[2].amount) {
            thisP.toggleClass("hnaui-select-active");
            _showValidationTips("不能再选择婴儿，请取消其他婴儿信息以进行更换！");
            return false;
        }
    }
    var arr = [];

    $selectActive.each(function () {
        arr.push(thisArrData[$(this).data("index")]);
    });


    $(".p-panel." + thisPassType).each(function (index, element) {
        var $thisPanel = $(this);
        var travellerInfo = arr[index] || new Traveller();
        //填充乘机人信息时 移除文本框错误样式
        $thisPanel.find('input').parent().removeClass("hnaui-error-active");
        if (!travellerInfo.id) {
            if (_sInfo.isDomestic == "N") {
                //如果是国际航班，则证件类型默认设置为护照
                travellerInfo.idType = "2.DOC";
            }
            //下拉移除文本框字体样式  设置文本框为可读
            $thisPanel.find('input').removeClass('hnaui-readonly').removeAttr("readonly", "readonly");
            //设置下拉框为可用
            $thisPanel.find("select").prop("disabled", false);

            //显示 添加常用乘机人
            $thisPanel.find("input[name='saveToAirU']").prop("checked",false).prop("disabled",false).parent().removeClass("hnaui-btn-disabled");
        } else {
            //下拉添加文本框字体样式  设置文本框为只读
            $thisPanel.find('input').addClass('hnaui-readonly').attr("readonly", "readonly");
            //设置下拉框为不可用
            $thisPanel.find("select").prop("disabled", true);

            //隐藏 添加常用乘机人
            $thisPanel.find("input[name='saveToAirU']").prop("checked",false).prop("disabled",true).parent().addClass("hnaui-btn-disabled");

        }

        //重新赋值
        $thisPanel.find("input[name='id'][type='hidden']").val(travellerInfo.id);
        $thisPanel.find("input[name='lastName']").val(travellerInfo.lastName);
        $thisPanel.find("input[name='firstName']").val(travellerInfo.firstName);
        $thisPanel.find("input[name='idNo']").val(travellerInfo.idNo);
        $thisPanel.find("input[name='birthday']").val(travellerInfo.birthday);
        $thisPanel.find("input[name='mobile']").val(travellerInfo.mobile).removeClass('hnaui-readonly').removeAttr("readonly", "readonly");
        $thisPanel.find("input[name='cardValidDate']").val(travellerInfo.cardValidDate);
        $thisPanel.find("input[name='email']").val(travellerInfo.email);

        $thisPanel.find("select[name='mobilePre']").val(travellerInfo.mobilePre).prop("disabled", false);
        $thisPanel.find("select[name='sex']").val(travellerInfo.sex);
        $thisPanel.find("select[name='country']").val(travellerInfo.country);
        $thisPanel.find("select[name='idType']").val(travellerInfo.idType);
        $thisPanel.find("select[name='cardIssueCountry']").val(travellerInfo.cardIssueCountry);

        resetInputTitle($thisPanel.find("input[name='idNo']"), travellerInfo.idType);

        renderFrom();
        //给相关控件添加日期选择或者移除日期控件
        $thisPanel.find("input.p-date").each(function () {
            pDateClickFun(this, !$(this).val());
        });

        //判断该面板的saveContact是否被选择
        var $saveContact = $thisPanel.find("input[name='saveContact']");
        if ($saveContact.length > 0 && $saveContact.prop("checked")) {
            renderContactPanel($saveContact, !!travellerInfo.id);
        }

        //清空该面板里面错误提示信息
        $thisPanel.find(".hnaui-error-box").empty();
    });

}