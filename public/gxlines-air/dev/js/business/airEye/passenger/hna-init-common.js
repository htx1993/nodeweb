//*********************************页面辅助方法***************************************//
//乘机人的唯一性判断
/*老年人验证*/
function olderVertify() {
    var passengerArr = [];
    $(".p-panel.adt").each(function () {
        var $this = $(this);
        var birthday = $this.find('input[name="birthday"]').val();
        passengerArr.push({
            "birthday": birthday
        });
    });
    for (var i = 0, i1 = passengerArr.length; i < i1; i++) {
        if (judgeAge(passengerArr[i].birthday, "AGED") == "fit") {
            _showValidationTips(_i18n("P29").format(_tel));
            return false;
        }
    }
    return true;
}

function passengerUniq() {
    var passengerArr = [];
    var adtIndex = 0;
    var cnnIndex = 0;
    var infIndex = 0;
    $(".p-panel.adt,.p-panel.cnn,.p-panel.inf").each(function () {
        var $this = $(this);
        //获取当前面板证件类型
        // var idType = $this.find(".idType").val();
        var idNo = $this.find("input[name='idNo']").length > 0 ? $this.find("input[name='idNo']").val().toLowerCase() : "";
        var fullName = $this.find("input[name='lastName']").val() + $this.find("input[name='firstName']").val();
        var passType = getTravellerType($this.find("input[type='hidden'][name='id']"));
        var index = 0;
        var titlePass = "成人";
        if (passType == "ADT") {
            adtIndex++;
            index = adtIndex;
        } else if (passType == "CNN") {
            titlePass = "儿童";
            cnnIndex++;
            index = cnnIndex;
        } else {
            titlePass = "婴儿";
            infIndex++;
            index = infIndex;
        }
        passengerArr.push({
            // "idType": idType,
            "title": titlePass,
            "fullName": fullName,
            "idNo": idNo,
            "passType": passType,
            "index": index
        });
    });

    var b1 = false;
    var b2 = false;
    var passenger1 = null;
    var passenger2 = null;
    labelArr:
        for (var i = 0, i1 = passengerArr.length; i < i1; i++) {
            for (var j = i + 1, j1 = passengerArr.length; j < j1; j++) {
                if (passengerArr[i].fullName == passengerArr[j].fullName) {
                    b1 = true;
                    passenger1 = passengerArr[i];
                    passenger2 = passengerArr[j];
                    break labelArr;
                }
                // (passengerArr[i].idType == passengerArr[j].idType &&
                if (passengerArr[i].idNo == passengerArr[j].idNo) {
                    b2 = true;
                    passenger1 = passengerArr[i];
                    passenger2 = passengerArr[j];
                    break labelArr;
                }
            }
        }
    if (b1) {
        //不能有相同姓名的乘机人
        _showValidationTips(_i18n("P46", [passenger1.title, passenger1.index, passenger2.title, passenger2.index]));
        return false;
    }
    if (b2) {
        //不能有证件号相同的乘机人(不论证件类型是哪种)
        _showValidationTips(_i18n("P43", [passenger1.title, passenger1.index, passenger2.title, passenger2.index]));
        return false;
    }
    return true;
}

//判断是否查看了购票相关协议
function confirmAgreement() {
    var $confirmBox = $("input[name='confirmBox']").prop("checked");
    if (!$confirmBox) {
        //带提示符的open
        _showValidationTips(_i18n("P27"));
        return false;
    }
    return true;
}

