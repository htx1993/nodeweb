hna._i18nMap.addLanguages({
    "VC01": {"zh_CN": "数据加载中...", "en_US": ""},
    "VC02": {"zh_CN": "用户名", "en_US": ""},
    "VC03": {"zh_CN": "只能输入字母和数字，以字母开头，长度为6-20位", "en_US": ""},
    "VC04": {"zh_CN": "用户名或手机号", "en_US": ""},
    "VC05": {"zh_CN": "姓名", "en_US": ""},
    "VC06": {"zh_CN": "证件号码", "en_US": ""},
    "VC07": {"zh_CN": "护照号码", "en_US": ""},
    "VC08": {"zh_CN": "出生日期", "en_US": ""},
    "VC09": {"zh_CN": "格式：1980-01-01", "en_US": ""},
    "VC10": {"zh_CN": "护照有效期", "en_US": ""},
    "VC11": {"zh_CN": "固定电话", "en_US": ""},
    "VC12": {"zh_CN": "格式：010-88888888", "en_US": ""},
    "VC13": {"zh_CN": "手机号码", "en_US": ""},
    "VC14": {"zh_CN": "邮箱", "en_US": ""},
    "VC15": {"zh_CN": "格式：abc@hnair.com", "en_US": ""},
    "VC16": {"zh_CN": "详细地址", "en_US": ""},
    "VC17": {"zh_CN": "邮政编码", "en_US": ""},
    "VC18": {"zh_CN": "格式：450000", "en_US": ""},
    "VC19": {"zh_CN": "密码", "en_US": ""},
    "VC20": {"zh_CN": "必须是数字和字母组合，不能少于6位", "en_US": ""},
    "VC21": {"zh_CN": "确认密码", "en_US": ""},
    "VC22": {"zh_CN": "密保问题", "en_US": ""},
    "VC23": {"zh_CN": "你的答案", "en_US": ""},
    "VC24": {"zh_CN": "动态口令", "en_US": ""},
    "VC25": {"zh_CN": "航班号", "en_US": ""},
    "VC26": {"zh_CN": "格式：" + hna._code + "6288", "en_US": ""},
    "VC27": {"zh_CN": "机票编号", "en_US": ""},
    "VC28": {"zh_CN": "格式：886-2102803044", "en_US": ""},
    "VC29": {"zh_CN": "订单编号", "en_US": ""},
    "VC30": {"zh_CN": "格式：0004921000", "en_US": ""},
    "VC33": {"zh_CN": "优惠券", "en_US": ""},
    "VC34": {"zh_CN": "证件类型", "en_US": ""},
    "VC35": {"zh_CN": "性别", "en_US": ""},
    "VC36": {"zh_CN": "国籍", "en_US": ""},
    "VC37": {"zh_CN": "护照签发国", "en_US": ""},
    "VC38": {"zh_CN": "省份", "en_US": ""},
    "VC39": {"zh_CN": "市区", "en_US": ""},
    "VC40": {"zh_CN": "县区", "en_US": ""},
    "VC41": {"zh_CN": "不能为空！", "en_US": ""},
    "VC42": {"zh_CN": "您输入的{0}格式错误！", "en_US": ""},
    "VC43": {"zh_CN": "两次密码输入不一致！", "en_US": ""},
    "VC44": {"zh_CN": "新密码不能和原密码相同！", "en_US": ""},
    "VC45": {"zh_CN": "收件人", "en_US": ""}


});
//国籍的数据
var _defaultSelectData = [
    {
        "code": "",
        "name": _i18n("VC01")
    }
];

