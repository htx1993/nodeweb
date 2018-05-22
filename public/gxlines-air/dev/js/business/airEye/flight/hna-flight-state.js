function setFlightState(state) {
    try {
        if (!state) {
            state = "flight-state-search";
        }
        var $currentLi = $(".flight-state").find("li." + state).addClass("current");
        $currentLi.nextAll("li").addClass("prev");
        $currentLi.parent("ul").addClass(state);

        var stateIndex = $currentLi.find(".index").text();
        var stateTitle = $currentLi.find(".m_hide").text();
        $(".flight-step-title").html(stateIndex + "，" + stateTitle);
    } catch (e) {
        JsErrorTips(e);
    }
}