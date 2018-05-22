function Sex(code) {
    if (code === null || code === undefined) {
        code = "";
    }
    this.code = "";
    code += "";
    if(code){
        if (code == "1" || code == "F") {
            this.code = "F";
        } else if(code == "0" || code == "M"){
            this.code = "M";
        }else{
            this.code = "";
        }
    }else {
        this.code = "";
    }
    this.name = _filterSexType(this.code);
}

//性别类型数组
var _sexTypeList = [
    {code: "M", name: "男"},
    {code: "F", name: "女"}
];


//性别类型值转换
function _filterSexType(code) {
    return _filterType(code, _sexTypeList);
}