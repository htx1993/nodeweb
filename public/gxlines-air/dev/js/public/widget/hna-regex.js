(function () {
    hna = window.hna || {};
    /**
     * 正则表达式验证
     */
    hna.regex = {
        /*移动电话*/
        mobile: "^1[3|4|5|6|7|8|9]\\d{9}$",
        /*国外的移动电话*/
        mobilePre: "^\\d{1,11}$",
        /*固定电话^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$*/
        //phone: "^0(([1-9]\\d\\-{0,1}\\d{8})|([1-9]\\d{2}\-{0,1}\\d{7}))$",
        phone: "^0([1-9]\\d{1,2}\\-{0,1}\\d{7,8})$",
        /*邮政编码*/
        postcode: "^\\d{6}$",
        /*护照编号*/
        cardNo: "^[\\da-zA-Z]{2,30}$",
        /*军官证编号*/
        //miCard: "^[\\da-zA-Z\\u4E00-\\u9FA5]{4,40}$",
        miCard: "^[\\da-zA-Z]{2,30}$",
        /*邮箱*/
        email: "^[\\u4e00-\\u9fa5\\w]+([-+.][\\u4e00-\\u9fa5\\w]+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$",
        /*邮寄地址*/
        address: "[\\w\\u4E00-\\u9FA5]+",
        /*日期*/
        date: "^[123]\\d{3}-[01]\\d-[0123]\\d$",
        /*中文姓名*/
        nameReg: "^[\\u2E80-\\uFE4F]*$",
        /*收件人姓名*/
        receiveNameReg: "(^[\\u2E80-\\uFE4F]{2,30}$)|(^[A-Za-z]{1,60}$)",
        /*用户名*/
        userName: "^[A-Za-z][A-Za-z0-9]{5,19}$",
        /*标题*/
        rulesName: "^[\\u4e00-\\u9fa5\\w]+[A-Za-z]\\w{2,25}$",
        /*密码*/
        password:"^(?![\\d]+$)(?![a-zA-Z]+$)[\\da-zA-Z]{6,20}$",
        //password: "[\\dA-Za-z]{6,20}$",
        /*密保*/
        question: "[\\u4E00-\\u9FA5\\w]*",
        /*动态验证码*/
        valiCode: "^[\\da-zA-Z]{6}$",
        /*航班号*/
        flightNumber:"^([a-zA-Z\\d]){0,10}$",
        /*机票编号*/
        ticketNo:"^([\\d]){3}[-]{1}[\\d]{10}$",
        /*订单编号*/
        orderNo:"^([\\d]){10}$",
        /*用户名和手机号码登录*/
        userNameOrMobile: "(^[A-Za-z][A-Za-z0-9]{5,19}$)|(^1[3|4|5|6|7|8]\\d{9}$)|(^[\\u4e00-\\u9fa5\\w]+([-+.][\\u4e00-\\u9fa5\\w]+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$)",
        /*优惠券号码*/
        coupon:"[a-zA-Z][a-zA-Z0-9]"
    };
})();