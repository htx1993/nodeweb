//初始化乘机人数据
function initPassengerData() {
    hna.ajax({
        url: ajaxUrl.getTravellers,
        data: {
            "countryType": _sInfo.isDomestic == "Y" ? 0 : 1,
            "userID": "1"
        },
        doneCallback: function (data) {
            if (data.data && hna.isArray(data.data.travellerList)) {
                (data.data.travellerList || []).forEach(function (item) {
                    item.referenceDate = getFlightTakeOffDateLast();
                    _Travellers.push(new Traveller(item));
                });
                classificationPassType();
            }
            _userInfo = new UserInfo(data.data.userInfo);
            _userInfo.passType = "CONTACTS";
            createSearchResult();
            //优惠券面板
            window.getCouponList();
        }
    });
}
//对所有乘机人面板里面相关属性进行排序
function initPanelIndex() {
    try {
        $(".search-result").find(">.adt").each(function (index) {
            $(this).find(".p-index").html(index + 1);
        });
        $(".search-result").find(">.cnn").each(function (index) {
            $(this).find(".p-index").html(index + 1);
        });
        $(".search-result").find(".inf").each(function (index) {
            $(this).find(".p-index").html(index + 1);
        });
    } catch (e) {
        JsErrorTips(e);
    }
}
//初始化出生日期控件
function initDate() {
    $(".p-date").each(function () {
        pDateClickFun(this, true);
    });
}

