/**

 @Name：hnaui.hnaedit 富文本编辑器
 @Author：贤心
 @License：MIT

 */

hnaui.define(['hnaer', 'form'], function (exports) {
    "use strict";

    var $ = hnaui.jquery
        , hnaer = hnaui.hnaer
        , form = hnaui.form()
        , hint = hnaui.hint()
        , device = hnaui.device()

        , MOD_NAME = 'hnaedit', THIS = 'hnaui-this', SHOW = 'hnaui-show', ABLED = 'hnaui-disabled'

        , Edit = function () {
        var that = this;
        that.index = 0;

        //全局配置
        that.config = {
            //默认工具bar
            tool: [
                'strong', 'italic', 'underline', 'del'
                , '|'
                , 'left', 'center', 'right'
                , '|'
                , 'link', 'unlink', 'face', 'image'
            ]
            , hideTool: []
            , height: 280 //默认高
        };
    };

    //全局设置
    Edit.prototype.set = function (options) {
        var that = this;
        $.extend(true, that.config, options);
        return that;
    };

    //事件监听
    Edit.prototype.on = function (events, callback) {
        return hnaui.onevent(MOD_NAME, events, callback);
    };

    //建立编辑器
    Edit.prototype.build = function (id, settings) {
        settings = settings || {};

        var that = this
            , config = that.config
            , ELEM = 'hnaui-hnaedit', textArea = $('#' + id)
            , name = 'HNA_hnaedit_' + (++that.index)
            , haveBuild = textArea.next('.' + ELEM)

            , set = $.extend({}, config, settings)

            , tool = function () {
            var node = [], hideTools = {};
            hnaui.each(set.hideTool, function (_, item) {
                hideTools[item] = true;
            });
            hnaui.each(set.tool, function (_, item) {
                if (tools[item] && !hideTools[item]) {
                    node.push(tools[item]);
                }
            });
            return node.join('');
        }()


            , editor = $(['<div class="' + ELEM + '">'
            , '<div class="hnaui-unselect hnaui-hnaedit-tool">' + tool + '</div>'
            , '<div class="hnaui-hnaedit-iframe">'
            , '<iframe id="' + name + '" name="' + name + '" textarea="' + id + '" frameborder="0"></iframe>'
            , '</div>'
            , '</div>'].join(''));

        //编辑器不兼容ie8以下
        if (device.ie && device.ie < 8) {
            return textArea.removeClass('hnaui-hide').addClass(SHOW);
        }

        haveBuild[0] && (haveBuild.remove());

        setIframe.call(that, editor, textArea[0], set);
        textArea.addClass('hnaui-hide').after(editor);

        return that.index;
    };

    //获得编辑器中内容
    Edit.prototype.getContent = function (index) {
        var iframeWin = getWin(index);
        if (!iframeWin[0]) return;
        return toLower(iframeWin[0].document.body.innerHTML);
    };

    //获得编辑器中纯文本内容
    Edit.prototype.getText = function (index) {
        var iframeWin = getWin(index);
        if (!iframeWin[0]) return;
        return $(iframeWin[0].document.body).text();
    };
    /**
     * 设置编辑器内容
     * @param {[type]} index   编辑器索引
     * @param {[type]} content 要设置的内容
     * @param {[type]} flag    是否追加模式
     */
    Edit.prototype.setContent = function (index, content, flag) {
        var iframeWin = getWin(index);
        if (!iframeWin[0]) return;
        if (flag) {
            $(iframeWin[0].document.body).append(content)
        } else {
            $(iframeWin[0].document.body).html(content)
        }
        ;
        hnaedit.sync(index)
    };
    //将编辑器内容同步到textarea（一般用于异步提交时）
    Edit.prototype.sync = function (index) {
        var iframeWin = getWin(index);
        if (!iframeWin[0]) return;
        var textarea = $('#' + iframeWin[1].attr('textarea'));
        textarea.val(toLower(iframeWin[0].document.body.innerHTML));
    };

    //获取编辑器选中内容
    Edit.prototype.getSelection = function (index) {
        var iframeWin = getWin(index);
        if (!iframeWin[0]) return;
        var range = Range(iframeWin[0].document);
        return document.selection ? range.text : range.toString();
    };

    //iframe初始化
    var setIframe = function (editor, textArea, set) {
        var that = this, iframe = editor.find('iframe');

        iframe.css({
            height: set.height
        }).on('load', function () {
            var conts = iframe.contents()
                , iframeWin = iframe.prop('contentWindow')
                , head = conts.find('head')
                , style = $(['<style>'
                , '*{margin: 0; padding: 0;}'
                , 'body{padding: 10px; line-height: 20px; overflow-x: hidden; word-wrap: break-word; font: 14px Helvetica Neue,Helvetica,PingFang SC,Microsoft YaHei,Tahoma,Arial,sans-serif; -webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; box-sizing: border-box !important;}'
                , 'a{color:#01AAED; text-decoration:none;}a:hover{color:#c00}'
                , 'p{margin-bottom: 10px;}'
                , 'img{display: inline-block; border: none; vertical-align: middle;}'
                , 'pre{margin: 10px 0; padding: 10px; line-height: 20px; border: 1px solid #ddd; border-left-width: 6px; background-color: #F2F2F2; color: #333; font-family: Courier New; font-size: 12px;}'
                , '</style>'].join(''))
                , body = conts.find('body');

            head.append(style);
            body.attr('contenteditable', 'true').css({
                'min-height': set.height
            }).html(textArea.value || '');

            hotkey.apply(that, [iframeWin, iframe, textArea, set]); //快捷键处理
            toolActive.call(that, iframeWin, editor, set); //触发工具

        });
    }

    //获得iframe窗口对象
        , getWin = function (index) {
        var iframe = $('#HNA_hnaedit_' + index)
            , iframeWin = iframe.prop('contentWindow');
        return [iframeWin, iframe];
    }

    //IE8下将标签处理成小写
        , toLower = function (html) {
        if (device.ie == 8) {
            html = (html+"").replace(/<.+>/g, function (str) {
                return str.toLowerCase();
            });
        }
        return html;
    }

    //快捷键处理
        , hotkey = function (iframeWin, iframe, textArea, set) {
        var iframeDOM = iframeWin.document, body = $(iframeDOM.body);
        body.on('keydown', function (e) {
            var keycode = e.keyCode;
            //处理回车
            if (keycode === 13) {
                var range = Range(iframeDOM);
                var container = getContainer(range)
                    , parentNode = container.parentNode;

                if (parentNode.tagName.toLowerCase() === 'pre') {
                    if (e.shiftKey) return
                    hnaer.msg('请暂时用shift+enter');
                    return false;
                }
                iframeDOM.execCommand('formatBlock', false, '<p>');
            }
        });

        //给textarea同步内容
        $(textArea).parents('form').on('submit', function () {
            var html = body.html();
            //IE8下将标签处理成小写
            if (device.ie == 8) {
                html = (html+"").replace(/<.+>/g, function (str) {
                    return str.toLowerCase();
                });
            }
            textArea.value = html;
        });

        //处理粘贴
        body.on('paste', function (e) {
            iframeDOM.execCommand('formatBlock', false, '<p>');
            setTimeout(function () {
                filter.call(iframeWin, body);
                textArea.value = body.html();
            }, 100);
        });
    }

    //标签过滤
        , filter = function (body) {
        var iframeWin = this
            , iframeDOM = iframeWin.document;

        //清除影响版面的css属性
        body.find('*[style]').each(function () {
            var textAlign = this.style.textAlign;
            this.removeAttribute('style');
            $(this).css({
                'text-align': textAlign || ''
            })
        });

        //修饰表格
        body.find('table').addClass('hnaui-table');

        //移除不安全的标签
        body.find('script,link').remove();
    }

    //Range对象兼容性处理
        , Range = function (iframeDOM) {
        return iframeDOM.selection
            ? iframeDOM.selection.createRange()
            : iframeDOM.getSelection().getRangeAt(0);
    }

    //当前Range对象的endContainer兼容性处理
        , getContainer = function (range) {
        return range.endContainer || range.parentElement().childNodes[0]
    }

    //在选区插入内联元素
        , insertInline = function (tagName, attr, range) {
        var iframeDOM = this.document
            , elem = document.createElement(tagName)
        for (var key in attr) {
            elem.setAttribute(key, attr[key]);
        }
        elem.removeAttribute('text');

        if (iframeDOM.selection) { //IE
            var text = range.text || attr.text;
            if (tagName === 'a' && !text) return;
            if (text) {
                elem.innerHTML = text;
            }
            range.pasteHTML($(elem).prop('outerHTML'));
            range.select();
        } else { //非IE
            var text = range.toString() || attr.text;
            if (tagName === 'a' && !text) return;
            if (text) {
                elem.innerHTML = text;
            }
            range.deleteContents();
            range.insertNode(elem);
        }
    }

    //工具选中
        , toolCheck = function (tools, othis) {
        var iframeDOM = this.document
            , CHECK = 'hnaedit-tool-active'
            , container = getContainer(Range(iframeDOM))
            , item = function (type) {
            return tools.find('.hnaedit-tool-' + type)
        }

        if (othis) {
            othis[othis.hasClass(CHECK) ? 'removeClass' : 'addClass'](CHECK);
        }

        tools.find('>i').removeClass(CHECK);
        item('unlink').addClass(ABLED);

        $(container).parents().each(function () {
            var tagName = this.tagName.toLowerCase()
                , textAlign = this.style.textAlign;

            //文字
            if (tagName === 'b' || tagName === 'strong') {
                item('b').addClass(CHECK)
            }
            if (tagName === 'i' || tagName === 'em') {
                item('i').addClass(CHECK)
            }
            if (tagName === 'u') {
                item('u').addClass(CHECK)
            }
            if (tagName === 'strike') {
                item('d').addClass(CHECK)
            }

            //对齐
            if (tagName === 'p') {
                if (textAlign === 'center') {
                    item('center').addClass(CHECK);
                } else if (textAlign === 'right') {
                    item('right').addClass(CHECK);
                } else {
                    item('left').addClass(CHECK);
                }
            }

            //超链接
            if (tagName === 'a') {
                item('link').addClass(CHECK);
                item('unlink').removeClass(ABLED);
            }
        });
    }

    //触发工具
        , toolActive = function (iframeWin, editor, set) {
        var iframeDOM = iframeWin.document
            , body = $(iframeDOM.body)
            , toolEvent = {
            //超链接
            link: function (range) {
                var container = getContainer(range)
                    , parentNode = $(container).parent();

                link.call(body, {
                    href: parentNode.attr('href')
                    , target: parentNode.attr('target')
                }, function (field) {
                    var parent = parentNode[0];
                    if (parent.tagName === 'A') {
                        parent.href = field.url;
                    } else {
                        insertInline.call(iframeWin, 'a', {
                            target: field.target
                            , href: field.url
                            , text: field.url
                        }, range);
                    }
                });
            }
            //清除超链接
            , unlink: function (range) {
                iframeDOM.execCommand('unlink');
            }
            //表情
            , face: function (range) {
                face.call(this, function (img) {
                    insertInline.call(iframeWin, 'img', {
                        src: img.src
                        , alt: img.alt
                    }, range);
                });
            }
            //图片
            , image: function (range) {
                var that = this;
                hnaui.use('upload', function (upload) {
                    var uploadImage = set.uploadImage || {};
                    upload({
                        url: uploadImage.url
                        , method: uploadImage.type
                        , elem: $(that).find('input')[0]
                        , unwrap: true
                        , success: function (res) {
                            if (res.code == 0) {
                                res.data = res.data || {};
                                insertInline.call(iframeWin, 'img', {
                                    src: res.data.src
                                    , alt: res.data.title
                                }, range);
                            } else {
                                hnaer.msg(res.msg || '上传失败');
                            }
                        }
                    });
                });
            }
            //插入代码
            , code: function (range) {
                code.call(body, function (pre) {
                    insertInline.call(iframeWin, 'pre', {
                        text: pre.code
                        , 'hna-lang': pre.lang
                    }, range);
                });
            }
            //帮助
            , help: function () {
                hnaer.open({
                    type: 2
                    , title: '帮助'
                    , area: ['600px', '380px']
                    , shadeClose: true
                    , shade: 0.1
                    , skin: 'hnaui-hnaer-msg'
                    , content: ['http://www.hnaui.com/about/hnaedit/help.html', 'no']
                });
            }
        }
            , tools = editor.find('.hnaui-hnaedit-tool')

            , click = function () {
            var othis = $(this)
                , events = othis.attr('hnaedit-event')
                , command = othis.attr('hna-command');

            if (othis.hasClass(ABLED)) return;

            body.focus();

            var range = Range(iframeDOM)
                , container = range.commonAncestorContainer

            if (command) {
                iframeDOM.execCommand(command);
                if (/justifyLeft|justifyCenter|justifyRight/.test(command)) {
                    iframeDOM.execCommand('formatBlock', false, '<p>');
                }
                setTimeout(function () {
                    body.focus();
                }, 10);
            } else {
                toolEvent[events] && toolEvent[events].call(this, range);
            }
            toolCheck.call(iframeWin, tools, othis);
        }

            , isClick = /image/

        tools.find('>i').on('mousedown', function () {
            var othis = $(this)
                , events = othis.attr('hnaedit-event');
            if (isClick.test(events)) return;
            click.call(this)
        }).on('click', function () {
            var othis = $(this)
                , events = othis.attr('hnaedit-event');
            if (!isClick.test(events)) return;
            click.call(this)
        });

        //触发内容区域
        body.on('click', function () {
            toolCheck.call(iframeWin, tools);
            hnaer.close(face.index);
        });
    }

    //超链接面板
        , link = function (options, callback) {
        var body = this, index = hnaer.open({
            type: 1
            , id: 'HNA_hnaedit_link'
            , area: '350px'
            , shade: 0.05
            , shadeClose: true
            , moveType: 1
            , title: '超链接'
            , skin: 'hnaui-hnaer-msg'
            , content: ['<ul class="hnaui-form" style="margin: 15px;">'
                , '<li class="hnaui-form-item">'
                , '<label class="hnaui-form-label" style="width: 60px;">URL</label>'
                , '<div class="hnaui-input-block" style="margin-left: 90px">'
                , '<input name="url" hna-verify="url" value="' + (options.href || '') + '" autofocus="true" autocomplete="off" class="hnaui-input">'
                , '</div>'
                , '</li>'
                , '<li class="hnaui-form-item">'
                , '<label class="hnaui-form-label" style="width: 60px;">打开方式</label>'
                , '<div class="hnaui-input-block" style="margin-left: 90px">'
                , '<input type="radio" name="target" value="_self" class="hnaui-input" title="当前窗口" '
                + ((options.target === '_self' || !options.target) ? 'checked' : '') + '>'
                , '<input type="radio" name="target" value="_blank" class="hnaui-input" title="新窗口" '
                + (options.target === '_blank' ? 'checked' : '') + '>'
                , '</div>'
                , '</li>'
                , '<li class="hnaui-form-item" style="text-align: center;">'
                , '<button type="button" hna-submit hna-filter="hnaedit-link-yes" class="hnaui-btn"> 确定 </button>'
                , '<button style="margin-left: 20px;" type="button" class="hnaui-btn hnaui-btn-primary"> 取消 </button>'
                , '</li>'
                , '</ul>'].join('')
            , success: function (hnaero, index) {
                var eventFilter = 'submit(hnaedit-link-yes)';
                form.render('radio');
                hnaero.find('.hnaui-btn-primary').on('click', function () {
                    hnaer.close(index);
                    body.focus();
                });
                form.on(eventFilter, function (data) {
                    hnaer.close(link.index);
                    callback && callback(data.field);
                });
            }
        });
        link.index = index;
    }

    //表情面板
        , face = function (callback) {
        //表情库
        var faces = function () {
            var alt = ["[微笑]", "[嘻嘻]", "[哈哈]", "[可爱]", "[可怜]", "[挖鼻]", "[吃惊]", "[害羞]", "[挤眼]", "[闭嘴]", "[鄙视]", "[爱你]", "[泪]", "[偷笑]", "[亲亲]", "[生病]", "[太开心]", "[白眼]", "[右哼哼]", "[左哼哼]", "[嘘]", "[衰]", "[委屈]", "[吐]", "[哈欠]", "[抱抱]", "[怒]", "[疑问]", "[馋嘴]", "[拜拜]", "[思考]", "[汗]", "[困]", "[睡]", "[钱]", "[失望]", "[酷]", "[色]", "[哼]", "[鼓掌]", "[晕]", "[悲伤]", "[抓狂]", "[黑线]", "[阴险]", "[怒骂]", "[互粉]", "[心]", "[伤心]", "[猪头]", "[熊猫]", "[兔子]", "[ok]", "[耶]", "[good]", "[NO]", "[赞]", "[来]", "[弱]", "[草泥马]", "[神马]", "[囧]", "[浮云]", "[给力]", "[围观]", "[威武]", "[奥特曼]", "[礼物]", "[钟]", "[话筒]", "[蜡烛]", "[蛋糕]"], arr = {};
            hnaui.each(alt, function (index, item) {
                arr[item] = hnaui.cache.dir + 'images/face/' + index + '.gif';
            });
            return arr;
        }();
        face.hide = face.hide || function (e) {
                if ($(e.target).attr('hnaedit-event') !== 'face') {
                    hnaer.close(face.index);
                }
            }
        return face.index = hnaer.tips(function () {
            var content = [];
            hnaui.each(faces, function (key, item) {
                content.push('<li title="' + key + '"><img src="' + item + '" alt="' + key + '"></li>');
            });
            return '<ul class="hnaui-clear">' + content.join('') + '</ul>';
        }(), this, {
            tips: 1
            , time: 0
            , skin: 'hnaui-box hnaui-util-face'
            , maxWidth: 500
            , success: function (hnaero, index) {
                hnaero.css({
                    marginTop: -4
                    , marginLeft: -10
                }).find('.hnaui-clear>li').on('click', function () {
                    callback && callback({
                        src: faces[this.title]
                        , alt: this.title
                    });
                    hnaer.close(index);
                });
                $(document).off('click', face.hide).on('click', face.hide);
            }
        });
    }

    //插入代码面板
        , code = function (callback) {
        var body = this, index = hnaer.open({
            type: 1
            , id: 'HNA_hnaedit_code'
            , area: '550px'
            , shade: 0.05
            , shadeClose: true
            , moveType: 1
            , title: '插入代码'
            , skin: 'hnaui-hnaer-msg'
            , content: ['<ul class="hnaui-form hnaui-form-pane" style="margin: 15px;">'
                , '<li class="hnaui-form-item">'
                , '<label class="hnaui-form-label">请选择语言</label>'
                , '<div class="hnaui-input-block">'
                , '<select name="lang">'
                , '<option value="JavaScript">JavaScript</option>'
                , '<option value="HTML">HTML</option>'
                , '<option value="CSS">CSS</option>'
                , '<option value="Java">Java</option>'
                , '<option value="PHP">PHP</option>'
                , '<option value="C#">C#</option>'
                , '<option value="Python">Python</option>'
                , '<option value="Ruby">Ruby</option>'
                , '<option value="Go">Go</option>'
                , '</select>'
                , '</div>'
                , '</li>'
                , '<li class="hnaui-form-item hnaui-form-text">'
                , '<label class="hnaui-form-label">代码</label>'
                , '<div class="hnaui-input-block">'
                , '<textarea name="code" hna-verify="required" autofocus="true" class="hnaui-textarea" style="height: 200px;"></textarea>'
                , '</div>'
                , '</li>'
                , '<li class="hnaui-form-item" style="text-align:center;">'
                , '<button type="button" hna-submit hna-filter="hnaedit-code-yes" class="hnaui-btn"> 确定 </button>'
                , '<button style="margin-left: 20px;" type="button" class="hnaui-btn hnaui-btn-primary"> 取消 </button>'
                , '</li>'
                , '</ul>'].join('')
            , success: function (hnaero, index) {
                var eventFilter = 'submit(hnaedit-code-yes)';
                form.render('select');
                hnaero.find('.hnaui-btn-primary').on('click', function () {
                    hnaer.close(index);
                    body.focus();
                });
                form.on(eventFilter, function (data) {
                    hnaer.close(code.index);
                    callback && callback(data.field);
                });
            }
        });
        code.index = index;
    }

    //全部工具
        , tools = {
        html: '<i class="hnaui-icon hnaedit-tool-html" title="HTML源代码" hna-command="html" hnaedit-event="html">&#xe64b;</i><span class="hnaedit-tool-mid"></span>'
        ,
        strong: '<i class="hnaui-icon hnaedit-tool-b" title="加粗" hna-command="Bold" hnaedit-event="b">&#xe62b;</i>'
        ,
        italic: '<i class="hnaui-icon hnaedit-tool-i" title="斜体" hna-command="italic" hnaedit-event="i">&#xe644;</i>'
        ,
        underline: '<i class="hnaui-icon hnaedit-tool-u" title="下划线" hna-command="underline" hnaedit-event="u">&#xe646;</i>'
        ,
        del: '<i class="hnaui-icon hnaedit-tool-d" title="删除线" hna-command="strikeThrough" hnaedit-event="d">&#xe64f;</i>'

        ,
        '|': '<span class="hnaedit-tool-mid"></span>'

        ,
        left: '<i class="hnaui-icon hnaedit-tool-left" title="左对齐" hna-command="justifyLeft" hnaedit-event="left">&#xe649;</i>'
        ,
        center: '<i class="hnaui-icon hnaedit-tool-center" title="居中对齐" hna-command="justifyCenter" hnaedit-event="center">&#xe647;</i>'
        ,
        right: '<i class="hnaui-icon hnaedit-tool-right" title="右对齐" hna-command="justifyRight" hnaedit-event="right">&#xe648;</i>'
        ,
        link: '<i class="hnaui-icon hnaedit-tool-link" title="插入链接" hnaedit-event="link">&#xe64c;</i>'
        ,
        unlink: '<i class="hnaui-icon hnaedit-tool-unlink hnaui-disabled" title="清除链接" hna-command="unlink" hnaedit-event="unlink">&#xe64d;</i>'
        ,
        face: '<i class="hnaui-icon hnaedit-tool-face" title="表情" hnaedit-event="face">&#xe650;</i>'
        ,
        image: '<i class="hnaui-icon hnaedit-tool-image" title="图片" hnaedit-event="image">&#xe64a;<input type="file" name="file"></i>'
        ,
        code: '<i class="hnaui-icon hnaedit-tool-code" title="插入代码" hnaedit-event="code">&#xe64e;</i>'

        ,
        help: '<i class="hnaui-icon hnaedit-tool-help" title="帮助" hnaedit-event="help">&#xe607;</i>'
    }

        , edit = new Edit();

    exports(MOD_NAME, edit);
});