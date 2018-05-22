var interfaceModel = require('../interfaceModel');
var utils = require('../utils');

exports.default = function (req, res, next) {

    utils.GetGrpcToken(req, res, function (response) {
        interfaceModel.sendJson(res, 200, response.expires_in || new Date().getTime());
    })
};