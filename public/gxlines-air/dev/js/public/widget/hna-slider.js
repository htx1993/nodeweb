function getDomObject(domObject, htmlTag) {
    return domObject.getElementsByTagName(htmlTag);
}

function createEle(ele) {
    return document.createElement(ele);
}

function extend(defaultSetting, yourSetting) {
    var result = {};
    //如果在yourSetting中有值，则以此为准
    for (var p in defaultSetting) {
        if (yourSetting && yourSetting[p]) {
            result[p] = yourSetting[p];
        }
        else {
            result[p] = defaultSetting[p];
        }
    }
    //把最终的结果返回
    return result;
}

function Slider(contentId, setting) {

    var that = this;

    var defaultSetting = {
        "speed": 3000, //播放速度
        "startIndex": 0,//开始图片
        "isAuto": true
    };
    if (typeof contentId == "string")//传入是一个字符串
    {
        this.content = $(contentId); //获取外部的容器
    }
    else { //如果直接就是一个dom元素
        this.content = contentId;
    }

    this.setting = extend(defaultSetting, setting);	//获取参数

    this.currentIndex = this.setting.startIndex;		//默认是第几张

    this.timer = -1;	//自动播放的计时Z器编号
    this.lis = getDomObject(this.content, "li");//获取li
    this.director = [];	//保存创建的指示条上的span
    this.spanBtns = []; //保存左右两个按扭span

    this.createEle();//创建指示条和下面的文本区域 左右按钮
    this.bindEvent();//绑定事件

    this.showIndex(this.currentIndex);//显示第currentIndex张
    this.autoPlay();//自动播放
}

//创建元素
Slider.prototype.createEle = function () {
    var that = this;
//动态创建指示条
    //1.有一个容器<div><span></span></div>
    var directorDiv = createEle("div");
    directorDiv.className = "director";

    //2.创建span
    for (var i = 0; i < this.lis.length; i++) {
        var span = createEle("span");
        //创建完成，加到this.director中
        this.director.push(span);
        //3.绑定span事件响应
        span.index = i;
        span.onmouseenter = function () {
            // 鼠标进入当前的span时，就显示对应的那张
            that.showIndex(this.index);

        };
        directorDiv.appendChild(span);
    }
    //4.把整个的容器添加 #slider1 中
    this.content.appendChild(directorDiv);
//动态创建指示条

//创建一个p标签，用于显示文字
    /* this.pTxt = createEle("p");
     this.pTxt.className = "txt";
     this.content.appendChild(this.pTxt); //添加到dom树中*/
//创建一个p标签，用于显示文字

    //1创建span
    var span1 = createEle("span");
    span1.className = "btnleft";
    span1.innerHTML = "";
    //2.添加数组
    this.spanBtns.push(span1);
    this.content.appendChild(span1);//添加到dom树中

    var span2 = createEle("span");
    span2.className = "btnright";
    span2.innerHTML = "";
    //2.添加数组
    this.spanBtns.push(span2);
    this.content.appendChild(span2);//添加到dom树中


};

//给元素绑定事件
Slider.prototype.bindEvent = function () {

    var that = this;
    //绑定span的点击事件
    this.spanBtns[0].onclick = function (e) {//上一张

        that.currentIndex--;
        if (that.currentIndex == -1) {
            that.currentIndex = that.lis.length - 1;
        }

        that.showIndex(that.currentIndex);
    };

    this.spanBtns[1].onclick = function () {//下一张
        that.currentIndex++;
        if (that.currentIndex == that.lis.length) {
            that.currentIndex = 0;
        }
        that.showIndex(that.currentIndex);
    };

    this.content.onmouseenter = function () {
        //alert("1");
        clearInterval(that.timer);
    };
    this.content.onmouseleave = function () {
        that.autoPlay();
    };
};

Slider.prototype.autoPlay = function () {
    var that = this;
    //不断去做 spanBtns[1].onclick();
    this.timer = setInterval(function () {

        that.spanBtns[1].onclick();
    }, that.setting.speed);

};
//显示第yourIndex张
//同时把指示条中的第yourIndex个span高亮
//更新p.txt中的文字
Slider.prototype.showIndex = function (yourIndex) {
    this.currentIndex = yourIndex;

    for (var i = 0; i < this.lis.length; i++) {
        if (yourIndex == i) {
            //显示图片
            this.lis[i].className = "show";// 显示图片
            this.director[i].className = "current";// span高亮
            // this.pTxt.innerHTML = getDomObject(this.lis[i], "img")[0].alt;//
        }
        else {
            this.lis[i].className = "";//
            this.director[i].className = "";
        }
    }
};
