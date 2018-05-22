function PassType(code) {
    code = code.toUpperCase();
    if (code == "ADT" || code == "ADULT") {
        this.code = "ADT";
    } else if (code == "CNN" || code == "CHILD") {
        this.code = "CNN";
    } else if (code == "INF" || code == "INFANT") {
        this.code = "INF";
    } else {
        this.code = code;
    }
}
//旅客类型数组
var _passTypeList = [
    {code: "ADT", name: "成人"},
    {code: "CNN", name: "儿童"},
    {code: "INF", name: "婴儿"}
];

//旅客类型值转换
function _filterPassType(code) {
    return _filterType((new PassType(code)).code, _passTypeList);
}