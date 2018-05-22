hna._i18nMap.addLanguages({
    "Tit17": {"zh_CN": "安全设置", "en_US": "Flight number"},
    "Tit18": {"zh_CN": "常用乘机人", "en_US": "Flight number"},
    "Tit19": {"zh_CN": "我的订单", "en_US": "Flight number"},
    "Tit01": {"zh_CN": "个人资料", "en_US": "Flight number"},
    "Adr01": {"zh_CN": "邮寄地址", "en_US": "Flight number"},
    "Con01": {"zh_CN": "优惠券", "en_US": "Flight number"},
    "Plu01": {"zh_CN": "飞行加订单", "en_US": "Flight number"}
});

//获取地址栏的hash
var _hash = (location.hash || '').substr(6);

var _menuList = [
    {
        "type": "information",
        "href": "/airU/userInfo#menu_information",
        "title": _i18n("Tit01"),
        "icon": "&#xe912;",
        "flag": "hasLogin"
    },
    {
        "type": "setting",
        "href": "/airU/userInfo#menu_setting",
        "title": _i18n("Tit17"),
        "icon": "&#xe620;",
        "flag": "hasLogin"
    },
    {
        "type": "passenger",
        "href": "/airU/userInfo#menu_passenger",
        "title": _i18n("Tit18"),
        "icon": "&#xe90a;",
        "flag": "hasLogin"
    },
    {
        "type": "address",
        "href": "/airU/userInfo#menu_address",
        "title": _i18n("Adr01"),
        "icon": "&#xe62e;",
        "flag": "hasLogin"
    },
   /* {
       "type": "coupon",
       "href": "/airU/userInfo#menu_coupon",
       "title":"优惠券",
       "icon": "&#xe92e;",
       "flag": "hasLogin"
    },*/
    {
        "type": "order",
        "href": "/airEye/order/orderList",
        "title": _i18n("Tit19"),
        "icon": "&#xe90c;",
        "flag": "hasLogin"
    },
    {
        "type": "register",
        "href": "/airU/register",
        "title": _i18n("Tit20"),
        "icon": "&#xe912;",
        "flag": "noLogin"
    }
    /*{
        "type": "login",
        "href": "/airU/login",
        "title": _i18n("Tit21"),
        "icon": "&#xe913;",
        "flag": "noLogin"
    },
    {
        "type": "retrievePassword",
        "href": "/airU/retrievePassword",
        "title": _i18n("Tit22"),
        "icon": "&#xe909;",
        "flag": "noLogin"
    },
    {
        "type": "flightPlusOrder",
        "href": "/airEye/flightPlusDetail?type=orderList",
        "title": _i18n("Plu01"),
        "icon": "&#xe909;",
        "flag": "hasLogin"
    }*/
];



$(function(){
    
    $(document).on("click",".hnaui-nav-item>a",function(){
        hideUserInfo();
    });

//用户中心
    $(document).on("click",function(e){
        e.stopPropagation();
        try {
            var $this = $(e.target);
            if($this.hasClass("user-menu-panel")){
                iconToggle();
            }
            if($this.closest(".user-menu-right").length<=0){
                hideUserInfo();
            }
        }catch (ev) {
            JsErrorTips(ev);
        }
    });
// PC端鼠标移入移除事件
    $(".user-menu-right").hover(function(){
        showUserInfo();
    },function(){
        hideUserInfo();
    });
    
});

//隐藏显示用户中心
function hideUserInfo(){
    $(".hnaui-nav-tree").hide();
    $(".hnaui-icon").removeClass("hnaui-icon-rotate");
}
function showUserInfo(){
    $(".hnaui-icon").addClass("hnaui-icon-rotate");
    $(".hnaui-nav-tree").show();
}

//用户中心的隐藏显示切换
function iconToggle(){
    $(".hnaui-icon").removeClass("hnaui-icon-rotate");
    if(!$(".hnaui-icon").hasClass("hnaui-icon-rotate")){
        showUserInfo();
    }else{
        hideUserInfo();
    }
}

//创建菜单
function _createUserMenuEl(flag) {
    try {
        flag = flag ? flag : "noLogin";
        var html = '<div class="hnaui-tab">';
        html +='<ul class="hnaui-tab-title">';
        _menuList.forEach(function (item,index) {
            var cla = '';
            if(_hash) {
                cla = (_hash == item.type ? "hnaui-this" : "");
            }else {
                cla = index == 0 ? "hnaui-this" : "";
            } 
            if (item.flag == flag) {
                html += '   <li class="' + cla + '">';
                html += '       <a href="' + hna._server_host + (item.href || "") + '" class="user-item"><i class="hnaui-icon">' + (item.icon || "") + '</i>' + (item.title || "") + '</a>';
                html += '   </li>';
            }
        });
        html +='</ul>';
        html += '</div>';
        $(".user-menu").find(".user-menu-right").append(html);
    } catch (e) {
        JsErrorTips(e);
    }
}
