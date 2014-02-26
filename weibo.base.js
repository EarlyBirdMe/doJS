STK.register("openInterface.alert", function (a) {
    return function (b, c) {
        var d = {}, e = a.ui.alert(b, c);
        d.alt = e.alt;
        d.dia = e.dia;
        return d
    }
});
STK.register("openInterface.confirm", function (a) {
    return function (b, c) {
        var d = {}, e = a.ui.confirm(b, c);
        d.cfm = e.cfm;
        d.dia = e.dia;
        return d
    }
});
STK.register("openInterface.relation", function (a) {
    var b = {}, c = function () {
        return a.common.relation.followPrototype
    }, d = function (a) {
        c().follow(a)
    }, e = function (a) {
        c().unFollow(a)
    }, f = function (a) {
        c().block(a)
    }, g = function (a) {
        c().unBlock(a)
    }, h = function (a) {
        c().removeFans(a)
    };
    b.follow = d;
    b.unFollow = e;
    b.block = f;
    b.unBlock = g;
    b.removeFans = h;
    return b
});
STK.register("openInterface.sendMessage", function (a) {
    return function (b) {
        var c = {}, d = a.common.dialog.sendMessage(b), e = function () {
            d.show()
        }, f = function () {
            d.hide()
        }, g = function () {
            d.destroy()
        };
        c.show = e;
        c.hide = f;
        c.destroy = g;
        return c
    }
});
STK.register("openInterface.setGroup", function (a) {
    return function () {
        var b = {}, c = a.common.dialog.setGroup(), d = function (a) {
            c.show(a)
        }, e = function () {
            c.hide()
        }, f = function () {
            c.destroy()
        };
        b.show = d;
        b.hide = e;
        b.destroy = f;
        return b
    }
});
STK.register("openInterface.interfaceLibrary", function (a) {
    var b = {}, c = "此API集合总共包含如下接口：alert、confirm、加关注相关(relation)、发私信(sendMessage)、设置分组(setGroup)";
    b.include = c;
    return b
});
STK.register("comp.content.scrollToTop", function (a) {
    return function (b, c) {
        function m() {
            if (h != "") {
                var c = a.core.dom.getSize(h[0]).height;
                if (g != null && g != c) {
                    var d = parseInt(a.getStyle(b, "top")), e = a.winSize().height;
                    d > c && a.setStyle(b, "top", c - 25);
                    e >= c ? a.setStyle(b, "visibility", "hidden") : j()
                }
                g = c
            }
        }

        function l() {
            document.body.scrollIntoView();
            return!1
        }

        function k() {
            if (d != null && (new Date).getTime() - d < 500) {
                clearTimeout(e);
                e = null
            }
            d = (new Date).getTime();
            e = setTimeout(j, 100)
        }

        function j() {
            var c = a.scrollPos(), d = c.top, e, f;
            if (d > 0) {
                a.setStyle(b, "visibility", "visible");
                if (i) {
                    e = a.winSize().height;
                    f = d + e - 190;
                    a.setStyle(b, "top", f)
                }
            } else a.setStyle(b, "visibility", "hidden")
        }

        if (b == null) {
            a.log("[comp.content.scrollToTop]: scrollToTop need a node[id=base_scrollToTop] in BODY.");
            return{destroy: a.funcEmpty}
        }
        var d, e, f, g, h, i = a.getStyle(b, "position") != "fixed";
        a.hotKey.add(document.documentElement, ["t"], l, {disableInInput: !0});
        h = a.sizzle(".W_main", document.body);
        f = setInterval(m, 200);
        a.addEvent(window, "scroll", k);
        a.addEvent(b, "click", l);
        k();
        var n = {destroy: function () {
            a.removeEvent(window, "scroll", k);
            a.removeEvent(b, "onclick", l);
            a.hotKey.remove(document.documentElement, ["t"], l, {type: "keyup"});
            if (f != null) {
                clearInterval(f);
                f = null
            }
        }};
        return n
    }
});
STK.register("kit.extra.language", function (a) {
    window.$LANG || (window.$LANG = {});
    return function (b) {
        var c = [].splice.call(arguments, 1, arguments.length), d = [b, $LANG].concat(c), e = a.core.util.language.apply(this, d);
        return e
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
STK.register("ui.mod.layer", function (a) {
    var b = function (a) {
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
    }, c = function (c, d) {
        d = d || "topleft";
        var e = null;
        if (c.style.display == "none") {
            c.style.visibility = "hidden";
            c.style.display = "";
            e = a.core.dom.position(c);
            c.style.display = "none";
            c.style.visibility = "visible"
        } else e = a.core.dom.position(c);
        if (d !== "topleft") {
            var f = b(c);
            if (d === "topright")e.l = e.l + f.w; else if (d === "bottomleft")e.t = e.t + f.h; else if (d === "bottomright") {
                e.l = e.l + f.w;
                e.t = e.t + f.h
            }
        }
        return e
    };
    return function (d) {
        var e = a.core.dom.builder(d), f = e.list.outer[0], g = e.list.inner[0], h = a.core.dom.uniqueID(f), i = {}, j = a.core.evt.custEvent.define(i, "show");
        a.core.evt.custEvent.define(j, "hide");
        var k = null;
        i.show = function () {
            f.style.display = "";
            a.core.evt.custEvent.fire(j, "show");
            return i
        };
        i.hide = function () {
            f.style.display = "none";
            a.custEvent.fire(j, "hide");
            return i
        };
        i.getPosition = function (a) {
            return c(f, a)
        };
        i.getSize = function (a) {
            if (a || !k)k = b.apply(i, [f]);
            return k
        };
        i.html = function (a) {
            a !== undefined && (g.innerHTML = a);
            return g.innerHTML
        };
        i.text = function (b) {
            b !== undefined && (g.innerHTML = a.core.str.encodeHTML(b));
            return a.core.str.decodeHTML(g.innerHTML)
        };
        i.appendChild = function (a) {
            g.appendChild(a);
            return i
        };
        i.getUniqueID = function () {
            return h
        };
        i.getOuter = function () {
            return f
        };
        i.getInner = function () {
            return g
        };
        i.getParentNode = function () {
            return f.parentNode
        };
        i.getDomList = function () {
            return e.list
        };
        i.getDomListByKey = function (a) {
            return e.list[a]
        };
        i.getDom = function (a, b) {
            return e.list[a] ? e.list[a][b || 0] : !1
        };
        i.getCascadeDom = function (b, c) {
            return e.list[b] ? a.core.dom.cascadeNode(e.list[b][c || 0]) : !1
        };
        return i
    }
});
STK.register("ui.mod.dialog", function (a) {
    return function (b, c) {
        if (!b)throw"ui.mod.dialog need template as first parameter";
        var d, e, f, g, h, i, j, k, l, m, n, o;
        l = !0;
        var p = function () {
            l !== !1 && e.hide()
        }, q = function () {
            d = a.parseParam({t: null, l: null, width: null, height: null}, c);
            e = a.ui.mod.layer(b, d);
            g = e.getOuter();
            h = e.getDom("title");
            k = e.getDom("title_content");
            i = e.getDom("inner");
            j = e.getDom("close");
            a.addEvent(j, "click", function (b) {
                a.preventDefault(b);
                n();
                return!1
            });
            a.custEvent.add(e, "show", function () {
                a.hotKey.add(document.documentElement, ["esc"], p, {type: "keyup", disableInInput: !0})
            });
            a.custEvent.add(e, "hide", function () {
                a.hotKey.remove(document.documentElement, ["esc"], p, {type: "keyup"});
                l = !0
            })
        };
        q();
        o = a.objSup(e, ["show", "hide"]);
        n = function (b) {
            if (typeof m == "function" && !b && m() === !1)return!1;
            o.hide();
            a.contains(document.body, e.getOuter()) && document.body.removeChild(e.getOuter());
            return f
        };
        f = e;
        f.show = function () {
            a.contains(document.body, e.getOuter()) || document.body.appendChild(e.getOuter());
            o.show();
            return f
        };
        f.hide = n;
        f.setPosition = function (a) {
            g.style.top = a.t + "px";
            g.style.left = a.l + "px";
            return f
        };
        f.setMiddle = function () {
            var b = a.core.util.winSize(), c = e.getSize(!0), d = a.core.util.scrollPos().top + (b.height - c.h) / 2;
            g.style.top = (d > 0 ? d : 0) + "px";
            g.style.left = (b.width - c.w) / 2 + "px";
            return f
        };
        f.setTitle = function (a) {
            k.innerHTML = a;
            return f
        };
        f.setContent = function (a) {
            typeof a == "string" ? i.innerHTML = a : i.appendChild(a);
            return f
        };
        f.clearContent = function () {
            while (i.children.length)a.removeNode(i.children[0]);
            return f
        };
        f.setAlign = function () {
        };
        f.setBeforeHideFn = function (a) {
            m = a
        };
        f.clearBeforeHideFn = function () {
            m = null
        };
        f.unsupportEsc = function () {
            l = !1
        };
        f.supportEsc = function () {
            l = !0
        };
        return f
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
STK.register("ui.dialog", function (a) {
    var b = '<div class="W_layer" node-type="outer" style="display:none;position:absolute;z-index:10001"><div class="bg"><table border="0" cellspacing="0" cellpadding="0"><tr><td><div class="content" node-type="layoutContent"><div class="title" node-type="title"><span node-type="title_content"></span></div><a href="javascript:void(0);" class="W_close" title="#L{关闭}" node-type="close"></a><div node-type="inner"></div></div></td></tr></table></div></div>', c = a.kit.extra.language, d = null, e, f = function () {
        var b = a.ui.mod.dialog(c(e.template));
        a.custEvent.add(b, "show", function () {
            a.ui.mask.showUnderNode(b.getOuter())
        });
        a.custEvent.add(b, "hide", function () {
            a.ui.mask.back();
            b.setMiddle()
        });
        a.kit.dom.drag(b.getDom("title"), {actObj: b, moveDom: b.getOuter()});
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
STK.register("ui.alert", function (a) {
    var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl><div class="btn"><a href="javascript:void(0)" class="W_btn_d" node-type="OK"></a></div></div>', c = {success: "icon_succM", error: "icon_errorM", warn: "icon_warnM", "delete": "icon_delM", question: "icon_questionM"}, d = a.kit.extra.language, e = null, f = function (a, b) {
        a.getDom("icon").className = b.icon;
        a.getDom("textLarge").innerHTML = b.textLarge;
        a.getDom("textSmall").innerHTML = b.textSmall;
        a.getDom("OK").innerHTML = "<span>" + b.OKText + "</span>"
    };
    return function (g, h) {
        var i, j, k, l, m;
        i = a.parseParam({title: d("#L{提示}"), icon: "warn", textLarge: g, textSmall: "", OK: a.funcEmpty, OKText: d("#L{确定}"), timeout: 0}, h);
        i.icon = c[i.icon];
        j = {};
        e || (e = a.kit.extra.reuse(function () {
            var c = a.ui.mod.layer(d(b));
            return c
        }));
        k = e.getOne();
        l = a.ui.dialog();
        l.setContent(k.getOuter());
        l.setTitle(i.title);
        f(k, i);
        var n = function (b) {
            a.preventDefault(b);
            l.hide()
        };
        a.addEvent(k.getDom("OK"), "click", n);
        a.custEvent.add(l, "hide", function () {
            a.custEvent.remove(l, "hide", arguments.callee);
            a.removeEvent(k.getDom("OK"), "click", n);
            e.setUnused(k);
            clearTimeout(m);
            i.OK()
        });
        i.timeout && (m = setTimeout(l.hide, i.timeout));
        l.show().setMiddle();
        k.getDom("OK").focus();
        j.alt = k;
        j.dia = l;
        return j
    }
});
STK.register("ui.confirm", function (a) {
    var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt2" node-type="textComplex"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl><div class="btn"><a href="javascript:void(0)" class="W_btn_d" node-type="OK"></a><a href="javascript:void(0)" class="W_btn_b" node-type="cancel"></a></div></div>', c = {success: "icon_succM", error: "icon_errorM", warn: "icon_warnM", "delete": "icon_delM", question: "icon_questionM"}, d = a.kit.extra.language, e = null;
    return function (f, g) {
        var h, i, j, k, l, m;
        h = a.parseParam({title: d("#L{提示}"), icon: "question", textLarge: f, textComplex: "", textSmall: "", OK: a.funcEmpty, OKText: d("#L{确定}"), cancel: a.funcEmpty, cancelText: d("#L{取消}"), hideCallback: a.funcEmpty}, g);
        h.icon = c[h.icon];
        i = {};
        e || (e = a.kit.extra.reuse(function () {
            var c = a.ui.mod.layer(b);
            return c
        }));
        j = e.getOne();
        k = a.ui.dialog();
        k.setContent(j.getOuter());
        j.getDom("icon").className = h.icon;
        j.getDom("textLarge").innerHTML = h.textLarge;
        j.getDom("textComplex").innerHTML = h.textComplex;
        j.getDom("textSmall").innerHTML = h.textSmall;
        j.getDom("OK").innerHTML = "<span>" + h.OKText + "</span>";
        j.getDom("cancel").innerHTML = "<span>" + h.cancelText + "</span>";
        k.setTitle(h.title);
        var n = function () {
            l = !0;
            m = a.htmlToJson(j.getDom("textComplex"));
            k.hide()
        };
        a.addEvent(j.getDom("OK"), "click", n);
        a.addEvent(j.getDom("cancel"), "click", k.hide);
        a.custEvent.add(k, "hide", function () {
            a.custEvent.remove(k, "hide", arguments.callee);
            a.removeEvent(j.getDom("OK"), "click", n);
            a.removeEvent(j.getDom("cancel"), "click", k.hide);
            e.setUnused(j);
            l ? h.OK(m) : h.cancel(m);
            h.hideCallback()
        });
        k.show().setMiddle();
        j.getDom("OK").focus();
        i.cfm = j;
        i.dia = k;
        return i
    }
});
STK.register("ui.bubbleLayer", function (a) {
    var b = '<div class="W_layer" node-type="outer" style="display:none;"><div class="bg"><div class="effect"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div class="content clearfix" node-type="inner"></div></td></tr></tbody></table><div node-type="arrow" class="#{arrow_type}"></div></div></div></div>';
    return function (c, d, e) {
        var f, g, h, i, j, k, l = function (a) {
            a = a ? "arrow arrow_" + a : "";
            return a
        }, m = function (a) {
            g.style.top = a.t + "px";
            g.style.left = a.l + "px";
            return i
        }, n = function () {
            var b = a.core.util.winSize(), c = f.getSize(!0);
            g.style.top = a.core.util.scrollPos().top + (b.height - c.h) / 2 + "px";
            g.style.left = (b.width - c.w) / 2 + "px";
            return i
        }, o = function (a) {
            typeof a == "string" ? h.innerHTML = a : h.appendChild(a);
            return i
        }, p = function () {
            return h.innerHTML
        }, q = function (a, b) {
            var c = "";
            a === "t" || a === "b" ? b === "right" ? c = "left:auto;right:30px;" : b === "center" && (c = "left:auto;right:" + (g.offsetWidth / 2 - 8) + "px;") : (a === "l" || a === "r") && b === "bottom" && (c = "top:auto;bottom:20px;");
            j.className = l(a);
            j.style.cssText = c;
            return i
        }, r = function (a) {
            a = l(a);
            j.className = a;
            return i
        }, s = function (b, c, d) {
            d = a.parseParam({offset: {left: 0, top: 0}, arrowOffset: 0, align: "left", fail: a.funcEmpty, dire: "t", isForwardMerge: !1}, d);
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
                var h = a.core.dom.getSize, k = a.position(c), l = a.position(b), m = h(b), n = 6, o = 14, p, q, s, t = d.dire, u = d.offset, v = d.arrowOffset, w = h(g), x = h(c), y = 2;
                if (d.align === "left") {
                    if (w.width < l.l - k.l + Math.ceil(m.width / 2)) {
                        d.fail();
                        return
                    }
                } else if (k.l + x.width - l.l - Math.ceil(m.width / 2) > w.width) {
                    d.fail();
                    return
                }
                d.align === "left" ? p = k.l - y : p = k.l + x.width - w.width + y;
                t == "t" ? q = l.t + m.height + n : q = l.t - n - w.height;
                s = l.l + Math.ceil((m.width - o) / 2) - p;
                q -= f.t;
                p -= f.l;
                q += u.top;
                p += u.left;
                s += v;
                g.style.left = p + "px";
                g.style.top = q + "px";
                if (d.isForwardMerge) {
                    var z = a.core.dom.position(b);
                    z.t > q ? r("b") : r("t")
                }
                j && (j.style.left = s + "px");
                return i
            }
        }, t = function () {
            d = l(d);
            k = (e || b).replace(/\#\{arrow_type\}/g, d);
            f = a.ui.mod.layer(k);
            g = f.getOuter();
            h = f.getDom("inner");
            j = f.getDom("arrow");
            i = f;
            c && o(c);
            document.body.appendChild(g)
        };
        t();
        i.setPostion = m;
        i.setMiddle = n;
        i.setContent = o;
        i.setArrow = q;
        i.setArrowPos = r;
        i.setAlignPos = s;
        i.getContent = p;
        return i
    }
});
STK.register("ui.popCard", function (a) {
    var b = 5, c = 28, d = 38, e = 200, f = 200, g = function (b, c, d) {
        var e, f, g, h, i, j, k = a.core.util.scrollPos(), l = a.core.dom.position(b), m = a.core.util.winSize();
        i = b.offsetWidth;
        j = b.offsetHeight;
        g = l.t - k.top;
        e = l.l - k.left;
        f = m.width - e - i;
        h = m.height - g - j;
        return{t: g, l: e, r: f, b: h, w: i, h: j, x: l.l, y: l.t}
    }, h = function (a) {
        var c = a.nodeW, d = a.nodeH, e = a.dis, f = a.cardWidth, g = a.cardHeight, h = a.arrow, i = a.node, j = a.offsetH, k = a.offsetW, l = a.arPos, m = {};
        switch (h) {
            case"t":
                m.l = e.x - k + c / 2;
                m.t = e.y - b - g;
                break;
            case"r":
                m.l = e.x + c + b;
                m.t = e.y - j + d / 2;
                break;
            case"b":
                m.l = e.x - k + c / 2;
                m.t = e.y + d + b;
                break;
            case"l":
            default:
                m.l = e.x - f - b;
                m.t = e.y - j + d / 2
        }
        return m
    }, i = function (b) {
        var e = b.node, i = b.cardWidth, j = b.cardHeight, k = b.arrowPos || "auto", l = (b.order || "b,r,t,l").split(","), m = l[0], n = Math.max(j, f), o = {l: i, b: n, t: n, r: i}, p = {l: "r", b: "t", t: "b", r: "l"}, q = g(e), r = q.w, s = q.h, t = c, u = d, v = e.getClientRects ? e.getClientRects() : null, w = parseInt(a.getStyle(e, "lineHeight"), 10), x = b.event;
        if (v && v.length > 1) {
            var y;
            if (x.pageX - q.x > r / 2) {
                y = v[0];
                q.x = y.left;
                q.l += y.left - v[1].left;
                s = y.bottom - y.top;
                r = y.right - y.left
            } else {
                y = v[1];
                q.y += y.top - v[0].top;
                q.r += v[0].right - y.right;
                s = y.bottom - y.top;
                r = y.right - y.left
            }
        }
        for (var z = 0, A = l.length; z < A; z++) {
            var B = l[z];
            if (q[B] > o[B]) {
                m = B;
                break
            }
        }
        k === "auto" && ((m === "t" || m === "b") && r / 2 + q.r < i - d ? k = "right" : s / 2 + q.b < j - c && (k = "bottom"));
        k === "right" ? u = i - d : k === "bottom" ? t = j - c : k === "center" && (u = i / 2);
        var C = h({nodeW: r, nodeH: s, dis: q, cardWidth: i, cardHeight: j, arrow: m, node: e, offsetH: t, offsetW: u});
        return{dire: p[m], pos: C, arPos: k}
    }, j = function (a, b) {
        return function () {
            return a.apply(b, arguments)
        }
    }, k = function (b) {
        b = b || {};
        this.bubLayer = a.ui.bubbleLayer(undefined, undefined, b.template);
        this.cardPanel = this.bubLayer.getOuter();
        this.initBind()
    };
    k.prototype = {initBind: function () {
        var b = j(this.stopHide, this), c = j(this.hideCard, this);
        a.addEvent(this.cardPanel, "mouseover", b);
        a.addEvent(this.cardPanel, "mouseout", c);
        this.dEvent = a.core.evt.delegatedEvent(this.cardPanel)
    }, stopShow: function () {
        this.showTimer && clearTimeout(this.showTimer)
    }, stopHide: function () {
        this.hideTimer && clearTimeout(this.hideTimer)
    }, showCard: function (b) {
        var c = b.zIndex || 9999;
        this.cardPanel.style.zIndex = c;
        this.bubLayer.setContent(b.content).show();
        this.node = b.node;
        this.arrowPos = b.arrowPos;
        this.order = b.order;
        this.event = b.event;
        this.direPos = i({node: this.node, cardWidth: this.cardPanel.offsetWidth, cardHeight: this.cardPanel.offsetHeight, arrowPos: this.arrowPos, order: this.order, event: b.event});
        if (b.alignNode) {
            this.alignNode = a.core.dom.neighbor(this.node).parent('[node-type="' + b.alignNode + '"]').finish();
            this.bubLayer.setAlignPos(this.node, this.alignNode, {align: "right", dire: this.direPos.dire, isForwardMerge: !0})
        } else this.bubLayer.setPostion(this.direPos.pos).setArrow(this.direPos.dire, this.direPos.arPos)
    }, setContent: function (a) {
        var b = this.cardPanel.offsetHeight;
        this.bubLayer.setContent(a);
        if (this.direPos.dire === "b") {
            var c = this.cardPanel.offsetHeight - b;
            this.bubLayer.setPostion({l: this.direPos.pos.l, t: this.direPos.pos.t - c})
        }
    }, getContent: function () {
        var a = this.bubLayer.getContent();
        return a
    }, hideCard: function () {
        var a = this;
        this.hideTimer = setTimeout(function () {
            a.bubLayer.hide()
        }, e)
    }, reposition: function () {
        this.direPos = i({node: this.node, cardWidth: this.cardPanel.offsetWidth, cardHeight: this.cardPanel.offsetHeight, arrowPos: this.arrowPos, order: this.order, event: this.event});
        this.bubLayer.setAlignPos(this.node, this.alignNode, {align: "right", dire: this.direPos.dire, isForwardMerge: !0})
    }};
    var l = function () {
    };
    return function (a) {
        return new k(a)
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
STK.register("common.trans.relation", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("recommendfollow", {url: "/aj/f/recomafterfollow?_wv=5", method: "get"});
    c("closerecommend", {url: "/aj/f/closerecommend?_wv=5", method: "get"});
    c("newuserguide", {url: "/aj/user/interest/newuserguide?_wv=5", method: "get"});
    c("mayinterested", {url: "/aj/user/interest/list?_wv=5", method: "get"});
    c("uninterested", {url: "/aj/user/interest/uninterested?_wv=5", method: "post"});
    c("userCard", {url: "/aj/user/cardv5?_wv=5", method: "get"});
    c("userCard2", {url: "http://weibo.com/aj/user/newcard", method: "get", requestMode: "jsonp", varkey: "callback"});
    c("userCard2_abroad", {url: "http://www.weibo.com/aj/user/newcard", method: "get", requestMode: "jsonp", varkey: "callback"});
    c("follow", {url: "/aj/f/followed?_wv=5", method: "post"});
    c("unFollow", {url: "/aj/f/unfollow?_wv=5", method: "post"});
    c("follow_register", {url: "/nguide/aj/relation/followed?_wv=5", method: "post"});
    c("unfollow_register", {url: "/nguide/aj/relation/unfollow?_wv=5", method: "post"});
    c("block", {url: "/aj/f/addblack?_wv=5", method: "post"});
    c("unBlock", {url: "/aj/f/delblack?_wv=5", method: "post"});
    c("removeFans", {url: "/aj/f/remove?_wv=5", method: "post"});
    c("requestFollow", {url: "/ajax/relation/requestfollow?_wv=5", method: "post"});
    c("questions", {url: "/aj/invite/attlimit?_wv=5", method: "get"});
    c("answer", {url: "/aj/invite/att?_wv=5", method: "post"});
    c("setRemark", {url: "/aj/f/remarkname?_wv=5", method: "post"});
    c("recommendusers", {url: "/aj/f/recommendusers?_wv=5", method: "get"});
    c("recommendAttUsers", {url: "/aj/f/worthfollowusers?_wv=5", method: "get"});
    c("recommendPopularUsers", {url: "/aj/user/interest/recommendpopularusers?_wv=5", method: "get"});
    c("mayinterestedweiqun", {url: "/aj/weiqun/getinterestedlist?_wv=5", method: "get"});
    c("moreData", {url: "/aj/f/listuserdetail?_wv=5", method: "get"});
    c("getInvite", {url: "/aj/invite/unread?_wv=5", method: "get"});
    c("quiet_addUser", {url: "/aj/f/addwhisper?_wv=5", method: "post"});
    c("quiet_removeUser", {url: "/aj/f/delwhisper?_wv=5", method: "post"});
    c("quiet_know", {url: "/aj/tipsbar/closetipsbar?_wv=5", method: "post"});
    c("groupUserList", {url: "/aj/f/group/getgroupmembers?_wv=5", method: "get"});
    c("smart_sort", {url: "/aj/mblog/mblogcard?_wv=5", method: "post"});
    c("groupSubmit", {url: "/aj/f/group/list?_wv=5", method: "get"});
    c("wqList", {url: "/aj/proxy?api=http://recom.i.t.sina.com.cn/1/weiqun/weiqun_may_interest.php", method: "get"});
    c("uninterestedWq", {url: "/aj/proxy?api=http://recom.i.t.sina.com.cn/1/weiqun/weiqun_uninterest.php", method: "get"});
    c("inviteNeglect", {url: "/aj/invite/handleinvite?_wv=5", method: "post"});
    c("checkNeglect", {url: "/aj/invite/shieldedlist?_wv=5", method: "post"});
    c("inviteLift", {url: "/aj/invite/lift?_wv=5", method: "post"});
    c("inviteAccept", {url: "/aj/invite/handleinvite?_wv=5", method: "post"});
    c("searchByTel", {url: "/aj/relation/getuserbymobile?_wv=5", method: "post"});
    c("inviteCloseTips", {url: "/aj/invite/closetips?_wv=5", method: "post"});
    c("checkrelation", {url: "/aj/f/checkrelation?_wv=5", method: "post"});
    c("addCloseFriend", {url: "/aj/f/createclosefriend?_wv=5", method: "post"});
    c("removeClsFrd", {url: "/aj/f/removeclosefriend?_wv=5", method: "post"});
    c("cfInviteUnread", {url: "/aj/invite/unread?_wv=5", method: "get"});
    c("recommendCf", {url: "/aj/user/closefriend/recommend?_wv=5", method: "get"});
    c("clearInvalidUsers", {url: "/aj/f/clearinvalidfriends?_wv=5", method: "post"});
    c("unIstCf", {url: "/aj/user/closefriend/deny?_wv=5", method: "post"});
    c("checkcloserelation", {url: "/aj/f/checkcloserelation?_wv=5", method: "post"});
    c("closeunfollow", {url: "/aj/profile/closeunfollow?_wv=5", method: "post"});
    c("fanslikemore", {url: "/aj/relation/fanslikemore?_wv=5", method: "get"});
    c("getProfileInfo", {url: "/aj/relation/getprofileinfo?_wv=5", method: "get"});
    c("interestlist", {url: "/aj/user/interest/profileinfo?_wv=5", method: "get"});
    c("recommendGroupMember", {url: "/aj/user/group/recommend?_wv=5", method: "get"});
    c("recommendWholeGroup", {url: "/aj/relation/rename?_wv=5", method: "post"});
    c("recommendUserAdd", {url: "/aj/f/group/addrecommenduser?_wv=5", method: "post"});
    c("recommendUserRemove", {url: "/aj/f/group/remove?_wv=5", method: "post"});
    return b
});
STK.register("ui.timerNotice", function (a) {
    var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl></div>', c = {success: "icon_succM", error: "icon_errorM", warn: "icon_warnM", "delete": "icon_delM", question: "icon_questionM"}, d = a.kit.extra.language, e = [], f = function () {
        var c = a.ui.mod.layer(d(b));
        e.push({alt: c, used: !0});
        return c
    }, g = function (a) {
        for (var b = 0, c = e.length; b < c; b += 1)if (a === e[b].dia) {
            e[b].used = !0;
            return
        }
    }, h = function (a) {
        for (var b = 0, c = e.length; b < c; b += 1)if (a === e[b].dia) {
            e[b].used = !1;
            return
        }
    }, i = function (b) {
        var c, d, g, i;
        d = {};
        for (var j = 0, k = e.length; j < k; j += 1)if (!e[j].used) {
            e[j].used = !0;
            g = e[j].dia;
            break
        }
        g = g || f();
        i = a.ui.dialog();
        i.appendChild(g.getOuter());
        g.getDom("icon").className = b.icon;
        g.getDom("textLarge").innerHTML = b.textLarge;
        g.getDom("textSmall").innerHTML = b.textSmall;
        i.setTitle(b.title);
        a.custEvent.add(i, "hide", function () {
            b.OK();
            a.custEvent.remove(i, "hide", arguments.callee);
            a.custEvent.remove(i, "show", l);
            h(g)
        });
        var l = function () {
            setTimeout(i.hide, b.timer)
        };
        a.custEvent.add(i, "show", l);
        d.alt = g;
        d.dia = i;
        return d
    };
    return function (b, e) {
        e = e || {};
        var f, g, h;
        f = a.parseParam({title: d("#L{提示}"), icon: "warn", textLarge: b, textSmall: "", OK: function () {
        }, timer: 3e3}, e);
        f.icon = c[f.icon];
        g = i(f);
        g.dia.show().setMiddle();
        return g
    }
});
STK.register("kit.dom.parseDOM", function (a) {
    return function (a) {
        for (var b in a)a[b] && a[b].length == 1 && (a[b] = a[b][0]);
        return a
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
    return b
});
STK.register("ui.litePrompt", function (a) {
    var b = a.kit.extra.language, c = a.core.util.easyTemplate;
    return function (b, d) {
        var e, f, g, h, i, d = a.parseParam({hideCallback: a.core.func.empty, type: "succM", msg: "", timeout: ""}, d), j = d.template || '<#et temp data><div class="W_layer" node-type="outer"><div class="bg"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div class="content layer_mini_info_big" node-type="inner"><p class="clearfix"><span class="icon_${data.type}"></span>${data.msg}&nbsp; &nbsp; &nbsp;</p></div></td></tr></tbody></table></div></div></#et>', k = c(j, {type: d.type, msg: b}).toString();
        f = {};
        g = a.ui.mod.layer(k);
        i = g.getOuter();
        a.custEvent.add(g, "hide", function () {
            a.ui.mask.back();
            d.hideCallback && d.hideCallback();
            a.custEvent.remove(g, "hide", arguments.callee);
            clearTimeout(h)
        });
        a.custEvent.add(g, "show", function () {
            document.body.appendChild(i);
            a.ui.mask.showUnderNode(i);
            a.ui.mask.getNode().style.zIndex = 10002
        });
        g.show();
        d.timeout && (h = setTimeout(g.hide, d.timeout));
        var l = a.core.util.winSize(), m = g.getSize(!0);
        i.style.top = a.core.util.scrollPos().top + (l.height - m.h) / 2 + "px";
        i.style.left = (l.width - m.w) / 2 + "px";
        i.style.zIndex = 10002;
        f.layer = g;
        return f
    }
});
STK.register("kit.extra.parseURL", function (a) {
    return function () {
        return STK.historyM && STK.historyM.parseURL ? STK.historyM.parseURL() : a.core.str.parseURL(location.href)
    }
});
STK.register("common.group.groupListPanel", function (a) {
    var b = $CONFIG.miyou == "1";
    return function (c) {
        var d = {}, e = a.kit.extra.language, f = a.C("div"), g = {}, h = {}, i, j = a.delegatedEvent(f), k = $CONFIG.imgPath + "style/images/common/transparent.gif", l = [
            {mode: "private", className: "W_ico16 i_conn_private", title: e("#L{仅自己可见}")},
            {mode: "friend", className: "W_ico16 i_conn_list", title: e("#L{组内成员可见}")},
            {mode: "public", className: "W_ico16 i_conn_public", title: e("#L{所有人可见}")}
        ], m = function (a, b, c) {
            if (!!a) {
                c && (c = c.toUpperCase());
                var d = a[b];
                while (d) {
                    if (d.nodeType == 1 && (c ? d.nodeName == c : !0))break;
                    d = d[b]
                }
                return d
            }
        }, n = c.multi ? 'style="display:none;"' : '<#if (item.belong==1)><#else>style="display:none;"</#if>', o = '<h4 class="lsfl_visibility" style="display:none;"><img class="#{className}" alt="" src="' + k + '">#{title}</h4><div class="lsfl_listsBox"><ul node-type="#{mode}" class="lsfl_listsBox_ul"></ul></div>', p = a.core.util.easyTemplate('<#et listItem gList><#list gList as item><li <#if (item.recom_join)> class="S_bg1"</#if>><label for="${item.gid}"><input action-type="select" id="${item.gid}" type="checkbox"<#if (item.recom_join)> recom_join="1" </#if> <#if (item.belong==1)>checked="checked"</#if> class="W_checkbox" value="${item.gid}"><span >${item.gname}</span></label><#if (item.recom_join)><span class="S_bg1 S_txt2">(' + e("#L{建议加为这个分组}") + ")</span>" + "</#if>" + "</li>" + "</#list>" + "</#et>"), q = "", r = function (b) {
            var c = document.createTextNode(b), d = a.C("div");
            d.appendChild(c);
            var e = d.innerHTML;
            d = c = null;
            return e
        }, s = function () {
            var b = "";
            for (var d = 0; d < l.length; d++)b += a.templet(o, l[d]);
            f.innerHTML = b;
            i = a.kit.dom.parseDOM(a.core.dom.builder(f).list);
            c.data && C(c.data)
        }, t = function () {
            for (var d = 0; d < l.length; d++) {
                var e = l[d].mode;
                !c.multi && e === "private" && (i[e].innerHTML = q);
                if (g[e]) {
                    for (var h = g[e].length; h--;)g[e][h].desc && (g[e][h].desc = g[e][h].desc);
                    var j = p(g[e]).toString();
                    i[e].innerHTML += j
                } else(!b || e !== "private") && z(i[e], !0)
            }
            var k = a.sizzle('input[node-type="cfSelect"]', f)[0] || {}, m = (c.cftype || 0) > 0;
            setTimeout(function () {
                k.checked = m
            }, 0)
        };
        lengthLimit = function (b) {
            var c = a.fixEvent(b).target;
            a.bLength(c.value) > 16 && (c.value = a.leftB(c.value, 16))
        }, onEnter = function (b) {
            if (b.keyCode === 13) {
                var c = a.fixEvent(b).target;
                a.fireEvent(c, "blur")
            }
        };
        var u = function (b) {
            var c = m(b, "parentNode", "li");
            if (!!c) {
                var d = a.sizzle('input[action-type="select"]', c)[0];
                h[d.id] || (h[d.id] = {});
                return h[d.id]
            }
        }, v = {addCloseFriend: function (a) {
            var b = a.el;
            !b.checked
        }, miyouHelp: function (b) {
            a.preventDefault();
            var c = a.kit.extra.parseURL();
            c = "http://" + c.host + "/mymeyou?ismiyou=1";
            var d = a.C("form");
            d.setAttribute("action", c);
            d.setAttribute("method", "POST");
            var e = a.C("input");
            e.setAttribute("name", "step");
            e.setAttribute("value", "1");
            var f = a.C("input");
            f.setAttribute("name", "ismiyou");
            f.setAttribute("value", "1");
            var g = a.C("input");
            g.setAttribute("name", "type");
            g.setAttribute("value", "1");
            var h = a.C("input");
            h.setAttribute("name", "guidetype");
            h.setAttribute("value", "miyou");
            var i = a.C("input");
            i.setAttribute("name", "method");
            i.setAttribute("value", "POST");
            d.appendChild(e);
            d.appendChild(f);
            d.appendChild(g);
            d.appendChild(h);
            d.appendChild(i);
            document.body.appendChild(d);
            d.submit()
        }}, w = function () {
            j.add("select", "click", v.select);
            j.add("miyouHelp", "click", v.miyouHelp)
        }, x = function () {
        }, y = function () {
            s();
            w();
            x()
        }, z = function (b, c) {
            var d = a.domPrev(b.parentNode);
            if (d.style.display === (c ? "" : "none")) {
                d.style.display = c ? "none" : "";
                b.parentNode.style.display = c ? "none" : ""
            }
        }, A = function () {
            return f
        }, B = function (b) {
            var c = b.mode || "private";
            g[c] = g[c] || [];
            g[c].push(b);
            var d = p([b]).toString();
            a.insertHTML(i[c], d, "beforeend");
            z(i[c], !0)
        }, C = function (b) {
            g = {};
            if (a.isArray(b))for (var c = 0, d = b.length; c < d; c++) {
                var e = b[c].mode || "private";
                g[e] = g[e] || [];
                g[e].push(b[c])
            }
            t()
        }, D = function () {
            var b = [], d = {suda: [], diss: {allGroup: 0, autoSelect: 0, gid: [], uid: $CONFIG.uid}}, e = a.sizzle('input[action-type="select"]', f), g = a.sizzle('input[node-type="cfSelect"]', f)[0] || {}, h, i;
            d.diss.allGroup = e.length;
            for (var j = e.length; j--;) {
                var k = {};
                h = i = !1;
                if (e[j].checked) {
                    h = !0;
                    var l = u(e[j]);
                    if (l) {
                        k.gid = e[j].value;
                        b.push(k)
                    }
                }
                if (e[j].getAttribute("recom_join")) {
                    i = !0;
                    d.diss.autoSelect++;
                    d.diss.gid.push(e[j].value)
                }
                (i || h) && d.suda.push(e[j].value + (i ? "_a" : "_b") + (h ? "_1" : "_0"))
            }
            var m = (c.cftype || 0) > 0;
            g.checked !== m && (b.isCfInvite = g.checked ? "add" : "delete");
            b.suda_diss = d;
            return b
        }, E = function () {
            t()
        }, F = function () {
            g = {};
            t()
        }, G = function () {
            j.destroy();
            h = null;
            g = null;
            i = null;
            f = null
        }, H = function () {
            var b = a.sizzle('input[action-type="select"]', f);
            return b.length
        };
        y();
        d.getOuter = A;
        d.length = H;
        d.add = B;
        d.setData = C;
        d.getData = D;
        d.reset = E;
        d.clear = F;
        d.destroy = G;
        return d
    }
});
STK.register("ui.vipConfirm", function (a) {
    var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt2" node-type="textComplex"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl><div class="btn"><a href="javascript:void(0)" class="W_btn_a" node-type="toBeVip"></a><a href="javascript:void(0)" class="W_btn_b" node-type="OK"></a></div></div>', c = {success: "icon_succM", error: "icon_errorM", warn: "icon_warnM", "delete": "icon_delM", question: "icon_questionM"}, d = a.kit.extra.language, e = null;
    return function (f, g) {
        var h, i, j, k, l, m, n;
        h = a.parseParam({title: d("#L{提示}"), icon: "question", textLarge: f, textComplex: "", textSmall: "", OK: a.funcEmpty, OKText: d("#L{确定}"), cancel: a.funcEmpty, cancelText: d("#L{取消}"), toBeVip: a.funcEmpty, toBeVipText: ""}, g);
        h.icon = c[h.icon];
        i = {};
        e || (e = a.kit.extra.reuse(function () {
            var c = a.ui.mod.layer(b);
            return c
        }));
        j = e.getOne();
        k = a.ui.dialog();
        k.setContent(j.getOuter());
        j.getDom("icon").className = h.icon;
        j.getDom("textLarge").innerHTML = h.textLarge;
        j.getDom("textComplex").innerHTML = h.textComplex;
        j.getDom("textSmall").innerHTML = h.textSmall;
        j.getDom("OK").innerHTML = "<span>" + h.OKText + "</span>";
        j.getDom("toBeVip").innerHTML = '<span><em class="W_ico16 ico_member"></em>' + h.toBeVipText + "</span>";
        k.setTitle(h.title);
        var o = function () {
            l = !0;
            m = a.htmlToJson(j.getDom("textComplex"));
            k.hide()
        }, p = function () {
            n = !0;
            k.hide()
        };
        a.addEvent(j.getDom("OK"), "click", o);
        a.addEvent(j.getDom("toBeVip"), "click", p);
        a.custEvent.add(k, "hide", function () {
            a.custEvent.remove(k, "hide", arguments.callee);
            a.removeEvent(j.getDom("OK"), "click", o);
            a.removeEvent(j.getDom("toBeVip"), "click", p);
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
STK.register("common.dialog.authentication", function (a) {
    return function (b) {
        var c = a.kit.extra.language, d = a.core.util.browser;
        b = a.parseParam({src: "http://weibo.com/a/verify/realname?stage=home_verification", icon: "warn", isHold: !0, width: "380px", height: "240px", title: c("#L{帐号验证}")}, b || {});
        var e = {}, f, g, h = !1, i = "tblog_checkfailed_reform", j = {init: function () {
            f = a.ui.dialog(b);
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
        var i = a.ui.mod.layer(d(b));
        j = a.ui.dialog();
        j.setContent(i.getOuter());
        i.getDom("icon").className = g.icon;
        i.getDom("textLarge").innerHTML = g.textLarge;
        i.getDom("textComplex").innerHTML = g.textComplex;
        i.getDom("textSmall").innerHTML = g.textSmall;
        i.getDom("OK").innerHTML = "<span>" + g.OKText + "</span>";
        i.getDom("cancel").innerHTML = "<span>" + g.cancelText + "</span>";
        j.setTitle(g.title);
        var m = function () {
            k = !0;
            l = a.htmlToJson(i.getDom("textComplex"));
            j.hide()
        };
        a.addEvent(i.getDom("OK"), "click", m);
        a.addEvent(i.getDom("cancel"), "click", j.hide);
        a.custEvent.add(j, "hide", function () {
            a.custEvent.remove(j, "hide", arguments.callee);
            a.removeEvent(i.getDom("OK"), "click", m);
            a.removeEvent(i.getDom("cancel"), "click", j.hide);
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
        parseInt(b.errortype, 10) == 2 ? f.cfm.getDom("member").style.display = "none" : f.cfm.getDom("cancel").style.display = "none"
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
            a.ui.vipConfirm(k.warnMsg, {icon: "warn", title: k.title, toBeVipText: k.vip, textComplex: k.textComplex, OKText: k.OKText, toBeVip: function () {
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
STK.register("common.layer.vipError", function (a) {
    var b = '<#et temp data><div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="${data.icon}" node-type="icon"></span></dt><dd node-type="inner">${data.info}</dd></dl><div class="btn"><a href="###" <#if (data.lbtnStyle == 1)>class="W_btn_a"<#else if (data.lbtn == 0)>class="W_btn_b"</#if> node-type="lbtn"><span><#if (data.lbtnIcon == 1)><i class="W_ico16 ico_member"></i></#if>${data.lbtnText}</span></a><a href="###" <#if (data.rbtnStyle == 1)>class="W_btn_a"<#else if (data.rbtn == 0)>class="W_btn_b"</#if> node-type="rbtn"><span><#if (data.rbtnIcon == 1)><i class="W_ico16 ico_member"></i></#if>${data.rbtnText}</span></a></div></div></#et>', c = {success: "icon_succM", error: "icon_errorM", warn: "icon_warnM", "delete": "icon_delM", question: "icon_questionM"}, d = a.kit.extra.language, e = function (e) {
        var f, g, h;
        f = a.parseParam({title: d("#L{提示}"), icon: "warn", info: "", lbtnFunc: a.funcEmpty, lbtnStyle: 0, lbtnIcon: 0, lbtnText: d("#L{立即开通会员}"), rbtnFunc: a.funcEmpty, rbtnStyle: 0, rbtnIcon: 0, rbtnText: d("#L{立即开通会员}")}, e);
        f.icon = c[f.icon];
        var g = a.ui.mod.layer(a.core.util.easyTemplate(b, f).toString());
        h = a.ui.dialog();
        h.setContent(g.getOuter());
        h.setTitle(f.title);
        var i = function () {
            f.lbtnFunc();
            h.hide()
        }, j = function () {
            f.rbtnFunc();
            h.hide()
        };
        a.addEvent(g.getDom("lbtn"), "click", i);
        a.addEvent(g.getDom("rbtn"), "click", j);
        a.custEvent.add(h, "hide", function () {
            a.custEvent.remove(h, "hide", arguments.callee);
            a.removeEvent(g.getDom("lbtn"), "click", i);
            a.removeEvent(g.getDom("rbtn"), "click", j)
        });
        h.show().setMiddle();
        return h
    };
    return function (a, b) {
        if (a == "100096" || a == "100098") {
            b.lbtnStyle = 0;
            b.lbtnIcon = 0;
            b.lbtnText = d("#L{管理分组}");
            b.rbtnStyle = 1;
            b.rbtnIcon = 1;
            b.rbtnText = d("#L{开通会员}");
            b.rbtnFunc = function () {
                location.href = "http://vip.weibo.com/paycenter?form=group"
            }
        } else if (a == "100097") {
            b.lbtnStyle = 0;
            b.lbtnIcon = 0;
            b.lbtnText = d("#L{管理分组}");
            b.rbtnStyle = 0;
            b.rbtnIcon = 0;
            b.rbtnText = d("#L{知道了}")
        }
        return e(b)
    }
});
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
STK.register("common.dialog.setGroup", function (a) {
    var b = 30, c = !1, d = "http://rs.sinajs.cn/sgmark.gif", e = a.kit.extra.language, f = e("<span>#L{等待对方接受邀请}</span>"), g = {0: e('<span><em class="addicon">+</em>#L{加密友}</span>'), 1: e("<span>#L{已为密友}</span>"), 2: e("<span>#L{等待对方接受邀请}</span>")}, h = {enable: "W_btn_b", disable: "W_btn_c_disable"}, i = {f: e("#L{邀请她成为你的密友，进行更亲密互动}："), m: e("#L{邀请他成为你的密友，进行更亲密互动}：")};
    return function () {
        var f = {}, j = a.ui.dialog({isHold: !0}), k = a.ui.alert, l = {groupBox: '<div class="layer_setup_followlists follow_success" node-type="group_panel" ><input type="hidden" node-type="uid" name="touid"><div class="lsfl_Tit form_table_single" node-type="remarkPanel">#L{备注名称：}<input node-type="remarkInput" type="text" value="#L{设置备注}" class="W_input" name="remark"><div class="M_notice_del" style="display:none;"><span class="icon_del"></span>#L{备注姓名是非法的}</div></div><div class="lsfl_Tit"><div class="W_fb" node-type="miyouText">#L{邀请他成为你的密友，进行更亲密互动}：</div><div node-type="miyouNotice" class="W_tips tips_error clearfix" style="display:none"><p class="icon"><span class="icon_errorS"></span></p><p class="txt" node-type="miyouNotice_text">#L{警告提示}<a href="#">#L{点击查看我的帐号安全度}»</a></p></div><div class="lsfl_gTit add_close_f clearfix">  <div class="left" node-type="miyouMessage"><label for="closefriend_grouplistpanel"><i class="W_ico16 i_conn_close_friend"></i><span node-type="cf_label" class="W_fb W_f_cf">#L{密友圈}</span></label><span class="S_txt3" node-type="miyou_count">(135/140人)</span></div><div class="right W_textb" ><a href="javascript:;" class="W_btn_b" node-type="closefriendBtn" action-type="closefriendBtn">  </a></div>  </div></div><div class="lsfl_gTit clearfix"><div class="left" node-type="message"></div><div class="right W_textb" action-type="tipsLayer"><span class="icon_askS"></span>#L{为什么要设置分组？}<div class="layer_tips" node-type="groupTips" style="display: none;"><ul><li>#L{可以在首页查看设定分组的微博} </li><li>#L{将已经关注的人设置分组，方便管理}</li><li>#L{分组信息是保密的，只有自己可见}</li></ul><span style="left:180px" class="arrow_up"></span></div></div></div><div><div class="W_loading" node-type="loading"><span>#L{正在加载，请稍候...}</span></div><div node-type="groupList"></div></div><div node-type="addGroupPanel"><div class="lsfl_addNew" node-type="showBtnBox"><a class="addnew" href="javascript:;" action-type="showBtn" suda-uatrack="key=group_aftermark&value=new"><span class="ico_addinv"></span><span class="txt">#L{创建新分组}</span></a></div><div class="lsfl_creaNew form_table_single" node-type="addGroupBox" style="display:none;"><input node-type="groupInput" type="text" value="#L{新分组}" class="W_input"><div style="display:none;" node-type="errorTips" class="M_notice_del"><span class="icon_del"></span></div><a href="javascript:;" class="W_btn_a btn_noloading" action-type="addGroup" node-type="addGroup"><span><b class="loading"></b><em node-type="createBtnTxt">#L{创建}</em></span></a><a href="javascript:;" action-type="hideBtn">#L{取消}</a></div></div><div class="btn"><a href="javascript:;" class="W_btn_a btn_noloading" action-type="submit" node-type="submit"><span><b class="loading"></b><em node-type="btnText">#L{保存}</em></span></a><a href="javascript:;" class="W_btn_b" action-type="cancel" suda-uatrack="key=group_aftermark&value=close"><span>#L{取消}</span></a></div></div>', checkBox: '<input type="checkbox" value="{value}" name="gid" class="W_checkbox" {checked} id="group_{groupId}"><label for="group_{groupId}">{name}</label>', recommend: '<div class="btn"><input type="checkbox" class="W_checkbox" id="id_all" node-type="nomore_appear"><label class="check_all" for="id_all"  >' + e("#L{7天内不再出现}") + "</label>" + '<a class="W_btn_a" href="javascript:void(0);" node-type="innerclose"><span>' + e("#L{关闭}") + "</span></a>" + "  </div>"}, m = {title: "#L{关注成功}", gEmpty: "#L{分组名不能为空}", rEmpty: "#L{备注名不能为空}", gMaxLen: "#L{请不要超过16个字符}", gDefVal: "#L{新分组}", okLabel: "#L{设置成功}", rDefVal: "#L{设置备注}", message: "#L{为 %s 选择分组}", repeat: "#L{此分组名已存在}"}, n = !1, o = [], p = 0, q = 0, r, s, t, u, v, w, x, y, z, A, B, C = {cfSuc_1: e("#L{密友邀请已经发送，请等待对方接受}"), cfSuc_2: e("#L{你已经成功添加对方为密友，你们彼此已经是密友啦}"), cfSucTit_1: e("#L{需要对方通过邀请才能加为密友}")}, D = function (a) {
            t.remarkInput.value = e(m.rDefVal);
            t.groupInput.value = e(m.gDefVal);
            t.loading.style.display = "";
            t.groupList.innerHTML = "";
            t.showBtnBox.style.display = "";
            t.addGroupBox.style.display = "none";
            t.closefriendBtn.className = h.enable;
            t.closefriendBtn.innerHTML = g[0];
            t.miyouText.innerHTML = i[a.sex] || i.m;
            t.closefriendBtn.setAttribute("action-data", "type=add");
            t.miyouNotice.style.display = "none"
        }, E = function () {
            if (!c) {
                c = !0;
                a.common.trans.relation.getTrans("recommendfollow", {onSuccess: function (b) {
                    if (!!b.data) {
                        var d = b.data + l.recommend, f = a.ui.dialog({isHold: !0}), g = f.getInner();
                        window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack("user_aftermark", "close");
                        var h = a.core.str.leftB(r.fnick, 16);
                        a.core.str.bLength(h) < a.core.str.bLength(r.fnick) && (h += "...");
                        g.className = "layer_recommed clearfix";
                        a.insertHTML(g, d, "afterbegin");
                        var i = a.sizzle('[node-type="innerclose"]', g)[0];
                        f.setTitle(e("#L{@%s的粉丝还对下面的人感兴趣哦，去看看他们吧~}", h || "TA"));
                        f.show().setMiddle();
                        var j = f.getOuter();
                        j.setAttribute("ucardconf", "type=1");
                        var k, m = function (b) {
                            var c = a.fixEvent(b), d = c.target, e = d.getAttribute("usercard");
                            if (!!e) {
                                k || (k = a.common.layer.userCard(d, {order: "t", zIndex: 10002}));
                                k.showCard(d, e, c)
                            }
                        }, n = function (b) {
                            var c = a.fixEvent(b), d = c.target, e = d.getAttribute("usercard");
                            if (!!e) {
                                k || (k = a.common.layer.userCard(d, {order: "t"}));
                                k.hideCard(d, e, c)
                            }
                        };
                        a.addEvent(j, "mouseover", m);
                        a.addEvent(j, "mouseout", n);
                        var o = function () {
                            setTimeout(function () {
                                c = !1
                            }, 3e3);
                            a.removeEvent(j, "mouseover", m);
                            a.removeEvent(j, "mouseout", n);
                            var b = a.sizzle('[node-type="nomore_appear"]', g)[0], d = 0;
                            if (b.checked) {
                                d = 1;
                                window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack("user_aftermark", "1")
                            }
                            a.custEvent.remove(f, "hide", o);
                            a.common.trans.relation.getTrans("closerecommend", {onSuccess: function (a) {
                            }, onFail: function () {
                            }, onError: function () {
                            }}).request({recom_tip: d, cuid: $CONFIG.uid})
                        };
                        a.custEvent.add(f, "hide", o);
                        a.addEvent(i, "click", function () {
                            f.hide()
                        })
                    }
                }, onFail: function () {
                }, onError: function () {
                }}).request({cuid: $CONFIG.uid, fuid: r.uid})
            }
        }, F = function (a, b) {
            var c, d;
            if (a == "addGroup") {
                c = e("#L{创建}");
                d = "createBtnTxt"
            } else {
                c = e("#L{保存}");
                d = "btnText"
            }
            if (b == "normal") {
                t[a].className = "W_btn_a btn_noloading";
                t[d].innerHTML = c
            } else {
                t[a].className = "W_btn_a_disable";
                t[d].innerHTML = e("#L{保存中...}")
            }
        }, G = function (b) {
            D(b);
            r = a.parseParam({uid: "", fnick: "", sex: "m", hasRemark: !0, fromFollow: !1, groupList: [], title: e(m.title), successCb: function () {
            }, cancelCb: function () {
            }}, b);
            b.tarEl && (r = a.common.getDiss(r, b.tarEl));
            z = r.successCb;
            A = r.cancelCb;
            t.uid.value = r.uid;
            if (r.hasRemark) {
                t.remarkInput.removeAttribute("disabled");
                t.remarkPanel.style.display = ""
            } else {
                t.remarkInput.setAttribute("disabled", "disabled");
                t.remarkPanel.style.display = "none"
            }
            r.groupList.length ? M(r.groupList) : O.request({uid: r.uid});
            t.message.innerHTML = e(m.message, ' <span class="W_fb">' + r.fnick + "</span>");
            j.setTitle(r.title);
            j.appendChild(t.group_panel);
            j.show().setMiddle()
        }, H = function (b) {
            if (!!b) {
                if (r && r.fromFollow != !0)return;
                var c = parseInt(Math.random() * 1e4), e = a.C("img");
                e.src = d + "?n=" + b.allGroup + "_" + b.autoSelect + "&gid=" + b.gid.join(",") + "&uid=" + b.uid + "&rd=" + c;
                document.body.appendChild(e);
                setTimeout(function () {
                    e.parentNode.removeChild(e)
                }, 3e3)
            }
        }, I = function (a) {
            var a = a || {};
            j.hide()
        }, J = {defVal: e(m.gDefVal), check: function (b) {
            var c = "";
            b === "" || b === this.defVal ? c = m.gEmpty : a.core.str.bLength(b) > 16 && (c = m.gMaxLen);
            return e(c)
        }, checkRepeat: function (a) {
            var b = "";
            for (var c = o.length; c--;)if (a === o[c].gname) {
                b = m.repeat;
                break
            }
            return e(b)
        }, showError: function (a) {
            t.errorTips.innerHTML = '<span class="icon_del"></span>' + a;
            t.errorTips.style.display = ""
        }, hideError: function () {
            t.errorTips.style.display = "none"
        }}, K = {defVal: e(m.rDefVal), check: function (b) {
            var c = "";
            b === "" ? c = m.rEmpty : a.core.str.bLength(b) > 16 && (c = m.gMaxLen);
            return e(c)
        }, showError: function (a) {
        }, hideError: function () {
        }}, L = function (b) {
            var c = a.C("li"), d = l.checkBox.replace(/\{value\}/g, b.gid).replace(/\{groupId\}/g, b.gid).replace(/\{name\}/g, b.gname).replace(/\{checked\}/g, b.belong ? "checked" : "");
            c.innerHTML = d;
            return c
        }, M = function (b) {
            o = b;
            t.addGroupPanel.style.display = b.length >= 20 ? "none" : "";
            a.common.trans.relation.request("checkcloserelation", {onSuccess: function (c, d) {
                var e = c.data.relation || {};
                q = c.data.close_friends_count || 0;
                var f = e[r.uid] || 0;
                t.closefriendBtn.innerHTML = g[f];
                if (f > 0) {
                    t.closefriendBtn.className = h.disable;
                    t.closefriendBtn.setAttribute("action-data", "type=remove")
                }
                var i = {data: b, cftype: f || 0, fnick: r.fnick, uid: r.uid};
                s = a.common.group.groupListPanel(i);
                t.groupList.appendChild(s.getOuter());
                t.loading.style.display = "none";
                t.miyou_count.innerHTML = "(" + q + "/140人)"
            }}, {uid: r.uid})
        }, N = {errorCd: function (b, c) {
            if (b.code == "100096" || b.code == "100097" || b.code == "100098") {
                var d = a.common.layer.vipError(b.code, {info: b.data.html, lbtnFunc: function () {
                    location.href = b.data.gurl
                }});
                a.custEvent.add(d, "hide", I)
            } else a.ui.alert(b && b.msg || e("#L{保存失败！}"));
            F("submit", "normal")
        }, getGroupSuccess: function (a, b) {
            var c = a.data || [];
            M(c)
        }, setGroupSuccess: function (b, c) {
            F("submit", "normal");
            a.ui.litePrompt(e(m.okLabel), {type: "succM", timeout: "500"});
            setTimeout(E, 550);
            I();
            z(b, c)
        }, setGroupError: function (a, b) {
            J.showError(a.msg)
        }, addGroupSuccess: function (a, b) {
            F("addGroup", "normal");
            var c = a.data, d;
            t.addGroupPanel.style.display = c.length >= 20 ? "none" : "";
            for (var f in c)if (c[f].belong === 1) {
                d = c[f];
                break
            }
            d && o.push(d);
            s.add(d);
            T.hideAddPanel();
            t.groupInput.value = e(m.gDefVal);
            s.length() >= 20 && (t.addGroupPanel.style.display = "none")
        }}, O = a.common.trans.group.getTrans("list", {onSuccess: N.getGroupSuccess, onError: N.errorCd}), P = a.common.trans.group.getTrans("update", {onSuccess: N.setGroupSuccess, onError: N.errorCd, onFail: N.errorCd}), Q = a.common.trans.group.getTrans("batchSet", {onSuccess: N.setGroupSuccess, onError: N.errorCd}), R = a.common.trans.group.getTrans("add", {onSuccess: N.addGroupSuccess, onError: function (b, c) {
            F("addGroup", "normal");
            a.ui.alert(b.msg)
        }}), S = function (b) {
            var c = document.createTextNode(b), d = a.C("div");
            d.appendChild(c);
            var e = d.innerHTML;
            d = c = null;
            return e
        }, T = {showAddPanel: function () {
            t.showBtnBox.style.display = "none";
            t.addGroupBox.style.display = "";
            t.groupInput.focus()
        }, hideAddPanel: function () {
            t.showBtnBox.style.display = "";
            t.addGroupBox.style.display = "none";
            J.hideError();
            t.groupInput.value = J.defVal
        }, addGroup: function () {
            var b = S(a.trim(t.groupInput.value)), c = J.check(b) || J.checkRepeat(b);
            if (c)J.showError(c); else {
                J.hideError();
                F("addGroup", "loading");
                R.request({name: b})
            }
        }, submit: function () {
            var b = S(a.trim(t.groupInput.value)), c = J.checkRepeat(b);
            if (c)J.showError(c); else {
                var d = {};
                n = !0;
                J.hideError();
                J.check(b) || (d.newgroup = b);
                d.type = "s";
                var f = s.getData();
                B = f.isCfInvite;
                var g = [], h = t.remarkInput.value;
                h === e(m.rDefVal) && (h = "");
                d.remark = h;
                var i = t.uid.value;
                d.user = i;
                d.gid = a.jsonToStr(f);
                if (f.suda_diss && r.fromFollow == !0) {
                    var j = f.suda_diss.suda, k = f.suda_diss.diss;
                    window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack("group_aftermark", "save:" + j.join(","))
                }
                F("submit", "loading");
                P.request(d)
            }
        }, cancel: function () {
            n = !1;
            I()
        }, inputFocus: function (b) {
            return function (c) {
                var c = a.fixEvent(c), d = c.target, e = d.value;
                b.hideError();
                e === b.defVal && (d.value = "")
            }
        }, inputBlur: function (b) {
            return function (c) {
                var c = a.fixEvent(c), d = c.target, e = a.trim(d.value);
                e || (d.value = b.defVal)
            }
        }, inputMaxLen: function (c) {
            var c = a.fixEvent(c), d = c.target, e = d.value, f = a.core.str.bLength(e);
            c.keyCode == "13" ? T.submit() : f > b && (d.value = a.core.str.leftB(e, b))
        }, showGroupTips: function () {
            t.groupTips.style.display = ""
        }, hideGroupTips: function () {
            t.groupTips.style.display = "none"
        }, closefriendBtn: function (b) {
            if (b.data.type != "remove") {
                t.closefriendBtn.className = h.disable;
                a.common.trans.relation.getTrans("addCloseFriend", {onSuccess: function (a) {
                    switch (a.data.cftype) {
                        case 1:
                        case"1":
                            t.closefriendBtn.innerHTML = g[1];
                            break;
                        default:
                            t.closefriendBtn.innerHTML = g[2]
                    }
                    t.closefriendBtn.setAttribute("action-data", "type=remove");
                    t.miyou_count.innerHTML = "(" + ++q + "/140人)"
                }, onError: function (a) {
                    t.miyouNotice.style.display = "";
                    t.miyouNotice_text.innerHTML = a.msg;
                    t.closefriendBtn.className = h.enable
                }}).request({uid: [t.uid.value], name: "", inviteid: "", content: ""})
            }
        }}, U = function () {
            X();
            V();
            W()
        }, V = function () {
            var b = j.getDomList().close[0];
            b.setAttribute("suda-uatrack", "key=group_aftermark&value=close");
            a.custEvent.define(f, ["hide"]);
            u = a.core.evt.delegatedEvent(t.group_panel);
            v = T.inputFocus(J);
            w = T.inputBlur(J);
            x = T.inputFocus(K);
            y = T.inputBlur(K);
            a.addEvent(t.remarkInput, "focus", x);
            a.addEvent(t.remarkInput, "blur", y);
            a.addEvent(t.groupInput, "focus", v);
            a.addEvent(t.groupInput, "blur", w);
            a.addEvent(t.remarkInput, "keyup", T.inputMaxLen);
            a.addEvent(t.groupInput, "keyup", T.inputMaxLen);
            u.add("showBtn", "click", T.showAddPanel);
            u.add("hideBtn", "click", T.hideAddPanel);
            u.add("addGroup", "click", T.addGroup);
            u.add("submit", "click", T.submit);
            u.add("cancel", "click", T.cancel);
            u.add("tipsLayer", "mouseover", T.showGroupTips);
            u.add("tipsLayer", "mouseout", T.hideGroupTips);
            u.add("closefriendBtn", "click", T.closefriendBtn)
        }, W = function () {
            a.custEvent.add(j, "hide", function () {
                a.custEvent.fire(f, ["hide"]);
                n || A();
                var b = s.getData();
                b && b.suda_diss && H(b.suda_diss.diss)
            })
        }, X = function () {
            var b = a.core.dom.builder(e(l.groupBox));
            t = a.kit.dom.parseDOM(b.list)
        }, Y = function () {
            a.custEvent.undefine(f, ["hide"]);
            a.removeEvent(t.remarkInput, "focus", x);
            a.removeEvent(t.remarkInput, "blur", y);
            a.removeEvent(t.groupInput, "focus", v);
            a.removeEvent(t.groupInput, "blur", w);
            a.removeEvent(t.remarkInput, "keyup", T.inputMaxLen);
            a.removeEvent(t.groupInput, "keyup", T.inputMaxLen);
            v = null;
            w = null;
            x = null;
            y = null;
            u && u.destroy()
        };
        U();
        f.show = G;
        f.hide = I;
        f.destroy = Y;
        return f
    }
});
STK.register("kit.dom.textSelection", function (a) {
    return function (b, c) {
        var d, e;
        d = {};
        e = a.parseParam({}, c);
        var f = function (c) {
            return a.core.dom.selectText(b, c)
        }, g = function () {
            b.__areaQuery = a.jsonToQuery(a.core.dom.textSelectArea(b))
        }, h = function () {
            b.__areaQuery = !1
        };
        a.addEvent(b, "beforedeactivate", g);
        a.addEvent(b, "active", h);
        var i = function () {
            var c = null;
            try {
                c = a.core.dom.textSelectArea(b)
            } catch (d) {
                c = a.queryToJson(b.__areaQuery)
            }
            c.start === 0 && c.len === 0 && b.__areaQuery && (c = a.queryToJson(b.__areaQuery));
            c.start = parseInt(c.start, 10);
            c.len = parseInt(c.len, 10);
            return c
        }, j = function (a, c) {
            var d = b.value, e = c.start, f = c.len || 0, g = d.slice(0, e), h = d.slice(e + f, d.length);
            b.value = g + a + h;
            d = null;
            g = null;
            h = null;
            var e = null, f = null
        };
        d.setCursor = function (a) {
            f(a)
        };
        d.getCursor = function () {
            return i()
        };
        d.insertCursor = function (a) {
            var b = i();
            j(a, b);
            b.len = a.length;
            f(b)
        };
        d.TempletCursor = function (c) {
            var d, e, g;
            d = i();
            d.len > 0 ? e = b.value.substr(d.start, d.len) : e = "";
            g = a.templet(c, {origin: e});
            j(g, d);
            d.start = d.start + c.indexOf("#{origin");
            d.len = g.length - c.replace(/#\{[origin].+?\}/, "").length;
            f(d)
        };
        d.insertText = j;
        d.destroy = function () {
            a.removeEvent(b, "beforedeactivate", g);
            a.removeEvent(b, "active", h);
            b = null
        };
        return d
    }
});
STK.register("kit.dom.smartInput", function (a) {
    return function (b, c) {
        var d, e, f, g, h, i, j, k, l, m = "stop", n, o, p, q, r;
        d = a.parseParam({notice: "", currentClass: null, noticeClass: null, noticeStyle: null, maxLength: null, needLazyInput: !1, LazyInputDelay: 200}, c);
        e = a.cascadeNode(b);
        h = a.kit.dom.textSelection(b);
        a.custEvent.define(e, "enter");
        a.custEvent.define(e, "ctrlEnter");
        a.custEvent.define(e, "lazyInput");
        f = function () {
            d.maxLength && a.bLength(b.value) > d.maxLength && (b.value = a.leftB(b.value, d.maxLength))
        };
        o = function () {
            if (b.value === d.notice) {
                b.value = "";
                d.noticeClass != null && a.removeClassName(b, d.noticeClass)
            }
            d.currentClass != null && a.addClassName(b.parentNode, d.currentClass)
        };
        p = function () {
            if (b.value === "") {
                b.value = d.notice;
                d.noticeClass != null && a.addClassName(b, d.noticeClass)
            }
            d.currentClass != null && a.removeClassName(b.parentNode, d.currentClass)
        };
        g = function () {
            f();
            return b.value === d.notice ? "" : b.value
        };
        q = function (b) {
            b.keyCode === 13 && a.custEvent.fire(e, "enter", g())
        };
        r = function (b) {
            (b.keyCode === 13 || b.keyCode === 10) && b.ctrlKey && a.custEvent.fire(e, "ctrlEnter", g())
        };
        i = function () {
            if (m === "stop") {
                l = setInterval(k, d.LazyInputDelay);
                m = "sleep"
            }
        };
        j = function () {
            clearInterval(l);
            m = "stop"
        };
        k = function () {
            if (n === b.value)if (m === "weakup") {
                a.custEvent.fire(e, "lazyInput", b.value);
                m = "sleep"
            } else m === "waiting" && (m = "weakup"); else m = "waiting";
            n = b.value
        };
        if (d.needLazyInput) {
            a.addEvent(b, "focus", i);
            a.addEvent(b, "blur", j)
        }
        a.addEvent(b, "focus", o);
        a.addEvent(b, "blur", p);
        a.addEvent(b, "keyup", f);
        a.addEvent(b, "keydown", q);
        a.addEvent(b, "keydown", r);
        e.getValue = g;
        e.setValue = function (a) {
            b.value = a;
            f();
            return e
        };
        e.setNotice = function (a) {
            d.notice = a;
            return e
        };
        e.setNoticeClass = function (a) {
            d.noticeClass = a;
            return e
        };
        e.setNoticeStyle = function (a) {
            d.noticeStyle = a;
            return e
        };
        e.setMaxLength = function (a) {
            d.maxLength = a;
            return e
        };
        e.restart = function () {
            p()
        };
        e.startLazyInput = i;
        e.stopLazyInput = j;
        e.setCursor = h.setCursor;
        e.getCursor = h.getCursor;
        e.insertCursor = h.insertCursor;
        e.insertText = h.insertText;
        e.destroy = function () {
            if (d.needLazyInput) {
                a.removeEvent(b, "focus", o);
                a.removeEvent(b, "blur", p)
            }
            j();
            a.removeEvent(b, "focus", o);
            a.removeEvent(b, "blur", p);
            a.removeEvent(b, "keyup", f);
            a.removeEvent(b, "keydown", q);
            a.removeEvent(b, "keydown", r);
            a.custEvent.undefine(e, "enter");
            a.custEvent.undefine(e, "ctrlEnter");
            a.custEvent.undefine(e, "lazyInput");
            h.destroy();
            e = null
        };
        return e
    }
});
STK.register("ui.prompt", function (a) {
    var b = '<div class="layer_prompt" node-type="outer"><p class="son_title" node-type="inner"></p><dl class="clearfix"><dt node-type="label"></dt><dd><input type="text" class="W_input W_input_default" value="" node-type="input" /><p class="S_error" node-type="errorBox"><span class="icon_del"></span><span node-type="errorTxt"></span></p></dd></dl><div class="btn"><a class="W_btn_d" href="javascript:void(0);" node-type="OK"></a><a class="W_btn_b" href="javascript:void(0);" node-type="cancel"></a></div></div>', c = a.kit.extra.language, d = null, e = function (a, b) {
        a.getDom("inner").innerHTML = b.info;
        a.getDom("label").innerHTML = b.label;
        a.getDom("OK").innerHTML = "<span>" + b.OKText + "</span>";
        a.getDom("cancel").innerHTML = "<span>" + b.cancelText + "</span>";
        a.getDom("errorBox").style.visibility = "hidden";
        a.getDom("errorTxt").innerHTML = "";
        a.input.setValue(b.value);
        a.input.setNotice(b.notice);
        a.input.restart()
    }, f = function (f) {
        var g, h, i, j, k, l, m;
        d || (d = a.kit.extra.reuse(function () {
            var d = a.ui.mod.layer(c(b));
            d.input = a.kit.dom.smartInput(d.getDom("input"));
            return d
        }));
        h = d.getOne();
        i = a.ui.dialog();
        i.appendChild(h.getOuter());
        i.setTitle(f.title);
        e(h, f);
        j = function () {
            var a = f.check(h.getDom("input").value);
            a.status ? m() : l(a.msg);
            return a.status
        };
        k = function () {
            j() && f.OK(h.getDom("input").value)
        };
        l = function (a) {
            h.getDom("errorBox").style.visibility = "visible";
            h.getDom("errorTxt").innerHTML = a
        };
        m = function () {
            h.getDom("errorBox").style.visibility = "hidden"
        };
        a.custEvent.add(h.input, "enter", k);
        a.addEvent(h.getDom("OK"), "click", k);
        a.addEvent(h.getDom("cancel"), "click", i.hide);
        a.addEvent(h.getDom("input"), "blur", j);
        a.custEvent.add(i, "hide", function () {
            a.custEvent.remove(i, "hide", arguments.callee);
            a.custEvent.remove(h.input, "enter", k);
            a.removeEvent(h.getDom("OK"), "click", k);
            a.removeEvent(h.getDom("cancel"), "click", i.hide);
            a.removeEvent(h.getDom("input"), "blur", j);
            d.setUnused(h);
            f.cancel();
            h = null;
            i = null
        });
        g = {};
        g.pmt = h;
        g.dia = i;
        g.hide = i.hide;
        g.showError = l;
        g.hideError = m;
        return g
    };
    return function (b) {
        var d, e;
        d = a.parseParam({title: c("#L{提示}"), notice: "", value: "", info: "", label: "", OK: a.funcEmpty, cancel: a.funcEmpty, check: function () {
            return{status: !0}
        }, OKText: c("#L{确定}"), cancelText: c("#L{取消}")}, b);
        e = f(d);
        e.dia.show().setMiddle();
        return e
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
STK.register("common.dialog.setRemark", function (a) {
    return function (b) {
        b = b || {};
        var c = b.uid;
        if (b.uid != null) {
            var d = a.trim(b.remark || ""), e = b.callback, f = a.kit.extra.language, g = "", h = a.ui.prompt({title: f("#L{设置备注名}"), notice: f("#L{请输入备注名}"), value: d || "", info: "", label: f("#L{备注名：}"), OK: function (a) {
                if (d != "" && a == d) {
                    e && e(d);
                    h.hide()
                } else i.request({touid: c, remark: g})
            }, cancel: a.funcEmpty, check: function (b) {
                var c;
                if (a.trim(b) == "" || b == f("#L{请输入备注名}")) {
                    c = {status: !0, msg: f("#L{备注名不能为空}")};
                    g = ""
                } else {
                    c = {status: !0};
                    g = b
                }
                return c
            }, OKText: f("#L{确定}"), cancelText: f("#L{取消}")});
            h.pmt.input.setMaxLength(30);
            setTimeout(function () {
                var b = h.pmt.getDom("input");
                b.focus();
                a.kit.extra.textareaUtils.setCursor(b)
            }, 0);
            var i = a.common.trans.relation;
            i = i.getTrans("setRemark", {onSuccess: function (a, b) {
                e && e(g);
                h.hide()
            } || a.funcEmpty, onError: function (a, b) {
                h.showError(a.msg)
            }, onFail: function (a, b) {
                h.showError(a.msg || f("#L{系统繁忙，请稍后再试}"))
            }})
        }
    }
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
STK.register("common.channel.relation", function (a) {
    var b = ["follow", "unFollow", "removeFans", "block", "unBlock", "addFriends", "removeFriends", "updateRemark"];
    return a.common.listener.define("common.channel.relation", b)
});
STK.register("common.dialog.inviteFollow", function (a) {
    var b = '<#et begFollow data><div class="layer_invite_question" node-type="begFollowPanel"><input type="hidden" name="fuid" value="${data.uid}"><#if (data.questionList&&data.questionList.length)><div class="inqueBg"><p class="question_title">#L{答对&nbsp;%s &nbsp;的问题，即可发送邀请：}</p><dl class="clearfix"><dt>#L{提问：}</dt><dd><select name="qid" class="htc_select" node-type="questionList"><#list data.questionList as list><option value="${list.question}">${list.question_text}</option></#list></select></dd><dt><span class="S_spetxt">*</span>#L{回答：}</dt><dd class="form_table_single"><input node-type="answer" type="text" value="#L{在这里填写答案}" class="W_input" name="answer"><div class="M_notice_del" node-type="answer_error" style="display:none;"></div></dd></dl></div></#if><dl class="inqueBgNo clearfix"><dt><span class="S_spetxt">*</span>#L{说点什么吧：}</dt><dd class="additional form_table_single"><textarea node-type="content" class="W_input" cols="" rows="" name="content">#L{介绍一下自己吧}</textarea><div class="M_notice_del" style="display:none;" node-type="content_error"></div></dd></dl><div class="btn"><a href="javascript:;" node-type="submit" class="W_btn_a"><span>#L{发送邀请}</span></a><a node-type="cancel" href="javascript:;" class="W_btn_b"><span>#L{取消}</span></a></div></div></#et>', c = a.kit.extra.language, d = '<span class="icon_del"></span><span class="txt">{error}</span>';
    return function (e) {
        e = e || {};
        var f, g, h = a.parseParam({answer: "#L{在这里填写答案}", content: "#L{介绍一下自己吧}", success: "#L{邀请发送成功！}", ans_error: "#L{请输入答案哦。}", con_error: "#L{请输入你想说的话。}", title: "#L{邀请%s关注我}", defMsg: "", callback: a.core.func.empty, succCallback: a.core.func.empty}, e || {}), i = e.trans || "answer", j = e.successCb || function () {
            a.ui.litePrompt(c(h.success), {type: "succM", timeout: "500"})
        }, k = e.errorCb || function (b, c) {
            b && b.msg && a.ui.alert(b.msg)
        }, l = function (b, e, f, h) {
            var i = g[b + "_error"];
            if (i) {
                i.innerHTML = d.replace(/\{error\}/, e);
                i.style.display = ""
            } else f && f === "100060" ? e && a.ui.confirm(e, {icon: "warn", OKText: c("#L{立刻绑定}"), OK: function () {
                window.location.href = "http://account.weibo.com/settings/mobile"
            }}) : typeof h == "function" ? h() : e && a.ui.alert(e)
        }, m = function (a) {
            var b = g[a + "_error"];
            b.style.display = "none"
        }, n = a.common.trans.relation.getTrans(i, {onSuccess: function (a, b) {
            f.hide();
            j(a, b);
            h.succCallback()
        }, onError: function (a, b) {
            var c = a.data || {}, d = c.key;
            l(d, a.msg, a.code, function () {
                k(a, b)
            })
        }}), o = function (b, d) {
            b = a.trim(b || "");
            b === c(d) && (b = "");
            return b
        }, p = {submit: function () {
            var b = a.parseParam({uid: "", name: "", inviteid: ""}, e || {});
            e.tarEl && (b = a.common.getDiss(b, e.tarEl));
            i == "answer" && (b.fuid = e.uid);
            if (g.answer) {
                b.answer = o(g.answer.value, h.answer);
                if (!b.answer) {
                    l("answer", c(h.ans_error));
                    return
                }
            }
            if (g.content) {
                b.content = o(g.content.value, h.content);
                if (!b.content) {
                    l("content", c(h.con_error));
                    return
                }
            }
            g.questionList && (b.qid = g.questionList.value);
            n.request(b);
            a.preventDefault()
        }, cancel: function (a) {
            f.hide()
        }, focus: function (a) {
            return function () {
                m(a)
            }
        }}, q = function () {
            a.core.evt.hotKey.add(g.content, ["ctrl+enter", "enter"], function () {
                p.submit()
            });
            a.addEvent(g.answer, "focus", p.focus("answer"));
            a.addEvent(g.content, "focus", p.focus("content"));
            a.addEvent(g.submit, "click", p.submit);
            a.addEvent(g.cancel, "click", p.cancel)
        }, r = function () {
            g.answer && a.kit.dom.smartInput(g.answer, {notice: c(h.answer), noticeStyle: "color:#E0E0E0", maxLength: 20});
            a.kit.dom.smartInput(g.content, {notice: c(h.content), noticeStyle: "color:#E0E0E0", maxLength: 280})
        }, s = function () {
            var d = a.core.util.easyTemplate(c(b, e.name), e).toString(), i = a.core.dom.builder(d);
            g = a.kit.dom.parseDOM(i.list);
            f = a.ui.dialog();
            f.setTitle(c(h.title, e.titleName || e.name || e.fnick));
            h.defMsg && (g.content.value = c(h.defMsg));
            f.appendChild(g.begFollowPanel);
            e.callback && a.custEvent.add(f, "hide", e.callback)
        }, t = function () {
            s();
            q();
            r();
            f.show().setMiddle()
        };
        t()
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
                h.show();
                t.changesrc();
                h.setMiddle();
                g.input_text.value = "";
                a.hotKey.add(document.documentElement, ["esc"], t.closeDialog, {type: "keyup", disableInInput: !0})
            })
        }, o = function () {
            h = a.ui.dialog({isHold: !0});
            h.setTitle(c("#L{请输入验证码}"));
            h.setContent(c(e.dialog_html));
            var b = h.getOuter();
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
            g.close_icon = h.getDom("close")
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
            var b = h.getOuter();
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
STK.register("common.relation.followPrototype", function (a) {
    var b = {}, c = a.common.trans.relation, d = a.common.channel.relation, e = a.kit.extra.merge, f = a.common.dialog.validateCode(), g = function (b, c) {
        a.ui.alert(b.msg)
    }, h = function (b, g) {
        var h = a.kit.extra.merge({uid: "", f: 0, extra: "", oid: $CONFIG.oid, nogroup: !1, challenge_uids: "", check_challenge_value: ""}, g || {});
        if (b === "follow") {
            var i = c.getTrans(b, {onComplete: function (c, h) {
                var j = {onSuccess: function (a, c) {
                    var f = e(g, a.data);
                    d.fire(b, f);
                    var h = g.onSuccessCb;
                    typeof h == "function" && h(f)
                }, onError: function (b, c) {
                    a.common.layer.ioError(b.code, b)
                }, requestAjax: i, param: h, onRelease: function () {
                }};
                f.validateIntercept(c, h, j)
            }});
            i.request(h)
        } else a.common.trans.relation.request(b, {onSuccess: function (a, c) {
            var f = e(g, a.data);
            d.fire(b, f);
            var h = g.onSuccessCb;
            typeof h == "function" && h(f)
        }, onError: function (b, c) {
            a.common.layer.ioError(b.code, b)
        }}, h)
    }, i = function (a) {
        h("follow", a)
    }, j = function (a) {
        h("unFollow", a)
    }, k = function (a) {
        h("block", a)
    }, l = function (a) {
        h("unBlock", a)
    }, m = function (a) {
        h("removeFans", a)
    };
    b.follow = i;
    b.unFollow = j;
    b.block = k;
    b.unBlock = l;
    b.removeFans = m;
    return b
});
STK.register("ui.tipPrototype", function (a) {
    var b = 10003;
    return function (c) {
        var d, e, f, g, h, i = '<div node-type="outer" style="position: absolute; clear: both; display:none;overflow:hidden;z-index:10003;" ><div node-type="inner" ></div></div>';
        d = a.parseParam({direct: "up", showCallback: a.core.func.empty, hideCallback: a.core.func.empty}, c);
        e = a.ui.mod.layer(i, d);
        f = e.getOuter();
        g = e.getInner();
        e.setTipWH = function () {
            h = this.getSize(!0);
            this.tipWidth = h.w;
            this.tipHeight = h.h;
            return this
        };
        e.setTipWH();
        e.setContent = function (a) {
            typeof a == "string" ? g.innerHTML = a : g.appendChild(a);
            this.setTipWH();
            return this
        };
        e.setLayerXY = function (c) {
            if (!c)throw"ui.tipPrototype need pNode as first parameter to set tip position";
            var e = STK.core.dom.position(c), g = e.l, h = c.offsetWidth, i = c.offsetHeight, j = Math.min(Math.max(g + (h - this.tipWidth) / 2, a.scrollPos().left), a.scrollPos().left + STK.winSize().width - this.tipWidth), k = e.t;
            d.direct === "down" && (k += i);
            var l = [";"];
            l.push("z-index:", b++, ";");
            l.push("height:", this.tipHeight, "px;");
            l.push("top:", k, "px;");
            l.push("left:", j, "px;");
            f.style.cssText += l.join("")
        };
        e.aniShow = function () {
            var b = this.getOuter();
            b.style.height = "0px";
            b.style.display = "";
            var c = a.core.ani.tween(b, {end: d.showCallback, duration: 250, animationType: "easeoutcubic"});
            if (d.direct === "down")c.play({height: this.tipHeight}, {staticStyle: "overflow:hidden;position:absolute;"}); else {
                var e = parseInt(b.style.top, 10) - this.tipHeight;
                c.play({height: this.tipHeight, top: Math.max(e, a.scrollPos().top)}, {staticStyle: "overflow:hidden;position:absolute;"})
            }
        };
        e.anihide = function () {
            var b = this.getOuter(), c = this, e = a.core.ani.tween(b, {end: function () {
                b.style.display = "none";
                b.style.height = c.tipHeight + "px";
                d.hideCallback()
            }, duration: 300, animationType: "easeoutcubic"});
            if (d.direct === "down")e.play({height: 0}, {staticStyle: "overflow:hidden;position:absolute;"}); else {
                var f = parseInt(b.style.top, 10) + this.tipHeight;
                e.play({height: 0, top: f}, {staticStyle: "overflow:hidden;position:absolute;"})
            }
        };
        document.body.appendChild(f);
        e.destroy = function () {
            document.body.removeChild(f);
            e = null
        };
        return e
    }
});
STK.register("ui.tipConfirm", function (a) {
    return function (b) {
        b = b || {};
        var c = a.kit.extra.language, d = a.ui.tipPrototype(b), e = d.getInner(), f = d.getOuter();
        f.className = "W_layer";
        e.className = "bg";
        b.info = b.info || c("#L{确认要删除这条微博吗？}");
        b.icon = b.icon || "icon_ask";
        var g = b.template || c('<table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td><div class="content layer_mini_info"><p class="clearfix" node-type="info"><span node-type="icon" class="' + b.icon + '"></span>' + b.info + "</p>" + '<p class="btn"><a node-type="ok" class="W_btn_d" href="javascript:void(0)"><span>#L{确定}</span></a><a class="W_btn_b" node-type="cancel" href="javascript:void(0)"><span>#L{取消}</span></a></p>' + "</div>" + "</td></tr></tbody>" + "</table>"), h = a.builder(g);
        d.setContent(h.box);
        if (!h.list.ok)return d;
        var i = h.list.ok[0], j = h.list.cancel[0];
        d.setIcon = function (a) {
            h.list.info.className = a;
            d.setTipWH()
        };
        d.setInfo = function (a) {
            h.list.info[0].innerHTML = '<span node-type="icon" class="' + b.icon + '"></span>' + a;
            d.setTipWH()
        };
        d.cancelCallback = function () {
            a.getType(b.cancelCallback) == "function" && b.cancelCallback()
        };
        d.okCallback = function () {
            a.getType(b.okCallback) == "function" && b.okCallback()
        };
        var k = function () {
            d.anihide();
            d.cancelCallback()
        }, l = function () {
            d.anihide();
            d.okCallback()
        };
        a.addEvent(j, "click", k);
        a.addEvent(i, "click", l);
        var m = d.destroy;
        d.destroy = function () {
            a.removeEvent(j, "click", k);
            a.removeEvent(i, "click", l);
            m();
            d = null
        };
        return d
    }
});
STK.register("common.relation.baseFollow", function (a) {
    var b = window.$CONFIG || {}, c = b.imgPath + "/style/images/common/transparent.gif";
    return function (b) {
        var c = {}, d = a.common.channel.relation, e = a.core.evt.delegatedEvent(b), f = a.common.relation.followPrototype, g = a.kit.extra.merge, h = a.kit.extra.language, i = a.common.dialog.setGroup(), j = {unFollowTips: h("#L{确认取消关注吗？}"), bothFollow: h("#L{互相关注}"), singleFollow: h("#L{已关注}")}, k = a.ui.tipConfirm({info: j.unFollowTips}), l = {follow: h('<div class="W_btn_c"><span><em class="W_ico12 icon_addone"></em>#L{已关注}<em class="W_vline S_txt2">|</em><a class="S_link2" action-type="{actionType}" action-data="uid={uid}&fnick={fnick}&f=1&nogroup={nogroup}" href="javascript:void(0);"><em>#L{取消}</em></a></span></div>'), unFollow: h('<a action-type="follow" action-data="uid={uid}&fnick={fnick}&f=1&nogroup={nogroup}" href="javascript:void(0);" class="W_btn_b"><span>{followMe}<em class="addicon">+</em>#L{关注}</span></a>'), block: h('<div class="W_addbtn_even">#L{已加入黑名单}<span class="W_vline">|</span><a action-type="unBlock" action-data="uid={uid}&fnick={fnick}&f=1" href="javascript:void(0);" class="S_link2"><em>#L{解除}</em></a></div>'), loading: h('<b class="loading"></b>#L{加关注}'), followMe: h('<em class="W_ico12 icon_addone"></em><em class="W_vline S_txt2">|</em>')}, m = function (a, b) {
            b = b || {};
            var c = a;
            for (var d in b)c = c.replace("{" + d + "}", b[d]);
            return c
        }, n = function (c) {
            var d = a.core.dom.sizzle("a[action-data*=uid=" + c + "]", b)[0], e;
            if (!!d) {
                do {
                    var f = d.getAttribute("node-type");
                    if (f === "followBtnBox") {
                        e = d;
                        break
                    }
                    d = d.parentNode
                } while (d && d.tagName.toLowerCase() !== "body");
                return e
            }
        }, o = {followed: function (a) {
            var b = n(a.uid);
            if (!!b) {
                var c = "addbtn_d", d = j.singleFollow, e = "unFollow", f = a.relation || {};
                if (f.following && f.follow_me) {
                    c = "addbtn_c";
                    d = j.bothFollow;
                    e = "unFollow"
                }
                var g = m(l.follow, {className: c, focDoc: d, actionType: e, uid: a.uid, fnick: a.fnick, nogroup: a.nogroup || ""});
                b.innerHTML = g || ""
            }
        }, unFollow: function (a) {
            var b = n(a.uid);
            if (!!b) {
                var c = a.relation || {}, d = m(l.unFollow, {followMe: c.follow_me ? l.followMe : "", uid: a.uid, fnick: a.fnick});
                b.innerHTML = d
            }
        }, blocked: function (a) {
            var b = n(a.uid);
            if (!!b) {
                var c = m(l.block, {uid: a.uid, fnick: a.fnick});
                b.innerHTML = c
            }
        }}, p = {followListener: function (a) {
            o.followed(a)
        }, unFollowListener: function (a) {
            o.unFollow(a)
        }, blockListener: function (a) {
            o.blocked(a)
        }, unBlockListener: function (a) {
            o.unFollow(a)
        }, removeFansListener: function (a) {
            var b = a.relation || {};
            b.following ? o.followed(a) : o.unFollow(a)
        }}, q = {follow: function (b) {
            var d = a.sizzle("span", b.el)[0];
            d.innerHTML = l.loading;
            var e = b.el.dataset && b.el.dataset.mark || b.el.getAttribute("data-mark") || "", g = {};
            e && (g = a.queryToJson(e));
            var h = a.common.getDiss(a.kit.extra.merge(a.kit.extra.merge({onSuccessCb: function (b) {
                var d = {uid: b.uid, fnick: b.fnick, groupList: b.group, hasRemark: !0, nogroup: b.nogroup || "", fromFollow: !0};
                a.custEvent.fire(c, "followSucc", d);
                d.nogroup || i.show(d)
            }}, b.data || {}), g), b.el);
            f.follow(h)
        }, unFollow: function (b) {
            if (!b.data.nogroup) {
                var c = b.data.fnick || h("#L{该用户}");
                k.setInfo(h("#L{确定不再关注}") + c + "?");
                k.setLayerXY(b.el);
                k.aniShow();
                k.okCallback = function () {
                    f.unFollow(a.common.getDiss(b.data, b.el))
                }
            } else f.unFollow(a.common.getDiss(b.data, b.el))
        }, unBlock: function (b) {
            a.ui.confirm(h("#L{确认将此用户从你的黑名单中解除吗？}"), {OK: function () {
                f.unBlock(b.data)
            }})
        }}, r = function () {
            s();
            t()
        }, s = function () {
            d.register("block", p.blockListener);
            d.register("follow", p.followListener);
            d.register("unBlock", p.unBlockListener);
            d.register("unFollow", p.unFollowListener);
            d.register("removeFans", p.removeFansListener)
        }, t = function () {
            e.add("follow", "click", q.follow);
            e.add("unBlock", "click", q.unBlock);
            e.add("unFollow", "click", q.unFollow);
            a.custEvent.define(c, ["followSucc"])
        }, u = function (b) {
            if (!a.core.dom.isNode(b))throw"[STK.common.relation.baseFollow]:node is not a Node!"
        }, v = function () {
            e.destroy();
            i.destroy();
            d.remove("block", p.blockListener);
            d.remove("follow", p.followListener);
            d.remove("unBlock", p.unBlockListener);
            d.remove("unFollow", p.unFollowListener);
            d.remove("removeFans", p.removeFansListener);
            p = null
        };
        r();
        c.destroy = v;
        return c
    }
});
STK.register("common.layer.userCard", function (a) {
    var b = 3e5, c = 500, d, e, f, g, h, i = a.kit.dom.hover, j = '<div class="WB_global_personcard" node-type="outer" style="position:absolute;display:none;"><div class="W_layer" style="position: static;"><div class="bg"><div class="effect"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div class="content clearfix" node-type="inner"></div></td></tr></tbody></table><div node-type="arrow" class="#{arrow_type}"></div></div></div></div></div>', k = '<div style="width:360px;padding-top:15px;padding-bottom:15px;text-align:center"><span>#{msg}</span></div>', l = document.domain === "www.weibo.com";
    return function (e, f) {
        var m = {}, n = a.kit.extra.language, o = a.common.channel.relation, p = a.templet, q, r = a.parseParam({order: "t,b,l,r", zIndex: 9999, type: 0, variety: l ? "userCard2_abroad" : "userCard2", arrowPos: "auto", loadTemp: n('<div class="W_loading" style="width:360px;padding-top:15px;padding-bottom:15px;text-align:center"><span>#L{正在加载，请稍候}...</span></div>')}, f || {}), s = a.common.trans.relation.getTrans(r.variety, {onComplete: function (b, c) {
            if (b.code == "100000") {
                var e = c.id || c.name;
                t.setCache(e, b.data);
                d.setContent(b.data);
                (d.delayShow || a.funcEmpty)();
                u()
            } else {
                if (!b || !b.msg || typeof b.msg != "string")b = {msg: n("#L{加载失败}")};
                d.setContent(p(k, b))
            }
        }}), t = {data: [], getCache: function (a) {
            var c = this.data[a], d = "";
            if (c) {
                var e = new Date;
                e - c.date < b ? d = c.html : delete this.data[a]
            }
            return d
        }, setCache: function (a, b) {
            this.data[a] = {date: new Date, html: b}
        }, rmCache: function (a) {
            delete this.data[a]
        }}, u = function () {
            q && v();
            var b = a.builder(d.cardPanel).list;
            b.morelist && (q = i({act: b.followBtnBox[0], delay: 0, moutDelay: 500, extra: [b.morelist[0]], onmouseover: function () {
                b.morelist[0].style.display = "";
                var c = a.position(b.followBtnBox[0]), d = a.core.dom.getSize(b.followBtnBox[0]);
                a.setXY(b.morelist[0], {t: c.t + d.height + 2, l: c.l})
            }, onmouseout: function () {
                b.morelist[0].style.display = "none"
            }}))
        }, v = function () {
            if (q) {
                q.destroy();
                q = null
            }
        }, w = function (b, e, f, g) {
            d.stopHide();
            d.stopShow();
            f = a.fixEvent(f);
            var h = function () {
                d.delayShow = h;
                var c = a.queryToJson(e), i = c.id || c.name, j = t.getCache(i);
                d.showCard({content: j || r.loadTemp, node: b, order: r.order, arrowPos: r.arrowPos, zIndex: r.zIndex, event: f});
                j ? u() : s.request(a.kit.extra.merge({type: r.type, mark: g && g.mark || ""}, c))
            };
            d.showTimer = setTimeout(h, c)
        }, x = function (a, b, c) {
            d.stopShow();
            d.hideCard()
        }, y = {rmCache: function (a) {
            t.rmCache(a.uid);
            t.rmCache(a.fnick)
        }}, z = function (b) {
            g || (g = a.common.dialog.setGroup());
            g.show({uid: b.data.uid, fnick: b.data.fnick, hasRemark: !1, sex: b.data.sex || "m"});
            x()
        }, A = function (b) {
            var c = b.data, d = c.remark || "";
            a.common.dialog.setRemark({uid: c.uid, remark: a.core.str.decodeHTML(decodeURIComponent(d)), callback: function (a) {
                t.rmCache(c.uid);
                t.rmCache(c.fnick)
            }});
            x()
        }, B = function (b) {
            var c = b.data;
            a.common.trans.relation.request("questions", {onSuccess: function (b, d) {
                a.common.dialog.inviteFollow({name: c.fnick, uid: c.uid, questionList: b.data})
            }, onError: function (b, c) {
                b && b.code === "100060" ? b.msg && a.ui.confirm(b.msg, {icon: "warn", OKText: n("#L{立刻绑定}"), OK: function () {
                    window.location.href = "http://account.weibo.com/settings/mobile";
                    return a.preventDefault()
                }}) : b.msg && a.ui.alert(b.msg)
            }}, {uid: c.uid});
            x()
        }, C = function () {
            if (!d) {
                d = a.ui.popCard({template: j});
                h = a.common.relation.baseFollow(d.cardPanel);
                a.custEvent.add(h, "followSucc", x);
                d.dEvent.add("setGroup", "click", z);
                d.dEvent.add("setRemark", "click", A);
                d.dEvent.add("inviteFollow", "click", B);
                d.dEvent.add("webim.conversation", "click", x)
            }
            D();
            E()
        }, D = function () {
            if (!a.core.dom.isNode(e))throw"[STK.common.layer.userCard]: node is not a Node!"
        }, E = function () {
            o.register("follow", y.rmCache);
            o.register("unFollow", y.rmCache)
        }, F = function () {
            t.data.length = 0;
            t = null
        };
        C();
        m.destroy = F;
        m.userCard = d;
        m.hideCard = x;
        m.showCard = w;
        return m
    }
});
STK.register("comp.content.userCard", function (a) {
    return function (b, c) {
        var d = {}, e, f = function (b, d, f, g) {
            e || (e = a.common.layer.userCard(b, c));
            e.showCard(b, d, f, g)
        }, g = function (b, d, f) {
            e || (e = a.common.layer.userCard(b, c));
            e.hideCard(b, d, f)
        }, h = {mouseover: function (b) {
            var c = a.fixEvent(b), d = c.target, e = d.getAttribute("usercard");
            if (!!e) {
                var g = d.dataset && d.dataset.mark || d.getAttribute("data-mark") || "", h = {};
                g ? h = a.queryToJson(g) : h = {};
                f(d, e, c, h)
            }
        }, mouseout: function (b) {
            var c = a.fixEvent(b), d = c.target, e = d.getAttribute("usercard");
            !e || g(d, e, c)
        }}, i = function () {
            j();
            k()
        }, j = function () {
            if (!a.core.dom.isNode(b))throw"[STK.comp.content.seedUserCard]: node is not a Node!"
        }, k = function () {
            a.addEvent(b, "mouseover", h.mouseover);
            a.addEvent(b, "mouseout", h.mouseout)
        }, l = function () {
            a.removeEvent(b, "mouseover", h.mouseover);
            a.removeEvent(b, "mouseout", h.mouseout)
        };
        i();
        d.destroy = l;
        d.userCard = e;
        return d
    }
});
STK.register("comp.content.suda", function (a) {
    window.SUDA = window.SUDA || [];
    Math.ceil(Math.random() * 1e4) == 1 && SUDA.push(["setPerformance", 15]);
    SUDA.push(["setGatherInfo", null, "WEIBO-V5"]);
    return function () {
        var a = !1, b = document, c = b.createElement("script"), d = b.getElementsByTagName("script")[0];
        c.type = "text/javascript";
        c.charset = "utf-8";
        c.async = !0;
        c.src = ("https:" == b.location.protocol ? "https://" : "http://") + "js.t.sinajs.cn/open/analytics/js/suda.js?version=" + $CONFIG.version;
        d.parentNode.insertBefore(c, d)
    }
});
STK.register("common.top.IMpubSub", function (a) {
    return function () {
        var a = {}, b = {};
        a.publish = function (a, c) {
            b[a] = b[a] || [];
            for (var d = 0; d < b[a].length; d++) {
                var e = b[a][d];
                if (typeof e == "function") {
                    var f = [];
                    for (var g = 1, h = arguments.length; g < h; g++)f.push(arguments[g]);
                    e.apply(this, f)
                }
            }
        };
        a.subscribe = function (a, c, d) {
            b[a] = b[a] || [];
            b[a].push(function () {
                c.apply(d, arguments)
            })
        };
        return a
    }
});
STK.register("common.content.message.upload.getExt", function (a) {
    var b = {csv: "csv", doc: "word", docx: "word", xls: "excel", xlsx: "excel", ppt: "ppt", pptx: "ppt", pdf: "pdf", rar: "rar", zip: "rar", txt: "txt", mp3: "music", avi: "video", flv: "video", mkv: "video", mp4: "video", mpeg: "video", mpg2: "video", rmvb: "video"};
    return function (c) {
        var d = a.trim(c.match(/[^\.]+$/)[0]).toLowerCase();
        return typeof b[d] != "undefined" ? b[d] : "default"
    }
});
STK.register("common.content.message.upload.addItem", function (a) {
    var b = a.kit.extra.language;
    return function (b, c, d) {
        var e = b.getAttribute("swfId") || "", f, g = a.common.content.message.upload.getExt(c), h = c, c = a.core.str.bLength(c) > 20 ? a.core.str.leftB(c, 20) + "..." : c;
        d.thumbnail && d.thumbnail.length != 0 ? f = '<img src="' + d.thumbnail + '" class="img" alt="图片" title="' + h + '">' + c + '<span class="func"><a class="S_link2 del" href="javascript:void(0)" node-type="deleteFile" action-type="deleteFile" action-data="swfId=' + e + "&" + STK.core.json.jsonToQuery(d) + '">删除</a></span>' : f = '<i><img src="' + $CONFIG.imgPath + "style/images/accessory/" + g + '.png" class="doc" alt="附件文件" title="' + h + '"></i>' + c + '<span class="func"><a class="S_link2 del" href="javascript:void(0)" node-type="deleteFile" action-type="deleteFile" action-data="swfId=' + e + "&" + STK.core.json.jsonToQuery(d) + '">删除</a></span>';
        var i = "<li>" + f + "</li>";
        b.style.display = "block";
        b.innerHTML += i;
        var j = b.getAttribute("fid") || "";
        b.setAttribute("fid", j + d.fid + ",")
    }
});
STK.register("common.trans.message", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("delete", {url: "/aj/message/del?_wv=5", method: "post"});
    c("getMsg", {url: "/aj/message/getmessagedetail?_wv=5", method: "get"});
    c("deleteUserMsg", {url: "/aj/message/destroy?_wv=5", method: "post"});
    c("create", {url: "/aj/message/add?_wv=5", method: "post"});
    c("search", {url: "/message", method: "get"});
    c("attachDel", {url: "/aj/message/attach/del?_wv=5", method: "get"});
    c("getDetail", {url: "/aj/message/detail?_wv=5", method: "get"});
    c("getSearchList", {url: "/aj/message/detail?_wv=5", method: "get"});
    c("getDetailList", {url: "/aj/message/detail?_wv=5", method: "get"});
    c("noConfirm", {url: "/aj/bubble/closebubble?_wv=5", method: "get"});
    return b
});
STK.register("common.channel.message", function (a) {
    var b = ["create", "delete"];
    return a.common.listener.define("common.channel.message", b)
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
STK.register("common.bubble.myFollowSuggest", function (a) {
    var b = '<div style="position: absolute; top: -2000px; left: -2000px; z-index: 100001;" node-type="___followListSuggest___" class="layer_menu_list"></div>', c = '<#et userlist data><ul><#list data.users as list><li action-type="followItem" action-data="index=${list.uid}"><a href="#" onclick="return false;">${list.screen_name}</a></li></#list></ul>';
    return function (d) {
        function F() {
            a.removeEvent(g, "keyup", r);
            g = null
        }

        function E() {
            h.innerHTML = "";
            a.setStyle(h, "left", "-2000px");
            a.setStyle(h, "top", "-2000px");
            k = null;
            a.removeEvent(document.body, "click", E)
        }

        function D() {
            y();
            e || C()
        }

        function C() {
            j = g.value;
            z();
            A();
            B()
        }

        function B() {
            e = a.ui.mod.suggest({textNode: g, uiNode: h, actionType: "followItem", actionData: "index"});
            a.custEvent.add(e, "onIndexChange", w);
            a.custEvent.add(e, "onSelect", x);
            a.custEvent.add(e, "onClose", E);
            a.addEvent(g, "keyup", r)
        }

        function A() {
            f = a.common.trans.global.getTrans(d.transName || "followList", {onSuccess: t, onError: u, onFail: u})
        }

        function z() {
            var c = a.sizzle('div[node-type="___followListSuggest___"]', document.body);
            if (a.objIsEmpty(c) && !h) {
                c = a.builder(b);
                document.body.appendChild(c.box);
                c = a.sizzle('div[node-type="___followListSuggest___"]', document.body);
                !a.objIsEmpty(c) && (c = c[0])
            }
            h = a.isArray(c) ? c[0] : c;
            d.width && function () {
                var a = parseInt(d.width, 10);
                h.style.width = d.width + (a == d.width ? "px" : "")
            }()
        }

        function y() {
            i = -1
        }

        function x(a, b) {
            if (b == null || b < 0)b == -1 && d.dontSelectFirst && p && p(g.value); else {
                j = n[b].screen_name;
                j = j.replace(/\(.*\)/, "");
                g.value = j;
                E();
                p && p(n[b])
            }
        }

        function w(a, b) {
            if (!!m && m.length != 0) {
                l != null && m[l] && (m[l].className = "");
                b == null && (b = 0);
                m[b].className = "cur";
                l = b
            }
        }

        function v() {
            var b = a.sizzle("li", h);
            m = b
        }

        function u(a, b) {
            E()
        }

        function t(b, e) {
            var f;
            h.innerHTML = a.core.util.easyTemplate(c, {users: b.data || []});
            a.addEvent(document.body, "click", E);
            n = b.data;
            f = a.position(g);
            a.setStyle(h, "left", f.l + "px");
            a.setStyle(h, "top", f.t + g.scrollHeight + "px");
            v();
            var i = d.dontSelectFirst ? -1 : 0;
            a.custEvent.fire(g, "indexChange", i);
            b.data.length || E()
        }

        function s() {
            f.request(a.parseParam({q: g.value, type: 0}, d))
        }

        function r() {
            if (!k) {
                a.custEvent.fire(g, "open", g);
                k = !0
            }
            if (a.trim(g.value) != "" && g.value != j) {
                j = g.value;
                s()
            } else if (a.trim(g.value) == "") {
                E();
                j = ""
            }
        }

        var e, f, g, h, i, j, k, l, m, n, o, p;
        if (d == null || d != null && d.textNode == null)throw new Error("[common.bubble.myFollowSuggest]Required parameter opts.textNode is missing");
        g = d.textNode;
        p = d.callback;
        d.list_template && (c = d.list_template);
        if (!a.isNode(g))throw new Error("[common.bubble.myFollowSuggest]Required parameter opts.textNode is NOT a html node.");
        var q = {};
        q.show = D;
        q.hide = E;
        q.destroy = F;
        return q
    }
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
STK.register("common.channel.at", function (a) {
    var b = ["open", "close"];
    return a.common.listener.define("common.channel.at", b)
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
STK.register("common.editor.plugin.at", function (a) {
    var b = a.kit.extra.language, c = '<div style="" class="layer_menu_list"><ul node-type="suggestWrap"></ul></div>', d = {"@": {normalTitle: b("#L{选择昵称或轻敲空格完成输入}"), moreTitle: b("#L{选择最近@的人或直接输入}"), noTilte: b("#L{轻敲空格完成输入}")}, "#": {normalTitle: b("#L{想用什么话题？}")}}, e = {"@": '<#et temp data><li class="suggest_title">${data.title}</li><#list data.data as list><li action-type="item" <#if (list_index == 0)>class="cur" </#if>action-data="value=${list.screen_name}" value="${list.screen_name}"><a href="#">${list.screen_name}<#if (list.remark)>(${list.remark})</#if></a></li><#if (list.count)><span>${list.count}</span></#if></#list></#et>', "#": '<#et temp data><li class="suggest_title">${data.title}</li><#list data.data as list><li action-type="item" <#if (list_index == 0)>class="cur" </#if>action-data="value=${list.topic}" value="${list.topic}"><a href="#">${list.topic}<#if (list.count)>(${list.count})</#if></a></li></#list></#et>'}, f, g, h, i, j, k, l = !1, m, n, o = {"@": "followList", "#": "topicList"}, p = 0, q = function () {
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
            a.core.evt.stopEvent();
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
            if (k.length == 0 && d != "@")a.custEvent.fire(f, "close"); else var e = a.common.trans.global.getTrans(o[d], {onSuccess: function (b, e) {
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
STK.register("ui.mod.bubble", function (a) {
    return function (b, c) {
        var d, e, f, g, h, i, j;
        e = a.parseParam({width: null, height: null, parent: document.body}, c);
        f = a.ui.mod.layer(b);
        g = f.getDom("outer");
        h = f.getDom("inner");
        f.getDomListByKey("close") && (i = f.getDom("close"));
        g.style.display = "none";
        j = !1;
        var k = function (b) {
            if (j)return!0;
            var c = a.fixEvent(b);
            a.contains(g, c.target) || f.hide()
        };
        i && a.addEvent(i, "click", f.hide);
        a.custEvent.add(f, "show", function () {
            setTimeout(function () {
                a.addEvent(document.body, "click", k)
            }, 0)
        });
        a.custEvent.add(f, "hide", function () {
            j = !1;
            a.removeEvent(document.body, "click", k)
        });
        d = f;
        d.setPosition = function (a) {
            g.style.top = a.t + "px";
            g.style.left = a.l + "px";
            return d
        };
        d.setAlignPos = function (b, c, d) {
            d = a.parseParam({offset: {left: 0, top: 0}, arrowOffset: 0, align: "left", fail: a.funcEmpty}, d);
            if (!!a.isNode(b) && !!a.isNode(c)) {
                var e = b, h;
                while (e !== document.body) {
                    e = e.parentNode;
                    h = a.getStyle(e, "position");
                    if (h === "absolute")break
                }
                e.appendChild(g);
                h = a.position(e);
                h || (h = {l: 0, t: 0});
                var i = a.core.dom.getSize, j = a.position(c), k = a.position(b), l = i(b), m = 6, n = 14, o, p, q, r = d.offset, s = d.arrowOffset, t = i(g), u = i(c), v = 2;
                if (d.align === "left") {
                    if (t.width < k.l - j.l + Math.ceil(l.width / 2)) {
                        d.fail();
                        return
                    }
                } else if (j.l + u.width - k.l - Math.ceil(l.width / 2) > t.width) {
                    d.fail();
                    return
                }
                d.align === "left" ? o = j.l - v : o = j.l + u.width - t.width + v;
                p = k.t + l.height + m;
                q = k.l + Math.ceil((l.width - n) / 2) - o;
                p -= h.t;
                o -= h.l;
                p += r.top;
                o += r.left;
                q += s;
                g.style.left = o + "px";
                g.style.top = p + "px";
                if (f.getDomListByKey("arrow")) {
                    arrow = f.getDom("arrow");
                    arrow.style.left = q + "px"
                }
            }
        };
        d.setLayout = function (b, c) {
            if (!a.isNode(b))throw"ui.mod.bubble.setDown need element as first parameter";
            if (f.getDomListByKey("arrow")) {
                arrow = f.getDom("arrow");
                arrow.style.cssText = ""
            }
            a.kit.dom.layoutPos(g, b, c);
            return d
        };
        d.setContent = function (b) {
            typeof b == "string" ? h.innerHTML = b : a.isNode(b) && h.appendChild(b);
            return d
        };
        d.setArrow = function (a) {
            var b;
            if (f.getDomListByKey("arrow")) {
                b = f.getDom("arrow");
                a.className && (b.className = a.className || "");
                a.style && (b.style.cssText = a.style || "")
            }
        };
        d.clearContent = function () {
            while (h.children.length)a.removeNode(h.children[0])
        };
        d.stopBoxClose = function () {
            j = !0
        };
        d.startBoxClose = function () {
            j = !1
        };
        d.destroy = function () {
            a.removeEvent(document.body, "click", k);
            f = null;
            g = null;
            h = null;
            i = null
        };
        return d
    }
});
STK.register("ui.bubble", function (a) {
    var b = ['<div class="W_layer" node-type="outer">', '<div class="bg">', '<table cellspacing="0" cellpadding="0" border="0">', '<tbody><tr><td><div class="content" node-type="layoutContent">', '<a class="W_close" href="javascript:void(0);" node-type="close" title="关闭"></a>', '<div node-type="inner"></div>', "</div></td></tr></tbody>", "</table>", '<div class="arrow arrow_t" node-type="arrow"></div>', "</div>", "</div>"].join(""), c = [];
    return function (d) {
        var e = a.parseParam({template: b, isHold: !1}, d), f = {get: function () {
            return e.isHold ? a.ui.mod.bubble(e.template, e) : f.checkBob()
        }, checkBob: function () {
            var a;
            for (var b = 0, d = c.length; b < d; b++)if (!c[b].used) {
                a = c[b].bub;
                continue
            }
            a || (a = f.create());
            return a
        }, refresh: function (a, b) {
            for (var d = 0, e = c.length; d < e; d++)if (a === c[d].bub) {
                c[d].used = b;
                return
            }
        }, cevt: function (b) {
            a.custEvent.add(b, "hide", function () {
                f.refresh(b, !1);
                b.clearContent()
            });
            a.custEvent.add(b, "show", function () {
                f.refresh(b, !0)
            })
        }, create: function () {
            var b = a.ui.mod.bubble(e.template, e);
            c.push({bub: b, used: !0});
            f.cevt(b);
            return b
        }};
        return f.get()
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
STK.register("ui.mod.mask", function (a) {
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
    var b = a.core.util.swf, c = a.ui.mod.mask, d, e, f, g, h, i, j, k = (new Date).getTime() + "", l = (Math.random() + "").replace(".", ""), m = "STK_flash_" + k + l, n = function (b) {
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
        r = a.ui.mod.layer(e);
        s = {};
        var b = r.getDomList();
        for (var c in b)s[c] = b[c][0];
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
        } else t.setLayout(b, {offsetX: -29, offsetY: 5});
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
STK.register("common.content.message.upload.start", function (a) {
    var b = a.kit.extra.language;
    return function (b, c, d) {
        var e = c, c = a.core.str.bLength(c) > 20 ? a.core.str.leftB(c, 20) + "..." : c;
        a.log("[common.content.message.upload.start]: swf", a.sizzle("[swfid=" + b + "]"), d);
        var f = '<li node-type="li_' + d + '"><p class="W_loading"><span>' + c + '&nbsp;&nbsp;上传中... <a href="javascript:void(0);" token="' + d + '" node-type="cancelUpload" action-type="cancelUpload" action-data="swfId=' + b + '">取消上传</a></span></p></li>', g = a.sizzle("[swfid=" + b + "]")[0];
        g.style.display = "block";
        g.innerHTML += f
    }
});
STK.register("common.channel.flashUpImg", function (a) {
    var b = ["initFun", "changeFlashHeightFun", "uploadCompleteFun", "closePhotoEditorFun", "cannelUpload", "completeUpload"];
    return a.common.listener.define("common.channel.flashUpImg", b)
});
STK.register("common.content.message.upload.complete", function (a) {
    return function (b, c, d, e) {
        var f, g, h, i = a.common.content.message.upload.getExt(d), j = d, d = a.core.str.bLength(d) > 20 ? a.core.str.leftB(d, 20) + "..." : d;
        if (typeof e == "object") {
            f = e;
            g = STK.core.json.jsonToQuery(f)
        } else if (typeof e == "string") {
            g = e;
            f = STK.core.json.strToJson(e)
        }
        e.thumbnail ? h = '<img src="' + e.thumbnail + '" class="img" alt="图片" title="' + j + '">' + d + '<span class="func"><a class="S_link2 del" href="javascript:void(0)" node-type="deleteFile" action-type="deleteFile" action-data="swfId=' + b + "&" + g + '">删除</a></span>' : h = '<i><img src="' + $CONFIG.imgPath + "style/images/accessory/" + i + '.png" class="doc" alt="附件文件" title="' + j + '"></i>' + d + '<span class="func"><a class="S_link2 del" href="javascript:void(0)" node-type="deleteFile" action-type="deleteFile" action-data="swfId=' + b + "&" + g + '">删除</a></span>';
        var k = a.sizzle('li[node-type="li_' + c + '"]')[0];
        k.innerHTML = h;
        var l = k.parentNode.getAttribute("fid") || "";
        k.parentNode.setAttribute("fid", l + f.fid + ",");
        a.common.channel.flashUpImg.fire("completeUpload")
    }
});
STK.register("common.content.message.upload.showMsg", function (a) {
    return function (a) {
        STK.ui.alert(a)
    }
});
STK.register("kit.dom.dir", function (a) {
    return function (b, c) {
        c = a.parseParam({dir: "parentNode", expr: undefined, endpoint: document, maxLength: 1}, c);
        var d = c.dir, e = c.expr, f = c.endpoint, g = c.maxLength;
        if (!b || !e)a.log("kit dir: node or opts.expr is undefined."); else {
            var h = [], i = b[d];
            while (i) {
                if (i.nodeType == 1 && a.sizzle(e, null, null, [i]).length > 0) {
                    h.push(i);
                    if (h.length == g)break
                }
                if (i == f)break;
                i = i[d]
            }
            return h
        }
    }
});
STK.register("kit.dom.parents", function (a) {
    return function (b, c) {
        c = a.parseParam({expr: undefined, endpoint: document, maxLength: 1}, c);
        var d = c.expr;
        if (!b || !d)a.log("kit parents: node or opts.expr is undefined."); else return a.kit.dom.dir(b, c)
    }
});
STK.register("common.content.message.upload.deleteItem", function (a) {
    return function (b, c, d) {
        var e;
        e = b;
        if (b.tagName != "LI")var f = a.kit.dom.parents(b, {expr: "li"}), e = f[0];
        var g = e.parentNode;
        a.removeNode(e);
        if (g.tagName == "UL") {
            a.sizzle("li", g).length == 0 && (g.style.display = "none");
            if (c == "delete") {
                var h = d.fid, i = g.getAttribute("fid"), j = i.replace(h + ",", "");
                g.setAttribute("fid", j)
            }
        }
    }
});
STK.register("kit.extra.runFlashMethod", function (a) {
    return function (a, b, c) {
        var d, e, f, g = function () {
            if (a[b]) {
                e = !0;
                clearTimeout(d);
                try {
                    a.TotalFrames()
                } catch (h) {
                    a.TotalFrames
                }
                c()
            } else f = setTimeout(g, 100)
        };
        g();
        d = setTimeout(function () {
            e || clearTimeout(f)
        }, 1e4);
        return{destroy: function () {
            clearTimeout(d);
            clearTimeout(f)
        }}
    }
});
STK.register("common.content.message.upload.getFlash", function (a) {
    return function (b) {
        return a.sizzle('[flashobj="' + b + '"]')[0]
    }
});
STK.register("common.content.message.upload.cancel", function (a) {
    return function (b, c) {
        a.log("cancelUpload", b, c);
        var d = a.sizzle('li[node-type="li_' + c + '"]')[0];
        a.common.content.message.upload.deleteItem(d, "cancel");
        a.common.channel.flashUpImg.fire("cannelUpload");
        var e = a.common.content.message.upload.getFlash(b);
        a.kit.extra.runFlashMethod(e, "cancelUpload", function () {
            try {
                e.cancelUpload(c)
            } catch (a) {
            }
        })
    }
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
STK.register("module.getLang", function (a) {
    return function (a, b) {
        return $CONFIG.lang
    }
});
STK.register("common.content.message.upload.loadSwf", function (a) {
    return function (b, c) {
        var d = parseInt(Math.random() * 1e4, 10), e = {width: "110", height: "16", paras: {allowScriptAccess: "always", wmode: "transparent"}, flashvars: {space: "17", maxNum: 10, width: "18", height: "15", swfid: d, maxSize: 52428800, iExt: "*.jpg; *.gif; *.jpeg; *.png", fExt: "", domain: "http://" + document.domain}}, f = c && c.flashvars;
        if (f)for (var g in f)e.flashvars[g] = f[g];
        a.log("parrentDom", b, STK.sizzle('[node-type="uploadSwf"]', b));
        var h = function () {
            a.kit.extra.installFlash()
        };
        if (a.kit.extra.getFlashVersion() >= 10) {
            var i = STK.core.util.swf.create(STK.sizzle('[node-type="uploadSwf"]', b)[0], $CONFIG.jsPath + "home/static/swf/upload.swf?ver=" + $CONFIG.version, e);
            i.setAttribute("flashObj", d);
            i.flashObj = d;
            a.sizzle('[node-type="uploadList"]', b)[0].setAttribute("swfid", d)
        } else {
            var j = STK.sizzle('[node-type="uploadSwf"]', b)[0];
            j.style.cssText = "background:#000;filter:alpha(opacity=0)9;opacity:0;width:110px;";
            a.addEvent(j, "click", h)
        }
        return d
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
STK.register("common.content.message.upload.delegateEvt", function (a) {
    var b = a.kit.extra.language;
    return function (b) {
        var b = b, c = {}, d = function (b) {
            a.log("cancelUpload", b);
            var c = b.el, d = b.data, e = c.getAttribute("token"), f = d.swfId;
            a.common.content.message.upload.deleteItem(c, "cancel", d);
            var g = a.common.content.message.upload.getFlash(f);
            a.kit.extra.runFlashMethod(g, "cancelUpload", function () {
                try {
                    g.cancelUpload(e)
                } catch (a) {
                }
            });
            a.common.channel.flashUpImg.fire("cannelUpload");
            return!1
        }, e = function (b) {
            var c = b.el, d = b.data, e = d.swfId;
            a.log(e);
            a.common.content.message.upload.deleteItem(c, "delete", d);
            if (d.size) {
                var f = a.common.content.message.upload.getFlash(e);
                a.kit.extra.runFlashMethod(f, "afterDelete", function () {
                    f.afterDelete(d.size)
                })
            }
            return!1
        }, f = function () {
            var c = a.kit.dom.parseDOM(a.core.dom.builder(b.parentNode).list);
            c.uploadList.setAttribute("fid", "");
            c.uploadList.innerHTML = "";
            c.uploadList.style.display = "none"
        }, g = a.core.evt.delegatedEvent(b);
        g.add("cancelUpload", "click", d);
        g.add("deleteFile", "click", e);
        c.reset = f;
        return c
    }
});
STK.register("common.dialog.sendMessageMain", function (a) {
    var b = a.kit.extra.language, c, d = b("#L{请输入对方昵称}"), e = [d], f = function (a, c) {
        c == "normal" ? a.innerHTML = b("#L{发送}") : a.innerHTML = b("#L{提交中...}")
    };
    return function (g) {
        var h = {};
        g = g || {};
        var i, j, k, l, m = 0, n = !1, o = !1, p = !1, q = g.touid || 0, r = g.style_id || 1, s = a.common.dialog.validateCode();
        a.log("common.dialog.sendMessage data=", g);
        var t;
        if (g && g.mid) {
            t = "forward";
            a.log("initialize message layer", g);
            var u = g.mid, v = g.is_send
        }
        var w = t == "forward" ? b("#L{转发私信}") : b("#L{发私信}"), x, y = {enableSubmit: function () {
            B.DOM.submit.isSending = !1;
            B.DOM.submit.className = "W_btn_d btn_noloading";
            f(B.DOM.btnText, "normal")
        }, disableSubmit: function () {
            B.DOM.submit.isSending = !0;
            B.DOM.submit.className = "W_btn_a_disable";
            f(B.DOM.btnText, "loading")
        }, isSending: function () {
            return B.DOM.submit.isSending
        }}, z = function () {
            c && y.enableSubmit()
        }, A = function () {
            if (c) {
                var b = B.DOM.uploadList.getAttribute("swfid"), d = a.common.content.message.upload.getFlash(b), e = 1;
                if (d && d.getUploadStatus)try {
                    e = d.getUploadStatus()
                } catch (f) {
                    e = d.getUploadStatus
                } else e = 0;
                e == 0 && window.setTimeout(function () {
                    var b = B.DOM.uploadList.getAttribute("fid") || "";
                    b.length != 0 && (b = b.substring(0, b.length - 1));
                    c.fids = b;
                    c = a.common.getDiss(c, B.DOM.submit);
                    B.createTrans.request(c)
                }, 0)
            }
        }, B = {DOM: {}, objs: {}, isShowed: !1, DOM_eventFun: {submitsendMessage: function (b) {
            if (!y.isSending()) {
                if (!n) {
                    a.common.extra.shine(i.nodeList.textEl);
                    return
                }
                if (a.trim(B.DOM.screen_name.value) == d || a.trim(B.DOM.screen_name.value).length == 0) {
                    a.ui.alert(d);
                    return
                }
                a.log("common.dialog.sendMessage send Message");
                var e = B.DOM.uploadList.getAttribute("fid") || "";
                e.length != 0 && (e = e.substring(0, e.length - 1));
                var f = {text: i.API.getWords(), screen_name: B.DOM.screen_name.value, id: m, fids: e, touid: q, style_id: r};
                y.disableSubmit();
                try {
                    B.DOM.textEl.blur()
                } catch (g) {
                }
                c = f;
                A();
                a.preventDefault();
                o = !0
            }
        }, attachDel: function () {
            a.log("common.dialog.sendMessage attach del")
        }, initLayer: function () {
            B.dialogDom.innerHTML = "";
            B.dialogDom.appendChild(B.getDialogHTMLOfsendMessage(g));
            i = a.common.editor.base(B.dialogDom, {limitNum: 300});
            i.widget(a.common.editor.widget.face(), "smileyBtn");
            t == "forward" && a.common.trans.message.getTrans("getDetail", {onSuccess: function (b) {
                i.API.insertText(b.data.content);
                m = b.data.status_id;
                var c = 0, d = 0;
                for (var e = 0, f = b.data.fids.length; e < f; e++)try {
                    a.common.content.message.upload.addItem(B.DOM.uploadList, b.data.fids[e].file_name, b.data.fids[e]);
                    c += b.data.fids[e].size * 1;
                    d += 1
                } catch (g) {
                }
                a.log("We had " + d + " files and total file size is ", c);
                var h = B.DOM.uploadList.getAttribute("swfid"), j = a.common.content.message.upload.getFlash(h);
                x = a.kit.extra.runFlashMethod(j, "setInitSize", function () {
                    j.setInitSize(d, c)
                });
                a.log("setInitSize Done")
            }, onError: function (b) {
                a.ui.alert(b.msg)
            }}).request({mid: u, is_send: v});
            k = new a.common.bubble.myFollowSuggest({type: 1, textNode: B.DOM.screen_name, list_template: "", callback: function () {
            }});
            k.show();
            var b = a.kit.dom.smartInput(B.DOM.screen_name, {notice: d});
            a.addEvent(B.DOM.textEl, "focus", function () {
                j = setInterval(function () {
                    B.custFuns.publishBtn()
                }, 200)
            });
            a.addEvent(B.DOM.textEl, "blur", function () {
                clearInterval(j)
            });
            setTimeout(function () {
                a.common.content.message.upload.delegateEvt(B.DOM.uploadList)
            }, 100)
        }}, ioEvent: {createSuccess: function (d) {
            a.log("common.dialog.sendMessage createSuccess");
            c = null;
            y.enableSubmit();
            B.actHide();
            a.ui.litePrompt(b("#L{恭喜，私信发送成功啦。}"), {type: "succM", timeout: "500", hideCallback: function () {
                a.common.channel.message.fire("create", d.data)
            }})
        }, createError: function (b) {
            c = null;
            a.log("common.dialog.sendMessage createError");
            y.enableSubmit();
            a.common.layer.ioError(b.code, b)
        }, createFail: function () {
            a.log("common.dialog.sendMessage createFail");
            c = null;
            y.enableSubmit()
        }}, custFuns: {publishBtn: function () {
            var a = i.API.getWords(), b = i.API.count(a), c = b <= 300 && b > 0 ? !0 : !1;
            !c || a.length === 0 ? n = !1 : n = !0
        }, filterWords: function () {
            var a = i.API.getWords();
            for (var b = 0, c = e.length; b < c; b++)var d = a.replace(new RegExp(e[b], "g"), "");
            return d
        }, checkContent: function () {
            return B.DOM.uploadList.getAttribute("fid").length != 0 ? !0 : !1
        }}, show: function () {
            var b = arguments.callee;
            if (B.isShowed !== !0) {
                b.toDispatchDefaultAct = !0;
                a.custEvent.fire(h, "showBefore");
                if (b.toDispatchDefaultAct) {
                    a.log("common.dialog.sendMessage => actShow()");
                    B.actShow()
                }
                a.custEvent.fire(h, "show")
            }
        }, hide: function () {
            var b = arguments.callee;
            if (B.isShowed === !0) {
                b.toDispatchDefaultAct = !0;
                a.custEvent.fire(h, "hideBefore");
                if (b.toDispatchDefaultAct) {
                    a.log("common.dialog.sendMessage => actHide()");
                    B.actHide()
                }
                a.custEvent.fire(h, "hide")
            }
        }, actShow: function () {
            if (g && g.allowForward && g.allowForward == 0)a.ui.alert(b("#L{不能转发此条私信。}")); else {
                B.objs.dialog = a.ui.dialog();
                B.objs.dialog.setTitle(b("#L{" + w + "}"));
                B.objs.dialog.appendChild(B.dialogDom);
                B.objs.dialog.show();
                B.DOM_eventFun.initLayer();
                B.loadSwf();
                B.objs.dialog.setMiddle();
                i.API.focus();
                B.objs.dialog.setBeforeHideFn(function () {
                    p = !0;
                    if (B.custFuns.checkContent() && o != !0) {
                        a.ui.confirm(b("#L{你的私信尚未发送，确定要丢弃该条私信吗}?"), {OK: function () {
                            B.objs.dialog.hide(!0);
                            p = !1;
                            B.objs.dialog.clearBeforeHideFn()
                        }, cancel: function () {
                            return!0
                        }});
                        return!1
                    }
                    B.DOM.screen_name.blur();
                    B.DOM.textEl.blur();
                    B.DOM.submit.focus();
                    k.hide();
                    k.destroy();
                    return!0
                })
            }
        }, actHide: function () {
            B.objs.dialog.hide()
        }, reset: function () {
            B.DOM.screen_name.value = d;
            i.API.reset()
        }, loadSwf: function () {
            a.common.content.message.upload.loadSwf(B.DOM.uploadTd, {flashvars: {space: "17", width: "18", height: "15"}})
        }, getDialogHTMLOfsendMessage: function (c) {
            var e, f, g = c && c.userName ? c.userName : d;
            if (c && c.uid) {
                if (!c.userName)throw new Error("未得到收信人昵称。Cannot retrieve nickname.");
                e = c.userName + '<input type="hidden" name="' + g + '" value="' + c.uid + '" />'
            } else e = '<input type="text" name="' + g + '" />';
            c && (f = c.content || "");
            var h = '<div class="W_private_letter" node-type="outer"><table class="form_private">  <tbody><tr>    <th>#L{发&nbsp;&nbsp;给：}</th>    <td><input node-type="screen_name" type="text" value="' + g + '" class="text"></td>' + "  </tr>" + "  <tr>" + "    <th>#L{内&nbsp;&nbsp;容：}</th>" + '    <td node-type="uploadTd">' + '<p class="num" node-type="num">#L{还可以输入%s字}</p>' + '<textarea class="W_no_outline" name="" node-type="textEl">' + f + '</textarea><div node-type="successTip" style="display: none;" class="send_succpic"></div>' + '      <div class="kind fl" node-type="widget">' + '<a node-type="smileyBtn" onclick="return false;" href="javascript:void(0);" title="表情" class="W_ico16 ico_faces"></a>' + '<a node-type="picBtn" onclick="return false;" href="javascript:void(0);" title="图片" class="W_ico16 icon_sw_img"></a>' + '<a node-type="attachBtn" onclick="return false;" href="#" title="文件" class="W_ico16 icon_sw_accessory"></a>' + '<div id="uploadSwf" node-type="uploadSwf" class="flash" style="background:#000;filter:alpha(opacity=0)9;opacity:0;"></div></div>' + '      <div class="btn_s fr"><a class="W_btn_b btn_noloading" href="javascript:void(0);" diss-data="module=msglayout" node-type="submit" action-type="submit"><span><b class="loading"></b><em node-type="btnText">#L{发送}</em></span></a></div>' + '      <ul class="p_sendlist" node-type="uploadList" style="display:none" fid=""></ul>' + "    </td>" + "  </tr>" + "</tbody></table>" + "</div>", i = a.builder(b(h, "<span>300</span>"));
            B.DOM = a.kit.dom.parseDOM(i.list);
            return i.box
        }}, C = function () {
            D();
            E();
            F();
            G();
            H();
            I()
        }, D = function () {
        }, E = function () {
        }, F = function () {
            B.dialogDom = a.C("div");
            B.DEvent = a.core.evt.delegatedEvent(B.dialogDom);
            B.createTrans = a.common.trans.message.getTrans("create", {onComplete: function (a, b) {
                var c = {onSuccess: B.ioEvent.createSuccess, onError: B.ioEvent.createError, requestAjax: B.createTrans, param: b, onRelease: function () {
                    y.enableSubmit()
                }};
                s.validateIntercept(a, b, c)
            }, onFail: B.ioEvent.createFail})
        }, G = function () {
            B.DEvent.add("submit", "click", B.DOM_eventFun.submitsendMessage);
            B.DEvent.add("attachDel", "click", B.DOM_eventFun.attachDel);
            B.DEvent.add("attachCancel", "click", B.DOM_eventFun.attachCancel);
            a.core.evt.hotKey.add(B.dialogDom, ["ctrl+enter"], B.DOM_eventFun.submitsendMessage)
        }, H = function () {
            a.custEvent.define(h, "showBefore");
            a.custEvent.define(h, "show");
            a.custEvent.define(h, "hideBefore");
            a.custEvent.define(h, "hide")
        }, I = function () {
            a.common.channel.flashUpImg.register("completeUpload", A);
            a.common.channel.flashUpImg.register("cannelUpload", z)
        }, J = function () {
            c = null;
            if (B.objs.dialog) {
                B.objs.dialog.hide();
                B.objs.dialog.clearBeforeHideFn()
            }
            B.DOM.dialog = null;
            x && x.destroy && x.destroy()
        };
        C();
        h.destroy = J;
        h.show = function () {
            B.show.apply(B, arguments)
        };
        h.hide = function () {
            B.hide()
        };
        return h
    }
});
STK.register("common.dialog.sendMessage", function (a) {
    return function (b) {
        var c = {}, d, e = function () {
            d = a.common.dialog.sendMessageMain(b);
            d.show()
        };
        c.show = function () {
            a.preventDefault();
            e()
        };
        c.hide = function () {
            d && d.hide()
        };
        c.destroy = function () {
            d && d.destroy()
        };
        c.originShow = e;
        return c
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
STK.register("common.plugin.weiboDesktop", function (a) {
    return function () {
        var b = $CONFIG.uid, c = {pluginName: "npWeiboDesktopAssist Plugin", activeXName: "WeiboDesktopAssist.WBDesktopAssistCom.1"}, d = {embedId: "WeiboDesktopAssistCom", embedType: "application/x-weibodesktopassist-sina"}, e = {param: "oninvokebymessageevent"}, f = null, g = {}, h = a.common.plugin.plugInstallState(c, d, e, f);
        g.getInstance = function () {
            f = h.instance;
            return f
        };
        g.isInstalled = function () {
            var a = h.getInstallState();
            return a === "installed" || a === "ieinstalled" ? !0 : !1
        };
        g.invokeDesk = function (a, c) {
            f.oninvokebymessageevent = function (b) {
                b == 0 && c(a)
            };
            f.InvokeDesktop(b, a.uid)
        };
        return g
    }
});
STK.register("comp.content.webim", function (a) {
    var b = window, c = 3e3;
    return function () {
        if (!(a.E("wbim_box") || navigator.platform.indexOf("iPad") !== -1 || b.$CONFIG && b.$CONFIG.pageid === "content_sorry")) {
            var d = !1;
            window.__PubSub__ = window.__PubSub__ || a.common.top.IMpubSub();
            window.__PubSub__ && window.__PubSub__.subscribe("webim.connected", function () {
                d = !0
            });
            var e = function (b) {
                if (a.webim && a.webim.ui && a.webim.ui.uiEvent && a.webim.ui.uiEvent.fire && d && $CONFIG.$webim) {
                    window.setTimeout(function () {
                        a.webim.ui.uiEvent.fire("ui.user.click", {uid: b.uid})
                    }, 0);
                    return!1
                }
                try {
                    var c = a.common.dialog.sendMessage({uid: b.uid, userName: b.nick || ""});
                    c.originShow()
                } catch (e) {
                }
            }, f = a.delegatedEvent(document);
            f.add("webim.conversation", "click", function (b) {
                var c = b.el, d = b.data, f = d.uid, g = a.common.plugin.weiboDesktop();
                if (g.isInstalled() && g.getInstance() != null)try {
                    g.invokeDesk(d, e)
                } catch (h) {
                    e(d)
                } else e(d)
            });
            if (b.$CONFIG && (b.$CONFIG.$webim == 1 || b.$CONFIG.$webim == !0)) {
                var g = window.$CONFIG.version;
                setTimeout(function () {
                    a.core.io.scriptLoader({url: "http://js.t.sinajs.cn/t5/webim/js/loader.js?v=" + g, onComplete: function () {
                        $WBIM.loadWebIM({source: "home"})
                    }})
                }, c)
            }
        }
    }
});
STK.register("kit.extra.require", function (a) {
    var b = window.$CONFIG || {}, c = "loaded", d = "waiting", e = "loading", f = {}, g = {}, h = [], i = [], j = !1, k = {maxLine: 4, maxRetryTimes: 1, baseURL: b.jsPath, version: b.version, timeout: 3e4, urlRule: null}, l = function (a) {
        var b = {}, c;
        for (var d = a.length; d--;) {
            c = a[d];
            if (b[c])return!1;
            b[c] = 1
        }
        return!0
    }, m = function (a) {
        var b = /^http[s]?:\/\//ig;
        return b.test(a)
    }, n = function (b) {
        var c = a.core.arr.indexOf(b, i);
        return c !== -1 ? i.splice(c, 1) : !1
    }, o = function (a) {
        if (typeof k.urlRule == "function")return k.urlRule(k.baseURL, a, k.version);
        a = a.replace(/\./ig, "/");
        return k.baseURL + "home/js/" + a + ".js?version=" + k.version
    }, p = function (b) {
        i.push(b);
        g[b].state = e;
        var h = function () {
            var a = g[b].depeKeys, d, e, h;
            n(b);
            g[b].state = c;
            j && s();
            for (var i = a.length; i--;) {
                e = a[i];
                d = f[e];
                d.unReadyNum -= 1;
                if (d.unReadyNum)return;
                while (f[e].bindFuns.length) {
                    h = d.bindFuns.shift();
                    h.func.apply({}, [].concat(h.data))
                }
            }
        }, l = function () {
            var a = g[b], c, e, h, i;
            n(b);
            a.state = d;
            if (a.retry < k.maxRetryTimes) {
                a.retry += 1;
                return p(b)
            }
            j && s();
            e = a.depeKeys;
            for (var l = e.length; l--;) {
                h = e[l];
                c = f[h];
                while (c.timeoutFuns.length) {
                    i = c.timeoutFuns.shift();
                    i.call({}, h)
                }
            }
        };
        a.core.io.scriptLoader({url: m(b) ? b : o(b), timeout: k.timeout, onComplete: h, onTimeout: l})
    }, q = function (b, c, e, h) {
        var i = f[b];
        i || a.log("[STK.kit.extra.require]: The depend " + b + " is undefined!");
        if (!i.unReadyNum) {
            a.log("依赖关系已加载完成：" + b);
            return c.apply({}, [].concat(e))
        }
        i.bindFuns.push({func: c, data: e});
        h && typeof h.onTimeout == "function" && i.timeoutFuns.push(h.onTimeout);
        for (var j = i.urlList.length; j--;) {
            var k = i.urlList[j];
            if (g[k].state === d) {
                g[k].retry = 0;
                p(k)
            }
        }
    }, r = function (b, e, i) {
        (function () {
            if (a.requirePathMapping) {
                var b = [];
                for (var c = 0, d = e.length; c < d; c++)if (a.requirePathMapping[e[c]]) {
                    var f = e[c].split(".");
                    f[f.length - 1] = f[f.length - 1] + "_" + a.requirePathMapping[e[c]];
                    e[c] = f.join(".");
                    f = null
                }
            }
        })();
        f[b] !== undefined && a.log("[STK.kit.extra.require]: " + b + " has been registered!");
        l(e) || a.log("[STK.kit.extra.require]: The depend URLs is not unique! The depes is [" + e + "]");
        var j, k = 0;
        i = a.parseParam({activeLoad: !1}, i || {});
        for (var m = e.length; m--;) {
            j = e[m];
            if (!g[j]) {
                g[j] = {depeKeys: [b], state: d, retry: 0};
                i.activeLoad && h.push(j)
            } else {
                g[j].depeKeys.push(b);
                g[j].state === c && (k += 1)
            }
        }
        f[b] = {urlList: e, bindFuns: [], timeoutFuns: [], unReadyNum: e.length - k};
        return f[b]
    }, s = function () {
        if (!h.length)j = !1; else {
            j = !0;
            var a = k.maxLine - 1 - i.length, b;
            while (a > 0 && h.length) {
                b = h.shift();
                if (g[b].state === d) {
                    p(b);
                    a -= 1
                }
            }
        }
    }, t = function (b) {
        k = a.core.json.merge(k, b)
    }, u = function (a, b, c) {
        if (typeof b != "function")throw'[STK.kit.extra.require]: The "func" musts be a Function!';
        return function (d) {
            q(a, b, [].slice.call(arguments), c)
        }
    };
    q.bind = u;
    q.config = t;
    q.register = r;
    q.activeLoad = s;
    return q
});
STK.register("comp.content.wbad", function (a) {
    return function () {
        var b = a.sizzle("[ad-data]", document.body);
        if (b.length != 0) {
            var c = function () {
                window.WBAD = {uid: $CONFIG.uid || scope.$uid};
                for (var c = 0, d = b.length; c < d; c++) {
                    var e = b[c], f = a.delegatedEvent(e);
                    f.add("followBtn", "click", function (b) {
                        a.preventDefault();
                        var c = b.el, d = b.data;
                        d.onSuccessCb = function (b) {
                            var d = a.sizzle("a", c.parentNode);
                            for (var e = 0, f = d.length; e < f; e++) {
                                var g = d[e];
                                g.style.display = g == c ? "none" : ""
                            }
                            a.common.dialog.setGroup().show({uid: b.uid, fnick: b.fnick, groupList: b.group, hasRemark: !0})
                        };
                        a.common.relation.followPrototype.follow(d)
                    });
                    f.add("hover", "mouseover", function (a) {
                        var b = a.el, c = a.data.onOverCls;
                        b.className = c
                    });
                    f.add("hover", "mouseout", function (a) {
                        var b = a.el, c = a.data.onOutCls;
                        b.className = c
                    })
                }
            };
            c();
            var d = !1, e = document, f = e.createElement("script"), g = e.getElementsByTagName("script")[0];
            f.type = "text/javascript";
            f.charset = "utf-8";
            f.async = !0;
            f.src = ("https:" == e.location.protocol ? "https://" : "http://") + "js.t.sinajs.cn/t4/apps/publicity/static/wbad.js?version=" + $CONFIG.version;
            g.parentNode.insertBefore(f, g)
        }
    }
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
STK.register("common.trans.attitude", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("feedSmall", {url: "/aj/attitude/small?_wv=5", method: "get"});
    c("add", {url: "/aj/attitude/add?_wv=5", method: "post"});
    c("big", {url: "/aj/attitude/big?_wv=5", method: "get"});
    c("in", {url: "/aj/attitude/in?_wv=5", method: "get"});
    c("del", {url: "/aj/attitude/destroy?_wv=5", method: "get"});
    c("miniadd", {url: "/aj/like/add?_wv=5", method: "post"});
    c("minismall", {url: "/aj/like/small?_wv=5", method: "get"});
    c("likein", {url: "/aj/like/in?_wv=5", method: "get"});
    c("likebig", {url: "/aj/like/big?_wv=5", method: "get"});
    c("minidel", {url: "/aj/like/del?_wv=5", method: "post"});
    c("objLike", {url: "/aj/like/objectlike?_wv=5", method: "post"});
    return b
});
STK.register("common.layer.baseCard", function (a) {
    var b = 3e5, c = 500, d, e = '<div style="width:360px;padding-top:15px;padding-bottom:15px;text-align:center"><span>#{msg}</span></div>';
    return function (f, g) {
        var h = {}, i = a.kit.extra.language, j = a.templet, k = [], l = [], m = a.parseParam({order: "t,b,l,r", zIndex: 9999, type: 0, variety: "userCard", arrowPos: "auto", alignNode: "", setAlignPos: !1, callBack: a.core.func.empty, trans: a.common.trans.relation, loadTemp: i('<div class="W_loading" style="width:360px;padding-top:15px;padding-bottom:15px;text-align:center"><span>#L{正在加载，请稍候}...</span></div>')}, g || {}), n = m.channel || a.common.channel.relation, o = m.trans.getTrans(m.variety, {onComplete: function (a, b) {
            if (a.code == "100000") {
                var c = b.id || b.name;
                p.setCache(c, a.data);
                d.setContent(a.data);
                d.reposition()
            } else {
                if (!a || !a.msg || typeof a.msg != "string")a = {msg: i("#L{加载失败}")};
                d.setContent(j(e, a));
                d.reposition()
            }
            m.callback()
        }}), p = {data: [], getCache: function (a) {
            var c = this.data[a], d = "";
            if (c) {
                var e = new Date;
                e - c.date < b ? d = c.html : delete this.data[a]
            }
            return d
        }, setCache: function (a, b) {
            this.data[a] = {date: new Date, html: b}
        }, rmCache: function (a) {
            delete this.data[a]
        }}, q = function (b, e, f) {
            d.stopHide();
            f = a.fixEvent(f);
            d.showTimer = setTimeout(function () {
                var c = a.queryToJson(e), g = c.id || c.name, h = p.getCache(g);
                d.showCard({content: h || m.loadTemp, node: b, order: m.order, arrowPos: m.arrowPos, zIndex: m.zIndex, event: f, alignNode: c.alignNode});
                h || o.request(a.kit.extra.merge({type: m.type}, c))
            }, c)
        }, r = function (a, b, c) {
            d.stopShow();
            d.hideCard()
        }, s = function (b) {
            var c = b.el, e = b.data, f = e.status, g = parseInt(e.count) || 0, h = a.core.json.merge(e, {});
            h.location = h.location || $CONFIG.location || "";
            h.type = f == 0 ? 0 : 1;
            a.common.trans.attitude.request("miniadd", {onSuccess: function (b) {
                var h = e.mid || e.name, j = b.data.is_del ? !0 : !1, k = "W_ico20 icon_praised_b" + (j ? "" : "c");
                j ? g > 0 && g-- : g++;
                c.innerHTML = '<em class="' + k + '"></em>(' + g + ")";
                c.title = f ? i("#L{取消赞}") : i("#L{赞}");
                var l = a.kit.extra.actionData(c);
                l.set("count", g);
                var m = d.getContent();
                p.setCache(h, m)
            }, onError: function (b) {
                a.ui.alert(b.msg)
            }}, h)
        }, t = function () {
            if (!d) {
                d = a.ui.popCard();
                d.dEvent.add("like", "click", s)
            }
            v()
        }, u = function (a, b) {
            k[a] = b;
            d.dEvent.add(a, "click", b)
        }, v = function () {
            if (!a.core.dom.isNode(f))throw"[STK.common.layer.baseCard]: node is not a Node!"
        }, w = function (a, b) {
            l[a] = b;
            n.register(a, b)
        }, x = function () {
            for (var a in k)d.dEvent.remove(a, k[a]);
            for (var b in k)d.dEvent.remove(b, k[b]);
            p.data.length = 0;
            p = null
        };
        t();
        h.bindDEvent = u;
        h.destroy = x;
        h.baseCard = d;
        h.hideCard = r;
        h.showCard = q;
        return h
    }
});
STK.register("common.layer.smartSortCard", function (a) {
    return function (b, c) {
        var d = a.common.layer.baseCard(b, a.parseParam(c, {variety: "smart_sort"}));
        return d
    }
});
STK.register("comp.content.smartSortCard", function (a) {
    return function (b, c) {
        var d = {}, e, f = function (b, d, f) {
            e || (e = a.common.layer.smartSortCard(b, c));
            e.showCard(b, d, f)
        }, g = function (b, d, f) {
            e || (e = a.common.layer.smartSortCard(b, c));
            e.hideCard(b, d, f)
        }, h = {mouseover: function (b) {
            var c = a.fixEvent(b), d = c.target, e = d.getAttribute("smartcard");
            !e || f(d, e, c)
        }, mouseout: function (b) {
            var c = a.fixEvent(b), d = c.target, e = d.getAttribute("smartcard");
            !e || g(d, e, c)
        }}, i = function () {
            j();
            k()
        }, j = function () {
            if (!a.core.dom.isNode(b))throw"[STK.comp.content.seedUserCard]: node is not a Node!"
        }, k = function () {
            a.addEvent(b, "mouseover", h.mouseover);
            a.addEvent(b, "mouseout", h.mouseout)
        }, l = function () {
            a.removeEvent(b, "mouseover", h.mouseover);
            a.removeEvent(b, "mouseout", h.mouseout)
        };
        i();
        d.destroy = l;
        d.smartCard = e;
        return d
    }
});
STK.register("comp.content.exposure", function (a) {
    return function () {
        var a = !1, b = document, c = b.createElement("script"), d = b.getElementsByTagName("script")[0];
        c.type = "text/javascript";
        c.charset = "utf-8";
        c.async = !0;
        c.src = ("https:" == b.location.protocol ? "https://" : "http://") + "js.t.sinajs.cn/t5/home/js/common/extra/exposure.js?version=" + $CONFIG.version;
        d.parentNode.insertBefore(c, d)
    }
});
STK.register("ui.tipsBubble", function (a) {
    var b = '<div node-type="outer" class="layer_tips layer_tips_version layer_tips_intro"><div class="layer_tips_bg"><a href="javascript:;" node-type="closeBtn" class="W_ico12 icon_close"></a><div class="layer_tips_cont" node-type="inner"></div><span node-type="arrow" class="arrow_up"></span></div></div>';
    return function (c) {
        var d, e, f, g, h, i, j, k = function (a) {
            e.style.top = a.t + "px";
            e.style.left = a.l + "px";
            return h
        }, l = function () {
            var b = a.core.util.winSize(), c = d.getSize(!0);
            e.style.top = a.core.util.scrollPos().top + (b.height - c.h) / 2 + "px";
            e.style.left = (b.width - c.w) / 2 + "px";
            return h
        }, m = function (a, b, c) {
            typeof a == "string" ? f.innerHTML = a : f.appendChild(a);
            g.style.display = b ? "" : "none";
            c && g.setAttribute("suda-data", c);
            return h
        }, n = function (a) {
            if (i) {
                i.className = a.className || "";
                i.style.cssText = a.style || ""
            }
            return h
        }, o = function () {
            d = a.ui.mod.layer(b);
            e = d.getOuter();
            f = d.getDom("inner");
            i = d.getDom("arrow");
            g = d.getDom("closeBtn");
            h = d;
            c && m(c);
            document.body.appendChild(e)
        };
        o();
        h.setPosition = k;
        h.setMiddle = l;
        h.setContent = m;
        h.setArrow = n;
        return h
    }
});
STK.register("ui.bubbleBox", function (a) {
    function g(b) {
        this.node = b.node;
        this.url = b.url;
        this.dir = b.dir;
        this.arrow = b.arrow || "auto";
        this.order = b.order || "b,r,t,l";
        this.onComplete = b.onComplete;
        this.onTimeout = b.onTimeout;
        this.bubLayer = a.ui.tipsBubble();
        this.cardPanel = this.bubLayer.getOuter()
    }

    var b = 5, c = 30, d = 30, e = 20, f = 1e3;
    g.prototype = {_initBindDom: function () {
        if (!this._parsed) {
            var b = this.bubLayer.getDom("closeBtn"), c = this, d = function (b) {
                a.core.evt.preventDefault(b);
                var d = a.fixEvent(b).target, e;
                while (d && d !== c.cardPanel) {
                    if (d.tagName.toLowerCase() === "a") {
                        e = d.getAttribute("action-data");
                        d.href.match(/^\s*javascript\s*:/i) || window.open(d.href);
                        return c._request({url: c.url, callback: function () {
                            c.hide();
                            c.onComplete && c.onComplete()
                        }, data: a.queryToJson(e || "")})
                    }
                    d = d.parentNode
                }
            };
            a.addEvent(this.cardPanel, "click", d);
            this._parsed = !0
        }
    }, _request: function (b) {
        var c = this;
        a.kit.io.ajax({url: b.url, onComplete: b.callback}).request(b.data)
    }, rePosition: function () {
        this.isFixed && (this.cardPanel.style.position = "fixed");
        var b = this, c;
        clearInterval(this.timer);
        this.timer = setInterval(function () {
            a.getStyle(b.node.parentNode, "display") == "none" ? c = !1 : c = !0;
            b.position(c)
        }, f)
    }, show: function (a) {
        this.spec = a;
        this.cardPanel.style.zIndex = a.zIndex || 999;
        this.bubLayer.setContent(a.content, a.hasClose, a.sudaCloseBtn).show();
        this.node = this.node || a.node;
        this._initBindDom();
        this.isFixed();
        this.position();
        this.rePosition();
        return this
    }, setContent: function (a, b, c) {
        this.bubLayer.setContent(a, b, c);
        return this
    }, hide: function () {
        this.bubLayer.hide();
        clearInterval(this.timer);
        return this
    }, isFixed: function () {
        var b = this.node;
        this.isFixed = !1;
        while (b != document.body)if (a.getStyle(b, "position") !== "fixed")b = b.parentNode; else {
            this.isFixed = !0;
            break
        }
        a.getStyle(this.node.parentNode, "display") == "none" ? this.isShow = !1 : this.isShow = !0;
        return this
    }, position: function (b) {
        if (b != undefined && !b || b == undefined && !this.isShow)this.cardPanel.style.display = "none"; else {
            this.cardPanel.style.display = "";
            var f = a.core.dom.position(this.node);
            if (!a.contains(document.body, this.node) || !f || isNaN(f.l + f.t))return this.hide();
            var g = a.core.util.scrollPos(), h = this.bubLayer.getOuter(), i = this.bubLayer.getDom("arrow"), j = Math.min(document.body.clientWidth, document.body.offsetWidth, document.documentElement && document.documentElement.clientWidth), k = Math.max(this.node.clientHeight, this.node.offsetHeight), l = Math.max(this.node.clientWidth, this.node.offsetWidth), m = Math.max(h.clientWidth, h.offsetWidth), n = Math.max(h.clientHeight, h.offsetHeight), o = Math.max(i.clientHeight, i.offsetHeight), p = Math.max(i.clientWidth, i.offsetWidth), q = this.spec.offsetX, r = this.spec.offsetY, s = f.l + l / 2 - d + (isNaN(q) ? 0 : q), t = "arrow_up", u = "";
            this.isFixed && (f.t = f.t - g.top);
            s + m >= j && (this.dir = "tr");
            switch (this.dir) {
                case"tl":
                    f.t = f.t + k + o;
                    f.l = f.l + l / 2 - d;
                    t = "arrow_up";
                    break;
                case"tr":
                    f.t = f.t + k + o;
                    f.l = f.l + l - m;
                    t = "arrow_up";
                    u = "left:" + (m - d - 2) + "px;";
                    break;
                case"bl":
                    f.t = f.t - n - o;
                    f.l = f.l + l / 2 - d;
                    t = "arrow_down";
                    break;
                case"rt":
                    f.t = f.t + k / 2 - c;
                    f.l = f.l - m - e;
                    t = "arrow_right";
                    break;
                case"lt":
                    f.t = f.t + k / 2 - c;
                    f.l = f.l + l + e;
                    t = "arrow_left";
                    break;
                default:
                    f.t = f.t + k + o;
                    f.l = f.l + l / 2 - d;
                    t = "arrow_up"
            }
            this.bubLayer.setPosition({l: f.l + (isNaN(q) ? 0 : q), t: f.t + (isNaN(r) ? 0 : r)}).setArrow({className: t, style: u})
        }
    }};
    return g
});
STK.register("comp.content.bubbleTips", function (a) {
    var b = "/";
    return function (c) {
        if (c == null || c != null && !a.core.dom.isNode(c))a.log("[comp.content.bubbleTips] : need a node."); else {
            var d = {}, e = a.ui.bubbleBox, f, g, h = function () {
                var d = a.sizzle("div[node-type=bubTips]", c).length, h, i, j, k, l, m, n, o, p;
                for (var q = d; q--;) {
                    h = f.bubTips[q];
                    i = a.htmlToJson(a.sizzle("div[node-type=conf]", h)[0]);
                    k = a.sizzle(i.node)[0];
                    if (!a.isNode(k)) {
                        a.log("[STK.comp.content.bubbleTips]: " + i.node + " is error!");
                        return
                    }
                    l = a.sizzle("div[node-type=inner]", h)[0];
                    if (!a.isNode(l)) {
                        a.log("[STK.comp.content.bubbleTips]: " + i.node + " inner is not a Node!");
                        return
                    }
                    n = i.url || b;
                    j = i.dir || "tl";
                    o = parseInt(i["offset-x"], 10) || 0;
                    p = parseInt(i["offset-y"], 10) || 0;
                    m = l.innerHTML;
                    g = new e({url: n, dir: j, node: k});
                    g.show({content: m, zIndex: i.zIndex, offsetX: o, offsetY: p, hasClose: i.hasClose === "true", sudaCloseBtn: i["suda-closeBtn"]})
                }
            }, i = function () {
                j();
                h()
            }, j = function () {
                var b = a.core.dom.builder(c);
                f = b.list
            }, k = function () {
                g && g.hide();
                f = null
            };
            c && i();
            d.destroy = k;
            return d
        }
    }
});
STK.register("comp.content.changeLanguage", function (a) {
    var b = a.kit.extra.language, c;
    return function (d) {
        if (!c) {
            var e, f = {init: function () {
                f.pars();
                f.bind()
            }, pars: function () {
                c = {};
                e = a.parseParam({login: 1}, a.queryToJson(d.getAttribute("action-data") || ""));
                e.login = parseInt(e.login)
            }, bind: function () {
                a.addEvent(d, "change", h.change)
            }, destroy: function () {
                a.removeEvent(d, "change", h.change)
            }}, g = function () {
                var b = function (a) {
                    window.location.reload()
                }, c = function (b) {
                    a.ui.alert(b.msg)
                }, d = a.common.trans.global.getTrans("language", {onSuccess: b, onError: c});
                return function (a) {
                    d.request({lang: a})
                }
            }(), h = {change: function () {
                var c = d.value, f = d.options[d.selectedIndex];
                a.ui.confirm(b("#L{确认切换到}") + f.innerHTML + b("#L{版吗？}"), {OK: function () {
                    a.preventDefault();
                    if (e.login)g(c); else {
                        var b = window.location.href;
                        /\?/.test(b) ? /(\?|\&)lang=([^&]+)/.test(b) ? b = b.replace(/(\?|\&)lang=([^&]+)/, "$1lang=" + c) : b = b + "&lang=" + c : b = b + "?lang=" + c;
                        window.location.href = b
                    }
                }, cancel: function () {
                    a.preventDefault();
                    d.value = $CONFIG.lang
                }})
            }};
            f.init();
            c.destroy = a.core.func.empty;
            return c
        }
        return c
    }
});
STK.register("comp.content.putoff", function (a) {
    return function () {
        var b = a.sizzle("link[putoff]");
        if (!!b[0]) {
            var c = b[0].getAttribute("putoff").split("|");
            for (var d = c.length - 1; d >= 0; d--) {
                var e = a.C("link");
                e.setAttribute("href", $CONFIG.cssPath + c[d]);
                e.setAttribute("type", "text/css");
                e.setAttribute("rel", "stylesheet");
                document.body.appendChild(e)
            }
        }
    }
});
STK.register("comp.content.kickUserByCookie", function (a) {
    var b = !1;
    return function () {
        var c = {};
        if (b)return c;
        b = !0;
        var d, e, f = a.kit.extra.language, g = function () {
            e = i();
            d = setInterval(function () {
                var a = i();
                if (a.uid && a.uid != e.uid) {
                    h(a, e);
                    clearInterval(d)
                }
            }, 1500)
        }, h = function (b, c) {
            var d = a.ui.alert(f("#L{由于刚刚的操作，您的登录帐号已发生变化，请注意使用！}"), {OKText: f("#L{我知道了}")});
            a.custEvent.add(d.dia, "hide", function () {
                window.location = "http://weibo.com"
            })
        }, i = function () {
            try {
                var a = decodeURIComponent(document.cookie), b = a.match(/SUP=[^;]+/i), c = b[0].match(/(uid)\=[^&|;]+/g).join("&");
                c = decodeURIComponent(c);
                c = STK.core.json.queryToJson(c);
                c.uid = parseInt(c.uid);
                return c
            } catch (d) {
                return{uid: $CONFIG.uid}
            }
        };
        g();
        c.destroy = function () {
            clearInterval(d)
        };
        return c
    }
});
STK.register("comp.content.base", function (a) {
    var b = !1, c = !1;
    return function () {
        var d = {}, e = a.E("base_scrollToTop"), f = a.E("pl_content_changeLanguage"), g, h, i, j, k = [], l = [], m = a.kit.extra.require, n, o, p, q, r, s, t, u;
        if (a.pageletView && a.pageletView.onload)a.pageletView.onload(function () {
            m.activeLoad()
        }); else {
            u = function () {
                m.activeLoad()
            };
            a.addEvent(window, "load", u)
        }
        var v = function () {
            i = a.sizzle("div[ucardconf]"), j = a.sizzle("div[smartconf]");
            for (var b = i.length; b--;) {
                p = i[b];
                o = p.getAttribute("ucardconf");
                o = a.queryToJson(o);
                k.push(a.comp.content.userCard(p, {order: o.order, type: o.type, arrowPos: o.arrowPos}))
            }
            for (var c = j.length; c--;) {
                r = j[c];
                q = r.getAttribute("smartconf");
                q = a.queryToJson(q);
                l.push(a.comp.content.smartSortCard(r, {order: q.order, type: q.type, arrowPos: q.arrowPos, variety: "smart_sort"}))
            }
        }, w = function () {
            !c && v();
            !b && a.comp.content.suda();
            !b && a.comp.content.webim();
            !b && a.comp.content.putoff();
            b = !0;
            c = !0;
            var d = a.E("pl_content_bubBox");
            h = a.comp.content.bubbleTips(d);
            f && (g = a.comp.content.changeLanguage(f));
            a.comp.content.wbad();
            a.comp.content.exposure();
            a.comp.content.kickUserByCookie()
        }, x = function () {
            n = a.comp.content.scrollToTop(e);
            if (a.pageletView) {
                if (!b) {
                    a.pageletView.originalPagePlRendReady() && w();
                    a.custEvent.add(a.pageletView, "allPlRendReady", function () {
                        w()
                    });
                    a.historyM && a.historyM.onpopstate(function (b, c) {
                        c && y();
                        setTimeout(function () {
                            c && /pids\=/.test(b) && a.historyM.replaceQuery({pids: null}, !1)
                        }, 10)
                    })
                }
            } else w()
        }, y = function () {
            window.WBAD && window.WBAD.destroy();
            for (var b = k.length; b--;) {
                s = k[b];
                typeof s.destroy == "function" && s.destroy()
            }
            for (var d = l.length; d--;) {
                t = l[d];
                typeof t.destroy == "function" && t.destroy()
            }
            u && a.removeEvent(window, "load", u);
            n.destroy();
            g && g.destroy && g.destroy();
            h && h.destroy && h.destroy();
            h = g = null;
            c = !1
        };
        x();
        return d
    }
});
STK.pageletM.register("pl.content.base", function (a) {
    var b = a.comp.content.base();
    return b
});
