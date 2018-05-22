hna._i18nMap.addLanguages({
    "HB01": {"zh_CN": "更新您的浏览器(当前浏览器(内核)：{0} {1})", "en_US": ""},
    "HB02": {"zh_CN": "1.尊敬的用户，我们检测到您当前使用的浏览器版本过低，浏览本网站时可能会出现影响操作体验的情况。", "en_US": ""},
    "HB03": {"zh_CN": "2.我们建议您及时将浏览器升级到最新版本，或使用其他浏览器，以获得更好的使用体验。", "en_US": ""},
    "HB04": {"zh_CN": "3.大部分国产浏览器（360、搜狗）切换至极速模式即可解决绝大多数兼容性问题。", "en_US": ""},
    "HB05": {"zh_CN": "推荐使用以下浏览器的最新版本：", "en_US": ""},
    "HB06": {"zh_CN": "不再提示", "en_US": ""}
});
$(function () {
    function isIE(userAgent) {
        var browser, regex;
        if (userAgent.contains("MSIE")) {
            browser = "IE";
            regex = /MSIE\s+(\d+(\.\d+)+)/;
        } else if (/\.NET\s+CLR/.test(userAgent)) {
            if (browser && regex) {
                //IE 11
                browser = "IE";
                regex = /rv\:(\d+(\.\d+)+)/;
            }
            version = userAgent.match(regex)[1];
            return {name: browser, version: version};
        }
        return false;
    }

    function browserVersion() {
        var userAgent = navigator.userAgent, brand;
        //test IE
        var result = isIE(userAgent);
        if (result) {
            return result;
        }

        //test others
        var regex = "\\\/(\\\d+(\\\.\\\d+)*)", browser, version;
        if (userAgent.contains("Safari")) {
            //Safari or Chrome or Opera
            browser = "Safari";
            if (userAgent.contains("Chrome")) {
                //360,搜狗均使用chrome版本号
                browser = "Chrome";
                //Opera
                if (userAgent.contains("OPR")) {
                    browser = "OPR";
                }
                if (userAgent.contains("Opera")) {
                    browser = "Opera";
                }
                //Edge
                if (userAgent.contains("Edge")) {
                    browser = "Edge";
                }
                //遨游
                if (userAgent.contains("Maxthon")) {
                    browser = "Maxthon";
                }
            }
        } else if (userAgent.contains("Firefox")) {
            //Firefox
            browser = "Firefox";
        }
        if (browser) {
            regex = new RegExp(browser + regex);
            version = userAgent.match(regex)[1];
            return {name: browser, version: version};
        }

        //unknown browser
        return {name: "Unknown", version: "0"};
    }

    function showTip(browser) {
        var targetStr = 'target="_blank"';
        var class1 = 'class="hnaui-bowser-download"';
        var class2 = 'class="hnaui-icon"';
        var icon = "&#xe601;";
        var html = '<div>';
        html += _i18n("HB02") + '<br />';
        html += _i18n("HB03") + '<br />';
        html += '<span>' + _i18n("HB04") + '</span>';
        html += '<p class="hnaui-bowser-recommend">' + _i18n("HB05") + '</p>';
        html += '<table><tr>';
        html += '<td '+class1+'><a href="http://www.firefox.com.cn" '+targetStr+'><span '+class2+'>' + icon + '</span>火狐(Firefox)浏览器</a></td>';
        html += '<td '+class1+'><a href="http://www.google.cn/chrome/browser/desktop/index.html" '+targetStr+'><span '+class2+'>' + icon + '</span>谷歌(Chrome)浏览器</a></td>';
        html += '<td '+class1+'><a href="https://support.microsoft.com/en-us/help/17621/internet-explorer-downloads" '+targetStr+'><span '+class2+'>' + icon + '</span>IE浏览器</a></td>';
        html += '</tr><tr>';
        html += '<td '+class1+'><a href="http://se.360.cn" '+targetStr+'><span '+class2+'>' + icon + '</span>360浏览器</a></td>';
        html += '<td '+class1+'><a href="http://ie.sogou.com" '+targetStr+'><span '+class2+'>' + icon + '</span>搜狗(Sogou)浏览器</a></td>';
        html += '<td '+class1+'><a href="http://www.opera.com" '+targetStr+'><span '+class2+'>' + icon + '</span>Opera浏览器</a></td>';
        html += '</tr></table>';
        html += '</div>';
        hnaer.open({
            type: 1,
            area: "700px",
            title: '<span style="top:2px;margin-right: 10px;"></span>' + _i18n("HB01", [browser.name, browser.version]),
            content: html,
            btn: [_i18n("HB06"), _i18n("close")],
            yes: function (index) {
                hna._store.setStore("hna-browser-tip", true);
                hnaer.close(index);
            },
            btn2: function (index) {
                hnaer.close(index);
            }
        });
    }

    function checkBrowser() {
        //移动端不检测
        if (!hna.isPC()) {
            return;
        }
        var checked = hna._store.getStore("hna-browser-tip");
        if (checked) {
            return;
        }
        var browser = browserVersion(),
            name = browser.name,
            version = parseFloat(browser.version);
        if ((name == "IE" && version < 8) ||
            (name == "Maxthon" && version < 4.1) ||
            (name == "Chrome" && version < 15)) {
            showTip(browser);
        }

    }

    checkBrowser();
});

