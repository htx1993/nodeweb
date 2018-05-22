(function ($) {
    hna = window.hna || {};
    hna.isBlur = false;

    window.alert = null;

    //非法字符正则表达式
    //var illegalCharRegex = [/((\s+|^)(and|exec|count|chr|mid|master|or|truncate|char|declare|join|)(\s+|$))/ig,
    //    /0x\w+/ig, /(insert|select|delete|update|create|drop)/ig, /([\<\>\'\|\;\&\$\"\\\+\,]+)|(\/\*)|(\*\/)|(\(\))/g];
    var illegalCharRegex = [
        {
            pattern: "((\\s+|^)(and|exec|count|chr|mid|master|or|truncate|char|declare|join|)(\\s+|$))",
            modifiers: "ig"
        },
        {
            pattern: "^(0x\\w+)",
            modifiers: "ig"
        },
        {
            pattern: "(insert|select|delete|update|create|drop)",
            modifiers: "ig"
        },
        {
            pattern: "([\\<\\>\\'\\|\\;\\&\\$\"\\\+\\,]+)|(\\/\\*)|(\\*\\/)|(\\(\\))",
            modifiers: "g"
        }
    ];

    //var illegalUrlRegex = [/((\s+|^)(count|chr|mid|master|truncate|char|join|)(\s+|$))/ig,
    //    /0x\w+/ig, /(insert|select|delete|update|create|drop)/ig, /([\<\>\'\|\;\&\$\"\\\+\,]+)|(\/\*)|(\*\/)|(\(\))/g];
    var illegalUrlRegex = [
        {
            pattern: "((\\s+|^)(count|chr|mid|master|truncate|char|join|)(\\s+|$))",
            modifiers: "ig"
        },
        {
            pattern: "^(0x\\w+)",
            modifiers: "ig"
        },
        {
            pattern: "(insert|select|delete|update|create|drop)",
            modifiers: "ig"
        },
        {
            pattern: "([\\<\\>\\'\\|\\;\\&\\$\"\\\+\\,]+)|(\\/\\*)|(\\*\\/)|(\\(\\))",
            modifiers: "g"
        }
    ];

    /**
     * 读取表单数据
     * @param:container(element), 需要读取内容的元素(比如表单元素)
     * @return:object, 以元素name为key,值为value的object(自动处理radio和checkbox)
     */
    hna.getFormParameter = function (container) {
        var model = {};
        container = container instanceof $ ? container : $(container);
        container.find("input,select,textarea").each(function () {
            var control = $(this), key = this.name, type = this.type;
            var verify = control.attr("hna-verify");

            //如果key是空值，同时它们不是密码文本，则返回；
            if (!key && !(verify == "Ppassword" || verify == "Ppassword_re" || verify == "PpasswordLogin")) {
                return;
            }
            if (type == "radio" && !control.prop("checked")) {
                return;
            }
            var value = control.val(), current = model[key];
            //如果是密码，则加密
            if (verify == "Ppassword" || verify == "Ppassword_re" || verify == "PpasswordLogin") {
                key = key ?  key : "password";
                value = hna.compile(value);
            }
            if (type == "checkbox") {
                if (!control.prop("checked")) {
                    return;
                }
                //checkbox 值合并
                if (current) {
                    value = current + "," + value;
                }
            }
            if (!value && control.is("select")) {
                var option = control.find("option:selected");
                value = option.val() || option.text();
            }
            model[key] = value;
        });
        return model;
    };
    /**
     * 表单输入框校验
     * 对表单中所有输入框文本框添加blur侦听函数，检查是否包含禁止的字符
     * 若包含禁止字符，则给元素添加hna-filter-error样式
     * @param:container(element), 需要读取内容的元素(比如表单元素)
     */
    hna.filterForm = function (container) {
        if (!container) {
            container = document;
        }
        container = container instanceof $ ? container : $(container);
        container.on("blur", "input[type='hidden'], input[type='text'], textarea", function (e) {
            e.stopPropagation();
            var $this = $(this);
            if (hna.isBlur || ($this.attr("readonly") == "readonly" && !$this.attr("hna-uniqueurl")) || !$this.val() || $this.attr("filter") == "N") {
                return false;
            }
            //去掉文本内容首尾的空格
            $this.val($this.val().trim());
            var illegal = hna.inputFilter($this.val() || "");
            $this.toggleClass("hna-filter-error", !illegal);
            if (!illegal) {
                hna.isBlur = true;
                hnaer.open({
                    title: _i18n("prompt"),
                    content: _i18n("illegal"),
                    area: "500px",
                    icon: 0,
                    end: function () {
                        hna.isBlur = false;
                    }
                });
                return false;
            }
        });
    };
    /**
     * 表单校验
     * 检查是否包含禁止的字符
     * @param:container(element), 需要读取内容的元素(比如表单元素)
     */
    hna.verifyForm = function (container, callback) {
        container = container instanceof $ ? container : $(container);
        var illegal = true;
        container.find("input[type='text'], input[type='hidden'], textarea").each(function () {
            var $this = $(this);
            if (!$this.hasClass("hnaui-unselect")) {
                illegal = hna.inputFilter($this.val() || "");
                $(this).toggleClass("hna-filter-error", !illegal);
            }
            if (!illegal) {
                return false;
            }
        });
        if (!illegal) {
            hnaer.open({
                title: _i18n("prompt"),
                content: _i18n("illegal"),
                area: "500px",
                icon: 0
            });
        } else {
            if (typeof callback == "function") {
                callback();
            }
        }
    };
    /**
     * 表单提交
     * @param:form(element), 需要提交的表单元素
     * @param:handler(function), 表单提交之前的处理函数
     */
    hna.submitForm = function (form, handler) {
        form = form instanceof $ ? form : $(form);
        if (!hna.verify(form)) {
            return false;
        }
        if (handler && typeof handler == "function") {
            handler.call(form);
        }
        setTimeout(function () {
            form.submit();
        }, 100);
    };

    //文本框值过滤
    hna.inputFilter = function (str) {
        if (str) {
            return !illegalCharRegex.any(function (item) {
                return (new RegExp(item.pattern, item.modifiers)).test(str);
            });
        } else {
            return true;
        }
    };

    //url非法字符过滤
    hna.urlFilter = function (url) {
        if (url) {
            return !illegalUrlRegex.any(function (item) {
                return (new RegExp(item.pattern, item.modifiers)).test(url);
            });
        } else {
            return true;
        }
    };
})(jQuery);