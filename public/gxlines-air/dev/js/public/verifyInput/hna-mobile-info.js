function Mobile(info) {
    if (!info) {
        info = {};
    }
    if(hna.hasMobilePre){
        //手机号码国际码1
        if (!info.mobilePre) {
            var arr = (info.mobile || "").replace("+", "").split("-");
            if (arr.length > 1) {
                this.mobilePre = arr[0] || "86";
                this.mobile = arr[1] || "";
            } else {
                this.mobilePre = "86";
                this.mobile = info.mobile || "";
            }
        } else {
            this.mobilePre = ((info.mobilePre + "") || "86").replace("+", "");
            this.mobile = "+" + (this.mobilePre || "86") + "-" + info.mobile || "";
        }
    }else{
        this.mobilePre = info.mobilePre || "";
        this.mobile = info.mobile || "";
    }
}
