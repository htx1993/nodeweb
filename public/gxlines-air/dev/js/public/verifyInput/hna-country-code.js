var _countryList = [];
//国际和护照类型code值转换
function _filterCountryCode(code) {
    return _filterType(code, _countryList);
}