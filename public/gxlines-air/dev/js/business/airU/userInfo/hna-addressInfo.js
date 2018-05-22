hna._i18nMap.addLanguages({
    "AI01": {"zh_CN": "收件人姓名由2到30个全汉字或者1到60个全字母组成", "en_US": "Flight number"}
});
var ajaxUrl = window.ajaxUrl || {};
ajaxUrl.getMailAddressInfo = "/airU/userInfo/getMailAddressInfo";
ajaxUrl.addMailAddress = "/airU/userInfo/addMailAddress";
ajaxUrl.updateMailAddress = "/airU/userInfo/updateMailAddress";
ajaxUrl.deleteMailAddress = "/airU/userInfo/deleteMailAddress";

var _fromListUm = window._fromListUm || [];
_fromListUm.push({
    //提交邮寄地址
    "type": "addressInfoForm",
    "fromCla": "address-info-form",
    "callback": updateAddressInfo
});

//创建邮寄地址面板
function createAddressInfoPanel(flag) {
    try {
        var htmlEl = createUserPanelEl({
            "type": "address", "title": _i18n("Adr01"), "icon": "&#xe62e;", "dataArr": [
                {
                    "title": "",
                    "createHtmlFun": function () {
                        var html = '<form class="' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + '" id="uAddressForm">';
                        html += createHiddenInputUm({"eleType": "userId", "value": _userId});
                        html += '   </form>';
                        html += '   <div class="uAddress"></div>';
                        return html;
                    }
                }
            ]
        });
        $(".search-result").html(htmlEl).show();

        var config = {
            "searchForm": 'uAddressForm',
            "searchResult": "uAddress",
            "url": ajaxUrl.getMailAddressInfo,
            "pageSize": _pageSize,
            "searchInit": true,
            "columns": [
                {
                    "fieldTitle": _i18n("Adr02"),
                    "dom": "seq"
                },
                {
                    "fieldName": "receiveName",
                    "fieldTitle": _i18n("Adr03")
                },
                {
                    "fieldName": "province",
                    "fieldTitle": _i18n("Adr04")
                },
                {
                    "fieldName": "city",
                    "fieldTitle": _i18n("Adr05")
                },
                {
                    "fieldName": "county",
                    "fieldTitle": _i18n("Adr06")
                },
                {
                    "fieldName": "address",
                    "fieldTitle": _i18n("Adr07")
                },
                {
                    "fieldName": "mobile",
                    "fieldTitle": _i18n("Adr08")
                },
                {
                    "fieldName": "phone",
                    "fieldTitle": _i18n("Adr09")
                },
                {
                    "fieldName": "postCode",
                    "fieldTitle": _i18n("Adr10")
                },
                {
                    "fieldName": "email",
                    "fieldTitle": _i18n("Adr11")
                },
                {
                    "fieldTitle": _i18n("Adr12"),
                    "renderFun": function (val) {
                        return createOperationEl("address");
                    }
                }
            ],
            "beforeFun": function () {
                $(".hnaui-edit-panel").hide();
            }
        };
        _addressPaging = HNAPag.initPaging(config);
    } catch (e) {
        JsErrorTips(e);
    }
}

//创建邮寄地址明细面板  新增或者修改地址
function createAddressDetailPanel(info) {
    try {
        var address = new AddressInfo(info || {});
        var defaultTitle = _i18n("Adr13");
        var defaultCla = "add-address-panel";
        if (address.id) {
            defaultTitle = _i18n("Adr14");
            defaultCla = "update-address-panel";
        }

        var o = {};
        for (var key in address) {
            if (address.hasOwnProperty(key)) {
                o[key] = {"eleType": key, "value": address[key]};
            }
        }
        o.receiveName.placeholder = _i18n("AI01");
        o.postCode.required = false;
        o.phone.required = false;
        o.email.required = false;

        //国家码和手机号码绑定1
        o.mobile.mobilePreV = address.mobilePre;

        var htmlEl = createEditPanelEl({
            "type": "address",
            "title": defaultTitle,
            "icon": "&#xe642;",
            "classStr": defaultCla,
            "createHtmlFun": function () {
                var html =setUserMenuLeftEl(this);
                html += '       <form class="row ' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + ' address-info-form">';
                html += createHiddenInputUm(o.id);
                html += createHiddenInputUm(o.userId);
                html += createInputElUm(o.receiveName);
                html += createSelectElUm(o.province);
                html += createSelectElUm(o.city);
                html += createSelectElUm(o.county);
                html += createInputElUm(o.address);
                html += createInputElUm(o.postCode);
                html += createInputElUm(o.mobile);
                html += createInputElUm(o.phone);
                html += createInputElUm(o.email);
                html += createSubmitBtnElUm("addressInfoForm");
                html += '           </form>';
                return html;
            }
        });

        $(".hnaui-edit-panel").remove();
        $(".search-result").append(htmlEl);
        renderFrom();
        initMobilePreData();

        hna.initProvince({"data": address, "renderFun": renderSelectUm});
    } catch (e) {
        JsErrorTips(e);
    }
}

//删除邮寄地址
function deleteAddressInfo(info) {
    deleteRecord(ajaxUrl.deleteMailAddress, info, function () {
        _addressPaging.refresh();
    });
}
function updateAddressInfo(data) {
    var url = ajaxUrl.addMailAddress;
    if (data && data.id) {
        url = ajaxUrl.updateMailAddress;
    }
    var addressInfo = new AddressInfo(data);
    updateRecord(url, addressInfo, function () {
        _addressPaging.refresh();
    });
}