//按照航班起飞时间，来过滤乘机人，分类成 成人和儿童
function classificationPassType() {
    var countryType = "0";
    if (_sInfo.isDomestic != "Y") {
        //国际乘机人
        countryType = "1";
    }
    _Travellers.forEach(function (item, index) {
        if (item.lastName && item.passType && item.countryType == countryType && (_sInfo.isDomestic == "Y" || (_sInfo.isDomestic != "Y" && item.cardValidDate >= getDateFrame("VALIDITY").startDay))) {
            item.code = item.id;
            item.name = item.fullName;
            if (item.passType == "ADT") {
                _TravellersAdt.push(hna.cloneObj(item));
            } else if (item.passType == "CNN") {
                _TravellersCnn.push(hna.cloneObj(item));
            } else if (item.passType == "INF") {
                _TravellersInf.push(hna.cloneObj(item));
            }
        }
    });
}
//给某一个元素绑定点击事件，能弹出日期控件
function pDateClickFun(thisP, flag) {
    try {
        thisP = thisP instanceof $ ? thisP : $(thisP);
        var idType = getTravellerIdType(thisP);
        thisP.off("click focus");
        if (!flag) {
            return false;
        }
        if (idType != "ID_CARD") {
            thisP.removeAttr("readonly").on("click focus", function (e) {
                e.stopPropagation();
                var travellerType = getTravellerType(this);
                if (thisP.hasClass("cardValidDate")) {
                    //如果是护照有效期
                    travellerType = "VALIDITY";
                }
                var timeRange = getDateFrame(travellerType);
                var pDateOption = {};
                pDateOption.elem = this;
                pDateOption.init = false;
                pDateOption.min = timeRange.startDay;
                pDateOption.max = timeRange.endDay;
                pDateOption.start = thisP.val() || pDateOption.max;
                thisP.parents(".hnaui-placeholder").addClass("hnaui-input-focus");
                pDateOption.choose = function (dates) {
                    thisP.parents(".hnaui-placeholder").toggleClass("hnaui-input-active", !!dates);
                };
                if (!globalDate) {
                    globalDate = hnaui.hnadate;
                }
                globalDate(pDateOption);
            });
        } else {
            thisP.attr("readonly", "readonly");
        }
    } catch (e) {
        JsErrorTips(e);
    }
}
//判断从身份证里面提出出来的出生日期
function judgeBirthday(obj, flag, thisP) {
    var travellerType = getTravellerType(thisP);
    var judgeAgeStr = judgeAge(obj.birthday, travellerType);
    var birthdayValue = "";
    var returnTips = "";
    if (judgeAgeStr == "fit") {
        //如果身份证里面的出生日期在该类乘机人出生日期范围内，则自动填充出生日期文本框
        birthdayValue = obj.birthday;
        if (travellerType == "ADT") {
            //如果是失去焦点的时候，则判断一下是否为老年人
            if (flag && judgeAge(obj.birthday, "AGED") == "fit") {
                returnTips = _i18n("P29").format(_tel);
            }
        }
    } else {
        //如果身份证里面的出生日期不在该类乘机人出生日期范围内
        birthdayValue = "";
        if (travellerType == "ADT") {
            returnTips = _i18n("P30");
            if (judgeAgeStr == "greater") {
                returnTips = _i18n("P31").format(_tel);
            }
        } else if (travellerType == "CNN") {
            returnTips = _i18n("P32");
        } else {
            returnTips = _i18n("P33");
        }
    }
    return {"birthday": birthdayValue, "tips": returnTips};
}

//通过证件类型，获取文本框不同的title
function getInputTitleByIdNo(idType, passType) {
    var firstNameStr = _i18n("P34");
    var lastNameStr = _i18n("P35");
    var idNoStr = _i18n("P36");
    if (idType == "2.DOC") {
        firstNameStr = _i18n("P37");
        lastNameStr = _i18n("P38");
        idNoStr = _i18n("P39");
    } else if (idType == "MI_CARD") {
        idNoStr = _i18n("P40");
    } else if (idType == "OTHER_ID") {
        idNoStr = _i18n("P41");
    }

    if (passType == "CONTACTS") {
        firstNameStr = _i18n("P34");
        lastNameStr = _i18n("P35");
    }

    return {
        "firstNameTitle": firstNameStr,
        "lastNameTitle": lastNameStr,
        "idNoTitle": idNoStr
    };
}

//重新设置了证件类为护照之后，更改姓，名，证件号的title
function resetInputTitle(thisP, idType) {
    thisP = thisP instanceof $ ? thisP : $(thisP);
    var $panel = thisP.parents(".p-panel");
    var objTitle = getInputTitleByIdNo(idType);
    $panel.find("input.firstName").attr("hna-title", objTitle.firstNameTitle).siblings(".hnaui-input-title").html(objTitle.firstNameTitle + '<span class="hnaui-required">*&nbsp;</span>');
    $panel.find("input.lastName").attr("hna-title", objTitle.lastNameTitle).siblings(".hnaui-input-title").html(objTitle.lastNameTitle + '<span class="hnaui-required">*&nbsp;</span>');
    $panel.find("input.idNo").attr("hna-title", objTitle.idNoTitle).siblings(".hnaui-input-title").html(objTitle.idNoTitle + '<span class="hnaui-required">*&nbsp;</span>');
}

