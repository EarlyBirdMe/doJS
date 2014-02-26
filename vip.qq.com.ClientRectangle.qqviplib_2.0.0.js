/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function (a, b) {
    function cy(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }

    function cu(a) {
        if (!cj[a]) {
            var b = c.body, d = f("<" + a + ">").appendTo(b), e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                ck || (ck = c.createElement("iframe"), ck.frameBorder = ck.width = ck.height = 0), b.appendChild(ck);
                if (!cl || !ck.createElement)cl = (ck.contentWindow || ck.contentDocument).document, cl.write((f.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), cl.close();
                d = cl.createElement(a), cl.body.appendChild(d), e = f.css(d, "display"), b.removeChild(ck)
            }
            cj[a] = e
        }
        return cj[a]
    }

    function ct(a, b) {
        var c = {};
        f.each(cp.concat.apply([], cp.slice(0, b)), function () {
            c[this] = a
        });
        return c
    }

    function cs() {
        cq = b
    }

    function cr() {
        setTimeout(cs, 0);
        return cq = f.now()
    }

    function ci() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {
        }
    }

    function ch() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    }

    function cb(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1)for (h in a.converters)typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k, k = d[g];
            if (k === "*")k = l; else if (l !== "*" && l !== k) {
                m = l + " " + k, n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                break
                            }
                        }
                    }
                }
                !n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
            }
        }
        return c
    }

    function ca(a, c, d) {
        var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
        for (i in g)i in d && (c[g[i]] = d[i]);
        while (f[0] === "*")f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h)for (i in e)if (e[i] && e[i].test(h)) {
            f.unshift(i);
            break
        }
        if (f[0]in d)j = f[0]; else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        }
        if (j) {
            j !== f[0] && f.unshift(j);
            return d[j]
        }
    }

    function b_(a, b, c, d) {
        if (f.isArray(b))f.each(b, function (b, e) {
            c || bD.test(a) ? d(a, e) : b_(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d)
        }); else if (!c && f.type(b) === "object")for (var e in b)b_(a + "[" + e + "]", b[e], c, d); else d(a, b)
    }

    function b$(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c)c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e)
    }

    function bZ(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f], i = 0, j = h ? h.length : 0, k = a === bS, l;
        for (; i < j && (k || !l); i++)l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = bZ(a, c, d, e, l, g)));
        (k || !l) && !g["*"] && (l = bZ(a, c, d, e, "*", g));
        return l
    }

    function bY(a) {
        return function (b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(bO), e = 0, g = d.length, h, i, j;
                for (; e < g; e++)h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
            }
        }
    }

    function bB(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = b === "width" ? 1 : 0, g = 4;
        if (d > 0) {
            if (c !== "border")for (; e < g; e += 2)c || (d -= parseFloat(f.css(a, "padding" + bx[e])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + bx[e])) || 0 : d -= parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0;
            return d + "px"
        }
        d = by(a, b);
        if (d < 0 || d == null)d = a.style[b];
        if (bt.test(d))return d;
        d = parseFloat(d) || 0;
        if (c)for (; e < g; e += 2)d += parseFloat(f.css(a, "padding" + bx[e])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + bx[e])) || 0);
        return d + "px"
    }

    function bo(a) {
        var b = c.createElement("div");
        bh.appendChild(b), b.innerHTML = a.outerHTML;
        return b.firstChild
    }

    function bn(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
    }

    function bm(a) {
        if (a.type === "checkbox" || a.type === "radio")a.defaultChecked = a.checked
    }

    function bl(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }

    function bk(a, b) {
        var c;
        b.nodeType === 1 && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? b.outerHTML = a.outerHTML : c !== "input" || a.type !== "checkbox" && a.type !== "radio" ? c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text) : (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value)), b.removeAttribute(f.expando), b.removeAttribute("_submit_attached"), b.removeAttribute("_change_attached"))
    }

    function bj(a, b) {
        if (b.nodeType === 1 && !!f.hasData(a)) {
            var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
            if (i) {
                delete h.handle, h.events = {};
                for (c in i)for (d = 0, e = i[c].length; d < e; d++)f.event.add(b, c, i[c][d])
            }
            h.data && (h.data = f.extend({}, h.data))
        }
    }

    function bi(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function U(a) {
        var b = V.split("|"), c = a.createDocumentFragment();
        if (c.createElement)while (b.length)c.createElement(b.pop());
        return c
    }

    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b))return f.grep(a, function (a, d) {
            var e = !!b.call(a, d, a);
            return e === c
        });
        if (b.nodeType)return f.grep(a, function (a, d) {
            return a === b === c
        });
        if (typeof b == "string") {
            var d = f.grep(a, function (a) {
                return a.nodeType === 1
            });
            if (O.test(b))return f.filter(b, d, !c);
            b = f.filter(b, d)
        }
        return f.grep(a, function (a, d) {
            return f.inArray(a, b) >= 0 === c
        })
    }

    function S(a) {
        return!a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function K() {
        return!0
    }

    function J() {
        return!1
    }

    function n(a, b, c) {
        var d = b + "defer", e = b + "queue", g = b + "mark", h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
        }, 0)
    }

    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b]))continue;
            if (b !== "toJSON")return!1
        }
        return!0
    }

    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? +d : j.test(d) ? f.parseJSON(d) : d
                } catch (g) {
                }
                f.data(a, c, d)
            } else d = b
        }
        return d
    }

    function h(a) {
        var b = g[a] = {}, c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++)b[a[c]] = !0;
        return b
    }

    var c = a.document, d = a.navigator, e = a.location, f = function () {
        function J() {
            if (!e.isReady) {
                try {
                    c.documentElement.doScroll("left")
                } catch (a) {
                    setTimeout(J, 1);
                    return
                }
                e.ready()
            }
        }

        var e = function (a, b) {
            return new e.fn.init(a, b, h)
        }, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/, m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g, r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/, u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, w = /^-ms-/, x = function (a, b) {
            return(b + "").toUpperCase()
        }, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty, E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf, I = {};
        e.fn = e.prototype = {constructor: e, init: function (a, d, f) {
            var g, h, j, k;
            if (!a)return this;
            if (a.nodeType) {
                this.context = this[0] = a, this.length = 1;
                return this
            }
            if (a === "body" && !d && c.body) {
                this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
                return this
            }
            if (typeof a == "string") {
                a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
                if (g && (g[1] || !d)) {
                    if (g[1]) {
                        d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
                        return e.merge(this, a)
                    }
                    h = c.getElementById(g[2]);
                    if (h && h.parentNode) {
                        if (h.id !== g[2])return f.find(a);
                        this.length = 1, this[0] = h
                    }
                    this.context = c, this.selector = a;
                    return this
                }
                return!d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
            }
            if (e.isFunction(a))return f.ready(a);
            a.selector !== b && (this.selector = a.selector, this.context = a.context);
            return e.makeArray(a, this)
        }, selector: "", jquery: "1.7.2", length: 0, size: function () {
            return this.length
        }, toArray: function () {
            return F.call(this, 0)
        }, get: function (a) {
            return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
        }, pushStack: function (a, b, c) {
            var d = this.constructor();
            e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
            return d
        }, each: function (a, b) {
            return e.each(this, a, b)
        }, ready: function (a) {
            e.bindReady(), A.add(a);
            return this
        }, eq: function (a) {
            a = +a;
            return a === -1 ? this.slice(a) : this.slice(a, a + 1)
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, slice: function () {
            return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
        }, map: function (a) {
            return this.pushStack(e.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: E, sort: [].sort, splice: [].splice}, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function () {
            var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
            typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
            for (; j < k; j++)if ((a = arguments[j]) != null)for (c in a) {
                d = i[c], f = a[c];
                if (i === f)continue;
                l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
            }
            return i
        }, e.extend({noConflict: function (b) {
            a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
            return e
        }, isReady: !1, readyWait: 1, holdReady: function (a) {
            a ? e.readyWait++ : e.ready(!0)
        }, ready: function (a) {
            if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                if (!c.body)return setTimeout(e.ready, 1);
                e.isReady = !0;
                if (a !== !0 && --e.readyWait > 0)return;
                A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
            }
        }, bindReady: function () {
            if (!A) {
                A = e.Callbacks("once memory");
                if (c.readyState === "complete")return setTimeout(e.ready, 1);
                if (c.addEventListener)c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1); else if (c.attachEvent) {
                    c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                    var b = !1;
                    try {
                        b = a.frameElement == null
                    } catch (d) {
                    }
                    c.documentElement.doScroll && b && J()
                }
            }
        }, isFunction: function (a) {
            return e.type(a) === "function"
        }, isArray: Array.isArray || function (a) {
            return e.type(a) === "array"
        }, isWindow: function (a) {
            return a != null && a == a.window
        }, isNumeric: function (a) {
            return!isNaN(parseFloat(a)) && isFinite(a)
        }, type: function (a) {
            return a == null ? String(a) : I[C.call(a)] || "object"
        }, isPlainObject: function (a) {
            if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a))return!1;
            try {
                if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf"))return!1
            } catch (c) {
                return!1
            }
            var d;
            for (d in a);
            return d === b || D.call(a, d)
        }, isEmptyObject: function (a) {
            for (var b in a)return!1;
            return!0
        }, error: function (a) {
            throw new Error(a)
        }, parseJSON: function (b) {
            if (typeof b != "string" || !b)return null;
            b = e.trim(b);
            if (a.JSON && a.JSON.parse)return a.JSON.parse(b);
            if (n.test(b.replace(o, "@").replace(p, "]").replace(q, "")))return(new Function("return " + b))();
            e.error("Invalid JSON: " + b)
        }, parseXML: function (c) {
            if (typeof c != "string" || !c)return null;
            var d, f;
            try {
                a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
            } catch (g) {
                d = b
            }
            (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
            return d
        }, noop: function () {
        }, globalEval: function (b) {
            b && j.test(b) && (a.execScript || function (b) {
                a.eval.call(a, b)
            })(b)
        }, camelCase: function (a) {
            return a.replace(w, "ms-").replace(v, x)
        }, nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
        }, each: function (a, c, d) {
            var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
            if (d) {
                if (i) {
                    for (f in a)if (c.apply(a[f], d) === !1)break
                } else for (; g < h;)if (c.apply(a[g++], d) === !1)break
            } else if (i) {
                for (f in a)if (c.call(a[f], f, a[f]) === !1)break
            } else for (; g < h;)if (c.call(a[g], g, a[g++]) === !1)break;
            return a
        }, trim: G ? function (a) {
            return a == null ? "" : G.call(a)
        } : function (a) {
            return a == null ? "" : (a + "").replace(k, "").replace(l, "")
        }, makeArray: function (a, b) {
            var c = b || [];
            if (a != null) {
                var d = e.type(a);
                a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
            }
            return c
        }, inArray: function (a, b, c) {
            var d;
            if (b) {
                if (H)return H.call(b, a, c);
                d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                for (; c < d; c++)if (c in b && b[c] === a)return c
            }
            return-1
        }, merge: function (a, c) {
            var d = a.length, e = 0;
            if (typeof c.length == "number")for (var f = c.length; e < f; e++)a[d++] = c[e]; else while (c[e] !== b)a[d++] = c[e++];
            a.length = d;
            return a
        }, grep: function (a, b, c) {
            var d = [], e;
            c = !!c;
            for (var f = 0, g = a.length; f < g; f++)e = !!b(a[f], f), c !== e && d.push(a[f]);
            return d
        }, map: function (a, c, d) {
            var f, g, h = [], i = 0, j = a.length, k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
            if (k)for (; i < j; i++)f = c(a[i], i, d), f != null && (h[h.length] = f); else for (g in a)f = c(a[g], g, d), f != null && (h[h.length] = f);
            return h.concat.apply([], h)
        }, guid: 1, proxy: function (a, c) {
            if (typeof c == "string") {
                var d = a[c];
                c = a, a = d
            }
            if (!e.isFunction(a))return b;
            var f = F.call(arguments, 2), g = function () {
                return a.apply(c, f.concat(F.call(arguments)))
            };
            g.guid = a.guid = a.guid || g.guid || e.guid++;
            return g
        }, access: function (a, c, d, f, g, h, i) {
            var j, k = d == null, l = 0, m = a.length;
            if (d && typeof d == "object") {
                for (l in d)e.access(a, c, l, d[l], 1, h, f);
                g = 1
            } else if (f !== b) {
                j = i === b && e.isFunction(f), k && (j ? (j = c, c = function (a, b, c) {
                    return j.call(e(a), c)
                }) : (c.call(a, f), c = null));
                if (c)for (; l < m; l++)c(a[l], d, j ? f.call(a[l], l, c(a[l], d)) : f, i);
                g = 1
            }
            return g ? a : k ? c.call(a) : m ? c(a[0], d) : h
        }, now: function () {
            return(new Date).getTime()
        }, uaMatch: function (a) {
            a = a.toLowerCase();
            var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
            return{browser: b[1] || "", version: b[2] || "0"}
        }, sub: function () {
            function a(b, c) {
                return new a.fn.init(b, c)
            }

            e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (d, f) {
                f && f instanceof e && !(f instanceof a) && (f = a(f));
                return e.fn.init.call(this, d, f, b)
            }, a.fn.init.prototype = a.fn;
            var b = a(c);
            return a
        }, browser: {}}), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
            I["[object " + b + "]"] = b.toLowerCase()
        }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function () {
            c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
        } : c.attachEvent && (B = function () {
            c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
        });
        return e
    }(), g = {};
    f.Callbacks = function (a) {
        a = a ? g[a] || h(a) : {};
        var c = [], d = [], e, i, j, k, l, m, n = function (b) {
            var d, e, g, h, i;
            for (d = 0, e = b.length; d < e; d++)g = b[d], h = f.type(g), h === "array" ? n(g) : h === "function" && (!a.unique || !p.has(g)) && c.push(g)
        }, o = function (b, f) {
            f = f || [], e = !a.memory || [b, f], i = !0, j = !0, m = k || 0, k = 0, l = c.length;
            for (; c && m < l; m++)if (c[m].apply(b, f) === !1 && a.stopOnFalse) {
                e = !0;
                break
            }
            j = !1, c && (a.once ? e === !0 ? p.disable() : c = [] : d && d.length && (e = d.shift(), p.fireWith(e[0], e[1])))
        }, p = {add: function () {
            if (c) {
                var a = c.length;
                n(arguments), j ? l = c.length : e && e !== !0 && (k = a, o(e[0], e[1]))
            }
            return this
        }, remove: function () {
            if (c) {
                var b = arguments, d = 0, e = b.length;
                for (; d < e; d++)for (var f = 0; f < c.length; f++)if (b[d] === c[f]) {
                    j && f <= l && (l--, f <= m && m--), c.splice(f--, 1);
                    if (a.unique)break
                }
            }
            return this
        }, has: function (a) {
            if (c) {
                var b = 0, d = c.length;
                for (; b < d; b++)if (a === c[b])return!0
            }
            return!1
        }, empty: function () {
            c = [];
            return this
        }, disable: function () {
            c = d = e = b;
            return this
        }, disabled: function () {
            return!c
        }, lock: function () {
            d = b, (!e || e === !0) && p.disable();
            return this
        }, locked: function () {
            return!d
        }, fireWith: function (b, c) {
            d && (j ? a.once || d.push([b, c]) : (!a.once || !e) && o(b, c));
            return this
        }, fire: function () {
            p.fireWith(this, arguments);
            return this
        }, fired: function () {
            return!!i
        }};
        return p
    };
    var i = [].slice;
    f.extend({Deferred: function (a) {
        var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"), e = "pending", g = {resolve: b, reject: c, notify: d}, h = {done: b.add, fail: c.add, progress: d.add, state: function () {
            return e
        }, isResolved: b.fired, isRejected: c.fired, then: function (a, b, c) {
            i.done(a).fail(b).progress(c);
            return this
        }, always: function () {
            i.done.apply(i, arguments).fail.apply(i, arguments);
            return this
        }, pipe: function (a, b, c) {
            return f.Deferred(function (d) {
                f.each({done: [a, "resolve"], fail: [b, "reject"], progress: [c, "notify"]}, function (a, b) {
                    var c = b[0], e = b[1], g;
                    f.isFunction(c) ? i[a](function () {
                        g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                    }) : i[a](d[e])
                })
            }).promise()
        }, promise: function (a) {
            if (a == null)a = h; else for (var b in h)a[b] = h[b];
            return a
        }}, i = h.promise({}), j;
        for (j in g)i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
        i.done(function () {
            e = "resolved"
        }, c.disable, d.lock).fail(function () {
            e = "rejected"
        }, b.disable, d.lock), a && a.call(i, i);
        return i
    }, when: function (a) {
        function m(a) {
            return function (b) {
                e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
            }
        }

        function l(a) {
            return function (c) {
                b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
            }
        }

        var b = i.call(arguments, 0), c = 0, d = b.length, e = Array(d), g = d, h = d, j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(), k = j.promise();
        if (d > 1) {
            for (; c < d; c++)b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
            g || j.resolveWith(j, b)
        } else j !== a && j.resolveWith(j, d ? [a] : []);
        return k
    }}), f.support = function () {
        var b, d, e, g, h, i, j, k, l, m, n, o, p = c.createElement("div"), q = c.documentElement;
        p.setAttribute("className", "t"), p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = p.getElementsByTagName("*"), e = p.getElementsByTagName("a")[0];
        if (!d || !d.length || !e)return{};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = p.getElementsByTagName("input")[0], b = {leadingWhitespace: p.firstChild.nodeType === 3, tbody: !p.getElementsByTagName("tbody").length, htmlSerialize: !!p.getElementsByTagName("link").length, style: /top/.test(e.getAttribute("style")), hrefNormalized: e.getAttribute("href") === "/a", opacity: /^0.55/.test(e.style.opacity), cssFloat: !!e.style.cssFloat, checkOn: i.value === "on", optSelected: h.selected, getSetAttribute: p.className !== "t", enctype: !!c.createElement("form").enctype, html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>", submitBubbles: !0, changeBubbles: !0, focusinBubbles: !1, deleteExpando: !0, noCloneEvent: !0, inlineBlockNeedsLayout: !1, shrinkWrapBlocks: !1, reliableMarginRight: !0, pixelMargin: !0}, f.boxModel = b.boxModel = c.compatMode === "CSS1Compat", i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete p.test
        } catch (r) {
            b.deleteExpando = !1
        }
        !p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", function () {
            b.noCloneEvent = !1
        }), p.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), p.appendChild(i), j = c.createDocumentFragment(), j.appendChild(p.lastChild), b.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, j.removeChild(i), j.appendChild(p);
        if (p.attachEvent)for (n in{submit: 1, change: 1, focusin: 1})m = "on" + n, o = m in p, o || (p.setAttribute(m, "return;"), o = typeof p[m] == "function"), b[n + "Bubbles"] = o;
        j.removeChild(p), j = g = h = p = i = null, f(function () {
            var d, e, g, h, i, j, l, m, n, q, r, s, t, u = c.getElementsByTagName("body")[0];
            !u || (m = 1, t = "padding:0;margin:0;border:", r = "position:absolute;top:0;left:0;width:1px;height:1px;", s = t + "0;visibility:hidden;", n = "style='" + r + t + "5px solid #000;", q = "<div " + n + "display:block;'><div style='" + t + "0;display:block;overflow:hidden;'></div></div>" + "<table " + n + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", d = c.createElement("div"), d.style.cssText = s + "width:0;height:0;position:static;top:0;margin-top:" + m + "px", u.insertBefore(d, u.firstChild), p = c.createElement("div"), d.appendChild(p), p.innerHTML = "<table><tr><td style='" + t + "0;display:none'></td><td>t</td></tr></table>", k = p.getElementsByTagName("td"), o = k[0].offsetHeight === 0, k[0].style.display = "", k[1].style.display = "none", b.reliableHiddenOffsets = o && k[0].offsetHeight === 0, a.getComputedStyle && (p.innerHTML = "", l = c.createElement("div"), l.style.width = "0", l.style.marginRight = "0", p.style.width = "2px", p.appendChild(l), b.reliableMarginRight = (parseInt((a.getComputedStyle(l, null) || {marginRight: 0}).marginRight, 10) || 0) === 0), typeof p.style.zoom != "undefined" && (p.innerHTML = "", p.style.width = p.style.padding = "1px", p.style.border = 0, p.style.overflow = "hidden", p.style.display = "inline", p.style.zoom = 1, b.inlineBlockNeedsLayout = p.offsetWidth === 3, p.style.display = "block", p.style.overflow = "visible", p.innerHTML = "<div style='width:5px;'></div>", b.shrinkWrapBlocks = p.offsetWidth !== 3), p.style.cssText = r + s, p.innerHTML = q, e = p.firstChild, g = e.firstChild, i = e.nextSibling.firstChild.firstChild, j = {doesNotAddBorder: g.offsetTop !== 5, doesAddBorderForTableAndCells: i.offsetTop === 5}, g.style.position = "fixed", g.style.top = "20px", j.fixedPosition = g.offsetTop === 20 || g.offsetTop === 15, g.style.position = g.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", j.subtractsBorderForOverflowNotVisible = g.offsetTop === -5, j.doesNotIncludeMarginInBodyOffset = u.offsetTop !== m, a.getComputedStyle && (p.style.marginTop = "1%", b.pixelMargin = (a.getComputedStyle(p, null) || {marginTop: 0}).marginTop !== "1%"), typeof d.style.zoom != "undefined" && (d.style.zoom = 1), u.removeChild(d), l = p = d = null, f.extend(b, j))
        });
        return b
    }();
    var j = /^(?:\{.*\}|\[.*\])$/, k = /([A-Z])/g;
    f.extend({cache: {}, uuid: 0, expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""), noData: {embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0}, hasData: function (a) {
        a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
        return!!a && !m(a)
    }, data: function (a, c, d, e) {
        if (!!f.acceptData(a)) {
            var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a, n = l ? a[j] : a[j] && j, o = c === "events";
            if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b)return;
            n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
            if (typeof c == "object" || typeof c == "function")e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
            g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
            if (o && !h[c])return g.events;
            k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
            return i
        }
    }, removeData: function (a, b, c) {
        if (!!f.acceptData(a)) {
            var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
            if (!j[k])return;
            if (b) {
                d = c ? j[k] : j[k].data;
                if (d) {
                    f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                    for (e = 0, g = b.length; e < g; e++)delete d[b[e]];
                    if (!(c ? m : f.isEmptyObject)(d))return
                }
            }
            if (!c) {
                delete j[k].data;
                if (!m(j[k]))return
            }
            f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
        }
    }, _data: function (a, b, c) {
        return f.data(a, b, c, !0)
    }, acceptData: function (a) {
        if (a.nodeName) {
            var b = f.noData[a.nodeName.toLowerCase()];
            if (b)return b !== !0 && a.getAttribute("classid") === b
        }
        return!0
    }}), f.fn.extend({data: function (a, c) {
        var d, e, g, h, i, j = this[0], k = 0, m = null;
        if (a === b) {
            if (this.length) {
                m = f.data(j);
                if (j.nodeType === 1 && !f._data(j, "parsedAttrs")) {
                    g = j.attributes;
                    for (i = g.length; k < i; k++)h = g[k].name, h.indexOf("data-") === 0 && (h = f.camelCase(h.substring(5)), l(j, h, m[h]));
                    f._data(j, "parsedAttrs", !0)
                }
            }
            return m
        }
        if (typeof a == "object")return this.each(function () {
            f.data(this, a)
        });
        d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!";
        return f.access(this, function (c) {
            if (c === b) {
                m = this.triggerHandler("getData" + e, [d[0]]), m === b && j && (m = f.data(j, a), m = l(j, a, m));
                return m === b && d[1] ? this.data(d[0]) : m
            }
            d[1] = c, this.each(function () {
                var b = f(this);
                b.triggerHandler("setData" + e, d), f.data(this, a, c), b.triggerHandler("changeData" + e, d)
            })
        }, null, c, arguments.length > 1, null, !1)
    }, removeData: function (a) {
        return this.each(function () {
            f.removeData(this, a)
        })
    }}), f.extend({_mark: function (a, b) {
        a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
    }, _unmark: function (a, b, c) {
        a !== !0 && (c = b, b = a, a = !1);
        if (b) {
            c = c || "fx";
            var d = c + "mark", e = a ? 0 : (f._data(b, d) || 1) - 1;
            e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
        }
    }, queue: function (a, b, c) {
        var d;
        if (a) {
            b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
            return d || []
        }
    }, dequeue: function (a, b) {
        b = b || "fx";
        var c = f.queue(a, b), d = c.shift(), e = {};
        d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function () {
            f.dequeue(a, b)
        }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
    }}), f.fn.extend({queue: function (a, c) {
        var d = 2;
        typeof a != "string" && (c = a, a = "fx", d--);
        if (arguments.length < d)return f.queue(this[0], a);
        return c === b ? this : this.each(function () {
            var b = f.queue(this, a, c);
            a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
        })
    }, dequeue: function (a) {
        return this.each(function () {
            f.dequeue(this, a)
        })
    }, delay: function (a, b) {
        a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
        return this.queue(b, function (b, c) {
            var d = setTimeout(b, a);
            c.stop = function () {
                clearTimeout(d)
            }
        })
    }, clearQueue: function (a) {
        return this.queue(a || "fx", [])
    }, promise: function (a, c) {
        function m() {
            --h || d.resolveWith(e, [e])
        }

        typeof a != "string" && (c = a, a = b), a = a || "fx";
        var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
        while (g--)if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0))h++, l.add(m);
        m();
        return d.promise(c)
    }});
    var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i, s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i, u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, v = f.support.getSetAttribute, w, x, y;
    f.fn.extend({attr: function (a, b) {
        return f.access(this, f.attr, a, b, arguments.length > 1)
    }, removeAttr: function (a) {
        return this.each(function () {
            f.removeAttr(this, a)
        })
    }, prop: function (a, b) {
        return f.access(this, f.prop, a, b, arguments.length > 1)
    }, removeProp: function (a) {
        a = f.propFix[a] || a;
        return this.each(function () {
            try {
                this[a] = b, delete this[a]
            } catch (c) {
            }
        })
    }, addClass: function (a) {
        var b, c, d, e, g, h, i;
        if (f.isFunction(a))return this.each(function (b) {
            f(this).addClass(a.call(this, b, this.className))
        });
        if (a && typeof a == "string") {
            b = a.split(p);
            for (c = 0, d = this.length; c < d; c++) {
                e = this[c];
                if (e.nodeType === 1)if (!e.className && b.length === 1)e.className = a; else {
                    g = " " + e.className + " ";
                    for (h = 0, i = b.length; h < i; h++)~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                    e.className = f.trim(g)
                }
            }
        }
        return this
    }, removeClass: function (a) {
        var c, d, e, g, h, i, j;
        if (f.isFunction(a))return this.each(function (b) {
            f(this).removeClass(a.call(this, b, this.className))
        });
        if (a && typeof a == "string" || a === b) {
            c = (a || "").split(p);
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                if (g.nodeType === 1 && g.className)if (a) {
                    h = (" " + g.className + " ").replace(o, " ");
                    for (i = 0, j = c.length; i < j; i++)h = h.replace(" " + c[i] + " ", " ");
                    g.className = f.trim(h)
                } else g.className = ""
            }
        }
        return this
    }, toggleClass: function (a, b) {
        var c = typeof a, d = typeof b == "boolean";
        if (f.isFunction(a))return this.each(function (c) {
            f(this).toggleClass(a.call(this, c, this.className, b), b)
        });
        return this.each(function () {
            if (c === "string") {
                var e, g = 0, h = f(this), i = b, j = a.split(p);
                while (e = j[g++])i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
            } else if (c === "undefined" || c === "boolean")this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
        })
    }, hasClass: function (a) {
        var b = " " + a + " ", c = 0, d = this.length;
        for (; c < d; c++)if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1)return!0;
        return!1
    }, val: function (a) {
        var c, d, e, g = this[0];
        {
            if (!!arguments.length) {
                e = f.isFunction(a);
                return this.each(function (d) {
                    var g = f(this), h;
                    if (this.nodeType === 1) {
                        e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                            return a == null ? "" : a + ""
                        })), c = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()];
                        if (!c || !("set"in c) || c.set(this, h, "value") === b)this.value = h
                    }
                })
            }
            if (g) {
                c = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()];
                if (c && "get"in c && (d = c.get(g, "value")) !== b)return d;
                d = g.value;
                return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
            }
        }
    }}), f.extend({valHooks: {option: {get: function (a) {
        var b = a.attributes.value;
        return!b || b.specified ? a.value : a.text
    }}, select: {get: function (a) {
        var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
        if (g < 0)return null;
        c = j ? g : 0, d = j ? g + 1 : i.length;
        for (; c < d; c++) {
            e = i[c];
            if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                b = f(e).val();
                if (j)return b;
                h.push(b)
            }
        }
        if (j && !h.length && i.length)return f(i[g]).val();
        return h
    }, set: function (a, b) {
        var c = f.makeArray(b);
        f(a).find("option").each(function () {
            this.selected = f.inArray(f(this).val(), c) >= 0
        }), c.length || (a.selectedIndex = -1);
        return c
    }}}, attrFn: {val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0}, attr: function (a, c, d, e) {
        var g, h, i, j = a.nodeType;
        if (!!a && j !== 3 && j !== 8 && j !== 2) {
            if (e && c in f.attrFn)return f(a)[c](d);
            if (typeof a.getAttribute == "undefined")return f.prop(a, c, d);
            i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
            if (d !== b) {
                if (d === null) {
                    f.removeAttr(a, c);
                    return
                }
                if (h && "set"in h && i && (g = h.set(a, d, c)) !== b)return g;
                a.setAttribute(c, "" + d);
                return d
            }
            if (h && "get"in h && i && (g = h.get(a, c)) !== null)return g;
            g = a.getAttribute(c);
            return g === null ? b : g
        }
    }, removeAttr: function (a, b) {
        var c, d, e, g, h, i = 0;
        if (b && a.nodeType === 1) {
            d = b.toLowerCase().split(p), g = d.length;
            for (; i < g; i++)e = d[i], e && (c = f.propFix[e] || e, h = u.test(e), h || f.attr(a, e, ""), a.removeAttribute(v ? e : c), h && c in a && (a[c] = !1))
        }
    }, attrHooks: {type: {set: function (a, b) {
        if (r.test(a.nodeName) && a.parentNode)f.error("type property can't be changed"); else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
            var c = a.value;
            a.setAttribute("type", b), c && (a.value = c);
            return b
        }
    }}, value: {get: function (a, b) {
        if (w && f.nodeName(a, "button"))return w.get(a, b);
        return b in a ? a.value : null
    }, set: function (a, b, c) {
        if (w && f.nodeName(a, "button"))return w.set(a, b, c);
        a.value = b
    }}}, propFix: {tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable"}, prop: function (a, c, d) {
        var e, g, h, i = a.nodeType;
        if (!!a && i !== 3 && i !== 8 && i !== 2) {
            h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
            return d !== b ? g && "set"in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get"in g && (e = g.get(a, c)) !== null ? e : a[c]
        }
    }, propHooks: {tabIndex: {get: function (a) {
        var c = a.getAttributeNode("tabindex");
        return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
    }}}}), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {get: function (a, c) {
        var d, e = f.prop(a, c);
        return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
    }, set: function (a, b, c) {
        var d;
        b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
        return c
    }}, v || (y = {name: !0, id: !0, coords: !0}, w = f.valHooks.button = {get: function (a, c) {
        var d;
        d = a.getAttributeNode(c);
        return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
    }, set: function (a, b, d) {
        var e = a.getAttributeNode(d);
        e || (e = c.createAttribute(d), a.setAttributeNode(e));
        return e.nodeValue = b + ""
    }}, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {set: function (a, c) {
            if (c === "") {
                a.setAttribute(b, "auto");
                return c
            }
        }})
    }), f.attrHooks.contenteditable = {get: w.get, set: function (a, b, c) {
        b === "" && (b = "false"), w.set(a, b, c)
    }}), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {get: function (a) {
            var d = a.getAttribute(c, 2);
            return d === null ? b : d
        }})
    }), f.support.style || (f.attrHooks.style = {get: function (a) {
        return a.style.cssText.toLowerCase() || b
    }, set: function (a, b) {
        return a.style.cssText = "" + b
    }}), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {get: function (a) {
        var b = a.parentNode;
        b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
        return null
    }})), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = {get: function (a) {
            return a.getAttribute("value") === null ? "on" : a.value
        }}
    }), f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = f.extend(f.valHooks[this], {set: function (a, b) {
            if (f.isArray(b))return a.checked = f.inArray(f(a).val(), b) >= 0
        }})
    });
    var z = /^(?:textarea|input|select)$/i, A = /^([^\.]*)?(?:\.(.+))?$/, B = /(?:^|\s)hover(\.\S+)?\b/, C = /^key/, D = /^(?:mouse|contextmenu)|click/, E = /^(?:focusinfocus|focusoutblur)$/, F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, G = function (a) {
        var b = F.exec(a);
        b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
        return b
    }, H = function (a, b) {
        var c = a.attributes || {};
        return(!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
    }, I = function (a) {
        return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
    };
    f.event = {add: function (a, c, d, e, g) {
        var h, i, j, k, l, m, n, o, p, q, r, s;
        if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
            d.handler && (p = d, d = p.handler, g = p.selector), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function (a) {
                return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
            }, i.elem = a), c = f.trim(I(c)).split(" ");
            for (k = 0; k < c.length; k++) {
                l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({type: m, origType: l[1], data: e, handler: d, guid: d.guid, selector: g, quick: g && G(g), namespace: n.join(".")}, p), r = j[m];
                if (!r) {
                    r = j[m] = [], r.delegateCount = 0;
                    if (!s.setup || s.setup.call(a, e, n, i) === !1)a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                }
                s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
            }
            a = null
        }
    }, global: {}, remove: function (a, b, c, d, e) {
        var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
        if (!!g && !!(o = g.events)) {
            b = f.trim(I(b || "")).split(" ");
            for (h = 0; h < b.length; h++) {
                i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                if (!j) {
                    for (j in o)f.event.remove(a, j + b[h], c, d, !0);
                    continue
                }
                p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                for (n = 0; n < r.length; n++)s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
            }
            f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
        }
    }, customEvent: {getData: !0, setData: !0, changeData: !0}, trigger: function (c, d, e, g) {
        if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
            var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
            if (E.test(h + f.event.triggered))return;
            h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
            if ((!e || f.event.customEvent[h]) && !f.event.global[h])return;
            c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
            if (!e) {
                j = f.cache;
                for (l in j)j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                return
            }
            c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
            if (p.trigger && p.trigger.apply(e, d) === !1)return;
            r = [
                [e, p.bindType || h]
            ];
            if (!g && !p.noBubble && !f.isWindow(e)) {
                s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                for (; m; m = m.parentNode)r.push([m, s]), n = m;
                n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
            }
            for (l = 0; l < r.length && !c.isPropagationStopped(); l++)m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
            c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
            return c.result
        }
    }, dispatch: function (c) {
        c = f.event.fix(c || a.event);
        var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0), h = !c.exclusive && !c.namespace, i = f.event.special[c.type] || {}, j = [], k, l, m, n, o, p, q, r, s, t, u;
        g[0] = c, c.delegateTarget = this;
        if (!i.preDispatch || i.preDispatch.call(this, c) !== !1) {
            if (e && (!c.button || c.type !== "click")) {
                n = f(this), n.context = this.ownerDocument || this;
                for (m = c.target; m != this; m = m.parentNode || this)if (m.disabled !== !0) {
                    p = {}, r = [], n[0] = m;
                    for (k = 0; k < e; k++)s = d[k], t = s.selector, p[t] === b && (p[t] = s.quick ? H(m, s.quick) : n.is(t)), p[t] && r.push(s);
                    r.length && j.push({elem: m, matches: r})
                }
            }
            d.length > e && j.push({elem: this, matches: d.slice(e)});
            for (k = 0; k < j.length && !c.isPropagationStopped(); k++) {
                q = j[k], c.currentTarget = q.elem;
                for (l = 0; l < q.matches.length && !c.isImmediatePropagationStopped(); l++) {
                    s = q.matches[l];
                    if (h || !c.namespace && !s.namespace || c.namespace_re && c.namespace_re.test(s.namespace))c.data = s.data, c.handleObj = s, o = ((f.event.special[s.origType] || {}).handle || s.handler).apply(q.elem, g), o !== b && (c.result = o, o === !1 && (c.preventDefault(), c.stopPropagation()))
                }
            }
            i.postDispatch && i.postDispatch.call(this, c);
            return c.result
        }
    }, props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: {props: "char charCode key keyCode".split(" "), filter: function (a, b) {
        a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
        return a
    }}, mouseHooks: {props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (a, d) {
        var e, f, g, h = d.button, i = d.fromElement;
        a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
        return a
    }}, fix: function (a) {
        if (a[f.expando])return a;
        var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
        a = f.Event(g);
        for (d = i.length; d;)e = i[--d], a[e] = g[e];
        a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
        return h.filter ? h.filter(a, g) : a
    }, special: {ready: {setup: f.bindReady}, load: {noBubble: !0}, focus: {delegateType: "focusin"}, blur: {delegateType: "focusout"}, beforeunload: {setup: function (a, b, c) {
        f.isWindow(this) && (this.onbeforeunload = c)
    }, teardown: function (a, b) {
        this.onbeforeunload === b && (this.onbeforeunload = null)
    }}}, simulate: function (a, b, c, d) {
        var e = f.extend(new f.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
        d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
    }}, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    }, f.Event = function (a, b) {
        if (!(this instanceof f.Event))return new f.Event(a, b);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
    }, f.Event.prototype = {preventDefault: function () {
        this.isDefaultPrevented = K;
        var a = this.originalEvent;
        !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
    }, stopPropagation: function () {
        this.isPropagationStopped = K;
        var a = this.originalEvent;
        !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
    }, stopImmediatePropagation: function () {
        this.isImmediatePropagationStopped = K, this.stopPropagation()
    }, isDefaultPrevented: J, isPropagationStopped: J, isImmediatePropagationStopped: J}, f.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, b) {
        f.event.special[a] = {delegateType: b, bindType: b, handle: function (a) {
            var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
            if (!d || d !== c && !f.contains(c, d))a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
            return h
        }}
    }), f.support.submitBubbles || (f.event.special.submit = {setup: function () {
        if (f.nodeName(this, "form"))return!1;
        f.event.add(this, "click._submit keypress._submit", function (a) {
            var c = a.target, d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
            d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
                a._submit_bubble = !0
            }), d._submit_attached = !0)
        })
    }, postDispatch: function (a) {
        a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0))
    }, teardown: function () {
        if (f.nodeName(this, "form"))return!1;
        f.event.remove(this, "._submit")
    }}), f.support.changeBubbles || (f.event.special.change = {setup: function () {
        if (z.test(this.nodeName)) {
            if (this.type === "checkbox" || this.type === "radio")f.event.add(this, "propertychange._change", function (a) {
                a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
            }), f.event.add(this, "click._change", function (a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
            });
            return!1
        }
        f.event.add(this, "beforeactivate._change", function (a) {
            var b = a.target;
            z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
                this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
            }), b._change_attached = !0)
        })
    }, handle: function (a) {
        var b = a.target;
        if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox")return a.handleObj.handler.apply(this, arguments)
    }, teardown: function () {
        f.event.remove(this, "._change");
        return z.test(this.nodeName)
    }}), f.support.focusinBubbles || f.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var d = 0, e = function (a) {
            f.event.simulate(b, a.target, f.event.fix(a), !0)
        };
        f.event.special[b] = {setup: function () {
            d++ === 0 && c.addEventListener(a, e, !0)
        }, teardown: function () {
            --d === 0 && c.removeEventListener(a, e, !0)
        }}
    }), f.fn.extend({on: function (a, c, d, e, g) {
        var h, i;
        if (typeof a == "object") {
            typeof c != "string" && (d = d || c, c = b);
            for (i in a)this.on(i, c, d, a[i], g);
            return this
        }
        d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
        if (e === !1)e = J; else if (!e)return this;
        g === 1 && (h = e, e = function (a) {
            f().off(a);
            return h.apply(this, arguments)
        }, e.guid = h.guid || (h.guid = f.guid++));
        return this.each(function () {
            f.event.add(this, a, e, d, c)
        })
    }, one: function (a, b, c, d) {
        return this.on(a, b, c, d, 1)
    }, off: function (a, c, d) {
        if (a && a.preventDefault && a.handleObj) {
            var e = a.handleObj;
            f(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler);
            return this
        }
        if (typeof a == "object") {
            for (var g in a)this.off(g, c, a[g]);
            return this
        }
        if (c === !1 || typeof c == "function")d = c, c = b;
        d === !1 && (d = J);
        return this.each(function () {
            f.event.remove(this, a, d, c)
        })
    }, bind: function (a, b, c) {
        return this.on(a, null, b, c)
    }, unbind: function (a, b) {
        return this.off(a, null, b)
    }, live: function (a, b, c) {
        f(this.context).on(a, this.selector, b, c);
        return this
    }, die: function (a, b) {
        f(this.context).off(a, this.selector || "**", b);
        return this
    }, delegate: function (a, b, c, d) {
        return this.on(b, a, c, d)
    }, undelegate: function (a, b, c) {
        return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
    }, trigger: function (a, b) {
        return this.each(function () {
            f.event.trigger(a, b, this)
        })
    }, triggerHandler: function (a, b) {
        if (this[0])return f.event.trigger(a, b, this[0], !0)
    }, toggle: function (a) {
        var b = arguments, c = a.guid || f.guid++, d = 0, e = function (c) {
            var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
            f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
            return b[e].apply(this, arguments) || !1
        };
        e.guid = c;
        while (d < b.length)b[d++].guid = c;
        return this.click(e)
    }, hover: function (a, b) {
        return this.mouseenter(a).mouseleave(b || a)
    }}), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        f.fn[b] = function (a, c) {
            c == null && (c = a, a = null);
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
    }), function () {
        function x(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        if (j.nodeType === 1) {
                            g || (j[d] = c, j.sizset = h);
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break
                                }
                            } else if (m.filter(b, [j]).length > 0) {
                                k = j;
                                break
                            }
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        function w(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                        if (j.nodeName.toLowerCase() === b) {
                            k = j;
                            break
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, d = "sizcache" + (Math.random() + "").replace(".", ""), e = 0, g = Object.prototype.toString, h = !1, i = !0, j = /\\/g, k = /\r\n/g, l = /\W/;
        [0, 0].sort(function () {
            i = !1;
            return 0
        });
        var m = function (b, d, e, f) {
            e = e || [], d = d || c;
            var h = d;
            if (d.nodeType !== 1 && d.nodeType !== 9)return[];
            if (!b || typeof b != "string")return e;
            var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
            do {
                a.exec(""), i = a.exec(x);
                if (i) {
                    x = i[3], w.push(i[1]);
                    if (i[2]) {
                        l = i[3];
                        break
                    }
                }
            } while (i);
            if (w.length > 1 && p.exec(b))if (w.length === 2 && o.relative[w[0]])j = y(w[0] + w[1], d, f); else {
                j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                while (w.length)b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
            } else {
                !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                if (d) {
                    n = f ? {expr: w.pop(), set: s(f)} : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                    while (w.length)q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
                } else k = w = []
            }
            k || (k = j), k || m.error(q || b);
            if (g.call(k) === "[object Array]")if (!u)e.push.apply(e, k); else if (d && d.nodeType === 1)for (t = 0; k[t] != null; t++)k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]); else for (t = 0; k[t] != null; t++)k[t] && k[t].nodeType === 1 && e.push(j[t]); else s(k, e);
            l && (m(l, h, e, f), m.uniqueSort(e));
            return e
        };
        m.uniqueSort = function (a) {
            if (u) {
                h = i, a.sort(u);
                if (h)for (var b = 1; b < a.length; b++)a[b] === a[b - 1] && a.splice(b--, 1)
            }
            return a
        }, m.matches = function (a, b) {
            return m(a, null, null, b)
        }, m.matchesSelector = function (a, b) {
            return m(b, null, null, [a]).length > 0
        }, m.find = function (a, b, c) {
            var d, e, f, g, h, i;
            if (!a)return[];
            for (e = 0, f = o.order.length; e < f; e++) {
                h = o.order[e];
                if (g = o.leftMatch[h].exec(a)) {
                    i = g[1], g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(o.match[h], "");
                            break
                        }
                    }
                }
            }
            d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
            return{set: d, expr: a}
        }, m.filter = function (a, c, d, e) {
            var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
            while (a && c.length) {
                for (h in o.filter)if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                    k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                    if (l.substr(l.length - 1) === "\\")continue;
                    s === r && (r = []);
                    if (o.preFilter[h]) {
                        f = o.preFilter[h](f, s, d, r, e, t);
                        if (!f)g = i = !0; else if (f === !0)continue
                    }
                    if (f)for (n = 0; (j = s[n]) != null; n++)j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                    if (i !== b) {
                        d || (s = r), a = a.replace(o.match[h], "");
                        if (!g)return[];
                        break
                    }
                }
                if (a === q)if (g == null)m.error(a); else break;
                q = a
            }
            return s
        }, m.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        };
        var n = m.getText = function (a) {
            var b, c, d = a.nodeType, e = "";
            if (d) {
                if (d === 1 || d === 9 || d === 11) {
                    if (typeof a.textContent == "string")return a.textContent;
                    if (typeof a.innerText == "string")return a.innerText.replace(k, "");
                    for (a = a.firstChild; a; a = a.nextSibling)e += n(a)
                } else if (d === 3 || d === 4)return a.nodeValue
            } else for (b = 0; c = a[b]; b++)c.nodeType !== 8 && (e += n(c));
            return e
        }, o = m.selectors = {order: ["ID", "NAME", "TAG"], match: {ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/, ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/, TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/, CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/, POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/, PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/}, leftMatch: {}, attrMap: {"class": "className", "for": "htmlFor"}, attrHandle: {href: function (a) {
            return a.getAttribute("href")
        }, type: function (a) {
            return a.getAttribute("type")
        }}, relative: {"+": function (a, b) {
            var c = typeof b == "string", d = c && !l.test(b), e = c && !d;
            d && (b = b.toLowerCase());
            for (var f = 0, g = a.length, h; f < g; f++)if (h = a[f]) {
                while ((h = h.previousSibling) && h.nodeType !== 1);
                a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
            }
            e && m.filter(b, a, !0)
        }, ">": function (a, b) {
            var c, d = typeof b == "string", e = 0, f = a.length;
            if (d && !l.test(b)) {
                b = b.toLowerCase();
                for (; e < f; e++) {
                    c = a[e];
                    if (c) {
                        var g = c.parentNode;
                        a[e] = g.nodeName.toLowerCase() === b ? g : !1
                    }
                }
            } else {
                for (; e < f; e++)c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                d && m.filter(b, a, !0)
            }
        }, "": function (a, b, c) {
            var d, f = e++, g = x;
            typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
        }, "~": function (a, b, c) {
            var d, f = e++, g = x;
            typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
        }}, find: {ID: function (a, b, c) {
            if (typeof b.getElementById != "undefined" && !c) {
                var d = b.getElementById(a[1]);
                return d && d.parentNode ? [d] : []
            }
        }, NAME: function (a, b) {
            if (typeof b.getElementsByName != "undefined") {
                var c = [], d = b.getElementsByName(a[1]);
                for (var e = 0, f = d.length; e < f; e++)d[e].getAttribute("name") === a[1] && c.push(d[e]);
                return c.length === 0 ? null : c
            }
        }, TAG: function (a, b) {
            if (typeof b.getElementsByTagName != "undefined")return b.getElementsByTagName(a[1])
        }}, preFilter: {CLASS: function (a, b, c, d, e, f) {
            a = " " + a[1].replace(j, "") + " ";
            if (f)return a;
            for (var g = 0, h; (h = b[g]) != null; g++)h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
            return!1
        }, ID: function (a) {
            return a[1].replace(j, "")
        }, TAG: function (a, b) {
            return a[1].replace(j, "").toLowerCase()
        }, CHILD: function (a) {
            if (a[1] === "nth") {
                a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
            } else a[2] && m.error(a[0]);
            a[0] = e++;
            return a
        }, ATTR: function (a, b, c, d, e, f) {
            var g = a[1] = a[1].replace(j, "");
            !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
            return a
        }, PSEUDO: function (b, c, d, e, f) {
            if (b[1] === "not")if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3]))b[3] = m(b[3], null, null, c); else {
                var g = m.filter(b[3], c, d, !0 ^ f);
                d || e.push.apply(e, g);
                return!1
            } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0]))return!0;
            return b
        }, POS: function (a) {
            a.unshift(!0);
            return a
        }}, filters: {enabled: function (a) {
            return a.disabled === !1 && a.type !== "hidden"
        }, disabled: function (a) {
            return a.disabled === !0
        }, checked: function (a) {
            return a.checked === !0
        }, selected: function (a) {
            a.parentNode && a.parentNode.selectedIndex;
            return a.selected === !0
        }, parent: function (a) {
            return!!a.firstChild
        }, empty: function (a) {
            return!a.firstChild
        }, has: function (a, b, c) {
            return!!m(c[3], a).length
        }, header: function (a) {
            return/h\d/i.test(a.nodeName)
        }, text: function (a) {
            var b = a.getAttribute("type"), c = a.type;
            return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
        }, radio: function (a) {
            return a.nodeName.toLowerCase() === "input" && "radio" === a.type
        }, checkbox: function (a) {
            return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
        }, file: function (a) {
            return a.nodeName.toLowerCase() === "input" && "file" === a.type
        }, password: function (a) {
            return a.nodeName.toLowerCase() === "input" && "password" === a.type
        }, submit: function (a) {
            var b = a.nodeName.toLowerCase();
            return(b === "input" || b === "button") && "submit" === a.type
        }, image: function (a) {
            return a.nodeName.toLowerCase() === "input" && "image" === a.type
        }, reset: function (a) {
            var b = a.nodeName.toLowerCase();
            return(b === "input" || b === "button") && "reset" === a.type
        }, button: function (a) {
            var b = a.nodeName.toLowerCase();
            return b === "input" && "button" === a.type || b === "button"
        }, input: function (a) {
            return/input|select|textarea|button/i.test(a.nodeName)
        }, focus: function (a) {
            return a === a.ownerDocument.activeElement
        }}, setFilters: {first: function (a, b) {
            return b === 0
        }, last: function (a, b, c, d) {
            return b === d.length - 1
        }, even: function (a, b) {
            return b % 2 === 0
        }, odd: function (a, b) {
            return b % 2 === 1
        }, lt: function (a, b, c) {
            return b < c[3] - 0
        }, gt: function (a, b, c) {
            return b > c[3] - 0
        }, nth: function (a, b, c) {
            return c[3] - 0 === b
        }, eq: function (a, b, c) {
            return c[3] - 0 === b
        }}, filter: {PSEUDO: function (a, b, c, d) {
            var e = b[1], f = o.filters[e];
            if (f)return f(a, c, b, d);
            if (e === "contains")return(a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
            if (e === "not") {
                var g = b[3];
                for (var h = 0, i = g.length; h < i; h++)if (g[h] === a)return!1;
                return!0
            }
            m.error(e)
        }, CHILD: function (a, b) {
            var c, e, f, g, h, i, j, k = b[1], l = a;
            switch (k) {
                case"only":
                case"first":
                    while (l = l.previousSibling)if (l.nodeType === 1)return!1;
                    if (k === "first")return!0;
                    l = a;
                case"last":
                    while (l = l.nextSibling)if (l.nodeType === 1)return!1;
                    return!0;
                case"nth":
                    c = b[2], e = b[3];
                    if (c === 1 && e === 0)return!0;
                    f = b[0], g = a.parentNode;
                    if (g && (g[d] !== f || !a.nodeIndex)) {
                        i = 0;
                        for (l = g.firstChild; l; l = l.nextSibling)l.nodeType === 1 && (l.nodeIndex = ++i);
                        g[d] = f
                    }
                    j = a.nodeIndex - e;
                    return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
            }
        }, ID: function (a, b) {
            return a.nodeType === 1 && a.getAttribute("id") === b
        }, TAG: function (a, b) {
            return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
        }, CLASS: function (a, b) {
            return(" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
        }, ATTR: function (a, b) {
            var c = b[1], d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c), e = d + "", f = b[2], g = b[4];
            return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
        }, POS: function (a, b, c, d) {
            var e = b[2], f = o.setFilters[e];
            if (f)return f(a, c, b, d)
        }}}, p = o.match.POS, q = function (a, b) {
            return"\\" + (b - 0 + 1)
        };
        for (var r in o.match)o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        o.match.globalPOS = p;
        var s = function (a, b) {
            a = Array.prototype.slice.call(a, 0);
            if (b) {
                b.push.apply(b, a);
                return b
            }
            return a
        };
        try {
            Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
        } catch (t) {
            s = function (a, b) {
                var c = 0, d = b || [];
                if (g.call(a) === "[object Array]")Array.prototype.push.apply(d, a); else if (typeof a.length == "number")for (var e = a.length; c < e; c++)d.push(a[c]); else for (; a[c]; c++)d.push(a[c]);
                return d
            }
        }
        var u, v;
        c.documentElement.compareDocumentPosition ? u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (!a.compareDocumentPosition || !b.compareDocumentPosition)return a.compareDocumentPosition ? -1 : 1;
            return a.compareDocumentPosition(b) & 4 ? -1 : 1
        } : (u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (a.sourceIndex && b.sourceIndex)return a.sourceIndex - b.sourceIndex;
            var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
            if (g === i)return v(a, b);
            if (!g)return-1;
            if (!i)return 1;
            while (j)e.unshift(j), j = j.parentNode;
            j = i;
            while (j)f.unshift(j), j = j.parentNode;
            c = e.length, d = f.length;
            for (var k = 0; k < c && k < d; k++)if (e[k] !== f[k])return v(e[k], f[k]);
            return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
        }, v = function (a, b, c) {
            if (a === b)return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b)return-1;
                d = d.nextSibling
            }
            return 1
        }), function () {
            var a = c.createElement("div"), d = "script" + (new Date).getTime(), e = c.documentElement;
            a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function (a, c, d) {
                if (typeof c.getElementById != "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                }
            }, o.filter.ID = function (a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b
            }), e.removeChild(a), e = a = null
        }(), function () {
            var a = c.createElement("div");
            a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++)c[e].nodeType === 1 && d.push(c[e]);
                    c = d
                }
                return c
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
                return a.getAttribute("href", 2)
            }), a = null
        }(), c.querySelectorAll && function () {
            var a = m, b = c.createElement("div"), d = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                m = function (b, e, f, g) {
                    e = e || c;
                    if (!g && !m.isXML(e)) {
                        var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                        if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                            if (h[1])return s(e.getElementsByTagName(b), f);
                            if (h[2] && o.find.CLASS && e.getElementsByClassName)return s(e.getElementsByClassName(h[2]), f)
                        }
                        if (e.nodeType === 9) {
                            if (b === "body" && e.body)return s([e.body], f);
                            if (h && h[3]) {
                                var i = e.getElementById(h[3]);
                                if (!i || !i.parentNode)return s([], f);
                                if (i.id === h[3])return s([i], f)
                            }
                            try {
                                return s(e.querySelectorAll(b), f)
                            } catch (j) {
                            }
                        } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                            var k = e, l = e.getAttribute("id"), n = l || d, p = e.parentNode, q = /^\s*[+~]/.test(b);
                            l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                            try {
                                if (!q || p)return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                            } catch (r) {
                            } finally {
                                l || k.removeAttribute("id")
                            }
                        }
                    }
                    return a(b, e, f, g)
                };
                for (var e in a)m[e] = a[e];
                b = null
            }
        }(), function () {
            var a = c.documentElement, b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var d = !b.call(c.createElement("div"), "div"), e = !1;
                try {
                    b.call(c.documentElement, "[test!='']:sizzle")
                } catch (f) {
                    e = !0
                }
                m.matchesSelector = function (a, c) {
                    c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!m.isXML(a))try {
                        if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                            var f = b.call(a, c);
                            if (f || !d || a.document && a.document.nodeType !== 11)return f
                        }
                    } catch (g) {
                    }
                    return m(c, null, null, [a]).length > 0
                }
            }
        }(), function () {
            var a = c.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                a.lastChild.className = "e";
                if (a.getElementsByClassName("e").length === 1)return;
                o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
                    if (typeof b.getElementsByClassName != "undefined" && !c)return b.getElementsByClassName(a[1])
                }, a = null
            }
        }(), c.documentElement.contains ? m.contains = function (a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        } : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
            return!!(a.compareDocumentPosition(b) & 16)
        } : m.contains = function () {
            return!1
        }, m.isXML = function (a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1
        };
        var y = function (a, b, c) {
            var d, e = [], f = "", g = b.nodeType ? [b] : b;
            while (d = o.match.PSEUDO.exec(a))f += d[0], a = a.replace(o.match.PSEUDO, "");
            a = o.relative[a] ? a + "*" : a;
            for (var h = 0, i = g.length; h < i; h++)m(a, g[h], e, c);
            return m.filter(f, e)
        };
        m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
    }();
    var L = /Until$/, M = /^(?:parents|prevUntil|prevAll)/, N = /,/, O = /^.[^:#\[\.,]*$/, P = Array.prototype.slice, Q = f.expr.match.globalPOS, R = {children: !0, contents: !0, next: !0, prev: !0};
    f.fn.extend({find: function (a) {
        var b = this, c, d;
        if (typeof a != "string")return f(a).filter(function () {
            for (c = 0, d = b.length; c < d; c++)if (f.contains(b[c], this))return!0
        });
        var e = this.pushStack("", "find", a), g, h, i;
        for (c = 0, d = this.length; c < d; c++) {
            g = e.length, f.find(a, this[c], e);
            if (c > 0)for (h = g; h < e.length; h++)for (i = 0; i < g; i++)if (e[i] === e[h]) {
                e.splice(h--, 1);
                break
            }
        }
        return e
    }, has: function (a) {
        var b = f(a);
        return this.filter(function () {
            for (var a = 0, c = b.length; a < c; a++)if (f.contains(this, b[a]))return!0
        })
    }, not: function (a) {
        return this.pushStack(T(this, a, !1), "not", a)
    }, filter: function (a) {
        return this.pushStack(T(this, a, !0), "filter", a)
    }, is: function (a) {
        return!!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
    }, closest: function (a, b) {
        var c = [], d, e, g = this[0];
        if (f.isArray(a)) {
            var h = 1;
            while (g && g.ownerDocument && g !== b) {
                for (d = 0; d < a.length; d++)f(g).is(a[d]) && c.push({selector: a[d], elem: g, level: h});
                g = g.parentNode, h++
            }
            return c
        }
        var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
        for (d = 0, e = this.length; d < e; d++) {
            g = this[d];
            while (g) {
                if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                    c.push(g);
                    break
                }
                g = g.parentNode;
                if (!g || !g.ownerDocument || g === b || g.nodeType === 11)break
            }
        }
        c = c.length > 1 ? f.unique(c) : c;
        return this.pushStack(c, "closest", a)
    }, index: function (a) {
        if (!a)return this[0] && this[0].parentNode ? this.prevAll().length : -1;
        if (typeof a == "string")return f.inArray(this[0], f(a));
        return f.inArray(a.jquery ? a[0] : a, this)
    }, add: function (a, b) {
        var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a), d = f.merge(this.get(), c);
        return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
    }, andSelf: function () {
        return this.add(this.prevObject)
    }}), f.each({parent: function (a) {
        var b = a.parentNode;
        return b && b.nodeType !== 11 ? b : null
    }, parents: function (a) {
        return f.dir(a, "parentNode")
    }, parentsUntil: function (a, b, c) {
        return f.dir(a, "parentNode", c)
    }, next: function (a) {
        return f.nth(a, 2, "nextSibling")
    }, prev: function (a) {
        return f.nth(a, 2, "previousSibling")
    }, nextAll: function (a) {
        return f.dir(a, "nextSibling")
    }, prevAll: function (a) {
        return f.dir(a, "previousSibling")
    }, nextUntil: function (a, b, c) {
        return f.dir(a, "nextSibling", c)
    }, prevUntil: function (a, b, c) {
        return f.dir(a, "previousSibling", c)
    }, siblings: function (a) {
        return f.sibling((a.parentNode || {}).firstChild, a)
    }, children: function (a) {
        return f.sibling(a.firstChild)
    }, contents: function (a) {
        return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
    }}, function (a, b) {
        f.fn[a] = function (c, d) {
            var e = f.map(this, b, c);
            L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
            return this.pushStack(e, a, P.call(arguments).join(","))
        }
    }), f.extend({filter: function (a, b, c) {
        c && (a = ":not(" + a + ")");
        return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
    }, dir: function (a, c, d) {
        var e = [], g = a[c];
        while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d)))g.nodeType === 1 && e.push(g), g = g[c];
        return e
    }, nth: function (a, b, c, d) {
        b = b || 1;
        var e = 0;
        for (; a; a = a[c])if (a.nodeType === 1 && ++e === b)break;
        return a
    }, sibling: function (a, b) {
        var c = [];
        for (; a; a = a.nextSibling)a.nodeType === 1 && a !== b && c.push(a);
        return c
    }});
    var V = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", W = / jQuery\d+="(?:\d+|null)"/g, X = /^\s+/, Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Z = /<([\w:]+)/, $ = /<tbody/i, _ = /<|&#?\w+;/, ba = /<(?:script|style)/i, bb = /<(?:script|object|embed|option|style)/i, bc = new RegExp("<(?:" + V + ")[\\s/>]", "i"), bd = /checked\s*(?:[^=]|=\s*.checked.)/i, be = /\/(java|ecma)script/i, bf = /^\s*<!(?:\[CDATA\[|\-\-)/, bg = {option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""]}, bh = U(c);
    bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({text: function (a) {
        return f.access(this, function (a) {
            return a === b ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a))
        }, null, a, arguments.length)
    }, wrapAll: function (a) {
        if (f.isFunction(a))return this.each(function (b) {
            f(this).wrapAll(a.call(this, b))
        });
        if (this[0]) {
            var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
            this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                var a = this;
                while (a.firstChild && a.firstChild.nodeType === 1)a = a.firstChild;
                return a
            }).append(this)
        }
        return this
    }, wrapInner: function (a) {
        if (f.isFunction(a))return this.each(function (b) {
            f(this).wrapInner(a.call(this, b))
        });
        return this.each(function () {
            var b = f(this), c = b.contents();
            c.length ? c.wrapAll(a) : b.append(a)
        })
    }, wrap: function (a) {
        var b = f.isFunction(a);
        return this.each(function (c) {
            f(this).wrapAll(b ? a.call(this, c) : a)
        })
    }, unwrap: function () {
        return this.parent().each(function () {
            f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
        }).end()
    }, append: function () {
        return this.domManip(arguments, !0, function (a) {
            this.nodeType === 1 && this.appendChild(a)
        })
    }, prepend: function () {
        return this.domManip(arguments, !0, function (a) {
            this.nodeType === 1 && this.insertBefore(a, this.firstChild)
        })
    }, before: function () {
        if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (a) {
            this.parentNode.insertBefore(a, this)
        });
        if (arguments.length) {
            var a = f
                .clean(arguments);
            a.push.apply(a, this.toArray());
            return this.pushStack(a, "before", arguments)
        }
    }, after: function () {
        if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (a) {
            this.parentNode.insertBefore(a, this.nextSibling)
        });
        if (arguments.length) {
            var a = this.pushStack(this, "after", arguments);
            a.push.apply(a, f.clean(arguments));
            return a
        }
    }, remove: function (a, b) {
        for (var c = 0, d; (d = this[c]) != null; c++)if (!a || f.filter(a, [d]).length)!b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
        return this
    }, empty: function () {
        for (var a = 0, b; (b = this[a]) != null; a++) {
            b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
            while (b.firstChild)b.removeChild(b.firstChild)
        }
        return this
    }, clone: function (a, b) {
        a = a == null ? !1 : a, b = b == null ? a : b;
        return this.map(function () {
            return f.clone(this, a, b)
        })
    }, html: function (a) {
        return f.access(this, function (a) {
            var c = this[0] || {}, d = 0, e = this.length;
            if (a === b)return c.nodeType === 1 ? c.innerHTML.replace(W, "") : null;
            if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                a = a.replace(Y, "<$1></$2>");
                try {
                    for (; d < e; d++)c = this[d] || {}, c.nodeType === 1 && (f.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
                    c = 0
                } catch (g) {
                }
            }
            c && this.empty().append(a)
        }, null, a, arguments.length)
    }, replaceWith: function (a) {
        if (this[0] && this[0].parentNode) {
            if (f.isFunction(a))return this.each(function (b) {
                var c = f(this), d = c.html();
                c.replaceWith(a.call(this, b, d))
            });
            typeof a != "string" && (a = f(a).detach());
            return this.each(function () {
                var b = this.nextSibling, c = this.parentNode;
                f(this).remove(), b ? f(b).before(a) : f(c).append(a)
            })
        }
        return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
    }, detach: function (a) {
        return this.remove(a, !0)
    }, domManip: function (a, c, d) {
        var e, g, h, i, j = a[0], k = [];
        if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j))return this.each(function () {
            f(this).domManip(a, c, d, !0)
        });
        if (f.isFunction(j))return this.each(function (e) {
            var g = f(this);
            a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
        });
        if (this[0]) {
            i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {fragment: i} : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
            if (g) {
                c = c && f.nodeName(g, "tr");
                for (var l = 0, m = this.length, n = m - 1; l < m; l++)d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
            }
            k.length && f.each(k, function (a, b) {
                b.src ? f.ajax({type: "GET", global: !1, url: b.src, async: !1, dataType: "script"}) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
            })
        }
        return this
    }}), f.buildFragment = function (a, b, d) {
        var e, g, h, i, j = a[0];
        b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
        return{fragment: e, cacheable: g}
    }, f.fragments = {}, f.each({appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"}, function (a, b) {
        f.fn[a] = function (c) {
            var d = [], e = f(c), g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                e[b](this[0]);
                return this
            }
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j)
            }
            return this.pushStack(d, a, e.selector)
        }
    }), f.extend({clone: function (a, b, c) {
        var d, e, g, h = f.support.html5Clone || f.isXMLDoc(a) || !bc.test("<" + a.nodeName + ">") ? a.cloneNode(!0) : bo(a);
        if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
            bk(a, h), d = bl(a), e = bl(h);
            for (g = 0; d[g]; ++g)e[g] && bk(d[g], e[g])
        }
        if (b) {
            bj(a, h);
            if (c) {
                d = bl(a), e = bl(h);
                for (g = 0; d[g]; ++g)bj(d[g], e[g])
            }
        }
        d = e = null;
        return h
    }, clean: function (a, b, d, e) {
        var g, h, i, j = [];
        b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
        for (var k = 0, l; (l = a[k]) != null; k++) {
            typeof l == "number" && (l += "");
            if (!l)continue;
            if (typeof l == "string")if (!_.test(l))l = b.createTextNode(l); else {
                l = l.replace(Y, "<$1></$2>");
                var m = (Z.exec(l) || ["", ""])[1].toLowerCase(), n = bg[m] || bg._default, o = n[0], p = b.createElement("div"), q = bh.childNodes, r;
                b === c ? bh.appendChild(p) : U(b).appendChild(p), p.innerHTML = n[1] + l + n[2];
                while (o--)p = p.lastChild;
                if (!f.support.tbody) {
                    var s = $.test(l), t = m === "table" && !s ? p.firstChild && p.firstChild.childNodes : n[1] === "<table>" && !s ? p.childNodes : [];
                    for (i = t.length - 1; i >= 0; --i)f.nodeName(t[i], "tbody") && !t[i].childNodes.length && t[i].parentNode.removeChild(t[i])
                }
                !f.support.leadingWhitespace && X.test(l) && p.insertBefore(b.createTextNode(X.exec(l)[0]), p.firstChild), l = p.childNodes, p && (p.parentNode.removeChild(p), q.length > 0 && (r = q[q.length - 1], r && r.parentNode && r.parentNode.removeChild(r)))
            }
            var u;
            if (!f.support.appendChecked)if (l[0] && typeof (u = l.length) == "number")for (i = 0; i < u; i++)bn(l[i]); else bn(l);
            l.nodeType ? j.push(l) : j = f.merge(j, l)
        }
        if (d) {
            g = function (a) {
                return!a.type || be.test(a.type)
            };
            for (k = 0; j[k]; k++) {
                h = j[k];
                if (e && f.nodeName(h, "script") && (!h.type || be.test(h.type)))e.push(h.parentNode ? h.parentNode.removeChild(h) : h); else {
                    if (h.nodeType === 1) {
                        var v = f.grep(h.getElementsByTagName("script"), g);
                        j.splice.apply(j, [k + 1, 0].concat(v))
                    }
                    d.appendChild(h)
                }
            }
        }
        return j
    }, cleanData: function (a) {
        var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
        for (var h = 0, i; (i = a[h]) != null; h++) {
            if (i.nodeName && f.noData[i.nodeName.toLowerCase()])continue;
            c = i[f.expando];
            if (c) {
                b = d[c];
                if (b && b.events) {
                    for (var j in b.events)e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                    b.handle && (b.handle.elem = null)
                }
                g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
            }
        }
    }});
    var bp = /alpha\([^)]*\)/i, bq = /opacity=([^)]*)/, br = /([A-Z]|^ms)/g, bs = /^[\-+]?(?:\d*\.)?\d+$/i, bt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i, bu = /^([\-+])=([\-+.\de]+)/, bv = /^margin/, bw = {position: "absolute", visibility: "hidden", display: "block"}, bx = ["Top", "Right", "Bottom", "Left"], by, bz, bA;
    f.fn.css = function (a, c) {
        return f.access(this, function (a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c)
        }, a, c, arguments.length > 1)
    }, f.extend({cssHooks: {opacity: {get: function (a, b) {
        if (b) {
            var c = by(a, "opacity");
            return c === "" ? "1" : c
        }
        return a.style.opacity
    }}}, cssNumber: {fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0}, cssProps: {"float": f.support.cssFloat ? "cssFloat" : "styleFloat"}, style: function (a, c, d, e) {
        if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
            var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
            c = f.cssProps[i] || i;
            if (d === b) {
                if (k && "get"in k && (g = k.get(a, !1, e)) !== b)return g;
                return j[c]
            }
            h = typeof d, h === "string" && (g = bu.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
            if (d == null || h === "number" && isNaN(d))return;
            h === "number" && !f.cssNumber[i] && (d += "px");
            if (!k || !("set"in k) || (d = k.set(a, d)) !== b)try {
                j[c] = d
            } catch (l) {
            }
        }
    }, css: function (a, c, d) {
        var e, g;
        c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
        if (g && "get"in g && (e = g.get(a, !0, d)) !== b)return e;
        if (by)return by(a, c)
    }, swap: function (a, b, c) {
        var d = {}, e, f;
        for (f in b)d[f] = a.style[f], a.style[f] = b[f];
        e = c.call(a);
        for (f in b)a.style[f] = d[f];
        return e
    }}), f.curCSS = f.css, c.defaultView && c.defaultView.getComputedStyle && (bz = function (a, b) {
        var c, d, e, g, h = a.style;
        b = b.replace(br, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), !f.support.pixelMargin && e && bv.test(b) && bt.test(c) && (g = h.width, h.width = c, c = e.width, h.width = g);
        return c
    }), c.documentElement.currentStyle && (bA = function (a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
        f == null && g && (e = g[b]) && (f = e), bt.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
        return f === "" ? "auto" : f
    }), by = bz || bA, f.each(["height", "width"], function (a, b) {
        f.cssHooks[b] = {get: function (a, c, d) {
            if (c)return a.offsetWidth !== 0 ? bB(a, b, d) : f.swap(a, bw, function () {
                return bB(a, b, d)
            })
        }, set: function (a, b) {
            return bs.test(b) ? b + "px" : b
        }}
    }), f.support.opacity || (f.cssHooks.opacity = {get: function (a, b) {
        return bq.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
    }, set: function (a, b) {
        var c = a.style, d = a.currentStyle, e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", g = d && d.filter || c.filter || "";
        c.zoom = 1;
        if (b >= 1 && f.trim(g.replace(bp, "")) === "") {
            c.removeAttribute("filter");
            if (d && !d.filter)return
        }
        c.filter = bp.test(g) ? g.replace(bp, e) : g + " " + e
    }}), f(function () {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {get: function (a, b) {
            return f.swap(a, {display: "inline-block"}, function () {
                return b ? by(a, "margin-right") : a.style.marginRight
            })
        }})
    }), f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
        var b = a.offsetWidth, c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
    }, f.expr.filters.visible = function (a) {
        return!f.expr.filters.hidden(a)
    }), f.each({margin: "", padding: "", border: "Width"}, function (a, b) {
        f.cssHooks[a + b] = {expand: function (c) {
            var d, e = typeof c == "string" ? c.split(" ") : [c], f = {};
            for (d = 0; d < 4; d++)f[a + bx[d] + b] = e[d] || e[d - 2] || e[0];
            return f
        }}
    });
    var bC = /%20/g, bD = /\[\]$/, bE = /\r?\n/g, bF = /#.*$/, bG = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, bH = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, bI = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, bJ = /^(?:GET|HEAD)$/, bK = /^\/\//, bL = /\?/, bM = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bN = /^(?:select|textarea)/i, bO = /\s+/, bP = /([?&])_=[^&]*/, bQ = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, bR = f.fn.load, bS = {}, bT = {}, bU, bV, bW = ["*/"] + ["*"];
    try {
        bU = e.href
    } catch (bX) {
        bU = c.createElement("a"), bU.href = "", bU = bU.href
    }
    bV = bQ.exec(bU.toLowerCase()) || [], f.fn.extend({load: function (a, c, d) {
        if (typeof a != "string" && bR)return bR.apply(this, arguments);
        if (!this.length)return this;
        var e = a.indexOf(" ");
        if (e >= 0) {
            var g = a.slice(e, a.length);
            a = a.slice(0, e)
        }
        var h = "GET";
        c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
        var i = this;
        f.ajax({url: a, type: h, dataType: "html", data: c, complete: function (a, b, c) {
            c = a.responseText, a.isResolved() && (a.done(function (a) {
                c = a
            }), i.html(g ? f("<div>").append(c.replace(bM, "")).find(g) : c)), d && i.each(d, [c, b, a])
        }});
        return this
    }, serialize: function () {
        return f.param(this.serializeArray())
    }, serializeArray: function () {
        return this.map(function () {
            return this.elements ? f.makeArray(this.elements) : this
        }).filter(function () {
            return this.name && !this.disabled && (this.checked || bN.test(this.nodeName) || bH.test(this.type))
        }).map(function (a, b) {
            var c = f(this).val();
            return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
                return{name: b.name, value: a.replace(bE, "\r\n")}
            }) : {name: b.name, value: c.replace(bE, "\r\n")}
        }).get()
    }}), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        f.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), f.each(["get", "post"], function (a, c) {
        f[c] = function (a, d, e, g) {
            f.isFunction(d) && (g = g || e, e = d, d = b);
            return f.ajax({type: c, url: a, data: d, success: e, dataType: g})
        }
    }), f.extend({getScript: function (a, c) {
        return f.get(a, b, c, "script")
    }, getJSON: function (a, b, c) {
        return f.get(a, b, c, "json")
    }, ajaxSetup: function (a, b) {
        b ? b$(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b$(a, b);
        return a
    }, ajaxSettings: {url: bU, isLocal: bI.test(bV[1]), global: !0, type: "GET", contentType: "application/x-www-form-urlencoded; charset=UTF-8", processData: !0, async: !0, accepts: {xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", "*": bW}, contents: {xml: /xml/, html: /html/, json: /json/}, responseFields: {xml: "responseXML", text: "responseText"}, converters: {"* text": a.String, "text html": !0, "text json": f.parseJSON, "text xml": f.parseXML}, flatOptions: {context: !0, url: !0}}, ajaxPrefilter: bY(bS), ajaxTransport: bY(bT), ajax: function (a, c) {
        function w(a, c, l, m) {
            if (s !== 2) {
                s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                var o, r, u, w = c, x = l ? ca(d, v, l) : b, y, z;
                if (a >= 200 && a < 300 || a === 304) {
                    if (d.ifModified) {
                        if (y = v.getResponseHeader("Last-Modified"))f.lastModified[k] = y;
                        if (z = v.getResponseHeader("Etag"))f.etag[k] = z
                    }
                    if (a === 304)w = "notmodified", o = !0; else try {
                        r = cb(d, x), w = "success", o = !0
                    } catch (A) {
                        w = "parsererror", u = A
                    }
                } else {
                    u = w;
                    if (!w || a)w = "error", a < 0 && (a = 0)
                }
                v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
            }
        }

        typeof a == "object" && (c = a, a = b), c = c || {};
        var d = f.ajaxSetup({}, c), e = d.context || d, g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(), i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u, v = {readyState: 0, setRequestHeader: function (a, b) {
            if (!s) {
                var c = a.toLowerCase();
                a = m[c] = m[c] || a, l[a] = b
            }
            return this
        }, getAllResponseHeaders: function () {
            return s === 2 ? n : null
        }, getResponseHeader: function (a) {
            var c;
            if (s === 2) {
                if (!o) {
                    o = {};
                    while (c = bG.exec(n))o[c[1].toLowerCase()] = c[2]
                }
                c = o[a.toLowerCase()]
            }
            return c === b ? null : c
        }, overrideMimeType: function (a) {
            s || (d.mimeType = a);
            return this
        }, abort: function (a) {
            a = a || "abort", p && p.abort(a), w(0, a);
            return this
        }};
        h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function (a) {
            if (a) {
                var b;
                if (s < 2)for (b in a)j[b] = [j[b], a[b]]; else b = a[v.status], v.then(b, b)
            }
            return this
        }, d.url = ((a || d.url) + "").replace(bF, "").replace(bK, bV[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bO), d.crossDomain == null && (r = bQ.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bV[1] && r[2] == bV[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bV[3] || (bV[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), bZ(bS, d, c, v);
        if (s === 2)return!1;
        t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bJ.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
        if (!d.hasContent) {
            d.data && (d.url += (bL.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
            if (d.cache === !1) {
                var x = f.now(), y = d.url.replace(bP, "$1_=" + x);
                d.url = y + (y === d.url ? (bL.test(d.url) ? "&" : "?") + "_=" + x : "")
            }
        }
        (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bW + "; q=0.01" : "") : d.accepts["*"]);
        for (u in d.headers)v.setRequestHeader(u, d.headers[u]);
        if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
            v.abort();
            return!1
        }
        for (u in{success: 1, error: 1, complete: 1})v[u](d[u]);
        p = bZ(bT, d, c, v);
        if (!p)w(-1, "No Transport"); else {
            v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function () {
                v.abort("timeout")
            }, d.timeout));
            try {
                s = 1, p.send(l, w)
            } catch (z) {
                if (s < 2)w(-1, z); else throw z
            }
        }
        return v
    }, param: function (a, c) {
        var d = [], e = function (a, b) {
            b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        c === b && (c = f.ajaxSettings.traditional);
        if (f.isArray(a) || a.jquery && !f.isPlainObject(a))f.each(a, function () {
            e(this.name, this.value)
        }); else for (var g in a)b_(g, a[g], c, e);
        return d.join("&").replace(bC, "+")
    }}), f.extend({active: 0, lastModified: {}, etag: {}});
    var cc = f.now(), cd = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({jsonp: "callback", jsonpCallback: function () {
        return f.expando + "_" + cc++
    }}), f.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e = typeof b.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(b.contentType);
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (cd.test(b.url) || e && cd.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h], j = b.url, k = b.data, l = "$1" + h + "$2";
            b.jsonp !== !1 && (j = j.replace(cd, l), b.url === j && (e && (k = k.replace(cd, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) {
                g = [a]
            }, d.always(function () {
                a[h] = i, g && f.isFunction(i) && a[h](g[0])
            }), b.converters["script json"] = function () {
                g || f.error(h + " was not called");
                return g[0]
            }, b.dataTypes[0] = "json";
            return"script"
        }
    }), f.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents: {script: /javascript|ecmascript/}, converters: {"text script": function (a) {
        f.globalEval(a);
        return a
    }}}), f.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), f.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return{send: function (f, g) {
                d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
                    if (c || !d.readyState || /loaded|complete/.test(d.readyState))d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
                }, e.insertBefore(d, e.firstChild)
            }, abort: function () {
                d && d.onload(0, 1)
            }}
        }
    });
    var ce = a.ActiveXObject ? function () {
        for (var a in cg)cg[a](0, 1)
    } : !1, cf = 0, cg;
    f.ajaxSettings.xhr = a.ActiveXObject ? function () {
        return!this.isLocal && ch() || ci()
    } : ch, function (a) {
        f.extend(f.support, {ajax: !!a, cors: !!a && "withCredentials"in a})
    }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function (c) {
        if (!c.crossDomain || f.support.cors) {
            var d;
            return{send: function (e, g) {
                var h = c.xhr(), i, j;
                c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                if (c.xhrFields)for (j in c.xhrFields)h[j] = c.xhrFields[j];
                c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                try {
                    for (j in e)h.setRequestHeader(j, e[j])
                } catch (k) {
                }
                h.send(c.hasContent && c.data || null), d = function (a, e) {
                    var j, k, l, m, n;
                    try {
                        if (d && (e || h.readyState === 4)) {
                            d = b, i && (h.onreadystatechange = f.noop, ce && delete cg[i]);
                            if (e)h.readyState !== 4 && h.abort(); else {
                                j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n);
                                try {
                                    m.text = h.responseText
                                } catch (a) {
                                }
                                try {
                                    k = h.statusText
                                } catch (o) {
                                    k = ""
                                }
                                !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                            }
                        }
                    } catch (p) {
                        e || g(-1, p)
                    }
                    m && g(j, k, m, l)
                }, !c.async || h.readyState === 4 ? d() : (i = ++cf, ce && (cg || (cg = {}, f(a).unload(ce)), cg[i] = d), h.onreadystatechange = d)
            }, abort: function () {
                d && d(0, 1)
            }}
        }
    });
    var cj = {}, ck, cl, cm = /^(?:toggle|show|hide)$/, cn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, co, cp = [
        ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
        ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
        ["opacity"]
    ], cq;
    f.fn.extend({show: function (a, b, c) {
        var d, e;
        if (a || a === 0)return this.animate(ct("show", 3), a, b, c);
        for (var g = 0, h = this.length; g < h; g++)d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), (e === "" && f.css(d, "display") === "none" || !f.contains(d.ownerDocument.documentElement, d)) && f._data(d, "olddisplay", cu(d.nodeName)));
        for (g = 0; g < h; g++) {
            d = this[g];
            if (d.style) {
                e = d.style.display;
                if (e === "" || e === "none")d.style.display = f._data(d, "olddisplay") || ""
            }
        }
        return this
    }, hide: function (a, b, c) {
        if (a || a === 0)return this.animate(ct("hide", 3), a, b, c);
        var d, e, g = 0, h = this.length;
        for (; g < h; g++)d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
        for (g = 0; g < h; g++)this[g].style && (this[g].style.display = "none");
        return this
    }, _toggle: f.fn.toggle, toggle: function (a, b, c) {
        var d = typeof a == "boolean";
        f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
            var b = d ? a : f(this).is(":hidden");
            f(this)[b ? "show" : "hide"]()
        }) : this.animate(ct("toggle", 3), a, b, c);
        return this
    }, fadeTo: function (a, b, c, d) {
        return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
    }, animate: function (a, b, c, d) {
        function g() {
            e.queue === !1 && f._mark(this);
            var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m, n, o, p, q;
            b.animatedProperties = {};
            for (i in a) {
                g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]);
                if ((k = f.cssHooks[g]) && "expand"in k) {
                    l = k.expand(a[g]), delete a[g];
                    for (i in l)i in a || (a[i] = l[i])
                }
            }
            for (g in a) {
                h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                if (h === "hide" && d || h === "show" && !d)return b.complete.call(this);
                c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cu(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
            }
            b.overflow != null && (this.style.overflow = "hidden");
            for (i in a)j = new f.fx(this, b, i), h = a[i], cm.test(h) ? (q = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), q ? (f._data(this, "toggle" + i, q === "show" ? "hide" : "show"), j[q]()) : j[h]()) : (m = cn.exec(h), n = j.cur(), m ? (o = parseFloat(m[2]), p = m[3] || (f.cssNumber[i] ? "" : "px"), p !== "px" && (f.style(this, i, (o || 1) + p), n = (o || 1) / j.cur() * n, f.style(this, i, n + p)), m[1] && (o = (m[1] === "-=" ? -1 : 1) * o + n), j.custom(n, o, p)) : j.custom(n, h, ""));
            return!0
        }

        var e = f.speed(b, c, d);
        if (f.isEmptyObject(a))return this.each(e.complete, [!1]);
        a = f.extend({}, a);
        return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
    }, stop: function (a, c, d) {
        typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
        return this.each(function () {
            function h(a, b, c) {
                var e = b[c];
                f.removeData(a, c, !0), e.stop(d)
            }

            var b, c = !1, e = f.timers, g = f._data(this);
            d || f._unmark(!0, this);
            if (a == null)for (b in g)g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b); else g[b = a + ".run"] && g[b].stop && h(this, g, b);
            for (b = e.length; b--;)e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
            (!d || !c) && f.dequeue(this, a)
        })
    }}), f.each({slideDown: ct("show", 1), slideUp: ct("hide", 1), slideToggle: ct("toggle", 1), fadeIn: {opacity: "show"}, fadeOut: {opacity: "hide"}, fadeToggle: {opacity: "toggle"}}, function (a, b) {
        f.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), f.extend({speed: function (a, b, c) {
        var d = a && typeof a == "object" ? f.extend({}, a) : {complete: c || !c && b || f.isFunction(a) && a, duration: a, easing: c && b || b && !f.isFunction(b) && b};
        d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
        if (d.queue == null || d.queue === !0)d.queue = "fx";
        d.old = d.complete, d.complete = function (a) {
            f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
        };
        return d
    }, easing: {linear: function (a) {
        return a
    }, swing: function (a) {
        return-Math.cos(a * Math.PI) / 2 + .5
    }}, timers: [], fx: function (a, b, c) {
        this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
    }}), f.fx.prototype = {update: function () {
        this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
    }, cur: function () {
        if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null))return this.elem[this.prop];
        var a, b = f.css(this.elem, this.prop);
        return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
    }, custom: function (a, c, d) {
        function h(a) {
            return e.step(a)
        }

        var e = this, g = f.fx;
        this.startTime = cq || cr(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function () {
            f._data(e.elem, "fxshow" + e.prop) === b && (e.options.hide ? f._data(e.elem, "fxshow" + e.prop, e.start) : e.options.show && f._data(e.elem, "fxshow" + e.prop, e.end))
        }, h() && f.timers.push(h) && !co && (co = setInterval(g.tick, g.interval))
    }, show: function () {
        var a = f._data(this.elem, "fxshow" + this.prop);
        this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
    }, hide: function () {
        this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
    }, step: function (a) {
        var b, c, d, e = cq || cr(), g = !0, h = this.elem, i = this.options;
        if (a || e >= i.duration + this.startTime) {
            this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
            for (b in i.animatedProperties)i.animatedProperties[b] !== !0 && (g = !1);
            if (g) {
                i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
                    h.style["overflow" + b] = i.overflow[a]
                }), i.hide && f(h).hide();
                if (i.hide || i.show)for (b in i.animatedProperties)f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                d = i.complete, d && (i.complete = !1, d.call(h))
            }
            return!1
        }
        i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
        return!0
    }}, f.extend(f.fx, {tick: function () {
        var a, b = f.timers, c = 0;
        for (; c < b.length; c++)a = b[c], !a() && b[c] === a && b.splice(c--, 1);
        b.length || f.fx.stop()
    }, interval: 13, stop: function () {
        clearInterval(co), co = null
    }, speeds: {slow: 600, fast: 200, _default: 400}, step: {opacity: function (a) {
        f.style(a.elem, "opacity", a.now)
    }, _default: function (a) {
        a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
    }}}), f.each(cp.concat.apply([], cp), function (a, b) {
        b.indexOf("margin") && (f.fx.step[b] = function (a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit)
        })
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
        return f.grep(f.timers,function (b) {
            return a === b.elem
        }).length
    });
    var cv, cw = /^t(?:able|d|h)$/i, cx = /^(?:body|html)$/i;
    "getBoundingClientRect"in c.documentElement ? cv = function (a, b, c, d) {
        try {
            d = a.getBoundingClientRect()
        } catch (e) {
        }
        if (!d || !f.contains(c, a))return d ? {top: d.top, left: d.left} : {top: 0, left: 0};
        var g = b.body, h = cy(b), i = c.clientTop || g.clientTop || 0, j = c.clientLeft || g.clientLeft || 0, k = h.pageYOffset || f.support.boxModel && c.scrollTop || g.scrollTop, l = h.pageXOffset || f.support.boxModel && c.scrollLeft || g.scrollLeft, m = d.top + k - i, n = d.left + l - j;
        return{top: m, left: n}
    } : cv = function (a, b, c) {
        var d, e = a.offsetParent, g = a, h = b.body, i = b.defaultView, j = i ? i.getComputedStyle(a, null) : a.currentStyle, k = a.offsetTop, l = a.offsetLeft;
        while ((a = a.parentNode) && a !== h && a !== c) {
            if (f.support.fixedPosition && j.position === "fixed")break;
            d = i ? i.getComputedStyle(a, null) : a.currentStyle, k -= a.scrollTop, l -= a.scrollLeft, a === e && (k += a.offsetTop, l += a.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(a.nodeName)) && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), g = e, e = a.offsetParent), f.support.subtractsBorderForOverflowNotVisible && d.overflow !== "visible" && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), j = d
        }
        if (j.position === "relative" || j.position === "static")k += h.offsetTop, l += h.offsetLeft;
        f.support.fixedPosition && j.position === "fixed" && (k += Math.max(c.scrollTop, h.scrollTop), l += Math.max(c.scrollLeft, h.scrollLeft));
        return{top: k, left: l}
    }, f.fn.offset = function (a) {
        if (arguments.length)return a === b ? this : this.each(function (b) {
            f.offset.setOffset(this, a, b)
        });
        var c = this[0], d = c && c.ownerDocument;
        if (!d)return null;
        if (c === d.body)return f.offset.bodyOffset(c);
        return cv(c, d, d.documentElement)
    }, f.offset = {bodyOffset: function (a) {
        var b = a.offsetTop, c = a.offsetLeft;
        f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
        return{top: b, left: c}
    }, setOffset: function (a, b, c) {
        var d = f.css(a, "position");
        d === "static" && (a.style.position = "relative");
        var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"), j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1, k = {}, l = {}, m, n;
        j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using"in b ? b.using.call(a, k) : e.css(k)
    }}, f.fn.extend({position: function () {
        if (!this[0])return null;
        var a = this[0], b = this.offsetParent(), c = this.offset(), d = cx.test(b[0].nodeName) ? {top: 0, left: 0} : b.offset();
        c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
        return{top: c.top - d.top, left: c.left - d.left}
    }, offsetParent: function () {
        return this.map(function () {
            var a = this.offsetParent || c.body;
            while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static")a = a.offsetParent;
            return a
        })
    }}), f.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, c) {
        var d = /Y/.test(c);
        f.fn[a] = function (e) {
            return f.access(this, function (a, e, g) {
                var h = cy(a);
                if (g === b)return h ? c in h ? h[c] : f.support.boxModel && h.document.documentElement[e] || h.document.body[e] : a[e];
                h ? h.scrollTo(d ? f(h).scrollLeft() : g, d ? g : f(h).scrollTop()) : a[e] = g
            }, a, e, arguments.length, null)
        }
    }), f.each({Height: "height", Width: "width"}, function (a, c) {
        var d = "client" + a, e = "scroll" + a, g = "offset" + a;
        f.fn["inner" + a] = function () {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, c, "padding")) : this[c]() : null
        }, f.fn["outer" + a] = function (a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, c, a ? "margin" : "border")) : this[c]() : null
        }, f.fn[c] = function (a) {
            return f.access(this, function (a, c, h) {
                var i, j, k, l;
                if (f.isWindow(a)) {
                    i = a.document, j = i.documentElement[d];
                    return f.support.boxModel && j || i.body && i.body[d] || j
                }
                if (a.nodeType === 9) {
                    i = a.documentElement;
                    if (i[d] >= i[e])return i[d];
                    return Math.max(a.body[e], i[e], a.body[g], i[g])
                }
                if (h === b) {
                    k = f.css(a, c), l = parseFloat(k);
                    return f.isNumeric(l) ? l : k
                }
                f(a).css(c, h)
            }, c, a, arguments.length, null)
        }
    }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return f
    })
})(window);
(function (window, undefined) {
    window.qv = {version: '1.5.0', pkg: function (expr, obj) {
        var target = window, parent = null, that = arguments.callee, index = 0, isMatch = /^\s*(?:(static)\s+)?([\w\.]+)\s*(?:\:\s*([\w\.]+))?\s*$/.test(expr), isStatic = RegExp.$1 == 'static', packageNS = RegExp.$2.split('.'), parentNS = RegExp.$3.split('.'), constructor = function () {
            this.parent = function () {
                if (!arguments.callee.prototype.QV_FUNCTION_NAME) {
                    for (var i in this) {
                        if (typeof(this[i]) == 'function') {
                            this[i].prototype.QV_FUNCTION_NAME = i;
                        }
                    }
                }
                if (arguments.callee.caller) {
                    if (typeof(parent) == 'function') {
                        parent = parent.prototype;
                    }
                    if (typeof(parent[arguments.callee.caller.prototype.QV_FUNCTION_NAME]) == 'function') {
                        return parent[arguments.callee.caller.prototype.QV_FUNCTION_NAME].apply(this, arguments);
                    }
                }
            };
            if (typeof(this.construct) == 'function' && arguments.callee.caller != that) {
                this.construct.apply(this, arguments);
            }
        };
        for (var length = packageNS.length - 1; index < length; index++) {
            if (!(packageNS[index]in target)) {
                target[packageNS[index]] = {};
            }
            target = target[packageNS[index]];
        }
        if (parentNS[0] != '') {
            parent = window;
            for (var i = 0, iMax = parentNS.length; i < iMax; i++) {
                parent = parent[parentNS[i]];
            }
        }
        if (typeof(obj) != 'function') {
            if (parent) {
                constructor.prototype = parent;
                target[packageNS[index]] = new constructor();
                for (var i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        target[packageNS[index]][i] = obj[i];
                    }
                }
            } else {
                target[packageNS[index]] = obj;
            }
        } else if (isStatic) {
            if (parent) {
                constructor.prototype = parent;
                target[packageNS[index]] = new constructor();
            } else {
                target[packageNS[index]] = {};
            }
            obj.call(target[packageNS[index]]);
        } else {
            if (parent) {
                constructor.prototype = new parent();
            }
            target[packageNS[index]] = constructor;
            target[packageNS[index]].prototype.constructor = constructor;
            obj.call(target[packageNS[index]].prototype);
            target[packageNS[index]].prototype.constructor = target[packageNS[index]];
        }
        return this;
    }, require: function (nameList) {
        return this;
    }};
})(window);
qv.pkg('static qv.tpl', function () {
    var _public = this;
    var _private = {};
    _private.cache = {};
    _public.get = function (str, data, env) {
        var fn = !/[^\w\-\.:]/.test(str) ? _private.cache[str] = _private.cache[str] || this.get(document.getElementById(str).innerHTML) : function (data, env) {
            var i, variable = [], value = [];
            for (i in data) {
                variable.push(i);
                value.push(data[i]);
            }
            return(new Function(variable, fn.code)).apply(env || data, value);
        };
        fn.code = fn.code || "var $parts=[]; $parts.push('"
            + str.replace(/\\/g, '\\\\').replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/(^|%>)[^\t]*/g,function (str) {
            return str.replace(/'/g, "\\'");
        }).replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("$parts.push('")
            + "'); return $parts.join('');";
        return data ? fn(data, env) : fn;
    };
});
qv.pkg('qv.string', {cut: function (str, size, tail) {
    if (this.getByteLength(str) <= size) {
        return str;
    }
    tail = tail || '';
    size = size - this.getByteLength(tail);
    var regExp = /[^\x00-\xff]/;
    var res = [], tmp = '', i = 0, cnt = 0, len = str.length;
    while (i < len) {
        tmp = str.charAt(i++);
        cnt += (regExp.test(tmp) ? 2 : 1);
        if (cnt <= size) {
            res.push(tmp);
        } else {
            break;
        }
    }
    return res.join('') + tail;
}, format: function (str, param) {
    var data = (param.length == 1 && typeof(param[0]) == 'object') ? param[0] : param;
    return str.replace(/\{([\d\w]+)\}/g, function (m, n) {
        return typeof(data[n]) != 'undefined' ? data[n].toString() : m;
    });
}, getByteLength: function (str, encode) {
    return str.replace(/[^\x00-\xff]/g, {'utf-8': '***', 'gb2312': '**'}[(encode || 'gb2312')]).length;
}, encodeHTML: function (str) {
    if (typeof str == 'string') {
        var ar = ['&', '&amp;', '<', '&lt;', '>', '&gt;', '"', '&quot;'];
        for (var i = 0, r = this; i < ar.length; i += 2) {
            str = str.replace(new RegExp(ar[i], 'g'), ar[1 + i]);
        }
        return str;
    }
    return str;
}, decodeHTML: function (str) {
    if (typeof str == 'string') {
        var ar = ['&quot;', '"', '&gt;', '>', '&lt;', '<', '&amp;', '&'];
        for (var i = 0, r = this; i < ar.length; i += 2) {
            str = str.replace(new RegExp(ar[i], 'g'), ar[i + 1]);
        }
        return str;
    }
    return str;
}, getMD5: function (str) {
    var hexcase = 0;
    var b64pad = '';
    var chrsz = 8;
    var mode = 32;

    function hex_md5(s) {
        return binl2hex(core_md5(str2binl(s), s.length * chrsz));
    }

    function b64_md5(s) {
        return binl2b64(core_md5(str2binl(s), s.length * chrsz));
    }

    function str_md5(s) {
        return binl2str(core_md5(str2binl(s), s.length * chrsz));
    }

    function hex_hmac_md5(key, data) {
        return binl2hex(core_hmac_md5(key, data));
    }

    function b64_hmac_md5(key, data) {
        return binl2b64(core_hmac_md5(key, data));
    }

    function str_hmac_md5(key, data) {
        return binl2str(core_hmac_md5(key, data));
    }

    function core_md5(x, len) {
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        if (mode == 16) {
            return Array(b, c);
        } else {
            return Array(a, b, c, d);
        }
    }

    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }

    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }

    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    function core_hmac_md5(key, data) {
        var bkey = str2binl(key);
        if (bkey.length > 16)
            bkey = core_md5(bkey, key.length * chrsz);
        var ipad = Array(16), opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
        return core_md5(opad.concat(hash), 512 + 128);
    }

    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return(msw << 16) | (lsw & 0xFFFF);
    }

    function bit_rol(num, cnt) {
        return(num << cnt) | (num >>> (32 - cnt));
    }

    function str2binl(str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz)
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
        return bin;
    }

    function binl2str(bin) {
        var str = "";
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < bin.length * 32; i += chrsz)
            str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
        return str;
    }

    function binl2hex(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
        }
        return str;
    }

    function binl2b64(binarray) {
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i += 3) {
            var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i
                + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
            for (var j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > binarray.length * 32)
                    str += b64pad; else
                    str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
            }
        }
        return str;
    }

    return hex_md5(str);
}});
qv.pkg('static qv.net', function () {
    var _public = this;
    var _private = {};
    _private.options = {};
    _public.init = function (options, resetSettings) {
        if (resetSettings) {
            return(_private.options = options || {});
        } else {
            return jQuery.extend(true, _private.options, options);
        }
    };
    _private.initAjaxPrefilter = function () {
        if (!_private.ajaxPrefilterInitialized) {
            _private.ajaxPrefilterInitialized = true;
            jQuery.ajaxPrefilter('json script', function (options, originalOptions, jqXHR) {
                if (options.plugins) {
                    options.global = true;
                }
            });
        }
    };
    _public.ajax = function (url, options) {
        if (typeof url === 'object') {
            options = url;
            url = undefined;
        }
        options = jQuery.extend(true, {}, _private.options, options);
        options.url = url || options.url;
        options.context = !options.context ? jQuery({}) : (options.context instanceof jQuery ? options.context : jQuery(options.context));
        _private.initAjaxPrefilter.call(this);
        _private.bindPluginHandlers.call(this, options);
        return jQuery.ajax(options);
    };
    _public.get = function (url, data, callback, type, options) {
        return _private.easyRequest.call(this, 'get', url, data, callback, type, options);
    };
    _public.post = function (url, data, callback, type, options) {
        return _private.easyRequest.call(this, 'post', url, data, callback, type, options);
    };
    _private.easyRequest = function (method, url, data, callback, type, options) {
        if (jQuery.isFunction(data)) {
            type = type || callback;
            callback = data;
            data = undefined;
        }
        options = options || {};
        jQuery.extend(true, options, {url: url, type: method, dataType: type, data: data, success: callback});
        return _public.ajax(options);
    };
    _public.getScript = function (url, callback, options) {
        return _public.get(url, undefined, callback, "script", options);
    };
    _public.getJSON = function (url, data, callback, options) {
        return _public.get(url, data, callback, "json", options);
    };
    _private.bindPluginHandlers = function (options) {
        var context = options.context, plugins = options.plugins;
        if (typeof plugins === 'object') {
            for (var name in plugins) {
                if (plugins.hasOwnProperty(name)) {
                    var pluginOption = plugins[name];
                    var pluginObject = _private.getObject.call(this, name, undefined, {});
                    var handlersMap = pluginObject.getPluginHandlers(pluginOption);
                    for (var eventName in handlersMap) {
                        if (handlersMap.hasOwnProperty(eventName)) {
                            context.on(eventName, handlersMap[eventName]);
                        }
                    }
                }
            }
        }
    };
    _private.getObject = function (context, name, type, defaultValue) {
        if (typeof context === 'string') {
            defaultValue = type, type = name, name = context, context = window;
        }
        var parts, index, create = (typeof defaultValue !== 'undefined'), obj = context;
        if (typeof name === 'string') {
            parts = name.split('.');
        } else {
            parts = name;
        }
        while (parts && (index = parts.shift(), parts.length)) {
            obj = obj[index];
        }
        if (typeof obj[index] === 'undefined' && create) {
            obj[index] = defaultValue;
        }
        return obj[index];
    };
});
qv.pkg('static qv.date', function () {
    var _public = this;
    var _private = {};
    var fullMonthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aguest', 'September', 'October', 'November', 'December'], fullWeekName = ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday'], fillZero = function (num) {
        return num < 10 ? '0' + num : num;
    }, timeDist = function (date1, date2) {
        date2 = date2 || new Date(date1.getFullYear(), 0, 1);
        return date1 - date2;
    }, pri = {d: function (d) {
        return fillZero(this.j(d));
    }, D: function (d) {
        return this.l(d).substr(0, 3);
    }, j: function (d) {
        return d.getDate();
    }, l: function (d) {
        return fullWeekName[d.getDay()];
    }, N: function (d) {
        return this.w(d) || 7;
    }, w: function (d) {
        return d.getDay();
    }, z: function (d) {
        return Math.floor(timeDist(d) / 86400000);
    }, F: function (d) {
        return fullMonthName[d.getMonth()];
    }, m: function (d) {
        return fillZero(this.n(d));
    }, n: function (d) {
        return d.getMonth() + 1;
    }, M: function (d) {
        return this.F(d).substr(0, 3);
    }, Y: function (d) {
        return d.getFullYear();
    }, y: function (d) {
        return this.Y(d).toString().slice(-2);
    }, a: function (d) {
        return d.getHours() < 12 ? 'am' : 'pm';
    }, A: function (d) {
        return this.a(d).toUpperCase();
    }, g: function (d) {
        return d.getHours() % 12 || 12;
    }, G: function (d) {
        return d.getHours();
    }, h: function (d) {
        return fillZero(this.g(d));
    }, H: function (d) {
        return fillZero(this.G(d));
    }, i: function (d) {
        return fillZero(d.getMinutes());
    }, s: function (d) {
        return fillZero(d.getSeconds());
    }};
    _public.format = function (expr, date) {
        expr = expr || 'Y-m-d H:i:s';
        if (arguments.length == 1) {
            date = new Date();
        } else if (!(date instanceof Date)) {
            date = new Date(parseInt(date) || 0);
        }
        return expr.replace(/\\?([a-z])/gi, function (str, $1) {
            if (pri[str]) {
                return pri[str].call(pri, date);
            } else {
                return $1;
            }
        });
    };
});
qv.require('jQuery').pkg('static qv.cookie', function () {
    var _public = this;
    var _private = {};
    _private.param = {};
    _public.set = function (name, value, param) {
        if (name == '') {
            return false;
        }
        param = jQuery.extend(true, jQuery.extend(true, {}, _private.param), param);
        if (typeof(value) == 'undefined' || value == null) {
            value = '';
        }
        if (typeof(param.expires) == 'number') {
            var expires = param.expires;
            param.expires = new Date();
            param.expires.setTime(param.expires.getTime() + (expires * 1000));
        }
        document.cookie = [encodeURIComponent(name), '=', encodeURIComponent(value), param.domain ? '; domain=' + param.domain : '', param.path ? '; path=' + param.path : '', param.expires ? '; expires=' + param.expires.toUTCString() : '', param.secure ? '; secure' : ''].join('');
        return true;
    };
    _public.get = function (name) {
        if (document.cookie && document.cookie != '') {
            var cookieArr = document.cookie.split('; ');
            for (var i = 0, cl = cookieArr.length, name = encodeURIComponent(name), tmpArr; i < cl; i++) {
                tmpArr = cookieArr[i].split('=');
                if (name == tmpArr[0]) {
                    return decodeURIComponent(tmpArr[1] || '');
                }
            }
        }
        return null;
    };
    _public.clear = function (name, param) {
        return _public.set(name, null, jQuery.extend(true, {expires: -1}, param));
    };
    _public.isExist = function (name) {
        return(_public.get(name) !== null);
    };
    _public.init = function (param, isInit) {
        if (isInit) {
            return(_private.param = param);
        } else {
            return jQuery.extend(true, _private.param, param);
        }
    };
});
qv.require('jQuery').pkg('static qq.speedReport', function () {
    var _public = this;
    var _private = {};
    _public.lastReportTime = 0;
    _private.config = {productFlag: 0, webFlag: 0, pageFlag: 0, reportCgi: 'http://isdspeed.qq.com/cgi-bin/r.cgi', frequency: 1.0, delayTime: 2000, isReportPerformance: false, reportPerformancePage: 0};
    _public.getTimeList = function () {
        if (typeof window.performance != 'undefined') {
            try {
                var navigationTime = window.performance.timing;
                var field = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"];
                var startTime = navigationTime.navigationStart;
                var timeList = [];
                for (var i = 1, j = field.length; i < j; i++) {
                    if (typeof navigationTime[field[i]] != 'undefined' && navigationTime[field[i]] > 0) {
                        var timeMs = navigationTime[field[i]] - startTime;
                        if (timeMs > 0 && timeMs < 100000) {
                            timeList.push(timeMs);
                            continue;
                        }
                    }
                    timeList.push(0);
                }
                return timeList;
            } catch (e) {
                return null;
            }
        } else {
            return null;
        }
    };
    _public.report = function (timePoint, pageFlag, pointCount, config) {
        var config = jQuery.extend({}, _private.config, config);
        var timeList = [];
        pageFlag = pageFlag || config.pageFlag;
        var isSendSuccess = false;
        try {
            if (config.isReportPerformance == true) {
                config.reportPerformancePage = config.reportPerformancePage || pageFlag;
                var performanceList = _public.getTimeList();
                if (performanceList == null) {
                    performanceList = [];
                    for (var i = 0; i < 19; i++) {
                        performanceList.push(0);
                    }
                }
                if (config.reportPerformancePage == pageFlag) {
                    timeList = timeList.concat(performanceList);
                } else if (config.reportPerformancePage > 0 && typeof window.performance != 'undefined') {
                    isSendSuccess = _public.send(performanceList, config.reportPerformancePage);
                }
            }
            if (timePoint && typeof timePoint.initTime != 'undefined' && typeof timePoint.pointMap != 'undefined') {
                if (jQuery.isPlainObject(timePoint.pointMap) && pointCount && pointCount > 0) {
                    var timePointIndex = {};
                    for (var key in timePoint.pointMap) {
                        var point = timePoint.pointMap[key];
                        if (timePoint.pointMap.hasOwnProperty(key) && jQuery.isArray(point) && point.length >= 4) {
                            var name = point[0], time = point[1], prePoint = point[2], pointIndex = point[3], timeMs = 0, initTime = timePoint.initTime;
                            if (typeof pointIndex != 'undefined' && pointIndex > 0) {
                                if (prePoint == 'initTime') {
                                    timeMs = time - initTime;
                                } else {
                                    if (typeof timePoint.pointMap[prePoint] != 'undefined') {
                                        var findPoint = timePoint.pointMap[prePoint];
                                        if (findPoint && findPoint.length >= 4 && prePoint == findPoint[0]) {
                                            timeMs = (time - findPoint[1]) || 1;
                                        }
                                    }
                                }
                                timePointIndex['index_' + pointIndex] = timeMs > 0 ? timeMs : 0;
                                if (typeof _public.lastReportTime != 'undefined' && time < _public.lastReportTime) {
                                    timePointIndex['index_' + pointIndex] = 0;
                                }
                                point.push(timePointIndex['index_' + pointIndex]);
                            }
                        }
                    }
                    for (var i = 1; i <= pointCount; i++) {
                        if (typeof timePointIndex['index_' + i] != 'undefined') {
                            timeList.push(timePointIndex['index_' + i]);
                        } else {
                            timeList.push(config.delayTime);
                        }
                    }
                    isSendSuccess = _public.send(timeList, pageFlag);
                }
            } else {
                if (config.isReportPerformance == true && typeof window.performance != 'undefined' && timeList.length > 0) {
                    isSendSuccess = _public.send(timeList, pageFlag);
                }
            }
        } catch (e) {
        }
        _public.lastReportTime = new Date().getTime();
        return isSendSuccess;
    };
    _public.send = function (timeList, pageFlag, webFlag, productFlag, frequency, delayTime, extParam) {
        var config = jQuery.extend(true, {}, _private.config);
        if (typeof(webFlag) == 'object') {
            config = jQuery.extend(true, config, webFlag);
            webFlag = config.webFlag;
        }
        if (Math.random() >= (frequency || config.frequency)) {
            return false;
        }
        var param = jQuery.extend(true, {flag1: productFlag || config.productFlag, flag2: webFlag || config.webFlag, flag3: pageFlag || config.pageFlag, _: new Date().getTime()}, extParam);
        for (var i = 0, j = timeList.length; i < j; i++) {
            if (!isNaN(timeList[i]) && timeList[i] != null) {
                param[i + 1] = timeList[i];
            }
        }
        setTimeout(function () {
            var report = new Image();
            report.src = config.reportCgi + (config.reportCgi.indexOf('?') == -1 ? '?' : '&') + jQuery.param(param);
        }, delayTime || config.delayTime);
        return true;
    };
    _public.init = function (config, isInit) {
        if (isInit) {
            return _private.config = config;
        } else {
            return jQuery.extend(true, _private.config, config);
        }
    };
});
qv.pkg('qq.security', {CSRF_TOKEN_KEY: 'tencentQQVIP123443safde&!%^%1282', CSRF_TOKEN_SALT: 5381, getCSRFToken: function (param) {
    param = param || {};
    var salt = param.salt || this.CSRF_TOKEN_SALT;
    var md5key = param.md5key || this.CSRF_TOKEN_KEY;
    var skey = param.skey || qv.cookie.get('private_skey') || qv.cookie.get('skey') || '';
    var hash = [], ASCIICode;
    hash.push((salt << 5));
    for (var i = 0, len = skey.length; i < len; ++i) {
        ASCIICode = skey.charAt(i).charCodeAt(0);
        hash.push((salt << 5) + ASCIICode);
        salt = ASCIICode;
    }
    return qv.string.getMD5(hash.join('') + md5key);
}});
qv.require('jQuery').pkg('static qq.login', function () {
    var _public = this;
    var _private = {};
    _private.eventStack = {};
    _private.config = {logoutCgi: '', loginUICgi: 'http://ui.ptlogin2.qq.com/cgi-bin/login', loginProxyCgi: 'http://imgcache.qq.com/qv/file/qq/login.loginProxy_1.x.x.html', loginProxyParam: {target: 'self'}, useLoginProxy: true, loginUITpl: '<div style="width:0; height: 0; margin: 0; padding: 0; border: 0; overflow: hidden; position: absolute;"><iframe frameborder="no" scrolling="no" style="margin: 0; padding: 0; border: 0; overflow: hidden; left: 0; top: 0; width: 100%; height: 100%;" src="about:blank"></iframe></div>', loginUIStyle: {zIndex: 1001}, loginMaskTpl: '<div style="margin: 0; padding: 0; border: 0; overflow: hidden; left: -100%; top: -100%; width: 100%; height: 100%; position: absolute;"><iframe frameborder="no" scrolling="no" style="margin: 0; padding: 0; border: 0; overflow: hidden; left: 100%; top: 100%; width: 100%; height: 100%; opacity: 0; filter: alpha(opacity=0); position: fixed;" src="about:blank"></iframe></div>', loginMaskStyle: {backgroundColor: '#000000', opacity: 0.6, zIndex: 1000}, loginMaskShow: true, event: {logout: function (args) {
        var targetUrl = _public.getConfig().logoutSuccessUrl || '';
        var hashIndex = (targetUrl.indexOf('#') + 1 || targetUrl.length) - 1;
        if (targetUrl == '') {
            window.location.reload();
        } else if (hashIndex == 0 || targetUrl.substr(0, hashIndex) == window.location.href.split('#')[0]) {
            window.location.hash = targetUrl.substr(hashIndex);
            window.location.reload();
        } else {
            window.location.href = targetUrl;
        }
    }, proxylogin: function (args) {
        _public.close();
        if (_public.dispatch('login') === false) {
            return false;
        }
        var targetUrl = _public.getConfig().loginSuccessUrl || '';
        var hashIndex = (targetUrl.indexOf('#') + 1 || targetUrl.length) - 1;
        if (targetUrl == '') {
            parent.window.location.reload();
        } else if (hashIndex == 0 || targetUrl.substr(0, hashIndex) == window.location.href.split('#')[0]) {
            parent.window.location.hash = targetUrl.substr(hashIndex);
            parent.window.location.reload();
        } else {
            parent.window.location.href = targetUrl;
        }
    }, proxyloginerror: function (args) {
        if (_public.dispatch('loginerror') === false) {
            return false;
        }
    }}, loginCallbackName: 'qq.login.dispatch', logoutCallbackName: 'ptlogin2_onLogout'};
    _private.param = {appid: 8000212, s_url: ''};
    _private.onceConfig = {};
    _private.onceParam = {};
    _public.init = function (config, param) {
        jQuery.extend(true, _private.config, config);
        jQuery.extend(true, _private.param, param);
        window.ptlogin2_onClose = function () {
            return _public.close();
        };
        window.ptlogin2_onLoginEx = function (uin, verifycode) {
            return(_public.dispatch('beforelogin') !== false);
        };
        window.ptlogin2_onReset = function () {
            return(_public.dispatch('beforereset') !== false);
        };
        window.ptlogin2_onResize = function (width, height) {
            return _public.show() && _public.resize(width, height) && _public.adjust();
        };
        window.ptlogin2_onLogout = function (json) {
            if (json && json.ret === 0) {
                return(_public.dispatch('logout') !== false);
            } else {
                return(_public.dispatch('logouterror') !== false);
            }
        };
        return true;
    };
    _public.open = function (config, param) {
        if (typeof(config) === 'string') {
            config = {loginSuccessUrl: config};
        } else if (typeof(config) === 'function') {
            config = {event: {login: config}};
        }
        _public.setConfig(config, true);
        _public.setParam(param, true);
        if (_public.dispatch('beforeopen') === false) {
            return false;
        }
        if (!_public.render(_public.getConfig(), _public.getParam())) {
            _public.dispatch('openerror');
            return false;
        }
        _public.dispatch('open');
        return true;
    };
    _public.close = function () {
        if (_public.dispatch('beforeclose') === false) {
            return false;
        }
        if (!_public.hide()) {
            _public.dispatch('closeerror');
            return false;
        }
        _public.dispatch('close');
        return true;
    };
    _public.logout = function (config, param) {
        if (typeof(config) === 'string') {
            config = {logoutSuccessUrl: config};
        } else if (typeof(config) === 'function') {
            config = {event: {logout: config}};
        }
        _public.setConfig(config);
        _public.setParam(param);
        if (_public.dispatch('beforelogout') === false) {
            return false;
        }
        config = _public.getConfig();
        param = _public.getParam();
        if (config.logoutCgi) {
            jQuery.ajax({url: config.logoutCgi, dataType: 'script', data: {appid: param.appid, daid: param.daid, domain: config.domain || document.domain, url: config.logoutSuccessUrl || window.location.href, callback: config.logoutCallbackName}, async: true, timeout: 5000}).error(function () {
                _public.dispatch('logouterror');
            });
            return true;
        } else {
            var domain = window.location.hostname.split('.');
            var commonParam = {domain: domain.slice(-2).join('.'), path: '/'};
            var privateParam = {domain: domain.slice(-3).join('.'), path: '/'};
            qv.cookie.clear('uin', commonParam);
            qv.cookie.clear('skey', commonParam);
            qv.cookie.clear('luin', commonParam);
            qv.cookie.clear('lskey', commonParam);
            qv.cookie.clear('private_uin', privateParam);
            qv.cookie.clear('private_skey', privateParam);
            qv.cookie.clear('uin_m', privateParam);
            qv.cookie.clear('skey_m', privateParam);
            _public.dispatch('logout');
            return true;
        }
    };
    _public.getUin = function () {
        if (/(\d+)/.test(qv.cookie.get('uin'))) {
            return parseInt(RegExp.$1, 10);
        } else {
            return 0;
        }
    };
    _public.getSessionKey = function () {
        return qv.cookie.get('private_skey') || qv.cookie.get('skey') || '';
    };
    _public.bind = function (eventType, fn) {
        if (!(eventType in _private.eventStack)) {
            _private.eventStack[eventType] = [];
        }
        _private.eventStack[eventType].push(fn);
        return true;
    };
    _public.dispatch = function (eventType, extraParameters) {
        var eventStack = (_private.eventStack[eventType] || []).concat(), eventReturn = true;
        if (_private.onceConfig && _private.onceConfig.event && _private.onceConfig.event[eventType]) {
            eventStack.push(_private.onceConfig.event[eventType]);
        }
        if (_private.config && _private.config.event && _private.config.event[eventType]) {
            eventStack.unshift(_private.config.event[eventType]);
        }
        for (var i = 0, iMax = eventStack.length; i < iMax; i++) {
            if (typeof(extraParameters) == 'undefined' && arguments.callee.caller && arguments.callee.caller.arguments) {
                extraParameters = arguments.callee.caller.arguments;
            } else if (!extraParameters || extraParameters.constructor != Array) {
                extraParameters = [extraParameters];
            }
            if (eventStack[i].apply(_public, extraParameters) === false) {
                eventReturn = false;
            }
        }
        return eventReturn;
    };
    _public.trigger = _public.dispatch;
    _public.render = function (config, param) {
        if (_public.dispatch('beforerender') === false) {
            return false;
        }
        if (!_private.maskFrame) {
            _private.maskFrame = jQuery(config.loginMaskTpl);
            _private.maskFrame.css(config.loginMaskStyle);
            _private.maskFrame.appendTo(document.body);
            var fixPosition = _private.maskFrame.find('iframe').position();
            if (fixPosition.left >= jQuery(window).width() && fixPosition.top >= jQuery(window).height()) {
                _private.maskFrame.prop('supportFixed', true).css('position', 'fixed');
            }
            if (_private.maskFrame.height() == jQuery(window).height()) {
                _private.maskFrame.prop('supportRelative', true);
            }
            _private.maskFrame.css('top', 0).css('left', 0).css('display', 'none').find('iframe').css('top', 0).css('left', 0);
        }
        if (!_private.loginFrame) {
            _private.loginFrame = jQuery(config.loginUITpl);
            _private.loginFrame.css(config.loginUIStyle);
            if (_private.maskFrame.prop('supportFixed')) {
                _private.loginFrame.css('position', 'fixed');
            }
            _private.loginFrame.appendTo(document.body);
        }
        if (config.useLoginProxy && config.loginProxyCgi) {
            jQuery.extend(true, param, config.loginProxyParam);
            param.s_url = config.loginProxyCgi + (config.loginProxyCgi.indexOf('?') != -1 ? '&' : '?') + jQuery.param({appid: param.appid, daid: param.daid, domain: config.domain || document.domain, url: config.loginSuccessUrl || window.location.href, callback: config.loginCallbackName});
        } else {
            param.s_url = config.loginSuccessUrl || param.s_url || window.location.href;
        }
        _private.loginFrame.width(1).height(1).show();
        _private.loginFrame.find('iframe').attr('src', config.loginUICgi + '?' + jQuery.param(param));
        _public.dispatch('render');
        return true;
    };
    _public.show = function () {
        if (_public.dispatch('beforeshow') === false) {
            return false;
        }
        var config = _public.getConfig();
        if (!_private.loginFrame) {
            return false;
        }
        if (!_private.maskFrame && config.loginMaskShow) {
            return false;
        }
        _private.loginFrame.css('display', '');
        _private.maskFrame.css('display', config.loginMaskShow ? '' : 'none');
        _public.dispatch('show');
        jQuery(window).unbind('scroll resize', _public.adjust);
        jQuery(window).bind('scroll resize', _public.adjust);
        return true;
    };
    _public.hide = function () {
        if (_public.dispatch('beforehide') === false) {
            return false;
        }
        if (!_private.loginFrame || !_private.maskFrame) {
            return false;
        }
        _private.loginFrame.css('display', 'none');
        _private.maskFrame.css('display', 'none');
        _public.dispatch('hide');
        jQuery(window).unbind('scroll resize', _public.adjust);
        return true;
    };
    _public.adjust = function (event) {
        event = event || {type: 'resize'};
        if (_private.maskFrame) {
            if (!_private.maskFrame.prop('supportFixed') || event.type == 'resize') {
                if (!_public.moveto(jQuery(document).scrollLeft() + (jQuery(window).width() - _private.loginFrame.width()) / 2, jQuery(document).scrollTop() + (jQuery(window).height() - _private.loginFrame.height()) / 2)) {
                    return false;
                }
            }
            if (!_private.maskFrame.prop('supportRelative') && event.type == 'resize') {
                _private.maskFrame.height(jQuery(window).height());
            }
        }
        return true;
    };
    _public.resize = function (width, height) {
        if (_private.loginFrame) {
            if (_public.dispatch('beforeresize') === false) {
                return false;
            }
            _private.loginFrame.css('width', width).css('height', height);
            _public.dispatch('resize');
            return true;
        } else {
            return false;
        }
    };
    _public.moveto = function (x, y) {
        if (_private.loginFrame) {
            if (_public.dispatch('beforemove') === false) {
                return false;
            }
            if (_private.maskFrame.prop('supportFixed')) {
                _private.loginFrame.css({left: x - jQuery(document).scrollLeft(), top: y - jQuery(document).scrollTop()});
            } else {
                _private.loginFrame.css({left: x, top: y});
                _private.maskFrame.css({left: jQuery(document).scrollLeft(), top: jQuery(document).scrollTop()});
            }
            _public.dispatch('move');
            return true;
        } else {
            return false;
        }
    };
    _public.getSize = function () {
        if (_private.loginFrame) {
            return{width: _private.loginFrame.width(), height: _private.loginFrame.height()};
        } else {
            return{width: 0, height: 0};
        }
    };
    _public.getPosition = function () {
        if (_private.loginFrame) {
            return _private.loginFrame.position();
        } else {
            return{left: 0, top: 0};
        }
    };
    _public.isVisible = function () {
        if (_private.loginFrame) {
            return(_private.loginFrame.css('display') != 'none');
        } else {
            return false;
        }
    };
    _public.getConfig = function () {
        return jQuery.extend(true, jQuery.extend(true, {}, _private.config), _private.onceConfig);
    };
    _public.setConfig = function (config, isInit) {
        if (isInit) {
            _private.onceConfig = config;
        } else {
            jQuery.extend(true, _private.onceConfig, config);
        }
        return true;
    };
    _public.getParam = function () {
        return jQuery.extend(true, jQuery.extend(true, {}, _private.param), _private.onceParam);
    };
    _public.setParam = function (param, isInit) {
        if (isInit) {
            _private.onceParam = param;
        } else {
            jQuery.extend(true, _private.onceParam, param);
        }
        return true;
    };
});
qv.pkg('static qq.cgiSpeedReport', function () {
    var _public = this;
    var _private = {};
    _private.conf = {autoReport: true, rate: 10};
    _public.init = function (conf, resetConfig) {
        if (resetConfig) {
            return(_private.conf = conf || {});
        } else {
            return jQuery.extend(true, _private.conf, conf);
        }
    };
    _public.send = function (url, reportParams, type, code, time, uin, rate) {
        if (/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/.test(url)) {
            if (Math.random() < 1 / (rate || _private.conf.rate) && _private.conf.autoReport) {
                var domain = RegExp.$4 || '';
                var path = RegExp.$5 || '';
                var search = RegExp.$6 || '';
                var report = new Image();
                reportParams = _private.formatReportParams.call(this, reportParams || _private.conf.reportParams || {}, url);
                report.src = 'http://c.isdspeed.qq.com/code.cgi?' + jQuery.param({domain: domain, cgi: path + search.replace(/([\?\&])([^\=\&\#]*)(\=[^\&\#]*)?/g,function (str, $1, $2) {
                    if (jQuery.isArray(reportParams) && jQuery.inArray($2, reportParams) >= 0) {
                        return str || '';
                    } else if (jQuery.isPlainObject(reportParams) && reportParams[$2]) {
                        return str || '';
                    }
                    return $1 == '?' ? '?' : '';
                }).replace(/^\?&/, '?').replace(/^\?+$/, ''), type: type || _private.conf.type || 0, code: code || _private.conf.code || 0, time: time || _private.conf.time || 0, rate: 1, uin: uin || _private.conf.uin || 0});
            }
            return true;
        } else {
            return false;
        }
    };
    _private.formatReportParams = function (reportParams, url) {
        if (typeof reportParams === 'function') {
            reportParams = reportParams(url);
        }
        if (typeof reportParams === 'string') {
            reportParams = reportParams.split(',');
        }
        if (jQuery.isArray(reportParams)) {
            var filteredReportParams = [];
            for (var i = 0, len = reportParams.length; i < len; i++) {
                reportParams[i] = jQuery.trim(reportParams[i]);
                if (reportParams[i]) {
                    filteredReportParams.push(reportParams[i]);
                }
            }
            reportParams = filteredReportParams;
        }
        return reportParams;
    };
    _private.getUrl = function (options) {
        return options.url + (options.url.indexOf('?') == -1 ? '?' : '&') + (typeof(options.data) == 'string' ? options.data : jQuery.param(options.data || {}));
    };
    _public.getPluginHandlers = function (params) {
        if (jQuery.isArray(params) || (typeof params === 'string')) {
            params = {reportParams: params};
        }
        return{ajaxSend: function (event, jqXHR, options) {
            jqXHR.startSendTime = new Date().getTime();
        }, ajaxSuccess: function (event, jqXHR, options, data) {
            if (params.autoReport !== false) {
                _public.send(_private.getUrl.call(this, options), params.reportParams, 1, 0, new Date().getTime() - jqXHR.startSendTime, params.uin, params.rate);
            }
        }, ajaxError: function (event, jqXHR, options, errorText) {
            var time = jqXHR.startSendTime ? (new Date().getTime() - jqXHR.startSendTime) : 0;
            if (params.autoReport !== false) {
                var type, code;
                if (!jqXHR.startSendTime) {
                    type = 3, code = 0;
                } else if (jqXHR.status >= 400 && jqXHR.status < 500) {
                    type = 2, code = 7;
                } else if (jqXHR.status >= 500 && jqXHR.status < 600) {
                    type = 2, code = 8;
                } else if (errorText == 'timeout') {
                    type = 2, code = 3;
                } else if (errorText == 'No Transport') {
                    type = 3, code = 0;
                } else {
                    type = 2, code = 0;
                }
                _public.send(_private.getUrl.call(this, options), params.reportParams, type, code, time, params.uin, params.rate);
            }
        }};
    };
});
﻿
if (typeof(jQuery) !== 'undefined') {
    jQuery.ajaxPrefilter('+iframe', function (options, originalOptions, jqXHR) {
        options.type = 'GET';
    });
    jQuery.ajaxTransport('+iframe', function (options, originalOptions, jqXHR) {
        var iframe, body = document.body || document.getElementsByTagName('body')[0] || document.documentElement, clear = function () {
            if (iframe) {
                if (body && iframe.parentNode) {
                    body.removeChild(iframe);
                }
                iframe = iframe.callback = iframe.complete = null;
            }
        }, escapeString = function (str) {
            var escapeList = {'\\\\': /\\/g, '\\n': /\n/g, '': /\r/g, '\\t': /\t/g, '\\\'': /\x27/g, '\\"': /\x22/g};
            for (var i in escapeList) {
                if (escapeList.hasOwnProperty(i)) {
                    str = str.replace(escapeList[i], i);
                }
            }
            return encodeURIComponent(str);
        };
        return{send: function (headers, complete) {
            var content = ('<html>' + '<head>' +
                (options.scriptCharset ? '<meta http-equiv="Content-type" content="text/html; charset=' + options.scriptCharset + '"/>' : '') + '<title>iframe loader</title>' + '</head>' + '<body>' + '<script type="text/javascript">' + '(function() {' +
                (window.document.domain != window.location.host ? 'window.document.domain="' + window.document.domain + '";' : '') +
                (options.jsonpCallback ? 'window.' + options.jsonpCallback + ' = function(json) { window.frameElement.callback(json); };' : '') + 'var head = window.document.head || window.document.getElementsByTagName("head")[0] || window.document.documentElement;' + 'var script = window.document.createElement("script");' +
                (options.scriptCharset ? 'script.charset = "' + options.scriptCharset + '";' : '') + 'script.src = "' + options.url + '";' + 'script.onload = script.onreadystatechange = function() {' + 'if (!script.readyState || /loaded|complete/.test(script.readyState)) {' + 'script.onload = script.onreadystatechange = null;' + 'window.frameElement.complete(200, "success");' + '}' + '};' + 'head.insertBefore(script, head.firstChild);' + '})()' + '<\/script>' + '</body>' + '</html>');
            var version = parseInt(jQuery.browser.version) || 0;
            iframe = document.createElement('iframe');
            if (jQuery.browser.safari) {
                iframe.style.width = iframe.style.height = iframe.style.borderWidth = 0;
                iframe.style.position = 'absolute';
            } else {
                iframe.style.display = 'none';
            }
            iframe.complete = function () {
                complete.apply(this, arguments);
                clear();
            };
            iframe.callback = function (json) {
                jqXHR.responseJSON = json;
            };
            if (jQuery.browser.chrome || (jQuery.browser.firefox && version < 3) || jQuery.browser.opera) {
                iframe.src = 'javascript:"' + escapeString(content) + '"';
                body.appendChild(iframe);
            } else if (jQuery.browser.msie) {
                body.appendChild(iframe);
                iframe.src = 'javascript:"' + escapeString(content) + '"';
            } else {
                iframe.src = 'about:blank';
                body.appendChild(iframe);
                iframe.contentWindow.document.open('text/html');
                iframe.contentWindow.document.write(content);
                iframe.contentWindow.document.close();
            }
        }, abort: function () {
            clear();
        }};
    });
    jQuery.ajaxPrefilter('+fragment', function (options, originalOptions, jqXHR) {
        var version = parseInt(jQuery.browser.version) || 0, isBeta = version > 7 && window.navigator && window.navigator.appMinorVersion && window.navigator.appMinorVersion.toLowerCase().indexOf('beta') > -1;
        if (jQuery.browser.msie && (typeof(document.documentMode) === 'undefined' || document.documentMode < 10) && !(navigator.appVersion.indexOf('Trident\/4.0') > -1 && isBeta)) {
            options.type = 'GET';
        } else {
            options.converters['iframe fragment'] = function () {
                if (!jqXHR.responseJSON) {
                    jQuery.error(jsonpCallback + ' was not called');
                }
                return jqXHR.responseJSON;
            };
            return'iframe';
        }
    });
    jQuery.ajaxTransport('+fragment', function (options, originalOptions, jqXHR) {
        var fragment, script;
        return{send: function (headers, complete) {
            fragment = document.createDocumentFragment();
            fragment[options.jsonpCallback] = function (json) {
                jqXHR.responseJSON = json;
            };
            script = document.createElement('script');
            if (options.scriptCharset) {
                script.charset = options.scriptCharset;
            }
            script.type = 'text/javascript';
            script.onload = script.onreadystatechange = function (_, isAbort) {
                if (isAbort || !script.readyState || String(script.readyState).toLowerCase() === 'loaded') {
                    script.onload = script.onreadystatechange = null;
                    if (fragment && script.parentNode) {
                        fragment.removeChild(script);
                        fragment = fragment[options.jsonpCallback] = null;
                    }
                    script = null;
                    if (!isAbort) {
                        complete(200, 'success');
                    }
                }
            };
            fragment.appendChild(script);
            script.src = options.url;
        }, abort: function () {
            if (script) {
                script.onload(0, 1);
            }
        }};
    });
    jQuery.ajaxPrefilter('+closure', function (options, originalOptions, jqXHR) {
        options.converters['text closure'] = function (response) {
            var key = new Date().getTime() + '_' + Math.random();
            if (!window.jQuery_ajax_closure) {
                window.jQuery_ajax_closure = {};
            }
            window.jQuery_ajax_closure[key] = jqXHR;
            eval('var ' + options.jsonpCallback + ' = function(data) { window.jQuery_ajax_closure["' + key + '"].responseJSON = data; }; ' + response);
            window.jQuery_ajax_closure[key] = null;
            return response;
        };
    });
    jQuery.ajaxPrefilter('+proxy', function (options, originalOptions, jqXHR) {
        options.converters['text proxy'] = function (response) {
            return response;
        };
    });
    jQuery.ajaxTransport('+proxy', function (options, originalOptions, jqXHR) {
        var inspectData = (typeof(options.data) === 'string') && /^application\/x\-www\-form\-urlencoded/.test(options.contentType), jsRexExp = /(\=)\?(&|$)|\?\?/i, iframe, body = document.body || document.getElementsByTagName('body')[0] || document.documentElement, request, clear = function () {
            if (iframe) {
                if (body && iframe.parentNode) {
                    body.removeChild(iframe);
                }
                iframe = iframe.send = null;
            }
        }, getResponse = function (jqFrameXHR) {
            var response = {};
            for (var i in options.responseFields) {
                if (options.responseFields.hasOwnProperty(i)) {
                    if (jqFrameXHR[options.responseFields[i]]) {
                        response[i] = jqFrameXHR[options.responseFields[i]];
                    }
                }
            }
            return response;
        };
        return{send: function (headers, complete) {
            if (/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/.test(options.url)) {
                var data = {};
                if (typeof(options.jsonpCallback) === 'string') {
                    data[options.jsonp] = options.jsonpCallback;
                }
                iframe = document.createElement('iframe');
                iframe.style.width = iframe.style.height = iframe.style.borderWidth = 0;
                iframe.src = RegExp.$1 + RegExp.$3 + (options.proxyPath || '/ajax.proxy.html');
                iframe.src += (iframe.src.indexOf('?') != -1 ? '&' : '?') + 'domain=' + window.document.domain;
                iframe.send = function (window) {
                    request = jQuery.ajax(jQuery.extend(true, jQuery.extend(true, {}, originalOptions), {global: false, crossDomain: false, timeout: 0, dataType: 'text', dataFilter: function (data, type) {
                        return data;
                    }, useProxy: false, data: data, xhr: window.ActiveXObject ? function () {
                        try {
                            return new window.ActiveXObject('Microsoft.XMLHTTP');
                        } catch (e) {
                        }
                    } : function () {
                        try {
                            return new window.XMLHttpRequest();
                        } catch (e) {
                        }
                    }, success: function (data, statusText, jqFrameXHR) {
                        complete(jqFrameXHR.status, jqFrameXHR.statusText, getResponse(jqFrameXHR), jqFrameXHR.getAllResponseHeaders());
                    }, error: function (jqFrameXHR, statusText, errorText) {
                        complete(jqFrameXHR.status, jqFrameXHR.statusText, getResponse(jqFrameXHR), jqFrameXHR.getAllResponseHeaders());
                    }, complete: function (jqFrameXHR, statucText) {
                        clear();
                    }}));
                };
                body.appendChild(iframe);
            }
        }, abort: function () {
            clear();
        }};
    });
    jQuery.ajaxPrefilter('+json +jsonp', function (options, originalOptions, jqXHR) {
        var inspectData = (typeof(options.data) === 'string') && /^application\/x\-www\-form\-urlencoded/.test(options.contentType), jsRexExp = /(\=)\?(&|$)|\?\?/i;
        if (options.useFragment !== false && options.type == 'GET' && (options.dataTypes[0] === 'jsonp' || options.jsonp !== false && (jsRexExp.test(options.url) || inspectData && jsRexExp.test(options.data)))) {
            options.useFragment = true;
            if (typeof(options.jsonpCallback) === 'string') {
                var url = options.url, jsonpCallback = options.jsonpCallback, data = options.data, replace = '$1' + jsonpCallback + '$2';
                if (options.jsonp !== false) {
                    url = url.replace(jsRexExp, replace);
                    if (options.url === url) {
                        if (inspectData) {
                            data = data.replace(jsRexExp, replace);
                        }
                        if (options.data === data) {
                            url += (/\?/.test(url) ? '&' : '?') + options.jsonp + '=' + jsonpCallback;
                        }
                    }
                }
                options.url = url;
                options.data = data;
                options.converters['fragment json'] = function (response) {
                    if (!jqXHR.responseJSON) {
                        jQuery.error(jsonpCallback + ' was not called');
                    }
                    return jqXHR.responseJSON;
                };
                options.dataTypes[0] = 'json';
                return'fragment';
            }
        }
    });
    jQuery.ajaxPrefilter('+*', function (options, originalOptions, jqXHR) {
        if (options.useProxy === true && /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/.test(options.url)) {
            var host = (RegExp.$2 || '').toLowerCase(), index = host.indexOf(window.document.domain.toLowerCase()), dataType = options.dataTypes[0];
            if (index == host.length - window.document.domain.length && (index == 0 || host.substr(index - 1, 1) == '.')) {
                options.converters[['proxy', dataType].join(' ')] = function (response) {
                    if (typeof(options.converters[['text', dataType].join(' ')]) == 'function') {
                        return options.converters[['text', dataType].join(' ')](response);
                    } else {
                        return response;
                    }
                };
                return'proxy';
            }
        }
    });
    jQuery.ajaxPrefilter('+* +text +xml +html +script +json +jsonp', function (options, originalOptions, jqXHR) {
        if (options.useProxy !== false && /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/.test(options.url)) {
            var host = (RegExp.$2 || '').toLowerCase(), index = host.indexOf(window.document.domain.toLowerCase()), jsRexExp = /(\=)\?(&|$)|\?\?/i, inspectData = (typeof(options.data) === 'string') && /^application\/x\-www\-form\-urlencoded/.test(options.contentType), jsonp = options.dataTypes[0] === 'jsonp' || options.jsonp !== false && (jsRexExp.test(options.url) || inspectData && jsRexExp.test(options.data)), defaultProxy = ((options.useProxyFirst || !jQuery.support.cors) && (options.dataTypes[0] == '*' || options.dataTypes[0] == 'text' || options.dataTypes[0] == 'xml' || options.dataTypes[0] == 'html' || (options.dataTypes[0] == 'json' && !jsonp)) || (jsonp && options.type == 'POST') || (options.dataTypes[0] == 'script' && options.type == 'POST'));
            if ((options.useProxy === true || (options.autoProxy !== false && window.location.host != host && defaultProxy)) && index == host.length - window.document.domain.length && (index == 0 || host.substr(index - 1, 1) == '.')) {
                options.crossDomain = false;
                options.useProxy = true;
                if (jsonp) {
                    if (typeof(options.jsonpCallback) === 'string') {
                        var url = options.url, jsonpCallback = options.jsonpCallback, data = options.data, replace = '$1' + jsonpCallback + '$2';
                        if (options.jsonp !== false) {
                            url = url.replace(jsRexExp, replace);
                            if (options.url === url) {
                                if (inspectData) {
                                    data = data.replace(jsRexExp, replace);
                                }
                                if (options.data === data) {
                                    url += (/\?/.test(url) ? '&' : '?') + options.jsonp + '=' + jsonpCallback;
                                }
                            }
                        }
                        options.url = url;
                        options.data = data;
                        options.converters['closure json'] = function (response) {
                            if (!jqXHR.responseJSON) {
                                jQuery.error(jsonpCallback + ' was not called');
                            }
                            return jqXHR.responseJSON;
                        };
                        options.dataTypes[0] = 'json';
                        return'closure';
                    }
                }
            } else if (options.useProxy !== true) {
                options.useProxy = false;
            }
        }
    });
}
/*  |xGv00|bb99f01dc1f77986c1f53b79a476d718 */
(function () {
    var apiName = 'cashier', thisAPI = window[apiName] = {}, INFO = thisAPI.INFO = {isp: ''}, VER = INFO.ver = {dialog: 1, api: 1};
    var LIB = thisAPI.LIB = {};
    LIB.ua = (function () {
        var aY = {}, aZ = navigator.userAgent, aX = navigator.appVersion, aW;
        if (window.ActiveXObject) {
            aY.ie = 6;
            (window.XMLHttpRequest || (aZ.indexOf("MSIE 7.0") >= 0)) && (aY.ie = 7);
            (window.XDomainRequest || (aZ.indexOf("Trident/4.0") >= 0)) && (aY.ie = 8);
            (aZ.indexOf("Trident/5.0") >= 0) && (aY.ie = 9);
            (aZ.indexOf("Trident/6.0") >= 0) && (aY.ie = 10)
        } else if (document.getBoxObjectFor || typeof(window.mozInnerScreenX) != "undefined") {
            aW = /(?:Firefox|GranParadiso|Iceweasel|Minefield).(\d+\.\d+)/i.exec(aZ);
            aY.firefox = aW ? parseFloat(aW[1], 10) : 3.3
        } else if (!navigator.taintEnabled) {
            aW = /AppleWebKit.(\d+\.\d+)/i.exec(aZ);
            aY.webkit = aW ? parseFloat(aW[1], 10) : (document.evaluate ? (document.querySelector ? 525 : 420) : 419);
            if ((aW = /Chrome.(\d+\.\d+)/i.exec(aZ)) || window.chrome) {
                aY.chrome = aW ? parseFloat(aW[1], 10) : 2
            } else if ((aW = /Version.(\d+\.\d+)/i.exec(aZ)) || window.safariHandler) {
                aY.safari = aW ? parseFloat(aW[1], 10) : 3.3
            }
        } else if (window.opera) {
            aY.opera = parseFloat(window.opera.version(), 10)
        }
        aW = /CPU.+?OS (\d+(?:_\d+)?).+?like Mac OS X/i.exec(aZ);
        if (aZ.indexOf("iPod") >= 0) {
            aY.iPod = aW ? parseFloat(aW[1].replace(/_/g, "."), 10) : 1
        } else if (aZ.indexOf("iPhone") >= 0) {
            aY.iPhone = aW ? parseFloat(aW[1].replace(/_/g, "."), 10) : 1
        } else if (aZ.indexOf("iPad") >= 0) {
            aY.iPad = aW ? parseFloat(aW[1].replace(/_/g, "."), 10) : 1
        } else if (aZ.indexOf("Macintosh") >= 0 || aZ.indexOf("OS X") >= 0) {
            aW = /(?:Mac )?OS X (\d+(?:_\d+)?)/i.exec(aZ);
            aY.mac = aW ? parseFloat(aW[1].replace(/_/g, "."), 10) : 1
        } else if (aZ.indexOf("Window") >= 0) {
            aW = /Windows NT (\d+(?:\.\d+)?)/i.exec(aZ);
            aY.windows = aW ? parseFloat(aW[1], 10) : 1
        } else if (aZ.indexOf("Android") >= 0) {
            aW = /Android (\d+(?:\.\d+)?)/i.exec(aZ);
            aY.android = aW ? parseFloat(aW[1], 10) : 1
        } else if (aZ.indexOf("Linux") >= 0) {
            aY.linux = 1
        }
        return aY
    })();
    LIB.fontFamily = LIB.ua.mac ? '"Helvetica Neue",Helvetica,"Hiragino Sans GB",Arial,sans-serif' : LIB.ua.windows && LIB.ua.windows >= 6 ? '"Microsoft Yahei",Tohama' : "Tahoma";
    LIB.err = function () {
        window.console && console.error && Function.prototype.apply.call(console.error, console, Array.prototype.slice.call(arguments, 0));
        typeof arguments[0] == "string" && alert(arguments[0])
    };
    LIB.warn = function () {
        window.console && console.warn && Function.prototype.apply.call(console.warn, console, Array.prototype.slice.call(arguments, 0))
    };
    LIB.log = function () {
        window.console && console.log && Function.prototype.apply.call(console.log, console, Array.prototype.slice.call(arguments, 0))
    };
    LIB.getIntRandom = function () {
        return Math.round(Math.random() * new Date().getTime()) % 9000000000 + 1000000000
    };
    LIB.setTimeout = function (callback, timeout, context, args) {
        return setTimeout(function () {
            callback.apply(context, args || [])
        }, timeout)
    };
    LIB.clearTimeout = function (aW) {
        clearTimeout(aW)
    };
    LIB.cookie = {get: function (name) {
        var ret = document.cookie.match(new RegExp("(?:^|;\\s)" + name + "=(.*?)(?:;\\s|$)"));
        return ret ? ret[1] : "";
    }, set: function (key, value, opt) {
        var _date = new Date(), _domain = opt.domain || "pay.qq.com", _path = opt.path || "/", _time_gap = opt.time || 10 * 365 * 24 * 3600 * 1000;
        _date.setTime(_date.getTime() + _time_gap);
        document.cookie = key + "=" + value + "; path=" + _path + "; domain=" + _domain + "; expires=" + _date.toUTCString();
    }, del: function (key, opt) {
        var _opt = opt || {};
        _opt.time = -new Date();
        LIB.cookie.set(key, '', _opt);
    }};
    LIB.each = function (obj, callback) {
        if (obj instanceof Array) {
            for (var i = 0, ll = obj.length; i < ll; i++) {
                callback(i, obj[i]);
            }
        } else if (obj instanceof Object) {
            for (var i in obj) {
                callback(i, obj[i]);
            }
        }
    };
    LIB.report = (function () {
        var fix = [];
        return function (url) {
            var image = new Image();
            fix.push(image);
            image.onload = image.onerror = image.onabort = function () {
                image = image.onload = image.onerror = image.onabort = null;
                for (var i = 0, l = fix.length; i < l; ++i) {
                    (fix[i] === image) && fix.splice(i, 1);
                }
            };
            image.src = url;
        }
    })();
    var eventQueue = [];
    LIB.attachEvent = function (a0, aZ, aY, aW) {
        if (!a0 || !aZ || typeof aY != "function") {
            return
        }
        aW = aW || {};
        aW.win = aW.win || window;
        var aX = function (a1) {
            aY.apply(aW.self, [a1 || win.event].concat(aW.args || []))
        };
        eventQueue.push({el: a0, type: aZ, cfn: aX, fn: aY});
        a0.attachEvent ? a0.attachEvent("on" + aZ, aX) : a0.addEventListener && a0.addEventListener(aZ, aX, false)
    };
    LIB.attachCrossEvent = function (a1, a0, aZ, a2, aX) {
        if (!a1 || !a0 || typeof aZ != "function" || !a2) {
            return
        }
        if (a2 == window) {
            return LIB.attachEvent(a1, a0, aZ, aX)
        }
        aX = aX || {};
        var aW = LIB.getIntRandom();
        while (e[aW]) {
            aW = LIB.getIntRandom()
        }
        e[aW] = {fn: aZ, opt: aX};
        a2["_CASH_CROSS_EVENT_HANDLER_" + aW] = window;
        a2["_CASH_CROSS_EVENT_TARGET_" + aW] = a1;
        var aY = new a2.Function("evt", "var win=window._CASH_CROSS_EVENT_HANDLER_" + aW + ",ret=false,el=window._CASH_CROSS_EVENT_TARGET_" + aW + ";if(win&&win.parent&&win.parent!=win&&win.cash){try{ret=win.cash.LIB.fireCrossEvent(evt||window.event," + aW + ");}catch(_){}}if(!ret){el&&(el.removeEventListener?el.removeEventListener('" + a0 + "',arguments.callee,false):el.detachEvent&&el.detachEvent('on" + a0 + "',arguments.callee));try{delete window._CASH_CROSS_EVENT_HANDLER_" + aW + ";delete window._CASH_CROSS_EVENT_TARGET_" + aW + ";}catch(_){window._CASH_CROSS_EVENT_HANDLER_" + aW + "=void 0;window._CASH_CROSS_EVENT_TARGET_" + aW + "=void 0;}}");
        eventQueue.push({el: a1, type: a0, cfn: aY, fn: aZ, win: a2, id: aW});
        a1.attachEvent ? a1.attachEvent("on" + a0, aY) : a1.addEventListener && a1.addEventListener(a0, aY, false)
    };
    LIB.detachEvent = function (a1, a0, aZ) {
        var a2 = [];
        for (var aY = 0, aX; aX = eventQueue[aY]; aY++) {
            if ((a1 && aX.el != a1) || (a0 && aX.type != a0) || (typeof aZ == "function" && aX.fn != aZ)) {
                a2.push(aX);
                continue
            }
            aX.el.detachEvent ? aX.el.detachEvent("on" + aX.type, aX.cfn) : aX.el.removeEventListener && aX.el.removeEventListener(aX.type, aX.cfn, false);
            if (aX.win && aX.id) {
                try {
                    delete aX.win["_CASH_CROSS_EVENT_HANDLER_" + aX.id];
                    delete aX.win["_CASH_CROSS_EVENT_TARGET_" + aX.id]
                } catch (aW) {
                    aX.win["_CASH_CROSS_EVENT_HANDLER_" + aX.id] = void 0;
                    aX.win["_CASH_CROSS_EVENT_TARGET_" + aX.id] = void 0
                }
            }
        }
        eventQueue = a2
    };
    LIB.getClientWidth = function (aY) {
        var aZ = aY || document, aW = aZ.documentElement, aX = aZ.body;
        return aZ.compatMode != "BackCompat" ? aW.clientWidth : LIB.ua.ie ? Math.min(aX.clientWidth, aW.clientWidth) || aX.clientWidth : aX.clientWidth
    };
    LIB.getClientHeight = function (aY) {
        var aZ = aY || document, aW = aZ.documentElement, aX = aZ.body;
        return aZ.compatMode != "BackCompat" ? aW.clientHeight : LIB.ua.ie ? Math.min(aX.clientHeight, aW.clientHeight) || aX.clientHeight : aX.clientHeight
    };
    LIB.getScrollWidth = function (aY) {
        var aZ = aY || document, aW = aZ.documentElement, aX = aZ.body;
        return aZ.compatMode != "BackCompat" ? Math.min(aX.scrollWidth, aW.scrollWidth) : LIB.ua.ie ? aX.scrollWidth : aW.scrollWidth
    };
    LIB.getScrollHeight = function (aY) {
        var aZ = aY || document, aW = aZ.documentElement, aX = aZ.body;
        return aZ.compatMode != "BackCompat" ? Math.min(aX.scrollHeight, aW.scrollHeight) : LIB.ua.ie ? aX.scrollHeight : aW.scrollHeight
    };
    LIB.getScrollLeft = function (aY) {
        var a0 = aY || document, aW = a0.documentElement, aX = a0.body, aZ = a0.defaultView;
        return aZ && ("pageXOffset"in aZ) ? aZ.pageXOffset : (aW.scrollLeft || aX.scrollLeft)
    };
    LIB.getScrollTop = function (aY) {
        var a0 = aY || document, aW = a0.documentElement, aX = a0.body, aZ = a0.defaultView;
        return aZ && ("pageXOffset"in aZ) ? aZ.pageYOffset : (aW.scrollTop || aX.scrollTop)
    };
    LIB.setScrollLeft = function (aY, aZ) {
        var a0 = aZ || document, aW = a0.documentElement, aX = a0.body;
        (a0.compatMode == "CSS1Compat" && !LIB.ua.webkit ? aW : aX).scrollLeft = +aY || 0
    };
    LIB.setScrollTop = function (aY, aZ) {
        var a0 = aZ || document, aW = a0.documentElement, aX = a0.body;
        (a0.compatMode == "CSS1Compat" && !LIB.ua.webkit ? aW : aX).scrollTop = +aY || 0
    };
    var Observer = LIB.Observer = function (aW, aX) {
        this._sender = aW;
        this._timeout = +aX || 0;
        this._subscriber = [];
        this._timer = 0
    };
    Observer.prototype.subscribe = function (a1, aX, a0) {
        if (typeof a1 !== "function") {
            return false
        }
        var aW = this._subscriber;
        for (var aZ = 0, aY; aY = aW[aZ]; aZ++) {
            if (aY.fn == a1) {
                return false
            }
        }
        aW.push({fn: a1, self: aX, context: a0});
        return true
    };
    Observer.prototype.unsubscribe = function (a0) {
        if (typeof a0 !== "function") {
            return false
        }
        var aX = this._subscriber, aW = false;
        for (var aZ = 0, aY; aY = aX[aZ]; aZ++) {
            if (aY.fn == a0) {
                aW = true;
                aX = aX.slice(0, aZ).concat(aX.slice(aZ + 1));
                break
            }
        }
        if (!aW) {
            return false
        }
        this._subscriber = aX;
        return true
    };
    Observer.prototype.notify = function (aW) {
        function aX() {
            this._timer = 0;
            var aY = this._subscriber;
            for (var a0 = 0, aZ; aZ = aY[a0]; a0++) {
                aZ.fn.call(aZ.self, aW, this._sender, aZ.context)
            }
        }

        if (this._timeout) {
            this._timer && LIB.clearTimeout(this._timer);
            this._timer = LIB.setTimeout(aX, this._timeout, this)
        } else {
            aX.call(this)
        }
    };
    LIB.unload = new Observer();
    LIB.unload.subscribe(function () {
        LIB.detachEvent()
    });
    var unloadEventName = LIB.ua.chrome || LIB.ua.opera ? "beforeunload" : "unload";

    function onUnloaded() {
        LIB.unload.notify()
    }

    window.attachEvent ? window.attachEvent("on" + unloadEventName, onUnloaded) : window.addEventListener && window.addEventListener(unloadEventName, onUnloaded, false);
    LIB.unload.subscribe(function () {
        if (window[apiName]) {
            try {
                delete window[apiName];
            } catch (aW) {
                window[apiName] = void 0;
            }
        }
        window.detachEvent ? window.detachEvent("on" + unloadEventName, onUnloaded) : window.removeEventListener && window.removeEventListener(unloadEventName, onUnloaded, false)
    });
    var ReadyCall = LIB.ReadyCall = function () {
        this.isReady = false;
        this._onReady = new Observer(this);
        this._first = true;
        this._onFirst = new Observer(this)
    };
    ReadyCall.prototype.onReady = function (aW) {
        this.isReady ? aW() : this._onReady.subscribe(aW);
        if (this._first) {
            this._onFirst.notify();
            this._first = false
        }
    };
    ReadyCall.prototype.ready = function () {
        if (!this.isReady) {
            this.isReady = true;
            this._onReady.notify()
        }
    };
    ReadyCall.prototype.onFirst = function (aW) {
        this._onFirst.subscribe(aW)
    };
    LIB.timeBasedRate = function () {
    };
    LIB.valueStat = function () {
    };
    LIB.reportException = function () {
    };
    LIB.encodeURI = function (aW) {
        return aW ? (aW + "").replace(/\%/g, "%25").replace(/\+/g, "%2B").replace(/ /g, "%20").replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/&/g, "%26").replace(/=/g, "%3D").replace(/"/g, "%22") : ""
    };
    var clientIndex = LIB.getIntRandom(), readyClients = {};
    LIB.domReady = function (a3, a0) {
        a0 = a0 || window;
        var aW = a0.document, aX, aY;
        if (aW.readyState == "complete" || aW.readyState == "interactive") {
            aW.body ? typeof a3 == "function" && a3() : LIB.setTimeout(LIB.domReady, 0, LIB, [a3, a0]);
            return
        }
        !(aX = aW["_CASH_DOM_READY_CLIENT_" + clientIndex]) && (aX = aW["_CASH_DOM_READY_CLIENT_" + clientIndex] = LIB.getIntRandom());
        if (!(aY = readyClients[aX])) {
            aY = readyClients[aX] = new ReadyCall();
            function aZ() {
                (aW.readyState == "complete" || aW.readyState == "interactive") && (aW.body ? aY.ready() : LIB.setTimeout(aZ, 0))
            }

            if (aW.attachEvent) {
                aW.attachEvent("onreadystatechange", aZ);
                a0.attachEvent("onload", aZ);
                var a2 = function () {
                    aW.detachEvent("onreadystatechange", aZ);
                    a0.detachEvent("onload", aZ)
                };
                aY.onReady(a2);
                LIB.unload.subscribe(a2);
                var a4 = false;
                try {
                    a4 = a0.frameElement == null
                } catch (a1) {
                }
                aW.documentElement.doScroll && a4 && (function () {
                    if (aY.isReady) {
                        return
                    }
                    try {
                        aW.documentElement.doScroll("left")
                    } catch (a5) {
                        LIB.setTimeout(arguments.callee, 0);
                        return
                    }
                    aZ()
                })()
            } else if (aW.addEventListener) {
                aW.addEventListener("DOMContentLoaded", aZ, false);
                a0.addEventListener("load", aZ, false);
                var a2 = function () {
                    aW.removeEventListener("DOMContentLoaded", aZ, false);
                    a0.removeEventListener("load", aZ, false)
                };
                aY.onReady(a2);
                LIB.unload.subscribe(a2)
            }
            aY.onReady(function () {
                delete readyClients[aX];
                try {
                    delete aW["_CASH_DOM_READY_CLIENT_" + clientIndex]
                } catch (a5) {
                    aW["_CASH_DOM_READY_CLIENT_" + clientIndex] = void 0
                }
            })
        }
        aY.onReady(a3)
    };
    var CAV = LIB.CAV = {};
    CAV._dom = [];
    CAV._pos = [];
    CAV._hasTop = false;
    CAV._onPropertyChanged = new Observer(CAV);
    var hasInitCAV = false;
    CAV._handle = function (aX, aW, aY) {
        if (aW == 0) {
            LIB.domReady(function () {
                !aY && CAV._onPropertyChanged.notify()
            })
        } else if (CAV._dom[aW]) {
            var aZ = CAV._dom[aW].win;
            LIB.domReady(function () {
                var a6, a4 = aZ.document, a1 = (function () {
                    try {
                        a6 = a4.getElementById("QZ_Toolbar_Container");
                        if (a6) {
                            return a6.offsetHeight
                        }
                    } catch (a5) {
                    }
                    try {
                        a6 = a4.getElementById("page3rdApp");
                        if (a6) {
                            return a6.offsetTop
                        }
                    } catch (a5) {
                    }
                    return 0
                })();
                var a0 = CAV._pos[aW] = a4.documentElement.style.overflow == "hidden" ? {sl: 0, st: 0, sw: LIB.getClientWidth(a4), sh: LIB.getClientHeight(a4) - a1, cw: LIB.getClientWidth(a4), ch: LIB.getClientHeight(a4) - a1} : {sl: LIB.getScrollLeft(a4), st: LIB.getScrollTop(a4), sw: LIB.getScrollWidth(a4), sh: LIB.getScrollHeight(a4) - a1, cw: LIB.getClientWidth(a4), ch: LIB.getClientHeight(a4) - a1};
                try {
                    if (CAV._dom[aW].frame) {
                        var a3 = CAV._dom[aW].frame.getBoundingClientRect();
                        a0.l = a3.left;
                        a0.t = a3.top - a1;
                        a0.r = a3.right;
                        a0.b = a3.bottom - a1
                    }
                } catch (a2) {
                }
                !aY && CAV._onPropertyChanged.notify()
            }, aZ)
        }
    };
    CAV._init = function (aY) {
        if (hasInitCAV) {
            return
        }
        hasInitCAV = true;
        var a0, a4, aW = 0, aX, a5 = aY || window, aZ, a6;
        try {
            while (a5) {
                a0 = false;
                try {
                    a5.document && a5.document.domain == document.domain && (a0 = true)
                } catch (a7) {
                }
                CAV._dom[aW] = a4 = {win: a5};
                CAV._pos[aW] = void 0;
                if (a0) {
                    LIB.attachCrossEvent(a5, "scroll", CAV._handle, a5, {args: [aW]});
                    LIB.attachCrossEvent(a5, "resize", CAV._handle, a5, {args: [aW]});
                    a5 == top && (CAV._hasTop = true);
                    if (aW > 0 && (aX = CAV._dom[aW - 1])) {
                        try {
                            aZ = Array.prototype.slice.call(a5.document.getElementsByTagName("iframe"), 0).concat(Array.prototype.slice.call(a5.document.getElementsByTagName("frame"), 0))
                        } catch (a7) {
                            aZ = [];
                            var a3 = a5.document.getElementsByTagName("iframe");
                            for (var a1 = 0, a2; a2 = a3[a1]; a1++) {
                                aZ.push(a2)
                            }
                            a3 = a5.document.getElementsByTagName("frame");
                            for (var a1 = 0, a2; a2 = a3[a1]; a1++) {
                                aZ.push(a2)
                            }
                        }
                        a6 = aZ.length;
                        for (var a1 = 0; a1 < a6; a1++) {
                            if (aZ[a1].contentWindow == aX.win) {
                                a4.frame = aZ[a1];
                                break
                            }
                        }
                        CAV._handle(null, aW, true)
                    }
                }
                if (a5 == top) {
                    break
                }
                aW++;
                a5 = a5.parent
            }
        } catch (a7) {
        }
        CAV._onPropertyChanged.notify()
    };
    CAV._ready = new ReadyCall();
    CAV._xReady = false;
    CAV._onClientRectChanged = new Observer();
    CAV._onClientRectChanged.subscribe(function (aW) {
        LIB.log("Client Rectangle: Left=" + aW.left + ", Top=" + aW.top + ", Right=" + aW.right + ", Bottom=" + aW.bottom)
    });
    var clientRectCache = null;
    CAV._getClientRect = function () {
        if (!clientRectCache) {
            var aX = LIB.getScrollLeft();
            var aZ = LIB.getScrollTop();
            var aW = Math.max(LIB.getScrollWidth(), LIB.getClientWidth());
            var aY = Math.max(LIB.getScrollHeight(), LIB.getClientHeight());
            return{left: aX, top: aZ, right: aW + aX, bottom: aY + aZ, clientLeft: 0, clientTop: 0, clientRight: aW, clientBottom: aY}
        }
        return clientRectCache
    };
    LIB.domReady(function () {
        if (!clientRectCache) {
            var aW = window == top;
            var aZ = LIB.getScrollLeft();
            var a0 = LIB.getScrollTop();
            var aY = LIB.getClientWidth();
            var aX = LIB.getClientHeight();
            clientRectCache = {left: aZ, top: a0, right: Math.min(aY, !aW ? screen.availWidth - 30 : Infinity) + aZ, bottom: Math.min(aX, !aW ? screen.availHeight - 100 : Infinity) + a0, clientLeft: 0, clientTop: 0, clientRight: Math.min(aY, !aW ? screen.availWidth - 30 : Infinity), clientBottom: Math.min(aX, !aW ? screen.availHeight - 100 : Infinity)}
        }
    });
    CAV._updatePos = function (aZ, aX) {
        var aW = aZ.pos;
        for (var a0 = 1, aY = aW.length; a0 < aY; a0++) {
            aW[a0] && ((CAV._pos[a0] = aW[a0]).x = true)
        }
        CAV._hasTop = CAV._hasTop || aZ.hasTop;
        CAV._xReady = true;
        CAV._onPropertyChanged.notify()
    };
    var isCrossDomain = true;
    CAV._onPropertyChanged.subscribe(function () {
        if (!CAV._xReady && !isCrossDomain) {
            return
        }
        LIB.domReady(function () {
            var aX = LIB.getScrollLeft();
            var aW = LIB.getScrollTop();
            var a7 = LIB.getClientWidth();
            var a1 = LIB.getClientHeight();
            var a2 = CAV._hasTop, a3 = CAV._pos.length, a0, a6 = CAV._pos[a3 - 1] || {cw: Math.min(a7, !a2 ? screen.availWidth - 30 : Infinity), ch: Math.min(a1, !a2 ? screen.availHeight - 100 : Infinity)};
            a0 = {left: 0, top: 0, right: a6.cw, bottom: a6.ch};
            if (a3 > 0) {
                var a4 = {l: a0.left, t: a0.top, r: a0.right, b: a0.bottom};
                for (var aY = a3 - 1, aZ; aY > 0; aY--) {
                    aZ = CAV._pos[aY] || {};
                    !("l"in aZ) && (aZ.l = 0);
                    !("t"in aZ) && (aZ.t = 20);
                    !("r"in aZ) && (aZ.r = a4.r);
                    !("onMessage"in aZ) && (aZ.b = a4.b - 20);
                    a0.left -= aZ.l;
                    a0.top -= aZ.t;
                    a0.right -= aZ.l;
                    a0.bottom -= aZ.t;
                    a4.l = Math.max(a4.l, aZ.l) - aZ.l;
                    a4.t = Math.max(a4.t, aZ.t) - aZ.t;
                    a4.r = Math.min(a4.r, aZ.r) - aZ.l;
                    a4.b = Math.min(a4.b, aZ.b) - aZ.t
                }
                a0.left = Math.max(a4.l, a0.left);
                a0.top = Math.max(a4.t, a0.top);
                a0.right = Math.min(a4.r, a0.right, a0.left + a7);
                a0.bottom = Math.min(a4.b, a0.bottom, a0.top + a1)
            }
            a0.clientLeft = a0.left;
            a0.clientTop = a0.top;
            a0.clientRight = a0.right;
            a0.clientBottom = a0.bottom;
            a0.left += aX;
            a0.top += aW;
            a0.right += aX;
            a0.bottom += aW;
            if (clientRectCache) {
                for (var a5 in a0) {
                    if (a0[a5] != clientRectCache[a5]) {
                        clientRectCache = a0;
                        CAV._onClientRectChanged.notify(a0);
                        break
                    }
                }
            } else {
                clientRectCache = a0;
                CAV._onClientRectChanged.notify(a0)
            }
            CAV._ready.ready()
        })
    });
    CAV._setScroll = function (aX, aW) {
        if (!aX) {
            return
        }
        CAV._ready.onReady(function () {
            var bc = NaN, ba = NaN;
            if ("left"in aX) {
                bc = +aX.left || 0;
                if (bc < 0) {
                    bc = 0
                }
            }
            if ("top"in aX) {
                ba = +aX.top || 0;
                if (ba < 0) {
                    ba = 0
                }
            }
            var be = CAV._pos.length;
            if (isNaN(bc) && isNaN(ba)) {
                return
            }
            var a2 = LIB.getScrollWidth();
            var a0 = LIB.getScrollHeight();
            var a6 = LIB.getClientWidth();
            var a5 = LIB.getClientHeight();
            if (be == 0) {
                !isNaN(bc) && LIB.setScrollLeft(Math.min(a2 - a6, bc));
                !isNaN(ba) && LIB.setScrollTop(Math.min(a0 - a5, ba));
                return
            }
            var bd = 0, a7 = 0, a8, aZ;
            var a4 = LIB.getScrollLeft();
            var a3 = LIB.getScrollTop();
            var a1 = [], aY;
            for (var bb = 0, a9; bb < be; bb++) {
                a9 = bb == 0 ? {l: -a4, t: -a3, sl: a4, st: a3, sw: a2, sh: a0, cw: a6, ch: a5} : CAV._pos[bb];
                if (!a9) {
                    continue
                }
                bd -= a9.l;
                if ((a8 = Math.min(a9.sl, bd - bc)) > 0 || (a8 = Math.max(a9.sl + a9.cw - a9.sw, bd - bc)) < 0) {
                    if (bb == 0 || !CAV._pos[bb].x) {
                        try {
                            aY = CAV._dom[bb].win.document;
                            LIB.setScrollLeft(LIB.getScrollLeft(aY) - a8, aY)
                        } catch (bf) {
                        }
                    } else {
                        a1.push({i: bb, l: a8})
                    }
                    bd -= a8
                }
                a7 -= a9.t;
                if ((aZ = Math.min(a9.st, a7 - ba)) > 0 || (aZ = Math.max(a9.st + a9.ch - a9.sh, a7 - ba)) < 0) {
                    if (bb == 0 || !CAV._pos[bb].x) {
                        try {
                            aY = CAV._dom[bb].win.document;
                            LIB.setScrollTop(LIB.getScrollTop(aY) - aZ, aY)
                        } catch (bf) {
                        }
                    } else {
                        a1.push({i: bb, t: aZ})
                    }
                    a7 -= aZ
                }
            }
            a1.length && Y.call("canvas.setScroll", {args: {xdm: a1}, monitor: aW})
        })
    };
    isCrossDomain && CAV._init();
    var DLG = LIB.DLG = {};
    var dlgHandles = {}, dlgCount = 1;
    DLG._handle = function (a0, aX) {
        var aW = aX.idx, aY, aZ = aX.key;
        if (!aX.key && (aY = dlgHandles[aW])) {
            aY.platform.consume();
            delete dlgHandles[aW];
            return false
        }
        a0.send({idx: aW});
        return true
    };
    DLG._call = function (a2, a0, aY) {
        aY = aY || {};
        var aW = aY.timestamp = aY.timestamp || new Date().getTime();
        var aX = dlgCount++;
        var a1 = 0;
        var aZ = dlgHandles[aX] = {timestamp: aW, platform: new OnceCall(10000, {onConsume: function () {
            LIB.valueStat(350303, 1, 20, {duration: new Date().getTime() - aW, rate: LIB.timeBasedRate()});
            if (!a1) {
                var a3 = new Date().getTime();
                a1 = setTimeout(function () {
                    a1 = 0;
                    LIB.valueStat(350400, 1, 23, {rate: 50})
                }, 300000)
            }
        }, onTimeout: function () {
            !a2.closed && LIB.valueStat(350303, 2, 19, {duration: new Date().getTime() - aW})
        }}, true)};
        a2.send({key: a0, args: aY, idx: aX})
    };
    LIB.insertStyle = function (aY, aX) {
        aX = aX || document;
        var aW = aX.createElement("style");
        aW.type = "text/css";
        aX.getElementsByTagName("head")[0].appendChild(aW);
        if (aW.styleSheet) {
            aW.styleSheet.cssText = aY
        } else {
            aW.appendChild(aX.createTextNode(aY))
        }
    };
    var CSSManager = {}, isCompatMode = LIB.ua.ie && document.compatMode == "BackCompat", dialogAllCSS = [];
    dialogAllCSS.push(".cash_dialog_mask{position:absolute;z-index:4000;-moz-opacity:1;opacity:1;filter:alpha(opacity=1);-o-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out,height .6s ease-out;-ms-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out,height .6s ease-out;-moz-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out,height .6s ease-out;-webkit-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out,height .6s ease-out;transition:left .6s ease-out,top .6s ease-out,width .6s ease-out,height .6s ease-out;}");
    dialogAllCSS.push(".cash_dialog_wrap{position:absolute;-moz-border-radius:5px;border-radius:5px;font-size:12px;font-family:", LIB.fontFamily, ";-o-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;-ms-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;-moz-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;-webkit-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;}");
    dialogAllCSS.push(".cash_dialog_border{position:absolute;z-index:1;top:0;left:0;-moz-border-radius:5px;border-radius:5px;background:rgba(187,187,187,0.9);filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0 startColorstr=#5abbbbbb,endColorstr=#5abbbbbb);-o-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;-ms-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;-moz-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;-webkit-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;}");
    dialogAllCSS.push(".cash_dialog_wrap_no_border .cash_dialog_border{display:none}");
    dialogAllCSS.push(".cash_dialog_wrap_no_border_no_position .cash_dialog_border{display:none}");
    dialogAllCSS.push(".cash_dialog_wrap_no_border_noani .cash_dialog_border{display:none}");
    dialogAllCSS.push(".cash_dialog_wrap_no_border{position:absolute;background-color:#fff;font-size:12px;font-family:", LIB.fontFamily, ";-o-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;-ms-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;-moz-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;-webkit-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;}");
    dialogAllCSS.push(".cash_dialog_wrap_no_border_no_position{position:relative;background-color:#fff;font-size:12px;font-family:", LIB.fontFamily, ";-o-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;-ms-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;-moz-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;-webkit-transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;transition:left .6s ease-out,top .6s ease-out,width .6s ease-out;}");
    dialogAllCSS.push(".cash_dialog_mask_noani{position:absolute;z-index:4000;-moz-opacity:1;opacity:1;filter:alpha(opacity=1);-o-transition:width .6s ease-out,height .6s ease-out;-ms-transition:width .6s ease-out,height .6s ease-out;-moz-transition:width .6s ease-out,height .6s ease-out;-webkit-transition:width .6s ease-out,height .6s ease-out;transition:width .6s ease-out,height .6s ease-out;}");
    dialogAllCSS.push(".cash_dialog_wrap_noani{position:absolute;-moz-border-radius:5px;border-radius:5px;font-size:12px;font-family:", LIB.fontFamily, ";-o-transition:width .6s ease-out;-ms-transition:width .6s ease-out;-moz-transition:width .6s ease-out;-webkit-transition:width .6s ease-out;transition:width .6s ease-out;}");
    dialogAllCSS.push(".cash_dialog_wrap_no_border_noani{position:absolute;background-color:#fff;font-size:12px;font-family:", LIB.fontFamily, ";-o-transition:width .6s ease-out;-ms-transition:width .6s ease-out;-moz-transition:width .6s ease-out;-webkit-transition:width .6s ease-out;transition:width .6s ease-out;}");
    dialogAllCSS.push(".cash_dialog_header{margin-top:10px;margin-left:10px;margin-right:10px;height:28px;position:relative;z-index:2;border-bottom:1px solid #d8d8d8;background:#fafafa;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fafafa',endColorstr='#ededed',GradientType=0);background:-o-linear-gradient(top,#fafafa 0%,#ededed 100%);background:-moz-linear-gradient(top,#fafafa 0%,#ededed 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#fafafa),color-stop(100%,#ededed));background:-webkit-linear-gradient(top,#fafafa 0%,#ededed 100%);background:linear-gradient(top,#fafafa 0%,#ededed 100%);}");
    dialogAllCSS.push(".cash_dialog_header h3{float:left;height:28px;color:#4c4c4c;font-size:13px;line-height:28px;overflow:hidden;margin:0;padding-left:10px;font-weight:bold;}");
    dialogAllCSS.push(".cash_dialog_header button{background-color:transparent;background-image:url('http://", INFO.isp, "qzonestyle.gtimg.cn/open/fusion/img/sprite.png?max_age=31104000&v=3');background-repeat:no-repeat;background-position:10px 10px;float:right;width:29px;height:28px;margin-right:5px;line-height:100px;border:0 none;cursor:pointer;font-size:0;}");
    dialogAllCSS.push(".cash_dialog_header button:hover{background-position:-11px 10px;}");
    dialogAllCSS.push(".cash_dialog_content{margin-bottom:10px;margin-left:10px;margin-right:10px;color:#5f5f5f;background-color:#fff;overflow:hidden;position:relative;z-index:2;-o-transition:height .6s ease-out;-ms-transition:height .6s ease-out;-moz-transition:height .6s ease-out;-webkit-transition:height .6s ease-out;transition:height .6s ease-out;}");
    dialogAllCSS.push(".cash_dialog_wrap_no_border .cash_dialog_content{margin:0;}");
    dialogAllCSS.push(".cash_dialog_wrap_no_border_no_position .cash_dialog_content{margin:0;}");
    dialogAllCSS.push(".cash_dialog_wrap_no_border .cash_dialog_header{margin:0;}");
    dialogAllCSS.push(".cash_dialog_wrap_no_border_no_position .cash_dialog_header{margin:0;}");
    dialogAllCSS.push(".cash_dialog_wrap_no_border_noani .cash_dialog_content{margin:0;}");
    dialogAllCSS.push(".cash_dialog_wrap_no_border_noani .cash_dialog_header{margin:0;}");
    dialogAllCSS.push(".cash_dialog_content_mask{position:absolute;width:100%;height:100%;left:0;top:0;background:#fff;filter:alpha(opacity=0);opacity:0;}");
    dialogAllCSS.push(".cash_dialog_content a:link,.cash_dialog_content a:visited{color:#5181b4;text-decoration:none;}");
    dialogAllCSS.push(".cash_dialog_content a:hover{text-decoration:underline;}");
    dialogAllCSS.push(".cash_dialog_frame{-o-transition:width .6s ease-out,height .6s ease-out;-ms-transition:width .6s ease-out,height .6s ease-out;-moz-transition:width .6s ease-out,height .6s ease-out;-webkit-transition:width .6s ease-out,height .6s ease-out;transition:width .6s ease-out,height .6s ease-out;}");
    dialogAllCSS.push(".cash_dialog_footer{background-color:#f3f3f3;text-align:right;clear:both;padding:6px 6px 0 0;height:", isCompatMode ? 35 : 29, "px;}");
    dialogAllCSS.push(".cash_dialog_button_normal:link,.cash_dialog_button_submit:link,.cash_dialog_button_submit_disabled:link,.cash_dialog_button_disabled:link,.cash_dialog_button_normal:visited,.cash_dialog_button_submit:visited,.cash_dialog_button_submit_disabled:visited,.cash_dialog_button_disabled:visited,.cash_dialog_button_normal:hover,.cash_dialog_button_submit:hover,.cash_dialog_button_submit_disabled:hover,.cash_dialog_button_disabled:hover,.cash_dialog_button_normal:active,.cash_dialog_button_submit:active,.cash_dialog_button_submit_disabled:active,.cash_dialog_button_disabled:active{border-radius:3px;color:#333;line-height:22px;height:22px;display:inline-block;margin-left:4px;padding:0 10px;text-decoration:none;font-size:12px;}");
    dialogAllCSS.push(".cash_dialog_button_normal:link,.cash_dialog_button_normal:visited,.cash_dialog_button_normal:hover,.cash_dialog_button_normal:active{border:1px solid #b4b4b4;background:#f4f3f4;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#f4f3f4',endColorstr='#dfdede',GradientType=0);background:-o-linear-gradient(top,#f4f3f4 0%,#dfdede 100%);background:-moz-linear-gradient(top,#f4f3f4 0%,#dfdede 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#f4f3f4),color-stop(100%,#dfdede));background:-webkit-linear-gradient(top,#f4f3f4 0%,#dfdede 100%);background:linear-gradient(top,#f4f3f4 0%,#dfdede 100%);}");
    dialogAllCSS.push(".cash_dialog_button_normal:hover,.cash_dialog_button_normal:active{background:#fafafa;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fafafa',endColorstr='#dfdede',GradientType=0);background:-o-linear-gradient(top,#fafafa 0%,#dfdede 100%);background:-moz-linear-gradient(top,#fafafa 0%,#dfdede 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#fafafa),color-stop(100%,#dfdede));background:-webkit-linear-gradient(top,#fafafa 0%,#dfdede 100%);background:linear-gradient(top,#fafafa 0%,#dfdede 100%);}");
    dialogAllCSS.push(".cash_dialog_button_submit:link,.cash_dialog_button_submit:visited,.cash_dialog_button_submit:hover,.cash_dialog_button_submit:active{color:#fff;border:1px solid #4c92c8;background:#56bdf4;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#56bdf4',endColorstr='#46a3d7',GradientType=0);background:-o-linear-gradient(top,#56bdf4 0%,#46a3d7 100%);background:-moz-linear-gradient(top,#56bdf4 0%,#46a3d7 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#56bdf4),color-stop(100%,#46a3d7));background:-webkit-linear-gradient(top,#56bdf4 0%,#46a3d7 100%);background:linear-gradient(top,#56bdf4 0%,#46a3d7 100%);}");
    dialogAllCSS.push(".cash_dialog_button_submit:hover,.cash_dialog_button_submit:active{background:#56bdf4;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#56bdf4',endColorstr='#57addd',GradientType=0);background:-o-linear-gradient(top,#56bdf4 0%,#57addd 100%);background:-moz-linear-gradient(top,#56bdf4 0%,#57addd 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#56bdf4),color-stop(100%,#57addd));background:-webkit-linear-gradient(top,#56bdf4 0%,#57addd 100%);background:linear-gradient(top,#56bdf4 0%,#57addd 100%);}");
    dialogAllCSS.push(".cash_dialog_button_disabled:link,.cash_dialog_button_disabled:visited,.cash_dialog_button_disabled:hover,.cash_dialog_button_disabled:active{color:#bbb;background-color:#f9f9f9;border:1px solid #dcdcdc;cursor:no-drop;}");
    dialogAllCSS.push(".cash_dialog_button_submit_disabled:link,.cash_dialog_button_submit_disabled:visited,.cash_dialog_button_submit_disabled:hover,.cash_dialog_button_submit_disabled:active{color:#fff;border:1px solid #60a7dd;background:#9cd7f7;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#9cd7f7',endColorstr='#83bede',GradientType=0);background:-o-linear-gradient(top,#9cd7f7 0%,#83bede 100%);background:-moz-linear-gradient(top,#9cd7f7 0%,#83bede 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#9cd7f7),color-stop(100%,#83bede));background:-webkit-linear-gradient(top,#9cd7f7 0%,#83bede 100%);background:linear-gradient(top,#9cd7f7 0%,#83bede 100%);cursor:no-drop;}");
    dialogAllCSS.push(".cash_dialog_confirm_content{margin:40px auto;position:relative;width:260px;}");
    dialogAllCSS.push(".cash_dialog_confirm_content h3{padding-left:35px;font-size:14px;margin:0 0 10px 0;line-height:130%;font-weight:bold;}");
    dialogAllCSS.push(".cash_dialog_confirm_content_p{padding-left:35px;margin-bottom:6px;line-height:130%;font-size:12px;}");
    dialogAllCSS.push(".cash_dialog_confirm_icon{background-image:url('http://", INFO.isp, "qzonestyle.gtimg.cn/open/fusion/img/sprite.png?max_age=31104000&v=3');background-repeat:no-repeat;width:25px;height:24px;font-size:0;line-height:100px;overflow:hidden;left:0;top:-2px;position:absolute;}");
    dialogAllCSS.push(".cash_dialog_confirm_icon_request{background-position:left -260px;}");
    dialogAllCSS.push(".cash_dialog_confirm_icon_error{background-position:left -284px;}");
    dialogAllCSS.push(".cash_dialog_confirm_icon_warn{background-position:left -308px;}");
    dialogAllCSS.push(".cash_dialog_confirm_icon_ok{background-position:left -332px;}");
    dialogAllCSS.push(".cash_dialog_confirm_icon_alt{width:18px;height:10px;font-size:0;line-height:0;position:relative;display:inline-block;*display:inline;*zoom:1;}");
    dialogAllCSS.push(".cash_dialog_confirm_icon_alt i{background-image:url('http://", INFO.isp, "qzonestyle.gtimg.cn/open/fusion/img/sprite.png?max_age=31104000&v=3');background-repeat:no-repeat;width:15px;height:15px;display:block;position:absolute;}");
    dialogAllCSS.push(".cash_dialog_confirm_icon_alt_error i{background-position:left -356px;}");
    dialogAllCSS.push(".cash_dialog_confirm_icon_alt_warn i{background-position:left -371px;}");
    dialogAllCSS.push(".cash_dialog_confirm_icon_alt_ok i{background-position:-15px -356px;}");
    dialogAllCSS.push(".cash_dialog_confirm_icon_alt_none{display:none;}");
    CSSManager.DIALOG = dialogAllCSS.join("");
    CSSManager.insertDialog = function () {
        LIB.insertStyle(CSSManager.DIALOG);
        CSSManager.insertDialog = function () {
        }
    };
    var JSON = thisAPI.JSON = {}, ae = {}, D = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, m = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, aS = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function strFormat(src, outputLength, completion) {
        outputLength = outputLength || 2;
        completion = completion || "0";
        var aW = [];
        aW[outputLength] = src;
        return aW.join(completion).slice(-outputLength)
    }

    function capitalize(words) {
        words += "";
        return words.substr(0, 1).toUpperCase() + words.substr(1).toLowerCase()
    }

    function aR(aX) {
        var aW = Object.prototype.toString.call(aX);
        if (aX === null || aX instanceof String || aX instanceof Number || aX instanceof Boolean || aX instanceof Date || ({"[object String]": 1, "[object Number]": 1, "[object Boolean]": 1, "[object Date]": 1})[aW]) {
            return aX
        }
        if (aX === void 0) {
            return void 0
        }
        if (aX === window) {
            return"[object DOMWindow]"
        }
        if (aX === document) {
            return"[object HTMLDocument]"
        }
        if (typeof aX.constructor !== "function") {
            return aX && typeof aX.tagName === "string" ? "[object HTML" + capitalize(aX.tagName) + "Element]" : void 0
        }
        if (!({"[object Object]": 1, "[object Array]": 1})[aW]) {
            return aW
        }
        if (ae[aX.__CASH_JSON_HASH] === aX) {
            return void 0
        }
        var aY = LIB.getIntRandom();
        while (ae[aY]) {
            aY = LIB.getIntRandom()
        }
        ae[aX.__CASH_JSON_HASH = aY] = aX;
        return aX
    }

    function aI(aW) {
        D.lastIndex = 0;
        return'"' + (D.test(aW) ? aW.replace(D, function (aX) {
            var aY = m[aX];
            return typeof aY === "string" ? aY : ("\\u" + strFormat(aX.charCodeAt(0).toString(16), 4))
        }) : aW) + '"'
    }

    function ac(a3) {
        a3 = aR(a3);
        var aZ = Object.prototype.toString.call(a3);
        if (a3 === void 0) {
            return void 0
        } else if (a3 === null || a3 instanceof Boolean || aZ === "[object Boolean]") {
            return String(a3)
        } else if (a3 instanceof String || aZ === "[object String]") {
            return aI(a3)
        } else if (a3 instanceof Number || aZ === "[object Number]") {
            return isFinite(a3) ? String(a3) : "null"
        } else if (a3 instanceof Date || aZ === "[object Date]") {
            return isFinite(a3.valueOf()) ? aI(a3.getUTCFullYear() + "-" + strFormat(a3.getUTCMonth() + 1) + "-" + strFormat(a3.getUTCDate()) + "Observer" + strFormat(a3.getUTCHours()) + ":" + strFormat(a3.getUTCMinutes()) + ":" + strFormat(a3.getUTCSeconds()) + "." + strFormat(a3.getUTCMilliseconds(), 3) + "Z") : "null"
        } else if (a3 instanceof Array || aZ === "[object Array]") {
            var a1 = [];
            for (var a0 = 0, aW = a3.length; a0 < aW; a0++) {
                a1[a0] = ac(a3[a0]) || "null"
            }
            delete ae[a3.__CASH_JSON_HASH];
            delete a3.__CASH_JSON_HASH;
            return"[" + a1.join(",") + "]"
        } else if (!a3) {
            return"null"
        } else {
            var a2, a1 = [], aY = Object.hasOwnProperty;
            for (var aX in a3) {
                aX != "__CASH_JSON_HASH" && aY.call(a3, aX) && (a2 = ac(a3[aX])) && a1.push(aI(aX) + ":" + a2)
            }
            delete ae[a3.__CASH_JSON_HASH];
            delete a3.__CASH_JSON_HASH;
            return"{" + a1.join(",") + "}"
        }
    }

    JSON.stringify = function (aW) {
        var aX = ac(aW);
        return aX
    };
    JSON.parse = function (aX) {
        aX = String(aX);
        if (aX) {
            aS.lastIndex = 0;
            aS.test(aX) && (aX = aX.replace(aS, function (aY) {
                return"\\u" + strFormat(aY.charCodeAt(0).toString(16), 4)
            }));
            if (/^[\],:{}\s]*$/.test(aX.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                try {
                    return new Function("return " + aX)()
                } catch (aW) {
                    return eval("(" + aX + ")")
                }
            }
        }
        throw new SyntaxError("JSON.parse")
    };
    if (/(?:^|\.)qq\.com$/.test(location.hostname)) {
        document.domain != "qq.com" && (document.domain = "qq.com")
    } else if (/(?:^|\.)pengyou\.com$/.test(location.hostname)) {
        document.domain != "pengyou.com" && (document.domain = "pengyou.com")
    }
    var messageHandles = {}, msgChannelID = "__CashXStream_", supportPostMessage = (function () {
        if (window.postMessage) {
            try {
                if (window.postMessage.toString().indexOf("[native code]") >= 0) {
                    return true
                } else {
                    LIB.err('The native "postMessage" function of browsers seems to have been overridden, DO NOT override it, or this API will not work properly!')
                }
            } catch (e) {
                return true
            }
        }
        return false
    })();

    function onMessage(aZ, aY) {
        if (aZ.indexOf(msgChannelID) != 0) {
            return
        }
        aZ = aZ.substring(msgChannelID.length);
        var a0 = JSON.parse(aZ);
        var aW = a0.port, aX;
        if (!(aX = messageHandles[aW])) {
            return
        }
        aX._handle(a0, aY, aZ)
    }

    if (supportPostMessage) {
        LIB.attachEvent(window, "message", function (aW) {
            onMessage(aW.data, aW.source)
        })
    }
    var XStream = LIB.XStream = function (aY, aX, aZ) {
        var aW;
        if (aW = messageHandles[aX]) {
            return aW
        }
        messageHandles[aX] = this;
        this.handler = aY;
        this.targetPort = aX;
        this.target = aZ;
        this.closed = false;
        this.onInit = new Observer(this);
        this._pool = [];
        !supportPostMessage && !navigator[msgChannelID + XStream.channel + XStream.localPort] && (navigator[msgChannelID + XStream.channel + XStream.localPort] = onMessage)
    };
    XStream.channel = 0;
    XStream.localPort = "";
    XStream.prototype._sendRaw = function (aX) {
        try {
            if (supportPostMessage) {
                this.target.postMessage(aX, "*")
            } else {
                var aY = navigator[msgChannelID + XStream.channel + this.targetPort];
                typeof aY == "function" && aY(aX, window)
            }
        } catch (aW) {
            LIB.warn("XStream sending error: ", aW)
        }
    };
    XStream.prototype._handle = function (aX, aW, aY) {
        if (aX.init) {
            this.target = aW;
            this.closed = false;
            this.onInit.notify();
            while (this._pool.length) {
                this._sendRaw(this._pool.shift())
            }
        } else if (!this.closed) {
            typeof this.handler == "function" && this.handler.call(this, aX.data, this.targetPort)
        }
    };
    XStream.prototype.init = function () {
        if (!this.target) {
            return
        }
        var aW = {port: XStream.localPort, init: 1}, aX = JSON.stringify(aW);
        LIB.log("XStream initializing from [" + location.hostname + "][" + location.pathname + "]: " + aX, aW);
        aX = msgChannelID + aX;
        this._sendRaw(aX);
        this.onInit.notify()
    };
    XStream.prototype.send = function (aY) {
        if (this.closed || !aY) {
            return
        }
        var aW = {port: XStream.localPort, data: aY}, aX = JSON.stringify(aW);
        LIB.log("XStream sent from [" + location.hostname + "][" + location.pathname + "]: " + aX, aW);
        aX = msgChannelID + aX;
        !this.target ? this._pool.push(aX) : this._sendRaw(aX)
    };
    XStream.prototype.close = function () {
        this.closed = true;
        delete messageHandles[this.targetPort]
    };
    XStream.channel = LIB.getIntRandom();
    XStream.localPort = "lib";
    var OnceCall = LIB.OnceCall = function (timeout, options, autoStart) {
        this._timeout = timeout;
        this._timer = 0;
        options = options || {};
        this.onConsume = options.onConsume;
        this.onReject = options.onReject;
        this.onTimeout = options.onTimeout;
        this.hasCalled = false;
        autoStart && this.start()
    };
    OnceCall.prototype._call = function (func) {
        if (!this.hasCalled) {
            this.hasCalled = true;
            this._timer && LIB.clearTimeout(this._timer);
            this._timer = 0;
            typeof func == "function" && func.call(this)
        }
    };
    OnceCall.prototype.start = function () {
        if (this._timeout >= 0) {
            this._timer = LIB.setTimeout(this.timeout, this._timeout, this)
        }
    };
    OnceCall.prototype.consume = function () {
        this._call(this.onConsume)
    };
    OnceCall.prototype.reject = function () {
        this._call(this.onReject)
    };
    OnceCall.prototype.timeout = function () {
        this._timer = 0;
        this._call(this.onTimeout)
    };
    var _dialogInstance = {}, dialogIndex = 1, dialogZIndex = 5000, dialogQueue = [];
    var Dialog = LIB.Dialog = function (options) {
        this.opt = options = options || {};
        this.timestamp = options.timestamp || new Date().getTime();
        var dialogID = this.id = "dialog_" + (dialogIndex++);
        _dialogInstance[dialogID] = this;
        dialogQueue.unshift(this);
        var type = this.type = options.confirm ? "confirm" : options.src ? "frame" : "normal", size = this.size = options.size || {};
        size.w = size.w || (this.type == "confirm" ? 300 : 400);
        size.h = size.h || (this.type == "confirm" ? 140 : 300);
        this.sizeDialog = Dialog.getDialogSizeByContentSize(size, options);
        this.pos = options.pos || {};
        this._submitted = false;
        this._context = options.context;
        var dialogBody = this.dialogBody = document.createElement("div"), targetNode = this.targetNode = options.targetNode, quiet = this.quiet = !!options.quiet;
        dialogBody.className = options.hideBorder ? quiet ? "cash_dialog_wrap_no_border_noani" : (targetNode ? "cash_dialog_wrap_no_border_no_position" : "cash_dialog_wrap_no_border") : quiet ? "cash_dialog_wrap_noani" : "cash_dialog_wrap";
        this.zIndex = options.zIndex || dialogZIndex++;
        LIB.attachEvent(dialogBody, "mousedown", this.setForeground, {self: this});
        if (!options.hideHeader) {
            var dialogHeader = this.dialogHeader = document.createElement("div");
            dialogHeader.className = "cash_dialog_header";
            if (!options.preventDragging) {
                dialogHeader.style.cursor = "move";
                this._dragInfo = null;
                LIB.attachEvent(dialogHeader, "mousedown", this._dragStart, {self: this})
            }
            if (options.targetNode) {
                dialogHeader.style.width = size.w + "px";
            }
            var dialogController = dialogHeader;
            if (document.compatMode == "BackCompat" && LIB.ua.ie <= 8) {
                var bg = document.createElement("div");
                bg.style.cssText = "position:absolute;width:100%;height:100%;left:0;top:0;";
                dialogHeader.appendChild(bg);
                dialogController = bg
            }
            var dialogTitle = this.dialogTitle = document.createElement("h3");
            dialogTitle.innerHTML = options.title || "";
            dialogController.appendChild(dialogTitle);
            if (!options.hideCloseButton) {
                var dialogCloseButton = this.dialogCloseButton = document.createElement("button");
                dialogCloseButton.title = "关闭";
                dialogController.appendChild(dialogCloseButton);
                LIB.attachEvent(dialogCloseButton, "click", function () {
                    this.close()
                }, {self: this})
            }
            dialogBody.appendChild(dialogHeader)
        }
        var dialogContent = this.dialogContent = document.createElement("div");
        dialogContent.className = "cash_dialog_content";
        dialogContent.style.height = size.h + "px";
        if (type == "confirm") {
            var confirmOptions = options.confirm;
            dialogContent.innerHTML = ['<div class="cash_dialog_confirm_content"><i class="cash_dialog_confirm_icon ', ({1: "cash_dialog_confirm_icon_request", 2: "cash_dialog_confirm_icon_error", 3: "cash_dialog_confirm_icon_warn", 4: "cash_dialog_confirm_icon_ok"})[confirmOptions.icon] || "cash_dialog_confirm_icon_request", '"></i><h3>', confirmOptions.content || "", '</h3><div class="cash_dialog_confirm_content_p">', confirmOptions.desc || "", '</div><div class="cash_dialog_confirm_content_p"><i class="cash_dialog_confirm_icon_alt ', ({1: "cash_dialog_confirm_icon_alt_error", 2: "cash_dialog_confirm_icon_alt_warn", 3: "cash_dialog_confirm_icon_alt_ok"})[confirmOptions.iconAlt] || "cash_dialog_confirm_icon_alt_none", '"><i></i></i>', confirmOptions.contentAlt || "", "</div></div>"].join("")
        } else if (type == "frame") {
            var bodyWrapper = options.wrapper || '', urlExtParams = ["v=", VER.dialog, "&_fd_id=", dialogID, "&_fd_c=", XStream.channel, "&_fd_size=", size.w, "|", size.h, "&_fd_w=", bodyWrapper];
            quiet && urlExtParams.push("&quiet=1");
            if (options.methods) {
                var methods = this.methods = options.methods;
                var methodNameList = [], method;
                for (var methodName in methods) {
                    if (methodName in this) {
                        continue
                    }
                    method = methods[methodName];
                    if (!method || typeof method == "function") {
                        method = methods[methodName] = {method: method}
                    }
                    methodNameList.push(methodName);
                    this[methodName] = (function (bt, bs) {
                        return function (bu) {
                            typeof bs.method == "function" && bs.method.call(this, bu);
                            this._send(bt, bu);
                            var bv = bs.ret;
                            bv && this._flag && LIB.valueStat(this._flag, bv >= 0 ? 1 : 2, Math.abs(bv), {rate: LIB.timeBasedRate(bs.rate || 0)})
                        }
                    })(methodName, method)
                }
                urlExtParams.push("&_fd_ms=", methodNameList.join("|"))
            }
            var dialogSrc = options.src;
            dialogSrc = [dialogSrc, (dialogSrc.indexOf("?") >= 0 ? "&" : "?"), "cash_param=", encodeURIComponent(urlExtParams.join(""))].join("");
            var dialogFrame = this.dialogFrame = document.createElement("iframe");
            dialogFrame.className = "cash_dialog_frame";
            dialogFrame.style.cssText = ["width:", size.w, "px;height:", size.h, "px;", "background:transparent;", "overflow-x:hidden;"].join("");
            dialogFrame.frameBorder = "no";
            dialogFrame.scrolling = "auto";
            dialogFrame.allowTransparency = "true";
            dialogFrame.src = dialogSrc;
            dialogContent.appendChild(dialogFrame);
            this._stream = new XStream(_dialogHandler, dialogID)
        } else {
            dialogContent.innerHTML = options.content || ""
        }
        dialogBody.appendChild(dialogContent);
        this.dialogBorder = document.createElement("div");
        this.dialogBorder.className = "cash_dialog_border";
        dialogBody.appendChild(this.dialogBorder);
        if (options.buttons && options.buttons.length) {
            var dialogFooter = this.dialogFooter = document.createElement("div");
            dialogFooter.className = "cash_dialog_footer";
            var dialogFooterHTML = [];
            for (var idx = 0, button; button = options.buttons[idx]; idx++) {
                button.type = button.type || Dialog.BUTTON_TYPE.NORMAL;
                button.text = button.text || ({1: "按钮", 2: "确定", 3: "取消"})[button.type];
                button.tip = button.tip || "";
                button.disabled = !!button.disabled;
                dialogFooterHTML.push('<a _index="', idx + 1, '" title="', button.tip, '" class="cash_dialog_button_', button.type == 2 ? (button.disabled ? "submit_disabled" : "submit") : (button.disabled ? "disabled" : "normal"), '" href="javascript:void(0);" onclick="return false;">', button.text, "</a>")
            }
            dialogFooter.innerHTML = dialogFooterHTML.join("");
            LIB.attachEvent(dialogFooter, "click", function (e) {
                var index, button, srcElement = e.target || e.srcElement;
                while (srcElement && srcElement != dialogFooter) {
                    if (index = +srcElement.getAttribute("_index")) {
                        break
                    }
                    srcElement = srcElement.parentNode
                }
                if (index && (button = options.buttons[index - 1])) {
                    if (button.disabled) {
                        return
                    }
                    if (typeof button.onClick == "function" && button.onClick.call(this, this) === false) {
                        return
                    }
                    button.methodKey && typeof this[button.methodKey] == "function" ? this[button.methodKey].call(this, button.methodArgs) : button.type == Dialog.BUTTON_TYPE.SUBMIT ? this.submit() : button.type == Dialog.BUTTON_TYPE.CANCEL && this.close()
                }
            }, {self: this});
            dialogBody.appendChild(dialogFooter)
        }
        var bb = this.dialogMask = document.createElement("iframe");
        bb.className = quiet ? "cash_dialog_mask_noani" : "cash_dialog_mask";
        bb.frameBorder = "no";
        bb.scrolling = "no";
        bb.src = "about:blank";
        this._render()
    };
    Dialog.construct = function (userOptions, options, dialogID) {
        userOptions = userOptions || {};
        var allowOptionList = "timestamp,pos,size,zIndex,quiet,context,onLoad,onFrameLoad,onShown,onSubmit,onNotify,onSuccess,onError,onCancel,onClose".split(",");
        for (var idx = 0, name; name = allowOptionList[idx]; idx++) {
            options[name] = userOptions[name] || options[name]
        }
        return new Dialog(options, dialogID)
    };
    Dialog.BUTTON_TYPE = {NORMAL: 1, SUBMIT: 2, CANCEL: 3};
    Dialog.ICON_TYPE = {REQUEST: 1, ERROR: 2, WARN: 3, OK: 4};
    Dialog.ICON_ALT_TYPE = {ERROR: 1, WARN: 2, OK: 3};
    Dialog.getDialogSizeByContentSize = function (size, options) {
        size = size || {};
        options = options || {};
        return{w: size.w + (options.hideBorder ? 0 : 20), h: size.h + (options.hideBorder ? 0 : 20) + (options.hideHeader ? 0 : 29) + (options.buttons && options.buttons.length ? 35 : 0)}
    };
    Dialog.fitPos = function (pos, size, isNotCenter) {
        var clientRect = CAV._getClientRect();
        !pos.x && (pos.x = Math.round((clientRect.right + clientRect.left - size.w) / 2));
        !pos.y && (pos.y = Math.round((clientRect.bottom + clientRect.top - size.h) / 2));
        if (!isNotCenter) {
            pos.x = Math.min(clientRect.right - size.w - 5, Math.max(clientRect.left - size.w + 60, pos.x)) + 4;
            pos.y = Math.max(clientRect.top + 5, Math.min(clientRect.bottom - 30, pos.y)) - 5;
        }
    };
    Dialog.prototype._render = function () {
        var _this = this;
        CAV._ready.onReady(function () {
            CSSManager.insertDialog();
            var pos = _this.pos, sizeDialog = _this.sizeDialog, dialogBody = _this.dialogBody, dialogMask = _this.dialogMask, dialogBorder = _this.dialogBorder, targetNode = _this.targetNode;
            if (typeof pos.x === 'undefined' && typeof pos.y === 'undefined') {
                Dialog.fitPos(pos, sizeDialog);
            }
            if (_this.quiet) {
                dialogBody.style.cssText = ["visibility:hidden;left:-1000px;top:-1000px;width:", sizeDialog.w, "px;z-index:", _this.zIndex, ";"].join("");
                dialogMask.style.cssText = ["visibility:hidden;left:-1000px;top:-1000px;width:", sizeDialog.w, "px;height:", sizeDialog.h, "px;"].join("");
                dialogBorder.style.cssText = ["visibility:hidden;left:0px;top:0px;width:", sizeDialog.w, "px;height:", sizeDialog.h, "px;"].join("");
            } else {
                dialogBody.style.cssText = (targetNode) ? "" : ["left:", pos.x, "px;top:", pos.y, "px;width:", sizeDialog.w, "px;z-index:", _this.zIndex, ";"].join("");
                dialogMask.style.cssText = (targetNode) ? "display:none;" : ["left:", pos.x, "px;top:", pos.y, "px;width:", sizeDialog.w, "px;height:", sizeDialog.h, "px;"].join("");
                dialogBorder.style.cssText = ["left:0", "px;top:0", "px;width:", sizeDialog.w, "px;height:", sizeDialog.h, "px;"].join("");
            }
            if (targetNode) {
                targetNode.insertBefore(dialogBody, targetNode.firstChild);
                targetNode.insertBefore(dialogMask, dialogBody);
            } else {
                document.body.insertBefore(dialogBody, document.body.firstChild);
                document.body.insertBefore(dialogMask, dialogBody);
            }
            try {
                typeof _this.opt.onLoad == "function" && _this.opt.onLoad.call(_this, {context: _this.opt.context})
            } catch (e) {
            }
        })
    };
    Dialog.prototype.resize = function (rect, isNotCenter) {
        if (!rect) {
            return
        }
        rect.w = +rect.w;
        rect.h = +rect.h;
        rect.x = +rect.x;
        rect.y = +rect.y;
        var size = this.size, pos = this.pos;
        pos.x = rect.x ? rect.x : rect.w ? (pos.x + Math.round((size.w - rect.w) / 2)) : pos.x;
        pos.y = rect.y ? rect.y : rect.h ? (pos.y + Math.round((size.h - rect.h) / 2)) : pos.y;
        size.w = rect.w || size.w;
        size.h = rect.h || size.h;
        var sizeDialog = this.sizeDialog = Dialog.getDialogSizeByContentSize(size, this.opt);
        Dialog.fitPos(pos, sizeDialog, isNotCenter);
        var dialogBody = this.dialogBody, dialogMask = this.dialogMask, targetNode = this.targetNode;
        dialogBody.style.left = targetNode ? 0 : pos.x + "px";
        dialogBody.style.top = targetNode ? 0 : pos.y + "px";
        if (!targetNode) {
            dialogBody.style.width = sizeDialog.w + "px";
        }
        this.dialogContent && (this.dialogContent.style.height = size.h + "px");
        if (this.dialogFrame) {
            this.dialogFrame.style.cssText = ["width:", size.w, "px;height:", size.h, "px;"].join("");
        }
        dialogMask.style.left = pos.x + "px";
        dialogMask.style.top = pos.y + "px";
        dialogMask.style.width = sizeDialog.w + "px";
        dialogMask.style.height = sizeDialog.h + "px"
    };
    Dialog.prototype.enableSubmit = function () {
        if (!this.dialogFooter) {
            return
        }
        var aY = this.dialogFooter.children;
        for (var aX = 0, aW; aW = this.opt.buttons[aX]; aX++) {
            if (aW.type == Dialog.BUTTON_TYPE.SUBMIT && aW.disabled) {
                aW.disabled = false;
                aY[aX].className = "cash_dialog_button_submit"
            }
        }
    };
    Dialog.prototype.disableSubmit = function () {
        if (!this.dialogFooter) {
            return
        }
        var aY = this.dialogFooter.children;
        for (var aX = 0, aW; aW = this.opt.buttons[aX]; aX++) {
            if (aW.type == Dialog.BUTTON_TYPE.SUBMIT && !aW.disabled) {
                aW.disabled = true;
                aY[aX].className = "cash_dialog_button_submit_disabled"
            }
        }
    };
    Dialog.prototype.submit = function () {
        if (!this.quiet) {
            this.disableSubmit();
            if (typeof this.opt.onSubmit == "function") {
                var aX;
                try {
                    aX = this.opt.onSubmit.call(this, {context: this.opt.context})
                } catch (aW) {
                }
                aX !== false && (this.type == "frame" ? this._send("submit") : this.succeed())
            } else {
                this.type == "frame" ? this._send("submit") : this.succeed()
            }
        }
    };
    Dialog.prototype.succeed = function (aY) {
        aY = aY || {};
        var aW = aY.timestamp ? new Date().getTime() - aY.timestamp : 0;
        aY.context = this.opt.context;
        this._submitted = true;
        try {
            typeof this.opt.onSuccess == "function" && this.opt.onSuccess.call(this, aY)
        } catch (aX) {
        }
        this.quiet ? this.quit() : this.type == "confirm" ? this.close() : this.enableSubmit();
        this._flag && LIB.valueStat(this._flag, 1, 21, {rate: LIB.timeBasedRate(this._rates.succeed || 0), duration: aW})
    };
    Dialog.prototype.show = function (aY) {
        aY = aY || {};
        var aW = aY.timestamp ? new Date().getTime() - aY.timestamp : 0;
        if (this.quiet) {
            this.resize(aY);
            var dialogBody = this.dialogBody, dialogMask = this.dialogMask, hideBorder = this.opt.hideBorder;
            dialogBody.style.visibility = "visible";
            dialogMask.style.visibility = "visible";
            LIB.setTimeout(function () {
                dialogBody.className = hideBorder ? "cash_dialog_wrap_no_border" : "cash_dialog_wrap";
                dialogMask.className = "cash_dialog_mask"
            }, 0, this);
            this.quiet = false;
            try {
                typeof this.opt.onShown == "function" && this.opt.onShown.call(this, {context: this.opt.context})
            } catch (aX) {
            }
        }
        this._flag && LIB.valueStat(this._flag, 1, 23, {rate: LIB.timeBasedRate(this._rates.show || 0), duration: aW})
    };
    Dialog.prototype.error = function (aY) {
        aY = aY || {};
        var aW = aY.timestamp ? new Date().getTime() - aY.timestamp : 0;
        aY.context = this.opt.context;
        if (this.quiet) {
            try {
                typeof this.opt.onError == "function" ? this.opt.onError.call(this, aY) : aY.msg && aw.show(3, aY.msg, 3000)
            } catch (aX) {
            }
            this.quit()
        } else {
            this.enableSubmit();
            try {
                typeof this.opt.onError == "function" && this.opt.onError.call(this, aY)
            } catch (aX) {
            }
        }
        this._flag && LIB.valueStat(this._flag, 2, 22, {rate: LIB.timeBasedRate(this._rates.error || 0), duration: aW})
    };
    Dialog.prototype.close = function (aY) {
        !aY && this._send("close");
        aY = aY || {};
        var aW = aY.timestamp ? new Date().getTime() - aY.timestamp : 0;
        aY.context = this.opt.context;
        if (this.quiet) {
            this.quit()
        } else {
            try {
                !this._submitted && typeof this.opt.onCancel == "function" && this.opt.onCancel.call(this, aY)
            } catch (aX) {
            }
            try {
                typeof this.opt.onClose == "function" && this.opt.onClose.call(this, aY)
            } catch (aX) {
            }
            this.quit()
        }
        this._flag && LIB.valueStat(this._flag, 1, 24, {rate: LIB.timeBasedRate(this._rates.close || 0), duration: aW})
    };
    Dialog.prototype.setForeground = function () {
        if (dialogQueue[0] == this || !_dialogInstance[this.id]) {
            return
        }
        var aY = [this];
        for (var aX = 0, aW; aW = dialogQueue[aX]; aX++) {
            aW != this && aY.push(aW)
        }
        dialogQueue = aY;
        if (dialogZIndex >= 8000) {
            dialogZIndex = 5000;
            for (var aX = dialogQueue.length - 1; aX >= 0; aX--) {
                dialogQueue[aX].zIndex = dialogZIndex++;
                dialogQueue[aX].dialogBody.style.zIndex = dialogQueue[aX].zIndex
            }
        } else {
            this.zIndex = dialogZIndex++;
            this.dialogBody.style.zIndex = this.zIndex
        }
    };
    Dialog.prototype.quit = function () {
        LIB.detachEvent(this.dialogBody, "click");
        this.dialogHeader && LIB.detachEvent(this.dialogHeader, "mousedown");
        this.dialogCloseButton && LIB.detachEvent(this.dialogCloseButton, "click");
        this.dialogFooter && LIB.detachEvent(this.dialogFooter, "click");
        this.dialogBody.className = this.opt.hideBorder ? "cash_dialog_wrap_no_border_noani" : "cash_dialog_wrap_noani";
        this.dialogBody.style.visibility = "hidden";
        this.dialogBody.style.left = "-1000px";
        this.dialogBody.style.top = "-1000px";
        this.dialogMask.parentNode.removeChild(this.dialogMask);
        var queue = [];
        for (var aX = 0, aW; aW = dialogQueue[aX]; aX++) {
            aW != this && queue.push(aW)
        }
        dialogQueue = queue;
        if (queue.length == 0) {
            dialogZIndex = 5000
        }
        delete _dialogInstance[this.id];
        this._stream && this._stream.close();
        LIB.setTimeout(function () {
            this.dialogContent.innerHTML = "";
            this.dialogContent = null;
            this.dialogBody.parentNode.removeChild(this.dialogBody);
        }, 2000, this)
    };
    Dialog.prototype._dragStart = function (aW) {
        var srcElement = aW.target || aW.srcElement;
        if (srcElement == this.dialogCloseButton) {
            return
        }
        if (this._dragInfo) {
            return
        }
        this.dialogBody.className = this.opt.hideBorder ? "cash_dialog_wrap_no_border_noani" : "cash_dialog_wrap_noani";
        this.dialogMask.className = "cash_dialog_mask_noani";
        var aX = document.createElement("div");
        this.dialogContent && this.dialogContent.appendChild(aX);
        aX.className = "cash_dialog_content_mask";
        this._dragInfo = {x: this.pos.x - aW.clientX, y: this.pos.y - aW.clientY, mask: aX};
        this.dialogHeader && this.dialogHeader.setCapture ? this.dialogHeader.setCapture() : window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        LIB.attachEvent(document.documentElement, "mousemove", this._drag, {self: this});
        LIB.attachEvent(document.documentElement, "mouseup", this._dragEnd, {self: this});
        aW.preventDefault ? aW.preventDefault() : (aW.returnValue = false)
    };
    Dialog.prototype._drag = function (aW) {
        if (!this._dragInfo) {
            return
        }
        var aX = CAV._getClientRect(), aY = LIB.getScrollLeft(), aZ = LIB.getScrollTop();
        this.resize({x: this._dragInfo.x + Math.min(aX.right - aY, Math.max(aX.left - aY, aW.clientX)), y: this._dragInfo.y + Math.min(aX.bottom - aZ, Math.max(aX.top - aZ, aW.clientY))}, true);
        aW.preventDefault ? aW.preventDefault() : (aW.returnValue = false)
    };
    Dialog.prototype._dragEnd = function (aW) {
        if (!this._dragInfo) {
            return
        }
        LIB.detachEvent(document.documentElement, "mousemove", this._drag);
        LIB.detachEvent(document.documentElement, "mouseup", this._dragEnd);
        this.dialogHeader && this.dialogHeader.releaseCapture ? this.dialogHeader.releaseCapture() : window.releaseEvents && window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        this.dialogContent && this.dialogContent.removeChild(this._dragInfo.mask);
        this._dragInfo = null;
        this.dialogBody.className = this.opt.hideBorder ? "cash_dialog_wrap_no_border" : "cash_dialog_wrap";
        this.dialogMask.className = "cash_dialog_mask";
        aW.preventDefault ? aW.preventDefault() : (aW.returnValue = false)
    };
    Dialog.prototype._send = function (aX, aW) {
        if (!this._stream) {
            return
        }
        DLG._call(this._stream, aX, aW)
    };
    Dialog.prototype._handleRemote = function (key, args) {
        var _ts = new Date().getTime() - args.timestamp, _opt = this.opt, _method, _ret;
        switch (key) {
            case"load":
                if (args) {
                    this.quiet = args.quiet
                }
                try {
                    typeof _opt.onFrameLoad == "function" && _opt.onFrameLoad.call(this, {context: _opt.context})
                } catch (aX) {
                }
                break;
            case"notify":
                try {
                    typeof _opt.onNotify == "function" && _opt.onNotify.call(this, args)
                } catch (aX) {
                }
                break;
            case"succeed":
            case"error":
            case"show":
            case"close":
            case"resize":
            case"enableSubmit":
            case"disableSubmit":
            case"setForeground":
                this[key].call(this, args);
                break;
            default:
                if (_opt.methods && (_method = _opt.methods[key])) {
                    typeof _method.method == "function" && _method.method.call(this, args);
                    (_ret = _method.ret) && this._flag && LIB.valueStat(this._flag, _ret >= 0 ? 1 : 2, Math.abs(_ret), {rate: LIB.timeBasedRate(_method.rate || 0), duration: _ts})
                } else {
                    LIB.warn("Invalid method from Remote: " + key)
                }
                return
        }
    };
    function _dialogHandler(args, port) {
        var _instance = _dialogInstance[port];
        _instance && DLG._handle(_instance._stream, args) && _instance._handleRemote(args.key, args.args)
    }

    thisAPI.dialog = {};
    var _map = {pay: 'index', minipay: 'mini', frame: 'iframe', app: 'mini', recharge: 'Q币充值', service: '包月开通', game: '游戏充值'}, option2UrlParamMap = {};

    function parseOption2UrlParam() {
    }

    thisAPI.dialog.buy = function (opts) {
        if (!opts || !opts.codes) {
            return null;
        }
        if (!opts.aid) {
            alert('minipay的统计字段aid似乎没有指定');
            return null;
        }
        if (!opts.multi && dialogQueue.length >= 1) {
            return null;
        }
        var codes = opts.codes = opts.codes || 'qqacct_save';
        if (codes.indexOf('xxzxgp') > -1 && codes.indexOf('xxzxgj') > -1) {
            opts.codes = codes.replace(/,xxzxgp|xxzxgp,|xxzxgp/, '');
        }
        var _src_name = _map[opts.scene || 'minipay'] || 'minipay', _channels = opts.soc ? '!' + opts.soc : (opts.type === 'recharge' ? 'qqcard,kj' : 'qdqb,kj'), _src_arr = ['http://pay.qq.com/ipay/' + _src_name + '.shtml?s=' + (_src_name === 'mini' ? 'minipay' : ''), '&ch=' + (opts.channels || _channels), '&c=' + opts.codes, opts.defaultChannel ? '&dc=' + opts.defaultChannel : '', opts.amount ? '&n=' + opts.amount : '', opts.target ? '&u=' + opts.target : '', opts.amountType ? '&nt=' + opts.amountType : '', opts.disallowSend ? '&ds=1' : '', opts.actid ? '&actid=' + opts.actid : '', opts.price ? '&price=' + opts.price : '', opts.appid ? '&appid=' + opts.appid : '', opts.token ? '&token=' + opts.token : '', opts.openid ? '&openid=' + opts.openid : '', opts.version ? '&version=' + opts.version : '', opts.source ? '&p=' + opts.source : '', opts.zoneid ? '&zoneid=' + opts.zoneid : '', opts.rolename ? '&rolename=' + opts.rolename : '', opts.skin ? '&skin=' + opts.skin : '', opts.autopay === false ? '&autopay=0' : '', opts.hideCloseButton ? '&hcb=1' : '', opts.hideLeftSidebar ? '&hl=1' : '', opts.period ? '&period=1' : '', opts.debug ? '&debug=1' : '', opts.aid ? '&aid=' + opts.aid : ''];
        if (_src_name === 'iframe') {
            opts.pre_node && (function () {
                opts.pre_node.style.width = '990px';
                opts.pre_node.style.height = '580px';
            })();
            var _dlg_iframe = thisAPI.LIB.Dialog.construct(opts, {targetNode: opts.pre_node, title: '', src: _src_arr.join(''), hideBorder: true, hideHeader: true, size: {w: 990, h: 580}, methods: {foot2: function (args) {
                args = args || {h: 580};
                this.targetNode ? this.targetNode.style.height = args.h + 'px' : 0;
            }, foot3: function (args) {
                args = args || {h: 580};
                this.targetNode ? this.targetNode.style.height = args.h + 'px' : 0;
                try {
                    ('function' === typeof this.opt.onHeight) && this.opt.onHeight(args);
                } catch (e) {
                }
            }}}, 'dialog.buy');
            _dlg_iframe.dialogFrame.scrolling = 'no';
            return _dlg_iframe;
        } else {
            var _dlg = thisAPI.LIB.Dialog.construct(opts, {targetNode: opts.targetNode, wrapper: 'left_sidebar', title: (_map[opts.type || 'recharge'] || 'Q币充值') + ((thisAPI.LIB.cookie.get('uin') && thisAPI.LIB.cookie.get('skey')) ? '（' + thisAPI.LIB.cookie.get('uin').substr(1) * 1 + '）' : ''), src: _src_arr.join(''), size: {w: opts.width || 575, h: opts.height || 456}, hideBorder: opts.hideBorder || false, hideHeader: opts.hideHeader || false, preventDragging: opts.preventDragging || false, hideCloseButton: opts.hideCloseButton || false, methods: {modifyTitle: function (args) {
                args && _dlg.dialogTitle && (_dlg.dialogTitle.innerHTML = args);
            }}}, 'dialog.buy');
            return _dlg;
        }
    };
    thisAPI.gray = function (opts) {
        if (!opts || !opts.uin) {
            return null;
        }
        var _gray_uin = opts.uin.split(','), _uin = thisAPI.LIB.cookie.get('uin'), _last_uin = _uin.substr(_uin.length - 2, 1), _rr = Math.random();
        thisAPI.LIB.report(['http://upayportal.qq.com/cgi-bin/action_report.fcg?ch=self', 'uin=' + _uin.substr(1) * 1, 'action=' + opts.source + '_' + opts.type + '.pv', 'aid=' + (opts.aid || ''), 'service=' + (opts.type === 'game' ? '-' + opts.codes : opts.codes), 'sessionid=' + (_uin + _rr), 'rr=' + _rr].join('&'));
        if (!opts.qqnumber && !thisAPI.LIB.cookie.get('skey')) {
            try {
                ('function' == typeof opts.cb) && opts.cb(-1);
            } catch (e) {
                thisAPI.LIB.err(e);
            }
        } else if (_gray_uin.length <= 0) {
            return thisAPI.dialog.buy(opts);
        } else {
            try {
                !!opts.qqnumber && (function () {
                    opts.qqnumber = opts.qqnumber.toString();
                    _last_uin = opts.qqnumber.substr(opts.qqnumber.length - 2, 1);
                })();
                if (opts.uin.indexOf(_last_uin) > -1) {
                    return thisAPI.dialog.buy(opts);
                } else {
                    ('function' == typeof opts.cb) && opts.cb(0);
                }
            } catch (e) {
                thisAPI.LIB.err(e);
            }
        }
    };
})();
/*  |xGv00|b4c3049c35d20fa53136149151a2f8e4 */
window.QZFL = window.QZONE = window.QZFL || window.QZONE || {};
QZFL.version = "2.1.0.7";
QZFL._qzfl = 2.107;
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
            } catch (ign) {
            }
        }
        QZFL._doc = document;
        optmz = function (st) {
            return function (fns, tm) {
                var aargs;
                if (typeof fns == 'string') {
                    return st(fns, tm);
                } else {
                    aargs = Array.prototype.slice.call(arguments, 2);
                    return st(function () {
                        fns.apply(null, aargs);
                    }, tm);
                }
            };
        };
        window.setTimeout = QZFL._setTimeout = optmz(window.setTimeout);
        window.setInterval = QZFL._setInterval = optmz(window.setInterval);
    } else if (document.getBoxObjectFor || typeof(window.mozInnerScreenX) != 'undefined') {
        r = /(?:Firefox|GranParadiso|Iceweasel|Minefield).(\d+\.\d+)/i;
        ua.firefox = parseFloat((r.exec(agent) || r.exec('Firefox/3.3'))[1], 10);
    } else if (!navigator.taintEnabled) {
        m = /AppleWebKit.(\d+\.\d+)/i.exec(agent);
        ua.webkit = m ? parseFloat(m[1], 10) : (document.evaluate ? (document.querySelector ? 525 : 420) : 419);
        if ((m = /Chrome.(\d+\.\d+)/i.exec(agent)) || window.chrome) {
            ua.chrome = m ? parseFloat(m[1], 10) : '2.0';
        } else if ((m = /Version.(\d+\.\d+)/i.exec(agent)) || window.safariHandler) {
            ua.safari = m ? parseFloat(m[1], 10) : '3.3';
        }
        ua.air = agent.indexOf('AdobeAIR') > -1 ? 1 : 0;
        ua.isiPod = agent.indexOf('iPod') > -1;
        ua.isiPad = agent.indexOf('iPad') > -1;
        ua.isiPhone = agent.indexOf('iPhone') > -1;
    } else if (window.opera) {
        ua.opera = parseFloat(window.opera.version(), 10);
    } else {
        ua.ie = 6;
    }
    if (!(ua.macs = agent.indexOf('Mac OS X') > -1)) {
        ua.windows = ((m = /Windows.+?(\d+\.\d+)/i.exec(agent)), m && parseFloat(m[1], 10));
        ua.linux = agent.indexOf('Linux') > -1;
        ua.android = agent.indexOf('Android') > -1;
    }
    ua.iOS = agent.indexOf('iPhone OS') > -1;
})();
QZFL.object = {map: function (object, scope) {
    return QZFL.object.extend(scope || window, object);
}, extend: function () {
    var args = arguments, len = arguments.length, deep = false, i = 1, target = args[0], opts, src, clone, copy;
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
    }
    if (typeof target !== "object" && typeof target !== "function") {
        target = {};
    }
    if (len === i) {
        target = QZFL;
        --i;
    }
    for (; i < len; i++) {
        if ((opts = arguments[i]) != null) {
            for (var name in opts) {
                src = target[name];
                copy = opts[name];
                if (target === copy) {
                    continue;
                }
                if (deep && copy && typeof copy === "object" && !copy.nodeType) {
                    if (src) {
                        clone = src;
                    } else if (QZFL.lang.isArray(copy)) {
                        clone = [];
                    } else if (QZFL.object.getType(copy) === 'object') {
                        clone = {};
                    } else {
                        clone = copy;
                    }
                    target[name] = QZFL.object.extend(deep, clone, copy);
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
}, each: function (obj, callback) {
    var value, i = 0, length = obj.length, isObj = (length === undefined) || (typeof(obj) == "function");
    if (isObj) {
        for (var name in obj) {
            if (callback.call(obj[name], obj[name], name, obj) === false) {
                break;
            }
        }
    } else {
        for (value = obj[0]; i < length && false !== callback.call(value, value, i, obj); value = obj[++i]) {
        }
    }
    return obj;
}, getType: function (obj) {
    return obj === null ? 'null' : (obj === undefined ? 'undefined' : Object.prototype.toString.call(obj).slice(8, -1).toLowerCase());
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
QZFL.console = function (expr) {
    if (window.console) {
        if (console.assert) {
            console.assert.apply(null, arguments);
        } else {
            expr || console.log.apply(null, slice.call(arguments, 1));
        }
    }
};
QZFL.console.print = function (msg) {
    window.console && console.log(msg);
};
QZFL.widget = {};
QZFL.object.map(QZFL.object, QZFL);
QZFL.object.each(["widget", "string", "util"], function (value) {
    QZFL[value] = {};
});
QZFL.namespace = QZFL.object;
window.ua = window.ua || QZFL.userAgent;
QZFL.config = {debugLevel: 0, defaultDataCharacterSet: "utf-8", DCCookieDomain: "qq.com", domainPrefix: "qq.com", gbEncoderPath: "http://imgcache.qq.com/ac/club/qqvip/toolpages/", FSHelperPage: "http://imgcache.qq.com/ac/club/qqvip/toolpages/fp_gbk.html", defaultShareObject: "http://imgcache.qq.com/ac/club/qqvip/toolpages/getset.swf"};
QZFL.css = {getClassRegEx: function (className) {
    var re = QZFL.css.classNameCache[className];
    if (!re) {
        re = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)');
        QZFL.css.classNameCache[className] = re;
    }
    return re;
}, convertHexColor: function (color) {
    color = /^#/.test(color) ? color.substr(1) : color;
    var reColor = new RegExp("\\w{2}", "ig");
    color = color.match(reColor);
    if (!color || color.length < 3) {
        return[0, 0, 0]
    }
    var r = parseInt(color[0], 16);
    var g = parseInt(color[1], 16);
    var b = parseInt(color[2], 16);
    return[r, g, b];
}, styleSheets: {}, getStyleSheetById: function (id) {
    try {
        return QZFL.dom.get(id).sheet || document.styleSheets[id];
    } catch (e) {
        return null
    }
}, getRulesBySheet: function (sheetId) {
    var ss = QZFL.css.getStyleSheetById(sheetId);
    if (ss) {
        try {
            return ss.cssRules || ss.rules;
        } catch (e) {
            return null
        }
    } else {
        return null
    }
}, getRuleBySelector: function (sheetId, selector) {
    var _ss = this.getStyleSheetById(sheetId);
    if (!_ss.cacheSelector) {
        _ss.cacheSelector = {}
    }
    ;
    if (_ss) {
        var _rs = _ss.cssRules || _ss.rules;
        var re = new RegExp('^' + selector + '$', "i");
        var _cs = _ss.cacheSelector[selector];
        if (_cs && re.test(_rs[_cs].selectorText)) {
            return _rs[_cs];
        } else {
            for (var i = 0; i < _rs.length; i++) {
                if (re.test(_rs[i].selectorText)) {
                    _ss.cacheSelector[selector] = i;
                    return _rs[i];
                }
            }
            return null;
        }
    } else {
        return null;
    }
}, insertCSSLink: function (url, id) {
    var dom = document, cssLink = dom.createElement("link");
    if (id) {
        cssLink.id = id;
    }
    cssLink.rel = "stylesheet";
    cssLink.rev = "stylesheet";
    cssLink.type = "text/css";
    cssLink.media = "screen";
    cssLink.href = url;
    dom.getElementsByTagName("head")[0].appendChild(cssLink);
    return cssLink.sheet || cssLink;
}, insertStyleSheet: function (sheetId) {
    var ss = document.createElement("style");
    ss.id = sheetId;
    document.getElementsByTagName("head")[0].appendChild(ss);
    return ss.sheet || ss;
}, removeStyleSheet: function (id) {
    var _ss = this.getStyleSheetById(id);
    if (_ss) {
        var own = _ss.owningElement || _ss.ownerNode;
        QZFL.dom.removeElement(own);
    }
}, hasClassName: function (elem, cname) {
    return(elem && cname) ? new RegExp('\\b' + cname + '\\b').test(elem.className) : false;
}, swapClassName: function (elements, class1, class2) {
    function _swap(el, c1, c2) {
        if (QZFL.css.hasClassName(el, c1)) {
            el.className = el.className.replace(c1, c2);
        } else if (QZFL.css.hasClassName(el, c2)) {
            el.className = el.className.replace(c2, c1);
        }
    }

    if (elements.constructor != Array) {
        elements = [elements];
    }
    for (var i = 0, len = elements.length; i < len; i++) {
        _swap(elements[i], class1, class2);
    }
}, replaceClassName: function (elements, sourceClass, targetClass) {
    function _replace(el, c1, c2) {
        if (QZFL.css.hasClassName(el, c1)) {
            el.className = el.className.replace(c1, c2);
        }
    }

    if (elements.constructor != Array) {
        elements = [elements];
    }
    for (var i = 0, len = elements.length; i < len; i++) {
        _replace(elements[i], sourceClass, targetClass);
    }
}, addClassName: function (elem, cname) {
    if (elem && cname) {
        if (elem.className) {
            if (QZFL.css.hasClassName(elem, cname)) {
                return false;
            } else {
                elem.className += ' ' + cname;
                return true;
            }
        } else {
            elem.className = cname;
            return true;
        }
    } else {
        return false;
    }
}, removeClassName: function (elem, cname) {
    if (elem && cname && elem.className) {
        var old = elem.className;
        elem.className = (elem.className.replace(new RegExp('\\b' + cname + '\\b'), ''));
        return elem.className != old;
    } else {
        return false;
    }
}, toggleClassName: function (elem, cname) {
    var r = QZFL.css;
    if (r.hasClassName(elem, cname)) {
        r.removeClassName(elem, cname);
    } else {
        r.addClassName(elem, cname);
    }
}}
QZFL.css.classNameCache = {};
QZFL.dom = {getById: function (id) {
    return document.getElementById(id);
}, getByName: function (name, tagName) {
    if (!tagName)
        return document.getElementsByName(name);
    var arr = [];
    var e = document.getElementsByTagName(tagName);
    for (var i = 0; i < e.length; ++i) {
        if (!!e[i].getAttribute("name") && (e[i].getAttribute("name").toLowerCase() == name.toLowerCase())) {
            arr.push(e[i]);
        }
    }
    return arr;
}, get: function (e) {
    if (e && ((e.tagName || e.item) || e.nodeType == 9)) {
        return e;
    }
    return this.getById(e);
}, getNode: function (e) {
    if (e && (e.nodeType || e.item)) {
        return e;
    }
    if (typeof e === 'string') {
        return this.getById(e);
    }
    return null;
}, removeElement: function (el) {
    if (typeof(el) == "string") {
        el = QZFL.dom.getById(el);
    }
    if (!el) {
        return;
    }
    if (el.removeNode) {
        el.removeNode(true);
    } else {
        if (el.childNodes.length > 0) {
            for (var ii = el.childNodes.length - 1; ii >= 0; ii--) {
                QZFL.dom.removeElement(el.childNodes[ii]);
            }
        }
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    }
    el = null;
    return null;
}, searchElementByClassName: function (el, className) {
    el = this.get(el);
    if (!el) {
        return null
    }
    var re = QZFL.css.getClassRegEx(className);
    while (el) {
        if (re.test(el.className)) {
            return el;
        }
        el = el.parentNode;
    }
    return null;
}, getElementsByClassName: function (className, tag, root) {
    tag = tag || '*';
    root = (root) ? this.get(root) : null || document;
    if (!root) {
        return[];
    }
    var nodes = [], elements = root.getElementsByTagName(tag), re = QZFL.css.getClassRegEx(className);
    for (var i = 0, len = elements.length; i < len; ++i) {
        if (re.test(elements[i].className)) {
            nodes[nodes.length] = elements[i];
        }
    }
    return nodes;
}, isAncestor: function (node1, node2) {
    if (!node1 || !node2) {
        return false;
    }
    if (node1.contains && node2.nodeType && !QZFL.userAgent.Safari) {
        return node1.contains(node2) && node1 != node2;
    }
    if (node1.compareDocumentPosition && node2.nodeType) {
        return!!(node1.compareDocumentPosition(node2) & 16);
    } else if (node2.nodeType) {
        return!!this.getAncestorBy(node2, function (el) {
            return el == node1;
        });
    }
    return false;
}, getAncestorBy: function (node, method) {
    while (node = node.parentNode) {
        if (node && node.nodeType == 1 && (!method || method(node))) {
            return node;
        }
    }
    return null;
}, getFirstChild: function (node) {
    node = this.getNode(node);
    if (!node) {
        return null;
    }
    var child = !!node.firstChild && node.firstChild.nodeType == 1 ? node.firstChild : null;
    return child || this.getNextSibling(node.firstChild);
}, getNextSibling: function (node) {
    node = this.getNode(node);
    if (!node) {
        return null;
    }
    while (node) {
        node = node.nextSibling;
        if (!!node && node.nodeType == 1) {
            return node;
        }
    }
    return null;
}, getPreviousSibling: function (node) {
    node = this.getNode(node);
    if (!node) {
        return null;
    }
    while (node) {
        node = node.previousSibling;
        if (!!node && node.nodeType == 1) {
            return node;
        }
    }
    return null;
}, swapNode: function (node1, node2) {
    if (node1.swapNode) {
        node1.swapNode(node2);
    } else {
        var parent = node2.parentNode;
        var next = node2.nextSibling;
        if (next == node1) {
            parent.insertBefore(node1, node2);
        } else if (node2 == node1.nextSibling) {
            parent.insertBefore(node2, node1);
        } else {
            node1.parentNode.replaceChild(node2, node1);
            parent.insertBefore(node1, next);
        }
    }
}, createElementIn: function (tagName, el, insertFirst, attributes) {
    tagName = tagName || "div";
    el = this.get(el) || document.body;
    var _doc = el.ownerDocument;
    var _e = _doc.createElement(tagName);
    if (attributes) {
        for (var k in attributes) {
            if (/class/.test(k)) {
                _e.className = attributes[k];
            } else if (/style/.test(k)) {
                _e.style.cssText = attributes[k];
            } else {
                _e[k] = attributes[k];
            }
        }
    }
    if (insertFirst) {
        el.insertBefore(_e, el.firstChild);
    } else {
        el.appendChild(_e);
    }
    return _e;
}, getStyle: function (el, property) {
    el = this.get(el);
    if (!el || el.nodeType == 9) {
        return null;
    }
    var w3cMode = document.defaultView && document.defaultView.getComputedStyle;
    var computed = !w3cMode ? null : document.defaultView.getComputedStyle(el, '');
    var value = "";
    switch (property) {
        case"float":
            property = w3cMode ? "cssFloat" : "styleFloat";
            break;
        case"opacity":
            if (!w3cMode) {
                var val = 100;
                try {
                    val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity;
                } catch (e) {
                    try {
                        val = el.filters('alpha').opacity;
                    } catch (e) {
                    }
                }
                return val / 100;
            } else {
                return parseFloat((computed || el.style)[property]);
            }
            break;
        case"backgroundPositionX":
            if (w3cMode) {
                property = "backgroundPosition";
                return((computed || el.style)[property]).split(" ")[0];
            }
            break;
        case"backgroundPositionY":
            if (w3cMode) {
                property = "backgroundPosition";
                return((computed || el.style)[property]).split(" ")[1];
            }
            break;
    }
    if (w3cMode) {
        return(computed || el.style)[property];
    } else {
        return(el.currentStyle[property] || el.style[property]);
    }
}, setStyle: function (el, property, value) {
    el = this.get(el);
    if (!el || el.nodeType == 9) {
        return false;
    }
    var w3cMode = document.defaultView && document.defaultView.getComputedStyle;
    switch (property) {
        case"float":
            property = w3cMode ? "cssFloat" : "styleFloat";
            el.style[property] = value;
            return true;
            break;
        case"opacity":
            if (!w3cMode) {
                if (value >= 1) {
                    el.style.filter = "";
                    return;
                }
                el.style.filter = 'alpha(opacity=' + (value * 100) + ')';
                return true;
            } else {
                el.style[property] = value;
                return true;
            }
            break;
        case"backgroundPositionX":
            if (w3cMode) {
                var _y = QZFL.dom.getStyle(el, "backgroundPositionY");
                el.style["backgroundPosition"] = value + " " + (_y || "top");
            } else {
                el.style[property] = value;
            }
            break;
        case"backgroundPositionY":
            if (w3cMode) {
                var _x = QZFL.dom.getStyle(el, "backgroundPositionX");
                el.style["backgroundPosition"] = (_x || "left") + " " + value;
            } else {
                el.style[property] = value;
            }
            break;
        default:
            if (typeof el.style[property] == "undefined") {
                return false
            }
            el.style[property] = value;
            return true;
    }
}, createNamedElement: function (type, name, doc) {
    doc = doc || document;
    var element;
    try {
        element = doc.createElement('<' + type + ' name="' + name + '">');
    } catch (ignore) {
    }
    if (!element || !element.name) {
        element = doc.createElement(type);
        element.name = name;
    }
    return element;
}, getPosition: function (el) {
    var xy = QZFL.dom.getXY(el), size = QZFL.dom.getSize(el);
    return{"top": xy[1], "left": xy[0], "width": size[0], "height": size[1]};
}, setPosition: function (el, pos) {
    QZFL.dom.setXY(el, pos['left'], pos['top']);
    QZFL.dom.setSize(el, pos['width'], pos['height']);
}, getXY: function (el, doc) {
    var _t = 0, _l = 0;
    doc = doc || document;
    if (el) {
        if (doc.documentElement.getBoundingClientRect && el.getBoundingClientRect) {
            var box = el.getBoundingClientRect(), oDoc = el.ownerDocument, _fix = QZFL.userAgent.ie ? 2 : 0;
            _t = box.top - _fix + QZFL.dom.getScrollTop(oDoc);
            _l = box.left - _fix + QZFL.dom.getScrollLeft(oDoc);
        } else {
            while (el.offsetParent) {
                _t += el.offsetTop;
                _l += el.offsetLeft;
                el = el.offsetParent;
            }
        }
    }
    return[_l, _t];
}, getSize: function (el) {
    var _fix = [0, 0];
    QZFL.object.each(["Left", "Right", "Top", "Bottom"], function (v) {
        _fix[v == "Left" || v == "Right" ? 0 : 1] += (parseInt(QZFL.dom.getStyle(el, "border" + v + "Width"), 10) || 0) + (parseInt(QZFL.dom.getStyle(el, "padding" + v), 10) || 0);
    });
    var _w = el.offsetWidth - _fix[0];
    var _h = el.offsetHeight - _fix[1];
    return[_w, _h];
}, setXY: function (el, x, y) {
    el = this.get(el);
    var _ml = parseInt(this.getStyle(el, "marginLeft")) || 0;
    var _mt = parseInt(this.getStyle(el, "marginTop")) || 0;
    this.setStyle(el, "left", parseInt(x) - _ml + "px");
    this.setStyle(el, "top", parseInt(y) - _mt + "px");
}, getScrollLeft: function (doc) {
    doc = doc || document;
    return Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
}, getScrollTop: function (doc) {
    doc = doc || document;
    return Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
}, getScrollHeight: function (doc) {
    doc = doc || document;
    return Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
}, getScrollWidth: function (doc) {
    doc = doc || document;
    return Math.max(doc.documentElement.scrollWidth, doc.body.scrollWidth);
}, setScrollLeft: function (value, doc) {
    doc = doc || document;
    doc[doc.compatMode == "CSS1Compat" && !QZFL.userAgent.safari ? "documentElement" : "body"].scrollLeft = value;
}, setScrollTop: function (value, doc) {
    doc = doc || document;
    doc[doc.compatMode == "CSS1Compat" && !QZFL.userAgent.safari ? "documentElement" : "body"].scrollTop = value;
}, getClientHeight: function (doc) {
    doc = doc || document;
    return doc.compatMode == "CSS1Compat" ? doc.documentElement.clientHeight : doc.body.clientHeight;
}, getClientWidth: function (doc) {
    doc = doc || document;
    return doc.compatMode == "CSS1Compat" ? doc.documentElement.clientWidth : doc.body.clientWidth;
}, setSize: function (el, width, height) {
    el = this.get(el);
    var _wFix = /\d+([a-z%]+)/i.exec(width);
    _wFix = _wFix ? _wFix[1] : "";
    var _hFix = /\d+([a-z%]+)/i.exec(height);
    _hFix = _hFix ? _hFix[1] : "";
    this.setStyle(el, "width", (typeof width != "number" || width < 0 || /auto/i.test(width)) ? "auto" : (parseInt(width) + (_wFix || "px")));
    this.setStyle(el, "height", (typeof height != "number" || height < 0 || /auto/i.test(height)) ? "auto" : (parseInt(height) + (_hFix || "px")));
}, getDocumentWindow: function (doc) {
    _doc = doc || document;
    return _doc.parentWindow || _doc.defaultView;
}, getElementsByTagNameNS: function (node, ns, tgn) {
    var res = [];
    if (node) {
        if (node.getElementsByTagNameNS) {
            return node.getElementsByTagName(ns + ":" + tgn);
        } else if (node.getElementsByTagName) {
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
    }
    return res;
}, collection2Array: function (coll) {
    if (isArray(coll)) {
        return coll;
    } else {
        var r = [];
        for (var i = 0, len = coll.length; i < len; ++i) {
            r.push(coll[i]);
        }
    }
    return r;
}, getElementByTagNameBubble: function (a, tn) {
    if (!isNode(a)) {
        return null;
    }
    tn += "";
    var maxLv = 31;
    while (a && a.tagName && (a.tagName.toLowerCase() != tn.toLowerCase())) {
        if (a == document.body || (--maxLv) < 0) {
            return null;
        }
        a = a.parentNode;
    }
    return a;
}};
var _CN = QZFL.dom.createNamedElement, $ = QZFL.dom.getById, removeNode = QZFL.dom.removeElement;
QZFL.event = {KEYS: {BACKSPACE: 8, TAB: 9, RETURN: 13, ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46}, extendType: /(click|mousedown|mouseover|mouseout|mouseup|mousemove|scroll|contextmenu|resize)/i, _eventListDictionary: {}, _fnSeqUID: 0, _objSeqUID: 0, addEvent: function (obj, eventType, fn, argArray) {
    var cfn = fn, res = false, l;
    if (!obj) {
        return res;
    }
    if (!obj.eventsListUID) {
        obj.eventsListUID = "e" + (++QZFL.event._objSeqUID);
        QZFL.event._eventListDictionary[obj.eventsListUID] = {};
    }
    l = QZFL.event._eventListDictionary[obj.eventsListUID];
    if (!fn.__elUID) {
        fn.__elUID = "e" + (++QZFL.event._fnSeqUID) + obj.eventsListUID;
    }
    if (!l[eventType]) {
        l[eventType] = {};
    }
    if (typeof(l[eventType][fn.__elUID]) == 'function') {
        return false;
    }
    if (QZFL.event.extendType.test(eventType)) {
        argArray = argArray || [];
        cfn = function (e) {
            return fn.apply(null, ([QZFL.event.getEvent(e)]).concat(argArray));
        };
    }
    if (obj.addEventListener) {
        obj.addEventListener(eventType, cfn, false);
        res = true;
    } else if (obj.attachEvent) {
        res = obj.attachEvent("on" + eventType, cfn);
    } else {
        res = false;
    }
    if (res) {
        l[eventType][fn.__elUID] = cfn;
    }
    return res;
}, removeEvent: function (obj, eventType, fn) {
    var cfn = fn, res = false, l;
    if (!obj) {
        return res;
    }
    if (!cfn) {
        return QZFL.event.purgeEvent(obj, eventType);
    }
    if (!obj.eventsListUID) {
        obj.eventsListUID = "e" + (++QZFL.event._objSeqUID);
        QZFL.event._eventListDictionary[obj.eventsListUID] = {};
    }
    l = QZFL.event._eventListDictionary[obj.eventsListUID];
    if (!fn.__elUID) {
        fn.__elUID = "e" + (++QZFL.event._fnSeqUID) + obj.eventsListUID;
    }
    if (!l[eventType]) {
        l[eventType] = {};
    }
    if (QZFL.event.extendType.test(eventType) && l[eventType] && l[eventType][fn.__elUID]) {
        cfn = l[eventType][fn.__elUID];
    }
    if (obj.removeEventListener) {
        obj.removeEventListener(eventType, cfn, false);
        res = true;
    } else if (obj.detachEvent) {
        obj.detachEvent("on" + eventType, cfn);
        res = true;
    } else {
        return false;
    }
    if (res && l[eventType]) {
        delete l[eventType][fn.__elUID];
    }
    return res;
}, purgeEvent: function (obj, type) {
    var l;
    if (obj.eventsListUID && (l = QZFL.event._eventListDictionary[obj.eventsListUID]) && l[type]) {
        for (var k in l[type]) {
            if (obj.removeEventListener) {
                obj.removeEventListener(type, l[type][k], false);
            } else if (obj.detachEvent) {
                obj.detachEvent('on' + type, l[type][k]);
            }
        }
    }
    if (obj['on' + type]) {
        obj['on' + type] = null;
    }
    if (l) {
        l[type] = null;
        delete l[type];
    }
    return true;
}, getEvent: function (evt) {
    evt = evt || window.event;
    if (!evt && !QZFL.userAgent.ie) {
        var c = this.getEvent.caller, cnt = 1;
        while (c) {
            evt = c.arguments[0];
            if (evt && Event == evt.constructor) {
                break;
            } else if (cnt > 32) {
                break;
            }
            c = c.caller;
            cnt++;
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
    } else {
        return e.button;
    }
}, getTarget: function (evt) {
    var e = QZFL.event.getEvent(evt);
    if (e) {
        return e.target || e.srcElement;
    } else {
        return null;
    }
}, getCurrentTarget: function (evt) {
    var e = QZFL.event.getEvent(evt);
    if (e) {
        return e.currentTarget || document.activeElement;
    } else {
        return null;
    }
}, cancelBubble: function (evt) {
    evt = QZFL.event.getEvent(evt);
    if (!evt) {
        return false
    }
    if (evt.stopPropagation) {
        evt.stopPropagation();
    } else {
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
    } else {
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
        } else if (ev.type == "mouseover") {
            t = ev.fromElement;
        } else {
        }
    }
    return t;
}, bind: function (obj, method) {
    var args = Array.prototype.slice.call(arguments, 2);
    return function () {
        var _obj = obj || this;
        var _args = args.concat(Array.prototype.slice.call(arguments, 0));
        if (typeof(method) == "string") {
            if (_obj[method]) {
                return _obj[method].apply(_obj, _args);
            }
        } else {
            return method.apply(_obj, _args);
        }
    }
}};
QZFL.event.on = QZFL.event.addEvent;
window.addEvent = QZFL.event.addEvent;
window.removeEvent = QZFL.event.removeEvent;
window.getEvent = QZFL.event.getEvent;
QZFL.selector = {query: function (selector, context) {
    context = context || document;
    var _s = QZFL.selector.engine(selector, context);
    return _s;
}};
;
(function () {
    var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g, done = 0, toString = Object.prototype.toString, hasDuplicate = false;
    var Sizzle = function (selector, context, results, seed) {
        results = results || [];
        var origContext = context = context || document;
        if (context.nodeType !== 1 && context.nodeType !== 9) {
            return[];
        }
        if (!selector || typeof selector !== "string") {
            return results;
        }
        var parts = [], m, set, checkSet, check, mode, extra, prune = true, contextXML = isXML(context);
        chunker.lastIndex = 0;
        while ((m = chunker.exec(selector)) !== null) {
            parts.push(m[1]);
            if (m[2]) {
                extra = RegExp.rightContext;
                break;
            }
        }
        if (parts.length > 1 && origPOS.exec(selector)) {
            if (parts.length === 2 && Expr.relative[parts[0]]) {
                set = posProcess(parts[0] + parts[1], context);
            } else {
                set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context);
                while (parts.length) {
                    selector = parts.shift();
                    if (Expr.relative[selector])
                        selector += parts.shift();
                    set = posProcess(selector, set);
                }
            }
        } else {
            if (!seed && parts.length > 1 && context.nodeType === 9 && !contextXML && Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])) {
                var ret = Sizzle.find(parts.shift(), context, contextXML);
                context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0] : ret.set[0];
            }
            if (context) {
                var ret = seed ? {expr: parts.pop(), set: makeArray(seed)} : Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML);
                set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;
                if (parts.length > 0) {
                    checkSet = makeArray(set);
                } else {
                    prune = false;
                }
                while (parts.length) {
                    var cur = parts.pop(), pop = cur;
                    if (!Expr.relative[cur]) {
                        cur = "";
                    } else {
                        pop = parts.pop();
                    }
                    if (pop == null) {
                        pop = context;
                    }
                    Expr.relative[cur](checkSet, pop, contextXML);
                }
            } else {
                checkSet = parts = [];
            }
        }
        if (!checkSet) {
            checkSet = set;
        }
        if (!checkSet) {
            throw"Syntax error, unrecognized expression: " + (cur || selector);
        }
        if (toString.call(checkSet) === "[object Array]") {
            if (!prune) {
                results.push.apply(results, checkSet);
            } else if (context && context.nodeType === 1) {
                for (var i = 0; checkSet[i] != null; i++) {
                    if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && contains(context, checkSet[i]))) {
                        results.push(set[i]);
                    }
                }
            } else {
                for (var i = 0; checkSet[i] != null; i++) {
                    if (checkSet[i] && checkSet[i].nodeType === 1) {
                        results.push(set[i]);
                    }
                }
            }
        } else {
            makeArray(checkSet, results);
        }
        if (extra) {
            Sizzle(extra, origContext, results, seed);
            Sizzle.uniqueSort(results);
        }
        return results;
    };
    Sizzle.uniqueSort = function (results) {
        if (sortOrder) {
            hasDuplicate = false;
            results.sort(sortOrder);
            if (hasDuplicate) {
                for (var i = 1; i < results.length; i++) {
                    if (results[i] === results[i - 1]) {
                        results.splice(i--, 1);
                    }
                }
            }
        }
    };
    Sizzle.matches = function (expr, set) {
        return Sizzle(expr, null, null, set);
    };
    Sizzle.find = function (expr, context, isXML) {
        var set, match;
        if (!expr) {
            return[];
        }
        for (var i = 0, l = Expr.order.length; i < l; i++) {
            var type = Expr.order[i], match;
            if ((match = Expr.match[type].exec(expr))) {
                var left = RegExp.leftContext;
                if (left.substr(left.length - 1) !== "\\") {
                    match[1] = (match[1] || "").replace(/\\/g, "");
                    set = Expr.find[type](match, context, isXML);
                    if (set != null) {
                        expr = expr.replace(Expr.match[type], "");
                        break;
                    }
                }
            }
        }
        if (!set) {
            set = context.getElementsByTagName("*");
        }
        return{set: set, expr: expr};
    };
    Sizzle.filter = function (expr, set, inplace, not) {
        var old = expr, result = [], curLoop = set, match, anyFound, isXMLFilter = set && set[0] && isXML(set[0]);
        while (expr && set.length) {
            for (var type in Expr.filter) {
                if ((match = Expr.match[type].exec(expr)) != null) {
                    var filter = Expr.filter[type], found, item;
                    anyFound = false;
                    if (curLoop == result) {
                        result = [];
                    }
                    if (Expr.preFilter[type]) {
                        match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter);
                        if (!match) {
                            anyFound = found = true;
                        } else if (match === true) {
                            continue;
                        }
                    }
                    if (match) {
                        for (var i = 0; (item = curLoop[i]) != null; i++) {
                            if (item) {
                                found = filter(item, match, i, curLoop);
                                var pass = not ^ !!found;
                                if (inplace && found != null) {
                                    if (pass) {
                                        anyFound = true;
                                    } else {
                                        curLoop[i] = false;
                                    }
                                } else if (pass) {
                                    result.push(item);
                                    anyFound = true;
                                }
                            }
                        }
                    }
                    if (found !== undefined) {
                        if (!inplace) {
                            curLoop = result;
                        }
                        expr = expr.replace(Expr.match[type], "");
                        if (!anyFound) {
                            return[];
                        }
                        break;
                    }
                }
            }
            if (expr == old) {
                if (anyFound == null) {
                    throw"Syntax error, unrecognized expression: " + expr;
                } else {
                    break;
                }
            }
            old = expr;
        }
        return curLoop;
    };
    var Expr = Sizzle.selectors = {order: ["ID", "NAME", "TAG"], match: {ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/, CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/, NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/, ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/, TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/, CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/, POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/, PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/}, attrMap: {"class": "className", "for": "htmlFor"}, attrHandle: {href: function (elem) {
        return elem.getAttribute("href");
    }}, relative: {"+": function (checkSet, part, isXML) {
        var isPartStr = typeof part === "string", isTag = isPartStr && !/\W/.test(part), isPartStrNotTag = isPartStr && !isTag;
        if (isTag && !isXML) {
            part = part.toUpperCase();
        }
        for (var i = 0, l = checkSet.length, elem; i < l; i++) {
            if ((elem = checkSet[i])) {
                while ((elem = elem.previousSibling) && elem.nodeType !== 1) {
                }
                checkSet[i] = isPartStrNotTag || elem && elem.nodeName === part ? elem || false : elem === part;
            }
        }
        if (isPartStrNotTag) {
            Sizzle.filter(part, checkSet, true);
        }
    }, ">": function (checkSet, part, isXML) {
        var isPartStr = typeof part === "string";
        if (isPartStr && !/\W/.test(part)) {
            part = isXML ? part : part.toUpperCase();
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                if (elem) {
                    var parent = elem.parentNode;
                    checkSet[i] = parent.nodeName === part ? parent : false;
                }
            }
        } else {
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                if (elem) {
                    checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part;
                }
            }
            if (isPartStr) {
                Sizzle.filter(part, checkSet, true);
            }
        }
    }, "": function (checkSet, part, isXML) {
        var doneName = done++, checkFn = dirCheck;
        if (!/\W/.test(part)) {
            var nodeCheck = part = isXML ? part : part.toUpperCase();
            checkFn = dirNodeCheck;
        }
        checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
    }, "~": function (checkSet, part, isXML) {
        var doneName = done++, checkFn = dirCheck;
        if (typeof part === "string" && !/\W/.test(part)) {
            var nodeCheck = part = isXML ? part : part.toUpperCase();
            checkFn = dirNodeCheck;
        }
        checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
    }}, find: {ID: function (match, context, isXML) {
        if (typeof context.getElementById !== "undefined" && !isXML) {
            var m = context.getElementById(match[1]);
            return m ? [m] : [];
        }
    }, NAME: function (match, context, isXML) {
        if (typeof context.getElementsByName !== "undefined") {
            var ret = [], results = context.getElementsByName(match[1]);
            for (var i = 0, l = results.length; i < l; i++) {
                if (results[i].getAttribute("name") === match[1]) {
                    ret.push(results[i]);
                }
            }
            return ret.length === 0 ? null : ret;
        }
    }, TAG: function (match, context) {
        return context.getElementsByTagName(match[1]);
    }}, preFilter: {CLASS: function (match, curLoop, inplace, result, not, isXML) {
        match = " " + match[1].replace(/\\/g, "") + " ";
        if (isXML) {
            return match;
        }
        for (var i = 0, elem; (elem = curLoop[i]) != null; i++) {
            if (elem) {
                if (not ^ (elem.className && (" " + elem.className + " ").indexOf(match) >= 0)) {
                    if (!inplace)
                        result.push(elem);
                } else if (inplace) {
                    curLoop[i] = false;
                }
            }
        }
        return false;
    }, ID: function (match) {
        return match[1].replace(/\\/g, "");
    }, TAG: function (match, curLoop) {
        for (var i = 0; curLoop[i] === false; i++) {
        }
        return curLoop[i] && isXML(curLoop[i]) ? match[1] : match[1].toUpperCase();
    }, CHILD: function (match) {
        if (match[1] == "nth") {
            var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2] == "even" && "2n" || match[2] == "odd" && "2n+1" || !/\D/.test(match[2]) && "0n+" + match[2] || match[2]);
            match[2] = (test[1] + (test[2] || 1)) - 0;
            match[3] = test[3] - 0;
        }
        match[0] = done++;
        return match;
    }, ATTR: function (match, curLoop, inplace, result, not, isXML) {
        var name = match[1].replace(/\\/g, "");
        if (!isXML && Expr.attrMap[name]) {
            match[1] = Expr.attrMap[name];
        }
        if (match[2] === "~=") {
            match[4] = " " + match[4] + " ";
        }
        return match;
    }, PSEUDO: function (match, curLoop, inplace, result, not) {
        if (match[1] === "not") {
            if (chunker.exec(match[3]).length > 1 || /^\w/.test(match[3])) {
                match[3] = Sizzle(match[3], null, null, curLoop);
            } else {
                var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
                if (!inplace) {
                    result.push.apply(result, ret);
                }
                return false;
            }
        } else if (Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0])) {
            return true;
        }
        return match;
    }, POS: function (match) {
        match.unshift(true);
        return match;
    }}, filters: {enabled: function (elem) {
        return elem.disabled === false && elem.type !== "hidden";
    }, disabled: function (elem) {
        return elem.disabled === true;
    }, checked: function (elem) {
        return elem.checked === true;
    }, selected: function (elem) {
        elem.parentNode.selectedIndex;
        return elem.selected === true;
    }, parent: function (elem) {
        return!!elem.firstChild;
    }, empty: function (elem) {
        return!elem.firstChild;
    }, has: function (elem, i, match) {
        return!!Sizzle(match[3], elem).length;
    }, header: function (elem) {
        return/h\d/i.test(elem.nodeName);
    }, text: function (elem) {
        return"text" === elem.type;
    }, radio: function (elem) {
        return"radio" === elem.type;
    }, checkbox: function (elem) {
        return"checkbox" === elem.type;
    }, file: function (elem) {
        return"file" === elem.type;
    }, password: function (elem) {
        return"password" === elem.type;
    }, submit: function (elem) {
        return"submit" === elem.type;
    }, image: function (elem) {
        return"image" === elem.type;
    }, reset: function (elem) {
        return"reset" === elem.type;
    }, button: function (elem) {
        return"button" === elem.type || elem.nodeName.toUpperCase() === "BUTTON";
    }, input: function (elem) {
        return/input|select|textarea|button/i.test(elem.nodeName);
    }}, setFilters: {first: function (elem, i) {
        return i === 0;
    }, last: function (elem, i, match, array) {
        return i === array.length - 1;
    }, even: function (elem, i) {
        return i % 2 === 0;
    }, odd: function (elem, i) {
        return i % 2 === 1;
    }, lt: function (elem, i, match) {
        return i < match[3] - 0;
    }, gt: function (elem, i, match) {
        return i > match[3] - 0;
    }, nth: function (elem, i, match) {
        return match[3] - 0 == i;
    }, eq: function (elem, i, match) {
        return match[3] - 0 == i;
    }}, filter: {PSEUDO: function (elem, match, i, array) {
        var name = match[1], filter = Expr.filters[name];
        if (filter) {
            return filter(elem, i, match, array);
        } else if (name === "contains") {
            return(elem.textContent || elem.innerText || "").indexOf(match[3]) >= 0;
        } else if (name === "not") {
            var not = match[3];
            for (i = 0, l = not.length; i < l; i++) {
                if (not[i] === elem) {
                    return false;
                }
            }
            return true;
        }
    }, CHILD: function (elem, match) {
        var type = match[1], node = elem;
        switch (type) {
            case'only':
            case'first':
                while ((node = node.previousSibling)) {
                    if (node.nodeType === 1)
                        return false;
                }
                if (type == 'first')
                    return true;
                node = elem;
            case'last':
                while ((node = node.nextSibling)) {
                    if (node.nodeType === 1)
                        return false;
                }
                return true;
            case'nth':
                var first = match[2], last = match[3];
                if (first == 1 && last == 0) {
                    return true;
                }
                var doneName = match[0], parent = elem.parentNode;
                if (parent && (parent.sizcache !== doneName || !elem.nodeIndex)) {
                    var count = 0;
                    for (node = parent.firstChild; node; node = node.nextSibling) {
                        if (node.nodeType === 1) {
                            node.nodeIndex = ++count;
                        }
                    }
                    parent.sizcache = doneName;
                }
                var diff = elem.nodeIndex - last;
                if (first == 0) {
                    return diff == 0;
                } else {
                    return(diff % first == 0 && diff / first >= 0);
                }
        }
    }, ID: function (elem, match) {
        return elem.nodeType === 1 && elem.getAttribute("id") === match;
    }, TAG: function (elem, match) {
        return(match === "*" && elem.nodeType === 1) || elem.nodeName === match;
    }, CLASS: function (elem, match) {
        return(" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1;
    }, ATTR: function (elem, match) {
        var name = match[1], result = Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : elem[name] != null ? elem[name] : elem.getAttribute(name), value = result + "", type = match[2], check = match[4];
        return result == null ? type === "!=" : type === "=" ? value === check : type === "*=" ? value.indexOf(check) >= 0 : type === "~=" ? (" " + value + " ").indexOf(check) >= 0 : !check ? value && result !== false : type === "!=" ? value != check : type === "^=" ? value.indexOf(check) === 0 : type === "$=" ? value.substr(value.length - check.length) === check : type === "|=" ? value === check || value.substr(0, check.length + 1) === check + "-" : false;
    }, POS: function (elem, match, i, array) {
        var name = match[2], filter = Expr.setFilters[name];
        if (filter) {
            return filter(elem, i, match, array);
        }
    }}};
    var origPOS = Expr.match.POS;
    for (var type in Expr.match) {
        Expr.match[type] = new RegExp(Expr.match[type].source + /(?![^\[]*\])(?![^\(]*\))/.source);
    }
    var makeArray = function (array, results) {
        array = Array.prototype.slice.call(array);
        if (results) {
            results.push.apply(results, array);
            return results;
        }
        return array;
    };
    try {
        Array.prototype.slice.call(document.documentElement.childNodes);
    } catch (e) {
        makeArray = function (array, results) {
            var ret = results || [];
            if (toString.call(array) === "[object Array]") {
                Array.prototype.push.apply(ret, array);
            } else {
                if (typeof array.length === "number") {
                    for (var i = 0, l = array.length; i < l; i++) {
                        ret.push(array[i]);
                    }
                } else {
                    for (var i = 0; array[i]; i++) {
                        ret.push(array[i]);
                    }
                }
            }
            return ret;
        };
    }
    var sortOrder;
    if (document.documentElement.compareDocumentPosition) {
        sortOrder = function (a, b) {
            var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
            if (ret === 0) {
                hasDuplicate = true;
            }
            return ret;
        };
    } else if ("sourceIndex"in document.documentElement) {
        sortOrder = function (a, b) {
            var ret = a.sourceIndex - b.sourceIndex;
            if (ret === 0) {
                hasDuplicate = true;
            }
            return ret;
        };
    } else if (document.createRange) {
        sortOrder = function (a, b) {
            var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
            aRange.selectNode(a);
            aRange.collapse(true);
            bRange.selectNode(b);
            bRange.collapse(true);
            var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
            if (ret === 0) {
                hasDuplicate = true;
            }
            return ret;
        };
    }
    (function () {
        var form = document.createElement("div"), id = "script" + (new Date).getTime();
        form.innerHTML = "<a name='" + id + "'/>";
        var root = document.documentElement;
        root.insertBefore(form, root.firstChild);
        if (!!document.getElementById(id)) {
            Expr.find.ID = function (match, context, isXML) {
                if (typeof context.getElementById !== "undefined" && !isXML) {
                    var m = context.getElementById(match[1]);
                    return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
                }
            };
            Expr.filter.ID = function (elem, match) {
                var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                return elem.nodeType === 1 && node && node.nodeValue === match;
            };
        }
        root.removeChild(form);
        root = form = null;
    })();
    (function () {
        var div = document.createElement("div");
        div.appendChild(document.createComment(""));
        if (div.getElementsByTagName("*").length > 0) {
            Expr.find.TAG = function (match, context) {
                var results = context.getElementsByTagName(match[1]);
                if (match[1] === "*") {
                    var tmp = [];
                    for (var i = 0; results[i]; i++) {
                        if (results[i].nodeType === 1) {
                            tmp.push(results[i]);
                        }
                    }
                    results = tmp;
                }
                return results;
            };
        }
        div.innerHTML = "<a href='#'></a>";
        if (div.firstChild && typeof div.firstChild.getAttribute !== "undefined" && div.firstChild.getAttribute("href") !== "#") {
            Expr.attrHandle.href = function (elem) {
                return elem.getAttribute("href", 2);
            };
        }
        div = null;
    })();
    if (document.querySelectorAll)
        (function () {
            var oldSizzle = Sizzle, div = document.createElement("div");
            div.innerHTML = "<p class='TEST'></p>";
            if (div.querySelectorAll && div.querySelectorAll(".TEST").length === 0) {
                return;
            }
            Sizzle = function (query, context, extra, seed) {
                context = context || document;
                if (!seed && context.nodeType === 9 && !isXML(context)) {
                    try {
                        return makeArray(context.querySelectorAll(query), extra);
                    } catch (e) {
                    }
                }
                return oldSizzle(query, context, extra, seed);
            };
            for (var prop in oldSizzle) {
                Sizzle[prop] = oldSizzle[prop];
            }
            div = null;
        })();
    if (document.getElementsByClassName && document.documentElement.getElementsByClassName)
        (function () {
            var div = document.createElement("div");
            div.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (div.getElementsByClassName("e").length === 0)
                return;
            div.lastChild.className = "e";
            if (div.getElementsByClassName("e").length === 1)
                return;
            Expr.order.splice(1, 0, "CLASS");
            Expr.find.CLASS = function (match, context, isXML) {
                if (typeof context.getElementsByClassName !== "undefined" && !isXML) {
                    return context.getElementsByClassName(match[1]);
                }
            };
            div = null;
        })();
    function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
        var sibDir = dir == "previousSibling" && !isXML;
        for (var i = 0, l = checkSet.length; i < l; i++) {
            var elem = checkSet[i];
            if (elem) {
                if (sibDir && elem.nodeType === 1) {
                    elem.sizcache = doneName;
                    elem.sizset = i;
                }
                elem = elem[dir];
                var match = false;
                while (elem) {
                    if (elem.sizcache === doneName) {
                        match = checkSet[elem.sizset];
                        break;
                    }
                    if (elem.nodeType === 1 && !isXML) {
                        elem.sizcache = doneName;
                        elem.sizset = i;
                    }
                    if (elem.nodeName === cur) {
                        match = elem;
                        break;
                    }
                    elem = elem[dir];
                }
                checkSet[i] = match;
            }
        }
    }

    function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
        var sibDir = dir == "previousSibling" && !isXML;
        for (var i = 0, l = checkSet.length; i < l; i++) {
            var elem = checkSet[i];
            if (elem) {
                if (sibDir && elem.nodeType === 1) {
                    elem.sizcache = doneName;
                    elem.sizset = i;
                }
                elem = elem[dir];
                var match = false;
                while (elem) {
                    if (elem.sizcache === doneName) {
                        match = checkSet[elem.sizset];
                        break;
                    }
                    if (elem.nodeType === 1) {
                        if (!isXML) {
                            elem.sizcache = doneName;
                            elem.sizset = i;
                        }
                        if (typeof cur !== "string") {
                            if (elem === cur) {
                                match = true;
                                break;
                            }
                        } else if (Sizzle.filter(cur, [elem]).length > 0) {
                            match = elem;
                            break;
                        }
                    }
                    elem = elem[dir];
                }
                checkSet[i] = match;
            }
        }
    }

    var contains = document.compareDocumentPosition ? function (a, b) {
        return a.compareDocumentPosition(b) & 16;
    } : function (a, b) {
        return a !== b && (a.contains ? a.contains(b) : true);
    };
    var isXML = function (elem) {
        return elem.nodeType === 9 && elem.documentElement.nodeName !== "HTML" || !!elem.ownerDocument && elem.ownerDocument.documentElement.nodeName !== "HTML";
    };
    var posProcess = function (selector, context) {
        var tmpSet = [], later = "", match, root = context.nodeType ? [context] : context;
        while ((match = Expr.match.PSEUDO.exec(selector))) {
            later += match[0];
            selector = selector.replace(Expr.match.PSEUDO, "");
        }
        selector = Expr.relative[selector] ? selector + "*" : selector;
        for (var i = 0, l = root.length; i < l; i++) {
            Sizzle(selector, root[i], tmpSet);
        }
        return Sizzle.filter(later, tmpSet);
    };
    QZFL.selector.engine = Sizzle;
})();
;
(function () {
    var _el = null;
    QZFL.element = {get: function (selector, context) {
        if (selector.nodeType) {
            selector = [selector];
        }
        return new _el(selector, context);
    }, extend: function (object) {
        QZFL.namespace.extend(_el, object);
    }, extendFn: function (object) {
        QZFL.namespace.extend(_el.prototype, object);
    }, getVersion: function () {
        return _el.version;
    }}
    QZFL.ElementHandler = function (selector, context) {
        this.elements = null;
        this._isElementHandler = true;
        this._init(selector, context);
    }
    _el = QZFL.ElementHandler;
    _el.prototype = {_init: function (selector, context) {
        if (typeof(selector) == "string") {
            this.elements = QZFL.selector.query(selector, context);
        } else {
            this.elements = selector;
        }
    }, findElements: function (selector) {
        var _pushstack = [];
        this.each(function (el) {
            var _s = QZFL.selector.query(selector, el);
            if (_s.length > 0) {
                _pushstack = _pushstack.concat(_s);
            }
        });
        return _pushstack;
    }, find: function (selector) {
        return QZFL.element.get(this.findElements(selector));
    }, each: function (fn) {
        QZFL.object.each(this.elements, fn);
    }, concat: function (elements) {
        return QZFL.element.get(this.elements.concat(!!elements._isElementHandler ? elements.elements : elements));
    }, get: function (index) {
        return QZFL.element.get(this.elements[index]);
    }}
    window.$e = QZFL.element.get;
})();
QZFL.element.extend({version: "1.0"});
QZFL.ElementHandler.v
QZFL.element.extendFn({bind: function (evtType, fn) {
    this.each(function (el) {
        QZFL.event.addEvent(el, evtType, fn);
    });
}, unBind: function (evtType, fn) {
    this.each(function (el) {
        QZFL.event.removeEvent(el, evtType, fn);
    });
}, onClick: function (fn) {
    this.bind("click", fn);
}, onHover: function (fn) {
}});
QZFL.element.extendFn({setHtml: function (value) {
    this.setAttr("innerHTML", value);
}, getHtml: function (index) {
    var _e = this.elements[index || 0];
    return!!_e ? _e.innerHTML : null;
}, setVal: function (value) {
    if (QZFL.object.getType(value) == "array") {
        var _v = "\x00" + value.join("\x00") + "\x00";
        this.each(function (el) {
            if (/radio|checkbox/.test(el.type)) {
                el.checked = el.nodeType && ("\x00" + _v.indexOf(el.value.toString() + "\x00") > -1 || _v.indexOf("\x00" + el.name.toString() + "\x00") > -1);
            } else if (el.tagName == "SELECT") {
                QZFL.object.each(el.options, function (e) {
                    e.selected = e.nodeType == 1 && ("\x00" + _v.indexOf(e.value.toString() + "\x00") > -1 || _v.indexOf("\x00" + e.text.toString() + "\x00") > -1);
                });
            } else {
                el.value = value;
            }
        })
    } else {
        this.setAttr("value", value);
    }
}, getVal: function (index) {
    var _e = this.elements[index || 0], _v;
    if (_e) {
        if (_e.tagName == "SELECT") {
            _v = [];
            if (_e.selectedIndex < 0) {
                return null;
            }
            if (_e.type == "select-one") {
                _v.push(_e.value);
            } else {
                QZFL.object.each(_e.options, function (e) {
                    if (e.nodeType == 1 && e.selected) {
                        _v.push(e.value);
                    }
                });
            }
        } else {
            _v = _e.value;
        }
    } else {
        return null
    }
    return _v;
}, addClass: function (className) {
    this.each(function (el) {
        QZFL.css.addClassName(el, className);
    })
}, removeClass: function (className) {
    this.each(function (el) {
        QZFL.css.removeClassName(el, className);
    })
}, toggleClass: function (className) {
    this.each(function (el) {
        QZFL.css.toggleClassName(el, className);
    })
}, getSize: function (index) {
    var _e = this.elements[index || 0];
    return!!_e ? QZFL.dom.getSize(_e) : null;
}, getXY: function (index) {
    var _e = this.elements[index || 0];
    return!!_e ? QZFL.dom.getXY(_e) : null;
}, setSize: function (width, height) {
    this.each(function (el) {
        QZFL.dom.setSize(el, width, height);
    })
}, setXY: function (X, Y) {
    this.each(function (el) {
        QZFL.dom.setXY(el, X, Y);
    })
}, hide: function () {
    this.each(function (el) {
        QZFL.dom.setStyle(el, "display", "none");
    })
}, show: function () {
    this.each(function (el) {
        QZFL.dom.setStyle(el, "display", "");
    })
}, getStyle: function (key, index) {
    var _e = this.elements[index || 0];
    return!!_e ? QZFL.dom.getStyle(_e, key) : null;
}, setStyle: function (key, value) {
    this.each(function (el) {
        QZFL.dom.setStyle(el, key, value);
    })
}, setAttr: function (key, value) {
    this.each(function (el) {
        el[key] = value;
    })
}, getAttr: function (key, index) {
    var _e = this.elements[index || 0];
    return!!_e ? _e[key] : null;
}});
QZFL.element.extendFn({getPrev: function () {
    var _arr = [];
    this.each(function (el) {
        var _e = QZFL.dom.getPreviousSibling(el);
        _arr.push(_e);
    });
    return QZFL.element.get(_arr);
}, getNext: function () {
    var _arr = [];
    this.each(function (el) {
        var _e = QZFL.dom.getNextSibling(el);
        _arr.push(_e);
    });
    return QZFL.element.get(_arr);
}, getChildren: function () {
    var _arr = [];
    this.each(function (el) {
        var node = QZFL.dom.getFirstChild(el);
        while (node) {
            if (!!node && node.nodeType == 1) {
                _arr.push(node);
            }
            node = node.nextSibling;
        }
    });
    return QZFL.element.get(_arr);
}, getParent: function () {
    var _arr = [];
    this.each(function (el) {
        var _e = el.parentNode;
        _arr.push(_e);
    });
    return QZFL.element.get(_arr);
}});
QZFL.element.extendFn({create: function (tagName, attributes) {
    var _arr = [];
    this.each(function (el) {
        _arr.push(QZFL.dom.createElementIn(tagName, el, false, attributes));
    });
    return QZFL.element.get(_arr);
}, appendTo: function (el) {
    var el = (el.elements && el.elements[0]) || QZFL.dom.get(el);
    this.each(function (element) {
        el.appendChild(element)
    });
}, insertAfter: function (el) {
    var el = (el.elements && el.elements[0]) || QZFL.dom.get(el), _ns = el.nextSibling, _p = el.parentNode;
    this.each(function (element) {
        _p[!_ns ? "appendChild" : "insertBefore"](element, _ns);
    });
}, insertBefore: function (el) {
    var el = (el.elements && el.elements[0]) || QZFL.dom.get(el), _p = el.parentNode;
    this.each(function (element) {
        _p.insertBefore(this, element)
    });
}, remove: function () {
    this.each(function (el) {
        QZFL.dom.removeElement(el);
    })
}});
QZFL.queue = (function () {
    var _o = QZFL.object;
    var _queue = {};
    var _Queue = function (key, queue) {
        if (this instanceof arguments.callee) {
            this._qz_queuekey = key;
            return this;
        }
        if (_o.getType(queue = queue || []) == "array") {
            _queue[key] = queue;
        }
        return new _Queue(key);
    };
    var _extend = {push: function (key, fn) {
        fn = this._qz_queuekey ? key : fn;
        _queue[this._qz_queuekey || key].push(fn);
    }, shift: function (key) {
        var _q = _queue[this._qz_queuekey || key];
        if (_q) {
            return QZFL.queue._exec(_q.shift());
        }
    }, getLen: function (key) {
        return _queue[this._qz_queuekey || key].length;
    }, run: function (key) {
        var _q = _queue[this._qz_queuekey || key];
        if (_q) {
            _o.each(_queue[this._qz_queuekey || key], QZFL.queue._exec);
        }
    }, _exec: function (value, key, source) {
        if (!value || _o.getType(value) != "function") {
            if (_o.getType(key) == "number") {
                source[key] = null;
            }
            return false;
        }
        try {
            return value();
        } catch (e) {
            QZFL.console.print("QZFL Queue Got An Error: [" + e.name + "]  " + e.message, 1)
        }
    }};
    _o.extend(_Queue.prototype, _extend);
    _o.extend(_Queue, _extend);
    return _Queue;
})();
QZFL.util = {buildUri: function (s) {
    return QZFL.util.URI(s);
}, URI: function (s) {
    if (!QZFL.object.getType(s) == "string") {
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
                } else {
                    this.search = depart[1].substring(se, ha);
                }
            }
            return this;
        } else {
            return null;
        }
    } else {
        return null;
    }
}}
QZFL.XHR = function (actionURL, cname, method, data, isAsync, nocache) {
    if (!cname) {
        cname = "_xhrInstence_" + (QZFL.XHR.counter + 1);
    }
    var prot;
    if (QZFL.XHR.instance[cname]instanceof QZFL.XHR) {
        prot = QZFL.XHR.instance[cname];
    } else {
        prot = (QZFL.XHR.instance[cname] = this);
        QZFL.XHR.counter++;
    }
    prot._name = cname;
    prot._nc = !!nocache;
    prot._method = (typeof(method) != "string" || method.toUpperCase() != "GET") ? "POST" : (method = "GET");
    prot._isAsync = (!(isAsync === false)) ? true : isAsync;
    prot._uri = actionURL;
    prot._data = (typeof(data) == "object" || typeof(data) == 'string') ? data : {};
    prot._sender = null;
    prot._isHeaderSetted = false;
    prot._xmlQueue = QZFL.queue("xhr" + cname, [function () {
        return new XMLHttpRequest();
    }, function () {
        return new ActiveXObject("Msxml2.XMLHTTP");
    }, function () {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }]);
    this.onSuccess = QZFL.emptyFn;
    this.onError = QZFL.emptyFn;
    this.charset = "gb2312";
    this.proxyPath = "";
    return prot;
}
QZFL.XHR.instance = {};
QZFL.XHR.counter = 0;
QZFL.XHR._errCodeMap = {400: {msg: 'Bad Request'}, 401: {msg: 'Unauthorized'}, 403: {msg: 'Forbidden'}, 404: {msg: 'Not Found'}, 999: {msg: 'Proxy page error'}, 1000: {msg: 'Bad Response'}, 1001: {msg: 'No Network'}, 1002: {msg: 'No Data'}, 1003: {msg: 'Eval Error'}};
QZFL.XHR.xsend = function (o, uri) {
    if (!(o instanceof QZFL.XHR)) {
        return false;
    }
    if (ua.firefox && ua.firefox < 3) {
        return false;
    }
    function clear(obj) {
        try {
            obj._sender = obj._sender.callback = obj._sender.errorCallback = obj._sender.onreadystatechange = null;
        } catch (ignore) {
        }
        if (ua.safari || ua.opera) {
            setTimeout('removeNode($("_xsend_frm_' + obj._name + '"))', 50);
        } else {
            removeNode($("_xsend_frm_" + obj._name));
        }
    }

    if (o._sender === null || o._sender === void(0)) {
        var sender = document.createElement("iframe");
        sender.id = "_xsend_frm_" + o._name;
        sender.style.width = sender.style.height = sender.style.borderWidth = "0";
        document.body.appendChild(sender);
        sender.callback = QZFL.event.bind(o, function (data) {
            o.onSuccess(data);
            clear(o);
        });
        sender.errorCallback = QZFL.event.bind(o, function (num) {
            o.onError(QZFL.XHR._errCodeMap[num]);
            clear(o);
        });
        o._sender = sender;
    }
    var tmp = QZFL.config.gbEncoderPath;
    o.GBEncoderPath = tmp ? tmp : "";
    o._sender.src = uri.protocol + "://" + uri.host + (this.proxyPath ? this.proxyPath : "/xhr_proxy_gbk.html");
    return true;
}
QZFL.XHR.genHttpParamString = function (o) {
    var r = [];
    for (var i in o) {
        r.push(i + "=" + encodeURIComponent(o[i]));
    }
    return r.join("&");
};
QZFL.XHR.prototype.send = function () {
    if (this._method == 'POST' && this._data == null) {
        return false;
    }
    var u = new QZFL.util.URI(this._uri);
    if (u == null) {
        return false;
    }
    this._uri = u.href;
    if (typeof(this._data) == "object") {
        this._data = QZFL.XHR.genHttpParamString(this._data);
    }
    var d = this._data;
    if (this._method == 'GET') {
        this._uri += (this._uri.indexOf("?") < 0) ? ("?" + d) : ("&" + d);
        d = null;
    }
    if (u.host != location.host) {
        return QZFL.XHR.xsend(this, u);
    }
    if (this._sender === null || this._sender === void(0)) {
        var sender = (function () {
            if (!this._xmlQueue.getLen()) {
                return null;
            }
            var _xhr = this._xmlQueue.shift();
            if (_xhr) {
                return _xhr;
            } else {
                return arguments.callee.call(this);
            }
        }).call(this);
        if (!sender) {
            return false;
        }
        this._sender = sender;
    }
    try {
        this._sender.open(this._method, this._uri, this._isAsync);
    } catch (err) {
        return false;
    }
    if (this._method == 'POST' && !this._isHeaderSetted) {
        this._sender.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        this._isHeaderSetted = true;
    }
    if (this._nc) {
        this._sender.setRequestHeader('If-Modified-Since', 'Thu, 1 Jan 1970 00:00:00 GMT');
        this._sender.setRequestHeader('Cache-Control', 'no-cache');
    }
    this._sender.onreadystatechange = QZFL.event.bind(this, function () {
        try {
            if (this._sender.readyState == 4) {
                if (this._sender.status >= 200 && this._sender.status < 300) {
                    this.onSuccess({text: this._sender.responseText, xmlDom: this._sender.responseXML});
                } else {
                    if (ua.safari && (typeof(this._sender.status) == 'undefined')) {
                        this.onError(QZFL.XHR._errCodeMap[1002]);
                    } else {
                        this.onError(QZFL.XHR._errCodeMap[this._sender.status]);
                    }
                }
                delete this._sender;
                this._sender = null;
            }
        } catch (err) {
        }
    });
    this._sender.send(d);
    return true;
};
QZFL.XHR.prototype.destroy = function () {
    var n = this._name;
    delete QZFL.XHR.instance[n]._sender;
    QZFL.XHR.instance[n]._sender = null;
    delete QZFL.XHR.instance[n];
    QZFL.XHR.counter--;
    return null;
};
QZFL.FormSender = function (actionURL, method, data, charset) {
    this.name = "_fpInstence_" + QZFL.FormSender.counter;
    QZFL.FormSender.instance[this.name] = this;
    QZFL.FormSender.counter++;
    if (typeof(actionURL) == 'object' && actionURL.nodeType == 1 && actionURL.tagName == 'FORM') {
        this.instanceForm = actionURL;
    } else {
        this.method = method || "POST";
        this.uri = actionURL;
        this.data = (typeof(data) == "object" || typeof(data) == 'string') ? data : null;
        this.proxyURL = (typeof(charset) == 'string' && charset.toUpperCase() == "UTF-8") ? QZFL.config.FSHelperPage.replace(/_gbk/, "_utf8") : QZFL.config.FSHelperPage;
    }
    this._sender = null;
    this.onSuccess = QZFL.emptyFn;
    this.onError = QZFL.emptyFn;
};
QZFL.FormSender.instance = {};
QZFL.FormSender.counter = 0;
QZFL.FormSender._errCodeMap = {999: {msg: 'Connection or Server error'}};
QZFL.FormSender.pluginsPool = {"formHandler": []};
QZFL.FormSender._pluginsRunner = function (pType, data) {
    var _s = QZFL.FormSender, l = _s.pluginsPool[pType], t = data, len;
    if (l && (len = l.length)) {
        for (var i = 0; i < len; ++i) {
            if (typeof(l[i]) == "function") {
                t = l[i](t);
            }
        }
    }
    return t;
};
QZFL.FormSender.prototype.send = function () {
    if (this.method == 'POST' && this.data == null) {
        return false;
    }
    function clear(o) {
        o._sender = o._sender.callback = o._sender.errorCallback = o._sender.onreadystatechange = null;
        if (QZFL.userAgent.safari || QZFL.userAgent.opera) {
            setTimeout('QZFL.dom.removeElement(document.getElementById("_fp_frm_' + o.name + '"))', 50);
        } else {
            QZFL.dom.removeElement(document.getElementById("_fp_frm_" + o.name));
        }
        o.instanceForm = null;
    }

    if (this._sender === null || this._sender === void(0)) {
        var sender = this.instanceForm ? QZFL.dom.createNamedElement("iframe", "_fp_frm_" + this.name) : document.createElement("iframe");
        sender.id = "_fp_frm_" + this.name;
        sender.style.cssText = "width:0;height:0;border-width:0;display:none;";
        document.body.appendChild(sender);
        sender.callback = QZFL.event.bind(this, function (o) {
            clearTimeout(timer);
            this.onSuccess(o);
            clear(this);
        });
        sender.errorCallback = QZFL.event.bind(this, function (o) {
            clearTimeout(timer);
            this.onError(o);
            clear(this);
        });
        if (typeof(sender.onreadystatechange) != 'undefined') {
            sender.onreadystatechange = QZFL.event.bind(this, function () {
                if (this._sender.readyState == 'complete' && this._sender.submited) {
                    clear(this);
                    this.onError(QZFL.FormSender._errCodeMap[999]);
                }
            });
        } else {
            var timer = setTimeout(QZFL.event.bind(this, function () {
                try {
                    var _t = this._sender.contentWindow.location.href;
                    if (_t.indexOf(this.uri) == 0) {
                        clearTimeout(timer);
                        clear(this);
                        this.onError(QZFL.FormSender._errCodeMap[999]);
                    }
                } catch (err) {
                    clearTimeout(timer);
                    clear(this);
                    this.onError(QZFL.FormSender._errCodeMap[999]);
                }
            }), 1500);
        }
        this._sender = sender;
    }
    if (!this.instanceForm) {
        this._sender.src = this.proxyURL;
    } else {
        this.instanceForm.target = (sender.name = sender.id);
        this._sender.submited = true;
        this.instanceForm.submit();
    }
    return true;
};
QZFL.FormSender.prototype.destroy = function () {
    var n = this.name;
    delete QZFL.FormSender.instance[n]._sender;
    QZFL.FormSender.instance[n]._sender = null;
    delete QZFL.FormSender.instance[n];
    QZFL.FormSender.counter--;
    return null;
};
QZFL.JsLoader = function (isDebug) {
    this.loaded = false;
    this.debug = isDebug || (QZFL.config.debugLevel > 1);
    this.onload = QZFL.emptyFn;
    this.onerror = QZFL.emptyFn;
}
QZFL.JsLoader.scriptId = 1;
QZFL.JsLoader.prototype.load = function (src, doc, charset) {
    var sId = QZFL.JsLoader.scriptId;
    QZFL.JsLoader.scriptId++;
    var o = this;
    setTimeout(function () {
        o._load2.apply(o, [sId, src, doc, charset]);
        o = null;
    }, 0);
}
QZFL.JsLoader.prototype._load2 = function (sId, src, doc, charset) {
    _doc = doc || document;
    charset = charset || "gb2312";
    var _ie = QZFL.userAgent.ie, _js = _doc.createElement("script");
    QZFL.event.addEvent(_js, (_ie ? "readystatechange" : "load"), (function (o) {
        return(function () {
            if (_ie) {
                if (_js && !(_js.readyState == "complete" || _js.readyState == "loaded")) {
                    return;
                }
            }
            o.onload();
            if (!o.debug) {
                QZFL.dom.removeElement(_js);
            }
            _js = null;
        });
    })(this));
    if (!_ie) {
        QZFL.event.addEvent(_js, "error", (function (o) {
            return(function () {
                o.onerror();
                if (!o.debug) {
                    QZFL.dom.removeElement(_js);
                }
                _js = null;
            });
        })(this));
    }
    _js.id = "js_" + sId;
    _js.defer = true;
    _js.charset = charset;
    _js.src = src;
    _doc.getElementsByTagName("head")[0].appendChild(_js);
};
QZFL["js" + "Loader"] = QZFL.JsLoader;
QZFL.JSONGetter = function (actionURL, cname, data, charset, junctionMode) {
    if (QZFL.object.getType(cname) != "string") {
        cname = "_jsonInstence_" + (QZFL.JSONGetter.counter + 1);
    }
    var prot = QZFL.JSONGetter.instance[cname];
    if (prot instanceof QZFL.JSONGetter) {
    } else {
        QZFL.JSONGetter.instance[cname] = prot = this;
        QZFL.JSONGetter.counter++;
        prot._name = cname;
        prot._sender = null;
        prot._timer = null;
        this.onSuccess = QZFL.emptyFn;
        this.onError = QZFL.emptyFn;
        this.onTimeout = QZFL.emptyFn;
        this.timeout = 5000;
        this.clear = QZFL.emptyFn;
        this._baseClear = function () {
            this._waiting = false;
            this._squeue = [];
            this._equeue = [];
            this.onSuccess = this.onError = QZFL.emptyFn;
            this.clear = null;
        };
    }
    prot._uri = actionURL;
    prot._data = (data && (QZFL.object.getType(data) == "object" || QZFL.object.getType(data) == "string")) ? data : null;
    prot._charset = (QZFL.object.getType(charset) != 'string') ? QZFL.config.defaultDataCharacterSet : charset;
    prot._jMode = !!junctionMode;
    return prot;
};
QZFL.JSONGetter.instance = {};
QZFL.JSONGetter.counter = 0;
QZFL.JSONGetter._errCodeMap = {999: {msg: 'Connection or Server error.'}, 998: {msg: 'Connection to Server timeout.'}};
QZFL.JSONGetter.genHttpParamString = function (o) {
    var r = [];
    for (var i in o) {
        r.push(i + "=" + encodeURIComponent(o[i]));
    }
    return r.join("&");
};
QZFL.JSONGetter.prototype.addOnSuccess = function (f) {
    if (typeof(f) == "function") {
        if (this._squeue && this._squeue.push) {
        } else {
            this._squeue = [];
        }
        this._squeue.push(f);
    }
};
QZFL.JSONGetter._runFnQueue = function (q, resultArgs, th) {
    var f;
    if (q && q.length) {
        while (q.length > 0) {
            f = q.shift();
            if (typeof(f) == "function") {
                f.apply(th ? th : null, resultArgs);
            }
        }
    }
};
QZFL.JSONGetter.prototype.addOnError = function (f) {
    if (typeof(f) == "function") {
        if (this._equeue && this._equeue.push) {
        } else {
            this._equeue = [];
        }
        this._equeue.push(f);
    }
};
QZFL.JSONGetter.pluginsPool = {"srcStringHandler": []};
QZFL.JSONGetter._pluginsRunner = function (pType, data) {
    var _s = QZFL.JSONGetter, l = _s.pluginsPool[pType], t = data, len;
    if (l && (len = l.length)) {
        for (var i = 0; i < len; ++i) {
            if (typeof(l[i]) == "function") {
                t = l[i](t);
            }
        }
    }
    return t;
};
QZFL.JSONGetter.prototype.send = function (callbackFnName) {
    if (this._waiting) {
        return;
    }
    var clear, cfn = (QZFL.object.getType(callbackFnName) != 'string') ? "callback" : callbackFnName, da = this._uri;
    if (this._data) {
        da += (da.indexOf("?") < 0 ? "?" : "&") + ((typeof(this._data) == "object") ? QZFL.JSONGetter.genHttpParamString(this._data) : this._data);
    }
    da = QZFL.JSONGetter._pluginsRunner("srcStringHandler", da);
    if (this._jMode) {
        window[cfn] = this.onSuccess;
        var _sd = new QZFL.JsLoader();
        _sd.onerror = this.onError;
        _sd.load(da, void(0), this._charset);
        return;
    }
    this._timer = setTimeout((function (th) {
        return function () {
            th._waiting = false;
            th.onTimeout();
        };
    })(this), this.timeout);
    if (QZFL.userAgent.ie && !(QZFL.userAgent.beta && navigator.appVersion.indexOf("Trident\/4.0") > -1)) {
        var df = document.createDocumentFragment(), sender = (QZFL.userAgent.ie == 9 ? document : df).createElement("script");
        sender.charset = this._charset;
        this._senderDoc = df;
        this._sender = sender;
        this.clear = clear = function (o) {
            clearTimeout(o._timer);
            if (o._sender) {
                o._sender.onreadystatechange = null;
            }
            df = o._senderDoc = o._sender = null;
            o._baseClear();
        };
        df[cfn] = (function (th) {
            return(function () {
                th._waiting = false;
                th.onSuccess.apply(th, arguments);
                QZFL.JSONGetter._runFnQueue(th._squeue, arguments, th);
                clear(th);
            });
        })(this);
        if (QZFL.userAgent.ie < 9) {
            sender.onreadystatechange = (function (th) {
                return(function () {
                    if (th._sender && th._sender.readyState == "loaded") {
                        try {
                            th._onError();
                        }
                        catch (ignore) {
                        }
                    }
                });
            })(this);
        } else {
            sender.onerror = (function (th) {
                return(function () {
                    try {
                        th._onError();
                    }
                    catch (ignore) {
                    }
                });
            })(this);
        }
        this._waiting = true;
        df.appendChild(sender);
        this._sender.src = da;
    } else {
        this.clear = clear = function (o) {
            clearTimeout(o._timer);
            if (o._sender) {
                o._sender.src = "about:blank";
                o._sender = o._sender.callback = o._sender.errorCallback = null;
            }
            if (QZFL.userAgent.safari || QZFL.userAgent.opera) {
                setTimeout('QZFL.dom.removeElement($("_JSON_frm_' + o._name + '"))', 50);
            } else {
                QZFL.dom.removeElement($("_JSON_frm_" + o._name));
            }
            o._baseClear();
        };
        var _cb = (function (th) {
            return(function () {
                th._waiting = false;
                th.onSuccess.apply(th, arguments);
                QZFL.JSONGetter._runFnQueue(th._squeue, arguments, th);
                clear(th);
            });
        })(this);
        var _ecb = (function (th) {
            return(function () {
                th._waiting = false;
                var _eo = QZFL.JSONGetter._errCodeMap[999];
                th.onError(_eo);
                QZFL.JSONGetter._runFnQueue(th._equeue, [_eo], th);
                clear(th);
            });
        })(this);
        var frm = document.createElement("iframe");
        frm.id = "_JSON_frm_" + this._name;
        frm.style.width = frm.style.height = frm.style.borderWidth = "0";
        this._sender = frm;
        var _dm = (document.domain == location.host) ? '' : 'document.domain="' + document.domain + '";', dout = '<html><head><meta http-equiv="Content-type" content="text/html; charset=' + this._charset + '"/></head><body><script>' + _dm + ';function ' + cfn + '(){frameElement.callback.apply(null, arguments);}<\/script><script charset="' + this._charset + '" src="' + da + '"><\/script><script>setTimeout(frameElement.errorCallback,50);<\/script></body></html>';
        frm.callback = _cb;
        frm.errorCallback = _ecb;
        this._waiting = true;
        if (QZFL.userAgent.chrome || QZFL.userAgent.opera || QZFL.userAgent.firefox < 3) {
            frm.src = "javascript:'" + encodeURIComponent(QZFL.string.escString(dout)) + "'";
            document.body.appendChild(frm);
        } else {
            document.body.appendChild(frm);
            frm.contentWindow.document.open('text/html');
            frm.contentWindow.document.write(dout);
            frm.contentWindow.document.close();
        }
    }
};
QZFL.JSONGetter.prototype._onError = function () {
    this._waiting = false;
    var _eo = QZFL.JSONGetter._errCodeMap[999];
    this.onError(_eo);
    QZFL.JSONGetter._runFnQueue(this._equeue, [_eo], this);
    this.clear(this);
};
QZFL.JSONGetter.prototype.destroy = QZFL.emptyFn;
QZFL.enviroment = (function () {
    var _p = {}, hookPool = {};

    function envGet(kname) {
        return _p[kname];
    }

    function envDel(kname) {
        delete _p[kname];
        return true;
    }

    function envSet(kname, value) {
        if (typeof value == 'undefined') {
            if (typeof kname == 'undefined') {
                return false;
            } else if (!(_p[kname] === undefined)) {
                return false;
            }
        } else {
            _p[kname] = value;
            return true;
        }
    }

    return{get: envGet, set: envSet, del: envDel, hookPool: hookPool};
})();
var ENV = QZFL.enviroment;
QZFL.pageEvents = (function () {
    function _ihp() {
        var qs = location.search.substring(1), qh = location.hash.substring(1), s, h, n;
        ENV.set("_queryString", qs);
        ENV.set("_queryHash", qh);
        ENV.set("queryString", s = QZFL.util.splitHttpParamString(qs));
        ENV.set("queryHash", h = QZFL.util.splitHttpParamString(qh));
        if (s && s.DEBUG) {
            n = parseInt(s.DEBUG, 10);
            if (!isNaN(n)) {
                QZFL.config.debugLevel = n;
            }
        }
    }

    function _bootStrap() {
        if (document.addEventListener) {
            if (ua.safari) {
                var interval = setInterval(function () {
                    if ((/loaded|complete/).test(document.readyState)) {
                        _onloadHook();
                        clearInterval(interval);
                    }
                }, 50);
            } else {
                document.addEventListener("DOMContentLoaded", _onloadHook, true);
            }
        } else {
            var src = 'javascript:void(0)';
            if (window.location.protocol == 'https:') {
                src = '//:';
            }
            document.write('<script onreadystatechange="if(this.readyState==\'complete\'){this.parentNode.removeChild(this);QZFL.pageEvents._onloadHook();}" defer="defer" src="' + src + '"><\/script\>');
        }
        window.onload = QZFL.lang.chain(window.onload, function () {
            _onloadHook();
            _runHooks('onafterloadhooks');
        });
        window.onbeforeunload = function () {
            return _runHooks('onbeforeunloadhooks');
        };
        window.onunload = QZFL.lang.chain(window.onunload, function () {
            _runHooks('onunloadhooks');
        });
    }

    function _onloadHook() {
        _runHooks('onloadhooks');
        QZFL.enviroment.loaded = true;
    }

    function _runHook(handler) {
        try {
            handler();
        } catch (ex) {
        }
    }

    function _runHooks(hooks) {
        var isbeforeunload = (hooks == 'onbeforeunloadhooks'), warn = null, hc = window.ENV.hookPool;
        do {
            var h = hc[hooks];
            if (!isbeforeunload) {
                hc[hooks] = null;
            }
            if (!h) {
                break;
            }
            for (var ii = 0; ii < h.length; ii++) {
                if (isbeforeunload) {
                    warn = warn || h[ii]();
                } else {
                    h[ii]();
                }
            }
            if (isbeforeunload) {
                break;
            }
        } while (hc[hooks]);
        if (isbeforeunload) {
            if (warn) {
                return warn;
            } else {
                QZFL.enviroment.loaded = false;
            }
        }
    }

    function _addHook(hooks, handler) {
        var c = window.ENV.hookPool;
        (c[hooks] ? c[hooks] : (c[hooks] = [])).push(handler);
    }

    function _insertHook(hooks, handler, position) {
        var c = window.ENV.hookPool;
        if (typeof(position) == 'number' && position >= 0 && c[hooks]) {
            c[hooks].splice(position, 0, handler);
        } else {
            return false;
        }
    }

    function _lr(handler) {
        QZFL.enviroment.loaded ? _runHook(handler) : _addHook('onloadhooks', handler);
    }

    function _bulr(handler) {
        _addHook('onbeforeunloadhooks', handler);
    }

    function _ulr(handler) {
        _addHook('onunloadhooks', handler);
    }

    function pinit() {
        _bootStrap();
        _ihp();
        ua.adjustBehaviors();
        var _dt = $("__DEBUG_out");
        if (_dt) {
            ENV.set("dout", _dt);
        }
        var __dalert;
        if (!ENV.get("alertConverted")) {
            __dalert = alert;
            eval('var alert=function(msg){if(msg!=undefined){__dalert(msg);return msg;}}');
            ENV.set("alertConverted", true);
        }
        var t = ENV.get("queryHash");
        if (t && t.DEBUG) {
            QZFL.config.debugLevel = 2;
        }
    }

    return{onloadRegister: _lr, onbeforeunloadRegister: _bulr, onunloadRegister: _ulr, initHttpParams: _ihp, bootstrapEventHandlers: _bootStrap, _onloadHook: _onloadHook, insertHooktoHooksQueue: _insertHook, pageBaseInit: pinit};
})();
QZFL.lang = {isString: function (o) {
    return QZFL.object.getType(o) == "string";
}, isArray: function (o) {
    return QZFL.object.getType(o) == "array";
}, isHashMap: function (o) {
    return QZFL.object.getType(o) == "object";
}, isNode: function (o) {
    if (typeof(Node) == 'undefined') {
        Node = null;
    }
    try {
        if (!o || !((Node != undefined && o instanceof Node) || o.nodeName)) {
            return false;
        }
    } catch (ignored) {
        return false;
    }
    return true;
}, isElement: function (o) {
    return o && o.nodeType == 1;
}, isValidXMLdom: function (o) {
    if (!o) {
        return false;
    }
    if (!o.xml) {
        return false;
    }
    if (o.xml == "") {
        return false;
    }
    if (!(/^<\?xml/.test(o.xml))) {
        return false;
    }
    return true;
}, arg2arr: function (refArgs, start) {
    if (typeof start == 'undefined') {
        start = 0;
    }
    return Array.prototype.slice.apply(refArgs, [start, refArgs.length]);
}, getObjByNameSpace: function (ns, setup) {
    if (typeof(ns) != 'string') {
        return ns;
    }
    var l = ns.split("."), r = window;
    try {
        for (var i = 0, len = l.length; i < len; ++i) {
            if (typeof(r[l[i]]) == 'undefined') {
                if (setup) {
                    r[l[i]] = {};
                } else {
                    return void(0);
                }
            }
            r = r[l[i]];
        }
        return r;
    } catch (ignore) {
        return void(0);
    }
}, objectClone: function (obj, preventName) {
    if ((typeof obj) == 'object') {
        var res = (QZFL.lang.isArray(obj)) ? [] : {};
        for (var i in obj) {
            if (i != preventName)
                res[i] = objectClone(obj[i], preventName);
        }
        return res;
    } else if ((typeof obj) == 'function') {
        return(new obj()).constructor;
    }
    return obj;
}, obj2str: function (obj) {
    var t, sw;
    if ((typeof obj) == 'object') {
        if (obj === null) {
            return'null';
        }
        sw = QZFL.lang.isArray(obj);
        t = [];
        for (var i in obj) {
            t.push((sw ? "" : ("\"" + QZFL.string.escString(i) + "\":")) + obj2str(obj[i]));
        }
        t = t.join();
        return sw ? ("[" + t + "]") : ("{" + t + "}");
    } else if ((typeof obj) == 'function') {
        return'';
    } else if ((typeof obj) == 'undefined') {
        return'undefined';
    } else if ((typeof obj) == 'number') {
        return obj.toString();
    }
    return!obj ? "\"\"" : ("\"" + QZFL.string.escString(obj) + "\"");
}, propertieCopy: function (s, b, propertiSet, notOverWrite) {
    var l = (!propertiSet || typeof(propertiSet) != 'object') ? b : propertiSet;
    s = s || {};
    for (var p in l) {
        if (!notOverWrite || !(p in s)) {
            s[p] = l[p];
        }
    }
    return s;
}, tryThese: function () {
    var res;
    for (var ii = 0, len = arguments.length; ii < len; ii++) {
        try {
            res = arguments[ii]();
            return res;
        } catch (ignore) {
        }
    }
    return res;
}, chain: function (u, v) {
    var calls = [];
    for (var ii = 0, len = arguments.length; ii < len; ii++) {
        calls.push(arguments[ii]);
    }
    return(function () {
        for (var ii = 0, len = calls.length; ii < len; ii++) {
            if (calls[ii] && calls[ii].apply(null, arguments) === false) {
                return false;
            }
        }
        return true;
    });
}, uniqueArray: function (arr) {
    var flag = {};
    var index = 0;
    while (index < arr.length) {
        if (flag[arr[index]] == typeof(arr[index])) {
            arr.splice(index, 1);
            continue;
        }
        flag[arr[index].toString()] = typeof(arr[index]);
        ++index;
    }
    return arr;
}};
QZFL.namespace.map(QZFL.lang);
(function () {
    QZFL.object.extend(QZFL.string, {RegExps: {trim: /^\s*|\s*$/g, ltrim: /^\s*/g, rtrim: /\s*$/g, nl2br: /\n/g, s2nb: /[\x20]{2}/g, URIencode: /[\x09\x0A\x0D\x20\x21-\x29\x2B\x2C\x2F\x3A-\x3F\x5B-\x5E\x60\x7B-\x7E]/g, escHTML: {re_amp: /&/g, re_lt: /</g, re_gt: />/g, re_apos: /\x27/g, re_quot: /\x22/g}, escString: {bsls: /\\/g, nl: /\n/g, rt: /\r/g, tab: /\t/g}, restXHTML: {re_amp: /&amp;/g, re_lt: /&lt;/g, re_gt: /&gt;/g, re_apos: /&(?:apos|#0?39);/g, re_quot: /&quot;/g}, write: /\{(\d{1,2})(?:\:([xodQqb]))?\}/g, isURL: /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i, cut: /[\x00-\xFF]/, getRealLen: {r0: /[^\x00-\xFF]/g, r1: /[\x00-\xFF]/g}}, commonReplace: function (s, p, r) {
        return s.replace(p, r);
    }, listReplace: function (s, l) {
        if (isHashMap(l)) {
            for (var i in l) {
                s = (QZFL.string.commonReplace(s, l[i], i) || s);
            }
            return s;
        } else {
            return s;
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
            } else if (a == "\x0D") {
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
        var t = QZFL.string.RegExps.escString;
        return QZFL.string.listReplace((str + ""), {'\\\\': t.bsls, '\\n': t.nl, '': t.rt, '\\t': t.tab, '\\\'': t.re_apos, '\\"': t.re_quot});
    }, restHTML: function (str) {
        if (!QZFL.string.restHTML.__utilDiv) {
            QZFL.string.restHTML.__utilDiv = document.createElement("div");
        }
        var t = QZFL.string.restHTML.__utilDiv;
        t.innerHTML = (str + "");
        if (typeof(t.innerText) != 'undefined') {
            return t.innerText;
        } else if (typeof(t.textContent) != 'undefined') {
            return t.textContent;
        } else if (typeof(t.text) != 'undefined') {
            return t.text;
        } else {
            return'';
        }
    }, restXHTML: function (str) {
        var t = QZFL.string.RegExps.restXHTML;
        return QZFL.string.listReplace((str + ""), {'<': t.re_lt, '>': t.re_gt, '\x27': t.re_apos, '\x22': t.re_quot, '&': t.re_amp});
    }, write: function (strFormat, someArgs) {
        if (arguments.length < 1 || !isString(strFormat)) {
            return'';
        }
        var rArr = arg2arr(arguments), result = rArr.shift(), tmp;
        return result.replace(QZFL.string.RegExps.write, function (a, b, c) {
            b = parseInt(b, 10);
            if (b < 0 || (typeof rArr[b] == 'undefined')) {
                return'(n/a)';
            } else {
                if (!c) {
                    return rArr[b];
                } else {
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
    }, customEncode: function (s, type) {
        var r;
        if (typeof type == 'undefined') {
            type = '';
        }
        switch (type.toUpperCase()) {
            case"URICPT":
                r = encodeURIComponent(s);
                break;
            default:
                r = encodeURIComponent(s);
        }
        return r;
    }, escapeURI: function (s) {
        if (!isString(s)) {
            return'';
        }
        if (window.encodeURIComponent) {
            return encodeURIComponent(s);
        }
        if (window.escape) {
            return escape(s);
        }
    }, parseXML: function (text) {
        if (window.ActiveXObject) {
            var doc = QZFL.lang.tryThese(function () {
                return new ActiveXObject('MSXML2.DOMDocument.6.0');
            }, function () {
                return new ActiveXObject('MSXML2.DOMDocument.5.0');
            }, function () {
                return new ActiveXObject('MSXML2.DOMDocument.4.0');
            }, function () {
                return new ActiveXObject('MSXML2.DOMDocument.3.0');
            }, function () {
                return new ActiveXObject('MSXML2.DOMDocument');
            }, function () {
                return new ActiveXObject('Microsoft.XMLDOM');
            });
            doc.async = "false";
            doc.loadXML(text);
            if (doc.parseError.reason) {
                return null;
            }
        } else {
            var parser = new DOMParser();
            var doc = parser.parseFromString(text, "text/xml");
            if (doc.documentElement.nodeName == 'parsererror') {
                return null;
            }
        }
        var x = doc.documentElement;
        return x;
    }, fillLength: function (s, l, ss, isBack) {
        if (typeof(s) != 'string') {
            s = s.toString();
        }
        if (s.length < l) {
            var res = (1 << (l - s.length)).toString(2).substring(1);
            if (typeof(ss) != 'undefined' && !!ss) {
                res = res.replace("0", ss.toString()).substring(1);
            }
            return isBack ? (s + res) : (res + s);
        } else {
            return s;
        }
    }, cut: function (s, bl, tails) {
        if (typeof(s) != 'string')
            return'';
        if (typeof(tails) == 'undefined')
            tails = "";
        if (getRealLen(s) <= bl) {
            return s;
        }
        var res = [], tmp;
        for (var i = 0, cnt = 0, len = s.length; i < len && cnt < bl; ++i) {
            res.push(tmp = s.charAt(i));
            if (QZFL.string.RegExps.cut.test(tmp)) {
                cnt++;
            } else {
                cnt += 2;
            }
        }
        return res.join("") + tails;
    }, getRealLen: function (s, isUTF8) {
        if (typeof(s) != 'string') {
            return 0;
        }
        if (!isUTF8) {
            return s.replace(QZFL.string.RegExps.getRealLen.r0, "**").length;
        } else {
            var cc = s.replace(QZFL.string.RegExps.getRealLen.r1, "");
            return(s.length - cc.length) + (encodeURI(cc).length / 3);
        }
    }})
})();
QZFL.string.timeFormatString = function (s, format, t0) {
    var n, _s = QZFL.string.timeFormatString;
    if (!_s._init) {
        _s._dL = ["_ds", "_dm", "_dh", "_dd", "_dM", "_dy"];
        _s.re = /\{([_yYMdhms]{1,2})(\:[\d\w\s]|)\}/g;
        QZFL.object.each([1000, 60, 60, 24, 30, 12], function (value, key) {
            _s[_s._dL[key]] = !_s._dL[key - 1] ? value : _s[_s._dL[key - 1]] * value;
        });
        _s._init = true;
    }
    if (typeof(s) == 'number') {
        n = new Date();
        n.setTime(s);
        s = n;
    }
    if (typeof(s) == 'object') {
        try {
            s.getTime();
        } catch (err) {
            return"";
        }
        if (typeof(format) != 'string') {
            return s.toString();
        } else {
            return format.replace(_s.re, function (a, b, c) {
                var tmp = _s._fnSplit[b];
                return(typeof(tmp) == "function") ? tmp(s, c, _s, t0) : a;
            });
        }
    }
}
QZFL.string.timeFormatString._fnSplit = {'y': function (s, c) {
    var tmp = s.getYear().toString();
    return QZFL.string.fillLength(tmp.substring(tmp.length - 2), 2);
}, '_y': function (s, c, _s, t0) {
    var tmp = Math.abs(s - t0) / _s._dy;
    return Math.floor(tmp);
}, 'Y': function (s, c) {
    return QZFL.string.fillLength(s.getFullYear(), 2);
}, 'M': function (s, c) {
    return QZFL.string.fillLength(s.getMonth() + 1, 2, c);
}, '_M': function (s, c, _s, t0) {
    var tmp = Math.abs(s - t0) / _s._dM;
    return Math.floor(tmp);
}, 'd': function (s, c) {
    return QZFL.string.fillLength(s.getDate(), 2, c);
}, '_d': function (s, c, _s, t0) {
    var tmp = Math.abs(s - t0) / _s._dd;
    return Math.floor(tmp);
}, 'h': function (s, c) {
    return QZFL.string.fillLength(s.getHours(), 2, c);
}, '_h': function (s, c, _s, t0) {
    var tmp = Math.abs(s - t0) / _s._dh;
    return Math.floor(tmp);
}, 'm': function (s, c) {
    return QZFL.string.fillLength(s.getMinutes(), 2);
}, '_m': function (s, c, _s, t0) {
    var tmp = Math.abs(s - t0) / _s._dm;
    return Math.floor(tmp);
}, 's': function (s, c) {
    return QZFL.string.fillLength(s.getSeconds(), 2);
}, '_s': function (s, c, _s, t0) {
    var tmp = Math.abs(s - t0) / _s._ds;
    return Math.floor(tmp);
}};
QZFL.string.StringBuilder = function () {
    this._strList = arg2arr(arguments);
};
QZFL.string.StringBuilder.prototype = {append: function (str) {
    if (isString(str)) {
        this._strList.push(str.toString());
    }
}, insertFirst: function (str) {
    if (isString(str)) {
        this._strList.unshift(str.toString());
    }
}, appendArray: function (arr) {
    if (isArray(arr)) {
        this._strList = this._strList.concat(arr);
    }
}, toString: function (spliter) {
    return this._strList.join(!spliter ? '' : spliter);
}, clear: function () {
    this._strList.splice(0, this._strList.length);
}};
;
(function () {
    QZFL.object.extend(QZFL.util, {copyToClip: function (text) {
        if (ua.ie) {
            return clipboardData.setData("Text", text);
        } else {
            var o = QZFL.shareObject.getValidSO();
            return o ? o.setClipboard(text) : false;
        }
    }, evalGlobal: function (js) {
        var obj = document.createElement('script');
        obj.type = 'text/javascript';
        obj.id = "__evalGlobal_" + QZFL.util.evalGlobal._counter;
        try {
            obj.innerHTML = js;
        } catch (e) {
            obj.text = js;
        }
        document.body.appendChild(obj);
        QZFL.util.evalGlobal._counter++;
        setTimeout('removeNode($("' + obj.id + '"));', 50);
    }, runStyleGlobal: function (st) {
        if (ua.safari) {
            var obj = document.createElement('style');
            obj.type = 'text/css';
            obj.id = "__runStyle_" + QZFL.util.runStyleGlobal._counter;
            try {
                obj.textContent = st;
            } catch (e) {
                alert(e.message);
            }
            var h = document.getElementsByTagName("head")[0];
            if (h) {
                h.appendChild(obj);
                QZFL.util.runStyleGlobal._counter++;
            }
        } else {
            rt.warn("plz use runStyleGlobal() in Safari!");
        }
    }, genHttpParamString: function (o) {
        if (QZFL.lang.isHashMap(o)) {
            var r = new QZFL.string.StringBuilder();
            try {
                for (var i in o) {
                    r.append(i + "=" + QZFL.string.customEncode(o[i], "URICPT"));
                }
            } catch (ignore) {
                return'';
            }
            return r.toString("&");
        } else if (typeof(o) == 'string') {
            return o;
        } else {
            return'';
        }
    }, splitHttpParamString: function (s) {
        return QZFL.util.commonDictionarySplit(s, "&");
    }, commonDictionarySplit: function (s, esp, vq) {
        if (typeof(esp) == 'undefined') {
            esp = "&";
        }
        if (typeof(vq) == 'undefined') {
            vq = "";
        }
        var re_vq = new RegExp("^" + vq + "|" + vq + "$", "g");
        if (isString(s)) {
            var l = s.split(vq + esp), tmp, res = {};
            for (var i = 0, len = l.length; i < len; i++) {
                tmp = l[i].split("=");
                if (tmp.length > 1) {
                    res[tmp[0]] = (tmp.slice(1).join("=")).replace(re_vq, "");
                } else {
                    res[l[i]] = true;
                }
            }
            return res;
        } else {
            return{};
        }
    }});
    QZFL.util.evalGlobal._counter = 0;
    QZFL.util.runStyleGlobal._counter = 0;
})();
QZFL.media = {_tempImageList: [], _flashVersion: null, adjustImageSize: function (w, h, trueSrc, callback) {
    var ele = QZFL.event.getTarget();
    if (ua.firefox < 3 && ele === document) {
        ele = QZFL.event.getEvent().currentTarget;
    }
    ele.onload = null;
    var offset, _c = QZFL.media._tempImageList;
    _c[offset = _c.length] = new Image();
    _c[offset].onload = (function (mainImg, tempImg, ew, eh) {
        return function () {
            tempImg.onload = null;
            var ow = tempImg.width, oh = tempImg.height;
            if (ow / oh > ew / eh) {
                if (ow > ew) {
                    mainImg.width = ew;
                }
            } else {
                if (oh > eh) {
                    mainImg.height = eh;
                }
            }
            mainImg.src = tempImg.src;
            _c[offset] = null;
            delete _c[offset];
            if (typeof(callback) == 'function') {
                callback(mainImg, w, h, tempImg, ow, oh);
            }
        };
    })(ele, _c[offset], w, h);
    _c[offset].onerror = function () {
        _c[offset] = null;
        delete _c[offset];
    };
    _c[offset].src = trueSrc;
}, getFlashHtml: function (flashArguments, requiredVersion, flashPlayerCID) {
    var _attrs = new QZFL.string.StringBuilder(), _params = new QZFL.string.StringBuilder();
    if (typeof(flashPlayerCID) == 'undefined') {
        flashPlayerCID = 'D27CDB6E-AE6D-11cf-96B8-444553540000';
    }
    for (var k in flashArguments) {
        switch (k) {
            case"movie":
                continue;
                break;
            case"id":
            case"name":
            case"width":
            case"height":
            case"style":
                _attrs.append(k + "='" + flashArguments[k] + "' ");
                break;
            default:
                _params.append("<param name='" + ((k == "src") ? "movie" : k) + "' value='" +
                    (flashArguments[k])
                    + "' />");
                _attrs.append(k + "='" + flashArguments[k] + "' ");
        }
    }
    if (requiredVersion && (requiredVersion instanceof QZFL.media.SWFVersion)) {
        var _ver = QZFL.media.getFlashVersion().major;
        var _needVer = requiredVersion.major;
        _attrs.append("codeBase='http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=" + requiredVersion + "' ");
    }
    if (ua.ie) {
        return"<object classid='clsid:" + flashPlayerCID + "' " + _attrs + ">" + _params + "</object>";
    } else {
        return"<embed " + _attrs + " pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash'></embed>";
    }
}, getWMMHtml: function (wmpArguments, cid) {
    var params = new QZFL.string.StringBuilder();
    var objArgm = new QZFL.string.StringBuilder();
    if (typeof(cid) == 'undefined') {
        cid = "clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6";
    }
    for (var k in wmpArguments) {
        switch (k) {
            case"id":
            case"width":
            case"height":
            case"style":
                objArgm.append(k + '="' + wmpArguments[k] + '" ');
                break;
            case"src":
                objArgm.append(k + '="' + wmpArguments[k] + '" ');
                break;
            default:
                objArgm.append(k + '="' + wmpArguments[k] + '" ');
                params.append('<param name="' + k + '" value="' + wmpArguments[k] + '" />');
        }
    }
    if (wmpArguments["src"]) {
        params.append('<param name="URL" value="' + wmpArguments["src"] + '" />');
    }
    if (ua.ie) {
        return'<object classid="' + cid + '" ' + objArgm + '>' + params + '</object>';
    } else {
        return'<embed ' + objArgm + '></embed>';
    }
}}
QZFL.media.SWFVersion = function () {
    var a;
    if (arguments.length > 1) {
        a = arg2arr(arguments);
    } else if (arguments.length == 1) {
        if (typeof(arguments[0]) == "object") {
            a = arguments[0];
        } else if (typeof arguments[0] == 'number') {
            a = [arguments[0]];
        } else {
            a = [];
        }
    } else {
        a = [];
    }
    this.major = parseInt(a[0], 10) || 0;
    this.minor = parseInt(a[1], 10) || 0;
    this.rev = parseInt(a[2], 10) || 0;
    this.add = parseInt(a[3], 10) || 0;
}
QZFL.media.SWFVersion.prototype.toString = function (spliter) {
    return([this.major, this.minor, this.rev, this.add]).join((typeof spliter == 'undefined') ? "," : spliter);
};
QZFL.media.SWFVersion.prototype.toNumber = function () {
    var se = 0.001;
    return this.major + this.minor * se + this.rev * se * se + this.add * se * se * se;
};
QZFL.media.getFlashVersion = function () {
    if (!QZFL.media._flashVersion) {
        var resv = 0;
        if (navigator.plugins && navigator.mimeTypes.length) {
            var x = navigator.plugins['Shockwave Flash'];
            if (x && x.description) {
                resv = x.description.replace(/(?:[a-z]|[A-Z]|\s)+/, "").replace(/(?:\s+r|\s+b[0-9]+)/, ".").split(".");
            }
        } else {
            try {
                for (var i = (resv = 6), axo = new Object(); axo != null; ++i) {
                    axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
                    resv = i;
                }
            } catch (e) {
                if (resv == 6) {
                    resv = 0;
                }
                resv = Math.max(resv - 1, 0);
            }
            try {
                resv = new QZFL.media.SWFVersion(axo.GetVariable("$version").split(" ")[1].split(","));
            } catch (ignore) {
            }
        }
        if (!(resv instanceof QZFL.media.SWFVersion)) {
            resv = new QZFL.media.SWFVersion(resv);
        }
        if (resv.major < 3) {
            resv.major = 0;
        }
        QZFL.media._flashVersion = resv;
    }
    return QZFL.media._flashVersion;
};
QZFL.media._changeFlashSrc = function (src, installVer, needVer) {
    if (installVer >= 6 && needVer > installVer) {
        src = "http://imgcache.qq.com/qzone/flashinstall.swf";
    }
    return src;
}
var insertFlash = QZFL.media.getFlashHtml;
QZFL.dataCenter = (function () {
    var keyPool = {}, dataPool = [];

    function _mSave(k, v) {
        dataPool[k] = v;
        return true;
    }

    function _sSave(k, v) {
        var o = QZFL.shareObject.getValidSO();
        if (o) {
            return o.set("_dc_so_" + k, v);
        } else {
            return false;
        }
    }

    function _cSave(k, v) {
        var d = QZFL.config.DCCookieDomain;
        if (d) {
            return o.set("_dc_co_" + k, v, d, "/", 120);
        } else {
            return false;
        }
    }

    function getData(key) {
        var t = keyPool[key];
        var res, tmp;
        if (typeof(t) == 'undefined') {
            return t;
        } else {
            t = t[t.length - 1];
            switch (t[1]) {
                case"memory":
                    res = dataPool[t[0]];
                    break;
                case"soflash":
                {
                    tmp = QZFL.shareObject.getValidSO();
                    if (tmp) {
                        res = tmp.get("_dc_so_" + t[0]);
                    } else
                        tmp = null;
                    break;
                }
                case"cookie":
                {
                    tmp = QZFL.cookie;
                    if (tmp) {
                        res = tmp.get("_dc_co_" + t[0]);
                    } else
                        tmp = null;
                    break;
                }
                default:
                    res = dataPool[t[0]];
            }
        }
        return res;
    }

    function deleteData(key) {
        var t = keyPool[key];
        var res, tmp;
        if (typeof(t) == 'undefined') {
            return false;
        } else {
            t = t[t.length - 1];
            switch (t[1]) {
                case"memory":
                    delete dataPool[t[0]];
                    break;
                case"soflash":
                {
                    tmp = QZFL.shareObject.getValidSO();
                    if (tmp) {
                        res = tmp.del("_dc_so_" + key);
                    }
                    break;
                }
                case"cookie":
                {
                    tmp = QZFL.cookie;
                    if (tmp) {
                        res = tmp.del("_dc_co_" + QZFL.config.DCCookieDomain, "/");
                    }
                    break;
                }
                default:
                    delete dataPool[t[0]];
            }
        }
        delete keyPool[key];
        return true;
    }

    function saveData(key, value, level) {
        if (arguments.length < 2 || typeof(arguments[0]) != 'string') {
            throw(new Error("必须提供键值对:\nkeyName{String}:value{String/Object}"));
            return false;
        }
        var mapLink = dataPool.length;
        if (typeof(keyPool[key]) == 'undefined') {
            keyPool[key] = [];
        }
        keyPool[key].push([mapLink, level]);
        switch (level) {
            case"memory":
                return _mSave(mapLink, value);
            case"soflash":
                return _sSave(mapLink, value);
            case"cookie":
                return _cSave(mapLink, value);
            default:
                return _mSave(mapLink, value);
        }
        return false;
    }

    return{save: saveData, get: getData, load: getData, del: deleteData};
})();
QZFL.cookie = {set: function (name, value, domain, path, hour) {
    if (hour) {
        var today = new Date();
        var expire = new Date();
        expire.setTime(today.getTime() + 3600000 * hour);
    }
    document.cookie = name + "=" + value + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + QZFL.config.domainPrefix + ";"));
    return true;
}, get: function (name) {
    var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)");
    var m = document.cookie.match(r);
    return(!m ? "" : m[1]);
}, del: function (name, domain, path) {
    document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + QZFL.config.domainPrefix + ";"));
}};
QZFL.shareObject = {};
QZFL.shareObject.create = function (path) {
    if (typeof(path) == 'undefined') {
        path = QZFL.config.defaultShareObject;
    }
    var t = new QZFL.shareObject.DataBase(path);
};
QZFL.shareObject.instance = {};
QZFL.shareObject.refCount = 0;
QZFL.shareObject.getValidSO = function () {
    var cnt = QZFL.shareObject.refCount + 1;
    for (var i = 1; i < cnt; ++i) {
        if (QZFL.shareObject.instance["so_" + i] && QZFL.shareObject.instance["so_" + i]._ready) {
            return QZFL.shareObject.instance["so_" + i];
        }
    }
    return null;
};
QZFL.shareObject.get = function (s) {
    var o = QZFL.shareObject.getValidSO();
    if (o)return o.get(s); else return void(0);
};
QZFL.shareObject.set = function (k, v) {
    var o = QZFL.shareObject.getValidSO();
    if (o)return o.set(k, v); else return false;
};
QZFL.shareObject.DataBase = function (soUrl) {
    if (QZFL.shareObject.refCount > 0) {
        return QZFL.shareObject.instance["so_1"];
    }
    this._ready = false;
    QZFL.shareObject.refCount++;
    var c = document.createElement("div");
    c.style.marginTop = "-1px";
    document.body.appendChild(c);
    c.innerHTML = QZFL.media.getFlashHtml({src: soUrl, id: "__so" + QZFL.shareObject.refCount, width: 0, height: 0, allowscriptaccess: "always"});
    this.ele = $("__so" + QZFL.shareObject.refCount);
    QZFL.shareObject.instance["so_" + QZFL.shareObject.refCount] = this;
};
QZFL.shareObject.DataBase.prototype.set = function (key, value) {
    if (this._ready) {
        this.ele.set("seed", Math.random());
        this.ele.set(key, value);
        this.ele.flush();
        return true;
    } else {
        return false;
    }
};
QZFL.shareObject.DataBase.prototype.del = function (key) {
    if (this._ready) {
        this.ele.set("seed", Math.random());
        this.ele.set(key, void(0));
        this.ele.flush();
        return true;
    } else {
        return false;
    }
};
QZFL.shareObject.DataBase.prototype.get = function (key) {
    return(this._ready) ? (this.ele.get(key)) : null;
};
QZFL.shareObject.DataBase.prototype.clear = function () {
    if (this._ready) {
        this.ele.clear();
        return true;
    } else {
        return false;
    }
};
QZFL.shareObject.DataBase.prototype.getDataSize = function () {
    if (this._ready) {
        return this.ele.getSize();
    } else {
        return-1;
    }
};
QZFL.shareObject.DataBase.prototype.load = function (url, succFnName, errFnName, data) {
    if (this._ready) {
        this.ele.load(url, succFnName, errFnName, data);
        return true;
    } else {
        return false;
    }
};
QZFL.shareObject.DataBase.prototype.setReady = function () {
    this._ready = true;
};
function getShareObjectPrefix() {
    QZFL.shareObject.instance["so_" + QZFL.shareObject.refCount].setReady();
    return location.host.split(".")[0]
}
QZFL.shareObject.DataBase.prototype.setClipboard = function (value) {
    if (this._ready && isString(value)) {
        this.ele.setClipboard(value);
        return true;
    } else {
        return false;
    }
};
QZFL.Tween = function (el, property, func, startValue, finishValue, duration) {
    this._func = func || QZFL.transitions.simple;
    this._obj = QZFL.dom.get(el);
    this.isColor = /^#/.test(startValue);
    this._prop = property;
    var reSuffix = /\d+([a-z%]+)/i.exec(startValue);
    this._suffix = reSuffix ? reSuffix[1] : "";
    this._startValue = this.isColor ? 0 : parseFloat(startValue);
    this._finishValue = this.isColor ? 100 : parseFloat(finishValue);
    if (this.isColor) {
        this._startColor = QZFL.css.convertHexColor(startValue);
        this._finishColor = QZFL.css.convertHexColor(finishValue);
    }
    this._duration = duration || 10;
    this._timeCount = 0;
    this._startTime = 0;
    this._changeValue = this._finishValue - this._startValue;
    this.currentValue = 0;
    this.isPlayed = false;
    this.isLoop = false;
    this.onMotionStart = QZFL.emptyFn;
    this.onMotionChange = QZFL.emptyFn;
    this.onMotionStop = QZFL.emptyFn;
};
QZFL.Tween.prototype.start = function (loop) {
    this._reloadTimer();
    this.isPlayed = true;
    this._runTime();
    this.isLoop = loop ? true : false;
    this.onMotionStart.apply(this);
    return"d"
};
QZFL.Tween.prototype.pause = function () {
    this.isPlayed = false;
};
QZFL.Tween.prototype.stop = function () {
    this.isPlayed = false;
    this._playTime(this._duration + 0.1);
};
QZFL.Tween.prototype._reloadTimer = function () {
    this._startTime = new Date().getTime() - this._timeCount * 1000;
};
QZFL.Tween.prototype._playTime = function (time) {
    var _isEnd = false;
    if (time > this._duration) {
        time = this._duration;
        _isEnd = true;
    }
    var pValue = this._func(time, this._startValue, this._changeValue, this._duration);
    this.currentValue = /(opacity)/i.test(this._prop) ? pValue : Math.round(pValue);
    if (this.isColor) {
        this.currentValue = this.getColor(this._startColor, this._finishColor, pValue);
    }
    var _try2setCSS = QZFL.dom.setStyle(this._obj, this._prop, this.currentValue + this._suffix);
    if (!_try2setCSS) {
        this._obj[this._prop] = this.currentValue + this._suffix;
    }
    this.onMotionChange.apply(this, [this._obj, this._prop, this.currentValue]);
    if (_isEnd) {
        this.isPlayed = false;
        if (this.isLoop) {
            this.isPlayed = true;
            this._reloadTimer();
        }
        this.onMotionStop.apply(this);
        if (window.CollectGarbage)
            CollectGarbage();
    }
};
QZFL.Tween.prototype._runTime = function () {
    var o = this;
    if (o.isPlayed) {
        o._playTime((new Date().getTime() - this._startTime) / 1000);
        setTimeout(function () {
            o._runTime.apply(o, [])
        }, 0);
    }
};
QZFL.Tween.prototype.getPercent = function () {
    return(this.currentValue - this._startValue) / this._changeValue * 100;
};
QZFL.Tween.prototype.swapValue = function () {
    if (this.isColor) {
        var tempValue = this._startColor.join(",");
        this._startColor = this._finishColor;
        this._finishColor = tempValue.split(",");
    } else {
        var tempValue = this._startValue;
        this._startValue = this._finishValue;
        this._finishValue = tempValue;
        this._changeValue = this._finishValue - this._startValue;
    }
};
QZFL.Tween.prototype.getColor = function (startColor, finishColor, percent) {
    var _sc = startColor;
    var _fc = finishColor;
    var _color = [];
    if (percent > 100) {
        percent = 100;
    }
    if (percent < 0) {
        percent = 0;
    }
    for (var i = 0; i < 3; i++) {
        _color[i] = Math.floor(_sc[i] * 1 + (percent / 100) * (_fc[i] - _sc[i])).toString(16);
        if (_color[i].length < 2) {
            _color[i] = "0" + _color[i];
        }
    }
    return"#" + _color.join("");
};
QZFL.transitions = {simple: function (time, startValue, changeValue, duration) {
    return changeValue * time / duration + startValue;
}, regularEaseIn: function (t, b, c, d) {
    return c * (t /= d) * t + b;
}, regularEaseOut: function (t, b, c, d) {
    return-c * (t /= d) * (t - 2) + b;
}, regularEaseInOut: function (t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
    }
    return-c / 2 * ((--t) * (t - 2) - 1) + b;
}}
QZFL.object.extend(QZFL.transitions, {backEaseIn: function (t, b, c, d) {
    var s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
}, backEaseOut: function (t, b, c, d, a, p) {
    var s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}, backEaseInOut: function (t, b, c, d, a, p) {
    var s = 1.70158;
    if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    }
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
}, bounceEaseOut: function (t, b, c, d) {
    if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
    } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
    } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    }
}, bounceEaseIn: function (t, b, c, d) {
    return c - QZFL.transitions.bounceEaseOut(d - t, 0, c, d) + b;
}, bounceEaseInOut: function (t, b, c, d) {
    if (t < d / 2) {
        return QZFL.transitions.bounceEaseIn(t * 2, 0, c, d) * 0.5 + b;
    } else
        return QZFL.transitions.bounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
}, strongEaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
}, strongEaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}, strongEaseInOut: function (t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
    }
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}, elasticEaseIn: function (t, b, c, d, a, p) {
    if (t == 0)
        return b;
    if ((t /= d) == 1)
        return b + c;
    if (!p)
        p = d * 0.3;
    if (!a || a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    } else {
        var s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return-(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
}, elasticEaseOut: function (t, b, c, d, a, p) {
    if (t == 0)
        return b;
    if ((t /= d) == 1)
        return b + c;
    if (!p)
        p = d * 0.3;
    if (!a || a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    } else {
        var s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return(a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
}, elasticEaseInOut: function (t, b, c, d, a, p) {
    if (t == 0) {
        return b;
    }
    if ((t /= d / 2) == 2) {
        return b + c;
    }
    if (!p) {
        var p = d * (0.3 * 1.5);
    }
    if (!a || a < Math.abs(c)) {
        var a = c;
        var s = p / 4;
    } else {
        var s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    if (t < 1) {
        return-0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    }
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
}});
QZFL.template = (function () {
    var version = '1.0';
    var regIndex = /<%=index%>/g;
    var regText = /<%=text%>/g;
    var regAttrGlobal = /<%=@(\w+)%>/g;
    var renderNodeSize = 0;
    var tagTPLBegin = '<!--TPL_BEGIN';
    var tagTPLEnd = 'TPL_END-->';
    var qzflObj = QZFL.object;

    function _isString(o) {
        return qzflObj.getType(o) == 'string';
    };
    function _isArray(o) {
        return qzflObj.getType(o) == 'array';
    };
    function _isHashMap(o) {
        return qzflObj.getType(o) == 'object';
    };
    function _isFunction(o) {
        return qzflObj.getType(o) == 'function';
    };
    function _getAttrVal(objJSON, attr) {
        var retVal = '';
        if (objJSON == null || attr == null) {
            return retVal;
        }
        attr += '';
        if (_isArray(objJSON)) {
            try {
                var arIndex = parseInt(attr, 10);
                if (objJSON[arIndex] != null) {
                    retVal = objJSON[arIndex];
                }
            }
            catch (e) {
                retVal = '';
            }
        }
        else if (_isHashMap(objJSON)) {
            if (objJSON[attr] != null) {
                retVal = objJSON[attr];
            }
        }
        else {
            retVal = objJSON;
        }
        return retVal;
    };
    function _queryJSONPath(objJSON, sPath) {
        if (objJSON == null || !_isString(sPath)) {
            return'';
        }
        var attrList = sPath.split("/");
        var pathNode = ['/'];
        for (var i = 0, len = attrList.length; i < len; i++) {
            if (attrList[i] && _isString(attrList[i])) {
                pathNode.push(attrList[i]);
            }
        }
        if (i == 0) {
            return objJSON;
        }
        var ret_obj = objJSON;
        for (var j = 1, len = pathNode.length; j < len; j++) {
            ret_obj = _getAttrVal(ret_obj, pathNode[j]);
        }
        return ret_obj;
    };
    function _toHashMap(str) {
        var map = {};
        if (/^(.+:\w+;?)+$/.test(str)) {
            var list = str.split(';');
            var pair;
            for (var i = 0, len = list.length; i < len; i++) {
                pair = list[i].split(':');
                map[pair[0]] = pair[1];
            }
        }
        return map;
    };
    function _eachReplace(templetHTML, dataObject, xLevel, begIndex, endIndex, emptyCb) {
        var stRegPrefix = '<%repeat_' + xLevel + '\\s*(match="[^"]+")\\s*(map="[^"]+")?\\s*(callback="[^"]+")?[^%]*%>';
        var arPrefix = templetHTML.match(new RegExp(stRegPrefix, "g"));
        if (arPrefix == null) {
            alert('找不到匹配<%repeat_' + (xLevel) + '%>');
            return'';
        }
        var r_repeat_match_next_level = new RegExp("<%repeat_" + (xLevel + 1) + "\\s*match=\"([^\"]+)\"[^%]*%>");
        var startPos = 0;
        var endPos = 0;
        var arPrefixLen = arPrefix.length;
        var stPath;
        var objMap;
        var objCallback;
        for (var i = 0; i < arPrefixLen; i++) {
            stPath = arPrefix[i].replace(/^.*match=\"|\".*$/g, '');
            var sMap = '';
            if (arPrefix[i].indexOf('map=') != -1) {
                sMap = arPrefix[i].replace(/^.*map=\"|\".*$/g, '');
            }
            objMap = _toHashMap(sMap);
            var sCallback = '';
            if (arPrefix[i].indexOf('callback=') != -1) {
                sCallback = arPrefix[i].replace(/^.*callback=\"|\".*$/g, '');
            }
            objCallback = _toHashMap(sCallback);
            startPos = templetHTML.indexOf(arPrefix[i]);
            endPos = templetHTML.indexOf("<%_repeat_" + xLevel + "%>", startPos);
            var replaceContent = templetHTML.substring(startPos, endPos + 13);
            startPos += arPrefix[i].length;
            var repeatContent = templetHTML.substring(startPos, endPos);
            var nodes = _queryJSONPath(dataObject, stPath);
            if (nodes == null) {
                return _isFunction(emptyCb) ? emptyCb() : (emptyCb || '');
            }
            var arContent = [];
            var attributes = repeatContent.match(regAttrGlobal) || [];
            if (_isArray(nodes)) {
                var nodeLen = nodes.length;
                if (nodeLen < 1) {
                    return _isFunction(emptyCb) ? emptyCb() : (emptyCb || '');
                }
                var sIndex = 0, eIndex = 0;
                if (begIndex == null || endIndex == null) {
                    sIndex = 0;
                    eIndex = (nodeLen - 1 < 0) ? 0 : nodeLen - 1;
                }
                else {
                    sIndex = ((nodeLen - 1) < begIndex) ? (nodeLen - 1) : begIndex;
                    eIndex = ((nodeLen - 1) < endIndex) ? (nodeLen - 1) : endIndex;
                }
                renderNodeSize = eIndex - sIndex + 1;
                for (var j = sIndex; j <= eIndex; j++) {
                    var node = nodes[j];
                    var content = repeatContent;
                    if (repeatContent.match(r_repeat_match_next_level) != null) {
                        content = _eachReplace(repeatContent, node, xLevel + 1);
                    }
                    var sIdx = j;
                    if (objCallback["@index"]) {
                        var fn = objCallback["@index"];
                        (_isFunction(window[fn])) && (sIdx = window[fn](sIdx, node, nodeLen, renderNodeSize));
                    }
                    var s = content.replace(regIndex, sIdx).replace(regText, node.toString());
                    var attrLen = attributes.length;
                    var attrTag, objTag, attrValue = '', isCallback = false;
                    for (var k = 0; k < attrLen; k++) {
                        objTag = attrTag = attributes[k].replace(/\W/g, '');
                        (objMap[attrTag]) && (objTag = objMap[attrTag]);
                        attrValue = _queryJSONPath(node, objTag);
                        if (attrValue == null) {
                            attrValue = '';
                        }
                        isCallback = false;
                        (objCallback[attrTag]) && (_isFunction(window[objCallback[attrTag]])) && (isCallback = true, attrValue = window[objCallback[attrTag]](attrValue, node, j));
                        s = s.replace(attributes[k], isCallback ? attrValue : QZFL.string.escHTML(attrValue));
                    }
                    arContent[j] = s;
                }
            }
            else {
                renderNodeSize = 1;
                var content = repeatContent;
                if (repeatContent.match(r_repeat_match_next_level) != null) {
                    content = _eachReplace(repeatContent, nodes, xLevel + 1);
                }
                var s = content.replace(regText, nodes);
                var attrTag, objTag, attrValue, isCallback = false;
                for (var k = 0, attrLen = attributes.length; k < attrLen; k++) {
                    objTag = attrTag = attributes[k].replace(/\W/g, '');
                    (objMap[attrTag]) && (objTag = objMap[attrTag]);
                    attrValue = nodes[objTag] != null ? nodes[objTag] : '';
                    isCallback = false;
                    (objCallback[attrTag]) && (_isFunction(window[objCallback[attrTag]])) && (isCallback = true, attrValue = window[objCallback[attrTag]](attrValue, nodes));
                    s = s.replace(attributes[k], isCallback ? attrValue : QZFL.string.escHTML(attrValue));
                }
                arContent[0] = s;
            }
            templetHTML = templetHTML.replace(replaceContent, arContent.join(''));
        }
        return templetHTML;
    };
    function _getTemplate(element) {
        if (element.templateHTML) {
            return element.templateHTML;
        }
        var templateHTML = element.innerHTML || '';
        var idxBegTPL = templateHTML.indexOf(tagTPLBegin);
        if (idxBegTPL >= 0) {
            var idxEndTPL = templateHTML.indexOf(tagTPLEnd);
            if (idxEndTPL >= 0) {
                templateHTML = templateHTML.substring(idxBegTPL + tagTPLBegin.length, idxEndTPL);
            }
        }
        element.templateHTML = templateHTML.replace(/%5b%/ig, "<%").replace(/%%5d/ig, "%>").replace(/\[%/g, "<%").replace(/%\]/g, "%>").replace(/\{%/g, "<%").replace(/%\}/g, "%>").replace(/\<!--%/g, "<%").replace(/%-->/g, "%>");
        return element.templateHTML;
    };
    function show(obj) {
        var element = _isString(obj.element) ? $(obj.element) : obj.element;
        if (!element) {
            alert('Container ElementNode for Template is null');
            return 0;
        }
        var templetHTML = _getTemplate(element);
        if (!_isArray(obj.JSON) && !_isHashMap(obj.JSON)) {
            return 0;
        }
        if (!obj.begIndex && obj.begIndex < 0) {
            obj.begIndex = 0;
        }
        if (!obj.endIndex && obj.endIndex < 0) {
            obj.endIndex = 0;
        }
        _isFunction(obj.begCb) && (obj.begCb());
        element.innerHTML = _eachReplace(templetHTML, obj.JSON, 0, obj.begIndex, obj.endIndex, obj.emptyCb);
        element.style.display = '';
        _isFunction(obj.endCb) && (obj.endCb());
        return renderNodeSize;
    };
    return{show: show};
})();
QZFL.speedReport = (function () {
    var _REPORT_URL = "http://isdspeed.qq.com/cgi-bin/r.cgi";
    var _FREQUENCY = 1.0;
    var _DELAY_TIME = 2000;
    var _FLAG1_VIP = 169;

    function send(timeArr, webFlag, pageFlag, freq, delayTime, extParam) {
        freq = freq || _FREQUENCY;
        delayTime = delayTime || _DELAY_TIME;
        if (Math.random() >= freq) {
            return;
        }
        var callback = (function (timeArr, webFlag, pageFlag, extParam) {
            return function () {
                var param = [];
                param.push('flag1=' + _FLAG1_VIP);
                param.push('flag2=' + webFlag);
                param.push('flag3=' + pageFlag);
                for (var i = 1, j = timeArr.length; i <= j; i++) {
                    if (timeArr[i]) {
                        param.push(i + "=" + timeArr[i]);
                    }
                }
                extParm = extParam || {};
                for (key in extParm) {
                    param.push(key + "=" + extParm[key]);
                }
                var sender = new Image();
                sender.src = _REPORT_URL + "?" + param.join("&");
            };
        })(timeArr, webFlag, pageFlag, extParam);
        setTimeout(callback, delayTime);
    };
    return{WEB_MY: 100, WEB_FACE: 101, WEB_MAGIC: 102, WEB_ECARD: 103, WEB_RING: 104, WEB_VIP: 105, WEB_HAOMA: 106, WEB_FAV: 107, WEB_FANLI: 108, WEB_SHANGHAI: 109, WEB_SHOP: 110, send: send};
})();
QZFL.cgiRtnReport = (function () {
    var _URL = "http://isdspeed.qq.com/cgi-bin/v.cgi?";

    function _init(obj) {
        obj = obj || {};
        obj['url'] && (_URL = obj['url']);
    };
    function _send(obj) {
        if (typeof obj != 'object') {
            return;
        }
        var freq = 1;
        obj['1'] >= 1 && (freq = Math.floor(obj['1']));
        freq = 1 / freq;
        var rand = Math.random();
        if (rand >= freq) {
            return;
        }
        var param = [];
        for (var key in obj) {
            obj.hasOwnProperty(key) && (param.push(key + '=' + encodeURIComponent(obj[key]) + '&'));
        }
        param.push('pCache=' + rand);
        var sender = new Image();
        sender.src = _URL + param.join('');
    };
    return{init: _init, send: _send};
})();
QZFL.lazyLoad = (function () {
    var timer, elems, hide_elems, count, cb, delay = 30, hide_img_def = 'hide_init_src', init_src_def = 'init_src', arr_df_tag = ['img', 'iframe'], doc_body, doc_element, $E = QZFL.event;

    function _onChange() {
        (typeof cb == 'function') && (cb(elems, hide_elems));
        !timer && (timer = setTimeout(_load, delay));
    };
    function _isVisible(e) {
        var offset = (window.MessageEvent && !document.getBoxObjectFor) ? doc_body.scrollTop : doc_element.scrollTop;
        var bottom = offset + doc_element.clientHeight;
        var eOffsetTop = e.offsetTop;
        while (e = e.offsetParent) {
            eOffsetTop += e.offsetTop;
        }
        return eOffsetTop <= bottom;
    };
    function _load(force) {
        if (count < 1) {
            $E.removeEvent(window, "scroll", _onChange);
            $E.removeEvent(window, "resize", _onChange);
            return;
        }
        for (var i = 0, j = elems.length; i < j; i++) {
            if (!elems[i]) {
                continue;
            }
            if (_isVisible(elems[i]) || force) {
                elems[i].src = elems[i].getAttribute(init_src_def);
                delete elems[i];
                count--;
            }
        }
        timer = 0;
    };
    function init(obj) {
        doc_body = document.body;
        doc_element = document.compatMode == 'BackCompat' ? doc_body : document.documentElement;
        obj = obj || {};
        if (typeof obj != 'object') {
            return;
        }
        var tagNames;
        if (QZFL.object.getType(obj) == 'array') {
            tagNames = obj || arr_df_tag;
        }
        else {
            tagNames = obj['tagNames'] || arr_df_tag;
        }
        timer = 0;
        elems = [];
        hide_elems = [];
        count = 0;
        (typeof obj['beforeCb'] == 'function') && (obj['beforeCb']());
        for (var i = 0, j = tagNames.length; i < j; i++) {
            var es = document.getElementsByTagName(tagNames[i]);
            for (var n = 0, m = es.length; n < m; n++) {
                if (typeof es[n] == 'object' && es[n].getAttribute(init_src_def)) {
                    elems.push(es[n]);
                    count++;
                }
                else if (typeof es[n] == 'object' && es[n].getAttribute(hide_img_def)) {
                    hide_elems.push(es[n]);
                }
            }
        }
        (typeof obj['afterCb'] == 'function') && (obj['afterCb'](elems, hide_elems));
        (typeof obj['changeCb'] == 'function') && (cb = obj['changeCb']);
        $E.addEvent(window, "scroll", _onChange);
        $E.addEvent(window, "resize", _onChange);
        _load();
        var lazyTime = obj['lazyTime'] || 0;
        (lazyTime > 0) && (setTimeout(function () {
            _load(true);
        }, lazyTime * 1000));
    };
    function loadHideImg(con) {
        var imgs = ((typeof con == "string") && $e('#' + con + ' img').elements) || (con.length && con) || QZFL.dom.get(con).getElementsByTagName('img');
        QZFL.object.each(imgs, function (el) {
            if (el.getAttribute && el.getAttribute(hide_img_def)) {
                el.src = el.getAttribute(hide_img_def);
                el.setAttribute(hide_img_def, '');
            }
        });
    };
    return{init: init, loadHideImg: loadHideImg};
})();
var QZFL = QZFL || {};
QZFL.quickLogin = (function () {
    var CONST_PT_CGI = 'http://ui.ptlogin2.qq.com/cgi-bin/login?';
    var CONST_LOGIN_PROXY = 'http://imgcache.qq.com/ac/club/qqvip/v2.0/sLoginProxy_2.0.html';
    var CONST_DOMAIN = 'qq.com';
    var _pt2 = null;
    var _mask = null;
    var _mask_obj = null;
    var _valid = null;
    var _w = null;
    var _h = null;
    var _afterClose = null;
    var _beforeResize = null;
    var _afterResize = null;
    var _encode = encodeURIComponent;

    function _setCenter() {
        if (!_valid) {
            return;
        }
        try {
            _pt2.style.top = (window.innerHeight / 2 + pageYOffset) - _h / 2 + "px";
            _pt2.style.left = (window.innerWidth / 2 + pageXOffset) - _w / 2 + "px";
        }
        catch (e) {
            var _docElement = document.documentElement;
            if (!document.body.scrollTop) {
                _pt2.style.top = (_docElement.offsetHeight / 2 + _docElement.scrollTop) - _h / 2 + "px";
                _pt2.style.left = (_docElement.offsetWidth / 2 + _docElement.scrollLeft) - _w / 2 + "px";
            }
            else {
                _pt2.style.top = (_docElement.offsetHeight / 2 + document.body.scrollTop) - _h / 2 + "px";
                _pt2.style.left = (_docElement.offsetWidth / 2 + document.body.scrollLeft) - _w / 2 + "px";
            }
        }
        setTimeout(_setCenter, 500);
    };
    return{close: function () {
        if (_pt2) {
            _valid = false;
            _pt2.style.display = "none";
            _mask_obj && (_mask_obj.style.display = "none");
            (typeof _afterClose == 'function') && _afterClose(_pt2);
        }
    }, resize: function (w, h) {
        if (_pt2) {
            (typeof _beforeResize == 'function') && _beforeResize(_pt2);
            _valid = true;
            _w = w;
            _h = h;
            _pt2.style.width = w + "px";
            _pt2.style.height = h + "px";
            _pt2.getElementsByTagName("iframe")[0].style.height = h + "px"
            if (_mask) {
                if (!_mask_obj) {
                    var n = document.createElement("div");
                    n.id = "_ptlogin2_mask_body";
                    n.style.position = "absolute";
                    n.style.background = "#333333";
                    n.style.opacity = "0.3";
                    n.style.filter = "alpha(opacity=30)";
                    n.style.zIndex = "999";
                    n.style.width = document.body.scrollWidth + "px";
                    n.style.height = document.body.scrollHeight + "px";
                    n.style.top = "0px";
                    n.style.left = "0px";
                    document.getElementsByTagName("body")[0].appendChild(n);
                    _mask_obj = n;
                }
                else {
                    _mask_obj.style.display = "block";
                }
            }
            _setCenter(w, h);
            (typeof _afterResize == 'function') && _afterResize(_pt2);
        }
    }, open: function (obj) {
        obj = obj || {};
        var jumpURL = obj.jumpURL || window.location.href;
        var isQuick = obj.isQuick || false;
        var isMask = obj.isMask || false;
        var sTarget = 'top';
        if (obj.target == 'self' || obj.target == 'top' || obj.target == 'parent') {
            sTarget = obj.target;
        }
        var jump_name = obj.jumpName || 'clubcommjump';
        var appid = obj.appId || '8000212';
        (typeof obj.onLoginCb == 'function') && (window.ptlogin2_onLogin = obj.onLoginCb);
        (typeof obj.onResetCb == 'function') && (window.ptlogin2_onReset = obj.onResetCb);
        (typeof obj.onSuccessCb == 'function') && (window.ptlogin2_onSuccess = obj.onSuccessCb);
        (typeof obj.afterClose == 'function') && (_afterClose = obj.afterClose);
        (typeof obj.beforeResize == 'function') && (_beforeResize = obj.beforeResize);
        (typeof obj.afterResize == 'function') && (_afterResize = obj.afterResize);
        document.domain = CONST_DOMAIN;
        if (!_pt2) {
            var n = document.createElement("div");
            n.id = "_ptlogin2_div_container";
            n.style.position = "absolute";
            n.style.zIndex = "1000";
            n.style.width = "1px";
            n.style.height = "1px";
            n.style.top = "1px";
            n.style.left = "1px";
            n.innerHTML = '<iframe frameborder="no" scrolling="no" width="100%" height="100%" src="#"></iframe>';
            document.getElementsByTagName("body")[0].appendChild(n);
            _pt2 = n;
        }
        _pt2.style.display = "block";
        var arrURL = [];
        arrURL.push(CONST_PT_CGI);
        var objParm = {link_target: 'blank', target: 'self', appid: appid, f_url: 'loginerroralert'};
        (typeof obj.style != 'undefined') && (objParm['style'] = obj.style);
        (typeof obj.hideTitleBar != 'undefined') && (objParm['hide_title_bar'] = obj.hideTitleBar);
        (typeof obj.hideCloseIcon != 'undefined') && (objParm['hide_close_icon'] = obj.hideCloseIcon);
        (typeof obj.bgColor != 'undefined') && (objParm['bgcolor'] = obj.bgColor);
        (typeof obj.bgImage != 'undefined') && (objParm['bgimage'] = obj.bgImage);
        (typeof obj.fontColor != 'undefined') && (objParm['fontcolor'] = obj.fontColor);
        (typeof obj.title != 'undefined') && (objParm['title'] = obj.title);
        (typeof obj.loginText != 'undefined') && (objParm['login_text'] = obj.loginText);
        (typeof obj.loginImg != 'undefined') && (objParm['login_img'] = obj.loginImg);
        (typeof obj.resetImg != 'undefined') && (objParm['reset_img'] = obj.resetImg);
        (typeof obj.uin != 'undefined') && (objParm['uin'] = obj.uin);
        (typeof obj.hideUinTip != 'undefined') && (objParm['hide_uin_tip'] = obj.hideUinTip);
        if (isQuick) {
            objParm['qlogin_jumpname'] = jump_name;
            objParm['qlogin_auto_login'] = 0;
            objParm['qtarget'] = 'self';
            objParm['qlogin_param'] = _encode("target=" + sTarget + "&jump_url=" + _encode(jumpURL));
        }
        objParm['s_url'] = _encode(CONST_LOGIN_PROXY + "?target=" + sTarget + "&jump_url=" + _encode(jumpURL));
        for (var key in objParm) {
            if (objParm.hasOwnProperty(key)) {
                arrURL.push(key + '=' + objParm[key] + '&');
            }
        }
        _pt2.getElementsByTagName('iframe')[0].src = arrURL.join('');
        _mask = !!isMask;
    }};
})();
window.openLogin = QZFL.quickLogin.open;
window.ptlogin2_onClose = QZFL.quickLogin.close;
window.ptlogin2_onResize = QZFL.quickLogin.resize;
var QZFL = QZFL || {};
QZFL.security = (function (global) {
    var CONST_SALT = 5381;
    var CONST_MD5_KEY = 'tencentQQVIP123443safde&!%^%1282';
    var hexcase = 0;
    var b64pad = '';
    var chrsz = 8;
    var mode = 32;

    function hex_md5(s) {
        return binl2hex(core_md5(str2binl(s), s.length * chrsz));
    };
    function b64_md5(s) {
        return binl2b64(core_md5(str2binl(s), s.length * chrsz));
    };
    function str_md5(s) {
        return binl2str(core_md5(str2binl(s), s.length * chrsz));
    };
    function hex_hmac_md5(key, data) {
        return binl2hex(core_hmac_md5(key, data));
    };
    function b64_hmac_md5(key, data) {
        return binl2b64(core_hmac_md5(key, data));
    };
    function str_hmac_md5(key, data) {
        return binl2str(core_hmac_md5(key, data));
    };
    function core_md5(x, len) {
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        if (mode == 16) {
            return Array(b, c);
        } else {
            return Array(a, b, c, d);
        }
    };
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    };
    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    };
    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    };
    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    };
    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    };
    function core_hmac_md5(key, data) {
        var bkey = str2binl(key);
        if (bkey.length > 16)
            bkey = core_md5(bkey, key.length * chrsz);
        var ipad = Array(16), opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
        return core_md5(opad.concat(hash), 512 + 128);
    };
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return(msw << 16) | (lsw & 0xFFFF);
    };
    function bit_rol(num, cnt) {
        return(num << cnt) | (num >>> (32 - cnt));
    };
    function str2binl(str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz)
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
        return bin;
    };
    function binl2str(bin) {
        var str = "";
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < bin.length * 32; i += chrsz)
            str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
        return str;
    };
    function binl2hex(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
        }
        return str;
    };
    function binl2b64(binarray) {
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i += 3) {
            var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i
                + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
            for (var j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > binarray.length * 32)
                    str += b64pad; else
                    str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
            }
        }
        return str;
    };

    function _md5(s) {
        return hex_md5(s);
    };
    function _getAntiCSRFToken(objConfig) {
        objConfig = objConfig || {};
        var salt = objConfig.salt || CONST_SALT;
        var skey = objConfig.skey || QZFL.cookie.get("skey");
        var md5key = objConfig.md5key || CONST_MD5_KEY;
        var hash = [], ASCIICode;
        hash.push((salt << 5));
        for (var i = 0, len = skey.length; i < len; ++i) {
            ASCIICode = skey.charAt(i).charCodeAt();
            hash.push((salt << 5) + ASCIICode);
            salt = ASCIICode;
        }
        var md5str = _md5(hash.join('') + md5key);
        return md5str;
    };
    return{getAntiCSRFToken: _getAntiCSRFToken, md5: _md5};
})(window);
;
if (true) {
    var QQVIP;
    if (typeof(QZFL) == "object") {
        QQVIP = QZFL;
    } else {
        QQVIP = {};
    }
}
;
/*  |xGv00|1e2d88878203e53c6a13a96dac25562c */