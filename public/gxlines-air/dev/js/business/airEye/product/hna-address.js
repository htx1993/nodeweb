//创建行程单DOM节点
function createAddressEl(){
    var html = '';
    try{
        html += '<div class="hnaui-panel market-panel hnaui-shadow hnaui-clear hnaui-address-market">';
        html += '   <div class="hnaui-panel-title"><span class="market-name">行程单</span></div>';
        html += '   <div class="hnaui-clear hnaui-content hnaui-panel-content  hnaui-user">';
        html += '       <div class="hnaui-left hnaui-img">';
        html += '           <img src="' + hna._img_host + '/images/product/facilities.png">';
        html += '       </div>';
        html += '       <div class="hnaui-right hnaui-info hnaui-form-pane address-info-form">';
        html += createCheckboxPanel([{"code":"ADDRESS","currency":"CNY","amount":"15","name":"行程单","priceId":"address"}]);
        html += createAddressFormEl();
        html += '       </div>';
        html += '   </div>';
        html += '</div>';
    }catch(e){
        JsErrorTips(ev);
        html = '';
    }
    return html;
}

function createAddressFormEl(){
    var html = '';
    try{
        var address = new AddressInfo();

        var o = {};
        for (var key in address) {
            if (address.hasOwnProperty(key)) {
                o[key] = {"eleType": key, "value": address[key]};
            }
        }
        o.receiveName.placeholder = "收件人姓名由长度为2到30个全汉字或者1到60个全字母组成";
        o.postCode.required = false;
        o.phone.required = false;
        o.email.required = false;

        html += '<div class="address-panel" style="display: none;">';
        html += createHiddenInputUm(o.id);
        html += createHiddenInputUm(o.userId);
        html += createInputElUm(o.receiveName);
        html += createSelectElUm(o.province);
        html += createSelectElUm(o.city);
        html += createSelectElUm(o.county);
        html += createInputElUm(o.address);
        html += createInputElUm(o.postCode);
        html += createInputElUm(o.mobile);
        html += createInputElUm(o.phone);
        html += createInputElUm(o.email);
        html += '</div>';
    }catch(e){
        JsErrorTips(ev);
        html = '';
    }
    return html;
}

//行程单事件初始化
function addressEventInit(){
    initInputUm();
    initSelectUm();
    initMobilePreData();

    hna.initProvince({"data": {}, "renderFun": renderSelectUm});
}

//获取行程单信息
function getAddressData(){
    if($(".hnaui-address-market").find("input[type='checkbox']:checked").length > 0){
        return new AddressInfo(hna.getFormParameter($(".address-panel")));
    }else{
        return "";
    }
}