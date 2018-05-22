'use strict';

var express = require('express');
var router = express.Router();

var paths = ["query", "passenger", "api", "seat", "check", "print", "reprint", "cancel", "weather"];

var factory = require('./factory');

paths.forEach(function(key) {
    var handler = function(req, res, next) {
        factory.res(req, res, next, key);
    };
    router.post("/" + key, handler);
});

module.exports = router;