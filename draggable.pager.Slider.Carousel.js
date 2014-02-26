F.module("/browse_static/common/lib/tangram/plugin/selectable/selectable.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/core/core.js");
    b.dom.extend({isCrash: function (j, r) {
        if (!arguments.length) {
            return false
        }
        var p = this, t = b.dom(j).eq(0), f = t.offset(), s = t.outerWidth(), m = t.outerHeight(), n = p.size(), e = function (v, o, i, u, h) {
            if (h) {
                if ((f.top >= v) && ((f.top + m) <= i) && (f.left >= u) && ((f.left + s) <= o)) {
                    return true
                }
            } else {
                if (((f.top + m) >= v) && (f.top <= i) && ((f.left + s) >= u) && (f.left <= o)) {
                    return true
                }
            }
        };
        for (var l = 0; l < n; l++) {
            var g = p.eq(l), d = g.offset(), q = g.eq(l).outerWidth(), k = g.eq(l).outerHeight();
            if (e(d.top, d.left + q, d.top + k, d.left, r)) {
                return true
            }
        }
        return false
    }});
    b.plugin = b.plugin || {};
    b.plugin._util_ = b.plugin._util_ || {};
    b.plugin._util_.rubberSelect = function (g) {
        var w = b.dom(document), l = g || {}, m, n, q, s, f, r, e, i, p, j, h, u = function (x) {
            clearTimeout(h);
            s = x.pageX;
            f = x.pageY;
            if (m) {
                if (s < m.left || s > m.right || f < m.top || f > m.bottom) {
                    n = false;
                    return
                }
            }
            n = true;
            w.trigger("rubberselectstart");
            w.trigger("rubberselecting");
            d();
            q.width(0).height(0).show().offset({left: s, top: f});
            w.on("mousemove", o);
            w.on("selectstart", k);
            if (q.setCapture) {
                q.setCapture()
            } else {
                if (window.captureEvents) {
                    window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
                }
            }
            if (document.selection) {
                document.selection.empty && document.selection.empty()
            } else {
                if (window.getSelection) {
                    window.getSelection().removeAllRanges()
                }
            }
        }, o = function (x) {
            clearTimeout(j);
            j = setTimeout(function () {
                w.trigger("rubberselecting");
                i = x.pageX;
                p = x.pageY;
                if (m) {
                    if (i < m.left) {
                        r = m.left
                    } else {
                        if (i > m.right) {
                            r = m.right
                        } else {
                            r = i
                        }
                    }
                    if (p < m.top) {
                        e = m.top
                    } else {
                        if (p > m.bottom) {
                            e = m.bottom
                        } else {
                            e = p
                        }
                    }
                } else {
                    r = i;
                    e = p
                }
                if (r > s && e > f) {
                    q.width(r - s).height(e - f)
                } else {
                    if (r > s && f > e) {
                        q.width(r - s).height(f - e).offset({left: s, top: e})
                    } else {
                        if (s > r && f < e) {
                            q.width(s - r).height(e - f).offset({left: r, top: f})
                        } else {
                            if (s > r && f > e) {
                                q.width(s - r).height(f - e).offset({left: r, top: e})
                            }
                        }
                    }
                }
            }, 3)
        }, t = function () {
            if (n) {
                w.off("selectstart", k);
                w.off("mousemove", o);
                if (q.releaseCapture) {
                    q.releaseCapture()
                } else {
                    if (window.releaseEvents) {
                        window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)
                    }
                }
                clearTimeout(h);
                h = setTimeout(function () {
                    b.dom(document).trigger("rubberselectend");
                    b.dom(".tang-rubberSelect").hide()
                }, 150)
            }
        }, k = function (x) {
            return x.preventDefault()
        }, v = function () {
            if (l.range) {
                if (b.type(l.range) == "object") {
                    m = l.range
                } else {
                    var x = b.dom(l.range).eq(0);
                    m = x.offset();
                    m.bottom = m.top + x.outerHeight();
                    m.right = m.left + x.outerWidth()
                }
            }
        }, d = function () {
            q = b.dom(".tang-rubberSelect");
            if (!q.size()) {
                q = b.dom('<div class="tang-rubberSelect" style="position:absolute;">')
            }
            q.hide().appendTo(document.body)
        };
        v();
        d();
        w.on("mousedown", u);
        w.on("mouseup", t);
        return{target: q, range: function (x) {
            if (!x) {
                return l.range
            } else {
                l.range = x;
                v();
                return this
            }
        }, dispose: function () {
            w.off("mousedown", u);
            w.off("mouseup", t);
            w = j = null;
            for (var x in this) {
                delete this[x]
            }
            this.dispose = true;
            return null
        }}
    };
    b.dom.extend({selectable: function (q, o) {
        var w = this, u = {options: {enable: true, intervalSelect: true}, range: function (y) {
            if (y && i && i.dispose != true) {
                d.range = y;
                i.range(y);
                return k
            } else {
                return d.range
            }
        }, cancel: function () {
            if (h) {
                s.removeClass("tang-selectable-selected");
                h.addClass("tang-selectable-selected")
            } else {
                k.reset()
            }
            return k
        }, reset: function () {
            h = w.find(".tang-selectable-selected");
            s.removeClass("tang-selectable-selected");
            return k
        }, disable: function () {
            d.enable = false;
            if (i && i.dispose != true) {
                i.dispose();
                v()
            }
            return k
        }, enable: function () {
            if (!d.enable) {
                d.enable = true;
                if (i && i.dispose == true) {
                    i = b.plugin._util_.rubberSelect()
                }
                n()
            }
            return k
        }, dispose: function () {
            k.disable();
            x = i = s = l = null;
            for (var y in k) {
                delete k[y]
            }
            k.dispose = true;
            return null
        }, selected: function (y) {
            if (y) {
                w.find(y).addClass("tang-selectable-selected");
                return k
            } else {
                return w.find(".tang-selectable-selected")
            }
        }, unselected: function (y) {
            if (y) {
                w.find(y).removeClass("tang-selectable-selected");
                return k
            } else {
                return s.not(".tang-selectable-selected")
            }
        }, item: function () {
            return s
        }, index: function (B) {
            if (b.type(B) == "array") {
                s.removeClass("tang-selectable-selected");
                for (var A = 0, z = B.length; A < z; A++) {
                    s.eq(B[A]).addClass("tang-selectable-selected")
                }
                return k
            } else {
                var y = [];
                for (var A = 0, z = s.size(); A < z; A++) {
                    if (s.eq(A).hasClass("tang-selectable-selected")) {
                        y.push(A)
                    }
                }
                return y
            }
        }}, x = b.dom(document), k = b.setBack(b.createSingle(u), w), d = k.options, i, s, h, l, j = false, g = function () {
            var y = ["start", "end", "dragging", "change"];
            for (var A = 0, z = y.length; A < z; A++) {
                if (d["on" + y[A]]) {
                    k.on(y[A], d["on" + y[A]])
                }
            }
            k.on("start", function () {
                h = w.find(".tang-selectable-selected")
            });
            k.on("end", function () {
                s.removeClass("tang-selectable-selecting")
            })
        }, t = function () {
            clearTimeout(l);
            l = setTimeout(function () {
                k.fire("dragging");
                if (!s) {
                    return
                }
                if (!j) {
                    for (var z = 0, y = s.size(); z < y; z++) {
                        var A = s.eq(z);
                        if (A.isCrash(i.target)) {
                            if (!A.hasClass("tang-selectable-selected")) {
                                k.fire("change", {target: A});
                                A.addClass("tang-selectable-selected")
                            }
                        } else {
                            if (A.hasClass("tang-selectable-selected")) {
                                k.fire("change", {target: A});
                                A.removeClass("tang-selectable-selected")
                            }
                        }
                    }
                } else {
                    for (var z = 0, y = s.size(); z < y; z++) {
                        var A = s.eq(z);
                        if (A.isCrash(i.target) && !A.hasClass("tang-selectable-selecting")) {
                            k.fire("change", {target: A});
                            A.addClass("tang-selectable-selecting");
                            if (!A.hasClass("tang-selectable-selected")) {
                                A.addClass("tang-selectable-selected")
                            } else {
                                A.removeClass("tang-selectable-selected")
                            }
                        }
                    }
                }
            }, 3)
        }, r = function (y) {
            if (y.ctrlKey || y.keyCode == 91) {
                j = true
            }
        }, p = function (y) {
            if (!y.ctrlKey || y.keyCode == 91) {
                j = false;
                s.removeClass("tang-selectable-selecting")
            }
        }, m = function () {
            k.fire("start")
        }, f = function () {
            k.fire("end")
        }, n = function () {
            if (d.intervalSelect) {
                x.on("keydown", r);
                x.on("keyup", p)
            }
            x.on("rubberselecting", t);
            x.on("rubberselectstart", m);
            x.on("rubberselectend", f)
        }, v = function () {
            if (d.intervalSelect) {
                x.off("keydown", r);
                x.off("keyup", p)
            }
            x.off("rubberselecting", t);
            x.off("rubberselectstart", m);
            x.off("rubberselectend", f)
        }, e = function (z) {
            for (var y in z) {
                d[y] = z[y]
            }
            if (d.enable == false) {
                k.disable()
            }
            if (d.range) {
                k.range(d.range)
            }
        };
        i = b.plugin._util_.rubberSelect();
        switch (arguments.length) {
            case 0:
                s = w.children();
                break;
            case 1:
                if (b.type(q) == "object") {
                    s = w.children();
                    e(q)
                } else {
                    s = w.find(q)
                }
                break;
            case 2:
                s = w.find(q);
                e(o);
                break
        }
        g();
        n();
        return k
    }});
    a = b;
    return a
}, ["/browse_static/common/lib/tangram/core/core.js"]);
F.module("/browse_static/common/lib/tangram/plugin/draggable/draggable.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/core/core.js");
    b.plugin = b.plugin || {};
    b.plugin._util_ = b.plugin._util_ || {};
    b.plugin._util_.drag = function (g) {
        var d, m = b.dom(document), p = b.dom(g).eq(0), i = p.offset(), e, o, j, f = function (r, q, s) {
            if (j) {
                q = Math.min(j.right - j.width, Math.max(j.left, q));
                s = Math.min(j.bottom - j.height, Math.max(j.top, s))
            }
            r.offset({left: q, top: s});
            m.trigger("dragging")
        }, l = function (q) {
            if (d) {
                return
            }
            d = setTimeout(function () {
                var r = p.offset();
                !e && (e = q.pageX - r.left);
                !o && (o = q.pageY - r.top);
                f(p, q.pageX - e, q.pageY - o);
                d = null
            }, 16)
        }, h = function (q) {
            return q.preventDefault()
        }, n = function () {
            m.on("selectstart", h);
            m.on("mousemove", l);
            if (p[0].setCapture) {
                p[0].setCapture()
            } else {
                if (window.captureEvents) {
                    window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
                }
            }
            if (document.selection) {
                document.selection.empty && document.selection.empty()
            } else {
                if (window.getSelection) {
                    window.getSelection().removeAllRanges()
                }
            }
        }, k = function () {
            clearTimeout(d);
            if (p[0].releaseCapture) {
                p[0].releaseCapture()
            } else {
                if (window.releaseEvents) {
                    window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)
                }
            }
            m.off("mousemove", l);
            m.off("selectstart", h)
        };
        m.trigger("dragstart", {target: p});
        n();
        return{target: p, disable: function () {
            k();
            e = o = null;
            m.trigger("dragend");
            return this
        }, enable: function () {
            m.trigger("dragstart");
            n();
            return this
        }, range: function (s) {
            if (s === undefined) {
                return j
            }
            var q = s, r;
            if (b.type(s) !== "object") {
                r = b.dom(s).eq(0);
                q = r.offset();
                q.right = q.left + r.outerWidth();
                q.bottom = q.top + r.outerHeight()
            }
            j = b.extend({left: Number.MIN_VALUE, top: Number.MIN_VALUE, right: Number.MAX_VALUE, bottom: Number.MAX_VALUE, width: p.outerWidth(), height: p.outerHeight()}, q);
            return this
        }, cancel: function () {
            p.offset(i);
            return this
        }, dispose: function () {
            k();
            e = o = m = p = i = j = null;
            for (var q in this) {
                delete this[q]
            }
            this.dispose = true;
            return null
        }}
    };
    b.dom.extend({isCrash: function (j, r) {
        if (!arguments.length) {
            return false
        }
        var p = this, t = b.dom(j).eq(0), f = t.offset(), s = t.outerWidth(), m = t.outerHeight(), n = p.size(), e = function (v, o, i, u, h) {
            if (h) {
                if ((f.top >= v) && ((f.top + m) <= i) && (f.left >= u) && ((f.left + s) <= o)) {
                    return true
                }
            } else {
                if (((f.top + m) >= v) && (f.top <= i) && ((f.left + s) >= u) && (f.left <= o)) {
                    return true
                }
            }
        };
        for (var l = 0; l < n; l++) {
            var g = p.eq(l), d = g.offset(), q = g.eq(l).outerWidth(), k = g.eq(l).outerHeight();
            if (e(d.top, d.left + q, d.top + k, d.left, r)) {
                return true
            }
        }
        return false
    }});
    b.dom.extend({draggable: function (o, l) {
        var u = this, p, d, k = {}, n, j, t = {options: {enable: true}, range: function (w) {
            switch (arguments.length) {
                case 0:
                    return e.range;
                    break;
                case 1:
                    e.range = w;
                    break
            }
            return i
        }, endOf: function (x) {
            switch (arguments.length) {
                case 0:
                    if (b.type(e.endOf) == "object") {
                        if (!d.w) {
                            d.w = d.outerWidth();
                            d.h = d.outerHeight()
                        }
                        var y = d.offset(), w = e.endOf;
                        if (y.left >= w.left && y.left + d.w <= w.right && y.top >= w.top && y.top + d.h <= w.bottom) {
                        } else {
                            i.cancel()
                        }
                    } else {
                        if (!b.dom(e.endOf).isCrash(p.target, true)) {
                            i.cancel()
                        }
                    }
                    return e.endOf;
                case 1:
                    e.endOf = x;
                    break
            }
            return i
        }, item: function () {
            return d
        }, zIndex: function (w) {
            if (typeof w != "undefined") {
                e.zIndex = w;
                u.css("z-index", w);
                return i
            } else {
                return e.zIndex
            }
        }, reset: function () {
            if (p) {
                d.offset(n)
            }
            return i
        }, cancel: function () {
            if (p) {
                p.cancel()
            }
            return i
        }, disable: function () {
            if (e.enable) {
                e.enable = false;
                if (o && b.type(o) != "object") {
                    u.find(o).css("cursor", "default")
                } else {
                    u.css("cursor", "default")
                }
            }
            return i
        }, enable: function () {
            if (!e.enable) {
                e.enable = true;
                if (o && b.type(o) != "object") {
                    u.find(o).css("cursor", "move")
                } else {
                    u.css("cursor", "move")
                }
            }
            return i
        }, dispose: function () {
            i.disable();
            if (p && p.dispose != true) {
                p.dispose()
            }
            u.off("mousedown");
            p = d = j = v = e = null;
            for (var w in i) {
                delete i[w]
            }
            i.dispose = true;
            return null
        }}, v = b.dom(document), i = b.setBack(b.createSingle(t), u), e = i.options, s = function (w) {
            if (~"input|textarea|select|option".indexOf(w.target.tagName.toLowerCase()) || !e.enable) {
                return
            }
            p && p.dispose();
            p = b.plugin._util_.drag(w.currentTarget);
            d = p.target;
            d.addClass("tang-draggable-dragging");
            i.fire("start", {target: d, pageX: w.pageX, pageY: w.pageY});
            if (!n) {
                n = d.offset()
            }
            if (e.range) {
                p.range(e.range)
            }
            if (e.zIndex) {
                i.zIndex(e.zIndex)
            }
            v.on("mouseup", r);
            v.on("dragging", m)
        }, r = function (w) {
            if (e.endOf) {
                i.endOf()
            }
            d.removeClass("tang-draggable-dragging");
            p.disable();
            i.fire("end");
            v.off("mouseup", r);
            v.off("dragging", m)
        }, m = function (w) {
            i.fire("dragging");
            q()
        }, h = function () {
            var w = ["start", "end", "dragging", "enter", "leave"];
            for (var x = 0; x < w.length; x++) {
                if (e["on" + w[x]]) {
                    i.on(w[x], e["on" + w[x]])
                }
            }
        }, g = function () {
            u.find(o).css("cursor", "move");
            u.on("mousedown", function (w) {
                if (b.dom(w.currentTarget).contains(w.target)) {
                    s(w)
                }
            })
        }, f = function (x) {
            for (var w in x) {
                e[w] = x[w]
            }
            if (e.focus) {
                j = b.dom(e.focus).not(u)
            }
            if (e.zIndex) {
                i.zIndex(e.zIndex)
            }
            if (e.enable == false) {
                e.enable = true;
                i.disable()
            }
            h()
        }, q = function () {
            if (e.focus && (e.onenter || e.onleave)) {
                var x = {};
                for (var A = 0, z = j.size(); A < z; A++) {
                    var w = j.eq(A), B = b.id(w.get(0));
                    if (w.isCrash(d)) {
                        if (!k[B]) {
                            k[B] = w.get(0);
                            i.fire("enter", {target: k[B]})
                        }
                        x[B] = w.get(0)
                    }
                }
                for (var y in k) {
                    if (k[y] && !x[y]) {
                        i.fire("leave", {target: k[y]});
                        k[y] = null
                    }
                }
            }
        };
        switch (arguments.length) {
            case 0:
                u.css("cursor", "move").on("mousedown", s);
                break;
            case 1:
                if (b.type(o) == "object") {
                    u.css("cursor", "move").on("mousedown", s);
                    f(o)
                } else {
                    g()
                }
                break;
            case 2:
                g();
                f(l);
                break
        }
        return i
    }});
    a = b;
    return a
}, ["/browse_static/common/lib/tangram/core/core.js"]);
F.module("/browse_static/common/lib/tangram/plugin/sortable/sortable.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/core/core.js");
    b.plugin = b.plugin || {};
    b.plugin._util_ = b.plugin._util_ || {};
    b.plugin._util_.drag = function (g) {
        var d, m = b.dom(document), p = b.dom(g).eq(0), i = p.offset(), e, o, j, f = function (r, q, s) {
            if (j) {
                q = Math.min(j.right - j.width, Math.max(j.left, q));
                s = Math.min(j.bottom - j.height, Math.max(j.top, s))
            }
            r.offset({left: q, top: s});
            m.trigger("dragging")
        }, l = function (q) {
            if (d) {
                return
            }
            d = setTimeout(function () {
                var r = p.offset();
                !e && (e = q.pageX - r.left);
                !o && (o = q.pageY - r.top);
                f(p, q.pageX - e, q.pageY - o);
                d = null
            }, 16)
        }, h = function (q) {
            return q.preventDefault()
        }, n = function () {
            m.on("selectstart", h);
            m.on("mousemove", l);
            if (p[0].setCapture) {
                p[0].setCapture()
            } else {
                if (window.captureEvents) {
                    window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
                }
            }
            if (document.selection) {
                document.selection.empty && document.selection.empty()
            } else {
                if (window.getSelection) {
                    window.getSelection().removeAllRanges()
                }
            }
        }, k = function () {
            clearTimeout(d);
            if (p[0].releaseCapture) {
                p[0].releaseCapture()
            } else {
                if (window.releaseEvents) {
                    window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)
                }
            }
            m.off("mousemove", l);
            m.off("selectstart", h)
        };
        m.trigger("dragstart", {target: p});
        n();
        return{target: p, disable: function () {
            k();
            e = o = null;
            m.trigger("dragend");
            return this
        }, enable: function () {
            m.trigger("dragstart");
            n();
            return this
        }, range: function (s) {
            if (s === undefined) {
                return j
            }
            var q = s, r;
            if (b.type(s) !== "object") {
                r = b.dom(s).eq(0);
                q = r.offset();
                q.right = q.left + r.outerWidth();
                q.bottom = q.top + r.outerHeight()
            }
            j = b.extend({left: Number.MIN_VALUE, top: Number.MIN_VALUE, right: Number.MAX_VALUE, bottom: Number.MAX_VALUE, width: p.outerWidth(), height: p.outerHeight()}, q);
            return this
        }, cancel: function () {
            p.offset(i);
            return this
        }, dispose: function () {
            k();
            e = o = m = p = i = j = null;
            for (var q in this) {
                delete this[q]
            }
            this.dispose = true;
            return null
        }}
    };
    b.dom.extend({isCrash: function (j, r) {
        if (!arguments.length) {
            return false
        }
        var p = this, t = b.dom(j).eq(0), f = t.offset(), s = t.outerWidth(), m = t.outerHeight(), n = p.size(), e = function (v, o, i, u, h) {
            if (h) {
                if ((f.top >= v) && ((f.top + m) <= i) && (f.left >= u) && ((f.left + s) <= o)) {
                    return true
                }
            } else {
                if (((f.top + m) >= v) && (f.top <= i) && ((f.left + s) >= u) && (f.left <= o)) {
                    return true
                }
            }
        };
        for (var l = 0; l < n; l++) {
            var g = p.eq(l), d = g.offset(), q = g.eq(l).outerWidth(), k = g.eq(l).outerHeight();
            if (e(d.top, d.left + q, d.top + k, d.left, r)) {
                return true
            }
        }
        return false
    }});
    b.dom.extend({draggable: function (o, l) {
        var u = this, p, d, k = {}, n, j, t = {options: {enable: true}, range: function (w) {
            switch (arguments.length) {
                case 0:
                    return e.range;
                    break;
                case 1:
                    e.range = w;
                    break
            }
            return i
        }, endOf: function (x) {
            switch (arguments.length) {
                case 0:
                    if (b.type(e.endOf) == "object") {
                        if (!d.w) {
                            d.w = d.outerWidth();
                            d.h = d.outerHeight()
                        }
                        var y = d.offset(), w = e.endOf;
                        if (y.left >= w.left && y.left + d.w <= w.right && y.top >= w.top && y.top + d.h <= w.bottom) {
                        } else {
                            i.cancel()
                        }
                    } else {
                        if (!b.dom(e.endOf).isCrash(p.target, true)) {
                            i.cancel()
                        }
                    }
                    return e.endOf;
                case 1:
                    e.endOf = x;
                    break
            }
            return i
        }, item: function () {
            return d
        }, zIndex: function (w) {
            if (typeof w != "undefined") {
                e.zIndex = w;
                u.css("z-index", w);
                return i
            } else {
                return e.zIndex
            }
        }, reset: function () {
            if (p) {
                d.offset(n)
            }
            return i
        }, cancel: function () {
            if (p) {
                p.cancel()
            }
            return i
        }, disable: function () {
            if (e.enable) {
                e.enable = false;
                if (o && b.type(o) != "object") {
                    u.find(o).css("cursor", "default")
                } else {
                    u.css("cursor", "default")
                }
            }
            return i
        }, enable: function () {
            if (!e.enable) {
                e.enable = true;
                if (o && b.type(o) != "object") {
                    u.find(o).css("cursor", "move")
                } else {
                    u.css("cursor", "move")
                }
            }
            return i
        }, dispose: function () {
            i.disable();
            if (p && p.dispose != true) {
                p.dispose()
            }
            u.off("mousedown");
            p = d = j = v = e = null;
            for (var w in i) {
                delete i[w]
            }
            i.dispose = true;
            return null
        }}, v = b.dom(document), i = b.setBack(b.createSingle(t), u), e = i.options, s = function (w) {
            if (~"input|textarea|select|option".indexOf(w.target.tagName.toLowerCase()) || !e.enable) {
                return
            }
            p && p.dispose();
            p = b.plugin._util_.drag(w.currentTarget);
            d = p.target;
            d.addClass("tang-draggable-dragging");
            i.fire("start", {target: d, pageX: w.pageX, pageY: w.pageY});
            if (!n) {
                n = d.offset()
            }
            if (e.range) {
                p.range(e.range)
            }
            if (e.zIndex) {
                i.zIndex(e.zIndex)
            }
            v.on("mouseup", r);
            v.on("dragging", m)
        }, r = function (w) {
            if (e.endOf) {
                i.endOf()
            }
            d.removeClass("tang-draggable-dragging");
            p.disable();
            i.fire("end");
            v.off("mouseup", r);
            v.off("dragging", m)
        }, m = function (w) {
            i.fire("dragging");
            q()
        }, h = function () {
            var w = ["start", "end", "dragging", "enter", "leave"];
            for (var x = 0; x < w.length; x++) {
                if (e["on" + w[x]]) {
                    i.on(w[x], e["on" + w[x]])
                }
            }
        }, g = function () {
            u.find(o).css("cursor", "move");
            u.on("mousedown", function (w) {
                if (b.dom(w.currentTarget).contains(w.target)) {
                    s(w)
                }
            })
        }, f = function (x) {
            for (var w in x) {
                e[w] = x[w]
            }
            if (e.focus) {
                j = b.dom(e.focus).not(u)
            }
            if (e.zIndex) {
                i.zIndex(e.zIndex)
            }
            if (e.enable == false) {
                e.enable = true;
                i.disable()
            }
            h()
        }, q = function () {
            if (e.focus && (e.onenter || e.onleave)) {
                var x = {};
                for (var A = 0, z = j.size(); A < z; A++) {
                    var w = j.eq(A), B = b.id(w.get(0));
                    if (w.isCrash(d)) {
                        if (!k[B]) {
                            k[B] = w.get(0);
                            i.fire("enter", {target: k[B]})
                        }
                        x[B] = w.get(0)
                    }
                }
                for (var y in k) {
                    if (k[y] && !x[y]) {
                        i.fire("leave", {target: k[y]});
                        k[y] = null
                    }
                }
            }
        };
        switch (arguments.length) {
            case 0:
                u.css("cursor", "move").on("mousedown", s);
                break;
            case 1:
                if (b.type(o) == "object") {
                    u.css("cursor", "move").on("mousedown", s);
                    f(o)
                } else {
                    g()
                }
                break;
            case 2:
                g();
                f(l);
                break
        }
        return i
    }});
    b.dom.extend({sortable: function (s, p) {
        var B = this, h = arguments.length, w, o = [], l, d, e = {}, t, C = {}, m = "", A = "", q = "", z = {options: {enable: true}, range: function (E) {
            switch (arguments.length) {
                case 0:
                    return f.range;
                    break;
                case 1:
                    f.range = E;
                    l.range(E);
                    break
            }
            return j
        }, item: function () {
            return B.find(".tang-sortable-item")
        }, index: function (J) {
            if (J == "set") {
                for (var I = 0, G = w.size(); I < G; I++) {
                    w.eq(I).data("sortable-id", I)
                }
                return j
            } else {
                var E = [], H = B.find(".tang-sortable-item");
                for (var I = 0, G = H.size(); I < G; I++) {
                    E.push(H.eq(I).data("sortable-id"))
                }
                return E
            }
        }, cancel: function () {
            B.html(A);
            u();
            (f.enable == false) && j.disable();
            return j
        }, reset: function () {
            B.html(m);
            u();
            (f.enable == false) && j.disable();
            return j
        }, disable: function () {
            f.enable = false;
            w.removeClass("tang-sortable-item");
            l.disable();
            return j
        }, enable: function () {
            if (!f.enable) {
                f.enable = true;
                l.enable()
            }
            return j
        }, dispose: function () {
            j.disable();
            l.dispose();
            D = f = B = w = o = d = e = t = C = null;
            for (var E in j) {
                delete j[E]
            }
            j.dispose = true;
            return null
        }}, D = b.dom(document), j = b.setBack(b.createSingle(z), B), f = j.options, k = function () {
            var E = ["start", "end", "dragging", "change"];
            for (var G = 0; G < E.length; G++) {
                if (f["on" + E[G]]) {
                    j.on(E[G], f["on" + E[G]])
                }
            }
            l.off("start", y);
            l.off("dragging", r);
            l.off("end", x);
            l.on("start", y);
            l.on("dragging", r);
            l.on("end", x)
        }, n = function () {
            o = [];
            for (var I = 0, H = w.size(); I < H; I++) {
                var K = w.eq(I), G = K.outerWidth(), J = K.outerHeight(), L = K.offset(), E = {top: L.top, bottom: L.top + J / 2, left: L.left, right: L.left + G}, M = {top: L.top + J / 2, bottom: L.top + J, left: L.left, right: L.left + G};
                o.push({id: I, target: K, up: E, down: M})
            }
        }, i = function (H, G) {
            var E = v(H.up, G), I = v(H.down, G);
            if (E && I) {
                return"both"
            } else {
                if (E && !I) {
                    return"up"
                } else {
                    if (I && !E) {
                        return"down"
                    } else {
                        return false
                    }
                }
            }
        }, v = function (G, E) {
            if (G.top > E.bottom || G.bottom < E.top || G.left > E.right || G.right < E.left) {
                return false
            } else {
                return true
            }
        }, y = function (E) {
            n();
            d = E.target;
            e = {id: d.data("sortable-id"), w: d.outerWidth(), h: d.outerHeight(), zIndex: d.css("z-index")};
            j.fire("start");
            q = B.html().replace(/\stang-draggable-dragging/g, "");
            t = d.clone();
            t.addClass("tang-sortable-clone");
            t.removeClass("tang-draggable-dragging tang-sortable-item");
            d.after(t);
            t.css("visibility", "hidden");
            d.css({position: "absolute", "z-index": 200});
            var G = t.offset();
            C.left = G.left;
            C.top = G.top
        }, r = function () {
            var H, E;
            var J = d.offset();
            e.top = J.top;
            e.left = J.left;
            e.bottom = J.top + e.h;
            e.right = J.left + e.w;
            for (var I = 0, G = o.length; I < G; I++) {
                if (o[I].id != e.id) {
                    E = i(o[I], e);
                    if (E == "up") {
                        o[I].target.before(t)
                    } else {
                        if (E == "down") {
                            o[I].target.after(t)
                        } else {
                            if (E == "both") {
                            } else {
                            }
                        }
                    }
                }
            }
            j.fire("dragging")
        }, x = function () {
            var E = t.offset();
            if (E.left == C.left && E.top == C.top) {
            } else {
                A = q;
                j.fire("change");
                t.after(d)
            }
            d.css({position: "static", left: "", top: "", "z-index": e.zIndex});
            t.remove();
            t = null;
            j.fire("end")
        }, g = function (G) {
            for (var E in G) {
                f[E] = G[E]
            }
            (f.enable == false) && j.disable()
        }, u = function () {
            switch (h) {
                case 0:
                    w = B.children();
                    break;
                case 1:
                    if (b.type(s) == "object") {
                        w = B.children();
                        g(s)
                    } else {
                        w = B.find(s)
                    }
                    break;
                case 2:
                    w = B.find(s);
                    g(p);
                    break
            }
            w.addClass("tang-sortable-item");
            l = b(w).draggable().range(f.range);
            j.index("set");
            k()
        };
        u();
        m = A = B.html();
        return j
    }});
    a = b;
    return a
}, ["/browse_static/common/lib/tangram/core/core.js"]);
F.module("/browse_static/common/lib/tangram/plugin/fx/fx.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/core/core.js");
    (function (e) {
        var d = b.dom.data, f = function (j, i, h, k) {
            var g;
            if (!j.size()) {
                return j
            }
            return k || i ? j.each(h) : h.call(g = j[0], 0, g)
        };
        b._queueHooks = function (j, i) {
            var h = i + "queueHooks", g;
            return d(j, h) || (d(j, h, g = {empty: b.Callbacks("once memory").add(function () {
                d(j, i + "queue", null);
                d(j, h, null)
            })}), g)
        };
        b.plugin("dom", {queue: function (h, i, j) {
            var g;
            if (typeof h !== "string") {
                i = h;
                h = e
            }
            h = h || "fx";
            g = h + "queue";
            return f(this, i, function () {
                var k = d(this, g);
                if (i) {
                    if (!k || b.isArray(i)) {
                        d(this, g, k = b.makeArray(i))
                    } else {
                        k.push(i)
                    }
                    b._queueHooks(this, h);
                    if (!j && h === "fx" && k[0] !== "inprogress") {
                        b.dequeue(this, h)
                    }
                }
                return k || []
            }, arguments.length > 1 || i)
        }, dequeue: function (g) {
            g = g || "fx";
            return f(this, true, function () {
                var m = this, i = b.queue(m, g), l = i.length, k = i.shift(), h = b._queueHooks(m, g), j = function () {
                    b.dequeue(m, g)
                };
                if (k === "inprogress") {
                    k = i.shift();
                    l--
                }
                h.cur = k;
                if (k) {
                    if (g === "fx") {
                        i.unshift("inprogress")
                    }
                    delete h.stop;
                    k.call(m, j, h)
                }
                !l && h && h.empty.fire()
            })
        }});
        b.queue = b.dom.queue;
        b.dequeue = b.dom.dequeue
    })();
    b.fx = b.fx || {};
    (function (g) {
        var i = b.fx, f = 13, h = [], o = (function () {
            var s = {_default: {next: function (t) {
                return setTimeout(t, f)
            }, cancel: function (t) {
                return clearTimeout(t)
            }}}, q = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame, r = window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame;
            q && r && (s.frame = {next: q, cancel: r});
            return function (t) {
                return s[t] || s._default
            }
        })(), e = function () {
            return(new Date()).getTime()
        }, n = function () {
            setTimeout(function () {
                p = g
            }, 0);
            return p = e()
        }, l = function () {
            var r, q = 0;
            p = e();
            for (; q < h.length; q++) {
                r = h[q];
                if (!r() && h[q] === r) {
                    h.splice(q--, 1)
                }
            }
            if (!h.length) {
                m()
            } else {
                d(true)
            }
            p = g
        }, d = function (q) {
            j = j || (i.strategy = o(i.useAnimationFrame ? "frame" : "_default"));
            k = (q ? false : k) || j.next.call(null, l)
        }, m = function () {
            j && j.cancel.call(null, k);
            k = j = null
        }, k, p, j;
        b.extend(i, {timer: function (q) {
            if (q === g) {
                return h
            }
            q() && h.push(q) && d()
        }, now: function () {
            return p || n()
        }, tick: l, useAnimationFrame: true})
    })();
    b.plugin = b.plugin || {};
    b.plugin._util_ = b.plugin._util_ || {};
    void function () {
        var d = b.dom.css, e = b._util_.cssNumber;
        b.extend(b.plugin._util_.fx = {}, {cssUnit: function (f) {
            return e[f] ? "" : "px"
        }, getCss: function (h, g) {
            var i = d(h, g), f = parseFloat(i);
            return !isNaN(f) && isFinite(f) ? f || 0 : i
        }, propExpand: (function () {
            var f = {}, g = ["Top", "Right", "Bottom", "Left"];
            b.forEach({margin: "", padding: "", border: "Width"}, function (i, h) {
                f[h + i] = {expand: function (l) {
                    var k = 0, j = {}, m = typeof l === "string" ? l.split(" ") : [l];
                    for (; k < 4; k++) {
                        j[h + g[k] + i] = m[k] || m[k - 2] || m[0]
                    }
                    return j
                }}
            });
            return function (j, i) {
                var h = f[j];
                return h ? h.expand(i) : null
            }
        })(), getAllData: (function () {
            var f = b.key, g = b.global("_maps_HTMLElementData");
            return function (i) {
                var h = i[f];
                return h && g[h] || []
            }
        })()})
    }();
    (function (g) {
        var h = b.fx, f = b.plugin._util_.fx, i = b.dom.css, e = f.cssUnit, j = b._util_.cssHooks, d = f.getCss, k = {linear: function (m) {
            return m
        }, swing: function (m) {
            return 0.5 - Math.cos(m * Math.PI) / 2
        }};

        function l(o, n, q, m, p) {
            return new l.prototype.init(o, n, q, m, p)
        }

        l.prototype = {constructor: l, init: function (p, n, r, m, q, o) {
            this.elem = p;
            this.prop = r;
            this.easing = q || "swing";
            this.options = n;
            this.start = this.now = this.cur();
            this.end = m;
            this.unit = o || e(r)
        }, cur: function () {
            var m = l.propHooks[this.prop];
            return m && m.get ? m.get(this) : l.propHooks._default.get(this)
        }, run: function (o) {
            var n, m = l.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = n = k[this.easing](o, this.options.duration * o, 0, 1, this.options.duration)
            } else {
                this.pos = n = o
            }
            this.now = (this.end - this.start) * n + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }
            if (m && m.set) {
                m.set(this)
            } else {
                l.propHooks._default.set(this)
            }
            return this
        }};
        l.prototype.init.prototype = l.prototype;
        l.propHooks = {_default: {get: function (n) {
            var m, p = n.elem, o;
            if (p[n.prop] != null && (!(o = p.style) || o[n.prop] == null)) {
                return p[n.prop]
            }
            m = d(p, n.prop);
            return !m || m === "auto" ? 0 : m
        }, set: function (m) {
            var o = m.elem, n = o.style;
            if (n && (n[m.prop] != null || j[m.prop])) {
                i(o, m.prop, m.now + m.unit)
            } else {
                o[m.prop] = m.now
            }
        }}};
        l.propHooks.scrollTop = l.propHooks.scrollLeft = {set: function (m) {
            var n = m.elem;
            if (n.nodeType && n.parentNode) {
                n[m.prop] = m.now
            }
        }};
        b.extend(h, {Tween: l, easing: k})
    })();
    (function (k) {
        var g = b.fx, e = b.plugin._util_.fx, v = e.cssUnit, p = b.dom.css, u = b.dom.data, j = b._util_.isHidden, t = e.getCss, m = e.propExpand, r = b.string.toCamelCase, i = g.now, f = /^(?:toggle|show|hide)$/i, h = /^(?:([+-])=|)([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))([a-z%]*)$/i, n = [o], d = {"*": [function (w, E) {
            var A, G, H = this.createTween(w, E), y = H.elem, B = h.exec(E), C = H.cur(), x = +C || 0, z = 1, D = 20;
            if (B) {
                A = +B[2];
                G = B[3] || v(w);
                if (G !== "px" && x) {
                    x = t(y, w) || A || 1;
                    do {
                        z = z || ".5";
                        x = x / z;
                        p(y, w, x + G)
                    } while (z !== (z = H.cur() / C) && z !== 1 && --D)
                }
                H.unit = G;
                H.start = x;
                H.end = B[1] ? x + (B[1] + 1) * A : A
            }
            return H
        }]};

        function l(x, w) {
            b.forEach(w, function (A, C) {
                var B = (d[C] || []).concat(d["*"]), y = 0, z = B.length;
                for (; y < z; y++) {
                    if (B[y].call(x, C, A)) {
                        return
                    }
                }
            })
        }

        function s(y, C, G) {
            var H, w, B = 0, x = n.length, E = b.Deferred().always(function () {
                delete A.elem
            }), A = function () {
                if (w) {
                    return false
                }
                var N = i(), K = Math.max(0, z.startTime + z.duration - N), I = K / z.duration || 0, M = 1 - I, J = 0, L = z.tweens.length;
                for (; J < L; J++) {
                    z.tweens[J].run(M)
                }
                E.notifyWith(y, [z, M, K]);
                if (M < 1 && L) {
                    return K
                } else {
                    E.resolveWith(y, [z]);
                    return false
                }
            }, z = E.promise({elem: y, props: b.extend({}, C), opts: b.extend(true, {specialEasing: {}}, G), originalProperties: C, originalOptions: G, startTime: i(), duration: G.duration, tweens: [], createTween: function (K, I) {
                var J = g.Tween(y, z.opts, K, I, z.opts.specialEasing[K] || z.opts.easing);
                z.tweens.push(J);
                return J
            }, stop: function (J) {
                var I = 0, K = J ? z.tweens.length : 0;
                if (w) {
                    return this
                }
                w = true;
                for (; I < K; I++) {
                    z.tweens[I].run(1)
                }
                E[J ? "resolveWith" : "rejectWith"](y, [z, J]);
                return this
            }}), D = z.props;
            q(D, z.opts.specialEasing);
            for (; B < x; B++) {
                H = n[B].call(z, y, D, z.opts);
                if (H) {
                    return H
                }
            }
            l(z, D);
            if (b.isFunction(z.opts.start)) {
                z.opts.start.call(y, z)
            }
            g.timer(b.extend(A, {elem: y, anim: z, queue: z.opts.queue}));
            return z.progress(z.opts.progress).done(z.opts.done, z.opts.complete).fail(z.opts.fail).always(z.opts.always)
        }

        function q(z, B) {
            var A, y, x, C, w;
            for (x in z) {
                y = r(x);
                C = B[y];
                A = z[x];
                if (b.isArray(A)) {
                    C = A[1];
                    A = z[x] = A[0]
                }
                if (x !== y) {
                    z[y] = A;
                    delete z[x]
                }
                w = m(y, A);
                if (w) {
                    A = w;
                    delete z[y];
                    for (x in A) {
                        if (!(x in z)) {
                            z[x] = A[x];
                            B[x] = C
                        }
                    }
                } else {
                    B[y] = C
                }
            }
        }

        g.Animation = b.extend(s, {tweener: function (x, A) {
            if (b.isFunction(x)) {
                A = x;
                x = ["*"]
            } else {
                x = x.split(" ")
            }
            var z, w = 0, y = x.length;
            for (; w < y; w++) {
                z = x[w];
                d[z] = d[z] || [];
                d[z].unshift(A)
            }
        }, prefilter: function (x, w) {
            if (w) {
                n.unshift(x)
            } else {
                n.push(x)
            }
        }});
        function o(O, z, H) {
            var y, C, A, I, E, J, B, w, K, L = this, N = O.style, x = {}, D = [], M = O.nodeType && j(O), G = b._util_.support;
            if (!H.queue) {
                w = b._queueHooks(O, "fx");
                if (w.unqueued == null) {
                    w.unqueued = 0;
                    K = w.empty.fire;
                    w.empty.fire = function () {
                        if (!w.unqueued) {
                            K()
                        }
                    }
                }
                w.unqueued++;
                L.always(function () {
                    L.always(function () {
                        w.unqueued--;
                        if (!b.queue(O, "fx").length) {
                            w.empty.fire()
                        }
                    })
                })
            }
            if (O.nodeType === 1 && ("height" in z || "width" in z)) {
                H.overflow = [N.overflow, N.overflowX, N.overflowY];
                if (p(O, "display") === "inline" && p(O, "float") === "none") {
                    N.display = "inline-block";
                    if (!G.inlineBlockNeedsLayout) {
                        N.display = "inline-block"
                    } else {
                        N.zoom = 1
                    }
                }
            }
            if (H.overflow) {
                N.overflow = "hidden";
                if (!G.shrinkWrapBlocks) {
                    L.always(function () {
                        N.overflow = H.overflow[0];
                        N.overflowX = H.overflow[1];
                        N.overflowY = H.overflow[2]
                    })
                }
            }
            for (C in z) {
                I = z[C];
                if (f.exec(I)) {
                    delete z[C];
                    J = J || I === "toggle";
                    if (I === (M ? "hide" : "show")) {
                        continue
                    }
                    D.push(C)
                }
            }
            A = D.length;
            if (A) {
                E = u(O, "fxshow");
                E || u(O, "fxshow", E = {});
                if ("hidden" in E) {
                    M = E.hidden
                }
                if (J) {
                    E.hidden = !M
                }
                if (M) {
                    b.dom(O).show()
                } else {
                    L.done(function () {
                        b.dom(O).hide()
                    })
                }
                L.done(function () {
                    var P;
                    u(O, "fxshow", null);
                    for (P in x) {
                        p(O, P, x[P])
                    }
                });
                for (C = 0; C < A; C++) {
                    y = D[C];
                    B = L.createTween(y, M ? E[y] : 0);
                    x[y] = E[y] || p(O, y);
                    if (!(y in E)) {
                        E[y] = B.start;
                        if (M) {
                            B.end = B.start;
                            B.start = y === "width" || y === "height" ? 1 : 0
                        }
                    }
                }
            }
        }
    })();
    (function () {
        var g = b.fx, i = g.Animation, h = b.dom.data, e = {slow: 600, fast: 200, _default: 400};

        function f(k) {
            var j;
            for (j in k) {
                return false
            }
            return true
        }

        function d(l, m, k) {
            var j = l && typeof l === "object" ? b.extend({}, l) : {complete: k || !k && m || b.isFunction(l) && l, duration: l, easing: k && m || m && !b.isFunction(m) && m};
            j.duration = g.off ? 0 : typeof j.duration === "number" ? j.duration : j.duration in e ? e[j.duration] : e._default;
            if (j.queue == null || j.queue === true) {
                j.queue = "fx"
            }
            j.old = j.complete;
            j.complete = function () {
                if (b.isFunction(j.old)) {
                    j.old.call(this)
                }
                if (j.queue) {
                    b.dequeue(this, j.queue)
                }
            };
            return j
        }

        b.plugin("dom", {animate: function (p, m, o, n) {
            var l = f(p), k = d(m, o, n), j = function () {
                var q = i(this, b.extend({}, p), k);
                j.finish = function () {
                    q.stop(true)
                };
                if (l || h(this, "finish")) {
                    q.stop(true)
                }
            };
            j.finish = j;
            return l || k.queue === false ? this.each(j) : this.queue(k.queue, j)
        }});
        b.extend(g, {speeds: e, off: false})
    })();
    b.plugin("dom", {clearQueue: function (d) {
        return this.queue(d || "fx", [])
    }});
    b.plugin("dom", {delay: function (e, d) {
        d = d || "fx";
        return this.queue(d, function (g, f) {
            var h = setTimeout(g, e || 0);
            f.stop = function () {
                clearTimeout(h)
            }
        })
    }});
    (function () {
        var e = b.fx, d = b.plugin._util_.fx, f = d.getAllData;
        b.plugin("dom", {finish: function (g) {
            if (g !== false) {
                g = g || "fx"
            }
            return this.each(function () {
                var j, n = f(this), i = n[g + "queue"], h = n[g + "queueHooks"], m = e.timer(), l, k = i ? i.length : 0;
                n.finish = true;
                b.queue(this, g, [], true);
                if (h && h.cur && h.cur.finish) {
                    h.cur.finish.call(this)
                }
                for (j = m.length; j--;) {
                    l = m[j];
                    if (l.elem === this && l.queue === g) {
                        l.anim.stop(true);
                        m.splice(j, 1)
                    }
                }
                for (j = 0; j < k; j++) {
                    l = i[j];
                    if (l && l.finish) {
                        l.finish.call(this)
                    }
                }
                delete n.finish
            })
        }})
    })();
    (function () {
        var f = b._util_.isHidden, g = ["Top", "Right", "Bottom", "Left"], d = {};

        function e(k, m) {
            var l, h = {height: k}, j = 0;
            m = m ? 1 : 0;
            for (; j < 4; j += 2 - m) {
                l = g[j];
                h["margin" + l] = h["padding" + l] = k
            }
            if (m) {
                h.opacity = h.width = k
            }
            return h
        }

        b.forEach({slideDown: e("show"), slideUp: e("hide"), slideToggle: e("toggle"), fadeIn: {opacity: "show"}, fadeOut: {opacity: "hide"}, fadeToggle: {opacity: "toggle"}}, function (i, h) {
            d[h] = function (j, l, k) {
                return this.animate(i, j, l, k)
            }
        });
        b.forEach(["toggle", "show", "hide"], function (h, j) {
            var k = b.dom.fn[h];
            d[h] = function (i, m, l) {
                return i == null || typeof i === "boolean" ? k ? k.apply(this, arguments) : this : this.animate(e(h, true), i, m, l)
            }
        });
        d.fadeTo = function (h, k, j, i) {
            this.filter(function () {
                return f(this)
            }).css("opacity", 0).show();
            return this.animate({opacity: k}, h, j, i)
        };
        b.plugin("dom", d)
    })();
    (function (e) {
        var d = b.dom.data;
        b.plugin("dom", {promise: function (h, m) {
            var g, j = 1, n = b.Deferred(), l = this, f = this.length, k = function () {
                if (!(--j)) {
                    n.resolveWith(l, [l])
                }
            };
            if (typeof h !== "string") {
                m = h;
                h = e
            }
            h = h || "fx";
            while (f--) {
                g = d(l[f], h + "queueHooks");
                if (g && g.empty) {
                    j++;
                    g.empty.add(k)
                }
            }
            k();
            return n.promise(m)
        }})
    })();
    (function () {
        var e = b.fx, d = b.plugin._util_.fx, f = /queueHooks$/, g = d.getAllData;
        b.plugin("dom", {stop: function (j, i, h) {
            var k = function (l) {
                var m = l.stop;
                delete l.stop;
                m(h)
            };
            if (typeof j !== "string") {
                h = i;
                i = j;
                j = undefined
            }
            if (i && j !== false) {
                this.queue(j || "fx", [])
            }
            return this.each(function () {
                var o = true, l = j != null && j + "queueHooks", n = e.timer(), m = g(this);
                if (l) {
                    if (m[l] && m[l].stop) {
                        k(m[l])
                    }
                } else {
                    for (l in m) {
                        if (m[l] && m[l].stop && f.test(l)) {
                            k(m[l])
                        }
                    }
                }
                for (l = n.length; l--;) {
                    if (n[l].elem === this && (j == null || n[l].queue === j)) {
                        n[l].anim.stop(h);
                        o = false;
                        n.splice(l, 1)
                    }
                }
                if (o || !h) {
                    b.dequeue(this, j)
                }
            })
        }})
    })();
    a = b;
    return a
}, ["/browse_static/common/lib/tangram/core/core.js"]);
F.module("/browse_static/common/lib/tangram/core/core.js", function (d, a) {
    var c, b = c = function () {
        var g, f = g = f || function (h, i) {
            return f.dom ? f.dom(h, i) : null
        };
        f.version = "2.0.2.4";
        f.guid = "$BAIDU$";
        f.key = "tangram_guid";
        var e = window[f.guid] = window[f.guid] || {};
        (e.versions || (e.versions = [])).push(f.version);
        f.check = f.check || function () {
        };
        f.lang = f.lang || {};
        f.forEach = function (h, m, l) {
            var k, o, j;
            if (typeof m == "function" && h) {
                o = typeof h.length == "number" ? h.length : h.byteLength;
                if (typeof o == "number") {
                    if (Object.prototype.toString.call(h) === "[object Function]") {
                        return h
                    }
                    for (k = 0; k < o; k++) {
                        j = h[k];
                        j === undefined && (j = h.charAt && h.charAt(k));
                        m.call(l || null, j, k, h)
                    }
                } else {
                    if (typeof h == "number") {
                        for (k = 0; k < h; k++) {
                            m.call(l || null, k, k, k)
                        }
                    } else {
                        if (typeof h == "object") {
                            for (k in h) {
                                if (h.hasOwnProperty(k)) {
                                    m.call(l || null, h[k], k, h)
                                }
                            }
                        }
                    }
                }
            }
            return h
        };
        f.type = (function () {
            var i = {}, h = [, "HTMLElement", "Attribute", "Text", , , , , "Comment", "Document", , "DocumentFragment", ], l = "Array Boolean Date Error Function Number RegExp String", j = {object: 1, "function": "1"}, k = i.toString;
            f.forEach(l.split(" "), function (m) {
                i["[object " + m + "]"] = m.toLowerCase();
                f["is" + m] = function (n) {
                    return f.type(n) == m.toLowerCase()
                }
            });
            return function (n) {
                var m = typeof n;
                return !j[m] ? m : n == null ? "null" : n._type_ || i[k.call(n)] || h[n.nodeType] || (n == n.window ? "Window" : "") || "object"
            }
        })();
        f.isDate = function (h) {
            return f.type(h) == "date" && h.toString() != "Invalid Date" && !isNaN(h)
        };
        f.isElement = function (h) {
            return f.type(h) == "HTMLElement"
        };
        f.isEnumerable = function (h) {
            return h != null && (typeof h == "object" || ~Object.prototype.toString.call(h).indexOf("NodeList")) && (typeof h.length == "number" || typeof h.byteLength == "number" || typeof h[0] != "undefined")
        };
        f.isNumber = function (h) {
            return f.type(h) == "number" && isFinite(h)
        };
        f.isPlainObject = function (j) {
            var h, i = Object.prototype.hasOwnProperty;
            if (f.type(j) != "object") {
                return false
            }
            if (j.constructor && !i.call(j, "constructor") && !i.call(j.constructor.prototype, "isPrototypeOf")) {
                return false
            }
            for (h in j) {
            }
            return h === undefined || i.call(j, h)
        };
        f.isObject = function (h) {
            return typeof h === "function" || (typeof h === "object" && h != null)
        };
        f.extend = function (k, o) {
            var l, u, s, h, j, p = 1, m = arguments.length, t = k || {}, q, r;
            f.isBoolean(k) && (p = 2) && (t = o || {});
            !f.isObject(t) && (t = {});
            for (; p < m; p++) {
                u = arguments[p];
                if (f.isObject(u)) {
                    for (s in u) {
                        h = t[s];
                        j = u[s];
                        if (h === j) {
                            continue
                        }
                        if (f.isBoolean(k) && k && j && (f.isPlainObject(j) || (q = f.isArray(j)))) {
                            if (q) {
                                q = false;
                                r = h && f.isArray(h) ? h : []
                            } else {
                                r = h && f.isPlainObject(h) ? h : {}
                            }
                            t[s] = f.extend(k, r, j)
                        } else {
                            if (j !== undefined) {
                                t[s] = j
                            }
                        }
                    }
                }
            }
            return t
        };
        f.createChain = function (m, k, j) {
            var i = m == "dom" ? "$DOM" : "$" + m.charAt(0).toUpperCase() + m.substr(1), l = Array.prototype.slice, h = f[m];
            if (h) {
                return h
            }
            h = f[m] = k || function (n) {
                return f.extend(n, f[m].fn)
            };
            h.extend = function (n) {
                var o;
                for (o in n) {
                    (function (p) {
                        if (p != "splice") {
                            h[p] = function () {
                                var s = arguments[0];
                                m == "dom" && f.type(s) == "string" && (s = "#" + s);
                                var r = h(s);
                                var q = r[p].apply(r, l.call(arguments, 1));
                                return f.type(q) == "$DOM" ? q.get(0) : q
                            }
                        }
                    })(o)
                }
                return f.extend(f[m].fn, n)
            };
            f[m][i] = f[m][i] || j || function () {
            };
            h.fn = f[m][i].prototype;
            return h
        };
        f.overwrite = function (h, l, k) {
            for (var j = l.length - 1; j > -1; j--) {
                h.prototype[l[j]] = k(l[j])
            }
            return h
        };
        f.object = f.object || {};
        f.object.isPlain = f.isPlainObject;
        f.createChain("string", function (h) {
            var i = f.type(h), k = new String(~"string|number".indexOf(i) ? h : i), j = String.prototype;
            f.forEach(f.string.$String.prototype, function (m, l) {
                j[l] || (k[l] = m)
            });
            return k
        });
        f.string.extend({trim: function () {
            var h = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
            return function () {
                return this.replace(h, "")
            }
        }()});
        f.createChain("array", function (k) {
            var j = f.array.$Array.prototype, i = Array.prototype, h;
            f.type(k) != "array" && (k = []);
            for (h in j) {
                k[h] = j[h]
            }
            return k
        });
        f.overwrite(f.array.$Array, "concat slice".split(" "), function (h) {
            return function () {
                return f.array(Array.prototype[h].apply(this, arguments))
            }
        });
        f.array.extend({indexOf: function (i, j) {
            f.check(".+(,number)?", "baidu.array.indexOf");
            var h = this.length;
            (j = j | 0) < 0 && (j = Math.max(0, h + j));
            for (; j < h; j++) {
                if (j in this && this[j] === i) {
                    return j
                }
            }
            return -1
        }});
        f.createChain("Callbacks", function (h) {
            var i = h;
            if (f.type(h) === "string") {
                i = {};
                f.forEach(h.split(/\s/), function (j) {
                    i[j] = true
                })
            }
            return new f.Callbacks.$Callbacks(i)
        }, function (r) {
            var i = f.extend({}, r || {}), o = [], k = [], l = 0, n, h, q, j, m = function (v, s) {
                var u, t;
                if (!k || !o) {
                    return
                }
                n = i.memory && v;
                q = true;
                k.push(v);
                if (j) {
                    return
                }
                j = true;
                while (u = k.shift()) {
                    for (l = s || 0; t = o[l]; l++) {
                        if (t.apply(u[0], u[1]) === false && i.stopOnFalse) {
                            n = false;
                            break
                        }
                    }
                }
                j = false;
                i.once && (o = [])
            }, p = {add: function () {
                if (!o) {
                    return this
                }
                var s = o && o.length;
                (function t(v) {
                    var u = v.length, x, y;
                    for (var w = 0, y; w < u; w++) {
                        if (!(y = v[w])) {
                            continue
                        }
                        x = f.type(y);
                        if (x === "function") {
                            (!i.unique || !p.has(y)) && o.push(y)
                        } else {
                            if (y && y.length && x !== "string") {
                                t(y)
                            }
                        }
                    }
                })(arguments);
                !j && n && m(n, s);
                return this
            }, remove: function () {
                if (!o) {
                    return this
                }
                var s;
                f.forEach(arguments, function (t) {
                    while ((s = f.array(o).indexOf(t)) > -1) {
                        o.splice(s, 1);
                        j && s < l && l--
                    }
                });
                return this
            }, has: function (s) {
                return f.array(o).indexOf(s) > -1
            }, empty: function () {
                return o = [], this
            }, disable: function () {
                return o = k = n = undefined, this
            }, disabled: function () {
                return !o
            }, lock: function () {
                h = true;
                !n && p.disable();
                return this
            }, fired: function () {
                return q
            }, fireWith: function (t, s) {
                if (q && i.once || h) {
                    return this
                }
                s = s || [];
                s = [t, s.slice ? s.slice() : s];
                m(s);
                return this
            }, fire: function () {
                p.fireWith(this, arguments);
                return this
            }};
            return p
        });
        f.createChain("Deferred", function (h) {
            return new f.Deferred.$Deferred(h)
        }, function (i) {
            var j = this, k = "pending", h = [
                ["resolve", "done", f.Callbacks("once memory"), "resolved"],
                ["reject", "fail", f.Callbacks("once memory"), "rejected"],
                ["notify", "progress", f.Callbacks("memory")]
            ], l = {state: function () {
                return k
            }, always: function () {
                j.done(arguments).fail(arguments);
                return this
            }, then: function () {
                var m = arguments;
                return f.Deferred(function (n) {
                    f.forEach(h, function (q, o) {
                        var r = q[0], p = m[o];
                        j[q[1]](f.type(p) === "function" ? function () {
                            var s = p.apply(this, arguments);
                            if (s && f.type(s.promise) === "function") {
                                s.promise().done(n.resolve).fail(n.reject).progress(n.notify)
                            } else {
                                n[r + "With"](this === j ? n : this, [s])
                            }
                        } : n[r])
                    })
                }).promise()
            }, promise: function (m) {
                return m != null ? f.extend(m, l) : l
            }};
            l.pipe = l.then;
            f.forEach(h, function (o, m) {
                var n = o[2], p = o[3];
                l[o[1]] = n.add;
                p && n.add(function () {
                    k = p
                }, h[m ^ 1][2].disable, h[2][2].lock);
                j[o[0]] = n.fire;
                j[o[0] + "With"] = n.fireWith
            });
            l.promise(j);
            i && i.call(j, j)
        });
        f.when = f.when || function (n) {
            var q = arguments, o = arguments.length, k = o !== 1 || (n && f.type(n.promise) === "function") ? o : 0, h = k === 1 ? n : f.Deferred(), j, p, r;

            function l(i, t, s) {
                return function (u) {
                    t[i] = this;
                    s[i] = arguments.length > 1 ? arguments : u;
                    if (s === j) {
                        h.notifyWith(t, s)
                    } else {
                        if (!(--k)) {
                            h.resolveWith(t, s)
                        }
                    }
                }
            }

            if (o > 1) {
                j = new Array(o);
                p = new Array(o);
                r = new Array(o);
                for (var m = 0; m < o; m++) {
                    if (q[m] && f.type(q[m].promise) === "function") {
                        q[m].promise().done(l(m, r, q)).fail(h.reject).progress(l(m, p, j))
                    } else {
                        --k
                    }
                }
            }
            !k && h.resolveWith(r, q);
            return h.promise()
        };
        f.global = f.global || (function () {
            var i = f._global_ = window[f.guid], h = i._ = i._ || {};
            return function (k, l, j) {
                if (typeof l != "undefined") {
                    j || (l = typeof h[k] == "undefined" ? l : h[k]);
                    h[k] = l
                } else {
                    if (k && typeof h[k] == "undefined") {
                        h[k] = {}
                    }
                }
                return h[k]
            }
        })();
        f.browser = f.browser || function () {
            var i = navigator.userAgent;
            var h = {isStrict: document.compatMode == "CSS1Compat", isGecko: /gecko/i.test(i) && !/like gecko/i.test(i), isWebkit: /webkit/i.test(i)};
            try {
                /(\d+\.\d+)/.test(external.max_version) && (h.maxthon = +RegExp["\x241"])
            } catch (j) {
            }
            switch (true) {
                case /msie (\d+\.\d+)/i.test(i):
                    h.ie = document.documentMode || +RegExp["\x241"];
                    break;
                case /chrome\/(\d+\.\d+)/i.test(i):
                    h.chrome = +RegExp["\x241"];
                    break;
                case /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(i) && !/chrome/i.test(i):
                    h.safari = +(RegExp["\x241"] || RegExp["\x242"]);
                    break;
                case /firefox\/(\d+\.\d+)/i.test(i):
                    h.firefox = +RegExp["\x241"];
                    break;
                case /opera(?:\/| )(\d+(?:\.\d+)?)(.+?(version\/(\d+(?:\.\d+)?)))?/i.test(i):
                    h.opera = +(RegExp["\x244"] || RegExp["\x241"]);
                    break
            }
            f.extend(f, h);
            return h
        }();
        f.id = function () {
            var i = f.global("_maps_id"), h = f.key;
            window[f.guid]._counter = window[f.guid]._counter || 1;
            return function (k, n) {
                var m, l = f.isString(k), j = f.isObject(k), o = j ? k[h] : l ? k : "";
                if (f.isString(n)) {
                    switch (n) {
                        case"get":
                            return j ? o : i[o];
                        case"remove":
                        case"delete":
                            if (m = i[o]) {
                                if (f.isElement(m) && f.browser.ie < 8) {
                                    m.removeAttribute(h)
                                } else {
                                    delete m[h]
                                }
                                delete i[o]
                            }
                            return o;
                        default:
                            if (l) {
                                (m = i[o]) && delete i[o];
                                m && (i[m[h] = n] = m)
                            } else {
                                if (j) {
                                    o && delete i[o];
                                    i[k[h] = n] = k
                                }
                            }
                            return n
                    }
                }
                if (j) {
                    !o && (i[k[h] = o = f.id()] = k);
                    return o
                } else {
                    if (l) {
                        return i[k]
                    }
                }
                return"TANGRAM_" + f._global_._counter++
            }
        }();
        f._util_ = f._util_ || {};
        f._util_.support = f._util_.support || function () {
            var m = document.createElement("div"), l, i, j, h, k;
            m.setAttribute("className", "t");
            m.innerHTML = ' <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
            i = m.getElementsByTagName("A")[0];
            i.style.cssText = "top:1px;float:left;opacity:.5";
            h = document.createElement("select");
            k = h.appendChild(document.createElement("option"));
            j = m.getElementsByTagName("input")[0];
            j.checked = true;
            l = {dom: {div: m, a: i, select: h, opt: k, input: j}};
            return l
        }();
        f.createChain("event", function () {
            var h = {};
            return function (j, i) {
                switch (f.type(j)) {
                    case"object":
                        return h.originalEvent === j ? h : h = new f.event.$Event(j);
                    case"$Event":
                        return j
                }
            }
        }(),function (l) {
            var o, j, m;
            var k = this;
            this._type_ = "$Event";
            if (typeof l == "object" && l.type) {
                k.originalEvent = o = l;
                for (var i in o) {
                    if (typeof o[i] != "function") {
                        k[i] = o[i]
                    }
                }
                if (o.extraData) {
                    f.extend(k, o.extraData)
                }
                k.target = k.srcElement = o.srcElement || ((j = o.target) && (j.nodeType == 3 ? j.parentNode : j));
                k.relatedTarget = o.relatedTarget || ((j = o.fromElement) && (j === k.target ? o.toElement : j));
                k.keyCode = k.which = o.keyCode || o.which;
                if (!k.which && o.button !== undefined) {
                    k.which = o.button & 1 ? 1 : (o.button & 2 ? 3 : (o.button & 4 ? 2 : 0))
                }
                var n = document.documentElement, h = document.body;
                k.pageX = o.pageX || (o.clientX + (n && n.scrollLeft || h && h.scrollLeft || 0) - (n && n.clientLeft || h && h.clientLeft || 0));
                k.pageY = o.pageY || (o.clientY + (n && n.scrollTop || h && h.scrollTop || 0) - (n && n.clientTop || h && h.clientTop || 0));
                k.data
            }
            this.timeStamp = new Date().getTime()
        }).extend({stopPropagation: function () {
            var h = this.originalEvent;
            h && (h.stopPropagation ? h.stopPropagation() : h.cancelBubble = true)
        }, preventDefault: function () {
            var h = this.originalEvent;
            h && (h.preventDefault ? h.preventDefault() : h.returnValue = false)
        }});
        f.merge = function (o, m) {
            var n = o.length, k = 0;
            if (typeof m.length === "number") {
                for (var h = m.length; k < h; k++) {
                    o[n++] = m[k]
                }
            } else {
                while (m[k] !== undefined) {
                    o[n++] = m[k++]
                }
            }
            o.length = n;
            return o
        };
        f.array.extend({unique: function (m) {
            var j = this.length, h = this.slice(0), l, k;
            if ("function" != typeof m) {
                m = function (n, i) {
                    return n === i
                }
            }
            while (--j > 0) {
                k = h[j];
                l = j;
                while (l--) {
                    if (m(k, h[l])) {
                        h.splice(j, 1);
                        break
                    }
                }
            }
            j = this.length = h.length;
            for (l = 0; l < j; l++) {
                this[l] = h[l]
            }
            return this
        }});
        f.query = f.query || function () {
            var h = /^(\w*)#([\w\-\$]+)$/, j = /^#([\w\-\$]+)$/, k = /^\w+$/, i = /^(\w*)\.([\w\-\$]+)$/, l = /^(\.[\w\-\$]+)+$/, n = /\s*,\s*/, p = /\s+/g, q = Array.prototype.slice;

            function m(v, s) {
                var D, C, r, w, u, B, y, A, z = [];
                if (h.test(v)) {
                    r = RegExp.$2;
                    u = RegExp.$1 || "*";
                    f.forEach(s.getElementsByTagName(u), function (t) {
                        t.id == r && z.push(t)
                    })
                } else {
                    if (k.test(v) || v == "*") {
                        f.merge(z, s.getElementsByTagName(v))
                    } else {
                        if (i.test(v)) {
                            y = [];
                            u = RegExp.$1;
                            B = RegExp.$2;
                            D = " " + B + " ";
                            if (s.getElementsByClassName) {
                                y = s.getElementsByClassName(B)
                            } else {
                                f.forEach(s.getElementsByTagName("*"), function (t) {
                                    t.className && ~(" " + t.className + " ").indexOf(D) && (y.push(t))
                                })
                            }
                            if (u && (u = u.toUpperCase())) {
                                f.forEach(y, function (t) {
                                    t.tagName.toUpperCase() === u && z.push(t)
                                })
                            } else {
                                f.merge(z, y)
                            }
                        } else {
                            if (l.test(v)) {
                                A = v.substr(1).split(".");
                                f.forEach(s.getElementsByTagName("*"), function (t) {
                                    if (t.className) {
                                        D = " " + t.className + " ";
                                        C = true;
                                        f.forEach(A, function (x) {
                                            ~D.indexOf(" " + x + " ") || (C = false)
                                        });
                                        C && z.push(t)
                                    }
                                })
                            }
                        }
                    }
                }
                return z
            }

            function o(r, u) {
                var t, v = r, x = "__tangram__", w = [];
                if (!u && j.test(v) && (t = document.getElementById(v.substr(1)))) {
                    return[t]
                }
                u = u || document;
                if (u.querySelectorAll) {
                    if (u.nodeType == 1 && !u.id) {
                        u.id = x;
                        t = u.querySelectorAll("#" + x + " " + v);
                        u.id = ""
                    } else {
                        t = u.querySelectorAll(v)
                    }
                    return t
                } else {
                    if (!~v.indexOf(" ")) {
                        return m(v, u)
                    }
                    f.forEach(m(v.substr(0, v.indexOf(" ")), u), function (s) {
                        f.merge(w, o(v.substr(v.indexOf(" ") + 1), s))
                    })
                }
                return w
            }

            return function (s, u, t) {
                if (!s || typeof s != "string") {
                    return t || []
                }
                var r = [];
                s = s.replace(p, " ");
                t && f.merge(r, t) && (t.length = 0);
                f.forEach(s.indexOf(",") > 0 ? s.split(n) : [s], function (v) {
                    f.merge(r, o(v, u))
                });
                return f.merge(t || [], f.array(r).unique())
            }
        }();
        f.createChain("dom",function (h, j) {
            var n, k = new f.dom.$DOM(j);
            if (!h) {
                return k
            }
            if (h._type_ == "$DOM") {
                return h
            } else {
                if (h.nodeType || h == h.window) {
                    k[0] = h;
                    k.length = 1;
                    return k
                } else {
                    if (h.length && k.toString.call(h) != "[object String]") {
                        return f.merge(k, h)
                    } else {
                        if (typeof h == "string") {
                            if (h.charAt(0) == "<" && h.charAt(h.length - 1) == ">" && h.length > 2) {
                                var m = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, l = j && j._type_ === "$DOM" ? j[0] : j, i = m.exec(h);
                                l = l && l.nodeType ? l.ownerDocument || l : document;
                                i = i ? [l.createElement(i[1])] : (f.dom.createElements ? f.dom.createElements(h) : []);
                                f.merge(k, i)
                            } else {
                                f.query(h, j, k)
                            }
                        } else {
                            if (typeof h == "function") {
                                return k.ready ? k.ready(h) : k
                            }
                        }
                    }
                }
            }
            return k
        },function (h) {
            this.length = 0;
            this._type_ = "$DOM";
            this.context = h || document
        }).extend({size: function () {
            return this.length
        }, splice: function () {
        }, get: function (h) {
            if (typeof h == "number") {
                return h < 0 ? this[this.length + h] : this[h]
            }
            return Array.prototype.slice.call(this, 0)
        }, toArray: function () {
            return this.get()
        }});
        f.dom.extend({each: function (k) {
            f.check("function", "baidu.dom.each");
            var j, h, l = this.length;
            for (j = 0; j < l; j++) {
                h = k.call(this[j], j, this[j], this);
                if (h === false || h == "break") {
                    break
                }
            }
            return this
        }});
        f._util_.eventBase = f._util_.eventBase || {};
        void function (i, h) {
            if (i.listener) {
                return
            }
            h = i.listener = {};
            if (window.addEventListener) {
                h.add = function (l, j, k) {
                    l.addEventListener(j, k, false)
                }
            } else {
                if (window.attachEvent) {
                    h.add = function (l, j, k) {
                        l.attachEvent("on" + j, k)
                    }
                }
            }
        }(f._util_.eventBase);
        void function (l, j) {
            if (l.queue) {
                return
            }
            var i = f.id;
            var h = l.queue = {};
            var m = h.attaCache = f.global("eventQueueCache");
            var k = l.listener;
            h.get = function (q, o, p, n) {
                var s = i(q), r;
                if (!m[s]) {
                    m[s] = {}
                }
                r = m[s];
                if (o) {
                    if (!r[o] && p) {
                        this.setupCall(q, o, p, r[o] = [], n)
                    }
                    return r[o] || []
                } else {
                    return r
                }
            };
            h.add = function (r, o, q, p, n) {
                this.get(r, o, q, n).push(p)
            };
            h.remove = function (r, q, p) {
                var n, s;
                if (q) {
                    var n = this.get(r, q);
                    if (p) {
                        for (var o = n.length - 1; o >= 0; o--) {
                            if (n[o].orig == p) {
                                n.splice(o, 1)
                            }
                        }
                    } else {
                        n.length = 0
                    }
                } else {
                    var s = this.get(r);
                    for (var o in s) {
                        s[o].length = 0
                    }
                }
            };
            h.handlerList = function (q, p) {
                var r = [];
                for (var n = 0, o; o = p[n]; n++) {
                    if (o.delegate && f.dom(o.delegate, q).size() < 1) {
                        continue
                    }
                    r.push(o)
                }
                return r
            };
            h.call = function (s, w, u, t) {
                if (u) {
                    if (!u.length) {
                        return
                    }
                    var v = [].slice.call(arguments, 1), q = [];
                    v.unshift(t = f.event(t || w));
                    t.type = w;
                    if (!t.currentTarget) {
                        t.currentTarget = s
                    }
                    if (!t.target) {
                        t.target = s
                    }
                    u = h.handlerList(s, u);
                    for (var p = 0, n, o = u.length; p < o; p++) {
                        if (n = u[p]) {
                            n.pkg.apply(s, v);
                            if (n.one) {
                                q.unshift(p)
                            }
                        }
                    }
                    if (q.length) {
                        for (var p = 0, o = q.length; p < o; p++) {
                            this.remove(s, w, u[p].fn)
                        }
                    }
                } else {
                    u = this.get(s, w);
                    this.call(s, w, u, t)
                }
            };
            h.setupCall = function () {
                var n = function (r, o, p, q) {
                    k.add(r, p, function (s) {
                        h.call(r, o, q, s)
                    })
                };
                return function (u, r, s, t, p) {
                    if (!p) {
                        n(u, r, s, t)
                    } else {
                        u = f.dom(p, u);
                        for (var q = 0, o = u.length; q < o; q++) {
                            n(u[q], r, s, t)
                        }
                    }
                }
            }()
        }(f._util_.eventBase, f.event);
        void function (m, l) {
            if (m.core) {
                return
            }
            var h = m.queue;
            var i = m.core = {};
            var k = l.special = {};
            var j = [].push;
            var n = function (r, p) {
                for (var q = 0, o = p.length; q < o; q++) {
                    if (p.get(q).contains(r)) {
                        return p[q]
                    }
                }
            };
            i.build = function (t, q, r, o, s) {
                var p;
                if (o) {
                    p = f.dom(o, t)
                }
                if ((q in k) && k[q].pack) {
                    r = k[q].pack(r)
                }
                return function (y) {
                    var x = f.dom(y.target), v = [y], u;
                    if (s && !y.data) {
                        y.data = s
                    }
                    if (y.triggerData) {
                        j.apply(v, y.triggerData)
                    }
                    if (!p) {
                        return y.result = r.apply(t, v)
                    }
                    for (var w = 0; w < 2; w++) {
                        if (u = n(y.target, p)) {
                            return y.result = r.apply(u, v)
                        }
                        p = f.dom(o, t)
                    }
                }
            };
            i.add = function (t, v, w, p, q, s) {
                var u = this.build(t, v, w, p, q), o, r;
                r = v;
                if (v in k) {
                    o = k[v].attachElements, r = k[v].bindType || v
                }
                h.add(t, v, r, {type: v, pkg: u, orig: w, one: s, delegate: p}, o)
            };
            i.remove = function (r, q, p, o) {
                h.remove(r, q, p, o)
            }
        }(f._util_.eventBase, f.event);
        f.dom.extend({on: function (j, h, m, l, k) {
            var i = f._util_.eventBase.core;
            if (typeof h == "object" && h) {
                l = m, m = h, h = null
            } else {
                if (typeof m == "function") {
                    l = m, m = null
                } else {
                    if (typeof h == "function") {
                        l = h, h = m = null
                    }
                }
            }
            if (typeof j == "string") {
                j = j.split(/[ ,]+/);
                this.each(function () {
                    f.forEach(j, function (n) {
                        i.add(this, n, l, h, m, k)
                    }, this)
                })
            } else {
                if (typeof j == "object") {
                    if (l) {
                        l = null
                    }
                    f.forEach(j, function (o, n) {
                        this.on(n, h, m, o, k)
                    }, this)
                }
            }
            return this
        }});
        f.dom.g = function (h) {
            if (!h) {
                return null
            }
            if ("string" == typeof h || h instanceof String) {
                return document.getElementById(h)
            } else {
                if (h.nodeName && (h.nodeType == 1 || h.nodeType == 9)) {
                    return h
                }
            }
            return null
        };
        f.event.on = f.on = function (h, j, i) {
            if (typeof h == "string") {
                h = f.dom.g(h)
            }
            f.dom(h).on(j.replace(/^\s*on/, ""), i);
            return h
        };
        void function () {
            var B = document.URL, O = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, P = /^\/\//, Q = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, A = /#.*$/, y = /\[\]$/, w = /^(?:GET|HEAD)$/, I = /([?&])_=[^&]*/, C = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, N = /^[\],:{}\s]*$/, m = /(?:^|:|,)(?:\s*\[)+/g, h = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, n = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, l = ["*/"] + ["*"], k = {}, z = {}, G = {}, q = {}, M = Q.exec(B.toLowerCase()) || [];

            function H(V) {
                var T, U;
                if (!V || f.type(V) !== "string") {
                    return null
                }
                try {
                    if (window.DOMParser) {
                        U = new DOMParser();
                        T = U.parseFromString(V, "text/xml")
                    } else {
                        T = new ActiveXObject("Microsoft.XMLDOM");
                        T.async = "false";
                        T.loadXML(V)
                    }
                } catch (W) {
                    T = undefined
                }
                if (!T || !T.documentElement || T.getElementsByTagName("parsererror").length) {
                    throw new Error("Invalid XML: " + V)
                }
                return T
            }

            function x(T) {
                if (!T || f.type(T) !== "string") {
                    return null
                }
                T = f.string(T).trim();
                if (window.JSON && window.JSON.parse) {
                    return window.JSON.parse(T)
                }
                if (N.test(T.replace(h, "@").replace(n, "]").replace(m, ""))) {
                    return(new Function("return " + T))()
                }
                throw new Error("Invalid JSON: " + T)
            }

            function D(T) {
                if (T && /\S/.test(T)) {
                    (window.execScript || function (U) {
                        window["eval"].call(window, U)
                    })("(" + T + ")")
                }
            }

            function J(T) {
                return function (Z, X) {
                    if (f.type(Z) !== "string") {
                        X = Z;
                        Z = "*"
                    }
                    var V = Z.toLowerCase().split(/\s+/), Y, aa;
                    if (f.type(X) === "function") {
                        for (var U = 0, W; W = V[U]; U++) {
                            Y = /^\+/.test(W);
                            Y && (W = W.substr(1) || "*");
                            aa = T[W] = T[W] || [];
                            aa[Y ? "unshift" : "push"](X)
                        }
                    }
                }
            }

            function s(T, ac, Z) {
                var Y, aa, X, U, V = T.contents, ab = T.dataTypes, W = T.responseFields;
                for (aa in W) {
                    if (aa in Z) {
                        ac[W[aa]] = Z[aa]
                    }
                }
                while (ab[0] === "*") {
                    ab.shift();
                    if (Y === undefined) {
                        Y = T.mimeType || ac.getResponseHeader("content-type")
                    }
                }
                if (Y) {
                    for (aa in V) {
                        if (V[aa] && V[aa].test(Y)) {
                            ab.unshift(aa);
                            break
                        }
                    }
                }
                if (ab[0] in Z) {
                    X = ab[0]
                } else {
                    for (aa in Z) {
                        if (!ab[0] || T.converters[aa + " " + ab[0]]) {
                            X = aa;
                            break
                        }
                        if (!U) {
                            U = aa
                        }
                    }
                    X = X || U
                }
                if (X) {
                    if (X !== ab[0]) {
                        ab.unshift(X)
                    }
                    return Z[X]
                }
            }

            function L(T, V) {
                var Z = T.dataTypes.slice(), U = Z[0], ac = {}, ab, Y;
                T.dataFilter && (V = T.dataFilter(V, T.dataType));
                if (Z[1]) {
                    for (var W in T.converters) {
                        ac[W.toLowerCase()] = T.converters[W]
                    }
                }
                for (var W = 0, ad; ad = Z[++W];) {
                    if (ad !== "*") {
                        if (U !== "*" && U !== ad) {
                            ab = ac[U + " " + ad] || ac["* " + ad];
                            if (!ab) {
                                for (var aa in ac) {
                                    Y = aa.split(" ");
                                    if (Y[1] === ad) {
                                        ab = ac[U + " " + Y[0]] || ac["* " + Y[0]];
                                        if (ab) {
                                            if (ab === true) {
                                                ab = ac[aa]
                                            } else {
                                                if (ac[aa] !== true) {
                                                    ad = Y[0];
                                                    Z.splice(W--, 0, ad)
                                                }
                                            }
                                            break
                                        }
                                    }
                                }
                            }
                            if (ab !== true) {
                                if (ab && T["throws"]) {
                                    V = ab(V)
                                } else {
                                    try {
                                        V = ab(V)
                                    } catch (X) {
                                        return{state: "parsererror", error: ab ? X : "No conversion from " + U + " to " + ad}
                                    }
                                }
                            }
                        }
                        U = ad
                    }
                }
                return{state: "success", data: V}
            }

            function p(U, ad, Y, ab, aa, W) {
                aa = aa || ad.dataTypes[0];
                W = W || {};
                W[aa] = true;
                var ac, Z = U[aa], T = Z ? Z.length : 0, X = (U === k);
                for (var V = 0; V < T && (X || !ac); V++) {
                    ac = Z[V](ad, Y, ab);
                    if (typeof ac === "string") {
                        if (!X || W[ac]) {
                            ac = undefined
                        } else {
                            ad.dataTypes.unshift(ac);
                            ac = p(U, ad, Y, ab, ac, W)
                        }
                    }
                }
                if ((X || !ac) && !W["*"]) {
                    ac = p(U, ad, Y, ab, "*", W)
                }
                return ac
            }

            f.createChain("ajax", function (X, V) {
                if (f.object.isPlain(X)) {
                    V = X;
                    X = undefined
                }
                V = V || {};
                var ac = f.ajax.setup({}, V), aq = ac.context || ac, U, ab, ag, ap = f.Deferred(), ak = f.Callbacks("once memory"), Z = ac.statusCode || {}, Y = 0, al = {}, af = {}, aa = "canceled", an, W, ai, ao = f.extend(new f.ajax.$Ajax(X, ac), {readyState: 0, setRequestHeader: function (at, au) {
                    if (!Y) {
                        var ar = at.toLowerCase();
                        at = al[ar] = al[ar] || at;
                        af[at] = au
                    }
                }, getAllResponseHeaders: function () {
                    return Y === 2 ? an : null
                }, getResponseHeader: function (at) {
                    var ar;
                    if (Y === 2) {
                        if (!W) {
                            W = {};
                            while (ar = C.exec(an)) {
                                W[ar[1].toLowerCase()] = ar[2]
                            }
                        }
                        ar = W[at.toLowerCase()]
                    }
                    return ar === undefined ? null : ar
                }, overrideMimeType: function (ar) {
                    !Y && (ac.mimeType = ar);
                    return this
                }, abort: function (ar) {
                    ar = ar || aa;
                    ai && ai.abort(ar);
                    ae(0, ar);
                    return this
                }});
                var ad;

                function ae(ax, at, ay, au) {
                    var av = at, ar, aB, az, aw, aA;
                    if (Y === 2) {
                        return
                    }
                    Y = 2;
                    ad && clearTimeout(ad);
                    ai = undefined;
                    an = au || "";
                    ao.readyState = ax > 0 ? 4 : 0;
                    ay && (aw = s(ac, ao, ay));
                    if (ax >= 200 && ax < 300 || ax === 304) {
                        if (ac.ifModified) {
                            aA = ao.getResponseHeader("Last-Modified");
                            aA && (G[ab] = aA);
                            aA = ao.getResponseHeader("Etag");
                            aA && (q[ab] = aA)
                        }
                        if (ax === 304) {
                            av = "notmodified";
                            ar = true
                        } else {
                            ar = L(ac, aw);
                            av = ar.state;
                            aB = ar.data;
                            az = ar.error;
                            ar = !az
                        }
                    } else {
                        az = av;
                        if (!av || ax) {
                            av = "error";
                            ax < 0 && (ax = 0)
                        }
                    }
                    ao.status = ax;
                    ao.statusText = "" + (at || av);
                    if (ar) {
                        ap.resolveWith(aq, [aB, av, ao])
                    } else {
                        ap.rejectWith(aq, [ao, av, az])
                    }
                    ao.statusCode(Z);
                    Z = undefined;
                    ak.fireWith(aq, [ao, av])
                }

                ap.promise(ao);
                ao.success = ao.done;
                ao.error = ao.fail;
                ao.complete = ak.add;
                ao.statusCode = function (at) {
                    if (at) {
                        if (Y < 2) {
                            for (var ar in at) {
                                Z[ar] = [Z[ar], at[ar]]
                            }
                        } else {
                            ao.always(at[ao.status])
                        }
                    }
                    return this
                };
                ac.url = ((X || ac.url) + "").replace(A, "").replace(P, M[1] + "//");
                ac.dataTypes = f.string(ac.dataType || "*").trim().toLowerCase().split(/\s+/);
                if (ac.crossDomain == null) {
                    ag = Q.exec(ac.url.toLowerCase());
                    ac.crossDomain = !!(ag && (ag[1] != M[1] || ag[2] != M[2] || (ag[3] || (ag[1] === "http:" ? 80 : 443)) != (M[3] || (M[1] === "http:" ? 80 : 443))))
                }
                if (ac.data && ac.processData && f.type(ac.data) !== "string") {
                    ac.data = f.ajax.param(ac.data, ac.traditional)
                }
                p(k, ac, V, ao);
                if (Y === 2) {
                    return""
                }
                U = ac.global;
                ac.type = ac.type.toUpperCase();
                ac.hasContent = !w.test(ac.type);
                if (!ac.hasContent) {
                    if (ac.data) {
                        ac.url += (~ac.url.indexOf("?") ? "&" : "?") + ac.data;
                        delete ac.data
                    }
                    ab = ac.url;
                    if (ac.cache === false) {
                        var T = new Date().getTime(), am = ac.url.replace(I, "$1_=" + T);
                        ac.url = am + (am === ac.url ? (~ac.url.indexOf("?") ? "&" : "?") + "_=" + T : "")
                    }
                }
                if (ac.data && ac.hasContent && ac.contentType !== false || V.contentType) {
                    ao.setRequestHeader("Content-Type", ac.contentType)
                }
                if (ac.ifModified) {
                    ab = ab || ac.url;
                    G[ab] && ao.setRequestHeader("If-Modified-Since", G[ab]);
                    q[ab] && ao.setRequestHeader("If-None-Match", q[ab])
                }
                ao.setRequestHeader("Accept", ac.dataTypes[0] && ac.accepts[ac.dataTypes[0]] ? ac.accepts[ac.dataTypes[0]] + (ac.dataTypes[0] !== "*" ? ", " + l + "; q=0.01" : "") : ac.accepts["*"]);
                for (var ah in ac.headers) {
                    ao.setRequestHeader(ah, ac.headers[ah])
                }
                if (ac.beforeSend && (ac.beforeSend.call(aq, ao, ac) === false || Y === 2)) {
                    return ao.abort()
                }
                aa = "abort";
                for (var ah in {success: 1, error: 1, complete: 1}) {
                    ao[ah](ac[ah])
                }
                ai = p(z, ac, V, ao);
                if (!ai) {
                    ae(-1, "No Transport")
                } else {
                    ao.readyState = 1;
                    if (ac.async && ac.timeout > 0) {
                        ad = setTimeout(function () {
                            ao.abort("timeout")
                        }, ac.timeout)
                    }
                    try {
                        Y = 1;
                        ai.send(af, ae)
                    } catch (aj) {
                        if (Y < 2) {
                            ae(-1, aj)
                        } else {
                            throw aj
                        }
                    }
                }
                return ao
            }, function (U, T) {
                this.url = U;
                this.options = T
            });
            f.ajax.settings = {url: B, isLocal: O.test(M[1]), global: true, type: "GET", contentType: "application/x-www-form-urlencoded; charset=UTF-8", processData: true, async: true, accepts: {xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", "*": l}, contents: {xml: /xml/, html: /html/, json: /json/}, responseFields: {xml: "responseXML", text: "responseText"}, converters: {"* text": window.String, "text html": true, "text json": x, "text xml": H}, flatOptions: {context: true, url: true}};
            function S(V, X) {
                var W = f.ajax.settings.flatOptions || {}, T;
                for (var U in X) {
                    if (X[U] !== undefined) {
                        (W[U] ? V : (T || (T = {})))[U] = X[U]
                    }
                }
                T && f.extend(true, V, T)
            }

            f.ajax.setup = function (U, T) {
                if (T) {
                    S(U, f.ajax.settings)
                } else {
                    T = U;
                    U = f.ajax.settings
                }
                S(U, T);
                return U
            };
            function v(V, T, U) {
                U = f.type(U) === "function" ? U() : (typeof U == "undefined" || U == null ? "" : U);
                V.push(encodeURIComponent(T) + "=" + encodeURIComponent(U))
            }

            function i(X, U, W, V) {
                if (f.type(W) === "array") {
                    f.forEach(W, function (Z, Y) {
                        if (V || y.test(U)) {
                            v(X, U, Z)
                        } else {
                            i(X, U + "[" + (typeof Z === "object" ? Y : "") + "]", Z, V)
                        }
                    })
                } else {
                    if (!V && f.type(W) === "object") {
                        for (var T in W) {
                            i(X, U + "[" + T + "]", W[T], V)
                        }
                    } else {
                        v(X, U, W)
                    }
                }
            }

            f.ajax.param = function (W, V) {
                var T = [];
                if (f.type(W) === "array") {
                    f.forEach(W, function (X) {
                        v(T, X.name, X.value)
                    })
                } else {
                    for (var U in W) {
                        i(T, U, W[U], V)
                    }
                }
                return T.join("&").replace(/%20/g, "+")
            };
            f.ajax.prefilter = J(k);
            f.ajax.transport = J(z);
            var o = [], j = /(=)\?(?=&|$)|\?\?/, t = new Date().getTime();
            f.ajax.setup({jsonp: "callback", jsonpCallback: function () {
                var T = o.pop() || (f.key + "_" + (t++));
                this[T] = true;
                return T
            }});
            f.ajax.prefilter("json jsonp", function (T, Z, ad) {
                var ac, U, ab, X = T.data, V = T.url, W = T.jsonp !== false, aa = W && j.test(V), Y = W && !aa && f.type(X) === "string" && !(T.contentType || "").indexOf("application/x-www-form-urlencoded") && j.test(X);
                if (T.dataTypes[0] === "jsonp" || aa || Y) {
                    ac = T.jsonpCallback = f.type(T.jsonpCallback) === "function" ? T.jsonpCallback() : T.jsonpCallback;
                    U = window[ac];
                    if (aa) {
                        T.url = V.replace(j, "$1" + ac)
                    } else {
                        if (Y) {
                            T.data = X.replace(j, "$1" + ac)
                        } else {
                            if (W) {
                                T.url += (/\?/.test(V) ? "&" : "?") + T.jsonp + "=" + ac
                            }
                        }
                    }
                    T.converters["script json"] = function () {
                        return ab[0]
                    };
                    T.dataTypes[0] = "json";
                    window[ac] = function () {
                        ab = arguments
                    };
                    ad.always(function () {
                        window[ac] = U;
                        if (T[ac]) {
                            T.jsonpCallback = Z.jsonpCallback;
                            o.push(ac)
                        }
                        if (ab && f.type(U) === "function") {
                            U(ab[0])
                        }
                        ab = U = undefined
                    });
                    return"script"
                }
            });
            f.ajax.setup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents: {script: /javascript|ecmascript/}, converters: {"text script": function (T) {
                D(T);
                return T
            }}});
            f.ajax.prefilter("script", function (T) {
                T.cache === undefined && (T.cache = false);
                if (T.crossDomain) {
                    T.type = "GET";
                    T.global = false
                }
            });
            f.ajax.transport("script", function (V) {
                if (V.crossDomain) {
                    var T, U = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
                    return{send: function (W, X) {
                        T = document.createElement("script");
                        T.async = "async";
                        V.scriptCharset && (T.charset = V.scriptCharset);
                        T.src = V.url;
                        T.onload = T.onreadystatechange = function (Y, Z) {
                            if (Z || !T.readyState || /loaded|complete/.test(T.readyState)) {
                                T.onload = T.onreadystatechange = null;
                                U && T.parentNode && U.removeChild(T);
                                T = undefined;
                                !Z && X(200, "success")
                            }
                        };
                        U.insertBefore(T, U.firstChild)
                    }, abort: function () {
                        T && T.onload(0, 1)
                    }}
                }
            });
            var r, K = 0, u = window.ActiveXObject ? function () {
                for (var T in r) {
                    r[T](0, 1)
                }
            } : false;

            function E() {
                try {
                    return new window.XMLHttpRequest()
                } catch (T) {
                }
            }

            function R() {
                try {
                    return new window.ActiveXObject("Microsoft.XMLHTTP")
                } catch (T) {
                }
            }

            f.ajax.settings.xhr = window.ActiveXObject ? function () {
                return !this.isLocal && E() || R()
            } : E;
            void function (T) {
                f.extend(f._util_.support, {ajax: !!T, cors: !!T && ("withCredentials" in T)})
            }(f.ajax.settings.xhr());
            if (f._util_.support.ajax) {
                f.ajax.transport(function (T) {
                    if (!T.crossDomain || f._util_.support.cors) {
                        var U;
                        return{send: function (aa, V) {
                            var X, Z = T.xhr();
                            if (T.username) {
                                Z.open(T.type, T.url, T.async, T.username, T.password)
                            } else {
                                Z.open(T.type, T.url, T.async)
                            }
                            if (T.xhrFields) {
                                for (var W in T.xhrFields) {
                                    Z[W] = T.xhrFields[W]
                                }
                            }
                            if (T.mimeType && Z.overrideMimeType) {
                                Z.overrideMimeType(T.mimeType)
                            }
                            if (!T.crossDomain && !aa["X-Requested-With"]) {
                                aa["X-Requested-With"] = "XMLHttpRequest"
                            }
                            try {
                                for (var W in aa) {
                                    Z.setRequestHeader(W, aa[W])
                                }
                            } catch (Y) {
                            }
                            Z.send((T.hasContent && T.data) || null);
                            U = function (aj, ad) {
                                var ae, ac, ab, ah, ag;
                                try {
                                    if (U && (ad || Z.readyState === 4)) {
                                        U = undefined;
                                        if (X) {
                                            Z.onreadystatechange = function () {
                                            };
                                            u && (delete r[X])
                                        }
                                        if (ad) {
                                            Z.readyState !== 4 && Z.abort()
                                        } else {
                                            ae = Z.status;
                                            ab = Z.getAllResponseHeaders();
                                            ah = {};
                                            ag = Z.responseXML;
                                            ag && ag.documentElement && (ah.xml = ag);
                                            try {
                                                ah.text = Z.responseText
                                            } catch (ai) {
                                            }
                                            try {
                                                ac = Z.statusText
                                            } catch (ai) {
                                                ac = ""
                                            }
                                            if (!ae && T.isLocal && !T.crossDomain) {
                                                ae = ah.text ? 200 : 404
                                            } else {
                                                if (ae === 1223) {
                                                    ae = 204
                                                }
                                            }
                                        }
                                    }
                                } catch (af) {
                                    !ad && V(-1, af)
                                }
                                ah && V(ae, ac, ah, ab)
                            };
                            if (!T.async) {
                                U()
                            } else {
                                if (Z.readyState === 4) {
                                    setTimeout(U, 0)
                                } else {
                                    X = ++K;
                                    if (u) {
                                        if (!r) {
                                            r = {};
                                            f.dom(window).on("unload", u)
                                        }
                                        r[X] = U
                                    }
                                    Z.onreadystatechange = U
                                }
                            }
                        }, abort: function () {
                            U && U(0, 1)
                        }}
                    }
                })
            }
        }();
        f.array.extend({contains: function (h) {
            return !!~this.indexOf(h)
        }});
        f.each = function (j, o, m) {
            var l, p, k, h;
            if (typeof o == "function" && j) {
                p = typeof j.length == "number" ? j.length : j.byteLength;
                if (typeof p == "number") {
                    if (Object.prototype.toString.call(j) === "[object Function]") {
                        return j
                    }
                    for (l = 0; l < p; l++) {
                        k = j[l];
                        k === undefined && (k = j.charAt && j.charAt(l));
                        h = o.call(m || k, l, k, j);
                        if (h === false || h == "break") {
                            break
                        }
                    }
                } else {
                    if (typeof j == "number") {
                        for (l = 0; l < j; l++) {
                            h = o.call(m || l, l, l, l);
                            if (h === false || h == "break") {
                                break
                            }
                        }
                    } else {
                        if (typeof j == "object") {
                            for (l in j) {
                                if (j.hasOwnProperty(l)) {
                                    h = o.call(m || j[l], l, j[l], j);
                                    if (h === false || h == "break") {
                                        break
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return j
        };
        f.array.extend({each: function (i, h) {
            return f.each(this, i, h)
        }, forEach: function (i, h) {
            return f.forEach(this, i, h)
        }});
        f.array.extend({empty: function () {
            this.length = 0;
            return this
        }});
        f.array.extend({filter: function (m, l) {
            var h = f.array([]), k, p, o, j = 0;
            if (f.type(m) === "function") {
                for (k = 0, p = this.length; k < p; k++) {
                    o = this[k];
                    if (m.call(l || this, o, k, this) === true) {
                        h[j++] = o
                    }
                }
            }
            return h
        }});
        f.array.extend({find: function (j) {
            var h, k, l = this.length;
            if (f.type(j) == "function") {
                for (h = 0; h < l; h++) {
                    k = this[h];
                    if (j.call(this, k, h, this) === true) {
                        return k
                    }
                }
            }
            return null
        }});
        f.array.extend({hash: function (j) {
            var h = {}, l = j && j.length, k, m;
            for (k = 0, m = this.length; k < m; k++) {
                h[this[k]] = (l && l > k) ? j[k] : true
            }
            return h
        }});
        f.array.extend({lastIndexOf: function (i, j) {
            f.check(".+(,number)?", "baidu.array.lastIndexOf");
            var h = this.length;
            (!(j = j | 0) || j >= h) && (j = h - 1);
            j < 0 && (j += h);
            for (; j >= 0; j--) {
                if (j in this && this[j] === i) {
                    return j
                }
            }
            return -1
        }});
        f.array.extend({map: function (l, k) {
            f.check("function(,.+)?", "baidu.array.map");
            var h = this.length, m = f.array([]);
            for (var j = 0; j < h; j++) {
                m[j] = l.call(k || this, this[j], j, this)
            }
            return m
        }});
        f.array.extend({remove: function (h) {
            var i = this.length;
            while (i--) {
                if (this[i] === h) {
                    this.splice(i, 1)
                }
            }
            return this
        }});
        f.array.extend({removeAt: function (h) {
            f.check("number", "baidu.array.removeAt");
            return this.splice(h, 1)[0]
        }});
        f.base = f.base || {blank: function () {
        }};
        f.base.Class = (function () {
            var h = (f._global_ = window[f.guid])._instances;
            h || (h = f._global_._instances = {});
            return function () {
                this.guid = f.id();
                this._decontrol_ || (h[this.guid] = this)
            }
        })();
        f.extend(f.base.Class.prototype, {toString: f.base.Class.prototype.toString = function () {
            return"[object " + (this._type_ || "Object") + "]"
        }, dispose: function () {
            delete f._global_._instances[this.guid];
            if (this._listeners_) {
                for (var h in this._listeners_) {
                    this._listeners_[h].length = 0;
                    delete this._listeners_[h]
                }
            }
            for (var i in this) {
                if (!f.isFunction(this[i])) {
                    delete this[i]
                } else {
                    this[i] = f.base.blank
                }
            }
            this.disposed = true
        }, fire: function (h, r) {
            f.isString(h) && (h = new f.base.Event(h));
            var k, j, m, p, q = this._listeners_, o = h.type, l = [h].concat(Array.prototype.slice.call(arguments, 1));
            !q && (q = this._listeners_ = {});
            f.extend(h, r || {});
            h.target = h.target || this;
            h.currentTarget = this;
            o.indexOf("on") && (o = "on" + o);
            f.isFunction(this[o]) && this[o].apply(this, l);
            (k = this._options) && f.isFunction(k[o]) && k[o].apply(this, l);
            if (f.isArray(m = q[o])) {
                for (k = m.length - 1; k > -1; k--) {
                    p = m[k];
                    p && p.handler.apply(this, l);
                    p && p.once && m.splice(k, 1)
                }
            }
            return h.returnValue
        }, on: function (k, j, i) {
            if (!f.isFunction(j)) {
                return this
            }
            var l, h = this._listeners_;
            !h && (h = this._listeners_ = {});
            k.indexOf("on") && (k = "on" + k);
            !f.isArray(l = h[k]) && (l = h[k] = []);
            h[k].unshift({handler: j, once: !!i});
            return this
        }, once: function (i, h) {
            return this.on(i, h, true)
        }, one: function (i, h) {
            return this.on(i, h, true)
        }, off: function (l, k) {
            var j, m, h = this._listeners_;
            if (!h) {
                return this
            }
            if (typeof l == "undefined") {
                for (j in h) {
                    delete h[j]
                }
                return this
            }
            l.indexOf("on") && (l = "on" + l);
            if (typeof k == "undefined") {
                delete h[l]
            } else {
                if (m = h[l]) {
                    for (j = m.length - 1; j >= 0; j--) {
                        m[j].handler === k && m.splice(j, 1)
                    }
                }
            }
            return this
        }});
        f.base.Class.prototype.addEventListener = f.base.Class.prototype.on;
        f.base.Class.prototype.removeEventListener = f.base.Class.prototype.un = f.base.Class.prototype.off;
        f.base.Class.prototype.dispatchEvent = f.base.Class.prototype.fire;
        window.baiduInstance = function (h) {
            return window[f.guid]._instances[h]
        };
        f.base.Event = function (h, i) {
            this.type = h;
            this.returnValue = true;
            this.target = i || null;
            this.currentTarget = null;
            this.preventDefault = function () {
                this.returnValue = false
            }
        };
        f.base.inherits = function (n, l, k) {
            var j, m, h = n.prototype, i = new Function();
            i.prototype = l.prototype;
            m = n.prototype = new i();
            for (j in h) {
                m[j] = h[j]
            }
            n.prototype.constructor = n;
            n.superClass = l.prototype;
            typeof k == "string" && (m._type_ = k);
            n.extend = function (p) {
                for (var o in p) {
                    m[o] = p[o]
                }
                return n
            };
            return n
        };
        f.base.register = function (i, j, h) {
            (i._reg_ || (i._reg_ = [])).push(j);
            for (var k in h) {
                i.prototype[k] = h[k]
            }
        };
        f.cookie = f.cookie || {};
        f.cookie._isValidKey = function (h) {
            return(new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24')).test(h)
        };
        f.cookie.getRaw = function (i) {
            if (f.cookie._isValidKey(i)) {
                var j = new RegExp("(^| )" + i + "=([^;]*)(;|\x24)"), h = j.exec(document.cookie);
                if (h) {
                    return h[2] || null
                }
            }
            return null
        };
        f.cookie.get = function (h) {
            var i = f.cookie.getRaw(h);
            if ("string" == typeof i) {
                i = decodeURIComponent(i);
                return i
            }
            return null
        };
        f.cookie.setRaw = function (j, k, i) {
            if (!f.cookie._isValidKey(j)) {
                return
            }
            i = i || {};
            var h = i.expires;
            if ("number" == typeof i.expires) {
                h = new Date();
                h.setTime(h.getTime() + i.expires)
            }
            document.cookie = j + "=" + k + (i.path ? "; path=" + i.path : "") + (h ? "; expires=" + h.toGMTString() : "") + (i.domain ? "; domain=" + i.domain : "") + (i.secure ? "; secure" : "")
        };
        f.cookie.remove = function (i, h) {
            h = h || {};
            h.expires = new Date(0);
            f.cookie.setRaw(i, "", h)
        };
        f.cookie.set = function (i, j, h) {
            f.cookie.setRaw(i, encodeURIComponent(j), h)
        };
        f.createClass = function (k, j, h) {
            k = f.isFunction(k) ? k : function () {
            };
            h = typeof j == "object" ? j : h || {};
            var i = function () {
                var n = this;
                h.decontrolled && (n._decontrol_ = true);
                i.superClass.apply(n, arguments);
                for (var l in i.options) {
                    n[l] = i.options[l]
                }
                k.apply(n, arguments);
                for (var l = 0, m = i._reg_; m && l < m.length; l++) {
                    m[l].apply(n, arguments)
                }
            };
            f.extend(i, {superClass: h.superClass || f.base.Class, inherits: function (m) {
                if (typeof m != "function") {
                    return i
                }
                var n = function () {
                };
                n.prototype = (i.superClass = m).prototype;
                var l = i.prototype = new n();
                f.extend(i.prototype, k.prototype);
                l.constructor = k;
                return i
            }, register: function (m, l) {
                (i._reg_ || (i._reg_ = [])).push(m);
                l && f.extend(i.prototype, l);
                return i
            }, extend: function (l) {
                f.extend(i.prototype, l);
                return i
            }});
            j = f.isString(j) ? j : h.className || h.type;
            f.isString(j) && (k.prototype._type_ = j);
            f.isFunction(i.superClass) && i.inherits(i.superClass);
            return i
        };
        f.createSingle = function (h, i) {
            var j = new f.base.Class();
            f.isString(i) && (j._type_ = i);
            return f.extend(j, h)
        };
        f.date = f.date || {};
        f.createChain("number", function (j) {
            var i = parseFloat(j), l = isNaN(i) ? i : j, h = typeof l === "number" ? Number : String, k = h.prototype;
            l = new h(l);
            f.forEach(f.number.$Number.prototype, function (n, m) {
                k[m] || (l[m] = n)
            });
            return l
        });
        f.number.extend({pad: function (j) {
            var k = this;
            var l = "", i = (k < 0), h = String(Math.abs(k));
            if (h.length < j) {
                l = (new Array(j - h.length + 1)).join("0")
            }
            return(i ? "-" : "") + l + h
        }});
        f.date.format = function (h, m) {
            if ("string" != typeof m) {
                return h.toString()
            }
            function k(s, r) {
                m = m.replace(s, r)
            }

            var i = f.number.pad, n = h.getFullYear(), l = h.getMonth() + 1, q = h.getDate(), o = h.getHours(), j = h.getMinutes(), p = h.getSeconds();
            k(/yyyy/g, i(n, 4));
            k(/yy/g, i(parseInt(n.toString().slice(2), 10), 2));
            k(/MM/g, i(l, 2));
            k(/M/g, l);
            k(/dd/g, i(q, 2));
            k(/d/g, q);
            k(/HH/g, i(o, 2));
            k(/H/g, o);
            k(/hh/g, i(o % 12, 2));
            k(/h/g, o % 12);
            k(/mm/g, i(j, 2));
            k(/m/g, j);
            k(/ss/g, i(p, 2));
            k(/s/g, p);
            return m
        };
        f.date.parse = function (j) {
            var h = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
            if ("string" == typeof j) {
                if (h.test(j) || isNaN(Date.parse(j))) {
                    var l = j.split(/ |T/), i = l.length > 1 ? l[1].split(/[^\d]/) : [0, 0, 0], k = l[0].split(/[^\d]/);
                    return new Date(k[0] - 0, k[1] - 1, k[2] - 0, i[0] - 0, i[1] - 0, i[2] - 0)
                } else {
                    return new Date(j)
                }
            }
            return new Date()
        };
        f.dom.extend({pushStack: function (h) {
            var i = f.dom();
            f.merge(i, h);
            i.prevObject = this;
            i.context = this.context;
            return i
        }});
        f.dom.createElements = function () {
            var j = /<(\w+)/i, i = /<|&#?\w+;/, k = {area: [1, "<map>", "</map>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], legend: [1, "<fieldset>", "</fieldset>"], option: [1, "<select multiple='multiple'>", "</select>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], _default: [0, "", ""]};
            k.optgroup = k.option;
            k.tbody = k.tfoot = k.colgroup = k.caption = k.thead;
            k.th = k.td;
            function h(o, q) {
                var p = o.getElementsByTagName("SCRIPT"), m, l, n;
                for (m = p.length - 1; m >= 0; m--) {
                    n = p[m];
                    l = q.createElement("SCRIPT");
                    n.id && (l.id = n.id);
                    n.src && (l.src = n.src);
                    n.type && (l.type = n.type);
                    l[n.text ? "text" : "textContent"] = n.text || n.textContent;
                    n.parentNode.replaceChild(l, n)
                }
            }

            return function (q, t) {
                f.isNumber(q) && (q = q.toString());
                t = t || document;
                var m, p, r, u = q, o = u.length, l = t.createElement("div"), s = t.createDocumentFragment(), v = [];
                if (f.isString(u)) {
                    if (!i.test(u)) {
                        v.push(t.createTextNode(u))
                    } else {
                        m = k[u.match(j)[1].toLowerCase()] || k._default;
                        l.innerHTML = "<i>mz</i>" + m[1] + u + m[2];
                        l.removeChild(l.firstChild);
                        h(l, t);
                        p = m[0];
                        r = l;
                        while (p--) {
                            r = r.firstChild
                        }
                        f.merge(v, r.childNodes);
                        f.forEach(v, function (n) {
                            s.appendChild(n)
                        });
                        l = r = null
                    }
                }
                l = null;
                return v
            }
        }();
        f.dom.extend({add: function (i, j) {
            var h = f.array(this.get());
            switch (f.type(i)) {
                case"HTMLElement":
                    h.push(i);
                    break;
                case"$DOM":
                case"array":
                    f.merge(h, i);
                    break;
                case"string":
                    f.merge(h, f.dom(i, j));
                    break;
                default:
                    if (typeof i == "object" && i.length) {
                        f.merge(h, i)
                    }
            }
            return this.pushStack(h.unique())
        }});
        f.dom.extend({addClass: function (k) {
            if (!arguments.length) {
                return this
            }
            var j = typeof k, i = " ";
            if (j == "string") {
                k = f.string.trim(k);
                var h = k.split(" ");
                f.forEach(this, function (n, l) {
                    var o = n.className;
                    for (var m = 0; m < h.length; m++) {
                        if (!~(i + o + i).indexOf(i + h[m] + i)) {
                            o += " " + h[m]
                        }
                    }
                    n.className = o.replace(/^\s+/g, "")
                })
            } else {
                if (j == "function") {
                    f.forEach(this, function (m, l) {
                        f.dom(m).addClass(k.call(m, l, m.className))
                    })
                }
            }
            return this
        }});
        f.dom.extend({getDocument: function () {
            if (this.size() <= 0) {
                return undefined
            }
            var h = this[0];
            return h.nodeType == 9 ? h : h.ownerDocument || h.document
        }});
        f._util_.cleanData = function (l) {
            var h;
            for (var j = 0, k; k = l[j]; j++) {
                h = f.id(k, "get");
                if (!h) {
                    continue
                }
                f._util_.eventBase.queue.remove(k);
                f.id(k, "remove")
            }
        };
        f.dom.extend({empty: function () {
            for (var h = 0, j; j = this[h]; h++) {
                j.nodeType === 1 && f._util_.cleanData(j.getElementsByTagName("*"));
                while (j.firstChild) {
                    j.removeChild(j.firstChild)
                }
            }
            return this
        }});
        f.dom.extend({append: function () {
            f.check("^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$", "baidu.dom.append");
            f._util_.smartInsert(this, arguments, function (h) {
                this.nodeType === 1 && this.appendChild(h)
            });
            return this
        }});
        f.dom.extend({html: function (r) {
            var l = f.dom, t = f._util_, o = this, p = false, s = !!t.support.dom.div.getElementsByTagName("link").length, j = (t.support.dom.div.firstChild.nodeType === 3), v;
            if (!this.size()) {
                switch (typeof r) {
                    case"undefined":
                        return undefined;
                    default:
                        return o
                }
            }
            var k = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", q = /<(?:script|style|link)/i, i = new RegExp("<(?:" + k + ")[\\s/>]", "i"), n = /^\s+/, h = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, m = /<([\w:]+)/, u = {option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""]};
            u.optgroup = u.option;
            u.tbody = u.tfoot = u.colgroup = u.caption = u.thead;
            u.th = u.td;
            if (!s) {
                u._default = [1, "X<div>", "</div>"]
            }
            f.forEach(o, function (x, w) {
                if (v) {
                    return
                }
                var z = l(x);
                switch (typeof r) {
                    case"undefined":
                        v = (x.nodeType === 1 ? x.innerHTML : undefined);
                        return;
                    case"number":
                        r = String(r);
                    case"string":
                        p = true;
                        if (!q.test(r) && (s || !i.test(r)) && (j || !n.test(r)) && !u[(m.exec(r) || ["", ""])[1].toLowerCase()]) {
                            r = r.replace(h, "<$1></$2>");
                            try {
                                if (x.nodeType === 1) {
                                    z.empty();
                                    x.innerHTML = r
                                }
                                x = 0
                            } catch (y) {
                            }
                        }
                        if (x) {
                            o.empty().append(r)
                        }
                        break;
                    case"function":
                        p = true;
                        z.html(r.call(x, w, z.html()));
                        break
                }
            });
            return p ? o : v
        }});
        f._util_.smartInsert = function (h, m, r) {
            if (m.length <= 0 || h.size() <= 0) {
                return
            }
            if (f.type(m[0]) === "function") {
                var o = m[0], q;
                return f.forEach(h, function (t, i) {
                    q = f.dom(t);
                    m[0] = o.call(t, i, q.html());
                    f._util_.smartInsert(q, m, r)
                })
            }
            var p = h.getDocument() || document, l = p.createDocumentFragment(), k = h.length - 1, n;
            for (var j = 0, s; s = m[j]; j++) {
                if (s.nodeType) {
                    l.appendChild(s)
                } else {
                    f.forEach(~"string|number".indexOf(f.type(s)) ? f.dom.createElements(s, p) : s, function (i) {
                        l.appendChild(i)
                    })
                }
            }
            if (!(n = l.firstChild)) {
                return
            }
            f.forEach(h, function (t, i) {
                r.call(t.nodeName.toLowerCase() === "table" && n.nodeName.toLowerCase() === "tr" ? t.tBodies[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t, i < k ? l.cloneNode(true) : l)
            })
        };
        f.dom.extend({after: function () {
            f.check("^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$", "baidu.dom.after");
            f._util_.smartInsert(this, arguments, function (h) {
                this.parentNode && this.parentNode.insertBefore(h, this.nextSibling)
            });
            return this
        }});
        f.makeArray = function (j, i) {
            var h = i || [];
            if (!j) {
                return h
            }
            j.length == null || ~"string|function|regexp".indexOf(f.type(j)) ? [].push.call(h, j) : f.merge(h, j);
            return h
        };
        f.dom.extend({map: function (k) {
            f.check("function", "baidu.dom.map");
            var h = [], j = 0;
            f.forEach(this, function (l, i) {
                h[j++] = k.call(l, i, l, l)
            });
            return this.pushStack(h)
        }});
        f._util_.isXML = function (i) {
            var h = (i ? i.ownerDocument || i : 0).documentElement;
            return h ? h.nodeName !== "HTML" : false
        };
        f.dom.extend({clone: function () {
            var k = f._util_, n = k.eventBase.core, q = k.eventBase.queue, h = k.support.dom.div, p = k.support.dom.input.cloneNode(true).checked, i = true;
            if (!h.addEventListener && h.attachEvent && h.fireEvent) {
                h.attachEvent("onclick", function () {
                    i = false
                });
                h.cloneNode(true).fireEvent("onclick")
            }
            function j(r) {
                return r.getElementsByTagName ? r.getElementsByTagName("*") : (r.querySelectorAll ? r.querySelectorAll("*") : [])
            }

            function l(s, r) {
                r.clearAttributes && r.clearAttributes();
                r.mergeAttributes && r.mergeAttributes(s);
                switch (r.nodeName.toLowerCase()) {
                    case"object":
                        r.outerHTML = s.outerHTML;
                        break;
                    case"textarea":
                    case"input":
                        if (~"checked|radio".indexOf(s.type)) {
                            s.checked && (r.defaultChecked = r.checked = s.checked);
                            r.value !== s.value && (r.value = s.value)
                        }
                        r.defaultValue = s.defaultValue;
                        break;
                    case"option":
                        r.selected = s.defaultSelected;
                        break;
                    case"script":
                        r.text !== s.text && (r.text = s.text);
                        break
                }
                r[f.key] && r.removeAttribute(f.key)
            }

            function o(w, t) {
                if (t.nodeType !== 1 || !f.id(w, "get")) {
                    return
                }
                var r = q.get(w);
                for (var u in r) {
                    for (var s = 0, v; v = r[u][s]; s++) {
                        n.add(t, u, v.orig, null, null, v.one)
                    }
                }
            }

            function m(x, y, v) {
                var u = x.cloneNode(true), s, t, r;
                if ((!i || !p) && (x.nodeType === 1 || x.nodeType === 11) && !f._util_.isXML(x)) {
                    l(x, u);
                    s = j(x);
                    t = j(u);
                    r = s.length;
                    for (var w = 0; w < r; w++) {
                        t[w] && l(s[w], t[w])
                    }
                }
                if (y) {
                    o(x, u);
                    if (v) {
                        s = j(x);
                        t = j(u);
                        r = s.length;
                        for (var w = 0; w < r; w++) {
                            o(s[w], t[w])
                        }
                    }
                }
                return u
            }

            return function (s, r) {
                s = !!s;
                r = !!r;
                return this.map(function () {
                    return m(this, s, r)
                })
            }
        }()});
        f._util_.contains = document.compareDocumentPosition ? function (h, i) {
            return !!(h.compareDocumentPosition(i) & 16)
        } : function (h, i) {
            if (h === i) {
                return false
            }
            if (h.contains && i.contains) {
                return h.contains(i)
            } else {
                while (i = i.parentNode) {
                    if (i === h) {
                        return true
                    }
                }
                return false
            }
        };
        f.dom.extend({contains: function (i) {
            var h = this[0];
            i = f.dom(i)[0];
            if (!h || !i) {
                return false
            }
            return f._util_.contains(h, i)
        }});
        f._util_.smartInsertTo = function (h, l, n, p) {
            var o = f.dom(l), k = o[0], m;
            if (p && k && (!k.parentNode || k.parentNode.nodeType === 11)) {
                p = p === "before";
                m = f.merge(p ? h : o, !p ? h : o);
                if (h !== m) {
                    h.length = 0;
                    f.merge(h, m)
                }
            } else {
                for (var j = 0, q; q = o[j]; j++) {
                    f._util_.smartInsert(f.dom(q), j > 0 ? h.clone(true, true) : h, n)
                }
            }
        };
        f.dom.extend({appendTo: function (j) {
            var h = [], i = h.push;
            f.check("^(?:string|HTMLElement|\\$DOM)$", "baidu.dom.appendTo");
            f._util_.smartInsertTo(this, j, function (k) {
                i.apply(h, f.makeArray(k.childNodes));
                this.appendChild(k)
            });
            return this.pushStack(h)
        }});
        f._util_.access = function (m, j, l, n, k) {
            if (m.size() <= 0) {
                return m
            }
            switch (f.type(j)) {
                case"string":
                    if (l === undefined) {
                        return n.call(m, m[0], j)
                    } else {
                        m.each(function (i, o) {
                            n.call(m, o, j, (f.type(l) === "function" ? l.call(o, i, n.call(m, o, j)) : l), k)
                        })
                    }
                    break;
                case"object":
                    for (var h in j) {
                        f._util_.access(m, h, j[h], n, l)
                    }
                    break
            }
            return m
        };
        f._util_.nodeName = function (h, i) {
            return h.nodeName && h.nodeName.toLowerCase() === i.toLowerCase()
        };
        f._util_.propFixer = {tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", classname: "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable", rboolean: /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i};
        !document.createElement("form").enctype && (f._util_.propFixer.enctype = "encoding");
        f._util_.prop = function () {
            var l = /^(?:button|input|object|select|textarea)$/i, k = /^a(?:rea|)$/i, h = document.createElement("select"), j = h.appendChild(document.createElement("option")), i = {tabIndex: {get: function (n) {
                var m = n.getAttributeNode("tabindex");
                return m && m.specified ? parseInt(m.value, 10) : l.test(n.nodeName) || k.test(n.nodeName) && n.href ? 0 : undefined
            }}};
            !j.selected && (i.selected = {get: function (n) {
                var m = n.parentNode;
                if (m) {
                    m.selectedIndex;
                    m.parentNode && m.parentNode.selectedIndex
                }
                return null
            }});
            h = j = null;
            return function (q, p, r) {
                var n = q.nodeType, m, o;
                if (!q || ~"238".indexOf(n)) {
                    return
                }
                if (n !== 1 || !f._util_.isXML(q)) {
                    p = f._util_.propFixer[p] || p;
                    m = i[p] || {}
                }
                if (r !== undefined) {
                    if (m.set && (o = m.set(q, p, r)) !== undefined) {
                        return o
                    } else {
                        return(q[p] = r)
                    }
                } else {
                    if (m.get && (o = m.get(q, p)) !== null) {
                        return o
                    } else {
                        return q[p]
                    }
                }
            }
        }();
        f._util_.support.getSetAttribute = f._util_.support.dom.div.className !== "t";
        f._util_.nodeHook = function () {
            if (f._util_.support.getSetAttribute) {
                return
            }
            var h = {};
            h.name = h.id = h.coords = true;
            return{get: function (k, j) {
                var i = k.getAttributeNode(j);
                return i && (h[j] ? i.value !== "" : i.specified) ? i.value : undefined
            }, set: function (k, j, l) {
                var i = k.getAttributeNode(j);
                if (!i) {
                    i = document.createAttribute(j);
                    k.setAttributeNode(i)
                }
                return(i.value = l + "")
            }}
        }();
        f._util_.removeAttr = function () {
            var i = f._util_.propFixer, h = /\s+/, j = f._util_.support.getSetAttribute;
            return function (p, n) {
                if (!n || p.nodeType !== 1) {
                    return
                }
                var q = n.split(h), o, k;
                for (var m = 0, l; l = q[m]; m++) {
                    o = i[l] || l;
                    k = i.rboolean.test(l);
                    !k && f._util_.attr(p, l, "");
                    p.removeAttribute(j ? l : o);
                    k && (o in p) && (p[o] = false)
                }
            }
        }();
        f._util_.attr = function () {
            var n = f._util_, p = /^(?:button|input)$/i, q = n.support.dom, k = q.input.value === "t", h = q.a.getAttribute("href") === "/a", i = /top/.test(q.a.getAttribute("style")), m = n.nodeHook, l = {className: "class"}, j = {get: function (t, r) {
                var u = n.prop(t, r), s;
                return u === true || typeof u !== "boolean" && (s = t.getAttributeNode(r)) && s.nodeValue !== false ? r.toLowerCase() : undefined
            }, set: function (t, r, u) {
                if (u === false) {
                    n.removeAttr(t, r)
                } else {
                    var s = n.propFixer[r] || r;
                    (s in t) && (t[s] = true);
                    t.setAttribute(r, r.toLowerCase())
                }
                return r
            }}, o = {type: {set: function (t, s, u) {
                if (p.test(t.nodeName) && t.parentNode) {
                    return u
                }
                if (!k && u === "radio" && n.nodeName(t, "input")) {
                    var r = t.value;
                    t.setAttribute("type", u);
                    r && (t.value = r);
                    return u
                }
            }}, value: {get: function (s, r) {
                if (m && n.nodeName(s, "button")) {
                    return m.get(s, r)
                }
                return r in s ? s.value : null
            }, set: function (s, r, t) {
                if (m && n.nodeName(s, "button")) {
                    return m.set(s, r, t)
                }
                s.value = t
            }}};
            if (!n.support.getSetAttribute) {
                f.forEach(["width", "height"], function (r) {
                    o[r] = {set: function (t, s, u) {
                        if (u === "") {
                            t.setAttribute(s, "auto");
                            return u
                        }
                    }}
                });
                o.contenteditable = {get: m.get, set: function (s, r, t) {
                    t === "" && (t = false);
                    m.set(s, r, t)
                }}
            }
            if (!h) {
                f.forEach(["href", "src", "width", "height"], function (r) {
                    o[r] = {get: function (u, t) {
                        var s = u.getAttribute(t, 2);
                        return s === null ? undefined : s
                    }}
                })
            }
            if (!i) {
                o.style = {get: function (r) {
                    return r.style.cssText.toLowerCase() || undefined
                }, set: function (s, r, t) {
                    return(s.style.cssText = t + "")
                }}
            }
            return function (x, v, y, w) {
                var s = x.nodeType, u = s !== 1 || !n.isXML(x), r, t;
                if (!x || ~"238".indexOf(s)) {
                    return
                }
                if (w && f.dom.fn[v]) {
                    return f.dom(x)[v](y)
                }
                if (u) {
                    v = l[v] || v.toLowerCase();
                    r = o[v] || (n.propFixer.rboolean.test(v) ? j : m)
                }
                if (y !== undefined) {
                    if (y === null) {
                        n.removeAttr(x, v);
                        return
                    } else {
                        if (u && r && r.set && (t = r.set(x, v, y)) !== undefined) {
                            return t
                        } else {
                            x.setAttribute(v, y + "");
                            return y
                        }
                    }
                } else {
                    if (u && r && r.get && (t = r.get(x, v)) !== null) {
                        return t
                    } else {
                        t = x.getAttribute(v);
                        return t === null ? undefined : t
                    }
                }
            }
        }();
        f.dom.extend({attr: function (h, i) {
            return f._util_.access(this, h, i, function (l, j, m, k) {
                return f._util_.attr(l, j, m, k)
            })
        }});
        f.dom.extend({before: function () {
            f.check("^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$", "baidu.dom.before");
            f._util_.smartInsert(this, arguments, function (h) {
                this.parentNode && this.parentNode.insertBefore(h, this)
            });
            return this
        }});
        f.dom.extend({bind: function (i, j, h) {
            return this.on(i, undefined, j, h)
        }});
        f.dom.match = function () {
            var i = /^[\w\#\-\$\.\*]+$/, j = document.createElement("DIV");
            j.id = "__tangram__";
            return function (r, l, p) {
                var m, o = f.array();
                switch (f.type(l)) {
                    case"$DOM":
                        for (var k = r.length - 1; k > -1; k--) {
                            for (var q = l.length - 1; q > -1; q--) {
                                r[k] === l[q] && o.push(r[k])
                            }
                        }
                        break;
                    case"function":
                        f.forEach(r, function (t, s) {
                            l.call(t, s) && o.push(t)
                        });
                        break;
                    case"HTMLElement":
                        f.forEach(r, function (s) {
                            s == l && o.push(s)
                        });
                        break;
                    case"string":
                        var n = f.query(l, p || document);
                        f.forEach(r, function (v) {
                            if (m = h(v)) {
                                var u = m.nodeType == 1 ? f.query(l, m) : n;
                                for (var s = 0, w = u.length; s < w; s++) {
                                    if (u[s] === v) {
                                        o.push(v);
                                        break
                                    }
                                }
                            }
                        });
                        o = o.unique();
                        break;
                    default:
                        o = f.array(r).unique();
                        break
                }
                return o
            };
            function h(m) {
                var k = [], l;
                while (m = m.parentNode) {
                    m.nodeType && k.push(m)
                }
                for (var l = k.length - 1; l > -1; l--) {
                    if (k[l].nodeType == 1 || k[l].nodeType == 9) {
                        return k[l]
                    }
                }
                return null
            }
        }();
        f.dom.extend({children: function (h) {
            var i = [];
            this.each(function () {
                f.forEach(this.children || this.childNodes, function (j) {
                    j.nodeType == 1 && i.push(j)
                })
            });
            return this.pushStack(f.dom.match(i, h))
        }});
        f.dom.extend({closest: function (h, j) {
            var i = f.array();
            f.forEach(this, function (l) {
                var k = [l];
                while (l = l.parentNode) {
                    l.nodeType && k.push(l)
                }
                k = f.dom.match(k, h, j);
                k.length && i.push(k[0])
            });
            return this.pushStack(i.unique())
        }});
        f.dom.extend({contents: function () {
            var h = [], l;
            for (var j = 0, k; k = this[j]; j++) {
                l = k.nodeName;
                h.push.apply(h, f.makeArray(l && l.toLowerCase() === "iframe" ? k.contentDocument || k.contentWindow.document : k.childNodes))
            }
            return this.pushStack(h)
        }});
        f.dom.extend({getComputedStyle: function (i) {
            if (!this[0].ownerDocument) {
                return
            }
            var j = this[0].ownerDocument.defaultView, h = j && j.getComputedStyle && j.getComputedStyle(this[0], null), k = h ? (h.getPropertyValue(i) || h[i]) : "";
            return k || this[0].style[i]
        }});
        f.dom.extend({getCurrentStyle: function () {
            var h = document.documentElement.currentStyle ? function (i) {
                return this[0].currentStyle ? this[0].currentStyle[i] : this[0].style[i]
            } : function (i) {
                return this.getComputedStyle(i)
            };
            return function (i) {
                return h.call(this, i)
            }
        }()});
        f._util_.getWidthOrHeight = function () {
            var h = {}, k = {position: "absolute", visibility: "hidden", display: "block"}, i = /^(none|table(?!-c[ea]).+)/;

            function j(n, l) {
                var o = {};
                for (var m in l) {
                    o[m] = n.style[m];
                    n.style[m] = l[m]
                }
                return o
            }

            f.forEach(["Width", "Height"], function (l) {
                var m = {Width: ["Right", "Left"], Height: ["Top", "Bottom"]}[l];
                h["get" + l] = function (s, n) {
                    var r = f.dom(s), o = s.offsetWidth === 0 && i.test(r.getCurrentStyle("display")) && (j(s, k)), q = s["offset" + l] || parseInt(r.getCurrentStyle(l.toLowerCase())) || 0, p = "padding|border";
                    n && f.forEach(n.split("|"), function (t) {
                        if (!~p.indexOf(t)) {
                            q += parseFloat(r.getCurrentStyle(t + m[0])) || 0;
                            q += parseFloat(r.getCurrentStyle(t + m[1])) || 0
                        } else {
                            p = p.replace(new RegExp("\\|?" + t + "\\|?"), "")
                        }
                    });
                    p && f.forEach(p.split("|"), function (t) {
                        q -= parseFloat(r.getCurrentStyle(t + m[0] + (t === "border" ? "Width" : ""))) || 0;
                        q -= parseFloat(r.getCurrentStyle(t + m[1] + (t === "border" ? "Width" : ""))) || 0
                    });
                    o && j(s, o);
                    return q
                }
            });
            return function (n, m, l) {
                return h[m === "width" ? "getWidth" : "getHeight"](n, l)
            }
        }();
        f._util_.setPositiveNumber = function () {
            var i = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, h = new RegExp("^(" + i + ")(.*)$", "i");
            return function (j, m, l) {
                var k = h.exec(m);
                return k ? Math.max(0, k[1] - (l || 0)) + (k[2] || "px") : m
            }
        }();
        f._util_.style = f.extend({set: function (i, h, j) {
            i.style[h] = j
        }}, document.documentElement.currentStyle ? {get: function (j, i) {
            var k = f.dom(j).getCurrentStyle(i), h;
            if (/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i.test(k)) {
                h = j.style.left;
                j.style.left = i === "fontSize" ? "1em" : k;
                k = j.style.pixelLeft + "px";
                j.style.left = h
            }
            return k
        }} : {get: function (i, h) {
            return f.dom(i).getCurrentStyle(h)
        }});
        f._util_.cssHooks = function () {
            var l = /alpha\s*\(\s*opacity\s*=\s*(\d{1,3})/i, k = f._util_.style, i = f._util_.support.dom.a, h = {fontWeight: {normal: 400, bold: 700, bolder: 700, lighter: 100}}, j = {opacity: {}, width: {}, height: {}, fontWeight: {get: function (p, o) {
                var n = k.get(p, o);
                return h.fontWeight[n] || n
            }}};

            function m(o, n, p) {
                f.type(p) === "string" && (p = f._util_.setPositiveNumber(o, p));
                k.set(o, n, p)
            }

            f.extend(j.opacity, /^0.5/.test(i.style.opacity) ? {get: function (p, o) {
                var n = f.dom(p).getCurrentStyle(o);
                return n === "" ? "1" : n
            }} : {get: function (n) {
                return l.test((n.currentStyle || n.style).filter || "") ? parseFloat(RegExp.$1) / 100 : "1"
            }, set: function (r, o, q) {
                var p = (r.currentStyle || r.style).filter || "", n = q * 100;
                r.style.zoom = 1;
                r.style.filter = l.test(p) ? p.replace(l, "Alpha(opacity=" + n) : p + " progid:dximagetransform.microsoft.Alpha(opacity=" + n + ")"
            }});
            f.forEach(["width", "height"], function (n) {
                j[n] = {get: function (o) {
                    return f._util_.getWidthOrHeight(o, n) + "px"
                }, set: m}
            });
            f.each({padding: "", border: "Width"}, function (o, q) {
                j[o + q] = {set: m};
                var p = ["Top", "Right", "Bottom", "Left"], n = 0;
                for (; n < 4; n++) {
                    j[o + p[n] + q] = {set: m}
                }
            });
            return j
        }();
        f._util_.cssNumber = {columnCount: true, fillOpacity: true, fontWeight: true, lineHeight: true, opacity: true, orphans: true, widows: true, zIndex: true, zoom: true};
        f.string.extend({toCamelCase: function () {
            var h = this.valueOf();
            if (h.indexOf("-") < 0 && h.indexOf("_") < 0) {
                return h
            }
            return h.replace(/[-_][^-_]/g, function (i) {
                return i.charAt(1).toUpperCase()
            })
        }});
        f.dom.styleFixer = function () {
            var i = f._util_.style, h = f._util_.cssHooks, j = f._util_.cssNumber, k = {"float": !!f._util_.support.dom.a.style.cssFloat ? "cssFloat" : "styleFloat"};
            return function (p, n, q) {
                var o = f.string.toCamelCase(n), r = q === undefined ? "get" : "set", m, l;
                o = k[o] || o;
                m = f.type(q) === "number" && !j[o] ? q + "px" : q;
                l = h.hasOwnProperty(o) && h[o][r] || i[r];
                return l(p, o, m)
            }
        }();
        f.dom.extend({css: function (h, i) {
            f.check("^(?:(?:string(?:,(?:number|string|function))?)|object)$", "baidu.dom.css");
            return f._util_.access(this, h, i, function (k, j, m) {
                var l = f.dom.styleFixer;
                return l ? l(k, j, m) : (m === undefined ? this.getCurrentStyle(j) : k.style[j] = m)
            })
        }});
        f.dom.extend({data: function () {
            var h = f.key, i = f.global("_maps_HTMLElementData");
            return function (l, n) {
                f.forEach(this, function (o) {
                    !o[h] && (o[h] = f.id())
                });
                if (f.isString(l)) {
                    if (typeof n == "undefined") {
                        var m, k;
                        k = this[0] && (m = i[this[0][h]]) && m[l];
                        if (typeof k != "undefined") {
                            return k
                        } else {
                            var j = this[0].getAttribute("data-" + l);
                            return !~String(j).indexOf("{") ? j : Function("return " + j)()
                        }
                    }
                    f.forEach(this, function (p) {
                        var o = i[p[h]] = i[p[h]] || {};
                        o[l] = n
                    })
                } else {
                    if (f.type(l) == "object") {
                        f.forEach(this, function (p) {
                            var o = i[p[h]] = i[p[h]] || {};
                            f.forEach(l, function (r, q) {
                                o[q] = l[q]
                            })
                        })
                    }
                }
                return this
            }
        }()});
        f.lang.Class = f.base.Class;
        f.lang.Event = f.base.Event;
        f.dom.extend({delegate: function (h, j, k, i) {
            if (typeof k == "function") {
                i = k, k = null
            }
            return this.on(j, h, k, i)
        }});
        f.dom.extend({filter: function (h) {
            return this.pushStack(f.dom.match(this, h))
        }});
        f.dom.extend({remove: function (h, l) {
            arguments.length > 0 && f.check("^string(?:,boolean)?$", "baidu.dom.remove");
            var m = h ? this.filter(h) : this;
            for (var j = 0, k; k = m[j]; j++) {
                if (!l && k.nodeType === 1) {
                    f._util_.cleanData(k.getElementsByTagName("*"));
                    f._util_.cleanData([k])
                }
                k.parentNode && k.parentNode.removeChild(k)
            }
            return this
        }});
        f.dom.extend({detach: function (h) {
            h && f.check("^string$", "baidu.dom.detach");
            return this.remove(h, true)
        }});
        f.object.extend = f.extend;
        f.dom.getStyle = function (i, h) {
            return f.dom(f.dom.g(i)).css(h)
        };
        f.page = f.page || {};
        f.page.getScrollTop = function () {
            var h = document;
            return window.pageYOffset || h.documentElement.scrollTop || h.body.scrollTop
        };
        f.page.getScrollLeft = function () {
            var h = document;
            return window.pageXOffset || h.documentElement.scrollLeft || h.body.scrollLeft
        };
        (function () {
            f.page.getMousePosition = function () {
                return{x: f.page.getScrollLeft() + h.x, y: f.page.getScrollTop() + h.y}
            };
            var h = {x: 0, y: 0};
            f.event.on(document, "onmousemove", function (i) {
                i = window.event || i;
                h.x = i.clientX;
                h.y = i.clientY
            })
        })();
        f.dom.extend({off: function (j, h, k) {
            var i = f._util_.eventBase.core, l = this;
            if (!j) {
                f.forEach(this, function (m) {
                    i.remove(m)
                })
            } else {
                if (typeof j == "string") {
                    if (typeof h == "function") {
                        k = h, h = null
                    }
                    j = j.split(/[ ,]/);
                    f.forEach(this, function (m) {
                        f.forEach(j, function (n) {
                            i.remove(m, n, k, h)
                        })
                    })
                } else {
                    if (typeof j == "object") {
                        f.forEach(j, function (m, n) {
                            l.off(n, h, m)
                        })
                    }
                }
            }
            return this
        }});
        f.event.un = f.un = function (h, j, i) {
            if (typeof h == "string") {
                h = f.dom.g(h)
            }
            f.dom(h).off(j.replace(/^\s*on/, ""), i);
            return h
        };
        f.event.preventDefault = function (h) {
            return new f.event(h).preventDefault()
        };
        (function () {
            var t = false, p, o, l, k, j, m, s, h, r, u;
            f.dom.drag = function (w, v) {
                if (!(p = f.dom.g(w))) {
                    return false
                }
                o = f.object.extend({autoStop: true, capture: true, interval: 16}, v);
                h = m = parseInt(f.dom.getStyle(p, "left")) || 0;
                r = s = parseInt(f.dom.getStyle(p, "top")) || 0;
                t = true;
                setTimeout(function () {
                    var y = f.page.getMousePosition();
                    l = o.mouseEvent ? (f.page.getScrollLeft() + o.mouseEvent.clientX) : y.x;
                    k = o.mouseEvent ? (f.page.getScrollTop() + o.mouseEvent.clientY) : y.y;
                    clearInterval(j);
                    j = setInterval(i, o.interval)
                }, 1);
                var x = f.dom(document);
                o.autoStop && x.on("mouseup", q);
                x.on("selectstart", n);
                if (o.capture && p.setCapture) {
                    p.setCapture()
                } else {
                    if (o.capture && window.captureEvents) {
                        window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
                    }
                }
                u = document.body.style.MozUserSelect;
                document.body.style.MozUserSelect = "none";
                f.isFunction(o.ondragstart) && o.ondragstart(p, o);
                return{stop: q, dispose: q, update: function (y) {
                    f.object.extend(o, y)
                }}
            };
            function q() {
                t = false;
                clearInterval(j);
                if (o.capture && p.releaseCapture) {
                    p.releaseCapture()
                } else {
                    if (o.capture && window.releaseEvents) {
                        window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)
                    }
                }
                document.body.style.MozUserSelect = u;
                var v = f.dom(document);
                v.off("selectstart", n);
                o.autoStop && v.off("mouseup", q);
                f.isFunction(o.ondragend) && o.ondragend(p, o, {left: h, top: r})
            }

            function i(z) {
                if (!t) {
                    clearInterval(j);
                    return
                }
                var w = o.range || [], v = f.page.getMousePosition(), x = m + v.x - l, y = s + v.y - k;
                if (f.isObject(w) && w.length == 4) {
                    x = Math.max(w[3], x);
                    x = Math.min(w[1] - p.offsetWidth, x);
                    y = Math.max(w[0], y);
                    y = Math.min(w[2] - p.offsetHeight, y)
                }
                p.style.left = x + "px";
                p.style.top = y + "px";
                h = x;
                r = y;
                f.isFunction(o.ondrag) && o.ondrag(p, o, {left: h, top: r})
            }

            function n(v) {
                return f.event.preventDefault(v, false)
            }
        })();
        f.lang.isFunction = f.isFunction;
        f.dom.extend({end: function () {
            return this.prevObject || f.dom()
        }});
        f.dom.extend({eq: function (h) {
            f.check("number", "baidu.dom.eq");
            var i = this.get(h);
            return this.pushStack(typeof i === "undefined" ? [] : [i])
        }});
        f.dom.extend({find: function (h) {
            var i = [], j, l = "__tangram__find__", k = [];
            switch (f.type(h)) {
                case"string":
                    this.each(function () {
                        f.merge(k, f.query(h, this))
                    });
                    break;
                case"HTMLElement":
                    j = h.tagName + "#" + (h.id ? h.id : (h.id = l));
                    this.each(function () {
                        if (f.query(j, this).length > 0) {
                            i.push(h)
                        }
                    });
                    h.id == l && (h.id = "");
                    if (i.length > 0) {
                        f.merge(k, i)
                    }
                    break;
                case"$DOM":
                    i = h.get();
                    this.each(function () {
                        f.forEach(f.query("*", this), function (o) {
                            for (var m = 0, p = i.length; m < p; m++) {
                                o === i[m] && (k[k.length++] = i[m])
                            }
                        })
                    });
                    break
            }
            return this.pushStack(k)
        }});
        f.dom.extend({first: function () {
            return this.eq(0)
        }});
        f.dom.getAttr = function (i, h) {
            return f.dom(f.dom.g(i)).attr(h)
        };
        f.dom.extend({getWindow: function () {
            var h = this.getDocument();
            return(this.size() <= 0) ? undefined : (h.parentWindow || h.defaultView)
        }});
        f.dom.extend({offsetParent: function () {
            return this.map(function () {
                var i = this.offsetParent || document.body, h = /^(?:body|html)$/i;
                while (i && f.dom(i).getCurrentStyle("position") === "static" && !h.test(i.nodeName)) {
                    i = i.offsetParent
                }
                return i
            })
        }});
        f.dom.extend({position: function () {
            if (this.size() <= 0) {
                return 0
            }
            var h = /^(?:body|html)$/i, k = this.offset(), i = this.offsetParent(), j = h.test(i[0].nodeName) ? {left: 0, top: 0} : i.offset();
            k.left -= parseFloat(this.getCurrentStyle("marginLeft")) || 0;
            k.top -= parseFloat(this.getCurrentStyle("marginTop")) || 0;
            j.left += parseFloat(i.getCurrentStyle("borderLeftWidth")) || 0;
            j.top += parseFloat(i.getCurrentStyle("borderTopWidth")) || 0;
            return{left: k.left - j.left, top: k.top - j.top}
        }});
        f.dom.extend({offset: function () {
            function h(q, r, n) {
                var i = i = f.dom(q), l = i.getCurrentStyle("position");
                l === "static" && (q.style.position = "relative");
                var j = i.offset(), k = i.getCurrentStyle("left"), o = i.getCurrentStyle("top"), p = (~"absolute|fixed".indexOf(l)) && ~("" + k + o).indexOf("auto"), m = p && i.position();
                k = m && m.left || parseFloat(k) || 0;
                o = m && m.top || parseFloat(o) || 0;
                f.type("options") === "function" && (r = r.call(q, n, j));
                r.left != undefined && (q.style.left = r.left - j.left + k + "px");
                r.top != undefined && (q.style.top = r.top - j.top + o + "px")
            }

            return function (k) {
                if (k) {
                    f.check("^(?:object|function)$", "baidu.dom.offset");
                    for (var l = 0, n; n = this[l]; l++) {
                        h(n, k, l)
                    }
                    return this
                }
                var o = this[0], q = this.getDocument(), m = {left: 0, top: 0}, p, j;
                if (!q) {
                    return
                }
                j = q.documentElement;
                if (!f._util_.contains(j, o)) {
                    return m
                }
                (typeof o.getBoundingClientRect) !== "undefined" && (m = o.getBoundingClientRect());
                p = this.getWindow();
                return{left: m.left + (p.pageXOffset || j.scrollLeft) - (j.clientLeft || 0), top: m.top + (p.pageYOffset || j.scrollTop) - (j.clientTop || 0)}
            }
        }()});
        f.dom.extend({has: function (h) {
            var i = [], j = f.dom(document.body);
            f.forEach(this, function (k) {
                j[0] = k;
                j.find(h).length && i.push(k)
            });
            return f.dom(i)
        }});
        f.dom.extend({hasClass: function (j) {
            if (arguments.length <= 0 || typeof j === "function") {
                return this
            }
            if (this.size() <= 0) {
                return false
            }
            j = j.replace(/^\s+/g, "").replace(/\s+$/g, "").replace(/\s+/g, " ");
            var i = j.split(" ");
            var h;
            f.forEach(this, function (l) {
                var m = l.className;
                for (var k = 0; k < i.length; k++) {
                    if (!~(" " + m + " ").indexOf(" " + i[k] + " ")) {
                        h = false;
                        return
                    }
                }
                if (h !== false) {
                    h = true;
                    return
                }
            });
            return h
        }});
        f._util_.getWindowOrDocumentWidthOrHeight = f._util_.getWindowOrDocumentWidthOrHeight || function () {
            var h = {window: {}, document: {}};
            f.forEach(["Width", "Height"], function (k) {
                var j = "client" + k, l = "offset" + k, i = "scroll" + k;
                h.window["get" + k] = function (m) {
                    var o = m.document, n = o.documentElement[j];
                    return f.browser.isStrict && n || o.body && o.body[j] || n
                };
                h.document["get" + k] = function (m) {
                    var n = m.documentElement;
                    return n[j] >= n[i] ? n[j] : Math.max(m.body[i], n[i], m.body[l], n[l])
                }
            });
            return function (k, j, i) {
                return h[j][i === "width" ? "getWidth" : "getHeight"](k)
            }
        }();
        f.dom.extend({height: function (h) {
            return f._util_.access(this, "height", h, function (m, k, n) {
                var j = n !== undefined, i = j && parseFloat(n), l = m != null && m == m.window ? "window" : (m.nodeType === 9 ? "document" : false);
                if (j && i < 0 || isNaN(i)) {
                    return
                }
                j && /^(?:\d*\.)?\d+$/.test(n += "") && (n += "px");
                return l ? f._util_.getWindowOrDocumentWidthOrHeight(m, l, k) : (j ? m.style.height = n : f._util_.getWidthOrHeight(m, k))
            })
        }});
        f._util_.isHidden = function (h) {
            return f.dom(h).getCurrentStyle("display") === "none" || !f._util_.contains(h.ownerDocument, h)
        };
        f.dom.extend({hide: function () {
            var j = [], i, h, k;
            return this.each(function (l, m) {
                if (!m.style) {
                    return
                }
                i = f(m);
                j[l] = i.data("olddisplay");
                k = m.style.display;
                if (!j[l]) {
                    h = f._util_.isHidden(m);
                    if (k && k !== "none" || !h) {
                        i.data("olddisplay", h ? k : i.getCurrentStyle("display"))
                    }
                }
                m.style.display = "none"
            })
        }});
        f.dom.extend({innerHeight: function () {
            if (this.size() <= 0) {
                return 0
            }
            var i = this[0], h = i != null && i === i.window ? "window" : (i.nodeType === 9 ? "document" : false);
            return h ? f._util_.getWindowOrDocumentWidthOrHeight(i, h, "height") : f._util_.getWidthOrHeight(i, "height", "padding")
        }});
        f.dom.extend({innerWidth: function () {
            if (this.size() <= 0) {
                return 0
            }
            var i = this[0], h = i != null && i === i.window ? "window" : (i.nodeType === 9 ? "document" : false);
            return h ? f._util_.getWindowOrDocumentWidthOrHeight(i, h, "width") : f._util_.getWidthOrHeight(i, "width", "padding")
        }});
        f.dom.extend({insertAfter: function (j) {
            var h = [], i = h.push;
            f.check("^(?:string|HTMLElement|\\$DOM)$", "baidu.dom.insertAfter");
            f._util_.smartInsertTo(this, j, function (k) {
                i.apply(h, f.makeArray(k.childNodes));
                this.parentNode.insertBefore(k, this.nextSibling)
            }, "after");
            return this.pushStack(h)
        }});
        f.dom.extend({insertBefore: function (j) {
            var h = [], i = h.push;
            f.check("^(?:string|HTMLElement|\\$DOM)$", "baidu.dom.insertBefore");
            f._util_.smartInsertTo(this, j, function (k) {
                i.apply(h, f.makeArray(k.childNodes));
                this.parentNode.insertBefore(k, this)
            }, "before");
            return this.pushStack(h)
        }});
        f.dom.extend({insertHTML: function (h, k) {
            var i, l, j = this[0];
            if (j.insertAdjacentHTML && !f.browser.opera) {
                j.insertAdjacentHTML(h, k)
            } else {
                i = j.ownerDocument.createRange();
                h = h.toUpperCase();
                if (h == "AFTERBEGIN" || h == "BEFOREEND") {
                    i.selectNodeContents(j);
                    i.collapse(h == "AFTERBEGIN")
                } else {
                    l = h == "BEFOREBEGIN";
                    i[l ? "setStartBefore" : "setEndAfter"](j);
                    i.collapse(l)
                }
                i.insertNode(i.createContextualFragment(k))
            }
            return j
        }});
        f.dom.extend({is: function (h) {
            return f.dom.match(this, h).length > 0
        }});
        f.dom.extend({last: function () {
            return this.eq(-1)
        }});
        f.dom.extend({next: function (h) {
            var i = [];
            f.forEach(this, function (j) {
                while ((j = j.nextSibling) && j && j.nodeType != 1) {
                }
                j && (i[i.length++] = j)
            });
            return this.pushStack(h ? f.dom.match(i, h) : i)
        }});
        f.dom.extend({nextAll: function (h) {
            var i = [];
            f.forEach(this, function (j) {
                while (j = j.nextSibling) {
                    j && (j.nodeType == 1) && i.push(j)
                }
            });
            return this.pushStack(f.dom.match(i, h))
        }});
        f.dom.extend({nextUntil: function (h, i) {
            var j = f.array();
            f.forEach(this, function (m) {
                var l = f.array();
                while (m = m.nextSibling) {
                    m && (m.nodeType == 1) && l.push(m)
                }
                if (h && l.length) {
                    var k = f.dom.match(l, h);
                    if (k.length) {
                        l = l.slice(0, l.indexOf(k[0]))
                    }
                }
                f.merge(j, l)
            });
            return this.pushStack(f.dom.match(j, i))
        }});
        f.dom.extend({not: function (h) {
            var m, l, p, o = this.get(), k = f.isArray(h) ? h : f.dom.match(this, h);
            for (m = o.length - 1; m > -1; m--) {
                for (l = 0, p = k.length; l < p; l++) {
                    k[l] === o[m] && o.splice(m, 1)
                }
            }
            return this.pushStack(o)
        }});
        f.dom.extend({one: function (i, h, k, j) {
            return this.on(i, h, k, j, 1)
        }});
        f.dom.extend({outerHeight: function (j) {
            if (this.size() <= 0) {
                return 0
            }
            var i = this[0], h = i != null && i === i.window ? "window" : (i.nodeType === 9 ? "document" : false);
            return h ? f._util_.getWindowOrDocumentWidthOrHeight(i, h, "height") : f._util_.getWidthOrHeight(i, "height", "padding|border" + (j ? "|margin" : ""))
        }});
        f.dom.extend({outerWidth: function (j) {
            if (this.size() <= 0) {
                return 0
            }
            var i = this[0], h = i != null && i === i.window ? "window" : (i.nodeType === 9 ? "document" : false);
            return h ? f._util_.getWindowOrDocumentWidthOrHeight(i, h, "width") : f._util_.getWidthOrHeight(i, "width", "padding|border" + (j ? "|margin" : ""))
        }});
        f.dom.extend({parent: function (h) {
            var i = [];
            f.forEach(this, function (j) {
                (j = j.parentNode) && j.nodeType == 1 && i.push(j)
            });
            return this.pushStack(f.dom.match(i, h))
        }});
        f.dom.extend({parents: function (h) {
            var i = [];
            f.forEach(this, function (k) {
                var j = [];
                while ((k = k.parentNode) && k.nodeType == 1) {
                    j.push(k)
                }
                f.merge(i, j)
            });
            return this.pushStack(f.dom.match(i, h))
        }});
        f.dom.extend({parentsUntil: function (h, i) {
            f.check("(string|HTMLElement)(,.+)?", "baidu.dom.parentsUntil");
            var j = [];
            f.forEach(this, function (m) {
                var l = f.array();
                while ((m = m.parentNode) && m.nodeType == 1) {
                    l.push(m)
                }
                if (h && l.length) {
                    var k = f.dom.match(l, h);
                    if (k.length) {
                        l = l.slice(0, l.indexOf(k[0]))
                    }
                }
                f.merge(j, l)
            });
            return this.pushStack(f.dom.match(j, i))
        }});
        f.dom.extend({prepend: function () {
            f.check("^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$", "baidu.dom.prepend");
            f._util_.smartInsert(this, arguments, function (h) {
                this.nodeType === 1 && this.insertBefore(h, this.firstChild)
            });
            return this
        }});
        f.dom.extend({prependTo: function (j) {
            var h = [], i = h.push;
            f.check("^(?:string|HTMLElement|\\$DOM)$", "baidu.dom.prependTo");
            f._util_.smartInsertTo(this, j, function (k) {
                i.apply(h, f.makeArray(k.childNodes));
                this.insertBefore(k, this.firstChild)
            });
            return this.pushStack(h)
        }});
        f.dom.extend({prev: function (h) {
            var i = [];
            f.forEach(this, function (j) {
                while (j = j.previousSibling) {
                    if (j.nodeType == 1) {
                        i.push(j);
                        break
                    }
                }
            });
            return this.pushStack(f.dom.match(i, h))
        }});
        f.dom.extend({prevAll: function (h) {
            var i = f.array();
            f.forEach(this, function (k) {
                var j = [];
                while (k = k.previousSibling) {
                    k.nodeType == 1 && j.push(k)
                }
                f.merge(i, j.reverse())
            });
            return this.pushStack(typeof h == "string" ? f.dom.match(i, h) : i.unique())
        }});
        f.dom.extend({prevUntil: function (h, i) {
            f.check("(string|HTMLElement)(,.+)?", "baidu.dom.prevUntil");
            var j = [];
            f.forEach(this, function (m) {
                var l = f.array();
                while (m = m.previousSibling) {
                    m && (m.nodeType == 1) && l.push(m)
                }
                if (h && l.length) {
                    var k = f.dom.match(l, h);
                    if (k.length) {
                        l = l.slice(0, l.indexOf(k[0]))
                    }
                }
                f.merge(j, l)
            });
            return this.pushStack(f.dom.match(j, i))
        }});
        f.dom.extend({prop: function (i, h) {
            return f._util_.access(this, i, h, function (k, j, l) {
                return f._util_.prop(k, j, l)
            })
        }});
        f.string.extend({escapeReg: function () {
            return this.replace(new RegExp("([.*+?^=!:\x24{}()|[\\]/\\\\])", "g"), "\\\x241")
        }});
        void function (X, x) {
            f.query = function (ab, ad, ac) {
                return f.merge(ac || [], f.sizzle(ab, ad))
            };
            var l = X.document, q = l.documentElement, Z = "sizcache" + (Math.random() + "").replace(".", ""), v = 0, k = Object.prototype.toString, J = "undefined", s = false, o = true, R = /^#([\w\-]+$)|^(\w+$)|^\.([\w\-]+$)/, H = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, G = /\\/g, aa = /\W/, n = /^\w/, z = /\D/, m = /(-?)(\d*)(?:n([+\-]?\d*))?/, D = /^\+|\s*/g, C = /h\d/i, S = /input|select|textarea|button/i, t = /[\t\n\f\r]/g, y = "(?:[-\\w]|[^\\x00-\\xa0]|\\\\.)", N = {ID: new RegExp("#(" + y + "+)"), CLASS: new RegExp("\\.(" + y + "+)"), NAME: new RegExp("\\[name=['\"]*(" + y + "+)['\"]*\\]"), TAG: new RegExp("^(" + y.replace("[-", "[-\\*") + "+)"), ATTR: new RegExp("\\[\\s*(" + y + "+)\\s*(?:(\\S?=)\\s*(?:(['\"])(.*?)\\3|(#?" + y + "*)|)|)\\s*\\]"), PSEUDO: new RegExp(":(" + y + "+)(?:\\((['\"]?)((?:\\([^\\)]+\\)|[^\\(\\)]*)+)\\2\\))?"), CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/, POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/}, T = N.POS, U = (function () {
                var ac, ad = function (af, ae) {
                    return"\\" + (ae - 0 + 1)
                }, ab = {};
                for (ac in N) {
                    N[ac] = new RegExp(N[ac].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
                    ab[ac] = new RegExp(/(^(?:.|\r|\n)*?)/.source + N[ac].source.replace(/\\(\d+)/g, ad))
                }
                N.globalPOS = T;
                return ab
            })(), Q = function (ab) {
                var ac = false, ae = l.createElement("div");
                try {
                    ac = ab(ae)
                } catch (ad) {
                }
                ae = null;
                return ac
            }, p = Q(function (ad) {
                var ab = true, ac = "script" + (new Date()).getTime();
                ad.innerHTML = "<a name ='" + ac + "'/>";
                q.insertBefore(ad, q.firstChild);
                if (l.getElementById(ac)) {
                    ab = false
                }
                q.removeChild(ad);
                return ab
            }), j = Q(function (ab) {
                ab.appendChild(l.createComment(""));
                return ab.getElementsByTagName("*").length === 0
            }), M = Q(function (ab) {
                ab.innerHTML = "<a href='#'></a>";
                return ab.firstChild && typeof ab.firstChild.getAttribute !== J && ab.firstChild.getAttribute("href") === "#"
            }), L = Q(function (ab) {
                ab.innerHTML = "<div class='test e'></div><div class='test'></div>";
                if (!ab.getElementsByClassName || ab.getElementsByClassName("e").length === 0) {
                    return false
                }
                ab.lastChild.className = "e";
                return ab.getElementsByClassName("e").length !== 1
            });
            [0, 0].sort(function () {
                o = false;
                return 0
            });
            var V = function (ab, ag, af) {
                af = af || [];
                ag = ag || l;
                var ad, ah, ae, ac = ag.nodeType;
                if (ac !== 1 && ac !== 9) {
                    return[]
                }
                if (!ab || typeof ab !== "string") {
                    return af
                } else {
                    ab = f.string(ab).trim();
                    if (!ab) {
                        return af
                    }
                }
                ae = B(ag);
                if (!ae) {
                    if ((ad = R.exec(ab))) {
                        if (ad[1]) {
                            if (ac === 9) {
                                ah = ag.getElementById(ad[1]);
                                if (ah && ah.parentNode) {
                                    if (ah.id === ad[1]) {
                                        return A([ah], af)
                                    }
                                } else {
                                    return A([], af)
                                }
                            } else {
                                if (ag.ownerDocument && (ah = ag.ownerDocument.getElementById(ad[1])) && K(ag, ah) && ah.id === ad[1]) {
                                    return A([ah], af)
                                }
                            }
                        } else {
                            if (ad[2]) {
                                if (ab === "body" && ag.body) {
                                    return A([ag.body], af)
                                }
                                return A(ag.getElementsByTagName(ab), af)
                            } else {
                                if (L && ad[3] && ag.getElementsByClassName) {
                                    return A(ag.getElementsByClassName(ad[3]), af)
                                }
                            }
                        }
                    }
                }
                return Y(ab, ag, af, x, ae)
            };
            var Y = function (ag, ab, aj, ak, af) {
                var ad, ao, ar, ac, an, aq, ap, ai, am = ab, ae = true, ah = [], al = ag;
                do {
                    H.exec("");
                    ad = H.exec(al);
                    if (ad) {
                        al = ad[3];
                        ah.push(ad[1]);
                        if (ad[2]) {
                            ac = ad[3];
                            break
                        }
                    }
                } while (ad);
                if (ah.length > 1 && T.exec(ag)) {
                    if (ah.length === 2 && P.relative[ah[0]]) {
                        ao = E(ah[0] + ah[1], ab, ak, af)
                    } else {
                        ao = P.relative[ah[0]] ? [ab] : V(ah.shift(), ab);
                        while (ah.length) {
                            ag = ah.shift();
                            if (P.relative[ag]) {
                                ag += ah.shift()
                            }
                            ao = E(ag, ao, ak, af)
                        }
                    }
                } else {
                    if (!ak && ah.length > 1 && ab.nodeType === 9 && !af && N.ID.test(ah[0]) && !N.ID.test(ah[ah.length - 1])) {
                        an = W(ah.shift(), ab, af);
                        ab = an.expr ? O(an.expr, an.set)[0] : an.set[0]
                    }
                    if (ab) {
                        an = ak ? {expr: ah.pop(), set: A(ak)} : W(ah.pop(), (ah.length >= 1 && (ah[0] === "~" || ah[0] === "+") && ab.parentNode) || ab, af);
                        ao = an.expr ? O(an.expr, an.set) : an.set;
                        if (ah.length > 0) {
                            ar = A(ao)
                        } else {
                            ae = false
                        }
                        while (ah.length) {
                            aq = ah.pop();
                            ap = aq;
                            if (!P.relative[aq]) {
                                aq = ""
                            } else {
                                ap = ah.pop()
                            }
                            if (ap == null) {
                                ap = ab
                            }
                            P.relative[aq](ar, ap, af)
                        }
                    } else {
                        ar = ah = []
                    }
                }
                if (!ar) {
                    ar = ao
                }
                if (!ar) {
                    I(aq || ag)
                }
                if (k.call(ar) === "[object Array]") {
                    if (!ae) {
                        aj.push.apply(aj, ar)
                    } else {
                        if (ab && ab.nodeType === 1) {
                            for (ai = 0; ar[ai] != null; ai++) {
                                if (ar[ai] && (ar[ai] === true || ar[ai].nodeType === 1 && K(ab, ar[ai]))) {
                                    aj.push(ao[ai])
                                }
                            }
                        } else {
                            for (ai = 0; ar[ai] != null; ai++) {
                                if (ar[ai] && ar[ai].nodeType === 1) {
                                    aj.push(ao[ai])
                                }
                            }
                        }
                    }
                } else {
                    A(ar, aj)
                }
                if (ac) {
                    Y(ac, am, aj, ak, af);
                    u(aj)
                }
                return aj
            };
            var B = f._util_.isXML;
            var A = f.makeArray;
            var u = function (ac) {
                if (w) {
                    s = o;
                    ac.sort(w);
                    if (s) {
                        for (var ab = 1; ab < ac.length; ab++) {
                            if (ac[ab] === ac[ab - 1]) {
                                ac.splice(ab--, 1)
                            }
                        }
                    }
                }
                return ac
            };
            var K = f._util_.contains;
            var W = function (aj, ab, ad) {
                var ai, ae, ag, af, ah, ac;
                if (!aj) {
                    return[]
                }
                for (ae = 0, ag = P.order.length; ae < ag; ae++) {
                    ah = P.order[ae];
                    if ((af = U[ah].exec(aj))) {
                        ac = af[1];
                        af.splice(1, 1);
                        if (ac.substr(ac.length - 1) !== "\\") {
                            af[1] = (af[1] || "").replace(G, "");
                            ai = P.find[ah](af, ab, ad);
                            if (ai != null) {
                                aj = aj.replace(N[ah], "");
                                break
                            }
                        }
                    }
                }
                if (!ai) {
                    ai = typeof ab.getElementsByTagName !== J ? ab.getElementsByTagName("*") : []
                }
                return{set: ai, expr: aj}
            };
            var O = function (am, al, ap, af) {
                var ah, ab, ak, ar, ao, ac, ae, ag, an, ad = am, aq = [], aj = al, ai = al && al[0] && B(al[0]);
                while (am && al.length) {
                    for (ak in P.filter) {
                        if ((ah = U[ak].exec(am)) != null && ah[2]) {
                            ac = P.filter[ak];
                            ae = ah[1];
                            ab = false;
                            ah.splice(1, 1);
                            if (ae.substr(ae.length - 1) === "\\") {
                                continue
                            }
                            if (aj === aq) {
                                aq = []
                            }
                            if (P.preFilter[ak]) {
                                ah = P.preFilter[ak](ah, aj, ap, aq, af, ai);
                                if (!ah) {
                                    ab = ar = true
                                } else {
                                    if (ah === true) {
                                        continue
                                    }
                                }
                            }
                            if (ah) {
                                for (ag = 0; (ao = aj[ag]) != null; ag++) {
                                    if (ao) {
                                        ar = ac(ao, ah, ag, aj);
                                        an = af ^ ar;
                                        if (ap && ar != null) {
                                            if (an) {
                                                ab = true
                                            } else {
                                                aj[ag] = false
                                            }
                                        } else {
                                            if (an) {
                                                aq.push(ao);
                                                ab = true
                                            }
                                        }
                                    }
                                }
                            }
                            if (ar !== x) {
                                if (!ap) {
                                    aj = aq
                                }
                                am = am.replace(N[ak], "");
                                if (!ab) {
                                    return[]
                                }
                                break
                            }
                        }
                    }
                    if (am === ad) {
                        if (ab == null) {
                            I(am)
                        } else {
                            break
                        }
                    }
                    ad = am
                }
                return aj
            };
            var I = function (ab) {
                throw new Error(ab)
            };
            var h = function (af) {
                var ad, ae, ab = af.nodeType, ac = "";
                if (ab) {
                    if (ab === 1 || ab === 9 || ab === 11) {
                        if (typeof af.textContent === "string") {
                            return af.textContent
                        } else {
                            for (af = af.firstChild; af; af = af.nextSibling) {
                                ac += h(af)
                            }
                        }
                    } else {
                        if (ab === 3 || ab === 4) {
                            return af.nodeValue
                        }
                    }
                } else {
                    for (ad = 0; (ae = af[ad]); ad++) {
                        if (ae.nodeType !== 8) {
                            ac += h(ae)
                        }
                    }
                }
                return ac
            };
            var P = {match: N, leftMatch: U, order: ["ID", "NAME", "TAG"], attrMap: {"class": "className", "for": "htmlFor"}, attrHandle: {href: M ? function (ab) {
                return ab.getAttribute("href")
            } : function (ab) {
                return ab.getAttribute("href", 2)
            }, type: function (ab) {
                return ab.getAttribute("type")
            }}, relative: {"+": function (ah, ac) {
                var ae = typeof ac === "string", ag = ae && !aa.test(ac), ai = ae && !ag;
                if (ag) {
                    ac = ac.toLowerCase()
                }
                for (var ad = 0, ab = ah.length, af; ad < ab; ad++) {
                    if ((af = ah[ad])) {
                        while ((af = af.previousSibling) && af.nodeType !== 1) {
                        }
                        ah[ad] = ai || af && af.nodeName.toLowerCase() === ac ? af || false : af === ac
                    }
                }
                if (ai) {
                    O(ac, ah, true)
                }
            }, ">": function (ah, ac) {
                var ag, af = typeof ac === "string", ad = 0, ab = ah.length;
                if (af && !aa.test(ac)) {
                    ac = ac.toLowerCase();
                    for (; ad < ab; ad++) {
                        ag = ah[ad];
                        if (ag) {
                            var ae = ag.parentNode;
                            ah[ad] = ae.nodeName.toLowerCase() === ac ? ae : false
                        }
                    }
                } else {
                    for (; ad < ab; ad++) {
                        ag = ah[ad];
                        if (ag) {
                            ah[ad] = af ? ag.parentNode : ag.parentNode === ac
                        }
                    }
                    if (af) {
                        O(ac, ah, true)
                    }
                }
            }, "": function (ad, ac, ab) {
                r("parentNode", ad, ac, ab)
            }, "~": function (ad, ac, ab) {
                r("previousSibling", ad, ac, ab)
            }}, find: {ID: p ? function (ad, ae, ac) {
                if (typeof ae.getElementById !== J && !ac) {
                    var ab = ae.getElementById(ad[1]);
                    return ab && ab.parentNode ? [ab] : []
                }
            } : function (ad, ae, ac) {
                if (typeof ae.getElementById !== J && !ac) {
                    var ab = ae.getElementById(ad[1]);
                    return ab ? ab.id === ad[1] || typeof ab.getAttributeNode !== J && ab.getAttributeNode("id").nodeValue === ad[1] ? [ab] : x : []
                }
            }, NAME: function (ad, ag) {
                if (typeof ag.getElementsByName !== J) {
                    var ac = [], af = ag.getElementsByName(ad[1]), ae = 0, ab = af.length;
                    for (; ae < ab; ae++) {
                        if (af[ae].getAttribute("name") === ad[1]) {
                            ac.push(af[ae])
                        }
                    }
                    return ac.length === 0 ? null : ac
                }
            }, TAG: j ? function (ab, ac) {
                if (typeof ac.getElementsByTagName !== J) {
                    return ac.getElementsByTagName(ab[1])
                }
            } : function (ab, af) {
                var ae = af.getElementsByTagName(ab[1]);
                if (ab[1] === "*") {
                    var ad = [], ac = 0;
                    for (; ae[ac]; ac++) {
                        if (ae[ac].nodeType === 1) {
                            ad.push(ae[ac])
                        }
                    }
                    ae = ad
                }
                return ae
            }}, preFilter: {CLASS: function (af, ac, ad, ab, ai, ae) {
                af = " " + af[1].replace(G, "") + " ";
                if (ae) {
                    return af
                }
                for (var ag = 0, ah; (ah = ac[ag]) != null; ag++) {
                    if (ah) {
                        if (ai ^ (ah.className && ~(" " + ah.className + " ").replace(t, " ").indexOf(af))) {
                            if (!ad) {
                                ab.push(ah)
                            }
                        } else {
                            if (ad) {
                                ac[ag] = false
                            }
                        }
                    }
                }
                return false
            }, ID: function (ab) {
                return ab[1].replace(G, "")
            }, TAG: function (ac, ab) {
                return ac[1].replace(G, "").toLowerCase()
            }, CHILD: function (ab) {
                if (ab[1] === "nth") {
                    if (!ab[2]) {
                        I(ab[0])
                    }
                    ab[2] = ab[2].replace(D, "");
                    var ac = m.exec(ab[2] === "even" && "2n" || ab[2] === "odd" && "2n+1" || !z.test(ab[2]) && "0n+" + ab[2] || ab[2]);
                    ab[2] = (ac[1] + (ac[2] || 1)) - 0;
                    ab[3] = ac[3] - 0
                } else {
                    if (ab[2]) {
                        I(ab[0])
                    }
                }
                ab[0] = v++;
                return ab
            }, ATTR: function (ag, ac, ad, ab, ah, af) {
                var ae = ag[1] = ag[1].replace(G, "");
                if (!af && P.attrMap[ae]) {
                    ag[1] = P.attrMap[ae]
                }
                ag[4] = (ag[4] || ag[5] || "").replace(G, "");
                if (ag[2] === "~=") {
                    ag[4] = " " + ag[4] + " "
                }
                return ag
            }, PSEUDO: function (ag, ac, ad, ab, ah, af) {
                if (ag[1] === "not") {
                    if ((H.exec(ag[3]) || "").length > 1 || n.test(ag[3])) {
                        ag[3] = Y(ag[3], l, [], ac, af)
                    } else {
                        var ae = O(ag[3], ac, ad, !ah);
                        if (!ad) {
                            ab.push.apply(ab, ae)
                        }
                        return false
                    }
                } else {
                    if (N.POS.test(ag[0]) || N.CHILD.test(ag[0])) {
                        return true
                    }
                }
                return ag
            }, POS: function (ab) {
                ab.unshift(true);
                return ab
            }}, filters: {enabled: function (ab) {
                return ab.disabled === false
            }, disabled: function (ab) {
                return ab.disabled === true
            }, checked: function (ab) {
                var ac = ab.nodeName.toLowerCase();
                return(ac === "input" && !!ab.checked) || (ac === "option" && !!ab.selected)
            }, selected: function (ab) {
                if (ab.parentNode) {
                    ab.parentNode.selectedIndex
                }
                return ab.selected === true
            }, parent: function (ab) {
                return !!ab.firstChild
            }, empty: function (ab) {
                return !ab.firstChild
            }, has: function (ad, ac, ab) {
                return !!V(ab[3], ad).length
            }, header: function (ab) {
                return C.test(ab.nodeName)
            }, text: function (ad) {
                var ab = ad.getAttribute("type"), ac = ad.type;
                return ad.nodeName.toLowerCase() === "input" && "text" === ac && (ab === null || ab.toLowerCase() === ac)
            }, radio: function (ab) {
                return ab.nodeName.toLowerCase() === "input" && "radio" === ab.type
            }, checkbox: function (ab) {
                return ab.nodeName.toLowerCase() === "input" && "checkbox" === ab.type
            }, file: function (ab) {
                return ab.nodeName.toLowerCase() === "input" && "file" === ab.type
            }, password: function (ab) {
                return ab.nodeName.toLowerCase() === "input" && "password" === ab.type
            }, submit: function (ac) {
                var ab = ac.nodeName.toLowerCase();
                return(ab === "input" || ab === "button") && "submit" === ac.type
            }, image: function (ab) {
                return ab.nodeName.toLowerCase() === "input" && "image" === ab.type
            }, reset: function (ac) {
                var ab = ac.nodeName.toLowerCase();
                return(ab === "input" || ab === "button") && "reset" === ac.type
            }, button: function (ac) {
                var ab = ac.nodeName.toLowerCase();
                return ab === "input" && "button" === ac.type || ab === "button"
            }, input: function (ab) {
                return S.test(ab.nodeName)
            }, focus: function (ab) {
                var ac = ab.ownerDocument;
                return ab === ac.activeElement && (!ac.hasFocus || ac.hasFocus()) && !!(ab.type || ab.href)
            }, active: function (ab) {
                return ab === ab.ownerDocument.activeElement
            }, contains: function (ad, ac, ab) {
                return(ad.textContent || ad.innerText || h(ad)).indexOf(ab[3]) >= 0
            }}, setFilters: {first: function (ac, ab) {
                return ab === 0
            }, last: function (ad, ac, ab, ae) {
                return ac === ae.length - 1
            }, even: function (ac, ab) {
                return ab % 2 === 0
            }, odd: function (ac, ab) {
                return ab % 2 === 1
            }, lt: function (ad, ac, ab) {
                return ac < ab[3] - 0
            }, gt: function (ad, ac, ab) {
                return ac > ab[3] - 0
            }, nth: function (ad, ac, ab) {
                return ab[3] - 0 === ac
            }, eq: function (ad, ac, ab) {
                return ab[3] - 0 === ac
            }}, filter: {PSEUDO: function (ad, ah, ag, aj) {
                var ab = ah[1], ac = P.filters[ab];
                if (ac) {
                    return ac(ad, ag, ah, aj)
                } else {
                    if (ab === "not") {
                        var ae = ah[3], af = 0, ai = ae.length;
                        for (; af < ai; af++) {
                            if (ae[af] === ad) {
                                return false
                            }
                        }
                        return true
                    } else {
                        I(ab)
                    }
                }
            }, CHILD: function (ad, af) {
                var ae, al, ah, ak, ab, ag, aj, ai = af[1], ac = ad;
                switch (ai) {
                    case"only":
                    case"first":
                        while ((ac = ac.previousSibling)) {
                            if (ac.nodeType === 1) {
                                return false
                            }
                        }
                        if (ai === "first") {
                            return true
                        }
                        ac = ad;
                    case"last":
                        while ((ac = ac.nextSibling)) {
                            if (ac.nodeType === 1) {
                                return false
                            }
                        }
                        return true;
                    case"nth":
                        ae = af[2];
                        al = af[3];
                        if (ae === 1 && al === 0) {
                            return true
                        }
                        ah = af[0];
                        ak = ad.parentNode;
                        if (ak && (ak[Z] !== ah || !ad.nodeIndex)) {
                            ag = 0;
                            for (ac = ak.firstChild; ac; ac = ac.nextSibling) {
                                if (ac.nodeType === 1) {
                                    ac.nodeIndex = ++ag
                                }
                            }
                            ak[Z] = ah
                        }
                        aj = ad.nodeIndex - al;
                        if (ae === 0) {
                            return aj === 0
                        } else {
                            return(aj % ae === 0 && aj / ae >= 0)
                        }
                }
            }, ID: p ? function (ac, ab) {
                return ac.nodeType === 1 && ac.getAttribute("id") === ab
            } : function (ad, ab) {
                var ac = typeof ad.getAttributeNode !== J && ad.getAttributeNode("id");
                return ad.nodeType === 1 && ac && ac.nodeValue === ab
            }, TAG: function (ac, ab) {
                return(ab === "*" && ac.nodeType === 1) || !!ac.nodeName && ac.nodeName.toLowerCase() === ab
            }, CLASS: function (ac, ab) {
                return(" " + (ac.className || ac.getAttribute("class")) + " ").indexOf(ab) > -1
            }, ATTR: function (ag, ae) {
                var ad = ae[1], ab = P.attrHandle[ad] ? P.attrHandle[ad](ag) : ag[ad] != null ? ag[ad] : ag.getAttribute(ad), ah = ab + "", af = ae[2], ac = ae[4];
                return ab == null ? af === "!=" : af === "=" ? ah === ac : af === "*=" ? ah.indexOf(ac) >= 0 : af === "~=" ? (" " + ah + " ").indexOf(ac) >= 0 : !ac ? ah && ab !== false : af === "!=" ? ah !== ac : af === "^=" ? ah.indexOf(ac) === 0 : af === "$=" ? ah.substr(ah.length - ac.length) === ac : af === "|=" ? ah === ac || ah.substr(0, ac.length + 1) === ac + "-" : false
            }, POS: function (af, ac, ad, ag) {
                var ab = ac[2], ae = P.setFilters[ab];
                if (ae) {
                    return ae(af, ad, ac, ag)
                }
            }}};
            if (L) {
                P.order.splice(1, 0, "CLASS");
                P.find.CLASS = function (ac, ad, ab) {
                    if (typeof ad.getElementsByClassName !== J && !ab) {
                        return ad.getElementsByClassName(ac[1])
                    }
                }
            }
            var w, i;
            if (q.compareDocumentPosition) {
                w = function (ac, ab) {
                    if (ac === ab) {
                        s = true;
                        return 0
                    }
                    if (!ac.compareDocumentPosition || !ab.compareDocumentPosition) {
                        return ac.compareDocumentPosition ? -1 : 1
                    }
                    return ac.compareDocumentPosition(ab) & 4 ? -1 : 1
                }
            } else {
                w = function (aj, ai) {
                    if (aj === ai) {
                        s = true;
                        return 0
                    } else {
                        if (aj.sourceIndex && ai.sourceIndex) {
                            return aj.sourceIndex - ai.sourceIndex
                        }
                    }
                    var ag, ac, ad = [], ab = [], af = aj.parentNode, ah = ai.parentNode, ak = af;
                    if (af === ah) {
                        return i(aj, ai)
                    } else {
                        if (!af) {
                            return -1
                        } else {
                            if (!ah) {
                                return 1
                            }
                        }
                    }
                    while (ak) {
                        ad.unshift(ak);
                        ak = ak.parentNode
                    }
                    ak = ah;
                    while (ak) {
                        ab.unshift(ak);
                        ak = ak.parentNode
                    }
                    ag = ad.length;
                    ac = ab.length;
                    for (var ae = 0; ae < ag && ae < ac; ae++) {
                        if (ad[ae] !== ab[ae]) {
                            return i(ad[ae], ab[ae])
                        }
                    }
                    return ae === ag ? i(aj, ab[ae], -1) : i(ad[ae], ai, 1)
                };
                i = function (ac, ab, ad) {
                    if (ac === ab) {
                        return ad
                    }
                    var ae = ac.nextSibling;
                    while (ae) {
                        if (ae === ab) {
                            return -1
                        }
                        ae = ae.nextSibling
                    }
                    return 1
                }
            }
            if (l.querySelectorAll) {
                (function () {
                    var af = Y, ae = "__sizzle__", ad = /^\s*[+~]/, ac = /'/g, ab = [];
                    Q(function (ag) {
                        ag.innerHTML = "<select><option selected></option></select>";
                        if (!ag.querySelectorAll("[selected]").length) {
                            ab.push("\\[[\\x20\\t\\n\\r\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
                        }
                        if (!ag.querySelectorAll(":checked").length) {
                            ab.push(":checked")
                        }
                    });
                    Q(function (ag) {
                        ag.innerHTML = "<p class=''></p>";
                        if (ag.querySelectorAll("[class^='']").length) {
                            ab.push("[*^$]=[\\x20\\t\\n\\r\\f]*(?:\"\"|'')")
                        }
                        ag.innerHTML = "<input type='hidden'>";
                        if (!ag.querySelectorAll(":enabled").length) {
                            ab.push(":enabled", ":disabled")
                        }
                    });
                    ab = ab.length && new RegExp(ab.join("|"));
                    Y = function (am, ah, an, ao, al) {
                        if (!ao && !al && (!ab || !ab.test(am))) {
                            if (ah.nodeType === 9) {
                                try {
                                    return A(ah.querySelectorAll(am), an)
                                } catch (ak) {
                                }
                            } else {
                                if (ah.nodeType === 1 && ah.nodeName.toLowerCase() !== "object") {
                                    var ai = ah, aj = ah.getAttribute("id"), ag = aj || ae, aq = ah.parentNode, ap = ad.test(am);
                                    if (!aj) {
                                        ah.setAttribute("id", ag)
                                    } else {
                                        ag = ag.replace(ac, "\\$&")
                                    }
                                    if (ap && aq) {
                                        ah = aq
                                    }
                                    try {
                                        if (!ap || aq) {
                                            return A(ah.querySelectorAll("[id='" + ag + "'] " + am), an)
                                        }
                                    } catch (ak) {
                                    } finally {
                                        if (!aj) {
                                            ai.removeAttribute("id")
                                        }
                                    }
                                }
                            }
                        }
                        return af(am, ah, an, ao, al)
                    }
                })()
            }
            function r(ad, al, ab, af) {
                var ac, ag, aj, ak, ai = v++, ae = 0, ah = al.length;
                if (typeof ab === "string" && !aa.test(ab)) {
                    ab = ab.toLowerCase();
                    ak = ab
                }
                for (; ae < ah; ae++) {
                    ac = al[ae];
                    if (ac) {
                        ag = false;
                        ac = ac[ad];
                        while (ac) {
                            if (ac[Z] === ai) {
                                ag = al[ac.sizset];
                                break
                            }
                            aj = ac.nodeType === 1;
                            if (aj && !af) {
                                ac[Z] = ai;
                                ac.sizset = ae
                            }
                            if (ak) {
                                if (ac.nodeName.toLowerCase() === ab) {
                                    ag = ac;
                                    break
                                }
                            } else {
                                if (aj) {
                                    if (typeof ab !== "string") {
                                        if (ac === ab) {
                                            ag = true;
                                            break
                                        }
                                    } else {
                                        if (O(ab, [ac]).length > 0) {
                                            ag = ac;
                                            break
                                        }
                                    }
                                }
                            }
                            ac = ac[ad]
                        }
                        al[ae] = ag
                    }
                }
            }

            var E = function (ad, ab, ah, ac) {
                var ag, aj = [], af = "", ak = ab.nodeType ? [ab] : ab, ae = 0, ai = ak.length;
                while ((ag = N.PSEUDO.exec(ad))) {
                    af += ag[0];
                    ad = ad.replace(N.PSEUDO, "")
                }
                if (P.relative[ad]) {
                    ad += "*"
                }
                for (; ae < ai; ae++) {
                    Y(ad, ak[ae], aj, ah, ac)
                }
                return O(af, aj)
            };
            X.Sizzle = f.sizzle = V;
            f.query.matches = function (ab, ac) {
                return Y(ab, l, [], ac, B(l))
            }
        }(window);
        f.dom.extend({ready: function () {
            var k = this, m, i = window.document;
            f._util_.isDomReady = false;
            f._util_._readyWait = 1;
            f.dom.holdReady = function (n) {
                if (n) {
                    f._util_.readyWait++
                } else {
                    h(true)
                }
            };
            var h = function (n) {
                if (n === true ? --f._util_.readyWait : f._util_.isDomReady) {
                    return
                }
                if (!i.body) {
                    return setTimeout(h, 1)
                }
                f._util_.isReady = true;
                if (n !== true && --f._util_.readyWait > 0) {
                    return
                }
                m.resolveWith(i);
                if (f.dom.trigger) {
                    f.dom(i).trigger("ready").off("ready")
                }
            };
            var j = function () {
                if (i.addEventListener) {
                    i.removeEventListener("DOMContentLoaded", j, false);
                    h()
                } else {
                    if (i.readyState === "complete") {
                        i.detachEvent("onreadystatechange", j);
                        h()
                    }
                }
            };
            var l = function (q) {
                if (!m) {
                    m = f.Deferred();
                    if (i.readyState === "complete") {
                        setTimeout(h, 1)
                    } else {
                        if (i.addEventListener) {
                            i.addEventListener("DOMContentLoaded", j, false);
                            window.addEventListener("load", h, false)
                        } else {
                            i.attachEvent("onreadystatechange", j);
                            window.attachEvent("onload", h);
                            var p = false;
                            try {
                                p = window.frameElement == null && i.documentElement
                            } catch (o) {
                            }
                            if (p && p.doScroll) {
                                (function n() {
                                    if (!f._util_.isDomReady) {
                                        try {
                                            p.doScroll("left")
                                        } catch (r) {
                                            return setTimeout(n, 50)
                                        }
                                        h()
                                    }
                                })()
                            }
                        }
                    }
                }
                return m.promise(q)
            };
            return function (n) {
                l().done(n);
                return k
            }
        }()});
        f.dom.extend({removeAttr: function (h) {
            this.each(function (i, j) {
                f._util_.removeAttr(j, h)
            });
            return this
        }});
        f.dom.extend({removeClass: function (k) {
            var j = typeof k, i = " ";
            if (!arguments.length) {
                f.forEach(this, function (l) {
                    l.className = ""
                })
            }
            if (j == "string") {
                k = f.string.trim(k);
                var h = k.split(" ");
                f.forEach(this, function (m) {
                    var n = m.className;
                    for (var l = 0; l < h.length; l++) {
                        while (~(i + n + i).indexOf(i + h[l] + i)) {
                            n = (i + n + i).replace(i + h[l] + i, i)
                        }
                    }
                    m.className = f.string.trim(n)
                })
            } else {
                if (j == "function") {
                    f.forEach(this, function (n, l, m) {
                        f.dom(n).removeClass(k.call(n, l, n.className))
                    })
                }
            }
            return this
        }});
        f.dom.extend({removeData: function () {
            var h = f.key, i = f.global("_maps_HTMLElementData");
            return function (j) {
                f.forEach(this, function (k) {
                    !k[h] && (k[h] = f.id())
                });
                f.forEach(this, function (l) {
                    var k = i[l[h]];
                    if (typeof j == "string") {
                        k && delete k[j]
                    } else {
                        if (f.type(j) == "array") {
                            f.forEach(j, function (m) {
                                k && delete k[m]
                            })
                        }
                    }
                });
                return this
            }
        }()});
        f.dom.extend({removeProp: function (h) {
            h = f._util_.propFixer[h] || h;
            this.each(function (i, j) {
                try {
                    j[h] = undefined;
                    delete j[h]
                } catch (k) {
                }
            });
            return this
        }});
        f._util_.smartScroll = function (k) {
            var h = {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}[k], l = k === "scrollLeft", i = {};

            function m(n) {
                return n && n.nodeType === 9
            }

            function j(n) {
                return f.type(n) == "Window" ? n : m(n) ? n.defaultView || n.parentWindow : false
            }

            return{get: function (n) {
                var o = j(n);
                return o ? (h in o) ? o[h] : f.browser.isStrict && o.document.documentElement[k] || o.document.body[k] : n[k]
            }, set: function (n, p) {
                if (!n) {
                    return
                }
                var o = j(n);
                o ? o.scrollTo(l ? p : this.get(n), !l ? p : this.get(n)) : n[k] = p
            }}
        };
        f.dom.extend({scrollLeft: function () {
            var h = f._util_.smartScroll("scrollLeft");
            return function (i) {
                i && f.check("^(?:number|string)$", "baidu.dom.scrollLeft");
                if (this.size() <= 0) {
                    return i === undefined ? 0 : this
                }
                return i === undefined ? h.get(this[0]) : h.set(this[0], i) || this
            }
        }()});
        f.dom.extend({scrollTop: function () {
            var h = f._util_.smartScroll("scrollTop");
            return function (i) {
                i && f.check("^(?:number|string)$", "baidu.dom.scrollTop");
                if (this.size() <= 0) {
                    return i === undefined ? 0 : this
                }
                return i === undefined ? h.get(this[0]) : h.set(this[0], i) || this
            }
        }()});
        f.dom.setPixel = function (i, h, j) {
            typeof j != "undefined" && (f.dom.g(i).style[h] = j + (!isNaN(j) ? "px" : ""))
        };
        f._util_.getDefaultDisplayValue = function () {
            var h = {};
            return function (j) {
                if (h[j]) {
                    return h[j]
                }
                var k = document.createElement(j), m, l, i;
                document.body.appendChild(k);
                m = f.dom(k).getCurrentStyle("display");
                document.body.removeChild(k);
                if (m === "" || m === "none") {
                    l = document.body.appendChild(document.createElement("iframe"));
                    l.frameBorder = l.width = l.height = 0;
                    i = (l.contentWindow || l.contentDocument).document;
                    i.writeln("<!DOCTYPE html><html><body>");
                    i.close();
                    k = i.appendChild(i.createElement(j));
                    m = f.dom(k).getCurrentStyle("display");
                    document.body.removeChild(l);
                    l = null
                }
                k = null;
                return h[j] = m
            }
        }();
        f.dom.extend({show: function () {
            var i = [], j, h;
            this.each(function (k, l) {
                if (!l.style) {
                    return
                }
                h = f.dom(l);
                j = l.style.display;
                i[k] = h.data("olddisplay");
                if (!i[k] && j === "none") {
                    l.style.display = ""
                }
                if (l.style.display === "" && f._util_.isHidden(l)) {
                    h.data("olddisplay", (i[k] = f._util_.getDefaultDisplayValue(l.nodeName)))
                }
            });
            return this.each(function (k, l) {
                if (!l.style) {
                    return
                }
                if (l.style.display === "none" || l.style.display === "") {
                    l.style.display = i[k] || ""
                }
            })
        }});
        f.dom.extend({siblings: function (h) {
            var i = [];
            f.forEach(this, function (l) {
                var k = [], m = [], j = l;
                while (j = j.previousSibling) {
                    j.nodeType == 1 && k.push(j)
                }
                while (l = l.nextSibling) {
                    l.nodeType == 1 && m.push(l)
                }
                f.merge(i, k.reverse().concat(m))
            });
            return this.pushStack(f.dom.match(i, h))
        }});
        f.dom.extend({slice: function () {
            var h = Array.prototype.slice;
            return function (j, i) {
                f.check("number(,number)?", "baidu.dom.slice");
                return this.pushStack(h.apply(this, arguments))
            }
        }()});
        f.dom.extend({text: function (m) {
            var l = f.dom, k = this, j = false, h;
            if (this.size() <= 0) {
                switch (typeof m) {
                    case"undefined":
                        return undefined;
                    default:
                        return k
                }
            }
            var i = function (r) {
                var q, o = "", p = 0, n = r.nodeType;
                if (n) {
                    if (n === 1 || n === 9 || n === 11) {
                        if (typeof r.textContent === "string") {
                            return r.textContent
                        } else {
                            for (r = r.firstChild; r; r = r.nextSibling) {
                                o += i(r)
                            }
                        }
                    } else {
                        if (n === 3 || n === 4) {
                            return r.nodeValue
                        }
                    }
                }
                return o
            };
            f.forEach(k, function (o, n) {
                var p = l(o);
                if (h) {
                    return
                }
                switch (typeof m) {
                    case"undefined":
                        h = i(o);
                        return h;
                    case"number":
                        m = String(m);
                    case"string":
                        j = true;
                        p.empty().append((o && o.ownerDocument || document).createTextNode(m));
                        break;
                    case"function":
                        j = true;
                        p.text(m.call(o, n, p.text()));
                        break
                }
            });
            return j ? k : h
        }});
        f.dom.extend({toggle: function () {
            for (var j = 0, h = this.size(); j < h; j++) {
                var k = this.eq(j);
                if (k.css("display") != "none") {
                    k.hide()
                } else {
                    k.show()
                }
            }
        }});
        f.dom.extend({toggleClass: function (k, i) {
            var j = typeof k;
            var i = (typeof i === "undefined") ? i : Boolean(i);
            if (arguments.length <= 0) {
                f.forEach(this, function (l) {
                    l.className = ""
                })
            }
            switch (typeof k) {
                case"string":
                    k = k.replace(/^\s+/g, "").replace(/\s+$/g, "").replace(/\s+/g, " ");
                    var h = k.split(" ");
                    f.forEach(this, function (m) {
                        var n = m.className;
                        for (var l = 0; l < h.length; l++) {
                            if ((~(" " + n + " ").indexOf(" " + h[l] + " ")) && (typeof i === "undefined")) {
                                n = (" " + n + " ").replace(" " + h[l] + " ", " ")
                            } else {
                                if ((!~(" " + n + " ").indexOf(" " + h[l] + " ")) && (typeof i === "undefined")) {
                                    n += " " + h[l]
                                } else {
                                    if ((!~(" " + n + " ").indexOf(" " + h[l] + " ")) && (i === true)) {
                                        n += " " + h[l]
                                    } else {
                                        if ((~(" " + n + " ").indexOf(" " + h[l] + " ")) && (i === false)) {
                                            n = n.replace(h[l], "")
                                        }
                                    }
                                }
                            }
                        }
                        m.className = n.replace(/^\s+/g, "").replace(/\s+$/g, "")
                    });
                    break;
                case"function":
                    f.forEach(this, function (m, l) {
                        f.dom(m).toggleClass(k.call(m, l, m.className), i)
                    });
                    break
            }
            return this
        }});
        void function (i) {
            if (i.mousewheel) {
                return
            }
            var h = /firefox/i.test(navigator.userAgent), j = /msie/i.test(navigator.userAgent);
            f.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (l, k) {
                i[l] = {bindType: k, pack: function (n) {
                    var m = f.dom.contains;
                    return function (p) {
                        var o = p.relatedTarget;
                        p.type = l;
                        if (!o || (o !== this && !m(this, o))) {
                            return n.apply(this, arguments)
                        }
                    }
                }}
            });
            if (!j) {
                f.each({focusin: "focus", focusout: "blur"}, function (l, k) {
                    i[l] = {bindType: k, attachElements: "textarea,select,input,button,a"}
                })
            }
            i.mousewheel = {bindType: h ? "DOMMouseScroll" : "mousewheel", pack: function (k) {
                return function (l) {
                    var m = l.originalEvent;
                    l.type = "mousewheel";
                    l.wheelDelta = l.wheelDelta || (h ? m.detail * -40 : m.wheelDelta) || 0;
                    return k.apply(this, arguments)
                }
            }}
        }(f.event.special);
        void function (i) {
            var h = i.queue;
            f.dom.extend({triggerHandler: function (l, k, j) {
                if (j && !j.triggerData) {
                    j.triggerData = k
                }
                f.forEach(this, function (m) {
                    h.call(m, l, undefined, j)
                });
                return this
            }})
        }(f._util_.eventBase);
        void function (i, m) {
            var p = m.special;
            var n = i.queue;
            var l = f.dom;
            var h = !window.addEventListener, o = /firefox/i.test(navigator.userAgent);
            var k = {submit: 3, focus: h ? 3 : 2, blur: h ? 3 : o ? 1 : 2};
            var r = function (u, v) {
                var x;
                if (document.createEvent) {
                    x = document.createEvent("HTMLEvents"), x.initEvent(u, true, true)
                } else {
                    if (document.createEventObject) {
                        x = document.createEventObject(), x.type = u
                    }
                }
                var t = {};
                if (v) {
                    for (var s in v) {
                        try {
                            x[s] = v[s]
                        } catch (w) {
                            if (!x.extraData) {
                                x.extraData = t
                            }
                            t[s] = v[s]
                        }
                    }
                }
                return x
            };
            var q = function (s, t, u) {
                if (s.dispatchEvent) {
                    return s.dispatchEvent(u)
                } else {
                    if (s.fireEvent) {
                        return s.fireEvent("on" + t, u)
                    }
                }
            };
            var j = function (w, z, t, v, y) {
                var A, u;
                if (A = r(z, v)) {
                    if (t) {
                        A.triggerData = t
                    }
                    if (y) {
                        n.call(w, z, null, A)
                    } else {
                        var s = w.window === window ? 3 : k[z];
                        try {
                            if (s & 1 || !(z in k)) {
                                u = q(w, z, A)
                            }
                        } catch (x) {
                            l(w).triggerHandler(z, t, A)
                        }
                        if (u !== false && s & 2) {
                            try {
                                if (w[z]) {
                                    w[z]()
                                }
                            } catch (x) {
                            }
                        }
                    }
                }
            };
            f.dom.extend({trigger: function (u, t, s) {
                var v;
                if (u in p) {
                    v = p[u]
                }
                this.each(function () {
                    j(this, u, t, s, v)
                });
                return this
            }})
        }(f._util_.eventBase, f.event);
        f.dom.extend({unbind: function (i, h) {
            return this.off(i, h)
        }});
        f.dom.extend({undelegate: function (h, j, i) {
            return this.off(j, h, i)
        }});
        f.dom.extend({unique: function (h) {
            return f.dom(f.array(this.toArray()).unique(h))
        }});
        f._util_.inArray = function (k, l, i) {
            if (!l) {
                return -1
            }
            var j = Array.prototype.indexOf, h;
            if (j) {
                return j.call(l, k, i)
            }
            h = l.length;
            i = i ? i < 0 ? Math.max(0, h + i) : i : 0;
            for (; i < h; i++) {
                if (i in l && l[i] === k) {
                    return i
                }
            }
            return -1
        };
        f.dom.extend({val: function () {
            f._util_.support.dom.select.disabled = true;
            var h = f._util_, k = h.support.dom.input.value === "on", i = !h.support.dom.opt.disabled, j = ["radio", "checkbox"], l = {option: {get: function (m) {
                var n = m.attributes.value;
                return !n || n.specified ? m.value : m.text
            }}, select: {get: function (t) {
                var u = t.options, p = t.selectedIndex, o = t.type === "select-one" || p < 0, r = o ? null : [], q = o ? p + 1 : u.length, n = p < 0 ? q : o ? p : 0, s, m;
                for (; n < q; n++) {
                    s = u[n];
                    if ((s.selected || n === p) && (i ? !s.disabled : s.getAttribute("disabled") === null) && (!s.parentNode.disabled || !h.nodeName(s.parentNode, "optgroup"))) {
                        m = f.dom(s).val();
                        if (o) {
                            return m
                        }
                        r.push(m)
                    }
                }
                return r
            }, set: function (o, n, p) {
                var m = f.makeArray(p);
                f.dom(o).find("option").each(function (q, r) {
                    r.selected = h.inArray(f.dom(this).val(), m) >= 0
                });
                !m.length && (o.selectedIndex = -1);
                return m
            }}};
            !h.support.getSetAttribute && (l.button = h.nodeHook);
            if (!k) {
                f.forEach(j, function (m) {
                    l[m] = {get: function (n) {
                        return n.getAttribute("value") === null ? "on" : n.value
                    }}
                })
            }
            f.forEach(j, function (m) {
                l[m] = l[m] || {};
                l[m].set = function (o, n, p) {
                    if (f.type(p) === "array") {
                        return(o.checked = h.inArray(f.dom(o).val(), p) >= 0)
                    }
                }
            });
            return function (o) {
                var n, m;
                if (o === undefined) {
                    if (!(n = this[0])) {
                        return
                    }
                    m = l[n.type] || l[n.nodeName.toLowerCase()] || {};
                    return m.get && m.get(n, "value") || n.value
                }
                this.each(function (p, q) {
                    if (q.nodeType !== 1) {
                        return
                    }
                    var r = f.dom(q), s = f.type(o) === "function" ? o.call(q, p, r.val()) : o;
                    if (s == null) {
                        s = ""
                    } else {
                        if (f.type(s) === "number") {
                            s += ""
                        } else {
                            if (f.type(s) === "array") {
                                s = f.array(s).map(function (t) {
                                    return t == null ? "" : t + ""
                                })
                            }
                        }
                    }
                    m = l[q.type] || l[q.nodeName.toLowerCase()] || {};
                    if (!m.set || m.set(q, "value", s) === undefined) {
                        q.value = s
                    }
                });
                return this
            }
        }()});
        f.dom.extend({width: function (h) {
            return f._util_.access(this, "width", h, function (m, k, n) {
                var j = n !== undefined, i = j && parseFloat(n), l = m != null && m == m.window ? "window" : (m.nodeType === 9 ? "document" : false);
                if (j && i < 0 || isNaN(i)) {
                    return
                }
                j && /^(?:\d*\.)?\d+$/.test(n += "") && (n += "px");
                return l ? f._util_.getWindowOrDocumentWidthOrHeight(m, l, k) : (j ? m.style.width = n : f._util_.getWidthOrHeight(m, k))
            })
        }});
        f.dom.extend({end: function () {
            return this.prevObject || f.dom(null)
        }});
        void function () {
            var h = ("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave mousewheel change select submit keydown keypress keyup error contextmenu").split(" ");
            var k = {};
            var n = function (i) {
                k[i] = function (o, l) {
                    if (l == null) {
                        l = o, o = null
                    }
                    return arguments.length > 0 ? this.on(i, null, o, l) : this.trigger(i)
                }
            };
            for (var m = 0, j = h.length; m < j; m++) {
                n(h[m])
            }
            f.dom.extend(k)
        }();
        f.createChain("fn", function (h) {
            return new f.fn.$Fn(~"function|string".indexOf(f.type(h)) ? h : function () {
            })
        }, function (h) {
            this.fn = h
        });
        f.fn.extend({bind: function (h) {
            var i = this.fn, j = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : null;
            return function () {
                var l = f.type(i) === "string" ? h[i] : i, k = j ? j.concat(Array.prototype.slice.call(arguments, 0)) : arguments;
                return l.apply(h || l, k)
            }
        }});
        f.fn.blank = function () {
        };
        f.fx = f.fx || {};
        f.lang.inherits = f.base.inherits;
        f.fx.Timeline = function (h) {
            f.lang.Class.call(this);
            this.interval = 16;
            this.duration = 500;
            this.dynamic = true;
            f.object.extend(this, h)
        };
        f.lang.inherits(f.fx.Timeline, f.lang.Class, "baidu.fx.Timeline").extend({launch: function () {
            var h = this;
            h.dispatchEvent("onbeforestart");
            typeof h.initialize == "function" && h.initialize();
            h["\x06btime"] = new Date().getTime();
            h["\x06etime"] = h["\x06btime"] + (h.dynamic ? h.duration : 0);
            h["\x06pulsed"]();
            return h
        }, "\x06pulsed": function () {
            var i = this;
            var h = new Date().getTime();
            i.percent = (h - i["\x06btime"]) / i.duration;
            i.dispatchEvent("onbeforeupdate");
            if (h >= i["\x06etime"]) {
                typeof i.render == "function" && i.render(i.transition(i.percent = 1));
                typeof i.finish == "function" && i.finish();
                i.dispatchEvent("onafterfinish");
                i.dispose();
                return
            }
            typeof i.render == "function" && i.render(i.transition(i.percent));
            i.dispatchEvent("onafterupdate");
            i["\x06timer"] = setTimeout(function () {
                i["\x06pulsed"]()
            }, i.interval)
        }, transition: function (h) {
            return h
        }, cancel: function () {
            this["\x06timer"] && clearTimeout(this["\x06timer"]);
            this["\x06etime"] = this["\x06btime"];
            typeof this.restore == "function" && this.restore();
            this.dispatchEvent("oncancel");
            this.dispose()
        }, end: function () {
            this["\x06timer"] && clearTimeout(this["\x06timer"]);
            this["\x06etime"] = this["\x06btime"];
            this["\x06pulsed"]()
        }});
        f.fx.create = function (k, i, j) {
            var l = new f.fx.Timeline(i);
            l.element = k;
            l.__type = j || l.__type;
            l["\x06original"] = {};
            var h = "baidu_current_effect";
            l.addEventListener("onbeforestart", function () {
                var n = this, m;
                n.attribName = "att_" + n.__type.replace(/\W/g, "_");
                m = n.element.getAttribute(h);
                n.element.setAttribute(h, (m || "") + "|" + n.guid + "|", 0);
                if (!n.overlapping) {
                    (m = n.element.getAttribute(n.attribName)) && baiduInstance(m).cancel();
                    n.element.setAttribute(n.attribName, n.guid, 0)
                }
            });
            l["\x06clean"] = function (o) {
                var n = this, m;
                if (o = n.element) {
                    o.removeAttribute(n.attribName);
                    m = o.getAttribute(h);
                    m = m.replace("|" + n.guid + "|", "");
                    if (!m) {
                        o.removeAttribute(h)
                    } else {
                        o.setAttribute(h, m, 0)
                    }
                }
            };
            l.addEventListener("oncancel", function () {
                this["\x06clean"]();
                this["\x06restore"]()
            });
            l.addEventListener("onafterfinish", function () {
                this["\x06clean"]();
                this.restoreAfterFinish && this["\x06restore"]()
            });
            l.protect = function (m) {
                this["\x06original"][m] = this.element.style[m]
            };
            l["\x06restore"] = function () {
                var q = this["\x06original"], p = this.element.style, m;
                for (var n in q) {
                    m = q[n];
                    if (typeof m == "undefined") {
                        continue
                    }
                    p[n] = m;
                    if (!m && p.removeAttribute) {
                        p.removeAttribute(n)
                    } else {
                        if (!m && p.removeProperty) {
                            p.removeProperty(n)
                        }
                    }
                }
            };
            return l
        };
        f.fx.current = function (k) {
            if (!(k = f.dom.g(k))) {
                return null
            }
            var h, m, l = /\|([^\|]+)\|/g;
            do {
                if (m = k.getAttribute("baidu_current_effect")) {
                    break
                }
            } while ((k = k.parentNode) && k.nodeType == 1);
            if (!m) {
                return null
            }
            if ((h = m.match(l))) {
                l = /\|([^\|]+)\|/;
                for (var j = 0; j < h.length; j++) {
                    l.test(h[j]);
                    h[j] = f._global_._instances[RegExp["\x241"]]
                }
            }
            return h
        };
        f.string.extend({formatColor: function () {
            var j = /^\#[\da-f]{6}$/i, i = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i, h = {black: "#000000", silver: "#c0c0c0", gray: "#808080", white: "#ffffff", maroon: "#800000", red: "#ff0000", purple: "#800080", fuchsia: "#ff00ff", green: "#008000", lime: "#00ff00", olive: "#808000", yellow: "#ffff0", navy: "#000080", blue: "#0000ff", teal: "#008080", aqua: "#00ffff"};
            return function () {
                var l = this.valueOf();
                if (j.test(l)) {
                    return l
                } else {
                    if (i.test(l)) {
                        for (var p, o = 1, l = "#"; o < 4; o++) {
                            p = parseInt(RegExp["\x24" + o]).toString(16);
                            l += ("00" + p).substr(p.length)
                        }
                        return l
                    } else {
                        if (/^\#[\da-f]{3}$/.test(l)) {
                            var n = l.charAt(1), m = l.charAt(2), k = l.charAt(3);
                            return"#" + n + n + m + m + k + k
                        } else {
                            if (h[l]) {
                                return h[l]
                            }
                        }
                    }
                }
                return""
            }
        }()});
        f.fx.move = function (i, h) {
            if (!(i = f.dom.g(i)) || f.dom.getStyle(i, "position") == "static") {
                return null
            }
            h = f.object.extend({x: 0, y: 0}, h || {});
            if (h.x == 0 && h.y == 0) {
                return null
            }
            var j = f.fx.create(i, f.object.extend({initialize: function () {
                this.protect("top");
                this.protect("left");
                this.originX = parseInt(f.dom.getStyle(i, "left")) || 0;
                this.originY = parseInt(f.dom.getStyle(i, "top")) || 0
            }, transition: function (k) {
                return 1 - Math.pow(1 - k, 2)
            }, render: function (k) {
                i.style.top = (this.y * k + this.originY) + "px";
                i.style.left = (this.x * k + this.originX) + "px"
            }}, h), "baidu.fx.move");
            return j.launch()
        };
        f.fx.moveTo = function (k, i, j) {
            if (!(k = f.dom.g(k)) || f.dom.getStyle(k, "position") == "static" || typeof i != "object") {
                return null
            }
            var m = [i[0] || i.x || 0, i[1] || i.y || 0];
            var h = parseInt(f.dom.getStyle(k, "left")) || 0;
            var n = parseInt(f.dom.getStyle(k, "top")) || 0;
            var l = f.fx.move(k, f.object.extend({x: m[0] - h, y: m[1] - n}, j || {}));
            return l
        };
        f.fx.scrollBy = function (i, m, h) {
            if (!(i = f.dom.g(i)) || typeof m != "object") {
                return null
            }
            var l = {}, k = {};
            l.x = m[0] || m.x || 0;
            l.y = m[1] || m.y || 0;
            var j = f.fx.create(i, f.object.extend({initialize: function () {
                var o = k.sTop = i.scrollTop;
                var n = k.sLeft = i.scrollLeft;
                k.sx = Math.min(i.scrollWidth - i.clientWidth - n, l.x);
                k.sy = Math.min(i.scrollHeight - i.clientHeight - o, l.y)
            }, transition: function (n) {
                return 1 - Math.pow(1 - n, 2)
            }, render: function (n) {
                i.scrollTop = (k.sy * n + k.sTop);
                i.scrollLeft = (k.sx * n + k.sLeft)
            }, restore: function () {
                i.scrollTop = k.sTop;
                i.scrollLeft = k.sLeft
            }}, h), "baidu.fx.scroll");
            return j.launch()
        };
        f.fx.scrollTo = function (j, h, i) {
            if (!(j = f.dom.g(j)) || typeof h != "object") {
                return null
            }
            var k = {};
            k.x = (h[0] || h.x || 0) - j.scrollLeft;
            k.y = (h[1] || h.y || 0) - j.scrollTop;
            return f.fx.scrollBy(j, k, i)
        };
        f._util_.smartAjax = f._util_.smartAjax || function (h) {
            return function (i, k, l, j) {
                if (f.type(k) === "function") {
                    j = j || l;
                    l = k;
                    k = undefined
                }
                f.ajax({type: h, url: i, data: k, success: l, dataType: j})
            }
        };
        f.get = f.get || f._util_.smartAjax("get");
        f.global.get = function (h) {
            return f.global(h)
        };
        f.global.set = function (i, j, h) {
            return f.global(i, j, !h)
        };
        f.global.getZIndex = function (h, j) {
            var i = f.global.get("zIndex");
            if (h) {
                i[h] = i[h] + (j || 1)
            }
            return i[h]
        };
        f.global.set("zIndex", {popup: 50000, dialog: 1000}, true);
        f.i18n = f.i18n || {};
        f.i18n.cultures = f.i18n.cultures || {};
        f.i18n.cultures["zh-CN"] = f.object.extend(f.i18n.cultures["zh-CN"] || {}, function () {
            var h = "%u4E00,%u4E8C,%u4E09,%u56DB,%u4E94,%u516D,%u4E03,%u516B,%u4E5D,%u5341".split(",");
            return{calendar: {dateFormat: "yyyy-MM-dd", titleNames: "#{yyyy}" + unescape("%u5E74") + "&nbsp;#{MM}" + unescape("%u6708"), monthNamesShort: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], monthNames: function () {
                var j = h.length, k = [];
                for (var l = 0; l < 12; l++) {
                    k.push(unescape(h[l] || h[j - 1] + h[l - j]))
                }
                return k
            }(), dayNames: function () {
                var k = {mon: 0, tue: 1, wed: 2, thu: 3, fri: 4, sat: 5, sun: "%u65E5"};
                for (var j in k) {
                    k[j] = unescape(h[k[j]] || k[j])
                }
                return k
            }()}, timeZone: 8, whitespace: new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g"), number: {group: ",", groupLength: 3, decimal: ".", positive: "", negative: "-", _format: function (j, i) {
                return f.i18n.number._format(j, {group: this.group, groupLength: this.groupLength, decimal: this.decimal, symbol: i ? this.negative : this.positive})
            }}, currency: {symbol: unescape("%uFFE5")}, language: function () {
                var j = {ok: "%u786E%u5B9A", cancel: "%u53D6%u6D88", signin: "%u6CE8%u518C", signup: "%u767B%u5F55"};
                for (var k in j) {
                    j[k] = unescape(j[k])
                }
                return j
            }()}
        }());
        f.i18n.currentLocale = "zh-CN";
        f.i18n.date = f.i18n.date || {getDaysInMonth: function (h, i) {
            var j = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (i == 1 && f.i18n.date.isLeapYear(h)) {
                return 29
            }
            return j[i]
        }, isLeapYear: function (h) {
            return !(h % 400) || (!(h % 4) && !!(h % 100))
        }, toLocaleDate: function (i, h, j) {
            return this._basicDate(i, h, j || f.i18n.currentLocale)
        }, _basicDate: function (m, j, o) {
            var h = f.i18n.cultures[o || f.i18n.currentLocale].timeZone, n = h * 60, i, k, l = m.getTime();
            if (j) {
                i = f.i18n.cultures[j].timeZone;
                k = i * 60
            } else {
                k = -1 * m.getTimezoneOffset();
                i = k / 60
            }
            return new Date(i != h ? (l + (n - k) * 60000) : l)
        }, format: function (h, i) {
            var j = f.i18n.cultures[i || f.i18n.currentLocale];
            return f.date.format(f.i18n.date.toLocaleDate(h, "", i), j.calendar.dateFormat)
        }};
        f.isDate = function (h) {
            return f.type(h) == "date" && h.toString() != "Invalid Date" && !isNaN(h)
        };
        f.isDocument = function (h) {
            return f.type(h) == "Document"
        };
        f.isElement = function (h) {
            return f.type(h) == "HTMLElement"
        };
        f.isNumber = function (h) {
            return f.type(h) == "number" && isFinite(h)
        };
        f.isObject = function (h) {
            return typeof h === "function" || (typeof h === "object" && h != null)
        };
        f.isPlainObject = function (j) {
            var h, i = Object.prototype.hasOwnProperty;
            if (f.type(j) != "object") {
                return false
            }
            if (j.constructor && !i.call(j, "constructor") && !i.call(j.constructor.prototype, "isPrototypeOf")) {
                return false
            }
            for (h in j) {
                break
            }
            if (j.item && typeof j.length == "number") {
                return false
            }
            return h === undefined || i.call(j, h)
        };
        f.isWindow = function (h) {
            return f.type(h) == "Window"
        };
        f.json = f.json || {};
        f.json.parse = function (h) {
            return(new Function("return (" + h + ")"))()
        };
        f.json.stringify = (function () {
            var i = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"};

            function h(m) {
                if (/["\\\x00-\x1f]/.test(m)) {
                    m = m.replace(/["\\\x00-\x1f]/g, function (n) {
                        var o = i[n];
                        if (o) {
                            return o
                        }
                        o = n.charCodeAt();
                        return"\\u00" + Math.floor(o / 16).toString(16) + (o % 16).toString(16)
                    })
                }
                return'"' + m + '"'
            }

            function k(r) {
                var n = ["["], o = r.length, m, p, q;
                for (p = 0; p < o; p++) {
                    q = r[p];
                    switch (typeof q) {
                        case"undefined":
                        case"function":
                        case"unknown":
                            break;
                        default:
                            if (m) {
                                n.push(",")
                            }
                            n.push(f.json.stringify(q));
                            m = 1
                    }
                }
                n.push("]");
                return n.join("")
            }

            function j(m) {
                return m < 10 ? "0" + m : m
            }

            function l(m) {
                return'"' + m.getFullYear() + "-" + j(m.getMonth() + 1) + "-" + j(m.getDate()) + "T" + j(m.getHours()) + ":" + j(m.getMinutes()) + ":" + j(m.getSeconds()) + '"'
            }

            return function (r) {
                switch (typeof r) {
                    case"undefined":
                        return"undefined";
                    case"number":
                        return isFinite(r) ? String(r) : "null";
                    case"string":
                        return h(r);
                    case"boolean":
                        return String(r);
                    default:
                        if (r === null) {
                            return"null"
                        } else {
                            if (f.type(r) === "array") {
                                return k(r)
                            } else {
                                if (f.type(r) === "date") {
                                    return l(r)
                                } else {
                                    var n = ["{"], q = f.json.stringify, m, p;
                                    for (var o in r) {
                                        if (Object.prototype.hasOwnProperty.call(r, o)) {
                                            p = r[o];
                                            switch (typeof p) {
                                                case"undefined":
                                                case"unknown":
                                                case"function":
                                                    break;
                                                default:
                                                    if (m) {
                                                        n.push(",")
                                                    }
                                                    m = 1;
                                                    n.push(q(o) + ":" + q(p))
                                            }
                                        }
                                    }
                                    n.push("}");
                                    return n.join("")
                                }
                            }
                        }
                }
            }
        })();
        f.lang.createClass = f.createClass;
        f.lang.guid = function () {
            return f.id()
        };
        f.lang.isArray = f.isArray;
        f.lang.isDate = f.isDate;
        f.lang.isElement = f.isElement;
        f.lang.isObject = f.isObject;
        f.lang.isString = f.isString;
        f.lang.register = f.base.register;
        f.lang.toArray = function (i) {
            if (i === null || i === undefined) {
                return[]
            }
            if (f.lang.isArray(i)) {
                return i
            }
            if (typeof i.length !== "number" || typeof i === "string" || f.lang.isFunction(i)) {
                return[i]
            }
            if (i.item) {
                var h = i.length, j = new Array(h);
                while (h--) {
                    j[h] = i[h]
                }
                return j
            }
            return[].slice.call(i)
        };
        f.number.extend({comma: function (h) {
            var i = this;
            if (!h || h < 1) {
                h = 3
            }
            i = String(i).split(".");
            i[0] = i[0].replace(new RegExp("(\\d)(?=(\\d{" + h + "})+$)", "ig"), "$1,");
            return i.join(".")
        }});
        f.number.randomInt = function (i, h) {
            return Math.floor(Math.random() * (h - i + 1) + i)
        };
        f.object.clone = function (m) {
            var j = m, k, h;
            if (!m || m instanceof Number || m instanceof String || m instanceof Boolean) {
                return j
            } else {
                if (f.lang.isArray(m)) {
                    j = [];
                    var l = 0;
                    for (k = 0, h = m.length; k < h; k++) {
                        j[l++] = f.object.clone(m[k])
                    }
                } else {
                    if (f.object.isPlain(m)) {
                        j = {};
                        for (k in m) {
                            if (m.hasOwnProperty(k)) {
                                j[k] = f.object.clone(m[k])
                            }
                        }
                    }
                }
            }
            return j
        };
        f.object.each = function (l, j) {
            var i, h, k;
            if ("function" == typeof j) {
                for (h in l) {
                    if (l.hasOwnProperty(h)) {
                        k = l[h];
                        i = j.call(l, k, h);
                        if (i === false) {
                            break
                        }
                    }
                }
            }
            return l
        };
        f.object.isEmpty = function (j) {
            var h = true;
            if ("[object Array]" === Object.prototype.toString.call(j)) {
                h = !j.length
            } else {
                j = new Object(j);
                for (var i in j) {
                    return false
                }
            }
            return h
        };
        f.object.keys = function (l) {
            var h = [], j = 0, i;
            for (i in l) {
                if (l.hasOwnProperty(i)) {
                    h[j++] = i
                }
            }
            return h
        };
        f.object.map = function (k, j) {
            var i = {};
            for (var h in k) {
                if (k.hasOwnProperty(h)) {
                    i[h] = j(k[h], h)
                }
            }
            return i
        };
        f.object.merge = function () {
            function i(j) {
                return f.lang.isObject(j) && !f.lang.isFunction(j)
            }

            function h(n, m, l, k, j) {
                if (m.hasOwnProperty(l)) {
                    if (j && i(n[l])) {
                        f.object.merge(n[l], m[l], {overwrite: k, recursive: j})
                    } else {
                        if (k || !(l in n)) {
                            n[l] = m[l]
                        }
                    }
                }
            }

            return function (o, j, q) {
                var l = 0, r = q || {}, n = r.overwrite, p = r.whiteList, k = r.recursive, m;
                if (p && p.length) {
                    m = p.length;
                    for (; l < m; ++l) {
                        h(o, j, p[l], n, k)
                    }
                } else {
                    for (l in j) {
                        h(o, j, l, n, k)
                    }
                }
                return o
            }
        }();
        f.object.values = function (l) {
            var h = [], j = 0, i;
            for (i in l) {
                if (l.hasOwnProperty(i)) {
                    h[j++] = l[i]
                }
            }
            return h
        };
        f.page.getHeight = function () {
            var k = document, h = k.body, j = k.documentElement, i = k.compatMode == "BackCompat" ? h : k.documentElement;
            return Math.max(j.scrollHeight, h.scrollHeight, i.clientHeight)
        };
        f.page.getViewHeight = function () {
            var i = document, j = f.browser.ie || 1, h = i.compatMode === "BackCompat" && j < 9 ? i.body : i.documentElement;
            return h.clientHeight
        };
        f.page.getViewWidth = function () {
            var i = document, h = i.compatMode == "BackCompat" ? i.body : i.documentElement;
            return h.clientWidth
        };
        f.page.getWidth = function () {
            var k = document, h = k.body, j = k.documentElement, i = k.compatMode == "BackCompat" ? h : k.documentElement;
            return Math.max(j.scrollWidth, h.scrollWidth, i.clientWidth)
        };
        f.platform = f.platform || function () {
            var i = navigator.userAgent, h = function () {
            };
            f.forEach("Android iPad iPhone Linux Macintosh Windows X11".split(" "), function (k) {
                var j = k.charAt(0).toUpperCase() + k.toLowerCase().substr(1);
                f["is" + j] = h["is" + j] = !!~i.indexOf(k)
            });
            return h
        }();
        f.plugin = function (l, m, k, j) {
            var h = f.isPlainObject(m), i;
            if (!h) {
                j = k;
                k = m
            }
            f.type(k) != "function" && (k = undefined);
            f.type(j) != "function" && (j = undefined);
            i = f.createChain(l, k, j);
            h && i.extend(m);
            return i
        };
        f.post = f.post || f._util_.smartAjax("post");
        f.setBack = function (i, h) {
            i._back_ = h;
            i.getBack = function () {
                return this._back_
            };
            return i
        };
        f.createChain("sio", function (h) {
            switch (typeof h) {
                case"string":
                    return new f.sio.$Sio(h)
            }
        }, function (h) {
            this.url = h
        });
        f.sio._createScriptTag = function (i, h, j) {
            i.setAttribute("type", "text/javascript");
            j && i.setAttribute("charset", j);
            i.setAttribute("src", h);
            document.getElementsByTagName("head")[0].appendChild(i)
        };
        f.sio._removeScriptTag = function (i) {
            if (i.clearAttributes) {
                i.clearAttributes()
            } else {
                for (var h in i) {
                    if (i.hasOwnProperty(h)) {
                        delete i[h]
                    }
                }
            }
            if (i && i.parentNode) {
                i.parentNode.removeChild(i)
            }
            i = null
        };
        f.sio.extend({callByBrowser: function (n, p) {
            var h = this.url;
            var k = document.createElement("SCRIPT"), l = 0, q = p || {}, j = q.charset, o = n || function () {
            }, m = q.timeOut || 0, i;
            k.onload = k.onreadystatechange = function () {
                if (l) {
                    return
                }
                var r = k.readyState;
                if ("undefined" == typeof r || r == "loaded" || r == "complete") {
                    l = 1;
                    try {
                        o();
                        clearTimeout(i)
                    } finally {
                        k.onload = k.onreadystatechange = null;
                        f.sio._removeScriptTag(k)
                    }
                }
            };
            if (m) {
                i = setTimeout(function () {
                    k.onload = k.onreadystatechange = null;
                    f.sio._removeScriptTag(k);
                    q.onfailure && q.onfailure()
                }, m)
            }
            f.sio._createScriptTag(k, h, j)
        }});
        f.sio.extend({callByServer: function (t, u) {
            var h = this.url;
            var p = document.createElement("SCRIPT"), o = "bd__cbs__", r, l, v = u || {}, k = v.charset, m = v.queryField || "callback", s = v.timeOut || 0, i, j = new RegExp("(\\?|&)" + m + "=([^&]*)"), n;
            if (f.lang.isFunction(t)) {
                r = o + Math.floor(Math.random() * 2147483648).toString(36);
                window[r] = q(0)
            } else {
                if (f.lang.isString(t)) {
                    r = t
                } else {
                    if (n = j.exec(h)) {
                        r = n[2]
                    }
                }
            }
            if (s) {
                i = setTimeout(q(1), s)
            }
            h = h.replace(j, "\x241" + m + "=" + r);
            if (h.search(j) < 0) {
                h += (h.indexOf("?") < 0 ? "?" : "&") + m + "=" + r
            }
            f.sio._createScriptTag(p, h, k);
            function q(w) {
                return function () {
                    try {
                        if (w) {
                            v.onfailure && v.onfailure()
                        } else {
                            t.apply(window, arguments);
                            clearTimeout(i)
                        }
                        window[r] = null;
                        delete window[r]
                    } catch (x) {
                    } finally {
                        f.sio._removeScriptTag(p)
                    }
                }
            }
        }});
        f.sio.extend({log: function () {
            var i = this.url;
            var h = new Image(), j = "tangram_sio_log_" + Math.floor(Math.random() * 2147483648).toString(36);
            window[j] = h;
            h.onload = h.onerror = h.onabort = function () {
                h.onload = h.onerror = h.onabort = null;
                window[j] = null;
                h = null
            };
            h.src = i
        }});
        f.string.extend({decodeHTML: function () {
            var h = this.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
            return h.replace(/&#([\d]+);/g, function (j, i) {
                return String.fromCharCode(parseInt(i, 10))
            })
        }});
        f.string.extend({encodeHTML: function () {
            return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        }});
        f.string.extend({format: function (h) {
            var j = this.valueOf(), i = Array.prototype.slice.call(arguments, 0), k = Object.prototype.toString;
            if (i.length) {
                i = i.length == 1 ? (h !== null && (/\[object Array\]|\[object Object\]/.test(k.call(h))) ? h : i) : i;
                return j.replace(/#\{(.+?)\}/g, function (l, n) {
                    var m = i[n];
                    if ("[object Function]" == k.call(m)) {
                        m = m(n)
                    }
                    return("undefined" == typeof m ? "" : m)
                })
            }
            return j
        }});
        f.string.extend({getByteLength: function () {
            return this.replace(/[^\x00-\xff]/g, "ci").length
        }});
        f.string.extend({stripTags: function () {
            return(this || "").replace(/<[^>]+>/g, "")
        }});
        f.string.extend({subByte: function (h, i) {
            f.check("number(,string)?$", "baidu.string.subByte");
            if (h < 0 || this.getByteLength() <= h) {
                return this.valueOf()
            }
            var j = this.substr(0, h).replace(/([^\x00-\xff])/g, "\x241 ").substr(0, h).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "\x241");
            return j + (i || "")
        }});
        f.string.extend({toHalfWidth: function () {
            return this.replace(/[\uFF01-\uFF5E]/g,function (h) {
                return String.fromCharCode(h.charCodeAt(0) - 65248)
            }).replace(/\u3000/g, " ")
        }});
        f.string.extend({wbr: function () {
            return this.replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi, "$&<wbr>").replace(/><wbr>/g, ">")
        }});
        f.swf = f.swf || {};
        f.swf.version = (function () {
            var o = navigator;
            if (o.plugins && o.mimeTypes.length) {
                var k = o.plugins["Shockwave Flash"];
                if (k && k.description) {
                    return k.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
                }
            } else {
                if (window.ActiveXObject && !window.opera) {
                    for (var j = 12; j >= 2; j--) {
                        try {
                            var m = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + j);
                            if (m) {
                                var h = m.GetVariable("$version");
                                return h.replace(/WIN/g, "").replace(/,/g, ".")
                            }
                        } catch (l) {
                        }
                    }
                }
            }
        })();
        f.swf.createHTML = function (z) {
            z = z || {};
            var r = f.swf.version, p = z.ver || "6.0.0", o, m, n, l, q, y, h = {}, v = f.string.encodeHTML;
            for (l in z) {
                h[l] = z[l]
            }
            z = h;
            if (r) {
                r = r.split(".");
                p = p.split(".");
                for (n = 0; n < 3; n++) {
                    o = parseInt(r[n], 10);
                    m = parseInt(p[n], 10);
                    if (m < o) {
                        break
                    } else {
                        if (m > o) {
                            return""
                        }
                    }
                }
            } else {
                return""
            }
            var t = z.vars, s = ["classid", "codebase", "id", "width", "height", "align"];
            z.align = z.align || "middle";
            z.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
            z.codebase = "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0";
            z.movie = z.url || "";
            delete z.vars;
            delete z.url;
            if ("string" == typeof t) {
                z.flashvars = t
            } else {
                var w = [];
                for (l in t) {
                    y = t[l];
                    w.push(l + "=" + encodeURIComponent(y))
                }
                z.flashvars = w.join("&")
            }
            var u = ["<object "];
            for (n = 0, q = s.length; n < q; n++) {
                y = s[n];
                u.push(" ", y, '="', v(z[y]), '"')
            }
            u.push(">");
            var j = {wmode: 1, scale: 1, quality: 1, play: 1, loop: 1, menu: 1, salign: 1, bgcolor: 1, base: 1, allowscriptaccess: 1, allownetworking: 1, allowfullscreen: 1, seamlesstabbing: 1, devicefont: 1, swliveconnect: 1, flashvars: 1, movie: 1};
            for (l in z) {
                y = z[l];
                l = l.toLowerCase();
                if (j[l] && (y || y === false || y === 0)) {
                    u.push('<param name="' + l + '" value="' + v(y) + '" />')
                }
            }
            z.src = z.movie;
            z.name = z.id;
            delete z.id;
            delete z.movie;
            delete z.classid;
            delete z.codebase;
            z.type = "application/x-shockwave-flash";
            z.pluginspage = "http://www.macromedia.com/go/getflashplayer";
            u.push("<embed");
            var x;
            for (l in z) {
                y = z[l];
                if (y || y === false || y === 0) {
                    if ((new RegExp("^salign\x24", "i")).test(l)) {
                        x = y;
                        continue
                    }
                    u.push(" ", l, '="', v(y), '"')
                }
            }
            if (x) {
                u.push(' salign="', v(x), '"')
            }
            u.push("></embed></object>");
            return u.join("")
        };
        f.swf.create = function (h, j) {
            h = h || {};
            var i = f.swf.createHTML(h) || h.errorMessage || "";
            if (j && "string" == typeof j) {
                j = document.getElementById(j)
            }
            f.dom.insertHTML(j || document.body, "beforeEnd", i)
        };
        f.swf.getMovie = function (j) {
            var h = document[j], i;
            return f.browser.ie == 9 ? h && h.length ? (i = f.array.remove(f.lang.toArray(h), function (k) {
                return k.tagName.toLowerCase() != "embed"
            })).length == 1 ? i[0] : i : h : h || window[j]
        };
        f.swf.Proxy = function (m, j, k) {
            var i = this, h = this._flash = f.swf.getMovie(m), l;
            if (!j) {
                return this
            }
            l = setInterval(function () {
                try {
                    if (h[j]) {
                        i._initialized = true;
                        clearInterval(l);
                        if (k) {
                            k()
                        }
                    }
                } catch (n) {
                }
            }, 100)
        };
        f.swf.Proxy.prototype.getFlash = function () {
            return this._flash
        };
        f.swf.Proxy.prototype.isReady = function () {
            return !!this._initialized
        };
        f.swf.Proxy.prototype.call = function (h, l) {
            try {
                var j = this.getFlash(), i = Array.prototype.slice.call(arguments);
                i.shift();
                if (j[h]) {
                    j[h].apply(j, i)
                }
            } catch (k) {
            }
        };
        (function (h) {
            var i = document.createElement("div");
            h.inlineBlockNeedsLayout = false;
            h.shrinkWrapBlocks = false;
            f(document).ready(function () {
                var j = document.body, k = document.createElement("div");
                k.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
                j.appendChild(k).appendChild(i);
                if (typeof i.style.zoom !== "undefined") {
                    i.style.cssText = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;width:1px;padding:1px;display:inline;zoom:1";
                    h.inlineBlockNeedsLayout = (i.offsetWidth === 3);
                    i.style.display = "block";
                    i.innerHTML = "<div></div>";
                    i.firstChild.style.width = "5px";
                    h.shrinkWrapBlocks = (i.offsetWidth !== 3)
                }
                j.removeChild(k);
                k = i = j = null
            })
        })(f._util_.support);
        return f
    }();
    a = b;
    return a
}, []);
F.module("/browse_static/common/ui/baidutemplate/baidutemplate.js", function (c, a) {
    var b = {};
    b.template = function (g, f) {
        var e = (function () {
            if (!window.document) {
                return bt._compile(g)
            }
            var i = document.getElementById(g);
            if (i) {
                if (bt.cache[g]) {
                    return bt.cache[g]
                }
                var h = /^(textarea|input)$/i.test(i.nodeName) ? i.value : i.innerHTML;
                return bt._compile(h)
            } else {
                return bt._compile(g)
            }
        })();
        var d = bt._isObject(f) ? e(f) : e;
        e = null;
        return d
    };
    bt = b.template;
    bt.versions = bt.versions || [];
    bt.versions.push("1.0.6");
    bt.cache = {};
    bt.LEFT_DELIMITER = bt.LEFT_DELIMITER || "<%";
    bt.RIGHT_DELIMITER = bt.RIGHT_DELIMITER || "%>";
    bt.ESCAPE = true;
    bt._encodeHTML = function (d) {
        return String(d).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\\/g, "&#92;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
    };
    bt._encodeReg = function (d) {
        return String(d).replace(/([.*+?^=!:${}()|[\]/\\])/
        g, "\\$1"
        )
    };
    bt._encodeEventHTML = function (d) {
        return String(d).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\\\\/g, "\\").replace(/\\\//g, "/").replace(/\\n/g, "\n").replace(/\\r/g, "\r")
    };
    bt._compile = function (e) {
        var d = "var _template_fun_array=[];\nvar fn=(function(data){\nvar _template_varName='';\nfor(name in data){\n_template_varName+=('var '+name+'=data[\"'+name+'\"];');\n};\neval(_template_varName);\n_template_fun_array.push('" + bt._analysisStr(e) + "');\n_template_varName=null;\n})(_template_object);\nfn = null;\nreturn _template_fun_array.join('');\n";
        return new Function("_template_object", d)
    };
    bt._isObject = function (d) {
        return"function" === typeof d || !!(d && "object" === typeof d)
    };
    bt._analysisStr = function (f) {
        var d = bt.LEFT_DELIMITER;
        var h = bt.RIGHT_DELIMITER;
        var e = bt._encodeReg(d);
        var g = bt._encodeReg(h);
        f = String(f).replace(new RegExp("(" + e + "[^" + g + "]*)//.*\n", "g"), "$1").replace(new RegExp("<!--.*?-->", "g"), "").replace(new RegExp(e + "\\*.*?\\*" + g, "g"), "").replace(new RegExp("[\\r\\t\\n]", "g"), "").replace(new RegExp(e + "(?:(?!" + g + ")[\\s\\S])*" + g + "|((?:(?!" + e + ")[\\s\\S])+)", "g"), function (j, i) {
            var k = "";
            if (i) {
                k = i.replace(/\\/g, "&#92;").replace(/'/g, "&#39;");
                while (/<[^<]*?&#39;[^<]*?>/g.test(k)) {
                    k = k.replace(/(<[^<]*?)&#39;([^<]*?>)/g, "$1\r$2")
                }
            } else {
                k = j
            }
            return k
        });
        f = f.replace(new RegExp("(" + e + "[\\s]*?var[\\s]*?.*?[\\s]*?[^;])[\\s]*?" + g, "g"), "$1;" + h).replace(new RegExp("(" + e + ":?[hvu]?[\\s]*?=[\\s]*?[^;|" + g + "]*?);[\\s]*?" + g, "g"), "$1" + h).split(d).join("\t");
        if (bt.ESCAPE) {
            f = f.replace(new RegExp("\\t=(.*?)" + g, "g"), "',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'")
        } else {
            f = f.replace(new RegExp("\\t=(.*?)" + g, "g"), "',typeof($1) === 'undefined'?'':$1,'")
        }
        f = f.replace(new RegExp("\\t:h=(.*?)" + g, "g"), "',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'").replace(new RegExp("\\t(?::=|-)(.*?)" + g, "g"), "',typeof($1)==='undefined'?'':$1,'").replace(new RegExp("\\t:u=(.*?)" + g, "g"), "',typeof($1)==='undefined'?'':encodeURIComponent($1),'").replace(new RegExp("\\t:v=(.*?)" + g, "g"), "',typeof($1)==='undefined'?'':baidu.template._encodeEventHTML($1),'").split("\t").join("');").split(h).join("_template_fun_array.push('").split("\r").join("\\'");
        return f
    };
    a = b;
    return a
}, []);
F.module("/browse_static/common/ui/magic/_query/_query.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    d._query = function (k, h) {
        if (/^\./.test(k)) {
            var g = h.getElementsByTagName("*");
            var j = d._query;
            if (/\x20/.test(k)) {
                k = k.split(" ");
                h = j(k[0], h)[0];
                return j(k.slice(1).join(" "), h)
            } else {
                var m = k.slice(1);
                for (var f = 0, e = g.length; f < e; f++) {
                    if (~g[f].className.indexOf(m)) {
                        return[g[f]]
                    }
                }
            }
        } else {
            if (/^\w+$/.test(k)) {
                var g = h.getElementsByTagName(k);
                return g
            }
        }
    };
    a = d._query;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js"]);
F.module("/browse_static/common/ui/magic/Tab/Tab.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/control/Tab/Tab.js");
    d.Tab = b.lang.createClass(function (e) {
        var f = this;
        f._items = e.items || []
    }, {type: "magic.Tab", superClass: d.control.Tab}).extend({tplTitle: '<li class="#{titleClass}"><a href="#" onclick="return false" hidefocus="true"><span>#{content}</span></a></li>', tplBody: '<div class="#{bodyClass}">#{content}</div>', toHTMLString: function () {
        var g = this, f = '<ul class="#{titleClass}">#{titleContent}</ul><div class="#{bodyClass}">#{bodyContent}</div>', e = [], h = [];
        b.array.each(g._items, function (j, i) {
            e.push(b.string.format(g.tplTitle, {titleClass: "tang-title-item" + (g._selectedIndex == i ? " tang-title-item-selected" : ""), content: j.title}));
            h.push(b.string.format(g.tplBody, {bodyClass: "tang-body-item" + (g._selectedIndex == i ? " tang-body-item-selected" : ""), content: j.content}))
        });
        return b.string.format(f, {titleClass: "tang-title", titleContent: e.join(""), bodyClass: "tang-body", bodyContent: h.join("")})
    }, render: function (g) {
        var f = this, e;
        if (f.getElement()) {
            return
        }
        f.mappingDom("", b.dom.g(g) || document.body);
        e = f.getElement();
        b.dom.addClass(e, "tang-ui tang-tab");
        b.dom.insertHTML(e, "beforeEnd", f.toHTMLString());
        f.fire("onload")
    }, dispose: function () {
        var f = this, g, e;
        if (f.disposed) {
            return
        }
        g = f.getElement("title");
        e = f.getElement("body");
        b.dom.removeClass(f.getElement(), "tang-ui tang-tab");
        d.Base.prototype.dispose.call(f);
        b.dom.remove(g);
        b.dom.remove(e);
        g = e = null
    }});
    a = d.Tab;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Tab/Tab.js"]);
F.module("/browse_static/common/ui/magic/Base/Base.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    d.Base = function () {
        b.lang.Class.call(this);
        this._ids = {};
        this._eid = this.guid + "__"
    };
    b.lang.inherits(d.Base, b.lang.Class, "magic.Base").extend({getElement: function (e) {
        return document.getElementById(this.getId(e))
    }, getElements: function () {
        var e = {};
        var g = this._ids;
        for (var f in g) {
            e[f] = this.getElement(f)
        }
        return e
    }, getId: function (e) {
        e = b.lang.isString(e) ? e : "";
        return this._ids[e] || (this._ids[e] = this._eid + e)
    }, mappingDom: function (e, f) {
        if (b.lang.isString(f)) {
            this._ids[e] = f
        } else {
            if (f && f.nodeType) {
                f.id ? this._ids[e] = f.id : f.id = this.getId(e)
            }
        }
        return this
    }, dispose: function () {
        this.fire("ondispose") && b.lang.Class.prototype.dispose.call(this)
    }});
    a = d.Base;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js"]);
F.module("/browse_static/common/ui/magic/Tooltip/Tooltip.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/control/Popup/Popup.js");
    c("/browse_static/common/ui/magic/Background/$styleBox/$styleBox.js");
    (function () {
        d.Tooltip = b.lang.createClass(function (f) {
            var g = this;
            g.align = "left";
            g.direction = "top";
            g.autoHide = false;
            g.styleBox = true;
            g.offsetY = 12;
            g.content = "";
            g.smartPosition = false;
            g.disposeOnHide = true;
            b.object.extend(g, f || {});
            g._init_tooltip()
        }, {type: "magic.Tooltip", superClass: d.control.Popup}).extend({render: function () {
            this.setSize([this.width, this.height]);
            this.show()
        }, _init_tooltip: function () {
            var g = this;
            var f = e.produce();
            g.mappingDom("", f.getElement());
            g.mappingDom("content", f.getElement("content"));
            f.getElement().style.zIndex = b.global.getZIndex("popup");
            g.background = new d.Background({coverable: true, styleBox: g.styleBox});
            g.background.render(g.getElement());
            b.dom.insertHTML(g.background.getElement(), "afterbegin", "<div class='arrow_top'></div><div class='arrow_bottom'></div>");
            f.getElement("close").onclick = function () {
                g.hide();
                return false
            };
            g.container && g.container.appendChild(f.getElement());
            g.setContent(g.content);
            function h() {
                g.direction = "top";
                g.smartPosition && g._resupinate && (g.direction = "bottom");
                var i = g.background.getElement().className.replace(/ (align|dir)_\w+/g, "");
                g.background.getElement().className = i + " align_" + g.align + " dir_" + g.direction
            }

            g.on("show", function () {
                h()
            });
            g.on("reposition", function () {
                h()
            });
            g.on("dispose", function () {
                var i = g.background.getElement();
                i.parentNode.removeChild(i);
                g.container && document.body.appendChild(f.getElement());
                f.busy = false
            })
        }});
        var e = {list: [], produce: function () {
            for (var f = 0, h = this.list.length; f < h; f++) {
                if (!this.list[f].busy) {
                    this.list[f].busy = true;
                    return this.list[f]
                }
            }
            var g = new d.Base();
            b.dom.insertHTML(document.body, "afterbegin", ["<div class='tang-tooltip' id='", g.getId(), "' ", "style='position:absolute; display:none;'>", "<div class='tang-tooltip-close' id='", g.getId("close"), "'>", "<a href='#' onclick='return false'></a>", "</div>", "<div class='tang-foreground' id='", g.getId("content"), "'></div>", "</div>"].join(""));
            g.busy = true;
            this.list.push(g);
            return g
        }}
    })();
    a = d.Tooltip;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Popup/Popup.js", "/browse_static/common/ui/magic/Background/$styleBox/$styleBox.js"]);
F.module("/browse_static/common/ui/magic/Mask/Mask.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/control/Layer/Layer.js");
    d.Mask = function (f) {
        var h = this;
        d.control.Layer.call(this);
        h.zIndex = 999;
        h.opacity = 0.3;
        h.bgColor = "#000000";
        h.coverable = false;
        h.container = document.body;
        b.object.extend(h, f || {});
        h.width = h.height = "100%";
        var g = b.browser.safari;
        b.dom.insertHTML(h.container, "afterbegin", h.toHTMLString());
        function e() {
            if (h.container == document.body) {
                var j = h.getElement().style;
                j.display = "none";
                h.setSize([b.page.getWidth(), b.page.getHeight()]);
                j.display = ""
            }
        }

        function i(m) {
            var p = document.getElementsByTagName("object");
            var k = m ? "visible" : "hidden";
            for (var n = 0, q, j = p.length; n < j; n++) {
                q = p[n];
                q.style.visibility = k
            }
        }

        h.on("show", function () {
            e();
            b.event.on(window, "onresize", e);
            var j = h.getElement().style;
            j.opacity = h.opacity;
            j.zIndex = h.zIndex;
            j.filter = "alpha(opacity=" + h.opacity * 100 + ")";
            j.backgroundColor = h.bgColor;
            g && i(false)
        });
        h.on("hide", function () {
            b.event.un(window, "onresize", e);
            g && i(true)
        })
    };
    b.lang.inherits(d.Mask, d.control.Layer, "magic.Mask").extend({toHTMLString: function () {
        return"<div id='" + this.getId() + "' style='top:0px; left:0px; position:absolute; display:none;'>" + ("<iframe frameborder='0' style='filter:progid:DXImageTransform.Microsoft.Alpha(opacity:0);position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:-1' src='about:blank'></iframe><div style='position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:-1;'>&nbsp;</div>") + "</div>"
    }});
    a = d.Mask;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Layer/Layer.js"]);
F.module("/browse_static/common/ui/magic/Carousel/$button/$button.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/Carousel/Carousel.js");
    c("/browse_static/common/ui/magic/control/Carousel/$button/$button.js");
    b.lang.register(d.Carousel, function (e) {
        var f = this, g = '<a href="#" class="tang-carousel-btn #{class}" onclick="return false;">#{content}</a>';
        f._options.button = b.object.extend({buttonLabel: {prev: "", next: ""}}, f._options.button);
        if (!f._options.button.enable) {
            return
        }
        f.on("ondomready", function (i) {
            var h = f.getElement();
            b.dom.insertHTML(h, "afterBegin", b.string.format(g, {"class": "tang-carousel-btn-prev", content: f._options.button.buttonLabel.prev}));
            b.dom.insertHTML(h, "beforeEnd", b.string.format(g, {"class": "tang-carousel-btn-next", content: f._options.button.buttonLabel.next}));
            f.on("ondispose", function () {
                b.array.each(["prev", "next"], function (j) {
                    b.dom.remove(f.getElement(j))
                })
            })
        })
    });
    a = d.Carousel.$button;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/Carousel/Carousel.js", "/browse_static/common/ui/magic/control/Carousel/$button/$button.js"]);
F.module("/browse_static/common/ui/magic/Carousel/Carousel.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/control/Carousel/Carousel.js");
    d.Carousel = b.lang.createClass(function (e) {
    }, {type: "magic.Carousel", superClass: d.control.Carousel}).extend({tplItem: '<li class="#{class}">#{content}</li>', toHTMLString: function () {
        var g = this, e = g._options.items.length, h = [];
        for (var f = 0; f < e; f++) {
            h.push(b.string.format(g.tplItem, {"class": "tang-carousel-item", content: g._items[f].content}))
        }
        return b.string.format('<div class="#{containerClass}"><ul class="#{elementClass}">#{content}</ul></div>', {containerClass: "tang-carousel-container", elementClass: "tang-carousel-element", content: h.join("")})
    }, render: function (g) {
        var f = this, e;
        if (f.getElement()) {
            return
        }
        f.mappingDom("", b.dom.g(g) || document.body);
        e = f.getElement();
        b.dom.addClass(e, "tang-ui tang-carousel");
        b.dom.insertHTML(e, "beforeEnd", f.toHTMLString());
        f.fire("ondomready");
        f.fire("onload")
    }, dispose: function () {
        var f = this, e;
        if (f.disposed) {
            return
        }
        b.dom.removeClass(f.getElement(), "tang-ui tang-carousel");
        e = f.getElement("container");
        d.Base.prototype.dispose.call(f);
        b.dom.remove(e);
        e = null
    }});
    a = d.Carousel;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Carousel/Carousel.js"]);
F.module("/browse_static/common/ui/magic/Pager/Pager.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/Base/Base.js");
    d.Pager = b.lang.createClass(function (e) {
        var f = this;
        this.currentPage = 1;
        this.totalPage = 1;
        this.viewSize = 10;
        this.currentPagePos = 4;
        this.labelFirst = "��ҳ";
        this.labelPrev = "��һҳ";
        this.labelNext = "��һҳ";
        this.labelLast = "βҳ";
        this.tplURL = "##{pageNum}";
        this.tplLabelNormal = "#{pageNum}";
        this.tplLabelCurrent = "#{pageNum}";
        b.object.extend(this, e);
        this.currentPage = Math.max(this.currentPage, 1)
    }, {type: "magic.Pager", superClass: d.Base}).extend({_buildLink: function (f, e, g) {
        return"<a onclick=\"return baiduInstance('" + this.guid + "').update(" + f + ')" href="' + b.string.format(this.tplURL, {pageNum: f}) + '" class="tang-pager-' + e + '">' + g + "</a>"
    }, update: function (g) {
        var f = this.fire("pagechange", {pageNum: g});
        this.currentPage = g;
        var e = this.getElement();
        e.innerHTML = "";
        this.render(this.getElement());
        return f
    }, _toHTMLString: function () {
        var h, f = [], g = this.totalPage < this.viewSize || this.currentPage <= this.currentPagePos ? 1 : Math.min(this.currentPage - this.currentPagePos, this.totalPage - this.viewSize + 1), e = Math.min(this.totalPage, g + this.viewSize - 1);
        f.push('<div id="' + this.getId("main") + '" class="tang-pager-main">');
        if (1 < this.currentPage) {
            f.push(this._buildLink(1, "first", this.labelFirst));
            f.push(this._buildLink(this.currentPage - 1, "previous", this.labelPrev))
        }
        for (h = g; h < this.currentPage; h++) {
            f.push(this._buildLink(h, "normal", b.string.format(this.tplLabelNormal, {pageNum: h})))
        }
        f.push('<span class="tang-pager-current">' + b.string.format(this.tplLabelCurrent, {pageNum: this.currentPage}) + "</span>");
        for (h = this.currentPage + 1; h <= e; h++) {
            f.push(this._buildLink(h, "normal", b.string.format(this.tplLabelNormal, {pageNum: h})))
        }
        if (e > this.currentPage) {
            f.push(this._buildLink(this.currentPage + 1, "next", this.labelNext));
            f.push(this._buildLink(this.totalPage, "last", this.labelLast))
        }
        f.push("</div>");
        return f.join("")
    }, render: function (e) {
        if (!this.getElement()) {
            this.mappingDom("", e || document.body)
        }
        b.dom.addClass(e, "tang-pager");
        b.dom.insertHTML(e, "beforeEnd", this._toHTMLString());
        this.fire("load")
    }, dispose: function () {
        if (this.disposed) {
            return
        }
        var f = this.getElement(), e = this.getElement("main");
        b.dom.removeClass(f, "tang-pager");
        d.Base.prototype.dispose.call(this);
        b.dom.remove(e);
        f = e = null
    }});
    a = d.Pager;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/Base/Base.js"]);
F.module("/browse_static/common/ui/magic/Background/$styleBox/$styleBox.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/Background/Background.js");
    b.lang.register(d.Background, function (e) {
        if (this.styleBox) {
            this._innerHTML = ["<table borde='0' cellpadding='0' cellspacing='0' ", (b.browser.ie < 7 ? "class='gif__' " : ""), "style='width:100%;height:100%;'>", "<tr class='top__'>", "<td class='left__ corner__'>&nbsp;</td>", "<td class='center__ vertical__'>&nbsp;</td>", "<td class='right__ corner__'>&nbsp;</td>", "</tr>", "<tr class='middle__'>", "<td class='left__ horizontal__'>&nbsp;</td>", "<td class='center__ midland__'>", (this._innerHTML || "&nbsp;"), "</td>", "<td class='right__ horizontal__'>&nbsp;</td>", "</tr>", "<tr class='bottom__'>", "<td class='left__ corner__'>&nbsp;</td>", "<td class='center__ vertical__'>&nbsp;</td>", "<td class='right__ corner__'>&nbsp;</td>", "</tr>", "</table>"].join("")
        }
    });
    a = d.Background.$styleBox;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/Background/Background.js"]);
F.module("/browse_static/common/ui/magic/Background/Background.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/Base/Base.js");
    d.Background = b.lang.createClass(function (f) {
        var g = f || {}, h = this;
        h.coverable = g.coverable || false;
        h.styleBox = g.styleBox;
        h.tagName = "div";
        var e = "filter:progid:DXImageTransform.Microsoft.Alpha(opacity:0);position:absolute;z-index:-1;top:0;left:0;width:100%;height:100%;";
        h._coverDom = "<div style='" + e + "opacity:0;background-color:#FFFFFF'></div>";
        var i = b.browser;
        i.ie < 7 && (h._coverDom = "<iframe frameborder='0' style='" + e + "' src='about:blank'></iframe>");
        if (i.ie && (!i.isStrict || i.ie < 8)) {
            h.size = [0, 0];
            h.timer = setInterval(function () {
                h._forIE()
            }, 80)
        }
        this._innerHTML = "<div class='tang-background-inner' style='width:100%;height:100%;' id='" + this.getId("inner") + "'></div>"
    }, {type: "magic.Background", superClass: d.Base}).extend({render: function (e) {
        var f = b.dom.g(e);
        f != document.body && b.dom.getCurrentStyle(f, "position") == "static" && (f.style.position = "relative");
        b.dom.insertHTML(f, "afterbegin", this.toHTMLString())
    }, dispose: function () {
        var e = this.getElement();
        e.parentNode.removeChild(e);
        clearInterval(this.timer)
    }, toHTMLString: function (e) {
        return["<", (e || this.tagName), " class='tang-background", (b.browser.ie < 7 ? " ie6__" : ""), "' id='", this.getId(), "' style='position:absolute; top:0px; left:0px;", (this.timer ? "width:10px;height:10px;" : "width:100%;height:100%;"), "z-index:-9; -webkit-user-select:none; -moz-user-select:none;' ", "onselectstart='return false'>", this._innerHTML, (this.coverable ? this._coverDom || "" : ""), "</", (e || this.tagName), ">"].join("")
    }, setContent: function (e) {
        this.getElement("inner").innerHTML = e
    }, _forIE: function () {
        if (this.guid && this.layer || ((this.layer = this.getElement()) && this.layer.offsetHeight)) {
            var m = this.layer;
            var g = this.container || m.parentNode;
            if (g && g.style) {
                var p = g.style, o = parseInt(p.borderTopWidth) || 0, q = parseInt(p.borderRightWidth) || 0, j = parseInt(p.borderBottomWidth) || 0, e = parseInt(p.borderLeftWidth) || 0, n = g.offsetWidth - q - e, f = g.offsetHeight - o - j;
                if (this.size[0] != n || this.size[1] != f) {
                    m.style.width = (this.size[0] = n) + "px";
                    m.style.height = (this.size[1] = f) + "px"
                }
                if (this.styleBox && this.table || (this.table = this.getElement("table"))) {
                    var l, k, i;
                    l = l || parseInt(b.dom.getCurrentStyle(this.table.rows[0], "height"));
                    i = i || parseInt(b.dom.getCurrentStyle(this.table.rows[2], "height"));
                    this.table.rows[0].style.height = l + "px";
                    this.table.rows[2].style.height = i + "px";
                    this.table.rows[1].style.height = (this.layer.offsetHeight - l - i) + "px"
                }
            }
        }
    }});
    a = d.Background;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/Base/Base.js"]);
F.module("/browse_static/common/ui/magic/Dialog/Dialog.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/control/Dialog/Dialog.js");
    c("/browse_static/common/ui/magic/Background/Background.js");
    d.Dialog = b.lang.createClass(function (f) {
        var e = {width: 400, height: 300, left: 0, top: 0, contentType: "html"};
        b.object.extend(e, f || {});
        b.object.extend(this, e);
        if (this.width < 100) {
            this.width = 100
        }
        if (this.height < 100) {
            this.height = 100
        }
    }, {type: "magic.Dialog", superClass: d.control.Dialog});
    d.Dialog.extend({render: function (f) {
        f = b.dom.g(f);
        f || document.body.appendChild(f = document.createElement("div"));
        var e = d.Dialog.template.join("");
        b.dom.addClass(f, "tang-ui tang-dialog");
        var g = "";
        if (typeof this.content == "string") {
            g = this.content
        }
        b.dom.insertHTML(f, "beforeEnd", b.string.format(e, {title: b.string.encodeHTML(this.titleText || "") || "&nbsp;", content: b.string.encodeHTML(g) || "", titleId: this.getId("title"), titleTextId: this.getId("titleText"), titleButtonsId: this.getId("titleButtons"), bodyId: this.getId("body"), contentId: this.getId("content"), closeBtnId: this.getId("closeBtn"), foregroundId: this.getId("foreground")}));
        this._background = new d.Background({coverable: true});
        this._background.render(f);
        this.mappingDom("", f);
        this._titleHeight = this.getElement("title").offsetHeight || 30;
        b.event.on(this.getElement("closeBtn"), "click", this._closeBtnFn = b.fn.bind(this.hide, this));
        this.setSize(this);
        this.setPosition(this.left, this.top);
        if (this.content && this.content.nodeType) {
            this.getElement("content").appendChild(this.content)
        }
        this.fire("load");
        this.show();
        this.disposeProcess.push(function () {
            b.event.un(this.getElement("closeBtn"), "click", this._closeBtnFn);
            this._background.dispose();
            f.innerHTML = "";
            b.dom.addClass(f, "tang-ui tang-dialog")
        })
    }});
    d.Dialog.template = ["<div class='tang-foreground' id='#{foregroundId}'>", "<div class='tang-title' id='#{titleId}'>", "<div class='buttons' id='#{titleButtonsId}'>", "<a id='#{closeBtnId}' class='close-btn' href='' onmousedown='event.stopPropagation && event.stopPropagation(); event.cancelBubble = true; return false;' onclick='return false;'></a>", "</div>", "<span id='#{titleTextId}'>#{title}</span>", "</div>", "<div class='tang-body' id='#{bodyId}'>", "<div class='content' id='#{contentId}'>#{content}</div>", "</div>", "</div>"];
    a = d.Dialog;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Dialog/Dialog.js", "/browse_static/common/ui/magic/Background/Background.js"]);
F.module("/browse_static/common/ui/magic/control/Layer/Layer.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/Base/Base.js");
    c("/browse_static/common/ui/magic/control/control.js");
    d.control.Layer = b.lang.createClass(function (e) {
        this.width = "auto";
        this.height = "auto";
        b.object.extend(this, e || {})
    }, {type: "magic.control.Layer", superClass: d.Base}).extend({show: function () {
        if (this.fire("onbeforeshow")) {
            this.getElement().style.display = "";
            this.fire("onshow")
        }
    }, hide: function () {
        if (this.fire("onbeforehide")) {
            this.getElement().style.display = "none";
            this.fire("onhide")
        }
    }, setWidth: function (e) {
        b.dom.setPixel(this.getElement(), "width", (this.width = e))
    }, setHeight: function (e) {
        b.dom.setPixel(this.getElement(), "height", (this.height = e))
    }, setSize: function (e) {
        this.setWidth(e.width || e[0]);
        this.setHeight(e.height || e[1])
    }});
    a = d.control.Layer;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/Base/Base.js", "/browse_static/common/ui/magic/control/control.js"]);
F.module("/browse_static/common/ui/magic/control/Carousel/$itemModify/$itemModify.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/control/Carousel/Carousel.js");
    b.lang.register(d.control.Carousel, function (e) {
        var f = this;
        f._options.itemsModify = b.object.extend({enable: true}, f._options.itemsModify);
        if (!f._options.itemsModify.enable) {
            return
        }
    }, {removeItem: function (k) {
        if (k >= this._dataIds.length) {
            return
        }
        var m = this, g = m._options.focusRange, n = m._options.viewSize, h = m.getElement("element"), f = b.dom.children(h), o = m._dataIds.length, l = b.dom.g(m._dataIds[k]), j = [], i, e;
        b.array.each(f, function (p, q) {
            j.push(p.id)
        });
        if (b.array.indexOf(j, m._dataIds[k]) != -1) {
            b.dom.remove(l);
            if (m._dataIds.length > n) {
                i = b.array.indexOf(m._dataIds, f[n - 1].id) + 1;
                if (i == m._dataIds.length) {
                    i = 0
                }
                e = m._getItem(i);
                e.insert(h, "forward");
                e.loadContent();
                m._resize()
            }
        }
        delete m._datas[m._getItem(k).guid];
        b.array.removeAt(m._dataIds, k);
        if (k >= m._dataIds.length) {
            k = 0
        }
        if (m._selectedIndex == k && m._dataIds.length > 0) {
            m.focus(k)
        }
    }});
    a = d.control.Carousel.$itemModify;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Carousel/Carousel.js"]);
F.module("/browse_static/common/ui/magic/control/Carousel/$autoScroll/$autoScroll.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/control/Carousel/Carousel.js");
    b.lang.register(d.control.Carousel, function (f) {
        var g = this, e;
        g._options.autoScroll = b.object.extend({enable: true, interval: 1000, direction: "forward"}, g._options.autoScroll);
        e = g._options.autoScroll;
        if (!e.enable) {
            return
        }
        e._autoScrolling = true;
        e.direction = e.direction.toLowerCase();
        g.on("onload", function (h) {
            var i = b.fn.bind("_onMouseEventHandler", g);
            b.event.on(g.getElement("element"), "mouseenter", i);
            b.event.on(g.getElement("element"), "mouseleave", i);
            g.on("ondispose", function () {
                b.event.un(g.getElement("element"), "mouseenter", i);
                b.event.un(g.getElement("element"), "mouseleave", i)
            });
            g.start()
        });
        g.on("onfocus", function (h) {
            if (!e._autoScrolling) {
                return
            }
            h.target.start()
        });
        g.on("ondispose", function (h) {
            h.target.stop()
        })
    }, {_onMouseEventHandler: function (e) {
        var g = this, h = {mouseover: "mouseenter", mouseout: "mouseleave"}, f = e.type;
        g.fire("on" + (h[f] || f), {DOMEvent: e})
    }, start: function () {
        var f = this, e = f._options.autoScroll;
        e._autoScrolling = true;
        clearTimeout(e._autoScrollTimeout);
        e._autoScrollTimeout = setTimeout(function () {
            f._basicFlip(e.direction)
        }, e.interval)
    }, stop: function () {
        var f = this, e = f._options.autoScroll;
        clearTimeout(e._autoScrollTimeout);
        e._autoScrolling = false
    }});
    a = d.control.Carousel.$autoScroll;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Carousel/Carousel.js"]);
F.module("/browse_static/common/ui/magic/control/Carousel/$button/$button.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/control/Carousel/Carousel.js");
    c("/browse_static/common/ui/magic/_query/_query.js");
    b.lang.register(d.control.Carousel, function (g) {
        var i = this, f, h;
        i._options.button = b.object.extend({enable: true}, i._options.button);
        if (!i._options.button.enable) {
            return
        }
        f = b.fn.bind("_onButtonClick", i, "backward");
        h = b.fn.bind("_onButtonClick", i, "forward");
        function e() {
            var k = i.getElement("prev"), j = i.getElement("next");
            b.dom[i.isFirst() ? "addClass" : "removeClass"](k, "tang-carousel-btn-prev-disabled");
            b.dom[i.isLast() ? "addClass" : "removeClass"](j, "tang-carousel-btn-next-disabled");
            b.dom[!i.isFirst() ? "addClass" : "removeClass"](k, "tang-carousel-btn-prev");
            b.dom[!i.isLast() ? "addClass" : "removeClass"](j, "tang-carousel-btn-next")
        }

        i.on("onload", function (j) {
            var k = d._query;
            i.mappingDom("prev", k(".tang-carousel-btn-prev", i.getElement())[0]).mappingDom("next", k(".tang-carousel-btn-next", i.getElement())[0]);
            b.event.on(i.getElement("prev"), "click", f);
            b.event.on(i.getElement("next"), "click", h);
            e()
        });
        i.on("onfocus", function () {
            e()
        });
        i.on("ondispose", function () {
            b.event.un(i.getElement("prev"), "click", f);
            b.event.un(i.getElement("next"), "click", h)
        })
    }, {_onButtonClick: function (g, e) {
        var f = this;
        if (g == "forward" ? f.isLast() : f.isFirst()) {
            return
        }
        f._basicFlip(g)
    }, _isLimit: function (h) {
        var g = this, f = g._options, j = f.focusRange, e = g._selectedIndex, i = (h == "forward") ? e >= g.getTotalCount() - 1 - (f.viewSize - 1 - j.max) : e <= j.min;
        return f.isLoop ? false : i
    }, isFirst: function () {
        return this._isLimit("backward")
    }, isLast: function () {
        return this._isLimit("forward")
    }});
    a = d.control.Carousel.$button;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Carousel/Carousel.js", "/browse_static/common/ui/magic/_query/_query.js"]);
F.module("/browse_static/common/ui/magic/control/Carousel/$fx/$fx.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/control/Carousel/Carousel.js");
    c("/browse_static/common/lib/tangram/fx/scrollTo/scrollTo.js");
    c("/browse_static/common/lib/tangram/fx/current/current.js");
    b.lang.register(d.control.Carousel, function (e) {
        var f = this;
        f._options.fx = b.object.extend({enable: true}, f._options.fx);
        if (!f._options.fx.enable) {
            return
        }
        f.on("onbeforescroll", function (i) {
            i.returnValue = false;
            if (b.fx.current(f.getElement("container"))) {
                return
            }
            var j = f._options, k = f._axis[j.orientation], h = j.orientation == "horizontal", g = f.getElement("container"), m = g[k.scrollPos] + i.distance, l = b.object.extend({onbeforeupdate: function () {
                if (i.empty.length <= 0) {
                    return
                }
                var p = i.empty[0], n, o;
                if (i.distance < 0 ? p.empty[k.offsetPos] + p.empty[k.offsetSize] - g[k.scrollPos] >= 0 : p.empty[k.offsetPos] - g[k.scrollPos] <= g[k.offsetSize]) {
                    n = p.empty.parentNode;
                    o = p.empty.cloneNode(true);
                    n.replaceChild(o, p.empty);
                    n.replaceChild(p.empty, p.item);
                    n.replaceChild(p.item, o);
                    i.empty.shift()
                }
            }, onafterfinish: function () {
                f._toggle(i.index);
                f._clear(i.index, j.focusRange[i.distance < 0 ? "min" : "max"]);
                f._resize();
                f.fire("onfocus", {direction: i.distance > 0 ? "forward" : "backward"})
            }}, j.fx);
            b.fx.scrollTo(g, {x: h ? m : 0, y: h ? 0 : m}, l)
        })
    });
    a = d.control.Carousel.$fx;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Carousel/Carousel.js", "/browse_static/common/lib/tangram/fx/scrollTo/scrollTo.js", "/browse_static/common/lib/tangram/fx/current/current.js"]);
F.module("/browse_static/common/ui/magic/control/Carousel/Carousel.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/Base/Base.js");
    c("/browse_static/common/ui/magic/control/control.js");
    c("/browse_static/common/ui/magic/_query/_query.js");
    void function () {
        function e(f) {
            this._options = f;
            this._constructor()
        }

        e.prototype._constructor = function () {
            var g = this, f = g._options;
            g._element = b.lang.isElement(f.content) && f.content;
            g.guid = g._element.id || b.lang.guid() + "-carousel-item";
            g._element && !g._element.id && (g._element.id = g.guid)
        };
        e.prototype.render = function (k, j) {
            if (this._element) {
                return
            }
            var i = this, g = i._options, l = b.dom.children(k), f = l[0] ? l[0].tagName : "li", h = "<" + f + ' id="#{rsid}" class="#{class}">#{content}</' + f + ">";
            b.dom.insertHTML(k, j == "forward" ? "beforeEnd" : "afterBegin", b.string.format(h, {rsid: i.guid, "class": "tang-carousel-item" + (g.empty ? " tang-carousel-item-empty" : ""), content: g.empty ? "&nbsp;" : ""}));
            i._element = b.dom.g(i.guid)
        };
        e.prototype.insert = function (h, g) {
            var f = this;
            if (f._element) {
                g == "forward" ? h.appendChild(f._element) : h.insertBefore(f._element, h.firstChild)
            } else {
                f.render(h, g)
            }
        };
        e.prototype.loadContent = function () {
            var f = this
        };
        e.prototype.getElement = function () {
            var f = this;
            return f._element || b.dom.g(this.guid)
        };
        d.control.Carousel = b.lang.createClass(function (f) {
            var h = this, i = f.focusRange, g;
            h._options = b.object.extend({viewSize: 3, step: 1, focusRange: {min: 0, max: f.viewSize - 1 || 2}, orientation: "horizontal", originalIndex: 0, isLoop: false}, f);
            g = h._options;
            h._selectedIndex = g.originalIndex;
            i && (g.focusRange = {min: Math.max(0, i.min), max: Math.min(g.viewSize - 1, i.max)});
            h._items = g.items || [];
            h._dataIds = [];
            h._datas = {};
            h.on("onfocus", function () {
                h._scrolling = false
            });
            h.on("onload", function (k) {
                var n = h._axis[h._options.orientation], j = h._selectedIndex, l = h._options, p = l.focusRange, o = d._query, m = b.fn.bind("_onEventHandler", h);
                h.mappingDom("container", o(".tang-carousel-container", h.getElement())[0]).mappingDom("element", o(".tang-carousel-element", h.getElement())[0]);
                b.array.each(b.dom.children(h.getElement("element")), function (s, q) {
                    var r = new e({content: s});
                    h._dataIds.push(r.guid);
                    h._datas[r.guid] = r;
                    b.dom[j == q ? "addClass" : "removeClass"](s, "tang-carousel-item-selected")
                });
                h._clear(j, p[j > (h._dataIds.length - 1) / 2 ? "max" : "min"], true);
                h._resize();
                b.event.on(h.getElement("element"), "click", m);
                b.event.on(h.getElement("element"), "mouseover", m);
                b.event.on(h.getElement("element"), "mouseout", m);
                h.on("ondispose", function () {
                    b.event.un(h.getElement("element"), "click", m);
                    b.event.un(h.getElement("element"), "mouseover", m);
                    b.event.un(h.getElement("element"), "mouseout", m)
                })
            })
        }, {type: "magic.control.Carousel", superClass: d.Base}).extend({_axis: {horizontal: {size: "width", offsetPos: "offsetLeft", offsetSize: "offsetWidth", scrollPos: "scrollLeft"}, vertical: {size: "height", offsetPos: "offsetTop", offsetSize: "offsetHeight", scrollPos: "scrollTop"}}, _onEventHandler: function (f) {
            var i = this, h = i._options, g = i.getElement("element"), j = b.event.getTarget(f);
            if (!b.dom.contains(i.getElement("element"), j)) {
                return
            }
            j = b.dom.getAncestorByClass(j, "tang-carousel-item") || j;
            i.fire("on" + f.type.toLowerCase() + "item", {DOMEvent: f, index: b.array.indexOf(i._dataIds, j.id)})
        }, _getItemBound: function () {
            var i = this, g = i._options, f = g.orientation.toLowerCase() == "horizontal", h = i._axis[g.orientation], j = i._bound, k;
            if (!j) {
                k = b.dom.children(i.getElement("element"))[0];
                if (k) {
                    j = i._bound = {marginPrev: parseInt(b.dom.getStyle(k, "margin" + (f ? "Left" : "Top")), 10), marginNext: parseInt(b.dom.getStyle(k, "margin" + (f ? "Right" : "Bottom")), 10), size: k[h.offsetSize]};
                    j.bound = j.size + (f ? (j.marginPrev + j.marginNext) : Math.max(j.marginPrev, j.marginNext))
                }
            }
            return j || {marginPrev: 0, marginNext: 0, size: 0, bound: 0}
        }, _resize: function () {
            var h = this, g = h._axis[h._options.orientation], f = h.getElement("element"), i = b.dom.children(f);
            f.style[g.size] = i.length * h._getItemBound().bound + "px"
        }, _clear: function (l, k, j) {
            var m = this, i = m._axis[m._options.orientation], f = m._options, n = f.viewSize, h = f.focusRange, p = m._dataIds.length, g = b.dom.children(m.getElement("element")), o = b.array.indexOf(g, m._getItem(l).getElement());
            if (j) {
                l - h.min < 0 && (k = l);
                l + n - h.max > p && (k = n - p + l)
            }
            b.array.each(g, function (r, q) {
                (q < o - k || q > o + n - k - 1) && b.dom.remove(r)
            });
            m.getElement("container")[i.scrollPos] = 0
        }, _getItem: function (f) {
            var g = this;
            return g._datas[typeof f == "string" ? f : g._dataIds[f]]
        }, _toggle: function (f) {
            var g = this;
            b.dom.removeClass(g._dataIds[g._selectedIndex], "tang-carousel-item-selected");
            g._selectedIndex = f;
            b.dom.addClass(g._dataIds[f], "tang-carousel-item-selected")
        }, _scrollTo: function (q, y) {
            var B = this, g = B._options, z = g.focusRange, m = B._selectedIndex, l = B._axis[g.orientation], y = y || (q > m ? "forward" : "backward"), k = y.toLowerCase() == "forward", u = B.getElement("container"), j = B.getElement("element"), f = B._getItemBound(), C = b.dom.g(B._getItem(q).guid), x = B._dataIds.length, o = b.dom.children(j), A = b.array.indexOf(o, B._getItem(m).getElement()), w = ((k ? 1 : -1) * (q - m) + x) % x + (k ? g.viewSize - z.max - 1 : z.min) - (k ? o.length - A - 1 : A), r = [], p, t, n, s, h;
            if (q == m || B._dataIds.length <= g.viewSize || B._scrolling) {
                return
            }
            B._scrolling = true;
            if (!C || C[l.offsetPos] < z.min * f.bound || C[l.offsetPos] - f.marginPrev > z.max * f.bound) {
                for (var v = 0; v < w; v++) {
                    p = (m + (k ? o.length - A - 1 : -A) + (k ? 1 : -1) * (v + 1) + x) % x;
                    t = b.dom.g(B._dataIds[p]);
                    s = t ? new e({empty: true}) : B._getItem(p);
                    s.insert(j, y);
                    s.loadContent();
                    t && r.push({empty: s.getElement(), item: t})
                }
                B._resize();
                !k && (u[l.scrollPos] += f.bound * w);
                if (B.fire("onbeforescroll", {index: q, distance: (k ? 1 : -1) * f.bound * w, empty: r})) {
                    B._toggle(q);
                    while (r.length > 0) {
                        h = r.shift();
                        j.replaceChild(h.item, h.empty);
                        b.dom.remove(h.empty)
                    }
                    B._clear(q, z[k ? "max" : "min"]);
                    B._resize();
                    B.fire("onfocus", {direction: y})
                }
            } else {
                B._toggle(q);
                B.fire("onfocus", {direction: y})
            }
        }, _basicFlip: function (k) {
            var l = this, j = l._options, m = j.focusRange, h = (k == "forward") ? 1 : -1, f = l._selectedIndex, g = l._dataIds.length, i = j.isLoop ? (f + h * j.step + g) % g : Math.min(g - 1 - (j.viewSize - 1 - m.max), Math.max(0 + m.min, f + h * j.step));
            l._scrollTo(i, k)
        }, focusPrev: function () {
            this._basicFlip("backward")
        }, focusNext: function () {
            this._basicFlip("forward")
        }, focus: function (f, g) {
            var f = Math.min(Math.max(0, f), this._dataIds.length - 1);
            this._scrollTo(f, g)
        }, getCurrentIndex: function () {
            return this._selectedIndex
        }, getTotalCount: function () {
            return this._dataIds.length
        }, dispose: function () {
            var f = this;
            if (f.disposed) {
                return
            }
            d.Base.prototype.dispose.call(f)
        }})
    }();
    a = d.control.Carousel;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/Base/Base.js", "/browse_static/common/ui/magic/control/control.js", "/browse_static/common/ui/magic/_query/_query.js"]);
F.module("/browse_static/common/ui/magic/control/Dialog/$mask/$mask.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/control/Dialog/Dialog.js");
    c("/browse_static/common/ui/magic/Mask/Mask.js");
    b.lang.register(d.control.Dialog, function (e) {
        if (this.mask && this.mask.enable) {
            this.renderMask();
            this.on("load", function () {
                if (!this.left) {
                    this.center()
                }
            });
            this.on("show", function () {
                this.showMask()
            });
            this.on("hide", function () {
                this.hideMask()
            })
        }
    }, {renderMask: function () {
        if (this._mask) {
            return this
        }
        this._mask = new d.Mask({opacity: this.mask.opacity || 0.15, bgColor: this.mask.bgColor || "#000", zIndex: this.zIndex - 1});
        return this
    }, showMask: function () {
        this._mask.show();
        return this
    }, hideMask: function () {
        this._mask.hide();
        return this
    }});
    a = d.control.Dialog.$mask;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Dialog/Dialog.js", "/browse_static/common/ui/magic/Mask/Mask.js"]);
F.module("/browse_static/common/ui/magic/control/Dialog/Dialog.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/control/Layer/Layer.js");
    d.control.Dialog = b.lang.createClass(function (f) {
        var e = {draggable: true};
        b.object.extend(e, f = f || {});
        b.object.extend(this, e);
        this.zIndex = b.global.getZIndex("dialog", 5);
        this.disposeProcess = [];
        this.on("load", function () {
            var h = this.getElement(), j = this;
            if (typeof this.left == "number" || typeof this.top == "number") {
                this.setPosition(this)
            }
            if (typeof this.width == "number" || typeof this.height == "number") {
                this.setSize(this)
            }
            this._isShown = true;
            this.focus();
            var i = function () {
                j.focus()
            };
            b.event.on(h, "mousedown", i);
            this.disposeProcess.unshift(function () {
                b.event.un(h, "mousedown", i)
            });
            if (this.draggable) {
                var k = this.getElement("title"), g;
                var l = b.fn.bind;
                k.className += " tang-title-dragable";
                b.event.on(k, "mousedown", g = l(function () {
                    b.dom.drag(h, {ondragstart: l(function () {
                        this.fire("dragstart")
                    }, this), ondrag: l(function () {
                        this.fire("drag")
                    }, this), ondragend: l(function () {
                        this.fire("dragstop")
                    }, this)})
                }, this));
                this.disposeProcess.unshift(function () {
                    b.event.un(k, "mousedown", g)
                })
            }
        });
        this.on("resize", function (i, j) {
            var g = this.getElement("titleText");
            var h = this.getElement("titleButtons");
            if (typeof j.width == "number") {
                b.dom.setStyle(g, "width", Math.max(0, j.width - h.clientWidth - 20) + "px")
            }
        })
    }, {type: "magic.control.Dialog", superClass: d.control.Layer});
    d.control.Dialog.extend({isShowing: function () {
        return this._isShown
    }, hide: function () {
        if (this.fire("beforehide") === false) {
            return this
        }
        this._isShown = false;
        this.getElement().style.display = "none";
        this.fire("hide")
    }, setTitleText: function (f) {
        var e = this.getElement("titleText");
        e.innerHTML = b.string.encodeHTML(f) || "&nbsp;";
        return this
    }, setContent: function (h, j) {
        var f = this.getElement("content");
        var g, i, e;
        if (g = this._lastDom) {
            e = g.parent;
            if (g.content === h) {
                return this
            }
            if (g.target) {
                e.insertBefore(g.content, g.target)
            } else {
                e.appendChild(g.content)
            }
            this._lastDom = null
        }
        switch (j) {
            case"text":
                f.innerHTML = b.string.encodeHTML(h);
                b.dom.removeClass(f, "contentFrame");
                break;
            case"element":
                if (e = h.parentNode) {
                    e.insertBefore(i = document.createTextNode(""), h);
                    this._lastDom = {content: h, parent: h.parentNode, target: i}
                }
                f.innerHTML = "";
                f.appendChild(h);
                break;
            case"frame":
                f.innerHTML = "<iframe frameborder='no' src='" + h + "'></iframe>";
                b.dom.hasClass(f, "contentFrame") || b.dom.addClass(f, "contentFrame");
                break;
            default:
                f.innerHTML = h;
                b.dom.removeClass(f, "contentFrame");
                break
        }
        return this
    }, focus: function () {
        b.dom.setStyle(this.getElement(), "zIndex", this.zIndex = b.global.getZIndex("dialog", 5));
        this.fire("focus")
    }, setSize: function (e) {
        var g = b.dom.setStyle;
        var f = this.getElement("foreground");
        if (typeof e.width == "number") {
            g(f, "width", (this.width = e.width) + "px")
        }
        if (typeof e.height == "number") {
            g(f, "height", (this.height = e.height) + "px");
            g(this.getElement("body"), "height", Math.max(0, this.height - this._titleHeight) + "px")
        }
        this.fire("resize", e)
    }, getSize: function () {
        return{width: this.width, height: this.height}
    }, setPosition: function (f) {
        var e = b.dom.setStyle;
        if (typeof f.left == "number") {
            e(this.getElement(), "left", (this.left = f.left) + "px")
        }
        if (typeof f.top == "number") {
            e(this.getElement(), "top", (this.top = f.top) + "px")
        }
        this.fire("move", f)
    }, getPosition: function () {
        return{left: this.left, top: this.top}
    }, center: function () {
        var f = document[b.browser.isStrict ? "documentElement" : "body"];
        var e = f.clientWidth;
        var i = f.clientHeight;
        var h = (((e - this.width) / 2) | 0) + f.scrollLeft;
        var g = (((i - this.height) / 2) | 0) + f.scrollTop;
        this.setPosition({left: h, top: g})
    }, dispose: function () {
        for (var f = 0, e = this.disposeProcess.length; f < e; f++) {
            this.disposeProcess[f].call(this)
        }
        d.Base.prototype.dispose.call(this)
    }});
    a = d.control.Dialog;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Layer/Layer.js"]);
F.module("/browse_static/common/ui/magic/control/Slider/$cache/$cache.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/control/Slider/Slider.js");
    b.lang.register(d.control.Slider, function (e) {
        var f = this, g = f._info;
        g.cache && g.cache.enable && f.on("load", function () {
            var h = f.getElement("inner"), j = g._accuracyKey, l = g._oppsite ? "tang-cache-backward" : "tang-cache-forward", k = f.getId("cache"), i = g._oppsite ? '<div id="#{id}" class="tang-cache #{cacheClass}"><div class="tang-cache-corner tang-cache-start"></div>' : '<div id="#{id}" class="tang-cache #{cacheClass}"><div class="tang-cache-corner tang-cache-last"></div>';
            b.dom.insertHTML(h, "afterBegin", b.string.format(i, {id: k, cacheClass: l}))
        })
    }, {setCache: function (i) {
        var h = this, j = h._info, f = h.getElement("cache"), g = i * j._limit, e = h._cachePercent(g);
        i == 0 ? b.dom.setStyle(f, "overflow", "hidden") : b.dom.setStyle(f, "overflow", "");
        b.dom.setStyle(f, j._accuracyKey, h._cachePercent(g))
    }, _cachePercent: function (e) {
        return e / this._info._limit * 100 + "%"
    }});
    a = d.control.Slider.$cache;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Slider/Slider.js"]);
F.module("/browse_static/common/ui/magic/control/Slider/$fx/$fx.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/control/Slider/Slider.js");
    c("/browse_static/common/lib/magic/fx/moveTo/moveTo.js");
    b.lang.register(d.control.Slider, function (e) {
        var g = this, f = g._info.fx;
        g.on("startFx", function (h) {
            if (f && f.enable) {
                g._fx && g._fx.end();
                g._recover();
                g._fxMove(h.knob, h.process, h.pos, h.fn);
                h.returnValue = false
            }
        })
    }, {setValue: function (g, e) {
        var f = this, i = f._info, h = i._accuracyKey, g = g || 0, j = i[h] * g;
        if (i._oppsite) {
            j = i[h] * f._accSub(1, g)
        }
        f._setPosition({target: null, noAccuracy: true, noFx: e}, j);
        i.currentValue = g
    }, _fxMove: function (h, f, m, n) {
        var l = this, i = l._info, g = i.fx, j = i._knobKey, k = i._accuracyKey, m = parseFloat(l._getKnobPos(m)), e = i._isVertical ? [0, m] : [m, 0];
        l._setCurrentValue(m);
        l._fx = b.fx.moveTo(h, e, {duration: g.duration || 200, onbeforestart: g.onfxstart, onafterupdate: function () {
            var o = l._getProcessPos(l._getRealPos(h, j));
            b.dom.setStyle(f, k, o);
            g.onfx && g.onfx.call(this, arguments)
        }, onafterfinish: function () {
            g.onfxstop && g.onfxstop.call(this, arguments);
            l._reset(m);
            n && n(m);
            delete l._fx
        }}) || n && n()
    }});
    a = d.control.Slider.$fx;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Slider/Slider.js", "/browse_static/common/lib/magic/fx/moveTo/moveTo.js"]);
F.module("/browse_static/common/ui/magic/control/Slider/Slider.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/Base/Base.js");
    c("/browse_static/common/ui/magic/control/control.js");
    d.control.Slider = b.lang.createClass(function (f) {
        var g = this, h = g._info = b.object.extend({accuracy: 0, _status: "enable"}, f), e = h._isVertical = h.orientation == "vertical";
        h.direction == "backward" && (h._oppsite = true);
        b.object.extend(h, {_suffix: e ? "vtl" : "htl", _knobKey: e ? "top" : "left", _mouseKey: e ? "y" : "x", _accuracyKey: e ? "height" : "width"});
        g.on("load", function () {
            var i = g.getElement("view"), j = g.getElement("inner"), m = ["mousedown", "click"], k = b.fn.bind(g._eventControl, g), l = h._accuracyKey;
            h._val = "offset" + l.replace(/([a-z])([a-z]*)/, function (n, p, o) {
                return p.toUpperCase() + o
            });
            h.width = i.clientWidth;
            h.height = i.clientHeight;
            h._range = [0, h[l]];
            h._limit = j[h._val];
            h._const = (h._range[1] - h._limit) / 2;
            b.array.each(m, function (o, n) {
                b.event.on(i, o, k)
            });
            g.on("dispose", function () {
                b.array.each(m, function (o, n) {
                    b.event.un(i, o, k)
                })
            });
            g._setAccuracy(h.accuracy);
            g.setValue(h.currentValue)
        })
    }, {type: "magic.control.Slider", superClass: d.Base});
    d.control.Slider.extend({disable: function () {
        this._info._status = "disabled"
    }, enable: function () {
        this._info._status = "enable"
    }, setValue: function (f) {
        var e = this, h = e._info, g = h._accuracyKey, f = f || 0, i = h[g] * f;
        if (h._oppsite) {
            i = h[g] * e._accSub(1, f)
        }
        e._setPosition({target: null, noAccuracy: true, noFx: true}, i);
        h.currentValue = f
    }, getValue: function () {
        return this._info.currentValue
    }, setRange: function (h) {
        var g = this, i = g._info, e = i[i._accuracyKey], f = h * e;
        if (i.accuracy) {
            return
        }
        i._oppsite ? i._range[0] = f : i._range[1] = f;
        i._percent = f / e
    }, dispose: function () {
        var e = this;
        if (e.disposed) {
            return
        }
        d.Base.prototype.dispose.call(e)
    }, _accSub: function (j, i) {
        var h, g, f, l;
        try {
            h = j.toString().split(".")[1].length
        } catch (k) {
            h = 0
        }
        try {
            g = i.toString().split(".")[1].length
        } catch (k) {
            g = 0
        }
        f = Math.pow(10, Math.max(h, g));
        l = (h >= g) ? h : g;
        return((j * f - i * f) / f).toFixed(l)
    }, _startDrag: function (q) {
        var o = this, h = o._info, f = o.getElement("knob"), e = o.getElement("process"), k = h.accuracy, i = h.width, g = h.height, n = t2 = 0, j = f[h._val], m = h._range, p = [], l = parseInt(b.dom.getStyle(f, "margin-" + h._knobKey));
        if (h._isVertical) {
            g = m[1] + j;
            n = m[0]
        } else {
            i = m[1] + j;
            t2 = m[0]
        }
        p = [n, i, g, t2];
        if (q.target != f || o._isMoving) {
            return
        }
        o._recover();
        b.dom.drag(f, {range: p, fix: [h._knobKey, l], ondragstart: function () {
            h.onslidestart && h.onslidestart.call(this, arguments)
        }, ondrag: function () {
            var r = o._getRealPos(f, h._knobKey);
            b.dom.setStyle(e, h._accuracyKey, o._getProcessPos(r));
            o._setCurrentValue(r);
            h.onslide && h.onslide.call(this, arguments);
            h.onchange && h.onchange.call(this, h.currentValue)
        }, ondragend: function (r, t, s) {
            s = s[h._knobKey];
            o._reset(s);
            k && o._useAdsorbr(s);
            h.onslidestop && h.onslidestop.call(this, arguments)
        }})
    }, _resize: function () {
        var i = this, j = i._info, h = j._percent || 1, g = i.getElement("inner"), f = i.getElement("view"), e;
        j.width = f.clientWidth;
        j.height = f.clientHeight;
        j._limit = g[j._val];
        e = j[j._accuracyKey];
        if (j._oppsite) {
            j._range = h < 1 ? [e * h, e] : [0, e]
        } else {
            j._range = [0, e * h]
        }
        i._setAccuracy(j.accuracy)
    }, _recover: function () {
        var h = this, k = h._info, e = h.getElement("knob"), j = h.getElement("process"), i = k._accuracyKey, g = b.dom.getStyle(e, k._knobKey), f = b.dom.getStyle(j, i);
        if (/px|auto/.test(g)) {
            return
        }
        g = parseFloat(g) / 100 * k[i] + "px";
        f = parseFloat(f) / 100 * k._limit + "px";
        b.dom.setStyle(e, k._knobKey, g);
        b.dom.setStyle(j, i, f)
    }, _reset: function (i) {
        var f = this, h = f._info, e = f.getElement("knob"), g = f.getElement("process");
        if (/%/.test(i)) {
            return
        }
        b.dom.setStyle(e, h._knobKey, f._knobPercent(i));
        b.dom.setStyle(g, h._accuracyKey, f._processPercent(f._getProcessPos(i)))
    }, _knobPercent: function (f) {
        var e = this._info;
        return parseFloat(f) / e[e._accuracyKey] * 100 + "%"
    }, _processPercent: function (e) {
        return parseFloat(e) / this._info._limit * 100 + "%"
    }, _getRealPos: function (f, e) {
        return b.dom.getStyle(f, e)
    }, _getProcessPos: function (j) {
        var g = this, h = g._info, f = h._range, e = h._limit, j = parseFloat(j) - h._const;
        if (f[0] && j < f[0]) {
            var i = f[0] - h._const;
            return i > 0 ? i + "px" : 0
        } else {
            if (j > f[1]) {
                return f[1] - h._const + "px"
            }
        }
        j < 0 && (j = 0);
        j > e && (j = e);
        h._oppsite && (j = e - j);
        return j + "px"
    }, _getKnobPos: function (g) {
        var g = parseFloat(g), f = this._info, e = f._range;
        if (f._oppsite) {
            g = g < e[0] ? e[0] : g
        } else {
            g = g > e[1] ? e[1] : g
        }
        return g + "px"
    }, _getMousePos: function () {
        var e = this.getElement("view"), g = b.page.getMousePosition(), f = b.dom.getPosition(e);
        if (this._info._mouseKey == "x") {
            return g.x - f.left
        } else {
            return g.y - f.top
        }
    }, _move: function (f, j, l) {
        var h = this, i = h._info, g = i._range, e = h._getKnobPos(l), k = h._getProcessPos(l);
        h._setCurrentValue(e);
        b.dom.setStyle(f, i._knobKey, h._knobPercent(e));
        b.dom.setStyle(j, i._accuracyKey, h._processPercent(k))
    }, _setCurrentValue: function (f) {
        var e = this._info;
        e.currentValue = parseFloat(f) / e[e._accuracyKey]
    }, _slide: function (k, f, j) {
        var g = this, i = g._info, e = g.getElement("knob"), h = g.getElement("process");
        if (g.fire("startFx", {knob: e, process: h, pos: k, fn: f})) {
            g._move(e, h, k);
            f && f()
        }
    }, _setPosition: function (l, k, i) {
        var j = this, h = j._info, g = j.getElement("knob"), f = j.getElement("process"), e = l.noAccuracy || !h.accuracy, m = function (n) {
            j._isMoving = false;
            h.onchange && h.onchange.call(j, h.currentValue)
        };
        k == i && (k = j._getMousePos());
        if (l.target === g) {
            return
        }
        j._isMoving = true;
        e ? j._slide(k, m, l.noFx) : j._useAdsorbr(k, m, l.noFx)
    }, _useAdsorbr: function (m, n, e) {
        var l = this, f = l._info, m = parseFloat(m) || 0, j = f._range, g = f._accuracyZone.slice(0), k = g.length, h = 0, q = m, p;
        if (m == 0 || m > j[1]) {
            p = m
        } else {
            if (f.accuracy) {
                for (; h < k; h++) {
                    var o = Math.abs(g[h] - m);
                    if (o <= q) {
                        q = o;
                        p = g[h]
                    }
                }
            } else {
                p = m
            }
        }
        l._slide(p, n, e)
    }, _setAccuracy: function (i) {
        var k = this._info, f = k._range, j = k._accuracyKey, h = i * k[j], e = 0, g = [0], l;
        if (i == 0) {
            k.accuracy = 0;
            delete k._accuracyZone
        }
        k.accuracy = i;
        while ((l = e + h) && l < f[1]) {
            e = l;
            g.push(l)
        }
        k._accuracyZone = g.concat(k[j])
    }, _eventControl: function (f) {
        var g = this, e = g.getElement("knob"), h = g.getElement("process");
        f = b.event.get(f);
        f.preventDefault();
        g._resize();
        if (g._info._status == "enable") {
            if (f.target == e && f.type == "mousedown") {
                g._startDrag(f)
            } else {
                if (f.type == "mousedown") {
                    g._setPosition(f)
                }
            }
        }
    }});
    a = d.control.Slider;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/Base/Base.js", "/browse_static/common/ui/magic/control/control.js"]);
F.module("/browse_static/common/ui/magic/control/Popup/Popup.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/control/Layer/Layer.js");
    d.control.Popup = b.lang.createClass(function (e) {
        var f = this;
        f.visible = false;
        f.autoHide = true;
        f.hideOnEscape = true;
        f.disposeOnHide = false;
        f.smartPosition = false;
        f.offsetX = 0;
        f.offsetY = 0;
        b.object.extend(this, e || {});
        f._parent = null;
        f._host = null;
        f._init_control_popup()
    }, {superClass: d.control.Layer, type: "magic.control.Popup"}).extend({setContent: function (e) {
        this.getElement("content").innerHTML = e
    }, attach: function (f, e) {
        if (f = b.dom.g(f)) {
            b.object.extend(this, e || {});
            this._host = f;
            this.show()
        }
    }, reposition: function (f) {
        var h = this;
        !f && h._host && (f = b.dom.getPosition(h._host));
        if (f) {
            h.top = f.top + h.offsetY + h._host.offsetHeight;
            h.left = f.left + h.offsetX;
            h._resupinate = false;
            if (h.smartPosition) {
                var i = h.getElement().offsetHeight;
                var j = b.page.getViewHeight();
                var g = b.page.getScrollTop();
                var e = f.top - h.offsetY - i;
                if (h.top + i > g + j && e > g && e < g + j) {
                    h.top = f.top - h.offsetY - i;
                    h._resupinate = true
                }
            }
        }
        h.fire("reposition");
        h.setPosition([h.left, h.top])
    }, setPosition: function (e) {
        this.setTop(e.top || e[1]);
        this.setLeft(e.left || e[0])
    }, setTop: function (e) {
        b.dom.setPixel(this.getElement(), "top", (this.top = e))
    }, setLeft: function (e) {
        b.dom.setPixel(this.getElement(), "left", (this.left = e))
    }, _init_control_popup: function () {
        var j = this;

        function f() {
            j.reposition()
        }

        function i(l) {
            b.event.getKeyCode(window.event || l) == 27 && j.hideOnEscape && j.autoHide && j.hide()
        }

        function e() {
            var l = j;
            do {
                h[l.guid] = true
            } while (l = l._parent)
        }

        var k = b.global.get("popupList");
        var h = b.global.get("popupProtect");
        j.on("show", function () {
            j.reposition();
            setTimeout(function () {
                j.guid && (k[j.guid] = true)
            }, 1);
            j._host && b.event.on(j._host, "onclick", e);
            b.event.on(j.getElement(), "onclick", e);
            b.event.on(window, "onresize", f);
            b.event.on(document, "onkeyup", i);
            j.width != "auto" && j.setWidth(j.width);
            j.height != "auto" && j.setHeight(j.height);
            j.visible = true
        });
        function g(l) {
            j.visible = false;
            delete k[j.guid];
            j._host && b.event.un(j._host, "onclick", e);
            b.event.un(j.getElement(), "onclick", e);
            b.event.un(window, "onresize", f);
            b.event.un(document, "onkeyup", i);
            l && j.dispose()
        }

        j.on("hide", function () {
            g(j.disposeOnHide)
        });
        j.on("dispose", function () {
            g(false)
        })
    }});
    (function () {
        var g = b.global.set("popupList", {}, true);
        var e = b.global.set("popupProtect", {}, true);

        function f() {
            for (var i in g) {
                var h = baiduInstance(i);
                !e[i] && h.autoHide && h.hide()
            }
            for (var i in e) {
                delete e[i]
            }
        }

        b.event.on(window, "onresize", f);
        b.event.on(window, "onscroll", f);
        b.event.on(document, "onclick", f)
    })();
    a = d.control.Popup;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Layer/Layer.js"]);
F.module("/browse_static/common/ui/magic/control/Tab/Tab.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/Base/Base.js");
    c("/browse_static/common/ui/magic/control/control.js");
    c("/browse_static/common/ui/magic/_query/_query.js");
    d.control.Tab = b.lang.createClass(function (e) {
        var g = this, f = b.fn.bind("_toggleHandler", g);
        g._options = b.object.extend({selectEvent: "click", selectDelay: 0, originalIndex: 0}, e);
        g._selectedIndex = g._options.originalIndex;
        g.on("onload", function (i) {
            var h = g.getElement(), j = d._query;
            g.mappingDom("title", j(".tang-title", h)[0]).mappingDom("body", j(".tang-body", h)[0]);
            b.event.on(g.getElement("title"), g._options.selectEvent, f);
            g.on("ondispose", function () {
                b.event.un(g.getElement("title"), g._options.selectEvent, f)
            });
            g.select(g._selectedIndex)
        })
    }, {type: "magic.control.Tab", superClass: d.Base}).extend({_toggleHandler: function (e) {
        if (b.event.getTarget(e).className == "tang-title") {
            return
        }
        var g = this, h = b.event.getTarget(e);

        function f() {
            var m = b.dom.getAncestorByClass(h, "tang-title-item"), n = b.dom.children(g.getElement("title")), j = n.length, k = 0;
            if (!m) {
                return
            }
            for (var l = 0; l < j; l++) {
                if (n[l] === m) {
                    k = l;
                    break
                }
            }
            g._selectedIndex != k && g.select(k)
        }

        if (/^(on)?mouseover$/i.test(g._options.selectEvent)) {
            clearTimeout(g._timeOut);
            g._timeOut = setTimeout(f, g._options.selectDelay)
        } else {
            f()
        }
    }, select: function (f) {
        var g = this, h = b.dom.query, i = b.dom.children(g.getElement("title")), e = b.dom.children(g.getElement("body"));
        b.dom.removeClass(i[g._selectedIndex], "tang-title-item-selected");
        b.dom.removeClass(e[g._selectedIndex], "tang-body-item-selected");
        g.fire("onbeforeselect", {index: g._selectedIndex});
        g._selectedIndex = f;
        b.dom.addClass(i[f], "tang-title-item-selected");
        b.dom.addClass(e[f], "tang-body-item-selected");
        g.fire("onselect", {index: g._selectedIndex})
    }, getCurrentTitle: function () {
        var e = this;
        return b.dom.children(e.getElement("title"))[e._selectedIndex]
    }, getCurrentContent: function () {
        var e = this;
        return b.dom.children(e.getElement("body"))[e._selectedIndex]
    }, dispose: function () {
        var e = this;
        if (e.disposed) {
            return
        }
        d.Base.prototype.dispose.call(e)
    }});
    a = d.control.Tab;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/Base/Base.js", "/browse_static/common/ui/magic/control/control.js", "/browse_static/common/ui/magic/_query/_query.js"]);
F.module("/browse_static/common/ui/magic/control/Suggestion/Suggestion.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/Popup/Popup.js");
    c("/browse_static/common/ui/magic/Base/Base.js");
    c("/browse_static/common/ui/magic/control/control.js");
    d.control.Suggestion = b.lang.createClass(function (e) {
        var f = this;
        b.object.extend(this, e || {});
        f.dataCache = {};
        f.enableIndexs = [];
        f.selectedIndex = -1;
        f.currentQuery = "";
        f.oldInputValue = "";
        f.upDownArrowTimer = null;
        f.on("onload", function () {
            var k = f.getElement("input"), l = null;
            f.oldInputValue = f.getElement("input").value;
            function h() {
                l = setInterval(function () {
                    var m = k.value;
                    if (!m && f.isShowing()) {
                        f._hide()
                    } else {
                        if (m != f.oldInputValue) {
                            m && f.fire("onneeddata", m);
                            f.oldInputValue = m
                        }
                    }
                }, 100)
            }

            h();
            var g = (function () {
                return f._keydownHandler()
            })();
            var j = function (m) {
                if (l) {
                    clearInterval(l);
                    h()
                }
                if (f.upDownArrowTimer) {
                    clearTimeout(f.upDownArrowTimer);
                    f.upDownArrowTimer = null
                }
            };
            b.event.on(k, "onkeydown", g);
            b.event.on(k, "onkeyup", j);
            f.on("onmousedownitem", function () {
                clearInterval(l);
                setTimeout(function () {
                    h()
                }, 500)
            });
            f.on("ondispose", function () {
                b.event.un(k, "onkeydown", g);
                b.event.un(k, "onkeyup", j);
                clearInterval(l)
            })
        });
        f.on("onrender", function () {
            var j = f.getElement("input"), h = f.getElement("suggestion"), g = function () {
                f.hide()
            }, k = function (m) {
                var m = m || window.event, l = m.target || m.srcElement;
                if (!f.suggestion) {
                    return
                }
                if (l == h || b.dom.contains(h, l) || l == f.getElement("input")) {
                    return
                }
                f.hide()
            };
            b.event.on(window, "blur", g);
            b.event.on(document, "onclick", k);
            f.on("ondispose", function () {
                b.event.un(window, "blur", g);
                b.event.un(document, "onclick", k)
            })
        });
        f.on("onneeddata", function (h, j) {
            var g = f.dataCache;
            f.currentQuery = j;
            if (typeof g[j] == "undefined") {
                f.getData(j)
            } else {
                f.currentData = g[j];
                (f.currentData.length > 0) ? f.show() : f.hide()
            }
        });
        f.on("beforeshow", function () {
            var j = f.currentData, h = 0, g = j.length;
            f.enableIndexs = [];
            for (; h < g; h++) {
                if (typeof j[h]["disable"] == "undefined" || j[h]["disable"] == false) {
                    f.enableIndexs.push(h)
                }
            }
        })
    }, {type: "magic.control.Suggestion", superClass: d.Base}).extend({tpl: {fix: "<div id='#{0}' class='#{1}'>#{2}</div>", body: '<table cellspacing="0" cellpadding="2" class="tang-suggestion-table"><tbody>#{0}</tbody></table>', item: '<tr><td id="#{0}" onmouseover="#{2}" onmouseout="#{3}" onmousedown="#{4}" onclick="#{5}" class="#{6}">#{1}</td></tr>'}, render: function () {
        var f = this, e = new d.Popup({autoHide: false, autoTurn: false, disposeOnHide: false});
        popupContainer = e.getElement();
        b.dom.addClass(popupContainer, "tang-suggestion-popup");
        f.mappingDom("suggestion", popupContainer);
        f.suggestion = e;
        b.dom.setAttr(f.getElement("input"), "autocomplete", "false");
        f.fire("onrender");
        return popupContainer
    }, isShowing: function () {
        var f = this, e = f.getElement("suggestion");
        return e && b.dom.getStyle(e, "display") != "none"
    }, show: function () {
        var f = this, g = f.getElement("suggestion") || f.render(), h = f.getElement("input"), e = (f.offset && f.offset.width) || h.offsetWidth;
        f.fire("beforeshow");
        f.suggestion.setContent(f._getSuggestionString());
        f.suggestion.attach(h, {offsetX: (f.offset && f.offset.offsetX) || 0, offsetY: (f.offset && f.offset.offsetY) || -1});
        b.dom.setStyle(g, "width", parseInt(e) + "px");
        b.dom.setStyle(g, "display", "block");
        f.selectedIndex = -1;
        f.fire("onshow")
    }, hide: function () {
        var h = this, e = h.getElement("suggestion");
        if (!e || !h.isShowing()) {
            return
        }
        if (h.selectedIndex >= 0 && h.holdHighLight) {
            var g = h.currentData, f = h.enableIndexs[h.selectedIndex];
            if (g[f] && (typeof g[f].disable == "undefined" || g[f].disable == false)) {
                h.pick(f)
            }
        } else {
            h.oldInputValue = h.getElement("input").value
        }
        h._hide()
    }, _hide: function () {
        var f = this, e = f.getElement("suggestion");
        b.dom.setStyle(e, "display", "none");
        f.selectedIndex = -1;
        f.fire("onhide")
    }, _getSuggestionString: function () {
        var l = this, k = "", j = [], m = l.currentData, e = m.length, h = 0, g;

        function f(n) {
            return b.format(l.tpl.fix, l.getId(n), l._getClass(n), l[n + "HTML"])
        }

        l.prependHTML && (k += f("prepend"));
        for (; h < e; h++) {
            g = "baiduInstance('" + l.guid + "')";
            j.push(b.format(l.tpl.item, l.getId("item" + h), m[h].content, g + "._mouseOver(event, " + h + ")", g + "._mouseOut(event, " + h + ")", g + "._mouseDown(event, " + h + ")", g + "._mouseClick(event, " + h + ")", (typeof m[h]["disable"] == "undefined" || m[h]["disable"] == false) ? "" : "tang-suggestion-disable"))
        }
        k += b.format(l.tpl.body, j.join(""));
        l.appendHTML && (k += f("append"));
        return k
    }, getInputValue: function () {
        return this.getElement("input").value
    }, getDataByIndex: function (e) {
        return this.currentData[e]
    }, _isEnable: function (e) {
        var f = this;
        return b.array.contains(f.enableIndexs, e)
    }, _getItemDom: function (e) {
        return b.g(this.getId("item" + e))
    }, _getClass: function (e) {
        return"tang-suggestion-" + e
    }, _focus: function (e) {
        var f = this.enableIndexs;
        this.pick(f[e]);
        this.highLight(f[e])
    }, highLight: function (f) {
        var h = this, e = h.enableIndexs, g = null;
        if (!h._isEnable(f)) {
            return
        }
        h.selectedIndex >= 0 && h.clearHighLight();
        g = h._getItemDom(f);
        b.addClass(g, "tang-suggestion-current");
        h.selectedIndex = b.array.indexOf(e, f);
        h.fire("onhighlight", {index: f, value: h.getDataByIndex(f).value})
    }, clearHighLight: function () {
        var g = this, e = g.selectedIndex, f = null;
        index = 0;
        index = g.enableIndexs[e];
        if (e >= 0) {
            f = g._getItemDom(index);
            b.removeClass(f, g._getClass("current"));
            g.selectedIndex = -1;
            g.fire("onclearhighlight", {index: index, value: g.getDataByIndex(index).value})
        }
    }, pick: function (e) {
        var h = this, g = h.currentData, f = g[e];
        if (h.fire("onbeforepick", {index: e, value: f.value})) {
            h.getElement("input").value = f.value;
            h.oldInputValue = f.value;
            h.fire("onpick", {index: e, value: f.value})
        }
    }, confirm: function (e) {
        var f = this;
        if (!f._isEnable(e)) {
            return
        }
        f.pick(e);
        f.fire("onconfirm", {index: e, value: f.getDataByIndex(e).value});
        f._hide()
    }, _wrapData: function (f) {
        var e = this;
        _data = [], i = 0, len = f.length;
        for (; i < len; i++) {
            if (typeof f[i].value != "undefined") {
                _data.push(f[i])
            } else {
                _data.push({value: f[i], content: b.string.encodeHTML(f[i])})
            }
        }
        return _data
    }, getData: function (e) {
    }, receiveData: function (h, g) {
        var f = this, e = f.cacheData(h, g);
        f.selectedIndex = -1;
        if (h == f.getInputValue()) {
            f.currentData = e;
            (g.length > 0) ? f.show() : f.hide()
        }
    }, cacheData: function (h, g) {
        var f = this, e = f._wrapData(g);
        f.dataCache[h] = e;
        return e
    }, _mouseOver: function (h, f) {
        var g = this;
        b.event.stop(h || window.event);
        if (g._isEnable(f)) {
            g.highLight(f);
            g.selectedIndex = b.array.indexOf(g.enableIndexs, f)
        }
        g.fire("onmouseoveritem", {index: f, value: g.getDataByIndex(f).value})
    }, _mouseOut: function (h, f) {
        var g = this;
        b.event.stop(h || window.event);
        if (!g.holdHighLight) {
            g._isEnable(f) && g.clearHighLight()
        }
        g.fire("onmouseoutitem", {index: f, value: g.getDataByIndex(f).value})
    }, _mouseDown: function (h, f) {
        var g = this;
        b.event.stop(h || window.event);
        g.fire("onmousedownitem", {index: f, value: g.getDataByIndex(f).value})
    }, _mouseClick: function (h, f) {
        var g = this;
        b.event.stop(h || window.event);
        g.fire("onmouseclick", {index: f, value: g.getDataByIndex(f).value});
        g.confirm(f)
    }, _keydownHandler: function () {
        var f = this;

        function e(k) {
            var j = f.getInputValue(), h = f.enableIndexs, g = f.selectedIndex;
            if (!j) {
                return
            }
            if ((j && !f.isShowing())) {
                f.fire("onneeddata", j);
                return
            }
            if (h.length == 0) {
                return
            }
            if (f.upDownArrowTimer) {
                return
            }
            f.upDownArrowTimer = setTimeout(function () {
                clearTimeout(f.upDownArrowTimer);
                f.upDownArrowTimer = null
            }, 200);
            if ("up" == k) {
                switch (g) {
                    case -1:
                        f.clearHighLight();
                        g = h.length - 1;
                        f._focus(g);
                        break;
                    case 0:
                        g = -1;
                        f.clearHighLight();
                        f.getElement("input").value = f.currentQuery;
                        f.oldInputValue = f.currentQuery;
                        break;
                    default:
                        g--;
                        f._focus(g);
                        break
                }
            } else {
                switch (g) {
                    case -1:
                        g = 0;
                        f._focus(g);
                        break;
                    case h.length - 1:
                        g = -1;
                        f.clearHighLight();
                        f.getElement("input").value = f.currentQuery;
                        f.oldInputValue = f.currentQuery;
                        break;
                    default:
                        g++;
                        f._focus(g);
                        break
                }
            }
            f.selectedIndex = g
        }

        return function (h) {
            var g = "up";
            h = h || window.event;
            switch (h.keyCode) {
                case 27:
                case 9:
                    f.hide();
                    break;
                case 13:
                    b.event.stop(h);
                    if (f.selectedIndex >= 0 && f.holdHighLight) {
                        f.confirm(f.enableIndexs[f.selectedIndex])
                    } else {
                        f.fire("onconfirm", {data: f.getInputValue()});
                        if (f.isShowing()) {
                            f._hide()
                        }
                    }
                    break;
                case 40:
                    g = "down";
                case 38:
                    b.event.stop(h);
                    e(g);
                    break;
                default:
                    break
            }
        }
    }, dispose: function () {
        var e = this;
        if (e.disposed) {
            return
        }
        if (e.suggestion) {
            e.suggestion.dispose();
            e.hide()
        }
        d.Base.prototype.dispose.call(e)
    }});
    a = d.control.Suggestion;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/Popup/Popup.js", "/browse_static/common/ui/magic/Base/Base.js", "/browse_static/common/ui/magic/control/control.js"]);
F.module("/browse_static/common/ui/magic/control/Tooltip/Tooltip.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/control/Layer/Layer.js");
    c("/browse_static/common/ui/magic/Background/$styleBox/$styleBox.js");
    d.control.Tooltip = b.lang.createClass(function (e) {
        d.control.Layer.call(this, e);
        this.offsetX = 0;
        this.offsetY = 0;
        b.object.extend(this, e)
    }, {type: "magic.control.Tootip", superClass: d.control.Layer}).extend({attach: function (e) {
        if (e = b.dom.g(e)) {
            this._host = e;
            this.show()
        }
    }, setContent: function (e) {
        this.getElement("content").innerHTML = e
    }, reposition: function (e) {
        var f = this;
        !e && f._host && (e = b.dom.getPosition(f._host));
        if (e) {
            f.top = e.top + f.offsetY + f._host.offsetHeight;
            f.left = e.left + f.offsetX
        }
        f.setPosition([f.left, f.top])
    }, setPosition: function (e) {
        this.setTop(e.top || e[1]);
        this.setLeft(e.left || e[0])
    }, setTop: function (e) {
        b.dom.setPixel(this.getElement(), "top", (this.top = e))
    }, setLeft: function (e) {
        b.dom.setPixel(this.getElement(), "left", (this.left = e))
    }});
    a = d.control.Tooltip;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Layer/Layer.js", "/browse_static/common/ui/magic/Background/$styleBox/$styleBox.js"]);
F.module("/browse_static/common/ui/magic/control/control.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    d.control = d.control || {};
    a = d.control;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js"]);
F.module("/browse_static/common/ui/magic/setup/carousel/carousel.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/setup/setup.js");
    c("/browse_static/common/ui/magic/control/Carousel/Carousel.js");
    d.setup.carousel = function (g, f) {
        var e = d.setup(b.dom.g(g), d.control.Carousel, f);
        e.fire("onload");
        return e
    };
    a = d.setup.carousel;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/setup/setup.js", "/browse_static/common/ui/magic/control/Carousel/Carousel.js"]);
F.module("/browse_static/common/ui/magic/setup/pager/pager.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/setup/setup.js");
    c("/browse_static/common/ui/magic/Pager/Pager.js");
    d.setup.pager = function (h, f) {
        h = b.dom.g(h);
        var g = f || {}, e = d.setup(h, d.Pager, f);
        e.render(h);
        return e
    };
    a = d.setup.pager;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/setup/setup.js", "/browse_static/common/ui/magic/Pager/Pager.js"]);
F.module("/browse_static/common/ui/magic/setup/background/background.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/setup/setup.js");
    c("/browse_static/common/ui/magic/Background/Background.js");
    d.setup.background = function (i, e) {
        var g = e || {};
        var f = d.setup(b.dom.g(i), d.Background, g);
        var k = f.getElement(), h = k.style, j = k.parentNode;
        h.top = "0px";
        h.left = "0px";
        h.width = f.timer ? "10px" : "100%";
        h.height = f.timer ? "10px" : "100%";
        h.position = "absolute";
        h.zIndex = -9;
        f.coverable && b.dom.insertHTML(k, "beforeend", f._coverDom || "");
        j != document.body && b.dom.getCurrentStyle(j, "position") == "static" && (j.style.position = "relative");
        return f
    };
    a = d.setup.background;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/setup/setup.js", "/browse_static/common/ui/magic/Background/Background.js"]);
F.module("/browse_static/common/ui/magic/setup/dialog/dialog.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/setup/setup.js");
    c("/browse_static/common/ui/magic/control/Dialog/Dialog.js");
    c("/browse_static/common/ui/magic/Background/Background.js");
    c("/browse_static/common/ui/magic/setup/background/background.js");
    c("/browse_static/common/ui/magic/_query/_query.js");
    d.setup.dialog = function (g, o) {
        g = b.dom.g(g);
        var f = o || {};
        var m = d.setup(g, d.control.Dialog, f);
        var k = d._query;
        var e = m.getElement();
        var n = g.childNodes;
        for (var j = 0, h = n.length; j < h; j++) {
            if (n[j].nodeType != 3 && ~n[j].className.indexOf("tang-background")) {
                d.setup.background(n[j], {coverable: true});
                break
            }
        }
        m.mappingDom("title", k(".tang-title", e)[0]);
        m.mappingDom("titleText", k("span", m.getElement("title"))[0]);
        m.mappingDom("titleButtons", k(".buttons", m.getElement("title"))[0]);
        m.mappingDom("body", k(".tang-body", e)[0]);
        m.mappingDom("content", k(".content", m.getElement("body"))[0]);
        m.mappingDom("closeBtn", k(".close-btn", m.getElement("title"))[0]);
        m.mappingDom("foreground", k(".tang-foreground", e)[0]);
        m._titleHeight = m.getElement("title").offsetHeight || 30;
        if (typeof m.left == "undefined") {
            m.left = 0
        }
        if (typeof m.top == "undefined") {
            m.top = 0
        }
        if (typeof m.width != "number") {
            m.width = e.clientWidth
        }
        if (typeof m.height != "number") {
            m.height = e.clientHeight
        }
        if (m.width < 100) {
            m.width = 100
        }
        if (m.height < 100) {
            m.height = 100
        }
        m.fire("load");
        m.show();
        if (f.titleText) {
            m.setTitleText(f.titleText)
        }
        if (f.content) {
            m.setContent(f.content, f.contentType || "html")
        }
        return m
    };
    a = d.setup.dialog;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/setup/setup.js", "/browse_static/common/ui/magic/control/Dialog/Dialog.js", "/browse_static/common/ui/magic/Background/Background.js", "/browse_static/common/ui/magic/setup/background/background.js", "/browse_static/common/ui/magic/_query/_query.js"]);
F.module("/browse_static/common/ui/magic/setup/slider/slider.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/setup/setup.js");
    c("/browse_static/common/ui/magic/control/Slider/Slider.js");
    c("/browse_static/common/ui/magic/_query/_query.js");
    d.setup.slider = function (g, f) {
        var h = d.setup(b.dom.g(g), d.control.Slider, f), i = d._query, e = h.getElement();
        h.mappingDom("view", i(".tang-view", e)[0]);
        h.mappingDom("knob", i(".tang-knob", e)[0]);
        h.mappingDom("process", i(".tang-process", e)[0]);
        h.mappingDom("inner", i(".tang-inner", e)[0]);
        h.fire("load");
        return h
    };
    a = d.setup.slider;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/setup/setup.js", "/browse_static/common/ui/magic/control/Slider/Slider.js", "/browse_static/common/ui/magic/_query/_query.js"]);
F.module("/browse_static/common/ui/magic/setup/tab/tab.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/setup/setup.js");
    c("/browse_static/common/ui/magic/control/Tab/Tab.js");
    d.setup.tab = function (g, f) {
        var e = d.setup(b.dom.g(g), d.control.Tab, f);
        e.fire("onload");
        return e
    };
    a = d.setup.tab;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/setup/setup.js", "/browse_static/common/ui/magic/control/Tab/Tab.js"]);
F.module("/browse_static/common/ui/magic/setup/suggestion/suggestion.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/setup/setup.js");
    c("/browse_static/common/ui/magic/control/Suggestion/Suggestion.js");
    d.setup.suggestion = function (g, f) {
        var g = b.dom.g(g), e = d.setup(g, d.control.Suggestion, f);
        e.mappingDom("input", g);
        e.fire("onload");
        return e
    };
    a = d.setup.suggestion;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/setup/setup.js", "/browse_static/common/ui/magic/control/Suggestion/Suggestion.js"]);
F.module("/browse_static/common/ui/magic/setup/setup.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    (function () {
        d.setup = d.setup || function (m, h, j) {
            var l = g(m, "tang-param") || {};
            for (var k in j) {
                l[k] = j[k]
            }
            var o = new h(l);
            o.mappingDom("", m);
            f(m, o.guid);
            var n = m.getElementsByTagName("*");
            for (var k = n.length - 1; k >= 0; k--) {
                f(n[k], o.guid)
            }
            return o
        };
        function g(m, h) {
            var o = m.getAttribute(h), n, l = false;
            if (o && (n = o.match(e[0]))) {
                l = {};
                for (var k = 0, j; k < n.length; k++) {
                    j = n[k].match(e[1]);
                    !isNaN(j[2]) && (j[2] = +j[2]);
                    e[2].test(j[2]) && (j[2] = j[2].replace(e[3], "\x242"));
                    e[4].test(j[2]) && (j[2] = e[5].test(j[2]));
                    l[j[1]] = j[2]
                }
            }
            return l
        }

        var e = [/\b[\w\$\-]+\s*:\s*[^;]+/g, /([\w\$\-]+)\s*:\s*([^;]+)\s*/, /\'|\"/, /^\s*(\'|\")([^\1]*)\1\s*/, /^(true|false)\s*$/i, /\btrue\b/i];

        function f(l, h) {
            var k = g(l, "tang-event");
            if (k) {
                for (var j in k) {
                    var m = k[j].substr(1);
                    m.indexOf("(") < 0 && (m += "()");
                    b.event.on(l, j, new Function("baiduInstance('" + h + "') && baiduInstance('" + h + "')" + m))
                }
            }
        }
    })();
    a = d.setup;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js"]);
F.module("/browse_static/common/ui/magic/Slider/Slider.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/control/Slider/Slider.js");
    c("/browse_static/common/ui/magic/control/Slider/Slider.js");
    d.Slider = b.lang.createClass(function (e) {
    }, {type: "magic.Slider", superClass: d.control.Slider});
    d.Slider.extend({render: function (e) {
        var f = this;
        e = b.dom.g(e);
        e || document.body.appendChild(e = document.createElement("div"));
        if (/tang-slider/.test(e.className)) {
            return
        }
        b.dom.addClass(e, "tang-ui tang-slider tang-slider-" + f._info._suffix);
        e.innerHTML = f.toHTMLString();
        f.mappingDom("", e);
        f.fire("load")
    }, toHTMLString: function () {
        var h = this, i = h._info, g = "tang-process-" + i.direction, e = i._oppsite ? "-backward" : "", f = b.string.format(d.Slider.template, {id: h.getId(), viewId: h.getId("view"), innerId: h.getId("inner"), cornerClass: e, processId: h.getId("process"), processClass: g, knobId: h.getId("knob")});
        return f
    }, dispose: function () {
        var f = this, e;
        if (f.disposed) {
            return
        }
        e = f.getElement("");
        d.Base.prototype.dispose.call(f);
        b.dom.remove(e);
        e = null
    }});
    d.Slider.template = '<div id="#{viewId}" class="tang-view"><div class="tang-content"><div class="tang-corner tang-start#{cornerClass}"></div><div class="tang-corner tang-last#{cornerClass}"></div><div id="#{innerId}" class="tang-inner"><div id="#{processId}" class="tang-process #{processClass}"></div></div></div><a id="#{knobId}" href="javascript:;" class="tang-knob"></a></div>';
    a = d.Slider;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Slider/Slider.js", "/browse_static/common/ui/magic/control/Slider/Slider.js"]);
F.module("/browse_static/common/ui/magic/Popup/Popup.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/magic.js");
    c("/browse_static/common/ui/magic/control/Popup/Popup.js");
    c("/browse_static/common/ui/magic/Background/Background.js");
    (function () {
        d.Popup = function (f) {
            var h = this;
            d.control.Popup.call(h, f);
            h.content = "";
            h.className = "";
            h.styleBox = false;
            b.object.extend(this, f || {});
            var g = e.produce();
            h.mappingDom("", g.getElement());
            h.mappingDom("content", g.getElement("content"));
            g.getElement().style.zIndex = b.global.getZIndex("popup");
            h.setContent(h.content);
            h.className && b.dom.addClass(g.getElement(), h.className);
            h.on("dispose", function () {
                h.className && b.dom.removeClass(g.getElement(), h.className);
                h.setContent("");
                g.busy = false
            })
        };
        b.lang.inherits(d.Popup, d.control.Popup, "magic.Popup");
        var e = {list: [], produce: function () {
            for (var f = 0, h = this.list.length; f < h; f++) {
                if (!this.list[f].busy) {
                    this.list[f].busy = true;
                    return this.list[f]
                }
            }
            var g = new d.Base();
            b.dom.insertHTML(document.body, "afterbegin", ["<div class='tang-popup' id='", g.getId(), "' ", "style='position:absolute; display:none;'>", (g.background = new d.Background({coverable: true})).toHTMLString(), "<div class='tang-foreground' id='", g.getId("content"), "'></div>", "</div>"].join(""));
            g.busy = true;
            this.list.push(g);
            return g
        }}
    })();
    a = d.Popup;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Popup/Popup.js", "/browse_static/common/ui/magic/Background/Background.js"]);
F.module("/browse_static/common/ui/magic/magic.js", function (b, a) {
    if (typeof c != "function") {
        var c = function () {
        }
    }
    c.resourcePath = "";
    c.skinName = "default";
    /msie 6/.test(navigator.userAgent) && document.execCommand("BackgroundImageCache", false, true);
    a = c;
    return a
}, []);
F.module("/browse_static/common/ui/eventcenter/eventcenter.js", function (d, a) {
    var c = d("/browse_static/common/lib/tangram/base/base.js");
    var b;
    var e = function () {
        return b ? b : (b = c.lang.createSingle({fireOnce: function (f, g) {
            this.fire(f, g);
            this[f + "__opts"] = g;
            this[f + "__Fired"] = true
        }, isFired: function (f) {
            return this[f + "__Fired"] == true
        }, addListener: function (f, g) {
            if (this.isFired(f)) {
                g && g.call(this, this[f + "__opts"])
            } else {
                this.on(f, g)
            }
        }}))
    };
    a.attach = function (f, h) {
        var g = window.eventCenter = window.eventCenter || e();
        if (f) {
            g.addListener(f, h)
        } else {
            h.call(null)
        }
    };
    a.trigger = function (f, g) {
        var h = window.eventCenter = window.eventCenter || e();
        g = g || {};
        if (f) {
            if (g.once) {
                h.fireOnce(f, g)
            } else {
                h.fire(f, g)
            }
        }
    };
    return a
}, ["/browse_static/common/lib/tangram/base/base.js"]);
F.module("/browse_static/common/ui/vs/client/client.js", function (c, b) {
    var a = function () {
        var f = {ie: 0, gecko: 0, webkit: 0, khtml: 0, opera: 0, ver: null};
        var d = {ie: 0, firefox: 0, safari: 0, konq: 0, opera: 0, chrome: 0, ver: null};
        var g = {win: false, mac: false, x11: false, iphone: false, ipod: false, ipad: false, ios: false, android: false, nokiaN: false, winMobile: false, wii: false, ps: false};
        var e = navigator.userAgent;
        if (window.opera) {
            f.ver = d.ver = window.opera.version();
            f.opera = d.opera = "opera" + parseFloat(f.ver)
        } else {
            if (/AppleWebKit\/(\S+)/.test(e)) {
                f.ver = RegExp["$1"];
                f.webkit = parseFloat(f.ver);
                if (/Chrome\/(\S+)/.test(e)) {
                    d.ver = RegExp["$1"];
                    d.chrome = "chrome" + parseFloat(d.ver)
                } else {
                    if (/Version\/(\S+)/.test(e)) {
                        d.ver = RegExp["$1"];
                        d.safari = "safari" + parseFloat(d.ver)
                    } else {
                        var i = 1;
                        if (f.webkit < 100) {
                            i = 1
                        } else {
                            if (f.webkit < 312) {
                                i = 1.2
                            } else {
                                if (f.webkit < 412) {
                                    i = 1.3
                                } else {
                                    i = 2
                                }
                            }
                        }
                        d.safari = d.ver = i
                    }
                }
            } else {
                if (/KHTML\/(\S+)/.test(e) || /Konqueror\/([^;]+)/.test(e)) {
                    f.ver = d.ver = RegExp["$1"];
                    f.khtml = d.konq = "konq" + parseFloat(f.ver)
                } else {
                    if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(e)) {
                        f.ver = RegExp["$1"];
                        f.gecko = "gecko" + parseFloat(f.ver);
                        if (/Firefox\/(\S+)/.test(e)) {
                            d.ver = RegExp["$1"];
                            d.firefox = "firefox" + parseFloat(d.ver)
                        }
                    } else {
                        if (/MSIE ([^;]+)/.test(e)) {
                            f.ver = d.ver = RegExp["$1"];
                            f.ie = d.ie = "ie" + parseFloat(f.ver)
                        }
                    }
                }
            }
        }
        d.ie = f.ie;
        d.opera = f.opera;
        var h = navigator.platform;
        g.win = h.indexOf("Win") == 0;
        g.mac = h.indexOf("Mac") == 0;
        g.x11 = (h == "X11") || (h.indexOf("Linux") == 0);
        if (g.win) {
            if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(e)) {
                if (RegExp["$1"] == "NT") {
                    switch (RegExp["$2"]) {
                        case"5.0":
                            g.win = "windows 2000";
                            break;
                        case"5.1":
                            g.win = "windows XP";
                            break;
                        case"6.0":
                            g.win = "windows Vista";
                            break;
                        case"6.1":
                            g.win = "windows 7";
                            break;
                        default:
                            g.win = "windows NT";
                            break
                    }
                } else {
                    if (RegExp["$1"] == "9x") {
                        g.win = "ME"
                    } else {
                        g.win = RegExp["$1"]
                    }
                }
            }
        }
        g.iphone = e.indexOf("iPhone") > -1;
        g.ipod = e.indexOf("iPod") > -1;
        g.ipad = e.indexOf("iPad") > -1;
        g.nokiaN = e.indexOf("NokiaN") > -1;
        if (g.win == "CE") {
            g.winMobile = g.win
        } else {
            if (g.win == "Ph") {
                if (/Windows Phone OS (\d+.\d+)/.test(e)) {
                    g.win = "Phone";
                    g.winMobile = parseFloat(RegExp["$1"])
                }
            }
        }
        if (g.mac && e.indexOf("Mobile") > -1) {
            if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(e)) {
                g.ios = parseFloat(RegExp.$1.replace("_", "."))
            } else {
                g.ios = 2
            }
        }
        if (/Android (\d+\.\d+)/.test(e)) {
            g.android = parseFloat(RegExp.$1)
        }
        g.wii = e.indexOf("Wii") > -1;
        g.ps = /playstation/i.test(e);
        return{engine: f, browser: d, system: g}
    }();
    b = a;
    return b
}, []);
F.module("/browse_static/common/ui/vs/DetailTip/DetailTip.js", function (f, c) {
    var e = f("/browse_static/common/lib/tangram/base/base.js");
    var g = f("/browse_static/common/ui/magic/magic.js");
    var d = f("/browse_static/common/ui/magic/control/Popup/Popup.js");
    var a = f("/browse_static/common/ui/magic/Background/Background.js");
    var h = f("/browse_static/common/ui/vs/vs.js");
    h.DetailTip = e.lang.createClass(function (k) {
        var j = this;
        j.direction = "right";
        j.autoHide = false;
        j.styleBox = true;
        j.offsetX = 12;
        j.pageS = "1600";
        j.pageTn = "index";
        j.content = "";
        j.semiSmartPosition = true;
        j.disposeOnHide = false;
        j.tipTemplate = ["<h4>#{title}</h4>", '<ul class="detail-tip-prop" static="s=#{pageS}&tn=#{pageTn}">', '<li class="detail-tip-actor"><strong>���ݣ�</strong>#{actor}</li>', '<li class="detail-tip-type"><strong>���ͣ�</strong>#{type}<b>|</b></li>', '<li class="detail-tip-area"><strong>����</strong>#{area}<b>|</b></li>', '<li class="detail-tip-date"><strong>��ӳ��</strong>#{date}</li>', "</ul>", '<p class="detail-tip-intro">#{intro}</p>', '<div class="detail-tip-rating">#{rating}</div>'].join("");
        j.linkTpls = {};
        j._init_detail_tip();
        e.dom.addClass(this.getElement(), "detail-tip");
        e.extend(j, (k || {}));
        var i = j.getElement();
        e.on(i, "mouseenter", function () {
            j._mouseOn = true
        });
        e.on(i, "mouseleave", function () {
            j._mouseOn = false;
            j.hide()
        })
    }, {superClass: d, type: "vs.DetailTip"}).extend({render: function () {
        this.setSize([this.width, this.height]);
        this.show()
    }, reposition: function (i) {
        var k = this;
        !i && k._host && (i = e.dom.getPosition(k._host));
        if (i) {
            k.top = i.top + k.offsetY;
            k.left = i.left + k.offsetX + k._host.offsetWidth;
            k._alignLeft = false;
            if (k.semiSmartPosition) {
                if (e.dom.hasClass(k._host.parentNode, "row-last")) {
                    var j = (k.width != "auto" ? k.width : k.getElement().offsetWidth);
                    k.left = i.left - (j + k.offsetX);
                    k._alignLeft = true
                }
            }
        }
        k.fire("reposition");
        k.setPosition([k.left, k.top])
    }, _init_detail_tip: function () {
        var j = this;
        var i = b.produce();
        j.mappingDom("", i.getElement());
        j.mappingDom("content", i.getElement("content"));
        i.getElement().style.zIndex = e.global.getZIndex("popup");
        j.background = new a({coverable: true, styleBox: j.styleBox});
        j.background.render(j.getElement());
        e.dom.insertHTML(j.getElement(), "afterbegin", "<div class='arrow_left'></div><div class='arrow_right'></div>");
        j.container && j.container.appendChild(i.getElement());
        j.setContent(j.content);
        if (j.height != "auto") {
            e.dom.query(".tang-foreground", j.getElement())[0].style.height = j.height - 3 + "px"
        }
        function k() {
            j.direction = "right";
            j.semiSmartPosition && j._alignLeft && (j.direction = "left");
            var l = j.getElement().className.replace(/ detail-tip-dir-\w+/g, "");
            j.getElement().className = l + " detail-tip-dir-" + j.direction
        }

        j.on("show", function () {
            k()
        });
        j.on("reposition", function () {
            k()
        });
        j.on("dispose", function () {
            var l = j.background.getElement();
            l.parentNode.removeChild(l);
            j.container && document.body.appendChild(i.getElement());
            i.busy = false
        })
    }, refreshContent: function (j) {
        var i = this._genData(j);
        this.setContent(e.string.format(this.tipTemplate, i))
    }, _genData: function (j) {
        var i = {};
        i.title = j.getAttribute("d-title");
        i.intro = j.getAttribute("d-intro");
        i.area = this._expandProps(j.getAttribute("d-area"), "area");
        i.actor = this._expandProps(j.getAttribute("d-actor"), "actor");
        i.type = this._expandProps(j.getAttribute("d-type"), "type");
        i.date = this._expandProps(j.getAttribute("d-date"), "date");
        i.rating = this._getRating(j);
        i.pageS = this.pageS;
        i.pageTn = this.pageTn;
        return i
    }, _expandProps: function (i, l) {
        i = e.string.trim(i);
        var k = [];
        var j = this.linkTpls[l] || '<a href="http://v.baidu.com/v?ct=301989888&word=#{1}" static="tiplink" target="_blank">#{0}</a>';
        e.array.each(i.split(","), function (p, o) {
            var m = p.split("-");
            k.push(e.string.format(j, m[0], m[1]))
        });
        return k.join("")
    }, _getRating: function (k) {
        var i = "";
        var j = e.dom.query(".rating", k)[0];
        if (j) {
            i = '<div class="rating">' + j.innerHTML + "</div>"
        }
        return i
    }});
    var b = {list: [], produce: function () {
        for (var j = 0, l = this.list.length; j < l; j++) {
            if (!this.list[j].busy) {
                this.list[j].busy = true;
                return this.list[j]
            }
        }
        var k = new g.Base();
        e.dom.insertHTML(document.body, "afterbegin", ["<div class='tang-tooltip' id='", k.getId(), "' ", "style='position:absolute; display:none;'>", "<div class='tang-foreground' >", "<div class='tang-foreground-inner' id='", k.getId("content"), "'></div>", "</div>", "</div>"].join(""));
        k.busy = true;
        this.list.push(k);
        return k
    }};
    h.DetailTip.bindElements = function (i, j) {
        var l;
        var k = 500;
        e.array.each(e.dom.query(i), function (o, m) {
            e.array.each(e.dom.query(".j-detailtip-target", o), function (n, p) {
                e.on(n, "mouseenter", function () {
                    clearTimeout(l);
                    l = setTimeout(function () {
                        j.refreshContent(n);
                        j.attach(n)
                    }, k)
                });
                e.on(n, "mouseleave", function () {
                    clearTimeout(l);
                    l = setTimeout(function () {
                        if (!j._mouseOn) {
                            j.hide()
                        }
                    }, k)
                })
            })
        });
        return l
    };
    c = h.DetailTip;
    return c
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Popup/Popup.js", "/browse_static/common/ui/magic/Background/Background.js", "/browse_static/common/ui/vs/vs.js"]);
F.module("/browse_static/common/ui/vs/lazyload/lazyload.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js"), e = c("/browse_static/common/ui/eventcenter/eventcenter.js"), d = c("/browse_static/common/ui/vs/scrolling/scrolling.js");
    a.init = function () {
        b.dom.ready(function () {
            var h = b.dom.query("img[data-src]");

            function f() {
                return b.page.getScrollTop() + b.page.getViewHeight() + 150
            }

            function g() {
                var k = f(), m, n, o = true;
                for (var l = 0, j = h.length; l < j; l++) {
                    n = h[l];
                    m = n.getAttribute("data-src");
                    m && (o = false);
                    if (m && b.dom.getPosition(n).top < k) {
                        n.src = m;
                        n.removeAttribute("data-src")
                    }
                }
                o && d.remove(window, g)
            }

            d(window, g);
            g();
            e.attach("common.vs.lazyLoad.check", function () {
                g()
            })
        })
    };
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/eventcenter/eventcenter.js", "/browse_static/common/ui/vs/scrolling/scrolling.js"]);
F.module("/browse_static/common/ui/vs/ABTest/ABTest.js", function (e, c) {
    var d = e("/browse_static/common/lib/tangram/base/base.js");
    var a;

    function b() {
        var i = d.cookie.get("BAIDUID"), h;
        if (i) {
            h = i.split(":")[0].match(/(\d)[^\d]*(\d)[^\d]*$/);
            if (h) {
                a = Number(h[1] + h[2]);
                return true
            }
        }
        return false
    }

    function g() {
        this.ranged = 0;
        this.isHit = false;
        if (!a) {
            this.split = function () {
            }
        }
    }

    g.prototype = {split: function (h, i) {
        if (!this.isHit) {
            if (typeof h === "object" && typeof i === "object") {
                this._splits(h, i)
            } else {
                this._hitting(h, i)
            }
        }
    }, _splits: function (j, l) {
        for (var k = 0, h = j.length; k < h; k++) {
            if (this._hitting(j[k], l[k])) {
                break
            }
        }
    }, _hitting: function (h, i) {
        if (typeof h === "number" && typeof i === "function") {
            this.ranged += h;
            if (a < this.ranged) {
                this.isHit = true;
                i()
            }
        }
        return this.isHit
    }};
    var f = {};
    f.create = function (i, h) {
        if (typeof i === "object") {
            h = i
        }
        if (typeof a !== "number" && !b() && h && typeof h.onerror === "function") {
            h.onerror()
        }
        var j = new g();
        if (typeof i === "string" && !f.hasOwnProperty(i)) {
            f[i] = j
        }
        return j
    };
    c = f;
    return c
}, ["/browse_static/common/lib/tangram/base/base.js"]);
F.module("/browse_static/common/ui/vs/vipConfig/vipConfig.js", function (b, a) {
    a.sites = {"wasu.cn": "http://uc.wasu.cn/member/index.php/Proxy/core?link={url}", "letv.com": "http://sso.letv.com/oauth/baidu?next_action={url}", "baofeng.com": "http://hd.baofeng.com/?c=ThirdPartner&a=vipbaidu&next_action={url}"};
    a.sites.order = ["letv.com", "baofeng.com", "wasu.cn"];
    var c = {tv: ",16952,16953,16954,17413,19783,16967,19732,19784,20259,16957,16992,19693,18374,18375,18410,19489,19492,19493,19491,19694,"};
    c.tvplay = c.tv;
    a.filterWork = function (d, e) {
        if (c[d] && c[d].indexOf("," + e + ",") > -1) {
            return true
        }
        return false
    };
    return a
}, []);
F.module("/browse_static/common/ui/vs/showFeedBack/showFeedBack.js", function (a, d) {
    var c = a("/browse_static/common/lib/tangram/base/base.js");
    var b = a("/browse_static/common/ui/vs/client/client.js");
    var g = a("/browse_static/common/ui/vs/utility/dialog/dialog.js");
    var j = b.browser.ie || b.browser.chrome || b.browser.safari || b.browser.firefox || b.browser.konq || b.browser.opera;
    var f = b.system.win || b.system.mac || b.system.x11;
    if (document.getElementById("user_name")) {
        var e = document.getElementById("user_name").innerHTML
    } else {
        var e = " "
    }
    var i = new Date;

    function h() {
        if (v) {
            v.show()
        } else {
            var o = ['<div id="feedback">', '<div id="closeBtn" onmousedown="event.stopPropagation && event.stopPropagation(); event.cancelBubble = true; return false;"></div>', ' <iframe name="postpage" style="height:0;width:0;display:block;border:none;" src="about:blank"></iframe>', ' <form id="feedbackForm" action="http://qingting.baidu.com/api_video/add" method="post"  accept-charset="utf-8" target="postpage" >', "<h2><span>1</span>��ѡ��������ࣺ</h2>", '<div id="tab" class="tang-ui tang-tab" tang-param="originalIndex: 0;">', '<ul class="tang-title" id="tang-title">', '<li class="tang-title-item tang-title-item-selected"  default-value="��Ʒ����"> <a href="#" onClick="return false;" hidefocus="true"><span>��Ʒ����</span></a> </li>', '<li class="tang-title-item" default_value="��Ϣ����"> <a href="#" onClick="return false;" hidefocus="true" ><span>��Ϣ����</span></a> </li>', '<li class="tang-title-item" default_value="���Ų���"> <a href="#" onClick="return false;" hidefocus="true" ><span>���Ų���</span></a> </li>', '<li class="tang-title-item" default_value="��������"> <a href="#" onClick="return false;" hidefocus="true" ><span>��������</span></a> </li>', '<li class="tang-title-item" default_value="Ͷ����������"> <a href="#" onClick="return false;" hidefocus="true" ><span>Ͷ����������</span></a> </li>', "</ul>", '<div class="tang-body" id="tang-body">', '<div class="tang-body-item tang-body-item-selected">', '<textarea default-value="�����ǵĲ�Ʒ��ʲô���飬��ӭ����Ŷ~" maxlength="1000" class="textarea" id="textarea" value="�����ǵĲ�Ʒ��ʲô���飬��ӭ����Ŷ~">�����ǵĲ�Ʒ��ʲô���飬��ӭ����Ŷ~</textarea>', "</div>", "</div>", "</div>", "<h2><span>2</span>��������ϵ��ʽ�����л���þ�����Ʒ��</h2>", '<div class="feedback-contact" id="feedback-contact">', '<div class="box">', '<input type="text" value="QQ/����/�绰" default-value="QQ/����/�绰" name="contact" maxlength="50" id="qq"/>', "</div>", '<div class="des"> (��ѡ) </div>', '<div style="clear:both;"></div>', "</div>", '<div class="sub-btn" id="sub-btn"></div>', '<input type="hidden" name="message_fake" />', '<input type="hidden" name="pd" value="video_pc_dl" />', '<input type="hidden" name="brower" />', '<input type="hidden" name="soft" />', '<input type="hidden" name="user" />', '<input type="hidden" name="time" />', '<input type="hidden" name="referer" />', '<input type="hidden" name="message" />', "</form>", "</div>", ];
            var B = c.string.format(o.join(""));
            var v = new g(B, {fixed: true, mask: true});
            v.show()
        }
        c.event.on("closeBtn", "click", function (s) {
            c.event.preventDefault(s);
            v.hide()
        });
        var y = c.dom.g("qq");
        c.event.on(y, "focus", function (C) {
            c.dom.addClass(this, "focus");
            var s = c.dom.getAttr(this, "default-value");
            if (this.value == s) {
                this.value = ""
            }
        });
        c.event.on(y, "blur", function (C) {
            var s = c.dom.getAttr(this, "default-value");
            if (this.value == "") {
                this.value = s;
                c.dom.removeClass(this, "focus")
            }
        });
        function m(s) {
            var D = 0;
            var C = s.previousSibling;
            while (C) {
                if (C.nodeType == 1) {
                    D++
                }
                C = C.previousSibling
            }
            return D
        }

        var l = document.getElementById("tang-title").getElementsByTagName("li");
        for (var q = 0; q < l.length; q++) {
            l[q].onclick = w
        }
        var u = [
            ["�����ǵĲ�Ʒ��ʲô���飬��ӭ����Ŷ~"],
            ["Ƭ����Ա��ͼƬ����Ϣ���?���ǻᾡ�����"],
            ["��Ƶ������ţ����������ﷴ��"],
            ["����������Ҫ�Ľ���Խ�����⣬���Ը�������"],
            ["���д�����١����桢��Ч���ӣ��뷴��ҳ���ַ������"]
        ];
        var A = "��Ʒ����";
        var z = document.getElementById("textarea");

        function w() {
            A = this.getAttribute("default_value");
            var E = z.getAttribute("default-value");
            var s = m(this);
            for (var D = 0; D < l.length; D++) {
                c.dom.removeClass(l[D], "tang-title-item-selected")
            }
            c.dom.addClass(this, "tang-title-item-selected");
            z.setAttribute("default-value", u[s]);
            if (z.value == E) {
                z.value = u[s]
            }
            var C = /ie/g;
            if (z.value != z.innerHTML || z.value == z.innerHTML) {
                if (C.test(j)) {
                    z.innerHTML == z.value
                } else {
                    z.innerHTML = u[s]
                }
            } else {
                z.innerHTML == z.value
            }
        }

        var x = document.getElementById("tang-body").getElementsByTagName("textarea");
        for (var q = 0; q < x.length; q++) {
            x[q].onfocus = k
        }
        for (var q = 0; q < x.length; q++) {
            x[q].onblur = t
        }
        function k() {
            c.dom.addClass(this, "focus");
            var s = c.dom.getAttr(this, "default-value");
            if (this.value == s) {
                this.value = ""
            }
        }

        function t() {
            var s = c.dom.getAttr(this, "default-value");
            if (this.value == "") {
                this.value = s;
                c.dom.removeClass(this, "focus")
            }
        }

        var n = c.dom.g("textarea");
        var p = "";
        var r = true;
        c.event.on("sub-btn", "click", function (E) {
            var D = n.getAttribute("default-value");
            if (n.value != D) {
                r = false
            }
            if (r == true) {
                alert("�������ݲ���Ϊ�գ�")
            } else {
                p = n.value;
                var C = c.dom.g("feedbackForm");
                C.message_fake.value = encodeURI(p);
                C.brower.value = j;
                C.soft.value = f;
                C.user.value = encodeURI(e);
                C.referer.value = document.location.href;
                C.time.value = i;
                C.message.value = encodeURI(A);
                C.submit();
                alert("�ύ�ɹ�!");
                var s = document.getElementById("deadlink-feedback-tip");
                if (s) {
                    s.innerHTML = "�����ɹ�,лл��";
                    s.id = "deadlink-feedback-tip-ok";
                    s.className = "feedbackok"
                }
                p = "";
                v.hide()
            }
        })
    }

    d = h;
    return d
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/vs/client/client.js", "/browse_static/common/ui/vs/utility/dialog/dialog.js"]);
F.module("/browse_static/common/ui/vs/vipRegisterPopup/vipRegisterPopup.js", function (a, c) {
    var b = a("/browse_static/common/lib/tangram/core/core.js"), e = a("/browse_static/common/ui/eventcenter/eventcenter.js"), i = a("/browse_static/common/ui/vs/tmpl/tmpl.js").parse, h = a("/browse_static/common/ui/vs/utility/dialog/dialog.js"), g = a("/browse_static/common/ui/vs/loginCheck/loginCheck.js"), f = a("/browse_static/common/ui/vs/bdPassPop/bdPassPop.js");
    var d = '<div id="vipRegisterPopup" class="<%=(islogin ? "logged" : "login")%>" style="display:none;">	<% if ( islogin ) { %>	<div class="vip-user">		<div class="vip-userinfo">			<img src="http://himg.bdimg.com/sys/portrait/item/<%=userinfo.portrait%>.jpg" alt="" class="portrait" />			<p class="name" title="<%=userinfo.value%>"><span class="s-name"><%=userinfo.value%></span><b></b></p>			<div class="user-links">				<a href="http://www.baidu.com/p/setting/profile/basic" target="_blank">�޸�����</a>				<a href="http://v.baidu.com/vip/order/" target="_blank">������¼</a>			</div>		</div>		<div class="vip-links">			<a href="http://v.baidu.com/vip/radar/" target="_blank">�����״�</a>			<a href="http://v.baidu.com/vip/myradar/" target="_blank">�״��ղ�</a>		</div>	</div>	<% } else { %>	<div class="vip-des">		<h3>VIP��Ȩ</h3>		<dl>			<dt>�����״�</dt>			<dd>�����㸽��ľ�����Ƶ</dd>			<dt>�״��ղ�</dt>			<dd>�ղ�ϲ������Ƶ</dd>		</dl>		<a href="javascript:void(0);" class="link-login">��¼�������</a>	</div>	<% } %>	<div class="vip-super-des">		<h3>����VIP��Ȩ</h3>		<dl>			<dt>VIP�����Ƭ</dt>			<dd>���������Ƭ���Ŀ���</dd>			<dt>��Ƶȥ���</dt>			<dd>����Ӱ�����Ӿ硢���ա��������޹�棡</dd>			<dt>�����״�</dt>			<dd>�����㸽��ľ�����Ƶ</dd>			<dt>�״��ղ�</dt>			<dd>�ղ�ϲ������Ƶ</dd>		</dl>		<a href="http://v.baidu.com/vip/payment/" target="_blank" class="link-pay">��������</a>	</div>	<a href="javascript:void(0)" class="dialog-close"></a></div>';
    var j = {init: function (k) {
        var l = this;
        g(function (m) {
            var n = m && m.value;
            b(function () {
                b(document.body).append(i(d, {islogin: n, userinfo: m}));
                l.dialog = new h("vipRegisterPopup", {mask: true});
                if (!n) {
                    b("#vipRegisterPopup .link-login").click(function (o) {
                        o.preventDefault();
                        l.dialog.hide();
                        f.show()
                    })
                }
                k && l.dialog.show()
            })
        });
        this._isinit = true
    }, show: function () {
        if (!this._isinit) {
            this.init(true)
        } else {
            this.dialog.show()
        }
    }, hide: function () {
        this.dialog.hide()
    }};
    c = j;
    return c
}, ["/browse_static/common/lib/tangram/core/core.js", "/browse_static/common/ui/eventcenter/eventcenter.js", "/browse_static/common/ui/vs/tmpl/tmpl.js", "/browse_static/common/ui/vs/utility/dialog/dialog.js", "/browse_static/common/ui/vs/loginCheck/loginCheck.js", "/browse_static/common/ui/vs/bdPassPop/bdPassPop.js"]);
F.module("/browse_static/common/ui/vs/subDetailTip/subDetailTip.js", function (f, c) {
    var e = f("/browse_static/common/lib/tangram/base/base.js");
    var g = f("/browse_static/common/ui/magic/magic.js");
    var d = f("/browse_static/common/ui/magic/control/Popup/Popup.js");
    var a = f("/browse_static/common/ui/magic/Background/Background.js");
    var h = f("/browse_static/common/ui/vs/vs.js");
    h.DetailTip = e.lang.createClass(function (k) {
        var j = this;
        j.direction = "right";
        j.autoHide = false;
        j.styleBox = true;
        j.offsetX = 12;
        j.pageS = "1600";
        j.pageTn = "index";
        j.content = "";
        j.semiSmartPosition = true;
        j.disposeOnHide = false;
        j.tipTemplate = ["<h4>#{title}</h4>", '<ul class="detail-tip-prop" static="s=#{pageS}&tn=#{pageTn}">', '<li class="detail-tip-actor"><strong>���ݣ�</strong>#{actor}</li>', '<li class="detail-tip-type"><strong>���ͣ�</strong>#{type}<b>|</b></li>', '<li class="detail-tip-area"><strong>����</strong>#{area}<b>|</b></li>', '<li class="detail-tip-date"><strong>��ӳ��</strong>#{date}</li>', "</ul>", '<p class="detail-tip-intro">#{intro}</p>', '<div class="detail-tip-rating">#{rating}</div>'].join("");
        j.linkTpls = {};
        j._init_detail_tip();
        e.dom.addClass(this.getElement(), "detail-tip");
        e.extend(j, (k || {}));
        var i = j.getElement();
        e.on(i, "mouseenter", function () {
            j._mouseOn = true
        });
        e.on(i, "mouseleave", function () {
            j._mouseOn = false;
            j.hide()
        })
    }, {superClass: d, type: "vs.DetailTip"}).extend({render: function () {
        this.setSize([this.width, this.height]);
        this.show()
    }, reposition: function (i) {
        var k = this;
        !i && k._host && (i = e.dom.getPosition(k._host));
        if (i) {
            k.top = i.top + k.offsetY;
            k.left = i.left + k.offsetX + k._host.offsetWidth;
            k._alignLeft = false;
            if (k.semiSmartPosition) {
                if (e.dom.hasClass(k._host.parentNode, "row-last")) {
                    var j = (k.width != "auto" ? k.width : k.getElement().offsetWidth);
                    k.left = i.left - (j + k.offsetX);
                    k._alignLeft = true
                }
            }
        }
        k.fire("reposition");
        k.setPosition([k.left, k.top])
    }, _init_detail_tip: function () {
        var j = this;
        var i = b.produce();
        j.mappingDom("", i.getElement());
        j.mappingDom("content", i.getElement("content"));
        i.getElement().style.zIndex = e.global.getZIndex("popup");
        j.background = new a({coverable: true, styleBox: j.styleBox});
        j.background.render(j.getElement());
        e.dom.insertHTML(j.getElement(), "afterbegin", "<div class='arrow_left'></div><div class='arrow_right'></div>");
        j.container && j.container.appendChild(i.getElement());
        j.setContent(j.content);
        if (j.height != "auto") {
            e.dom.query(".tang-foreground", j.getElement())[0].style.height = j.height - 3 + "px"
        }
        function k() {
            j.direction = "right";
            j.semiSmartPosition && j._alignLeft && (j.direction = "left");
            var l = j.getElement().className.replace(/ detail-tip-dir-\w+/g, "");
            j.getElement().className = l + " detail-tip-dir-" + j.direction
        }

        j.on("show", function () {
            k()
        });
        j.on("reposition", function () {
            k()
        });
        j.on("dispose", function () {
            var l = j.background.getElement();
            l.parentNode.removeChild(l);
            j.container && document.body.appendChild(i.getElement());
            i.busy = false
        })
    }, refreshContent: function (j) {
        var i = this._genData(j);
        this.setContent(e.string.format(this.tipTemplate, i))
    }, _genData: function (j) {
        var i = {};
        i.title = j.getAttribute("d-title");
        i.intro = j.getAttribute("d-intro");
        i.area = this._expandProps(j.getAttribute("d-area"), "area");
        i.actor = this._expandProps(j.getAttribute("d-actor"), "actor");
        i.type = this._expandProps(j.getAttribute("d-type"), "type");
        i.date = this._expandProps(j.getAttribute("d-date"), "date");
        i.noactor = this._expandProps(j.getAttribute("d-noactor"), "noactor");
        i.nodate = this._expandProps(j.getAttribute("d-nodate"), "nodate");
        i.rating = this._getRating(j);
        i.pageS = this.pageS;
        i.pageTn = this.pageTn;
        return i
    }, _expandProps: function (i, l) {
        i = e.string.trim(i);
        var k = [];
        var j = this.linkTpls[l] || '<a href="http://v.baidu.com/v?ct=301989888&word=#{1}" static="tiplink" target="_blank">#{0}</a>';
        e.array.each(i.split(","), function (p, o) {
            var m = p.split("-");
            k.push(e.string.format(j, m[0], m[1]))
        });
        return k.join("")
    }, _getRating: function (k) {
        var i = "";
        var j = e.dom.query(".rating", k)[0];
        if (j) {
            i = '<div class="rating">' + j.innerHTML + "</div>"
        }
        return i
    }});
    var b = {list: [], produce: function () {
        for (var j = 0, l = this.list.length; j < l; j++) {
            if (!this.list[j].busy) {
                this.list[j].busy = true;
                return this.list[j]
            }
        }
        var k = new g.Base();
        e.dom.insertHTML(document.body, "afterbegin", ["<div class='tang-tooltip' id='", k.getId(), "' ", "style='position:absolute; display:none;'>", "<div class='tang-foreground' >", "<div class='tang-foreground-inner' id='", k.getId("content"), "'></div>", "</div>", "</div>"].join(""));
        k.busy = true;
        this.list.push(k);
        return k
    }};
    h.DetailTip.bindElements = function (i, j) {
        var l;
        var k = 500;
        e.array.each(e.dom.query(i), function (o, m) {
            e.array.each(e.dom.query(".j-detailtip-target", o), function (n, p) {
                e.on(n, "mouseenter", function () {
                    clearTimeout(l);
                    l = setTimeout(function () {
                        j.refreshContent(n);
                        j.attach(n)
                    }, k)
                });
                e.on(n, "mouseleave", function () {
                    clearTimeout(l);
                    l = setTimeout(function () {
                        if (!j._mouseOn) {
                            j.hide()
                        }
                    }, k)
                })
            })
        });
        return l
    };
    c = h.DetailTip;
    return c
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/magic.js", "/browse_static/common/ui/magic/control/Popup/Popup.js", "/browse_static/common/ui/magic/Background/Background.js", "/browse_static/common/ui/vs/vs.js"]);
F.module("/browse_static/common/ui/vs/statistics/statistics.js", function (require, exports) {
    var T = require("/browse_static/common/lib/tangram/base/base.js");
    var statistics = function () {
        T.dom.ready(function () {
            (function (win) {
                var _cache = {}, V = win.V = {cache: {set: function (key, value) {
                    return _cache[key] = value
                }, remove: function (key) {
                    delete _cache[key]
                }, get: function (key) {
                    return _cache[key]
                }}}, _global = {logImgSrc: "http://nsclick.baidu.com/v.gif", logParams: "pid=104"}, _data = {}, _pending = {}, util = T.lang;
                util.each = T.array.each;
                function _getModule(name) {
                    var nameArr = name.split("."), mod = nameArr[0];
                    name = name.replace(mod, "").replace(/^\.*/, "");
                    return{name: name, mod: mod}
                }

                V.addEventListener = function (name, func) {
                    var _mod = _getModule(name), name = _mod.name, mod = _mod.mod, arg = [].slice.call(arguments, 1);
                    _data[mod] = _data[mod] ? _data[mod] : {};
                    _data[mod][name] = _data[mod][name] ? _data[mod][name] : [];
                    _data[mod][name].push(func);
                    if (_pending[mod] && _pending[mod][name]) {
                        func.apply(this, _pending[mod][name]);
                        delete _pending[mod][name]
                    }
                };
                V.dispatch = function (name) {
                    var _mod = _getModule(name), name = _mod.name, mod = _mod.mod, arg = [].slice.call(arguments, 1);
                    if (_data[mod] && _data[mod][name] && _data[mod][name].length > 0) {
                        util.each(_data[mod][name], function (item) {
                            item.apply(this, arg)
                        });
                        return
                    } else {
                        _pending[mod] = _pending[mod] ? _pending[mod] : {};
                        _pending[mod][name] = arg
                    }
                };
                V.removeEventListener = function (name, func) {
                    var _mod = _getModule(name), name = _mod.name, mod = _mod.mod, ret = [];
                    if (_data[mod] && _data[mod][name]) {
                        util.each(_data[mod][name], function (item) {
                            if (item.toString() != func.toString()) {
                                ret.push(item)
                            }
                        });
                        _data[mod][name] = ret
                    }
                };
                V.loadImg = function (src, callback) {
                    if (!src) {
                        return
                    }
                    var t = new Date().getTime(), img = window["V_fix_img" + t] = new Image(), i = 0;
                    img.onload = img.onerror = img.onabort = function () {
                        callback && callback(img);
                        img.onload = img.onerror = img.onabort = null;
                        try {
                            delete window["V_fix_img" + t];
                            img = null
                        } catch (e) {
                            img = null
                        }
                    };
                    img.src = src + "&r=" + t
                };
                function statisic(ev, options) {
                    if (options) {
                        options.logParams && (_global.logParams = options.logParams);
                        options.logImgSrc && (_global.logImgSrc = options.logImgSrc)
                    }
                    src = (options && options.logImgSrc) ? options.logImgSrc : _global.logImgSrc;
                    var ev = ev || win.event, enc = encodeURIComponent, el = ev.srcElement || ev.target, href, title, returns, statisic, partStatic, queryStr = "", paramStr = "", i = 0, cmd, tagName = el.tagName.toUpperCase();
                    if (tagName != "A") {
                        if (tagName == "INPUT") {
                            if (el.type.toLowerCase() === "text") {
                                return
                            }
                        } else {
                            if (el.parentNode.tagName.toUpperCase() === "A") {
                                el = el.parentNode
                            } else {
                                if (el.parentNode.parentNode) {
                                    if (el.parentNode.parentNode.tagName && el.parentNode.parentNode.tagName.toUpperCase() === "A") {
                                        el = el.parentNode.parentNode
                                    } else {
                                        if (el.parentNode.parentNode.parentNode) {
                                            if (el.parentNode.parentNode.parentNode.tagName && el.parentNode.parentNode.parentNode.tagName.toUpperCase() === "A") {
                                                el = el.parentNode.parentNode.parentNode
                                            } else {
                                                return
                                            }
                                        } else {
                                            return
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (el.getAttribute("data-static")) {
                        return
                    }
                    href = el.href || el.getAttribute("href", 2) || (el.value ? el.value : "");
                    title = el.getAttribute("title", 2) || el.innerHTML;
                    if (href && !(/^(javascript|#)/.test(href))) {
                        href = href
                    } else {
                        href = ""
                    }
                    if (title && !(/^\s*</i.test(title)) && !(/>\s*$/i.test(title))) {
                        title = title
                    } else {
                        title = ""
                    }
                    if (typeof _global.logParams !== "string") {
                        try {
                            for (var p in _global.logParams) {
                                paramStr += (i == 0 ? "" : "&") + p + "=" + _global.logParams[p];
                                i++
                            }
                        } catch (e) {
                        }
                    } else {
                        paramStr = _global.logParams
                    }
                    statisic = el.getAttribute("static", 2) || "";
                    partStatic = getParentAttr(el, "static") || null;
                    statisic = (paramStr === "" ? "" : paramStr + "&") + (partStatic ? partStatic + "&" : "") + statisic;
                    statisic = statisic.match(/(?:[^&|^=]+=[^&]+)/g).join("&");
                    clt = T.url.getQueryValue(statisic, "clt") || null;
                    if (clt && !V.cache.get("STATISIC_" + clt) && PAGE_DOM_READY_TIME) {
                        var clTime = (new Date()).getTime() - PAGE_DOM_READY_TIME;
                        V.cache.set("STATISIC_" + clt, clt)
                    }
                    queryStr = statisic;
                    if (!/&?ti=([^&]+)?/.test(queryStr) && title) {
                        queryStr += ("&ti=" + enc(title))
                    }
                    if (!/&?u=([^&]+)?/.test(queryStr) && href) {
                        queryStr += ("&u=" + enc(href))
                    }
                    if (clTime) {
                        queryStr += ("&clti=" + clTime)
                    }
                    cmd = el.getAttribute("cmd") || null;
                    if (cmd) {
                        try {
                            var tempFun = eval(cmd);
                            if (T.lang.isFunction(tempFun)) {
                                var tempStr = tempFun(el, queryStr);
                                if (T.lang.isString(tempStr)) {
                                    queryStr = tempStr
                                }
                            }
                        } catch (e) {
                        }
                    }
                    str = src + "?" + queryStr;
                    V.loadImg(str);
                    function getParentAttr(domEl, attr, deep) {
                        deep = deep || 10;
                        domEl = domEl.parentNode;
                        if (!domEl || domEl === document.body || domEl == document.documentElement) {
                            return
                        }
                        var attribute = domEl.getAttribute(attr) || null, _i = 0;
                        if (!attribute) {
                            while (domEl && domEl !== document.body && domEl !== document.documentElement && domEl.getAttribute && !attribute && domEl.parentNode && domEl.parentNode.getAttribute && _i <= deep) {
                                domEl = domEl.parentNode;
                                attribute = domEl.getAttribute(attr) || null;
                                _i += 1
                            }
                        }
                        return attribute
                    }
                }

                V.nsclick = statisic;
                V.nsclick.setParam = function (key, value) {
                    if (T.lang.isString(_global.logParams)) {
                        var re = new RegExp("[&|?]" + key + "=[^&]+");
                        _global.logParams = _global.logParams.replace(re, "");
                        _global.logParams += "&" + key + "=" + value
                    } else {
                        _global.logParams[key] = value
                    }
                };
                V.nsclick.concatStr = function (str) {
                    str = str.replace(/^&/, "");
                    _global.logParams += "&" + str
                };
                V.nsclick.extString = function (str) {
                    var params = str.split("&"), param, i = 0, l = params.length;
                    for (; i < l; i += 1) {
                        param = params[i].split("=");
                        if (param.length === 2) {
                            V.nsclick.setParam(param[0], param[1])
                        }
                    }
                };
                T.on(document.body, "mousedown", V.nsclick)
            })(window)
        })
    }();
    return exports
}, ["/browse_static/common/lib/tangram/base/base.js"]);
F.module("/browse_static/common/ui/vs/bdPassPop/bdPassPop.js", function (c, e) {
    var d = c("/browse_static/common/lib/tangram/core/core.js"), g = c("/browse_static/common/ui/eventcenter/eventcenter.js");
    var h;
    var a = function () {
        location.reload()
    };
    var i = a;
    var f = false;

    function b() {
        d.sio("http://passport.baidu.com/passApi/js/uni_login_wrapper.js?cdnversion=" + new Date().getTime()).callByBrowser(function () {
            h = passport.pop.init({authsite: ["tsina", "renren", "qzone"], apiOpt: {staticPage: "http://" + location.host + "/browse_static/common/html/v3Jump.html", product: "vd", charset: "GBK", u: window.location.href, memberPass: true, safeFlag: 0}, cache: false, authsiteCfg: {act: "implicit"}, tangram: true, onLoginSuccess: function (j) {
                j.returnValue = false;
                i()
            }});
            h.show()
        })
    }

    e.show = function (j) {
        i = typeof j === "function" ? j : a;
        if (f) {
            h.show()
        } else {
            b();
            f = true
        }
    };
    e.hide = function () {
        if (f) {
            h.hide()
        }
    };
    return e
}, ["/browse_static/common/lib/tangram/core/core.js", "/browse_static/common/ui/eventcenter/eventcenter.js"]);
F.module("/browse_static/common/ui/vs/scrolling/scrolling.js", function (e, g) {
    var k = (window.addEventListener !== undefined) ? "addEventListener" : "attachEvent", d = (window.removeEventListener !== undefined) ? "removeEventListener" : "detachEvent", h = (k !== "addEventListener") ? "onscroll" : "scroll", c = false, l = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (o) {
            window.setTimeout(o, 1000 / 60)
        }
    }()), b, m, j;

    function n(o) {
        if (!c) {
            c = true;
            b = this;
            j = o || window.e;
            l(f)
        }
    }

    function f() {
        var p = 0, q = m._collection[b].listeners, o = q.length;
        for (p; p < o; p += 1) {
            q[p] && q[p].call(b, j)
        }
        b = undefined;
        c = false
    }

    function a() {
        this.initialize();
        return this
    }

    a.prototype.initialize = function () {
        this._collection = {};
        return this
    };
    a.prototype.add = function (o, p) {
        if ("function" === typeof o) {
            p = o;
            o = window
        }
        if (this._collection[o] === undefined) {
            this._collection[o] = {listeners: []};
            o[k](h, n, false)
        }
        this._collection[o].listeners.push(p);
        return this
    };
    a.prototype.remove = function (r, s) {
        var q = this._collection[r].listeners, p = 0, o = q.length;
        if (o !== undefined) {
            for (p; p < o; p += 1) {
                if (q[p] === s) {
                    q.splice(p, 1);
                    break
                }
            }
        }
        if (q.length === 0 || s === undefined) {
            r[d](h, n, false);
            delete this._collection[r]
        }
        return this
    };
    m = new a();
    function i(o, p) {
        m.add(o, p);
        return i
    }

    i.remove = function (o, p) {
        m.remove(o, p);
        return i
    };
    g = i;
    return g
}, []);
F.module("/browse_static/common/ui/vs/SiteList/SiteList.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = c("/browse_static/common/ui/magic/Popup/Popup.js");
    var e = c("/browse_static/common/ui/vs/vs.js");
    e.SiteList = b.lang.createClass(function (f) {
        b.dom.addClass(this.getElement(), "site-list-popup");
        f = f || {};
        this._targetClass = f.targetClass || "site-list-wrapper"
    }, {superClass: d, type: "vs.SiteList"}).extend({showByBtn: function (f) {
        var g = b.dom.q(this._targetClass, f.parentNode)[0];
        if (g) {
            this._setContentWithTarget(g);
            this.attach(g, {offsetX: -10, offsetY: -28, width: 170, smartPosition: true})
        }
        this.fire("onshowbybtn")
    }, _setContentWithTarget: function (f) {
        this.setContent(f.innerHTML)
    }});
    a = e.SiteList;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/Popup/Popup.js", "/browse_static/common/ui/vs/vs.js"]);
F.module("/browse_static/common/ui/vs/utility/mask/mask.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");

    function d(e) {
        this.config = b.object.extend({bgColor: "#000000", opacity: 0.15, zIndex: 66665}, e)
    }

    d.prototype = {show: function () {
        if (!this.isInit) {
            this._init()
        }
        this._setSize();
        this.container.style.display = "block";
        b.on(window, "resize", this.resizeHandler || (this.resizeHandler = this._createResizeHandler()))
    }, hide: function () {
        this.container.style.display = "none";
        b.un(window, "resize", this.resizeHandler)
    }, _init: function () {
        var f = document.createElement("div"), e = this.config;
        f.innerHTML = '<ifrmae frameborder=0 src="javascript:;" style="position:absolute;top:0;left:0;width:100%;height:100%;filter:progid:DXImageTransform.Microsoft.Alpha(opacity:0);opacity:0"></iframe>';
        b.dom.setStyles(f, {display: "none", position: "absolute", top: "0", left: "0", zIndex: e.zIndex, background: e.bgColor, opacity: e.opacity});
        b.dom.insertBefore(f, document.body.firstChild);
        this.container = f;
        this.isInit = true
    }, _setSize: function () {
        b.dom.setStyles(this.container, {width: b.page.getWidth(), height: b.page.getHeight()})
    }, _createResizeHandler: function () {
        var f = this, e = function () {
            f.hide();
            f._setSize();
            f.show()
        };
        return e
    }};
    a = d;
    return a
}, ["/browse_static/common/lib/tangram/base/base.js"]);
F.module("/browse_static/common/ui/vs/utility/dialog/dialog.js", function (d, b) {
    var c = d("/browse_static/common/lib/tangram/base/base.js"), g = d("/browse_static/common/ui/vs/utility/mask/mask.js");

    function e(h) {
        if (h.nodeName && (h.nodeType == 1 || h.nodeType == 9)) {
            return h
        }
        if (typeof h === "string") {
            h = h.replace(/^\s*|\s*$/g, "");
            if (h.charAt(0) === "<" && h.charAt(h.length - 1) === ">" && h.length >= 3) {
                var i = document.createElement("div");
                i.innerHTML = h;
                return c.dom.first(i)
            }
            return document.getElementById(h)
        }
        return null
    }

    function f(k) {
        var j = c.dom.getStyle(k, "display"), i = 0, h = 0;
        if (j === "none") {
            k.style.display = "block"
        }
        c.array.each(["width", "paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], function (m, l) {
            i += (parseInt(c.dom.getStyle(k, m), 10) || 0)
        });
        c.array.each(["height", "paddingTop", "paddingBottom", "borderTopWidth", "borderBottomWidth"], function (m, l) {
            h += (parseInt(c.dom.getStyle(k, m), 10) || 0)
        });
        k.style.display = j;
        return{width: i, height: h}
    }

    function a(i, h) {
        this.content = e(i);
        if (!this.content) {
            throw new Error("Dialog: content is not DOM")
        }
        this.fixed = c.browser.ie == 6 ? false : (h && typeof h.fixed !== "undefined" ? h.fixed : true);
        this.zIndex = (h && typeof h.zIndex === "number") ? h.zIndex : 66666;
        this.maskConfig = h && h.mask;
        this.closed = (h && typeof h.callbacks === "object" && typeof h.callbacks.hide === "function") ? h.callbacks.hide : function () {
        }
    }

    a.prototype = {show: function () {
        if (!this.isInit) {
            this._init()
        }
        if (this.mask) {
            this.mask.show()
        }
        this._setPosition();
        this.content.style.display = "block";
        c.on(window, "resize", this.resizeHandler || (this.resizeHandler = this._createResizeHandler()))
    }, hide: function () {
        this.content.style.display = "none";
        c.un(window, "resize", this.resizeHandler);
        if (this.mask) {
            this.mask.hide()
        }
        this.closed()
    }, _init: function () {
        this._initContent();
        this._initControls();
        if (this.maskConfig) {
            this._initMask()
        }
        this.isInit = true
    }, _initContent: function () {
        c.dom.insertBefore(this.content, document.body.firstChild);
        c.dom.setStyles(this.content, {position: this.fixed ? "fixed" : "absolute", zIndex: this.zIndex, display: "none"})
    }, _initControls: function () {
        var i = this, h = c.dom.q("dialog-close", this.content);
        c.array.each(h, function (k, j) {
            c.on(k, "click", function (l) {
                c.event.preventDefault(l);
                i.hide()
            })
        })
    }, _initMask: function () {
        this.mask = new g(this.maskConfig)
    }, _setPosition: function () {
        var h = this._countPosition();
        c.dom.setStyles(this.content, {top: h.top + "px", left: h.left + "px"})
    }, _countPosition: function () {
        var h = this.boxsize || (this.boxsize = f(this.content));
        var j = (c.page.getViewHeight() - h.height) / 2, i = (c.page.getViewWidth() - h.width) / 2;
        if (!this.fixed) {
            j += c.page.getScrollTop()
        }
        if (j < 0) {
            j = 0
        }
        if (i < 0) {
            i = 0
        }
        return{top: j, left: i}
    }, _createResizeHandler: function () {
        var i = this, h = function () {
            i._setPosition()
        };
        return h
    }};
    b = a;
    return b
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/vs/utility/mask/mask.js"]);
F.module("/browse_static/common/ui/vs/loginCheck/loginCheck.js", function (b, d) {
    var c = b("/browse_static/common/lib/tangram/core/core.js");
    var h = b("/browse_static/common/lib/tangram/base/base.js");
    var e, j, g = [];

    function i(k) {
        if (typeof k === "function") {
            if (e) {
                k(e)
            } else {
                g.push(k);
                f()
            }
        }
    }

    function a(k) {
        e = k;
        h.array.each(g, function (m, l) {
            m(k)
        });
        j = false
    }

    function f() {
        if (!j) {
            j = true;
            if (location.hostname.match(/\.baidu\.com$/)) {
                window.video_login_callback = function (k) {
                    if (k && k.value) {
                        c.get("/commonapi/pay/pay_result_by_uid/?service=1&t=" + new Date().getTime(), function (l) {
                            var m = c.json.parse(l);
                            k.vipinfo = m;
                            a(k)
                        })
                    } else {
                        a(k)
                    }
                    window.video_login_callback = null
                };
                c.sio("http://v.baidu.com/d?m=uss&word=" + (new Date()).getTime()).callByServer("video_login_callback")
            } else {
                window.video_login_callback = function (k) {
                    a(c.json.parse(k));
                    window.video_login_callback = null
                };
                c(function () {
                    var k = document.createElement("iframe");
                    k.src = "http://v.baidu.com/dev_proxy_logininfo.html?v=" + Math.ceil(new Date() / 7200000);
                    k.style.display = "none";
                    document.body.appendChild(k)
                })
            }
        }
    }

    d = i;
    return d
}, ["/browse_static/common/lib/tangram/core/core.js", "/browse_static/common/lib/tangram/base/base.js"]);
F.module("/browse_static/common/ui/vs/vipPlayPortal/vipPlayPortal.js", function (e, c) {
    var d = e("/browse_static/common/lib/tangram/core/core.js");
    var b = e("/browse_static/common/ui/vs/vipConfig/vipConfig.js").sites;
    var f = [];
    var g = false;

    function a(h) {
        var i;
        if (h) {
            d.each(b, function (k, j) {
                if (h.indexOf(j) > -1 && h.indexOf("61.hz.letv.com") < 0) {
                    i = {site: j, source: h, proxy: k.replace("{url}", encodeURIComponent(h))};
                    return false
                }
            })
        }
        return i
    }

    c.add = function (j, m) {
        if (g) {
            return
        }
        function h(q) {
            var n = this.getAttribute("href", 2), o = typeof n !== "string" || n.match(/^\s*#/) ? null : a(this.href);
            if (o) {
                q.preventDefault();
                var p = this.getAttribute("target");
                if (!p || p === "_self") {
                    location.href = o.proxy
                } else {
                    window.open(o.proxy)
                }
                if (d.type(m) === "function") {
                    m(o)
                }
            }
        }

        if (j === document.body || !j) {
            if (f.length) {
                d.each(f, function (n, o) {
                    o.off("click", h)
                })
            }
            d(document.body).delegate("a", "click", h);
            g = true
        } else {
            var i = d(j), k = i.not("a"), l = i.filter("a");
            if (k.length) {
                k.delegate("a", "click", h);
                f.push(k)
            }
            if (l.length) {
                l.click(h);
                f.push(l)
            }
        }
    };
    return c
}, ["/browse_static/common/lib/tangram/core/core.js", "/browse_static/common/ui/vs/vipConfig/vipConfig.js"]);
F.module("/browse_static/common/ui/vs/tmpl/tmpl.js", function (d, c) {
    var b = {};

    function a(g, f) {
        var e = !/\W/.test(g) ? b[g] = b[g] || a(document.getElementById(g).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + g.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return f ? e(f) : e
    }

    c.parse = a;
    return c
}, []);
F.module("/browse_static/common/ui/vs/loadimg/loadimg.js", function (b, a) {
    function c(f, g) {
        if (!f) {
            return
        }
        var e = new Date().getTime(), d = window["V_fix_img" + e] = new Image();
        d.onload = d.onerror = d.onabort = function () {
            g && g(d);
            d.onload = d.onerror = d.onabort = null;
            try {
                delete window["V_fix_img" + e];
                d = null
            } catch (h) {
                d = null
            }
        };
        d.src = f + "&r=" + e
    }

    a.send = c;
    return a
}, []);
F.module("/browse_static/common/ui/vs/vs.js", function (b, a) {
    var c = c || {};
    return a
}, []);
F.module("/browse_static/widget/common/userbar/userbar.js", function (e, c) {
    var d = e("/browse_static/common/lib/tangram/base/base.js");
    var a = e("/browse_static/common/ui/eventcenter/eventcenter.js");
    var f = e("/browse_static/common/ui/vs/bdPassPop/bdPassPop.js");
    var b = function (g) {
        d.dom.ready(function () {
            function i() {
                var l = d.dom.g("username"), m = d.dom.g("mn-tip"), k = d.dom.g("linkUserLogout"), n = null;
                if (!l || !m) {
                    return
                }
                d.on(l, "onmouseenter", function () {
                    clearTimeout(n);
                    m.style.display = "block"
                });
                d.on(l, "onmouseleave", function () {
                    n = setTimeout(function () {
                        m.style.display = "none"
                    }, 200)
                });
                d.on(m, "onmouseenter", function () {
                    clearTimeout(n)
                });
                d.on(m, "onmouseleave", function () {
                    n = setTimeout(function () {
                        m.style.display = "none"
                    }, 200)
                });
                if (!location.hostname.match(/\.baidu\.com$/) && k) {
                    d.on(k, "click", function (p) {
                        d.event.preventDefault(p);
                        var o = document.createElement("iframe");
                        o.src = "http://v.baidu.com/dev_proxy_logout.html?frp=" + location.hostname;
                        o.style.display = "none";
                        document.body.appendChild(o);
                        m.style.display = "none"
                    });
                    window.video_logout_callback = function () {
                        location.reload()
                    }
                }
            }

            function h(q) {
                var l = navigator.userAgent.toLowerCase(), p = /ipad/, m = /mqqbrowser|ucbrowser/, n = "http://qingting.baidu.com/index?pid=4", k = "�����", s = ' onclick="return false" id="feedbackBtns"';
                if (l.search(p) != -1 && l.search(m) == -1) {
                    n = "http://v.baidu.com/";
                    k = '����ٶ���ƵiPad�����<img src="http://list.video.baidu.com/pc_static/icons/new.gif" style="position:absolute;top:-5px;right:-5px;">';
                    s = ""
                }
                if (q && typeof(q) === "object" && q.value && q.value != "") {
                    window.userinfo = {isLogin: true};
                    if (q.user_source && q.user_source != "" && q.user_source != "0") {
                        var r = ['<li style="position:relative;"><a href="' + n + '" target="_blank" static="id=view"' + s + ">" + k + "</a></li>", '<li class="line">|</li>', '<li class="uname mn-lk-w"><a class="mn-lk" href="http://v.baidu.com/vip/" target="_blank" id="username"><img src="http://passport.bdimg.com/passApi/img/icon_#{user_source}_16.png" class="show_icons" id="show_icons" style="display:none;"/><span id="user_name">#{value}</span></a>', '<div class="mn-tip" id="mn-tip">', '<ul class="mn">', '<li><a href="#{mysite}" target="_blank" class="my-info">�ҵ���ҳ</a></li>', '<li><a href="https://#{host}/" target="_blank" class="my-info">�ʺ�����</a></li>', '<li><a href="#{logoutUrl}" id="linkUserLogout" class="logout">�˳�</a></li>', "</ul>", "</div>", "</li>", '<li class="line">|</li>', '<li><a href="http://list.video.baidu.com/iph_promote.html" target="_blank">�ٶ���Ƶ���߰�</a></li>', '<li class="line">|</li>', '<li><a href="http://www.baidu.com/">�ٶ���ҳ</a></li>', ]
                    } else {
                        var r = ['<li style="position:relative;"><a href="' + n + '" target="_blank" static="id=view"' + s + ">" + k + "</a></li>", '<li class="line">|</li>', '<li class="uname mn-lk-w"><a class="mn-lk" href="http://v.baidu.com/vip/" target="_blank" id="username"><span id="user_name">#{value}</span></a>', '<div class="mn-tip" id="mn-tip">', '<ul class="mn">', '<li><a href="#{mysite}" target="_blank" class="my-info">�ҵ���ҳ</a></li>', '<li><a href="https://#{host}/" target="_blank" class="my-info">�ʺ�����</a></li>', '<li><a href="#{logoutUrl}" id="linkUserLogout" class="logout">�˳�</a></li>', "</ul>", "</div>", "</li>", '<li class="line">|</li>', '<li><a href="http://list.video.baidu.com/iph_promote.html" target="_blank">�ٶ���Ƶ���߰�</a></li>', '<li class="line">|</li>', '<li><a href="http://www.baidu.com/">�ٶ���ҳ</a></li>', ]
                    }
                    if (q.incomplete_user == 0 && q.has_uname == 0) {
                        q.value = q.emailphone;
                        q.mysite = "https://passport.baidu.com/v2/?ucenteradduname&to=princess"
                    } else {
                        if (q.incomplete_user == 1 && q.has_uname == 0) {
                            q.mysite = "https://passport.baidu.com/v2/?ucenteradduname&to=princess"
                        } else {
                            q.mysite = "http://www.baidu.com/p/" + q.value + "?from=video"
                        }
                    }
                    q.logoutUrl = "http://" + q.host + "/?logout&tpl=vd&u=" + encodeURIComponent(document.location.href);
                    d.dom.insertHTML(d.dom.first(d.dom.g("userbar")), "beforeEnd", d.string.format(r.join(""), q));
                    i();
                    var o = document.getElementById("show_icons");
                    if (o) {
                        if (q.incomplete_user == 1 && q.has_uname == 0) {
                            o.style.display = "inline-block"
                        }
                    }
                } else {
                    var r = ['<li style="position:relative;"><a href="' + n + '" target="_blank" static="id=view"' + s + ">" + k + "</a></li>", '<li class="line">|</li>', '<li><a href="http://list.video.baidu.com/iph_promote.html" target="_blank">�ٶ���Ƶ���߰�</a></li>', '<li class="line">|</li>', '<li><a  href="http://www.baidu.com">�ٶ���ҳ</a></li>', '<li class="line">|</li>', '<li><a href="http://passport.baidu.com/v2/?login&tpl=vd&u=#{Url}" target="_blank" id="loginbtn">��¼</a><a href="https://passport.baidu.com/v2/?reg&tpl=vd&regType=1&u=#{Url}" target="_blank">ע��</a></li>', ], q = {Url: encodeURIComponent(document.location.href)};
                    d.dom.insertHTML(d.dom.first(d.dom.g("userbar")), "beforeEnd", d.string.format(r.join(""), q));
                    if (location.hostname.match(/baidu\.com$/)) {
                        d.event.on("loginbtn", "click", function (t) {
                            d.event.preventDefault(t);
                            f.show()
                        })
                    }
                }
                d.dom.addClass("userbar", (g && g.vipinfo && g.vipinfo.isvalid ? "vip-super" : "vip"))
            }

            function j() {
                location.reload()
            }

            a.attach("bdPassPop.show", function (k) {
                f.show(k.showcallback)
            });
            h(g);
            d.event.on("feedbackBtns", "click", function (l) {
                d.event.preventDefault(l);
                var k = e("/browse_static/common/ui/vs/showFeedBack/showFeedBack.js");
                k()
            })
        })
    };
    c = b;
    return c
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/eventcenter/eventcenter.js", "/browse_static/common/ui/vs/bdPassPop/bdPassPop.js", "/browse_static/common/ui/vs/showFeedBack/showFeedBack.js"]);
F.module("/browse_static/widget/common/header_baoku/header_baoku.js", function (d, b) {
    var c = d("/browse_static/common/lib/tangram/base/base.js");
    var g = c.dom;
    d("/browse_static/common/ui/magic/control/Suggestion/Suggestion.js");
    var e = d("/browse_static/common/ui/magic/setup/suggestion/suggestion.js");
    var a = {appendHTML: '<span class="tang-suggestion-closeBtn">�ر�</span>', holdHightLight: true, getData: function (j) {
        var i = this;
        var h = "http://nssug.baidu.com/su?wd=" + j + "&prod=yingyin_browser";
        c.sio.callByBrowser(h);
        window.baidu = window.baidu || {};
        window.baidu.sug = function (l) {
            var k = l.s;
            i.receiveData(j, k)
        }
    }, onconfirm: function (h) {
        c.event.fire("searchForm", "submit")
    }, offset: {offsetX: 0, offsetY: 4}};
    var f = {init: function () {
        var j = c.event;
        var k = c.dom;
        var h = e("searchValue", a), i = function () {
            h.hide()
        };
        j.on("searchForm", "submit", this.resVideoSearch);
        j.on(k.query(".searchBaiduBtn")[0], "click", this.resBaiduSearch);
        h.on("onrender", function () {
            var l = h.suggestion;
            var m = l && l.getElement();
            k.addClass(m, "baoku-header-suggestion")
        });
        h.on("onshow", function () {
            j.on(k.query(".tang-suggestion-closeBtn")[0], "click", i)
        });
        h.on("onhide", function () {
            j.un(k.query(".tang-suggestion-closeBtn")[0], "click", i)
        })
    }, resVideoSearch: function () {
        var i = c.dom.g("searchValue").value;
        var h = "http://baoku.baidu.com/search.php?ie=utf8&flag=sug&word=" + encodeURIComponent(i);
        window.open(h, "_blank");
        return false
    }, resBaiduSearch: function () {
        var i = c.dom.g("searchValue").value;
        var h = "http://www.baidu.com/s?wd=" + encodeURIComponent(i) + "&tn=SE_pshl0012_9cq77ib7";
        window.open(h, "_blank");
        return false
    }};
    c.dom.ready(function () {
        var h = {currentVersion: null, radar: {version: [2, 6, 2, 14], id: "baoku-video-radar"}, hideClass: "nav-item-hide", init: function () {
            this.currentVersion = (c.cookie.get("version") || "").split(".")
        }, handleVersion: function (i) {
            var j = this.compareVersion(this.currentVersion, i.version);
            if (j) {
                g.removeClass(i.id, this.hideClass)
            }
        }, compareVersion: function (k, i) {
            var j = false;
            if (k.length == 4) {
                j = true;
                c.array.each(k, function (n, l) {
                    var m = parseInt(n) || 0;
                    var o = i[l];
                    if (m < o) {
                        j = false;
                        return false
                    } else {
                        if ((m > o) || (l == 3 && m == o)) {
                            j = true;
                            return false
                        }
                    }
                })
            }
            return j
        }};
        h.init();
        f.init();
        if (c.browser.ie == 6) {
            c.array.each(g.query("#navbar li.normalLi"), function (i) {
                c.event.on(i, "mouseover", function (j) {
                    g.addClass(this, "hover")
                });
                c.event.on(i, "mouseout", function (j) {
                    g.removeClass(this, "hover")
                })
            })
        }
    });
    return b
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/control/Suggestion/Suggestion.js", "/browse_static/common/ui/magic/setup/suggestion/suggestion.js"]);
F.module("/browse_static/widget/common/searchKeyword/searchKeyword.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js"), f = c("/browse_static/common/ui/vs/tmpl/tmpl.js").parse, e = c("/browse_static/common/ui/vs/loginCheck/loginCheck.js"), d = "http://list.video.baidu.com/api_search_keyword.json?v=" + Math.ceil(new Date() / 7200000), h;
    (function g(i) {
        e(function (j) {
            h = j && j.vipinfo && j.vipinfo.isvalid && j.vipinfo.isvip;
            if (h) {
                d = "http://list.video.baidu.com/api_search_keyword_vip.json?v=" + Math.ceil(new Date() / 7200000)
            }
            i.sio.callByBrowser(d, function () {
            }, {charset: "gb2312"})
        });
        window.videoSearchKeywordMIS = function (j) {
            i.g("top_search_Keyword").innerHTML = f("top_search_KeywordHtml", {data: j});
            window.videoSearchKeywordMIS = null
        }
    })(b);
    return a
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/vs/tmpl/tmpl.js", "/browse_static/common/ui/vs/loginCheck/loginCheck.js"]);
F.module("/browse_static/widget/common/ui_searchbox/ui_searchbox.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    b.ui = b.ui || {};
    var e = function (f) {
        f = f || "1.0";
        b.sio.callByBrowser("http://list.video.baidu.com/fe/ecom/sug.js?v=" + f, function () {
            var g = {sugProdName: "video", searchInputId: "kw"};
            void function (h) {
                function j(k) {
                    return String(k).replace(/[#%&+=\/\\\ \��\f\r\n\t]/g, function (l) {
                        return"%" + (256 + l.charCodeAt()).toString(16).substring(1).toUpperCase()
                    })
                }

                function i(k) {
                    k.href = k.href.replace(new RegExp("(" + k.getAttribute("wdfield") + "=)[^&]*"), "$1" + j(document.getElementById(h).value))
                }

                if (b.dom.g("searchTab")) {
                    b.on("searchTab", "mousedown", function (l) {
                        var k = b.event.getTarget(l);
                        if (k.nodeName === "A" && k.getAttribute("wdfield")) {
                            i(k)
                        }
                    })
                }
            }(g.searchInputId);
            void function (h) {
                function l(p, n, q) {
                    var o = p[n];
                    var m = b.g(n + "search");
                    if (m != "undefined") {
                        m.disabled = false
                    }
                    o.value = q
                }

                var k = null;
                var j = {};
                b.ui.Suggestion = window.baidu.ui.Suggestion;
                var i = window.baidu.topSug = new b.ui.Suggestion({view: function (o) {
                    var n = b.browser.ie == 6 || b.browser.ie == 7;
                    var m = b.browser.firefox;
                    return{top: o.top + (n ? 3 : 4), left: o.left - (m ? 5 : 6), width: 535}
                }, getData: function (m) {
                    k = m;
                    b.sio.callByServer("http://nssug.baidu.com/su?wd=" + encodeURIComponent(m) + "&prod=" + g.sugProdName + "&oe=utf-8&t=" + Math.random())
                }, onconfirm: function () {
                    var m = b.g(h).form;
                    if (m.onsubmit && m.onsubmit() === false) {
                        return
                    }
                    m.submit()
                }, onbeforepick: function (m) {
                    return function (n) {
                        m.innerHTML = n.data.item.content;
                        n.data.item.content = n.data.item.value = b.dom.getText(m)
                    }
                }(document.createElement("div")), onpick: function (n) {
                    var o = n.data;
                    var m = b.g(h).form;
                    if (o.index === k) {
                        b.g("oqsearch").disabled = true;
                        b.g("fsearch").disabled = true;
                        b.g("rspsearch").disabled = true
                    } else {
                        if (k != null) {
                            l(m, "oq", k);
                            l(m, "f", "3");
                            l(m, "rsp", o.index)
                        }
                    }
                }});
                i.render(h);
                window.baidu.sug = function (n) {
                    var p = n.s, o = n.q, m = [];
                    b.array.each(p, function (r, q) {
                        if (r.indexOf(o) != -1) {
                            m.push(r.replace(o, "<b>" + o + "</b>"))
                        } else {
                            m.push("<b>" + r + "</b>")
                        }
                    });
                    i.appendHTML = '<a href="javascript:baidu.topSug.hide();void(0);">�ر�</a>';
                    i.show(o, m)
                }
            }(g.searchInputId)
        });
        (function () {
            (function i() {
                var l = b.g("setHome");
                if (l && document.all) {
                    b.on(l, "click", function () {
                        l.style.behavior = "url(#default#homepage)";
                        l.setHomePage("http://www.baidu.com")
                    })
                }
            })();
            (function g(s) {
                var n = b.g("searchTab"), o = window.location.href, u = n.getElementsByTagName("a"), q = 0, p = u.length, m, t = encodeURIComponent("s&wd=" + document.body.getAttribute("query"));
                if (b.string.trim(u[1].innerHTML) == "��ҳ") {
                    if (!s) {
                        u[1].href += "&fr=vid1" + r()
                    } else {
                        u[1].href += "&fr=vid0" + r()
                    }
                }
                function r() {
                    var l = function (w) {
                        var v = new RegExp(w);
                        return v.test(o)
                    };
                    if (l("s=18")) {
                        return"se0"
                    }
                    if (l("s=0") && l("&oq=")) {
                        return"sug"
                    }
                    if (l("s=19") && l("rsp=")) {
                        return"rs0"
                    }
                    return"000"
                }
            })();
            var h = document.forms;

            function j(l) {
                return String(l).replace(/[#%&+=\/\\\ \��\f\r\n\t]/g, function (m) {
                    return"%" + (256 + m.charCodeAt()).toString(16).substring(1).toUpperCase()
                })
            }

            function k(o) {
                var n = new Image(), l = document.body.getAttribute("tn") || "noTn";
                var m = setTimeout(function () {
                    o.submit()
                }, 200);
                n.onload = n.onerror = function () {
                    if (m) {
                        clearTimeout(m)
                    }
                    n.onload = n.onerror = null;
                    o.submit()
                };
                n.src = "http://nsclick.baidu.com/v.gif?pid=104&s=zdjs&wd=" + encodeURIComponent(o.word.value) + "&tn=" + l + "&r=" + new Date().getTime()
            }

            if (h[0]) {
                h[0].onsubmit = function () {
                    k(this);
                    return false
                }
            }
            if (h[1]) {
                h[1].onsubmit = function () {
                    k(this);
                    return false
                }
            }
        })()
    };
    var d = function () {
    };
    a = {initSuggestion: e, initPlayRecords: d};
    return a
}, ["/browse_static/common/lib/tangram/base/base.js"]);
F.module("/browse_static/widget/common/focuslayer/focuslayer.js", function (d, b) {
    var c = d("/browse_static/common/lib/tangram/base/base.js");
    d("/browse_static/common/ui/magic/control/Carousel/$fx/$fx.js");
    var f = d("/browse_static/common/ui/magic/setup/carousel/carousel.js");
    var a = d("/browse_static/common/lib/tangram/fx/fadeIn/fadeIn.js");
    var e = d("/browse_static/common/lib/tangram/fx/fadeOut/fadeOut.js");
    c.dom.ready(function () {
        var i = c.g("focusArea");
        g(i);
        h(i);
        function g(j) {
            c.array.each(c.dom.query(".focus-area-thumb", j), function (o, k) {
                if (!o.getAttribute("data-hoverbinded")) {
                    var m = c.dom.query(".focus-area-thumb-detail", o)[0];
                    var l = c.dom.query(".focus-area-thumb-infotip", o)[0];
                    c.on(o, "mouseenter", function () {
                        m && a(m, {duration: 300});
                        l && e(l, {duration: 300})
                    });
                    c.on(o, "mouseleave", function () {
                        m && e(m, {duration: 100});
                        l && c.dom.show(l);
                        l && a(l, {duration: 300})
                    });
                    o.setAttribute("data-hoverbinded", true)
                }
            })
        }

        function h(j) {
            c.array.each(c.dom.query(".focus-area-thumb", j), function (l, k) {
                if (!l.getAttribute("data-clickbinded")) {
                    c.on(l, "click", function (q) {
                        var m;
                        var n = (m = c.dom.query("div.fatd-play>a", l)[0]) && m;
                        if (c.event.getTarget(q) != m) {
                            var o = c.g("focusArea").getAttribute("static");
                            (function () {
                                var r = new Image(), s = new Date().getTime();
                                window["bdvd_" + (new Date()).getTime()] = r;
                                r.src = "http://nsclick.baidu.com/v.gif?pid=104&" + o + "&u=" + n + "&stp=other&r=" + s
                            })();
                            var p = n + "&" + o;
                            window.open(p, "_blank")
                        }
                    });
                    l.setAttribute("data-clickbinded", true)
                }
            })
        }
    });
    return b
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/control/Carousel/$fx/$fx.js", "/browse_static/common/ui/magic/setup/carousel/carousel.js", "/browse_static/common/lib/tangram/fx/fadeIn/fadeIn.js", "/browse_static/common/lib/tangram/fx/fadeOut/fadeOut.js"]);
F.module("/browse_static/widget/common/searchbox/searchbox.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    b.ui = b.ui || {};
    var e = function (j, h) {
        j = j || "1.0";
        var g = document.location.href;
        var f = location.search.match(/[&?]q=([^&]+)/);
        var l = document.getElementById("kw");
        if (f) {
            l.value = decodeURIComponent(f[1])
        }
        b.dom.ready(function () {
            l.focus()
        });
        var k = navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/);
        _sugJs = "http://list.video.baidu.com/fe/ecom/sugE-comp.js", _sugSu = "_ala", _sugWidth = 509, _sugDiff = "true";
        if (k || !h) {
            _sugJs = "http://list.video.baidu.com/fe/ecom/sugO-mini.js";
            _sugSu = "";
            _sugWidth = 410;
            _sugDiff = "0"
        }
        if (!k && h) {
            document.body.className += " pc"
        }
        b.sio.callByBrowser(_sugJs + "?v=" + j, function () {
            var m = {sugProdName: "video", searchInputId: "kw"};
            void function (n) {
                var o = {url: {}};
                o.url.escapeSymbol = function (p) {
                    return String(p).replace(/[#%&+=\/\\\ \��\f\r\n\t]/g, function (q) {
                        return"%" + (256 + q.charCodeAt()).toString(16).substring(1).toUpperCase()
                    })
                };
                window.setHeadUrl = function (p) {
                    p.href = p.href.replace(new RegExp("(" + p.getAttribute("wdfield") + "=)[^&]*"), "$$1" + o.url.escapeSymbol(document.getElementById(n).value))
                }
            }(m.searchInputId);
            void function (n) {
                function r(v, t, w) {
                    var u = v[t];
                    var s = b.g(t + "search");
                    if (s != "undefined") {
                        s.disabled = false
                    }
                    u.value = w
                }

                var q = null;
                var p = {};
                b.ui.Suggestion = window.baidu.ui.Suggestion;
                var o = window.baidu.topSug = new b.ui.Suggestion({view: function (u) {
                    var t = b.browser.ie == 6 || b.browser.ie == 7;
                    var s = b.browser.firefox;
                    return{top: u.top + (t ? 3 : 4), left: u.left - (s ? 5 : 6), width: _sugWidth}
                }, getData: function (s) {
                    q = s;
                    b.sio.callByServer("http://nssug.baidu.com/su?wd=" + encodeURIComponent(s) + "&prod=" + m.sugProdName + _sugSu + "&oe=utf-8&t=" + Math.random())
                }, onconfirm: function () {
                    var s = b.g(n).form;
                    if (s.onsubmit && s.onsubmit() === false) {
                        return
                    }
                    s.submit()
                }, onbeforepick: function (s) {
                    return function (t) {
                        s.innerHTML = t.data.item.content;
                        t.data.item.content = t.data.item.value = b.dom.getText(s)
                    }
                }(document.createElement("div")), onpick: function (t) {
                    var u = t.data;
                    var s = b.g(n).form;
                    if (u.index === q) {
                        b.g("oqsearch").disabled = true;
                        b.g("fsearch").disabled = true;
                        b.g("rspsearch").disabled = true;
                        b.g("sasearch").disabled = true
                    } else {
                        if (q != null) {
                            r(s, "oq", q);
                            r(s, "f", "3");
                            r(s, "rsp", u.index);
                            r(s, "sa", _sugDiff)
                        }
                    }
                }});
                o.render(n);
                window.baidu.sug = function (t) {
                    var v = t.s, u = t.q, s = [];
                    if (h && !k && v.length > 6) {
                        for (i = v.length - 1; i > 5; i--) {
                            v.pop()
                        }
                    }
                    b.array.each(v, function (x, w) {
                        if (k || !h) {
                            if (x.indexOf(u) != -1) {
                                s.push(x.replace(u, "<b>" + u + "</b>"))
                            } else {
                                s.push("<b>" + x + "</b>")
                            }
                        } else {
                            if (x.split("{#S+_}")[0].indexOf(u) != -1) {
                                s.push(x.replace(u, "<b>" + u + "</b>"))
                            } else {
                                s.push("<b>" + x.split("{#S+_}")[0] + "</b>{#S+_}" + x.split("{#S+_}")[1])
                            }
                        }
                    });
                    o.appendHTML = '<a href="javascript:baidu.topSug.hide();void(0);">�ر�</a>';
                    o.show(u, s)
                }
            }(m.searchInputId)
        });
        (function () {
            var n = document.getElementById("toSiblingsWeb"), m = document.forms;

            function o(q) {
                return String(q).replace(/[#%&+=\/\\\ \��\f\r\n\t]/g, function (r) {
                    return"%" + (256 + r.charCodeAt()).toString(16).substring(1).toUpperCase()
                })
            }

            function p(t) {
                var s = new Image(), q = document.body.getAttribute("tn") || "noTn";
                var r = setTimeout(function () {
                    t.submit()
                }, 200);
                s.onload = s.onerror = function () {
                    if (r) {
                        clearTimeout(r)
                    }
                    s.onload = s.onerror = null;
                    t.submit()
                };
                s.src = "http://nsclick.baidu.com/v.gif?pid=104&s=zdjs&wd=" + encodeURIComponent(t.word.value) + "&tn=" + q + "&r=" + new Date().getTime()
            }

            if (m[0]) {
                m[0].onsubmit = function () {
                    p(this);
                    return false
                }
            }
            if (m[1]) {
                m[1].onsubmit = function () {
                    p(this);
                    return false
                }
            }
        })()
    };
    var d = function () {
    };
    a = {initSuggestion: e, initPlayRecords: d};
    return a
}, ["/browse_static/common/lib/tangram/base/base.js"]);
F.module("/browse_static/widget/common/backtop/backtop.js", function (e, w) {
    var a = e("/browse_static/common/lib/tangram/base/base.js"), j = e("/browse_static/common/ui/vs/scrolling/scrolling.js"), q = a.dom, o = a.event, i = "back-to-top-btn", c = "back-to-rank-btn", g = "back-to-top", v = "back-to-top-show", u, r, t, f, s, h, d;
    e("/browse_static/common/lib/tangram/fx/create/create.js");
    a.fx.scrollTop = function (A) {
        var x, B;
        var y = {initialize: function () {
            var C = l();
            var D = s.scrollHeight || h.scrollHeight;
            x = k();
            B = Math.min(D - C - x, A - x)
        }, transition: function (C) {
            return 1 - Math.pow(1 - C, 2)
        }, render: function (C) {
            window.scrollTo(0, B * C + x)
        }, restore: function () {
            window.scrollTo(0, x)
        }};
        var z = a.fx.create(h, y, "baidu.fx.scrollToTop");
        return z.launch()
    };
    function m(y) {
        var x = o.get(y);
        o.preventDefault(x);
        a.fx.scrollTop(0)
    }

    function n(z) {
        var x = o.get(z);
        var y = f.offsetTop;
        o.preventDefault(x);
        a.fx.scrollTop(y)
    }

    function b(z) {
        var y = k();
        var x = l();
        if (y > x) {
            q.addClass(u, v)
        } else {
            q.removeClass(u, v)
        }
    }

    function l() {
        return s.clientHeight || h.clientHeight
    }

    function k() {
        return s.scrollTop || h.scrollTop
    }

    function p() {
        u = q.g(g);
        r = q.g(i);
        s = document.documentElement;
        h = document.body;
        o.on(r, "click", m);
        j(window, b);
        b();
        if (!!d) {
            t = q.g(c);
            f = q.g(d);
            o.on(t, "click", n)
        }
        var y = q.q("bt-btn-feedback")[0];
        if (y) {
            var x = q.getAttr(y, "href");
            if (x == "http://qingting.baidu.com/index?pid=4") {
                q.setAttr(y, "href", "#");
                o.on(y, "click", function (A) {
                    var z = e("/browse_static/common/ui/vs/showFeedBack/showFeedBack.js");
                    z();
                    o.preventDefault(A)
                })
            }
        }
    }

    w = function (x) {
        d = x || "";
        q.ready(p)
    };
    return w
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/vs/scrolling/scrolling.js", "/browse_static/common/lib/tangram/fx/create/create.js", "/browse_static/common/ui/vs/showFeedBack/showFeedBack.js"]);
F.module("/browse_static/widget/common/tabtoplist/tabtoplist.js", function (d, b) {
    var c = d("/browse_static/common/lib/tangram/base/base.js");
    var a = d("/browse_static/common/ui/magic/setup/tab/tab.js");
    var e = function (f) {
        c.dom.ready(function () {
            var g = a(f, {selectEvent: "mouseover"});
            g.on("onselect", function (k) {
                var h = k.index;
                var l = c.dom.children(this.getElement("title"));
                var i = "tang-title-item-next";
                c.array.each(l, function (o, m) {
                    c.dom.removeClass(o, i)
                });
                var j = l[h + 1];
                if (j) {
                    c.dom.addClass(j, i)
                }
            });
            g.select(0)
        })
    };
    b = e;
    return b
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/setup/tab/tab.js"]);
F.module("/browse_static/widget/common/header_hao123/header_hao123.js", function (d, b) {
    var c = d("/browse_static/common/lib/tangram/base/base.js");
    var a = d("/browse_static/common/ui/vs/tmpl/tmpl.js");
    d("/browse_static/common/ui/magic/control/Carousel/$fx/$fx.js");
    d("/browse_static/common/ui/magic/control/Carousel/$autoScroll/$autoScroll.js");
    var e = d("/browse_static/common/ui/magic/setup/carousel/carousel.js");
    (function () {
        window.hao123AdvHeaderMIS = function (f) {
            if (f) {
                c.dom.g("hao123HdAdv").innerHTML = a.parse("hao123HdAdvHTML", {data: f})
            }
            var g = function (i) {
                var h = e(i, {focusRange: {min: 0, max: 0}, isLoop: true, viewSize: 1, step: 1, orientation: "vertical", autoScroll: {enable: true, interval: 3000}, button: {enable: false}});
                h.on("mouseenter", function () {
                    this.stop()
                });
                h.on("mouseleave", function () {
                    this.start()
                })
            };
            c.dom.ready(function () {
                if (c.dom.query("#video_hot_imgs li").length > 1) {
                    g("video_hot_imgs")
                }
                if (c.dom.query("#video_hot_links li").length > 1) {
                    g("video_hot_links")
                }
            });
            window.hao123AdvHeaderMIS = null
        };
        c.sio.callByBrowser("http://list.video.baidu.com/api_hao123AdvHeader.js?v=" + Math.ceil(new Date() / 7200000))
    }());
    (function () {
        var f = (function (i, p) {
            var q = {ie: "msie", sf: "safari", tt: "tencenttraveler"}, j = {browser: "(" + q.ie + "|" + q.sf + "|firefox|chrome|opera)", shell: "(maxthon|360se|theworld|se|theworld|greenbrowser|qqbrowser|bidubrowser)", tt: "(tencenttraveler)", os: "(windows nt|macintosh|solaris|linux)"}, m = function (t) {
                var s = new RegExp(t + "\\b[ \\/]?([\\w\\.]*)", "i"), r = p.match(s);
                return r ? r.slice(1) : ["", ""]
            }, h = function () {
                var r = p.toLowerCase().indexOf("360chrome") > -1 ? !!1 : !1, t;
                try {
                    if (i.external && i.external.twGetRunPath) {
                        t = i.external.twGetRunPath;
                        if (t && t.toLowerCase().indexOf("360se") > -1) {
                            r = !!1
                        }
                    }
                } catch (u) {
                    r = !1
                }
                return r
            }(), l = function () {
                try {
                    if (/(\d+\.\d)/.test(external.max_version)) {
                        return parseFloat(RegExp["\x241"])
                    }
                } catch (r) {
                }
            }(), n = m(j.browser), o = m(j.shell), k = m(j.os);
            if (n[0].toLowerCase() === q.ie) {
                if (h) {
                    o = ["360se", ""]
                } else {
                    if (l) {
                        o = ["maxthon", l]
                    } else {
                        if (o == ",") {
                            o = m(j.tt)
                        }
                    }
                }
            } else {
                if (n[0].toLowerCase() === q.sf) {
                    n[1] = m("version") + "." + n[1]
                }
            }
            return{browser: n.join(","), shell: o.join(","), os: k.join(",")}
        })(window, navigator.userAgent);
        var g = {config: {helpUrl: "http://www.hao123.com/redian/sheshouyef.htm", shell: {"360se": "02", maxthon: "03", se: "04", qqbrowser: "05", theworld: "10", greenbrowser: "12", bidubrowser: "17"}, browser: {firefox: "ff", chrome: "08", opera: "09", safari: "11"}}, set: function (k, i) {
            var m = f.browser.split(",")[0].toLowerCase(), n = f.shell.split(",")[0].toLowerCase(), l = this.config, p = l.helpUrl, j = " ����������֧�֣����ֶ�����  ", h = function () {
                try {
                    k.style.behavior = "url(#default#homepage)";
                    k.setHomePage(i)
                } catch (q) {
                    alert(j)
                }
            };
            if (m === "msie" && (!n || n === "tencenttraveler")) {
                h();
                return false
            } else {
                if (n && l.shell[n]) {
                    p += "#" + l.shell[n];
                    if (n === "maxthon") {
                        try {
                            if (external.max_version) {
                                window.open(p);
                                return false
                            } else {
                                h();
                                return false
                            }
                        } catch (o) {
                            h();
                            return false
                        }
                    } else {
                        window.open(p);
                        return false
                    }
                } else {
                    if (l.browser[m]) {
                        if (m === "chrome") {
                            try {
                                if (external.max_version) {
                                    p += "#03";
                                    window.open(p);
                                    return false
                                } else {
                                    p += "#" + l.browser[m];
                                    window.open(p);
                                    return false
                                }
                            } catch (o) {
                                p += "#" + l.browser[m];
                                window.open(p);
                                return false
                            }
                        } else {
                            p += "#" + l.browser[m];
                            window.open(p);
                            return false
                        }
                    } else {
                        alert(j);
                        return false
                    }
                }
            }
        }, bind: function (j, i) {
            j = typeof j === "string" ? document.getElementById(j) : j;
            if (j.href.indexOf("hao123.com") < 0) {
                return
            }
            i = i || j.href || window.location;
            var k = this, h = document.addEventListener ? function (m, l, n) {
                m.addEventListener(l, n, !1)
            } : function (m, l, n) {
                m.attachEvent("on" + l, n)
            };
            h(j, "click", function (l) {
                l = l || window.event;
                k.set(j, i);
                if (l.preventDefault) {
                    l.preventDefault()
                } else {
                    l.returnValue = false
                }
                return false
            });
            return this
        }};
        g.bind("sethome", "http://www.hao123.com")
    }());
    return b
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/vs/tmpl/tmpl.js", "/browse_static/common/ui/magic/control/Carousel/$fx/$fx.js", "/browse_static/common/ui/magic/control/Carousel/$autoScroll/$autoScroll.js", "/browse_static/common/ui/magic/setup/carousel/carousel.js"]);
F.module("/browse_static/widget/common/navbar/navbar.js", function (f, b) {
    var e = f("/browse_static/common/lib/tangram/base/base.js"), h = e.dom.g, a = f("/browse_static/common/ui/vs/tmpl/tmpl.js").parse, d = f("/browse_static/common/ui/eventcenter/eventcenter.js");

    function c(i) {
        var j = document.createElement("div");
        j.innerHTML = i;
        return j.children
    }

    var g = {update: function (i) {
        if (i.mainmenu && i.mainmenu.length) {
            this._addMainMenu("navMainMenu", "htmlNavMainMenu", i.mainmenu)
        }
        if (i.submenu && i.submenu.length) {
            this._addSubMenu("navSubMenu", "htmlNavSubMenu", i.submenu)
        }
    }, _addMainMenu: function (l, j, k) {
        var i = h(l);
        if (i && h(j)) {
            i.appendChild(this._createFragment(j, k))
        }
    }, _addSubMenu: function (l, j, k) {
        var i = h(l);
        if (i && h(j)) {
            i.insertBefore(this._createFragment(j, k), i.firstChild)
        }
    }, _createFragment: function (n, o) {
        var l = document.createDocumentFragment(), k = c(a(n, {data: o}));
        for (var m = 0, j = k.length; m < j; m++) {
            l.appendChild(k[m].cloneNode(true))
        }
        return l
    }};
    window.videoMISNav = function (i) {
        if (i) {
            g.update(i);
            window.videoMISNav = null
        }
    };
    e.sio.callByBrowser("http://list.video.baidu.com/video-mis-nav.js?v=" + Math.ceil(new Date() / 7200000), function () {
    }, {charset: "gb2312"});
    d.attach("square.render", function () {
        if (e.g("square") !== "undefined") {
            e.g("navbar").style.width = e.g("square").clientWidth + "px"
        }
    });
    d.attach("square.ready", function () {
        if (e.g("square") !== "undefined") {
            e.g("navbar").style.width = e.g("square").clientWidth + "px"
        }
    });
    return b
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/vs/tmpl/tmpl.js", "/browse_static/common/ui/eventcenter/eventcenter.js"]);
F.module("/browse_static/widget/common/focuscarousel/focuscarousel.js", function (d, b) {
    var c = d("/browse_static/common/lib/tangram/base/base.js");
    d("/browse_static/common/ui/magic/control/Carousel/$fx/$fx.js");
    d("/browse_static/common/ui/magic/control/Carousel/$button/$button.js");
    d("/browse_static/common/ui/magic/control/Carousel/$autoScroll/$autoScroll.js");
    var f = d("/browse_static/common/ui/magic/setup/carousel/carousel.js");
    var a = d("/browse_static/common/lib/tangram/fx/fadeIn/fadeIn.js");
    var e = d("/browse_static/common/lib/tangram/fx/fadeOut/fadeOut.js");
    c.dom.ready(function () {
        var i = f("focusCarouselBody", {focusRange: {min: 0, max: 0}, isLoop: true, viewSize: 1, step: 1, autoScroll: {enable: true, interval: 3000}});
        i.on("onfocus", function () {
            var k = this.getElement("element");
            g(k);
            h(k);
            j(this, this.getCurrentIndex())
        });
        i.on("onmouseenter", function () {
            this.stop()
        });
        i.on("onmouseleave", function () {
            this.start()
        });
        g(i.getElement("element"));
        h(i.getElement("element"));
        function g(k) {
            c.array.each(c.dom.query(".focus-area-thumb", k), function (p, l) {
                if (!p.getAttribute("data-hoverbinded")) {
                    var o = c.dom.query(".focus-area-thumb-detail", p)[0];
                    var m = c.dom.query(".focus-area-thumb-infotip", p)[0];
                    c.on(p, "mouseenter", function () {
                        o && a(o, {duration: 300});
                        m && e(m, {duration: 300})
                    });
                    c.on(p, "mouseleave", function () {
                        o && e(o, {duration: 100});
                        m && c.dom.show(m);
                        m && a(m, {duration: 300})
                    });
                    p.setAttribute("data-hoverbinded", true)
                }
            })
        }

        function h(k) {
            c.array.each(c.dom.query(".focus-area-thumb", k), function (m, l) {
                if (!m.getAttribute("data-clickbinded")) {
                    c.on(m, "click", function (r) {
                        var n;
                        var o = (n = c.dom.query("div.fatd-play>a", m)[0]) && n;
                        if (c.event.getTarget(r) != n) {
                            var p = c.g("focusCarouselBody").getAttribute("static");
                            (function () {
                                var s = new Image(), t = new Date().getTime();
                                window["bdvd_" + (new Date()).getTime()] = s;
                                s.src = "http://nsclick.baidu.com/v.gif?pid=104&" + p + "&u=" + o + "&stp=other&r=" + t
                            })();
                            var q = o.href.indexOf("http://v.baidu.com/s?") > -1 ? o + "&" + p : o.href;
                            window.open(q, "_blank")
                        }
                    });
                    m.setAttribute("data-clickbinded", true)
                }
            })
        }

        function j(m, l) {
            var k = c.dom.query(".tang-carousel-dotted li", m.getElement());
            c.array.each(k, function (p, o) {
                p.className = ""
            });
            k[l].className = "item-selected"
        }
    });
    return b
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/control/Carousel/$fx/$fx.js", "/browse_static/common/ui/magic/control/Carousel/$button/$button.js", "/browse_static/common/ui/magic/control/Carousel/$autoScroll/$autoScroll.js", "/browse_static/common/ui/magic/setup/carousel/carousel.js", "/browse_static/common/lib/tangram/fx/fadeIn/fadeIn.js", "/browse_static/common/lib/tangram/fx/fadeOut/fadeOut.js"]);
F.module("/browse_static/widget/common/new_search/new_search.js", function (b, e) {
    var c = b("/browse_static/common/lib/tangram/base/base.js");
    var d = c.dom;
    var a = c.event;
    var h = c.fn;
    var f = c.string;
    var g = b("/browse_static/common/ui/vs/loginCheck/loginCheck.js");
    var i = {el: null, pageTn: "", apiUrl: "http://list.video.baidu.com/api_prekeyword.json?v=", placeHolderClass: "place-holder", init: function (l) {
        var j = this;
        var m = j.el = d.g("kw");
        var k = location.search.match(/[&?]q=([^&]+)/);
        j.pageTn = f.trim(l);
        if (!!m && !f.trim(m.value) && !k && j.pageTn) {
            window.videoPreKeywordMIS = h.bind(j.dataLoadHandler, j);
            a.on(m, "focus", h.bind(j.focusHandler, j));
            a.on(m, "blur", h.bind(j.blurHandler, j));
            g(function (n) {
                var o = n && n.vipinfo && n.vipinfo.isvalid && n.vipinfo.isvip;
                if (o) {
                    j.apiUrl = "http://list.video.baidu.com/api_prekeyword_vip.json?v="
                }
                j.request()
            })
        }
    }, dataLoadHandler: function (l) {
        var j = this;
        var k = !!l && l.length && !!l[0].data && l[0].data.videos || [];
        if (k.length) {
            c.array.each(k, function (m) {
                var n = f.trim(m.s_intro);
                if (n == j.pageTn) {
                    j.keyword = f.trim(m.title);
                    return false
                }
            })
        }
        j.fillIn()
    }, keyword: "", request: function () {
        var j = this;
        d.addClass(j.el, j.placeHolderClass);
        c.sio.callByServer(j.apiUrl + j.version(), "videoPreKeywordMIS")
    }, version: function () {
        return +new Date()
    }, fillIn: function () {
        var j = this;
        var k = j.el;
        if (d.hasClass(k, j.placeHolderClass) && !!j.keyword) {
            k.value = j.keyword
        }
    }, focusHandler: function (l) {
        var j = this;
        var k = j.el;
        j.value = "";
        if (d.hasClass(k, j.placeHolderClass)) {
            d.removeClass(k, j.placeHolderClass);
            k.value = ""
        }
    }, blurHandler: function (m) {
        var k = this;
        var l = k.el;
        var j = f.trim(l.value);
        if (!j) {
            d.addClass(l, k.placeHolderClass);
            k.fillIn()
        }
    }, isPrekeyword: function () {
        var j = this;
        var k = j.el;
        return !!k && d.hasClass(k, j.placeHolderClass) && !!k.value && (k.value == j.keyword)
    }};
    e = i;
    return e
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/vs/loginCheck/loginCheck.js"]);
F.module("/browse_static/widget/common/feedback/feedback.js", function (c, a) {
    var b = c("/browse_static/common/lib/tangram/base/base.js");
    var d = b.dom.fixable("feedBackBtn", {vertival: "top", horizontal: "right", offset: {x: 0, y: 152}});
    d.render();
    return a
}, ["/browse_static/common/lib/tangram/base/base.js"]);
F.module("/browse_static/widget/common/header_baoku_player/header_baoku_player.js", function (d, b) {
    var c = d("/browse_static/common/lib/tangram/base/base.js");
    var h = c.dom;
    var g = c.event;
    d("/browse_static/common/ui/magic/control/Suggestion/Suggestion.js");
    var e = d("/browse_static/common/ui/magic/setup/suggestion/suggestion.js");
    var a = {appendHTML: '<span class="tang-suggestion-closeBtn">�ر�</span>', holdHightLight: true, getData: function (k) {
        var j = this;
        var i = "http://nssug.baidu.com/su?wd=" + k + "&prod=yingyin_browser";
        c.sio.callByBrowser(i);
        window.baidu || (window.baidu = {});
        window.baidu.sug = function (m) {
            var l = m.s;
            j.receiveData(k, l)
        }
    }, onconfirm: function (i) {
        c.event.fire("searchForm", "submit")
    }, offset: {offsetX: 0, offsetY: 4}};
    var f = {init: function () {
        var j = h.g("searchForm");
        var i = e("searchValue", a);
        g.on(j, "submit", this.resVideoSearch);
        g.on(h.q("searchBottomBtn", j)[0], "click", this.resVideoSearch);
        i.on("onrender", function () {
            var k = i.suggestion;
            var l = k && k.getElement();
            var m = h.q("tang-suggestion-closeBtn", l)[0];
            h.addClass(l, "baoku-player-header-suggestion");
            g.on(m, "click", function () {
                i.hide()
            })
        })
    }, resVideoSearch: function () {
        var j = h.g("searchValue").value;
        var i = "http://baoku.baidu.com/search.php?ie=utf8&flag=sug&word=" + encodeURIComponent(j);
        window.open(i, "_blank");
        return false
    }};
    c.dom.ready(function () {
        f.init()
    });
    return b
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/control/Suggestion/Suggestion.js", "/browse_static/common/ui/magic/setup/suggestion/suggestion.js"]);
F.module("/browse_static/widget/common/gamepromo/gamepromo.js", function (d, a) {
    var c = d("/browse_static/common/lib/tangram/core/core.js");

    function b(g) {
        var f = function () {
            g.css("top", document.documentElement.scrollTop + document.documentElement.clientHeight - 100)
        };
        var h = null;
        c(window).scroll(function () {
            clearTimeout(h);
            h = setTimeout(function () {
                f()
            }, 50)
        });
        c(window).resize(function () {
            clearTimeout(h);
            h = setTimeout(function () {
                f()
            }, 50)
        });
        f()
    }

    function e() {
        var h = c.cookie.get("isPromoAngrybirds");
        if (h == 2) {
            return
        }
        var g = c.swf.createHTML({id: "gamepromoflash1", url: "http://list.video.baidu.com/pc_static/promotion/xiaoniao_200.swf", width: 200, height: 200, wmode: "transparent", allowScriptAccess: "always"});
        var j = c.swf.createHTML({id: "gamepromoflash2", url: "http://list.video.baidu.com/pc_static/promotion/xiaoniao_100.swf", width: 100, height: 100, wmode: "transparent", allowScriptAccess: "always"});
        var i = c('<div id="gamepromo"><div class="game-promo-big"></div><div class="game-promo-small">' + j + '</div><a href="javascript:void(0)" class="link-close" data-static="true"></a></div>').appendTo(document.body);
        var f = i.find(".game-promo-big");
        if (c.browser.ie == 6) {
            b(i);
            i.css("position", "absolute")
        } else {
            i.css("bottom", 0)
        }
        window.popupZoomIn = function () {
            i.removeClass("big")
        };
        window.popupZoomOut = function () {
            i.addClass("big");
            f.html(g);
            c.sio("http://nsclick.baidu.com/v.gif?pid=104&tn=game_promo&bl=bird").log()
        };
        window.popupDownClick = function () {
            c.sio("http://nsclick.baidu.com/v.gif?pid=104&tn=game_promo&bl=flash").log()
        };
        i.find(".link-close").click(function () {
            i.hide();
            c.sio("http://nsclick.baidu.com/v.gif?pid=104&tn=game_promo&bl=close").log();
            c.cookie.set("isPromoAngrybirds", "2", {path: "/", expires: 31536000000})
        });
        if (!h) {
            i.addClass("big");
            f.html(g);
            c.cookie.set("isPromoAngrybirds", "1", {path: "/", expires: 31536000000})
        } else {
            i.removeClass("big");
            f.html("")
        }
        c.sio("http://nsclick.baidu.com/p.gif?pid=104&tn=game_promo").log()
    }

    a.init = function () {
        c(function () {
            e()
        })
    };
    return a
}, ["/browse_static/common/lib/tangram/core/core.js"]);
F.module("/browse_static/widget/common/tabpicarea/tabpicarea.js", function (d, b) {
    var c = d("/browse_static/common/lib/tangram/base/base.js");
    var a = d("/browse_static/common/ui/magic/setup/tab/tab.js");
    var e = function (f) {
        c.dom.ready(function () {
            var g = a(f, {selectEvent: "mouseover", selectDelay: 50});
            g.on("onselect", function (i) {
                var l = i.index;
                var m = c.dom.children(this.getElement("title"));
                var k = "tang-title-item-next";
                c.array.each(m, function (s, r) {
                    c.dom.removeClass(s, k)
                });
                var o = m[l + 1];
                if (o) {
                    c.dom.addClass(o, k)
                }
                if (window.ec) {
                    window.ec.fire("change_pic_tab")
                }
                var j = c.dom.children(this.getElement("body"));
                var n = j[l];
                var p = n.getElementsByTagName("script")[0];
                var q;
                if (p && ("text/tabcontent" == p.type)) {
                    q = document.createDocumentFragment();
                    h(p.innerHTML, q);
                    n.appendChild(q);
                    c.dom.remove(p)
                }
            });
            g.select(0);
            function h(i, k) {
                var j = document.createElement("div");
                j.innerHTML = i;
                while (j.childNodes.length) {
                    k.appendChild(j.childNodes[0])
                }
                j = null
            }
        })
    };
    b = e;
    return b
}, ["/browse_static/common/lib/tangram/base/base.js", "/browse_static/common/ui/magic/setup/tab/tab.js"]);