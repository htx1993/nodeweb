module.exports = {
    "NoEtcdNode": "服务暂不可用，请稍后再试",//无法获取服务节点
    "NoResponse": "服务无法访问，请稍后重试",//接口返回undifined
    "ReSearch": "由于长时间未操作，请重新查询",//后台返回 does not exist or is expired || Document with id
    "InvalidTrip": "无效的行程，请选择合适的时间间隔行程",//后台返回 Invalid itineraries selected
    "NoPriceFound": "座位数不够或者系统暂时无法处理您的请求，请重新选择日期或者刷新页面后重试", //后台返回 No Price Found
    "UnknownError": "系统暂时无法处理您的请求，请刷新页面后重试或者重新登录", //后台返回未知错误
    "NeedLogin": "由于长时间未操作，当前页面已失效，请刷新页面",//node端session失效
    "GetPayUrlFailed": "获取支付地址失败，请稍后重试",//创建订单/购买辅营/改期操作后在跳往支付中心时获取支付路径失败

    //flight
    "ReChargeFlight": "已购买该趟航班，是否继续购买?",//重复购买
    "NoPaiedOrder": "存在未支付的订单，请完成支付后进行操作",//重复预订
    "CreateOrderFailed": "生成订单失败!",//创建订单失败
    "OrderCrossSearch": "非此账号订单，请切换账号或者查询其它订单",//创建订单失败
    /*
     * 以下都是node端处理空参数的提示语
     * */

    //辅营
    "BuyFuyinFailed": "购买辅营失败,请重新选择",
    "SearchFuyinFailed": "查询辅营信息失败",
    "SelectFuyinEmpty": "请选择您要购买的辅营产品",

    //UM
    "EmptyParam": "查询参数不能为空",
    "UMSearchFailed": "查询失败",
    "UMUpdateSuccess": "修改成功",
    "UMUpdateFailed": "修改失败",
    "UMAddFailed": "添加失败",

    "UMSendCodeAlready": "您在短时间内已经发送过验证码，请稍后重试",
    "UMSendEmailSuccess": "邮件发送成功",
    "UMSendEmailFailed": "邮件发送失败",
    "UMEmailEmpty": "邮箱不能为空",
    "UMCodeFailed": "验证码已失效，请重新发送",
    "UMCodeError": "动态验证码错误",
    "UMEmailCantEmpty": "邮箱和验证码不能为空",
    "UMMobileCantEmpty": "手机号和验证码不能为空",

    "UMNeedLogin": "获取用户信息失败，请重新登录",

    "LoginSuccess": "登录成功",
    "LoginErrorParam": "用户名或密码错误",
    "LoginFailed": "登录失败",
    "LoginMobileEmpty": "手机号和验证码不能为空",
    "LoginMoblieError": "手机号不存在或验证码已失效",
    "LoginMobileSendSuccess": "手机验证码发送成功",
    "LoginMobileSendFailed": "手机验证码发送失败",
    "LoginOutSuccess": "登出成功",

    "PasswordSendSuccess": "新密码已经发送到你的手机，请及时登录系统并修改密码",
    "PassGetUserFailed": "获取用户信息失败",
    "PassParamEmpty": "用户名或手机号为空",
    "PassMobileEmpty": "手机号码对应的用户不存在",
    "PassAnswerEmpty": "密保答案或密保问题为空",
};