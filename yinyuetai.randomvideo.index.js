/* Copyright (c) 2010-2012 Marcus Westin */

(function (e) {
    function N(t) {
        return t && t.allowPageScroll === undefined && (t.swipe !== undefined || t.swipeStatus !== undefined) && (t.allowPageScroll = u), t.click !== undefined && t.tap === undefined && (t.tap = t.click), t || (t = {}), t = e.extend({}, e.fn.swipe.defaults, t), this.each(function () {
            var n = e(this), r = n.data(x);
            r || (r = new C(this, t), n.data(x, r))
        })
    }

    function C(T, N) {
        function nt(t) {
            if (jt())return;
            if (e(t.target).closest(N.excludedElements, X).length > 0)return;
            var n = t.originalEvent ? t.originalEvent : t, r, i = S ? n.touches[0] : n;
            V = y, S ? $ = n.touches.length : t.preventDefault(), P = 0, H = null, z = null, B = 0, F = 0, I = 0, R = 1, U = 0, J = Ut(), W = Xt(), Ht();
            if (!S || $ === N.fingers || N.fingers === m || gt()) {
                It(0, i), K = en(), $ == 2 && (It(1, n.touches[1]), F = I = Jt(J[0].start, J[1].start));
                if (N.swipeStatus || N.pinchStatus)r = ft(n, V)
            } else r = !1;
            if (r === !1)return V = E, ft(n, V), r;
            Ft(!0)
        }

        function rt(e) {
            var t = e.originalEvent ? e.originalEvent : e;
            if (V === w || V === E || Bt())return;
            var n, r = S ? t.touches[0] : t, i = qt(r);
            Q = en(), S && ($ = t.touches.length), V = b, $ == 2 && (F == 0 ? (It(1, t.touches[1]), F = I = Jt(J[0].start, J[1].start)) : (qt(t.touches[1]), I = Jt(J[0].end, J[1].end), z = Qt(J[0].end, J[1].end)), R = Kt(F, I), U = Math.abs(F - I));
            if ($ === N.fingers || N.fingers === m || !S || gt()) {
                H = Zt(i.start, i.end), vt(e, H), P = Gt(i.start, i.end), B = $t(), zt(H, P);
                if (N.swipeStatus || N.pinchStatus)n = ft(t, V);
                if (!N.triggerOnTouchEnd || N.triggerOnTouchLeave) {
                    var s = !0;
                    if (N.triggerOnTouchLeave) {
                        var o = tn(this);
                        s = nn(i.end, o)
                    }
                    !N.triggerOnTouchEnd && s ? V = at(b) : N.triggerOnTouchLeave && !s && (V = at(w)), (V == E || V == w) && ft(t, V)
                }
            } else V = E, ft(t, V);
            n === !1 && (V = E, ft(t, V))
        }

        function it(e) {
            var t = e.originalEvent;
            if (S && t.touches.length > 0)return Pt(), !0;
            Bt() && ($ = Y), e.preventDefault(), Q = en(), B = $t(), ht() ? (V = E, ft(t, V)) : N.triggerOnTouchEnd || N.triggerOnTouchEnd == 0 && V === b ? (V = w, ft(t, V)) : !N.triggerOnTouchEnd && Tt() ? (V = w, lt(t, V, c)) : V === b && (V = E, ft(t, V)), Ft(!1)
        }

        function st() {
            $ = 0, Q = 0, K = 0, F = 0, I = 0, R = 1, Ht(), Ft(!1)
        }

        function ot(e) {
            var t = e.originalEvent;
            N.triggerOnTouchLeave && (V = at(w), ft(t, V))
        }

        function ut() {
            X.unbind(L, nt), X.unbind(D, st), X.unbind(O, rt), X.unbind(M, it), _ && X.unbind(_, ot), Ft(!1)
        }

        function at(e) {
            var t = e, n = dt(), r = ct(), i = ht();
            return!n || i ? t = E : r && e == b && (!N.triggerOnTouchEnd || N.triggerOnTouchLeave) ? t = w : !r && e == w && N.triggerOnTouchLeave && (t = E), t
        }

        function ft(e, t) {
            var n = undefined;
            return Et() || wt() ? n = lt(e, t, f) : (yt() || gt()) && n !== !1 && (n = lt(e, t, l)), _t() && n !== !1 ? n = lt(e, t, h) : Dt() && n !== !1 ? n = lt(e, t, p) : Mt() && n !== !1 && (n = lt(e, t, c)), t === E && st(e), t === w && (S ? e.touches.length == 0 && st(e) : st(e)), n
        }

        function lt(u, a, d) {
            var v = undefined;
            if (d == f) {
                X.trigger("swipeStatus", [a, H || null, P || 0, B || 0, $]);
                if (N.swipeStatus) {
                    v = N.swipeStatus.call(X, u, a, H || null, P || 0, B || 0, $);
                    if (v === !1)return!1
                }
                if (a == w && bt()) {
                    X.trigger("swipe", [H, P, B, $]);
                    if (N.swipe) {
                        v = N.swipe.call(X, u, H, P, B, $);
                        if (v === !1)return!1
                    }
                    switch (H) {
                        case t:
                            X.trigger("swipeLeft", [H, P, B, $]), N.swipeLeft && (v = N.swipeLeft.call(X, u, H, P, B, $));
                            break;
                        case n:
                            X.trigger("swipeRight", [H, P, B, $]), N.swipeRight && (v = N.swipeRight.call(X, u, H, P, B, $));
                            break;
                        case r:
                            X.trigger("swipeUp", [H, P, B, $]), N.swipeUp && (v = N.swipeUp.call(X, u, H, P, B, $));
                            break;
                        case i:
                            X.trigger("swipeDown", [H, P, B, $]), N.swipeDown && (v = N.swipeDown.call(X, u, H, P, B, $))
                    }
                }
            }
            if (d == l) {
                X.trigger("pinchStatus", [a, z || null, U || 0, B || 0, $, R]);
                if (N.pinchStatus) {
                    v = N.pinchStatus.call(X, u, a, z || null, U || 0, B || 0, $, R);
                    if (v === !1)return!1
                }
                if (a == w && mt())switch (z) {
                    case s:
                        X.trigger("pinchIn", [z || null, U || 0, B || 0, $, R]), N.pinchIn && (v = N.pinchIn.call(X, u, z || null, U || 0, B || 0, $, R));
                        break;
                    case o:
                        X.trigger("pinchOut", [z || null, U || 0, B || 0, $, R]), N.pinchOut && (v = N.pinchOut.call(X, u, z || null, U || 0, B || 0, $, R))
                }
            }
            if (d == c) {
                if (a === E || a === w)clearTimeout(et), Nt() && !Lt() ? (Z = en(), et = setTimeout(e.proxy(function () {
                    Z = null, X.trigger("tap", [u.target]), N.tap && (v = N.tap.call(X, u, u.target))
                }, this), N.doubleTapThreshold)) : (Z = null, X.trigger("tap", [u.target]), N.tap && (v = N.tap.call(X, u, u.target)))
            } else if (d == h) {
                if (a === E || a === w)clearTimeout(et), Z = null, X.trigger("doubletap", [u.target]), N.doubleTap && (v = N.doubleTap.call(X, u, u.target))
            } else d == p && (a === E || a === w) && (clearTimeout(et), Z = null, X.trigger("longtap", [u.target]), N.longTap && (v = N.longTap.call(X, u, u.target)));
            return v
        }

        function ct() {
            var e = !0;
            return N.threshold !== null && (e = P >= N.threshold), e
        }

        function ht() {
            var e = !1;
            return N.cancelThreshold !== null && H !== null && (e = Wt(H) - P >= N.cancelThreshold), e
        }

        function pt() {
            return N.pinchThreshold !== null ? U >= N.pinchThreshold : !0
        }

        function dt() {
            var e;
            return N.maxTimeThreshold ? B >= N.maxTimeThreshold ? e = !1 : e = !0 : e = !0, e
        }

        function vt(e, s) {
            if (N.allowPageScroll === u || gt())e.preventDefault(); else {
                var o = N.allowPageScroll === a;
                switch (s) {
                    case t:
                        (N.swipeLeft && o || !o && N.allowPageScroll != d) && e.preventDefault();
                        break;
                    case n:
                        (N.swipeRight && o || !o && N.allowPageScroll != d) && e.preventDefault();
                        break;
                    case r:
                        (N.swipeUp && o || !o && N.allowPageScroll != v) && e.preventDefault();
                        break;
                    case i:
                        (N.swipeDown && o || !o && N.allowPageScroll != v) && e.preventDefault()
                }
            }
        }

        function mt() {
            var e = St(), t = xt(), n = pt();
            return e && t && n
        }

        function gt() {
            return!!(N.pinchStatus || N.pinchIn || N.pinchOut)
        }

        function yt() {
            return!!mt() && !!gt()
        }

        function bt() {
            var e = dt(), t = ct(), n = St(), r = xt(), i = ht(), s = !i && r && n && t && e;
            return s
        }

        function wt() {
            return!!(N.swipe || N.swipeStatus || N.swipeLeft || N.swipeRight || N.swipeUp || N.swipeDown)
        }

        function Et() {
            return!!bt() && !!wt()
        }

        function St() {
            return $ === N.fingers || N.fingers === m || !S
        }

        function xt() {
            return J[0].end.x !== 0
        }

        function Tt() {
            return!!N.tap
        }

        function Nt() {
            return!!N.doubleTap
        }

        function Ct() {
            return!!N.longTap
        }

        function kt() {
            if (Z == null)return!1;
            var e = en();
            return Nt() && e - Z <= N.doubleTapThreshold
        }

        function Lt() {
            return kt()
        }

        function At() {
            return($ === 1 || !S) && (isNaN(P) || P === 0)
        }

        function Ot() {
            return B > N.longTapThreshold && P < g
        }

        function Mt() {
            return!!At() && !!Tt()
        }

        function _t() {
            return!!kt() && !!Nt()
        }

        function Dt() {
            return!!Ot() && !!Ct()
        }

        function Pt() {
            G = en(), Y = event.touches.length + 1
        }

        function Ht() {
            G = 0, Y = 0
        }

        function Bt() {
            var e = !1;
            if (G) {
                var t = en() - G;
                t <= N.fingerReleaseThreshold && (e = !0)
            }
            return e
        }

        function jt() {
            return X.data(x + "_intouch") === !0
        }

        function Ft(e) {
            e === !0 ? (X.bind(O, rt), X.bind(M, it), _ && X.bind(_, ot)) : (X.unbind(O, rt, !1), X.unbind(M, it, !1), _ && X.unbind(_, ot, !1)), X.data(x + "_intouch", e === !0)
        }

        function It(e, t) {
            var n = t.identifier !== undefined ? t.identifier : 0;
            return J[e].identifier = n, J[e].start.x = J[e].end.x = t.pageX || t.clientX, J[e].start.y = J[e].end.y = t.pageY || t.clientY, J[e]
        }

        function qt(e) {
            var t = e.identifier !== undefined ? e.identifier : 0, n = Rt(t);
            return n.end.x = e.pageX || e.clientX, n.end.y = e.pageY || e.clientY, n
        }

        function Rt(e) {
            for (var t = 0; t < J.length; t++)if (J[t].identifier == e)return J[t]
        }

        function Ut() {
            var e = [];
            for (var t = 0; t <= 5; t++)e.push({start: {x: 0, y: 0}, end: {x: 0, y: 0}, identifier: 0});
            return e
        }

        function zt(e, t) {
            t = Math.max(t, Wt(e)), W[e].distance = t
        }

        function Wt(e) {
            return W[e].distance
        }

        function Xt() {
            var e = {};
            return e[t] = Vt(t), e[n] = Vt(n), e[r] = Vt(r), e[i] = Vt(i), e
        }

        function Vt(e) {
            return{direction: e, distance: 0}
        }

        function $t() {
            return Q - K
        }

        function Jt(e, t) {
            var n = Math.abs(e.x - t.x), r = Math.abs(e.y - t.y);
            return Math.round(Math.sqrt(n * n + r * r))
        }

        function Kt(e, t) {
            var n = t / e * 1;
            return n.toFixed(2)
        }

        function Qt() {
            return R < 1 ? o : s
        }

        function Gt(e, t) {
            return Math.round(Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)))
        }

        function Yt(e, t) {
            var n = e.x - t.x, r = t.y - e.y, i = Math.atan2(r, n), s = Math.round(i * 180 / Math.PI);
            return s < 0 && (s = 360 - Math.abs(s)), s
        }

        function Zt(e, s) {
            var o = Yt(e, s);
            return o <= 45 && o >= 0 ? t : o <= 360 && o >= 315 ? t : o >= 135 && o <= 225 ? n : o > 45 && o < 135 ? i : r
        }

        function en() {
            var e = new Date;
            return e.getTime()
        }

        function tn(t) {
            t = e(t);
            var n = t.offset(), r = {left: n.left, right: n.left + t.outerWidth(), top: n.top, bottom: n.top + t.outerHeight()};
            return r
        }

        function nn(e, t) {
            return e.x > t.left && e.x < t.right && e.y > t.top && e.y < t.bottom
        }

        var C = S || !N.fallbackToMouseEvents, L = C ? "touchstart" : "mousedown", O = C ? "touchmove" : "mousemove", M = C ? "touchend" : "mouseup", _ = C ? null : "mouseleave", D = "touchcancel", P = 0, H = null, B = 0, F = 0, I = 0, R = 1, U = 0, z = 0, W = null, X = e(T), V = "start", $ = 0, J = null, K = 0, Q = 0, G = 0, Y = 0, Z = 0, et = null;
        try {
            X.bind(L, nt), X.bind(D, st)
        } catch (tt) {
            e.error("events not supported " + L + "," + D + " on jQuery.swipe")
        }
        this.enable = function () {
            return X.bind(L, nt), X.bind(D, st), X
        }, this.disable = function () {
            return ut(), X
        }, this.destroy = function () {
            return ut(), X.data(x, null), X
        }, this.option = function (t, n) {
            if (N[t] !== undefined) {
                if (n === undefined)return N[t];
                N[t] = n
            } else e.error("Option " + t + " does not exist on jQuery.swipe.options")
        }
    }

    var t = "left", n = "right", r = "up", i = "down", s = "in", o = "out", u = "none", a = "auto", f = "swipe", l = "pinch", c = "tap", h = "doubletap", p = "longtap", d = "horizontal", v = "vertical", m = "all", g = 10, y = "start", b = "move", w = "end", E = "cancel", S = "ontouchstart"in window, x = "TouchSwipe", T = {fingers: 1, threshold: 75, cancelThreshold: null, pinchThreshold: 20, maxTimeThreshold: null, fingerReleaseThreshold: 250, longTapThreshold: 500, doubleTapThreshold: 200, swipe: null, swipeLeft: null, swipeRight: null, swipeUp: null, swipeDown: null, swipeStatus: null, pinchIn: null, pinchOut: null, pinchStatus: null, click: null, tap: null, doubleTap: null, longTap: null, triggerOnTouchEnd: !0, triggerOnTouchLeave: !1, allowPageScroll: "auto", fallbackToMouseEvents: !0, excludedElements: "button, input, select, textarea, a, .noSwipe"};
    e.fn.swipe = function (t) {
        var n = e(this), r = n.data(x);
        if (r && typeof t == "string") {
            if (r[t])return r[t].apply(this, Array.prototype.slice.call(arguments, 1));
            e.error("Method " + t + " does not exist on jQuery.swipe")
        } else if (!r && (typeof t == "object" || !t))return N.apply(this, arguments);
        return n
    }, e.fn.swipe.defaults = T, e.fn.swipe.phases = {PHASE_START: y, PHASE_MOVE: b, PHASE_END: w, PHASE_CANCEL: E}, e.fn.swipe.directions = {LEFT: t, RIGHT: n, UP: r, DOWN: i, IN: s, OUT: o}, e.fn.swipe.pageScroll = {NONE: u, HORIZONTAL: d, VERTICAL: v, AUTO: a}, e.fn.swipe.fingers = {ONE: 1, TWO: 2, THREE: 3, ALL: m}
})(jQuery), define("jquery.touchswap", function () {
}), define("modules/widget/slider", ["require", "exports", "module", "jquery.touchswap", "juicer"], function (e, t, n) {
    e("jquery.touchswap");
    var r = Backbone.View.extend({options: {effect: "fade"}, events: {"click .J_toggle": "toggle", "click .J_goto": "goto", mouseenter: "pause", mouseleave: "play"}, initialize: function (e) {
        var t = this;
        this.render(e.data), this.current = 0, this.show(this.current), this.$el.swipe({swipe: function (e, n, r, i, s) {
            n == "right" ? t.go("prev") : t.go("next")
        }, excludedElements: [], fingers: "all"}), this.play()
    }, render: function (t) {
        var n = e("juicer"), r;
        if (t)this.count = t.length, this.$el.html(n.to_html(this.tpl, {images: t})); else {
            var i = this.count = this.$el.find("li").length, s = [];
            for (var o = 0; o < i; o++)o == 0 ? s.push('<a href="javascript:;" class="J_goto cur" data-index="' + o + '">●</a>') : s.push('<a href="javascript:;" class="J_goto" data-index="' + o + '">●</a>');
            r = this.$el.find(".J_nav"), r.html(s.join(""))
        }
        r = r || this.$el.find(".J_nav"), r.css("margin-left", 0 - r.width() / 2), this.$item = this.$el.find("li"), this.$pointer = r.find("a"), this.options.effect == "slide" && this.slideInit()
    }, tpl: ['<a href="javascript:;" class="index_focus_pre J_toggle" data-direction="prev" title="上一张">上一张</a>', '<a href="javascript:;" class="index_focus_next J_toggle" data-direction="next" title="下一张">下一张</a>', "<ul>", "{@each images as image}", "<li>", '<a href="#" class="pic" title="">', '<div class="index_focus_info">', "<h3>{{image.title}}</h3>", '<p class="text">{{{image.text}}}</p>', "</div>", '<img class="pic" src="{{image.src}}" width="1600" height="600" alt=""/>', "</a>", "</li>", "{@/each}", "</ul>", '<div class="slide_nav J_nav">', "{@each images as image,index}", '<a href="javascript:;" class="J_goto" data-index="{{index}}"{@if index==0} class="cur"{@/if}>●</a>', "{@/each}", "</div>"].join(""), toggle: function (e) {
        var t = $(e.currentTarget).data().direction;
        this.go(t)
    }, go: function (e) {
        if (e == "prev") {
            var t = this.current - 1;
            t < 0 && (t = this.count - 1)
        } else {
            var t = this.current + 1;
            t >= this.count && (t = 0)
        }
        this.show(t, e)
    }, "goto": function (e) {
        var t = $(e.currentTarget).data().index;
        this.current != t && this.show(t, this.current > t ? "prev" : "next")
    }, auto: function () {
        var e = this;
        clearTimeout(this._t), this.isPause || (this._t = setTimeout(function () {
            e.go("next")
        }, 7e3))
    }, show: function (e, t) {
        var n = $(this.$item[this.current]), r = $(this.$item[e]);
        this.options.effect == "fade" ? this.fade(n, r) : this.options.effect == "slide" && (t ? this.slide(n, r, t) : (r.show(), this.onShowNext(r))), $(this.$pointer[this.current]).removeClass("cur"), $(this.$pointer[e]).addClass("cur"), this.current = e
    }, fade: function (e, t) {
        var n = this;
        e.stop(!0, !0).fadeOut(600, function () {
            n.onHidePrev(e)
        }), t.stop(!0, !0).fadeIn(600, function () {
            n.onShowNext($(this))
        })
    }, slide: function (e, t, n) {
        var r = this, i = t.clone().show(), s;
        n == "next" ? (e.after(i), s = -this.imgWidth) : n == "prev" && (e.before(i), this.$ul.css("margin-left", -this.imgWidth), s = 0), this.$ul.stop(!0, !0).animate({"margin-left": s}, 600, function () {
            i.remove(), e.hide(), t.show(), r.$ul.css("margin-left", 0), r.onHidePrev(e), r.onShowNext(t)
        })
    }, slideInit: function () {
        this.$ul = this.$el.find("ul"), this.imgWidth = this.$item.width(), this.$ul.css("width", this.imgWidth * 2)
    }, onHidePrev: function (e) {
        this.findInfo(e).hide(), this.findTitle(e).stop(!0, !0).hide(), this.findText(e).hide()
    }, onShowNext: function (e) {
        var t = this;
        this.findInfo(e).show(), this.findTitle(e).fadeIn().queue(function () {
            var n = $(this);
            t.findText(e).fadeIn(function () {
                n.dequeue()
            })
        }), this.auto()
    }, findInfo: function (e) {
        return e.find(".index_focus_info")
    }, findTitle: function (e) {
        return e.find("h3")
    }, findDesc: function (e) {
        return e.find("h4")
    }, findText: function (e) {
        return e.find(".text")
    }, pause: function () {
        clearTimeout(this._t), this.isPause = !0
    }, play: function () {
        this.isPause = !1, this.auto()
    }}), i = function (e, t) {
        var n = t || {};
        return n.el = e, new r(n)
    };
    n.exports = i
}), define("app/main/tray", ["require", "exports", "module", "juicer"], function (e, t, n) {
    var r = e("juicer"), i = Backbone.View.extend({options: {tpl: "", data: [], fetchUrl: "", initSize: 6, commonSize: 12, sWidth: 1340, mWidth: 1566}, events: {"click .J_prev": "goPrev", "click .J_next": "goNext", "click .J_area": "loadArea"}, initialize: function () {
        var e = this;
        this.lazy = !0, this.initIfInViewport();
        var t = _.bind(_.throttle(this.initIfInViewport, 200), this), n = _.bind(_.throttle(this.resizeRender, 0), this);
        $(window).scroll(function () {
            e.lazy && t()
        }), $(window).resize(function () {
            e.lazy ? t() : n()
        })
    }, initIfInViewport: function () {
        this.inViewport() && (this.lazy = !1, this.adjustDimensions(), this.data = this.options.data, this.firstSize = this.initSize, this.start = 0, this.end = this.getEnd(this.start), this.refreshElements(), this.$current = this.$sliderUl.find("li"), this.$firstRec = this.$current.find("div").eq(0), this.renderVideos(this.$current, this.data.slice(this.start, this.end)), this.showOrHideNext(), this.trigger("init"))
    }, inViewport: function () {
        var e = $(window), t = this.$el.offset().top, n = this.$el.height();
        return e.height() + e.scrollTop() >= t && e.scrollTop() <= t + n
    }, resizeRender: function () {
        this.adjustDimensions(), this.$sliderUl.empty(), this.$current = this.addLi();
        var e = this.data.length - this.commonSize;
        this.start > e && (this.start = e), this.end = this.getEnd(this.start), this.renderVideos(this.$current, this.data.slice(this.start, this.end)).show(), this.showOrHidePre(), this.showOrHideNext()
    }, adjustDimensions: function () {
        var e = this.options.commonSize / 6, t = $("body").width();
        t < this.options.sWidth ? (this.initSize = this.options.initSize - e * 2, this.commonSize = this.options.commonSize - e * 2) : t < this.options.mWidth ? (this.initSize = this.options.initSize - e, this.commonSize = this.options.commonSize - e) : (this.initSize = this.options.initSize, this.commonSize = this.options.commonSize)
    }, refreshElements: function () {
        this.$prev = this.$el.find(".J_prev"), this.$next = this.$el.find(".J_next"), this.$sliderOverflow = this.$el.find(".index_list_auto"), this.$sliderUl = this.$sliderOverflow.find("ul"), this.$area = this.$el.find(".J_area")
    }, renderVideos: function (e, t) {
        var n = this, i = this.params && this.params.area, s = this.options.special == "vchart" || !i || i == "all";
        s ? (this.firstSize = this.initSize, this.start == 0 && this.end <= this.initSize && e.append(this.$firstRec)) : this.firstSize = this.commonSize, e.append(r.to_html(this.options.tpl, {videos: t}));
        if (t.length > 0) {
            var o = 0, u = Math.max(t.length - 2, 1);
            e.find("img").load(function () {
                $(this).next().show(), o++;
                if (o > u)return;
                o >= u && (n.removeLoading(), n.$sliderUl.fadeIn())
            })
        } else n.removeLoading(), n.$sliderUl.fadeIn();
        return e
    }, showOrHidePre: function () {
        var e = this.params && this.params.area, t = this.options.special == "vchart" || !e || e == "all";
        t ? this.start == 0 && this.end <= this.initSize ? this.$prev.hide() : this.$prev.show() : this.start == 0 ? this.$prev.hide() : this.$prev.show()
    }, showOrHideNext: function () {
        this.end == this.data.length ? this.$next.hide() : this.$next.show()
    }, goPrev: function () {
        if (this.sliding)return;
        var e = this.end = this.start, t = !1;
        this.end < this.commonSize && (this.end = this.firstSize, t = !0), this.start = this.getStart(this.end);
        var n = this.$current, r = n.prev(), i = this.getEnd(this.start);
        r.length == 0 && (r = this.addLi(!0), this.renderVideos(r, this.data.slice(this.start, this.end))), this.slideFx(n, r, "left", this.end - e, t), this.$next.show(), this.showOrHidePre()
    }, goNext: function () {
        if (this.sliding)return;
        var e = this.start = this.end, t = this.data.length - this.commonSize, n = !1;
        this.start > t && (this.start = t, n = !0), this.end = this.getEnd(this.start, this.commonSize);
        var r = this.$current, i = r.next();
        i.length == 0 && (i = this.addLi(), this.renderVideos(i, this.data.slice(this.start, this.end))), this.slideFx(r, i, "right", e - this.start, n), this.$prev.show(), this.showOrHideNext()
    }, slideFx: function (e, t, n, r, i) {
        this.sliding = !0;
        var s = this, o = this.$sliderUl.width(), u = 0, a = 0, f = r > 0 ? r * o / this.commonSize : 0;
        this.$sliderOverflow.addClass("overflow"), n == "right" ? a = -o + f : (u = -o + f, a = 0), this.$sliderUl.css({width: o * 2, "margin-left": u}), r > 0 && (n == "right" ? t.find(".mv_pic").slice(0, r).hide() : e.find(".mv_pic").slice(0, r).hide()), t.show(), this.$sliderUl.stop(!0, !0).animate({"margin-left": a}, 800, function () {
            e.hide(), t.find(".mv_pic").show(), s.$sliderUl.css({"margin-left": 0, width: ""}), s.$sliderOverflow.removeClass("overflow"), s.$current = t, i && s.$sliderUl.find(">li").not(s.$current).remove(), s.sliding = !1
        })
    }, addLi: function (e) {
        var t = $('<li class="index_list" style="display: none"></li>');
        return e ? t.prependTo(this.$sliderUl) : t.appendTo(this.$sliderUl)
    }, getStart: function (e) {
        var t = e - this.commonSize;
        return Math.max(t, 0)
    }, getEnd: function (e, t) {
        if (!t)var t = e == 0 ? this.firstSize : this.commonSize;
        return Math.min(e + t, this.data.length)
    }, loadArea: function (e) {
        var t = this, n = $(e.currentTarget);
        if (n.hasClass("cur"))return;
        this.$sliderUl.hide(), this.showLoading(), this.$area.removeClass("cur"), n.addClass("cur");
        var i = n.data("area");
        this.params = {area: i}, $.getJSON(this.options.fetchUrl, this.params, function (e) {
            t.start = 0, t.options.special == "vchart" ? (t.data = e.videos.concat([
                {type: "trends", area: i.toUpperCase()},
                {type: "v", area: i.toUpperCase()}
            ]), t.$firstRec = $(r.to_html($("#vchart_rec_tpl").html(), e.rec))) : t.data = e, t.$sliderUl.empty(), t.$current = t.addLi(), t.options.special == "vchart" || i == "all" ? (t.firstSize = t.initSize, t.end = t.getEnd(t.start), t.$firstRec.appendTo(t.$current), t.renderVideos(t.$current, t.data.slice(t.start, t.end)).show()) : (t.firstSize = t.commonSize, t.end = t.getEnd(t.start), t.renderVideos(t.$current, t.data.slice(t.start, t.end)).show()), t.showOrHidePre(), t.showOrHideNext(), t.trigger("loadArea", i)
        })
    }, showLoading: function () {
        $('<span class="ico_loading"></span>').appendTo(this.$el)
    }, removeLoading: function () {
        this.$el.find(".ico_loading").remove()
    }});
    n.exports = i
}), function () {
    function e() {
        try {
            return i in n && n[i]
        } catch (e) {
            return!1
        }
    }

    var t = {}, n = window, r = n.document, i = "localStorage", s = "__storejs__", o;
    t.disabled = !1, t.set = function (e, t) {
    }, t.get = function (e) {
    }, t.remove = function (e) {
    }, t.clear = function () {
    }, t.transact = function (e, n, r) {
        var i = t.get(e);
        r == null && (r = n, n = null), typeof i == "undefined" && (i = n || {}), r(i), t.set(e, i)
    }, t.getAll = function () {
    }, t.serialize = function (e) {
        return JSON.stringify(e)
    }, t.deserialize = function (e) {
        if (typeof e != "string")return undefined;
        try {
            return JSON.parse(e)
        } catch (t) {
            return e || undefined
        }
    };
    if (e())o = n[i], t.set = function (e, n) {
        return n === undefined ? t.remove(e) : (o.setItem(e, t.serialize(n)), n)
    }, t.get = function (e) {
        return t.deserialize(o.getItem(e))
    }, t.remove = function (e) {
        o.removeItem(e)
    }, t.clear = function () {
        o.clear()
    }, t.getAll = function () {
        var e = {};
        for (var n = 0; n < o.length; ++n) {
            var r = o.key(n);
            e[r] = t.get(r)
        }
        return e
    }; else if (r.documentElement.addBehavior) {
        var u, a;
        try {
            a = new ActiveXObject("htmlfile"), a.open(), a.write('<script>document.w=window</script><iframe src="/favicon.ico"></iframe>'), a.close(), u = a.w.frames[0].document, o = u.createElement("div")
        } catch (f) {
            o = r.createElement("div"), u = r.body
        }
        function l(e) {
            return function () {
                var n = Array.prototype.slice.call(arguments, 0);
                n.unshift(o), u.appendChild(o), o.addBehavior("#default#userData"), o.load(i);
                var r = e.apply(t, n);
                return u.removeChild(o), r
            }
        }

        var c = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");

        function h(e) {
            return e.replace(c, "___")
        }

        t.set = l(function (e, n, r) {
            return n = h(n), r === undefined ? t.remove(n) : (e.setAttribute(n, t.serialize(r)), e.save(i), r)
        }), t.get = l(function (e, n) {
            return n = h(n), t.deserialize(e.getAttribute(n))
        }), t.remove = l(function (e, t) {
            t = h(t), e.removeAttribute(t), e.save(i)
        }), t.clear = l(function (e) {
            var t = e.XMLDocument.documentElement.attributes;
            e.load(i);
            for (var n = 0, r; r = t[n]; n++)e.removeAttribute(r.name);
            e.save(i)
        }), t.getAll = l(function (e) {
            var n = e.XMLDocument.documentElement.attributes, r = {};
            for (var i = 0, s; s = n[i]; ++i) {
                var o = h(s.name);
                r[s.name] = t.deserialize(e.getAttribute(o))
            }
            return r
        })
    }
    try {
        t.set(s, s), t.get(s) != s && (t.disabled = !0), t.remove(s)
    } catch (f) {
        t.disabled = !0
    }
    t.enabled = !t.disabled, typeof module != "undefined" && module.exports ? module.exports = t : typeof define == "function" && define.amd ? define("store", t) : this.store = t
}(), define("app/main/index", ["require", "exports", "module", "modules/widget/slider", "juicer", "user", "app/main/tray", "store"], function (e, t, n) {
    function g() {
        var e = $(window), t = p.offset().top, n = p.height();
        return e.height() + e.scrollTop() >= t + n - 700
    }

    function y() {
        if (m)return;
        d ? v || g() && (m = !0, $.get("/ajax/third", function (e) {
            m = !1, v = !0, p.append(e)
        })) : g() && (m = !0, $.get("/ajax/second", function (e) {
            m = !1, d = !0, p.append(e)
        }))
    }

    var r = 1600, i = 600, s = $(".index_focus"), o = 1340, u = 1566, a = $(".index_auto"), f, l = function () {
        var e = $("body").width(), t = r, n = i;
        if (e < r)var t = e, n = e * i / r;
        s.add(s.find("img")).css({width: t, height: n}), e < o ? (a.removeClass("index_m").addClass("index_s"), f = "small") : e < u ? (a.removeClass("index_s").addClass("index_m"), f = "middle") : (a.removeClass("index_s index_m"), f = "large")
    };
    l();
    var c = _.throttle(l, 200), h = e("modules/widget/slider");
    new h(s);
    var p = $(".index_content"), d = !1, v = !1, m = !1, b = _.throttle(y, 200);
    $(window).resize(function () {
        c(), b()
    }), $(window).scroll(function () {
        b()
    }), y();
    var w, E, S = "/mv/get-video-info", x = $("#video_info_tpl").html(), T = e("juicer"), N = function (e) {
        var t = $(e.currentTarget);
        w = setTimeout(function () {
            k();
            var e = t.find(".mv_pic_info");
            e.length == 0 && (e = $('<div class="mv_pic_info"></div>').appendTo(t)), e.find("p").length == 0 && (E = $.getJSON(S, "videoId=" + t.data("videoId"), function (t) {
                e.html(T.to_html(x, t.video))
            })), e.stop(!0, !0), t.addClass("mv_hover"), e.animate({height: 148}, 300)
        }, 500)
    }, C = function (e) {
        clearTimeout(w), E && E.abort();
        var t = $(e.currentTarget);
        t.find(".mv_pic_info").stop(!0, !0).animate({height: 0}, 400, function () {
            t.removeClass("mv_hover")
        })
    }, k = function () {
        E && E.abort(), p.find(".J_mv").removeClass("mv_hover")
    };
    p.on("mouseenter", ".J_mv",function (e) {
        N(e)
    }).on("mouseleave", ".J_mv", function (e) {
        C(e)
    });
    var L = e("user"), A = Backbone.View.extend({events: {"click .J_render": "render", "click .J_login_dialog": "popLogin"}, initialize: function () {
        var e = this;
        this.videos = this.options.data, this.load(), L.isLogined() ? $(".index_login").hide() : L.logined(function () {
            e.load(), $(".index_login").hide()
        }), this.$ul = this.$el.find("ul");
        var t = _.bind(_.throttle(this.render, 200), this);
        $(window).resize(function () {
            t()
        })
    }, dynamicSize: {small: 4, middle: 5, large: 6}, popLogin: function () {
        e(["loginBox"], function (e) {
            e.show()
        })
    }, load: function () {
        var e = this;
        $.getJSON("/mv/get-guess", "userId=" + L.get("userId"), function (t) {
            e.oVideos = t.video, e.videos = _.clone(e.oVideos), e.render()
        })
    }, render: function () {
        var e = this, t = this.getRondomVideos(this.dynamicSize[f]);
        this.$ul.hide(), this.showLoading(), this.$ul.find("li").html(T.to_html(this.options.tpl, {videos: t}));
        if (t.length > 0) {
            var n = 0, r = Math.max(t.length - 2, 1);
            this.$ul.find("img").load(function () {
                $(this).next().show(), n++;
                if (n > r)return;
                n >= r && (e.removeLoading(), e.$ul.fadeIn())
            })
        } else e.removeLoading()
    }, getRondomVideos: function (e) {
        var t = [];
        for (var n = 0; n < e; n++) {
            var r = Math.floor(Math.random() * this.videos.length);
            t = t.concat(this.videos.splice(r, 1))
        }
        return this.videos.length == 0 && (this.videos = _.clone(this.oVideos)), t
    }, showLoading: function () {
        $('<span class="ico_loading"></span>').appendTo(this.$el)
    }, removeLoading: function () {
        this.$el.find(".ico_loading").remove()
    }}), O = e("app/main/tray");
    t.Tray = O, t.Recommend = A, t.store = e("store")
});