defaultData.selfservice = {
    "defaultLink": "#irregularFlightProve",
    "text": "自助服务"
};

leftNavData.selfservice = [
    {
        text: "航班动态",
        href: hna._server_host + "/airR/flightStatus",
        target: "_blank"
    },
    {
        text: "客票验真",
        href: "http://www.travelsky.com/tsky/",
        target: "_blank"
    },
    //{
    //    text: "自助改期",
    //    href: "#irregularFlightChange"
    //},
    {
        text: "延误证明",
        href: "#irregularFlightProve"
    }
];


configData.selfservice = {
    //'irregularFlightChange': '/airR/selfservice/irregularFlightChange.html',
    'irregularFlightProve': '/airR/selfservice/irregularFlightProve.html'
};