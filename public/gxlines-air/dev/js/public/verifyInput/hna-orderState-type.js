//订单状态数组
var _orderStateList = [
    {code: "TICKETED", name: "已出票"},
    {code: "PARTIALLY_TICKETED", name: "部分出票"},
    {code: "PENDING_TICKETING", name: "暂未出票"},
    {code: "PENDING_BOOKING", name: "预订中"},
    {code: "BOOKED_AND_PAID", name: "已预订并付款"},
    {code: "BOOKED_PARTIALLY_PAID", name: "已预订并部分付款"},
    {code: "PARTIALLY_BOOKED_AND_PAID", name: "部分预订并付款"},
    {code: "PARTIALLY_BOOKED_PARTIALLY_PAID", name: "部分预订并部分付款"},
    {code: "BOOKED", name: "已预订"},
    {code: "NOT_BOOKED", name: "未预订"},
    {code: "PARTIALLY_BOOKED", name: "部份预订"},
    {code: "QUOTE_AND_PAID", name: "已报价并预订"},
    {code: "QUOTE_PARTIALLY_PAID", name: "报价并部分预订"},
    {code: "QUOTE", name: "已报价"},
    {code: "CANCELLED_WITH_PAYMENT", name: "支付完成但已取消"},
    {code: "CANCELLED", name: "已取消"},
    {code: "HAS_PAID", name: "已支付"},
    {code: "REFUNDED", name: "已退款"}
];


//辅营状态数组
var _marketStateList = [
    {code: "BOOKED", name: "已预订"},
    {code: "NOT_BOOKED", name: "未预订"},
    {code: "CANCELLED", name: "已取消"},
    {code: "CHANGED", name: "已改期"},
    {code: "PENDING_BOOKING", name: "预订中"}
];

//保险状态数组
var _insuranceStateList = [
    {code: "BOOKED", name: "已预订"},
    {code: "CANCELLED", name: "已取消"},
    {code: "RFND", name: "已退票"},
    {code: "PENDING_BOOKING", name: "预订中"}
];

//航段状态数组
var _flightStateList = [
    {code: "BOOKED", name: "已预订"},
    {code: "NOT_BOOKED", name: "未锁定"},
    {code: "CANCELLED", name: "已取消"},
    {code: "CHANGED", name: "已取消"},
    {code: "REFUNDED", name: "已取消"},
    {code: "PENDING_BOOKING", name: "处理中"}
];


//机票状态数组
var _ticketStateList = [
    {code: "EXCH", name: "已退改"},
    {code: "OPEN", name: "开放"},
    {code: "CHECKIN", name: "办理登记手续"},
    {code: "BOARD", name: "已登记"},
    {code: "REFUNDED", name: "已退票"},
    {code: "RFND", name: "已退票"},
    {code: "SUSPENDED", name: "挂起"},
    {code: "VOID", name: "作废"},
    {code: "EXCHANGED", name: "已退改"},
    {code: "UNKOWN", name: "未知状态"}
];

// var _ticketStateList = [
//     {code: "ISSUED", name: "ISSUED"},
//     {code: "EXCHANGED", name: "EXCHANGED"},
//     {code: "IN_TRANSIT", name: "IN_TRANSIT"},
//     {code: "REFUNDED", name: "REFUNDED"},
//     {code: "PART_USED", name: "PART_USED"},
//     {code: "FULLY_USED", name: "FULLY_USED"},
//     {code: "VOIDED", name: "VOIDED"}
// ];


//支付信息数组
// var _paymentInformationList = [
//     {code: "APAY", name: "支付宝"},
//     {code: "YBPAY", name: "易宝支付"},
//     {code: "WXPAY", name: "微信支付"},
//     {code: "EPAY", name: "易生支付"},
//     {code: "INIT", name: "初始状态"},
//     {code: "PAY_SUCCESS", name: "付款成功"},
//     {code: "PAYED_BUT_NOT_ISSUE", name: "已支付但是未出票"},
//     {code: "PAY_VOID", name: "付款撤销"}
// ];
var _paymentInformationList = [
    {code: "ALIPAY", name: "支付宝支付"},
    {code: "YEEPAY", name: "易宝支付"},
    {code: "EASYPAY", name: "易生支付"},
    {code: "WXPAY", name: "微信支付"},
    {code: "PAY_FOR_ORDER", name: "订单支付"},
    {code: "PAY_FOR_CHANGE", name: "改期支付"},
    {code: "PAY_FOR_ANCILLARY", name: "辅营支付"},
    {code: "PAY_FOR_FLYPLUS", name: "飞行加支付"},

    {code: "ISSUING", name: "出票中"},
    {code: "PENDING", name: "出票中"},
    {code: "RETRYING", name: "出票中"},
    {code: "FORBID", name: "禁用"},
    {code: "FAIL", name: "出票失败"},
    {code: "DONE", name: "出票完成"}
];
var _paymentResultList = [
    {code: "ISSUING", name: "购买中"},
    {code: "PENDING", name: "购买中"},
    {code: "RETRYING", name: "购买中"},
    {code: "FORBID", name: "禁用"},
    {code: "FAIL", name: "购买失败"},
    {code: "DONE", name: "购买成功"}
];
//订单来源数组
var _orderSourceList = [
    {code: "GXAIRLINES_WEB", name: "官网"},
    {code: "GXAIRLINES_MOBILE", name: "手机APP"},
    {code: "GXAIRLINES_667", name: "微信"},
    {code: "GXAIRLINES_910", name: "美团"},
    {code: "GXAIRLINES_120", name: "去哪儿"},
    {code: "GXAIRLINES_808", name: "航班管家"},
    {code: "GXAIRLINES_298", name: "飞猪"},
    {code: "GXAIRLINES_368", name: "同程"},
    {code: "GXAIRLINES_983", name: "携程"},
    {code: "GXAIRLINES_900", name: "海航汇"},
    {code: "GXAIRLINES_517", name: "517"},
    {code: "GXAIRLINES_508", name: "途牛"},
    {code: "GXAIRLINES_707", name: "飞行加"},
    {code: "GXAIRLINES_116", name: "HiApp"}
];

//订单状态值转换
function _filterOrderState(code) {
    return _filterType(code, _orderStateList);
}

//辅营状态值转换
function _filterMarketState(code) {
    return _filterType(code, _marketStateList);
}

//保险状态值转换
function _filterInsuranceState(code) {
    return _filterType(code, _insuranceStateList);
}

//航班状态值转换
function _filterFlightState(code) {
    return _filterType(code, _flightStateList);
}

//机票状态值转换
function _filterTicketState(code) {
    return _filterType(code, _ticketStateList);
}
//支付方式和状态值转换
function _filterPaymentInformation(code) {
    return _filterType(code, _paymentInformationList);
}
//订单来源转换
function _filterOrderSource(code) {
    return _filterType(code, _orderSourceList);
}

//支付结果转换
function _filterPaymentResult(code,type){
    if(type == "PAY_FOR_ORDER"){
        return _filterType(code, _paymentInformationList);
    }else{
        return _filterType(code, _paymentResultList);
    }
}