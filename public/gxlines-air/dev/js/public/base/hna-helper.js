(function (w,doc) {
        /*
         * 对ie下数组添加sort,返回数组
         * @param string|function, 排序函数
         * @return Array
         */
        var ua = window.navigator.userAgent.toLowerCase(),
            reg = /msie|applewebkit.+safari/;
        if(reg.test(ua)){
            var _sort = Array.prototype.sort;
            Array.prototype.sort = function(fn){
                if(!!fn && typeof fn === 'function'){
                    if(this.length < 2) {
                        return this;
                    }

                    var i = 0, j = i + 1, l = this.length, tmp, r = false, t = 0;

                    for(; i < l; i++){
                        for(j = i + 1; j < l; j++){
                            t = fn.call(this, this[i], this[j]);
                            r = (typeof t === 'number' ? t : !!t ? 1 : 0) > 0 ? true : false;
                            if(r){
                                tmp = this[i];
                                this[i] = this[j];
                                this[j] = tmp;
                            }
                        }
                    }
                    return this;
                }else{
                    return _sort.call(this);
                }
            };
        }
    var ArrayPrototype = Array.prototype;
    if (!ArrayPrototype.select) {
        /*
         * 将数组每一项进行指定转换,返回新的数组
         * @param string|function, 属性或过滤函数
         * @return Array
         */
        ArrayPrototype.select = function (arg) {
            var i = 0, len = this.length, result = [];
            if (len == 0) {
                return result;
            }
            while (i < len) {
                if (i in this && this[i] !== undefined) {
                    if (typeof arg == "string" && this[i].hasOwnProperty(arg)) {
                        result.push(this[i][arg]);
                    } else if (typeof arg == "function") {
                        result.push(arg.call(this, this[i], i, this));
                    }
                }
                i++;
            }
            return result;
        };
    }
    if (!ArrayPrototype.sum) {
        /*
         * 统计数组中符合条件的项的和
         * @param function, 过滤函数
         * @return number
         */
        ArrayPrototype.sum = function (f) {
            var i = 0, len = this.length, total = 0;
            if (len == 0) {
                return total;
            }
            while (i < len) {
                total += f.call(this, this[i], i, this);
                i++;
            }
            return total;
        };
    }
    if (!ArrayPrototype.count) {
        /*
         * 统计数组中符合条件的项的个数
         * @param function, 过滤函数
         * @return number
         */
        ArrayPrototype.count = function (f) {
            var i = 0, len = this.length, count = 0;
            if (len == 0) {
                return count;
            }
            while (i < len) {
                if (f.call(this, this[i], i, this)) {
                    count++;
                }
                i++;
            }
            return count;
        };
    }
    if (!ArrayPrototype.all) {
        /*
         * 判断数组中是否所有项都满足条件
         * @param function, 函数
         * @return boolean
         */
        ArrayPrototype.all = function (f) {
            var i = 0, len = this.length;
            if (len == 0) {
                return true;
            }
            while (i < len) {
                if (i in this && !f.call(this, this[i], i, this)) {
                    return false;
                }
                i++;
            }
            return true;
        };
    }

    if (!ArrayPrototype.any) {
        /*
         * 判断数组中是否存在满足条件的项
         * @param function, 函数
         * @return boolean
         */
        ArrayPrototype.any = function (f) {
            var i = 0, len = this.length;
            if (len == 0) {
                return false;
            }
            while (i < len) {
                if (i in this && f.call(this, this[i], i, this)) {
                    return true;
                }
                i++;
            }
            return false;
        };
    }
    if (!ArrayPrototype.first) {
        /*
         * 过滤数组中满足条件的第一项
         * @param function, 函数
         * @return 数组元素
         */
        ArrayPrototype.first = function (f) {
            var i = 0, len = this.length;
            if (len == 0) {
                return null;
            }
            while (i < len) {
                if (i in this && f.call(this, this[i], i, this)) {
                    return this[i];
                }
                i++;
            }
            return null;
        };
    }
    if (!ArrayPrototype.forEach) {
        /*
         * 对数组的每一项分别执行指定的函数
         * @param function, 函数
         */
        ArrayPrototype.forEach = function (f) {
            var i = 0, len = this.length;
            if (len == 0) {
                return;
            }
            while (i < len) {
                if (i in this) {
                    var item = this[i];
                    //返回false则跳出循环
                    if (f.call(this, item, i, this) === false) {
                        break;
                    }
                    this[i] = item;
                }
                i++;
            }
        };
    }
    if (!ArrayPrototype.where) {
        /*
         * 找出数组中符合条件的项
         * @param string|function, 属性或过滤函数
         * @return Array
         */
        ArrayPrototype.where = function (f) {
            var i = 0, len = this.length, result = [];
            if (len == 0) {
                return result;
            }
            while (i < len) {
                if (i in this && f.call(this, this[i], i, this)) {
                    result.push(this[i]);
                }
                i++;
            }
            return result;
        };
    }
    //for ie8
    if (!ArrayPrototype.indexOf) {
        /*
         * 数组的indexOf方法,IE8及以下版本浏览器没有内置indexOf方法
         * @param 数组元素
         * @param 查询的其实位置
         * @return number
         */
        ArrayPrototype.indexOf = function (elt /*, from*/) {
            var len = this.length >>> 0, from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0) {
                from += len;
            }
            for (; from < len; from++) {
                if (from in this && this[from] === elt){
                    return from;
                }
            }
            return -1;
        };
    }
    if (!ArrayPrototype.max) {
        /*
         * 查询数组中的过滤后值最大的项
         * @param function, 过滤函数
         * @return Array
         */
        ArrayPrototype.max = function (f) {
            var i = 1, len = this.length, tmp;
            if (len == 0) {
                return null;
            }
            tmp = this[0];
            var flag = f && typeof f == "function", left, right;
            while (i < len) {
                left = flag ? f.call(this, tmp, i - 1, this) : tmp;
                right = flag ? f.call(this, this[i], i, this) : this[i];
                if (i in this && left <= right) {
                    tmp = this[i];
                }
                i++;
            }
            return tmp;
        };
    }
    if (!ArrayPrototype.min) {
        /*
         * 查询数组中的过滤后值最小的项
         * @param function, 过滤函数
         * @return Array
         */
        ArrayPrototype.min = function (f) {
            var i = 1, len = this.length, tmp;
            if (len == 0) {
                return null;
            }
            tmp = this[0];
            var flag = f && typeof f == "function", left, right;
            while (i < len) {
                left = flag ? f.call(this, tmp, i - 1, this) : tmp;
                right = flag ? f.call(this, this[i], i, this) : this[i];
                if (i in this && left >= right) {
                    tmp = this[i];
                }
                i++;
            }
            return tmp;
        };
    }
    if (!ArrayPrototype.contains) {
        /*
         * 检测数组中是否包含给定元素
         * @param element | function, 查询元素或过滤函数
         * @return Array
         */
        ArrayPrototype.contains = function (arg) {
            if (typeof arg != "function") {
                return this.indexOf(arg) >= 0;
            }
            var i = 0, len = this.length;
            if (len == 0) {
                return false;
            }
            while (i < len) {
                if (i in this && arg.call(this, this[i], i, this)) {
                    return true;
                }
                i++;
            }
            return false;
        };
    }
    if (!ArrayPrototype.remove) {
        /*
         * 移除数组中符合条件的项
         * @param function, 过滤函数
         */
        ArrayPrototype.remove = function (f) {
            var len = this.length, i = len - 1, idxs = [];
            if (len == 0) {
                return;
            }
            while (i >= 0) {
                if (i in this && f.call(this, this[i], i, this)) {
                    idxs.push(i);
                }
                i--;
            }
            for (i = 0; i < idxs.length; i++) {
                this.splice(idxs[i], 1);
            }
        };
    }
    if (!ArrayPrototype.distinct) {
        /*
         * 去除数组中的重复项,返回不包含重复项的新数组
         * @param string | function, 对象属性名 或 过滤函数
         * @return Array
         */
        ArrayPrototype.distinct = function (arg) {
            var len = this.length, i = 0, result = [];
            if (len == 0) {
                return result;
            }
            while (i < len) {
                var cur = this[i];
                if (i in this && cur) {
                    if (typeof arg == "string" && cur.hasOwnProperty(arg) && !result.contains(function (r) {
                            return r[arg] == cur[arg];
                        })) {
                        result.push(cur);
                    } else if (typeof arg == "object" && arg instanceof Array && !result.contains(function (r) {
                            return arg.all(function (a) {
                                return cur.hasOwnProperty(a) && r[a] == cur[a];
                            });
                        })) {
                        result.push(cur);
                    }
                }
                i++;
            }
            return result;
        };
    }

    if (!ArrayPrototype.equal) {
        /*
         * 判断两个数组是否相同
         * @param Array, 与之比较的另一数组
         * @return Boolean
         */
        ArrayPrototype.equal = function (target) {
            if (!(target instanceof Array)) {
                return false;
            }
            var i = 0, len = this.length;
            if (len != target.length) {
                return false;
            }
            while (i < len) {
                if (this[i] != target[i]) {
                    return false;
                }
                i++;
            }
            return true;
        };
    }


    var StringPrototype = String.prototype;
    if (!StringPrototype.trim) {
        /*
         * 去掉字符串中的空白符号
         * @param function, 过滤函数
         * @return string
         */
        StringPrototype.trim = function () {
            return this.replace(/^(\s*)(\S+.*\S+)(\s*)$/, "$2");
        };
    }
    if (!StringPrototype.trimLeft) {
        /*
         * 去掉字符串开头的空白符号
         * @param function, 过滤函数
         * @return string
         */
        StringPrototype.trimLeft = function () {
            return this.replace(/^(\s*)(\S+.*)$/, "$2");
        };
    }
    if (!StringPrototype.trimRight) {
        /*
         * 去掉字符串结尾的空白符号
         * @param function, 过滤函数
         * @return string
         */
        StringPrototype.trimRight = function () {
            return this.replace(/^(.*\S+)(\s*)$/, "$1");
        };
    }
    //firefox 内置contains方法,后重命名为includes方法,case sensitive
    StringPrototype.contains = function (val, ignoreCase) {
        /*
         * 判断字符串是否包含指定内容
         * @param string, 给定的子字符串
         * @param boolean, 指示是否忽略大小写
         * @return boolean
         */
        if (!val) {
            return true;
        }
        return !ignoreCase ? this.indexOf(val) >= 0
            : this.toLowerCase().indexOf(val.toLowerCase()) >= 0;

    };
    if (!StringPrototype.startWith) {
        /*
         * 判断字符串是否以指定内容开头
         * @param string, 给定的子字符串
         * @param boolean, 指示是否忽略大小写
         * @return boolean
         */
        StringPrototype.startWith = function (val, ignoreCase) {
            return ignoreCase ? this.toLowerCase().indexOf(val.toLowerCase()) == 0 : this.indexOf(val) == 0;
        };
    }
    if (!StringPrototype.format) {
        /*
         * 将字符串用给定的值进行格式化
         * 使用占位符({n}),n为0-9的数字
         * @param Array | strings, 格式化参数
         * @return string
         */
        StringPrototype.format = function (/*arg1,arg2,arg3...*/) {
            if (arguments.length == 0) {
                return this;
            }
            var args = arguments[0];
            if (!(args instanceof Array)) {
                args = arguments;
            }
            var result = this.replace(/\{(\d)\}/g, function (placeholder, index) {
                return args[parseInt(index, 10)];
            });
            return result;
        };
    }
    //show a string of number in comma separate format
    //eg. "12345" -> "123,45"
    if (!StringPrototype.toSeparate) {
        /*
         * 将只包含数字的字符串加入千分符(,)
         * @return string
         */
        StringPrototype.toSeparate = function () {
            //var sign = this.indexOf("-") == 0;
            //var whole = (sign ? this.replace("-", "") : this).split("."), result = [];
            //var arr = whole[0].split("").reverse(), decimal = whole[1];
            //for (var i = 0; i < arr.length; i++) {
            //    result.push(arr[i]);
            //    if ((i + 1) % 3 == 0 && (i + 1 < arr.length)) result.push(",");
            //}
            //return (sign ? "-" : "") + result.reverse().join("") + (decimal ? "." + decimal : "");
            return this.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        };
    }

    var NumberPrototype = Number.prototype;
    //show a number in comma separate format
    //eg. 12345 -> "123,45"
    if (!NumberPrototype.toSeparate) {
        /*
         * 将数字以千分符的形式显示
         * @return string
         */
        NumberPrototype.toSeparate = function () {
            return this.toString(10).toSeparate();
        };
    }


    hna = w.hna || {};
    //*************************************************************下面的是一些JS数据类型判断的常用方法
    //对象是否包含给定的键吗？等同于object.hasOwnProperty(key)，但是使用hasOwnProperty 函数的一个安全引用，以防意外覆盖。
    hna.has = function (obj, key) {
        return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
    };
    //定义isArguments，isFunction，isString，isNumber，isDate，isRegExp，isError
    //isArguments 如果object是一个参数对象，返回true。
    //isFunction 如果object是一个函数（Function），返回true。
    //isString 如果object是一个字符串，返回true。
    //isNumber 如果object是一个数值，返回true (包括 NaN)。
    //isDate Returns true if object is a Date.
    //isRegExp 如果object是一个正则表达式，返回true。
    //isError 如果object继承至 Error 对象，那么返回 true。
    ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'].forEach(function (name) {
        hna['is' + name] = function (obj) {
            return Object.prototype.toString.call(obj) === '[object ' + name + ']';
        };
    });
    //如果object是一个参数对象，返回true。
    if (!hna.isArguments(arguments)) {
        hna.isArguments = function (obj) {
            return hna.has(obj, 'callee');
        };
    }
    //如果object是一个函数，返回true。
    if (typeof /./ != 'function' && typeof Int8Array != 'object') {
        hna.isFunction = function (obj) {
            return typeof obj == 'function' || false;
        };
    }
    // 如果object是一个对象，返回true。需要注意的是JavaScript数组和函数是对象，字符串和数字不是。
    hna.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };
    //如果object是一个数组，返回true。
    hna.isArray = Array.isArray || function (obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        };
    //如果object是 NaN，返回true。
    hna.isNaN = function (obj) {
        return hna.isNumber(obj) && obj !== +obj;
    };
    //如果object是一个布尔值，返回true，否则返回false。
    hna.isBoolean = function (obj) {
        return obj === true || obj === false || Object.prototype.toString.call(obj) === '[object Boolean]';
    };
    //如果object的值是 null，返回true。
    hna.isNull = function (obj) {
        return obj === null;
    };
    //如果obj是undefined，返回true。
    hna.isUndefined = function (obj) {
        return obj === void 0;
    };
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    hna.isArrayLike = function (collection) {
        var length = collection != null && collection.length;
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };

    //如果object 不包含任何值(没有可枚举的属性)，返回true。 对于字符串和类数组（array-like）对象，如果length属性为0，那么_.isEmpty检查返回true。
    //hna.isEmpty = function(obj) {
    //    if (obj == null) return true;
    //    if (hna.isArrayLike(obj) && (hna.isArray(obj) || hna.isString(obj) || hna.isArguments(obj))) return obj.length === 0;
    //    return _.keys(obj).length === 0;
    //};

    //返回一个min 和 max之间的随机整数。如果你只传递一个参数，那么将返回0和这个参数之间的整数。
    hna.random = function (min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };

    // 很有意思，研究了一下，基本上toString后的参数规定可以是2-36之间的任意整数，不写的话默认是10（也就是十进制），此时返回的值就是那个随机数。
    // 若是偶数，返回的数值字符串都是短的，若是奇数，则返回的将是一个很大长度的表示值。
    // 若<10 则都是数字组成，>10 才会包含字母。
    // 所以如果想得到一长串的随机字符，则需使用一个 > 10 且是奇数的参数，另外根据长度自行使用slice(2,n)截取！
    hna.randomWord = function(num){
        return Math.random().toString(36).substr(2);
    }

    //创建一个函数, 只有在运行了 count 次之后才有效果. 在处理同组异步请求返回结果时, 如果你要确保同组里所有异步请求完成之后才 执行这个函数, 这将非常有用。
    hna.after = function (times, func) {
        return function () {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        };
    };

    //把字符串尽可能的转化成浮点数
    hna.toFloat = function (value) {
        if (!value) {
            return 0;
        }
        if (typeof value == "string") {
            value = value.replace(/\,/g, "");
        }
        return parseFloat(value);
    };
    //全局的金额格式
    hna.toFixed = function (str, n) {
        if(n === null || n === undefined){
            n = 2;
        }
        return hna.toFloat(str).toFixed(n);
    };

    //深度的克隆对象
    hna.cloneObj = function (obj) {
        if(!obj){
            return obj;
        }
        var str, newObj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
            return;
        } else if (w.JSON) {
            str = JSON.stringify(obj); //序列化对象
            newObj = JSON.parse(str); //还原
        } else {
            for (var i in obj) {
                if(obj.hasOwnProperty(i)){
                    newObj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
                }
            }
        }
        return newObj;
    };

    //节流函数
    hna.throttle_duration = function (method, delay, duration) {
        var timer = null, begin = new Date();
        return function () {
            var context = this, args = arguments, current = new Date();
            clearTimeout(timer);
            if (current - begin >= duration) {
                method.apply(context, args);
                begin = current;
            } else {
                timer = setTimeout(function () {
                    method.apply(context, args);
                }, delay);
            }
        };
    };

    //获取url中某一个参数的值
    //hna.getRequestParamName = function(attr){
    //    //分组运算符是为了把结果存到exec函数返回的结果里
    //    var match = RegExp(`[?&]${attr}=([^&]*)`).exec(w.location.search);
    //    //["?name=jawil", "jawil", index: 0, input: "?name=jawil&age=23"]
    //    // url中+号表示空格,要替换掉
    //    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    //}

    //获取url参数并放到数组中
    hna.getRequest = function () {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = {};
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0, i1 = strs.length; i < i1; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    };

    //设置url中参数值
    //var url = w.location.href;//获取当前url
    //var searchUrl=setParam("beginDate","55555");
    //if(url.indexOf("?")>0){
    //    url= url.split("?")[0];
    //}
    //w.location.href=url+searchUrl;
    hna.setRequestParam = function (param, value) {
        var query = location.search.substring(1);
        var p = new RegExp("(^|)" + param + "=([^&]*)(|$)");
        if (p.test(query)) {
            //query = query.replace(p,"$1="+value);
            var firstParam = query.split(param)[0];
            var secondParam = query.split(param)[1];
            if (secondParam.indexOf("&") > -1) {
                var lastPraam = secondParam.split("&")[1];
                return '?' + firstParam + '&' + param + '=' + value + '&' + lastPraam;
            } else {
                if (firstParam) {
                    return '?' + firstParam + '&' + param + '=' + value;
                } else {
                    return '?' + param + '=' + value;
                }
            }
        } else {
            if (query == '') {
                return '?' + param + '=' + value;
            } else {
                return '?' + query + '&' + param + '=' + value;
            }
        }
    };


    //关闭当前窗口的方法
    hna.closeWebPage = function () {
        navigator.userAgent.indexOf("MSIE") > 0 ?
            navigator.userAgent.indexOf("MSIE 6.0") > 0 ?
            (window.opener = null, window.close()) :
            (window.open("", "_top"), window.top.close()) :
            navigator.userAgent.indexOf("Firefox") > 0 || navigator.userAgent.indexOf("Chrome") > 0 ?
            (window.close(), window.location.href = "about:blank ") :
            (window.opener = null, window.open("", "_self", ""), window.close());
    };

    var docBody = doc.body;
    var docElem = doc.documentElement;
    //获取body的高度，宽度，滚动条高度和宽度，以及滚动条滚动的位置
    hna.getBodySizeInfo = function (key) {
        var cWidth = 0, cHeight = 0, sWidth = 0, sHeight = 0, top = 0, left = 0;
        if (doc.compatMode == "BackCompat") {
            cWidth = docBody.clientWidth;
            cHeight = docBody.clientHeight;
            sWidth = docBody.scrollWidth;
            sHeight = docBody.scrollHeight;
            left = docBody.scrollLeft;
            top = docBody.scrollTop;
        }
        else { //doc.compatMode == "CSS1Compat"
            cWidth = docElem.clientWidth;
            cHeight = docElem.clientHeight;
            sWidth = docElem.scrollWidth;
            sHeight = docElem.scrollHeight;
            left = docElem.scrollLeft == 0 ? docBody.scrollLeft : docElem.scrollLeft;
            top = docElem.scrollTop == 0 ? docBody.scrollTop : docElem.scrollTop;
        }
        var returnObj = {cWidth: cWidth, cHeight: cHeight, sWidth: sWidth, sHeight: sHeight, top: top, left: left};
        if (key) {
            return returnObj[key] || "";
        }
        return returnObj;
    };

    //设置滚动条的高度和宽度位置
    hna.setBodySizeInfo = function (o) {
        if (!o) {
            o = {};
        }
        if (!!o.top) {
            docElem.scrollTop = docBody.scrollTop = o.top;
        }
        if (!!o.left) {
            docElem.scrollLeft = docBody.scrollLeft = o.left;
        }
    };

    //判断是否为PC端
    hna.isPC = function () {
        return !/Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(navigator.userAgent);
    };

    //滑动到页面顶部
    hna.goToTop = function (flag) {
        if(flag == "1"){
            hna.setBodySizeInfo({top: "0"});
        }else{
            var scrollTop = hna.getBodySizeInfo().top || 0;
            var st = scrollTop;
            var fun = setInterval(function () {
                if (st <= 0) {
                    clearInterval(fun);
                }
                st -= (scrollTop / 30);
                hna.setBodySizeInfo({top: st});
            }, 16);
        }
    };

    //字符串加密
    hna.compile = function (code) {
        if (code == null || code == "undefined" || code =="") {
            return code;
        }
        var c = String.fromCharCode(code.charCodeAt(0) + code.length);
        for (var i = 1; i < code.length; i++) {
            c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
        }
        return escape(c);
    };
    //字符串解密
    hna.uncompile = function (code) {
        if (code == null || code == "undefined" || code =="") {
            return code;
        }
        code = unescape(code);
        var c = String.fromCharCode(code.charCodeAt(0) - code.length);
        for (var i = 1; i < code.length; i++) {
            c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
        }
        return c;
    };
})(window,document,undefined);