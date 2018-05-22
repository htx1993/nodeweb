//证件类型数组
var _marketTypeList = [
    {code: "MEALS", name: "餐食"},
    {code: "BAGS", name: "逾重行李"},
    {code: "LOUNGE", name: "贵宾厅"},
    {code: "ON_FLIGHT_ITEM", name: "机上舒适设施"},
    {code: "SEATFEE", name: "选座"}
];

var _insuranceTypeList = [
    {code: "LIFE_ASSURANCE", name: "航意险"},
    {code: "REFUND_INSURANCE", name: "退票险"},
    {code: "DELAY_INSURANCE", name: "航延险"}
];

//证件类型值转换
function _filterMarketType(code) {
    return _filterType(code, _marketTypeList);
}

//证件类型值转换
function _filterInsuranceType(code) {
    return _filterType(code, _insuranceTypeList);
}