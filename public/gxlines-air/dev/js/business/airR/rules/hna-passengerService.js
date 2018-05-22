defaultData.passengerService = {
    "defaultLink":"#illnessNotes",
    "text":"旅客服务"
};
leftNavData.passengerService = [
    {
        text: "机票", href: "#illnessNotes",
        children: [
            {text: "病退须知", href: "#illnessNotes"},
            {text: "购票流程", href: "#ticketProcess"},
            {text: "购票须知", href: "#ticketNotes"},
            {text: "退票流程", href: "#refundProcess"},
            {text: "退票须知", href: "#refundNotes"},
            {text: "特殊旅客", href: "#specialPassenger"},
            {text: "非自愿退改签", href: "#involuntaryReturnChange"},
            {
                text: "国内运输总条件",
                href: "#domestticTransport",
                // single: !0,
                children:[
                     {
                        text: "老年旅客乘机须知",
                        href: "#domestticTransport"
                    }, {
                        text: "障碍旅客乘机须知",
                        href: "#domestticTransport1"
                    }, {
                        text: "病患旅客乘机须知",
                        href: "#domestticTransport2"
                    },{
                        text: "第三章",
                        href: "#domestticTransport3"
                    }, {
                        text: "第四",
                        href: "#domestticTransport4"
                    }, {
                        text: "担架旅客乘机须知",
                        href: "#domestticTransport5"
                    }, {
                        text: "老年旅客乘机须知",
                        href: "#domestticTransport6"
                    }, {
                        text: "障碍旅客乘机须知",
                        href: "#domestticTransport7"
                    }, {
                        text: "病患旅客乘机须知",
                        href: "#domestticTransport8"
                    }, {
                        text: "第一章",
                        href: "#domestticTransport9"
                    }, {
                        text: "第二章",
                        href: "#domestticTransport10"
                    }, {
                        text: "第三章",
                        href: "#domestticTransport11"
                    }, {
                        text: "轮椅旅客乘机须知",
                        href: "#domestticTransport12"
                    }, {
                        text: "担架旅客乘机须知",
                        href: "#domestticTransport13"
                    }, {
                        text: "老年旅客乘机须知",
                        href: "#domestticTransport14"
                    }, {
                        text: "障碍旅客乘机须知",
                        href: "#domestticTransport15"
                    }, {
                        text: "病患旅客乘机须知",
                        href: "#domestticTransport16"
                    }, {
                        text: "第一章",
                        href: "#domestticTransport17"
                    }, {
                        text: "第二章",
                        href: "#domestticTransport18"
                    }, {
                        text: "第一章",
                        href: "#domestticTransport19"
                    }, {
                        text: "第二章",
                        href: "#domestticTransport20"
                    }, {
                        text: "第三章",
                        href: "#domestticTransport21"
                    }, {
                        text: "轮椅旅客乘机须知",
                        href: "#domestticTransport22"
                    }, {
                        text: "担架旅客乘机须知",
                        href: "#domestticTransport23"
                    }
                ]
            },
            {text: "行程单领取须知", href: "#travelNotes"},
            {text: "机上延误应急预案", href: "#machineDelayEmergencyPlan"},
            {text: "不正常航班服务", href: "#abnormalFlightServicer"}
        ]
    }, {
        text: "行李", href: "#baggageLimit",
        children: [
            {text: "行李运输限制", href: "#baggageLimit"},
            {text: "行李包装及体积", href: "#baggagePackingVolume"},
            {text: "免费行李及逾重行李", href: "#freeLuggageAndBaggage"}
        ]
    }, {
        text: "机场", href: "#airportAndLocalTraffic",
        children: [
            {text: "机场及当地交通车", href: "#airportAndLocalTraffic"},
            {text: "柜台售票处、营业部", href: "#counterAndSales"}
        ]
    }, {
        text: "安检须知", href: "#lithiumBattery",
        children: [
            {text: "锂电池", href: "#lithiumBattery"},
            {text: "移动电源", href: "#mobilePower"},
            {text: "危险物品", href: "#dangerousGoods"},
            {text: "液态物品", href: "#liquidGoods"},
            {text: "火柴打火机", href: "#matchLighter"},
            {text: "有效乘机证件", href: "#effectiveFlight"},
            {text: "三星Galaxy Note7手机的特殊规定", href: "#phoneRule"}
        ]
    }, {
        text: "航空百科", href: "#commonSense",
        children: [
            {text: "乘机常识", href: '#commonSense'},
            {text: "客舱知识", href: '#cabinKnowledge'},
            {text: "特殊情况解释", href: '#specialExplanation'}
        ]
    }, {
        text: "增值服务", href: "#insurance",
        children: [
            {text: "保险", href: '#insurance'},
            {text: "机上餐食", href: '#localMeals'},
            {text: "旅客姓名变更收费服务", href: '#passengerNameChangeFee'}
        ]
    }
];


