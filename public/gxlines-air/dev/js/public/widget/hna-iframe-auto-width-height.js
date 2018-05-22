var _agentIframeId = "agent_iFrame";

function setAgentiFrameStyle() {
    var $body = $("body");
    var b_width = $body.outerWidth();
    var b_height = parseFloat(($body.outerHeight() || "") + "") + 200;
    var c_iframe = document.getElementById(_agentIframeId);
    // 这里通过hash传递b.htm的宽高
    var srcStr = c_iframe.src;
    c_iframe.src = srcStr.substring(0, srcStr.indexOf("#")) + "#" + b_width + "|" + b_height;
}

(function autoHeight() {
    var url = hna._server_host + '/airP/paymentAgent#';

    var html = '<iframe id="' + _agentIframeId + '"  height="0" width="0" src="' + url + '" style="display:none" ></iframe>';
    $("body").append(html);
    setAgentiFrameStyle();

    $(window).resize(function () {
        setAgentiFrameStyle();
    });
})();


