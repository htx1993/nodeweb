hna._i18nMap.addLanguages({
   "NO01": {"zh_CN": "通告", "en_US": "Shopping Cart"},
   "NO02": {"zh_CN": "公告", "en_US": "Shopping Cart"},
   "NO03": {"zh_CN": "发布时间", "en_US": "Shopping Cart"},
   "NO04": {"zh_CN": "尊敬的旅客朋友们：", "en_US": "Shopping Cart"},
   "NO05": {"zh_CN": "特此通知，感谢您的关注与支持！", "en_US": "Shopping Cart"},
   "NO06": {"zh_CN": "返回列表", "en_US": "Shopping Cart"},
   "NO07": {"zh_CN": "错误提示", "en_US": "Shopping Cart"}
});

var ajaxUrl = {
    getNoticeList: "/noticeInfo/getNoticeList",
    getNoticeDetail: "/noticeInfo/getNoticeDetail"
};

//当前pid
var _currentPid = "";
//当前第几页
var _currentIndex = 1;
//当前的分页对象
var _currentPage = {};

//公告数据源
var _noticeInfoList = [];

//是否读取接口
var _isInterface = false;
$(function () {
    try {
        $("html,body").animate({"scrollTop": "300px"}, 1000);
        var options = {
            data: leftNavData(),
            config: getConfig(),
            defaultLink: "#notice",
            text: _i18n("NO01")
        };
        HNARules.init(options);
        $('.child-page').removeClass('slider-load');

        $(document).on("click", function (e) {
            e.stopPropagation();
            try {
                //32
                var conT = $(".content .container ").offset().top-276;
                $this = $(e.target);
                _currentIndex = _currentPage.pageCurrent;
                if ($this.hasClass("back-a")) {
                    hna._store.removeStore("pid");
                    HNARules.goToTop(conT);
                    $(".hna-notice").hide();
                    getNoticeList();
                    //_currentPid=null;
                    hna._store.removeStore("currentIndex");
                    hna._store.setStore("isOne",true,1000*60*20);
                } else if ($this.hasClass("notice-a")) {
                    HNARules.goToTop(conT);
                    _currentPid = $this.data("pid");
                    // location.hash = _currentPid;
                    //hna._store.setStore("isOne",false);
                     hna._store.setStore("pid",_currentPid,1000*60*5);
                     hna._store.setStore("isOne",true,1000*60*60);
                     hna._store.setStore("currentIndex", _currentIndex,1000*60*30);
                    getNoticeDetail();

                }
            } catch (ev) {
               // console.log(ev);
                JsErrorTips(ev);

            }
        });
        if(hna._store.getStore('href')==window.location.href){
            hna._store.setStore('isOne',true);
            }else {
                if(hna._store.getStore("currentIndex")){
                    hna._store.removeStore("pid");
                    hna._store.removeStore("isOne");
                }
            }


        if (_isInterface) {
            initEl();
        } else {
            hna.jsData.getNoticeData(function (data) {
                _noticeInfoList = data.data;
                setTimeout(initEl, 200);
            });
        }
        window.onbeforeunload   =   function(){
            hna._store.setStore('href',window.location.href,1000*60*30);
            hna._store.removeStore("isOne");
        };
    } catch (e) {

        JsErrorTips(e);
    }

});

function leftNavData() {
    try {
        var ticket = {
            text: _i18n("NO02"), href: "#notice"
        };
        return [ticket];
    } catch (e) {
        JsErrorTips(e);
    }
}
function getConfig() {
    try {
        var config = {
            'notice': '/airR/related-catalog.html'
        };
        return config;
    } catch (e) {
        JsErrorTips(e);
    }
}

