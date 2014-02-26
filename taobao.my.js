/* http://360.taobao.com/?spm=a1z0k.1000778.1000385.17.owUpsK&id=27053100399 pub-1|2013-08-15 09:38:28*/
(function () {
    var E = (function () {
        var S, al, af, ag, an;

        function ah() {
            S = localStorage;
            al = function (ap, aq) {
                S.setItem(ap, aq)
            };
            af = function (ap) {
                return S.getItem(ap)
            };
            ag = function (ap) {
                S.removeItem(ap)
            };
            an = function () {
                S.clear()
            }
        }

        function aj() {
            var ap = "IELocalDataStore";
            am();
            al = function (aq, ar) {
                try {
                    S.setAttribute(aq, ar);
                    S.save(ap)
                } catch (at) {
                }
            };
            af = function (aq) {
                try {
                    S.load(ap);
                    return S.getAttribute(aq)
                } catch (ar) {
                }
            };
            ag = function (aq) {
                try {
                    S.removeAttribute(aq);
                    S.save(ap)
                } catch (ar) {
                }
            };
            an = function () {
                try {
                    S.expires = ae();
                    S.save(ap);
                    ai()
                } catch (aq) {
                }
            }
        }

        function am() {
            var ap = document;
            S = ap.createElement("link");
            if (S.addBehavior) {
                S.style.behavior = "url(#default#userData)";
                ap.getElementsByTagName("head")[0].appendChild(S)
            }
        }

        function ai() {
            if (S) {
                try {
                    document.body.removeChild(S)
                } catch (ap) {
                }
            }
            am()
        }

        function ae() {
            var ap = new Date;
            ap.setMinutes(ap.getMinutes() - 1);
            return ap.toUTCString()
        }

        function ao() {
            if (typeof localStorage !== "undefined") {
                ah()
            } else {
                if (KISSY.UA.ie < 8) {
                    aj()
                }
            }
        }

        ao();
        var ak = {setItem: al, getItem: af, removeItem: ag, clear: an};
        return ak
    });
    var I = (function () {
        var ah = KISSY, am = ah.DOM, ak = ah.Event;
        var al = E();

        function aj(S) {
            this._targetElement = S
        }

        function an(S) {
            if (ae.call(self, S)) {
                ai()
            }
        }

        function ai() {
            var S = am.create("<div class='introjs'><div class='intro-content' id='J_intro_content'></div><div class='introjs-exit-btn' id='J_Intro_Exit'></div><div class='introjs-start-banner' id='J_start_banner'></div></div>");
            am.append(S, ".introjs-overlay")
        }

        function ae(ap) {
            var S = document.createElement("div"), ao = this;
            S.className = "introjs-overlay";
            S.id = "introjs-overlay-id";
            ap.appendChild(S);
            return true
        }

        var af = function (ao) {
            if (typeof ao === "object") {
                return new aj(ao)
            } else {
                if (typeof ao === "string") {
                    var S = ah.get(ao);
                    if (S) {
                        return new aj(S)
                    } else {
                        throw new Error("There is no element with given selector.")
                    }
                } else {
                    return new aj(document.body)
                }
            }
        };

        function ag(S) {
            am.remove(".introjs-1");
            am.remove("#introjs-overlay-id")
        }

        af.fn = aj.prototype = {start: function () {
            if (al.getItem("profile_newHere") && location.href.indexOf("profile_newHere") == -1) {
                return
            }
            if (!al.getItem("profile_newHere") || location.href.indexOf("profile_newHere") > -1) {
                al.setItem("profile_newHere", 1);
                an.call(this, this._targetElement);
                return this
            }
        }, exit: function () {
            try {
                ag.call(this, this._targetElement)
            } catch (S) {
                ah.log(S)
            }
        }};
        return af
    })();
    var A = (function () {
        function S(ae) {
            return ae.indexOf("?") > -1
        }

        return S
    })();
    var z = (function () {
        function S(af) {
            var ag = A(af) ? "&" : "?", ae = (new Date).getTime();
            return af + ag + "t=" + ae
        }

        return S
    })();
    var W = (function () {
        var ag = KISSY, aj = ag.DOM, ae = ag.Event;
        var af = z;

        function ai(S) {
            if (!S) {
                return
            }
            var al = "hold_" + (new Date).getTime(), ak = window[al] = new Image;
            ak.onload = ak.onerror = function () {
                window[al] = null
            };
            ak.src = S;
            ak = null
        }

        function ah(al, ak) {
            if (!ak) {
                ag.log("log code \u5fc5\u987b\uff01");
                return
            }
            al = ag.merge(al, {url: encodeURI(location.href.replace(location.hash, ""))});
            var S = "http://log.mmstat.com/" + ak + "?" + ag.param(al);
            ag.log("\u57cb\u70b9\u53d1\u51fa\uff1a" + S);
            ai(af(S))
        }

        return{log: ah}
    })();
    var D = (function () {
        var af = KISSY, ag = af.DOM, ae = af.Event;
        return function () {
            if (ag.scrollTop() == 0) {
                return
            }
            var S = /webkit/i.test(navigator.userAgent) || document.compatMode == "BackCompat" ? document.body : document.documentElement;
            af.one(S).animate({scrollTop: 0}, 0.5, "easeOut")
        }
    })();
    var d = (function () {
        var ah = KISSY, ai = ah.DOM, af = ah.Event;
        var ag = D;
        var ae = W;
        af.on(".J_Add_Fav", "click", function (aj) {
            ae.log({btn: "collect"}, "tbgltjph.1.2.4");
            var ak = ai.attr(aj.currentTarget, "data-url") || location.href;
            var S = ai.attr(aj.currentTarget, "data-title") || document.title;
            try {
                window.external.addFavorite(ak, S)
            } catch (al) {
                try {
                    window.sidebar.addPanel(S, ak, "")
                } catch (al) {
                    alert("\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u8fd9\u6837\u6dfb\u52a0\uff0c\u4f7f\u7528Ctrl+D\u8fdb\u884c\u6dfb\u52a0\u5427\u3002")
                }
            }
        });
        af.on(".J_Go_Top", "click", function (S) {
            ae.log({btn: "top"}, "tbgltjph.1.2.4");
            S.halt();
            ag()
        });
        af.on(".feed-back", "click", function (S) {
            ae.log({btn: "feedback"}, "tbgltjph.1.2.4")
        })
    })();
    var a = (function () {
        function S(af) {
            if (!af) {
                return
            }
            var ah = "hold_" + (new Date).getTime(), ag = window[ah] = new Image;
            ag.onload = ag.onerror = function () {
                window[ah] = null
            };
            ag.src = af;
            ag = null
        }

        function ae(ai, ag) {
            var ah = g.unparam(ag.substr(ag.indexOf("?") + 1))["type"];
            if (ai) {
                var af = "http://log.mmstat.com/" + ai + "?t=" + (new Date).getTime() + "&type=" + ah;
                S(af)
            }
        }

        return ae
    })();
    var u = (function () {
        (function (al) {
            var ah = "0.3.4", am = "hasOwnProperty", ae = /[\.\/]/, S = "*", aj = function () {
            }, ai = function (ap, ao) {
                return ap - ao
            }, ag, ak, an = {n: {}}, af = function (ao, aE) {
                var ay = an, av = ak, az = Array.prototype.slice.call(arguments, 2), aB = af.listeners(ao), aA = 0, ax = false, ar, aq = [], aw = {}, at = [], ap = ag, aC = [];
                ag = ao;
                ak = 0;
                for (var au = 0, aD = aB.length; au < aD; au++) {
                    if ("zIndex" in aB[au]) {
                        aq.push(aB[au].zIndex);
                        if (aB[au].zIndex < 0) {
                            aw[aB[au].zIndex] = aB[au]
                        }
                    }
                }
                aq.sort(ai);
                while (aq[aA] < 0) {
                    ar = aw[aq[aA++]];
                    at.push(ar.apply(aE, az));
                    if (ak) {
                        ak = av;
                        return at
                    }
                }
                for (au = 0; au < aD; au++) {
                    ar = aB[au];
                    if ("zIndex" in ar) {
                        if (ar.zIndex == aq[aA]) {
                            at.push(ar.apply(aE, az));
                            if (ak) {
                                break
                            }
                            do {
                                aA++;
                                ar = aw[aq[aA]];
                                ar && at.push(ar.apply(aE, az));
                                if (ak) {
                                    break
                                }
                            } while (ar)
                        } else {
                            aw[ar.zIndex] = ar
                        }
                    } else {
                        at.push(ar.apply(aE, az));
                        if (ak) {
                            break
                        }
                    }
                }
                ak = av;
                ag = ap;
                return at.length ? at : null
            };
            af.listeners = function (ao) {
                var ax = ao.split(ae), av = an, aB, aw, ap, at, aA, ar, au, ay, az = [av], aq = [];
                for (at = 0, aA = ax.length; at < aA; at++) {
                    ay = [];
                    for (ar = 0, au = az.length; ar < au; ar++) {
                        av = az[ar].n;
                        aw = [av[ax[at]], av[S]];
                        ap = 2;
                        while (ap--) {
                            aB = aw[ap];
                            if (aB) {
                                ay.push(aB);
                                aq = aq.concat(aB.f || [])
                            }
                        }
                    }
                    az = ay
                }
                return aq
            };
            af.on = function (ao, ar) {
                var au = ao.split(ae), at = an;
                for (var ap = 0, aq = au.length; ap < aq; ap++) {
                    at = at.n;
                    !at[au[ap]] && (at[au[ap]] = {n: {}});
                    at = at[au[ap]]
                }
                at.f = at.f || [];
                for (ap = 0, aq = at.f.length; ap < aq; ap++) {
                    if (at.f[ap] == ar) {
                        return aj
                    }
                }
                at.f.push(ar);
                return function (av) {
                    if (+av == +av) {
                        ar.zIndex = +av
                    }
                }
            };
            af.stop = function () {
                ak = 1
            };
            af.nt = function (ao) {
                if (ao) {
                    return new RegExp("(?:\\.|\\/|^)" + ao + "(?:\\.|\\/|$)").test(ag)
                }
                return ag
            };
            af.off = af.unbind = function (ap, av) {
                var ax = ap.split(ae), aw, az, aq, at, aA, ar, au, ay = [an];
                for (at = 0, aA = ax.length; at < aA; at++) {
                    for (ar = 0; ar < ay.length; ar += aq.length - 2) {
                        aq = [ar, 1];
                        aw = ay[ar].n;
                        if (ax[at] != S) {
                            if (aw[ax[at]]) {
                                aq.push(aw[ax[at]])
                            }
                        } else {
                            for (az in aw) {
                                if (aw[am](az)) {
                                    aq.push(aw[az])
                                }
                            }
                        }
                        ay.splice.apply(ay, aq)
                    }
                }
                for (at = 0, aA = ay.length; at < aA; at++) {
                    aw = ay[at];
                    while (aw.n) {
                        if (av) {
                            if (aw.f) {
                                for (ar = 0, au = aw.f.length; ar < au; ar++) {
                                    if (aw.f[ar] == av) {
                                        aw.f.splice(ar, 1);
                                        break
                                    }
                                }
                                !aw.f.length && delete aw.f
                            }
                            for (az in aw.n) {
                                if (aw.n[am](az) && aw.n[az].f) {
                                    var ao = aw.n[az].f;
                                    for (ar = 0, au = ao.length; ar < au; ar++) {
                                        if (ao[ar] == av) {
                                            ao.splice(ar, 1);
                                            break
                                        }
                                    }
                                    !ao.length && delete aw.n[az].f
                                }
                            }
                        } else {
                            delete aw.f;
                            for (az in aw.n) {
                                if (aw.n[am](az) && aw.n[az].f) {
                                    delete aw.n[az].f
                                }
                            }
                        }
                        aw = aw.n
                    }
                }
            };
            af.once = function (ao, ap) {
                var aq = function () {
                    var ar = ap.apply(this, arguments);
                    af.unbind(ao, aq);
                    return ar
                };
                return af.on(ao, aq)
            };
            af.version = ah;
            af.toString = function () {
                return"You are running Eve " + ah
            };
            (typeof module != "undefined" && module.exports) ? (module.exports = af) : (typeof define != "undefined" ? (define("eve", [], function () {
                return af
            })) : (al.eve = af))
        })(window);
        (function () {
            function bE(cz) {
                if (bE.is(cz, "function")) {
                    return bc ? cz() : eve.on("raphael.DOMload", cz)
                } else {
                    if (bE.is(cz, b0)) {
                        return bE._engine.create[ct](bE, cz.splice(0, 3 + bE.is(cz[0], by))).add(cz)
                    } else {
                        var S = Array.prototype.slice.call(arguments, 0);
                        if (bE.is(S[S.length - 1], "function")) {
                            var cy = S.pop();
                            return bc ? cy.call(bE._engine.create[ct](bE, S)) : eve.on("raphael.DOMload", function () {
                                cy.call(bE._engine.create[ct](bE, S))
                            })
                        } else {
                            return bE._engine.create[ct](bE, arguments)
                        }
                    }
                }
            }

            bE.version = "2.1.0";
            bE.eve = eve;
            var bc, ae = /[, ]+/, cj = {circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1}, ce = /\{(\d+)\}/g, cw = "prototype", a8 = "hasOwnProperty", bn = {doc: document, win: window}, at = {was: Object.prototype[a8].call(bn.win, "Raphael"), is: bn.win.Raphael}, cs = function () {
                this.ca = this.customAttributes = {}
            }, bR, cb = "appendChild", ct = "apply", cr = "concat", aX = "createTouch" in bn.doc, bK = "", bD = " ", cu = String, aF = "split", aQ = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[aF](bD), ck = {mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend"}, cx = cu.prototype.toLowerCase, bh = Math, am = bh.max, b9 = bh.min, bj = bh.abs, cc = bh.pow, bI = bh.PI, by = "number", a7 = "string", b0 = "array", bS = "toString", bW = "fill", bO = Object.prototype.toString, cm = {}, aj = "push", ah = bE._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i, aB = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i, bi = {"NaN": 1, "Infinity": 1, "-Infinity": 1}, af = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, a5 = bh.round, aA = "setAttribute", bb = parseFloat, aS = parseInt, cg = cu.prototype.toUpperCase, ar = bE._availableAttrs = {"arrow-end": "none", "arrow-start": "none", blur: 0, "clip-rect": "0 0 1e9 1e9", cursor: "default", cx: 0, cy: 0, fill: "#fff", "fill-opacity": 1, font: '10px "Arial"', "font-family": '"Arial"', "font-size": "10", "font-style": "normal", "font-weight": 400, gradient: 0, height: 0, href: "http://raphaeljs.com/", "letter-spacing": 0, opacity: 1, path: "M0,0", r: 0, rx: 0, ry: 0, src: "", stroke: "#000", "stroke-dasharray": "", "stroke-linecap": "butt", "stroke-linejoin": "butt", "stroke-miterlimit": 0, "stroke-opacity": 1, "stroke-width": 1, target: "_blank", "text-anchor": "middle", title: "Raphael", transform: "", width: 0, x: 0, y: 0}, bf = bE._availableAnimAttrs = {blur: by, "clip-rect": "csv", cx: by, cy: by, fill: "colour", "fill-opacity": by, "font-size": by, height: by, opacity: by, path: "path", r: by, rx: by, ry: by, stroke: "colour", "stroke-opacity": by, "stroke-width": by, transform: "transform", width: by, x: by, y: by}, a0 = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g, b5 = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/, an = {hs: 1, rg: 1}, b3 = /,?([achlmqrstvxz]),?/gi, bN = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig, a6 = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig, bC = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig, bJ = bE._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, bH = {}, cd = function (cy, S) {
                return cy.key - S.key
            }, av = function (cy, S) {
                return bb(cy) - bb(S)
            }, aI = function () {
            }, co = function (S) {
                return S
            }, bm = bE._rectPath = function (S, cB, cy, cz, cA) {
                if (cA) {
                    return[
                        ["M", S + cA, cB],
                        ["l", cy - cA * 2, 0],
                        ["a", cA, cA, 0, 0, 1, cA, cA],
                        ["l", 0, cz - cA * 2],
                        ["a", cA, cA, 0, 0, 1, -cA, cA],
                        ["l", cA * 2 - cy, 0],
                        ["a", cA, cA, 0, 0, 1, -cA, -cA],
                        ["l", 0, cA * 2 - cz],
                        ["a", cA, cA, 0, 0, 1, cA, -cA],
                        ["z"]
                    ]
                }
                return[
                    ["M", S, cB],
                    ["l", cy, 0],
                    ["l", 0, cz],
                    ["l", -cy, 0],
                    ["z"]
                ]
            }, aK = function (S, cA, cz, cy) {
                if (cy == null) {
                    cy = cz
                }
                return[
                    ["M", S, cA],
                    ["m", 0, -cy],
                    ["a", cz, cy, 0, 1, 1, 0, 2 * cy],
                    ["a", cz, cy, 0, 1, 1, 0, -2 * cy],
                    ["z"]
                ]
            }, aN = bE._getPath = {path: function (S) {
                return S.attr("path")
            }, circle: function (cy) {
                var S = cy.attrs;
                return aK(S.cx, S.cy, S.r)
            }, ellipse: function (cy) {
                var S = cy.attrs;
                return aK(S.cx, S.cy, S.rx, S.ry)
            }, rect: function (cy) {
                var S = cy.attrs;
                return bm(S.x, S.y, S.width, S.height, S.r)
            }, image: function (cy) {
                var S = cy.attrs;
                return bm(S.x, S.y, S.width, S.height)
            }, text: function (S) {
                var cy = S._getBBox();
                return bm(cy.x, cy.y, cy.width, cy.height)
            }}, aL = bE.mapPath = function (cF, cC) {
                if (!cC) {
                    return cF
                }
                var cD, cB, cz, S, cE, cA, cy;
                cF = aU(cF);
                for (cz = 0, cE = cF.length; cz < cE; cz++) {
                    cy = cF[cz];
                    for (S = 1, cA = cy.length; S < cA; S += 2) {
                        cD = cC.x(cy[S], cy[S + 1]);
                        cB = cC.y(cy[S], cy[S + 1]);
                        cy[S] = cD;
                        cy[S + 1] = cB
                    }
                }
                return cF
            };
            bE._g = bn;
            bE.type = (bn.win.SVGAngle || bn.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
            if (bE.type == "VML") {
                var br = bn.doc.createElement("div"), bu;
                br.innerHTML = '<v:shape adj="1"/>';
                bu = br.firstChild;
                bu.style.behavior = "url(#default#VML)";
                if (!(bu && typeof bu.adj == "object")) {
                    return(bE.type = bK)
                }
                br = null
            }
            bE.svg = !(bE.vml = bE.type == "VML");
            bE._Paper = cs;
            bE.fn = bR = cs.prototype = bE.prototype;
            bE._id = 0;
            bE._oid = 0;
            bE.is = function (cy, S) {
                S = cx.call(S);
                if (S == "finite") {
                    return !bi[a8](+cy)
                }
                if (S == "array") {
                    return cy instanceof Array
                }
                return(S == "null" && cy === null) || (S == typeof cy && cy !== null) || (S == "object" && cy === Object(cy)) || (S == "array" && Array.isArray && Array.isArray(cy)) || bO.call(cy).slice(8, -1).toLowerCase() == S
            };
            function aV(cz) {
                if (Object(cz) !== cz) {
                    return cz
                }
                var cy = new cz.constructor;
                for (var S in cz) {
                    if (cz[a8](S)) {
                        cy[S] = aV(cz[S])
                    }
                }
                return cy
            }

            bE.angle = function (cB, cD, cz, cC, cy, cA) {
                if (cy == null) {
                    var S = cB - cz, cE = cD - cC;
                    if (!S && !cE) {
                        return 0
                    }
                    return(180 + bh.atan2(-cE, -S) * 180 / bI + 360) % 360
                } else {
                    return bE.angle(cB, cD, cy, cA) - bE.angle(cz, cC, cy, cA)
                }
            };
            bE.rad = function (S) {
                return S % 360 * bI / 180
            };
            bE.deg = function (S) {
                return S * 180 / bI % 360
            };
            bE.snapTo = function (cy, cA, S) {
                S = bE.is(S, "finite") ? S : 10;
                if (bE.is(cy, b0)) {
                    var cz = cy.length;
                    while (cz--) {
                        if (bj(cy[cz] - cA) <= S) {
                            return cy[cz]
                        }
                    }
                } else {
                    cy = +cy;
                    var cB = cA % cy;
                    if (cB < S) {
                        return cA - cB
                    }
                    if (cB > cy - S) {
                        return cA - cB + cy
                    }
                }
                return cA
            };
            var ai = bE.createUUID = (function (S, cy) {
                return function () {
                    return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(S, cy).toUpperCase()
                }
            })(/[xy]/g, function (cz) {
                var cy = bh.random() * 16 | 0, S = cz == "x" ? cy : (cy & 3 | 8);
                return S.toString(16)
            });
            bE.setWindow = function (S) {
                eve("raphael.setWindow", bE, bn.win, S);
                bn.win = S;
                bn.doc = bn.win.document;
                if (bE._engine.initWin) {
                    bE._engine.initWin(bn.win)
                }
            };
            var b2 = function (cz) {
                if (bE.vml) {
                    var S = /^\s+|\s+$/g;
                    var cB;
                    try {
                        var cC = new ActiveXObject("htmlfile");
                        cC.write("<body>");
                        cC.close();
                        cB = cC.body
                    } catch (cD) {
                        cB = createPopup().document.body
                    }
                    var cy = cB.createTextRange();
                    b2 = bt(function (cE) {
                        try {
                            cB.style.color = cu(cE).replace(S, bK);
                            var cF = cy.queryCommandValue("ForeColor");
                            cF = ((cF & 255) << 16) | (cF & 65280) | ((cF & 16711680) >>> 16);
                            return"#" + ("000000" + cF.toString(16)).slice(-6)
                        } catch (cG) {
                            return"none"
                        }
                    })
                } else {
                    var cA = bn.doc.createElement("i");
                    cA.title = "Rapha\xebl Colour Picker";
                    cA.style.display = "none";
                    bn.doc.body.appendChild(cA);
                    b2 = bt(function (cE) {
                        cA.style.color = cE;
                        return bn.doc.defaultView.getComputedStyle(cA, bK).getPropertyValue("color")
                    })
                }
                return b2(cz)
            }, bv = function () {
                return"hsb(" + [this.h, this.s, this.b] + ")"
            }, aM = function () {
                return"hsl(" + [this.h, this.s, this.l] + ")"
            }, ay = function () {
                return this.hex
            }, bL = function (cA, cz, S) {
                if (cz == null && bE.is(cA, "object") && "r" in cA && "g" in cA && "b" in cA) {
                    S = cA.b;
                    cz = cA.g;
                    cA = cA.r
                }
                if (cz == null && bE.is(cA, a7)) {
                    var cy = bE.getRGB(cA);
                    cA = cy.r;
                    cz = cy.g;
                    S = cy.b
                }
                if (cA > 1 || cz > 1 || S > 1) {
                    cA /= 255;
                    cz /= 255;
                    S /= 255
                }
                return[cA, cz, S]
            }, bP = function (cA, cz, S, cB) {
                cA *= 255;
                cz *= 255;
                S *= 255;
                var cy = {r: cA, g: cz, b: S, hex: bE.rgb(cA, cz, S), toString: ay};
                bE.is(cB, "finite") && (cy.opacity = cB);
                return cy
            };
            bE.color = function (S) {
                var cy;
                if (bE.is(S, "object") && "h" in S && "s" in S && "b" in S) {
                    cy = bE.hsb2rgb(S);
                    S.r = cy.r;
                    S.g = cy.g;
                    S.b = cy.b;
                    S.hex = cy.hex
                } else {
                    if (bE.is(S, "object") && "h" in S && "s" in S && "l" in S) {
                        cy = bE.hsl2rgb(S);
                        S.r = cy.r;
                        S.g = cy.g;
                        S.b = cy.b;
                        S.hex = cy.hex
                    } else {
                        if (bE.is(S, "string")) {
                            S = bE.getRGB(S)
                        }
                        if (bE.is(S, "object") && "r" in S && "g" in S && "b" in S) {
                            cy = bE.rgb2hsl(S);
                            S.h = cy.h;
                            S.s = cy.s;
                            S.l = cy.l;
                            cy = bE.rgb2hsb(S);
                            S.v = cy.b
                        } else {
                            S = {hex: "none"};
                            S.r = S.g = S.b = S.h = S.s = S.v = S.l = -1
                        }
                    }
                }
                S.toString = ay;
                return S
            };
            bE.hsb2rgb = function (cC, cF, cD, cA) {
                if (this.is(cC, "object") && "h" in cC && "s" in cC && "b" in cC) {
                    cD = cC.b;
                    cF = cC.s;
                    cC = cC.h;
                    cA = cC.o
                }
                cC *= 360;
                var cB, cE, cy, cz, S;
                cC = (cC % 360) / 60;
                S = cD * cF;
                cz = S * (1 - bj(cC % 2 - 1));
                cB = cE = cy = cD - S;
                cC = ~~cC;
                cB += [S, cz, 0, 0, cz, S][cC];
                cE += [cz, S, S, cz, 0, 0][cC];
                cy += [0, 0, cz, S, S, cz][cC];
                return bP(cB, cE, cy, cA)
            };
            bE.hsl2rgb = function (cD, cF, cB, cA) {
                if (this.is(cD, "object") && "h" in cD && "s" in cD && "l" in cD) {
                    cB = cD.l;
                    cF = cD.s;
                    cD = cD.h
                }
                if (cD > 1 || cF > 1 || cB > 1) {
                    cD /= 360;
                    cF /= 100;
                    cB /= 100
                }
                cD *= 360;
                var cC, cE, cy, cz, S;
                cD = (cD % 360) / 60;
                S = 2 * cF * (cB < 0.5 ? cB : 1 - cB);
                cz = S * (1 - bj(cD % 2 - 1));
                cC = cE = cy = cB - S / 2;
                cD = ~~cD;
                cC += [S, cz, 0, 0, cz, S][cD];
                cE += [cz, S, S, cz, 0, 0][cD];
                cy += [0, 0, cz, S, S, cz][cD];
                return bP(cC, cE, cy, cA)
            };
            bE.rgb2hsb = function (cD, cC, cy) {
                cy = bL(cD, cC, cy);
                cD = cy[0];
                cC = cy[1];
                cy = cy[2];
                var cB, cA, cz, cE;
                cz = am(cD, cC, cy);
                cE = cz - b9(cD, cC, cy);
                cB = (cE == 0 ? null : cz == cD ? (cC - cy) / cE : cz == cC ? (cy - cD) / cE + 2 : (cD - cC) / cE + 4);
                cB = ((cB + 360) % 6) * 60 / 360;
                cA = cE == 0 ? 0 : cE / cz;
                return{h: cB, s: cA, b: cz, toString: bv}
            };
            bE.rgb2hsl = function (cy, cC, cF) {
                cF = bL(cy, cC, cF);
                cy = cF[0];
                cC = cF[1];
                cF = cF[2];
                var cG, cB, cE, cD, cA, cz;
                cD = am(cy, cC, cF);
                cA = b9(cy, cC, cF);
                cz = cD - cA;
                cG = (cz == 0 ? null : cD == cy ? (cC - cF) / cz : cD == cC ? (cF - cy) / cz + 2 : (cy - cC) / cz + 4);
                cG = ((cG + 360) % 6) * 60 / 360;
                cE = (cD + cA) / 2;
                cB = (cz == 0 ? 0 : cE < 0.5 ? cz / (2 * cE) : cz / (2 - 2 * cE));
                return{h: cG, s: cB, l: cE, toString: aM}
            };
            bE._path2string = function () {
                return this.join(",").replace(b3, "$1")
            };
            function b7(cA, cz) {
                for (var S = 0, cy = cA.length; S < cy; S++) {
                    if (cA[S] === cz) {
                        return cA.push(cA.splice(S, 1)[0])
                    }
                }
            }

            function bt(cA, cy, S) {
                function cz() {
                    var cB = Array.prototype.slice.call(arguments, 0), cD = cB.join("\u2400"), cC = cz.cache = cz.cache || {}, cE = cz.count = cz.count || [];
                    if (cC[a8](cD)) {
                        b7(cE, cD);
                        return S ? S(cC[cD]) : cC[cD]
                    }
                    cE.length >= 1000 && delete cC[cE.shift()];
                    cE.push(cD);
                    cC[cD] = cA[ct](cy, cB);
                    return S ? S(cC[cD]) : cC[cD]
                }

                return cz
            }

            var ci = bE._preload = function (cz, cy) {
                var S = bn.doc.createElement("img");
                S.style.cssText = "position:absolute;left:-9999em;top:-9999em";
                S.onload = function () {
                    cy.call(this);
                    this.onload = null;
                    bn.doc.body.removeChild(this)
                };
                S.onerror = function () {
                    bn.doc.body.removeChild(this)
                };
                bn.doc.body.appendChild(S);
                S.src = cz
            };

            function be() {
                return this.hex
            }

            bE.getRGB = bt(function (S) {
                if (!S || !!((S = cu(S)).indexOf("-") + 1)) {
                    return{r: -1, g: -1, b: -1, hex: "none", error: 1, toString: be}
                }
                if (S == "none") {
                    return{r: -1, g: -1, b: -1, hex: "none", toString: be}
                }
                !(an[a8](S.toLowerCase().substring(0, 2)) || S.charAt() == "#") && (S = b2(S));
                var cB, cy, cz, cD, cA, cF, cE, cC = S.match(aB);
                if (cC) {
                    if (cC[2]) {
                        cD = aS(cC[2].substring(5), 16);
                        cz = aS(cC[2].substring(3, 5), 16);
                        cy = aS(cC[2].substring(1, 3), 16)
                    }
                    if (cC[3]) {
                        cD = aS((cF = cC[3].charAt(3)) + cF, 16);
                        cz = aS((cF = cC[3].charAt(2)) + cF, 16);
                        cy = aS((cF = cC[3].charAt(1)) + cF, 16)
                    }
                    if (cC[4]) {
                        cE = cC[4][aF](b5);
                        cy = bb(cE[0]);
                        cE[0].slice(-1) == "%" && (cy *= 2.55);
                        cz = bb(cE[1]);
                        cE[1].slice(-1) == "%" && (cz *= 2.55);
                        cD = bb(cE[2]);
                        cE[2].slice(-1) == "%" && (cD *= 2.55);
                        cC[1].toLowerCase().slice(0, 4) == "rgba" && (cA = bb(cE[3]));
                        cE[3] && cE[3].slice(-1) == "%" && (cA /= 100)
                    }
                    if (cC[5]) {
                        cE = cC[5][aF](b5);
                        cy = bb(cE[0]);
                        cE[0].slice(-1) == "%" && (cy *= 2.55);
                        cz = bb(cE[1]);
                        cE[1].slice(-1) == "%" && (cz *= 2.55);
                        cD = bb(cE[2]);
                        cE[2].slice(-1) == "%" && (cD *= 2.55);
                        (cE[0].slice(-3) == "deg" || cE[0].slice(-1) == "\xb0") && (cy /= 360);
                        cC[1].toLowerCase().slice(0, 4) == "hsba" && (cA = bb(cE[3]));
                        cE[3] && cE[3].slice(-1) == "%" && (cA /= 100);
                        return bE.hsb2rgb(cy, cz, cD, cA)
                    }
                    if (cC[6]) {
                        cE = cC[6][aF](b5);
                        cy = bb(cE[0]);
                        cE[0].slice(-1) == "%" && (cy *= 2.55);
                        cz = bb(cE[1]);
                        cE[1].slice(-1) == "%" && (cz *= 2.55);
                        cD = bb(cE[2]);
                        cE[2].slice(-1) == "%" && (cD *= 2.55);
                        (cE[0].slice(-3) == "deg" || cE[0].slice(-1) == "\xb0") && (cy /= 360);
                        cC[1].toLowerCase().slice(0, 4) == "hsla" && (cA = bb(cE[3]));
                        cE[3] && cE[3].slice(-1) == "%" && (cA /= 100);
                        return bE.hsl2rgb(cy, cz, cD, cA)
                    }
                    cC = {r: cy, g: cz, b: cD, toString: be};
                    cC.hex = "#" + (16777216 | cD | (cz << 8) | (cy << 16)).toString(16).slice(1);
                    bE.is(cA, "finite") && (cC.opacity = cA);
                    return cC
                }
                return{r: -1, g: -1, b: -1, hex: "none", error: 1, toString: be}
            }, bE);
            bE.hsb = bt(function (cz, cy, S) {
                return bE.hsb2rgb(cz, cy, S).hex
            });
            bE.hsl = bt(function (cz, cy, S) {
                return bE.hsl2rgb(cz, cy, S).hex
            });
            bE.rgb = bt(function (cz, cy, S) {
                return"#" + (16777216 | S | (cy << 8) | (cz << 16)).toString(16).slice(1)
            });
            bE.getColor = function (cy) {
                var cz = this.getColor.start = this.getColor.start || {h: 0, s: 1, b: cy || 0.75}, S = this.hsb2rgb(cz.h, cz.s, cz.b);
                cz.h += 0.075;
                if (cz.h > 1) {
                    cz.h = 0;
                    cz.s -= 0.2;
                    cz.s <= 0 && (this.getColor.start = {h: 0, s: 1, b: cz.b})
                }
                return S.hex
            };
            bE.getColor.reset = function () {
                delete this.start
            };
            function bY(cz, cC) {
                var cB = [];
                for (var cy = 0, S = cz.length; S - 2 * !cC > cy; cy += 2) {
                    var cA = [
                        {x: +cz[cy - 2], y: +cz[cy - 1]},
                        {x: +cz[cy], y: +cz[cy + 1]},
                        {x: +cz[cy + 2], y: +cz[cy + 3]},
                        {x: +cz[cy + 4], y: +cz[cy + 5]}
                    ];
                    if (cC) {
                        if (!cy) {
                            cA[0] = {x: +cz[S - 2], y: +cz[S - 1]}
                        } else {
                            if (S - 4 == cy) {
                                cA[3] = {x: +cz[0], y: +cz[1]}
                            } else {
                                if (S - 2 == cy) {
                                    cA[2] = {x: +cz[0], y: +cz[1]};
                                    cA[3] = {x: +cz[2], y: +cz[3]}
                                }
                            }
                        }
                    } else {
                        if (S - 4 == cy) {
                            cA[3] = cA[2]
                        } else {
                            if (!cy) {
                                cA[0] = {x: +cz[cy], y: +cz[cy + 1]}
                            }
                        }
                    }
                    cB.push(["C", (-cA[0].x + 6 * cA[1].x + cA[2].x) / 6, (-cA[0].y + 6 * cA[1].y + cA[2].y) / 6, (cA[1].x + 6 * cA[2].x - cA[3].x) / 6, (cA[1].y + 6 * cA[2].y - cA[3].y) / 6, cA[2].x, cA[2].y])
                }
                return cB
            }

            bE.parsePathString = function (S) {
                if (!S) {
                    return null
                }
                var cz = aW(S);
                if (cz.arr) {
                    return bM(cz.arr)
                }
                var cA = {a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0}, cy = [];
                if (bE.is(S, b0) && bE.is(S[0], b0)) {
                    cy = bM(S)
                }
                if (!cy.length) {
                    cu(S).replace(bN, function (cC, cB, cF) {
                        var cE = [], cD = cB.toLowerCase();
                        cF.replace(bC, function (cH, cG) {
                            cG && cE.push(+cG)
                        });
                        if (cD == "m" && cE.length > 2) {
                            cy.push([cB][cr](cE.splice(0, 2)));
                            cD = "l";
                            cB = cB == "m" ? "l" : "L"
                        }
                        if (cD == "r") {
                            cy.push([cB][cr](cE))
                        } else {
                            while (cE.length >= cA[cD]) {
                                cy.push([cB][cr](cE.splice(0, cA[cD])));
                                if (!cA[cD]) {
                                    break
                                }
                            }
                        }
                    })
                }
                cy.toString = bE._path2string;
                cz.arr = bM(cy);
                return cy
            };
            bE.parseTransformString = bt(function (cy) {
                if (!cy) {
                    return null
                }
                var cz = {r: 3, s: 4, t: 2, m: 6}, S = [];
                if (bE.is(cy, b0) && bE.is(cy[0], b0)) {
                    S = bM(cy)
                }
                if (!S.length) {
                    cu(cy).replace(a6, function (cB, cA, cE) {
                        var cD = [], cC = cx.call(cA);
                        cE.replace(bC, function (cG, cF) {
                            cF && cD.push(+cF)
                        });
                        S.push([cA][cr](cD))
                    })
                }
                S.toString = bE._path2string;
                return S
            });
            var aW = function (cy) {
                var S = aW.ps = aW.ps || {};
                if (S[cy]) {
                    S[cy].sleep = 100
                } else {
                    S[cy] = {sleep: 100}
                }
                setTimeout(function () {
                    for (var cz in S) {
                        if (S[a8](cz) && cz != cy) {
                            S[cz].sleep--;
                            !S[cz].sleep && delete S[cz]
                        }
                    }
                });
                return S[cy]
            };
            bE.findDotsAtSegment = function (cz, S, cW, cU, cE, cC, cH, cF, cP) {
                var cM = 1 - cP, cR = cc(cM, 3), cS = cc(cM, 2), cJ = cP * cP, cG = cJ * cP, cL = cR * cz + cS * 3 * cP * cW + cM * 3 * cP * cP * cE + cG * cH, cI = cR * S + cS * 3 * cP * cU + cM * 3 * cP * cP * cC + cG * cF, cQ = cz + 2 * cP * (cW - cz) + cJ * (cE - 2 * cW + cz), cO = S + 2 * cP * (cU - S) + cJ * (cC - 2 * cU + S), cV = cW + 2 * cP * (cE - cW) + cJ * (cH - 2 * cE + cW), cT = cU + 2 * cP * (cC - cU) + cJ * (cF - 2 * cC + cU), cN = cM * cz + cP * cW, cK = cM * S + cP * cU, cB = cM * cE + cP * cH, cA = cM * cC + cP * cF, cD = (90 - bh.atan2(cQ - cV, cO - cT) * 180 / bI);
                (cQ > cV || cO < cT) && (cD += 180);
                return{x: cL, y: cI, m: {x: cQ, y: cO}, n: {x: cV, y: cT}, start: {x: cN, y: cK}, end: {x: cB, y: cA}, alpha: cD}
            };
            bE.bezierBBox = function (cy, S, cA, cz, cF, cD, cC, cB) {
                if (!bE.is(cy, "array")) {
                    cy = [cy, S, cA, cz, cF, cD, cC, cB]
                }
                var cE = bX.apply(null, cy);
                return{x: cE.min.x, y: cE.min.y, x2: cE.max.x, y2: cE.max.y, width: cE.max.x - cE.min.x, height: cE.max.y - cE.min.y}
            };
            bE.isPointInsideBBox = function (cy, S, cz) {
                return S >= cy.x && S <= cy.x2 && cz >= cy.y && cz <= cy.y2
            };
            bE.isBBoxIntersect = function (cz, cy) {
                var S = bE.isPointInsideBBox;
                return S(cy, cz.x, cz.y) || S(cy, cz.x2, cz.y) || S(cy, cz.x, cz.y2) || S(cy, cz.x2, cz.y2) || S(cz, cy.x, cy.y) || S(cz, cy.x2, cy.y) || S(cz, cy.x, cy.y2) || S(cz, cy.x2, cy.y2) || (cz.x < cy.x2 && cz.x > cy.x || cy.x < cz.x2 && cy.x > cz.x) && (cz.y < cy.y2 && cz.y > cy.y || cy.y < cz.y2 && cy.y > cz.y)
            };
            function b6(S, cD, cC, cB, cA) {
                var cz = -3 * cD + 9 * cC - 9 * cB + 3 * cA, cy = S * cz + 6 * cD - 12 * cC + 6 * cB;
                return S * cy - 3 * cD + 3 * cC
            }

            function aq(cO, cB, cN, cz, cM, cy, cJ, S, cG) {
                if (cG == null) {
                    cG = 1
                }
                cG = cG > 1 ? 1 : cG < 0 ? 0 : cG;
                var cH = cG / 2, cI = 12, cD = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816], cL = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472], cA = 0;
                for (var cK = 0; cK < cI; cK++) {
                    var cE = cH * cD[cK] + cH, cF = b6(cE, cO, cN, cM, cJ), cP = b6(cE, cB, cz, cy, S), cC = cF * cF + cP * cP;
                    cA += cL[cK] * bh.sqrt(cC)
                }
                return cH * cA
            }

            function aD(cz, cI, cy, cH, S, cF, cK, cE, cG) {
                if (cG < 0 || aq(cz, cI, cy, cH, S, cF, cK, cE) < cG) {
                    return
                }
                var cJ = 1, cA = cJ / 2, cC = cJ - cA, cB, cD = 0.01;
                cB = aq(cz, cI, cy, cH, S, cF, cK, cE, cC);
                while (bj(cB - cG) > cD) {
                    cA /= 2;
                    cC += (cB < cG ? 1 : -1) * cA;
                    cB = aq(cz, cI, cy, cH, S, cF, cK, cE, cC)
                }
                return cC
            }

            function aO(cA, cJ, cz, cH, S, cG, cL, cF) {
                if (am(cA, cz) < b9(S, cL) || b9(cA, cz) > am(S, cL) || am(cJ, cH) < b9(cG, cF) || b9(cJ, cH) > am(cG, cF)) {
                    return
                }
                var cE = (cA * cH - cJ * cz) * (S - cL) - (cA - cz) * (S * cF - cG * cL), cD = (cA * cH - cJ * cz) * (cG - cF) - (cJ - cH) * (S * cF - cG * cL), cB = (cA - cz) * (cG - cF) - (cJ - cH) * (S - cL);
                if (!cB) {
                    return
                }
                var cK = cE / cB, cI = cD / cB, cC = +cK.toFixed(2), cy = +cI.toFixed(2);
                if (cC < +b9(cA, cz).toFixed(2) || cC > +am(cA, cz).toFixed(2) || cC < +b9(S, cL).toFixed(2) || cC > +am(S, cL).toFixed(2) || cy < +b9(cJ, cH).toFixed(2) || cy > +am(cJ, cH).toFixed(2) || cy < +b9(cG, cF).toFixed(2) || cy > +am(cG, cF).toFixed(2)) {
                    return
                }
                return{x: cK, y: cI}
            }

            function bl(cy, S) {
                return a3(cy, S)
            }

            function au(cy, S) {
                return a3(cy, S, 1)
            }

            function a3(cU, cT, cS) {
                var cA = bE.bezierBBox(cU), cy = bE.bezierBBox(cT);
                if (!bE.isBBoxIntersect(cA, cy)) {
                    return cS ? 0 : []
                }
                var cN = aq.apply(0, cU), cM = aq.apply(0, cT), cE = ~~(cN / 5), cD = ~~(cM / 5), cK = [], cJ = [], cz = {}, cV = cS ? 0 : [];
                for (var cP = 0; cP < cE + 1; cP++) {
                    var cL = bE.findDotsAtSegment.apply(bE, cU.concat(cP / cE));
                    cK.push({x: cL.x, y: cL.y, t: cP / cE})
                }
                for (cP = 0; cP < cD + 1; cP++) {
                    cL = bE.findDotsAtSegment.apply(bE, cT.concat(cP / cD));
                    cJ.push({x: cL.x, y: cL.y, t: cP / cD})
                }
                for (cP = 0; cP < cE; cP++) {
                    for (var cO = 0; cO < cD; cO++) {
                        var cR = cK[cP], S = cK[cP + 1], cQ = cJ[cO], cC = cJ[cO + 1], cI = bj(S.x - cR.x) < 0.001 ? "y" : "x", cH = bj(cC.x - cQ.x) < 0.001 ? "y" : "x", cB = aO(cR.x, cR.y, S.x, S.y, cQ.x, cQ.y, cC.x, cC.y);
                        if (cB) {
                            if (cz[cB.x.toFixed(4)] == cB.y.toFixed(4)) {
                                continue
                            }
                            cz[cB.x.toFixed(4)] = cB.y.toFixed(4);
                            var cG = cR.t + bj((cB[cI] - cR[cI]) / (S[cI] - cR[cI])) * (S.t - cR.t), cF = cQ.t + bj((cB[cH] - cQ[cH]) / (cC[cH] - cQ[cH])) * (cC.t - cQ.t);
                            if (cG >= 0 && cG <= 1 && cF >= 0 && cF <= 1) {
                                if (cS) {
                                    cV++
                                } else {
                                    cV.push({x: cB.x, y: cB.y, t1: cG, t2: cF})
                                }
                            }
                        }
                    }
                }
                return cV
            }

            bE.pathIntersection = function (cy, S) {
                return aE(cy, S)
            };
            bE.pathIntersectionNumber = function (cy, S) {
                return aE(cy, S, 1)
            };
            function aE(cz, S, cO) {
                cz = bE._path2curve(cz);
                S = bE._path2curve(S);
                var cM, cC, cL, cA, cJ, cD, cy, cG, cS, cR, cT = cO ? 0 : [];
                for (var cK = 0, cE = cz.length; cK < cE; cK++) {
                    var cQ = cz[cK];
                    if (cQ[0] == "M") {
                        cM = cJ = cQ[1];
                        cC = cD = cQ[2]
                    } else {
                        if (cQ[0] == "C") {
                            cS = [cM, cC].concat(cQ.slice(1));
                            cM = cS[6];
                            cC = cS[7]
                        } else {
                            cS = [cM, cC, cM, cC, cJ, cD, cJ, cD];
                            cM = cJ;
                            cC = cD
                        }
                        for (var cI = 0, cN = S.length; cI < cN; cI++) {
                            var cP = S[cI];
                            if (cP[0] == "M") {
                                cL = cy = cP[1];
                                cA = cG = cP[2]
                            } else {
                                if (cP[0] == "C") {
                                    cR = [cL, cA].concat(cP.slice(1));
                                    cL = cR[6];
                                    cA = cR[7]
                                } else {
                                    cR = [cL, cA, cL, cA, cy, cG, cy, cG];
                                    cL = cy;
                                    cA = cG
                                }
                                var cF = a3(cS, cR, cO);
                                if (cO) {
                                    cT += cF
                                } else {
                                    for (var cH = 0, cB = cF.length; cH < cB; cH++) {
                                        cF[cH].segment1 = cK;
                                        cF[cH].segment2 = cI;
                                        cF[cH].bez1 = cS;
                                        cF[cH].bez2 = cR
                                    }
                                    cT = cT.concat(cF)
                                }
                            }
                        }
                    }
                }
                return cT
            }

            bE.isPointInsidePath = function (cy, S, cA) {
                var cz = bE.pathBBox(cy);
                return bE.isPointInsideBBox(cz, S, cA) && aE(cy, [
                    ["M", S, cA],
                    ["H", cz.x2 + 10]
                ], 1) % 2 == 1
            };
            bE._removedFactory = function (S) {
                return function () {
                    eve("raphael.log", null, "Rapha\xebl: you are calling to method \u201c" + S + "\u201d of removed object", S)
                }
            };
            var ba = bE.pathBBox = function (cL) {
                var cF = aW(cL);
                if (cF.bbox) {
                    return cF.bbox
                }
                if (!cL) {
                    return{x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0}
                }
                cL = aU(cL);
                var cI = 0, cH = 0, cB = [], cy = [], cz;
                for (var cD = 0, cK = cL.length; cD < cK; cD++) {
                    cz = cL[cD];
                    if (cz[0] == "M") {
                        cI = cz[1];
                        cH = cz[2];
                        cB.push(cI);
                        cy.push(cH)
                    } else {
                        var cE = bX(cI, cH, cz[1], cz[2], cz[3], cz[4], cz[5], cz[6]);
                        cB = cB[cr](cE.min.x, cE.max.x);
                        cy = cy[cr](cE.min.y, cE.max.y);
                        cI = cz[5];
                        cH = cz[6]
                    }
                }
                var S = b9[ct](0, cB), cJ = b9[ct](0, cy), cC = am[ct](0, cB), cA = am[ct](0, cy), cG = {x: S, y: cJ, x2: cC, y2: cA, width: cC - S, height: cA - cJ};
                cF.bbox = aV(cG);
                return cG
            }, bM = function (cy) {
                var S = aV(cy);
                S.toString = bE._path2string;
                return S
            }, bp = bE._pathToRelative = function (cA) {
                var cE = aW(cA);
                if (cE.rel) {
                    return bM(cE.rel)
                }
                if (!bE.is(cA, b0) || !bE.is(cA && cA[0], b0)) {
                    cA = bE.parsePathString(cA)
                }
                var cH = [], cJ = 0, cI = 0, cM = 0, cL = 0, cz = 0;
                if (cA[0][0] == "M") {
                    cJ = cA[0][1];
                    cI = cA[0][2];
                    cM = cJ;
                    cL = cI;
                    cz++;
                    cH.push(["M", cJ, cI])
                }
                for (var cD = cz, cN = cA.length; cD < cN; cD++) {
                    var S = cH[cD] = [], cK = cA[cD];
                    if (cK[0] != cx.call(cK[0])) {
                        S[0] = cx.call(cK[0]);
                        switch (S[0]) {
                            case"a":
                                S[1] = cK[1];
                                S[2] = cK[2];
                                S[3] = cK[3];
                                S[4] = cK[4];
                                S[5] = cK[5];
                                S[6] = +(cK[6] - cJ).toFixed(3);
                                S[7] = +(cK[7] - cI).toFixed(3);
                                break;
                            case"v":
                                S[1] = +(cK[1] - cI).toFixed(3);
                                break;
                            case"m":
                                cM = cK[1];
                                cL = cK[2];
                            default:
                                for (var cC = 1, cF = cK.length; cC < cF; cC++) {
                                    S[cC] = +(cK[cC] - ((cC % 2) ? cJ : cI)).toFixed(3)
                                }
                        }
                    } else {
                        S = cH[cD] = [];
                        if (cK[0] == "m") {
                            cM = cK[1] + cJ;
                            cL = cK[2] + cI
                        }
                        for (var cB = 0, cy = cK.length; cB < cy; cB++) {
                            cH[cD][cB] = cK[cB]
                        }
                    }
                    var cG = cH[cD].length;
                    switch (cH[cD][0]) {
                        case"z":
                            cJ = cM;
                            cI = cL;
                            break;
                        case"h":
                            cJ += +cH[cD][cG - 1];
                            break;
                        case"v":
                            cI += +cH[cD][cG - 1];
                            break;
                        default:
                            cJ += +cH[cD][cG - 2];
                            cI += +cH[cD][cG - 1]
                    }
                }
                cH.toString = bE._path2string;
                cE.rel = bM(cH);
                return cH
            }, ax = bE._pathToAbsolute = function (cI) {
                var cz = aW(cI);
                if (cz.abs) {
                    return bM(cz.abs)
                }
                if (!bE.is(cI, b0) || !bE.is(cI && cI[0], b0)) {
                    cI = bE.parsePathString(cI)
                }
                if (!cI || !cI.length) {
                    return[
                        ["M", 0, 0]
                    ]
                }
                var cO = [], cD = 0, cC = 0, cG = 0, cF = 0, cA = 0;
                if (cI[0][0] == "M") {
                    cD = +cI[0][1];
                    cC = +cI[0][2];
                    cG = cD;
                    cF = cC;
                    cA++;
                    cO[0] = ["M", cD, cC]
                }
                var cN = cI.length == 3 && cI[0][0] == "M" && cI[1][0].toUpperCase() == "R" && cI[2][0].toUpperCase() == "Z";
                for (var cH, S, cL = cA, cE = cI.length; cL < cE; cL++) {
                    cO.push(cH = []);
                    S = cI[cL];
                    if (S[0] != cg.call(S[0])) {
                        cH[0] = cg.call(S[0]);
                        switch (cH[0]) {
                            case"A":
                                cH[1] = S[1];
                                cH[2] = S[2];
                                cH[3] = S[3];
                                cH[4] = S[4];
                                cH[5] = S[5];
                                cH[6] = +(S[6] + cD);
                                cH[7] = +(S[7] + cC);
                                break;
                            case"V":
                                cH[1] = +S[1] + cC;
                                break;
                            case"H":
                                cH[1] = +S[1] + cD;
                                break;
                            case"R":
                                var cB = [cD, cC][cr](S.slice(1));
                                for (var cK = 2, cM = cB.length; cK < cM; cK++) {
                                    cB[cK] = +cB[cK] + cD;
                                    cB[++cK] = +cB[cK] + cC
                                }
                                cO.pop();
                                cO = cO[cr](bY(cB, cN));
                                break;
                            case"M":
                                cG = +S[1] + cD;
                                cF = +S[2] + cC;
                            default:
                                for (cK = 1, cM = S.length; cK < cM; cK++) {
                                    cH[cK] = +S[cK] + ((cK % 2) ? cD : cC)
                                }
                        }
                    } else {
                        if (S[0] == "R") {
                            cB = [cD, cC][cr](S.slice(1));
                            cO.pop();
                            cO = cO[cr](bY(cB, cN));
                            cH = ["R"][cr](S.slice(-2))
                        } else {
                            for (var cJ = 0, cy = S.length; cJ < cy; cJ++) {
                                cH[cJ] = S[cJ]
                            }
                        }
                    }
                    switch (cH[0]) {
                        case"Z":
                            cD = cG;
                            cC = cF;
                            break;
                        case"H":
                            cD = cH[1];
                            break;
                        case"V":
                            cC = cH[1];
                            break;
                        case"M":
                            cG = cH[cH.length - 2];
                            cF = cH[cH.length - 1];
                        default:
                            cD = cH[cH.length - 2];
                            cC = cH[cH.length - 1]
                    }
                }
                cO.toString = bE._path2string;
                cz.abs = bM(cO);
                return cO
            }, cv = function (cy, cA, S, cz) {
                return[cy, cA, S, cz, S, cz]
            }, ca = function (cy, cA, cD, cB, S, cz) {
                var cC = 1 / 3, cE = 2 / 3;
                return[cC * cy + cE * cD, cC * cA + cE * cB, cC * S + cE * cD, cC * cz + cE * cB, S, cz]
            }, a2 = function (cL, dj, cU, cS, cM, cG, cB, cK, di, cN) {
                var cR = bI * 120 / 180, S = bI / 180 * (+cM || 0), cY = [], cV, de = bt(function (c1, dk, cy) {
                    var df = c1 * bh.cos(cy) - dk * bh.sin(cy), c2 = c1 * bh.sin(cy) + dk * bh.cos(cy);
                    return{x: df, y: c2}
                });
                if (!cN) {
                    cV = de(cL, dj, -S);
                    cL = cV.x;
                    dj = cV.y;
                    cV = de(cK, di, -S);
                    cK = cV.x;
                    di = cV.y;
                    var cz = bh.cos(bI / 180 * cM), cI = bh.sin(bI / 180 * cM), c0 = (cL - cK) / 2, cZ = (dj - di) / 2;
                    var dc = (c0 * c0) / (cU * cU) + (cZ * cZ) / (cS * cS);
                    if (dc > 1) {
                        dc = bh.sqrt(dc);
                        cU = dc * cU;
                        cS = dc * cS
                    }
                    var cA = cU * cU, c5 = cS * cS, c7 = (cG == cB ? -1 : 1) * bh.sqrt(bj((cA * c5 - cA * cZ * cZ - c5 * c0 * c0) / (cA * cZ * cZ + c5 * c0 * c0))), cP = c7 * cU * cZ / cS + (cL + cK) / 2, cO = c7 * -cS * c0 / cU + (dj + di) / 2, cF = bh.asin(((dj - cO) / cS).toFixed(9)), cE = bh.asin(((di - cO) / cS).toFixed(9));
                    cF = cL < cP ? bI - cF : cF;
                    cE = cK < cP ? bI - cE : cE;
                    cF < 0 && (cF = bI * 2 + cF);
                    cE < 0 && (cE = bI * 2 + cE);
                    if (cB && cF > cE) {
                        cF = cF - bI * 2
                    }
                    if (!cB && cE > cF) {
                        cE = cE - bI * 2
                    }
                } else {
                    cF = cN[0];
                    cE = cN[1];
                    cP = cN[2];
                    cO = cN[3]
                }
                var cJ = cE - cF;
                if (bj(cJ) > cR) {
                    var cQ = cE, cT = cK, cH = di;
                    cE = cF + cR * (cB && cE > cF ? 1 : -1);
                    cK = cP + cU * bh.cos(cE);
                    di = cO + cS * bh.sin(cE);
                    cY = a2(cK, di, cU, cS, cM, 0, cB, cT, cH, [cE, cQ, cP, cO])
                }
                cJ = cE - cF;
                var cD = bh.cos(cF), dh = bh.sin(cF), cC = bh.cos(cE), dg = bh.sin(cE), c3 = bh.tan(cJ / 4), c6 = 4 / 3 * cU * c3, c4 = 4 / 3 * cS * c3, dd = [cL, dj], db = [cL + c6 * dh, dj - c4 * cD], da = [cK + c6 * dg, di - c4 * cC], c8 = [cK, di];
                db[0] = 2 * dd[0] - db[0];
                db[1] = 2 * dd[1] - db[1];
                if (cN) {
                    return[db, da, c8][cr](cY)
                } else {
                    cY = [db, da, c8][cr](cY).join()[aF](",");
                    var cW = [];
                    for (var c9 = 0, cX = cY.length; c9 < cX; c9++) {
                        cW[c9] = c9 % 2 ? de(cY[c9 - 1], cY[c9], S).y : de(cY[c9], cY[c9 + 1], S).x
                    }
                    return cW
                }
            }, a4 = function (cy, S, cA, cz, cF, cE, cD, cC, cG) {
                var cB = 1 - cG;
                return{x: cc(cB, 3) * cy + cc(cB, 2) * 3 * cG * cA + cB * 3 * cG * cG * cF + cc(cG, 3) * cD, y: cc(cB, 3) * S + cc(cB, 2) * 3 * cG * cz + cB * 3 * cG * cG * cE + cc(cG, 3) * cC}
            }, bX = bt(function (cz, S, cB, cA, cM, cL, cI, cF) {
                var cK = (cM - 2 * cB + cz) - (cI - 2 * cM + cB), cH = 2 * (cB - cz) - 2 * (cM - cB), cE = cz - cB, cD = (-cH + bh.sqrt(cH * cH - 4 * cK * cE)) / 2 / cK, cC = (-cH - bh.sqrt(cH * cH - 4 * cK * cE)) / 2 / cK, cG = [S, cF], cJ = [cz, cI], cy;
                bj(cD) > "1e12" && (cD = 0.5);
                bj(cC) > "1e12" && (cC = 0.5);
                if (cD > 0 && cD < 1) {
                    cy = a4(cz, S, cB, cA, cM, cL, cI, cF, cD);
                    cJ.push(cy.x);
                    cG.push(cy.y)
                }
                if (cC > 0 && cC < 1) {
                    cy = a4(cz, S, cB, cA, cM, cL, cI, cF, cC);
                    cJ.push(cy.x);
                    cG.push(cy.y)
                }
                cK = (cL - 2 * cA + S) - (cF - 2 * cL + cA);
                cH = 2 * (cA - S) - 2 * (cL - cA);
                cE = S - cA;
                cD = (-cH + bh.sqrt(cH * cH - 4 * cK * cE)) / 2 / cK;
                cC = (-cH - bh.sqrt(cH * cH - 4 * cK * cE)) / 2 / cK;
                bj(cD) > "1e12" && (cD = 0.5);
                bj(cC) > "1e12" && (cC = 0.5);
                if (cD > 0 && cD < 1) {
                    cy = a4(cz, S, cB, cA, cM, cL, cI, cF, cD);
                    cJ.push(cy.x);
                    cG.push(cy.y)
                }
                if (cC > 0 && cC < 1) {
                    cy = a4(cz, S, cB, cA, cM, cL, cI, cF, cC);
                    cJ.push(cy.x);
                    cG.push(cy.y)
                }
                return{min: {x: b9[ct](0, cJ), y: b9[ct](0, cG)}, max: {x: am[ct](0, cJ), y: am[ct](0, cG)}}
            }), aU = bE._path2curve = bt(function (cM, cH) {
                var cF = !cH && aW(cM);
                if (!cH && cF.curve) {
                    return bM(cF.curve)
                }
                var cA = ax(cM), cI = cH && ax(cH), cJ = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null}, cy = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null}, cC = function (cO, cP) {
                    var cN, cQ;
                    if (!cO) {
                        return["C", cP.x, cP.y, cP.x, cP.y, cP.x, cP.y]
                    }
                    !(cO[0] in {T: 1, Q: 1}) && (cP.qx = cP.qy = null);
                    switch (cO[0]) {
                        case"M":
                            cP.X = cO[1];
                            cP.Y = cO[2];
                            break;
                        case"A":
                            cO = ["C"][cr](a2[ct](0, [cP.x, cP.y][cr](cO.slice(1))));
                            break;
                        case"S":
                            cN = cP.x + (cP.x - (cP.bx || cP.x));
                            cQ = cP.y + (cP.y - (cP.by || cP.y));
                            cO = ["C", cN, cQ][cr](cO.slice(1));
                            break;
                        case"T":
                            cP.qx = cP.x + (cP.x - (cP.qx || cP.x));
                            cP.qy = cP.y + (cP.y - (cP.qy || cP.y));
                            cO = ["C"][cr](ca(cP.x, cP.y, cP.qx, cP.qy, cO[1], cO[2]));
                            break;
                        case"Q":
                            cP.qx = cO[1];
                            cP.qy = cO[2];
                            cO = ["C"][cr](ca(cP.x, cP.y, cO[1], cO[2], cO[3], cO[4]));
                            break;
                        case"L":
                            cO = ["C"][cr](cv(cP.x, cP.y, cO[1], cO[2]));
                            break;
                        case"H":
                            cO = ["C"][cr](cv(cP.x, cP.y, cO[1], cP.y));
                            break;
                        case"V":
                            cO = ["C"][cr](cv(cP.x, cP.y, cP.x, cO[1]));
                            break;
                        case"Z":
                            cO = ["C"][cr](cv(cP.x, cP.y, cP.X, cP.Y));
                            break
                    }
                    return cO
                }, S = function (cN, cO) {
                    if (cN[cO].length > 7) {
                        cN[cO].shift();
                        var cP = cN[cO];
                        while (cP.length) {
                            cN.splice(cO++, 0, ["C"][cr](cP.splice(0, 6)))
                        }
                        cN.splice(cO, 1);
                        cK = am(cA.length, cI && cI.length || 0)
                    }
                }, cz = function (cR, cQ, cO, cN, cP) {
                    if (cR && cQ && cR[cP][0] == "M" && cQ[cP][0] != "M") {
                        cQ.splice(cP, 0, ["M", cN.x, cN.y]);
                        cO.bx = 0;
                        cO.by = 0;
                        cO.x = cR[cP][1];
                        cO.y = cR[cP][2];
                        cK = am(cA.length, cI && cI.length || 0)
                    }
                };
                for (var cE = 0, cK = am(cA.length, cI && cI.length || 0); cE < cK; cE++) {
                    cA[cE] = cC(cA[cE], cJ);
                    S(cA, cE);
                    cI && (cI[cE] = cC(cI[cE], cy));
                    cI && S(cI, cE);
                    cz(cA, cI, cJ, cy, cE);
                    cz(cI, cA, cy, cJ, cE);
                    var cD = cA[cE], cL = cI && cI[cE], cB = cD.length, cG = cI && cL.length;
                    cJ.x = cD[cB - 2];
                    cJ.y = cD[cB - 1];
                    cJ.bx = bb(cD[cB - 4]) || cJ.x;
                    cJ.by = bb(cD[cB - 3]) || cJ.y;
                    cy.bx = cI && (bb(cL[cG - 4]) || cy.x);
                    cy.by = cI && (bb(cL[cG - 3]) || cy.y);
                    cy.x = cI && cL[cG - 2];
                    cy.y = cI && cL[cG - 1]
                }
                if (!cI) {
                    cF.curve = bM(cA)
                }
                return cI ? [cA, cI] : cA
            }, null, bM), aw = bE._parseDots = bt(function (cF) {
                var cE = [];
                for (var cB = 0, cG = cF.length; cB < cG; cB++) {
                    var S = {}, cD = cF[cB].match(/^([^:]*):?([\d\.]*)/);
                    S.color = bE.getRGB(cD[1]);
                    if (S.color.error) {
                        return null
                    }
                    S.color = S.color.hex;
                    cD[2] && (S.offset = cD[2] + "%");
                    cE.push(S)
                }
                for (cB = 1, cG = cE.length - 1; cB < cG; cB++) {
                    if (!cE[cB].offset) {
                        var cy = bb(cE[cB - 1].offset || 0), cz = 0;
                        for (var cA = cB + 1; cA < cG; cA++) {
                            if (cE[cA].offset) {
                                cz = cE[cA].offset;
                                break
                            }
                        }
                        if (!cz) {
                            cz = 100;
                            cA = cG
                        }
                        cz = bb(cz);
                        var cC = (cz - cy) / (cA - cB + 1);
                        for (; cB < cA; cB++) {
                            cy += cC;
                            cE[cB].offset = cy + "%"
                        }
                    }
                }
                return cE
            }), bx = bE._tear = function (S, cy) {
                S == cy.top && (cy.top = S.prev);
                S == cy.bottom && (cy.bottom = S.next);
                S.next && (S.next.prev = S.prev);
                S.prev && (S.prev.next = S.next)
            }, bd = bE._tofront = function (S, cy) {
                if (cy.top === S) {
                    return
                }
                bx(S, cy);
                S.next = null;
                S.prev = cy.top;
                cy.top.next = S;
                cy.top = S
            }, ap = bE._toback = function (S, cy) {
                if (cy.bottom === S) {
                    return
                }
                bx(S, cy);
                S.next = cy.bottom;
                S.prev = null;
                cy.bottom.prev = S;
                cy.bottom = S
            }, aG = bE._insertafter = function (cy, S, cz) {
                bx(cy, cz);
                S == cz.top && (cz.top = cy);
                S.next && (S.next.prev = cy);
                cy.next = S.next;
                cy.prev = S;
                S.next = cy
            }, bG = bE._insertbefore = function (cy, S, cz) {
                bx(cy, cz);
                S == cz.bottom && (cz.bottom = cy);
                S.prev && (S.prev.next = cy);
                cy.prev = S.prev;
                S.prev = cy;
                cy.next = S
            }, b8 = bE.toMatrix = function (cz, S) {
                var cA = ba(cz), cy = {_: {transform: bK}, getBBox: function () {
                    return cA
                }};
                bB(cy, S);
                return cy.matrix
            }, aR = bE.transformPath = function (cy, S) {
                return aL(cy, b8(cy, S))
            }, bB = bE._extractTransform = function (cy, cR) {
                if (cR == null) {
                    return cy._.transform
                }
                cR = cu(cR).replace(/\.{3}|\u2026/g, cy._.transform || bK);
                var cJ = bE.parseTransformString(cR), cH = 0, cF = 0, cE = 0, cL = 1, cK = 1, cS = cy._, cM = new bs;
                cS.transform = cJ || [];
                if (cJ) {
                    for (var cN = 0, cG = cJ.length; cN < cG; cN++) {
                        var cI = cJ[cN], S = cI.length, cB = cu(cI[0]).toLowerCase(), cQ = cI[0] != cB, cD = cQ ? cM.invert() : 0, cP, cA, cO, cz, cC;
                        if (cB == "t" && S == 3) {
                            if (cQ) {
                                cP = cD.x(0, 0);
                                cA = cD.y(0, 0);
                                cO = cD.x(cI[1], cI[2]);
                                cz = cD.y(cI[1], cI[2]);
                                cM.translate(cO - cP, cz - cA)
                            } else {
                                cM.translate(cI[1], cI[2])
                            }
                        } else {
                            if (cB == "r") {
                                if (S == 2) {
                                    cC = cC || cy.getBBox(1);
                                    cM.rotate(cI[1], cC.x + cC.width / 2, cC.y + cC.height / 2);
                                    cH += cI[1]
                                } else {
                                    if (S == 4) {
                                        if (cQ) {
                                            cO = cD.x(cI[2], cI[3]);
                                            cz = cD.y(cI[2], cI[3]);
                                            cM.rotate(cI[1], cO, cz)
                                        } else {
                                            cM.rotate(cI[1], cI[2], cI[3])
                                        }
                                        cH += cI[1]
                                    }
                                }
                            } else {
                                if (cB == "s") {
                                    if (S == 2 || S == 3) {
                                        cC = cC || cy.getBBox(1);
                                        cM.scale(cI[1], cI[S - 1], cC.x + cC.width / 2, cC.y + cC.height / 2);
                                        cL *= cI[1];
                                        cK *= cI[S - 1]
                                    } else {
                                        if (S == 5) {
                                            if (cQ) {
                                                cO = cD.x(cI[3], cI[4]);
                                                cz = cD.y(cI[3], cI[4]);
                                                cM.scale(cI[1], cI[2], cO, cz)
                                            } else {
                                                cM.scale(cI[1], cI[2], cI[3], cI[4])
                                            }
                                            cL *= cI[1];
                                            cK *= cI[2]
                                        }
                                    }
                                } else {
                                    if (cB == "m" && S == 7) {
                                        cM.add(cI[1], cI[2], cI[3], cI[4], cI[5], cI[6])
                                    }
                                }
                            }
                        }
                        cS.dirtyT = 1;
                        cy.matrix = cM
                    }
                }
                cy.matrix = cM;
                cS.sx = cL;
                cS.sy = cK;
                cS.deg = cH;
                cS.dx = cF = cM.e;
                cS.dy = cE = cM.f;
                if (cL == 1 && cK == 1 && !cH && cS.bbox) {
                    cS.bbox.x += +cF;
                    cS.bbox.y += +cE
                } else {
                    cS.dirtyT = 1
                }
            }, al = function (cy) {
                var S = cy[0];
                switch (S.toLowerCase()) {
                    case"t":
                        return[S, 0, 0];
                    case"m":
                        return[S, 1, 0, 0, 1, 0, 0];
                    case"r":
                        if (cy.length == 4) {
                            return[S, 0, cy[2], cy[3]]
                        } else {
                            return[S, 0]
                        }
                    case"s":
                        if (cy.length == 5) {
                            return[S, 1, 1, cy[3], cy[4]]
                        } else {
                            if (cy.length == 3) {
                                return[S, 1, 1]
                            } else {
                                return[S, 1]
                            }
                        }
                }
            }, bo = bE._equaliseTransform = function (cB, cA) {
                cA = cu(cA).replace(/\.{3}|\u2026/g, cB);
                cB = bE.parseTransformString(cB) || [];
                cA = bE.parseTransformString(cA) || [];
                var S = am(cB.length, cA.length), cF = [], cG = [], cz = 0, cy, cC, cE, cD;
                for (; cz < S; cz++) {
                    cE = cB[cz] || al(cA[cz]);
                    cD = cA[cz] || al(cE);
                    if ((cE[0] != cD[0]) || (cE[0].toLowerCase() == "r" && (cE[2] != cD[2] || cE[3] != cD[3])) || (cE[0].toLowerCase() == "s" && (cE[3] != cD[3] || cE[4] != cD[4]))) {
                        return
                    }
                    cF[cz] = [];
                    cG[cz] = [];
                    for (cy = 0, cC = am(cE.length, cD.length); cy < cC; cy++) {
                        cy in cE && (cF[cz][cy] = cE[cy]);
                        cy in cD && (cG[cz][cy] = cD[cy])
                    }
                }
                return{from: cF, to: cG}
            };
            bE._getContainer = function (S, cB, cz, cA) {
                var cy;
                cy = cA == null && !bE.is(S, "object") ? bn.doc.getElementById(S) : S;
                if (cy == null) {
                    return
                }
                if (cy.tagName) {
                    if (cB == null) {
                        return{container: cy, width: cy.style.pixelWidth || cy.offsetWidth, height: cy.style.pixelHeight || cy.offsetHeight}
                    } else {
                        return{container: cy, width: cB, height: cz}
                    }
                }
                return{container: 1, x: S, y: cB, width: cz, height: cA}
            };
            bE.pathToRelative = bp;
            bE._engine = {};
            bE.path2curve = aU;
            bE.matrix = function (cy, S, cC, cB, cA, cz) {
                return new bs(cy, S, cC, cB, cA, cz)
            };
            function bs(cy, S, cC, cB, cA, cz) {
                if (cy != null) {
                    this.a = +cy;
                    this.b = +S;
                    this.c = +cC;
                    this.d = +cB;
                    this.e = +cA;
                    this.f = +cz
                } else {
                    this.a = 1;
                    this.b = 0;
                    this.c = 0;
                    this.d = 1;
                    this.e = 0;
                    this.f = 0
                }
            }

            (function (cz) {
                cz.add = function (cM, cJ, cH, cF, cD, cC) {
                    var cB = [
                        [],
                        [],
                        []
                    ], cA = [
                        [this.a, this.c, this.e],
                        [this.b, this.d, this.f],
                        [0, 0, 1]
                    ], cL = [
                        [cM, cH, cD],
                        [cJ, cF, cC],
                        [0, 0, 1]
                    ], cK, cI, cG, cE;
                    if (cM && cM instanceof bs) {
                        cL = [
                            [cM.a, cM.c, cM.e],
                            [cM.b, cM.d, cM.f],
                            [0, 0, 1]
                        ]
                    }
                    for (cK = 0; cK < 3; cK++) {
                        for (cI = 0; cI < 3; cI++) {
                            cE = 0;
                            for (cG = 0; cG < 3; cG++) {
                                cE += cA[cK][cG] * cL[cG][cI]
                            }
                            cB[cK][cI] = cE
                        }
                    }
                    this.a = cB[0][0];
                    this.b = cB[1][0];
                    this.c = cB[0][1];
                    this.d = cB[1][1];
                    this.e = cB[0][2];
                    this.f = cB[1][2]
                };
                cz.invert = function () {
                    var cB = this, cA = cB.a * cB.d - cB.b * cB.c;
                    return new bs(cB.d / cA, -cB.b / cA, -cB.c / cA, cB.a / cA, (cB.c * cB.f - cB.d * cB.e) / cA, (cB.b * cB.e - cB.a * cB.f) / cA)
                };
                cz.clone = function () {
                    return new bs(this.a, this.b, this.c, this.d, this.e, this.f)
                };
                cz.translate = function (cA, cB) {
                    this.add(1, 0, 0, 1, cA, cB)
                };
                cz.scale = function (cB, cD, cA, cC) {
                    cD == null && (cD = cB);
                    (cA || cC) && this.add(1, 0, 0, 1, cA, cC);
                    this.add(cB, 0, 0, cD, 0, 0);
                    (cA || cC) && this.add(1, 0, 0, 1, -cA, -cC)
                };
                cz.rotate = function (cB, cA, cE) {
                    cB = bE.rad(cB);
                    cA = cA || 0;
                    cE = cE || 0;
                    var cD = +bh.cos(cB).toFixed(9), cC = +bh.sin(cB).toFixed(9);
                    this.add(cD, cC, -cC, cD, cA, cE);
                    this.add(1, 0, 0, 1, -cA, -cE)
                };
                cz.x = function (cA, cB) {
                    return cA * this.a + cB * this.c + this.e
                };
                cz.y = function (cA, cB) {
                    return cA * this.b + cB * this.d + this.f
                };
                cz.get = function (cA) {
                    return +this[cu.fromCharCode(97 + cA)].toFixed(4)
                };
                cz.toString = function () {
                    return bE.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
                };
                cz.toFilter = function () {
                    return"progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
                };
                cz.offset = function () {
                    return[this.e.toFixed(4), this.f.toFixed(4)]
                };
                function cy(cA) {
                    return cA[0] * cA[0] + cA[1] * cA[1]
                }

                function S(cA) {
                    var cB = bh.sqrt(cy(cA));
                    cA[0] && (cA[0] /= cB);
                    cA[1] && (cA[1] /= cB)
                }

                cz.split = function () {
                    var cB = {};
                    cB.dx = this.e;
                    cB.dy = this.f;
                    var cD = [
                        [this.a, this.c],
                        [this.b, this.d]
                    ];
                    cB.scalex = bh.sqrt(cy(cD[0]));
                    S(cD[0]);
                    cB.shear = cD[0][0] * cD[1][0] + cD[0][1] * cD[1][1];
                    cD[1] = [cD[1][0] - cD[0][0] * cB.shear, cD[1][1] - cD[0][1] * cB.shear];
                    cB.scaley = bh.sqrt(cy(cD[1]));
                    S(cD[1]);
                    cB.shear /= cB.scaley;
                    var cA = -cD[0][1], cC = cD[1][1];
                    if (cC < 0) {
                        cB.rotate = bE.deg(bh.acos(cC));
                        if (cA < 0) {
                            cB.rotate = 360 - cB.rotate
                        }
                    } else {
                        cB.rotate = bE.deg(bh.asin(cA))
                    }
                    cB.isSimple = !+cB.shear.toFixed(9) && (cB.scalex.toFixed(9) == cB.scaley.toFixed(9) || !cB.rotate);
                    cB.isSuperSimple = !+cB.shear.toFixed(9) && cB.scalex.toFixed(9) == cB.scaley.toFixed(9) && !cB.rotate;
                    cB.noRotation = !+cB.shear.toFixed(9) && !cB.rotate;
                    return cB
                };
                cz.toTransformString = function (cA) {
                    var cB = cA || this[aF]();
                    if (cB.isSimple) {
                        cB.scalex = +cB.scalex.toFixed(4);
                        cB.scaley = +cB.scaley.toFixed(4);
                        cB.rotate = +cB.rotate.toFixed(4);
                        return(cB.dx || cB.dy ? "t" + [cB.dx, cB.dy] : bK) + (cB.scalex != 1 || cB.scaley != 1 ? "s" + [cB.scalex, cB.scaley, 0, 0] : bK) + (cB.rotate ? "r" + [cB.rotate, 0, 0] : bK)
                    } else {
                        return"m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
                    }
                }
            })(bs.prototype);
            var aT = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
            if ((navigator.vendor == "Apple Computer, Inc.") && (aT && aT[1] < 4 || navigator.platform.slice(0, 2) == "iP") || (navigator.vendor == "Google Inc." && aT && aT[1] < 8)) {
                bR.safari = function () {
                    var S = this.rect(-99, -99, this.width + 99, this.height + 99).attr({stroke: "none"});
                    setTimeout(function () {
                        S.remove()
                    })
                }
            } else {
                bR.safari = aI
            }
            var aP = function () {
                this.returnValue = false
            }, cq = function () {
                return this.originalEvent.preventDefault()
            }, bV = function () {
                this.cancelBubble = true
            }, bw = function () {
                return this.originalEvent.stopPropagation()
            }, bq = (function () {
                if (bn.doc.addEventListener) {
                    return function (cC, cA, cz, cy) {
                        var S = aX && ck[cA] ? ck[cA] : cA, cB = function (cI) {
                            var cH = bn.doc.documentElement.scrollTop || bn.doc.body.scrollTop, cJ = bn.doc.documentElement.scrollLeft || bn.doc.body.scrollLeft, cD = cI.clientX + cJ, cK = cI.clientY + cH;
                            if (aX && ck[a8](cA)) {
                                for (var cF = 0, cG = cI.targetTouches && cI.targetTouches.length; cF < cG; cF++) {
                                    if (cI.targetTouches[cF].target == cC) {
                                        var cE = cI;
                                        cI = cI.targetTouches[cF];
                                        cI.originalEvent = cE;
                                        cI.preventDefault = cq;
                                        cI.stopPropagation = bw;
                                        break
                                    }
                                }
                            }
                            return cz.call(cy, cI, cD, cK)
                        };
                        cC.addEventListener(S, cB, false);
                        return function () {
                            cC.removeEventListener(S, cB, false);
                            return true
                        }
                    }
                } else {
                    if (bn.doc.attachEvent) {
                        return function (cC, cA, cz, cy) {
                            var cB = function (cF) {
                                cF = cF || bn.win.event;
                                var cE = bn.doc.documentElement.scrollTop || bn.doc.body.scrollTop, cG = bn.doc.documentElement.scrollLeft || bn.doc.body.scrollLeft, cD = cF.clientX + cG, cH = cF.clientY + cE;
                                cF.preventDefault = cF.preventDefault || aP;
                                cF.stopPropagation = cF.stopPropagation || bV;
                                return cz.call(cy, cF, cD, cH)
                            };
                            cC.attachEvent("on" + cA, cB);
                            var S = function () {
                                cC.detachEvent("on" + cA, cB);
                                return true
                            };
                            return S
                        }
                    }
                }
            })(), b1 = [], cl = function (cE) {
                var cH = cE.clientX, cG = cE.clientY, cJ = bn.doc.documentElement.scrollTop || bn.doc.body.scrollTop, cK = bn.doc.documentElement.scrollLeft || bn.doc.body.scrollLeft, cz, cA = b1.length;
                while (cA--) {
                    cz = b1[cA];
                    if (aX) {
                        var cC = cE.touches.length, cB;
                        while (cC--) {
                            cB = cE.touches[cC];
                            if (cB.identifier == cz.el._drag.id) {
                                cH = cB.clientX;
                                cG = cB.clientY;
                                (cE.originalEvent ? cE.originalEvent : cE).preventDefault();
                                break
                            }
                        }
                    } else {
                        cE.preventDefault()
                    }
                    var cy = cz.el.node, S, cD = cy.nextSibling, cI = cy.parentNode, cF = cy.style.display;
                    bn.win.opera && cI.removeChild(cy);
                    cy.style.display = "none";
                    S = cz.el.paper.getElementByPoint(cH, cG);
                    cy.style.display = cF;
                    bn.win.opera && (cD ? cI.insertBefore(cy, cD) : cI.appendChild(cy));
                    S && eve("raphael.drag.over." + cz.el.id, cz.el, S);
                    cH += cK;
                    cG += cJ;
                    eve("raphael.drag.move." + cz.el.id, cz.move_scope || cz.el, cH - cz.el._drag.x, cG - cz.el._drag.y, cH, cG, cE)
                }
            }, ag = function (cz) {
                bE.unmousemove(cl).unmouseup(ag);
                var cy = b1.length, S;
                while (cy--) {
                    S = b1[cy];
                    S.el._drag = {};
                    eve("raphael.drag.end." + S.el.id, S.end_scope || S.start_scope || S.move_scope || S.el, cz)
                }
                b1 = []
            }, b4 = bE.el = {};
            for (var bk = aQ.length; bk--;) {
                (function (S) {
                    bE[S] = b4[S] = function (cz, cy) {
                        if (bE.is(cz, "function")) {
                            this.events = this.events || [];
                            this.events.push({name: S, f: cz, unbind: bq(this.shape || this.node || bn.doc, S, cz, cy || this)})
                        }
                        return this
                    };
                    bE["un" + S] = b4["un" + S] = function (cA) {
                        var cz = this.events || [], cy = cz.length;
                        while (cy--) {
                            if (cz[cy].name == S && cz[cy].f == cA) {
                                cz[cy].unbind();
                                cz.splice(cy, 1);
                                !cz.length && delete this.events;
                                return this
                            }
                        }
                        return this
                    }
                })(aQ[bk])
            }
            b4.data = function (cy, cA) {
                var cz = bH[this.id] = bH[this.id] || {};
                if (arguments.length == 1) {
                    if (bE.is(cy, "object")) {
                        for (var S in cy) {
                            if (cy[a8](S)) {
                                this.data(S, cy[S])
                            }
                        }
                        return this
                    }
                    eve("raphael.data.get." + this.id, this, cz[cy], cy);
                    return cz[cy]
                }
                cz[cy] = cA;
                eve("raphael.data.set." + this.id, this, cA, cy);
                return this
            };
            b4.removeData = function (S) {
                if (S == null) {
                    bH[this.id] = {}
                } else {
                    bH[this.id] && delete bH[this.id][S]
                }
                return this
            };
            b4.hover = function (cA, S, cz, cy) {
                return this.mouseover(cA, cz).mouseout(S, cy || cz)
            };
            b4.unhover = function (cy, S) {
                return this.unmouseover(cy).unmouseout(S)
            };
            var ch = [];
            b4.drag = function (cy, cC, cB, S, cz, cA) {
                function cD(cF) {
                    (cF.originalEvent || cF).preventDefault();
                    var cE = bn.doc.documentElement.scrollTop || bn.doc.body.scrollTop, cG = bn.doc.documentElement.scrollLeft || bn.doc.body.scrollLeft;
                    this._drag.x = cF.clientX + cG;
                    this._drag.y = cF.clientY + cE;
                    this._drag.id = cF.identifier;
                    !b1.length && bE.mousemove(cl).mouseup(ag);
                    b1.push({el: this, move_scope: S, start_scope: cz, end_scope: cA});
                    cC && eve.on("raphael.drag.start." + this.id, cC);
                    cy && eve.on("raphael.drag.move." + this.id, cy);
                    cB && eve.on("raphael.drag.end." + this.id, cB);
                    eve("raphael.drag.start." + this.id, cz || S || this, cF.clientX + cG, cF.clientY + cE, cF)
                }

                this._drag = {};
                ch.push({el: this, start: cD});
                this.mousedown(cD);
                return this
            };
            b4.onDragOver = function (S) {
                S ? eve.on("raphael.drag.over." + this.id, S) : eve.unbind("raphael.drag.over." + this.id)
            };
            b4.undrag = function () {
                var S = ch.length;
                while (S--) {
                    if (ch[S].el == this) {
                        this.unmousedown(ch[S].start);
                        ch.splice(S, 1);
                        eve.unbind("raphael.drag.*." + this.id)
                    }
                }
                !ch.length && bE.unmousemove(cl).unmouseup(ag)
            };
            bR.circle = function (S, cA, cz) {
                var cy = bE._engine.circle(this, S || 0, cA || 0, cz || 0);
                this.__set__ && this.__set__.push(cy);
                return cy
            };
            bR.rect = function (S, cC, cy, cA, cB) {
                var cz = bE._engine.rect(this, S || 0, cC || 0, cy || 0, cA || 0, cB || 0);
                this.__set__ && this.__set__.push(cz);
                return cz
            };
            bR.ellipse = function (S, cB, cA, cz) {
                var cy = bE._engine.ellipse(this, S || 0, cB || 0, cA || 0, cz || 0);
                this.__set__ && this.__set__.push(cy);
                return cy
            };
            bR.path = function (S) {
                S && !bE.is(S, a7) && !bE.is(S[0], b0) && (S += bK);
                var cy = bE._engine.path(bE.format[ct](bE, arguments), this);
                this.__set__ && this.__set__.push(cy);
                return cy
            };
            bR.image = function (cB, S, cC, cy, cA) {
                var cz = bE._engine.image(this, cB || "about:blank", S || 0, cC || 0, cy || 0, cA || 0);
                this.__set__ && this.__set__.push(cz);
                return cz
            };
            bR.text = function (S, cA, cz) {
                var cy = bE._engine.text(this, S || 0, cA || 0, cu(cz));
                this.__set__ && this.__set__.push(cy);
                return cy
            };
            bR.set = function (cy) {
                !bE.is(cy, "array") && (cy = Array.prototype.splice.call(arguments, 0, arguments.length));
                var S = new a9(cy);
                this.__set__ && this.__set__.push(S);
                return S
            };
            bR.setStart = function (S) {
                this.__set__ = S || this.set()
            };
            bR.setFinish = function (cy) {
                var S = this.__set__;
                delete this.__set__;
                return S
            };
            bR.setSize = function (cy, S) {
                return bE._engine.setSize.call(this, cy, S)
            };
            bR.setViewBox = function (S, cB, cy, cA, cz) {
                return bE._engine.setViewBox.call(this, S, cB, cy, cA, cz)
            };
            bR.top = bR.bottom = null;
            bR.raphael = bE;
            var cf = function (cz) {
                var cB = cz.getBoundingClientRect(), cF = cz.ownerDocument, cC = cF.body, S = cF.documentElement, cA = S.clientTop || cC.clientTop || 0, cD = S.clientLeft || cC.clientLeft || 0, cE = cB.top + (bn.win.pageYOffset || S.scrollTop || cC.scrollTop) - cA, cy = cB.left + (bn.win.pageXOffset || S.scrollLeft || cC.scrollLeft) - cD;
                return{y: cE, x: cy}
            };
            bR.getElementByPoint = function (cy, cE) {
                var cD = this, cz = cD.canvas, cC = bn.doc.elementFromPoint(cy, cE);
                if (bn.win.opera && cC.tagName == "svg") {
                    var cB = cf(cz), cA = cz.createSVGRect();
                    cA.x = cy - cB.x;
                    cA.y = cE - cB.y;
                    cA.width = cA.height = 1;
                    var S = cz.getIntersectionList(cA, null);
                    if (S.length) {
                        cC = S[S.length - 1]
                    }
                }
                if (!cC) {
                    return null
                }
                while (cC.parentNode && cC != cz.parentNode && !cC.raphael) {
                    cC = cC.parentNode
                }
                cC == cD.canvas.parentNode && (cC = cz);
                cC = cC && cC.raphael ? cD.getById(cC.raphaelid) : null;
                return cC
            };
            bR.getById = function (cy) {
                var S = this.bottom;
                while (S) {
                    if (S.id == cy) {
                        return S
                    }
                    S = S.next
                }
                return null
            };
            bR.forEach = function (cz, S) {
                var cy = this.bottom;
                while (cy) {
                    if (cz.call(S, cy) === false) {
                        return this
                    }
                    cy = cy.next
                }
                return this
            };
            bR.getElementsByPoint = function (S, cz) {
                var cy = this.set();
                this.forEach(function (cA) {
                    if (cA.isPointInside(S, cz)) {
                        cy.push(cA)
                    }
                });
                return cy
            };
            function az() {
                return this.x + bD + this.y
            }

            function bg() {
                return this.x + bD + this.y + bD + this.width + " \xd7 " + this.height
            }

            b4.isPointInside = function (S, cz) {
                var cy = this.realPath = this.realPath || aN[this.type](this);
                return bE.isPointInsidePath(cy, S, cz)
            };
            b4.getBBox = function (cy) {
                if (this.removed) {
                    return{}
                }
                var S = this._;
                if (cy) {
                    if (S.dirty || !S.bboxwt) {
                        this.realPath = aN[this.type](this);
                        S.bboxwt = ba(this.realPath);
                        S.bboxwt.toString = bg;
                        S.dirty = 0
                    }
                    return S.bboxwt
                }
                if (S.dirty || S.dirtyT || !S.bbox) {
                    if (S.dirty || !this.realPath) {
                        S.bboxwt = 0;
                        this.realPath = aN[this.type](this)
                    }
                    S.bbox = ba(aL(this.realPath, this.matrix));
                    S.bbox.toString = bg;
                    S.dirty = S.dirtyT = 0
                }
                return S.bbox
            };
            b4.clone = function () {
                if (this.removed) {
                    return null
                }
                var S = this.paper[this.type]().attr(this.attr());
                this.__set__ && this.__set__.push(S);
                return S
            };
            b4.glow = function (cD) {
                if (this.type == "text") {
                    return null
                }
                cD = cD || {};
                var cz = {width: (cD.width || 10) + (+this.attr("stroke-width") || 1), fill: cD.fill || false, opacity: cD.opacity || 0.5, offsetx: cD.offsetx || 0, offsety: cD.offsety || 0, color: cD.color || "#000"}, cC = cz.width / 2, cA = this.paper, S = cA.set(), cB = this.realPath || aN[this.type](this);
                cB = this.matrix ? aL(cB, this.matrix) : cB;
                for (var cy = 1; cy < cC + 1; cy++) {
                    S.push(cA.path(cB).attr({stroke: cz.color, fill: cz.fill ? cz.color : "none", "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-width": +(cz.width / cC * cy).toFixed(3), opacity: +(cz.opacity / cC).toFixed(3)}))
                }
                return S.insertBefore(this).translate(cz.offsetx, cz.offsety)
            };
            var bU = {}, ak = function (cy, S, cB, cA, cF, cE, cD, cC, cz) {
                if (cz == null) {
                    return aq(cy, S, cB, cA, cF, cE, cD, cC)
                } else {
                    return bE.findDotsAtSegment(cy, S, cB, cA, cF, cE, cD, cC, aD(cy, S, cB, cA, cF, cE, cD, cC, cz))
                }
            }, bT = function (S, cy) {
                return function (cL, cB, cC) {
                    cL = aU(cL);
                    var cH, cG, cz, cD, cA = "", cK = {}, cI, cF = 0;
                    for (var cE = 0, cJ = cL.length; cE < cJ; cE++) {
                        cz = cL[cE];
                        if (cz[0] == "M") {
                            cH = +cz[1];
                            cG = +cz[2]
                        } else {
                            cD = ak(cH, cG, cz[1], cz[2], cz[3], cz[4], cz[5], cz[6]);
                            if (cF + cD > cB) {
                                if (cy && !cK.start) {
                                    cI = ak(cH, cG, cz[1], cz[2], cz[3], cz[4], cz[5], cz[6], cB - cF);
                                    cA += ["C" + cI.start.x, cI.start.y, cI.m.x, cI.m.y, cI.x, cI.y];
                                    if (cC) {
                                        return cA
                                    }
                                    cK.start = cA;
                                    cA = ["M" + cI.x, cI.y + "C" + cI.n.x, cI.n.y, cI.end.x, cI.end.y, cz[5], cz[6]].join();
                                    cF += cD;
                                    cH = +cz[5];
                                    cG = +cz[6];
                                    continue
                                }
                                if (!S && !cy) {
                                    cI = ak(cH, cG, cz[1], cz[2], cz[3], cz[4], cz[5], cz[6], cB - cF);
                                    return{x: cI.x, y: cI.y, alpha: cI.alpha}
                                }
                            }
                            cF += cD;
                            cH = +cz[5];
                            cG = +cz[6]
                        }
                        cA += cz.shift() + cz
                    }
                    cK.end = cA;
                    cI = S ? cF : cy ? cK : bE.findDotsAtSegment(cH, cG, cz[0], cz[1], cz[2], cz[3], cz[4], cz[5], 1);
                    cI.alpha && (cI = {x: cI.x, y: cI.y, alpha: cI.alpha});
                    return cI
                }
            };
            var bF = bT(1), aJ = bT(), a1 = bT(0, 1);
            bE.getTotalLength = bF;
            bE.getPointAtLength = aJ;
            bE.getSubpath = function (cy, cA, cz) {
                if (this.getTotalLength(cy) - cz < 0.000001) {
                    return a1(cy, cA).end
                }
                var S = a1(cy, cz, 1);
                return cA ? a1(S, cA).end : S
            };
            b4.getTotalLength = function () {
                if (this.type != "path") {
                    return
                }
                if (this.node.getTotalLength) {
                    return this.node.getTotalLength()
                }
                return bF(this.attrs.path)
            };
            b4.getPointAtLength = function (S) {
                if (this.type != "path") {
                    return
                }
                return aJ(this.attrs.path, S)
            };
            b4.getSubpath = function (cy, S) {
                if (this.type != "path") {
                    return
                }
                return bE.getSubpath(this.attrs.path, cy, S)
            };
            var ao = bE.easing_formulas = {linear: function (S) {
                return S
            }, "<": function (S) {
                return cc(S, 1.7)
            }, ">": function (S) {
                return cc(S, 0.48)
            }, "<>": function (cE) {
                var cA = 0.48 - cE / 1.04, cz = bh.sqrt(0.1734 + cA * cA), S = cz - cA, cD = cc(bj(S), 1 / 3) * (S < 0 ? -1 : 1), cC = -cz - cA, cB = cc(bj(cC), 1 / 3) * (cC < 0 ? -1 : 1), cy = cD + cB + 0.5;
                return(1 - cy) * 3 * cy * cy + cy * cy * cy
            }, backIn: function (cy) {
                var S = 1.70158;
                return cy * cy * ((S + 1) * cy - S)
            }, backOut: function (cy) {
                cy = cy - 1;
                var S = 1.70158;
                return cy * cy * ((S + 1) * cy + S) + 1
            }, elastic: function (S) {
                if (S == !!S) {
                    return S
                }
                return cc(2, -10 * S) * bh.sin((S - 0.075) * (2 * bI) / 0.3) + 1
            }, bounce: function (cA) {
                var cy = 7.5625, cz = 2.75, S;
                if (cA < (1 / cz)) {
                    S = cy * cA * cA
                } else {
                    if (cA < (2 / cz)) {
                        cA -= (1.5 / cz);
                        S = cy * cA * cA + 0.75
                    } else {
                        if (cA < (2.5 / cz)) {
                            cA -= (2.25 / cz);
                            S = cy * cA * cA + 0.9375
                        } else {
                            cA -= (2.625 / cz);
                            S = cy * cA * cA + 0.984375
                        }
                    }
                }
                return S
            }};
            ao.easeIn = ao["ease-in"] = ao["<"];
            ao.easeOut = ao["ease-out"] = ao[">"];
            ao.easeInOut = ao["ease-in-out"] = ao["<>"];
            ao["back-in"] = ao.backIn;
            ao["back-out"] = ao.backOut;
            var aZ = [], bA = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (S) {
                setTimeout(S, 16)
            }, cp = function () {
                var cD = +new Date, cL = 0;
                for (; cL < aZ.length; cL++) {
                    var cR = aZ[cL];
                    if (cR.el.removed || cR.paused) {
                        continue
                    }
                    var cA = cD - cR.start, cJ = cR.ms, cI = cR.easing, cM = cR.from, cG = cR.diff, cy = cR.to, cF = cR.t, cC = cR.el, cH = {}, S, cP = {}, cT;
                    if (cR.initstatus) {
                        cA = (cR.initstatus * cR.anim.top - cR.prev) / (cR.percent - cR.prev) * cJ;
                        cR.status = cR.initstatus;
                        delete cR.initstatus;
                        cR.stop && aZ.splice(cL--, 1)
                    } else {
                        cR.status = (cR.prev + (cR.percent - cR.prev) * (cA / cJ)) / cR.anim.top
                    }
                    if (cA < 0) {
                        continue
                    }
                    if (cA < cJ) {
                        var cz = cI(cA / cJ);
                        for (var cK in cM) {
                            if (cM[a8](cK)) {
                                switch (bf[cK]) {
                                    case by:
                                        S = +cM[cK] + cz * cJ * cG[cK];
                                        break;
                                    case"colour":
                                        S = "rgb(" + [aH(a5(cM[cK].r + cz * cJ * cG[cK].r)), aH(a5(cM[cK].g + cz * cJ * cG[cK].g)), aH(a5(cM[cK].b + cz * cJ * cG[cK].b))].join(",") + ")";
                                        break;
                                    case"path":
                                        S = [];
                                        for (var cO = 0, cE = cM[cK].length; cO < cE; cO++) {
                                            S[cO] = [cM[cK][cO][0]];
                                            for (var cN = 1, cQ = cM[cK][cO].length; cN < cQ; cN++) {
                                                S[cO][cN] = +cM[cK][cO][cN] + cz * cJ * cG[cK][cO][cN]
                                            }
                                            S[cO] = S[cO].join(bD)
                                        }
                                        S = S.join(bD);
                                        break;
                                    case"transform":
                                        if (cG[cK].real) {
                                            S = [];
                                            for (cO = 0, cE = cM[cK].length; cO < cE; cO++) {
                                                S[cO] = [cM[cK][cO][0]];
                                                for (cN = 1, cQ = cM[cK][cO].length; cN < cQ; cN++) {
                                                    S[cO][cN] = cM[cK][cO][cN] + cz * cJ * cG[cK][cO][cN]
                                                }
                                            }
                                        } else {
                                            var cS = function (cU) {
                                                return +cM[cK][cU] + cz * cJ * cG[cK][cU]
                                            };
                                            S = [
                                                ["m", cS(0), cS(1), cS(2), cS(3), cS(4), cS(5)]
                                            ]
                                        }
                                        break;
                                    case"csv":
                                        if (cK == "clip-rect") {
                                            S = [];
                                            cO = 4;
                                            while (cO--) {
                                                S[cO] = +cM[cK][cO] + cz * cJ * cG[cK][cO]
                                            }
                                        }
                                        break;
                                    default:
                                        var cB = [][cr](cM[cK]);
                                        S = [];
                                        cO = cC.paper.customAttributes[cK].length;
                                        while (cO--) {
                                            S[cO] = +cB[cO] + cz * cJ * cG[cK][cO]
                                        }
                                        break
                                }
                                cH[cK] = S
                            }
                        }
                        cC.attr(cH);
                        (function (cW, cU, cV) {
                            setTimeout(function () {
                                eve("raphael.anim.frame." + cW, cU, cV)
                            })
                        })(cC.id, cC, cR.anim)
                    } else {
                        (function (cW, cV, cU) {
                            setTimeout(function () {
                                eve("raphael.anim.frame." + cV.id, cV, cU);
                                eve("raphael.anim.finish." + cV.id, cV, cU);
                                bE.is(cW, "function") && cW.call(cV)
                            })
                        })(cR.callback, cC, cR.anim);
                        cC.attr(cy);
                        aZ.splice(cL--, 1);
                        if (cR.repeat > 1 && !cR.next) {
                            for (cT in cy) {
                                if (cy[a8](cT)) {
                                    cP[cT] = cR.totalOrigin[cT]
                                }
                            }
                            cR.el.attr(cP);
                            bz(cR.anim, cR.el, cR.anim.percents[0], null, cR.totalOrigin, cR.repeat - 1)
                        }
                        if (cR.next && !cR.stop) {
                            bz(cR.anim, cR.el, cR.next, null, cR.totalOrigin, cR.repeat)
                        }
                    }
                }
                bE.svg && cC && cC.paper && cC.paper.safari();
                aZ.length && bA(cp)
            }, aH = function (S) {
                return S > 255 ? 255 : S < 0 ? 0 : S
            };
            b4.animateWith = function (cy, cA, cz, S, cD, cI) {
                var cC = this;
                if (cC.removed) {
                    cI && cI.call(cC);
                    return cC
                }
                var cG = cz instanceof cn ? cz : bE.animation(cz, S, cD, cI), cF, cE;
                bz(cG, cC, cG.percents[0], null, cC.attr());
                for (var cB = 0, cH = aZ.length; cB < cH; cB++) {
                    if (aZ[cB].anim == cA && aZ[cB].el == cy) {
                        aZ[cH - 1].start = aZ[cB].start;
                        break
                    }
                }
                return cC
            };
            function bQ(cL, cB, cz, cK, cJ, cF) {
                var cG = 3 * cB, cI = 3 * (cK - cB) - cG, S = 1 - cG - cI, cE = 3 * cz, cH = 3 * (cJ - cz) - cE, cM = 1 - cE - cH;

                function cD(cy) {
                    return((S * cy + cI) * cy + cG) * cy
                }

                function cA(cy, cO) {
                    var cN = cC(cy, cO);
                    return((cM * cN + cH) * cN + cE) * cN
                }

                function cC(cy, cT) {
                    var cS, cR, cP, cN, cQ, cO;
                    for (cP = cy, cO = 0; cO < 8; cO++) {
                        cN = cD(cP) - cy;
                        if (bj(cN) < cT) {
                            return cP
                        }
                        cQ = (3 * S * cP + 2 * cI) * cP + cG;
                        if (bj(cQ) < 0.000001) {
                            break
                        }
                        cP = cP - cN / cQ
                    }
                    cS = 0;
                    cR = 1;
                    cP = cy;
                    if (cP < cS) {
                        return cS
                    }
                    if (cP > cR) {
                        return cR
                    }
                    while (cS < cR) {
                        cN = cD(cP);
                        if (bj(cN - cy) < cT) {
                            return cP
                        }
                        if (cy > cN) {
                            cS = cP
                        } else {
                            cR = cP
                        }
                        cP = (cR - cS) / 2 + cS
                    }
                    return cP
                }

                return cA(cL, 1 / (200 * cF))
            }

            b4.onAnimation = function (S) {
                S ? eve.on("raphael.anim.frame." + this.id, S) : eve.unbind("raphael.anim.frame." + this.id);
                return this
            };
            function cn(cB, cz) {
                var cy = [], cA = {};
                this.ms = cz;
                this.times = 1;
                if (cB) {
                    for (var S in cB) {
                        if (cB[a8](S)) {
                            cA[bb(S)] = cB[S];
                            cy.push(bb(S))
                        }
                    }
                    cy.sort(av)
                }
                this.anim = cA;
                this.top = cy[cy.length - 1];
                this.percents = cy
            }

            cn.prototype.delay = function (cy) {
                var S = new cn(this.anim, this.ms);
                S.times = this.times;
                S.del = +cy || 0;
                return S
            };
            cn.prototype.repeat = function (cy) {
                var S = new cn(this.anim, this.ms);
                S.del = this.del;
                S.times = bh.floor(am(cy, 0)) || 1;
                return S
            };
            function bz(cV, cz, S, cT, cD, cH) {
                S = bb(S);
                var c2, cC, cG, c3 = [], cN, cM, cB, cP = cV.ms, cU = {}, cA = {}, cJ = {};
                if (cT) {
                    for (cY = 0, cI = aZ.length; cY < cI; cY++) {
                        var c0 = aZ[cY];
                        if (c0.el.id == cz.id && c0.anim == cV) {
                            if (c0.percent != S) {
                                aZ.splice(cY, 1);
                                cG = 1
                            } else {
                                cC = c0
                            }
                            cz.attr(c0.totalOrigin);
                            break
                        }
                    }
                } else {
                    cT = +cA
                }
                for (var cY = 0, cI = cV.percents.length; cY < cI; cY++) {
                    if (cV.percents[cY] == S || cV.percents[cY] > cT * cV.top) {
                        S = cV.percents[cY];
                        cM = cV.percents[cY - 1] || 0;
                        cP = cP / cV.top * (S - cM);
                        cN = cV.percents[cY + 1];
                        c2 = cV.anim[S];
                        break
                    } else {
                        if (cT) {
                            cz.attr(cV.anim[cV.percents[cY]])
                        }
                    }
                }
                if (!c2) {
                    return
                }
                if (!cC) {
                    for (var cR in c2) {
                        if (c2[a8](cR)) {
                            if (bf[a8](cR) || cz.paper.customAttributes[a8](cR)) {
                                cU[cR] = cz.attr(cR);
                                (cU[cR] == null) && (cU[cR] = ar[cR]);
                                cA[cR] = c2[cR];
                                switch (bf[cR]) {
                                    case by:
                                        cJ[cR] = (cA[cR] - cU[cR]) / cP;
                                        break;
                                    case"colour":
                                        cU[cR] = bE.getRGB(cU[cR]);
                                        var cS = bE.getRGB(cA[cR]);
                                        cJ[cR] = {r: (cS.r - cU[cR].r) / cP, g: (cS.g - cU[cR].g) / cP, b: (cS.b - cU[cR].b) / cP};
                                        break;
                                    case"path":
                                        var cE = aU(cU[cR], cA[cR]), cL = cE[1];
                                        cU[cR] = cE[0];
                                        cJ[cR] = [];
                                        for (cY = 0, cI = cU[cR].length; cY < cI; cY++) {
                                            cJ[cR][cY] = [0];
                                            for (var cX = 1, cZ = cU[cR][cY].length; cX < cZ; cX++) {
                                                cJ[cR][cY][cX] = (cL[cY][cX] - cU[cR][cY][cX]) / cP
                                            }
                                        }
                                        break;
                                    case"transform":
                                        var c5 = cz._, c4 = bo(c5[cR], cA[cR]);
                                        if (c4) {
                                            cU[cR] = c4.from;
                                            cA[cR] = c4.to;
                                            cJ[cR] = [];
                                            cJ[cR].real = true;
                                            for (cY = 0, cI = cU[cR].length; cY < cI; cY++) {
                                                cJ[cR][cY] = [cU[cR][cY][0]];
                                                for (cX = 1, cZ = cU[cR][cY].length; cX < cZ; cX++) {
                                                    cJ[cR][cY][cX] = (cA[cR][cY][cX] - cU[cR][cY][cX]) / cP
                                                }
                                            }
                                        } else {
                                            var cQ = (cz.matrix || new bs), c1 = {_: {transform: c5.transform}, getBBox: function () {
                                                return cz.getBBox(1)
                                            }};
                                            cU[cR] = [cQ.a, cQ.b, cQ.c, cQ.d, cQ.e, cQ.f];
                                            bB(c1, cA[cR]);
                                            cA[cR] = c1._.transform;
                                            cJ[cR] = [(c1.matrix.a - cQ.a) / cP, (c1.matrix.b - cQ.b) / cP, (c1.matrix.c - cQ.c) / cP, (c1.matrix.d - cQ.d) / cP, (c1.matrix.e - cQ.e) / cP, (c1.matrix.f - cQ.f) / cP]
                                        }
                                        break;
                                    case"csv":
                                        var cy = cu(c2[cR])[aF](ae), cF = cu(cU[cR])[aF](ae);
                                        if (cR == "clip-rect") {
                                            cU[cR] = cF;
                                            cJ[cR] = [];
                                            cY = cF.length;
                                            while (cY--) {
                                                cJ[cR][cY] = (cy[cY] - cU[cR][cY]) / cP
                                            }
                                        }
                                        cA[cR] = cy;
                                        break;
                                    default:
                                        cy = [][cr](c2[cR]);
                                        cF = [][cr](cU[cR]);
                                        cJ[cR] = [];
                                        cY = cz.paper.customAttributes[cR].length;
                                        while (cY--) {
                                            cJ[cR][cY] = ((cy[cY] || 0) - (cF[cY] || 0)) / cP
                                        }
                                        break
                                }
                            }
                        }
                    }
                    var cO = c2.easing, cW = bE.easing_formulas[cO];
                    if (!cW) {
                        cW = cu(cO).match(af);
                        if (cW && cW.length == 5) {
                            var cK = cW;
                            cW = function (c6) {
                                return bQ(c6, +cK[1], +cK[2], +cK[3], +cK[4], cP)
                            }
                        } else {
                            cW = co
                        }
                    }
                    cB = c2.start || cV.start || +new Date;
                    c0 = {anim: cV, percent: S, timestamp: cB, start: cB + (cV.del || 0), status: 0, initstatus: cT || 0, stop: false, ms: cP, easing: cW, from: cU, diff: cJ, to: cA, el: cz, callback: c2.callback, prev: cM, next: cN, repeat: cH || cV.times, origin: cz.attr(), totalOrigin: cD};
                    aZ.push(c0);
                    if (cT && !cC && !cG) {
                        c0.stop = true;
                        c0.start = new Date - cP * cT;
                        if (aZ.length == 1) {
                            return cp()
                        }
                    }
                    if (cG) {
                        c0.start = new Date - c0.ms * cT
                    }
                    aZ.length == 1 && bA(cp)
                } else {
                    cC.initstatus = cT;
                    cC.start = new Date - cC.ms * cT
                }
                eve("raphael.anim.start." + cz.id, cz, cV)
            }

            bE.animation = function (cB, cy, cD, cC) {
                if (cB instanceof cn) {
                    return cB
                }
                if (bE.is(cD, "function") || !cD) {
                    cC = cC || cD || null;
                    cD = null
                }
                cB = Object(cB);
                cy = +cy || 0;
                var cA = {}, cz, S;
                for (S in cB) {
                    if (cB[a8](S) && bb(S) != S && bb(S) + "%" != S) {
                        cz = true;
                        cA[S] = cB[S]
                    }
                }
                if (!cz) {
                    return new cn(cB, cy)
                } else {
                    cD && (cA.easing = cD);
                    cC && (cA.callback = cC);
                    return new cn({100: cA}, cy)
                }
            };
            b4.animate = function (cA, S, cC, cB) {
                var cy = this;
                if (cy.removed) {
                    cB && cB.call(cy);
                    return cy
                }
                var cz = cA instanceof cn ? cA : bE.animation(cA, S, cC, cB);
                bz(cz, cy, cz.percents[0], null, cy.attr());
                return cy
            };
            b4.setTime = function (cy, S) {
                if (cy && S != null) {
                    this.status(cy, b9(S, cy.ms) / cy.ms)
                }
                return this
            };
            b4.status = function (cB, cA) {
                var cy = [], cz = 0, S, cC;
                if (cA != null) {
                    bz(cB, this, -1, b9(cA, 1));
                    return this
                } else {
                    S = aZ.length;
                    for (; cz < S; cz++) {
                        cC = aZ[cz];
                        if (cC.el.id == this.id && (!cB || cC.anim == cB)) {
                            if (cB) {
                                return cC.status
                            }
                            cy.push({anim: cC.anim, status: cC.status})
                        }
                    }
                    if (cB) {
                        return 0
                    }
                    return cy
                }
            };
            b4.pause = function (cy) {
                for (var S = 0; S < aZ.length; S++) {
                    if (aZ[S].el.id == this.id && (!cy || aZ[S].anim == cy)) {
                        if (eve("raphael.anim.pause." + this.id, this, aZ[S].anim) !== false) {
                            aZ[S].paused = true
                        }
                    }
                }
                return this
            };
            b4.resume = function (cy) {
                for (var S = 0; S < aZ.length; S++) {
                    if (aZ[S].el.id == this.id && (!cy || aZ[S].anim == cy)) {
                        var cz = aZ[S];
                        if (eve("raphael.anim.resume." + this.id, this, cz.anim) !== false) {
                            delete cz.paused;
                            this.status(cz.anim, cz.status)
                        }
                    }
                }
                return this
            };
            b4.stop = function (cy) {
                for (var S = 0; S < aZ.length; S++) {
                    if (aZ[S].el.id == this.id && (!cy || aZ[S].anim == cy)) {
                        if (eve("raphael.anim.stop." + this.id, this, aZ[S].anim) !== false) {
                            aZ.splice(S--, 1)
                        }
                    }
                }
                return this
            };
            function aY(cy) {
                for (var S = 0; S < aZ.length; S++) {
                    if (aZ[S].el.paper == cy) {
                        aZ.splice(S--, 1)
                    }
                }
            }

            eve.on("raphael.remove", aY);
            eve.on("raphael.clear", aY);
            b4.toString = function () {
                return"Rapha\xebl\u2019s object"
            };
            var a9 = function (S) {
                this.items = [];
                this.length = 0;
                this.type = "set";
                if (S) {
                    for (var cy = 0, cz = S.length; cy < cz; cy++) {
                        if (S[cy] && (S[cy].constructor == b4.constructor || S[cy].constructor == a9)) {
                            this[this.items.length] = this.items[this.items.length] = S[cy];
                            this.length++
                        }
                    }
                }
            }, bZ = a9.prototype;
            bZ.push = function () {
                var cA, S;
                for (var cy = 0, cz = arguments.length; cy < cz; cy++) {
                    cA = arguments[cy];
                    if (cA && (cA.constructor == b4.constructor || cA.constructor == a9)) {
                        S = this.items.length;
                        this[S] = this.items[S] = cA;
                        this.length++
                    }
                }
                return this
            };
            bZ.pop = function () {
                this.length && delete this[this.length--];
                return this.items.pop()
            };
            bZ.forEach = function (cA, S) {
                for (var cy = 0, cz = this.items.length; cy < cz; cy++) {
                    if (cA.call(S, this.items[cy], cy) === false) {
                        return this
                    }
                }
                return this
            };
            for (var aC in b4) {
                if (b4[a8](aC)) {
                    bZ[aC] = (function (S) {
                        return function () {
                            var cy = arguments;
                            return this.forEach(function (cz) {
                                cz[S][ct](cz, cy)
                            })
                        }
                    })(aC)
                }
            }
            bZ.attr = function (cy, cC) {
                if (cy && bE.is(cy, b0) && bE.is(cy[0], "object")) {
                    for (var S = 0, cB = cy.length; S < cB; S++) {
                        this.items[S].attr(cy[S])
                    }
                } else {
                    for (var cz = 0, cA = this.items.length; cz < cA; cz++) {
                        this.items[cz].attr(cy, cC)
                    }
                }
                return this
            };
            bZ.clear = function () {
                while (this.length) {
                    this.pop()
                }
            };
            bZ.splice = function (cA, cD, cE) {
                cA = cA < 0 ? am(this.length + cA, 0) : cA;
                cD = am(0, b9(this.length - cA, cD));
                var cz = [], S = [], cy = [], cB;
                for (cB = 2; cB < arguments.length; cB++) {
                    cy.push(arguments[cB])
                }
                for (cB = 0; cB < cD; cB++) {
                    S.push(this[cA + cB])
                }
                for (; cB < this.length - cA; cB++) {
                    cz.push(this[cA + cB])
                }
                var cC = cy.length;
                for (cB = 0; cB < cC + cz.length; cB++) {
                    this.items[cA + cB] = this[cA + cB] = cB < cC ? cy[cB] : cz[cB - cC]
                }
                cB = this.items.length = this.length -= cD - cC;
                while (this[cB]) {
                    delete this[cB++]
                }
                return new a9(S)
            };
            bZ.exclude = function (cz) {
                for (var S = 0, cy = this.length; S < cy; S++) {
                    if (this[S] == cz) {
                        this.splice(S, 1);
                        return true
                    }
                }
            };
            bZ.animate = function (cz, S, cD, cF) {
                (bE.is(cD, "function") || !cD) && (cF = cD || null);
                var cC = this.items.length, cA = cC, cG, cE = this, cB;
                if (!cC) {
                    return this
                }
                cF && (cB = function () {
                    !--cC && cF.call(cE)
                });
                cD = bE.is(cD, a7) ? cD : cB;
                var cy = bE.animation(cz, S, cD, cB);
                cG = this.items[--cA].animate(cy);
                while (cA--) {
                    this.items[cA] && !this.items[cA].removed && this.items[cA].animateWith(cG, cy, cy)
                }
                return this
            };
            bZ.insertAfter = function (cy) {
                var S = this.items.length;
                while (S--) {
                    this.items[S].insertAfter(cy)
                }
                return this
            };
            bZ.getBBox = function () {
                var S = [], cC = [], cy = [], cA = [];
                for (var cz = this.items.length; cz--;) {
                    if (!this.items[cz].removed) {
                        var cB = this.items[cz].getBBox();
                        S.push(cB.x);
                        cC.push(cB.y);
                        cy.push(cB.x + cB.width);
                        cA.push(cB.y + cB.height)
                    }
                }
                S = b9[ct](0, S);
                cC = b9[ct](0, cC);
                cy = am[ct](0, cy);
                cA = am[ct](0, cA);
                return{x: S, y: cC, x2: cy, y2: cA, width: cy - S, height: cA - cC}
            };
            bZ.clone = function (cz) {
                cz = new a9;
                for (var S = 0, cy = this.items.length; S < cy; S++) {
                    cz.push(this.items[S].clone())
                }
                return cz
            };
            bZ.toString = function () {
                return"Rapha\xebl\u2018s set"
            };
            bE.registerFont = function (cy) {
                if (!cy.face) {
                    return cy
                }
                this.fonts = this.fonts || {};
                var cA = {w: cy.w, face: {}, glyphs: {}}, cz = cy.face["font-family"];
                for (var cD in cy.face) {
                    if (cy.face[a8](cD)) {
                        cA.face[cD] = cy.face[cD]
                    }
                }
                if (this.fonts[cz]) {
                    this.fonts[cz].push(cA)
                } else {
                    this.fonts[cz] = [cA]
                }
                if (!cy.svg) {
                    cA.face["units-per-em"] = aS(cy.face["units-per-em"], 10);
                    for (var cB in cy.glyphs) {
                        if (cy.glyphs[a8](cB)) {
                            var cC = cy.glyphs[cB];
                            cA.glyphs[cB] = {w: cC.w, k: {}, d: cC.d && "M" + cC.d.replace(/[mlcxtrv]/g, function (cE) {
                                return{l: "L", c: "C", x: "z", t: "m", r: "l", v: "c"}[cE] || "M"
                            }) + "z"};
                            if (cC.k) {
                                for (var S in cC.k) {
                                    if (cC[a8](S)) {
                                        cA.glyphs[cB].k[S] = cC.k[S]
                                    }
                                }
                            }
                        }
                    }
                }
                return cy
            };
            bR.getFont = function (cE, cF, cy, cA) {
                cA = cA || "normal";
                cy = cy || "normal";
                cF = +cF || {normal: 400, bold: 700, lighter: 300, bolder: 800}[cF] || 400;
                if (!bE.fonts) {
                    return
                }
                var cB = bE.fonts[cE];
                if (!cB) {
                    var cz = new RegExp("(^|\\s)" + cE.replace(/[^\w\d\s+!~.:_-]/g, bK) + "(\\s|$)", "i");
                    for (var S in bE.fonts) {
                        if (bE.fonts[a8](S)) {
                            if (cz.test(S)) {
                                cB = bE.fonts[S];
                                break
                            }
                        }
                    }
                }
                var cC;
                if (cB) {
                    for (var cD = 0, cG = cB.length; cD < cG; cD++) {
                        cC = cB[cD];
                        if (cC.face["font-weight"] == cF && (cC.face["font-style"] == cy || !cC.face["font-style"]) && cC.face["font-stretch"] == cA) {
                            break
                        }
                    }
                }
                return cC
            };
            bR.print = function (cD, cC, S, cG, cH, cQ, cy) {
                cQ = cQ || "middle";
                cy = am(b9(cy || 0, 1), -1);
                var cP = cu(S)[aF](bK), cM = 0, cO = 0, cK = bK, cR;
                bE.is(cG, S) && (cG = this.getFont(cG));
                if (cG) {
                    cR = (cH || 16) / cG.face["units-per-em"];
                    var cA = cG.face.bbox[aF](ae), cF = +cA[0], cz = cA[3] - cA[1], cB = 0, cI = +cA[1] + (cQ == "baseline" ? cz + (+cG.face.descent) : cz / 2);
                    for (var cL = 0, cE = cP.length; cL < cE; cL++) {
                        if (cP[cL] == "\n") {
                            cM = 0;
                            cN = 0;
                            cO = 0;
                            cB += cz
                        } else {
                            var cJ = cO && cG.glyphs[cP[cL - 1]] || {}, cN = cG.glyphs[cP[cL]];
                            cM += cO ? (cJ.w || cG.w) + (cJ.k && cJ.k[cP[cL]] || 0) + (cG.w * cy) : 0;
                            cO = 1
                        }
                        if (cN && cN.d) {
                            cK += bE.transformPath(cN.d, ["t", cM * cR, cB * cR, "s", cR, cR, cF, cI, "t", (cD - cF) / cR, (cC - cI) / cR])
                        }
                    }
                }
                return this.path(cK).attr({fill: "#000", stroke: "none"})
            };
            bR.add = function (cA) {
                if (bE.is(cA, "array")) {
                    var cz = this.set(), cy = 0, cB = cA.length, S;
                    for (; cy < cB; cy++) {
                        S = cA[cy] || {};
                        cj[a8](S.type) && cz.push(this[S.type]().attr(S))
                    }
                }
                return cz
            };
            bE.format = function (cy, cz) {
                var S = bE.is(cz, b0) ? [0][cr](cz) : arguments;
                cy && bE.is(cy, a7) && S.length - 1 && (cy = cy.replace(ce, function (cB, cA) {
                    return S[++cA] == null ? bK : S[cA]
                }));
                return cy || bK
            };
            bE.fullfill = (function () {
                var cz = /\{([^\}]+)\}/g, S = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, cy = function (cC, cB, cD) {
                    var cA = cD;
                    cB.replace(S, function (cG, cF, cE, cI, cH) {
                        cF = cF || cI;
                        if (cA) {
                            if (cF in cA) {
                                cA = cA[cF]
                            }
                            typeof cA == "function" && cH && (cA = cA())
                        }
                    });
                    cA = (cA == null || cA == cD ? cC : cA) + "";
                    return cA
                };
                return function (cB, cA) {
                    return String(cB).replace(cz, function (cD, cC) {
                        return cy(cD, cC, cA)
                    })
                }
            })();
            bE.ninja = function () {
                at.was ? (bn.win.Raphael = at.is) : delete Raphael;
                return bE
            };
            bE.st = bZ;
            (function (cA, cy, cz) {
                if (cA.readyState == null && cA.addEventListener) {
                    cA.addEventListener(cy, cz = function () {
                        cA.removeEventListener(cy, cz, false);
                        cA.readyState = "complete"
                    }, false);
                    cA.readyState = "loading"
                }
                function S() {
                    (/in/).test(cA.readyState) ? setTimeout(S, 9) : bE.eve("raphael.DOMload")
                }

                S()
            })(document, "DOMContentLoaded");
            at.was ? (bn.win.Raphael = bE) : (Raphael = bE);
            eve.on("raphael.DOMload", function () {
                bc = true
            })
        })();
        window.Raphael.svg && function (ap) {
            var ah = "hasOwnProperty", aG = String, ar = parseFloat, av = parseInt, aj = Math, aH = aj.max, ax = aj.abs, al = aj.pow, ak = /[, ]+/, aE = ap.eve, aw = "", an = " ";
            var at = "http://www.w3.org/1999/xlink", aD = {block: "M5,0 0,2.5 5,5z", classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z", diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z", open: "M6,1 1,3.5 6,6", oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"}, az = {};
            ap.toString = function () {
                return"Your browser supports SVG.\nYou are running Rapha\xebl " + this.version
            };
            var am = function (aJ, S) {
                if (S) {
                    if (typeof aJ == "string") {
                        aJ = am(aJ)
                    }
                    for (var aI in S) {
                        if (S[ah](aI)) {
                            if (aI.substring(0, 6) == "xlink:") {
                                aJ.setAttributeNS(at, aI.substring(6), aG(S[aI]))
                            } else {
                                aJ.setAttribute(aI, aG(S[aI]))
                            }
                        }
                    }
                } else {
                    aJ = ap._g.doc.createElementNS("http://www.w3.org/2000/svg", aJ);
                    aJ.style && (aJ.style.webkitTapHighlightColor = "rgba(0,0,0,0)")
                }
                return aJ
            }, ae = function (aQ, aU) {
                var aS = "linear", aI = aQ.id + aU, aO = 0.5, aM = 0.5, aK = aQ.node, S = aQ.paper, aW = aK.style, aJ = ap._g.doc.getElementById(aI);
                if (!aJ) {
                    aU = aG(aU).replace(ap._radial_gradient, function (aZ, aX, a0) {
                        aS = "radial";
                        if (aX && a0) {
                            aO = ar(aX);
                            aM = ar(a0);
                            var aY = ((aM > 0.5) * 2 - 1);
                            al(aO - 0.5, 2) + al(aM - 0.5, 2) > 0.25 && (aM = aj.sqrt(0.25 - al(aO - 0.5, 2)) * aY + 0.5) && aM != 0.5 && (aM = aM.toFixed(5) - 0.00001 * aY)
                        }
                        return aw
                    });
                    aU = aU.split(/\s*\-\s*/);
                    if (aS == "linear") {
                        var aN = aU.shift();
                        aN = -ar(aN);
                        if (isNaN(aN)) {
                            return null
                        }
                        var aL = [0, 0, aj.cos(ap.rad(aN)), aj.sin(ap.rad(aN))], aT = 1 / (aH(ax(aL[2]), ax(aL[3])) || 1);
                        aL[2] *= aT;
                        aL[3] *= aT;
                        if (aL[2] < 0) {
                            aL[0] = -aL[2];
                            aL[2] = 0
                        }
                        if (aL[3] < 0) {
                            aL[1] = -aL[3];
                            aL[3] = 0
                        }
                    }
                    var aR = ap._parseDots(aU);
                    if (!aR) {
                        return null
                    }
                    aI = aI.replace(/[\(\)\s,\xb0#]/g, "_");
                    if (aQ.gradient && aI != aQ.gradient.id) {
                        S.defs.removeChild(aQ.gradient);
                        delete aQ.gradient
                    }
                    if (!aQ.gradient) {
                        aJ = am(aS + "Gradient", {id: aI});
                        aQ.gradient = aJ;
                        am(aJ, aS == "radial" ? {fx: aO, fy: aM} : {x1: aL[0], y1: aL[1], x2: aL[2], y2: aL[3], gradientTransform: aQ.matrix.invert()});
                        S.defs.appendChild(aJ);
                        for (var aP = 0, aV = aR.length; aP < aV; aP++) {
                            aJ.appendChild(am("stop", {offset: aR[aP].offset ? aR[aP].offset : aP ? "100%" : "0%", "stop-color": aR[aP].color || "#fff"}))
                        }
                    }
                }
                am(aK, {fill: "url(#" + aI + ")", opacity: 1, "fill-opacity": 1});
                aW.fill = aw;
                aW.opacity = 1;
                aW.fillOpacity = 1;
                return 1
            }, af = function (aI) {
                var S = aI.getBBox(1);
                am(aI.pattern, {patternTransform: aI.matrix.invert() + " translate(" + S.x + "," + S.y + ")"})
            }, ag = function (aS, aU, aN) {
                if (aS.type == "path") {
                    var S = aG(aU).toLowerCase().split("-"), aR = aS.paper, a5 = aN ? "end" : "start", aW = aS.node, aT = aS.attrs, aM = aT["stroke-width"], a0 = S.length, aK = "classic", aZ, aJ, aP, aX, aV, aO = 3, a1 = 3, aQ = 5;
                    while (a0--) {
                        switch (S[a0]) {
                            case"block":
                            case"classic":
                            case"oval":
                            case"diamond":
                            case"open":
                            case"none":
                                aK = S[a0];
                                break;
                            case"wide":
                                a1 = 5;
                                break;
                            case"narrow":
                                a1 = 2;
                                break;
                            case"long":
                                aO = 5;
                                break;
                            case"short":
                                aO = 2;
                                break
                        }
                    }
                    if (aK == "open") {
                        aO += 2;
                        a1 += 2;
                        aQ += 2;
                        aP = 1;
                        aX = aN ? 4 : 1;
                        aV = {fill: "none", stroke: aT.stroke}
                    } else {
                        aX = aP = aO / 2;
                        aV = {fill: aT.stroke, stroke: "none"}
                    }
                    if (aS._.arrows) {
                        if (aN) {
                            aS._.arrows.endPath && az[aS._.arrows.endPath]--;
                            aS._.arrows.endMarker && az[aS._.arrows.endMarker]--
                        } else {
                            aS._.arrows.startPath && az[aS._.arrows.startPath]--;
                            aS._.arrows.startMarker && az[aS._.arrows.startMarker]--
                        }
                    } else {
                        aS._.arrows = {}
                    }
                    if (aK != "none") {
                        var aI = "raphael-marker-" + aK, a4 = "raphael-marker-" + a5 + aK + aO + a1;
                        if (!ap._g.doc.getElementById(aI)) {
                            aR.defs.appendChild(am(am("path"), {"stroke-linecap": "round", d: aD[aK], id: aI}));
                            az[aI] = 1
                        } else {
                            az[aI]++
                        }
                        var aL = ap._g.doc.getElementById(a4), aY;
                        if (!aL) {
                            aL = am(am("marker"), {id: a4, markerHeight: a1, markerWidth: aO, orient: "auto", refX: aX, refY: a1 / 2});
                            aY = am(am("use"), {"xlink:href": "#" + aI, transform: (aN ? "rotate(180 " + aO / 2 + " " + a1 / 2 + ") " : aw) + "scale(" + aO / aQ + "," + a1 / aQ + ")", "stroke-width": (1 / ((aO / aQ + a1 / aQ) / 2)).toFixed(4)});
                            aL.appendChild(aY);
                            aR.defs.appendChild(aL);
                            az[a4] = 1
                        } else {
                            az[a4]++;
                            aY = aL.getElementsByTagName("use")[0]
                        }
                        am(aY, aV);
                        var a3 = aP * (aK != "diamond" && aK != "oval");
                        if (aN) {
                            aZ = aS._.arrows.startdx * aM || 0;
                            aJ = ap.getTotalLength(aT.path) - a3 * aM
                        } else {
                            aZ = a3 * aM;
                            aJ = ap.getTotalLength(aT.path) - (aS._.arrows.enddx * aM || 0)
                        }
                        aV = {};
                        aV["marker-" + a5] = "url(#" + a4 + ")";
                        if (aJ || aZ) {
                            aV.d = Raphael.getSubpath(aT.path, aZ, aJ)
                        }
                        am(aW, aV);
                        aS._.arrows[a5 + "Path"] = aI;
                        aS._.arrows[a5 + "Marker"] = a4;
                        aS._.arrows[a5 + "dx"] = a3;
                        aS._.arrows[a5 + "Type"] = aK;
                        aS._.arrows[a5 + "String"] = aU
                    } else {
                        if (aN) {
                            aZ = aS._.arrows.startdx * aM || 0;
                            aJ = ap.getTotalLength(aT.path) - aZ
                        } else {
                            aZ = 0;
                            aJ = ap.getTotalLength(aT.path) - (aS._.arrows.enddx * aM || 0)
                        }
                        aS._.arrows[a5 + "Path"] && am(aW, {d: Raphael.getSubpath(aT.path, aZ, aJ)});
                        delete aS._.arrows[a5 + "Path"];
                        delete aS._.arrows[a5 + "Marker"];
                        delete aS._.arrows[a5 + "dx"];
                        delete aS._.arrows[a5 + "Type"];
                        delete aS._.arrows[a5 + "String"]
                    }
                    for (aV in az) {
                        if (az[ah](aV) && !az[aV]) {
                            var a2 = ap._g.doc.getElementById(aV);
                            a2 && a2.parentNode.removeChild(a2)
                        }
                    }
                }
            }, aA = {"": [0], none: [0], "-": [3, 1], ".": [1, 1], "-.": [3, 1, 1, 1], "-..": [3, 1, 1, 1, 1, 1], ". ": [1, 3], "- ": [4, 3], "--": [8, 3], "- .": [4, 3, 1, 3], "--.": [8, 3, 1, 3], "--..": [8, 3, 1, 3, 1, 3]}, ao = function (aN, aL, aM) {
                aL = aA[aG(aL).toLowerCase()];
                if (aL) {
                    var aJ = aN.attrs["stroke-width"] || "1", S = {round: aJ, square: aJ, butt: 0}[aN.attrs["stroke-linecap"] || aM["stroke-linecap"]] || 0, aK = [], aI = aL.length;
                    while (aI--) {
                        aK[aI] = aL[aI] * aJ + ((aI % 2) ? 1 : -1) * S
                    }
                    am(aN.node, {"stroke-dasharray": aK.join(",")})
                }
            }, aB = function (aS, a0) {
                var aW = aS.node, aT = aS.attrs, aQ = aW.style.visibility;
                aW.style.visibility = "hidden";
                for (var aV in a0) {
                    if (a0[ah](aV)) {
                        if (!ap._availableAttrs[ah](aV)) {
                            continue
                        }
                        var aU = a0[aV];
                        aT[aV] = aU;
                        switch (aV) {
                            case"blur":
                                aS.blur(aU);
                                break;
                            case"href":
                            case"title":
                            case"target":
                                var aY = aW.parentNode;
                                if (aY.tagName.toLowerCase() != "a") {
                                    var aL = am("a");
                                    aY.insertBefore(aL, aW);
                                    aL.appendChild(aW);
                                    aY = aL
                                }
                                if (aV == "target") {
                                    aY.setAttributeNS(at, "show", aU == "blank" ? "new" : aU)
                                } else {
                                    aY.setAttributeNS(at, aV, aU)
                                }
                                break;
                            case"cursor":
                                aW.style.cursor = aU;
                                break;
                            case"transform":
                                aS.transform(aU);
                                break;
                            case"arrow-start":
                                ag(aS, aU);
                                break;
                            case"arrow-end":
                                ag(aS, aU, 1);
                                break;
                            case"clip-rect":
                                var aI = aG(aU).split(ak);
                                if (aI.length == 4) {
                                    aS.clip && aS.clip.parentNode.parentNode.removeChild(aS.clip.parentNode);
                                    var aJ = am("clipPath"), aX = am("rect");
                                    aJ.id = ap.createUUID();
                                    am(aX, {x: aI[0], y: aI[1], width: aI[2], height: aI[3]});
                                    aJ.appendChild(aX);
                                    aS.paper.defs.appendChild(aJ);
                                    am(aW, {"clip-path": "url(#" + aJ.id + ")"});
                                    aS.clip = aX
                                }
                                if (!aU) {
                                    var aR = aW.getAttribute("clip-path");
                                    if (aR) {
                                        var aZ = ap._g.doc.getElementById(aR.replace(/(^url\(#|\)$)/g, aw));
                                        aZ && aZ.parentNode.removeChild(aZ);
                                        am(aW, {"clip-path": aw});
                                        delete aS.clip
                                    }
                                }
                                break;
                            case"path":
                                if (aS.type == "path") {
                                    am(aW, {d: aU ? aT.path = ap._pathToAbsolute(aU) : "M0,0"});
                                    aS._.dirty = 1;
                                    if (aS._.arrows) {
                                        "startString" in aS._.arrows && ag(aS, aS._.arrows.startString);
                                        "endString" in aS._.arrows && ag(aS, aS._.arrows.endString, 1)
                                    }
                                }
                                break;
                            case"width":
                                aW.setAttribute(aV, aU);
                                aS._.dirty = 1;
                                if (aT.fx) {
                                    aV = "x";
                                    aU = aT.x
                                } else {
                                    break
                                }
                            case"x":
                                if (aT.fx) {
                                    aU = -aT.x - (aT.width || 0)
                                }
                            case"rx":
                                if (aV == "rx" && aS.type == "rect") {
                                    break
                                }
                            case"cx":
                                aW.setAttribute(aV, aU);
                                aS.pattern && af(aS);
                                aS._.dirty = 1;
                                break;
                            case"height":
                                aW.setAttribute(aV, aU);
                                aS._.dirty = 1;
                                if (aT.fy) {
                                    aV = "y";
                                    aU = aT.y
                                } else {
                                    break
                                }
                            case"y":
                                if (aT.fy) {
                                    aU = -aT.y - (aT.height || 0)
                                }
                            case"ry":
                                if (aV == "ry" && aS.type == "rect") {
                                    break
                                }
                            case"cy":
                                aW.setAttribute(aV, aU);
                                aS.pattern && af(aS);
                                aS._.dirty = 1;
                                break;
                            case"r":
                                if (aS.type == "rect") {
                                    am(aW, {rx: aU, ry: aU})
                                } else {
                                    aW.setAttribute(aV, aU)
                                }
                                aS._.dirty = 1;
                                break;
                            case"src":
                                if (aS.type == "image") {
                                    aW.setAttributeNS(at, "href", aU)
                                }
                                break;
                            case"stroke-width":
                                if (aS._.sx != 1 || aS._.sy != 1) {
                                    aU /= aH(ax(aS._.sx), ax(aS._.sy)) || 1
                                }
                                if (aS.paper._vbSize) {
                                    aU *= aS.paper._vbSize
                                }
                                aW.setAttribute(aV, aU);
                                if (aT["stroke-dasharray"]) {
                                    ao(aS, aT["stroke-dasharray"], a0)
                                }
                                if (aS._.arrows) {
                                    "startString" in aS._.arrows && ag(aS, aS._.arrows.startString);
                                    "endString" in aS._.arrows && ag(aS, aS._.arrows.endString, 1)
                                }
                                break;
                            case"stroke-dasharray":
                                ao(aS, aU, a0);
                                break;
                            case"fill":
                                var aM = aG(aU).match(ap._ISURL);
                                if (aM) {
                                    aJ = am("pattern");
                                    var aP = am("image");
                                    aJ.id = ap.createUUID();
                                    am(aJ, {x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1});
                                    am(aP, {x: 0, y: 0, "xlink:href": aM[1]});
                                    aJ.appendChild(aP);
                                    (function (a1) {
                                        ap._preload(aM[1], function () {
                                            var a2 = this.offsetWidth, a3 = this.offsetHeight;
                                            am(a1, {width: a2, height: a3});
                                            am(aP, {width: a2, height: a3});
                                            aS.paper.safari()
                                        })
                                    })(aJ);
                                    aS.paper.defs.appendChild(aJ);
                                    am(aW, {fill: "url(#" + aJ.id + ")"});
                                    aS.pattern = aJ;
                                    aS.pattern && af(aS);
                                    break
                                }
                                var aK = ap.getRGB(aU);
                                if (!aK.error) {
                                    delete a0.gradient;
                                    delete aT.gradient;
                                    !ap.is(aT.opacity, "undefined") && ap.is(a0.opacity, "undefined") && am(aW, {opacity: aT.opacity});
                                    !ap.is(aT["fill-opacity"], "undefined") && ap.is(a0["fill-opacity"], "undefined") && am(aW, {"fill-opacity": aT["fill-opacity"]})
                                } else {
                                    if ((aS.type == "circle" || aS.type == "ellipse" || aG(aU).charAt() != "r") && ae(aS, aU)) {
                                        if ("opacity" in aT || "fill-opacity" in aT) {
                                            var S = ap._g.doc.getElementById(aW.getAttribute("fill").replace(/^url\(#|\)$/g, aw));
                                            if (S) {
                                                var aN = S.getElementsByTagName("stop");
                                                am(aN[aN.length - 1], {"stop-opacity": ("opacity" in aT ? aT.opacity : 1) * ("fill-opacity" in aT ? aT["fill-opacity"] : 1)})
                                            }
                                        }
                                        aT.gradient = aU;
                                        aT.fill = "none";
                                        break
                                    }
                                }
                                aK[ah]("opacity") && am(aW, {"fill-opacity": aK.opacity > 1 ? aK.opacity / 100 : aK.opacity});
                            case"stroke":
                                aK = ap.getRGB(aU);
                                aW.setAttribute(aV, aK.hex);
                                aV == "stroke" && aK[ah]("opacity") && am(aW, {"stroke-opacity": aK.opacity > 1 ? aK.opacity / 100 : aK.opacity});
                                if (aV == "stroke" && aS._.arrows) {
                                    "startString" in aS._.arrows && ag(aS, aS._.arrows.startString);
                                    "endString" in aS._.arrows && ag(aS, aS._.arrows.endString, 1)
                                }
                                break;
                            case"gradient":
                                (aS.type == "circle" || aS.type == "ellipse" || aG(aU).charAt() != "r") && ae(aS, aU);
                                break;
                            case"opacity":
                                if (aT.gradient && !aT[ah]("stroke-opacity")) {
                                    am(aW, {"stroke-opacity": aU > 1 ? aU / 100 : aU})
                                }
                            case"fill-opacity":
                                if (aT.gradient) {
                                    S = ap._g.doc.getElementById(aW.getAttribute("fill").replace(/^url\(#|\)$/g, aw));
                                    if (S) {
                                        aN = S.getElementsByTagName("stop");
                                        am(aN[aN.length - 1], {"stop-opacity": aU})
                                    }
                                    break
                                }
                            default:
                                aV == "font-size" && (aU = av(aU, 10) + "px");
                                var aO = aV.replace(/(\-.)/g, function (a1) {
                                    return a1.substring(1).toUpperCase()
                                });
                                aW.style[aO] = aU;
                                aS._.dirty = 1;
                                aW.setAttribute(aV, aU);
                                break
                        }
                    }
                }
                au(aS, a0);
                aW.style.visibility = aQ
            }, aF = 1.2, au = function (S, aL) {
                if (S.type != "text" || !(aL[ah]("text") || aL[ah]("font") || aL[ah]("font-size") || aL[ah]("x") || aL[ah]("y"))) {
                    return
                }
                var aQ = S.attrs, aJ = S.node, aS = aJ.firstChild ? av(ap._g.doc.defaultView.getComputedStyle(aJ.firstChild, aw).getPropertyValue("font-size"), 10) : 10;
                if (aL[ah]("text")) {
                    aQ.text = aL.text;
                    while (aJ.firstChild) {
                        aJ.removeChild(aJ.firstChild)
                    }
                    var aK = aG(aL.text).split("\n"), aI = [], aO;
                    for (var aM = 0, aR = aK.length; aM < aR; aM++) {
                        aO = am("tspan");
                        aM && am(aO, {dy: aS * aF, x: aQ.x});
                        aO.appendChild(ap._g.doc.createTextNode(aK[aM]));
                        aJ.appendChild(aO);
                        aI[aM] = aO
                    }
                } else {
                    aI = aJ.getElementsByTagName("tspan");
                    for (aM = 0, aR = aI.length; aM < aR; aM++) {
                        if (aM) {
                            am(aI[aM], {dy: aS * aF, x: aQ.x})
                        } else {
                            am(aI[0], {dy: 0})
                        }
                    }
                }
                am(aJ, {x: aQ.x, y: aQ.y});
                S._.dirty = 1;
                var aN = S._getBBox(), aP = aQ.y - (aN.y + aN.height / 2);
                aP && ap.is(aP, "finite") && am(aI[0], {dy: aP})
            }, ay = function (aI, S) {
                var aK = 0, aJ = 0;
                this[0] = this.node = aI;
                aI.raphael = true;
                this.id = ap._oid++;
                aI.raphaelid = this.id;
                this.matrix = ap.matrix();
                this.realPath = null;
                this.paper = S;
                this.attrs = this.attrs || {};
                this._ = {transform: [], sx: 1, sy: 1, deg: 0, dx: 0, dy: 0, dirty: 1};
                !S.bottom && (S.bottom = this);
                this.prev = S.top;
                S.top && (S.top.next = this);
                S.top = this;
                this.next = null
            }, aq = ap.el;
            ay.prototype = aq;
            aq.constructor = ay;
            ap._engine.path = function (S, aK) {
                var aI = am("path");
                aK.canvas && aK.canvas.appendChild(aI);
                var aJ = new ay(aI, aK);
                aJ.type = "path";
                aB(aJ, {fill: "none", stroke: "#000", path: S});
                return aJ
            };
            aq.rotate = function (aI, S, aK) {
                if (this.removed) {
                    return this
                }
                aI = aG(aI).split(ak);
                if (aI.length - 1) {
                    S = ar(aI[1]);
                    aK = ar(aI[2])
                }
                aI = ar(aI[0]);
                (aK == null) && (S = aK);
                if (S == null || aK == null) {
                    var aJ = this.getBBox(1);
                    S = aJ.x + aJ.width / 2;
                    aK = aJ.y + aJ.height / 2
                }
                this.transform(this._.transform.concat([
                    ["r", aI, S, aK]
                ]));
                return this
            };
            aq.scale = function (aL, aJ, S, aK) {
                if (this.removed) {
                    return this
                }
                aL = aG(aL).split(ak);
                if (aL.length - 1) {
                    aJ = ar(aL[1]);
                    S = ar(aL[2]);
                    aK = ar(aL[3])
                }
                aL = ar(aL[0]);
                (aJ == null) && (aJ = aL);
                (aK == null) && (S = aK);
                if (S == null || aK == null) {
                    var aI = this.getBBox(1)
                }
                S = S == null ? aI.x + aI.width / 2 : S;
                aK = aK == null ? aI.y + aI.height / 2 : aK;
                this.transform(this._.transform.concat([
                    ["s", aL, aJ, S, aK]
                ]));
                return this
            };
            aq.translate = function (aI, S) {
                if (this.removed) {
                    return this
                }
                aI = aG(aI).split(ak);
                if (aI.length - 1) {
                    S = ar(aI[1])
                }
                aI = ar(aI[0]) || 0;
                S = +S || 0;
                this.transform(this._.transform.concat([
                    ["t", aI, S]
                ]));
                return this
            };
            aq.transform = function (aI) {
                var aJ = this._;
                if (aI == null) {
                    return aJ.transform
                }
                ap._extractTransform(this, aI);
                this.clip && am(this.clip, {transform: this.matrix.invert()});
                this.pattern && af(this);
                this.node && am(this.node, {transform: this.matrix});
                if (aJ.sx != 1 || aJ.sy != 1) {
                    var S = this.attrs[ah]("stroke-width") ? this.attrs["stroke-width"] : 1;
                    this.attr({"stroke-width": S})
                }
                return this
            };
            aq.hide = function () {
                !this.removed && this.paper.safari(this.node.style.display = "none");
                return this
            };
            aq.show = function () {
                !this.removed && this.paper.safari(this.node.style.display = "");
                return this
            };
            aq.remove = function () {
                if (this.removed || !this.node.parentNode) {
                    return
                }
                var aI = this.paper;
                aI.__set__ && aI.__set__.exclude(this);
                aE.unbind("raphael.*.*." + this.id);
                if (this.gradient) {
                    aI.defs.removeChild(this.gradient)
                }
                ap._tear(this, aI);
                if (this.node.parentNode.tagName.toLowerCase() == "a") {
                    this.node.parentNode.parentNode.removeChild(this.node.parentNode)
                } else {
                    this.node.parentNode.removeChild(this.node)
                }
                for (var S in this) {
                    this[S] = typeof this[S] == "function" ? ap._removedFactory(S) : null
                }
                this.removed = true
            };
            aq._getBBox = function () {
                if (this.node.style.display == "none") {
                    this.show();
                    var S = true
                }
                var aJ = {};
                try {
                    aJ = this.node.getBBox()
                } catch (aI) {
                } finally {
                    aJ = aJ || {}
                }
                S && this.hide();
                return aJ
            };
            aq.attr = function (S, aQ) {
                if (this.removed) {
                    return this
                }
                if (S == null) {
                    var aN = {};
                    for (var aP in this.attrs) {
                        if (this.attrs[ah](aP)) {
                            aN[aP] = this.attrs[aP]
                        }
                    }
                    aN.gradient && aN.fill == "none" && (aN.fill = aN.gradient) && delete aN.gradient;
                    aN.transform = this._.transform;
                    return aN
                }
                if (aQ == null && ap.is(S, "string")) {
                    if (S == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
                        return this.attrs.gradient
                    }
                    if (S == "transform") {
                        return this._.transform
                    }
                    var aO = S.split(ak), aK = {};
                    for (var aL = 0, aS = aO.length; aL < aS; aL++) {
                        S = aO[aL];
                        if (S in this.attrs) {
                            aK[S] = this.attrs[S]
                        } else {
                            if (ap.is(this.paper.customAttributes[S], "function")) {
                                aK[S] = this.paper.customAttributes[S].def
                            } else {
                                aK[S] = ap._availableAttrs[S]
                            }
                        }
                    }
                    return aS - 1 ? aK : aK[aO[0]]
                }
                if (aQ == null && ap.is(S, "array")) {
                    aK = {};
                    for (aL = 0, aS = S.length; aL < aS; aL++) {
                        aK[S[aL]] = this.attr(S[aL])
                    }
                    return aK
                }
                if (aQ != null) {
                    var aI = {};
                    aI[S] = aQ
                } else {
                    if (S != null && ap.is(S, "object")) {
                        aI = S
                    }
                }
                for (var aR in aI) {
                    aE("raphael.attr." + aR + "." + this.id, this, aI[aR])
                }
                for (aR in this.paper.customAttributes) {
                    if (this.paper.customAttributes[ah](aR) && aI[ah](aR) && ap.is(this.paper.customAttributes[aR], "function")) {
                        var aM = this.paper.customAttributes[aR].apply(this, [].concat(aI[aR]));
                        this.attrs[aR] = aI[aR];
                        for (var aJ in aM) {
                            if (aM[ah](aJ)) {
                                aI[aJ] = aM[aJ]
                            }
                        }
                    }
                }
                aB(this, aI);
                return this
            };
            aq.toFront = function () {
                if (this.removed) {
                    return this
                }
                if (this.node.parentNode.tagName.toLowerCase() == "a") {
                    this.node.parentNode.parentNode.appendChild(this.node.parentNode)
                } else {
                    this.node.parentNode.appendChild(this.node)
                }
                var S = this.paper;
                S.top != this && ap._tofront(this, S);
                return this
            };
            aq.toBack = function () {
                if (this.removed) {
                    return this
                }
                var aI = this.node.parentNode;
                if (aI.tagName.toLowerCase() == "a") {
                    aI.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild)
                } else {
                    if (aI.firstChild != this.node) {
                        aI.insertBefore(this.node, this.node.parentNode.firstChild)
                    }
                }
                ap._toback(this, this.paper);
                var S = this.paper;
                return this
            };
            aq.insertAfter = function (S) {
                if (this.removed) {
                    return this
                }
                var aI = S.node || S[S.length - 1].node;
                if (aI.nextSibling) {
                    aI.parentNode.insertBefore(this.node, aI.nextSibling)
                } else {
                    aI.parentNode.appendChild(this.node)
                }
                ap._insertafter(this, S, this.paper);
                return this
            };
            aq.insertBefore = function (S) {
                if (this.removed) {
                    return this
                }
                var aI = S.node || S[0].node;
                aI.parentNode.insertBefore(this.node, aI);
                ap._insertbefore(this, S, this.paper);
                return this
            };
            aq.blur = function (aI) {
                var S = this;
                if (+aI !== 0) {
                    var aJ = am("filter"), aK = am("feGaussianBlur");
                    S.attrs.blur = aI;
                    aJ.id = ap.createUUID();
                    am(aK, {stdDeviation: +aI || 1.5});
                    aJ.appendChild(aK);
                    S.paper.defs.appendChild(aJ);
                    S._blur = aJ;
                    am(S.node, {filter: "url(#" + aJ.id + ")"})
                } else {
                    if (S._blur) {
                        S._blur.parentNode.removeChild(S._blur);
                        delete S._blur;
                        delete S.attrs.blur
                    }
                    S.node.removeAttribute("filter")
                }
            };
            ap._engine.circle = function (aI, S, aM, aL) {
                var aK = am("circle");
                aI.canvas && aI.canvas.appendChild(aK);
                var aJ = new ay(aK, aI);
                aJ.attrs = {cx: S, cy: aM, r: aL, fill: "none", stroke: "#000"};
                aJ.type = "circle";
                am(aK, aJ.attrs);
                return aJ
            };
            ap._engine.rect = function (aJ, S, aO, aI, aM, aN) {
                var aL = am("rect");
                aJ.canvas && aJ.canvas.appendChild(aL);
                var aK = new ay(aL, aJ);
                aK.attrs = {x: S, y: aO, width: aI, height: aM, r: aN || 0, rx: aN || 0, ry: aN || 0, fill: "none", stroke: "#000"};
                aK.type = "rect";
                am(aL, aK.attrs);
                return aK
            };
            ap._engine.ellipse = function (aI, S, aN, aM, aL) {
                var aK = am("ellipse");
                aI.canvas && aI.canvas.appendChild(aK);
                var aJ = new ay(aK, aI);
                aJ.attrs = {cx: S, cy: aN, rx: aM, ry: aL, fill: "none", stroke: "#000"};
                aJ.type = "ellipse";
                am(aK, aJ.attrs);
                return aJ
            };
            ap._engine.image = function (aJ, aN, S, aO, aI, aM) {
                var aL = am("image");
                am(aL, {x: S, y: aO, width: aI, height: aM, preserveAspectRatio: "none"});
                aL.setAttributeNS(at, "href", aN);
                aJ.canvas && aJ.canvas.appendChild(aL);
                var aK = new ay(aL, aJ);
                aK.attrs = {x: S, y: aO, width: aI, height: aM, src: aN};
                aK.type = "image";
                return aK
            };
            ap._engine.text = function (aI, S, aM, aL) {
                var aK = am("text");
                aI.canvas && aI.canvas.appendChild(aK);
                var aJ = new ay(aK, aI);
                aJ.attrs = {x: S, y: aM, "text-anchor": "middle", text: aL, font: ap._availableAttrs.font, stroke: "none", fill: "#000"};
                aJ.type = "text";
                aB(aJ, aJ.attrs);
                return aJ
            };
            ap._engine.setSize = function (aI, S) {
                this.width = aI || this.width;
                this.height = S || this.height;
                this.canvas.setAttribute("width", this.width);
                this.canvas.setAttribute("height", this.height);
                if (this._viewBox) {
                    this.setViewBox.apply(this, this._viewBox)
                }
                return this
            };
            ap._engine.create = function () {
                var aK = ap._getContainer.apply(0, arguments), aI = aK && aK.container, aO = aK.x, aN = aK.y, aJ = aK.width, aP = aK.height;
                if (!aI) {
                    throw new Error("SVG container not found.")
                }
                var S = am("svg"), aM = "overflow:hidden;", aL;
                aO = aO || 0;
                aN = aN || 0;
                aJ = aJ || 512;
                aP = aP || 342;
                am(S, {height: aP, version: 1.1, width: aJ, xmlns: "http://www.w3.org/2000/svg"});
                if (aI == 1) {
                    S.style.cssText = aM + "position:absolute;left:" + aO + "px;top:" + aN + "px";
                    ap._g.doc.body.appendChild(S);
                    aL = 1
                } else {
                    S.style.cssText = aM + "position:absolute";
                    if (aI.firstChild) {
                        aI.insertBefore(S, aI.firstChild)
                    } else {
                        aI.appendChild(S)
                    }
                }
                aI = new ap._Paper;
                aI.width = aJ;
                aI.height = aP;
                aI.canvas = S;
                aI.clear();
                aI._left = aI._top = 0;
                aL && (aI.renderfix = function () {
                });
                aI.renderfix();
                return aI
            };
            ap._engine.setViewBox = function (aM, aK, aO, S, aI) {
                aE("raphael.setViewBox", this, this._viewBox, [aM, aK, aO, S, aI]);
                var aQ = aH(aO / this.width, S / this.height), aL = this.top, aP = aI ? "meet" : "xMinYMin", aJ, aN;
                if (aM == null) {
                    if (this._vbSize) {
                        aQ = 1
                    }
                    delete this._vbSize;
                    aJ = "0 0 " + this.width + an + this.height
                } else {
                    this._vbSize = aQ;
                    aJ = aM + an + aK + an + aO + an + S
                }
                am(this.canvas, {viewBox: aJ, preserveAspectRatio: aP});
                while (aQ && aL) {
                    aN = "stroke-width" in aL.attrs ? aL.attrs["stroke-width"] : 1;
                    aL.attr({"stroke-width": aN});
                    aL._.dirty = 1;
                    aL._.dirtyT = 1;
                    aL = aL.prev
                }
                this._viewBox = [aM, aK, aO, S, !!aI];
                return this
            };
            ap.prototype.renderfix = function () {
                var aM = this.canvas, S = aM.style, aL;
                try {
                    aL = aM.getScreenCTM() || aM.createSVGMatrix()
                } catch (aK) {
                    aL = aM.createSVGMatrix()
                }
                var aJ = -aL.e % 1, aI = -aL.f % 1;
                if (aJ || aI) {
                    if (aJ) {
                        this._left = (this._left + aJ) % 1
                    }
                    if (aI) {
                        this._top = (this._top + aI) % 1
                    }
                }
            };
            ap.prototype.clear = function () {
                ap.eve("raphael.clear", this);
                var S = this.canvas;
                while (S.firstChild) {
                    S.removeChild(S.firstChild)
                }
                this.bottom = this.top = null;
                (this.desc = am("desc")).appendChild(ap._g.doc.createTextNode("Created with Rapha\xebl " + ap.version));
                S.appendChild(this.desc);
                S.appendChild(this.defs = am("defs"))
            };
            ap.prototype.remove = function () {
                aE("raphael.remove", this);
                this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
                for (var S in this) {
                    this[S] = typeof this[S] == "function" ? ap._removedFactory(S) : null
                }
            };
            var aC = ap.st;
            for (var ai in aq) {
                if (aq[ah](ai) && !aC[ah](ai)) {
                    aC[ai] = (function (S) {
                        return function () {
                            var aI = arguments;
                            return this.forEach(function (aJ) {
                                aJ[S].apply(aJ, aI)
                            })
                        }
                    })(ai)
                }
            }
        }(window.Raphael);
        window.Raphael.vml && function (ap) {
            var ai = "hasOwnProperty", aJ = String, ar = parseFloat, al = Math, aG = al.round, aM = al.max, aH = al.min, ax = al.abs, aA = "fill", am = /[, ]+/, aF = ap.eve, aB = " progid:DXImageTransform.Microsoft", ao = " ", av = "", aI = {M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x"}, an = /([clmz]),?([^clmz]*)/gi, ay = / progid:\S+Blur\([^\)]+\)/g, aL = /-?[^,\s-]+/g, ah = "position:absolute;left:0;top:0;width:1px;height:1px", af = 21600, aE = {path: 1, rect: 1, image: 1}, aw = {circle: 1, ellipse: 1}, aj = function (aW) {
                var aT = /[ahqstv]/ig, aO = ap._pathToAbsolute;
                aJ(aW).match(aT) && (aO = ap._path2curve);
                aT = /[clmz]/g;
                if (aO == ap._pathToAbsolute && !aJ(aW).match(aT)) {
                    var aS = aJ(aW).replace(an, function (a0, a2, aY) {
                        var a1 = [], aX = a2.toLowerCase() == "m", aZ = aI[a2];
                        aY.replace(aL, function (a3) {
                            if (aX && a1.length == 2) {
                                aZ += a1 + aI[a2 == "m" ? "l" : "L"];
                                a1 = []
                            }
                            a1.push(aG(a3 * af))
                        });
                        return aZ + a1
                    });
                    return aS
                }
                var aU = aO(aW), aN, S;
                aS = [];
                for (var aQ = 0, aV = aU.length; aQ < aV; aQ++) {
                    aN = aU[aQ];
                    S = aU[aQ][0].toLowerCase();
                    S == "z" && (S = "x");
                    for (var aP = 1, aR = aN.length; aP < aR; aP++) {
                        S += aG(aN[aP] * af) + (aP != aR - 1 ? "," : av)
                    }
                    aS.push(S)
                }
                return aS.join(ao)
            }, at = function (aP, aO, aN) {
                var S = ap.matrix();
                S.rotate(-aP, 0.5, 0.5);
                return{dx: S.x(aO, aN), dy: S.y(aO, aN)}
            }, au = function (aV, aU, aT, aQ, aP, aR) {
                var a3 = aV._, aX = aV.matrix, S = a3.fillpos, aW = aV.node, aS = aW.style, aO = 1, aN = "", aZ, a1 = af / aU, a0 = af / aT;
                aS.visibility = "hidden";
                if (!aU || !aT) {
                    return
                }
                aW.coordsize = ax(a1) + ao + ax(a0);
                aS.rotation = aR * (aU * aT < 0 ? -1 : 1);
                if (aR) {
                    var a2 = at(aR, aQ, aP);
                    aQ = a2.dx;
                    aP = a2.dy
                }
                aU < 0 && (aN += "x");
                aT < 0 && (aN += " y") && (aO = -1);
                aS.flip = aN;
                aW.coordorigin = (aQ * -a1) + ao + (aP * -a0);
                if (S || a3.fillsize) {
                    var aY = aW.getElementsByTagName(aA);
                    aY = aY && aY[0];
                    aW.removeChild(aY);
                    if (S) {
                        a2 = at(aR, aX.x(S[0], S[1]), aX.y(S[0], S[1]));
                        aY.position = a2.dx * aO + ao + a2.dy * aO
                    }
                    if (a3.fillsize) {
                        aY.size = a3.fillsize[0] * ax(aU) + ao + a3.fillsize[1] * ax(aT)
                    }
                    aW.appendChild(aY)
                }
                aS.visibility = "visible"
            };
            ap.toString = function () {
                return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version
            };
            var ag = function (S, aS, aN) {
                var aU = aJ(aS).toLowerCase().split("-"), aQ = aN ? "end" : "start", aO = aU.length, aR = "classic", aT = "medium", aP = "medium";
                while (aO--) {
                    switch (aU[aO]) {
                        case"block":
                        case"classic":
                        case"oval":
                        case"diamond":
                        case"open":
                        case"none":
                            aR = aU[aO];
                            break;
                        case"wide":
                        case"narrow":
                            aP = aU[aO];
                            break;
                        case"long":
                        case"short":
                            aT = aU[aO];
                            break
                    }
                }
                var aV = S.node.getElementsByTagName("stroke")[0];
                aV[aQ + "arrow"] = aR;
                aV[aQ + "arrowlength"] = aT;
                aV[aQ + "arrowwidth"] = aP
            }, aC = function (a3, bd) {
                a3.attrs = a3.attrs || {};
                var a8 = a3.node, bh = a3.attrs, aZ = a8.style, aV, bb = aE[a3.type] && (bd.x != bh.x || bd.y != bh.y || bd.width != bh.width || bd.height != bh.height || bd.cx != bh.cx || bd.cy != bh.cy || bd.rx != bh.rx || bd.ry != bh.ry || bd.r != bh.r), a2 = aw[a3.type] && (bh.cx != bd.cx || bh.cy != bd.cy || bh.r != bd.r || bh.rx != bd.rx || bh.ry != bd.ry), bk = a3;
                for (var a0 in bd) {
                    if (bd[ai](a0)) {
                        bh[a0] = bd[a0]
                    }
                }
                if (bb) {
                    bh.path = ap._getPath[a3.type](a3);
                    a3._.dirty = 1
                }
                bd.href && (a8.href = bd.href);
                bd.title && (a8.title = bd.title);
                bd.target && (a8.target = bd.target);
                bd.cursor && (aZ.cursor = bd.cursor);
                "blur" in bd && a3.blur(bd.blur);
                if (bd.path && a3.type == "path" || bb) {
                    a8.path = aj(~aJ(bh.path).toLowerCase().indexOf("r") ? ap._pathToAbsolute(bh.path) : bh.path);
                    if (a3.type == "image") {
                        a3._.fillpos = [bh.x, bh.y];
                        a3._.fillsize = [bh.width, bh.height];
                        au(a3, 1, 1, 0, 0, 0)
                    }
                }
                "transform" in bd && a3.transform(bd.transform);
                if (a2) {
                    var aQ = +bh.cx, aO = +bh.cy, aU = +bh.rx || +bh.r || 0, aT = +bh.ry || +bh.r || 0;
                    a8.path = ap.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", aG((aQ - aU) * af), aG((aO - aT) * af), aG((aQ + aU) * af), aG((aO + aT) * af), aG(aQ * af))
                }
                if ("clip-rect" in bd) {
                    var aN = aJ(bd["clip-rect"]).split(am);
                    if (aN.length == 4) {
                        aN[2] = +aN[2] + (+aN[0]);
                        aN[3] = +aN[3] + (+aN[1]);
                        var a1 = a8.clipRect || ap._g.doc.createElement("div"), bj = a1.style;
                        bj.clip = ap.format("rect({1}px {2}px {3}px {0}px)", aN);
                        if (!a8.clipRect) {
                            bj.position = "absolute";
                            bj.top = 0;
                            bj.left = 0;
                            bj.width = a3.paper.width + "px";
                            bj.height = a3.paper.height + "px";
                            a8.parentNode.insertBefore(a1, a8);
                            a1.appendChild(a8);
                            a8.clipRect = a1
                        }
                    }
                    if (!bd["clip-rect"]) {
                        a8.clipRect && (a8.clipRect.style.clip = "auto")
                    }
                }
                if (a3.textpath) {
                    var bf = a3.textpath.style;
                    bd.font && (bf.font = bd.font);
                    bd["font-family"] && (bf.fontFamily = '"' + bd["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, av) + '"');
                    bd["font-size"] && (bf.fontSize = bd["font-size"]);
                    bd["font-weight"] && (bf.fontWeight = bd["font-weight"]);
                    bd["font-style"] && (bf.fontStyle = bd["font-style"])
                }
                if ("arrow-start" in bd) {
                    ag(bk, bd["arrow-start"])
                }
                if ("arrow-end" in bd) {
                    ag(bk, bd["arrow-end"], 1)
                }
                if (bd.opacity != null || bd["stroke-width"] != null || bd.fill != null || bd.src != null || bd.stroke != null || bd["stroke-width"] != null || bd["stroke-opacity"] != null || bd["fill-opacity"] != null || bd["stroke-dasharray"] != null || bd["stroke-miterlimit"] != null || bd["stroke-linejoin"] != null || bd["stroke-linecap"] != null) {
                    var a9 = a8.getElementsByTagName(aA), bg = false;
                    a9 = a9 && a9[0];
                    !a9 && (bg = a9 = aK(aA));
                    if (a3.type == "image" && bd.src) {
                        a9.src = bd.src
                    }
                    bd.fill && (a9.on = true);
                    if (a9.on == null || bd.fill == "none" || bd.fill === null) {
                        a9.on = false
                    }
                    if (a9.on && bd.fill) {
                        var aS = aJ(bd.fill).match(ap._ISURL);
                        if (aS) {
                            a9.parentNode == a8 && a8.removeChild(a9);
                            a9.rotate = true;
                            a9.src = aS[1];
                            a9.type = "tile";
                            var S = a3.getBBox(1);
                            a9.position = S.x + ao + S.y;
                            a3._.fillpos = [S.x, S.y];
                            ap._preload(aS[1], function () {
                                a3._.fillsize = [this.offsetWidth, this.offsetHeight]
                            })
                        } else {
                            a9.color = ap.getRGB(bd.fill).hex;
                            a9.src = av;
                            a9.type = "solid";
                            if (ap.getRGB(bd.fill).error && (bk.type in {circle: 1, ellipse: 1} || aJ(bd.fill).charAt() != "r") && ae(bk, bd.fill, a9)) {
                                bh.fill = "none";
                                bh.gradient = bd.fill;
                                a9.rotate = false
                            }
                        }
                    }
                    if ("fill-opacity" in bd || "opacity" in bd) {
                        var aR = ((+bh["fill-opacity"] + 1 || 2) - 1) * ((+bh.opacity + 1 || 2) - 1) * ((+ap.getRGB(bd.fill).o + 1 || 2) - 1);
                        aR = aH(aM(aR, 0), 1);
                        a9.opacity = aR;
                        if (a9.src) {
                            a9.color = "none"
                        }
                    }
                    a8.appendChild(a9);
                    var aW = (a8.getElementsByTagName("stroke") && a8.getElementsByTagName("stroke")[0]), bi = false;
                    !aW && (bi = aW = aK("stroke"));
                    if ((bd.stroke && bd.stroke != "none") || bd["stroke-width"] || bd["stroke-opacity"] != null || bd["stroke-dasharray"] || bd["stroke-miterlimit"] || bd["stroke-linejoin"] || bd["stroke-linecap"]) {
                        aW.on = true
                    }
                    (bd.stroke == "none" || bd.stroke === null || aW.on == null || bd.stroke == 0 || bd["stroke-width"] == 0) && (aW.on = false);
                    var a7 = ap.getRGB(bd.stroke);
                    aW.on && bd.stroke && (aW.color = a7.hex);
                    aR = ((+bh["stroke-opacity"] + 1 || 2) - 1) * ((+bh.opacity + 1 || 2) - 1) * ((+a7.o + 1 || 2) - 1);
                    var a4 = (ar(bd["stroke-width"]) || 1) * 0.75;
                    aR = aH(aM(aR, 0), 1);
                    bd["stroke-width"] == null && (a4 = bh["stroke-width"]);
                    bd["stroke-width"] && (aW.weight = a4);
                    a4 && a4 < 1 && (aR *= a4) && (aW.weight = 1);
                    aW.opacity = aR;
                    bd["stroke-linejoin"] && (aW.joinstyle = bd["stroke-linejoin"] || "miter");
                    aW.miterlimit = bd["stroke-miterlimit"] || 8;
                    bd["stroke-linecap"] && (aW.endcap = bd["stroke-linecap"] == "butt" ? "flat" : bd["stroke-linecap"] == "square" ? "square" : "round");
                    if (bd["stroke-dasharray"]) {
                        var a6 = {"-": "shortdash", ".": "shortdot", "-.": "shortdashdot", "-..": "shortdashdotdot", ". ": "dot", "- ": "dash", "--": "longdash", "- .": "dashdot", "--.": "longdashdot", "--..": "longdashdotdot"};
                        aW.dashstyle = a6[ai](bd["stroke-dasharray"]) ? a6[bd["stroke-dasharray"]] : av
                    }
                    bi && a8.appendChild(aW)
                }
                if (bk.type == "text") {
                    bk.paper.canvas.style.display = av;
                    var ba = bk.paper.span, a5 = 100, aP = bh.font && bh.font.match(/\d+(?:\.\d*)?(?=px)/);
                    aZ = ba.style;
                    bh.font && (aZ.font = bh.font);
                    bh["font-family"] && (aZ.fontFamily = bh["font-family"]);
                    bh["font-weight"] && (aZ.fontWeight = bh["font-weight"]);
                    bh["font-style"] && (aZ.fontStyle = bh["font-style"]);
                    aP = ar(bh["font-size"] || aP && aP[0]) || 10;
                    aZ.fontSize = aP * a5 + "px";
                    bk.textpath.string && (ba.innerHTML = aJ(bk.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                    var aY = ba.getBoundingClientRect();
                    bk.W = bh.w = (aY.right - aY.left) / a5;
                    bk.H = bh.h = (aY.bottom - aY.top) / a5;
                    bk.X = bh.x;
                    bk.Y = bh.y + bk.H / 2;
                    ("x" in bd || "y" in bd) && (bk.path.v = ap.format("m{0},{1}l{2},{1}", aG(bh.x * af), aG(bh.y * af), aG(bh.x * af) + 1));
                    var aX = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
                    for (var bc = 0, be = aX.length; bc < be; bc++) {
                        if (aX[bc] in bd) {
                            bk._.dirty = 1;
                            break
                        }
                    }
                    switch (bh["text-anchor"]) {
                        case"start":
                            bk.textpath.style["v-text-align"] = "left";
                            bk.bbx = bk.W / 2;
                            break;
                        case"end":
                            bk.textpath.style["v-text-align"] = "right";
                            bk.bbx = -bk.W / 2;
                            break;
                        default:
                            bk.textpath.style["v-text-align"] = "center";
                            bk.bbx = 0;
                            break
                    }
                    bk.textpath.style["v-text-kern"] = true
                }
            }, ae = function (S, aV, aY) {
                S.attrs = S.attrs || {};
                var aW = S.attrs, aP = Math.pow, aQ, aR, aT = "linear", aU = ".5 .5";
                S.attrs.gradient = aV;
                aV = aJ(aV).replace(ap._radial_gradient, function (a1, a2, a0) {
                    aT = "radial";
                    if (a2 && a0) {
                        a2 = ar(a2);
                        a0 = ar(a0);
                        aP(a2 - 0.5, 2) + aP(a0 - 0.5, 2) > 0.25 && (a0 = al.sqrt(0.25 - aP(a2 - 0.5, 2)) * ((a0 > 0.5) * 2 - 1) + 0.5);
                        aU = a2 + ao + a0
                    }
                    return av
                });
                aV = aV.split(/\s*\-\s*/);
                if (aT == "linear") {
                    var aN = aV.shift();
                    aN = -ar(aN);
                    if (isNaN(aN)) {
                        return null
                    }
                }
                var aS = ap._parseDots(aV);
                if (!aS) {
                    return null
                }
                S = S.shape || S.node;
                if (aS.length) {
                    S.removeChild(aY);
                    aY.on = true;
                    aY.method = "none";
                    aY.color = aS[0].color;
                    aY.color2 = aS[aS.length - 1].color;
                    var aZ = [];
                    for (var aO = 0, aX = aS.length; aO < aX; aO++) {
                        aS[aO].offset && aZ.push(aS[aO].offset + ao + aS[aO].color)
                    }
                    aY.colors = aZ.length ? aZ.join() : "0% " + aY.color;
                    if (aT == "radial") {
                        aY.type = "gradientTitle";
                        aY.focus = "100%";
                        aY.focussize = "0 0";
                        aY.focusposition = aU;
                        aY.angle = 0
                    } else {
                        aY.type = "gradient";
                        aY.angle = (270 - aN) % 360
                    }
                    S.appendChild(aY)
                }
                return 1
            }, az = function (aN, S) {
                this[0] = this.node = aN;
                aN.raphael = true;
                this.id = ap._oid++;
                aN.raphaelid = this.id;
                this.X = 0;
                this.Y = 0;
                this.attrs = {};
                this.paper = S;
                this.matrix = ap.matrix();
                this._ = {transform: [], sx: 1, sy: 1, dx: 0, dy: 0, deg: 0, dirty: 1, dirtyT: 1};
                !S.bottom && (S.bottom = this);
                this.prev = S.top;
                S.top && (S.top.next = this);
                S.top = this;
                this.next = null
            };
            var aq = ap.el;
            az.prototype = aq;
            aq.constructor = az;
            aq.transform = function (aQ) {
                if (aQ == null) {
                    return this._.transform
                }
                var aS = this.paper._viewBoxShift, aR = aS ? "s" + [aS.scale, aS.scale] + "-1-1t" + [aS.dx, aS.dy] : av, aV;
                if (aS) {
                    aV = aQ = aJ(aQ).replace(/\.{3}|\u2026/g, this._.transform || av)
                }
                ap._extractTransform(this, aR + aQ);
                var aW = this.matrix.clone(), aY = this.skew, aO = this.node, aU, aP = ~aJ(this.attrs.fill).indexOf("-"), S = !aJ(this.attrs.fill).indexOf("url(");
                aW.translate(-0.5, -0.5);
                if (S || aP || this.type == "image") {
                    aY.matrix = "1 0 0 1";
                    aY.offset = "0 0";
                    aU = aW.split();
                    if ((aP && aU.noRotation) || !aU.isSimple) {
                        aO.style.filter = aW.toFilter();
                        var aT = this.getBBox(), aN = this.getBBox(1), aZ = aT.x - aN.x, aX = aT.y - aN.y;
                        aO.coordorigin = (aZ * -af) + ao + (aX * -af);
                        au(this, 1, 1, aZ, aX, 0)
                    } else {
                        aO.style.filter = av;
                        au(this, aU.scalex, aU.scaley, aU.dx, aU.dy, aU.rotate)
                    }
                } else {
                    aO.style.filter = av;
                    aY.matrix = aJ(aW);
                    aY.offset = aW.offset()
                }
                aV && (this._.transform = aV);
                return this
            };
            aq.rotate = function (aN, S, aP) {
                if (this.removed) {
                    return this
                }
                if (aN == null) {
                    return
                }
                aN = aJ(aN).split(am);
                if (aN.length - 1) {
                    S = ar(aN[1]);
                    aP = ar(aN[2])
                }
                aN = ar(aN[0]);
                (aP == null) && (S = aP);
                if (S == null || aP == null) {
                    var aO = this.getBBox(1);
                    S = aO.x + aO.width / 2;
                    aP = aO.y + aO.height / 2
                }
                this._.dirtyT = 1;
                this.transform(this._.transform.concat([
                    ["r", aN, S, aP]
                ]));
                return this
            };
            aq.translate = function (aN, S) {
                if (this.removed) {
                    return this
                }
                aN = aJ(aN).split(am);
                if (aN.length - 1) {
                    S = ar(aN[1])
                }
                aN = ar(aN[0]) || 0;
                S = +S || 0;
                if (this._.bbox) {
                    this._.bbox.x += aN;
                    this._.bbox.y += S
                }
                this.transform(this._.transform.concat([
                    ["t", aN, S]
                ]));
                return this
            };
            aq.scale = function (aQ, aO, S, aP) {
                if (this.removed) {
                    return this
                }
                aQ = aJ(aQ).split(am);
                if (aQ.length - 1) {
                    aO = ar(aQ[1]);
                    S = ar(aQ[2]);
                    aP = ar(aQ[3]);
                    isNaN(S) && (S = null);
                    isNaN(aP) && (aP = null)
                }
                aQ = ar(aQ[0]);
                (aO == null) && (aO = aQ);
                (aP == null) && (S = aP);
                if (S == null || aP == null) {
                    var aN = this.getBBox(1)
                }
                S = S == null ? aN.x + aN.width / 2 : S;
                aP = aP == null ? aN.y + aN.height / 2 : aP;
                this.transform(this._.transform.concat([
                    ["s", aQ, aO, S, aP]
                ]));
                this._.dirtyT = 1;
                return this
            };
            aq.hide = function () {
                !this.removed && (this.node.style.display = "none");
                return this
            };
            aq.show = function () {
                !this.removed && (this.node.style.display = av);
                return this
            };
            aq._getBBox = function () {
                if (this.removed) {
                    return{}
                }
                return{x: this.X + (this.bbx || 0) - this.W / 2, y: this.Y - this.H, width: this.W, height: this.H}
            };
            aq.remove = function () {
                if (this.removed || !this.node.parentNode) {
                    return
                }
                this.paper.__set__ && this.paper.__set__.exclude(this);
                ap.eve.unbind("raphael.*.*." + this.id);
                ap._tear(this, this.paper);
                this.node.parentNode.removeChild(this.node);
                this.shape && this.shape.parentNode.removeChild(this.shape);
                for (var S in this) {
                    this[S] = typeof this[S] == "function" ? ap._removedFactory(S) : null
                }
                this.removed = true
            };
            aq.attr = function (S, aV) {
                if (this.removed) {
                    return this
                }
                if (S == null) {
                    var aS = {};
                    for (var aU in this.attrs) {
                        if (this.attrs[ai](aU)) {
                            aS[aU] = this.attrs[aU]
                        }
                    }
                    aS.gradient && aS.fill == "none" && (aS.fill = aS.gradient) && delete aS.gradient;
                    aS.transform = this._.transform;
                    return aS
                }
                if (aV == null && ap.is(S, "string")) {
                    if (S == aA && this.attrs.fill == "none" && this.attrs.gradient) {
                        return this.attrs.gradient
                    }
                    var aT = S.split(am), aP = {};
                    for (var aQ = 0, aX = aT.length; aQ < aX; aQ++) {
                        S = aT[aQ];
                        if (S in this.attrs) {
                            aP[S] = this.attrs[S]
                        } else {
                            if (ap.is(this.paper.customAttributes[S], "function")) {
                                aP[S] = this.paper.customAttributes[S].def
                            } else {
                                aP[S] = ap._availableAttrs[S]
                            }
                        }
                    }
                    return aX - 1 ? aP : aP[aT[0]]
                }
                if (this.attrs && aV == null && ap.is(S, "array")) {
                    aP = {};
                    for (aQ = 0, aX = S.length; aQ < aX; aQ++) {
                        aP[S[aQ]] = this.attr(S[aQ])
                    }
                    return aP
                }
                var aN;
                if (aV != null) {
                    aN = {};
                    aN[S] = aV
                }
                aV == null && ap.is(S, "object") && (aN = S);
                for (var aW in aN) {
                    aF("raphael.attr." + aW + "." + this.id, this, aN[aW])
                }
                if (aN) {
                    for (aW in this.paper.customAttributes) {
                        if (this.paper.customAttributes[ai](aW) && aN[ai](aW) && ap.is(this.paper.customAttributes[aW], "function")) {
                            var aR = this.paper.customAttributes[aW].apply(this, [].concat(aN[aW]));
                            this.attrs[aW] = aN[aW];
                            for (var aO in aR) {
                                if (aR[ai](aO)) {
                                    aN[aO] = aR[aO]
                                }
                            }
                        }
                    }
                    if (aN.text && this.type == "text") {
                        this.textpath.string = aN.text
                    }
                    aC(this, aN)
                }
                return this
            };
            aq.toFront = function () {
                !this.removed && this.node.parentNode.appendChild(this.node);
                this.paper && this.paper.top != this && ap._tofront(this, this.paper);
                return this
            };
            aq.toBack = function () {
                if (this.removed) {
                    return this
                }
                if (this.node.parentNode.firstChild != this.node) {
                    this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
                    ap._toback(this, this.paper)
                }
                return this
            };
            aq.insertAfter = function (S) {
                if (this.removed) {
                    return this
                }
                if (S.constructor == ap.st.constructor) {
                    S = S[S.length - 1]
                }
                if (S.node.nextSibling) {
                    S.node.parentNode.insertBefore(this.node, S.node.nextSibling)
                } else {
                    S.node.parentNode.appendChild(this.node)
                }
                ap._insertafter(this, S, this.paper);
                return this
            };
            aq.insertBefore = function (S) {
                if (this.removed) {
                    return this
                }
                if (S.constructor == ap.st.constructor) {
                    S = S[0]
                }
                S.node.parentNode.insertBefore(this.node, S.node);
                ap._insertbefore(this, S, this.paper);
                return this
            };
            aq.blur = function (S) {
                var aN = this.node.runtimeStyle, aO = aN.filter;
                aO = aO.replace(ay, av);
                if (+S !== 0) {
                    this.attrs.blur = S;
                    aN.filter = aO + ao + aB + ".Blur(pixelradius=" + (+S || 1.5) + ")";
                    aN.margin = ap.format("-{0}px 0 0 -{0}px", aG(+S || 1.5))
                } else {
                    aN.filter = aO;
                    aN.margin = 0;
                    delete this.attrs.blur
                }
            };
            ap._engine.path = function (aP, aN) {
                var aQ = aK("shape");
                aQ.style.cssText = ah;
                aQ.coordsize = af + ao + af;
                aQ.coordorigin = aN.coordorigin;
                var aR = new az(aQ, aN), S = {fill: "none", stroke: "#000"};
                aP && (S.path = aP);
                aR.type = "path";
                aR.path = [];
                aR.Path = av;
                aC(aR, S);
                aN.canvas.appendChild(aQ);
                var aO = aK("skew");
                aO.on = true;
                aQ.appendChild(aO);
                aR.skew = aO;
                aR.transform(av);
                return aR
            };
            ap._engine.rect = function (aN, aS, aQ, aT, aO, S) {
                var aU = ap._rectPath(aS, aQ, aT, aO, S), aP = aN.path(aU), aR = aP.attrs;
                aP.X = aR.x = aS;
                aP.Y = aR.y = aQ;
                aP.W = aR.width = aT;
                aP.H = aR.height = aO;
                aR.r = S;
                aR.path = aU;
                aP.type = "rect";
                return aP
            };
            ap._engine.ellipse = function (aN, S, aS, aR, aQ) {
                var aP = aN.path(), aO = aP.attrs;
                aP.X = S - aR;
                aP.Y = aS - aQ;
                aP.W = aR * 2;
                aP.H = aQ * 2;
                aP.type = "ellipse";
                aC(aP, {cx: S, cy: aS, rx: aR, ry: aQ});
                return aP
            };
            ap._engine.circle = function (aN, S, aR, aQ) {
                var aP = aN.path(), aO = aP.attrs;
                aP.X = S - aQ;
                aP.Y = aR - aQ;
                aP.W = aP.H = aQ * 2;
                aP.type = "circle";
                aC(aP, {cx: S, cy: aR, r: aQ});
                return aP
            };
            ap._engine.image = function (aN, S, aT, aR, aU, aP) {
                var aW = ap._rectPath(aT, aR, aU, aP), aQ = aN.path(aW).attr({stroke: "none"}), aS = aQ.attrs, aO = aQ.node, aV = aO.getElementsByTagName(aA)[0];
                aS.src = S;
                aQ.X = aS.x = aT;
                aQ.Y = aS.y = aR;
                aQ.W = aS.width = aU;
                aQ.H = aS.height = aP;
                aS.path = aW;
                aQ.type = "image";
                aV.parentNode == aO && aO.removeChild(aV);
                aV.rotate = true;
                aV.src = S;
                aV.type = "tile";
                aQ._.fillpos = [aT, aR];
                aQ._.fillsize = [aU, aP];
                aO.appendChild(aV);
                au(aQ, 1, 1, 0, 0, 0);
                return aQ
            };
            ap._engine.text = function (S, aS, aR, aT) {
                var aP = aK("shape"), aV = aK("path"), aO = aK("textpath");
                aS = aS || 0;
                aR = aR || 0;
                aT = aT || "";
                aV.v = ap.format("m{0},{1}l{2},{1}", aG(aS * af), aG(aR * af), aG(aS * af) + 1);
                aV.textpathok = true;
                aO.string = aJ(aT);
                aO.on = true;
                aP.style.cssText = ah;
                aP.coordsize = af + ao + af;
                aP.coordorigin = "0 0";
                var aN = new az(aP, S), aQ = {fill: "#000", stroke: "none", font: ap._availableAttrs.font, text: aT};
                aN.shape = aP;
                aN.path = aV;
                aN.textpath = aO;
                aN.type = "text";
                aN.attrs.text = aJ(aT);
                aN.attrs.x = aS;
                aN.attrs.y = aR;
                aN.attrs.w = 1;
                aN.attrs.h = 1;
                aC(aN, aQ);
                aP.appendChild(aO);
                aP.appendChild(aV);
                S.canvas.appendChild(aP);
                var aU = aK("skew");
                aU.on = true;
                aP.appendChild(aU);
                aN.skew = aU;
                aN.transform(av);
                return aN
            };
            ap._engine.setSize = function (aO, S) {
                var aN = this.canvas.style;
                this.width = aO;
                this.height = S;
                aO == +aO && (aO += "px");
                S == +S && (S += "px");
                aN.width = aO;
                aN.height = S;
                aN.clip = "rect(0 " + aO + " " + S + " 0)";
                if (this._viewBox) {
                    ap._engine.setViewBox.apply(this, this._viewBox)
                }
                return this
            };
            ap._engine.setViewBox = function (aR, aQ, aS, aO, aP) {
                ap.eve("raphael.setViewBox", this, this._viewBox, [aR, aQ, aS, aO, aP]);
                var S = this.width, aU = this.height, aV = 1 / aM(aS / S, aO / aU), aT, aN;
                if (aP) {
                    aT = aU / aO;
                    aN = S / aS;
                    if (aS * aT < S) {
                        aR -= (S - aS * aT) / 2 / aT
                    }
                    if (aO * aN < aU) {
                        aQ -= (aU - aO * aN) / 2 / aN
                    }
                }
                this._viewBox = [aR, aQ, aS, aO, !!aP];
                this._viewBoxShift = {dx: -aR, dy: -aQ, scale: aV};
                this.forEach(function (aW) {
                    aW.transform("...")
                });
                return this
            };
            var aK;
            ap._engine.initWin = function (aO) {
                var aN = aO.document;
                aN.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
                try {
                    !aN.namespaces.rvml && aN.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
                    aK = function (aP) {
                        return aN.createElement("<rvml:" + aP + ' class="rvml">')
                    }
                } catch (S) {
                    aK = function (aP) {
                        return aN.createElement("<" + aP + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                    }
                }
            };
            ap._engine.initWin(ap._g.win);
            ap._engine.create = function () {
                var aO = ap._getContainer.apply(0, arguments), S = aO.container, aU = aO.height, aV, aN = aO.width, aT = aO.x, aS = aO.y;
                if (!S) {
                    throw new Error("VML container not found.")
                }
                var aQ = new ap._Paper, aR = aQ.canvas = ap._g.doc.createElement("div"), aP = aR.style;
                aT = aT || 0;
                aS = aS || 0;
                aN = aN || 512;
                aU = aU || 342;
                aQ.width = aN;
                aQ.height = aU;
                aN == +aN && (aN += "px");
                aU == +aU && (aU += "px");
                aQ.coordsize = af * 1000 + ao + af * 1000;
                aQ.coordorigin = "0 0";
                aQ.span = ap._g.doc.createElement("span");
                aQ.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
                aR.appendChild(aQ.span);
                aP.cssText = ap.format("width:{0};height:{1};display:inline-block;position:absolute;clip:rect(0 {0} {1} 0);overflow:hidden", aN, aU);
                if (S == 1) {
                    ap._g.doc.body.appendChild(aR);
                    aP.left = aT + "px";
                    aP.top = aS + "px";
                    aP.position = "absolute"
                } else {
                    if (S.firstChild) {
                        S.insertBefore(aR, S.firstChild)
                    } else {
                        S.appendChild(aR)
                    }
                }
                aQ.renderfix = function () {
                };
                return aQ
            };
            ap.prototype.clear = function () {
                ap.eve("raphael.clear", this);
                this.canvas.innerHTML = av;
                this.span = ap._g.doc.createElement("span");
                this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
                this.canvas.appendChild(this.span);
                this.bottom = this.top = null
            };
            ap.prototype.remove = function () {
                ap.eve("raphael.remove", this);
                this.canvas.parentNode.removeChild(this.canvas);
                for (var S in this) {
                    this[S] = typeof this[S] == "function" ? ap._removedFactory(S) : null
                }
                return true
            };
            var aD = ap.st;
            for (var ak in aq) {
                if (aq[ai](ak) && !aD[ai](ak)) {
                    aD[ak] = (function (S) {
                        return function () {
                            var aN = arguments;
                            return this.forEach(function (aO) {
                                aO[S].apply(aO, aN)
                            })
                        }
                    })(ak)
                }
            }
        }(window.Raphael);
        return window.Raphael
    })();
    var aa = (function () {
        var ah = KISSY, ao = ah.DOM, an = ah.Event;
        var al = u;
        var ap = al("J_balloon_canvas", 800, 900);
        var ae = a;
        var ag = [
            [269, 296],
            [523, 293],
            [137, 518],
            [316, 534],
            [201, 685],
            [456, 431],
            [634, 424],
            [479, 612],
            [638, 593],
            [369, 753]
        ];
        var aq = ap.set();
        var af = [60, 75];

        function aj(at, au) {
            at = at || [
                {brand_name: "CROCS", brand_url: "http://xx.taobao.com"},
                {brand_name: "\u4f18\u8863\u5e93", brand_url: "http://xx.taobao.com"},
                {brand_name: "CROCS", brand_url: "http://xx.taobao.com"},
                {brand_name: "\u4f18\u8863\u5e93", brand_url: "http://xx.taobao.com"},
                {brand_name: "CROCS", brand_url: "http://xx.taobao.com"},
                {brand_name: "\u4f18\u8863\u5e93", brand_url: "http://xx.taobao.com"},
                {brand_name: "CROCS", brand_url: "http://xx.taobao.com"},
                {brand_name: "\u4f18\u8863\u5e93", brand_url: "http://xx.taobao.com"}
            ];
            var S = ap.circle(ag[0][0], ag[0][1], 0);
            S.attr({fill: "#fff", "stroke-width": 0, cursor: "pointer"});
            aq.push(S);
            var ar = 200;
            S.stop().animate(al.animation({r: 140}, ar, "elastic", function () {
                if (ah.UA.ie && ah.UA.ie < 9) {
                    ao.show("#fav_brand_text")
                } else {
                    ah.one("#fav_brand_text").fadeIn(0.1)
                }
            }));
            ah.each(at, function (aw, av) {
                ai(ag[av + 1][0], ag[av + 1][1], am(af), aw)
            });
            au && au()
        }

        function ai(ay, ax, S, aD, aB) {
            var aw;
            var aC = aD.brand_name;
            ah.log("\u7ed8\u5236\u6c14\u6ce1\uff1a" + aD);
            if (aC.indexOf("/") > -1) {
                aw = aC.replace(/(.*)\/(.*)/, "$1/\n$2")
            } else {
                aw = aC
            }
            var ar = ["#589c45", "#3793b7", "#b3745b"];
            var av = Math.floor(am([0, 3]));
            var au = ar[av];
            var at = ap.circle(ay, ax, 0);
            var aE = ap.text(ay, ax, aw);
            var az = ap.set(at, aE);
            aq.push(at, aE);
            at.attr({fill: "#fff", "stroke-width": 0});
            aE.attr({"font-family": "microsoft yahei", "font-size": 16, fill: au});
            az.attr({cursor: "pointer"});
            at.data("textTag", aE);
            aE.data("circleElem", at);
            var aA = 1000;
            at.stop().animate(al.animation({r: S}, aA, "elastic", aB));
            az.hover(function () {
                aE.attr({"font-size": 20});
                at.g = at.glow({color: au, width: 10, opacity: 0.5, "stroke-linecap": "round", "stroke-linejoin": "round"})
            }, function () {
                at.g.remove();
                aE.attr({"font-size": 16})
            });
            at.click(function () {
                if (aE.attr("text") != "") {
                    ae("tbgltjph.2.1", aD.brand_url);
                    window.open(aD.brand_url)
                }
            });
            aE.click(function () {
                ae("tbgltjph.2.1", aD.brand_url);
                window.open(aD.brand_url)
            });
            return at
        }

        function am(S) {
            var ar = Math.random() * (S[1] - S[0]) + S[0];
            return ar
        }

        function ak(ar) {
            ah.log("clear");
            var S = 500;
            aq.stop().animate({r: 10, cy: 500, y: 500, opacity: 0}, S, "bounce", function () {
                this.remove();
                aq.clear();
                ah.one("#fav_brand_text").fadeOut(0.5);
                ar && ar()
            });
            if (aq.length == 0) {
                ar && ar()
            }
        }

        return{clear: function () {
            ak()
        }, show: function (S) {
            ak(function () {
                aj(S)
            })
        }, destroy: function () {
            if (!ah.isUndefined(ap)) {
                ap.remove()
            }
        }}
    })();
    var v = (function () {
        var ah = KISSY, at = ah.DOM, ar = ah.Event;
        var ao = u;
        var au = ao("J_circle_canvas", 600, 1300);
        var af = a;
        var ag = [
            [208, 220],
            [370, 223],
            [333, 399],
            [175, 463],
            [374, 606],
            [241, 788],
            [348, 964],
            [184, 1023],
            [193, 1250],
            [376, 1265]
        ];
        var av = au.set();
        var ae = [20, 10];
        var aq = ["left", "right", "right", "left", "right", "left", "right", "left", "left", "right"];
        var an = ["right", "left", "left", "right", "left", "right", "left", "right", "right", "left"];

        function ak(S, aC, ay, ax, aw, aB) {
            ah.log("draw bubble");
            var az = au.circle(S, aC, ay);
            var aA = au.set(az);
            av.push(az);
            az.attr({fill: "#ff8890", "stroke-width": 0});
            az.data("subData", ax);
            az.data("isOpened", false);
            return az
        }

        function al(ax, S) {
            ax = ax || [
                {shop_name: "\u8fa3\u5988\u5f53\u5bb6", shop_url: "http://xx.taobao.com", shop_rank: "http://localhost/images/index/badge.png", shop_owner: "littlezhang99", shop_img_url: ""},
                {shop_name: "BANAN\u54c1\u8d28\u4f18\u8863\u5e97", shop_url: "http://xx.taobao.com", shop_rank: "http://localhost/images/index/badge.png", shop_owner: "hehhah", shop_img_url: "http://xx.taobao.com"},
                {},
                {shop_name: "\u8fa3\u5988\u5f53\u5bb6", shop_url: "http://xx.taobao.com", shop_rank: "http://localhost/images/index/badge.png", shop_owner: "littlezhang99", shop_img_url: "http://xx.taobao.com"},
                {shop_name: "BANAN\u54c1\u8d28\u4f18\u8863\u5e97", shop_url: "http://xx.taobao.com", shop_rank: "http://localhost/images/index/badge.png", shop_owner: "hehhah", shop_img_url: "http://xx.taobao.com"},
                {shop_name: "\u8fa3\u5988\u5f53\u5bb6", shop_url: "http://xx.taobao.com", shop_rank: "http://localhost/images/index/badge.png", shop_owner: "littlezhang99", shop_img_url: ""},
                {shop_name: "BANAN\u54c1\u8d28\u4f18\u8863\u5e97", shop_url: "http://xx.taobao.com", shop_rank: "http://localhost/images/index/badge.png", shop_owner: "hehhah", shop_img_url: "http://xx.taobao.com"},
                {shop_name: "BANAN\u54c1\u8d28\u4f18\u8863\u5e97", shop_url: "http://xx.taobao.com", shop_rank: "http://localhost/images/index/badge.png", shop_owner: "hehhah", shop_img_url: "http://xx.taobao.com"},
                {shop_name: "\u8fa3\u5988\u5f53\u5bb6", shop_url: "http://xx.taobao.com", shop_rank: "http://localhost/images/index/badge.png", shop_owner: "littlezhang99", shop_img_url: "http://xx.taobao.com"},
                {shop_name: "BANAN\u54c1\u8d28\u4f18\u8863\u5e97", shop_url: "http://xx.taobao.com", shop_rank: "http://localhost/images/index/badge.png", shop_owner: "hehhah", shop_img_url: "http://xx.taobao.com"}
            ];
            var aw = ax[S];
            ak(ag[S][0], ag[S][1], ap(ae), aw, S);
            if (S == 2) {
                aj(av[2], S);
                at.show("#fav_shop_text")
            } else {
                aj(av[S], S, aw)
            }
        }

        function aj(aw, aB, aJ, aI) {
            if (aw.data("isOpened")) {
                ah.log("bubble already open");
                return
            }
            aw.data("isOpened", true);
            var ax = aq[aB];
            var aA = aw.data("subData");
            var S = 100;
            var aF;
            if ("left" == ax) {
                aF = aw.attr("cx") - S
            } else {
                aF = aw.attr("cx") + S
            }
            if (aB == 2) {
                var aK = au.path("M" + aw.attr("cx") + " " + aw.attr("cy") + " H" + aF);
                aK.transform("s0");
                aK.attr({stroke: "#ff8890", "stroke-width": "2"});
                aK.insertBefore(aw);
                aK.stop().animate({transform: "s1"}, aH, "linear", function () {
                    aI && aI(this);
                    aI = undefined
                });
                aw.data("linePath", aK)
            } else {
                var aD = au.circle(aw.attr("cx"), aw.attr("cy"), 35);
                aD.attr({"stroke-width": "0", cursor: "pointer"});
                aw.data("childCircle", aD);
                aD.click(function () {
                    if (aJ.shop_url != "") {
                        af("tbgltjph.2.1", aJ.shop_url);
                        window.open(aJ.shop_url)
                    }
                });
                var aH = 200;
                aD.stop().animate(ao.animation({cx: aF}, aH, "elastic", function () {
                    if ("" == aA.shop_img_url) {
                        aD.attr("fill", "url(http://img02.taobaocdn.com/tps/i2/T1AyW0XwtcXXa11v_m-71-71.png)")
                    } else {
                        aD.attr("fill", "url(" + aA.shop_img_url + "_70x70)")
                    }
                }));
                var aK = au.path("M" + aw.attr("cx") + " " + aw.attr("cy") + " H" + aF);
                aK.transform("s0");
                aK.attr({stroke: "#ff8890", "stroke-width": "2"});
                aK.insertBefore(aw);
                aK.stop().animate({transform: "s1"}, aH, "elastic", function () {
                    aI && aI(this);
                    aI = undefined
                });
                aw.data("linePath", aK);
                var ay = at.get(".shop" + aB);
                var az = at.create("<a>", {"class": "shop_name", href: aJ.shop_url, target: "_blank", text: aJ.shop_name, css: {display: "block", "text-align": an[aB]}});
                at.append(az, ay);
                var aG = at.create("<p>", {"class": "shop_rank", css: {"text-align": an[aB]}});
                if (aJ.shop_rank != "") {
                    var aE = at.create("<img>", {src: aJ.shop_rank, alt: ""});
                    at.append(aE, aG)
                }
                at.append(aG, ay);
                var aC = at.create("<a>", {"class": "shop_owner", href: aJ.shop_url, target: "_blank", text: aJ.shop_owner, css: {display: "block", "text-align": an[aB]}});
                at.append(aC, ay);
                ar.on(az, "click", function (aL) {
                    af("tbgltjph.2.1", aJ.shop_url)
                });
                ar.on(az, "click", function (aL) {
                    af("tbgltjph.2.1", aJ.shop_url)
                });
                aD.hover(function () {
                    aD.g = aD.glow({color: "#ff8890", width: 10, opacity: 0.5, "stroke-linecap": "round", "stroke-linejoin": "round"});
                    at.css(az, "font-size", "20px");
                    at.css(aC, "font-size", "14px")
                }, function () {
                    aD.g.remove();
                    at.css(az, "font-size", "18px");
                    at.css(aC, "font-size", "12px")
                });
                ar.on(az, "mouseenter mouseleave", function (aL) {
                    if (aL.type == "mouseenter") {
                        at.css(az, "font-size", "20px");
                        at.css(aC, "font-size", "14px");
                        aD.g = aD.glow({color: "#ff8890", width: 10, opacity: 0.5, "stroke-linecap": "round", "stroke-linejoin": "round"})
                    } else {
                        at.css(az, "font-size", "18px");
                        at.css(aC, "font-size", "12px");
                        aD.g.remove()
                    }
                });
                ar.on(aE, "mouseenter mouseleave", function (aL) {
                    if (aL.type == "mouseenter") {
                        at.css(az, "font-size", "20px");
                        at.css(aC, "font-size", "14px");
                        aD.g = aD.glow({color: "#ff8890", width: 10, opacity: 0.5, "stroke-linecap": "round", "stroke-linejoin": "round"})
                    } else {
                        at.css(az, "font-size", "18px");
                        at.css(aC, "font-size", "12px");
                        aD.g.remove()
                    }
                });
                ar.on(aC, "mouseenter mouseleave", function (aL) {
                    if (aL.type == "mouseenter") {
                        at.css(az, "font-size", "20px");
                        at.css(aC, "font-size", "14px");
                        aD.g = aD.glow({color: "#ff8890", width: 10, opacity: 0.5, "stroke-linecap": "round", "stroke-linejoin": "round"})
                    } else {
                        at.css(az, "font-size", "18px");
                        at.css(aC, "font-size", "12px");
                        aD.g.remove()
                    }
                })
            }
        }

        function ai(az, aw, aC) {
            if (!az) {
                aC && aC();
                return
            }
            if (!az.data("isOpened")) {
                aC && aC();
                return
            }
            az.data("isOpened", false);
            var aB = az.data("childCircle");
            if (aB.type == "circle") {
                aB.remove && aB.remove()
            }
            var S = az.data("linePath");
            S.remove && S.remove();
            var ax;
            var ay = at.get(".shop" + aw);
            var aA = at.children(ay);
            for (ax = 0; ax < aA.length; ax++) {
                at.remove(aA[ax])
            }
            aC && aC()
        }

        function ap(S) {
            var aw = Math.random() * (S[1] - S[0]) + S[0];
            return aw
        }

        function am(ax) {
            ah.log("clear");
            var S = 500;
            var aw;
            for (aw = 0; aw < av.length; aw++) {
                ai(av[aw], aw)
            }
            av.stop().animate({r: 10, cy: 500, y: 500, opacity: 0}, S, "bounce", function () {
                this.remove();
                av.clear();
                ax && ax()
            });
            if (av.length == 0) {
                ax && ax()
            }
        }

        return{clear: function () {
            am()
        }, showDetail: function (aw, S) {
            al(aw, S)
        }, destroy: function () {
            if (!ah.isUndefined(au)) {
                au.remove()
            }
        }}
    })();
    var Y = (function () {
        var af = KISSY, ag = KISSY.DOM, ae = KISSY.Event;
        var ah = a;

        function ai(S) {
            S = S || [
                {list_name: "\u8fde\u8863\u88d9", list_url: "http://xx.taobao.com"},
                {list_name: "\u8fd0\u52a8/\u6237\u5916", list_url: "http://xx.taobao.com"},
                {list_name: "\u5bb6\u5c45/\u5bb6\u7eba", list_url: "http://xx.taobao.com"},
                {list_name: "\u65c5\u884c/\u6237\u5916", list_url: "http://xx.taobao.com"},
                {list_name: "\u5c0f\u9c7c\u513f", list_url: "http://xx.taobao.com"},
                {list_name: "\u7535\u5f71/\u5c11\u5e74\u6d3e", list_url: "http://xx.taobao.com"},
                {list_name: "\u676f\u5177/\u8336\u5177", list_url: "http://xx.taobao.com"},
                {list_name: "\u690d\u7269/\u82b1\u5349", list_url: "http://xx.taobao.com"},
                {list_name: "\u5bb6\u5c45/\u5bb6\u7eba", list_url: "http://xx.taobao.com"}
            ];
            af.each(S, function (am, aj) {
                var al = ag.get("#fish" + (aj + 2));
                var ak = ag.create("<a>", {href: am.list_url, target: "_blank", text: am.list_name});
                ag.append(ak, ag.children(al)[0]);
                ae.on(ak, "click", function (an) {
                    ah("tbgltjph.2.1", am.list_url)
                });
                ae.on(ak, "mouseenter mouseleave", function (ao) {
                    var an = ["0 -61px", "0 -317px", "0 -473px", "0 -610px", "0 -753px", "-481px 0", "-479px -179px", "-480px -301px", "-484px -431px"];
                    var ap = ["-201px -60px", "-239px -317px", "-245px -473px", "-316px -609px", "-194px -740px", "-655px -8px", "-801px -176px", "-762px -301px", "-745px -430px"];
                    if (ao.type == "mouseenter") {
                        ag.css(al, "background", "url(http://img04.taobaocdn.com/tps/i4/T1GmdYFkdbXXb9TbQr-1000-1000.png) " + ap[aj])
                    } else {
                        ag.css(al, "background", "url(http://img04.taobaocdn.com/tps/i4/T1GmdYFkdbXXb9TbQr-1000-1000.png) " + an[aj])
                    }
                })
            })
        }

        return{show: function (S) {
            ai(S)
        }}
    })();
    var K = (function () {
        var ah = KISSY, aj = ah.DOM, ae = ah.Event;
        var ag = u;
        var af = ag("J_Cube_Tags", 540, 540);
        var al = a;
        var ak = ak || [
            {tag_name: "\u545b\u53e3\u5c0f\u8fa3\u6912", tag_url: "http://xx.taobao.com"},
            {tag_name: "\u7f8e\u5c31\u662f\u8fd9\u6837", tag_url: "http://xx.taobao.com"},
            {tag_name: "\u670b\u514b\u98ce", tag_url: "http://xx.taobao.com"},
            {tag_name: "\u82f1\u4f26\u8303", tag_url: "http://xx.taobao.com"},
            {tag_name: "\u7b80\u5355\u7a7a", tag_url: "http://xx.taobao.com"},
            {tag_name: "\u5403\u8d27", tag_url: "http://xx.taobao.com"},
            {tag_name: "\u5c0f\u6e05\u65b0", tag_url: "http://xx.taobao.com"},
            {tag_name: "\u6587\u827a\u8303", tag_url: "http://xx.taobao.com"}
        ];
        ak.splice(2, 0, "");
        function ai(an) {
            var am = af.set();
            var S, ao;
            ah.each(an, function (at, aq) {
                ah.log(aq);
                if (aq != 2) {
                    S = (aq % 3 + Math.floor(aq / 3)) * 90 + 25;
                    ao = (3 - aq % 3 + Math.floor(aq / 3)) * 90 - 90;
                    var ar = af.rect(S, ao, 127, 127);
                    ar.attr({"stroke-width": 0});
                    ar.transform("r45");
                    if (aq % 2 == 1) {
                        ar.attr({fill: "#35ac6e"})
                    } else {
                        ar.attr({fill: "#3cb878"})
                    }
                    var ap = af.text(S + 60, ao + 60, at.tag_name);
                    ap.attr({"font-family": "microsoft yahei", "font-size": 20, fill: "#fff"});
                    am.push(ar, ap);
                    am.attr({cursor: "pointer"});
                    ar.hover(function () {
                        ap.attr({"font-size": 25});
                        ar.g = ar.glow({color: "#fff", width: 10, opacity: 0.5, "stroke-linecap": "rect", "stroke-linejoin": "rect"})
                    }, function () {
                        ap.attr({"font-size": 20});
                        ar.g.remove()
                    });
                    ap.hover(function () {
                        ap.attr({"font-size": 25});
                        ar.g = ar.glow({color: "#fff", width: 10, opacity: 0.5, "stroke-linecap": "rect", "stroke-linejoin": "rect"})
                    }, function () {
                        ap.attr({"font-size": 20});
                        ar.g.remove()
                    });
                    ar.click(function () {
                        if (ap.attr("text") != "") {
                            al("tbgltjph.2.1", at.tag_url);
                            window.open(at.tag_url)
                        }
                    });
                    ap.click(function () {
                        al("tbgltjph.2.1", at.tag_url);
                        window.open(at.tag_url)
                    })
                }
            })
        }

        return{show: function (S) {
            ai(S)
        }, destroy: function () {
            if (!ah.isUndefined(af)) {
                af.remove()
            }
        }}
    })();
    var ac = (function () {
        var ag = KISSY, al = ag.DOM, ak = ag.Event;
        var aj = u;
        var am = aj("J_bottom_image_canvas", 80, 80);
        var af = [40, 40];
        var ae = am.set();

        function ah(at, ap, an) {
            var S = Math.ceil((ap <= an ? ap : an) / 2);
            if (S <= 30) {
                at.image_url = "";
                S = 40
            }
            var at = at || {image_url: "", user_name: "\u4eb2"};
            var au = am.circle(af[0], af[1], S);
            if ("" == at.image_url) {
                au.attr("fill", "url(http://img03.taobaocdn.com/tps/i3/T1laW1XxNaXXaeHbsb-100-100.png)")
            } else {
                au.attr("fill", "url(" + at.image_url + ")")
            }
            au.attr("stroke-width", "0");
            ae.push(au);
            var ao = al.get("#advice");
            var ar = al.create("<p>", {"class": "advice_para1", text: "Hello," + at.user_name});
            al.append(ar, ao);
            var aq = al.create("<p>", {"class": "advice_para2", text: "\u7ed3\u675f\u4e86\u5feb\u4e50\u65c5\u7a0b\uff0c\u4f60\u627e\u5230\u4f60\u7684\u504f\u597d\u4e86\u4e48\uff1f"});
            al.append(aq, ao)
        }

        function ai(an) {
            var S = 500;
            ae.stop().animate({r: 10, cy: 40, y: 40, opacity: 0}, S, "bounce", function () {
                this.remove();
                ae.clear();
                an && an()
            });
            if (ae.length == 0) {
                an && an()
            }
        }

        return{show: function (ao, an, S) {
            ai(function () {
                ah(ao, an, S)
            })
        }}
    })();
    var j = (function () {
        var ag = KISSY, al = ag.DOM, ak = ag.Event;
        var aj = u;
        var am = aj("J_head_image_canvas", 80, 80);
        var af = [40, 40];
        var ae = am.set();

        function ah(ar, an, ay) {
            var aq = Math.ceil((an <= ay ? an : ay) / 2);
            if (aq <= 30) {
                ar.image_url = "";
                aq = 40
            }
            var ar = ar || {image_url: "", user_name: "\u4eb2"};
            var au = am.circle(af[0], af[1], aq);
            if ("" == ar.image_url) {
                au.attr("fill", "url(http://img03.taobaocdn.com/tps/i3/T1laW1XxNaXXaeHbsb-100-100.png)")
            } else {
                au.attr("fill", "url(" + ar.image_url + ")")
            }
            au.attr("stroke-width", "0");
            ae.push(au);
            var ao = al.get("#welcome");
            var ax = al.create("<p>", {"class": "wel_para1", text: "Hello," + ar.user_name});
            al.append(ax, ao);
            var aw = al.create("<p>", {"class": "wel_para2", text: "\u6b22\u8fce\u6765\u5230[\u6211\u7684\u504f\u597d\u4e4b\u65c5]\uff01"});
            al.append(aw, ao);
            var ap = al.get("#date");
            var at = new Date;
            var S = al.create("<p>", {"class": "date_para1", text: at.getFullYear() + "\u5e74" + (at.getMonth() + 1) + "\u6708"});
            al.append(S, ap);
            var av = at.getDate();
            if (av < 10) {
                av = "0" + av
            }
            var az = al.create("<p>", {"class": "date_para2", text: av});
            al.append(az, ap)
        }

        function ai(an) {
            var S = 500;
            ae.stop().animate({r: 10, cy: 40, y: 40, opacity: 0}, S, "bounce", function () {
                this.remove();
                ae.clear();
                an && an()
            });
            if (ae.length == 0) {
                an && an()
            }
        }

        return{show: function (ao, an, S) {
            ai(function () {
                ah(ao, an, S)
            })
        }}
    })();
    var y = (function () {
        var ag = KISSY, ai = ag.DOM, ae = ag.Event;
        var ah = ag.get("#J_360_Alert");
        var af = ag.get(".msg", ah);
        if (!ah || !af) {
            ag.log("alert box noe found!");
            return
        }
        ae.on(ag.get(".close", ah), "click", function (S) {
            ag.one(ah).fadeOut()
        });
        return{hide: function () {
            ai.hide(ah);
            ag.one(ah).fadeOut(1, function () {
            }, "bounceOut")
        }, show: function (S) {
            if (!S) {
                S = "\u4eb2\uff0c\u60a8\u5bfb\u627e\u7684\u5546\u54c1\u4e0d\u5b58\u5728\u3002"
            }
            ai.html(af, S);
            ai.show(ah);
            ag.one(ah).fadeIn(1, function () {
            }, "bounceIn")
        }}
    })();
    var n = (function () {
        var ai = KISSY, ak = ai.DOM, af = ai.Event;
        var ah = y;
        var ag = ai.get(".J_Item_Input");
        var al = ai.get(".J_Item_Input_Btn");
        var aj = function (am) {
            am.preventDefault();
            var an = ak.val(ag);
            var S = ak.text("#J_select");
            if (ae(an)) {
                var ao = /id=(\d*)/.exec(an);
                if (ao && ao[1]) {
                    ah.hide();
                    ai.log("item id " + ao[1]);
                    window.open("http://360.taobao.com/index.htm?id=" + ao[1])
                }
            } else {
                if (S == "\u627e\u76f8\u5173") {
                    window.open("http://360.taobao.com/index.htm?tag=" + encodeURIComponent(an))
                } else {
                    if (S == "\u627e\u504f\u597d") {
                        window.open("http://360.taobao.com/mylist.htm?type=tag&key=" + encodeURIComponent(an))
                    }
                }
            }
        };
        af.on([ag, al], "keydown", function (S) {
            if (S.keyCode == 13) {
                aj(S)
            }
        });
        af.on(al, "click", aj);
        function ae(S) {
            if (S.indexOf("http://") != 0) {
                S = "http://" + S
            }
            if (/^http:\/\/detail\.tmall\.com\/item\.htm/.test(S)) {
                return true
            }
            if (/^http:\/\/item\.taobao\.com\/item\.htm/.test(S)) {
                return true
            }
            if (/^http:\/\/ju\.taobao\.com\/tg\//.test(S)) {
                return true
            }
            if (/^http:\/\/detail\.daily\.tmall\.net\/item\.htm/.test(S)) {
                return true
            }
            if (/^http:\/\/item\.daily\.taobao\.net\/item\.htm/.test(S)) {
                return true
            }
            if (/^http:\/\/ju\.daily\.taobao\.net\/tg\//.test(S)) {
                return true
            }
            return false
        }
    })();
    var g = KISSY, F = g.DOM, Q = g.Event;
    if (g.UA.ie && g.UA.ie < 7) {
        F.hide("*");
        location.href("http://360.taobao.com/index.htm")
    }
    if (g.UA.ie && g.UA.ie == 8) {
        F.css("#top_paper_content", "top", "-137px")
    }
    g.getScript("http://a.tbcdn.cn/p/snsdk/core.js");
    n;
    var ab = F.viewportHeight(window);
    var P = 0;
    var G = 11946 + 164 - ab + 109;
    var U;
    var x;
    var p;
    var i;
    var q;
    var X;
    var C = F.get("#paper_plane");
    var l = g.one("#paper_plane");
    var O;
    var t = false;
    var Z = false;
    var m = false;
    var f = false;
    var V = false;
    var M = false;
    var L = false;
    var s = false;
    var B = false;
    var N = false;
    var ad;
    var r = 1;
    var c = /webkit/i.test(navigator.userAgent) || document.compatMode == "BackCompat" ? document.body : document.documentElement;
    F.hide("#title_tag");
    F.hide(".fish");
    F.hide("#love_fish1");
    F.hide("#love_fish2");
    F.hide("#heart1");
    F.hide("#heart2");
    F.hide("#fav_list_text");
    F.hide("#fav_brand_text");
    F.hide("#bg_rect2");
    F.hide("#bubble");
    F.hide("#bottom_paper_content");
    g.ready(function (ae) {
        var ag;
        var af = (new Date).getTime();
        if (location.href.indexOf("daily") > -1) {
            ag = "tui.daily.taobao.net"
        } else {
            if (location.href.indexOf("taobao.com") > -1) {
                ag = "360.taobao.com"
            } else {
                if (location.href.indexOf("localhost") > -1) {
                    ag = "360.taobao.com"
                } else {
                    ag = "360.taobao.com"
                }
            }
        }
        ae.IO({dataType: "jsonp", url: "http://" + ag + "/api/argument", data: {p: "u", from: "prefer_map_myprofile", f: "jp", t: af, jsonpCallback: "jsonp"}, success: function (al) {
            var ah, ai, aq, an, am;
            var ap, ak;
            if (!ae.isUndefined(al.listDesc["login"])) {
                var aj = "https://login.taobao.com/member/login.jhtml?redirectURL=" + encodeURIComponent(location.href);
                location.href = aj
            }
            p = [];
            an = al.listDesc["cat"];
            ae.each(an, function (at, ar) {
                ah = ar;
                ai = "http://" + ag + "/mylist.htm?type=cat&key=" + at[0]["extInfo"];
                aq = {list_name: ah, list_url: ai};
                p.push(aq)
            });
            am = 1;
            i = [];
            an = al.listDesc["shop"];
            ae.each(an, function (at, ar) {
                if (am == 3) {
                    i.push({})
                }
                ah = ar;
                ai = "http://" + ag + "/mylist.htm?type=shop&key=" + at[0]["extInfo"];
                aq = {shop_name: ah, shop_url: ai, shop_rank: at[0]["url"], shop_owner: at[0]["sellerNick"], shop_img_url: at[0]["pic"]};
                i.push(aq);
                am++
            });
            while (am < 10) {
                i.push({shop_name: "", shop_url: "", shop_rank: "", shop_owner: "", shop_img_url: ""});
                am++
            }
            am = 1;
            q = [];
            an = al.listDesc["brand"];
            ae.each(an, function (at, ar) {
                ah = ar;
                ai = "http://" + ag + "/mylist.htm?type=brand&key=" + at[0]["extInfo"];
                aq = {brand_name: ah, brand_url: ai};
                q.push(aq);
                am++
            });
            while (am <= 9) {
                q.push({brand_name: "", brand_url: ""});
                am++
            }
            x = [];
            am = 1;
            an = al.listDesc["tag"];
            ae.each(an, function (at, ar) {
                ah = ar;
                ai = "http://" + ag + "/mylist.htm?type=tag&key=" + at[0]["extInfo"];
                aq = {tag_name: ah, tag_url: ai};
                x.push(aq);
                am++
            });
            while (am <= 9) {
                x.push({tag_name: "", tag_url: ""});
                am++
            }
            if (ae.isUndefined(al.listDesc["user"])) {
                ah = "\u4eb2";
                ai = ""
            } else {
                ah = al.listDesc["user"]["name"];
                ai = F.attr("img", "src");
                ap = F.attr("img", "width");
                ak = F.attr("img", "height")
            }
            if (ae.isUndefined(ah) || ah == "") {
                ah = "\u4eb2"
            }
            if (ae.isUndefined(ai)) {
                ai = ""
            }
            X = {image_url: ai, user_name: ah};
            var ao = j;
            ao.show(X, ap, ak);
            var S = ac;
            S.show(X, ap, ak)
        }, error: function (S) {
            ae.log("Ajax error:" + S)
        }})
    });
    function h(S, ae, af) {
        if (g.UA.ie && g.UA.ie < 9) {
            F.show(S)
        } else {
            g.Anim.stop(S);
            F.show(S);
            g.Anim(S, {opacity: 1}, ae, "easeOut",function () {
                af && af()
            }).run()
        }
    }

    function T(S, ae, af) {
        if (g.UA.ie && g.UA.ie < 9) {
            F.hide(S)
        } else {
            g.Anim.stop(S);
            g.Anim(S, {opacity: 0}, ae, "easeOut",function () {
                af && af()
            }).run()
        }
    }

    function H(ag, aj, ah, al, am, S, ak) {
        var ae;
        var af;
        var ai;
        ae = F.css(ag, aj);
        for (ai = 0; ai < ae.length; ai++) {
            if (!(ae.substr(ai, 1) >= "0" && ae.substr(ai, 1) <= "9") && ae.substr(ai, 1) != "-" && ae.substr(ai, 1) != ".") {
                af = ae.substr(ai, 1);
                break
            }
        }
        F.css(ag, aj, am + (ak - ah) * ((S - am) / (al - ah)) + ae.substring(ae.indexOf(af)))
    }

    Q.on(document, "mousewheel", function (S) {
        S.halt();
        if (ad) {
            ad.stop();
            r++;
            r = r > 2 ? 2 : r
        }
        ad = g.Anim(c, {scrollTop: F.scrollTop() - r * 100 * S.deltaY}, 0.5, "easeOut",function () {
            ad = undefined;
            r = 1
        }).run()
    });
    Q.on(document, "keydown", function (S) {
        if (S.which == 38) {
            S.halt();
            if (ad) {
                ad.stop();
                r++;
                r = r > 2 ? 2 : r
            }
            ad = g.Anim(c, {scrollTop: F.scrollTop() - r * 100}, 0.5, "easeOut",function () {
                ad = undefined;
                r = 1
            }).run()
        }
        if (S.which == 40) {
            S.halt();
            if (ad) {
                ad.stop();
                r++;
                r = r > 2 ? 2 : r
            }
            ad = g.Anim(c, {scrollTop: F.scrollTop() + r * 100}, 0.5, "easeOut",function () {
                ad = undefined;
                r = 1
            }).run()
        }
    });
    var R = false;
    Q.on(window, "scroll", function (am) {
        var ai = F.scrollTop(window);
        if (ai > 0 && !R) {
            F.scrollTop(window, "0");
            ai = 0;
            R = true
        }
        var ak;
        var ag = ai - P;
        if (ag < 0) {
            ak = -1
        } else {
            ak = 1
        }
        g.log("scrollTop:" + ai);
        if (ai > 0) {
            T("#top_paper_content", 0.2, function () {
                F.hide("#top_paper_content")
            })
        } else {
            h("#top_paper_content", 0.2, function () {
                F.show("#top_paper_content")
            })
        }
        if (ai >= G - 200) {
            h("#bottom_paper_content", 0.2, function () {
                F.show("#bottom_paper_content")
            })
        } else {
            T("#bottom_paper_content", 0.2, function () {
                F.hide("#bottom_paper_content")
            })
        }
        if (ai >= 0 && ai < 100) {
            F.css(C, {height: "298px", width: "395px", "margin-left": "-200px", background: "url(http://img01.taobaocdn.com/tps/i1/T1WCGQXCRiXXbwuNMq-395-298.png) no-repeat"})
        } else {
            if (ai >= 100 && ai < 200) {
                if (ak > 0) {
                    F.css(C, {height: "298px", width: "395px", "margin-left": "-200px", background: "url(http://img02.taobaocdn.com/tps/i2/T1Z8yOXwdhXXbwuNMq-395-298.png) no-repeat"})
                } else {
                    F.css(C, {height: "298px", width: "395px", "margin-left": "-200px", background: "url(http://img01.taobaocdn.com/tps/i1/T1iT14XrFbXXbwuNMq-395-298.png) no-repeat"})
                }
            } else {
                if (ai >= 200 && ai < 300) {
                    if (ak > 0) {
                        F.css(C, {height: "280px", width: "380px", "margin-left": "-200px", background: "url(http://img03.taobaocdn.com/tps/i3/T1_Ke2XDFfXXa6GPH0-380-280.png) no-repeat"})
                    } else {
                        F.css(C, {height: "280px", width: "380px", "margin-left": "-200px", background: "url(http://img04.taobaocdn.com/tps/i4/T1Rxe4XBXbXXa6GPH0-380-280.png) no-repeat"})
                    }
                } else {
                    if (ai >= 300 && ai < 400) {
                        if (ak > 0) {
                            F.css(C, {height: "268px", width: "322px", "margin-left": "-200px", background: "url(http://img02.taobaocdn.com/tps/i2/T1UkC0XpdbXXa4fwgt-322-268.png) no-repeat"})
                        } else {
                            F.css(C, {height: "268px", width: "322px", "margin-left": "-200px", background: "url(http://img01.taobaocdn.com/tps/i1/T13jC4XB8bXXa4fwgt-322-268.png) no-repeat"})
                        }
                    } else {
                        if (ai >= 400 && ai < 500) {
                            if (ak > 0) {
                                F.css(C, {height: "230px", width: "278px", "margin-left": "-200px", background: "url(http://img03.taobaocdn.com/tps/i3/T18IuZXxVfXXauQYUa-278-230.png) no-repeat"})
                            } else {
                                F.css(C, {height: "230px", width: "278px", "margin-left": "-200px", background: "url(http://img02.taobaocdn.com/tps/i2/T1wfW2XvheXXauQYUa-278-230.png) no-repeat"})
                            }
                        } else {
                            if (ai >= 500 && ai < 600) {
                                if (ak > 0) {
                                    F.css(C, {height: "196px", width: "248px", "margin-left": "-200px", background: "url(http://img04.taobaocdn.com/tps/i4/T1tiO1XCdXXXcAUjHn-248-196.png) no-repeat"})
                                } else {
                                    F.css(C, {height: "196px", width: "248px", "margin-left": "-200px", background: "url(http://img03.taobaocdn.com/tps/i3/T1p8K3XwFfXXcAUjHn-248-196.png) no-repeat"})
                                }
                            } else {
                                if (ai >= 600 && ai < 700) {
                                    if (ak > 0) {
                                        F.css(C, {height: "146px", width: "165px", "margin-left": "-200px", background: "url(http://img01.taobaocdn.com/tps/i1/T11Ge0XylcXXa8wILZ-165-146.png) no-repeat"})
                                    } else {
                                        F.css(C, {height: "146px", width: "165px", "margin-left": "-200px", background: "url(http://img04.taobaocdn.com/tps/i4/T1jXe5XE0aXXa8wILZ-165-146.png) no-repeat"})
                                    }
                                } else {
                                    if (ai >= 700 && ai < 800) {
                                        if (ak > 0) {
                                            F.css(C, {height: "165px", width: "120px", "margin-left": "-200px", background: "url(http://img02.taobaocdn.com/tps/i2/T1vwW0XEpbXXbmV9UI-120-160.png) no-repeat"})
                                        } else {
                                            F.css(C, {height: "165px", width: "120px", "margin-left": "-200px", background: "url(http://img03.taobaocdn.com/tps/i3/T1ATG3XsFeXXcx_zMN-122-152.png) no-repeat"})
                                        }
                                    } else {
                                        if (ak > 0) {
                                            F.css(C, {height: "165px", width: "120px", background: "url(http://img02.taobaocdn.com/tps/i2/T1vwW0XEpbXXbmV9UI-120-160.png) no-repeat"})
                                        } else {
                                            F.css(C, {height: "165px", width: "120px", background: "url(http://img03.taobaocdn.com/tps/i3/T1ATG3XsFeXXcx_zMN-122-152.png) no-repeat"})
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (ai >= 0 && ai < 600) {
            F.css("#site-nav", {position: "fixed", top: "0px"});
            F.css(".header", {position: "fixed", top: "27px"});
            F.css(".nav", {position: "fixed", top: "102px"});
            F.css(".main-wrap", {position: "relative", top: "138px"});
            O = true
        } else {
            if (ai >= 600 && ai < 1000 && O) {
                F.css("#site-nav", {position: "absolute", top: ai + "px"});
                F.css(".header", {position: "absolute", top: 27 + ai + "px"});
                F.css(".nav", {position: "absolute", top: 102 + ai + "px"});
                O = false
            } else {
                if (ai >= 1000 && ai <= G && O) {
                    F.css("#site-nav", "top", "0px");
                    F.css(".header", "top", "27px");
                    F.css(".nav", "top", "102px")
                }
            }
        }
        if (ai >= 0 && ai < 1582 + 164 - 230 - 165) {
            F.css("#pager1", "background-position", "-19px 0");
            F.css("#pager2", "background-position", "0 0");
            F.css("#pager3", "background-position", "0 0");
            F.css("#pager4", "background-position", "0 0");
            F.css("#pager5", "background-position", "0 0");
            if (ai < 5) {
                F.css("#hotball1", "top", "0px");
                F.css("#hotball2", "top", "1480px");
                F.css("#hotball2", "left", "-300px");
                F.css("#cloud1", "top", "1780px");
                F.css("#cloud2", "top", "1850px");
                F.css("#cloud3", "top", "1430px");
                F.css("#bg_rect1", "top", "0");
                F.css("#bg_rect2", "top", "0");
                F.css("#block3_bg", "top", "243px");
                F.css("#road", "top", "5640px");
                F.css("#road_pink_bg", "top", "5640px");
                F.css("#bubble", "top", "1350px");
                F.css("#tree1", "top", "591px");
                F.css("#tree2", "top", "706px");
                F.css("#block4_bg", "top", "-300px");
                F.css("#balloon1", "top", "100px");
                F.css("#balloon2", "top", "200px");
                F.css("#block5_bg", "bottom", "1000px");
                F.css(C, "position", "fixed");
                F.css(C, "top", "230px");
                F.css(C, "z-index", "3000");
                F.css("#house", "top", "10248px");
                F.css("#balloon_big", "top", "500px")
            }
            if (ai > 500) {
                var aj = F.css("#hotball1", "top");
                F.css("#hotball1", "top", aj.substring(0, aj.indexOf("p")) - 5 * ak + "px");
                H("#hotball2", "left", 500, 1582 + 164 - 230 - 165, -300, 900, ai);
                H("#hotball2", "top", 500, 1582 + 164 - 230 - 165, 1480, 900, ai);
                var ah = F.css("#cloud1", "top");
                F.css("#cloud1", "top", ah.substring(0, ah.indexOf("p")) - 20 * ak / 2 + "px");
                var ae = F.css("#cloud2", "top");
                F.css("#cloud2", "top", ae.substring(0, ae.indexOf("p")) - 20 * ak / 1.8 + "px");
                var an = F.css("#cloud3", "top");
                F.css("#cloud3", "top", an.substring(0, an.indexOf("p")) - 20 * ak / 1.6 + "px")
            }
            F.css(C, "z-index", "3000");
            F.css("#top_paper_content", "z-index", "3000");
            F.css("#bottom_paper_content", "z-index", "3000");
            if (ai >= 800) {
                F.css(C, "margin-left", "-200px")
            }
            if (ai >= 1582 + 164 - 230 - 165 - 400 && !t) {
                var af = K;
                af.show(x);
                t = true
            }
        } else {
            if (ai >= 1582 + 164 - 230 - 165 && ai < 3572 + 164 - 230 - 165) {
                F.css("#pager2", "background-position", "-34px 0");
                F.css("#pager1", "background-position", "0 0");
                F.css("#pager3", "background-position", "0 0");
                F.css("#pager4", "background-position", "0 0");
                F.css("#pager5", "background-position", "0 0");
                if (ai >= 1582 + 164 - 230 - 165 && ai < 1582 + 164 - 230 - 165 + 500) {
                    F.css("#top_paper_content", "z-index", "-1000");
                    F.css("#bottom_paper_content", "z-index", "-1000")
                } else {
                    if (ai >= 1582 + 164 - 230 - 165 + 700 && ai < 1582 + 164 - 230 - 165 + 1300) {
                        H("#cloud5", "margin-left", 1582 + 164 - 230 - 165 + 500, 1582 + 164 - 230 - 165 + 1300, 380, 650, ai)
                    } else {
                        F.css("#top_paper_content", "z-index", "3000");
                        F.css("#bottom_paper_content", "z-index", "3000")
                    }
                }
                F.css(C, "z-index", "3000");
                if (ai >= 1582 + 164 - 230 - 165 + 800) {
                    F.css(C, "margin-left", "-200px")
                }
                if (ai >= 1582 + 164 - 230 - 165 + 200) {
                    h("#title_tag", 0.5)
                } else {
                    T("#title_tag", 0.5)
                }
                if (ai >= 1582 + 164 - 230 - 165) {
                    h("#cloud5", 0.5)
                } else {
                    T("#cloud5", 0.5)
                }
            } else {
                if (ai >= 3572 + 164 - 230 - 165 && ai < 6168 + 164 - 230 - 165) {
                    F.css("#pager3", "background-position", "-52px 0");
                    F.css("#pager2", "background-position", "0 0");
                    F.css("#pager1", "background-position", "0 0");
                    F.css("#pager4", "background-position", "0 0");
                    F.css("#pager5", "background-position", "0 0");
                    F.css(C, "margin-left", "-200px");
                    if (ai >= 4870 + 164 - 230 - 165) {
                        F.css(C, "margin-left", "-120px")
                    }
                    F.css(C, "z-index", "-10");
                    F.css("#top_paper_content", "z-index", "-1000");
                    F.css("#bottom_paper_content", "z-index", "-1000");
                    H("#wave_layer1", "background-position", 3572 + 164 - 230 - 165, 6168 + 164 - 230 - 165, 0, -600, ai);
                    H("#wave_layer1_mid", "background-position", 3572 + 164 - 230 - 165, 6168 + 164 - 230 - 165, 0, -900, ai);
                    H("#wave_layer3", "background-position", 3572 + 164 - 230 - 165, 6168 + 164 - 230 - 165, 0, -1800, ai);
                    if (ai >= 3572 + 164 - 230 - 165 + 200 && !Z) {
                        F.show(F.get("#fav_list_text"));
                        g.one("#fish14").fadeIn(0.1, function () {
                            g.one("#fish13").fadeIn(0.1, function () {
                                g.one("#fish12").fadeIn(0.1, function () {
                                    g.one("#fish11").fadeIn(0.1, function () {
                                        g.one("#fish10").fadeIn(0.1, function () {
                                            g.one("#fish9").fadeIn(0.1, function () {
                                                g.one("#fish8").fadeIn(0.1, function () {
                                                    g.one("#fish7").fadeIn(0.1, function () {
                                                        g.one("#fish6").fadeIn(0.1, function () {
                                                            g.one("#fish5").fadeIn(0.1, function () {
                                                                g.one("#fish4").fadeIn(0.1, function () {
                                                                    g.one("#fish3").fadeIn(0.1, function () {
                                                                        g.one("#fish2").fadeIn(0.1, function () {
                                                                            g.one("#fish1").fadeIn(0.1)
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        });
                        var S = Y;
                        S.show(p);
                        Z = true
                    }
                    if (ai >= 3572 + 164 - 230 - 165 + 900 && ai < 3572 + 164 - 230 - 165 + 1700) {
                        h("#love_fish1", 0.5);
                        h("#love_fish2", 0.5);
                        H("#love_fish1", "left", 3572 + 164 - 230 - 165 + 900, 3572 + 164 - 230 - 165 + 1700, -100, 190, ai);
                        H("#love_fish2", "left", 3572 + 164 - 230 - 165 + 900, 3572 + 164 - 230 - 165 + 1700, 900, 263, ai);
                        if (ai >= 3572 + 164 - 230 - 165 + 1600 && ai < 3572 + 164 - 230 - 165 + 1700) {
                            h("#heart1", 0.5);
                            h("#heart2", 0.5)
                        }
                    }
                } else {
                    if (ai >= 6168 + 164 - 230 - 165 && ai < 8588 + 164 - 230 - 165) {
                        if (!m && ai >= 6168 + 164 - 230 - 165) {
                            U = v;
                            m = true
                        }
                        F.css("#pager4", "background-position", "-67px 0");
                        F.css("#pager2", "background-position", "0 0");
                        F.css("#pager3", "background-position", "0 0");
                        F.css("#pager1", "background-position", "0 0");
                        F.css("#pager5", "background-position", "0 0");
                        F.css(C, "z-index", "3000");
                        F.css("#top_paper_content", "z-index", "-1000");
                        F.css("#bottom_paper_content", "z-index", "-1000");
                        if (ai >= 6168 + 164 - 230 - 165 + 1400 && ai < 8588 + 164 - 230 - 165) {
                            H("#tree1", "top", 6168 + 164 - 230 - 165 + 1400, 8588 + 164 - 230 - 165, 1391, 1230, ai);
                            H("#tree2", "top", 6168 + 164 - 230 - 165 + 1400, 8588 + 164 - 230 - 165, 1506, 1342, ai)
                        }
                        if (ai >= 6168 + 164 - 230 - 165 && ai < 6168 + 164 - 230 - 165 + 200) {
                            H(C, "margin-left", 6168 + 164 - 230 - 165, 6168 + 164 - 230 - 165 + 200, -120, -35, ai);
                            if (ai >= 6168 + 164 - 230 - 165) {
                                if (!f) {
                                    U.showDetail(i, 0);
                                    U.showDetail(i, 1);
                                    f = true
                                }
                            }
                        } else {
                            if (ai >= 6168 + 164 - 230 - 165 + 200 && ai < 6168 + 164 - 230 - 165 + 400) {
                                H(C, "margin-left", 6168 + 164 - 230 - 165 + 200, 6168 + 164 - 230 - 165 + 400, -35, -90, ai)
                            } else {
                                if (ai >= 6168 + 164 - 230 - 165 + 400 && ai < 6168 + 164 - 230 - 165 + 1400) {
                                    if (ai >= 6168 + 164 - 230 - 165 + 400 && !V) {
                                        U.showDetail(i, 2);
                                        U.showDetail(i, 3);
                                        V = true
                                    }
                                    if (ai >= 6168 + 164 - 230 - 165 + 600 && !M) {
                                        U.showDetail(i, 4);
                                        M = true
                                    }
                                    if (ai >= 6168 + 164 - 230 - 165 + 700 && !L) {
                                        U.showDetail(i, 5);
                                        L = true
                                    }
                                    if (ai >= 6168 + 164 - 230 - 165 + 800 && !s) {
                                        U.showDetail(i, 6);
                                        U.showDetail(i, 7);
                                        s = true
                                    }
                                    if (ai >= 6168 + 164 - 230 - 165 + 1000 && !B) {
                                        U.showDetail(i, 8);
                                        U.showDetail(i, 9);
                                        B = true
                                    }
                                } else {
                                    if (ai >= 6168 + 164 - 230 - 165 + 1400 && ai < 6168 + 164 - 230 - 165 + 1500) {
                                        H(C, "margin-left", 6168 + 164 - 230 - 165 + 1400, 6168 + 164 - 230 - 165 + 1500, -90, -90, ai)
                                    } else {
                                        if (ai >= 6168 + 164 - 230 - 165 + 1500 && ai < 6168 + 164 - 230 - 165 + 1800) {
                                            H(C, "margin-left", 6168 + 164 - 230 - 165 + 1500, 6168 + 164 - 230 - 165 + 1800, -90, -45, ai)
                                        } else {
                                            if (ai >= 6168 + 164 - 230 - 165 + 1800 && ai < 6168 + 164 - 230 - 165 + 2000) {
                                                H(C, "margin-left", 6168 + 164 - 230 - 165 + 1800, 6168 + 164 - 230 - 165 + 2000, -45, -100, ai)
                                            } else {
                                                if (ai >= 6168 + 164 - 230 - 165 + 2000 && ai < 6168 + 164 - 230 - 165 + 2200) {
                                                    H(C, "margin-left", 6168 + 164 - 230 - 165 + 2000, 6168 + 164 - 230 - 165 + 2200, -100, -20, ai)
                                                } else {
                                                    H(C, "margin-left", 6168 + 164 - 230 - 165 + 2200, 8588 + 164 - 230 - 165, -20, -120, ai)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        F.css("#pager5", "background-position", "-83px 0");
                        F.css("#pager2", "background-position", "0 0");
                        F.css("#pager3", "background-position", "0 0");
                        F.css("#pager4", "background-position", "0 0");
                        F.css("#pager1", "background-position", "0 0");
                        if (!N && ai >= 8588 + 164 - 230 - 165 + 400) {
                            var al = aa;
                            al.show(q);
                            N = true
                        }
                        if (ai >= 8588 + 164 - 230 - 165 + 600 && ai < 8588 + 164 - 230 - 165 + 1000) {
                            F.css("#top_paper_content", "z-index", "-1000");
                            F.css("#bottom_paper_content", "z-index", "-1000");
                            H("#paper_plane", "margin-left", 8588 + 164 - 230 - 165 + 600, 8588 + 164 - 230 - 165 + 1000, -120, 34, ai)
                        } else {
                            if (ai >= 8588 + 164 - 230 - 165 + 1000 && ai < 8588 + 164 - 230 - 165 + 1800) {
                            } else {
                                if (ai >= 8588 + 164 - 230 - 165 + 1800 && ai < 8588 + 164 - 230 - 165 + 2100) {
                                    F.css("#top_paper_content", "z-index", "-1000");
                                    F.css("#bottom_paper_content", "z-index", "-1000");
                                    H("#paper_plane", "margin-left", 8588 + 164 - 230 - 165 + 1800, 8588 + 164 - 230 - 165 + 2100, 34, 150, ai)
                                } else {
                                    F.css(C, "z-index", "3000");
                                    F.css("#top_paper_content", "z-index", "3000");
                                    F.css("#bottom_paper_content", "z-index", "3000")
                                }
                            }
                        }
                        H("#balloon1", "top", 8588 + 164 - 230 - 165, 8588 + 164 - 230 - 165 + 300, 100, -180, ai);
                        H("#balloon2", "top", 8588 + 164 - 230 - 165, 8588 + 164 - 230 - 165 + 300, 200, -80, ai)
                    }
                }
            }
        }
        if (ai >= G - 300) {
            F.css(C, {height: "298px", width: "395px", position: "absolute", top: "11335px", "margin-left": "-184px", background: "url(http://img01.taobaocdn.com/tps/i1/T1WCGQXCRiXXbwuNMq-395-298.png) no-repeat"})
        } else {
            if (ai >= G - 900 && ai < G - 800) {
                if (ak > 0) {
                    F.css(C, {height: "165px", width: "120px", position: "fixed", "margin-left": "150px", background: "url(http://img02.taobaocdn.com/tps/i2/T1vwW0XEpbXXbmV9UI-120-160.png) no-repeat"})
                } else {
                    F.css(C, {height: "165px", width: "120px", position: "fixed", "margin-left": "150px", background: "url(http://img03.taobaocdn.com/tps/i3/T1ATG3XsFeXXcx_zMN-122-152.png) no-repeat"})
                }
            } else {
                if (ai >= G - 800 && ai < G - 700) {
                    if (ak > 0) {
                        F.css(C, {height: "146px", width: "165px", position: "fixed", "margin-left": "90px", background: "url(http://img01.taobaocdn.com/tps/i1/T11Ge0XylcXXa8wILZ-165-146.png) no-repeat"})
                    } else {
                        F.css(C, {height: "146px", width: "165px", position: "fixed", "margin-left": "90px", background: "url(http://img04.taobaocdn.com/tps/i4/T1jXe5XE0aXXa8wILZ-165-146.png) no-repeat"})
                    }
                } else {
                    if (ai >= G - 700 && ai < G - 600) {
                        if (ak > 0) {
                            F.css(C, {height: "196px", width: "248px", position: "fixed", "margin-left": "40px", background: "url(http://img04.taobaocdn.com/tps/i4/T1tiO1XCdXXXcAUjHn-248-196.png) no-repeat"})
                        } else {
                            F.css(C, {height: "196px", width: "248px", position: "fixed", "margin-left": "40px", background: "url(http://img03.taobaocdn.com/tps/i3/T1p8K3XwFfXXcAUjHn-248-196.png) no-repeat"})
                        }
                    } else {
                        if (ai >= G - 600 && ai < G - 500) {
                            if (ak > 0) {
                                F.css(C, {height: "230px", width: "278px", position: "fixed", top: "230px", "margin-left": "30px", background: "url(http://img03.taobaocdn.com/tps/i3/T18IuZXxVfXXauQYUa-278-230.png) no-repeat"})
                            } else {
                                F.css(C, {height: "230px", width: "278px", position: "fixed", top: "230px", "margin-left": "30px", background: "url(http://img02.taobaocdn.com/tps/i2/T1wfW2XvheXXauQYUa-278-230.png) no-repeat"})
                            }
                        } else {
                            if (ai >= G - 500 && ai < G - 400) {
                                if (ak > 0) {
                                    F.css(C, {height: "268px", width: "322px", position: "fixed", top: "230px", "margin-left": "50px", background: "url(http://img02.taobaocdn.com/tps/i2/T1UkC0XpdbXXa4fwgt-322-268.png) no-repeat"})
                                } else {
                                    F.css(C, {height: "268px", width: "322px", position: "fixed", top: "230px", "margin-left": "50px", background: "url(http://img01.taobaocdn.com/tps/i1/T13jC4XB8bXXa4fwgt-322-268.png) no-repeat"})
                                }
                            } else {
                                if (ai >= G - 400 && ai < G - 300) {
                                    if (ak > 0) {
                                        F.css(C, {height: "280px", width: "380px", position: "fixed", top: "230px", "margin-left": "-40px", background: "url(http://img03.taobaocdn.com/tps/i3/T1_Ke2XDFfXXa6GPH0-380-280.png) no-repeat"})
                                    } else {
                                        F.css(C, {height: "280px", width: "380px", position: "fixed", top: "230px", "margin-left": "-40px", background: "url(http://img04.taobaocdn.com/tps/i4/T1Rxe4XBXbXXa6GPH0-380-280.png) no-repeat"})
                                    }
                                } else {
                                    if (ai >= G - 300 && ai < G - 200) {
                                        if (ak > 0) {
                                            F.css(C, {height: "298px", width: "395px", position: "fixed", top: "230px", "margin-left": "-130px", background: "url(http://img02.taobaocdn.com/tps/i2/T1Z8yOXwdhXXbwuNMq-395-298.png) no-repeat"})
                                        } else {
                                            F.css(C, {height: "298px", width: "395px", position: "fixed", top: "230px", "margin-left": "-130px", background: "url(http://img01.taobaocdn.com/tps/i1/T1iT14XrFbXXbwuNMq-395-298.png) no-repeat"})
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        H(".background", "top", 0, G, 0, -8274 + ab, ai);
        if (ai >= 791 + 164 - 230 - 165 && ai < 1582 + 164 - 230 - 165) {
            H("#bg_rect1", "top", 791 + 164 - 230 - 165, 1582 + 164 - 230 - 165, 0, -400, ai)
        }
        if (ai >= 1582 + 164 - 230 - 165 + 500 && ai <= 3572 + 164 - 230 - 165 + 400) {
            H("#bg_rect2", "top", 1582 + 164 - 230 - 165 + 500, 3572 + 164 - 230 - 165 + 400, 0, 800, ai);
            h("#bg_rect2", 0.5)
        } else {
            T("#bg_rect2", 0.5)
        }
        if (ai > 3572 + 164 - 230 - 165 && ai < 6168 + 164 - 230 - 165) {
            h("#bubble", 0.5);
            H("#bubble", "top", 3572 + 164 - 230 - 165, 6168 + 164 - 230 - 165, 550, -1220, ai)
        }
        if (ai > 6168 + 164 - 230 - 165 - 500 && ai <= 8588 + 164 - 230 - 165) {
            H("#block4_bg", "top", 6168 + 164 - 230 - 165 - 500, 8588 + 164 - 230 - 165, -300, -2442, ai)
        }
        if (ai >= 8588 + 164 - 230 - 165 + 500) {
            H("#block5_bg", "bottom", 8588 + 164 - 230 - 165 + 500, G, 1000, 0, ai)
        }
        if (ai >= 0 && ai < 1582 + 164 - 230 - 165 + 500) {
            F.css("#cloud5", {position: "absolute", top: "350px"});
            F.css("#sun", {position: "absolute", top: "350px"});
            F.css("#title_tag", {position: "absolute", top: "600px"});
            F.css("#cloud4", {position: "absolute", top: "700px"});
            F.css("#cloud6", {position: "absolute", top: "750px"});
            F.css("#J_Cube_Tags", {position: "absolute", top: "210px"})
        } else {
            if (ai >= 1582 + 164 - 230 - 165 + 500 && ai < 1582 + 164 - 230 - 165 + 1300) {
                F.css("#J_Cube_Tags", {position: "fixed", top: F.offset("#J_Cube_Tags").top - ai});
                F.css("#cloud5", {position: "fixed", top: F.offset("#cloud5").top - ai});
                F.css("#sun", {position: "fixed", top: F.offset("#sun").top - ai});
                F.css("#title_tag", {position: "fixed", top: F.offset("#title_tag").top - ai});
                F.css("#cloud4", {position: "fixed", top: F.offset("#cloud4").top - ai});
                F.css("#cloud6", {position: "fixed", top: F.offset("#cloud6").top - ai})
            } else {
                F.css("#J_Cube_Tags", {position: "absolute", top: 210 + 800 + "px"});
                F.css("#cloud5", {position: "absolute", top: 350 + 800 + "px"});
                F.css("#sun", {position: "absolute", top: 350 + 800 + "px"});
                F.css("#title_tag", {position: "absolute", top: 600 + 800 + "px"});
                F.css("#cloud4", {position: "absolute", top: 700 + 800 + "px"});
                F.css("#cloud6", {position: "absolute", top: 750 + 800 + "px"})
            }
        }
        if (ai >= 0 && ai < 3572 + 164 - 230 - 165 + 900) {
            F.css("#block3_surface", {position: "absolute", top: "460px"})
        } else {
            if (ai >= 3572 + 164 - 230 - 165 + 900 && ai < 3572 + 164 - 230 - 165 + 1700) {
                F.css("#block3_surface", {position: "fixed", top: F.offset("#block3_surface").top - ai + "px"})
            } else {
                F.css("#block3_surface", {position: "absolute", top: 460 + 800 + "px"})
            }
        }
        if (ai >= 0 && ai < 6168 + 164 - 230 - 165 + 400) {
            F.css("#block4_surface", {position: "absolute", top: "0px"});
            F.css("#road", {position: "absolute", top: "5640px"});
            F.css("#road_pink_bg", {position: "absolute", top: "5640px"});
            F.css("#signal_light", "background-image", "url(http://img01.taobaocdn.com/tps/i1/T11bl3FiFeXXbUCxPe-36-78.png)")
        } else {
            if (ai >= 6168 + 164 - 230 - 165 + 400 && ai < 6168 + 164 - 230 - 165 + 1400) {
                F.css("#block4_surface", {position: "fixed", top: F.offset("#block4_surface").top - ai + "px"});
                F.css("#road", {position: "fixed", top: F.offset("#road").top - ai + "px"});
                F.css("#road_pink_bg", {position: "fixed", top: F.offset("#road_pink_bg").top - ai + "px"});
                F.css("#signal_light", "background-image", "url(http://img03.taobaocdn.com/tps/i3/T1rz44FkNaXXbUCxPe-36-78.png)")
            } else {
                F.css("#block4_surface", {position: "absolute", top: 0 + 1000 + "px"});
                F.css("#road", {position: "absolute", top: 5640 + 1000 + "px"});
                F.css("#road_pink_bg", {position: "absolute", top: 5640 + 1000 + "px"});
                F.css("#signal_light", "background-image", "url(http://img01.taobaocdn.com/tps/i1/T11bl3FiFeXXbUCxPe-36-78.png)")
            }
        }
        if (ai >= 0 && ai < 8588 + 164 - 230 - 165 + 1000) {
            F.css("#balloon_big", {position: "absolute", top: "500px"});
            F.css("#house", {position: "absolute", top: "10248px"})
        } else {
            if (ai >= 8588 + 164 - 230 - 165 + 1000 && ai < 8588 + 164 - 230 - 165 + 1800) {
                F.css("#balloon_big", {position: "fixed", top: F.offset("#balloon_big").top - ai});
                F.css("#house", {position: "absolute", top: F.offset("#house").top - ai})
            } else {
                F.css("#balloon_big", {position: "absolute", top: 500 + 800 + "px"});
                F.css("#house", {position: "absolute", top: 10248 + 800 + "px"})
            }
        }
        P = ai
    });
    Q.on("#pager1", "click", function (S) {
        ad;
        r = 1;
        if (ad) {
            ad.stop();
            r++;
            r = r > 2 ? 2 : r
        }
        ad = g.Anim(c, {scrollTop: 0}, 2, "easeIn",function () {
            ad = undefined;
            r = 1
        }).run()
    });
    Q.on("#pager2", "click", function (S) {
        ad;
        r = 1;
        if (ad) {
            ad.stop();
            r++;
            r = r > 2 ? 2 : r
        }
        ad = g.Anim(c, {scrollTop: 1582 + 164 - 230 - 165 + 250}, 2, "easeIn",function () {
            ad = undefined;
            r = 1
        }).run()
    });
    Q.on("#pager3", "click", function (S) {
        ad;
        r = 1;
        if (ad) {
            ad.stop();
            r++;
            r = r > 2 ? 2 : r
        }
        ad = g.Anim(c, {scrollTop: 3572 + 164 - 230 - 165 + 900}, 2, "easeIn",function () {
            ad = undefined;
            r = 1
        }).run()
    });
    Q.on("#pager4", "click", function (S) {
        ad;
        r = 1;
        if (ad) {
            ad.stop();
            r++;
            r = r > 2 ? 2 : r
        }
        ad = g.Anim(c, {scrollTop: 6168 + 164 - 230 - 165 + 800}, 2, "easeIn",function () {
            ad = undefined;
            r = 1
        }).run()
    });
    Q.on("#pager5", "click", function (S) {
        ad;
        r = 1;
        if (ad) {
            ad.stop();
            r++;
            r = r > 2 ? 2 : r
        }
        ad = g.Anim(c, {scrollTop: 8588 + 164 - 230 - 165 + 980}, 2, "easeIn",function () {
            ad = undefined;
            r = 1
        }).run()
    });
    Q.on("#J_share", "click", function (S) {
        S.preventDefault();
        SNS.ui("share", {comment: "\u627e\u5230\u5c5e\u4e8e\u81ea\u5df1\u7684\u504f\u597d\uff0c\u5c3d\u5728#\u6dd8\u5b9d\u504f\u597d\u5730\u56fe#\uff1a360.taobao.com", linkurl: "http://360.taobao.com/myprofile.htm", pic: "http://img02.taobaocdn.com/tps/i2/T1dlXjFhheXXXo8e3K-859-859.png", title: "", client_id: "177361", callback: {render: function () {
        }}})
    });
    Q.on("#J_share", "mouseenter mouseleave", function (S) {
        if (S.type == "mouseenter") {
            F.css("#to_friend", "background", "url(http://img01.taobaocdn.com/tps/i1/T1MIO1XshaXXXa78nI-400-200.png) 0 0");
            F.attr("#to_friend", {cursor: "pointer"})
        } else {
            F.css("#to_friend", "background", "url(http://img01.taobaocdn.com/tps/i1/T1MIO1XshaXXXa78nI-400-200.png) -193px 0");
            F.removeAttr("#to_friend", "cursor")
        }
    });
    Q.on("#J_return", "click", function (S) {
        ad;
        r = 1;
        S.preventDefault();
        if (ad) {
            ad.stop();
            r++;
            r = r > 2 ? 2 : r
        }
        ad = g.Anim(c, {scrollTop: 0}, 2, "easeIn",function () {
            ad = undefined;
            r = 1
        }).run()
    });
    Q.on("#J_return", "mouseenter mouseleave", function (S) {
        if (S.type == "mouseenter") {
            F.css("#to_top", "background", "url(http://img01.taobaocdn.com/tps/i1/T1MIO1XshaXXXa78nI-400-200.png) 0 -112px");
            F.attr("#to_top", {cursor: "pointer"})
        } else {
            F.css("#to_top", "background", "url(http://img01.taobaocdn.com/tps/i1/T1MIO1XshaXXXa78nI-400-200.png) -196px -112px");
            F.removeAttr("#to_top", "cursor")
        }
    });
    Q.on("#mouse_icon", "click", function (S) {
        S.preventDefault();
        Q.fire("#pager2", "click")
    });
    Q.on("#scroll_link", "click", function (S) {
        S.preventDefault();
        Q.fire("#pager2", "click")
    });
    Q.on("input", "focusin focusout", function (S) {
        if (S.type == "focusin") {
            F.hide("label");
            F.hide("s.len")
        } else {
            if (F.val(S.currentTarget) == "") {
                F.show("label");
                F.show("s.len")
            }
        }
    });
    Q.on("#J_select_menu", "mouseenter mouseleave", function (S) {
        if (S.type == "mouseenter") {
            F.addClass(S.currentTarget, "hover")
        } else {
            F.removeClass(S.currentTarget, "hover")
        }
    });
    Q.on("#J_select", "click", function (S) {
        S.preventDefault();
        F.addClass("#J_select_menu", "hover")
    });
    Q.on("#J_other", "click", function (S) {
        S.preventDefault();
        var ae;
        ae = F.text(S.currentTarget);
        F.text(S.currentTarget, F.text("#J_select"));
        F.text("#J_select", ae);
        F.removeClass("#J_select_menu", "hover")
    });
    function b(S) {
        if (!S) {
            return
        }
        var af = "hold_" + (new Date).getTime(), ae = window[af] = new Image;
        ae.onload = ae.onerror = function () {
            window[af] = null
        };
        ae.src = S;
        ae = null
    }

    function w(ae, af) {
        if (ae) {
            var S = "http://log.mmstat.com/" + ae + "?t=" + (new Date).getTime() + "&q=" + af;
            b(S)
        }
    }

    function e(ae, af) {
        if (ae) {
            var S = "http://log.mmstat.com/" + ae + "?t=" + (new Date).getTime() + "&type=" + af;
            b(S)
        }
    }

    Q.on(".J_Item_Input_Btn", "click", function (S) {
        var ae = F.val("#search-input");
        w("tbgltjph.2.3", ae)
    });
    Q.on(".tui-360", "click", function (S) {
        S.preventDefault();
        location.href = "http://360.taobao.com/index.htm"
    });
    Q.on(".tui-360", "mousedown", function (S) {
        var ae = "index2360";
        e("tbgltjph.2.5", ae)
    });
    d;
    Q.on(window, "resize", function () {
        ab = F.viewportHeight(window);
        G = 11946 + 164 - ab + 109
    });
    var k = I;
    var J = k("#content");
    J.start();
    Q.on("#J_start_banner", "click", function (S) {
        S.halt();
        location.reload()
    });
    Q.on("#J_Intro_Exit", "click", function (S) {
        S.halt();
        J.exit()
    });
    function o(S) {
        var af = S.offsetTop;
        var ae = S.offsetParent;
        while (ae !== null) {
            af += ae.offsetTop;
            ae = ae.offsetParent
        }
        return af
    }
})();