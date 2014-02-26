STK.register("kit.dom.parentAttr", function (a) {
    return function (a, b, c) {
        var d;
        if (a && b) {
            c = c || document.body;
            while (a && a != c && !(d = a.getAttribute(b)))a = a.parentNode
        }
        return d
    }
});
STK.register("kit.extra.merge", function (a) {
    return function (a, b) {
        var c = {};
        for (var d in a)c[d] = a[d];
        for (var d in b)c[d] = b[d];
        return c
    }
});
STK.register("common.getDiss", function (a) {
    return function () {
        var b = {}, c = 0, d = {location: $CONFIG.location};
        arguments[0] && !a.core.dom.isNode(arguments[0]) && (b = arguments[c++]);
        b = a.kit.extra.merge(b, d);
        if (!arguments[c])return b;
        b = a.kit.extra.merge(b, a.core.json.queryToJson(a.kit.dom.parentAttr(arguments[c++], "diss-data", arguments[c]) || ""));
        return b
    }
});
STK.register("kit.dom.layoutPos", function (a) {
    return function (b, c, d) {
        if (!a.isNode(c))throw"kit.dom.layerOutElement need element as first parameter";
        if (c === document.body)return!1;
        if (!c.parentNode)return!1;
        if (c.style.display === "none")return!1;
        var e, f, g, h, i, j, k;
        e = a.parseParam({pos: "left-bottom", offsetX: 0, offsetY: 0}, d);
        f = c;
        if (!f)return!1;
        while (f !== document.body) {
            f = f.parentNode;
            if (f.style.display === "none")return!1;
            j = a.getStyle(f, "position");
            k = f.getAttribute("layout-shell");
            if (j === "absolute" || j === "fixed")break;
            if (k === "true" && j === "relative")break
        }
        f.appendChild(b);
        g = a.position(c, {parent: f});
        h = {w: c.offsetWidth, h: c.offsetHeight};
        i = e.pos.split("-");
        i[0] === "left" ? b.style.left = g.l + e.offsetX + "px" : i[0] === "right" ? b.style.left = g.l + h.w + e.offsetX + "px" : i[0] === "center" && (b.style.left = g.l + h.w / 2 + e.offsetX + "px");
        i[1] === "top" ? b.style.top = g.t + e.offsetY + "px" : i[1] === "bottom" ? b.style.top = g.t + h.h + e.offsetY + "px" : i[1] === "middle" && (b.style.top = g.t + h.h / 2 + e.offsetY + "px");
        return!0
    }
});
STK.register("kit.dom.fix", function (a) {
    function f(c, e, f) {
        if (!!d(c)) {
            var g = "fixed", h, i, j, k, l = c.offsetWidth, m = c.offsetHeight, n = a.core.util.winSize(), o = 0, p = 0, q = a.core.dom.cssText(c.style.cssText);
            if (!b) {
                g = "absolute";
                var r = a.core.util.scrollPos();
                o = h = r.top;
                p = i = r.left;
                switch (e) {
                    case"lt":
                        h += f[1];
                        i += f[0];
                        break;
                    case"lb":
                        h += n.height - m - f[1];
                        i += f[0];
                        break;
                    case"rt":
                        h += f[1];
                        i += n.width - l - f[0];
                        break;
                    case"rb":
                        h += n.height - m - f[1];
                        i += n.width - l - f[0];
                        break;
                    case"c":
                    default:
                        h += (n.height - m) / 2 + f[1];
                        i += (n.width - l) / 2 + f[0]
                }
                j = k = ""
            } else {
                h = k = f[1];
                i = j = f[0];
                switch (e) {
                    case"lt":
                        k = j = "";
                        break;
                    case"lb":
                        h = j = "";
                        break;
                    case"rt":
                        i = k = "";
                        break;
                    case"rb":
                        h = i = "";
                        break;
                    case"c":
                    default:
                        h = (n.height - m) / 2 + f[1];
                        i = (n.width - l) / 2 + f[0];
                        k = j = ""
                }
            }
            if (e == "c") {
                h < o && (h = o);
                i < p && (i = p)
            }
            q.push("position", g).push("top", h + "px").push("left", i + "px").push("right", j + "px").push("bottom", k + "px");
            c.style.cssText = q.getCss()
        }
    }

    function e(b) {
        b = a.core.arr.isArray(b) ? b : [0, 0];
        for (var c = 0; c < 2; c++)typeof b[c] != "number" && (b[c] = 0);
        return b
    }

    function d(b) {
        return a.core.dom.getStyle(b, "display") != "none"
    }

    var b = !(a.core.util.browser.IE6 || document.compatMode !== "CSS1Compat" && STK.IE), c = /^(c)|(lt)|(lb)|(rt)|(rb)$/;
    return function (d, g, h) {
        var i, j, k = !0, l;
        if (a.core.dom.isNode(d) && c.test(g)) {
            var m = {getNode: function () {
                return d
            }, isFixed: function () {
                return k
            }, setFixed: function (a) {
                (k = !!a) && f(d, i, j);
                return this
            }, setAlign: function (a, b) {
                if (c.test(a)) {
                    i = a;
                    j = e(b);
                    k && f(d, i, j)
                }
                return this
            }, destroy: function () {
                b || b && a.core.evt.removeEvent(window, "scroll", n);
                a.core.evt.removeEvent(window, "resize", n);
                a.core.evt.custEvent.undefine(l)
            }};
            l = a.core.evt.custEvent.define(m, "beforeFix");
            m.setAlign(g, h);
            function n(c) {
                c = c || window.event;
                a.core.evt.custEvent.fire(l, "beforeFix", c.type);
                k && (!b || i == "c") && f(d, i, j)
            }

            b || a.core.evt.addEvent(window, "scroll", n);
            a.core.evt.addEvent(window, "resize", n);
            return m
        }
    }
});
STK.register("kit.dom.drag", function (a) {
    return function (b, c) {
        var d, e, f, g, h, i, j, k, l = function () {
            m();
            n()
        }, m = function () {
            d = a.parseParam({moveDom: b, perchStyle: "border:solid #999999 2px;", dragtype: "perch", actObj: {}, pagePadding: 5}, c);
            f = d.moveDom;
            e = {};
            g = {};
            h = a.drag(b, {actObj: d.actObj});
            if (d.dragtype === "perch") {
                i = a.C("div");
                j = !1;
                k = !1;
                f = i
            }
            b.style.cursor = "move"
        }, n = function () {
            a.custEvent.add(d.actObj, "dragStart", o);
            a.custEvent.add(d.actObj, "dragEnd", p);
            a.custEvent.add(d.actObj, "draging", q)
        }, o = function (c, e) {
            document.body.style.cursor = "move";
            var f = a.core.util.pageSize().page;
            g = a.core.dom.position(d.moveDom);
            g.pageX = e.pageX;
            g.pageY = e.pageY;
            g.height = d.moveDom.offsetHeight;
            g.width = d.moveDom.offsetWidth;
            g.pageHeight = f.height;
            g.pageWidth = f.width;
            if (d.dragtype === "perch") {
                var h = [];
                h.push(d.perchStyle);
                h.push("position:absolute");
                h.push("z-index:" + (d.moveDom.style.zIndex + 10));
                h.push("width:" + d.moveDom.offsetWidth + "px");
                h.push("height:" + d.moveDom.offsetHeight + "px");
                h.push("left:" + g.l + "px");
                h.push("top:" + g.t + "px");
                i.style.cssText = h.join(";");
                k = !0;
                setTimeout(function () {
                    if (k) {
                        document.body.appendChild(i);
                        j = !0
                    }
                }, 100)
            }
            b.setCapture !== undefined && b.setCapture()
        }, p = function (a, c) {
            document.body.style.cursor = "auto";
            b.setCapture !== undefined && b.releaseCapture();
            if (d.dragtype === "perch") {
                k = !1;
                d.moveDom.style.top = i.style.top;
                d.moveDom.style.left = i.style.left;
                if (j) {
                    document.body.removeChild(i);
                    j = !1
                }
            }
        }, q = function (a, b) {
            var c = g.t + (b.pageY - g.pageY), e = g.l + (b.pageX - g.pageX), h = c + g.height, i = e + g.width, j = g.pageHeight - d.pagePadding, k = g.pageWidth - d.pagePadding;
            if (h < j && c > 0)f.style.top = c + "px"; else {
                var l;
                h >= j && (l = j - g.height);
                if (c < 0 || l < 0)l = 0;
                f.style.top = l + "px"
            }
            if (i < k && e > 0)f.style.left = e + "px"; else {
                e < 0 && (f.style.left = "0px");
                i >= k && (f.style.left = k - g.width + "px")
            }
        };
        l();
        e.destroy = function () {
            document.body.style.cursor = "auto";
            typeof f.setCapture == "function" && f.releaseCapture();
            if (d.dragtype === "perch") {
                k = !1;
                if (j) {
                    document.body.removeChild(i);
                    j = !1
                }
            }
            a.custEvent.remove(d.actObj, "dragStart", o);
            a.custEvent.remove(d.actObj, "dragEnd", p);
            a.custEvent.remove(d.actObj, "draging", q);
            h.destroy && h.destroy();
            d = null;
            f = null;
            g = null;
            h = null;
            i = null;
            j = null;
            k = null
        };
        e.getActObj = function () {
            return d.actObj
        };
        return e
    }
});
STK.register("kit.dom.parseDOM", function (a) {
    return function (a) {
        for (var b in a)a[b] && a[b].length == 1 && (a[b] = a[b][0]);
        return a
    }
});
STK.register("kit.extra.language", function (a) {
    window.$LANG || (window.$LANG = {});
    return function (b) {
        var c = [].splice.call(arguments, 1, arguments.length), d = [b, $LANG].concat(c), e = a.core.util.language.apply(this, d);
        return e
    }
});
STK.register("ui.mod.layer", function (a) {
    var b = a.kit.extra.language, c = '<div node-type="outer" class="layer_menu_list" style="display:none;position:absolute;"></div>';
    return function (d, e) {
        var f, g, h, i, j, k, l = null, m = function (a) {
            var b = {};
            if (a.style.display == "none") {
                a.style.visibility = "hidden";
                a.style.display = "";
                b.w = a.offsetWidth;
                b.h = a.offsetHeight;
                a.style.display = "none";
                a.style.visibility = "visible"
            } else {
                b.w = a.offsetWidth;
                b.h = a.offsetHeight
            }
            return b
        }, n = function (b, c) {
            c = c || "topleft";
            var d = {};
            if (b.style.display == "none") {
                b.style.visibility = "hidden";
                b.style.display = "";
                d = a.core.dom.position(b);
                b.style.display = "none";
                b.style.visibility = "visible"
            } else d = a.core.dom.position(b);
            var e = m(b);
            switch (c) {
                case"topleft":
                    break;
                case"topright":
                    d.l = d.l + e.w;
                    break;
                case"bottomleft":
                    d.t = d.t + e.h;
                    break;
                case"bottomright":
                    d.l = d.l + e.w;
                    d.t = d.t + e.h;
                    break;
                default:
            }
            return d
        }, o = {show: function () {
            if (i && i.box) {
                j && j.appendChild(i.box);
                delete i.box
            }
            g.style.display = "";
            a.custEvent.fire(o, "show");
            return o
        }, hide: function () {
            g.style.display = "none";
            a.custEvent.fire(o, "hide");
            return o
        }, getDomList: function (b) {
            b && (h = a.kit.dom.parseDOM(a.builder(g).list));
            return h
        }, getState: function () {
            return g.style.display == "none" ? !1 : !0
        }, getID: function () {
            return f.id
        }, getBox: function () {
            return g
        }, getOuter: function () {
            return g
        }, html: function (a) {
            typeof a == "string" ? g.innerHTML = a : g.appendChild(a);
            return o
        }, setTop: function () {
            g.parentNode && g.parentNode.appendChild(g);
            return o
        }, setPosition: function (a) {
            g.style.top = a.t + "px";
            g.style.left = a.l + "px";
            return o
        }, getPosition: function (a) {
            return n(g, a)
        }, setLayoutPos: function (b, c) {
            a.kit.dom.layoutPos(g, b, c);
            return o
        }, setMiddle: function () {
            var b = a.core.util.winSize(), c = o.getSize(!0), d = a.core.util.scrollPos().top + (b.height - c.h) / 2;
            g.style.top = (d > 0 ? d : 0) + "px";
            g.style.left = (b.width - c.w) / 2 + "px";
            return o
        }, setAlign: function (b) {
            b = a.parseParam({type: "c", offset: [0, 0]}, b || {});
            k = a.kit.dom.fix(g, b.type, b.offset);
            return o
        }, getSize: function (a) {
            if (a || !l)l = m(g);
            return l
        }, setIndex: function (a) {
            g.style.zIndex = a
        }, destroy: function () {
            g.style.display = "none";
            a.removeNode(g);
            k && k.destroy();
            g = null
        }}, p = {init: function () {
            p.pars();
            p.build();
            p.bind()
        }, pars: function () {
            f = a.parseParam({id: "layer_" + a.core.util.getUniqueKey(), node: null, template: "", appendTo: document.body, draggable: !1}, e || {});
            if (a.isNode(d))f.node = d || f.node; else switch ((typeof d || "").toLowerCase()) {
                case"string":
                    f.id = d || f.id;
                    f.node = a.E(f.id) || null;
                    break;
                case"object":
                    f = a.parseParam(f, d || {})
            }
        }, build: function () {
            g = f.node;
            j = f.appendTo;
            if (!g) {
                i = a.builder(b(f.template || c));
                g = i.list.outer[0]
            } else a.contains(j, g) || j && j.appendChild(g);
            g.id = f.id;
            h = a.kit.dom.parseDOM(a.builder(g).list)
        }, bind: function () {
            a.custEvent.define(o, ["show", "hide"]);
            f.draggable && a.kit.dom.drag(g, {actObj: g, moveDom: g})
        }};
        p.init();
        return o
    }
});
STK.register("ui.mask", function (a) {
    function k(b) {
        var c;
        (c = b.getAttribute(f)) || b.setAttribute(f, c = a.getUniqueKey());
        return">" + b.tagName.toLowerCase() + "[" + f + '="' + c + '"]'
    }

    function j() {
        b = a.C("div");
        var c = '<div node-type="outer">';
        a.core.util.browser.IE6 && (c += '<div style="position:absolute;width:100%;height:100%;"></div>');
        c += "</div>";
        b = a.builder(c).list.outer[0];
        document.body.appendChild(b);
        e = !0;
        d = a.kit.dom.fix(b, "lt");
        var f = function () {
            var c = a.core.util.winSize();
            b.style.cssText = a.core.dom.cssText(b.style.cssText).push("width", c.width + "px").push("height", c.height + "px").getCss()
        };
        i.add(d, "beforeFix", f);
        f()
    }

    var b, c = [], d, e = !1, f = "STK-Mask-Key", g = a.core.dom.setStyle, h = a.core.dom.getStyle, i = a.core.evt.custEvent, l = {getNode: function () {
        return b
    }, show: function (c, f) {
        if (e) {
            c = a.core.obj.parseParam({opacity: .3, background: "#000000"}, c);
            b.style.background = c.background;
            g(b, "opacity", c.opacity);
            b.style.display = "";
            d.setAlign("lt");
            f && f()
        } else {
            j();
            l.show(c, f)
        }
        return l
    }, hide: function () {
        b.style.display = "none";
        c = [];
        return l
    }, showUnderNode: function (d, e) {
        a.isNode(d) && l.show(e, function () {
            g(b, "zIndex", h(d, "zIndex"));
            var e = k(d), f = a.core.arr.indexOf(c, e);
            f != -1 && c.splice(f, 1);
            c.push(e);
            a.core.dom.insertElement(d, b, "beforebegin")
        });
        return l
    }, back: function () {
        if (c.length < 1)return l;
        var d, e;
        c.pop();
        if (c.length < 1)l.hide(); else if ((e = c[c.length - 1]) && (d = a.sizzle(e, document.body)[0])) {
            g(b, "zIndex", h(d, "zIndex"));
            a.core.dom.insertElement(d, b, "beforebegin")
        } else l.back();
        return l
    }, resetSize: function () {
        var c = a.core.util.winSize();
        b.style.cssText = a.core.dom.cssText(b.style.cssText).push("width", c.width + "px").push("height", c.height + 22 + "px").getCss();
        return l
    }, destroy: function () {
        i.remove(d);
        b.style.display = "none"
    }};
    return l
});
STK.register("ui.layer", function (a) {
    return function (b, c) {
        var d, e, f, g = !1, h, i = {init: function () {
            i.pars();
            i.build();
            i.bind()
        }, pars: function () {
        }, build: function () {
            d = a.ui.mod.layer(b, c);
            e = d.getBox()
        }, bind: function () {
        }};
        i.init();
        h = d;
        h.setMask = function () {
            a.custEvent.add(d, "show", function () {
                g || a.ui.mask.showUnderNode(e);
                g = !0
            });
            a.custEvent.add(d, "hide", function () {
                a.ui.mask.back();
                g = !1
            })
        };
        return h
    }
});
STK.register("kit.io.ajax", function (a) {
    var b = function (b, c, d) {
        c = c | 0 || 1;
        d = d || "fail";
        var e = b.args;
        e.__rnd && delete e.__rnd;
        (new Image).src = "http://weibolog.sinaapp.com/?t=" + c + "&u=" + encodeURIComponent(b.url) + "&p=" + encodeURIComponent(a.core.json.jsonToQuery(e)) + "&m=" + d
    };
    return function (c) {
        var d = {}, e = [], f = null, g = !1, h = a.parseParam({url: "", method: "get", responseType: "json", timeout: 3e4, onTraning: a.funcEmpty, isEncode: !0}, c);
        h.onComplete = function (a) {
            g = !1;
            c.onComplete(a, h.args);
            setTimeout(i, 0)
        };
        h.onFail = function (a) {
            g = !1;
            if (typeof c.onFail == "function")try {
                c.onFail(a, h.args)
            } catch (d) {
            }
            setTimeout(i, 0);
            try {
                b(h)
            } catch (d) {
            }
        };
        h.onTimeout = function (a) {
            try {
                b(h);
                c.onTimeout(a)
            } catch (d) {
            }
        };
        var i = function () {
            if (!!e.length) {
                if (g === !0)return;
                g = !0;
                h.args = e.shift();
                if (h.method.toLowerCase() == "post") {
                    var b = a.core.util.URL(h.url);
                    b.setParam("__rnd", +(new Date));
                    h.url = b.toString()
                }
                f = a.ajax(h)
            }
        }, j = function (a) {
            while (e.length)e.shift();
            g = !1;
            if (f)try {
                f.abort()
            } catch (b) {
            }
            f = null
        };
        d.request = function (a) {
            a || (a = {});
            c.noQueue && j();
            if (!c.uniqueRequest || !f) {
                e.push(a);
                a._t = 0;
                i()
            }
        };
        d.abort = j;
        return d
    }
});
STK.register("kit.io.jsonp", function (a) {
    return function (b) {
        var c = a.parseParam({url: "", method: "get", responseType: "json", varkey: "_v", timeout: 3e4, onComplete: a.funcEmpty, onTraning: a.funcEmpty, onFail: a.funcEmpty, isEncode: !0}, b), d = [], e = {}, f = !1, g = function () {
            if (!!d.length) {
                if (f === !0)return;
                f = !0;
                e.args = d.shift();
                e.onComplete = function (a) {
                    f = !1;
                    c.onComplete(a, e.args);
                    setTimeout(g, 0)
                };
                e.onFail = function (a) {
                    f = !1;
                    c.onFail(a);
                    setTimeout(g, 0)
                };
                a.jsonp(a.core.json.merge(c, {args: e.args, onComplete: function (a) {
                    e.onComplete(a)
                }, onFail: function (a) {
                    try {
                        e.onFail(a)
                    } catch (b) {
                    }
                }}))
            }
        }, h = {};
        h.request = function (a) {
            a || (a = {});
            d.push(a);
            a._t = 1;
            g()
        };
        h.abort = function (a) {
            while (d.length)d.shift();
            f = !1;
            e = null
        };
        return h
    }
});
STK.register("kit.io.ijax", function (a) {
    return function (b) {
        var c = a.parseParam({url: "", timeout: 3e4, isEncode: !0, abaurl: null, responseName: null, varkey: "callback", abakey: "callback"}, b), d = [], e = null, f = !1;
        c.onComplete = function (a, d) {
            f = !1;
            b.onComplete(a, c.form, d);
            c.form = null;
            c.args = null;
            setTimeout(g, 0)
        };
        c.onFail = function (a, d) {
            f = !1;
            b.onFail(a, c.form, d);
            c.form = null;
            c.args = null;
            setTimeout(g, 0)
        };
        var g = function () {
            var b;
            if (!!d.length) {
                if (f === !0)return;
                f = !0;
                b = d.shift();
                c.args = b.args;
                c.form = b.form;
                e = a.ijax(c)
            }
        }, h = function (a) {
            while (d.length)d.shift();
            f = !1;
            if (e)try {
                e.abort()
            } catch (b) {
            }
            e = null
        }, i = {};
        i.request = function (c, e) {
            if (!a.isNode(c))throw"[kit.io.ijax.request] need a form as first parameter";
            e || (e = {});
            b.noQueue && h();
            d.push({form: c, args: e});
            g()
        };
        i.abort = h;
        return i
    }
});
STK.register("kit.io.inter", function (a) {
    var b = a.core.json.merge;
    return function () {
        var c = {}, d = {}, e = {}, f = function (a, b) {
            return function (c, d) {
                try {
                    b.onComplete(c, d)
                } catch (f) {
                }
                try {
                    if (c.code === "100000")b.onSuccess(c, d); else {
                        if (c.code === "100002") {
                            location.href = c.data;
                            return
                        }
                        b.onError(c, d)
                    }
                } catch (f) {
                }
                for (var g in e[a])try {
                    e[a][g](c, d)
                } catch (f) {
                }
            }
        };
        c.register = function (a, b) {
            if (typeof d[a] != "undefined")throw a + " registered";
            d[a] = b;
            e[a] = {}
        };
        c.addHook = function (b, c) {
            var d = a.core.util.getUniqueKey();
            e[b][d] = c;
            return d
        };
        c.rmHook = function (a, b) {
            e[a] && e[a][b] && delete e[a][b]
        };
        c.getTrans = function (c, e) {
            var g = b(d[c], e);
            g.onComplete = f(c, e);
            var h = d[c].requestMode, i = "ajax";
            if (h === "jsonp" || h === "ijax")i = h;
            return a.kit.io[i](g)
        };
        c.request = function (c, e, g) {
            var h = b(d[c], e);
            h.onComplete = f(c, e);
            h = a.core.obj.cut(h, ["noqueue"]);
            h.args = g;
            var i = d[c].requestMode;
            return i === "jsonp" ? a.jsonp(h) : i === "ijax" ? a.ijax(h) : a.ajax(h)
        };
        return c
    }
});
STK.register("common.trans.editor", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("face", {url: "/aj/mblog/face?type=face&_wv=5"});
    c("magicFace", {url: "/aj/mblog/face?type=ani&_wv=5"});
    c("getTopic", {url: "/aj/mblog/trend?_wv=5"});
    c("cartoon", {url: "/aj/mblog/face?type=cartoon&_wv=5"});
    c("suggestMusic", {url: "/aj/mblog/music/suggest?_wv=5", requestMode: "jsonp"});
    c("searchMusic", {url: "http://music.weibo.com/t/port/ajax_search_music_song.php", method: "get", requestMode: "jsonp"});
    c("addMusic", {url: "/aj/mblog/music/submit?_wv=5", requestMode: "jsonp"});
    c("parseMusic", {url: "/aj/mblog/music/parse?_wv=5", requestMode: "jsonp"});
    c("parseVideo", {url: "/aj/mblog/video?_wv=5"});
    c("waterMark", {url: "/aj/account/watermark?_wv=5"});
    c("publishToWeiqun", {url: "/aj/weiqun/add?_wv=5", method: "post"});
    c("rectopic", {url: "/aj/mblog/rectopic?_wv=5"});
    c("interactive", {url: "/aj/mblog/interactive?_wv=5", method: "post"});
    c("plugin", {url: "/aj/publishplug/plug?_wv=5", method: "post"});
    c("favSongSearch", {url: "http://music.weibo.com/yueku/port/sina_t_getcollect.php", method: "get", requestMode: "jsonp"});
    c("getOutlinkInfo", {url: "http://api.weibo.com/widget/info.json", varkey: "callback", method: "get", requestMode: "jsonp"});
    c("tabLog", {url: "http://music.weibo.com/t/port/ajax_log_action.php", method: "get", requestMode: "jsonp"});
    c("getPublish", {url: "/aj/top/usergroup?_wv=5", method: "get"});
    c("getTvLink", {url: "/aj/proxy/thirdapi?_wv=5", method: "get"});
    c("getuserlist", {url: "/aj/gift/getuserlist?_wv=5", method: "get"});
    c("getlist", {url: "/aj/gift/getlist?_wv=5", method: "post"});
    c("sendGift", {url: "/aj/gift/send?_wv=5", method: "post"});
    c("newyear", {url: "/aj/publishplug/bainian?_wv=5", method: "get"});
    return b
});
STK.register("common.trans.feed", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("publish", {url: "/aj/mblog/add?_wv=5", method: "post"});
    c("delete", {url: "/aj/mblog/del?_wv=5", method: "post"});
    c("forward", {url: "/aj/mblog/forward?_wv=5", method: "post"});
    c("mediaShow", {url: "http://api.weibo.com/widget/show.jsonp", varkey: "jsonp", method: "get", requestMode: "jsonp"});
    c("qingShow", {url: "http://api.t.sina.com.cn/widget/show.json?source=3818214747", varkey: "callback", method: "get", requestMode: "jsonp"});
    c("profileSearch", {url: "/aj/mblog/mbloglist?_wv=5", method: "get"});
    c("homeSearch", {url: "/aj/mblog/fsearch?_wv=5", method: "get"});
    c("groupSearch", {url: "/aj/relation/status?_wv=5", method: "get"});
    c("sendMeSearch", {url: "/aj/mblog/sendme?_wv=5", method: "get"});
    c("atMeSearch", {url: "/aj/at/mblog/list?_wv=5", method: "get"});
    c("atMeShield", {url: "/aj/at/mblog/shield?_wv=5", method: "post"});
    c("widget", {url: "/aj/mblog/showinfo?_wv=5", method: "post"});
    c("third_rend", {url: "/aj/mblog/renderfeed?_wv=5", method: "post"});
    c("feedShield", {url: "/aj/user/block?_wv=5", method: "post"});
    c("feedTagList", {url: "/aj/mblog/tag/mytaglist?_wv=5", method: "post"});
    c("feedTagListHtml", {url: "/aj/mblog/tag/list?_wv=5", method: "get"});
    c("feedTagUpdate", {url: "/aj/mblog/tag/updatetags?_wv=5", method: "post"});
    c("feedTagDel", {url: "/aj/mblog/tag/destroy?_wv=5", method: "post"});
    c("feedTagEdit", {url: "/aj/mblog/tag/update?_wv=5", method: "post"});
    c("getAtmeComment", {url: "/aj/at/comment/comment?_wv=5", method: "get"});
    c("getAtmeBlog", {url: "/aj/at/mblog/mblog?_wv=5", method: "get"});
    c("getCommonComent", {url: "/aj/commentbox/common?_wv=5", method: "get"});
    c("getAttiudeList", {url: "/aj/attiudebox/in?_wv=5", method: "get"});
    c("memberTopFeed", {url: "/aj/mblog/markmembermblog?_wv=5", method: "post"});
    c("activityDelete", {url: "/aj/activities/del?_wv=5", method: "post"});
    c("activityShield", {url: "/aj/activities/block?_wv=5", method: "post"});
    c("common_media", {url: "http://api.weibo.com/widget/object_render.jsonp?source=3818214747", varkey: "callback", method: "get", requestMode: "jsonp"});
    c("showblock", {url: "/aj/blockword/showblock?_wv=5", method: "get"});
    c("update", {url: "/aj/blockword/update?_wv=5", method: "get"});
    c("showfiltermblogs", {url: "/aj/mblog/showfiltermblogs?_wv=5", method: "get"});
    c("refreshRecommend", {url: "/aj/mblog/recfeed?_wv=5", method: "get"});
    c("closeRecommend", {url: "/aj/mblog/recfeedclose?_wv=5", method: "get"});
    c("translate", {url: "/aj/mblog/translation?_wv=5", method: "get"});
    c("adShield", {url: "/aj/user/blockad?_wv=5", method: "post"});
    c("recmodlayer", {url: "/aj/photo/recomlayer?_wv=5", method: "get"});
    c("setAD", {url: "/aj/proxy/adclickserve?_wv=5", method: "post"});
    c("feedViews", {url: "/aj/vtasks/recom?_wv=5", method: "post"});
    c("delSpread", {url: "/aj/feedtrend/filter?_wv=5", method: "post"});
    c("popularizeEffect", {url: "/aj/vip/popeffect?_wv=5", method: "get"});
    return b
});
STK.register("common.listener", function (a) {
    var b = {}, c = {};
    c.define = function (c, d) {
        if (b[c] != null)throw"common.listener.define: 频道已被占用";
        b[c] = d;
        var e = {};
        e.register = function (d, e) {
            if (b[c] == null)throw"common.listener.define: 频道未定义";
            a.listener.register(c, d, e)
        };
        e.fire = function (d, e) {
            if (b[c] == null)throw"commonlistener.define: 频道未定义";
            a.listener.fire(c, d, e)
        };
        e.remove = function (b, d) {
            a.listener.remove(c, b, d)
        };
        e.cache = function (b) {
            return a.listener.cache(c, b)
        };
        return e
    };
    return c
});
STK.register("common.channel.feed", function (a) {
    var b = ["forward", "publish", "comment", "delete", "refresh", "reply", "feedTagUpdate", "feedTagMoreUpdate", "qfaceAdd", "qfaceCount"];
    return a.common.listener.define("common.channel.feed", b)
});
STK.register("common.channel.insertTopic", function (a) {
    var b = ["insert"];
    return a.common.listener.define("common.channel.insertTopic", b)
});
STK.register("common.channel.insertContent", function (a) {
    var b = ["insertContent"];
    return a.common.listener.define("common.channel.insertContent", b)
});
STK.register("common.channel.publishContent", function (a) {
    var b = ["publish"];
    return a.common.listener.define("common.channel.publishContent", b)
});
STK.register("ui.focusHistory", function (a) {
    var b = [], c = function (b) {
        if (!b || b == document.body)return!1;
        if (b.getAttribute && b.getAttribute("action-history")) {
            var c = a.core.json.queryToJson(b.getAttribute("action-history"));
            if (c && c.rec && c.rec == 1)return b
        }
        return arguments.callee(b.parentNode)
    }, d = function (b) {
        var b = a.fixEvent(b), d = c(b.target);
        d && e.push(d)
    }, e = {push: function (a) {
        b.push(a);
        b.length > 3 && b.shift()
    }, focusback: function (a) {
        var c = b.pop();
        if (!!c) {
            c.getAttribute && !c.getAttribute("tabIndex") && c.setAttribute("tabIndex", "0");
            setTimeout(function () {
                c.focus()
            }, 200)
        }
    }, destroy: function () {
        a.removeEvent(document.body, "click", d);
        b = null
    }}, f = function () {
        a.addEvent(document.body, "click", d)
    };
    f();
    return e
});
STK.register("ui.dialog", function (a) {
    var b = '<div class="W_layer" node-type="outer" style="display:none;position:absolute;z-index:10001"><div class="bg"><table border="0" cellspacing="0" cellpadding="0"><tr><td><div class="content" node-type="layoutContent"><div class="title" node-type="title"><span node-type="title_content"></span></div><a href="javascript:void(0);" class="W_close" title="#L{关闭}" node-type="close"></a><div node-type="inner"></div></div></td></tr></table></div></div>';
    return function (c, d) {
        var e, f, g, h, i, j, k, l, m, n, o = a.kit.extra.language, p = function () {
            e.hide()
        }, q = {init: function () {
            q.pars();
            q.build();
            q.bind()
        }, pars: function () {
            d || (d = {});
            d.template = o(d.template || b);
            typeof d.haveMask != "boolean" && (d.haveMask = !0)
        }, build: function () {
            e = a.ui.layer(c, d);
            d.haveMask && e.setMask();
            l = a.objSup(e, ["hide"]);
            f = e.getBox();
            g = e.getDomList(!0);
            h = g.title;
            i = g.title_content;
            j = g.inner;
            k = g.close
        }, bind: function () {
            a.addEvent(k, "click", function (b) {
                a.preventDefault(b);
                m.hide()
            });
            a.kit.dom.drag(h, {actObj: e, moveDom: f});
            a.custEvent.add(e, "show", function () {
                a.IE ? document.body.focus() : document.documentElement.focus();
                a.hotKey.add(document.documentElement, ["esc"], p, {type: "keyup", disableInInput: !0})
            });
            a.custEvent.add(e, "hide", function () {
                a.hotKey.remove(document.documentElement, ["esc"], p, {type: "keyup"})
            })
        }};
        q.init();
        m = e;
        m.hide = function (b) {
            if (typeof n == "function" && !b && n() === !1)return!1;
            l.hide();
            a.ui.focusHistory.focusback();
            return m
        };
        m.setTitle = function (a) {
            i.innerHTML = a;
            return m
        };
        m.setContent = m.appendChild = function (a) {
            j.innerHTML = "";
            typeof a == "string" ? j.innerHTML = a : j.appendChild(a);
            return m
        };
        m.insertElement = function (b, c) {
            c = c || "beforeend";
            a.core.dom.insertElement(j, b, c);
            return m
        };
        m.clearContent = function () {
            j.innerHTML = "";
            return m
        };
        m.setBeforeHideFn = function (a) {
            n = a;
            return m
        };
        m.clearBeforeHideFn = function () {
            n = null;
            return m
        };
        m.getClose = function () {
            return k
        };
        return m
    }
});
STK.register("kit.extra.textareaUtils", function (a) {
    var b = {}, c = document.selection;
    b.selectionStart = function (a) {
        if (!c)try {
            return a.selectionStart
        } catch (b) {
            return 0
        }
        var d = c.createRange(), e, f, g = 0, h = document.body.createTextRange();
        try {
            h.moveToElementText(a)
        } catch (b) {
        }
        for (g; h.compareEndPoints("StartToStart", d) < 0; g++)h.moveStart("character", 1);
        return g
    };
    b.selectionBefore = function (a) {
        return a.value.slice(0, b.selectionStart(a))
    };
    b.selectText = function (a, b, d) {
        a.focus();
        if (!c)a.setSelectionRange(b, d); else {
            var e = a.createTextRange();
            e.collapse(1);
            e.moveStart("character", b);
            e.moveEnd("character", d - b);
            e.select()
        }
    };
    b.insertText = function (a, d, e, f) {
        a.focus();
        f = f || 0;
        if (!c) {
            var g = a.value, h = e - f, i = h + d.length;
            a.value = g.slice(0, h) + d + g.slice(e, g.length);
            b.selectText(a, i, i)
        } else {
            var j = c.createRange();
            j.moveStart("character", -f);
            j.text = d
        }
    };
    b.replaceText = function (a, d) {
        a.focus();
        var e = a.value, f = b.getSelectedText(a), g = f.length;
        if (f.length == 0)b.insertText(a, d, b.getCursorPos(a)); else {
            var h = b.getCursorPos(a);
            if (!c) {
                var j = h + f.length;
                a.value = e.slice(0, h) + d + e.slice(h + g, e.length);
                b.setCursor(a, h + d.length);
                return
            }
            var i = c.createRange();
            i.text = d;
            b.setCursor(a, h + d.length)
        }
    };
    b.getCursorPos = function (a) {
        var b = 0;
        if (STK.core.util.browser.IE) {
            a.focus();
            var d = null;
            d = c.createRange();
            var e = d.duplicate();
            e.moveToElementText(a);
            e.setEndPoint("EndToEnd", d);
            a.selectionStartIE = e.text.length - d.text.length;
            a.selectionEndIE = a.selectionStartIE + d.text.length;
            b = a.selectionStartIE
        } else if (a.selectionStart || a.selectionStart == "0")b = a.selectionStart;
        return b
    };
    b.getSelectedText = function (a) {
        var b = "", d = function (a) {
            return a.selectionStart != undefined && a.selectionEnd != undefined ? a.value.substring(a.selectionStart, a.selectionEnd) : ""
        };
        window.getSelection ? b = d(a) : b = c.createRange().text;
        return b
    };
    b.setCursor = function (a, b, c) {
        b = b == null ? a.value.length : b;
        c = c == null ? 0 : c;
        a.focus();
        if (a.createTextRange) {
            var d = a.createTextRange();
            d.move("character", b);
            d.moveEnd("character", c);
            d.select()
        } else a.setSelectionRange(b, b + c)
    };
    b.unCoverInsertText = function (a, b, c) {
        c = c == null ? {} : c;
        c.rcs = c.rcs == null ? a.value.length : c.rcs * 1;
        c.rccl = c.rccl == null ? 0 : c.rccl * 1;
        var d = a.value, e = d.slice(0, c.rcs), f = d.slice(c.rcs + c.rccl, d == "" ? 0 : d.length);
        a.value = e + b + f;
        this.setCursor(a, c.rcs + (b == null ? 0 : b.length))
    };
    return b
});
STK.register("kit.extra.count", function (a) {
    function b(b) {
        var c = 41, d = 140, e = 20, f = b, g = b.match(/http:\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/,:;@&=\?\~\#\%]*)*/gi) || [], h = 0;
        for (var i = 0, j = g.length; i < j; i++) {
            var k = a.core.str.bLength(g[i]);
            if (/^(http:\/\/t.cn)/.test(g[i]))continue;
            /^(http:\/\/)+(t.sina.com.cn|t.sina.cn)/.test(g[i]) || /^(http:\/\/)+(weibo.com|weibo.cn)/.test(g[i]) ? h += k <= c ? k : k <= d ? e : k - d + e : h += k <= d ? e : k - d + e;
            f = f.replace(g[i], "")
        }
        var l = Math.ceil((h + a.core.str.bLength(f)) / 2);
        return l
    }

    return function (a) {
        a = a.replace(/\r\n/g, "\n");
        return b(a)
    }
});
STK.register("ui.mod.editor", function (a) {
    var b = a.addEvent, c = a.removeEvent, d = a.custEvent, e = a.getStyle, f = a.setStyle;
    return function (e, f) {
        var g = {}, f = f, h = {}, i = "", j = "", k = "", l = {reset: function () {
            h.textEl.value = "";
            d.fire(g, "changed");
            h.textEl.removeAttribute("extra");
            i = j = k = ""
        }, delWords: function (a) {
            var b = l.getWords();
            if (!(b.indexOf(a) > -1))return!1;
            h.textEl.value = "";
            n.textInput(b.replace(a, ""))
        }, getWords: function () {
            return a.core.str.trim(h.textEl.value)
        }, getExtra: function () {
            var b, c = h.textEl.getAttribute("extra") || "";
            c != null && (b = a.core.str.trim(c));
            return b
        }, focus: function (b, c) {
            if (typeof b != "undefined")a.kit.extra.textareaUtils.setCursor(h.textEl, b, c); else {
                var d = h.textEl.value.length;
                a.kit.extra.textareaUtils.setCursor(h.textEl, d)
            }
            m.cacheCurPos()
        }, blur: function () {
            h.textEl.blur()
        }, addExtraInfo: function (a) {
            typeof a == "string" && h.textEl.setAttribute("extra", a)
        }, disableEditor: function (a) {
            c(h.textEl, "mouseup", m.cacheCurPos);
            if (a === !0)h.textEl.setAttribute("disabled", "disabled"); else {
                b(h.textEl, "mouseup", m.cacheCurPos);
                h.textEl.removeAttribute("disabled")
            }
        }, getCurPos: function () {
            var a = h.textEl.getAttribute("range") || "0&0";
            return a.split("&")
        }, count: function () {
            var b = a.core.str.trim(h.textEl.value).length == 0 ? a.core.str.trim(h.textEl.value) : h.textEl.value;
            return a.kit.extra.count(b)
        }, addShortUrlLog: function (b) {
            b = b && a.trim(b);
            if (b) {
                var c = new RegExp("^" + b + "$|" + "_" + b + "$|^" + b + "_|" + "_" + b + "_");
                c.test(i) || (i ? i = i + "_" + b : i = b)
            }
        }, getShortUrlLog: function () {
            return i
        }, setCurrentLogType: function (a) {
            j = a
        }, getCurrentLogType: function () {
            return j
        }, setImageLogType: function (a) {
            k = a
        }, getImageLogType: function () {
            return k
        }}, m = {textElFocus: function () {
            h.recommendTopic && a.core.dom.setStyle(h.recommendTopic, "display", "none");
            d.fire(g, "focus");
            h.num && a.core.dom.setStyle(h.num, "display", "block");
            l.getWords() == f.tipText && l.delWords(f.tipText)
        }, textElBlur: function () {
            setTimeout(function () {
                if (h.textEl.value.length === 0) {
                    h.recommendTopic && a.core.dom.setStyle(h.recommendTopic, "display", "block");
                    h.num && h.recommendTopic && a.core.dom.setStyle(h.num, "display", "none");
                    d.fire(g, "blur");
                    typeof f.tipText != "undefined" && (h.textEl.value = f.tipText)
                }
            }, 50)
        }, cacheCurPos: function () {
            var b = a.kit.extra.textareaUtils.getSelectedText(h.textEl), c = b == "" || b == null ? 0 : b.length, d = a.core.dom.textSelectArea(h.textEl).start, e = d + "&" + c;
            h.textEl.setAttribute("range", e)
        }}, n = {textChanged: function () {
            d.fire(g, "keyUpCount")
        }, textInput: function (b, c) {
            var e = l.getCurPos(), c = e[0], i = e[1];
            l.getWords() == f.tipText && b != f.tipText && l.delWords(f.tipText);
            a.kit.extra.textareaUtils.unCoverInsertText(h.textEl, b, {rcs: e[0], rccl: e[1]});
            m.cacheCurPos();
            d.fire(g, "changed")
        }}, o = {}, p = function () {
            s();
            t()
        }, q = function () {
            u();
            w();
            x();
            r()
        }, r = function () {
            f.storeWords ? h.textEl.value.length == 0 && n.textInput(f.storeWords) : f.tipText && (h.textEl.value = f.tipText)
        }, s = function () {
            if (!e)throw"node is not defined in module editor"
        }, t = function () {
            var b = a.core.dom.builder(e).list;
            h = a.kit.dom.parseDOM(b);
            if (!h.widget)throw"can not find nodes.widget in module editor"
        }, u = function () {
            var a = h.textEl;
            b(a, "focus", m.textElFocus);
            b(a, "blur", m.textElBlur);
            b(a, "mouseup", m.cacheCurPos);
            b(a, "keyup", m.cacheCurPos)
        }, v = function () {
            d.define(g, ["changed", "focus", "blur"])
        }, w = function () {
            v();
            d.add(g, "changed", n.textChanged)
        }, x = function () {
        }, y = function () {
            d.remove(g);
            d.undefine(g);
            var a = h.textEl;
            c(a, "focus", m.textElFocus);
            c(a, "blur", m.textElBlur);
            c(a, "mouseup", m.cacheCurPos);
            c(a, "keyup", m.cacheCurPos)
        };
        p();
        var z = {reset: l.reset, getWords: l.getWords, getExtra: l.getExtra, delWords: l.delWords, focus: l.focus, blur: l.blur, insertText: n.textInput, check: n.textChanged, addExtraInfo: l.addExtraInfo, disableEditor: l.disableEditor, getCurPos: l.getCurPos, count: l.count, textElFocus: m.textElFocus, cacheCurPos: m.cacheCurPos, addShortUrlLog: l.addShortUrlLog, getShortUrlLog: l.getShortUrlLog, setCurrentLogType: l.setCurrentLogType, getCurrentLogType: l.getCurrentLogType, setImageLogType: l.setImageLogType, getImageLogType: l.getImageLogType};
        g.destroy = y;
        g.API = z;
        g.nodeList = h;
        g.init = q;
        g.opts = f;
        return g
    }
});
STK.register("common.editor.plugin.count", function (a) {
    function e(a, b) {
        if (!a.textEl)throw"[editor plugin count]: plz check nodeList"
    }

    function d(a) {
        var d = c(a), e = Math.abs(b - d), f;
        d > b || d < 1 ? f = {wordsnum: d, vnum: e, overflow: !0} : d == 0 ? f = {wordsnum: d, vnum: e, overflow: !0} : f = {wordsnum: d, vnum: e, overflow: !1};
        return f
    }

    function c(b) {
        var c = 41, d = 140, e = 20, f = b, g = b.match(/(http|https):\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/\,\:;@&=\?~#%]*)*/gi) || [], h = 0;
        for (var i = 0, j = g.length; i < j; i++) {
            var k = a.core.str.bLength(g[i]);
            if (/^(http:\/\/t.cn)/.test(g[i]))continue;
            /^(http:\/\/)+(t.sina.com.cn|t.sina.cn)/.test(g[i]) || /^(http:\/\/)+(weibo.com|weibo.cn)/.test(g[i]) ? h += k <= c ? k : k <= d ? e : k - d + e : h += k <= d ? e : k - d + e;
            f = f.replace(g[i], "")
        }
        var l = Math.ceil((h + a.core.str.bLength(f)) / 2);
        return l
    }

    var b;
    return function (c) {
        var f = c.nodeList, g, h = c.opts, i = a.kit.extra.language;
        b = h.limitNum;
        e(f);
        a.core.evt.custEvent.define(c, "textNum");
        a.custEvent.define(c, "keyUpCount");
        var j = f.textEl, k = f.num;
        a.addEvent(j, "focus", function () {
            g = setInterval(function () {
                l()
            }, 200)
        });
        a.addEvent(j, "blur", function () {
            clearInterval(g)
        });
        var l = function () {
            var b = a.core.str.trim(j.value).length == 0 ? a.core.str.trim(j.value) : j.value, e = c && c.opts && c.opts.extendText;
            b = b.replace(/\r\n/g, "\n");
            var f = d(b, h.limitNum);
            b.length >= 0 && j.focus ? f.overflow && f.wordsnum != 0 ? k.innerHTML = (e ? i(e) : "") + i("#L{已经超过%s字}", '<span class="S_error">' + f.vnum + "</span>") : k.innerHTML = (e ? i(e) : "") + i("#L{还可以输入%s字}", "<span>" + f.vnum + "</span>") : b.length === 0 && (k.innerHTML = (e ? i(e) : "") + i("#L{还可以输入%s字}", "<span>" + f.vnum + "</span>"));
            a.core.evt.custEvent.fire(c, "textNum", {count: f.wordsnum, isOver: f.overflow})
        };
        STK.core.evt.addEvent(j, "keyup", l);
        a.custEvent.add(c, "keyUpCount", l)
    }
});
STK.register("kit.dom.cssText", function (a) {
    var b = function (a, b) {
        var c = (a + ";" + b).replace(/(\s*(;)\s*)|(\s*(:)\s*)/g, "$2$4"), d;
        while (c && (d = c.match(/(^|;)([\w\-]+:)([^;]*);(.*;)?\2/i)))c = c.replace(d[1] + d[2] + d[3], "");
        return c
    };
    return function (a) {
        a = a || "";
        var c = [], d = {push: function (a, b) {
            c.push(a + ":" + b);
            return d
        }, remove: function (a) {
            for (var b = 0; b < c.length; b++)c[b].indexOf(a + ":") == 0 && c.splice(b, 1);
            return d
        }, getStyleList: function () {
            return c.slice()
        }, getCss: function () {
            return b(a, c.join(";"))
        }};
        return d
    }
});
STK.register("kit.dom.isTurnoff", function (a) {
    return function (a) {
        return!a.parentNode || a.parentNode.nodeType == 11 || !!a.disabled
    }
});
STK.register("ui.mod.at", function (a) {
    var b = window, c = document, d = a.core.util.browser, e = "font-family:Tahoma,宋体;", f = a.kit.extra.textareaUtils.selectionStart, g, h, i, j, k, l = function () {
        var a = {"<": "&lt;", ">": "&gt;", '"': "&quot;", "\\": "&#92;", "&": "&amp;", "'": "&#039;", "\r": "", "\n": "<br>", " ": (navigator.userAgent.match(/.+(?:ie) ([\d.]+)/i) || [8])[1] < 8 ? ['<pre style="overflow:hidden;display:inline;', e, 'word-wrap:break-word;"> </pre>'].join("") : ['<span style="white-space:pre-wrap;', e, '"> </span>'].join("")};
        return function (b) {
            var c = b.replace(/(<|>|\"|\\|&|\'|\n|\r| )/g, function (b) {
                return a[b]
            });
            return c
        }
    }(), m = function () {
        var b = [], c = g.textEl.style.cssText, d;
        a.foreach(["margin", "padding", "border"], function (c) {
            a.foreach(["Top", "Left", "Bottom", "Right"], function (d) {
                var e;
                c != "border" ? e = b.push(c, "-", d.toLowerCase(), ":", a.getStyle(g.textEl, c + d), ";") : a.foreach(["Style", "Width"], function (e) {
                    b.push(c, "-", d.toLowerCase(), "-", e.toLowerCase(), ":", a.getStyle(g.textEl, [c, d, e].join("")), ";")
                })
            })
        });
        b.push("font-size:" + a.getStyle(g.textEl, "fontSize") + ";");
        return a.kit.dom.cssText([c, b.join(""), e, "\n\t\t\tword-wrap: break-word;\n\t\t\tline-height: 18px;\n\t\t\toverflow-y:auto;\n\t\t\toverflow-x:hidden;\n\t\t\toutline:none;\n\t\t"].join("")).getCss()
    }, n = function () {
        var b = a.builder(['<div node-type="wrap" style="display:none;">', '<span node-type="before"></span>', '<span node-type="flag"></span>', '<span node-type="after"></span>', "</div>"].join("")).list, e = b.wrap[0], f = b.flag[0], h = b.after[0], i = b.before[0], j = 0, n, o, p, q = function (a) {
            return d.MOZ ? -2 : d.MOBILE && d.SAFARI && (d.IPAD || d.ITOUCH || d.IPHONE) ? -2 : 0
        };
        return{bind: function () {
            if (o !== g.textEl) {
                k = a.position(g.textEl);
                var b = ["left:", k.l, "px;top:", k.t + 20, "px;"].join("");
                o = g.textEl;
                var d = m();
                o.style.cssText = d;
                p = [b, d, "\n\t\t\t\t\tposition:absolute;\n\t\t\t\t\tfilter:alpha(opacity=0);\n\t\t\t\t\topacity:0;\n\t\t\t\t\tz-index:-1000;\n\t\t\t\t"].join("");
                e.style.cssText = p;
                if (!j) {
                    j = 1;
                    c.body.appendChild(e)
                }
            }
        }, content: function (b, c, d, j) {
            e.style.cssText = [p, "\n\t\t\t\t\twidth:", (parseInt(a.getStyle(o, "width")) || o.offsetWidth) + q(), "px;\n\t\t\t\t\theight:", parseInt(a.getStyle(o, "height")) || o.offsetHeight, "px;\n\t\t\t\t\toverflow-x:hidden;\n\t\t\t\t\toverflow-y:", /webkit/i.test(navigator.userAgent) ? "hidden" : a.getStyle(o, "overflowY"), ";\n\t\t\t\t"].join("");
            i.innerHTML = l(b);
            f.innerHTML = l(c) || "&thinsp;";
            h.innerHTML = l([d, j].join(""));
            clearTimeout(n);
            n = setTimeout(function () {
                var b = a.position(f);
                a.custEvent.fire(g.eId, "at", {t: b.t - o.scrollTop - k.t, l: b.l - k.l, fl: b.l, key: d, flag: c, textarea: g.textEl})
            }, 30)
        }, hide: function () {
            e.style.display = "none"
        }, show: function () {
            e.style.display = ""
        }}
    }(), o = function () {
        if (a.kit.dom.isTurnoff(g.textEl))clearInterval(h); else {
            var b = g.textEl.value.replace(/\r/g, ""), c = f(g.textEl);
            if (c < 0 || c == j)return;
            j = c;
            var d = b.slice(0, c), e = d.match(new RegExp(["(", g.flag, ")([a-zA-Z0-9一-龥_-]{0,20})$"].join("")));
            if (!e) {
                a.custEvent.fire(g.eId, "hidden");
                return
            }
            var i = b.slice(c);
            d = d.slice(0, -e[0].length);
            n.content(d, e[1], e[2], i)
        }
    };
    return function (b) {
        if (!!b && !!b.textEl) {
            b = a.parseParam({textEl: null, flag: "@", eId: a.custEvent.define({}, ["at", "hidden"])}, b);
            var c = function () {
                if (!!g) {
                    clearInterval(h);
                    a.removeEvent(g.textEl, "blur", c);
                    n.hide()
                }
            }, d = function () {
                c();
                g = b;
                j = null;
                n.bind();
                n.show();
                h = setInterval(o, 200);
                a.addEvent(b.textEl, "blur", c)
            };
            a.addEvent(b.textEl, "focus", d);
            return b.eId
        }
    }
});
STK.register("common.trans.global", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("language", {url: "/aj/user/lang?_wv=5", method: "post"});
    c("followList", {url: "/aj/mblog/attention?_wv=5"});
    c("topicList", {url: "/aj/mblog/topic?_wv=5"});
    c("myFollowList", {url: "/aj/relation/attention?_wv=5"});
    c("closetipsbar", {url: "/aj/tipsbar/closetipsbar?_wv=5", method: "post"});
    c("weiqunnew", {url: "/ajm/weiqun?action=aj_remindunread"});
    c("quiet_suggest", {url: "/aj/f/lenovo?ct=10&_wv=5", method: "get"});
    return b
});
STK.register("ui.mod.suggest", function (a) {
    var b = null, c = a.custEvent, d = c.define, e = c.fire, f = c.add, g = a.addEvent, h = a.removeEvent, i = a.stopEvent, j = [], k = {}, l = {ENTER: 13, ESC: 27, UP: 38, DOWN: 40, TAB: 9}, m = function (b) {
        var c = -1, j = [], k = b.textNode, m = b.uiNode, n = a.core.evt.delegatedEvent(m), o = d(k, ["open", "close", "indexChange", "onSelect", "onIndexChange", "onClose", "onOpen", "openSetFlag"]);
        o.setFlag = p;
        var p = function (a) {
            b.flag = a
        }, q = function () {
            return a.sizzle(["[action-type=", b.actionType, "]"].join(""), m)
        }, r = function () {
            c = -1;
            h(k, "keydown", s);
            n.destroy()
        }, s = function (d) {
            var f, g;
            if (!!(f = d) && !!(g = f.keyCode)) {
                if (g == l.ENTER) {
                    e(o, "onSelect", [c, k, b.flag]);
                    a.preventDefault()
                }
                if (g == l.UP) {
                    i();
                    var h = q().length;
                    c = c < 1 ? h - 1 : c - 1;
                    e(o, "onIndexChange", [c]);
                    return!1
                }
                if (g == l.DOWN) {
                    i();
                    var h = q().length;
                    c = c == h - 1 ? 0 : c + 1;
                    e(o, "onIndexChange", [c]);
                    return!1
                }
                if (g == l.ESC) {
                    i();
                    r();
                    e(o, "onClose");
                    return!1
                }
                if (g == l.TAB) {
                    r();
                    e(o, "onClose");
                    return!1
                }
            }
        }, t = function (c) {
            e(o, "onSelect", [a.core.arr.indexOf(c.el, q()), k, b.flag])
        }, u = function (b) {
            c = a.core.arr.indexOf(b.el, q());
            e(o, "onIndexChange", [a.core.arr.indexOf(b.el, q())])
        };
        f(o, "open", function (a, c) {
            k = c;
            r();
            g(c, "keydown", s);
            n.add(b.actionType, "mouseover", u);
            n.add(b.actionType, "click", t);
            e(o, "onOpen", [b.flag])
        });
        f(o, "openSetFlag", function (a, b) {
            p(b)
        });
        f(o, "close", function () {
            r();
            e(o, "onClose", [b.flag])
        });
        f(o, "indexChange", function (a, d) {
            c = d;
            e(o, "onIndexChange", [c, b.flag])
        });
        return o
    }, n = function (b) {
        var c = b.textNode, d = a.core.arr.indexOf(c, j);
        if (!k[d]) {
            j[d = j.length] = c;
            k[d] = m(b)
        }
        return k[d]
    };
    return function (c) {
        if (!!c.textNode && !!c.uiNode) {
            c = a.parseParam({textNode: b, uiNode: b, actionType: "item", actionData: "index", flag: ""}, c);
            return n(c)
        }
    }
});
STK.register("common.channel.at", function (a) {
    var b = ["open", "close"];
    return a.common.listener.define("common.channel.at", b)
});
STK.register("common.editor.plugin.at", function (a) {
    var b = a.kit.extra.language, c = '<div style="" class="layer_menu_list"><ul node-type="suggestWrap"></ul></div>', d = {"@": {normalTitle: b("#L{选择昵称或轻敲空格完成输入}"), moreTitle: b("#L{选择最近@的人或直接输入}"), noTilte: b("#L{轻敲空格完成输入}")}, "#": {normalTitle: b("#L{想用什么话题？}")}}, e = {"@": '<#et temp data><li class="suggest_title">${data.title}</li><#list data.data as list><li action-type="item" <#if (list_index == 0)>class="cur" </#if>action-data="value=${list.screen_name}" value="${list.screen_name}"><a href="javascript:;">${list.screen_name}<#if (list.remark)>(${list.remark})</#if></a></li><#if (list.count)><span>${list.count}</span></#if></#list></#et>', "#": '<#et temp data><li class="suggest_title">${data.title}</li><#list data.data as list><li action-type="item" suda-data="key=tblog_associate&value=list_${list_index+1}"<#if (list_index == 0)>class="cur" </#if>action-data="value=${list.topic}" value="${list.topic}"><a href="javascript:;">${list.topic}<#if (list.count)>(${list.count})</#if></a></li></#list></#et>'}, f, g, h, i, j, k, l = !1, m, n, o = {"@": "followList", "#": "topicList"}, p = 0, q = function () {
        setTimeout(function () {
            a.custEvent.fire(f, "close")
        }, 200)
    }, r = function () {
        j.style.display = "none"
    }, s = function () {
        a.custEvent.add(f, "onIndexChange", function (a, b) {
            y(b)
        });
        a.custEvent.add(f, "onSelect", function (b, c, d, e) {
            p = 0;
            var g = n[c].getAttribute("value") + "";
            g = g.replace(/\(.*\)/, "");
            try {
                d.focus()
            } catch (h) {
            }
            var i = a.kit.extra.textareaUtils.selectionStart(d) * 1, j = new RegExp(e + "([a-zA-Z0-9一-龥_-]{0,20})$"), k = d.value.replace(/\r+/g, "").slice(0, i).match(j), l = d.value.slice(i, i + 1);
            k = k && k[1] ? k[1].length : 0;
            var m = a.kit.extra.textareaUtils;
            e == "#" ? typeof l != "undefined" && l != e && (g = g + e + " ") : g = g + " ";
            m.insertText(d, g, i, k);
            var o = m.getCursorPos(d);
            if (e == "#" && l == e) {
                m.setCursor(d, o + 1);
                m.insertText(d, " ", o + 1, 0)
            }
            o = m.getCursorPos(d);
            var q = m.getSelectedText(d), r = q == "" || q == null ? 0 : q.length;
            d.setAttribute("range", o + "&" + r);
            a.custEvent.fire(f, "close")
        });
        a.addEvent(h.textEl, "blur", q);
        a.custEvent.add(f, "onClose", r);
        a.custEvent.add(f, "onOpen", function (b, c) {
            i.style.display = "";
            j.style.display = "";
            l = !0;
            setTimeout(function () {
                a.custEvent.fire(f, "indexChange", 0)
            }, 100)
        })
    }, t = function (b) {
        a.custEvent.remove(b);
        a.removeEvent(h.textEl, "blur", q)
    }, u = function (b, c, f) {
        b == "@" ? c.data && c.data.length > 0 ? c.title = f == "" ? d[b].moreTitle : d[b].normalTitle : c.title = d[b].noTilte : c.title = d[b].normalTitle;
        var g = a.core.util.easyTemplate(e[b], c);
        return g
    }, v = function () {
        a.core.evt.custEvent.add(g, "hidden", function (b, c) {
            a.custEvent.fire(f, "close")
        });
        a.core.evt.custEvent.add(g, "at", function (b, c) {
            k = c.key;
            var d = c.flag;
            if (k.length == 0 && d != "@" && d != "#" || c.textarea && !c.textarea.value)a.custEvent.fire(f, "close"); else var e = a.common.trans.global.getTrans(o[d], {onSuccess: function (b, e) {
                var g = u(d, b, k);
                a.custEvent.fire(f, "openSetFlag", d);
                a.custEvent.fire(f, "open", c.textarea);
                var h = a.core.dom.builder(g), l = h.box;
                i.innerHTML = l;
                j.style.cssText = ["z-index:11001;background-color:#ffffff;position:absolute;"].join("");
                a.common.channel.at.fire("open");
                var m = c.l;
                document.body.clientWidth < c.fl + a.core.dom.getSize(j).width && c.fl > a.core.dom.getSize(j).width && (m = c.l - a.core.dom.getSize(j).width);
                a.kit.dom.layoutPos(j, c.textarea, {pos: "left-top", offsetX: m, offsetY: c.t})
            }, onError: function () {
                a.custEvent.fire(f, "close")
            }}).request({q: k})
        })
    }, w = function () {
        m = h.textEl;
        g = a.ui.mod.at({textEl: m, flag: "@|#"})
    }, x = function (b) {
        p = 0;
        j && (j.style.display = "none");
        j && (j.innerHTML = "");
        a.removeNode(j);
        j = STK.C("div");
        document.body.appendChild(j);
        if (j.innerHTML.length == 0) {
            j.innerHTML = c;
            i = a.core.dom.sizzle('[node-type="suggestWrap"]', j)[0];
            j.style.display = "none"
        }
        if (f) {
            a.custEvent.fire(f, "close");
            t(f)
        }
        f = a.ui.mod.suggest({textNode: b, uiNode: i, actionType: "item", actionData: "value", flag: "@"});
        s()
    }, y = function (b) {
        n = a.sizzle("li[class!=suggest_title]", i);
        n && n[0] && a.core.dom.removeClassName(n[p], "cur");
        a.core.dom.addClassName(n[b], "cur");
        p = b
    };
    return function (a, b) {
        h = a.nodeList;
        var c = {};
        c.init = function () {
            w();
            x(h.textEl);
            v()
        };
        return c
    }
});
STK.register("common.editor.base", function (a) {
    function c() {
    }

    var b = {limitNum: 140};
    return function (c, d) {
        var e = {}, f, g, h, i;
        f = a.kit.extra.merge(b, d);
        g = a.ui.mod.editor(c, f);
        h = g.nodeList;
        i = [];
        if (typeof d.count == "undefined" || d.count == "enable")var j = a.common.editor.plugin.count(g, f);
        var k = a.common.editor.plugin.at(g, f);
        k.init();
        g.init();
        g.widget = function (a, b, c) {
            i.push(a);
            a.init(g, b, c);
            return g
        };
        g.closeWidget = function () {
            if (i && i.length != 0)for (var a = 0, b = i.length; a < b; a++)i[a].hide()
        };
        return g
    }
});
STK.register("ui.bubble", function (a) {
    var b = '<div class="W_layer" node-type="outer"><div class="bg"><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><div class="content" node-type="layoutContent"><a class="W_close" href="javascript:void(0);" node-type="close" title="#L{关闭}"></a><div node-type="inner"></div></div></td></tr></tbody></table><div class="arrow arrow_t" node-type="arrow"></div></div></div>';
    return function (c, d) {
        var e, f, g, h, i, j, k, l, m = !1, n = function (b) {
            if (m)return!0;
            var c = a.fixEvent(b);
            a.contains(g, c.target) || e.hide()
        }, o = {init: function () {
            o.pars();
            o.build();
            o.bind()
        }, pars: function () {
            d || (d = {});
            d.template = d.template || b
        }, build: function () {
            e = a.ui.mod.layer(c, d);
            k = a.objSup(e, ["setLayoutPos", "destroy"]);
            g = e.getBox();
            f = a.builder(g).list;
            h = f.inner[0];
            f.close[0] && (i = f.close[0]);
            f.arrow[0] && (j = f.arrow[0])
        }, bind: function () {
            i && a.addEvent(i, "click", e.hide);
            a.custEvent.add(e, "show", function () {
                setTimeout(function () {
                    a.addEvent(document.body, "click", n)
                }, 0)
            });
            a.custEvent.add(e, "hide", function () {
                m = !1;
                a.removeEvent(document.body, "click", n)
            })
        }};
        o.init();
        l = e;
        l.setLayoutPos = function (b, c) {
            a.isNode(b) || a.log("ui.bubble.setLayoutPos need element as target");
            j && (j.style.cssText = "");
            k.setLayoutPos(b, c);
            return l
        };
        l.setAlignPos = function (b, c, d) {
            d = a.parseParam({offset: {left: 0, top: 0}, arrowOffset: 0, align: "left", fail: a.funcEmpty}, d);
            if (!!a.isNode(b) && !!a.isNode(c)) {
                var e = b, f;
                while (e !== document.body) {
                    e = e.parentNode;
                    f = a.getStyle(e, "position");
                    if (f === "absolute")break
                }
                e.appendChild(g);
                f = a.position(e);
                f || (f = {l: 0, t: 0});
                var h = a.core.dom.getSize, i = a.position(c), k = a.position(b), m = h(b), n = 6, o = 14, p, q, r, s = d.offset, t = d.arrowOffset, u = h(g), v = h(c), w = 2;
                if (d.align === "left") {
                    if (u.width < k.l - i.l + Math.ceil(m.width / 2)) {
                        d.fail();
                        return
                    }
                } else if (i.l + v.width - k.l - Math.ceil(m.width / 2) > u.width) {
                    d.fail();
                    return
                }
                d.align === "left" ? p = i.l - w : p = i.l + v.width - u.width + w;
                q = k.t + m.height + n;
                r = k.l + Math.ceil((m.width - o) / 2) - p;
                q -= f.t;
                p -= f.l;
                q += s.top;
                p += s.left;
                r += t;
                g.style.left = p + "px";
                g.style.top = q + "px";
                j && (j.style.left = r + "px");
                return l
            }
        };
        l.setContent = function (b) {
            h.innerHTML = "";
            typeof b == "string" ? h.innerHTML = b : a.isNode(b) && h.appendChild(b);
            return l
        };
        l.clearContent = function () {
            h.innerHTML = "";
            return l
        };
        l.setArrow = function (a) {
            if (j) {
                a.className && (j.className = a.className || "arrow arrow_t");
                a.style && (j.style.cssText = a.style || "")
            }
            return l
        };
        l.stopBoxClose = function () {
            m = !0;
            return l
        };
        l.startBoxClose = function () {
            m = !1;
            return l
        };
        l.getClose = function () {
            return i
        };
        l.destroy = function () {
            a.removeEvent(document.body, "click", n);
            k.destroy();
            e = null
        };
        return l
    }
});
STK.register("lib.litter.mask", function (a) {
    function k(b) {
        var c;
        (c = b.getAttribute(f)) || b.setAttribute(f, c = a.getUniqueKey());
        return">" + b.tagName.toLowerCase() + "[" + f + '="' + c + '"]'
    }

    function j() {
        b = a.C("div");
        var c = '<div node-type="outer">';
        a.core.util.browser.IE6 && (c += '<div style="position:absolute;width:100%;height:100%;"></div>');
        c += "</div>";
        b = a.builder(c).list.outer[0];
        document.body.appendChild(b);
        e = !0;
        d = a.kit.dom.fix(b, "lt");
        var f = function () {
            var c = a.core.util.winSize();
            b.style.cssText = a.kit.dom.cssText(b.style.cssText).push("width", c.width + "px").push("height", c.height + "px").getCss()
        };
        i.add(d, "beforeFix", f);
        f()
    }

    var b, c = [], d, e = !1, f = "STK-Mask-Key", g = a.core.dom.setStyle, h = a.core.dom.getStyle, i = a.core.evt.custEvent, l = {getNode: function () {
        return b
    }, show: function (c, f) {
        if (e) {
            c = a.core.obj.parseParam({opacity: .3, background: "#000000"}, c);
            b.style.background = c.background;
            g(b, "opacity", c.opacity);
            b.style.display = "";
            d.setAlign("lt");
            f && f()
        } else {
            j();
            l.show(c, f)
        }
        return l
    }, hide: function () {
        b.style.display = "none";
        c = [];
        return l
    }, showUnderNode: function (d, e) {
        a.isNode(d) && l.show(e, function () {
            g(b, "zIndex", h(d, "zIndex"));
            var e = k(d), f = a.core.arr.indexOf(c, e);
            f != -1 && c.splice(f, 1);
            c.push(e);
            a.core.dom.insertElement(d, b, "beforebegin")
        });
        return l
    }, back: function () {
        if (c.length < 1)return l;
        var d, e;
        c.pop();
        if (c.length < 1)l.hide(); else if ((e = c[c.length - 1]) && (d = a.sizzle(e, document.body)[0])) {
            g(b, "zIndex", h(d, "zIndex"));
            a.core.dom.insertElement(d, b, "beforebegin")
        } else l.back();
        return l
    }, resetSize: function () {
        var c = a.core.util.winSize();
        b.style.cssText = a.core.dom.cssText(b.style.cssText).push("width", c.width + "px").push("height", c.height + 22 + "px").getCss();
        return l
    }, destroy: function () {
        i.remove(d);
        b.style.display = "none"
    }};
    return l
});
STK.register("kit.extra.destroyFlash", function (a) {
    var b = a.core.util.browser, c = function (a) {
        if (a) {
            for (var b in a)typeof a[b] == "function" && (a[b] = null);
            a.parentNode.removeChild(a)
        }
    };
    return function (d) {
        if (!!a.isNode(d) && d && d.nodeName === "OBJECT")if (a.IE && b.OS === "windows") {
            d.style.display = "none";
            (function () {
                d.readyState === 4 ? c(d) : setTimeout(arguments.callee, 10)
            })()
        } else d.parentNode.removeChild(d)
    }
});
STK.register("common.magic", function (a) {
    var b = a.core.util.swf, c = a.lib.litter.mask, d, e, f, g, h, i, j, k = (new Date).getTime() + "", l = (Math.random() + "").replace(".", ""), m = "STK_flash_" + k + l, n = function (b) {
        if (!d) {
            d = a.C("div");
            if (!b)d.style.cssText = "display:none;width:440px;height:360px;z-index:100000;"; else {
                var c = a.core.util.winSize();
                d.style.cssText = "display:none;width:" + c.width + "px;height:" + c.height + "px;z-index:100000;"
            }
            e = a.core.dom.uniqueID(d);
            h = function (b) {
                b = a.fixEvent(b || window.event);
                b.target.getAttribute("name") != e && o.hide()
            };
            document.body.appendChild(d)
        }
    }, o = function (k, l, p) {
        j = typeof l == "function" ? l : a.funcEmpty;
        p = a.parseParam({isV5update: !1}, p);
        n(p.isV5update);
        if (!f) {
            f = !0;
            c.showUnderNode(d);
            a.addEvent(c.getNode(), "click", h);
            c.getNode().title = "点击关闭";
            d.style.display = "";
            if (!p.isV5update) {
                g ? g.setAlign("c") : g = a.kit.dom.fix(d, "c");
                d.innerHTML = b.html(k, {id: e, width: 440, height: 360, paras: {allowScriptAccess: "never", wmode: "transparent"}, attrs: {name: e}, flashvars: {playMovie: "true"}})
            } else {
                g ? g.setAlign("lb") : g = a.kit.dom.fix(d, "lb");
                _closeFun = function () {
                    o.hide()
                };
                d.innerHTML = b.html(k, {id: e, width: "100%", height: "100%", paras: {menu: "false", scale: "noScale", allowFullscreen: "false", allowScriptAccess: "always", bgcolor: "#FFFFFF", wmode: "transparent", base: "http://flashcrossdomain.mps.weibo.com/t5/home/static/upgrade/v5/"}, attrs: {name: e}, flashvars: {closeAPI: m, v: $CONFIG.version, bgMusic: "http://service.weibo.com/staticjs/v5/bg001.mp3"}})
            }
            clearInterval(i);
            i = setInterval(function () {
                var a = document[e] || window[e], b = 0;
                if (a && a.PercentLoaded() == 100) {
                    clearInterval(i);
                    i = setInterval(function () {
                        var c = a.CurrentFrame(), d;
                        try {
                            d = a.TotalFrames()
                        } catch (e) {
                            d = a.TotalFrames
                        }
                        c < 0 || (c < d && b <= c ? b = c : o.hide())
                    }, 80)
                }
            }, 100)
        }
    };
    o.hide = function () {
        clearInterval(i);
        if (d) {
            d.style.display = "none";
            a.kit.extra.destroyFlash(a.sizzle("embed,object", d)[0]);
            d.innerHTML = ""
        }
        a.removeEvent(c.getNode(), "click", h);
        c.getNode().title = "";
        c.back();
        f = !1;
        setTimeout(function () {
            typeof j == "function" && j()
        }, 0);
        return o
    };
    o.destroy = function () {
        o.hide();
        g && g.destroy();
        a.removeNode(d);
        i = d = e = f = g = h
    };
    window[m] = function () {
        o.hide()
    };
    return o
});
STK.register("common.bubble.face", function (a) {
    var b = "", c, d = " pftb_itm_lst ";
    if ($CONFIG && $CONFIG.brand && $CONFIG.brand == 1) {
        d = "";
        b = '<li class="pftb_itm pftb_itm_lst S_line1"><a  href="javascript:void(0);" class="pftb_lk S_line5 S_txt1 S_bg1"  node-type="brand">品牌专区</a></li>';
        c = {init: function () {
            s.inner.innerHTML = m;
            a.common.trans.editor.getTrans("face", {onSuccess: function (a, b) {
                c.cache = a.data.brand.norm || {};
                c.categorys = [q];
                for (var d in c.cache)c.categorys.push(d);
                var e = [];
                for (var f in a.data.brand.norm)e.push(f);
                c.cache[q] = a.data.brand.norm[e[0]];
                c.init = function () {
                    c.page = 0;
                    c.cPoniter = 0;
                    c.currentCategory = q;
                    c.rend();
                    A(c);
                    B(c)
                };
                c.init()
            }, onError: function (a, b) {
            }}).request({})
        }, rend: function () {
            var b = c.currentCategory, d = c.cache[y(b)], e = c.page, f = c.itemNumber;
            d = d.slice(e * f, e * f + f);
            d = a.foreach(d, function (b, c) {
                b.phraseB = b.phrase.slice(1, -1);
                return a.templet(i, b)
            });
            s.inner.innerHTML = d.join("")
        }, page: 0, cache: null, hotList: null, cPoniter: 0, categorys: [], currentCategory: q, itemNumber: 72}
    }
    var e = '<div node-type="outer"><div  class="profile_tab layer_tab S_line5"><ul class="pftb_ul layer_tab S_line1"><li class="pftb_itm S_line1"><a href="javascript:void(0);" class="pftb_lk current S_line5 S_txt1 S_bg5" node-type="general">常用表情</a></li><li class="pftb_itm' + d + ' S_line1"><a  href="javascript:void(0);"  node-type="magic">魔法表情</a></li>' + b + "</ul>" + "</div>" + '<div class="layer_faces">' + '<div class="tab_nosep">' + '<span class="right">' + '<a href="javascript:void(0);" node-type="prev" action-type="prev" class="W_btn_c btn_page_prevdis"><span><em class="W_ico12 ico_page_prev"></em></span></a>' + '<a href="javascript:void(0);" node-type="next" action-type="next" class="W_btn_c btn_page_next"><span><em class="W_ico12 ico_page_next"></em></span></a>' + "</span>" + '<ul class="t_ul clearfix"  node-type="categorys"></ul>' + "</div>" + '<div class="detail">' + '<ul class="faces_list faces_list_hot clearfix" node-type="hotFace"></ul>' + '<ul class="faces_list" node-type="inner"></ul>' + '<div class="W_pages_minibtn" node-type="page"></div>' + "</div>" + "</div>" + "</div></div>", f = '<li class="t_itm"><a href="javascript:void(0);" onclick="return false;" action-type="category" action-data="category=#{itemEncode}" class="t_lk">#{item}</a></li>', g = '<li class="t_itm current"><a href="javascript:void(0);" onclick="return false;" action-type="category" action-data="category=#{itemEncode}" class="t_lk S_txt1 S_bg2">#{item}</a></li>', h = '<li action-type="insert" action-data="text=#{phrase}"><img src="#{icon}" alt="#{phraseB}" title="#{phraseB}"/></li>', i = '<li action-type="insert" action-data="text=#{value}"><img src="#{icon}" alt="#{phraseB}" title="#{phraseB}"/></li>', j = '<li><a action-type="insert" action-data="text=#{value}" class="img" href="javascript:void(0);"><img src="#{icon}" alt="#{phrase}" title="#{phrase}"/></a><a title="表情预览" href="javascript:void(0);" action-type="play" action-data="swf=#{swf}"><span class="W_ico16 icon_toplay"></span></a><span>#{phrase}</span></li>', k = '<a action-type="page" action-data="num=#{number}" href="javascript:void(0);" class="page S_bg1" onclick="return false;">#{label}</a>', l = '<a action-type="page" action-data="num=#{number}" href="javascript:void(0);" class="page S_txt1" onclick="return false;">#{label}</a>', m = '<div class="W_loading"><span>正在加载，请稍候...</span></div>', n = '<li class="clear"></li>', o = "", p = 5, q = "默认", r, s, t, u, v, w;
    w = {};
    var x = window.encodeURIComponent, y = window.decodeURIComponent, z = function (a, b, c) {
        for (var d = 0; b[d]; d++)a[b[d]] && (a[b[d]].style.display = "");
        for (var d = 0; c[d]; d++)a[c[d]] && (a[c[d]].style.display = "none")
    }, A = function (b) {
        var c = b.cPoniter, d = b.categorys, e = y(b.currentCategory), h = d.slice(c, c + p);
        h = a.foreach(h, function (b, c) {
            return e === b ? a.templet(g, {item: b, itemEncode: x(b)}) : a.templet(f, {item: b, itemEncode: x(b)})
        });
        s.categorys.innerHTML = h.join(o);
        c + p >= d.length ? s.next.className = "W_btn_c_disable btn_page_nextdis" : s.next.className = "W_btn_c btn_page_next";
        c <= 0 ? s.prev.className = "W_btn_c_disable btn_page_prevdis" : s.prev.className = "W_btn_c btn_page_prev"
    }, B = function (b) {
        var c = b.page, d = b.cache[y(b.currentCategory)], e = d.length / b.itemNumber, f = [];
        if (e > 1)for (var g = 0; g < e; g += 1)c == g ? f.push(a.templet(l, {number: g, label: g + 1})) : f.push(a.templet(k, {number: g, label: g + 1}));
        s.page.innerHTML = f.join("");
        c === 0 && b === H && y(b.currentCategory) === q ? s.hotFace.style.display = "" : s.hotFace.style.display = "none"
    }, C = {general: function (a) {
        z(s, ["categorys", "hotFace", "prev", "next"], []);
        v = H;
        v.init();
        s.general.className = "pftb_lk current S_line5 S_txt1 S_bg5";
        s.magic.className = "pftb_lk S_line5 S_txt1 S_bg1";
        s.brand && (s.brand.className = "pftb_lk S_line5 S_txt1 S_bg1");
        s.inner.className = "faces_list clearfix"
    }, magic: function (a) {
        z(s, ["categorys", "hotFace", "prev", "next"], []);
        v = I;
        v.init();
        s.general.className = "pftb_lk S_line5 S_txt1 S_bg1";
        s.magic.className = "pftb_lk current S_line5 S_txt1 S_bg5";
        s.brand && (s.brand.className = "pftb_lk S_line5 S_txt1 S_bg1");
        s.inner.className = "faces_magic_list"
    }, brand: function (a) {
        z(s, [], ["categorys", "hotFace", "prev", "next"]);
        v = c;
        v.init();
        s.general.className = "pftb_lk S_line5 S_txt1 S_bg1";
        s.magic.className = "pftb_lk S_line5 S_txt1 S_bg1";
        s.brand && (s.brand.className = "pftb_lk current S_line5 S_txt1 S_bg5");
        s.inner.className = "faces_list clearfix"
    }}, D = {category: function (a) {
        v.page = 0;
        v.currentCategory = a.data.category;
        v.rend();
        setTimeout(function () {
            A(v);
            B(v)
        }, 0)
    }, prev: function (a) {
        var b = v.cPoniter, c = v.categorys;
        if (b <= 0)return!1;
        v.cPoniter -= p;
        A(v)
    }, next: function (a) {
        var b = v.cPoniter, c = v.categorys;
        if (b >= c.length - p)return!1;
        v.cPoniter += p;
        A(v)
    }, play: function (b) {
        t.stopBoxClose();
        a.common.magic(b.data.swf, function () {
            t.startBoxClose()
        })
    }, insert: function (b) {
        a.custEvent.fire(w, "insert", {value: b.data.text})
    }, page: function (a) {
        v.page = parseInt(a.data.num, 10);
        v.rend();
        setTimeout(function () {
            B(v)
        }, 0)
    }}, E = function (b) {
        t = a.ui.bubble();
        t.hide();
        F();
        G();
        C[b]();
        a.custEvent.add(t, "hide", function (b) {
            return function () {
                a.custEvent.remove(b, "hide", arguments.callee);
                a.custEvent.fire(w, "hide", {})
            }
        }(t))
    }, F = function () {
        r = a.ui.layer({template: e});
        s = r.getDomList();
        s.outer = r.getBox();
        F = function () {
            t.setContent(s.outer)
        };
        F()
    }, G = function () {
        a.custEvent.define(w, "insert");
        a.custEvent.define(w, "hide");
        a.addEvent(s.general, "click", C.general);
        a.addEvent(s.magic, "click", C.magic);
        s.brand && a.addEvent(s.brand, "click", C.brand);
        u = a.core.evt.delegatedEvent(s.outer);
        u.add("category", "click", D.category);
        u.add("prev", "click", D.prev);
        u.add("next", "click", D.next);
        u.add("insert", "click", D.insert);
        u.add("play", "click", D.play);
        u.add("page", "click", D.page);
        G = function () {
        }
    }, H = {init: function () {
        s.inner.innerHTML = m;
        a.common.trans.editor.getTrans("face", {onSuccess: function (b, c) {
            H.cache = b.data.more || {};
            try {
                H.hotList = b.data.usual.hot.slice(0, 12);
                s.hotFace.innerHTML = a.foreach(H.hotList,function (b, c) {
                    b.phraseB = b.phrase.slice(1, -1);
                    return a.templet(h, b)
                }).join("")
            } catch (d) {
            }
            H.categorys = [q];
            for (var e in H.cache)H.categorys.push(e);
            H.cache[q] = b.data.usual.norm;
            H.init = function () {
                H.page = 0;
                H.cPoniter = 0;
                H.currentCategory = q;
                H.rend();
                A(H);
                B(H)
            };
            H.init()
        }, onError: function (a, b) {
        }}).request({})
    }, rend: function () {
        var b = H.currentCategory, c = H.cache[y(b)], d = H.page, e = H.itemNumber;
        c = c.slice(d * e, d * e + e);
        c = a.foreach(c, function (b, c) {
            b.phraseB = b.phrase.slice(1, -1);
            return a.templet(h, b)
        });
        s.inner.innerHTML = c.join("")
    }, page: 0, cache: null, hotList: null, cPoniter: 0, categorys: [], currentCategory: q, itemNumber: 72}, I = {init: function () {
        s.inner.innerHTML = m;
        s.hotFace.style.display = "none";
        a.common.trans.editor.getTrans("magicFace", {onSuccess: function (a, b) {
            I.cache = a.data.more || {};
            I.categorys = [q];
            for (var c in I.cache)I.categorys.push(c);
            I.cache[q] = a.data.usual.norm;
            I.init = function () {
                I.page = 0;
                I.cPoniter = 0;
                I.currentCategory = q;
                I.rend();
                A(I);
                B(I)
            };
            I.init()
        }, onError: function (a, b) {
        }}).request({type: "ani"})
    }, rend: function (b, c) {
        var d = I.currentCategory, e = I.cache[y(d)], f = I.page, g = I.itemNumber;
        e = e.slice(f * g, f * g + g);
        e = a.foreach(e, function (b, c) {
            b.swf = b.icon.slice(0, -4) + ".swf";
            return a.templet(j, b)
        });
        e.push(n);
        s.inner.innerHTML = e.join("")
    }, page: 0, cache: null, cPoniter: 0, categorys: [], currentCategory: q, itemNumber: 12};
    w.getBub = function () {
        return t
    };
    return function (b, c) {
        if (!a.isNode(b))throw"common.bubble.face need el as first parameter!";
        E("general");
        if (c.useAlign) {
            c.fail = function () {
                t.setLayout(b, {offsetX: -29, offsetY: 5})
            };
            t.setAlignPos(b, c.refer, c)
        } else t.setLayoutPos(b, {offsetX: -29, offsetY: 5});
        t.show();
        return w
    }
});
STK.register("common.editor.widget.face", function (a) {
    return function (b) {
        var c = {}, d, e, f, g;
        g = a.parseParam({t: 0, l: -15, useAlign: !1}, b);
        var h = function (a, b) {
            d.API.insertText(b.value);
            e.getBub().hide()
        }, i = function () {
            a.core.evt.preventDefault();
            g.refer = d.nodeList.textEl;
            e = a.common.bubble.face(d.nodeList[f], g);
            a.custEvent.add(e, "insert", h);
            a.custEvent.fire(c, "show", e);
            a.custEvent.add(e, "hide", function () {
                a.custEvent.remove(e, "hide", arguments.callee);
                a.custEvent.remove(e, "insert", h);
                a.custEvent.fire(c, "hide", e)
            })
        };
        c.init = function (b, e, g) {
            d = b;
            f = e;
            a.addEvent(b.nodeList[f], "click", i);
            a.custEvent.define(c, "show");
            a.custEvent.define(c, "hide")
        };
        c.clear = function () {
        };
        c.show = function () {
        };
        c.hide = function () {
        };
        c.destroy = function () {
            d = null;
            a.custEvent.undefine(c)
        };
        return c
    }
});
STK.register("ui.alert", function (a) {
    var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl><div class="btn"><a href="javascript:void(0)" class="W_btn_d" node-type="OK"></a></div></div>', c = {success: "icon_succM", error: "icon_errorM", warn: "icon_warnM", "delete": "icon_delM", question: "icon_questionM"};
    return function (d, e) {
        var f, g, h, i, j, k = a.kit.extra.language, l = {ok: function (b) {
            a.preventDefault(b);
            g.hide()
        }}, m = {init: function () {
            m.pars();
            m.build();
            m.bind()
        }, pars: function () {
            f = a.parseParam({title: k("#L{提示}"), icon: "warn", textLarge: d, textSmall: "", OK: a.funcEmpty, OKText: k("#L{确定}"), timer: 0, id: ""}, e || {});
            f.icon = c[f.icon]
        }, build: function () {
            g = a.ui.dialog(f.id);
            g.setContent(k(b));
            g.setTitle(f.title);
            h = g.getDomList(!0);
            i = h.OK;
            h.icon.className = f.icon;
            h.textLarge.innerHTML = f.textLarge;
            h.textSmall.innerHTML = f.textSmall;
            i.innerHTML = "<span>" + f.OKText + "</span>";
            g.show().setMiddle();
            i.focus()
        }, bind: function () {
            f.timer && (j = setTimeout(g.hide, f.timer));
            a.addEvent(i, "click", l.ok);
            a.custEvent.add(g, "hide", function () {
                a.custEvent.remove(g, "hide", arguments.callee);
                a.removeEvent(i, "click", l.ok);
                clearTimeout(j);
                f.OK();
                g.destroy()
            })
        }};
        m.init();
        return g
    }
});
STK.register("kit.extra.crc32", function (a) {
    return function (a, b) {
        function c(a) {
            a = a.replace(/\r\n/g, "\n");
            var b = "";
            for (var c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                if (d < 128)b += String.fromCharCode(d); else if (d > 127 && d < 2048) {
                    b += String.fromCharCode(d >> 6 | 192);
                    b += String.fromCharCode(d & 63 | 128)
                } else {
                    b += String.fromCharCode(d >> 12 | 224);
                    b += String.fromCharCode(d >> 6 & 63 | 128);
                    b += String.fromCharCode(d & 63 | 128)
                }
            }
            return b
        }

        a = c(a);
        var d = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D", b;
        typeof b == "undefined" && (b = 0);
        var e = 0, f = 0;
        b = b ^ -1;
        for (var g = 0, h = a.length; g < h; g++) {
            f = (b ^ a.charCodeAt(g)) & 255;
            e = "0x" + d.substr(f * 9, 8);
            b = b >>> 8 ^ e
        }
        var i = b ^ -1;
        i < 0 && (i = 4294967296 + i);
        return i
    }
});
STK.register("common.extra.imageURL", function (a) {
    return function (b, c) {
        function f(a) {
            a = (a + "").replace(/[^a-f0-9]/gi, "");
            return parseInt(a, 16)
        }

        var d = {size: "small"};
        if (typeof b == "string") {
            d = a.core.obj.parseParam(d, c);
            var e = d.size, g = {ss: {middle: "&690", bmiddle: "&690", small: "&690", thumbnail: "&690", square: "&690", orignal: "&690", thumb180: "&690"}, ww: {middle: "bmiddle", large: "large", bmiddle: "bmiddle", small: "small", thumbnail: "thumbnail", square: "square", orignal: "large", thumb180: "thumb180", mw690: "mw690", mw1024: "mw1024"}}, h = b.charAt(9) == "w", i = b.charAt(21) == "g" ? ".gif" : ".jpg", j = h ? a.kit.extra.crc32(b) % 4 + 1 : f(b.substr(19, 2)) % 16 + 1, k = "http://" + (h ? "ww" : "ss") + j + ".sinaimg.cn/" + (h ? g.ww[e] : e) + "/" + b + (h ? i : "") + (h ? "" : g.ss[e]);
            return k
        }
    }
});
STK.register("lib.litter.tab", function (a) {
    return function (b, c) {
        function u(b, c) {
            var e = {evtType: "click", tNodes: "", dNodes: "", className: "cur", addClassNames: "", removeClassNames: "", cb: function () {
            }, defaultIdx: 0};
            e = a.core.obj.parseParam(e, c);
            l = e.cb;
            n = e.className;
            p = e.defaultIdx;
            q = e.removeClassNames;
            r = e.addClassNames;
            m = e.evtType;
            j = typeof e.tNodes == "string" ? a.sizzle(e.tNodes, b) : e.tNodes;
            o = j.length;
            if (e.dNodes !== "") {
                k = typeof e.dNodes == "string" ? a.sizzle(e.dNodes, b) : e.dNodes;
                t()
            }
            for (var f = 0; f < o; f++)d(j[f], m, function (a) {
                return function () {
                    h();
                    s(a)
                }
            }(f))
        }

        function t() {
            if (!g(j))throw"ui.mod.tab needs tNodes as Array!";
            if (!g(k))throw"ui.mod.tab needs tNodes as Array!";
            if (j.length != k.length)throw"ui.mod.tab needs tNodes'length equal to dNodes'length!"
        }

        function s(a) {
            var b = g(l) ? l[a] : l, c = j[a], d = g(k) ? k[a] : null, h = j[p], m = g(k) ? k[p] : null;
            if (d) {
                i(k[p], "display", "none");
                i(k[a], "display", "")
            }
            if (!q && !r) {
                f(j[p], n);
                e(j[a], n)
            } else {
                j[p].className = q;
                j[a].className = r
            }
            if (a != p) {
                b({idx: a, node: d});
                p = a
            }
        }

        var d = a.core.evt.addEvent, e = a.core.dom.addClassName, f = a.core.dom.removeClassName, g = a.core.arr.isArray, h = a.core.evt.preventDefault, i = a.core.dom.setStyle, j, k, l, m, n, o, p, q, r, v = {};
        v.initView = function (a) {
            a = a || c.defaultIdx;
            i(k[a], "display", "");
            e(j[a], n);
            var b = g(l) ? l[a] : l, d = g(k) ? k[a] : null;
            b({idx: a, node: d});
            p = a
        };
        v.refresh = function (b) {
            j[b] && a.fireEvent(j[b], "click")
        };
        u(b, c);
        return v
    }
});
STK.register("kit.extra.swfobject", function (a) {
    var b = function () {
        function W(b) {
            var c = /[\\\"<>\.;]/, d = c.exec(b) != null;
            return d && typeof encodeURIComponent != a ? encodeURIComponent(b) : b
        }

        function V(a, b) {
            if (!!y) {
                var c = b ? "visible" : "hidden";
                u && Q(a) ? Q(a).style.visibility = c : U("#" + a, "visibility:" + c)
            }
        }

        function U(b, d, e, f) {
            if (!z.ie || !z.mac) {
                var g = j.getElementsByTagName("head")[0];
                if (!g)return;
                var h = e && typeof e == "string" ? e : "screen";
                if (f) {
                    w = null;
                    x = null
                }
                if (!w || x != h) {
                    var i = R("style");
                    i.setAttribute("type", "text/css");
                    i.setAttribute("media", h);
                    w = g.appendChild(i);
                    z.ie && z.win && typeof j.styleSheets != a && j.styleSheets.length > 0 && (w = j.styleSheets[j.styleSheets.length - 1]);
                    x = h
                }
                z.ie && z.win ? w && typeof w.addRule == c && w.addRule(b, d) : w && typeof j.createTextNode != a && w.appendChild(j.createTextNode(b + " {" + d + "}"))
            }
        }

        function T(a) {
            var b = z.pv, c = a.split(".");
            c[0] = parseInt(c[0], 10);
            c[1] = parseInt(c[1], 10) || 0;
            c[2] = parseInt(c[2], 10) || 0;
            return b[0] > c[0] || b[0] == c[0] && b[1] > c[1] || b[0] == c[0] && b[1] == c[1] && b[2] >= c[2] ? !0 : !1
        }

        function S(a, b, c) {
            a.attachEvent(b, c);
            p[p.length] = [a, b, c]
        }

        function R(a) {
            return j.createElement(a)
        }

        function Q(a) {
            var b = null;
            try {
                b = j.getElementById(a)
            } catch (c) {
            }
            return b
        }

        function P(a) {
            var b = Q(a);
            if (b) {
                for (var c in b)typeof b[c] == "function" && (b[c] = null);
                b.parentNode.removeChild(b)
            }
        }

        function O(a) {
            var b = Q(a);
            if (b && b.nodeName == "OBJECT")if (z.ie && z.win) {
                b.style.display = "none";
                (function () {
                    b.readyState == 4 ? P(a) : setTimeout(arguments.callee, 10)
                })()
            } else b.parentNode.removeChild(b)
        }

        function N(a, b, c) {
            var d = R("param");
            d.setAttribute("name", b);
            d.setAttribute("value", c);
            a.appendChild(d)
        }

        function M(b, d, e) {
            var g, h = Q(e);
            if (z.wk && z.wk < 312)return g;
            if (h) {
                typeof b.id == a && (b.id = e);
                if (z.ie && z.win) {
                    var i = "";
                    for (var j in b)b[j] != Object.prototype[j] && (j.toLowerCase() == "data" ? d.movie = b[j] : j.toLowerCase() == "styleclass" ? i += ' class="' + b[j] + '"' : j.toLowerCase() != "classid" && (i += " " + j + '="' + b[j] + '"'));
                    var k = "";
                    for (var l in d)d[l] != Object.prototype[l] && (k += '<param name="' + l + '" value="' + d[l] + '" />');
                    h.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + i + ">" + k + "</object>";
                    o[o.length] = b.id;
                    g = Q(b.id)
                } else {
                    var m = R(c);
                    m.setAttribute("type", f);
                    for (var n in b)b[n] != Object.prototype[n] && (n.toLowerCase() == "styleclass" ? m.setAttribute("class", b[n]) : n.toLowerCase() != "classid" && m.setAttribute(n, b[n]));
                    for (var p in d)d[p] != Object.prototype[p] && p.toLowerCase() != "movie" && N(m, p, d[p]);
                    h.parentNode.replaceChild(m, h);
                    g = m
                }
            }
            return g
        }

        function L(a) {
            var b = R("div");
            if (z.win && z.ie)b.innerHTML = a.innerHTML; else {
                var d = a.getElementsByTagName(c)[0];
                if (d) {
                    var e = d.childNodes;
                    if (e) {
                        var f = e.length;
                        for (var g = 0; g < f; g++)(e[g].nodeType != 1 || e[g].nodeName != "PARAM") && e[g].nodeType != 8 && b.appendChild(e[g].cloneNode(!0))
                    }
                }
            }
            return b
        }

        function K(a) {
            if (z.ie && z.win && a.readyState != 4) {
                var b = R("div");
                a.parentNode.insertBefore(b, a);
                b.parentNode.replaceChild(L(a), b);
                a.style.display = "none";
                (function () {
                    a.readyState == 4 ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
                })()
            } else a.parentNode.replaceChild(L(a), a)
        }

        function J(b, c, d, e) {
            v = !0;
            s = e || null;
            t = {success: !1, id: d};
            var f = Q(d);
            if (f) {
                if (f.nodeName == "OBJECT") {
                    q = L(f);
                    r = null
                } else {
                    q = f;
                    r = d
                }
                b.id = g;
                if (typeof b.width == a || !/%$/.test(b.width) && parseInt(b.width, 10) < 310)b.width = "310";
                if (typeof b.height == a || !/%$/.test(b.height) && parseInt(b.height, 10) < 137)b.height = "137";
                j.title = j.title.slice(0, 47) + " - Flash Player Installation";
                var h = z.ie && z.win ? "ActiveX" : "PlugIn", k = "MMredirectURL=" + i.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + h + "&MMdoctitle=" + j.title;
                typeof c.flashvars != a ? c.flashvars += "&" + k : c.flashvars = k;
                if (z.ie && z.win && f.readyState != 4) {
                    var l = R("div");
                    d += "SWFObjectNew";
                    l.setAttribute("id", d);
                    f.parentNode.insertBefore(l, f);
                    f.style.display = "none";
                    (function () {
                        f.readyState == 4 ? f.parentNode.removeChild(f) : setTimeout(arguments.callee, 10)
                    })()
                }
                M(b, c, d)
            }
        }

        function I() {
            return!v && T("6.0.65") && (z.win || z.mac) && !(z.wk && z.wk < 312)
        }

        function H(b) {
            var d = null, e = Q(b);
            if (e && e.nodeName == "OBJECT")if (typeof e.SetVariable != a)d = e; else {
                var f = e.getElementsByTagName(c)[0];
                f && (d = f)
            }
            return d
        }

        function G() {
            var b = n.length;
            if (b > 0)for (var c = 0; c < b; c++) {
                var d = n[c].id, e = n[c].callbackFn, f = {success: !1, id: d};
                if (z.pv[0] > 0) {
                    var g = Q(d);
                    if (g)if (T(n[c].swfVersion) && !(z.wk && z.wk < 312)) {
                        V(d, !0);
                        if (e) {
                            f.success = !0;
                            f.ref = H(d);
                            e(f)
                        }
                    } else if (n[c].expressInstall && I()) {
                        var h = {};
                        h.data = n[c].expressInstall;
                        h.width = g.getAttribute("width") || "0";
                        h.height = g.getAttribute("height") || "0";
                        g.getAttribute("class") && (h.styleclass = g.getAttribute("class"));
                        g.getAttribute("align") && (h.align = g.getAttribute("align"));
                        var i = {}, j = g.getElementsByTagName("param"), k = j.length;
                        for (var l = 0; l < k; l++)j[l].getAttribute("name").toLowerCase() != "movie" && (i[j[l].getAttribute("name")] = j[l].getAttribute("value"));
                        J(h, i, d, e)
                    } else {
                        K(g);
                        e && e(f)
                    }
                } else {
                    V(d, !0);
                    if (e) {
                        var m = H(d);
                        if (m && typeof m.SetVariable != a) {
                            f.success = !0;
                            f.ref = m
                        }
                        e(f)
                    }
                }
            }
        }

        function F() {
            var b = j.getElementsByTagName("body")[0], d = R(c);
            d.setAttribute("type", f);
            var e = b.appendChild(d);
            if (e) {
                var g = 0;
                (function () {
                    if (typeof e.GetVariable != a) {
                        var c = e.GetVariable("$version");
                        if (c) {
                            c = c.split(" ")[1].split(",");
                            z.pv = [parseInt(c[0], 10), parseInt(c[1], 10), parseInt(c[2], 10)]
                        }
                    } else if (g < 10) {
                        g++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                    b.removeChild(d);
                    e = null;
                    G()
                })()
            } else G()
        }

        function E() {
            l ? F() : G()
        }

        function D(b) {
            if (typeof i.addEventListener != a)i.addEventListener("load", b, !1); else if (typeof j.addEventListener != a)j.addEventListener("load", b, !1); else if (typeof i.attachEvent != a)S(i, "onload", b); else if (typeof i.onload == "function") {
                var c = i.onload;
                i.onload = function () {
                    c();
                    b()
                }
            } else i.onload = b
        }

        function C(a) {
            u ? a() : m[m.length] = a
        }

        function B() {
            if (!u) {
                try {
                    var a = j.getElementsByTagName("body")[0].appendChild(R("span"));
                    a.parentNode.removeChild(a)
                } catch (b) {
                    return
                }
                u = !0;
                var c = m.length;
                for (var d = 0; d < c; d++)m[d]()
            }
        }

        var a = "undefined", c = "object", d = "Shockwave Flash", e = "ShockwaveFlash.ShockwaveFlash", f = "application/x-shockwave-flash", g = "SWFObjectExprInst", h = "onreadystatechange", i = window, j = document, k = navigator, l = !1, m = [E], n = [], o = [], p = [], q, r, s, t, u = !1, v = !1, w, x, y = !0, z = function () {
            var b = typeof j.getElementById != a && typeof j.getElementsByTagName != a && typeof j.createElement != a, g = k.userAgent.toLowerCase(), h = k.platform.toLowerCase(), m = h ? /win/.test(h) : /win/.test(g), n = h ? /mac/.test(h) : /mac/.test(g), o = /webkit/.test(g) ? parseFloat(g.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, p = !1, q = [0, 0, 0], r = null;
            if (typeof k.plugins != a && typeof k.plugins[d] == c) {
                r = k.plugins[d].description;
                if (r && (typeof k.mimeTypes == a || !k.mimeTypes[f] || !!k.mimeTypes[f].enabledPlugin)) {
                    l = !0;
                    p = !1;
                    r = r.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    q[0] = parseInt(r.replace(/^(.*)\..*$/, "$1"), 10);
                    q[1] = parseInt(r.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    q[2] = /[a-zA-Z]/.test(r) ? parseInt(r.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                }
            } else if (typeof i.ActiveXObject != a)try {
                var s = new ActiveXObject(e);
                if (s) {
                    r = s.GetVariable("$version");
                    if (r) {
                        p = !0;
                        r = r.split(" ")[1].split(",");
                        q = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)]
                    }
                }
            } catch (t) {
            }
            return{w3: b, pv: q, wk: o, ie: p, win: m, mac: n}
        }(), A = function () {
            if (!!z.w3) {
                (typeof j.readyState != a && j.readyState == "complete" || typeof j.readyState == a && (j.getElementsByTagName("body")[0] || j.body)) && B();
                if (!u) {
                    typeof j.addEventListener != a && j.addEventListener("DOMContentLoaded", B, !1);
                    if (z.ie && z.win) {
                        j.attachEvent(h, function () {
                            if (j.readyState == "complete") {
                                j.detachEvent(h, arguments.callee);
                                B()
                            }
                        });
                        i == top && function () {
                            if (!u) {
                                try {
                                    j.documentElement.doScroll("left")
                                } catch (a) {
                                    setTimeout(arguments.callee, 0);
                                    return
                                }
                                B()
                            }
                        }()
                    }
                    z.wk && function () {
                        if (!u) {
                            if (!/loaded|complete/.test(j.readyState)) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            B()
                        }
                    }();
                    D(B)
                }
            }
        }(), X = function () {
            z.ie && z.win && window.attachEvent("onunload", function () {
                var a = p.length;
                for (var c = 0; c < a; c++)p[c][0].detachEvent(p[c][1], p[c][2]);
                var d = o.length;
                for (var e = 0; e < d; e++)O(o[e]);
                for (var f in z)z[f] = null;
                z = null;
                for (var g in b)b[g] = null;
                b = null
            })
        }();
        return{registerObject: function (a, b, c, d) {
            if (z.w3 && a && b) {
                var e = {};
                e.id = a;
                e.swfVersion = b;
                e.expressInstall = c;
                e.callbackFn = d;
                n[n.length] = e;
                V(a, !1)
            } else d && d({success: !1, id: a})
        }, getObjectById: function (a) {
            if (z.w3)return H(a)
        }, embedSWF: function (b, d, e, f, g, h, i, j, k, l) {
            var m = {success: !1, id: d};
            if (z.w3 && !(z.wk && z.wk < 312) && b && d && e && f && g) {
                V(d, !1);
                C(function () {
                    e += "";
                    f += "";
                    var n = {};
                    if (k && typeof k === c)for (var o in k)n[o] = k[o];
                    n.data = b;
                    n.width = e;
                    n.height = f;
                    var p = {};
                    if (j && typeof j === c)for (var q in j)p[q] = j[q];
                    if (i && typeof i === c)for (var r in i)typeof p.flashvars != a ? p.flashvars += "&" + r + "=" + i[r] : p.flashvars = r + "=" + i[r];
                    if (T(g)) {
                        var s = M(n, p, d);
                        n.id == d && V(d, !0);
                        m.success = !0;
                        m.ref = s
                    } else {
                        if (h && I()) {
                            n.data = h;
                            J(n, p, d, l);
                            return
                        }
                        V(d, !0)
                    }
                    l && l(m)
                })
            } else l && l(m)
        }, switchOffAutoHideShow: function () {
            y = !1
        }, ua: z, getFlashPlayerVersion: function () {
            return{major: z.pv[0], minor: z.pv[1], release: z.pv[2]}
        }, hasFlashPlayerVersion: T, createSWF: function (a, b, c) {
            return z.w3 ? M(a, b, c) : undefined
        }, showExpressInstall: function (a, b, c, d) {
            z.w3 && I() && J(a, b, c, d)
        }, removeSWF: function (a) {
            z.w3 && O(a)
        }, createCSS: function (a, b, c, d) {
            z.w3 && U(a, b, c, d)
        }, addDomLoadEvent: C, addLoadEvent: D, getQueryParamValue: function (a) {
            var b = j.location.search || j.location.hash;
            if (b) {
                /\?/.test(b) && (b = b.split("?")[1]);
                if (a == null)return W(b);
                var c = b.split("&");
                for (var d = 0; d < c.length; d++)if (c[d].substring(0, c[d].indexOf("=")) == a)return W(c[d].substring(c[d].indexOf("=") + 1))
            }
            return""
        }, expressInstallCallback: function () {
            if (v) {
                var a = Q(g);
                if (a && q) {
                    a.parentNode.replaceChild(q, a);
                    if (r) {
                        V(r, !0);
                        z.ie && z.win && (q.style.display = "block")
                    }
                    s && s(t)
                }
                v = !1
            }
        }}
    }();
    return b
});
STK.register("common.flash.imgUpload", function (a) {
    var b = document.documentElement, c = document.body, d = {getScroll: function () {
        var a, d, e, f;
        if (b && b.scrollTop) {
            a = b.scrollTop;
            d = b.scrollLeft;
            e = b.scrollWidth;
            f = b.scrollHeight
        } else if (c) {
            a = c.scrollTop;
            d = c.scrollLeft;
            e = c.scrollWidth;
            f = c.scrollHeight
        }
        return{t: a, l: d, w: e, h: f}
    }, getScreen: function () {
        var c = {};
        if (a.IE) {
            c.w = b.clientWidth;
            c.h = b.clientHeight
        } else {
            c.w = window.innerWidth;
            c.h = window.innerHeight
        }
        return c
    }}, e = function (a) {
        var b = {cn: "zh_CN", tw: "zh_TW", en: "en", hk: "zh_HK"};
        a = a.toLowerCase();
        a = a.replace(/zh-/g, "");
        return b[a]
    };
    return function (b, f) {
        var g = {version: $CONFIG.version, swf_path: $CONFIG.jsPath + "home/static/swf/img/", service: b.service, ed_swf: b.swf || "PhotoEditor.swf", exp_swf: "expressInstall.swf", h: b.h || 385, w: b.w || 528, f_version: "10.0.0", channel: b.id + "_channel", id_panel: b.id + "_panel", id_swf: b.id + "_swf"}, h = {}, i, j, k = {init: function () {
            f.init && f.init(h, b)
        }, setHeight: function (b) {
            a.IE || (m.getFlash(g.id_swf).height = b)
        }, upComplate: function (a) {
            b.sucess && b.sucess(a);
            i.style.display = "none";
            h.destory()
        }, closeEditor: function () {
            i.style.display = "none";
            h.destory();
            f.close && f.close(h, b)
        }, suda: function (a) {
            SUDA && SUDA.uaTrack && SUDA.uaTrack("meitu", "v4||" + a)
        }}, l = {version: g.version, userid: $CONFIG.uid, language: e($CONFIG.lang), channel: g.channel, JSHandler: "STK.core.util.listener.fire", initFun: "init", changeFlashHeightFun: "setHeight", uploadCompleteFun: "upComplate", closePhotoEditorFun: "closeEditor", suda: "suda"}, m = {init: function () {
            if (!!b.id) {
                i = a.E(g.id_panel);
                j = a.E(g.id_swf);
                if (!i) {
                    i = a.C("div");
                    i.id = g.id_panel;
                    c.appendChild(i)
                }
                if (!j) {
                    j = a.C("div");
                    j.id = g.id_swf;
                    i.appendChild(j)
                }
                i.style.display = "none";
                m.getFlash(g.id_swf) || m.build()
            }
        }, checkAction: function (a, b) {
            var c = STK.core.util.listener.list;
            return!!c[a] && !!c[a][b]
        }, bindEvt: function (a) {
            for (var b in a)k[a[b]] && !m.checkAction(g.channel, a[b]) && STK.core.util.listener.register(g.channel, a[b], k[a[b]])
        }, build: function () {
            var c = b.baseDir ? b.baseDir + "/" : "", d = {menu: "true", scale: "noScale", allowFullscreen: "true", allowScriptAccess: "always", bgcolor: "#FFFFFF", wmode: a.IE ? "window" : "transparent", base: g.swf_path + c}, e = {id: b.id};
            m.bindEvt(l);
            a.kit.extra.swfobject.embedSWF(g.swf_path + c + g.ed_swf + "?version=" + g.version, g.id_swf, g.w, g.h, g.f_version, g.swf_path + g.exp_swf, l, d, e)
        }, getFlash: function () {
            return a.kit.extra.swfobject.getObjectById(b.id)
        }, setPos: function () {
            var c, e, f, h, j = d.getScroll(), k = d.getScreen();
            f = Math.round(g.h > k.h ? k.h / 5 + j.t : (k.h - g.h) / 2 + j.t);
            h = Math.round(g.w > k.w ? k.w / 5 + j.l : (k.w - g.w) / 2 + j.l);
            c = b.pos.t - 1 || f;
            e = b.pos.l || h;
            i.style.zIndex = b.zIndex || 2e4;
            a.setStyle(i, "position", "absolute");
            a.setStyle(i, "left", e + "px");
            a.setStyle(i, "top", c + "px");
            m.autoScroll(j.t, j.t + (c - f))
        }, autoScroll: function (a, b, c) {
            var d, e, f, g = 8, h;
            g = c || g;
            h = a - b;
            e = [h];
            e[g] = 0;
            f = 1;
            for (f; f < g; f++)e[f] = h = h / 2;
            clearInterval(d);
            d = setInterval(function () {
                e.length ? window.scrollTo(0, b + e.shift()) : clearInterval(d)
            }, 30)
        }};
        h.show = function (a) {
            a && (b.id = a);
            i && (i.style.display = "");
            m.setPos();
            return this
        };
        h.hide = function () {
            i && (i.style.display = "");
            return this
        };
        h.setPars = function (a) {
            var b = {imageURL: a || "", uploadURL: g.service};
            m.getFlash(g.id_swf).editPhoto(b);
            return this
        };
        h.getSwf = m.getFlash;
        h.destory = function () {
            for (var a in l)k[l[a]] && STK.core.util.listener.remove(g.channel, l[a], k[l[a]]);
            i.innerHTML = ""
        };
        m.init();
        return h
    }
});
STK.register("kit.extra.watermark", function (a) {
    var b = {trans: null, conf: null, success: function (a, c) {
        b.conf = a.data
    }}, c = [];
    return function (d) {
        if (typeof d == "function") {
            c.push(d);
            if (b.conf)for (var e = 0; e < c.length; e++) {
                c[e] && c[e](b.conf);
                c[e] = null
            } else {
                b.trans || (b.trans = a.common.trans.editor.getTrans("waterMark", {onSuccess: function () {
                    b.success.apply(null, arguments);
                    for (var a = 0; a < c.length; a++) {
                        c[a] && c[a](b.conf);
                        c[a] = null
                    }
                }, onError: a.funcEmpty, onFail: a.funcEmpty}));
                b.trans.abort();
                b.trans.request()
            }
        }
    }
});
STK.register("common.flash.uploadLog", function (a) {
    return function () {
        var b = {}, c = function (b) {
            var c = new Image, d = encodeURIComponent(navigator.userAgent), e = window.$CONFIG, f = a.kit.extra.merge({cl: d, rnd: (new Date).getTime(), uid: e ? e.uid : 0, referer: encodeURIComponent(location), tm: Math.floor(+(new Date) / 1e3), ip: "", t: 0}, b);
            f.ret == "none" && (f.err = "10003");
            f = a.core.json.jsonToQuery(f);
            f = "http://stats.t.sinaimg.cn/do_not_delete/fc.html?" + f;
            c.setAttribute("src", f)
        }, d = function (b) {
            var c = new Image, d = encodeURIComponent(navigator.userAgent), e = window.$CONFIG, f = a.kit.extra.merge({rnd: (new Date).getTime(), uid: e ? e.uid : 0, cl: d, tm: +(new Date), ip: "", t: 2, sz: 0}, b);
            f = a.core.json.jsonToQuery(f);
            f = "http://stats.t.sinaimg.cn/do_not_delete/fc.html?" + f;
            c.setAttribute("src", f)
        };
        b.sendSucc = d;
        b.sendError = c;
        b.destroy = function () {
        };
        return b
    }
});
STK.register("kit.extra.upload", function (a) {
    var b = a.kit.extra.language, c = "ww1.sinaimg.cn/do_not_delete/fc.html?t=1";
    return function (c) {
        var d = {}, e = window.location.href, f, g, h = a.common.flash.uploadLog();
        c = a.parseParam({type: "common", form: null, base64Str: "", imgName: "", uploadArgs: {}, app: ""}, c);
        a.custEvent.define(d, ["uploadError", "uploadSucc"]);
        var i = {base64form: null, upload: function (b) {
            var d, e = b, h = "weibo.com/", j = window.$CONFIG, k = c.type;
            if (k === "common")d = c.form; else if (k === "base64") {
                d = a.C("form");
                i.base64form = d;
                d.method = "POST";
                var l = a.C("input");
                l.name = "b64_data";
                l.type = "hidden";
                l.value = c.base64Str;
                d.appendChild(l);
                document.body.appendChild(d)
            }
            var m = {marks: 1, app: "miniblog", s: "rdxt"};
            c.type === "common" || c.type === "base64" ? m = a.kit.extra.merge({url: e.domain == "1" ? h + (j && j.watermark || j.domain) : 0, markpos: e.position || "", logo: e.logo || "", nick: e.nickname == "1" ? "@" + (j && j.nick) : 0}, m) : c.type === "custom" && (m = a.kit.extra.merge(c.uploadArgs, m));
            k === "base64" && (m = a.kit.extra.merge({mime: "image/jpeg", data: "base64"}, m));
            g = new Date;
            f = a.core.io.ijax({url: "http://picupload.service.weibo.com/interface/pic_upload.php", form: d, abaurl: "http://" + document.domain + "/aj/static/upimgback.html?_wv=5", abakey: "cb", timeout: 18e5, onComplete: i.handle, onTimeout: i.handle, args: m})
        }, sendError: function (b) {
            var d = new Image, f = encodeURIComponent(navigator.userAgent), g = window.$CONFIG, h = a.kit.extra.merge(b, {cl: f, rnd: (new Date).getTime(), uid: g ? g.uid : 0, referer: encodeURIComponent(e), tm: +(new Date), ip: "", app: c.app});
            h.ret == "none" && (h.err = "10003");
            h = a.core.json.jsonToQuery(h);
            h = "http://ww1.sinaimg.cn/do_not_delete/fc.html?" + h;
            d.setAttribute("src", h)
        }, sendSucc: function (b) {
            var d = new Date - g, e = new Image, f = encodeURIComponent(navigator.userAgent), h = window.$CONFIG, i = a.kit.extra.merge(b, {ct: "1", rnd: (new Date).getTime(), el: d, uid: h ? h.uid : 0, cl: f, tm: +(new Date), ip: "", app: c.app});
            i = a.core.json.jsonToQuery(i);
            i = "http://ww1.sinaimg.cn/do_not_delete/fc.html?" + i;
            e.setAttribute("src", i)
        }, handle: function (e) {
            a.removeNode(i.base64form);
            i.base64form = null;
            var f = Math.abs(e.ret);
            if (!e || e.ret < 0) {
                var j = "";
                switch (f) {
                    case 1:
                        j = "#L{没有登录}";
                        break;
                    case 4:
                    case 9:
                        j = "#L{请上传5M以内的JPG、GIF、PNG图片。}";
                        break;
                    default:
                        j = "#L{上传图片超时}"
                }
                e ? h.sendError({ret: e.ret, app: "1001"}) : h.sendError({ret: "none", app: "1001"});
                a.custEvent.fire(d, "uploadError", {code: f, msg: b(j)})
            } else {
                var k = new Date, l = function (a) {
                    return a < 10 ? "0" + a : a
                }, m;
                if (c.type === "common")m = c.imgName; else if (c.type === "base64") {
                    var n = [k.getFullYear(), l(k.getMonth() + 1), l(k.getDate()), l(k.getHours()), l(k.getMinutes()), l(k.getSeconds())].join("");
                    m = b("#L{微博桌面截图}") + n + ".jpg"
                }
                a.custEvent.fire(d, "uploadSucc", {pid: e.pid, imgName: m});
                var o = new Date - g;
                h.sendSucc({pids: e.pid, ret: e.ret, app: "1001", el: o, ct: "1"})
            }
        }, init: function () {
            c.type === "common" || c.type === "base64" ? a.kit.extra.watermark(function (a) {
                i.upload(a)
            }) : i.upload()
        }, destroy: function () {
            a.custEvent.undefine(d);
            a.removeNode(i.base64form)
        }};
        i.init();
        d.destroy = i.destroy;
        d.abort = function () {
            if (f)try {
                f.abort()
            } catch (a) {
            }
        };
        return d
    }
});
STK.register("common.plugin.plugInstallState", function (a) {
    return function (b, c, d, e) {
        var f = {}, g = a.core.util.browser, h = window.navigator, i = a.IE, j = g.MOZ, k = g.OPERA, l = g.SAFARI, m = g.CHROME, n = g.Version, o = c.embedId, p = c.embedType, q = b.pluginName, r = b.activeXName;
        f.instance = e;
        var s = function () {
            var a;
            for (a = 0; a < d.length; a++)if (!(d.param[a]in f.instance))break;
            return a < d.length - 1 ? !1 : !0
        };
        f.getInstallState = function () {
            if (i) {
                var b;
                if (!f.instance)try {
                    f.instance = new ActiveXObject(r);
                    b = !0
                } catch (c) {
                    f.instance = null
                }
                if (f.instance) {
                    if (s())return"ieinstalled";
                    if (!b)try {
                        f.instance = new ActiveXObject(r)
                    } catch (c) {
                        f.instance = null
                    }
                    return f.instance ? s() ? "ieinstalled" : "ieneedUpdate" : "ieneedInstall"
                }
                return"ieneedInstall"
            }
            var d = h.plugins, e;
            if (d && d.length)for (var g = 0, j = d.length; g < j; g++) {
                var k = d[g];
                if (k && k.name && k.name === q) {
                    e = !0;
                    break
                }
            }
            if (e) {
                if (!f.instance) {
                    var l = a.C("embed");
                    l.id = o;
                    l.type = p;
                    l.setAttribute("width", "0");
                    l.setAttribute("height", "0");
                    document.body.appendChild(l);
                    f.instance = l
                }
                return"installed"
            }
            f.instance = null;
            return"needInstall"
        };
        return f
    }
});
STK.register("common.plugin.screenCapture", function (a) {
    var b = a.core.util.browser, c = a.kit.extra.language, d = function (a, b) {
        window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack(a, b)
    }, e = a.IE, f = b.MOZ, g = b.OPERA, h = b.SAFARI, i = b.CHROME, j = b.Version, k = "weibo_screen_grab_download", l = {pluginName: "npScreenGrab Plugin", activeXName: "ScreenGrab.ScreenGrabCom.1"}, m = {embedId: "weibo_screen_grab_embed", embedType: "application/x-screengrab-sina"}, n = {param1: "OnGrapContent", param2: "CloseScreenGrabCtrlWnd", param3: "onmsgfireevent"}, o, p = {spec: null, setCurrentSpec: function (a) {
        p.spec = a
    }, setup: function () {
        if (typeof o.OnGrapContent != "function") {
            o.OnGrapContent = function (a, b, c, d) {
                var e = p.spec;
                q.focusWindow();
                if (a === 2) {
                    if (e.captureType === "base64")e.captureSuccess(c); else if (e.captureType === "pid") {
                        e.beforeUpload();
                        e.upload(c)
                    }
                } else if (a === 3) {
                    q.focusWindow();
                    e.captureCancel()
                }
            };
            o.onmsgfireevent = function (a, b) {
                if (b === 2) {
                    q.focusWindow();
                    spec.captureCancel()
                }
            };
            a.addEvent(window, "unload", function () {
                a.removeEvent(window, "unload", arguments.callee);
                if (o)try {
                    o.CloseScreenGrabCtrlWnd();
                    o.onmsgfireevent = null;
                    o.OnGrapContent = null;
                    o = null
                } catch (b) {
                }
            })
        }
    }}, q = {};
    q.isSupport = function () {
        return b.OS === "windows" ? e ? !0 : f ? j >= 3.6 ? !0 : !1 : g ? !1 : h ? !1 : i ? j >= 4 ? !0 : !1 : !1 : !1
    };
    q.focusWindow = function () {
        window.focus()
    };
    q.hide = function () {
        o && o.CloseScreenGrabCtrlWnd()
    };
    q.screenCapture = function (b) {
        var g, h = {uploadSucc: function (a, c) {
            q.focusWindow();
            b.captureSuccess(c)
        }, uploadErr: function (a, c) {
            b.captureError(c)
        }}, j = function (b) {
            g && g.destroy();
            g = a.kit.extra.upload({type: "base64", base64Str: b, app: "1001"});
            a.custEvent.add(g, "uploadSucc", h.uploadSucc);
            a.custEvent.add(g, "uploadError", h.uploadErr)
        }, r = function () {
            b.upload = function (a) {
                j(a)
            };
            p.setup();
            p.setCurrentSpec(b);
            if (a.isArray(b.showPos)) {
                var c = b.showPos;
                o.ShowControlWnd(c[0], c[1], c[2], c[3])
            } else if (typeof b.showPos == "function") {
                var c = b.showPos();
                a.isArray(c) && o.ShowControlWnd(c[0], c[1], c[2], c[3])
            } else if (b.showPos === "center") {
                var d = a.scrollPos(), e = 200, f = 200, g = a.winSize(), h = Math.floor(d.top + (g.height - e) / 2), i = Math.floor(d.left + (g.width - f) / 2);
                o.ShowControlWnd(window.screenLeft + i, window.screenTop + h, f, e)
            } else b.showPos === "default" && o.ShowControlWnd(-1, -1, -1, -1)
        }, s = function (b, e) {
            var f = "http://desktop.weibo.com/download.php?source=jietu", g = '<#et screentip data><div class="layer_screenshot_tips"><p class="tip" style="width:338px"><span class="icon_warnM"></span>${data.titletip}。</p><div><a href="http://desktop.weibo.com" target="_blank"><img src="${data.imgsrc}" width="338" height="147"/></a></div><div class="btn"><a node-type="download" href="javascript:void(0)" class="W_btn_a"><span>${data.downloadTitle}</span></a><a node-type="nodownload" href="javascript:void(0)" class="W_btn_b"><span>#L{取消下载}</span></a></div></div></#et>', h = {imgsrc: (window.$CONFIG && window.$CONFIG.imgPath || "http://img.t.sinajs.cn/t4/") + "style/images/index/pic_screenshot.png?version=" + (window.$CONFIG && window.$CONFIG.version || ""), titletip: b === "IE" ? "#L{使用此功能，需要先安装微博桌面}" : "#L{使用此功能，需要先安装微博桌面插件}" + (b === "FF" ? "，#L{并重新启动浏览器才能使用}" : ""), downloadTitle: "#L{立即下载}"}, i = a.ui.dialog();
            i.setTitle(c("#L{截屏插件安装提示}"));
            i.setContent(c(a.core.util.easyTemplate(g, h).toString()));
            i.show();
            i.setMiddle();
            var j = i.getDomList(), l = function () {
                i.hide();
                d("tblog_image_cut", "cancel_download")
            }, m = function (b) {
                var c = a.E(k);
                if (!c) {
                    c = a.C("iframe");
                    c.id = k;
                    c.style.display = "none";
                    a.core.util.hideContainer.appendChild(c)
                }
                c.src = f;
                d("tblog_image_cut", "download");
                i.hide()
            };
            a.addEvent(j.download, "click", m);
            a.addEvent(j.nodownload, "click", l);
            a.custEvent.add(i, "hide", function () {
                a.custEvent.remove(i, "hide", arguments.callee);
                a.removeEvent(j.download, "click", m);
                a.removeEvent(j.nodownload, "click", l);
                e()
            })
        }, t = function () {
            b.beforeSupportTip();
            a.ui.alert(c("#L{微博截图功能暂未支持你的浏览器，目前微博截图插件支持Windows系统下的以下浏览器：IE浏览器，支持IE6及更新版本。IE内核浏览器，如360安全浏览器，傲游等浏览器。Firefox浏览器，支持3.6及更新版本。Chrome浏览器，支持4.0及更新版本。Chronium内核浏览器，如360急速浏览器，搜狗等浏览器}。"), {title: c("#L{暂不支持当前浏览器}"), OK: function () {
                setTimeout(function () {
                    b.supportTipOk()
                }, 0)
            }});
            d("tblog_image_cut", "not_support_browser")
        }, u = function () {
            var c = e ? "IE" : f ? "FF" : i ? "CHROME" : "";
            b = a.parseParam({captureType: "base64", captureSuccess: a.funcEmpty, captureCancel: a.funcEmpty, captureError: a.funcEmpty, beforeUpload: a.funcEmpty, showPos: "default", beforeSupportTip: a.funcEmpty, supportTip: t, supportTipOk: a.funcEmpty, beforeIeInstallTip: a.funcEmpty, ieInstallTip: function () {
                b.beforeIeInstallTip();
                s(c, b.ieInstallTipOk)
            }, ieInstallTipOk: a.funcEmpty, beforeInstallTip: a.funcEmpty, installTip: function () {
                b.beforeInstallTip();
                s(c, b.installTipOk)
            }, installTipOk: a.funcEmpty}, b || {});
            var d = q.isSupport();
            if (!d)b.supportTip(); else {
                var g = a.common.plugin.plugInstallState(l, m, n, o), h = g.getInstallState();
                o = g.instance;
                h === "installed" || h === "ieinstalled" ? r() : h === "ieneedUpdate" || h === "ieneedInstall" ? b.ieInstallTip() : h === "needInstall" && b.installTip()
            }
        };
        return{doit: u, hide: q.hide, focusWindow: q.focusWindow, abort: function () {
            try {
                g && g.abort()
            } catch (a) {
            }
        }}
    };
    return q
});
STK.register("kit.extra.getFlashVersion", function (a) {
    return function () {
        var a = "1", b = navigator;
        if (b.plugins && b.plugins.length) {
            for (var c = 0; c < b.plugins.length; c++)if (b.plugins[c] && b.plugins[c].name && b.plugins[c].name.indexOf("Shockwave Flash") != -1) {
                a = b.plugins[c].description.split("Shockwave Flash ")[1];
                break
            }
        } else if (window.ActiveXObject)for (var c = 10; c >= 2; c--)try {
            var d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + c);
            if (d) {
                a = c + ".0";
                break
            }
        } catch (e) {
        }
        return parseInt(a.split(".")[0])
    }
});
STK.register("kit.io.cssLoader", function (a) {
    var b = "", c = "http://img.t.sinajs.cn/t4/", d = "http://timg.sjs.sinajs.cn/t4/";
    if (typeof $CONFIG != "undefined") {
        c = $CONFIG.cssPath || c;
        b = $CONFIG.version || ""
    }
    var e = {};
    return function (f, g, h, i, j) {
        i = i || b;
        h = h || function () {
        };
        var k = function (a, b) {
            var c = e[a] || (e[a] = {loaded: !1, list: []});
            if (c.loaded) {
                b(a);
                return!1
            }
            c.list.push(b);
            return c.list.length > 1 ? !1 : !0
        }, l = function (a) {
            var b = e[a].list;
            for (var c = 0; c < b.length; c++)b[c](a);
            e[a].loaded = !0;
            delete e[a].list
        };
        if (!!k(f, h)) {
            var m;
            j ? m = d + f : m = c + f + "?version=" + i;
            var n = a.C("link");
            n.setAttribute("rel", "Stylesheet");
            n.setAttribute("type", "text/css");
            n.setAttribute("charset", "utf-8");
            n.setAttribute("href", m);
            document.getElementsByTagName("head")[0].appendChild(n);
            var o = a.C("div");
            o.id = g;
            a.core.util.hideContainer.appendChild(o);
            var p = 3e3, q = function () {
                if (parseInt(a.core.dom.getStyle(o, "height")) == 42) {
                    a.core.util.hideContainer.removeChild(o);
                    l(f)
                } else if (--p > 0)setTimeout(q, 10); else {
                    a.log(f + "timeout!");
                    a.core.util.hideContainer.removeChild(o);
                    delete e[f]
                }
            };
            setTimeout(q, 50)
        }
    }
});
STK.register("kit.extra.installFlash", function (a) {
    var b = a.kit.extra.language;
    return function (c) {
        c = a.parseParam({onHide: a.funcEmpty}, c);
        var d = '<div class="layer_version_upgrade"><dl class="point clearfix"><dt><span class="icon_versionup"></span></dt><dd><p class="S_txt1">#L{你的Flash版本过低，请安装更高版本的Flash插件后，再刷新页面重试}</p></dd></dl><div class="versionup_btn"><a class="btn_l" href="http://get.adobe.com/cn/flashplayer/" target="_blank"><img width="16" height="16" class="icon_install" title="" src="' + $CONFIG.imgPath + 'style/images/common/transparent.gif">' + '<span class="txt">#L{安装更新}</span></a><a class="btn_r" href="javascript:void(0);" onclick="window.location.reload()">' + ' <img width="16" height="16" class="icon_refreshpage" title="" src="' + $CONFIG.imgPath + 'style/images/common/transparent.gif">' + '<span class="txt">#L{刷新页面}</span></a></div>' + "</div>";
        a.kit.io.cssLoader("style/css/module/layer/layer_version_upgrade.css", "js_style_css_module_layer_layer_version_upgrade", function () {
            var e = a.ui.dialog();
            e.setTitle(b("#L{提示}"));
            var f = a.C("div");
            f.innerHTML = b(d);
            e.appendChild(f);
            f = null;
            e.show();
            e.setMiddle();
            a.custEvent.add(e, "hide", function () {
                a.custEvent.remove(e, "hide", arguments.callee);
                setTimeout(function () {
                    c.onHide()
                }, 0)
            })
        })
    }
});
STK.register("common.bubble.image", function (a) {
    var b = window.$CONFIG, c = [];
    (function () {
        b && b.bigpipe === "true" && a.historyM && a.historyM.onpopstate(function (b, d) {
            if (d) {
                a.foreach(c, function (a) {
                    a()
                });
                c = []
            }
        })
    })();
    return function (d, e) {
        var f, g = a.common.plugin.screenCapture, h = a.kit.extra.language, i = '<div node-type="outer"><div class="layer_send_pic" node-type="wrap"><div node-type="inner"><div class="profile_tab S_line5"><ul class="pftb_ul layer_tab S_line1"><li class="pftb_itm S_line1"><a class="pftb_lk current S_line5 S_txt1 S_bg5" href="javascript:void(0);" node-type="tab">#L{本地上传}</a></li><li class="pftb_itm pftb_itm_lst S_line1"><a  class="pftb_lk S_line5 S_txt1 S_bg1" href="javascript:void(0);" node-type="tab">#L{推荐配图}</a></li></ul></div><div node-type="content"></div></div><div node-type="uploaded" style="display:none"><div class="laPic_tit"><span node-type="pName"></span><span class="right"></span></div><div node-type="picWrap" class="laPic_Pic"></div><div class="lapic_edit"><a class="beautify" href="javascript:void(0);" node-type="beautify" action-type="beautify" suda-data="key=meitu&value=v4||publish||editor"><span class="W_ico12 icon_edit"></span>#L{编辑}</a><a class="delete" href="javascript:void(0);" action-type="delete"><span class="W_ico12 ico_del"></span>#L{删除}</a></div></div></div><div node-type="flashPanel"></div>', j = '<#et uppic data><div node-type="uppic">    <div class="laPic_btnBox clearfix">        <div class="laPic_btnmore">            <a href="javascript:void(0);" class="W_btn_e" node-type="inputCover">                <span><em class="ico_one"></em>#L{单张图片}</span>                <form node-type="form" action-type="form" id="pic_upload" name="pic_upload" target="upload_target" enctype="multipart/form-data" method="POST" action="">                    <input class="input_f" type="file" hidefoucs="true" style="" node-type="fileBtn" name="pic1"/>                </form></a>        </div>        <div class="laPic_btnmore">            <a href="javascript:void(0);" class="W_btn_e" action-type="more" suda-data="key=meitu&value=v4||publish||more">                <span><em class="ico_ones"></em>#L{多张图片}</span>            </a>        </div>        <#if (data.supportCapture)><div class="laPic_btnmore">            <a href="javascript:void(0);" class="W_btn_e" action-type="screen_window" suda-data="key=tblog_image_cut&value=open_image_cut">                <span><em class="ico_screenshot"></em>#L{截屏上传}</span>            </a>        </div></#if>       <div class="laPic_btnmore">           <a href="javascript:void(0);" class="W_btn_e" action-type="face_sticker">               <span><em class="ico_bigface"></em>#L{大 头 贴}</span>           </a>       </div>       <div class="laPic_btnmore">           <a href="javascript:void(0);" class="W_btn_e" action-type="upload_album">               <span><em class="ico_toalbum"></em>#L{上传到相册}</span>           </a>       </div>    </div></div><div node-type="loading"  style="width:230px;display:none"><div class="laPic_con"><div class="W_loading"><span>#L{图片正在上传，请等待}...</span></div></div><div class="laPic_btn"><a href="javascript:void(0);" class="W_btn_b" action-type="cancel"><span>#L{取消上传}</span></a></div></div></#et>', k = '<p class="tab_kind S_link2"><span class="right"><a class="pre_d" action-type="prev" node-type="prev" href="javascript:void(0);"></a><a class="next" action-type="next" node-type="next" href="javascript:void(0);"></a></span><em node-type="categorys"></em></p><div node-type="loading"></div><div class="detail"><ul node-type="list" class="faces_magic_list clearfix"></ul><div node-type="page" class="W_pages_minibtn"></div></div>', l = '<div class="W_loading"><span>正在加载，请稍候...</span></div>', m = '<a href="javascript:void(0);" onclick="return false;" action-type="category" action-data="category=#{item}">#{item}</a>', n = '<a href="javascript:void(0);"  onclick="return false;" action-type="category" action-data="category=#{item}" class="current S_txt1">#{item}</a>', o = '<li><a action-type="insertSmiley" action-data="url=#{thumb}&pid=#{picid}&value=#{value}" class="img" href="javascript:void(0);"><img src="#{thumb}" original="#{original}" title="#{value}" alt="#{phrase}" /></a><span title="#{value}"  action-type="insertSmiley" action-data="url=#{thumb}&pid=#{picid}&value=#{value}">#{phrase}</span></li>', p = '<a action-type="page" class="page S_bg1" action-data="num=#{number}" href="javascript:void(0);" >#{label}</a>', q = '<a action-type="page" action-data="num=#{number}" href="javascript:void(0);"  class="page S_txt1"  onclick="return false;">#{label}</a>', r = "", s = h("#L{默认}"), t = "#L{分享图片}", u = "##L{微博大头贴}#", v = 5, w = "weibo.com/", x, y, z, A, B, C, D, E, F, G, H, I, J = {}, K = {page: 0, cache: null, cPoniter: 0, categorys: [], currentCategory: s, itemNumber: 10}, L, M, N = a.core.dom.position, O = a.core.evt.addEvent, P = a.core.evt.removeEvent, Q = function () {
            z = R;
            a.custEvent.define(J, ["uploaded", "hide", "insert", "deletePIC", "picLoad"]);
            a.custEvent.add(f, "hide", function (b) {
                return function () {
                    R.abortUpload();
                    R.hideCapture();
                    a.custEvent.remove(b, "hide", arguments.callee);
                    a.custEvent.fire(J, "hide", {});
                    F = 0
                }
            }(f));
            a.lib.litter.tab(x, {evtType: "click", tNodes: '[node-type="tab"]', className: "current", removeClassNames: "pftb_lk S_line5 S_txt1 S_bg1", addClassNames: "pftb_lk current S_line5 S_txt1 S_bg5", cb: [R.init, S.init]});
            I = a.core.evt.delegatedEvent(x);
            R.bind()
        }, R = {abortUpload: function () {
            C && C.abort();
            D && D.abort()
        }, init: function () {
            z = R;
            R.initDom();
            R.bind()
        }, initDom: function () {
            var b;
            L.wrap.className = "layer_send_pic";
            var c = {supportCapture: !0};
            L.content.innerHTML = h(a.core.util.easyTemplate(j, c).toString());
            L.close = f.getDomList().close;
            b = a.kit.dom.parseDOM(a.core.dom.builder(x).list);
            L = a.kit.extra.merge(L, b);
            R.exchangeInput()
        }, bind: function () {
            O(L.fileBtn, "change", T.upload);
            O(L.fileBtn, "click", R.hideCapture);
            I.add("delete", "click", R.deletePic);
            I.add("cancel", "click", R.cancelUpload);
            I.add("more", "click", R.morePic);
            I.add("beautify", "click", R.beautify);
            I.add("screen_window", "click", R.captureWindow);
            I.add("face_sticker", "click", R.faceSticker);
            I.add("upload_album", "click", R.uploadAblum)
        }, destroy: function () {
            L.fileBtn && P(L.fileBtn, "click", R.hideCapture);
            L.fileBtn && P(L.fileBtn, "change", T.upload)
        }, handleError: function (b) {
            R.stopUpload();
            f.stopBoxClose();
            R.resetInput();
            a.ui.alert(h(b.msg), {OK: function () {
                b.code == 1 && window.location.reload();
                setTimeout(function () {
                    f.startBoxClose()
                }, 0)
            }})
        }, handleSucc: function (a) {
            R.rendSucc(a);
            R.stopUpload()
        }, rendLoad: function () {
            f.stopBoxClose();
            L.uppic.style.display = "none";
            L.loading.style.display = ""
        }, rendSucc: function (b) {
            var c = a.common.extra.imageURL(b.pid), d = [], e, f;
            H = H || b.pid;
            d = H.split(/\/|\\/);
            e = d[d.length - 1];
            d = e.split(".");
            if (d.length > 1 && a.bLength(d[0]) > 20) {
                d[0] = a.leftB(d[0], 20);
                f = [d[0], "...", d[1]].join("")
            } else f = e;
            B = b.pid;
            T.loadPic({url: c, value: f, pid: b.pid});
            L.beautify && (L.beautify.style.display = "")
        }, deletePic: function () {
            a.preventDefault();
            L.close.style.display = "";
            L.inner.style.display = "";
            L.wrap.style.width = "";
            L.uploaded.style.display = "none";
            L.picWrap.innerHTML = "";
            z.destroy();
            z.init();
            f.startBoxClose();
            a.custEvent.fire(J, "deletePIC", {text: h(G)});
            F = 0
        }, stopUpload: function () {
            L.loading.style.display = "none";
            L.uppic.style.display = ""
        }, cancelUpload: function () {
            R.abortUpload();
            R.stopUpload();
            R.resetInput();
            f.startBoxClose()
        }, exchangeInput: function () {
            var b = L.fileBtn, c = b.parentNode, d = b.className, e = b.name, f = a.C("input");
            f.className = d;
            f.name = e;
            f.type = "file";
            f.hideFocus = "true";
            L.fileBtn = f;
            c.removeChild(b);
            c.appendChild(f)
        }, resetInput: function () {
            P(L.fileBtn, "click", R.hideCapture);
            P(L.fileBtn, "change", T.upload);
            R.exchangeInput();
            O(L.fileBtn, "change", T.upload);
            O(L.fileBtn, "click", R.hideCapture)
        }, beautifySucess: function (a) {
            H = a;
            R.handleSucc({pid: a})
        }, faceStickerSucess: function (a) {
            F = 1;
            H = a;
            R.handleSucc({pid: a})
        }, morePic: function () {
            R.uploadWaterMarkFlash({id: "photo_merge", swf: "SinaCollage.swf", width: 528, height: 470, sucess: R.beautifySucess})
        }, faceSticker: function () {
            R.uploadWaterMarkFlash({id: "photo_facesticker", swf: "FacePhoto.swf", width: 568, height: 478, baseDir: "facesticker", sucess: R.faceStickerSucess})
        }, uploadWaterMarkFlash: function (c) {
            a.preventDefault();
            R.hideCapture();
            f.stopBoxClose();
            if (a.kit.extra.getFlashVersion() < 10)a.kit.extra.installFlash({onHide: function () {
                f.startBoxClose()
            }}); else {
                var d = function (d) {
                    var e = d.nickname != "0" || d.logo != "0" || d.domain != "0", g = b && b.nick || "", h = "http://picupload.service.weibo.com/interface/pic_upload.php?app=miniblog&marks=" + (e ? "1" : "0") + (d.logo == "1" ? "&logo=1" : "") + (d.nickname == "1" ? "&nick=" + (g ? encodeURIComponent("@" + g) : "") : "") + (d.domain == "1" ? "&url=" + w + (b && b.watermark || b.domain) : "") + (d.position ? "&markpos=" + d.position : "") + "&s=xml&cb=http://weibo.com/upimgback.html&rq=http%3A%2F%2Fphoto.i.weibo.com%2Fpic%2Fadd.php%3Fapp%3D1", i = {id: c.id, pos: f.getPosition(), service: h, sucess: c.sucess, h: c.height, w: c.width, swf: c.swf, baseDir: c.baseDir || ""};
                    a.common.flash.imgUpload(i, {init: function (a, b) {
                        a.setPars()
                    }, close: function (a, b) {
                        setTimeout(function () {
                            f.startBoxClose()
                        }, 100)
                    }}).show()
                };
                a.kit.extra.watermark(function (a) {
                    d(a)
                })
            }
        }, beautify: function () {
            a.preventDefault();
            if (a.kit.extra.getFlashVersion() < 10)a.kit.extra.installFlash(); else {
                var b = {id: "photo_editor", pos: f.getPosition(), service: "http://picupload.service.weibo.com/interface/pic_upload.php?app=miniblog&s=xml&cb=http://weibo.com/upimgback.html&rq=http%3A%2F%2Fphoto.i.weibo.com%2Fpic%2Fadd.php%3Fapp%3D1", sucess: R.beautifySucess, h: 385, w: 528, swf: "PhotoEditor.swf"};
                a.common.flash.imgUpload(b, {init: function (b, c) {
                    b.setPars(a.common.extra.imageURL(B, {size: "large"}))
                }, close: function (a, b) {
                }}).show()
            }
        }, hideCapture: function () {
            D && D.hide()
        }, captureWindow: function () {
            a.preventDefault();
            if (!D) {
                var b = function () {
                    f.stopBoxClose()
                }, c = function () {
                    f.startBoxClose()
                };
                D = g.screenCapture({captureType: "pid", beforeUpload: R.beforeCaptureUpload, captureSuccess: R.captureSuccess, captureError: R.handleError, beforeSupportTip: b, supportTipOk: c, beforeIeInstallTip: b, ieInstallTipOk: c, beforeInstallTip: b, installTipOk: c})
            }
            D.doit()
        }, beforeCaptureUpload: function () {
            R.rendLoad()
        }, captureSuccess: function (a) {
            H = a.imgName;
            E = 1;
            R.handleSucc(a)
        }, uploadAblum: function () {
            window.open("http://photo.weibo.com/upload/weibo", "", "width=650, height=470, top=300, left=400")
        }}, S = {init: function () {
            z = S;
            R.abortUpload();
            R.hideCapture();
            var b;
            L.wrap.className = "layer_faces";
            R.destroy();
            L.content.innerHTML = h(k);
            b = a.kit.dom.parseDOM(a.core.dom.builder(x).list);
            L = a.kit.extra.merge(L, b);
            L.loading.innerHTML = h(l);
            S.cartoonStart();
            S.bind()
        }, bind: function () {
            I.add("insertSmiley", "click", function (a) {
                STK.core.evt.preventDefault();
                L.beautify && (L.beautify.style.display = "none");
                var b = a.data.url, c = a.data.pid, d = a.data.value;
                T.loadPic({url: b, value: d, pid: c})
            });
            I.add("category", "click", function (a) {
                K.page = 0;
                K.currentCategory = a.data.category;
                S.rend();
                setTimeout(function () {
                    S.rendCategory(K);
                    S.rendPage(K)
                }, 0)
            });
            I.add("prev", "click", function (b) {
                a.preventDefault(b.evt);
                var c = K.cPoniter;
                if (c <= 0)return!1;
                K.cPoniter -= v;
                S.rendCategory(K)
            });
            I.add("next", "click", function (b) {
                a.preventDefault(b.evt);
                var c = K.cPoniter, d = K.categorys;
                if (c >= d.length - v)return!1;
                K.cPoniter += v;
                S.rendCategory(K)
            });
            I.add("page", "click", function (a) {
                K.page = parseInt(a.data.num, 10);
                S.rend();
                setTimeout(function () {
                    S.rendPage(K)
                }, 0);
                return STK.preventDefault(a.evt)
            })
        }, cartoonStart: function () {
            a.common.trans.editor.getTrans("cartoon", {onSuccess: function (a, b) {
                K.cache = a.data.more || {};
                K.categorys = [s];
                for (var c in K.cache)K.categorys.push(c);
                K.cache[s] = a.data.usual.norm;
                S.cartoonStart = function () {
                    K.page = 0;
                    K.cPoniter = 0;
                    K.currentCategory = s;
                    S.rend();
                    S.rendCategory(K);
                    S.rendPage(K)
                };
                S.cartoonStart()
            }}).request({})
        }, rend: function (b, c) {
            var d = K.currentCategory, e = K.cache[d], f = K.page, g = K.itemNumber;
            e = e.slice(f * g, f * g + g);
            e = a.foreach(e, function (b, c) {
                a.bLength(b.phrase) > 8 && (b.phrase = [a.leftB(b.phrase, 6), "..."].join(""));
                return a.templet(h(o), b)
            });
            L.loading.innerHTML = "";
            L.list.innerHTML = e.join("")
        }, rendCategory: function (b) {
            var c = b.cPoniter, d = b.categorys, e = b.currentCategory, f = d.slice(c, c + v);
            f = a.foreach(f, function (b, c) {
                return e === b ? a.templet(h(n), {item: b}) : a.templet(h(m), {item: b})
            });
            L.categorys.innerHTML = f.join(r);
            c + 6 >= d.length ? L.next.className = "next_d" : L.next.className = "next";
            c <= 0 ? L.prev.className = "pre_d" : L.prev.className = "pre"
        }, rendPage: function (b) {
            var c = b.page, d = b.cache[b.currentCategory], e = d.length / b.itemNumber, f = [];
            for (var g = 0; g < e; g += 1)c == g ? f.push(a.templet(h(q), {number: g, label: g + 1})) : f.push(a.templet(h(p), {number: g, label: g + 1}));
            L.page.innerHTML = f.join("")
        }, destroy: function () {
        }}, T = {trans: function () {
            C && C.destroy();
            C = a.kit.extra.upload({type: "common", form: L.form, imgName: H, app: 1001});
            a.custEvent.add(C, "uploadSucc", function (a, b) {
                R.handleSucc(b)
            });
            a.custEvent.add(C, "uploadError", function (a, b) {
                R.handleError(b)
            })
        }, upload: function () {
            H = L.fileBtn.value;
            if (a.core.str.trim(H) !== "") {
                R.rendLoad();
                T.trans()
            }
        }, loadPic: function (b) {
            L.picWrap.innerHTML = "";
            var c = b.url, d = L.close, e = a.C("img");
            b.value && (L.pName.innerHTML = b.value);
            E && (e.onload = function () {
                window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack("tblog_image_cut", "succeed_image_cut")
            });
            E = 0;
            e.src = c;
            f.stopBoxClose();
            G = F ? u : t;
            a.core.evt.custEvent.fire(J, "uploaded", {text: h(G), pid: b.pid});
            L.wrap.style.display = "";
            L.wrap.className = "layer_send_pic";
            L.wrap.style.width = "240px";
            L.inner.style.display = "none";
            L.uploaded.style.display = "";
            d.style.display = "none";
            L.picWrap.appendChild(e)
        }}, U = {};
        J = {};
        J.getBub = function () {
            return f
        };
        if (!a.isNode(d))throw"common.bubble.image need el as first parameter!";
        M = window.location.href;
        L = a.kit.dom.parseDOM(a.core.dom.builder(h(i)).list);
        x = L.outer;
        f = a.ui.bubble();
        R.initDom();
        if (e && e.pid) {
            var V = a.common.extra.imageURL(e.pid);
            T.loadPic({url: V, pid: e.pid})
        }
        Q();
        f.setContent(x);
        e.fail = function () {
            f.setLayoutPos(d, {offsetX: -24, offsetY: 5})
        };
        f.setAlignPos(d, e.refer, e);
        J.bubble = f;
        f.show();
        c.push(function () {
            f && f.hide()
        });
        return J
    }
});
STK.register("common.editor.widget.image", function (a) {
    return function (b) {
        a.log(b);
        var c = {}, d, e, f, g, h, i = function (a, b) {
            d.API.insertText(b.value);
            e.getBub().hide()
        }, j = function (b, c) {
            a.log("upload");
            var e = d.API.getWords();
            e.length == 0 && d.API.insertText(c.text);
            d.API.addExtraInfo(c.pid);
            g = !0
        }, k = function (a, b) {
            d.API.delWords(b.text);
            d.API.addExtraInfo("");
            clearInterval(h)
        }, l = function (b) {
            if (!g) {
                a.core.evt.preventDefault();
                var c = d.nodeList.textEl;
                if (typeof b == "string") {
                    e = a.common.bubble.image(d.nodeList[f], {pid: b, refer: c, arrowOffset: -5});
                    a.log("has pid");
                    h = setInterval(function () {
                        e.bubble.setLayout(d.nodeList[f], {offsetX: -29, offsetY: 5})
                    }, 200)
                } else e = a.common.bubble.image(d.nodeList[f], {refer: c, arrowOffset: -5});
                a.custEvent.add(e, "uploaded", j);
                a.log(2222);
                a.custEvent.add(e, "insert", i);
                a.custEvent.add(e, "deletePIC", k);
                a.custEvent.add(e, "hide", function () {
                    a.custEvent.remove(e, "hide", arguments.callee);
                    a.custEvent.remove(e, "uploaded", j);
                    a.custEvent.remove(e, "insert", i);
                    a.custEvent.remove(e, "deletePIC", k);
                    a.custEvent.remove(e, "changeType");
                    g = !1
                })
            }
        };
        c.init = function (b, c, e) {
            d = b;
            f = c;
            a.addEvent(b.nodeList[f], "click", l);
            e && e.pid && l(e.pid)
        };
        c.clear = function () {
        };
        c.show = function () {
        };
        c.hide = function () {
            e && e.getBub().hide()
        };
        c.resetBubble = function (a) {
            if (e) {
                var b = {fail: function () {
                    e.bubble.setLayout(a, {offsetX: -29, offsetY: 5})
                }, arrowOffset: -5};
                e.bubble.setAlignPos(a, d.nodeList.textEl, b)
            }
        };
        c.destroy = function () {
            d = null
        };
        return c
    }
});
STK.register("common.extra.shine", function (a) {
    var b = function (a) {
        return a.slice(0, a.length - 1).concat(a.concat([]).reverse())
    };
    return function (c, d) {
        var e = a.parseParam({start: "#fff", color: "#fbb", times: 2, step: 5, length: 4}, d), f = e.start.split(""), g = e.color.split(""), h = [];
        for (var i = 0; i < e.step; i += 1) {
            var j = f[0];
            for (var k = 1; k < e.length; k += 1) {
                var l = parseInt(f[k], 16), m = parseInt(g[k], 16);
                j += Math.floor(parseInt(l + (m - l) * i / e.step, 10)).toString(16)
            }
            h.push(j)
        }
        for (var i = 0; i < e.times; i += 1)h = b(h);
        var n = !1, o = a.timer.add(function () {
            if (!h.length)a.timer.remove(o); else {
                if (n) {
                    n = !1;
                    return
                }
                n = !0;
                c.style.backgroundColor = h.pop()
            }
        })
    }
});
STK.register("common.trans.validateCode", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("checkValidate", {url: "/aj/pincode/verified?_wv=5", method: "post"});
    return b
});
STK.register("common.dialog.validateCode", function (a) {
    var b = window.$LANG, c = a.kit.extra.language, d = "/aj/pincode/pin?_wv=5&type=rule&lang=" + $CONFIG.lang + "&ts=", e = {dialog_html: '<div class="layer_veriyfycode"><div class="v_image"><img height="50" width="450" class="yzm_img" /></div><p class="v_chng"><a href="#" onclick="return false;" class="yzm_change" action-type="yzm_change">#L{换另一组题目}</a></p><p class="v_ans_t">#L{请输入上面问题的答案}：</p><p class="v_ans_i"><input type="text" class="W_inputStp v_inp yzm_input ontext" action-type="yzm_input"/><div class="M_notice_del yzm_error" style="display:none;"><span class="icon_del"></span><span class="txt"></span></div></p><p class="v_btn"><a class="W_btn_d yzm_submit" href="#" action-type="yzm_submit"><span>#L{确定}</span></a><a class="W_btn_b yzm_cancel" href="#" action-type="yzm_cancel" action-data="value=frombtn"><span>#L{取消}</span></a></p></div>'}, f;
    return function () {
        if (f)return f;
        var b = {}, g = {}, h, i, j, k, l = function () {
            g.yzm_error.innerHTML = "";
            g.yzm_error.parentNode.style.display = "none"
        }, m = function (a) {
            g.yzm_error.innerHTML = a;
            g.yzm_error.parentNode.style.display = ""
        }, n = function () {
            a.kit.io.cssLoader("style/css/module/layer/layer_verifycode.css", "js_style_css_module_layer_layer_verifycode", function () {
                h || o();
                l();
                h.setTop();
                h.show();
                t.changesrc();
                h.setMiddle();
                g.input_text.value = "";
                a.hotKey.add(document.documentElement, ["esc"], t.closeDialog, {type: "keyup", disableInInput: !0})
            })
        }, o = function () {
            h = a.ui.dialog();
            h.setTitle(c("#L{请输入验证码}"));
            h.setContent(c(e.dialog_html));
            var b = h.getBox();
            s(b);
            u()
        }, p = a.common.trans.validateCode.getTrans("checkValidate", {onError: function () {
            m(c("#L{验证码错误}"));
            t.changesrc();
            j = !1;
            g.input_text.value = ""
        }, onFail: function () {
            m(c("#L{验证码错误}"));
            t.changesrc();
            g.input_text.value = "";
            j = !1
        }, onSuccess: function (b, c) {
            var d = b.data.retcode;
            l();
            g.input_text.value = "";
            h.hide();
            var e = i.requestAjax, f = a.kit.extra.merge(i.param, {retcode: d});
            e.request(f);
            j = !1
        }}), q = function () {
        }, r = function () {
        }, s = function (b) {
            g.vImg = a.core.dom.sizzle("img.yzm_img", b)[0];
            g.yzm_change = a.core.dom.sizzle("a.yzm_change", b)[0];
            g.yzm_submit = a.core.dom.sizzle("a.yzm_submit", b)[0];
            g.yzm_cancel = a.core.dom.sizzle("a.yzm_cancel", b)[0];
            g.input_text = a.core.dom.sizzle("input.yzm_input", b)[0];
            g.yzm_error = a.core.dom.sizzle("div.yzm_error span.txt", b)[0];
            g.close_icon = h.getDomList().close
        }, t = {enter: function () {
            a.fireEvent(g.yzm_submit, "click")
        }, changesrc: function () {
            var b = d + a.getUniqueKey();
            g.vImg.setAttribute("src", b);
            try {
                g.yzm_change.blur()
            } catch (c) {
            }
        }, checkValidateCode: function () {
            l();
            var b = a.core.str.trim(g.input_text.value);
            if (!b)m(c("#L{请输入验证码}")); else if (!j) {
                j = !0;
                p.request({secode: b, type: "rule"})
            }
            try {
                g.yzm_submit.blur()
            } catch (d) {
            }
        }, closeDialog: function (b) {
            typeof b == "object" && b.el && h.hide();
            typeof i == "object" && i.onRelease && typeof i.onRelease == "function" && i.onRelease();
            a.hotKey.remove(document.documentElement, ["esc"], t.closeDialog, {type: "keyup"});
            try {
                a.preventDefault()
            } catch (c) {
            }
        }, onFocus: function (b) {
            b = a.core.evt.getEvent();
            var c = b.target || b.srcElement, d = c.value;
            d || l()
        }}, u = function () {
            var b = h.getBox();
            k = a.core.evt.delegatedEvent(b);
            k.add("yzm_change", "click", function () {
                t.changesrc();
                a.preventDefault()
            });
            k.add("yzm_submit", "click", function () {
                t.checkValidateCode();
                a.preventDefault()
            });
            k.add("yzm_cancel", "click", t.closeDialog);
            a.core.evt.addEvent(g.close_icon, "click", t.closeDialog);
            a.core.evt.addEvent(g.input_text, "focus", t.onFocus);
            a.core.evt.addEvent(g.input_text, "blur", t.onFocus);
            a.hotKey.add(g.input_text, ["enter"], t.enter, {type: "keyup"})
        }, v = function () {
            if (h) {
                k.destroy();
                a.core.evt.removeEvent(g.close_icon, "click", t.closeDialog);
                a.core.evt.removeEvent(g.input_text, "focus", t.onFocus);
                a.core.evt.removeEvent(g.input_text, "blur", t.onFocus);
                h && h.destroy && h.destroy()
            }
            h = f = null
        }, w = function (a, b, c) {
            if (a.code == "100027") {
                i = c;
                n()
            } else if (a.code === "100000")try {
                var d = c.onSuccess;
                d && d(a, b)
            } catch (e) {
            } else try {
                if (a.code === "100002") {
                    window.location.href = a.data;
                    return
                }
                var d = c.onError;
                d && d(a, b)
            } catch (e) {
            }
        };
        r();
        r = null;
        b.destroy = v;
        b.validateIntercept = w;
        b.addUnloadEvent = function () {
            h && a.core.evt.addEvent(window, "unload", v)
        };
        f = b;
        return b
    }
});
STK.register("common.trans.group", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("add", {url: "/aj/f/group/add?_wv=5", method: "post"});
    c("modify", {url: "/aj/relation/rename?_wv=5", method: "post"});
    c("del", {url: "/aj/relation/delete?_wv=5", method: "post"});
    c("info", {url: "/aj/f/group/getgroupinfo?_wv=5", method: "get"});
    c("set", {url: "/aj3/attention/aj_group_update_v4.php", method: "post"});
    c("batchSet", {url: "/aj3/attention/aj_group_batchupdate_v4.php", method: "post"});
    c("list", {url: "/aj/f/group/list?_wv=5", method: "get"});
    c("order", {url: "/aj/f/group/order?_wv=5", method: "post"});
    c("listbygroup", {url: "/aj/f/attchoose?_wv=5", method: "post"});
    c("infolist", {url: "/aj/f/attfilterlist?_wv=5", method: "get"});
    c("orientGroup", {url: "/aj/f/group/groupmembers?_wv=5", method: "get"});
    c("recommendfollow", {url: "/aj3/recommend/aj_addrecommend.php", method: "post"});
    c("groupupdate", {url: "/aj/relation/groupupdate?_wv=5", method: "post"});
    c("unInterest", {url: "/aj/f/group/notinterest?_wv=5", method: "post"});
    c("editdesc", {url: "/aj/f/group/editdesc?_wv=5", method: "post"});
    c("update", {url: "/aj/f/group/update?_wv=5", method: "post"});
    c("followgroup", {url: "/aj/f/group/followgroup?_wv=5", method: "post"});
    c("getGroupDesc", {url: "/aj/f/group/getdesc?_wv=5", method: "get"});
    c("closebubble", {url: "/aj/bubble/closebubble?_wv=5", method: "get"});
    c("addgroupusers", {url: "/aj/f/group/addgroupusers?_wv=5", method: "post"});
    return b
});
STK.register("kit.extra.actionData", function (a) {
    return function (b) {
        return{set: function (c, d) {
            if (!!a.isNode(b)) {
                var e = a.queryToJson(b.getAttribute("action-data") || "") || {};
                e[c] = d;
                b.setAttribute("action-data", a.jsonToQuery(e))
            }
        }, del: function (c) {
            if (!!a.isNode(b)) {
                var d = a.queryToJson(b.getAttribute("action-data") || "") || {};
                delete d[c];
                b.setAttribute("action-data", a.jsonToQuery(d))
            }
        }, get: function (c) {
            if (!a.isNode(b))return"";
            var d = a.queryToJson(b.getAttribute("action-data") || "") || {};
            return d[c] || ""
        }}
    }
});
STK.register("kit.dom.outerHeight", function (a) {
    return function (b) {
        if (!a.core.dom.isNode(b))throw"Parameter must be an HTMLEelement!";
        return a.core.dom.getSize(b).height + (parseFloat(a.core.dom.getStyle(b, "marginTop")) || 0) + (parseFloat(a.core.dom.getStyle(b, "marginBottom")) || 0)
    }
});
STK.register("common.extra.keyboardCapture", function (a) {
    var b = {13: "enter", 27: "esc", 32: "space", 38: "up", 40: "down", 9: "tab"};
    return function (c, d) {
        d = d || {};
        var e = {}, f, g = {keydown: function (c) {
            d.stopScroll && a.stopEvent();
            var f, g;
            !!(f = c) && !!(g = f.keyCode) && b[g] && a.custEvent.fire(e, b[g])
        }}, h = {init: function () {
            h.pars();
            h.bind()
        }, pars: function () {
        }, bind: function () {
            for (var b in g)a.addEvent(c, b, g[b])
        }, getKey: function (a) {
            return b[a]
        }, destroy: function () {
            for (var b in g)a.removeEvent(c, b, g[b])
        }};
        h.init();
        e.getKey = h.getKey;
        e.destroy = h.destroy;
        return e
    }
});
STK.register("common.editor.plugin.publishTo", function (a) {
    var b = a.kit.extra.language, c = a.core.util.templet, d = a.core.util.easyTemplate, e;
    return function (c) {
        var d, f, g = c && c.editorWrapEl, h = c && c.textEl, i = {}, j = [], k, l = {}, m = c.isforward, n, o, p = function () {
            if (!a.isNode(g))throw"publishTo need a wrapper node to parseDOM"
        }, q = a.getUniqueKey(), r = function (a) {
            var b = [], c;
            b.push('<div style="position: absolute;display:none;z-index:29999;outline:none;" hideFocus="true" node-type="publishTo" class="layer_menu_list" tabindex="10">');
            b.push('<ul id="' + q + '">');
            b.push('<li><a title="#L{公开-你发表的微博可以被大家公开查看哦}" suda-data="key=tblog_edit_exposure&value=edit_public" href="javascript:void(0)" action-data="rank=0&text=#L{公开}&rankid=" action-type="publishTo"><i class="W_ico16 i_conn_public"></i>#L{公开}</a></li>');
            b.push(!m && $CONFIG.miyou === 1 ? '<li><a title="#L{好友圈-发表的微博只有你的好友才能看到}" href="javascript:void(0)" action-data="rank=6&text=#L{好友圈}&rankid=" action-type="publishTo"><i class="W_ico16 i_conn_close_friend"></i>#L{好友圈}</a></li>' : "");
            b.push('<li><a title="#L{仅自己可见-发表的微博只有自己才能看到}" suda-data="key=tblog_edit_exposure&value=edit_private" href="javascript:void(0)" action-data="rank=1&text=#L{仅自己可见}&rankid=" action-type="publishTo"><i class="W_ico16 i_conn_private"></i>#L{仅自己可见}</a></li>');
            b.push('<li class="line"></li>');
            b.push('<li><a action-type="more" href="javascript:void(0);"><i class="W_ico16 i_conn_list"></i>#L{分组可见}</a></li>');
            b.push("</ul></div>");
            return b.join("")
        }, s = function (a) {
            var b = [], c = a.length, d;
            c > 8 ? b.push('<ul class="scroll_bar" style="width:110px;" id="' + q + '">') : b.push('<ul class="scroll_bar" style="height:auto;width:110px;" id="' + q + '">');
            for (var e = 0; e < c; e++) {
                d = a[e];
                b.push('<li><a action-type="publishTo" action-data="rank=3&text=' + d.gname + "&rankid=" + d.gid + '" title="' + d.gname + '" href="javascript:void(0);" onclick="return false;"><i class="W_ico16 i_conn_list"></i>' + d.gname + "</a></li>")
            }
            b.push("</ul>");
            b.push('<ul><li class="line"></li>');
            b.push('<li class="opt"><a href="javascript:void(0)" onclick="return false;" action-type="back">#L{返回}</a></li>');
            b.push("</ul>");
            return b.join("")
        }, t = function () {
            f = a.kit.dom.parseDOM(a.builder(g).list);
            f.wrap || (f.wrap = g);
            var b = f.publishBtn || f.submit;
            o = b.innerHTML
        }, u = function () {
            d = function () {
                var c = {}, d, i, l, m, p = f.showPublishTo;
                i = d = p && p.getAttribute("action-data") && a.core.json.queryToJson(p.getAttribute("action-data")) || {rank: "all", rankid: ""};
                c.node = a.core.evt.delegatedEvent(g);
                var t = !1, u = {hotKeyChangeRank: function (c, f) {
                    var g = f.match(/\d+/);
                    if (g && g[0]) {
                        var h = parseInt(g[0], 10) - 1, i = [
                            {rank: 0, rankid: "", text: b("#L{公开}"), title: b("#L{公开-你发表的微博可以被大家公开查看哦}")},
                            {rank: 6, rankid: "", text: b("#L{好友圈}"), title: b("#L{好友圈-发表的微博只有你的好友才能看到}")},
                            {rank: 1, rankid: "", text: b("#L{仅自己可见}"), title: b("#L{仅自己可见-发表的微博只有自己才能看到}")}
                        ], j = function () {
                            a.foreach(k, function (a) {
                                a.rank = 3;
                                a.rankid = a.gid;
                                a.text = a.gname;
                                a.title = a.gname
                            });
                            i = i.concat(k);
                            var b = window.$CONFIG && window.$CONFIG.miyou == "1";
                            b || i.splice(1, 1);
                            if (i[h]) {
                                d = i[h];
                                z.btnContent(d.text);
                                z.btnTitle(d.title);
                                t = !1;
                                a.custEvent.fire(z, "changeRank", d)
                            }
                        }, k = function () {
                            if (e)return a.core.arr.copy(e);
                            A.group.request(function (b) {
                                k = a.core.arr.copy(b);
                                j()
                            });
                            return null
                        }();
                        k && j()
                    }
                }}, v = function () {
                    c.node.add("showPublishTo", "click", z.show)
                }, w = function () {
                    A.normal.bind();
                    A.group.bind();
                    x.bind()
                }, x = {keyboardManager: null, keyTypes: ["up", "down", "esc", "enter"], getIndex: function (b) {
                    var c = x.getList(), d = x.lastCur, e;
                    a.foreach(c, function (a, b) {
                        if (d === a) {
                            e = b;
                            return!1
                        }
                    });
                    b > 0 ? e++ : e--;
                    e >= c.length ? e = 0 : e < 0 && (e = c.length - 1);
                    return e
                }, up: function () {
                    var a = x.getIndex(-1), b = x.getList()[a];
                    x.setCur(b, a)
                }, down: function () {
                    var a = x.getIndex(1), b = x.getList()[a];
                    x.setCur(b, a)
                }, enter: function () {
                    var b = x.lastCur;
                    b.getAttribute("action-type") || (b = a.sizzle("[action-type]", b)[0]);
                    b && c.layer.fireDom(b, "click", null)
                }, esc: function () {
                    z.hide()
                }, bind: function () {
                    x.keyboardManager = a.common.extra.keyboardCapture(f.publishTo, {stopScroll: !0});
                    a.custEvent.define(x.keyboardManager, x.keyTypes);
                    for (var b = 0, c = x.keyTypes.length; b < c; b++) {
                        var d = x.keyTypes[b];
                        a.custEvent.add(x.keyboardManager, d, x[d])
                    }
                }, list: null, lastCur: null, focusPublishTo: function () {
                    f.publishTo.focus();
                    var a = this.getList(!0);
                    this.setCur(a[0], 0)
                }, setCur: function (b, c) {
                    this.lastCur && a.removeClassName(this.lastCur, "cur");
                    a.addClassName(b, "cur");
                    this.lastCur = b;
                    var d = a.E(q);
                    if (a.contains(d, b)) {
                        var e = a.kit.dom.outerHeight, f = c + 1, g = Math.max(e(b), e(a.sizzle("a", b)[0]));
                        f > 7 ? d.scrollTop = (f - 7) * g : d.scrollTop = 0
                    }
                }, getList: function (b) {
                    if (b || !this.list) {
                        var c = a.sizzle("li", f.publishTo), d = [];
                        a.foreach(c, function (b) {
                            a.getStyle(b, "display") != "none" && b.className != "line" && d.push(b)
                        });
                        this.list = d
                    }
                    return this.list
                }}, y = {setPos: function () {
                    var b = a.core.dom.getSize, c = b(f.showPublishTo).width - b(f.publishTo).width;
                    a.kit.dom.layoutPos(f.publishTo, f.showPublishTo, {offsetX: c + 2, offsetY: 2})
                }, init: function () {
                    c.layer = a.core.evt.delegatedEvent(f.publishTo);
                    c.closeFriend = a.core.evt.delegatedEvent(f.publishTo)
                }, setArrow: function (a) {
                    var b = f.showPublishTo;
                    !b || (a == "up" ? b.className = "W_arrow_turn" : a == "down" && (b.className = ""))
                }, show: function () {
                    a.foreach(a.sizzle("li", f.publishTo), function (b) {
                        var c = a.sizzle("a", b)[0];
                        if (c) {
                            var e = a.kit.extra.actionData(c), f = e.get("rank"), g = e.get("rankid");
                            d.rank != "3" ? d.rank == f && f != "" && a.setStyle(b, "display", "none") : d.rankid == g && a.setStyle(b, "display", "none")
                        }
                    });
                    y.setPos();
                    a.setStyle(f.publishTo, "display", "");
                    x.focusPublishTo();
                    y.setArrow("up");
                    if (!k) {
                        k = 1;
                        y.bindBodyEvt()
                    }
                    return!1
                }, hide: function () {
                    a.setStyle(f.publishTo, "display", "none");
                    t = !1;
                    if (k) {
                        k = 0;
                        y.removeBodyEvt()
                    }
                }, autoHide: function (b) {
                    b = a.core.evt.fixEvent(b);
                    f.showPublishTo !== b.target && !a.core.dom.contains(f.showPublishTo, b.target) && !a.core.dom.contains(f.publishTo, b.target) && z.hide()
                }, content: function (a) {
                    if (typeof a == "undefined")return f.publishTo.innerHTML;
                    f.publishTo.innerHTML = a
                }, bindBodyEvt: function () {
                    a.addEvent(document.body, "click", y.autoHide)
                }, removeBodyEvt: function () {
                    a.removeEvent(document.body, "click", y.autoHide)
                }}, z = {enable: function () {
                    f.showPublishTo.setAttribute("action-type", "showPublishTo")
                }, disable: function () {
                    f.showPublishTo.setAttribute("action-type", "")
                }, miYouStyle: function (a, c) {
                    var d = "2", e = $CONFIG.lang == "zh-cn" ? "" : "_CHT", g = f.publishBtn || f.submit;
                    d == c.rank ? g.innerHTML = b('<span class="btn_30px">#L{好友发布}</span>') : g.innerHTML = b('<span class="btn_30px">#L{发布}</span>')
                }, show: function () {
                    var b = function () {
                        a.custEvent.fire(z, "show");
                        t ? A.group.show() : A.normal.show()
                    };
                    if (f.publishTo) {
                        var c = a.getStyle(f.publishTo, "display");
                        if (c === "none")b(); else {
                            a.setStyle(f.publishTo, "display", "none");
                            t = !1;
                            y.setArrow("down")
                        }
                    } else b();
                    a.preventDefault()
                }, btnContent: function (a) {
                    a && (l.innerHTML = a)
                }, btnTitle: function (a) {
                    a && f.showPublishTo.setAttribute("title", a)
                }, hide: function () {
                    y.hide();
                    y.setArrow("down")
                }, toggle: function () {
                    t || (f.publishTo.style.display == "none" ? z.show() : z.hide())
                }, rank: function () {
                    return d
                }, reset: function () {
                    z.enable();
                    var a = f.publishBtn || f.submit;
                    a.innerHTML = o;
                    z.btnContent(m.content);
                    z.btnTitle(m.title);
                    d = null;
                    t = !1;
                    d = i
                }, destroy: function () {
                    try {
                        for (var b in c)c[b].destroy()
                    } catch (d) {
                    }
                    j.length && a.hotKey.remove(h, j, u.hotKeyChangeRank);
                    a.removeNode(f.publishTo);
                    a.custEvent.undefine(z);
                    if (x.keyboardManager) {
                        x.keyboardManager.destroy();
                        a.custEvent.undefine(x.keyboardManager, x.keyTypes)
                    }
                }, changeRank: function (b) {
                    b = b > 0 ? b - 1 : 0;
                    var c = a.sizzle('a[action-type="publishTo"]', f.publishTo)[b];
                    if (c) {
                        A.normal.changeRank({el: c, data: a.core.json.queryToJson(c.getAttribute("action-data") || "")});
                        var d = c.getAttribute("suda-data");
                        if (d) {
                            var e = d.match(/key=(.+?)&value=(.+)/);
                            e && e.length === 3 && window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack(e[1], e[2])
                        }
                    }
                }, getDomHeight: function () {
                    return f.publishTo.style.display == "none" ? {width: 0, heigth: 0} : a.core.dom.getSize(f.publishTo)
                }, bindAltKey: function () {
                    if (a.isNode(h)) {
                        var b = a.core.util.browser.OS === "macintosh";
                        if (b)for (var c = 1; c <= 9; c++)j.push("ctrl+" + c); else for (var c = 1; c <= 9; c++)j.push("alt+" + c);
                        a.hotKey.add(h, j, u.hotKeyChangeRank)
                    }
                }}, A = {normal: {bind: function () {
                    c.layer.add("publishTo", "click", A.normal.changeRank);
                    c.layer.add("more", "click", A.normal.more)
                }, getList: function () {
                    y.content(n)
                }, more: function () {
                    A.group.show();
                    t = !0;
                    a.core.evt.stopEvent()
                }, show: function () {
                    var a = function () {
                        if (!f.publishTo) {
                            B();
                            y.init();
                            w()
                        }
                        A.normal.getList();
                        y.show()
                    };
                    e ? a() : A.group.request(a)
                }, changeRank: function (b) {
                    try {
                        a.preventDefault(b.evt)
                    } catch (c) {
                    }
                    d = b.data;
                    var e = b.data.text;
                    z.btnContent(e);
                    z.btnTitle(b.el.getAttribute("title"));
                    d.rank == "group" ? A.group.show() : z.hide();
                    a.custEvent.fire(z, "changeRank", d)
                }}, group: {request: function (b) {
                    a.common.trans.group.getTrans("list", {onSuccess: function (a) {
                        var c = a.data.length;
                        for (var d = 0; d < c; d++)a.data[d].index = d + 1;
                        e = a.data;
                        b && b(e)
                    }}).request({})
                }, bind: function () {
                    c.layer.add("back", "click", A.group.back)
                }, getList: function () {
                    if (!A.group.cache) {
                        var a = b(s(e));
                        A.group.cache = a;
                        y.content(A.group.cache)
                    } else y.content(A.group.cache)
                }, show: function () {
                    A.group.getList();
                    y.show()
                }, back: function () {
                    var b = a.core.evt.fixEvent();
                    a.core.evt.stopEvent(b);
                    t = !1;
                    A.normal.show()
                }}}, B = function (c) {
                    var d = b(r(c));
                    f.publishTo = a.insertHTML(document.body, d, "beforeend");
                    n = f.publishTo.innerHTML
                }, C = function () {
                    if (!a.isNode(f.showPublishTo))return 0;
                    l = f.publishTotext;
                    m = {content: l.innerHTML, title: f.showPublishTo.getAttribute("title")};
                    v();
                    return 1
                }, D = C();
                a.custEvent.define(z, ["show", "hide", "changeRank"]);
                return D ? z : null
            }();
            d && d.bindAltKey && d.bindAltKey()
        }, v = function () {
            p();
            t();
            u()
        };
        v();
        return d
    }
});
STK.register("ui.confirm", function (a) {
    var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt2" node-type="textComplex"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl><div class="btn"><a href="javascript:void(0)" class="W_btn_d" node-type="OK"></a><a href="javascript:void(0)" class="W_btn_b" node-type="cancel"></a></div></div>', c = {success: "icon_succM", error: "icon_errorM", warn: "icon_warnM", "delete": "icon_delM", question: "icon_questionM"};
    return function (d, e) {
        var f, g, h, i, j, k, l, m = a.kit.extra.language, n = {ok: function () {
            h = !0;
            i = a.htmlToJson(j.textComplex);
            g.hide()
        }}, o = {init: function () {
            o.pars();
            o.build();
            o.bind()
        }, pars: function () {
            f = a.parseParam({title: m("#L{提示}"), icon: "question", textLarge: d, textComplex: "", textSmall: "", OK: a.funcEmpty, OKText: m("#L{确定}"), cancel: a.funcEmpty, cancelText: m("#L{取消}"), hideCallback: a.funcEmpty, id: ""}, e || {});
            f.icon = c[f.icon]
        }, build: function () {
            g = a.ui.dialog(f.id);
            g.setContent(m(b));
            g.setTitle(f.title);
            j = g.getDomList(!0);
            k = j.OK;
            l = j.cancel;
            j.icon.className = f.icon;
            j.textLarge.innerHTML = f.textLarge;
            f.textComplex ? j.textComplex.innerHTML = f.textComplex : j.textComplex.style.display = "none";
            f.textSmall ? j.textSmall.innerHTML = f.textSmall : j.textSmall.style.display = "none";
            k.innerHTML = "<span>" + f.OKText + "</span>";
            l.innerHTML = "<span>" + f.cancelText + "</span>";
            g.show().setMiddle();
            k.focus()
        }, bind: function () {
            a.addEvent(k, "click", n.ok);
            a.addEvent(l, "click", g.hide);
            a.custEvent.add(g, "hide", function () {
                a.custEvent.remove(g, "hide", arguments.callee);
                a.removeEvent(k, "click", n.ok);
                a.removeEvent(l, "click", g.hide);
                h ? f.OK(i) : f.cancel(i);
                f.hideCallback();
                g.destroy()
            })
        }};
        o.init();
        return g
    }
});
STK.register("kit.extra.reuse", function (a) {
    return function (b, c) {
        var d, e, f;
        d = a.parseParam({}, c);
        f = [];
        var g = function () {
            var a = b();
            f.push({store: a, used: !0});
            return a
        }, h = function (b) {
            a.foreach(f, function (a, c) {
                if (b === a.store) {
                    a.used = !0;
                    return!1
                }
            })
        }, i = function (b) {
            a.foreach(f, function (a, c) {
                if (b === a.store) {
                    a.used = !1;
                    return!1
                }
            })
        }, j = function () {
            for (var a = 0, b = f.length; a < b; a += 1)if (f[a].used === !1) {
                f[a].used = !0;
                return f[a].store
            }
            return g()
        };
        e = {};
        e.setUsed = h;
        e.setUnused = i;
        e.getOne = j;
        e.getLength = function () {
            return f.length
        };
        return e
    }
});
STK.register("lib.litter.vipConfirm", function (a) {
    var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt2" node-type="textComplex"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl><div class="btn"><a href="javascript:void(0)" class="W_btn_a" node-type="toBeVip"></a><a href="javascript:void(0)" class="W_btn_b" node-type="OK"></a></div></div>', c = {success: "icon_succM", error: "icon_errorM", warn: "icon_warnM", "delete": "icon_delM", question: "icon_questionM"}, d = a.kit.extra.language, e = null;
    return function (f, g) {
        var h, i, j, k, l, m, n, o;
        h = a.parseParam({title: d("#L{提示}"), icon: "question", textLarge: f, textComplex: "", textSmall: "", OK: a.funcEmpty, OKText: d("#L{确定}"), cancel: a.funcEmpty, cancelText: d("#L{取消}"), toBeVip: a.funcEmpty, toBeVipText: ""}, g);
        h.icon = c[h.icon];
        i = {};
        e || (e = a.kit.extra.reuse(function () {
            var c = a.ui.layer({template: b});
            return c
        }));
        j = e.getOne();
        o = j.getDomList();
        k = a.ui.dialog();
        k.setContent(j.getBox());
        o.icon.className = h.icon;
        o.textLarge.innerHTML = h.textLarge;
        o.textComplex.innerHTML = h.textComplex;
        o.textSmall.innerHTML = h.textSmall;
        o.OK.innerHTML = "<span>" + h.OKText + "</span>";
        o.toBeVip.innerHTML = '<span><em class="W_ico16 ico_member"></em>' + h.toBeVipText + "</span>";
        k.setTitle(h.title);
        var p = function () {
            l = !0;
            m = a.htmlToJson(o.textComplex);
            k.hide()
        }, q = function () {
            n = !0;
            k.hide()
        };
        a.addEvent(o.OK, "click", p);
        a.addEvent(o.toBeVip, "click", q);
        a.custEvent.add(k, "hide", function () {
            a.custEvent.remove(k, "hide", arguments.callee);
            a.removeEvent(o.OK, "click", p);
            a.removeEvent(o.toBeVip, "click", q);
            e.setUnused(j);
            l ? h.OK(m) : h.cancel(m);
            n && h.toBeVip()
        });
        k.show().setMiddle();
        i.cfm = j;
        i.dia = k;
        return i
    }
});
STK.register("common.dialog.authentication", function (a) {
    return function (b) {
        var c = a.kit.extra.language, d = a.core.util.browser;
        b = a.parseParam({src: "http://weibo.com/a/verify/realname?stage=home_verification", icon: "warn", isHold: !0, width: "380px", height: "240px", title: c("#L{帐号验证}")}, b || {});
        var e = {}, f, g, h = !1, i = "tblog_checkfailed_reform", j = {init: function () {
            f = a.ui.dialog();
            var c = [];
            c.push('<iframe id="account_authentication" name="account_authentication" node-type="frame" width="' + b.width + '" height="' + b.height + '" allowtransparency="true" scrolling="no" frameborder="0" src=""></iframe>');
            var d = a.builder(c.join(""));
            f.setTitle(b.title);
            f.setContent(d.box);
            var e = f.getDomList()
        }, show: function () {
            try {
                SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_box")
            } catch (c) {
            }
            h || a.kit.io.cssLoader("style/css/module/layer/layer_check_identity.css", "js_style_css_module_layer_check_identity", function () {
                h = !0
            });
            f.show().setMiddle();
            g = a.E("account_authentication");
            var d = decodeURIComponent(b.src) + "&rnd=";
            g.attachEvent ? g.attachEvent("onload", function () {
                g.height = b.height;
                f.setMiddle()
            }) : g.onload = function () {
                g.height = b.height;
                f.setMiddle()
            };
            g.src = d + a.core.util.getUniqueKey()
        }, destroy: function () {
        }, hook: function (a, b) {
            try {
                a == "100000" ? j.verifySucc() : j.verifyFail()
            } catch (c) {
            }
        }, verifySucc: function () {
            SUDA && SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_success");
            f.hide();
            var b = {title: c("#L{提示}"), icon: "success", OK: function () {
                SUDA && SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_play");
                history.go(0)
            }, OKText: c("#L{进入首页}"), msg: c("#L{恭喜，您的身份已验证成功，马上进入新浪微博。}")}, d = a.ui.alert(b.msg, b);
            a.custEvent.add(d, "hide", function () {
                history.go(0)
            })
        }, verifyFail: function () {
            SUDA && SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_twotimes");
            f.hide();
            var b = {title: c("#L{提示}"), icon: "warn", OK: function () {
                SUDA.uaTrack && SUDA.uaTrack(i, "checkfailed_triple");
                j.show()
            }, OKText: c("#L{再次验证}"), msg: c("#L{抱歉，您的身份信息不准确，请再次验证。<br/>}") + '<a class="S_spetxt" suda-data="key=tblog_checkfailed_reform&value=checkfailed_havealook" href="http://weibo.com">' + c("#L{您也可以先体验微博，随后再验证身份信息>>}") + "</a>"}, d = a.ui.alert(b.msg, b);
            a.custEvent.add(d, "hide", function () {
                history.go(0)
            })
        }};
        j.init();
        e.destroy = j.destory;
        e.show = j.show;
        window.App = window.App || {};
        window.App.checkRealName = j.hook;
        return e
    }
});
STK.register("common.dialog.memberDialog", function (a) {
    var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt1" node-type="textComplex"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl><div class="btn"><a class="W_btn_b" node-type="OK"></a><a class="W_btn_d" node-type="cancel"></a><a href="http://vip.weibo.com/paycenter?pageid=byebank" class="W_btn_v" node-type="member"><span><em class="W_ico16 ico_member"></em>#L{立即开通会员}</span></a></div></div>', c = {success: "icon_succM", error: "icon_errorM", warn: "icon_warnM", "delete": "icon_delM", question: "icon_questionM"}, d = a.kit.extra.language, e = function (e, f) {
        var g, h, i, j, k, l;
        g = a.parseParam({title: d("#L{提示}"), icon: "warn", textLarge: e, textComplex: "", textSmall: "", OK: a.funcEmpty, OKText: d("#L{确定}"), cancel: a.funcEmpty, cancelText: d("#L{确认}")}, f);
        g.icon = c[g.icon];
        h = {};
        var i = a.ui.layer({template: d(b)});
        j = a.ui.dialog();
        j.setContent(i.getBox());
        var m = i.getDomList();
        m.icon.className = g.icon;
        m.textLarge.innerHTML = g.textLarge;
        m.textComplex.innerHTML = g.textComplex;
        m.textSmall.innerHTML = g.textSmall;
        m.OK.innerHTML = "<span>" + g.OKText + "</span>";
        m.cancel.innerHTML = "<span>" + g.cancelText + "</span>";
        j.setTitle(g.title);
        var n = function () {
            k = !0;
            l = a.htmlToJson(m.textComplex);
            j.hide()
        };
        a.addEvent(m.OK, "click", n);
        a.addEvent(m.cancel, "click", j.hide);
        a.custEvent.add(j, "hide", function () {
            a.custEvent.remove(j, "hide", arguments.callee);
            a.removeEvent(m.OK, "click", n);
            a.removeEvent(m.cancel, "click", j.hide);
            k ? g.OK(l) : g.cancel(l)
        });
        j.show().setMiddle();
        h.cfm = i;
        h.dia = j;
        return h
    };
    return function (b) {
        b = a.parseParam({type: "follow", errortype: "1"}, b);
        var c, f, g = {textLarge: d("#L{您已达到悄悄关注上限！}"), textComplex: d('#L{开通}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>，#L{悄悄关注上限立即提高}'), textSmall: d('#L{可}<a href="http://vip.weibo.com/paycenter?pageid=byebank" class="S_link2">#L{开通会员}</a>#L{或先将悄悄关注减少至10人以下，再添加}'), OKText: d("#L{管理我的悄悄关注}"), OK: function () {
            a.preventDefault();
            window.location.href = "/" + $CONFIG.uid + "/whisper"
        }}, h = {textLarge: d("#L{您已达到关注上限！}"), textComplex: d('#L{开通}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>，#L{关注上限立即提高}'), textSmall: d('#L{可}<a href="http://vip.weibo.com/paycenter?pageid=byebank" class="S_link2">#L{开通会员}</a>#L{或先将关注减少至2000人以下，再添加}'), OKText: d("#L{管理我的关注}"), OK: function () {
            a.preventDefault();
            window.location.href = "/" + $CONFIG.uid + "/follow"
        }};
        if (b.type == "quiet") {
            switch (parseInt(b.errortype, 10)) {
                case 2:
                    g.textLarge = d("#L{您当前已达会员等级悄悄关注上限啦！}");
                    g.textSmall = "";
                    g.textComplex = d('<a href="http://vip.weibo.com/privilege" class="S_link2">#L{了解更多会员特权信息»}</a>');
                    break;
                case 1:
                    g.textLarge = d("#L{您已达到悄悄关注上限！}");
                    g.textSmall = "";
                    g.textComplex = d('#L{开通}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>，#L{悄悄关注上限立即提高}');
                    break;
                case 3:
                    g.textLarge = d("#L{您已达到悄悄关注上限！}");
                    g.textComplex = d('#L{开通}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>，#L{悄悄关注上限立即提高}');
                    g.textSmall = d('#L{可}<a href="http://vip.weibo.com/paycenter">#L{开通会员}</a>#L{或将悄悄关注减少至10人以下，再添加}')
            }
            c = g
        } else {
            switch (parseInt(b.errortype, 10)) {
                case 2:
                    h.textLarge = d("#L{您当前已达会员等级关注上限啦！}");
                    h.textSmall = "";
                    h.textComplex = d('<a href="http://vip.weibo.com/privilege" class="S_link2">#L{了解更多会员特权信息»}</a>');
                    break;
                case 1:
                    h.textLarge = d("#L{您已达到关注上限！}");
                    h.textSmall = "";
                    h.textComplex = d('#L{开通}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>，#L{关注上限立即提高}');
                    break;
                case 3:
                    h.textLarge = d("#L{您已达到关注上限！}");
                    h.textComplex = d('#L{开通}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>，#L{关注上限立即提高}');
                    h.textSmall = d('#L{可}<a href="http://vip.weibo.com/paycenter">#L{开通会员}</a>#L{或将关注减少至2000人以下，再添加}')
            }
            c = h
        }
        f = e("", c);
        parseInt(b.errortype, 10) == 2 ? f.cfm.getDomList().member.style.display = "none" : f.cfm.getDomList().cancel.style.display = "none"
    }
});
STK.register("common.layer.ioError", function (a) {
    var b = a.kit.extra.language, c;
    return function (d, e, f) {
        var g = {}, h, i, j = function () {
        }, k = {title: b("#L{发布失败}"), warnMsg: b("#L{该组成员已达上限，不能对该组发布定向微博。}"), OKText: b("#L{知道了}"), textComplex: b('#L{微博会员可以提高分组上限} <a href="http://vip.weibo.com/prividesc?priv=1110">#L{了解更多}»</a>'), vip: b("#L{开通会员}")}, l = {init: function () {
            l.data()
        }, data: function () {
            i = a.parseParam({auto: !0, call: j, ok: j, cancel: j}, f);
            h = a.parseParam({location: "", icon: "warn", title: b("#L{提示}"), OKText: b("#L{确 定}"), cancelText: b("#L{取 消}"), suda: ""}, e.data);
            h.msg = e.msg || b("#L{系统繁忙}");
            h.OK = function () {
                a.preventDefault();
                var b = a.queryToJson(h.suda || "");
                b = b.ok || {};
                SUDA.uaTrack && b.key && SUDA.uaTrack(b.key, b.value);
                i.ok();
                h.location && (window.location.href = h.location)
            };
            h.cancel = function () {
                a.preventDefault();
                var b = a.queryToJson(h.suda || "");
                b = b.cancel || {};
                SUDA.uaTrack && b.key && SUDA.uaTrack(b.key, b.value);
                i.cancel()
            }
        }, run: function () {
            var a = m[e.code] || m[100001];
            return a() || i.call(h, e)
        }, destroy: function () {
            c && c.destroy()
        }}, m = {100001: function () {
            a.ui.alert(h.msg, h)
        }, 100002: function () {
            window.location.reload()
        }, 100003: function () {
            a.ui.confirm(h.msg, h)
        }, 100004: function () {
            c || (c = a.common.dialog.authentication());
            c.show()
        }, 100005: function () {
            h.type = e.data && (e.data.type ? e.data.type : "follow");
            h.errortype = e.data && (e.data.errortype || "1");
            return a.common.dialog.memberDialog(h || {})
        }, 100006: function () {
            a.ui.alert(k.warnMsg, {title: k.title, OKText: k.OKText})
        }, 100007: function () {
            a.lib.litter.vipConfirm(k.warnMsg, {icon: "warn", title: k.title, toBeVipText: k.vip, textComplex: k.textComplex, OKText: k.OKText, toBeVip: function () {
                a.preventDefault();
                window.location.href = "http://vip.weibo.com/paycenter?refer=publish"
            }})
        }};
        l.init();
        g.getdata = function () {
            return h
        };
        g.getAction = function (a) {
            return a ? m[a] : m
        };
        g.getCode = function () {
            return e.code || ""
        };
        g.run = l.run;
        i.auto && l.run();
        return g
    }
});
STK.register("common.dialog.publish", function (a) {
    var b = '<#et temp data><div class="detail" node-type="outer"><div class="send_weibo clearfix" node-type="wrap"><div class="title_area clearfix"><div class="title" node-type="info"></div><div class="num S_txt2" node-type="num"><span>140</span>#L{字}</div><div class="key S_textb"  ></div></div><div class="input clicked" style="width:460px;"><textarea name="" class="input_detail" node-type="textEl"></textarea><div class="send_succpic" style="display:none" node-type="successTip"><span class="icon_succB"></span><span class="txt">#L{发布成功}</span></div><span class="arrow"></span></div><div class="func_area clearfix"><div class="func"><div class="limits"><a href="javascript:void(0);" node-type="showPublishTo" action-type="showPublishTo" action-data="rank=0"><span node-type="publishTotext" class="W_autocut">#L{公开}</span><span class="W_arrow"><em node-type="publish_to_arrow">◆</em></span></a></div><a href="javascript:void(0)" class="send_btn W_btn_v W_btn_v_disable" diss-data="module=shissue" node-type="submit"><span class="btn_30px">#L{发布}</span></a></div><div class="kind S_txt3" node-type="widget"><span class="kind_detail"><#if (data.smileyBtn)><a href="javascript:void(0)" class="W_ico16 icon_sw_face" node-type="smileyBtn">#L{表情}</a></#if><#if (data.picBtn)><a href="javascript:void(0)" class="W_ico16 icon_sw_img" node-type="picBtn">#L{图片}</a></#if></span></div></div></div></div>', c = {title: "#L{有什么新鲜事想告诉大家}"}, d = a.kit.extra.language, e = {enable: "send_btn W_btn_v", disable: "send_btn W_btn_v W_btn_v_disable"}, f = {limitNum: 140, extendText: '<a target="_blank" class="S_txt2" href="http://weibo.com/z/guize/gongyue.html">#L{发言请遵守“七条底线”}</a>，'};
    return function (g) {
        var h = {}, i, j, k, l, m, n, o, p, q, r, s;
        i = a.parseParam({templete: d(b), appkey: "", styleId: "1", smileyBtn: !0, picBtn: !0, pid: ""}, g);
        p = a.custEvent.define(h, "publish");
        a.custEvent.define(h, "hide");
        var t = function () {
            var b = m.textEl;
            if (j)k === "error" && a.common.extra.shine(b); else {
                j = !0;
                k = "loading";
                var c = a.common.getDiss(u(), m.submit);
                c.pub_type = "dialog";
                s && s.disable();
                o.request(c)
            }
        }, u = function () {
            var b = n.API.getWords();
            q && b.indexOf(q) === -1 && (b = b + q);
            var c = {};
            c.appkey = i.appkey;
            c.style_type = i.styleId;
            c.text = b;
            var d = n.API.getExtra();
            if (d)if (d.indexOf("=") < 0)c.pic_id = n.API.getExtra() || ""; else {
                var e = d, f = a.core.json.queryToJson(e);
                for (var g in f)c[g] = f[g];
                a.log(c)
            }
            if (s && s.rank) {
                var h = s.rank();
                c.rank = h.rank;
                c.rankid = h.rankid
            }
            return c
        }, v = function (a) {
            if ((a.keyCode === 13 || a.keyCode === 10) && a.ctrlKey) {
                t();
                n.API.blur()
            }
        }, w = function (a, b) {
            var c = b.isOver;
            if (!c) {
                j = !1;
                k = "";
                m.submit.className = e.enable;
                m.num.innerHTML = (f.extendText ? d(f.extendText) : "") + d("#L{还可以输入%s字}", "<span>" + (140 - b.count) + "</span>")
            } else {
                j = !0;
                k = "error";
                m.submit.className = e.disable
            }
        }, x = function (b, c) {
            k = "";
            m.successTip.style.display = "";
            m.textEl.value = "";
            setTimeout(function () {
                j = !1;
                m.successTip.style.display = "none";
                l && l.hide();
                m.submit && (m.submit.className = e.enable)
            }, 2e3);
            a.custEvent.fire(p, "publish", [b.data, c]);
            a.common.channel.feed.fire("publish", [b.data, c]);
            m.submit.className = e.disable;
            n.API.reset();
            s && s.reset && s.reset()
        }, y = function (b, c) {
            j = !1;
            k = "";
            b.msg = b.msg || d("操作失败");
            a.common.layer.ioError(b.code, b);
            m.submit && (m.submit.className = e.enable);
            s && s.enable()
        }, z = function (a) {
            m.textEl.value = "";
            n.API.insertText(a.content);
            m.info.innerHTML = a.info;
            a.appkey && (i.appkey = a.appkey);
            if (a.content) {
                j = !1;
                k = "";
                m.submit.className = e.enable
            } else {
                j = !0;
                k = "error";
                m.submit.className = e.disable
            }
        }, A = function () {
            j = !1
        }, B = function () {
            n = a.common.editor.base(a.core.util.easyTemplate(a.kit.extra.language(i.templete), i).toString(), f);
            i.smileyBtn && n.widget(a.common.editor.widget.face({useAlign: !0}), "smileyBtn");
            i.picBtn && n.widget(a.common.editor.widget.image(), "picBtn");
            m = n.nodeList;
            s = a.common.editor.plugin.publishTo({editorWrapEl: m.wrap, textEl: m.textEl});
            r = a.common.dialog.validateCode()
        }, C = function () {
            a.addEvent(m.submit, "click", t);
            a.addEvent(m.textEl, "keypress", v)
        }, D = function () {
            s && s.miYouStyle.apply(null, arguments)
        }, E = function () {
            a.custEvent.add(n, "textNum", w);
            s && a.custEvent.add(s, "changeRank", D)
        }, F = function () {
            o = a.common.trans.feed.getTrans("publish", {onComplete: function (a, b) {
                var c = {onSuccess: x, onError: y, requestAjax: o, param: u(), onRelease: function () {
                    j = !1;
                    k = "";
                    m.submit && (m.submit.className = e.enable);
                    s && s.enable()
                }};
                r.validateIntercept(a, b, c)
            }, onFail: y, onTimeout: y})
        }, G = function () {
            B();
            C();
            E();
            F()
        }, H = function (b) {
            n || G();
            var e = a.parseParam({appkey: "", content: "", defaultValue: "", info: "", title: d(c.title)}, b);
            l = a.ui.dialog();
            l.setTitle(e.title);
            l.appendChild(m.outer);
            l.show();
            l.setMiddle();
            z(e);
            n.API.focus();
            a.custEvent.add(l, "hide", function () {
                a.custEvent.remove(l, "hide", arguments.callee);
                n.closeWidget();
                A();
                l = null;
                a.custEvent.fire(p, "hide")
            });
            q = e.defaultValue
        }, I = function () {
            l.hide()
        }, J = function (a) {
            n.API.addExtraInfo(a)
        }, K = function (a) {
            n.API.disableEditor(a)
        }, L = function () {
            l && l.hide();
            m && m.submit && a.removeEvent(m.submit, "click", t);
            m && m.textEl && a.removeEvent(m.textEl, "keypress", v);
            a.custEvent.remove(n, "textNum", w);
            s && a.custEvent.remove(s, "changeRank", D);
            a.custEvent.undefine(p, "publish");
            r && r.destroy && r.destroy();
            s && s.destroy && s.destroy();
            m = null;
            o = null;
            j = !1;
            for (var b in h)delete h[b];
            h = null
        };
        h.addExtraInfo = J;
        h.disableEditor = K;
        h.show = H;
        h.hide = I;
        h.destroy = L;
        return h
    }
});
STK.register("common.guide.util.tipLayer", function (a) {
    var b = {}, c = a.core.dom.getSize, d = 1;
    b.getLayerPosition = function (b, d, e, f) {
        var g = null;
        if (b.style.display == "none") {
            b.style.visibility = "hidden";
            b.style.display = "";
            g = a.position(b);
            b.style.display = "none";
            b.style.visibility = "visible"
        } else g = a.position(b);
        var h = c(b), i = c(d), j = f ? c(f) : {width: 0, height: 0};
        e = e || 1;
        var k, l, m = {};
        switch (e) {
            case 1:
            case"top":
                k = g.l + h.width / 2 - i.width / 2;
                l = g.t - i.height;
                m.className = "arrow_down";
                m.left = (i.width - j.width) / 2 + "px";
                m.top = "";
                break;
            case 2:
            case"right":
                k = g.l + h.width;
                l = g.t - i.height / 2;
                m.className = "arrow_left";
                m.left = "";
                m.top = (i.height - j.height) / 2 + "px";
                break;
            case 3:
            case"bottom":
                k = g.l + h.width / 2 - i.width / 2;
                l = g.t + h.height;
                m.className = "arrow_up";
                m.left = (i.width - j.width) / 2 + "px";
                m.top = "";
                break;
            case 4:
            case"left":
                k = g.l - i.width;
                l = g.t - i.height / 2;
                m.className = "arrow_right";
                m.left = "";
                m.top = (i.height - j.height) / 2 + "px"
        }
        return{left: k, top: l, arrow: m}
    };
    b.setPosition = function (a, b) {
        var c = [], d = [], e;
        for (var f in b)if (f == "arrow")for (var g in b[f]) {
            e = b[f][g];
            typeof e == "number" && (e += "px");
            e && d.push(g + " : " + e)
        } else {
            e = b[f];
            typeof e == "number" && (e += "px");
            e && c.push(f + " : " + e)
        }
        a.arrow.className = b.arrow.className;
        a.arrow.style.cssText = d.join(";");
        a.layer.style.cssText = c.join(";")
    };
    b.setPositionByOpts = function (a, c) {
        var d = b.getLayerPosition(a.target, a.layer, a.pos, a.arrow);
        for (var e in c)d[e] += c[e];
        b.setPosition(a, d)
    };
    return function () {
        return b
    }
});
STK.register("common.editor.plugin.sucTip", function (a) {
    return function (b, c) {
        var d = b.nodeList, e = {}, f = a.kit.extra.language, g = function (c) {
            var c = c || {}, e = a.core.obj.parseParam({className: "send_succpic", innerHTML: f('<p class="icon_succB"></p><p class="txt">#L{发布成功}</p>'), delay: 2}, c);
            d.successTip.className = e.className;
            d.successTip.innerHTML = e.innerHTML;
            a.core.evt.custEvent.fire(b, "setSucTipDelay", e.delay)
        }, h = function (a) {
            if (!a || !a.getTime)a = new Date;
            var b = {year: a.getFullYear(), mouth: a.getMonth() + 1, date: a.getDate(), hours: a.getHours(), minutes: a.getMinutes(), seconds: a.getSeconds()};
            return b
        }, i = function (a, b) {
            var c = a.length;
            for (var d = 0; d < c; d++)if (b.indexOf(a[d]) != -1)return!0;
            return!1
        }, j = {theEnd: function (a, b) {
            var c = h(b.time);
            if (c.year == 2013 && c.mouth == 11 && c.date >= 20 || c.year == 2013 && c.mouth == 12 && c.date <= 16) {
                var d = ["爱", "公益", "微公益", "爱心", "温暖", "捐款", "捐助", "捐献", "感恩", "帮助", "感谢", "正能量", "感动", "感恩季", "助学", "社会", "关注", "关心", "贫困", "希望", "山区", "孩子", "梦想", "留守", "救助", "拯救", "希望小学", "求助", "帮忙"];
                i(d, b.text) ? g({className: "send_success_travela", innerHTML: '<a suda-data="key=tblog_home_edit&value=click_tips" target="_blank" href="http://gongyi2013.weibo.com/?from=pub"></a>', delay: 3}) : g()
            } else g({})
        }}, k = function () {
            a.core.evt.custEvent.define(b, "theEnd");
            a.core.evt.custEvent.add(b, "theEnd", j.theEnd)
        }, l = function () {
            k()
        };
        e.init = l;
        return e
    }
});
STK.register("kit.extra.mUpload", function (a) {
    var b = $CONFIG.jsPath + "home/static/swf/", c = "http://picupload.service.weibo.com/interface/pic_upload.php?app=miniblog&data=1", d, e = "";
    $CONFIG && $CONFIG.uid && (e = $CONFIG.uid || "");
    var f = '<form node-type="form" action-type="form" id="pic_upload" name="pic_upload" target="upload_target" enctype="multipart/form-data" method="POST" action=""><input type="file" hidefoucs="true" node-type="fileBtn" name="pic1"/></form>', g = {};
    return function (h, i) {
        var j = {}, k = {}, l, m, n, o = a.kit.extra.getFlashVersion() < 10 ? !0 : !1, p = function () {
            var d = a.core.dom.getSize(h);
            k = a.core.obj.parseParam({service: c, swf: b + "MultiFilesUpload.swf" + "?version=" + $CONFIG.version, exp_swf: b + "img/expressInstall.swf?version=" + $CONFIG.version, h: d.height, w: d.width, version: "10.0.0", type: "*.png;*.jpg;*.gif;*.jpeg;", size: 20971520, number: 9, globalFun: "fcb_" + a.getUniqueKey(), callback: t, init: function () {
            }, uploaded: function () {
            }, uploading: function () {
            }, error: function () {
            }, extra: function () {
            }}, i);
            k.id = "swf_upbtn_" + a.getUniqueKey();
            k.channel = k.id + "_channel"
        }, q = {uploading: function (a) {
            k.uploading({data: [
                {fid: a.fid, name: a.name}
            ]})
        }, uploaded: function (a) {
            k.uploaded({data: {pid: a.pid}, fid: a.fid})
        }, error: function (a) {
            var b = "defaultErr", c = "";
            if (a.code == 9) {
                b = "singleError";
                c = "A20001"
            }
            k.error({type: b, fid: a.fid, data: {sourceData: {code: c}}})
        }}, r = function () {
            var b = a.getUniqueKey(), c = m.value;
            g[b] = a.kit.extra.upload({type: "common", form: n, imgName: c, app: 1001});
            q.uploading({fid: b, name: c});
            m.value = "";
            a.custEvent.add(g[b], "uploadSucc", function (a, c) {
                var d = c.pid;
                q.uploaded({fid: b, pid: c.pid})
            });
            a.custEvent.add(g[b], "uploadError", function (a, c) {
                q.error({code: c.code, fid: b})
            })
        }, s = function () {
            var b = a.C("div"), c = a.C("div");
            c.setAttribute("id", k.id);
            var d = "position:absolute;left:0;top:0;display:block;overflow:hidden;background-color:#000;filter:alpha(opacity=0);-moz-opacity:0;opacity:0;";
            d += "width:" + k.w + "px;" + "height:" + k.h + "px;";
            b.style.cssText = d;
            h.appendChild(b);
            h.style.position = "relative";
            var g = {swfid: k.id, uploadAPIs: encodeURIComponent(k.service), maxFileSize: k.size, maxFileNum: k.number, jsHandler: "STK." + k.globalFun, channel: k.channel, areaInfo: "0-0-" + k.w + "-" + k.h, fExt: k.type, fExtDec: "选择图片:*.jpg, *.jpeg, *.gif, *.png", uid: e}, i = {menu: "false", scale: "noScale", allowFullscreen: "false", allowScriptAccess: "always", bgcolor: "#FFFFFF", wmode: "opaque"};
            if (o) {
                var j = a.builder(f).list;
                m = j.fileBtn[0];
                n = j.form[0];
                m.style.cssText = "width:" + k.w + "px;" + "height:" + k.h + "px;";
                b.appendChild(n)
            } else {
                b.appendChild(c);
                a.kit.extra.swfobject.embedSWF(k.swf, k.id, k.w, k.h, k.version, k.exp_swf, g, i, k.id, u)
            }
        }, t = function (a, b, c) {
            switch (c.type) {
                case"flashInit":
                    k.init(c);
                    break;
                case"uploading":
                    k.uploading(c);
                    break;
                case"singleSuccess":
                    k.uploaded(c);
                    break;
                case"fileNumErr":
                    return k.error(c);
                case"singleError":
                    k.error(c);
                    break;
                case"fileSizeErr":
                    k.error(c);
                    break;
                default:
                    k.extra(c)
            }
        }, u = function (a) {
            l = a.ref
        }, v = function () {
            o ? a.core.evt.addEvent(m, "change", r) : STK[k.globalFun] = t
        }, w = function () {
            a.kit.extra.watermark(function (b) {
                var e = b, f = "weibo.com/", g = window.$CONFIG, h = e.nickname != "0" || e.logo != "0" || e.domain != "0", i = {marks: h ? 1 : 0};
                d = a.kit.extra.merge({url: e.domain == "1" ? f + (g && g.watermark || g.domain) : 0, markpos: e.position || "", logo: e.logo || "", nick: e.nickname == "1" ? encodeURIComponent("@" + (g && g.nick)) : 0}, i);
                c += "&" + a.jsonToQuery(d);
                p();
                s();
                v()
            })
        };
        w();
        var x = function () {
            return k.id
        }, y = function () {
            return l
        }, z = function (a) {
            if (o) {
                g[a] && g[a].abort();
                m.value = ""
            } else try {
                mUpload && mUpload.getswf && mUpload.getswf() && mUpload.getswf().removeFileById && mUpload.getswf().removeFileById(a)
            } catch (b) {
            }
        }, A = function () {
            delete STK[k.globalFun]
        };
        j.getId = x;
        j.destroy = A;
        j.getswf = y;
        j.removeFile = z;
        return j
    }
});
STK.register("common.bubble.image.preview", function (a) {
    var b = $CONFIG.imgPath, c = '<div class="" node-type="box"><div class="title">本地上传</div>\t<div class="layer_pic_list clearfix">\t\t<div class="pic_list_count" node-type="picsInfo"></div>\t\t<ul class="pic_list clearfix" node-type="preList">\t\t\t<li class="add" node-type="uploadBtn"><a href="javascript:;" title="">+</a></li>\t\t</ul>\t</div></div>', d = '<#et image data><img src="${data.src}" alt=""><a action-type="editImg" href="javascript:;" class="ico_editpic"></a><a href="javascript:;" action-type="deleteImg" class="ico_delpic"></a></#et>', e = '<#et loading data><span class="txt S_txt1"><img class="picloading" src="' + b + 'style/images/common/loading.gif">${data.filename}</span>' + '<a href="javascript:;" action-type="deleteImg"  title="删除" class="ico_delpic"></a>' + "</#et>", f = '<#et image data><li class="loading" node-type="${data.type}">' + e + "</li>" + "</#et>", g = '<#et err data><span class="txt S_txt1">${data.text}</span><span class="txt2 S_txt1">${data.filename}</span><a href="javascript:;" title="删除" action-type="deleteImg" class="ico_delpic"></a></#et>', h = '<#et retry data><span class="txt S_txt1">上传失败<a class="W_btn_b" href="javascript:;" action-type="retryLoad" action-data="fid=${data.fid}"><span>重传</span></a></span><a href="javascript:;" title="删除" action-type="deleteImg" class="ico_delpic"></a></#et>';
    return function (b, i) {
        var j = a.parseParam({templete: c}, i), k = 9, l = {}, m, n, o, p, q, r = {}, s = a.kit.extra.language, t = a.common.flash.uploadLog(), u = {init: function () {
            x.setNumInfo()
        }, uploading: function (c, d) {
            a.custEvent.fire(l, "loading");
            setTimeout(function () {
                o.setAlignPos(b, i.refer, i)
            }, 200);
            o.show();
            o.stopBoxClose();
            var e = c.data, g = {}, h = e.length;
            for (var j = 0; j < h; j++) {
                var k = x.getFileName(e[j].name);
                r[e[j].fid] = {name: k};
                g[e[j].fid] = {name: k}
            }
            var m = "";
            for (var p in g)m += a.core.util.easyTemplate(f, {type: p, filename: g[p].name || ""});
            var q = a.builder(m), s = a.kit.dom.parseDOM(q.list);
            for (var j in s)r[j].imgnode = s[j];
            a.insertBefore(q.box, n.uploadBtn);
            x.setNumInfo();
            v()
        }, uploaded: function (b) {
            var c = a.common.extra.imageURL(b.data.pid, {size: "square"});
            r[b.fid].pid = b.data.pid;
            var e = a.C("img");
            e.onload = function () {
                e.onload = null;
                if (r[b.fid]) {
                    r[b.fid].imgnode.innerHTML = a.core.util.easyTemplate(d, {src: c});
                    r[b.fid].imgnode.className = "pic"
                }
            };
            e.src = c;
            r[b.fid].imgnode.setAttribute("action-data", b.data.pid);
            x.setExtra()
        }, error: function (b) {
            if (b.type == "singleError") {
                b.data.sourceData && b.data.sourceData.code == "A20001" ? r[b.fid].imgnode.innerHTML = a.core.util.easyTemplate(g, {text: s("#L{文件格式错误}"), filename: r[b.fid].name || ""}) : r[b.fid].imgnode.innerHTML = a.core.util.easyTemplate(h, {fid: b.fid});
                r[b.fid].imgnode.className = "opt";
                r[b.fid].err = 1;
                x.setNumInfo()
            }
            if (b.type == "fileNumErr")return x.getReFileNum();
            b.type == "fileSizeErr" && setTimeout(function () {
                var c = b.data.sizeErrAry.length;
                for (var d = 0; d < c; d++) {
                    var e = a.getUniqueKey();
                    u.uploading({data: [
                        {fid: e, name: b.data.sizeErrAry[d] || ""}
                    ]});
                    r[e].imgnode.innerHTML = a.core.util.easyTemplate(g, {text: s("#L{图片大于20M}"), filename: r[e].name || ""});
                    r[e].imgnode.className = "opt";
                    r[e].err = 1
                }
                x.setNumInfo()
            }, 30);
            if (b.type == "defaultErr") {
                r[b.fid].imgnode.innerHTML = a.core.util.easyTemplate(g, {text: s("#L{上传失败}"), filename: r[b.fid].name || ""});
                r[b.fid].imgnode.className = "opt";
                r[b.fid].err = 1;
                x.setNumInfo()
            }
        }, extra: function (a) {
            a.type == "beclicked" && window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack("tblog_new_image_upload", "fast_upload")
        }}, v = function () {
            q || (q = a.kit.extra.mUpload(n.uploadBtn, {h: 80, w: 80, number: x.getReFileNum(), init: u.init, uploading: u.uploading, uploaded: u.uploaded, error: u.error, extra: u.extra}))
        }, w = {restore: function () {
            var a = STK.core.util.storage.get("editor_multiimage" + $CONFIG.uid);
            return a != "null" && a != null && a.length != 0 ? a : !1
        }, store: function (a) {
            STK.core.util.storage.set("editor_multiimage" + $CONFIG.uid, a)
        }, delWord: function () {
            STK.core.util.storage.del("editor_multiimage" + $CONFIG.uid)
        }}, x = {getExtraInfo: function (a, b) {
            var c = x.getImgNode(a);
            return c ? c.getAttribute(b) : null
        }, getImgNode: function (a) {
            if (a == document.body)return null;
            if (a.tagName.toLowerCase() == "li")return a;
            a = a.parentNode;
            return arguments.callee(a)
        }, setExtra: function () {
            var b = "";
            for (var c in r) {
                if (r[c] && !r[c].pid && !r[c].err)return;
                r[c] && r[c].pid && (b += r[c].pid + " ")
            }
            try {
                w.store(b)
            } catch (d) {
            }
            a.custEvent.fire(l, "setExtra", {pids: b, text: s("##L{随手拍}#")})
        }, getNumInfo: function () {
            var a = 0;
            for (var b in r)r[b] && !r[b].err && a++;
            return a
        }, setNumInfo: function () {
            var a = x.getNumInfo();
            if (a < k) {
                n.uploadBtn.style.cssText = "";
                n.picsInfo.innerHTML = s('#L{共%s张，还能上传%s张}<em class="S_txt2">（#L{按住ctrl可选择多张}）</em>', a, k - a)
            } else {
                n.uploadBtn.style.cssText = "margin-left:-10000px;";
                n.picsInfo.innerHTML = s('<em class="error_txt">#L{最多选择9张图片上传}</em>')
            }
            try {
                q && q.getswf() && q.getswf().resetFileNum && q.getswf().resetFileNum(k);
                q && q.getswf() && q.getswf().resetFileNum && q.getswf().resetUploadedFileNum(x.getNumInfo())
            } catch (b) {
            }
        }, getReFileNum: function () {
            var a = x.getNumInfo();
            return k - a > 0 ? k - a : 0
        }, getFileName: function (b, c) {
            var b = b || "", c = c || 8, d = b.length, e = b.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**"), f = e.slice(e.length - c - 1, e.length).replace(/\*\*/g, " ").replace(/\*/g, "").length;
            if (e.length > c && c > 0 && d - f - 1 > 0) {
                b = b.slice(d - f - 1, d);
                b = "..." + b
            }
            return a.encodeHTML(b)
        }}, y = {editImg: function (b) {
            a.preventDefault();
            var c = x.getExtraInfo(b.el, "node-type"), d = x.getExtraInfo(b.el, "action-data"), e = function (a) {
                u.uploaded({data: {pid: a}, fid: c})
            };
            if (a.kit.extra.getFlashVersion() < 10)a.kit.extra.installFlash(); else {
                var f = {id: "photo_editor", pos: o.getPosition(), service: "http://picupload.service.weibo.com/interface/pic_upload.php?app=miniblog&s=xml&cb=http://weibo.com/upimgback.html&rq=http%3A%2F%2Fphoto.i.weibo.com%2Fpic%2Fadd.php%3Fapp%3D1", sucess: e, h: 385, w: 528, swf: "PhotoEditor.swf"};
                a.common.flash.imgUpload(f, {init: function (b, c) {
                    b.setPars(a.common.extra.imageURL(d, {size: "large"}))
                }, close: function (a, b) {
                }}).show()
            }
        }, deleteImg: function (b) {
            var c = x.getImgNode(b.el), d = c.getAttribute("node-type");
            r && r[d] && (r[d] = null);
            x.setExtra();
            x.setNumInfo();
            a.removeNode(c);
            q.removeFile(d);
            t.sendError({t: 1, err: 1008, app: 1001})
        }, retryLoad: function (b) {
            var c = b.data.fid;
            r[c].imgnode.innerHTML = a.core.util.easyTemplate(e, {filename: r[c].name || ""});
            r[c].imgnode.className = "loading";
            q && q.getswf() && q.getswf().reuploadById && q.getswf().reuploadById(c)
        }, close: function () {
            o.hide()
        }, sendData: function () {
            t.sendError({t: 1, err: 1008, app: 1001})
        }}, z = function () {
            p.add("editImg", "click", y.editImg);
            p.add("deleteImg", "click", y.deleteImg);
            p.add("retryLoad", "click", y.retryLoad);
            a.addEvent(o.getDomList().close, "click", y.sendData);
            a.custEvent.define(l, ["setExtra", "hide", "insert", "deletePIC", "picLoad", "loading"]);
            a.custEvent.add(o, "hide", function () {
                for (var b in r)try {
                    r[b] && r[b].imgnode && a.removeNode(r[b].imgnode);
                    q.removeFile(b);
                    r[b] = null
                } catch (c) {
                }
                r = {};
                x.setExtra();
                a.custEvent.fire(l, "hide", {})
            })
        }, A = function () {
            m = a.core.dom.builder(j.templete);
            n = a.kit.dom.parseDOM(m.list);
            p = a.core.evt.delegatedEvent(n.box);
            !o && (o = a.ui.bubble());
            o.hide();
            o.setContent("");
            o.setContent(n.box);
            o.setAlignPos(b, i.refer, i)
        }, B = function () {
            o.show()
        }, C = function () {
            o.hide()
        }, D = function () {
            A();
            z()
        }, E = function () {
        }, F = function () {
        }, G = function () {
            var a = x.getNumInfo();
            return a < k ? !1 : !0
        }, H = function (a) {
            return n[a] || null
        };
        D();
        var I = function () {
            o.getBox().style.display = "none";
            r = null;
            o.destroy && o.destroy();
            p.destroy();
            a.removeEvent(o.getDomList().close, "click", y.sendData)
        };
        l.destroy = I;
        l.uploading = u.uploading;
        l.uploaded = u.uploaded;
        l.error = u.error;
        l.extra = u.extra;
        l.show = B;
        l.hide = C;
        l.isOutstanding = G;
        l.getNumInfo = x.getNumInfo;
        l.getDomList = H;
        return l
    }
});
STK.register("common.editor.plugin.imgPreview", function (a) {
    return function (b) {
        var c, d = {}, e = {restore: function () {
            var a = STK.core.util.storage.get("editor_multiimage" + $CONFIG.uid);
            return a != "null" && a != null && a.length != 0 ? a : !1
        }, store: function (a) {
            STK.core.util.storage.set("editor_multiimage" + $CONFIG.uid, a || "")
        }, delWord: function () {
            STK.core.util.storage.del("editor_multiimage" + $CONFIG.uid)
        }}, f = function (a, c) {
            var d = b.API.getImageLogType();
            b.API.addShortUrlLog(d);
            b.API.insertText(c.value);
            image.getBub().hide()
        }, g = function (a, c) {
            b.API.addExtraInfo(c.pids);
            e.store(c.pids);
            if (c.pids == "")b.API.delWords(c.text); else {
                var d = b.API.getWords();
                d.length == 0 && b.API.insertText(c.text)
            }
        }, h = function () {
            var d = a.sizzle('a[action-type="multiimage"]', b.nodeList.widget);
            !d[0] && (d = a.sizzle('a[action-type="image"]', b.nodeList.widget));
            var e = b.nodeList.textEl;
            c = a.common.bubble.image.preview(d[0], {refer: e});
            b.getPreview = function () {
                return c
            };
            i()
        }, i = function () {
            a.custEvent.add(c, "setExtra", g);
            a.custEvent.add(c, "insert", f)
        };
        h();
        var j = function () {
            a.custEvent.remove(c, "setExtra", g);
            a.custEvent.remove(c, "insert", f);
            c.destroy()
        };
        d.destroy = j;
        return d
    }
});
STK.register("common.editor.service.face", function (a) {
    return function (b, c) {
        var d = {}, e, f;
        c = a.parseParam({t: 0, l: -15, refer: b.nodeList.textEl, useAlign: !0, arrowOffset: 2}, c || {});
        var g = function (a, c) {
            var d = b.API.getCurrentLogType();
            b.API.addShortUrlLog(d);
            b.API.insertText(c.value);
            e.getBub().hide()
        }, h = function () {
            a.core.evt.preventDefault();
            var f, h = a.fixEvent(a.getEvent()).target;
            a.contains(b.nodeList.widget, h) ? f = h : f = b.nodeList.more;
            e = a.common.bubble.face(f, c);
            a.custEvent.add(e, "insert", g);
            a.custEvent.add(b, "close", d.hide);
            a.custEvent.add(e, "hide", function () {
                a.custEvent.remove(e, "hide", arguments.callee);
                a.custEvent.remove(e, "insert", g);
                a.custEvent.remove(b, "close", d.hide)
            })
        };
        d.init = function (c, d, e) {
            b = c;
            f = d;
            a.addEvent(c.nodeList[f], "click", h)
        };
        d.show = h;
        d.hide = function () {
            e && e.getBub().hide()
        };
        d.destroy = function () {
            b = null
        };
        return d
    }
});
STK.register("common.editor.service.image", function (a) {
    return function (b) {
        var c = {}, d, e, f, g, h = !1, i = function (a, c) {
            var e = b.API.getImageLogType();
            b.API.addShortUrlLog(e);
            b.API.insertText(c.value);
            d.getBub().hide()
        }, j = function (a, c) {
            var d = b.API.getImageLogType();
            b.API.addShortUrlLog(d);
            h = !0;
            var e = b.API.getWords();
            e.length == 0 && b.API.insertText(c.text);
            b.API.addExtraInfo(c.pid);
            f = !0
        }, k = function (a, c) {
            h = !1;
            b.API.delWords(c.text);
            b.API.addExtraInfo("");
            clearInterval(g);
            f = !1
        }, l = function (e) {
            if (!f) {
                a.core.evt.preventDefault();
                var l, m = a.fixEvent(a.getEvent()).target;
                a.contains(b.nodeList.widget, m) ? l = m : l = b.nodeList.more;
                var n = b.nodeList.textEl;
                if (typeof e == "string") {
                    d = a.comon.bubble.image(l, {pid: e, refer: n});
                    g = setInterval(function () {
                        var a = {fail: function () {
                            d.bubble.setLayout(l, {offsetX: -29, offsetY: 5})
                        }};
                        d.bubble.setAlignPos(l, n, a)
                    }, 200)
                } else d = a.common.bubble.image(l, {refer: n});
                a.custEvent.add(d, "uploaded", j);
                a.custEvent.add(d, "insert", i);
                a.custEvent.add(d, "deletePIC", k);
                a.custEvent.add(b, "close", c.hide);
                a.custEvent.add(d, "hide", function () {
                    a.custEvent.remove(d, "hide", arguments.callee);
                    a.custEvent.remove(d, "uploaded", j);
                    a.custEvent.remove(d, "insert", i);
                    a.custEvent.remove(d, "deletePIC", k);
                    a.custEvent.remove(d, "changeType");
                    a.custEvent.remove(b, "close", c.hide);
                    h = !1;
                    f = !1
                })
            }
        };
        c.init = function (c, d, f) {
            b = c;
            e = d;
            a.addEvent(c.nodeList[e], "click", l);
            f && f.pid && l(f.pid)
        };
        c.show = l;
        c.hide = function (b, c) {
            if (h && d) {
                var e = d.getBub();
                if (e) {
                    var f = e.getDomList().close;
                    a.isNode(f) && a.setStyle(f, "display", "")
                }
            }
            a.core.util.listener.fire("photo_merge_channel", "closeEditor", []);
            a.core.util.listener.fire("photo_editor_channel", "closeEditor", []);
            c && c.type && c.type == "publish" ? d && d.getBub().hide() : h || d && d.getBub().hide()
        };
        c.resetBubble = function (a) {
            if (d) {
                var c = {fail: function () {
                    d.bubble.setLayout(a, {offsetX: -29, offsetY: 5})
                }};
                d.bubble.setAlignPos(a, b.nodeList.textEl, c)
            }
        };
        c.destroy = function () {
            b = null
        };
        return c
    }
});
STK.register("common.bubble.image.index", function (a) {
    var b = '<div class="layer_send_pic" style="width:260px;">\t<div class="title">#L{图片上传}</div>\t<div class="laPic_btnBox btnbox_notab clearfix">\t\t<div class="laPic_btnmore" suda-data="key=tblog_new_image_upload&value=fast_upload"><a href="javascript:void(0);" title="#L{最多支持同时上传9张图片}" class="W_btn_e" node-type="mUpload"><span action-type="mUpload"><em class="W_ico16 icon_upload_upload"></em>#L{添加图片}</span></a></div>\t\t<div class="laPic_btnmore"><a href="javascript:void(0);" title="#L{打开拼图工具}" class="W_btn_e" action-type="more" node-type="inputCover" suda-data="key=tblog_new_image_upload&value=pin_upload"><span><em class="ico_ones"></em>#L{拼图上传}</span></a></div>\t\t<div class="laPic_btnmore"><a href="javascript:void(0);" title="#L{截取屏幕内容并上传到微博}" class="W_btn_e" action-type="capture" suda-data="key=tblog_new_image_upload&value=screenshot_upload"><span><em class="ico_screenshot"></em>#L{截屏上传}</span></a></div>\t\t<div class="laPic_btnmore"><a href="javascript:void(0);" title="#L{上传图片到相册}" class="W_btn_e" action-type="uploadAblum" suda-data="key=tblog_new_image_upload&value=upload_albums"><span><em class="ico_toalbum"></em>#L{传至相册}</span></a></div>\t</div></div>';
    return function (c, d) {
        var e = {}, f, g, h, i, h, j = "weibo.com/", k = $CONFIG || {}, l = a.common.plugin.screenCapture, m, n, o = a.kit.extra.language, p = function (b) {
            if (a.kit.extra.getFlashVersion() < 10)a.kit.extra.installFlash({onHide: function () {
                f.startBoxClose()
            }}); else {
                var c = function (c) {
                    var d = c.nickname != "0" || c.logo != "0" || c.domain != "0", e = $CONFIG && $CONFIG.nick || "", g = "http://picupload.service.weibo.com/interface/pic_upload.php?app=miniblog&marks=" + (d ? "1" : "0") + (c.logo == "1" ? "&logo=1" : "") + (c.nickname == "1" ? "&nick=" + (e ? encodeURIComponent("@" + e) : "") : "") + (c.domain == "1" ? "&url=" + j + (k && k.watermark || k.domain) : "") + (c.position ? "&markpos=" + c.position : "") + "&s=xml&cb=http://weibo.com/upimgback.html&rq=http%3A%2F%2Fphoto.i.weibo.com%2Fpic%2Fadd.php%3Fapp%3D1", h = {id: b.id, pos: f.getPosition(), service: g, sucess: b.sucess, h: b.height, w: b.width, swf: b.swf, baseDir: b.baseDir || ""};
                    n = a.common.flash.imgUpload(h, {init: function (a, b) {
                        a.setPars()
                    }, close: function (a, b) {
                        setTimeout(function () {
                            f.startBoxClose()
                        }, 100)
                    }});
                    n.show()
                };
                a.kit.extra.watermark(function (a) {
                    c(a)
                })
            }
        }, q = function (b) {
            f.startBoxClose();
            var b = b.pid || b, c = a.getUniqueKey();
            i.uploading({data: [
                {fid: c}
            ]});
            i.uploaded({data: {pid: b}, fid: c})
        }, r = {hideCapture: function () {
            m && m.hide()
        }, handleError: function (b) {
            f.stopBoxClose();
            a.ui.alert(o(b.msg), {OK: function () {
                b.code == 1 && window.location.reload();
                setTimeout(function () {
                    f.startBoxClose()
                }, 0)
            }})
        }, captureWindow: function () {
            a.preventDefault();
            if (!m) {
                var b = function () {
                    f.stopBoxClose()
                }, c = function () {
                    f.startBoxClose()
                };
                m = l.screenCapture({captureType: "pid", beforeUpload: r.beforeCaptureUpload, captureSuccess: q, captureError: r.handleError, beforeSupportTip: b, supportTipOk: c, beforeIeInstallTip: b, ieInstallTipOk: c, beforeInstallTip: b, installTipOk: c})
            }
            m.doit()
        }, beforeCaptureUpload: function () {
            f.stopBoxClose()
        }, captureSuccess: function (a) {
            imgName = a.imgName;
            captureFlag = 1;
            r.handleSucc(a)
        }}, s = {splice: function () {
            p({id: "photo_merge", swf: "SinaCollage.swf", width: 528, height: 470, sucess: function (a) {
                q(a)
            }})
        }, face_sticker: function () {
            p({id: "photo_facesticker", swf: "FacePhoto.swf", width: 568, height: 478, baseDir: "facesticker", sucess: function () {
            }})
        }, uploadAblum: function () {
            window.open("http://photo.weibo.com/upload/weibo", "", "width=650, height=470, top=300, left=400")
        }}, t = function () {
            !f && (f = a.ui.bubble());
            f.setContent(o(b));
            f.setAlignPos(c, d.refer, d);
            f.getBox().style.zIndex = 9998;
            f.show();
            var e = a.sizzle('a[node-type="mUpload"]', f.getBox());
            !i && (i = d.editor.getPreview());
            a.kit.extra.mUpload(e[0], {w: 100, h: 30, uploading: i.uploading, uploaded: i.uploaded, error: i.error, extra: i.extra});
            a.custEvent.add(i, "loading", function () {
                f.stopBoxClose()
            });
            a.custEvent.add(i, "hide", function () {
                f.hide()
            });
            h = a.delegatedEvent(f.getBox())
        }, u = function () {
            h.add("more", "click", s.splice);
            h.add("capture", "click", r.captureWindow);
            h.add("uploadAblum", "click", s.uploadAblum);
            a.custEvent.add(f, "hide", function () {
                h && h.destroy()
            })
        }, v = function () {
            t();
            u()
        };
        v();
        e.getPreview = function () {
            return i
        };
        e.hide = function () {
            f.hide()
        };
        e.getBub = function () {
            return f
        };
        e.destroy = function () {
            f.destroy();
            h.destroy()
        };
        return e
    }
});
STK.register("common.editor.service.multiimage", function (a) {
    return function (b) {
        var c = {}, d, e, f, g, h = !1, i, j = {restore: function () {
            var a = STK.core.util.storage.get("editor_multiimage" + $CONFIG.uid);
            return a != "null" && a != null && a.length != 0 ? a : !1
        }, store: function (a) {
            STK.core.util.storage.set("editor_multiimage" + $CONFIG.uid, a)
        }, delWord: function () {
            STK.core.util.storage.del("editor_multiimage" + $CONFIG.uid)
        }}, k = function (a, c) {
            var e = b.API.getImageLogType();
            b.API.addShortUrlLog(e);
            b.API.insertText(c.value);
            d.getBub().hide()
        }, l = function (a, c) {
            h = !0;
            b.API.addExtraInfo(c.pids);
            f = !0;
            if (c.pids == "")b.API.delWords(c.text); else {
                var d = b.API.getWords();
                d.length == 0 && b.API.insertText(c.text)
            }
        }, m = function (e) {
            if (!f) {
                a.core.evt.preventDefault();
                var g, k = a.fixEvent(a.getEvent()).target;
                a.contains(b.nodeList.widget, k) ? g = k : g = b.nodeList.more;
                var m = b.nodeList.textEl, n = j.restore();
                d = a.common.bubble.image.index(g, {refer: m, editor: b});
                i = b.getPreview();
                a.custEvent.add(i, "setExtra", function () {
                    h = !0;
                    f = !0
                });
                a.custEvent.add(d.getBub(), "hide", function () {
                    f = !1
                });
                a.custEvent.add(i, "loading", function () {
                    h = !0;
                    f = !0
                });
                a.custEvent.add(b, "close", c.hide);
                a.custEvent.add(i, "hide", function () {
                    h = !1;
                    f = !1;
                    a.custEvent.remove(i, "hide", arguments.callee);
                    a.custEvent.remove(i, "setExtra", l);
                    a.custEvent.remove(i, "changeType");
                    a.custEvent.remove(b, "close", c.hide)
                });
                if (!i.getNumInfo() && n && n != "") {
                    f = !0;
                    var o = n.split(" "), p = [];
                    for (var q = 0; o[q]; q++)p.push({fid: a.getUniqueKey(), pid: o[q]});
                    i.uploading({data: p});
                    for (var q = 0; p[q]; q++)i.uploaded({fid: p[q].fid, data: p[q]})
                }
            }
        };
        c.init = function (c, d, f) {
            b = c;
            e = d;
            a.addEvent(c.nodeList[e], "click", m);
            f && f.pid && m(f.pid)
        };
        c.show = m;
        c.hide = function (b, c) {
            i && i.hide();
            a.core.util.listener.fire("photo_merge_channel", "closeEditor", []);
            a.core.util.listener.fire("photo_editor_channel", "closeEditor", []);
            c && c.type && c.type == "publish" ? d && d.getBub().hide() : d && d.getBub().hide()
        };
        c.destroy = function () {
            d.destroy();
            b = null
        };
        return c
    }
});
STK.register("common.bubble.video", function (a) {
    var b = a.kit.extra.language, c = b("#L{请输入视频播放页地址}"), d = b('<div class="layer_send_medias"  node-type="outer"><div class="profile_tab S_line5"><ul class="pftb_ul layer_tab S_line1"><li class="pftb_itm S_line1"><a class="pftb_lk current S_line5 S_txt1 S_bg5" action-type="switchTab" action-data="type=0" node-type="tabs" href="javascript:void(0);">#L{上传视频}</a></li><li class="pftb_itm S_line1"><a class="pftb_lk S_line5 S_txt1 S_bg1" action-type="switchTab" action-data="type=1" node-type="tabs" href="javascript:void(0);">#L{在线录制}</a></li><li class="pftb_itm S_line1"><a class="pftb_lk S_line5 S_txt1 S_bg1" action-type="switchTab" action-data="type=2" node-type="tabs" href="javascript:void(0);">#L{在线视频}</a></li><li class="pftb_itm pftb_itm_lst S_line1"><a class="pftb_lk S_line5 S_txt1 S_bg1" action-type="switchTab" action-data="type=3" node-type="tabs" href="javascript:void(0);">#L{分享电视}</a></li></p></div><div node-type="inner"><div node-type="content" class="laMed_btn"><a class="W_btn_d" href="javascript:void(0);" action-type="uploadVideo"><span><em class="ico_updatevideo"></em>#L{从电脑直接上传视频}</span></a> <p class="S_txt2">#L{视频将保存在新浪播客}</p></div><div node-type="content" class="laMed_btn" style="display:none;"><a action-type="onlineRec" href="javascript:void(0);" class="W_btn_d"><span><em class="ico_recordingvideo"></em>#L{开始录制视频}</span></a><p class="W_textb">#L{支持通过电脑摄像头拍摄五分钟以内的微视频}</p></div><div node-type="content" style="display:none;"><div class="laMed_inp"><input node-type="videoInput" action-type="videoInput" type="text" class="W_input inp_video" value="' + c + '" style="color:#999" /><a href="javascript:void(0);" class="W_btn_b" action-type="videoSubmit"><span>#L{确定}</span></a><p class="laMed_err S_error" style="display:none;" node-type="errorWord">#L{你输入的链接地址无法识别}</p><p class="laMed_err" style="display:none;" node-type="optional"><a href="javascript:void(0);" action-type="cancel">#L{取消操作}</a> #L{或者}<a href="javascript:void(0);" action-type="normalLink">#L{作为普通的链接发布}</a></p></div><div class="laMed_con S_txt2">#L{目前已支持}<a target="_blank" class="S_link2" href="http://video.sina.com.cn">#L{新浪播客}</a>、<a target="_blank" href="http://www.youku.com" class="S_link2">#L{优酷网}</a>、<a target="_blank" class="S_link2" href="http://www.tudou.com">#L{土豆网}</a>、<a class="S_link2" target="_blank" href="http://www.ku6.com/">#L{酷6网}</a>、<a class="S_link2" target="_blank" href="http://tv.sohu.com/">#L{搜狐视频}</a>、<a class="S_link2" target="_blank" href="http://www.56.com/">#L{56网}</a>、<a class="S_link2" target="_blank" href="http://www.qiyi.com/">#L{奇艺网}</a>、<a class="S_link2" target="_blank" href="http://www.ifeng.com/">#L{凤凰网}</a>、<a class="S_link2" target="_blank" href="http://www.yinyuetai.com/">#L{音悦台}</a>、<a class="S_link2" target="_blank" href="http://www.letv.com/">#L{乐视网}</a>#L{等视频网站的视频播放页链接。}</div></div>' + '<div node-type="content" style="display:none;"></div>' + "</div>" + "</div>"), e, f, g, h, i, j, k = {}, l = a.core.dom.getStyle, m = a.core.dom.setStyle, n = a.core.evt.addEvent, o = a.core.evt.removeEvent, p = a.core.evt.preventDefault, q = a.core.str.trim, r = "http://upload.video.weibo.com/wbupload.php", s = "http://upload.kandian.weibo.com/app/weibo_tvshare/weibo_tvshare", t = "http://upload.kandian.weibo.com/app/weibo_record/record", u = function () {
        var a = i.videoInput, b = q(a.value);
        b == "" || b == c ? a.value = "" : a.select()
    }, v = function () {
        var a = i.videoInput, b = q(a.value);
        if (b == "" || b == c) {
            a.value = c;
            return!1
        }
    }, w = function () {
        i.videoInput.value = c;
        A()
    }, x = function () {
        var b = a.core.str.trim(i.videoInput.value);
        b != j && A()
    }, y = function () {
        var b = q(i.videoInput.value);
        p();
        if (b !== "") {
            j = b;
            a.common.trans.editor.getTrans("parseVideo", {onSuccess: function (b) {
                var c = b.data.url + " ";
                a.custEvent.fire(k, "insert", {value: c});
                g.hide()
            }, onError: function (a) {
                z()
            }}).request({url: b})
        }
    }, z = function () {
        i.errorWord.style.display = "";
        i.optional.style.display = ""
    }, A = function () {
        i.errorWord.style.display = "none";
        i.optional.style.display = "none"
    }, B = function () {
        var b = a.core.str.trim(i.videoInput.value);
        a.custEvent.fire(k, "insert", {value: b + " "});
        g.hide()
    }, C = function (a) {
        var b = a.data.type;
        for (var c in i.tabs)if (c === b) {
            i.tabs[c].className = "pftb_lk current S_line5 S_txt1 S_bg5";
            i.content[c].style.display = ""
        } else {
            i.tabs[c].className = "pftb_lk S_line5 S_txt1 S_bg1";
            i.content[c].style.display = "none"
        }
        E[b] && E[b](i.content[b])
    }, D = function (b) {
        if (!b.firstChild) {
            a.core.dom.insertHTML(b, '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" style="border:0 none;height:357px;width:402px;"></iframe>');
            b.firstChild.src = s
        }
    }, E = [function () {
    }, function () {
    }, function () {
    }, function (a, b) {
        D(a)
    }], F = function () {
        e = a.ui.layer({template: d});
        g = a.ui.bubble();
        h = e.getBox();
        i = e.getDomList();
        G()
    };
    k.getBub = function () {
        return g
    };
    var G = function () {
        a.custEvent.define(k, ["insert", "hide", "upload", "rec"]);
        var b = a.core.evt.delegatedEvent(h);
        b.add("normalLink", "click", B);
        b.add("videoSubmit", "click", y);
        b.add("cancel", "click", function () {
            w();
            g.hide()
        });
        b.add("uploadVideo", "click", function () {
            a.custEvent.fire(k, "upload", {el: h, url: r, width: 800, height: 550})
        });
        b.add("cuttvVideo", "click", function () {
            a.custEvent.fire(k, "upload", {el: h, url: s, width: 374, height: 322})
        });
        b.add("onlineRec", "click", function () {
            a.custEvent.fire(k, "rec", {el: h, url: t, width: 570, height: 420})
        });
        b.add("switchTab", "click", C);
        a.addEvent(i.videoInput, "keyup", x);
        a.addEvent(i.videoInput, "blur", v);
        a.addEvent(i.videoInput, "focus", u);
        a.custEvent.add(g, "hide", function (b) {
            return function () {
                a.custEvent.remove(b, "hide", arguments.callee);
                a.custEvent.fire(k, "hide", {})
            }
        }(g))
    };
    return function (b, c) {
        F();
        if (!a.isNode(b))throw"common.bubble.video need el as first parameter!";
        g.setContent(h);
        g.setAlignPos(b, c.refer, {fail: function () {
            g.setLayoutPos(b, {offsetX: -24, offsetY: 5})
        }});
        g.show();
        return k
    }
});
STK.register("common.editor.service.video", function (a) {
    return function (b) {
        var c = {}, d, e, f, g, h = !1, i = function (c, d) {
            var e = d.value, g = b.nodeList.textEl, h = g.value, i = e.length - 2;
            if (h.indexOf(e) != -1) {
                var j = h.indexOf(e);
                a.kit.extra.textareaUtils.setCursor(g, j + 1, i)
            } else b.API.insertText(e, f);
            var k = b.API.getCurrentLogType();
            b.API.addShortUrlLog(k)
        }, j = function (c, d) {
            var e, f, g, h = b.API.getWords(), i = b.API.getExtra(), j = {pid: i, publish: h};
            a.core.evt.preventDefault();
            f = a.core.json.jsonToQuery(j, !0);
            g = d.url + (f ? "?" + f : "");
            e = a.core.dom.position(d.el);
            window.open(g, "", "height=" + d.height + ",width=" + d.width + ",location=no,left=" + e.l + ",top=" + e.t)
        }, k = function (b, c) {
            var d, e;
            a.core.evt.preventDefault();
            e = c.url;
            window.open(e, "", "height=645,width=610,location=no, left=300, top=200")
        }, l = function () {
            h = !1;
            d = a.common.bubble.video(g, {refer: b.nodeList.textEl});
            a.custEvent.add(d, "insert", i);
            a.custEvent.add(d, "upload", j);
            a.custEvent.add(d, "rec", k);
            a.custEvent.add(b, "close", c.hide);
            a.custEvent.add(d, "hide", function () {
                a.custEvent.remove(d, "hide", arguments.callee);
                a.custEvent.remove(d, "insert", i);
                a.custEvent.remove(d, "upload", j);
                a.custEvent.remove(d, "rec", k);
                a.custEvent.remove(b, "close", c.hide)
            });
            f = b.API.getCurPos()
        }, m = function (c) {
            a.core.evt.preventDefault();
            if (!h) {
                h = !0;
                var d = a.fixEvent(a.getEvent()).target;
                a.contains(b.nodeList.widget, d) ? g = d : g = b.nodeList.more;
                l(c)
            }
        };
        c.init = function (c, d, f) {
            b = c;
            e = d;
            a.addEvent(c.nodeList[e], "click", m)
        };
        c.clear = function () {
        };
        c.show = m;
        c.hide = function () {
            d && d.getBub().hide()
        };
        c.destroy = function () {
            b = null
        };
        return c
    }
});
STK.register("common.bubble.music", function (a) {
    var b = window.$CONFIG && window.$CONFIG.version, c = '<div class="layer_send_music" node-type="outer"><div class="profile_tab S_line5"><ul class="pftb_ul layer_tab S_line1"><li class="pftb_itm S_line1"><a class="pftb_lk current S_line5 S_txt1 S_bg5" action-type="tabSelect" node-type="tabSelect" href="javascript:void(0);">#L{搜索歌曲}</a></li><li class="pftb_itm S_line1"><a class="pftb_lk S_line5 S_txt1 S_bg1" action-type="tabSelect" node-type="tabSelect" href="javascript:void(0);">#L{喜欢的歌}</a></li><li class="pftb_itm pftb_itm_lst S_line1"><a href="javascript:void(0);" class="pftb_lk S_line5 S_txt1 S_bg1" action-type="tabSelect" node-type="tabSelect">#L{输入音乐链接}</a></li><span style="float:left" node-type="miniplayer"></span></p></div><div node-type="block" class="laMed_border" ><div class="laMed_inp"><input type="text" autocomplete="off" style="color: rgb(153, 153, 153);" value="#L{请输入歌曲、歌手、专辑名}" class="W_input inp_music" node-type="songInput"><a class="W_btn_b" href="javascript:void(0);" onclick="return false;" node-type="nameSearch"><span>#L{搜索}</span></a><div style="display:none" class="layer_menu_list" node-type="suggestLay"></div><p style="display: none;" node-type="searchError" class="laMed_err S_error">#L{抱歉，没有找到和}"<span node-type="searchKey"></span>"#L{有关的歌曲，换个词再试一下}</p></div><div class="laMed_titS" node-type="searchRusult" style="display:none">#L{搜索结果}：</div><div class="laMed_mulist" node-type="songList" style="display:none"></div></div><div node-type="block" class="laMed_border" style="display:none"><div node-type="favRusult" class="laMed_titS" style="display:none">#L{我有}<a class="W_fb" href="http://music.weibo.com/ting/?musicpublisher=1#like" target="_blank" node-type="favSongCount">199</a>#L{首喜欢的歌}<i>(在<a href="http://ting.weibo.com?musicpublisher=2" target="_blank">#L{微博音乐盒}</a>#L{标记为红心})</i></div><div class="laMed_mulist" node-type="favSongList" style="display:none"></div><div class="W_pages_minibtn" node-type="favPagingBar" style="display:none"></div><p class="no_music" node-type="favNoSongs" style="display:none">#L{你还没有标记为喜欢的歌，快去} <a href="http://ting.weibo.com?musicpublisher=3" target="_blank">#L{微博音乐盒}</a> #L{听听}</p></div><div node-type="block" class="laMed_border" style="display:none"><div class="laMed_con S_txt2">#L{目前已支持}<a href="http://music.sina.com.cn/" target="_blank" class="S_link2">#L{新浪乐库}</a>、<a class="S_link2" href="http://www.kuwo.cn/" target="_blank">#L{酷我音乐}</a>、<a class="S_link2" href="http://www.songtaste.com/" target="_blank">#L{Songtaste}</a> #L{的播放页面链接，也支持MP3格式歌曲链接。}</div><div class="laMed_inp"><input action-type="inputAction" type="text" style="color: rgb(153, 153, 153);" node-type="linkInput" value="#L{请输入MP3链接或新浪乐库单曲播放页链接}" class="W_input inp_music"><a class="W_btn_b" onclick="return false;" node-type="searchLink" href="javascript:void(0)"><span>#L{搜索}</span></a><p node-type="linkError" style="display: none;" class="laMed_err S_error">#L{没有识别出相应的歌曲信息}</p><p node-type="linkOptional" style="display: none;" class="laMed_err"><a href="javascript:void(0)" action-type="normalLink">#L{作为普通的链接发布}</a>&nbsp;#L{或}&nbsp;<a href="javascript:void(0)" action-type="closeLayer">#L{取消操作}</a></p></div><div class="laMed_titS" node-type="integrity" style="display:none">#L{为了更好的分享音乐，请花一点时间完善歌曲资料}</div><div class="laMed_muinfo" node-type="songInfo" style="display:none"></div></div></div>', d = '<#et tname data><ul><#list data.music_list as list><li action-type="songItem" action-data="index=${list_index}" songKeyWord="${list.title}"><a onclick="return false" href="javascript:void(0);">${list.title}</a></li></#list></ul></#et>', e = '<#et tname data><ol><li><span class="mu_song">#L{歌曲名}</span></li><li><span class="mu_songer">#L{歌手名}</span></li><li><span class="mu_album">#L{专辑名}</span></li><li><span class="mu_play">#L{试听}</span></li></ol><ul><#list data.music_list as list><li artist="${list.artist}" title="${list.stitle}" mp3_url="${list.mp3_url}" ><div class="mu_name" action-type="song"><span class="mu_song" title="${list.title}"><span>${list.show_title}</span><em class="mu_icon_new" style="display:${list.isnew}"></em></span><span class="mu_songer" title="${list.artist}">${list.show_artist}</span><span class="mu_album" title="${list.album}">${list.show_album}</span></div><div class="W_ico16 icon_toplay" songUrl="${list.mp3_url}" action-type="player"><span></span></div></li></#list></ul></#et>', f = '<table><tbody><tr><th><em class="S_spetxt">*</em>#L{歌曲名}</th><td><input type="text" value="" node-type="songName" class="W_input"></td></tr><tr><th>#L{演唱者}</th><td><input type="text" value="" node-type="artist" class="W_input"></td></tr><tr class="laMed_err S_error"><th></th><td><span class="S_error" node-type="errorSongName" style="display:none"></span></td></tr><tr class="laMed_btn"><th></th><td><a href="javascript:void(0);" class="W_btn_b" action-type="addSong"><span>#L{添加}</span></a></td></tr></tbody></table>', g = '<#et tname data><ul><#list data.music_list as list><li artist="${list.artist}" title="${list.title}" mp3_url="${list.mp3_url}"><div class="mu_name" action-type="favsong">${list.title}</div><div class="W_ico16 icon_toplay" songUrl="${list.mp3_url}" action-type="player" ><span></span></div></li></#list></ul></#et>', h = '<a action-type="favSongPage" action-data="num=#{number}" class="page S_bg1" href="javascript:;" onclick="return false;">#{label}</a>', i = '<a action-data="num=#{number}" href="javascript:;" class="page S_txt1"  onclick="return false;">#{label}</a>', j = '<a class="reverse" action-type="favPagPrev" href="javascript:;" onclick="return false;"></a>', k = '<a class="next" action-type="favPagNext" href="javascript:;" onclick="return false;"></a>', l, m, n, o, p, q, r, s, t, u, v, w, x, y = -1, z, A, B, C = $CONFIG.jsPath, D = a.kit.extra.language, E = {songInput: D("#L{请输入歌曲、歌手、专辑名}"), linkInput: D("#L{请输入MP3链接或新浪乐库单曲播放页链接}"), songError: D("#L{歌曲名不能超过15个汉字}"), artistError: D("#L{演唱者不能超过15个汉字}"), interError: D("#L{接口错误}")}, F = {searchTab: {idx: 0, logstatus: !1, logfn: function () {
        N.tabLog.request({coflag: 500010, action: "search_click"});
        this.logstatus = !0
    }}, favTab: {idx: 1, logstatus: !1, logfn: function () {
        N.tabLog.request({coflag: 500010, action: "collect_click"});
        this.logstatus = !0
    }}, linkTab: {idx: 2, logstatus: !1, logfn: function () {
        N.tabLog.request({coflag: 500010, action: "link_click"});
        this.logstatus = !0
    }}}, G = {}, H = a.common.trans.editor.getTrans, I = a.core.str.trim, J = a.core.util.easyTemplate, K = a.core.evt.preventDefault, L = function () {
        l = a.kit.dom.parseDOM(a.core.dom.builder(D(c)).list);
        p = l.outer;
        n = a.ui.bubble();
        n.setArrow({style: "left:82px;"});
        U();
        a.custEvent.add(n, "hide", function (b) {
            return function () {
                b.setArrow({style: "left:30px;"});
                a.custEvent.remove(b, "hide", arguments.callee);
                a.custEvent.fire(G, "hide", {});
                var c = a.sizzle("object,embed", l.miniplayer)[0];
                a.kit.extra.destroyFlash(c);
                B = !1;
                s = null;
                x = null;
                window.origin_miniplayer_music = undefined
            }
        }(n));
        !F.searchTab.logstatus && F.searchTab.logfn()
    }, M = {currentPage: 0, maxShowPage: 6, limit: 10}, N = {suggestMusic: H("suggestMusic", {onSuccess: function (a) {
        a.data && O.rendSugg(a)
    }}), searchMusic: H("searchMusic", {onSuccess: function (a) {
        O.rendList(a)
    }, onError: function () {
        O.rendError()
    }}), parseMusic: H("parseMusic", {onSuccess: function (a) {
        O.rendInfo(a)
    }, onComplete: function (a) {
        a.code != "100000" && O.urlError(a)
    }}), addMusic: H("addMusic", {onSuccess: function (a) {
        O.urlSucc(a)
    }, onError: function () {
        var b = a.sizzle('[node-type="errorSongName"]', l.outer)[0];
        b.innerHTML = E.interError
    }}), favSongSearch: H("favSongSearch", {onSuccess: function (a) {
        O.rendFavList(a)
    }}), getOutlinkInfo: function (a) {
        return H("getOutlinkInfo", {onComplete: function (b) {
            b.code == "1" && O.listenOutLinkSong(a, b)
        }})
    }, tabLog: H("tabLog")}, O = {rendSugg: function (b) {
        var c = l.suggestLay, e, f = b.data;
        if (b.key == z && f !== null) {
            for (var g = 0, h = f.music_list.length; g < h; g++)f.music_list[g].title = a.leftB(f.music_list[g].title, 30);
            e = J(d, f);
            c.innerHTML = e;
            P.showSugg();
            l.suggestList = a.sizzle('[action-type="songItem"]', c)
        }
    }, rendError: function () {
        var b = I(l.songInput.value);
        b = a.bLength(b) > 25 ? a.leftB(b, 25) + "..." : b;
        P.clean();
        a.core.dom.insertHTML(l.searchKey, a.encodeHTML(b));
        a.setStyle(l.searchError, "display", "");
        P.hideSugg()
    }, rendList: function (b) {
        var c = l.songList, d, f = b.data, g;
        P.clean();
        P.hideSugg();
        g = f.music_list;
        for (var h = 0; h < g.length; h++) {
            g[h].stitle = [g[h].title, g[h].artist, g[h].album].join("-");
            a.bLength(g[h].title) > 13 ? g[h].show_title = [a.leftB(g[h].title, 13), "..."].join("") : g[h].show_title = g[h].title;
            a.bLength(g[h].artist) > 7 ? g[h].show_artist = [a.leftB(g[h].artist, 7), "..."].join("") : g[h].show_artist = g[h].artist;
            a.bLength(g[h].album) > 9 ? g[h].show_album = [a.leftB(g[h].album, 9), "..."].join("") : g[h].show_album = g[h].album;
            a.bLength(g[h].stitle) > 40 && (g[h].stitle = [a.leftB(g[h].stitle, 40), "..."].join(""));
            g[h].isnew = g[h]["new"] ? "" : "none"
        }
        d = J(D(e), f).toString();
        c.innerHTML = d;
        a.setStyle(l.searchRusult, "display", "");
        a.setStyle(l.songList, "display", "");
        a.setStyle(c, "display", "")
    }, rendInfo: function (b) {
        var c = a.core.dom.builder(D(f)), d = l.songInfo, e = c.list.artist[0], g = c.list.songName[0], h = b.data.artist ? b.data.artist : "", i = b.data.title ? b.data.title : "";
        d.innerHTML = "";
        d.appendChild(c.box);
        g.value = i;
        e.value = h;
        Q.clean();
        a.setStyle(l.integrity, "display", "");
        a.setStyle(d, "display", "")
    }, urlError: function (b) {
        Q.clean();
        a.setStyle(l.linkError, "display", "");
        a.setStyle(l.linkOptional, "display", "")
    }, urlSucc: function (b) {
        var c = b.data.text;
        a.custEvent.fire(G, "insert", {value: c});
        Q.clean();
        n.hide()
    }, favTabClick: function () {
        var a = arguments;
        if (a[0].idx == F.favTab.idx && !B) {
            B = !0;
            P.favSong(0)
        }
        a[0].idx == F.searchTab.idx && !F.searchTab.logstatus ? F.searchTab.logfn() : a[0].idx == F.favTab.idx && !F.favTab.logstatus ? F.favTab.logfn() : a[0].idx == F.linkTab.idx && !F.linkTab.logstatus && F.linkTab.logfn()
    }, setFavPagingBar: function (b) {
        function m(b, c) {
            b.push("...");
            b.push(a.templet(h, {number: c - 1, label: c}))
        }

        function g(b) {
            b.push(a.templet(h, {number: 0, label: 1}));
            b.push("...")
        }

        function f(b, d, e) {
            for (var f = d; f < e; f += 1)c == f ? b.push(a.templet(i, {number: f, label: f + 1})) : b.push(a.templet(h, {number: f, label: f + 1}))
        }

        var c = M.currentPage, d = l.favPagingBar, e = [];
        if (b <= M.maxShowPage + 2)f(e, 0, b); else if (M.currentPage < M.maxShowPage / 2 + 1) {
            f(e, 0, M.maxShowPage);
            m(e, b)
        } else if (M.currentPage + (M.maxShowPage / 2 + 1) >= b) {
            g(e);
            f(e, b - M.maxShowPage, b)
        } else {
            g(e);
            f(e, M.currentPage - (M.maxShowPage / 2 - 1), M.currentPage + (M.maxShowPage / 2 - 1) + 1);
            m(e, b)
        }
        if (b > 1) {
            e.unshift(a.templet(j));
            e.push(a.templet(k))
        }
        d.innerHTML = e.join("")
    }, rendFavList: function (b) {
        var c = l.favSongList, d = l.favSongCount, e, f = b.data, h, i, j;
        h = f.music_list;
        i = f.music_num;
        j = Math.ceil(i / M.limit);
        M.totalPage = j;
        if (h.length < 1) {
            a.setStyle(l.favNoSongs, "display", "");
            a.setStyle(l.favSongList, "display", "none");
            a.setStyle(l.favRusult, "display", "none");
            a.setStyle(l.favPagingBar, "display", "none")
        } else {
            for (var k = 0; k < h.length; k++) {
                h[k].title = [h[k].title, h[k].artist].join("-");
                a.bLength(h[k].title) > 40 && (h[k].title = [a.leftB(h[k].title, 40), "..."].join(""))
            }
            e = J(g, f);
            c.innerHTML = e;
            d.innerHTML = i;
            O.setFavPagingBar(j);
            a.setStyle(l.favSongList, "display", "");
            a.setStyle(l.favRusult, "display", "");
            a.setStyle(l.favPagingBar, "display", "");
            a.setStyle(l.favNoSongs, "display", "none");
            a.setStyle(c, "display", "")
        }
    }, listenOutLinkSong: function (a, b) {
        x.setUrl(b.data[a].songurl)
    }}, P = {focus: function (b) {
        var c = a.fixEvent(b).target, d = I(c.value), e = d == E.songInput || d === "" ? !1 : !0;
        clearTimeout(v);
        e ? I(l.suggestLay.innerHTML) !== "" && P.showSugg() : c.value = ""
    }, blur: function (b) {
        var c = a.fixEvent(b).target, d = I(c.value), e = d === "" || d == E.songInput ? !1 : !0;
        e || (c.value = E.songInput);
        clearTimeout(v);
        v = setTimeout(P.hideSugg, 1e3)
    }, keyhandler: function (a) {
        a.keyCode == 13 && setTimeout(P.search, 0);
        a.keyCode == 27 && P.hideSugg()
    }, setSuggestLayPos: function () {
        var b = a.kit.dom.parseDOM(a.builder(n.getBox()).list).layoutContent, c = a.core.dom.getSize(l.songInput), d = a.position(b), e = a.position(l.songInput), f = e.l - d.l, g = e.t - d.t + c.height - 1;
        a.setStyle(l.suggestLay, "left", f + "px");
        a.setStyle(l.suggestLay, "top", g + "px")
    }, showSugg: function () {
        y = -1;
        P.setSuggestLayPos();
        a.setStyle(l.suggestLay, "display", "");
        a.custEvent.fire(A, "open", l.songInput);
        a.addEvent(document, "click", P.hideSugg)
    }, hideSugg: function (b) {
        var c = b ? a.core.evt.fixEvent(b).target : null, d = l.suggestLay, e = l.songInput;
        if (c && (c == e || a.core.dom.contains(d, c)))return!1;
        y > -1 && l.suggestList && l.suggestList[y] && a.removeClassName(l.suggestList[y], "cur");
        a.setStyle(d, "display", "none");
        a.custEvent.fire(A, "close");
        a.removeEvent(document, "click", P.hideSugg)
    }, goSugg: function (b) {
        var c = l.songInput, d = I(c.value);
        clearTimeout(u);
        if (d != E.songInput && d != r) {
            if (d === "") {
                P.hideSugg();
                return
            }
            l.suggestLay.innerHTML = "";
            a.setStyle(l.suggestLay, "display", "none");
            u = setTimeout(function () {
                z = a.core.util.getUniqueKey();
                N.suggestMusic.request({key: d, _k: z});
                r = d
            }, 200)
        }
    }, searchChoose: function (a, b) {
        var c = l.songInput, d, e;
        if (y >= 0) {
            d = l.suggestList[b];
            e = d.getAttribute("songkeyword");
            c.value = e;
            r = e
        }
    }, search: function () {
        var a = l.songInput, b = I(a.value);
        if (b !== "" && b != E.songInput) {
            x && x.songStop && x.songStop();
            window.setTimeout(function () {
                N.searchMusic.request({key: b, isred: !1});
                t = b
            }, 0)
        }
    }, clean: function () {
        var b = l.searchError, c = l.searchRusult, d = l.songList;
        r = "";
        d.innerHTML = "";
        l.searchKey.innerHTML = "";
        a.setStyle(b, "display", "none");
        a.setStyle(c, "display", "none")
    }, add: function (a) {
        var b = a.el.parentNode, c = b.getAttribute("mp3_url"), d = b.getAttribute("title"), e = b.getAttribute("artist");
        K();
        N.addMusic.request({url: c, title: d, artist: e})
    }, setIndex: function (b, c) {
        var d;
        if (y >= 0) {
            d = l.suggestList[y] ? l.suggestList[y] : null;
            d.parentNode && d.parentNode.nodeType != 11 && a.removeClassName(d, "cur")
        }
        l.suggestList[c] && a.addClassName(l.suggestList[c], "cur");
        y = c
    }, controlSong: function (a) {
        var b = a.el;
        w && w != b && (w.className = "W_ico16 icon_toplay");
        w = b;
        b.className != "W_loading" && (b.className == "W_ico16 icon_toplay" ? S.playSong(b) : b.className == "W_ico16 icon_tostop" && S.pauseSong())
    }, addfavSong: function (b) {
        var c = b.el.parentNode, d = c.getAttribute("mp3_url"), e = c.getAttribute("title"), f = c.getAttribute("artist");
        K();
        if (d.indexOf("http://t.cn") >= 0) {
            var g = e + "-" + d;
            a.custEvent.fire(G, "insert", {value: g});
            n.hide()
        } else N.addMusic.request({url: d, title: e, artist: f})
    }, favSong: function (a) {
        M.currentPage = Math.floor(a / M.limit);
        N.favSongSearch.request({start: a, limit: M.limit})
    }, favSongPage: function (b) {
        a.preventDefault(b.evt);
        P.favSong(b.data.num * M.limit)
    }, favSongPrev: function () {
        a.preventDefault();
        if (!(M.currentPage < 1)) {
            M.currentPage--;
            P.favSong(M.currentPage * M.limit)
        }
    }, favSongNext: function () {
        a.preventDefault();
        if (!(M.currentPage >= M.totalPage - 1)) {
            M.currentPage++;
            P.favSong(M.currentPage * M.limit)
        }
    }, getOutlinkInfo: function (a) {
        N.getOutlinkInfo(a).request({short_url: a, source: "872034675"})
    }}, Q = {focus: function (b) {
        var c = a.fixEvent(b).target, d = I(c.value), e = d == E.linkInput || d === "" ? !1 : !0;
        e || (c.value = "");
        c.select()
    }, blur: function (b) {
        var c = a.fixEvent(b).target, d = I(c.value), e = d === "" || d == E.linkInput ? !1 : !0;
        e || (c.value = E.linkInput)
    }, clean: function () {
        a.setStyle(l.integrity, "display", "none");
        a.setStyle(l.songInfo, "display", "none");
        a.setStyle(l.linkError, "display", "none");
        a.setStyle(l.linkOptional, "display", "none")
    }, addSong: function () {
        var b = I(a.sizzle('[node-type="songName"]', l.outer)[0].value), c = I(a.sizzle('[node-type="artist"]', l.outer)[0].value), d = I(l.linkInput.value), e = a.sizzle('[node-type="errorSongName"]', l.outer)[0];
        K();
        if (b === "") {
            e.innerHTML = E.songInput;
            a.setStyle(e, "display", "")
        } else {
            if (a.bLength(b) > 30) {
                e.innerHTML = E.songError;
                a.setStyle(e, "display", "");
                return
            }
            if (a.bLength(c) > 30) {
                e.innerHTML = E.artistError;
                a.setStyle(e, "display", "");
                return
            }
            N.addMusic.request({title: b, url: d, artist: c})
        }
    }, search: function () {
        var a = I(l.linkInput.value);
        if (a !== "" && a !== E.linkInput) {
            N.parseMusic.request({url: a});
            K()
        }
    }, normal: function () {
        var b = I(l.linkInput.value);
        a.custEvent.fire(G, "insert", {value: b + " "});
        T.closeLayer()
    }}, R = function (b, c) {
        var d;
        if (c == "buffer" || c == "playing") {
            c == "playing" ? d = "W_ico16 icon_tostop" : c == "buffer" && (d = "W_loading");
            a.core.dom.isNode(w) && (w.className = d)
        }
    }, S = {init: function () {
        var c = l.miniplayer, d = a.getUniqueKey();
        window.origin_miniplayer_music = R;
        x = a.core.util.swf.create(c, C + "/home/static/swf/player/MiniPlayer.swf?version=" + b, {id: d, flashvars: {statusListener: "origin_miniplayer_music"}, paras: {quality: "high", allowScriptAccess: "always", wmode: "transparent", allowFullscreen: !0}, attrs: {name: d}})
    }, playSong: function (a) {
        var b = a.getAttribute("songUrl");
        if (b == s)x.songPlay(); else if (x && x.setUrl) {
            if (b.indexOf("http://t.cn/") >= 0) {
                var c = b.replace("http://t.cn/", "");
                P.getOutlinkInfo(c)
            } else x.setUrl(b);
            s = b
        }
    }, pauseSong: function () {
        w.className = "W_ico16 icon_toplay";
        x.songStop()
    }}, T = {closeLayer: function () {
        n.hide()
    }}, U = function () {
        var b = a.core.evt.delegatedEvent(l.outer);
        a.custEvent.define(G, "insert");
        a.custEvent.define(G, "hide");
        b.add("player", "click", P.controlSong);
        b.add("addSong", "click", Q.addSong);
        b.add("normalLink", "click", Q.normal);
        b.add("closeLayer", "click", T.closeLayer);
        b.add("song", "click", P.add);
        b.add("favsong", "click", P.addfavSong);
        b.add("favSongPage", "click", P.favSongPage);
        b.add("favPagPrev", "click", P.favSongPrev);
        b.add("favPagNext", "click", P.favSongNext);
        a.addEvent(l.songInput, "focus", P.focus);
        a.addEvent(l.songInput, "blur", P.blur);
        a.addEvent(l.songInput, "keyup", P.goSugg);
        a.addEvent(l.songInput, "keydown", P.keyhandler);
        a.addEvent(l.nameSearch, "click", P.search);
        a.addEvent(l.linkInput, "focus", Q.focus);
        a.addEvent(l.linkInput, "blur", Q.blur);
        a.addEvent(l.searchLink, "click", Q.search);
        a.lib.litter.tab(l.outer, {evtType: "click", tNodes: '[node-type="tabSelect"]', dNodes: '[node-type="block"]', className: "current S_txt1", removeClassNames: "pftb_lk S_line5 S_txt1 S_bg1", addClassNames: "pftb_lk current S_line5 S_txt1 S_bg5", cb: O.favTabClick});
        A = a.ui.mod.suggest({textNode: l.songInput, uiNode: l.suggestLay, actionType: "songItem", actionData: "index"});
        a.custEvent.add(A, "onIndexChange", P.setIndex);
        a.custEvent.add(A, "onSelect", P.searchChoose);
        setTimeout(S.init, 100)
    };
    return function (b, c) {
        L();
        if (!a.isNode(b))throw"common.bubble.music need el as first parameter!";
        n.setContent(p);
        n.setAlignPos(b, c.refer, {fail: function () {
            n.setLayout(b, {offsetX: -77, offsetY: 5})
        }});
        n.show();
        G.hide = n.hide;
        return G
    }
});
STK.register("common.editor.service.music", function (a) {
    return function (b) {
        var c = {}, d, e, f, g, h = function (c, d) {
            var e = d.value + " ", g = b.nodeList.textEl, h = g.value, i = e.length - 2;
            if (h.indexOf(e) != -1) {
                var j = h.indexOf(e);
                a.kit.extra.textareaUtils.setCursor(g, j + 1, i)
            } else b.API.insertText(e, f);
            var k = b.API.getCurrentLogType();
            b.API.addShortUrlLog(k)
        }, i = !1, j = function (e) {
            i = !1;
            d = a.common.bubble.music(g, {refer: b.nodeList.textEl});
            a.custEvent.add(d, "insert", h);
            a.custEvent.add(b, "close", c.hide);
            a.custEvent.add(d, "hide", function () {
                a.custEvent.remove(d, "hide", arguments.callee);
                a.custEvent.remove(d, "insert", h);
                a.custEvent.remove(b, "close", c.hide)
            });
            f = b.API.getCurPos()
        }, k = function (c) {
            a.core.evt.preventDefault();
            if (!i) {
                i = !0;
                var d = a.fixEvent(a.getEvent()).target;
                a.contains(b.nodeList.widget, d) ? g = d : g = b.nodeList.more;
                j(c)
            }
        };
        c.init = function (c, d, f) {
            b = c;
            e = d;
            a.addEvent(c.nodeList[e], "click", k)
        };
        c.clear = function () {
        };
        c.show = k;
        c.hide = function () {
            d && d.hide()
        };
        c.destroy = function () {
            b = null
        };
        return c
    }
});
STK.register("common.bubble.topic", function (a) {
    var b = '<div class="layer_send_topic" style="width:250px;" node-type="outer"><div class="laTopic_btn"><a href="#" class="W_btn_d" action-type="blank_topic" action-data="text=#在这里输入你想要说的话题#"><span><em class="ico_topic"></em>#L{插入话题}</span></a></div><div class="laTopic_hrline"></div><div class="laTopic_titS S_txt2">#L{热门话题：}</div><div class="tags_list" node-type="inner"></div></div>', c, d, e, f, g, h = a.kit.extra.language, i = {}, j = function () {
        c = a.ui.layer({template: h(b)});
        f = c.getBox();
        g = c.getDomList().inner;
        n();
        var d = a.common.trans.editor.getTrans("getTopic", {onComplete: function (a, b) {
            l(a.data)
        }}).request({})
    }, k = function () {
        e = a.ui.bubble();
        c || j();
        m.add();
        e.setContent(f);
        a.custEvent.add(e, "hide", function (b) {
            return function () {
                a.custEvent.remove(b, "hide", arguments.callee);
                m.destroy()
            }
        }(e))
    }, l = function (a) {
        g.innerHTML = a
    }, m = {add: function () {
        a.custEvent.add(i, "hide", function () {
            e.hide()
        })
    }, destroy: function () {
        a.custEvent.remove(i, "blank_topic");
        a.custEvent.remove(i, "hide");
        a.custEvent.remove(i, "insert")
    }}, n = function () {
        a.custEvent.define(i, "blank_topic");
        a.custEvent.define(i, "insert");
        a.custEvent.define(i, "hide");
        var b = STK.core.evt.delegatedEvent(f);
        b.add("add_topic", "click", function (b) {
            STK.core.evt.stopEvent();
            a.custEvent.fire(i, "insert", {value: b.data.text})
        });
        b.add("blank_topic", "click", function (b) {
            STK.core.evt.stopEvent();
            a.custEvent.fire(i, "blank_topic", {value: b.data.text})
        })
    };
    i.getBub = function () {
        return e
    };
    return function (b, c) {
        if (!a.isNode(b))throw"common.bubble.topic need el as first parameter!";
        k();
        e.setAlignPos(b, c.refer, {fail: function () {
            e.setLayout(b, {offsetX: -25, offsetY: 5})
        }});
        e.show();
        return i
    }
});
STK.register("common.editor.service.topic", function (a) {
    return function (b) {
        var c = {}, d, e, f = !1, g = a.kit.extra.textareaUtils, h = {text: "#在这里输入你想要说的话题#"}, i = function (a, d) {
            b.API.insertText(d.value);
            c.hide()
        }, j = function (d, e) {
            var f = e.value, g = b.nodeList.textEl, h = g.value, i = f.length - 2;
            if (h.indexOf(f) != -1) {
                var j = h.indexOf(f);
                a.kit.extra.textareaUtils.setCursor(g, j + 1, i)
            } else {
                b.API.insertText(f);
                var k = a.kit.extra.textareaUtils.getCursorPos(g);
                a.kit.extra.textareaUtils.setCursor(g, k - (i + 1), i)
            }
            c.hide();
            var l = b.API.getCurrentLogType();
            b.API.addShortUrlLog(l)
        }, k = function (d, e) {
            var f = a.kit.extra.textareaUtils.getSelectedText(b.nodeList.textEl), i = f.length * 1;
            if (i == 0 || h.text.indexOf(f) > -1)j(d, e); else {
                var k = "#" + f + "#";
                g.replaceText(b.nodeList.textEl, k);
                c.hide()
            }
        }, l = function () {
            a.custEvent.add(d, "insert", j);
            a.custEvent.add(d, "blank_topic", k);
            a.custEvent.add(b, "close", c.hide);
            a.custEvent.add(d, "hide", function () {
                a.custEvent.remove(d, "blank_topic");
                a.custEvent.remove(d, "hide", arguments.callee);
                a.custEvent.remove(d, "insert");
                a.custEvent.remove(b, "close")
            })
        }, m = function () {
            a.core.evt.preventDefault();
            var c, e = a.fixEvent(a.getEvent()).target;
            a.contains(b.nodeList.widget, e) ? c = e : c = b.nodeList.more;
            d = a.common.bubble.topic(c, {refer: b.nodeList.textEl});
            f || l()
        };
        c.init = function (c, d, f) {
            b = c;
            e = d;
            a.addEvent(c.nodeList[e], "click", m)
        };
        c.clear = function () {
        };
        c.show = m;
        c.hide = function () {
            d && d.getBub().hide()
        };
        c.destroy = function () {
            b = null
        };
        return c
    }
});
STK.register("ui.tip", function (a) {
    return function (b, c) {
        var d = {}, e, f, g, h, i, j, k, l, m = 10003, n, o, p, q, r = a.core.util.easyTemplate, s = a.kit.extra.language, t = {box: '<div node-type="outer" style="position:absolute;clear:both;display:none;overflow:hidden;z-index:10003;"><div node-type="inner"></div></div>', alert: '<#et temp data><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div node-type="msgDiv" class="content layer_mini_info"><p class="clearfix"><span class="icon_${data.type}"></span>${data.msg}&nbsp; &nbsp; &nbsp; </p></div></td></tr></tbody></table></#et>', confirm: '<#et temp data><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td><div class="content layer_mini_info"><p class="clearfix" node-type="info"><span node-type="icon" class="icon_${data.type}"></span><span node-type="info_text">${data.msg}</span></p><p class="noicon S_txt2" node-type="smallText" style="display:none"></p><p class="btn"><a action-type="ok" class="W_btn_d" href="javascript:void(0)"><span>#L{确定}</span></a><a class="W_btn_b" action-type="cancel" href="javascript:void(0)"><span>#L{取消}</span></a></p></div></td></tr></tbody></table></#et>', lite: '<#et temp data><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div class="content layer_mini_info_big" node-type="inner"><p class="clearfix"><span class="icon_${data.type}"></span>${data.msg}&nbsp;&nbsp;</p></div></td></tr></tbody></table></div></div></#et>'}, u = {ok: function () {
            d.aniHide();
            a.getType(c.okCallback) == "function" && c.okCallback()
        }, cancel: function () {
            d.aniHide();
            a.getType(c.cancelCallback) == "function" && c.cancelCallback()
        }}, v = function () {
            a.custEvent.add(e, "hide", function () {
                c.hideCallback && c.hideCallback();
                a.custEvent.remove(e, "hide", arguments.callee);
                clearTimeout(n)
            });
            e.setMask();
            e.show();
            e.setMiddle();
            c.timer && (n = setTimeout(e.hide, c.timer))
        }, w = {init: function () {
            w.pars();
            w.build();
            w.bind()
        }, pars: function () {
            c = a.parseParam({template: "", direct: "up", okCallback: a.funcEmpty, cancelCallback: a.funcEmpty, showCallback: a.funcEmpty, hideCallback: a.funcEmpty, type: "succ", msg: "", timer: 2e3}, c || {})
        }, build: function () {
            var d = a.builder(s(t.box)).list.outer[0];
            e = a.ui.layer(d);
            f = e.getDomList(!0);
            g = e.getBox();
            h = f.inner;
            var m = a.builder(s(r(c.template || t[b], {type: c.type, msg: c.msg}).toString()));
            h.appendChild(m.box);
            f = e.getDomList(!0);
            i = f.info;
            j = f.info_text;
            k = f.smallText;
            g.className = "W_layer";
            h.className = "bg";
            b == "lite" && v();
            l = a.objSup(e, ["destroy"])
        }, bind: function () {
            q = a.delegatedEvent(g);
            q.add("ok", "click", u.ok);
            q.add("cancel", "click", u.cancel)
        }};
        w.init();
        d = e;
        d.setTipWH = function () {
            p = d.getSize(!0);
            d.tipWidth = p.w;
            d.tipHeight = p.h;
            return d
        };
        d.setTipWH();
        d.setContent = function (a) {
            typeof a == "string" ? h.innerHTML = a : h.appendChild(a);
            d.setTipWH();
            return d
        };
        d.setText = function (b) {
            var c = a.sizzle('span[node-type="info_text"]', h)[0];
            typeof b == "string" && (c.innerHTML = b);
            d.setTipWH();
            return d
        };
        d.setSmallText = function (b) {
            var c = a.sizzle('p[node-type="smallText"]', h)[0];
            if (typeof b == "string") {
                c.innerHTML = b;
                c.style.display = ""
            }
        };
        d.setLayerXY = function (b) {
            b || a.log("ui.tip.setLayerXY need element as pNode");
            var e = a.core.dom.position(b), f = e.l, h = b.offsetWidth, i = b.offsetHeight, j = Math.min(Math.max(f + (h - d.tipWidth) / 2, a.scrollPos().left), a.scrollPos().left + STK.winSize().width - d.tipWidth), k = e.t;
            c.direct === "down" && (k += i);
            var l = [";"];
            l.push("z-index:", m++, ";");
            l.push("height:", d.tipHeight, "px;");
            l.push("top:", k, "px;");
            l.push("left:", j, "px;");
            g.style.cssText += l.join("")
        };
        d.aniShow = function () {
            g.style.height = "0px";
            g.style.display = "";
            o = a.core.ani.tween(g, {end: c.showCallback, duration: 250, animationType: "easeoutcubic"});
            if (c.direct === "down")o.play({height: d.tipHeight}, {staticStyle: "overflow:hidden;position:absolute;"}); else {
                var b = parseInt(g.style.top, 10) - d.tipHeight;
                o.play({height: d.tipHeight, top: Math.max(b, a.scrollPos().top)}, {staticStyle: "overflow:hidden;position:absolute;"})
            }
        };
        d.aniHide = function () {
            o = a.core.ani.tween(g, {end: function () {
                g.style.display = "none";
                g.style.height = d.tipHeight + "px";
                c.hideCallback()
            }, duration: 300, animationType: "easeoutcubic"});
            if (c.direct === "down")o.play({height: 0}, {staticStyle: "overflow:hidden;position:absolute;"}); else {
                var b = parseInt(g.style.top, 10) + d.tipHeight;
                o.play({height: 0, top: b}, {staticStyle: "overflow:hidden;position:absolute;"})
            }
        };
        d.destroy = function () {
            l.destroy();
            q.destroy();
            o && o.destroy();
            e = null
        };
        return d
    }
});
STK.register("kit.dom.parentElementBy", function (a) {
    return function (a, b, c) {
        if (!a || !b)throw new Error("传入的参数为空");
        var d = 0, e;
        a = a.parentNode;
        while (a && a.parentNode) {
            d++;
            e = c(a);
            if (e === !1)return!1;
            if (e === !0)return a;
            if (e === b)return null;
            a = a.parentNode;
            if (d > 3e4)return!1
        }
        return null
    }
});
STK.register("common.extra.imgUploadCode", function (a) {
    var b = a.kit.extra.language, c = {"-1": b("#L{没有登录}"), "-2": b("#L{没有收到PUT的数据}"), "-3": b("#L{没有指定cb参数}"), "-4": b("#L{没有发现提交上传文件}"), "-5": b("#L{该app没有开放图片上传服务}"), "-6": b("#L{SINAPRO或uid非法}"), "-7": b("#L{参数s值不被支持}"), "-8": b("#L{数据上传失败}"), "-9": b("#L{文件mime类型不支持}"), "-10": b("#L{文件字节数超限}"), "-11": b("#L{存储错误}")};
    return function (a) {
        return c[a]
    }
});
STK.register("common.trans.vote", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("add", {url: "/aj/vote/add?_wv=5", method: "post"});
    c("join", {url: "/aj/vote/join?_wv=5", method: "post"});
    return b
});
STK.register("common.feed.groupAndSearch.template.calendar", function (a) {
    var b = '<#et userlist data><div class="selector"><select node-type="month" class="month htc_select"><#if (data.hidePastMonth)><#if (!(data.start.year == data.showDate.year&& data.currDate.month>0))><option value="0" ${data.showDate.month==0?\'selected=""\':\'\'}>#L{一月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>1)||(data.end.year == data.showDate.year&& data.currDate.month<1)))><option value="1" ${data.showDate.month==1?\'selected=""\':\'\'}>#L{二月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>2)||(data.end.year == data.showDate.year&& data.currDate.month<2)))><option value="2" ${data.showDate.month==2?\'selected=""\':\'\'}>#L{三月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>3)||(data.end.year == data.showDate.year&& data.currDate.month<3)))><option value="3" ${data.showDate.month==3?\'selected=""\':\'\'}>#L{四月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>4)||(data.end.year == data.showDate.year&& data.currDate.month<4)))><option value="4" ${data.showDate.month==4?\'selected=""\':\'\'}>#L{五月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>5)||(data.end.year == data.showDate.year&& data.currDate.month<5)))><option value="5" ${data.showDate.month==5?\'selected=""\':\'\'}>#L{六月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>6)||(data.end.year == data.showDate.year&& data.currDate.month<6)))><option value="6" ${data.showDate.month==6?\'selected=""\':\'\'}>#L{七月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>7)||(data.end.year == data.showDate.year&& data.currDate.month<7)))><option value="7" ${data.showDate.month==7?\'selected=""\':\'\'}>#L{八月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>8)||(data.end.year == data.showDate.year&& data.currDate.month<8)))><option value="8" ${data.showDate.month==8?\'selected=""\':\'\'}>#L{九月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>9)||(data.end.year == data.showDate.year&& data.currDate.month<9)))><option value="9" ${data.showDate.month==9?\'selected=""\':\'\'}>#L{十月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>10)||(data.end.year == data.showDate.year&& data.currDate.month<10)))><option value="10" ${data.showDate.month==10?\'selected=""\':\'\'}>#L{十一月}</option></#if><#if (!(data.end.year == data.showDate.year&& data.currDate.month<11))><option value="11" ${data.showDate.month==11?\'selected=""\':\'\'}>#L{十二月}</option></#if><#else><option value="0" ${data.showDate.month==0?\'selected=""\':\'\'}>#L{一月}</option><option value="1" ${data.showDate.month==1?\'selected=""\':\'\'}>#L{二月}</option><option value="2" ${data.showDate.month==2?\'selected=""\':\'\'}>#L{三月}</option><option value="3" ${data.showDate.month==3?\'selected=""\':\'\'}>#L{四月}</option><option value="4" ${data.showDate.month==4?\'selected=""\':\'\'}>#L{五月}</option><option value="5" ${data.showDate.month==5?\'selected=""\':\'\'}>#L{六月}</option><option value="6" ${data.showDate.month==6?\'selected=""\':\'\'}>#L{七月}</option><option value="7" ${data.showDate.month==7?\'selected=""\':\'\'}>#L{八月}</option><option value="8" ${data.showDate.month==8?\'selected=""\':\'\'}>#L{九月}</option><option value="9" ${data.showDate.month==9?\'selected=""\':\'\'}>#L{十月}</option><option value="10" ${data.showDate.month==10?\'selected=""\':\'\'}>#L{十一月}</option><option value="11" ${data.showDate.month==11?\'selected=""\':\'\'}>#L{十二月}</option></#if></select><select node-type="year" class="year htc_select"><#list data.years as year><option value="${year}"${(data.showDate.year==year)?\' selected=""\':""}>${year}</option></#list></select></div><ul class="weeks"><li>#L{日}</li><li>#L{一}</li><li>#L{二}</li><li>#L{三}</li><li>#L{四}</li><li>#L{五}</li><li>#L{六}</li></ul><ul class="days"><#list data.dates as list><li><#if (list!="")><#if ((data.start.year==data.showDate.year&&data.start.month==data.showDate.month&&(data.start.date<=list&&list<=data.start.max))||(data.start.year==data.showDate.year&&data.start.month<data.showDate.month)||(data.start.year<data.showDate.year&&data.showDate.year<data.end.year)||(data.showDate.year==data.end.year&&data.showDate.month<data.end.month)||(data.showDate.year==data.end.year&&data.showDate.month==data.end.month&&list<=data.end.date))><a action-type="date" href="#date" onclick="return false;" title="${data.showDate.year}-${data.showDate.month+1}-${list}"year="${data.showDate.year}" month="${data.showDate.month+1}" day="${list}"${(data.today.year==data.showDate.year&&data.today.month==data.showDate.month&&list==data.showDate.date)?\' class="day"\':\'\'}><strong>${list}</strong></a><#else>${list}</#if></#if></li></#list></ul>';
    return b
});
STK.register("common.feed.groupAndSearch.include.calendar", function (a) {
    function k(a) {
        a = a || window.event;
        var c = a.target || a.srcElement, d = c.value;
        d != b.showDate.year && b.setYear(d)
    }

    function j(a) {
        a = a || window.event;
        var c = a.target || a.srcElement, d = c.value;
        d != b.showDate.month && b.setMonth(d)
    }

    function i(b) {
        var c = a.core.dom.builder(b).list;
        a.addEvent(c.year[0], "change", k);
        a.addEvent(c.month[0], "change", j);
        g.year = c.year[0];
        g.month = c.month[0]
    }

    function h() {
        g && g.year && a.removeEvent(g.year, "change", k);
        g && g.month && a.removeEvent(g.month, "change", j)
    }

    function f() {
        var a = arguments;
        this.today = this.getDefaultDate.apply(this, a);
        this.showDate = {};
        for (var b in this.today)this.showDate[b] = this.today[b];
        this.getKeyPoint.apply(this, a);
        this.currentDate = a[1].currentDate;
        this.getCurrentMonthInfo(a[1].hidePastMonth)
    }

    function e() {
        a.core.evt.stopEvent();
        a.core.evt.removeEvent(document.body, "click", d)
    }

    function d() {
        b.node.style.display = "none";
        c && (c.style.display = "none")
    }

    var b, c;
    f.prototype = {data: {}, defaultStartDate: new Date(2009, 7, 16, 0, 0, 0, 0), solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], maxMonthDay: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], solarDays: function (a, b) {
        return b == 1 ? a % 4 == 0 && a % 100 != 0 || a % 400 == 0 ? 29 : 28 : this.solarMonth[b]
    }, getDefaultDate: function () {
        var a = arguments, b, c, d, e, f = /^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/, g, h;
        if (a.length == 0)b = new Date; else if (f.test(a[0])) {
            b = a[0].match(f);
            c = b[1] * 1;
            d = b[2] * 1 - 1;
            e = b[3] * 1;
            b = new Date(c, d, e, 0, 0, 0, 0)
        } else a[0].constructor == Date ? b = a[0] : a.length == 3 ? b = new Date(a[0], a[1], a[2], 0, 0, 0, 0) : a[0] != "" && typeof a[0] == "string" ? b = new Date(a[0]) : b = new Date;
        h = {year: b.getFullYear(), month: b.getMonth(), date: b.getDate()};
        g = this.solarDays(h.year, h.month);
        h.max = g;
        return h
    }, getKeyPoint: function () {
        var a = arguments, b = a.length, c;
        if (b > 1) {
            c = a[b - 1];
            this.start = c.start != null ? c.start : this.defaultStartDate;
            this.end = c.end != null ? c.end : new Date;
            this.callback = c.callback;
            this.source = c.source;
            this.start.toString().indexOf("-") != -1 && (this.start = this.start.replace(/-/g, "/"));
            this.end.toString().indexOf("-") != -1 && (this.end = this.end.replace(/-/g, "/"));
            this.defaultStartDate = new Date(this.start)
        } else {
            this.start = this.defaultStartDate;
            this.end = new Date
        }
        this.start = this.getDefaultDate.call(this, this.start);
        this.end = this.getDefaultDate.call(this, this.end)
    }, getCurrentMonthInfo: function (b) {
        var c = this.showDate, d = c.year, e = c.month, f = c.date, g = new Date(d, e, 1, 0, 0, 0, 0);
        this.count = this.solarDays(d, e);
        this.firstWeek = g.getDay();
        var h = a.core.arr.copy(this.maxMonthDay), i = this.firstWeek == 0 ? [] : Array(this.firstWeek).join().split(",");
        i = i.concat(h.splice(0, this.count));
        var j = $CONFIG != null && $CONFIG.timeDiff != null ? $CONFIG.timeDiff : 0, k = [], l = this.defaultStartDate.getFullYear(), m = (new Date((new Date(this.end.year, this.end.month, this.end.date)).getTime() - j)).getFullYear(), n = m - l, o = 0;
        while (o <= n) {
            k.push(l + o);
            o++
        }
        this.data = {today: this.today, showDate: this.showDate, start: this.start, end: this.end, dates: i, years: k, hidePastMonth: b, currDate: this.getDefaultDate()};
        b && (this.data.isStartOrEnd = this.data.start.year == this.showDate.year || this.data.end.year == this.showDate.year);
        this.showUI()
    }, showUI: function () {
        var e = a.core, f, g, j, k, l = this.getContainer();
        if (a.core.util.browser.IE6 && !c) {
            c = document.createElement("iframe");
            c.style.cssText = "visibility:visible;position:absolute;background-color:#fff;width:172px;height:147px;border:0;"
        }
        if (l == null) {
            f = a.common.feed.groupAndSearch.template.calendar;
            f = '<div node-type="calendar" class="pc_caldr">' + f + "</div>";
            g = e.util.easyTemplate(f);
            j = g(this.data).toString();
            j = a.kit.extra.language(j);
            k = e.dom.builder(j);
            a.kit.dom.layoutPos(k.list.calendar[0], this.source, {pos: "left-bottom", offsetX: 0, offsetY: 0});
            l = this.getContainer();
            b = this;
            this.delegate(l);
            a.core.evt.addEvent(document.body, "click", d)
        } else {
            f = a.common.feed.groupAndSearch.template.calendar;
            g = e.util.easyTemplate(f);
            j = g(this.data).toString();
            j = a.kit.extra.language(j);
            h();
            l.innerHTML = j;
            l.style.cssText = "display:block;";
            a.kit.dom.layoutPos(l, this.source, {pos: "left-bottom", offsetX: 0, offsetY: 0});
            l.style.display != "none" && a.core.evt.addEvent(document.body, "click", d);
            b = this;
            i(l)
        }
        c && (c.style.display = "");
        c && a.kit.dom.layoutPos(c, this.source, {pos: "left-bottom", offsetX: 0, offsetY: 0});
        this.node = l;
        a.core.evt.stopEvent()
    }, getContainer: function () {
        var b = a.core.dom.sizzle('[node-type="calendar"]', document.body);
        b = b.length > 0 ? b[0] : null;
        return b
    }, setYear: function (a) {
        this.showDate.year = a;
        a == this.start.year && (this.showDate.month = this.start.month);
        a == this.end.year && (this.showDate.month = this.end.month);
        this.getCurrentMonthInfo(this.data.hidePastMonth);
        this.showUI()
    }, setMonth: function (a) {
        this.showDate.month = a * 1;
        this.getCurrentMonthInfo(this.data.hidePastMonth);
        this.showUI()
    }, setDate: function (a) {
        a = a.replace(/(\d+)/g, function (a, b) {
            return b.length == 1 ? "0" + b : b
        });
        d();
        this.source.value = a;
        this.callback && typeof this.callback == "function" && this.callback(a)
    }, delegate: function (c) {
        var d = a.core.evt.delegatedEvent(c);
        d.add("date", "click", function (a) {
            b.setDate(a.el.title)
        });
        i(c);
        a.core.evt.addEvent(c, "click", e)
    }};
    var g = {};
    return f
});
STK.register("lib.litter.uploadPic", function (a) {
    return function (b, c) {
        var d = {}, e, f = a.core.evt.addEvent, g = "weibo.com/", h = "picupload.service.weibo.com", i = c, j = {complete: function (b, c) {
            a.log("complete", b, i);
            if (!b || b.ret < 0)i.err ? i.err(b) : i.complete(b); else {
                var d = j.parseInfo(b);
                a.log("result", d, b, i);
                i.complete(d)
            }
        }, parseInfo: function (b) {
            var c = a.common.extra.imageURL(b.pid), d = [], e, f;
            return{url: c, pid: b.pid}
        }}, k = {upload: function (b, d) {
            var e = d.value;
            if (a.core.str.trim(e) !== "") {
                c.start && c.start.call();
                a.core.io.ijax({url: "http://" + h + "/interface/pic_upload.php", form: b, abaurl: "http://" + document.domain + "/aj/static/upimgback.html?_wv=5", abakey: "cb", onComplete: j.complete, onTimeout: c.timeout, args: {marks: 1, app: "miniblog", s: "rdxt"}})
            }
        }}, l = {}, m = {}, n = function () {
            o();
            p();
            r();
            t();
            u()
        }, o = function () {
            if (!b)throw"node is not defined"
        }, p = function () {
            e = a.kit.dom.parseDOM(a.core.dom.builder(b).list);
            if (!e.fileBtn)throw"[common.content.uploadPic]: nodes.fileBtn is not defined.";
            if (!e.form)throw"[common.content.uploadPic]: nodes.form is not defined."
        }, q = function () {
        }, r = function () {
            f(e.fileBtn, "change", function () {
                k.upload(e.form, e.fileBtn)
            })
        }, s = function () {
        }, t = function () {
        }, u = function () {
        }, v = function () {
        }, w = {};
        d.doUpload = k.upload;
        d.destroy = v;
        n();
        return d
    }
});
STK.register("common.bubble.vote", function (a) {
    var b = a.kit.extra.language, c = a.core.util.templet, d = a.common.flash.uploadLog(), e, f = function (a, b, c, d, e) {
        if (a > b)return"";
        var f = [];
        d || (d = "");
        e || (e = "");
        for (var g = a; g <= b; g++) {
            var h = g;
            !c || (h = h < 10 ? "0" + h : "" + h);
            f.push('<option value="' + h + '">' + d + h + e + "</option>")
        }
        return f.join("")
    }, g = function (a) {
        var b = new Date, c;
        switch (a) {
            case"Y":
                c = b.getFullYear();
                break;
            case"M":
                c = b.getMonth() + 1;
                c < 10 && (c = "0" + c);
                break;
            case"D":
                c = b.getDate();
                c < 10 && (c = "0" + c);
                break;
            case"H":
                c = b.getHours();
                c < 10 && (c = "0" + c);
                break;
            case"I":
                c = b.getMinutes();
                c < 10 && (c = "0" + c);
                break;
            case"S":
                c = b.getSeconds();
                c < 10 && (c = "0" + c);
                break;
            default:
                c = b.getFullYear() + "-" + (b.getMonth() + 1) + "-" + b.getDate() + " " + b.getHours() + ":" + b.getMinutes() + ":" + b.getSeconds()
        }
        return c
    }, h = function (a) {
        var b = a ? new Date(a) : new Date, c = {year: b.getFullYear(), month: b.getMonth() + 1, day: b.getDate()};
        c.month < 10 && (c.month = "0" + c.month);
        c.day < 10 && (c.day = "0" + c.day);
        return c.year + "-" + c.month + "-" + c.day
    }, i = function () {
        var a = "" + Math.random();
        return a.replace(/^0\./, "s_")
    }, j = {FRAME: '<div node-type="vote" class="feed_vote"><div class="profile_tab layer_tab S_line5"><ul class="pftb_ul S_line1"><li class="pftb_itm S_line1" ><a node-type="tabSelect" class="pftb_lk current S_line5 S_txt1 S_bg5" href="javascript:void(0)">#L{发起文字投票}</a></li><li class="pftb_itm pftb_itm_lst S_line1"><a node-type="tabSelect" class="pftb_lk S_line5 S_txt1 S_bg1" href="javascript:void(0)">#L{发起图片投票}</a></li></p></div><div class="layer_vote"><dl><dt>#L{创建标题}：<p node-type="titleTips"><em class="S_txt2">#L{标题最多25字}</em></p></dt><dd class="vote_text"><input node-type="title" type="text" name="title" class="W_input" /></dd><dt>#L{投票选项}：<p node-type="itemsTips"><em class="S_txt2">#L{至少2项,每项最多20字}</em></p></dt></dl><dl node-type="items"></dl><dl><dd><a href="#" onclick="return false;" node-type="addItems"><em class="addicon">+</em><span class="txt">#L{添加选项}</span></a></dd><dt>#L{单选/多选}：<select name="num" node-type="num"><option value="1">#L{单选}</option></select></dt></dl><dl><dt><a node-type="advancedBtn" class="W_moredown" href="#" onclick="return false;"><span class="txt">#L{高级设置}</span><span class="W_arrow"><em class="down">◆</em></span></a></dt></dl><dl node-type="advanced"><dd>#L{截止时间}：<span class="date"><select node-type="deadline"><option value="1 week">#L{一周}</option><option value="1 month">#L{一个月}</option><option value=".5 year">#L{半年}</option><option value="1 year">#L{一年}</option><option value="modify">#L{自定义}</option></select></span><p style="display:none;" node-type="modify"><input name="date" type="text" node-type="date_select" class="date_select" readonly /><span class="date"><select name="hours">' + f(0, 23, 1) + '</select>#L{时}</span><span class="date"><select name="minutes">' + f(0, 59, 1) + "</select>#L{分}</span></p>" + "</dd>" + '<dd>#L{投票结果}：<span node-type="voteResult"><label for="vote_visibility_0"><input id="vote_visibility_0" value="0" type="radio" name="visibility" class="W_radio" checked="checked" />#L{投票后可见}</label><label for="vote_visibility_1"><input id="vote_visibility_1" value="1" type="radio" name="visibility" class="W_radio" />#L{任何人可见}</label></dd>' + "<dt>#L{投票说明}：" + '<div style="display:none" node-type="pictureArea">' + '<form node-type="pictureForm" id="vote_picture_upload" name="vote_picture_upload" target="upload_target" enctype="multipart/form-data" method="POST" action=""><p class="img_update"><a href="#" onclick="return false;"><span class="W_ico16 icon_sw_img"></span>#L{插入图片}</a><em node-type="fileBtn"><input action-type="picuploadinput" type="file" name="pic1" /></em></p></form>' + '<p class="W_loading"><span>#L{上传中...}<a action-type="cancel" href="#" onclick="return false">#L{取消}</a></span></p>' + '<p class="S_spetxt"><span class="icon_del"></span><em node-type="updateImageTips"></em></p>' + '<p class="img_updated"><span></span><em node-type="picturePreview"></em> <a action-type="cancel" href="#" onclick="return false;">#L{删除}</a></p>' + "</div>" + "</dt>" + '<dd><textarea node-type="info" class="introduce"></textarea></dd>' + "</dl>" + '<dl node-type="secodeArea" style="display:none;">' + '<dd class="proving">' + '<input node-type="secode" type="text" class="W_input" name="secode">' + b('<img action-type="secodeImg" node-type="secodeImg" width="75" height="24" title="#L{看不清，换一个}" alt="#L{看不清，换一个}" />') + '<p node-type="secodeTips"></p>' + "</dd>" + "</dl>" + "<dl>" + '<dd><a node-type="submitBtn" href="#" onclick="return false;" class="W_btn_d"><span>#L{发起}</span></a><div node-type="submitTips"><em class="S_txt2">#L{发起后可增加，不可删除或修改选项}</em></div></dd>' + "</dl>" + "</div>" + "</div>", ITEM: '<dd><span class="num">#{NUMBER}</span><input class="W_input" type="text" action-type="item" /><a action-type="removeItem" class="W_ico12 icon_close" href="#" onclick="return false;"></a></dd>', ITEM_PIC: '<dd class="options_pic"><span class="num">#{NUMBER}</span><div class="option_pic"><div class="pic"><img node-type="pic" height="50" width="50" src="' + $CONFIG.imgPath + 'style/images/index/update_pic.png" /><span style="visibility:hidden" node-type="ruTips">' + b("#L{重新上传}") + '</span><form node-type="form" enctype="multipart/form-data" method="POST"><input name="pic1" node-type="fileBtn" type="file" /></form></div>' + '<div class="option"><input class="W_input" type="text" action-type="item" /><a action-type="removeItem" href="#" onclick="return false;" class="W_ico12 icon_close"></a><p class="S_spetxt" node-type="tips"></p></div>' + "</div>" + "</dd>", ITEM_PIC_UPLOADING: $CONFIG.imgPath + "style/images/index/vote_img_loading.png", EDITOR: b("#L{我发起了一个投票}【#{TITLE}】，#L{地址} #{SHORTURL}"), ADVANCED: {PICUPLOADINPUT: '<input action-type="picuploadinput" type="file" name="pic1" />', PICUPLOADTHUMBFRAME: '<div node-type="outer" class="W_layer"><div class="bg"><table border="0" cellspacing="0" cellpadding="0"><tr><td><div node-type="inner" class="content" style="padding:5px;"></div></td></tr></table><div class="arrow arrow_t"></div></div></div>', PICUPLOADTHUMBNAIL: '<img src="#{URL}" />'}, TITLE: {DEFAULT: b('<em class="S_txt2">#L{标题最多25字}</em>'), SUCCESS: b('<span class="icon_succ"></span><em class="S_txt2">#L{标题最多25字}</em>'), EMPTY: b('<span class="icon_del"></span><em class="S_spetxt">#L{标题不能为空}</em>')}, ITEMS: {DEFAULT: b('<em class="S_txt2">#L{至少2项,每项最多20字}</em>'), LESS: b('<span class="icon_del"></span><em class="S_spetxt">#L{选项太少啦，至少两项哦。}</em>')}, SUBMIT: {DEFAULT: b('<em class="S_txt2">#L{发起后不可删除或修改选项}</em>'), ERROR: '<span class="icon_del"></span><em class="S_spetxt">#{MESSAGE}</em>', ING: b('<p class="W_loading"><span>#L{正在提交}</span></p>'), SUCCESS: b("#L{投票发起成功}&nbsp;")}, SECODE: {DEFAULT: b('<em class="S_txt2">#L{请输入验证码}</em>'), EMPTY: b('<span class="icon_del"></span><em class="S_spetxt">#L{验证码不能为空}</em>'), ERROR: b('<span class="icon_del"></span><em class="S_spetxt">#L{验证码错误，请重新输入}</em>')}, PICTUREUPLOAD: {ERRORSIZE: b("#L{请上传5M以内的JPG、GIF、PNG图片。}")}}, k = {}, l = {}, m, n, o, p, q, r = {}, s = "1 week", t = {}, u = 0, v = !1, w = !1, x = 0, y = !1, z = null, A, B, C = !1, D = ["normal", "picture"], E, F = {itemMin: 5, itemMax: 10, defaultItem: 5, addItemStep: 1, itemMaxLen: 20, titleMaxLen: 25, maintain: 365, itemMinActive: 2}, G, H = {init: function () {
        H.bind();
        I.init()
    }, changeTab: function (a) {
        H.stopLsn();
        y = !1;
        w = !1;
        v = !1;
        u = 0;
        E = H[a]();
        H.resetTitle();
        H.resetDeadline();
        H.resetVoteResult();
        H.clearItems();
        H.itemsNum();
        H.hideCalendar();
        H.hideAdvanced();
        H.startLsn();
        switch (a) {
            case 0:
            case"default":
                F.itemMax = 20;
                I.enable();
                break;
            case 1:
            case"picture":
                F.itemMax = 15;
                I.disable();
                break;
            default:
                F.itemMax = 20;
                I.enable()
        }
        H.addItems(F.defaultItem);
        n.itemsTips.innerHTML = "";
        n.titleTips.innerHTML = "";
        n.secodeTips.innerHTML = "";
        n.submitTips.innerHTML = "";
        setTimeout(function () {
            n.title.focus()
        }, 0)
    }, bind: function () {
        a.lib.litter.tab(m, {evtType: "click", tNodes: n.tabSelect, className: "current S_txt1", removeClassNames: "pftb_lk S_line5 S_txt1 S_bg1", addClassNames: "pftb_lk current S_line5 S_txt1 S_bg5", cb: function (a) {
            H.changeTab(D[a.idx])
        }});
        r.items = a.core.evt.delegatedEvent(n.items);
        r.secode = a.core.evt.delegatedEvent(n.secodeArea);
        r.items.add("removeItem", "click", H.removeItem);
        r.items.add("item", "click", function () {
            n.itemsTips.innerHTML = j.ITEMS.DEFAULT
        });
        r.secode.add("secodeImg", "click", H.secodeReflush);
        a.addEvent(n.addItems, "click", H.addItemStep);
        a.addEvent(n.advancedBtn, "click", H.toggleAdvanced);
        a.addEvent(n.deadline, "change", H.toggleDeadline);
        a.addEvent(n.date_select, "click", H.showCalendar);
        a.addEvent(n.submitBtn, "click", H.submit);
        a.addEvent(n.info, "click", H.showInfo);
        a.addEvent(n.info, "blur", H.hideInfo);
        a.addEvent(n.title, "keyup", H.getTitle);
        a.addEvent(n.secode, "keyup", H.getSecode)
    }, startLsn: function () {
        l.flushNum = window.setInterval(H.itemsReflushStatus, 500)
    }, stopLsn: function () {
        for (var a in l)window.clearInterval(l[a])
    }, getBub: function () {
        return p
    }, hide: function () {
        setTimeout(p.hide, 10);
        C = !1;
        a.custEvent.remove(k, "hide")
    }, show: function () {
        p.show()
    }, itemsNum: function () {
        u = a.sizzle("dd", n.items).length
    }, itemsReMark: function () {
        var b = a.sizzle("dd", n.items);
        for (var c = 0; c < u; c++)b[c].firstChild.innerHTML = c + 1 + "."
    }, addItems: function (a) {
        E.addItems(a);
        H.removeItemsBtn.autoToggle();
        H.addItemsBtn.autoToggle()
    }, addItemStep: function () {
        H.addItems(F.addItemStep)
    }, clearItems: function () {
        n.items.innerHTML = ""
    }, addItemsBtn: {show: function () {
        n.addItems.style.display = ""
    }, hide: function () {
        n.addItems.style.display = "none"
    }, autoToggle: function () {
        u < F.itemMax ? H.addItemsBtn.show() : H.addItemsBtn.hide()
    }}, removeItem: function (a) {
        setTimeout(function () {
            H.itemsNum();
            E.removeItem(a.el);
            H.itemsReMark();
            H.removeItemsBtn.autoToggle();
            H.addItemsBtn.autoToggle()
        }, 0)
    }, removeItemsBtn: {get: function () {
        return a.sizzle('a[action-type="removeItem"]', n.items)
    }, show: function () {
        var a = H.removeItemsBtn.get();
        if (a.length > 0)for (var b in a)a[b].style.display = ""
    }, hide: function () {
        var a = H.removeItemsBtn.get();
        if (a.length > 0)for (var b in a)a[b].style.display = "none"
    }, autoToggle: function () {
        u > F.itemMin ? H.removeItemsBtn.show() : H.removeItemsBtn.hide()
    }}, getTitle: function () {
        var b = a.core.str.trim(n.title.value);
        if (b == "")n.titleTips.innerHTML = j.TITLE.DEFAULT; else {
            b.length >= F.titleMaxLen && (b = b.slice(0, F.titleMaxLen));
            n.titleTips.innerHTML = j.TITLE.SUCCESS
        }
        n.title.value != b && (n.title.value = b);
        return b
    }, resetTitle: function () {
        n.title.value = "";
        H.getTitle()
    }, itemsFormat: function () {
        var b = a.sizzle('input[action-type="item"]', n.items);
        if (b && b.length > 0) {
            var c;
            for (var d in b) {
                c = b[d].value;
                c = a.core.str.trim(c).replace(/,/, "").slice(0, F.itemMaxLen);
                b[d].value != c && (b[d].value = c)
            }
        }
    }, itemsReflushStatus: function () {
        H.itemsFormat();
        var a = E.getItemsData();
        if (x != a.length) {
            H.flushNum(a.length);
            x = a.length
        }
    }, getItemsFormData: function () {
        H.itemsFormat();
        var a = E.getItemsFormData();
        return a
    }, getVoteResult: function () {
        var b = a.sizzle("[name=visibility]", n.vote);
        for (var c in b)if (b[c].checked == !0)return b[c].value;
        return 0
    }, resetVoteResult: function () {
        a.sizzle("[name=visibility]", n.vote)[0].checked = !0
    }, getDeadline: function () {
        var b = n.deadline.value, c = {};
        c.hh = g("H");
        c.mm = g("I");
        switch (b) {
            case"1 week":
                c.date = h((Math.round(+(new Date) / 1e3) + 604800) * 1e3);
                break;
            case"1 month":
                c.date = h((Math.round(+(new Date) / 1e3) + 2592e3) * 1e3);
                break;
            case".5 year":
                c.date = h((Math.round(+(new Date) / 1e3) + 15724800) * 1e3);
                break;
            case"1 year":
                c.date = h((Math.round(+(new Date) / 1e3) + 31536e3) * 1e3);
                break;
            default:
                c.date = a.sizzle("[name=date]", n.modify)[0].value;
                c.hh = a.sizzle("[name=hours]", n.modify)[0].value;
                c.mm = a.sizzle("[name=minutes]", n.modify)[0].value
        }
        return c
    }, getSecode: function () {
        var b = a.core.str.trim(n.secode.value);
        if (b == "") {
            n.secodeTips.innerHTML = j.SECODE.DEFAULT;
            return!1
        }
        n.secodeTips.innerHTML = "";
        return b
    }, secodeReflush: function () {
        if (y) {
            n.secodeArea.style.display = "";
            n.secodeImg.src = z + "&ts=" + (new Date).getTime();
            n.secodeTips.innerHTML = j.SECODE.DEFAULT;
            n.secode.value = "";
            n.secode.focus()
        } else n.secodeArea.style.display = "none"
    }, flushNum: function (b) {
        n.num.innerHTML = "";
        var c;
        c = a.C("option");
        c.value = "1";
        c.innerHTML = "单选";
        n.num.appendChild(c);
        if (b >= 2)for (var d = 2; d <= b; d++) {
            c = a.C("option");
            c.value = d;
            c.innerHTML = "最多选 " + d + " 项";
            n.num.appendChild(c)
        }
    }, showAdvanced: function () {
        n.advancedBtn.className = "W_moreup";
        n.advanced.style.display = "";
        v = !0
    }, hideAdvanced: function () {
        n.advancedBtn.className = "W_moredown";
        n.advanced.style.display = "none";
        H.hideCalendar();
        v = !1
    }, toggleAdvanced: function () {
        v ? H.hideAdvanced() : H.showAdvanced()
    }, showCalendar: function () {
        new a.common.feed.groupAndSearch.include.calendar(n.date_select.value, {source: n.date_select, start: t.startDate, end: t.endDate, currentDate: t.currentDate, hidePastMonth: !0})
    }, hideCalendar: function () {
        var b = a.sizzle('[node-type="calendar"]', document.body);
        b && b[0] && (b[0].style.display = "none")
    }, lastDeadline: function () {
        s != n.deadline.value && n.deadline.value != "modify" && (s = n.deadline.value)
    }, showDeadline: function () {
        t.startDate = h();
        t.endDate = h((Math.round(+(new Date) / 1e3) + F.maintain * 86400) * 1e3);
        switch (s) {
            case"1 week":
                t.currentDate = h((Math.round(+(new Date) / 1e3) + 604800) * 1e3);
                break;
            case"1 month":
                t.currentDate = h((Math.round(+(new Date) / 1e3) + 2592e3) * 1e3);
                break;
            case".5 year":
                t.currentDate = h((Math.round(+(new Date) / 1e3) + 15724800) * 1e3);
                break;
            case"1 year":
                t.currentDate = h((Math.round(+(new Date) / 1e3) + 31536e3) * 1e3);
                break;
            default:
                t.currentDate = h((Math.round(+(new Date) / 1e3) + 604800) * 1e3)
        }
        n.date_select.value = t.currentDate;
        a.sizzle("[name=hours]", n.modify)[0].value = g("H");
        a.sizzle("[name=minutes]", n.modify)[0].value = g("I");
        n.modify.style.display = ""
    }, hideDeadline: function () {
        n.modify.style.display = "none"
    }, toggleDeadline: function () {
        H.lastDeadline();
        n.deadline.value == "modify" ? H.showDeadline() : H.hideDeadline()
    }, resetDeadline: function () {
        H.hideDeadline();
        s = "1 week";
        n.deadline.value = a.sizzle("option", n.deadline)[0].value
    }, showInfo: function () {
        n.info.style.height = "100px"
    }, hideInfo: function () {
        n.info.value = a.core.str.trim(n.info.value);
        n.info.value == "" && (n.info.style.height = "")
    }, getFormData: function () {
        var b = !0, c = H.getDeadline(), d = H.getTitle();
        if (!d) {
            n.titleTips.innerHTML = j.TITLE.EMPTY;
            if (b) {
                a.core.util.scrollTo(n.titleTips, {step: 10});
                n.title.focus();
                a.common.extra.shine(n.title)
            }
            b &= !1
        }
        var e = H.getItemsFormData();
        if (!e) {
            n.itemsTips.innerHTML = j.ITEMS.LESS;
            b && a.core.util.scrollTo(n.titleTips, {step: 10});
            b &= !1
        }
        if (y) {
            var f = H.getSecode();
            if (!f) {
                n.secodeTips.innerHTML = j.SECODE.EMPTY;
                if (b) {
                    n.secode.focus();
                    a.common.extra.shine(n.secode)
                }
                b &= !1
            }
            c.secode = f
        }
        if (!!b) {
            c.title = d;
            c.items = e;
            c.vote_result = H.getVoteResult();
            c.num = n.num.value;
            c.pid = I.getPid();
            c.info = a.core.str.trim(n.info.value);
            c.poll_category = G;
            return c
        }
    }, submit: function () {
        if (!w) {
            w = !0;
            o = H.getFormData();
            if (!o) {
                w = !1;
                return
            }
            n.submitTips.innerHTML = j.SUBMIT.ING;
            a.common.trans.vote.getTrans("add", {onComplete: H.handle}).request(o)
        }
    }, handle: function (b) {
        n.submitTips.innerHTML = "";
        if (b.code == "100000") {
            A = a.ui.tip("alert", {msg: j.SUBMIT.SUCCESS});
            A.setLayerXY(n.submitBtn);
            A.aniShow();
            window.setTimeout(function () {
                A.aniHide();
                A = null;
                a.custEvent.fire(k, "insert", c(j.EDITOR, {TITLE: o.title, SHORTURL: b.data.short_url}));
                w = !1
            }, 1200)
        } else {
            if (b.code == "100024") {
                y = !0;
                z = b.data.url;
                w = !1
            } else if (b.code == "100025") {
                n.secodeTips.innerHTML = j.SECODE.ERROR;
                a.common.extra.shine(n.secode);
                w = !1
            } else if (b.code == "100026") {
                y = !1;
                A = a.ui.tip("alert", {msg: b.msg + "&nbsp;", type: "del"});
                A.setLayerXY(n.submitBtn);
                A.aniShow();
                window.setTimeout(function () {
                    A.aniHide();
                    A = null;
                    w = !1
                }, 3e3)
            } else if (b.code == "100030") {
                n.itemsTips.innerHTML = c(j.SUBMIT.ERROR, {MESSAGE: b.msg});
                w = !1
            } else {
                n.submitTips.innerHTML = c(j.SUBMIT.ERROR, {MESSAGE: b.msg});
                w = !1
            }
            H.secodeReflush()
        }
    }};
    H.normal = function () {
        return function () {
            G = 0;
            var b = {addItems: function (b) {
                F.itemMax <= u + b && (b = F.itemMax - u);
                if (b > 0) {
                    for (var d = 0; d < b; d++)n.items.appendChild(a.core.dom.builder(c(j.ITEM, {NUMBER: u++ + 1 + "."})).box.firstChild);
                    setTimeout(function () {
                        a.sizzle("input", n.items).pop().focus()
                    }, 0)
                }
            }, removeItem: function (b) {
                a.core.dom.removeNode(b.parentNode);
                u--
            }, getItemsData: function () {
                var b = [], c = a.sizzle('input[action-type="item"]', n.items), d;
                for (var e in c) {
                    d = c[e].value;
                    !!d && b.push(d)
                }
                return b
            }, getItemsFormData: function () {
                var a = b.getItemsData();
                return a.length >= F.itemMinActive ? a.join(",") : ""
            }, destroy: function () {
            }};
            return b
        }
    }();
    H.picture = function () {
        return function () {
            G = 1;
            var b = 0, d = {addItems: function (d) {
                F.itemMax <= u + d && (d = F.itemMax - u);
                if (d > 0) {
                    var e, f, g;
                    for (var h = 0; h < d; h++) {
                        e = a.core.dom.builder(c(j.ITEM_PIC, {NUMBER: u++ + 1 + "."}));
                        f = e.box.firstChild;
                        g = a.kit.dom.parseDOM(e.list);
                        n.items.appendChild(f);
                        a.lib.litter.uploadPic(f, {start: function (c) {
                            return function () {
                                c.pic.setAttribute("last", c.pic.getAttribute("src"));
                                c.pic.setAttribute("src", j.ITEM_PIC_UPLOADING);
                                a.setStyle(c.ruTips, "visibility", "hidden");
                                b++
                            }
                        }(g), err: null, complete: function (c) {
                            return function (d) {
                                if (d.pid) {
                                    c.pic.setAttribute("src", a.common.extra.imageURL(d.pid, {size: "square"}));
                                    c.pic.setAttribute("pid", d.pid);
                                    c.tips.innerHTML = ""
                                } else if (d.ret && d.ret < 0) {
                                    c.pic.setAttribute("src", c.pic.getAttribute("last"));
                                    d.ret == "-4" || d.ret == "-9" || d.ret == "-10" ? c.tips.innerHTML = j.PICTUREUPLOAD.ERRORSIZE : c.tips.innerHTML = a.common.extra.imgUploadCode(d.ret)
                                }
                                a.setStyle(c.ruTips, "visibility", "visible");
                                b--
                            }
                        }(g)})
                    }
                    setTimeout(function () {
                        a.sizzle("input", n.items).pop().focus()
                    }, 0)
                }
            }, removeItem: function (b) {
                var c = a.kit.dom.parentElementBy(b, n.items, function (a) {
                    if (a.nodeName.toLowerCase() == "dd")return!0
                });
                a.core.dom.removeNode(c);
                u--
            }, getItemsData: function () {
                var b = [], c = a.sizzle(".option_pic", n.items), d, e, f;
                for (var g in c) {
                    f = {};
                    e = a.sizzle('img[node-type="pic"]', c[g])[0].getAttribute("pid");
                    d = a.sizzle('input[action-type="item"]', c[g])[0].value;
                    e && (f.pid = e);
                    d && (f.content = d);
                    (e || d) && (b = b.concat([f]))
                }
                return b
            }, getItemsFormData: function () {
                var b = d.getItemsData();
                return b.length >= F.itemMinActive ? a.core.json.jsonToStr(b) : ""
            }, canBeClose: function () {
                b > 0 ? p.stopBoxClose() : p.startBoxClose()
            }, destroy: function () {
            }};
            return d
        }
    }();
    var I = {img: {}, pictureInUploading: !1, init: function () {
        var b = a.sizzle("p", n.pictureArea);
        n.pictureAreaItems = {upload: b[0], uploading: b[1], uploadfail: b[2], uploaded: b[3]};
        I.bind()
    }, enable: function () {
        I.show.upload();
        n.pictureArea.style.display = ""
    }, disable: function () {
        n.pictureArea.style.display = "none";
        I.stopUpload();
        I.hideAll()
    }, hideAll: function () {
        for (var a in n.pictureAreaItems)n.pictureAreaItems[a].style.display = "none"
    }, show: {upload: function () {
        I.img = {};
        I.hideAll();
        n.pictureAreaItems.upload.style.display = ""
    }, uploading: function () {
        I.hideAll();
        n.pictureAreaItems.uploading.style.display = ""
    }, uploadfail: function () {
        I.hideAll();
        n.pictureAreaItems.upload.style.display = "";
        n.pictureAreaItems.uploadfail.style.display = ""
    }, uploaded: function () {
        I.hideAll();
        n.pictureAreaItems.uploaded.style.display = ""
    }}, startUpload: function () {
        I.pictureInUploading = !0;
        p.stopBoxClose();
        I.show.uploading()
    }, upload: function () {
        if (!I.pictureInUploading) {
            I.img.name = a.core.str.trim(a.sizzle("input", n.fileBtn)[0].value);
            if (I.img.name === "")return;
            var b = I.img.name.split("\\");
            b.length > 1 && (I.img.name = b[b.length - 1]);
            b = null;
            I.startUpload();
            e = new Date;
            a.core.io.ijax({url: "http://picupload.service.weibo.com/interface/pic_upload.php", form: a.E("vote_picture_upload"), abaurl: "http://" + document.domain + "/aj/static/upimgback.html?_wv=5", abakey: "cb", onComplete: I.uploadHandle, onTimeout: I.uploadHandle, args: {marks: 1, app: "miniblog", s: "rdxt", nick: "@" + $CONFIG.nick, logo: 1, url: "vote.weibo.com"}})
        }
    }, uploadHandle: function (b) {
        if (b && b.ret && b.ret >= 0) {
            I.uploadSuccess(b);
            var c = new Date - e;
            d.sendSucc({pids: b.pid, ret: b.ret, app: "1001", el: c, ct: "1"})
        } else {
            b && b.ret && b.ret < 0 && (b.ret == "-4" || b.ret == "-9" || b.ret == "-10" ? n.updateImageTips.innerHTML = j.PICTUREUPLOAD.ERRORSIZE : n.updateImageTips.innerHTML = a.common.extra.imgUploadCode(b.ret));
            b ? d.sendError({ret: b.ret, app: "1001"}) : d.sendError({ret: "none", app: "1001"});
            I.uploadFailed()
        }
    }, stopUpload: function () {
        p.startBoxClose();
        a.removeEvent(a.sizzle("input", n.fileBtn)[0], "change", I.upload);
        n.fileBtn.innerHTML = "";
        setTimeout(function () {
            n.fileBtn.innerHTML = j.ADVANCED.PICUPLOADINPUT;
            a.addEvent(a.sizzle("input", n.fileBtn)[0], "change", I.upload);
            I.pictureInUploading = !1
        }, 0)
    }, uploadFailed: function () {
        I.stopUpload();
        I.show.uploadfail()
    }, uploadSuccess: function (b) {
        I.stopUpload();
        I.img.pid = b.pid;
        I.img.url = a.common.extra.imageURL(I.img.pid);
        var c = I.img.name.split("."), d = c.pop();
        c = a.core.str.leftB(c.join("."), 20) + "...." + d;
        n.picturePreview.innerHTML = c;
        I.show.uploaded()
    }, getPid: function () {
        return I.img.pid ? I.img.pid : ""
    }, viewThumbnail: function (b) {
        if (!q) {
            q = a.ui.layer({template: j.ADVANCED.PICUPLOADTHUMBFRAME});
            n.vote.appendChild(q.getBox())
        }
        var d = q.getBox(), e = a.core.dom.position(n.picturePreview), f = a.core.dom.getSize(n.picturePreview);
        a.core.dom.setXY(d, {t: e.t + f.height + 3, l: e.l - 5});
        q.getDomList().inner.innerHTML = c(j.ADVANCED.PICUPLOADTHUMBNAIL, {URL: I.img.url});
        q.show()
    }, closeThumbnail: function () {
        q.hide()
    }, bind: function () {
        r.pictureUploadfail = a.core.evt.delegatedEvent(n.pictureArea);
        r.pictureUploadfail.add("cancel", "click", function () {
            I.stopUpload();
            I.show.upload()
        });
        r.pictureUploadfail.add("picuploadinput", "click", function () {
            n.pictureAreaItems.uploadfail.style.display = "none"
        });
        a.addEvent(a.sizzle("input", n.fileBtn)[0], "change", I.upload);
        a.addEvent(n.picturePreview, "mouseover", I.viewThumbnail);
        a.addEvent(n.picturePreview, "mouseout", I.closeThumbnail)
    }}, J = function () {
        H.stopLsn();
        p.destroy();
        A.destroy();
        k = null;
        H = null;
        I = null
    }, K = function () {
        a.custEvent.define(k, "hide");
        a.custEvent.add(k, "hide", H.hide);
        a.custEvent.add(p, "hide", function () {
            n.calendar && a.setStyle(n.calendar, "display", "none");
            a.custEvent.remove(p, "hide", arguments.callee)
        })
    };
    k.destroy = J;
    return function (c, d) {
        var e = function () {
            m = c;
            F = a.parseParam(F, d);
            n = a.kit.dom.parseDOM(a.core.dom.builder(b(j.FRAME)).list);
            p = a.ui.bubble();
            !C && K();
            H.init();
            H.changeTab("normal");
            p.setContent(n.vote);
            p.setAlignPos(c, d.refer, {fail: function () {
                p.setLayoutPos(c, {offsetX: -24, offsetY: 5})
            }});
            p.show();
            C = !0
        };
        e();
        k.layer = p;
        return k
    }
});
STK.register("common.editor.service.vote", function (a) {
    return function (b) {
        var c = {}, d, e, f = function (a, d) {
            var e = b.API.getCurrentLogType();
            b.API.addShortUrlLog(e);
            b.API.insertText(d);
            c.hide()
        }, g = !1, h = function (b, c) {
            g = !1;
            d = a.common.bubble.vote(b, c);
            i()
        }, i = function () {
            a.custEvent.define(d, "insert");
            a.custEvent.add(d, "insert", f);
            a.custEvent.add(b, "close", c.hide);
            a.custEvent.add(d.layer, "hide", function () {
                a.custEvent.remove(d, "insert", f);
                a.custEvent.remove(b, "close", c.hide)
            })
        }, j = function () {
            a.core.evt.preventDefault();
            if (!g) {
                g = !0;
                var c, d = a.fixEvent(a.getEvent()).target;
                a.contains(b.nodeList.widget, d) ? c = d : c = b.nodeList.more;
                h(c, {itemMin: 2, defaultItem: 2, refer: b.nodeList.textEl})
            }
        };
        c.init = function (c, d, f) {
            b = c;
            e = d;
            a.addEvent(b.nodeList[e], "click", j)
        };
        c.clear = function () {
        };
        c.show = j;
        c.hide = function () {
            a.custEvent.fire(d, "hide")
        };
        c.destroy = function () {
            b = null;
            a.custEvent.remove(d, "insert")
        };
        return c
    }
});
STK.register("common.trans.mood", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("page", {url: "/aj/mood/datelist?_wv=5", method: "get"});
    c("simppublish", {url: "/aj/mood/simppublish?_wv=5", method: "get"});
    c("getMoodFeed", {url: "/aj/mood/getpublish?_wv=5", method: "get"});
    c("publish", {url: "/aj/mood/add?_wv=5", method: "post"});
    c("myfilter", {url: "/aj/mood/friendlist?_wv=5", method: "get"});
    c("myfiltersimp", {url: "/aj/mood/simpfriendlist?_wv=5", method: "get"});
    c("getpublishstate", {url: "/aj/mood/getstate?_wv=5", method: "get"});
    c("closetip", {url: "/aj/bubble/closebubble?_wv=5", method: "get"});
    c("changecollestion", {url: "/aj/mood/getastro?_wv=5", method: "get"});
    return b
});
STK.register("kit.dom.btnState", function (a) {
    var b = function (b) {
        var c = function (b) {
            var c = a.kit.dom.parseDOM(a.builder(b).list);
            c.submit_btn || (c.submit_btn = b);
            return c
        }, d = a.kit.extra.language;
        b = a.parseParam({btn: null, state: "loading", loadText: d("#L{提交中...}"), commonText: d("#L{提交}")}, b);
        var e = c(b.btn), f = b.state;
        if (f == "loading") {
            e.submit_btn.className = "W_btn_a_disable";
            e.btnText.innerHTML = b.loadText
        } else {
            e.submit_btn.className = "W_btn_d btn_noloading";
            e.btnText.innerHTML = b.commonText
        }
    };
    return b
});
STK.register("common.mood.moodPublish", function (a) {
    return function (b, c) {
        var d = null, e = {}, f = a.kit.extra.language, g = !1, h = !1, i, j = 0, k = 0, l, m = {limitNum: 130, count: "disable"}, n, o = function (b) {
            var c = w.DOM.postFeed[0];
            a.kit.dom.btnState({btn: c, state: b, loadText: f("#L{提交中...}"), commonText: f("#L{发布心情}")})
        }, p = function () {
            setTimeout(function () {
                c && c.custObj && a.custEvent.fire(c.custObj, "startClose", {})
            }, 500)
        }, q = function () {
            c && c.custObj && a.custEvent.fire(c.custObj, "stopClose", {})
        }, r = function (b) {
            var c = w.DOM.moodGroup, d = a.kit.dom.parseDOM(a.builder(c[b]).list);
            if (d.moodList && d.moodList.length) {
                var e = d.moodList[0], f = a.queryToJson(e.getAttribute("action-data"));
                w.DOM_eventFun.moodSelectChange({el: e, data: f})
            }
        }, s = a.common.dialog.validateCode(), t, u = 0, v = function () {
            var b = w.DOM.moodGroup, c = a.kit.dom.parseDOM(a.builder(b[j]).list);
            if (c.moodList && c.moodList.length)for (var d = 0, e = c.moodList.length; d < e; d++) {
                var f = c.moodList[d], h = a.queryToJson(f.getAttribute("action-data"));
                if (h.moodid == g)return h
            }
            return null
        }, w = {DOM: {}, objs: {}, DOM_eventFun: {insertDefault: function () {
            var b = w.DOM.textEl[0], c = a.trim(b.value);
            if (c == "") {
                var d = v();
                if (d) {
                    i = d.content;
                    b.value = i
                }
            }
        }, itemMouseover: function (b) {
            a.addClassName(b.el, "current")
        }, itemMouseout: function (b) {
            var c = a.queryToJson(b.el.getAttribute("action-data"));
            c.moodid != g && a.removeClassName(b.el, "current")
        }, moodSelectChange: function (b) {
            var c = b.el;
            g = b.data.moodid;
            h = b.data.content_id;
            var d = w.DOM.moodList, e = d.length;
            for (var f = 0; f < e; f++)a.removeClassName(d[f], "current");
            a.addClassName(c, "current");
            var j = a.trim(w.DOM.textEl[0].value);
            if (i == j || j == "") {
                w.DOM.textEl[0].value = b.data.content;
                i = b.data.content;
                try {
                    l.API.focus()
                } catch (k) {
                }
            }
        }, postFeed: function (a) {
            w.DOM_eventFun.submitFeed()
        }, submitFeed: function (b) {
            b.evt && a.preventDefault(b.evt);
            try {
                w.DOM.textEl[0].blur()
            } catch (d) {
            }
            if (!g)z(f("#L{请选择心情}")); else {
                var i = a.trim(l.API.getWords() || "");
                if (!a.trim(i)) {
                    a.common.extra.shine(w.DOM.textEl[0]);
                    return
                }
                if (u)return;
                u = 1;
                var j = {};
                j.text = i;
                j.moodid = g;
                j.content_id = h;
                if (c && c.shareFeed) {
                    var k = c.shareFeed.getLastCollest();
                    k && (j = a.kit.extra.merge(j, k))
                }
                o("loading");
                q();
                t = a.common.trans.mood.getTrans("publish", {onComplete: function (b, c) {
                    var d = {onSuccess: function (b) {
                        u = 0;
                        o("normal");
                        a.custEvent.fire(e, "success", b);
                        p()
                    }, onError: w.DOM_eventFun.postBubbleError, requestAjax: t, param: c, onRelease: function () {
                        u = 0;
                        o("normal");
                        p()
                    }};
                    s.validateIntercept(b, c, d)
                }, onFail: w.DOM_eventFun.postBubbleError});
                t.request(j)
            }
        }, postBubbleError: function (b) {
            u = 0;
            o("normal");
            a.custEvent.fire(e, "error", b);
            if (b.code == "100001") {
                z(b && b.msg || f("#L{发布失败}"));
                p()
            } else a.common.layer.ioError(b.code, b, {call: function (a) {
                b.ok = function () {
                    p()
                };
                b.cancel = function () {
                    p()
                }
            }})
        }, startCountWord: function () {
            n = setInterval(w.DOM_eventFun.startCountImpl, 200)
        }, startCountImpl: function () {
            var b = l.API.count();
            if (b > 130) {
                var c = l.API.getWords();
                a.bLength(c) > 260 && (w.DOM.textEl[0].value = a.leftB(c, 260))
            }
        }, stopCountWord: function () {
            clearInterval(n)
        }, changeMoodInfo: function (b) {
            b.evt && a.preventDefault(b.evt);
            if (!k) {
                k = 1;
                var c = b.el, d = w.DOM.changeInfo, e = 0;
                for (var f = 0, g = d.length; f < g; f++)if (d[f] == c) {
                    e = f;
                    a.addClassName(d[f], "current")
                } else a.removeClassName(d[f], "current");
                a.core.ani.tween(w.DOM.moodInfoSlider[0], {duration: 300, end: function () {
                    k = 0
                }}).play({marginLeft: -324 * e}).destroy()
            }
        }, changeMoodGroup: function (b) {
            b.evt && a.preventDefault(b.evt);
            var c = w.DOM.moodGroup;
            j++;
            j == c.length && (j = 0);
            for (var d = 0, e = c.length; d < e; d++)j == d ? a.setStyle(c[d], "display", "") : a.setStyle(c[d], "display", "none");
            r(j)
        }}}, x = function () {
            y();
            A();
            B();
            C();
            D();
            E();
            setTimeout(function () {
                try {
                    l.API.focus()
                } catch (a) {
                }
            }, 100)
        }, y = function () {
            if (!b)throw"node 没有定义"
        }, z = function (b) {
            var c = w.DOM.postFeed[0];
            if (c) {
                var d = a.ui.tip("alert", {showCallback: function () {
                    setTimeout(function () {
                        d && d.aniHide()
                    }, 600)
                }, hideCallback: function () {
                    d && d.destroy();
                    d = undefined
                }, msg: b, type: "error"});
                d.setLayerXY(c);
                d.aniShow()
            }
        }, A = function () {
            w.DOM = a.builder(b).list;
            if (w.DOM.moodList && w.DOM.moodList.length) {
                var c = a.queryToJson(w.DOM.moodList[0].getAttribute("action-data"));
                g = c.moodid;
                h = c.content_id;
                i = c.content
            }
        }, B = function () {
            d = a.delegatedEvent(b);
            d.add("moodSelect", "click", w.DOM_eventFun.moodSelectChange);
            d.add("moodSelect", "mouseover", w.DOM_eventFun.itemMouseover);
            d.add("moodSelect", "mouseout", w.DOM_eventFun.itemMouseout);
            d.add("postFeed", "click", w.DOM_eventFun.submitFeed);
            d.add("changeInfo", "click", w.DOM_eventFun.changeMoodInfo);
            d.add("changeMoodGroup", "click", w.DOM_eventFun.changeMoodGroup);
            a.custEvent.define(e, ["success", "error", "faceShow", "faceHide"]);
            l = a.common.editor.base(b, m);
            if (w.DOM.smileyBtn && w.DOM.smileyBtn.length) {
                var c = a.common.editor.widget.face();
                l.widget(c, "smileyBtn");
                a.custEvent.add(c, "show", function () {
                    a.custEvent.fire(e, "faceShow", {})
                });
                a.custEvent.add(c, "hide", function () {
                    a.custEvent.fire(e, "faceHide", {})
                });
                w.DOM.textEl[0].setAttribute("range", i.length + "&0")
            }
        }, C = function () {
            a.hotKey.add(w.DOM.textEl[0], "ctrl+enter", w.DOM_eventFun.submitFeed);
            a.addEvent(w.DOM.textEl[0], "focus", w.DOM_eventFun.startCountWord);
            a.addEvent(w.DOM.textEl[0], "blur", w.DOM_eventFun.stopCountWord);
            a.addEvent(w.DOM.textEl[0], "blur", w.DOM_eventFun.insertDefault)
        }, D = function () {
        }, E = function () {
        }, F = function () {
            d.destroy();
            d = null;
            a.custEvent.undefine(e);
            a.hotKey.remove(w.DOM.textEl[0], "ctrl+enter", w.DOM_eventFun.submitFeed);
            s && s.destroy && s.destroy();
            a.removeEvent(w.DOM.textEl[0], "focus", w.DOM_eventFun.startCountWord);
            a.removeEvent(w.DOM.textEl[0], "blur", w.DOM_eventFun.stopCountWord);
            a.removeEvent(w.DOM.textEl[0], "blur", w.DOM_eventFun.insertDefault)
        }, G = function () {
            setTimeout(function () {
                try {
                    l.API.focus()
                } catch (a) {
                }
            }, 100)
        };
        x();
        e.destroy = F;
        e.getDom = function () {
            return w.DOM
        };
        e.reset = G;
        return e
    }
});
STK.register("common.channel.mood", function (a) {
    var b = ["changeMoodState", "bubbleClose"];
    return a.common.listener.define("common.channel.mood", b)
});
STK.register("common.mood.shareFeed", function (a) {
    return function (b) {
        var c = {}, d, e, f, g = a.kit.extra.language, h = a.common.channel.mood, i, j = 0, k, l, m = {success: function (b, c) {
            i.collestionContent.innerHTML = b.data.html;
            var d = i.shareCollestion, e = a.queryToJson(d.getAttribute("action-data"));
            e.shareText = b.data.shareText;
            e.title = b.data.title;
            d.setAttribute("action-data", a.jsonToQuery(e));
            i.dispCollecstion.innerHTML = k;
            i.collestionDrop.href = decodeURIComponent(b.data.url)
        }, error: function () {
            i.collestionContent.innerHTML = g("#L{对不起，加载失败}")
        }}, n = {bodyClick: function (b) {
            b = a.fixEvent(b);
            var c = b.target;
            if (i.collestionDropDown !== c && !a.core.dom.contains(i.collestionList, c) && !a.core.dom.contains(i.collestionDropDown, c)) {
                j = 0;
                a.setStyle(i.collestionList, "display", "none");
                a.removeEvent(document.body, "click", n.bodyClick)
            }
        }, shareText: function (b) {
            a.preventDefault(b.evt);
            h.fire("bubbleClose", {type: "stop"});
            var c = decodeURIComponent(b.data.shareText), d = a.common.dialog.publish(), e = b.data.title;
            d.show({title: e, content: c});
            a.custEvent.add(d, "publish", function () {
                a.ui.tip("lite", {msg: g("#L{分享成功}"), type: "succM", timer: "500", hideCallback: function () {
                    d.hide()
                }});
                a.custEvent.remove(d, "publish", arguments.callee)
            });
            a.custEvent.add(d, "hide", function () {
                setTimeout(function () {
                    h.fire("bubbleClose", {type: "start"})
                }, 50);
                a.custEvent.remove(d, "hide", arguments.callee)
            })
        }, collestionChange: function (b) {
            a.preventDefault(b.evt);
            l = b.data;
            d.abort();
            d.request(l);
            a.setStyle(i.collestionList, "display", "none");
            j = 0;
            k = b.el.innerHTML
        }, collestionClick: function (b) {
            a.preventDefault(b.evt);
            if (j) {
                a.setStyle(i.collestionList, "display", "none");
                j = 0
            } else {
                j = 1;
                a.kit.dom.layoutPos(i.collestionList, i.collestionDrop, {offsetX: -11, offsetY: 2});
                a.setStyle(i.collestionList, "display", "");
                a.addEvent(document.body, "click", n.bodyClick)
            }
        }}, o = function () {
            if (!a.isNode(b.node))throw"shareFeed need opts.node to bind event"
        }, p = function () {
            d = a.common.trans.mood.getTrans("changecollestion", {onSuccess: m.success, onError: m.error, onFail: m.error})
        }, q = function () {
            i = a.kit.dom.parseDOM(a.builder(b.node).list)
        }, r = function () {
            e = a.delegatedEvent(b.node);
            e.add("shareWeather", "click", n.shareText);
            e.add("shareCollestion", "click", n.shareText);
            e.add("collestionDropDown", "click", n.collestionClick);
            f = a.delegatedEvent(i.collestionList);
            f.add("collestionChange", "click", n.collestionChange)
        }, s = function () {
            o();
            p();
            q();
            r()
        };
        s();
        c.updateBuildNodes = q;
        c.destroy = function () {
            e && e.destroy && e.destroy();
            f && f.destroy && f.destroy()
        };
        c.getLastCollest = function () {
            return l
        };
        return c
    }
});
STK.register("lib.litter.calendar", function (a) {
    var b = {toInt: function (a) {
        return typeof a == "number" ? a : parseInt(a, 10)
    }, getMaxDay: function (b) {
        var c = b.getMonth() + 1;
        if (c == 2) {
            var d = b.getFullYear();
            return d % 4 == 0 && d % 100 != 0 || d % 400 == 0 ? 29 : 28
        }
        return a.core.arr.indexOf(c, [4, 6, 9, 11]) != -1 ? 30 : 31
    }, parseParam: function (a) {
        var b;
        if (a.length === 3) {
            a[0] = this.toInt(a[0]);
            a[1] = this.toInt(a[1]);
            a[2] = this.toInt(a[2]);
            b = new Date(a[0], a[1] - 1, a[2])
        } else {
            a = a[0];
            if (typeof a == "string") {
                if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(a))throw"请传入正确的日期";
                var c = a.split("-");
                c[0] = this.toInt(c[0]);
                c[1] = this.toInt(c[1]);
                c[2] = this.toInt(c[2]);
                b = new Date(c[0], c[1] - 1, c[2])
            } else b = a
        }
        return b
    }, getFirstDay: function (a) {
        var b = new Date(a.getFullYear(), a.getMonth(), a.getDate());
        b.setDate(1);
        return b.getDay()
    }, parseData: function () {
        var a = arguments, b = this.parseParam(a), c = this.getMaxDay(b), d = this.getFirstDay(b), e;
        d == 0 && c == 28 ? e = 28 : d + c > 35 ? e = 42 : e = 35;
        var f = [];
        for (var g = 0; g < d; g++)f.push("");
        for (var g = 1; g <= c; g++)f.push(g);
        var h = 0;
        for (var g = 1; g <= e - c - d; g++) {
            h++;
            f.push("")
        }
        var i = b.getFullYear(), j = b.getMonth() + 1;
        j < 10 && (j = "0" + j);
        return{firstDay: d, result: f, leftDay: h, prefix: i + "-" + j + "-"}
    }, parseHTML: function (b, c, d) {
        a.isArray(b) || (b = [b]);
        var e = this.parseData.apply(this, b), f = e.firstDay, g = e.result;
        for (var h = 0; h < g.length; h++)g[h] ? c[h]._day_ = g[h] : h < f ? c.unshift({_day_: ""}) : c.push({_day_: ""});
        return a.core.util.easyTemplate(d, c)
    }, parseMapHtml: function (b, c, d) {
        a.isArray(b) || (b = [b]);
        var e = this.parseData.apply(this, b), f = e.firstDay, g = [], h = e.result;
        for (var i = 0; i < h.length; i++)if (h[i]) {
            var j = i - f + 1, k = e.prefix + (j < 10 ? "0" + j : j);
            if (c[k]) {
                c[k]._day_ = j;
                g[i] = c[k]
            } else g[i] = {_day_: j}
        } else i < f ? g.unshift({_day_: ""}) : g.push({_day_: ""});
        return a.core.util.easyTemplate(d, g)
    }};
    return b
});
STK.register("common.mood.showMoodDetail", function (a) {
    return function (b) {
        var c = {}, d, e, f, g, h, i = 500, j = 200, k, l, m, n = {cache: {}, get: function (a) {
            return n.cache[a] ? n.cache[a] : null
        }, set: function (a, b) {
            n.cache[a] = b
        }, clear: function () {
            n.cache = {}
        }, destroy: function () {
            n.cache = undefined
        }}, o = function () {
            if (!a.isNode(b.contentArea))return 0;
            e = b.contentArea;
            if (!a.isNode(b.outerNode))return 0;
            f = b.outerNode;
            if (!b.judgeAttr)return 0;
            g = b.judgeAttr;
            l = b.beforeShow || a.funcEmpty;
            m = b.afterHide || a.funcEmpty;
            return 1
        }, p = function () {
            d = a.kit.dom.parseDOM(a.builder(e).list)
        }, q = {showTip: function () {
            clearTimeout(h);
            d.moodTip && (d.moodTip.style.display = "");
            l()
        }, hideTip: function () {
            clearTimeout(h);
            h = setTimeout(function () {
                d.moodTip && (d.moodTip.style.display = "none");
                m()
            }, j)
        }}, r = {tipMouseover: function () {
            q.showTip()
        }, tipMouseout: function () {
            q.hideTip()
        }, bindMoodTipEvent: function () {
            a.addEvent(d.moodTip, "mouseover", r.tipMouseover);
            a.addEvent(d.moodTip, "mouseout", r.tipMouseout)
        }, showCardImpl: function (b) {
            if (!k) {
                k = 1;
                d.moodTip = a.insertHTML(document.body, '<div node-type="moodTip" class="layer_one_mood" style="display:none;z-index:10002"><div node-type="moodContent"></div><p class="arrow" node-type="arrow_l"></p><p class="arrow_r" node-type="arrow_r"></p></div>');
                var c = a.kit.dom.parseDOM(a.builder(d.moodTip).list);
                d = a.kit.extra.merge(d, c);
                r.bindMoodTipEvent()
            }
            var e = b.target, g = a.core.dom.getSize(e), h = a.position(e), i = a.position(f), j = a.core.dom.getSize(f), l = h.l - i.l, m = i.l + j.width - h.l, o = "r";
            l > m && (o = "l");
            var p = {l: d.arrow_r, r: d.arrow_l};
            for (var q in p)q == o ? p[q].style.display = "" : p[q].style.display = "none";
            var s, t, u = a.core.dom.getSize(d.moodTip);
            s = h.t + g.height / 2 - 17;
            o == "l" ? t = h.l - u.width - 5 : t = h.l + g.width + 5;
            var v = b.data.id, w = n.get(v);
            d.moodContent.innerHTML = w;
            a.setStyle(d.moodTip, "left", t + "px");
            a.setStyle(d.moodTip, "top", s + "px");
            a.setStyle(d.moodTip, "display", "")
        }, showCard: function (b) {
            b = a.fixEvent(b);
            var c = b.target, d;
            c.getAttribute(g) ? d = c : d = a.kit.dom.parentElementBy(c, e, function (a) {
                if (a.getAttribute(g))return!0
            });
            if (d) {
                clearTimeout(h);
                var f = d.getAttribute(g), j = a.queryToJson(f);
                h = setTimeout(function () {
                    r.showCardImpl({target: d, data: j})
                }, i)
            }
        }, hideCard: function (a) {
            q.hideTip()
        }}, s = function () {
            a.addEvent(e, "mouseover", r.showCard);
            a.addEvent(e, "mouseout", r.hideCard)
        }, t = function () {
            var a = o();
            if (a) {
                p();
                s()
            }
        };
        t();
        c.destroy = function () {
            e && a.removeEvent(e, "mouseover", r.showCard);
            e && a.removeEvent(e, "mouseout", r.hideCard);
            d && d.moodTip && a.removeEvent(d.moodTip, "mouseover", r.tipMouseover);
            d && d.moodTip && a.removeEvent(d.moodTip, "mouseout", r.tipMouseout);
            d && d.moodTip && a.removeNode(d.moodTip);
            n.destroy()
        };
        c.setCache = n.set;
        return c
    }
});
STK.register("common.mood.moodCalendar", function (a) {
    return function (b) {
        b = a.kit.extra.merge({style: "small", requestData: {}}, b);
        var c = '<#et moodlist data><ul class="week clearfix S_line1"><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul><ul class="day clearfix"><#list data as list><li class="S_line1"><span>${list._day_}</span><#if (list.face)><img moodconf="id=${list.date}" src="${list.face}" alt="" /></#if></li></#list></ul></#et>', d = a.kit.extra.language, e = {}, f, g, h, i, j, k, l = a.lib.litter.calendar, m = function () {
            if (!a.isNode(b.nodeOuter))throw"moodCalendar need a node argument"
        }, n = function () {
            f = a.kit.dom.parseDOM(a.builder(b.nodeOuter).list);
            var c = o.getCurrentMonth();
            c = c.year + "-" + c.month;
            i || (i = c);
            try {
                h.abort()
            } catch (d) {
            }
            var e = a.kit.extra.merge({month: c, style: b.style}, b.requestData);
            h.request(e)
        }, o = {getOnlineDate: function () {
            var b = function () {
                return{year: 2011, month: 12}
            }, c = f.monthPrev.getAttribute("action-data");
            if (c) {
                var d = a.queryToJson(c);
                if (d.online) {
                    var e = d.online.split("-");
                    return{year: e[0], month: parseInt(e[1], 10)}
                }
                return b()
            }
            return b()
        }, calCache: {}, getCurrentMonth: function () {
            return{year: f.year.innerHTML, month: f.month.innerHTML}
        }, getDate: function (a, b) {
            a.month -= 1;
            var c = new Date(a.year, a.month);
            c.setMonth(c.getMonth() + b);
            return{year: c.getFullYear(), month: c.getMonth() + 1}
        }, getCalHtml: function (a, b) {
            a = a + "-1";
            for (var d in b)k.setCache(d, b[d].content);
            return l.parseMapHtml(a, b, c)
        }, calPageSuc: function (c, d) {
            if (!j) {
                var e = b.custObj;
                e && a.custEvent.fire(e, "setHeightFree", {});
                j = 1
            }
            var g = d.month, h = c.data, i = o.getCalHtml(g, h);
            o.calCache[g] = i;
            f.contentArea.innerHTML = i;
            o.changeMonth(d.month)
        }, changeMonth: function (a) {
            var b = a.split("-");
            f.year.innerHTML = b[0];
            f.month.innerHTML = b[1]
        }, checkCacheSendRequest: function (c) {
            c = c.replace(/^(\d{4}\-)(\d{1})$/, function (a, b, c) {
                return b + "0" + c
            });
            if (o.calCache[c]) {
                f.contentArea.innerHTML = o.calCache[c];
                o.changeMonth(c)
            } else {
                var d = a.kit.extra.merge({month: c, style: b.style}, b.requestData);
                h.request(d)
            }
        }, fireStopClose: function () {
            var c = b.custObj;
            c && a.custEvent.fire(c, "stopClose", {})
        }, fireStartClose: function () {
            var c = b.custObj;
            c && a.custEvent.fire(c, "startClose", {})
        }}, p = {monthPrev: function (a) {
            p.showMonth("prev")
        }, showMonth: function (a) {
            var b = o.getCurrentMonth(), c = function () {
                var a = i.split("-");
                return{year: a[0], month: parseInt(a[1], 10)}
            }(), d = o.getDate(b, a == "prev" ? -1 : 1), e = o.getOnlineDate();
            if (!(d.year > c.year || d.year == c.year && d.month > c.month)) {
                if (d.year < e.year || d.year == e.year && d.month < e.month)return;
                var f = d.year + "-" + d.month;
                o.checkCacheSendRequest(f)
            }
        }, monthNext: function (a) {
            p.showMonth("next")
        }}, q = function () {
            var b = function (b, c) {
                a.ui.alert(b && b.msg || d("#L{对不起，心情日历读取失败}"))
            };
            h = a.common.trans.mood.getTrans("page", {onSuccess: o.calPageSuc, onError: b, onFail: b})
        }, r = function () {
            g = a.delegatedEvent(b.nodeOuter);
            g.add("monthPrev", "click", p.monthPrev);
            g.add("monthNext", "click", p.monthNext)
        }, s = function () {
            k = a.common.mood.showMoodDetail({contentArea: f.contentArea, outerNode: f.moodOuter, judgeAttr: "moodconf", beforeShow: o.fireStopClose, afterHide: o.fireStartClose})
        }, t = function () {
            m();
            q();
            n();
            r();
            s()
        }, u = function () {
            g && g.destroy && g.destroy();
            k && k.destroy && k.destroy()
        };
        e.reset = function () {
            f.contentArea.innerHTML = o.calCache[i];
            o.changeMonth(i)
        };
        e.destroy = u;
        t();
        return e
    }
});
STK.register("kit.extra.codec", function (a) {
    var b = {encode: function (b) {
        var c = document.createTextNode(b), d = a.C("div");
        d.appendChild(c);
        var e = d.innerHTML;
        d = c = null;
        return e
    }, decode: function (a) {
        var b = document.createElement("div");
        b.innerHTML = a;
        var c = b.innerText == undefined ? b.textContent : b.innerText;
        b = null;
        return c
    }};
    return b
});
STK.register("common.trans.comment", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("smallList", {url: "/aj/comment/small?_wv=5", method: "get"});
    c("add", {url: "/aj/comment/add?_wv=5", method: "post"});
    c("delete", {url: "/aj/comment/del?_wv=5", method: "post"});
    c("hotChange", {url: "/aj/comment/hotchange?_wv=5"});
    c("privateSetting", {url: "/aj/account/setcommentprivacy?_wv=5", method: "post"});
    c("privateNoMore", {url: "/aj/bubble/closebubble?_wv=5", method: "get"});
    c("cfilter", {url: "/aj/comment/small?_wv=5", method: "get"});
    c("isComment", {url: "/aj/comment/privacy?_wv=5", method: "get"});
    c("getIn", {url: "/aj/commentbox/in?_wv=5", method: "get"});
    c("getOut", {url: "/aj/commentbox/out?_wv=5", method: "get"});
    c("getComment", {url: "/aj/at/comment/comment?_wv=5", method: "get"});
    c("getCommonComent", {url: "/aj/commentbox/common?_wv=5", method: "get"});
    c("dialogue", {url: "/aj/comment/conversation?_wv=5", method: "get"});
    c("clear", {url: "/aj/comment/delspam?_wv=5", method: "post"});
    return b
});
STK.register("common.dialog.moodComment", function (a) {
    return function (b) {
        var c = a.getUniqueKey(), d = '<#et comment data><div class="layer_mood_detail" node-type="moodContent"><dl class="details"><dt><img height="32" width="32" src="${data.mood_url}"<#if (data.mood_title)> title="${data.mood_title}"</#if>/></dt><dd><span class="arrow"></span>${data.content}</dd></dl><div class="input" node-type="widget"><p class="btn_face" node-type="smileyBtn" title="#L{表情}"><span class="faces"></span></p><p class="num S_txt2" node-type="numCount">#L{还可以输入%s字}</p><textarea cols="" rows="" name="" node-type="textEl"></textarea><ul class="forword"><li><label for="' + c + '"><input type="checkbox" class="W_checkbox" node-type="isForward" id="' + c + '">#L{同时转发到我的微博}</label></li>' + "</ul>" + '<p class="btn" title="#L{评论}"><a href="javascript:void(0)" class="W_btn_d btn_noloading" action-type="comment" node-type="commentBtn"><span><b class="loading"></b><em node-type="btnText">#L{评论}</em></span></a></p>' + "</div>" + "</div>", e = {}, f, g, h = a.kit.extra.language, i = null, j = {limitNum: 140, count: "disable"}, k = null, l = a.ui.dialog(null, b), m = function () {
            a.custEvent.define(e, ["success", "error"]);
            o();
            z()
        }, n = function (b) {
            var c = g.commentBtn;
            a.kit.dom.btnState({btn: c, state: b, loadText: h("#L{提交中...}"), commonText: h("#L{发布心情}")})
        }, o = function () {
            l.setTitle(h(b.title));
            var c = a.core.util.easyTemplate(h(d, "<span>140</span>"), b).toString();
            l.setContent(c);
            p();
            i = a.common.editor.base(g.moodContent, j);
            i.widget(a.common.editor.widget.face(), "smileyBtn");
            t()
        }, p = function () {
            g = a.kit.dom.parseDOM(a.builder(l.getDomList().inner).list)
        }, q = function () {
            f = setInterval(r, 200)
        }, r = function () {
            var a = i.API.count(), b;
            a > 140 ? b = h("#L{已经超过%s字}", '<span class="S_error">' + (a - 140) + "</span>") : b = h("#L{还可以输入%s字}", "<span>" + (140 - a) + "</span>");
            i.nodeList.numCount.innerHTML = b
        }, s = function (a) {
            clearInterval(f)
        }, t = function () {
            a.addEvent(i.nodeList.textEl, "focus", q);
            a.addEvent(i.nodeList.textEl, "blur", s)
        }, u = function () {
            l && l.hide()
        }, v = function () {
            l && l.show();
            l && l.setMiddle();
            setTimeout(function () {
                try {
                    i.API.focus()
                } catch (a) {
                }
            }, 100)
        }, w = function (b) {
            x = 0;
            n("normal");
            a.custEvent.fire(e, "error", b);
            b.msg = b.msg || h("#L{评论失败}");
            b && b.code == "100005" ? a.ui.alert(h("#L{由于对方隐私设置，你无法进行评论。}"), {textSmall: h("#L{绑定手机后可以更多地参与评论。}") + '<a href="http://account.weibo.com/settings/mobile" target="_blank">' + h("#L{立即绑定}") + "</a>"}) : a.common.layer.ioError(b.code, b)
        }, x = 0, y = function () {
            try {
                g.textEl.blur()
            } catch (c) {
            }
            var d = a.trim(i.API.getWords() || "");
            if (!a.trim(d))a.common.extra.shine(g.textEl); else {
                var f = i.API.count();
                if (f > 140) {
                    a.common.extra.shine(g.textEl);
                    return
                }
                if (x)return;
                x = 1;
                var j = {};
                j.act = "post";
                j.content = d;
                j.mid = b.mid;
                j.isroot = 0;
                window.$CONFIG && window.$CONFIG.location && (j.location = window.$CONFIG.location);
                j.uid = window.$CONFIG && window.$CONFIG.uid || "";
                g.isForward.checked ? j.forward = 1 : j.forward = 0;
                n("loading");
                a.common.trans.comment.getTrans("add", {onSuccess: function (b) {
                    x = 0;
                    n("normal");
                    l && l.hide();
                    a.ui.tip("lite", {msg: h("#L{评论成功}"), type: "succM", timer: "1000"});
                    a.custEvent.fire(e, "success", b);
                    window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack("tblog_mood", "complete_grab_sofa")
                }, onError: w, onFail: w}).request(j)
            }
        }, z = function () {
            k = a.delegatedEvent(g.moodContent);
            k.add("comment", "click", y);
            a.hotKey.add(i.nodeList.textEl, "ctrl+enter", y)
        }, A = function () {
            f && clearInterval(f);
            i && i.nodeList && a.removeEvent(i.nodeList.textEl, "focus", q);
            i && i.nodeList && a.removeEvent(i.nodeList.textEl, "blur", s);
            a.hotKey.remove(i.nodeList.textEl, "ctrl+enter", y);
            k && k.destroy();
            k = null;
            i.closeWidget();
            i && i.destroy && i.destroy();
            i = null;
            l && l.destroy && l.destroy()
        };
        m();
        e.show = v;
        e.hide = u;
        e.dialog = l;
        e.destroy = A;
        return e
    }
});
STK.register("common.mood.moodPageSearch", function (a) {
    return function (b) {
        var c = {}, d = b && b.delegateNode, e = b && b.contentNode, f = b && b.fromWhere, g, h = b && b.trans, i = b && b.transName, j, k, l, m = b.extra || {}, n = a.kit.extra.language, o = a.common.channel.mood, p = 1, q = a.kit.extra.codec, r = function () {
            if (!a.isNode(e))throw"moodPage!contentNode";
            if (!a.isNode(d))throw"moodPage!delegateNode";
            if (!h)throw"moodPage!trans";
            if (!i)throw"moodPage!transName";
            k = f == "bubble"
        }, s = function (b, d) {
            var f = b.data.html;
            e.innerHTML = f;
            if (p) {
                p = 0;
                a.custEvent.fire(c, "setMiddle", {});
                a.custEvent.fire(c, "setHeightFree", {})
            }
            if (k) {
                var g = b.data.list;
                for (var h in g)l.setCache(h, g[h])
            }
        }, t = function (c) {
            try {
                j.abort()
            } catch (d) {
            }
            var e = a.kit.extra.merge(b.extra, c.data);
            j.request(e);
            a.preventDefault(c.evt)
        }, u = {startClose: function () {
            o.fire("bubbleClose", {type: "start"})
        }, stopClose: function () {
            o.fire("bubbleClose", {type: "stop"})
        }}, v = function (b) {
            a.preventDefault(b.evt);
            k && u.stopClose();
            var c = a.kit.dom.parentElementBy(b.el, e, function (a) {
                if (a.nodeName.toLowerCase() == "li")return!0
            });
            c || (c = a.kit.dom.parentElementBy(b.el, e, function (a) {
                if (a.nodeName.toLowerCase() == "dl")return!0
            }));
            var d = a.kit.dom.parseDOM(a.builder(c).list), f = d.feedHtml.innerHTML, g = b.data.mid, h = b.data.nickName, i = h + n("#L{的心情}");
            if (a.bLength(i) > 20) {
                i = q.decode(i);
                i = q.encode(a.leftB(i, 20)) + "..."
            }
            var j = decodeURIComponent(b.data.mood_url), l = b.data.title || "", m = a.common.dialog.moodComment({mid: g, title: i, nickName: h, content: f, mood_url: j, mood_title: l});
            k && a.custEvent.add(m.dialog, "hide", function () {
                a.custEvent.remove(m.dialog, "hide", arguments.callee);
                u.startClose()
            });
            m.show()
        }, w = function () {
            a.ui.alert(n("#L{加载失败}"))
        }, x = function () {
            g = a.delegatedEvent(d);
            g.add("feed_list_page_n", "click", t);
            g.add("feed_list_page_first", "click", t);
            g.add("feed_list_page_pre", "click", t);
            g.add("feed_list_page_next", "click", t);
            g.add("commentmood", "click", v)
        }, y = function () {
            j = h.getTrans(i, {onSuccess: s, onError: w, onFail: w})
        }, z = function () {
            var c = a.kit.extra.merge(b.extra, {page: 1});
            j.request(c)
        }, A = function () {
            a.custEvent.define(c, "setMiddle");
            a.custEvent.define(c, "setHeightFree")
        }, B = function () {
            k && (l = a.common.mood.showMoodDetail({contentArea: e, outerNode: e, judgeAttr: "moodconf", beforeShow: u.stopClose, afterHide: u.startClose}))
        }, C = function () {
            r();
            y();
            x();
            A();
            B();
            z()
        }, D = function () {
            g && g.destroy && g.destroy();
            a.custEvent.undefine(c);
            l && l.destroy && l.destroy()
        };
        C();
        c.destroy = D;
        return c
    }
});
STK.register("common.mood.moodFilter", function (a) {
    var b = a.kit.extra.language;
    return function (c, d) {
        var e = null, f = {}, g = {DOM: {}, objs: {}, DOM_eventFun: {resetTab: function () {
            a.foreach(g.DOM.moodTab, function (b) {
                a.removeClassName(b, "current")
            })
        }, myMoodFunc: function (b) {
            g.DOM_eventFun.resetTab();
            a.addClassName(b.el, "current");
            g.DOM.moodCalendar[0].style.display = "";
            g.DOM.feedList[0].style.display = "none"
        }, getAllMoodByPage: function (b) {
            var c = {};
            c.page = b;
            a.common.trans.mood.getTrans("myfilter", {onSuccess: function (a) {
                var b = a.data.html;
                g.DOM.feedList[0].innerHTML = b
            }, onError: g.DOM_eventFun.getAllModeError, onFail: g.DOM_eventFun.getAllModeError}).request(c)
        }, allMoodFunc: function (c) {
            g.DOM_eventFun.resetTab();
            a.addClassName(c.el, "current");
            g.DOM.moodCalendar[0].style.display = "none";
            g.DOM.feedList[0].style.display = "";
            if (!g.objs.pageUtil) {
                g.DOM.feedList[0].style.height = "206px";
                var d = b('<div class="W_loading"><span>#L{正在加载，请稍候}...</span></div>');
                g.DOM.feedList[0].innerHTML = d;
                g.objs.pageUtil = a.common.mood.moodPageSearch({fromWhere: "bubble", contentNode: g.DOM.feedList[0], delegateNode: g.DOM.feedList[0], trans: a.common.trans.mood, transName: "myfilter"});
                a.custEvent.add(g.objs.pageUtil, "setHeightFree", function () {
                    g.DOM.feedList[0].style.height = ""
                })
            }
        }}}, h = {}, i = {}, j = {}, k = function () {
            l();
            m();
            n();
            o();
            p();
            q()
        }, l = function () {
            if (!c)throw"node 没有定义"
        }, m = function () {
            g.DOM = a.builder(c).list
        }, n = function () {
            e = a.delegatedEvent(c);
            e.add("allMood", "click", g.DOM_eventFun.allMoodFunc);
            e.add("myMood", "click", g.DOM_eventFun.myMoodFunc);
            g.objs.moodCalendar = a.common.mood.moodCalendar({nodeOuter: g.DOM.moodCalendar[0], custObj: d.custObj})
        }, o = function () {
        }, p = function () {
        }, q = function () {
        }, r = function () {
            e.destroy();
            g.objs && g.objs.moodCalendar && g.objs.moodCalendar.destroy && g.objs.moodCalendar.destroy();
            g.objs && g.objs.pageUtil && g.objs.pageUtil.destroy && g.objs.pageUtil.destroy()
        };
        k();
        f.destroy = r;
        return f
    }
});
STK.register("common.dialog.moodPublish", function (a) {
    return function (b) {
        var c = {}, d = a.kit.extra.language, e = d('<div class="W_loading" style="width:325px;padding-top:15px;padding-bottom:15px;text-align:center"><span>#L{正在加载，请稍候}...</span></div>'), f = null, g = null, h = null, i = null, j;
        b = a.parseParam({isHold: !0}, b);
        var k = function () {
            f = a.ui.dialog();
            f.setTitle(d("#L{Hey！今天心情如何？}"));
            f.setContent(e);
            a.custEvent.define(c, ["success", "error", "show"]);
            q()
        }, l = function (b) {
            a.ui.alert(b.msg);
            f && f.hide()
        }, m = function (b, c) {
            a.common.channel.feed.fire("publish", c.data.feed);
            h && h.destroy && h.destroy();
            j && j.destroy && j.destroy();
            p(c)
        }, n = function (b, d) {
            a.custEvent.fire(c, "error", d)
        }, o = function (b) {
            var c = b.data.html;
            f.setContent(c);
            var d = a.builder(f.getDomList().inner).list, e = d.publishContent[0], i = f.getDomList().layoutContent, k = d.shareContent[0];
            g = a.builder(i).list;
            h = a.common.mood.moodPublish(e);
            a.custEvent.add(h, "success", m);
            a.custEvent.add(h, "error", n);
            j = a.common.mood.shareFeed({node: k, layoutNode: i})
        }, p = function (b) {
            var c = b.data.html;
            f.setContent(c);
            var d = a.builder(f.getDomList().inner).list, e = d.publishContent[0], h = f.getDomList().layoutContent, k = d.shareContent[0];
            g = a.builder(h).list;
            i = a.common.mood.moodFilter(e, {custObj: {style: "big"}});
            j = a.common.mood.shareFeed({node: k, layoutNode: h})
        }, q = function () {
            a.common.trans.mood.getTrans("getMoodFeed", {onSuccess: function (a) {
                var b = a.data.published;
                b != "1" ? o(a) : p(a);
                f.setMiddle()
            }, onError: l, onFail: l}).request({})
        }, r = function () {
            f && f.hide()
        }, s = function () {
            f && f.show();
            f && f.setMiddle();
            a.custEvent.fire(c, "show", {})
        }, t = function () {
            j && j.destroy && j.destroy();
            i && i.destroy && i.destroy();
            h && h.destroy && h.destroy();
            f && f.destroy && f.destroy();
            i = h = f = g = j = undefined
        }, u = function () {
            h && h.reset && h.reset()
        };
        k();
        c.show = s;
        c.hide = r;
        c.destroy = t;
        c.reset = u;
        return c
    }
});
STK.register("common.editor.service.mood", function (a) {
    return function (b, c) {
        var d = {}, e = 0, f, g = function () {
            if (!e) {
                e = 1;
                a.core.evt.preventDefault();
                f || (f = a.common.dialog.moodPublish());
                a.custEvent.add(f, "show", function () {
                    e = 0;
                    a.custEvent.remove(f, "show", arguments.callee)
                });
                f.show()
            }
        };
        d.init = function (b, c, d) {
            a.addEvent(b.nodeList[c], "click", g)
        };
        d.show = g;
        d.hide = function () {
            f && f.hide()
        };
        d.destroy = function () {
        };
        return d
    }
});
STK.register("lib.litter.newyearDia", function (a) {
    var b = '<div class="W_layer" node-type="outer" style="display:none;position:absolute;z-index:10001"><div class="bg"><table border="0" cellspacing="0" cellpadding="0"><tr><td><div class="content" node-type="layoutContent"><div class="title" node-type="title"><span node-type="title_content"></span></div><a href="javascript:void(0);" class="W_close" title="#L{关闭}" node-type="close"></a><div node-type="inner"></div></div></td></tr></table></div></div>', c = a.kit.extra.language, d = null, e, f = function () {
        var b = a.ui.dialog(null, {template: c(e.template)});
        a.custEvent.add(b, "show", function () {
            a.ui.mask.showUnderNode(b.getOuter())
        });
        a.custEvent.add(b, "hide", function () {
            a.ui.mask.back();
            b.setMiddle()
        });
        b.destroy = function () {
            g(b);
            try {
                b.hide(!0)
            } catch (a) {
            }
        };
        return b
    }, g = function (a) {
        a.setTitle("").clearContent();
        d.setUnused(a)
    };
    return function (c) {
        e = a.parseParam({template: b, isHold: !1}, c);
        var h = e.isHold;
        e = a.core.obj.cut(e, ["isHold"]);
        d || (d = a.kit.extra.reuse(f));
        var i = d.getOne();
        h || a.custEvent.add(i, "hide", function () {
            a.custEvent.remove(i, "hide", arguments.callee);
            g(i)
        });
        return i
    }
});
STK.register("kit.dom.children", function (a) {
    return function (b) {
        if (!a.core.dom.isNode(b))throw"Parameter must be an HTMLEelement!";
        var c = [];
        for (var d = 0, e = b.childNodes.length; d < e; d++)b.childNodes[d].nodeType == 1 && c.push(b.childNodes[d]);
        return c
    }
});
STK.register("common.editor.widget.newyear", function (a) {
    return function (b) {
        var c = {}, d, e, f, g, h = [], i = [], j = "", k = "", l, m = 0, n = a.kit.extra.language, o, p, q = !1, r = function (b) {
            var c, e = 66, g, h = 0, i = {}, l = {left: function () {
                h = h + e;
                h > 0 && (h = 0);
                g.play({marginLeft: h})
            }, right: function () {
                h = h - e;
                h < -(c.length - 7) * e && (h = -(c.length - 7) * e);
                g.play({marginLeft: h})
            }, item: function (b) {
                var d = b.data;
                if (f.nodeList.textEl.value == "" || !k || f.nodeList.textEl.value == k + j) {
                    k = n("##L{让红包飞}# ") + d.content;
                    v()
                }
                var e = a.core.json.queryToJson(f.API.getExtra());
                e == "" && (e = {});
                d.pic_id && (e.pic_id = d.pic_id);
                f.API.addExtraInfo(a.core.json.jsonToQuery(e));
                for (var g = 0; c[g]; g++)a.contains(c[g], b.el) ? a.core.dom.addClassName(c[g], "current") : a.core.dom.removeClassName(c[g], "current")
            }}, m = function () {
                d.add("left", "click", l.left);
                d.add("right", "click", l.right);
                d.add("item", "click", l.item)
            }, o = function () {
                c = a.sizzle("li", b);
                g = a.core.ani.tween(b, {animationType: "easeoutcubic", duration: 200});
                m()
            }, p = function () {
                d.remove("left", "click", l.left);
                d.remove("right", "click", l.right);
                d.remove("item", "click", l.item)
            };
            o();
            i.destroy = p;
            return i
        }, s = function (a) {
            var b = {}, c = a.length, d = 0, a = a, e = 12, g = function () {
                var b = "";
                if (c < e) {
                    f.nodeList.change && (f.nodeList.change.style.display = "none");
                    for (var g = 0; g < c; g++)b += a[g]
                } else {
                    for (var g = 0; g < e; g++) {
                        var h = d * e + g;
                        h > c - 1 && (h = h % c);
                        b += a[h]
                    }
                    d++
                }
                return b
            };
            b.getHtml = g;
            return b
        }, t = {recuser: function (b) {
            var c = b.data, d = "@" + c.nickname + " ", e = f.nodeList.textEl.value;
            if (a.core.dom.hasClassName(b.el, "selected")) {
                e = e.replace(d, "");
                j = j.replace(d, "");
                f.nodeList.textEl.value = "";
                f.API.insertText(e);
                a.core.dom.removeClassName(b.el, "selected")
            } else {
                if (e.indexOf(c.nickname) == -1) {
                    f.API.insertText(d);
                    j += d
                }
                a.core.dom.addClassName(b.el, "selected");
                i.push(b.el)
            }
        }, change: function (a) {
            p && (f.nodeList.rec_list.innerHTML = p.getHtml())
        }}, u = function () {
            d.add("recuser", "click", t.recuser);
            d.add("change", "click", t.change)
        }, v = function () {
            f.nodeList.textEl.value = "";
            f.API.insertText(k + j)
        }, w = function (b, c, e) {
            d = a.core.evt.delegatedEvent(b.nodeList.outer);
            f = b;
            g = c;
            u()
        }, x = function () {
            j = "";
            k = "";
            for (var b = 0; i[b]; b++)a.core.dom.removeClassName(i[b], "selected");
            h[0] && a.core.evt.fireEvent(h[0], "click")
        }, y = function () {
            if (!q) {
                var b = n('<div class="W_loading"><span>#L{加载中}...</span></div>');
                f.nodeList.gift_list.innerHTML = b;
                f.nodeList.rec_list.innerHTML = b;
                a.common.trans.editor.getTrans("newyear", {onSuccess: function (b, c) {
                    q = !0;
                    f.nodeList.gift_list.innerHTML = b.data.bainian_html;
                    o = r(f.nodeList.gift_list);
                    h = a.sizzle("a", f.nodeList.gift_list);
                    setTimeout(function () {
                        a.core.evt.fireEvent(h[0], "click")
                    }, 200);
                    var d = b.data.qinmiuser_html || [];
                    p = s(d);
                    f.nodeList.rec_list.innerHTML = p.getHtml()
                }, onError: function (a) {
                    q = !1;
                    var b = n("#L{加载失败}");
                    f.nodeList.gift_list.innerHTML = b;
                    f.nodeList.rec_list.innerHTML = b
                }}).request()
            }
        }, z = function () {
            o && o.destroy();
            d.remove("recuser", "click", t.recuser);
            f = null
        };
        c.init = w;
        c.load = y;
        c.refresh = x;
        c.destroy = z;
        return c
    }
});
STK.register("common.dialog.newyear", function (a) {
    var b = '<div style="position:absolute; z-index:9998;" class="W_layer" node-type="outer"><div class="layer_snake_year" node-type="layoutContent"><div class="bg_snake_top" node-type="title"></div><a href="javascript:void(0)" class="close" node-type="close" title="#L{关闭}"></a><div node-type="inner"></div></div></div>', c = '<#et temp data><div node-type="outer"><div class="snake_top_con"><div class="snake_top"><div class="control"><a href="javascript:void(0)" action-type="left" class="arrow_l"></a><a href="javascript:void(0)" action-type="right" class="arrow_r"></a></div><div class="choose_gift" style=""><ul node-type="gift_list" class="gift_list clearfix" style="z-index:9997"><div class="W_loading"><span>#L{加载中}...</span></div></ul></div></div></div><div class="snake_content"><div class="snake_input"><div class="num" node-type="num">还可以输入<span class="S_spetxt">30</span>字</div><textarea node-type="textEl" name="" cols="" rows="" class="W_input"></textarea></div><div class="choose_friend" node-type="widget"><div class="text"><a node-type="change" href="javascript:void(0)" class="changelink" action-type="change">#L{换一换}</a>#L{你想给谁祝福}：</div><div class="out_box"><ul class="head_list clearfix" node-type="rec_list"><div class="W_loading"><span>#L{加载中}...</span></div></ul></div></div></div><div class="snake_bottom"><div class="bg_snake_bottom"></div><div class="btn clearfix"><a href="javascript:void(0)" node-type="submit" class="btn_year"></a></div></div></div>', d = {title: "#L{有什么新鲜事想告诉大家}", succ: "#L{发布成功}", succTip: '#L{蛇年到，快来参加让红包飞活动，赢汽车手机大奖！<a target="_blank" href="http://2013.weibo.com/?source=pub">去看看</a> }'}, e = a.kit.extra.language, f = {limitNum: 140};
    return function (g) {
        var h = {}, i, j, k, l, m, n, o, p, q, r, s;
        j = a.parseParam({templete: e(c), appkey: "", styleId: "1", newyear: !0, pid: ""}, g);
        q = a.custEvent.define(h, "publish");
        a.custEvent.define(h, "hide");
        var t = function () {
            var b = n.textEl;
            if (k)l === "error" && a.common.extra.shine(b); else {
                k = !0;
                l = "loading";
                var c = a.common.getDiss(u(), n.submit);
                c.pub_type = "dialog";
                p.request(c)
            }
        }, u = function () {
            var b = o.API.getWords();
            r && b.indexOf(r) === -1 && (b = b + r);
            var c = {};
            c.appkey = j.appkey;
            c.style_type = j.styleId;
            c.text = b;
            var d = o.API.getExtra();
            if (d)if (d.indexOf("=") < 0)c.pic_id = o.API.getExtra() || ""; else {
                var e = d, f = a.core.json.queryToJson(e);
                for (var g in f)c[g] = f[g];
                a.log(c)
            }
            return c
        }, v = function (a) {
            if ((a.keyCode === 13 || a.keyCode === 10) && a.ctrlKey) {
                t();
                o.API.blur()
            }
        }, w = function (b, c) {
            var d = c.isOver;
            if (!d) {
                k = !1;
                l = "";
                a.core.dom.removeClassName(n.submit, "disable");
                n.num.innerHTML = e("#L{还可以输入}") + '<span class="S_spetxt">' + (140 - c.count) + "</span>字"
            } else {
                k = !0;
                l = "error";
                a.core.dom.addClassName(n.submit, "disable")
            }
        }, x = function (b, c) {
            l = "";
            var f = a.ui.confirm(d.succ, {title: e("#L{微博拜年}"), icon: "success", textLarge: e(d.succ), textComplex: e(d.succTip), OK: function () {
                H()
            }, OKText: e("#L{让红包飞专题}"), cancel: function () {
            }, cancelText: e("#L{继续发布}")}), g = f.getDomList().OK;
            g.href = "http://2013.weibo.com/?source=pub";
            g.target = "_blank";
            n.textEl.value = "";
            k = !1;
            a.custEvent.fire(q, "publish", [b.data, c]);
            a.common.channel.feed.fire("publish", [b.data, c]);
            o.API.reset();
            i.refresh()
        }, y = function (b, c) {
            k = !1;
            l = "";
            b.msg = b.msg || e("操作失败");
            a.common.layer.ioError(b.code, b)
        }, z = function (a) {
            n.textEl.value = "";
            o.API.insertText(a.content);
            a.appkey && (j.appkey = a.appkey);
            if (a.content) {
                k = !1;
                l = "";
                n.submit.className = "btn_year"
            } else {
                k = !0;
                l = "error";
                n.submit.className = "btn_year disable"
            }
        }, A = function () {
            k = !1
        }, B = function () {
            o = a.common.editor.base(a.core.util.easyTemplate(a.kit.extra.language(j.templete), j).toString(), f);
            if (j.newyear) {
                i = a.common.editor.widget.newyear();
                o.widget(i, "newyear")
            }
            n = o.nodeList;
            s = a.common.dialog.validateCode()
        }, C = function () {
            a.addEvent(n.submit, "click", t);
            a.addEvent(n.textEl, "keypress", v)
        }, D = function () {
            a.custEvent.add(o, "textNum", w)
        }, E = function () {
            p = a.common.trans.feed.getTrans("publish", {onComplete: function (a, b) {
                var c = {onSuccess: x, onError: y, requestAjax: p, param: u(), onRelease: function () {
                    k = !1;
                    l = "";
                    n.submit && (n.submit.className = "send_btn")
                }};
                s.validateIntercept(a, b, c)
            }, onFail: y, onTimeout: y})
        }, F = function () {
            B();
            C();
            D();
            E()
        }, G = function (c) {
            o || F();
            i && i.load();
            var f = a.parseParam({appkey: "", content: "", defaultValue: "", info: "", title: e(d.title)}, c);
            m = a.lib.litter.newyearDia({template: b, isHold: !1});
            m.setTitle(f.title);
            m.appendChild(n.outer);
            m.show();
            m.setMiddle();
            a.winSize().height < 750 && (m.getBox().style.top = "120px");
            z(f);
            o.API.focus();
            i && i.refresh();
            a.custEvent.add(m, "hide", function () {
                a.custEvent.remove(m, "hide", arguments.callee);
                o.closeWidget();
                A();
                m = null;
                a.custEvent.fire(q, "hide")
            });
            r = f.defaultValue
        }, H = function () {
            m.hide()
        }, I = function (a) {
            o.API.addExtraInfo(a)
        }, J = function (a) {
            o.API.disableEditor(a)
        }, K = function () {
            m && m.hide();
            n && n.submit && a.removeEvent(n.submit, "click", t);
            n && n.textEl && a.removeEvent(n.textEl, "keypress", v);
            a.custEvent.remove(o, "textNum", w);
            a.custEvent.undefine(q, "publish");
            s && s.destroy && s.destroy();
            n = null;
            p = null;
            k = !1;
            for (var b in h)delete h[b];
            h = null
        };
        h.addExtraInfo = I;
        h.disableEditor = J;
        h.show = G;
        h.hide = H;
        h.destroy = K;
        return h
    }
});
STK.register("common.editor.service.newyear", function (a) {
    return function (b, c) {
        var d = {}, b, e, f, g = function () {
            var c, d = a.fixEvent(a.getEvent()).target;
            a.contains(b.nodeList.widget, d) ? c = d : c = b.nodeList.more;
            f || (f = a.common.dialog.newyear());
            f.show()
        };
        d.init = function (c, d, f) {
            b = c;
            e = d;
            a.addEvent(c.nodeList[e], "click", g)
        };
        d.destroy = function () {
            f && f.hide();
            f && f.destroy()
        };
        d.show = g;
        return d
    }
});
STK.register("widget.module.component", function (a) {
    return function () {
        var b = {};
        b.initParam = a.core.func.empty;
        b.initEvent = a.core.func.empty;
        b.destroyParam = a.core.func.empty;
        b.destroyEvent = a.core.func.empty;
        b.init = function () {
            b.initParam();
            b.initEvent()
        };
        b.destroy = function () {
            b.destroyEvent();
            b.destroyParam()
        };
        return b
    }
});
STK.register("widget.parse", function (a) {
    var b = "http://js.t.sinajs.cn/t5/home/js/", c = "STK.", d = ["destroy", "part_destroy", "part_flush"], e = 1, f = typeof $CONFIG == "undefined" ? e : $CONFIG.version;
    return function (e, g) {
        var h = a.widget.module.component(), i = a.core.obj.sup(h, ["init", "destroy"]), j = {}, k, l;
        h.handler = {getMethod: function (b) {
            b = b.split(".");
            var c, d = a;
            while (c = b.shift())if (!(d = d[c]))break;
            return d
        }, extract: function (a) {
            var b = h.handler.getMethod(a.ns);
            if (b) {
                j[a.uniqueID] = {info: a, entity: b(a)};
                j[a.uniqueID].entity.init()
            }
        }, getDomInfo: function (b) {
            return{dom: b, top: h.entity.dom, ns: b.getAttribute("component"), uniqueID: a.core.dom.uniqueID(b), data: a.queryToJson(b.getAttribute("component-data") || ""), param: a.queryToJson(b.getAttribute("component-param") || "")}
        }, loadComponent: function (b) {
            var c = h.handler.getDomInfo(b), d = [
                {url: [k.baseURL, c.ns.replace(/\./g, "/"), ".js?version=", f].join(""), NS: k.baseNS + c.ns}
            ];
            a.core.io.require(d, h.handler.extract, c)
        }};
        h.accept = {partDestroy: function (b, c) {
            var d = c.dom;
            for (var e in j)if (a.contains(d, j[e].info.dom)) {
                j[e].entity.destroy();
                delete j[e].info;
                delete j[e].entity;
                delete j[e]
            }
        }, partFlush: function (b, c) {
            a.foreach(a.sizzle("[component]", c.dom), h.handler.loadComponent)
        }};
        h.initParam = function () {
            h.entity = {dom: e};
            l = a.custEvent.define(h.entity.dom, d);
            k = a.parseParam({baseURL: b, baseNS: c}, g);
            j = {}
        };
        h.destroyParam = function () {
            k = null;
            j = null
        };
        h.initEvent = function () {
            a.custEvent.add(l, "part_destroy", h.accept.partDestroy);
            a.custEvent.add(l, "part_flush", h.accept.partFlush)
        };
        h.destroyEvent = function () {
            a.custEvent.remove(l, "part_destroy", h.accept.partDestroy);
            a.custEvent.remove(l, "part_flush", h.accept.partFlush)
        };
        h.destroy = function () {
            for (var a in j) {
                j[a].entity.destroy();
                delete j[a].info;
                delete j[a].entity;
                delete j[a]
            }
            i.destroy()
        };
        h.init = function () {
            i.init();
            a.foreach(a.sizzle("[component]", h.entity.dom), h.handler.loadComponent)
        };
        return h
    }
});
STK.register("lib.connect.iframe", function (a) {
    var b = {}, c = {}, d = function (c, d, e, f) {
        try {
            var g = a.jsonToStr({cid: d, call: e, rs: f});
            b[c] && b[c].contentWindow && b[c].contentWindow.postMessage ? b[c].contentWindow.postMessage(g, "*") : window.navigator["STK_IFRAME_CONNECT_" + c] && window.navigator["STK_IFRAME_CONNECT_" + c](g)
        } catch (h) {
        }
    }, e = function (e) {
        try {
            var f = a.strToJson(e.data);
            if (f.iid in c) {
                a.custEvent.define(c[f.iid], [f.cmd]);
                a.custEvent.fire(c[f.iid], f.cmd, [b[f.iid], f.param, function (a, b) {
                    return d(f.iid, f.cid, a, b)
                }])
            }
        } catch (g) {
        }
    };
    window.postMessage ? a.addEvent(window, "message", e) : window.navigator.STK_IFRAME_CONNECT_OUT = function (a) {
        e({data: a})
    };
    return function (e) {
        if (!e)return!1;
        e.contentWindow.name = e.name = e.name || "iframe_" + a.getUniqueKey();
        if (e.name in b) {
            if (b[e.name] != e)throw"iframe:" + e.name + " is existed! "
        } else {
            b[e.name] = e;
            c[e.name] = {};
            e.src = e.getAttribute("_src");
            e.removeAttribute("_src");
            e.contentWindow.name = e.name
        }
        return{trigger: function (a, b) {
            d(e.name, "_EVENT_", a, b)
        }, on: function (b, d) {
            a.custEvent.define(c[e.name], b);
            a.custEvent.add(c[e.name], b, d)
        }, off: function (b, d) {
            a.custEvent.remove(c[e.name], b, d)
        }, destory: function () {
            a.custEvent.undefine(c[e.name]);
            delete c[e.name]
        }}
    }
});
STK.register("common.bubble.sandbox", function (a) {
    var b = {}, c = a.kit.extra.language;
    return function (d) {
        var e = {}, f = function () {
            d.insert(arguments[0], arguments[1]);
            h.remove(b.ishow)
        }, g = 1, h = {add: function (a) {
            if (!b[a.id]) {
                b[a.id] = {};
                b[a.id].box = h.build(a)
            }
            b.ishow = a.id;
            return b[a.id]
        }, has: function (a) {
            return b[a.id]
        }, remove: function (c) {
            if (b[c]) {
                a.custEvent.remove(b[c].layer.getInner(), "bridge", f);
                try {
                    b[c].wbml.destroy && b[c].wbml.destroy()
                } catch (d) {
                }
                try {
                    b[c].iframe.destroy && b[c].iframe.destroy()
                } catch (d) {
                }
                b[c].box.destroy && b[c].box.destroy();
                b[c].layer.destroy && b[c].layer.destroy();
                var e = b[c].layer.getOuter();
                e.parentNode.removeChild(e);
                delete b[c]
            }
        }, build: function (e) {
            var h = a.ui.bubble({isHold: !0});
            g++;
            var j = a.builder(e.html);
            h.setContent(j.box);
            b[e.id].layer = h;
            var k = h.getDomList().inner;
            b[e.id].wbml = a.widget.parse(k);
            b[e.id].wbml.init();
            a.custEvent.define(k, "bridge");
            a.custEvent.add(k, "bridge", f);
            a.custEvent.once(h, "show", function () {
                setTimeout(function () {
                    var f = a.builder(h.getBox()).list, g = f.iframe && f.iframe[0], i;
                    if (g) {
                        b[e.id].iframe = i = a.lib.connect.iframe(g);
                        i.on("insertIntoPublishTop", function (a, b, e, f) {
                            function g(a) {
                                return typeof a == "string" || a && typeof a.substr == "function"
                            }

                            g(e) && (e = {text: e});
                            d.insert("这个值没有用", {text: e.text, tip: e.tip || c("#L{添加成功}")})
                        });
                        i.on("setHeight", function (a, b, c, d) {
                            b.style.height = c + "px"
                        });
                        i.on("setWidth", function (a, b, c, d) {
                            b.style.width = c + "px"
                        });
                        i.on("close", function (a, b, c, d) {
                            h.hide();
                            d("callback")
                        });
                        i.on("setTittle", function (b, c, d, e) {
                            var f = a.sizzle("div", h.getDomList().inner)[0] || null;
                            f && (f.innerHTML = d)
                        });
                        a.custEvent.add(h, "hide", function () {
                            i.trigger("close")
                        })
                    }
                }, 10)
            });
            return h
        }, destroy: function () {
            for (var a in b)h.remove(a)
        }};
        e.layers = b;
        e.add = h.add;
        e.remove = h.remove;
        e.destroy = h.destroy;
        return e
    }
});
STK.register("common.editor.service.plugin", function (a) {
    var b = a.common.trans.editor;
    return function (c, d) {
        d = a.parseParam({widget: c.nodeList.widget}, d || {});
        var e = {}, f, g, h, i = !1, j = {init: function () {
            f = a.delegatedEvent(d.widget);
            f.add("plugin", "click", j.show)
        }, show: function (b) {
            c.API.setCurrentLogType(b.data.log);
            a.preventDefault();
            if (!i) {
                i = !0;
                var d = a.fixEvent(a.getEvent()).target;
                a.contains(c.nodeList.widget, d) ? h = d : h = c.nodeList.more;
                j.asynShow(b)
            }
        }, asynShow: function (d) {
            i = !1;
            g || (g = a.common.bubble.sandbox({insert: j.insert}));
            var e = function () {
                setTimeout(function () {
                    g.layers[f].layer.show();
                    a.custEvent.add(c, "close", g.layers[f].layer.hide)
                }, 0)
            }, f = d.data.type;
            g.layers[f] ? e() : b.request("interactive", {onSuccess: function (b) {
                var i = a.kit.extra.merge({html: b.data.html, id: f}, d.data);
                g.add(i);
                g.layers[f].layer.setAlignPos(h, c.nodeList.textEl, {fail: function () {
                    g.layers[f].layer.setLayout(h, {offsetX: -24, offsetY: 5})
                }});
                e()
            }, onError: function () {
            }}, d.data)
        }, insert: function (b, d) {
            var e = c.API.getCurrentLogType();
            c.API.addShortUrlLog(e);
            c.API.insertText(d.text);
            setTimeout(function () {
                c.nodeList.textEl.blur();
                c.nodeList.textEl.focus()
            }, 0);
            a.ui.tip("lite", {msg: d.tip, type: "succM", timer: "1000"})
        }};
        j.init();
        e.delegatedEvent = f;
        e.show = j.show;
        e.destory = function () {
            f.destory();
            g.destory()
        };
        return e
    }
});
STK.register("common.editor.service.center", function (a) {
    var b = a.common.editor.service;
    return function (c, d) {
        d = a.parseParam({widget: c.nodeList.widget, devent: ""}, d || {});
        var e = {}, f, g, h = {list: ["face", "image", "multiimage", "video", "music", "topic", "vote", "mood", "newyear"], entity: {}, widgetList: {}, func: function (a) {
            return function (d) {
                d.data.isimage ? c.API.setImageLogType(d.data.log) : c.API.setCurrentLogType(d.data.log);
                h.widgetList[a] || (h.widgetList[a] = b[a](c));
                h.widgetList[a].show()
            }
        }}, i = {init: function () {
            i.bind()
        }, bind: function () {
            a.custEvent.define(c, "close");
            f = d.devent ? d.devent : a.delegatedEvent(d.widget);
            for (var e = 0, i = h.list.length; e < i; e++) {
                var j = h.list[e];
                h.entity[j] = h.func(j);
                f.add(j, "click", h.entity[j])
            }
            g = b.plugin(c, d)
        }, close: function () {
            a.custEvent.fire(c, "close", {type: "publish"})
        }, destroy: function () {
            for (var a = 0, b = h.list.length; a < b; a++) {
                var c = h.list[a];
                f.remove(c, "click", h.entity[c])
            }
            for (var d in h.widgetList)h.widgetList[d].destroy && h.widgetList[d].destroy();
            g.destroy()
        }};
        i.init();
        e.close = i.close;
        e.destroy = i.destroy;
        return e
    }
});
STK.register("common.editor.service.morePlugin", function (a) {
    var b = a.common.trans.editor, c = a.kit.extra.language, d = ['<div class="layer_menu_list" node-type="outer" style="position:absolute;z-index:10000;">', '<div node-type="inner" >', '<div node-type="plugins" class="app_menu">', "</div>", "</div>", "</div>"];
    return function (b) {
        var c = {}, d, e, f, g, h = !1, i = {number: 4, defNumber: 2}, j = {list: [], data: {}, add: function (a) {
            var b = a.type;
            j.data[b] = a
        }, destroy: function () {
            j.list = [];
            j.data = {}
        }}, k, l = {init: function () {
            var c = a.queryToJson(b.nodeList.widget.getAttribute("node-data") || "");
            i = a.parseParam(i, c);
            l.buildMenu()
        }, showMenu: function (b) {
            e.style.display = "";
            e.style.zIndex = "10000";
            var c = a.position(b), d = a.core.dom.getSize(b);
            a.core.dom.setXY(e, {t: c.t + d.height + 3, l: c.l - 5});
            window.SUDA && SUDA.uaTrack && SUDA.uaTrack("tblog_home_edit", 'unfold_more"')
        }, hideMenu: function () {
            e.style.display = "none"
        }, buildMenu: function () {
            e = b.nodeList.morePlugin;
            if (!!e) {
                document.body.appendChild(e);
                e.style.position = "absolute";
                a.common.editor.service.center(b, {widget: e});
                l.menuEvt()
            }
        }, menuEvt: function () {
            a.addEvent(e, "click", l.hideMenu)
        }, destroy: function () {
            a.removeEvent(e, "click", l.hideMenu);
            d && d.destroy()
        }};
        l.init();
        c.menu = e;
        c.show = l.showMenu;
        c.hide = l.hideMenu;
        c.destroy = l.destroy;
        return c
    }
});
STK.register("kit.dom.hover", function (a) {
    return function (b) {
        var c = b.delay || 300, d = b.moutDelay || c, e = b.isover || !1, f = b.act, g = b.extra || [], h = null, i = function (a) {
            e && b.onmouseover.apply(f, [a])
        }, j = function (a) {
            e || b.onmouseout.apply(f, [a])
        }, k = function (a) {
            e = !0;
            h && clearTimeout(h);
            h = setTimeout(function () {
                i(a)
            }, c)
        }, l = function (a) {
            e = !1;
            h && clearTimeout(h);
            h = setTimeout(function () {
                j(a)
            }, d)
        };
        a.core.evt.addEvent(f, "mouseover", k);
        a.core.evt.addEvent(f, "mouseout", l);
        for (var m = 0, n = g.length; m < n; m += 1) {
            a.core.evt.addEvent(g[m], "mouseover", k);
            a.core.evt.addEvent(g[m], "mouseout", l)
        }
        var o = {};
        o.destroy = function () {
            a.core.evt.removeEvent(f, "mouseover", k);
            a.core.evt.removeEvent(f, "mouseout", l);
            for (var b = 0, c = g.length; b < c; b += 1) {
                a.core.evt.removeEvent(g[b], "mouseover", k);
                a.core.evt.removeEvent(g[b], "mouseout", l)
            }
        };
        return o
    }
});
STK.register("kit.dom.firstChild", function (a) {
    var b = a.core.dom.next;
    return function (a) {
        var c = a.firstChild;
        c && c.nodeType != 1 && (c = b(c));
        return c
    }
});
STK.register("common.editor.service.base", function (a) {
    var b = a.common.editor.service, c = a.common.editor.plugin;
    return function (d, e) {
        var f = {}, g, h, i, j, k;
        e = a.kit.extra.merge({limitNum: 140}, e);
        var l = function (b) {
            var c = a.fixEvent(b).target;
            if (a.contains(i.nodeList.more, c) || c == i.nodeList.more) {
                m.showMenu();
                var d = a.kit.dom.firstChild(i.nodeList.more);
                d && a.addClassName(d, "W_arrow_turn")
            } else {
                m.hideMenu();
                var d = a.kit.dom.firstChild(i.nodeList.more);
                d && a.removeClassName(d, "W_arrow_turn")
            }
        }, m = {init: function () {
            m.build();
            m.bind()
        }, build: function () {
            i = a.ui.mod.editor(d, e);
            j = c.at(i, e);
            (typeof e.count == "undefined" || e.count == "enable") && c.count(i);
            var f = a.common.editor.plugin.sucTip(i, e);
            j.init();
            i.init();
            f.init();
            k = c.imgPreview(i);
            g = b.center(i);
            h = b.morePlugin(i)
        }, bind: function () {
            i.nodeList.more && a.addEvent(document.body, "click", l)
        }, showMenu: function () {
            h.show(i.nodeList.more)
        }, hideMenu: function () {
            h.hide()
        }, destroy: function () {
            k && k.destroy();
            i.destroy && i.destroy();
            j.destroy && j.destroy();
            g.destroy && g.destroy();
            i.nodeList.more && a.removeEvent(document.body, "click", l);
            h.destroy()
        }, closeWidget: function () {
            g.close()
        }};
        m.init();
        f.editor = i;
        f.destroy = m.destroy;
        f.closeWidget = m.closeWidget;
        return f
    }
});
STK.register("common.editor.plugin.authentication", function (a) {
    return function (b) {
        var c = a.kit.extra.language;
        b = a.parseParam({target: "", span: 6e3, type: "", call: function () {
        }}, b || {});
        var d = {sucess: '<div node-type="sucess" class="send_success_shiming"><a href="http://weibo.com/z/vshenfen/" suda-data="key=tblog_identify_stripe&value=identify_do"></a></div>', fail: '<div node-type="fail" class="send_error_shiming"><a href="http://weibo.com/z/vshenfen/" suda-data="key=tblog_identify_stripe&value=badge_apply"></a></div>', verifySuccess: c('<div node-type="verifySuccess" class="send_succpic sendsucc_detail"><p class="icon_succB"></p><p class="txt">#L{发布成功}</p><p class="note">#L{完成身份验证，帐号更完全，微博交流更放心。}<a node-type="showIdentify" href="javascript:void(0);">#L{现在验证}»</a></p></div> ')}, e, f = {}, g = {run: function (c) {
            c = a.parseParam({span: 6e3, type: ""}, c || {});
            var g = c.type, h = f[g], i, j;
            if (!h) {
                var k = d[g];
                h = a.builder(k).list[g][0];
                a.insertBefore(h, b.target);
                f[g] = h
            }
            h.style.display = "";
            if (g == "verifySuccess") {
                i = a.sizzle('a[node-type="showIdentify"]', h);
                if (i[0]) {
                    j = function () {
                        var b = a.common.dialog.authentication({});
                        b.show()
                    };
                    a.addEvent(i[0], "click", j)
                }
            }
            e = setTimeout(function () {
                h.style.display = "none";
                b.call();
                i[0] && a.removeEvent(i[0], "click", j)
            }, c.span)
        }, destroy: function () {
            clearTimeout(e)
        }};
        return g
    }
});
STK.register("common.channel.versionTip", function (a) {
    var b = ["callBack"];
    return a.common.listener.define("common.channel.versionTip", b)
});
STK.register("common.editor.plugin.hotTopic", function (a) {
    var b = function (a) {
        pos = a.value.length;
        coverlen = 0;
        if (a.createTextRange) {
            var b = a.createTextRange();
            b.move("character", pos);
            b.moveEnd("character", coverlen);
            b.select()
        } else a.setSelectionRange(pos, pos + coverlen)
    };
    return function (c, d) {
        var e = c.nodeList, f = {}, g = !1, h = {}, i = {}, j = "", k, l = !1, m = {init: function () {
            m.parseParam();
            j = m.getContent();
            m.initTopic();
            m.bind();
            document.activeElement == e.textEl && m.showTopic()
        }, parseParam: function () {
            h = a.parseParam(h, d || {})
        }, bind: function () {
            a.custEvent.define(c, ["focus", "blur"]);
            a.custEvent.add(c, "changed", m.clearTip);
            a.custEvent.add(c, "focus", m.showTopic);
            a.custEvent.add(c, "blur", m.lazyShowTip)
        }, initTopic: function () {
            var a = e.textEl.getAttribute("hottopic") || null, b = e.textEl.getAttribute("hottopicid") || null;
            !b || !a ? g = !0 : i = {topic: "#" + a + "#", tip: j, id: b}
        }, getTopicContent: function () {
            return i.topic
        }, getTopicId: function () {
            return i.id
        }, getContent: function () {
            return c.API.getWords()
        }, setContent: function (a) {
            e.textEl.value = a
        }, reset: function () {
            j = "";
            g = !1
        }, clearTip: function () {
            a.removeClassName(e.textEl, "S_txt2");
            c.API.delWords(i.tip)
        }, lazyShowTip: function (a) {
            k = setTimeout(m.showTip, 160)
        }, showTip: function () {
            if (!g) {
                var b = m.getContent();
                if (b && b !== i.topic || b == "")g = !0; else {
                    m.setContent(i.tip);
                    a.addClassName(e.textEl, "S_txt2");
                    c.API.disableEditor(!1);
                    a.core.dom.addClassName(c.nodeList.publishBtn, "disable");
                    a.custEvent.fire(c, "setIsPublishAvailable", !1)
                }
                a.custEvent.fire(c, "checkText");
                k = null
            }
        }, showTopic: function () {
            if (!g) {
                if (k) {
                    clearTimeout(k);
                    return
                }
                var c = m.getContent();
                if (c && c !== i.tip)g = !0; else {
                    m.setContent(i.topic + " ");
                    a.removeClassName(e.textEl, "S_txt2");
                    b(e.textEl)
                }
            }
        }, hasInput: function () {
            return g
        }, canPublish: function () {
            return c.API.getWords() !== i.tip
        }, setInputed: function () {
            g = !0
        }, setChanged: function () {
            c.API.getWords() !== i.topic && (l = !0)
        }, hasChanged: function () {
            return l
        }};
        m.init();
        f.hasInput = m.hasInput;
        f.canPublish = m.canPublish;
        f.getTopicId = m.getTopicId;
        f.setInputed = m.setInputed;
        f.lazyShowTip = m.lazyShowTip;
        f.setChanged = m.setChanged;
        f.hasChanged = m.hasChanged;
        return f
    }
});
STK.register("common.editor.plugin.dragImage", function (a) {
    var b = a.kit.extra.language, c = '<div class="img_upload" node-type="dragTip" style="display:none;"><b></b><span class="iu-tip"><i class="W_ico12 icon_sw_ipt"></i>#L{拖动图片到这里上传}</span></div>';
    return function (d) {
        var e = {}, f = d.nodeList.textElDiv, g, h = [], i = [], j, k = {contain: function (b, c) {
            return b == c || a.core.dom.contains(b, c) ? !0 : !1
        }, deleteInArr: function (a, b) {
            var c = [], d = b.length;
            for (var e = 0; e < d; e++)a != b[e] && c.push(b[e]);
            return c
        }, showTip: function () {
            if (!j) {
                j = a.builder(b(c)).list.dragTip[0];
                f.appendChild(j)
            }
            j.style.display = ""
        }}, l = function (b) {
            if (!!a.inArray("Files", b.dataTransfer.types)) {
                b.preventDefault();
                var c = b.target;
                i.push(c);
                k.showTip()
            }
        }, m = function (b) {
            if (!!a.inArray("Files", b.dataTransfer.types)) {
                b.preventDefault();
                var c = b.target;
                i = k.deleteInArr(c, i);
                i[0] || (j.style.display = "none")
            }
        }, n = {uploading: function (a) {
            g.uploading({data: [
                {fid: a.fid, name: a.name}
            ]}, "drag")
        }, uploaded: function (a) {
            g.uploaded({data: {pid: a.pid}, fid: a.fid})
        }, error: function (a) {
            var b = "fileSizeErr", c = "";
            if (a.code == 9) {
                b = "singleError";
                c = "A20001"
            }
            g.error({type: b, fid: a.fid, data: {sourceData: {code: c}}})
        }}, o = function (a) {
            switch (a) {
                case"image/jpeg":
                case"image/png":
                case"image/gif":
                case"image/bmp":
                case"image/jpg":
                    return!0;
                default:
                    return!1
            }
        }, p = function (b) {
            if (!!a.inArray("Files", b.dataTransfer.types)) {
                i = [];
                j.style.display = "none";
                if (!k.contain(d.nodeList.textElDiv, b.target) && g && g.getDomList("box") && !k.contain(g.getDomList("box"), b.target))return;
                b.stopPropagation();
                b.preventDefault();
                var c = b.dataTransfer.files;
                for (var e = 0, f; f = c[e]; e++) {
                    var l = f.type ? f.type : "n/a", m = new FileReader;
                    if (o(l)) {
                        m.onload = function (b) {
                            return function (c) {
                                var d = a.getUniqueKey();
                                if (!g.isOutstanding()) {
                                    h[d] = a.kit.extra.upload({type: "base64", imgName: b.name, base64Str: c.target.result.split(",")[1]});
                                    n.uploading({fid: d, name: b.name});
                                    a.custEvent.add(h[d], "uploadSucc", function (a, b) {
                                        var c = b.pid;
                                        n.uploaded({fid: d, pid: b.pid})
                                    });
                                    a.custEvent.add(h[d], "uploadError", function (a, b) {
                                        n.error({code: b.code, fid: d})
                                    })
                                }
                            }
                        }(f);
                        m.readAsDataURL(f)
                    }
                }
            }
        }, q = function (b) {
            if (!!a.inArray("Files", b.dataTransfer.types)) {
                if (!k.contain(d.nodeList.textElDiv, b.target) && g && g.getDomList("box") && !k.contain(g.getDomList("box"), b.target)) {
                    a.core.dom.removeClassName(d.nodeList.textElDiv, "clicked");
                    return
                }
                a.core.dom.addClassName(d.nodeList.textElDiv, "clicked");
                b.stopPropagation();
                b.preventDefault()
            }
        }, r = function () {
            i = [];
            j && (j.style.display = "none")
        }, s = function () {
            if (document.body.addEventListener) {
                document.body.addEventListener("dragenter", l, !1);
                document.body.addEventListener("dragleave", m, !1);
                document.body.addEventListener("dragover", q, !1);
                document.body.addEventListener("drop", p, !1);
                document.body.addEventListener("click", r)
            }
        }, t = function () {
            g = d.getPreview();
            a.custEvent.add(d, "close", function () {
                g && g.hide()
            });
            s()
        }, u = function () {
            if (document.body.removeEventListener) {
                document.body.removeEventListener("dragenter", l, !1);
                document.body.removeEventListener("dragleave", m, !1);
                document.body.removeEventListener("dragover", q, !1);
                document.body.removeEventListener("drop", p, !1);
                document.body.removeEventListener("click", r)
            }
        };
        t();
        e.destroy = u;
        return e
    }
});
STK.register("pl.content.publisherTop.source.init", function (a) {
    var b = a.core.evt.addEvent, c = a.core.evt.fireEvent, d = a.core.evt.custEvent, e = a.core.dom.getStyle, f = a.core.dom.setStyle, g = a.core.io.ajax, h = a.kit.extra.language, i = a.core.util.templet, j = a.core.util.easyTemplate, k = ["#在这里输入你想要说的话题#"], l = h('<p class="icon_succB"></p><p class="txt">#L{发布成功}</p>');
    return function (e, f) {
        var g = {}, i, m, n, o, p, q, r, s, t = 2, u, v, w = {restore: function () {
            var a = STK.core.util.storage.get("publisherTop_word" + $CONFIG.uid);
            return a != "null" && a != null && a.length != 0 ? a : !1
        }, store: function () {
            var a = o.API.getWords();
            (typeof P.tipText == "undefined" || a != P.tipText) && STK.core.util.storage.set("publisherTop_word" + $CONFIG.uid, a)
        }, delWord: function () {
            STK.core.util.storage.del("publisherTop_word" + $CONFIG.uid)
        }, filterWords: function () {
            var a = o.API.getWords();
            for (var b = 0, c = k.length; b < c; b++)var d = a.replace(new RegExp(k[b], "g"), "");
            return d
        }, enableEditor: function (b) {
            b.isSending = !1;
            a.core.dom.removeClassName(m.publishBtn, "disable")
        }, disableEditor: function (b) {
            b.isSending = !0;
            a.core.dom.addClassName(m.publishBtn, "disable")
        }, setIsPublishAvailable: function (a, b) {
            n = !!b
        }}, x = {cache: null, timeout: 30, displayTime: 1500, loading: !1, last: "", lsn: null, TEMP: h('<#et topic data><span style="white-space:nowrap">${data.title} <a href="javascript:;" action-type="item" action-data="id=${data.id}" class="normal">#L{马上分享}</a></span> </#et>'), TEMP_new: h('<#et topic data><span style="white-space:nowrap">${data.title} <a href="${data.url}" target="_blank" class="normal" suda-data="key=issu_guide&value=open" >${data.link_title}</a></span> </#et>'), layer: a.ui.layer({template: '<div class="layer_tips" style="display:none;width:auto;" node-type="outer"><div node-type="inner"></div><a node-type="close" class="W_ico12 icon_close" href="javascript:;" onclick="return false;" suda-data="key=issu_guide&value=close"></a><span node-type="arrow"></span></div>'}), closeBtn: null, dEvent: null, isDone: !1, init: function () {
            m.wrap.appendChild(x.layer.getBox());
            x.closeBtn = x.layer.getDomList().close;
            x.dEvent = a.core.evt.delegatedEvent(x.layer.getBox());
            var c = a.common.guide.util.tipLayer(), d = {target: m.textEl, layer: x.layer.getBox(), pos: "top", arrow: x.layer.getDomList().arrow}, e = c.getLayerPosition(d.target, d.layer, d.pos, d.arrow), f = a.core.dom.position(m.textEl);
            e.arrow.left = "15px";
            e.left = f.l;
            e.top = f.t;
            c.setPosition(d, e);
            x.layer.hide();
            a.setStyle(d.layer, "position", "absolute");
            a.setStyle(d.layer, "width", "auto");
            a.setStyle(d.layer, "paddingRight", "20px");
            b(x.closeBtn, "click", x.close);
            x.dEvent.add("item", "click", function (b) {
                a.preventDefault();
                x.isDone = !0;
                a.common.trans.editor.getTrans("getTvLink", {onSuccess: function (a) {
                    var b = a.data;
                    m.textEl.value += b.epgFragment || "";
                    x.lsn && clearTimeout(x.lsn);
                    x.layer.hide();
                    m.textEl.focus()
                }, onError: function () {
                    x.layer.hide();
                    m.textEl.focus()
                }}).request({type: "tvup", epgId: b.data.id})
            });
            c = null
        }, getTs: function () {
            return Date.parse(new Date) / 1e3
        }, show: function (b) {
            if (!x.isDone) {
                b.link_title ? x.layer.getDomList().inner.innerHTML = j(x.TEMP_new, b) : x.layer.getDomList().inner.innerHTML = j(x.TEMP, b);
                var c = x.layer.getBox();
                if (c.style.display == "")return;
                x.layer.show();
                a.setStyle(c, "opacity", 0);
                var d = a.core.dom.position(m.textEl), e = a.core.dom.getSize(c), f = d.t - e.height - 15;
                a.core.ani.tween(c, {duration: 500, end: function () {
                    a.setStyle(c, "filter", "")
                }}).play({opacity: 1, top: f}).destroy()
            }
        }, match: function () {
            var a = x.getData(), b = {}, c = !1;
            if (a && a.data) {
                a = a.data;
                for (var d in a)if (x.last.indexOf(a[d].keyword) > -1 && a[d].title) {
                    c = !0;
                    x.show({id: d, content: a[d].keyword, title: a[d].title, link_title: a[d].link_title || "", url: a[d].url || ""});
                    break
                }
                c || x.layer.hide()
            }
        }, getData: function () {
            if (!x.cache) {
                x.cache = a.storage.get("suggest-topic-data");
                !x.cache || x.cache === "null" ? x.cache = null : x.cache = a.core.json.strToJson(x.cache)
            }
            var b = x.getTs();
            if (!x.cache || !x.cache.timeout || x.cache && x.cache.timeout < b) {
                if (x.loading)return;
                x.loading = !0;
                a.common.trans.editor.getTrans("rectopic", {onComplete: function (c, d) {
                    if (c && c.code == "100000") {
                        var e = {timeout: b + x.timeout, data: c.data};
                        a.storage.set("suggest-topic-data", a.core.json.jsonToStr(e));
                        x.cache = e
                    }
                    x.loading = !1
                }}).request({})
            }
            return x.cache
        }, autoDisplay: function (a) {
            if (x.last !== a && !x.isDone) {
                x.lsn = setTimeout(x.match, x.displayTime);
                x.last = a
            }
        }, close: function () {
            x.isDone = !0;
            x.layer.hide();
            o.API.focus();
            a.core.evt.preventDefault()
        }, destroy: function () {
            a.removeEvent(x.closeBtn, "click", x.close);
            x.lsn && clearTimeout(x.lsn);
            x = null
        }}, y = function (b) {
            var b = b || window.event, c = b.target || b.srcElement;
            if (!c || !/^embed|object$/i.test(c.tagName.toLowerCase())) {
                a.common.extra.shine(o.nodeList.textEl);
                o.API.focus()
            }
        }, z = {publishBtn: function () {
            var b = o.nodeList.textEl;
            a.preventDefault();
            if (b.isSending)return!1;
            if (!n)a.common.extra.shine(b); else {
                a.custEvent.fire(o, "theEnd", {time: new Date, text: o.API.getWords()});
                v && v.setInputed();
                o.API.disableEditor(!0);
                w.disableEditor(b);
                r && r.disable();
                var c = o.API.getWords(), d = o.API.getExtra(), e = "", f = "";
                if (r) {
                    var g = r.rank();
                    e = g.rank;
                    f = g.rankid
                }
                var j = a.common.trans.feed, k = v ? v.getTopicId() : "", l = o.API.getShortUrlLog(), q = function () {
                    o.API.disableEditor(!1);
                    b.isSending = !1;
                    A.checkText()
                }, u = function (b, c) {
                    a.common.channel.feed.fire("publish", b.data.html);
                    a.custEvent.fire(window.$CONFIG || {}, "publish", {params: c, ret: b});
                    if (b.data.verification) {
                        !s && (s = a.common.editor.plugin.authentication({target: o.nodeList.successTip, call: q}));
                        s.run({type: "verifySuccess"})
                    } else {
                        o.nodeList.successTip.style.display = "";
                        setTimeout(function () {
                            o.nodeList.successTip.style.display = "none";
                            q()
                        }, t * 1e3)
                    }
                    o.API.reset();
                    w.delWord();
                    i.closeWidget();
                    n = !1;
                    a.core.dom.addClassName(m.publishBtn, "disable");
                    r && r.reset()
                }, x = function (c, d) {
                    c = c || {};
                    var e = c.data;
                    if (e && e.verification) {
                        !s && (s = a.common.editor.plugin.authentication({target: o.nodeList.successTip, type: "fail", call: function () {
                            o.API.disableEditor(!1);
                            w.enableEditor(b)
                        }}));
                        s.run({type: "fail"})
                    } else {
                        c.msg = c.msg || h("操作失败");
                        a.common.layer.ioError(c.code, c);
                        o.API.disableEditor(!1);
                        w.enableEditor(b)
                    }
                    r && r.enable()
                }, y = function () {
                    return{text: c, pic_id: d, rank: e, rankid: f, _surl: l, hottopicid: k}
                }, z = j.getTrans("publish", {onComplete: function (a, c) {
                    var d = {onSuccess: u, onError: x, requestAjax: z, param: y(), onRelease: function () {
                        o.API.disableEditor(!1);
                        w.enableEditor(b);
                        r && r.enable()
                    }};
                    p.validateIntercept(a, c, d)
                }, onFail: x, onTimeout: x});
                z.request(a.common.getDiss(y(), m.publishBtn))
            }
        }, hotKey: function (b) {
            var c = a.core.evt.fixEvent(b);
            (c.ctrlKey && c.keyCode == 13 || c.ctrlKey && c.keyCode == 10) && z.publishBtn()
        }}, A = {changeRank: function (a, b) {
            r && r.miYouStyle.apply(null, arguments)
        }, checkText: function (b) {
            if (!!o) {
                var c = !0;
                try {
                    v && v.setChanged();
                    c = v && v.canPublish() || !v;
                    v ? v && v.hasChanged() ? w.store() : w.delWord() : w.store()
                } catch (d) {
                    a.log(d)
                }
                var e = w.filterWords(), f = o.API.count(), g = P.limitNum - f, i = g >= 0 ? !0 : !1, j = '<a target="_blank" href="http://weibo.com/z/guize/gongyue.html" class="S_txt2">#L{发言请遵守“七条底线”}</a>，', k = h(j + "#L{还可以输入%s字}", "<span>" + g + "</span>"), l = h(j + "#L{已经超过%s字}", '<span class="S_error">' + Math.abs(g) + "</span>");
                if (f > 0 && e != "") {
                    if (c)if (i) {
                        a.core.dom.removeClassName(m.publishBtn, "W_btn_v_disable");
                        n = !0;
                        b && o.API.textElFocus();
                        m.num.innerHTML = k
                    } else {
                        a.core.dom.addClassName(m.publishBtn, "W_btn_v_disable");
                        n = !1;
                        b && o.API.textElFocus();
                        m.num.innerHTML = l
                    }
                    x.autoDisplay(e)
                } else {
                    a.core.dom.addClassName(m.publishBtn, "W_btn_v_disable");
                    n = !1;
                    m.num.innerHTML = k
                }
            }
        }, setSucTipDelay: function (a, b) {
            t = b || 2
        }}, B = {}, C = function () {
            D();
            E();
            G();
            F();
            H();
            M();
            if (w.restore()) {
                m.textEl.value = "";
                a.core.dom.removeClassName(m.textEl, "S_txt2");
                o.API.insertText(w.restore());
                m.textEl.focus();
                c(m.textEl, "focus")
            } else v = a.common.editor.plugin.hotTopic(o)
        }, D = function () {
            if (!e)throw"node is not defined"
        }, E = function () {
            i = a.common.editor.service.base(e, P);
            o = i.editor;
            try {
                u = a.common.editor.plugin.dragImage(o)
            } catch (b) {
            }
            m = a.kit.dom.parseDOM(a.core.dom.builder(e).list);
            o.nodeList.successTip.innerHTML = l;
            if (!m.publishBtn)throw"can not find nodes in comp.content.publisherTop"
        }, F = function () {
            a.hotKey.add(document.documentElement, ["f"], y, {type: "keyup", disableInInput: !0});
            a.hotKey.add(document.documentElement, ["p"], y, {type: "keyup", disableInInput: !0});
            if ($CONFIG.afterupgrade == "true") {
                var b = "6b888227jw1dm6730omlvj", c = a.common.dialog.publish({styleId: "1", picBtn: !1});
                c.show({title: h("#L{快把升级新版的好消息分享给大家吧}"), content: h("#L{[话筒]#新版微博#开放升级啦。我已经抢“鲜”体验，新版很给力、功能很强大，新鲜应用、热门游戏应有尽有，两栏、三栏版本自由切换。hold不住了吧？你也来升级吧，不用邀请码哦。}http://weibo.com/new")});
                c.addExtraInfo("pic_id=" + b)
            }
            x.init();
            r = a.common.editor.plugin.publishTo({editorWrapEl: e, textEl: m.textEl})
        }, G = function () {
            b(m.publishBtn, "click", z.publishBtn);
            b(m.textEl, "keypress", z.hotKey);
            b(m.textEl, "focus", function () {
                m.textElDiv && (m.textElDiv.className = "input clicked");
                q || (q = setInterval(function () {
                    A.checkText()
                }, 200));
                x.getData();
                0 == w.filterWords() && x.layer.hide()
            });
            b(m.textEl, "keydown", function () {
                q || (q = setInterval(function () {
                    A.checkText()
                }, 200))
            });
            b(m.textEl, "blur", function () {
                m.textElDiv && (m.textElDiv.className = "input");
                clearInterval(q);
                q = null;
                v && v.lazyShowTip()
            })
        }, H = function () {
            r && a.custEvent.add(r, "changeRank", A.changeRank);
            d.define(o, "setIsPublishAvailable");
            d.add(o, "setIsPublishAvailable", w.setIsPublishAvailable);
            d.define(o, "setSucTipDelay");
            d.add(o, "setSucTipDelay", A.setSucTipDelay)
        }, I = function () {
            document.body.scrollIntoView();
            return!1
        }, J = function (b) {
            var c = o.nodeList.textEl, d = c.value, e = b.length - 2;
            I();
            if (d.indexOf(b) != -1) {
                var f = d.indexOf(b);
                a.kit.extra.textareaUtils.setCursor(c, f + 1, e)
            } else {
                o.API.insertText(b);
                var g = a.kit.extra.textareaUtils.getCursorPos(c);
                a.kit.extra.textareaUtils.setCursor(c, g - (e + 1), e)
            }
        }, K = function (b) {
            var c = o.nodeList.textEl;
            c.value = "";
            I();
            o.API.insertText(b);
            a.kit.extra.textareaUtils.setCursor(c)
        }, L = function (b) {
            var c = b.callBackId;
            if (c == "atSuggest") {
                var d = "@", e = o.nodeList.textEl;
                I();
                o.API.insertText(d);
                a.kit.extra.textareaUtils.setCursor(e)
            }
        }, M = function () {
            a.common.channel.insertTopic.register("insert", J);
            a.common.channel.insertContent.register("insertContent", K);
            a.common.channel.versionTip.register("callBack", L);
            a.common.channel.publishContent.register("publish", z.publishBtn)
        }, N = function () {
            r && a.custEvent.remove(r, "changeRank", A.changeRank);
            p && p.destroy && p.destroy();
            x.destroy && x.destroy();
            i.destroy && i.destroy();
            r && r.destroy && r.destroy();
            u && u.destroy()
        }, O = {};
        g.destroy = N;
        var P = {limitNum: 140, flex: !0, count: "disable", storeWords: w.restore()};
        f.trans = a.common.trans.feed;
        p = a.common.dialog.validateCode();
        C();
        return g
    }
});
STK.pageletM.register("pl.content.publisherTop.index", function (a) {
    var b = {pid: "pl_content_publisherTop"}, c = a.E(b.pid), d = a.pl.content.publisherTop.source.init(c, b);
    return d
});
