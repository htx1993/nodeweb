//*********************************页面创建DOM***************************************//
//初始化页面element
function createInitEl() {
    try {
        _sInfo = getSearchFlightInfo();
        createSubmitBtn();
        initPassengerData();
    } catch (e) {
        JsErrorTips(e);
    }
}
//创建继续购票按钮
function createSubmitBtn() {
    try {
        var html = '';
        html += '<button class="hnaui-btn hnaui-btn-theme submit-btn click-btn" hna-submit hna-filter="formPassenger">' + _i18n("P06") + '</button>';
        if (_sInfo.isDomestic == "N") {
            html += '<button class="hnaui-btn hnaui-btn-theme submit-btn choose-seat click-btn" hna-submit hna-filter="formPassenger" style="margin-right: 15px;">先去选择座位</button>';
        }
        $(".search-submit").html(html);
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}

//创建乘机人信息面板
function createSearchResult() {
    try {
        var html = "";
        html += createSelectPassengerPanel();
        _sInfo.guestTypes.forEach(function (item, index) {
            var flag = item.code.toUpperCase() || "ADT";
            for (var b = 0, b1 = item.amount; b < b1; b++) {
                html += getPassengerPanelEl(flag);
            }
        });
        html += createBtnList();
        html += createPanel(_userInfo);
        html += '<div id="couponPanel" style="display: none;"></div>';
        html += createAttentionPanel();
        html += createHiddenInput();
        $(".search-result").html(html).show();
        $(".search-loading").hide();
        $(".search-submit").show();

        getAttentionHtml();

        initPanelIndex();
        initElement();
        initDate();
        initSelect();
        initCheckbox();
        initInput();
        initSubmit();
        initCountryData();
        initMobilePreData();
        renderFrom();
    } catch (e) {
        JsErrorTips(e);
    }
}
//获取一个乘机人面板的html
function getPassengerPanelEl(passType) {
    if (!passType) {
        return "";
    }
    try {
        var travellerInfo = new Traveller({passType: passType.toUpperCase()});
        travellerInfo.saveToAirU = "Y";
        if (_sInfo.isDomestic == "N") {
            //如果是国际航班，则证件类型默认设置为护照
            travellerInfo.idType = "2.DOC";
        }
        return createPanel(travellerInfo);
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}
//创建面板p-panel
function createPanel(info) {
    if (!info) {
        info = {};
    }
    try {
        info.passType = info.passType.toLowerCase();
        var html = '<div class="p-panel hnaui-shadow ' + (info.passType || "") + '">';
        html += createPanelHead(info);
        html += createPanelBody(info);
        html += '<input type="hidden" name="passType" value="' + info.passType.toUpperCase() + '">';
        html += '<input type="hidden" name="countryType" value="' + (_sInfo.isDomestic == "Y" ? "0" : "1") + '">';
        html += '</div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}
//创建面板头部
function createPanelHead(info) {
    if (!info) {
        info = {};
    }
    try {
        info.passType = info.passType.toUpperCase();
        var typeName = _i18n("P07");
        var ruleTitle = "";
        if (info.passType == "ADT") {
            typeName = _i18n("P08");
            ruleTitle = "姓名填写规则";
        }
        else if (info.passType == "CNN") {
            typeName = _i18n("P09");
            ruleTitle = "儿童购票说明";
        }
        else if (info.passType == "INF") {
            typeName = _i18n("P10");
            ruleTitle = "婴儿购票说明";
        }
        else if (info.passType == "CONTACTS") {
            typeName = _i18n("P11");
            ruleTitle = "联系人填写说明";
        }
        var html = '<div class="p-panel-heading hnaui-clear">';
        if (info.passType == "CONTACTS") {
            html += '<div class="p-panel-title"><span class="p-index hnaui-icon">&#xe905;</span><strong>' + typeName + '</strong></div>';
            html += '<span class="rule-font">' + ruleTitle + '<div class="hnaui-shadow hnaui-rule-box"><div class="content">' + getPassengerRuleInfo(info.passType).info + '</div></div></span>';
        } else {
            html += '<div class="p-panel-title"><span class="p-index"></span><strong>' + typeName + '</strong></div>';
            //html += '<span class="hnaui-title-font">' + typeName + '</span>';
        }
        if (info.passType == "ADT" || info.passType == "CNN" || info.passType == "INF") {
            html += '<span class="rule-font">' + ruleTitle + '<div class="hnaui-shadow hnaui-rule-box"><div class="content">' + getPassengerRuleInfo(info.passType).info + '</div></div></span>';
            //html += '<div class="hnaui-shadow hnaui-rule-box"><div class="content">' + getPassengerRuleInfo(info.passType).info + '</div></div>';
            html += createRemoveBtn();
            //html += '<a href="javascript:;" onclick="return false" class="p-panel-toggle click-btn"><i class="hnaui-icon up">&#xe619;</i><i class="hnaui-icon down">&#xe61a;</i></a>';
        }
        html += '</div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}
//创建面板body
function createPanelBody(info) {
    if (!info) {
        info = {};
    }
    try {
        info.passType = info.passType.toUpperCase();
        var html = '<div class="p-panel-body">';
        html += '<div class="hnaui-form-item">';
        html += '<div class="row">';
        html += '<ul class="hnaui-position hnaui-error-box">';
        html += '</ul>';

        var o = {};
        for (var key in info) {
            if (info.hasOwnProperty(key)) {
                o[key] = {"eleType": key, "value": info[key]};
            }
        }
        html += '<input type="hidden" name="id" value="' + o.id.value + '">';
        var objTitle = getInputTitleByIdNo(o.idType.value, info.passType);
        o.firstName.title = objTitle.firstNameTitle;
        o.lastName.title = objTitle.lastNameTitle;
        o.idNo.title = objTitle.idNoTitle;

        //因为添加限制，儿童的证件类型里面不能有军官证
        o.idType.passType = info.passType;

        if (_sInfo.isDomestic == "Y") {
            //国内乘机人
            if (info.passType == "ADT" || info.passType == "CNN") {
                html += createInputEl(o.lastName);
                html += createInputEl(o.firstName);
                html += createInputEl(o.mobile);

                html += createSelectEl(o.idType);
                html += createInputEl(o.idNo);
                html += createInputEl(o.birthday);

                html += createSaveToAirUEl(info.saveToAirU);
                if (info.passType == "ADT") {
                    html += createSaveContactEl();
                }
            } else if (info.passType == "INF") {
                html += createInputEl(o.lastName);
                html += createInputEl(o.firstName);
                html += createInputEl(o.mobile);

                html += createInputEl(o.birthday);
                o.mobile.required = false;
                //html += createSaveToAirUEl(info.saveToAirU);
                //html += createSaveToAirUEl(info.saveToAirU);
            }
        } else {
            //国际乘机人
            if (info.passType == "ADT" || info.passType == "CNN") {
                html += createInputEl(o.lastName);
                html += createInputEl(o.firstName);
                html += createSelectEl(o.sex);

                html += createSelectEl(o.idType);
                html += createInputEl(o.idNo);
                html += createInputEl(o.birthday);

                html += createSelectEl(o.country);
                html += createSelectEl(o.cardIssueCountry);
                html += createInputEl(o.cardValidDate);

                html += createInputEl(o.mobile);
                //html += '<div class="input-icon hnaui-seat">  </div>';
                html += createSaveToAirUEl(info.saveToAirU);
                if (info.passType == "ADT") {
                    html += createSaveContactEl();
                }
            }
        }
        if (info.passType == "CONTACTS") {
            o.lastName.passType = "CONTACTS";
            o.firstName.passType = "CONTACTS";
            //不注册 直接手机登录  联系人姓和名 到乘机人过滤
            var reg = /^([A-Za-z\s]|[\u4E00-\u9FA5])+$/;
            if (!reg.test(o.firstName.value) || !reg.test(o.lastName.value)) {
                o.firstName.value = "";
                o.lastName.value = "";
            }
            html += createInputEl(o.lastName);
            html += createInputEl(o.firstName);
            //html += '<div class="input-icon hnaui-seat" >  </div>';
            html += createInputEl(o.mobile);
            html += createInputEl(o.email);
            //html += '<div class="hnaui-contact" >' + getPassengerRuleInfo(info.passType).info + '</div>';
        }

        html += '</div>';
        html += '</div>';
        html += '</div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}
/*选择常用乘机人*/
function createSelectPassengerPanel() {
    var html = '';
    try {
        html += '<div class="p-panel hnaui-shadow hnaui-passenger-box">';
        html += '<p class="p-panel-title"><span class="p-index hnaui-icon">&#xe911;</span><strong>常用<br/>旅客</strong></p>';
        if (_TravellersAdt.length > 0 && _sInfo.guestTypes[0].amount > 0) {
            html += createPassengerLiEl({"title": "成人", "arrData": _TravellersAdt, "claStr": "p-adt"});
        }
        if (_TravellersCnn.length > 0 && _sInfo.guestTypes[1].amount > 0) {
            // if(_TravellersAdt.length > 0){
                 //html += '<p class="hnaui-select-line"></p>';
            // }
            html += createPassengerLiEl({"title": "儿童", "arrData": _TravellersCnn, "claStr": "p-cnn"});
        }
        if (_TravellersInf.length > 0 && _sInfo.guestTypes[2].amount > 0) {
           // if((_TravellersCnn.length > 0 && _sInfo.guestTypes[1].amount > 0) || _TravellersAdt.length >0){
                //html += '<p class="hnaui-select-line"></p>';
           // }
            html += createPassengerLiEl({"title": "婴儿", "arrData": _TravellersInf, "claStr": "p-inf"});
        }
        html += '<button class="hnaui-btn  re-search-btn click-btn">' + _i18n("P05") + '</button>';
        if (_TravellersAdt.length < 1) {
            html += '<div class="hnaui-select-box hnaui-clear"><h3>您还没有维护常用乘机人！</h3></div>';
        }
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
function createPassengerLiEl(o) {
    if (!o) {
        o = {};
    }
    var html = '';
    try {
        html += '<div class="hnaui-select-box hnaui-clear">';
        html += '   <h3 >' + (o.title) + '</h3>';
        html += '<ul>';
        (o.arrData || []).forEach(function (item, index) {
            html += '  <li class="click-btn select-passenger hnaui-elip ' + (o.claStr || "") + '" data-index="' + index + '">' + (item.fullName) + '<i class="hnaui-icon">&#xe618;</i></li>';
        });
        html += '</ul>';
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
function createSaveToAirUEl(value) {
    var html = '';
    try {
        if (_Travellers.length < 10) {
            html += '<div class="input-icon">';
            html += '   <input type="checkbox" name="saveToAirU" value="' + (value) + '" title="' + _i18n("P13") + '" hna-skin="primary">';
            html += '</div>';
        } 
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
function createSaveContactEl() {
    var html = '';
    try {
        html += '<div class="input-icon ">';
        html += '   <input type="checkbox" name="saveContact"  title="' + _i18n("P12") + '" hna-skin="primary" hna-filter="synchroContacts">';
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建文本输入框控件
function createInputEl(obj) {
    try {
        var o = new ControlElem(obj);
        o.required = o.required === false ? false : true;

        if (o.eleType == "firstName" || o.eleType == "lastName") {
            o.verify = "Pname";
        } else if (o.eleType == "birthday" || o.eleType == "cardValidDate") {
            o.classStr += " p-date";
        } else if (o.eleType == "mobile") {
            o.title = _i18n("P15");
        }

        for (var a = 0, a1 = _verificationElemList.length; a < a1; a++) {
            var item = _verificationElemList[a];
            if (item.type == o.verify) {
                if (!o.title) {
                    o.title = (item.title || "") + (item.format ? "（" + item.format + "）" : "");
                }
                if (!o.maxLen || item.maxLen != 50) {
                    o.maxLen = item.maxLen || "";
                }
                if (!o.icon) {
                    o.icon = item.icon || "";
                }
                break;
            }
        }

        var html = '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 input-icon">';
        var mobileCla = "";
        if (hna.hasMobilePre && o.eleType == "mobile") {
            html += createMobilePreEl();
            mobileCla = " hnaui-mobile-next";
        }
        html += '       <div class="hnaui-input-inline ' + mobileCla + '">';
        html += _createStandardInputEl(o, true);
        html += '       </div>';
        html += '   </div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}
//创建下拉框控件
function createSelectEl(obj) {
    try {
        var o = new ControlElem(obj);
        o.required = o.required === false ? "N" : "Y";

        if (o.eleType == "idType") {
            if (_sInfo.isDomestic != "Y") {
                o.dataArr = [_idTypeList[1]];
            } else {
                if (o.passType == "CNN" || o.passType == "INF") {
                    var arr = hna.cloneObj(_idTypeList);
                    arr.splice(2, 1);
                    o.dataArr = arr;
                }
            }

        }

        for (var a = 0, a1 = _verificationElemList.length; a < a1; a++) {
            var item = _verificationElemList[a];
            if (item.type == o.verify) {
                if (!o.title) {
                    o.title = item.title;
                }
                if (!o.dataArr || o.dataArr.length == 0) {
                    o.dataArr = item.dataArr;
                }
                break;
            }
        }

        var html = '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 input-icon">';
        html += '<div class="hnaui-input-inline">';
        html += '<select hna-filter="' + o.verify + '" name="' + o.name + '" class="' + o.classStr + '" hna-required="' + o.required + '" hna-title="' + o.title + '" hna-search>';
        if (o.eleType == "nameList") {
            html += '<option value="">' + _i18n("P17", o.title) + '</option>';
        }else{
            html += '<option value=""></option>';
        }
        (o.dataArr).forEach(function (item, index) {
            if (item.code) {
                html += '<option value="' + (item.code || "") + '" ' + (o.value == item.code ? "selected" : "") + ' data-index="' + (index || "0") + '">' + (item.name || "") + '</option>';
            }
        });
        html += '</select>';
        html += '</div>';
        html += '</div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}
//创建注意事项面板
function createAttentionPanel() {
    var html = '<div class="p-panel hnaui-panel hnaui-shadow flight-attention-panel">';
    html += '        <div class="hnaui-panel-title">';
    html += '           <span class="title">' + _i18n("P18") + '</span>';
    html += '        <ul class="hnaui-attention">';
    html += '           <li><a class="service-terms click-btn hnaui-attention-active" data-href="/airR/passengerService/planeTicket/domesticTransportConditions.html"  href="javascript:;">' + _i18n("P20") + '</a></li>';
    html += '           <li><a class="service-terms click-btn" data-href="/airR/passengerService/securityNotice/lithiumBattery.html"  href="javascript:;">' + _i18n("P19") + '</a></li>';
    html += '           <li><a class="service-terms click-btn" data-href="/airR/passengerService/planeTicket/ticketNotes.html"  href="javascript:;">' + _i18n("P21") + '</a></li>';
    html += '           <li><a class="service-terms click-btn" data-href="/airR/passengerService/planeTicket/refundNotes.html"  href="javascript:;">' + _i18n("P22") + '</a></li>';
    html += '           <li><a class="service-terms click-btn" data-href="/airR/passengerService/planeTicket/specialPassenger.html"  href="javascript:;">' + _i18n("P47") + '</a></li>';
    html += '           <li><a class="service-terms click-btn" data-href="/airR/passengerService/planeTicket/abnormalFlightServicer.html"  href="javascript:;">' + _i18n("P48") + '</a></li>';
    html += '        </ul>';
    html += '        </div>';
    html += '        <div class="hnaui-panel-content">';
    html += '           <div class="hnaui-panel-box">';
    html += '               <div class="hnaui-attention-content"></div>';
    html += '           </div>';
    html += getSearchLoadingEl();
    html += '        </div>';
    html += '        <div class="hnaui-panel-footer">';
    html += '           <input type="checkbox" name="confirmBox" title="' + _i18n("P23") + '" hna-skin="primary">';
    html += '       </div>';
    html += '<div>';
    return html;
}

//加载注意事项里面的文本
function getAttentionHtml(o) {
    if (!o) {
        var $li = $(".service-terms").first();
        o = {"title": $li.text(), "href": $li.data("href")};
    }
    $(".flight-attention-panel .search-loading").show();
    hna.ajax({
        type: "GET",
        url: o.href,
        resourcesType: "static",
        dataType: "html",
        doneCallback: function (data) {
            var html = '<div class="hna-info">' + data.format(_tel, hna._img_host) + '</div>';
            $(".hnaui-attention-content").html(html);
            $(".flight-attention-panel .search-loading").hide();
        }
    });
}
//创建乘机人表单里面的隐藏域
function createHiddenInput(o) {
    try {
        if (!o) {
            o = {};
        }
        var html = '';
        html += '<input type="hidden" name="offerId" value="">';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}

//创建添加成人3、儿童2、婴儿1按钮组
function createBtnList() {
    if (!!btnHas) {
        var html = '<div class="hnaui-panel hnaui-shadow hnaui-push-right">';
        html += '       <button class="hnaui-btn hna-add-adt click-btn"><i class="hnaui-icon">&#xe61f;</i>' + _i18n("P24") + '</button>';
        html += '       <button class="hnaui-btn hna-add-cnn click-btn"><i class="hnaui-icon">&#xe61f;</i>' + _i18n("P25") + '</button>';
        html += '       <button class="hnaui-btn hna-add-inf click-btn"><i class="hnaui-icon">&#xe61f;</i>' + _i18n("P26") + '</button>';
        html += '    </div>';

        return html;
    } else {
        return ' ';
    }
}
//删除乘机人按钮
function createRemoveBtn() {
    if (!!btnHas) {
        var html = '<a href="javascript:;" onclick="return false" class="hnaui-remove-traveller click-btn"><i class="hnaui-icon">&#x2716;</i></a>';
        return html;
    } else {
        return ' ';
    }
}