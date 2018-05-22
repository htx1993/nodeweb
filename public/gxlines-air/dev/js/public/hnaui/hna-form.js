/**

 @Name：hnaui.form 表单组件
 @Author：贤心
 @License：MIT

 */

hnaui.define('hnaer', function (exports) {
    "use strict";

    var $ = hnaui.jquery
        , hnaer = hnaui.hnaer
        , hint = hnaui.hint()
        , device = hnaui.device()

        , MOD_NAME = 'form'
        , ELEM = '.hnaui-form'
        , THIS = 'hnaui-this'
        , SHOW = 'hnaui-show'
        , HIDE = 'hnaui-hide'
        , DISABLED = 'hnaui-disabled'
        , PHCLA = "hnaui-placeholder"
        , FOCLA = "hnaui-input-focus"
        , ACCLA = "hnaui-input-active"

        , Form = function () {
        this.config = {
            verify: {
                required: [
                    /[\S]+/
                    , '必填项不能为空'
                ]
                , phone: [
                    /^1\d{10}$/
                    , '请输入正确的手机号'
                ]
                , email: [
                    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
                    , '邮箱格式不正确'
                ]
                , url: [
                    /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/
                    , '链接格式不正确'
                ]
                , number: [
                    /^\d+$/
                    , '只能填写数字'
                ]
                , date: [
                    /^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/
                    , '日期格式不正确'
                ]
                , identity: [
                    /(^\d{15}$)|(^\d{17}(x|X|\d)$)/
                    , '请输入正确的身份证号'
                ]
            }
        };
    };

    var prevTime = (new Date()).getTime();

    //全局设置
    Form.prototype.set = function (options) {
        var that = this;
        $.extend(true, that.config, options);
        return that;
    };

    //验证规则设定
    Form.prototype.verify = function (settings, flag) {
        var that = this;
        that.debugTips = false || flag;
        $.extend(true, that.config.verify, settings);
        return that;
    };

    //表单事件监听
    Form.prototype.on = function (events, callback) {
        return hnaui.onevent(MOD_NAME, events, callback);
    };

    function placeholderSupport() {
        return 'placeholder' in document.createElement('input');
    }

    //表单控件渲染
    Form.prototype.render = function (type) {
        var that = this, items = {
            //文本框
            input: function () {
                var inputs = $(ELEM).find('input[type=text]');
                var TITLE = "hnaui-input-title";
                var ICONCLA = "hnaui-input-icon";
                var REQCLA = "hnaui-input-required";

                var hasFocusFun = function () {
                    var othis = $(this);
                    othis.removeClass(REQCLA).parent().addClass(FOCLA);
                }
                var hasBlurFun = function () {
                    var othis = $(this);
                    var val = othis.val();
                    //var readonly = othis.attr("readonly") || "";
                    var placeholder = othis.attr("placeholder") || "";
                    var required = !!((othis.attr("hna-verify") || "").indexOf("required") > -1);
                    var parent = othis.parent();
                    parent.removeClass(FOCLA);

                    (val || placeholder) ? (parent.addClass(ACCLA)) : (parent.removeClass(ACCLA));
                    (required && !val) ? (othis.addClass(REQCLA)) : (othis.removeClass(REQCLA));
                }

                var events = function (reElem) {
                    reElem.off("focus", hasFocusFun);
                    reElem.on("focus", hasFocusFun);
                    reElem.off("blur", hasBlurFun);
                    reElem.on("blur", hasBlurFun);
                };
                inputs.each(function (index, input) {
                    var othis = $(this);
                    var hnaTitle = othis.attr("hna-title") || ""
                    if (hnaTitle) {
                        var val = othis.val();
                        var placeholder = othis.data("placeholder") || "";
                        var required = othis.attr("hna-required") || "";
                        var requiredStr = required == 'Y' ? '<span class="hnaui-required">*&nbsp;</span>' : '';
                        var disabled = this.disabled;
                        othis.siblings("." + TITLE + ",." + ICONCLA).remove(); //如果已经渲染，则Rerender
                        var parent = othis.parent().removeClass(PHCLA + " " + ACCLA);
                        //替代元素
                        var addElem = '<span class="' + TITLE + '">' + hnaTitle + requiredStr + '</span>';

                        var skin = othis.attr("hna-skin");
                        if (skin == "number") {
                            addElem += '<span class="hnaui-number-item hnaui-number-sub hnaui-icon">&#xe904;</span><span class="hnaui-number-item hnaui-number-add hnaui-icon">&#xe906;</span>';
                            parent.addClass("hnaui-input-number");
                        }
                        var iconText = othis.attr("hna-icon")
                        if (iconText) {
                            addElem += '<i class="hnaui-icon ' + ICONCLA + '">' + iconText + '</i>';
                        }

                        othis.after(addElem);
                        if (placeholder || val) {
                            parent.addClass(PHCLA + " " + ACCLA);
                            if (placeholder) othis.attr("placeholder", placeholder);
                        } else {
                            othis.removeAttr("placeholder");
                            parent.addClass(PHCLA);
                        }
                        events.call(this, othis);
                    }
                });
            },
            //下拉选择框
            select: function () {
                //阻止touchmove默认事件
                function ePrevent(e) {
                    e.preventDefault();
                }

                var TIPS = '请选择', CLASS = 'hnaui-form-select', TITLE = 'hnaui-select-title'
                    , NONE = 'hnaui-select-none', initValue = '', thatInput

                    , selects = $(ELEM).find('select'), hide = function (e, clear) {
                    if (!$(e.target).parent().hasClass(TITLE) || clear) {
                        $('.' + CLASS).removeClass(CLASS + 'ed').find("." + PHCLA).removeClass(FOCLA);
                        thatInput && initValue && thatInput.val(initValue);
                    }
                    thatInput = null;
                }

                    , events = function (reElem, disabled, isSearch) {
                    var select = $(this)
                        , title = reElem.find('.' + TITLE)
                        , input = title.find('input')
                        , dl = reElem.find('dl')
                        , dds = dl.children('dd')

                    if (disabled) return;
                    var startY = 0,//起始 坐标
                        moveEndY = 0;//滑动时坐标
                    //滑动事件处理函数
                    function handleMove(event) {
                        moveEndY = event.originalEvent.changedTouches[0].pageY;
                        var Y = moveEndY - startY;
                        var scrollTop = this.scrollTop,
                            scrollHeight = this.scrollHeight,
                            height = this.clientHeight;
                        if ((Y > 0 && scrollTop <= 0) || (Y < 0 && scrollHeight - height <= scrollTop)) {
                            // 向上滚 || 向下滚
                            event.preventDefault();
                        }
                        event.stopPropagation();
                    }

                    reElem.on("touchstart", "dl", function (event) {
                        startY = event.originalEvent.changedTouches[0].pageY;
                    })

                    reElem.on("touchmove", "dl", handleMove);
                    //展开下拉
                    var showDown = function () {
                        reElem.addClass(CLASS + 'ed').find("." + PHCLA).addClass(FOCLA);
                        dds.removeClass(HIDE);
                    }, hideDown = function () {
                        reElem.removeClass(CLASS + 'ed').find("." + PHCLA).removeClass(FOCLA);
                        input.blur();

                        notOption(input.val(), function (none) {
                            if (none) {
                                initValue = dl.find('.' + THIS).html();
                                input && input.val(initValue);
                            }
                        });
                    };

                    //点击标题区域
                    title.on('click', function (e) {
                        reElem.hasClass(CLASS + 'ed') ? (
                            hideDown()
                        ) : (
                            hide(e, true),
                                showDown()
                        );
                        dl.find('.' + NONE).remove();
                    });

                    //点击箭头获取焦点
                    title.find('.hnaui-edge').on('click', function () {
                        input.focus();
                    });

                    //键盘事件
                    input.on('keyup', function (e) {
                        var keyCode = e.keyCode;
                        //Tab键
                        if (keyCode === 9) {
                            showDown();
                        }
                    }).on('keydown', function (e) {
                        var keyCode = e.keyCode;
                        //Tab键
                        if (keyCode === 9) {
                            hideDown();
                        } else if (keyCode === 13) { //回车键
                            e.preventDefault();
                        }
                    });

                    //检测值是否不属于select项
                    var notOption = function (value, callback, origin) {
                        var num = 0;
                        value = (value || "").toLowerCase();
                        hnaui.each(dds, function () {
                            var othis = $(this)
                                , text = (othis.text() || "").toLowerCase()
                                , not = text.indexOf(value) === -1;
                            if (value === '' || (origin === 'blur') ? value !== text : not) num++;
                            origin === 'keyup' && othis[not ? 'addClass' : 'removeClass'](HIDE);
                        });
                        var none = num === dds.length;
                        return callback(none), none;
                    };

                    //搜索匹配
                    var search = function (e) {
                        var value = this.value, keyCode = e.keyCode;

                        if (keyCode === 9 || keyCode === 13
                            || keyCode === 37 || keyCode === 38
                            || keyCode === 39 || keyCode === 40
                        ) {
                            return false;
                        }

                        notOption(value, function (none) {
                            if (none) {
                                dl.find('.' + NONE)[0] || dl.append('<p class="' + NONE + '">无匹配项</p>');
                            } else {
                                dl.find('.' + NONE).remove();
                            }
                        }, 'keyup');

                        if (value === '') {
                            dl.find('.' + NONE).remove();
                        }
                    };
                    if (isSearch) {
                        input.on('keyup', search).on('blur', function (e) {
                            thatInput = input;
                            initValue = dl.find('.' + THIS).html();
                            setTimeout(function () {
                                notOption(input.val(), function (none) {
                                    if (none && !initValue) {
                                        input.val('');
                                    }
                                }, 'blur');
                            }, 200);
                        }).on("focus",function(e){
                            $(e.target).val("");
                        });
                    }

                    //选择1
                    dds.on('click', function () {
                        var othis = $(this), value = othis.attr('hna-value');
                        var filter = select.attr('hna-filter'); //获取过滤器

                        if (othis.hasClass(DISABLED)) return false;

                        input.next(".hnaui-select-price").remove();
                        var market = othis.data("market");
                        var text = othis.text();
                        if (market) {
                            var marketList = (market || "").split("|");
                            text = marketList[0];

                            input.after('<span class="hnaui-select-price">' + _formatMoney(marketList[1], marketList[2]) + '</span>');
                        }

                        select.val(value).removeClass('hnaui-form-danger'), input.attr("value", text),input.val(text);
                        othis.addClass(THIS).siblings().removeClass(THIS);

                        hnaui.event.call(this, MOD_NAME, 'select(' + filter + ')', {
                            elem: select[0]
                            , value: value
                            , othis: reElem
                        });

                        hideDown();

                        return false;
                    });

                    reElem.find('dl>dt').on('click', function (e) {
                        return false;
                    });
                    //阻止关闭下拉
                    reElem.find('.hnaui-mobile-select').on('click', function (e) {
                        return false;
                    })
                    //按钮关闭下拉
                    reElem.find('.confirm-btn').off('click', hide).on('click', hide);
                    //关闭下拉
                    $(document).off('click', hide).on('click', hide);
                }

                selects.each(function (index, select) {
                    var othis = $(this), hasRender = othis.next('.' + CLASS), disabled = this.disabled, hnatitle = othis.attr("hna-title") || "";
                    var value = select.value, selected = $(select.options[select.selectedIndex]); //获取当前选中项

                    if (typeof othis.attr('hna-ignore') === 'string') return othis.show();

                    var isSearch = typeof othis.attr('hna-search') === 'string';

                    var inputTitle = "", placeholder = "", divTitle = "";
                    if (hnatitle) {
                        placeholder = "";
                        divTitle = TITLE + ' ' + PHCLA + " " + ACCLA;
                        var required = othis.attr("hna-required") || "";
                        var requiredStr = required == 'Y' ? '<span class="hnaui-required">*&nbsp;</span>' : '';
                        inputTitle = '<span class="hnaui-input-title">' + hnatitle + requiredStr + '</span>';
                    } else {
                        placeholder = select.options[0].innerHTML ? select.options[0].innerHTML : TIPS;
                        divTitle = TITLE;
                        inputTitle = "";
                    }
                    placeholder = 'placeholder="' + (select.options[0].innerHTML ? select.options[0].innerHTML : TIPS) + '"';

                    //替代元素
                    var reElem = $(['<div class="hnaui-unselect ' + CLASS + (disabled ? ' hnaui-select-disabled' : '') + '">'
                        , '<div class="' + divTitle + '">' + inputTitle + '<input type="text" ' + placeholder + ' value="' + (value ? selected.html() : '') + '" ' + (isSearch ? '' : 'readonly') + ' class="hnaui-input hnaui-unselect' + (disabled ? (' ' + DISABLED) : '') + '">'
                        , '<i class="hnaui-edge"></i></div>'
                        , '<dl class="hnaui-anim hnaui-anim-upbit' + (othis.find('optgroup')[0] ? ' hnaui-select-group' : '') + '">' + function (options) {
                            var arr = [];
                            hnaui.each(options, function (index, item) {
                                if (index === 0 && !item.value) return;
                                if (item.tagName.toLowerCase() === 'optgroup') {
                                    arr.push('<dt>' + item.label + '</dt>');
                                } else {
                                    var $item = $(item);
                                    var market = $item.attr("hnaui-market");
                                    var productSrc = $item.data("src");
                                    var html = '<dd hna-value="' + item.value + '" class="' + (value === item.value ? THIS : '') + (item.disabled ? (' ' + DISABLED) : '') + (productSrc?"img-item":"") +'"';
                                    var ddText = item.innerHTML;
                                    var productTitle = $item.data("title");
                                    //var shortTitle = (productTitle || "").replace(/\（[^\（]+\）/g, "");
                                    if (market) {
                                        html += ' data-market = "' + (productTitle + "|" + $item.data("price") + "|" + $item.data("currency")) + '"';
                                    }
                                    if (productSrc) {
                                        if(market){
                                            productTitle += '<span class="img-price">'+_formatMoney($item.data("price"), $item.data("currency")) + "</span>";
                                        }
                                        ddText = '<img src="' + productSrc + '"><p class="img-name">' + (productTitle||"") + '</p><p class="img-description">' + ($item.data("description")||"") + '</p>';
                                    }
                                    html += '>' + ddText + '</dd>';
                                    arr.push(html);
                                }
                            });
                            return arr.join('');
                        }(othis.find('*')) + '</dl>'
                        , '</div>'].join(''));

                    hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
                    othis.after(reElem);
                    events.call(this, reElem, disabled, isSearch);
                });
            }
            //复选框/开关
            , checkbox: function () {
                var CLASS = {
                    checkbox: ['hnaui-form-checkbox', 'hnaui-form-checked', 'checkbox']
                    , _switch: ['hnaui-form-switch', 'hnaui-form-onswitch', 'switch']
                }
                    , checks = $(ELEM).find('input[type=checkbox]')

                    , events = function (reElem, RE_CLASS) {
                    var check = $(this);

                    //勾选
                    reElem.on('click', function () {
                        //处理IE8环境下，部分页面复选框点击无法被选中的bug, 这只是治标的方法；
                        var nowTime = (new Date()).getTime();
                        if (nowTime - prevTime < 80) {
                            return false;
                        }
                        prevTime = nowTime;


                        var filter = check.attr('hna-filter') //获取过滤器
                            , text = (check.attr('hna-text') || '').split('|');

                        if (check[0].disabled) return;

                        check[0].checked ? (
                            check[0].checked = false
                                , reElem.removeClass(RE_CLASS[1]).find('em').text(text[1])
                        ) : (
                            check[0].checked = true
                                , reElem.addClass(RE_CLASS[1]).find('em').text(text[0])
                        );

                        hnaui.event.call(check[0], MOD_NAME, RE_CLASS[2] + '(' + filter + ')', {
                            elem: check[0]
                            , value: check[0].value
                            , othis: reElem
                        });
                    });
                }

                checks.each(function (index, check) {
                    var othis = $(this), skin = othis.attr('hna-skin')
                        , text = (othis.attr('hna-text') || '').split('|'), disabled = this.disabled;
                    if (skin === 'switch') skin = '_' + skin;
                    var RE_CLASS = CLASS[skin] || CLASS.checkbox;

                    if (typeof othis.attr('hna-ignore') === 'string') return othis.show();

                    //替代元素
                    var hasRender = othis.next('.' + RE_CLASS[0]);
                    var reElem = $(['<div class="hnaui-unselect ' + RE_CLASS[0] + (
                        check.checked ? (' ' + RE_CLASS[1]) : '') + (disabled ? ' hnaui-checkbox-disbaled ' + DISABLED : '') + '" hna-skin="' + (skin || '') + '">'
                        , {
                            _switch: '<em>' + ((check.checked ? text[0] : text[1]) || '') + '</em><i></i>'
                        }[skin] || (((check.title + "").replace(/\s/g, '') ? ('<span>' + check.title + '</span>') : '') + '<i class="hnaui-icon">' + (skin ? '&#xe605;' : '&#xe618;') + '</i>')
                        , '</div>'].join(''));

                    hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
                    othis.after(reElem);
                    events.call(this, reElem, RE_CLASS);
                });
            }
            //单选框
            , radio: function () {
                var CLASS = 'hnaui-form-radio', ICON = ['&#xe643;', '&#xe63f;']
                    , radios = $(ELEM).find('input[type=radio]')

                    , events = function (reElem) {
                    var radio = $(this), ANIM = 'hnaui-anim-scaleSpring';

                    reElem.on('click', function () {
                        var name = radio[0].name, forms = radio.parents(ELEM);
                        var filter = radio.attr('hna-filter'); //获取过滤器
                        var sameRadio = forms.find('input[name=' + (name + "").replace(/(\.|#|\[|\])/g, '\\$1') + ']'); //找到相同name的兄弟

                        if (radio[0].disabled) return;

                        hnaui.each(sameRadio, function () {
                            var next = $(this).next('.' + CLASS);
                            this.checked = false;
                            next.removeClass(CLASS + 'ed');
                            next.find('.hnaui-icon').removeClass(ANIM).html(ICON[1]);
                        });

                        radio[0].checked = true;
                        reElem.addClass(CLASS + 'ed');
                        reElem.find('.hnaui-icon').addClass(ANIM).html(ICON[0]);

                        hnaui.event.call(radio[0], MOD_NAME, 'radio(' + filter + ')', {
                            elem: radio[0]
                            , value: radio[0].value
                            , othis: reElem
                        });
                    });
                };

                radios.each(function (index, radio) {
                    var othis = $(this), hasRender = othis.next('.' + CLASS), disabled = this.disabled;

                    if (typeof othis.attr('hna-ignore') === 'string') return othis.show();

                    //替代元素
                    var reElem = $(['<div class="hnaui-unselect ' + CLASS + (radio.checked ? (' ' + CLASS + 'ed') : '') + (disabled ? ' hnaui-radio-disbaled ' + DISABLED : '') + '">'
                        , '<i class="hnaui-anim hnaui-icon">' + ICON[radio.checked ? 0 : 1] + '</i>'
                        , '<span>' + (radio.title || '未命名') + '</span>'
                        , '</div>'].join(''));

                    hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
                    othis.after(reElem);
                    events.call(this, reElem);
                });
            }
        };
        type ? (
            items[type] ? items[type]() : hint.error('不支持的' + type + '表单渲染')
        ) : hnaui.each(items, function (index, item) {
            item();
        });
        return that;
    };

    //表单提交校验hnaui-form-danger
    var submit = function () {
        var button = $(this), verify = form.config.verify, debugTips = form.debugTips, stop = null
            , DANGER = 'hnaui-input-required', field = {}, elem = button.parents(ELEM)

            , verifyElem = elem.find('*[hna-verify]') //获取需要校验的元素
            , formElem = button.parents('form')[0] //获取当前所在的form元素，如果存在的话
            , fieldElem = elem.find('input,select,textarea') //获取所有表单域
            , filter = button.attr('hna-filter'); //获取过滤器


        var tipsArr = [];
        //开始校验
        hnaui.each(verifyElem, function (_, item) {
            var othis = $(this), ver = othis.attr('hna-verify').split('|');
            var tips = '', value = othis.val();
            othis.removeClass(DANGER);
            hnaui.each(ver, function (_, thisVer) {
                var isFn = typeof verify[thisVer] === 'function';
                if (verify[thisVer] && (isFn ? tips = verify[thisVer](value, item) : !verify[thisVer][0].test(value))) {
                    if (tips && tips != "null") {
                        if (!debugTips) {
                            if (hna.locationTag && typeof (hna.locationTag) == "function") {
                                hna.locationTag(othis);
                            }
                            hnaer.closeAll();
                            hnaer.open({
                                title: _i18n("prompt"),
                                content: tips || verify[thisVer][1],
                                area: "500px",
                                icon: 0,
                                btn: [_i18n("confirm")]
                            });
                            if ((othis.hasClass("firstName") || othis.hasClass("lastName")) && othis.parents(".passenger-info-form").length > 0) {
                                var $lastname = othis.parents(".passenger-info-form").find(".lastName");
                                var $firstname = othis.parents(".passenger-info-form").find(".firstName");
                                showInputErrorTips($lastname, tips);
                                showInputErrorTips($firstname, tips);
                            }
                            
                            othis.addClass(DANGER);
                            return stop = true;
                        } else {
                            tipsArr.push({"elem": othis, "errorTips": tips || verify[thisVer][1]});
                        }
                    }
                }
            });
            if (stop) return stop;
        });

        if (!debugTips && stop) return false;

        var bll = false;
        $(formElem).find("select[hna-required='Y']").each(function(){
            if(!bll){
                var $this = $(this);
                var $thisOption = $this.find("option:checked");
                if(($thisOption.length <= 0 || !$thisOption.val()) && $this.attr("hna-required") == "Y"){
                    var errorTips = ($this.attr("hna-title") || $this.attr("hna-name")) + "不能为空";
                    if(!debugTips){
                        if (hna.locationTag && typeof (hna.locationTag) == "function") {
                            hna.locationTag($this);
                        }
                        hnaer.closeAll();
                        hnaer.open({
                            title: _i18n("prompt"),
                            content: errorTips,
                            area: "500px",
                            icon: 0,
                            btn: [_i18n("confirm")]
                        });
                        bll = true;
                        stop = true;
                    }else{
                        tipsArr.push({"elem": $this, "errorTips": errorTips});
                    }
                }
            }
        });

        if (stop) return false;

        if (debugTips && tipsArr.length > 0) {
            return hnaui.event.call(this, MOD_NAME, 'submit(' + filter + ')', {
                "status": "fail", "errorTips": tipsArr
            });
        }

        hnaui.each(fieldElem, function (_, item) {
            if (!item.name) return;
            if (/^checkbox|radio$/.test(item.type) && !item.checked) return;
            field[item.name] = item.value;
        });

        //获取字段
        return hnaui.event.call(this, MOD_NAME, 'submit(' + filter + ')', {
            elem: this
            , form: formElem
            , field: field
        });
    };

    //自动完成渲染
    var form = new Form(), dom = $(document);
    form.render();

    //表单reset重置渲染
    dom.on('reset', ELEM, function () {
        setTimeout(function () {
            form.render();
        }, 50);
    });

    //表单提交事件
    dom.on('submit', ELEM, submit)
        .on('click', '*[hna-submit]', submit);

    exports(MOD_NAME, function (options) {
        return form.set(options);
    });
});

 
