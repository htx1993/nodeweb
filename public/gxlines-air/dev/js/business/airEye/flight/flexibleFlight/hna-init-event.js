//获取数据
function getPriceTrend(flag) {
    var arr = [];
    var outboundOption = _sInfo.outboundOption;
    if (_sInfo.tripType == "MC") {
        var obj = _sInfo.multiCityOptions[_index];
        arr.push({
            "org": obj.originLocationCode,
            "dst": obj.destinationLocationCode
        });
    } else {
        if (_index == "0") {
            arr.push({
                "org": outboundOption.originLocationCode,
                "dst": outboundOption.destinationLocationCode
            });
        } else if (_index == "1") {
            arr.push({
                "org": outboundOption.destinationLocationCode,
                "dst": outboundOption.originLocationCode
            });
        }
    }
    _searchCity = arr;

    if (_firstDate && _lastDate) {
        if (flag == "next") {
            _firstDate = _lastDate;
            _lastDate = hna._date.addDate(30, _lastDate);

        } else if (flag == "prev") {
            _lastDate = _firstDate;
            _firstDate = hna._date.addDate(-30, _firstDate);
        }
    } else {
        _firstDate = hna._date.addDate(-15, outboundOption.departureDate);
        _lastDate = hna._date.addDate(15, outboundOption.departureDate);
    }

    var queryData = {
        "query": arr,
        "startDate": _firstDate,
        "endDate": _lastDate
    };

    $(".search-loading").show();

    hna.ajax({
        url: ajaxUrl.getPriceTrend,
        data: queryData,
        doneCallback: function (data) {
            if (data.code == "200") {
                if (data.data && data.data.length > 0) {
                    _fInfo = data.data[0];
                } else {
                    _fInfo = _searchCity[0];
                }
            } else {
                _fInfo = _searchCity[0];
            }
            createSearchResult();
        },
        failCallback: function (data) {
            _fInfo = _searchCity[0];
        }
    });
}

//设置继续购票按钮的状态
function setSubmitBtnState(thisP) {
    $("td").removeClass("active");
    thisP.addClass("active");
    $(".submit-btn").toggleClass("hnaui-btn-disabled", $("td.active").length <= 0);
}
//继续购票
function continueBuyTickets() {
    _sInfo.flexible = "N";
    _sInfo.tripType = "OW";
    _sInfo.outboundOption.departureDate = $("td.active").data("date");

    searchFlightFun({
        beforeCallbackFun: function () {
            saveSearchFlightInfo(_sInfo);
            hna.loading();
        },
        doneCallbackFun: function () {
            if (_sInfo.flexible === "N") {
                goToPage("/airEye/flight/select");
            } else if (_sInfo.flexible === "Y") {
                goToPage("/airEye/flight/flexible");
            }
        },
        alwaysCallbackFun: function () {
        },
        data: _sInfo
    });
}
//前一月
function getPrevMonthData() {
    getPriceTrend("prev");
}
//后一月
function getNextMonthData() {
    getPriceTrend("next");
}