//获取面板乘机人证件类型
function getTravellerIdType(thisP) {
    var type = "";
    try {
        thisP = thisP instanceof $ ? thisP : $(thisP);
        type = thisP.parents(".p-panel").find(".idType").val();
    } catch (e) {
        JsErrorTips(e);
    }
    return type;
}

//获取面板乘机人类型
function getTravellerType(thisP) {
    var type = "";
    try {
        thisP = thisP instanceof $ ? thisP : $(thisP);
        var $pPanel = thisP.parents(".p-panel");
        if ($pPanel.hasClass("adt")) {
            type = "ADT";
        } else if ($pPanel.hasClass("cnn")) {
            type = "CNN";
        } else if ($pPanel.hasClass("inf")) {
            type = "INF";
        } else if ($pPanel.hasClass("contacts")) {
            type = "CONTACTS";
        }
        return type;
    } catch (e) {
        JsErrorTips(e);
        return type;
    }
}

//分情况获取第一航段和最后一航段的起飞时间
//获取第一航段的起飞日期
function getFlightTakeOffDateFirst() {
    return hna._processData.getFlightDepartDateFirst();
}
//获取最后一航段的起飞日期
function getFlightTakeOffDateLast() {
    return hna._processData.getFlightDepartDateLast();
}
//返回不同乘机人的出生日期的范围,包括护照有效期的范围
function getDateFrame(type) {
    try {
        type = type.toUpperCase();

        var agedStart = 200;
        var agedEnd = 70;
        var adtStart = agedStart;
        var adtEnd = 12;
        var cnnStart = adtEnd;
        var cnnEnd = 2;
        var infStart = cnnEnd;
        var infEnd = 14;
        var flightDayFirst = getFlightTakeOffDateFirst() || _currentDate;
        var flightDayLast = getFlightTakeOffDateLast() || _currentDate;
        var startDay = hna._date.addYear(-1 * agedStart, flightDayFirst);
        var endDay = _currentDate;
        if (type == "ADT") {//成人
            //成人
            startDay = hna._date.addYear(-1 * adtStart, flightDayLast);
            endDay = hna._date.addYear(-1 * adtEnd, flightDayLast);
        } else if (type == "CNN") {//儿童
            //儿童
            startDay = hna._date.addYear(-1 * cnnStart, flightDayLast);
            startDay = hna._date.addDate(1, startDay);
            endDay = hna._date.addYear(-1 * cnnEnd, flightDayLast);
        } else if (type == "INF") {//婴儿
            //婴儿
            startDay = hna._date.addYear(-1 * infStart, flightDayLast);
            startDay = hna._date.addDate(1, startDay);
            endDay = hna._date.addDate(-1 * infEnd + 1, flightDayLast);
        } else if (type == "VALIDITY") {
            //护照
            startDay = hna._date.addMonth(6, flightDayLast);
            endDay = hna._date.addYear(10, flightDayLast);
        } else if (type == "AGED") {
            //老年人
            if (hasAged) {
                startDay = hna._date.addYear(-1 * agedStart, flightDayLast);
                endDay = hna._date.addYear(-1 * agedEnd, flightDayLast);
            } else {
                startDay = hna._date.addYear(-1 * 2000, flightDayLast);
                endDay = hna._date.addYear(-1 * 200, flightDayLast);
            }

        }
        return {"startDay": startDay, "endDay": endDay};
    } catch (e) {
        JsErrorTips(e);
        return {};
    }
}
//计算两个日期之间相差几天
function judgeAge(birthday, type) {
    try {
        var timeFrame = getDateFrame(type);
        if (birthday >= timeFrame.startDay && birthday <= timeFrame.endDay) {
            return "fit";
        } else if (birthday < timeFrame.startDay) {
            return "greater";//大于范围
        } else if (birthday > timeFrame.endDay) {
            return "less";//小于范围
        } else {
            return "";
        }
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}

function getSearchLoadingEl() {
    return $(".search-loading").prop("outerHTML");
}
