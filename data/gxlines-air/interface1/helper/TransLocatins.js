var _ = require('underscore');
exports.TransRefundDetail = function (locationList) {

    var locations = [];

    _.each(locationList.locations.location, function (item) {
        var locationItem = {
            "city": item.name[0].name,
            "name": item.name[0].name,
            "code": item.code,
            "english": "Aksu Wensu Airport",
            "pinyin": "AKeSu",
            "tab": "1",
            "letter": "A"
        }
    });

    return locations;
};