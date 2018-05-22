//航司类型数组
var _airLineList = [
    {code: "GS", name: "天津航空"},
    {code: "PN", name: "西部航空"},
    {code: "UQ", name: "乌鲁木齐航空"},
    {code: "8L", name: "祥鹏航空"},
    {code: "9H", name: "长安航空"},
    {code: "GX", name: "北部湾航空"}
];


//航司类型值转换
function _filterAirLine(code) {
    return _filterType(code, _airLineList);
}