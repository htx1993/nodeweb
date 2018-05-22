//验证文本框的值，同时绑定失去焦点事件和提交表单的验证
function initInput() {
    try {
        //提交表单验证文本框
        var config = {};
        (_verificationElemList || []).forEach(function (i) {
            if (i.verifyFun) {
                config[i.type] = function (value, item) {
                    var verifyTips = i.verifyFun({
                        "elem": item,
                        "typeInfo": i,
                        "flag": "submit"
                    });
                    if (i.type == "Pname") {
                        verifyTips = verifyTips.msg;
                    }
                    return verifyTips;
                };
            }
        });
        globalFrom.verify(config);

        //表单控件失去焦点的事件
        $(document).on("blur", "input", function (e) {
            e.stopPropagation();
            try {
                var $this = $(this);
                var thisV = ($this.val() || "").trim();
                //去掉文本内容首尾的空格
                $this.val(thisV);
                if (hna.isBlur || $this.attr("readonly") == "readonly") {
                    return false;
                }
                var verifyTips = "";
                var thisVerify = $this.attr("hna-verify");
                (_verificationElemList || []).forEach(function (item) {
                    if (item.verifyFun) {
                        if (thisVerify == item.type) {
                            verifyTips = item.verifyFun({
                                "elem": $this,
                                "typeInfo": item
                            });
                        }
                    }
                });

                if (thisVerify == "Pname") {
                    verifyTips = verifyTips.msg;
                }
                _showValidationTips(verifyTips);

            } catch (ev) {
                JsErrorTips(ev);
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}
//初始化出发时间和返回时间
function initDate() {
    try {
        $(document).on("click focus", ".o-date", function (e) {
            e.stopPropagation();
            try {
                var $this = $(e.target);
                var pDateOption = {};
                pDateOption.elem = this;
                pDateOption.init = false;
                var thisName = $this.attr("name");
                if (thisName == "orderBeginDate") {
                    var orderEndDate = $("input[name='orderEndDate']").val();
                    if (orderEndDate) {
                        pDateOption.max = orderEndDate;
                    }
                } else if (thisName == "orderEndDate") {
                    var orderBeginDate = $("input[name='orderBeginDate']").val();
                    if (orderBeginDate) {
                        pDateOption.min = orderBeginDate;
                    }
                }
                pDateOption.start = $this.val() || pDateOption.min;
                pDateOption.choose = function (dates) {
                    renderFrom();
                };

                if (!globalDate) {
                    globalDate = hnaui.hnadate;
                }
                globalDate(pDateOption);
            } catch (ev) {
                JsErrorTips(ev);
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

//监听表单提交
function initSubmit() {
    try {
        globalFrom.on('submit(formSearchOrder)', function (data) {
            hna.verifyForm($("#searchOrder"), function () {
            });
            return false;
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

//获取当前月的第一天
function getCurrentMonthFirst(){
    var date=new Date();
    date = date.setDate(1);
    var firstDate = hna._date.getDateInfo(date + "").date;
    return firstDate;
}

