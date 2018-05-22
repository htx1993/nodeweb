var interfaceModel = require('../interfaceModel');
var hbs = require("hbs");
var fs = require("fs");
var path = require("path");
var utils = require(path.join(process.cwd(), "data/tools/utils"));
var config = require(path.join(process.cwd(), 'config'));
var flightCity = require(path.join(process.cwd(), 'public/' + config.company + '/'+ config.static_dir+'/js/data/flightCity'));
var parse = function(res) {
    var headers = [], data = [];
    res.seatMap.headers.forEach(function(item) {
        if(item !== "aisle"){ headers.push(item); }
    });

    res.seatMap.rows.forEach(function(row, index){
        var cols = [];
        row.cols.forEach(function(col, idx) {
           cols.push({ colName: headers[idx], type: col });
        });
        data.push({ title: index + 1, cols: cols });
    });
    var key = "0_0_" + res.planeType, result = {};
    result[key] = { data: data, id: 1 };
    return result;
};

var random = function (user) {
    return Date.now().valueOf() + user;
};

var dateFormat = function (date) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if(!date) return "";
    date = date.replace(/-/g, "");
    var mon = parseInt(date.substr(4, 2), 10),
        dat = date.substr(6);
    return dat + months[mon - 1];
};

var card = {
    user: {
        name: {
            cn: "韩军",
            en: "HANJUN"
        },
        id: "150102196910114575",
        ticket: "8269752639324",
        fqt: "HU 9116308340",
        serial: "022",
    },
    flight: {
        number: "GS6658",
        date: dateFormat("20171101"),
        src: {
            code: "TSN",
            airport: "天津滨海国际机场"
        },
        dst: {
            code: "XIY",
            airport: "西安咸阳国际机场"
        },

    },
    board: {
        time: "1955",
        gate: "214",
        cabin: "K",
        seat: "9C"
    },
    img: {
        bar: "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",
        qr: "iVBORw0KGgoAAAANSUhEUgAAAPUAAAAtCAIAAAD5vrpwAAADHUlEQVR42u2c0W6sMAwF+f+fpg9XqiqC5xx22wp6Jw9VFxaHJGPk2GfZdpvt77bNKbDJt832cL63of07dfi7XrJ+4XD28+BkZDry9dTpkcn+avPrP6vNtce1o7Wv9SP0dXqrh66n2TiYPUz7oV+++dMbO4ya76o3sg7/9NTpkQlLWPTjKfmWb/mWb/mW7+G+J+hPV2id0GnJwRN4Lk4vP/3yZI05a5Zw4ml9KMBB9plTy5NXTzTzYsXpjbDCY1G+5Vu+5Vu+5fsdvjngg4WJc7QuEoR9EPyBcZgjnuXJLWMvEyjRi07vNs5Vc//TssLjKfY+ec60oOyB8i3f8i3f8i3fr8Xf0wjBB6ZAluNviPCa75SJuTKPyU4bO+VkKIDe5E8jsnFLE9eFjcfIHlZNvuVbvuVbvuX7fb459uKQnYt8TA9E3hCDgtnoPLEKyNQ2NV1gBWJlNjj12+wBpv0PZ2Cje0dC5Fu+5Vu+5Vu+f4LvmJ6LkRwEcGD85QQZ10T7kL3ppayzRveOFVYY/pSzm6Jn9p+4Uj0wXNaVb/mWb/mWb/m+VL/ksl+flurrZDFNGWVVTRG0WftmF8EuwTMGixprsayY5/plTLOCtJ313zzYO+qr5Fu+5Vu+5ftRfENFCpJ9MCq4hAO7JtnHHlVWHKMIezLOXZdJuktatLvpv3u9u3zLt3zLt3zL97foqyAWj9mu7bv1342Oh3NzXIRbLW/ph22/P/ymuvzLl7wgspdv+ZZv+ZZv+b7K92tpOAgNYwAateNXFVpeEouRkEaM9WPgGwR5d4m/5Vu+5Vu+5fv5fHOaDxTSL4uumgwUC6CnklujNIrqpZhKA302uHejf4IHTdwslR2BLgoi77LmfRf9t3zLt3zLt3w/n++YP3pHMs61yfjPjq8fisXXS0VTcEVWcYFvRPkXZCqbWiaXNpvy5JbU2/2G7e75QfmWb/mWb/l+Gt98fMd33u34Bn/4uKffnDfhexM6g9lmdGXmbpvf19z4LaumYuJvKyTy/fC34vWLV/dm8i3f8i3f8v1f8W2z/b0m3zb5ttme2T4AJISGYDIlGacAAAAASUVORK5CYII="
    },


};
var flights = {
    data: {
        "data": [{
            "tourIndex": "1",
            "toCity": "KIX",
            "tourClass": "B",
            "asrSeat": "",
            "flightNumber": "79771",
            "tourDate": "20171010",
            "pName": "TESTJA/TESTZA",
            "tourTime": "0835",
            "pnr": "ND501Q",
            "tktNumber": "826-8780015180",
            "airlineCode": "GS",
            "cityIsCheckIn": "true",
            "fromCity": "TSN",
            "carrAirlineCode": "",
            "status": "OPEN FOR USE"
        },
            {
                "tourIndex": "2",
                "toCity": "KIX",
                "tourClass": "c",
                "asrSeat": "6A",
                "flightNumber": "79772",
                "tourDate": "20171010",
                "pName": "TESTJA/TESTZA",
                "tourTime": "0835",
                "pnr": "ND501Q",
                "tktNumber": "826-8780015180",
                "airlineCode": "GS",
                "cityIsCheckIn": "true",
                "fromCity": "TSN",
                "carrAirlineCode": "",
                "status": "OPEN FOR USE"
            }]
    },
    city: {
        fill: function (data) {
            var cities = flightCity.getCity();
            if(data.error) return data;
            data.data.forEach(function (item) {
                var count = 0, city = null;
                for(var i = 0; i < cities.length; i++){
                    city = cities[i];
                    if(city.code === item.fromCity){
                        item.fromCity = flights.city.transfer(city);
                        count++;
                    }
                    if(city.code === item.toCity){
                        item.toCity = flights.city.transfer(city);
                        count++;
                    }
                    if(count === 2) break;
                }
            });
            return data;
        },
        transfer: function (city) {
            return {
                code: city.code,
                nameCn: city.city,
                nameEn: city.pinyin,
                airportCn: city.name,
                airportEn: city.english
            }
        }
    }
};
var responses = {
    query: function (callback) {
        var data = flights.city.fill(flights.data);
        callback(data);
    },
    passenger: {
        "cardAirline": "",
        "asrSeat": "",
        "hostNum": "0164",
        "isFlightOpened": "OP",
        "cardLevel": "",
        "pCiStatus": "NA",
        "expDeptTime": "0835",
        "carrFlightNo": "GS7977",
        "boardingGateNumber": "????",
        "ffLevel": "",
        "cabinType": "B",
        "pEnName": "TESTJA/TESTZA",
        "pName": "TESTJA/TESTZA",
        "schDeptTime": "0835",
        "speicialSvc": "",
        "asrStatus": "3",
        "asvcInfo": [],
        "toCity": "KIX",
        "planeType": "320",
        "ckiInChannel": "",
        "bordingTime": "0750",
        "fromCity": "TSN"
    },
    api: {
        "departureAirport": "TSN",
        "hostNumber": "0164",
        "airlineCode": "GS",
        "deniedBoardingVolunteerInd": "false",
        "departureDate": "20171010",
        "apiInfo": {
            "primaryHolderInd": "N",
            "residenceCountry": "",
            "docHolderNationality": "CN",
            "gender": "M",
            "surName": "TESTJA",
            "docID": "JA0001",
            "docType": "P",
            "givenName": "TESTZA",
            "birthDate": "900102",
            "docIssueCountry": "CN",
            "birthLocation": "",
            "destAddress": {},
            "transferInd": "N",
            "expireDate": "171228",
            "middleName": "",
            "otherDocInfo": {},
            "effectiveDate": "",
            "homeAddress": {},
            "visaInfo": {}
        },
        "arrivalAirport": "KIX",
        "flightNumber": "7977"
    },
    seat: function(callback) {
        var data = {
                "seatMap": {
                    "headers": ["A", "B", "C", "aisle", "D", "E", "F"],
                    "rows": [{
                        "cols": ["disabled", "disabled", "disabled", "disabled", "disabled", "disabled"],
                        "title": "1"
                    }, {
                        "cols": ["disabled", "disabled", "disabled", "disabled", "disabled", "disabled"],
                        "title": "2"
                    }, {
                        "cols": ["disabled", "disabled", "disabled", "disabled", "disabled", "disabled"],
                        "title": "3"
                    }, {
                        "cols": ["disabled", "disabled", "disabled", "disabled", "disabled", "disabled"],
                        "title": "4"
                    }, {
                        "cols": ["disabled", "disabled", "disabled", "disabled", "disabled", "disabled"],
                        "title": "5"
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "6"
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "7"
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "8"
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "9"
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "10"
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "11"
                    }, {
                        "cols": ["disabled", "disabled", "disabled", "disabled", "disabled", "disabled"],
                        "title": "12."
                    }, {
                        "cols": ["disabled", "disabled", "disabled", "disabled", "disabled", "disabled"],
                        "title": "13."
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "14"
                    }, {
                        "cols": ["normal", "normal", "normal", "disabled", "disabled", "normal"],
                        "title": "15"
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "16"
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "17"
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "18"
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "19"
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "20"
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "21"
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "22"
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "23"
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "24"
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "25"
                    }, {
                        "cols": ["normal", "normal", "normal", "normal", "normal", "normal"],
                        "title": "26"
                    }, {
                        "cols": ["disabled", "disabled", "disabled", "disabled", "disabled", "disabled"],
                        "title": "27"
                    }, {
                        "cols": ["disabled", "disabled", "disabled", "disabled", "disabled", "disabled"],
                        "title": "28"
                    }, {
                        "cols": ["disabled", "disabled", "disabled", "disabled", "disabled", "disabled"],
                        "title": "29"
                    }, {
                        "cols": ["disabled", "disabled", "disabled", "disabled", "disabled", "disabled"],
                        "title": "30"
                    }]
                },
                "planeClass": "232Y",
                "planeType": "320"
            };
        callback(parse(data));
    },
    check: {
        "deptAirport": "TSN",
        "flightNo": "GS7977",
        "flightDate": "20171010",
        "boardingNumber": "001",
        "boardStream": "3CP#1C01#01V#05TESTJA/TESTZA      #08GS #107977 #11@12#14ND501Q#150835#1717#1810OCT#190750#206F #22001#28ETKT#298268780015180/1#30TIANJIN#31TSN#32F#33B#35OSAKA#36KIX#39XXX#50JA0001#61GS7977 10 6FTSN001#62天津#71M1TESTJA/TESTZA       END501Q TSNKIXGS 7977 283B006F0001 100#77164#$",
        "psrName": "TESTJA/TESTZA",
        "seatNo": "6F",
        "checkCode": ""
    },
    print: function(callback) {
        var outer = "/lucky-air/air/html/zh/airR/print/", inner = "public" + outer;
        var fullPath = path.join(process.cwd(), inner);
        var tpl = fs.readFileSync(fullPath + "board-card.hbs");
        var template = hbs.compile(tpl.toString());
        var prefix = random(card.user.name.en);
        var tar = fullPath + prefix + ".html";
        fs.writeFileSync(tar, template(card));
        console.log("card: ", card);
        var handler = function (success) {
            if(!success){
                callback({ error: "登机牌打印失败！" });
                return;
            }
            var itvl = setInterval(function () {
                //delete temp file after five minutes
                [".html", ".pdf"].forEach(function (ext) {
                    var filename = fullPath + prefix + ext;
                    if(fs.existsSync(filename)){
                        fs.unlink(filename, function (err) {
                            if(!err){
                                clearInterval(itvl);
                            }
                        });
                    } else {
                        clearInterval(itvl);
                    }
                });

            }, 5 * 60 * 1000);
            callback({ url: outer + prefix + ".pdf" });
        };
        utils.phantom(tar, inner, prefix + ".pdf", handler);
    },
    reprint: {
        "dataFlow": "3CP#1C01#01V#05TESTJA/TESTZA      #08GS #107977 #11@12#14ND501Q#150835#1717#1810OCT#190750#206F #22001#28ETKT#298268780015180/1#30TIANJIN#31TSN#32F#33B#35OSAKA#36KIX#39XXX#50JA0001#53R#61GS7977 10 6FTSN001#62天津#71M1TESTJA/TESTZA       END501Q TSNKIXGS 7977 283B006F0001 100#77164#"
    },
    cancel: {"errorMsg": "", "errorCode": "0"},
    weather: {
        "city": "XIY",
        "whether": [{
            "h_Temperature": " 25C(77F)",
            "l_Temperature": " 16C(61F)",
            "description": "多云 转 阴",
            "index": "0",
            "wind": "东北风 4级"
        }, {
            "hTemperature": " 25C(77F)",
            "lTemperature": " 16C(61F)",
            "description": "阴",
            "index": "1",
            "wind": "西风 3级"
        }, {
            "hTemperature": " 23C(73F)",
            "lTemperature": " 17C(63F)",
            "description": "小雨",
            "index": "2",
            "wind": "东北风 3级"
        }],
        "chnCity": ""
    }
};

module.exports = {
    res: function(req, res, next, key) {
        var data = responses[key];
        if(typeof data === "function"){
            data(function (re) {
                interfaceModel.sendJson(res, 200, re);
            });
        } else {
            interfaceModel.sendJson(res, 200, data);
        }

    }
};