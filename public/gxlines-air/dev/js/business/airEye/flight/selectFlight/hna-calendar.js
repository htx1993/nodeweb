//创建最低价格日历
function createFlightDateList(index) {
    try {
        var currentDate = hna._date.getDateInfo().date;
        var dateList = [];
        var activeDate = "";
        if (_fInfo.originDestinations && _fInfo.originDestinations[index]) {
            dateList = _fInfo.originDestinations[index].departureDates;
            activeDate = hna._date.getDateInfo(_fInfo.originDestinations[index].departureDate).date;
        }


        var html = '<div class="flight-date-list hnaui-shadow">';
        html += '<ul class="selectdateul hnaui-clear">';
        for (var b = 0, b1 = dateList.length; b < b1; b++) {
            html += createFlightDateListLi(dateList[b], activeDate, index);
        }
        html += '';
        html += '</ul>';
        html += '<a href="javascript:;" class="btn_prev" data-date="' + activeDate + '" onclick="newSearchDate(this);return false;" data-index="' + (index || 0) + '"><i class="hnaui-icon">&#xe603;</i></a>';
        html += '<a href="javascript:;" class="btn_next" data-date="' + activeDate + '" onclick="newSearchDate(this);return false;" data-index="' + (index || 0) + '"><i class="hnaui-icon">&#xe602;</i></a>';
        html += '</div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}
//最低价格日历里面的某一天
function createFlightDateListLi(o, activeDate, index) {
    try {
        if (!o) {
            o = {};
        }
        var date = hna._date.getDateInfo(o.date);
        var cla = "";
        if (activeDate == date.date) {
            cla = "current";
        }
        var priceInfo = _formatMoneyInfo(o.minPrice, o.currency);
        var html = '<li class="' + cla + '">';
        html += '<a href="javascript:;" data-index="' + (index || 0) + '" data-date="' + (date.date || "") + '" onclick="changeSearchDate(this);return false;">';
        html += '<span class="tdatespan">' + (date.dateAbb || "") + ' ' + (date.week || "") + '</span><br>';
        html += '<strong>' + (!o.minPrice ? "--" : priceInfo.currency+priceInfo.money) + '</strong>';
        html += '</a>';
        html += '</li>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}

//选择价格日历中的某一天
function changeSearchDate(thisP) {
    try {
        var $this = $(thisP);
        var index = $this.data("index");
        var thisDate = $this.data("date");
        //当前天
        var currentDate = hna._date.getDateInfo().date;
        hnaer.closeAll();
        //先判断选择日期是否小于当前天
        if (filterDate(thisDate) < filterDate(currentDate)) {
            _showMsg("出发日期不能早于当天");
            return;
        }
        //先做判断，所选航段的新日期，不能小于前一航段的所选日期，不能小于后一航段的所选日期
        var $flightGroup = $(".flight-group");
        var tips = "";
        var bl = false;
        //前一航段
        if (index > 0) {
            var prevDate = $flightGroup.eq(index - 1).find(".flight-date-list li.current a").data("date");
            if ((filterDate(thisDate) < filterDate(prevDate)) && prevDate) {
                tips = "出发日期不能早于" + (hna._processData.getTripTitle(index - 1)) + "日期!";
                bl = true;
            }
        }

        //后一航段
        if (index < $flightGroup.length - 1) {
            var nextDate = $flightGroup.eq(index + 1).find(".flight-date-list li.current a").data("date");
            if ((filterDate(thisDate) > filterDate(nextDate)) && nextDate) {
                tips = "出发日期不能迟于" + (hna._processData.getTripTitle(index + 1)) + "日期!";
                bl = true;
            }
        }
        if (bl) {
            _showMsg(tips.replace("<span>", "").replace("</span>", ""));
            return;
        }

        //重新设置_sInfo里面的对应值
        if (_sInfo.tripType === "MC") {//如果是多航段
            _sInfo.multiCityOptions[index].departureDate = thisDate;
            saveSearchFlightInfo(_sInfo);
            searchMultiWay(_sInfo);//传入_sInfo重新查询;
            return;
        } else {
            _priceTrendServer = false;
            if (index == "0") {
                $("#goDate").val(thisDate);
            } else if (index == "1") {
                $("#backDate").val(thisDate);
                clickBackDate();
            }
            $(".search-btn").trigger("click");
        }

    } catch (e) {
        JsErrorTips(e);
    }
}

//往最低价格日历中添加新日期，前面的N天或者后面的N天
function newSearchDate(thisP) {
    var $this = $(thisP);
    var index = $this.data("index");
    var thisDate = $this.data("date");//当前选择的日期
    var dateNow = hna._date.getDateInfo().date;//当前日期;
    var $flightGroup = $(".flight-group");
    hnaer.closeAll();
    if ($this.hasClass("btn_prev")) {//往前减七天,如果前面第七天小于今天(前一航段)则等于今天(前一航段)
        thisDate = hna._date.addDate(-7, thisDate);
        if (filterDate(thisDate) < filterDate(dateNow)) {
            thisDate = dateNow;
        }
        if (index > 0) {
            var prevDate = $flightGroup.eq(index - 1).find(".flight-date-list li.current a").data("date");
            if ((filterDate(thisDate) < filterDate(prevDate)) && prevDate) {
                thisDate = prevDate;
            }
        }
    } else if ($this.hasClass("btn_next")) {//往后加七天,如果后面七天大于后一航段则等于后一航段
        thisDate = hna._date.addDate(7, thisDate);
        if (index < $flightGroup.length - 1) {
            var nextDate = $flightGroup.eq(index + 1).find(".flight-date-list li.current a").data("date");
            if ((filterDate(thisDate) > filterDate(nextDate)) && nextDate) {
                thisDate = nextDate;
            }
        }
    }
    if (_sInfo.tripType === "MC") {
        _sInfo.multiCityOptions[index].departureDate = thisDate;
        saveSearchFlightInfo(_sInfo);
        searchMultiWay(_sInfo);//传入_sInfo重新查询;
        return;
    } else {
        _priceTrendServer = false;
        if (index == "0") {
            $("#goDate").val(thisDate);
        } else if (index == "1") {
            $("#backDate").val(thisDate);
            clickBackDate();
        }
        $(".search-btn").trigger("click");
    }
}