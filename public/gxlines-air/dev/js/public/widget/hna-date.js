hna._date = (function ($) {
    'use strict';
    function towString(m) {
        return m < 10 ? "0" + m : m;
    }

    function getDateInfo(obj) {
        if (!obj) {
            obj = {};
        }
        if (typeof(obj) == "string") {
            obj = {date: obj};
        }
        var def = {
            sign: "-",
            date: "",
            format: "yyyy-mm-dd",
            w: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            wa: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            d: ["前天", "昨天", "今天", "明天", "后天"],
            o: ["年", "月", "日"]
        };

        $.extend(def, obj);
        if (def.date && !hna.isDate(def.date)) {
            def.date = (def.date+"").replace("T", " ");
            def.date = (def.date+"").replace(/\.\d{3}\+\d{4}/, "");
        }
        def.date = (def.date+"").replace(/-/g,"/");
        if (def.date && (/\d{10}/g).test(def.date)) {
            def.date = parseInt(def.date + "", 10);
        }
        var d = def.date ? (new Date(def.date)) : (new Date());
        if (d == "Invalid Date") {
            d = new Date();
        }
        var y = d.getFullYear();
        var m = towString(d.getMonth() + 1);
        var dd = towString(d.getDate());

        var h = towString(d.getHours());
        var mm = towString(d.getMinutes());
        var s = towString(d.getSeconds());

        var week = d.getDay();
        var thisTime = d.getTime();

        var returnObj = {};
        returnObj.day = dd;
        returnObj.date = y + def.sign + m + def.sign + dd;
        returnObj.dateCN = y + def.o[0] + m + def.o[1] + dd + def.o[2];
        returnObj.dateAbbCN = m + def.o[1] + dd + def.o[2];
        returnObj.dateAbb = m + def.sign + dd;
        returnObj.dateMonthCN = y + def.o[0] + m + def.o[1];
        returnObj.time = h + ":" + mm + ":" + s;
        returnObj.shortTime = h + ":" + mm;
        returnObj.week = def.w[week];
        returnObj.weekAbb = def.wa[week];
        returnObj.weekNum = week;
        returnObj.millisecond = thisTime;


        var nowD = new Date();
        nowD.setHours(0);
        nowD.setMinutes(0);
        nowD.setSeconds(0);
        var nowT = (nowD).getTime();
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        var thisT = d.getTime();
        var iDays = Math.ceil((thisT - nowT) / 1000 / 60 / 60 / 24);
        if (iDays >= -2 && iDays <= 2) {
            returnObj.weekAbb = def.d[iDays + 2];
        }

        return returnObj;
    }

    /**
     * 强制转换成数字
     */
    function getParseInt(n) {
        n = Number(n);
        n = isNaN(parseInt(n, 10)) ? 0 : n;
        return n;
    }

    /**
     * 增加N天
     */
    function addDate(n, date) {
        var d = date ? (new Date((date+"").replace(/-/g,"/"))) : (new Date());

        var thisTime = d.getTime();
        var addTime = getParseInt(n) * 24 * 60 * 60 * 1000;

        return getDateInfo({date: new Date(thisTime + addTime)}).date;
    }
    /**
     * 增加N小时
     */
    function addHour(n, date) {
        var d = date ? (new Date((date+"").replace(/-/g,"/"))) : (new Date());

        var thisTime = d.getTime();
        var addTime = getParseInt(n) * 60 * 60 * 1000;

        return new Date(getDateInfo({date: new Date(thisTime + addTime)}).millisecond);
    }

    /**
     * 增加N月
     */
    function addMonth(n, date) {
        var d = getDateInfo({date: date}).date;
        n = getParseInt(n);
        var y = parseInt(d.substring(0, 4), 10);
        var m = parseInt(d.substring(5, 7), 10) + n;

        if (m > 12) {
            y++;
            m -= 12;
        }
        m = m < 10 ? "0" + m : m;
        return y + d.substring(4, 5) + m + d.substring(7);
    }

    /**
     * 增加N年
     */
    function addYear(n, date) {
        var d = getDateInfo({date: date}).date;
        n = getParseInt(n);
        var y = parseInt(d.substring(0, 4), 10) + n;
        return y + d.substring(4);
    }

    return {
        getDateInfo: getDateInfo,
        addDate: addDate,
        addMonth: addMonth,
        addYear: addYear,
        addHour:addHour
    };
})(jQuery);
