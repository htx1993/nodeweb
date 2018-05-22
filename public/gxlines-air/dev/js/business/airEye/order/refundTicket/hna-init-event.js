//第一步，获取退票订单信息
function getRefundDetail() {
    try {
        $(".search-loading").show();
        _currentStep = 1;
        var info = {
            "orderCode": _orderCode
        };
        _sendAjax(ajaxUrl.getRefundDetail, info, function (data) {
            if (data.success === false && data.msg) {
                showOrderErrorTips(data.msg);
            } else {
                createRefundTicketsEl(data);
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}
//第二步，获取退票费用信息
function getRefundCostInfo() {
    try {
        $(".search-loading").show();
        var paxIdList = [];
        $("input[type='checkbox'][name='oneChoose']:checked").each(function () {

            var thisV = $(this).attr("value");
            if (thisV) {
                paxIdList.push(thisV);
            }
        });
        $("input[type='checkbox']").prop("disabled", true);
        renderFrom();
        _costInfo = {
            "orderCode": _orderCode,
            "paxIds": paxIdList.join(","),
            "refundType": getRefundType(),
            "remark": $("#remark").val() || ""
        };
        _sendAjax(ajaxUrl.getRefundCostInfo, _costInfo, function (data) {
            //console.log(data.success);
            if (data.status == "success") {
                createRefundCostDetail(data);
                setNextBtnStep("2");
                $('.hna-involuntary-refund').hide();
                $('.hna-voluntary-refund').hide();
            } else {
                if(data.code == "0001"){
                    _showCountDownTips({"tips":"业务处理中,{0}秒钟后请重试！","time":3},function(){
                        location.reload();
                    });
                }else{
                    _showMsg(data.message);
                    $("input[type='checkbox']").prop("disabled", false);
                    renderFrom();
                }
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}
//第三部，提交退票申请
function refundApply() {
    try {
        hnaer.closeAll();
        hna.loading();
        _sendAjax(ajaxUrl.refundApply, _costInfo, function (data) {
            if (data.status == "success") {
                $(".search-loading").show();
                setNextBtnStep('1');
                setFlightState("complete-refund");
                getRefundDetail();
            } else {
                _showMsg(data.message);
            }
        }, "show");
    } catch (e) {
        JsErrorTips(e);
    }
}


//监听选择变化
function initSelect() {
    try {
        globalFrom.on('select(refundType)', function (data) {
            if (data.value == _refundTypeList[1].code) {
                //自愿退票
                $('.hna-involuntary-refund').hide();
                $('.hna-voluntary-refund').show();
                $('.next-btn').removeClass('hnaui-btn-disabled');
                _currentRefund = _refundTypeList[1].name;

                changeRefundRule("VOLUNTARY");
            } else if (data.value == _refundTypeList[2].code) {
                //非自愿退票
                $('.hna-involuntary-refund').show();
                $('.hna-voluntary-refund').hide();
                $('.next-btn').removeClass('hnaui-btn-disabled');
                _currentRefund = _refundTypeList[2].name;

                changeRefundRule("INVOLUNTARY");
            } else {
                //其他
                $('.hna-involuntary-refund').hide();
                $('.hna-voluntary-refund').hide();
                $('.next-btn').addClass('hnaui-btn-disabled');

                changeRefundRule("VOLUNTARY");
            }
            $('.hnaui-refund-cost').hide();
            $("#remark").val("");
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

//获取退票类型
function getRefundType() {
    try {
        return $("select[name='refundType']").find("option:checked").val() || "VOLUNTARY";
    } catch (e) {
        JsErrorTips(e);
    }
}

//设置下一步按钮的title
function setNextBtnStep(step) {
    try {
        _currentStep = step || '1';
        var title = "";
        if (_currentStep == "1") {
            title = _i18n("OR26");
            $(".refund-type-select").show();
            $(".next-btn").show();
            $('.hna-involuntary-refund').hide();
            $('.hna-voluntary-refund').hide();
            $('.hnaui-refund-cost').hide();
            $("input[type='checkbox']").prop("disabled", false);
            $("select[name='refundType']").find("option").each(function () {
                $(this).prop("selected", false);
            });
            renderFrom();
            $(".next-btn").addClass("hnaui-btn-disabled");
            setFlightState("refund-Tickets-apply");

        } else if (_currentStep == "2") {
            $(".refund-type-select").hide();
            $(".next-btn").show();
            title = _i18n("OR49");
            setFlightState("refund-audit");

        } else if (_currentStep == "3") {
            $(".refund-type-select").hide();
            $(".next-btn").hide();
            setFlightState("complete-refund");

        }
        $(".next-btn").html(title + ' <i class="hnaui-icon">&#xe610;</i>');
    } catch (e) {
        JsErrorTips(e);
    }
}

function setFlightState(state) {
    try {
        if (!state) {
            state = "mmb-step";
        }
        var $currentLi = $(".mmb-step").find("li." + state).addClass("current");
        $currentLi.siblings().removeClass("current");
    } catch (e) {
        JsErrorTips(e);
    }
}

function changeRefundRule(type){
    if(type == "VOLUNTARY"){
        $(".hnaui-tax-detail>p.voluntary").show();
        $(".hnaui-tax-detail>p.involuntary").hide();
    }else{
        $(".hnaui-tax-detail>p.voluntary").show();
        //$(".hnaui-tax-detail>p.involuntary").html(getRefundRule(type)).show();
        $(".hnaui-tax-detail>p.involuntary").hide();
    }
}
