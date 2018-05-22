var _type = "";
var _iFrameSrc = "";
var _iFrameH = "";
var _airportInfo = {};//机场信息对象;
var _airportCity = [
    '北京' , '昆明' , '包头' , '长春' , '长沙' , '成都' , '重庆' , '大连',
    '福州' , '广州' , '贵阳' , '桂林' , '海口' , '哈尔滨' , '杭州' , '合肥',
    '呼和浩特' , '兰州' , '满洲里' , '牡丹江' , '南昌' , '南京' , '南宁' , 
    '齐齐哈尔' , '青岛' , '三亚' , '上海虹桥' , '上海浦东' , '深圳' ,
    '沈阳' , '太原' , '天津' , '温州' , '乌鲁木齐' , '武汉' , '西安' , '西宁',
    '厦门' , '银川' , '珠海'
];//机场城市数组
var _count = 0;//城市标识符;
$(function () {
    getUrlType();

});

//根据页面URL判断页面类型
function getUrlType() {
    var url = location.href;
    _type = (hna.getRequest() || {}).type || "selfChangeService";
    if (_type == "delayCertification") {
        //延误证明开具
        _iFrameSrc = "http://pgs-x.eking-tech.com/pssplus/frontend/8l/delay/delay_todelay.action?weight=100";
        _iFrameH = "800px";
        createIFrameEl();
    } else if (_type == "selfChangeService") {
        //不正常航班自助改期
        _iFrameSrc = "http://pgs-x.eking-tech.com/pssplus/frontend/8l/ticket/ticketInfo_toTicketInfo.action?weight=100";
        _iFrameH = "1200px";
        createIFrameEl();
    } else if (_type == "retreatChange") {
        //退票进度查询
        initRetreatChange();
    } else if (_type == "airportInfo") {
        //机场信息
        initAirportInfo();
    }
}

//退票进度查询 相关JS
function initRetreatChange(){
    var html='<div class="hnaui-refund col-xs-12 col-sm-12 col-md-8 col-lg-8">';
    html += '<h3><span>退票进度查询</span></h3>';
    html += '<form class="hnaui-form">';
    html += '<ul class="hnaui-clear">';
    html +=     '<li>';
    html +=         '<div class="hnaui-form-item"><label class="hnaui-form-label">客票号</label>';
    html +=         '<div class="hnaui-input-block"><input type="text" name="title" required  hna-verify="required" placeholder="859-" autocomplete="off" class="hnaui-input hnaui-small-W">';
    html +=         '<input type="text" name="title" required  hna-verify="required" placeholder="" autocomplete="off" class="hnaui-input  hnaui-big-W"></div></div>';
    html +=     '</li>';
    html +=     '<li>';
    html +=         '<div class="hnaui-form-item"><label class="hnaui-form-label">证件号</label>';
    html +=         '<div class="hnaui-input-block"><input type="text" name="title" required  hna-verify="required" placeholder="" autocomplete="off" class="hnaui-input"></div></div>';
    html +=     '</li>';
    html +=     '<li>';
    html +=         '<div class="hnaui-form-item"><label class="hnaui-form-label">姓名</label>';
    html +=         '<div class="hnaui-input-block"><input type="text" name="title" required  hna-verify="required" placeholder="" autocomplete="off" class="hnaui-input"></div></div>';
    html +=     '</li>';
    html +=     '<li>';
    html +=         '<div class="hnaui-form-item"><label class="hnaui-form-label">验证码</label>';
    html +=         '<div class="hnaui-input-block"><input type="text" name="title" required  hna-verify="required" placeholder="" autocomplete="off" class="hnaui-input hnaui-big-W">';
    html +=         '<span class="hnaui-yzm-img">验证码图片</span></div></div>';
    html +=     '</li>';
    html += '</ul>';
    html += '<div class="hnaui-push-center">';
    html += '<div class="hnaui-btn hnaui-btn-theme hnaui-btn-big search-btn ">查询<i class="hnaui-icon">&#xe615;</i></div>';
    html += '</div>';
    html += '</form>';
    html += '</div>';
    html += '<div class="hnaui-refund-msg col-xs-12 col-sm-12 col-md-4 col-lg-4">';
    html += '<h3><span>使用说明</span></h3>';
    html += '<p>1、已申请：正常退票退款到账日期约为7-14个工作日。</p>';
    html += '<p>特殊退票的提示，病退：需要将病退资料原件提供给祥鹏航空，且注明联系方式，人工审核通过后方可全退。查看详情</p>';
    html += '<p>资料邮寄未规定具体时限，但邮寄资料前请确认官网订单已提交退票，否则后台无法审核。</p>';
    html += '<p>前后段航变：所退祥鹏航空客票的前后段若有其他航班变动的情况，需要提供前后段航变证明，并发送至luckyairet@hnair.com，我处及财务审核通过后，方能退款。</p>';
    html += '<p>2、审核中：</p>';
    html += '<p>正常客票的退款申请：系统自动通过审核。一审审核（自提交之日起两个工作日），二审审核（一审通过后三个工作日）</p>';
    html += '<p>3、审核通过:</p>';
    html += '<p>提示审核拒绝（旅客若有疑问可致电客服95326查询）</p>';
    html += '</div>';
    $(".container_full").append(html);
    hideIFrameLoading();
}

