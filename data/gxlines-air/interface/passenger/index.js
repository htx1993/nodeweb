'use strict';

var express = require('express');
var router = express.Router();
var Mock = require("mockjs");
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var localSession = require(path.join(process.cwd(), 'data/session'));


function getTravellers(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    //国内乘机人
    var travellerList1 = Mock.mock({
        "data|8":[
            {
                "id": "@id",
                "userId": "@id",
                "countryType": 0,
                "passType|1": ['ADT', 'CNN'],
                "firstName": "@clast()",
                "lastName": "@cfirst()",
                "sex":  "@pick(['0', '1'])",
                "birthday|1": ["1990-08-10","1980-01-10","2008-06-10","2010-11-10"],
                "idType|1": ['0','3'],
                "idNo":'@string("number", 6)',
                "mobile": "15999999999",
                "phone": "010-12345678",
                "email": "@email()",
                "country": "@pick(['AO', 'BD', 'CM'])",
                "cardIssueCountry": "@pick(['AO', 'BD', 'CM'])",
                "cardValidDate": "2026-04-05",
                "createTime": null,
                "updateTime": null,
                "version": null
            }
        ]
    });
    //国际乘机人
    var travellerList2 = Mock.mock({
        "data|4":[
            {
                "id": "@id",
                "userId": "@id",
                "countryType": 1,
                "passType|1": ['ADT', 'CNN'],
                "firstName": "@first()",
                "lastName": "@last()",
                "sex":  "@pick(['0', '1'])",
                "birthday|1": ["1990-08-10","1980-01-10","2008-06-10","2010-11-10"],
                "idType": '2',
                "idNo":'@string("number", 6)',
                "mobile": "15999999999",
                "phone": "010-12345678",
                "email": "@email()",
                "country": "@pick(['AO', 'BD', 'CM'])",
                "cardIssueCountry": "@pick(['AO', 'BD', 'CM'])",
                "cardValidDate": "2026-04-05",
                "createTime": null,
                "updateTime": null,
                "version": null
            }
        ]
    });
    var uerInfo = localSession.getSessionUserInfo(req);
    var travellerList = [];
    if(queryInfo.countryType == "1"){
        travellerList = travellerList2.data;
    }else{
        travellerList = travellerList1.data;
    }

    interfaceModel.sendJson(res,200,{"travellerList":travellerList,"userInfo":uerInfo});
};


var _passengerList = [];
function addTravellers(req, res, next){
    var queryInfo = interfaceModel.getParameter(req);
    _passengerList = JSON.parse(queryInfo.passengerFormInfo+"").travellersInfo;
    console.log("=================================addTravellers====start===============================");
    console.log(_passengerList);
    console.log("=================================addTravellers=====end==============================");
    localSession.setPassengerList(req, _passengerList);
    interfaceModel.sendJson(res, 200, {message: "有重复购票", "code": "0463", "status": "success"});
}

function useCoupon(req, res, next){
    interfaceModel.sendJson(res, 200, {"status":"success","message":"rerwerwerwerwer"});
}

router.post('/getTravellers', interfaceModel.checkLogin, getTravellers);
router.post('/addTravellers', interfaceModel.checkLogin, addTravellers);
router.post('/useCoupon', interfaceModel.checkLogin, useCoupon);

module.exports = router;