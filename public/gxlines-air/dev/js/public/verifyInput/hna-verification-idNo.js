hna._i18nMap.addLanguages({
    "IDNO01":{"zh_CN":"输入的身份证号长度不对，或者号码不符合规定！15位号码应全为数字，18位号码末位可以为数字或X！","en_US":"The length of ID card you enterd is not correct or your input doesn't meet the requirements!All must be figures if the length is 15.The last character can be figure or X is the length is 18!"},
    "IDNO02":{"zh_CN":"输入的身份证号里出生日期不对！","en_US":"Date of birth information in the ID card is not correct!"},
    "IDNO03":{"zh_CN":"18位身份证的校验码不正确！","en_US":"Check codes of 18-length ID card is invalid!"},
    "IDNO04":{"zh_CN":"证件号码不能为空！","en_US":""},
    "IDNO05":{"zh_CN":"请输入正确的护照号码，护照号码仅支持字母，数字，长度2-30位！","en_US":""},
    "IDNO06":{"zh_CN":"请输入正确的军官证件号，军官证件号仅支持字母，数字，长度2-30位！","en_US":""},
    "IDNO07":{"zh_CN":"您的输入有误，证件号仅支持字母，数字，长度2-30位！","en_US":""}
});

//判断证件号码，如果是身份证，则自动生成生日
function VerificationIdNo(o){
    try{
        if(!o) {
            o = {};
        }
        var thisP = o.elem instanceof $ ? o.elem : $(o.elem);
        var thisRequired = thisP.attr("hna-required");
        var returnTips = "";
        if(!thisP.val()){
            if(o.flag=="submit") {
                if(thisRequired=="Y"){
                    returnTips = _i18n("IDNO04");
                }
            }else{
                returnTips = "null";
            }
        }else{
            var idType =  thisP.parents(".p-panel").find(".idType").find("option:selected").val();
            var reg = null;
            if(idType=="ID_CARD"){
                var obj = getBirthdayFormIdNo(thisP.val());
                var birthdayValue = "";
                if(obj.result==1){
                    //针对乘机人页面做的回调函数
                    if(hna.isFunction(o.callback)){
                        var oo = o.callback(obj, o.flag, thisP);
                        birthdayValue = oo.birthday;
                        returnTips = oo.tips;
                    }else{
                        birthdayValue = obj.birthday;
                    }
                }else{
                    returnTips = obj.birthday;
                    birthdayValue = "";
                }
                //给出生日期文本框赋值
                setBirthdayValue(thisP,birthdayValue);
            }else if(idType=="2.DOC"){
                //护照
                reg = hna.regex.cardNo;
                if (!((new RegExp(reg)).test(thisP.val()))) {
                    returnTips = _i18n("IDNO05");
                }
            }else if(idType=="MI_CARD"){
                //军官证
                reg = hna.regex.miCard;
                if (!((new RegExp(reg)).test(thisP.val()))) {
                    returnTips = _i18n("IDNO06");
                }
            }else {
                //其他证件
                reg = hna.regex.cardNo;
                if (!((new RegExp(reg)).test(thisP.val()))) {
                    returnTips = _i18n("IDNO07");
                }
            }
        }
        thisP.attr("isavailable",returnTips?"N":"Y");
        return returnTips;
    }catch(e){
        return JsErrorTips(e,"hnaer-no");
    }
}

//从身份证中获取出生日期
function getBirthdayFormIdNo(str){
    try{
        var birthday=IDCardCheck(str);
        var result= 0;
        if (birthday=="true") {
            birthday=str;
            var y,m,d;
            if(birthday.length>15){
                y = birthday.substring(6,10);
                m = birthday.substring(10,12);
                d = birthday.substring(12,14);
            }else{
                y = "19"+birthday.substring(6,8);
                m = birthday.substring(8,10);
                d = birthday.substring(10,12);
            }
            birthday=y+"-"+m+"-"+d;
            result=1;
        }
        return {"birthday":birthday,"result":result};
    }catch(e){
        return {"birthday":JsErrorTips(e),"result":0};
    }
}

//设置出生日期文本框的值
function setBirthdayValue(thisP,value){
    thisP = thisP instanceof $ ? thisP : $(thisP);
    var $birthday = thisP.parents(".p-panel").find("input[name='birthday']");
    $birthday.removeAttr("readonly").val(value||"").trigger("blur").attr("readonly","readonly");
}

//判断身份证号码的合法性
function IDCardCheck(num) {
    var restr="true";
    num = num.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
        return _i18n("IDNO01");
    }
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    //下面分别分析出生日期和校验位
    var len, re, arrSplit, dtmBirth, bGoodDay, arrInt, arrCh, nTemp, i;
    len = num.length;
    if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        arrSplit = num.match(re);

        //检查生日日期是否正确
        dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return _i18n("IDNO02");
        }
        else {
            //将15位身份证转成18位
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            nTemp = 0;
            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            return restr;
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        arrSplit = num.match(re);

        //检查生日日期是否正确
        dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return _i18n("IDNO02");
        }
        else {
            //检验18位身份证的校验码是否正确。
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var valnum;
            arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            nTemp = 0;
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                return _i18n("IDNO03");
            }
            return restr;
        }
    }
    return restr;
}
