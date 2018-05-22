//乘机人对象
function Traveller(info) {
    if (!info) {
        info = {};
    }
    this.id = info.id || "";
    //乘机人国籍类型，分国内乘机人-0，国际乘机人-1
    this.countryType = info.countryType || "0";

    this.userId = info.userId || "";
    //乘机人类型
    this.passType = info.passType || "ADT";
    //乘机人名字
    this.firstName = info.firstName || "";
    //乘机人姓氏
    this.lastName = info.lastName || "";
    //乘机人姓名
    this.fullName = getFullName(this.firstName, this.lastName);
    //证件类型
    this.idType = (new IDType(info.idType)).code;
    //证件号码
    this.idNo = info.idNo || "";
    //乘机人性别
    this.sex = (new Sex(info.sex)).code;
    //乘机人出生日期
    this.birthday = info.birthday || "";
    //乘机人固定电话
    this.phone = info.phone || "";

    //手机号码国际码
    var mobile = new Mobile(info);
    this.mobilePre = mobile.mobilePre;
    this.mobile = mobile.mobile;

    //乘机人邮箱地址
    this.email = info.email || "";
    //乘机人国籍
    this.country = (info.country || "").toUpperCase();
    if(!/[A-Z]+/.test(this.country)){
        this.country = "";
    }
    //乘机人护照签发国
    this.cardIssueCountry = (info.cardIssueCountry || "").toUpperCase();
    if(!/[A-Z]+/.test(this.cardIssueCountry)){
        this.cardIssueCountry = "";
    }
    //乘机人护照号码
    this.cardNo = info.cardNo || "";
    //乘机人护照有效期1
    this.cardValidDate = info.cardValidDate || "";
    //是否添加到用户的乘机人信息里面
    this.saveToAirU = info.saveToAirU || "";

    //如果是国际乘机人，则证件类型只能是护照，同时idNo等于cardNo
    if (this.countryType == "1") {
        this.idType = (new IDType("2.DOC")).code;
        if (!this.idNo && this.cardNo) {
            this.idNo = this.cardNo;
        } else if (this.idNo && !this.cardNo) {
            this.cardNo = this.idNo;
        }
    }

    //参照日期
    this.referenceDate = info.referenceDate || hna._date.getDateInfo().date;
    //如果有出生日期，就通过出生日期和参照日期对比，判断出乘机人类型
    if(this.birthday){
        this.passType = getPassTypeByBirthday(this.birthday, this.referenceDate) || this.passType;
    }
}

//根据出生日期来判断乘机人类型
function getPassTypeByBirthday(birthday, referenceDate) {
    var date1 = hna._date.addYear(-12, referenceDate);
    var date2 = hna._date.addYear(-2, referenceDate);
    var date3 = hna._date.addDate(-14, referenceDate);

    if (birthday <= date1) {
        return "ADT";
    } else if (birthday > date1 && birthday <= date2) {
        return "CNN";
    } else if (birthday > date2 && birthday <= date3) {
        return "INF";
    } else {
        return "";
    }
}