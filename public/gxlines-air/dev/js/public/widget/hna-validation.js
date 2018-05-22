window.HNAValidation = HNAValidation = (function($){
    var eventCount = 0;
    var loading = false;
    function createInitEl(){
        try{
            hide();

            var html = '';
            html += '<div class="validation-panel">';
            html += '   <div class="hna-loading-mask"></div>';
            html += '   <div class="hna-loading-content">';
            html += '       <form class="validation-form hnaui-form">';
            html += '           <h1><i class="hnaui-icon">&#xe60b;</i>操作频繁，需要进行拼图验证</h1>';
            html += createMMVeLUm("hna_moveReg_validation");
            html += '           <div class="result"></div>';
            html += '       </form>';
            html += '<div class="search-loading" style="display: none;"><div class="search-loading-content"> <i class="hnaui-icon hnaui-anim hnaui-anim-rotate hnaui-anim-loop loading-icon"></i>数据加载中，请稍后...</div> </div>';
            html += '   </div>';
            html += '</div>';

            $("body").append(html);
            resetMMV();
        }catch(e){
            JsErrorTips(e);
        }
    }

    //创建人机验证El
    function createMMVeLUm(id) {
        var html = '       <div class="hnaui-form-item p-mmv">';
        html += '           <label class="hnaui-form-label">' + _i18n("B12") + '</label>';
        html += '           <input type="hidden" name="mmvCode" hna-verify="PmmvCode" isavailable="N">';
        html += '           <div id="' + (id || "") + '" class="hna-mmv">';
        html += '               <div class="hna-animate">';
        html += '                   <span class="hna-animate-circles hna-animate-an1"></span>';
        html += '                   <span class="hna-animate-circles hna-animate-an2"></span>';
        html += '                   <span class="hna-animate-circles hna-animate-an3"></span>';
        html += '                   <div class="hna-animate-line"></div>';
        html += '               </div>';
        html += '           </div>';
        html += '       </div>';
        return html;
    }

    function resetMMV(){
        HNAmoveReg.eventInit({
            "id": "hna_moveReg_validation",
            "successMsg": _i18n("B13"),
            "callback": function (data) {
                $(".validation-form").find("input[name='mmvCode']").val(data || "").attr("isavailable", "Y");
                $(".validation-panel .hnaui-login-btn").removeClass("hnaui-btn-disabled");
                submitMMV();
            }
        });
    }

    function submitMMV(){
        var $mmvCode = $(".validation-form").find("input[name='mmvCode']");
        if($mmvCode.attr("isavailable") != "Y"){
            _showMsg(_i18n("B14"));

        }else{
            $(".validation-panel .search-loading").show();
            hna.ajax({
                url: "/base/getVerificationResult",
                data: {
                    "mmvCode":$mmvCode.val()
                },
                doneCallback: function (data) {
                    if (data && data.code == "200" && data.data.status == "success") {
                        hide();
                    }else{
                        $(".validation-panel .search-loading").hide();
                        $(".validation-panel .hnaui-login-btn").addClass("hnaui-btn-disabled");
                        $(".validation-panel .result").html("重新验证").show();
                        resetMMV();
                    }
                    loading =false;
                }
            });
        }
    }

    function hide(){
        $(".validation-panel").remove();
        eventCount = 0;
        loading =false;
    }

    function show(){
        createInitEl();
    }

    return {
        show:show
    };
})(jQuery);