configData.passengerService = {
    'illnessNotes': '/airR/passengerService/planeTicket/illnessNotes.html',
    'ticketProcess': '/airR/passengerService/planeTicket/ticketProcess.html',
    'ticketNotes': '/airR/passengerService/planeTicket/ticketNotes.html',
    'refundProcess': '/airR/passengerService/planeTicket/refundProcess.html',
    'refundNotes': '/airR/passengerService/planeTicket/refundNotes.html',
    'specialPassenger': '/airR/passengerService/planeTicket/specialPassenger.html',
    'involuntaryReturnChange': '/airR/passengerService/planeTicket/involuntaryReturnChange.html',
    // 'domesticTransportConditions': '/airR/passengerService/planeTicket/domesticTransportConditions.html',


    'domestticTransport': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport.html',
    'domestticTransport1': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport1.html',
    'domestticTransport2': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport2.html',
    'domestticTransport3': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport3.html',
    'domestticTransport4': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport4.html',
    'domestticTransport5': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport5.html',
    'domestticTransport6': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport6.html',
    'domestticTransport7': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport7.html',
    'domestticTransport8': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport8.html',
    'domestticTransport9': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport9.html',
    'domestticTransport10': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport10.html',
    'domestticTransport11': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport11.html',
    'domestticTransport12': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport12.html',
    'domestticTransport13': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport13.html',
    'domestticTransport14': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport14.html',
    'domestticTransport15': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport15.html',
    'domestticTransport16': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport16.html',
    'domestticTransport17': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport17.html',
    'domestticTransport18': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport18.html',
    'domestticTransport19': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport19.html',
    'domestticTransport20': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport20.html',
    'domestticTransport21': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport21.html',
    'domestticTransport22': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport22.html',
    'domestticTransport23': '/airR/passengerService/planeTicket/domestticTransport/domestticTransport23.html',


    'travelNotes': "/airR/passengerService/planeTicket/travelNotes.html",
    'machineDelayEmergencyPlan': '/airR/passengerService/planeTicket/machineDelayEmergencyPlan.html',
    'abnormalFlightServicer': "/airR/passengerService/planeTicket/abnormalFlightServicer.html",

    'baggageLimit': '/airR/passengerService/luggage/baggageLimit.html',
    'baggagePackingVolume': '/airR/passengerService/luggage/baggagePackingVolume.html',
    'freeLuggageAndBaggage': '/airR/passengerService/luggage/freeLuggageAndBaggage.html',

    'airportAndLocalTraffic': '/airR/passengerService/airport/airportAndLocalTraffic.html',
    'counterAndSales': '/airR/passengerService/airport/counterAndSales.html',

    'lithiumBattery': '/airR/passengerService/securityNotice/lithiumBattery.html',
    'mobilePower': '/airR/passengerService/securityNotice/mobilePower.html',
    'dangerousGoods': '/airR/passengerService/securityNotice/dangerousGoods.html',
    "liquidGoods": '/airR/passengerService/securityNotice/liquidGoods.html',
    "matchLighter": '/airR/passengerService/securityNotice/matchLighter.html',
    "effectiveFlight": '/airR/passengerService/securityNotice/effectiveFlight.html',
    "phoneRule": '/airR/passengerService/securityNotice/phoneRule.html',

    'commonSense': '/airR/passengerService/aviationEncyclopedia/commonSense.html',
    'cabinKnowledge': '/airR/passengerService/aviationEncyclopedia/cabinKnowledge.html',
    'specialExplanation': '/airR/passengerService/aviationEncyclopedia/specialExplanation.html',

    'insurance': '/airR/passengerService/addedService/insurance.html',
    'localMeals': '/airR/passengerService/addedService/localMeals.html',
    'passengerNameChangeFee': '/airR/passengerService/addedService/passengerNameChangeFee.html'

};