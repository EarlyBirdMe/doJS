(function (e, t) {
    var n, r, i = typeof t, o = e.document, a = e.location, s = e.jQuery, u = e.$, l = {}, c = [], p = "1.9.1", f = c.concat, d = c.push, h = c.slice, g = c.indexOf, m = l.toString, y = l.hasOwnProperty, v = p.trim, b = function (e, t) {
        return new b.fn.init(e, t, r)
    }, x = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, w = /\S+/g, T = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, N = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/, C = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, k = /^[\],:{}\s]*$/, E = /(?:^|:|,)(?:\s*\[)+/g, S = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, A = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, j = /^-ms-/, D = /-([\da-z])/gi, L = function (e, t) {
        return t.toUpperCase()
    }, H = function (e) {
        (o.addEventListener || "load" === e.type || "complete" === o.readyState) && (q(), b.ready())
    }, q = function () {
        o.addEventListener ? (o.removeEventListener("DOMContentLoaded", H, !1), e.removeEventListener("load", H, !1)) : (o.detachEvent("onreadystatechange", H), e.detachEvent("onload", H))
    };
    b.fn = b.prototype = {jquery: p, constructor: b, init: function (e, n, r) {
        var i, a;
        if (!e)return this;
        if ("string" == typeof e) {
            if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : N.exec(e), !i || !i[1] && n)return!n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
            if (i[1]) {
                if (n = n instanceof b ? n[0] : n, b.merge(this, b.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : o, !0)), C.test(i[1]) && b.isPlainObject(n))for (i in n)b.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
                return this
            }
            if (a = o.getElementById(i[2]), a && a.parentNode) {
                if (a.id !== i[2])return r.find(e);
                this.length = 1, this[0] = a
            }
            return this.context = o, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : b.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), b.makeArray(e, this))
    }, selector: "", length: 0, size: function () {
        return this.length
    }, toArray: function () {
        return h.call(this)
    }, get: function (e) {
        return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
    }, pushStack: function (e) {
        var t = b.merge(this.constructor(), e);
        return t.prevObject = this, t.context = this.context, t
    }, each: function (e, t) {
        return b.each(this, e, t)
    }, ready: function (e) {
        return b.ready.promise().done(e), this
    }, slice: function () {
        return this.pushStack(h.apply(this, arguments))
    }, first: function () {
        return this.eq(0)
    }, last: function () {
        return this.eq(-1)
    }, eq: function (e) {
        var t = this.length, n = +e + (0 > e ? t : 0);
        return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
    }, map: function (e) {
        return this.pushStack(b.map(this, function (t, n) {
            return e.call(t, n, t)
        }))
    }, end: function () {
        return this.prevObject || this.constructor(null)
    }, push: d, sort: [].sort, splice: [].splice}, b.fn.init.prototype = b.fn, b.extend = b.fn.extend = function () {
        var e, n, r, i, o, a, s = arguments[0] || {}, u = 1, l = arguments.length, c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, u = 2), "object" == typeof s || b.isFunction(s) || (s = {}), l === u && (s = this, --u); l > u; u++)if (null != (o = arguments[u]))for (i in o)e = s[i], r = o[i], s !== r && (c && r && (b.isPlainObject(r) || (n = b.isArray(r))) ? (n ? (n = !1, a = e && b.isArray(e) ? e : []) : a = e && b.isPlainObject(e) ? e : {}, s[i] = b.extend(c, a, r)) : r !== t && (s[i] = r));
        return s
    }, b.extend({noConflict: function (t) {
        return e.$ === b && (e.$ = u), t && e.jQuery === b && (e.jQuery = s), b
    }, isReady: !1, readyWait: 1, holdReady: function (e) {
        e ? b.readyWait++ : b.ready(!0)
    }, ready: function (e) {
        if (e === !0 ? !--b.readyWait : !b.isReady) {
            if (!o.body)return setTimeout(b.ready);
            b.isReady = !0, e !== !0 && --b.readyWait > 0 || (n.resolveWith(o, [b]), b.fn.trigger && b(o).trigger("ready").off("ready"))
        }
    }, isFunction: function (e) {
        return"function" === b.type(e)
    }, isArray: Array.isArray || function (e) {
        return"array" === b.type(e)
    }, isWindow: function (e) {
        return null != e && e == e.window
    }, isNumeric: function (e) {
        return!isNaN(parseFloat(e)) && isFinite(e)
    }, type: function (e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[m.call(e)] || "object" : typeof e
    }, isPlainObject: function (e) {
        if (!e || "object" !== b.type(e) || e.nodeType || b.isWindow(e))return!1;
        try {
            if (e.constructor && !y.call(e, "constructor") && !y.call(e.constructor.prototype, "isPrototypeOf"))return!1
        } catch (n) {
            return!1
        }
        var r;
        for (r in e);
        return r === t || y.call(e, r)
    }, isEmptyObject: function (e) {
        var t;
        for (t in e)return!1;
        return!0
    }, error: function (e) {
        throw Error(e)
    }, parseHTML: function (e, t, n) {
        if (!e || "string" != typeof e)return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || o;
        var r = C.exec(e), i = !n && [];
        return r ? [t.createElement(r[1])] : (r = b.buildFragment([e], t, i), i && b(i).remove(), b.merge([], r.childNodes))
    }, parseJSON: function (n) {
        return e.JSON && e.JSON.parse ? e.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = b.trim(n), n && k.test(n.replace(S, "@").replace(A, "]").replace(E, ""))) ? Function("return " + n)() : (b.error("Invalid JSON: " + n), t)
    }, parseXML: function (n) {
        var r, i;
        if (!n || "string" != typeof n)return null;
        try {
            e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
        } catch (o) {
            r = t
        }
        return r && r.documentElement && !r.getElementsByTagName("parsererror").length || b.error("Invalid XML: " + n), r
    }, noop: function () {
    }, globalEval: function (t) {
        t && b.trim(t) && (e.execScript || function (t) {
            e.eval.call(e, t)
        })(t)
    }, camelCase: function (e) {
        return e.replace(j, "ms-").replace(D, L)
    }, nodeName: function (e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }, each: function (e, t, n) {
        var r, i = 0, o = e.length, a = M(e);
        if (n) {
            if (a) {
                for (; o > i; i++)if (r = t.apply(e[i], n), r === !1)break
            } else for (i in e)if (r = t.apply(e[i], n), r === !1)break
        } else if (a) {
            for (; o > i; i++)if (r = t.call(e[i], i, e[i]), r === !1)break
        } else for (i in e)if (r = t.call(e[i], i, e[i]), r === !1)break;
        return e
    }, trim: v && !v.call("\ufeff\u00a0") ? function (e) {
        return null == e ? "" : v.call(e)
    } : function (e) {
        return null == e ? "" : (e + "").replace(T, "")
    }, makeArray: function (e, t) {
        var n = t || [];
        return null != e && (M(Object(e)) ? b.merge(n, "string" == typeof e ? [e] : e) : d.call(n, e)), n
    }, inArray: function (e, t, n) {
        var r;
        if (t) {
            if (g)return g.call(t, e, n);
            for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)if (n in t && t[n] === e)return n
        }
        return-1
    }, merge: function (e, n) {
        var r = n.length, i = e.length, o = 0;
        if ("number" == typeof r)for (; r > o; o++)e[i++] = n[o]; else while (n[o] !== t)e[i++] = n[o++];
        return e.length = i, e
    }, grep: function (e, t, n) {
        var r, i = [], o = 0, a = e.length;
        for (n = !!n; a > o; o++)r = !!t(e[o], o), n !== r && i.push(e[o]);
        return i
    }, map: function (e, t, n) {
        var r, i = 0, o = e.length, a = M(e), s = [];
        if (a)for (; o > i; i++)r = t(e[i], i, n), null != r && (s[s.length] = r); else for (i in e)r = t(e[i], i, n), null != r && (s[s.length] = r);
        return f.apply([], s)
    }, guid: 1, proxy: function (e, n) {
        var r, i, o;
        return"string" == typeof n && (o = e[n], n = e, e = o), b.isFunction(e) ? (r = h.call(arguments, 2), i = function () {
            return e.apply(n || this, r.concat(h.call(arguments)))
        }, i.guid = e.guid = e.guid || b.guid++, i) : t
    }, access: function (e, n, r, i, o, a, s) {
        var u = 0, l = e.length, c = null == r;
        if ("object" === b.type(r)) {
            o = !0;
            for (u in r)b.access(e, n, u, r[u], !0, a, s)
        } else if (i !== t && (o = !0, b.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), n = null) : (c = n, n = function (e, t, n) {
            return c.call(b(e), n)
        })), n))for (; l > u; u++)n(e[u], r, s ? i : i.call(e[u], u, n(e[u], r)));
        return o ? e : c ? n.call(e) : l ? n(e[0], r) : a
    }, now: function () {
        return(new Date).getTime()
    }}), b.ready.promise = function (t) {
        if (!n)if (n = b.Deferred(), "complete" === o.readyState)setTimeout(b.ready); else if (o.addEventListener)o.addEventListener("DOMContentLoaded", H, !1), e.addEventListener("load", H, !1); else {
            o.attachEvent("onreadystatechange", H), e.attachEvent("onload", H);
            var r = !1;
            try {
                r = null == e.frameElement && o.documentElement
            } catch (i) {
            }
            r && r.doScroll && function a() {
                if (!b.isReady) {
                    try {
                        r.doScroll("left")
                    } catch (e) {
                        return setTimeout(a, 50)
                    }
                    q(), b.ready()
                }
            }()
        }
        return n.promise(t)
    }, b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        l["[object " + t + "]"] = t.toLowerCase()
    });
    function M(e) {
        var t = e.length, n = b.type(e);
        return b.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    r = b(o);
    var _ = {};

    function F(e) {
        var t = _[e] = {};
        return b.each(e.match(w) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    b.Callbacks = function (e) {
        e = "string" == typeof e ? _[e] || F(e) : b.extend({}, e);
        var n, r, i, o, a, s, u = [], l = !e.once && [], c = function (t) {
            for (r = e.memory && t, i = !0, a = s || 0, s = 0, o = u.length, n = !0; u && o > a; a++)if (u[a].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                r = !1;
                break
            }
            n = !1, u && (l ? l.length && c(l.shift()) : r ? u = [] : p.disable())
        }, p = {add: function () {
            if (u) {
                var t = u.length;
                (function i(t) {
                    b.each(t, function (t, n) {
                        var r = b.type(n);
                        "function" === r ? e.unique && p.has(n) || u.push(n) : n && n.length && "string" !== r && i(n)
                    })
                })(arguments), n ? o = u.length : r && (s = t, c(r))
            }
            return this
        }, remove: function () {
            return u && b.each(arguments, function (e, t) {
                var r;
                while ((r = b.inArray(t, u, r)) > -1)u.splice(r, 1), n && (o >= r && o--, a >= r && a--)
            }), this
        }, has: function (e) {
            return e ? b.inArray(e, u) > -1 : !(!u || !u.length)
        }, empty: function () {
            return u = [], this
        }, disable: function () {
            return u = l = r = t, this
        }, disabled: function () {
            return!u
        }, lock: function () {
            return l = t, r || p.disable(), this
        }, locked: function () {
            return!l
        }, fireWith: function (e, t) {
            return t = t || [], t = [e, t.slice ? t.slice() : t], !u || i && !l || (n ? l.push(t) : c(t)), this
        }, fire: function () {
            return p.fireWith(this, arguments), this
        }, fired: function () {
            return!!i
        }};
        return p
    }, b.extend({Deferred: function (e) {
        var t = [
            ["resolve", "done", b.Callbacks("once memory"), "resolved"],
            ["reject", "fail", b.Callbacks("once memory"), "rejected"],
            ["notify", "progress", b.Callbacks("memory")]
        ], n = "pending", r = {state: function () {
            return n
        }, always: function () {
            return i.done(arguments).fail(arguments), this
        }, then: function () {
            var e = arguments;
            return b.Deferred(function (n) {
                b.each(t, function (t, o) {
                    var a = o[0], s = b.isFunction(e[t]) && e[t];
                    i[o[1]](function () {
                        var e = s && s.apply(this, arguments);
                        e && b.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [e] : arguments)
                    })
                }), e = null
            }).promise()
        }, promise: function (e) {
            return null != e ? b.extend(e, r) : r
        }}, i = {};
        return r.pipe = r.then, b.each(t, function (e, o) {
            var a = o[2], s = o[3];
            r[o[1]] = a.add, s && a.add(function () {
                n = s
            }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
                return i[o[0] + "With"](this === i ? r : this, arguments), this
            }, i[o[0] + "With"] = a.fireWith
        }), r.promise(i), e && e.call(i, i), i
    }, when: function (e) {
        var t = 0, n = h.call(arguments), r = n.length, i = 1 !== r || e && b.isFunction(e.promise) ? r : 0, o = 1 === i ? e : b.Deferred(), a = function (e, t, n) {
            return function (r) {
                t[e] = this, n[e] = arguments.length > 1 ? h.call(arguments) : r, n === s ? o.notifyWith(t, n) : --i || o.resolveWith(t, n)
            }
        }, s, u, l;
        if (r > 1)for (s = Array(r), u = Array(r), l = Array(r); r > t; t++)n[t] && b.isFunction(n[t].promise) ? n[t].promise().done(a(t, l, n)).fail(o.reject).progress(a(t, u, s)) : --i;
        return i || o.resolveWith(l, n), o.promise()
    }}), b.support = function () {
        var t, n, r, a, s, u, l, c, p, f, d = o.createElement("div");
        if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = d.getElementsByTagName("*"), r = d.getElementsByTagName("a")[0], !n || !r || !n.length)return{};
        s = o.createElement("select"), l = s.appendChild(o.createElement("option")), a = d.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t = {getSetAttribute: "t" !== d.className, leadingWhitespace: 3 === d.firstChild.nodeType, tbody: !d.getElementsByTagName("tbody").length, htmlSerialize: !!d.getElementsByTagName("link").length, style: /top/.test(r.getAttribute("style")), hrefNormalized: "/a" === r.getAttribute("href"), opacity: /^0.5/.test(r.style.opacity), cssFloat: !!r.style.cssFloat, checkOn: !!a.value, optSelected: l.selected, enctype: !!o.createElement("form").enctype, html5Clone: "<:nav></:nav>" !== o.createElement("nav").cloneNode(!0).outerHTML, boxModel: "CSS1Compat" === o.compatMode, deleteExpando: !0, noCloneEvent: !0, inlineBlockNeedsLayout: !1, shrinkWrapBlocks: !1, reliableMarginRight: !0, boxSizingReliable: !0, pixelPosition: !1}, a.checked = !0, t.noCloneChecked = a.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !l.disabled;
        try {
            delete d.test
        } catch (h) {
            t.deleteExpando = !1
        }
        a = o.createElement("input"), a.setAttribute("value", ""), t.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), t.radioValue = "t" === a.value, a.setAttribute("checked", "t"), a.setAttribute("name", "t"), u = o.createDocumentFragment(), u.appendChild(a), t.appendChecked = a.checked, t.checkClone = u.cloneNode(!0).cloneNode(!0).lastChild.checked, d.attachEvent && (d.attachEvent("onclick", function () {
            t.noCloneEvent = !1
        }), d.cloneNode(!0).click());
        for (f in{submit: !0, change: !0, focusin: !0})d.setAttribute(c = "on" + f, "t"), t[f + "Bubbles"] = c in e || d.attributes[c].expando === !1;
        return d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === d.style.backgroundClip, b(function () {
            var n, r, a, s = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", u = o.getElementsByTagName("body")[0];
            u && (n = o.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", u.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", a = d.getElementsByTagName("td"), a[0].style.cssText = "padding:0;margin:0;border:0;display:none", p = 0 === a[0].offsetHeight, a[0].style.display = "", a[1].style.display = "none", t.reliableHiddenOffsets = p && 0 === a[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === d.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== u.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || {width: "4px"}).width, r = d.appendChild(o.createElement("div")), r.style.cssText = d.style.cssText = s, r.style.marginRight = r.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), typeof d.style.zoom !== i && (d.innerHTML = "", d.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (u.style.zoom = 1)), u.removeChild(n), n = d = a = r = null)
        }), n = s = u = l = r = a = null, t
    }();
    var O = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, B = /([A-Z])/g;

    function P(e, n, r, i) {
        if (b.acceptData(e)) {
            var o, a, s = b.expando, u = "string" == typeof n, l = e.nodeType, p = l ? b.cache : e, f = l ? e[s] : e[s] && s;
            if (f && p[f] && (i || p[f].data) || !u || r !== t)return f || (l ? e[s] = f = c.pop() || b.guid++ : f = s), p[f] || (p[f] = {}, l || (p[f].toJSON = b.noop)), ("object" == typeof n || "function" == typeof n) && (i ? p[f] = b.extend(p[f], n) : p[f].data = b.extend(p[f].data, n)), o = p[f], i || (o.data || (o.data = {}), o = o.data), r !== t && (o[b.camelCase(n)] = r), u ? (a = o[n], null == a && (a = o[b.camelCase(n)])) : a = o, a
        }
    }

    function R(e, t, n) {
        if (b.acceptData(e)) {
            var r, i, o, a = e.nodeType, s = a ? b.cache : e, u = a ? e[b.expando] : b.expando;
            if (s[u]) {
                if (t && (o = n ? s[u] : s[u].data)) {
                    b.isArray(t) ? t = t.concat(b.map(t, b.camelCase)) : t in o ? t = [t] : (t = b.camelCase(t), t = t in o ? [t] : t.split(" "));
                    for (r = 0, i = t.length; i > r; r++)delete o[t[r]];
                    if (!(n ? $ : b.isEmptyObject)(o))return
                }
                (n || (delete s[u].data, $(s[u]))) && (a ? b.cleanData([e], !0) : b.support.deleteExpando || s != s.window ? delete s[u] : s[u] = null)
            }
        }
    }

    b.extend({cache: {}, expando: "jQuery" + (p + Math.random()).replace(/\D/g, ""), noData: {embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0}, hasData: function (e) {
        return e = e.nodeType ? b.cache[e[b.expando]] : e[b.expando], !!e && !$(e)
    }, data: function (e, t, n) {
        return P(e, t, n)
    }, removeData: function (e, t) {
        return R(e, t)
    }, _data: function (e, t, n) {
        return P(e, t, n, !0)
    }, _removeData: function (e, t) {
        return R(e, t, !0)
    }, acceptData: function (e) {
        if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType)return!1;
        var t = e.nodeName && b.noData[e.nodeName.toLowerCase()];
        return!t || t !== !0 && e.getAttribute("classid") === t
    }}), b.fn.extend({data: function (e, n) {
        var r, i, o = this[0], a = 0, s = null;
        if (e === t) {
            if (this.length && (s = b.data(o), 1 === o.nodeType && !b._data(o, "parsedAttrs"))) {
                for (r = o.attributes; r.length > a; a++)i = r[a].name, i.indexOf("data-") || (i = b.camelCase(i.slice(5)), W(o, i, s[i]));
                b._data(o, "parsedAttrs", !0)
            }
            return s
        }
        return"object" == typeof e ? this.each(function () {
            b.data(this, e)
        }) : b.access(this, function (n) {
            return n === t ? o ? W(o, e, b.data(o, e)) : null : (this.each(function () {
                b.data(this, e, n)
            }), t)
        }, null, n, arguments.length > 1, null, !0)
    }, removeData: function (e) {
        return this.each(function () {
            b.removeData(this, e)
        })
    }});
    function W(e, n, r) {
        if (r === t && 1 === e.nodeType) {
            var i = "data-" + n.replace(B, "-$1").toLowerCase();
            if (r = e.getAttribute(i), "string" == typeof r) {
                try {
                    r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : O.test(r) ? b.parseJSON(r) : r
                } catch (o) {
                }
                b.data(e, n, r)
            } else r = t
        }
        return r
    }

    function $(e) {
        var t;
        for (t in e)if (("data" !== t || !b.isEmptyObject(e[t])) && "toJSON" !== t)return!1;
        return!0
    }

    b.extend({queue: function (e, n, r) {
        var i;
        return e ? (n = (n || "fx") + "queue", i = b._data(e, n), r && (!i || b.isArray(r) ? i = b._data(e, n, b.makeArray(r)) : i.push(r)), i || []) : t
    }, dequeue: function (e, t) {
        t = t || "fx";
        var n = b.queue(e, t), r = n.length, i = n.shift(), o = b._queueHooks(e, t), a = function () {
            b.dequeue(e, t)
        };
        "inprogress" === i && (i = n.shift(), r--), o.cur = i, i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
    }, _queueHooks: function (e, t) {
        var n = t + "queueHooks";
        return b._data(e, n) || b._data(e, n, {empty: b.Callbacks("once memory").add(function () {
            b._removeData(e, t + "queue"), b._removeData(e, n)
        })})
    }}), b.fn.extend({queue: function (e, n) {
        var r = 2;
        return"string" != typeof e && (n = e, e = "fx", r--), r > arguments.length ? b.queue(this[0], e) : n === t ? this : this.each(function () {
            var t = b.queue(this, e, n);
            b._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && b.dequeue(this, e)
        })
    }, dequeue: function (e) {
        return this.each(function () {
            b.dequeue(this, e)
        })
    }, delay: function (e, t) {
        return e = b.fx ? b.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
            var r = setTimeout(t, e);
            n.stop = function () {
                clearTimeout(r)
            }
        })
    }, clearQueue: function (e) {
        return this.queue(e || "fx", [])
    }, promise: function (e, n) {
        var r, i = 1, o = b.Deferred(), a = this, s = this.length, u = function () {
            --i || o.resolveWith(a, [a])
        };
        "string" != typeof e && (n = e, e = t), e = e || "fx";
        while (s--)r = b._data(a[s], e + "queueHooks"), r && r.empty && (i++, r.empty.add(u));
        return u(), o.promise(n)
    }});
    var I, z, X = /[\t\r\n]/g, U = /\r/g, V = /^(?:input|select|textarea|button|object)$/i, Y = /^(?:a|area)$/i, J = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i, G = /^(?:checked|selected)$/i, Q = b.support.getSetAttribute, K = b.support.input;
    b.fn.extend({attr: function (e, t) {
        return b.access(this, b.attr, e, t, arguments.length > 1)
    }, removeAttr: function (e) {
        return this.each(function () {
            b.removeAttr(this, e)
        })
    }, prop: function (e, t) {
        return b.access(this, b.prop, e, t, arguments.length > 1)
    }, removeProp: function (e) {
        return e = b.propFix[e] || e, this.each(function () {
            try {
                this[e] = t, delete this[e]
            } catch (n) {
            }
        })
    }, addClass: function (e) {
        var t, n, r, i, o, a = 0, s = this.length, u = "string" == typeof e && e;
        if (b.isFunction(e))return this.each(function (t) {
            b(this).addClass(e.call(this, t, this.className))
        });
        if (u)for (t = (e || "").match(w) || []; s > a; a++)if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(X, " ") : " ")) {
            o = 0;
            while (i = t[o++])0 > r.indexOf(" " + i + " ") && (r += i + " ");
            n.className = b.trim(r)
        }
        return this
    }, removeClass: function (e) {
        var t, n, r, i, o, a = 0, s = this.length, u = 0 === arguments.length || "string" == typeof e && e;
        if (b.isFunction(e))return this.each(function (t) {
            b(this).removeClass(e.call(this, t, this.className))
        });
        if (u)for (t = (e || "").match(w) || []; s > a; a++)if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(X, " ") : "")) {
            o = 0;
            while (i = t[o++])while (r.indexOf(" " + i + " ") >= 0)r = r.replace(" " + i + " ", " ");
            n.className = e ? b.trim(r) : ""
        }
        return this
    }, toggleClass: function (e, t) {
        var n = typeof e, r = "boolean" == typeof t;
        return b.isFunction(e) ? this.each(function (n) {
            b(this).toggleClass(e.call(this, n, this.className, t), t)
        }) : this.each(function () {
            if ("string" === n) {
                var o, a = 0, s = b(this), u = t, l = e.match(w) || [];
                while (o = l[a++])u = r ? u : !s.hasClass(o), s[u ? "addClass" : "removeClass"](o)
            } else(n === i || "boolean" === n) && (this.className && b._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : b._data(this, "__className__") || "")
        })
    }, hasClass: function (e) {
        var t = " " + e + " ", n = 0, r = this.length;
        for (; r > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(X, " ").indexOf(t) >= 0)return!0;
        return!1
    }, val: function (e) {
        var n, r, i, o = this[0];
        {
            if (arguments.length)return i = b.isFunction(e), this.each(function (n) {
                var o, a = b(this);
                1 === this.nodeType && (o = i ? e.call(this, n, a.val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : b.isArray(o) && (o = b.map(o, function (e) {
                    return null == e ? "" : e + ""
                })), r = b.valHooks[this.type] || b.valHooks[this.nodeName.toLowerCase()], r && "set"in r && r.set(this, o, "value") !== t || (this.value = o))
            });
            if (o)return r = b.valHooks[o.type] || b.valHooks[o.nodeName.toLowerCase()], r && "get"in r && (n = r.get(o, "value")) !== t ? n : (n = o.value, "string" == typeof n ? n.replace(U, "") : null == n ? "" : n)
        }
    }}), b.extend({valHooks: {option: {get: function (e) {
        var t = e.attributes.value;
        return!t || t.specified ? e.value : e.text
    }}, select: {get: function (e) {
        var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0;
        for (; s > u; u++)if (n = r[u], !(!n.selected && u !== i || (b.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && b.nodeName(n.parentNode, "optgroup"))) {
            if (t = b(n).val(), o)return t;
            a.push(t)
        }
        return a
    }, set: function (e, t) {
        var n = b.makeArray(t);
        return b(e).find("option").each(function () {
            this.selected = b.inArray(b(this).val(), n) >= 0
        }), n.length || (e.selectedIndex = -1), n
    }}}, attr: function (e, n, r) {
        var o, a, s, u = e.nodeType;
        if (e && 3 !== u && 8 !== u && 2 !== u)return typeof e.getAttribute === i ? b.prop(e, n, r) : (a = 1 !== u || !b.isXMLDoc(e), a && (n = n.toLowerCase(), o = b.attrHooks[n] || (J.test(n) ? z : I)), r === t ? o && a && "get"in o && null !== (s = o.get(e, n)) ? s : (typeof e.getAttribute !== i && (s = e.getAttribute(n)), null == s ? t : s) : null !== r ? o && a && "set"in o && (s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""), r) : (b.removeAttr(e, n), t))
    }, removeAttr: function (e, t) {
        var n, r, i = 0, o = t && t.match(w);
        if (o && 1 === e.nodeType)while (n = o[i++])r = b.propFix[n] || n, J.test(n) ? !Q && G.test(n) ? e[b.camelCase("default-" + n)] = e[r] = !1 : e[r] = !1 : b.attr(e, n, ""), e.removeAttribute(Q ? n : r)
    }, attrHooks: {type: {set: function (e, t) {
        if (!b.support.radioValue && "radio" === t && b.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t
        }
    }}}, propFix: {tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable"}, prop: function (e, n, r) {
        var i, o, a, s = e.nodeType;
        if (e && 3 !== s && 8 !== s && 2 !== s)return a = 1 !== s || !b.isXMLDoc(e), a && (n = b.propFix[n] || n, o = b.propHooks[n]), r !== t ? o && "set"in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get"in o && null !== (i = o.get(e, n)) ? i : e[n]
    }, propHooks: {tabIndex: {get: function (e) {
        var n = e.getAttributeNode("tabindex");
        return n && n.specified ? parseInt(n.value, 10) : V.test(e.nodeName) || Y.test(e.nodeName) && e.href ? 0 : t
    }}}}), z = {get: function (e, n) {
        var r = b.prop(e, n), i = "boolean" == typeof r && e.getAttribute(n), o = "boolean" == typeof r ? K && Q ? null != i : G.test(n) ? e[b.camelCase("default-" + n)] : !!i : e.getAttributeNode(n);
        return o && o.value !== !1 ? n.toLowerCase() : t
    }, set: function (e, t, n) {
        return t === !1 ? b.removeAttr(e, n) : K && Q || !G.test(n) ? e.setAttribute(!Q && b.propFix[n] || n, n) : e[b.camelCase("default-" + n)] = e[n] = !0, n
    }}, K && Q || (b.attrHooks.value = {get: function (e, n) {
        var r = e.getAttributeNode(n);
        return b.nodeName(e, "input") ? e.defaultValue : r && r.specified ? r.value : t
    }, set: function (e, n, r) {
        return b.nodeName(e, "input") ? (e.defaultValue = n, t) : I && I.set(e, n, r)
    }}), Q || (I = b.valHooks.button = {get: function (e, n) {
        var r = e.getAttributeNode(n);
        return r && ("id" === n || "name" === n || "coords" === n ? "" !== r.value : r.specified) ? r.value : t
    }, set: function (e, n, r) {
        var i = e.getAttributeNode(r);
        return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", "value" === r || n === e.getAttribute(r) ? n : t
    }}, b.attrHooks.contenteditable = {get: I.get, set: function (e, t, n) {
        I.set(e, "" === t ? !1 : t, n)
    }}, b.each(["width", "height"], function (e, n) {
        b.attrHooks[n] = b.extend(b.attrHooks[n], {set: function (e, r) {
            return"" === r ? (e.setAttribute(n, "auto"), r) : t
        }})
    })), b.support.hrefNormalized || (b.each(["href", "src", "width", "height"], function (e, n) {
        b.attrHooks[n] = b.extend(b.attrHooks[n], {get: function (e) {
            var r = e.getAttribute(n, 2);
            return null == r ? t : r
        }})
    }), b.each(["href", "src"], function (e, t) {
        b.propHooks[t] = {get: function (e) {
            return e.getAttribute(t, 4)
        }}
    })), b.support.style || (b.attrHooks.style = {get: function (e) {
        return e.style.cssText || t
    }, set: function (e, t) {
        return e.style.cssText = t + ""
    }}), b.support.optSelected || (b.propHooks.selected = b.extend(b.propHooks.selected, {get: function (e) {
        var t = e.parentNode;
        return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
    }})), b.support.enctype || (b.propFix.enctype = "encoding"), b.support.checkOn || b.each(["radio", "checkbox"], function () {
        b.valHooks[this] = {get: function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        }}
    }), b.each(["radio", "checkbox"], function () {
        b.valHooks[this] = b.extend(b.valHooks[this], {set: function (e, n) {
            return b.isArray(n) ? e.checked = b.inArray(b(e).val(), n) >= 0 : t
        }})
    });
    var Z = /^(?:input|select|textarea)$/i, et = /^key/, tt = /^(?:mouse|contextmenu)|click/, nt = /^(?:focusinfocus|focusoutblur)$/, rt = /^([^.]*)(?:\.(.+)|)$/;

    function it() {
        return!0
    }

    function ot() {
        return!1
    }

    b.event = {global: {}, add: function (e, n, r, o, a) {
        var s, u, l, c, p, f, d, h, g, m, y, v = b._data(e);
        if (v) {
            r.handler && (c = r, r = c.handler, a = c.selector), r.guid || (r.guid = b.guid++), (u = v.events) || (u = v.events = {}), (f = v.handle) || (f = v.handle = function (e) {
                return typeof b === i || e && b.event.triggered === e.type ? t : b.event.dispatch.apply(f.elem, arguments)
            }, f.elem = e), n = (n || "").match(w) || [""], l = n.length;
            while (l--)s = rt.exec(n[l]) || [], g = y = s[1], m = (s[2] || "").split(".").sort(), p = b.event.special[g] || {}, g = (a ? p.delegateType : p.bindType) || g, p = b.event.special[g] || {}, d = b.extend({type: g, origType: y, data: o, handler: r, guid: r.guid, selector: a, needsContext: a && b.expr.match.needsContext.test(a), namespace: m.join(".")}, c), (h = u[g]) || (h = u[g] = [], h.delegateCount = 0, p.setup && p.setup.call(e, o, m, f) !== !1 || (e.addEventListener ? e.addEventListener(g, f, !1) : e.attachEvent && e.attachEvent("on" + g, f))), p.add && (p.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)), a ? h.splice(h.delegateCount++, 0, d) : h.push(d), b.event.global[g] = !0;
            e = null
        }
    }, remove: function (e, t, n, r, i) {
        var o, a, s, u, l, c, p, f, d, h, g, m = b.hasData(e) && b._data(e);
        if (m && (c = m.events)) {
            t = (t || "").match(w) || [""], l = t.length;
            while (l--)if (s = rt.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
                p = b.event.special[d] || {}, d = (r ? p.delegateType : p.bindType) || d, f = c[d] || [], s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = f.length;
                while (o--)a = f[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1), a.selector && f.delegateCount--, p.remove && p.remove.call(e, a));
                u && !f.length && (p.teardown && p.teardown.call(e, h, m.handle) !== !1 || b.removeEvent(e, d, m.handle), delete c[d])
            } else for (d in c)b.event.remove(e, d + t[l], n, r, !0);
            b.isEmptyObject(c) && (delete m.handle, b._removeData(e, "events"))
        }
    }, trigger: function (n, r, i, a) {
        var s, u, l, c, p, f, d, h = [i || o], g = y.call(n, "type") ? n.type : n, m = y.call(n, "namespace") ? n.namespace.split(".") : [];
        if (l = f = i = i || o, 3 !== i.nodeType && 8 !== i.nodeType && !nt.test(g + b.event.triggered) && (g.indexOf(".") >= 0 && (m = g.split("."), g = m.shift(), m.sort()), u = 0 > g.indexOf(":") && "on" + g, n = n[b.expando] ? n : new b.Event(g, "object" == typeof n && n), n.isTrigger = !0, n.namespace = m.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : b.makeArray(r, [n]), p = b.event.special[g] || {}, a || !p.trigger || p.trigger.apply(i, r) !== !1)) {
            if (!a && !p.noBubble && !b.isWindow(i)) {
                for (c = p.delegateType || g, nt.test(c + g) || (l = l.parentNode); l; l = l.parentNode)h.push(l), f = l;
                f === (i.ownerDocument || o) && h.push(f.defaultView || f.parentWindow || e)
            }
            d = 0;
            while ((l = h[d++]) && !n.isPropagationStopped())n.type = d > 1 ? c : p.bindType || g, s = (b._data(l, "events") || {})[n.type] && b._data(l, "handle"), s && s.apply(l, r), s = u && l[u], s && b.acceptData(l) && s.apply && s.apply(l, r) === !1 && n.preventDefault();
            if (n.type = g, !(a || n.isDefaultPrevented() || p._default && p._default.apply(i.ownerDocument, r) !== !1 || "click" === g && b.nodeName(i, "a") || !b.acceptData(i) || !u || !i[g] || b.isWindow(i))) {
                f = i[u], f && (i[u] = null), b.event.triggered = g;
                try {
                    i[g]()
                } catch (v) {
                }
                b.event.triggered = t, f && (i[u] = f)
            }
            return n.result
        }
    }, dispatch: function (e) {
        e = b.event.fix(e);
        var n, r, i, o, a, s = [], u = h.call(arguments), l = (b._data(this, "events") || {})[e.type] || [], c = b.event.special[e.type] || {};
        if (u[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
            s = b.event.handlers.call(this, e, l), n = 0;
            while ((o = s[n++]) && !e.isPropagationStopped()) {
                e.currentTarget = o.elem, a = 0;
                while ((i = o.handlers[a++]) && !e.isImmediatePropagationStopped())(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, r = ((b.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, u), r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()))
            }
            return c.postDispatch && c.postDispatch.call(this, e), e.result
        }
    }, handlers: function (e, n) {
        var r, i, o, a, s = [], u = n.delegateCount, l = e.target;
        if (u && l.nodeType && (!e.button || "click" !== e.type))for (; l != this; l = l.parentNode || this)if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
            for (o = [], a = 0; u > a; a++)i = n[a], r = i.selector + " ", o[r] === t && (o[r] = i.needsContext ? b(r, this).index(l) >= 0 : b.find(r, this, null, [l]).length), o[r] && o.push(i);
            o.length && s.push({elem: l, handlers: o})
        }
        return n.length > u && s.push({elem: this, handlers: n.slice(u)}), s
    }, fix: function (e) {
        if (e[b.expando])return e;
        var t, n, r, i = e.type, a = e, s = this.fixHooks[i];
        s || (this.fixHooks[i] = s = tt.test(i) ? this.mouseHooks : et.test(i) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, e = new b.Event(a), t = r.length;
        while (t--)n = r[t], e[n] = a[n];
        return e.target || (e.target = a.srcElement || o), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, a) : e
    }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: {props: "char charCode key keyCode".split(" "), filter: function (e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
    }}, mouseHooks: {props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (e, n) {
        var r, i, a, s = n.button, u = n.fromElement;
        return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || o, a = i.documentElement, r = i.body, e.pageX = n.clientX + (a && a.scrollLeft || r && r.scrollLeft || 0) - (a && a.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (a && a.scrollTop || r && r.scrollTop || 0) - (a && a.clientTop || r && r.clientTop || 0)), !e.relatedTarget && u && (e.relatedTarget = u === e.target ? n.toElement : u), e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
    }}, special: {load: {noBubble: !0}, click: {trigger: function () {
        return b.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : t
    }}, focus: {trigger: function () {
        if (this !== o.activeElement && this.focus)try {
            return this.focus(), !1
        } catch (e) {
        }
    }, delegateType: "focusin"}, blur: {trigger: function () {
        return this === o.activeElement && this.blur ? (this.blur(), !1) : t
    }, delegateType: "focusout"}, beforeunload: {postDispatch: function (e) {
        e.result !== t && (e.originalEvent.returnValue = e.result)
    }}}, simulate: function (e, t, n, r) {
        var i = b.extend(new b.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
        r ? b.event.trigger(i, null, t) : b.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
    }}, b.removeEvent = o.removeEventListener ? function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function (e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] === i && (e[r] = null), e.detachEvent(r, n))
    }, b.Event = function (e, n) {
        return this instanceof b.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? it : ot) : this.type = e, n && b.extend(this, n), this.timeStamp = e && e.timeStamp || b.now(), this[b.expando] = !0, t) : new b.Event(e, n)
    }, b.Event.prototype = {isDefaultPrevented: ot, isPropagationStopped: ot, isImmediatePropagationStopped: ot, preventDefault: function () {
        var e = this.originalEvent;
        this.isDefaultPrevented = it, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
    }, stopPropagation: function () {
        var e = this.originalEvent;
        this.isPropagationStopped = it, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
    }, stopImmediatePropagation: function () {
        this.isImmediatePropagationStopped = it, this.stopPropagation()
    }}, b.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (e, t) {
        b.event.special[e] = {delegateType: t, bindType: t, handle: function (e) {
            var n, r = this, i = e.relatedTarget, o = e.handleObj;
            return(!i || i !== r && !b.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
        }}
    }), b.support.submitBubbles || (b.event.special.submit = {setup: function () {
        return b.nodeName(this, "form") ? !1 : (b.event.add(this, "click._submit keypress._submit", function (e) {
            var n = e.target, r = b.nodeName(n, "input") || b.nodeName(n, "button") ? n.form : t;
            r && !b._data(r, "submitBubbles") && (b.event.add(r, "submit._submit", function (e) {
                e._submit_bubble = !0
            }), b._data(r, "submitBubbles", !0))
        }), t)
    }, postDispatch: function (e) {
        e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && b.event.simulate("submit", this.parentNode, e, !0))
    }, teardown: function () {
        return b.nodeName(this, "form") ? !1 : (b.event.remove(this, "._submit"), t)
    }}), b.support.changeBubbles || (b.event.special.change = {setup: function () {
        return Z.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (b.event.add(this, "propertychange._change", function (e) {
            "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
        }), b.event.add(this, "click._change", function (e) {
            this._just_changed && !e.isTrigger && (this._just_changed = !1), b.event.simulate("change", this, e, !0)
        })), !1) : (b.event.add(this, "beforeactivate._change", function (e) {
            var t = e.target;
            Z.test(t.nodeName) && !b._data(t, "changeBubbles") && (b.event.add(t, "change._change", function (e) {
                !this.parentNode || e.isSimulated || e.isTrigger || b.event.simulate("change", this.parentNode, e, !0)
            }), b._data(t, "changeBubbles", !0))
        }), t)
    }, handle: function (e) {
        var n = e.target;
        return this !== n || e.isSimulated || e.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? e.handleObj.handler.apply(this, arguments) : t
    }, teardown: function () {
        return b.event.remove(this, "._change"), !Z.test(this.nodeName)
    }}), b.support.focusinBubbles || b.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = 0, r = function (e) {
            b.event.simulate(t, e.target, b.event.fix(e), !0)
        };
        b.event.special[t] = {setup: function () {
            0 === n++ && o.addEventListener(e, r, !0)
        }, teardown: function () {
            0 === --n && o.removeEventListener(e, r, !0)
        }}
    }), b.fn.extend({on: function (e, n, r, i, o) {
        var a, s;
        if ("object" == typeof e) {
            "string" != typeof n && (r = r || n, n = t);
            for (a in e)this.on(a, n, r, e[a], o);
            return this
        }
        if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1)i = ot; else if (!i)return this;
        return 1 === o && (s = i, i = function (e) {
            return b().off(e), s.apply(this, arguments)
        }, i.guid = s.guid || (s.guid = b.guid++)), this.each(function () {
            b.event.add(this, e, i, r, n)
        })
    }, one: function (e, t, n, r) {
        return this.on(e, t, n, r, 1)
    }, off: function (e, n, r) {
        var i, o;
        if (e && e.preventDefault && e.handleObj)return i = e.handleObj, b(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
        if ("object" == typeof e) {
            for (o in e)this.off(o, n, e[o]);
            return this
        }
        return(n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = ot), this.each(function () {
            b.event.remove(this, e, r, n)
        })
    }, bind: function (e, t, n) {
        return this.on(e, null, t, n)
    }, unbind: function (e, t) {
        return this.off(e, null, t)
    }, delegate: function (e, t, n, r) {
        return this.on(t, e, n, r)
    }, undelegate: function (e, t, n) {
        return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
    }, trigger: function (e, t) {
        return this.each(function () {
            b.event.trigger(e, t, this)
        })
    }, triggerHandler: function (e, n) {
        var r = this[0];
        return r ? b.event.trigger(e, n, r, !0) : t
    }}), function (e, t) {
        var n, r, i, o, a, s, u, l, c, p, f, d, h, g, m, y, v, x = "sizzle" + -new Date, w = e.document, T = {}, N = 0, C = 0, k = it(), E = it(), S = it(), A = typeof t, j = 1 << 31, D = [], L = D.pop, H = D.push, q = D.slice, M = D.indexOf || function (e) {
            var t = 0, n = this.length;
            for (; n > t; t++)if (this[t] === e)return t;
            return-1
        }, _ = "[\\x20\\t\\r\\n\\f]", F = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", O = F.replace("w", "w#"), B = "([*^$|!~]?=)", P = "\\[" + _ + "*(" + F + ")" + _ + "*(?:" + B + _ + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + O + ")|)|)" + _ + "*\\]", R = ":(" + F + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + P.replace(3, 8) + ")*)|.*)\\)|)", W = RegExp("^" + _ + "+|((?:^|[^\\\\])(?:\\\\.)*)" + _ + "+$", "g"), $ = RegExp("^" + _ + "*," + _ + "*"), I = RegExp("^" + _ + "*([\\x20\\t\\r\\n\\f>+~])" + _ + "*"), z = RegExp(R), X = RegExp("^" + O + "$"), U = {ID: RegExp("^#(" + F + ")"), CLASS: RegExp("^\\.(" + F + ")"), NAME: RegExp("^\\[name=['\"]?(" + F + ")['\"]?\\]"), TAG: RegExp("^(" + F.replace("w", "w*") + ")"), ATTR: RegExp("^" + P), PSEUDO: RegExp("^" + R), CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + _ + "*(even|odd|(([+-]|)(\\d*)n|)" + _ + "*(?:([+-]|)" + _ + "*(\\d+)|))" + _ + "*\\)|)", "i"), needsContext: RegExp("^" + _ + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + _ + "*((?:-\\d)?\\d*)" + _ + "*\\)|)(?=[^-]|$)", "i")}, V = /[\x20\t\r\n\f]*[+~]/, Y = /^[^{]+\{\s*\[native code/, J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, G = /^(?:input|select|textarea|button)$/i, Q = /^h\d$/i, K = /'|\\/g, Z = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, et = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g, tt = function (e, t) {
            var n = "0x" + t - 65536;
            return n !== n ? t : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(55296 | n >> 10, 56320 | 1023 & n)
        };
        try {
            q.call(w.documentElement.childNodes, 0)[0].nodeType
        } catch (nt) {
            q = function (e) {
                var t, n = [];
                while (t = this[e++])n.push(t);
                return n
            }
        }
        function rt(e) {
            return Y.test(e + "")
        }

        function it() {
            var e, t = [];
            return e = function (n, r) {
                return t.push(n += " ") > i.cacheLength && delete e[t.shift()], e[n] = r
            }
        }

        function ot(e) {
            return e[x] = !0, e
        }

        function at(e) {
            var t = p.createElement("div");
            try {
                return e(t)
            } catch (n) {
                return!1
            } finally {
                t = null
            }
        }

        function st(e, t, n, r) {
            var i, o, a, s, u, l, f, g, m, v;
            if ((t ? t.ownerDocument || t : w) !== p && c(t), t = t || p, n = n || [], !e || "string" != typeof e)return n;
            if (1 !== (s = t.nodeType) && 9 !== s)return[];
            if (!d && !r) {
                if (i = J.exec(e))if (a = i[1]) {
                    if (9 === s) {
                        if (o = t.getElementById(a), !o || !o.parentNode)return n;
                        if (o.id === a)return n.push(o), n
                    } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && y(t, o) && o.id === a)return n.push(o), n
                } else {
                    if (i[2])return H.apply(n, q.call(t.getElementsByTagName(e), 0)), n;
                    if ((a = i[3]) && T.getByClassName && t.getElementsByClassName)return H.apply(n, q.call(t.getElementsByClassName(a), 0)), n
                }
                if (T.qsa && !h.test(e)) {
                    if (f = !0, g = x, m = t, v = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                        l = ft(e), (f = t.getAttribute("id")) ? g = f.replace(K, "\\$&") : t.setAttribute("id", g), g = "[id='" + g + "'] ", u = l.length;
                        while (u--)l[u] = g + dt(l[u]);
                        m = V.test(e) && t.parentNode || t, v = l.join(",")
                    }
                    if (v)try {
                        return H.apply(n, q.call(m.querySelectorAll(v), 0)), n
                    } catch (b) {
                    } finally {
                        f || t.removeAttribute("id")
                    }
                }
            }
            return wt(e.replace(W, "$1"), t, n, r)
        }

        a = st.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, c = st.setDocument = function (e) {
            var n = e ? e.ownerDocument || e : w;
            return n !== p && 9 === n.nodeType && n.documentElement ? (p = n, f = n.documentElement, d = a(n), T.tagNameNoComments = at(function (e) {
                return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
            }), T.attributes = at(function (e) {
                e.innerHTML = "<select></select>";
                var t = typeof e.lastChild.getAttribute("multiple");
                return"boolean" !== t && "string" !== t
            }), T.getByClassName = at(function (e) {
                return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : !1
            }), T.getByName = at(function (e) {
                e.id = x + 0, e.innerHTML = "<a name='" + x + "'></a><div name='" + x + "'></div>", f.insertBefore(e, f.firstChild);
                var t = n.getElementsByName && n.getElementsByName(x).length === 2 + n.getElementsByName(x + 0).length;
                return T.getIdNotName = !n.getElementById(x), f.removeChild(e), t
            }), i.attrHandle = at(function (e) {
                return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== A && "#" === e.firstChild.getAttribute("href")
            }) ? {} : {href: function (e) {
                return e.getAttribute("href", 2)
            }, type: function (e) {
                return e.getAttribute("type")
            }}, T.getIdNotName ? (i.find.ID = function (e, t) {
                if (typeof t.getElementById !== A && !d) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, i.filter.ID = function (e) {
                var t = e.replace(et, tt);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (i.find.ID = function (e, n) {
                if (typeof n.getElementById !== A && !d) {
                    var r = n.getElementById(e);
                    return r ? r.id === e || typeof r.getAttributeNode !== A && r.getAttributeNode("id").value === e ? [r] : t : []
                }
            }, i.filter.ID = function (e) {
                var t = e.replace(et, tt);
                return function (e) {
                    var n = typeof e.getAttributeNode !== A && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), i.find.TAG = T.tagNameNoComments ? function (e, n) {
                return typeof n.getElementsByTagName !== A ? n.getElementsByTagName(e) : t
            } : function (e, t) {
                var n, r = [], i = 0, o = t.getElementsByTagName(e);
                if ("*" === e) {
                    while (n = o[i++])1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }, i.find.NAME = T.getByName && function (e, n) {
                return typeof n.getElementsByName !== A ? n.getElementsByName(name) : t
            }, i.find.CLASS = T.getByClassName && function (e, n) {
                return typeof n.getElementsByClassName === A || d ? t : n.getElementsByClassName(e)
            }, g = [], h = [":focus"], (T.qsa = rt(n.querySelectorAll)) && (at(function (e) {
                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || h.push("\\[" + _ + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || h.push(":checked")
            }), at(function (e) {
                e.innerHTML = "<input type='hidden' i=''/>", e.querySelectorAll("[i^='']").length && h.push("[*^$]=" + _ + "*(?:\"\"|'')"), e.querySelectorAll(":enabled").length || h.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), h.push(",.*:")
            })), (T.matchesSelector = rt(m = f.matchesSelector || f.mozMatchesSelector || f.webkitMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)) && at(function (e) {
                T.disconnectedMatch = m.call(e, "div"), m.call(e, "[s!='']:x"), g.push("!=", R)
            }), h = RegExp(h.join("|")), g = RegExp(g.join("|")), y = rt(f.contains) || f.compareDocumentPosition ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function (e, t) {
                if (t)while (t = t.parentNode)if (t === e)return!0;
                return!1
            }, v = f.compareDocumentPosition ? function (e, t) {
                var r;
                return e === t ? (u = !0, 0) : (r = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t)) ? 1 & r || e.parentNode && 11 === e.parentNode.nodeType ? e === n || y(w, e) ? -1 : t === n || y(w, t) ? 1 : 0 : 4 & r ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
            } : function (e, t) {
                var r, i = 0, o = e.parentNode, a = t.parentNode, s = [e], l = [t];
                if (e === t)return u = !0, 0;
                if (!o || !a)return e === n ? -1 : t === n ? 1 : o ? -1 : a ? 1 : 0;
                if (o === a)return ut(e, t);
                r = e;
                while (r = r.parentNode)s.unshift(r);
                r = t;
                while (r = r.parentNode)l.unshift(r);
                while (s[i] === l[i])i++;
                return i ? ut(s[i], l[i]) : s[i] === w ? -1 : l[i] === w ? 1 : 0
            }, u = !1, [0, 0].sort(v), T.detectDuplicates = u, p) : p
        }, st.matches = function (e, t) {
            return st(e, null, null, t)
        }, st.matchesSelector = function (e, t) {
            if ((e.ownerDocument || e) !== p && c(e), t = t.replace(Z, "='$1']"), !(!T.matchesSelector || d || g && g.test(t) || h.test(t)))try {
                var n = m.call(e, t);
                if (n || T.disconnectedMatch || e.document && 11 !== e.document.nodeType)return n
            } catch (r) {
            }
            return st(t, p, null, [e]).length > 0
        }, st.contains = function (e, t) {
            return(e.ownerDocument || e) !== p && c(e), y(e, t)
        }, st.attr = function (e, t) {
            var n;
            return(e.ownerDocument || e) !== p && c(e), d || (t = t.toLowerCase()), (n = i.attrHandle[t]) ? n(e) : d || T.attributes ? e.getAttribute(t) : ((n = e.getAttributeNode(t)) || e.getAttribute(t)) && e[t] === !0 ? t : n && n.specified ? n.value : null
        }, st.error = function (e) {
            throw Error("Syntax error, unrecognized expression: " + e)
        }, st.uniqueSort = function (e) {
            var t, n = [], r = 1, i = 0;
            if (u = !T.detectDuplicates, e.sort(v), u) {
                for (; t = e[r]; r++)t === e[r - 1] && (i = n.push(r));
                while (i--)e.splice(n[i], 1)
            }
            return e
        };
        function ut(e, t) {
            var n = t && e, r = n && (~t.sourceIndex || j) - (~e.sourceIndex || j);
            if (r)return r;
            if (n)while (n = n.nextSibling)if (n === t)return-1;
            return e ? 1 : -1
        }

        function lt(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return"input" === n && t.type === e
            }
        }

        function ct(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return("input" === n || "button" === n) && t.type === e
            }
        }

        function pt(e) {
            return ot(function (t) {
                return t = +t, ot(function (n, r) {
                    var i, o = e([], n.length, t), a = o.length;
                    while (a--)n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        o = st.getText = function (e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent)return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)n += o(e)
                } else if (3 === i || 4 === i)return e.nodeValue
            } else for (; t = e[r]; r++)n += o(t);
            return n
        }, i = st.selectors = {cacheLength: 50, createPseudo: ot, match: U, find: {}, relative: {">": {dir: "parentNode", first: !0}, " ": {dir: "parentNode"}, "+": {dir: "previousSibling", first: !0}, "~": {dir: "previousSibling"}}, preFilter: {ATTR: function (e) {
            return e[1] = e[1].replace(et, tt), e[3] = (e[4] || e[5] || "").replace(et, tt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
        }, CHILD: function (e) {
            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || st.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && st.error(e[0]), e
        }, PSEUDO: function (e) {
            var t, n = !e[5] && e[2];
            return U.CHILD.test(e[0]) ? null : (e[4] ? e[2] = e[4] : n && z.test(n) && (t = ft(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
        }}, filter: {TAG: function (e) {
            return"*" === e ? function () {
                return!0
            } : (e = e.replace(et, tt).toLowerCase(), function (t) {
                return t.nodeName && t.nodeName.toLowerCase() === e
            })
        }, CLASS: function (e) {
            var t = k[e + " "];
            return t || (t = RegExp("(^|" + _ + ")" + e + "(" + _ + "|$)")) && k(e, function (e) {
                return t.test(e.className || typeof e.getAttribute !== A && e.getAttribute("class") || "")
            })
        }, ATTR: function (e, t, n) {
            return function (r) {
                var i = st.attr(r, e);
                return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
            }
        }, CHILD: function (e, t, n, r, i) {
            var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
            return 1 === r && 0 === i ? function (e) {
                return!!e.parentNode
            } : function (t, n, u) {
                var l, c, p, f, d, h, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode, y = s && t.nodeName.toLowerCase(), v = !u && !s;
                if (m) {
                    if (o) {
                        while (g) {
                            p = t;
                            while (p = p[g])if (s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType)return!1;
                            h = g = "only" === e && !h && "nextSibling"
                        }
                        return!0
                    }
                    if (h = [a ? m.firstChild : m.lastChild], a && v) {
                        c = m[x] || (m[x] = {}), l = c[e] || [], d = l[0] === N && l[1], f = l[0] === N && l[2], p = d && m.childNodes[d];
                        while (p = ++d && p && p[g] || (f = d = 0) || h.pop())if (1 === p.nodeType && ++f && p === t) {
                            c[e] = [N, d, f];
                            break
                        }
                    } else if (v && (l = (t[x] || (t[x] = {}))[e]) && l[0] === N)f = l[1]; else while (p = ++d && p && p[g] || (f = d = 0) || h.pop())if ((s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) && ++f && (v && ((p[x] || (p[x] = {}))[e] = [N, f]), p === t))break;
                    return f -= i, f === r || 0 === f % r && f / r >= 0
                }
            }
        }, PSEUDO: function (e, t) {
            var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || st.error("unsupported pseudo: " + e);
            return r[x] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? ot(function (e, n) {
                var i, o = r(e, t), a = o.length;
                while (a--)i = M.call(e, o[a]), e[i] = !(n[i] = o[a])
            }) : function (e) {
                return r(e, 0, n)
            }) : r
        }}, pseudos: {not: ot(function (e) {
            var t = [], n = [], r = s(e.replace(W, "$1"));
            return r[x] ? ot(function (e, t, n, i) {
                var o, a = r(e, null, i, []), s = e.length;
                while (s--)(o = a[s]) && (e[s] = !(t[s] = o))
            }) : function (e, i, o) {
                return t[0] = e, r(t, null, o, n), !n.pop()
            }
        }), has: ot(function (e) {
            return function (t) {
                return st(e, t).length > 0
            }
        }), contains: ot(function (e) {
            return function (t) {
                return(t.textContent || t.innerText || o(t)).indexOf(e) > -1
            }
        }), lang: ot(function (e) {
            return X.test(e || "") || st.error("unsupported lang: " + e), e = e.replace(et, tt).toLowerCase(), function (t) {
                var n;
                do if (n = d ? t.getAttribute("xml:lang") || t.getAttribute("lang") : t.lang)return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                return!1
            }
        }), target: function (t) {
            var n = e.location && e.location.hash;
            return n && n.slice(1) === t.id
        }, root: function (e) {
            return e === f
        }, focus: function (e) {
            return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
        }, enabled: function (e) {
            return e.disabled === !1
        }, disabled: function (e) {
            return e.disabled === !0
        }, checked: function (e) {
            var t = e.nodeName.toLowerCase();
            return"input" === t && !!e.checked || "option" === t && !!e.selected
        }, selected: function (e) {
            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
        }, empty: function (e) {
            for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType)return!1;
            return!0
        }, parent: function (e) {
            return!i.pseudos.empty(e)
        }, header: function (e) {
            return Q.test(e.nodeName)
        }, input: function (e) {
            return G.test(e.nodeName)
        }, button: function (e) {
            var t = e.nodeName.toLowerCase();
            return"input" === t && "button" === e.type || "button" === t
        }, text: function (e) {
            var t;
            return"input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
        }, first: pt(function () {
            return[0]
        }), last: pt(function (e, t) {
            return[t - 1]
        }), eq: pt(function (e, t, n) {
            return[0 > n ? n + t : n]
        }), even: pt(function (e, t) {
            var n = 0;
            for (; t > n; n += 2)e.push(n);
            return e
        }), odd: pt(function (e, t) {
            var n = 1;
            for (; t > n; n += 2)e.push(n);
            return e
        }), lt: pt(function (e, t, n) {
            var r = 0 > n ? n + t : n;
            for (; --r >= 0;)e.push(r);
            return e
        }), gt: pt(function (e, t, n) {
            var r = 0 > n ? n + t : n;
            for (; t > ++r;)e.push(r);
            return e
        })}};
        for (n in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})i.pseudos[n] = lt(n);
        for (n in{submit: !0, reset: !0})i.pseudos[n] = ct(n);
        function ft(e, t) {
            var n, r, o, a, s, u, l, c = E[e + " "];
            if (c)return t ? 0 : c.slice(0);
            s = e, u = [], l = i.preFilter;
            while (s) {
                (!n || (r = $.exec(s))) && (r && (s = s.slice(r[0].length) || s), u.push(o = [])), n = !1, (r = I.exec(s)) && (n = r.shift(), o.push({value: n, type: r[0].replace(W, " ")}), s = s.slice(n.length));
                for (a in i.filter)!(r = U[a].exec(s)) || l[a] && !(r = l[a](r)) || (n = r.shift(), o.push({value: n, type: a, matches: r}), s = s.slice(n.length));
                if (!n)break
            }
            return t ? s.length : s ? st.error(e) : E(e, u).slice(0)
        }

        function dt(e) {
            var t = 0, n = e.length, r = "";
            for (; n > t; t++)r += e[t].value;
            return r
        }

        function ht(e, t, n) {
            var i = t.dir, o = n && "parentNode" === i, a = C++;
            return t.first ? function (t, n, r) {
                while (t = t[i])if (1 === t.nodeType || o)return e(t, n, r)
            } : function (t, n, s) {
                var u, l, c, p = N + " " + a;
                if (s) {
                    while (t = t[i])if ((1 === t.nodeType || o) && e(t, n, s))return!0
                } else while (t = t[i])if (1 === t.nodeType || o)if (c = t[x] || (t[x] = {}), (l = c[i]) && l[0] === p) {
                    if ((u = l[1]) === !0 || u === r)return u === !0
                } else if (l = c[i] = [p], l[1] = e(t, n, s) || r, l[1] === !0)return!0
            }
        }

        function gt(e) {
            return e.length > 1 ? function (t, n, r) {
                var i = e.length;
                while (i--)if (!e[i](t, n, r))return!1;
                return!0
            } : e[0]
        }

        function mt(e, t, n, r, i) {
            var o, a = [], s = 0, u = e.length, l = null != t;
            for (; u > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), l && t.push(s));
            return a
        }

        function yt(e, t, n, r, i, o) {
            return r && !r[x] && (r = yt(r)), i && !i[x] && (i = yt(i, o)), ot(function (o, a, s, u) {
                var l, c, p, f = [], d = [], h = a.length, g = o || xt(t || "*", s.nodeType ? [s] : s, []), m = !e || !o && t ? g : mt(g, f, e, s, u), y = n ? i || (o ? e : h || r) ? [] : a : m;
                if (n && n(m, y, s, u), r) {
                    l = mt(y, d), r(l, [], s, u), c = l.length;
                    while (c--)(p = l[c]) && (y[d[c]] = !(m[d[c]] = p))
                }
                if (o) {
                    if (i || e) {
                        if (i) {
                            l = [], c = y.length;
                            while (c--)(p = y[c]) && l.push(m[c] = p);
                            i(null, y = [], l, u)
                        }
                        c = y.length;
                        while (c--)(p = y[c]) && (l = i ? M.call(o, p) : f[c]) > -1 && (o[l] = !(a[l] = p))
                    }
                } else y = mt(y === a ? y.splice(h, y.length) : y), i ? i(null, a, y, u) : H.apply(a, y)
            })
        }

        function vt(e) {
            var t, n, r, o = e.length, a = i.relative[e[0].type], s = a || i.relative[" "], u = a ? 1 : 0, c = ht(function (e) {
                return e === t
            }, s, !0), p = ht(function (e) {
                return M.call(t, e) > -1
            }, s, !0), f = [function (e, n, r) {
                return!a && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : p(e, n, r))
            }];
            for (; o > u; u++)if (n = i.relative[e[u].type])f = [ht(gt(f), n)]; else {
                if (n = i.filter[e[u].type].apply(null, e[u].matches), n[x]) {
                    for (r = ++u; o > r; r++)if (i.relative[e[r].type])break;
                    return yt(u > 1 && gt(f), u > 1 && dt(e.slice(0, u - 1)).replace(W, "$1"), n, r > u && vt(e.slice(u, r)), o > r && vt(e = e.slice(r)), o > r && dt(e))
                }
                f.push(n)
            }
            return gt(f)
        }

        function bt(e, t) {
            var n = 0, o = t.length > 0, a = e.length > 0, s = function (s, u, c, f, d) {
                var h, g, m, y = [], v = 0, b = "0", x = s && [], w = null != d, T = l, C = s || a && i.find.TAG("*", d && u.parentNode || u), k = N += null == T ? 1 : Math.random() || .1;
                for (w && (l = u !== p && u, r = n); null != (h = C[b]); b++) {
                    if (a && h) {
                        g = 0;
                        while (m = e[g++])if (m(h, u, c)) {
                            f.push(h);
                            break
                        }
                        w && (N = k, r = ++n)
                    }
                    o && ((h = !m && h) && v--, s && x.push(h))
                }
                if (v += b, o && b !== v) {
                    g = 0;
                    while (m = t[g++])m(x, y, u, c);
                    if (s) {
                        if (v > 0)while (b--)x[b] || y[b] || (y[b] = L.call(f));
                        y = mt(y)
                    }
                    H.apply(f, y), w && !s && y.length > 0 && v + t.length > 1 && st.uniqueSort(f)
                }
                return w && (N = k, l = T), x
            };
            return o ? ot(s) : s
        }

        s = st.compile = function (e, t) {
            var n, r = [], i = [], o = S[e + " "];
            if (!o) {
                t || (t = ft(e)), n = t.length;
                while (n--)o = vt(t[n]), o[x] ? r.push(o) : i.push(o);
                o = S(e, bt(i, r))
            }
            return o
        };
        function xt(e, t, n) {
            var r = 0, i = t.length;
            for (; i > r; r++)st(e, t[r], n);
            return n
        }

        function wt(e, t, n, r) {
            var o, a, u, l, c, p = ft(e);
            if (!r && 1 === p.length) {
                if (a = p[0] = p[0].slice(0), a.length > 2 && "ID" === (u = a[0]).type && 9 === t.nodeType && !d && i.relative[a[1].type]) {
                    if (t = i.find.ID(u.matches[0].replace(et, tt), t)[0], !t)return n;
                    e = e.slice(a.shift().value.length)
                }
                o = U.needsContext.test(e) ? 0 : a.length;
                while (o--) {
                    if (u = a[o], i.relative[l = u.type])break;
                    if ((c = i.find[l]) && (r = c(u.matches[0].replace(et, tt), V.test(a[0].type) && t.parentNode || t))) {
                        if (a.splice(o, 1), e = r.length && dt(a), !e)return H.apply(n, q.call(r, 0)), n;
                        break
                    }
                }
            }
            return s(e, p)(r, t, d, n, V.test(e)), n
        }

        i.pseudos.nth = i.pseudos.eq;
        function Tt() {
        }

        i.filters = Tt.prototype = i.pseudos, i.setFilters = new Tt, c(), st.attr = b.attr, b.find = st, b.expr = st.selectors, b.expr[":"] = b.expr.pseudos, b.unique = st.uniqueSort, b.text = st.getText, b.isXMLDoc = st.isXML, b.contains = st.contains
    }(e);
    var at = /Until$/, st = /^(?:parents|prev(?:Until|All))/, ut = /^.[^:#\[\.,]*$/, lt = b.expr.match.needsContext, ct = {children: !0, contents: !0, next: !0, prev: !0};
    b.fn.extend({find: function (e) {
        var t, n, r, i = this.length;
        if ("string" != typeof e)return r = this, this.pushStack(b(e).filter(function () {
            for (t = 0; i > t; t++)if (b.contains(r[t], this))return!0
        }));
        for (n = [], t = 0; i > t; t++)b.find(e, this[t], n);
        return n = this.pushStack(i > 1 ? b.unique(n) : n), n.selector = (this.selector ? this.selector + " " : "") + e, n
    }, has: function (e) {
        var t, n = b(e, this), r = n.length;
        return this.filter(function () {
            for (t = 0; r > t; t++)if (b.contains(this, n[t]))return!0
        })
    }, not: function (e) {
        return this.pushStack(ft(this, e, !1))
    }, filter: function (e) {
        return this.pushStack(ft(this, e, !0))
    }, is: function (e) {
        return!!e && ("string" == typeof e ? lt.test(e) ? b(e, this.context).index(this[0]) >= 0 : b.filter(e, this).length > 0 : this.filter(e).length > 0)
    }, closest: function (e, t) {
        var n, r = 0, i = this.length, o = [], a = lt.test(e) || "string" != typeof e ? b(e, t || this.context) : 0;
        for (; i > r; r++) {
            n = this[r];
            while (n && n.ownerDocument && n !== t && 11 !== n.nodeType) {
                if (a ? a.index(n) > -1 : b.find.matchesSelector(n, e)) {
                    o.push(n);
                    break
                }
                n = n.parentNode
            }
        }
        return this.pushStack(o.length > 1 ? b.unique(o) : o)
    }, index: function (e) {
        return e ? "string" == typeof e ? b.inArray(this[0], b(e)) : b.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    }, add: function (e, t) {
        var n = "string" == typeof e ? b(e, t) : b.makeArray(e && e.nodeType ? [e] : e), r = b.merge(this.get(), n);
        return this.pushStack(b.unique(r))
    }, addBack: function (e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }}), b.fn.andSelf = b.fn.addBack;
    function pt(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e
    }

    b.each({parent: function (e) {
        var t = e.parentNode;
        return t && 11 !== t.nodeType ? t : null
    }, parents: function (e) {
        return b.dir(e, "parentNode")
    }, parentsUntil: function (e, t, n) {
        return b.dir(e, "parentNode", n)
    }, next: function (e) {
        return pt(e, "nextSibling")
    }, prev: function (e) {
        return pt(e, "previousSibling")
    }, nextAll: function (e) {
        return b.dir(e, "nextSibling")
    }, prevAll: function (e) {
        return b.dir(e, "previousSibling")
    }, nextUntil: function (e, t, n) {
        return b.dir(e, "nextSibling", n)
    }, prevUntil: function (e, t, n) {
        return b.dir(e, "previousSibling", n)
    }, siblings: function (e) {
        return b.sibling((e.parentNode || {}).firstChild, e)
    }, children: function (e) {
        return b.sibling(e.firstChild)
    }, contents: function (e) {
        return b.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : b.merge([], e.childNodes)
    }}, function (e, t) {
        b.fn[e] = function (n, r) {
            var i = b.map(this, t, n);
            return at.test(e) || (r = n), r && "string" == typeof r && (i = b.filter(r, i)), i = this.length > 1 && !ct[e] ? b.unique(i) : i, this.length > 1 && st.test(e) && (i = i.reverse()), this.pushStack(i)
        }
    }), b.extend({filter: function (e, t, n) {
        return n && (e = ":not(" + e + ")"), 1 === t.length ? b.find.matchesSelector(t[0], e) ? [t[0]] : [] : b.find.matches(e, t)
    }, dir: function (e, n, r) {
        var i = [], o = e[n];
        while (o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !b(o).is(r)))1 === o.nodeType && i.push(o), o = o[n];
        return i
    }, sibling: function (e, t) {
        var n = [];
        for (; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
        return n
    }});
    function ft(e, t, n) {
        if (t = t || 0, b.isFunction(t))return b.grep(e, function (e, r) {
            var i = !!t.call(e, r, e);
            return i === n
        });
        if (t.nodeType)return b.grep(e, function (e) {
            return e === t === n
        });
        if ("string" == typeof t) {
            var r = b.grep(e, function (e) {
                return 1 === e.nodeType
            });
            if (ut.test(t))return b.filter(t, r, !n);
            t = b.filter(t, r)
        }
        return b.grep(e, function (e) {
            return b.inArray(e, t) >= 0 === n
        })
    }

    function dt(e) {
        var t = ht.split("|"), n = e.createDocumentFragment();
        if (n.createElement)while (t.length)n.createElement(t.pop());
        return n
    }

    var ht = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", gt = / jQuery\d+="(?:null|\d+)"/g, mt = RegExp("<(?:" + ht + ")[\\s/>]", "i"), yt = /^\s+/, vt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, bt = /<([\w:]+)/, xt = /<tbody/i, wt = /<|&#?\w+;/, Tt = /<(?:script|style|link)/i, Nt = /^(?:checkbox|radio)$/i, Ct = /checked\s*(?:[^=]|=\s*.checked.)/i, kt = /^$|\/(?:java|ecma)script/i, Et = /^true\/(.*)/, St = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, At = {option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: b.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]}, jt = dt(o), Dt = jt.appendChild(o.createElement("div"));
    At.optgroup = At.option, At.tbody = At.tfoot = At.colgroup = At.caption = At.thead, At.th = At.td, b.fn.extend({text: function (e) {
        return b.access(this, function (e) {
            return e === t ? b.text(this) : this.empty().append((this[0] && this[0].ownerDocument || o).createTextNode(e))
        }, null, e, arguments.length)
    }, wrapAll: function (e) {
        if (b.isFunction(e))return this.each(function (t) {
            b(this).wrapAll(e.call(this, t))
        });
        if (this[0]) {
            var t = b(e, this[0].ownerDocument).eq(0).clone(!0);
            this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                var e = this;
                while (e.firstChild && 1 === e.firstChild.nodeType)e = e.firstChild;
                return e
            }).append(this)
        }
        return this
    }, wrapInner: function (e) {
        return b.isFunction(e) ? this.each(function (t) {
            b(this).wrapInner(e.call(this, t))
        }) : this.each(function () {
            var t = b(this), n = t.contents();
            n.length ? n.wrapAll(e) : t.append(e)
        })
    }, wrap: function (e) {
        var t = b.isFunction(e);
        return this.each(function (n) {
            b(this).wrapAll(t ? e.call(this, n) : e)
        })
    }, unwrap: function () {
        return this.parent().each(function () {
            b.nodeName(this, "body") || b(this).replaceWith(this.childNodes)
        }).end()
    }, append: function () {
        return this.domManip(arguments, !0, function (e) {
            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(e)
        })
    }, prepend: function () {
        return this.domManip(arguments, !0, function (e) {
            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(e, this.firstChild)
        })
    }, before: function () {
        return this.domManip(arguments, !1, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this)
        })
    }, after: function () {
        return this.domManip(arguments, !1, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
        })
    }, remove: function (e, t) {
        var n, r = 0;
        for (; null != (n = this[r]); r++)(!e || b.filter(e, [n]).length > 0) && (t || 1 !== n.nodeType || b.cleanData(Ot(n)), n.parentNode && (t && b.contains(n.ownerDocument, n) && Mt(Ot(n, "script")), n.parentNode.removeChild(n)));
        return this
    }, empty: function () {
        var e, t = 0;
        for (; null != (e = this[t]); t++) {
            1 === e.nodeType && b.cleanData(Ot(e, !1));
            while (e.firstChild)e.removeChild(e.firstChild);
            e.options && b.nodeName(e, "select") && (e.options.length = 0)
        }
        return this
    }, clone: function (e, t) {
        return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
            return b.clone(this, e, t)
        })
    }, html: function (e) {
        return b.access(this, function (e) {
            var n = this[0] || {}, r = 0, i = this.length;
            if (e === t)return 1 === n.nodeType ? n.innerHTML.replace(gt, "") : t;
            if (!("string" != typeof e || Tt.test(e) || !b.support.htmlSerialize && mt.test(e) || !b.support.leadingWhitespace && yt.test(e) || At[(bt.exec(e) || ["", ""])[1].toLowerCase()])) {
                e = e.replace(vt, "<$1></$2>");
                try {
                    for (; i > r; r++)n = this[r] || {}, 1 === n.nodeType && (b.cleanData(Ot(n, !1)), n.innerHTML = e);
                    n = 0
                } catch (o) {
                }
            }
            n && this.empty().append(e)
        }, null, e, arguments.length)
    }, replaceWith: function (e) {
        var t = b.isFunction(e);
        return t || "string" == typeof e || (e = b(e).not(this).detach()), this.domManip([e], !0, function (e) {
            var t = this.nextSibling, n = this.parentNode;
            n && (b(this).remove(), n.insertBefore(e, t))
        })
    }, detach: function (e) {
        return this.remove(e, !0)
    }, domManip: function (e, n, r) {
        e = f.apply([], e);
        var i, o, a, s, u, l, c = 0, p = this.length, d = this, h = p - 1, g = e[0], m = b.isFunction(g);
        if (m || !(1 >= p || "string" != typeof g || b.support.checkClone) && Ct.test(g))return this.each(function (i) {
            var o = d.eq(i);
            m && (e[0] = g.call(this, i, n ? o.html() : t)), o.domManip(e, n, r)
        });
        if (p && (l = b.buildFragment(e, this[0].ownerDocument, !1, this), i = l.firstChild, 1 === l.childNodes.length && (l = i), i)) {
            for (n = n && b.nodeName(i, "tr"), s = b.map(Ot(l, "script"), Ht), a = s.length; p > c; c++)o = l, c !== h && (o = b.clone(o, !0, !0), a && b.merge(s, Ot(o, "script"))), r.call(n && b.nodeName(this[c], "table") ? Lt(this[c], "tbody") : this[c], o, c);
            if (a)for (u = s[s.length - 1].ownerDocument, b.map(s, qt), c = 0; a > c; c++)o = s[c], kt.test(o.type || "") && !b._data(o, "globalEval") && b.contains(u, o) && (o.src ? b.ajax({url: o.src, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0}) : b.globalEval((o.text || o.textContent || o.innerHTML || "").replace(St, "")));
            l = i = null
        }
        return this
    }});
    function Lt(e, t) {
        return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
    }

    function Ht(e) {
        var t = e.getAttributeNode("type");
        return e.type = (t && t.specified) + "/" + e.type, e
    }

    function qt(e) {
        var t = Et.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function Mt(e, t) {
        var n, r = 0;
        for (; null != (n = e[r]); r++)b._data(n, "globalEval", !t || b._data(t[r], "globalEval"))
    }

    function _t(e, t) {
        if (1 === t.nodeType && b.hasData(e)) {
            var n, r, i, o = b._data(e), a = b._data(t, o), s = o.events;
            if (s) {
                delete a.handle, a.events = {};
                for (n in s)for (r = 0, i = s[n].length; i > r; r++)b.event.add(t, n, s[n][r])
            }
            a.data && (a.data = b.extend({}, a.data))
        }
    }

    function Ft(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !b.support.noCloneEvent && t[b.expando]) {
                i = b._data(t);
                for (r in i.events)b.removeEvent(t, r, i.handle);
                t.removeAttribute(b.expando)
            }
            "script" === n && t.text !== e.text ? (Ht(t).text = e.text, qt(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), b.support.html5Clone && e.innerHTML && !b.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Nt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }

    b.each({appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"}, function (e, t) {
        b.fn[e] = function (e) {
            var n, r = 0, i = [], o = b(e), a = o.length - 1;
            for (; a >= r; r++)n = r === a ? this : this.clone(!0), b(o[r])[t](n), d.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    function Ot(e, n) {
        var r, o, a = 0, s = typeof e.getElementsByTagName !== i ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== i ? e.querySelectorAll(n || "*") : t;
        if (!s)for (s = [], r = e.childNodes || e; null != (o = r[a]); a++)!n || b.nodeName(o, n) ? s.push(o) : b.merge(s, Ot(o, n));
        return n === t || n && b.nodeName(e, n) ? b.merge([e], s) : s
    }

    function Bt(e) {
        Nt.test(e.type) && (e.defaultChecked = e.checked)
    }

    b.extend({clone: function (e, t, n) {
        var r, i, o, a, s, u = b.contains(e.ownerDocument, e);
        if (b.support.html5Clone || b.isXMLDoc(e) || !mt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Dt.innerHTML = e.outerHTML, Dt.removeChild(o = Dt.firstChild)), !(b.support.noCloneEvent && b.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || b.isXMLDoc(e)))for (r = Ot(o), s = Ot(e), a = 0; null != (i = s[a]); ++a)r[a] && Ft(i, r[a]);
        if (t)if (n)for (s = s || Ot(e), r = r || Ot(o), a = 0; null != (i = s[a]); a++)_t(i, r[a]); else _t(e, o);
        return r = Ot(o, "script"), r.length > 0 && Mt(r, !u && Ot(e, "script")), r = s = i = null, o
    }, buildFragment: function (e, t, n, r) {
        var i, o, a, s, u, l, c, p = e.length, f = dt(t), d = [], h = 0;
        for (; p > h; h++)if (o = e[h], o || 0 === o)if ("object" === b.type(o))b.merge(d, o.nodeType ? [o] : o); else if (wt.test(o)) {
            s = s || f.appendChild(t.createElement("div")), u = (bt.exec(o) || ["", ""])[1].toLowerCase(), c = At[u] || At._default, s.innerHTML = c[1] + o.replace(vt, "<$1></$2>") + c[2], i = c[0];
            while (i--)s = s.lastChild;
            if (!b.support.leadingWhitespace && yt.test(o) && d.push(t.createTextNode(yt.exec(o)[0])), !b.support.tbody) {
                o = "table" !== u || xt.test(o) ? "<table>" !== c[1] || xt.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length;
                while (i--)b.nodeName(l = o.childNodes[i], "tbody") && !l.childNodes.length && o.removeChild(l)
            }
            b.merge(d, s.childNodes), s.textContent = "";
            while (s.firstChild)s.removeChild(s.firstChild);
            s = f.lastChild
        } else d.push(t.createTextNode(o));
        s && f.removeChild(s), b.support.appendChecked || b.grep(Ot(d, "input"), Bt), h = 0;
        while (o = d[h++])if ((!r || -1 === b.inArray(o, r)) && (a = b.contains(o.ownerDocument, o), s = Ot(f.appendChild(o), "script"), a && Mt(s), n)) {
            i = 0;
            while (o = s[i++])kt.test(o.type || "") && n.push(o)
        }
        return s = null, f
    }, cleanData: function (e, t) {
        var n, r, o, a, s = 0, u = b.expando, l = b.cache, p = b.support.deleteExpando, f = b.event.special;
        for (; null != (n = e[s]); s++)if ((t || b.acceptData(n)) && (o = n[u], a = o && l[o])) {
            if (a.events)for (r in a.events)f[r] ? b.event.remove(n, r) : b.removeEvent(n, r, a.handle);
            l[o] && (delete l[o], p ? delete n[u] : typeof n.removeAttribute !== i ? n.removeAttribute(u) : n[u] = null, c.push(o))
        }
    }});
    var Pt, Rt, Wt, $t = /alpha\([^)]*\)/i, It = /opacity\s*=\s*([^)]*)/, zt = /^(top|right|bottom|left)$/, Xt = /^(none|table(?!-c[ea]).+)/, Ut = /^margin/, Vt = RegExp("^(" + x + ")(.*)$", "i"), Yt = RegExp("^(" + x + ")(?!px)[a-z%]+$", "i"), Jt = RegExp("^([+-])=(" + x + ")", "i"), Gt = {BODY: "block"}, Qt = {position: "absolute", visibility: "hidden", display: "block"}, Kt = {letterSpacing: 0, fontWeight: 400}, Zt = ["Top", "Right", "Bottom", "Left"], en = ["Webkit", "O", "Moz", "ms"];

    function tn(e, t) {
        if (t in e)return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = en.length;
        while (i--)if (t = en[i] + n, t in e)return t;
        return r
    }

    function nn(e, t) {
        return e = t || e, "none" === b.css(e, "display") || !b.contains(e.ownerDocument, e)
    }

    function rn(e, t) {
        var n, r, i, o = [], a = 0, s = e.length;
        for (; s > a; a++)r = e[a], r.style && (o[a] = b._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && nn(r) && (o[a] = b._data(r, "olddisplay", un(r.nodeName)))) : o[a] || (i = nn(r), (n && "none" !== n || !i) && b._data(r, "olddisplay", i ? n : b.css(r, "display"))));
        for (a = 0; s > a; a++)r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
        return e
    }

    b.fn.extend({css: function (e, n) {
        return b.access(this, function (e, n, r) {
            var i, o, a = {}, s = 0;
            if (b.isArray(n)) {
                for (o = Rt(e), i = n.length; i > s; s++)a[n[s]] = b.css(e, n[s], !1, o);
                return a
            }
            return r !== t ? b.style(e, n, r) : b.css(e, n)
        }, e, n, arguments.length > 1)
    }, show: function () {
        return rn(this, !0)
    }, hide: function () {
        return rn(this)
    }, toggle: function (e) {
        var t = "boolean" == typeof e;
        return this.each(function () {
            (t ? e : nn(this)) ? b(this).show() : b(this).hide()
        })
    }}), b.extend({cssHooks: {opacity: {get: function (e, t) {
        if (t) {
            var n = Wt(e, "opacity");
            return"" === n ? "1" : n
        }
    }}}, cssNumber: {columnCount: !0, fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0}, cssProps: {"float": b.support.cssFloat ? "cssFloat" : "styleFloat"}, style: function (e, n, r, i) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
            var o, a, s, u = b.camelCase(n), l = e.style;
            if (n = b.cssProps[u] || (b.cssProps[u] = tn(l, u)), s = b.cssHooks[n] || b.cssHooks[u], r === t)return s && "get"in s && (o = s.get(e, !1, i)) !== t ? o : l[n];
            if (a = typeof r, "string" === a && (o = Jt.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(b.css(e, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || b.cssNumber[u] || (r += "px"), b.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (l[n] = "inherit"), s && "set"in s && (r = s.set(e, r, i)) === t)))try {
                l[n] = r
            } catch (c) {
            }
        }
    }, css: function (e, n, r, i) {
        var o, a, s, u = b.camelCase(n);
        return n = b.cssProps[u] || (b.cssProps[u] = tn(e.style, u)), s = b.cssHooks[n] || b.cssHooks[u], s && "get"in s && (a = s.get(e, !0, r)), a === t && (a = Wt(e, n, i)), "normal" === a && n in Kt && (a = Kt[n]), "" === r || r ? (o = parseFloat(a), r === !0 || b.isNumeric(o) ? o || 0 : a) : a
    }, swap: function (e, t, n, r) {
        var i, o, a = {};
        for (o in t)a[o] = e.style[o], e.style[o] = t[o];
        i = n.apply(e, r || []);
        for (o in t)e.style[o] = a[o];
        return i
    }}), e.getComputedStyle ? (Rt = function (t) {
        return e.getComputedStyle(t, null)
    }, Wt = function (e, n, r) {
        var i, o, a, s = r || Rt(e), u = s ? s.getPropertyValue(n) || s[n] : t, l = e.style;
        return s && ("" !== u || b.contains(e.ownerDocument, e) || (u = b.style(e, n)), Yt.test(u) && Ut.test(n) && (i = l.width, o = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = u, u = s.width, l.width = i, l.minWidth = o, l.maxWidth = a)), u
    }) : o.documentElement.currentStyle && (Rt = function (e) {
        return e.currentStyle
    }, Wt = function (e, n, r) {
        var i, o, a, s = r || Rt(e), u = s ? s[n] : t, l = e.style;
        return null == u && l && l[n] && (u = l[n]), Yt.test(u) && !zt.test(n) && (i = l.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), l.left = "fontSize" === n ? "1em" : u, u = l.pixelLeft + "px", l.left = i, a && (o.left = a)), "" === u ? "auto" : u
    });
    function on(e, t, n) {
        var r = Vt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function an(e, t, n, r, i) {
        var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0;
        for (; 4 > o; o += 2)"margin" === n && (a += b.css(e, n + Zt[o], !0, i)), r ? ("content" === n && (a -= b.css(e, "padding" + Zt[o], !0, i)), "margin" !== n && (a -= b.css(e, "border" + Zt[o] + "Width", !0, i))) : (a += b.css(e, "padding" + Zt[o], !0, i), "padding" !== n && (a += b.css(e, "border" + Zt[o] + "Width", !0, i)));
        return a
    }

    function sn(e, t, n) {
        var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = Rt(e), a = b.support.boxSizing && "border-box" === b.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = Wt(e, t, o), (0 > i || null == i) && (i = e.style[t]), Yt.test(i))return i;
            r = a && (b.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + an(e, t, n || (a ? "border" : "content"), r, o) + "px"
    }

    function un(e) {
        var t = o, n = Gt[e];
        return n || (n = ln(e, t), "none" !== n && n || (Pt = (Pt || b("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (Pt[0].contentWindow || Pt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = ln(e, t), Pt.detach()), Gt[e] = n), n
    }

    function ln(e, t) {
        var n = b(t.createElement(e)).appendTo(t.body), r = b.css(n[0], "display");
        return n.remove(), r
    }

    b.each(["height", "width"], function (e, n) {
        b.cssHooks[n] = {get: function (e, r, i) {
            return r ? 0 === e.offsetWidth && Xt.test(b.css(e, "display")) ? b.swap(e, Qt, function () {
                return sn(e, n, i)
            }) : sn(e, n, i) : t
        }, set: function (e, t, r) {
            var i = r && Rt(e);
            return on(e, t, r ? an(e, n, r, b.support.boxSizing && "border-box" === b.css(e, "boxSizing", !1, i), i) : 0)
        }}
    }), b.support.opacity || (b.cssHooks.opacity = {get: function (e, t) {
        return It.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
    }, set: function (e, t) {
        var n = e.style, r = e.currentStyle, i = b.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", o = r && r.filter || n.filter || "";
        n.zoom = 1, (t >= 1 || "" === t) && "" === b.trim(o.replace($t, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = $t.test(o) ? o.replace($t, i) : o + " " + i)
    }}), b(function () {
        b.support.reliableMarginRight || (b.cssHooks.marginRight = {get: function (e, n) {
            return n ? b.swap(e, {display: "inline-block"}, Wt, [e, "marginRight"]) : t
        }}), !b.support.pixelPosition && b.fn.position && b.each(["top", "left"], function (e, n) {
            b.cssHooks[n] = {get: function (e, r) {
                return r ? (r = Wt(e, n), Yt.test(r) ? b(e).position()[n] + "px" : r) : t
            }}
        })
    }), b.expr && b.expr.filters && (b.expr.filters.hidden = function (e) {
        return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !b.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || b.css(e, "display"))
    }, b.expr.filters.visible = function (e) {
        return!b.expr.filters.hidden(e)
    }), b.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        b.cssHooks[e + t] = {expand: function (n) {
            var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n];
            for (; 4 > r; r++)i[e + Zt[r] + t] = o[r] || o[r - 2] || o[0];
            return i
        }}, Ut.test(e) || (b.cssHooks[e + t].set = on)
    });
    var cn = /%20/g, pn = /\[\]$/, fn = /\r?\n/g, dn = /^(?:submit|button|image|reset|file)$/i, hn = /^(?:input|select|textarea|keygen)/i;
    b.fn.extend({serialize: function () {
        return b.param(this.serializeArray())
    }, serializeArray: function () {
        return this.map(function () {
            var e = b.prop(this, "elements");
            return e ? b.makeArray(e) : this
        }).filter(function () {
            var e = this.type;
            return this.name && !b(this).is(":disabled") && hn.test(this.nodeName) && !dn.test(e) && (this.checked || !Nt.test(e))
        }).map(function (e, t) {
            var n = b(this).val();
            return null == n ? null : b.isArray(n) ? b.map(n, function (e) {
                return{name: t.name, value: e.replace(fn, "\r\n")}
            }) : {name: t.name, value: n.replace(fn, "\r\n")}
        }).get()
    }}), b.param = function (e, n) {
        var r, i = [], o = function (e, t) {
            t = b.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (n === t && (n = b.ajaxSettings && b.ajaxSettings.traditional), b.isArray(e) || e.jquery && !b.isPlainObject(e))b.each(e, function () {
            o(this.name, this.value)
        }); else for (r in e)gn(r, e[r], n, o);
        return i.join("&").replace(cn, "+")
    };
    function gn(e, t, n, r) {
        var i;
        if (b.isArray(t))b.each(t, function (t, i) {
            n || pn.test(e) ? r(e, i) : gn(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
        }); else if (n || "object" !== b.type(t))r(e, t); else for (i in t)gn(e + "[" + i + "]", t[i], n, r)
    }

    b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        b.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), b.fn.hover = function (e, t) {
        return this.mouseenter(e).mouseleave(t || e)
    };
    var mn, yn, vn = b.now(), bn = /\?/, xn = /#.*$/, wn = /([?&])_=[^&]*/, Tn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Nn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Cn = /^(?:GET|HEAD)$/, kn = /^\/\//, En = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Sn = b.fn.load, An = {}, jn = {}, Dn = "*/".concat("*");
    try {
        yn = a.href
    } catch (Ln) {
        yn = o.createElement("a"), yn.href = "", yn = yn.href
    }
    mn = En.exec(yn.toLowerCase()) || [];
    function Hn(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0, o = t.toLowerCase().match(w) || [];
            if (b.isFunction(n))while (r = o[i++])"+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function qn(e, n, r, i) {
        var o = {}, a = e === jn;

        function s(u) {
            var l;
            return o[u] = !0, b.each(e[u] || [], function (e, u) {
                var c = u(n, r, i);
                return"string" != typeof c || a || o[c] ? a ? !(l = c) : t : (n.dataTypes.unshift(c), s(c), !1)
            }), l
        }

        return s(n.dataTypes[0]) || !o["*"] && s("*")
    }

    function Mn(e, n) {
        var r, i, o = b.ajaxSettings.flatOptions || {};
        for (i in n)n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]);
        return r && b.extend(!0, e, r), e
    }

    b.fn.load = function (e, n, r) {
        if ("string" != typeof e && Sn)return Sn.apply(this, arguments);
        var i, o, a, s = this, u = e.indexOf(" ");
        return u >= 0 && (i = e.slice(u, e.length), e = e.slice(0, u)), b.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && b.ajax({url: e, type: a, dataType: "html", data: n}).done(function (e) {
            o = arguments, s.html(i ? b("<div>").append(b.parseHTML(e)).find(i) : e)
        }).complete(r && function (e, t) {
            s.each(r, o || [e.responseText, t, e])
        }), this
    }, b.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        b.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), b.each(["get", "post"], function (e, n) {
        b[n] = function (e, r, i, o) {
            return b.isFunction(r) && (o = o || i, i = r, r = t), b.ajax({url: e, type: n, dataType: o, data: r, success: i})
        }
    }), b.extend({active: 0, lastModified: {}, etag: {}, ajaxSettings: {url: yn, type: "GET", isLocal: Nn.test(mn[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: {"*": Dn, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript"}, contents: {xml: /xml/, html: /html/, json: /json/}, responseFields: {xml: "responseXML", text: "responseText"}, converters: {"* text": e.String, "text html": !0, "text json": b.parseJSON, "text xml": b.parseXML}, flatOptions: {url: !0, context: !0}}, ajaxSetup: function (e, t) {
        return t ? Mn(Mn(e, b.ajaxSettings), t) : Mn(b.ajaxSettings, e)
    }, ajaxPrefilter: Hn(An), ajaxTransport: Hn(jn), ajax: function (e, n) {
        "object" == typeof e && (n = e, e = t), n = n || {};
        var r, i, o, a, s, u, l, c, p = b.ajaxSetup({}, n), f = p.context || p, d = p.context && (f.nodeType || f.jquery) ? b(f) : b.event, h = b.Deferred(), g = b.Callbacks("once memory"), m = p.statusCode || {}, y = {}, v = {}, x = 0, T = "canceled", N = {readyState: 0, getResponseHeader: function (e) {
            var t;
            if (2 === x) {
                if (!c) {
                    c = {};
                    while (t = Tn.exec(a))c[t[1].toLowerCase()] = t[2]
                }
                t = c[e.toLowerCase()]
            }
            return null == t ? null : t
        }, getAllResponseHeaders: function () {
            return 2 === x ? a : null
        }, setRequestHeader: function (e, t) {
            var n = e.toLowerCase();
            return x || (e = v[n] = v[n] || e, y[e] = t), this
        }, overrideMimeType: function (e) {
            return x || (p.mimeType = e), this
        }, statusCode: function (e) {
            var t;
            if (e)if (2 > x)for (t in e)m[t] = [m[t], e[t]]; else N.always(e[N.status]);
            return this
        }, abort: function (e) {
            var t = e || T;
            return l && l.abort(t), k(0, t), this
        }};
        if (h.promise(N).complete = g.add, N.success = N.done, N.error = N.fail, p.url = ((e || p.url || yn) + "").replace(xn, "").replace(kn, mn[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = b.trim(p.dataType || "*").toLowerCase().match(w) || [""], null == p.crossDomain && (r = En.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === mn[1] && r[2] === mn[2] && (r[3] || ("http:" === r[1] ? 80 : 443)) == (mn[3] || ("http:" === mn[1] ? 80 : 443)))), p.data && p.processData && "string" != typeof p.data && (p.data = b.param(p.data, p.traditional)), qn(An, p, n, N), 2 === x)return N;
        u = p.global, u && 0 === b.active++ && b.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Cn.test(p.type), o = p.url, p.hasContent || (p.data && (o = p.url += (bn.test(o) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = wn.test(o) ? o.replace(wn, "$1_=" + vn++) : o + (bn.test(o) ? "&" : "?") + "_=" + vn++)), p.ifModified && (b.lastModified[o] && N.setRequestHeader("If-Modified-Since", b.lastModified[o]), b.etag[o] && N.setRequestHeader("If-None-Match", b.etag[o])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && N.setRequestHeader("Content-Type", p.contentType), N.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Dn + "; q=0.01" : "") : p.accepts["*"]);
        for (i in p.headers)N.setRequestHeader(i, p.headers[i]);
        if (p.beforeSend && (p.beforeSend.call(f, N, p) === !1 || 2 === x))return N.abort();
        T = "abort";
        for (i in{success: 1, error: 1, complete: 1})N[i](p[i]);
        if (l = qn(jn, p, n, N)) {
            N.readyState = 1, u && d.trigger("ajaxSend", [N, p]), p.async && p.timeout > 0 && (s = setTimeout(function () {
                N.abort("timeout")
            }, p.timeout));
            try {
                x = 1, l.send(y, k)
            } catch (C) {
                if (!(2 > x))throw C;
                k(-1, C)
            }
        } else k(-1, "No Transport");
        function k(e, n, r, i) {
            var c, y, v, w, T, C = n;
            2 !== x && (x = 2, s && clearTimeout(s), l = t, a = i || "", N.readyState = e > 0 ? 4 : 0, r && (w = _n(p, N, r)), e >= 200 && 300 > e || 304 === e ? (p.ifModified && (T = N.getResponseHeader("Last-Modified"), T && (b.lastModified[o] = T), T = N.getResponseHeader("etag"), T && (b.etag[o] = T)), 204 === e ? (c = !0, C = "nocontent") : 304 === e ? (c = !0, C = "notmodified") : (c = Fn(p, w), C = c.state, y = c.data, v = c.error, c = !v)) : (v = C, (e || !C) && (C = "error", 0 > e && (e = 0))), N.status = e, N.statusText = (n || C) + "", c ? h.resolveWith(f, [y, C, N]) : h.rejectWith(f, [N, C, v]), N.statusCode(m), m = t, u && d.trigger(c ? "ajaxSuccess" : "ajaxError", [N, p, c ? y : v]), g.fireWith(f, [N, C]), u && (d.trigger("ajaxComplete", [N, p]), --b.active || b.event.trigger("ajaxStop")))
        }

        return N
    }, getScript: function (e, n) {
        return b.get(e, t, n, "script")
    }, getJSON: function (e, t, n) {
        return b.get(e, t, n, "json")
    }});
    function _n(e, n, r) {
        var i, o, a, s, u = e.contents, l = e.dataTypes, c = e.responseFields;
        for (s in c)s in r && (n[c[s]] = r[s]);
        while ("*" === l[0])l.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
        if (o)for (s in u)if (u[s] && u[s].test(o)) {
            l.unshift(s);
            break
        }
        if (l[0]in r)a = l[0]; else {
            for (s in r) {
                if (!l[0] || e.converters[s + " " + l[0]]) {
                    a = s;
                    break
                }
                i || (i = s)
            }
            a = a || i
        }
        return a ? (a !== l[0] && l.unshift(a), r[a]) : t
    }

    function Fn(e, t) {
        var n, r, i, o, a = {}, s = 0, u = e.dataTypes.slice(), l = u[0];
        if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), u[1])for (i in e.converters)a[i.toLowerCase()] = e.converters[i];
        for (; r = u[++s];)if ("*" !== r) {
            if ("*" !== l && l !== r) {
                if (i = a[l + " " + r] || a["* " + r], !i)for (n in a)if (o = n.split(" "), o[1] === r && (i = a[l + " " + o[0]] || a["* " + o[0]])) {
                    i === !0 ? i = a[n] : a[n] !== !0 && (r = o[0], u.splice(s--, 0, r));
                    break
                }
                if (i !== !0)if (i && e["throws"])t = i(t); else try {
                    t = i(t)
                } catch (c) {
                    return{state: "parsererror", error: i ? c : "No conversion from " + l + " to " + r}
                }
            }
            l = r
        }
        return{state: "success", data: t}
    }

    b.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents: {script: /(?:java|ecma)script/}, converters: {"text script": function (e) {
        return b.globalEval(e), e
    }}}), b.ajaxPrefilter("script", function (e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), b.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var n, r = o.head || b("head")[0] || o.documentElement;
            return{send: function (t, i) {
                n = o.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, t) {
                    (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success"))
                }, r.insertBefore(n, r.firstChild)
            }, abort: function () {
                n && n.onload(t, !0)
            }}
        }
    });
    var On = [], Bn = /(=)\?(?=&|$)|\?\?/;
    b.ajaxSetup({jsonp: "callback", jsonpCallback: function () {
        var e = On.pop() || b.expando + "_" + vn++;
        return this[e] = !0, e
    }}), b.ajaxPrefilter("json jsonp", function (n, r, i) {
        var o, a, s, u = n.jsonp !== !1 && (Bn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Bn.test(n.data) && "data");
        return u || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = b.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, u ? n[u] = n[u].replace(Bn, "$1" + o) : n.jsonp !== !1 && (n.url += (bn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function () {
            return s || b.error(o + " was not called"), s[0]
        }, n.dataTypes[0] = "json", a = e[o], e[o] = function () {
            s = arguments
        }, i.always(function () {
            e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, On.push(o)), s && b.isFunction(a) && a(s[0]), s = a = t
        }), "script") : t
    });
    var Pn, Rn, Wn = 0, $n = e.ActiveXObject && function () {
        var e;
        for (e in Pn)Pn[e](t, !0)
    };

    function In() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {
        }
    }

    function zn() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {
        }
    }

    b.ajaxSettings.xhr = e.ActiveXObject ? function () {
        return!this.isLocal && In() || zn()
    } : In, Rn = b.ajaxSettings.xhr(), b.support.cors = !!Rn && "withCredentials"in Rn, Rn = b.support.ajax = !!Rn, Rn && b.ajaxTransport(function (n) {
        if (!n.crossDomain || b.support.cors) {
            var r;
            return{send: function (i, o) {
                var a, s, u = n.xhr();
                if (n.username ? u.open(n.type, n.url, n.async, n.username, n.password) : u.open(n.type, n.url, n.async), n.xhrFields)for (s in n.xhrFields)u[s] = n.xhrFields[s];
                n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                try {
                    for (s in i)u.setRequestHeader(s, i[s])
                } catch (l) {
                }
                u.send(n.hasContent && n.data || null), r = function (e, i) {
                    var s, l, c, p;
                    try {
                        if (r && (i || 4 === u.readyState))if (r = t, a && (u.onreadystatechange = b.noop, $n && delete Pn[a]), i)4 !== u.readyState && u.abort(); else {
                            p = {}, s = u.status, l = u.getAllResponseHeaders(), "string" == typeof u.responseText && (p.text = u.responseText);
                            try {
                                c = u.statusText
                            } catch (f) {
                                c = ""
                            }
                            s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = p.text ? 200 : 404
                        }
                    } catch (d) {
                        i || o(-1, d)
                    }
                    p && o(s, c, p, l)
                }, n.async ? 4 === u.readyState ? setTimeout(r) : (a = ++Wn, $n && (Pn || (Pn = {}, b(e).unload($n)), Pn[a] = r), u.onreadystatechange = r) : r()
            }, abort: function () {
                r && r(t, !0)
            }}
        }
    });
    var Xn, Un, Vn = /^(?:toggle|show|hide)$/, Yn = RegExp("^(?:([+-])=|)(" + x + ")([a-z%]*)$", "i"), Jn = /queueHooks$/, Gn = [nr], Qn = {"*": [function (e, t) {
        var n, r, i = this.createTween(e, t), o = Yn.exec(t), a = i.cur(), s = +a || 0, u = 1, l = 20;
        if (o) {
            if (n = +o[2], r = o[3] || (b.cssNumber[e] ? "" : "px"), "px" !== r && s) {
                s = b.css(i.elem, e, !0) || n || 1;
                do u = u || ".5", s /= u, b.style(i.elem, e, s + r); while (u !== (u = i.cur() / a) && 1 !== u && --l)
            }
            i.unit = r, i.start = s, i.end = o[1] ? s + (o[1] + 1) * n : n
        }
        return i
    }]};

    function Kn() {
        return setTimeout(function () {
            Xn = t
        }), Xn = b.now()
    }

    function Zn(e, t) {
        b.each(t, function (t, n) {
            var r = (Qn[t] || []).concat(Qn["*"]), i = 0, o = r.length;
            for (; o > i; i++)if (r[i].call(e, t, n))return
        })
    }

    function er(e, t, n) {
        var r, i, o = 0, a = Gn.length, s = b.Deferred().always(function () {
            delete u.elem
        }), u = function () {
            if (i)return!1;
            var t = Xn || Kn(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length;
            for (; u > a; a++)l.tweens[a].run(o);
            return s.notifyWith(e, [l, o, n]), 1 > o && u ? n : (s.resolveWith(e, [l]), !1)
        }, l = s.promise({elem: e, props: b.extend({}, t), opts: b.extend(!0, {specialEasing: {}}, n), originalProperties: t, originalOptions: n, startTime: Xn || Kn(), duration: n.duration, tweens: [], createTween: function (t, n) {
            var r = b.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
            return l.tweens.push(r), r
        }, stop: function (t) {
            var n = 0, r = t ? l.tweens.length : 0;
            if (i)return this;
            for (i = !0; r > n; n++)l.tweens[n].run(1);
            return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]), this
        }}), c = l.props;
        for (tr(c, l.opts.specialEasing); a > o; o++)if (r = Gn[o].call(l, e, c, l.opts))return r;
        return Zn(l, c), b.isFunction(l.opts.start) && l.opts.start.call(e, l), b.fx.timer(b.extend(u, {elem: e, anim: l, queue: l.opts.queue})), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function tr(e, t) {
        var n, r, i, o, a;
        for (i in e)if (r = b.camelCase(i), o = t[r], n = e[i], b.isArray(n) && (o = n[1], n = e[i] = n[0]), i !== r && (e[r] = n, delete e[i]), a = b.cssHooks[r], a && "expand"in a) {
            n = a.expand(n), delete e[r];
            for (i in n)i in e || (e[i] = n[i], t[i] = o)
        } else t[r] = o
    }

    b.Animation = b.extend(er, {tweener: function (e, t) {
        b.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
        var n, r = 0, i = e.length;
        for (; i > r; r++)n = e[r], Qn[n] = Qn[n] || [], Qn[n].unshift(t)
    }, prefilter: function (e, t) {
        t ? Gn.unshift(e) : Gn.push(e)
    }});
    function nr(e, t, n) {
        var r, i, o, a, s, u, l, c, p, f = this, d = e.style, h = {}, g = [], m = e.nodeType && nn(e);
        n.queue || (c = b._queueHooks(e, "fx"), null == c.unqueued && (c.unqueued = 0, p = c.empty.fire, c.empty.fire = function () {
            c.unqueued || p()
        }), c.unqueued++, f.always(function () {
            f.always(function () {
                c.unqueued--, b.queue(e, "fx").length || c.empty.fire()
            })
        })), 1 === e.nodeType && ("height"in t || "width"in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === b.css(e, "display") && "none" === b.css(e, "float") && (b.support.inlineBlockNeedsLayout && "inline" !== un(e.nodeName) ? d.zoom = 1 : d.display = "inline-block")), n.overflow && (d.overflow = "hidden", b.support.shrinkWrapBlocks || f.always(function () {
            d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
        }));
        for (i in t)if (a = t[i], Vn.exec(a)) {
            if (delete t[i], u = u || "toggle" === a, a === (m ? "hide" : "show"))continue;
            g.push(i)
        }
        if (o = g.length) {
            s = b._data(e, "fxshow") || b._data(e, "fxshow", {}), "hidden"in s && (m = s.hidden), u && (s.hidden = !m), m ? b(e).show() : f.done(function () {
                b(e).hide()
            }), f.done(function () {
                var t;
                b._removeData(e, "fxshow");
                for (t in h)b.style(e, t, h[t])
            });
            for (i = 0; o > i; i++)r = g[i], l = f.createTween(r, m ? s[r] : 0), h[r] = s[r] || b.style(e, r), r in s || (s[r] = l.start, m && (l.end = l.start, l.start = "width" === r || "height" === r ? 1 : 0))
        }
    }

    function rr(e, t, n, r, i) {
        return new rr.prototype.init(e, t, n, r, i)
    }

    b.Tween = rr, rr.prototype = {constructor: rr, init: function (e, t, n, r, i, o) {
        this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (b.cssNumber[n] ? "" : "px")
    }, cur: function () {
        var e = rr.propHooks[this.prop];
        return e && e.get ? e.get(this) : rr.propHooks._default.get(this)
    }, run: function (e) {
        var t, n = rr.propHooks[this.prop];
        return this.pos = t = this.options.duration ? b.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : rr.propHooks._default.set(this), this
    }}, rr.prototype.init.prototype = rr.prototype, rr.propHooks = {_default: {get: function (e) {
        var t;
        return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = b.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
    }, set: function (e) {
        b.fx.step[e.prop] ? b.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[b.cssProps[e.prop]] || b.cssHooks[e.prop]) ? b.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
    }}}, rr.propHooks.scrollTop = rr.propHooks.scrollLeft = {set: function (e) {
        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }}, b.each(["toggle", "show", "hide"], function (e, t) {
        var n = b.fn[t];
        b.fn[t] = function (e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ir(t, !0), e, r, i)
        }
    }), b.fn.extend({fadeTo: function (e, t, n, r) {
        return this.filter(nn).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
    }, animate: function (e, t, n, r) {
        var i = b.isEmptyObject(e), o = b.speed(t, n, r), a = function () {
            var t = er(this, b.extend({}, e), o);
            a.finish = function () {
                t.stop(!0)
            }, (i || b._data(this, "finish")) && t.stop(!0)
        };
        return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
    }, stop: function (e, n, r) {
        var i = function (e) {
            var t = e.stop;
            delete e.stop, t(r)
        };
        return"string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () {
            var t = !0, n = null != e && e + "queueHooks", o = b.timers, a = b._data(this);
            if (n)a[n] && a[n].stop && i(a[n]); else for (n in a)a[n] && a[n].stop && Jn.test(n) && i(a[n]);
            for (n = o.length; n--;)o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1));
            (t || !r) && b.dequeue(this, e)
        })
    }, finish: function (e) {
        return e !== !1 && (e = e || "fx"), this.each(function () {
            var t, n = b._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = b.timers, a = r ? r.length : 0;
            for (n.finish = !0, b.queue(this, e, []), i && i.cur && i.cur.finish && i.cur.finish.call(this), t = o.length; t--;)o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
            for (t = 0; a > t; t++)r[t] && r[t].finish && r[t].finish.call(this);
            delete n.finish
        })
    }});
    function ir(e, t) {
        var n, r = {height: e}, i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t)n = Zt[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    b.each({slideDown: ir("show"), slideUp: ir("hide"), slideToggle: ir("toggle"), fadeIn: {opacity: "show"}, fadeOut: {opacity: "hide"}, fadeToggle: {opacity: "toggle"}}, function (e, t) {
        b.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), b.speed = function (e, t, n) {
        var r = e && "object" == typeof e ? b.extend({}, e) : {complete: n || !n && t || b.isFunction(e) && e, duration: e, easing: n && t || t && !b.isFunction(t) && t};
        return r.duration = b.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in b.fx.speeds ? b.fx.speeds[r.duration] : b.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
            b.isFunction(r.old) && r.old.call(this), r.queue && b.dequeue(this, r.queue)
        }, r
    }, b.easing = {linear: function (e) {
        return e
    }, swing: function (e) {
        return.5 - Math.cos(e * Math.PI) / 2
    }}, b.timers = [], b.fx = rr.prototype.init, b.fx.tick = function () {
        var e, n = b.timers, r = 0;
        for (Xn = b.now(); n.length > r; r++)e = n[r], e() || n[r] !== e || n.splice(r--, 1);
        n.length || b.fx.stop(), Xn = t
    }, b.fx.timer = function (e) {
        e() && b.timers.push(e) && b.fx.start()
    }, b.fx.interval = 13, b.fx.start = function () {
        Un || (Un = setInterval(b.fx.tick, b.fx.interval))
    }, b.fx.stop = function () {
        clearInterval(Un), Un = null
    }, b.fx.speeds = {slow: 600, fast: 200, _default: 400}, b.fx.step = {}, b.expr && b.expr.filters && (b.expr.filters.animated = function (e) {
        return b.grep(b.timers,function (t) {
            return e === t.elem
        }).length
    }), b.fn.offset = function (e) {
        if (arguments.length)return e === t ? this : this.each(function (t) {
            b.offset.setOffset(this, e, t)
        });
        var n, r, o = {top: 0, left: 0}, a = this[0], s = a && a.ownerDocument;
        if (s)return n = s.documentElement, b.contains(n, a) ? (typeof a.getBoundingClientRect !== i && (o = a.getBoundingClientRect()), r = or(s), {top: o.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0), left: o.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)}) : o
    }, b.offset = {setOffset: function (e, t, n) {
        var r = b.css(e, "position");
        "static" === r && (e.style.position = "relative");
        var i = b(e), o = i.offset(), a = b.css(e, "top"), s = b.css(e, "left"), u = ("absolute" === r || "fixed" === r) && b.inArray("auto", [a, s]) > -1, l = {}, c = {}, p, f;
        u ? (c = i.position(), p = c.top, f = c.left) : (p = parseFloat(a) || 0, f = parseFloat(s) || 0), b.isFunction(t) && (t = t.call(e, n, o)), null != t.top && (l.top = t.top - o.top + p), null != t.left && (l.left = t.left - o.left + f), "using"in t ? t.using.call(e, l) : i.css(l)
    }}, b.fn.extend({position: function () {
        if (this[0]) {
            var e, t, n = {top: 0, left: 0}, r = this[0];
            return"fixed" === b.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), b.nodeName(e[0], "html") || (n = e.offset()), n.top += b.css(e[0], "borderTopWidth", !0), n.left += b.css(e[0], "borderLeftWidth", !0)), {top: t.top - n.top - b.css(r, "marginTop", !0), left: t.left - n.left - b.css(r, "marginLeft", !0)}
        }
    }, offsetParent: function () {
        return this.map(function () {
            var e = this.offsetParent || o.documentElement;
            while (e && !b.nodeName(e, "html") && "static" === b.css(e, "position"))e = e.offsetParent;
            return e || o.documentElement
        })
    }}), b.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, n) {
        var r = /Y/.test(n);
        b.fn[e] = function (i) {
            return b.access(this, function (e, i, o) {
                var a = or(e);
                return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : (a ? a.scrollTo(r ? b(a).scrollLeft() : o, r ? o : b(a).scrollTop()) : e[i] = o, t)
            }, e, i, arguments.length, null)
        }
    });
    function or(e) {
        return b.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }

    b.each({Height: "height", Width: "width"}, function (e, n) {
        b.each({padding: "inner" + e, content: n, "": "outer" + e}, function (r, i) {
            b.fn[i] = function (i, o) {
                var a = arguments.length && (r || "boolean" != typeof i), s = r || (i === !0 || o === !0 ? "margin" : "border");
                return b.access(this, function (n, r, i) {
                    var o;
                    return b.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? b.css(n, r, s) : b.style(n, r, i, s)
                }, n, a ? i : t, a, null)
            }
        })
    }), e.jQuery = e.$ = b, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return b
    })
})(window);
var $j = jQuery.noConflict();
window.QZFL = window.QZONE = window.QZFL || window.QZONE || {};
QZFL.version = "2.1.1.7";
QZFL._qzfl = 2.116;
QZFL.emptyFn = function () {
};
QZFL.returnFn = function (v) {
    return v;
};
(function () {
    var ua = QZFL.userAgent = {}, agent = navigator.userAgent, nv = navigator.appVersion, r, m, optmz;
    ua.adjustBehaviors = QZFL.emptyFn;
    if (window.ActiveXObject) {
        ua.ie = 6;
        (window.XMLHttpRequest || (agent.indexOf('MSIE 7.0') > -1)) && (ua.ie = 7);
        (window.XDomainRequest || (agent.indexOf('Trident/4.0') > -1)) && (ua.ie = 8);
        (agent.indexOf('Trident/5.0') > -1) && (ua.ie = 9);
        (agent.indexOf('Trident/6.0') > -1) && (ua.ie = 10);
        ua.isBeta = navigator.appMinorVersion && navigator.appMinorVersion.toLowerCase().indexOf('beta') > -1;
        if (ua.ie < 7) {
            try {
                document.execCommand('BackgroundImageCache', false, true);
            }
            catch (ign) {
            }
        }
        QZFL._doc = document;
        optmz = function (st) {
            return function (fns, tm) {
                var aargs;
                if ('function' == typeof fns) {
                    aargs = Array.prototype.slice.call(arguments, 2);
                    return st(function () {
                        fns.apply(null, aargs);
                    }, tm);
                }
                else if ('string' == typeof fns) {
                    return st(fns, tm);
                }
            };
        };
        window.setTimeout = QZFL._setTimeout = optmz(QZFL.nativeSetTimeout = window.setTimeout);
        window.setInterval = QZFL._setInterval = optmz(QZFL.nativeSetInterval = window.setInterval);
    }
    else if (document.getBoxObjectFor || typeof(window.mozInnerScreenX) != 'undefined') {
        r = /(?:Firefox|GranParadiso|Iceweasel|Minefield).(\d+\.\d+)/i;
        ua.firefox = parseFloat((r.exec(agent) || r.exec('Firefox/3.3'))[1], 10);
    }
    else if (!navigator.taintEnabled) {
        m = /AppleWebKit.(\d+\.\d+)/i.exec(agent);
        ua.webkit = m ? parseFloat(m[1], 10) : (document.evaluate ? (document.querySelector ? 525 : 420) : 419);
        if ((m = /Chrome.(\d+\.\d+)/i.exec(agent)) || window.chrome) {
            ua.chrome = m ? parseFloat(m[1], 10) : '2.0';
        }
        else if ((m = /Version.(\d+\.\d+)/i.exec(agent)) || window.safariHandler) {
            ua.safari = m ? parseFloat(m[1], 10) : '3.3';
        }
        ua.air = agent.indexOf('AdobeAIR') > -1 ? 1 : 0;
        ua.isiPod = agent.indexOf('iPod') > -1;
        ua.isiPad = agent.indexOf('iPad') > -1;
        ua.isiPhone = agent.indexOf('iPhone') > -1;
    }
    else if (window.opera) {
        ua.opera = parseFloat(window.opera.version(), 10);
    }
    else if (/Trident\/\d+.+rv:(\d+\.\d+?)/i.test(agent)) {
        ua.ie = RegExp.$1;
    }
    else {
        ua.ie = 6;
    }
    if (!(ua.macs = agent.indexOf('Mac OS X') > -1)) {
        ua.windows = ((m = /Windows.+?(\d+\.\d+)/i.exec(agent)), m && parseFloat(m[1], 10));
        ua.linux = agent.indexOf('Linux') > -1;
        ua.android = agent.indexOf('Android') > -1;
    }
    ua.iOS = agent.indexOf('iPhone OS') > -1;
    !ua.iOS && (m = /OS (\d+(?:_\d+)*) like Mac OS X/i.exec(agent), ua.iOS = m && m[1] ? true : false);
})();
QZFL.object = {map: function (object, scope) {
    return QZFL.object.extend(scope || window, object);
}, extend: function () {
    var target = {};
    if (arguments.length == 1) {
        target = $j.extend(QZFL.object, arguments[0]);
    }
    else {
        target = $j.extend.apply(QZFL.object, arguments);
    }
    return target;
}, each: function (obj, callback) {
    return $j.each(obj, function (k, v) {
        if ($j.isFunction(callback)) {
            return callback.call(v, v, k, obj);
        }
        return false;
    });
}, getType: function (obj) {
    return $j.type(obj);
}, routeRE: /([\d\w_]+)/g, route: function (obj, path) {
    obj = obj || {};
    path = String(path);
    var r = QZFL.object.routeRE, m;
    r.lastIndex = 0;
    while ((m = r.exec(path)) !== null) {
        obj = obj[m[0]];
        if (obj === undefined || obj === null) {
            break;
        }
    }
    return obj;
}, bind: function (obj, fn) {
    var slice = Array.prototype.slice, args = slice.call(arguments, 2);
    return function () {
        obj = obj || this;
        fn = typeof fn == 'string' ? obj[fn] : fn;
        fn = typeof fn == 'function' ? fn : QZFL.emptyFn;
        return fn.apply(obj, args.concat(slice.call(arguments, 0)));
    };
}, ease: function (src, tar, rule) {
    if (tar) {
        if (typeof(rule) != 'function') {
            rule = QZFL.object._eachFn;
        }
        QZFL.object.each(src, function (v, k) {
            if (typeof(v) == 'function') {
                tar[rule(k)] = v;
            }
        });
    }
}, _easeFn: function (name) {
    return'$' + name;
}};
QZFL.namespace = QZFL.object;
QZFL.runTime = {isDebugMode: false, error: QZFL.emptyFn, warn: QZFL.emptyFn};
QZFL.console = window.console || {};
QZFL.console.log = QZFL.console.log || function () {
};
QZFL.console.print = QZFL.console.log;
QZFL.widget = {};
QZFL.object.map(QZFL.object, QZFL);
QZFL.config = QZFL.config || {};
(typeof QZFL.config.debugLevel == 'undefined') && (QZFL.config.debugLevel = 0);
(typeof QZFL.config.defaultDataCharacterSet == 'undefined') && (QZFL.config.defaultDataCharacterSet = "GB2312");
(typeof QZFL.config.DCCookieDomain == 'undefined') && (QZFL.config.DCCookieDomain = "qzone.qq.com");
(typeof QZFL.config.domainPrefix == 'undefined') && (QZFL.config.domainPrefix = "qq.com");
(typeof QZFL.config.domain == 'undefined') && (QZFL.config.domain = "qzs.qq.com");
(typeof QZFL.config.resourceDomain == 'undefined') && (QZFL.config.resourceDomain = "qzonestyle.gtimg.cn");
QZFL.config.gbEncoderPath = "http://" + QZFL.config.domain + "/qzone/v5/toolpages/";
QZFL.config.FSHelperPage = "http://" + QZFL.config.domain + "/qzone/v5/toolpages/fp_gbk.html";
QZFL.config.defaultShareObject = "http://" + QZFL.config.resourceDomain + "/qzone/v5/toolpages/getset.swf";
QZFL.config.staticServer = "http://" + QZFL.config.resourceDomain + "/ac/qzone/qzfl/lc/";
QZFL.css = {classFileNameCache: {}, convertHexColor: function (color) {
    color = String(color || '');
    color.charAt(0) == '#' && (color = color.substring(1));
    color.length == 3 && (color = color.replace(/([0-9a-f])/ig, '$1$1'));
    return color.length == 6 ? [parseInt(color.substr(0, 2), 16), parseInt(color.substr(2, 2), 16), parseInt(color.substr(4, 2), 16)] : [0, 0, 0];
}, rgb2hsl: function (r, g, b) {
    var t, red = Math.max(r / 255, 0), green = Math.max(g / 255, 0), blue = Math.max(b / 255, 0), max = Math.max(red, green, blue), min = Math.min(red, green, blue), result = {h: 0, s: 0, l: Math.max((max + min) / 2, 0)};
    if (max != min) {
        if (max == red) {
            result.h = (t = 60 * ((green - blue) / (max - min))) < 0 ? (t + 360) : t;
        }
        else if (max == green) {
            result.h = (60 * ((blue - red) / (max - min)) + 120);
        }
        else if (max == blue) {
            result.h = (60 * ((red - green) / (max - min)) + 240);
        }
        if (result.l <= 0.5) {
            result.s = (max - min) / (2 * result.l);
        }
        else if (0.5 < result.l) {
            result.s = (max - min) / (2 - 2 * result.l);
        }
        result.h = Math.round(result.h);
        result.s = Math.round(result.s * 100) / 100;
        result.l = Math.round(result.l * 100) / 100;
    }
    return result;
}, getStyleSheetById: function (id) {
    var s;
    return(s = QZFL.dom.get(id)) && s.sheet || (s = document.styleSheets) && s[id];
}, getRulesBySheet: function (sheetId) {
    var ss = typeof(sheetId) == "object" ? sheetId : QZFL.css.getStyleSheetById(sheetId), rs = {}, head, base;
    if (ss && !(rs = ss.cssRules || ss.rules)) {
        if (head = document.getElementsByTagName('head')[0]) {
            if (base = head.getElementsByTagName('base')[0]) {
                QZFL.dom.removeElement(base);
                rs = ss.cssRules;
                head.appendChild(base);
            }
        }
    }
    return rs;
}, getRuleBySelector: function (sheetId, selector) {
    selector = (String(selector)).toLowerCase();
    var _ss = QZFL.css.getStyleSheetById(sheetId), _rs = QZFL.css.getRulesBySheet(_ss);
    for (var i = 0, len = _rs.length; i < len; ++i) {
        if (selector == _rs[i].selectorText.toLowerCase()) {
            return _rs[i];
        }
    }
    return null;
}, insertCSSLink: function (url, opts) {
    var sid, doc, t, cssLink, head;
    if (QZFL.css.classFileNameCache[url]) {
        return;
    }
    if (typeof opts == "string") {
        sid = opts;
    }
    opts = (typeof opts == "object") ? opts : {};
    sid = opts.linkID || sid;
    doc = opts.doc || document;
    head = doc.getElementsByTagName("head")[0];
    cssLink = ((t = doc.getElementById(sid)) && (t.nodeName == "LINK")) ? t : null;
    if (!cssLink) {
        cssLink = doc.createElement("link");
        sid && (cssLink.id = sid);
        cssLink.rel = cssLink.rev = "stylesheet";
        cssLink.type = "text/css";
        cssLink.media = opts.media || "screen";
        head.appendChild(cssLink);
    }
    try {
        url && (cssLink.href = url);
    }
    catch (ign) {
    }
    QZFL.css.classFileNameCache[url] = true;
    return(QZFL.userAgent.ie < 9 && cssLink.sheet) || cssLink;
}, insertStyleSheet: function (sheetId, rules) {
    var node = document.createElement("style");
    node.type = 'text/css';
    sheetId && (node.id = sheetId);
    document.getElementsByTagName("head")[0].appendChild(node);
    if (rules) {
        if (node.styleSheet) {
            node.styleSheet.cssText = rules;
        }
        else {
            node.appendChild(document.createTextNode(rules));
        }
    }
    return node.sheet || node;
}, removeStyleSheet: function (id) {
    var _ss = QZFL.css.getStyleSheetById(id);
    _ss && QZFL.dom.removeElement(_ss.owningElement || _ss.ownerNode);
}, updateClassName: function (elem, removeNames, addNames) {
    return $j(QZFL.dom.get(elem)).removeClass(removeNames).addClass(addNames).attr("class");
}, hasClassName: function (elem, name) {
    return $j(QZFL.dom.get(elem)).hasClass(name);
}, addClassName: function (elem, names) {
    return $j(QZFL.dom.get(elem)).addClass(names).attr("class");
}, removeClassName: function (elem, names) {
    return $j(QZFL.dom.get(elem)).removeClass(names).attr("class");
}, replaceClassName: function (elems, a, b) {
    QZFL.css.swapClassName(elems, a, b, true);
}, swapClassName: function (elems, a, b, _isRep) {
    if (elems && typeof(elems) == "object") {
        if (elems.length === undefined) {
            elems = [elems];
        }
        for (var elem, i = 0, l = elems.length; i < l; ++i) {
            if ((elem = elems[i]) && elem.nodeType == 1) {
                if (QZFL.css.hasClassName(elem, a)) {
                    QZFL.css.updateClassName(elem, a, b);
                }
                else if (!_isRep && QZFL.css.hasClassName(elem, b)) {
                    QZFL.css.updateClassName(elem, b, a);
                }
            }
        }
    }
}, toggleClassName: function (elem, name) {
    $j(QZFL.dom.get(elem)).toggleClass(name);
}};
QZFL.dom = {getById: function (id) {
    return document.getElementById(id);
}, getByName: function (name, tagName, rt) {
    return QZFL.selector((tagName || "") + '[name="' + name + '"]', rt);
}, get: function (e) {
    return(typeof(e) == "string") ? document.getElementById(e) : e;
}, removeElement: function (elem) {
    $j(QZFL.dom.get(elem)).remove();
}, searchChain: function (elem, prop, func) {
    prop = prop || 'parentNode';
    while (elem && elem.nodeType && elem.nodeType == 1) {
        if (!func || func.call(elem, elem)) {
            return elem;
        }
        elem = elem[prop];
    }
    return null;
}, getElementsByClassName: function (className, tagName, context) {
    return QZFL.selector((tagName || '') + '.' + className, QZFL.dom.get(context));
}, isAncestor: function (a, b) {
    return a && b && a != b && QZFL.dom.contains(a, b);
}, getAncestorBy: function (elem, method) {
    elem = QZFL.dom.get(elem);
    return QZFL.dom.searchChain(elem.parentNode, 'parentNode', function (el) {
        return el.nodeType == 1 && (!method || method(el));
    });
}, getFirstChild: function (elem) {
    return $j(QZFL.dom.get(elem)).children().first().get(0);
}, getLastChild: function (elem) {
    return $j(QZFL.dom.get(elem)).children().last().get(0);
}, getNextSibling: function (elem) {
    return $j(QZFL.dom.get(elem)).next().get(0);
}, getPreviousSibling: function (elem) {
    return $j(QZFL.dom.get(elem)).prev().get(0);
}, swapNode: function (node1, node2) {
    if (node1.swapNode) {
        node1.swapNode(node2);
    }
    else {
        var prt = node2.parentNode, next = node2.nextSibling;
        if (next == node1) {
            prt.insertBefore(node1, node2);
        }
        else if (node2 == node1.nextSibling) {
            prt.insertBefore(node2, node1);
        }
        else {
            node1.parentNode.replaceChild(node2, node1);
            prt.insertBefore(node1, next);
        }
    }
}, createElementIn: function (tagName, elem, insertFirst, attrs) {
    var _e = (elem = QZFL.dom.get(elem) || document.body).ownerDocument.createElement(tagName || "div"), k;
    if (typeof(attrs) == 'object') {
        for (k in attrs) {
            if (k == "class") {
                _e.className = attrs[k];
            }
            else if (k == "style") {
                _e.style.cssText = attrs[k];
            }
            else {
                _e[k] = attrs[k];
            }
        }
    }
    insertFirst ? elem.insertBefore(_e, elem.firstChild) : elem.appendChild(_e);
    return _e;
}, getStyle: function (el, property) {
    return $j(QZFL.dom.get(el)).css(property);
}, setStyle: function (el, properties, value) {
    $j(QZFL.dom.get(el)).css(properties, value);
    return true;
}, createNamedElement: function (type, name, doc) {
    var _doc = doc || document, element;
    try {
        element = _doc.createElement('<' + type + ' name="' + name + '">');
    }
    catch (ign) {
    }
    if (!element) {
        element = _doc.createElement(type);
    }
    if (!element.name) {
        element.name = name;
    }
    return element;
}, getRect: function (elem) {
    if (elem = QZFL.dom.get(elem)) {
        var box = QZFL.object.extend({}, elem.getBoundingClientRect());
        if (typeof box.width == 'undefined') {
            box.width = box.right - box.left;
            box.height = box.bottom - box.top;
        }
        return box;
    }
}, getPosition: function (elem) {
    var box, s, doc;
    if (box = QZFL.dom.getRect(elem)) {
        if (s = QZFL.dom.getScrollLeft(doc = elem.ownerDocument)) {
            box.left += s, box.right += s;
        }
        if (s = QZFL.dom.getScrollTop(doc)) {
            box.top += s, box.bottom += s;
        }
        return box;
    }
}, setPosition: function (el, pos) {
    QZFL.dom.setXY(el, pos['left'], pos['top']);
    QZFL.dom.setSize(el, pos['width'], pos['height']);
}, getXY: function (elem) {
    var box = QZFL.dom.getPosition(elem) || {left: 0, top: 0};
    return[box.left, box.top];
}, getSize: function (elem) {
    var box = QZFL.dom.getPosition(elem) || {width: -1, height: -1};
    return[box.width, box.height];
}, setXY: function (elem, x, y) {
    var _ml = parseInt(QZFL.dom.getStyle(elem, "marginLeft")) || 0, _mt = parseInt(QZFL.dom.getStyle(elem, "marginTop")) || 0;
    QZFL.dom.setStyle(elem, {left: ((parseInt(x, 10) || 0) - _ml) + "px", top: ((parseInt(y, 10) || 0) - _mt) + "px"});
}, getScrollLeft: function (doc) {
    var _doc = doc || document;
    return(_doc.defaultView && _doc.defaultView.pageXOffset) || Math.max(_doc.documentElement.scrollLeft, _doc.body.scrollLeft);
}, getScrollTop: function (doc) {
    var _doc = doc || document;
    return(_doc.defaultView && _doc.defaultView.pageYOffset) || Math.max(_doc.documentElement.scrollTop, _doc.body.scrollTop);
}, getScrollHeight: function (doc) {
    var _doc = doc || document;
    return Math.max(_doc.documentElement.scrollHeight, _doc.body.scrollHeight);
}, getScrollWidth: function (doc) {
    var _doc = doc || document;
    return Math.max(_doc.documentElement.scrollWidth, _doc.body.scrollWidth);
}, setScrollLeft: function (value, doc) {
    var _doc = doc || document;
    _doc[_doc.compatMode == "CSS1Compat" && !QZFL.userAgent.webkit ? "documentElement" : "body"].scrollLeft = value;
}, setScrollTop: function (value, doc) {
    var _doc = doc || document;
    _doc[_doc.compatMode == "CSS1Compat" && !QZFL.userAgent.webkit ? "documentElement" : "body"].scrollTop = value;
}, getClientHeight: function (doc) {
    var _doc = doc || document;
    return _doc.compatMode == "CSS1Compat" ? _doc.documentElement.clientHeight : _doc.body.clientHeight;
}, getClientWidth: function (doc) {
    var _doc = doc || document;
    return _doc.compatMode == "CSS1Compat" ? _doc.documentElement.clientWidth : _doc.body.clientWidth;
}, _SET_SIZE_RE: /^\d+(?:\.\d*)?(px|%|em|in|cm|mm|pc|pt)?$/, setSize: function (el, w, h) {
    el = QZFL.dom.get(el);
    var _r = QZFL.dom._SET_SIZE_RE, m;
    QZFL.dom.setStyle(el, "width", (m = _r.exec(w)) ? (m[1] ? w : (parseInt(w, 10) + 'px')) : 'auto');
    QZFL.dom.setStyle(el, "height", (m = _r.exec(h)) ? (m[1] ? h : (parseInt(h, 10) + 'px')) : 'auto');
}, getDocumentWindow: function (doc) {
    var _doc = doc || document;
    return _doc.parentWindow || _doc.defaultView;
}, getElementsByTagNameNS: function (node, ns, tgn) {
    node = node || document;
    var res = [];
    if (node.getElementsByTagNameNS) {
        return node.getElementsByTagName(ns + ":" + tgn);
    }
    else if (node.getElementsByTagName) {
        var n = document.namespaces;
        if (n.length > 0) {
            var l = node.getElementsByTagName(tgn);
            for (var i = 0, len = l.length; i < len; ++i) {
                if (l[i].scopeName == ns) {
                    res.push(l[i]);
                }
            }
        }
    }
    return res;
}, getElementByTagNameBubble: function (elem, tn) {
    if (!tn) {
        return null;
    }
    var maxLv = 15;
    tn = String(tn).toUpperCase();
    if (tn == 'BODY') {
        return document.body;
    }
    elem = QZFL.dom.searchChain(elem = QZFL.dom.get(elem), 'parentNode', function (el) {
        return el.tagName == tn || el.tagName == 'BODY' || (--maxLv) < 0;
    });
    return!elem || maxLv < 0 ? null : elem;
}, insertAdjacent: function (elem, where, html, isText) {
    var range, pos = ['beforeBegin', 'afterBegin', 'beforeEnd', 'afterEnd'], doc;
    if (QZFL.lang.isElement(elem) && pos[where] && (QZFL.lang.isString(html) || QZFL.lang.isElement(html))) {
        if (elem.insertAdjacentHTML) {
            elem['insertAdjacent' + (typeof(html) == 'object' ? 'Element' : (isText ? 'Text' : 'HTML'))](pos[where], html);
        }
        else {
            range = (doc = elem.ownerDocument).createRange();
            range[where == 1 || where == 2 ? 'selectNodeContents' : 'selectNode'](elem);
            range.collapse(where < 2);
            range.insertNode(typeof(html) != 'string' ? html : isText ? doc.createTextNode(html) : range.createContextualFragment(html));
        }
        return true;
    }
    return false;
}};
QZFL.event = {KEYS: {BACKSPACE: 8, TAB: 9, RETURN: 13, ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46}, addEvent: function (obj, eventType, fn, argArray) {
    $j.event.add(obj, eventType, function (evt) {
        var args = [evt];
        if ($j.isArray(evt.data)) {
            args = args.concat(evt.data);
        }
        $j.isFunction(fn) ? fn.apply(obj, args) : null;
    }, argArray);
    return true;
}, purgeEvent: function (obj, type) {
    $j.event.remove(obj, type)
    return true;
}, getEvent: function (evt) {
    var evt = window.event || evt || null, c, _s = QZFL.event.getEvent, ct = 0;
    if (!evt) {
        c = arguments.callee;
        while (c && ct < _s.MAX_LEVEL) {
            if ((evt = c.arguments[0]) && (typeof(evt.button) != "undefined" && typeof(evt.ctrlKey) != "undefined")) {
                break;
            }
            ++ct;
            c = c.caller;
        }
    }
    return evt;
}, getButton: function (evt) {
    var e = QZFL.event.getEvent(evt);
    if (!e) {
        return-1
    }
    if (QZFL.userAgent.ie) {
        return e.button - Math.ceil(e.button / 2);
    }
    else {
        return e.button;
    }
}, getTarget: function (evt) {
    var e = QZFL.event.getEvent(evt);
    if (e) {
        return e.srcElement || e.target;
    }
    else {
        return null;
    }
}, getCurrentTarget: function (evt) {
    var e = QZFL.event.getEvent(evt);
    if (e) {
        return e.currentTarget || document.activeElement;
    }
    else {
        return null;
    }
}, cancelBubble: function (evt) {
    evt = QZFL.event.getEvent(evt);
    if (!evt) {
        return false
    }
    if (evt.stopPropagation) {
        evt.stopPropagation();
    }
    else {
        if (!evt.cancelBubble) {
            evt.cancelBubble = true;
        }
    }
}, preventDefault: function (evt) {
    evt = QZFL.event.getEvent(evt);
    if (!evt) {
        return false
    }
    if (evt.preventDefault) {
        evt.preventDefault();
    }
    else {
        evt.returnValue = false;
    }
}, mouseX: function (evt) {
    evt = QZFL.event.getEvent(evt);
    return evt.pageX || (evt.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
}, mouseY: function (evt) {
    evt = QZFL.event.getEvent(evt);
    return evt.pageY || (evt.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
}, getRelatedTarget: function (ev) {
    ev = QZFL.event.getEvent(ev);
    var t = ev.relatedTarget;
    if (!t) {
        if (ev.type == "mouseout") {
            t = ev.toElement;
        }
        else if (ev.type == "mouseover") {
            t = ev.fromElement;
        }
        else {
        }
    }
    return t;
}, onDomReady: function (fn) {
    $j(fn);
}};
QZFL.event.on = QZFL.event.addEvent;
QZFL.event.bind = QZFL.object.bind;
QZFL.event.getEvent.MAX_LEVEL = 10;
QZFL.lang = {isString: function (o) {
    return QZFL.object.getType(o) == "string";
}, isArray: function (o) {
    return QZFL.object.getType(o) == "array";
}, isFunction: function (o) {
    return QZFL.object.getType(o) == "function";
}, isHashMap: function (o) {
    return QZFL.object.getType(o) == "object";
}, isNode: function (o) {
    return o && (typeof(o.nodeName) != 'undefined' || typeof(o.nodeType) != 'undefined');
}, isElement: function (o) {
    return o && o.nodeType == 1;
}};
QZFL.string = {RegExps: {trim: /^\s+|\s+$/g, ltrim: /^\s+/, rtrim: /\s+$/, nl2br: /\n/g, s2nb: /[\x20]{2}/g, URIencode: /[\x09\x0A\x0D\x20\x21-\x29\x2B\x2C\x2F\x3A-\x3F\x5B-\x5E\x60\x7B-\x7E]/g, escHTML: {re_amp: /&/g, re_lt: /</g, re_gt: />/g, re_apos: /\x27/g, re_quot: /\x22/g}, escString: {bsls: /\\/g, sls: /\//g, nl: /\n/g, rt: /\r/g, tab: /\t/g}, restXHTML: {re_amp: /&amp;/g, re_lt: /&lt;/g, re_gt: /&gt;/g, re_apos: /&(?:apos|#0?39);/g, re_quot: /&quot;/g}, write: /\{(\d{1,2})(?:\:([xodQqb]))?\}/g, isURL: /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i, cut: /[\x00-\xFF]/, getRealLen: {r0: /[^\x00-\xFF]/g, r1: /[\x00-\xFF]/g}, format: /\{([\d\w\.]+)\}/g}, commonReplace: function (s, p, r) {
    return s.replace(p, r);
}, listReplace: function (s, l) {
    if (QZFL.lang.isHashMap(l)) {
        for (var i in l) {
            s = QZFL.string.commonReplace(s, l[i], i);
        }
        return s;
    }
    else {
        return s + '';
    }
}, trim: function (str) {
    return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.trim, '');
}, ltrim: function (str) {
    return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.ltrim, '');
}, rtrim: function (str) {
    return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.rtrim, '');
}, nl2br: function (str) {
    return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.nl2br, '<br />');
}, s2nb: function (str) {
    return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.s2nb, '&nbsp;&nbsp;');
}, URIencode: function (str) {
    var cc, ccc;
    return(str + "").replace(QZFL.string.RegExps.URIencode, function (a) {
        if (a == "\x20") {
            return"+";
        }
        else if (a == "\x0D") {
            return"";
        }
        cc = a.charCodeAt(0);
        ccc = cc.toString(16);
        return"%" + ((cc < 16) ? ("0" + ccc) : ccc);
    });
}, escHTML: function (str) {
    var t = QZFL.string.RegExps.escHTML;
    return QZFL.string.listReplace((str + ""), {'&amp;': t.re_amp, '&lt;': t.re_lt, '&gt;': t.re_gt, '&#039;': t.re_apos, '&quot;': t.re_quot});
}, escString: function (str) {
    var t = QZFL.string.RegExps.escString, h = QZFL.string.RegExps.escHTML;
    return QZFL.string.listReplace((str + ""), {'\\\\': t.bsls, '\\n': t.nl, '': t.rt, '\\t': t.tab, '\\/': t.sls, '\\\'': h.re_apos, '\\"': h.re_quot});
}, restXHTML: function (str) {
    var t = QZFL.string.RegExps.restXHTML;
    return QZFL.string.listReplace((str + ""), {'<': t.re_lt, '>': t.re_gt, '\x27': t.re_apos, '\x22': t.re_quot, '&': t.re_amp});
}, write: function (strFormat, someArgs) {
    if (arguments.length < 1 || !QZFL.lang.isString(strFormat)) {
        return'';
    }
    var rArr = QZFL.lang.arg2arr(arguments), result = rArr.shift(), tmp;
    return result.replace(QZFL.string.RegExps.write, function (a, b, c) {
        b = parseInt(b, 10);
        if (b < 0 || (typeof rArr[b] == 'undefined')) {
            return'(n/a)';
        }
        else {
            if (!c) {
                return rArr[b];
            }
            else {
                switch (c) {
                    case'x':
                        return'0x' + rArr[b].toString(16);
                    case'o':
                        return'o' + rArr[b].toString(8);
                    case'd':
                        return rArr[b].toString(10);
                    case'Q':
                        return'\x22' + rArr[b].toString(16) + '\x22';
                    case'q':
                        return'`' + rArr[b].toString(16) + '\x27';
                    case'b':
                        return'<' + !!rArr[b] + '>';
                }
            }
        }
    });
}, isURL: function (s) {
    return QZFL.string.RegExps.isURL.test(s);
}, escapeURI: function (s) {
    if (window.encodeURIComponent) {
        return encodeURIComponent(s);
    }
    if (window.escape) {
        return escape(s);
    }
    return'';
}, fillLength: function (source, l, ch, isRight) {
    if ((source = String(source)).length < l) {
        var ar = new Array(l - source.length);
        ar[isRight ? 'unshift' : 'push'](source);
        source = ar.join(ch || '0');
    }
    return source;
}, cut: function (str, bitLen, tails) {
    str = String(str);
    bitLen -= 0;
    tails = tails || '';
    if (isNaN(bitLen)) {
        return str;
    }
    var len = str.length, i = Math.min(Math.floor(bitLen / 2), len), cnt = QZFL.string.getRealLen(str.slice(0, i));
    for (; i < len && cnt < bitLen; i++) {
        cnt += 1 + (str.charCodeAt(i) > 255);
    }
    return str.slice(0, cnt > bitLen ? i - 1 : i) + (i < len ? tails : '');
}, getRealLen: function (s, isUTF8) {
    if (typeof(s) != 'string') {
        return 0;
    }
    if (!isUTF8) {
        return s.replace(QZFL.string.RegExps.getRealLen.r0, "**").length;
    }
    else {
        var cc = s.replace(QZFL.string.RegExps.getRealLen.r1, "");
        return(s.length - cc.length) + (encodeURI(cc).length / 3);
    }
}, format: function (str) {
    var args = Array.prototype.slice.call(arguments), v;
    str = String(args.shift());
    if (args.length == 1 && typeof(args[0]) == 'object') {
        args = args[0];
    }
    QZFL.string.RegExps.format.lastIndex = 0;
    return str.replace(QZFL.string.RegExps.format, function (m, n) {
        v = QZFL.object.route(args, n);
        return v === undefined ? m : v;
    });
}};
QZFL.string.restHTML = QZFL.string.restXHTML;
QZFL.util = {buildUri: function (s) {
    return new QZFL.util.URI(s);
}, URI: function (s) {
    if (!(QZFL.object.getType(s) == "string")) {
        return null;
    }
    if (s.indexOf("://") < 1) {
        s = location.protocol + "//" + location.host + (s.indexOf("/") == 0 ? "" : location.pathname.substr(0, location.pathname.lastIndexOf("/") + 1)) + s;
    }
    var depart = s.split("://");
    if (QZFL.object.getType(depart) == "array" && depart.length > 1 && (/^[a-zA-Z]+$/).test(depart[0])) {
        this.protocol = depart[0].toLowerCase();
        var h = depart[1].split("/");
        if (QZFL.object.getType(h) == "array") {
            this.host = h[0];
            this.pathname = "/" + h.slice(1).join("/").replace(/(\?|\#).+/i, "");
            this.href = s;
            var se = depart[1].lastIndexOf("?"), ha = depart[1].lastIndexOf("#");
            this.search = (se >= 0) ? depart[1].substring(se) : "";
            this.hash = (ha >= 0) ? depart[1].substring(ha) : "";
            if (this.search.length > 0 && this.hash.length > 0) {
                if (ha < se) {
                    this.search = "";
                }
                else {
                    this.search = depart[1].substring(se, ha);
                }
            }
            return this;
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
}};
QZFL.string = QZONE.string || {};
QZFL.string.parseXML = $j.parseXML;
QZFL.string.timeFormatString = function (date, ptn, baseTime) {
    try {
        date = date.getTime ? date : (new Date(date));
    }
    catch (ign) {
        return'';
    }
    var me = QZFL.string.timeFormatString, map = me._map, unt = me._units, rel = false, t, delta, v;
    if (!ptn) {
        baseTime = baseTime || new Date();
        delta = Math.abs(date - baseTime);
        for (var i = 0, len = unt.length; i < len; ++i) {
            t = map[unt[i]];
            if (delta > t[1]) {
                return Math.floor(delta / t[1]) + t[2];
            }
        }
        return"刚刚";
    }
    else {
        return ptn.replace(me._re, function (a, b, c) {
            (rel = b.charAt(0) == '_') && (b = b.charAt(1));
            if (!map[b]) {
                return a;
            }
            if (!rel) {
                v = date[map[b][0]]();
                b == 'y' && (v %= 100);
                b == 'M' && v++;
                return v < 10 ? QZFL.string.fillLength(v, 2, c) : v.toString();
            }
            else {
                return Math.floor(Math.abs(date - baseTime) / map[b][1]);
            }
        });
    }
};
QZFL.string.timeFormatString._re = /\{([_yYMdhms]{1,2})(?:\:([\d\w\s]))?\}/g;
QZFL.string.timeFormatString._map = {y: ['getYear', 31104000000], Y: ['getFullYear', 31104000000, '\u5E74\u524D'], M: ['getMonth', 2592000000, '\u4E2A\u6708\u524D'], d: ['getDate', 86400000, '\u5929\u524D'], h: ['getHours', 3600000, '\u5C0F\u65F6\u524D'], m: ['getMinutes', 60000, '\u5206\u949F\u524D'], s: ['getSeconds', 1000, '\u79D2\u524D']};
QZFL.string.timeFormatString._units = ['Y', 'M', 'd', 'h', 'm', 's'];
QZFL.lang.isValidXMLdom = function (o) {
    return!!(o && o.xml && /^<\?xml/.test(o.xml));
};
QZFL.lang.arg2arr = function (refArgs, start) {
    return Array.prototype.slice.call(refArgs, (start || 0));
};
QZFL.lang.getObjByNameSpace = function (ns, setup) {
    if (typeof(ns) != 'string') {
        return ns;
    }
    var l = ns.split("."), r = window;
    try {
        for (var i = 0, len = l.length; i < len; ++i) {
            if (typeof(r[l[i]]) == 'undefined') {
                if (setup) {
                    r[l[i]] = {};
                }
                else {
                    return;
                }
            }
            r = r[l[i]];
        }
        return r;
    }
    catch (ignore) {
        return;
    }
};
QZFL.lang.objectClone = function (obj, preventName) {
    if ((typeof obj) == 'object') {
        var res = (QZFL.lang.isArray(obj)) ? [] : {};
        for (var i in obj) {
            if (i != preventName)
                res[i] = QZFL.lang.objectClone(obj[i], preventName);
        }
        return res;
    }
    else if ((typeof obj) == 'function') {
        return Object;
    }
    return obj;
};
QZFL.lang.obj2str = function (obj) {
    var t, sw;
    if (typeof(obj) == 'object') {
        if (obj === null) {
            return'null';
        }
        if (window.JSON && window.JSON.stringify) {
            return JSON.stringify(obj);
        }
        sw = QZFL.lang.isArray(obj);
        t = [];
        for (var i in obj) {
            t.push((sw ? "" : ("\"" + QZFL.string.escString(i) + "\":")) + obj2str(obj[i]));
        }
        t = t.join();
        return sw ? ("[" + t + "]") : ("{" + t + "}");
    }
    else if (typeof(obj) == 'undefined') {
        return'undefined';
    }
    else if (typeof(obj) == 'number' || typeof(obj) == 'function') {
        return obj.toString();
    }
    return!obj ? "\"\"" : ("\"" + QZFL.string.escString(obj) + "\"");
};
QZFL.lang.propertieCopy = function (s, b, propertiSet, notOverWrite) {
    var l = (!propertiSet || typeof(propertiSet) != 'object') ? b : propertiSet;
    s = s || {};
    for (var p in l) {
        if (!notOverWrite || !(p in s)) {
            s[p] = l[p];
        }
    }
    return s;
};
QZFL.lang.tryThese = function () {
    for (var i = 0, len = arguments.length; i < len; ++i) {
        try {
            return arguments[i]();
        }
        catch (ign) {
        }
    }
    return;
};
QZFL.cookie = {set: function (name, value, domain, path, hour) {
    if (hour) {
        var expire = new Date();
        expire.setTime(expire.getTime() + 3600000 * hour);
    }
    document.cookie = name + "=" + value + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + QZFL.config.domainPrefix + ";"));
    return true;
}, get: function (name) {
    var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"), m = document.cookie.match(r);
    return(!m ? "" : m[1]);
}, del: function (name, domain, path) {
    document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + QZFL.config.domainPrefix + ";"));
}};
$j.extend({time33: function (skey) {
    for (var i = 0, len = skey.length, hash = 5381; i < len; ++i) {
        hash += (hash << 5) + skey.charAt(i).charCodeAt();
    }
    ;
    return hash & 0x7fffffff;
}, getJsonp: function (url, data, cachetime, callback) {
    if ($j.isFunction(cachetime)) {
        callback = cachetime;
    }
    return $j.get(url, data, callback, "jsonp");
}, getJson: function (url, data, cachetime, callback) {
    if ($j.isFunction(cachetime)) {
        callback = cachetime;
    }
    return $j.get(url, data, callback, "json");
}, getToken: function () {
    var skey = Live.login.getSkey(), token = !!skey ? $j.time33(skey) : "";
    return token;
}, ajaxQueue: function (queConf) {
    queConf = queConf || {};
    var df, urlInfo = queConf.urls, success = queConf.success || QZFL.emptyFn, error = queConf.error || QZFL.emptyFn, complete = queConf.complete || QZFL.emptyFn, beforeSend = queConf.beforeSend || QZFL.emptyFn, ajaxArr = [];
    urlInfo = QZFL.object.getType(urlInfo) == "array" ? urlInfo : [urlInfo];
    beforeSend();
    $j.each(urlInfo, function (k, v) {
        ajaxArr.push($j.ajax(v));
    });
    df = $j.when.apply(null, ajaxArr).always(complete).done(success).fail(error).promise();
    df.success = df.done;
    df.error = df.fail;
    df.complete = df.always;
    return df;
}, ajaxSetup: (function () {
    var fn = $j.ajaxSetup;
    return function (target, settings) {
        target = fn(target, settings);
        if (target.CSRF) {
            target.data = target.data || {};
            target.data.g_tk = $j.getToken();
        }
        if (target.charset) {
            target.scriptCharset = target.charset;
        }
        if (target.low_login) {
            target.data = target.data || {};
            target.data.low_login = 1;
        }
        if (target.dataType == "script" && target.cache !== false) {
            target.cache = true;
        }
        return target;
    }
})()});
$j.ajaxSetup({timeout: 5000, charset: "utf-8"});
$j.extend({sub: function () {
    var jQuery = $j;

    function jQuerySub(selector, context) {
        return new jQuerySub.fn.init(selector, context);
    }

    $j.extend(true, jQuerySub, this);
    jQuerySub.superclass = this;
    jQuerySub.fn = jQuerySub.prototype = this();
    jQuerySub.fn.constructor = jQuerySub;
    jQuerySub.sub = this.sub;
    jQuerySub.fn.init = function init(selector, context) {
        if (context && context instanceof jQuery && !(context instanceof jQuerySub)) {
            context = jQuerySub(context);
        }
        var that = $j.fn.init.call(this, selector, context, rootjQuerySub);
        this.makeElementsArray(that);
        return that;
    };
    jQuerySub.fn.makeElementsArray = function (jqObj) {
        jqObj.elements = [].slice.call(jqObj, 0);
    };
    jQuerySub.fn.init.prototype = jQuerySub.fn;
    var rootjQuerySub = jQuerySub(document);
    return jQuerySub;
}});
QZFL.object.map(QZFL.lang || {});
var ua = window.ua || QZFL.userAgent, $e = $j.sub(), $ = QZFL.dom.get, getElementById = QZFL.dom.get, removeNode = QZFL.dom.removeElement, addEvent = QZFL.event.addEvent, removeEvent = QZFL.event.removeEvent, getEvent = QZFL.event.getEvent;
QZFL.ElementHandler = $e;
QZFL.selector = $j.find;
QZFL.dom.contains = QZFL.selector.contains;
$e.extend($e.fn, {get: function (idx) {
    return $j.fn.eq.call(this, idx);
}, eq: function (idx) {
    return $j.fn.get.call(this, idx);
}, onMouseEnter: function (fn) {
    return this.mouseenter(fn);
}, onMouseLeave: function (fn) {
    return this.mouseleave(fn);
}, delegate: function (selector, evtType, fn) {
    if (!selector) {
        return this;
    }
    return this.on(evtType, selector, fn);
}, pushStack: (function (fn) {
    return function () {
        var ret = fn.apply(this, arguments);
        this.makeElementsArray(ret);
        return ret;
    }
})($e.fn.pushStack), each: function (fn) {
    var els = this.elements;
    return $j.fn.each.call(this, function () {
        if ($j.isFunction(fn)) {
            fn.call(this, arguments[1], arguments[0], els);
        }
    });
}, create: function (tags, attr) {
    var _arr = [];
    this.each(function (el) {
        _arr.push(QZFL.dom.createElementIn(tags, el, false, attr));
    });
    return $e(_arr);
}, getSize: function (idx) {
    var arr = [], $el;
    idx = idx || 0;
    $el = this.get(idx);
    if ($el.size() == 1) {
        arr = [$el.width(), $el.height()];
    }
    return arr;
}, setSize: function (width, height) {
    return this.each(function (el) {
        QZFL.dom.setSize(el, width, height);
    })
}, setXY: function (X, Y) {
    return this.each(function (el) {
        QZFL.dom.setXY(el, X, Y);
    })
}, getXY: function (index) {
    var _e = this.eq(index || 0);
    return!!_e ? QZFL.dom.getXY(_e) : null;
}, getVal: function (idx) {
    idx = idx || 0;
    return this.get(idx).val();
}, setVal: function (val) {
    return this.val(val);
}, setHtml: function (str, idx) {
    idx = idx || 0;
    return this.html(str);
}, getHtml: function (idx) {
    idx = idx || 0;
    return this.get(idx).html();
}, setAttr: function (k, v) {
    return this.attr(k, v);
}, getAttr: function (k) {
    return this.attr(k);
}, setStyle: function (p, v) {
    return this.css(p, v);
}, getStyle: function (p) {
    return this.css(p);
}, unBind: function (evtType, fn) {
    return this.unbind(evtType, fn);
}, load: (function (fn) {
    return function (url, data) {
        var $el = this, args = arguments, cb = function (ret) {
            var fun = args[args.length - 1];
            if ($j.isFunction(fun)) {
                fun($el, ret);
            }
        }
        if (args.length == 2) {
            return fn.call($el, url, cb);
        }
        return fn.call($el, url, data, cb);
    }
})($e.fn.load)});
$j.each(["Prev", "Parent", "Children", "Next"], function (idx, val) {
    $e.fn["get" + val] = $e.fn[val.toLowerCase()];
});
$j.each(['Click', 'MouseDown', 'MouseUp', 'MouseOver', 'MouseMove', 'MouseOut', 'Focus', 'Blur', 'KeyDown', 'KeyPress', 'KeyUp', 'Hover'], function (idx, val) {
    $e.fn["on" + val] = $e.fn[val.toLowerCase()];
});
var Live = QZFL;
Live.Callback = function (flags) {
    $j.extend(this, $j.Callbacks(flags));
}
Live.Deferred = function (fn) {
    $j.extend(this, $j.Deferred(fn));
}
Live.Deferred.prototype = {isFired: function () {
    return this.state() != "pending";
}, isResolved: function () {
    return this.state() == "resolved";
}, isRejected: function () {
    return this.state() == "rejected";
}}
Live.Deferred.when = $j.when;
QZFL.Storage = {helperUrl: "http://v.qq.com/storage_helper.html", ifrCallback: null, instance: null, getInstance: function () {
    var _ins = this["instance"];
    if (_ins) {
        return _ins;
    }
    return null;
}};
QZFL.Storage.create = function (cb, opt) {
    if (typeof cb != "function") {
        return;
    }
    opt = opt || {};
    var db = null, dbname = opt.dbname || "qzone_database", defaultDomain = opt.domain || document.domain, helperUrl = opt.helper || QZFL.Storage.helperUrl, share = opt.share || false, _clientStore = ["globalStorage", "localStorage", "userData"];
    var _cs = QZFL.Storage;
    var createHelper = function (th, type) {
        var i = document.createElement("iframe");
        i.id = "userData_iframe_" + dbname;
        i.style.display = "none";
        QZFL.Storage.ifrCallback = function () {
            db = i.contentWindow.create(dbname, type);
            if (db) {
                cb(th);
            }
            else {
                cb(false);
            }
        };
        i.src = helperUrl;
        document.body.appendChild(i);
    };
    var getExpireDate = function (days) {
        var d = new Date();
        days = days || 365 * 3;
        d.setDate(d.getDate() + days);
        return d.toUTCString();
    }
    var _backend = {};
    _backend.userData = {isSupport: !!window.ActiveXObject, type: 1, get: function (key, cb) {
        db.load(dbname);
        var val = db.getAttribute(key);
        (typeof cb == "function") && cb(val);
        return val;
    }, set: function (key, value) {
        try {
            db.load(dbname);
            db.setAttribute(key, value);
            db.save(dbname);
            return true;
        }
        catch (ex) {
            return false;
        }
    }, remove: function (key) {
        db.load(dbname);
        db.removeAttribute(key);
        db.save(dbname);
    }, init: function () {
        if (share) {
            createHelper(this, "userData");
            return;
        }
        var el = (document.documentElement || document.body);
        el.addBehavior("#default#userdata");
        el.load(dbname);
        db = el;
        cb(this);
    }, clear: function () {
        try {
            db.load(dbname);
            db.expires = new Date(1234567890000).toUTCString();
            db.save(dbname);
            db.load(dbname);
            db.expires = getExpireDate();
            db.save(dbname);
            return true;
        }
        catch (ex) {
            return false;
        }
    }};
    _backend.globalStorage = {isSupport: typeof window.globalStorage != "undefined", type: 2, get: function (key, cb) {
        var v = (v = db.getItem(key)) && v.value ? v.value : v;
        (typeof cb == "function") && cb(v);
        return v;
    }, set: function (key, value) {
        try {
            db.setItem(key, value);
            return true;
        }
        catch (ex) {
            return false;
        }
    }, remove: function (key) {
        db.removeItem(key);
    }, init: function () {
        if (db = window.globalStorage[share ? defaultDomain : document.domain]) {
            cb(this);
        }
        else {
            cb(false);
        }
    }, clear_flag: false, clear_arr: [], clear: function (cb) {
        var ar = this.clear_arr;
        if (this.clear_flag) {
            return;
        }
        this.clear_flag = true;
        for (var k in db) {
            ar.push(k);
        }
        var clearXItems = function (x) {
            x = x > ar.length ? ar.length : x;
            for (var i = 0; i < x; i++) {
                var k = ar.shift();
                db.removeItem(k);
            }
            if (ar.length > 0) {
                QZFL.console.print(ar.length);
                setTimeout(function () {
                    clearXItems(x);
                }, 50);
            }
            else {
                typeof cb == "function" && cb();
            }
        }
        clearXItems(5);
    }};
    _backend.localStorage = {isSupport: typeof window.localStorage != "undefined", type: 3, get: _backend.globalStorage.get, set: _backend.globalStorage.set, remove: _backend.globalStorage.remove, init: function () {
        if (share) {
            createHelper(this, "localStorage");
            return;
        }
        if (db = window.localStorage) {
            cb(this);
        }
        else {
            cb(false);
        }
    }, clear: function () {
        db.clear();
    }};
    (function () {
        try {
            for (var i = 0, len = _clientStore.length; i < len; i++) {
                if (_backend[_clientStore[i]].isSupport) {
                    (_cs["instance"] = _backend[_clientStore[i]]).init();
                    return;
                }
            }
            cb(false);
        } catch (e) {
            var img = new Image();
            img.src = "http://pinghot.qq.com/pingd?dm=v.qq.com.hot&url=/virtualpage/storage.html&arg=&hottag=txv.storage.error&hotx=9999&hoty=9999&rand=13106";
            cb(false);
        }
    })();
};
(function (qs) {
    var isDoing = false, queue = [], opt = {share: true, domain: "qq.com"};
    qs.setOptions = function (opts) {
        opt = opts;
    };
    qs.init = function () {
        var args = arguments;
        if (isDoing) {
            queue.push([args[0], args[1]]);
            return;
        }
        queue.push([args[0], args[1]]);
        isDoing = true;
        qs.create(function (ins) {
            var t;
            if (ins) {
                qs.get = ins.get;
                qs.set = ins.set;
                qs.remove = ins.remove;
                qs.clear = ins.clear;
                while (t = queue.pop()) {
                    ins[t[0]].apply(null, t[1]);
                }
            }
            else {
                while (t = queue.pop()) {
                    if (QZFL.lang.isArray(t) && t[0] == "get" && t[1] && typeof t[1][1] == "function") {
                        t[1][1](null);
                    }
                }
                qs.get = function (key, cb) {
                    if (QZFL.lang.isFunction(cb)) {
                        cb(null);
                    }
                    return null;
                }
            }
        }, opt);
    };
    qs.get = function () {
        var args = [].slice.call(arguments, 0), timer = null, fn;
        if (QZFL.lang.isFunction(args[1])) {
            fn = args[1];
            timer = setTimeout(function () {
                fn.call(null, null);
                fn = QZFL.emptyFn;
            }, 500);
            args[1] = function (v) {
                clearTimeout(timer);
                fn.call(null, v);
                fn = QZFL.emptyFn;
            }
        }
        qs.init("get", args);
    };
    qs.set = function () {
        qs.init("set", arguments);
    };
    qs.remove = function () {
        qs.init("remove", arguments);
    };
    qs.clear = function () {
        qs.init("clear", arguments);
    };
})(QZFL.Storage);
(function (global, undefined) {
    if (global.seajs) {
        return;
    }
    var seajs = global.seajs = {version: "2.1.1"};
    var data = seajs.data = {};

    function isType(type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) === "[object " + type + "]"
        }
    }

    var isObject = isType("Object");
    var isString = isType("String");
    var isArray = Array.isArray || isType("Array");
    var isFunction = isType("Function");
    var _cid = 0;

    function cid() {
        return _cid++;
    }

    var events = data.events = {};
    seajs.on = function (name, callback) {
        var list = events[name] || (events[name] = []);
        list.push(callback);
        return seajs;
    }
    seajs.off = function (name, callback) {
        if (!(name || callback)) {
            events = data.events = {};
            return seajs;
        }
        var list = events[name]
        if (list) {
            if (callback) {
                for (var i = list.length - 1; i >= 0; i--) {
                    if (list[i] === callback) {
                        list.splice(i, 1);
                    }
                }
            }
            else {
                delete events[name];
            }
        }
        return seajs;
    }
    var emit = seajs.emit = function (name, data) {
        var list = events[name], fn;
        if (list) {
            list = list.slice();
            while ((fn = list.shift())) {
                fn(data);
            }
        }
        return seajs;
    }
    var DIRNAME_RE = /[^?#]*\//;
    var DOT_RE = /\/\.\//g;

    function dirname(path) {
        return path.match(DIRNAME_RE)[0];
    }

    function realpath(path) {
        path = path.replace(DOT_RE, "/");
        while (path.indexOf("/../") > 0) {
            var idx = path.indexOf("/../"), prefix = path.substr(0, idx), folder = prefix.substr(prefix.lastIndexOf("/"));
            path = path.replace(folder, "").replace("/../", "/");
        }
        return path;
    }

    function normalize(path) {
        var last = path.length - 1;
        var lastC = path.charAt(last);
        if (lastC === "#") {
            return path.substring(0, last);
        }
        return(path.substring(last - 2) === ".js" || path.indexOf("?") > 0 || path.substring(last - 3) === ".css" || lastC === "/") ? path : path + ".js"
    }

    var PATHS_RE = /^([^/:]+)(\/.+)$/;
    var VARS_RE = /{([^{]+)}/g;

    function parseAlias(id) {
        var alias = data.alias;
        return alias && isString(alias[id]) ? alias[id] : id;
    }

    function parsePaths(id) {
        var paths = data.paths;
        var m;
        if (paths && (m = id.match(PATHS_RE)) && isString(paths[m[1]])) {
            id = paths[m[1]] + m[2];
        }
        return id;
    }

    function parseVars(id) {
        var vars = data.vars;
        if (vars && id.indexOf("{") > -1) {
            id = id.replace(VARS_RE, function (m, key) {
                return isString(vars[key]) ? vars[key] : m
            })
        }
        return id;
    }

    function parseMap(uri) {
        var map = data.map;
        var ret = uri;
        if (map) {
            for (var i = 0, len = map.length; i < len; i++) {
                var rule = map[i];
                ret = isFunction(rule) ? (rule(uri) || uri) : uri.replace(rule[0], rule[1])
                if (ret !== uri)break
            }
        }
        return ret;
    }

    var ABSOLUTE_RE = /^\/\/.|:\//;
    var ROOT_DIR_RE = /^.*?\/\/.*?\//;

    function addBase(id, refUri) {
        var ret;
        var first = id.charAt(0);
        if (ABSOLUTE_RE.test(id)) {
            ret = id;
        }
        else if (first === ".") {
            ret = realpath((refUri ? dirname(refUri) : data.cwd) + id)
        }
        else if (first === "/") {
            var m = data.cwd.match(ROOT_DIR_RE);
            ret = m ? m[0] + id.substring(1) : id;
        }
        else {
            ret = data.base + id;
        }
        return ret;
    }

    function id2Uri(id, refUri) {
        if (!id)return"";
        id = parseAlias(id);
        id = parsePaths(id);
        id = parseVars(id);
        id = normalize(id);
        var uri = addBase(id, refUri);
        uri = parseMap(uri);
        return uri;
    }

    var doc = document;
    var loc = location;
    var cwd = dirname(loc.href);
    var scripts = doc.getElementsByTagName("script");
    var loaderScript = doc.getElementById("seajsnode") || scripts[scripts.length - 1];
    var loaderDir = dirname(getScriptAbsoluteSrc(loaderScript) || cwd);

    function getScriptAbsoluteSrc(node) {
        return node.hasAttribute ? node.src : node.getAttribute("src", 4)
    }

    var head = doc.getElementsByTagName("head")[0] || doc.documentElement;
    var baseElement = head.getElementsByTagName("base")[0];
    var IS_CSS_RE = /\.css(?:\?|$)/i;
    var READY_STATE_RE = /^(?:loaded|complete|undefined)$/;
    var currentlyAddingScript;
    var interactiveScript;
    var isOldWebKit = (navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1")) * 1 < 536;

    function request(url, callback, charset) {
        var isCSS = IS_CSS_RE.test(url);
        var node = doc.createElement(isCSS ? "link" : "script");
        if (charset) {
            var cs = isFunction(charset) ? charset(url) : charset
            if (cs) {
                node.charset = cs;
            }
        }
        addOnload(node, callback, isCSS)
        if (isCSS) {
            node.rel = "stylesheet";
            node.href = url;
        }
        else {
            node.async = true;
            node.src = url;
        }
        currentlyAddingScript = node;
        baseElement ? head.insertBefore(node, baseElement) : head.appendChild(node);
        currentlyAddingScript = null;
    }

    function addOnload(node, callback, isCSS) {
        var missingOnload = isCSS && (isOldWebKit || !("onload"in node));
        if (missingOnload) {
            setTimeout(function () {
                pollCss(node, callback)
            }, 1)
            return;
        }
        node.onload = node.onerror = node.onreadystatechange = function () {
            if (READY_STATE_RE.test(node.readyState)) {
                node.onload = node.onerror = node.onreadystatechange = null;
                if (!isCSS && !data.debug) {
                    head.removeChild(node);
                }
                node = null;
                callback();
            }
        }
    }

    function pollCss(node, callback) {
        var sheet = node.sheet;
        var isLoaded;
        if (isOldWebKit) {
            if (sheet) {
                isLoaded = true;
            }
        }
        else if (sheet) {
            try {
                if (sheet.cssRules) {
                    isLoaded = true;
                }
            } catch (ex) {
                if (ex.name === "NS_ERROR_DOM_SECURITY_ERR") {
                    isLoaded = true;
                }
            }
        }
        setTimeout(function () {
            if (isLoaded) {
                callback();
            }
            else {
                pollCss(node, callback);
            }
        }, 20)
    }

    function getCurrentScript() {
        if (currentlyAddingScript) {
            return currentlyAddingScript;
        }
        if (interactiveScript && interactiveScript.readyState === "interactive") {
            return interactiveScript;
        }
        var scripts = head.getElementsByTagName("script");
        for (var i = scripts.length - 1; i >= 0; i--) {
            var script = scripts[i];
            if (script.readyState === "interactive") {
                interactiveScript = script;
                return interactiveScript;
            }
        }
    }

    var REQUIRE_RE = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g;
    var SLASH_RE = /\\\\/g;

    function parseDependencies(code) {
        var ret = [];
        code.replace(SLASH_RE, "").replace(REQUIRE_RE, function (m, m1, m2) {
            if (m2) {
                ret.push(m2);
            }
        })
        return ret;
    }

    var cachedMods = seajs.cache = {};
    var anonymousMeta;
    var fetchingList = {};
    var fetchedList = {};
    var callbackList = {};
    var STATUS = Module.STATUS = {FETCHING: 1, SAVED: 2, LOADING: 3, LOADED: 4, EXECUTING: 5, EXECUTED: 6}

    function Module(uri, deps) {
        this.uri = uri;
        this.dependencies = deps || [];
        this.exports = null;
        this.status = 0;
        this._waitings = {};
        this._remain = 0;
    }

    Module.prototype.resolve = function () {
        var mod = this;
        var ids = mod.dependencies;
        var uris = [];
        for (var i = 0, len = ids.length; i < len; i++) {
            uris[i] = Module.resolve(ids[i], mod.uri);
        }
        return uris;
    }
    Module.prototype.load = function () {
        var mod = this;
        if (mod.status >= STATUS.LOADING) {
            return;
        }
        mod.status = STATUS.LOADING;
        var uris = mod.resolve();
        emit("load", uris);
        var len = mod._remain = uris.length;
        var m;
        for (var i = 0; i < len; i++) {
            m = Module.get(uris[i]);
            if (m.status < STATUS.LOADED) {
                m._waitings[mod.uri] = (m._waitings[mod.uri] || 0) + 1;
            }
            else {
                mod._remain--;
            }
        }
        if (mod._remain === 0) {
            mod.onload();
            return;
        }
        var requestCache = {};
        for (i = 0; i < len; i++) {
            m = cachedMods[uris[i]];
            if (m.status < STATUS.FETCHING) {
                m.fetch(requestCache);
            }
            else if (m.status === STATUS.SAVED) {
                m.load();
            }
        }
        for (var requestUri in requestCache) {
            if (requestCache.hasOwnProperty(requestUri)) {
                requestCache[requestUri]();
            }
        }
    }
    Module.prototype.onload = function () {
        var mod = this;
        mod.status = STATUS.LOADED;
        if (mod.callback) {
            mod.callback();
        }
        var waitings = mod._waitings;
        var uri, m;
        for (uri in waitings) {
            if (waitings.hasOwnProperty(uri)) {
                m = cachedMods[uri];
                m._remain -= waitings[uri];
                if (m._remain === 0) {
                    m.onload();
                }
            }
        }
        delete mod._waitings;
        delete mod._remain;
    }
    Module.prototype.fetch = function (requestCache) {
        var mod = this;
        var uri = mod.uri;
        mod.status = STATUS.FETCHING;
        var emitData = {uri: uri};
        emit("fetch", emitData);
        var requestUri = emitData.requestUri || uri;
        if (!requestUri || fetchedList[requestUri]) {
            mod.load();
            return;
        }
        if (fetchingList[requestUri]) {
            callbackList[requestUri].push(mod);
            return;
        }
        fetchingList[requestUri] = true;
        callbackList[requestUri] = [mod];
        emit("request", emitData = {uri: uri, requestUri: requestUri, onRequest: onRequest, charset: data.charset});
        if (!emitData.requested) {
            requestCache ? requestCache[emitData.requestUri] = sendRequest : sendRequest()
        }
        function sendRequest() {
            request(emitData.requestUri, emitData.onRequest, emitData.charset);
        }

        function onRequest() {
            delete fetchingList[requestUri];
            fetchedList[requestUri] = true;
            if (anonymousMeta) {
                Module.save(uri, anonymousMeta);
                anonymousMeta = null;
            }
            var m, mods = callbackList[requestUri];
            delete callbackList[requestUri];
            while ((m = mods.shift()))m.load()
        }
    }
    Module.prototype.exec = function () {
        var mod = this;
        if (mod.status >= STATUS.EXECUTING) {
            return mod.exports;
        }
        mod.status = STATUS.EXECUTING;
        var uri = mod.uri;

        function require(id) {
            return Module.get(require.resolve(id)).exec();
        }

        require.resolve = function (id) {
            return Module.resolve(id, uri);
        }
        require.async = function (ids, callback) {
            Module.use(ids, callback, uri + "_async_" + cid());
            return require;
        }
        var factory = mod.factory;
        var exports = isFunction(factory) ? factory(require, mod.exports = {}, mod) : factory;
        if (exports === undefined) {
            exports = mod.exports;
        }
        if (exports === null && !IS_CSS_RE.test(uri)) {
            emit("error", mod);
        }
        delete mod.factory;
        mod.exports = exports;
        mod.status = STATUS.EXECUTED;
        emit("exec", mod);
        return exports;
    }
    Module.resolve = function (id, refUri) {
        var emitData = {id: id, refUri: refUri};
        emit("resolve", emitData);
        return emitData.uri || id2Uri(emitData.id, refUri)
    }
    Module.define = function (id, deps, factory) {
        var argsLen = arguments.length;
        if (argsLen === 1) {
            factory = id;
            id = undefined;
        }
        else if (argsLen === 2) {
            factory = deps;
            if (isArray(id)) {
                deps = id;
                id = undefined;
            }
            else {
                deps = undefined;
            }
        }
        if (!isArray(deps) && isFunction(factory)) {
            deps = parseDependencies(factory.toString());
        }
        var meta = {id: id, uri: Module.resolve(id), deps: deps, factory: factory};
        if (!meta.uri && doc.attachEvent) {
            var script = getCurrentScript();
            if (script) {
                meta.uri = script.src;
            }
        }
        emit("define", meta);
        meta.uri ? Module.save(meta.uri, meta) : anonymousMeta = meta;
    }
    Module.save = function (uri, meta) {
        var mod = Module.get(uri);
        if (mod.status < STATUS.SAVED) {
            mod.id = meta.id || uri;
            mod.dependencies = meta.deps || [];
            mod.factory = meta.factory;
            mod.status = STATUS.SAVED;
        }
    }
    Module.get = function (uri, deps) {
        return cachedMods[uri] || (cachedMods[uri] = new Module(uri, deps));
    }
    Module.use = function (ids, callback, uri) {
        var mod = Module.get(uri, isArray(ids) ? ids : [ids]);
        mod.callback = function () {
            var exports = [];
            var uris = mod.resolve();
            for (var i = 0, len = uris.length; i < len; i++) {
                exports[i] = cachedMods[uris[i]].exec();
            }
            if (callback) {
                callback.apply(global, exports);
            }
            delete mod.callback;
        }
        mod.load();
    }
    Module.preload = function (callback) {
        var preloadMods = data.preload;
        var len = preloadMods.length;
        if (len) {
            Module.use(preloadMods, function () {
                preloadMods.splice(0, len);
                Module.preload(callback);
            }, data.cwd + "_preload_" + cid())
        }
        else {
            callback();
        }
    }
    seajs.use = function (ids, callback) {
        Module.preload(function () {
            Module.use(ids, callback, data.cwd + "_use_" + cid())
        })
        return seajs;
    }
    Module.define.cmd = {};
    global.define = Module.define;
    seajs.Module = Module;
    data.fetchedList = fetchedList;
    data.cid = cid;
    seajs.resolve = id2Uri;
    seajs.require = function (id) {
        return(cachedMods[Module.resolve(id)] || {}).exports
    }
    var BASE_RE = /^(.+?\/)(\?\?)?(seajs\/)+/;
    data.base = (loaderDir.match(BASE_RE) || ["", loaderDir])[1];
    data.dir = loaderDir;
    data.cwd = cwd;
    data.charset = "utf-8";
    data.preload = (function () {
        var plugins = [];
        var str = loc.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2");
        str += " " + doc.cookie;
        str.replace(/(seajs-\w+)=1/g, function (m, name) {
            plugins.push(name);
        })
        return plugins;
    })()
    seajs.config = function (configData) {
        for (var key in configData) {
            var curr = configData[key];
            var prev = data[key];
            if (prev && isObject(prev)) {
                for (var k in curr) {
                    prev[k] = curr[k];
                }
            }
            else {
                if (isArray(prev)) {
                    curr = prev.concat(curr);
                }
                else if (key === "base") {
                    (curr.slice(-1) === "/") || (curr += "/");
                    curr = addBase(curr);
                }
                data[key] = curr;
            }
        }
        emit("config", configData);
        return seajs;
    }
})(this);
;
(function ($) {
    $.util = {};
    $.extend($.util, {getUrlParam: function (p, u) {
        u = u || location.href;
        var reg = new RegExp('[\?&#]' + p + '=([^&#]+)', 'gi'), matches = u.match(reg), strArr;
        if (matches && matches.length > 0) {
            strArr = (matches[matches.length - 1]).split('=');
            if (strArr && strArr.length > 1) {
                return strArr[1];
            }
            return'';
        }
        return'';
    }, setUrlParam: function (name, value, url) {
        url = url || location.href;
        var reg = new RegExp('[\?&#]' + name + '=([^&#]+)', 'gi'), matches = url.match(reg), strArr, extra, key = '{key' + new Date().getTime() + '}';
        if (matches && matches.length > 0) {
            strArr = (matches[matches.length - 1]);
        }
        else {
            strArr = '';
        }
        extra = name + '=' + value;
        if (strArr) {
            var first = strArr.charAt(0);
            url = url.replace(strArr, key);
            url = url.replace(key, value ? first + extra : '');
        }
        else if (value) {
            if (url.indexOf('?') > -1) {
                url += '&' + extra;
            }
            else {
                url += '?' + extra;
            }
        }
        return url;
    }, getUrlParamObject: function (u) {
        u = u || location.href;
        var uArr = u.split('#'), queryHash = uArr[1] || '', queryString = (uArr[0].split('?'))[1] || '', queryHashArr = queryHash.split("&"), queryStringArr = queryString.split("&"), queryArr = queryStringArr.concat(queryHashArr), kvArr, k, v, i, params = {};
        for (i = 0, len = queryArr.length; i < len; i++) {
            kvArr = queryArr[i].split('=');
            k = kvArr[0];
            v = kvArr[1] || '';
            if (k) {
                params[k] = decodeURIComponent(v);
            }
        }
        return params;
    }, genHttpParamString: function (paramObject, baseUrl) {
        var paramStr = '', sep = '';
        baseUrl = baseUrl || '';
        paramStr = $j.param(paramObject);
        if (baseUrl && paramStr) {
            sep = baseUrl.indexOf('?') != -1 ? '&' : '?';
        }
        return baseUrl + sep + paramStr;
    }, strToDate: function (timeStr) {
        var regTime = /^(\d{4})-(\d{2})-(\d{2})(\s+?(\d{2}):(\d{2}):(\d{2}))?$/, dateArr, date;
        if (Date.parse) {
            date = new Date(Date.parse(timeStr));
        }
        else {
            date = new Date(timeStr);
        }
        if (isNaN(date.getDate())) {
            if ($.type(timeStr) && (dateArr = timeStr.match(regTime))) {
                if (dateArr[4] && dateArr[4].length > 0) {
                    date = new Date(parseInt(dateArr[1], 10), parseInt(dateArr[2], 10) - 1, parseInt(dateArr[3], 10), parseInt(dateArr[5], 10), parseInt(dateArr[6], 10), parseInt(dateArr[7], 10));
                }
                else {
                    date = new Date(parseInt(dateArr[1], 10), parseInt(dateArr[2], 10) - 1, parseInt(dateArr[3], 10));
                }
            }
        }
        if (isNaN(date.getDate())) {
            return null;
        }
        return date;
    }, formatNum: function (num) {
        if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(num)) {
            return num;
        }
        var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3, re = new RegExp("(\\d)(\\d{3})(,|$)");
        while (re.test(b))
            b = b.replace(re, "$1,$2$3");
        return a + "" + b + "" + c;
    }, isEventSupported: function (eventName) {
        if ("string" != typeof eventName && eventName.length == 0) {
            return false;
        }
        var isSupported = false;
        var TAGNAMES = {'select': 'input', 'change': 'input', 'propertychange': 'input', 'input': 'input', 'submit': 'form', 'reset': 'form', 'error': 'img', 'load': 'img', 'abort': 'img'};
        var el = document.createElement(TAGNAMES[eventName] || 'div');
        if (!!el) {
            eventName = "on" + eventName;
            isSupported = (eventName in el);
            if (!isSupported) {
                el.setAttribute(eventName, "return;");
                isSupported = typeof el.getAttribute(eventName) == "function";
            }
        }
        return isSupported;
    }, useHtml5: function () {
        var ua = navigator.userAgent, ret = false;
        $j.each(["iPhone", "iPad", "iPod"], function (k, v) {
            if (!ret && ua.indexOf(v) != -1) {
                ret = true;
            }
        });
        return $j.util.getUrlParam("usehtml5") || ret;
    }, getFunCallTrace: function () {
        var stack = [], caller = arguments.callee.caller;

        function getFunctionName(func) {
            if (typeof func == 'function' || typeof func == 'object') {
                var name = ('' + func).match(/function\s*([\w\$]*)\s*\(/);
            }
            return name && name[1] || "[unknown]";
        }

        while (caller) {
            stack.unshift(getFunctionName(caller));
            caller = caller && caller.caller;
        }
        return stack;
    }, showAtCenter: function (loginwin, w, h) {
        if (!loginwin)
            return;
        var notIframe = (window == top), doc = notIframe ? document : top.document, scrhei = doc.body.scrollTop, clihei = doc.documentElement.clientHeight, size = QZFL.dom.getSize(loginwin), zIndex;
        w = w || size[0] || 373;
        h = h || size[1] || 235;
        if (0 == scrhei)
            scrhei = doc.documentElement.scrollTop;
        if (0 == clihei)
            clihei = doc.body.clientHeight;
        zIndex = parseInt($j(loginwin).css("zIndex"));
        $j(loginwin).css({width: w + "px", height: h + "px", top: (Live.userAgent.ie != 6 && notIframe) ? "50%" : ((clihei / 2 + scrhei) - h / 2 + "px"), left: "50%", marginLeft: -w / 2 + "px", marginTop: Live.userAgent.ie != 6 ? (-h / 2 + "px") : ("0px"), position: Live.userAgent.ie != 6 ? "fixed" : "absolute", zIndex: zIndex || "10001", display: 'block', padding: '0px', backgroundColor: '#ffffff'});
        if ($j.util.useHtml5()) {
            doc.documentElement.scrollTop = 0;
        }
    }, formatTimeBySec: function (s, formatStr, isShowZero, isShowZeroSec) {
        if (isNaN(s) || !QZFL.lang.isString(formatStr)) {
            return"";
        }
        var ret = {};
        isShowZero = typeof isShowZero == 'boolean' ? isShowZero : true;
        isShowZeroSec = typeof isShowZeroSec == 'boolean' ? isShowZeroSec : true;
        ret.h = Math.floor(s / 3600);
        ret.hh = ret.h < 10 ? ("0" + ret.h) : ret.h;
        ret.m = Math.floor(s / 60) - ret.h * 60;
        if (!(/{h+}/.test(formatStr))) {
            ret.m += ret.h * 60;
        }
        ret.mm = ret.m < 10 ? ("0" + ret.m) : ret.m;
        ret.s = s % 60;
        if (!(/{m+}/.test(formatStr))) {
            ret.s += ret.m * 60;
        }
        ret.ss = ret.s < 10 ? ("0" + ret.s) : ret.s;
        if (ret.h < 1 && !isShowZero) {
            formatStr = formatStr.replace(/{h+}[^{]+/, "");
            if (ret.m < 1) {
                formatStr = formatStr.replace(/{m+}[^{]+/, "");
            }
        }
        if (ret.s < 1 && !isShowZeroSec) {
            formatStr = formatStr.replace(/{s+}[^{]+/, "");
        }
        return formatStr.replace(/{([smh]+)}/g, function (m, key) {
            return typeof(ret[key]) === "undefined" ? m : ret[key];
        });
    }, log: (function () {
        var isDebug, canLog;
        return function (msg) {
            if (typeof isDebug == "undefined") {
                isDebug = ($j.util.getUrlParam("debug") == "true");
            }
            if (typeof canLog == "undefined") {
                canLog = (window.console && window.console.log);
            }
            if (isDebug && canLog) {
                window.console.log(msg);
            }
        }
    })(), dump: (function () {
        var isDebug, canLog;
        return function (obj) {
            if (typeof isDebug == "undefined") {
                isDebug = ($j.util.getUrlParam("debug") == "true");
            }
            if (typeof canLog == "undefined") {
                canLog = (window.console && window.console.dir);
            }
            if (isDebug && canLog) {
                window.console.dir(obj);
            }
        }
    })(), report: (function () {
        var isFree = true, reportObj = null, urlList = [];

        function errorHandle() {
            if (urlList.length == 0) {
                isFree = true;
                reportObj = null;
                return;
            }
            create(urlList.splice(0, 1));
            isFree = false;
        }

        function create(url) {
            reportObj = document.createElement("img");
            reportObj.onerror = errorHandle;
            reportObj.src = url;
        }

        return function (url) {
            if (!url || !/^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i.test(url)) {
                return;
            }
            if (reportObj == null) {
                create(url);
                isFree = false;
                return;
            }
            if (isFree) {
                create(url);
                isFree = false;
                return;
            }
            else {
                urlList.push(url);
            }
        }
    })(), getCoverPic: function (cid, type, postfix) {
        var url = "http://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideo/";
        if (typeof cid == "string") {
            type = type || "";
            postfix = postfix || "";
            if (postfix.length > 0) {
                postfix = "_" + postfix;
            }
            url = url + [type, cid.charAt(0), cid + postfix + ".jpg"].join("/");
        }
        return url;
    }, isPageHidden: function () {
        var hidden = document.webkitHidden || document.mozHidden || document.mozHidden || document.msHidden;
        return hidden === true;
    }});
    $.extend(Live, {report: $.util.report});
})($j);
QZFL.config.DCCookieDomain = "live.qq.com";
QZFL.config.domainPrefix = "live.qq.com";
QZFL.config.defaultDataCharacterSet = "utf-8";
QZFL.config.defaultShareObject = "http://live.qq.com/toolpages/getset.swf";
try {
    if (window.location.href.indexOf("http://cache.tv.qq.com") >= 0) {
        QZFL.config.FSHelperPage = "http://cache.tv.qq.com/v9/toolpages/fp_utf8.html";
    }
} catch (e) {
}
if (typeof Live == "undefined" || !Live) {
    var Live;
    Live = QZFL;
    if (typeof QQLive != "undefined" && !QQLive) {
        Live.object.extend(Live, QQLive);
    }
    Live.isLoaded = false;
    Live.ver = "$Rev: 36902 $";
    Live.lastmodify = "$Date: 2013-11-07 11:59:04 +0800 (周四, 07 十一月 2013) $";
}
;
Live.noConflict = function () {
    if (typeof $ != "undefined" && typeof jQuery != "undefined") {
        jQuery.noConflict(true);
        $ = jQuery;
    }
}
Live.lazyLoad = (function () {
    var map_el = {};
    var el_obj = [];
    var download_count = 0;
    var last_offset = -1;
    var doc_el;
    var lazy_load_tag;
    var map_func = {};
    var tmp_count = 0;
    var is_finish = true;

    function initVar(tags, scrollElm) {
        if (scrollElm) {
            doc_el = scrollElm;
        }
        else {
            doc_el = document.compatMode == 'BackCompat' ? document.body : document.documentElement;
        }
        lazy_load_tag = tags || ["img", "iframe"];
    };
    function initElementMap() {
        var all_el = [];
        for (var i = 0, len = lazy_load_tag.length; i < len; i++) {
            var $el = $e(lazy_load_tag[i] + "[lz_src]"), el = $el.elements || $el.get();
            for (var j = 0, len2 = el.length; j < len2; j++) {
                all_el.push(el[j]);
            }
        }
        var start = el_obj.length, end = start;
        for (var key = 0, len = all_el.length; key < len; key++) {
            if (typeof(all_el[key]) == "object" && all_el[key].getAttribute("lz_src")) {
                el_obj.push(all_el[key]);
                end++;
            }
            else {
            }
        }
        for (var i = start; i < end; i++) {
            var o_img = el_obj[i];
            o_img.style.visibility = "hidden";
            var t_index = Math.round(QZFL.dom.getXY(o_img)[1] - QZFL.dom.getXY(doc_el)[1])
            if (map_el[t_index]) {
                map_el[t_index].push(i);
            }
            else {
                var t_array = [];
                t_array[0] = i;
                map_el[t_index] = t_array;
                download_count++;
            }
        }
    };
    function getScreenShowHeight() {
        var scrollTop = window.pageYOffset || doc_el.scrollTop;
        return doc_el.clientHeight + scrollTop;
    };
    function doLoading() {
        tmp_count++;
        if (!download_count) {
            is_finish = true;
            return;
        }
        var img_show_height = getScreenShowHeight();
        if (last_offset >= img_show_height) {
            setTimeout(doLoading, 200);
            return;
        }
        last_offset = img_show_height;
        for (var key in map_el) {
            if (img_show_height > key) {
                var t_o = map_el[key], img_vl = t_o.length, tmp_src;
                for (var l = 0; l < img_vl; l++) {
                    tmp_src = el_obj[t_o[l]].getAttribute("lz_src");
                    el_obj[t_o[l]].src = tmp_src;
                    el_obj[t_o[l]].removeAttribute("lz_src");
                    el_obj[t_o[l]].style.visibility = "visible";
                }
                delete map_el[key];
                download_count--;
            }
            else {
            }
        }
        for (var key in map_func) {
            if (img_show_height > key) {
                var t_o = map_func[key], img_vl = t_o.length;
                for (var l = 0; l < img_vl; l++) {
                    t_o[l]();
                }
                delete map_func[key];
                download_count--;
            }
        }
        setTimeout(doLoading, 200);
    };
    function appleShowImg() {
        var tmp_src;
        for (var i = 0, len = el_obj.length; i < len; i++) {
            tmp_src = el_obj[i].getAttribute("lz_src");
            el_obj[i].src = tmp_src;
            el_obj[i].removeAttribute("lz_src");
            el_obj[i].style.visibility = "visible";
        }
        delete el_obj;
        delete map_el;
        download_count = 0;
    }

    function init(tags, scrollElm) {
        initVar(tags, scrollElm);
        initElementMap();
        is_finish = false;
        setTimeout(function () {
            doLoading();
        }, 0);
    };
    function lazyFunc(element, callback, fix) {
        fix = fix || 0;
        if (!element.getXY) {
            element = $e(element);
        }
        var t_index = element.getXY()[1] + fix;
        if (map_func[t_index]) {
            map_func[t_index].push(callback);
        }
        else {
            var t_array = [];
            t_array[0] = callback;
            map_func[t_index] = t_array;
            download_count++;
        }
        last_offset = 0;
        if (is_finish) {
            is_finish = false;
            doLoading();
        }
    };
    function resetLastOffset(offset) {
        last_offset = offset;
    };
    function reset() {
        map_el = {};
        el_obj = [];
        download_count = 0;
        last_offset = -1;
        lazy_load_tag;
        map_func = {};
        tmp_count = 0;
        is_finish = true;
    }

    return{init: init, lazyFunc: lazyFunc, getScreenShowHeight: getScreenShowHeight, reset: reset, resetLastOffset: resetLastOffset}
})();
Live.actionManager = (function () {
    var readyCallbacks = {}, undefined, readyDeferreds = {};
    return{on: function (act, fn) {
        if (typeof act == "string" && act.length > 0 && typeof fn == "function") {
            if (!readyCallbacks[act] || typeof readyCallbacks[act].add != "function") {
                readyCallbacks[act] = new Live.Callback("unique");
            }
            if (!readyCallbacks[act].has(fn)) {
                readyCallbacks[act].add(fn);
            }
        }
    }, one: function (act, fn) {
        if (typeof act == "string" && act.length > 0 && typeof fn == "function") {
            if (!readyDeferreds[act] || typeof readyDeferreds[act].done != "function") {
                readyDeferreds[act] = new Live.Deferred();
            }
            readyDeferreds[act].done(fn);
        }
    }, trigger: function (act, args) {
        if (typeof act == "string" && act.length > 0) {
            if (readyDeferreds[act] && QZFL.lang.isFunction(readyDeferreds[act].resolveWith)) {
                readyDeferreds[act].resolveWith(null, args);
            }
            else {
                readyDeferreds[act] = new Live.Deferred();
                readyDeferreds[act].resolveWith(null, args);
            }
            if (readyCallbacks[act] && typeof readyCallbacks[act].fire == "function") {
                readyCallbacks[act].fireWith(null, args);
            }
        }
    }, off: function (act, fn) {
        if (typeof act == "string" && act.length > 0 && readyCallbacks[act] && typeof readyCallbacks[act].remove == "function") {
            if (typeof fn == "function") {
                readyCallbacks[act].remove(fn);
            }
            else {
                readyCallbacks[act] = undefined;
            }
        }
    }};
})();
var _irt = {version: '0.0.7', dataHandler: 'http://tj.video.qq.com/fcgi-bin/set_cookie?otype=json&', dataHandler_video: 'http://tj.video.qq.com/fcgi-bin/set_cookie?otype=json&', _account: '', _u_eventid: '', _debug: false, init: function (_identity) {
    var irt = this;
    this._account = _identity;
    this._track();
}, _trackStart: function (_identify) {
    if (_identify.indexOf("-") < 0)return'invalid user identify.';
    this.init(_identify);
    return this;
}, _track: function () {
    this._feedBack();
}, record_video_api: function (video_id, duration, video_category_label, tag) {
    if (tag + "" == "0") {
        this._u_eventid = Math.abs(parseInt((navigator.userAgent ^ new Date().getTime()) * Math.random())) + video_id;
        this._feedBack_video(video_id, duration, video_category_label, tag);
        return;
    }
    this._feedBack_video(video_id, duration, video_category_label, tag);
}, _feedBack: function () {
    var _m = Array("id=" + this._account, "pt=" + encodeURIComponent(document.title), "dm=" + encodeURIComponent(window.location.host), "pa=" + encodeURIComponent(window.location.pathname), "sr=" + document.body.clientWidth + 'x' + document.body.clientHeight, "ul=" + (navigator.language || "zh-CN"), "tv=" + this.version, "r=" + new Date().getTime(), "url=" + encodeURIComponent(window.location.href), "ua=" + encodeURIComponent(navigator.userAgent.toString())).join('&');
    var _imgURL = this.dataHandler + _m;
    this._img = new Image();
    this._img.src = _imgURL;
}, _feedBack_video: function (video_id, duration, video_category_label, tag) {
    var _m = Array("ta=" + tag, "eid=" + this._u_eventid, "pt=" + encodeURIComponent(document.title), "vid=" + video_id, "du=" + duration, "la=" + encodeURIComponent(video_category_label), "r=" + new Date().getTime()).join('&');
    var _imgURL = this.dataHandler_video + _m;
    this._img = new Image();
    this._img.src = _imgURL;
}};
Live.mypv = {dm: location.hostname || location.host, idx: 1, report: function () {
    var me = this;
    var host = me.dm;
    var ptag = Live.mypv.getPtag();
    if (ptag != "") {
        Live.mypv.setCookiePtag('ptag', ptag, host);
    }
    var itype = 0, hostVal = {"cache.tv.qq.com": 1, "imgcache.qq.com": 1, "film.qq.com": 2, "3g.v.qq.com": 3, "m.v.qq.com": 4};
    if (!!hostVal[host]) {
        itype = hostVal[host];
    }
    var imgpvr = new Image();
    imgpvr.onerror = imgpvr.onload = imgpvr.onabort = function () {
    };
    imgpvr.src = ['http://rcgi.video.qq.com/pv_report?', "refer=", encodeURIComponent(document.referrer), "&ptag=", QZFL.cookie.get('ptag'), "&itype=", itype, "&idx=", me.idx++, "&t=", new Date().valueOf()].join("");
}, getPtag: function () {
    var url = document.location.toString().toLowerCase(), host = this.dm;
    var ptag = "", keyArr = ['ptag', 'adtag', 'pgv_ref'];
    for (var i = 0, len = keyArr.length; i < len; i++) {
        ptag = Live.mypv.getUrlParam(keyArr[i], url);
        if (!!ptag) {
            break;
        }
    }
    if (!ptag) {
        var dm = Live.mypv.getDomainOfURL(document.referrer);
        if ("" != dm && host != dm) {
            ptag = dm.replace(/\./g, "_");
        }
        if (!ptag) {
            ptag = Live.mypv.getCookiePtag('ptag');
        }
    }
    return ptag;
}, getDomainOfURL: function (url) {
    var dm = "";
    if (typeof url == "undefined" || null == url || "" == url) {
        return dm;
    }
    var regex = /.*\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if (typeof match != "undefined" && null != match) {
        dm = match[1];
    }
    return dm;
}, getCookiePtag: function (key) {
    key = key || 'ptag';
    var pqtag = QZFL.cookie.get(key);
    var pqtagArr = pqtag.split('|');
    return pqtagArr[0];
}, setCookiePtag: function (key, val, dm) {
    var pqtag = QZFL.cookie.get(key);
    var pqtagArr = pqtag.split('|');
    var newpqtag = [val];
    for (var i = 1, len = pqtagArr.length; i < len; i++) {
        newpqtag.push('|' + pqtagArr[i]);
    }
    QZFL.cookie.set(key, newpqtag.join(''), dm);
}, getUrlParam: function (p, u) {
    u = u || location.href;
    var reg = new RegExp('[\?&#]' + p + '=([^&#]+)', 'gi'), matches = u.match(reg), strArr;
    if (matches && matches.length > 0) {
        strArr = (matches[matches.length - 1]).split('=');
        if (strArr && strArr.length > 1) {
            return strArr[1];
        }
        return'';
    }
    return'';
}};
Live.QTAG_SET_FLAG = false;
Live.QTAG = {dm: location.hostname || location.host, init: function () {
    var me = this;
    var referDomain = Live.mypv.getDomainOfURL(document.referrer);
    if (me.dm != referDomain) {
        me.clearCookieQtag();
    }
    $e(document).undelegate("[_qtag]", "click").delegate("[_qtag]", "click", function (evt) {
        var flag = Live.QTAG_SET_FLAG;
        var $this = $e(this);
        if (!flag) {
            var qtag = $this.attr('_qtag');
            if (!!qtag && qtag != '') {
                me.setCookieQtag(qtag);
                Live.QTAG_SET_FLAG = true;
            }
        }
    }, true);
    $e(document).delegate("body", "click", function (evt) {
        var flag = Live.QTAG_SET_FLAG;
        if (!flag && me.checkLinkTag(evt, this)) {
            var qtag = me.getDefaultQtag();
            me.setCookieQtag(qtag);
        }
        Live.QTAG_SET_FLAG = false;
    }, true);
}, getQtag: function (elem, evt) {
    var me = this;
    var target = elem, curEle = document, qtag = "";
    while (curEle != target && QZFL.lang.isElement(target)) {
        var ele = $e(target);
        var tmp = ele.attr('_qtag');
        if (!tmp || '' == tmp) {
            tmp = ele.attr('_hot');
        }
        if (!!tmp && '' != tmp) {
            qtag = tmp;
            break;
        }
        target = target.parentNode;
    }
    if ('' == qtag) {
        qtag = me.getDefaultQtag();
    }
    return qtag;
}, checkQtag: function (elem, evt) {
    if (Live.QTAG_SET_FLAG) {
        return;
    }
    var $ele = $e(elem);
    var qtag = $ele.attr('_qtag');
    if (!!qtag && qtag != '') {
        Live.QTAG.setCookieQtag(qtag);
        Live.QTAG_SET_FLAG = true;
        return;
    }
    var hot = $ele.attr('_hot');
    if (!!hot && hot != '') {
        Live.QTAG.setCookieQtag(hot);
        Live.QTAG_SET_FLAG = true;
        return;
    }
}, getCookieQtag: function () {
    var pqtag = QZFL.cookie.get('ptag');
    var pqtagArr = pqtag.split('|');
    if (pqtagArr.length < 2) {
        return"";
    }
    return pqtagArr[1];
}, setCookieQtag: function (val) {
    var key = 'ptag', me = this;
    var pqtag = QZFL.cookie.get(key);
    var pqtagArr = pqtag.split('|');
    var newpqtag = [pqtagArr[0], '|' + val];
    if (pqtagArr.length > 2) {
        for (var i = 2, len = pqtagArr.length; i < len; i++) {
            newpqtag.push('|' + pqtagArr[i]);
        }
    }
    QZFL.cookie.set(key, newpqtag.join(''), me.dm);
}, getDefaultQtag: function () {
    var pathName = location.pathname;
    if (pathName.length < 1 || pathName == '/') {
        return location.hostname.replace(/\./g, "_");
    }
    var pos = pathName.indexOf('/', 1);
    if (pos == -1) {
        return pathName.substring(1);
    } else {
        return pathName.substring(1, pos);
    }
}, clearCookieQtag: function () {
    var key = 'ptag', me = this;
    var pqtag = QZFL.cookie.get(key);
    var pqtagArr = pqtag.split('|');
    if (pqtagArr.length > 1) {
        var newpqtag = [pqtagArr[0]];
        for (var i = 2, len = pqtagArr.length; i < len; i++) {
            newpqtag.push('|' + pqtagArr[i]);
        }
        QZFL.cookie.set(key, newpqtag.join(''), me.dm);
    }
}, checkLinkTag: function (oriEvt, curEle) {
    var target = QZFL.event.getTarget(oriEvt);
    if ('A' == target.tagName || 'A' == curEle.tagName) {
        return true;
    }
    while (curEle != target && QZFL.lang.isElement(target)) {
        if ('A' == target.tagName) {
            return true;
        }
        target = target.parentNode;
    }
    return false;
}};
Live.TXVWATCH = {cgi: 'http://rcgi.video.qq.com/web_report?', buildUrl: function (ele, hot) {
    hot = hot || '';
    var param = {cmd: 2570, url: location.href, str1: hot};
    var url = [];
    var sw = QZFL.dom.getScrollWidth() / 2;
    var pos = QZFL.dom.getPosition(ele);
    if (!!pos) {
        param.val = (pos.left + pos.width / 2) - sw;
        param.val2 = pos.top + pos.height / 2;
    }
    if (typeof(PAGE_INFO) != 'undefined') {
        param.int1 = PAGE_INFO.pageType;
        param.int2 = PAGE_INFO.tplType;
    }
    for (var p in param) {
        url = url.concat([p, '=', encodeURIComponent(param[p]), '&']);
    }
    url = url.concat(['_t=', (new Date()).valueOf()]);
    return[this.cgi, url.join('')].join('');
}, watch: function (ele, hot) {
    var url = this.buildUrl(ele, hot);
    if (window.$j && $j.util && $j.util.report) {
        $j.util.report(url);
    } else if (typeof(Live.report) == 'function') {
        Live.report(url);
    } else {
        var img = new Image();
        img.onerror = img.onload = img.onabort = function () {
        };
        img.src = url;
    }
}};
Live.openviplinkreport = {conf: {selector: "a[data-openvip]", paramName: "aid"}, init: function (_conf) {
    QZFL.object.extend(this.conf, _conf);
    var name = this.conf.paramName, reg = new RegExp("([&|\?]" + name + "=)(.+?)(&.+|$)");
    $e(document).undelegate(this.conf.selector, "click").delegate(this.conf.selector, "click", function (evt) {
        var url = this.href, param = encodeURIComponent(Live.openviplinkreport.getParam(this));
        if (QZFL.string.isURL(url)) {
            if (reg.test(url)) {
                url = url.replace(reg, "$1" + param + "$3");
            }
            else {
                url += (url.indexOf("?") == -1 ? "?" : "&") + name + "=" + param;
            }
            this.href = url;
        }
    }, true);
    window.__tencentplayer_getaidparam = function () {
        return Live.openviplinkreport.getParam(document, "flash");
    };
}, getParam: function (elem, defaultQtag) {
    return[Live.mypv.getPtag(), Live.QTAG.getQtag(elem) || defaultQtag || "flash"].join("$$");
}}
Live.tj2 = {jspath: "http://pingjs.qq.com/ping.js", isBusy: false, comscorePath: "http://b.scorecardresearch.com/beacon.js", comscoreParam: {"c1": 2, "c2": 6036207}, keyPrefix: "ISD.LIVEWEB.", initPGVGlobalParam: function () {
    pgvVirtualDomain = "";
    pvCurDomain = "";
    pvCurUrl = "";
}, hot: function (key) {
    function doSend() {
        Live.tj2.isBusy = false;
        Live.tj2.initPGVGlobalParam();
        pgvSendClick({hottag: Live.tj2.keyPrefix + key});
    };
    if (typeof(pgvSendClick) == 'function') {
        doSend();
    } else {
        if (Live.tj2.isBusy) {
            setTimeout(function () {
                Live.tj2.hot(key);
            }, 20);
        } else {
            Live.tj2.isBusy = true;
            $j.ajax({url: Live.tj2.jspath, success: doSend, error: Live.tj2.errReport, dataType: "script"});
        }
    }
}, button: function (key, virtualPage, virtualDomain) {
    if (!QZFL.lang.isString(key))return;
    function doSend() {
        Live.tj2.isBusy = false;
        if (typeof virtualPage == "undefined") {
            var pagename = key;
            var arrKey = key.split(".");
            if (arrKey.length > 0) {
                pagename = arrKey[0];
            }
            pagename += ".html";
            virtualPage = "/virtualpage/" + pagename;
        }
        Live.tj2.initPGVGlobalParam();
        if (typeof(pgvSendClick) != "function") {
            return;
        }
        if (typeof virtualDomain != "undefined") {
            pgvSendClick({hottag: Live.tj2.keyPrefix + key, virtualURL: virtualPage, virtualDomain: virtualDomain});
        }
        else {
            pgvSendClick({hottag: Live.tj2.keyPrefix + key, virtualURL: virtualPage});
        }
    };
    if (typeof(pgvSendClick) == 'function') {
        doSend();
    } else {
        if (Live.tj2.isBusy) {
            setTimeout(function () {
                Live.tj2.button(key, virtualPage, virtualDomain);
            }, 20);
        } else {
            Live.tj2.isBusy = true;
            $j.ajax({url: Live.tj2.jspath, success: doSend, error: Live.tj2.errReport, dataType: "script"});
        }
    }
}, senseParam: null, pv: function (extData) {
    var pvHostFilter = {};
    pvHostFilter["v.qq.com"] = true;
    pvHostFilter["film.qq.com"] = true;
    pvHostFilter["3g.v.qq.com"] = true;
    pvHostFilter["m.v.qq.com"] = true;
    pvHostFilter["cache.tv.qq.com"] = true;
    pvHostFilter["imgcache.qq.com"] = true;
    if (pvHostFilter[location.host]) {
        if (typeof Live.mypv != "undefined") {
            Live.mypv.report();
        }
    }
    var hostFilter = {};
    hostFilter["v.qq.com"] = true;
    hostFilter["boke.qq.com"] = true;
    hostFilter["cache.tv.qq.com"] = true;
    hostFilter["play.v.qq.com"] = true;
    hostFilter["imgcache.qq.com"] = true;
    hostFilter["sns.video.qq.com"] = true;
    if (hostFilter[location.host]) {
        Live.tj2.pv_irt();
        Live.tj2.pv_comscore();
    }
    Live.tj2.pv_pgv(extData);
    if (!!Live.lazyreport) {
        Live.lazyreport.report();
    }
}, pv_pgv: function (extData) {
    extData = extData || {};
    if (top != window) {
        extData["statIframe"] = true;
    }
    function doSend() {
        Live.tj2.isBusy = false;
        Live.tj2.initPGVGlobalParam();
        if (typeof pgvVirtualURL != "undefined") {
            pgvVirtualURL = "";
        }
        if (typeof pvRepeatCount != "undefined") {
            pvRepeatCount = 1;
        }
        if (!extData && !Live.tj2.senseParam) {
            if (typeof(pgvMain) == "function") {
                pgvMain();
            }
        }
        else {
            var _extd = {};
            if (!!Live.tj2.senseParam)
                Live.object.extend(_extd, {"senseParam": Live.tj2.senseParam});
            if (!!extData) {
                Live.object.extend(_extd, extData);
                if (!!extData.virtualURL) {
                    pvCurUrl = extData.virtualURL;
                }
            }
            if (typeof(pgvMain) == "function") {
                pgvMain("", _extd);
            }
        }
    };
    if (typeof(pgvMain) == "function") {
        doSend();
    } else {
        if (Live.tj2.isBusy) {
            setTimeout(function () {
                Live.tj2.pv_pgv(extData);
            }, 20);
        } else {
            Live.tj2.isBusy = true;
            $j.ajax({url: Live.tj2.jspath, success: doSend, error: Live.tj2.errReport, dataType: "script"});
        }
    }
}, pv_irt: function () {
    if (typeof(_irt) != "undefined") {
        _irt.init("");
    }
}, pv_comscore: function () {
    $j.getScript(Live.tj2.comscorePath, function () {
        if (typeof(Live.tj2.comscoreParam.c10) == "undefined") {
            Live.tj2.comscoreParam.c10 = Live.cookie.get("pvid");
        }
        try {
            COMSCORE.beacon(Live.tj2.comscoreParam);
        }
        catch (err) {
            Live.tj2.button("comscore.error");
        }
    });
}, watch: function () {
    $e("body").bind("click", function () {
        if (typeof(pgvWatchClick) == 'function') {
            Live.tj2.initPGVGlobalParam();
            pgvWatchClick();
        }
    });
}, performance: function (flag1, flag2, flag3) {
    var timing = window.performance || window.msPerformance || window.webkitPerformance;
    if (!timing) {
        return;
    }
    timing = timing.timing;
    var times = [];
    var d00 = timing.domainLookupStart;
    times[0] = timing.domainLookupEnd;
    times[1] = timing.requestStart;
    times[2] = timing.responseStart;
    times[3] = timing.responseEnd;
    times[4] = timing.domComplete;
    times[5] = timing.loadEventEnd;
    var s = [["http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=", flag1, "&flag2=", flag2, "&flag3=", flag3].join('')];
    for (var i = 0, len = times.length; i < len; i++) {
        if (!!times[i])
            s.push((i + 1) + "=" + (times[i] - d00));
    }
    window._speed_img = new Image();
    window._speed_img.src = s.join("&");
}, errReport: function () {
    setTimeout(function () {
        if (typeof window.pingjsReqImg == 'undefined') {
            window.pingjsReqImg = new Image();
        }
        window.pingjsReqImg.src = ["http://rcgi.video.qq.com/web_report?cmd=2563", "&str1=", encodeURIComponent(Live.tj2.jspath)].join('');
        Live.tj2.isBusy = false;
    }, 0);
}};
Live.pgv = Live.tj2;
Live.virtualpgv = {virtualHost: "pgv.live.qq.com", virtualPath: "/liveweb/", pv: function (url) {
    Live.tj2.initPGVGlobalParam();
    Live.tj2.pv_pgv({virtualDomain: Live.virtualpgv.virtualHost, virtualURL: [Live.virtualpgv.virtualPath, url].join("")});
}};
Live.lazyreport = (function () {
    var reg = /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i;
    var mydomain = location.hostname || location.host;
    var k = 'txv_lazyreport_list';
    var d = '|';
    var cookieMode = {get: function (key) {
        return QZFL.cookie.get(key);
    }, set: function (key, val) {
        return QZFL.cookie.set(key, val, mydomain);
    }, clear: function (key) {
        return QZFL.cookie.set(key, '', mydomain);
    }};
    var sessionStorageMode = {isSupport: window.sessionStorage, get: function (key) {
        return sessionStorage.getItem(key);
    }, set: function (key, val) {
        return sessionStorage.setItem(key, val);
    }, clear: function (key) {
        return sessionStorage.removeItem(key);
    }};
    var qzflStorageMode = {isSupport: (window.QZFL && QZFL.Storage) ? true : false, get: function (key, cb) {
        QZFL.Storage.get(key, cb);
    }, set: function (key, val) {
        QZFL.Storage.set(key, val);
    }, clear: function (key) {
        this.set(key, '');
    }};
    var mode = (function () {
        if (qzflStorageMode.isSupport) {
            var qs = qzflStorageMode;
            return{get: qs.get, set: qs.set, clear: qs.clear};
        }
        if (sessionStorageMode.isSupport) {
            var ss = sessionStorageMode;
            return{get: function (key, cb) {
                var v = ss.get(key);
                cb(v);
                return v;
            }, set: ss.set, clear: ss.clear};
        }
        var cs = cookieMode;
        return{get: function (key, cb) {
            var v = cs.get(key);
            cb(v);
            return v;
        }, set: cs.set, clear: cs.clear};
    })();
    var _imgreport = function (url, cb) {
        var img = new Image();
        img.onload = img.onerror = img.onabort = function () {
            delete img;
            cb();
        };
        img.src = url;
    };
    var clear = function () {
        return mode.clear(k);
    };
    var val = function (cb) {
        mode.get(k, function (itemlist) {
            cb(itemlist);
        });
    };
    var push = function (item) {
        mode.get(k, function (itemlist) {
            if (itemlist && itemlist.length > 0) {
                itemlist += (d + encodeURIComponent(item));
            } else {
                itemlist = encodeURIComponent(item);
            }
            mode.set(k, itemlist);
        });
    };
    var shift = function (cb) {
        mode.get(k, function (itemlist) {
            if (itemlist) {
                var arr = itemlist.split(d);
                var item = arr.shift();
                mode.set(k, arr.join(d));
                cb(decodeURIComponent(item));
            }
        });
    };
    var reportItem = function (item, cb) {
        if (reg.test(item)) {
            setTimeout(function () {
                _imgreport(item, cb);
            }, 0);
        } else {
            setTimeout(function () {
                try {
                    eval(item);
                    cb();
                } catch (e) {
                }
            }, 0);
        }
    };
    var report = function () {
        shift(function (item) {
            if (item) {
                reportItem(item, function () {
                    report();
                });
            }
        });
    };
    return{push: push, clear: clear, val: val, report: report};
})();
Live.util = Live.object.extend(Live.util, {platform: {TXV: 1, BIGPORTAL: 2, TXVFILM: 3}, getHost: function (platform) {
    var host = '';
    if (platform == this.platform.TXVFILM) {
        host = "http://film.qq.com";
    }
    else if (platform == this.platform.BIGPORTAL) {
        host = "http://cache.tv.qq.com";
    }
    else {
        host = "http://v.qq.com";
    }
    return host;
}, getFullUrlPath: function (path, platform) {
    return this.getHost(platform) + path;
}, getTxvDetailUrl: function (coverid, typeid) {
    typeid = typeid || 0;
    var pathname = "";
    if (typeid == 0 || $j.inArray(typeid, [1, 2, 98]) != -1) {
        pathname = "/detail/";
    }
    else {
        pathname = "/cover/";
    }
    return this.getFullUrlPath([pathname, coverid.charAt(0), "/", coverid, ".html"].join(""), this.platform.TXV);
}, getDetailUrl: function (cid, vid, platform) {
    return platform == Live.util.platform.BIGPORTAL ? Live.util.getBpDetailUrl(cid, vid) : Live.util.getTxvDetailUrl(cid);
}, getTxvPlayUrl: function (id, vid, platform) {
    if (!id)
        return"";
    if (id.length == 15) {
        var str = ["/cover/", id.charAt(0), "/", id, ".html"].join("");
        platform = platform || this.platform.TXV;
        if (!!vid) {
            str += "?vid=" + vid;
        }
        return this.getFullUrlPath(str, platform);
    }
    else {
        return this.getTxvVideoPlayUrl(id);
    }
}, getTxvVideoPlayUrl: function (vid) {
    if (typeof(vid) !== "string" || vid.length < 11) {
        return"";
    }
    return this.getFullUrlPath(["/page/", vid.substr(0, 1), "/", vid.substr(9, 1), "/", vid.substr(10, 1), "/", vid, ".html"].join(""), this.platform.TXV);
}, getTxvBokePlayUrl: function (vid) {
    if (typeof(vid) !== "string" || vid.length < 11) {
        return"";
    }
    return this.getFullUrlPath(["/boke/page/", vid.substr(0, 1), "/", vid.substr(9, 1), "/", vid.substr(10, 1), "/", vid, ".html"].join(""), this.platform.TXV);
}, getBpDetailUrl: function (id, vid) {
    if (!id) {
        return"";
    }
    if (id.length == 15) {
        var str = ["/bigportal/detail/", id.charAt(0), "/", id, ".html"].join("");
        if (!!vid) {
            str += "?vid=" + vid;
        }
        return this.getFullUrlPath(str, this.platform.BIGPORTAL);
    }
    else {
        return this.getBpVideoDetailUrl(id);
    }
}, getBpVideoDetailUrl: function (vid) {
    if (!vid) {
        return"";
    }
    return this.getFullUrlPath("/bigportal/vdetail.html?vid=" + vid, this.platform.BIGPORTAL);
}, getBpLiveDetailUrl: function (chanelid) {
    if (!chanelid) {
        return"";
    }
    return this.getFullUrlPath('/bigportal/live/tv/' + chanelid + '.html', this.platform.BIGPORTAL);
}, getBpSearchUrl: function (szText, stag, uin) {
    var szUinParam = "";
    stag = stag || '';
    if (!(uin && uin >= 10000)) {
        uin = 0;
    }
    if (uin && uin >= 10000) {
        szUinParam = "&uin=" + uin
    }
    var url = "/bigportal/search.html?pagetype=1&stag=" + stag + "&ms_key=" + encodeURIComponent(szText) + szUinParam;
    return this.getFullUrlPath(url, this.platform.BIGPORTAL);
}, getBpPlayUrl: function (cid, vid) {
    if (!cid) {
        return"";
    }
    if (cid.length == 15) {
        var url = "qqlive://sso/vbarid=" + cid;
        if (vid && vid.length == 11) {
            url += "&videoid=" + vid;
        }
        return url;
    }
    else if (cid.length == 11) {
        return"qqlive://sso/videoid=" + vid;
    }
    return"";
}, getAvatar: function (uin, size) {
    size = size || 50;
    return["http://qlogo", uin % 4 + 1, ".store.qq.com/qzone/", uin, "/", uin, "/", size].join("");
}, formatVarietyVideoTitle: function (tit) {
    if (typeof tit != "string") {
        return"";
    }
    return tit.replace(/^(\d{2})(\d{2})(\d{2})([^_]+)(_?\d*)$/ig, "$4 20$1-$2-$3期");
}});
if (typeof(Live.common) == "undefined") {
    Live.common = {};
}
Live.SearchBox = function () {
    this.config = {defaultTxt: "请输入关键词", inputBox: $e("#iWord"), sugSelector: $e("#sgt_list"), searchBtn: $e("#sbutton"), suggestCgi: Live.SearchBox.search_suggest, searchCgi: Live.SearchBox.search_cgi, searchForm: document.sform, sugCover: $e("#mod_keywords_list"), elStag: $e("#searchbox_hid_stag"), elTj2btn: $e("#searchbox_hid_tj2btn"), defaultCls: "mod_search_txt", focusCls: "onfocus", showSuggest: true, callback: {onInputboxFocus: Live.emptyFn, onInputboxBlur: Live.emptyFn}};
    this.selectedIndex = -1;
    this.itemsCount = 0;
    this.timer = [];
    this.hadModify = false;
    if (arguments.length === 1 && QZFL.lang.isHashMap(arguments[0])) {
        Live.object.extend(this.config, arguments[0]);
    }
    this.showSuggestCb = new Live.Callback("unique");
    this.hideSuggestCb = new Live.Callback("unique");
};
Live.SearchBox.search_cgi = "http://v.qq.com/search.html";
Live.SearchBox.search_suggest = "http://ncgi.video.qq.com/tvideo/fcgi-bin/smartbox?plat=2&ver=0&num=10&otype=json&query=";
Live.SearchBox.prototype = {addOnShowSelectorCallBack: function () {
    this.showSuggestCb.add(arguments);
}, addOnHideSelectorCallBack: function () {
    this.hideSuggestCb.add(arguments);
}, init: function (_conf) {
    _conf = _conf || {};
    Live.object.extend(this.config.callback, _conf.callback);
    Live.object.extend(this.config, _conf);
    var me = this;
    if (this.config.defaultTxt != QZFL.string.trim(this.config.inputBox.val())) {
        this.getDefauKeyword();
    }
    if (QZFL.lang.isElement(this.config.searchForm)) {
        this.config.searchForm.action = this.config.searchCgi;
        this.config.searchForm.onsubmit = function () {
            if (!me.onBeforeSubmit()) {
                return false;
            }
            return me.go();
        };
    }
    if (this.config.showSuggest) {
        this.initSmartBox();
        this.bindListClickEvt();
    }
}, getDefauKeyword: function () {
    var $me = this;
    QZFL.Storage.get("txv_search_keyword", function (v) {
        if (QZFL.lang.isString(v) && v) {
            v = v.split("|");
            $me.config.defaultTxt = QZFL.string.filterAngAndQt(v[0]);
        }
    });
}, isSupportPlaceholder: (function () {
    var ret = null;
    return function () {
        if (typeof ret != "boolean") {
            ret = 'placeholder'in document.createElement('input');
        }
        return ret;
    }
})(), submit: function () {
    if (this.go()) {
        this.config.searchForm.submit();
    }
}, go: function () {
    var val = QZFL.string.trim(this.config.inputBox.val());
    if (val == "" || val == "请输入关键词") {
        return false;
    }
    if (document.charset != 'utf-8' && Live.userAgent.ie) {
        var charset = document.charset;
        document.charset = 'utf-8';
        setTimeout(function () {
            document.charset = charset;
        }, 0);
    }
    this.config.inputBox.val(val);
    this.config.searchForm.action = this.search_cgi || this.config.searchCgi;
    return true;
}, onBeforeSubmit: function () {
    return true;
}, resetInputBox: function (resetTxt) {
    var $el = this.config.inputBox;
    var v = QZFL.string.trim($el.val());
    if (v == "" || v == this.config.defaultTxt) {
        if (resetTxt) {
            $el.val(this.config.defaultTxt);
        }
    }
    $el.removeClass(this.config.focusCls);
}, onKeyup: function (e) {
    var me = this;
    if (e.keyCode == 38 || e.keyCode == 40) {
        clearTimeout(me.timer[0]);
        return;
    }
    this.timer[0] = setTimeout(function () {
        clearTimeout(me.timer[0]);
        me.selectedIndex = -1;
        me.getSuggest();
    }, 300);
}, onKeydown: function (e) {
    this.resetInputBox(false);
    this.config.inputBox.addClass(this.config.focusCls);
    if (e.keyCode == 38) {
        this.choose("up", true);
    }
    else if (e.keyCode == 40) {
        this.choose("down", true);
    }
}, onSmartBoxBlur: function () {
    this.hideSelector();
    this.resetInputBox(true);
    typeof this.config.callback.onInputboxBlur == 'function' && this.config.callback.onInputboxBlur();
}, initSmartBox: function () {
    var me = this, $el = this.config.inputBox;
    $el.bind("keyup", function (e) {
        me.onKeyup(e);
        me.hadModify = true;
    });
    $el.bind("keydown", function (e) {
        me.onKeydown(e);
        me.hadModify = true;
    });
    $el.bind("blur", function () {
        me.onSmartBoxBlur();
    });
    $el.bind("focus", function () {
        var v = QZFL.string.trim(this.value);
        if (v == me.config.defaultTxt && (me.config.defaultTxt == "请输入关键词" || !me.hadModify)) {
            this.value = "";
        }
        else {
            setTimeout(function () {
                $el.select();
            }, 10);
        }
        $el.addClass("onfocus");
        typeof me.config.callback.onInputboxFocus == 'function' && me.config.callback.onInputboxFocus();
    });
    $el.bind("webkitspeechchange", function (evt) {
        evt = evt.originalEvent || evt;
        QZFL.event.cancelBubble(evt);
        if (evt.results && evt.results.length > 0) {
            this.value = evt.results[0].utterance;
            me.getSuggest();
            me.hadModify = true;
        }
    });
}, choose: function (key, fill) {
    fill = fill | false;
    if (typeof key == "string") {
        if (key == "up") {
            if (this.selectedIndex <= 0) {
                this.selectedIndex = this.itemsCount;
            }
            this.selectedIndex--;
        }
        else if (key == "down") {
            if (this.selectedIndex >= this.itemsCount - 1) {
                this.selectedIndex = -1;
            }
            this.selectedIndex++;
        }
    }
    else if (typeof key == "number") {
        this.selectedIndex = key;
    }
    this.config.sugSelector.find("li.current").removeClass("current");
    var curItem = this.config.sugSelector.find("li:eq(" + this.selectedIndex + ")");
    curItem.addClass("current");
    if (!!fill) {
        this.setVal(curItem);
    }
}, setVal: function (curItem) {
    this.config.inputBox.val(curItem.text());
}, hideSelector: function () {
    this.config.sugSelector.html("");
    this.config.sugSelector.hide();
    this.config.sugCover.hide();
    this.hideSuggestCb.fire();
    Live.SearchBox.hideSuggestCb.fire();
}, getSuggest: function () {
    var me = this;
    var val = QZFL.string.trim(this.config.inputBox.val());
    if (val == "") {
        this.hideSelector();
        return;
    }
    $j.getScript(this.config.suggestCgi + encodeURIComponent(val), function () {
        if (typeof(QZOutputJson) == "undefined" || !QZOutputJson.head || !QZFL.lang.isArray(QZOutputJson.item)) {
            me.hideSelector();
            return;
        }
        me.itemsCount = QZOutputJson.item.length;
        if (me.itemsCount == 0) {
            me.hideSelector();
            return;
        }
        me.renderSuggest(QZOutputJson);
        me.bindListMouseEvt();
        try {
            setTimeout(function () {
                var height, str = me.config.sugSelector.html();
                if (str.length > 0) {
                    me.showSuggestCb.fire();
                    Live.SearchBox.showSuggestCb.fire();
                    height = me.config.sugSelector.getSize()[1];
                    if (height > 0) {
                        me.config.sugCover.css("height", height + 2 + "px");
                    }
                }
            }, 25);
        }
        catch (e) {
            QZFL.console.print(e);
        }
    });
}, renderSuggest: function (json) {
    var sb = [], config = this.config;
    for (var i = 0, len = json.item.length; i < len; i++) {
        sb.push(["<li><a href='javascript:;' target='_self'>", json.item[i].w, "<\/a><\/li>"].join(""));
    }
    config.sugSelector.html(sb.join(""));
    config.sugSelector.show();
    config.sugCover.show(true);
}, getElementIndex: function (el) {
    var i = -1;
    if (QZFL.lang.isElement(el) && QZFL.lang.isElement(el.parentNode)) {
        QZFL.object.each(el.parentNode.childNodes, function (elem, idx) {
            if (el === elem) {
                i = idx;
                return false;
            }
        });
    }
    return i;
}, onListClick: function (el) {
    var i = this.getElementIndex(el);
    this.choose(i, true);
    this.hideSelector();
    this.submit();
}, bindListMouseEvt: function () {
    var me = this, $el = this.config.sugSelector, $lis = $el.find("li");
    $lis.bind("mouseover",function () {
        me.choose($lis.index(this));
        me.config.inputBox.unBind("blur");
    }).bind("mouseout", function () {
        me.config.inputBox.bind("blur", function () {
            me.onSmartBoxBlur();
        });
    });
}, bindListClickEvt: function () {
    var me = this;
    this.config.sugSelector.undelegate("li", "click").delegate("li", "click", function (e) {
        me.onListClick(this, e);
    }, true);
}};
Live.SearchBox.showSuggestCb = new Live.Callback("unique");
Live.SearchBox.hideSuggestCb = new Live.Callback("unique");
Live.SearchBox.addOnShowSelectorCallBack = Live.SearchBox.showSuggestCb.add;
Live.SearchBox.addOnHideSelectorCallBack = Live.SearchBox.hideSuggestCb.add;
Live.ComplexSearchBox = function () {
    Live.SearchBox.call(this);
    this.typemap = {DY: 1, TV: 2, DM: 3, MV: 22, ZY: 10, YC: 103, JLP: 9};
    this.hotkeyObj = {go: "search.search", smartBox: "search.smartbox", hotwordtj2: 'search.hotword', smartBoxStag: "txt.smart_index", defaultStag: "txt.index", hotwordStag: 'txt.index_hotword'};
};
Live.ComplexSearchBox.prototype = new Live.SearchBox();
QZFL.object.extend(Live.ComplexSearchBox.prototype, {onBeforeSubmit: function () {
    var ret = true, $stag = this.config.elStag, curItem, act;
    if (this.config.sugSelector.html() != "" && this.selectedIndex != -1) {
        curItem = this.config.sugSelector.find("li:eq(" + this.selectedIndex + ")");
        act = curItem.attr("act");
        if (act == "click") {
            Live.tj2.button(this.hotkeyObj.smartBox);
            var url = curItem.attr("playurl");
            if (url && url != "") {
                window.open(url);
            }
            this.hideSelector();
            ret = false;
        }
        else {
            $stag.val(this.hotkeyObj.smartBoxStag);
            this.config.elTj2btn.val(this.hotkeyObj.smartBox);
        }
        this.hideSelector();
    }
    else {
        if (!this.hadModify) {
            $stag.val(this.hotkeyObj.hotwordStag);
            this.config.elTj2btn.val(this.hotkeyObj.hotwordtj2);
        }
        else {
            $stag.val(this.hotkeyObj.defaultStag);
            this.config.elTj2btn.val(this.hotkeyObj.go);
        }
    }
    return ret;
}, onListClick: function (el, e) {
    var act = el.getAttribute("act"), idx = this.getElementIndex(el), $stag = this.config.elStag;
    if (act == "click") {
        Live.tj2.button(this.hotkeyObj.smartBox);
        var url = el.getAttribute("playurl");
        if (url && url != "") {
            window.open(url);
        }
        QZFL.event.preventDefault(e);
        e.returnValue = false;
        this.hideSelector();
        return;
    }
    this.config.elTj2btn.val(this.hotkeyObj.smartBox);
    $stag.val(this.hotkeyObj.smartBoxStag);
    this.choose(idx, true);
    this.hideSelector();
    this.submit();
    QZFL.event.preventDefault(e);
    this.config.elTj2btn.val(this.hotkeyObj.go);
    $stag.val(this.hotkeyObj.defaultStag);
}, renderSuggest: function (json) {
    var sitem, bigtypename, siid, bigtypeid, sb = [], typemap = this.typemap;
    if (!json || !QZFL.lang.isArray(json.item)) {
        return;
    }
    var vDomain = "http://v.qq.com";
    var tmpUrl = "";
    for (var i = 0; i < json.item.length; i++) {
        sitem = json.item[i];
        bigtypename = sitem["class"];
        siid = sitem["id"];
        bigtypeid = -1;
        if (sitem.ex && sitem.ex.typeid) {
            bigtypeid = parseInt(sitem.ex.typeid, 10);
        }
        if (!(sitem.sharp == "高清" || sitem.sharp == "超清")) {
            sitem.sharp = "";
        }
        if (siid == "") {
            sb.push(['<li act="search"><a href="javascript:;" target="_self"><span class="result_detail"><span class="result_title">', sitem.title, '</span></span></a></li>'].join(""));
        }
        else {
            switch (bigtypeid) {
                case typemap.DY:
                {
                    if (sitem.url.indexOf("cover") != -1) {
                        sitem.url = txv.common.getDetailUrl(sitem.id);
                        if (sitem.url.indexOf(vDomain) == -1) {
                            sitem.url = [vDomain, sitem.url].join("");
                        }
                    }
                    sb.push(['<li act="search" playurl="', sitem.url, '"><a href="javascript:;" target="_self"><span class="result_type">', sitem["class"], '</span><span class="result_detail"><span class="result_title">', sitem.title, '</span><span class="result_HD">', sitem.sharp, '</span></span></a> </li>'].join(""));
                    break;
                }
                case typemap.TV:
                {
                    if (sitem.url.indexOf("cover") != -1) {
                        sitem.url = txv.common.getDetailUrl(sitem.id);
                        if (sitem.url.indexOf(vDomain) == -1) {
                            sitem.url = [vDomain, sitem.url].join("");
                        }
                    }
                    sb.push(['<li act="search" playurl="', sitem.url, '"><a href="javascript:;" target="_self"><span class="result_type">', sitem["class"], '</span><span class="result_detail"><span class="result_title">', sitem.title, '</span><span class="result_HD">', sitem.sharp, '</span><span class="result_new">', sitem.ex.title, '</span></span></a></li>'].join(""));
                    break;
                }
                case typemap.MV:
                {
                    sb.push(['<li act="search" playurl="', sitem.url, '"><a href="javascript:;" target="_self"><span class="result_type">', sitem["class"], '</span><span class="result_detail"><span class="result_title">', sitem.title, '</span><span class="result_singer">歌手：', sitem.ex.title, '</span><span class="result_HD">', sitem.sharp, '</span></span></a></li>'].join(""));
                    break;
                }
                case typemap.YC:
                case typemap.ZY:
                {
                    sb.push(['<li act="search" playurl="', sitem.url, '"><a href="javascript:;" target="_self"><span class="result_type">', sitem["class"], '</span><span class="result_detail"><span class="result_title">', sitem.title, '</span></span></a></li>'].join(""));
                    if (sitem.ex && sitem.ex.id) {
                        tmpUrl = txv.common.getDetailUrl(sitem.ex.id, bigtypeid);
                        if (tmpUrl.indexOf(vDomain) == -1) {
                            tmpUrl = [vDomain, tmpUrl].join("");
                        }
                        sb.push(['<li act="click" playurl="', tmpUrl, '"><a href="javascript:;" target="_self"><span class="result_new_info"> - 最新一期 (第', sitem.ex.date.substring(0, 10), '期)</span><span class="result_new_info_detail">', sitem.ex.byname, '</span></a></li>'].join(""));
                        this.itemsCount++;
                    }
                    break;
                }
                case typemap.JLP:
                {
                    sb.push(['<li act="search" playurl="', sitem.url, '"><a href="javascript:;" target="_self"><span class="result_type">', sitem["class"], '</span><span class="result_detail"><span class="result_title">', sitem.title, '</span><span class="result_HD">', sitem.sharp, '</span></span></a></li>'].join(""));
                    break;
                }
                default:
                {
                    sb.push(['<li act="search" playurl="', sitem.url, '"><a href="javascript:;" target="_self"><span class="result_type">', sitem["class"], '</span><span class="result_detail"><span class="result_title">', sitem.title, '</span></span></a></li>'].join(""));
                    if (sitem.ex && sitem.ex.id) {
                        tmpUrl = txv.common.getDetailUrl(sitem.ex.id, bigtypeid);
                        if (tmpUrl.indexOf(vDomain) == -1) {
                            tmpUrl = [vDomain, tmpUrl].join("");
                        }
                        sb.push(['<li act="click" playurl="', tmpUrl, '"><a href="javascript:;" target="_self"><span class="result_new_info"> - 最新一期 (第', sitem.ex.date.substring(0, 10), '期)</span><span class="result_new_info_detail">', sitem.ex.byname, '</span></a></li>'].join(""));
                        this.itemsCount++;
                    }
                    break;
                }
            }
        }
    }
    this.config.sugSelector.html(sb.join(""));
    this.config.sugSelector.show();
    this.config.sugCover.css("display", "block");
}, setVal: function (curItem) {
    if (curItem.getAttr("act") == "search" || curItem.getAttr("act") == "click") {
        this.config.inputBox.val([curItem.find(".result_title").text(), curItem.find(".result_singer").text().replace(/歌手[:：]/g, ''), curItem.find(".result_type").text().replace(/\(|\)|（|）/g, '')].join(" "));
    }
}});
Live.SimpleSearchBox = function () {
    Live.ComplexSearchBox.call(this);
    this.hotkeyObj = {go: "search.minisearch", smartBox: "search.minismartbox", hotwordtj2: 'search.minihotword', smartBoxStag: "txt.smart_slide", defaultStag: "txt.slide", hotwordStag: 'txt.slide_hotword'};
};
Live.SimpleSearchBox.prototype = new Live.ComplexSearchBox();
QZFL.object.extend(Live.SimpleSearchBox.prototype, {renderSuggest: function (json) {
    var sitem, bigtypename, siid, bigtypeid, sb = [], typemap = this.typemap;
    if (!json || !QZFL.lang.isArray(json.item)) {
        return;
    }
    var vDomain = "http://v.qq.com";
    var tmpUrl = "";
    for (var i = 0; i < json.item.length; i++) {
        sitem = json.item[i];
        bigtypename = sitem["class"];
        siid = sitem["id"];
        bigtypeid = -1;
        if (sitem.ex && sitem.ex.typeid) {
            bigtypeid = parseInt(sitem.ex.typeid, 10);
        }
        if (!(sitem.sharp == "高清" || sitem.sharp == "超清")) {
            sitem.sharp = "";
        }
        if (siid == "") {
            sb.push(['<li act="search" class="result"><a href="javascript:void(0);">', sitem.title, '</a></li>'].join(""));
        }
        else {
            switch (bigtypeid) {
                case typemap.DY:
                case typemap.TV:
                case typemap.DM:
                case typemap.JLP:
                {
                    sb.push(['<li class="result" act="search" playurl="', sitem.url, '"><a href="javascript:void(0);">', sitem.title, '</a><span>', sitem["class"], '</span></li>'].join(""));
                    break;
                }
                case typemap.MV:
                {
                    sb.push(['<li class="result" act="search" playurl="', sitem.url, '"><a href="javascript:void(0);">', sitem.title, '</a><i style="display: none;">', sitem.ex.title, '</i><span>', sitem["class"], '</span></li>'].join(""));
                    break;
                }
                case typemap.YC:
                case typemap.ZY:
                {
                    sb.push(['<li class="result" act="search" playurl="', sitem.url, '"><a href="javascript:void(0);">', sitem.title, '</a><span>', sitem["class"], '</span></li>'].join(""));
                    if (sitem.ex && sitem.ex.id) {
                        tmpUrl = txv.common.getPlayUrl(sitem.ex.id);
                        if (tmpUrl.indexOf(vDomain) == -1) {
                            tmpUrl = [vDomain, tmpUrl].join("");
                        }
                        sb.push(['<li class="sub"  act="click" playurl="', tmpUrl, '"><a href="javascript:void(0);"><span>最新一期（', sitem.ex.date.substring(0, 10), '）</span><span>', sitem.ex.byname, '</span></a></li>'].join(""));
                        this.itemsCount++;
                    }
                    break;
                }
                default:
                {
                    if (sitem.ex && sitem.ex.id) {
                        sb.push(['<li class="result" act="search" playurl="', sitem.url, '"><a href="javascript:void(0);">', sitem.title, '</a><span>', sitem["class"], '</span></li>'].join(""));
                        if (sitem.ex && sitem.ex.id) {
                            tmpUrl = txv.common.getPlayUrl(sitem.ex.id);
                            if (tmpUrl.indexOf(vDomain) == -1) {
                                tmpUrl = [vDomain, tmpUrl].join("");
                            }
                            sb.push(['<li class="sub"  act="click" playurl="', tmpUrl, '"><a href="javascript:void(0);"><span>最新一期（', sitem.ex.date.substring(0, 10), '）</span><span>', sitem.ex.byname, '</span></a></li>'].join(""));
                            this.itemsCount++;
                        }
                    }
                    else {
                        sb.push(['<li class="result" act="search" playurl="', sitem.url, '"><a href="javascript:void(0);">', sitem.title, '</a><span>', sitem["class"], '</span></li>'].join(""));
                    }
                    break;
                }
            }
        }
    }
    this.config.sugSelector.html(sb.join(""));
    this.config.sugSelector.show();
    this.config.sugCover.css("display", "block");
}, setVal: function (curItem) {
    if (curItem.getAttr("act") == "search") {
        this.config.inputBox.val([curItem.find("a").text(), curItem.find("i").text(), curItem.find("span").text()].join(" "));
    }
}});
Live.SearchBox.typedef = {DEFAULT: 0, COMPLEX: 1, SIMPLE: 2};
Live.SearchBox.defaultInit = function (type, conf) {
    conf = conf || {};
    type = parseInt(type, 10);
    var sb;
    switch (type) {
        case Live.SearchBox.typedef.COMPLEX:
        {
            sb = new Live.ComplexSearchBox();
            break;
        }
        case Live.SearchBox.typedef.SIMPLE:
        {
            sb = new Live.SimpleSearchBox();
            break;
        }
        case Live.SearchBox.typedef.DEFAULT:
        default:
        {
            sb = new Live.SearchBox();
            break;
        }
    }
    sb.init(conf);
    return sb;
};
Live.FloatMenu = function (config) {
    this.mark1 = false;
    this.mark2 = false;
    this.effectShow = false;
    this.effectShowDuration = 200;
    this.effectShowTimer = null;
    this.menuHeight = 0;
    this.showing = false;
    this.isNeedChangeDisplay = true;
    this.area = null;
    this.menu = null;
    this.areaOutdelay = 500;
    this.menuOutdelay = 100;
    this.onShow = null;
    this.onHide = null;
    var self = this, isShowing = false;
    for (var prop in config) {
        this[prop] = config[prop];
    }
    if (this.useHtml5()) {
        this.area.bind("click", function (evt) {
            if (isShowing) {
                self.mark1 = false;
                self.mark2 = false;
                self.hideMenu();
                isShowing = false;
            }
            else {
                self.mark1 = true;
                self.mark2 = true;
                self.showMenu();
                isShowing = true;
            }
            QZFL.event.preventDefault(evt);
        });
    }
    else {
        if (typeof this.area.onMouseEnter == "function") {
            this.area.onMouseEnter(function () {
                self.mark1 = true;
                self.showMenu();
            });
            this.menu.onMouseEnter(function (e) {
                self.mark2 = true;
                self.showMenu();
            });
            this.area.onMouseLeave(function () {
                self.mark1 = false;
                setTimeout(function () {
                    self.hideMenu();
                }, self.areaOutdelay);
            });
            this.menu.onMouseLeave(function (e) {
                self.mark2 = false;
                setTimeout(function () {
                    self.hideMenu();
                }, self.menuOutdelay);
            });
        }
        else if (typeof this.area.mouseenter == "function") {
            this.area.mouseenter(function () {
                self.mark1 = true;
                self.showMenu();
            });
            this.menu.mouseenter(function (e) {
                self.mark2 = true;
                self.showMenu();
            });
            this.area.mouseleave(function () {
                self.mark1 = false;
                setTimeout(function () {
                    self.hideMenu();
                }, self.areaOutdelay);
            });
            this.menu.mouseleave(function (e) {
                self.mark2 = false;
                setTimeout(function () {
                    self.hideMenu();
                }, self.menuOutdelay);
            });
        }
    }
};
Live.FloatMenu.prototype = {showMenu: function () {
    if (!this.showing && (this.mark1 || this.mark2)) {
        this.showing = true;
        if (this.onShow) {
            this.onShow(this);
        }
        if (this.effectShow) {
            this.setEffectShow(1);
        }
        else if (this.isNeedChangeDisplay) {
            this.menu.show();
        }
    }
    else {
    }
}, useHtml5: function () {
    return Live.userAgent.isiPad || Live.userAgent.isiPhone || (/\(ipod;/i.test(navigator.userAgent));
}, hideMenu: function () {
    if (!(this.mark1 || this.mark2)) {
        if (this.onHide) {
            this.onHide(this);
        }
        if (this.effectShow) {
            this.setEffectShow(2);
        }
        else if (this.isNeedChangeDisplay) {
            this.menu.hide();
        }
        this.showing = false;
    }
}, setEffectShow: function (type) {
    if (this.menuHeight == 0) {
        this.menuHeight = parseInt(this.menu.css("height"), 10) || 0;
    }
    if (this.menuHeight == 0) {
        return;
    }
    var $me = this, per = 10, h, v = this.menuHeight / 10;
    clearInterval(this.effectShowTimer);
    switch (type) {
        case 1:
        {
            h = 0;
            this.menu.css("height", "0px");
            this.menu.show();
            this.effectShowTimer = setInterval(function () {
                h += v;
                if (h >= $me.menuHeight) {
                    $me.menu.css("height", $me.menuHeight + "px");
                    clearInterval($me.effectShowTimer);
                }
                else {
                    $me.menu.css("height", h + "px");
                }
            }, $me.effectShowDuration / per);
            break;
        }
        case 2:
        {
            h = this.menuHeight;
            this.menu.css("height", h + "px");
            this.effectShowTimer = setInterval(function () {
                h -= v;
                if (h <= 0) {
                    $me.menu.hide();
                    clearInterval($me.effectShowTimer);
                }
                else {
                    $me.menu.css("height", h + "px");
                }
            }, $me.effectShowDuration / per);
            break;
        }
    }
}, getEventTarget: function (e) {
    e = e || window.event;
    return e.target || e.srcElement;
}};
Live.retCode = {snid: 0, TYPE: {SUC: 1, ERR: 2}, config: {cgi: "http://isdspeed.qq.com/cgi-bin/v.cgi", sampling: 1}, commCode: {error: 11, MQzone_Err: 12}, report: function (appid, rettype, delay, errcode) {
    if (!appid)
        return;
    if (isNaN(rettype) || rettype < 1)
        return;
    if (typeof delay == "undefined")
        return;
    var url = this.config.cgi;
    url += "?flag1=" + appid.toString() + "&flag2=" + rettype.toString() + "&1=" + Live.retCode.config.sampling + "&2=" + delay;
    if (errcode)
        url += "&flag3=" + errcode.toString();
    var imgSend = new Image();
    imgSend.src = url;
}};
Live.RetCode = function (appid) {
    this.appid = appid;
    this.timer = {begin: 0, end: 0}
    this.SNID = Live.retCode.snid;
    this.isReported = false;
    Live.retCode.snid++;
}
Live.RetCode.prototype = {begin: function () {
    this.timer.begin = new Date().valueOf();
}, end: function () {
    this.timer.end = this.timer.end || new Date().valueOf();
}, reprot: function (rettype, retcode) {
    this.report(rettype, retcode);
}, report: function (rettype, retcode) {
    if (this.isReported)
        return;
    this.end();
    var delay = this.timer.end - this.timer.begin;
    Live.retCode.report(this.appid, rettype, delay, retcode);
    this.isReported = true;
}, reprotSuc: function () {
    this.reportSuc();
}, reportSuc: function () {
    this.report(Live.retCode.TYPE.SUC);
}, reportErr: function (errcode) {
    errcode = errcode || Live.retCode.commCode.error;
    this.report(Live.retCode.TYPE.ERR, errcode);
}};
Live.Login = function (conf) {
    var conf = {}, clearLoginCookieCbObj = $j.Callbacks("unique"), openLoginCbObj = $j.Callbacks("unique"), closeLoginCbObj = $j.Callbacks("unique"), loginCbObj = $j.Callbacks("unique"), loginCancelCbObj = $j.Callbacks("unique"), logoutCbObj = $j.Callbacks("unique"), userInfoChangedCbObj = $j.Callbacks("unique");
    this.getConfig = function (key) {
        return conf[key];
    }
    this.setConfig = function (key, val) {
        if (typeof key == "string") {
            conf[key] = val;
        }
        else {
            $j.extend(conf, key);
        }
    }
    this.addClearLoginStatusCallback = clearLoginCookieCbObj.add;
    this.addOpenLoginCallback = openLoginCbObj.add;
    this.addCloseLoginCallback = closeLoginCbObj.add;
    this.addLoginCallback = loginCbObj.add;
    this.addLoginCancelCallback = loginCancelCbObj.add;
    this.addLogoutCallback = logoutCbObj.add;
    this.addUserInfoChangedCallback = userInfoChangedCbObj.add;
    this.onClearLoginStatus = clearLoginCookieCbObj.fireWith;
    this.onOpenLogin = openLoginCbObj.fireWith;
    this.onCloseLogin = closeLoginCbObj.fireWith;
    this.onLoginSuccess = loginCbObj.fireWith;
    this.onLoginCancel = loginCancelCbObj.fireWith;
    this.onLogout = logoutCbObj.fireWith;
    this.onUserInfoChanged = userInfoChangedCbObj.fireWith;
}
$j.each(['getUin', 'getNick', 'getAvatar', 'getSkey', 'openLogin', 'logout', 'isLogin', 'clearLoginCookie', 'getEncUin', 'setStatus'], function (key, val) {
    Live.Login.prototype[val] = function () {
    };
});
Live.login = (function () {
    var instance = null;
    return{init: function (conf) {
        if (instance instanceof Live.Login) {
            instance.setConfig(conf);
        }
        else {
            instance = new Live.Login(conf);
            $j.extend(Live.login, instance);
        }
    }};
})();
Live.template = {trimpath: "http://imgcache.qq.com/tencentvideo_v1/js/trimpath.min.js", _isLoadingJS: false, _getJsDtd: null, _callStack: 0, _currentTopModifiers: null, FILL_TYPE: {TPL_ID: 1, TPL_STR: 2}, convertTime: function (d) {
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();

    function fillZero(str) {
        return str < 10 ? "0" + str : str;
    }

    return{"year": d.getFullYear(), "month": month, "day": day, "hour": fillZero(hour), "min": fillZero(min), "sec": fillZero(sec)}
}, MODIFIERS: {getAvatar: function (uin, size) {
    return Live.util.getAvatar(uin, size);
}, formatTime: function (str) {
    if (!/\d+/.test(str))
        return str;
    var v = parseInt(str) * 1000;
    var d = new Date(v);
    var dd = Live.template.convertTime(d);
    return[[dd.year, dd.month, dd.day].join("-"), [dd.hour, dd.min, dd.sec].join(":")].join(" ");
}, getTimeLong: function (time) {
    var m = parseInt(time / 60);
    var s = time % 60;
    return"" + m + "分钟" + s + "秒";
}, getTimeLong2: function (time) {
    var m = parseInt(time / 60);
    var s = time % 60;
    return"" + m + "&#039;" + s + "&#034;";
}, getTimeLong3: function (time) {
    var m = parseInt(time / 60);
    var s = time % 60;
    if (m < 10)m = "0" + m;
    if (s < 10)s = "0" + s;
    return[m, ":", s].join("");
}, getFormatNum: function (num) {
    if (!num || typeof(num) != "number")return 0;
    var na = ("" + num).split("").reverse();
    var re = [];
    for (var i = 0, len = na.length; i < len; i++) {
        if (i > 0 && i % 3 == 0) {
            re.push(',');
        }
        re.push(na[i]);
    }
    return re.reverse().join("");
}, encode2: function (str) {
    return encodeURIComponent(str.replace(/<em[^>]+>/g, "").replace(/<\/em>/g, ""));
}, filterComment: function (str) {
    return str.replace(/\\r\\n/ig, "<br/>");
}, encode: function (str) {
    return encodeURIComponent(str);
}, filterStr: function (str) {
    return QZFL.string.filterAngAndQt(str);
}, escHTML: function (str) {
    return QZFL.string.escHTML(str);
}, restHTML: function (str) {
    return QZFL.string.restHTML(str);
}, s2nb: function (str) {
    return QZFL.string.s2nb(str);
}, nl2br: function (str) {
    return QZFL.string.nl2br(str);
}, getTimeDiff: function (time) {
    if (isNaN(time)) {
        return time;
    }
    if (/^\d{10}$/.test(time)) {
        time = time * 1000;
    }
    var dd = new Date(time);
    var now = new Date();
    var todaySec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    var t0 = new Date().valueOf();
    var sec = parseInt((t0 - time) / 1000);
    var strtm = "";
    if (sec < 60) {
        strtm = "刚刚";
    } else if (sec > 60 && sec < 3600) {
        strtm = Math.ceil(sec / 60) + "分钟前";
    } else {
        var dataObj = Live.template.convertTime(dd);
        if (sec >= 3600 && sec < todaySec) {
            strtm = "今天 " + dataObj.hour + ":" + dataObj.min;
        } else if (sec > todaySec && sec < todaySec + 86400) {
            strtm = "昨天 " + dataObj.hour + ":" + dataObj.min;
        } else {
            strtm = dataObj.month + "月" + dataObj.day + "日" + " " + dataObj.hour + ":" + dataObj.min;
        }
    }
    return strtm;
}, template: function (json, tplid) {
    var html = Live.template.fillHtml(json, tplid);
    return html;
}}, fillHtml: function (json, tplid, containerid, isClear, modifiers, filltype, callback, isResetLink) {
    function fill(_json, _tplid, _containerid, _isClear, _modifiers, _filltype, _callback, _isResetLink) {
        Live.template._isLoadingJS = false;
        var $container, hasContainer = true, myTemplateObj, result = "";
        if (typeof _containerid == "string") {
            $container = $j("#" + _containerid);
        } else {
            $container = $j(_containerid);
        }
        if ($container.size() == 0) {
            hasContainer = false;
        }
        if (typeof filltype == "undefined") {
            filltype = Live.template.FILL_TYPE.TPL_ID;
        }
        if ((filltype == Live.template.FILL_TYPE.TPL_ID && !getElementById(_tplid)) || (filltype == Live.template.FILL_TYPE.TPL_STR && !_tplid)) {
            return;
        }
        if (typeof _isClear == "undefined") {
            _isClear = true;
        }
        if (typeof filltype == "undefined") {
            filltype = Live.template.FILL_TYPE.TPL_ID;
        }
        if (Live.template._callStack > 0) {
            _json._MODIFIERS = Live.template._currentTopModifiers;
        } else {
            _json._MODIFIERS = _modifiers || Live.template.MODIFIERS;
            Live.template._currentTopModifiers = _json._MODIFIERS;
        }
        Live.template._callStack++;
        myTemplateObj = filltype == Live.template.FILL_TYPE.TPL_ID ? TrimPath.parseDOMTemplate(_tplid) : TrimPath.parseTemplate(_tplid);
        result = myTemplateObj.process(_json);
        Live.template._callStack--;
        if (Live.template._callStack == 0) {
            Live.template._currentTopModifiers == null;
        }
        if (hasContainer) {
            if (!!_isClear) {
                $container.html(result);
            } else {
                $container.append(result);
            }
            if (!!_isResetLink) {
                $container.find("a").attr("target", "_self");
            }
        }
        if (typeof _callback == "function") {
            _callback(result);
        }
        return result;
    }

    if (typeof TrimPath == "undefined") {
        if (Live.template._isLoadingJS == false) {
            Live.template._isLoadingJS = true;
            Live.template._getJsDtd = $j.ajax({url: Live.template.trimpath, dataType: "script", cache: true});
        }
        Live.template._getJsDtd.done(function () {
            Live.template._isLoadingJS == false;
            fill(json, tplid, containerid, isClear, modifiers, filltype, callback, isResetLink);
        }).fail(function () {
            Live.template._isLoadingJS == false;
            Live.template.fillHtml(json, tplid, containerid, isClear, modifiers, filltype, callback, isResetLink);
        });
    } else {
        return fill(json, tplid, containerid, isClear, modifiers, filltype, callback, isResetLink);
    }
}};
seajs.config({alias: {'slider': 'tencentvideo/widget/slider.js?v=20131016', 'widget.follow': 'tencentvideo/widget/follow.js?v=20131226', 'widget.follow_core': 'tencentvideo/widget/follow_core.js?v=20131226'}, paths: {'tencentvideo': "http://qzs.qq.com/tencentvideo_v1/js"}});
Live = Live || {};
Live.txv = {isLoaded: false, ver: "$Rev: 11343 $", lastmodify: "$Date: 2011-09-29 10:37:23 +0800 (周四, 29 九月 2011) $", isDebug: false};
var txv = window.txv = Live.txv;
Live.tj2.keyPrefix = "txv.";
Live.virtualpgv.virtualPath = "/txv/";
if (QZFL && QZFL.object) {
    QZFL.object.extend(Live, {inArray: function (elem, array) {
        if (Live.object.getType(array) != "array")
            return-1;
        for (var i = 0, length = array.length; i < length; i++) {
            if (array[i] === elem)
                return i;
        }
        return-1;
    }});
    if (location.hostname != "v.qq.com" || (QZFL.userAgent.ie && QZFL.userAgent.ie < 8)) {
        QZFL.Storage.helperUrl = "http://v.qq.com/storage_helper.html";
        QZFL.Storage.setOptions({share: true});
    }
}
Live.txv.path = {trimpath: "http://imgcache.qq.com/tencentvideo_v1/js/trimpath.min.js", filmCritic: "http://sns.video.qq.com/fcgi-bin/liveportal/getfilmcritic?otype=json", userComment: "http://sns.video.qq.com/fcgi-bin/liveportal/comment?otype=json", videoInfo: "http://sns.video.qq.com/tvideo/fcgi-bin/video?otype=json", videoTagInfo: "http://sns.video.qq.com/tvideo/fcgi-bin/vtag?otype=json", search_cgi: "http://v.qq.com/search.html?pagetype=3", search_suggest: "http://sns.video.qq.com/fcgi-bin/soso_suggestion?sm_category=3&sm_need_num=10&otype=json&sm_key=", search_suggest2: "http://s.video.qq.com/smartbox?plat=2&ver=0&num=10&otype=json&query=", pingfencgi: "http://sns.video.qq.com/fcgi-bin/portalscore?otype=json", favouritecgi: "http://sns.video.qq.com/fcgi-bin/liveportal/favorite", weiboget: "http://sns.video.qq.com/tvideo/fcgi-bin/opmicroblog?otype=json", weiboSend: "http://sns.video.qq.com/tvideo/fcgi-bin/pubmblog", weiboSend_2: "http://sns.video.qq.com/tvideo/fcgi-bin/livepubmblog4po", videoRelate: "http://sns.video.qq.com/tvideo/fcgi-bin/relatedvideo?otype=json", singerMVList: "http://sns.video.qq.com/tvideo/fcgi-bin/GetSingerMV?otype=json", flashReport: "http://rcgi.video.qq.com/tencentvideo_report?", html5_video_cgi: "http://vv.video.qq.com/geturl?otype=json", addMvMusicBox: "http://s.plcloud.music.qq.com/fcgi-bin/fcg_mvlist_add.fcg", queryMvMusicBox: "http://s.plcloud.music.qq.com/fcgi-bin/fcg_mvlist_isadded.fcg", delMvMusicBox: "http://s.plcloud.music.qq.com/fcgi-bin/fcg_mvlist_mod.fcg", mvMusicFav: "http://qzone-music.qq.com/fcg-bin/fcg_mvlist_add.fcg", videoViewNum: "http://sns.video.qq.com/tvideo/fcgi-bin/viewnum?otype=json", getCoverInfo: "http://sns.video.qq.com/fcgi-bin/coverdetail?otype=json", hls_video_cgi: "http://vv.video.qq.com/gethls?otype=json&format=2", coverViewNum: "http://sns.video.qq.com/fcgi-bin/dlib/dataout_pc?auto_id=55&otype=json", videoRecommend: "http://sns.video.qq.com/fcgi-bin/dlib/dataout_pc?auto_id=163&otype=json", bokeplayhost: "play.v.qq.com", kid_list_autodata: "http://sns.video.qq.com/fcgi-bin/dlib/dataout_pc?auto_id=53&", bookcgi: "http://sns.video.qq.com/fcgi-bin/liveportal/nbook", getBookCgi: 'http://sns.video.qq.com/fcgi-bin/liveportal/norder', recommendCgi: "http://sns.video.qq.com/tvideo/fcgi-bin/spvote", queryHistoryRecordCgi: "http://ncgi.video.qq.com/tvideo/fcgi-bin/myview", addHistoryRecordCgi: "http://rcgi.video.qq.com/report/myviewreport", batchgetscoreCgi: "http://sns.video.qq.com/tvideo/fcgi-bin/batchgetscore", batchgetplaymount: "http://sns.video.qq.com/tvideo/fcgi-bin/batchgetplaymount", myopnumCgi: "http://ncgi.video.qq.com/tvideo/fcgi-bin/myopnum", getVideoListCgi: "http://c.v.qq.com/vuserinfor", getUserULikeCgi: "http://sns.video.qq.com/tvideo/fcgi-bin/favVideo", userOrderListCgi: "http://pay.video.qq.com/fcgi-bin/order", myinterestCgi: "http://ncgi.video.qq.com/tvideo/fcgi-bin/myinterest", myfollowfeedsCgi: "http://c.v.qq.com/myfollowfeeds", getVideoRecommonCgi: "http://sns.video.qq.com/tvideo/fcgi-bin/mediacommend", getCoverRecommonCgi: "http://sns.video.qq.com/fcgi-bin/dlib/dataout_pc?auto_id=162&", getUserUploadVideoNumCgi: "http://c.v.qq.com/uvcount", checkIsVip: "http://pay.video.qq.com/fcgi-bin/payvip?otype=json", getUserPayTicket: "http://pay.video.qq.com/fcgi-bin/getmyticket?otype=json", exchange: "http://pay.video.qq.com/fcgi-bin/cdkey_exchange?otype=json", userAllTicket: "http://pay.video.qq.com/fcgi-bin/user_ticket?otype=json", web_report: "http://rcgi.video.qq.com/web_report", getVuserInfo: "http://c.v.qq.com/vuserinfoget?otype=json", checkfollowviewed: "http://c.v.qq.com/checkfollowviewed?&otype=json"};
txv.Event = {loadedFollow: "loaded_follow"};
$j.extend(Live.template.MODIFIERS, {getZY_TV_URL: function (tvid) {
    if (!tvid || tvid == "")tvid = -1;
    return["http://v.qq.com/variety/type/list_", tvid, "_0_0.html"].join("");
}, getZY_TP_URL: function (lxid) {
    if (!lxid || lxid == "")lxid = -1;
    return["http://v.qq.com/variety/type/list_", lxid, "_0_0.html"].join("");
}, getPlayUrl: function (cid) {
    return txv.common.getPlayUrl(cid);
}, getDetailUrl: function (cid, typeid) {
    return txv.common.getDetailUrl(cid, typeid || 0);
}, getVideoPlayUrl: function (vid) {
    return txv.common.getVideoPlayUrl(vid);
}, getBokePlayUrl: function (vid) {
    return txv.common.getBokePlayUrl(vid);
}, searchurl: function (tag) {
    return txv.path.search_cgi + "&ms_key=" + encodeURIComponent(tag);
}, getVideoSnap: function (vid) {
    return txv.common.getVideoSnap(vid, 0);
}, getKuainvPlayUrl: function (cid) {
    if (!cid)
        return"";
    if (cid.length == 15) {
        var str = [txv.common.rootPath, "/kuainv/cover/", cid.charAt(0), "/", cid, ".html"].join("");
        return str;
    }
    return"";
}});
Live.txv.template = Live.template;
$j.extend(Live.Login.prototype, {isLogin: function () {
    return(this.getUin() > 10000);
}, getUin: function () {
    if (this.getSkey() == "") {
        return 0;
    }
    var uin = parseInt(Live.cookie.get(this.getConfig('uinCookie')).replace(/^o0*/g, ""), 10);
    if (!uin || uin <= 10000) {
        uin = parseInt(Live.cookie.get(this.getConfig('luinCookie')).replace(/^o0*/g, ""), 10);
        if (!uin || uin <= 10000) {
            return 0;
        }
    }
    return uin;
}, getEncUin: function () {
    if (this.getSkey() == "") {
        return"";
    }
    var n = Live.cookie.get(this.getConfig('encuinCookie'));
    if (n == "") {
        return n;
    }
    var arr = n.split("|");
    if (arr[1] && arr[1] == this.getUin()) {
        return decodeURIComponent(arr[0]);
    }
    return"";
}, getNick: function () {
    if (this.getSkey() == "") {
        return"";
    }
    var n = Live.cookie.get(this.getConfig('nickCookie'));
    if (n == "") {
        return n;
    }
    var arr = n.split("|");
    if (arr[1] && arr[1] == this.getUin()) {
        return decodeURIComponent(arr[0]);
    }
    return"";
}, getAvatar: function (size) {
    if (this.getSkey() == "") {
        return"";
    }
    var n = Live.cookie.get(this.getConfig('nickCookie'));
    if (n == "") {
        return n;
    }
    var arr = n.split("|"), uin = this.getUin();
    if (arr[1] && arr[1] == uin) {
        if (arr[2]) {
            size = txv.login.getValidAvatarSize(size);
            return decodeURIComponent(arr[2]).replace(/([\?&]?s=)40([&$])/, "$1" + size + "$2");
        }
    }
    return"";
}, getValidAvatarSize: function (size) {
    var sizeArr = txv.login.getConfig('avatarSize');
    if ($j.inArray(size, sizeArr) == -1) {
        return sizeArr[0];
    }
    return size;
}, setStatus: function (iscallback, reloadnick) {
    if (txv.login.getUin() == 0) {
        txv.login.logout();
        return;
    }
    if (txv.login.getNick() == "" || reloadnick == true) {
        $j.getScript(txv.login.getConfig('login_cgi') + "&_=" + new Date().valueOf() + "&g_tk=" + $j.getToken(), function () {
            if (typeof QZOutputJson != "undefined") {
                if (QZOutputJson.result && QZOutputJson.result.code == "0") {
                    if (typeof QZOutputJson.encuin != "undefined") {
                        if (location.host.indexOf("qq.com") >= 0) {
                            Live.cookie.set(txv.login.getConfig('encuinCookie'), QZOutputJson.encuin + "|" + txv.login.getUin(), location.host, "/");
                        }
                    }
                    if (location.host.indexOf("qq.com") >= 0) {
                        Live.cookie.set(txv.login.getConfig('nickCookie'), [QZOutputJson.nick, txv.login.getUin(), QZOutputJson.qqface, QZOutputJson.has100].join("|"), location.host, "/");
                    }
                    txv.login.showOnline(QZOutputJson.nick, QZOutputJson.qqface, QZOutputJson.has100);
                    if (typeof QZOutputJson.nick != "undefined") {
                        if (iscallback != false && typeof txv.login.getConfig('success') == "function") {
                            txv.login.getConfig('success')();
                            txv.login.setConfig('success', null);
                        }
                        if (!txv.login.getConfig('disLogCallback') && reloadnick) {
                            txv.login.onLoginSuccess();
                        }
                        txv.login.setConfig('disLogCallback', false);
                    }
                }
                else if (QZOutputJson.result && QZOutputJson.result.code != "0") {
                    if (QZOutputJson.result.code == "100001") {
                        txv.login.logout();
                    }
                    else if (QZOutputJson.result.code == "2504") {
                        txv.login.showOnline();
                    }
                }
            }
            else {
                txv.login.logout();
            }
        });
        $j.util.report("http://sns.video.qq.com/tvideo/fcgi-bin/loginstat");
    }
    else {
        txv.login.showOnline();
        if (iscallback == true && typeof txv.login.getConfig('success') == "function") {
            txv.login.getConfig('success')();
            txv.login.setConfig('success', null);
        }
        txv.login.onLoginSuccess();
    }
}, isLowLogin: function () {
    var skey = Live.string.trim(Live.cookie.get("skey")), uin = Live.string.trim(Live.cookie.get(txv.login.getConfig("uinCookie")));
    return txv.login.isLogin() && (!skey || !uin);
}, showOnline: function (nickname, avatar, exist100) {
    var login_nick = $e("#login_nick,[data-type='nickname'],._nickname"), login_action = $e("#login_action"), $login_avatar = $j("[data-type='avatar'],._avatar");
    login_nick.text(nickname && decodeURIComponent(nickname) || txv.login.getNick());
    login_action.text(txv.login.getConfig('logout_btn_text'));
    login_action.unbind("click");
    login_action.bind("click", txv.login.logout);
    if (typeof exist100 == "undefined") {
        var n = Live.cookie.get(this.getConfig('nickCookie')), arr = n.split("|");
        if (n == "" || arr.length < 4) {
            exist100 = 1;
        }
        else {
            if (arr[1] && arr[1] == this.getUin()) {
                if (typeof arr[3] != "undefined") {
                    exist100 = arr[3];
                }
                else {
                    exist100 = 1;
                }
            }
        }
    }
    if ($login_avatar.size() > 0) {
        var img = new Image(), avatar_url = typeof avatar == "string" ? avatar : txv.login.getAvatar();
        img.onload = function () {
            $login_avatar.each(function (i, element) {
                var $el = $j(element), size = txv.login.getValidAvatarSize(parseInt($el.attr("data-avatarsize"), 10)), url = avatar_url;
                if (exist100 == 1) {
                    url = avatar_url.replace(/([\?&]?s=)40([&$])/, "$1" + size + "$2");
                }
                $el.attr("src", url);
            });
        }
        img.src = avatar_url;
    }
}, showNotLogin: function () {
    var login_nick = $j("#login_nick,_nickname"), login_action = $j("#login_action");
    login_nick.html(txv.login.getConfig('logout_nick_html'));
    login_action.text(txv.login.getConfig('login_btn_text'));
    login_action.unbind("click");
    login_action.bind("click", txv.login.openLogin);
}, showMask: function (centerId, w, h, showAtCenter, onScroll) {
    var hookScroll, $center = $j("#" + centerId);
    showAtCenter = typeof showAtCenter == "undefined" ? true : showAtCenter;
    if (!getElementById("mask_layer")) {
        $e("body").create("div", {"id": "mask_layer", "class": "mask_layer"});
        if (Live.userAgent.ie == 6) {
            $e("#mask_layer").css("height", document.documentElement.scrollHeight);
        }
    }
    else {
        $e("#mask_layer").show();
    }
    if ($center.length == 0) {
        return;
    }
    if (showAtCenter) {
        txv.login.showAtCenter(getElementById(centerId), w, h);
        if (QZFL.userAgent.ie == 6 || txv.common.isIframe()) {
            var hookDom = txv.common.isIframe() ? top : window, timer = null;
            if ($j.isFunction(txv.login.onHideMask)) {
                txv.login.onHideMask();
            }
            onScroll = $j.isFunction(onScroll) ? onScroll : QZFL.emptyFn;
            hookScroll = function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    txv.login.showAtCenter(getElementById(centerId), w, h);
                    onScroll();
                }, 50);
            }
            txv.login.onHideMask = function () {
                $j(hookDom).unbind('scroll', hookScroll);
            }
            $j(hookDom).bind('scroll', hookScroll);
        }
        else {
            $center.css("position", "fixed");
        }
    }
    if (typeof txv.login.onShowMask == "function") {
        txv.login.onShowMask();
    }
}, hideMask: function () {
    $e("#mask_layer").hide();
    if ($j.isFunction(txv.login.onHideMask)) {
        txv.login.onHideMask();
    }
}, openLogin: function (_config) {
    txv.login.isOpend = true;
    Live.object.extend(txv.login.config, _config);
    txv.login.setConfig(_config);
    var url = "", loginwin, width = 490, heigh = 328, jumpurl = txv.login.config.jumpurl, clientjumpurl = txv.login.config.clientjumpurl, baseUrl = txv.login.getPtloginUrl(), applogopic = "http://i.gtimg.cn/qqlive/images/20130521/i1369106644_1.jpg?max_age=6048000", siteLogo = "";
    if (getElementById("login_win") == null) {
        $e("body").create("div", {"id": "login_win", "innerHTML": "<iframe name=\"_login_frame_quick_\" id=\"_login_frame_quick_\" frameborder=\"no\" scrolling=\"no\" width=\"100%\" height=\"100%\" src=\"about:blank\"><\/iframe>"});
    }
    loginwin = getElementById("login_win");
    loginwin.style.display = "none";
    window.__j_url = clientjumpurl;
    if (QZFL.userAgent.isiPhone) {
        baseUrl += "&style=8&hln_css=" + encodeURIComponent(applogopic);
        width = 320;
        heigh = 475;
    }
    else if (QZFL.userAgent.android) {
        baseUrl += "&style=9&hln_css=" + encodeURIComponent(applogopic);
        width = 320;
        heigh = 427;
    }
    else {
        baseUrl += "&style=11&hln_logo=" + encodeURIComponent(siteLogo);
    }
    url = [baseUrl, "&appid=", txv.login.config.appid, "&f_url=loginerroralert&qlogin_auto_login=0", "&s_url=", escape("http://v.qq.com/toolpages/redirect.html?clientjumpurl=" + escape(clientjumpurl || window.location.href) + "&jumpurl=" + jumpurl)].join('');
    getElementById("_login_frame_quick_").src = url;
    if (txv.login.config.showMask && !txv.common.useHtml5()) {
        txv.login.showMask("login_win", width, heigh);
    }
    else {
        txv.login.showAtCenter(loginwin, width, heigh);
    }
    try {
        if (txv.login.isLogin() && txv.login.getSkey() != "") {
            Live.tj2.button("LOGIN.UIN_OPEN");
        }
    }
    catch (err) {
    }
    txv.log("[openlogin]:uin=" + txv.login.getUin() + ",skey=" + txv.login.getSkey());
    txv.login.onOpenLogin();
}, getPtloginUrl: function () {
    var url = "http://ui.ptlogin2.qq.com/cgi-bin/login?link_target=blank&target=self";
    if (!this.getConfig('useStrictLogin')) {
        url += "&low_login=1";
    }
    return url;
}, showAtCenter: function (loginwin, w, h) {
    $j.util.showAtCenter(loginwin, w, h);
}, clearLoginCookie: function (isFireCb) {
    Live.cookie.set(txv.login.getConfig('nickCookie'), "", location.host, "/", -24);
    Live.cookie.set(txv.login.getConfig('encuinCookie'), "", location.host, "/", -24);
    if (txv.login.getConfig('useStrictLogin') == false) {
        Live.cookie.set(txv.login.getConfig('luinCookie'), "", ".qq.com", "/", -24);
        Live.cookie.set("lskey", "", ".qq.com", "/", -24);
    }
    Live.cookie.set("skey", "", ".qq.com", "/", -24);
    txv.login.showNotLogin();
    if (typeof isFireCb != "boolean" || isFireCb) {
        txv.login.onClearLoginStatus();
    }
}, logout: function (evt) {
    txv.login.clearLoginCookie();
    if (typeof txv.login.getConfig('logout') == "function") {
        txv.login.getConfig('logout')(evt);
    }
    txv.login.onLogout(evt);
}, getSkey: function () {
    var skey = Live.string.trim(Live.cookie.get("skey"));
    if (this.getConfig('useStrictLogin')) {
        return skey;
    }
    else {
        return skey || Live.string.trim(Live.cookie.get("lskey"));
    }
}});
Live.login.init();
Live.txv.login = Live.login;
$j.extend(Live.txv.login, {config: {appid: "532001601", uinCookie: "uin", luinCookie: "luin", encuinCookie: "encuin", nickCookie: "lw_nick", quickLogin: true, jumpurl: "", clientjumpurl: null, showMask: true, success: null, logout: null, rejectLogin: null, login_cgi: "http://c.video.qq.com/cgi-bin/login?otype=json", show_uniq: false, show_content: "", login_btn_text: "登录", logout_btn_text: "[退出]", logout_nick_html: "", disLogCallback: false, useStrictLogin: true, avatarSize: [40, 100]}, init: function (config, iscallback) {
    iscallback = !!iscallback;
    $j.extend(this.config, config);
    this.setConfig(this.config);
    this.setStatus(iscallback, false);
    $j(document).delegate("[data-type='logout']", "click",function (evt) {
        evt.preventDefault();
        txv.login.logout();
    }).delegate("[data-type='login']", "click", function (evt) {
        evt.preventDefault();
        txv.login.clearLoginCookie();
        txv.login.openLogin();
    });
}});
(function () {
    var onResize = $j.isFunction(window.ptlogin2_onResize) ? window.ptlogin2_onResize : QZFL.emptyFn, onClose = $j.isFunction(window.ptlogin2_onClose) ? window.ptlogin2_onClose : QZFL.emptyFn, onSuccess = $j.isFunction(window.ptlogin2_onSuccess) ? window.ptlogin2_onSuccess : QZFL.emptyFn, rdt = $j.isFunction(window.__rdt__) ? window.__rdt__ : QZFL.emptyFn;
    window.ptlogin2_onResize = function (width, height) {
        getElementById("_login_frame_quick_").style.height = height + "px";
        getElementById("_login_frame_quick_").style.width = width + "px";
        txv.login.showAtCenter(getElementById("login_win"), width, height);
        onResize(width, height);
    }
    window.ptlogin2_onClose = function (isSuc) {
        var rejectLogin = txv.login.getConfig('rejectLogin');
        $e("#login_win").remove();
        txv.login.isOpend = false;
        txv.login.hideMask();
        if (isSuc) {
            ptlogin2_onSuccess();
        }
        else {
            if (typeof rejectLogin == "function") {
                rejectLogin();
            }
        }
        txv.login.onCloseLogin();
        onClose(isSuc);
    }
    window.ptlogin2_onSuccess = function () {
        txv.login.setStatus(true, true);
        onSuccess();
    }
    window.__rdt__ = function () {
        if (!!__j_url)
            while (__j_url.indexOf('%') != -1 && __j_url.indexOf('?') == -1) {
                __j_url = unescape(__j_url);
            }
        else {
            window.location.reload();
        }
        window.location.href = __j_url;
        rdt();
    }
})();
txv.Popmanager = function (name) {
    this.status = txv.Popmanager.StatusDef.CLOSE;
    this.name = name;
    this.switchStatus = function (status) {
        status = parseInt(status, 10);
        if (status == this.status) {
            return;
        }
        var instances = txv.Popmanager.getAllInstances(), key, ret;
        switch (status) {
            case txv.Popmanager.StatusDef.CLOSE:
            {
                ret = true;
                for (key in instances) {
                    if (instances[key].getStatus() === txv.Popmanager.StatusDef.OPEN && key != this.getName()) {
                        ret = false;
                        break;
                    }
                }
                if (ret) {
                    txv.Popmanager.onHidePop();
                }
                break;
            }
            case txv.Popmanager.StatusDef.OPEN:
            {
                ret = true;
                for (key in instances) {
                    if (key != this.getName() && txv.Popmanager.StatusDef.OPEN === instances[key].getStatus()) {
                        ret = false;
                        break;
                    }
                }
                if (ret) {
                    txv.Popmanager.onShowPop(this.getName());
                }
                break;
            }
        }
        this.status = status;
    };
    this.open = function () {
        this.switchStatus(txv.Popmanager.StatusDef.OPEN);
    };
    this.close = function () {
        this.switchStatus(txv.Popmanager.StatusDef.CLOSE);
    };
    this.getStatus = function () {
        return this.status;
    };
    this.getName = function () {
        return this.name;
    };
};
(function () {
    var instances = {}, showPopCb = new Live.Callback("unique"), hidePopCb = new Live.Callback("unique");
    txv.Popmanager.addInstance = function (name) {
        if (!(instances[name]instanceof txv.Popmanager)) {
            instances[name] = new txv.Popmanager(name);
        }
        return instances[name];
    };
    txv.Popmanager.getAllInstances = function () {
        return instances;
    };
    txv.Popmanager.onShowPop = function (popname) {
        showPopCb.fire(popname);
    };
    txv.Popmanager.onHidePop = function (popname) {
        hidePopCb.fire(popname);
    };
    txv.Popmanager.addShowPopCallback = showPopCb.add;
    txv.Popmanager.addHidePopCallback = hidePopCb.add;
    txv.Popmanager.StatusDef = {OPEN: 1, CLOSE: 2};
})();
Live.txv = Live.txv || {};
Live.txv.log = function (msg) {
    Live.txv.log_arr.push(msg);
    if (txv.log.isdebug == 2) {
        QZFL.console.print(msg);
    }
}
Live.txv.log_arr = [];
Live.txv.logDump = function () {
    if (typeof txv.logDump.render == "function") {
        txv.logDump.render();
    }
    else {
        $j.getScript("http://" + QZFL.config.domain + "/tencentvideo_v1/js/txv.logdump.min.js", function () {
            txv.logDump.render();
        });
    }
}
Live.txv.trace = function (msg) {
    if (txv.log.isdebug >= 1) {
        QZFL.console.print(msg);
    }
}
Live.txv.dump = function (obj) {
    if (txv.log.isdebug >= 1 && typeof console == "object") {
        console.dir(obj);
    }
}
Live.txv.log.isdebug = -1;
Live.txv.common = {rootPath: "", conf: {needGoToLoginPage: false, needShowVipIcon: true, needInitPageHotKey: true, needWinSafariHack: false, isFilmPage: false, needInitSearchBar: true, alwaysShowMytvMenu: false, needInitNav: true, useStrictLogin: true, noRightTips: {1: "暂不支持在网页播放，点击打开客户端播放", 3: "暂不支持网页播放，请到视频手机端观看", 4: "暂不支持网页播放，请到视频平板端观看", 5: "暂不支持网页播放，请到视频手机端观看", 8: "暂不支持网页播放，请到视频TV端观看", toclient: "暂不支持网页播放，请到视频客户端观看", none: "暂不支持网页播放"}, pageType: ""}, popNameDef: {SEARCH: "smartboxPop", HISTORY: "historyPop", COLLECT: "collectPop", MESSAGE: "mynoticePop", AVATAR: "avatarPop", LOGIN: "loginPop", TIPS: "tipsPop"}, _onScrollCbObj: new Live.Callback("unique"), addScrollCallback: function (fn) {
    txv.common._onScrollCbObj.add(fn);
}, getUrlParam: function (p, u) {
    return $j.util.getUrlParam(p, u);
}, extendAjaxSetup: function () {
    if (!this.conf.useStrictLogin) {
        typeof $j != "undefined" && $j.ajaxSetup ? $j.ajaxSetup({low_login: true}) : QZFL.object.extend(QZFL.ajaxHandle.ajaxSettings, {low_login: true});
    }
}, initPage: function (extData) {
    extData = extData || {};
    var playPageFlag = QZFL.object.getType(extData) == "object" && extData.playPageFlag ? extData.playPageFlag : false, modV2MainHead = getElementById("txvLeftSitemap"), isV2 = !!modV2MainHead || !!getElementById("headSimpleV2"), isV3 = !!getElementById("head_v3"), $historyLink;
    txv.log("init page");
    if (!!txv.common.initPageFlag) {
        return;
    }
    if (location.host != "film.qq.com") {
        txv.vip.changeErrHandle(Live.emptyFn);
    }
    Live.object.extend(txv.common.conf, extData);
    txv.common.initPageFlag = true;
    if (this.conf.needWinSafariHack) {
        this.winSafariHack();
    }
    this.extendAjaxSetup();
    this.initClientPortalHack();
    txv.login.init({useStrictLogin: this.conf.useStrictLogin}, true);
    if (this.conf.needInitNav) {
        if (isV2) {
            setTimeout(function () {
                txv.common.initMainNavSubNav();
            }, 0);
            if (txv.common.useHtml5()) {
                if (QZFL.userAgent.isiPhone) {
                    $e(document.body).addClass("iphone");
                }
                else if (QZFL.userAgent.isiPad) {
                    $e(document.body).addClass("ipad");
                }
                $historyLink = $e("#toggleHistory");
                $historyLink.attr("target", "self")
                $historyLink.attr("href", "javascript:;");
            }
            !!modV2MainHead ? txv.common.initMainNavV2() : txv.common.initSimpHeadV2(playPageFlag);
            this.initSearchBar(playPageFlag, !!modV2MainHead, isV2);
            this.initNavPop(isV2);
            txv.headfavorite.init();
            txv.common.initMsgCenter();
        }
        else if (isV3) {
            txv.common.initNavV3(playPageFlag);
        }
        txv.history.init(playPageFlag, isV2 || isV3);
    }
    if (txv.common.conf.needShowVipIcon) {
        txv.common.initVipIcon();
    }
    if (txv.common.isWebqq()) {
        $e(".mod_login").hide();
        $e("a").attr("target", "_self");
        var searchform = document.sform;
        if (!!searchform) {
            searchform.target = "_self";
        }
    }
    Live.lazyLoad.init(["img"]);
    txv.common.initPageHotKey(isV2);
    Live.QTAG.init();
    Live.openviplinkreport.init();
    if (!!extData && extData.watch == true) {
    }
    if (!!extData && !!extData.tj2 && !!extData.tj2.forbidden) {
    }
    else {
        Live.tj2.pv((!!extData && !!extData.tj2) ? extData.tj2 : null);
    }
    txv.common.getNickInterval();
    if (!!Live.lazyreport) {
        Live.lazyreport.report();
    }
}, initNavV3: function (playflag) {
    this.initSearchBar(playflag, true, true);
    this.initNavPop(true);
    this.rewriteMytvs();
    this.initHeadAvatar();
    $e("._checklogin").bind("click", function (event) {
        if (!txv.login.isLogin()) {
            event.preventDefault();
            txv.login.openLogin();
        }
    });
    var $nav = $j('#nav_v3'), $head = $j("#head_v3"), hasNav = $nav.size() > 0, hasHead = $head.size() > 0, fixNav = $nav.attr("data-fixed") == 1, fixHead = $head.attr("data-fixed") == 1, responseSubnav = hasNav && $nav.attr("data-notresponse") != 1, fixNav = $nav.attr("data-fixed") == 1, fixHead = $head.attr("data-fixed") == 1, responseSubnav = hasNav && $nav.attr("data-notresponse") != 1, managerOpen = false, popDef = this.popNameDef;

    function subNav() {
        if (!hasNav || !responseSubnav) {
            return;
        }
        var $subnavs = $nav.find(".list_item_hassub").on("mouseenter",function () {
            $nav.addClass('navigation_open');
            $j(this).addClass('list_item_open');
        }).on("mouseleave", function (event) {
            $j(this).removeClass('list_item_open');
            $nav.removeClass('navigation_open');
        });
    }

    function fixHeadAndNav() {
        if (!hasHead) {
            return;
        }
        var timer, $body = $j("body"), lastScrTop = 0, directDefine = {UP: -1, DOWN: 1}, direct = directDefine.DOWN;
        $j(window).bind("scroll", function (event) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                var scroTop = QZFL.dom.getScrollTop(), clientHei = QZFL.dom.getClientHeight(), bodyPadding = parseInt($body.css("paddingTop"), 10);
                if (QZFL.userAgent.ie != 6 && fixNav && fixHead) {
                    if (scroTop > bodyPadding) {
                        $nav.addClass("navigation_fixed");
                        $head.addClass("site_head_fixed");
                    }
                    else {
                        $head.removeClass("site_head_fixed");
                        $nav.removeClass("navigation_fixed");
                    }
                    if (scroTop < lastScrTop) {
                        direct = directDefine.UP;
                        $head.removeClass("site_head_hide");
                        $nav.removeClass("navigation_hide");
                        if (!responseSubnav) {
                            $nav.addClass("navigation_open");
                        }
                    }
                    else if (scroTop > lastScrTop && scroTop > bodyPadding) {
                        direct = directDefine.DOWN;
                        $head.addClass("site_head_hide");
                        $nav.addClass("navigation_hide").removeClass("navigation_open");
                        if (responseSubnav) {
                            $j(".list_item_open").removeClass("list_item_open");
                        }
                    }
                    lastScrTop = scroTop;
                }
                txv.common._onScrollCbObj.fire(scroTop, clientHei, direct);
            }, 50);
        });
    }

    function addClsToHtml() {
        var osCls = "";
        if (QZFL.userAgent.windows < 6.1) {
            osCls = "os_winxp";
        }
        else if (QZFL.userAgent.windows >= 6.1) {
            osCls = "os_win";
        }
        else if (QZFL.userAgent.isiPad || QZFL.userAgent.isiPhone || QZFL.userAgent.isiPod) {
            osCls = "os_ios";
        }
        else if (QZFL.userAgent.macs) {
            osCls = "os_mac";
        }
        osCls && $e("html").addClass(osCls);
    }

    addClsToHtml();
    fixHeadAndNav();
    subNav();
}, rewriteMytvs: function () {
    var v3old = {notLoginCls: "quick_pop_empty_login", contentTpl: '<ul class="quick_pop_list">{list}</ul><a href="http://v.qq.com/mytv/follow.html" target="_blank" class="btn_pop_link btn_pop_more" _hot="mynav.collectmore.{pageType}"><span class="ico_text">查看更多</span></a>', itemTpl: '<li><i class="dot"></i><a href="{url}" title="{hoverTitle}" class="video_name" target="{target}" _hot="mynav.collectlist.{pageType}" _qtag="nav.collect">{tn}{n}</a></li>'}, v3Cfg = {noContentCls: "quick_pop_empty", noContentTpl: '<div class="quick_pop_empty"><i class="ico_favorites_95"></i><p class="empty_txt">{tips}</p></div>', notLoginTpl: "<div class=\"quick_pop_empty quick_pop_empty_login\">" + "<a href=\"javascript:;\" data-type=\"login\" class=\"btn_login\"><span class=\"btn_inner\">登&nbsp;&nbsp;录</span></a>" + "<p class=\"empty_txt\">{tips}</p>" + "</div>"};
    if (!$j("#new_ver").size()) {
        $j.extend(v3Cfg, v3old);
    }
    txv.headfavorite.init(v3Cfg);
    this.initMsgPopV3();
    QZFL.object.extend(txv.history, {navSize: 5, notLoginNoResultTpl: '<div class="quick_pop_empty quick_pop_empty_login">' + '<a href="javascript:;" class="btn_login" data-type="login"><span class="btn_inner">登&nbsp;&nbsp;录</span></a>' + '<p class="empty_txt">请登录查看历史记录</p>' + '</div>', noResultTpl: '<div class="quick_pop_empty">' + '<i class="ico_history_95"></i>' + '<p class="empty_txt">{tips}</p>' + '</div>', dayTpl: '<dt><span class="dot_wrap"><i class="dot"></i></span><span class="timeline_date">{text}</span></dt>'});
}, initHeadAvatar: function () {
    var myAvatarPop = txv.Popmanager.addInstance(this.popNameDef.AVATAR), $trigger = $j("#mod_head_user"), $pop = $j("#mod_head_user_pop"), $avatar = $trigger.find("img"), defaultAvatar = $avatar.attr("src"), $vipLogo = $trigger.find("[data-type='viplogo']"), openCls = "open", menu, popHeight;

    function notLogin() {
        $vipLogo.hide();
        $avatar.attr("src", defaultAvatar);
        $trigger.attr("title", "未登录");
        $trigger.removeClass(openCls);
        myAvatarPop.close();
    }

    if ($pop.size() == 1) {
        menu = new Live.FloatMenu({menu: $pop, area: $trigger, isNeedChangeDisplay: false, areaOutdelay: 100, onShow: function (obj) {
            var uin = txv.login.getUin();
            if (txv.login.isLogin()) {
                $trigger.addClass(openCls);
                myAvatarPop.open();
                if (!popHeight && txv.common.conf.playPageFlag) {
                    popHeight = 1;
                    $j('<iframe src="about:blank" frameborder="0" class="iframe_mask"></iframe>').insertBefore("#mod_head_user_content");
                }
            }
        }, onHide: function (obj) {
            myAvatarPop.close();
            $trigger.removeClass(openCls);
        }});
    }
    if (txv.login.isLogin()) {
        $vipLogo.show();
        $trigger.attr("title", "");
    }
    txv.login.addLoginCallback(function () {
        $vipLogo.show();
        $trigger.attr("title", "");
    });
    txv.login.addLogoutCallback(notLogin);
    txv.login.addClearLoginStatusCallback(function () {
        notLogin();
        myAvatarPop.close();
        $trigger.removeClass(openCls);
    });
}, initMainNavV2: function () {
    var isSupportTransition = txv.common.isSupportedCSSProperty("transition"), navMenu, $nav = $e("#txvLeftSitemap"), isAlwayShowNav = true, showNavCls = "unfold", $menu, h = 39, menu, $toggle, $modPop, mod, showCls = "hover", $mainNav = $e("#toggleShowNav");

    function toggleNav(isShow) {
        var $link = $e("#modTxvMainHeadLink");
        if (isShow && !txv.common.useHtml5()) {
            $mainNav.addClass("cur");
            $link.attr("href", "http://v.qq.com");
            $link.attr("title", "首页");
            $link.text("首页");
        }
        else {
            $mainNav.removeClass("cur");
            $link.attr("href", "javascript:;");
            $link.attr("title", "分类导航");
            $link.text("分类导航");
        }
    }

    if (txv.common.useHtml5() || !isSupportTransition) {
        if (!$nav.hasClass(showNavCls)) {
            $menu = $nav.find(".mod_nav_site");
            isAlwayShowNav = false;
            h = $menu.find("li").size() * h;
            navMenu = new Live.FloatMenu({menu: $menu, area: $mainNav, areaOutdelay: 100, effectShow: true, effectShowDuration: 100, menuHeight: h, onShow: function (obj) {
                txv.common.btnTj("mainnav.hover");
                toggleNav(true);
                $nav.addClass(showNavCls);
            }, onHide: function (obj) {
                $nav.removeClass(showNavCls);
                toggleNav(false);
            }});
        }
        $toggle = $e("#modHeadToggleDownloadPop");
        $modPop = $e("#modHeadDownloadPop");
        mod = getElementById("modHeadDownload");
        menu = new Live.FloatMenu({menu: $modPop, area: $toggle, areaOutdelay: 100, isNeedChangeDisplay: false, onShow: function (obj) {
            QZFL.css.addClassName(mod, showCls);
        }, onHide: function (obj) {
            QZFL.css.removeClassName(mod, showCls);
        }});
    }
    if (isAlwayShowNav == false || !$nav.hasClass(showNavCls)) {
        $nav.onMouseEnter(function (evt) {
            txv.common.btnTj("mainnav.hover");
            toggleNav(true);
        });
        $nav.onMouseLeave(function (evt) {
            toggleNav(false);
        });
    }
    txv.common.initTopBanner();
}, initTopBanner: function () {
    var $mod = $e("#modTopBanner");
    if (txv.common.useHtml5()) {
        $mod.remove();
    }
    else if ($mod.size() == 1) {
        $mod.show();
        $mod.delegate("a.top_banner_close", "click", function () {
            $mod.remove();
        });
    }
}, winSafariHack: function () {
    if (QZFL.userAgent.windows && QZFL.userAgent.safari) {
        $e(document.body).addClass("win_safari");
    }
    else {
        this.macSafariAndChromeHack();
    }
}, macSafariAndChromeHack: function () {
    if (QZFL.userAgent.macs) {
        if (QZFL.userAgent.safari) {
            $e(document.body).addClass("mac_safari");
        }
        else if (QZFL.userAgent.chrome) {
            $e(document.body).addClass("mac_chrome");
        }
    }
}, initNavPop: function (isV2) {
    var $modHistory = null, $modSearch = null, isIe6 = (QZFL.userAgent.ie == 6), h, $mod, historyPop, collectPop, smartboxPop, loginPop, tipsPop;
    historyPop = txv.Popmanager.addInstance(this.popNameDef.HISTORY);
    txv.history.addShowHistoryCallback(function () {
        if (isV2 && txv.common.conf.playPageFlag && isIe6) {
            txv.history.adaptPopHeight();
        }
        historyPop.open();
    });
    txv.history.addHideHistoryCallback(function () {
        historyPop.close();
    });
    collectPop = txv.Popmanager.addInstance(this.popNameDef.COLLECT);
    txv.headfavorite.addShowListCb(function () {
        collectPop.open();
    });
    txv.headfavorite.addHideListCb(function () {
        collectPop.close();
    });
    smartboxPop = txv.Popmanager.addInstance(this.popNameDef.SEARCH);
    Live.SearchBox.addOnShowSelectorCallBack(function () {
        var mod;
        if (txv.common.conf.playPageFlag && isIe6) {
            if (!$modSearch) {
                $modSearch = $e("#modHeadSearchSuggest");
            }
            $modSearch.find("iframe").css("height", QZFL.dom.getSize("mod_keywords_list")[1] + "px");
        }
        smartboxPop.open();
    });
    Live.SearchBox.addOnHideSelectorCallBack(function () {
        smartboxPop.close();
    });
    loginPop = txv.Popmanager.addInstance(this.popNameDef.LOGIN);
    txv.login.addOpenLoginCallback(function () {
        loginPop.open();
    });
    txv.login.addCloseLoginCallback(function () {
        loginPop.close();
    });
    tipsPop = txv.Popmanager.addInstance(this.popNameDef.TIPS);
    txv.tips.addOnHideTipsCallBack(function () {
        tipsPop.close();
    });
    txv.tips.addOnShowTipsCallBack(function () {
        tipsPop.open();
    });
}, initSimpHeadV2: function (playPageFlag) {
    txv.nav = {};
    txv.nav.myhome = {};
    function onShowMenu() {
        if (QZFL.lang.isFunction(txv.nav.myhome.onShowMenu)) {
            txv.nav.myhome.onShowMenu();
        }
    }

    function onHideMenu() {
        if (QZFL.lang.isFunction(txv.nav.myhome.onHideMenu)) {
            txv.nav.myhome.onHideMenu();
        }
    }

    function getVideoPageY() {
        var player = $e("#mod_player"), top;
        if (player.size() == 1) {
            top = player.offset ? player.offset().top : player.getXY()[1];
        }
        return top;
    }

    var $newNav = $e("#modNewSimpleNav"), $modChannel = $e("#modNavChannels"), $toggle, isSetHeight = false, $menu = $modChannel.find(".pop_nav_channels"), iPopMoreHeight, navHeight = 45, iPlayerTop, isCaled = false, showCls = "hover", navMenu, simplNavMenuPop;
    if ($newNav.size() == 1) {
        simplNavMenuPop = txv.Popmanager.addInstance("simplNavMenuPop");
        $toggle = $e("#modSimpleNavMore");
        navMenu = new Live.FloatMenu({menu: $menu, area: $toggle, areaOutdelay: 100, isNeedChangeDisplay: false, onShow: function (obj) {
            onShowMenu();
            $modChannel.addClass(showCls);
            if (QZFL.userAgent.ie == 6) {
                $menu.css("display", "block");
            }
            if (!playPageFlag) {
                return;
            }
            if (!isSetHeight && QZFL.userAgent.ie == 6) {
                $modChannel.find("iframe").css("height", ($menu.attr("clientHeight") || 100) + "px");
                isSetHeight = true;
            }
            if (typeof iPopMoreHeight == "undefined") {
                if ($menu.height) {
                    iPopMoreHeight = $menu.height();
                }
                else {
                    iPopMoreHeight = $menu.getSize()[1];
                }
            }
            if (!isCaled) {
                iPlayerTop = getVideoPageY();
            }
            if (!iPlayerTop || iPopMoreHeight + navHeight > iPlayerTop) {
                simplNavMenuPop.open();
            }
        }, onHide: function (obj) {
            $modChannel.removeClass(showCls);
            if (QZFL.userAgent.ie == 6) {
                $menu.css("display", "");
            }
            onHideMenu();
            if (!playPageFlag || !iPlayerTop || iPopMoreHeight + navHeight > iPlayerTop) {
                simplNavMenuPop.close();
            }
        }});
    }
    if (playPageFlag) {
        setTimeout(function () {
            var dom = $menu.get(0);
            if (!dom.nodeType) {
                dom = $menu.eq(0);
            }
            QZFL.dom.createElementIn("iframe", dom, true, {src: "about:blank", className: "iframe_mask", frameborder: "0"});
        }, 20);
    }
}, getAvatar: function (uin, size) {
    size = size || 50;
    return["http://qlogo", uin % 4 + 1, ".store.qq.com/qzone/", uin, "/", uin, "/", size].join("");
}, isSupportedCSSProperty: (function () {
    var div = null, prefix = 'Khtml O Moz Webkit'.split(' '), len = prefix.length;
    return function (prop) {
        var ret = false, idx = 0;
        if (!QZFL.lang.isString(prop)) {
            return ret;
        }
        if (!div) {
            div = document.createElement("div");
        }
        if (prop in div.style) {
            ret = true;
        }
        else if (("-ms-" + prop)in div.style) {
            ret = true;
        }
        else {
            prop = prop.replace(/^[a-z]/, function (val) {
                return val.toUpperCase();
            });
            for (; idx < len; idx++) {
                if ((prefix[idx] + prop)in div.style) {
                    ret = true;
                    break;
                }
            }
        }
        return ret;
    }
})(), initVipIcon: function (isSetVisibility) {
    var modIconId = "header_vip_icon", modIcon = getElementById(modIconId);

    function loginCallback() {
        txv.vip.isVip(txv.common.refreshHeadVipIcon);
    }

    txv.login.addLogoutCallback(function () {
        isSetVisibility ? QZFL.dom.setStyle(modIcon, "visibility", "hidden") : QZFL.dom.setStyle(modIcon, "display", "none");
        $e("[_type=vipBtnText]").text("开通会员");
    });
    txv.login.addLoginCallback(loginCallback);
    if (txv.login.isLogin()) {
        loginCallback();
    }
}, refreshHeadVipIcon: function (isVip) {
    var modIconId = "header_vip_icon", modIcon, $modIcon;
    if (txv.common.conf.isFilmPage) {
        modIcon = getElementById(modIconId);
        $modIcon = $e(modIcon);
        if (isVip) {
            $modIcon.removeClass("icon_notVip").removeClass("ico_dianying_gray").attr("title", "会员续费");
            $e("[_type=vipBtnText]").text("会员续费");
        }
        else {
            $modIcon.addClass("icon_notVip").attr("title", "开通会员");
            $e("[_type=vipBtnText]").text("开通会员");
        }
        QZFL.dom.setStyle(modIcon, "visibility", "");
        QZFL.dom.setStyle(modIcon, "display", "");
    }
    else {
        if (isVip) {
            $e("[data-type='viplogo']").removeClass("ico_vip_grey").addClass("ico_vip");
        }
        else {
            $e("[data-type='viplogo']").removeClass("ico_vip").addClass("ico_vip_grey");
        }
    }
}, initPageHotKey: function (isV2) {
    if (!this.conf.needInitPageHotKey) {
        return;
    }
    $e(document).undelegate("a", "click").delegate("a", "click", function (evt) {
        if (!QZFL.lang.isElement(this))
            return;
        var hotEle = null;
        var target = QZFL.event.getTarget(evt);
        while (this != target && QZFL.lang.isElement(target)) {
            if (!!target.getAttribute("_hot")) {
                hotEle = target;
                break;
            }
            target = target.parentNode;
        }
        if (!hotEle) {
            if (!!this.getAttribute("_hot")) {
                hotEle = this;
            }
        }
        if (!!hotEle) {
            Live.QTAG.checkQtag(hotEle, evt);
        }
        txv.common.checkHotLazyReport(this, !!hotEle ? hotEle.getAttribute("_hot") : '', evt);
    }, true);
    $e(document).undelegate("[_hot]", "click").delegate("[_hot]", "click", function (evt) {
        if (!QZFL.lang.isElement(this))
            return;
        var hasAlink = false;
        var target = QZFL.event.getTarget(evt);
        while (document != target && QZFL.lang.isElement(target)) {
            if ('A' == target.tagName) {
                hasAlink = true;
                break;
            }
            target = target.parentNode;
        }
        if (!hasAlink) {
            txv.common.checkHotLazyReport(this, this.getAttribute("_hot"), evt);
        }
    }, true);
}, initMainNavSubNav: function () {
    var id = "mod_nav_sub_list", $modList = $e("#" + id), width = 0, gap = 0, totalWidth, $linkItems = $modList.find("a.nav_itme"), sum = $linkItems.size();
    if ($modList.size() == 1 && sum > 0 && $modList.hasClass("mod_nav_sub_adaptive")) {
        totalWidth = $modList.getParent().attr("clientWidth");
        $linkItems.each(function (el) {
            width += el.clientWidth - parseFloat(QZFL.dom.getStyle(el, "paddingLeft")) - parseFloat(QZFL.dom.getStyle(el, "paddingRight"));
        });
        gap = (totalWidth - width) / (sum * 2);
        QZFL.css.insertStyleSheet(id + "_style", '.mod_nav_sub ul li .nav_itme{padding:0 ' + gap + 'px}');
        if ($modList.animate) {
            $j("#mod_nav_sub_list").animate({opacity: 1}, 50);
        }
        else {
            $modList.fadeIn({speed: 20});
        }
    }
}, initSearchBar: function (playPageFlag, isMainNav, isV2) {
    if (!txv.common.conf.needInitSearchBar) {
        return false;
    }
    var $mod_search = $e("#mod_search"), modSearchWord, modSugWrap, form, $form, searchIframeId = "txv_iframe_" + new Date().getTime(), isMainNav = typeof(isMainNav) == "boolean" ? isMainNav : QZFL.lang.isElement(getElementById("head_main")), conf = {}, type = isMainNav || isV2 ? Live.SearchBox.typedef.COMPLEX : Live.SearchBox.typedef.SIMPLE;
    modSearchWord = getElementById("iWord");
    var time = new Date().getTime();
    if (QZFL.lang.isElement(modSearchWord)) {
        if (modSearchWord.value == "") {
            QZFL.Storage.get("txv_search_keyword", function (v) {
                if (QZFL.lang.isString(v) && v) {
                    v = v.split("|");
                    modSearchWord.value = QZFL.string.filterAngAndQt(v[0]);
                }
            });
        }
        else {
            if (isMainNav) {
                QZFL.Storage.set("txv_search_keyword", [modSearchWord.value, time].join("|"));
            }
            else {
                QZFL.Storage.get("txv_search_keyword", function (v) {
                    if (QZFL.lang.isString(v) && v) {
                        v = v.split("|");
                        if (v[1] + 3600000 < time) {
                            QZFL.Storage.set("txv_search_keyword", [modSearchWord.value, time].join("|"));
                        }
                        else {
                            modSearchWord.value = QZFL.string.filterAngAndQt(v[0]);
                        }
                    }
                });
            }
        }
    }
    form = getElementById("sform");
    $form = $e(form);
    modSugWrap = getElementById("modHeadSearchSuggest");
    conf = {suggestCgi: txv.path.search_suggest2, searchCgi: txv.path.search_cgi, callback: {onInputboxFocus: function () {
        $form.addClass("focus");
    }, onInputboxBlur: function () {
        $form.removeClass("focus");
    }}};
    var searchbarins = Live.SearchBox.defaultInit(type, conf);
    searchbarins.addOnShowSelectorCallBack(function () {
        if (playPageFlag && !getElementById(searchIframeId) && QZFL.lang.isElement(modSugWrap)) {
            QZFL.dom.createElementIn("iframe", modSugWrap, true, {className: "iframe_mask", src: "about:blank", id: searchIframeId, frameborder: "0"});
        }
        QZFL.dom.setStyle(modSugWrap, "display", "block");
    });
    searchbarins.addOnHideSelectorCallBack(function () {
        QZFL.dom.setStyle(modSugWrap, "display", "none");
    });
    if (playPageFlag && document.sformFoot) {
        Live.SearchBox.defaultInit(Live.SearchBox.typedef.DEFAULT, {searchForm: document.sformFoot, inputBox: $e("#iWordFoot"), sugSelector: $e("#sgt_list_foot"), sugCover: $e("#mod_keywords_list_foot"), searchBtn: $e("#sbuttonFoot"), defaultCls: "foot_search_txt", suggestCgi: txv.path.search_suggest});
        if (QZFL.lang.isElement(modSearchWord)) {
            $e("#iWordFoot").val(modSearchWord.value);
        }
    }
}, initMytvMenu: function (playPageFlag) {
}, getNickInterval: function () {
    var interTimers = 0, retry = 0, intertimer = null;

    function _error() {
        if (++retry <= 5) {
            setTimeout(sendget, 60000);
        }
        else {
            clearInterval(intertimer);
            intertimer = null;
        }
    }

    function sendget() {
        if (txv.login.isLogin()) {
            $j.ajax({url: txv.login.config.login_cgi, dataType: "jsonp", CSRF: true, success: function (json) {
                if (!!json && !!json.result && json.result.code == 0) {
                    retry = 0;
                    Live.tj2.button("PTLOGIN.SKEY_INTER." + (interTimers++), "/virtualpage/skey.html");
                }
                else {
                    _error();
                }
            }, error: _error});
        }
    }

    intertimer = setInterval(sendget, 1800000);
}, bindBtnTj: function () {
    $e("._hotkey").bind("click", function () {
        txv.common.btnTj(this.getAttribute("_hot"));
    });
}, btnTj: function (key) {
    if (typeof key == "string") {
        key = key.replace("{pagetype}", txv.common.getCurPageType());
    }
    Live.tj2.button(key);
}, isIframe: function () {
    return(window != top);
}, isWebqq: function () {
    if (!txv.common.isIframe())
        return false;
    try {
        if (typeof top.webqq != "undefined") {
            return true;
        }
    }
    catch (e) {
        return false;
    }
}, showDevImg: function () {
}, getDetailUrl: function (coverid, typeid) {
    typeid = typeid || 0;
    var pathname = "";
    if (typeid == 0 || Live.inArray(typeid, [1, 2, 98]) >= 0) {
        pathname = "/detail/";
    }
    else {
        pathname = "/cover/";
    }
    return[txv.common.rootPath, pathname, coverid.charAt(0), "/", coverid, ".html"].join("");
}, getPlayUrl: function (id, videoid) {
    id = id || videoid;
    if (!id)
        return"";
    if (id.length > 0 && id === videoid) {
        return txv.common.getPlayUrl(id);
    }
    if (id.length == 15) {
        var str = [txv.common.rootPath, "/cover/", id.charAt(0), "/", id, ".html"].join("");
        if (!!videoid) {
            str += "?vid=" + videoid;
        }
        return str;
    }
    else {
        return txv.common.getVideoPlayUrl(id);
    }
}, getLinkAttr: function (allrights, cid, vid) {
    if (!allrights || allrights.indexOf("+2+") != -1) {
        return null;
    }
    var m = /\+(\d)\+/g.exec(allrights), tipsCfg = txv.common.conf.noRightTips, obj = {target: "_self", url: "javascript:;"};
    for (var k = 1, l = m.length; k < l; k++) {
        var tip = tipsCfg[m[k]];
        if (tip) {
            obj.hoverTitle = tip;
            if (m[k] == 1) {
                if (QZFL.userAgent.windows) {
                    if (QZFL.string.isURL(cid)) {
                        obj.url = cid;
                    }
                    else {
                        obj.url = Live.util.getBpPlayUrl(cid, vid);
                    }
                }
                else {
                    obj.hoverTitle = tipsCfg.toclient;
                    obj.url = "javascript:;";
                }
            }
            return obj;
        }
    }
    obj.hoverTitle = tipsCfg.none;
    return obj;
}, getPrevUrl: function (id, videoid, typeid) {
    if (typeof typeid == "undefined" || !typeid) {
        typeid = 0;
    }
    var str = [txv.common.rootPath, (typeid <= 2 ? "/prev/" : "/cover/"), id.charAt(0), "/", id].join("");
    if (!!videoid) {
        if (typeid == 2) {
            str += "/" + videoid + ".html";
        }
        else {
            str += ".html?vid=" + videoid;
        }
    }
    else {
        str += ".html";
    }
    return str;
}, getVideoPlayUrl: function (vid) {
    if (typeof(vid) !== "string" || vid.length < 11) {
        return"";
    }
    return[txv.common.rootPath, "/page/", vid.substr(0, 1), "/", vid.substr(9, 1), "/", vid.substr(10, 1), "/", vid, ".html"].join("");
}, getBokePlayUrl: function (vid) {
    if (typeof(vid) !== "string" || vid.length < 11) {
        return"";
    }
    return[txv.common.rootPath, "/boke/page/", vid.substr(0, 1), "/", vid.substr(9, 1), "/", vid.substr(10, 1), "/", vid, ".html"].join("");
}, filterUrlPramaVid: function (vid) {
    if (!!vid) {
        var pVidOk = true;
        var pVids = vid.split("|");
        for (var i = 0; i < pVids.length; i++) {
            var v = pVids[i].split("_");
            if (v[0].length != 11 || (v.length == 2 && isNaN(v[1])) || v.length > 2) {
                pVidOk = false;
                break;
            }
        }
        if (pVidOk) {
            return vid;
        }
        else {
            return"";
        }
    }
    return"";
}, getStaticPlayUrl: function (cid, vid) {
    var str = [txv.common.rootPath, "/cover/", cid.charAt(0), "/", cid, ".html?vid=", vid].join("");
    return str;
}, getPayUrl: function (cid) {
    return["/pay/newpay.html?id=", cid].join("");
}, getVideoSnap: function (lpszVID, idx) {
    var szPic;
    var uin;
    var hash_bucket = 10000 * 10000;
    var object = lpszVID;
    if (lpszVID.indexOf("_") > 0) {
        var arr = lpszVID.split("_");
        lpszVID = arr[0];
        idx = parseInt(arr[1]);
    }
    var uint_max = 0x00ffffffff + 1;
    var hash_bucket = 10000 * 10000;
    var tot = 0;
    for (var inx = 0; inx < lpszVID.length; inx++) {
        var nchar = lpszVID.charCodeAt(inx);
        tot = (tot * 32) + tot + nchar;
        if (tot >= uint_max)
            tot = tot % uint_max;
    }
    uin = tot % hash_bucket;
    if (idx == undefined)
        idx = 0;
    if (idx == 0) {
        szPic = ["http://vpic.video.qq.com/", uin, "/", lpszVID, "_160_90_3.jpg"].join("");
    }
    else {
        szPic = ["http://vpic.video.qq.com/", uin, "/", lpszVID, "_", "160_90_", idx, "_1.jpg"].join("");
    }
    return szPic;
}, getFullUrlPath: function (path) {
    var h = window.location.host;
    if (h == "sns.video.qq.com" || h == "play.v.qq.com" || h == "page.video.qq.com") {
        h = "v.qq.com";
    }
    return[window.location.protocol, "//", h, txv.common.rootPath, path].join("");
}, formatVideoTitle: function (tt) {
    var reg1 = /^(\d{2})(\d{2})(\d{2})([^_]+)(_?\d*)$/ig, reg2 = /^(\d{4})(\d{2})(\d{2})([^_]+)(_?\d*)$/ig;
    if (!reg2.test(tt) && reg1.test(tt)) {
        tt = tt.replace(reg1, "$4 20$1-$2-$3期");
    }
    return tt;
}, useHtml5: function () {
    return $j.util.useHtml5();
}, formatNum: function (num) {
    return $j.util.formatNum(num);
}, gotoLoginPage: function (url) {
    if (txv.common.conf.needGoToLoginPage) {
        var str = "";
        if (!txv.common.conf.useStrictLogin) {
            str = "&low_login=1";
        }
        window.location.href = "http://v.qq.com/pay/login.html?j=" + encodeURIComponent(url || location.href) + str;
    }
    else {
        txv.login.logout();
    }
    if (window.event) {
        window.event.returnValue = false;
    }
}, getClassEn: function (typeid) {
    var de = {"1": "movie", "2": "tv", "3": "cartoon", "4": "sports", "5": "ent", "10": "variety", "14": "variety", "20": "variety", "22": "music", "24": "finance", "9": "doco", "23": "news", "100": "education"}
    return de[typeid] || "";
}, getClassChsName: function (typeid) {
    var de = {"1": "电影", "2": "电视剧", "3": "动漫", "4": "体育", "5": "娱乐", "10": "综艺", "14": "综艺", "20": "综艺", "22": "MV", "24": "财经", "9": "纪录片", "23": "新闻", "100": "教育"}
    return de[typeid] || "";
}, isEventSupported: function (eventName) {
    return $j.util.isEventSupported(eventName);
}, formatTimeBySec: function (s, formatStr) {
    return $j.util.formatTimeBySec(s, formatStr);
}, strToDate: function (timeStr) {
    return $j.util.strToDate(timeStr);
}, getFunCallTrace: function () {
    return $j.util.getFunCallTrace();
}, getCoverImgtagHtml: function (tag, positionArr) {
    var str = '', tag1Tpl = '<sup class="{param}">{text}</sup>', tag2Tpl = '<span class="{param}"><em class="mark_inner">{text}</em></span>', tag3Tpl = '<span class="{param}"><em class="mask_txt">{text}</em></span>', tag4Tpl = '<sup class="{param}">{text}</sup>';
    positionArr = positionArr || [1, 2, 3, 4];
    if (tag) {
        if (tag.tag_3 && tag.tag_3.id > 0 && QZFL.inArray(3, positionArr) != -1) {
            str += QZFL.string.format(tag3Tpl, tag.tag_3);
        }
        if (tag.tag_4 && tag.tag_4.id > 0 && QZFL.inArray(4, positionArr) != -1) {
            str += QZFL.string.format(tag4Tpl, tag.tag_4);
        }
        if (tag.tag_1 && tag.tag_1.id > 0 && QZFL.inArray(1, positionArr) != -1) {
            str += QZFL.string.format(tag1Tpl, tag.tag_1);
        }
        if (tag.tag_2 && tag.tag_2.id > 0 && QZFL.inArray(2, positionArr) != -1) {
            str += QZFL.string.format(tag2Tpl, tag.tag_2);
        }
    }
    return str;
}, checkHotLazyReport: function (ele, hot, evt) {
    if (!ele)
        return;
    var h = ele.getAttribute('href'), t = ele.getAttribute('target');
    h = !!h ? h : '';
    t = !!t ? t : '';
    if ('_blank' == t) {
        !!hot && txv.common.btnTj(hot);
        txv.common.watchReport(ele, hot);
    }
    else {
        if (!h || h.indexOf('javascript') >= 0 || (h.indexOf('http://') == 0 && h.indexOf(location.hostname) < 0 && h.indexOf('http://v.qq.com') < 0 && h.indexOf('http://film.qq.com') < 0)) {
            !!hot && txv.common.btnTj(hot);
            txv.common.watchReport(ele, hot);
        }
        else {
            if (!!Live.lazyreport) {
                !!hot && Live.lazyreport.push('txv.common.btnTj("' + hot + '")');
                Live.lazyreport.push(Live.TXVWATCH.buildUrl(ele, hot));
                setTimeout(function () {
                    Live.lazyreport.report();
                }, 10000);
            }
            else {
                !!hot && txv.common.btnTj(hot);
                txv.common.watchReport(ele, hot);
            }
        }
    }
}, watchReport: function (ele, hot) {
    Live.TXVWATCH.watch(ele, hot);
}, initMsgCenter: function () {
    if (getElementById("mod_head_notice_pop")) {
        var $mod = $e("#mod_head_user"), $avatar = $mod.find("img"), defaultAvatar = $avatar.attr("src"), $vipLogo = $mod.find("[data-type='viplogo']"), $trigger = $e("#mod_head_notice_trigger"), $modSimpleNavLogin = $e("#modSimpleNavLogin");
        $trigger.bind("click", function (evt) {
            if (!txv.login.isLogin()) {
                QZFL.event.preventDefault(evt);
                txv.login.openLogin();
            }
        });
        function initMessage() {
            if (typeof txv.navmessage == "undefined") {
                $j.getScript("http://qzs.qq.com/tencentvideo_v1/js/txv.userbehavior.min.js?max_age=864000&v=20131202", function () {
                    if (txv.navmessage) {
                        txv.navmessage.init();
                        txv.common.addMsgPopInstance();
                    }
                });
            }
            else {
                if (txv.navmessage && !txv.navmessage.isInit) {
                    txv.navmessage.init();
                    txv.common.addMsgPopInstance();
                }
            }
            txv.Popmanager.addShowPopCallback(function () {
                $e("#mod_user_notice_tips").remove();
            });
            $mod.delegate(".btn_close", "click", function (evt) {
                QZFL.event.preventDefault(evt);
                $e("#mod_user_notice_tips").remove();
            });
        }

        function loginCallback() {
            $trigger.attr("title", "");
            $vipLogo.show();
            initMessage();
            $modSimpleNavLogin.hide();
            $mod.show();
        }

        if (txv.login.isLogin()) {
            loginCallback();
        }
        else {
            QZFL.Storage.get("txv_navmessage_notLoginhidetips", function (val) {
                if (val != 1 && $modSimpleNavLogin.size() == 0) {
                    initMessage();
                }
            });
        }
        txv.login.addLoginCallback(loginCallback);
        txv.login.addClearLoginStatusCallback(function () {
            $avatar.attr("src", defaultAvatar);
            $trigger.attr("title", "未登录");
            $vipLogo.hide();
            if ($modSimpleNavLogin.size() == 1) {
                $mod.removeClass('open');
                $mod.hide();
                $modSimpleNavLogin.show();
            }
        });
    }
}, addMsgPopInstance: function () {
    if (typeof txv.navmessage.addShowPopCb == "function") {
        var msgPop = txv.Popmanager.addInstance(txv.common.popNameDef.MESSAGE);
        txv.navmessage.addShowPopCb(function () {
            msgPop.open();
        });
        txv.navmessage.addHidePopCb(function () {
            msgPop.close();
        });
    }
}, initMsgPopV3: function () {
    if (getElementById("mod_head_notice_pop")) {
        var $mod = $e("#mod_head_notice"), $trigger = $e("#mod_head_notice_trigger"), cfg = {isV3: true, noContentTpl: '<div class="quick_pop_empty"><i class="ico_message_95"></i><p class="empty_txt">{tips}</p></div>', itemTpl: '<li id="navmsg_{newsid}"><i class="{icon}"></i><a href="{url}" class="video_name" title="{linkTitle}" target="{target}" _hot="{hot}">{title}<span class="video_name_inner">{desc}</span></a></li>', contentTpl: '<ul class="quick_pop_list" id="mod_navmessage_list">{list}</ul><a href="http://v.qq.com/mytv/message.html" class="btn_pop_link btn_pop_more" _hot="{hot}"><span class="ico_text">查看更多</span></a>'};
        if ($j("#new_ver").size() == 1) {
            $mod = $e("#mod_head_user");
        }
        if (typeof txv.navmessage == "undefined") {
            $j.getScript("http://qzs.qq.com/tencentvideo_v1/js/txv.userbehavior.min.js?max_age=864000&v=20131202", function () {
                if (txv.navmessage) {
                    QZFL.object.extend(txv.navmessage, cfg);
                    txv.navmessage.init({$container: $mod, listSize: 5});
                    txv.common.addMsgPopInstance();
                }
            });
        }
        else {
            if (txv.navmessage && !txv.navmessage.isInit) {
                QZFL.object.extend(txv.navmessage, cfg);
                txv.navmessage.init({$container: $mod, listSize: 5});
                txv.common.addMsgPopInstance();
            }
        }
    }
}, getBpPlayUrl: function (cid, vid) {
    var sRet = "";
    if (cid) {
        sRet = "qqlive://sso/vbarid=" + cid;
    }
    if (vid) {
        sRet += "&videoid=" + vid;
    }
    return sRet;
}, getCurPageType: function () {
    var str = "others", conf = txv.common.conf;
    if (conf.isFilmPage) {
        str = "film";
        if (typeof txv.playpg != "undefined") {
            str = "cover";
        }
    }
    else {
        if (conf.pageType) {
            return conf.pageType;
        }
        if (getElementById("txvSitemap")) {
            if (typeof txv.index != "undefined") {
                str = "index";
            }
            else {
                str = "sort";
            }
        }
        else if (typeof txv.playpg != "undefined") {
            str = "cover";
        }
    }
    return str;
}, setPopIframeHeight: function (popid, height) {
    if (!popid) {
        return;
    }
    if (QZFL.userAgent.ie == 6) {
        var $pop;
        if (typeof popid == "string") {
            $pop = $e("#" + popid);
        }
        else if (popid.size) {
            $pop = popid;
        }
        else {
            return;
        }
        if (typeof height == "undefined" && $pop.size() == 1) {
            if (typeof $pop.height == "function") {
                height = $pop.height();
            }
            else {
                var size = $pop.getSize() || [], padding = parseInt($pop.css("paddingTop"), 10) || 0;
                height = size[1] || 0;
                if (height > padding) {
                    height -= padding;
                }
            }
        }
        if (height > 0) {
            $pop.find("iframe").css("height", height + "px");
        }
    }
}, initClientPortalHack: function () {
    if (navigator.userAgent.indexOf("QQLive") != -1) {
        var hasCall = false;
        txv.login.openLogin = function () {
            if (hasCall) {
                return;
            }
            hasCall = true;
            Live.actionManager.one("cphack_act_openlogin", txv.login.openLogin);
        }
        $j.getScript("http://qzs.qq.com/tencentvideo_v1/js/txv.cphack.min.js?v=20131226&max_age=604800");
    }
}};
QZFL.object.extend(QZFL.string, {filterAngleBrk: function (str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}, filterQuote: function (str) {
    return str.replace(/\x27/g, "&acute;").replace(/\x22/g, "&quot;");
}, filterAngAndQt: function (str) {
    str = QZFL.string.filterAngleBrk(str);
    str = QZFL.string.filterQuote(str);
    return str;
}});
(function () {
    if (txv.log.isdebug == -1) {
        var u = txv.common.getUrlParam("debug"), l = -1;
        switch (u) {
            case"true":
            case"2":
                l = 2;
                break;
            case"trace":
            case"1":
                l = 1;
                break;
        }
        txv.log.isdebug = l;
    }
})();
Live.txv.tips = function (tipTle, tleTxt, cntTxt) {
    this.divName = "ipop";
    this.title = "温馨提示";
    this.showTitle = tleTxt;
    this.showContent = cntTxt;
    this.linkText = "";
    this.linkHref = "";
    this.btnShowText = "";
    this.btnShowHref = "javascript:;";
    this.btnShowClass = "btn_strong"
    this.btnShowTarget = "_self";
    this.btnCloseText = "关闭";
    this.btnCloseClass = "btn_normal";
    this.iconClass = "";
    this.tipsType = txv.tips.ConstTipsType.Message;
    this.needRemind = 0;
    this.needChoose = 0;
    this.textChoose = "";
    this.width = 0;
    this.height = 0;
    this.top = 0;
    this.left = 0;
    this.display = "block";
    this.padding = "0px";
    this.isShowClose = true;
    this.InitPosition();
    this.floatTimer = 2 * 1000;
    this.t_Closer = '<a href="javascript:;" class="mod_pop_close">关闭</a>';
    this._t_Remind = "";
    this.t_Title = "";
    this._t_Choose = "";
    this._t_closeFunc = 0;
    this.showAtCenter = true;
}
Live.txv.tips.ConstTipsType = {Warning: 1, Message: 2, Float: 3}
Live.txv.tips.prototype = {bulitIcon: function () {
    this._Icon = '<div class="icon"><i class="' + this.iconClass + '"></i></div>';
}, bulitHeader: function () {
    this.t_Header = ['<div class="mod_pop_hd">'].join('');
    if (QZFL.lang.isString(this.title) && this.title.length > 0) {
        this.t_Header = [this.t_Header, "<h3>", this.title, "</h3>"].join("");
    }
    else {
        this.t_Header = [this.t_Header, "<h3>", "</h3>"].join("");
    }
    if (this.isShowClose) {
        this.t_Header += this.t_Closer;
    }
    this.t_Header += "</div>";
}, bulitContentTitle: function () {
    this._TitleShow = '<h4 class="title">' + this.showTitle + '</h4>';
}, bulitContent: function () {
    this._Link = (this.linkText != "") ? ('<a href="' + this.linkHref + '">' + this.linkText + '</a>') : '';
    var arr = ['<div class="cont"><p>', this.showContent, this._Link, "</p>"];
    if (this.needChoose && !!this._t_Choose) {
        arr.push(this._t_Choose);
    }
    if (this.needRemind && !!this._t_Remind) {
        arr.push(this._t_Remind);
    }
    arr.push('</div>');
    this._t_ContentShow = arr.join("");
}, bulitNormalTxt: function () {
    this.bulitContentTitle();
    this.bulitContent();
    this._t_TextShow = ['<div class="text">', this._TitleShow, this._t_ContentShow, '</div>'].join("");
}, bulitSimpTxt: function () {
    this._t_TextShow = '<div class="text">' + this.showContent + '</div>';
}, bulitBtn: function () {
    this._BtnShow = (this.btnShowText != '') ? ('<a class="' + this.btnShowClass + '" href="' + this.btnShowHref + '" target="' + this.btnShowTarget + '"><span>' + this.btnShowText + '</span></a>') : '';
    this._BtnClose = (this.btnCloseText != '') ? ('<a class="' + this.btnCloseClass + '" href="javascript:;"><span>' + this.btnCloseText + '</span></a>') : '';
    this._t_BtnText = (this._BtnShow + this._BtnClose) != '' ? '<div class="mod_pop_ft">' + this._BtnShow + this._BtnClose + '</div>' : '';
}, bulitSimpTips: function () {
    this.bulitSimpTxt();
    return['<div class="mod_hint">', this._Icon, this._t_TextShow, "</div>", this._t_BtnText].join("");
}, bulitFloatTips: function () {
    this.bulitSimpTxt();
    return['<div class="mod_hint">', this._Icon, this._t_TextShow, "</div>"].join("");
}, bulitNormalTips: function () {
    this.bulitNormalTxt();
    return[this.t_Header, '<div class="mod_diglog"><div class="diglog_alert"><div class="diglog_alert_inner">', this._Icon, this._t_TextShow, "</div></div></div>", this._t_BtnText].join("");
}, setTipsTitle: function (t) {
    if (typeof(t) === "string") {
        this.title = t;
        this.bulitHeader();
    }
}, setShowAtCenter: function (showAtcenter) {
    if (typeof showAtcenter == "boolean") {
        this.showAtCenter = showAtcenter;
    }
}}
Live.txv.tips.prototype.InitPosition = function () {
    var scrhei = document.body.scrollTop;
    var wid = 373;
    var hei = 235;
    if (this.tipsType === txv.tips.ConstTipsType.Float) {
        var w = (QZFL.userAgent.ie && QZFL.userAgent.ie < 8) ? 20 : 15;
        wid = this.showContent.length * w + 160;
        hei = 110;
    }
    if (0 == scrhei)
        scrhei = document.documentElement.scrollTop;
    var clihei = document.documentElement.clientHeight;
    if (0 == clihei)
        clihei = document.body.clientHeight;
    this.width = wid;
    this.height = hei;
    if (this.showAtCenter) {
        this.top = (clihei / 2 + scrhei) - this.height / 2;
        this.left = (document.body.scrollWidth - this.width) / 2;
    }
    this.position = "absolute";
    this.display = "block";
    this.padding = 0;
}
Live.txv.tips.prototype.onBtnOk = function (event) {
    QZFL.event.preventDefault(event);
}
Live.txv.tips.prototype.onBtnClose = function () {
}
Live.txv.tips.prototype.SetType = function (type) {
    this.tipsType = type;
    switch (type) {
        case Live.txv.tips.ConstTipsType.Warning:
            this.iconClass = 'icon_hint_warn';
            break;
        case Live.txv.tips.ConstTipsType.Message:
        case Live.txv.tips.ConstTipsType.Float:
        default:
            this.iconClass = 'icon_hint_succeed';
            break;
    }
    this.bulitIcon();
}
Live.txv.tips.prototype.SetBtn = function (showBtnTxt, closeBtnTxt, btnShowHref, btnShowTarget) {
    this.btnShowText = showBtnTxt;
    if (!!btnShowHref && !!btnShowTarget) {
        this.btnShowHref = btnShowHref;
        this.btnShowTarget = btnShowTarget;
    }
    if (closeBtnTxt != "") {
        this.btnCloseText = closeBtnTxt;
    }
    this.bulitBtn();
}
Live.txv.tips.prototype.SetLink = function (txt, href) {
    this.linkText = txt;
    this.linkHref = href;
    this.bulitContent();
}
Live.txv.tips.prototype.SetPostion = function (x, y) {
    this.top = y;
    this.left = x;
}
Live.txv.tips.prototype.AddRemind = function () {
    this.needRemind = 1;
    this._t_Remind = '<p class="input_middle"><input type="checkbox" name="input_remind" value="1" id="input_remind" /><label for="input_remind">不再提醒</label></p>';
    this.bulitContent();
}
Live.txv.tips.prototype.AddChoose = function (txt) {
    this.needChoose = 1;
    this._t_Choose = '<p class="input_middle"><input type="checkbox" name="input_choose" value="1" id="input_choose" /><label for="input_choose">' + txt + '</label></p>';
    this.bulitContent();
}
Live.txv.tips.prototype.SetHide = function () {
    $e("#" + this.divName).hide();
    txv.login.hideMask();
}
Live.txv.tips.prototype.HideClose = function () {
    this.isShowClose = false;
}
Live.txv.tips.prototype._init = function () {
    this.bulitBtn();
    this.bulitHeader();
    if (this.tipsType === txv.tips.ConstTipsType.Float) {
        this.tipsHTML = this.bulitFloatTips();
    }
    else {
        this.tipsHTML = this.bulitNormalTips();
    }
}
Live.txv.tips.prototype.FillPage = function () {
    var $body, iframeId = this.divName + "_iframe", $iframe, height, containerId, $me = this, needIframe = (txv.common.conf.playPageFlag && !txv.common.useHtml5());
    if (!getElementById(this.divName)) {
        $body = $e("body");
        $body.create("div", {"id": this.divName, "class": "mod_pop"});
    }
    if (!QZFL.lang.isString(this.tipsHTML) || this.tipsHTML.length <= 0) {
        this._init();
    }
    var divObj = $e("#" + this.divName);
    divObj.hide();
    divObj.html(this.tipsHTML);
    divObj.addClass("mod_pop");
    this.InitPosition();
    divObj.css("width", this.width + "px");
    divObj.css("height", "auto");
    if (this.showAtCenter) {
        divObj.css("top", "50%");
        divObj.css("marginLeft", -this.width / 2 + "px");
        divObj.css("marginTop", -this.height / 2 + "px");
        divObj.css("left", "50%");
    }
    else {
        divObj.css("top", this.top + "px");
        divObj.css("left", this.left + "px");
    }
    divObj.css("position", this.position);
    divObj.css("display", this.display);
    divObj.css("padding", this.padding);
    height = parseInt(divObj.css("height"));
    if (isNaN(height)) {
        var div = getElementById(this.divName);
        if (div) {
            height = div.scrollHeight;
        }
    }
    if (needIframe) {
        divObj.create("iframe", {scrolling: "no", id: iframeId, frameborder: "0"});
        $iframe = $e("#" + iframeId);
        $iframe.hide();
        $iframe.css("position", "absolute");
        $iframe.css("top", "0");
        $iframe.css("left", "0");
        $iframe.css("width", this.width + "px");
        $iframe.css("height", height + "px");
        $iframe.css("border", "none");
        $iframe.css("zIndex", "100");
        $iframe.show();
        var childDiv = divObj.find(">div");
        childDiv.css("position", "relative");
        childDiv.css("zIndex", "101");
    }
    divObj.show();
    if (typeof Live.txv.tips.onShowTips == "function") {
        Live.txv.tips.onShowTips();
    }
    txv.login.showMask(this.divName, this.width, height, this.showAtCenter);
    function hideTips() {
        divObj.hide();
        txv.login.hideMask();
        if (typeof Live.txv.tips.onHideTips == "function") {
            Live.txv.tips.onHideTips();
        }
    }

    divObj.find(".mod_pop_close").bind('click', function () {
        hideTips();
        if (typeof($me.onBtnClose) == "function") {
            $me.onBtnClose();
        }
        try {
            if ($e('#input_remind').elements[0].checked) {
                QZFL.cookie.set('ql_alert', 1, "v.qq.com", "/", 24 * 365 * 2);
            }
        }
        catch (e) {
        }
    });
    if (this.btnShowText != "") {
        divObj.find("." + this.btnShowClass).bind('click', function (event) {
            hideTips();
            if (typeof($me.onBtnOk) == "function") {
                $me.onBtnOk(event);
            }
        });
    }
    divObj.find("." + this.btnCloseClass).bind('click', function () {
        hideTips();
        if (typeof($me.onBtnClose) == "function") {
            $me.onBtnClose();
        }
    });
    if (this.tipsType == txv.tips.ConstTipsType.Float) {
        var timer = isNaN(this.floatTimer) ? 1000 : this.floatTimer;
        setTimeout(function () {
            hideTips();
        }, timer);
    }
}
Live.txv.tips.onShowTipsEventList = [];
Live.txv.tips.onHideTipsEventList = [];
Live.txv.tips.addOnShowTipsCallBack = function (fn) {
    if (typeof fn == "function") {
        Live.txv.tips.onShowTipsEventList.push(fn);
    }
}
Live.txv.tips.addOnHideTipsCallBack = function (fn) {
    if (typeof fn == "function") {
        Live.txv.tips.onHideTipsEventList.push(fn);
    }
}
Live.txv.tips.onShowTips = function () {
    if (QZFL.lang.isArray(Live.txv.tips.onShowTipsEventList)) {
        for (var idx = 0, len = Live.txv.tips.onShowTipsEventList.length; idx < len; idx++) {
            if (typeof Live.txv.tips.onShowTipsEventList[idx] == "function") {
                Live.txv.tips.onShowTipsEventList[idx]();
            }
        }
    }
}
Live.txv.tips.onHideTips = function () {
    if (QZFL.lang.isArray(Live.txv.tips.onHideTipsEventList)) {
        for (var idx = 0, len = Live.txv.tips.onHideTipsEventList.length; idx < len; idx++) {
            if (typeof Live.txv.tips.onHideTipsEventList[idx] == "function") {
                Live.txv.tips.onHideTipsEventList[idx]();
            }
        }
    }
}
Live.txv.tips.ShowTips = function (divId, title, msg1, msg2, btn1, btn2, type, callback) {
    divId = divId || "";
    title = "温馨提示";
    msg1 = msg1 || "";
    msg2 = msg2 || "";
    btn1 = btn1 || "";
    btn2 = btn2 || "";
    type = type || "";
    if (divId == "") {
        return;
    }
    if (msg1 == "") {
        return;
    }
    if (type == "") {
        type = txv.tips.ConstTipsType.Warning;
    }
    var tip = new txv.tips(title, msg1, msg2);
    tip.SetBtn(btn1, btn2);
    tip.SetType(type);
    tip.onBtnOk = function (event) {
        QZFL.event.preventDefault(event);
        tip.SetHide();
        if (typeof(callback) == "function") {
            callback();
        }
    }
    tip.FillPage(divId);
}
Live.txv.tips.ShowFloatTips = function (msg, time) {
    if (QZFL.lang.isString(msg) && msg.length > 0) {
        var tips = new txv.tips();
        tips.showContent = msg;
        if (!isNaN(time)) {
            tips.floatTimer = time * 1000;
        }
        tips.SetType(txv.tips.ConstTipsType.Float);
        tips.FillPage();
    }
}
Live.txv.tips.ShowSimpMsgTips = function (title, msg, btnTxt, cb) {
    if (QZFL.lang.isString(msg) && QZFL.lang.isString(title)) {
        var tips = new txv.tips();
        tips.showTitle = title;
        tips.showContent = msg;
        tips.btnCloseClass = "btn_strong";
        if (!!btnTxt) {
            tips.btnCloseText = btnTxt;
            cb = typeof(cb) === "function" ? cb : QZFL.emptyFn;
            tips.onBtnClose = cb;
        }
        tips.SetType(txv.tips.ConstTipsType.Message);
        tips.FillPage();
    }
}
Live.txv.tips.ShowSimpWarningTips = function (title, msg, btnTxt, cb) {
    if (QZFL.lang.isString(msg) && QZFL.lang.isString(title)) {
        var tips = new txv.tips();
        tips.showTitle = title;
        tips.showContent = msg;
        tips.btnCloseClass = "btn_strong";
        if (!!btnTxt) {
            tips.btnCloseText = btnTxt;
            cb = typeof(cb) === "function" ? cb : QZFL.emptyFn;
            tips.onBtnClose = cb;
        }
        tips.SetType(txv.tips.ConstTipsType.Warning);
        tips.FillPage();
    }
}
Live.txv.vip = (function () {
    var checkVipDeferred = null, checkStorageDefer = null, waitCommit = false, vipInfoObj = null, changeStatusCb = new Live.Callback("unique"), showGetVipInfoErrTips = function () {
        txv.tips.ShowSimpWarningTips("获取会员信息失败", "服务器繁忙，暂时无法获取您的会员信息！请尝试重新登录您的账号。");
        checkVipDeferred = null;
    }, onGetVipInfoErr = showGetVipInfoErrTips, getVipStorageKey = function () {
        return"fm_v_" + txv.login.getUin();
    }, delVipStorageInfo = function () {
        QZFL.Storage.set(getVipStorageKey(), "");
        QZFL.Storage.remove(getVipStorageKey());
    }, getVipStorageInfo = function () {
        if (checkStorageDefer instanceof Live.Deferred) {
            return checkStorageDefer;
        }
        checkStorageDefer = new Live.Deferred();
        if (txv.login.isLogin()) {
            QZFL.Storage.get(getVipStorageKey(), function (v) {
                if (QZFL.object.getType(v) == "object" && QZFL.lang.isString(v.value)) {
                    v = v.value;
                }
                if (!!checkStorageDefer) {
                    if (QZFL.lang.isString(v) && v.length > 0) {
                        checkStorageDefer.resolve(v);
                    }
                    else {
                        checkStorageDefer.reject();
                    }
                }
            });
        }
        else {
            checkStorageDefer.reject();
        }
        return checkStorageDefer;
    }, setLocalVipInfo = function (time) {
        if (txv.login.isLogin() && QZFL.lang.isString(time)) {
            QZFL.Storage.set(getVipStorageKey(), [txv.login.getUin(), time, new Date().getTime()].join("|"));
        }
    }, commitVipByServer = function (defer, needTime, retryCount) {
        if (waitCommit && !retryCount) {
            setTimeout(function () {
                commitVipByServer(defer, needTime);
            }, 25);
            return;
        }
        if (!(defer instanceof Live.Deferred)) {
            return;
        }
        defer.always(function () {
            waitCommit = false;
        });
        defer.done(function (json) {
            if (json && json.endTime) {
                setLocalVipInfo(json.endTime);
            }
        }).fail(delVipStorageInfo);
        if (defer.isFired()) {
            return;
        }
        needTime = needTime ? 1 : 0;
        if (vipInfoObj && (!needTime || vipInfoObj.endTime)) {
            vipInfoObj.vip ? defer.resolve(vipInfoObj) : defer.reject(vipInfoObj);
            return;
        }
        waitCommit = true;
        var retObj = new Live.RetCode(100057);
        $j.ajax({"url": (!!retryCount && retryCount > 0) ? txv.path.checkIsVip.replace("pay.video.qq.com", "paybak.video.qq.com") : txv.path.checkIsVip, "data": {uin: txv.login.getUin(), t: needTime ? 1 : 0}, "dataType": "jsonp", "CSRF": true, "timeout": (!!retryCount && retryCount > 0) ? 4000 : 2000, "beforeSend": function () {
            retObj.begin();
        }, "success": function (json) {
            if (json && json.result) {
                if (json.result.code == 0) {
                    vipInfoObj = {endTime: json.endTime, vip: json.vip};
                    if (!!retryCount && retryCount > 0)
                        retObj.report(Live.retCode.TYPE.SUC, "99"); else
                        retObj.reprotSuc();
                    changeStatusCb.fire(json.vip == 1);
                }
                else if (json.result.code == -11) {
                    retObj.reportErr(json.result.code);
                    txv.login.clearLoginCookie();
                    if (QZFL.lang.isFunction(txv.vip.onNotLogin)) {
                        txv.vip.onNotLogin(defer, needTime);
                    }
                    else {
                        defer.reject(json);
                    }
                    waitCommit = false;
                    gc();
                    reportError({str1: "not login"});
                    return;
                }
                else {
                    retObj.reportErr(json.result.code);
                    onGetVipInfoErr();
                    reportError({str1: "cgi return error code:" + json.result.code});
                }
                if (json.vip) {
                    defer.resolve(json);
                }
                else {
                    defer.reject(json);
                }
            }
            else {
                retObj.reportErr(-13);
                onGetVipInfoErr();
                defer.reject(json);
                reportError({str1: "invalid json"});
            }
        }, error: function (msg) {
            if (!retryCount) {
                commitVipByServer(defer, needTime, 1);
            }
            else {
                msg = msg || "cgi error";
                retObj.reportErr(-500);
                onGetVipInfoErr();
                defer.reject();
                reportError({str1: msg});
            }
        }});
    }, reportError = function (data) {
        var url = "http://rcgi.video.qq.com/web_report?cmd=2562&ctype=1&", img = new Image(), arr = [];
        QZFL.object.extend(data, {ua: navigator.userAgent});
        for (var k in data) {
            arr.push(k + "=" + encodeURIComponent(data[k]));
        }
        url = url + arr.join("&");
        img.src = url;
    }, checkIsVip = function (commitByServer) {
        if (!txv.login.isLogin()) {
            var defer = new Live.Deferred();
            defer.reject();
            return defer;
        }
        if (commitByServer) {
            gc();
            if (!(checkVipDeferred instanceof Live.Deferred)) {
                checkVipDeferred = new Live.Deferred();
            }
            commitVipByServer(checkVipDeferred, true);
            return checkVipDeferred;
        }
        if (!(checkVipDeferred instanceof Live.Deferred)) {
            checkVipDeferred = new Live.Deferred();
        }
        getVipStorageInfo().done(function (cookieval) {
            if (QZFL.lang.isString(cookieval)) {
                var cookievalArr = cookieval.split("|"), curDate = new Date(), oneDay = 24 * 60 * 60 * 1000;
                if (cookievalArr.length == 3 && !isNaN(cookievalArr[2]) && (curDate.getTime() - cookievalArr[2]) < oneDay) {
                    if (!waitCommit && cookievalArr[0] == txv.login.getUin() && txv.common.strToDate(cookievalArr[1]) > curDate) {
                        checkVipDeferred.resolve({endTime: cookievalArr[1]});
                        return;
                    }
                }
            }
            commitVipByServer(checkVipDeferred);
        }).fail(function () {
                commitVipByServer(checkVipDeferred);
            });
        return checkVipDeferred;
    }, isVip = function (fn, commitByServer) {
        fn = QZFL.lang.isFunction(fn) ? fn : QZFL.emptyFn;
        if (!txv.login.isLogin()) {
            fn(false);
        }
        else {
            if (commitByServer || !(checkVipDeferred instanceof Live.Deferred)) {
                checkVipDeferred = checkIsVip(commitByServer);
            }
            checkVipDeferred.always(function () {
                var ret = (checkVipDeferred instanceof Live.Deferred) ? checkVipDeferred.isResolved() : false;
                fn(ret);
            });
        }
    }, gc = function () {
        if (checkVipDeferred instanceof Live.Deferred && checkVipDeferred.isFired()) {
            checkVipDeferred = null;
        }
        if (checkStorageDefer instanceof Live.Deferred && checkStorageDefer.isFired()) {
            checkStorageDefer = null;
        }
        vipInfoObj = null;
    };
    txv.login.addClearLoginStatusCallback(gc);
    txv.login.addOpenLoginCallback(gc);
    return{isVip: isVip, checkIsVip: checkIsVip, commitVipByServer: commitVipByServer, showErrTips: showGetVipInfoErrTips, getVipStorageInfo: getVipStorageInfo, delVipStorageInfo: delVipStorageInfo, changeErrHandle: function (fn) {
        if (QZFL.lang.isFunction(fn)) {
            onGetVipInfoErr = fn;
        }
    }, addChangeStatusCb: changeStatusCb.add, onNotLogin: null};
})()
txv.history = {option: {coverid: '', tit: null, lnk: null, isPay: 0, vid: ""}, nParamDef: {BATCHINFO: 8, ONEINFO: 7, LIST: 1, DELETEONE: 4}, rParamDef: {ONEREPORT: 3, BATCHREPORT: 4, ONEINFO: 6}, rfDefine: {V: "v", FILM: "hlw"}, localStorageItemDefine: {V: {uins: "ten_video_history_uin_storage_key", history: "ten_video_history"}, FILM: {uins: "txv_film_history_uin_storage", history: "txv_film_history"}}, site: "V", mod_id: "history_pop", hisList: null, storageReady: false, localUserStorgeKeyArr: null, uinStorageKey: "ten_video_history_uin_storage_key", historyKey: "ten_video_history", template: '<dd key="{key}"><a href="{lnk}" _hot="mynav.historylist.{pageType}" _qtag="nav.history" title="{hoverTit}" target="{target}" class="video_name">{tit}</a><span class="video_timestamp">{timeTips}</span><a href="javascript:;" _hot="mynav.historydelete.{pageType}"  _key="{key}" data-type="del" title="删除" _idx={idx} class="btn_close">×</a></dd>', rmAllTemp: '<a href="javascript:;" class="btn_clear" id="rmAllHistory"><i class="ico_clear"></i><span class="ico_text">清空播放记录</span></a>', iframeTemp: '<iframe src="about:blank" frameborder="0" class="iframe_mask"></iframe>', byDayTpl: '<dl class="timeline_video_list {cls}">{day}{content}</dl>', dayTpl: '<dt><span class="dot_wrap"><i class="timeline_dot">●</i></span><span class="timeline_date {cls}"><i class="triangle_left"></i>{text}</span></dt>', noResultTpl: '<div class="pop_info_nothing"><i class="ico_film_large"></i><p class="hint_text">{tips}</p></div>', notLoginNoResultTpl: '<div class="pop_info_nothing pop_timeline_login"><a href="javascript:;" class="btn_login" data-type="login">登录</a><p class="hint_text">请登录查看历史记录</p></div>', getMoreBtnTpl: '<a href="http://v.qq.com/mytv/history.html" target="_blank" class="btn_pop_link _checklogin" data-type="getMoreHistory" _hot="mynav.historymore.{pageType}"><span class="ico_text">{tips}</span></a>', noResultCls: "mod_history_pop_nothing", noLoginCls: "mod_history_pop_login", emptyTips: "您暂时还没有历史记录", errorTips: "获取数据失败", timeLongLimit: 300, reportTimer: 0, reportToServerTimeLimit: 30, v2: false, onShowHistory: QZFL.emptyFn, onHideHistory: QZFL.emptyFn, onSwitchUser: function () {
    $e("#" + txv.history.mod_id).html("");
}, localAddLock: false, isBatchReport: false, playPageFlag: false, navSize: 10, onesLocalSize: 10, timeFlagDef: {finish: -2, begin: -1}, lastReportToServerKeyid: "", pageType: "", _onShowContentCbObj: new Live.Callback("unique"), _onHideContentCbObj: new Live.Callback("unique"), addShowHistoryCallback: function (fn) {
    txv.history._onShowContentCbObj.add(fn);
}, addHideHistoryCallback: function (fn) {
    txv.history._onHideContentCbObj.add(fn);
}, setCurVideo: function (opt) {
    QZFL.object.extend(txv.history.option, opt);
    txv.history.onSwitchUser();
}, init: function (playPageFlag, v2) {
    txv.history.v2 = !!v2;
    txv.history.playPageFlag = !!playPageFlag;
    txv.history.pageType = txv.common.getCurPageType();
    var area, $container, menu, $trigger, showCls = "open";
    this.setSite();
    this.setStorageReady();
    if (txv.history.v2) {
        txv.history.initV2();
    }
    else {
        area = $e("#history");
        $container = $e("#" + txv.history.mod_id);
        $trigger = area.find("h6 a");
        if ($trigger.size() == 0) {
            $trigger = $e("#modHistoryTrigger");
            showCls = "mod_history_open";
        }
        menu = new Live.FloatMenu({menu: $container, area: $trigger, areaOutdelay: 100, onShow: function (obj) {
            area.addClass(showCls);
            if (QZFL.string.trim($container.html()).length == 0) {
                txv.history.showEmpty(" 正在努力获取数据..");
                txv.history.showHistory();
            }
            if (getElementById("history_list") && typeof txv.history.onShowHistory == "function") {
                txv.history.onShowHistory();
            }
            txv.history._onShowContentCbObj.fire();
            txv.common.btnTj("mynav.historyhover." + txv.history.pageType);
        }, onHide: function (obj) {
            area.removeClass(showCls);
            if (typeof txv.history.onHideHistory == "function") {
                txv.history.onHideHistory();
            }
            txv.history._onHideContentCbObj.fire();
        }});
    }
    this.bindRm();
    this.initHotReportKey();
    txv.login.addLogoutCallback(function () {
        txv.history.onSwitchUser();
        txv.history.hisList = null;
    });
    txv.login.addClearLoginStatusCallback(function () {
        txv.history.onSwitchUser();
        txv.history.hisList = null;
    });
    if (!playPageFlag) {
        txv.history.batchReportToServer(txv.history.navSize, {withoutLocal: function () {
            txv.history.hisList == null && txv.history.onSwitchUser();
        }});
        txv.login.addLoginCallback(function () {
            txv.history.hisList = null;
            txv.history.onSwitchUser();
            txv.history.isBatchReport = false;
            txv.history.batchReportToServer(txv.history.navSize, {withoutLocal: function () {
                txv.history.hisList == null && txv.history.onSwitchUser();
            }});
        });
    }
}, setStorageReady: function () {
    QZFL.Storage.get("anything", function () {
        txv.history.storageReady = true
    });
}, initV2: function () {
    txv.history.mod_id = "modHistoryContent";
    var isSupportTransition = txv.common.isSupportedCSSProperty("transition"), menu, $toggle, $container = $e("#history_pop"), $modContent = $e("#" + txv.history.mod_id), markToggle = false, markPop = false, timer = null, curCls = "hover", $triggerMod = $e("#modHistory");

    function showHistoryHandle() {
        $triggerMod.addClass("open");
        if (txv.history.playPageFlag && $container.find("iframe").size() === 0) {
            var iframe = document.createElement("iframe"), getDomFnName = "eq", parentNode = $container.find(".pop_info_main").eq(0);
            if (!parentNode.nodeType) {
                parentNode = $container.find(".pop_info_main").get(0);
                getDomFnName = "get";
            }
            iframe.src = "about:blank";
            iframe.frameborder = "0";
            iframe.className = "iframe_mask";
            if (QZFL.lang.isElement(parentNode) && $modContent.size() == 1) {
                parentNode.insertBefore(iframe, $modContent[getDomFnName](0));
            }
        }
        if (QZFL.string.trim($modContent.html()).length == 0) {
            txv.history.showEmpty(" 正在努力获取数据..");
            txv.history.showHistory();
            txv.common.btnTj("history");
        }
        if (typeof txv.history.onShowHistory == "function") {
            txv.history.onShowHistory();
        }
        txv.history._onShowContentCbObj.fire();
        txv.common.btnTj("mynav.historyhover." + txv.history.pageType);
    }

    $toggle = $e("#toggleHistory");
    menu = new Live.FloatMenu({menu: $container, area: $toggle, areaOutdelay: 100, isNeedChangeDisplay: false, onShow: function (obj) {
        showHistoryHandle();
    }, onHide: function (obj) {
        $triggerMod.removeClass("open");
        if (typeof txv.history.onHideHistory == "function") {
            txv.history.onHideHistory();
        }
        txv.history._onHideContentCbObj.fire();
    }});
    $container.undelegate("dl>dd", "mouseover").delegate("dl>dd", "mouseover",function (evt) {
        $container.find("dd." + curCls).removeClass(curCls);
        $e(this).addClass(curCls);
    }, true).undelegate("dl>dd", "mouseout").delegate("dl>dd", "mouseout",function (evt) {
        $e(this).removeClass(curCls)
    }, true).delegate("a[data-type='getMoreHistory']", "click", function (evt) {
        if (!txv.login.isLogin()) {
            QZFL.event.preventDefault(evt);
            txv.login.openLogin();
        }
    }, true);
}, initHotReportKey: function () {
    var json = {pageType: txv.history.pageType};
    txv.history.getMoreBtnTpl = QZFL.string.format(txv.history.getMoreBtnTpl, json);
    txv.history.template = QZFL.string.format(txv.history.template, json);
}, getStorageKey: function (vid, coverid) {
    return QZFL.string.trim([coverid, vid].join("_"));
}, setSite: function () {
    var match = /^(\w+).*$/i.exec(location.hostname);
    if (match && match[1]) {
        var site = match[1].toUpperCase(), df = this.localStorageItemDefine[site];
        if (df) {
            this.site = site;
            this.historyKey = df.history;
            this.uinStorageKey = df.uins;
        }
    }
}, bindRm: function () {
    var $doc = $e(document), $modPop = $e("#" + txv.history.mod_id);
    $modPop.undelegate("[data-type='del']", "click");
    $modPop.delegate("[data-type='del']", "click", function (evt) {
        QZFL.event.preventDefault(evt);
        txv.history.rm(this.getAttribute("_key"), this.getAttribute("_idx") || 0);
        txv.common.btnTj("history.delete");
    });
}, getHistory: function (_conf, callback) {
    var data = {cur: 1, pn: txv.history.navSize, simp: 1}, retObj = new Live.RetCode(100031);
    if (!callback) {
        callback = {success: QZFL.emptyFn, error: QZFL.emptyFn, notLogin: QZFL.emptyFn};
    }
    Live.object.extend(data, _conf, {t: txv.history.nParamDef.LIST, plat: 2, otype: "json"});
    txv.history.requestCgi(txv.path.queryHistoryRecordCgi, data, callback, 100031);
}, requestCgi: function (url, data, callback, reportCode) {
    var retObj = new Live.RetCode(reportCode);
    if (!data.rf) {
        data = txv.history.extendTenvideoData(data);
    }
    $j.ajax({url: url, dataType: "jsonp", data: data, CSRF: true, beforeSend: function () {
        retObj.begin();
    }, success: function (json) {
        if (json && json.result) {
            if (json.result.code == 0) {
                callback.success(json);
                retObj.reportSuc();
                return;
            }
            else if (json.result.code == -11) {
                retObj.reportErr(-11);
                callback.notLogin();
                return;
            }
            else {
                retObj.reportErr(json.result.code);
            }
        }
        else {
            retObj.reportErr(-1);
        }
        callback.error();
    }, error: function () {
        retObj.reportErr(-1);
        callback.error();
    }});
}, getLocalList: function (key, cb, filterFilm) {
    if (typeof(key) !== "string" || key.length === 0) {
        return null;
    }
    return QZFL.Storage.get(key, function (val) {
        var historyList = txv.history.parseLocalRecord(val);
        if (filterFilm) {
            for (var idx = 0, len = historyList.length; idx < len; idx++) {
                if (/\,1$/.test(historyList[idx])) {
                    historyList.splice(idx, 1);
                    idx--;
                    len--;
                }
            }
        }
        typeof cb == "function" && cb(historyList);
    });
}, showLocalHistory: function (count, his) {
    count = count || txv.history.navSize;
    var storagekey = txv.history.makeUserStorageKey(), len, readyShowList = [], time, lnk, tit, ltxt, hasSame;
    if (!QZFL.lang.isArray(his)) {
        txv.history.getLocalList(storagekey, function (historyList) {
            txv.history.showLocalHistory(count, historyList);
        }, this.v2);
        return;
    }
    len = his.length;
    if (len == 0) {
        txv.history.showEmpty();
        return;
    }
    for (var i = 0; i < len; i++) {
        if (typeof(his[i]) != "string") {
            continue;
        }
        var opt = his[i].split(',');
        if (opt.length < 4) {
            continue;
        }
        time = opt[3] * 1;
        ltxt = "继续观看";
        if (time == -2 || time == opt[4]) {
            ltxt = "重新观看";
        }
        lnk = txv.history.getPlayUrl(opt[0], opt[5]);
        tit = QZFL.string.filterAngAndQt(opt[1]);
        readyShowList.push({key: opt[0], lnk: lnk, tit: tit, hoverTit: tit, target: "_blank", idx: i, ltxt: ltxt, date: opt[2], time: time, timeTips: txv.history.getTipsByTime(time, opt[4])});
        if (readyShowList.length === count) {
            break;
        }
    }
    txv.history.v2 ? txv.history.renderHistoryV2(readyShowList) : txv.history.renderHistory(readyShowList);
}, isFinished: function (time, total) {
    time = txv.history.timeAdaptor(time);
    return txv.history.timeLongLimit >= total || time == total || time == txv.history.timeFlagDef.finish;
}, timeAdaptor: function (time, total) {
    if (time < 0) {
        if (time == txv.history.timeFlagDef.finish) {
            time = total;
        }
        else {
            time *= -1;
        }
    }
    return time;
}, getTipsByTime: function (time, total) {
    var tips = "";
    time = parseInt(time, 10);
    total = parseInt(total, 10);
    time = txv.history.timeAdaptor(time, total);
    if (txv.history.isFinished(time, total)) {
        tips = "已看完";
    }
    else if (time >= 3600) {
        if (time % 3600 == 0) {
            tips = txv.common.formatTimeBySec(time, "{h}小时");
        }
        else {
            tips = txv.common.formatTimeBySec(time, "{h}小时{m}分");
        }
        tips = "观看至" + tips;
    }
    else if (time < 60 || isNaN(time)) {
        tips = "观看不足1分钟";
    }
    else {
        if (time % 60 == 0) {
            tips = txv.common.formatTimeBySec(time, "{m}分");
        }
        else {
            tips = txv.common.formatTimeBySec(time, "{m}分{s}秒");
        }
        tips = "观看至" + tips;
    }
    return tips;
}, showHistory: function (count) {
    count = count || txv.history.navSize;
    if (!txv.login.isLogin()) {
        txv.history.showLocalHistory(count);
        return;
    }
    if (txv.history.hisList != null) {
        txv.history.renderContent(txv.history.hisList);
        return;
    }
    txv.history.getHistory({cur: 1, pn: count, simp: 1}, {success: txv.history.renderContent, error: function () {
        txv.history.showEmpty(txv.history.errorTips);
    }, notLogin: function () {
        txv.login.clearLoginCookie();
        txv.history.showLocalHistory(txv.history.navSize);
    }});
}, renderContent: function (json) {
    txv.history.hisList = json;
    if (!json || json.tot == 0 || !json.list) {
        txv.history.showEmpty();
        return;
    }
    var len = json.list.length, tmpObj;
    for (var i = 0; i < len; i++) {
        tmpObj = json.list[i];
        if (!tmpObj.ltxt) {
            tmpObj.ltxt = (tmpObj.time == txv.history.timeFlagDef.finish || tmpObj.time == tmpObj.tl) ? "重新观看" : "继续观看";
        }
        if (!tmpObj.tit) {
            tmpObj.tit = QZFL.string.filterAngAndQt(txv.history.getTitle(tmpObj));
        }
        tmpObj.timeTips = txv.history.getTipsByTime(tmpObj.time, tmpObj.tl);
        tmpObj.key = tmpObj.keyid;
        tmpObj.idx = i;
        tmpObj.hoverTit = tmpObj.tit;
        if (tmpObj.apr && typeof tmpObj.pr != "undefined" && tmpObj.pr != 1) {
            tmpObj.target = "_self";
            var attr = txv.common.getLinkAttr.apply(null, [tmpObj.apr].concat(tmpObj.keyid.split("_")));
            if (attr) {
                tmpObj.lnk = attr.url;
                tmpObj.hoverTit = attr.hoverTitle;
            }
        }
        else {
            if (!tmpObj.lnk) {
                tmpObj.lnk = txv.history.getPlayUrl(tmpObj);
            }
            tmpObj.target = "_blank";
        }
    }
    txv.history.v2 ? txv.history.renderHistoryV2(json.list) : txv.history.renderHistory(json.list);
}, renderHistory: function (readyList) {
    var $container = $e("#" + txv.history.mod_id), d, ul, mod, html = "", idx = 0, len;
    if (!QZFL.lang.isArray(readyList) || readyList.length == 0) {
        txv.history.showEmpty(txv.history.emptyTips);
    }
    else {
        len = readyList.length;
        for (; idx < len; idx++) {
            html += QZFL.string.format(txv.history.template, readyList[idx]);
        }
    }
    txv.trace("renderHistory start");
    if ($container.size() > 0) {
        $container.removeClass(txv.history.noResultCls);
        ul = getElementById("history_list");
        if (ul) {
            txv.trace("already has ul");
            ul.innerHTML = html;
        }
        else {
            if (txv.history.playPageFlag || $container.attr("useIframe") == "1") {
                if ($container.find("iframe").size() == 1) {
                    $container.find("div").remove();
                    d = document.createElement("div");
                    d.innerHTML = txv.history.rmAllTemp;
                    mod = $container.elements[0];
                    QZFL.dom.createElementIn("ul", mod, true, {id: "history_list", innerHTML: html});
                    mod.insertBefore(d.firstChild, mod.lastChild);
                }
                else {
                    html = ["<ul id=\"history_list\">", html, "</ul>", txv.history.rmAllTemp, txv.history.iframeTemp].join("");
                    $container.html(html);
                }
            }
            else {
                txv.trace("no need iframe");
                html = ["<ul id=\"history_list\">", html, "</ul>", txv.history.rmAllTemp].join("");
                $container.html(html);
            }
        }
        if (txv.history.playPageFlag && QZFL.userAgent.ie == 6) {
            var h = len * 26 + 53;
            $container.find("iframe").css("height", h + "px");
            $container.css("height", h + "px");
        }
    }
}, renderHistoryV2: function (readyList) {
    var dayDef = {today: 0, yesterday: -1, earlier: -999}, moreBtnHtml, $mod = $e("#" + txv.history.mod_id), $container, h, wrapHtml = '<div class="pop_timeline_wrap"><div class="timeline_video_wrap">{content}</div></div>', contentHtml = "", time, idx = 0, len, dateObj = new Date(), today = dateObj.getDate(), curTime = dateObj.getTime(), oneDayTime = 86400000, todayHtml = "", yesterdayHtml = "", earlierHtml = "", byDayTpl = txv.history.byDayTpl, dayTpl = txv.history.dayTpl, dayHtml = "";

    function render(type, html) {
        if (html.length > 0) {
            switch (type) {
                case dayDef.today:
                {
                    dayHtml = dayTpl.replace(/\{text\}/, "今天").replace(/\{cls\}/, "date_green");
                    contentHtml += byDayTpl.replace(/\{cls\}/, "history_today").replace(/\{day\}/, dayHtml).replace(/\{content\}/, html);
                    break;
                }
                case dayDef.yesterday:
                {
                    dayHtml = dayTpl.replace(/\{text\}/, "昨天").replace(/\{cls\}/, "date_blue");
                    ;
                    contentHtml += byDayTpl.replace(/\{cls\}/, "history_yesterday").replace(/\{day\}/, dayHtml).replace(/\{content\}/, html);
                    break;
                }
                case dayDef.earlier:
                {
                    dayHtml = dayTpl.replace(/\{text\}/, "更早").replace(/\{cls\}/, "date_orange");
                    ;
                    contentHtml += byDayTpl.replace(/\{cls\}/, "history_earlier").replace(/\{day\}/, dayHtml).replace(/\{content\}/, html);
                    break;
                }
            }
        }
    }

    if (!QZFL.lang.isArray(readyList) || readyList.length == 0) {
        txv.history.showEmpty(txv.history.emptyTips);
        return;
    }
    len = readyList.length;
    for (; idx < len; idx++) {
        if (txv.history.getStorageKey(txv.history.option.vid, txv.history.option.coverid) === readyList[idx].key) {
            readyList[idx].timeTips = "正在观看";
        }
        else if (txv.history.option.coverid && readyList[idx].key.indexOf(txv.history.option.coverid) != -1) {
            readyList[idx].timeTips = "正在观看";
            readyList[idx].tit = readyList[idx].hoverTit = txv.history.option.tit;
            readyList[idx].lnk = Live.util.getTxvPlayUrl(txv.history.option.coverid, txv.history.option.vid);
        }
        var str = QZFL.string.format(txv.history.template, readyList[idx]), date;
        time = readyList[idx].date * 1000;
        if (curTime - oneDayTime * 2 > time) {
            earlierHtml += str;
        }
        else {
            dateObj.setTime(time);
            date = dateObj.getDate();
            if (today == date) {
                todayHtml += str;
            }
            else if (today - 1 == date) {
                yesterdayHtml += str;
            }
            else {
                earlierHtml += str;
            }
        }
    }
    render(dayDef.today, todayHtml);
    render(dayDef.yesterday, yesterdayHtml);
    render(dayDef.earlier, earlierHtml);
    if (contentHtml.length > 0) {
        $e("#history_pop").removeClass(txv.history.noLoginCls).removeClass(txv.history.noResultCls);
        moreBtnHtml = txv.history.getMoreBtnTpl.replace("{tips}", txv.login.isLogin() ? "查看更多" : "登录查看更多");
        $mod.html(wrapHtml.replace(/{content}/, contentHtml + moreBtnHtml));
        if (QZFL.userAgent.ie == 6) {
            txv.history.adaptPopHeight();
        }
    }
    else {
        txv.history.showEmpty(txv.history.emptyTips);
    }
}, adaptPopHeight: function () {
    txv.common.setPopIframeHeight("history_pop");
}, getPlayUrl: function (json, isPay) {
    var url = "", key, keyArr, cid, vid, time;
    if (typeof(json) === "string") {
        key = json;
        keyArr = key.split("_");
        cid = keyArr[0];
        vid = keyArr[1];
        if (!isNaN(keyArr[2])) {
            vid += "_" + keyArr[2];
        }
        if (typeof(cid) === "string" && cid.length > 0) {
            url = txv.common.getStaticPlayUrl(cid, vid);
        }
        else if (typeof(vid) === "string" && vid.length > 0) {
            url = txv.common.getVideoPlayUrl(vid);
        }
    }
    else if (QZFL.object.getType(json) === "object") {
        keyArr = json.keyid.split("_");
        time = json.time < 0 ? json.time * -1 : json.time;
        if (keyArr.length == 3) {
            keyArr[1] = keyArr[1] + "_" + keyArr[2];
        }
        if (json.ctypeid == 7) {
            url = txv.common.getBokePlayUrl(keyArr[1]);
        }
        else if (keyArr[0].length > 0) {
            url = txv.common.getPlayUrl(keyArr[0], keyArr[1]);
        }
        else {
            url = txv.common.getVideoPlayUrl(keyArr[1]);
        }
    }
    if ((isPay == 1 && QZFL.lang.isString(json)) || QZFL.inArray(json.ispay, [4, 5, 6]) !== -1) {
        return"http://film.qq.com" + url;
    }
    return"http://v.qq.com" + url;
}, getTitle: function (json) {
    if (!json) {
        return"";
    }
    json.title = json.title || "";
    json.vtit = json.vtit || "";
    if (json.ctypeid == 2 || json.ctypeid == 3) {
        var arr = json.vtit.match(/^([^_]+)_(\d+(?:\-\d+)?)$/);
        if (!!arr && arr.length == 3) {
            if (json.vtit.indexOf("预告片") == -1) {
                return[arr[1], " 第", arr[2], "集"].join("");
            }
            else {
                return[json.title, " 第", arr[2], "集", arr[1]].join("");
            }
        }
        else if (json.vtit.indexOf(json.title) != -1) {
            return json.vtit;
        }
        else {
            arr = json.vtit.match(/^([^_]+)_(\d+)_(\d+)$/);
            if (!!arr && arr.length == 4) {
                return[arr[1], " 第", arr[2], "集"].join("");
            }
        }
        return json.title + " " + json.vtit;
    }
    else if (QZFL.inArray(json.ctypeid, [1, 98]) != -1) {
        var reg = new RegExp("^" + json.title + "_\\d+");
        if (reg.test(json.vtit)) {
            return json.title || json.vtit;
        }
        else {
            return json.vtit;
        }
    }
    else if (json.ctypeid == 39) {
        return json.title || json.vtit;
    }
    else {
        return txv.common.formatVideoTitle(json.vtit);
    }
}, add: function (flag, time, total) {
    var keyid = txv.history.getStorageKey(txv.history.option.vid, txv.history.option.coverid), retObj, data;
    if (keyid.length < 2 || keyid.indexOf("_") === -1) {
        txv.trace("add history error: not enough options!");
        return;
    }
    ++txv.history.reportTimer;
    txv.history.addToLocal(time, total, flag);
    if (!txv.login.isLogin()) {
        txv.trace("not login!!");
        return;
    }
    if (flag == -3 && txv.history.reportTimer != txv.history.reportToServerTimeLimit) {
        txv.trace("没达到次数限制，不上报服务器:" + txv.history.reportTimer);
        return;
    }
    else if (flag == txv.history.timeFlagDef.begin || flag == 0) {
        txv.trace("不上报开始播放:");
        return;
    }
    txv.history.reportTimer = 0;
    time = Math.ceil(time);
    total = Math.ceil(total);
    if (txv.history.lastReportToServerKeyid != keyid) {
        txv.history.lastReportToServerKeyid = keyid;
        txv.history.batchReportToServer(txv.history.navSize);
        return;
    }
    retObj = new Live.RetCode(100030);
    data = {t: txv.history.rParamDef.ONEREPORT, plat: 2, time: time, keyid: keyid, otype: "json"};
    data = this.extendTenvideoData(data);
    $j.ajax({url: txv.path.addHistoryRecordCgi, dataType: "jsonp", data: data, CSRF: true, beforeSend: function () {
        retObj.begin();
    }, success: function (json) {
        txv.trace("set history record success!");
        retObj.reportSuc();
    }, error: function () {
        txv.trace("set history record error!");
        retObj.reportErr();
    }});
}, onRemove: function (key) {
    var $mod = $e("li[key=" + key + "]");
    $mod.remove();
    txv.history.onRemoveLocal(key, txv.history.makeUserStorageKey());
    txv.history.hisList = null;
    txv.history.showHistory();
}, rm: function (key, idx, cb, errcb) {
    if (typeof key != "string" || key.length == 0) {
        return;
    }
    if (!txv.login.isLogin()) {
        var $mod = $e("#" + txv.history.mod_id + " [key=" + key + "]");
        idx = !isNaN(idx) ? idx : 0;
        $mod.remove();
        txv.history.rmLocal(key, idx);
        return;
    }
    if (typeof(idx) === "function") {
        cb = idx;
    }
    cb = QZFL.lang.isFunction(cb) ? cb : txv.history.onRemove;
    errcb = QZFL.lang.isFunction(errcb) ? errcb : QZFL.emptyFn;
    var retObj = new Live.RetCode(100070), data = {t: txv.history.nParamDef.DELETEONE, keyid: key, otype: "json"};
    txv.history.requestCgi(txv.path.queryHistoryRecordCgi, data, {success: function () {
        cb(key);
    }, error: errcb, notLogin: function () {
        txv.login.clearLoginCookie();
        cb(key);
    }}, 100070);
}, showEmpty: function (tips) {
    tips = tips || txv.history.emptyTips;
    var $mod = $e("#" + txv.history.mod_id), $modPop = $e("#history_pop"), html = this.noResultTpl.replace("{tips}", tips), cls = txv.history.noResultCls;
    if (!txv.history.v2) {
        if (txv.history.playPageFlag) {
            html += txv.history.iframeTemp;
            if (QZFL.userAgent.ie == 6) {
                $mod.css("height", "62px");
            }
        }
        $mod.addClass(cls);
    }
    else {
        if (tips === txv.history.emptyTips && !txv.login.isLogin()) {
            $modPop.removeClass(cls);
            html = txv.history.notLoginNoResultTpl;
            cls = txv.history.noLoginCls;
        }
        if (txv.history.playPageFlag && QZFL.userAgent.ie == 6) {
            $modPop.find("iframe").css("height", "202px");
        }
        $modPop.addClass(cls);
    }
    $mod.html(html);
}, toString: function (key, curTime, time, total) {
    if (QZFL.lang.isString(txv.history.option.tit)) {
        txv.history.option.isPay = txv.history.option.isPay ? 1 : 0;
        txv.history.option.tit = txv.history.option.tit.replace(",", "&#44;");
        return[key, txv.history.option.tit, curTime, time, total, txv.history.option.isPay].join(',');
    }
    return"";
}, removeStorageByKey: function (key) {
    if (typeof(key) !== "string") {
        return;
    }
    QZFL.Storage.remove(key, "");
}, checkSorageIsExist: function (uin) {
    var value = this.getUinStorageValue(this.uinStorageKey);
    if (typeof value == "undefined") {
        return value;
    }
    if (!value) {
        return false;
    }
    var uins = value.split("|"), exist = false, notToChanges = [], toUpdate = [];
    for (var i = 0, l = uins.length; i < l; i++) {
        if (uins[i] && uins.indexOf(this.makeUserStorageKey()) != -1) {
            return true;
        }
    }
    return false;
}, updateUinStorage: function (historyKey, curTime, type, uinStorageKey) {
    if (arguments.length < 2 || !QZFL.lang.isString(historyKey) || isNaN(curTime)) {
        return;
    }
    if (!uinStorageKey) {
        uinStorageKey = this.uinStorageKey;
    }
    var uinsValue = this.getUinStorageValue(uinStorageKey);
    if (!uinsValue) {
        QZFL.Storage.set(uinStorageKey, [historyKey, curTime, curTime].join(","));
        return;
    }
    var reg = new RegExp("(" + historyKey + ")(\,\\d+)(\,\\d+)", "g");
    if (reg.test(uinsValue)) {
        if (type == 1) {
            uinsValue = uinsValue.replace(reg, "$1," + curTime + "$3");
        }
        else {
            uinsValue = uinsValue.replace(reg, "$1$2," + curTime);
        }
    }
    else {
        var uins = uinsValue.split("|"), oldestTime = curTime, removeIdx;
        if (uins.length >= 6) {
            var removeKey, oldestTime = curTime, removeIdx;
            for (var idx = 0, iLen = uins.length; idx < iLen; idx++) {
                if (QZFL.lang.isString(uins[idx])) {
                    var t = uins[idx].split(",");
                    if (t[1] <= oldestTime && t[0] !== historyKey) {
                        oldestTime = t[1];
                        removeKey = t[0];
                        removeIdx = idx;
                    }
                }
            }
            if (!isNaN(removeIdx) && removeIdx < iLen) {
                uins.splice(removeIdx, 1);
            }
            txv.history.removeStorageByKey(removeKey);
            uinsValue = uins.join("|");
        }
        else {
            uinsValue += "|" + [historyKey, curTime, curTime].join(",");
        }
    }
    QZFL.Storage.set(uinStorageKey, uinsValue);
}, addToLocal: function (time, total, flag) {
    if (txv.history.localAddLock) {
        return;
    }
    var key = txv.history.getStorageKey(txv.history.option.vid, txv.history.option.coverid), curTime = txv.history.getCurTimeStmp(), storageNumLimit = 5, storagekey = txv.history.makeUserStorageKey();
    if (!txv.history.option.tit || !txv.history.option.lnk || key.length < 2 || txv.history.localAddLock || key.indexOf("_") === -1) {
        txv.trace("add local history error: option error");
        return;
    }
    if (!this.storageReady) {
        return;
    }
    txv.history.localAddLock = true;
    var existsHistory = this.getOnesLocalHistory(storagekey);
    if (!existsHistory) {
        existsHistory = "";
    }
    else {
        existsHistory = this.filterVideo(existsHistory, txv.history.option.coverid || txv.history.option.vid);
    }
    var str = txv.history.toString(key, curTime, time, total);
    if (existsHistory) {
        existsHistory = str + "|" + existsHistory;
    }
    else {
        existsHistory = str;
    }
    QZFL.Storage.set(storagekey, existsHistory);
    txv.history.updateUinStorage(storagekey, curTime, 1);
    txv.history.localAddLock = false;
    if (!txv.login.isLogin()) {
        txv.history.showLocalHistory(txv.history.navSize);
    }
}, filterVideo: function (existsHistory, cid) {
    if (cid.length == 11) {
        cid = "_" + cid;
    }
    else if (cid.length != 15) {
        return existsHistory;
    }
    var tailReg = new RegExp("(\\|" + cid + "[^\\|]+)$"), headOrInnerReg = new RegExp("(?:^|\\|)(" + cid + "[^\\|]+\\|)", "g"), onlyOneReg = new RegExp("^(" + cid + "[^\\|]+)$", "g");
    var array = existsHistory.split("|"), aLen = array.length;
    if (aLen > this.onesLocalSize) {
        existsHistory = array.splice(0, this.onesLocalSize).join("|");
    }
    if (tailReg.test(existsHistory)) {
        return existsHistory.replace(RegExp.$1, "");
    }
    if (headOrInnerReg.test(existsHistory)) {
        return existsHistory.replace(RegExp.$1, "");
    }
    if (onlyOneReg.test(existsHistory)) {
        return"";
    }
    if (aLen >= this.onesLocalSize) {
        return existsHistory.replace(/\|[^|]+$/g, "");
    }
    return existsHistory;
}, onRemoveLocal: function (key, storagekey) {
    if (typeof(key) != "string" || typeof(storagekey) != "string") {
        return;
    }
    this.getOnesLocalHistory(storagekey, function (hisStr) {
        if (!hisStr) {
            return;
        }
        var keyArr = key.split("_"), removeItme, newStr;
        if (keyArr[0]) {
            removeItme = keyArr[0];
        }
        else if (keyArr[1]) {
            removeItme = keyArr[1];
        }
        newStr = txv.history.filterVideo(hisStr, removeItme);
        if (!newStr) {
            QZFL.Storage.remove(storagekey);
        }
        else if (newStr != hisStr) {
            QZFL.Storage.set(storagekey, newStr);
        }
    });
}, rmLocal: function (key, idx) {
    if (typeof key != "string" || key.length == 0) {
        return;
    }
    var storagekey = "";
    storagekey = txv.history.makeUserStorageKey();
    txv.history.onRemoveLocal(key, storagekey);
    if (storagekey !== txv.history.historyKey) {
        txv.history.onRemoveLocal(key, txv.history.historyKey);
    }
    else {
        txv.history.showLocalHistory(txv.history.navSize);
    }
}, getCurTimeStmp: function () {
    return Math.ceil((+new Date()) / 1000);
}, getHistoryTimeByKey: function (vid, coverid, cb) {
    vid = vid || txv.history.option.vid;
    coverid = coverid || txv.history.option.coverid;
    cb = typeof(cb) !== "function" ? Live.emptyFn : cb;
    var key = txv.history.getStorageKey(vid, coverid);
    if (txv.login.isLogin()) {
        txv.history.getServerHistoryDataByKey(key, cb, true);
    }
    else {
        txv.history.getLocalHistoryDataByKey(key, cb);
    }
}, getLocalHistoryDataByKey: function (key, cb) {
    var hls = [], recordArr = [], storagekey = txv.history.makeUserStorageKey(), keyArr = [], retObj = {vid: "", title: "", coverid: "", playurl: "", date: 0, time: 0}, time = 0;
    txv.history.getLocalList(storagekey, function (hls) {
        if (hls.length == 0 || typeof key != "string") {
            time = 0;
        }
        else {
            keyArr = key.split("_");
            key = keyArr[0] || keyArr[1];
            for (var idx = 0, len = hls.length; idx < len; idx++) {
                recordArr = hls[idx].split(",");
                if (recordArr.length < 5) {
                    continue;
                }
                if (recordArr[0].indexOf(key) != -1) {
                    recordArr[3] = parseInt(recordArr[3]);
                    if (isNaN(recordArr[3]) || QZFL.inArray(recordArr[3], [-2, -1]) != -1) {
                        time = 0;
                    }
                    else if (recordArr[3] < 0) {
                        time = recordArr[3] * -1;
                    }
                    time = recordArr[3];
                    retObj = {time: time, title: recordArr[1], date: recordArr[2] - 0, vid: recordArr[0].split("_")[1], coverid: recordArr[0].split("_")[0], playurl: txv.history.getPlayUrl(recordArr[0], recordArr[4])}
                    break;
                }
            }
        }
        if (QZFL.lang.isFunction(cb)) {
            cb(time, retObj);
        }
    });
}, getServerHistoryDataByKey: function (key, cb, isForPlayer) {
    if (typeof key == "string" && QZFL.lang.isFunction(cb)) {
        var data, url, retCode, retObj, obj, callback = {};
        if (isForPlayer) {
            data = {t: txv.history.rParamDef.ONEINFO, plat: 2, keyid: key, otype: "json"}, url = txv.path.addHistoryRecordCgi, retCode = 100030;
        }
        else {
            data = {t: txv.history.nParamDef.ONEINFO, plat: 2, otype: "json", simp: 1, keyid: key}, url = txv.path.queryHistoryRecordCgi, retCode = 100113;
        }
        retObj = new Live.RetCode(retCode);
        obj = {vid: "", time: 0};
        callback = {success: function (json) {
            if (isForPlayer) {
                QZFL.object.extend(obj, json);
            }
            else {
                if (json.list && json.list.length) {
                    var serverObj = json.list[0], cvid = serverObj.keyid.split("_");
                    QZFL.object.extend(obj, {coverid: cvid[0], vid: cvid[1], time: serverObj.time, date: serverObj.date, title: txv.history.getTitle(serverObj), playurl: txv.history.getPlayUrl(serverObj)});
                }
            }
            obj.time = obj.time - 0;
            if (QZFL.inArray(obj.time, [txv.history.timeFlagDef.begin, txv.history.timeFlagDef.finish]) != -1) {
                obj.time = 0;
            }
            if (obj.time < 0) {
                obj.time *= -1;
            }
            txv.history.getLocalHistoryDataByKey(key, function (time, recordObj) {
                if (recordObj.date > obj.date && recordObj.time > 0) {
                    cb(recordObj.time, recordObj);
                }
                else {
                    cb(obj.time, obj);
                }
            });
        }, error: function () {
            cb(obj.time, obj);
        }, notLogin: txv.login.clearLoginCookie};
        txv.history.requestCgi(url, data, callback, retCode);
    }
}, parseLocalRecord: function (val) {
    var retArr = [];
    if (QZFL.object.getType(val) == "object" && typeof(val.value) == "string") {
        val = val.value;
    }
    if ("string" == typeof(val) && val.length > 0) {
        retArr = val.split("|");
    }
    return retArr;
}, makeUserStorageKey: function (prefix) {
    prefix = prefix || txv.history.historyKey;
    return txv.login.isLogin() ? (prefix + txv.login.getUin()) : prefix;
}, batchReportToServer: function (count, cbObj) {
    if (!this.storageReady) {
        setTimeout(function () {
            txv.history.batchReportToServer(count, cbObj)
        }, 1000);
        return;
    }
    if (!txv.login.isLogin() || this.isBatchReport) {
        return;
    }
    this.processLocal(count, QZFL.object.extend({success: txv.history.renderContent}, cbObj));
    if (this.v2) {
        var conf = this.localStorageItemDefine.FILM;
        this.processLocal(count, "", conf.uins, conf.history, false, 1);
    }
    return;
}, processLocal: function (size, callback, uinStorageKey, historyPrefix, filterFilm, returnSize) {
    if (!uinStorageKey) {
        uinStorageKey = this.uinStorageKey;
    }
    if (!historyPrefix) {
        historyPrefix = this.historyKey;
    }
    var reportList = this.getReportArr(uinStorageKey, historyPrefix, filterFilm), rf;
    if (reportList.length == 0) {
        try {
            callback.withoutLocal();
        } catch (e) {
        }
        return;
    }
    if (typeof filterFilm == "undefined") {
        rf = this.rfDefine[this.site];
    }
    else {
        rf = this.rfDefine[filterFilm ? "V" : "FILM"];
    }
    this.requestBatchCgi({pn: returnSize || size, list: reportList.join("|"), rf: rf}, callback, this.makeUserStorageKey(historyPrefix), uinStorageKey);
}, getReportArr: function (uinStorageKey, historyPrefix, filterFilm) {
    var uins = this.getUinStorageValue(uinStorageKey), targetUins = this.getTargetUins(uins, historyPrefix), reportList = [];
    if (targetUins.length == 0) {
        return reportList;
    }
    var map = {}, idxMap = {}, filterFilm = typeof filterFilm != "boolean" ? this.v2 : filterFilm;
    for (var i = 0, l = targetUins.length; i < l; i++) {
        var historyKey = targetUins[i][0], lastUpdateTime = targetUins[i][2], views = this.getOnesLocalHistory(historyKey);
        if (!views) {
            continue;
        }
        var view = views.split("|"), opt;
        for (var k = 0, kl = view.length; k < kl; k++) {
            opt = view[k].split(",");
            if (opt.length >= 4 && QZFL.lang.isString(opt[0]) && opt[0].indexOf("_") !== -1) {
                if (opt[2] >= lastUpdateTime) {
                    if (filterFilm && opt[5] == 0 || !filterFilm) {
                        var tmpArr = opt[0].split("_");
                        if (typeof(map[tmpArr[0]]) === "undefined") {
                            map[tmpArr[0]] = opt[2];
                            reportList.push([opt[0], opt[3], opt[2]].join("+"));
                            idxMap[tmpArr[0]] = reportList.length - 1;
                        }
                        else if (map[tmpArr[0]] < tmpArr[2] && historyKey.indexOf(txv.login.getUin()) != -1) {
                            map[tmpArr[0]] = opt[2];
                            reportList[idxMap[tmpArr[0]]] = [opt[0], opt[3], opt[2]].join("+");
                        }
                    }
                }
            }
        }
    }
    return reportList;
}, requestBatchCgi: function (data, callback, historyKey, uinStorageKey) {
    var timeStamp = this.getCurTimeStmp(), data = QZFL.object.extend({pn: 10, list: "", rf: "v"}, data, {t: txv.history.rParamDef.BATCHREPORT, cur: 1, simp: 1, plat: 2, otype: "json"}), incallback = {success: function () {
        txv.history.removeReportedDataAndUpdateLocal(uinStorageKey, historyKey, timeStamp);
        try {
            callback.success(json);
        } catch (e) {
        }
    }, notLogin: function () {
        try {
            callback.notLogin();
        } catch (e) {
        }
    }, error: function () {
        try {
            callback.error();
        }
        catch (e) {
        }
    }};
    txv.history.requestCgi(txv.path.addHistoryRecordCgi, data, incallback, 100031);
}, getHistoryDataByKey: function (key, cb) {
    if (typeof key == "string" && typeof cb == "function") {
        var hisDataObj = {coverid: "", vid: "", title: "", playurl: ""};
        if (txv.login.isLogin()) {
            this.getServerHistoryDataByKey(key, function (time, obj) {
                cb(obj);
            }, false);
        }
        else {
            txv.history.getLocalHistoryDataByKey(key, function (time, obj) {
                cb(obj);
            });
        }
    }
}, extendTenvideoData: function (data) {
    var me = txv.history, rfValue = me.rfDefine[me.site];
    if (typeof rfValue != "string") {
        rfValue = me.rfDefine.V;
    }
    return QZFL.object.extend(data, {rf: rfValue});
}, getUinStorageValue: function (uinStorageKey, cb) {
    return QZFL.Storage.get(uinStorageKey, cb);
}, getTargetUins: function (uinsStr, historyPrefix) {
    var targetUins = [];
    if (QZFL.lang.isString(uinsStr)) {
        var uins = uinsStr.split("|"), userStorageKey = this.makeUserStorageKey(historyPrefix);
        if (typeof historyPrefix == "undefined") {
            historyPrefix = this.historyKey;
        }
        for (var i = 0, l = uins.length; i < l; i++) {
            var uin = uins[i], arr = uin.split(",");
            if (arr[0] == historyPrefix) {
                if (arr[1] >= arr[2]) {
                    targetUins.push(arr);
                }
            }
            else if (arr[0] == userStorageKey) {
                if (arr[1] >= arr[2]) {
                    targetUins.push(arr);
                }
            }
        }
    }
    return targetUins;
}, setUinStorageValue: function (uinStorageKey, value) {
    uinStorageKey && QZFL.Storage.set(uinStorageKey, value || "");
}, getOnesLocalHistory: function (historyKey, cb) {
    return QZFL.Storage.get(historyKey, cb);
}, removeReportedDataAndUpdateLocal: function (uinStorageKey, historyKey, timeStmp) {
    QZFL.Storage.remove(historyKey);
    this.getUinStorageValue(uinStorageKey, function (str) {
        if (str) {
            var origalArr = str.split("|"), newArr = [], noUinKey = historyKey.replace(txv.login.getUin(), "");
            for (var i = 0, l = origalArr.length; i < l; i++) {
                var record = origalArr[i], detail = record.split(",");
                if (detail[0] && detail[0] != historyKey) {
                    if (detail[0] == noUinKey) {
                        newArr.push(record.replace(detail[2], timeStmp));
                    }
                    else {
                        newArr.push(record);
                    }
                }
            }
            txv.history.setUinStorageValue(uinStorageKey, newArr.join("|"));
        }
    });
}};
function _flash_view_history(flag, time, total) {
    if (arguments.length != 3) {
        return;
    }
    txv.trace("_flash_view_history:" + flag + "," + time + "," + total);
    if (-1 != flag && total < txv.history.timeLongLimit) {
        txv.trace("小于一定时长的视频只记录开始播放点,当前限制为:" + txv.history.timeLongLimit);
        return;
    }
    if (-2 == flag) {
        txv.trace("播放结束了");
        time = -2;
    }
    txv.history.add(flag, time, total);
}
txv.headfavorite = {conf: {jsalias: "widget.follow_core", verStorageName: "txv_headfavorite_ver", jsStorageName: "txv_headfavorite_js", curVer: "2.0", localCacheTime: 86400000, containerId: "mod_head_favorites", trigglerId: "mod_head_favorites_trigger", popId: "mod_head_favorites_pop", contentTpl: '<ul class="attention_list">{list}</ul><a href="http://v.qq.com/mytv/follow.html" target="_blank" class="btn_pop_link btn_pop_more" _hot="mynav.followmore.{pageType}"><span class="ico_text">查看更多</span></a>', itemTpl: '<li class="{cls}"><i class="ico_dot"></i><a {idattr} href="{url}" title="{hoverTitle}" class="list_name" target="{target}" _hot="mynav.followlist.{pageType}" _qtag="nav.follow"><span class="list_type">{tn}</span>{n}</a>{desc}</li>', showCls: "open", contentId: "mod_head_favorites_content", noContentCls: "mod_attention_pop_nothing", noContentTpl: '<div class="pop_info_nothing"><i class="ico_film_large"></i><p class="hint_text">{tips}</p></div>', noContentTips: "您暂时还没有关注记录", getDataErrorTips: "获取数据失败，请稍后尝试刷新页面", getingDataTips: "正在努力获取数据", notLoginCls: "mod_attention_pop_login mod_favorites_pop_login", noPlayrightTips: "由于版权方要求，本视频只能使用腾讯视频客户端播放", notLoginTpl: '<div class="pop_info_nothing pop_info_login"><a href="javascript:;" class="btn_login" data-type="login">登录</a><p class="hint_text">{tips}</p></div>', notLoginTips: "请登录查看关注记录", listSize: 5}, _onShowListCb: new Live.Callback("unique"), _onHideListCb: new Live.Callback("unique"), userData: {}, pageType: "", hoverHot: "", addShowListCb: function (fn) {
    txv.headfavorite._onShowListCb.add(fn);
}, addHideListCb: function (fn) {
    txv.headfavorite._onHideListCb.add(fn);
}, init: function (_conf) {
    QZFL.object.extend(this.conf, _conf);
    Live.actionManager.on(txv.Event.loadedFollow, function (name) {
        txv.headfavorite.conf.jsalias = name;
    });
    var menu, $container = $e("#" + this.conf.containerId), $triggler = $e("#" + this.conf.trigglerId);
    txv.headfavorite.pageType = txv.common.getCurPageType();
    if ($container.size() == 0 || $triggler.size() == 0) {
        return;
    }
    menu = new Live.FloatMenu({menu: $container, area: $triggler, areaOutdelay: 100, isNeedChangeDisplay: false, onShow: function (obj) {
        var uin, jsonData;
        if (txv.login.isLogin()) {
            uin = txv.login.getUin();
            jsonData = txv.headfavorite.userData[uin];
            if (typeof jsonData == "undefined") {
                txv.headfavorite.getData();
            }
            else if (jsonData === false) {
                txv.headfavorite.onGetDataError();
            }
            else if ($container.attr("uin") != uin) {
                $container.attr("uin", uin);
                txv.headfavorite.renderData(jsonData);
            }
            else {
                txv.common.btnTj(txv.headfavorite.hoverHot);
            }
        }
        else {
            txv.headfavorite.onNotLogin();
        }
        $container.addClass(txv.headfavorite.conf.showCls);
        txv.headfavorite._onShowListCb.fire();
    }, onHide: function (obj) {
        $container.removeClass(txv.headfavorite.conf.showCls);
        txv.headfavorite._onHideListCb.fire();
    }});
    txv.login.addLogoutCallback(function () {
        txv.headfavorite.userData = {};
    });
    if (txv.common.conf.playPageFlag) {
        var iframe = document.createElement("iframe");
        iframe.src = "about:blank";
        iframe.frameborder = "0";
        iframe.className = "iframe_mask";
        $container.find("div.pop_info_main").eq(0).insertBefore(iframe, getElementById(txv.headfavorite.conf.contentId));
    }
    $triggler.onClick(function (evt) {
        if (!txv.login.isLogin()) {
            QZFL.event.preventDefault(evt);
            txv.login.openLogin();
        }
    });
    if (QZFL.userAgent.ie == 6) {
        $container.delegate("li", "mouseover",function (evt) {
            QZFL.css.addClassName(this, "hover");
        }, true).delegate("li", "mouseout", function (evt) {
            QZFL.css.removeClassName(this, "hover");
        }, true);
    }
}, onNotLogin: function () {
    var $pop = $e("#" + this.conf.popId), $content = $e("#" + this.conf.contentId);
    $content.html(txv.headfavorite.conf.notLoginTpl.replace("{tips}", txv.headfavorite.conf.notLoginTips));
    $pop.removeClass(txv.headfavorite.conf.noContentCls).addClass(txv.headfavorite.conf.notLoginCls);
    txv.headfavorite._adaptIframeHeight(164);
    txv.login.clearLoginCookie();
}, getData: function () {
    txv.headfavorite.onGetingData();
    seajs.use(txv.headfavorite.conf.jsalias, function (mod) {
        mod.list({start: 0, end: txv.headfavorite.conf.listSize - 1, f: 2}).done(function (rs) {
            txv.headfavorite.onGetDataSuc(rs);
        }).fail(function (rs) {
            if (rs && rs.suc == -11) {
                txv.headfavorite.onNotLogin();
                return;
            }
            txv.headfavorite.onGetDataError();
        });
    });
}, _adaptIframeHeight: function (hei) {
    if (QZFL.userAgent.ie == 6 && txv.common.conf.playPageFlag) {
        txv.common.setPopIframeHeight(this.conf.popId, hei);
    }
}, onGetDataError: function () {
    txv.headfavorite.showEmpty(txv.headfavorite.conf.getDataErrorTips);
    txv.headfavorite.userData[txv.login.getUin()] = false;
}, onGetingData: function () {
    txv.headfavorite.showEmpty(txv.headfavorite.conf.getingDataTips);
}, showEmpty: function (tips) {
    var $pop = $e("#" + this.conf.popId), $content = $e("#" + this.conf.contentId);
    tips = tips || txv.headfavorite.conf.noContentTips;
    $content.html(txv.headfavorite.conf.noContentTpl.replace("{tips}", tips));
    $pop.removeClass(txv.headfavorite.conf.notLoginCls).addClass(txv.headfavorite.conf.noContentCls);
    txv.headfavorite._adaptIframeHeight(213);
    txv.headfavorite.hoverHot = "mynav.followhover.null";
    if (txv.headfavorite.conf.getingDataTips != tips) {
        txv.common.btnTj(txv.headfavorite.hoverHot);
    }
}, onGetDataSuc: function (json) {
    txv.headfavorite.userData[txv.login.getUin()] = json;
    if (json && json.follow && json.total > 0) {
        txv.headfavorite.renderData(json);
    }
    else {
        txv.headfavorite.showEmpty(txv.headfavorite.conf.noContentTips);
    }
}, renderData: function (json) {
    if (!json || !json.follow || json.total == 0) {
        txv.headfavorite.showEmpty(txv.headfavorite.conf.noContentTips);
        return;
    }
    var html = "", $content = $e("#" + txv.headfavorite.conf.contentId), itemTpl = txv.headfavorite.conf.itemTpl, idx, len, tmpObj, searchCids = [], popDom = getElementById(txv.headfavorite.conf.popId);
    $e("#" + txv.headfavorite.conf.popId).removeClass(txv.headfavorite.conf.noContentCls).removeClass(txv.headfavorite.conf.notLoginCls);
    if ($content.find("ul").size() == 0) {
        for (idx = 0, len = json.follow.length; idx < len; idx++) {
            tmpObj = json.follow[idx];
            tmpObj.url = txv.headfavorite.getUrl(tmpObj);
            tmpObj.date = "";
            tmpObj.idattr = "";
            if (!tmpObj.tn) {
                tmpObj.tn = "";
            }
            if ($j.inArray(tmpObj.tid, [2, 3]) != -1) {
                tmpObj.idattr = "id=\"nav_f_" + tmpObj.id + "\"";
                searchCids.push(tmpObj.id);
            }
            if (tmpObj.imgtag && tmpObj.imgtag.tag_3) {
                tmpObj.desc = tmpObj.imgtag.tag_3.text;
                if (/^\d{4}/.test(tmpObj.desc)) {
                    if ($j.type(tmpObj.lcst) != "undefined") {
                        tmpObj.desc = "更新至" + tmpObj.desc;
                    }
                    else {
                        tmpObj.desc = "";
                    }
                }
                if (tmpObj.highlight) {
                    tmpObj.desc = tmpObj.desc.replace("至", "了");
                }
                if (tmpObj.desc.indexOf("全") != -1) {
                    tmpObj.desc = "已完结";
                }
                if (tmpObj.tid == 10) {
                    tmpObj.desc += " " + (tmpObj.lcst || tmpObj.st || "");
                }
            }
            else {
                tmpObj.desc = "";
            }
            if (tmpObj.tn && tmpObj.tn.indexOf("[") == -1) {
                tmpObj.tn = "[" + tmpObj.tn + "]";
            }
            tmpObj.cls = tmpObj.desc && tmpObj.highlight ? "new" : "";
            if (tmpObj.desc) {
                tmpObj.desc = '<p class="list_desc">' + tmpObj.desc + '</p>';
            }
            if (tmpObj.pr == 1 && tmpObj.url.indexOf("http://cache.tv.qq.com/") == -1 || QZFL.string.isURL(tmpObj.id)) {
                tmpObj.hoverTitle = tmpObj.tn + tmpObj.n;
                tmpObj.target = "_blank";
            }
            else if (!tmpObj.playright && tmpObj.t == 5) {
                tmpObj.url = "http://v.qq.com/variety/column/column_" + tmpObj.id + ".html";
                ;
                tmpObj.target = "_blank";
                tmpObj.hoverTitle = tmpObj.tn + tmpObj.n;
            }
            else {
                var attr = txv.common.getLinkAttr(tmpObj.playright, tmpObj.lcid || tmpObj.id);
                if (attr) {
                    tmpObj.url = attr.url;
                    tmpObj.hoverTitle = attr.hoverTitle;
                }
                else {
                    tmpObj.hoverTitle = txv.headfavorite.conf.noPlayrightTips;
                    tmpObj.url = "javascript:;";
                }
                tmpObj.target = "_self";
            }
            tmpObj.pageType = txv.headfavorite.pageType;
            html += QZFL.string.format(itemTpl, tmpObj);
        }
        $content.html(QZFL.string.format(txv.headfavorite.conf.contentTpl, {list: html, pageType: txv.headfavorite.pageType}));
        if (searchCids.length) {
            getLastView(searchCids);
        }
    }
    setTimeout(function () {
        txv.headfavorite._adaptIframeHeight();
        txv.headfavorite.hoverHot = "mynav.followhover." + txv.headfavorite.pageType;
        txv.common.btnTj(txv.headfavorite.hoverHot);
    }, 20);
    function getLastView(cids) {
        txv.history.requestCgi(txv.path.queryHistoryRecordCgi, {simp: 1, pver: 1, plat: 2, t: txv.history.nParamDef.BATCHINFO, otype: "json", list: cids.join("|")}, {success: txv.headfavorite.refreshHref, error: QZFL.emptyFn, notLogin: QZFL.emptyFn}, 100129);
    }
}, refreshHref: function (json) {
    if (!json || !json.list) {
        return;
    }
    for (var k = 0, l = json.list.length; k < l; k++) {
        var item = json.list[k], split = item.keyid.split("_"), cid = split[0], vid = split[1], href = "";
        if (item.apr && typeof item.pr != "undefined" && item.pr != 1) {
            var attr = txv.common.getLinkAttr(item.apr, cid, vid);
            if (attr) {
                href = attr.url;
            }
        }
        else {
            href = txv.history.getPlayUrl(item);
        }
        $j("#nav_f_" + cid).attr("href", href);
    }
}, getUrl: function (obj) {
    var str = "";
    if (!obj) {
        return str;
    }
    if (obj.lcid && obj.lcid.length > 0) {
        str = txv.common.getPlayUrl(obj.lcid);
    }
    else if (obj.id && obj.id.length > 0) {
        str = txv.common.getPlayUrl(obj.id);
    }
    if (QZFL.inArray(obj.pay, [4, 5, 6]) != -1) {
        str = "http://film.qq.com/" + str;
    }
    else {
        str = "http://v.qq.com/" + str;
    }
    if (QZFL.string.isURL(obj.id)) {
        str = obj.id;
    }
    return str;
}}
/*  |xGv00|96283c9403d21f69b2793a46c97667bd */