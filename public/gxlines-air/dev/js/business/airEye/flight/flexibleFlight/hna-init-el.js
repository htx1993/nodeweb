//创建最优价格查询结果列表
function createSearchResult() {
    try {
        var str = createInfoPanel();
        $(".search-title").html(str);

        //创建价格日历
        var html = '';
        html += createFlightPrice();
        $(".search-price tbody").html(html);
        createSubmitBtn();//继续

    } catch (e) {
        JsErrorTips(e);
    }
}

//创建信息展示部分
function createInfoPanel() {
    var html = '';
    try {
        var originName = getCityNameByCode(_fInfo.org);
        var destinationName = getCityNameByCode(_fInfo.dst);

        var flag = _firstDate > _currentDay ? true : false;
        html += '<div class="search-destination">' + originName + '<span class="hnaui-icon">&#xe901;</span>' + destinationName + '</div>';
        html += '<div class="search-weekchange">';
        html += '   <span class="preweek hnaui-btn click-btn ' + (flag ? "" : "hnaui-btn-disabled") + '" data-date="' + _firstDate + '">';
        html += '   <i class="hnaui-icon">&#xe603;</i>' + _i18n("FF01") + '</span>';
        html += '   <span class="nextweek hnaui-btn click-btn" data-date="' + _lastDate + '">';
        html += _i18n("FF02") + '<i class="hnaui-icon">&#xe602;</i></span>';
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//根据tdList创建价格日历的表格
function createFlightPrice() {
    var html = '';
    try {
        var tdList = getTdElList();
        for (var a = 0; a < 5; a++) {
            html += createTrEl(tdList.slice(a * 7, (a + 1) * 7));
        }
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建tdList;
function getTdElList() {
    var tdList = [];
    try {
        //查询的日期
        var sInfoDate = _sInfo.outboundOption.departureDate;
        //获取对象
        var dateObj = getDateList();
        //需要添加数据的下标
        var weekDay = dateObj.weekDay;
        //补全的datelist
        var dateList = dateObj.dateList;

        //生成长度为35的td数组
        var tdCount = 35;
        for (var i = 0; i < tdCount; i++) {
            var week = '';
            switch (i % 7) {
                case 0 :
                    week = _i18n("FF06");
                    break;
                case 1 :
                    week = _i18n("FF07");
                    break;
                case 2 :
                    week = _i18n("FF08");
                    break;
                case 3 :
                    week = _i18n("FF09");
                    break;
                case 4 :
                    week = _i18n("FF10");
                    break;
                case 5 :
                    week = _i18n("FF11");
                    break;
                case 6 :
                    week = _i18n("FF12");
                    break;
            }
            var html = '';
            //如果当前下标大于等于weekDay小于weekDay+30;填充数据
            if (i >= weekDay && i < weekDay + 30) {
                //需要读取的dateList的下标;
                var dIndex = i - weekDay;
                var item = dateList[dIndex];
                html += '<td class="click-btn '+((item.amount && item.amount != "0") ? "price-td" : "look-td")+' '+ (item.date < _currentDay ? 'hnaui-btn-disabled' : '') +'" data-date="' + (item.date || _currentDay) + '">';
                html += '   <div class="flight-date">' + item.date + '</div>';

                if (item.amount && item.amount != "0") {
                    html += '   <div class="hnaui-price">' + _formatMoney(item.amount || "", item.currency, -1) + '<span>&nbsp;起</span></div>';
                } else if (item.date < _currentDay) {
                    html += '   <div class="flight-look">--</div>';
                } else {
                    html += '   <div class="flight-look">点击查看</div>';
                }

                html += '</td>';
            } else {
                //空白的td;
                html += '<td class="voidtd"></td>';
            }

            //将html加到tdList
            tdList.push(html);
        }
    } catch (e) {
        JsErrorTips(e);
        tdList = [];
    }
    return tdList;
}
//补全dateList数组,总共15天;
function getDateList() {
    var defaultLen = 30;
    //返回的日历数组
    var dateList = _fInfo.fares || [];

    var dateLen = dateList.length;
    var dateInfo = dateList[dateLen - 1] || {
            amount: 0,
            currency: "CNY",
            date: _currentDay
        };

    var lastDate = dateLen > 0 ? dateList[dateLen - 1].date : _currentDay;
    if (dateLen < defaultLen) {
        //往前补全到长度等于defaultLen
        for (var j = 0; j < defaultLen; j++) {
            lastDate = hna._date.addDate(1, lastDate);
            if (dateList.length < defaultLen) {
                dateList.push({
                    amount: 0,
                    currency: dateInfo.currency,
                    date: lastDate
                });
            } else {
                break;
            }
        }
    }

    //判断补齐后日历数组的第一天是星期几;
    var weekDay = hna._date.getDateInfo(dateList[0].date).weekNum;
    return {
        dateList: dateList,
        weekDay: weekDay
    };
}
//创建日历的行
function createTrEl(tdArr) {
    var html = '';
    try {
        html += '<tr>';
        (tdArr || []).forEach(function (item, index) {
            html += item;
        });
        html += '</tr>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}

//创建继续购票按钮
function createSubmitBtn() {
    var html = '';
    html += '<p style="color:#f57f8d;text-align:left;">*因票价变动频繁，请以实时查询报价为准</p>';
    html += '<div class="hnaui-btn hnaui-btn-primary return-btn click-btn">' + _i18n("FF04") + '</div>';
    html += '<div class="hnaui-btn hnaui-btn-theme submit-btn click-btn hnaui-btn-disabled">' + _i18n("FF05") + '</div>';

    $(".search-submit").html(html).show();
}