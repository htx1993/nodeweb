//初始化公告
function initNotice() {
    getNoticeList();
}
//通过ajax获取公告列表
function getNoticeList() {
    //是否读取接口
    var _isInterface = false;

    try {
        if (_isInterface) {
            hna.ajax({
                url: ajaxUrl.getNoticeList,
                doneCallback: function (data) {
                    if (data && data.code == "200") {
                        createNoticeEl(data.data.data);
                    } else {
                        $('.hnaui-notice .hnaui-content').html("<p class='hnaui-notice-no'>暂时没有公告</p>").show();
                    }
                }
            });
        } else {
            hna.jsData.getNoticeData(function (data) {
                if (data && data.data.length > 0) {
                    createNoticeEl(data.data);
                } else {
                    $('.hnaui-notice .hnaui-content').html("<p class='hnaui-notice-no'>暂时没有公告</p>").show();
                }
            });
        }
    } catch (e) {
        JsErrorTips(e);
    }

}
//创建公告列表，同时实现滚动
function createNoticeEl(arr) {
    try {
        var html = '';
        html += '<dl class="hnaui-prev-next">';
        html +=     '<dd class="prev disabled">';
        html +=         '<i class="prev hnaui-icon " disbled="false">&#xe619;</i>';
        html +=     '</dd>';
        html +=     '<dd class="next">';
        html +=         '<i class="next hnaui-icon" disbled="false">&#xe61a;</i>';
        html +=     '</dd>';
        html += '</dl>';
        html += '<div class="ul-content">';
        html += '<ul>';
        arr.forEach(function (item, index) {
            html += '   <li class="col-xs-12 col-sm-6 col-md-12 hnaui-elip">';
            html += '       <a class="notice-a" href="' + hna._server_host + '/airR/notice?pid=' + item.pid + '">' + item.title + '</a>';
            html += '   </li>';
        });
        html += '   </ul>';
        html += '   </div>';
        $('.hnaui-notice .hnaui-content').html(html).show();

        //公告滾動
        // setInterval(function () {
        //     var $noticeLi = $('.hnaui-notice .hnaui-content li');
        //     var $noticeLiH = $noticeLi.height();
        //     $noticeLi.eq(0).animate({marginTop: -$noticeLiH, opacity: 0}, 'slow', function () {
        //         $noticeLi.eq(0).css('margin-top', '').appendTo('.hnaui-notice .hnaui-content ul').animate({opacity: 1});
        //     });
        // }, 3000);
    } catch (e) {
        JsErrorTips(e);
    }

}

//公告滚动
function scrollNotice(flag) {
    var scrollLen = 3;
    var $noticeUl = $('.hnaui-notice .hnaui-content ul');
    if (!$noticeUl.is(":animated")) {
        var $noticeLiH = $('.hnaui-notice .hnaui-content li').height();
        var $noticeLiLen = $('.hnaui-notice .hnaui-content li').length;
        var scrollTop1 = parseInt($noticeUl.css('marginTop') , 10);
        var $pre = $(".hnaui-notice .hnaui-prev-next .prev");
        var $next = $(".hnaui-notice .hnaui-prev-next .next");
        $noticeUl.animate({marginTop: -$noticeLiH * scrollLen * flag + scrollTop1}, 'slow', function () {
            var scrollTop2 = parseInt($noticeUl.css('marginTop') , 10);
            if(scrollTop2 >= 0) {
                $pre.addClass("disabled");
            }else if($noticeLiLen + (scrollTop2 / $noticeLiH) <= 6) {
                $next.addClass("disabled");
            }else {
                $next.removeClass("disabled");
                $pre.removeClass("disabled");
            }
        });
    }
}

//监听点击事件,点击滚动
$(document).on("click", ".hnaui-notice .hnaui-prev-next .prev,.hnaui-notice .hnaui-prev-next .next", function (e) {
        e.stopPropagation();
        try {
            var $this = $(e.target);
            if ($this.hasClass("disabled") || $this.parent().hasClass("disabled")) {
                return;
            }
            if ($this.hasClass("next")) {
                scrollNotice(1);
            } else if ($this.hasClass("prev")) {
                scrollNotice(-1);
            }
        } catch (ev) {
            JsErrorTips(ev);
        }
    });