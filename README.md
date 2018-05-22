# nodeweb项目框架
`
`=======================================================================================================================
`
` ----|nodeWeb
` ----|
`     |-----|data       服务端文件夹
`           |------|db           操作mysql数据库的底层方法
`                  |------|mysql-config.js      链接mysql的配置
`                  |------|mysql-dataModel.js   针对操作数据库之后的返回结果，进行重组
`                  |------|mysql-pooling.js     封装了单语句操作query和事物操作beginTransaction方法
`                  |------|uq-db.sql            乌航后台管理需要创建的表
`           |
`           |------|models
`                  |------|bannerModel.js       封装banner图的相关方法
`                  |------|baseModel.js         封装了操作mysql数据库的相关方法，增删改查
`                  |------|pagingModel.js       封装分页查询的方法
`                  |------|rulesModel.js        封装规章制度类静态文件的相关方法
`           |------|tools        服务端工具文件
`                  |------|guid.js              生成唯一的不重复的guid
`                  |------|ip.js                获取请求的ip
`                  |------|mailer.js            发送邮件
`                  |------|md5.js               MD5加密
`                  |------|moment.js            服务端时间处理方法
`           |------|urumqi-air   乌航
`           |------|session.js   处理session的文件
`     |
`     |-----|public     静态资源文件
`           |------|urumqi-air   乌航
`                  |------|air   压缩合并编译之后的静态资源文件夹，浏览器读取静态资源的地方
`                  |------|dev   开发文件夹
`                         |------|font   字体文件夹
`                         |
`                         |------|html   前端页面ajax请求获取的html文件夹
`                         |
`                         |------|images 图片文件夹
`                         |
`                         |------|js
`                                |------|business 业务JS文件夹
`                                       |------|airEye   购票模块
`                                       |------|airM     官网后台管理
`                                       |------|airP     支付模块
`                                       |------|airR     规章制度类静态页模块
`                                       |------|airU     用户中心模块
`                                       |------|mmvDemo  人机验证demo
`                                |
`                                |------|public   公共JS文件夹
`                                       |------|base
`                                              |------|hna-base.js    包含页面公用JS
`                                                     |------|JsErrorTips()                            try catch 报错处理
`                                                     |------|renderFrom()                             重新渲染from
`                                                     |------|initElement()                            重新渲染常用元素控件
`                                                     |------|globalFrom                               全局的表单元素控件对象
`                                                     |------|globalElement                            全局的常用元素控件对象
`                                                     |------|globalDate                               全局的日期控件对象
`                                                     |------|$(function () {})                        页面头，尾，右侧按钮的JS处理
`                                              |
`                                              |------|hna-browser.js 判断浏览器是否能正常浏览器页面，版本过低会提示
`                                              |
`                                              |------|hna-helper.js  提供的一些最底层JS方法，不依赖任何JS文件
`                                                     |------|Array.prototype.select()                 数组原型链上面的方法-将数组每一项进行指定转换,返回新的数组
`                                                     |------|Array.prototype.sum()                    数组原型链上面的方法-统计数组中符合条件的项的和
`                                                     |------|Array.prototype.count()                  数组原型链上面的方法-统计数组中符合条件的项的个数
`                                                     |------|Array.prototype.all()                    数组原型链上面的方法-判断数组中是否所有项都满足条件
`                                                     |------|Array.prototype.any()                    数组原型链上面的方法-判断数组中是否存在满足条件的项
`                                                     |------|Array.prototype.first()                  数组原型链上面的方法-过滤数组中满足条件的第一项
`                                                     |------|Array.prototype.forEach()                数组原型链上面的方法-对数组的每一项分别执行指定的函数
`                                                     |------|Array.prototype.where()                  数组原型链上面的方法-找出数组中符合条件的项
`                                                     |------|Array.prototype.indexOf()                数组原型链上面的方法-数组的indexOf方法,IE8及以下版本浏览器没有内置indexOf方法
`                                                     |------|Array.prototype.max()                    数组原型链上面的方法-查询数组中的过滤后值最大的项
`                                                     |------|Array.prototype.min()                    数组原型链上面的方法-查询数组中的过滤后值最小的项
`                                                     |------|Array.prototype.contains()               数组原型链上面的方法-检测数组中是否包含给定元素
`                                                     |------|Array.prototype.remove()                 数组原型链上面的方法-移除数组中符合条件的项
`                                                     |------|Array.prototype.distinct()               数组原型链上面的方法-去除数组中的重复项,返回不包含重复项的新数组
`                                                     |------|Array.prototype.equal()                  数组原型链上面的方法-判断两个数组是否相同
`                                                     |------|String.prototype.trim()                  字符串原型链上面的方法-去掉字符串中的空白符号
`                                                     |------|String.prototype.trimLeft()              字符串原型链上面的方法-去掉字符串开头的空白符号
`                                                     |------|String.prototype.trimRight()             字符串原型链上面的方法-去掉字符串结尾的空白符号
`                                                     |------|String.prototype.contains()              字符串原型链上面的方法-判断字符串是否包含指定内容
`                                                     |------|String.prototype.startWith()             字符串原型链上面的方法-判断字符串是否以指定内容开头
`                                                     |------|String.prototype.format()                字符串原型链上面的方法-将字符串用给定的值进行格式化
`                                                     |------|String.prototype.toSeparate()            字符串原型链上面的方法-将只包含数字的字符串加入千分符(,)
`                                                     |------|Number.prototype.toSeparate()            数字原型链上面的方法-将数字加入千分符(,)转换成字符串
`                                                     |------|hna.isFunction()                         判断是否为函数类型
`                                                     |------|hna.isString()                           判断是否为String类型
`                                                     |------|hna.isNumber()                           判断是否为Number类型
`                                                     |------|hna.isDate()                             判断是否为时间类型
`                                                     |------|hna.isRegExp()                           判断是否为正则表达式类型
`                                                     |------|hna.isError()                            判断是否为函数
`                                                     |------|hna.isArguments()                        判断是否为参数
`                                                     |------|hna.isObject()                           判断是否为对象
`                                                     |------|hna.isArray()                            判断是否为数组
`                                                     |------|hna.isNaN()                              判断是否为NaN
`                                                     |------|hna.isBoolean()                          判断是否为布尔类型
`                                                     |------|hna.isNull()                             判断是否为NULL
`                                                     |------|hna.isUndefined()                        判断是否为Undefined
`                                                     |------|hna.random()                             返回一个min 和 max之间的随机整数
`                                                     |------|hna.after()                              创建一个函数, 只有在运行了 count 次之后才有效果
`                                                     |------|hna.toFloat()                            把字符串尽可能的转化成浮点数
`                                                     |------|hna.cloneObj()                           深度的克隆对象
`                                                     |------|hna.throttle_duration()                  节流函数
`                                                     |------|hna.getRequest()                         获取url参数并放到数组中
`                                                     |------|hna.setRequestParam()                    设置url中参数值
`                                                     |------|hna.closeWebPage()                       关闭当前窗口的方法，被注释掉了
`                                                     |------|hna.getBodySizeInfo()                    获取body的高度，宽度，滚动条高度和宽度，以及滚动条滚动的位置
`                                                     |------|hna.setBodySizeInfo()                    设置滚动条的高度和宽度位置
`                                                     |------|hna.isPC()                               判断是否为PC端
`                                                     |------|hna.goToTop()                            端缓慢滑动到页面顶部
`                                                     |------|hna.compile()                            字符串加密
`                                                     |------|hna.uncompile()                          字符串解密
`                                              |
`                                              |------|hna-i18n.js    国际化处理
`                                                     |------|hna._i18nMap.addLanguages()              添加需要翻译的中文
`                                                     |------|_i18n()                                  中英文自动化切换方法
`                                              |
`                                              |------|hna-store.js   封装的本地存储方法
`                                                     |------|hna._store.setStore()                    往本地localStorage存储数据
`                                                     |------|hna._store.getStore()                    从本地localStorage获取数据
`                                                     |------|hna._store.removeStore()                 从本地localStorage删除数据
`                                                     |------|getCrossDomainJson()                     获取JS或者JSON数据，支持跨域
`                                       |
`                                       |------|hnaui    查看http://www.layui.com/这里面的文档，只是把lay改成了hna
`                                       |
`                                       |------|lib
`                                              |------|jquery-1.9.1.min.js
`                                       |
`                                       |------|main     前端管理JS的主文件
`                                              |------|hna-main-base.js   包含有前端全局的一些基本信息
`                                                     |------|hna._env                                 全局的开发环境和生产环境标识production
`                                                     |------|hna._code                                全局的航司编号
`                                                     |------|hna._lang_type                           全局的语言
`                                                     |------|hna._static_host                         全局的静态资源路径前缀
`                                                     |------|hna._img_host                            全局的图片的基本路径
`                                                     |------|hna._server_host                         全局的页面路由路径前缀
`                                                     |------|hna._interface_host                      全局的请求接口路径前缀
`                                                     |------|hna._version                             全局的版本号
`                                                     |------|hna._exp                                 全局的本地存储的数据默认保存时间 一天
`                                              |
`                                              |------|hna-main-info.js   前端管理JS中，各个页面需要的JS配置信息
`                                       |
`                                       |------|verifyInput
`                                              |------|hna-address-info.js             邮寄地址的构造函数
`                                                     |------|new AddressInfo()                        new邮寄地址的实例
`                                              |
`                                              |------|hna-airLine-type.js             航司数据
`                                                     |------|_airLineList                             航司类型数组
`                                                     |------|_filterAirLine()                         航司类型值转换
`                                              |
`                                              |------|hna-filter-type.js              类型转换公用方法
`                                                     |------|_filterType()                            类型转换公用方法
`                                              |
`                                              |------|hna-id-type.js                  证件类型
`                                                     |------|_idTypeList                              证件类型数组
`                                                     |------|_filterIdType()                          证件类型值转换
`                                              |
`                                              |------|hna-orderState-type.js          订单状态
`                                                     |------|_orderStateList                          订单状态类型数组
`                                                     |------|_filterOrderState()                      订单状态类型值转换
`                                              |
`                                              |------|hna-pass-type.js                乘机人类型
`                                                     |------|_passTypeList                            乘机人类型数组
`                                                     |------|_filterPassType()                        乘机人类型值转换
`                                              |
`                                              |------|hna-passenger-info.js           乘机人的构造函数
`                                                     |------|new Traveller()                          new乘机人的实例
`                                              |
`                                              |------|hna-sex-type.js                 性别
`                                                     |------|_sexTypeList                             性别数组
`                                                     |------|_filterSexType()                         性别类型值转换
`                                              |
`                                              |------|hna-user-info.js                用户的构造函数
`                                                     |------|new UserInfo()                           new用户的实例
`                                              |
`                                              |------|hna-verification-idNo.js        验证证件号码
`                                                     |------|VerificationIdNo()                       判断证件号码，如果是身份证，则自动生成生日
`                                                     |------|getBirthdayFormIdNo()                    从身份证中获取出生日期
`                                                     |------|setBirthdayValue()                       设置出生日期文本框的值
`                                                     |------|IDCardCheck()                            判断身份证号码的合法性
`                                              |
`                                              |------|hna-verification-name.js        验证乘机人姓名
`                                                     |------|VerificationName()                       判断乘机人姓名是否符合要求
`                                              |
`                                              |------|hna-verifyInput-config.js       查询航班的时候，城市选择面板
`                                              |------|hna-verifyInput-showTips.js     查询航班的时候，城市选择面板
`                                       |
`                                       |------|widget
`                                              |------|flight-city.js             查询航班的时候，城市选择面板
`                                                     |------|$(".").flightCity()                      初始化城市面板
`                                              |
`                                              |------|flight-seat.js             前端管理JS中，各个页面需要的JS配置信息

`                                              |------|hna-ajax.js                全局的ajax请求的，统一处理所有页面的ajax请求
`                                                     |------|hna.ajax()
`                                              |
`                                              |------|hna-base.js                前端管理JS中，各个页面需要的JS配置信息
`                                              |
`                                              |------|hna-checkbox-all.js        前端管理JS中，各个页面需要的JS配置信息
`                                                     |------|initCheckbox()                           复选框的全选和不选，其hna-filter需要固定为allChoose和oneChoose
`                                              |
`                                              |------|hna-date.js                全局的时间处理对象
`                                                     |------|hna._date.getDateInfo()                  获取时间对象
`                                                     |------|hna._date.addDate()                      增加N天
`                                                     |------|hna._date.addMonth()                     增加N月
`                                                     |------|hna._date.addYear()                      增加N年
`                                              |
`                                              |------|hna-form.js                form表单的处理
`                                                     |------|hna.getFormParameter()                   读取表单数据,以元素name为key,值为value的object
`                                                     |------|hna.filterForm()                         表单输入框校验,对表单中所有输入框文本框添加blur侦听函数，检查是否包含禁止的字符
`                                                     |------|hna.verifyForm()                         提交表单的时候，进行表单校验,检查是否包含禁止的字符
`                                                     |------|hna.submitForm()                         表单提交
`                                                     |------|hna.inputFilter()                        文本框值过滤
`                                                     |------|hna.urlFilter()                          url非法字符过滤
`                                              |
`                                              |------|hna-jsData.js   从本地localStorage中获取数据；如果没有，则异步请求JS获取数据，然后保存在本地localStorage中
`                                                     |------|hna.jsData.getCountryData()              获取国籍，护照签发国数据
`                                                     |------|hna.jsData.getProvinceData()             获取省市区三级联动的数据
`                                              |
`                                              |------|hna-loading.js             全局页面加载动画，带飞机的
`                                                     |------|hna.loading()                            显示和隐藏全局的加载动画，带参数false为隐藏，其他情况为显示
`                                              |
`                                              |------|hna-mmv.js                 前端人机滑动验证
`                                                     |------|HNAmoveReg.eventInit()                   new出人机滑动验证的实例
`                                              |
`                                              |------|hna-page.js                列表分页
`                                                     |------|new Paging()                             new出分页列表的实例
`                                                     |------|Paging.prototype.refresh()               刷新分页列表的实例
`                                              |
`                                              |------|hna-regex.js               全局的正则表达式
`                                                     |------|hna.regex.mobile                         移动电话的正则表达式
`                                                     |------|hna.regex.phone                          固定电话的正则表达式
`                                                     |------|hna.regex.postcode                       邮政编码的正则表达式
`                                                     |------|hna.regex.cardNo                         护照编号的正则表达式
`                                                     |------|hna.regex.email                          邮箱的正则表达式
`                                                     |------|hna.regex.address                        邮寄地址的正则表达式
`                                                     |------|hna.regex.date                           日期的正则表达式
`                                                     |------|hna.regex.nameReg                        中文姓名的正则表达式
`                                                     |------|hna.regex.userName                       用户名的正则表达式
`                                                     |------|hna.regex.password                       密码的正则表达式
`                                                     |------|hna.regex.question                       密保的正则表达式
`                                                     |------|hna.regex.valiCode                       动态验证码的正则表达式
`                                              |
`                                              |------|hna-threeLingAge.js        省市区三级联动
`                                                     |------|hna.initProvince()                       省市区三级联动初始化
`                                              |
`                                              |------|hna-verification-code.js   发送动态口令倒计时
`                                                     |------|$(".hnaui-verifybtn").VerificationCode();
`                                              |
`                                              |------|hna-flightCity.js          前端管理JS中，各个页面需要的JS配置信息
`                                                     |------|hna.city.getByCode()                     通过城市三字码code获取对应的城市名city
`                                                     |------|hna.city.getByCity()                     通过城市名city获取对应的城市三字码code
`                                |
`                                |------|data     保存在JS文件里面的数据
`                                       |------|flightCity.js                  城市选择面板的数据
`                                       |------|flightSeatConfig.js            不同机型的座位分布数据
`                                       |------|province.js                    省市区的数据
`                         |
`                         |------|sass
`                                |------|partial     sass文件中的各个模块
`                                       |------|theme.scss                     主题文件，里面包含了字体路径前缀，图片路径前缀，颜色
`                                |------|style       各个页面需要的css文件
`                                       |------|admin.scss                     后台管理样式文件
`                                       |------|flight.scss                    查询航班，乘机人页面，选择座位等页面的样式文件
`                                       |------|forie.scss                     支持IE8的样式文件
`                                       |------|icon.scss
`                                       |------|index.scss                     首页样式文件
`                                       |------|mmv.scss                       人机验证demo样式文件
`                                       |------|order.scss                     订单相关的样式文件，订单列表，订单详情，升舱改期，退票
`                                       |------|payment.scss                   支付模块样式文件
`                                       |------|rules.scss                     规章制度类静态文件的样式文件
`                                       |------|user.scss                      用户中心样式文件
`     |
`     |-----|routes     服务端路由
`           |------|urumqi-air   乌航
`                  |------|interface_routes_config.js   接口路由
`                  |------|server_routes_config.js      页面路由
`           |
`           |------|index.js   路由处理方法
`     |
`     |-----|views      服务端页面模板页
`           |------|urumqi-air   乌航
`                  |------|pages        各业务页面
`                  |------|partial      页面上面的一些独立性很强的模块
`                  |------|error.html   错误页面
`                  |------|index.html   首页
`           |
`           |------|layout.html   服务端页面模板页的主文件
`     |
`     |-----|weblogs      服务端生成的日志
`     |
`     |-----|.gitignore   这个文件的作用就是告诉Git哪些文件不需要添加到版本管理中
`     |
`     |-----|app.js       项目的主文件
`     |
`     |-----|config.js    项目的基本配置参数
`           |------|company             机构编码
`           |------|companyName         机构名称
`           |------|companyAbbName      机构简称
`           |------|port                端口
`           |------|server_host         服务端路径前缀
`           |------|interface_host      接口路径前缀
`           |------|static_host         静态资源路径前缀 包括js,css文件
`           |------|ing_host            图片静态资源路径前缀
`           |------|version             版本号
`           |------|version             版本号
`           |------|setting             相关参数
`                  |------|cookieSecret         通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
`                  |------|sessionTimeOut       session过期的时间
`                  |------|db                   数据库的类型
`                  |------|host                 数据库的主机地址
`                  |------|user                 数据库的用户名
`                  |------|password             数据库的密码
`                  |------|database             数据库名
`                  |------|port                 数据库的端口号
`           |
`           |------|sessionTimeOut      session过期的时间
`     |
`     |-----|favicon.ico  网站图标
`     |
`     |-----|gulpfile.js  gulp定义的4个任务
`           |------|concat-script       合并与压缩JS文件的任务
`           |------|default             自动压缩合并编译的任务，能自动启动项目
`           |------|html-img-font       压缩html，图片，字体文件的任务
`           |------|sass                编译SASS文件的任务
`     |
`     |-----|hbs.js       hbs模板引擎的配置与自定义的方法
`     |
`     |-----|log.json     日志的配置
`     |
`     |-----|package.json
`           |------|express
`           |------|body-parser         bodyParser用于解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理. https://github.com/expressjs/body-parser
`           |------|cookie-parser
`           |------|express-session
`           |------|serve-favicon
`           |------|grpc
`           |------|images              图像处理的中间件
`           |------|mockjs              按要求随机大量生成数据的一个中间件
`           |------|underscore          JS工具集
`           |------|gulp
`           |------|node-sass           gulp-sass需要依赖它
`           |------|gulp-sass           编译SASS文件
`           |------|gulp-uglify         压缩JS文件
`           |------|gulp-concat         合并JS文件
`           |------|browser-sync        可以同时同步刷新多个浏览器，更神奇的是你在一个浏览器中滚动页面、点击按钮、输入框中输入信息等用户行为也会同步到每个浏览器中。
`           |------|hbs                 hbs模板引擎中间件
`           |------|nodemailer          发送邮件中间件
`           |------|mysql               链接mysql数据库需要的中间件
`           |------|log4j               日志中间件
`     |
`     |-----|README.md

`=======================================================================================================================


```bash
` 1.安装node 版本号为6.9.5
` 2.在Terminal中运行 npm install 下载package.json里面的资源
` 3.继续执行命令 node app
` 4.在浏览器输入url：http://localhost:3000/ 可以直接打开页面
` 5.每次更新的时候，都需要运行一下gulp里面的任务，以便生成最新的本地air文件
```





#页面适配范围   1200以上；1200-992；992-768；768以下

...提交测试

```新建一个页面的步骤：
` 1.路由，建立该页面的路由；routes>urumqi-air>server_routes_config.js
` 2.html页面，在views里面的对应位置新建html文件；
` 3.在main.js里面配置该页面需要的依赖JS; public>dev>js>public>main>hna-main-info.js
` 4.在新建需要的css文件；public>dex>sass>style
