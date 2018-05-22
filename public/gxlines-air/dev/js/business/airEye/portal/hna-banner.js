
//banner
/*var _slidersImgUrlList = [];
 var _advertImgUrlList = [];*/

//初始化轮播图
function initSlider(){
    try {
        //是否读取接口
        var _isInterface = false;
        if (_isInterface) {
            getBannerList();
        } else {
            hna.jsData.getBannerData(function (data) {
                //_slidersImgUrlList = data.data;
                createBannerEl({"data":data.data,"placements":'hnaui-banner'});
            });
            hna.jsData.getAdvertData(function (data) {
                createBannerEl({"data":data.data,"placements":'hnaui-advert'});
            });
        }
    } catch (e) {
        JsErrorTips(e);
    }

}

//通过ajax获取banner图列表
function getBannerList() {
    try {
        hna.ajax({
            url: ajaxUrl.getBannerList,
            doneCallback: function (data) {
                if (data && data.code == "200") {
                    _slidersImgUrlList = data.data;
                    createBannerEl();
                }
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}
//创建banner图
function createBannerEl(o) {
    try {
        var  _slidersImgUrlList = o.data;
        var sliderCla = o.placements;
        var html = '<ul>';
        (_slidersImgUrlList || []).forEach(function (item, index) {
            html += '   <li >';
            html += '       <a';
            html += '           style="background-image:url(' + hna._static_host + item.imgPath + ') "';
            html += '           name="' + (item.name || "") + '"';
            html += '           target="' + (item.target || "_blank") + '"';
            if(item.jumpPath){
                html += '           href="' + (item.jumpPath) + '"';
            }else{
                html += '           href="javascript:;" onclick="return false;"';
            }
            html += '       >';
            // html += '           <img src="' + (hna._static_host + item.imgPath) + '">';
            html += '       </a>';
            html += '   </li>';
        });
        html += '   </ul>';
        $("." + sliderCla).html(html).show();
        var S = document.querySelectorAll("."+sliderCla);
        if (S) {
            for (var i = 0; i < S.length; i++) {
                new Slider(S[i]);
            }
        }
    } catch (e) {
        JsErrorTips(e);
    }
}





