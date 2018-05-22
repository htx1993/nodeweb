//初始化主流程页面element
function createMainProcessInitEl() {
    try {
        _sInfo = getSearchFlightInfo();
        initProductData();
    } catch (e) {
        JsErrorTips(e);
    }
}
//主流程获取辅营页面产品数据
function initProductData() {
    sendAjax(ajaxUrl.getProductInfo, {"shoppingCartId": _shoppingCartId}, function (data) {
        _marketList = data.group || [];
        filterMarketData();
        createSearchResult();
    });
}
