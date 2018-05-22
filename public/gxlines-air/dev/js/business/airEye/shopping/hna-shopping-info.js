//获取购物车
function _getShoppingCartInfo() {
    try {
        HNACart.loading();
        hna.ajax({
            url: "/shoppingCart/getShoppingCartInfo",
            data: {
                "shoppingCartId": hna._processData.getShoppingCartId()
            },
            loading: "show",
            doneCallback: function (data) {
                if(data.data && data.data.status == "success"){
                    hna._processData.saveShoppingCartInfo({
                        "tripType": _sInfo.tripType,
                        "cartInfo": data.data.shoppingCart
                    });
                    HNACart.createCartDetail();
                }else{
                    _showSuccessTips(data.data.message,function(){
                        goToPage("/airEye/flight/select");
                    });
                }
            }
        });
    } catch (e) {
        JsErrorTips(e);
    }
}