hna._i18nMap.addLanguages({
    //placeholeder
    "orderCode-placeholder": {"zh_CN": "请输入订单号", "en": "Please enter order number"},
    "phoneNumber-placeholder": {"zh_CN": "请输入手机号", "en": "Please enter phone number"},
    "verifyCode-placeholder": {"zh_CN": "请输入动态口令", "en": "Please enter verification code"},

    //错误提示
    "orderCode-errorTip": {"zh_CN": "您输入的订单编号格式错误！", "en": ""},
    "mobile-errorTip": {"zh_CN": "您输入的电话号码格式错误！", "en": ""},
    "valiCode-errorTip": {"zh_CN": "您输入的动态口令格式错误！", "en": ""},

    //空提示
    "orderCode-blank": {"zh_CN": "订单号不能为空！", "en": ""},
    "mobile-blank": {"zh_CN": "手机号不能为空！", "en": ""},
    "mmb-blank": {"zh_CN": "请先拖动滑块，完成拼图", "en": ""},
    "valiCode-blank": {"zh_CN": "动态口令不能为空！", "en": ""},

    //title
    "orderCode": {"zh_CN": "订单号", "en": "order number"},
    "mobile": {"zh_CN": "手机号", "en": "moblie number"},
    "valiCode": {"zh_CN": "动态口令", "en": "valiCode"},

    "Pho01": {"zh_CN": "请输入可用的手机号码", "en_US": "Flight number"}


});

var ajaxUrl = {
    "sendMessage": "/airU/userInfo/sendMessage",
    "searchOtaOrder":"/order/searchOtaOrder"
};
var inputList = [
    {
        "name": "orderCode",    //订单号
        "tips": _i18n("orderCode"),
        "reg": /^([\d]){10}$/,
        "maxLen": 10,
        "errorTips": _i18n("orderCode-errorTip"),
        "blankTips": _i18n("orderCode-blank"),
        "placeholder": _i18n("orderCode-placeholder")
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
        "name": "mmvCode",  //人机验证
        "tips": _i18n("B12"),
        "errorTips": _i18n(""),
        "blankTips": _i18n("mmb-blank")
    },
    {
        "name": "valiCode",   //动态口令
        "tips": _i18n("valiCode"),
        "reg": /^[\da-zA-Z]{6}$/,
        "maxLen": 6,
        "errorTips": _i18n("valiCode-errorTip"),
        "blankTips": _i18n("valiCode-blank"),
        "placeholder": _i18n("verifyCode-placeholder")
    }
];
var Templates = {
    /*jshint multistr: true */
    //面板
    panel: '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-input" >\
                {3}\
                <div class="hnaui-form-item">{0}{1}{2}</div>\
             </div>',
    //标题
    title: '<label class="hnaui-form-label">\
                 <span class="hnaui-required">*&nbsp;</span>\
                {0}\
            </label>',
    //输入框
    input: '<div class="hnaui-input-block {4}">\
                 <input type="text" name="{0}" autocomplete="off" class="hnaui-input {0}" value maxlength="{1}" hna-required="Y" placeholder="{2}">\
                 {3}\
         </div>',

    //动态口令
    a: '<a class="hnaui-btn hnaui-btn-small hnaui-verifybtn">发送动态口令</a>',

    //提示
    tip: '<div class="hnaui-warning bounceInRight">\
             <i class="hnaui-icon"></i>\
            <span class="error-tips"></span>\
         </div>',

    //手机号国别码
    mobilePre: '<div class="hnaui-mobile-pre"></div>',

    button: '<div class="search-submit hnaui-clear">\
                 <a class="hnaui-btn hnaui-btn-theme hnaui-btn-model" hna-filter="searchOrder">\
                  <i class="hnaui-icon">&#xe615;</i>\
                  查询\
             </a>\
         </div>'
};

var Renders = {

    //面板渲染
    panel: function (title, name, length, placeholder) {
        if (name == "mobile") {
            return Templates.panel.format(this.title(title), this.input(name, length, placeholder), this.tip(), this.mobilePre());
        } else {
            return Templates.panel.format(this.title(title), this.input(name, length, placeholder), this.tip(), "");
        }
    },

    title: function (title) {
        return Templates.title.format(title);
    },

    input: function (name, length, placeholder) {
        if (name == "valiCode") {
            return Templates.input.format(name, length, placeholder, Templates.a, "");
        } else if (name == "mobile") {
            return Templates.input.format(name, length, placeholder, "", "hnaui-mobile-next");
        } else {
            return Templates.input.format(name, length, placeholder, "", "");
        }
    },

    tip: function () {
        return Templates.tip;
    },

    mobilePre: function () {
        if(hna.hasMobilePre){
            return Templates.mobilePre;
        }else{
            return "";
        }
    }

};

$(function () {
    createSearchOrderEl();   //面板

    renderFrom();
    initElement();

    selectType();
    blurVerify();    //校验

    hna.filterForm();
    hna.goToTop("1");

    $(".hnaui-warning").on("click", ".hnaui-icon", function () {
        $(this).parent().hide();
    });
});

