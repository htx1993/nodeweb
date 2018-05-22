//复选框的全选与反选
function initCheckbox() {
    //全选
    globalFrom.on('checkbox(allChoose)', function (data) {
        var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]');
        child.each(function (index, item) {
            item.checked = data.elem.checked;
        });
        renderFrom();
    });
    globalFrom.on('checkbox(oneChoose)', function (data) {
        var childCount = $(data.elem).parents('table').find('tbody input[type="checkbox"]').length;
        var checkCount = $(data.elem).parents('table').find('tbody input[type="checkbox"]:checked').length;

        var allCheckbox = $(data.elem).parents('table').find('thead input[type="checkbox"]');
        if (checkCount == childCount) {
            allCheckbox.prop("checked", true);
        } else {
            allCheckbox.prop("checked", false);
        }
        renderFrom();
    });
}