var _verificationElemList = [
    {
        "type": "PuserName",
        "title": _i18n("VC02"),
        "reg": hna.regex.userName,
        "verifyFun": _verificationElem,
        "maxLen": 30,
        "icon": "&#xe911;",
        "errorTips": _i18n("VC03")
    },
    {
        "type": "PuserNameOrMobile",
        "title": _i18n("VC02"),
        "reg": hna.regex.userNameOrMobile,
        "verifyFun": _verificationElem,
        "maxLen": 30,
        "icon": "&#xe911;"
    },
    {
        "type": "PreceiveName",
        "title": _i18n("VC45"),
        "verifyFun": _verificationElem,
        "reg": hna.regex.receiveNameReg,
        "maxLen": 60,
        "icon": "&#xe612;"
    },
    {
        "type": "Pname",
        "title": _i18n("VC05"),
        "verifyFun": window.VerificationName,
        "maxLen": 30,
        "icon": "&#xe612;"
    },
    {
        "type": "PidNo",
        "title": _i18n("VC06"),
        "verifyFun": window.VerificationIdNo,
        "maxLen": 30,
        "icon": "&#xe600;"
    },
    {
        "type": "PcardNo",
        "title": _i18n("VC07"),
        "reg": hna.regex.cardNo,
        "verifyFun": _verificationElem,
        "maxLen": 30,
        "icon": "&#xe600;"
    },
    {
        "type": "Pbirthday",
        "title": _i18n("VC08"),
        //"reg":hna.regex.date,
        "verifyFun": _verificationElem,
        "maxLen": 11,
        "icon": "&#xe637;",
        "format": _i18n("VC09")
    },
    {
        "type": "PcardValidDate",
        "title": _i18n("VC10"),
        //"reg":hna.regex.date,
        "verifyFun": _verificationElem,
        "maxLen": 11,
        "icon": "&#xe637;",
        "format": _i18n("VC09")
    },
    {
        "type": "Pphone",
        "title": _i18n("VC11"),
        "reg": hna.regex.phone,
        "verifyFun": _verificationElem,
        "maxLen": 13,
        "icon": "&#xe63b;",
        "format": _i18n("VC12")
    },
    {
        "type": "Pmobile",
        "title": _i18n("VC13"),
        "reg": hna.regex.mobile,
        "verifyFun": _verificationElem,
        "maxLen": 11,
        "icon": "&#xe63b;"
    },
    {
        "type": "Pemail",
        "title": _i18n("VC14"),
        "reg": hna.regex.email,
        "verifyFun": _verificationElem,
        "maxLen": 50,
        "icon": "&#xe907;"
    },
    {
        "type": "Paddress",
        "title": _i18n("VC16"),
        "reg": hna.regex.address,
        "verifyFun": _verificationElem,
        "maxLen": 100,
        "icon": "&#xe90b;"
    },
    {
        "type": "PpostCode",
        "title": _i18n("VC17"),
        "reg": hna.regex.postcode,
        "verifyFun": _verificationElem,
        "maxLen": 6,
        "icon": "&#xe600;",
        "format": _i18n("VC18")
    },
    {
        "type": "PpasswordLogin",
        "title": _i18n("VC19"),
        "verifyFun": _verificationElem,
        "maxLen": 50,
        "icon": "&#xe908;"
    },
    {
        "type": "Ppassword",
        "title": _i18n("VC19"),
        "reg": hna.regex.password,
        "verifyFun": _verificationElem,
        "maxLen": 20,
        "icon": "&#xe908;",
        "errorTips": _i18n("VC20")
    },
    {
        "type": "Ppassword_re",
        "title": _i18n("VC21"),
        "reg": hna.regex.password,
        "verifyFun": _verificationElem,
        "maxLen": 20,
        "icon": "&#xe908;",
        "errorTips": _i18n("VC20")
    },
    {
        "type": "Pquestion",
        "title": _i18n("VC22"),
        "reg": hna.regex.question,
        "verifyFun": _verificationElem,
        "maxLen": 30,
        "icon": "&#xe914;"
    },
    {
        "type": "Panswer",
        "title": _i18n("VC23"),
        "reg": hna.regex.question,
        "verifyFun": _verificationElem,
        "maxLen": 30,
        "icon": ""
    },
    {
        "type": "PvaliCode",
        "title": _i18n("VC24"),
        "reg": hna.regex.valiCode,
        "verifyFun": _verificationElem,
        "maxLen": 6,
        "icon": ""
    },
    {
        "type": "PflightNumber",
        "title": _i18n("VC25"),
        "reg": hna.regex.flightNumber,
        "verifyFun": _verificationElem,
        "maxLen": 10,
        "icon": "&#xe624;",
        "format": _i18n("VC26")
    },
    {
        "type": "PticketNo",
        "title": _i18n("VC27"),
        "reg": hna.regex.ticketNo,
        "verifyFun": _verificationElem,
        "maxLen": 14,
        "icon": "&#xe624;"
    },
    {
        "type": "PorderNo",
        "title": _i18n("VC29"),
        "reg": hna.regex.orderNo,
        "verifyFun": _verificationElem,
        "maxLen": 10,
        "icon": "&#xe624;",
        "format": _i18n("VC30")
    },
    {
        "type": "PmmvCode",
        "title": _i18n("B12"),
        "verifyFun": _verificationElem,
        "tips": _i18n("B14")
    },
    {
        "type": "Pcoupon",
        "title": _i18n("VC33"),
        "reg": hna.regex.coupon,
        "verifyFun": _verificationElem,
        "maxLen": 50,
        "icon": "&#xe625;"
    },

    {
        "type": "PidType",
        "title": _i18n("VC34"),
        "dataArr": window._idTypeList || []
    },
    {
        "type": "Psex",
        "title": _i18n("VC35"),
        "dataArr": window._sexTypeList || []
    },
    {
        "type": "Pcountry",
        "title": _i18n("VC36"),
        "dataArr": window._defaultSelectData || []
    },
    {
        "type": "PcardIssueCountry",
        "title": _i18n("VC37"),
        "dataArr": window._defaultSelectData || []
    },
    {
        "type": "Pprovince",
        "title": _i18n("VC38"),
        "dataArr": window._defaultSelectData || []
    },
    {
        "type": "Pcity",
        "title": _i18n("VC39"),
        "dataArr": window._defaultSelectData || []
    },
    {
        "type": "Pcounty",
        "title": _i18n("VC40"),
        "dataArr": window._defaultSelectData || []
    }
];

