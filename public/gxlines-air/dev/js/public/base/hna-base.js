/* Copyright (c) 2010-2016 Marcus Westin */
var hna = window.hna || {};

hna._hash = hna.randomWord() || "";

window.JsErrorTips = function (e, flag) {
    if (!flag) {
        //e = ((typeof (e) == "object") ? JSON.stringify(e) : e) + "";
        if (hnaer && hna._env != "production") {
            console.log(e);
            hnaer.open({
                title: "页面JS错误信息",
                content: e
            });
        }
    }

    return "页面JS错误信息:" + e;
};

function _isPC() {
    return !/Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(navigator.userAgent);
}

//页面跳转
function goToPage(url) {
    //hna.loading();
    window.top.location.href = hna._server_host + (url || "/");
}

//航班城市机场数据
var _flightCityData = [];
function getCityNameByCode(code, filed) {
    if (!filed) {
        filed = "name";
    }
    var flightLen = (_flightCityData || []).length;
    for (var a = 0, a1 = flightLen; a < a1; a++) {
        var item = _flightCityData[a];
        if (item.code == code) {
            return item[filed] || "";
        }
    }
    return "";
}


//全局电话号码
var _tel = "95370";
//全局的表单元素控件对象
var globalFrom = null;
//全局的常用元素控件对象
var globalElement = null;
//全局的日期控件对象
var globalDate = null;
//重新渲染from
function renderFrom() {
    if (!hna.isPC()) {
        $(".p-city,.p-date").attr("readonly", "readonly");
    }

    if (globalFrom) {
        globalFrom.render();
    } else {
        globalFrom = hnaui.form();
    }
    placeholderCompatibleEl();
}
function initElement() {
    if (globalElement) {
        globalElement.init();
    } else {
        globalElement = hnaui.element();
        globalElement.init();
    }
}


function _placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}
//input placeholder 兼容
function placeholderCompatibleEl() {
    // 判断浏览器是否支持 placeholder
    if (!_placeholderSupport()) {
        //默认遍历循环添加placeholder
        $('input.hnaui-input').each(function () {
            var $this = $(this);
            var thisV = $this.val();
            var thisPlaceHolder = $this.attr('placeholder');
            //  if (thisPlaceHolder && $this.parents(".hnaui-placeholder").length <= 0) {
            if (thisPlaceHolder) {
                var $parent = $this.parent();
                $parent.find(".placeholder").remove();
                $this.before('<span class="placeholder" style="display:' + (thisV ? "none" : "block") + ';">' + thisPlaceHolder + '</span>');
            }
        });

    }
}
function placeholderCompatibleEvent() {
    // 判断浏览器是否支持 placeholder
    if (!_placeholderSupport()) {
        $(document).on("blur", "input.hnaui-input", function () {
            var $this = $(this);
            //如果当前值不为空，隐藏placeholder
            $this.parent().find('span.placeholder').toggle(!($this.val()));
        });
        $(document).on("focus", "input.hnaui-input", function () {
            $(this).parent().find('span.placeholder').hide();

        });
        $(document).on("focus", "span.placeholder", function () {
            var $this = $(this);
            $this.hide();
            $this.siblings("input.hnaui-input").focus();
        });
    }
}

function _pointerEventsSupport() {
    var dummy = document.createElement('i');
    return 'pointerEvents' in dummy.style;
}
//处理IE9，8中样式不支持 pointer-event,只针对hnaui-icon这类的字体图标
function pointerEventsCompatibleEvent() {
    if (!_pointerEventsSupport()) {
        $(document).on("click mouseover", ".hnaui-icon", function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            $(this).parent().trigger(evt.type);
        });
        $(document).on("click", ".hnaui-input-title", function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            $(this).parent().find("input.hnaui-input").focus();
        });
    }
}

//根据币别code获取币别信息
function _getCurrencyInfo(currencyCode) {
    if (currencyCode) {
        currencyCode = (currencyCode + "").toUpperCase();
    }
    var currencySymbolList = {
        "CNY": {"symbol": "￥", "name": {"zh_CN": "人民币", "en_US": "RMB"}},
        "USD": {"symbol": "$", "name": {"zh_CN": "美元", "en_US": "Dollar"}}
    };
    var thisCurrencyCode = hna._currency.code;
    if (currencyCode) {
        for (var key in currencySymbolList) {
            if (currencySymbolList.hasOwnProperty(key)) {
                if (key == currencyCode) {
                    thisCurrencyCode = currencyCode;
                }
            }
        }
    }
    return {
        "symbol": currencySymbolList[thisCurrencyCode].symbol || "￥",
        "name": currencySymbolList[thisCurrencyCode].name[hna._lang_type] || "人民币",
        "code": thisCurrencyCode
    };
}
//格式化金额hna.toFixed
function _formatMoney(str, code, n) {
    var _currency = hna._currency.symbol || "￥ ";
    if (code) {
        _currency = (_getCurrencyInfo(code)).symbol;
    }
    try {
        if(n == -1){
            str = _currency + ((str || "0") + "").toSeparate();
        }else {
            str = _currency + (hna.toFixed(((str || "0") + "") || "",n)).toSeparate();
        }
    } catch (e) {
        JsErrorTips(e);
    }
    return str;
}
function _formatMoneyInfo(str, code, n) {
    var _currency = hna._currency.symbol || "￥ ";
    if (code) {
        _currency = (_getCurrencyInfo(code)).symbol;
    }
    try {
        str = str || "0";
    } catch (e) {
        JsErrorTips(e);
    }
    return {
        "currency": _currency,
        "money": str
    };
}


