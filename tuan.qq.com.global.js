var ERR_CODE = {'PARAMETER_ERR': -100001, 'NOT_LOGIN': -100002, 'SVR_ERR': -100005, 'NOT_CLUB': -100006, 'ERR_REFUND': -100007, 'ERR_REDO': -100008, 'NOTPAY': -100009, 'NOTTUAN': -100010, 'OVERUSERLIMIT': -100011, 'OVERTOTALLIMIT': -100012, 'OVERTIME': -100013, 'PAYED': -100014, 'REFUNDED': -100015, 'CREATEOVERTIME': -100016, 'CREATEOVERTOTALLIMIT': -100017, 'CREATEOVERUSERLIMIT': -100018, 'CREATEOVERFREQUENCY': -100019, 'TOKEN_NOT_EXIST': -100020, 'ORDER_NOT_EXIST': -100021, 'GROUPON_NOT_EXIST': -100022, 'INVALID_GROUPON_ID': -100023, 'DIFFERENT_USER': -100031, 'ADDRESS_NOT_FOUND': -100032, 'GROUPON_HAVE_NO_ORDER': -100034};
var RET_COMMON = {"retcode": ERR_CODE.SVR_ERR, "retdata": {}};
var DEF_COMMON = {VIP_CITY_TUAN_USERSOURCE_COOKIENAME: 'city_tuan_source', VIP_CITY_TUAN_USERSOURCEID_COOKIENAME: 't_usid', VIP_CITY_TUAN_QZONETRACE_COOKIENAME: 'city_tuan_qzonetraceid', VIP_CITY_TUAN_URL_COOKIENAME: 'vip_city_tuan_url', VIP_CITY_TUAN_PAIPAITJ_COOKIENAME: 'vip_city_tuan_paipaitj', VIP_CITY_TUAN_CITY_COOKIENAME: 'vip_city_tuan_city'};
function inArray(arr, e) {
    for (var i = 0; i < arr.length && arr[i] != e; i++);
    return!(i == arr.length);
}
var isWebQQ = (function () {
    try {
        if (window.parent != window.self) {
            document.domain = 'qq.com';
            if (window.parent.qqweb.portal.openInWebBrowser) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (vError) {
        return false;
    }
})();
var clickEngine = function (e) {
    if (!isWebQQ) {
        return;
    }
    var event = e || window.event;
    var target = event.srcElement || event.target;
    while (target) {
        if (target.tagName == 'A' && target.target == '_blank') {
            if (target.href.indexOf(window.location.hostname) != -1 && target.href.indexOf('/deal/print') == -1) {
                try {
                    var notify = target;
                    if (notify.fireEvent) {
                        do {
                            notify.fireEvent('onmouseout');
                        } while (notify = notify.parentNode);
                    } else if (notify.dispatchEvent) {
                        var mouseEvent = document.createEvent('MouseEvents');
                        mouseEvent.initEvent('mouseout', false, true);
                        do {
                            notify.dispatchEvent(mouseEvent);
                        } while (notify = notify.parentNode);
                    }
                    if (event.target) {
                        event.stopPropagation();
                        event.preventDefault();
                    } else {
                        event.cancelBubble = true;
                        event.returnValue = false;
                    }
                    parent.qqweb.portal.openInWebBrowser({url: target.href, isHideBar: false, title: 'QQ团购'});
                    return;
                } catch (vError) {
                    return;
                }
            }
        }
        target = target.parentNode;
    }
    return;
};
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
};
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
};
function msg(err_code) {
    if (err_code != 0) {
        switch (err_code) {
            case ERR_CODE.PARAMETER_ERR:
                alert("服务器忙，请稍后再试！[" + err_code + "]");
                break;
            case ERR_CODE.DIFFERENT_USER:
                alert("您已使用其他账号登录，请刷新页面后再试");
                break;
            case ERR_CODE.ADDRESS_NOT_FOUND:
                alert("该地址不存在，请刷新页面后再试");
                break;
            case ERR_CODE.NOT_LOGIN:
                openLogin();
                break;
            case ERR_CODE.CREATEOVERUSERLIMIT:
                if (RET_COMMON.retdata['remaincount'] <= 0)
                    alert("非常抱歉，此商品每人限购" + iSingleLimit + "个，您已经达到购买上限，不能再次购买。"); else
                    alert("非常抱歉，此商品每人限购" + iSingleLimit + "个，您只能购买"
                        + RET_COMMON.retdata['remaincount'] + "个。");
                break;
            case ERR_CODE.CREATEOVERTOTALLIMIT:
                alert("非常抱歉，此商品总量上限" + iTotalLimit + "个，当前仅剩"
                    + RET_COMMON.retdata['remaincount'] + "个。");
                break;
            case ERR_CODE.CREATEOVERTIME:
                alert("非常抱歉，活动已经过期，不能购买。");
                break;
            case ERR_CODE.CREATEOVERFREQUENCY:
                alert("非常抱歉，您购买过于频繁，请稍后再试。");
                break;
            case ERR_CODE.GROUPON_NOT_EXIST:
                alert("非常抱歉，该团购不存在");
                break;
            case ERR_CODE.INVALID_GROUPON_ID:
                alert("非常抱歉，该团购id无效，请填写有效的团购ID");
                break;
            case ERR_CODE.GROUPON_HAVE_NO_ORDER:
                alert('该团购暂时没有符合条件的订单！');
                break;
            default:
                alert("服务器忙，请稍后再试！[" + err_code + "]");
        }
    }
}
function isMobile(mobile) {
    if (mobile.length != 11 || !(/^1[3458][0-9]{9}$/.test(mobile)))
        return false;
    return true;
}
function insertAfter(newEl, targetEl) {
    var parentEl = targetEl.parentNode;
    if (parentEl.lastChild == targetEl) {
        parentEl.appendChild(newEl);
    } else {
        parentEl.insertBefore(newEl, targetEl.nextSibling);
    }
}
function loadScript(src, cb) {
    var j = document.createElement("script");
    j.setAttribute("type", "text/javascript");
    j.setAttribute("src", src);
    if (!!window.attachEvent) {
        j.onreadystatechange = function () {
            if (j.readyState == "loaded" || j.readyState == "complete") {
                if (typeof(cb) == 'function') {
                    cb();
                }
            }
        }
    } else {
        if (typeof(cb) == 'function') {
            j.onload = cb;
        }
    }
    document.getElementsByTagName("head")[0].appendChild(j);
}
function loadScript_GBK(src, cb) {
    var j = document.createElement("script");
    j.setAttribute("type", "text/javascript");
    j.setAttribute("src", src);
    j.setAttribute("charset", 'gbk');
    if (!!window.attachEvent) {
        j.onreadystatechange = function () {
            if (j.readyState == "loaded" || j.readyState == "complete") {
                cb();
            }
        }
    } else {
        j.onload = cb;
    }
    document.getElementsByTagName("head")[0].appendChild(j);
}
var requestXml = {useActiveX: (typeof window.ActiveXObject != "undefined"), useXmlHttp: (typeof window.XMLHttpRequest != "undefined"), MS_XMLHTTP_VERS: ["MSXML2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"], xmlCache: {}, txtCache: {}};
function getXML(ds, sURL, urlp, cb, errcb, mtd) {
    var newUrl = "";
    if (urlp != null && urlp != "" && urlp != '') {
        newUrl = sURL + "?" + urlp;
    } else {
        newUrl = sURL;
    }
    loadXMLasync(ds, sURL, urlp, cb, errcb, mtd);
}
function getTEXT(ds, sURL, urlp, cb, errcb, mtd) {
    var newUrl = "";
    if (urlp != null && urlp != "" && urlp != '') {
        newUrl = sURL + "?" + urlp;
    } else {
        newUrl = sURL;
    }
    loadTextAsync(ds, sURL, urlp, cb, errcb, mtd);
}
function loadTextAsync(ds, url, params, cb, errcb, mtd, reportConfig) {
    if (typeof(reportConfig) != 'undefined') {
        var reportConfigItem = AjaxReport.start(reportConfig);
    }
    var req = null, newUrl = "";
    try {
        req = creatRequest();
    } catch (e) {
        alert("你的浏览器无法创建XMLHttpRequest");
        return false;
    }
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                if (typeof(reportConfig) != 'undefined') {
                    AjaxReport.end(reportConfigItem, AjaxReport.returnCodeSuccess);
                }
                requestXml.txtCache[ds] = req.responseText;
                if (isfunction(cb) == true) {
                    cb(req.responseText);
                }
            } else {
                if (typeof(reportConfig) != 'undefined') {
                    AjaxReport.end(reportConfigItem, AjaxReport.returnCodeFail);
                }
                if (isfunction(errcb) == true) {
                    errcb();
                }
            }
        }
    };
    var method = (mtd == null ? "GET" : mtd);
    if (params != null && params != "" && params != '') {
        newUrl = url + "?" + params;
    } else {
        newUrl = url;
    }
    switch (method) {
        case"GET":
            req.open("GET", newUrl, true);
            req.send(null);
            break;
        case"POST":
            req.open("POST", url, true);
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.send(params);
            break;
        case"HEAD":
            req.open("HEAD", newUrl, true);
            req.send(null);
            break;
        default:
            req.open("GET", newUrl, true);
            req.send(null);
            break;
    }
}
function creatRequest() {
    var xmlHttp = null;
    if (requestXml.useXmlHttp) {
        xmlHttp = new XMLHttpRequest();
        if (xmlHttp.overrideMimeType) {
            xmlHttp.overrideMimeType('text/xml');
        }
        return xmlHttp;
    } else if (requestXml.useActiveX) {
        if (!requestXml.XMLHTTP_VER) {
            for (var i = 0; i < requestXml.MS_XMLHTTP_VERS.length; i++) {
                try {
                    new ActiveXObject(requestXml.MS_XMLHTTP_VERS[i]);
                    requestXml.XMLHTTP_VER = requestXml.MS_XMLHTTP_VERS[i];
                    break;
                } catch (e) {
                }
            }
        }
        if (requestXml.XMLHTTP_VER) {
            return new ActiveXObject(requestXml.XMLHTTP_VER);
        } else {
            throw new Error("")
        }
    } else {
        throw new Error("");
    }
}
function loadXMLasync(ds, url, params, cb, errcb, mtd) {
    var req = null, newUrl = "";
    try {
        req = creatRequest();
    } catch (e) {
        return false;
    }
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                requestXml.xmlCache[ds] = req.responseXML;
                if (isfunction(cb) == true) {
                    cb(requestXml.xmlCache[ds]);
                }
            } else if (isfunction(errcb) == true) {
                errcb();
            }
        }
    };
    var method = (mtd == null ? "GET" : mtd);
    if (params != null && params != "" && params != '') {
        newUrl = url + "?" + params;
    } else {
        newUrl = url;
    }
    switch (method) {
        case"GET":
            req.open("GET", newUrl, true);
            req.send(null);
            break;
        case"POST":
            req.open("POST", url, true);
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.send(params);
            break;
        case"HEAD":
            req.open("HEAD", newUrl, true);
            req.send(null);
            break;
        default:
            req.open("GET", newUrl, true);
            req.send(null);
            break;
    }
}
function call_error() {
}
function get_xml_node_value(xdoc, s, i) {
    if (s == null || s == "") {
        return'';
    }
    if (xdoc.documentElement.getElementsByTagName(s)[0].firstChild == null) {
        return'';
    } else {
        if (xdoc.documentElement.getElementsByTagName(s).length > 1 && parseInt(i)) {
            return xdoc.documentElement.getElementsByTagName(s)[i].firstChild.data
        } else {
            return xdoc.documentElement.getElementsByTagName(s)[0].firstChild.data;
        }
    }
}
function isfunction(wh) {
    if (!wh) {
        return false;
    }
    return(wh instanceof Function || typeof wh == "function");
}
function pageWidth() {
    return window.innerWidth != null ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;
}
function pageHeight() {
    return window.innerHeight != null ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body != null ? document.body.clientHeight : null;
}
function topPosition() {
    return typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
}
function leftPosition() {
    return typeof window.pageXOffset != 'undefined' ? window.pageXOffset : document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ? document.body.scrollLeft : 0;
}
function getStyle(elem, name) {
    if (elem.style[name])
        return elem.style[name]; else if (elem.currentStyle)
        return elem.currentStyle[name]; else if (document.defaultView && document.defaultView.getComputedStyle) {
        name = name.replace(/([A-Z])/g, "-$1");
        name = name.toLowerCase();
        var s = document.defaultView.getComputedStyle(elem, "");
        return s && s.getPropertyValue(name);
    } else
        return null
}
function initDivScroll() {
    if (!$('mask')) {
        var mask = document.createElement("div");
        mask.setAttribute('id', 'mask');
        mask.style.display = 'none';
        mask.className = "mod_pop_mask";
        document.body.appendChild(mask);
    }
    if (QQVIP.userAgent.ie == 6) {
        if (!$('iframe_mask')) {
            var iframemask = document.createElement("iframe");
            iframemask.setAttribute('id', 'iframe_mask');
            iframemask.setAttribute('src', '#');
            iframemask.setAttribute('frameborder', '0');
            iframemask.setAttribute('scrolling', 'no');
            iframemask.style.display = 'none';
            document.body.appendChild(iframemask);
        }
    }
    if (QQVIP.userAgent.ie == 6)
        window.onscroll = window_onscroll;
}
function window_onscroll() {
    if (QQVIP.userAgent.ie == 6) {
        $e('div[name=TUAN_DIVTIP]').each(function (el) {
            if (el.style.display == "none")
                return;
            var h = getStyle(el, "height");
            h = parseInt(h);
            if (isNaN(h) || h == 0)
                h = 500;
            var height = pageHeight();
            var top = topPosition();
            el.style.top = top + (height / 2) - (h / 2) + "px";
        });
    }
    el = $('mask');
    if (!el || el.style.display == "none")
        return;
    if (QQVIP.userAgent.ie == 6) {
        el.style.top = topPosition() + "px";
    }
};
function showDiv(id) {
    $e('div[name=TUAN_DIVTIP]').each(function (el) {
        el.style.display = "none";
    });
    if (!$("mask"))initDivScroll();
    if (QQVIP.userAgent.ie == 6) {
        if ($('iframe_mask'))
            $('iframe_mask').style.display = "block";
    }
    if ($(id))
        $(id).style.display = "block";
    if ($("mask"))
        $("mask").style.display = "block";
    window_onscroll();
}
function hideDiv(id) {
    if ($(id))
        $(id).style.display = "none";
    if ($("mask"))
        $("mask").style.display = "none";
    if (QQVIP.userAgent.ie == 6) {
        if ($("iframe_mask"))
            $('iframe_mask').style.display = "none";
    }
}
function logout() {
    csrf_token = QQVIP.security.getAntiCSRFToken();
    loadScript('/act/logout/?g_tk=' + csrf_token, logout_cb);
}
function logout_cb() {
    window.location.reload();
}
function setRtValue(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
}
var Nav = {ini_nav: function () {
    QZFL.event.addEvent($e('v:all_service'), 'mouseover', Nav.show_all_service);
    QZFL.event.addEvent($e('v:all_service'), 'mouseout', Nav.hide_all_service);
    QZFL.event.addEvent($e('v:all_service_div'), 'mouseover', Nav.show_all_service);
    QZFL.event.addEvent($e('v:all_service_div'), 'mouseout', Nav.hide_all_service);
    QZFL.event.addEvent($e('v:all_service'), 'click', setRtValue);
    QZFL.event.addEvent($e('v:more_service'), 'mouseover', Nav.show_more_service);
    QZFL.event.addEvent($e('v:more_service'), 'mouseout', Nav.hide_more_service);
    QZFL.event.addEvent($e('v:more_service_div'), 'mouseover', Nav.show_more_service);
    QZFL.event.addEvent($e('v:more_service_div'), 'mouseout', Nav.hide_more_service);
    QZFL.event.addEvent($e('v:more_service'), 'click', setRtValue);
    QZFL.event.addEvent(document.getElementById('v:change_city'), 'mouseover', Nav.show_city_list);
    QZFL.event.addEvent(document.getElementById('v:change_city'), 'mouseout', Nav.hide_city_list);
    QZFL.event.addEvent(document.getElementById('v:city_list'), 'mouseover', Nav.show_city_list);
    QZFL.event.addEvent(document.getElementById('v:city_list'), 'mouseout', Nav.hide_city_list);
    QZFL.event.addEvent(document.getElementById('v:change_city'), 'click', setRtValue);
}, show_all_service: function () {
    $e('#v\\:all_service_div').show();
    $e('v:all_service').className = "lk_life_service current";
}, hide_all_service: function () {
    $e('#v\\:all_service_div').hide();
    $e('v:all_service').className = "lk_life_service"
}, show_more_service: function () {
    $e('#v\\:more_service_div').show();
    $e('v:more_service').className = "lk_vip_service current";
}, hide_more_service: function () {
    $e('#v\\:more_service_div').hide();
    $e('v:more_service').className = "lk_vip_service";
}, show_city_list: function () {
    this.isHide = false;
    $e('#v\\:city_list').show();
}, hide_city_list: function () {
    this.isHide = true;
    var _this = this;
    setTimeout(function () {
        if (_this.isHide) {
            $e('#v\\:city_list').hide();
            if (QQVIP.userAgent.ie == 6) {
                $e('#v\\:iframe_mask_city').hide();
            }
        }
    }, 100);
}, isHide: true}
function cb_null() {
}
function checkMail(mail) {
    var reg = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)*(\.[a-zA-Z]+)$/;
    return reg.test(mail);
}
function checkQQMail(mail) {
    var reg1 = /^([\.a-zA-Z0-9_-])+@qq.com$/i;
    var reg2 = /^([\.a-zA-Z0-9_-])+@vip.qq.com$/i;
    return reg1.test(mail) || reg2.test(mail);
}
function checkIdcard(elem) {
    var area = {11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"};
    var idcard = elem.toUpperCase();
    var Y, JYM;
    var S, M;
    var idcard_array = new Array();
    idcard_array = idcard.split("");
    if (area[parseInt(idcard.substr(0, 2))] == null) {
        return false;
    }
    switch (idcard.length) {
        case 15:
            if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
            } else {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
            }
            if (ereg.test(idcard)) {
                return true;
            } else {
                return false;
            }
            break;
        case 18:
            if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
            } else {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
            }
            if (ereg.test(idcard)) {
                S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                    + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                    + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                    + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                    + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                    + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                    + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1
                    + parseInt(idcard_array[8]) * 6
                    + parseInt(idcard_array[9]) * 3;
                Y = S % 11;
                M = "F";
                JYM = "10X98765432";
                M = JYM.substr(Y, 1);
                if (M == idcard_array[17]) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            ;
            break;
        default:
        {
            return false;
        }
            break;
    }
    return true;
}
function checkMobileNum(elem) {
    var pat = /^1[0-9]{10}$/;
    return pat.test(elem);
}
function setTuanCookie(varName, varValue, varExpires) {
    var str = varName + "=" + escape(varValue);
    str += "; domain=" + window.location.host + "; path=/;";
    if (typeof(varExpires) != "undefined") {
        var date = new Date();
        var ms = varExpires * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}
function getTuanCookie(varName) {
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == varName) {
            if (typeof(temp[1]) == "undefined")
                return 0; else
                return unescape(temp[1]);
        }
    }
    return 0;
}
function reloadPage() {
    var arr = location.href.split('?');
    if (arr[1] && location.href.indexOf('/success') == -1)
        location.replace(arr[0]); else
        location.reload();
}
function copyThis(meintext, alertText) {
    if (window.clipboardData) {
        try {
            if (window.clipboardData.setData("Text", meintext)) {
                if (alertText == 'share') {
                    alert('地址已经复制到您的剪贴板，您可以发送给您的朋友啦！');
                }
                else {
                    alert('已经复制到您的剪贴板啦！');
                }
            }
        }
        catch (err) {
            return;
        }
    }
    else {
        if (alertText == 'share') {
            alert('您的浏览器不支持复制到剪贴板，您可以从网页的地址栏里手动复制。');
        }
        else {
            alert('您的浏览器不支持复制到剪贴板，您可以手动复制。');
        }
    }
}
var timeCounterVersion;
function showTimeCounter() {
    nowtime = new Date().getTime();
    SysSecond = Math.round(lefttime - (nowtime - begintime) / 1000);
    if (SysSecond < 0) {
        setTimeout('location.reload()', 5000);
        return;
    }
    var sec = Math.floor(SysSecond % 60);
    var minutes = Math.floor(SysSecond / 60);
    var min = Math.floor(minutes % 60);
    var hour = Math.floor(minutes / 60);
    if (timeCounterVersion == 2) {
        var h = Math.floor(hour % 24);
        var day = Math.floor(hour / 24);
        $e('#v\\:timeCounter').setHtml("<span class=\"item\"><span class=\"day\">" + day + "</span>天</span><span class=\"item\"><span class=\"hour_num\">" + h + "</span>小时</span><span class=\"item\"><span class=\"minute_num\">" + min + "</span>分</span><span class=\"item\"><span class=\"second_num\">" + sec + "</span>秒</span>");
    } else {
        $e('#timeCounter').setHtml("<span class=\"hour\"><em>" + hour
            + "</em>小时</span><span class=\"minute\"><em>" + min
            + "</em>分</span><span class=\"second\"><em>"
            + Math.floor(SysSecond % 60) + "</em>秒</span>");
    }
    setTimeout(showTimeCounter, 1000);
}
function setBar(rangeNum) {
    sellrate = Math.floor(isellCount * 100 / rangeNum);
    sbar = $e('#sellBar');
    sbar.setStyle('width', sellrate + "%");
    sbar.setHtml(sellrate + "%")
    $e('#sellLeft').setHtml(rangeNum - isellCount);
}
function set_sub_city(obj, cityEn) {
    $e('#subscribe_city').setVal(obj.innerHTML);
    $e('#subscribe_city_real').setVal(cityEn);
    $e("#subscribe_city").removeClass('current');
    hideDiv('subscribe_city_list');
}
function getCookie(sName) {
    var sRE = "(?:; )?" + sName + "=([^;]*);?";
    var oRE = new RegExp(sRE);
    if (oRE.test(document.cookie)) {
        return decodeURIComponent(RegExp["$1"]);
    } else {
        return null;
    }
}
function checkLogin() {
    var requestUrl = '/act/islogin/';
    var isLoginParam = 'g_tk=' + QZFL.security.getAntiCSRFToken() + '&pageUrl=' + encodeURIComponent(window.location.href);
    var isLoginFlags = [];
    try {
        if ('undefined' != typeof(JS_CONF) && 'undefined' != typeof(JS_CONF.IS_LOGIN)) {
            if ('undefined' != typeof(JS_CONF.IS_LOGIN.QQVIP) && JS_CONF.IS_LOGIN.QQVIP) {
                isLoginFlags.push('QQVIP');
            }
            if ('undefined' != typeof(JS_CONF.IS_LOGIN.QZONEVIP) && JS_CONF.IS_LOGIN.QZONEVIP) {
                isLoginFlags.push('QZONEVIP');
            }
        }
    } catch (e) {
    }
    if (0 < isLoginFlags.length) {
        isLoginParam += '&flag=' + isLoginFlags.join(',');
    }
    loadTextAsync('islogin', requestUrl, isLoginParam, function (ret) {
        eval(ret);
        if (typeof RET_COMMON.retData.realCity != 'undefined') {
            window.realCityEn = RET_COMMON.retData['realCity'];
        }
        if (RET_COMMON.retCode == 1) {
            var g = [];
            var html = "";
            g.push('<p>');
            g.push('欢迎您 <strong class="mod_userinfo_name">');
            g.push('<a class="usname" href="http://gaopeng.qq.com/my/orders/list">' + decodeURIComponent(RET_COMMON.retData['nick']) + '</a>');
            g.push('</strong> <em id="order_remind"></em>');
            g.push('<a href="#" pgv="FUNCTION.HEADER.LOGOUT" title="退出" class="mod_userinfo_logout" onclick="logout();return false;">退出</a><span>高朋独家运营</span>');
            g.push('</p>');
            html += g.join("");
            $e('#mod_userinfo').setHtml(html);
            if (RET_COMMON.retData['staffType'] && RET_COMMON.retData['staffType'] > 0) {
                $e('#tencent_staff').setAttr('href', RET_COMMON.retData['staffInfo']['link']);
                $e('#tencent_staff').setAttr('title', RET_COMMON.retData['staffInfo']['tips']);
                $e('#tencent_staff').setHtml('<i></i>' + RET_COMMON.retData['staffInfo']['tips']);
                $e('#tencent_staff').show();
            }
            window.userUin = RET_COMMON.retData['uin'];
            if ('undefined' == typeof(RET_COMMON.retData['isQQVIP'])) {
                window.isQQVIP = false;
            } else {
                window.isQQVIP = RET_COMMON.retData['isQQVIP'];
            }
            if ('undefined' == typeof(RET_COMMON.retData['isQZONEVIP'])) {
                window.isQZONEVIP = false;
            } else {
                window.isQZONEVIP = RET_COMMON.retData['isQZONEVIP'];
            }
            window.paipaikey = RET_COMMON.retData['paipaikey'];
            if (typeof RET_COMMON.retData.userArea != 'undefined') {
                window.userArea = RET_COMMON.retData.userArea;
            }
            levent.login();
        }
        levent.checkLoginFinish();
    }, null, 'POST', AjaxReport.reportConfig.act_islogin);
}
function loginEvent() {
}
loginEvent.prototype = {loginChecked: false, logined: false, login: function () {
    this.logined = true;
    if (this.onLogin) {
        for (var i = 0; i < this.onLogin.length; i++) {
            this.onLogin[i]();
        }
    }
}, checkLoginFinish: function () {
    this.loginChecked = true;
    if (this.onCheckLoginFinish) {
        for (var i = 0; i < this.onCheckLoginFinish.length; i++) {
            this.onCheckLoginFinish[i]();
        }
    }
}, attachOnLogin: function (_eHandler) {
    if (this.logined) {
        _eHandler();
    } else {
        if (!this.onLogin)this.onLogin = [];
        this.onLogin.push(_eHandler);
    }
}, attachOnCheckLoginFinish: function (_eHandler) {
    if (this.loginChecked) {
        _eHandler();
    } else {
        if (!this.onCheckLoginFinish)this.onCheckLoginFinish = [];
        this.onCheckLoginFinish.push(_eHandler);
    }
}}
var levent = new loginEvent();
function IsNum(e) {
    var k = window.event ? e.keyCode : e.which;
    if (((k >= 48) && (k <= 57)) || k == 8 || k == 0) {
    } else {
        if (window.event) {
            window.event.returnValue = false;
        } else {
            e.preventDefault();
        }
    }
}
function showSMS(obj, token, orderid) {
    var o = QZFL.element.get(obj).getParent();
    o.setHtml('<label>手机号：<input type="text" /></label><button type="button" class="btn_tx2"">发送</button>');
    o.addClass('mobile');
    o.find('button').each(function (el) {
        addEvent(el, 'click', function () {
            sendSMS(el, token, orderid);
        });
    });
    o.find('input').each(function (el) {
        addEvent(el, 'keypress', IsNum);
    });
    getTEXT('getmobile', '/act/mobile/getmobile?g_tk=' + QQVIP.security.getAntiCSRFToken(), null, function (ret) {
        eval(ret);
        if (RET_COMMON.retCode == 0) {
            var mobile = RET_COMMON.retData.mobile;
            if (mobile != 0) {
                o.find('input').setVal(mobile);
            }
        }
    }, call_error);
}
function sendSMS(obj, token, orderid) {
    var o = QZFL.element.get(obj);
    var mobileInputObj = o.getPrev().getChildren().get(0);
    var mobile = mobileInputObj.getVal();
    if (mobile == '' || mobile == "") {
        alert('请填写手机号');
        return false;
    }
    if (mobile.length != 11 || !(/^1[3458][0-9]{9}$/.test(mobile))) {
        alert('请填写正确的11位手机号');
        return false;
    }
    csrf_token = QQVIP.security.getAntiCSRFToken();
    loadTextAsync('send', '/act/my/sendtoanyone' + '?order=' + orderid + '&mobile=' + mobile + '&token=' + encodeURIComponent(token) + '&g_tk=' + csrf_token + '&r=' + Math.random(), null, function (ret) {
        eval(ret);
        if (RET_COMMON.retCode == 0) {
            var p = o.getParent();
            p.setHtml('已发送到：' + mobile);
            p.removeClass('mobile');
        } else {
            msg(RET_COMMON.retData.errMsg);
        }
    }, null, 'GET', AjaxReport.reportConfig.mobile_sendtoanyone);
}
function movie_cb(v) {
    v = eval('(' + v + ')');
    if (typeof(v) == "undefined" || v.error != 0) {
        $e('#pop_my_order_' + currentOrder).setHtml('<p class="info_error">服务器忙，请稍后再试！错误码[' + v.error + '],错误信息[' + v.msg + ']</p>');
        $e('#token_' + currentOrder).addClass('order_more_hover');
        return;
    }
    if (typeof(v.detail) != "undefined") {
        movie_token_cb(v);
        return;
    }
    var strhtm = '\
  <!-- 浮出层 开始 -->\
   <table class="get7">\
    <colgroup>\
     <col class="colm1" />\
     <col class="colm2" />\
     <col class="colm3" />\
     <col class="colm4" />\
    </colgroup>\
    <thead>\
     <tr>\
      <th>电影院</th>\
      <th>兑换身份证</th>\
      <th>购票数</th>\
      <th>兑票数</th>\
     </tr>\
    </thead>\
    <tbody>\
     <tr>\
      <td>' + v.data.cinema_name + '</td>\
      <td>' + v.data.card + '</td>\
      <td>' + v.data.buy_ticket_num + '</td>\
      <td>' + v.data.get_ticket_num + '</td>\
     </tr>\
    </tbody>\
   </table>\
   <div class="info_explain">\
    <h4 class="c_tx1">使用说明</h4>\
    <ol>\
     <li>请在有效期内携带身份证到' + v.data.cinema_name + '柜台，告知为“QQ用户看电影”，选择电影、场次和座位，即可观影。</li>\
     <li>电子票在有效期内可兑换同一影院的任意电影（除非特别说明，否则一般不适用于情人节、圣诞节、平安夜、VIP厅、3D电影、首映）。</li>\
     <li>由于影院系统设置了统一的打印价，因此可能存在影院打印的票面价与您订购的电子票价格不相符的情况。</li>\
    </ol>\
   </div>\
   <button type="button" class="btn_close" onclick="TUAN.MyOrders.hideTokens();">关闭</button>\
  <!-- 浮出层 结束 -->';
    $e('#pop_my_order_' + currentOrder).setHtml(strhtm);
    $e('#token_' + currentOrder).addClass('order_more_hover');
    loads[currentOrder] = 1;
}
function movie_token_cb(v) {
    items = [];
    orderid = v.data.transaction_id;
    for (i = 0; i < v.detail.length; i++) {
        str_state = '未知';
        str_time = '';
        str_sms = '';
        func = "showSMS(this," + "'" + v.detail[i].sCdkey + "','" + orderid + "');";
        if (v.detail[i].iFlag == 0) {
            str_state = '未使用';
            str_time = '<td>---</td>';
            str_sms = '<td><a href=\'javascript:void(0)\' onclick="' + func + '">发送到手机</a></td>';
        }
        else if (v.detail[i].iFlag == 1) {
            str_state = '已使用';
            str_time = '<td>' + v.detail[i].iOpTime + '使用</td>';
            str_sms = '<td><span class="c_tx2">发送到手机</span></td>';
        }
        else if (v.detail[i].iFlag == 2) {
            str_state = '已过期';
            str_time = '<td>---</td>';
            str_sms = '<td><span class="c_tx2">发送到手机</span></td>';
        }
        else if (v.detail[i].iFlag == 3) {
            str_state = '已退款';
            str_time = '<td>' + v.detail[i].iOpTime + '退款</td>';
            str_sms = '<td><span class="c_tx2">发送到手机</span></td>';
        }
        items.push('<tr><td>' + str_state + '</td><td>' + v.detail[i].sCdkey + '</td>' + str_sms + str_time + '</tr>')
    }
    c = items.join('');
    var strhtm = '\
  <!-- 浮出层 开始 -->\
   <table class="get7">\
    <colgroup>\
     <col class="colm1" />\
     <col class="colm2" />\
     <col class="colm3" />\
     <col class="colm4" />\
    </colgroup>\
    <thead>\
     <tr>\
      <th>状态</th>\
      <th>验证码</th>\
      <th>操作</th>\
      <th>时间</th>\
     </tr>\
    </thead>\
    <tbody>' + c + '\
    </tbody>\
   </table>\
   <div class="info_explain">\
    <h4 class="c_tx1">使用说明</h4>\
    <p>可手抄或下载团购凭证，在有效期内出示给商家，商家核对无误后即可享受至尊无敌折扣！</p>\
   </div>\
   <button type="button" class="btn_close" onclick="TUAN.MyOrders.hideTokens();">关闭</button>\
  <!-- 浮出层 结束 -->';
    $e('#pop_my_order_' + currentOrder).setHtml(strhtm);
    $e('#token_' + currentOrder).addClass('order_more_hover');
    loads[currentOrder] = 1;
}
function setPaipaiBooking(data) {
    if (data) {
        if (data.i_ret == 0) {
            switch (data.data[0]) {
                case 1:
                    showDiv('paipai_select');
                    bookPaipai();
                    break;
                case 0:
                    break;
                default:
                    break;
            }
        }
    }
    return false;
}
function htmlspecialchars(str) {
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#039;');
    return str;
}
if (JSON == undefined) {
    var JSON = {};
    (function () {
        "use strict";
        function f(n) {
            return n < 10 ? '0' + n : n;
        }

        if (typeof Date.prototype.toJSON !== 'function') {
            Date.prototype.toJSON = function (key) {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate()) + 'T' +
                    f(this.getUTCHours()) + ':' +
                    f(this.getUTCMinutes()) + ':' +
                    f(this.getUTCSeconds()) + 'Z' : null;
            };
            String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
        }
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\'}, rep;

        function quote(string) {
            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
        }

        function str(key, holder) {
            var i, k, v, length, mind = gap, partial, value = holder[key];
            if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }
            if (typeof rep === 'function') {
                value = rep.call(holder, key, value);
            }
            switch (typeof value) {
                case'string':
                    return quote(value);
                case'number':
                    return isFinite(value) ? String(value) : 'null';
                case'boolean':
                case'null':
                    return String(value);
                case'object':
                    if (!value) {
                        return'null';
                    }
                    gap += indent;
                    partial = [];
                    if (Object.prototype.toString.apply(value) === '[object Array]') {
                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null';
                        }
                        v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }
                    if (rep && typeof rep === 'object') {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            if (typeof rep[i] === 'string') {
                                k = rep[i];
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    } else {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    }
                    v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
            }
        }

        if (typeof JSON.stringify !== 'function') {
            JSON.stringify = function (value, replacer, space) {
                var i;
                gap = '';
                indent = '';
                if (typeof space === 'number') {
                    for (i = 0; i < space; i += 1) {
                        indent += ' ';
                    }
                } else if (typeof space === 'string') {
                    indent = space;
                }
                rep = replacer;
                if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                    throw new Error('JSON.stringify');
                }
                return str('', {'': value});
            };
        }
        if (typeof JSON.parse !== 'function') {
            JSON.parse = function (text, reviver) {
                var j;

                function walk(holder, key) {
                    var k, v, value = holder[key];
                    if (value && typeof value === 'object') {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }

                text = String(text);
                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function (a) {
                        return'\\u' +
                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                    });
                }
                if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                    j = eval('(' + text + ')');
                    return typeof reviver === 'function' ? walk({'': j}, '') : j;
                }
                throw new SyntaxError('JSON.parse');
            };
        }
    }());
}
QZFL.event.addEvent(window, "load", function () {
    if (QQVIP.userAgent.ie == 6) {
        document.execCommand("BackgroundImageCache", false, true);
    }
    if (typeof(Nav) != 'undefined')
        Nav.ini_nav();
    loadScript("http://pingjs.qq.com/tcss.ping.js", function () {
        if (typeof(isStopPgv) == "undefined" || isStopPgv == false) {
            if (typeof(pgvMain) == "function") {
                var src = getCookie(DEF_COMMON.VIP_CITY_TUAN_USERSOURCE_COOKIENAME);
                var url = getCookie(DEF_COMMON.VIP_CITY_TUAN_URL_COOKIENAME);
                if ((src != null) && (url != null)) {
                    pgvMain({virtualRefDomain: src, virtualRefURL: "/", virtualURL: url, statIframe: true, useCookie: "false", virtualDomain: "tuan.qq.com"});
                } else if ((src == null) && (url != null)) {
                    pgvMain({virtualURL: url, statIframe: false, virtualDomain: "tuan.qq.com"});
                } else if ((src != null) && (url == null)) {
                    pgvMain({virtualRefDomain: src, virtualRefURL: "/", statIframe: true, useCookie: "false", virtualDomain: "tuan.qq.com"});
                } else {
                    pgvMain({statIframe: false, virtualDomain: "tuan.qq.com"});
                }
            }
        }
    });
    if (window.location.hostname.indexOf('yz') == -1) {
        checkLogin();
    }
    loadScript_GBK("http://imgcache.qq.com/club/portal_new/bulletin.js", function () {
    });
});