function ControlElem(info) {
    if (!info) {
        info = {};
    }
    //控件实例类型
    this.eleType = info.eleType || "";
    //控件实例验证类型
    this.verify = info.verify || "P" + info.eleType;
    if (!info.type && (this.verify == "Ppassword" || this.verify == "Ppassword_re" || this.verify == "PpasswordLogin")) {
        info.type = "password";
    }
    //控件实例文本框的类型
    this.type = info.type || "text";
    //控件实例文本框的类型
    this.name = info.name || info.eleType;
    //控件实例值
    this.value = info.value == null || info.value == undefined ? "" : info.value;
    //控件实例文本说明
    this.title = info.title || "";
    //控件实例文本最大长度
    this.maxLen = info.maxLen || 50;
    //控件实例是否显示字体图标
    this.showIcon = info.showIcon || false;
    //控件实例字体图标
    this.icon = info.icon || "";
    //控件实例下拉框数据数组
    this.dataArr = info.dataArr || [];
    //控件实例样式类
    this.classStr = info.classStr || this.eleType;
    //控件实例是否为必填项
    this.required = info.required == null || info.required == undefined ? true : info.required;
    //控件实例只读
    this.readonly = info.readonly ? 'readonly=\"readonly\"' : '';
    //控件实例placeholder的值
    this.placeholder = info.placeholder == null || info.placeholder == undefined ? "" : info.placeholder;
    //控件实例右侧的按钮
    this.rightBtn = info.rightBtn || false;
    //控件实例错误信息提示出现的方向
    this.tipsDirection = info.tipsDirection || "right";
    //控件实例唯一性校验的ajax路径
    this.uniqueUrl = info.uniqueUrl || "";

    this.passType = info.passType || "";

    this.isavailable = info.isavailable || "N";
}

