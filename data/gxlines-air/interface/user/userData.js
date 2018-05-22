var path = require('path');
var userModel = require(path.join(process.cwd(), 'data/models/userModel'));
var Mock = require("mockjs");

var userInfo = Mock.mock({
    "id": "@id",
    "type": null,
    "cid": null,
    "name": "",
    "lastName": "@clast",
    "firstName": "@cfirst",
    "password": null,
    "repassword": null,
    "email": "@email",
    "sex": 0,
    "birthday": "@date",
    "idType": "@pick(['0', '3'])",
    "idNo": "@string('number', 8)",
    "area": null,
    "mobile": '186' + '@string("number", 8)',
    "phone": '027-' + '@string("number", 8)',
    "mobileValiCode": null,
    "postCode": null,
    "addressA": null,
    "addressB": null,
    "state": 0,
    "question": "",
    "answer": "@ctitle",
    "isEmailBind": "R",
    "version": 5,
    "nationality": null,
    "lastNameEn": null,
    "firstNameEn": null,
    "city": null,
    "enrollchanneltype": null,
    "enrollchannel": null,
    "isFFP": null,
    "passwordFFP": null,
    "addressMode": null,
    "province": null,
    "country": null,
    "jcaptchaResponseNoreg": null
});

var passengerListDomestic = Mock.mock({
    "data|40": [{
        'id': "@id",
        'userId': '@string("number", 3)',
        "countryType": '0',
        "passType": "@pick(['ADT', 'CNN'])",
        "firstName": "@clast",
        "lastName": "@cfirst",
        "sex": "@pick(['0', '1'])",
        "birthday": '@datetime("yyyy-MM-dd")',
        "idType": "@pick(['0', '3'])",
        "idNo": '@string("number", 8)',
        "mobile": '186' + '@string("number", 8)',
        "phone": '027-' + '@string("number", 8)',
        "email": '@email()',
        "country": null,
        "cardIssueCountry": null,
        "cardValidDate": null,
        "version": 2
    }]
});
var passengerListInternational = Mock.mock({
    "data|30": [{
        'id|+1': 1,
        'userId': '@string("number", 3)',
        "countryType": '1',
        "passType": "@pick(['ADT', 'CNN'])",
        "firstName": "@first()",
        "lastName": "@last()",
        "sex": "@pick(['0', '1'])",
        "birthday": '@datetime("yyyy-MM-dd")',
        "idType": "@pick(['2'])",
        "idNo": '@string("number", 8)',
        "mobile": '186' + '@string("number", 8)',
        "phone": '027-' + '@string("number", 8)',
        "email": '@email()',
        "country": "@pick(['AO', 'BD', 'CM'])",
        "cardIssueCountry": "@pick(['AO', 'BD', 'CM'])",
        "cardValidDate": '@datetime("yyyy-MM-dd")',
        "version": 1
    }]
});

var addressList = Mock.mock({
    'data|30': [{
        'id|+1': 1,
        'userId': '@string("number", 3)',
        "receiveName": "@cname()",
        "province": "@province()",
        "city": "@city()",
        "county": "@county()",
        "address": "刘家村3号",
        "mobile": '186' + '@string("number", 8)',
        "phone": '027-' + '@string("number", 8)',
        "postCode": '@zip',
        "email": '@email()'
    }]
});

var flightStatusList = Mock.mock({
    'data|100': [
        {
            "datop": "2017-08-22",
            "datopChn": "",
            "datopLocal": "",

            "legNo": 0,

            //起飞地机场三字码
            "depStn": "CKG",
            "depCity": "重庆",
            "depStnCn": "江北",
            "depStnFourCode": "",
            //起飞地机场航站楼
            "depBuilding": "--",

            //目的地机场三字码
            "arrStn": "TSN",
            "arrCity": "天津",
            "arrStnCn": "滨海",
            "arrStnFourCode": "",
            //目的地机场航站楼
            "arrBuilding": "--",

            //计划起飞时间
            "std": "2017-08-23 00:30:00",
            "stdHm": "00:30",
            //计划到达时间
            "sta": "2017-08-23 03:55:00",
            "staHm": "03:55",

            //预计起飞时间
            "etd": "2017-08-23 00:32:00",
            "etdHm": "00:30",
            //预计到达时间
            "eta": "2017-08-23 03:57:00",
            "etaHm": "03:55",

            //实际起飞时间
            "atd": "",
            "atdHm": "",
            //实际到达时间
            "ata": "",
            "ataHm": "",


            "tOff": "",
            "tDwn": "",

            "gate": "",

            //型号
            "acType": "32G",
            "ac": "GS 32GA50",
            //行李转盘
            "baggage": "",
            //航班编号
            "flightNo": "GS7990",
            //航班状态
            "status": "计划",

            //历史准点率
            "probability": "94",
            //机龄
            "flightAge": "2年",

            "stc": "J",
            "vipNum": "0",
            "remark": "",
            "delay1Txt": "",
            "delay2Txt": "",
            "isDomOrInt": "",
            //天气，以机场三字码为key的键值对
            weathers: {
                "CKG": {
                    airPortCode: "CKG",
                    airPortName: "重庆",
                    temperature: "20℃",
                    visib: "6000米",
                    weatherType: "散云",
                    wind: "东偏东北风 - 2级"
                },
                "TSN": {
                    //机场三字码
                    airPortCode: "TSN",
                    //机场名
                    airPortName: "天津",
                    //温度
                    temperature: "24℃",
                    //能见度
                    visib: "4500米",
                    //天气类型
                    weatherType: "小雨",
                    //风向
                    wind: "东北风 - 2级"
                }
            }
        }
    ],
});

exports.userInfo = new userModel.UserInfo(userInfo);
exports.passengerListDomestic = passengerListDomestic;
exports.passengerListInternational = passengerListInternational;
exports.addressList = addressList;
exports.flightStatusList = flightStatusList;