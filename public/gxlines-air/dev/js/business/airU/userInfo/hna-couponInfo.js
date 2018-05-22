hna._i18nMap.addLanguages({
    "UCP01": {"zh_CN": "优惠券", "en_US": ""},
    "UCP02": {"zh_CN": "所有优惠券", "en_US": ""},
    "UCP03": {"zh_CN": "未使用优惠券", "en_US": ""},
    "UCP04": {"zh_CN": "已使用优惠券", "en_US": ""},
    "UCP05": {"zh_CN": "已过期优惠券", "en_US": ""},
    "UCP06": {"zh_CN": "优惠券号码", "en_US": ""},
    "UCP07": {"zh_CN": "面值", "en_US": ""},
    "UCP08": {"zh_CN": "消费限额", "en_US": ""},
    "UCP09": {"zh_CN": "生效日期", "en_US": ""},
    "UCP10": {"zh_CN": "失效日期", "en_US": ""},
    "UCP11": {"zh_CN": "订单编号", "en_US": ""},
    "UCP12": {"zh_CN": "优惠券使用说明", "en_US": ""},
    "UCP13": {"zh_CN": "㈠ 优惠券有效期", "en_US": ""},
    "UCP14": {"zh_CN": "账户优惠券需在1年内使用完（自优惠券下发之日起一年内），如果超过有效期没有将优惠券消费掉，则该将无法使用，并且不再追补。", "en_US": ""}
});

var ajaxUrl = window.ajaxUrl || {};
ajaxUrl.getCouponList = "/airU/userInfo/getCouponList";

function createCouponInfoPanel() {
    try {
        var htmlEl = createUserPanelEl({
            "type": "coupon", "title":_i18n("UCP01"), "icon": "&#xe92e;", "dataArr": [
                {
                    "title": _i18n("UCP02"),
                    "createHtmlFun": function () {
                        var html = '<form class="' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + '" id="allCouponForm">';
                        html += createHiddenInputUm({"eleType": "status", "value": ""});
                        html += '   </form>';
                        html += '   <div class="allCoupon"></div>';
                        return html;
                    }
                },
                {
                    "title": _i18n("UCP03"),
                    "createHtmlFun": function () {
                        var html = '<form class="' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + '" id="noUsedCouponForm">';
                        html += createHiddenInputUm({"eleType": "status", "value": "0"});
                        html += '   </form>';
                        html += '   <div class="noUsedCoupon"></div>';
                        return html;
                    }
                },
                {
                    "title": _i18n("UCP04"),
                    "createHtmlFun": function () {
                        var html = '<form class="' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + '" id="usedCouponForm">';
                        html += createHiddenInputUm({"eleType": "status", "value": "1"});
                        html += '   </form>';
                        html += '   <div class="usedCoupon"></div>';
                        return html;
                    }
                },
                {
                    "title": _i18n("UCP05"),
                    "createHtmlFun": function () {
                        var html = '<form class="' + _classList[0] + ' ' + _classList[1] + ' ' + _classList[7] + '" id="outCouponForm">';
                        html += createHiddenInputUm({"eleType": "status", "value": "2"});
                        html += '   </form>';
                        html += '   <div class="outCoupon"></div>';
                        return html;
                    }
                }
            ]
        });
        $(".search-result").html(htmlEl).show();

        initElement();
        initTabUm();

        var config1 = {
            "searchForm": 'allCouponForm',//搜索的表单
            "searchResult": "allCoupon", //展示的位置
            "url": ajaxUrl.getCouponList,//ajax地址
            "pageSize": _pageSize,//   默认每页显示多少
            "searchInit": true,
            "columns": [
                {
                    "fieldTitle": _i18n("Adr02"),
                    "dom": "seq"
                },
                {
                    "fieldName": "couponCode",
                    "fieldTitle": _i18n("UCP06"),
                    "renderFun": rendCouponCode
                },
                {
                    "fieldName": "reducePrice",
                    "fieldTitle": _i18n("UCP07")
                },
                {
                    "fieldName": "fullPrice",
                    "fieldTitle": _i18n("UCP08")
                },
                {
                    "fieldName": "validStartDate",
                    "fieldTitle": _i18n("UCP09")
                },
                {
                    "fieldName": "validEndDate",
                    "fieldTitle": _i18n("UCP10")
                },
                {
                    "fieldName": "orderCode",
                    "fieldTitle": _i18n("UCP11")
                }
            ]
        };
        _allCouponPaging = HNAPag.initPaging(config1);

        var config2 = hna.cloneObj(config1);
        config2.searchForm = "noUsedCouponForm";
        config2.searchResult = "noUsedCoupon";
        config2.columns[1].renderFun = rendCouponCode;
        _notUsedCouponPaging = HNAPag.initPaging(config2);

        var config3 = hna.cloneObj(config1);
        config3.searchForm = "usedCouponForm";
        config3.searchResult = "usedCoupon";
        config3.columns[1].renderFun = rendCouponCode;
        _usedCouponPaging = HNAPag.initPaging(config3);

        var config4 = hna.cloneObj(config1);
        config4.searchForm = "outCouponForm";
        config4.searchResult = "outCoupon";
        config4.columns[1].renderFun = rendCouponCode;
        _outCouponPaging = HNAPag.initPaging(config4);


        $(".search-result").append(couponContent());

    }catch (e){
        JsErrorTips(e);
    }
}

