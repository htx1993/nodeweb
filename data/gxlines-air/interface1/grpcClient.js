var fs = require('fs');
var grpc = require('grpc');

var config = require('./config');

var GetGrpcUrl = function (req) {
    return req.session.grpcUrl
};

var getClient = function (req, serverPath, packageName, serverName) {

    var proto = grpc.load(serverPath);

    if (!config.needssl) {
        return new proto[packageName][serverName](GetGrpcUrl(req),
            grpc.credentials.createInsecure());
    }
    else {
        var grpcCrdential = grpc.credentials.createSsl(
            fs.readFileSync(protoPath.clientCert)
        );

        var option = {"grpc.ssl_target_name_override": config.tokenDomain}

        return new proto[packageName][serverName](GetGrpcUrl(req),
            grpcCrdential, option);
    }
};

var protoPath = {
    "AirTaxFeeCalculate": __dirname + '/proto/AirTaxFeeCalculate.proto',
    "airCommendLine": __dirname + '/proto/RecommendLine.proto',
    "airLfs": __dirname + '/proto/AirLowFareSearch.proto',
    "airDetail": __dirname + '/proto/AirFlightDetails.proto',
    "shopCart": __dirname + '/proto/ShoppingCart.proto',
    "reservationCreate": __dirname + '/proto/ReservationCreate.proto',
    "reservationSearch": __dirname + '/proto/ReservationSearch.proto',
    "reservationCancel": __dirname + '/proto/ReservationCancel.proto',
    "reservationAction": __dirname + '/proto/ReservationAction.proto',
    "reservationRetrieve": __dirname + '/proto/ReservationRetrieve.proto',
    "reservationCheck": __dirname + '/proto/ReservationCheck.proto',


    "seat": __dirname + '/proto/SeatMap.proto',
    "oauth": __dirname + '/proto/OAuth.proto',
    "user": __dirname + '/proto/User.proto',
    "traveler": __dirname + '/proto/Traveler.proto',
    "PayAndIssue": __dirname + '/proto/PayAndIssue.proto',
    "ticket": __dirname + '/proto/Ticket.proto',
    "Merchandizing": __dirname + '/proto/Merchandizing.proto',
    "refund": __dirname + '/proto/Refund.proto',

    "clientCert": __dirname + '/proto/certs/ca.cer',

    "message": __dirname + '/proto/demo/message.proto',
    "preBookValidate": __dirname + '/proto/demo/PreBookValidation.proto',
    "Information": __dirname + '/proto/Information.proto',

    "AirChange": __dirname + '/proto/AirChange.proto',

    "AirFareTrendSearch": __dirname + '/proto/AirFareTrendSearch.proto',
};

exports.flightDetailClient = function (req) {
    return getClient(req, protoPath.airDetail, "flights", "AirFlightDetails");
};


exports.searchflightInfoClient = function (req) {
    return getClient(req, protoPath.airLfs, "flights", "AirLowFareSearch");
};


exports.AirTaxFeeCalculate = function (req) {
    return getClient(req, protoPath.AirTaxFeeCalculate, "taxfee", "AirTaxFeeCalculate");
};

exports.reservationSearchClient = function (req) {
    return getClient(req, protoPath.reservationSearch, "reservation", "ReservationSearch");
};

exports.reservationActionClient = function (req) {
    return getClient(req, protoPath.reservationAction, "reservation", "ReservationAction");
};

exports.reservationCancelClient = function (req) {
    return getClient(req, protoPath.reservationCancel, "reservation", "ReservationCancel");
};

exports.reservationCreateClient = function (req) {
    return getClient(req, protoPath.reservationCreate, "reservation", "ReservationCreate");
};

exports.reservationRetrieve = function (req) {
    return getClient(req, protoPath.reservationRetrieve, "reservation", "ReservationRetrieve");
};

exports.reservationCheck = function (req) {
    return getClient(req, protoPath.reservationCheck, "reservation", "ReservationCheck");
};




exports.ticketClient = function (req) {
    return getClient(req, protoPath.ticket, "ticket", "Ticket");
};

exports.RefundClient = function (req) {
    return getClient(req, protoPath.refund, "refund", "Refund");
};

exports.userClient = function (req) {
    return getClient(req, protoPath.user, "um", "UserApi");
};

exports.travelerClient = function (req) {
    return getClient(req, protoPath.traveler, "traveler", "TravelerInfo");
};

exports.productClient = function (req) {
    return getClient(req, protoPath.Merchandizing, "merchandizing", "Merchandizing");
};


exports.shopcartClient = function (req) {
    return getClient(req, protoPath.shopCart, "shoppingcart", "ShoppingCartInfo");
};


exports.loginClient = function (req) {
    return getClient(req, protoPath.regist, "um", "UMUserApi");
};


exports.registClient = function (req) {
    return getClient(req, protoPath.regist, "um", "UMUserApi");
};


exports.oauthClient = function (req) {
    return getClient(req, protoPath.oauth, "oauth", "OAuth");
};


exports.seatClient = function (req) {
    return getClient(req, protoPath.seat, "seatmap", "SeatMap");
};


exports.preBookClient = function (req) {
    return getClient(req, protoPath.preBookValidate, "reservation", "PreBookValidation");
};


exports.InformationClient = function (req) {
    return getClient(req, protoPath.Information, "information", "Information");
};

exports.airChangeClient = function (req) {
    return getClient(req, protoPath.AirChange, "change", "AirChange");
};


exports.airCommendLineClient = function (req) {
    return getClient(req, protoPath.airCommendLine, "recommendline", "RecommendLine");
};

exports.AirFareTrendSearch = function (req) {
    return getClient(req, protoPath.AirFareTrendSearch, "faretrend", "FareTrend");
};


exports.PayAndIssueClient = function (req) {
    return getClient(req, protoPath.PayAndIssue, "ticket", "Pay");
};