//监听下拉框改变事件
function initSelect() {
    try {
        //监听证件类型改变事件
        globalFrom.on('select(PidType)', function (data) {
            var $this = $(data.elem);
            var $pDate = $this.parents(".p-panel").find(".birthday");
            if (data.value == "ID_CARD") {
                $pDate.off("click").prop("disabled", true);
                setBirthdayValue($this);
            } else {
                pDateClickFun($pDate.prop("disabled", false), true);
            }

            resetInputTitle($this, data.value);

            //清空证件号码和出生日期
            $this.parents(".p-panel").find(".idNo").val("").trigger("blur");
            $this.parents(".p-panel").find(".birthday").val("").trigger("blur");
            $this.parents(".p-panel").find("input.firstName").trigger("blur");
            resetSelectErrorTips($this);
        });
        //监听国家码改变事件
        globalFrom.on('select(PmobilePre)', function (data) {
            var $this = $(data.elem);
            $this.parents(".p-panel").find(".mobile").val("").trigger("blur");
            resetSelectErrorTips($this);
        });
        //监听国籍改变事件
        globalFrom.on('select(Pcountry)', function (data) {
            var $this = $(data.elem);
            resetSelectErrorTips($this);
        });
        //监听护照签发国改变事件
        globalFrom.on('select(PcardIssueCountry)', function (data) {
            var $this = $(data.elem);
            resetSelectErrorTips($this);
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

function resetSelectErrorTips(thisP){
    var $thisOption = thisP.find("option:checked");
    var errorTips = "";
    if($thisOption.length <= 0 || !$thisOption.val()){
        errorTips = thisP.attr("hna-title") + "不能为空";
    }
    addErrorTips(thisP,errorTips);
}

//验证文本框的值，同时绑定失去焦点事件和提交表单的验证
function initInput() {
    try {
        //提交表单验证文本框
        var config = {};
        _verificationElemList.forEach(function (i) {
            if (i.verifyFun) {
                config[i.type] = function (value, item) {
                    var verifyTips = "";
                    var config = {
                        "elem": item,
                        "typeInfo": i,
                        "flag": "submit",
                        "passType": getTravellerType($(item)),
                        "idType": getTravellerIdType($(item)),
                        "isDomestic": _sInfo.isDomestic,
                        "callback": judgeBirthday
                    };
                    verifyTips = i.verifyFun(config);
                    if (i.type == "Pname") {
                        verifyTips = verifyTips.msg;
                    }
                    return verifyTips;
                };
            }
        });
        globalFrom.verify(config, true);
        //表单聚焦时 移除错误样式
        $(document).on("focus", 'input', function (e) {
            e.stopPropagation();
            var $this = $(this);
            $this.parent().removeClass("hnaui-error-active");

        });
        //表单控件失去焦点的事件
        $(document).on("blur", "input", function (e) {
            e.stopPropagation();
            try {
                var $this = $(this);
                var $ph = $(".hnaui-placeholder");
                $ph.removeClass("hnaui-input-error");
                if (hna.isBlur || $this.attr("readonly") == "readonly") {
                    return false;
                }
                var verifyTips = "";
                var inputType = "";

                var thisVerify = $this.attr("hna-verify");
                _verificationElemList.forEach(function (item) {
                    if (item.verifyFun) {
                        if (thisVerify == item.type) {
                            var config = {
                                "elem": $this,
                                "passType": getTravellerType($this),
                                "idType": getTravellerIdType($this),
                                "isDomestic": _sInfo.isDomestic,
                                "typeInfo": item,
                                "callback": judgeBirthday
                            };
                            verifyTips = item.verifyFun(config);
                            if (thisVerify == "Pname" && typeof (verifyTips) == "object") {
                                var tips = "";
                                if (verifyTips.firstName) {
                                    tips = verifyTips.firstNameTips;
                                    verifyTips.firstName.parent().toggleClass("hnaui-input-error", (tips && tips != "null"));
                                }
                                if (verifyTips.lastName) {
                                    tips = verifyTips.lastNameTips;
                                    verifyTips.lastName.parent().toggleClass("hnaui-input-error", (tips && tips != "null"));
                                }
                                verifyTips = verifyTips.msg;
                            }
                        }
                    }
                });
                if (thisVerify) {
                    //_showValidationTips(verifyTips);
                    addErrorTips($this, verifyTips);
                }
                if (inputType != "name") {
                    $this.parent().toggleClass("hnaui-input-error", !!verifyTips);
                }
            } catch (ev) {
                JsErrorTips(ev);
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}
//显示错误信息
function addErrorTips(thisP, verifyTips) {
    thisP = thisP instanceof $ ? thisP : $(thisP);
    //错误信息时 对文本框添加错误样式
    $(thisP).parent().addClass("hnaui-error-active");
    var thisName = thisP.attr("name");
    var $errorBox = thisP.parents(".p-panel").find(".hnaui-error-box");
    var $thisLi = $errorBox.find("li." + thisName);
    if (thisName == "lastName" && $errorBox.find(".firstName .hnaui-symbol").text() == verifyTips) {
        $thisLi.remove();
        return false;
    }
    if (thisName == "firstName" && $errorBox.find(".lastName .hnaui-symbol").text() == verifyTips) {
        $thisLi.remove();
        $errorBox.find("li.lastName").remove();
    }
    if (verifyTips && verifyTips != "null") {
        var html = '<li class="hnaui-error-style ' + (thisName || "") + '"><span class="hnaui-symbol">' + verifyTips + '</span></li>';
        if ($thisLi) {
            $thisLi.remove();
        }
        $errorBox.append(html);
    } else {
        //正确时移除错误样式
        $(thisP).parent().removeClass("hnaui-error-active");
        $thisLi.remove();
        if ($(".firstName")) {
            $("li.firstName").remove();
        }
        if ($(".lastName")) {
            $("li.lastName").remove();
        }

    }
}
//监听联系人复选框
function initCheckbox() {
    globalFrom.on('checkbox(synchroContacts)', function (data) {
        var $this = $(data.elem);
        var flag = $this.prop("checked");
        //点击同步联系人时 移除错误文本框样式
        $(".contacts").find("input").parent().removeClass("hnaui-error-active");
        $("input[name='saveContact']").prop("checked", false);
        $this.prop("checked", flag);

        renderContactPanel($this, flag);
    });
}
//填充联系人信息
function renderContactPanel(thisP, flag) {
    var adtPanel = thisP.parents(".p-panel");
    var adtInfo = {};

    if (flag) {
        adtInfo.firstName = adtPanel.find("input[name='firstName']").val();
        adtInfo.lastName = adtPanel.find("input[name='lastName']").val();
        adtInfo.mobile = adtPanel.find("input[name='mobile']").val();
        adtInfo.mobilePre = adtPanel.find(".hnaui-mobile-pre select").val();
        adtInfo.email = adtPanel.find("input[name='email']").val();
    } else {
        adtInfo = _userInfo;
        //不注册 直接手机登录  联系人姓和名 到乘机人过滤
        var reg = /^([A-Za-z\s]|[\u4E00-\u9FA5])+$/;
        if (!reg.test(adtInfo.firstName) || !reg.test(adtInfo.lastName)) {
            adtInfo.firstName = "";
            adtInfo.lastName = "";
        }
    }

    var contactsPanel = $(".p-panel.contacts");
    contactsPanel.find("input[name='firstName']").val(adtInfo.firstName);
    contactsPanel.find("input[name='lastName']").val(adtInfo.lastName);
    contactsPanel.find("input[name='mobile']").val(adtInfo.mobile);
    contactsPanel.find(".hnaui-mobile-pre select").val(adtInfo.mobilePre).attr('selected', 'selected');
    contactsPanel.find("input[name='email']").val(adtInfo.email);
    renderFrom();

    //清空该面板里面错误提示信息
    contactsPanel.find(".hnaui-error-box").empty();
}


//初始化国籍和护照签发国的数据
function initCountryData() {
    if (_sInfo.isDomestic == "N") {
        hna.jsData.getCountryData(function (data) {
            _countryData = data.data;
            (_countryData || []).forEach(function (item) {
                if(item.name.indexOf(item.name_en) <= -1){
                    item.name += ("（" + item.name_en + "）");
                }
            });
            resetSelectData("country", $(".search-result"));
            resetSelectData("cardIssueCountry", $(".search-result"));

            if (globalFrom) {
                globalFrom.render("select");
            }
        });
    }
}

//初始化国家码的数据
function initMobilePreData() {
    hna.jsData.getInterTelData(function (data) {
        _mobilePreData = data.data;

        resetSelectData("mobilePre", $(".search-result"));

        if (globalFrom) {
            globalFrom.render("select");
        }
    });
}
function createMobilePreEl(dataArr) {
    var html = '';
    html += '   <div class=" hnaui-mobile-pre">';
    html += '       <select name="mobilePre" hna-filter="PmobilePre" hna-title="国家码" hna-search>';
    (dataArr || [{"area_code": 86, "name": "中国"}]).forEach(function (item) {
        if (item.area_code) {
            var select = "";
            if (item.area_code == "86") {
                select = "selected";
            }
            html += '       <option value="' + (item.area_code || "") + '" ' + select + '>' + (item.area_code || "") + '</option>';
        }
    });
    if (!dataArr) {
        html += '       <option value="-1">数据加载中...</option>';
    }
    html += '       </select>';
    html += '   </div>';
    return html;
}

function resetSelectData(eleType, parentPanel) {
    var arr = _countryData;
    if (eleType == "mobilePre") {
        arr = _mobilePreData;
        parentPanel.find(".hnaui-mobile-pre").replaceWith(createMobilePreEl(_mobilePreData));
    } else {
        var html = createSelectEl({"eleType": eleType, "dataArr": arr});
        parentPanel.find("select[name='" + eleType + "']").parents(".input-icon").replaceWith(html);
    }
}

//监听表单提交
function initSubmit() {
    try {
        globalFrom.on('submit(formPassenger)', function (data) {
            if (data.status == "fail") {
                data.errorTips.forEach(function (item, index) {
                    addErrorTips(item.elem, item.errorTips);
                });

                hna.locationTag($(".hnaui-error-box"));

            } else {
                hna.verifyForm($(".search-result"), function () {
                    if (!passengerUniq()) {
                        return false;
                    }
                    if (!confirmAgreement()) {
                        return false;
                    }
                    if (!olderVertify()) {
                        return false;
                    }

                    var passengerFormInfo = {};
                    passengerFormInfo.travellersInfo = [];
                    passengerFormInfo.travelArranger = {};
                    //获取乘机人对象
                    var fullNameList = [];
                    var letterList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
                    $(".p-panel.adt,.p-panel.cnn,.p-panel.inf").each(function (index, item) {
                        var info = hna.getFormParameter(item);
                        delete info.nameList;
                        info.referenceDate = getFlightTakeOffDateLast();
                        var t = new Traveller(info);
                        if(!t.cardValidDate){
                            t.cardValidDate = "2099-12-31";
                        }
                        passengerFormInfo.travellersInfo.push(t);
                        fullNameList.push(letterList[index] + "旅客：" + t.fullName);
                    });
                    //获取联系人对象
                    passengerFormInfo.travelArranger = new Traveller(hna.getFormParameter($(".p-panel.contacts")));

                    var tipsHtml = '<div>';
                    tipsHtml += '       <p>' + _i18n("P44", [(fullNameList.join("、")), (passengerFormInfo.travelArranger.mobile || "")]) + '</p>';
                    tipsHtml += '   </div>';

                    if (age18Has && (_sInfo.guestTypes[1].amount || _sInfo.guestTypes[2].amount)) {
                        //获取成人中，年龄最大的一个人
                        var maxPassenger = (passengerFormInfo.travellersInfo || []).min(function (item) {
                            return item.birthday;
                        });
                        var flightDayLast = getFlightTakeOffDateLast() || _currentDate;
                        if (hna._date.addYear(18, maxPassenger.birthday) > flightDayLast) {
                            _showValidationTips(_i18n("P45"));
                            return false;
                        }
                    }

                    _showConfirmTips({"title": _i18n("P42"), "tips": tipsHtml, "width": "500px"}, function () {
                        if($(data.elem).hasClass("choose-seat")){
                            _isChooseSeat = true;
                        }
                        hnaer.closeAll();
                        hna.loading();
                        hna._processData.savePassengerInfo(passengerFormInfo.travellersInfo);
                        hna.ajax({
                            url: ajaxUrl.addTravellers,
                            data: {
                                "shoppingCartId": hna._processData.getShoppingCartId(),
                                "passengerFormInfo": JSON.stringify(passengerFormInfo),
                                "tripType": _sInfo.tripType
                            },
                            doneCallback: function (data) {
                                if (data && data.data && data.data.status == "success") {
                                    if (data.data.message && data.data.code == "0463") {
                                        // 重复购票
                                        _showConfirmTips(data.data.message, function () {
                                            goToProduct();
                                        });
                                    } else {
                                        goToProduct();
                                    }

                                } else {
                                    if (data.data.message) {
                                        if (data.data.code == "0462") {
                                            //有未支付订单,去订单列表
                                            _showConfirmTips(data.data.message, function () {
                                                goToPage("/airEye/order/orderList");
                                            });
                                        } else {
                                            _showValidationTips(data.data.message);
                                        }
                                    }
                                }
                            }
                        });
                    });

                });
            }
            return false;
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

function goToProduct(){
    if(_isChooseSeat){
        goToPage("/airEye/seat");
    }else{
        goToPage("/airEye/product");
    }
}