//机场信息  相关JS
function initAirportInfo(){
    //获取机场信息
    getInitInfo();

    var html = createAirportInfo();
    $(".container_full").append(html);
    renderFrom();

    //事件初始化
    initEvent();
    hideIFrameLoading();
}

//机场信息页面结构
function createAirportInfo() {
    var html = '';
    html += createAirHead();
    html += createAirContent();
    return html;
}

//创建机场信息头部
function createAirHead() {
    var html = '';
    html += '<div class="airport-top hnaui-panel hnaui-clear">';
    html +=        '<div class="hnaui-panel-title">';
    html +=             '<i class="hnaui-icon">&#xe90c;</i>机场信息';
    html +=         '</div>';
    html +=         '<form class="hnaui-form">';
    html +=             '<div class="hnaui-form-item">';
    html +=                 '<label class="hnaui-form-label">国家：</label>';
    html +=                 '<div class="hnaui-input-block">';
    html +=                     '<select name="country" hna-verify="required" hna-search="">';
    html +=                         '<option value="1">中国</option>';
    html +=                     '</select>';
    html +=                 '</div>';
    html +=             '</div>';
    html +=         createSelectCity();             
    html +=         '</form>';
    html +=     '</div>';
    return html;
}

//创建城市下拉框
function createSelectCity() {
    var html = '';
    html += '<div class="hnaui-form-item">';
    html +=     '<label class="hnaui-form-label">城市：</label>';
    html +=      '<div class="hnaui-input-block">';
    html +=          '<select name="city" hna-verify="required" hna-filter="city">';
    (_airportCity || []).forEach(function(item , index) {
        html += '<option value="'+ index +'">' + item + '</option>';
    });
    html +=           '</select>';
    html +=      '</div>';
    html += '</div>';
    return html;
}

//创建展示信息面板
function createAirContent() {
    var html = '';
    html += '<div class="airport-content hnaui-panel hnaui-clear">';
    html +=     '<div class="airport-tab">';
    html +=         '<ul class="tab-ul hnaui-clear">';
    html +=             '<li class="current" data-type="0">机场信息</li>';
    html +=             '<li data-type="1">转机信息</li>';
    html +=             '<li data-type="2">旅游信息</li>';
    html +=             '<li data-type="3">海航当地机构</li>';
    html +=         '</ul>';
    html +=     '</div>';
    html +=     '<div class="hnaui-panel-contents">';
    html += createInfoContents();
    html +=     '</div>';
    html += '</div>';
    return html;
}

//具体的tab切换页
function createInfoContents() {
    var html ='';
    html += createFlightInfo();
    html += createChangeInfo();
    html += createTravelInfo();
    html += createLocalInfo();
    return html;
}

//机场信息
function createFlightInfo() {
    var html = '';
    html += '<div class="tab-content current" data-type="1">';
    html +=     '<h3>机场信息</h3>';
    (_airportInfo.location || []).forEach(function(item , index) {
        html += '<dl class="hnaui-clear">';
        html +=     '<dt>'+ item.title +'：</dt>';
        html +=     '<dd>'+ item.content +'</dd>';
        html += '</dl>';
    });
    html +=     '<h3>交通工具</h3>';
    (_airportInfo.trafic || []).forEach(function(item , index) {
        html += '<dl class="hnaui-clear">';
        html +=     '<dt>'+ item.title +'：</dt>';
        html +=     '<dd>'+ item.content +'</dd>';
        html += '</dl>';
    });
    html += '</div>';
    return html;
}

