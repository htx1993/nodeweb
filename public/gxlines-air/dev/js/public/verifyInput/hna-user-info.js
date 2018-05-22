//会员用户信息
function UserInfo(info) {
    if (!info) {
        info = {};
    }
    this.id = info.id || "";
    this.type = info.type || "";
    this.cid = info.cid || "";
    this.name = info.userName || "";
    this.userName = info.name || this.name || "";
    this.lastName = info.lastName || "";
    this.firstName = info.firstName || "";
    this.fullName = getFullName(this.firstName, this.lastName);
    this.email = info.email || "";
    //邮箱是否绑定 UR未绑定 R已经绑定
    this.isEmailBind = info.isEmailBind || "UR";
    this.sex = (new Sex(info.sex)).code;
    this.birthday = info.birthday || "";
    this.idType = (new IDType(info.idType)).code;
    this.idNo = info.idNo || "";
    this.phone = info.phone || "";

    //手机号码国际码
    var mobile = new Mobile(info);
    this.mobilePre = mobile.mobilePre;
    this.mobile = mobile.mobile;

    this.mmvCode = info.mmvCode || "";
    this.postCode = info.postCode || "000001";
    this.question = info.question || "";
    this.answer = info.answer || "";
    this.countryCode = info.countryCode || "CN";
    this.city = info.city || "北京市";
    this.province = info.province || "北京市";
    this.country = info.country || "中国";
    this.addressLine = info.addressLine || "朝阳区";
    this.password = info.password || info["password" + hna._hash] || "";
    this.password_re = info.password_re || info["password_re" + hna._hash] || "";

    this.valiCode = info.valiCode || "";

    this.mmvCode = info.mmvCode || "";

    this.service = info.service || "";

    this.isRegister = info.isRegister || "";
}