function _createStandardInputEl(o, flag) {
    if (!o) {
        o = {};
    }
    var html = '<input ';
    html += ' type="' + o.type + '"';
    html += ' name="' + o.name + '"';
    html += ' autocomplete="off"';
    html += ' class="hnaui-input ' + o.classStr + '"';
    html += ' value="' + o.value + '"';
    html += ' maxlength="' + o.maxLen + '"';
    html += ' hna-required="' + (o.required ? "Y" : "N") + '"';
    html += ' hna-verify="' + o.verify + '"';

    html += ' ' + o.readonly;
    if (flag) {
        html += ' hna-title="' + o.title + '"';
        html += ' hna-placeholder="' + o.placeholder + '"';
        html += ' hna-icon="' + o.icon + '"';
    } else {
        html += ' hna-uniqueUrl="' + o.uniqueUrl + '"';
        html += ' isavailable="' + (o.readonly || o.isavailable == "Y" ? "Y" : "N") + '"';
        html += ' placeholder="' + o.placeholder + '"';
    }
    html += '>';
    return html;
}

function _verificationElem(o) {
    try {
        if (!o) {
            o = {};
        }
        if (!o.typeInfo) {
            o.typeInfo = {};
        }
        var thisP = o.elem instanceof $ ? o.elem : $(o.elem);
        var thisV = (thisP.val() || "").trim();
        thisP.val(thisV);
        var thisRequired = thisP.attr("hna-required");

        //验证提示语
        var returnTips = "";

        if (!thisV) {
            if (o.flag == "submit") {
                if (thisRequired == "Y") {
                    var len = thisP.parents(".update-password-form").length;
                    var thisName = thisP.attr("name");
                    if (len > 0 && thisName == "oldPassword") {
                        o.typeInfo.title = "原密码";
                    } else if (len > 0 && thisName == "password") {
                        o.typeInfo.title = "新密码";
                    } else if (len > 0 && thisName == "password_re") {
                        o.typeInfo.title = "确认密码";
                    }

                    returnTips = o.typeInfo.tips || o.typeInfo.title + _i18n("VC41");
                }
            } else {
                returnTips = "null";
            }
            thisP.attr("isavailable", thisRequired == "Y" ? "N" : "Y");
        } else {
            var thisVerify = thisP.attr("hna-verify");
            var $parents = thisP.parents("form.hnaui-form");
            var $thisM = thisP.parents(".p-panel");
            var reg = o.typeInfo.reg;

            //如果不是中国的手机号码，更换reg
            if (hna.hasMobilePre) {
                var mobilePreV = $thisM.find(".hnaui-mobile-pre select").val();
                if (thisVerify == "Pmobile" && mobilePreV != "86") {
                    reg = hna.regex.mobilePre;
                }
            }

            if (reg && !((new RegExp(reg)).test(thisV))) {
                returnTips = o.typeInfo.errorTips || _i18n("VC42", o.typeInfo.title);
            } else {
                if (thisVerify == "Ppassword_re") {
                    //判断确认密码和密码是否一致
                    var passwordV = thisP.parents(".p-panel").find("input[name='password']").val() || "";
                    if (passwordV != thisV) {
                        returnTips = _i18n("VC43");
                    }
                } else if (thisVerify == "Ppassword") {
                    //判断新密码和原密码不能一致
                    var $passwordV = $parents.find("input[name='password']").val();
                    var $oldPasswordV = $parents.find("input[name='oldPassword']").val();
                    if ($passwordV && $oldPasswordV && $passwordV == $oldPasswordV) {
                        returnTips = _i18n("VC44");
                    }
                }
            }
            thisP.attr("isavailable", returnTips ? "N" : "Y");
        }
        return returnTips;
    } catch (e) {
        return JsErrorTips(e, "hnaer-no");
    }
}