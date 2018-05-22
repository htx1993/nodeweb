(function ($) {
    hna = window.hna || {};

    var numbers = [48/*0*/, 49/*1*/, 50/*2*/, 51/*3*/, 52/*4*/, 53/*5*/, 54/*6*/, 55/*7*/, 56/*8*/, 57/*9*/, 96/*0*/, 97/*1*/, 98/*2*/, 99/*3*/, 100/*4*/, 101/*5*/, 102/*6*/, 103/*7*/, 104/*8*/, 105/*9*/, 110/*.*/, 190/*.*/];
    var specials = [91/*OS*/, 144/*NumLock*/, 46/*Delete*/, 8/*Backspace*/, 9/*Tab*/, 45/*Insert*/, 33/*PgUp*/, 34/*PgDn*/, 35/*End*/, 36/*Home*/, 37/*Left*/, 38/*Up*/, 39/*Right*/, 40/*Down*/];

    /**
     * 纯数字输入框输入限制(按键屏蔽)
     * @param: inputs(element|Array),文本输入框
     */
    hna.number = function (inputs) {
        if (arguments.length > 1) {
            $(inputs).on("keyup", function (e) {
                var code = e.which;
                //排除特殊控制键
                if (!(e.shiftKey || e.ctrlKey || e.altKey)) {
                    code = e.which || e.keyCode;
                    if (numbers.indexOf(code) < 0 && specials.indexOf(code) < 0) {
                        return false;
                    }
                }
            });
        }
    };

    //浏览器滚动定位到某一个元素的位置
    hna.locationTag = function (thisP, callback) {
        thisP = thisP instanceof $ ? thisP : $(thisP);
        var offset = thisP.offset();
        if (offset) {
            document.documentElement.scrollTop = document.body.scrollTop = offset.top - (hna.getBodySizeInfo().cHeight) / 2;
        }
        if (callback && typeof(callback) == "function") {
            callback();
        }
    };


})(jQuery);
