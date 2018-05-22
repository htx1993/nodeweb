var HNAMount = window.HNAMount = ( function($){
    var _mountId = 1;
    //加减数量控件构造函数
    function HandleMount(config){
        //组件的唯一标识符id;
        this.id = this.genId();

        //展示的位置
        this.$mountLocal = config.mountLocal || "";

        //加数量按钮 的 唯一的类
        this.addMount = 'add-btn' + this.id;
        //减数量按钮 的 唯一的类
        this.reduceMount = 'reduce-btn' + this.id;
        //数量显示文本框 的 唯一的类
        this.mountInput = 'mount-input' + this.id;

        
        //数量显示文本框
        this.$mountInput = $("." + this.mountInput);

        //文本框显示的最大值
        this.maxVal = config.max || '1';

        this.createMountEl();
    }

    var MountPrototype = HandleMount.prototype;

    //组件获取唯一id
    MountPrototype.genId = function () {
        var id = _mountId++;
        var prefix = (((1 + Math.random()) * 0x10000) | 0).toString(16);
        return prefix + id;
    };

    //事件初始化
    MountPrototype.initEvent = function () {
        var that = this;
        //点击事件委托
        $(document).on('click', '.click-btn' , function(e){
            e = e || window.event;
            e.stopPropagation();
            var $this = $(e.target);
            var count = $this.siblings("input").val() || 0;
            if($this.hasClass(that.addMount)){
                //获取文本框的值并取整
                count = parseInt(count);
                count = count >= that.maxVal ? that.maxVal : ++count;
                $this.siblings("input").val(count);
                $this.parents(".coupon-mount").addClass("product-checked");
                chooseProduct($this);
            }else if($this.hasClass(that.reduceMount)) {
                count = parseInt(count);
                count = count <= 0 ? 0 : --count;
                $this.siblings("input").val(count);
                $this.parents(".coupon-mount").removeClass("product-checked");
                chooseProduct($this);
            }
        });

        //文本框事件监听
        that.$mountInput.on('keyup' , function(e){
            e = e || window.event;
            e.stopPropagation();

            var $this = $(this);
            var str = $this.val();
            if(str){
                str = (str + "").replace(/[^0-9]/ig, "") || 0;//清除非数字;

                str = str >= that.maxVal ? that.maxVal : str;
                str = str <= 0 ? 0 : str;
                str = parseInt(str);
            }
            if(str == 1){
                $this.parents(".coupon-mount").addClass("product-checked");
            }else{
                $this.parents(".coupon-mount").removeClass("product-checked");
            }
            chooseProduct($this);
            $this.val(str);
        });
        //文本框失焦
        that.$mountInput.on('blur' , function(e){
            e = e || window.event;
            e.stopPropagation();

            var $this = $(this);
            var str = $this.val();
            str = str ? str : 1;
            $this.val(str);
        });

    };

    //获取需要操作的dom节点
    MountPrototype.retrieveElemObjects = function () {
        
        //数量显示文本框
        this.$mountInput = $("." + this.mountInput);
    };

    //创建控件dom节点
    MountPrototype.createMountEl = function () {
        var html = [
            '<div class="hnaui-input-block  hnaui-num-input">',
                '<input type="text" value="1" class="hnaui-input ' + this.mountInput + '">',
                '<span class="hnaui-icon hnaui-num-up click-btn ' + this.addMount +'">&#xe619;</span>',
                '<span class="hnaui-icon hnaui-num-down click-btn ' + this.reduceMount + '">&#xe61a;</span>',
            '</div>'
        ].join("");
        $('.' + this.$mountLocal).html(html).show();
        this.retrieveElemObjects();//获取需要操作的dom节点
        this.initEvent();//事件初始化
    };

    function initMount(config) {
        return new HandleMount(config);
    }
    return {
        initMount : initMount
    };
} )(jQuery)