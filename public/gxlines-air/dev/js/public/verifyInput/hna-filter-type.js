//类型转换公用方法
function _filterType(code, arr) {
    if (!code) {
        code = "";
    }
    var name = "";
    (arr || []).forEach(function (item) {
        if (item.code == code) {
            name = item.name;
            return;
        }
    });
    return name;
}