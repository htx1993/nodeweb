hna = window.hna || {};
hna._i18nMap=(function($){
    window.hna = window.hna || {};
    hna._lang_type= hna._store.getStore(hna.langTypeStoreKey) || hna._lang_type;
    var languages={
        "none":{"zh_CN":"没有找到提示语","en_US":"No hints found"},
        "close":{"zh_CN":"关闭","en_US":"Close"},
        "confirm":{"zh_CN":"确认","en_US":"Confirm"},
        "cancel":{"zh_CN":"取消","en_US":"Cancel"},
        "prompt":{"zh_CN":"提示","en_US":"Prompt"},
        "failed": {"zh_CN": "操作失败","en_US": "Failed"},
        "illegal": {"zh_CN": "您输入的内容中包含非法字符，请重新输入！", "en_US": "The content you entered contains illegal characters. Please re-enter!"},

        "B01":{"zh_CN":"请选择出发城市","en_US":"Please choose the starting city"},
        "B02":{"zh_CN":"请选择到达城市","en_US":"Please select the city"},
        "B03":{"zh_CN":"出发城市和到达城市不能相同!","en_US":"Departure and arrival of the city can not be the same!"},
        "B04":{"zh_CN":"请选择出发日期","en_US":"Please select departure date"},
        "B05":{"zh_CN":"请选择返回日期","en_US":"Please select a return date"},
        "B06":{"zh_CN":"您输入的出发城市没有航班!","en_US":"You enter the departure city without flights！"},
        "B07":{"zh_CN":"您输入的到达城市没有航班!","en_US":"You entered the city without flight!"},

        "B08":{"zh_CN":"错误提示","en_US":"Error prompt"},
        "B09":{"zh_CN":"操作失败！数据不存在!","en_US":"Operation failed! Data does not exist!"},
        "B10":{"zh_CN":"操作失败，请重新操作!","en_US":"Operation failed, please restart!"},
        "B11":{"zh_CN":"服务异常，请稍后再试","en_US":"Service exception, please try again later"},

        "B12":{"zh_CN":"人机验证","en_US":"Service exception, please try again later"},
        "B13":{"zh_CN":"验证通过","en_US":"Service exception, please try again later"},
        "B14":{"zh_CN":"请先拖动滑块，完成拼图","en_US":"Service exception, please try again later"},
        "B15":{"zh_CN":"请输入可用的手机号码","en_US":"Service exception, please try again later"},

        "RMB":{"zh_CN":"人民币","en_US":"RMB"},
        "dollar":{"zh_CN":"美元","en_US":"Dollar"}
    };

    var languagesHtml = {
        "defaultH":[],
        "all":[]
    };

    function resetLangType(){
        hna._lang_type= hna._store.getStore(hna.langTypeStoreKey) || hna._lang_type;
        if(!languages.none[hna._lang_type]){
            hna._lang_type="zh_CN";
        }
    }

    function getEn(key,args){
        try{
            var o=languages[key] || {};
            resetLangType();
            var str = o[hna._lang_type];
            if(str==""){
                str = "The corresponding English is empty！";
            }else if(str==undefined){
                str = languages.none[hna._lang_type];
            }
            if(args) {
                str = str.format(args);
            }
            return str;
        }catch(e){
            JsErrorTips(e);
            return "";
        }
    }
    //提示语合并到languages里面，每个页面有自己独有的提示语，可以写在各个页面自己的业务js里面，然后通过这个方法合并起来
    function addLanguages(obj){
        languages = $.extend({},languages,obj);
    }

    return {
        getEn:getEn,
        addLanguages:addLanguages
    };

})(jQuery);

window._i18n = function(key, args){
    return hna._i18nMap.getEn(key,args);
};
//function _i18n(key, args){
//    return hna._i18nMap.getEn(key,args);
//};