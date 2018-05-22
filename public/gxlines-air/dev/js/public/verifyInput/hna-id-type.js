function IDType(code) {
    if (code === null || code === undefined) {
        code = "ID_CARD";
    }
    this.code = "";
    if (code == "ID_CARD" || code == "1") {
        this.code = "ID_CARD";
    } else if (code == "2.DOC" || code == "2") {
        this.code = "2.DOC";
    } else if (code == "MI_CARD" || code == "3") {
        this.code = "MI_CARD";
    } else {
        this.code = "OTHER_ID";
    }
    this.name = _filterIdType(this.code);
}
//证件类型数组
var _idTypeList = [
    {code: "ID_CARD", name: "身份证"},
    {code: "2.DOC", name: "有效护照"},
    {code: "MI_CARD", name: "军官证"},
    {code: "OTHER_ID", name: "其他证件"}
];


//证件类型值转换
function _filterIdType(code) {
    return _filterType(code, _idTypeList);
}