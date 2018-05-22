//'use strict';
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
const interfaceUrl = path.join(process.cwd(), 'data/'+config.company+'/interface');

var router = function (app) {
    app.use('/base', require(interfaceUrl + '/base'));
    app.use('/portal', require(interfaceUrl + '/portal'));
    app.use('/city', require(interfaceUrl + '/city'));
    app.use('/flight', require(interfaceUrl + '/flight'));
    app.use('/passenger', require(interfaceUrl + '/passenger'));
    app.use('/product', require(interfaceUrl + '/product'));
    app.use('/seat', require(interfaceUrl + '/seat'));
    app.use('/order', require(interfaceUrl + '/order'));

    app.use('/shoppingCart', require(interfaceUrl + '/shoppingCart'));

    app.use('/payment', require(interfaceUrl + '/payment'));

    app.use('/noticeInfo', require(interfaceUrl + '/noticeInfo'));

    app.use('/airU', require(interfaceUrl + '/user'));
    app.use(require(interfaceUrl + '/thirdLogin'));

    app.use('/imageServer', require(interfaceUrl + '/mmv'));
    //app.use('/checkIn',require(interfaceUrl + '/checkIn'));
};
module.exports = router;
