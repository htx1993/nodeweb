//邮寄地址对象
function AddressInfo(info) {
    if (!info) {
        info = {};
    }
    this.id = info.id || "";
    this.userId = info.userId || "";
    this.receiveName = info.receiveName || "";
    this.province = info.province || "";
    this.city = info.city || "";
    this.county = info.county || "";
    this.address = info.address || "";
    this.postCode = info.postCode || "";

    //手机号码国际码
    var mobile = new Mobile(info);
    this.mobilePre = mobile.mobilePre;
    this.mobile = mobile.mobile;

    this.phone = info.phone || "";
    this.email = info.email || "";
}