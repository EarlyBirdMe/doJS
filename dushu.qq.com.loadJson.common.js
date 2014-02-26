var Namespace = new Object();
Namespace.register = function (fullNS) {
    var nsArray = fullNS.split(".");
    var sEval = "";
    var sNS = "";
    for (var i = 0; i < nsArray.length; i++) {
        if (i != 0) {
            sNS += "."
        }
        sNS += nsArray[i];
        sEval += "if (typeof(" + sNS + ") == 'undefined') " + sNS + " = new Object();"
    }
    if (sEval != "") {
        eval(sEval)
    }
};
Namespace.register("V.util");
Namespace.register("V.user");
Namespace.register("V.test");
Namespace.register("V.Const");
Namespace.register("V.comm");
Namespace.register("V.user.collect");
Namespace.register("V.ui");
V.Const = {APP_DOMAIN: "http://booktest2.qq.com", FRONT_DOMAIN: "http://booktest.qq.com/portal", VIP_OPEN: "http://pay.qq.com/ipay/index.shtml?n=3&c=qqbookby", QQREADER: "http://qqreader.qq.com/", FEEDBACK: "http://support.qq.com/write.shtml?fid=972", WEB_EBOOK: "http://ebook.3g.qq.com", WEB_AUTHOR: "http://author.book.qq.com", PIC_PREFIX: "http://wfqqreader.3g.qq.com/cover/"};
(function () {
    var a = window.location.host || window.location.href || "";
    if (a.indexOf("nbook.qq.com") >= 0) {
        V.Const.APP_DOMAIN = "http://sight.qq.com";
        V.Const.FRONT_DOMAIN = "http://nbook.qq.com"
    } else {
        if (a.indexOf("yunqi.qq.com") >= 0) {
            V.Const.APP_DOMAIN = "http://sight.qq.com";
            V.Const.FRONT_DOMAIN = "http://yunqi.qq.com"
        } else {
            if (a.indexOf("xiaoshuo.qq.com") >= 0) {
                V.Const.APP_DOMAIN = "http://sight.qq.com";
                V.Const.FRONT_DOMAIN = "http://xiaoshuo.qq.com"
            } else {
                if (a.indexOf("book.qq.com") >= 0) {
                    V.Const.APP_DOMAIN = "http://sight.qq.com";
                    V.Const.FRONT_DOMAIN = "http://book.qq.com"
                } else {
                    if (a.indexOf("booktest") >= 0 || a.indexOf("file://") >= 0) {
                        V.Const.APP_DOMAIN = "http://booktest2.qq.com";
                        V.Const.FRONT_DOMAIN = "http://booktest.qq.com/portal"
                    } else {
                        if (a.indexOf("test.book") >= 0) {
                            V.Const.APP_DOMAIN = "http://booktest2.qq.com";
                            V.Const.FRONT_DOMAIN = "http://test.book.qzone.qq.com/"
                        } else {
                            V.Const.APP_DOMAIN = "http://sight.qq.com";
                            V.Const.FRONT_DOMAIN = "http://dushu.qq.com"
                        }
                    }
                }
            }
        }
    }
})();
V.util.genBookCover = function (b, a, c) {
    b = V.util.parseInt(b, 0);
    if (a && b) {
        return V.Const.PIC_PREFIX + (b % 1000) + "/" + b + "/" + c + "_" + b + ".jpg"
    }
    return V.Const.PIC_PREFIX + c + "_default.jpg"
};
V.util.getUin = function () {
    var a = QZFL.cookie.get("uin");
    if (!a) {
        return 0
    }
    a = /^o(\d+)$/.exec(a);
    if (a && (a = new Number(a[1]) + 0) > 10000) {
        return a
    }
    return 0
};
V.util.appendUrlParam = function (c, f, g) {
    if (!c) {
        return""
    }
    if (!f) {
        return c
    }
    var e = [];
    for (var b in f) {
        e.push(encodeURIComponent(b) + "=" + encodeURIComponent(f[b]))
    }
    e = e.join("&");
    var d = c.split("#");
    c = d[0].split("?");
    d = d[1] ? ("#" + d[1]) : "";
    f = c[1] ? ("?" + c[1]) : "";
    c = c[0];
    var a = g ? d : f;
    a = a ? a.lastIndexOf("&") == a.length - 1 ? (a + e) : (a + "&" + e) : ("?" + e);
    if (g) {
        d = a
    } else {
        f = a
    }
    return c + f + d
};
V.util.getToken = function () {
    var d = QZFL.cookie.get("skey") || "";
    var c = 5381;
    for (var b = 0, a = d.length; b < a; ++b) {
        c += (c << 5) + d.charCodeAt(b)
    }
    return c & 2147483647
};
V.util.loadJson = function (b) {
    b = V.util.combine({timeout: 5000, charset: "utf-8", callback: "_Callback", valueStatKey: "ret", getRetCodeValueStat: V.util._getRetCodeValueStat, successReportRate: 1, errorReportRate: 1}, b);
    if (!b.url) {
        return
    }
    b.param = V.util.combine({uin: V.util.getUin(), g_tk: V.util.getToken(), callback: "_Callback"}, b.param);
    b.random && (b.param._r = Math.random());
    var a = new QZFL.JSONGetter(b.url, "_vasJsonInstance_" + (QZFL.JSONGetter.counter + 1), b.param, b.charset);
    if (b.valueStatId) {
        a.onSuccess = function (c) {
            b.onSuccess && b.onSuccess(c)
        };
        a.onError = function () {
            b.onError && b.onError()
        };
        a.onTimeout = function () {
            b.onTimeout ? b.onTimeout() : b.onError && b.onError()
        }
    } else {
        a.onSuccess = function (c) {
            b.onSuccess && b.onSuccess(c)
        };
        a.onError = function () {
            b.onError && b.onError()
        };
        a.onTimeout = function () {
            var c = b.onTimeout || b.onError;
            c && c()
        }
    }
    a.timeout = b.timeout;
    if (b.valueStatId) {
        startTime = new Date()
    }
    a.send(b.callback)
};
V.util.postForm = function (b) {
    b = V.util.combine({charset: "utf-8", valueStatKey: "ret", getRetCodeValueStat: V.util._getRetCodeValueStat, successReportRate: 1, errorReportRate: 1}, b);
    if (!b.url) {
        return
    }
    b.query = V.util.combine({uin: V.util.getUin(), g_tk: V.util.getToken(), callback: "_Callback"}, b.query);
    b.param = V.util.combine({uin: V.util.getUin(), g_tk: V.util.getToken()}, b.param);
    var a = V.util.appendUrlParam(b.url, b.query);
    var c = new QZFL.FormSender(a, "POST", b.param, b.charset);
    if (b.valueStatId) {
        c.onSuccess = function (d) {
            b.onSuccess && b.onSuccess(d)
        };
        c.onError = function () {
            b.onError && b.onError()
        }
    } else {
        c.onSuccess = b.onSuccess || function () {
        };
        c.onError = b.onError || function () {
        }
    }
    if (b.valueStatId) {
    }
    c.send()
};
V.util._getRetCodeValueStat = function (a) {
    return a == 0 ? [1, 0] : [2, a]
};
V.util.toYuan = function (a) {
    return parseInt(a / 100) + "." + parseInt((a / 10) % 10) + (a % 10)
};
V.util.tmpl = function (f, a) {
    if (!f) {
        return""
    }
    a = a || {};
    var c = QZFL.dom.get(f);
    c && (f = c.innerHTML);
    var g = ["var __=[];"];
    var i = /([\s\S]*?)(?:(?:<%([^=][\s\S]*?)%>)|(?:<%=([\s\S]+?)%>)|$)/g;
    i.lastIndex = 0;
    var b = i.exec(f || "");
    while (b && (b[1] || b[2] || b[3])) {
        b[1] && g.push("__.push('", QZFL.string.escString(b[1]), "');");
        b[2] && g.push(b[2]);
        b[3] && g.push("__.push(", b[3], ");");
        b = i.exec(f)
    }
    g.push("return __.join('');");
    var e = [], d = [];
    for (var h in a) {
        e.push(h);
        d.push(a[h])
    }
    g = new Function(e.join(","), g.join(""));
    return g.apply(null, d)
};
(function () {
    var b = {};
    V.util.tmpl2 = function a(e, d) {
        var c = !/\W/.test(e) ? b[e] = b[e] || a(document.getElementById(e).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + e.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return d ? c(d) : c
    }
})();
V.util.tmpl = V.util.tmpl2;
V.util.getUrlParam = function (b) {
    var c = new RegExp("(?:\\?|#|&)" + b + "=([^&#?]*)(?:$|&|#)", "i");
    var a = c.exec(window.location.href);
    return a ? a[1] : ""
};
V.util.combine = function () {
    var e = Array.prototype.slice.call(arguments, 0);
    var c = {};
    for (var b = 0, d; d = e[b]; b++) {
        for (var a in d) {
            c[a] = d[a]
        }
    }
    return c
};
V.util.parseInt = function (a, d) {
    try {
        var c = parseInt(a + "", 10);
        if (c != c) {
            return d || 0
        }
        return c
    } catch (b) {
        return d || 0
    }
};
V.util.isNumeric = function (a) {
    return/^[-+]?\d+$/.test(a)
};
V.util.isEmpty = function (a) {
    if (a == undefined) {
        return true
    } else {
        return !(/\S+/.test(a))
    }
};
V.user.loginShow = function (b) {
    var a = b ? b : document.location.href;
    var d = function () {
        var e = document.location;
        var g = e.hash;
        var f = e.search;
        f += ((!f) ? "?" : "&") + ("__r" + parseInt(10000 * Math.random(), 10) + "=1");
        return e.protocol + "//" + e.host + e.pathname + f + g
    };
    var c = "http://ui.ptlogin2.qq.com/cgi-bin/login?f_url=loginerroralert&style=0&link_target=blank&appid=19000301&s_url=" + escape(b || d());
    FloatShow(c, 370, 300)
};
V.user.logout = function (a) {
    V.util.loadJson({url: V.Const.APP_DOMAIN + "/user/logout", random: true, onSuccess: function (b) {
        a && a(b)
    }, onError: function (b) {
    }})
};
V.util.getIntroUrl = function (b, g, d) {
    var a = V.Const.FRONT_DOMAIN + "/intro.html";
    var f = "";
    if (d != null) {
        d.g_f = d.g_f || V.util.stat.param.g_f;
        d.c_f = d.c_f || V.util.stat.param.c_f;
        for (k in d) {
            f += "&" + k + "=" + d[k]
        }
    } else {
        var c = V.util.stat.param.g_f || "";
        f += "&g_f=" + c;
        var e = V.util.stat.param.c_f || "";
        f += "&c_f=" + e
    }
    a += "?bid=" + b + f;
    return a
};
V.util.getSearchUrl = function (a) {
    return V.Const.FRONT_DOMAIN + "/search.html#wd=" + encodeURIComponent(a)
};
V.util.getEndUrl = function (b, e, c) {
    var a = "", d = "";
    if (c != null) {
        for (k in c) {
            d += "&" + k + "=" + c[k]
        }
    }
    a = V.Const.FRONT_DOMAIN + "/end.html?bid=" + b + "&sex=" + e + d;
    return a
};
V.util.getStoreUrl = function (c, d, m, f, b) {
    if (!f) {
        f = 3
    }
    var i = V.util.toCategoryInfo(c);
    if (!i) {
        return V.Const.FRONT_DOMAIN + "/store.html?g_f=" + V.util.stat.param.g_f + "&c_f=" + V.util.stat.param.c_f
    }
    var l = 0;
    var j = -1;
    var h = i[1] && f >= 1 ? i[1].id : -1;
    var g = i[2] && f >= 2 ? i[2].id : -1;
    var e = i[3] && f >= 3 ? i[3].id : -1;
    var m = m ? m : -1;
    var a = V.Const.FRONT_DOMAIN + "/store.html#sex=" + d + "&g_f=" + V.util.stat.param.g_f + "&c_f=" + V.util.stat.param.c_f;
    if (h >= 0) {
        a += "&cat1=" + h
    }
    if (g >= 0) {
        a += "&cat2=" + g
    }
    if (e >= 0) {
        a += "&cat3=" + e
    }
    if (m >= 0) {
        a += "&tag=" + m
    }
    return a
};
V.util.toTagInfo = function (b) {
    var f = new Array();
    if (!b) {
        return f
    }
    var g = b.split(",");
    for (var e = 0; e < g.length; e++) {
        var a = g[e].split(":");
        if (a.length < 2) {
            continue
        }
        var d = parseInt(a[0]);
        if (d <= 0) {
            continue
        }
        var c = {id: d, name: a[1]};
        f.push(c)
    }
    return f
};
V.util.toCategoryInfo = function (d) {
    var c = {LastCategory: {id: 0, name: "", shortName: ""}};
    if (!d) {
        return c
    }
    var f = d.split(",");
    for (var e = 0; e < f.length; e++) {
        var a = f[e].split(":");
        if (a.length < 3) {
            continue
        }
        if (e == 0) {
            a[0] = parseInt(a[0] / 10000) * 10000
        }
        var b = {id: a[0], name: a[1], shortName: a[2], level: e + 1};
        c[e + 1] = b;
        if (e + 1 >= f.length) {
            c.LastCategory = b
        }
    }
    return c
};
V.util.addRecommendTicket = function (a, c, b) {
    V.user.loginHelper.loginDo(function (d) {
        V.util.postForm({url: V.Const.APP_DOMAIN + "/auth/comment/addrticket", param: {bid: a, c_f: V.util.stat.param.c_f, g_f: V.util.stat.param.g_f, fp: b}, random: true, onSuccess: function (e) {
            QZONE.widget.msgbox.show(e.msg, e.ret === 0 ? 4 : 5, 3000);
            if (c && typeof c == "function") {
                c(e)
            }
        }, onError: function () {
            QZONE.widget.msgbox.show("操作失败，请稍后重试!", 5, 3000)
        }})
    })
};
V.util.backToTop = function () {
    var a = document.documentElement.scrollTop || document.body.scrollTop;
    var b = a / 6;
    var c = function () {
        a -= b;
        if (a <= 0) {
            a = 0
        }
        window.scrollTo(0, a);
        if (a > 0) {
            setTimeout(c, 20)
        }
    };
    c()
};
V.user.shareBook = function (b, a, d) {
    var c = V.user.loginHelper.getUserInfo().uin;
    V.user.loginHelper.loginDo(function () {
        V.util.loadJson({url: V.Const.APP_DOMAIN + "/book/intro", param: {bid: b}, random: true, onSuccess: function (f) {
            if (f.ret == 0) {
                var e = f;
                V.user.addShare(c, a || e.intro, b, e.title, e.cover, e.intro, e.sexattr, e.form, true, d)
            }
        }, onError: function () {
        }})
    })
};
V.user.addShare = function (c, i, j, d, g, f, h, b, e, l, a) {
    V.util.postForm({url: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshareadd_url", query: {t: new Date().getTime()}, param: {act: "阅读本书", spaceuin: c, entryuin: c, description: i, title: d, site: "QQ读书", url: V.util.getIntroUrl(j, h, {g_f: l, form: b}), pics: g, summary: QZFL.string.cut(f, 160, "..."), type: 21, share2weibo: e ? 1 : 0}, onSuccess: function (m) {
        if (a && typeof a == "funcion") {
            a(m)
        } else {
            QZFL.widget.msgbox.show("分享成功。", 4, 2000)
        }
    }, onError: function () {
    }})
};
V.user.loginHelper = (function () {
    var a = false;
    var b = {status: false, user: {uin: 0, skey: "", g_tk: 0, isVIP: false, nickname: ""}, isLogin: function () {
        return b.status
    }, init: function (e, c, f) {
        if (a && !f) {
            if (b.isLogin()) {
                e && e(b.user)
            }
            c && c(b.user);
            return
        }
        b.user = {uin: 0, skey: QZFL.cookie.get("skey"), g_tk: V.util.getToken(), isVIP: false, nickname: ""};
        var d = V.user.readHistory;
        V.util.loadJson({url: V.Const.APP_DOMAIN + "/auth/login", random: true, onSuccess: function (g) {
            if (g.ret == 0) {
                b.status = true;
                b.user = {uin: g.uin, skey: QZFL.cookie.get("skey"), g_tk: V.util.getToken(), isVIP: g.isVIP == 1, nickname: g.nickname || g.uin};
                d.init(g.time, b.status);
                d.sync();
                if (e && typeof e == "function") {
                    e(g)
                }
            } else {
                b.status = false;
                d.init(g.time, b.status)
            }
            c && c(g)
        }, onError: function () {
            c && c()
        }});
        a = true
    }, loginDo: function (d, e, c) {
        if (!b.status || !QZFL.cookie.get("skey")) {
            if (typeof d == "undefined" && typeof e == "undefined") {
                e = location.href
            }
            V.util.loginFrame.login({func: d, backurl: e})
        } else {
            if (V.util.parseInt(b.user.uin, 0) < 10000) {
                b.user = {uin: V.util.getUin(), skey: QZFL.cookie.get("skey"), g_tk: V.util.getToken()};
                b.status = true
            }
            if (d && typeof d == "function") {
                aargs = Array.prototype.slice.call(arguments, 1);
                return d.apply(null, aargs)
            }
        }
    }, logout: function (c) {
        V.user.logout(function () {
            b.status = false;
            b.user = {uin: 0, skey: "", g_tk: V.util.getToken(), isVIP: false, nickname: ""};
            c & c()
        });
        V.user.readHistory.changeToLocal()
    }};
    return{getUserInfo: function () {
        return b.user
    }, init: b.init, loginDo: b.loginDo, logout: b.logout, isLogin: function () {
        return b.status
    }}
})();
V.user.collect = (function () {
    var a = {bid: undefined, flag: false, add: function (c, e, b, d) {
        if (typeof c == "function") {
            e = c;
            c = V.util.getUrlParam("bid")
        } else {
            a.bid = c || V.util.getUrlParam("bid")
        }
        a.flag = false;
        V.user.loginHelper.loginDo(function () {
            if (b && typeof b == "function") {
                b()
            }
            a._save(e, d)
        })
    }, _save: function (c, b) {
        V.util.loadJson({url: V.Const.APP_DOMAIN + "/user/bookshelf/addbookshelf", param: {bid: a.bid, c_f: V.util.stat.param.c_f, g_f: V.util.stat.param.g_f, fp: b}, random: true, onSuccess: function (d) {
            if (d.ret == 0) {
                if (d.ret2 && d.ret2 > 0 && (a.isFromAct(V.util.stat.param.c_f, V.util.stat.param.g_f))) {
                    QZFL.dialog.create("温馨提示", "<p style='margin:10px 0 0 10px; font-size:14px;'>成功收藏至书架！您已经获得一次领取礼包机会，<a href=\"act/wbcj131209/index.html?c_f=intro\">点击这里去领取吧！</a></p>", {height: 50})
                } else {
                    QZONE.widget.msgbox.show("成功收藏至书架!", 4, 2000)
                }
            } else {
                if (d.ret == 1) {
                    QZONE.widget.msgbox.show("该作品已经收藏了!", 0, 2000)
                } else {
                    QZONE.widget.msgbox.show("发生错误!", 5, 2000)
                }
            }
            if (typeof(c) == "function") {
                c(d)
            }
            a.flag = true
        }, onError: function (d) {
            QZONE.widget.msgbox.show("发生错误!", 5, 2000);
            if (typeof(c) == "function") {
                c(d)
            }
            a.flag = true
        }})
    }, isFromAct: function (e, c) {
        if (e == "act_wbcj131209") {
            return true
        }
        var d = ["20131209", "70063"];
        for (var b = 0; b < d.length; b++) {
            if (c == d[b]) {
                return true
            }
        }
        return false
    }};
    return{add: a.add, isActGf: a.isActGf}
})();
V.util.pageFixer = function (a, b) {
    this._orgTotal = null;
    this.Total = null;
    this._getData = b;
    this._cachedData = new Array();
    this.CurrentIndex = 0;
    this._orgIndex = 0;
    this.PageSize = a;
    this.LastPageIndex = null;
    this._flag = false
};
V.util.pageFixer.prototype = {Reset: function () {
    this._orgTotal = null;
    this.Total = null;
    this._cachedData.length = 0;
    this.CurrentIndex = 0;
    this._orgIndex = 0;
    this.LastPageIndex = null;
    this._flag = false
}, _getCachedData: function (d) {
    var c = new Array();
    if (!this._cachedData || this._cachedData.length == 0) {
        return c
    }
    var a = (d - 1) * this.PageSize;
    if (a < 0) {
        a = 0
    } else {
        if (a > this._cachedData.length - 1) {
            return c
        }
    }
    var f = a + this.PageSize - 1;
    if (f > this._cachedData.length - 1) {
        f = this._cachedData.length - 1
    } else {
        if (f < a) {
            f = a
        }
    }
    for (var g = a; g <= f; g++) {
        c.push(this._cachedData[g])
    }
    return c
}, _setLastIndex: function () {
    this.LastPageIndex = Math.floor(this._cachedData.length / this.PageSize);
    if (this._cachedData.length % this.PageSize > 0) {
        this.LastPageIndex++
    }
}, _CanGetFromCache: function (c) {
    if (this.LastPageIndex != null) {
        return true
    }
    var a = (c - 1) * this.PageSize;
    if (a < 0) {
        a = 0
    }
    var d = a + this.PageSize - 1;
    if (d < a) {
        d = a
    }
    return d <= this._cachedData.length - 1
}, _get: function (b) {
    this._orgIndex++;
    if (!this._getData || typeof this._getData != "function") {
        return
    }
    var a = this;
    this._getData(this._orgIndex, this.PageSize, function (e, d) {
        a._orgTotal = d;
        if (e && e.length > 0) {
            for (var f = 0; f < e.length; f++) {
                a._cachedData.push(e[f])
            }
        }
        if (!a._orgTotal || a._orgTotal <= 0) {
            a.Total = a._cachedData.length;
            a._setLastIndex();
            if (b && typeof b == "function") {
                b(new Array(), 0)
            }
            a._flag = false;
            return
        } else {
            if (a._orgIndex * a.PageSize >= a._orgTotal) {
                a.Total = a._cachedData.length;
                a._setLastIndex()
            } else {
                var c = a.PageSize - (e ? e.length : 0);
                if (!a.Total) {
                    a.Total = a._orgTotal
                }
                a.Total -= c;
                if (a.Total <= 0) {
                    a.Total = 0
                }
            }
        }
        a._flag = false;
        if (a._CanGetFromCache(a.CurrentIndex)) {
            if (b && typeof b == "function") {
                b(a._getCachedData(a.CurrentIndex), a.Total)
            }
        } else {
            a._get(b)
        }
    })
}, CurrentPage: function (a) {
    if (this._CanGetFromCache(this.CurrentIndex)) {
        a(this._getCachedData(this.CurrentIndex), this.Total)
    } else {
        if (this._flag) {
            return
        }
        this._flag = true;
        this._get(a)
    }
}, NextPage: function (a) {
    this.CurrentIndex++;
    this.CurrentPage(a)
}, PreviousPage: function (a) {
    this.CurrentIndex--;
    this.CurrentPage(a)
}};
String.prototype.trim = function () {
    var a = this;
    a = a.replace(/\s\w/g, "");
    return a
};
String.prototype.trimSides = function () {
    var a = this;
    a = a.replace(/^[\s]+|[\s]+$/g, "");
    return a
};
String.prototype.toHTML = function () {
    var a = this;
    a = QZFL.string.escHTML(a).replace(/\n/g, "</p><p>");
    return"<p>" + a + "</p>"
};
String.prototype.toHTMLTight = function () {
    var a = this;
    a = a.replace(/(\s*\n\s*){2,}/g, "\n").toHTML();
    return a
};
String.prototype.trimHtml = function () {
    var a = this;
    a = a.replace(/<[^<>]*>/g, "");
    return a
};
String.prototype.handleHtml = function () {
    var a = this;
    a = QZFL.string.restXHTML(a).replace(/<\s*br\s*\/?\s*>/g, "\n").trimHtml().toHTMLTight();
    return QZFL.string.restXHTML(a)
};
V.util.copy = function (a) {
    if (window.clipboardData) {
        window.clipboardData.setData("Text", a);
        QZONE.widget.msgbox.show("复制成功", 4, 2000)
    } else {
        QZONE.widget.msgbox.show("暂时不支持非IE内核浏览器", 5, 2000)
    }
};
V.util.timerManager = (function () {
    var e = null;
    var b = null;
    var a = function (g, h, i, f) {
        g._args = h;
        g._times = i;
        g._interval = f
    };
    var d = function (f) {
        f._args = null;
        f._times = null;
        f._interval = null;
        delete f._args;
        delete f._times;
        delete f._interval
    };
    var c = {tickInterval: 0, counter: 1, init: function (f) {
        if (e) {
            return
        }
        if (f < 10) {
            f = 10
        }
        c.tickInterval = f || 50;
        e = setInterval(c.tick, c.tickInterval);
        b = new Array()
    }, tick: function () {
        var h = null;
        var f = b.length;
        for (var g = 0; g < f; ++g) {
            h = b[g];
            if (c.counter % h._interval == 0) {
                try {
                    h.apply(null, h._args)
                } catch (j) {
                }
                if (h._times > 0) {
                    --h._times
                }
                if (h._times == 0) {
                    d(h);
                    b.splice(g, 1);
                    --g
                }
            }
        }
        ++c.counter
    }, submit: function (g, f, i) {
        if (typeof(g) != "function") {
            return false
        }
        var h = Array.prototype.slice.call(arguments, 3);
        a(g, h, i, Math.max(1, parseInt(f / c.tickInterval, 10)));
        b.push(g);
        return true
    }, cancel: function () {
        clearInterval(e);
        e = null;
        var g = null;
        for (var f = 0; f < b.length; f++) {
            g = b[f];
            d(g);
            b[f] = null
        }
        b = null
    }};
    return{init: c.init, submit: c.submit, cancel: c.cancel}
})();
V.user.readHistory = (function () {
    var c = 10;
    var b = new Array();
    var h = 0;
    var g = false;
    var d = "b_rhy";
    var j = function () {
        var n = "";
        n += g;
        for (var m = 0; m < b.length; m++) {
            n += ",";
            n += b[m].bid + "," + b[m].cid + "," + b[m].time
        }
        return n
    };
    var a = function (o) {
        if (!o) {
            g = true;
            return
        }
        var m = o.split(",");
        if (m.length % 3 != 1) {
            return
        }
        for (var n = 1; n < m.length; n += 3) {
            b[parseInt(n / 3, 10)] = {bid: m[n], cid: m[n + 1], time: m[n + 2] || 0}
        }
        g = (m[0] + "" == "true")
    };
    var f = window;
    var l = {local: {init: function () {
        a(QZFL.cookie.get(d))
    }, set: function (m, r, q) {
        var p = -1;
        for (var o = 0; o < b.length; o++) {
            if (b[o].bid == m) {
                p = o;
                break
            }
        }
        var n = null;
        if (p == 0) {
            b[0].cid = r;
            b[0].time = new Date().getTime() - h
        } else {
            if (p < 0) {
                n = {bid: m, cid: r, time: (new Date().getTime() - h)};
                b.unshift(n)
            } else {
                n = b[p];
                b.splice(p, 1);
                n.cid = r;
                b.unshift(n)
            }
        }
        if (b.length > c) {
            b.splice(c, 1)
        }
        g = true;
        QZFL.cookie.set(d, j(), f.location.host, "", 24 * 30);
        q && q({ret: 0, count: b.length})
    }, del: function (m, p) {
        var o = -1;
        for (var n = 0; n < b.length; n++) {
            if (b[n].bid == m) {
                o = n;
                break
            }
        }
        if (o >= 0) {
            b.splice(o, 1);
            g = true;
            QZFL.cookie.set(d, j(), f.location.host, "", 24 * 30)
        }
        p && p({ret: 0})
    }}, remote: {init: function () {
        var m = QZFL.cookie.get(d);
        a(m)
    }, set: function (m, o, n) {
        V.util.loadJson({url: V.Const.APP_DOMAIN + "/user/addhistory", param: {bid: m, cid: o}, random: true, onSuccess: function (p) {
            g = false;
            QZFL.cookie.set(d, j(), f.location.host, "", 24 * 30);
            n && n(p)
        }, onError: function () {
            n && n({ret: -99})
        }})
    }, del: function (m, n) {
        V.util.loadJson({url: V.Const.APP_DOMAIN + "/user/delhistory", param: {bid: m}, random: true, onSuccess: function (o) {
            n && n(o)
        }, onError: function () {
            n && n({ret: -99})
        }})
    }}};
    var i = l.local;
    var e = false;
    return{init: function (n, m) {
        if (e) {
            return
        }
        e = true;
        h = n - new Date().getTime();
        if (m) {
            i = l.remote;
            l.local.init()
        } else {
            i = l.local
        }
        i.init()
    }, set: function (m, n) {
        if (i != l.local) {
            l.local.set(m, n)
        }
        i.set(m, n);
        if (i == l.local) {
        }
    }, get: function () {
        return b
    }, changeToLocal: function () {
        i = l.local;
        i.init()
    }, sync: function (m) {
    }, del: function (m, n) {
        if (i != l.local) {
            l.local.del(m);
            i.del(m, n)
        } else {
            l.local.del(m, n)
        }
    }}
})();
V.comm.nav_tmpl = ["<% var cat = book.cat3Info||book.categoryInfo;var cats=V.util.toCategoryInfo(cat);var v = parseInt(cats[1].id/10000,10);if(book.sexattr == 1&&v==2) { %>", '<a href="mindex.html">原创男频首页</a>&nbsp;&gt;&gt;&nbsp;', "<% } else if(book.sexattr == 2&&v==3) { %>", '<a href="findex.html">原创女频首页</a>&nbsp;&gt;&gt;&nbsp;', "<% } else { %>", '<a href="pindex.html">畅销图书频道首页</a>&nbsp;&gt;&gt;&nbsp;', "<% } %>", "<% if(cats[2] && cats[2].id > 0) { %>", '<a target="_blank" href="store.html#sex=<%=book.sexattr%>&cat1=<%=parseInt(parseInt(cats[1].id, 10)/10000,10)*10000%>&cat2=<%=cats[2].id%>"><%=cats[2].name%></a>&nbsp;&gt;&gt;&nbsp;', "<% } %>", "<% if(cats[3] && cats[3].id > 0) { %>", '<a target="_blank" href="store.html#sex=<%=book.sexattr%>&cat1=<%=parseInt(parseInt(cats[1].id, 10)/10000,10)*10000%>&cat2=<%=cats[2].id%>&cat3=<%=cats[3].id%>"><%=cats[3].name%></a>&nbsp;&gt;&gt;&nbsp;', "<% } %>", '<% if(page == "intro") { %>', "<b><%=book.title%></b>", "<% } else { %>", '<a href="<%=V.util.getIntroUrl(book.bid, book.sexattr)%>"><%=book.title%></a>&nbsp;&gt;&gt;&nbsp;', '<% if(page == "dir") {%>', "<b>目录页</b>", "<% } else { %>", "<% if(book.sexattr == 1) { %>", '<a href="<%=V.util.getIntroUrl(book.bid, book.sexattr)%>">目录页</a>&nbsp;&gt;&gt;&nbsp;', "<% } %>", "<b>阅读正文</b>", "<% } %>", "<% } %>"].join("");
V.util.bookMarkApp = function () {
    var e = false;
    var a = (-[1]) ? false : true;
    var d = "QQ读书";
    var g = window.location.href;

    function c() {
        var i = navigator.userAgent.toLowerCase();
        var l = "";
        var h = (i.indexOf("webkit") != -1);
        var j = (i.indexOf("mac") != -1);
        if (i.indexOf("konqueror") != -1) {
            l = "CTRL + B"
        } else {
            if (window.home || h || e || j) {
                l = (j ? "Command/Cmd" : "CTRL") + " + D"
            }
        }
        return((l) ? "请按 " + l + " 添加当前页到书签" : l)
    }

    function f() {
        return QZFL.userAgent.ie == 8
    }

    function b(h) {
        try {
            if (typeof h == "object" && h.tagName.toLowerCase() == "a") {
                h.style.cursor = "pointer";
                if ((typeof window.sidebar == "object") && (typeof window.sidebar.addPanel == "function")) {
                    window.sidebar.addPanel(d, g, "");
                    return false
                } else {
                    if (a && typeof window.external == "object") {
                        if (f()) {
                            window.external.AddToFavoritesBar(g, d)
                        } else {
                            window.external.AddFavorite(g, d)
                        }
                        return false
                    } else {
                        if (window.opera) {
                            h.href = g;
                            h.title = d;
                            h.rel = "sidebar";
                            return true
                        } else {
                            alert(c())
                        }
                    }
                }
            } else {
                throw"Error occured.\r\nNote, only A tagname is allowed!"
            }
        } catch (i) {
            alert(i)
        }
    }

    return{addBookmark: b}
}();
V.comm.menu = (function () {
    var b = ['<ul class="mainmenu" id="mainMenu">', '<li><a href="' + V.Const.FRONT_DOMAIN + '/index.html">首页</a></li>', '<li><a href="' + V.Const.FRONT_DOMAIN + '/store.html">作品库</a></li>', '<li><a href="' + V.Const.FRONT_DOMAIN + '/ranklist.html">排行榜</a></li>', '<li class="line_rt"><a href="' + V.Const.FRONT_DOMAIN + '/vip.html">VIP专区</a></li>', '<li class="secondary"><a href="' + V.Const.FRONT_DOMAIN + '/findex.html">原创女频</a></li>', '<li class="secondary"><a href="' + V.Const.FRONT_DOMAIN + '/mindex.html">原创男频</a></li>', '<li class="secondary"><a href="' + V.Const.FRONT_DOMAIN + '/pindex.html">畅销图书</a></li>', '<li class="secondary"><a target="_blank" href="http://ebook.qq.com/">合作书城</a></li>', "</ul>"].join(""), a = ['<ul class="submenu">', '<li><span>原创女频 &gt;</span><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=0&cat2=558" target="_blank">古代言情</a><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=0&cat2=514" target="_blank">现代都市</a><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=0&cat2=564" target="_blank">青春小说</a><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=0&cat2=531" target="_blank">悬疑惊悚</a></li>', '<li class="line_st"></li>', '<li><span>原创男频 &gt;</span><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=1&cat2=501" target="_blank">奇幻玄幻</a><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=1&cat2=506" target="_blank">武侠仙侠</a><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=1&cat2=514" target="_blank">现代都市</a><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=1&cat2=523" target="_blank">历史军事</a></li>', '<li class="line_st"></li>', '<li><span>畅销图书 &gt;</span><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=2&cm=0&cat1=500&cat2=568" target="_blank">小说</a><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=2&cmode=1&cm=1&cat1=572&cat2=613" target="_blank">生活</a><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=2&cmode=1&cm=1&cat1=572&cat2=599" target="_blank">经管</a><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=2&cmode=1&cm=1&cat1=572&cat2=607" target="_blank">励志</a><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=2&cm=0&cat1=500&cat2=514" target="_blank">都市</a><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=2&cmode=1&cm=1&cat1=572&cat2=590" target="_blank">传记</a></li>', "</ul>"].join(""), c = ['<div class="submenu">', '<ul class="submenu1">', '<li><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=1&cat2=501" target="_blank">奇幻·玄幻</a></li>', '<li class="line_st"></li>', '<li><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=1&cat2=506" target="_blank">武侠·仙侠</a></li>', '<li class="line_st"></li>', '<li><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=1&cat2=514" target="_blank">现代·都市</a></li>', '<li class="line_st"></li>', '<li><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=1&cat2=523" target="_blank">历史·军事</a></li>', '<li class="line_st"></li>', '<li><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=1&cat2=544" target="_blank">游戏·竞技</a></li>', '<li class="line_st"></li>', '<li><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=1&cat2=536" target="_blank">科幻·空间</a></li>', '<li class="line_st"></li>', '<li><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=1&cat2=531" target="_blank">悬疑·惊悚</a></li>', '<li class="line_st"></li>', '<li><a href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=1&cat2=552" target="_blank">同人·小说</a></li>', "</ul>", "</div>"].join("");
    fnavtmpl = ['<ul class="submenu">', '<li><span>原创女频 &gt;</span><a target="_blank" href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=0&cat2=558&cat3=562">穿越奇情</a><a target="_blank" href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=0&cat2=558&cat3=560">古典架空</a><a target="_blank" href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=0&cat2=558&cat3=561">古代情缘</a></li>', '<li class="line_st"></li>', '<li><span>现代都市 &gt;</span><a target="_blank" href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=0&cat2=514&cat3=522">豪门世家</a><a target="_blank" href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=0&cat2=514&cat3=516">爱情婚姻</a><a target="_blank" href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=0&cat2=514&cat3=520">职场励志</a><a target="_blank" href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=0&cat2=514&cat3=515">都市生活</a><a target="_blank" href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=0&cat2=514&cat3=521">异术超能</a></li>', '<li class="line_st"></li>', '<li><a target="_blank" href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=0&cat2=564"><span>青春校园</span></a></li>', '<li class="line_st"></li>', '<li><a target="_blank" href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=0&cat2=558&cat3=563"><span>玄幻仙侠</span></a></li>', '<li class="line_st"></li>', '<li><a target="_blank" href="' + V.Const.FRONT_DOMAIN + '/store.html#areaId=0&cat2=531"><span>惊悚悬疑</span></a></li>', '<li><a target="_blank" href="' + V.Const.FRONT_DOMAIN + '/ffuli.html"><span class="fuli fb">作家福利</span></a></li>', "</ul>"].join("");
    setMenu = function (g, f, i) {
        var h = b;
        if (!i || i == 0) {
            h += a
        } else {
            if (i == 1) {
                h += c
            } else {
                if (i == 3) {
                    h += fnavtmpl
                }
            }
        }
        $(g).innerHTML = h;
        if (f != undefined && f >= 0 && f < 9) {
            var e = QZFL.element.get("#mainMenu li").elements[f];
            var j = e.childNodes[0];
            var d;
            if (f <= 3) {
                d = "menu_current"
            } else {
                d = "menu_current1"
            }
            e.innerHTML = j.innerHTML + "<span class=" + d + ">" + j.outerHTML + "</span>"
        }
    };
    return{init: setMenu}
})();
V.comm.showNav = function (c, a) {
    if (!a || !a.bid) {
        return
    }
    if (a.sexattr != undefined && (a.cat3Info || a.categoryInfo || a.category && a.categoryName) && a.title) {
        var b = V.util.tmpl(V.comm.nav_tmpl, {page: c, book: a});
        $("nav").innerHTML = b
    } else {
        V.util.loadJson({url: V.Const.APP_DOMAIN + "/book/navinfo", param: {bid: a.bid}, onSuccess: function (f) {
            if (f.ret == 0) {
                f.book.sexDesc = "p";
                f.book.areaId = 2;
                if (f.book.sexattr == 1) {
                    f.book.sexDesc = "m";
                    f.book.areaId = 1
                } else {
                    if (f.book.sexattr == 2) {
                        f.book.sexDesc = "f";
                        f.book.areaId = 0
                    }
                }
                var e = V.util.tmpl(V.comm.nav_tmpl, {page: c, book: f.book});
                $("nav").innerHTML = e
            }
        }})
    }
};
V.comm.rank = (function () {
    var b = {};
    var a = function (i, h, g, j) {
        j || (j = {});
        if (!j.sexDesc && h) {
            var f = h.split("_");
            if (f.length > 2) {
                j.sexDesc = f[1];
                if (f[0] == "r" || f[0] == "a" || f[0] == "pk") {
                    j.rankName = "点击"
                } else {
                    if (f[0] == "t") {
                        j.rankName = "推荐"
                    } else {
                        if (f[0] == "o") {
                            j.rankName = "人气"
                        }
                    }
                }
            }
        }
        $(i).innerHTML = V.util.tmpl(g || V.comm.rank.tmpl_rank, {rankid: h, rankdata: b[h] || {}, params: j})
    };
    var c = function (h, f, i) {
        var g = $e("#tab_" + h + " >*");
        if (g.elements.length > 0) {
            g.bind("click", function (m) {
                g.each(function (n) {
                    n.className = ""
                });
                var l = QZFL.event.getTarget(m);
                var j = l.getAttribute("rankid");
                l.className = "active";
                if (b[j]) {
                    a(h, j, f, i)
                } else {
                    d(h, j, f, i)
                }
            })
        }
    };
    var d = function (h, g, f, i) {
        V.util.loadJson({url: V.Const.APP_DOMAIN + "/rank", param: {list: g, detail: 2}, onSuccess: function (j) {
            if (j.ret == 0) {
                b[g] = j[g] ? j[g].record : {};
                a(h, g, f, i)
            }
        }})
    };
    var e = function (f, h) {
        var j = "";
        for (var g = 0; g < f.length; g++) {
            var l = f[g];
            if (g > 0) {
                j += ","
            }
            j += l.rankid
        }
        V.util.loadJson({url: V.Const.APP_DOMAIN + "/rank", param: {list: j, detail: h ? h : 0}, onSuccess: function (o) {
            if (o.ret == 0) {
                for (var m = 0; m < f.length; m++) {
                    var n = f[m];
                    b[n.rankid] = o[n.rankid] ? o[n.rankid].record : {};
                    a(n.contentid, n.rankid, n.tmpl, n.params);
                    c(n.contentid, n.tmpl, n.params)
                }
            }
        }})
    };
    return{init: e, showCover: function (j) {
        var f = j.parentNode;
        for (var g = 0; g < f.children.length; g++) {
            var h = f.children[g];
            if (h == j) {
                h.children[1].style.display = "";
                h.children[2].style.display = "none"
            } else {
                h.children[1].style.display = "none";
                h.children[2].style.display = ""
            }
        }
    }, newInstantce: function (j, f, m) {
        var l = {};
        l.contentid = j;
        var h = $e("#tab_" + j + " >*");
        if (h.elements.length > 0) {
            for (var g = 0; g < h.elements.length; g++) {
                if (h.elements[g].className == "active") {
                    l.rankid = h.elements[g].getAttribute("rankid");
                    break
                }
            }
        } else {
            l.rankid = $(j).getAttribute("rankid")
        }
        l.tmpl = f;
        l.params = m;
        return l
    }, tmpl_rank: ["<ul>", "<% for(var i = 0; i < rankdata.length; i++) { var item = rankdata[i]; %>", '<% var title = item.title, title2=""; %>', '<% if(title.length > 16) { title2=title; title=title.substr(0, 15) + "..."; } %>', '<li><a target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>" title="<%=title2%>"><%=title%></a></li>', "<% } %>", "</ul>", '<span class="booklist_more"><a target="_blank" href="ranklist.html#rankid=<%=rankid%>" title="更多"></a></span>'].join(""), tmpl_rank_nomore: ["<ul>", "<% for(var i = 0; i < rankdata.length; i++) { var item = rankdata[i]; %>", '<% var title = item.title, title2=""; %>', '<% if(title.length > 16) { title2=title; title=title.substr(0, 15) + "..."; } %>', '<li><a target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>" title="<%=title2%>"><%=title%></a></li>', "<% } %>", "</ul>"].join(""), tmpl_rank_cover: ["<ul>", "<% for(var i = 0; i < rankdata.length; i++) { var item = rankdata[i]; %>", '<% var title = item.title, title2="", title3=item.title; %>', '<% if(title.length > 16) { title2=title; title=title.substr(0, 15) + "..."; } %>', '<% if(title3.length > 8) { title3=title.substr(0, 7) + "..."; } %>', '<li onmouseover="V.comm.rank.showCover(this)" >', '<b <% if(i < 3) { %> class="act<%=i+1%>" <% } %>><%=i+1%></b>', '<div class="rankinfo" style="display:<%=(i==0 ? "" : "none")%>">', '<a target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>"><img src="<%=item.cover%>" width="50" height="72" /></a>', '<h5><a target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>" title="<%=item.title%>"><%=title3%></a></h5>', '<span>作者：<a target="_blank" href="<%=V.util.getSearchUrl(item.author)%>"><%=item.author%></a></span>', '<span class="yellow"><%=params.rankName%>：<%=item.rankValue%></span></div>', '<a style="display:<%=(i==0 ? "none" : "")%>" target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>" title="<%=title2%>"><%=title%></a>', "</li>", "<% } %>", "</ul>"].join(""), tmpl_rank_cover_all: ['<ul class="hotbook_list">', "<% for(var i = 0; i < rankdata.length; i++) { var item = rankdata[i]; %>", '<% var title = item.title, title2=""; %>', '<% if(title.length > 8) { title2=title; title=title.substr(0, 7) + "..."; } %>', "<li>", '<a class="pic" target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr, {c_f:\'rk\' + rankid})%>"><img src="<%=item.cover%>" width="90" height="128" /></a>', '<div class="f_bookinfo">', '<h5><a target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr, {c_f:\'rk\' + rankid})%>" title="<%=title2%>"><%=title%></a></h5>', '<p>作者：<a target="_blank" href="<%=V.util.getSearchUrl(item.author)%>"><span class="yellow"><%=item.author%></span></a></p>', "<% item.CategoryList = V.util.toCategoryInfo(item.categoryInfo); %>", "<% if(item.CategoryList.LastCategory) { %>", '<p>分类：<a target="_blank" href="<%=V.util.getStoreUrl(item.categoryInfo,item.sexattr)%>"><span class="yellow"><%=item.CategoryList.LastCategory.name%></span></a></p>', "<% } %>", "<span>收藏：<%=item.hotValue%></span></div>", "</li>", "<% } %>", "</ul>"].join(""), tmpl_rank_cover_more: ["<ul>", "<% for(var i = 0; i < rankdata.length; i++) { var item = rankdata[i]; %>", '<% var title = item.title, title2="", title3=item.title; %>', '<% if(title.length > 16) { title2=title; title=title.substr(0, 15) + "..."; } %>', '<% if(title3.length > 8) { title3=title.substr(0, 7) + "..."; } %>', '<li onmouseover="V.comm.rank.showCover(this)" >', '<b <% if(i < 3) { %> class="act<%=i+1%>" <% } %>><%=i+1%></b>', '<div class="rankinfo" style="display:<%=(i==0 ? "" : "none")%>">', '<a target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>"><img src="<%=item.cover%>" width="50" height="72" /></a>', '<h5><a target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>" title="<%=item.title%>"><%=title3%></a></h5>', '<span>作者：<a target="_blank" href="<%=V.util.getSearchUrl(item.author)%>"><%=item.author%></a></span>', '<span class="yellow"><%=params.rankName%>：<%=item.rankValue%></span></div>', '<a style="display:<%=(i==0 ? "none" : "")%>" target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>" title="<%=title2%>"><%=title%></a>', "</li>", "<% } %>", "</ul>", '<span class="more_btn"><a target="_blank" href="ranklist.html#rankid=<%=rankid%>" title="更多"></a></span>'].join(""), tmpl_rank_vip: ["<% if(rankdata.length > 0) { %>", "<% var topitem = rankdata[0]; %>", '<div class="vbook">', '<a class="pic" target="_blank" href="<%=V.util.getIntroUrl(topitem.bid, topitem.sexattr ,{c_f:\'rk\' + rankid})%>"><img src="<%=topitem.cover%>" alt="<%=topitem.title%>" width="90" height="128" /></a>', '<div class="v_bookinfo">', '<% var title = topitem.title, title2=""; %>', '<% if(title.length > 10) { title2=title; title=title.substr(0, 9) + "..."; } %>', '<p><a target="_blank" href="<%=V.util.getIntroUrl(topitem.bid, topitem.sexattr,{c_f:\'rk\' + rankid})%>" title="<%=title2%>"><%=title%></a></p>', '<p>作者：<a target="_blank" href="<%=V.util.getSearchUrl(topitem.author)%>"><%=topitem.author%></a></p>', "<% topitem.CategoryList = V.util.toCategoryInfo(topitem.categoryInfo); %>", "<% if(topitem.CategoryList.LastCategory) { %>", '<p>分类：<a target="_blank" href="<%=V.util.getStoreUrl(topitem.categoryInfo,topitem.sexattr)%>"><%=topitem.CategoryList.LastCategory.name%></a></p>', "<% } %>", '<p class="zong"><%=params.rankName%>：<%=topitem.rankValue%></p>', "</div></div>", '<ul class="viewlist">', "<% for(var i = 1; i < rankdata.length; i++) { var item = rankdata[i]; %>", '<% var title = item.title, title2=""; %>', '<% if(title.length > 16) { title2=title; title=title.substr(0, 15) + "..."; } %>', '<li><a target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>" title="<%=title2%>"><%=title%></a></li>', "<%}%>", "</ul>", '<div class="clear"></div>', '<span class="viewlist_more"><a target="_blank" href="ranklist.html#rankid=<%=rankid%>" title="更多"></a></span>', "<% } %>"].join(""), tmpl_rank_top: ["<% if(rankdata.length > 0) { %>", "<% var topitem = rankdata[0]; %>", '<div class="top"><span class="top1"></span><a target="_blank" href="<%=V.util.getIntroUrl(topitem.bid, topitem.sexattr, {c_f:\'rk\' + rankid})%>">', '<img src="<%=topitem.cover%>" alt="<%=topitem.title%>" width="90" height="128" /></a>', '<h5><a target="_blank" href="<%=V.util.getIntroUrl(topitem.bid, topitem.sexattr, {c_f:\'rk\' + rankid})%>"><%=topitem.title%></a></h5>', '<p><span>作者：</span><a target="_blank" href="<%=V.util.getSearchUrl(topitem.author)%>"><%=topitem.author%></a></p></div>', '<div class="ranklist">', "<ol>", "<% for(var i = 1; i < rankdata.length; i++) { var item = rankdata[i]; %>", '<% var title = item.title, title2=""; %>', '<% if(title.length > 16) { title2=title; title=title.substr(0, 15) + "..."; } %>', '<li <% if(i == rankdata.length - 1) { %>class="unline"<% } %>><b><%=i+1%></b><a target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr, {c_f:\'rk\' + rankid})%>" title="<%=title2%>"><%=title%></a></li>', "<%}%>", "</ol>", "</div>", "<% } %>"].join(""), tmpl_rank_count: ["<ul>", "<% for(var i = 0; i < rankdata.length; i++) { var item = rankdata[i]; %>", '<% var title = item.title, title2=""; %>', '<% if(title.length > 16) { title2=title; title=title.substr(0, 15) + "..."; } %>', '<li><a target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>" title="<%=title2%>"><%=title%></a><span><%=item.rankvalue%></span></li>', "<%}%>", "</ul>", '<span class="booklist_more"><a target="_blank" href="ranklist.html#rankid=<%=rankid%>" title="更多"></a></span>'].join("")}
})();
V.comm.ranknew = (function () {
    var b = {}, h = {};
    var f = function (n, m, l, o) {
        o || (o = {});
        if (!o.sexDesc && m) {
            var j = m.split("_");
            if (j.length > 2) {
                o.sexDesc = j[1];
                if (j[0] == "r" || j[0] == "a" || j[0] == "pk") {
                    o.rankName = "点击"
                } else {
                    if (j[0] == "t") {
                        o.rankName = "推荐"
                    } else {
                        if (j[0] == "o") {
                            o.rankName = "人气"
                        } else {
                            o.rankName = "点击"
                        }
                    }
                }
            }
        }
        l = l || "rank";
        h[l] = h[l] || V.util.tmpl2(V.comm.ranknew.tmpls[l]);
        $(n).innerHTML = h[l]({rankid: m, rankdata: b[m] || {}, params: o})
    };
    var c = function (m, j, n) {
        var l = $e("#tab_" + m);
        l.find("li").bind("click", function () {
            var r = l.find("li.active");
            r.removeClass("active");
            var p = r.find("span");
            var o = p.hasClass("hd3_act");
            if (o) {
                p.removeClass("hd3_act")
            }
            var s = $e(this);
            var q = s.getAttr("rankid");
            s.addClass("active");
            if (o) {
                s.find("span").addClass("hd3_act")
            }
            if (b[q]) {
                f(m, q, j, n)
            } else {
                g(m, q, j, n)
            }
        })
    };
    var g = function (m, l, j, n) {
        V.util.loadJson({url: V.Const.APP_DOMAIN + "/rank2", param: {list: l, detail: d, ps: a}, onSuccess: function (o) {
            if (o.ret == 0) {
                b[l] = o[l] ? o[l].record : {};
                f(m, l, j, n)
            }
        }})
    };
    var d = 3;
    var a = 10;
    var e = "";
    var i = function (j, q, l, o) {
        d = q || d;
        a = l || a;
        e = o || e;
        var n = "";
        for (var m = 0; m < j.length; m++) {
            var p = j[m];
            if (m > 0) {
                n += ","
            }
            n += p.rankid
        }
        V.util.loadJson({url: V.Const.APP_DOMAIN + "/rank2", param: {list: n, detail: d, ps: a}, onSuccess: function (t) {
            if (t.ret == 0) {
                for (var r = 0; r < j.length; r++) {
                    var s = j[r];
                    s.params.from = e;
                    b[s.rankid] = t[s.rankid] ? t[s.rankid].record : {};
                    f(s.contentid, s.rankid, s.tmpl, s.params);
                    c(s.contentid, s.tmpl, s.params)
                }
            }
        }})
    };
    return{init: i, showCover: function (o) {
        var p = $e(o);
        var m = p.getParent();
        var l = m.find("li.bd_act");
        l.each(function (r) {
            var q = $e(r);
            q.removeClass("bd_act");
            q.find("#simple").show();
            q.find("#detail").hide()
        });
        p.addClass("bd_act");
        p.find("#simple").hide();
        p.find("#detail").show();
        var j = p.find("img");
        var n = j.getAttr("src2");
        if (n && n.length > 0) {
            j.setAttr("src", n);
            j.setAttr("src2", "")
        }
    }, newInstantce: function (n, j, p) {
        var o = {};
        o.contentid = n;
        var m = $e("#tab_" + n + " li");
        if (m.elements.length > 0) {
            for (var l = 0; l < m.elements.length; l++) {
                if (m.elements[l].className == "active") {
                    o.rankid = m.elements[l].getAttribute("rankid");
                    break
                }
            }
        } else {
            o.rankid = $(n).getAttribute("rankid")
        }
        o.tmpl = j;
        o.params = p || {titleLen1: 48, titleLen2: 22, hideMore: false};
        return o
    }, tmpls: {rank: ["<ol>", "<%for(var i = 0; i < rankdata.length; i++) { var item = rankdata[i];%>", "<%item.CategoryList = V.util.toCategoryInfo(item.cat3Info);%>", "<% var title = item.title;", "params.titleLen1=params.titleLen1||48;", "params.titleLen2=params.titleLen2||22;", "%>", '<li onmouseover="V.comm.ranknew.showCover(this)" class="<%=(i==0?"bd_act":"")%>" >', '<%var numClass=i<3?"toprank":"";%>', '<span class="<%=numClass%>"><%=i+1%></span>', '<div id="detail" class="bookinfo" style="display:<%=(i==0 ? "" : "none")%>">', '<%var src=(i==0)?V.util.genBookCover(item.bid,item.cover,"s"):V.util.getDefaultCover("s");', 'var src2=(i==0)?"":V.util.genBookCover(item.bid,item.cover,"s");%>', '<a target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>"><img src="<%=src%>" src2="<%=src2%>"  width="50" height="70"></a>', '<h4><a target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>" ><%=QZFL.string.cut(title.trimHtml(),params.titleLen1,"...")%></a></h4>', '<p>作者：<a target="_blank" href="<%=V.util.getSearchUrl(item.author)%>"><%=item.author%></a></p>', '<p class="keep_num">分类：<a target="_blank" href="<%=V.util.getStoreUrl(item.cat3Info,item.sexattr,null,null,item.form)%>"><%=item.CategoryList.LastCategory ? item.CategoryList.LastCategory.name : ""%></a></p>', "</div>", '<a id="simple" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>" style="display:<%=(i==0 ? "none" : "")%>" ><%=QZFL.string.cut(title.trimHtml(),params.titleLen2,"...")%></a>', "</li>", "<% } %>", "</ol>", "<%if(!params.hideMore){var moreRankId=rankid;", "if(params.moreRankIdMap){moreRankId=params.moreRankIdMap[rankid]||rankid;}", 'if(params.from=="ranklist"){%>', '<a href="javascript:void(0)" onclick="ranklist.sexRanks.show({rankid:\'<%=moreRankId%>\',by:1})" title="更多" class="rank_more">更多</a>', "<%}else{%>", '<a target="_blank" href="ranklist.html#rankid=<%=moreRankId%>" title="更多" class="rank_more">更多</a>', "<%}}%>"].join(""), rank2: ["<ol>", "<%for(var i = 0; i < rankdata.length; i++) { var item = rankdata[i];%>", "<%item.CategoryList = V.util.toCategoryInfo(item.cat3Info);%>", "<% var title = item.title;", "params.titleLen1=params.titleLen1||48;", "params.titleLen2=params.titleLen2||22;", "%>", '<li onmouseover="V.comm.ranknew.showCover(this)" class="<%=(i==0?"bd_act":"")%>" >', '<%var numClass=i<3?"toprank":"";%>', '<span class="<%=numClass%>"><%=i+1%></span>', '<div id="detail" class="bookinfo" style="display:<%=(i==0 ? "" : "none")%>">', '<%var src=(i==0)?V.util.genBookCover(item.bid,item.cover,"s"):V.util.getDefaultCover("s");', 'var src2=(i==0)?"":V.util.genBookCover(item.bid,item.cover,"s");%>', '<a target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>"><img src="<%=src%>" src2="<%=src2%>"  width="50" height="70"></a>', '<h4><a target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>" ><%=QZFL.string.cut(title.trimHtml(),params.titleLen1,"...")%></a></h4>', '<p>作者：<a target="_blank" href="<%=V.util.getSearchUrl(item.author)%>"><%=item.author%></a></p>', '<p class="keep_num"><%=params.rankName%>：<em><%=item.rankValue%></em></p>', "</div>", '<div id="simple" style="display:<%=(i==0 ? "none" : "")%>"><em><%=item.rankValue%></em><a href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>"  ><%=QZFL.string.cut(title.trimHtml(),params.titleLen2,"...")%></a></div>', "</li>", "<% } %>", "</ol>", "<%if(!params.hideMore){var moreRankId=rankid;", "if(params.moreRankIdMap){moreRankId=params.moreRankIdMap[rankid]||rankid;}%>", '<span class="more"><a target="_blank" href="ranklist.html#rankid=<%=moreRankId%>"  class="rank_more">更多</a></span>', "<%}%>"].join(""), rank_nomore: ["<ol>", "<% for(var i = 0; i < rankdata.length; i++) { var item = rankdata[i];%>", "<%item.CategoryList = V.util.toCategoryInfo(item.cat3Info);%>", "<% var title = item.title, title2=title, title3=item.title; %>", '<% if(title.length > 12) { title2=title; title=title.substr(0, 11) + "..."; } %>', '<% if(title3.length > 8) { title3=title.substr(0, 7) + "..."; } %>', '<li onmouseover="V.comm.ranknew.showCover(this)" class="<%=(i==0?"bd_act":"")%>" >', '<%var numClass=i<3?"toprank":"";%>', '<span class="<%=numClass%>"><%=i+1%></span>', '<div id="detail" class="bookinfo" style="display:<%=(i==0 ? "" : "none")%>">', '<%var src=(i==0)?V.util.genBookCover(item.bid,item.cover,"s"):V.util.getDefaultCover("s");', 'var src2=(i==0)?"":V.util.genBookCover(item.bid,item.cover,"s");%>', '<a target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>"><img src="<%=src%>" src2="<%=src2%>" width="50" height="70"></a>', '<h4><a target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>" ><%=title3%></a></h4>', '<p>作者：<a target="_blank" href="<%=V.util.getSearchUrl(item.author)%>"><%=item.author%></a></p>', '<p class="keep_num">分类：<a target="_blank" href="<%=V.util.getStoreUrl(item.cat3Info,item.sexattr,null,null,item.form)%>"><%=item.CategoryList.LastCategory ? item.CategoryList.LastCategory.name : ""%></a></p>', "</div>", '<a id="simple" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>" style="display:<%=(i==0 ? "none" : "")%>" ><%=title%></a>', "</li>", "<% } %>", "</ol>"].join(""), end_rank_simple: ["<ul>", "<% for(var i = 0; i < rankdata.length; i++) { var item = rankdata[i];%>", '<li><a target="_blank" href="<%=V.util.getIntroUrl(item.bid, item.sexattr,{c_f:\'rk\' + rankid})%>"><%=QZFL.string.cut(item.title.trimHtml(),30,"...")%></a></li>', "<% } %>", "</ul>"].join("")}}
})();
V.comm.listRenderer = (function () {
    var a = {};
    var b = function (f) {
        var h = f.listContainer, e = f.tmpl || "def", d = f.records || [], g = f.params || {};
        a[e] = a[e] || V.util.tmpl2(V.comm.listRenderer.tmpls[e]);
        h.setHtml(a[e]({records: d, params: g}))
    };
    var c = function (h) {
        var i = $e(h);
        var f = i.getParent();
        var e = f.find("li.bd_act");
        e.each(function (l) {
            var j = $e(l);
            j.removeClass("bd_act");
            j.find("#simple").show();
            j.find("#detail").hide()
        });
        i.addClass("bd_act");
        i.find("#simple").hide();
        i.find("#detail").show();
        var d = i.find("img");
        var g = d.getAttr("src2");
        if (g && g.length > 0) {
            d.setAttr("src", g);
            d.setAttr("src2", "")
        }
    };
    return{render: b, onMouseOver: c, tmpls: {def: ["<ol>", "<%for(var i = 0; i < records.length; i++) { var item = records[i];%>", "<%item.CategoryList = V.util.toCategoryInfo(item.cat3Info);", "var title = item.title;", "var introUrl=V.util.getIntroUrl(item.id, item.sexattr,{c_f:params.c_f});", "params.titleLen1=params.titleLen1||48;", "params.titleLen2=params.titleLen2||26;", 'var title1=QZFL.string.cut(title.trimHtml(),params.titleLen1,"...");', 'var title2=QZFL.string.cut(title.trimHtml(),params.titleLen2,"...");%>', '<li onmouseover="V.comm.listRenderer.onMouseOver(this)" class="<%=(i==0?"bd_act":"")%>" >', '<%var numClass=i<3?"toprank":"";%>', '<span class="<%=numClass%>"><%=i+1%></span>', '<div id="detail" class="bookinfo" style="display:<%=(i==0 ? "" : "none")%>">', '<%var src=(i==0)?V.util.genBookCover(item.id,item.cover,"s"):V.util.getDefaultCover("s");', 'var src2=(i==0)?"":V.util.genBookCover(item.id,item.cover,"s");%>', '<a target="_blank" href="<%=introUrl%>"><img src="<%=src%>" src2="<%=src2%>"  width="50" height="70"></a>', '<h4><a target="_blank" href="<%=introUrl%>" ><%=title1%></a></h4>', '<p>作者：<a target="_blank" href="<%=V.util.getSearchUrl(item.author)%>"><%=item.author%></a></p>', '<p class="keep_num">分类：<a target="_blank" href="<%=V.util.getStoreUrl(item.cat3Info,item.sexattr,null,null,item.form)%>"><%=item.CategoryList.LastCategory ? item.CategoryList.LastCategory.name : ""%></a></p>', "</div>", '<a id="simple" href="<%=introUrl%>" style="display:<%=(i==0 ? "none" : "")%>" ><%=title2%></a>', "</li>", "<% } %>", "</ol>"].join("")}}
})();
V.comm.columnBooks = (function () {
    var c = {};
    var d = function (e) {
        V.util.loadJson({url: V.Const.APP_DOMAIN + "/index/columnExs", param: {cids: b(e), detail: 1}, onSuccess: function (l) {
            if (l.ret == 0) {
                for (var h = 0; h < e.length; h++) {
                    var m = e[h];
                    var f = m.container;
                    var j = V.util.parseInt(m.colId);
                    m.params.c_f = "cm" + j;
                    var g = l.columns[j];
                    a(m);
                    c[j] = g;
                    V.comm.listRenderer.render({listContainer: f.find("#bookList"), tmpl: m.tmpl, records: g, params: m.params})
                }
            }
        }, onError: function () {
        }})
    };
    var a = function (g) {
        var e = g.container;
        var f = e.find("#tabs");
        if (f.elements.length <= 0) {
            return
        }
        f.find("li").bind("click", function () {
            var j = $e(this);
            var i = f.find("li.active");
            i.removeClass("active");
            i.find("span").removeClass("hd3_act");
            j.addClass("active");
            j.find("span").addClass("hd3_act");
            var h = V.util.parseInt(j.getAttr("colId"));
            g.params.c_f = "cm" + h;
            if (c[h]) {
                V.comm.listRenderer.render({listContainer: e.find("#bookList"), tmpl: g.tmpl, records: c[h], params: g.params})
            } else {
                V.util.loadJson({url: V.Const.APP_DOMAIN + "/index/columnExs", param: {cids: h}, onSuccess: function (m) {
                    if (m.ret == 0) {
                        var l = m.columns[h];
                        c[h] = l;
                        V.comm.listRenderer.render({listContainer: e.find("#bookList"), tmpl: g.tmpl, records: l, params: g.params})
                    }
                }, onError: function () {
                }})
            }
        })
    };
    var b = function (e) {
        var g = new Array();
        for (var f = 0; f < e.length; f++) {
            g.push(e[f].colId)
        }
        return g
    };
    return{init: d, newInstance: function (e, f, i) {
        var h = {};
        h.container = $e("#" + e);
        var g = h.container.find("#tabs");
        if (g.elements.length > 0) {
            h.colId = g.find(".active").getAttr("colId")
        } else {
            h.colId = h.container.getAttr("colId")
        }
        h.tmpl = f;
        h.params = i || {};
        return h
    }}
})();
var wheelutil = {addWheelEvent: function (e, c, b) {
    var a = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
    var d = function (f) {
        return c.apply(e, !b ? [QZFL.event.getEvent(f)] : ([QZFL.event.getEvent(f)]).concat(b))
    };
    c._wheelcall = d;
    if (e.attachEvent) {
        e.attachEvent("on" + a, d)
    } else {
        if (e.addEventListener) {
            e.addEventListener(a, d, false)
        }
    }
}, removeWheelEvent: function (d, b) {
    var a = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
    var c = b._wheelcall;
    if (d.detachEvent) {
        d.detachEvent("on" + a, c)
    } else {
        if (d.removeEventListener) {
            d.removeEventListener(a, c, false)
        }
    }
    b._wheelcall = null;
    delete b._wheelcall
}, getWheelValue: function (c, b) {
    var a = window.parent.event || window.event || c;
    return a.detail ? a.detail * (b || -30) : a.wheelDelta
}};
V.ui.scrollBox = (function () {
    var a = function (d, f, c, b, e) {
        this.box = d;
        this.wrapper = f;
        this.thumb = c;
        this.track = b;
        this.ratio = 0;
        this.funcOpt = {minfunc: e.minfunc || QZFL.emptyFn, maxfunc: e.maxfunc || QZFL.emptyFn};
        this.dragger = null;
        this.bindEvent()
    };
    a.prototype.setHtml = function (b) {
        this.box.innerHTML = b;
        QZFL.dom.setStyle(this.box, "top", "0px");
        this.setThumbHeight();
        this.refreshThumbPosition()
    };
    a.prototype.insertHtml = function (e, d, c) {
        var b = e || this.box;
        if (c == undefined || c == null) {
            QZFL.dom.setStyle(this.box, "top", 0 + "px");
            b.innerHTML = d
        } else {
            if (c) {
                QZFL.dom.insertAdjacent(b, 1, d, false)
            } else {
                QZFL.dom.insertAdjacent(b, 2, d, false)
            }
        }
        this.setThumbHeight();
        this.refreshThumbPosition()
    };
    a.prototype.refreshBoxPosition = function () {
        var b = V.util.parseInt(QZFL.dom.getStyle(this.thumb, "top"));
        var c = -b * this.ratio;
        QZFL.dom.setStyle(this.box, "top", c + "px")
    };
    a.prototype.refreshThumbPosition = function () {
        var b = V.util.parseInt(QZFL.dom.getStyle(this.box, "top"));
        var c = -b / this.ratio;
        QZFL.dom.setStyle(this.thumb, "top", c + "px")
    };
    a.prototype.setThumbHeight = function () {
        QZFL.dom.setStyle(this.thumb, "display", "");
        QZFL.dom.setStyle(this.track, "display", "");
        this.dragger && this.dragger.refreshRange();
        var c = this.rate();
        var b = QZFL.dom.getRect(this.track).height;
        var e = b / c;
        QZFL.dom.setStyle(this.thumb, "height", e + "px");
        if (c == 1) {
            this.ratio = 1;
            QZFL.dom.setStyle(this.thumb, "display", "none");
            QZFL.dom.setStyle(this.track, "display", "none")
        } else {
            var f = QZFL.dom.getRect(this.box).height - V.util.parseInt(QZFL.dom.getStyle(this.box, "paddingTop"), 0) - V.util.parseInt(QZFL.dom.getStyle(this.box, "paddingBottom"), 0);
            var d = QZFL.dom.getRect(this.wrapper).height - V.util.parseInt(QZFL.dom.getStyle(this.wrapper, "paddingTop"), 0) - V.util.parseInt(QZFL.dom.getStyle(this.wrapper, "paddingBottom"), 0);
            this.ratio = (f - d) / (b - e);
            QZFL.dom.setStyle(this.thumb, "display", "");
            QZFL.dom.setStyle(this.track, "display", "")
        }
    };
    a.prototype.rate = function () {
        var c = QZFL.dom.getRect(this.box).height - V.util.parseInt(QZFL.dom.getStyle(this.box, "paddingTop"), 0) - V.util.parseInt(QZFL.dom.getStyle(this.box, "paddingBottom"), 0);
        var b = QZFL.dom.getRect(this.wrapper).height - V.util.parseInt(QZFL.dom.getStyle(this.wrapper, "paddingTop"), 0) - V.util.parseInt(QZFL.dom.getStyle(this.wrapper, "paddingBottom"), 0);
        return Math.max(1, c / b)
    };
    a.prototype.bindEvent = function () {
        wheelutil.addWheelEvent(this.wrapper, function (h, g) {
            var m = QZFL.event.getEvent(h);
            if (!m) {
                return
            }
            var l = wheelutil.getWheelValue(m);
            var i = QZFL.dom.getRect(g.box).height - V.util.parseInt(QZFL.dom.getStyle(g.box, "paddingTop"), 0) - V.util.parseInt(QZFL.dom.getStyle(g.box, "paddingBottom"), 0);
            var c = QZFL.dom.getRect(g.wrapper).height - V.util.parseInt(QZFL.dom.getStyle(g.wrapper, "paddingTop"), 0) - V.util.parseInt(QZFL.dom.getStyle(g.wrapper, "paddingBottom"), 0);
            var f = -Math.max(0, i - c);
            var j = 0;
            var d = V.util.parseInt(QZFL.dom.getStyle(g.box, "top")) + l;
            var n = g.funcOpt;
            if (d < f) {
                d = f;
                n.maxfunc()
            }
            if (d > j) {
                d = j;
                n.minfunc()
            }
            QZFL.dom.setStyle(g.box, "top", d + "px");
            g.refreshThumbPosition();
            QZFL.event.cancelBubble(m);
            QZFL.event.preventDefault(m)
        }, this);
        var b = this;
        this.dragger = V.ui.drag.bind(this.thumb, this.track, {upfunc: b.funcOpt.minfunc, downfunc: b.funcOpt.maxfunc, movefunc: function () {
            b.refreshBoxPosition()
        }})
    };
    return{init: function (d, g, c, b, e) {
        var f = new a(d, g, c, b, e);
        return{_instance: f, setHtml: function (h) {
            f.setHtml(h)
        }, insertHtml: function (j, i, h) {
            f.insertHtml(j, i, h)
        }, isDragged: function () {
            return f.dragger.isdrag
        }}
    }}
})();
V.ui.drag = function () {
    var b = window;
    var a = function (c, d, e) {
        this.subject = c;
        this.parent = d || b.document;
        this.refreshRange();
        this.funcOpt = {upfunc: e.upfunc || QZFL.emptyFn, downfunc: e.downfunc || QZFL.emptyFn, leftfunc: e.leftfunc || QZFL.emptyFn, rightfunc: e.rightfunc || QZFL.emptyFn, movefunc: e.movefunc || QZFL.emptyFn};
        this.ismouseout = false;
        this.isdrag = false;
        this.point = [0, 0]
    };
    a.prototype.refreshRange = function () {
        var c = QZFL.dom.getRect(this.subject);
        var d = QZFL.dom.getRect(this.parent);
        this.range = {top: 0, bottom: Math.max(0, d.height - c.height), left: 0, right: Math.max(0, d.width - c.width)}
    };
    a.prototype.mouseoutHandler = function (d, c) {
        if (c.isdrag && !c.ismouseout) {
            QZFL.event.addEvent(b.document, "mouseup", c.mouseupHandler, c);
            QZFL.event.addEvent(b.document, "mousemove", c.mousemoveHandler, c);
            c.ismouseout = true
        }
    };
    a.prototype.mousedownHandler = function (d, c) {
        c.isdrag = true;
        c.ismouseout = false;
        c.point = [QZFL.event.mouseX(d), QZFL.event.mouseY(d)];
        QZFL.event.preventDefault(d);
        QZFL.event.cancelBubble(d)
    };
    a.prototype.mouseupHandler = function (d, c) {
        if (!c.isdrag) {
            return
        }
        c.mousemoveHandler(d, c);
        c.isdrag = false;
        if (c.ismouseout) {
            QZFL.event.removeEvent(b.document, "mouseup", c.mouseupHandler);
            QZFL.event.removeEvent(b.document, "mousemove", c.mousemoveHandler)
        }
        c.ismouseout = false
    };
    a.prototype.mousemoveHandler = function (d, c) {
        if (!c.isdrag) {
            return
        }
        QZFL.event.preventDefault(d);
        QZFL.event.cancelBubble(d);
        var l = [QZFL.event.mouseX(d), QZFL.event.mouseY(d)];
        var m = false, j = false;
        var i, h;
        if (c.range.left != c.range.right && l[0] != c.point[0]) {
            c.refreshRange();
            i = l[0] - c.point[0];
            var g = V.util.parseInt(QZFL.dom.getStyle(c.subject, "left")) + i;
            if (g < c.range.left) {
                c.funcOpt.leftfunc()
            }
            if (g > c.range.right) {
                c.funcOpt.rightfunc()
            }
            i = Math.min(Math.max(c.range.left, g), c.range.right);
            m = true
        }
        if (c.range.top != c.range.bottom && l[1] != c.point[1]) {
            !m && c.refreshRange();
            h = l[1] - c.point[1];
            var f = V.util.parseInt(QZFL.dom.getStyle(c.subject, "top")) + h;
            if (f < c.range.top) {
                c.funcOpt.upfunc()
            }
            if (f > c.range.bottom) {
                c.funcOpt.downfunc()
            }
            h = Math.min(Math.max(c.range.top, f), c.range.bottom);
            j = true
        }
        c.point[0] = l[0];
        c.point[1] = l[1];
        m && QZFL.dom.setStyle(c.subject, "left", i + "px");
        j && QZFL.dom.setStyle(c.subject, "top", h + "px");
        c.funcOpt.movefunc()
    };
    a.prototype.init = function () {
        QZFL.event.addEvent(this.subject, "mousedown", this.mousedownHandler, this);
        QZFL.event.addEvent(this.subject, "mousemove", this.mousemoveHandler, this);
        QZFL.event.addEvent(this.subject, "mouseup", this.mouseupHandler, this);
        QZFL.event.addEvent(this.subject, "mouseout", this.mouseoutHandler, this)
    };
    return{bind: function (c, d, f) {
        var e = new a(c, d, f);
        e.init();
        return e
    }, unbind: function (c) {
        QZFL.event.removeEvent(c.subject, "mousedown", c.mousedownHandler);
        QZFL.event.removeEvent(c.subject, "mousemove", c.mousemoveHandler);
        QZFL.event.removeEvent(c.subject, "mouseup", c.mouseupHandler);
        QZFL.event.removeEvent(c.subject, "mouseout", c.mouseoutHandler)
    }}
}();
V.ui.sliderBox = (function () {
    var c = {};
    var h = function (j, i) {
        QZFL.imports(V.Const.FRONT_DOMAIN + "/js/sliderbox.js", function () {
            c[j] = silderBox.bind($(j), i);
            i.callback && i.callback()
        })
    };
    var b = function (j, i) {
        c[j] && c[j].jump(i)
    };
    var a = function (i) {
        c[i] && c[i].move()
    };
    var g = function (i) {
        c[i] && c[i].play()
    };
    var f = function (i) {
        c[i] && c[i].prev()
    };
    var e = function (i) {
        c[i] && c[i].next()
    };
    var d = function (i) {
        c[i] && c[i].stop()
    };
    return{bind: h, jump: b, move: a, play: g, prev: f, next: e, stop: d}
})();
V.util.tmplsuit = (function () {
    var a = {};
    var c = function (e, d) {
        this.id = e;
        this.func = null;
        this.template = d;
        a[e] = this
    };
    c.prototype.getHTML = function (d) {
        !this.func && (this.func = V.util.tmpl2(this.template));
        return this.func(d)
    };
    var b = function (g, e, f) {
        var d = a[g] || new c(g, e);
        return d.getHTML(f)
    };
    return b
})();
V.util.report2Server = function (b) {
    var a = new Image();
    a.setAttribute("src", b);
    a.setAttribute("width", 1);
    a.setAttribute("height", 1);
    a.setAttribute("style", "display:none;");
    a.onload = a.onerror = a.ontimeout = function (c) {
        if (a) {
            delete a
        }
    }
};
V.util.stat = (function () {
    var c = window;
    var a = "http://tajs.qq.com/stats?sId=25012328";
    var b = function (m) {
        var g = "" + m;
        var f = Math.min(g.length, 20);
        var j = "0";
        var l = "";
        for (var h = 0; h < f; h++) {
            j = g.charCodeAt(h);
            if ((j >= 97 && j <= 122) || (j >= 65 && j <= 90) || (j >= 48 && j <= 57) || j == 95) {
                l += g.charAt(h)
            }
        }
        return l
    };
    var e = function (i) {
        var n = b(V.util.getUrlParam("c_f")) || "";
        var j = b(V.util.getUrlParam("g_f")) || "";
        var h = V.util.parseInt(V.util.getUrlParam("bid"), 0);
        var m = V.util.parseInt(V.util.getUrlParam("cid"), 0);
        var g = V.Const.APP_DOMAIN + "/auth/pagestat";
        V.util.stat.param = {c_f: n, g_f: j};
        var l = i || c.location.pathname;
        var f = -1;
        if ((f = l.indexOf("/")) >= 0) {
            l = l.substr(f + 1)
        }
        !l && (l = "index.html");
        g = V.util.appendUrlParam(g, {c_f: n, g_f: j, page: l, bid: h, cid: m, g_tk: V.util.getToken(), gray: true}, false);
        V.util.report2Server(g)
    };
    var d = function (f) {
        try {
            QZFL.imports(a);
            if (typeof(pgvMain) == "function") {
                pgvMain()
            }
        } catch (g) {
        } finally {
            e(f)
        }
    };
    return d
})();
var waitEffect = (function () {
    var a = function (e) {
        var c = 37;
        var d = Math.max(10, (QZFL.dom.getSize(e)[1] - c) / 2);
        $(e).innerHTML = '<div style="margin:' + d + 'px auto; text-align:center;"><img width="' + c + '" height="' + c + '" src="images/loading.gif"><br></div>'
    }, b = function (c) {
        $(c).innerHTML = ""
    };
    return{show: a, hide: b}
})();
V.comm.getFinishedStr = function (b) {
    var a = "";
    if (b == 0) {
        a = "连载中"
    } else {
        if (b == 1) {
            a = "已完结"
        } else {
            if (b == 2) {
                a = "试读"
            }
        }
    }
    return a
};
(function () {
    var a = ["<a class='first_a' href='http://chuangshi.qq.com/' target='_blank'>创世中文网</a>", "<a class='first_a' href='http://www.readnovel.com/' target='_blank'>小说阅读网</a>", "<a href='http://www.zongheng.com/' target='_blank'>纵横中文网</a>", "<a href='http://www.fmx.cn/' target='_blank'>凤鸣轩小说网</a>", "<a href='http://xyc.cnxianzai.com/' target='_blank'>许愿草</a>", "<a href='http://www.woman.org.cn/main.asp' target='_blank'>深圳女报杂志社</a>", "<a href='http://www.merryread.com/' target='_blank'>魅丽阅读网</a>", "<a href='http://www.dushitx.com/' target='_blank'>独氏网</a>", "<a href='http://www.jielibj.com/' target='_blank'>接力出版社</a>", "<a href='http://www.hrbcbs.com/' target='_blank'>哈尔滨出版社</a>", "<a >广西人民出版社</a>", "<a href='http://www.99read.com' target='_blank'>99网上书城</a>", "<a href='http://www.hnwy.net/' target='_blank'>湖南文艺出版社</a>", "<a >花山文艺出版社</a>", "<a href='http://www.zgzjcbs.com/' target='_blank'>作家出版社</a>", "<a href='http://www.hwcbs.com.cn/' target='_blank'>华文出版社</a>", "<a href='http://www.spph.com.cn/people/index.asp' target='_blank'>上海人民出版社</a>", "<a href='http://www.21cccc.com/mainpages/default.aspx' target='_blank'>二十一世纪出版社</a>", "<a href='http://www.cjlap.com/column/default.asp' target='_blank'>长江文艺出版社</a>", "<a href='http://www.crup.com.cn/' target='_blank'>人民大学出版社</a>", "<a href='http://www.banbijiang.com/' target='_blank'>半壁江原创网</a>", "<a href='http://www.xhxsw.com/' target='_blank'>玄幻小说网</a>", "<a href='http://www.xdyqw.com/' target='_blank'>心动言情网</a>", "<a href='http://www.2100book.com/' target='_blank'>世纪小说网</a>", "<a href='http://www.inbook.net/' target='_blank'>言情小说</a>", "<a href='http://www.17k.com/' target='_blank'>17K小说网</a>", "<a href='http://vip.book.cnxianzai.com/' target='_blank'>现在原创</a>", "<a href='http://www.motie.com/' target='_blank'>磨铁中文网</a>", "<a href='http://www.huanxia.com/' target='_blank'>幻侠小说网</a>", "<a href='http://www.tadu.com/' target='_blank'>塔读文学</a>"].join(" | ");
    $("friendlink") && ($("friendlink").innerHTML = a)
})();
(function (a) {
    var b = {cache: [], callback: undefined, panel: QZFL.dom.createElementIn("div", document.body, false, {id: "tips", style: "display:none;"}), register: function (e, d) {
        if (typeof d == "function") {
            b.callback = d
        }
        var c = $(e);
        QZFL.event.addEvent(c, "keyup", function (f) {
            var g = QZFL.event.getEvent(f);
            switch (g.keyCode) {
                case 13:
                    searchBar.search(c.value);
                    break;
                case 38:
                case 40:
                default:
                    b.findDatas(c)
            }
        })
    }, findDatas: function (d, c) {
        V.util.loadJson({url: V.Const.APP_DOMAIN + "/suggestion", param: {key: d.value, size: 10}, random: true, onSuccess: function (e) {
            if (e.ret > 0) {
                b.showPanel(d, {inputText: d.value, retval: e.retval})
            } else {
                b.hidePanel()
            }
        }, onError: function (e) {
            alert(e)
        }})
    }, showPanel: function (g, d) {
        var o = this, m = d.retval, c = d.inputText;
        o.panel.style.display = "block";
        o.panel.innerHTML = "";
        for (var h = 0; h < m.length; h++) {
            var q = QZFL.dom.createElementIn("a", o.panel, false, {href: "javascript:void(0);"}), p = m[h], n = new RegExp(c, "g"), e = "<span>" + c + "</span>";
            p = p.replace(n, e).replace(/[SP]/g, "");
            var l = p.split(e);
            for (var f = 0; f < l.length; f++) {
                if (l[f] != "") {
                    l[f] = "<b>" + l[f] + "</b>"
                }
            }
            p = l.join(e);
            q.innerHTML = p;
            QZFL.event.addEvent(q, "click", function () {
                o.onSelect(g, this)
            })
        }
    }, hidePanel: function () {
        this.panel.style.display = "none";
        this.panel.innerHTML = ""
    }, onSelect: function (d, c) {
        d.value = c.innerHTML.trimHtml();
        if (typeof this.callback == "function") {
            this.callback()
        }
        this.hidePanel()
    }};
    a.autocompleted = {register: b.register, hidePannel: function () {
        b.hidePanel()
    }}
})(V.util);
V.util.headerSearcher2 = function (b, c) {
    var d = $(b);
    if (d.innerHTML != "") {
        return
    }
    if (c) {
        c = QZFL.string.escHTML(c)
    } else {
        c = ""
    }
    var a = QZFL.dom.createElementIn("input", d, false, {type: "text", value: c, "class": "search_keyword"}), e = QZFL.dom.createElementIn("a", d, false, {"class": "search-btn"});
    QZFL.event.addEvent(e, "click", function (f) {
        location.href = V.Const.FRONT_DOMAIN + "/search.html#wd=" + encodeURIComponent(a.value);
        if (typeof search != "undefined") {
            search.init(1)
        }
    });
    a.onkeydown = function () {
        var f = QZFL.event.getEvent();
        if (f.keyCode == 13) {
            e.click()
        }
    }
};
V.comm.menu2 = (function () {
    var d = V.Const.FRONT_DOMAIN + "/";
    var b = d + "ucshelf.html";
    var e = false, j = false;
    var a = [
        {url: d + "index.html", txt: "首页"},
        {url: d + "findex.html", txt: "原创女频"},
        {url: d + "mindex.html", txt: "原创男频"},
        {url: d + "pindex.html", txt: "畅销图书"},
        {url: d + "store.html", txt: "分类淘书"},
        {url: d + "ranklist.html", txt: "排行榜单"},
        {url: "javascript:void(0);", txt: "我的书架"}
    ];
    var h = [
        {url: "sex=2&cat2=30001&cat3=-1", cid: "30001", txt: "玄幻言情"},
        {url: "sex=2&cat2=30013&cat3=-1", cid: "30013", txt: "古代言情"},
        {url: "sex=2&cat2=30020&cat3=-1", cid: "30020", txt: "现代言情"},
        {url: "sex=2&cat2=30036&cat3=-1", cid: "30036", txt: "悬疑灵异"}
    ];
    var f = function (B, y, x) {
        var r = $(B);
        if (!r) {
            return
        }
        var s = "logo";
        var z = window.location.host || window.location.href || "";
        if (z.indexOf("yunqi.qq.com") >= 0) {
            var w = "", q = {}, A = "", C = "", p, o;
            s = "yq_logo";
            var v = QZFL.dom.getElementsByClassName("class_nav")[0];
            if (v) {
                v.style.display = "none"
            }
            var m = false;
            A = y == 1 ? ' class="active" ' : "";
            q = a[1];
            C = q.url;
            C = V.util.appendStatParamsToUrl(C);
            w += "<li" + A + '><a href="' + C + '">首页</a></li>';
            for (var t = 0; t < h.length; t++) {
                q = h[t];
                p = x || V.util.getUrlParam("cat2");
                o = V.util.getUrlParam("sex") || 2;
                A = (q.cid == p && o == 2) ? ' class="active" ' : "";
                C = q.url;
                w += "<li" + A + '><a href="javascript:void(0);" onclick="V.comm.menu2.ref(\'' + B + "', " + t + ", " + y + ');return false;">' + q.txt + "</a></li>";
                if (q.cid == p) {
                    m = true
                }
            }
            for (var t = 5; t < a.length; t++) {
                q = a[t];
                A = (!m && y == t) ? ' class="active" ' : "";
                C = q.url;
                if (t == 6) {
                    w += "<li" + A + '><a href="' + C + '" onclick="V.comm.menu2.login();return false;">' + q.txt + '</a><em class="new_tip" style="display:none;" id="new_tip"></em></li>'
                } else {
                    if (t == 5) {
                        C = d + "ranklist.html#rankid=r_f_d_a_-1_30&pageNo=1&dm=1&sub=0"
                    }
                    C = V.util.appendStatParamsToUrl(C);
                    w += "<li" + A + '><a href="' + C + '">' + q.txt + "</a></li>"
                }
            }
            r.innerHTML = w
        } else {
            if (j) {
                return
            }
            var w = "", q = {}, A = "", C = "";
            for (var t = 0; t < a.length; t++) {
                q = a[t];
                A = y == t ? ' class="active" ' : "";
                C = q.url;
                if (t == 6) {
                    w += "<li" + A + '><a href="' + C + '" onclick="V.comm.menu2.login();return false;">' + q.txt + '</a><em class="new_tip" style="display:none;" id="new_tip"></em></li>'
                } else {
                    C = V.util.appendStatParamsToUrl(C);
                    w += "<li" + A + '><a href="' + C + '">' + q.txt + "</a></li>"
                }
            }
            r.innerHTML = w
        }
        var l = $("logo");
        if (l) {
            l.className = s
        }
        g(B);
        j = true
    }, i = function () {
        V.user.loginHelper.loginDo(function () {
            b = V.util.appendStatParamsToUrl(b);
            var l = $("new_tip");
            if (l.style.display != "none") {
                if (b.indexOf("#") > 0 || b.indexOf("?") > 0) {
                    b = b + "&m2=1"
                } else {
                    b = b + "#m2=1"
                }
            }
            location.href = b
        })
    }, c = function (l, m, o) {
        var p = h[m];
        if (o == 4) {
            if (p) {
                f(l, o, p.cid);
                if (store) {
                    store.refresh(p.url + "&g_f=" + V.util.stat.param.g_f)
                }
            }
        } else {
            if (p) {
                location.href = d + "store.html#" + p.url + "&g_f=" + V.util.stat.param.g_f
            }
        }
    }, g = function (l, m) {
        if (e) {
            return
        }
        V.util.goTop.init();
        e = true
    };
    return{init: f, login: i, ref: c}
})();
V.util.appendStatParamsToUrl = function (a) {
    if (!V.util.stat.param || V.util.stat.param.g_f == "") {
        return a
    }
    if (a.indexOf("#") > 0 || a.indexOf("?") > 0) {
        if (a.indexOf("g_f") < 0) {
            a += "&g_f=" + V.util.stat.param.g_f
        }
    } else {
        a += "?g_f=" + V.util.stat.param.g_f
    }
    return a
};
V.comm.ad = (function () {
    var c = function (d) {
        for (var g = 0; g < d.length; g++) {
            var h = d[g].containers;
            var e = d[g].tmpl;
            var f = d[g].opt || {};
            h.each(function (i) {
                b($e(i), e, f)
            })
        }
    };
    var b = function (d, e, f) {
        var g = d.getAttr("pos");
        V.util.loadJson({url: V.Const.APP_DOMAIN + "/index/ad", param: {ad: g}, onSuccess: function (h) {
            if (h.ret == 0) {
                a(d, h, e, f)
            }
        }, onError: function () {
        }})
    };
    var a = function (d, h, e, g) {
        len = h.value ? h.value.length : 0;
        if (len == 0) {
            d.hide()
        } else {
            e = e || V.comm.ad.tmpl_default;
            var f = V.util.parseInt(Math.random() * len);
            var j = h.value[f];
            d.setHtml(V.util.tmpl(e, {info: j, opt: g}));
            d.show()
        }
    };
    return{init: c, newInstance: function (e, d, f) {
        return{containers: e, tmpl: d, opt: f}
    }, tmpl_default: ["<%var url=info.id!=0? V.util.getIntroUrl(info.id, -1, opt.exParams) : V.util.appendUrlParam(info.url,opt.exParams);", "var width=opt.adw||1000,height=opt.adh||90;%>", '<a href="<%=url%>"  target="_blank"><img src="<%=info.cover%>" width="<%=width%>" height="<%=height%>" alt=""/></a>', ""].join("")}
})();
V.util.getReadUrl = function (a, g, d) {
    var f = "";
    if (d != null) {
        d.g_f = d.g_f || V.util.stat.param.g_f;
        d.c_f = d.c_f || V.util.stat.param.c_f;
        for (k in d) {
            f += "&" + k + "=" + d[k]
        }
    } else {
        var b = V.util.stat.param.g_f;
        f += "&g_f=" + b;
        var e = (d && d.c_f) || V.util.stat.param.c_f || "";
        f += "&c_f=" + e
    }
    var c = "read.html";
    if (g > 1) {
        return V.Const.FRONT_DOMAIN + "/" + c + "?bid=" + a + "&cid=" + g + f
    } else {
        return V.Const.FRONT_DOMAIN + "/" + c + "?bid=" + a + f
    }
};
V.util.toStatusName = function (a) {
    var b = "";
    switch (V.util.parseInt(a, -1)) {
        case 0:
            b = "连载";
            break;
        case 1:
            b = "全本";
            break;
        case 2:
            b = "节选";
            break
    }
    return b
};
V.util.miniNav = (function () {
    var c = null, d = null, f = null, j = false;
    var o = ['<div class="fr" style="display: block;">', '<div class="fr top_icon">', '<a class="mailLogin" target="_blank" href="http://mail.qq.com"></a>', '<a	class="qzoneLogin" target="_blank" href="http://qzone.qq.com"></a>', '<a class="weiboLogin" target="_blank"	href="http://t.qq.com"></a>', "</div>", '<div class="fr nav_pad go_author"><a href="http://author.book.qq.com/" target="_blank">作者专区</a> | </div>', '<div class="fr login_icon">', '<a class="login" target="_self" onclick="V.user.loginHelper.loginDo();return false;"	href="javascript:void(0);"></a>', "</div>", "</div>"].join("");
    var g = ['<div class="fr">', '<div class="fr top_icon">', '<a class="mailLogined" target="_blank" href="http://mail.qq.com"></a>', '<a class="qzoneLogined" target="_blank" href="http://qzone.qq.com"></a>', '<a class="weiboLogined" target="_blank" href="http://t.qq.com"></a>', "</div>", '<div class="fr nav_pad go_author"><a href="http://author.book.qq.com/" target="_blank">作者专区</a> | </div>', '<div class="qqNameLayout fr nav_pad go_logined"> ', '<span class="pop_3" id="pop_3" style="display:none;"></span>', '<span class="qqName"> 您好， ', '<span id="userName">', '<a href="ucshelf.html" target="_blank"><%=nick%></a></span>', '<a  target="_self" href="javascript:void(0);" onclick="V.util.miniNav.logout();return false;">[退出 ]</a></span> | </div>', "</div>"].join("");
    var m = function (r) {
        var q = $("toindex");
        if (q) {
            q.href = V.Const.FRONT_DOMAIN + "/index.html"
        }
        r = r || "mininavRight";
        d = $(r);
        if (d) {
            if (V.user.loginHelper.isLogin()) {
                c = c || V.util.tmpl2(g);
                d.innerHTML = c({nick: QZFL.string.escHTML(V.user.loginHelper.getUserInfo().nickname) || V.user.loginHelper.getUserInfo().uin});
                a()
            } else {
                n()
            }
        }
    }, p = function () {
        V.user.loginHelper.logout(function () {
            n()
        })
    }, n = function () {
        d.innerHTML = o
    }, a = function () {
        V.util.loadJson({url: V.Const.APP_DOMAIN + "/user/msg/count", onSuccess: function (r) {
            if (r.ret == 0) {
                var q = $("pop_3");
                if (q && r.value > 0) {
                    q.innerHTML = r.value + '+<em style="display:none;" id="mess_em"></em><div class="mess_tip" id="mess_tip" style="display:none;"></div>';
                    i();
                    q.style.display = ""
                }
            }
        }, onError: function () {
        }})
    }, i = function () {
        $e("#pop_3").onHover(function () {
            j = true;
            if (!f) {
                V.util.loadJson({url: V.Const.APP_DOMAIN + "/user/msg/list", onSuccess: function (q) {
                    if (q.ret == 0) {
                        if (q.value) {
                            f = q.value;
                            b(f)
                        }
                    }
                }, onError: function () {
                }})
            } else {
                l()
            }
        }, function () {
            j = false;
            V.util.timerManager.submit(function () {
                if (j) {
                    return
                }
                e()
            }, 2000, -1)
        });
        $e("#mess_tip").onMouseEnter(function () {
            j = true
        });
        $e("#mess_tip").onMouseLeave(function () {
            j = false;
            e()
        })
    }, b = function (v) {
        if (v) {
            var r = "";
            var u = "";
            for (var s = 0; s < f.length; s++) {
                var q = f[s];
                var t = q.type == 1 ? "赞" : "回复";
                u = V.util.parseInt(q.nick, 0);
                if (u == 0) {
                    u = QZFL.string.cut(q.nick, 10, "...")
                }
                r = r + '<a href="javascript:void(0);" onclick="V.util.miniNav.toIntro(' + q.id + "," + q.bid + ", " + q.commentId + ');return false;">' + u + t + "了你的评论</a>"
            }
            $("mess_tip").innerHTML = r;
            l()
        }
    }, e = function () {
        $("mess_em").style.display = "none";
        $("mess_tip").style.display = "none"
    }, l = function () {
        $("mess_em").style.display = "";
        $("mess_tip").style.display = ""
    }, h = function (t, r, s) {
        var q = V.util.getIntroUrl(r, 0, {c_f: "commentmsg"});
        V.util.loadJson({url: V.Const.APP_DOMAIN + "/user/msg/read", param: {mid: t}, onSuccess: function (u) {
            location.href = q
        }, onError: function () {
            location.href = q
        }})
    };
    return{init: m, logout: p, toIntro: h}
})();
V.util.ranklist = (function () {
    var b = function (e) {
        var c = e.tmpl;
        var g = e.data;
        var h = e.ulid;
        var f = $(h);
        if (!c || !g || !f) {
            return
        }
        var d = V.util.tmpl2(c, g);
        f.innerHTML = d;
        a(h)
    }, a = function (c) {
        $e("#" + c + " li").onMouseOver(function (n) {
            $e("#" + c + " li").each(function (w) {
                var q = $e(this);
                var v = q.getChildren().elements;
                var u = null, t = null, x = null, r = null;
                for (var s = 0; s < v.length; s++) {
                    u = v[s];
                    (u.nodeName == "EM") && (t = u);
                    (u.nodeName == "DIV") && (x = u);
                    (u.nodeName == "A") && (r = u)
                }
                if (q.getAttr("_id") == 9) {
                    q.eq().className = "ten"
                } else {
                    q.eq().className = ""
                }
                x.style.display = "none";
                t && (t.style.display = "");
                r.style.display = ""
            });
            var p = $e(this);
            var d = p.getChildren().elements;
            var n = null, g = null, f = null, o = null;
            for (var l = 0; l < d.length; l++) {
                n = d[l];
                (n.nodeName == "EM") && (g = n);
                (n.nodeName == "DIV") && (f = n);
                (n.nodeName == "A") && (o = n)
            }
            if (p.getAttr("_id") == 9) {
                p.eq().className = "bd_act ten"
            } else {
                p.eq().className = "bd_act"
            }
            var m = p.find("img");
            var h = m.getAttr("src2");
            var j = m.getAttr("loaded");
            if (j == "0") {
                m.setAttr("src", h);
                m.setAttr("loaded", "1")
            }
            f.style.display = "";
            g && (g.style.display = "none");
            o.style.display = "none"
        })
    };
    return{render: b}
})();
V.util.getQZoneImgUrl = function (a) {
    return"http://qlogo.store.qq.com/qzone/" + a + "/" + a + "/50"
};
V.util.cut = function (d, a, c) {
    if (!d || a <= 0) {
        return""
    }
    var b = d.length;
    if (b > a) {
        d = d.substring(0, a) + c
    }
    return d
};
V.util.goTop = (function (b) {
    var a = function () {
        var c = $(b);
        if (!c) {
            c = QZFL.dom.getElementsByClassName("go_top")[0]
        }
        if (c) {
            QZFL.event.addEvent(c, "click", function () {
                QZFL.dom.setScrollTop(0, parent.document)
            })
        }
    };
    return{init: a}
})();
V.util.getDefaultCover = function (a) {
    return"http://wfqqreader.3g.qq.com/cover/" + a + "_default.jpg"
};
V.user.historyViewer = (function () {
    var j = false, d = new Array(), n = false, c = "", e = null;
    var b = '<a href="javascript:void(0);" id="history_btn">阅读记录</a> <span	class="top" id="history_top" style="display: none;"></span><ul id="history_ul" style="display: none;"><li name="history_li" ><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您还没有浏览记录</span></li></ul>';
    var l = ['<a href="javascript:void(0);" id="history_btn">阅读记录</a> <span	class="top" id="history_top" style="display: none;"></span>', '<ul id="history_ul" style="display: none;">', "	<%for(var i=0;i<books.length;i++){var info=books[i];%>", '	 <li name="history_li" ><span><a href="<%=V.util.getReadUrl(info.bid,info.cid)%>"><%=V.util.cut(QZFL.string.escHTML(info.title),14,"...")%></a></span><a href="javascript:void(0);" class="close" name="delhis_btn" _id="<%=info.bid%>"></a></li>', "	<%}%>", "</ul>"].join("");
    var f = function (o) {
        n = o.close;
        c = $(o.divid);
        if (n || !c) {
            return
        }
        V.util.timerManager.init(100);
        V.user.readHistory.init();
        $e("#history_btn").onHover(function () {
            h()
        }, function () {
        })
    }, h = function () {
        var p = V.user.readHistory.get(), o = p.length, s = {};
        var r = new Array();
        for (var q = 0; q < o; q++) {
            s = p[q];
            r.push(s.bid);
            d[s.bid] = s.cid
        }
        if (r.length > 0) {
            V.util.loadJson({url: V.Const.APP_DOMAIN + "/book/list", param: {bids: r.join(",")}, onSuccess: function (t) {
                a(t)
            }, onError: function () {
                a(data)
            }})
        } else {
            a()
        }
    }, a = function (r) {
        var q = 0, o = new Array();
        if (r && r.books) {
            var t = r.books, s = {};
            for (q = 0; q < t.length; q++) {
                s = t[q];
                s.cid = d[s.bid] || 1;
                o.push(s)
            }
        }
        var p = b;
        if (q != 0) {
            e = e || V.util.tmpl2(l);
            p = e({books: o})
        }
        c.innerHTML = p;
        i()
    }, i = function () {
        $e("#history_btn").onHover(function () {
            j = true;
            m()
        }, function () {
            j = false;
            V.util.timerManager.submit(function () {
                if (j) {
                    return
                }
                g()
            }, 2000, -1)
        });
        $e("#history_ul").onMouseEnter(function () {
            j = true
        });
        $e("#history_ul").onMouseLeave(function () {
            j = false;
            g()
        });
        $e("[name='history_li']").onHover(function (p) {
            var o = $e(this).eq();
            o.className = "active"
        }, function (p) {
            var o = $e(this).eq();
            o.className = ""
        });
        $e("[name='delhis_btn']").onClick(function (q) {
            var o = $e(this).getAttr("_id");
            var p = $e(this).getParent();
            V.user.readHistory.del(o, function () {
                p.remove();
                var r = $e("#history_ul li").elements.length;
                if (r == 0) {
                    $("history_ul").innerHTML = '<li name="history_li" ><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您还没有浏览记录</span></li>'
                }
            })
        })
    }, g = function () {
        $("history_top").style.display = "none";
        $("history_ul").style.display = "none"
    }, m = function () {
        $("history_top").style.display = "";
        $("history_ul").style.display = ""
    };
    return{init: f}
})();
V.util.loginFrame = (function () {
    var b = "http://ui.ptlogin2.qq.com/cgi-bin/login?", j = "19000301", d = "self";
    var h = V.Const.FRONT_DOMAIN + "/loginproxy.html?params=";
    var e = "ptlogin2_div_container_ex", g = $(e);
    var i = function (l) {
        c();
        f(l.data, function (m) {
            if (typeof l.func == "function") {
                l.func(m)
            }
            if (typeof window.loginFrameFn == "function") {
                window.loginFrameFn(m)
            }
            if (l.backurl) {
                location.href = l.backurl
            }
        })
    }, c = function () {
        window.ptlogin2_onResize = function (m, l) {
            QZFL.maskLayout.create();
            g.style.zIndex = QZFL.maskLayout.getRef().style.zIndex + 1;
            g.style.display = "block";
            m = Math.max(m, 372);
            l = Math.max(l, 312);
            g.getElementsByTagName("iframe")[0].style.width = m + "px";
            g.getElementsByTagName("iframe")[0].style.height = l + "px";
            setTimeout(function () {
                a(g)
            }, 10)
        };
        window.ptlogin2_onClose = function () {
            QZFL.maskLayout.remove(true);
            if (g) {
                g.style.display = "none"
            }
        }
    }, f = function (p, o) {
        if (g) {
            g.innerHTML = '<iframe src="about:blank" frameborder="no" scrolling="no" width="100%" height="100%" id="ptLoginFrame"></iframe>'
        } else {
            var m = '<div id="' + e + '" style="position:absolute; left:-1000px; top:-1000px;z-index:1001"><iframe src="about:blank" frameborder="no" scrolling="no" width="100%" height="100%" id="ptLoginFrame"></iframe></div>';
            QZFL.dom.insertAdjacent(document.body, 2, m, false);
            g = $(e)
        }
        g.style.display = "none";
        var n = [];
        for (var l in p) {
            n.push(l + "," + encodeURIComponent(p[l]))
        }
        h = h + n.join(";");
        b = b + "appid=" + j + "&s_url=" + encodeURIComponent(h) + "&target=" + d;
        g.getElementsByTagName("iframe")[0].src = b;
        g.getElementsByTagName("iframe")[0].callback = function (q) {
            g.style.display = "none";
            V.user.loginHelper.init(QZFL.emptyFn, function () {
                V.util.miniNav.init()
            }, true);
            QZFL.maskLayout.remove(true);
            if (typeof o == "function") {
                o(q)
            }
        }
    }, a = function (l) {
        function m() {
            if (l.style.display == "none") {
                return
            }
            var n = document.compatMode == "CSS1Compat" && document.documentElement.clientWidth || document.body.clientWidth;
            var o = document.compatMode == "CSS1Compat" && document.documentElement.clientHeight || document.body.clientHeight;
            l.style.margin = "0";
            l.style.left = (n - l.offsetWidth) / 2 + (ua.ie < 7 ? Math.max(document.body.scrollLeft, document.documentElement.scrollLeft) : 0) + "px";
            l.style.top = (o - l.offsetHeight) / 2 + (ua.ie < 7 ? Math.max(document.body.scrollTop, document.documentElement.scrollTop) : 0) + "px";
            l.style.position = (ua.ie < 7) ? "absolute" : "fixed"
        }

        m();
        window.onresize = m;
        if (ua.ie < 7) {
            window.onscroll = m
        }
    };
    return{login: i}
})();
V.util.addComment = function (a, b, d, c) {
    if (b.length > 500) {
        QZFL.widget.msgbox.show("评论内容至多500字!", 5, 3000);
        return
    }
    if (b.length <= 0) {
        QZFL.widget.msgbox.show("评论内容不能为空!", 5, 3000);
        return
    }
    V.user.loginHelper.loginDo(function () {
        V.util.postForm({url: V.Const.APP_DOMAIN + "/user/comment/add", param: {bid: a, content: b, from: c || ""}, random: true, onSuccess: function (e) {
            switch (e.ret) {
                case 0:
                    QZFL.widget.msgbox.show("评论发表成功!", 4, 3000);
                    d && d();
                    break;
                case 1:
                    QZFL.widget.msgbox.show("操作太频繁了，请休息一会再来评论吧!", 5, 3000);
                    break;
                case 2:
                    QZFL.widget.msgbox.show("评论内容不合法", 5, 3000);
                    break
            }
        }, onError: function () {
        }})
    })
};
V.util.addFavorite = function () {
    if (document.all) {
        try {
            window.external.addFavorite(window.location.href, document.title)
        } catch (a) {
            QZFL.dialog.create("温馨提示", "<p style='margin:10px 0 0 10px; font-size:14px;'>您使用的浏览器不支持自动收藏,请使用快捷键Ctrl+D收藏</p>", {height: 50})
        }
    } else {
        if (window.sidebar) {
            try {
                window.sidebar.addPanel(document.title, window.location.href, "")
            } catch (a) {
                QZFL.dialog.create("温馨提示", "<p style='margin:10px 0 0 10px; font-size:14px;'>您使用的浏览器不支持自动收藏,请使用快捷键Ctrl+D收藏</p>", {height: 50, showMask: true, buttonConfig: [
                    {type: QZFL.dialog.BUTTON_TYPE.Confirm, text: "确定", clickFn: function () {
                        QZFL.dialog.getCurrentDialog().unload()
                    }}
                ]})
            }
        } else {
            QZFL.dialog.create("温馨提示", "<p style='margin:10px 0 0 10px; font-size:14px;'>您使用的浏览器不支持自动收藏,请使用快捷键Ctrl+D收藏</p>", {height: 50, showMask: true, buttonConfig: [
                {type: QZFL.dialog.BUTTON_TYPE.Confirm, text: "确定", clickFn: function () {
                    QZFL.dialog.getCurrentDialog().unload()
                }}
            ]})
        }
    }
};
V.util.getFavorUrl = function (c, b, g, f) {
    b = b || 0;
    g = g || 0;
    c = c || 0;
    f = (f && encodeURIComponent(f)) || "";
    var e = window.location.host || window.location.href || "";
    var a = "tx";
    if (e.indexOf("yunqi.qq.com") >= 0) {
        a = "yq"
    }
    return V.Const.APP_DOMAIN + "/favorurl?bid=" + b + "&cid=" + g + "&type=" + c + "&from=" + a + "&title=" + f
};
V.util.subscription = function (b) {
    if (!b.bid) {
        return
    }
    var a = b.bid;
    var d = function () {
        b.button.innerHTML = "订阅更新提醒";
        QZFL.event.addEvent(b.button, "click", function () {
            V.user.loginHelper.loginDo(function () {
                V.util.loadJson({url: V.Const.APP_DOMAIN + "/user/bookshelf/addsub", param: {bid: a, c_f: V.util.stat.param.c_f, g_f: V.util.stat.param.g_f}, random: true, onSuccess: function (e) {
                    if (e.ret == 0) {
                        b.button.innerHTML = "取消订阅";
                        QZFL.event.removeEvent(b.button, "click");
                        c();
                        QZONE.widget.msgbox.show("订阅成功！您可以在“我的书架”管理订阅！", 4, 2000)
                    } else {
                        if (e.ret == -4) {
                            QZONE.widget.msgbox.show("您最多可以订阅3本，请进入“我的书架”管理订阅", 3, 3000)
                        } else {
                            if (e.ret == -10) {
                                QZONE.widget.msgbox.show("您已经订阅过该书!", 3, 3000)
                            } else {
                                QZONE.widget.msgbox.show("订阅失败请稍后重试!", 5, 3000)
                            }
                        }
                    }
                }, onError: function () {
                    QZONE.widget.msgbox.show("订阅失败请稍后重试!", 5, 3000)
                }})
            })
        })
    };
    var c = function () {
        b.button.innerHTML = "取消订阅";
        QZFL.event.addEvent(b.button, "click", function () {
            V.user.loginHelper.loginDo(function () {
                V.util.postForm({url: V.Const.APP_DOMAIN + "/user/bookshelf/delsub", param: {bid: a}, random: true, onSuccess: function (e) {
                    if (e.ret == 0) {
                        QZFL.event.removeEvent(b.button, "click");
                        d();
                        QZONE.widget.msgbox.show("取消订阅成功！", 4, 2000)
                    }
                }, onError: function () {
                    QZONE.widget.msgbox.show("取消失败请稍后重试!", 5, 3000)
                }})
            })
        })
    };
    V.util.loadJson({url: V.Const.APP_DOMAIN + "/user/bookshelf/issub", param: {bid: a}, random: true, onSuccess: function (e) {
        if (e.ret == 0) {
            c()
        } else {
            d()
        }
        if (e.finished == 0 || e.ret == -100) {
            b.show && b.show()
        }
    }})
};
V.util.compressNumber = function (b) {
    if (b == null) {
        return""
    }
    if (b >= 100000000) {
        var a = (parseInt(b / 10000000)) / 10 + "";
        if (a.indexOf(".") < 0) {
            a = a + ".0"
        }
        return a + "亿"
    } else {
        if (b >= 10000) {
            var a = (parseInt(b / 1000)) / 10 + "";
            if (a.indexOf(".") < 0) {
                a = a + ".0"
            }
            return a + "万"
        } else {
            return b + ""
        }
    }
};
Array.prototype.shuffle = function () {
    for (var b, a, c = this.length; c; b = parseInt(Math.random() * c), a = this[--c], this[c] = this[b], this[b] = a) {
    }
    return this
};
V.util.fillObj = function (c, b) {
    for (var a in b) {
        if (!c[a]) {
            c[a] = b[a]
        }
    }
};
V.util.comfirm = function (b, a) {
    QZFL.imports(V.Const.FRONT_DOMAIN + "/js/confirm.js", function () {
        Dialog.asure(b, a)
    })
};
V.util.updateStatus = (function () {
    var f = QZFL.cookie.get("uin");
    var b = "BOOK_UPS_" + f;
    var e = function () {
        var g = QZFL.cookie.get(b);
        var h = (new Date().getTime() / 1000) - 3 * 60;
        if (g < h) {
            d()
        } else {
            a()
        }
    }, d = function () {
        var g = new Date().getTime() / 1000;
        V.util.loadJson({url: V.Const.APP_DOMAIN + "/user/bookshelf/refreshUpdateStatus", random: true, onSuccess: function (h) {
            if (h.status == 1) {
                QZFL.cookie.set(b, g, window.location.host, "", 24);
                c()
            }
        }, onError: function () {
        }})
    }, a = function () {
        V.util.loadJson({url: V.Const.APP_DOMAIN + "/user/bookshelf/getUpdateStatus", random: true, onSuccess: function (g) {
            if (g.status == 1) {
                c()
            }
        }, onError: function () {
        }})
    }, c = function () {
        var g = $("new_tip");
        if (g) {
            g.style.display = ""
        }
    };
    return{init: e}
})();
V.util.share2qq = (function () {
    var d = ['<div style=" border: 1px solid #b5c1ca;background-color: #FAFCFF;position: relative;z-index: 5;">', '<div style=" height: 24px;background: #EEF4F6 url(http://mat1.gtimg.com/www/images/nav/loginpop_tbg.png) repeat-x;border-bottom: 1px solid #CED3E4;">', '<h3 style="float: left;margin: 0;padding: 3px 0 0 12px;color: #666;font-size: 13px;font-weight: normal;line-height: 18px;overflow: hidden;font-family: Arial, Helvetica, sans-serif;">分享给QQ好友</h3>', '<a title="关闭" style=" font-weight: bold;display: -moz-inline-stack;display: inline-block;line-height: 9px;width: 11px;height: 10px;position: absolute;top: 6px;right: 10px;cursor: pointer;font-family: "Comic Sans MS","Verdana", cursive;color: #99ADBA;" id="closeBtn" href="javascript:void(0)">X</a></div>', '<div style=" color: #000000;background-color: #FAFCFF;height: 511px;"><iframe id="ifrm" src=""></iframe></div>', "</div>", '<div class="bg">', "</div>"].join(""), g, a;
    var f = function () {
        g = $e("body").create("div", {id: "share2qq", style: "overflow: hidden;padding: 7px;position: absolute;z-index: 999999;zoom: 1;font-size: 12px;font-family: Arial, Sans-Serif;display: none;width: 722px;height:550px"});
        g.setHtml(d);
        a = g.find("#ifrm");
        g.find("#closeBtn").bind("click", function () {
            e()
        })
    };
    var c = function (m, p) {
        m = m || {};
        if (!g) {
            f()
        }
        initShareWin(g.elements[0], a.elements[0], p);
        var n = [];
        for (var l in m) {
            n.push(l + "=" + encodeURIComponent(m[l] || ""))
        }
        a.setAttr("src", "http://connect.qq.com/widget/shareqq/iframe_index.html?" + n.join("&"));
        g.show();
        var j = g.getSize() || [0, 0];
        var o = Math.round((QZFL.dom.getClientHeight() - j[1]) / 2 + QZFL.dom.getScrollTop());
        var h = Math.round((QZFL.dom.getClientWidth() - j[0]) / 2 + QZFL.dom.getScrollLeft());
        o = o < 0 ? 0 : o;
        h = h < 0 ? 0 : h;
        g.setXY(h, o)
    };
    var e = function () {
        if (g) {
            g.hide();
            a.setAttr("src", "")
        }
    };
    var b = function (j, p) {
        j = j || {};
        var i = j.bid || 0;
        var o = QZFL.string.escHTML(QZFL.string.trim(j.title || ""));
        var l = QZFL.string.escHTML(QZFL.string.trim(j.intro || ""));
        var h = "http://book.qq.com/intro.html?bid=" + i;
        var n = "你看过这本书吗？";
        var m = V.util.genBookCover(i, true, "b");
        c({url: h, desc: n, title: o, summary: l, pics: m}, p)
    };
    return{open: c, close: e, shareBook: b}
})();
V.util.charge = function (a) {
    a = a || QZFL.emptyFn;
    QZFL.imports("http://fusion.qq.com/fusion_loader?appid=1450000219&platform=website", function () {
        fusion2.dialog.pay({zoneid: 1, pf: "desktop_m_qq-1001-android-portal", _appid: 1450000219, sandbox: false, onClose: a})
    })
};