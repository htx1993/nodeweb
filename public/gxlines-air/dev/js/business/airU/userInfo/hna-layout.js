function setUserMenuLeftEl(o) {
    if (!o) {
        o = {};
    }
    return ('<h1><i class="' + _classList[8] + '">' + ( o.icon || "") + '</i>' + (o.title || "") + '</h1>');
}

//创建编辑面板
function createEditPanelEl(o) {
    try {
        if (!o) {
            o = {};
        }
        var html = '<div class="hnaui-user-panel ' + _classList[5] + ' ' + _classList[7] + ' hnaui-edit-panel ' + (o.classStr || "") + ' hnaui-shadow">';
        html += '       <div class="' + _classList[6] + ' ' + _classList[7] + ' ' + layoutLeftCla + '">';
        html += o.createHtmlFun();
        html += '       </div>';
        html += '       <div class="' + _classList[6] + ' ' + layoutRightCla + '">';
        html += createAdverEl(o.type);
        html += '       </div>';
        html += '   </div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}
//创建tab标签面板
function createTabPanelEl(o) {
    try {
        if (!o) {
            o = {};
        }
        if (!o.dataArr) {
            o.dataArr = [];
        }
        var html = '<div class="hnaui-tab hnaui-tab-brief ' + _classList[7] + '" hna-filter="' + (o.type || "") + 'InfoTab">';
        html += '       <ul class="hnaui-tab-title">';
        o.dataArr.forEach(function (item, index) {
            var cla = index == 0 ? "hnaui-this" : "";
            html += '       <li class="' + cla + '">' + (item.title || "") + '</li>';
        });
        html += '       </ul>';
        html += '       <div class="hnaui-tab-content">';
        o.dataArr.forEach(function (item, index) {
            var cla = index == 0 ? " hnaui-show" : "";
            html += '       <div class="hnaui-tab-item' + cla + '">';
            html += item.createHtmlFun();
            html += '       </div>';
        });
        html += '        </div>';
        html += '   </div>';
        return html;
    } catch (e) {
        JsErrorTips(e);
        return "";
    }
}
