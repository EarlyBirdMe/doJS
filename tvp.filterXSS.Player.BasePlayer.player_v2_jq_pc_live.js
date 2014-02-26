/*! TenVideoPlayer_V2 - v2.0.0 - 2014-01-09 15:41:03
 * Copyright (c) 2014
 * Powered by Tencent-Video Web Front End Team 
 */
!function (global) {
    !function (a) {
        function b(a) {
            var b = this.os = {}, c = this.browser = {}, d = a.match(/WebKit\/([\d.]+)/), e = a.match(/(Android)\s+([\d.]+)/), f = a.match(/(iPad).*OS\s([\d_]+)/), g = !f && a.match(/(iPhone\sOS)\s([\d_]+)/), h = a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), i = h && a.match(/TouchPad/), j = a.match(/Kindle\/([\d.]+)/), k = a.match(/Silk\/([\d._]+)/), l = a.match(/(BlackBerry).*Version\/([\d.]+)/), m = a.match(/(BB10).*Version\/([\d.]+)/), n = a.match(/(RIM\sTablet\sOS)\s([\d.]+)/), o = a.match(/PlayBook/), p = a.match(/Chrome\/([\d.]+)/) || a.match(/CriOS\/([\d.]+)/), q = a.match(/Firefox\/([\d.]+)/);
            (c.webkit = !!d) && (c.version = d[1]), e && (b.android = !0, b.version = e[2]), g && (b.ios = b.iphone = !0, b.version = g[2].replace(/_/g, ".")), f && (b.ios = b.ipad = !0, b.version = f[2].replace(/_/g, ".")), h && (b.webos = !0, b.version = h[2]), i && (b.touchpad = !0), l && (b.blackberry = !0, b.version = l[2]), m && (b.bb10 = !0, b.version = m[2]), n && (b.rimtabletos = !0, b.version = n[2]), o && (c.playbook = !0), j && (b.kindle = !0, b.version = j[1]), k && (c.silk = !0, c.version = k[1]), !k && b.android && a.match(/Kindle Fire/) && (c.silk = !0), p && (c.chrome = !0, c.version = p[1]), q && (c.firefox = !0, c.version = q[1]), b.tablet = !!(f || o || e && !a.match(/Mobile/) || q && a.match(/Tablet/)), b.phone = !(b.tablet || !(e || g || h || l || m || p && a.match(/Android/) || p && a.match(/CriOS\/([\d.]+)/) || q && a.match(/Mobile/)))
        }

        b.call(a, navigator.userAgent), a.__detect = b
    }(jQuery);
    var tvp = {};
    tvp.lastModify = "2014-01-09 15:41:02", tvp.ver = "$V2.0Build825$", tvp.name = "\u817e\u8baf\u89c6\u9891\u7edf\u4e00\u64ad\u653e\u5668", tvp.log = function (a) {
        window.console && window.console.log("[" + tvp.log.debugid++ + "] " + a)
    }, tvp.debug = function (a) {
        -1 === tvp.log.isDebug && (tvp.log.isDebug = "true" == tvp.$.getUrlParam("debug") ? 1 : 0), tvp.log.isDebug && tvp.log(a)
    }, tvp.log.isDebug = -1, tvp.log.debugid = 1;
    var _isUseInnerZepto = !1;
    "undefined" != typeof Zepto && Zepto._tvp ? (tvp.$ = Zepto, _isUseInnerZepto = !0) : (tvp.$ = {}, _isUseInnerZepto = !1), function () {
        return _isUseInnerZepto || "function" != typeof window.Zepto ? "function" == typeof window.jQuery && "function" == typeof window.jQuery.Deferred ? (tvp.$ = window.jQuery, void 0) : ("function" == typeof window.jq && (tvp.$ = window.jq), void 0) : (tvp.$ = window.Zepto, void 0)
    }(), function () {
        "undefined" == typeof document.DOCUMENT_NODE && (document.DOCUMENT_NODE = 9)
    }(), function (a) {
        function b(b) {
            {
                var c = b.match(/MQQBrowser\/(\d+\.\d+)/i), d = b.match(/QQ\/(\d+\.(\d+)\.(\d+)\.(\d+))/i), e = b.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/) || b.match(/MicroMessenger\/((\d+)\.(\d+))/), f = b.match(/Mac\sOS\sX\s(\d+\.\d+)/), g = b.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/), h = b.match(/MiuiBrowser\/(\d+\.\d+)/i), i = b.match(/UCBrowser\/(\d+\.\d+(\.\d+\.\d+)?)/) || b.match(/\sUC\s/), j = b.match(/IEMobile(\/|\s+)(\d+\.\d+)/), k = b.match(/(ipod\sOS)\s([\d_]+)/);
                b.indexOf("HTC") > -1
            }
            if (a.browser = a.browser || {}, a.os = a.os || {}, window.ActiveXObject) {
                var l = 6;
                (window.XMLHttpRequest || b.indexOf("MSIE 7.0") > -1) && (l = 7), (window.XDomainRequest || b.indexOf("Trident/4.0") > -1) && (l = 8), b.indexOf("Trident/5.0") > -1 && (l = 9), b.indexOf("Trident/6.0") > -1 && (l = 10), a.browser.ie = !0, a.browser.version = l
            } else b.indexOf("Trident/7.0") > -1 && (a.browser.ie = !0, a.browser.version = 11);
            k && (n.ios = n.ipod = !0, n.version = k[2].replace(/_/g, ".")), g && (this.os.windows = !0, this.os.version = g[2]), f && (this.os.Mac = !0, this.os.version = f[1]), b.indexOf("lepad_hls") > 0 && (this.os.LePad = !0), c && (this.browser.MQQ = !0, this.browser.version = c[1]), d && (this.browser.MQQClient = !0, this.browser.version = d[1]), e && (this.browser.WeChat = !0, this.browser.version = e[1]), h && (this.browser.MIUI = !0, this.browser.version = h[1]), i && (this.browser.UC = !0, this.browser.version = i[1] || 0 / 0), j && (this.browser.IEMobile = !0, this.browser.version = j[2]), this.os.windows && (this.os.win64 = "undefined" != typeof navigator.platform && "win64" == navigator.platform.toLowerCase() ? !0 : !1);
            var m = {iPad7: "iPad; CPU OS 7", LePad: "lepad_hls", XiaoMi: "MI-ONE", SonyDTV: "SonyDTV", SamSung: "SAMSUNG", HTC: "HTC", VIVO: "vivo"};
            for (var n in m)this.os[n] = -1 !== b.indexOf(m[n]);
            this.os.getNumVersion = function () {
                return parseFloat(a.os.version, "10")
            }, this.os.hasTouch = "ontouchstart"in window, this.os.hasTouch && this.os.ios && this.os.getNumVersion() < 6 && (this.os.hasTouch = !1), a.browser.WeChat && a.browser.version < 5 && (this.os.hasTouch = !1), a.extend(a.browser, {getNumVersion: function () {
                return parseFloat(a.browser.version, "10")
            }, isFFCanOcx: function () {
                return a.browser.firefox && a.browser.getNumVersion() >= 3 ? !0 : !1
            }, isCanOcx: function () {
                return!(!a.os.windows || !a.browser.ie && !a.browser.isFFCanOcx() && !a.browser.webkit)
            }, isNotIESupport: function () {
                return!!a.os.windows && (!!a.browser.webkit || a.browser.isFFCanOcx())
            }}), a.userAgent = {}, a.extend(a.userAgent, a.os), a.extend(a.userAgent, a.browser), a.userAgent.browserVersion = a.browser.version, a.userAgent.osVersion = a.os.version, delete a.userAgent.version
        }

        b.call(a, navigator.userAgent)
    }(tvp.$), function ($) {
        var extFun = {getByID: function (a) {
            return document.getElementById(a)
        }, noop: function () {
        }, isString: function (a) {
            return"string" === $.type(a)
        }, isUndefined: function (a) {
            return"undefined" === $.type(a)
        }, now: function () {
            return(new Date).getTime()
        }, getISOTimeFormat: function () {
            var a = new Date, b = a.getFullYear(), c = a.getMonth() + 1, d = a.getDate(), e = a.getHours(), f = a.getMinutes(), g = a.getSeconds();
            return[[b, 10 > c ? "0" + c : c, 10 > d ? "0" + d : d].join("-"), [10 > e ? "0" + e : e, 10 > f ? "0" + f : f, 10 > g ? "0" + g : g].join(":")].join(" ")
        }, formatSeconds: function (a) {
            a = parseInt(a);
            var b = parseInt(a / 60), c = b >= 60 ? parseInt(b / 60) : 0, d = a % 60, e = "";
            return b >= 60 && (b %= 60), c > 0 && (e += 10 > c ? "0" + c : c, e += ":"), e += 10 > b ? "0" + b : b, e += ":", e += 10 > d ? "0" + d : d
        }, getHost: function () {
            var a = window.location.hostname || window.location.host, b = location.host.split(".");
            return b.length > 1 && (a = b.slice(b.length - 2).join(".")), a
        }, getUrlParam: function (a, b) {
            b = b || document.location.toString();
            var c = new RegExp("(^|&|\\\\?)" + a + "=([^&]*)(&|$|#)"), d = null;
            return(d = b.match(c)) ? d[2] : ""
        }, filterXSS: function (a) {
            return $.isString(a) ? a.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;") : a
        }, createGUID: function (a) {
            a = a || 32;
            for (var b = "", c = 1; a >= c; c++) {
                var d = Math.floor(16 * Math.random()).toString(16);
                b += d
            }
            return b
        }, formatSize: function (a) {
            var b = "" + a;
            return b.indexOf("%") > 0 ? b : b.indexOf("px") > 0 ? b : /^\d+$/.test(b) ? b + "px" : b
        }, isTrue: function (v) {
            return eval(tvp.$.filterXSS(v))
        }, loadPluginCss: function (a) {
            var b = "", c = tvp.defaultConfig.pluginCssUrl;
            return a in c && (b = tvp.defaultConfig.cssPath + c[a]), $.loadCss(b)
        }, loadCss: function (a) {
            var b = $.Deferred(), c = !1;
            if (a) {
                for (; a.indexOf("../") >= 0;)a = a.replace("../", "");
                a = $.filterXSS(a);
                var d = document, e = d.getElementsByTagName("head")[0] || d.documentElement, f = e.getElementsByTagName("base")[0], g = d.createElement("link");
                g.rel = "stylesheet", g.href = a, g.onload = g.onerror = function () {
                    g.onload = g.onerror = null, c = !0, b.resolve()
                }, ($.browser.WeChat || $.browser.MQQClient) && setTimeout(function () {
                    c || b.resolve()
                }, 2e3), f ? e.insertBefore(g, f) : e.appendChild(g)
            } else b.reject();
            return b
        }};
        $.extend($, extFun)
    }(tvp.$), function (a) {
        a.cookie = {set: function (a, b, c, d, e) {
            if (e) {
                var f = new Date, g = new Date;
                g.setTime(f.getTime() + 36e5 * e)
            }
            return document.cookie = a + "=" + b + "; " + (e ? "expires=" + g.toGMTString() + "; " : "") + (d ? "path=" + d + "; " : "path=/; ") + (c ? "domain=" + c + ";" : "domain=" + window.location.host + ";"), !0
        }, get: function (a) {
            var b = new RegExp("(?:^|;+|\\s+)" + a + "=([^;]*)"), c = document.cookie.match(b);
            return c ? c[1] : ""
        }, del: function (a, b, c) {
            var d = new Date;
            d.setTime(d.getTime() - 1), document.cookie = a + "=; expires=" + d.toGMTString() + ";" + (c ? "path=" + c + "; " : "path=/; ") + (b ? "domain=" + b + ";" : "domain=" + window.location.host + ";")
        }}
    }(tvp.$), tvp = tvp || {}, tvp.common = {isUseHtml5: function () {
        var a = navigator.userAgent, b = null;
        if (/ipad|ipod|iphone|lepad_hls|IEMobile/gi.test(a))return!0;
        if (tvp.$.os.android) {
            if (tvp.common.isSupportMP4())return!0;
            if (tvp.$.browser.MQQ && tvp.$.browser.getNumVersion() >= 4.2)return!0;
            if (-1 != a.indexOf("MI-ONE") || -1 != a.indexOf("MI2"))return!0;
            if (tvp.$.os.version >= "4" && (b = a.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/)) && b[1] >= 4.2)return!0;
            if (tvp.$.os.version >= "4.1")return!0
        }
        return!1
    }, isUseHLS: function () {
        return tvp.$.os.ios ? !0 : void 0
    }, isLiveUseHTML5: function () {
        return tvp.$.os.ios ? !0 : tvp.$.os.android && tvp.$.browser.MQQ && tvp.$.browser.getNumVersion() >= 4.2 ? !0 : !1
    }, isSupportMP4: function () {
        var a = document.createElement("video");
        if ("function" == typeof a.canPlayType) {
            if ("probably" == a.canPlayType('video/mp4; codecs="mp4v.20.8"'))return!0;
            if ("probably" == a.canPlayType('video/mp4; codecs="avc1.42E01E"') || "probably" == a.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'))return!0
        }
        return!1
    }, isSupportSVG: function () {
        return document.implementation && tvp.$.isFunction(document.implementation.hasFeature) ? document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") : !1
    }, isEnforceMP4: function () {
        navigator.userAgent;
        if (tvp.$.os.android) {
            if (tvp.$.browser.firefox)return!0;
            if (tvp.$.os.version >= "4.0" && tvp.$.browser.MQQ && tvp.$.browser.version < "4.0")return!0
        }
        return!1
    }, getUin: function () {
        var a = tvp.$.cookie.get("skey"), b = tvp.$.cookie.get("lskey"), c = "", d = 0, e = !1;
        return isLeak = "undefined" == typeof isLeak ? !1 : !0, e = !!isLeak && "" != b, e || "" != a ? (c = tvp.$.cookie.get("uin"), "" == c && e && (c = tvp.$.cookie.get("luin")), d = parseInt(c.replace(/^o0*/g, ""), 10), isNaN(d) || 1e4 >= d ? 0 : d) : 0
    }, getSKey: function () {
        var a = tvp.$.cookie.get("skey"), b = tvp.$.cookie.get("lskey"), c = "";
        return c = isLeak ? "" != a && "" != b ? [a, b].join(";") : a || b : a
    }, openLogin: function () {
    }, getVideoSnap: function (a, b) {
        var c, d, e = 1e8;
        if (a.indexOf("_") > 0) {
            var f = a.split("_");
            a = f[0], b = parseInt(f[1])
        }
        for (var g = 4294967296, e = 1e8, h = 0, i = 0; i < a.length; i++) {
            var j = a.charCodeAt(i);
            h = 32 * h + h + j, h >= g && (h %= g)
        }
        return d = h % e, void 0 == b && (b = 0), c = 0 == b ? ["http://vpic.video.qq.com/", d, "/", a, "_160_90_3.jpg"].join("") : ["http://vpic.video.qq.com/", d, "/", a, "_", "160_90_", b, "_1.jpg"].join("")
    }}, tvp.version = function () {
        function a(a) {
            if (b(a))return a;
            if (/\d+/i.test(a)) {
                var c = parseInt(a / 1e4 / 100, 10), d = parseInt(a / 1e4, 10) - 100 * c, e = parseInt(a, 10) - (100 * c * 1e4 + 1e4 * d);
                return strVer = c + "." + d + "." + e
            }
            return a
        }

        function b(a) {
            return/^(\d+\.){2}\d+(\.\d+)?$/.test(a)
        }

        var c, d = "0.0.0.0", e = "0.0.0";
        return{getOcx: function (b) {
            if (tvp.$.isUndefined(b) && (b = !0), b && "0.0.0.0" != d)return d;
            if (tvp.$.browser.ie)try {
                c = new ActiveXObject(QQLive.config.PROGID_QQLIVE_INSTALLER), "undefined" != typeof c.getVersion && (d = c.GetVersionByClsid(QQLiveSetup.config.OCX_CLSID))
            } catch (e) {
            } else if (tvp.$.browser.isNotIESupport()) {
                var f, g = navigator.plugins;
                if (tvp.$.isUndefined(g.namedItem) || (f = g.namedItem("\u817e\u8baf\u89c6\u9891")), !f)for (var h = 0, i = g.length; i > h; h++)if (g[h] && "\u817e\u8baf\u89c6\u9891" == g[h].name || "npQQLive.dll" == g[h].filename) {
                    f = g[h];
                    break
                }
                if (f)if (tvp.$.isUndefined(f.version)) {
                    var j, k = f.description;
                    (j = k.match(/version:((\d+\.){3}(\d+)?)/)) && (d = j[1])
                } else d = f.version
            }
            return d = a(d)
        }, getFlash: function () {
            if ("0.0.0" != e)return e;
            var a = null, b = null, c = [], d = "Shockwave Flash", f = navigator, g = "application/x-shockwave-flash";
            if (tvp.$.browser.ie)try {
                a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), a && (b = a.GetVariable("$version"), b && (b = b.split(" ")[1].split(","), c = [parseInt(b[0], 10), parseInt(b[1], 10), parseInt(b[2], 10)]))
            } catch (h) {
            } else tvp.$.isUndefined(f.plugins) || "plugin" != tvp.$.type(f.plugins[d]) || (b = f.plugins[d].description, b && (tvp.$.isUndefined(f.mimeTypes) || !f.mimeTypes[g] || f.mimeTypes[g].enabledPlugin) && (b = b.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), c[0] = parseInt(b.replace(/^(.*)\..*$/, "$1"), 10), c[1] = parseInt(b.replace(/^.*\.(.*)\s.*$/, "$1"), 10), c[2] = /[a-zA-Z]/.test(b) ? parseInt(b.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0));
            return e = c.join(".")
        }, getFlashMain: function () {
            return parseInt(tvp.version.getFlash().split(".")[0], 10)
        }}
    }(), tvp.PLAYER_DEFINE = {LIVE: 1, VOD: 2}, tvp.defaultConfig = {video: null, width: 600, height: 450, autoplay: !1, mute: !1, volume: 50, modId: "mod_player", playerid: "", coverId: "", typeId: 0, pic: "", type: tvp.PLAYER_DEFINE.VOD, playerType: "auto", loadingswf: "", oid: "", share: !0, isHtml5UseHLS: "auto", isHtml5AutoBuffer: !1, isHtml5UseAirPlay: !0, isHtml5ControlAlwaysShow: !1, html5Preload: "null", html5VodUIFeature: ["controlbar", "tips", "title", "playpause", "progress", "timepanel", "definition", "fullscreen", "overlay", "bigben", "posterlayer", "shadow"], html5LiveUIFeature: ["controlbar", "tips", "playpause", "fullscreen", "overlay", "posterlayer", "shadow"], html5FeatureExtJS: {}, html5ForbiddenUIFeature: [], isHtml5UseUI: !1, HTML5CSSName: "", isHtml5ShowPosterOnStart: !0, isHtml5ShowPosterOnEnd: !1, isHtml5ShowPosterOnChange: !0, isiPhoneShowPosterOnPause: !0, isHtml5ShowPlayBtnOnPause: !0, isHtml5UseFakeFullScreen: !0, isIOSVideoOffset: !0, flashWmode: "direct", vodFlashUrl: "", vodFlashType: "TPout", vodFlashExtVars: {}, vodFlashListType: 2, vodFlashSkin: "", isVodFlashShowCfg: !0, isVodFlashShowEnd: !0, isVodFlashShowSearchBar: !0, isVodFlashShowNextBtn: !0, liveFlashUrl: "", liveFlashSwfType: "TencentPlayerLive", isLiveFlashShowConfigBtn: !0, isLiveflashShowFullBtn: !0, isLiveFlashShowCfg: !0, liveFlashWatermark: "", liveFlashAppType: "", liveFlashExtVars: {}, ocxControlBar: "", ocxControlHeight: 60, ocxSkin: "", isOcxShowPauseBtn: !1, isOcxHideControl: !1, plugins: {AppBanner: !1, AppRecommend: !1, AppDownloadOnPause: !1}, pluginUrl: {AppBanner: "js/plugins/appbanner.js?v=20131227", AppRecommend: "js/plugins/apprecommend.js?v=20131127", AppDownloadOnPause: "js/plugins/appdownloadonpause.js?v=20131211"}, cssPath: "http://imgcache.gtimg.cn/tencentvideo_v1/vstyle/mobile/v2/style/", pluginCssUrl: {AppRecommend: "player_plugins_apprecommend.css?v=20131127", AppDownloadOnPause: "player_plugins_appdownloadonpause.css?v=20131211"}, libpath: "http://qzs.qq.com/tencentvideo_v1/tvp/"}, function (a) {
        var b = function (a, c) {
            return function (d, e) {
                var f = /\s/.test(d) ? function (a) {
                    var b, d = [c], e = [
                        []
                    ];
                    for (b in a)d.push(b), e.push(a[b]);
                    return new Function(d, f.$).apply(a, e).join("")
                } : a[d] = a[d] || b(document.getElementById(d).innerHTML);
                return f.$ = f.$ || c + ".push('" + d.replace(/\\/g, "\\\\").replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join(c + ".push('").split("\r").join("\\'") + "');return " + c, e ? f(e) : f
            }
        }({}, "$" + +new Date);
        a.tmpl = b
    }(tvp.$), tvp.report = function () {
        function a() {
            return 0 == f.length ? (d = !0, e = null, void 0) : (b(f.splice(0, 1)), d = !1, void 0)
        }

        function b(b) {
            e = document.createElement("img"), e.onerror = a, e.src = b
        }

        function c(a) {
            return a && /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i.test(a) ? null == e ? (b(a), d = !1, void 0) : d ? (b(a), d = !1, void 0) : (f.push(a), void 0) : void 0
        }

        var d = !0, e = null, f = [];
        return function (a) {
            if (tvp.$.isString(a))return c(a), void 0;
            if ("object" == tvp.$.type(a)) {
                var b = [];
                for (var d in a)b.push(d + "=" + encodeURIComponent("" + a[d]));
                var e = "http://rcgi.video.qq.com/web_report?";
                c(e + b.join("&"))
            }
        }
    }(), tvp.retCode = {snid: 0, TYPE: {SUC: 1, ERR: 2}, config: {cgi: "http://isdspeed.qq.com/cgi-bin/v.cgi", sampling: 1}, commCode: {error: 11, MQzone_Err: 12}, report: function (a, b, c, d) {
        if (a && !(isNaN(b) || 1 > b) && "undefined" != typeof c) {
            var e = this.config.cgi;
            e += "?flag1=" + a.toString() + "&flag2=" + b.toString() + "&1=" + tvp.retCode.config.sampling + "&2=" + c, d && (e += "&flag3=" + d.toString()), tvp.report(e)
        }
    }}, tvp.RetCode = function (a) {
        this.appid = a, this.timer = {begin: 0, end: 0}, this.SNID = tvp.retCode.snid, this.isReported = !1, tvp.retCode.snid++
    }, tvp.RetCode.prototype = {begin: function () {
        this.timer.begin = (new Date).valueOf()
    }, end: function () {
        this.timer.end = this.timer.end || (new Date).valueOf()
    }, report: function (a, b) {
        if (!this.isReported) {
            this.end();
            var c = this.timer.end - this.timer.begin;
            tvp.retCode.report(this.appid, a, c, b), this.isReported = !0
        }
    }, reportSuc: function () {
        this.report(tvp.retCode.TYPE.SUC)
    }, reportErr: function (a) {
        a = a || tvp.retCode.commCode.error, this.report(tvp.retCode.TYPE.ERR, a)
    }}, function (a, b) {
        var c = {poster: "", prefix: 0, tail: 0, tagStart: 0, tagEnd: 0, duration: "", historyStart: 0, pay: 0, coverId: "", title: "", isLookBack: 0, tstart: 0, CDNType: 0, vFormat: "", LiveReTime: "", typeId: 0, format: b.os.ipad ? "mp4" : "auto", channelExtParam: {}, pid: "", rid: ""};
        a.VideoInfo = function () {
            function d(a) {
                return a.indexOf("_") < 0 ? a : a.split("_")[0]
            }

            function e(a) {
                return a.indexOf("_") < 0 ? 0 : parseInt(a.split("_")[1])
            }

            function f(a) {
                for (var b = [], c = a.split("|"), e = 0; e < c.length; e++)b.push(d(c[e]));
                return b.join("|")
            }

            var g = "", h = "", i = 0, j = 0, k = "", l = "", m = this, n = {}, o = {}, p = null;
            b.extend(n, c), this.data = {}, this.url = "", this.lastQueryVid = "", b.each(n, function (a) {
                !new function () {
                    var b = a.charAt(0).toUpperCase() + a.substr(1);
                    m["set" + b] = function (b) {
                        return n[a] = b, this
                    }, m["get" + b] = function () {
                        return n[a]
                    }
                }
            }), this.setVid = function (c) {
                if (a.$.isString(c)) {
                    if (this.clear(), k = c, c.indexOf("|") < 0) {
                        var i = d(c);
                        g = i, j = e(c), h = i
                    } else {
                        var l = c.split("|");
                        g = d(l[0]), j = e(l[0]), h = f(c)
                    }
                    return g = b.filterXSS(g), h = b.filterXSS(h), this
                }
            }, this.getVid = function () {
                return g
            }, this.getVidList = function () {
                return h
            }, this.getVidArray = function () {
                return h.split("|")
            }, this.getIdx = function () {
                return j
            }, this.getDuration = function () {
                if (!n.duration)return this.data && this.data.vl && b.isArray(this.data.vl.vi) && this.data.vl.vi.length > 0 && 0 != this.data.vl.vi[0].td ? this.data.vl.vi[0].td : 0;
                for (var a = n.duration.split("|"), c = 0, d = 0, e = a.length; e > d; d++)c += parseInt(a[d]);
                return c
            }, this.getTimelong = function () {
                return this.getDuration()
            }, this.getEndOffset = function () {
                return this.getDuration() - this.getTail()
            }, this.setChannelId = function (b) {
                return a.$.isString(b) ? (l = b, this) : void 0
            }, this.getChannelId = function () {
                return l
            }, this.getFullVid = function () {
                return 0 == this.getIdx() ? d(this.getVid()) : d(this.getVid()) + "_" + this.getIdx()
            }, this.getTitle = function () {
                return"" === n.title && this.data && ("mp4" == this.data.playtype && this.data.vl && b.isArray(this.data.vl.vi) && this.data.vl.vi.length > 0 ? n.title = this.data.vl.vi[0].ti || "" : "hls" == this.data.playtype && b.isArray(this.data.vi) && this.data.vi.length > 0 && (n.title = this.data.vi[0].title || "")), n.title
            }, this.clear = function () {
                g = "", h = "", i = 0, j = 0, l = "", p = null, o = {}, b.extend(n, c), this.data = {}, this.url = ""
            }, this.clone = function (a) {
                a.setVid(k), a.setChannelId(l);
                for (var c in n) {
                    var d = c.charAt(0).toUpperCase() + c.substr(1);
                    a["set" + d](this["get" + d]())
                }
                b.extend(a.data, this.data)
            }, this.getVideoSnap = function () {
                var b = [];
                return b[0] = a.common.getVideoSnap(g, j), b[1] = b[0].replace("_160_90_3", "_1"), b[2] = b[1].replace("_1.jpg", ".png"), b
            }, this.getMP4Url = function (c) {
                var d = "", e = this.getVidArray(), f = "";
                if (b.isString(c)) {
                    if (d = c, b.inArray(c, e) < 0) {
                        var g = b.Deferred();
                        return g.reject(), g
                    }
                } else isNaN(c) ? (d = this.getVid(), f = this.getFullVid()) : f = d = this.getVidArray()[c >= e.length ? 0 : c];
                this.lastQueryVid = f || d, this.setRid(b.createGUID());
                var h = d + "_mp4_" + this.getFormat();
                if ("object" == b.type(o[h]) && b.isFunction(o[h].done) && "resolved" == o[h].state())return o[h];
                o[h] = b.Deferred();
                var i = this;
                return a.h5Helper.loadVideoUrlByVid({vid: d, isPay: this.getPay(), fmt: this.getFormat()}).done(function (a, b) {
                    i.url = a, i.data = b, i.data.playtype = "mp4", o[h] && o[h].resolve(a)
                }).fail(function (a, c) {
                    o[h] && o[h].reject(a, b.isUndefined(c) ? 0 : c)
                }), o[h]
            }, this.getHLS = function (c) {
                var d = "", e = this.getVidArray();
                if (b.isString(c)) {
                    if (d = c, b.inArray(c, e) < 0) {
                        var f = b.Deferred();
                        return f.reject(), f
                    }
                } else isNaN(c) ? (d = this.getVid(), fullvid = this.getFullVid()) : fullvid = d = this.getVidArray()[c >= e.length ? 0 : c];
                this.lastQueryVid = fullvid || d, this.setRid(b.createGUID());
                var g = d + "_hls_" + this.getFormat();
                if ("object" == b.type(o[g]) && b.isFunction(o[g].done) && "resolved" == o[g].state())return o[g];
                o[g] = b.Deferred();
                var h = this;
                return a.h5Helper.loadHLSUrlByVid({vid: d, isPay: this.getPay(), fmt: this.getFormat()}).done(function (a, b) {
                    h.url = a, h.data = b, h.data.playtype = "hls", o[g] && o[g].resolve(a)
                }).fail(function (a, c) {
                    o[g] && o[g].reject(a, b.isUndefined(c) ? 0 : c)
                }), o[g]
            }, this.getPlayFormat = function () {
                if (!b.isPlainObject(this.data))return this.getFormat();
                if ("object" == b.type(this.data.fl) && b.isArray(this.data.fl.fi))for (var a = this.data.fl.fi, c = 0; c < a.length; c++)if (1 == a[c].sl)return a[c].name;
                return this.getFormat()
            }, this.getSrtLangList = function () {
                return"object" == b.type(this.data.sfl) && b.isArray(this.data.sfl.fi) ? (b.each(this.data.sfl.fi, function (b, c) {
                    c.desc = a.html5lang.getSrtName(c.id)
                }), this.data.sfl.fi) : []
            }, this.getSrtUrlList = function (c) {
                if (b.isUndefined(c)) {
                    var d = this.getSrtLangList();
                    if (!(d.length > 0))return b.Deferred().reject(-1);
                    c = d[0]
                }
                if ("object" != b.type(c) && !isNaN(c)) {
                    for (var e = 0, f = this.data.sfl.fi.length; f > e; e++)if (this.data.sfl.fi[e].id == c) {
                        c = this.data.sfl.fi[e];
                        break
                    }
                    if ("object" != b.type(c))return b.Deferred().reject(-2)
                }
                var g = this.getVid(), h = g + "_srt_" + c.id;
                if ("object" == b.type(o[h]) && b.isFunction(o[h].done) && "resolved" == o[h].state())return o[h];
                o[h] = b.Deferred();
                var i = this;
                return a.h5Helper.loadSRT({vid: g, sflid: c.id, pid: i.getPid()}).done(function (a) {
                    var d = [];
                    "object" == b.type(a.ul) && b.isArray(a.ul.ui) && b.each(a.ul.ui, function (a, b) {
                        d.push([b.url, "lang=" + c.name].join("?"))
                    }), o[h].resolve(d)
                }).fail(function (a) {
                    o[h].reject(a)
                }), o[h]
            }, this.getFormatList = function () {
                if ("object" == b.type(p) && b.isFunction(p.done))return p;
                p = b.Deferred();
                var a = this, c = ["mp4", "msd"], d = function () {
                    var d = [];
                    return b.isPlainObject(a.data.fl) && b.isArray(a.data.fl.fi) ? (b.each(a.data.fl.fi, function (a, e) {
                        -1 != b.inArray(e.name, c) && d.push(e.name)
                    }), d) : []
                };
                return this.getMP4Url().done(function () {
                    p.resolve({list: d()})
                }).fail(function () {
                    p.reject({list: []})
                }), p
            }, this.hasHardSubtitle = function () {
                for (var a = video.getFormat(), b = 0, c = this.data.fl.fi.length; c > b; b++) {
                    var d = this.data.fl.fi[b];
                    if (d.name == a)return!!d.sb
                }
                return!1
            }, this.hasSoftSubtitle = function () {
                return"object" == b.type(this.data.sfl) && b.isArray(this.data.sfl.fi) && this.data.sfl.fi.length > 0
            }
        }, a.PLAYTYPE = {LIVE: "1", VOD: "2"}
    }(tvp, tvp.$), function (a, b) {
        function c() {
            return b.os.iphone || b.os.ipod ? "v3010" : b.os.ipad ? "v4010" : b.os.android ? b.os.tablet || screen.width >= 600 ? "v6010" : "v5010" : b.browser.IEMobile ? "v7010" : "v1010"
        }

        function d(a, b) {
            for (var c = 0, d = b.length; d > c; c++)if (1 == b[c].sl)return b[c].id;
            return-1
        }

        var e = {isHLS: !1, isPay: !1, vid: "", fmt: "auto", platform: 11001};
        a.h5Helper = {loadVideoUrlByVid: function (f) {
            var g = {}, h = {}, i = b.Deferred();
            b.extend(b.extend(g, e), f);
            var j = new a.RetCode(100126);
            return j.begin(), b.ajax({url: "http://vv.video.qq.com/getinfo?callback=?&" + b.param({vids: g.vid, platform: g.platform, charge: g.isPay ? 1 : 0, otype: "json", defaultfmt: g.fmt, sb: 1, _rnd: (new Date).valueOf()}), dataType: "jsonp"}).done(function (e) {
                if (!e || !e.s)return j.reportErr(50), i.reject(50), void 0;
                if ("o" != e.s)return j.reportErr(e.em || 50), i.reject(e.em || 50), void 0;
                if (!e.vl || !e.vl.vi || !b.isArray(e.vl.vi) || 0 == e.vl.cnt)return j.reportErr(68), i.reject(68), void 0;
                var f = e.vl.vi[0];
                if (5 != f.fst || !b.isPlainObject(f.ul) || !b.isArray(f.ul.ui) || 0 == f.ul.ui.length)return j.reportErr(62), i.reject(62), void 0;
                if (2 != f.st) {
                    if (8 != f.st)return j.reportErr(62), i.reject(62), void 0;
                    j.reportErr(83), i.reject(83, f.ch)
                }
                j.reportSuc();
                var k = f.ul.ui[0];
                h.br = f.br, h.path = k.url, h.fn = f.fn, h.fiid = d(g, e.fl.fi), h.vt = k.vt;
                var l = new a.RetCode(100127);
                l.begin(), b.ajax({url: "http://vv.video.qq.com/getkey?callback=?&" + b.param({otype: "json", vid: g.vid, format: h.fiid, filename: h.fn, platform: g.platform, vt: h.vt, charge: g.isPay ? 1 : 0, _rnd: (new Date).valueOf()}), dataType: "jsonp"}).done(function (a) {
                    if (!a || !a.s)return l.reportErr(50), i.reject(50), void 0;
                    if ("o" != a.s)return l.reportErr(a.em || 50), i.reject(a.em || 50), void 0;
                    var d = [];
                    d = h.path + h.fn + "?vkey=" + a.key + "&br=" + h.br + "&platform=2&fmt=" + g.fmt + "&level=" + a.level + "&sdtfrom=" + c(), b.isString(a.sha) && a.sha.length > 0 && (d += "&sha=" + a.sha), l.reportSuc(), i.resolve(d, {vl: e.vl, fl: e.fl, sfl: e.sfl, preview: e.preview})
                }).fail(function () {
                    l.reportErr(), i.reject(500, 2)
                })
            }).fail(function () {
                j.reportErr(), i.reject(500, 1)
            }), i
        }, loadHDVideoUrlByVid: function (b) {
            b.fmt = "mp4", a.h5Helper.loadVideoUrlByVid(b)
        }, loadHLSUrlByVid: function (c) {
            var d = {}, f = b.Deferred();
            b.extend(b.extend(d, e), c);
            var g = new a.RetCode(100128);
            return g.begin(), b.ajax({url: "http://vv.video.qq.com/gethls?callback=?&" + b.param({vid: d.vid, charge: d.isPay ? 1 : 0, otype: "json", platform: d.platform, _rnd: (new Date).valueOf()}), dataType: "jsonp"}).done(function (b) {
                if (!b || !b.s)return g.reportErr(50), f.reject(50), void 0;
                if ("o" != b.s)return g.reportErr(b.em || 50), f.reject(b.em || 50), void 0;
                if (!b.vd || !b.vd.vi || !a.$.isArray(b.vd.vi))return g.reportErr(68), f.reject(68), void 0;
                for (var c = [], d = -2, e = 0; e < b.vd.vi.length; e++)if (d = b.vd.vi[e].ch, 2 == b.vd.vi[e].st) {
                    var h = b.vd.vi[e].url.toLowerCase();
                    if (!(h.indexOf(".mp4") < 0 && h.indexOf(".m3u8") < 0) && b.vd.vi[e].url) {
                        var i = b.vd.vi[e];
                        c.push(i.url);
                        break
                    }
                }
                return 0 == c.length ? (g.reportErr(68), f.reject(68, d), void 0) : (g.reportSuc(), f.resolve(c[0], b.vd), void 0)
            }).fail(function () {
                g.reportErr(), f.reject(500, 3)
            }), f
        }, load3GVideoUrl: function (b) {
            b.fmt = "msd", a.h5Helper.loadVideoUrlByVid(b)
        }, loadIsUseHLS: function (c) {
            var d = {}, f = b.Deferred();
            b.extend(b.extend(d, e), c);
            var g = new a.RetCode(100125);
            return g.begin(), b.ajax({url: "http://vv.video.qq.com/getdtype?callback=?&" + b.param({vids: d.vid, platform: d.platform, otype: "json", _rnd: (new Date).valueOf()}), dataType: "jsonp"}).done(function (a) {
                var d = 1;
                if ("object" != b.type(a))return g.reportErr(), f.reject(500, 4), void 0;
                if ("o" != a.s || !b.isArray(a.dl) || 0 == a.dl.length)return g.reportErr(a.em), f.reject(a.em || 50), void 0;
                for (var e = 0, h = a.dl.length; h > e; e++)a.dl[e].vid === c.vid && (d = a.dl[e].dltype);
                g.reportSuc(), f.resolve(d, a)
            }).fail(function () {
                g.reportErr(), f.reject(500, 4)
            }), f
        }, loadSRT: function (a) {
            var c = {}, d = b.Deferred();
            return b.extend(b.extend(c, e), a), b.ajax({url: "http://vv.video.qq.com/getsurl?" + b.param({vid: c.vid, format: c.sflid, platform: c.platform, pid: c.pid, otype: "json", _rnd: (new Date).valueOf()}), dataType: "jsonp"}).done(function (a) {
                return"object" != b.type(a) ? (d.reject(500), void 0) : "o" != a.s ? (d.reject(isNaN(a.em) ? 500 : a.em, a.msg || ""), void 0) : (d.resolve(a), void 0)
            }).fail(function () {
                d.reject(500)
            }), d
        }}
    }(tvp, tvp.$), function (a, b) {
        a.BasePlayer = function () {
            this.modId = "", this.sessionId = "", this.$mod = null, this.videomod = null, this.playerid = "", this.curVideo = null, this.instance = null, this.dataset = {}, this.eventList = ["inited", "play", "playing", "ended", "allended", "pause", "timeupdate", "getnext", "error", "stop", "fullscreen", "change", "write", "flashpopup", "getnextenable", "msg"], this.config = {}, this.hijackFun = ["getPlayer", "getCurVideo", "showPlayer", "hidePlayer", "play", "pause", "getPlaytime", "setPlaytime", "getPlayerType", "resize"], this.prototype = {}, function (b) {
                var c = ["init", "addParam", "write", "setPlayerReady"];
                c = c.concat(b.hijackFun);
                for (var d = 0, e = c.length; e > d; d++)b.prototype[c[d]] = a.$.noop
            }(this), this.addParam = function (a, b) {
                this.config[a] = b
            }
        }, a.BasePlayer.prototype = {setCurVideo: function (a) {
            this.curVideo = a
        }, getPlayer: function () {
            return null
        }, getCurVideo: function () {
            return this.curVideo
        }, getCurVid: function () {
            return this.curVideo instanceof a.VideoInfo ? this.curVideo.getVid() : ""
        }, getCurVidList: function () {
            return this.curVideo instanceof a.VideoInfo ? this.curVideo.getVidList() : ""
        }, init: function (c) {
            b.extend(this.config, c);
            for (var d = 0, e = this.eventList.length; e > d; d++) {
                var f = "on" + this.eventList[d];
                this[f] = b.isFunction(this.config[f]) ? this.config[f] : a.$.noop
            }
            this.setCurVideo(this.config.video), this.write(this.config.modId)
        }, write: function (a) {
            b("#" + a).html("here is player of base")
        }, log: function (a) {
            window.console && window.console.log(a)
        }, getCBEvent: function (c) {
            var d = void 0;
            return this.instance && b.isFunction(this.instance[c]) && this.instance[c] != a.$.noop ? d = this.instance[c] : b.isFunction(this[c]) && this[c] != a.$.noop && (d = this[c]), d
        }, callCBEvent: function (a) {
            var c = this.getCBEvent(a);
            if (b.isFunction(c)) {
                var d = Array.prototype.slice.call(arguments, 1);
                return c.apply(this, d)
            }
            return void 0
        }, resize: function (a, c) {
            var d = this.getPlayer();
            d && (d.style.width = b.formatSize(a), d.style.height = b.formatSize(c))
        }, showPlayer: function () {
            var a = this.getPlayer();
            a && (a.style.position = "relative", a.style.left = "-200%")
        }, hidePlayer: function () {
            var a = this.getPlayer();
            a && (a.style.position = "static", a.style.left = "0px")
        }}
    }(tvp, tvp.$), function (a, b) {
        a.BaseHtml5 = function () {
            this.protectedFn = {}, this.h5EvtAdapter = {}, this.eventList = this.eventList.concat(["html5error"]), this.html5AttrList = {autoplay: "autoplay", "x-webkit-airplay": "isHtml5UseAirPlay"}, this.$videomod = null
        }, a.BaseHtml5.fn = a.BaseHtml5.prototype = new a.BasePlayer, b.extend(a.BaseHtml5.fn, {getPlayer: function () {
            return this.videoTag
        }, getPlayerType: function () {
            return"html5"
        }, createVideoHtml: function () {
            this.playerid = this.config.playerid, this.playerid || (this.playerid = "tenvideo_video_player_" + a.BaseHtml5.maxId++);
            var c = ['<video id="', this.playerid, '" width="100%" height="100%" '].join("");
            this.config.isHTML5UseUI && (b.os.iphone || b.os.ipod) && this.config.isIOSVideoOffset && (c += 'style="position:absolute;top:-200%"');
            for (var d in this.html5AttrList) {
                c += " ";
                var e = this.html5AttrList[d], f = "";
                if ("" == e)f = ""; else {
                    if (!(e in this.config))continue;
                    f = this.config[e]
                }
                f !== !1 && "disabled" != f && 0 !== f && (c += d, "autoplay" != d || 1 != f ? "" != f && (c += ["=", f].join("")) : c += '="autoplay"')
            }
            this.isUseControl && (c += " controls ");
            var g = this.curVideo.getPoster();
            return b.isString(g) && g.length > 0 && -1 == b.inArray("posterlayer", this.config.html5VodUIFeature) && (c += " poster='" + g + "'"), c += "></video>"
        }, write: function (c) {
            var d = null;
            if ("object" == b.type(c) && 1 == c.nodeType ? (d = c, this.$mod = b(c), this.modId = this.$mod.attr("id") || "") : (d = a.$.getByID(c), this.modId = c, this.$mod = b("#" + c)), d) {
                var e = this.createVideoHtml(), f = "mod_" + this.playerid;
                d.innerHTML = '<div id="' + f + '">' + e + "</div>", this.videomod = b.getByID(f), this.$videomod = b(this.videomod), this.$videomod.width(b.formatSize(this.config.width)).height(b.formatSize(this.config.height)), this.videoTag = b.getByID(this.playerid), this.$video = b(this.videoTag), this.registerMonitor(), this.bindEventAdapt()
            }
        }, resize: function (a, c) {
            this.$videomod.width(b.formatSize(a)).height(b.formatSize(c))
        }, showError: function (c, d, e) {
            var f = this;
            setTimeout(function () {
                var g = f.getCBEvent("showError");
                if (b.isFunction(g) && g != f.showError)g.call(f, c, d, e); else if (b.isFunction(f.config.showError))f.config.showError.call(f, c, d, e); else {
                    var h = a.html5skin.defaultError, i = f.playerid + "_errtips_inner";
                    d = d || "", h = h.replace("$ERROR-TIPS-INNER$", i).replace("$ERROR-MSG$", e || a.html5lang.getErrMsg(c, d) || "\u64ad\u653e\u89c6\u9891\u51fa\u9519").replace("$ERROR-DETAIL$", d ? "\u9519\u8bef\u7801:" + c + "(" + d + ")" : "");
                    var j = b(f.videomod), k = b(h).appendTo(j).show();
                    j.html(""), k.appendTo(j)
                }
            }, 250), this.callCBEvent("onerror", c, d)
        }, isUseH5UIFeature: function (a) {
            return b.inArray(a, this.config.html5VodUIFeature) >= 0
        }, isForbiddenH5UIFeature: function (a) {
            return b.inArray(a, this.config.html5ForbiddenUIFeature) >= 0
        }, callProtectFn: function (a) {
            b.isFunction(this.protectedFn[a]) && this.protectedFn[a].call(this)
        }, registerMonitor: function () {
            b.isFunction(this.buildmonitor) && this.buildmonitor.call(this)
        }, bindEventAdapt: function () {
            var a = ["-empty", "-abort", "-loadstart", "-can-play", "-can-play-through", "-loaded-data", "-loaded-metadata", "-abort", "-error", "-pause", "-paused", "-waiting", "-stalled", "-suspend", "-play", "-volume-change", "-playing", "-seeked", "-seeking", "-duration-change", "-progress", "-rate-change", "-timeupdate", "-ended"], c = this;
            b.each(a, function (a, d) {
                var e = "on" + b.camelCase(d), f = c.h5EvtAdapter[e];
                b.isFunction(f) && c.$video.on(d.replace(/-/g, ""), function (a) {
                    var d = c.h5EvtAdapter[e];
                    b.isFunction(d) && d.call(c, this, a)
                })
            })
        }}), a.BaseHtml5.maxId = 0
    }(tvp, tvp.$), function (a, b) {
        a.BaseFlash = function () {
            this.swfPathRoot = "http://imgcache.qq.com/tencentvideo_v1/player/", this.flashobj = null, this.flashVarsKeyMapToCfg = {}
        }, "number" != typeof a.BaseFlash.maxId && (a.BaseFlash.maxId = 0), a.BaseFlash.prototype = new a.BasePlayer, b.extend(a.BaseFlash.prototype, {getFlashVar: function () {
            return""
        }, getFlashVarVal: function () {
            var a = {}, c = this.config;
            return b.each(this.flashVarsKeyMapToCfg, function (d, e) {
                var f = e;
                if (f in c) {
                    var g = b.type(c[f]);
                    "boolean" == g ? a[d] = c[f] ? 1 : 0 : ("number" == g || "string" === g) && (a[d] = c[f])
                } else a[d] = ""
            }), a
        }, getFlashSwfUrl: function () {
            var c = "";
            if (this.config.type == a.PLAYER_DEFINE.LIVE)b.isString(this.config.liveFlashUrl) && this.config.liveFlashUrl.length > 0 ? c = this.config.liveFlashUrl : (c = this.swfPathRoot + this.config.liveFlashSwfType.replace(/[^\w+]/gi, "") + ".swf", c += "?max_age=86400&v=20121230"); else {
                b.isString(this.config.vodFlashUrl) && this.config.vodFlashUrl.length > 0 ? c = this.config.vodFlashUrl : (c = this.swfPathRoot + this.config.vodFlashType.replace(/[^\w+]/gi, "") + ".swf", c += "?max_age=86400&v=20121230");
                var d = navigator.userAgent;
                d.indexOf("Maxthon") > 0 && d.indexOf("Chrome") > 0 && (c += (c.indexOf("?") > 0 ? "&" : "?") + "_=" + a.$.now())
            }
            if (c = b.filterXSS(c), "undefined" != typeof window.console && b.isFunction(window.console.warn) && c.indexOf("TencentPlayer.swf") > 0 && -1 == b.inArray(document.location.hostname, ["v.qq.com", "film.qq.com"])) {
                var e = "\u60a8\u5f53\u524d\u4f7f\u7528\u7684flash\u64ad\u653e\u5668\u662f\u817e\u8baf\u89c6\u9891\u5b98\u7f51\u4e13\u7528\u7248\uff0c\u5982\u65e0\u5fc5\u8981\u8bf7\u4f7f\u7528\u5916\u8d34\u7248\u672c";
                b.browser.chrome ? window.console.warn("%c" + e, "background: rgba(252,234,187,1)") : window.console.warn(e)
            }
            return c
        }, getFlashHTML: function () {
            var a = this.getFlashVar(), c = this.getFlashSwfUrl(), d = b.formatSize(this.config.width), e = b.formatSize(this.config.height);
            this.playerid = this.config.playerid ? this.config.playerid : "tenvideo_flash_player_" + (new Date).getTime();
            var f = ['<param name="allowScriptAccess" value="always" />', '<param name="movie" value="' + c + '" />', '<param name="quality" value="high" />', '<param name="allowFullScreen" value="true"/>', '<param name="play" value="true" />', '<param name="wmode" value="' + b.filterXSS(this.config.flashWmode) + '" />', '<param name="flashvars" value="' + a + '"/>', '<param name="type" value="application/x-shockwave-flash" />', '<param name="pluginspage" value="http://get.adobe.com/cn/flashplayer/" />'].join("\n"), g = "";
            return b.browser.ie ? (g += 11 == b.browser.version ? '<object data="' + c + '" type="application/x-shockwave-flash" width="' + d + '" height="' + e + '" id="' + this.playerid + '">\n' : '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="' + d + '" height="' + e + '" id="' + this.playerid + '">\n', g += f, g += '	<div id="tvp_flash_install" style="line-height:' + e + ';background:#000000;text-align:center"><a href="http://www.adobe.com/go/getflashplayer" target="_blank" style="color:#ffffff;font-size:14px;padding:10px;">\u70b9\u51fb\u6b64\u5904\u5b89\u88c5\u64ad\u653e\u89c6\u9891\u9700\u8981\u7684flash\u63d2\u4ef6</a></div>\n', g += "</object>") : g += '<embed wmode="' + b.filterXSS(this.config.flashWmode) + '" flashvars="' + a + '" src="' + c + '" quality="high" name="' + this.playerid + '" id="' + this.playerid + '" bgcolor="#000000" width="' + d + '" height="' + e + '" align="middle" allowScriptAccess="always" allowFullScreen="true"  type="application/x-shockwave-flash" pluginspage="http://get.adobe.com/cn/flashplayer/"></embed>', g
        }, write: function (c) {
            var d = null;
            if ("object" == b.type(c) && 1 == c.nodeType ? (d = c, this.$mod = b("#" + c.id), this.modId = this.$mod.attr("id") || "") : (d = a.$.getByID(c), this.modId = c, this.$mod = b(d)), d) {
                var e = this.getFlashHTML(), f = "mod_" + this.playerid;
                d.innerHTML = '<div id="' + f + '">' + e + "</div>", this.flashobj = b.browser.ie ? document.getElementById(this.playerid) : document.embeds[this.playerid], this.videomod = b.getByID(f);
                var g = this.config.height + "", h = b.getByID("tvp_flash_install");
                g.indexOf("%") > 0 && h && (h.style.lineHeight = d.offsetHeight)
            }
        }, getPlayer: function () {
            return this.flashobj
        }})
    }(tvp, tvp.$), function (a, b) {
        function c(c, d) {
            this.config.width = a.$.filterXSS(c), this.config.height = a.$.filterXSS(d), this.videoTag = null, this.$video = null, this.protectedFn = {}, this.isUseControl = !0, b.extend(this.h5EvtAdapter, {onError: function (a, b) {
                var c = -1;
                b.target && b.target.error && (c = b.target.error.code), this.callCBEvent("onerror", 0, c)
            }})
        }

        var d = !1;
        c.fn = c.prototype = new a.BaseHtml5, b.extend(c.fn, {write: function (b) {
            a.BaseHtml5.prototype.write.call(this, b), this.callProtectFn("onwrite"), this.callCBEvent("onwrite"), this.play(this.curVideo, this.config.autoplay)
        }, play: function (c, e) {
            if (!this.videoTag)throw new Error("\u672a\u627e\u5230\u89c6\u9891\u64ad\u653e\u5668\u5bf9\u8c61\uff0c\u8bf7\u786e\u8ba4<video>\u6807\u7b7e\u662f\u5426\u5b58\u5728");
            if (!c instanceof a.VideoInfo)throw new Error("\u4f20\u5165\u7684\u5bf9\u8c61\u4e0d\u662ftvp.VideoInfo\u7684\u5b9e\u4f8b");
            b.isUndefined(e) && (e = !0), this.setCurVideo(c);
            var f = c.getChannelId(), g = a.$.createGUID(), h = "http://zb.v.qq.com:1863/?progid=" + f + "&ostype=ios&rid=" + encodeURIComponent(g);
            this.videoTag.src = h, this.$video.trigger("tvp:video:src"), d || (d = !0, this.callCBEvent("oninited")), this.videoTag.pause(), e && (this.videoTag.load(), this.videoTag.play()), this.callCBEvent("onchange", this.curVideo.getChannelId())
        }}), a.Html5LiveTiny = c, a.Html5LiveTiny.maxId = 0
    }(tvp, tvp.$), function (a, b) {
        function c(c, d) {
            this.isUseControl = !1, this.config.width = a.$.filterXSS(c), this.config.height = a.$.filterXSS(d), this.control = null, this.$UILayer = null;
            var e = this;
            b.extend(this.protectedFn, {onwrite: function () {
                this.control = new a.Html5UI(e), this.control.feature = this.config.html5LiveUIFeature, this.control.init(), this.$UILayer = this.control.$UILayer
            }})
        }

        c.fn = c.prototype = new a.Html5LiveTiny, b.extend(c.prototype, {createVideoHtml: function () {
            var b = a.Html5LiveTiny.prototype.createVideoHtml.call(this), c = a.html5skin.getHtml(this.config);
            return c.replace("$VIDEO$", b)
        }}), a.Html5Live = c
    }(tvp, tvp.$), function (a, b) {
        a.FlashLivePlayer = function (c, d) {
            var e = this;
            a.BaseFlash.maxId++, this.flashVarsKeyMapToCfg = {showcfg: "isLiveFlashShowCfg", loadingswf: "loadingswf", share: "share", oid: "oid", apptype: "liveFlashAppType", full: "isLiveflashShowFullBtn", wmark: "liveFlashWatermark", autoplay: "autoplay"}, this.swfPathRoot = "http://imgcache.qq.com/minivideo_v1/vd/res/", this.config.width = b.filterXSS(c), this.config.height = b.filterXSS(d), this.loginResponse = function () {
                this.flashobj && "function" != typeof this.flashobj.loginCallback || (this.flashobj.loginCallback(a.FlashLivePlayer.flashloginParam), a.FlashLivePlayer.flashloginParam = {})
            }, window.playerInit = function () {
                e.callCBEvent("oninited"), e.callCBEvent("onplay", e.curVideo.getChannelId())
            }
        }, a.FlashLivePlayer.prototype = new a.BaseFlash, b.extend(a.FlashLivePlayer.prototype, {getChannelURl: function (a) {
            return"http://zb.v.qq.com:1863/?progid=" + a
        }, getPlayerType: function () {
            return"liveflash"
        }, getFlashVar: function () {
            var c = "", d = "TenVideo_FlashLive_", e = this.getFlashVarVal(), f = "";
            c += "vid=" + this.curVideo.getChannelId(), c += "&vurl=" + this.getChannelURl(this.curVideo.getChannelId()), c += "&sktype=" + (this.curVideo.getIsLookBack() ? "vod" : "live"), f = "&", c += f, c += "funCnlInfo=" + d + "GetChannelInfo", c += "&funTopUrl=" + d + "GetTopUrl", c += "&funLogin=" + d + "IsLogin", c += "&funOpenLogin=" + d + "OpenLogin", c += "&funSwitchPlayer=" + d + "SwitchPlayer", b.each(e, function (a, d) {
                (b.isString(d) && d.length > 0 || "number" == b.type(d)) && (c += "&" + a + "=" + b.filterXSS(d))
            });
            for (var g in this.config.liveFlashExtVars)c += ["&", encodeURIComponent(g), "=", encodeURIComponent(this.config.liveFlashExtVars[g])].join("");
            return c += "&p=" + a.livehub.g_flashp2p || 0
        }, play: function (b) {
            if (this.flashobj) {
                if (b = b || this.curVideo, !b instanceof a.VideoInfo)throw new Error("\u4f20\u5165\u7684\u5bf9\u8c61\u4e0d\u662ftvp.VideoInfo\u7684\u5b9e\u4f8b");
                var c = !!b.getIsLookBack(), d = b.getChannelId(), e = this.getChannelURl(d), f = a.livehub.g_flashp2p || 0;
                "" != d && ("undefined" != typeof this.flashobj.setSkinType && this.flashobj.setSkinType(c ? "vod" : "live"), "undefined" != typeof this.flashobj.loadAndPlayVideoFromVID && this.flashobj.loadAndPlayVideoFromVID(e, d, b.getLiveReTime() || "", "", f), this.callCBEvent("onplay", b.getChannelId()), this.setCurVideo(b), this.callCBEvent("onchange", b.getChannelId()))
            }
        }, stop: function () {
            this.flashobj && (b.isUndefined(this.flashobj.stopVideo) || this.flashobj.stopVideo())
        }}), a.FlashLivePlayer.ADTYPE = {WEI_DIAN_TAI: "weidiantai", WEI_DIAN_SHI: "weidianshi", LIVE: "live", IN_LIVE: "inlive"}, window.TenVideo_FlashLive_GetChannelInfo = function () {
            return a.livehub.g_curCnlInfo
        }, window.TenVideo_FlashLive_GetTopUrl = function () {
            var a = "";
            try {
                a = top.location.href
            } catch (b) {
                a = document.location.href
            }
            return a
        }, window.TenVideo_FlashLive_IsLogin = function () {
            return a.common.getUin() > 1e4
        }, window.TenVideo_FlashLive_OpenLogin = function (b) {
            a.FlashLivePlayer.flashloginParam = b || {}, a.common.openLogin()
        }, window.TenVideo_FlashLive_SwitchPlayer = b.noop
    }(tvp, tvp.$), function (a, b) {
        a.livehub = {g_isFiveCity: !1, g_lookback: !1, g_flashp2p: !1, iretcode: 0, g_curCnlInfo: {}, checkUserArea: function () {
            return!1
        }, FlashChecker: function () {
            var c = this;
            this.cnlId = "", this.extParam = {}, this.onError = b.noop, this.onCanFlash = b.noop, this.onCanHTML5 = b.noop, this.onCanOCX = b.noop, this.onComplete = b.noop, this.onGetCnlId = b.noop, this.onSuccess = function (d) {
                "object" != b.type(d) || b.isUndefined(d.ret) || 0 != d.ret ? c.onError(500) : (b.isUndefined(d.isfivecity) && (a.livehub.g_isFiveCity = d.isfivecity), a.livehub.iretcode = d.iretcode, a.livehub.g_flashp2p = +d.flashp2p || 0, a.debug("get channel info:cnlid=" + d.progid + ",lookback=" + d.lookback + ",isflash=" + d.flash + ",flashp2p=" + d.flashp2p), c.cnlId = "" + d.progid || "", c.onGetCnlId("" + c.cnlId, !!d.lookback), a.livehub.getCurChannelInfo(c.cnlId, c.extParam), 1 == d.flash ? (a.livehub.g_lookback = !!d.lookback, c.onCanFlash(c.cnlId)) : a.common.isUseHtml5() ? c.onCanHTML5(c.cnlId) : b.os.windows ? c.onCanOCX(c.cnlId) : c.onError(d.iretcode))
            }, this.send = function () {
                var d = {cnlid: c.cnlId || "", area: a.livehub.checkUserArea() ? 1 : 0, qq: a.common.getUin(), ios: a.common.isUseHtml5() ? 1 : 0}, e = {debug: "", key: "", ip: ""};
                b.each(e, function (a) {
                    e[a] = b.getUrlParam(a)
                }), b.extend(d, e), b.extend(d, this.extParam), b.ajax({type: "GET", url: "http://zb.s.qq.com/getproginfo.fcgi", data: d, dataType: "jsonp", error: function () {
                    c.onError(), c.onComplete()
                }, success: function (a) {
                    c.onSuccess(a), c.onComplete()
                }})
            }
        }, getCurChannelInfo: function (c, d) {
            var e = a.livehub.g_curCnlInfo;
            d && "object" == b.type(d) ? (e.cnlId = d.cnlId, d.channelname && (e.cnlName = d.channelname), d.currentname && d.currenttime && (e.prmInfo = d.currenttime + "|" + d.currentname)) : e = {}
        }}
    }(tvp, tvp.$), function (a, b) {
        function c() {
            if ("object" === b.type(m) && b.isFunction(m.done))return m;
            switch (null === m && (m = b.Deferred()), k.playerType) {
                case"flash":
                    l = "FlashPlayer";
                    break;
                case"html5":
                    h();
                    break;
                case"ocx":
                    l = "OcxPlayer";
                    break;
                case"mp4":
                    l = "MP4Link";
                    break;
                default:
                    d()
            }
            return m.resolve(), m
        }

        function d() {
            return a.common.isEnforceMP4() ? (l = "MP4Link", void 0) : (a.common.isUseHtml5() ? h() : l = b.os.android && b.os.getNumVersion() >= 4 ? "MP4Link" : "FlashPlayer", void 0)
        }

        function e(c) {
            if (c.getChannelId()) {
                var d = c.getChannelId();
                if ("object" == b.type(n[d]) && b.isFunction(n[d].done))return n[d];
                n[d] = b.Deferred();
                var e = new a.livehub.FlashChecker, h = !0;
                return e.cnlId = c.getChannelId(), e.extParam = c.getChannelExtParam(), e.onGetCnlId = function (a, b) {
                    c.setChannelId(a), c.setIsLookBack(!!b)
                }, e.onCanFlash = function () {
                    l = "FlashLivePlayer"
                }, e.onCanHTML5 = function () {
                    i()
                }, e.onCanOCX = function () {
                    l = "OcxPlayer"
                }, e.onError = function () {
                    f(), h = !1
                }, e.onComplete = function () {
                    g(), h ? n[d].resolve() : n[d].reject()
                }, e.send(), n[d]
            }
        }

        function f() {
            a.common.isLiveUseHTML5() ? i() : l = b.os.android ? "FlashLivePlayer" : "OcxPlayer"
        }

        function g() {
            switch (k.playerType) {
                case"flash":
                    l = "FlashLive";
                    break;
                case"html5":
                    i();
                    break;
                case"flashLive":
                    l = "FlashLivePlayer";
                    break;
                case"ocx":
                    l = "OcxPlayer"
            }
        }

        function h() {
            l = k.isHtml5UseUI ? "Html5Player" : "Html5Tiny"
        }

        function i() {
            l = k.isHtml5UseUI ? "Html5Live" : "Html5LiveTiny"
        }

        function j(c, d, e) {
            var f = {cmd: 3515, val: c, ver: a.ver.replace(/\$/g, ""), str4: navigator.userAgent, url: window != top ? document.referrer : document.location.href, str1: d, str2: a.filename || "unknown"};
            "object" == b.type(e) && b.extend(f, e), a.report(f)
        }

        var k = {}, l = "FlashPlayer", m = null, n = {}, o = function (d) {
            function f() {
                function c() {
                    if (!f) {
                        f = !0;
                        var b = new a[l];
                        b.init(d), g.resolve(b)
                    }
                }

                var e = null, f = !1;
                l === playerArray[5] && b.isString(d.HTML5CSSName) && d.HTML5CSSName.length > 0 ? (e = setTimeout(function () {
                    l = playerArray[3], c()
                }, 5e3), b.loadCss(k.cssPath + d.HTML5CSSName).done(function () {
                    clearTimeout(e), e = null, c()
                })) : c()
            }

            var g = b.Deferred(), h = this, i = ["\u672a\u6307\u660e\u64ad\u653e\u5668\u5185\u6838", "\u60a8\u5f53\u524d\u4f7f\u7528\u7684\u7edf\u4e00\u64ad\u653e\u5668JS\u6587\u4ef6\u4e0d\u5305\u542b\u6307\u5b9a\u7684\u64ad\u653e\u5668\u5185\u6838", "video\u672a\u521d\u59cb\u5316"];
            if (playerArray = ["FlashPlayer", "FlashLivePlayer", "MP4Link", "Html5Tiny", "Html5LiveTiny", "Html5Player", "OcxPlayer"], b.extend(k, d), b.isUndefined(d.isHTML5UseUI) || (k.isHtml5UseUI = d.isHTML5UseUI), !d.video instanceof a.VideoInfo)throw new Error(i[2]);
            return b.when(d.type == a.PLAYER_DEFINE.VOD ? c() : e(d.video)).then(function () {
                if (!l)throw new Error(i[0]);
                if (b.inArray(l, playerArray) < 0)throw new Error(i[1]);
                if ("function" != typeof a[l]) {
                    var c = "http://imgcache.gtimg.cn/tencentvideo_v1/tvp/js/", d = l.toLowerCase();
                    "OcxPlayer" == l && "undefined" != typeof QQLive && "undefined" != typeof QQLive.DEFINE && (d = "ocxplayerlite");
                    var e = c + "module/" + d + ".js?max_age=86400&v=20140109", g = new a.RetCode(100123);
                    g.begin(), b.getScript(e, function () {
                        if ("function" != typeof a[l])throw g.reportErr(11), new Error(i[1]);
                        g.reportSuc(), f.call(h)
                    })
                } else f.call(h)
            }), g
        };
        a.create = o;
        var p = {player: "playerType", showcfg: ["isVodFlashShowCfg", "isLiveFlashShowCfg"], searchbar: ["isVodFlashShowSearchBar"], showend: ["isVodFlashShowEnd"], tpid: ["typeId"], cid: ["coverId"], flashshownext: ["isVodFlashShowNextBtn"], loadingswf: "loadingswf", wmode: "flashWmode", flashskin: ["vodFlashSkin"], extvars: ["vodFlashExtVars"], swftype: ["vodFlashType"], swfurl: ["vodFlashUrl", "liveFlashUrl"]};
        a.Player = function (c, d) {
            this.sessionId = b.createGUID(), j(1, this.sessionId), this.instance = null, this.config = {}, this._oldcfg = {}, b.extend(this.config, a.defaultConfig), this.setting("width", c), this.setting("height", d)
        }, a.Player.fn = a.Player.prototype = new a.BasePlayer, b.extend(a.Player.fn, {setting: function (a, b) {
            this.config[a] = b
        }, output: function (a) {
            this.setting("modId", a), this.create(this.config)
        }, create: function (c) {
            var d = this;
            b.extend(d.config, c), j(2, this.sessionId), a.create(d.config).done(function (f) {
                try {
                    j(3, d.sessionId, {vid: f.curVideo.getFullVid(), str3: f.getPlayerType()})
                } catch (g) {
                }
                d.instance = f, d.instance.instance = d;
                for (var h in d.instance)"instance" != h && ("on" == h.substr(0, 2) && b.isFunction(d[h]) && d[h] != a.$.noop || (d[h] = d.instance[h]));
                f.callCBEvent("onwrite"), d.config.type == a.PLAYER_DEFINE.LIVE && (d.play = function (f) {
                    b.isString(f) ? (d.config.video.setChannelId(f), f = d.config.video) : f instanceof a.VideoInfo && b.when(e(f)).then(function () {
                        d.instance instanceof a[l] ? d.instance.play(f) : (c.video = f, o(c))
                    })
                }), a.Player.instance[d.playerid] = d
            }).always(function () {
                function c(a, c) {
                    try {
                        var e = "build" + a;
                        return b.isFunction(d[e]) ? (d[e].call(d, c), !0) : !1
                    } catch (f) {
                    }
                }

                if (b.each(d.config.plugins, function (a, e) {
                    if (e && a in d.config.pluginUrl) {
                        var f = b.isPlainObject(e) ? e : {};
                        if (!c(a, f)) {
                            var g = d.config.libpath + d.config.pluginUrl[a];
                            b.isString(g) && "" != b.trim(g) && b.getScript(g, function () {
                                c(a, f)
                            })
                        }
                    }
                }), window.console && _isUseInnerZepto) {
                    var e = {jQuery: "jq", Zepto: "zepto", jq: "jqmobi"};
                    for (var f in e)if ("function" == typeof window[f]) {
                        if ("jQuery" === f && "function" != typeof jQuery.Deferred)break;
                        console.warn("\n" + a.name + "\u63d0\u793a\uff1a\n\u60a8\u5f53\u524d\u9875\u9762\u4f7f\u7528\u4e86" + f + "\n\u5efa\u8bae\u60a8\u5f15\u7528" + a.name + " for " + f + "\u4e13\u7528\u7248\uff0c\u66f4\u8f7b\u66f4\u5feb\u66f4\u7cbe\u7b80\nJS\u5730\u5740:http://imgcache.gtimg.cn/tencentvideo_v1/tvp/js/tvp.player_v2_" + e[f] + ".js\n\n")
                    }
                }
            })
        }, addParam: function (a, c) {
            "config" == a && "object" == b.type(c) ? b.extend(this.config, c) : this._oldcfg[a] = c
        }, setCurVideo: function (a) {
            this.config.video = a
        }, write: function (c) {
            this.config.modId = c;
            var d = 1 == this._oldcfg.type ? 1 : 2, e = this;
            b.each(this._oldcfg, function (c, f) {
                c in p ? b.isArray(p[c]) ? 2 == d ? e.config[p[c][0]] = f : 1 == d && p[c].length >= 2 && (e.config[p[c][1]] = f) : b.isString(p[c]) && (e.config[p[c]] = f) : c in a.defaultConfig && (e.config[c] = f)
            }), delete this._oldcfg, this.create(this.config)
        }})
    }(tvp, tvp.$), tvp.Player.instance = {}, function (a) {
        a.extend(a.fn, {createTVP: function (b) {
            if (b = a.extend({}, tvp.defaultConfig, b || {}), b.video) {
                var c = null;
                b.video instanceof tvp.VideoInfo ? c = b.video : (c = new tvp.VideoInfo, c.setVid(b.video.vid)), b.video = c, this.each(function (c, d) {
                    if ("object" == a.type(d) && 1 == d.nodeType) {
                        b.modId = d;
                        var e = new tvp.Player;
                        e.create(b)
                    }
                })
            }
        }})
    }(tvp.$), tvp.filename = "tvp.player_v2_jq_pc_live.js", "function" == typeof define && define(function () {
        return tvp
    }), global.tvp = tvp, "undefined" != typeof QQLive && (global.QQLive = QQLive)
}(this);
/*  |xGv00|8e0d514c38d5f9a8b12d2f6ade93f18e */