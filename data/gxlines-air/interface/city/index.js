'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var flightCity = require(path.join(process.cwd(), 'public/' + config.company + '/'+config.static_dir+'/js/data/flightCity'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));

function getHotCity(){
    var HNA_FLIGHT_CITIES = flightCity.getCity();
    var hot = {};
    hot.inland=[];
    hot.inter=[];
    HNA_FLIGHT_CITIES.forEach(function(item){
        if(item.num || item.num==0){
            if(item.other){
                hot.inter.push(item);
            }else{
                hot.inland.push(item);
            }
        }
    });
    return hot;
}
function getHistoryCity(){
    var HNA_FLIGHT_CITIES = flightCity.getCity();
    var history = [];
    HNA_FLIGHT_CITIES.forEach(function(item){
        if(item.code && item.code.indexOf("D")>-1){
            history.push(item);
        }
    });
    return history;
}

function getGroupCity(){
    var HNA_FLIGHT_CITIES = flightCity.getCity();
    var group = {};
    group.inland=[];
    group.inter=[];
    HNA_FLIGHT_CITIES.forEach(function(item){
        if(item.other){
            group.inter.push(item);
        }else{
            group.inland.push(item);
        }
    });
    return group;
}

function getCity(req, res, next) {
    var type = req.query.type||"";
    var cityObj = null;
    if(type=="hot"){
        cityObj = getHotCity();
    }else if(type=="history"){
        cityObj = getHistoryCity();
    }else{
        cityObj = getGroupCity();
    }

    interfaceModel.sendJson(res,200,cityObj);
};

router.get('', getCity);

module.exports = router;