function couponContent() {
    var html = '<div class="hnaui-panel hnaui-shadow ">';
    html += '   <div class="hnaui-panel-title"><i class="hnaui-icon">&#xe641;</i>优惠券使用说明</div>';
    html += '   <div class="hanui-panel-content hnaui-coupon-content">';
    html += '       <p>㈠ 优惠券有效期</p>';
    html += '       <p>账户优惠券需在1年内使用完（自优惠券下发之日起一年内），如果超过有效期没有将优惠券消费掉，则该将无法使用，并且不再追补。</p>';
    html += '       <p>㈡ 优惠券的使用</p>';
    html += '       <p>';
    html += '           <span>1.会员须登录北部湾航空官网网站“我的帐户”查询优惠券数量、面值及使用规则。</span><br/>';
    html += '           <span>2.会员账户中的优惠券可在网站（www.8l-air.com）购票时进行优惠，限单人单航段进行使用，每次仅限使用一张优惠券，只可抵实收价格，不可冲抵燃油费与民航发展基金，不可兑现。</span><br/>';
    html += '           <span>3.如退票，优惠券部分不予退回，且优惠券在退票时，不可抵退票手续费。</span><br/>';
    html += '           <span>4.使用优惠券支付的客票，以客票整体金额根据相关政策收取退改手续费。</span><br/>';
    html += '       </p>';
    html += '   </div>';
    html += '</div>';

    return html;
}

//点击优惠券号码弹出
function showCouponInfo(data) {
    var html = '<ul class="hnaui-coupon-detail hnaui-clear">';
        html += '   <li>';
        html += '       <p>';
        html += '           <span>产品代码<strong>：</strong>'+data.fareFamilyCode+'</span>';
        html += '       </p>';
        html += '       <p>';
        html += '           <span>仓位<strong>：</strong>'+data.cabin+'</span>';
        html += '       </p>';
        html += '       <p>';
        html += '           <span>航班起始地<strong>：</strong>'+ getCityNameByCode(data.origin,"city") +'</span>';
        html += '       <p>';
        html += '           <span>航班目的地<strong>：</strong>'+ getCityNameByCode(data.destination,"city") +'</span>';
        html += '       </p>';
        html += '   </li>';
        html += '   <li>';
        html += '       <p>';
        html += '           <span>航班开始时间<strong>：</strong>'+hna._date.getDateInfo(data.flightStartDate + "").date + ' '+ hna._date.getDateInfo(data.flightStartDate + "").time + '</span>';
        html += '       </p>';
        html += '       <p>';
        html += '           <span>航班结束时间<strong>：</strong>'+hna._date.getDateInfo(data.flightEndDate + "").date + ' '+ hna._date.getDateInfo(data.flightEndDate + "").time + '</span>';
        html += '       </p>';
        html += '       <p>';
        html += '           <span>发券时间<strong>：</strong>'+hna._date.getDateInfo(data.sendTime + "").date +' '+ hna._date.getDateInfo(data.sendTime + "").time + '</span>';
        html += '       </p>';
        html += '       <p>';
        html += '           <span>使用时间<strong>：</strong>'+hna._date.getDateInfo(data.usedTime + "").date + ' '+ hna._date.getDateInfo(data.usedTime + "").time + '</span>';
        html += '       </p>';
        html += '   </li>';
        html += '</ul>';
    hnaer.open({
        title:'优惠券详情',
        area: "500px",
        btn:0,
        content:html,
        success:function () {
            
        }
    });
}


function rendCouponCode(val) {
    return '<a class="a-link click-btn show-coupon" href="javascript:;">' + val + '</a>';
}