var _currentMobile = "";
function createSearchOrderEl() {
    var html = "";
    for (var i = 0, i1 = inputList.length; i < i1; i++) {
        if (i == 2) {
            html += createMMVeL("hna_moveReg_mobile");
        } else {
            html += Renders.panel(inputList[i].tips, inputList[i].name, inputList[i].maxLen, inputList[i].placeholder);
        }
    }
    html += Templates.button;
    $(".searchOrder-form").html(html);

    initMobilePreData();

    $(".search-loading").hide();

    //人机验证及动态口令
    _currentMobile = $(".searchOrder-form").find("input[name='mobile']").val();

    resetMmvEl();
    resetVerifyEl();

}

//切换下拉框类型
function selectType() {
    globalFrom.on("select(PmobilePre)", function (data) {
        var $tip = $("input[name='mobile']").parent().next();
        $("input[name='mobile']").val("");
        $("input[name='mobile']").attr("isavailable", "N");
        $tip.hide();
        if (data.value == "86") {
            inputList[1].reg = /^1[3|4|5|7|8]\d{9}$/;
        } else {
            inputList[1].reg = /^[\d]{1,11}$/;
        }
    });
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
                    if (i == 2) {
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
            }

        });
        //点击查询校验
        $(".search-submit").on("click", ".hnaui-btn", function (e) {
            e.stopPropagation();
            hna.goToTop("1");
            var inputs = $(".searchOrder-form input[name]");
            var flag = true;
            for (var i = 0, i1 = inputs.length; i < i1; i++) {
                var inputV = $(inputs[i]).val();
                var isavailable = $(inputs[i]).attr("isavailable");
                if (isavailable != "Y") {
                    flag = false;
                    if (!inputV) {
                        layerOpen(inputList[i].blankTips);
                        break;
                    } else {
                        layerOpen(inputList[i].errorTips);
                        break;
                    }
                }
            }
            if (flag) {
                hna.loading();
                var o = {
                    mobile:$(inputs[1]).val(),
                    mobilePre:$(".searchOrder-form input.hnaui-unselect").val()
                };
                var obj = {};
                obj.orderCode = $(inputs[0]).val();
                obj.valiCode = $(inputs[3]).val();
                obj.mobile = new Mobile(o).mobile;

                hna.ajax({
                    url: ajaxUrl.searchOtaOrder,
                    data: obj,
                    doneCallback: function (res) {
                        if (res.code == "200" && res.data.status == "success") {
                            goToPage("/airEye/order/orderDetail?orderCode=" + hna.compile(obj.orderCode) + "&otaID=" + (res.data.otaID || ""));

                        } else {
                            _showMsg(res.data.message);
                            resetMmvVerifyEl();
                        }
                    },
                    failCallback: function (res) {
                        //查询失败重置人机验证及口令
                        resetMmvVerifyEl();
                        layerOpen("查询失败！");
                    }
                });
            }

        });

    } catch (e) {
        JsErrorTips(e);
    }

}

//查询失败，重置人机验证和发送动态口令
function resetMmvVerifyEl() {
    resetMmvEl("html");
    resetVerifyEl("html");
    renderFrom();
}


function getMobileValue(thisP){
    return (new Mobile({
        "mobile":thisP.val(),
        "mobilePre": thisP.parents(".p-panel").find("select[name='mobilePre']").val()
    })).mobile;
}

//动态口令
function resetVerifyEl(ele) {
    if(ele){
        var html = Renders.panel(inputList[3].tips, inputList[3].name, inputList[3].maxLen, inputList[3].placeholder);
        $(".hnaui-verifybtn").parents(".p-input").replaceWith(html);
    }

    var $mobile = $(".searchOrder-form").find("input[name='mobile']");
    var $mmvCode = $(".searchOrder-form").find("input[name='mmvCode']");
    $(".searchOrder-form .hnaui-verifybtn").VerificationCode({
        "url": ajaxUrl.sendMessage,
        "getData": function () {
            return {
                "mobile": getMobileValue($mobile),
                "mmvCode": $mmvCode.val() || ""
            };
        },
        "verifyElem": [
            {
                "elem": $mobile,
                "tips": _i18n("Pho01")
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

//人机验证
function resetMmvEl(ele) {
    if(ele){
        var html = createMMVeL("hna_moveReg_mobile");
        $(".p-mmv").parent().replaceWith(html);
    }
    HNAmoveReg.eventInit({
        "id": "hna_moveReg_mobile",
        "successMsg": _i18n("B13"),
        "callback": function (data) {
            $(".searchOrder-form").find("input[name='mmvCode']").val(data || "").attr("isavailable", "Y");
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

//弹出层
function layerOpen(content) {
    hnaer.open({
        title: _i18n("prompt"),
        content: content,
        icon: 0,
        area: "500px",
        yes: function () {
            hnaer.closeAll();
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