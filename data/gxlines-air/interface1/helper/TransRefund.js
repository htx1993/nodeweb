exports.TransRefundDetail = function (RefundDetail) {

    if (RefundDetail.status !== "success")
        return RefundDetail;

    var detail = {
        "orderNo": RefundDetail.data.order.orderNo,
        "guests": RefundDetail.data.order.guests,
        "fares": RefundDetail.data.order.fares,
        "status": RefundDetail.data.order.status
    };

    return detail;
};