//图片加载的封装
function _imgLoad(src, doneCallback, failCallback) {
    //创建一个图片对象;
    var imgObj = new Image();
    //图片对象的路径赋值;
    imgObj.src = src;
    //图片加载完成
    imgObj.onload = function () {
        if (hna.isFunction(doneCallback)) {
            doneCallback();
        }
    };
    //图片加载失败
    imgObj.onerror = function (err) {
        if (hna.isFunction(failCallback)) {
            failCallback(err);
        }
    };
}

$(function () {
    placeholderCompatibleEvent();
    pointerEventsCompatibleEvent();
    $(".home-block>.content").addClass("finish-loading");

    //头部的语言切换
    hna._lang_type = $("#langType").val() || hna._lang_type;
    hna._store.setStore(hna.langTypeStoreKey, hna.lang_type);

    //获取全局的币别
    hna._currency.code = $("input[type='hidden'][name='currencyCode']").val() || "CNY";
    hna._currency = _getCurrencyInfo();

    //头部select初始化
    globalFrom = hnaui.form();
    globalFrom.on('select(langType)', function (data) {
        //console.log(data);
    });

    //右侧固定悬浮菜单栏
    var fixbarHtml = '<ul class="hnaui-fixbar fixbar-btnlist-right">';
    fixbarHtml += '<li  >';
    fixbarHtml += ' <a class="hna-tooltip"  data-class=" tip-weixin-img" data-title="<img src=' + hna._img_host + '/images/portal/weChat.jpg>" style="display:list-item;"><i class="hnaui-wechat" hna-type="top" ></i></a>';
    fixbarHtml += '</li>';
    fixbarHtml += '<li>';
    fixbarHtml += ' <a class="hna-tooltip" data-class=" tip-left" data-title="官方微博" href="https://weibo.com/bbwair" target="_blank" style="display:list-item;"><i class="hnaui-weibo"></i></a>';
    fixbarHtml += '</li>';
    fixbarHtml += '<li>';
    fixbarHtml += ' <a class="hna-tooltip"  data-class="tip-left" href="https://fltnet.hnair.net/crew/pub/complaint/cbg.do?locale=zh_CN" target="_blank" data-title="投诉建议" style="display:list-item;"><i class="hnaui-suggestion" hna-type="top"></i></a>';
    fixbarHtml += '</li>';
    fixbarHtml += '<li>';
    fixbarHtml += ' <a class="hna-tooltip"  href="https://ucc.hnair.com/JtalkManager/echatNew.do?companyPk=ff8080815ca3cd2d015ccdafc1037ac9&codeKey=8" target="_blank" data-class="tip-left" data-title="人工客服" style="display:list-item;"><i class="hnaui-service" hna-type="top"></i></a>';
    fixbarHtml += '</li>';
    fixbarHtml += '<li>';
    fixbarHtml += ' <a class="hnaui-fixbar-top hna-tooltip"   data-class="tip-left" data-title="回到顶部" style="display: none;"><i class="hnaui-icon" hna-type="top" >&#xe604;</i></a>';
    fixbarHtml += '</li>';
    fixbarHtml += '</ul>';
    $("body").append(fixbarHtml);
    $(document).on("click", ".fixbar-btnlist-right", function (e) {
        e.stopPropagation();
        var $this = $(e.target);
        if ($this.hasClass("hnaui-fixbar-top")) {
            hna.goToTop();
        }
    });
    $(window).on('scroll', function () {
        $(".hnaui-fixbar-top").toggle(hna.getBodySizeInfo().top > 200);

    });

    // 端导航菜单
    $(".hna-nav li").on("click", function () {
        $(this).addClass('hnaui-this').siblings().removeClass('hnaui-this');
    });

    $(".hna-menu").on("click", function () {
        var hna_firstli = $('.hnaui-nav-child:first').parents('li');
        $('.hnaui-nav-child:first').addClass('hnaui-show hnaui-anim hnaui-anim-upbit');
        hna_firstli.addClass('hnaui-this');
        $('.hna-nav').toggle();
        if (hna_firstli.hasClass('hnaui-this')) {
            $(".hna-nav li").not(hna_firstli).removeClass('hnaui-this');
        }
        if ($('.hna-nav').is(':visible')) {
            $(this).html('&#x2716;');
            $(document.body).addClass("html-body-overflow");
        }
        else {
            $(this).html('&#xe920;');
            $(document.body).removeClass("html-body-overflow");
        }
        $(".hna-nav li").on("click", function () {
            $(this).children('dl').addClass('hnaui-show');
            $(".hna-nav li").children('dl').not($(this).children('dl')).removeClass('hnaui-show');
        });

    });
    //移动登录用户中心
    $('.hnaui-btn-icon').on("click", function (e) {
        e.stopPropagation();
        $(this).next('p').toggle();
    });
    if (!hna.isPC()) {
        $(document).on("click", function () {
            $('.hnaui-btn-icon').parent().children('p').hide();
        });
    }

    //footer 二维码
    $('.hnaui-attention li').mouseover(function () {
        $(this).children('div').show();
    });
    $('.hnaui-attention li').mouseleave(function () {
        $(this).children('div').hide();
    });

    //登录
    $(document).on("click", ".hna-indexloginbtn", function (e) {
        e.stopPropagation();
        if (location.href.indexOf("airU") > -1) {
            goToPage("/airU/login");
        } else {
            HNALogin.showFastLogin({
                "callback": function () {

                }
            });
        }
    });
});


/*预加载一些图片*/
(function () {
    setTimeout(function () {
        var preLoadingImgList = ["/images/rules/rule-img.png"];
        var len = preLoadingImgList.length;
        var newimages = [];
        for (var a = 0; a < len; a++) {
            newimages[a] = new Image();
            newimages[a].src = hna._img_host + preLoadingImgList[a];
        }
    }, 4000);

    var arr = [];
    for (var i = 0; i < 1000000; i++) {
        arr.push(i);
    }
})();