//初始化页面
function initEl() {
    try {
        var request = hna.getRequest() || {};
        _currentPid = request.pid || hna._store.getStore("pid");
        _currentIndex = hna._store.getStore("currentIndex") || request.currentIndex || _currentIndex;
        // hna._store.getStore("isOne") ||
        var isOne = false;
        if(isOne){
            _currentPid =  hna._store.getStore("pid");
            if (!(hna._store.getStore("pid"))) {
                getNoticeList();
            } else {
                getNoticeDetail();

            }
        }else {

          _currentPid = request.pid ;
            if (!_currentPid) {
                getNoticeList();
            } else {
                getNoticeDetail();
            }

        }
    } catch (e) {
        JsErrorTips(e);
    }
}

//创建公告列表信息
function getNoticeList() {
    $(".notice-detail").hide();
    try {
        var config = {
            "searchFrom": "noticeListForm",
            "searchResult": "hna-notice-list", //展示的位置
            "pageSize": 10,//   默认每页显示多少
            "pageCurrent": _currentIndex || 1,//默认页码
            "searchInit": true,
            "columns": [
                {
                    "fieldName": "title",
                    "fieldTitle": _i18n("NO02"),
                    "renderFun": function (val, row) {
                        return '<a class="notice-a" href="javascript:;" data-pid="' + (row.pid || "") + '">' + val + '</a>';
                    }
                },
                {
                    "fieldName": "publishTime",
                    "fieldTitle": _i18n("NO03")
                }
            ]
        };
        if (_isInterface) {
            config.url = ajaxUrl.getNoticeList;
        } else {
            config.dataSource = _noticeInfoList;
        }
        _currentPage = HNAPag.initPaging(config);
        $('.hna-notice-list').show();


    } catch (e) {

        JsErrorTips(e);
    }
}

//创建公告详情信息
function createNoticeDetailEl(obj) {
    try {
        $(".hna-notice-list").hide();
        var html = '';
        html += '<div class="title">';
        html += '<h3>' + obj.title + '</h3>';
       // html += '<p>' + obj.publishTime + '</p></div>';
        html += '<div class="hna-info-content">'  ;
        html += '<div class="hna-info-content-top">'+_i18n("NO04")+'</div>';
        html += obj.content;
        html += '</div>';
        html += '        <p class="m10 lh-ti">'+_i18n("NO05")+'</p>';
        html += '        <p class="tr">'+ obj.creator +'</p>';
        html += '        <p class="tr m10">'+ obj.publishTime +'</p>';
        html += '</div>';

        html += '<div class="goback-list"><div class="fh_lb"><div class="back-a a-link"  style="display:block; margin:0 auto; clear:both; cursor: pointer">'+_i18n("NO06")+'</div></div>';
        $('.notice-detail').html(html).show();

        var str = '';
        var navList = {
            "text": _i18n("NO01"),
            "data": [
                {
                    "href": "#notice",
                    "text": _i18n("NO02")
                }
            ]
        };
        str += HNARules.createNavcontent(navList);
        $('.left-navcontent').html(str).show();
    } catch (e) {
        JsErrorTips(e);
    }

}
//返回列表页

//通过ID获取公告详情信息
function getNoticeDetail() {
    $('.hna-info').addClass('slider-load');
    try {
        if (_isInterface) {
            hna.ajax({
                url: ajaxUrl.getNoticeDetail,
                data: {"pid": _currentPid},
                doneCallback: function (data) {
                    if (data && data.code == "200") {
                        createNoticeDetailEl(data.data);
                        $('.hna-info').removeClass("slider-load");
                    } else {
                        hnaer.open({
                            title: _i18n("NO07"),
                            content: data.message
                        });
                    }
                }
            });
        } else {
            var currentNotice = {};
            for (var a = 0, a1 = _noticeInfoList.length; a < a1; a++) {
                var item = _noticeInfoList[a];
                if (item.pid == _currentPid) {
                    currentNotice = item;
                    break;
                }
            }
            createNoticeDetailEl(currentNotice);
            $('.hna-info').removeClass("slider-load");
        }


    } catch (e) {
        JsErrorTips(e);
    }


}