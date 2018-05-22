var flightSegmentCount = 0;
//创建页面
function createSearchResult() {
    try {
        var address = new AddressInfo();
        var html = "";
        if (_flightPassengerList.length > 0) {
            _flightPassengerList.forEach(function (item) {
                html += createMarketPanel(item);
            });
        }
        if (flightSegmentCount < 1 || _flightPassengerList.length < 1) {
            html += '<div class="hnaui-shadow hnaui-site-tips hnaui-border-box hnaui-clear hnaui-picture"><i class="hnaui-icon">&#xe60b;</i>' + _i18n("P12") + '</div>';
            
        }

        //行程单
        if(_hasAddress){
            html += createAddressEl();
        }

        html += createSubmitBtnEl();

        $(".search-result").append(html).show();
        $(".search-loading").hide();

        renderFrom();
        initElement();
        initSelect();
        initCheckbox();

        if ((flightSegmentCount < 1 || _flightPassengerList.length < 1) && !isMMB) {
            //该趟航班没有辅营,模拟点击
            triggerHelpAlert();
        }
        if(_hasAddress){
            addressEventInit();
        }
    } catch (e) {
        JsErrorTips(e);
    }
}
//根据辅营类型code，返回对应的配置参数
function getMarketConfigure(code) {
    var marketTitle = "";
    var imgName = "";
    var classStr = "";
    var marketFun = null;
    if (code == "GROUP_CHECKED_ITEMS") {
        marketTitle = "行李";
        imgName = "baggage";
        classStr = "hnaui-baggage";
        marketFun = createLuggagePanel;
    }
    if (code == "GROUP_MEAL") {
     marketTitle = "餐食";
     imgName = "meals";
     classStr = "hnaui-meals";
     marketFun = createMealsPanel;
     }
    if (code == "INSURANCE_GROUP") {
       marketTitle = "保险";
       imgName = "safe";
       classStr = "hnaui-safe";
       marketFun = createCheckboxPanel;
    }
    if (code == "GROUP_VIP_LOUNGE") {
       marketTitle = "贵宾厅";
       imgName = "viphall";
       classStr = "hnaui-viphall";
       marketFun = createCheckboxPanel;
    }
    if (code == "GROUP_ON_FLIGHT_ITEM") {
       marketTitle = "机上舒适设施";
       imgName = "facilities";
       classStr = "hnaui-facilities";
       marketFun = createCheckboxPanel;
    }
    return {
        code: code,
        title: marketTitle,
        imgName: imgName,
        classStr: classStr,
        marketFun: marketFun
    };
}
//创建辅营面板
function createMarketPanel(o) {
    if (!o) {
        o = {};
    }

    var configInfo = getMarketConfigure(o.code);
    if (!configInfo.title) {
        return "";
    }
    var html = '';
    try {
        var flightSegments = o.flightSegments || [];
        var len = flightSegments.length;

        var merchandizingItemLen = 0;
        if (len > 0) {
            html += '<div class="hnaui-panel market-panel hnaui-shadow hnaui-clear hnaui-auxiliary ' + configInfo.classStr + '">';
            html += '   <div class="hnaui-clear hnaui-content hnaui-panel-content">';
            html += '       <div class="hnaui-left hnaui-img">';
            html += '           <img src="' + hna._img_host + '/images/product/' + configInfo.imgName + '.png">';
            html += '           <div class="hnaui-panel-title"><span class="market-name">' + (configInfo.title || "") + '</span></div>';
            html += '           <span class="rule-font">产品说明';
            html += createProductExplain(o.code);
            html += '           </span>';
            html += '       </div>';
            html += '       <div class="hnaui-right hnaui-info">';
            flightSegments.forEach(function (item, index) {
                if (item.traveler && item.traveler.length > 0) {
                    html += '       <div class="flight-list">';
                    var tripeTitle = "";
                    var flightTitle = "";
                    if (o.code != "INSURANCE_GROUP") {
                        tripeTitle = hna._processData.getTripTitle(index, item.departureCode);
                        flightTitle = getCityNameByCode(item.departureCode || "", "city") + '<em></em>' + getCityNameByCode(item.arrivalCode || "", "city");
                        html += '           <h3 class="flight-name" data-dep="' + item.departureCode + '" data-arr="' + item.arrivalCode + '"><span class="hnaui-ow">' + tripeTitle + '</span>' + flightTitle + '</h3>';
                    } else {
                        var thisId = item.id;
                        var arr = (item.id || "").split(",");
                        arr.forEach(function (o, i) {
                            var subArr = (o || "").split("_");
                            tripeTitle = hna._processData.getTripTitle(i, subArr[0]);
                            flightTitle = getCityNameByCode(subArr[0] || "", "city") + '<em></em>' + getCityNameByCode(subArr[1] || "", "city");
                            html += '       <h3 class="flight-name" data-dep="' + subArr[0] + '" data-arr="' + subArr[1] + '"><span class="hnaui-ow">' + tripeTitle + '</span>' + flightTitle + '</h3>';
                        });
                    }

                    html += '               <ul class="hnaui-clear">';
                    (item.traveler || []).forEach(function (iitem) {
                        if (iitem.merchandizingItem && iitem.merchandizingItem.length > 0) {
                            html += '                   <li>';
                            html += '                       <p class="tit-name"><strong>' + (iitem.firstName ? getFullName(iitem.firstName,iitem.lastName) : iitem.name) + '(' + (_filterPassType(iitem.type)) + ')</strong></p>';

                            html += configInfo.marketFun(iitem.merchandizingItem, configInfo.code);

                            html += '                   </li>';

                            flightSegmentCount++;
                            merchandizingItemLen++;
                        }
                    });
                    html += '               </ul>';
                    /*if (len > 1 && index != len - 1) {
                     html += '               <div class="line"></div>';
                     }*/
                    html += '       </div>';
                }
            });
            html += '           </div>';
            html += '       </form>';
            html += '   </div>';
            html += '</div>';

            if (merchandizingItemLen <= 0) {
                html = '';
            }
        }
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建行李面板
function createLuggagePanel(arr, code) {
    var selectOptionList = [];
    selectOptionList = (arr || []).sort(function (a, b) {
        var reg = /\d+/g;
        var Aprice = parseInt(a.code.match(reg)[0], 10);
        var Bprice = parseInt(b.code.match(reg)[0], 10);
        return Aprice > Bprice;
    });

    var html = '';
    try {
        if (selectOptionList.length > 0) {
            html += '<div class="hnaui-form-item">';
            html += '   <select hna-filter="market">';
            html += '       <option value="-1">请选择</option>';
            (selectOptionList || []).forEach(function (subItem) {
                html += createOption(subItem, "luggage");
            });
            html += '   </select>';
            html += '</div>';
        }

    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建餐食面板
function createMealsPanel(arr, code) {
    //对餐食进行分类，主食，小吃，饮料
    // var mealsList = [
    //     {
    //         "code": "MEAL",
    //         "name": "主食",
    //         "list": [],
    //         "images": ["meal-d", "meal-t", "meal-u"]
    //     },
    //     {
    //         "code": "SNACK",
    //         "name": "小吃",
    //         "list": [],
    //         "images": ["snack-e", "snack-h"]
    //     },
    //     {
    //         "code": "DRINK",
    //         "name": "饮料",
    //         "list": [],
    //         "images": ["drink-a", "drink-f"]
    //     },
    //     {
    //         "code": "PROMO",
    //         "name": "促销",
    //         "list": [],
    //         "images": []
    //     }
    // ];
    // (arr || []).forEach(function (item) {
    //     (mealsList || []).forEach(function (subItem) {
    //         if (item.code.indexOf(subItem.code) > -1) {
    //             //item.subCode = (subItem.code).toLowerCase();
    //             item.subCode = "meal-default";

    //             (subItem.images || []).forEach(function (o) {
    //                 if (item.code.toLowerCase() == o) {
    //                     item.subCode = o;
    //                 }
    //             });

    //             subItem.list.push(item);
    //         }
    //     });
    // });
    var imageList = ["meal-b" , "meal-c", "meal-f", "meal-h", "meal-j", "meal-k", "meal-m", "meal-r", "meal-s", "meal-w", "meal-x"];//餐食已提供的图片的数组
    (arr || []).forEach(function(item) {
        item.subCode = "meal-default";

        (imageList || []).forEach(function (o) {
            if (item.code.toLowerCase() == o) {
                item.subCode = o;
            }
        });
    });

    try {
        var html = '';
        // (mealsList || []).forEach(function (item) {
            var selectOptionList = [];
            selectOptionList = (arr || []).sort(function (a, b) {
                return a.amount > b.amount;
            });

            if (selectOptionList.length > 0) {
                html += '<div class="meals-sytle-box">';
                // html += '<p class="main-food">餐食：</p>';
                html += '<div class="hnaui-form-item hnaui-select-meals">';
                html += '   <select hna-filter="market">';
                var defaultTitle = "你还没有选择餐食";
                html += '       <option value="-1" data-default="' + defaultTitle + '">' + defaultTitle + '</option>';
                (selectOptionList || []).forEach(function (subItem) {
                    html += createOption(subItem, "meals");
                });
                html += '   </select>';
                html += '</div>';
                html += '</div>';
            }
        // });
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
function createOption(o, flag) {
    var html = '';
    try {
        html += '   <option';
        html += ' value="' + (o.priceId || "") + '"';
        html += ' data-price="' + (o.amount || 0) + '"';
        html += ' data-code="' + (o.code || "") + '"';
        html += ' data-title="' + (o.name || "") + '"';
        if (o.longDescription) {
            html += ' data-description="' + o.longDescription + '"';
        }
        html += ' data-currency="' + o.currency + '"';
        if (flag == "meals") {
            html += ' data-src="' + hna._img_host + '/images/product/meals/' + (o.subCode || "meal-default") + '.png"';
        }
        html += ' hnaui-market="' + flag + '">';
        html += (o.name) + "（" + _formatMoney(o.amount, o.currency, 0) + '）</option>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建保险，贵宾厅，机上舒适设施等面板
function createCheckboxPanel(arr, code) {
    var html = '';
    try {
        //对保险进行排序
        if (code == "INSURANCE_GROUP") {
            (arr || []).sort(function (a, b) {
                //REFUND_INSURANCE  LIFE_ASSURANCE   DELAY_INSURANCE
                return a.code < b.code;
            });
        }

        (arr || []).forEach(function (subItem) {
            if (subItem.code) {
                html += '<p class="safe-type">';
                html += '   <i class="product-name">' + subItem.name + '</i>';
                html += '   <input type="checkbox" value="' + (subItem.priceId || "") + '" title="' + _formatMoney(subItem.amount, subItem.currency) + '" data-code="' + subItem.code + '" data-price="' + subItem.amount + '" data-currency="' + subItem.currency + '" hna-skin="primary" hna-filter="market">';
                html += '</p>';
            }
        });
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建继续购票按钮
function createSubmitBtnEl() {
    var html = "";
    try {
        // html += '<div class="hnaui-form hnaui-rule">';
        // html += '   <input type="checkbox" name="agreement" title="我已阅读并同意" hna-skin="primary">';
        //html += '   <a href="'+ hna._server_host +'/airR/rules?type=passengerService#baggageLimit" target="_blank" class="subcolor">《北部湾航空乘客告知书双语》</a>';
        // html += '   <a href="'+ hna._server_host +'/airR/rules?type=passengerService#domestticTransport" target="_blank" class="subcolor">《北部湾航空旅客、行李国内运输总条件》</a>';
        // html += '</div>';
        html += '<div class="submit-btn-panel hnaui-push-right">';

        if (isMMB) {
            html += '   <p class="hnaui-btn hnaui-btn-primary order-detail-btn click-btn">暂不购买，返回订单详情页</p>';
        }else{
            html += '   <p class="hnaui-btn hnaui-btn-primary re-search-btn click-btn">重新查询</p>';
        }

        html += '   <p class="hnaui-btn hnaui-btn-theme create-order-btn click-btn ' + (isMMB ? "hnaui-btn-disabled" : "") + '">选好了，去支付</p>';
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}

//创建弹窗，信息确认的内容1
function createOrderGeneration() {
    try {
        // if (!judgeIsRead()) {
        //     return false;
        // }

        var html = '';
        html += '<div class="hnaui-order-generation">';
        html += '   <div class="gencontent hnaui-shadow">';
        //html += '       <h3 class="order-code" style="visibility: hidden;">订单正在生成中<i class="hnaui-icon hnaui-anim hnaui-anim-rotate hnaui-anim-loop loading-icon">&#xe63e;</i></h3>';


        if (isMMB) {
            html += '           <h2 class="order-code">请确认辅营购买信息<span style="display: none;">'+_orderCode+'</span></h2>';
            html += '           <div class="gencontent-content">';
            getMMBChooseMarketInfo();
            if (_chooseMarketInfo.length > 0) {
                _chooseMarketInfo.forEach(function (item) {
                    html += '       <h3 class="flight-name">' + (item.flightTitle) + '</h3>';
                    html += '       <ul>';
                    (item.passenger || []).forEach(function (subItem) {
                        html += '       <li class="market-item">';
                        html += '           <p ><strong>' + subItem.name + '</strong></p>';
                        (subItem.marketList || []).forEach(function (o, index) {
                            html += '           <p class="pr-20">' + (o.productName + "：") + ''+ o.name +'</p>';
                        });
                        html += '       </li>';
                    });
                    html += '       </ul>';
                });
            }

            // getMMBChooseSafeInfo();
            //if (_chooseSafeInfo.length > 0) {
            //    html += '           <p class="tit"><span>请确认购买的保险信息</span></p>';
            //    _chooseSafeInfo.forEach(function (item) {
            //        html += item.flightTitle;
            //        html += '       <ul>';
            //        (item.passenger || []).forEach(function (subItem) {
            //            html += '       <li>';
            //            html += '           <p>' + subItem.name + '购买了 ';
            //            (subItem.marketList || []).forEach(function (o, index) {
            //                if (index > 0) {
            //                    html += ',';
            //                }
            //                html += o.name;
            //            });
            //            html += '           </p>';
            //            html += '       </li>';
            //        });
            //        html += '       </ul>';
            //    });
            //}
            html += '   </div>';

        } else {
            html += '           <h2 class="order-code">准备生成订单，请确认信息</h2>';
            html += '           <div class="gencontent-content">';
            if (_flightInfoList.length > 0) {
                html += '       <p class="tit"><span>航班信息</span></p>';
                html += '       <ul class="flight-info">';
                (_flightInfoList || []).forEach(function (item) {
                    html += '       <li>';
                    html += '           <p>' + getCityNameByCode(item.origin, "city") + '<em></em>' + getCityNameByCode(item.destination, "city") + '<i class="hnaui-icon">&#xe616;</i></p>';
                    html += '           <p class="hna-flight-order"><span>' + item.flightNumber + '</span> <span>' + (hna._date.getDateInfo(item.departureDate).date) + '</span><span> ' + (hna._date.getDateInfo(item.departureDate).shortTime) + ' 起飞</span><i class="hnaui-icon">&#xe616;</i></p>';
                    html += '       </li>';
                });
                html += '';
                html += '       </ul>';
            }
            getMMBChooseMarketInfo();
            if (_chooseMarketInfo.length > 0) {
                html += '           <p class="tit"><span>辅营信息</span></p>';
                _chooseMarketInfo.forEach(function (item) {
                    html += '       <h3 class="flight-name">' + (item.flightTitle) + '</h3>';
                    html += '       <ul>';
                    (item.passenger || []).forEach(function (subItem) {
                        html += '       <li class="market-item">';
                        html += '           <p><strong>' + subItem.name + '</strong></p>';
                        (subItem.marketList || []).forEach(function (o, index) {
                            html += '           <p class="pr-20">' + (o.productName + "：") + ''+ o.name +'<i class="hnaui-icon">&#xe616;</i></p>';
                        });
                        html += '       </li>';
                    });
                    html += '       </ul>';
                });
            }
            if (_passengerInfoList.length > 0) {
                html += '       <p class="tit"><span>乘机人信息</span></p>';
                html += '       <ul>';
                (_passengerInfoList || []).forEach(function (item) {
                    var passenger = new Traveller(item);
                    html += '       <li>';
                    html += '           <span class="name">' + passenger.fullName + '</span>';
                    if (passenger.idNo) {
                        html += '           <span class="id-no">' + _filterIdType(passenger.idType) + "（" + passenger.idNo + '）</span>';
                    } else {
                        html += '           <span class="id-no">_____</span>';
                    }
                    html += '           <i class="hnaui-icon">&#xe616;</i>';
                    html += '       </li>';
                });
                html += '       </ul>';
            }
            html += '   </div>';
        }


        html += '       <div class="hnaui-push-center">';
        html += '           <p  class="hnaui-btn hnaui-btn-theme click-btn passenger-btn" style="display: none;">重新填写乘机人信息</p>';
        html += '           <p  class="hnaui-btn hnaui-btn-theme click-btn re-search-btn" style="display: none;">重新查询航班</p>';

        html += '           <p  class="hnaui-btn hnaui-btn-primary click-btn re-choose-btn">重新选择</p>';
        html += '           <p  class="hnaui-btn hnaui-btn-theme click-btn payment-btn">确认信息，去支付</p>';

        html += '           <p  class="hnaui-btn hnaui-btn-primary click-btn cancel-order-btn" style="display: none;">取消订单</p>';
        html += '           <p  class="hnaui-btn hnaui-btn-theme click-btn continue-payment-btn" style="display: none;">继续支付</p>';
        html += '       </div>';
        html += '   </div>';
        html += '   <div class="hna-loading-mask"></div>';
        html += '</div>';

        $(".hnaui-order-generation").remove();
        $("body").append(html);
    } catch (e) {
        JsErrorTips(e);
    }
}


function createProductExplain(code){
    var html = '';
    html += '<div class="hnaui-rule-box"><div class="content hnaui-shadow">';
    if(code == "GROUP_MEAL"){
        html += '<p>北部湾航空不提供免费配餐服务，我们精心为您准备了各种机上美食，您可以根据自己的喜好进行预订。</p>';
        html += '<p>◆为营造良好客舱环境，请勿在客舱中享用外带食物及饮料。</p>';
        html += '<p>◆菜单上所有食品均数量有限，且可能在不事先通知的情况下临时变更或取消。</p>';
        html += '<p>请<a href="'+ hna._server_host +'/airR/rules?type=addedService#meals" target="_blank">点击此处</a>查看产品详细简介和规定。</p>';

    } else if(code == "GROUP_CHECKED_ITEMS"){
        html += '<p>请关注你所购买机票规定的免费托运行李，合理规划行李数量，如需要请在此添加购买。</p>';
        html += '<p>请<a href="'+ hna._server_host +'/airR/rules?type=addedService#luggage" target="_blank">点击此处</a>查看产品详细简介和规定。</p>';

    } else if(code == "INSURANCE_GROUP"){
        html += '<p>航空意外险，让飞行更安心。遭受航空意外伤害，最高赔付100万元。</p>';
        html += '<p>请<a href="http://www.westair.cn/portal/pageDetail/38.html?menu=Insurance" target="_blank">点击此处</a>查看产品详细简介和规定。</p>';
        html += '<p>航空退票险，不被行程束缚，机票想退就退。机票退票最高赔付400元。</p>';
        html += '<p>请<a href="http://www.westair.cn/portal/pageDetail/38.html?menu=Insurance" target="_blank">点击此处</a>查看产品详细简介和规定。</p>';
        html += '<p>航空延误险，航班延误，我们“赔”你等。航班延误最高赔付300元。</p>';
        html += '<p>请<a href="http://www.westair.cn/portal/pageDetail/38.html?menu=Insurance" target="_blank">点击此处</a>查看产品详细简介和规定。</p>';

    } else if(code == "GROUP_VIP_LOUNGE"){
        html += '<p>机场贵宾厅为您提供一个温暖且温馨的机场休憩空间。您可在航班起飞前，前往此处休息放松，享受专属私人空间。（温馨提示：此价格仅现在预定享受，现在预定享受2折优惠！）</p>';
        html += '<p>请<a href="http://www.westair.cn/portal/pageDetail/154.html?menu=VIPLounge" target="_blank">点击此处</a>查看产品详细简介和规定。</p>';

    } else if(code == "GROUP_ON_FLIGHT_ITEM"){
        html += '<p>舒适的机上套装，在机上常保舒适温暖。舒适套装包含一个颈枕、一副眼罩与一张毛毯。</p>';
        html += '<p>材质：眼罩：尼龙，毛毯：珊瑚绒，颈枕：毛绒/PVC 尺寸：毛毯：160cm×100cm，颈枕：11" x 11.5"</p>';
        html += '<p>产品说明</p>';
        html += '<p>1.在起飞时间前36小时内将无法预订机上舒适设施。</p>';
        html += '<p>2选择该设施后将无法进行取消并获得退款，除非因航空公司原因造成的航班变更/取消或质量问题造成无法使用。</p>';
        html += '<p>3.您的登机牌是您购买此设施的证据，请将它交给飞机上的乘务员以取得您的设施。</p>';
        html += '<p>4.北部湾航空有权利更改任何预订该设施的组件及规格。北部湾航空将尽力确保所变更的设施价值相似。</p>';
    }
    html += '</div></div>';
    return html;
}
