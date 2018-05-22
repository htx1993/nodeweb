hna._i18nMap.addLanguages({
    "VC01": {"zh_CN": "", "en_US": ""}
});
(function ($) {
    $.fn.InputNum = function (config) {
        $(this).each(function(){
            var $this = $(this);

            $this.find(".cut").on("click", function (e) {
                e.stopPropagation();
                var $$this = $(this);
                var $$thisInput = $$this.next("input.num");
                var max = parseInt($$thisInput.attr("max"), 10);
                var min = parseInt($$thisInput.attr("min"), 10);

                var thisV = parseInt($$thisInput.val(), 10);
                if (thisV > min) {
                    $$thisInput.val(thisV - 1);
                }
            });
            $this.find(".add").on("click", function (e) {
                e.stopPropagation();
                var $$this = $(this);
                var $$thisInput = $$this.prev("input.num");
                var max = parseInt($$thisInput.attr("max"), 10);
                var min = parseInt($$thisInput.attr("min"), 10);

                var thisV = parseInt($$thisInput.val(), 10);
                if (thisV < max) {
                    $$thisInput.val(thisV + 1);
                }
            });
            $this.find("input.num").on("blur", function (e) {
                e.stopPropagation();
                var $$this = $(this);
                var max = parseInt($$this.attr("max"), 10);
                var min = parseInt($$this.attr("min"), 10);

                var thisV = $$this.val();
                if (!hna.isNumber(thisV)) {
                    $$this.val(hna.isNaN(parseInt(thisV,10))?min:parseInt(thisV,10));
                }
                thisV = parseInt($$this.val(), 10);
                if(thisV>max){
                    $$this.val(max);
                }
                if(thisV<min){
                    $$this.val(min);
                }
            });
        });
    };
})(jQuery);
