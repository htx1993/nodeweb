//查看航班信息
function viewFlight(flightNumber, marketingAirline, departureDate, departureAirport, arrivalAirport) {
    var data = {
        "flightNumber": flightNumber,
        "marketingAirline": marketingAirline,
        "departureDate": departureDate,
        "departureAirport": departureAirport,
        "arrivalAirport": arrivalAirport
    };
    try {
        var html = '<div class="view-flight hnaui-clear">';
        html += '<div class="view-content">';
        html += '<p class="tips"><i class="hnaui-icon hnaui-anim hnaui-anim-rotate hnaui-anim-loop loading-icon">&#xe63e;</i>' + _i18n("F12") + '</p></div>';
        html += '</div>';
        hnaer.open({
            type: 1,
            content: html,
            area: ['680px', ''],//470
            title: false,
            //btn: [_i18n("close")],
            yes: function (index) {
                hnaer.close(index);
            },
            success: function (hnaero, index) {
                getFlightDetails(data,hnaero, index);
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}
//获取航班详情的数据
function getFlightDetails(info,hnaero, index){
    hna.ajax({
        url: ajaxUrl.getFlightDetails,
        data: info,
        doneCallback: function (data) {
            if (data && data.code == "200" && data.data) {
                if (!data.data.flightNumber) {
                    $(hnaero).find(".view-flight").html('<div class="view-content"><p class="tips">' + ( _i18n("F51") + info.marketingAirline + flightNumber + _i18n("F52")) + '</p></div>');
                    return;
                }
                $(hnaero).find(".view-flight").html(createFlightDetailEl(data.data));
            } else {
                $(hnaero).find(".view-flight").html('<div class="view-content"><i class="hnaui-icon error-icon">ဇ</i><p class="tips">' + (data.message || _i18n("B11")) + '</p></div>');
            }
        },
        failCallback: function (data) {
            $(hnaero).find(".view-flight").html('<div class="view-content"><i class="hnaui-icon error-icon">ဇ</i><p class="tips">' + _i18n("B11") + '</p></div>');
        }
    });
}
function createFlightDetailEl(obj){
    var html = '';
    try{
        var ttTime = handleMinte(obj.tripDuration);
        var tfTime = handleMinte(obj.flightDuration);
        var dpTime = handleMinte(obj.groundDuration);

        obj.departureAirport = getCityNameByCode(obj.flightLeg[0].departureAirport,"name");
        obj.arrivalAirport = getCityNameByCode(obj.flightLeg[obj.flightLeg.length-1].arrivalAirport,"name");
        obj.depDateInfo = hna._date.getDateInfo(obj.flightLeg[0].departureDate);
        obj.flightNumber = (obj.marketingAirline || hna._code ) + (obj.flightNumber || "");

        html += '<div class="view-flight-details">';
        html += '   <div class="flightInfo-stroke">';
        html += '   <h3 class="hnaui-shadow">' + obj.flightNumber + '&nbsp;'+ _i18n("F20") + '</h3>';
        html += '       <p><span>'+ _filterAirLine(obj.marketingAirline || "") + '</span><span>' + (obj.flightNumber || "") + '</span><span>' + (obj.depDateInfo.date || "") + ' ' + (obj.depDateInfo.week || "") + '<b>出发</b></span></p>';
        html += '       <p>' + (obj.departureAirport || "") + '<em></em>' + (obj.arrivalAirport || "") + '</p>';
        html += '       <p><span>总行程时间：' + (ttTime || "") + '</span><span>总飞行时间：' + (tfTime || "") + '</span><span>总地面停留时间：' + (dpTime || "") + '</span></p>';
        html += '   </div>';
        html += '   <ul class="flightInfo-detail">';
        var segments = obj.flightLeg || [];
        for (var a = 0, a1 = segments.length; a < a1; a++) {
            html += '<li>';
            html +=     '<p>';
            var depDateInfo = hna._date.getDateInfo(segments[a].departureDate);
            html +=         '<span>起飞：' + getCityNameByCode(segments[a].departureAirport || "") +"&emsp;"+ (depDateInfo.date || "") + '&emsp;' + (depDateInfo.week || "") + '&emsp;' + (depDateInfo.shortTime || "") + '</span>';
            html +=         '<br>';
            var arrDateInfo = hna._date.getDateInfo(segments[a].arrivalDate);
            html +=         '<span>降落：' + getCityNameByCode(segments[a].arrivalAirport || "") +"&emsp;"+ (arrDateInfo.date || "") + '&emsp;' + (arrDateInfo.week || "") + '&emsp;' + (arrDateInfo.shortTime || "") + '</span>';
            html +=         '<br>';
            html +=         '<span class="plantype">机型：' + (segments[a].aircraftName || "") + '</span>';
            html +=     '</p>';
            html += '</li>';
        }
        html += '   </ul>';
        html += '</div>';
    }catch(e){
        JsErrorTips(e);
        html = '';
    }
    return html;
}

//查看机型图
function viewModels(data) {
    try {
        if (!_searchBoxConfig.flightModelSwitch) {
            return;
        }
        var html = '<div class="view-flight hnaui-clear">';
        html += '<div class="view-content"><i class="hnaui-icon hnaui-anim hnaui-anim-rotate hnaui-anim-loop loading-icon">&#xe63e;</i>';
        html += '<p class="tips">' + _i18n("F53") + '</p></div>';
        html += '</div>';
        hnaer.open({
            type: 1,
            content: html,
            area: ['580px', ''],
            title:false,
            //btn: [_i18n("close")],
            yes: function (index) {
                hnaer.close(index);
            },
            success: function (hnaero, index) {
                delayFlightModel(data, hnaero);
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}

//机型图图片懒加载
function delayFlightModel(num, o) {
    var src = hna._img_host + '/images/flightModel/flightModel_' + num + '.jpg';//图片加载的路径
    _imgLoad(src, function () {
        var html = '<div class="hna-viewmodels">';
        html += '<h3>' + _i18n("F11") + ':' + num + '</h3>';
        html += '<img src="' + src + '">';
        html += '</div>';
        $(o).find(".view-flight").html(html);
    }, function () {
        var html = '<div class="hna-viewmodels no-planeimg">';
        html += '<p><span class="hnaui-icon">&#xe60b;</span> '+ _i18n("F54") +'</p>';
        html += '</div>';
        $(o).find(".view-flight").html(html);
    });
}