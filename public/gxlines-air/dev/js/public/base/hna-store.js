+(function(f){{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.store = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    (function (global){
        module.exports=function(){function e(){try{return o in n&&n[o]}catch(e){return!1}}var t,r={},n="undefined"!=typeof window?window:global,i=n.document,o="localStorage",a="script";if(r.disabled=!1,r.version="1.3.20",r.set=function(e,t){},r.get=function(e,t){},r.has=function(e){return void 0!==r.get(e)},r.remove=function(e){},r.clear=function(){},r.transact=function(e,t,n){null==n&&(n=t,t=null),null==t&&(t={});var i=r.get(e,t);n(i),r.set(e,i)},r.getAll=function(){},r.forEach=function(){},r.serialize=function(e){return JSON.stringify(e)},r.deserialize=function(e){if("string"==typeof e)try{return JSON.parse(e)}catch(t){return e||void 0}},e())t=n[o],r.set=function(e,n){return void 0===n?r.remove(e):(t.setItem(e,r.serialize(n)),n)},r.get=function(e,n){var i=r.deserialize(t.getItem(e));return void 0===i?n:i},r.remove=function(e){t.removeItem(e)},r.clear=function(){t.clear()},r.getAll=function(){var e={};return r.forEach(function(t,r){e[t]=r}),e},r.forEach=function(e){for(var n=0;n<t.length;n++){var i=t.key(n);e(i,r.get(i))}};else if(i&&i.documentElement.addBehavior){var c,u;try{u=new ActiveXObject("htmlfile"),u.open(),u.write("<"+a+">document.w=window</"+a+'><iframe src="/favicon.ico"></iframe>'),u.close(),c=u.w.frames[0].document,t=c.createElement("div")}catch(l){t=i.createElement("div"),c=i.body}var f=function(e){return function(){var n=Array.prototype.slice.call(arguments,0);n.unshift(t),c.appendChild(t),t.addBehavior("#default#userData"),t.load(o);var i=e.apply(r,n);return c.removeChild(t),i}},d=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g"),s=function(e){return e.replace(/^d/,"___$&").replace(d,"___")};r.set=f(function(e,t,n){return t=s(t),void 0===n?r.remove(t):(e.setAttribute(t,r.serialize(n)),e.save(o),n)}),r.get=f(function(e,t,n){t=s(t);var i=r.deserialize(e.getAttribute(t));return void 0===i?n:i}),r.remove=f(function(e,t){t=s(t),e.removeAttribute(t),e.save(o)}),r.clear=f(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(o);for(var r=t.length-1;r>=0;r--)e.removeAttribute(t[r].name);e.save(o)}),r.getAll=function(e){var t={};return r.forEach(function(e,r){t[e]=r}),t},r.forEach=f(function(e,t){for(var n,i=e.XMLDocument.documentElement.attributes,o=0;n=i[o];++o)t(n.name,r.deserialize(e.getAttribute(n.name)))})}try{var v="__storejs__";r.set(v,v),r.get(v)!=v&&(r.disabled=!0),r.remove(v)}catch(l){r.disabled=!0}return r.enabled=!r.disabled,r}();
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});

hna._store = (function(){
    var compileFlag = "NOCOMPILE";
    var compileLen = 3000;

    /**`
     * 保存在本地数据的加密  production
     */
    function compile(code) {
        if(hna._env != 'production') {
            return code;
        }

        if(code.length < compileLen){
            code = hna.compile(code) || code;
        }else{
            code += compileFlag;
        }

        return code;
    }

    /**
     * 保存在本地数据的解密1
     */
    function uncompile(code) {
        if(hna._env != 'production') {
            return code;
        }

        if(code.indexOf(compileFlag) <= -1){
            code = hna.uncompile(code) || code;
        }else{
            code = (code || "").replace(compileFlag,"");
        }

        return code;
    }

    /**
     * 存储localStorage
     * 设置数据的存储时间，默认一天;exp<=0的时候，则一直保留
     */
    function setStore(key, value, exp){
        if (!key) {
            return false;
        }
        key = compile(key);
        value = compile(JSON.stringify({ val: value||"", exp: exp || hna._exp, time: new Date().getTime(), ver: hna._version }));
        store.set(key, value);
    }

    /**
     * 存储localStorage
     * 设置数据的存储时间，默认一天;exp<=0的时候，则一直保留
     */
    function getStore(key){
        if (!key) {
            return null;
        }
        key = compile(key);

        var data = store.get(key);
        if(!data) {
            return null;
        }
        data = JSON.parse(uncompile(data));
        //超过有效期，或js版本号发生变化，则移除数据返回空值
        if(new Date().getTime() - data.time > data.exp || data.ver !== hna._version) {
            store.remove(key);
            return null;
        }
        return data.val;
    }

    function removeStore(key){
        if (!key) {
            return null;
        }
        key = compile(key);
        store.remove(key);
    }

    return {
        setStore:setStore,
        getStore:getStore,
        removeStore:removeStore
    };
})();

//获取跨域json数据
function getCrossDomainJson(url, uid, callback){
    if (!store.enabled) {
        hnaer.msg('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.')
        return;
    }
    var data = hna._store.getStore(uid);
    if(data) {
        if(typeof callback == "function"){
            callback.call(null, data);
        }
        return;
    };

    $.getScript(url).done(function(){
        data = window[uid];
        hna._store.setStore(uid, data, 24 * 60 * 60 * 1000);
        window[uid] = undefined;
        if(typeof callback == "function"){
            callback.call(null, data);
        }
    });
}
