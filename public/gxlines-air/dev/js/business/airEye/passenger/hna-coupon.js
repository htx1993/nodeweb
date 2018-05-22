hna._i18nMap.addLanguages({
    "CP01": {"zh_CN": "使用优惠券", "en_US": ""},
    "CP02": {"zh_CN": "提示： 优惠券每张订单仅限使用一张优惠券，且一经使用概不退换，退票将会造成原优惠券作废，请旅客确定行程后谨慎使用。", "en_US": ""},
    "CP03": {"zh_CN": "确认使用", "en_US": "1"},
    "CP05": {"zh_CN": "优惠券不能为空", "en_US": ""},
    "CP06": {"zh_CN": "您输入的优惠券格式错误！", "en_US": ""}
});
var _couponList = [];
var _mmvID = "hna_moveReg_coupon";
function getCouponList() {
    if (!couponHas) {
        return false;
    }
    hna.ajax({
        url: ajaxUrl.getCouponList,
        doneCallback: function (data) {
            if (data && data.code == 200 && data.data && hna.isArray(data.data.data)) {
                (data.data.data || []).forEach(function (item) {
                    if (item.status == 0) {
                        _couponList.push({
                            "code": item.couponCode,
                            "name": item.activityName
                        });
                    }
                });
            }
            createCoupon();
        }
    });
}
//创建优惠券面板1
function createCoupon() {
    var html = '<div class="hnaui-panel hnaui-shadow coupon-panel hnaui-clear hnaui-coupon">';
    html += '   <div class="hnaui-panel-title"><i class="hnaui-icon">&#xe92e;</i>' + _i18n("CP01") + '</div>';
    html += '   <div class="hnaui-coupon-input">';
    html += createInputEl({"eleType": "coupon", "value": "", "required": false});
    html += '   </div>';
    if (_couponList.length > 0) {
        html += '   <dl class="hnaui-anim hnaui-anim-upbit hnaui-selectbox hnaui-shadow col-xs-12 col-sm-12 col-md-4 col-lg-4">';
        _couponList.forEach(function (item) {
            html += '     <dd data-code="' + (item.code || "") + '">' + (item.name) + '（' + item.code + '）</dd>';
        });
        html += '  </dl>';
    }
    html += '   <div class="coupon-mmv col-xs-12 col-sm-12 col-md-5 col-lg-5"></div>';
    html += '   <div class="hnaui-btn hnaui-coupon-btn hnaui-btn-theme submit-coupon click-btn col-xs-12 col-sm-12 col-md-3 col-lg-3">' + _i18n("CP03") + '</div>';
    html += '       <p class="hnaui-clear msgtext">' + _i18n("CP02") + '</p>';
    html += getSearchLoadingEl();
    html += '</div>';

    $("#couponPanel").replaceWith(html).show();
    initCouponMMVEl();

    renderFrom();
}

//创建人机验证El
function createMMVeL() {
    var html = '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 input-icon">';
    html += '       <div class="hnaui-form-item p-mmv">';
    //html += '           <label class="hnaui-form-label">人机验证</label>';
    html += '           <input type="hidden" name="mmvCode" hna-verify="PmmvCode" hna-required="N" isavailable="N">';
    html += '           <div id="' + _mmvID + '" class="hna-mmv">';
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
function initCouponMMVEl() {
    $(".coupon-mmv").html(createMMVeL());
    HNAmoveReg.eventInit({
        "id": _mmvID,
        "successMsg": _i18n("B13"),
        "callback": function (data) {
            $(".coupon-panel").find("input[name='mmvCode']").val(data || "");
        }
    });
}


//点击input窗面板toggle
$(document).on('click', ".hnaui-coupon input", function () {
    if ($(this).attr("readonly") != "readonly") {
        $(".hnaui-coupon").find("dl").toggle();
    }
});

//点击面板每行 面板收起来 并把值传给input
$(document).on('click', ".hnaui-coupon dd", function () {
    var $coupon = $(".hnaui-coupon");
    $coupon.find(".hnaui-input-inline").addClass("hnaui-input-active");
    $coupon.find("input[name='coupon']").val($(this).data("code"));
    $coupon.find("dl").hide();
});

//点击其他地方 面板收起来
$(document).on('click', function (e) {
    e.stopPropagation();
    var $this = $(e.target);
    if ($this.closest(".hnaui-coupon-input").length <= 0) {
        $(".hnaui-coupon").find("dl").hide();
    }

});


//点击确认使用按钮 对优惠券进行校验
function useCoupon() {
    var $couponPanel = $(".coupon-panel");
    var couponCode = $couponPanel.find("input[name='coupon']").val();
    if (!couponCode) {
        _showValidationTips(_i18n("CP05"));
        return false;
    }
    var couponReg = hna.regex.coupon;
    if (couponReg && !((new RegExp(couponReg)).test(couponCode))) {
        _showValidationTips(_i18n("CP06"));
        return false;
    }
    var mmvCode = $couponPanel.find("input[name='mmvCode']").val();
    if (!mmvCode) {
        _showValidationTips(_i18n("B14"));
        return false;
    }

    toggleCouponLoading(true);
    hna.ajax({
        url: ajaxUrl.useCoupon,
        data: {
            "couponCode": couponCode,
            "mmvCode": mmvCode
        },
        doneCallback: function (data) {
            if (data && data.code == 200 && data.data.status == 'success') {
                $(".hnaui-coupon input").attr('readonly', 'readonly');
                $(".hnaui-coupon-btn").hide();
                $(".coupon-mmv").hide();
                toggleCouponLoading(false);
            } else {
                _showMsg(data.data.message);
                initCouponMMVEl();
            }
        }
    });
}

function toggleCouponLoading(flag) {
    $(".coupon-panel .search-loading").toggle(flag);
}
