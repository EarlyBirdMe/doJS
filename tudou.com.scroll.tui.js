/*
 * @modified $Author: hhfu $
 * @version $Rev: 32459 $
 * @path STATIC/js/page/index.js
 */
TUI.scrollLoader = (function (d) {
    var f = d(window), j = f.height(), e = [], a = {node: function (k, i) {
        k = d(k);
        return this.y(k.offset().top, i ? k.outerHeight(true) : undefined)
    }, y: function (i, k) {
        this._y = i;
        this._s = k || 0;
        return this
    }, threshold: function (i) {
        this._th = i;
        return this
    }, size: function (i) {
        this._s = i;
        return this
    }, delay: function (i) {
        this._d = i;
        return this
    }, time: function (k) {
        var i = this;
        i._t = k;
        setTimeout(function () {
            i.start()
        }, k);
        return i
    }, load: function () {
        this._cb = this._cb.concat(Array.prototype.slice.call(arguments, 0));
        this._no && e.push(this);
        this._no = false;
        this._f && this.fire();
        this._f = false;
        return this
    }, start: function () {
        this._enable && this._cb.forEach(function (i) {
            i()
        });
        return this.cancel()
    }, cancel: function () {
        this.disable();
        for (var l = 0, k = e.length; l < k; l++) {
            if (e[l] == this) {
                e.splice(l, 1);
                break
            }
        }
    }, enable: function () {
        this._enable = true;
        return this
    }, disable: function () {
        this._enable = false;
        return this
    }, fire: function (m, l) {
        m = m || f.scrollTop();
        l = l || j;
        var k = this;
        if (k._s) {
            clearTimeout(k._timeout);
            k._timeout = setTimeout(function () {
                if (k._enable && k._y <= (m + l + k._th) && (k._y + k._s) >= (m - k._th)) {
                    i()
                }
            }, k._d)
        } else {
            if (this._enable && this._y <= (m + l + this._th)) {
                i()
            }
        }
        function i() {
            k._cb.forEach(function (n) {
                n()
            });
            k.cancel()
        }

        return this
    }}, b = function () {
        this._y = 0;
        this._th = 0;
        this._d = 0;
        this._s = 0;
        this._cb = [];
        this._no = true;
        this._enable = true;
        this._timeout = null;
        this._f = true
    }, h = {};
    b.prototype = a;
    function g() {
        var i = f.scrollTop();
        e.concat().forEach(function (k) {
            k.fire(i, j)
        })
    }

    f.bind("resize", function () {
        j = f.height();
        g()
    });
    f.bind("scroll", g);
    for (var c in a) {
        (function (i) {
            h[i] = function () {
                var k = new b;
                return k[i].apply(k, Array.prototype.slice.call(arguments, 0))
            }
        })(c)
    }
    return h
})($);
TUI.lazyImageLoader = (function (f, d) {
    var h, e, a, b = {};

    function g(p) {
        p = p || {};
        e = p.size || 700;
        a = p.attr || "alt";
        h = p.imgs || f("img.lazyImg");
        for (var m = 0, j = h.length; m < j; m++) {
            var k = h[m];
            var n = f(k).offset().top || f(k).parents(":visible").offset().top || 0;
            c(n, k)
        }
        for (var o in b) {
            (function (l) {
                var i = b[l];
                d.scrollLoader.y(l).threshold(e).load(function () {
                    for (var s = 0, q = i.length; s < q; s++) {
                        var r = f(i[s]);
                        r.attr("src", r.attr(a));
                        r.removeAttr(a);
                        if (r[0].className.indexOf("lazyImg") !== -1) {
                            r.removeClass("lazyImg")
                        }
                    }
                    d.widget.quickPlaylist.load()
                })
            })(parseInt(o))
        }
    }

    function c(j, i) {
        j = j - j % e;
        b[j] = b[j] || [];
        b[j].push(i)
    }

    return g
})($, TUI);
var _lazyImg = $.fn.loadImgSrc;
$.fn.loadImgSrc = function (b) {
    return this
};
TUI.ns("TUI.switchTab", function (f, d) {
    f = f || {};
    f.slide = f.slide || false;
    f.linktab = f.linktab || false;
    f.clicktab = f.clicktab || false;
    f.lazyContent = f.lazyContent || window.gLazyContent || false;
    if (!f.box) {
        return
    }
    var a = function (k) {
        var h = this;
        var j = this.box = $(k.box);
        var i = this.tab = $(k.tab || ".tab li", j);
        var g = this.panel = $(k.panel || ".c", j);
        this.event = new TUI.eventClass();
        this.size = i.length || g.length;
        this.loop = k.loop || 0;
        this.current = e(i.filter(".current")[0]);
        if (k.slide) {
            this.scroll = g.parent().parent();
            this.scroll.scrollLeft(0);
            g.eq(this.current).find(".lazyImg").loadImgSrc();
            g.parent().append(g.eq(0).clone());
            this.panel = $(k.panel || ".c", j);
            this.width = g.width();
            this.delay = k.delay || 700;
            this.loop = (this.loop || 5000) + this.delay;
            this.anilock = false
        }
        if (this.size < 2) {
            return
        }
        if (k.clicktab) {
            i.click(function (l) {
                l.preventDefault();
                h.go(e(this))
            })
        } else {
            if (!k.linktab) {
                i.click(function (l) {
                    l.preventDefault()
                })
            }
            i.mouseenter(function () {
                c(h.timer, h.looptimer);
                var l = this;
                h.timer = setTimeout(function () {
                    h.go(e(l))
                }, 200)
            }).mouseleave(function () {
                c(h.timer, h.looptimer);
                h.start()
            })
        }
        if (h.loop) {
            h.check(k.clicktab ? i : null);
            h.start()
        }
    };
    a.prototype = {on: function (g, h) {
        this.box.eventProxy(g, h);
        return this
    }, bind: function (h, g) {
        this.event.bind(h, g);
        return this
    }, go: function (g, h) {
        g = h ? g : Math.min(Math.max(g, 0), this.size - 1);
        this.event.fire("before", [this.current, g, this]);
        if (f.slide) {
            if (this.anilock) {
                this.nextstep = function () {
                    this.animate(g, h)
                };
                return
            }
            this.animate(g, h)
        } else {
            this.current = g % this.size;
            this.event.fire("change", [this.current, this]);
            this.tab.removeClass("current").eq(this.current).addClass("current");
            this.panel.hide().eq(this.current)[f.fade ? "fadeIn" : "show"](f.duration ? f.duration : "");
            this.event.fire("after", [this.current, this])
        }
    }, prev: function (g) {
        this.go(this.current - 1, g)
    }, next: function (g) {
        this.go(this.current + 1, g)
    }, start: function (h) {
        var g = this;
        if (g.loop) {
            c(g.looptimer);
            if (h) {
                g.start()
            }
            g.looptimer = setTimeout(function () {
                g.start();
                g.next(true)
            }, g.loop)
        }
    }, stop: function () {
        c(this.looptimer)
    }, check: function (h) {
        var g = this;
        (h || g.panel).mouseenter(function () {
            c(g.looptimer)
        }).mouseleave(function () {
            c(g.looptimer);
            g.start()
        })
    }, animate: function (k, m) {
        var n = this;
        var i = n.current;
        if (n.anilock || i == k) {
            return
        }
        c(n.looptimer);
        var p = n.size, h = n.width, g = n.panel, l = n.scroll;
        var o = i > k ? 0 : h;
        var j = i > k ? h : 0;
        k = k % (m ? p + 1 : p);
        g.eq(k).show().find(".lazyImg").loadImgSrc();
        l.scrollLeft(j);
        n.tab.removeClass("current").eq(k % p).addClass("current");
        l.animate({scrollLeft: o}, n.delay, "easeInOutQuad", function () {
            g.eq(i).hide();
            if (m && k == p) {
                k = k % p;
                g.eq(0).show().find(".lazyImg").loadImgSrc();
                g.eq(p).hide()
            }
            l.scrollLeft(0);
            n.current = k;
            n.anilock = false;
            n.event.fire("after", [n.current, n]);
            if (n.nextstep) {
                n.nextstep();
                n.nextstep = null
            }
            if (m) {
                n.start()
            }
        });
        n.anilock = true
    }};
    var b = new a(f);
    if (f.lazyContent) {
        b.bind("change", function (i) {
            var h = b.panel.eq(i);
            var g = h.children().eq(0);
            if (g.hasClass("lazyContent")) {
                h.html(g.val());
                initQuick(h)
            }
        })
    }
    function e(h) {
        if (h && h.tagName) {
            var g = (h.tagName.toLowerCase() == "a") ? $(h) : $(h).find("a");
            g = g.length ? g : $(h);
            return(g.attr("rel") || g.attr("href").replace(/.*#(\d+)$/, "$1") || 1) - 1
        } else {
            return 0
        }
    }

    function c(k) {
        var h = arguments;
        for (var j = 0, g = h.length; j < g; j++) {
            var k = h[j];
            if (k) {
                clearTimeout(k)
            }
        }
        return null
    }

    if ($.isFunction(d)) {
        d.call(b)
    } else {
        return b
    }
});
window.globalPreventDefalut = true;
(function (m, j) {
    var g = "touchstart touchmove touchend gesturestart gesturechange gestureend".split(" ");
    var t = "tap doubletap drag swipe pinch scale rotate".split(" ");
    var v = "left right up down".split(" ");
    var c = "zoomin zoomout".split(" ");
    var e = 40;

    function o(z) {
        this.obj = z || document;
        this.events = {};
        this.isLock = false;
        this.isTap = false;
        this.isDrag = false;
        this.hasDoubleTap = false;
        this.swipeLock = false;
        this.swipeMove = 0;
        this.touchFingers = 0;
        this.touchStartTimer;
        this.touchStartPoint = {x: 0, y: 0};
        this.touchPoint = {x: 0, y: 0};
        this.touchMove;
        this.tapTimer;
        this.tapCount = 0;
        this.pinchScale;
        this.touchstart(a);
        this.touchend(f);
        this.gesturestart(n);
        this.gestureend(u)
    }

    function a(C) {
        if (globalPreventDefalut) {
            C.preventDefault();
            C.stopPropagation()
        }
        var A = this;
        var D = C.touches;
        var z = D.length;
        if (A.isLock) {
            return
        }
        var B = A.touchPoint = {x: D[0].pageX, y: D[0].pageY};
        if (!A.touchStartTimer && A.touchFingers == 0) {
            A.touchStartTimer = setTimeout(function () {
                A.touchStartTimer = null
            }, 250);
            A.touchStartPoint = A.touchPoint;
            A.touchmove(k)
        }
        A.isTap = true;
        A.isDrag = true;
        A.swipeMove = 0;
        if (A.touchStartTimer) {
            A.touchFingers = z
        }
        if (z == 1) {
            A.hasDoubleTap = !!(A.events.doubletap || []).length;
            if (A.hasDoubleTap && A.tapCount > 0) {
                clearTimeout(A.tapTimer);
                setTimeout(function () {
                    A.tapCount = A.touchFingers = 0;
                    A.isTap = false
                }, 500)
            }
        }
    }

    function k(z) {
        if (globalPreventDefalut) {
            z.preventDefault();
            z.stopPropagation()
        }
        var I = this;
        var D = z.touches;
        var B = D.length;
        if (I.isLock) {
            return
        }
        var H = I.touchPoint = {x: D[0].pageX, y: D[0].pageY};
        var A = touchMove = {x: H.x - I.touchStartPoint.x, y: H.y - I.touchStartPoint.y};
        if (I.isDrag) {
            I.fire("drag", [A, z])
        }
        I.tapCount = 0;
        I.swipeMove++;
        if (!I.swipeLock) {
            var G = Math.abs(A.x);
            var F = Math.abs(A.y);
            var C = B < 3 ? e : e / 4;
            var E;
            if (G > C && F < C) {
                E = A.x < 0 ? v[0] : v[1]
            } else {
                if (G < C && F > C) {
                    E = A.y < 0 ? v[2] : v[3]
                } else {
                    if (G > C && F > C && G >= F) {
                        E = A.x < 0 ? v[0] : v[1]
                    } else {
                        if (G > C && F > C && G < F) {
                            E = A.y < 0 ? v[2] : v[3]
                        }
                    }
                }
            }
            if (E && I.swipeMove > 4) {
                I.fire("swipe", [I.touchFingers, E, I.touchMove, z]);
                I.isTap = false;
                I.swipeLock = true;
                I.swipeMove = 0;
                I.pinchScale = 0
            }
        }
    }

    function f(C) {
        if (globalPreventDefalut) {
            C.preventDefault()
        }
        var A = this;
        var D = C.touches;
        var z = D.length;
        var F = p(A.touchStartPoint.x, A.touchStartPoint.y, A.touchPoint.x, A.touchPoint.y);
        A.isDrag = false;
        if (z == 0) {
            A.unbind("touchmove", k);
            var E = A.touchFingers > 0 && A.touchFingers < 3;
            if (A.pinchScale && E) {
                var B = A.pinchScale > 1 ? c[0] : c[1];
                A.fire("pinch", [B, A.pinchScale, C]);
                A.pinchScale = 0;
                A.isTap = false
            }
            if (A.swipeLock) {
                A.swipeLock = false
            }
            if (A.isTap && E) {
                if (F > 30) {
                    A.hasDoubleTap = false
                }
                if (!A.hasDoubleTap || A.touchFingers > 1) {
                    A.fire("tap", [A.touchFingers, C]);
                    A.tapCount = A.touchFingers = 0
                } else {
                    A.tapCount++;
                    if (A.tapCount == 1) {
                        A.tapTimer = setTimeout(function () {
                            if (A.touchFingers > 0) {
                                A.fire("tap", [A.touchFingers, C])
                            }
                            A.tapCount = A.touchFingers = 0
                        }, 200)
                    }
                    if (A.tapCount == 2) {
                        A.fire("doubletap", [C]);
                        A.tapCount = A.touchFingers = 0;
                        h.call(this)
                    }
                }
            } else {
                A.touchFingers = 0
            }
        } else {
            A.swipeLock = true;
            A.swipeMove = 0
        }
    }

    function n(z) {
        if (globalPreventDefalut) {
            z.preventDefault()
        }
        this.bind("gesturechange", l)
    }

    function u(z) {
        if (globalPreventDefalut) {
            z.preventDefault()
        }
        this.unbind("gesturechange", l)
    }

    function l(B) {
        if (globalPreventDefalut) {
            B.preventDefault()
        }
        var z = this;
        var C = Math.round(B.scale * 100) / 100;
        var A = Math.round(B.rotation);
        A += (A < -200) ? 360 : 0;
        A -= (A > 200) ? 360 : 0;
        z.fire("scale", [C, B]);
        z.fire("rotate", [A, B]);
        if (Math.abs(C - 1) > 0.17) {
            z.swipeLock = true;
            z.pinchScale = C;
            z.isTap = false;
            setTimeout(function () {
                z.pinchScale = 0
            }, 350)
        }
    }

    function h(A) {
        var z = this;
        z.isLock = true;
        setTimeout(function () {
            z.isLock = false
        }, A || 400)
    }

    function w(D) {
        var C = D.length || 0;
        var A = {};
        if (C == 2) {
            var z = D[0].pageX, E = D[0].pageY;
            A.x = z + (D[1].pageX - z) / 2;
            A.y = E + (D[1].pageY - E) / 2
        } else {
            var z = 0, E = 0;
            for (var B = 0; B < C; B++) {
                z += D[B].pageX;
                E += D[B].pageY
            }
            A.x = z / C;
            A.y = E / C
        }
        return A
    }

    function x(D) {
        var C = D.length || 0;
        var E = [
            {x: 0, y: 0}
        ];
        var B = 0;
        for (var A = 1; A < C; A++) {
            E.push({x: D[A].pageX - D[0].pageX, y: D[A].pageY - D[0].pageY})
        }
        for (var A = 0, z = C - 1; A < z; A++) {
            B += E[A].x * E[A + 1].y;
            B -= E[A + 1].x * E[A].y
        }
        return C > 2 ? parseInt(Math.abs(B / 2)) : 0
    }

    function s(C, z) {
        var B = C.length || 0;
        var z = z || w(z);
        var D = 0;
        if (B == 2) {
            D = p(C[0].pageX, C[0].pageY, C[1].pageX, C[1].pageY)
        } else {
            for (var A = 0; A < B; A++) {
                D = Math.max(D, p(C[A].pageX, C[A].pageY, z.x, z.y))
            }
        }
        return parseInt(D)
    }

    function p(A, C, z, B) {
        return parseInt(Math.sqrt(Math.pow(A - z, 2) + Math.pow(C - B, 2)))
    }

    function b(A, z) {
        var B = function () {
            (A || function () {
            }).apply(z, arguments)
        };
        B._fn = A;
        return B
    }

    function i(A, C) {
        var z = this;
        var B = z.events;
        C = b(C, z);
        B[A] = B[A] || [];
        B[A].push(C);
        if (g.indexOf(A) > -1) {
            var D = (A.lastIndexOf("start") > -1 || A.lastIndexOf("end") > -1) ? z.obj : document;
            D.addEventListener(A, C, false)
        }
        return z
    }

    function d(A, C) {
        var z = this;
        var B = z.events;
        if (!B[A]) {
            return
        }
        if (g.indexOf(A) > -1) {
            var D = (A.lastIndexOf("start") > -1 || A.lastIndexOf("end") > -1) ? z.obj : document;
            if (C) {
                B[A].forEach(function (F, E) {
                    if (F._fn === C) {
                        D.removeEventListener(A, F, false);
                        return false
                    }
                })
            } else {
                B[A].forEach(function (E) {
                    D.removeEventListener(A, E, false)
                })
            }
        }
        if (C) {
            B[A].forEach(function (F, E) {
                if (F._fn === C) {
                    B[A].splice(E, 1);
                    return false
                }
            })
        } else {
            delete (z.events[A] = null)
        }
        return z
    }

    function y(B, A) {
        var z = this;
        (z.events[B] || []).forEach(function (C) {
            C.apply(z, A)
        })
    }

    function r(z) {
        o.prototype[z] = function (A) {
            if (A) {
                this.bind(z, A)
            }
            return this
        }
    }

    function q(z) {
        var A = document.querySelector(z);
        return new o(A)
    }

    o.prototype = {fire: y, bind: i, unbind: d, getArea: x, getCenter: w, getDistance: s};
    g.forEach(r);
    t.forEach(r);
    o.SWIPE_LEFT = v[0];
    o.SWIPE_RIGHT = v[1];
    o.SWIPE_UP = v[2];
    o.SWIPE_DOWN = v[3];
    o.PINCH_IN = c[0];
    o.PINCH_OUT = c[1];
    m.T = q;
    m.TouchKit = o
})(window);
(function (i, g, h, e) {
    function b(k) {
        if (k && g.type(k) == "array") {
            this.images = k
        } else {
            this.images = [k]
        }
        this.count = this.images.length;
        this.ready = [];
        this.data = {}
    }

    function c(n, k) {
        var m = this;
        var l = new Image();
        l.onload = function () {
            clearTimeout(l.timeout);
            m.ready.push(k);
            m.data[k] = {src: n, width: l.width, height: l.height};
            if (m.count == m.ready.length) {
                m.loaded(a(m.data, m.images.length));
                j(m)
            }
            l = l.onload = l.onerror = null
        };
        l.onerror = function (o) {
            if (m.errorfn) {
                m.errorfn(o, n)
            }
            m.count--;
            l = l.onload = l.onerror = null
        };
        l.timeout = setTimeout(function () {
            if (!l) {
                return
            }
            m.count--;
            if (m.count == m.ready.length) {
                m.loaded(a(m.data, m.images.length));
                j(m)
            }
            l = l.onload = l.onerror = null
        }, 5000);
        l.src = n
    }

    function a(n, m) {
        var o = [];
        for (var l = 0; l < m; l++) {
            var k = n[l];
            if (k) {
                o.push(k)
            }
        }
        return o
    }

    function f(n) {
        this.loaded = n;
        for (var m = 0, k = this.count; m < k; m++) {
            c.call(this, this.images[m], m)
        }
    }

    function d(k) {
        this.errorfn = k
    }

    function j(k) {
        k.loaded = k.errorfn = k.data = k.ready = k.count = k.images = null
    }

    b.prototype = {load: f, error: d};
    h.ns("TUI.imageLoader", b)
})(window, $, TUI);
TUI.ns("TUI.accessor", function (f) {
    f = f || {};
    var e = f.data || {}, d = f.event || new TUI.eventClass(), c, g = f.set || function (i, h) {
        return e[i] = h
    }, b = f.get || function (h) {
        return e[h]
    };

    function a() {
        e = {};
        if (f.data) {
            f.data = e
        }
    }

    return TUI.mix(function (i, h, l) {
        if (i === undefined) {
            return e
        }
        if (h === undefined) {
            if (typeof i != "object") {
                return b.call(e, i)
            } else {
                for (var j in i) {
                    g.call(e, j, i[j], l)
                }
                return arguments.callee
            }
        }
        g.call(e, i, h, l);
        return h
    }, {event: d, clear: a, mix: function (i, h) {
        if ($.type(i) == "array") {
            i.forEach(function (j) {
                e[j[h]] = j
            })
        } else {
            TUI.mix(e, i || {})
        }
    }, each: function (h) {
        for (var i in e) {
            h(i, e[i])
        }
    }})
});
TUI.ns("TUI.accessorUtils", {setterMixObj: function (b, a, e) {
    if (TUI.isPlainObject(this[b]) && TUI.isPlainObject(a)) {
        var d = this[b];
        for (var c in a) {
            d[c] = a[c]
        }
    } else {
        this[b] = a
    }
}});
(function (d) {
    var f = d.footprint;

    function e(p, o) {
        if (p === undefined) {
            p = this.handler
        }
        var l = this;
        if (d.isPlainObject(p)) {
            $.each(p, function (r, q) {
                e.call(l, r, q)
            })
        } else {
            if (/\s/.test(p)) {
                var j = p.match(/^([^\s]+)\s(.+)/), k;
                if (j[1].indexOf("@") == 0) {
                    if (j[1] != "@PRT") {
                        k = l.delegate(j[1]) || l.delegate(l.element[j[1].slice(1)] || false)
                    } else {
                        k = l.parent && l.parent.subDelegate
                    }
                    if (k) {
                        k.bind(j[2], o)
                    }
                } else {
                    (l.el(j[2]) || $(j[2]))[j[1]](o)
                }
            } else {
                var n = p.split(","), m = $.type(o) == "array" ? o : [o];
                n.forEach(function (r) {
                    var q;
                    if (r.indexOf("~") == -1) {
                        q = l.event
                    } else {
                        var s = r.split("~");
                        r = s[1];
                        q = l.com(s[0]).event
                    }
                    m.forEach(function (t) {
                        q.bind(r, t)
                    })
                })
            }
        }
        return this
    }

    function b(j, k) {
        if (typeof j !== "string") {
            return false
        }
        k = k || "click";
        this.delegate("@" + j, d.eventProxy(j, k));
        return this
    }

    function a(l) {
        var k, j;
        l = l || this.element;
        for (k in l) {
            j = l[k];
            if (!j) {
                throw new Error("invalid element: " + k + " " + j)
            }
            if (j.charAt(0) == "@") {
                j = j.slice(1);
                this.addDelegate(j)
            }
            this.el(k, j)
        }
        return this
    }

    function g(l, k, m) {
        var j = this;
        if (d.isPlainObject(l)) {
            $.each(l, function (p, o) {
                j.component(p, o);
                o.parent = j
            })
        } else {
            j.component(l, k);
            for (var n in m) {
                if (n.indexOf("~") == 0) {
                    m[l + n] = m[n];
                    delete m[n]
                }
            }
            $.extend(j.handler, m || {});
            k.parent = j
        }
        return this
    }

    function i(l, j) {
        return this[l] = $(j)
    }

    function c(j) {
        var k = $.extend({}, this.setupConfig, j || {});
        if (k.beforeSetup() === false) {
            return
        }
        if (k.ui) {
            this.setupUI()
        }
        if (k.bind) {
            this.bind()
        }
        if (k.sub) {
            this.com.each(function (l, m) {
                m.setup()
            })
        }
        k.afterSetup();
        return this
    }

    function h() {
        return this
    }

    d.ns("TUI.app", function (k) {
        k = k || {};
        var j = $.extend({mix: $.extend, parent: null, component: d.accessor(), event: new d.eventClass(), db: {}, model: {}, templating: {}, delegate: d.accessor(), subDelegate: null, el: d.accessor({set: i}), element: {}, handler: {}, bind: e, addDelegate: b, addComponent: g, setupUI: a, setup: c, setupConfig: {beforeSetup: function () {
        }, afterSetup: function () {
        }, ui: true, bind: true, sub: true}, teardown: h, config: d.accessor()}, k || {});
        $.extend(j.setupConfig, k.setupConfig || {});
        j.com = j.component;
        j.addCom = j.addComponent;
        j.$ = j.setupUI;
        if (k.beforeSetup) {
            j.setupConfig.beforeSetup = k.beforeSetup
        }
        if (k.afterSetup) {
            j.setupConfig.afterSetup = k.afterSetup
        }
        return j
    });
    d.ns("TUI.mixAppConfig", function (j, l, k) {
        return $.extend(true, {}, j || {}, l || {}, k)
    })
})(TUI);
var RecStat = (function (f, d) {
    var l = {};
    var k = {};
    var e = f.itemData || {};
    var j = e.iid || f.iid || 0;
    var g = e.cid || f.cid || 0;
    var a = f.aid || f.lid || 0;

    function i(q, n) {
        n = n || l.req_id;
        var o = k[n];
        var m = o && o.recommendItems;
        if (!(m && m[q])) {
            return
        }
        if (n != l.req_id) {
            l = c(o.reqInfo)
        }
        j = e.iid || f.iid || 0;
        g = e.cid || f.cid || 0;
        var p = {};
        p.cookie_id = ComboStat.juid;
        uid && (p.uid = uid);
        j && (p.vid = j);
        a && (p.sid = a);
        g && (p.sct = g);
        p.apt = l.apt;
        p.pg = l.pg;
        p.md = l.md;
        p.pos = q || 0;
        m[q].itemId && (p.dvid = m[q].itemId);
        m[q].sid && (p.dsid = m[q].sid);
        m[q].channelId && (p.dct = m[q].channelId);
        p.abver = l.abver;
        p.dma = m[q].dma || 0;
        p.ord = l.ord;
        p.req_id = n;
        p.algInfo = m[q].algInfo || "";
        p._t = +new Date();
        TUI.getRequest("http://r.l.youku.com/trecommendclick", p)
    }

    function b(n) {
        n = n || {};
        var m = n.reqInfo || {};
        if (m.req_id) {
            k[m.req_id] = n
        }
        l = c(m);
        var o = {};
        o.cookie_id = ComboStat.juid;
        uid && (o.uid = uid);
        j && (o.vid = j);
        a && (o.sid = a);
        g && (o.sct = g);
        o.apt = l.apt;
        o.pg = l.pg;
        o.md = l.md;
        o.abver = l.abver;
        o.ord = l.ord;
        o.req_id = l.req_id;
        o.showlist = h(n);
        o._t = +new Date();
        TUI.getRequest("http://r.l.youku.com/trecommendshow", o);
        return m.req_id
    }

    function h(n) {
        var m = [];
        if (n.recommendItems) {
            n.recommendItems.forEach(function (p, o) {
                m.push([p.itemId, p.type, p.dma, p.algInfo].join("_"))
            })
        }
        return m.join(",")
    }

    function c(m) {
        return{apt: m.apt || 1, pg: m.pg || 1, md: m.md || 1, abver: m.abver || "A", ord: m.ord || 1, req_id: m.req_id || ""}
    }

    return{send: i, onShow: b}
})(window);
var tpl_page_index_v2_irec = '<% if (panel < 1) { %> <div class="h"> <% if (pageId == 300) { %> <h2><span>猜你喜欢</span></h2> <span class="ap"> <ul class="sw-dot"> <li class="current"><a class="irec-sw" href="#" rel="1"></a></li> <li><a class="irec-sw" href="#" rel="2"></a></li> <li><a class="irec-sw" href="#" rel="3"></a></li> <li><a class="irec-sw" href="#" rel="4"></a></li> </ul> </span> <% } else { %> <h2><span>推荐给我</span></h2> <div class="aw"></div> <% } %> </div> <% if (pageId == 300) { %> <div class="f1"></div> <div class="f2"></div> <% } %> <% } %> <div class="c cpanel<%=panel%>"> <div class="sc4"> <%data.forEach(function(item, i){%> <% var vu = main_domain + \'/programs/view/\' + item.code + \'/?fr=rec2\'; %> <div class="pack pack_video_card" id="irec_<%=item.model%>_<%=i+1%>_<%=panel+1%>-<%=item.algInfo%>"> <div class="pic"> <% if (pageId == 300) { %> <a href="<%=vu%>" model="<%=item.model%>" algInfo="<%=item.algInfo%>" itemid="<%=item.itemId%>" title="<%=item.title%>" target="new" coords="_tAA"></a> <div class="inner"><img width="132" height="99" src="<%=item.picUrl%>" alt="" class="pack_clipImg"/></div> <span class="vtime"><span class="bg"></span><span class="di"><%=item.totalTime%></span></span> <% } else { %> <a href="<%=vu%>" model="<%=item.model%>" algInfo="<%=item.algInfo%>" itemid="<%=item.itemId%>" title="<%=item.title%>" target="new" class="inner" coords="_tAA"><img width="132" height="99" src="<%=item.picUrl%>" alt="" class="pack_clipImg"/></a> <% } %> </div> <div class="txt"> <h6 class="caption"><a href="<%=vu%>" model="<%=item.model%>" algInfo="<%=item.algInfo%>" itemid="<%=item.itemId%>" target="new" title="<%=item.title%>" coords="_tAB"><%=TUI.substr(item.title, 28)%></a></h6> <ul class="info"> <li>播客: <a title="<%=item.ownerName%>" href="<%=main_domain%>/home/_<%=item.ownerId%>" target="_blank" coords="_tK@"><%=item.ownerName%></a> <%if(item.director == \'1\'){%> <a target="_blank" title="更多豆角儿" href="<%=main_domain%>/my/dj/" class="g_vip3"></a> <%};%> </li> <li class="d_nums"> <span class="d_play" title="播放"><%=item.playAmount%></span> <span class="d_cmt" title="评论"><%=item.commentCount%></span> </li> </ul> </div> </div> <%});%> </div> </div> ';
if (!$.type) {
    $.type = TUI.type
}
TUI.ns("TUI.irec", function (e, h, b, d) {
    var f = e && e.event || new TUI.eventClass(), g = TUI.app({event: f, element: $.extend({wrap: "@#iRec"}, b || {}), handler: $.extend({"getIRec:success": function (k, j, i, m) {
        var l = TUI.convertTpl("page/index/v2/irec.tpl", {data: k, pageId: pageId || 0, panel: i || 0});
        f.fire("getIRec:beforeupdate", [i]);
        if (i > 0) {
            c("wrap").append(l)
        } else {
            if (m.slideDown) {
                c("wrap").html(l).slideDown()
            } else {
                c("wrap").html(l).show()
            }
        }
        window.initQuick(c("wrap"));
        f.fire("getIRec:loaded");
        c("wrap").click(function (u) {
            var q = u.target;
            if (q.nodeName !== "A") {
                q = q.parentNode
            }
            if (q.nodeName === "A" && /programs\/view\//.test($(q).attr("href"))) {
                var o = 0, n = $(q).closest(".pack")[0];
                var s, p;
                $(".pack", this).each(function (t) {
                    if (n === this) {
                        o = t + 1;
                        return false
                    }
                });
                var r = $(q);
                s = r.attr("itemid");
                p = r.attr("model");
                algInfo = r.attr("algInfo");
                TUI.getRequest("http://stats.tudou.com/e/tmp/top6/?v=3&s=20000|" + juidStr + "|" + s + "|" + uid + "|" + o + "|" + p + "|" + m.channel + "|" + algInfo);
                RecStat.send(o - 1)
            }
        })
    }}, d || {})}), c = g.el, h = $.extend({userid: uid, juid: TUI.cookie("juid"), channel: 0, count: 4, pcode: 10000100 + h.channel * 10000, slideDown: true}, h || {});

    function a(i) {
        $.getJSON("http://tdrec.youku.com/tjpt/tdrec?callback=?", h, function (j) {
            if (j.status == "1") {
                f.fire("getIRec:success", [j.recommendItems, j, i, h]);
                RecStat.onShow(j)
            }
        })
    }

    return g.mix({load: function (i) {
        i = i || 0;
        if (uid) {
            a(i)
        } else {
            TUI.storage("local-view-records@global").ready(function (j) {
                if (j) {
                    j = JSON.parse(j);
                    h.items = j.map(function (k) {
                        return k.iid
                    }).join(",")
                }
                a(i)
            })
        }
        return g
    }})
});
if (!this.JSON) {
    this.JSON = {}
}
(function () {
    function f(n) {
        return n < 10 ? "0" + n : n
    }

    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function (key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
            case"string":
                return quote(value);
            case"number":
                return isFinite(value) ? String(value) : "null";
            case"boolean":
            case"null":
                return String(value);
            case"object":
                if (!value) {
                    return"null"
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null"
                    }
                    v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v
                }
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === "string") {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                gap = mind;
                return v
        }
    }

    if (typeof JSON.stringify !== "function") {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {"": value})
        }
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return"\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({"": j}, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}());
TUI.ns("TUI.Model.viewRecord", function (d) {
    d = d || {};
    var a = d.event || new TUI.eventClass(), f = TUI.Model.common;

    function h(m, n) {
        var l = m.app;
        delete m.app;
        var k = $.extend({start: 0, rows: 0, needDetail: false, viewRecords: [], selectType: 0}, m || {});
        var j = main_domain + "/viewrecord/info/merge.html?jsoncallback=?";
        if (l) {
            j = j + "&app=" + l
        }
        if (k.viewRecords.length) {
            j = j + "&info=" + JSON.stringify(k);
            $.getJSON(j, function (o) {
                if (o.status == 0) {
                    if (n && n(o.viewRecords, o) === false) {
                        return
                    }
                    a.fire("viewRecordGetMerge:success", [o.viewRecords, o])
                }
            })
        } else {
            TUI.storage("logged-view-records@global").ready(function (o) {
                k.viewRecords = o ? JSON.parse(o) : [];
                j = j + "&info=" + JSON.stringify(k);
                $.getJSON(j, function (p) {
                    if (p.status == 0) {
                        if (n && n(p.viewRecords, p) === false) {
                            return
                        }
                        a.fire("viewRecordGetMerge:success", [p.viewRecords, p])
                    }
                });
                TUI.storage("logged-view-records@global", "[]")
            })
        }
    }

    function g(j, k) {
        TUI.storage("local-view-records@global").ready(function (p) {
            p = p ? JSON.parse(p) : [];
            var o = [];
            if (j && $.type(j) === "function") {
                k = j;
                j = {}
            }
            j = j || {};
            var q = j.start === undefined ? 0 : j.start;
            var n = j.rows === undefined ? p.length : j.rows;
            var l = j.selectType === undefined ? 0 : j.selectType;
            var m = 0;
            switch (parseInt(l)) {
                case 1:
                    p.forEach(function (s, r) {
                        if (s.lid == -3) {
                            o[o.length] = s
                        }
                    });
                    break;
                case 2:
                    p.forEach(function (s, r) {
                        if (s.lid != -3) {
                            o[o.length] = s
                        }
                    });
                    break;
                default:
                    o = p
            }
            m = o.length;
            o = o.slice(q, q + n);
            b(o);
            if (k && k(o, {viewRecords: o, totalCount: m}) === false) {
                return
            }
            a.fire("viewRecordGetLocal:success", [o, {data: o, totalCount: m}])
        })
    }

    function e(j, k) {
        j = $.type(j) === "array" ? j : [j];
        $.getJSON(main_domain + "/viewrecord/srv/delete.html?callback=?", {iids: j.join(",")});
        TUI.storage("logged-view-records@global").ready(function (l) {
            j = $.type(j) === "array" ? j : [j];
            l = l ? JSON.parse(l) : [];
            j.forEach(function (o, n) {
                for (var n = 0, m = l.length; n < m; n++) {
                    if (o == l[n].iid) {
                        l.splice(n, 1);
                        break
                    }
                }
            });
            TUI.storage("logged-view-records@global", JSON.stringify(l))
        });
        if (k && k() === false) {
            return
        }
        a.fire("viewRecordDel:success", [j])
    }

    function c(j, k) {
        $.getJSON(main_domain + "/viewrecord/srv/deleteByType.html?jsoncallback=?&deleteType=" + j, function (l) {
            if (l.status == 1) {
                if (k && k(j) === false) {
                    return
                }
                a.fire("clearServer:success", [j])
            }
        })
    }

    function i(j, k) {
        TUI.storage("local-view-records@global").ready(function (l) {
            j = $.type(j) === "array" ? j : [j];
            l = l ? JSON.parse(l) : [];
            j.forEach(function (o, n) {
                for (var n = 0, m = l.length; n < m; n++) {
                    if (o == l[n].iid) {
                        l.splice(n, 1);
                        break
                    }
                }
            });
            TUI.storage("local-view-records@global", JSON.stringify(l));
            if (k && k() === false) {
                return
            }
            a.fire("viewRecordDelLocal:success", [j])
        })
    }

    function b(j) {
        j = $.type(j) === "array" ? j : [j];
        j.forEach(function (s, m) {
            var r = s.iid, t = s.icode, l = s.aid, p = s.acode, o = s.lid, q = s.lcode, k = s.nid, n = s.ncode;
            if (l) {
                if (o == -2) {
                    s.url = f.getPlayOtherUrl(p, {icode: t});
                    if (k) {
                        s.next = f.getPlayOtherUrl(p, {icode: n})
                    }
                } else {
                    s.url = f.getPlayalbumUrl(l, {iid: r, icode: t, acode: p});
                    if (k) {
                        s.next = f.getPlayalbumUrl(l, {iid: k, icode: n, acode: p})
                    }
                }
            } else {
                if (o > 0) {
                    s.url = f.getPlaylistUrl(o, {iid: r, icode: t, lcode: q});
                    if (k) {
                        s.next = f.getPlaylistUrl(o, {iid: k, icode: n, lcode: q})
                    }
                } else {
                    s.url = f.getProgramUrl(t)
                }
            }
        })
    }

    return{delServer: e, delLocal: i, getMerge: h, getLocal: g, updateDB: b, clearServer: c}
});
var tpl_page_index_v2_fixrec = '<div class="sr_ap"><a href="#" hidefocus="true" class="sw-change">换一组</a> </div> <%if(data.length === 4){%> <div class="sr_tip"> 亲，你还没有观看记录，赶紧选一些看看吧；</br> 右侧的节目供你选择哟！</div> <%}%>  <div class="sr_irec"> <%data.forEach(function(item, i){%> <% var vu = main_domain + \'/programs/view/\' + item.code + \'/?fr=rec2\'; %>  <div class="pack pack_video_card" id="irec_<%=item.model%>_<%=i+1%>_<%=panel+1%>-<%=item.algInfo%>"> <div class="pic"> <% if (pageId == 300) { %> <a href="<%=vu%>" model="<%=item.model%>" algInfo="<%=item.algInfo%>" itemid="<%=item.itemId%>" title="<%=item.title%>" target="new" coords="_tAA"></a> <div class="inner"><img width="132" height="99" src="<%=item.picUrl%>" alt="" class="pack_clipImg"/></div> <span class="vtime"><span class="bg"></span><span class="di"><%=item.totalTime%></span></span> <% } else { %> <a href="<%=vu%>" model="<%=item.model%>" algInfo="<%=item.algInfo%>" itemid="<%=item.itemId%>" title="<%=item.title%>" target="new" class="inner" coords="_tAA"><img width="132" height="99" src="<%=item.picUrl%>" alt="" class="pack_clipImg"/></a> <% } %> </div> <div class="txt"> <h6 class="caption"><a href="<%=vu%>" model="<%=item.model%>" algInfo="<%=item.algInfo%>" itemid="<%=item.itemId%>" target="new" title="<%=item.title%>" coords="_tAB"><%=TUI.substr(item.title, 28)%></a></h6> <ul class="info"> <li>播客: <a title="<%=item.ownerName%>" href="<%=main_domain%>/home/_<%=item.ownerId%>" target="_blank" coords="_tK@"><%=item.ownerName%></a> <%if(item.director == \'1\'){%> <a target="_blank" title="更多豆角儿" href="<%=main_domain%>/my/dj/" class="g_vip3"></a> <%};%> </li> <li class="d_nums"> <span class="d_play" title="播放"><%=item.playAmount%></span> <span class="d_cmt" title="评论"><%=item.commentCount%></span> </li> </ul> </div> </div>  <%});%> </div>';
var tpl_page_index_v2_albumrec = '<%var len = data.length;%>  <div class="sr_roll_c" id="srRoll"> <div class="sr_roll">  <% data.forEach(function(item, i){ item.next = item.next || \'\'; item.lvt = item.lvt || 0;  item.min = item.lvt >= 60 ? Math.floor(item.lvt/60) : \'不足1\'; %> <%if(i === 0 ||  i%6 === 0){%> <ul class="v_c"> <%}%>  <li> <div class="v_con"> <h3> <%switch(item.device){ case 0:%> <em class="i_pc"></em> <%break; case 1:%> <em class="i_pad"></em> <%break; case 2:%> <em class="i_ph"></em> <%break; default:%> <em class="i_pc"></em> <%}%> <a title="<%=item.ititle%>" target="_blank" href="<%=item.url%>"><%=TUI.substr(item.ititle, 24)%></a></h3> <%if(item.next){%> <a target="_blank" href="<%=item.url%>&lvt=<%=item.lvt%>">继续看</a> <a target="_blank" href="<%=item.next%>">看下一集</a> <%}else{%> 观看至 <a target="_blank" href="<%=item.url%>&lvt=<%=item.lvt%>"><%=item.min%>分钟</a> <%}%> </div> <div class="v_date"><%=item.viewTime%></div><i></i> </li>  <% if( i%6 === 5 || i === len){%> </ul>  <%	} });%>   </div> </div> <%if(len > 6){%> <div class="roll_l"><a class="roll_next roll_next_no" hidefocus="true" href="#"></a></div> <div  class="roll_r"><a class="roll_prev" href="#" hidefocus="true"></a></div> <%}%>';
var tpl_page_index_v2_allrec = '<% var len = data.length;  if(len > 6){%> <div class="sr_ap"> <a href="#" hidefocus="true" class="sw-next sw-no">上一页</a> <a href="#" hidefocus="true" class="sw-prev">下一页</a> </div> <%}%>  <%data.forEach(function(item, i){%> <% item.next = item.next || \'\'; item.lvt = item.lvt || 0;  item.min = item.lvt >= 60 ? Math.floor(item.lvt/60) : \'不足1\'; %>  <%if(i === 0 ||  i%6 === 0){%> <div class="sr_irec" <%if(i !==0) {%> style="display: none;" <%}%> > <%}%>   <div class="pack pack_video_card"> <div class="pic"> <a href="<%=item.url%>" title="<%=item.ititle%>" target="new"></a> <div class="inner"> <img width="132" height="99" src="<%=item.picUrl%>" class="pack_clipImg" /> </div> <%if(item.totalTime){%> <span class="vtime"><span class="bg"></span><span class="di"><%=(item.totalTime/60).toFixed(2).replace(\'.\',\':\')%></span></span> <%}%> </div> <div class="txt"> <h6 class="caption"> <a href="<%=item.url%>" title="<%=item.ititle%>" target="new"><%=item.ititle%></a> </h6> <ul class="info"> <li> <%switch(item.device){ case 0:%> <em class="i_pc"></em> <%break; case 1:%> <em class="i_pad"></em> <%break; case 2:%> <em class="i_ph"></em> <%break; default:%> <em class="i_pc"></em> <% }%> 观看至<%=item.min%>分钟</li> <li class="v_link"><a href="<%=item.url%>&lvt=<%=item.lvt%>" target="new">继续看</a> <%if(item.next){%> <a href="<%=item.next%>" target="new">看下一集</a> <%}%> </li> </ul> </div> </div>  <%if( i%6 === 5 || i === len){%> </div> <%}  });%>  ';
var tpl_page_index_v2_dig = '<div class="sc4"> <%data.digItemList&& data.digItemList.forEach(function(item){%> <div class="pack pack_video_card"> <div class="pic"> <a href="http://www.tudou.com/programs/view/<%=item.code%>/" title="<%=item.title%>" target="new"></a> <div class="inner"> <img width="132" height="99" src="<%=item.picUrl%>" class="pack_clipImg" /> </div> <span class="vdig"><span class="bg"></span><span class="di"><b></b><%=item.digNum%></span></span> </div> <div class="txt"> <h6 class="caption"><a href="http://www.tudou.com/programs/view/<%=item.code%>/" title="<%=item.title%>" target="new"><%=item.title%></a></h6> <ul class="info"> <li> 播客: <a target="_blank" title="<%=item.ownerNickname%>的主页" href="http://www.tudou.com/home/_<%=item.ownerId%>" ><%=item.ownerNickname%></a> </li> <li class="d_nums"> <span class="d_play" ><%=item.playNum%></span><span class="d_cmt" ><%=item.commentNum%></span> </li> </ul> </div> </div> <%});%> </div>  <div class="sc4"> <%data.ztItemList && data.ztItemList.forEach(function(item){%> <div class="pack pack_video_card"> <div class="pic"> <a href="http://www.tudou.com/programs/view/<%=item.code%>/" title="<%=item.title%>" target="new"></a> <div class="inner"> <img width="132" height="99" src="<%=item.picUrl%>" class="pack_clipImg" /> </div> <span class="vdig vshare"><span class="bg"></span><span class="di"><b></b><%=item.ztNum%></span></span> </div> <div class="txt"> <h6 class="caption"><a href="http://www.tudou.com/programs/view/<%=item.code%>/" title="<%=item.title%>" target="new"><%=item.title%></a></h6> <ul class="info"> <li> 播客: <a target="_blank" title="<%=item.ownerNickname%>的主页" href="http://www.tudou.com/home/_<%=item.ownerId%>" ><%=item.ownerNickname%></a> </li> <li class="d_nums"> <span class="d_play" ><%=item.playNum%></span><span class="d_cmt" ><%=item.commentNum%></span> </li> </ul> </div> </div> <%});%> </div>';
document.domain = "tudou.com";
TUI.domain.join({wa: "wa.tudou.com", tjpt: "tjpt.my.tudou.com"});
window.gLazyContent = true;
window.isNewQuickPlaylist = true;
window.globalPreventDefalut = false;
window.isMobile = !!TUI.browser.iOS || false;
window._initNav = window.initNav;
window.initNav = function () {
    window._initNav();
    window._initNav = null;
    pageDomReady()
};
function switchContent(d, a) {
    d = d || {};
    d.tab = d.tab || ".t li";
    d.rand = d.rand || false;
    d.pagebtn = d.pagebtn || false;
    var c = TUI.switchTab(d);
    if (d.more) {
        var b = $(".mo", c.box);
        c.bind("change", function (e) {
            b.attr("href", c.tab.eq(e).find("a").attr("href"))
        })
    }
    if (d.linktab) {
        c.tab.click(function () {
            var e = $(this).find("a").attr("href");
            if (e.indexOf("#") == 0) {
                return false
            }
        })
    }
    if (d.pagebtn) {
        c.on("click", {".btn_prev": function (e) {
            e.preventDefault();
            c.stop();
            c.go((c.current - 1 + c.size) % c.size);
            c.start()
        }, ".btn_next": function (e) {
            e.preventDefault();
            c.stop();
            c.go((c.current + 1) % c.size);
            c.start()
        }})
    }
    if (d.rand) {
        c.go(TUI.rand(c.size))
    }
    if (a && $.isFunction(a)) {
        a.call(c)
    }
    return c
}
function hotBoard() {
    var l = window.hotBoardItems;
    var i = l && l.length || 0;
    if (!i) {
        return
    }
    var b = $("#slideshow");
    var c = $("#slidePic");
    var d, f, n, g, o;
    if (!TUI.cookie("focusRandomFlag")) {
        TUI.cookie("focusRandomFlag", 1, {expires: 1, domain: "tudou.com", path: "/"});
        window.focusRandomFlag = false
    }
    if (window.focusRandomFlag) {
        l = j(l)
    }
    var m = [l[0].pic];
    l.forEach(function (q, p) {
        m.push(q.smallPic)
    });
    new TUI.imageLoader(m).load(function (p) {
        e()
    });
    k();
    function e() {
        var s = [], p = [], u;
        for (var r = 0; r < i; r++) {
            if (r > 0) {
                p.push('<div class="pic" rel="' + (r + 1) + '" style="background-color:' + l[r].color + ' "><div class="img"><img class="lazyload" lazysrc="' + l[r].pic + '" src="http://css.tudouui.com/skin/__g/img/sprite.gif" /></div></div>')
            }
            u = r == 0 ? "current" : "";
            s.push('<a id="btn_' + r + "_" + a(l[r].pic) + '" href="' + l[r].url + '" target="_blank" class="btn ' + u + ' " rel="' + (r + 1) + '"><img width="64" height="64" galleryimg="no" src="' + l[r].smallPic + '" alt="" /><span></span></a>')
        }
        c.append(p.join(""));
        f.hide().html(s.join("")).fadeIn(700);
        d = $(".pic", c);
        g = d.find(".lazyload");
        o = g.length;
        var t = TUI.switchTab({box: b, tab: ".btn", panel: d, fade: true, duration: 1000, linktab: !isMobile, loop: 5000});
        var q = 0;
        setTimeout(function () {
            h()
        }, 3000);
        t.bind("before", function (v, w) {
            q = v;
            if (o) {
                setTimeout(function () {
                    h(w);
                    h(w + 1)
                }, 1000)
            }
        });
        t.bind("after", function (v) {
            $(t.panel[q]).show().css({"z-index": 0});
            $(t.panel[v]).css({"z-index": 1});
            setTimeout(function () {
                var w = l[v];
                n.attr("id", "pos_" + v + "_" + a(w.pic));
                n.attr("href", w.url)
            }, 100)
        });
        if (isMobile) {
            T("#slideshow").swipe(function (y, z, v, x) {
                var w = t.current;
                switch (z) {
                    case TouchKit.SWIPE_LEFT:
                        x.preventDefault();
                        if (w > t.size) {
                            t.go(0)
                        } else {
                            t.next(true)
                        }
                        break;
                    case TouchKit.SWIPE_RIGHT:
                        x.preventDefault();
                        if (w < 1) {
                            t.go(t.size - 1)
                        } else {
                            t.prev(true)
                        }
                        break
                }
            })
        } else {
            n.mouseenter(function () {
                t.stop()
            }).mouseleave(function () {
                t.start()
            })
        }
    }

    function k() {
        var p = [];
        var q = [];
        var r = l[0];
        p.push('<div class="btns"></div>');
        p.push('<a id="pos_0_' + a(r.pic) + '" href="' + r.url + '" class="link" target="_blank" hidefocus="true"></a>');
        q.push('<div class="pic" rel="1" style="display: block; background:' + r.color + ' "><div class="img"><img src="' + r.pic + '"></div></div>');
        b.html(p.join(""));
        c.html(q.join(""));
        f = $(".btns", b);
        n = $(".link", b)
    }

    function h(r) {
        r = r || 1;
        var p = g[r - 1] || g[0];
        var q = p.getAttribute("lazysrc");
        if (q) {
            p.src = q;
            p.removeAttribute("lazysrc");
            o--
        }
    }

    function j(p) {
        p.sort(function () {
            return PRNGran() > 0.5 ? -1 : 1
        });
        p.reverse();
        p.sort(function () {
            return Math.random() > 0.5 ? -1 : 1
        });
        return p
    }

    function a(p) {
        p = p.replace(/http:\/\//, "");
        p = p.replace(/[\.\/]/g, "_");
        return p
    }
}
function hotAction() {
    var b = $("#hot10");
    var a = $("#btnH2");
    var c;
    a.bind("mouseenter",function () {
        if (c) {
            return
        }
        c = setTimeout(function () {
            a.hide();
            b.animate({height: 400}, 500)
        }, 100)
    }).bind("mouseleave", function () {
        clearTimeout(c);
        c = null
    });
    b.bind("mouseleave", function () {
        b.animate({height: 0}, 500, function () {
            a.fadeIn()
        })
    })
}
function digTudou() {
    var a = $("#secDig"), c = $(".t-sub li", a), d = $(".c", a), b = {}, e;
    c.click(function (g) {
        g.preventDefault();
        var f = $(this);
        e = f.find("a").attr("rel");
        d.empty().addClass("loading");
        c.removeClass("current");
        f.addClass("current");
        if (!b[e]) {
            TUI.getScript(main_domain + "/crp/dig.action?c=" + e + "&w=1&app=index&jsoncallback=jsonCallBack", {charset: "utf-8"})
        } else {
            d.html(TUI.convertTpl("page/index/v2/dig.tpl", {data: b[e]})).removeClass("loading");
            initQuick(d)
        }
    });
    window.jsonCallBack = function (f) {
        if (f.error) {
            d.html("请求数据出错").removeClass("loading");
            return
        }
        b[e] = f.data;
        d.html(TUI.convertTpl("page/index/v2/dig.tpl", {data: f.data})).removeClass("loading");
        initQuick(d)
    }
}
function licence() {
    var a = $(".g-licence");
    var b = $("ul", a);
    b.eq(2).append('<li><a href="http://www.zx110.org/cxs/index.html" target="_blank">诚信搜索</a>&nbsp;<img src="http://i3.tdimg.com/b/20130510/co1.png" alt="诚信上网 规范经营" style="display:inline;vertical-align:middle" /></li>');
    a.parent().append('<div class="g-licence-icon"><a href="http://sh.cyberpolice.cn/" target="_blank"><img src="http://i4.tdimg.com/b/20130510/co2.png" style="display:inline" /></a><a href="http://www.itrust.org.cn/yz/pjwx.asp?wm=1582105522" target="_blank"><img src="http://i1.tdimg.com/b/20130510/co3.png" style="display:inline" /></a><a href="http://www.zx110.org" target="_blank"><img src="http://i4.tdimg.com/b/20130510/co4.png" style="display:inline" /></a><a href="http://www.shjbzx.cn/" target="_blank"><img src="http://i2.tdimg.com/b/20130510/co5.png" style="display:inline" /></a><a target="_blank" href="http://www.sgs.gov.cn/lz/licenseLink.do?method=licenceView&entyId=2012040612333372"><img src="http://i1.tdimg.com/b/20130510/co6.png" style="display:inline"></a></div>')
}
var douwanLive = {count: 10, picLoaded: false, timer: false, box: $("#dw-livebox"), init: function () {
    if (this.timer) {
        return false
    }
    var a = this;
    if (!this.pics) {
        this.pics = this.box.find("img");
        this.box[0].scrollTop = 10 * 79
    }
    window.setTimeout(function () {
        a.scroll()
    }, 500);
    this.timer = window.setInterval(function () {
        a.scroll()
    }, 3500)
}, stop: function () {
    if (!this.timer) {
        return false
    }
    window.clearInterval(this.timer);
    this.timer = false
}, scroll: function () {
    var b = this;
    this.box.animate({scrollTop: (--this.count) * 79}, 600, function () {
        if (b.count <= 0) {
            b.count = 10;
            this.scrollTop = 10 * 79
        }
    });
    if (!this.picLoaded) {
        var a = $(this.pics[this.count]);
        var c = a.attr("alt");
        if (c) {
            a.attr("src", c).removeAttr("alt")
        }
        if (this.count <= 0) {
            this.picLoaded = true
        }
    }
}};
function scrollLoad() {
    var b = douwanLive;
    $(".pack_mini_brief", b.box).mouseover(function () {
        $(this).addClass("pack_hover")
    }).mouseout(function () {
        $(this).removeClass("pack_hover")
    });
    var c = true;
    var a = function () {
        var g = $(window);
        var f = g.scrollTop(), d = g.height();
        if (b.box[0]) {
            var e = b.box.offset().top;
            if (e - f > 0 && e - d < f) {
                b.init()
            } else {
                b.stop()
            }
        }
        if (!c || (f + d) < 700) {
            return true
        }
        c = false
    };
    a();
    $(window).bind("scroll", a)
}
function fixRecomAd() {
    var d = $("#ab_101196");
    var c = [], a = [];
    var b;
    d.find(".pack").forEach(function (e) {
        b = $(e).find(".lazyImg");
        b.attr("src", b.attr("alt"));
        c.push($(e).html())
    });
    TUI.event.bind("ad:loaded", function () {
        var g = d.find(".pack");
        var e = 3 - g.length;
        for (var f = 0; f < e; f++) {
            a.push('<div class="pack pack_mini">' + c[f] + "</div>")
        }
        d.append(a.join(""))
    })
}
function relate() {
    var d = $("#secRelate");
    var k = $("#recH");
    var o = d.find(".sr_c");
    var m = d.find(".c");
    var i, c = true;
    var l = switchContent({box: "#secRelate", panel: ".sr_c", tab: ".sr_tab li"});
    var f = true;
    var h = true;
    var n, b;
    g(o.eq(0), 6);
    l.bind("after", function () {
        if (l.current == 1 && f) {
            a(1)
        }
        if (l.current == 2 && h) {
            a(0)
        }
    });
    d.delegate("#recH", "mouseenter",function () {
        $(this).addClass("h_cur")
    }).delegate("#recH", "mouseleave",function () {
        $(this).removeClass("h_cur")
    }).delegate("#recH", "click",function (p) {
        i = $(this);
        if (p.target.nodeName.toUpperCase() !== "A") {
            if (c) {
                c = false;
                m.hide();
                i.find(".sr_ctrl").html('观看记录展开<i class="h_icon open"></i>')
            } else {
                c = true;
                m.show();
                i.find(".sr_ctrl").html('观看记录收起<i class="h_icon"></i>')
            }
        }
    }).delegate("#srLogin", "click",function (p) {
        p.preventDefault();
        TUI.needLogin(function (q) {
            relate()
        })
    }).delegate(".v_c li", "mouseleave",function () {
        $(this).removeClass("cur")
    }).delegate(".v_c li", "mouseenter",function () {
        $(this).addClass("cur")
    }).delegate(".sw-change", "click", function (q) {
        q.preventDefault();
        var r = l.current || 0;
        var p = r == 0 ? 6 : 4;
        g(o.eq(r), p)
    });
    if (TUI.isLogined2) {
        TUI.isLogined2(function (p) {
            if (p) {
                k.find(".sr_info").html('<a href="http://www.tudou.com/home/' + TUI.cookie("u_user") + '/" target="_blank" ><span class="sr_user"><img width="34" height="34" src="' + TUI.cookie("u_pic") + '" /></span>' + TUI.cookie("u_nick") + "</a>的相关记录")
            }
        })
    } else {
        if (isLogined()) {
            k.find(".sr_info").html('<a href="http://www.tudou.com/home/' + TUI.cookie("u_user") + '/" target="_blank" ><span class="sr_user"><img width="34" height="34" src="' + TUI.cookie("u_pic") + '" /></span>' + TUI.cookie("u_nick") + "</a>的相关记录")
        }
    }
    window.getPicByiids = function (p) {
        if (p.error) {
            return
        }
        var q = p.data;
        n.forEach(function (t) {
            for (var s = 0, r = q.length; s < r; s++) {
                if (t.iid == q[s].itemId) {
                    t.picUrl = q[s].picUrl;
                    t.totalTime = q[s].totalTime;
                    return false
                }
            }
        });
        j()
    };
    function a(p) {
        p = p || 0;
        var r;
        var s = {rows: 30, needDetail: true, selectType: p, app: "index"};
        var q = TUI.Model.viewRecord();
        q[uid ? "getMerge" : "getLocal"](s, function (u, x) {
            r = u || x.viewRecords;
            if (p) {
                r.forEach(function (z) {
                    if (/^\d+$/.test(z.ct)) {
                        var y = new Date(z.ct);
                        y = (y.getMonth() + 1) + "-" + y.getDate();
                        z.viewTime = y
                    }
                });
                b = r;
                e()
            } else {
                n = r;
                var w = [], t = n.length;
                for (var v = 0; v < t; v++) {
                    w.push(n[v].iid)
                }
                if (t > 0) {
                    TUI.getScript(main_domain + "/crp/getItemInfos2.action?uid=" + uid + "&app=index&iids=" + w.join(",") + "&jsoncallback=getPicByiids", {charset: "utf-8"})
                } else {
                    j()
                }
            }
        })
    }

    function e() {
        var v = b || [];
        var p = v.length;
        var u = o.eq(1);
        f = false;
        if (p < 1) {
            g(u, 4);
            return
        }
        var s = TUI.convertTpl("page/index/v2/albumrec.tpl", {data: v});
        u.html(s);
        var q = u.find(".roll_next");
        var r = u.find(".roll_prev");
        var t = switchContent({box: "#srRoll", panel: ".sr_roll .v_c"});
        q.click(function (w) {
            w.preventDefault();
            t.prev();
            r.removeClass("roll_prev_no");
            if (t.current == 0) {
                q.addClass("roll_next_no")
            }
        });
        r.click(function (w) {
            w.preventDefault();
            t.next();
            q.removeClass("roll_next_no");
            if (t.current == t.size - 1) {
                r.addClass("roll_prev_no")
            }
        })
    }

    function j() {
        var v = n || [];
        var p = v.length;
        var u = o.eq(2);
        h = false;
        if (p < 1) {
            g(u, 4);
            return
        }
        var s = TUI.convertTpl("page/index/v2/allrec.tpl", {data: v});
        u.html(s);
        initQuick("#secRelate");
        var q = u.find(".sw-next");
        var r = u.find(".sw-prev");
        var t = switchContent({box: u, panel: ".sr_irec"});
        q.click(function (w) {
            w.preventDefault();
            t.prev();
            r.removeClass("sw-no");
            if (t.current == 0) {
                q.addClass("sw-no")
            }
        });
        r.click(function (w) {
            w.preventDefault();
            t.next();
            q.removeClass("sw-no");
            if (t.current == t.size - 1) {
                r.addClass("sw-no")
            }
        })
    }

    function g(s, q) {
        var r = TUI.irec(null, {channel: 0, count: q || 6, slideDown: false});
        var p;
        r.load();
        r.event.bind("getIRec:success", function (t) {
            p = TUI.convertTpl("page/index/v2/fixrec.tpl", {data: t, pageId: 300, panel: 0});
            s.html(p);
            initQuick("#secRelate")
        });
        $("#secRelate").click(function (A) {
            var x = A.target;
            if (x.nodeName !== "A") {
                x = x.parentNode
            }
            if (x.nodeName === "A" && $(x).attr("itemid") && /programs\/view\//.test($(x).attr("href"))) {
                var v = 0, u = $(x).closest(".pack")[0];
                var z, w;
                $(".pack", this).each(function (t) {
                    if (u === this) {
                        v = t + 1;
                        return false
                    }
                });
                var y = $(x);
                z = y.attr("itemid");
                w = y.attr("model");
                algInfo = y.attr("algInfo");
                TUI.getRequest("http://stats.tudou.com/e/tmp/top6/?v=3&s=20000|" + juidStr + "|" + z + "|" + uid + "|" + v + "|" + w + "|0|" + algInfo);
                RecStat.send(v - 1)
            }
        })
    }
}
function hotAd() {
    $("#secTudouMv .h").append('<iframe allowtransparency="true" class="hot-ad" scrolling="no" frameborder="0" src="http://www.tudou.com/service/outside.php?type=index_ad"> </iframe>')
}
function pageDomReady() {
    require("module/btn/btn", function (c) {
        c.bodyWith(982);
        c.ewm("http://i3.tdimg.com/b/20130529/co17.png", "http://mobile.tudou.com/")
    });
    var b = !isMobile;
    hotAd();
    hotBoard();
    hotAction();
    fixRecomAd();
    youkuAd();
    TUI.lazyImageLoader({size: 400});
    var a = switchContent({box: "#secTheater", loop: 5000, pagebtn: true});
    TUI.scrollLoader.node("#secRelate").load(function () {
        relate()
    });
    TUI.scrollLoader.y(1000).load(function () {
        switchContent({box: "#secDramaTab", tab: ".t-sub li", linktab: b});
        switchContent({box: "#secMovieTab", tab: ".t-sub li", linktab: b});
        switchContent({box: "#secComicTab", tab: ".t-sub li:not(:last)", linktab: b});
        switchContent({box: "#secMusicTab", tab: ".t-sub li:not(:last)", linktab: b});
        switchContent({box: "#secTvRank", panel: ".rank", tab: ".t-sub li", linktab: b});
        switchContent({box: "#secMovieRank", panel: ".rank", tab: ".t-sub li", linktab: b});
        switchContent({box: "#secComicRank", panel: ".rank", tab: ".t-sub li", linktab: b});
        switchContent({box: "#secZyRank", panel: ".rank", linktab: b});
        switchContent({box: "#secEntRank", panel: ".rank", linktab: b});
        switchContent({box: "#secMusicRank", panel: ".rank", linktab: b});
        switchContent({box: "#secDjTab", linktab: b, more: true}, function () {
            var e = false;
            var c = $("#secDjTab .c");
            this.bind("after", function (f) {
                if (!e) {
                    e = true;
                    d(f)
                }
            });
            d();
            function d(f) {
                f = f || 0;
                c.eq(f).find(".pack_user").mouseover(function () {
                    $(this).addClass("pack_hover")
                }).mouseout(function () {
                    $(this).removeClass("pack_hover")
                })
            }
        })
    });
    TUI.scrollLoader.y(3000).load(function () {
        switchContent({box: "#secRecomTab", linktab: b});
        scrollLoad();
        digTudou();
        licence()
    })
};