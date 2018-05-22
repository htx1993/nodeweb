//选择玩往返程后的购物车
var shoppingcart = {
    "shoppingCartId": "5a080b6985b5916d0f0a140e",
    "bounds": [
        {
            "flightNumber": "GX6357",
            "inBoundDate": "2017-12-19 18:30:00",
            "origin": "CKG",
            "destination": "TSN",
            "departureDate": "2017-12-19 18:30:00",
            "arrivalDate": "2017-12-19 23:35:00",
            "flightUrl": "/shopping-carts/5a080b6985b5916d0f0a140e/items/1/itineraries/1/flight-segments/GX_6357_2017-12-19_CKG_XIY",
            "aircraftCode": "320",
            "aircraftName": "Airbus",
            "bookingClass": "C",
            "cabinClass": "C",
            "fareFamilyCode": "ESPECIAL",
            "fareFamilyName": "超划算"
        }, {
            "flightNumber": "GX6358",
            "inBoundDate": "2017-12-29 00:35:00",
            "origin": "TSN",
            "destination": "CKG",
            "departureDate": "2017-12-29 00:35:00",
            "arrivalDate": "2017-12-29 05:05:00",
            "flightUrl": "/shopping-carts/5a080b6985b5916d0f0a140e/items/1/itineraries/1/flight-segments/GX_6358_2017-12-29_XIY_CKG",
            "aircraftCode": "320",
            "aircraftName": "Airbus",
            "bookingClass": "C",
            "cabinClass": "C",
            "fareFamilyCode": "EBASIC",
            "fareFamilyName": "超优惠"
        }],
    "taxs": [
        {"taxFare": "291", "code": "SG", "name": "旅客服务费"}, {
            "taxFare": "90",
            "code": "OP",
            "name": "航空税"
        }, {"taxFare": "117", "code": "OO", "name": "旅客安保服务费"}, {
            "taxFare": "180",
            "code": "CN",
            "name": "民航发展基金"
        }, {"taxFare": "2700", "code": "YR", "name": "燃油附加费"}],
    "totalPrice": "4638",
    "currency": "CNY",
    "travelerInfo": [
        {
            "id": "0",
            "firstName": "huajiangjiangD",
            "lastName": "ceshi",
            "type": "ADT",
            "idNo": "E22222222",
            "idNoType": "2.DOC"
        }, {
            "id": "1",
            "firstName": "huajiangjiang",
            "lastName": "ceshi",
            "type": "ADT",
            "idNo": "E88888888",
            "idNoType": "2.DOC"
        }, {
            "id": "2",
            "firstName": "huajiangjiang",
            "lastName": "test",
            "type": "CNN",
            "idNo": "asdfafdadsf",
            "idNoType": "2.DOC"
        }],
    "airTaxFeeCalculateoffer": {
        "offerId": ["/shopping-carts/5a080b6985b5916d0f0a140e/items/1"],
        "travelerCompositionInfo": [{
            "uri": "/shopping-carts/5a080b6985b5916d0f0a140e/items/1/air/traveler-compositions/0",
            "id": "0",
            "typeRefId": "ADT"
        }, {
            "uri": "/shopping-carts/5a080b6985b5916d0f0a140e/items/1/air/traveler-compositions/1",
            "id": "1",
            "typeRefId": "ADT"
        }, {
            "uri": "/shopping-carts/5a080b6985b5916d0f0a140e/items/1/air/traveler-compositions/2",
            "id": "2",
            "typeRefId": "CNN"
        }]
    },
    "ancillaryPriceOffer": [
        {
            "ancillaryPriceOfferId": "",
            "travelerCompositionId": "",
            "travelerCompositionUri": "",
            "ancillaryName": "",
            "ancillaryType": "SEATFEE",
            "totalFare": "30",
            "totalFareCurrency": "CNY"
        }, {
            "ancillaryPriceOfferId": "",
            "travelerCompositionId": "",
            "travelerCompositionUri": "",
            "ancillaryName": "",
            "ancillaryType": "SEATFEE",
            "totalFare": "30",
            "totalFareCurrency": "CNY"
        }, {
            "ancillaryPriceOfferId": "",
            "travelerCompositionId": "",
            "travelerCompositionUri": "",
            "ancillaryName": "",
            "ancillaryType": "SEATFEE",
            "totalFare": "30",
            "totalFareCurrency": "CNY"
        }, {
            "ancillaryPriceOfferId": "",
            "travelerCompositionId": "",
            "travelerCompositionUri": "",
            "ancillaryName": "",
            "ancillaryType": "SEATFEE",
            "totalFare": "20",
            "totalFareCurrency": "CNY"
        }, {
            "ancillaryPriceOfferId": "",
            "travelerCompositionId": "",
            "travelerCompositionUri": "",
            "ancillaryName": "",
            "ancillaryType": "SEATFEE",
            "totalFare": "30",
            "totalFareCurrency": "CNY"
        }, {
            "ancillaryPriceOfferId": "",
            "travelerCompositionId": "",
            "travelerCompositionUri": "",
            "ancillaryName": "",
            "ancillaryType": "SEATFEE",
            "totalFare": "30",
            "totalFareCurrency": "CNY"
        }],
    "priceInfo": [{"travelerType": "ADT", "amount": 2, "fare": "360"}, {
        "travelerType": "CNN",
        "amount": 1,
        "fare": "360"
    }]
}

exports.shoppingCartInfo = shoppingcart