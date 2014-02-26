/*!
 * jsUri
 * https://github.com/derek-watson/jsUri
 *
 * Copyright 2012, Derek Watson
 * Released under the MIT license.
 *
 * Includes parseUri regular expressions
 * http://blog.stevenlevithan.com/archives/parseuri
 * Copyright 2007, Steven Levithan
 * Released under the MIT license.
 *
 */

/**
 * Copyright (C) 2010-2012 Wandenberg Peixoto <wandenberg@gmail.com>, Rogério Carvalho Schneider <stockrt@gmail.com>
 *
 * This file is part of Nginx Push Stream Module.
 *
 * Nginx Push Stream Module is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Nginx Push Stream Module is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Nginx Push Stream Module.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * pushstream.js
 *
 * Created: Nov 01, 2011
 * Authors: Wandenberg Peixoto <wandenberg@gmail.com>, Rogério Carvalho Schneider <stockrt@gmail.com>
 */

require.config({baseUrl: Y.jsBaseUrl, paths: {"jquery.lazyload": "lib/jquery.lazyload-1.8.4-min", "jquery.touchswap": "lib/jquery.touchswap-1.6.3-min", juicer: "lib/juicer-0.6.5", cookie: "modules/util/cookie", prober: "modules/util/prober", dialog: "modules/widget/dialog/dialog", loginBox: "modules/yinyuetai/loginbox", ajax: "modules/util/ajax", ajaxform: "modules/util/ajaxform", uri: "lib/Uri.min", pushstream: "lib/pushstream", store: "lib/store-1.3.9-min", alertify: "modules/widget/alertify", swfobject: "lib/swfobject-2.0-min", page: "modules/yinyuetai/page", drag: "modules/interaction/drag", scrollbar: "modules/widget/tinyscrollbar", pwdencrypt: "modules/yinyuetai/passwordencrypt", user: "modules/yinyuetai/user/user", impress: "modules/widget/impress"}, shim: {juicer: {exports: "juicer"}, uri: {exports: "Uri"}, pushstream: {exports: "PushStream"}, swfobject: {exports: "swfobject"}, impress: {exports: "impress"}}}), function () {
    function r(t, n) {
        var r, i, s, o, u, a, f, l;
        s = {}, o = n ? e : function (e) {
            return e
        }, u = t.split(/;\s/g);
        for (r = 0, i = u.length; r < i; r++) {
            l = u[r].match(/([^=]+)=/i);
            if (l instanceof Array)try {
                a = e(l[1]), f = o(u[r].substring(l[1].length + 1))
            } catch (c) {
            } else a = e(u[r]), f = "";
            a && (s[a] = f)
        }
        return s
    }

    function i(e) {
        if (!e || !e.length)throw new TypeError("Cookie name must be a non-empty string")
    }

    var e, t, n = {};
    e = decodeURIComponent, t = encodeURIComponent, n.get = function (e, t) {
        var n, s, o;
        return i(e), t = t || {}, o = t.raw || !1, s = t.converter || function (e) {
            return e
        }, n = r(document.cookie, !o), s(n[e])
    }, n.set = function (e, n, r) {
        var s, o, u, a, f;
        return i(e), r = r || {}, s = r.expires, o = r.domain, u = r.path, r.raw || (n = t(String(n))), a = e + "=" + n, f = s, typeof f == "number" && (f = new Date, f.setDate(f.getDate() + s)), f instanceof Date && (a += "; expires=" + f.toUTCString()), o && o.length && (a += "; domain=" + o), u && u.length && (a += "; path=" + u), r.secure && (a += "; secure"), document.cookie = a, a
    }, n.remove = function (e, t) {
        return t = t || {}, t.expires = new Date(0), this.set(e, "", t)
    };
    var s = navigator.userAgent.toLowerCase(), o = /iphone/i.test(s), u = /android/i.test(s), a = location.href, f = location.search, l = location.pathname, c = f.indexOf("frompc") === -1;
    if (l === "/") {
        if (u || o) {
            var h = n.get("isReadWap");
            h || (n.set("isReadWap", "yes", {domain: "yinyuetai.com", path: "/"}), location.href = "http://partner.yinyuetai.com/pop")
        }
    } else if (l.indexOf("/video/") == 0 && c) {
        if (o || u)location.href = a.replace(/\/video\//, "/wap/video/")
    } else l.indexOf("/playlist/") == 0 && c && (o || u) && (location.href = a.replace(/\/playlist\//, "/wap/playlist/"));
    Y.isLoadByPartner = function () {
        var e = !1;
        try {
            window.parent != window.self && window.parent.document && window.parent.Y && window.parent.Y.jsBaseUrl && (e = !0)
        } catch (t) {
        }
        return e
    }()
}(), define("common", function () {
}), define("cookie", ["require", "exports", "module"], function (e, t) {
    function i(e, t) {
        var r, i, s, o, u, a, f, l;
        s = {}, o = t ? n : function (e) {
            return e
        }, u = e.split(/;\s/g);
        for (r = 0, i = u.length; r < i; r++) {
            l = u[r].match(/([^=]+)=/i);
            if (l instanceof Array)try {
                a = n(l[1]), f = o(u[r].substring(l[1].length + 1))
            } catch (c) {
            } else a = n(u[r]), f = "";
            a && (s[a] = f)
        }
        return s
    }

    function s(e) {
        if (!e || !e.length)throw new TypeError("Cookie name must be a non-empty string")
    }

    var n, r;
    n = decodeURIComponent, r = encodeURIComponent, t.get = function (e, t) {
        var n, r, o;
        return s(e), t = t || {}, o = t.raw || !1, r = t.converter || function (e) {
            return e
        }, n = i(document.cookie, !o), r(n[e])
    }, t.set = function (e, t, n) {
        var i, o, u, a, f;
        return s(e), n = n || {}, i = n.expires, o = n.domain, u = n.path, n.raw || (t = r(String(t))), a = e + "=" + t, f = i, typeof f == "number" && (f = new Date, f.setDate(f.getDate() + i)), f instanceof Date && (a += "; expires=" + f.toUTCString()), o && o.length && (a += "; domain=" + o), u && u.length && (a += "; path=" + u), n.secure && (a += "; secure"), document.cookie = a, a
    }, t.remove = function (e, t) {
        return t = t || {}, t.expires = new Date(0), this.set(e, "", t)
    }
}), function (e) {
    function t(e) {
        return e = decodeURIComponent(e), e = e.replace("+", " "), e
    }

    function n(e) {
        var t = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, n = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"], r = t.exec(e || ""), i = {};
        return n.forEach(function (e, t) {
            i[e] = r[t] || ""
        }), i
    }

    function r(e) {
        var t, n, r, i, s, o, u = [];
        if (typeof e == "undefined" || e === null || e === "")return u;
        e.indexOf("?") === 0 && (e = e.substring(1)), n = e.toString().split(/[&;]/);
        for (t = 0; t < n.length; t++)r = n[t], i = r.split("="), s = i[0], o = r.indexOf("=") === -1 ? null : i[1] === null ? "" : i[1], u.push([s, o]);
        return u
    }

    function i(e) {
        this.uriParts = n(e), this.queryPairs = r(this.uriParts.query), this.hasAuthorityPrefixUserPref = null
    }

    Array.prototype.forEach || (Array.prototype.forEach = function (e, t) {
        for (var n = 0, r = this.length; n < r; ++n)e.call(t || this, this[n], n, this)
    }), ["protocol", "userInfo", "host", "port", "path", "anchor"].forEach(function (e) {
        i.prototype[e] = function (t) {
            return typeof t != "undefined" && (this.uriParts[e] = t), this.uriParts[e]
        }
    }), i.prototype.hasAuthorityPrefix = function (e) {
        return typeof e != "undefined" && (this.hasAuthorityPrefixUserPref = e), this.hasAuthorityPrefixUserPref === null ? this.uriParts.source.indexOf("//") !== -1 : this.hasAuthorityPrefixUserPref
    }, i.prototype.query = function (e) {
        var t = "", n, i;
        typeof e != "undefined" && (this.queryPairs = r(e));
        for (n = 0; n < this.queryPairs.length; n++)i = this.queryPairs[n], t.length > 0 && (t += "&"), i[1] === null ? t += i[0] : (t += i[0], t += "=", i[1] && (t += encodeURIComponent(i[1])));
        return t.length > 0 ? "?" + t : t
    }, i.prototype.getQueryParamValue = function (e) {
        var n, r;
        for (r = 0; r < this.queryPairs.length; r++) {
            n = this.queryPairs[r];
            if (t(e) === t(n[0]))return n[1]
        }
    }, i.prototype.getQueryParamValues = function (e) {
        var n = [], r, i;
        for (r = 0; r < this.queryPairs.length; r++)i = this.queryPairs[r], t(e) === t(i[0]) && n.push(i[1]);
        return n
    }, i.prototype.deleteQueryParam = function (e, n) {
        var r = [], i, s, o, u;
        for (i = 0; i < this.queryPairs.length; i++)s = this.queryPairs[i], o = t(s[0]) === t(e), u = t(s[1]) === t(n), (arguments.length === 1 && !o || arguments.length === 2 && !o && !u) && r.push(s);
        return this.queryPairs = r, this
    }, i.prototype.addQueryParam = function (e, t, n) {
        return arguments.length === 3 && n !== -1 ? (n = Math.min(n, this.queryPairs.length), this.queryPairs.splice(n, 0, [e, t])) : arguments.length > 0 && this.queryPairs.push([e, t]), this
    }, i.prototype.replaceQueryParam = function (e, n, r) {
        var i = -1, s, o;
        if (arguments.length === 3) {
            for (s = 0; s < this.queryPairs.length; s++) {
                o = this.queryPairs[s];
                if (t(o[0]) === t(e) && decodeURIComponent(o[1]) === t(r)) {
                    i = s;
                    break
                }
            }
            this.deleteQueryParam(e, r).addQueryParam(e, n, i)
        } else {
            for (s = 0; s < this.queryPairs.length; s++) {
                o = this.queryPairs[s];
                if (t(o[0]) === t(e)) {
                    i = s;
                    break
                }
            }
            this.deleteQueryParam(e), this.addQueryParam(e, n, i)
        }
        return this
    }, ["protocol", "hasAuthorityPrefix", "userInfo", "host", "port", "path", "query", "anchor"].forEach(function (e) {
        var t = "set" + e.charAt(0).toUpperCase() + e.slice(1);
        i.prototype[t] = function (t) {
            return this[e](t), this
        }
    }), i.prototype.scheme = function () {
        var e = "";
        return this.protocol() ? (e += this.protocol(), this.protocol().indexOf(":") !== this.protocol().length - 1 && (e += ":"), e += "//") : this.hasAuthorityPrefix() && this.host() && (e += "//"), e
    }, i.prototype.origin = function () {
        var e = this.scheme();
        return this.userInfo() && this.host() && (e += this.userInfo(), this.userInfo().indexOf("@") !== this.userInfo().length - 1 && (e += "@")), this.host() && (e += this.host(), this.port() && (e += ":" + this.port())), e
    }, i.prototype.toString = function () {
        var e = this.origin();
        return this.path() ? e += this.path() : this.host() && (this.query().toString() || this.anchor()) && (e += "/"), this.query().toString() && (this.query().toString().indexOf("?") !== 0 && (e += "?"), e += this.query().toString()), this.anchor() && (this.anchor().indexOf("#") !== 0 && (e += "#"), e += this.anchor()), e
    }, i.prototype.clone = function () {
        return new i(this.toString())
    }, typeof module == "undefined" ? e.Uri = i : module.exports = i
}(this), define("uri", function (e) {
    return function () {
        var t, n;
        return t || e.Uri
    }
}(this)), define("modules/yinyuetai/secret", ["require", "exports", "module", "cookie"], function (e, t, n) {
    function o(e) {
        return g(a(m(e), e.length * 8))
    }

    function u(e) {
        var t = o(e);
        return t = t.substring(8, 24), y(t)
    }

    function a(e, t) {
        e[t >> 5] |= 128 << t % 32, e[(t + 64 >>> 9 << 4) + 14] = t;
        var n = 1732584193, r = -271733879, i = -1732584194, s = 271733878;
        for (var o = 0; o < e.length; o += 16) {
            var u = n, a = r, f = i, v = s;
            n = l(n, r, i, s, e[o + 0], 7, -680876936), s = l(s, n, r, i, e[o + 1], 12, -389564586), i = l(i, s, n, r, e[o + 2], 17, 606105819), r = l(r, i, s, n, e[o + 3], 22, -1044525330), n = l(n, r, i, s, e[o + 4], 7, -176418897), s = l(s, n, r, i, e[o + 5], 12, 1200080426), i = l(i, s, n, r, e[o + 6], 17, -1473231341), r = l(r, i, s, n, e[o + 7], 22, -45705983), n = l(n, r, i, s, e[o + 8], 7, 1770035416), s = l(s, n, r, i, e[o + 9], 12, -1958414417), i = l(i, s, n, r, e[o + 10], 17, -42063), r = l(r, i, s, n, e[o + 11], 22, -1990404162), n = l(n, r, i, s, e[o + 12], 7, 1804603682), s = l(s, n, r, i, e[o + 13], 12, -40341101), i = l(i, s, n, r, e[o + 14], 17, -1502002290), r = l(r, i, s, n, e[o + 15], 22, 1236535329), n = c(n, r, i, s, e[o + 1], 5, -165796510), s = c(s, n, r, i, e[o + 6], 9, -1069501632), i = c(i, s, n, r, e[o + 11], 14, 643717713), r = c(r, i, s, n, e[o + 0], 20, -373897302), n = c(n, r, i, s, e[o + 5], 5, -701558691), s = c(s, n, r, i, e[o + 10], 9, 38016083), i = c(i, s, n, r, e[o + 15], 14, -660478335), r = c(r, i, s, n, e[o + 4], 20, -405537848), n = c(n, r, i, s, e[o + 9], 5, 568446438), s = c(s, n, r, i, e[o + 14], 9, -1019803690), i = c(i, s, n, r, e[o + 3], 14, -187363961), r = c(r, i, s, n, e[o + 8], 20, 1163531501), n = c(n, r, i, s, e[o + 13], 5, -1444681467), s = c(s, n, r, i, e[o + 2], 9, -51403784), i = c(i, s, n, r, e[o + 7], 14, 1735328473), r = c(r, i, s, n, e[o + 12], 20, -1926607734), n = h(n, r, i, s, e[o + 5], 4, -378558), s = h(s, n, r, i, e[o + 8], 11, -2022574463), i = h(i, s, n, r, e[o + 11], 16, 1839030562), r = h(r, i, s, n, e[o + 14], 23, -35309556), n = h(n, r, i, s, e[o + 1], 4, -1530992060), s = h(s, n, r, i, e[o + 4], 11, 1272893353), i = h(i, s, n, r, e[o + 7], 16, -155497632), r = h(r, i, s, n, e[o + 10], 23, -1094730640), n = h(n, r, i, s, e[o + 13], 4, 681279174), s = h(s, n, r, i, e[o + 0], 11, -358537222), i = h(i, s, n, r, e[o + 3], 16, -722521979), r = h(r, i, s, n, e[o + 6], 23, 76029189), n = h(n, r, i, s, e[o + 9], 4, -640364487), s = h(s, n, r, i, e[o + 12], 11, -421815835), i = h(i, s, n, r, e[o + 15], 16, 530742520), r = h(r, i, s, n, e[o + 2], 23, -995338651), n = p(n, r, i, s, e[o + 0], 6, -198630844), s = p(s, n, r, i, e[o + 7], 10, 1126891415), i = p(i, s, n, r, e[o + 14], 15, -1416354905), r = p(r, i, s, n, e[o + 5], 21, -57434055), n = p(n, r, i, s, e[o + 12], 6, 1700485571), s = p(s, n, r, i, e[o + 3], 10, -1894986606), i = p(i, s, n, r, e[o + 10], 15, -1051523), r = p(r, i, s, n, e[o + 1], 21, -2054922799), n = p(n, r, i, s, e[o + 8], 6, 1873313359), s = p(s, n, r, i, e[o + 15], 10, -30611744), i = p(i, s, n, r, e[o + 6], 15, -1560198380), r = p(r, i, s, n, e[o + 13], 21, 1309151649), n = p(n, r, i, s, e[o + 4], 6, -145523070), s = p(s, n, r, i, e[o + 11], 10, -1120210379), i = p(i, s, n, r, e[o + 2], 15, 718787259), r = p(r, i, s, n, e[o + 9], 21, -343485551), n = d(n, u), r = d(r, a), i = d(i, f), s = d(s, v)
        }
        return Array(n, r, i, s)
    }

    function f(e, t, n, r, i, s) {
        return d(v(d(d(t, e), d(r, s)), i), n)
    }

    function l(e, t, n, r, i, s, o) {
        return f(t & n | ~t & r, e, t, i, s, o)
    }

    function c(e, t, n, r, i, s, o) {
        return f(t & r | n & ~r, e, t, i, s, o)
    }

    function h(e, t, n, r, i, s, o) {
        return f(t ^ n ^ r, e, t, i, s, o)
    }

    function p(e, t, n, r, i, s, o) {
        return f(n ^ (t | ~r), e, t, i, s, o)
    }

    function d(e, t) {
        var n = (e & 65535) + (t & 65535), r = (e >> 16) + (t >> 16) + (n >> 16);
        return r << 16 | n & 65535
    }

    function v(e, t) {
        return e << t | e >>> 32 - t
    }

    function m(e) {
        var t = Array(), n = (1 << r) - 1;
        for (var i = 0; i < e.length * r; i += r)t[i >> 5] |= (e.charCodeAt(i / r) & n) << i % 32;
        return t
    }

    function g(e) {
        var t = "0123456789abcdef", n = "";
        for (var r = 0; r < e.length * 4; r++)n += t.charAt(e[r >> 2] >> r % 4 * 8 + 4 & 15) + t.charAt(e[r >> 2] >> r % 4 * 8 & 15);
        return n
    }

    function y(e) {
        var t = "";
        for (var n = e.length - 1; n >= 0; n--)t += e.charAt(n);
        return t
    }

    function b(e, t) {
        return t.length != 13 ? (alert("timesign error !!!"), "") : o(o(e) + t.substring(5, 11))
    }

    function w(e, t) {
        return t.length != 13 ? (alert("timesign error !!!"), "") : o(u(e) + t.substring(5, 11))
    }

    var r, i, s;
    r = 8, s = e("cookie"), t.des = function (e) {
        var t, n, r, i;
        return t = "" + (new Date).getTime(), n = y(t), e && e.length != 0 ? (r = b(e, t), i = w(e, n)) : (r = b(t, n), i = w(n, t)), s.set("p2", i, {domain: "yinyuetai.com", path: "/"}), {_t: t, _p1: r, _p2: i}
    }
}), define("ajaxform", ["require", "uri", "modules/yinyuetai/secret"], function (e) {
    function i() {
        var e, t;
        e = this.$el, t = this.options, e.submit(function (n) {
            n.preventDefault(), o(e, r[t.secretName].apply(window, t.secretParam())), $.ajax({type: "POST", url: e.attr("action"), data: e.serialize(), beforeSend: function () {
                return t.onRequest.call(e) ? !0 : !1
            }, success: function (n) {
                t.onComplete.call(e, n)
            }})
        })
    }

    function s(e) {
        function l(e) {
            e.preventDefault();
            if (n.onRequest.call(t)) {
                if (f)return!1;
                f = !0, t.off("submit"), o(t, r[u].apply(window, a())), t.submit(), t.on("submit", l)
            }
        }

        var t, n, i, s, u, a, f;
        return t = this.$el, n = this.options, u = n.secretName, a = n.secretParam, $("<input />").attr({type: "hidden", name: "cross_post", value: "1"}).appendTo(t), i = $("<iframe name=" + e + "/>").attr({id: e, src: "about:blank"}).css("display", "none").appendTo(document.body), i.on("load", function () {
            var r = $("#" + e)[0].contentWindow.document.body;
            f = !1, s = r.innerText, s || (s = r.innerHTML), s && n.onComplete.call(t, $.parseJSON(s))
        }), t.on("submit", l), i
    }

    function o(e, t) {
        $.each(t, function (t, n) {
            var r = e.find("[name=" + t + "]");
            r.length === 0 ? $("<input />").attr({type: "hidden", name: t, value: n}).appendTo(e) : r.val(n)
        })
    }

    function u(e, n) {
        return n = n || {}, n.el = e, new t(n)
    }

    var t, n, r;
    return n = e("uri"), r = e("modules/yinyuetai/secret"), t = Backbone.View.extend({options: {secretName: "des", secretParam: function () {
        return[]
    }, onRequest: function () {
        return!0
    }, onComplete: function (e) {
    }}, initialize: function (e) {
        var t, r;
        t = this.$el;
        if (t.attr("target") && $(t.attr("target")).length != 0)return;
        (new n(t.attr("action"))).host() !== "" || t.find("[type=file]").length !== 0 ? (r = "f" + (new Date).getTime(), t.attr("target", r), this.iframe = s.call(this, r)) : i.call(this)
    }}), u
}), define("ajax", ["require", "exports", "module", "uri", "ajaxform"], function (e, t, n) {
    var r = e("uri"), i = [], s = function (e, t) {
        return typeof e == "string" && typeof t == "string" ? e === t : typeof e == "object" && typeof t == "object" ? $.param(e) === $.param(t) : !1
    }, o = function (e) {
        var t = (new r(e)).host();
        return t !== "" && t !== document.host
    }, u = function (e) {
        var t = $('<form method="post"></form>').attr({action: e.url}).appendTo(document.body), n = e.data, r, i = {};
        return!n && typeof n == "string" ? (r = n.split("&"), $.each(r, function (e, t) {
            t = t.split("="), i[t[0]] = t[1]
        })) : i = n, $.each(i, function (e, n) {
            $('<input type="hidden"/>').attr({name: e, value: n}).appendTo(t)
        }), t
    }, a = function (t) {
        var n = e("ajaxform"), r = u(t);
        new n(r, {onComplete: function (e) {
            $(r.attr("target")).remove(), r.remove(), t.success && t.success(e), _.isFunction(t.complete) ? t.complete(e) : _.isArray(t.complete) && _.each(t.complete, function (t) {
                t(e)
            })
        }}), r.submit()
    }, f = function (e) {
        for (var t = 0, n = i.length; t < n; t++) {
            var r = i[t];
            if (e.url == r.url && s(r.data, e.data))return!1
        }
        i.push(e);
        var u = e.type.toLowerCase();
        if (o(e.url)) {
            if (u === "post")return a(e), !1;
            e.dataType = "jsonp"
        } else if (u === "post") {
            var f = l(e.secretName, e.secretParam);
            f && (e.data ? typeof e.data == "string" ? e.data += "&" + $.param(f) : e.data = $.extend(e.data, f) : e.data = f)
        }
        return e
    }, l = function (t, n) {
        e(["modules/yinyuetai/secret"], function (e) {
            return e[t] ? e[t](n()) : null
        })
    };
    return{ajax: function (e) {
        var t = [function () {
            i = _.without(i, e)
        }];
        e.complete && (t = t.concat(e.complete)), e.complete = undefined, e = $.extend({timeout: 5e3, jsonp: "callback", type: "get", secretName: "des", secretParam: function () {
            return[]
        }, complete: t}, e);
        var n = !0;
        e.beforeSend && typeof e.beforeSend == "function" && (n = e.beforeSend());
        if (n === !1)return;
        var r = f(e);
        if (r)return $.ajax(r)
    }, get: function (e, t, n, r) {
        var i = {type: "GET"};
        return e && (i.url = e), t && (i.data = t), n && (i.success = n), r && (i.dataType = r), this.ajax(i)
    }, getJSON: function (e, t, n) {
        return this.get(e, t, n, "json")
    }, post: function (e, t, n, r) {
        var i = {type: "POST"};
        return e && (i.url = e), t && (i.data = t), n && (i.success = n), r && (i.dataType = r), this.ajax(i)
    }}
}), define("user", ["require", "exports", "module", "cookie", "ajax"], function (e, t, n) {
    function o(e) {
        var t, n;
        t = String.fromCharCode(2), e = decodeURIComponent(e), n = e.split(t), a.set({userId: n[0] * 1, userName: n[1]})
    }

    function u(e) {
        s.getJSON(Y.domains.loginSite + "/login-info", "", function (t) {
            a.set(t), e && e()
        })
    }

    var r, i, s;
    r = e("cookie"), s = e("ajax"), i = Backbone.Model.extend({defaults: {userName: "", userId: 0}, isLogined: function () {
        return parseInt(this.get("userId")) ? !0 : !1
    }, logined: function (e) {
        this.isLogined() ? e() : this.on("logined", e)
    }, login: function (t) {
        var n = this;
        this.isLogined() ? t() : (this.on("login", t), e(["loginBox"], function (e) {
            e.trigger("show"), e.on("hide", function () {
                n.off("login")
            })
        }))
    }, emit: function () {
        var e, t;
        e = r.get("token"), t = r.get("u_inf"), e != null && (t != null && t.length > 0 ? o(t) : u())
    }, getUserInfo: function (e, t) {
        if (this.isLogined()) {
            var n = this, r = function () {
                return typeof e == "function" ? n.toJSON() : n.get(e)
            };
            n.has("isEmailVerified") ? t && t(r()) : u(function () {
                t && t(r())
            })
        }
    }, checkEmail: function (t) {
        this.getUserInfo("isEmailVerified", function (n) {
            if (!n) {
                var r = '<div style="padding: 20px 30px;"><p>您好像还没有进行邮箱验证。</p><p>为不影响部分功能的使用，请先进行 <a href="' + Y.domains.homeSite + '/settings/bind" target="_blank" class="special f14">邮箱验证</a></p>' + "</div>";
                e(["dialog"], function (e) {
                    new e(r, {title: "邮箱验证", width: 400, height: 100, isAutoShow: !0})
                })
            } else t && t()
        })
    }});
    var a = new i;
    return a.on("change:userId", function () {
        a.trigger("logined"), a.trigger("login")
    }), a.emit(), a
}), define("modules/widget/dialog/mask", ["require"], function (e) {
    var t, n, r, i;
    return r = $(document), i = navigator.userAgent.indexOf("MSIE 6.0") !== -1, n = {position: i ? "absolute" : "fixed", top: 0, left: 0, width: "100%", height: i ? r.outerHeight(!0) : "100%", display: "none", "z-index": 998, opacity: .2, "background-color": "black"}, t = Backbone.View.extend({initialize: function () {
        this.element = $("<iframe/>").attr({frameborder: 0, scrolling: "no"}).css(n).appendTo(document.body)
    }, show: function () {
        this.element.fadeIn()
    }, hide: function () {
        this.element.fadeOut()
    }}), new t
}), define("dialog", ["require", "exports", "module", "modules/widget/dialog/mask"], function (e, t, n) {
    function u(e, t) {
        return t = t || {}, t.el = e || "<b></b>", new r(t)
    }

    var r, i, s, o;
    return i = e("modules/widget/dialog/mask"), s = '<a href="javascript:void(0);" class="ico_close J_close">关闭</a>', o = '<h3 class="dialog_title J_title">{title}</h3>', r = Backbone.View.extend({options: {width: "", height: "", hasMark: !0, hasClose: !0, isRemoveAfterHide: !0, isAutoShow: !0, title: "", className: "", effect: "fade", onShow: function () {
    }, onHide: function () {
    }}, events: {"click .J_close": "_close"}, initialize: function () {
        this._status = !1, this.$el = $('<div class="dialog"/>').append(this.$el).addClass(this.options.className).appendTo(document.body), this._isShowTitle(), this._isShowClose(), this._adjustPosition(), this.on("show", function () {
            this._status = !0, this._toggle("show")
        }), this.on("hide", function () {
            this._status = !1, this._toggle("hide")
        }), this.on("show", this.options.onShow, this.$el), this.on("hide", this.options.onHide, this.$el), this.options.isAutoShow && this.trigger("show")
    }, _getStyle: function (e) {
        var t, n;
        t = this.options.width, n = this.options.height, n && this.options.title != "" && (n += 30);
        var e = {width: t, height: n, "margin-left": -(t / 2), "margin-top": -(n / 2)};
        return{width: t, height: n, "margin-left": -(t / 2), "margin-top": -(n / 2)}
    }, _isShowTitle: function () {
        var e = this.options.title;
        e != "" && $(o.replace("{title}", e)).prependTo(this.$el)
    }, _isShowClose: function () {
        this.options.hasClose && $(s).attr("hidefocus", "true").appendTo(this.$el)
    }, _close: function () {
        this.trigger("hide")
    }, _toggle: function (e) {
        var t, n;
        t = this.options.effect, n = this, e == "show" ? t === "none" ? this.$el.css("display", "block") : t === "fade" && this.$el.fadeIn() : e == "hide" && (t === "none" ? this.$el.css("display", "none") : t === "fade" && this.$el.fadeOut(), this.options.isRemoveAfterHide && setTimeout(function () {
            n.$el.remove()
        }, 2e3)), this._toggleMask(e)
    }, _toggleMask: function (e) {
        this.options.hasMark && (e == "show" ? i.show() : e == "hide" && i.hide())
    }, _adjustPosition: function () {
        var e, t;
        typeof this.options.width == "number" && (e = this.options.width, this.$el.css("width", e)), typeof this.options.height == "number" && (t = this.options.height, this.options.title != "" && (t += 30), this.$el.css("height", t)), t = t || this.$el.height(), e = e || this.$el.width(), this.$el.css({"margin-left": -(e / 2), "margin-top": -(t / 2)})
    }, status: function () {
        return this._status ? "show" : "hide"
    }, show: function () {
        this.trigger("show")
    }, hide: function () {
        this.trigger("hide")
    }, destroy: function () {
        this.$el.remove(), i.hide()
    }}), u
}), define("pwdencrypt", [], function () {
    function e(e) {
        var t = 0, n = 1, r = "inputvec", i = 1, s = "yytcdn2b", o = new Array(16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756), u = new Array(-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344), a = new Array(520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584), f = new Array(8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928), l = new Array(256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080), c = new Array(536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312), h = new Array(2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154), p = new Array(268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696);
        pc2bytes0 = new Array(0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964), pc2bytes1 = new Array(0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697), pc2bytes2 = new Array(0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272), pc2bytes3 = new Array(0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144), pc2bytes4 = new Array(0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256), pc2bytes5 = new Array(0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488), pc2bytes6 = new Array(0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746), pc2bytes7 = new Array(0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568), pc2bytes8 = new Array(0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578), pc2bytes9 = new Array(0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488), pc2bytes10 = new Array(0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800), pc2bytes11 = new Array(0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744), pc2bytes12 = new Array(0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128), pc2bytes13 = new Array(0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261);
        var d = s.length > 8 ? 3 : 1, v = new Array(32 * d), m = new Array(0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0), g, y, b = 0, w = 0, E;
        for (var S = 0; S < d; S++) {
            k = s.charCodeAt(b++) << 24 | s.charCodeAt(b++) << 16 | s.charCodeAt(b++) << 8 | s.charCodeAt(b++), L = s.charCodeAt(b++) << 24 | s.charCodeAt(b++) << 16 | s.charCodeAt(b++) << 8 | s.charCodeAt(b++), E = (k >>> 4 ^ L) & 252645135, L ^= E, k ^= E << 4, E = (L >>> -16 ^ k) & 65535, k ^= E, L ^= E << -16, E = (k >>> 2 ^ L) & 858993459, L ^= E, k ^= E << 2, E = (L >>> -16 ^ k) & 65535, k ^= E, L ^= E << -16, E = (k >>> 1 ^ L) & 1431655765, L ^= E, k ^= E << 1, E = (L >>> 8 ^ k) & 16711935, k ^= E, L ^= E << 8, E = (k >>> 1 ^ L) & 1431655765, L ^= E, k ^= E << 1, E = k << 8 | L >>> 20 & 240, k = L << 24 | L << 8 & 16711680 | L >>> 8 & 65280 | L >>> 24 & 240, L = E;
            for (var x = 0; x < m.length; x++)m[x] ? (k = k << 2 | k >>> 26, L = L << 2 | L >>> 26) : (k = k << 1 | k >>> 27, L = L << 1 | L >>> 27), k &= -15, L &= -15, g = pc2bytes0[k >>> 28] | pc2bytes1[k >>> 24 & 15] | pc2bytes2[k >>> 20 & 15] | pc2bytes3[k >>> 16 & 15] | pc2bytes4[k >>> 12 & 15] | pc2bytes5[k >>> 8 & 15] | pc2bytes6[k >>> 4 & 15], y = pc2bytes7[L >>> 28] | pc2bytes8[L >>> 24 & 15] | pc2bytes9[L >>> 20 & 15] | pc2bytes10[L >>> 16 & 15] | pc2bytes11[L >>> 12 & 15] | pc2bytes12[L >>> 8 & 15] | pc2bytes13[L >>> 4 & 15], E = (y >>> 16 ^ g) & 65535, v[w++] = g ^ E, v[w++] = y ^ E << 16
        }
        var b = 0, x, S, E, T, N, C, k, L, A, O, M, _, D, P, H, B = e.length, j = 0, d = v.length == 32 ? 3 : 9;
        d == 3 ? A = n ? new Array(0, 32, 2) : new Array(30, -2, -2) : A = n ? new Array(0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array(94, 62, -2, 32, 64, 2, 30, -2, -2), E = 8 - B % 8, e += String.fromCharCode(E, E, E, E, E, E, E, E), E == 8 && (B += 8), result = "", tempresult = "";
        while (b < B) {
            k = e.charCodeAt(b++) << 24 | e.charCodeAt(b++) << 16 | e.charCodeAt(b++) << 8 | e.charCodeAt(b++), L = e.charCodeAt(b++) << 24 | e.charCodeAt(b++) << 16 | e.charCodeAt(b++) << 8 | e.charCodeAt(b++), E = (k >>> 4 ^ L) & 252645135, L ^= E, k ^= E << 4, E = (k >>> 16 ^ L) & 65535, L ^= E, k ^= E << 16, E = (L >>> 2 ^ k) & 858993459, k ^= E, L ^= E << 2, E = (L >>> 8 ^ k) & 16711935, k ^= E, L ^= E << 8, E = (k >>> 1 ^ L) & 1431655765, L ^= E, k ^= E << 1, k = k << 1 | k >>> 31, L = L << 1 | L >>> 31;
            for (S = 0; S < d; S += 3) {
                P = A[S + 1], H = A[S + 2];
                for (x = A[S]; x != P; x += H)N = L ^ v[x], C = (L >>> 4 | L << 28) ^ v[x + 1], E = k, k = L, L = E ^ (u[N >>> 24 & 63] | f[N >>> 16 & 63] | c[N >>> 8 & 63] | p[N & 63] | o[C >>> 24 & 63] | a[C >>> 16 & 63] | l[C >>> 8 & 63] | h[C & 63]);
                E = k, k = L, L = E
            }
            k = k >>> 1 | k << 31, L = L >>> 1 | L << 31, E = (k >>> 1 ^ L) & 1431655765, L ^= E, k ^= E << 1, E = (L >>> 8 ^ k) & 16711935, k ^= E, L ^= E << 8, E = (L >>> 2 ^ k) & 858993459, k ^= E, L ^= E << 2, E = (k >>> 16 ^ L) & 65535, L ^= E, k ^= E << 16, E = (k >>> 4 ^ L) & 252645135, L ^= E, k ^= E << 4, tempresult += String.fromCharCode(k >>> 24, k >>> 16 & 255, k >>> 8 & 255, k & 255, L >>> 24, L >>> 16 & 255, L >>> 8 & 255, L & 255), j += 8, j == 512 && (result += tempresult, tempresult = "", j = 0)
        }
        var F = result + tempresult, I = "", q = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
        for (var x = 0; x < F.length; x++)I += q[F.charCodeAt(x) >> 4] + q[F.charCodeAt(x) & 15];
        return I
    }

    return e
}), define("loginBox", ["require", "exports", "module", "dialog", "ajaxform", "user", "pwdencrypt"], function (e, t, n) {
    function c(e) {
        var t, n, r;
        t = e.find(".errorinfo"), n = e.find("[name=email]"), r = e.find(".pwd"), p(n), p(r), new s(e, {secretParam: function () {
            return[n.val() + r.val()]
        }, onRequest: function () {
            return h(n, r, t) ? (e.find("[name=encpsw]").length != 0 ? e.find("[name=encpsw]").val(a(r.val())) : $("<input />").attr({type: "hidden", name: "encpsw", value: a(r.val())}).appendTo(e), !0) : !1
        }, onComplete: function (e) {
            e.error ? t.text(e.message).css("visibility", "visible") : e.platFormRef ? location.href = "http://login.yinyuetai.com/platform" : (u.set(e), o.trigger("hide"))
        }})
    }

    function h(e, t, n) {
        var r, i;
        r = $.trim(e.val()), i = $.trim(t.val());
        if (r.length === 0)return n.text("邮箱或手机不能为空").css("visibility", "visible"), e.parent().addClass("emailerror"), !1;
        if (!f.test(r)) {
            if (!l.test(r))return n.text("请输入正确的电子邮箱或手机").css("visibility", "visible"), e.parent().addClass("emailerror"), !1;
            if (r.length !== 11)return n.text("请输入正确的电子邮箱或手机").css("visibility", "visible"), e.parent().addClass("emailerror"), !1
        }
        return i.length === 0 ? (n.text("密码不能为空").css("visibility", "visible"), t.parent().addClass("error"), !1) : i.length < 4 || i.length > 20 ? (n.text("密码长度必须大于4且小于20").css("visibility", "visible"), t.parent().addClass("error"), !1) : !0
    }

    function p(e) {
        e.attr("name") === "email" ? (e.focus(function () {
            $(this).parent().addClass("emailfocus").removeClass("emailerror")
        }), e.blur(function () {
            $(this).parent().removeClass("emailfocus")
        })) : (e.focus(function () {
            $(this).parent().addClass("focus").removeClass("error")
        }), e.blur(function () {
            $(this).parent().removeClass("focus")
        }))
    }

    var r, i, s, o, u, a, f = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, l = /^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$/;
    return r = e("dialog"), s = e("ajaxform"), u = e("user"), a = e("pwdencrypt"), i = ['<div class="loginbox">', '<div class="external">', '<p class="title">使用合作账号登录<span>(推荐)</span></p>', "<ul>", "<li>", '<a href="<%=url%>/api/login/sina-auth" target="_blank" class="weibo" hidefocus>微博帐号</a>', "</li>", "<li>", '<a href="<%=url%>/api/login/qq-auth" target="_blank" class="qq" hidefocus>QQ帐号</a>', "</li>", "<li>", '<a href="<%=url%>/api/login/renren-auth" target="_blank" class="renren" hidefocus>人人账号</a>', "</li>", "<li>", '<a href="<%=url%>/api/login/baidu-auth" target="_blank" class="baidu" hidefocus>百度帐号</a>', "</li>", "</ul>", '<p class="text">快捷登录，无需注册</p>', '<p class="text">与你的朋友分享你的爱！</p>', "</div>", '<div class="site">', '<p class="title">音悦Tai账号登录</p>', '<form action="<%=url%>/login-ajax" method="post">', '<p class="errorinfo">错误信息提示</p>', '<div class="email focuss">', '<input type="text" name="email" placeholder="您的邮箱地址或绑定手机"/>', "</div>", '<div class="password">', '<input type="password" class="pwd" placeholder="请输入密码"/>', "</div>", "<div>", '<p class="autologin"><input type="checkbox" id="autocheckbox" name="autologin" checked hidefocus/><label for="autocheckbox">下次自动登录</label></p>', '<a class="forgot" href="<%=url%>/forgot-password" target="_blank" hidefocus>忘记密码</a>', "</div>", "<div>", '<input class="submit" type="submit" hidefocus/>', '<p class="reg">还没有音悦Tai账号？<a href="<%=url%>/register" target="_blank" hidefocus>立即注册！</a></p>', "</div>", "</form>", "</div>", "</div>"].join(""), o = new r(_.template(i, {url: "http://login.yinyuetai.com"}), {width: 691, height: 307, isRemoveAfterHide: !1, isAutoShow: !1}), o.on("show", function () {
        c(o.$el.find("form"))
    }), o.on("hide", function () {
        var e = o.$el.find("form");
        e.find(".errorinfo").css("visibility", "hidden"), e.find("[name=email],[name=password]").parent().removeClass("emailerror").removeClass("error"), $(".J_pop_download").removeClass("v_button_curv")
    }), o
}), define("prober", ["require", "exports", "module"], function (e, t) {
    function c(e, t, n) {
        var r, i;
        for (r = 0, i = e.length; r < i; r++)if (t.call(e, e[r], r) === !1)break
    }

    function h(e) {
        var t, n, r, i, o, u, a, f;
        return s.test(e) ? (u = !1, e.indexOf("trident/") !== -1 && (t = /\btrident\/([0-9.]+)/.exec(e), t && t.length >= 2 && (r = t[1], f = t[1].split("."), f[0] = parseInt(f[0], 10) + 4, o = f.join("."))), t = s.exec(e), i = t[1], a = t[1].split("."), "undefined" == typeof o && (o = i), a[0] = parseInt(a[0], 10) - 4, n = a.join("."), "undefined" == typeof r && (r = n), {browserVersion: o, browserMode: i, engineVersion: r, engineMode: n, compatible: r !== n}) : null
    }

    function p(e, t, n) {
        var i, s, u, a;
        typeof n == "undefined" && (n = r), i = o.call(t) === "[object Function]" ? t.call(null, n) : t;
        if (!i)return null;
        s = {name: e, version: "-1", codename: ""}, u = o.call(i);
        if (i === !0)return s;
        if (u === "[object String]") {
            if (n.indexOf(i) !== -1)return s
        } else {
            if (o.call(i) === "[object Object]")return i.hasOwnProperty("version") && (s.version = i.version), s;
            if (i.exec) {
                a = i.exec(n);
                if (a)return a.length >= 2 && a[1] ? s.version = a[1].replace(/_/g, ".") : s.version = "-1", s
            }
        }
    }

    function d(e, t, n) {
        var r;
        r = {name: "na", version: "-1"}, c(t, function (t) {
            var n;
            n = p(t[0], t[1], e);
            if (n)return r = n, !1
        }), n(r.name, r.version)
    }

    function v(e) {
        var t, n;
        return t = {}, e = (e || "").toLowerCase(), d(e, u, function (e, n) {
            var r;
            r = parseFloat(n), t.device = {name: e, version: r, fullVersion: n}, t.device[e] = r
        }), d(e, a, function (e, n) {
            var r;
            r = parseFloat(n), t.os = {name: e, version: r, fullVersion: n}, t.os[e] = r
        }), n = h(e), d(e, f, function (e, r) {
            var i, s;
            i = r, n && (r = n.engineVersion || n.engineMode, i = n.engineMode), s = parseFloat(r), t.engine = {name: e, version: s, fullVersion: r, mode: parseFloat(i), fullMode: i, compatible: n ? n.compatible : !1}, t.engine[e] = s
        }), d(e, l, function (e, r) {
            var i, s;
            i = r, n && (e === "ie" && (r = n.browserVersion), i = n.browserMode), s = parseFloat(r), t.browser = {name: e, version: s, fullVersion: r, mode: parseFloat(i), fullMode: i, compatible: n ? n.compatible : !1}, t.browser[e] = s
        }), t
    }

    var n, r, i, s, o, u, a, f, l;
    return n = {}, r = navigator.userAgent || "", i = window.external, s = /\b(?:msie|ie) ([0-9.]+)/, o = Object.prototype.toString, u = [
        ["nokia", function (e) {
            return e.indexOf("nokia ") !== -1 ? /\bnokia ([0-9]+)?/ : /\bnokia[\d]/.test(e) ? /\bnokia(\d+)/ : "nokia"
        }],
        ["wp", function (e) {
            return e.indexOf("windows phone ") !== -1 || e.indexOf("xblwp") !== -1 || e.indexOf("zunewp") !== -1 || e.indexOf("windows ce") !== -1
        }],
        ["mi", function (e) {
            return e.indexOf("mi-one plus") !== -1 ? {version: "1s"} : /\bmi ([0-9.as]+)/
        }],
        ["pc", "windows"],
        ["ipad", "ipad"],
        ["ipod", "ipod"],
        ["iphone", "iphone"],
        ["mac", "macintosh"],
        ["aliyun", "aliyunos"],
        ["meizu", /\bm([0-9]+)\b/],
        ["nexus", /\bnexus ([0-9.]+)/],
        ["android", "android"],
        ["blackberry", "blackberry"]
    ], a = [
        ["wp", function (e) {
            return e.indexOf("windows phone ") !== -1 ? /\bwindows phone (?:os )?([0-9.]+)/ : e.indexOf("xblwp") !== -1 ? /\bxblwp([0-9.]+)/ : e.indexOf("zunewp") !== -1 ? /\bzunewp([0-9.]+)/ : "windows phone"
        }],
        ["windows", /\bwindows nt ([0-9.]+)/],
        ["macosx", /\bmac os x ([0-9._]+)/],
        ["ios", /\bcpu(?: iphone)? os ([0-9._]+)/],
        ["yunos", /\baliyunos ([0-9.]+)/],
        ["android", /\bandroid[ -]([0-9.]+)/],
        ["chromeos", /\bcros i686 ([0-9.]+)/],
        ["linux", "linux"],
        ["windowsce", /\bwindows ce(?: ([0-9.]+))?/],
        ["symbian", /\bsymbianos\/([0-9.]+)/],
        ["blackberry", "blackberry"]
    ], f = [
        ["trident", s],
        ["webkit", /\bapplewebkit\/([0-9.+]+)/],
        ["gecko", /\bgecko\/(\d+)/],
        ["presto", /\bpresto\/([0-9.]+)/]
    ], l = [
        ["sg", / se ([0-9.x]+)/],
        ["mx", function (e) {
            try {
                if (i && (i.mxVersion || i.max_version))return{version: i.mxVersion || i.max_version}
            } catch (t) {
            }
            return/\bmaxthon(?:[ \/]([0-9.]+))?/
        }],
        ["qq", /\bqqbrowser\/([0-9.]+)/],
        ["green", "greenbrowser"],
        ["tt", /\btencenttraveler ([0-9.]+)/],
        ["lb", function (e) {
            if (e.indexOf("lbbrowser") === -1)return!1;
            var t = "-1";
            try {
                i && i.LiebaoGetVersion && (t = i.LiebaoGetVersion())
            } catch (n) {
            }
            return{version: t}
        }],
        ["tao", /\btaobrowser\/([0-9.]+)/],
        ["fs", /\bcoolnovo\/([0-9.]+)/],
        ["sy", "saayaa"],
        ["baidu", /\bbidubrowser[ \/]([0-9.x]+)/],
        ["ie", s],
        ["mi", /\bmiuibrowser\/([0-9.]+)/],
        ["opera", function (e) {
            var t = /\bopera.+version\/([0-9.ab]+)/, n = /\bopr\/([0-9.]+)/;
            return t.test(e) ? t : n
        }],
        ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/],
        ["android", function (e) {
            if (e.indexOf("android") === -1)return;
            return/\bversion\/([0-9.]+(?: beta)?)/
        }],
        ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//],
        ["firefox", /\bfirefox\/([0-9.ab]+)/],
        ["uc", function (e) {
            return e.indexOf("ucbrowser") !== -1 ? /\bucbrowser\/([0-9.]+)/ : /\bucweb([0-9.]+)/
        }]
    ], n = v(navigator.userAgent), n.parse = v, n
}), function (e, t) {
    if (e.PushStream)return;
    var n = function () {
        var e = arguments[0] || {};
        for (var t = 0; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)if (!n.hasOwnProperty || n.hasOwnProperty(r))e[r] = n[r]
        }
        return e
    }, r = /^[\],:{}\s]*$/, i = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, s = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, o = /(?:^|:|,)(?:\s*\[)+/g, u = function (e) {
        return e.replace(/^\s*/, "").replace(/\s*$/, "")
    }, a = function (t) {
        if (typeof t != "string" || !t)return null;
        t = u(t);
        if (e.JSON && e.JSON.parse)try {
            return e.JSON.parse(t)
        } catch (n) {
        }
        return r.test(t.replace(i, "@").replace(s, "]").replace(o, "")) ? (new Function("return " + t))() : t
    }, f = function () {
        return{_: (new Date).getTime()}
    }, l = function (t) {
        var n = t;
        if (typeof t == "object") {
            n = "";
            for (var r in t)if (!t.hasOwnProperty || t.hasOwnProperty(r))n += "&" + r + "=" + e.escape(t[r]);
            n = n.substring(1)
        }
        return n || ""
    }, c = function (e, t) {
        return e + (e.indexOf("?") < 0 ? "?" : "&") + l(t)
    }, h = Array.isArray || function (e) {
        return Object.prototype.toString.call(e) == "[object Array]"
    }, p = function (e) {
        return Object.prototype.toString.call(e) == "[object String]"
    }, d = {_getXHRObject: function () {
        var t = !1;
        try {
            t = new e.XMLHttpRequest
        } catch (n) {
            try {
                t = new e.XDomainRequest
            } catch (r) {
                try {
                    t = new e.ActiveXObject("Msxml2.XMLHTTP")
                } catch (i) {
                    try {
                        t = new e.ActiveXObject("Microsoft.XMLHTTP")
                    } catch (s) {
                        t = !1
                    }
                }
            }
        }
        return t
    }, _send: function (t, r) {
        t = t || {}, t.timeout = t.timeout || 3e4;
        var i = d._getXHRObject();
        if (!i || !t.url)return;
        d.clear(t), i.onreadystatechange = function () {
            i.readyState == 4 && (d.clear(t), t.afterReceive && t.afterReceive(i), i.status == 200 ? t.success && t.success(i.responseText) : t.error && t.error(i.status || 304))
        }, t.beforeOpen && t.beforeOpen(i);
        var s = {}, o = null, u = "GET";
        r ? (o = l(t.data), u = "POST") : s = t.data || {}, i.open(u, c(t.url, n({}, s, f())), !0), t.beforeSend && t.beforeSend(i);
        var a = function () {
            try {
                i.abort()
            } catch (e) {
            }
            d.clear(t), t.error(304)
        };
        return r ? (i.setRequestHeader("Accept", "application/json"), i.setRequestHeader("Content-type", "application/x-www-form-urlencoded")) : t.timeoutId = e.setTimeout(a, t.timeout + 2e3), i.send(o), i
    }, _clear_script: function (e) {
        e && (e.onerror = e.onload = e.onreadystatechange = null, e.parentNode && e.parentNode.removeChild(e))
    }, _clear_timeout: function (t) {
        t.timeoutId && (t.timeoutId = e.clearTimeout(t.timeoutId))
    }, clear: function (e) {
        d._clear_timeout(e), d._clear_script(document.getElementById(e.scriptId))
    }, jsonp: function (t) {
        t.timeout = t.timeout || 3e4, d.clear(t);
        var r = document.head || document.getElementsByTagName("head")[0], i = document.createElement("script"), s = function () {
            d.clear(t), t.error(304)
        }, o = function () {
            d.clear(t), t.load()
        };
        i.onerror = s, i.onload = i.onreadystatechange = function (e) {
            (!i.readyState || /loaded|complete/.test(i.readyState)) && o()
        }, t.beforeOpen && t.beforeOpen({}), t.beforeSend && t.beforeSend({}), t.timeoutId = e.setTimeout(s, t.timeout + 2e3), t.scriptId = t.scriptId || (new Date).getTime(), i.setAttribute("src", c(t.url, n({}, t.data, f()))), i.setAttribute("async", "async"), i.setAttribute("id", t.scriptId), r.insertBefore(i, r.firstChild)
    }, load: function (e) {
        return d._send(e, !1)
    }, post: function (e) {
        return d._send(e, !0)
    }}, v = function (t) {
        return t ? e.escape(t) : ""
    }, m = function (t) {
        return t ? e.unescape(t) : ""
    }, g = function (e, t) {
        var n = e, r = "";
        for (var i in t.channels) {
            r = i;
            break
        }
        p(e) && (n = a(e));
        var s;
        return typeof n == "object" ? s = {id: n[t.jsonIdKey], channel: n[t.jsonChannelKey], data: m(n[t.jsonDataKey]), tag: n[t.jsonTagKey], time: n[t.jsonTimeKey], eventid: n[t.jsonEventIdKey] || ""} : s = {data: n, id: 1, channel: r}, s
    }, y = function (e) {
        return e.backtrack ? ".b" + Number(e.backtrack) : ""
    }, b = function (e) {
        var t = "";
        for (var n in e)if (!e.hasOwnProperty || e.hasOwnProperty(n))t += "/" + n + y(e[n]);
        return t
    }, w = function (e, t, r) {
        var i = e.wrapper.type === L.TYPE, s = e.useSSL, o = i ? s ? "wss://" : "ws://" : s ? "https://" : "http://";
        o += e.host, o += !s && e.port == 80 || s && e.port == 443 ? "" : ":" + e.port, o += t;
        var u = b(e.channels);
        if (e.channelsByArgument) {
            var a = {};
            a[e.channelsArgument] = u.substring(1), r = n({}, r, a)
        } else o += u;
        return c(o, r)
    }, E = function (e) {
        var t = "", n = e.useSSL ? "https://" : "http://";
        n += e.host, n += e.port != 80 && e.port != 443 ? ":" + e.port : "", n += e.urlPrefixPublisher;
        for (var r in e.channels)if (!e.channels.hasOwnProperty || e.channels.hasOwnProperty(r)) {
            t = r;
            break
        }
        return n += "?id=" + t, n
    }, S = function (e) {
        return e.match(/^(\d{1,3}\.){3}\d{1,3}$/) ? e : e.split(".").slice(-2).join(".")
    }, x = function (e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    }, T = function (e) {
        return e && clearTimeout(e), null
    }, N = function (e) {
        var t = g(e.data, this.pushstream);
        this.pushstream._onmessage(t.data, t.id, t.channel, t.eventid, !0)
    }, C = function () {
        this.pushstream._onopen()
    }, k = function (e) {
        if (this.pushstream.readyState === D.OPEN && this.type === A.TYPE && e.type === "error" && this.connection.readyState === EventSource.CONNECTING)return;
        this._closeCurrentConnection(), this.pushstream._onerror({type: e && e.type === "load" || this.pushstream.readyState === D.CONNECTING ? "load" : "timeout"})
    }, L = function (t) {
        if (!e.WebSocket && !e.MozWebSocket)throw"WebSocket not supported";
        this.type = L.TYPE, this.pushstream = t, this.connection = null
    };
    L.TYPE = "WebSocket", L.prototype = {connect: function () {
        this._closeCurrentConnection();
        var t = n({}, this.pushstream.extraParams(), f()), r = w(this.pushstream, this.pushstream.urlPrefixWebsocket, t);
        this.connection = e.WebSocket ? new e.WebSocket(r) : new e.MozWebSocket(r), this.connection.onerror = x(k, this), this.connection.onclose = x(k, this), this.connection.onopen = x(C, this), this.connection.onmessage = x(N, this)
    }, disconnect: function () {
        this.connection && (this.connection.onclose = null, this._closeCurrentConnection(), this.pushstream._onclose())
    }, _closeCurrentConnection: function () {
        if (this.connection) {
            try {
                this.connection.close()
            } catch (e) {
            }
            this.connection = null
        }
    }, sendMessage: function (e) {
        this.connection && this.connection.send(e)
    }};
    var A = function (t) {
        if (!e.EventSource)throw"EventSource not supported";
        this.type = A.TYPE, this.pushstream = t, this.connection = null
    };
    A.TYPE = "EventSource", A.prototype = {connect: function () {
        this._closeCurrentConnection();
        var t = n({}, this.pushstream.extraParams(), f()), r = w(this.pushstream, this.pushstream.urlPrefixEventsource, t);
        this.connection = new e.EventSource(r), this.connection.onerror = x(k, this), this.connection.onopen = x(C, this), this.connection.onmessage = x(N, this)
    }, disconnect: function () {
        this.connection && (this._closeCurrentConnection(), this.pushstream._onclose())
    }, _closeCurrentConnection: function () {
        if (this.connection) {
            try {
                this.connection.close()
            } catch (e) {
            }
            this.connection = null
        }
    }};
    var O = function (e) {
        this.type = O.TYPE, this.pushstream = e, this.connection = null, this.url = null, this.frameloadtimer = null, this.pingtimer = null, this.iframeId = "PushStreamManager_" + e.id
    };
    O.TYPE = "Stream", O.prototype = {connect: function () {
        this._closeCurrentConnection();
        var e = S(this.pushstream.host);
        try {
            document.domain = e
        } catch (t) {
        }
        var r = n({}, this.pushstream.extraParams(), f(), {streamid: this.pushstream.id});
        this.url = w(this.pushstream, this.pushstream.urlPrefixStream, r), this.loadFrame(this.url)
    }, disconnect: function () {
        this.connection && (this._closeCurrentConnection(), this.pushstream._onclose())
    }, _clear_iframe: function () {
        var e = document.getElementById(this.iframeId);
        e && (e.onload = null, e.parentNode && e.parentNode.removeChild(e))
    }, _closeCurrentConnection: function () {
        this._clear_iframe(), this.connection && (this.pingtimer = T(this.pingtimer), this.frameloadtimer = T(this.frameloadtimer), this.connection = null, this.transferDoc = null, typeof e.CollectGarbage == "function" && e.CollectGarbage())
    }, loadFrame: function (t) {
        this._clear_iframe();
        try {
            var n = new e.ActiveXObject("htmlfile");
            n.open(), n.write('<html><script>document.domain="' + document.domain + '";</script></html>'), n.parentWindow.PushStream = D, n.close();
            var r = n.createElement("div");
            n.appendChild(r), r.innerHTML = '<iframe src="' + t + '"></iframe>', this.connection = r.getElementsByTagName("IFRAME")[0], this.connection.onload = x(k, this), this.transferDoc = n
        } catch (i) {
            var s = document.createElement("IFRAME");
            s.style.width = "1px", s.style.height = "1px", s.style.border = "none", s.style.position = "absolute", s.style.top = "-10px", s.style.marginTop = "-10px", s.style.zIndex = "-20", s.PushStream = D, document.body.appendChild(s), s.setAttribute("src", t), s.onload = x(k, this), this.connection = s
        }
        this.connection.setAttribute("id", this.iframeId), this.frameloadtimer = e.setTimeout(x(k, this), this.pushstream.timeout)
    }, register: function (e) {
        this.frameloadtimer = T(this.frameloadtimer), e.p = x(this.process, this), this.connection.onload = x(this._onframeloaded, this), this.pushstream._onopen(), this.setPingTimer()
    }, process: function (e, t, n, r, i) {
        this.pingtimer = T(this.pingtimer), this.pushstream._onmessage(m(n), e, t, r, !0, i), this.setPingTimer()
    }, _onframeloaded: function () {
        this.connection.onload = null, this.disconnect()
    }, setPingTimer: function () {
        this.pingtimer && T(this.pingtimer), this.pingtimer = e.setTimeout(x(k, this), this.pushstream.pingtimeout)
    }};
    var M = function (e) {
        this.type = M.TYPE, this.pushstream = e, this.connection = null, this.lastModified = null, this.etag = 0, this.connectionEnabled = !1, this.opentimer = null, this.messagesQueue = [], this._linkedInternalListen = x(this._internalListen, this), this.xhrSettings = {timeout: this.pushstream.longPollingTimeout, data: {}, url: null, success: x(this.onmessage, this), error: x(this.onerror, this), load: x(this.onload, this), beforeOpen: x(this.beforeOpen, this), beforeSend: x(this.beforeSend, this), afterReceive: x(this.afterReceive, this)}
    };
    M.TYPE = "LongPolling", M.prototype = {connect: function () {
        this.messagesQueue = [], this._closeCurrentConnection(), this.connectionEnabled = !0, this.xhrSettings.url = w(this.pushstream, this.pushstream.urlPrefixLongpolling);
        var t = S(this.pushstream.host), n = S(e.location.hostname);
        this.useJSONP = t != n || this.pushstream.longPollingUseJSONP, this.xhrSettings.scriptId = "PushStreamManager_" + this.pushstream.id, this.useJSONP && (this.pushstream.longPollingByHeaders = !1, this.xhrSettings.data.callback = "PushStreamManager[" + this.pushstream.id + "].wrapper.onmessage"), this._internalListen(), this.opentimer = e.setTimeout(x(C, this), 5e3)
    }, _listen: function () {
        this._internalListenTimeout && T(this._internalListenTimeout), this._internalListenTimeout = e.setTimeout(this._linkedInternalListen, this.pushstream.longPollingInterval)
    }, _internalListen: function () {
        this.connectionEnabled && (this.xhrSettings.data = n({}, this.pushstream.extraParams(), this.xhrSettings.data), this.useJSONP ? d.jsonp(this.xhrSettings) : this.connection || (this.connection = d.load(this.xhrSettings)))
    }, disconnect: function () {
        this.connectionEnabled = !1, this.connection && (this._closeCurrentConnection(), this.pushstream._onclose())
    }, _closeCurrentConnection: function () {
        this.opentimer = T(this.opentimer);
        if (this.connection) {
            try {
                this.connection.abort()
            } catch (e) {
            }
            this.connection = null, this.lastModified = null, this.xhrSettings.url = null
        }
    }, beforeOpen: function (e) {
        if (this.lastModified == null) {
            var t = new Date;
            this.pushstream.secondsAgo && t.setTime(t.getTime() - this.pushstream.secondsAgo * 1e3), this.lastModified = t.toUTCString()
        }
        this.pushstream.longPollingByHeaders || (this.xhrSettings.data[this.pushstream.longPollingTagArgument] = this.etag, this.xhrSettings.data[this.pushstream.longPollingTimeArgument] = this.lastModified)
    }, beforeSend: function (e) {
        this.pushstream.longPollingByHeaders && (e.setRequestHeader("If-None-Match", this.etag), e.setRequestHeader("If-Modified-Since", this.lastModified))
    }, afterReceive: function (e) {
        this.pushstream.longPollingByHeaders && (this.etag = e.getResponseHeader("Etag"), this.lastModified = e.getResponseHeader("Last-Modified")), this.connection = null
    }, onerror: function (e) {
        this.connectionEnabled && (e === 304 ? this._listen() : (this._closeCurrentConnection(), this.pushstream._onerror({type: e === 403 ? "load" : "timeout"})))
    }, onload: function () {
        this._listen()
    }, onmessage: function (e) {
        var t = null, n = h(e) ? e : e.split("\r\n");
        for (var r = 0; r < n.length; r++)n[r] && (t = g(n[r], this.pushstream), this.messagesQueue.push(t), !this.pushstream.longPollingByHeaders && t.time && (this.etag = t.tag, this.lastModified = t.time));
        this._listen();
        while (this.messagesQueue.length > 0) {
            var i = this.messagesQueue.shift();
            this.pushstream._onmessage(i.data, i.id, i.channel, i.eventid, this.messagesQueue.length === 0)
        }
    }};
    var _ = [], D = function (n) {
        n = n || {}, this.id = _.push(this) - 1, this.useSSL = n.useSSL || !1, this.host = n.host || e.location.hostname, this.port = n.port || (this.useSSL ? 443 : 80), this.timeout = n.timeout || 15e3, this.pingtimeout = n.pingtimeout || 3e4, this.reconnecttimeout = n.reconnecttimeout || 1e3, this.checkChannelAvailabilityInterval = n.checkChannelAvailabilityInterval || 6e4, this.secondsAgo = Number(n.secondsAgo), this.longPollingByHeaders = n.longPollingByHeaders === t ? !0 : n.longPollingByHeaders, this.longPollingTagArgument = n.longPollingTagArgument || "tag", this.longPollingTimeArgument = n.longPollingTimeArgument || "time", this.longPollingUseJSONP = n.longPollingUseJSONP || !1, this.longPollingTimeout = n.longPollingTimeout || 3e4, this.longPollingInterval = n.longPollingInterval || 100, this.reconnecttimer = null, this.urlPrefixPublisher = n.urlPrefixPublisher || "/pub", this.urlPrefixStream = n.urlPrefixStream || "/sub", this.urlPrefixEventsource = n.urlPrefixEventsource || "/ev", this.urlPrefixLongpolling = n.urlPrefixLongpolling || "/lp", this.urlPrefixWebsocket = n.urlPrefixWebsocket || "/ws", this.jsonIdKey = n.jsonIdKey || "id", this.jsonChannelKey = n.jsonChannelKey || "channel", this.jsonDataKey = n.jsonDataKey || "text", this.jsonTagKey = n.jsonTagKey || "tag", this.jsonTimeKey = n.jsonTimeKey || "time", this.jsonEventIdKey = n.jsonEventIdKey || "eventid", this.modes = (n.modes || "eventsource|websocket|stream|longpolling").split("|"), this.wrappers = [], this.wrapper = null, this.onopen = null, this.onmessage = null, this.onerror = null, this.onstatuschange = null, this.channels = {}, this.channelsCount = 0, this.channelsByArgument = n.channelsByArgument || !1, this.channelsArgument = n.channelsArgument || "channels", this.extraParams = n.extraParams || this.extraParams;
        for (var r = 0; r < this.modes.length; r++)try {
            var i = null;
            switch (this.modes[r]) {
                case"websocket":
                    i = new L(this);
                    break;
                case"eventsource":
                    i = new A(this);
                    break;
                case"longpolling":
                    i = new M(this);
                    break;
                case"stream":
                    i = new O(this)
            }
            this.wrappers[this.wrappers.length] = i
        } catch (s) {
        }
        this._setState(0)
    };
    D.LOG_LEVEL = "debug", D.LOG_OUTPUT_ELEMENT_ID = "Log4jsLogOutput", D.CLOSED = 0, D.CONNECTING = 1, D.OPEN = 2, D.prototype = {extraParams: function () {
        return{}
    }, addChannel: function (e, t) {
        if (v(e) != e)throw"Invalid channel name! Channel has to be a set of [a-zA-Z0-9]";
        if (typeof this.channels[e] != "undefined")throw"Cannot add channel " + e + ": already subscribed";
        t = t || {}, this.channels[e] = t, this.channelsCount++, this.readyState != D.CLOSED && this.connect()
    }, removeChannel: function (e) {
        this.channels[e] && (delete this.channels[e], this.channelsCount--)
    }, removeAllChannels: function () {
        this.channels = {}, this.channelsCount = 0
    }, _setState: function (e) {
        this.readyState != e && (this.readyState = e, this.onstatuschange && this.onstatuschange(this.readyState))
    }, connect: function () {
        if (!this.host)throw"PushStream host not specified";
        if (isNaN(this.port))throw"PushStream port not specified";
        if (!this.channelsCount)throw"No channels specified";
        if (this.wrappers.length === 0)throw"No available support for this browser";
        this._keepConnected = !0, this._lastUsedMode = 0, this._connect()
    }, disconnect: function () {
        this._keepConnected = !1, this._disconnect(), this._setState(D.CLOSED)
    }, _connect: function () {
        this._disconnect(), this._setState(D.CONNECTING), this.wrapper = this.wrappers[this._lastUsedMode++ % this.wrappers.length];
        try {
            this.wrapper.connect()
        } catch (e) {
            this.wrapper && this.wrapper.disconnect()
        }
    }, _disconnect: function () {
        this.reconnecttimer = T(this.reconnecttimer), this.wrapper && this.wrapper.disconnect()
    }, _onopen: function () {
        this.reconnecttimer = T(this.reconnecttimer), this._setState(D.OPEN), this._lastUsedMode > 0 && this._lastUsedMode--
    }, _onclose: function () {
        this.reconnecttimer = T(this.reconnecttimer), this._setState(D.CLOSED), this._reconnect(this.reconnecttimeout)
    }, _onmessage: function (e, t, n, r, i, s) {
        t == -2 ? this.onchanneldeleted && this.onchanneldeleted(n) : t > 0 && typeof this.channels[n] != "undefined" && this.onmessage && this.onmessage(e, t, n, r, i, s)
    }, _onerror: function (e) {
        this._setState(D.CLOSED), this._reconnect(e.type == "timeout" ? this.reconnecttimeout : this.checkChannelAvailabilityInterval), this.onerror && this.onerror(e)
    }, _reconnect: function (t) {
        this._keepConnected && !this.reconnecttimer && this.readyState != D.CONNECTING && (this.reconnecttimer = e.setTimeout(x(this._connect, this), t))
    }, sendMessage: function (e, t, n) {
        this.wrapper.type === L.TYPE ? (this.wrapper.sendMessage(e), t && t()) : d.post({url: E(this), data: e, success: t, error: n})
    }}, D.sendMessage = function (e, t, n, r) {
        d.post({url: e, data: t, success: n, error: r})
    }, D.register = function (e) {
        var t = e.window.location.href.match(/streamid=([0-9]*)&?/);
        t[1] && _[t[1]] && _[t[1]].wrapper.register(e)
    }, D.unload = function () {
        for (var e = 0; e < _.length; e++)try {
            _[e].disconnect()
        } catch (t) {
        }
    }, e.PushStream = D, e.PushStreamManager = _, e.attachEvent && e.attachEvent("onunload", D.unload), e.addEventListener && e.addEventListener.call(e, "unload", D.unload, !1)
}(window), define("pushstream", function (e) {
    return function () {
        var t, n;
        return t || e.PushStream
    }
}(this)), define("modules/yinyuetai/messenger", ["require", "exports", "module", "user", "cookie", "prober", "pushstream"], function (e, t, n) {
    function h(e, t) {
        var n = e.length, r = [];
        for (var i = 0; i < n; i++)e[i] != t[i] ? r[i] = e[i] : r[i] = 0;
        return r
    }

    var r, i, s, o, u, a, f, l, c;
    c = e("user"), f = e("cookie"), l = e("prober"), s = e("pushstream"), o = "http://i.yinyuetai.com/wb/online/notify.action", i = "http://login.yinyuetai.com/long-connect-setting", u = "http://i.yinyuetai.com/settings/get-access-push", a = "http://i.yinyuetai.com/settings/set-access-push", r = Backbone.View.extend({initialize: function () {
        var e = this;
        this.timer = 0, this.lastNotifyTime = 0, this.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.newdata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.notification = this.$el.find(".notification"), this.number = this.notification.find(".number"), this.list = this.notification.find("ul"), this.userPanel = this.$el.find(".userinfo .user"), this.msgclose = this.$el.find(".userinfo .msg_close_li a"), f.get("pushState") == undefined ? $.getJSON(u + "?callback=?", function (t) {
            f.set("pushState", t.state, {domain: ".yinyuetai.com", expires: 365, path: "/"}), e.getClientConfig(e.getOldMessenger), e.getClientConfig(e.initLongConnection)
        }) : (this.getClientConfig(this.getOldMessenger), this.getClientConfig(this.initLongConnection)), this.bindClose(), this.userPanelHover(), this.msgPanelHover()
    }, getClientConfig: function (e) {
        var t = this;
        $.getJSON(i + "?callback=?", function (n) {
            n.error || e.call(t, n.clientConfig)
        })
    }, initLongConnection: function (e) {
        var t = this, n = new s({host: e.host, port: 80, modes: "longpolling", longPollingUseJSONP: !0, extraParams: function () {
            return{s: e.s, key: e.key}
        }});
        n.onmessage = function (e, n, r) {
            t.onMessage(e, n, r)
        }, n.addChannel(e.channel), n.connect(), $(window).on("beforeunload", function () {
            n && n.disconnect()
        })
    }, getOldMessenger: function (e) {
        var t = this;
        $.getJSON(o + "?callback=?&channel=" + e.channel, function (n) {
            n.code && n.code == 1 && t.onMessage({type: "wb", body: n.result.notify, time: n.result.time}, 0, e.channel, function (e) {
                t.data = e.data, t.newdata = e.data, f.get("pushState") == "true" && t.dataShow(e.data)
            })
        })
    }, onMessage: function (e, t, n, r) {
        var i, s, o;
        if (e == null)return;
        if (typeof e == "object" && e.type == "wb")i = e.body, s = e.time; else {
            if (!(typeof e == "string" && e.length > 0))return;
            try {
                e = $.parseJSON(e), i = e.body, s = e.time
            } catch (u) {
                throw new TypeError("Invalid JSON:" + e)
            }
        }
        if (s) {
            if (!(this.lastNotifyTime < s))return;
            this.lastNotifyTime = s
        }
        this.render(i, r)
    }, render: function (e, t) {
        var n = 0;
        e != null && e.length > 0 && ($(e).each(function (e, t) {
            n += t
        }), n -= e[1], n > 0 ? this.number.removeClass("hide") : this.number.addClass("hide"), t ? t({data: e}) : f.get("pushState") == "true" ? (this.data = e, this.newdata = e, this.dataShow(e)) : (this.newdata = h(e, this.data), this.dataShow(this.newdata)))
    }, dataShow: function (e) {
        var t = "";
        e[9] = e[9] || 0, e[2] > 0 && (t += '<li><a href="http://i.yinyuetai.com/news/private" class="link"><strong>{privateNum}</strong> 条新私信</a></li>'.replace("{privateNum}", e[2])), e[3] > 0 && (t += '<li><a href="http://i.yinyuetai.com/news/comment" class="link"><strong>{comment}</strong> 条新评论</a></li>'.replace("{comment}", e[3]));
        if (e[4] > 0 || e[9] > 0) {
            var n;
            e[4] > 0 ? (n = "/news/attention", e[9] > 0 && (n += "?count=" + e[9])) : n = "/news/atcomment", t += '<li><a href="http://i.yinyuetai.com{href}" class="link"><strong>{at}</strong> 条新@我</a></li>'.replace("{href}", n).replace("{at}", e[4] + e[9])
        }
        e[5] > 0 && (t += '<li><a href="http://i.yinyuetai.com/{uid}/friend/fans" class="link"><strong>{friend}</strong> 位新粉丝</a></li>'.replace("{uid}", c.get("userId")).replace("{friend}", e[5])), e[6] > 0 && (t += '<li><a href="http://i.yinyuetai.com/news/balls" class="link"><strong>{system}</strong> 条新饭团消息</a></li>'.replace("{system}", e[6])), e[7] > 0 && (t += '<li><a href="http://i.yinyuetai.com/news/system" class="link"><strong>{bulletin}</strong> 条新系统提醒</a></li>'.replace("{bulletin}", e[7])), e[8] > 0 && (t += '<li><a href="http://i.yinyuetai.com/{uid}/gossip" class="link"><strong>{fan}</strong> 条新留言</a></li>'.replace("{uid}", c.get("userId")).replace("{fan}", e[8])), e[0] > 0 && (t += '<li><a href="http://i.yinyuetai.com/news/bulletin" class="link"><strong>{msg}</strong> 条新站内公告</a></li>'.replace("{msg}", e[0])), e[10] && e[10] > 0 && (t += '<li><a href="http://i.yinyuetai.com/{uid}/mv/new-published" class="link"><strong>{mv}</strong> 首新的MV</a></li>'.replace("{uid}", c.get("userId")).replace("{mv}", e[10])), t != "" ? (t = $(t), $(t[t.length - 1]).find("a").addClass("fillet"), this.list.html(t), l.engine.trident && this.createIframeShim(), this.list.removeClass("hide"), this.notification.addClass("hover"), this.msgclose.removeClass("hide")) : (this.list.html(""), this.msgclose.addClass("hide"), this.notification.removeClass("hover"), this.iframeshim && this.iframeshim.removeClass("hide"))
    }, createIframeShim: function () {
        if (this.iframeshim) {
            this.iframeshim.css({height: this.list.find("li").length * 33 - 4});
            return
        }
        this.iframeshim = $("<iframe />").attr({frameborder: 0, scrolling: "no", "class": "iframeshim"}).css({position: "absolute", top: "41px", width: "110px", height: this.list.find("li").length * 33 - 4, left: "auto", right: "55px"}).appendTo(this.$el.find(".content"))
    }, bindClose: function () {
        var e = this;
        this.msgclose.click(function () {
            $.getJSON(a + "?callback=?&state=1", function (e) {
                f.set("pushState", !1, {domain: ".yinyuetai.com", expires: 365, path: "/"})
            }), $(this).addClass("hide"), e.notification.removeClass("hover"), e.newdata = e.data, e.list.html(""), e.iframeshim && e.iframeshim.removeClass("hide")
        })
    }, userPanelHover: function () {
        var e = this;
        this.userPanel.mouseenter(function () {
            e.notification.hasClass("hover") && (e.msgclose.addClass("hide"), e.notification.removeClass("hover"), e.iframeshim && e.iframeshim.addClass("hide"))
        }), this.userPanel.mouseleave(function () {
            $.trim(e.list.html()) != "" && (e.msgclose.removeClass("hide"), e.notification.addClass("hover"), e.iframeshim && e.iframeshim.removeClass("hide"))
        })
    }, msgPanelHover: function () {
        var e = this;
        this.notification.find(".messenger").on("mouseenter", function (t) {
            e.dataShow(e.data)
        }), this.notification.find(".messenger").on("mouseleave", function (t) {
            e.timer = setTimeout(function () {
                if (e.userPanel.is(":hover"))return;
                e.dataShow(e.newdata)
            }, 200)
        }), this.notification.find("ul").on("mouseenter", function (t) {
            clearTimeout(e.timer)
        }), this.notification.find("ul").on("mouseleave", function (t) {
            if (e.userPanel.is(":hover"))return;
            e.dataShow(e.newdata)
        })
    }}), new r({el: $(".topbar")})
}), define("modules/yinyuetai/returntop", ["require", "exports", "module"], function (e, t, n) {
    function s() {
        this.el = $("<div></div>").addClass("return_top_wrapper"), this.actionEl = $("<a></a>").attr({href: "javascript:void(0)", title: "返回顶部"}).addClass("return_top_static"), this.runningEl = $("<a></a>").attr({href: "javascript:void(0)"}).addClass("return_top_running"), this.bottomDistance = 100, this.goTopTime = 800, this.hideDistance = 50, this.init()
    }

    var r = r || "", i = navigator.userAgent.indexOf("MSIE 6.0") !== -1;
    s.prototype = {init: function () {
        var e = this;
        $("<div></div>").appendTo(this.el), this.actionEl.appendTo(this.el), this.runningEl.appendTo(this.el), this.win = $(window), $(document).ready(function () {
            e.el.appendTo(document.body), e.scrollEvent()
        }), this.bindEvent()
    }, bindEvent: function () {
        var e = this, t = _.throttle(e.scrollEvent, 400), n = _.throttle(e.resizeEvent, 400);
        this.win.scroll(function () {
            t.call(e)
        }), this.win.resize(function () {
            n.call(e)
        }), this.el.click(function (t) {
            if (e.isRunning)return;
            e.startRunning(), $("html, body").animate({scrollTop: 0}, e.goTopTime), e.el.animate({top: "-" + e.el.innerHeight()}, e.goTopTime, function () {
                e.endRunning()
            }), r && r.push(["_trackEvent", "主站右侧回到顶部", "回到顶部按钮点击次数"]), t.stopPropagation()
        })
    }, startRunning: function () {
        this.isRunning = !0, this.actionEl.css("left", "-" + this.hideDistance + "px"), this.runningEl.css("left", 0)
    }, endRunning: function () {
        this.isRunning = !1, this.runningEl.css("left", "-" + this.hideDistance + "px"), this.actionEl.css("left", 0)
    }, scrollEvent: function () {
        var e = this.win.scrollTop(), t = document.documentElement.clientHeight, n = t - this.el.innerHeight() - this.bottomDistance, r = this;
        if (r.isRunning)return;
        e >= t ? i ? this.el.show().css({top: e + n}) : this.hasShow || (this.el.css({top: t}).show().animate({top: n}, 600), this.hasShow = !0) : (this.el.hide(), this.hasShow = !1)
    }, resizeEvent: function () {
        var e = this.win.scrollTop(), t = document.documentElement.clientHeight, n = t - this.el.innerHeight() - this.bottomDistance;
        if (e < t)return;
        this.el.css({top: i ? e + n : n})
    }}, n.exports = new s
}), function () {
    var e = function () {
        var t = [].slice.call(arguments);
        t.push(e.options), t[0].match(/^\s*#([\w:\-\.]+)\s*$/igm) && t[0].replace(/^\s*#([\w:\-\.]+)\s*$/igm, function (e, n) {
            var r = document, i = r && r.getElementById(n);
            t[0] = i ? i.value || i.innerHTML : e
        });
        if (arguments.length == 1)return e.compile.apply(e, t);
        if (arguments.length >= 2)return e.to_html.apply(e, t)
    }, t = {escapehash: {"<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#x27;", "/": "&#x2f;"}, escapereplace: function (e) {
        return t.escapehash[e]
    }, escaping: function (e) {
        return typeof e != "string" ? e : e.replace(/[&<>"]/igm, this.escapereplace)
    }, detection: function (e) {
        return typeof e == "undefined" ? "" : e
    }}, n = function (e) {
        if (typeof console != "undefined") {
            if (console.warn) {
                console.warn(e);
                return
            }
            if (console.log) {
                console.log(e);
                return
            }
        }
        throw e
    }, r = function (e, t) {
        e = e !== Object(e) ? {} : e;
        if (e.__proto__)return e.__proto__ = t, e;
        var n = function () {
        }, r = Object.create ? Object.create(t) : new (n.prototype = t, n);
        for (var i in e)e.hasOwnProperty(i) && (r[i] = e[i]);
        return r
    };
    e.__cache = {}, e.version = "0.6.5-stable", e.settings = {}, e.tags = {operationOpen: "{@", operationClose: "}", interpolateOpen: "{{", interpolateClose: "}}", noneencodeOpen: "{{{", noneencodeClose: "}}}", commentOpen: "\\{#", commentClose: "\\}"}, e.options = {cache: !0, strip: !0, errorhandling: !0, detection: !0, _method: r({__escapehtml: t, __throw: n, __juicer: e}, {})}, e.tagInit = function () {
        var t = e.tags.operationOpen + "each\\s*([^}]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?" + e.tags.operationClose, n = e.tags.operationOpen + "\\/each" + e.tags.operationClose, r = e.tags.operationOpen + "if\\s*([^}]*?)" + e.tags.operationClose, i = e.tags.operationOpen + "\\/if" + e.tags.operationClose, s = e.tags.operationOpen + "else" + e.tags.operationClose, o = e.tags.operationOpen + "else if\\s*([^}]*?)" + e.tags.operationClose, u = e.tags.interpolateOpen + "([\\s\\S]+?)" + e.tags.interpolateClose, a = e.tags.noneencodeOpen + "([\\s\\S]+?)" + e.tags.noneencodeClose, f = e.tags.commentOpen + "[^}]*?" + e.tags.commentClose, l = e.tags.operationOpen + "each\\s*(\\w*?)\\s*in\\s*range\\(([^}]+?)\\s*,\\s*([^}]+?)\\)" + e.tags.operationClose, c = e.tags.operationOpen + "include\\s*([^}]*?)\\s*,\\s*([^}]*?)" + e.tags.operationClose;
        e.settings.forstart = new RegExp(t, "igm"), e.settings.forend = new RegExp(n, "igm"), e.settings.ifstart = new RegExp(r, "igm"), e.settings.ifend = new RegExp(i, "igm"), e.settings.elsestart = new RegExp(s, "igm"), e.settings.elseifstart = new RegExp(o, "igm"), e.settings.interpolate = new RegExp(u, "igm"), e.settings.noneencode = new RegExp(a, "igm"), e.settings.inlinecomment = new RegExp(f, "igm"), e.settings.rangestart = new RegExp(l, "igm"), e.settings.include = new RegExp(c, "igm")
    }, e.tagInit(), e.set = function (e, t) {
        var n = this, r = function (e) {
            return e.replace(/[\$\(\)\[\]\+\^\{\}\?\*\|\.]/igm, function (e) {
                return"\\" + e
            })
        }, i = function (e, t) {
            var i = e.match(/^tag::(.*)$/i);
            if (i) {
                n.tags[i[1]] = r(t), n.tagInit();
                return
            }
            n.options[e] = t
        };
        if (arguments.length === 2) {
            i(e, t);
            return
        }
        if (e === Object(e))for (var s in e)e.hasOwnProperty(s) && i(s, e[s])
    }, e.register = function (e, t) {
        var n = this.options._method;
        return n.hasOwnProperty(e) ? !1 : n[e] = t
    }, e.unregister = function (e) {
        var t = this.options._method;
        if (t.hasOwnProperty(e))return delete t[e]
    }, e.template = function (t) {
        var n = this;
        this.options = t, this.__interpolate = function (e, t, n) {
            var r = e.split("|"), i = r[0] || "", s;
            return r.length > 1 && (e = r.shift(), s = r.shift().split(","), i = "_method." + s.shift() + ".call({}, " + [e].concat(s) + ")"), "<%= " + (t ? "_method.__escapehtml.escaping" : "") + "(" + (!n || n.detection !== !1 ? "_method.__escapehtml.detection" : "") + "(" + i + ")" + ")" + " %>"
        }, this.__removeShell = function (t, r) {
            var i = 0;
            t = t.replace(e.settings.forstart,function (e, t, n, r) {
                var n = n || "value", r = r && r.substr(1), s = "i" + i++;
                return"<% ~function() {for(var " + s + " in " + t + ") {" + "if(" + t + ".hasOwnProperty(" + s + ")) {" + "var " + n + "=" + t + "[" + s + "];" + (r ? "var " + r + "=" + s + ";" : "") + " %>"
            }).replace(e.settings.forend, "<% }}}(); %>").replace(e.settings.ifstart,function (e, t) {
                return"<% if(" + t + ") { %>"
            }).replace(e.settings.ifend, "<% } %>").replace(e.settings.elsestart,function (e) {
                return"<% } else { %>"
            }).replace(e.settings.elseifstart,function (e, t) {
                return"<% } else if(" + t + ") { %>"
            }).replace(e.settings.noneencode,function (e, t) {
                return n.__interpolate(t, !1, r)
            }).replace(e.settings.interpolate,function (e, t) {
                return n.__interpolate(t, !0, r)
            }).replace(e.settings.inlinecomment, "").replace(e.settings.rangestart,function (e, t, n, r) {
                var s = "j" + i++;
                return"<% ~function() {for(var " + s + "=" + n + ";" + s + "<" + r + ";" + s + "++) {{" + "var " + t + "=" + s + ";" + " %>"
            }).replace(e.settings.include, function (e, t, n) {
                return"<%= _method.__juicer(" + t + ", " + n + "); %>"
            });
            if (!r || r.errorhandling !== !1)t = "<% try { %>" + t, t += '<% } catch(e) {_method.__throw("Juicer Render Exception: "+e.message);} %>';
            return t
        }, this.__toNative = function (e, t) {
            return this.__convert(e, !t || t.strip)
        }, this.__lexicalAnalyze = function (t) {
            var n = [], r = [], i = "", s = ["if", "each", "_", "_method", "console", "break", "case", "catch", "continue", "debugger", "default", "delete", "do", "finally", "for", "function", "in", "instanceof", "new", "return", "switch", "this", "throw", "try", "typeof", "var", "void", "while", "with", "null", "typeof", "class", "enum", "export", "extends", "import", "super", "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield", "const", "arguments", "true", "false", "undefined", "NaN"], o = function (e, t) {
                if (Array.prototype.indexOf && e.indexOf === Array.prototype.indexOf)return e.indexOf(t);
                for (var n = 0; n < e.length; n++)if (e[n] === t)return n;
                return-1
            }, u = function (t, i) {
                i = i.match(/\w+/igm)[0];
                if (o(n, i) === -1 && o(s, i) === -1 && o(r, i) === -1) {
                    if (typeof window != "undefined" && typeof window[i] == "function" && window[i].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i))return t;
                    if (typeof global != "undefined" && typeof global[i] == "function" && global[i].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i))return t;
                    if (typeof e.options._method[i] == "function" || e.options._method.hasOwnProperty(i))return r.push(i), t;
                    n.push(i)
                }
                return t
            };
            t.replace(e.settings.forstart, u).replace(e.settings.interpolate, u).replace(e.settings.ifstart, u).replace(e.settings.elseifstart, u).replace(e.settings.include, u).replace(/[\+\-\*\/%!\?\|\^&~<>=,\(\)\[\]]\s*([A-Za-z_]+)/igm, u);
            for (var a = 0; a < n.length; a++)i += "var " + n[a] + "=_." + n[a] + ";";
            for (var a = 0; a < r.length; a++)i += "var " + r[a] + "=_method." + r[a] + ";";
            return"<% " + i + " %>"
        }, this.__convert = function (e, t) {
            var n = [].join("");
            return n += "", n += "var _=_||{};", n += "var _out='';_out+='", t !== !1 ? (n += e.replace(/\\/g, "\\\\").replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%>)/g, "	").split("'").join("\\'").split("	").join("'").replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='") + "';return _out;", n) : (n += e.replace(/\\/g, "\\\\").replace(/[\r]/g, "\\r").replace(/[\t]/g, "\\t").replace(/[\n]/g, "\\n").replace(/'(?=[^%]*%>)/g, "	").split("'").join("\\'").split("	").join("'").replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='") + "';return _out.replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');", n)
        }, this.parse = function (e, t) {
            var i = this;
            if (!t || t.loose !== !1)e = this.__lexicalAnalyze(e) + e;
            return e = this.__removeShell(e, t), e = this.__toNative(e, t), this._render = new Function("_, _method", e), this.render = function (e, t) {
                if (!t || t !== n.options._method)t = r(t, n.options._method);
                return i._render.call(this, e, t)
            }, this
        }
    }, e.compile = function (e, t) {
        if (!t || t !== this.options)t = r(t, this.options);
        try {
            var i = this.__cache[e] ? this.__cache[e] : (new this.template(this.options)).parse(e, t);
            if (!t || t.cache !== !1)this.__cache[e] = i;
            return i
        } catch (s) {
            return n("Juicer Compile Exception: " + s.message), {render: function () {
            }}
        }
    }, e.to_html = function (e, t, n) {
        if (!n || n !== this.options)n = r(n, this.options);
        return this.compile(e, n).render(t, n._method)
    }, typeof module != "undefined" && module.exports ? module.exports = e : this.juicer = e
}(), define("juicer", function (e) {
    return function () {
        var t, n;
        return t || e.juicer
    }
}(this)), define("modules/widget/autocomplete", ["require", "ajax", "juicer", "prober"], function (e) {
    function s(e) {
        var t = document.createEvent("MouseEvents");
        t.initEvent("click", !0, !0), e.dispatchEvent(t)
    }

    function o() {
        this.options.container.removeClass("autocompletehide"), this.options.container.html($("#autocompletenormalTpl").html()), this.iframeshim && this.iframeshim.css({display: "block", width: "104%", height: (this.options.container.find("li").length - 1) * 33 - 4, left: -5})
    }

    function u() {
        var e = a().css({position: "absolute", top: "34px", display: "none"}).appendTo(this.$el.parents(".search"));
        return e
    }

    function a() {
        return $("<iframe />").attr({frameborder: 0, scrolling: "no", "class": "iframeshim"})
    }

    function f(e, n) {
        return n = n || {}, n.el = e, new t(n)
    }

    var t, n, r, i;
    return n = e("ajax"), r = e("juicer"), i = e("prober"), r.register("encodeURIComponent", encodeURIComponent), t = Backbone.View.extend({options: {source: "url", template: "", container: ""}, events: {keyup: "_keyup"}, initialize: function () {
        var e = this;
        this._timer = 0, this._index = -1, this._enter(), this.$el.on("focus", _.bind(this._keyup, this)), $(document.body).on("click", function (t) {
            $(t.target).attr("name") != "keyword" && setTimeout(function () {
                e.destroy()
            }, 200)
        }), i.engine.trident && (this.iframeshim = u.call(this))
    }, _keyup: function (e) {
        var t, n;
        n = $.trim(this.$el.val()), n == "" && o.call(this);
        if (e.keyCode != 38 && e.keyCode != 40)return this._setData(n), !1;
        t = this.options.container.find("li"), e.keyCode == 38 && this._up(t), e.keyCode == 40 && this._down(t)
    }, _up: function (e) {
        this._index > -1 && this._index--, this._index == -1 && (this._index = e.length - 1);
        if (e.eq(this._index).hasClass("dotted") || e.eq(this._index).hasClass("h39"))this._index -= 1, this._index == -1 && (this._index = e.length - 1);
        e.removeClass("active").eq(this._index).addClass("active")
    }, _down: function (e) {
        this._index++, this._index == e.length && (this._index = 0);
        if (e.eq(this._index).hasClass("dotted") || e.eq(this._index).hasClass("h39"))this._index += 1;
        e.removeClass("active").eq(this._index).addClass("active")
    }, _enter: function () {
        var e, t, n, r;
        n = this.$el.parents("form"), r = $.proxy(function (o) {
            o.preventDefault(), e = this.options.container.find("li"), e.hasClass("active") ? (t = e.eq(this._index).find("a")[0], i.engine.webkit ? s(t) : t.click(), this._index = -1, this.destroy(), this.$el.blur()) : (n.off(), this.destroy(), this.$el.val() == "" ? n.attr("action", this.$el.data("url")) : n.attr("action", "http://so.yinyuetai.com"), n.submit(), this.$el.blur(), n.on("submit", r))
        }, this), n.on("submit", r)
    }, _setData: function (e) {
        clearTimeout(this._timer), this._timer = setTimeout($.proxy(function () {
            this._readDataForDB(e, this.render)
        }, this), 200)
    }, _readDataForDB: function (e, t) {
        n.getJSON(this.options.source, {q: e, type: "All", maxResults: 2}, $.proxy(t, this))
    }, render: function (e) {
        e.videos ? (this.options.container.removeClass("autocompletehide"), this.options.container.html(r.to_html(this.options.template, e)), this.iframeshim && this.iframeshim.css({display: "block", width: "104%", height: (this.options.container.find("li").length - 1) * 33 - 7, left: -5})) : $.trim(this.$el.val()) != "" ? this.destroy() : o.call(this)
    }, destroy: function () {
        this.options.container.addClass("autocompletehide"), this.options.container.html(""), this.iframeshim && this.iframeshim.css("display", "none")
    }}), f
}), define("modules/yinyuetai/topbar", ["require", "user", "prober", "modules/widget/autocomplete"], function (e) {
    function s(e, t, n) {
        var r, i, s, o, u, a;
        r = 0, i = "", s = /[^\x00-\xff]/g, o = "", u = e.replace(s, "**").length;
        for (a = 0; a < u; a++) {
            o = e.charAt(a).toString(), o.match(s) != null ? r += 2 : r++;
            if (r > t)break;
            i += o
        }
        return n && u > t && (i += "..."), i
    }

    function o() {
        var e = this.$el;
        u().css({width: "100%", height: "41px"}).insertAfter(e);
        var t = u().css({top: "41px", display: "none"}).appendTo(e.find(".content"));
        e.find(".hoverhandler").hover(function () {
            t.css({display: "block", width: $(this).find("li").eq(0).width(), height: $(this).find("li").length * 33 - 4, left: $(this).offset().left})
        }, function () {
            t.css({display: "none"})
        })
    }

    function u() {
        return $("<iframe />").attr({frameborder: 0, scrolling: "no", "class": "iframeshim"})
    }

    var t, n, r;
    n = e("user"), r = e("prober");
    var i = e("modules/widget/autocomplete");
    t = Backbone.View.extend({events: {"click .J_login": "_showLoginBox"}, initialize: function () {
        var e = this;
        n.isLogined() || this._notLoginHandler(), n.logined(function () {
            $(window).off("focus"), e._loginHandler(), e._searchReseize()
        }), this._menusHoverEffect(), this._searchInputFocusEffect(), this._searchReseize(), $(window).resize(function () {
            e._searchReseize()
        }), new i(e.$el.find("[name=keyword]"), {source: "http://so.yinyuetai.com/search/smart-search", container: e.$el.find(".autocomplete"), template: $("#autocompleteTpl").html()}), (location.href.indexOf("so.yinyuetai.com") != -1 || location.href.indexOf("i.yinyuetai.com/s") != -1) && e.$el.find("[name=keyword]").parents("form").attr("target", ""), r.engine.trident && o.call(e)
    }, _showLoginBox: function (t) {
        t.preventDefault(), e(["loginBox"], function (e) {
            e.status() == "hide" ? e.trigger("show") : e.trigger("hide")
        })
    }, _menusHoverEffect: function () {
        var e;
        r.browser.name == "ie" && r.browser.version == 6 && (e = this.$el.find(".hoverhandler"), e.mouseenter(function () {
            $(this).addClass("hover")
        }), e.mouseleave(function () {
            $(this).removeClass("hover")
        }))
    }, _searchInputFocusEffect: function () {
        var e = this.$el.find(".search");
        e.find("input").focus(function () {
            e.addClass("focus")
        }), e.find("input").blur(function () {
            e.removeClass("focus")
        })
    }, _searchReseize: function () {
        var e, t;
        e = this, t = _.throttle(function () {
            var t, r, i, s, o, u, a, f, l;
            t = e.$el.find(".content").width(), r = e.$el.find("h1").width(), i = e.$el.find(".menus").width(), s = e.$el.find(".userinfo").width(), o = e.$el.find(".login").width(), a = e.$el.find(".search"), f = a.find(".searchbody"), l = a.find("input"), n.isLogined() ? u = i + r + s : u = i + r + o, u = t - u, a.css("margin-right", u / 2 - a.width() / 2), u < 223 ? (a.width(160), f.width(130), l.width(112)) : (a.width(223), f.width(193), l.width(178)), a.removeClass("hide")
        }, 200), t()
    }, _notLoginHandler: function () {
        var t, r;
        r = this, t = 0, $(window).on("focus", function () {
            n.emit(), n.isLogined() && t == 0 && (t = 1, e(["loginBox"], function (e) {
                e.status() == "show" && r.$el.find(".J_login").click()
            }))
        })
    }, _loginHandler: function () {
        var t, r, i;
        t = this.$el.find(".userinfo"), r = this.$el.find(".decoration"), i = this.$el.find(".login"), t.find(".user span").text(s(n.get("userName"), 10)).attr("title", n.get("userName")), r.attr("href", r.attr("href").replace("userId", n.get("userId"))), i.addClass("hide"), t.removeClass("hide"), $(function () {
            setTimeout(function () {
                e(["modules/yinyuetai/messenger"], function () {
                })
            }, 4e3)
        })
    }}), new t({el: $(".topbar")})
}), define("modules/util/str", ["require", "exports", "module"], function (e, t, n) {
    n.exports = {getLength: function (e) {
        var t = 0, n = e.length;
        while (n--)/^[\u0000-\u00ff]$/.test(e.charAt(n)) ? t += 1 : t += 2;
        return t
    }}
});