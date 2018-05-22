
/*
 <button style='position:relative' class="hna-tooltip" data-placement="left" data-title="Tooltip on left" data-class = 'class'>Tooltip on left</button>
 <button style='position:relative' class="hna-tooltip" data-placement="top" data-title="Tooltip on top" data-class = 'class'>Tooltip on top</button>
 <button style='position:relative' class="hna-tooltip" data-placement="bottom" data-title="Tooltip on bottom" data-class = 'class'>Tooltip on bottom</button>
 <button style='position:relative' class="hna-tooltip" data-placement="right" data-title="Tooltip on right" data-class = 'class'>Tooltip on right</button>
 */
+(function($){
    var _config = {
        title: "",
        placement: "right",
        anim: true,
        clazz: ""
    };
    $.fn.showTip = function (config) {
        $.extend({},_config,config);
        var target = $(this);
        if(!($(this).children().hasClass("tipBox"))){
            target.append('<div class="tipBox" >'+'<div class="hna-tip-arrow"></div><span>'+config.title+'</span></div>');
        }
        var tipBox = $(".tipBox");
        var tipArrow = tipBox.find(".hna-tip-arrow");
        if (!!config.clazz) {
            tipBox.addClass(config.clazz);
        }
        if(!config.title){
            tipBox.hide();
        }
        var w = target.outerWidth() || 0, h = target.outerHeight() || 0;
        var tw = tipBox.outerWidth() || 0, th = tipBox.outerHeight() || 0;
        var animRange = 30, animTime = 400;
        var left = 0,top = 0;
        var animLeft = 0, animTop = 0;
        if(config.placement == 'top'){
            top = -th;
            left = w/2 - tw/2;
            animTop = -animRange;
            tipArrow.addClass('hnaui-arrow-top');

        }else if(config.placement == 'bottom'){
            top = h;
            left = w/2 - tw/2;
            animTop = animRange;
            tipArrow.addClass('hnaui-arrow-bottom');

        }else if(config.placement == 'left'){
            top = h/2 - th/2;
            left = -tw;
            animLeft = -animRange;
            tipArrow.addClass('hnaui-arrow-left');
        }else {
            top = h/2 - th/2;
            left = w;
            animLeft = animRange;
            tipArrow.addClass('hnaui-arrow-right');
        }
        tipBox.css({'left': left + animLeft,'top':top + animTop});
        if(true == config.anim){
            tipBox.animate({left: left + "px", top: top + "px",opacity:'0.9'}, animTime);
        }

    };
    $.fn.closeTip = function () {
        $(".tipBox").remove();
    };
    $(function () {
        $(document).on('mouseenter','.hna-tooltip',function () {
            var self = $(this);
            var config = {
                title: self.data("title") || "",
                placement: self.data("placement") || "left",
                anim: true,
                clazz: self.data("class") || ""
            };
            self.showTip(config);
        });
        $(document).on('mouseleave','.hna-tooltip',function () {
            $(this).closeTip();
        });
    });

})(jQuery);
