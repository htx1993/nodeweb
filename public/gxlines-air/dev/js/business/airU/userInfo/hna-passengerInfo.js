var ajaxUrl = window.ajaxUrl || {};
ajaxUrl.getPassengerInfo = "/airU/userInfo/getPassengerInfo";
ajaxUrl.addPassenger = "/airU/userInfo/addPassenger";
ajaxUrl.updatePassenger = "/airU/userInfo/updatePassenger";
ajaxUrl.deletePassenger = "/airU/userInfo/deletePassenger";

var _fromListUm = window._fromListUm || [];
_fromListUm.push({
    //提交乘机人
    "type": "passengerInfoForm",
    "fromCla": "passenger-info-form",
    "callback": updatePassengerInfo
});

var _countryList = window._countryList || [];

//创建常用乘机人面板
function createPassengerInfoPanel(flag) {
    try {
        hna.jsData.getCountryData(function (data) {
            _countryList = data.data;
            var htmlEl = createUserPanelEl({
                "type": "passenger", "title": _i18n("Tit18"), "icon": "&#xe90a;", "dataArr": [
                    {
                        "title": _i18n("Tit28"),
                        "createHtmlFun": function () {
                            var html = '<form class="' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + '" id="dPassengerForm">';
                            html += createHiddenInputUm({"eleType": "countryType", "value": "0"});
                            html += createHiddenInputUm({"eleType": "userId", "value": _userId});
                            html += '   </form>';
                            html += '   <div class="dPassenger"></div>';
                            return html;
                        }
                    },
                    {
                        "title": _i18n("Tit29"),
                        "createHtmlFun": function () {
                            var html = '<form class="' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + '" id="iPassengerForm">';
                            html += createHiddenInputUm({"eleType": "countryType", "value": "1"});
                            html += createHiddenInputUm({"eleType": "userId", "value": _userId});
                            html += '   </form>';
                            html += '   <div class="iPassenger"></div>';
                            return html;
                        }
                    }
                ]
            });
            $(".search-result").html(htmlEl).show();

            initElement();
            initTabUm();

            var config1 = {
                "searchForm": 'dPassengerForm',//搜索的表单
                "searchResult": "dPassenger", //展示的位置
                "url": ajaxUrl.getPassengerInfo,//ajax地址
                "pageSize": _pageSize,//   默认每页显示多少
                "searchInit": true,
                "columns": [
                    {
                        "fieldTitle": _i18n("Adr02"),
                        "dom": "seq"
                    },
                    {
                        "fieldName": "firstName",
                        "fieldTitle": _i18n("Adr18"),
                        "renderFun": function (val, row) {
                            return (new Traveller(row)).fullName;
                        }
                    },
                    /*{
                        "fieldName": "passType",
                        "fieldTitle": _i18n("Adr16"),
                        "renderFun": function (val, row) {
                            return _filterPassType((new Traveller(row)).passType);
                        }
                    },*/
                    {
                        "fieldName": "birthday",
                        "fieldTitle": _i18n("Tit25")
                    },
                    {
                        "fieldName": "idType",
                        "fieldTitle": _i18n("Tit24"),
                        "renderFun": function (val) {
                            return (new IDType(val)).name;
                        }
                    },
                    {
                        "fieldName": "idNo",
                        "fieldTitle": _i18n("Tit23")
                    },
                    {
                        "fieldName": "mobile",
                        "fieldTitle": _i18n("Adr08")
                    },
                    {
                        "fieldName": "email",
                        "fieldTitle": _i18n("Adr11")
                    },
                    {
                        "fieldTitle": _i18n("Adr12"),
                        "renderFun": function (val) {
                            return createOperationEl("passenger");
                        }
                    }
                ],
                "beforeFun": function () {
                    $(".hnaui-edit-panel").hide();
                }
            };
            _dPassengerPaging = HNAPag.initPaging(config1);

            var config2 = {
                "searchForm": 'iPassengerForm',//搜索的表单
                "searchResult": "iPassenger", //展示的位置
                "url": ajaxUrl.getPassengerInfo,//ajax地址
                "pageSize": _pageSize,//   默认每页显示多少
                "searchInit": true,
                "columns": [
                    {
                        "fieldTitle": _i18n("Adr02"),
                        "dom": "seq"
                    },
                    {
                        "fieldName": "firstName",
                        "fieldTitle": _i18n("Adr18"),
                        "renderFun": function (val, row) {
                            return (new Traveller(row)).fullName;
                        }
                    },
                    {
                        "fieldName": "sex",
                        "fieldTitle": _i18n("Adr22"),
                        "renderFun": function (val) {
                            return _filterSexType((new Sex(val)).code);
                        }
                    },
                   /* {
                        "fieldName": "passType",
                        "fieldTitle": _i18n("Adr16"),
                        "renderFun": function (val, row) {
                            return _filterPassType((new Traveller(row)).passType);
                        }
                    },*/
                    {
                        "fieldName": "birthday",
                        "fieldTitle": _i18n("Tit25")
                    },
                    //{
                    //    "fieldName": "idType",
                    //    "fieldTitle": _i18n("Tit24"),
                    //    "renderFun": function (val) {
                    //        return (new IDType(val)).name;
                    //    }
                    //},

                    {
                        "fieldName": "country",
                        "fieldTitle": _i18n("Adr17"),
                        "renderFun": function (val) {
                            return _filterCountryCode(val);
                        }
                    },
                    {
                        "fieldName": "idNo",
                        "fieldTitle": _i18n("Adr19")
                    },
                    {
                        "fieldName": "cardIssueCountry",
                        "fieldTitle": _i18n("Adr20"),
                        "renderFun": function (val) {
                            return _filterCountryCode(val);
                        }
                    },
                    {
                        "fieldName": "cardValidDate",
                        "fieldTitle": _i18n("Adr21")
                    },
                    {
                        "fieldName": "mobile",
                        "fieldTitle": _i18n("Adr08")
                    },
                    {
                        "fieldTitle": _i18n("Adr12"),
                        "renderFun": function (val) {
                            return createOperationEl("passenger");
                        }
                    }
                ],
                "beforeFun": function () {
                    $(".hnaui-edit-panel").hide();
                }
            };
            _iPassengerPaging = HNAPag.initPaging(config2);
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

//创建乘机人明细面板  新增或者修改乘机人
function createPassengerDetailPanel(info) {
    try {
        var passenger = new Traveller(info || {"countryType": _currentCountryType});
        var typeStr = _i18n("Tit32");
        if (passenger.countryType == "1") {
            typeStr = _i18n("Tit31");
        }
        var defaultTitle = _i18n("Ed01") + typeStr + _i18n("Tit33");
        var defaultCla = "add-passenger-panel";
        if (passenger.id) {
            defaultTitle = _i18n("Ed02") + typeStr + _i18n("Tit30");
            defaultCla = "update-passenger-panel";
        }

        var o = {};
        for (var key in passenger) {
            if (passenger.hasOwnProperty(key)) {
                o[key] = {"eleType": key, "value": passenger[key]};
            }
        }
        //o.mobile.required = false;
        o.phone.required = false;
        o.email.required = false;
        o.birthday.showIcon = true;
        if (o.idType.value == "ID_CARD") {
            o.birthday.readonly = true;
        }
        o.passType.readonly = true;
        o.cardValidDate.showIcon = true;

        var objPlaceholder = getInputPlaceholderByIdNo(o.idType.value);
        o.firstName.placeholder = objPlaceholder.firstNamePlaceholder;
        o.lastName.placeholder = objPlaceholder.lastNamePlaceholder;
        o.idNo.placeholder = objPlaceholder.idNoPlaceholder;

        //国家码和手机号码绑定
        o.mobile.mobilePreV = passenger.mobilePre;

        var htmlEl = createEditPanelEl({
            "type": "passenger",
            "title": defaultTitle,
            "icon": "&#xe642;",
            "classStr": defaultCla,
            "createHtmlFun": function () {
                var html =setUserMenuLeftEl(this);
                html += '       <form class="row ' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + ' passenger-info-form">';
                html += createHiddenInputUm(o.id);
                html += createHiddenInputUm(o.userId);
                html += createHiddenInputUm(o.countryType);
                if (passenger.countryType == "0") {
                    html += createInputElUm(o.lastName);
                    html += createInputElUm(o.firstName);
                    html += createSelectElUm(o.idType);
                    html += createInputElUm(o.idNo);
                    html += createInputElUm(o.birthday);
                    // html += createSelectElUm(o.passType);
                    html += createInputElUm(o.mobile);
                    html += createInputElUm(o.phone);
                    html += createInputElUm(o.email);
                } else {
                    html += createInputElUm(o.lastName);
                    html += createInputElUm(o.firstName);
                    html += createRadioElUm(o.sex);
                    o.birthday.readonly = false;
                    html += createInputElUm(o.birthday);
                    // html += createSelectElUm(o.passType);
                    html += createSelectElUm(o.country);
                    html += createSelectElUm(o.cardIssueCountry);
                    o.cardNo.value = o.idNo.value;
                    html += createInputElUm(o.cardNo);
                    html += createInputElUm(o.cardValidDate);
                    html += createInputElUm(o.mobile);
                }
                html += createSubmitBtnElUm("passengerInfoForm");
                html += '           </form>';
                return html;
            }
        });

        $(".hnaui-edit-panel").remove();
        $(".search-result").append(htmlEl);
        renderFrom();
        initElement();
        initCountryData(passenger);
        initMobilePreData();
    } catch (e) {
        JsErrorTips(e);
    }
}


//删除乘机人
function deletePassengerInfo(info) {
    deleteRecord(ajaxUrl.deletePassenger, info, function () {
        if (info.countryType == "0") {
            _dPassengerPaging.refresh();
        } else {
            _iPassengerPaging.refresh();
        }
    });
}

function updatePassengerInfo(data) {
    var url = ajaxUrl.addPassenger;
    if (data && data.id) {
        url = ajaxUrl.updatePassenger;
    }
    var passengerInfo = new Traveller(data);
    updateRecord(url, passengerInfo, function () {
        if (data.countryType == "0") {
            _dPassengerPaging.refresh();
        } else {
            _iPassengerPaging.refresh();
        }
    });
}


//初始化国籍和护照签发国的数据
function initCountryData(info) {
    try {
        if (!info) {
            info = {};
        }
        hna.jsData.getCountryData(function (data) {
            var countryData = data.data;
            (countryData || []).forEach(function (item) {
                if(item.name.indexOf(item.name_en) <= -1){
                    item.name += ("（" + item.name_en + "）");
                }
            });
            renderSelectUm({"eleType": "country", "value": info.country, "dataArr": countryData});
            renderSelectUm({
                "eleType": "cardIssueCountry",
                "value": info.cardIssueCountry,
                "dataArr": countryData
            });
            if (globalFrom) {
                globalFrom.render("select");
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}