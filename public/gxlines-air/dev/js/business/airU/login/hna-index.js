var _serviceUR = "";

$(function () {
    _serviceUR = hna.getRequest().service;
    _serviceUR = (_serviceUR || "").replace(/\*/g, "");
    _serviceUR = hna.compile(encodeURIComponent(_serviceUR || hna.compile(hna._server_host + "/")));

    renderInputElUm();

    renderFrom();
    initElement();

    initInputUm();
    initSelectUm();
    initSubmitUm();
    commonEventInit();
    hna.filterForm();
    hna.goToTop("1");

});