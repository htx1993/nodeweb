hna._i18nMap.addLanguages({
    "I01": {"zh_CN": "添加乘机人", "en_US": "Flight number"},
    "I02": {"zh_CN": "添加新地址", "en_US": "Flight number"},
    "I03": {"zh_CN": "编辑", "en_US": "Flight number"},
    "I04": {"zh_CN": "删除", "en_US": "Flight number"}
});
var ajaxUrl = ajaxUrl || {};
ajaxUrl.getUserInfo = "/airU/userInfo/getUserInfo";
var _pageSize = 5;
var _userId = "4";

//国籍数据
var _countryData = [
    {
        "code": "",
        "name": _i18n("Lmsg01")
    }
];


var _fromListUm = _fromListUm || [];

//国内乘机人分页表
var _dPassengerPaging = null;
//国际乘机人分页表
var _iPassengerPaging = null;
//邮寄地址分页
var _addressPaging = null;
//全部优惠券分页
var _allCouponPaging = null;
//未使用优惠券分页
var _notUsedCouponPaging = null;
//已使用优惠券分页
var _usedCouponPaging = null;
//已过期优惠券分页
var _outCouponPaging = null;

hna.isBlur = false;

//获取url里的菜单名
var _menuName = getHash();


$(function () {
    $(window).on("hashchange", function () {
        _menuName = getHash();
        createInitElByMenu();
    });

    $(document).on("click", ".click-btn", function (e) {
        e.stopPropagation();
        var $this = $(this);
        if ($this.hasClass("add-passenger")) {
            createPassengerDetailPanel();
            hna.locationTag($(".hnaui-edit-panel"));

        } else if ($this.hasClass("update-passenger-btn")) {
            createPassengerDetailPanel(getTrData($this));
            hna.locationTag($(".hnaui-edit-panel"));

        } else if ($this.hasClass("delete-passenger-btn")) {
            deletePassengerInfo(getTrData($this));

        } else if ($this.hasClass("add-address")) {
            createAddressDetailPanel();
            hna.locationTag($(".hnaui-edit-panel"));

        } else if ($this.hasClass("update-address-btn")) {
            createAddressDetailPanel(getTrData($this));
            hna.locationTag($(".hnaui-edit-panel"));

        } else if ($this.hasClass("delete-address-btn")) {
            deleteAddressInfo(getTrData($this));

        }else if ($this.hasClass("show-coupon")) {
            showCouponInfo(getTrData($this));

        }
    });

    if(window._thirdId){
        _userInfo = new UserInfo();
        _userId = _userInfo.id;
        $(".search-loading").hide();
        $(".user-menu-right").hide();
        createUserInfoPanelThird();

        initInputUm();
        initSelectUm();
        initSubmitUm();

        hna.filterForm();
    }else{
        _userInfo = new UserInfo();
        _createUserMenuEl("hasLogin");
        hna.jsData.getFlightCityData(function(data){
            _flightCityData = data;
            getUserInfo();
        });
        commonEventInit();
    }

    hna.goToTop("1");
});

//获取用户信息
function getUserInfo() {
    $(".search-loading").show();
    hna.ajax({
        url: ajaxUrl.getUserInfo,
        data: {id: ""},
        doneCallback: function (data) {
            if (data && data.code == "200") {
                _userInfo = new UserInfo(data.data.data);
                _userId = _userInfo.id;
                $(".search-loading").hide();
                createInitElByMenu();

                renderFrom();
                initElement();

                initInputUm();
                initSelectUm();
                initDateUm();
                initRadioUm();
                initSubmitUm();

                hna.filterForm();
            }
        },
        alwaysCallback: function (data) {
        }
    });
}

//根据菜单，常见不同的内容
function createInitElByMenu() {
    window._currentCountryType = 0;
    if (_menuName == "#menu_information") {
        createUserInfoPanel();
    } else if (_menuName == "#menu_setting") {
        createSettingInfoPanel();
    } else if (_menuName == "#menu_passenger") {
        createPassengerInfoPanel();
    } else if (_menuName == "#menu_address") {
        createAddressInfoPanel();
    }else if(_menuName == "#menu_coupon"){
        createCouponInfoPanel();
    }
}

//创建新增按钮
function createAddBtnEl(elType) {
    if (!elType) {
        elType = "passenger";
    }
    var defaultTitle = _i18n("I01");
    if (elType == "address") {
        defaultTitle = _i18n("I02");
    }
    var html = '<div class="hnaui-add-btn">';
    html += '       <a class="' + _classList[9] + ' ' + _classList[9] + '-theme click-btn add-' + elType + '"><i class="' + _classList[8] + '">&#xe906;</i> ' + defaultTitle + '</a>';
    html += '   </div>';
    return html;
}
//创建列表的操作列dom
function createOperationEl(flag) {
    if (!flag) {
        flag = "passenger";
    }
    return '<a href="javascript:;" onclick="return false" class="hna-purpe click-btn update-' + flag + '-btn"><i class="' + _classList[8] + '">&#xe642;</i>'+_i18n("I03")+'</a>|<a href="javascript:;" class="hna-purpe click-btn delete-' + flag + '-btn"><i class="' + _classList[8] + '">&#xe640;</i>'+_i18n("I04")+'</a>';
}
//创建tab标签面板
function createUserPanelEl(o) {
    try {
        if (!o) {
            o = {};
        }
        if (!o.dataArr) {
            o.dataArr = [];
        }
        var html = '<div class="hnaui-user-panel ' + _classList[5] + ' ' + _classList[7] + ' ' + (o.type || "") + '-info hnaui-shadow">';
        // html += '       <h1><i class="hnaui-icon">'+(o.icon||"")+'</i>'+(o.title||"")+'</h1>';
        html += '       <div class="' + _classList[6] + ' ' + _classList[7] + ' ' + _col12 + '">';
        if (o.dataArr.length == 1) {
            html += o.dataArr[0].createHtmlFun();
        } else {
            html += createTabPanelEl(o);
        }
        html += '       </div>';
        if (o.type == "address" || o.type == "passenger") {
            html += createAddBtnEl(o.type);
        }
       // setUserMenuLeftEl(o);
        html += '   </div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}


//新增或修改一条记录
function updateRecord(url, info, callback) {
    sendAjaxUm(url, info, function () {
        _showMsg(_i18n("Msg01"));
        if (hna.isFunction(callback)) {
            callback();
        }
    });
}
//删除一条记录
function deleteRecord(url, info, callback) {
    if (!url) {
        return false;
    }
    _showConfirmTips(_i18n("Msg02"), function () {
        hideEditPanel();
        sendAjaxUm(url, info, function () {
            _showMsg(_i18n("Msg03"));
            if (hna.isFunction(callback)) {
                callback();
            }
        });
    });
}

//隐藏编辑panel
function hideEditPanel() {
    $(".hnaui-edit-panel").remove();
}


//从列表table中获取一行的数据
function getTrData(thisP) {
    thisP = thisP instanceof $ ? thisP : $(thisP);
    var thisV = thisP.parents("tr").find("input[name='hiddenValue']").val();
    return JSON.parse((thisV+"").replace(/(\|\|\|)/g, '"'));
}

//获取hash的值
function getHash() {
    return location.hash || "#menu_information";
}