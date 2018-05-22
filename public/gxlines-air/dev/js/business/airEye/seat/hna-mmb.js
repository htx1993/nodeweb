//获取航班信息
function getMMBFlightInfo() {
    try {
        hna.ajax({
            url: ajaxUrl.getMMBFlightInfo,
            data: {
                "orderCode": _orderCode
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