//转机信息
function createChangeInfo() {
    var arr = [
        '<div class="tab-content" data-type="2">',
            '<h3>转机信息</h3>',
            '<p>',
                '旅客预订的联程客票，于各机场的中转时间（上段客票落地时刻到下段客票起飞时刻）一般情况应满足：',
            '</p>',
            '<p>',
                '国内转国内≥2小时',
            '</p>',
            '<p>',
                '国内转国际或者国际转国内≥3小时',
            '</p>',
            '<p>',
                '国际转国际≥3小时',
            '</p>',
            '<p>',
                '祥鹏航空在部分航线提供有"海天无限"中转服务产品，较之普通联程客票，中转时间略低，具体产品执行标准可咨询祥鹏航空24小时客服热线95326。',
            '</p>',
            '<p>',
                '各地机场的中转时间，请以该机场相关规定为准。',
            '</p>',
        '</div>'
    ].join('');
    return arr;
}

//旅游信息
function createTravelInfo() {
    var arr = [
        '<div class="tab-content" data-type="3">',
            '<h3>旅游信息</h3>',
            '<dl class="hnaui-clear">',
                '<dt>语言：</dt>',
                '<dd>普通话</dd>',
            '</dl>',
            '<dl class="hnaui-clear">',
                '<dt>使用货币：</dt>',
                '<dd>人民币</dd>',
            '</dl>',
            '<dl class="hnaui-clear">',
                '<dt>办公时间：</dt>',
                '<dd>企业通常星期一至星期五上班，时间为8:30/9:00–17:00/18:00，大型商店及营业场所星期六和星期日也营业。</dd>',
            '</dl>',
            '<dl class="hnaui-clear">',
                '<dt>紧急号码：</dt>',
                '<dd>急救：120 火警：119 警察局：110</dd>',
            '</dl>',
            '<dl class="hnaui-clear">',
                '<dt>正常电压：</dt>',
                '<dd>220伏</dd>',
            '</dl>',
            '<dl class="hnaui-clear">',
                '<dt>移动通讯网络模式：</dt>',
                '<dd>国家代码：+86 地区代码：(0)411 移动通信网络模式：GSM</dd>',
            '</dl>'
    ].join('');
    arr += '<dl class="hnaui-clear">';
    arr +=          '<dt>景    点：</dt>';
    arr +=          '<dd>'+ _airportInfo.tourist +'</dd>';
    arr +=      '</dl>';
    arr +=  '</div>';
    return arr;
}

//海航当地机构
function createLocalInfo() {
    var arr = [
        '<div class="tab-content" data-type="4">',
            '<h3>当地联系资料</h3>',
            '<p>各地市区及机场售票处信息 <a href="/airR/singlePage?singleId=ticketOffice">点击此处查询</a></p>',
        '</div>'
    ].join('');
    return arr;
}
//机场信息事件初始化
function initEvent() {
    //监听城市选择下拉框
    globalFrom.on('select(city)' , function(data) {
        _count = parseInt(data.value , 10);
        //获取机场信息
        getInitInfo();

        var html = createInfoContents();
        $(".hnaui-panel-contents").html(html);
    });

    //tab切换
    $(".tab-ul").on("click" , "li" , function(e){
        e = e || window.event;
        e.stopPropagation();
        
        var $this = $(e.target);
        var type = $this.data("type");
        $this.addClass("current").siblings().removeClass("current");
        $(".tab-content").eq(type).addClass("current").siblings().removeClass("current");
    });
}

//机场信息数据获取
function getInitInfo() {
    _airportInfo = {//数据初始化 , 默认为北京
        location : [
            {
                title : "位置",
                content : "距离天安门25公里"
            },
            {
                title : "网站",
                content : "www.bcia.com.cn"
            }
        ],
        trafic : [
            {
                title : "巴　士",
                content : "*可乘坐机场巴士往返首都机场与西单、北京站等地，周边省市可乘坐省级旅客班车*机场巴士服务热线：010-64594375/76"
            },
            {
                title : "地　铁",
                content : "* 路线：东直门-三元桥-T3-T2-三元桥-东直门 * 运营时间：东直门：06：00~22：30, T2: 06:30~23:00 * 间隔时间：每15分钟 * 价格：人民币25元"
            },
            {
                title : "出租车",
                content : "* 40-50分钟,大约90-100元人民币(含高速公路费10元人民币)"
            }
        ],
        tourist : '天坛、颐和园、故宫、天安门'
    };

    //根据标识符变更机场信息
    changeAirportInfo();
}

