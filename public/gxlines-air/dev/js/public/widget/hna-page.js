//依赖hna-form.js
var HNAPag = window.HNAPag = (function ($) {
    var _pagingId = 1;

    //分页组件的构造函数
    function Paging(config) {
        //搜索的表单
        this.$searchForm = $("#" + (config.searchForm || ""));
        //展示的位置
        this.$searchResult = config.searchResult || "";

        //组件的唯一标识符id
        this.id = this.genId();

        this.pagBtn = "search-paging-btn-" + this.id;
        var btn = config.searchBtn || "";
        if (btn) {
            $("." + btn).addClass(this.pagBtn);
        }
        //表单里面的搜索按钮
        this.$searchBtn = this.$searchForm.find(config.searchBtn || "");

        //当前搜索按钮，上一页按钮，下一页按钮
        this.$searchPagBtn = $("." + this.pagBtn);
        //当前加载动画
        this.$loading = null;
        //当前页码输入框
        this.$pageCurrent = null;

        //表头列
        this.columns = config.columns || [];

        //ajax地址
        this.ajaxUrl = config.url;
        //数据源
        this.dataSource = config.dataSource;

        //默认每页显示多少
        this.pageSize = config.pageSize;
        //初始化的时候，当前页码
        this.pageCurrent = config.pageCurrent;
        //初始化的时候是否搜索
        this.searchInit = config.searchInit || false;
        this.searchCount = 1; //99为空
        if (this.searchInit) {
            this.searchCount = 99;
        }

        //每次搜索之前的回调函数
        this.beforeFun = config.beforeFun;
        //每次搜索成功之后的回调函数
        this.callback = config.callback;

        //分页信息
        this.pageInfo = {};

        this.createListEl();
        if (this.searchInit) {
            this.searchData();
        }
    }

    var PagingPrototype = Paging.prototype;

    //组件获取唯一id
    PagingPrototype.genId = function () {
        var id = _pagingId++;
        var prefix = (((1 + Math.random()) * 0x10000) | 0).toString(16);
        return prefix + id;
    };

    //分页组件的事件初始化
    PagingPrototype.initEvent = function () {
        var that = this;
        //点击搜索按钮，上一页，下一页按钮
        that.$searchPagBtn.off().on("click", function (e) {
            e.stopPropagation();
            var $this = $(e.target);
            if ($this.hasClass("hnaui-btn-disabled")) {
                return false;
            }
            //点击查询订单
            that.setPageCurrent($this.data('page') || 1);
            that.searchData();
        });

        //页码输入框的事件 失去焦点和输入
        that.$pageCurrent.off().on({
            "blur": function (e) {
                e.stopPropagation();
                that.setPageCurrent();
            },
            "keyup": function (e) {
                e.stopPropagation();
                if (e.which == 13) {
                    that.setPageCurrent();
                    that.searchData();
                }
            }
        });
    };

    //获取分页组件里面的一些关键的dom节点对象
    PagingPrototype.retrieveElemObjects = function () {
        //当前的搜索按钮，上一页按钮，下一页按钮
        this.$searchPagBtn = $("." + this.pagBtn);
        //当前加载动画
        this.$loading = $('.' + this.$searchResult).find(".page-loading");
        //当前页码输入框
        this.$pageCurrent = $("#pageCurrent_" + this.id);
    };

    //根据表单，查询分页数据
    PagingPrototype.searchData = function () {
        this.$loading.show();
        this.$searchBtn.addClass("hnaui-btn-disabled");
        var queryInfo = hna.getFormParameter(this.$searchForm);
        queryInfo.pageIndex = $("#pageCurrent_" + this.id).val() || 0;
        queryInfo.pageSize = this.pageSize;

        if (hna.isFunction(this.beforeFun)) {
            this.beforeFun();
        }

        if (this.ajaxUrl) {
            var that = this;
            hna.ajax({
                url: that.ajaxUrl,
                data: queryInfo,
                doneCallback: function (data) {
                    if (data && data.code == "200") {
                        that.searchCount++;
                        that.pageInfo = data.data;
                        that.createListEl();
                        if (hna.isFunction(that.callback)) {
                            that.callback(data);
                        }
                    } else {
                        hnaer.open({
                            title: "错误提示",
                            content: data.message
                        });
                    }
                },
                failCallback: function (data) {
                    hnaer.open({
                        title: "错误提示",
                        content: JSON.stringify(data)
                    });
                },
                alwaysCallback: function (data) {
                    that.$loading.hide();
                    that.$searchBtn.removeClass("hnaui-btn-disabled");
                }
            });
        } else {
            this.searchCount++;

            this.pageInfo.pageCurrent = queryInfo.pageIndex;
            this.pageInfo.pageSize = queryInfo.pageSize;
            this.pageInfo.total = this.dataSource.length;
            this.pageInfo.pageCount = Math.ceil(this.pageInfo.total / this.pageInfo.pageSize);

            this.pageInfo.data = this.dataSource.slice((this.pageInfo.pageCurrent - 1) * this.pageInfo.pageSize, this.pageInfo.pageCurrent * this.pageInfo.pageSize);

            this.createListEl();
            if (hna.isFunction(this.callback)) {
                this.callback(data);
            }
        }

    };

    //设置输入框的值
    PagingPrototype.setPageCurrent = function (value) {
        var thisPage = value || this.$pageCurrent.val();
        thisPage = parseInt(thisPage, 10);
        if (hna.isNaN(thisPage)) {
            thisPage = 0;
        }

        var thisMin = this.$pageCurrent.attr("min");
        var thisMax = this.$pageCurrent.attr("max");
        thisPage = thisPage < thisMin ? thisMin : thisPage;
        thisPage = thisPage > thisMax ? thisMax : thisPage;

        this.$pageCurrent.val(thisPage);
        this.pageCurrent = thisPage;
    };

    //创建分页组件的加载动画Loading
    PagingPrototype.createLoading = function () {
        var html = '<div class="page-loading" style="display:none">';
        html += '       <div class="search-loading-content">';
        html += '           <i class="hnaui-icon hnaui-anim hnaui-anim-rotate hnaui-anim-loop loading-icon"></i>数据加载中，请稍后...';
        html += '       </div>';
        html += '   </div>';
        return html;
    };

    //创建分页组件的列表
    PagingPrototype.createListEl = function () {
        var html = this.createLoading();
        html += this.createListTableEl();
        html += this.createPagingEl();
        //.html(html).show();
        $('.' + this.$searchResult).html(html).show();
        this.retrieveElemObjects();
        this.initEvent();
    };

    //创建分页组件的列表里面的table
    PagingPrototype.createListTableEl = function () {
        try {
            var html = '<table class="hnaui-table page-table hnaui-table-mobile">';
            html += this.createTableTheadEl();
            html += this.createTableTbodyEl();
            html += '</table>';
            return html;
        } catch (e) {
            JsErrorTips(e);
            return "";
        }
    };

    //创建表头
    PagingPrototype.createTableTheadEl = function () {
        try {
            var html = '<thead><tr>';
            this.columns.forEach(function (item) {
                html += '<th>' + (item.fieldTitle || "") + '</th>';
            });
            html += '</tr></thead>';
            return html;
        } catch (e) {
            JsErrorTips(e);
            return "";
        }
    };

    //创建表身
    PagingPrototype.createTableTbodyEl = function () {
        var that = this;
        var html = '';
        try {
            var list = this.pageInfo.data;
            if (!list || list.length == 0) {
                html = '<tbody>';
                html += '<tr>';
                html += that.createTdEl();
                html += '</tr>';
                html += '</tbody>';
            } else {
                var arr = [];
                for (var i = 0, j = list.length; i < j; i++) {
                    var newArr = [];
                    this.columns.forEach(function (item) {
                        newArr.push({
                            "title": item.fieldTitle,
                            "value": (list[i][item.fieldName] !== null && list[i][item.fieldName] !== undefined) ? list[i][item.fieldName] : "",
                            "renderFun": item.renderFun,
                            "row": list[i],
                            "seq": item.dom == "seq" ? true : false
                        });
                    });
                    arr.push({
                        "colums": newArr,
                        "data": list[i]
                    });
                }

                html = '<tbody>';
                arr.forEach(function (item, index) {
                    html += '<tr>';
                    item.colums.forEach(function (subItem, subIndex) {
                        html += that.createTdEl({
                            value: subItem.seq ? ((index + 1) + (that.pageInfo.pageSize * (that.pageInfo.pageCurrent - 1))) : subItem.value,
                            title: subItem.title,
                            renderFun: subItem.renderFun,
                            item: subIndex == 0 ? item.data : null
                        }, subItem.row);
                    });
                    html += '</tr>';
                });
                html += '</tbody>';
            }


        } catch (e) {
            JsErrorTips(e);
        }
        return html;
    };

    //创建td
    PagingPrototype.createTdEl = function (o, row) {
        try {
            if (!o) {
                var str = "";
                if (this.searchCount == 1) {
                    str = '请选择查询条件查询，分页跳转请使用回车键（Enter）！';
                } else if (this.searchCount > 1) {
                    str = '您查询的数据有误或不存在，请重新查询！';
                }
                return '<td colspan="' + (this.columns.length) + '"><p class="hna-msgtext">' + (this.searchCount == 99 ? ' ' : '<i class="hnaui-icon hna-redicon">&#xe60b;</i>' + str + '') + '</p></td>';

            } else {
                var text = '';
                if (o.renderFun) {
                    text = o.renderFun(o.value, row);
                } else {
                    text = o.value;
                }
                var hiddenInput = "";
                if (o.item) {
                    var value = (JSON.stringify(o.item) + "").replace(/\"/g, '|||');
                    hiddenInput = '<input type="hidden" name="hiddenValue" value="' + value + '">';
                }
                return '<td><div class="td-text">' + (text) + '</div><div class="td-title">' + (o.title || "") + '</div>' + hiddenInput + '</td>';
            }
        } catch (e) {
            JsErrorTips(e);
            return "";
        }
    };

    //创建分页组件的列表里面的分页提示信息
    PagingPrototype.createPagingEl = function () {
        var data = this.pageInfo;
        if (!data.pageSize) {
            data = {
                pageSize: this.pageSize,
                total: 0,
                pageCount: 0,
                pageCurrent: this.pageCurrent || 0
            };
        } else {
            data.pageCount = parseInt((data.pageCount || 0) + "", 10);
            data.pageCurrent = (data && data.data.length > 0) ? parseInt((data.pageCurrent || 0) + "", 10) : 0;
        }

        var prevD = data.pageCurrent > 1 ? '' : 'hnaui-btn-disabled';
        var nextD = data.pageCurrent == data.pageCount ? 'hnaui-btn-disabled' : '';

        try {
            var html = '<div class="hnaui-hnapage hnaui-laypage hnaui-laypage-default hnaui-push-right order-list-page">';
            html += '<p class="page-text">共' + (data.total || 0) + '条，每页' + (data.pageSize) + '条，共' + (data.pageCount || 0) + '页</p>';
            var prev = '<a href="javascript:;" class="hnaui-laypage-prev page-btn ' + this.pagBtn + ' ' + prevD + '" data-page="' + (data.pageCurrent - 1) + '"><i class="hnaui-icon">&#xe603;</i>上一页</a>';
            var next = '<a href="javascript:;" class="hnaui-laypage-next page-btn ' + this.pagBtn + ' ' + nextD + '"  data-page="' + (+data.pageCurrent + 1) + '">下一页<i class="hnaui-icon">&#xe602;</i></a>';
            html += '<p>' + prev + '<span class="hnaui-laypage-total">到第 <input type="number" id="pageCurrent_' + this.id + '"  min="1" max="' + (data.pageCount || 0) + '" autocomplete="off" value="' + (data.pageCurrent || 0) + '" ' + (data.pageCount > 0 ? "" : "readonly") + '> 页 </span>' + next + '</p>';
            html += '</div>';
            return html;
        } catch (e) {
            JsErrorTips(e);
            return "";
        }
    };

    //刷新当前分页组件
    PagingPrototype.refresh = function () {
        this.$pageCurrent.val("1");
        this.setPageCurrent();
        this.searchData();
    };

    function initPaging(config) {
        return new Paging(config);
    }

    return {
        initPaging: initPaging
    };
})(jQuery);