//获取航班信息
function getFlightInfo() {
    try {
        hna.ajax({
            url: ajaxUrl.getFlightInfo,
            data: {
                "shoppingCartId": _shoppingCartId
            },
            doneCallback: function (data) {
                if (data && data.code == "200") {
                    _fInfo = filterSeatData(data.data || {});
                    createInitEl();
                }
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}