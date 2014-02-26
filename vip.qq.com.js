try {
    document.domain = "qq.com";
} catch (e) {
}
;
QQVIP.Vip = QQVIP.Vip || {};
QQVIP.Vip.getQuery = function (key) {
    var currHref = location.href;
    var sValue = currHref.match(new RegExp("[\?&]" + key + "=([^&]*)(&?)", "i"));
    return sValue && String(sValue[1]) || '';
}
QQVIP.Vip.getUin = function () {
    var ptlogin_uin = QQVIP.cookie.get("uin");
    var client_uin = QQVIP.cookie.get("clientuin");
    if (ptlogin_uin == "" && client_uin == "") {
        return 0;
    }
    if (parseInt(client_uin) > 10000) {
        uin = parseInt(client_uin, 10);
    }
    else {
        if (ptlogin_uin.indexOf('o') == 0) {
            uin = parseInt(ptlogin_uin.substring(1, ptlogin_uin.length), 10);
        }
        else {
            uin = parseInt(ptlogin_uin, 10);
        }
    }
    return uin;
};
QQVIP.Vip.getXML = function (ds, sURL, urlp, cb, errcb, mtd) {
    var newUrl = "";
    if (urlp != null && urlp != "" && urlp != '')newUrl = sURL + "?" + urlp; else newUrl = sURL;
    var req = new QZFL.XHR(newUrl, ds);
    req.onSuccess = function (o) {
        cb(o.xmlDom);
    };
    req.onError = errcb;
    req.send();
};
QQVIP.Vip.getTEXT = function (ds, sURL, urlp, cb, errcb, mtd) {
    var newUrl = "";
    if (urlp != null && urlp != "" && urlp != '')newUrl = sURL + "?" + urlp; else newUrl = sURL;
    var req = new QZFL.XHR(newUrl, ds);
    req.onSuccess = function (o) {
        cb(o.text);
    };
    req.onError = errcb;
    req.send();
};
QQVIP.Vip.get_xml_node_value = function (xdoc, s, i) {
    if (s == null || s == "") {
        return'';
    }
    if (xdoc.documentElement.getElementsByTagName(s)[0].firstChild == null) {
        return'';
    }
    else {
        if (xdoc.documentElement.getElementsByTagName(s).length > 1 && parseInt(i)) {
            return xdoc.documentElement.getElementsByTagName(s)[i].firstChild.data
        }
        else {
            return xdoc.documentElement.getElementsByTagName(s)[0].firstChild.data;
        }
    }
};
QQVIP.Vip.pv = function () {
    try {
        if (typeof(pgvMain) == 'function')
            pgvMain("pathtrace", {pathStart: true, tagParamName: "ADTAG", useRefUrl: true, override: true, careSameDomainRef: false});
    }
    catch (e) {
    }
};
QQVIP.Vip.addToken = function (src) {
    var token = QQVIP.security.getAntiCSRFToken();
    var srcSearch = src.match(/\?[\w&\.-=,\|%]*/);
    if (src.indexOf('g_tk') == -1) {
        if (srcSearch && typeof srcSearch == 'object' && srcSearch.length > 0) {
            search = srcSearch[0] + "&g_tk=" + token;
            src = src.replace(/\?[\w&\.-=,\|%]*/, search);
        } else {
            src = src + "?g_tk=" + token;
        }
    }
    return src;
};
QQVIP.Vip.loadScript = function (src, cb, errcb) {
    var src_ori = src;
    if (src.indexOf('g_tk=') == -1 && src.indexOf('.php') > 0) {
        if (typeof QQVIP.security == 'undefined' || typeof QQVIP.security.getAntiCSRFToken != 'function') {
            var qqviplib = new QZFL.JsLoader();
            qqviplib.load("http://imgcache.qq.com/ac/club/qqvip/v2.0/qqviplib_2.0.0.js?ver=2011");
            qqviplib.onload = function () {
                src = QQVIP.Vip.addToken(src);
                var j = new QZFL.JsLoader();
                var startTime = new Date();
                j.load(src);
                var endTime;
                j.onload = function () {
                    endTime = new Date();
                    reportCode(1, startTime, endTime);
                    if (!!cb) {
                        cb();
                    }
                }
                j.onerror = function () {
                    endTime = new Date();
                    reportCode(2, startTime, endTime);
                    if (!!errcb) {
                        errcb();
                    }
                }
            };
            return true;
        } else {
            src = QQVIP.Vip.addToken(src);
        }
    }
    var j = new QZFL.JsLoader();
    var startTime = new Date();
    j.load(src);
    var endTime;
    j.onload = function () {
        endTime = new Date();
        if (src.indexOf('.php') > 0) {
            reportCode(1, startTime, endTime);
        }
        if (!!cb) {
            cb();
        }
    }
    j.onerror = function () {
        endTime = new Date();
        if (src.indexOf('.php') > 0) {
            reportCode(2, startTime, endTime);
        }
        if (!!errcb) {
            errcb();
        }
    }
    function reportCode(type, startTime, endTime) {
        if (/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/.test(src_ori)) {
            if (Math.random() < 1 / 10) {
                var report = new Image();
                report.src = 'http://c.isdspeed.qq.com/code.cgi'
                    + '?domain=' + encodeURIComponent(RegExp.$4 || '')
                    + '&cgi=' + encodeURIComponent((RegExp.$5 || ''))
                    + '&type=' + type
                    + '&code=0'
                    + '&time=' + (endTime - startTime)
                    + '&rate=10'
                    + '&uin=0';
            }
        }
    }
};
QQVIP.Vip.call_error = function () {
};
var isIE = navigator.userAgent.indexOf("MSIE") != -1;
if (isIE) {
    try {
        document.execCommand("BackgroundImageCache", false, true);
    }
    catch (e) {
    }
}
;
var mobile_YD = "10661700";
var mobile_LT = "10661700";
var mobile_LT_FJ = "10621700";
$ = $O = $O_1 = QQVIP.dom.getById;
$s = $show_1 = $show = function (o) {
    QQVIP.dom.setStyle(o, "display", "");
};
$h = $hide_1 = $hide = function (o) {
    QQVIP.dom.setStyle(o, "display", "none");
};
tweb_get_cookie = QQVIP.cookie.get;
tweb_set_cookie = QQVIP.cookie.set;
vipgetUin = QQVIP.Vip.getUin;
loadScript = QQVIP.Vip.loadScript;
call_error = QQVIP.Vip.call_error;
pv = QQVIP.Vip.pv;
get_xml_node_value = QQVIP.Vip.get_xml_node_value;
getXML = QQVIP.Vip.getXML;
getTEXT = QQVIP.Vip.getTEXT;
QQVIP.Vip.AidEngine = function () {
    _add_stat = function (url1, url2, url_pars) {
        document.onclick = function (ev) {
            var e = window.event || ev;
            var element = e.srcElement || e.target;
            try {
                while (element.tagName != 'A') {
                    element = element.parentNode;
                }
            }
            catch (e) {
                return;
            }
            if (element.tagName == 'A') {
                if (element.href.indexOf(url1) == 0 || element.href.indexOf(url2) == 0) {
                    if (element.href == 'http://pay.qq.com/qqvip/' || element.href == 'http://paycenter.qq.com/club/')element.href = 'http://pay.qq.com/qqvip/index.shtml';
                    var ret = element.href;
                    ret = ret.replace('http://paycenter.qq.com/club/index_send.html', 'http://pay.qq.com/qqvip/index.shtml?ch=send&');
                    ret = ret.replace('http://paycenter.qq.com/club/index_ask.html', 'http://pay.qq.com/qqvip/index.shtml?ch=ask&');
                    ret = ret.replace('paycenter.qq.com/club', 'pay.qq.com/qqvip');
                    ret = ret.replace('pay.qq.com/qqvip/?', 'pay.qq.com/qqvip/index.shtml?');
                    element.href = ret;
                    var url = 'http://pay.qq.com/';
                    for (var stat_k in url_pars) {
                        var stat_v = url_pars[stat_k];
                        var sTag = element.getAttribute("sTag");
                        if (stat_k == "aid" && sTag != undefined) {
                            stat_v = stat_v.replace(/clubopen$/, sTag);
                        }
                        var linkAid = element.getAttribute("aid");
                        if (stat_k == "aid" && linkAid != undefined) {
                            stat_v = linkAid;
                        }
                        var rex_1 = new RegExp("(" + url + "{1}.*)", "gim");
                        var rex_2 = new RegExp(stat_k + "=[^&]*(&amp;)*&*", "gim");
                        ret = (element.href).replace(rex_1, function ($1) {
                            var t_s = $1.replace(rex_2, "");
                            var last_c = t_s.charAt(t_s.length - 1);
                            if (last_c == '?' || last_c == '&') {
                                t_s += stat_k + "=" + stat_v
                            } else {
                                if (t_s.indexOf("?") == -1) {
                                    t_s += "?" + stat_k + "=" + stat_v;
                                } else {
                                    t_s += "&" + stat_k + "=" + stat_v;
                                }
                            }
                            return(t_s);
                        });
                        element.href = ret;
                        if (element.className.indexOf("bt_bevip") >= 0) {
                            var actUrlArray = {"game.vip.qq.com": 0, "youxi.vip.qq.com": 2};
                            if (location.hostname in actUrlArray) {
                                if (typeof AID != 'undefined') {
                                    AID.openWindow();
                                }
                                return false;
                            }
                        }
                    }
                }
            }
        };
    };
    _init = function () {
        if (AID.config().sTeam == null) {
            AID.config({sTeam: 'pingtai', sSite: 'vipsite', sPage: null, sTag: null, sPayPars: null});
        }
        var sList = {"/freedom/freedom_graphic_font.html": {"sTeam": "gongneng", "sPage": "xuancaizi"}, "/freedom/freedom_dressup.html": {"sTeam": "gongneng", "sPage": "zhuangban"}, "/freedom/freedom_magic.html": {"sTeam": "gongneng", "sPage": "magic"}, "/freedom/freedom_face.html": {"sTeam": "gongneng", "sPage": "face"}, "/freedom/freedom_ring.html": {"sTeam": "gongneng", "sPage": "ring"}, "/freedom/freedom_face_draw.html": {"sTeam": "gongneng", "sPage": "tuya"}, "/freedom/freedom_moveface.html": {"sTeam": "gongneng", "sPage": "moveface"}, "/freedom/freedom_ecard.html": {"sTeam": "gongneng"}, "/freedom/freedom_full_icon.html": {"sTeam": "gongneng"}, "/freedom/freedom_red.html": {"sTeam": "gongneng"}, "/freedom/freedom_paiming.html": {"sTeam": "gongneng"}, "/freedom/freedom_vipgrade.html": {"sTeam": "gongneng"}, "/freedom/freedom_coupon.html": {"sTeam": "gongneng"}, "/freedom/freedom_bank.html": {"sTeam": "gongneng"}, "/freedom/freedom_login.html": {"sTeam": "gongneng"}, "/freedom/freedom_skinad.html": {"sTeam": "gongneng"}, "/freedom/freedom_phone.html": {"sTeam": "gongneng"}, "/freedom/freedom_webservice.html": {"sTeam": "gongneng"}, "/freedom/freedom_miyou.html": {"sTeam": "gongneng"}, "/freedom/freedom_k.html": {"sTeam": "gongneng"}, "/freedom/freedom_group.html": {"sTeam": "gongneng", "sPage": "group"}, "/freedom/freedom_vip_group.html": {"sTeam": "gongneng"}, "/freedom/freedom_super_group.html": {"sTeam": "gongneng"}, "/freedom/freedom_online_storage.html": {"sTeam": "gongneng"}, "/freedom/freedom_photo.html": {"sTeam": "gongneng"}, "/freedom/freedom_shensu.html": {"sTeam": "gongneng"}, "/freedom/freedom_super_pw.html": {"sTeam": "gongneng"}, "/freedom/freedom_reps_massage.html": {"sTeam": "gongneng"}, "/freedom/freedom_repasswoard.html": {"sTeam": "gongneng"}, "/freedom/freedom_recover.html": {"sTeam": "gongneng"}, "/freedom/freedom_copy_group.html": {"sTeam": "gongneng", "sPage": "groupclone"}, "/freedom/freedom_face_move.html": {"sTeam": "gongneng", "sPage": "biaoqingmanyou"}, "/freedom/freedom_chatmsg.html": {"sTeam": "gongneng", "sPage": "liaotian"}, "/freedom/freedom_file_off.html": {"sTeam": "gongneng"}, "/freedom/freedom_bwl.html": {"sTeam": "gongneng"}, "/freedom/freedom_upload_chat.html": {"sTeam": "gongneng", "sPage": "liaotianjilushangchuan"}, "/freedom/freedom_clone.html": {"sTeam": "gongneng", "sPage": "friendclone"}, "/freedom/freedom_mobi_face.html": {"sTeam": "gongneng"}, "/freedom/freedom_mobi_ring.html": {"sTeam": "gongneng"}, "/freedom/freedom_mobi_memo.html": {"sTeam": "gongneng", "sPage": "mobilenote"}, "/freedom/freedom_sms.html": {"sTeam": "gongneng"}, "/freedom/freedom_sms_friend.html": {"sTeam": "gongneng"}, "/freedom/freedom_online.html": {"sTeam": "gongneng"}, "/freedom/freedom_offline.html": {"sTeam": "gongneng"}, "/freedom/freedom_vipmail.html": {"sTeam": "gongneng"}, "/freedom/freedom_mail.html": {"sTeam": "gongneng"}, "/freedom/freedom_mail_file.html": {"sTeam": "gongneng"}, "/game.html": {"sTeam": "youxi", "sPage": "index"}, "/game_sub/game_grade.html": {"sTeam": "youxi", "sPage": "jieshao"}, "/game_sub/game_act.html": {"sTeam": "youxi", "sPage": "actlist"}, "/freedom/freedom_info_dressup.html": {"sTeam": "gongneng", "sPage": "vip_freedom_freedom_ziliaokazhuangban_html"}};
        var sListConfig = sList[location.pathname];
        if (typeof sListConfig != 'undefined') {
            AID.config(sListConfig);
        }
        var AID_P = AID.getId();
        var url_pars = {'aid': AID_P};
        _add_stat("http://paycenter.qq.com/", "http://pay.qq.com/", url_pars);
    };
    return{init: _init};
};
(function () {
    function init() {
        setTimeout(function () {
            try {
                var aid = QQVIP.Vip.AidEngine();
                aid.init();
            }
            catch (e) {
            }
        }, 1000)
    }

    if (location.pathname != '/qq.html' && location.pathname != '/qq' && location.pathname != '/qq/' && location.pathname != '/index.html' && location.pathname != '/') {
        if (!!window.attachEvent) {
            window.attachEvent('onload', init);
        } else {
            window.addEventListener('load', init, false);
        }
    }
})();
var QZFL = QZFL || {};
QZFL.shareObject = {};
QZFL.shareObject.instance = null;
QZFL.shareObject.requiredTimeout = 100;
QZFL.shareObject.requiredCount = 0;
QZFL.shareObject.requiredAll = 30;
QZFL.shareObject.trySaveCount = 0;
function shareObjectflashCallback() {
    if (!QZFL.shareObject.instance.ready) {
        if ((QZFL.shareObject.requiredCount++) > QZFL.shareObject.requiredAll) {
            (QZFL.shareObject.instance.error)();
        }
        setTimeout(arguments.callee, QZFL.shareObject.requiredTimeout);
    }
    else {
        (QZFL.shareObject.instance.ready)();
    }
}
QZFL.shareObject.creat = function () {
    var _swf = null;
    var _verson = null;
    var _db = 'localdata';
    var _path = "/";
    var _src = "http://vip.qq.com/shareObject/shareObject.swf";
    _get_swf = function () {
        var n = document.createElement("div");
        document.body.appendChild(n);
        n.style.position = "absolute";
        n.style.top = "-100px";
        n.style.left = "-100px";
        n.innerHTML = '<object id="swf_shareObj" height="1px" width="1px" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name="Movie" value="' + _src + '"/><param name="Src" value="' + _src + '"/><param name="AllowScriptAccess" value="always"/><param name="menu" value="false"/><embed name="swf_shareObj" src="' + _src + '" height="1px" allowscriptaccess="always" width="1px" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed></object>';
        var ie = navigator.appName.indexOf("Microsoft") != -1;
        return _swf = (ie) ? window['swf_shareObj'] : document['swf_shareObj'];
    };
    _clear = function () {
        if (_swf && _db) {
            var ret = _swf.clear_data(_db, _path);
            if (ret < 0) {
                return false;
            }
            return true;
        }
    };
    _save = function (k, v) {
        if (_swf && _db) {
            var ret = _swf.save_data(k, v, _db, _path);
            if (ret < 0) {
                if (ret == -1002) {
                    ret = _swf.clear_data(_db, _path);
                    if (ret < 0) {
                        return false;
                    }
                    else {
                        if (++QZFL.shareObject.trySaveCount > 1) {
                            return false;
                        }
                        return arguments.callee(k, v);
                    }
                    return false;
                }
                return false;
            }
            QZFL.shareObject.trySaveCount = 0;
            return true;
        }
    };
    _get = function (k) {
        if (_swf && _db) {
            var ret = _swf.get_data(k, _db, _path);
            if (ret && ret != "null") {
                return ret;
            }
            return'';
        }
    };
    _get_verson = function () {
        if (!_verson) {
            var f = 6, n = navigator, w = window, undef = "undefined", mime = "application/x-shockwave-flash";
            if (w.ActiveXObject) {
                try {
                    var fl = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                    if (fl) {
                        var f = fl.GetVariable("$version");
                        if (f) {
                            f = (f.split(" ")[1].split(","))[0];
                        }
                    }
                }
                catch (e) {
                }
            }
            else if (typeof n.plugins != undef && typeof n.plugins["Shockwave Flash"] == "object") {
                try {
                    var d = n.plugins["Shockwave Flash"].description;
                    if (d && !(typeof n.mimeTypes != undef && n.mimeTypes[mime] && !n.mimeTypes[mime].enabledPlugin)) {
                        d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                        f = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
                    }
                }
                catch (e) {
                }
            }
            _verson = f;
        }
        return _verson;
    };
    _set_db = function (db) {
        if (_swf) {
            _db = db;
            return true;
        }
        return false;
    };
    _set_path = function (path) {
        if (_swf) {
            _path = path;
            return true;
        }
        return false;
    };
    QZFL.shareObject.instance = {set_db: _set_db, set_path: _set_path, save_data: _save, get_data: _get, clear_data: _clear, ready: false, error: function () {
    }};
    return _init = (function () {
        if (_get_verson() >= 8) {
            if (_get_swf()) {
                return QZFL.shareObject.instance;
            }
            else {
                return false;
            }
        }
        else {
            return false
        }
    })();
};
QQVIP.Vip.userInfo = function () {
    var u = this;
    if (QQVIP.Vip.getUin() != 0) {
        u.nick_name = u.face_url = u.is_club = u.grow_value = u.level = u.is_year_club = u.is_mobile_club = u.bank_pay = u.add_step = u.dec_step = u.last_pay_way = u.pay_way = u.pay_way_name = u.club_end_time = u.next_grade_time = u.pre_grade_time = u.to_next_grade_time = u.year_begin_time = u.year_end_time = u.user_type = u.mobile_pay_way = u.mobile_pay_way_name = false;
        u.f_nick_name = u.f_face_url = u.f_is_club = u.f_grow_value = u.f_level = u.f_is_year_club = u.f_is_mobile_club = u.f_bank_pay = u.f_add_step = u.f_dec_step = u.f_last_pay_way = u.f_pay_way = u.f_pay_way_name = u.f_club_end_time = u.f_next_grade_time = u.f_pre_grade_time = u.f_to_next_grade_time = u.f_year_begin_time = u.f_year_end_time = u.f_user_type = u.f_mobile_pay_way = u.f_mobile_pay_way_name = false;
        u.getSuccess = QQVIP.emptyFn;
        u.notLogin = QQVIP.emptyFn;
        QQVIP.Vip.userInfo.instance = u;
    }
    return u
};
QQVIP.Vip.userInfo.instance = false;
QQVIP.Vip.userInfo.prototype.get = function (arg, fuin, argf) {
    var q_s = '';
    if (typeof(arg) == "object" && arg.length > 0) {
        arg = arg.sort();
        q_s = 'data=';
        for (var k in arg) {
            q_s += arg[k] + ',';
        }
        q_s = q_s.substr(0, q_s.length - 1);
    }
    if (fuin && typeof(argf) == "object" && argf.length > 0) {
        argf = argf.sort();
        q_s += '&f_uin=' + fuin + '&f_data=';
        for (var k in argf) {
            q_s += argf[k] + ',';
        }
        q_s = q_s.substr(0, q_s.length - 1);
    }
    if (q_s != '') {
        var j = new QZFL.JsLoader();
        j.onload = QQVIP.emptyFn;
        j.onerror = function () {
        };
        j.load("http://vipfunc.qq.com/common/user.php?callback=QQVIP.Vip.userInfo.setInfo&" + q_s);
    }
};
QQVIP.Vip.userInfo.setInfo = function (o) {
    if (o[0].is_login == 0) {
        try {
            QQVIP.Vip.userInfo.instance.notLogin();
        }
        catch (e) {
        }
    }
    else {
        for (var k in o[0]) {
            if (typeof(QQVIP.Vip.userInfo.instance[k]) != "undefined") {
                QQVIP.Vip.userInfo.instance[k] = o[0][k];
            }
        }
        for (var k in o[1]) {
            if (typeof(QQVIP.Vip.userInfo.instance['f_' + k]) != "undefined") {
                QQVIP.Vip.userInfo.instance['f_' + k] = o[1][k];
            }
        }
        try {
            QQVIP.Vip.userInfo.instance.getSuccess();
        }
        catch (e) {
        }
    }
}
QQVIP.Vip.userInfo.debug = function (o) {
};
(function () {
    jWidget = {version: '1.0.0', each: function (array, fn) {
        if (typeof array.length == "undefined" || typeof array == "string") {
            array = [array];
        }
        for (var i = 0, len = array.length; i < len; i++) {
            if (fn.call(array[i], array[i], i, array) === false) {
                return i;
            }
            ;
        }
    }, extend: QZFL.object.extend};
    jWidget.dom = QZFL.dom;
    jWidget.extend(QZFL.dom, {hasClass: QZFL.css.hasClassName, addClass: QZFL.css.addClassName, removeClass: QZFL.css.removeClassName});
    jWidget.dom.getChildren = function (el) {
        var _arr = [];
        var el = jWidget.dom.getFirstChild(el);
        while (el) {
            if (!!el && el.nodeType == 1) {
                _arr.push(el);
            }
            el = el.nextSibling;
        }
        return _arr;
    }
    jWidget.Tween = QZFL.Tween;
    jWidget.ui = jWidget.ui || {};
})();
;
(function () {
    var $ = jWidget, $D = $.dom;
    _Slide = function (conf) {
        conf = conf || {};
        this.eventType = conf.eventType || 'mouseover', this.autoPlayInterval = conf.autoPlayInterval || 3 * 1000;
        this._play = true;
        this._timer = null;
        this._fadeTimer = null;
        this._container = $D.get(conf.container);
        this._panelWrapper = $D.get(conf.panelWrapper) || $D.getFirstChild(this._container);
        this._sliders = $D.getChildren(this._panelWrapper);
        this._navWrapper = $D.get(conf.navWrapper) || $D.getNextSibling(this._panelWrapper) || null;
        this._navs = (this._navWrapper && $D.getChildren(this._navWrapper)) || null;
        this._effect = conf.effect || 'scrollx';
        this._panelSize = (this._effect.indexOf("scrolly") == -1 ? conf.width : conf.height) || $D.getSize($D.getFirstChild(this._panelWrapper))[this._effect.indexOf("scrolly") == -1 ? 0 : 1];
        this._count = conf.count || $D.getChildren(this._panelWrapper).length;
        this._navClassOn = conf.navClassOn || "on";
        this._sliderTitle = conf.sliderTitle || "slidertitle";
        this._target = 0;
        this._changeProperty = this._effect.indexOf("scrolly") == -1 ? "left" : "top";
        this.curIndex = conf.curIndex || 0;
        this.step = this._effect.indexOf("scroll") == -1 ? 1 : (conf.Step || 5);
        this.slideTime = conf.slideTime || 10;
        this.init();
        this.run(true);
    }
    _Slide.prototype = {init: function () {
        $D.setStyle(this._container, "overflow", "hidden");
        $D.setStyle(this._container, "position", "relative");
        $D.setStyle(this._panelWrapper, "position", "relative");
        if (this._effect.indexOf("scrolly") == -1) {
            $D.setStyle(this._panelWrapper, "width", this._count * (this._panelSize + 200) + "px");
            $.each(this._sliders, function (el) {
                el.style.styleFloat = el.style.cssFloat = "left";
            })
        }
        if (this._navs) {
            var _this = this;
            if (_this.eventType == 'click') {
                $.each(this._navs, function (el, i) {
                    el.onclick = (function (_this) {
                        return function () {
                            $D.addClass(el, _this._navClassOn);
                            _this._play = false;
                            _this.curIndex = i;
                            _this._play = true;
                            _this.run();
                        }
                    })(_this)
                })
            } else {
                $.each(this._navs, function (el, i) {
                    el.onmouseover = (function (_this) {
                        return function () {
                            $D.addClass(el, _this._navClassOn);
                            _this._play = false;
                            _this.curIndex = i;
                            _this.run();
                        }
                    })(_this)
                    el.onmouseout = (function (_this) {
                        return function () {
                            $D.removeClass(el, _this._navClassOn);
                            _this._play = true;
                            _this.run(false, true);
                        }
                    })(_this)
                })
            }
        }
    }, run: function (isInit, noFade) {
        if (this.curIndex < 0) {
            this.curIndex = this._count - 1;
        } else if (this.curIndex >= this._count) {
            this.curIndex = 0;
        }
        try {
            var slider_title = document.getElementById(this._sliderTitle);
            slider_title.innerHTML = $D.getChildren($D.getFirstChild(this._container))[this.curIndex].title;
        } catch (e) {
        }
        ;
        this._target = -1 * this._panelSize * this.curIndex;
        var _this = this;
        if (this._navs) {
            $.each(this._navs, function (el, i) {
                _this.curIndex == (i) ? $D.addClass(el, _this._navClassOn) : $D.removeClass(el, _this._navClassOn);
            })
        }
        this.scroll();
        if (this._effect.indexOf("fade") >= 0 && !noFade) {
            $D.setStyle(this._panelWrapper, "opacity", isInit ? 0.5 : 0.1);
            this.fade();
        }
    }, scroll: function () {
        clearTimeout(this._timer);
        var _this = this, _cur_property = parseInt(this._panelWrapper.style[this._changeProperty]) || 0, _distance = (this._target - _cur_property) / this.step;
        if (Math.abs(_distance) < 1 && _distance != 0) {
            _distance = _distance > 0 ? 1 : -1;
        }
        if (_distance != 0) {
            this._panelWrapper.style[this._changeProperty] = (_cur_property + _distance) + "px";
            this._timer = setTimeout(function () {
                _this.scroll();
            }, this.slideTime);
        } else {
            this._panelWrapper.style[this._changeProperty] = this._target + "px";
            if (this._play) {
                this._timer = setTimeout(function () {
                    _this.curIndex++;
                    _this.run();
                }, this.autoPlayInterval);
            }
        }
    }, fade: function () {
        var _opacity = $D.getStyle(this._panelWrapper, "opacity");
        var _this = this;
        if (_opacity < 1) {
            $D.setStyle(this._panelWrapper, "opacity", parseFloat(_opacity) + 0.02);
            setTimeout(function () {
                _this.fade();
            }, 1);
        }
    }}
    jWidget.ui.SlideView = function (el, conf) {
        conf = conf || {};
        conf.container = el;
        return new _Slide(conf);
    }
})();
;
(function () {
    var $ = jWidget, $D = $.dom;
    _Tab = function (conf) {
        this.eventType = conf.eventType || 'mouseover', this._container = conf.container;
        this._type = conf.type || "normal";
        this._navClassOn = conf.navClassOn || "on";
        var _this = this;
        if (this._type == "list") {
            var cons = $D.getChildren(this._container);
            this._panels = [];
            this._navs = [];
            $.each(cons, function (el, i) {
                if (i % 2) {
                    _this._panels.push(el);
                } else {
                    _this._navs.push(el);
                }
            })
        } else {
            this._navWrapper = $D.get(conf.navWrapper) || $D.getFirstChild(this._container);
            this._navs = $D.getChildren(this._navWrapper);
            this._panelWrapper = $D.get(conf.panelWrapper) || $D.getNextSibling(this._navWrapper);
            this._panels = $D.getChildren(this._panelWrapper);
        }
        this.curIndex = 0;
        $.each(this._panels, function (el, i) {
            if (el.style.display != "none") {
                _this.curIndex = i;
            }
        })
        this._panels[this.curIndex].style.display = '';
        this._panels[this.curIndex].style.display = '';
        $D.removeClass(this._navs[this.curIndex], this._navClassOn);
        $D.addClass(this._navs[this.curIndex], this._navClassOn);
        $.each(this._navs, function (el, i) {
            el['on' + _this.eventType] = (function (_this) {
                return function () {
                    $D.removeClass(_this._navs[_this.curIndex], _this._navClassOn);
                    _this._panels[_this.curIndex].style.display = 'none';
                    _this.curIndex = i;
                    $D.addClass(el, _this._navClassOn);
                    _this._panels[_this.curIndex].style.display = '';
                    try {
                        QZFL.lazyLoad.loadHideImg(_this._panels[_this.curIndex])
                    } catch (e) {
                    }
                }
            })(_this)
        })
    }
    jWidget.ui.TabView = function (el, conf) {
        conf = conf || {};
        conf.container = $D.get(el);
        return new _Tab(conf);
    }
})();
jWidget.ui.Pager = function (id, conf) {
    if (!id)return;
    this.container = document.getElementById(id);
    this.offset = conf.offset || 2;
    this.step = this.offset + 2;
    this.pageNum = conf.pageNum;
    this.callback = conf.callback || function () {
    };
    this.currentTpl = conf.currentTpl || '<a class="num on"><span>{num}</span></a>';
    this.anchor = conf.anchor;
    this.normalTpl = conf.normalTpl || '<a class="num" href="' + (this.anchor ? '#' + this.anchor : 'javascript:;') + '" onclick="pager.go({num})"><span>{num}</span></a>';
    this.omitTpl = conf.omitTpl || '<span class="omit">...</span>';
    this.firstTpl = conf.firstTpl || '';
    this.lastTpl = conf.lastTpl || '';
    this.preTpl = conf.preTpl || '<a href="' + (this.anchor ? '#' + this.anchor : 'javascript:;') + '" onclick="pager.go({num})"><span class="before_page">��һҳ</span></a>';
    this.nextTpl = conf.nextTpl || '<a href="' + (this.anchor ? '#' + this.anchor : 'javascript:;') + '" onclick="pager.go({num})"><span class="next_page">��һҳ</span></a>';
    this.preDisableTpl = conf.preDisableTpl || '<a href="' + (this.anchor ? '#' + this.anchor : 'javascript:;') + '"><span class="before_page">��һҳ</span></a>';
    this.nextDisableTpl = conf.nextDisableTpl || '<a href="' + (this.anchor ? '#' + this.anchor : 'javascript:;') + '"><span class="next_page">��һҳ</span></a>';
    this.show(1);
}
jWidget.ui.Pager.prototype.go = function (curNum) {
    try {
        this.callback(curNum);
    } catch (e) {
    }
    this.show(curNum);
}
jWidget.ui.Pager.prototype.show = function (curNum) {
    if (curNum < 1 || curNum > this.pageNum) {
        return false;
    }
    var lLack = 0, rLack = 0;
    if (curNum - 2 < this.step) {
        lLack = this.step - (curNum - 1);
    }
    if (this.pageNum - curNum - 1 < this.step) {
        rLack = this.step - (this.pageNum - curNum);
    }
    var le = curNum - this.offset - rLack;
    var re = curNum + this.offset + lLack;
    var str = [];
    str.push(this.firstTpl);
    if (curNum > 1) {
        var s = this.preTpl.replace('{num}', curNum - 1);
        str.push(s);
    } else {
        str.push(this.preDisableTpl);
    }
    if (le > 1) {
        str.push(this.normalTpl.replace(/{num}/g, 1));
    }
    if (le == 3) {
        str.push(this.normalTpl.replace(/{num}/g, 2));
    } else if (le > 3) {
        str.push(this.omitTpl);
    }
    for (var j = curNum, i = le; i < j; i++) {
        if (i < 1) {
            continue;
        }
        str.push(this.normalTpl.replace(/{num}/g, i));
    }
    str.push(this.currentTpl.replace(/{num}/g, curNum));
    for (var i = curNum + 1, j = re + 1; i < j; i++) {
        if (i > this.pageNum) {
            break;
        }
        str.push(this.normalTpl.replace(/{num}/g, i));
    }
    if (re == this.pageNum - 2) {
        str.push(this.normalTpl.replace(/{num}/g, this.pageNum - 1));
    } else if (re < this.pageNum - 2) {
        str.push(this.omitTpl);
    }
    if (re < this.pageNum) {
        str.push(this.normalTpl.replace(/{num}/g, this.pageNum));
    }
    if (curNum < this.pageNum) {
        var s = this.nextTpl.replace('{num}', curNum + 1);
        str.push(s);
    } else {
        str.push(this.nextDisableTpl);
    }
    str.push(this.lastTpl.replace(/{num}/g, this.pageNum));
    this.container.innerHTML = str.join('');
    return true;
};
(function () {
    function merge(first, second) {
        var i = first.length, j = 0;
        if (typeof second.length === "number") {
            for (var l = second.length; j < l; j++) {
                first[i++] = second[j];
            }
        } else {
            while (second[j] !== undefined) {
                first[i++] = second[j++];
            }
        }
        first.length = i;
        return first;
    };
    function append(element, html) {
        var dialogElement = document.createElement('div');
        dialogElement.innerHTML = html;
        var elems = [];
        elems = merge(elems, dialogElement.childNodes);
        var length = elems.length;
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < length; i++) {
            fragment.appendChild(elems[i]);
        }
        element.appendChild(fragment);
    }

    var dialogId = 0;
    var pop_mask = false;
    jWidget.ui.Dialog = function (conf) {
        conf = conf || {};
        this.dialogId = dialogId++;
        var thisDialog = this;
        this.option = {};
        this.option.autoOpen = conf.autoOpen || true;
        this.option.headerTpl = conf.headerTpl || '<div class="mod_pop_gd_hd"><h3>{title}</h3><button type="button" title="�رյ�����" id="{closeId}">�ر�</button></div>';
        this.option.contentTpl = conf.contentTpl || '{content}';
        this.option.footerTpl = conf.footerTpl || '<div class="mod_pop_gd_ft">{footer}</div>';
        this.option.tpl = conf.tpl || '<div class="mod_pop_gd_v3" id="{id}" style="{style}"><div class="mod_pop_wrap">{headerTpl}<div class="mod_pop_gd_bd">{contentTpl}</div>{footerTpl}</div></div>';
        this.option.title = conf.title || "��ܰ��ʾ";
        this.option.content = conf.content || "";
        this.option.style = conf.style ? conf.style : null;
        this.option.modal = typeof conf.modal != 'undefined' ? conf.modal : false;
        this.option.buttons = typeof conf.buttons != 'undefined' ? conf.buttons : null;
        this.option.center = typeof conf.center != 'undefined' ? conf.center : true;
        this.option.buttons_style = typeof conf.buttons_style != 'undefined' ? conf.buttons_style : [];
        if (typeof conf.onclose == 'function') {
            this.onclose = conf.onclose;
        }
        function create(me) {
            var html = me.option.tpl;
            var closeId = "qqvip_ui_dialog_close_" + dialogId;
            var header = me.option.headerTpl.replace("{title}", me.option.title).replace("{closeId}", closeId);
            var content = me.option.contentTpl.replace("{content}", me.option.content);
            var footer = "";
            var buttons = null;
            var j = 0;
            var buttonPre = "qqvip_ui_dialog_buttons_" + dialogId + "_";
            var buttonId = "", buttonClass = '';
            if (me.option.buttons) {
                for (var name in me.option.buttons) {
                    buttonId = buttonPre + j;
                    if (typeof me.option.buttons_style[j] != 'undefined') {
                        buttonClass = me.option.buttons_style[j];
                    } else {
                        buttonClass = "mod_pop_btn1";
                    }
                    footer += '<a href="javascript:void(0)" target ="_self" class="' + buttonClass + '" id="' + buttonId + '"><span>' + name + '</span></a>';
                    j++;
                }
                if (footer != "") {
                    footer = me.option.footerTpl.replace("{footer}", footer);
                }
            }
            var style = "";
            var styleArr = [];
            if (me.option.style) {
                for (var i in me.option.style) {
                    styleArr.push(i + ":" + me.option.style[i]);
                }
                style = styleArr.join(";");
            }
            var id = me.getId();
            html = html.replace("{headerTpl}", header).replace("{contentTpl}", content).replace("{footerTpl}", footer).replace("{style}", style).replace("{id}", id);
            if (me.option.modal == true && pop_mask == false) {
                html += '<div class="mod_pop_mask" id="qqvip_ui_dialog_pop_mask"></div>';
                pop_mask = true;
            }
            append(document.body, html);
            $e("#" + closeId).bind("click", function () {
                if (typeof me.onclose == 'function') {
                    if (me.onclose.call(me)) {
                        me.hide();
                    }
                } else {
                    me.hide();
                }
            });
            j = 0;
            for (var name in me.option.buttons) {
                buttonId = buttonPre + j;
                var result = {};
                result[buttonId] = function (key) {
                    return function () {
                        if (typeof me.option.buttons[key] == 'function') {
                            me.option.buttons[key].call(me);
                        }
                    };
                }(name);
                $e("#" + buttonId).bind("click", result[buttonId]);
                j++;
            }
        }

        create(this);
        if (this.option.autoOpen) {
            this.open();
        }
    };
    jWidget.ui.Dialog.prototype = {getId: function () {
        var dialogIdPre = "qqvip_ui_dialog_";
        return dialogIdPre + this.dialogId;
    }, open: function () {
        var dialogDivId = this.getId();
        if (this.option.center) {
            this.center();
        }
        if (this.option.modal == true && pop_mask == true) {
            this.popMaskShow();
        }
        $e("#" + dialogDivId).show();
    }, popMaskShow: function () {
        $e("#qqvip_ui_dialog_pop_mask").setStyle("height", QQVIP.dom.getScrollHeight());
        $e("#qqvip_ui_dialog_pop_mask").setStyle("width", QQVIP.dom.getScrollWidth());
        $e("#qqvip_ui_dialog_pop_mask").show();
    }, hide: function () {
        var dialogDivId = this.getId();
        $e("#" + dialogDivId).hide();
        $e("#qqvip_ui_dialog_pop_mask").hide();
    }, destroy: function () {
        var dialogDivId = this.getId();
        $e("#" + dialogDivId).remove();
        pop_mask = false;
        $e("#qqvip_ui_dialog_pop_mask").remove();
    }, center: function () {
        obj = document.getElementById(this.getId());
        var WH = $e("#" + this.getId() + " .mod_pop_wrap").getSize();
        var userAgent = navigator.userAgent.toLowerCase();
        var rmsie = /(msie) ([\w.]+)/;
        var match = rmsie.exec(userAgent);
        var ua = {};
        if (match) {
            ua.ie = match[2];
        }
        function set() {
            if (obj.style.display == 'none')return;
            var w = document.compatMode == "CSS1Compat" && document.documentElement["clientWidth"] || document.body["clientWidth"];
            var h = document.compatMode == "CSS1Compat" && document.documentElement["clientHeight"] || document.body["clientHeight"];
            obj.style.margin = '0';
            obj.style.left = (w - obj.offsetWidth) / 2 + (ua.ie < 7 ? Math.max(document.body.scrollLeft, document.documentElement.scrollLeft) : 0) + 'px';
            obj.style.top = (h - WH[1]) / 2 + (ua.ie < 7 ? Math.max(document.body.scrollTop, document.documentElement.scrollTop) : 0) + 'px';
            obj.style.position = (ua.ie < 7) ? 'absolute' : 'fixed';
            var pop_mask = document.getElementById('qqvip_ui_dialog_pop_mask');
            if (pop_mask) {
                $e("#qqvip_ui_dialog_pop_mask").setStyle("height", QQVIP.dom.getScrollHeight());
                $e("#qqvip_ui_dialog_pop_mask").setStyle("width", QQVIP.dom.getScrollWidth());
            }
        }

        set();
        window.onresize = set;
        if (ua.ie < 7)window.onscroll = set;
    }};
})();
jWidget.extend(QZFL.ui = QZFL.ui || {}, jWidget.ui);
String.prototype.format = function () {
    var a = arguments;
    var data = (a.length == 1 && typeof(a[0]) == 'object') ? a[0] : a;
    return this.replace(/\{([\d\w]+)\}/g, function (m, n) {
        return data[n] != undefined ? data[n].toString() : m;
    });
};
var mobiletip = {"playTpl": '<div class="mod_fl_cont">\
    <h5>�𾴵�<em>QQ��Ա{nick_name}</em>����ǰʹ���ֻ��֧����ͨ��Ա��</h5>\
    <table>\
     <thead>\
      <tr>\
       <th>�ֻ�֧������ǰ��</th>\
       <th>����֧�������</th>\
      </tr>\
     </thead>\
     <tfoot>\
      <tr class="nobr">\
       <td colspan="2">{time_mobile}����<em>VIP{next_level}</em>  {time_pay}����<em>VIP{next_level}</em>����ʡ<em>{day_pay}</em>�죩</td>\
      </tr>\
     </tfoot>\
     <tbody>\
      <tr>\
       <td>{mypay}</td>\
       <td><em>{newpay}</em></td>\
      </tr>\
      <tr>\
       <td>�ɳ�ֵ{add_step}��/��</td>\
       <td>�ɳ�ֵ<em>{new_add_step}</em>��/��</td>\
      </tr>\
      <tr>\
       <td>{mygrow_add}</td>\
       <td>{newgrow_add}</td>\
      </tr>\
     </tbody>\
    </table>\
   </div>', dateFormat: function (timestamp, str) {
    if (timestamp > 0) {
        var date = new Date(timestamp * 1000);
        var data = {"Y": date.getFullYear(), "m": date.getMonth() + 1, "d": date.getDate(), "H": date.getHours(), "i": date.getMinutes(), "s": date.getSeconds()};
        str = str || "Y-m-d";
        for (var i in data) {
            if (data[i] < 10) {
                data[i] = "0" + data[i].toString();
            }
        }
        str = str.replace(/[YmdHis]/g, function (temp) {
            return data[temp];
        });
        return str;
    } else {
        return"";
    }
}, init: function (userInfo) {
    var uin = QQVIP.Vip.getUin();
    if (uin > 0) {
        if (typeof userInfo != "undefined") {
            mobiletip.showTips(userInfo);
        } else {
            var field = ["uin", "is_club", "level", "is_mobile_club", "grow_value", "nick_name", "add_step"];
            field = field.join(',');
            loadScript("http://vipfunc.qq.com/common/user.php?callback=mobiletip.getUserInfo&data=" + field);
        }
    }
}, getUserInfo: function (result) {
    var userInfo = result[0];
    if (userInfo.is_login != 0) {
        mobiletip.showTips(userInfo);
    }
}, showTips: function (userInfo) {
    if (userInfo) {
        var level = [0, 0, 600, 1800, 3600, 6000, 10800, 32400];
        var noShowTip = QQVIP.cookie.get("mobiletip");
        if (typeof userInfo.is_mobile_club != 'undefined' && userInfo.is_mobile_club == 1 && userInfo.level < 7 && noShowTip != "Y") {
            var dialog = "play";
            var nowtime = userInfo.servertime;
            var next_level = parseInt(userInfo.level, 10) + 1;
            var new_add_step = userInfo.add_step == 12 ? "15" : "12";
            var data = {"nick_name": userInfo.nick_name != "" ? userInfo.nick_name : userInfo.uin, "next_level": next_level, "mypay": userInfo.add_step == 12 ? "180Ԫ/��" : (userInfo.add_step == 5 ? "10Ԫ/��" : "15Ԫ/��"), "newpay": userInfo.add_step == 12 ? "109.2Ԫ/��" : "9.1Ԫ/��", "add_step": userInfo.add_step, "new_add_step": new_add_step, "mygrow_add": userInfo.add_step == 5 ? "�޳ɳ�ֵ����" : (userInfo.add_step == 12 ? '����<em>140%</em>' : "����<em>100%</em>"), "newgrow_add": userInfo.add_step == 12 ? '����<em>200%</em>' : "����<em>140%</em>", "time_mobile": mobiletip.dateFormat(userInfo.servertime + Math.floor((level[next_level] - userInfo.grow_value) / userInfo.add_step) * 24 * 3600), "time_pay": mobiletip.dateFormat(userInfo.servertime + Math.floor((level[next_level] - userInfo.grow_value) / new_add_step) * 24 * 3600), "day_pay": Math.floor((level[next_level] - userInfo.grow_value) / userInfo.add_step) - Math.floor((level[next_level] - userInfo.grow_value) / new_add_step), "time_year": mobiletip.dateFormat(userInfo.servertime + Math.floor((level[next_level] - userInfo.grow_value) / 15) * 24 * 3600), "day_year": Math.floor((level[next_level] - userInfo.grow_value) / userInfo.add_step) - Math.floor((level[next_level] - userInfo.grow_value) / 15)};
            var playDialog = new QQVIP.ui.Dialog({"title": "��ʾ��Ϣ", "content": mobiletip.playTpl.format(data), "footerTpl": '<div class="mod_pop_gd_ft">{footer}<input type="checkbox" id="noshow_pay"/> ������ʾ</div>', "tpl": '<div class="mod_pop_gd_v3 mod_fl_pay_wrap" id="{id}" style="{style}"><div class="mod_pop_wrap">{headerTpl}<div class="mod_pop_gd_bd">{contentTpl}</div></div>{footerTpl}</div>', "style": {width: "560px"}, "modal": true, "onclose": function () {
                mobiletip.noShow();
                this.destroy();
            }, "buttons": {"������": function () {
                buttonClick(4, 88);
                mobiletip.noShow();
                window.open("http://pay.qq.com/qqvip/index.shtml?aid=vip.pingtai.vipsite.vip_my_index_html.play");
                this.destroy();
            }}});
        } else {
        }
    }
}, noShow: function () {
    if (($e("#noshow_base").elements.length > 0 && $e("#noshow_base").elements[0].checked == true) || ($e("#noshow_pay").elements.length > 0 && $e("#noshow_pay").elements[0].checked == true)) {
        QQVIP.cookie.set("mobiletip", 'Y', 'vip.qq.com', '/', 24 * 365);
    } else {
        if ($e("#mobile_tip").elements.length > 0) {
            $e("#mobile_tip").hide();
        }
        QQVIP.cookie.set("mobiletip", 'Y', 'vip.qq.com', '/', 24);
    }
}, showClub: function (userInfo) {
    QQVIP.css.insertCSSLink('http://imgcache.qq.com/vipstyle/vipportal_v3/css/vip/vip_pop.css');
    if (userInfo.is_club == 1) {
        buttonClick(6, 99);
        var clubDialog = new QQVIP.ui.Dialog({"title": "��ԱС֪ʶ", "content": '', "footerTpl": '{footer}', "tpl": '<div class="mod_pop_gd_v3 pop_know" id="{id}" style="{style}">\
         <div class="mod_pop_wrap">\
          <div class="mod_pop_gd_hd">{headerTpl}\
          </div>\
          <div class="mod_pop_gd_bd">\
           <div class="knowledge">\
            <h4>һ���ȡ���»�Ա��Ѷ�����ٵ�¼��Ա�Ż�</h4>\
            <p class="kn_name">ÿ������¼�����<em>2���Ա�ɳ�ֵ</em></p>\
            <div class="bg_know"></div>\
            <p>��ܰ��ʾ���ù���QQ2011 Beta3�����ϰ汾֧��  <a href="http://im.qq.com/qq/all.shtml" target="_blank" onclick="buttonClick(6,102)">�����°汾</a></p>\
           </div>\
          </div>\
          <div class="mod_pop_gd_ft">{footerTpl}\
          </div>\
         </div>\
        </div>', "style": {width: "560px", height: "360px"}, "modal": true, "onclose": function () {
            this.destroy();
        }, "buttons": {"���Ļ": function () {
            buttonClick(6, 103);
            window.open("http://vip.qq.com/my/my_subscribe.html?adtag=vipsite.im.vip");
            this.destroy();
        }, "��֪����": function () {
            this.destroy();
        }}, buttons_style: ['btn_fit_em_pop', '']});
    } else {
        loadScript('http://vipfunc.qq.com/user/preclub.php?cb=mobiletip.showPreClub&action=ispreclub');
    }
}, showPreClub: function (result) {
    if (result && typeof result['ret'] != 'undefined' && result['ret'] == 0 && result['errcode'] == 0) {
        var ispreclub = result['data']['ispreclub'];
        if (ispreclub == true) {
            buttonClick(6, 100);
            var preClubDialog = new QQVIP.ui.Dialog({"title": "��ԱС֪ʶ", "content": '', "footerTpl": '{footer}', "tpl": '<div class="mod_pop_gd_v3 pop_know" id="{id}" style="{style}">\
         <div class="mod_pop_wrap">\
          <div class="mod_pop_gd_hd">{headerTpl}\
          </div>\
          <div class="mod_pop_gd_bd">\
           <div class="knowledge">\
            <h4>һ���ȡ���»�Ա��Ѷ�����ٵ�¼��Ա�Ż�</h4>\
            <div class="bg_know"></div>\
            <p>��ܰ��ʾ���ù���QQ2011 Beta3�����ϰ汾֧��  <a href="http://im.qq.com/qq/all.shtml" target="_blank" onclick="buttonClick(6,102)">�����°汾</a></p>\
           </div>\
          </div>\
          <div class="mod_pop_gd_ft">{footerTpl}\
          </div>\
         </div>\
        </div>', "style": {width: "560px", height: "360px"}, "modal": true, "onclose": function () {
                this.destroy();
            }, "buttons": {"���Ļ": function () {
                buttonClick(6, 104);
                window.open("http://vip.qq.com/my/my_subscribe.html?adtag=vipsite.im.vip");
                this.destroy();
            }, "��֪����": function () {
                this.destroy();
            }}, buttons_style: ['btn_fit_em_pop', '']});
        } else {
            buttonClick(6, 101);
            var notClubDialog = new QQVIP.ui.Dialog({"title": "��ԱС֪ʶ", "content": '', "footerTpl": '{footer}', "tpl": '<div class="mod_pop_gd_v3 pop_know" id="{id}" style="{style}">\
         <div class="mod_pop_wrap">\
          <div class="mod_pop_gd_hd">{headerTpl}\
          </div>\
          <div class="mod_pop_gd_bd">\
           <div class="knowledge">\
            <h4>һ���ȡ���»�Ա��Ѷ�����ٵ�¼��Ա�Ż�</h4>\
            <div class="bg_know"></div>\
            <p>��ܰ��ʾ���ù���QQ2011 Beta3�����ϰ汾֧��  <a href="http://im.qq.com/qq/all.shtml" target="_blank" onclick="buttonClick(6,102)">�����°汾</a></p>\
            <p class="center tq_vip">���ڵ�����Աͼ�꣬���л��<span class="hot">���QQ��Ա��Ȩ���ÿ�</span>Ŷ��</p>\
           </div>\
          </div>\
          <div class="mod_pop_gd_ft">{footerTpl}\
          </div>\
         </div>\
        </div>', "style": {width: "560px", height: "360px"}, "modal": true, "onclose": function () {
                this.destroy();
            }, "buttons": {"����ͼ��": function () {
                buttonClick(6, 105);
                this.destroy();
                loadScript("http://vipfunc.qq.com/user/preclub.php?cb=mobiletip.setPreClubCb&action=setpreclub");
            }, "�ݲ�����": function () {
                this.destroy();
            }}, buttons_style: ['btn_fit_em_pop', '']});
        }
    }
}, setPreClubCb: function (result) {
    if (result['ret'] == 0) {
        if (result['errcode'] == 0) {
            buttonClick(6, 106);
            buttonClick(6, 107);
            var notPreClub = new QQVIP.ui.Dialog({"title": "��ԱС֪ʶ", "content": '', "footerTpl": '{footer}', "tpl": '<div class="mod_pop_gd_v3 pop_know" id="{id}" style="{style}">\
          <div class="mod_pop_wrap">\
           <div class="mod_pop_gd_hd">{headerTpl}\
           </div>\
           <div class="mod_pop_gd_bd">\
            <div class="knowledge">\
             <h4>��ϲ�����ѳɹ�������Աͼ�꣡</h4>\
             <p class="cy_title">������Ľܳ���Ʒ��������</p>\
             <div class="cy_pop_card">\
              <img src="http://imgcache.qq.com/vipstyle/vipportal_v3/pic/mycenter/im_cyong_s.jpg" alt="">\
              <div class="card_info">\
               <h5>QQ��Ա��Ȩ���ÿ�</h5>\
               <p>�ǻ�Ա�û��������ÿ�����������5-10��ħ�����顢���������7���Ա��Ȩ��<a href="http://vip.qq.com/clubcyk/?adtag=vipsite.im" target="_blank" onclick="buttonClick(6,108)">��ϸ�˽�</a></p>\
                </div>\
               </div>\
               <p>��ܰ��ʾ����Աͼ����Ҫ���µ�¼��ſ���ʾ��</p>\
            </div>\
           </div>\
           <div class="mod_pop_gd_ft">{footerTpl}\
           </div>\
          </div>\
         </div>', "style": {width: "460px", height: "360px"}, "modal": true, "onclose": function () {
                this.destroy();
            }, "buttons": {"�������ÿ�": function () {
                buttonClick(6, 108);
                window.open("http://vip.qq.com/clubcyk/?adtag=vipsite.im");
                this.destroy();
            }, "�ݲ�����": function () {
                this.destroy();
            }}, buttons_style: ['btn_fit_em_pop', '']});
        } else {
            buttonClick(6, 106);
            var qqvipDialog = new QQVIP.ui.Dialog({"title": "��ʾ��Ϣ", "content": '<div class="info_success"><h4>��ϲ����ɹ�������Աͼ�ꡣ</h4><p>��ܰ��ʾ����Աͼ����Ҫ���µ�¼��ſ���ʾ��</p></div>', "style": {width: "460px"}, "modal": true, "buttons": {"ȷ��": function () {
                this.destroy();
            }}, "onclose": function () {
                this.destroy();
            }});
        }
    } else if (result['ret'] == 2 || result['ret'] == 3) {
        var qqvipDialog = new QQVIP.ui.Dialog({"title": "��ʾ��Ϣ", "content": '<div class="info_success"><h4>��ϲ����ɹ�������Աͼ�ꡣ</h4><p>��ܰ��ʾ����Աͼ����Ҫ���µ�¼��ſ���ʾ��</p></div>', "style": {width: "460px"}, "modal": true, "buttons": {"ȷ��": function () {
            this.destroy();
        }}, "onclose": function () {
            this.destroy();
        }});
    } else {
        var qqvipDialog = new QQVIP.ui.Dialog({"title": "��ʾ��Ϣ", "content": '<div class="info_alert"><h4>��������æ�����Ժ����ԣ�</h4></div>', "style": {width: "460px"}, "modal": true, "buttons": {"ȷ��": function () {
            this.destroy();
        }}, "onclose": function () {
            this.destroy();
        }});
    }
}};
function buttonClick(page, button) {
    if (page > 0 && button > 0) {
        var img = document.createElement("img");
        img.src = "http://vipfunc.qq.com/qqvip_click.php?page=" + page + "&button=" + button;
        return true;
    }
}
if (location.host == "vip.qq.com") {
}
(function () {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var isIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var isAndroid = sUserAgent.match(/android/i) == "android";
    var hln_css = encodeURIComponent("http://imgcache.qq.com/vipstyle/vipportal/v1/img/mobile_login_logo.png");
    var s_url = encodeURIComponent(location.href);
    if (isIphoneOs) {
        window['openLogin'] = function () {
            location.href = "http://ui.ptlogin2.qq.com/cgi-bin/login?style=8&hln_copyright=1998&appid=8000212&s_url=" + s_url + "&hln_css=" + hln_css + "&low_login_enable=0";
        };
    }
    if (isAndroid) {
        window['openLogin'] = function () {
            location.href = "http://ui.ptlogin2.qq.com/cgi-bin/login?style=9&hln_copyright=1998&appid=8000212&s_url=" + s_url + "&hln_css=" + hln_css + "&low_login_enable=0";
        };
    }
})();
var vip_act_click = {init: function () {
    if (jQuery) {
        var pageid = jQuery("body").attr("pageid");
        var mid_item = [];
        var mid_item_elem = jQuery('a[mid_actid]');
        if (mid_item_elem.length > 0) {
            mid_item_elem.each(function () {
                mid_item.push(jQuery(this).attr("mid_actid"));
            });
            vip_act_click.report(pageid, 1, mid_item);
        }
        jQuery("body").delegate("a[mid_actid]", "click", function () {
            vip_act_click.report(pageid, 2, jQuery(this).attr("mid_actid"));
        });
    }
}, report: function (pageid, option, mid_actid) {
    if (jQuery.isArray(mid_actid)) {
        mid_actid = mid_actid.join(",");
    }
    if (pageid > 0) {
        var img = new Image();
        img.src = 'http://vipfunc.qq.com/tj2/vip_act_click.php?page=' + pageid + '&option=' + option + '&mid_actid=' + mid_actid + '&g_tk=' + qq.security.getCSRFToken();
    }
}};
/*  |xGv00|72cba6a9f5894fbedf5a32d18591fd84 */