//变更机场信息
function changeAirportInfo() {
    switch(_count) {
        case 0 : _airportInfo.location[0].content = '距离天安门25公里';
                 _airportInfo.location[1].content = 'www.bcia.com.cn';
                 _airportInfo.tourist = '天坛、颐和园、故宫、天安门';
                 _airportInfo.trafic = getBeiJin();
                 break;
        case 1 : _airportInfo.location[0].content = '距离市区约36.5公里';
                 _airportInfo.location[1].content = 'www.ynairport.com';
                 _airportInfo.tourist = '石林、九乡、西山龙门、翠湖、民族村、世博园、大观楼';
                 _airportInfo.trafic = getKunMing();
                 break;
    }
}
//北京交通
function getBeiJin() {
    var arr = [
            {
                title : "巴　士",
                content : "*可乘坐机场巴士往返首都机场与西单、北京站等地，周边省市可乘坐省级旅客班车*机场巴士服务热线：010-64594375/76"
            },
            {
                title : "地　铁",
                content : "* 路线：东直门-三元桥-T3-T2-三元桥-东直门 * 运营时间：东直门：06：00~22：30, T2: 06:30~23:00 * 间隔时间：每15分钟 * 价格：人民币25元"
            },
            {
                title : "出租车",
                content : "* 40-50分钟,大约90-100元人民币(含高速公路费10元人民币)"
            }
        ];
    return arr;
}

//昆明交通
function getKunMing() {
    var arr = [
            {
                title : "巴　士",
                content : "空港一号线（主城区、西市区、西北市区线）： 西驿酒店（小西门）—云南民族大学（回程）—昆明雄业大酒店（北京路）（回程）—新迎小区（人民东路）—东部客运站（回程）—昆明长水国际机场 "
            },
            {
                title : "空港二号线（南市区线）",
                content : "昆明巫家坝国际机场—昆明火车站—佳路达酒店（环城南路）（去程）—泰丽酒店（环城南路）（回程）—昆明长水国际机场"
            },
            {
                title : "空港三号线（北市区线）",
                content : "昆明长水国际机场—世博园—北辰财富中心（北辰大道）—北市区（霖雨路）。"
            },
            {
                title : "地　铁",
                content : "（东部客运站—长水机场） 全程运行时间21—23分钟 费用：5元"
            },
            {
                title : "出租车",
                content : "起步价为8元（不含2.5元的燃油附加费）（新闻路—长水机场）　预计时间：39分钟　预计费用：86元以上"
            }
        ];
    return arr;
}

//创建iframe
function createIFrameEl(src) {
    if (!src) {
        src = _iFrameSrc;
    }
    var html = '<iframe id="paymentFrame" name="mainFrame" scrolling="auto" frameborder="no" border="0" marginwidth="0" marginheight="0" allowtransparency="yes" src="' + src + '" style="width:100%;height:' + _iFrameH + ';">';
    html += '</iframe>';

    $(".container_full").append(html);
    isLoadFrame();
}
//隐藏加载动画
function hideIFrameLoading() {
    $(".search-loading").hide();
    hna.goToTop();
}
//判断iFrame是否加载成功
function isLoadFrame(url, callback) {
    if (!url) {
        url = _iFrameSrc;
    }
    var jq = top.jQuery;
    var $iFrame = jq('iframe[src="' + url + '"]');
    if (isIE()) {
        //IE浏览器
        $iFrame[0].onload = function () {

            hideIFrameLoading();
            if (hna.isFunction(callback)) {
                callback();
            }
        };
    } else {
        $iFrame.contents().ready(function () {

            hideIFrameLoading();
            if (hna.isFunction(callback)) {
                callback();
            }
        });
    }
}
//判断是否是IE浏览器
function isIE() {
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (window.navigator.appName == "Microsoft Internet Explorer") {
        try {
            var version = userAgent.match(/msie ([\d.]+)/)[1];
            if (isNaN(version) == false) {
                return true;
            }
        } catch (e) {
            return false;
        }
    }
    return false;
}
