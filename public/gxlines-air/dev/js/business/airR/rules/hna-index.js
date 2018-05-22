var _type = "";

$(function(){
    var request = hna.getRequest() || {};
    _type = request.type || "about";
    $("html,body").animate({"scrollTop": "300px"}, 1000);
    if(_type == "singlePage"){
        var singleId = request.singleId;
        getSingleContent(singleId);

    }else{
        var options = {
            data: leftNavData[_type] || {},
            config: configData[_type] || {},
            defaultLink: (defaultData[_type]||{}).defaultLink,
            text: (defaultData[_type]||{}).text
        };
        HNARules.init(options);
    }
});


//根据参数获取1
function getSingleContent(singleId) {
    try {
        hna.ajax({
            type: "GET",
            url: "/airR/singlePage/" + singleId + ".html",
            resourcesType: "static",
            dataType: "html",
            doneCallback: function (data) {
                var html = '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 main-column "><div class="hna-info slider-load">';
                if (data.indexOf("<!DOCTYPE html>") > -1) {
                    html += '<div>没找到对应的页面</div>';
                } else {
                    html += data.format(_tel,hna._img_host,hna._server_host);
                }
                html += '</div></div>';

                 $('.child-page').html(html).show().removeClass("slider-load");
                 $('.hna-info').removeClass('slider-load');


            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}