var config = require('../config');
var interfaceModel = require('../interfaceModel');
var utils = require('../utils');
var grpcClient = require('../grpcClient');

exports.default = function (req, res, next) {
    var reqBody = interfaceModel.getParameter(req);
    if (reqBody.shoppingCartId) {

        var travelerList = [];
        reqBody.passengerFormInfo = JSON.parse(reqBody.passengerFormInfo);
        console.log(JSON.stringify(reqBody));
        for (var i = 0; i < reqBody.passengerFormInfo.travellersInfo.length; i++) {
            var item = reqBody.passengerFormInfo.travellersInfo[i];
            if (item.saveToAirU) {
                addPassengerToUm(item, req)
            }

            var traveler = {
                "firstName": item.firstName || "",
                "lastName": item.lastName || "",
                "gender": item.sex || "M",
                "dateOfBirth": item.birthday || "",
                "type": item.passType || "",
                "email": item.email || "",
                "mobile": item.mobile || "",
                "idNo": item.idNo || "",
                "idNoEffectiveDate": item.cardValidDate || "2099-12-30",
                "idNoExpiryDate": item.cardValidDate || "2099-12-30",
                "idNoType": item.idType || "",
                "idNoCountryCode": item.cardIssueCountry || "CN",
                "countryCode": item.country || "CN",
            };

            travelerList.push(traveler);

        }

        var customerObj = GetCunstomer(reqBody.passengerFormInfo.travelArranger);
        var obj = {
            "shoppingCartId": reqBody.shoppingCartId,
            "passengers": travelerList,
            "customer": customerObj
        };


        var client = grpcClient.travelerClient(req);

        var _callback = function (err, response) {
            if (!response) {
                interfaceModel.sendJson(res, 200, {"status": "failed", "message": "添加乘机人失败"});
            }
            else
                interfaceModel.sendJson(res, 200, response);
        };

        utils.GrpcCallback(req, res, client, "createTravlers", _callback, obj);

    }
    else
        interfaceModel.sendJson(res, 400, utils.alertMsg.EmptyParam);

}
;

function addPassengerToUm(reqBody, req) {

    var userId = utils.GetUserID(req);
    if (!userId) {
        return;
    }

    var obj = {
        "userId": userId,
        "countryType": parseInt(reqBody.countryType),
        "passType": reqBody.passType || "ADT",
        "firstName": reqBody.firstName,
        "lastName": reqBody.lastName,
        "idType": utils.GetIdType(reqBody.idType),
        "idNo": reqBody.idNo,
        "sex": reqBody.sex == "M" ? 0 : 1,
        "birthday": reqBody.birthday,
        "mobile": reqBody.mobile,
        "phone": reqBody.phone,
        "email": reqBody.email,
        "country": reqBody.country || "",
        "cardIssueCountry": reqBody.cardIssueCountry || "",
        "cardValidDate": reqBody.cardValidDate || "",
    };

    console.log('addPassenger：' + JSON.stringify(obj));

    var client = grpcClient.userClient(req);

    client.addUserPassenger(obj, utils.Metadata(req), {}, function (err, response) {
        console.log("addPassengerToUm:" + JSON.stringify(response))
    });
}

function GetCunstomer(cusObj) {
    return {
        firstName: cusObj.firstName || "",
        lastName: cusObj.lastName || "",
        email: cusObj.email || "",
        mobile: cusObj.mobile || "",
        homePhone: ""
    };
}