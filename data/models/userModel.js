//会员用户信息
function UserInfo(info) {
    if (!info) info = {};
    this.id = info.id || info.userId || "";
    this.userId = info.userId || info.id || "";
    this.type = info.type || "";
    this.cid = info.cid || "";
    this.name = info.name || "";
    this.userName = info.name || "";
    this.lastName = info.lastName || "旅客";
    this.firstName = info.firstName || "";
    this.fullName = getFullName(this.firstName, this.lastName);
    this.email = info.email || info.emailAddress || "";
    this.status = info.status || "0";
    this.sex = info.sex || info.gender || "0";
    this.birthday = info.birthday || "";
    this.idType = info.idType || "";
    this.idNo = info.idNo || "";
    this.phone = info.phone || info.phoneNumber || "";
    this.mobile = info.mobile || "";
    this.mmvCode = info.mmvCode || "";
    this.postCode = info.postCode || "000001";
    this.question = info.question || "";
    this.answer = info.answer || "";
    this.countryCode = info.countryCode || "CN";
    this.city = info.city || "北京市";
    this.province = info.province || "北京市";
    this.country = info.country || "中国";
    this.addressLine = info.addressLine || "朝阳区";
    this.userSessionId = info.userSessionId || "";
    this.profileId = info.profileId || "";
    this.isEmailBind = info.isEmailBind || "";
    this.isRegister = (info.name || "").length > 0 ? "Y" : "N";
    this.url = info.url || "/";
}

function getFullName(firstName, lastName){
    var reg = /(^[a-zA-Z]+[\s\.]?([a-zA-Z]+[\s\.]?){0,4}[a-zA-Z]$)|(^[a-zA-Z]$)/;
    var fullName = "";
    if (reg.test(firstName) && reg.test(lastName)) {
        fullName = firstName + " " + lastName;
    } else {
        fullName = lastName + firstName;
    }
    return fullName;
}

module.exports = {
    UserInfo: UserInfo
}