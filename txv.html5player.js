/*! TenVideoPlayer_V2 - v2.0.0 - 2014-02-18 09:41:10
 * Copyright (c) 2014
 * Powered by Tencent-Video Web Front End Team 
 */
!function (a, b) {
    a.html5lang = {errMsg: {"default": "\u89c6\u9891\u6682\u65f6\u4e0d\u63d0\u4f9b\u64ad\u653e", 0: "\u5f53\u524d\u89c6\u9891\u6587\u4ef6\u65e0\u6cd5\u64ad\u653e", 64: "\u6821\u9a8c\u89c6\u9891\u4ed8\u8d39\u4fe1\u606f\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", 80: "\u6839\u636e\u60a8\u5f53\u524d\u7684IP\u5730\u5740\uff0c\u8be5\u5730\u533a\u6682\u4e0d\u63d0\u4f9b\u64ad\u653e", 83: {main: "\u89c6\u9891\u4ed8\u8d39\u9650\u5236", "-2": "\u60a8\u53ef\u80fd\u672a\u767b\u5f55\u6216\u767b\u5f55\u8d85\u65f6", "-1": "\u89c6\u9891\u72b6\u6001\u975e\u6cd5"}, 500: {main: "\u83b7\u53d6\u670d\u52a1\u5668\u6570\u636e\u5931\u8d25", 1: "getinfo failed", 2: "getkey failed"}}, getErrMsg: function (c, d) {
        if (isNaN(c))return"";
        if (c in a.html5lang.errMsg) {
            var e = a.html5lang.errMsg[c];
            if (b.isString(e))return e;
            if (b.isPlainObject(e))return[e.main, d in e ? "," + e[d] : ""].join("")
        }
        return a.html5lang.errMsg["default"]
    }, definition: {mp4: "\u9ad8\u6e05", msd: "\u6d41\u7545"}, srtLang: {50001: {srclang: "zh-cn", desc: "\u7b80\u4f53\u4e2d\u6587"}, 50002: {srclang: "zh-cn", desc: "\u7b80\u4f53\u4e2d\u6587"}, 50003: {srclang: "zh-tw", desc: "\u7e41\u4f53\u4e2d\u6587"}, 50004: {srclang: "en", desc: "\u82f1\u6587"}, 50005: {srclang: "zh-cn,en", desc: "\u7b80\u4f53\u4e2d\u6587&\u82f1\u6587"}, 50006: {srclang: "zh-tw,en", desc: "\u7e41\u4f53\u4e2d\u6587&\u82f1\u6587"}}, getDefiName: function (b) {
        return b in a.html5lang.definition ? a.html5lang.definition[b] : ""
    }, getSrtName: function (b) {
        return b in a.html5lang.srtLang ? a.html5lang.srtLang[b].desc : ""
    }}
}(tvp, tvp.$), tvp.html5skin = {defaultError: function () {
    return['<div class="tvp_container">', '	<div class="tvp_overlay_warning tvp_show" id="$ERROR-TIPS-INNER$">', '		<div class="tvp_overlay_content">', '			<i class="tvp_ico_hint"></i><span class="tvp_text">$ERROR-MSG$ $ERROR-DETAIL$</span>', "		</div>", "	</div>", "</div>"].join("")
}()}, function (a, b) {
    a.BaseHtml5 = function () {
        this.protectedFn = {}, this.h5EvtAdapter = {}, this.eventList = this.eventList.concat(["html5error"]), this.html5AttrList = {autoplay: "autoplay", "x-webkit-airplay": "isHtml5UseAirPlay"}, this.$videomod = null
    }, a.BaseHtml5.fn = a.BaseHtml5.prototype = new a.BasePlayer, b.extend(a.BaseHtml5.fn, {getPlayer: function () {
        return this.videoTag
    }, getPlayerType: function () {
        return"html5"
    }, createVideoHtml: function () {
        this.playerid = this.config.playerid, this.playerid || (this.playerid = "tenvideo_video_player_" + a.BaseHtml5.maxId++);
        var c = ['<video id="', this.playerid, '" width="100%" height="100%" '].join("");
        this.config.isHtml5UseUI && (b.os.iphone || b.os.ipod) && this.config.isIOSVideoOffset && (c += 'style="position:absolute;top:-200%"');
        for (var d in this.html5AttrList) {
            c += " ";
            var e = this.html5AttrList[d], f = "";
            if ("" == e)f = ""; else {
                if (!(e in this.config))continue;
                f = this.config[e]
            }
            f !== !1 && "disabled" != f && 0 !== f && (c += d, "autoplay" != d || 1 != f ? "" != f && (c += ["=", f].join("")) : c += '="autoplay"')
        }
        this.isUseControl && (c += " controls ");
        var g = this.curVideo.getPoster();
        return b.isString(g) && g.length > 0 && -1 == b.inArray("posterlayer", this.config.html5VodUIFeature) && (c += " poster='" + g + "'"), c += "></video>"
    }, write: function (c) {
        var d = null;
        if ("object" == b.type(c) && 1 == c.nodeType ? (d = c, this.$mod = b(c), this.modId = this.$mod.attr("id") || "") : (d = a.$.getByID(c), this.modId = c, this.$mod = b("#" + c)), d) {
            var e = this.createVideoHtml(), f = "mod_" + this.playerid;
            d.innerHTML = '<div id="' + f + '">' + e + "</div>", this.videomod = b.getByID(f), this.$videomod = b(this.videomod), this.$videomod.width(b.formatSize(this.config.width)).height(b.formatSize(this.config.height)), this.videoTag = b.getByID(this.playerid), this.$video = b(this.videoTag), this.registerMonitor(), this.bindEventAdapt()
        }
    }, resize: function (a, c) {
        this.$videomod.width(b.formatSize(a)).height(b.formatSize(c))
    }, showError: function (c, d, e) {
        var f = this;
        setTimeout(function () {
            var g = f.getCBEvent("showError");
            if (b.isFunction(g) && g != f.showError)g.call(f, c, d, e); else if (b.isFunction(f.config.showError))f.config.showError.call(f, c, d, e); else {
                var h = a.html5skin.defaultError, i = f.playerid + "_errtips_inner";
                d = d || "", h = h.replace("$ERROR-TIPS-INNER$", i).replace("$ERROR-MSG$", e || a.html5lang.getErrMsg(c, d) || "\u64ad\u653e\u89c6\u9891\u51fa\u9519").replace("$ERROR-DETAIL$", d ? "\u9519\u8bef\u7801:" + c + "(" + d + ")" : "");
                var j = b(f.videomod), k = b(h).appendTo(j).show();
                j.html(""), k.appendTo(j)
            }
        }, 250), this.callCBEvent("onerror", c, d)
    }, isUseH5UIFeature: function (a) {
        return b.inArray(a, this.config.html5VodUIFeature) >= 0
    }, isForbiddenH5UIFeature: function (a) {
        return b.inArray(a, this.config.html5ForbiddenUIFeature) >= 0
    }, callProtectFn: function (a) {
        b.isFunction(this.protectedFn[a]) && this.protectedFn[a].call(this)
    }, registerMonitor: function () {
        b.isFunction(this.buildmonitor) && this.buildmonitor.call(this)
    }, bindEventAdapt: function () {
        var a = ["-empty", "-abort", "-loadstart", "-can-play", "-can-play-through", "-loaded-data", "-loaded-metadata", "-abort", "-error", "-pause", "-paused", "-waiting", "-stalled", "-suspend", "-play", "-volume-change", "-playing", "-seeked", "-seeking", "-duration-change", "-progress", "-rate-change", "-timeupdate", "-ended"], c = this;
        b.each(a, function (a, d) {
            var e = "on" + b.camelCase(d), f = c.h5EvtAdapter[e];
            b.isFunction(f) && c.$video.on(d.replace(/-/g, ""), function (a) {
                var d = c.h5EvtAdapter[e];
                b.isFunction(d) && d.call(c, this, a)
            })
        })
    }}), a.BaseHtml5.maxId = 0
}(tvp, tvp.$), function (a, b) {
    function c() {
        return b.os.android && !i && !b.os.HTC && !b.os.VIVO
    }

    function d(b) {
        var c = b.currentTime, d = 0, e = !1, f = null;
        i = !0, b.pause(), b.play(), b.addEventListener("playing", function () {
            clearTimeout(f), f = setTimeout(g, 320)
        }, !1);
        var g = function () {
            a.debug("cb"), b.currentTime != c || e ? e = !0 : (d++, b.play(), d % 10 == 0 && b.currentTime == c && (b.load(), b.play()), f = setTimeout(g, 1e3))
        };
        f = setTimeout(g, 1e3)
    }

    function e(c, d) {
        $me = this, this.videoTag = null, this.$video = null, this.config.width = a.$.filterXSS(c), this.config.height = a.$.filterXSS(d), this.protectedFn = {}, this.isUseControl = !0, b.extend(this.h5EvtAdapter, {onEnded: function () {
            this.$video.trigger("tvp:player:ended"), this.callCBEvent("onended", g);
            var c = "", d = this.curVideo.getVidList().split("|"), e = b.inArray(g, d);
            if (e < d.length - 1 && (c = d[e + 1]), "" != c)return this.play(c), void 0;
            this.callCBEvent("onallended"), this.$video.trigger("tvp:player:allended"), this.config.isHtml5ShowPosterOnEnd && this.setPoster();
            var f = this.callCBEvent("ongetnext", g, this.curVideo);
            f && f instanceof a.VideoInfo && this.play(f)
        }, onError: function (b, c) {
            if (c.target.currentSrc.indexOf(".m3u8") > 0)return a.debug("play hls error,reload play mp4..."), a.report({cmd: 3525, vid: this.curVideo.lastQueryVid, ver: a.ver.replace(/\$/g, ""), str4: navigator.userAgent, url: window != top ? document.referrer : document.location.href, str2: a.filename || "unknown"}), this.play(this.curVideo.lastQueryVid, this.config.autoplay, !1), void 0;
            var d = -1;
            c.target && c.target.error && (d = c.target.error.code), 4 == d && this.showError(0, d)
        }, onPlaying: function () {
            this.callCBEvent("onplaying", g, this.curVideo)
        }})
    }

    var f = !1, g = "", h = null, i = !1;
    e.fn = e.prototype = new a.BaseHtml5, b.extend(e.prototype, {registerPlugins: function () {
        var c = this, d = [];
        b.each(d, function (d, e) {
            try {
                var f = "build" + e;
                b.isFunction(c[f]) && c[f](c)
            } catch (g) {
                a.debug("[registerPlugins]:" + g.message)
            }
        })
    }, write: function (e) {
        a.BaseHtml5.prototype.write.call(this, e), this.registerPlugins(), this.callProtectFn("onwrite"), this.play(this.curVideo, this.config.autoplay);
        var f = this;
        this.$video.one("timeupdate", function () {
            c() && d(f.videoTag)
        }), b.os.android && b.browser.WeChat && this.$video.one("click", function () {
            this.load()
        })
    }}), b.extend(e.prototype, {pause: function () {
        this.videoTag.pause()
    }, getCurVid: function () {
        return"" == g ? this.curVideo instanceof a.VideoInfo ? this.curVideo.getVid() : "" : g
    }, play: function (c, d, e) {
        function h(e) {
            e = !!e, i.$video.trigger("tvp:video:ajaxstart", c instanceof a.VideoInfo ? c.getVid() : c, e);
            var j = e ? i.curVideo.getHLS : i.curVideo.getMP4Url;
            j.call(i.curVideo, c).done(function (a) {
                i.isGetingInfo = !1, i.$video.trigger("tvp:video:ajaxsuc", a), i.videoTag.preload = navigator.platform.indexOf("Win") > -1 ? "none" : "auto", !b.browser.WeChat && "setAttribute"in i.videoTag ? i.videoTag.setAttribute("src", a) : i.videoTag.src = a, i.$video.trigger("tvp:video:src"), f || (f = !0, i.callCBEvent("oninited")), i.callCBEvent("onplay", i.curVideo.lastQueryVid, i.curVideo), d && (i.videoTag.load(), i.videoTag.play());
                var c = i.curVideo.getTagStart() || i.curVideo.getHistoryStart() || 0;
                c > 0 && i.seek(c)
            }).fail(function (b, c) {
                return e ? (a.debug("get hls url fail,reload mp4..."), h(!1), void 0) : (f || (f = !0, i.callCBEvent("oninited")), i.$video.trigger("tvp:video:ajaxerror"), i.$video.trigger("tvp:video:error", b, c), i.showError(b, c), i.isGetingInfo = !1, void 0)
            }).always(function () {
                g = i.curVideo.lastQueryVid
            })
        }

        var i = this, j = !1;
        if (b.isUndefined(d) && (d = !0), b.isUndefined(e) && (e = this.config.isHtml5UseHLS), b.isUndefined(c))return i.videoTag.pause(), i.videoTag.load(), i.videoTag.play(), void 0;
        if (c instanceof a.VideoInfo) {
            if (j = c.getVid() != g && "" != g, i.setCurVideo(c), j && (i.callCBEvent("onchange", i.curVideo.getFullVid()), this.$video.trigger("tvp:player:videochange"), b.os.iphone))try {
                i.videoTag.pause(), i.videoTag.play()
            } catch (k) {
            }
            c.setPid(b.createGUID()), g = i.curVideo.getFullVid()
        }
        i.config.isHtml5ShowPosterOnChange && i.setPoster(), i.isGetingInfo = !0;
        try {
            i.videoTag.pause()
        } catch (k) {
        }
        var l = !1;
        "auto" === e ? a.common.isUseHLS() ? a.h5Helper.loadIsUseHLS({vid: g}).done(function (a) {
            l = 3 == a
        }).fail(function () {
            l = !1
        }).always(function () {
            h.call(i, l)
        }) : (l = !1, h.call(i, l)) : (l = e, h.call(i, l))
    }, seek: function (a) {
        if (!isNaN(a)) {
            a = Math.min(a, this.getDuration() - 5), a = Math.max(a, 0);
            var b = this, c = null;
            c && (clearTimeout(c), c = null);
            var d = this.videoTag.seekable;
            1 == d.length && a < d.end(0) ? this.seekTo(a) : c = setTimeout(function () {
                b.seek(a)
            }, 100)
        }
    }, seekTo: function (a) {
        var b = this;
        try {
            this.videoTag.currentTime = a, this.videoTag.paused && this.videoTag.play()
        } catch (c) {
            this.$video.one("canplay", function () {
                b.videoTag.currentTime = a, b.videoTag.paused && b.videoTag.play()
            })
        }
    }, getCurTime: function () {
        return this.videoTag.currentTime
    }, getPlaytime: function () {
        return this.getCurTime()
    }, setPlaytime: function (a) {
        this.seek(a)
    }, checkIsPlayingLoop: function (a) {
        a = a || 0;
        var b = this;
        this.playinglooptimer && clearTimeout(this.playinglooptimer), 0 === this.videoTag.currentTime && 30 >= a && (this.videoTag.load(), this.videoTag.play(), this.playinglooptimer = setTimeout(function () {
            b.checkIsPlayingLoop(++a)
        }, 1e3))
    }, setPoster: function () {
        var a = this.curVideo.getPoster();
        b.isString(a) && a.length > 0 ? this.videoTag.poster = a : this.hidePoster()
    }, hidePoster: function () {
        this.videoTag.removeAttribute("poster")
    }, getDuration: function () {
        var a = this.curVideo.getDuration();
        return!isNaN(a) && a > 0 ? a : this.videoTag.duration
    }, checkPause: function () {
        var a = [], b = this;
        h = setInterval(function () {
            b.videoTag.paused || (a.push(b.videoTag.currentTime), a.length >= 2 && (0 == Math.abs(a[0] - a[1]) ? (h && clearInterval(h), a = [], b.videoTag.load(), b.videoTag.play()) : h && clearInterval(h), a = []))
        }, 500)
    }}), a.Html5Tiny = e
}(tvp, tvp.$), function (a, b) {
    b.extend(a.BaseHtml5.fn, {enterFullScreen: function () {
        var a = this, b = this.$mod[0], c = 0;
        if (b.webkitRequestFullScreen)return b.webkitRequestFullScreen(), void 0;
        if (this.videoTag.webkitSupportsFullscreen)if (this.videoTag.readyState >= 1)this.videoTag.webkitEnterFullscreen(); else {
            if (++c >= 30)return;
            setTimeout(function () {
                a.enterFullScreen()
            }, 200)
        }
    }})
}(tvp, tvp.$), function (a, b) {
    b.extend(a.Html5Tiny.fn, {swtichDefinition: function (a) {
        if (this.curVideo.getFormat() != a) {
            this.pause();
            var b = this.getCurTime(), c = this, d = null;
            this.curVideo.setFormat(a), this.$video.one("canplay canplaythrough", function () {
                c.isDefinitionSwitching && (setTimeout(function () {
                    c.seek(b)
                }, 500), d = setInterval(function () {
                    c.videoTag.currentTime >= b && (clearInterval(d), d = null, c.isDefinitionSwitching = !1)
                }, 50))
            }), this.isDefinitionSwitching = !0, this.play(this.curVideo)
        }
    }})
}(tvp, tvp.$), function (a, b) {
    function c() {
        this.start = a.$.now(), this.end = 0
    }

    function d(d, e) {
        this.vid = d || "", this.player = e, this.rid = e.curVideo.getRid() || b.createGUID(), this.pid = e.curVideo.getPid() || b.createGUID(), this.reportTimer = {};
        var f = b.isFunction(e.getPlayerType) ? e.getPlayerType().toUpperCase() : "", g = "http://rcgi.video.qq.com/report/play?", h = this.getplatform(), i = ["TenPlayer", f, "V2.0"].join(""), j = {version: i, vid: this.vid, rid: this.rid, pid: this.pid, url: window != top ? document.referrer : document.location.href, platform: h, ptag: b.cookie.get("ptag"), pfversion: b.os.version};
        this.getStepName = function (a) {
            return"report_" + a
        }, this.addStep = function (a) {
            this.reportTimer[this.getStepName(a)] = new c
        }, this.delStep = function (a) {
            delete this.reportTimer[this.getStepName(a)]
        }, this.report = function (c, d, f) {
            var h = [], i = {}, k = {}, l = g;
            if (c) {
                b.extend(k, j), "object" == typeof f && b.extend(k, f);
                try {
                    i.vt = e.curVideo.data.vl.vi[0].ul.ui[0].vt
                } catch (m) {
                    i.vt = 0
                }
                i.vurl = e.curVideo.url, i.bt = parseInt(e.getDuration(), 10), b.extend(k, i), k.step = c, k.ctime = b.getISOTimeFormat(), k.val = d;
                for (var n in k) {
                    var o = k[n];
                    isNaN(o) && (o = encodeURIComponent("" + o)), h.push(n + "=" + o)
                }
                l += h.join("&"), a.report(l)
            }
        }, this.reportStep = function (b, d) {
            if (!(this.reportTimer[this.getStepName(b)]instanceof c))return a.debug("no timer " + b), void 0;
            var e = this.reportTimer[this.getStepName(b)].getTimelong();
            isNaN(e) || 0 >= e || e > 9e6 || (this.report(b, e, d), this.delStep(b))
        }
    }

    c.prototype = {getTimelong: function () {
        if (this.end = a.$.now(), this.end <= 0 || this.start <= 0)return 0;
        var b = this.end - this.start;
        return 0 >= b ? 0 : b
    }, getSeconds: function () {
        return parseInt(this.getTimelong() / 1e3, 10)
    }}, d.fn = d.prototype = {getBusinessId: function () {
        if (b.browser.WeChat)return 6;
        if (b.browser.MQQClient)return 17;
        var a = "";
        if (document.location.href.indexOf("http://v.qq.com/iframe/") >= 0 && window != top) {
            var c = document.referrer;
            if ("" != c) {
                var d = document.createElement("a");
                d.href = c, a = d.hostname, d = null, delete d
            }
        }
        "" == a && (a = document.location.hostname || document.location.host);
        var e = [
            {r: /(\w+\.)?weixin\.qq\.com$/i, v: 6},
            {r: /^(v|film)\.qq\.com$/i, v: 1},
            {r: /^news\.qq\.com$/i, v: 2},
            {r: /(\w+\.)?qzone\.qq\.com$/i, v: 3},
            {r: /(\w+\.)?t\.qq\.com$/i, v: 5},
            {r: /^3g\.v\.qq\.com$/i, v: 8},
            {r: /^m\.v\.qq\.com$/i, v: 10}
        ];
        a = a.toLowerCase();
        for (var f = 0, g = e.length; g > f; f++) {
            var h = e[f];
            if (h.r.test(a))return h.v
        }
        return 7
    }, getDeviceId: function () {
        var a = b.os, c = navigator.userAgent;
        return a.ipad ? 1 : a.windows ? /Touch/i.test(c) ? 8 : /Phone/i.test(c) ? 7 : 2 : a.android ? a.tablet ? 5 : 3 : a.iphone ? 4 : a.Mac ? 9 : 10
    }, getplatform: function () {
        var a = this.getBusinessId(), b = this.getDeviceId();
        return 1e4 * a + 100 * b + 1
    }}, a.H5Monitor = d
}(tvp, tvp.$), function (a, b) {
    b.extend(a.Html5Tiny.fn, {buildmonitor: function () {
        var b = this, c = null, d = 0, e = !1;
        this.$video.on("tvp:video:ajaxstart",function (d, f, g) {
            e = g, c = null, c = new a.H5Monitor(f, b), c.addStep(e ? 1009 : 1011)
        }).on("tvp:video:ajaxsuc",function () {
            c.reportStep(e ? 1009 : 1011, {val1: 1, val2: 0})
        }).on("tvp:video:src",function () {
            d = 0, c.report(4, 1), c.addStep(6), c.addStep(30), b.$video.one("canplay",function () {
                c.reportStep(30, {val1: 0, val2: 2})
            }).one("error",function () {
                c.reportStep(30, {val1: 1, val2: 2}), c.report(5, 0, {val1: 3})
            }).one("playing", function () {
                c.reportStep(6, {val1: 1}), c.addStep(5), b.$video.one("tvp:player:ended",function () {
                    c.reportStep(5, {val1: 1})
                }).one("tvp:player:videochange", function () {
                    c.reportStep(5, {val1: 2})
                })
            })
        }).on("waiting", function () {
            1 != ++d && (b.isDefinitionSwitching || b.isTouching || (c.addStep(31), b.$video.one("timeupdate", f)))
        });
        var f = function () {
            var a = c.reportTimer[c.getStepName(31)], d = 0;
            return a ? (d = a.getTimelong(), c.report(31, Math.min(1e4, d), {val1: d > 1e4 ? 1 : 0, val2: 2, "ptime ": b.videoTag.currentTime}), b.$video.off("timeupdate", f), void 0) : (b.$video.off("timeupdate", f), void 0)
        }
    }})
}(tvp, tvp.$), function (a, b) {
    function c(c, d) {
        this.isUseControl = !1, this.config.width = a.$.filterXSS(c), this.config.height = a.$.filterXSS(d), this.control = null, this.$UILayer = null;
        var e = this;
        b.extend(this.protectedFn, {onwrite: function () {
            var c = a.html5skin.noSVGClassName;
            b.isString(c) && c.length > 0 && !a.common.isSupportSVG() && this.videomod.classList.add(c), this.control = new a.Html5UI(e), this.control.init(), this.$UILayer = this.control.$UILayer
        }})
    }

    c.fn = c.prototype = new a.Html5Tiny, b.extend(c.prototype, {createVideoHtml: function () {
        var b = a.Html5Tiny.prototype.createVideoHtml.call(this), c = a.html5skin.getHtml(this.config);
        return c.replace("$VIDEO$", b)
    }, hideControl: function () {
        this.control.hide()
    }, showControl: function () {
        this.control.show()
    }}), a.Html5Player = c
}(tvp, tvp.$), function (a) {
    function b(a) {
        return"tagName"in a ? a : a.parentNode
    }

    function c(a, b, c, d) {
        var e = Math.abs(a - b), f = Math.abs(c - d);
        return e >= f ? a - b > 0 ? "Left" : "Right" : c - d > 0 ? "Up" : "Down"
    }

    function d() {
        j = null, k.last && (k.el.trigger("longTap"), k = {})
    }

    function e() {
        j && clearTimeout(j), j = null
    }

    function f() {
        g && clearTimeout(g), h && clearTimeout(h), i && clearTimeout(i), j && clearTimeout(j), g = h = i = j = null, k = {}
    }

    if (!(a.browser.WeChat && a.browser.getNumVersion() < 5 || a.os.windows && a.browser.ie || a.isFunction(a.fn.tap))) {
        var g, h, i, j, k = {}, l = 750;
        a(document).ready(function () {
            var m, n;
            a(document.body).bind("touchstart",function (c) {
                c.originalEvent && (c = c.originalEvent), m = Date.now(), n = m - (k.last || m), k.el = a(b(c.touches[0].target)), g && clearTimeout(g), k.x1 = c.touches[0].pageX, k.y1 = c.touches[0].pageY, n > 0 && 250 >= n && (k.isDoubleTap = !0), k.last = m, j = setTimeout(d, l)
            }).bind("touchmove",function (a) {
                a.originalEvent && (a = a.originalEvent), e(), k.x2 = a.touches[0].pageX, k.y2 = a.touches[0].pageY
            }).bind("touchend",function (b) {
                b.originalEvent && (b = b.originalEvent), e(), k.x2 && Math.abs(k.x1 - k.x2) > 30 || k.y2 && Math.abs(k.y1 - k.y2) > 30 ? i = setTimeout(function () {
                    k.el && "function" == typeof k.el.trigger && (k.el.trigger("swipe"), k.el.trigger("swipe" + c(k.x1, k.x2, k.y1, k.y2)), k = {})
                }, 0) : "last"in k && (h = setTimeout(function () {
                    if (k.el && "function" == typeof k.el.trigger) {
                        var b = a.Event("tap");
                        b.cancelTouch = f, k.el.trigger(b), k.isDoubleTap ? (k.el.trigger("doubleTap"), k = {}) : g = setTimeout(function () {
                            g = null, k.el && k.el.trigger("singleTap"), k = {}
                        }, 250)
                    }
                }, 0))
            }).bind("touchcancel", f), a(window).bind("scroll", f)
        }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function (b) {
            a.fn[b] = function (a) {
                return this.bind(b, a)
            }
        })
    }
}(tvp.$), function (a) {
    a.extend(tvp.html5skin, {html: function () {
        return['<div class="tvp_container tvp_controls_hide">', "	<% if(!!feature.title) {%>", '		<div class="tvp_titles">', '			<strong class="tvp_title"><span></span></strong>', "		</div>", "	<% } %>", '	<div class="tvp_video">', "$VIDEO$", "</div>", "	<% if(!!feature.controlbar) {%>", '	<div class="tvp_controls">', "		<% if(!!feature.progress) {%>", '		<div class="tvp_time_rail">', "			<% if(!!feature.timepanel) {%>", '			<span class="tvp_time_panel_current">00:00</span>', "			<% } %>", '			<span class="tvp_time_total" >', '				<span class="tvp_time_loaded" ></span>', '				<span class="tvp_time_current"><span class="tvp_time_handle"></span></span>', "			</span>", "			<% if(!!feature.timepanel) {%>", '			<span class="tvp_time_panel_total">00:00</span>', "			<% } %>", "		</div>", "		<% } %>", '		<span class="tvp_time_handel_hint" style="display:none"></span>', "		<% if(!!feature.playpause) {%>", '		<div class="tvp_button tvp_playpause_button tvp_play">', '			<button type="button" title="\u64ad\u653e/\u6682\u505c"><span class="tvp_btn_value">\u64ad\u653e</span></button>', "		</div>", "		<% } %>", "		<% if(!!feature.promotion) {%>", '		<div class="tvp_promotion" style="display:none;">', '			<a href="https://itunes.apple.com/cn/app/id407925512?mt=8" target="_blank">\u5b89\u88c5\u817e\u8baf\u89c6\u9891iPad\u5ba2\u6237\u7aef &gt;&gt;</a>', "		</div>", "		<% } %>", "		<% if(!!feature.fullscreen) {%>", '		<div class="tvp_button tvp_fullscreen_button tvp_fullscreen">', '			<button type="button" title="\u5207\u6362\u5168\u5c4f"><span class="tvp_btn_value">\u5168\u5c4f</span></button>', "		</div>", "		<% } %>", "		<% if(!!feature.definition) {%>", '		<div class="tvp_button tvp_definition _tvp_definition_" style="display:none">', '			<div class="tvp_definition_button"><span>\u6e05\u6670\u5ea6</span></div>', '			<div class="tvp_definition_list"></div>', "		</div>", "		<% } %>", "		<% if(!!feature.track) {%>", "		<% } %>", "	</div>", "	<% } %>", "	<% if(!!feature.overlay) {%>", '	<div class="tvp_overlay_loading tvp_none" style="z-index:5">', '		<span class="tvp_icon_loading"></span>', "	</div>", '	<div class="tvp_overlay_play" style="z-index:5;top:45%">', '		<span class="tvp_button_play"></span>', "	</div>", "	<% } %>", "	<% if(!!feature.bigben) {%>", '	<div class="tvp_overlay_bigben">', '		<div class="tvp_overlay_content">', '			<i class="tvp_ico_ff_rw tvp_ico_ff"></i><span class="tvp_text tvp_overlay_bigben_text">0:03:12</span>', '			<span class="tvp_time_total_small"><span class="tvp_time_current_small"></span></span>', "		</div>", "	</div>", "	<% } %>", "	<% if(!!feature.posterlayer) {%>", '	<div class="tvp_overlay_poster" style="display:none;">', '		<img class="tvp_poster_img"/>', "	</div>", "	<% } %>", "	<% if(!!feature.tips) {%>", '	<div class="tvp_overlay_tips tvp_none">', '		<div class="tvp_overlay_content">', '			<span class="tvp_text"></span> ', "		</div>", "	</div>", "	<% } %>", "</div>"].join("")
    }(), definitionList: function () {
        return["<ul>", "	<% for(var p in data.list) { %><% if(data.curv!=p){ %>", '	<li data-fmt="<%=p%>">', "		<span><%=data.list[p]%></span>", "	</li>", "	<% } }%>", "</ul>"].join("")
    }(), noSVGClassName: "tvp_no_svg", elements: {title: {main: ".tvp_titles", text: ".tvp_title span"}, layer: ".tvp_container", control: ".tvp_controls", play: ".tvp_playpause_button", overlay: {play: ".tvp_overlay_play", loading: ".tvp_overlay_loading"}, progress: {main: ".tvp_time_rail", cur: ".tvp_time_current", loaded: ".tvp_time_loaded", total: ".tvp_time_total", handle: ".tvp_time_handle", tips: ".tvp_time_float"}, fullscreen: ".tvp_fullscreen_button", timePanel: {cur: ".tvp_time_panel_current", total: ".tvp_time_panel_total"}, bigben: {main: ".tvp_overlay_bigben", desc: ".tvp_overlay_bigben_text", ffrw: ".tvp_ico_ff_rw", bar: ".tvp_time_current_small"}, definition: {main: "._tvp_definition_", button: "._tvp_definition_ .tvp_definition_button > span", list: "._tvp_definition_ .tvp_definition_list"}, track: {main: "._tvp_track_", button: "._tvp_track_ .tvp_definition_button > span", list: "._tvp_track_ .tvp_definition_list"}, posterlayer: {main: ".tvp_overlay_poster", img: ".tvp_poster_img"}, tips: {main: ".tvp_overlay_tips", desc: " .tvp_overlay_tips .tvp_text"}, promotion: {main: ".tvp_promotion", link: ".tvp_promotion >a"}}, getHtml: function (a) {
        var b = tvp.$.tmpl(tvp.html5skin.html), c = {};
        return tvp.$.each(a.type == tvp.PLAYER_DEFINE.LIVE ? a.html5LiveUIFeature : a.html5VodUIFeature, function (a, b) {
            c[b] = !0
        }), tvp.$.each(a.html5ForbiddenUIFeature, function (a, b) {
            c[b] = !1
        }), b({feature: c})
    }})
}(tvp.$), function (a, b) {
    var c;
    a.Html5UI = function (a) {
        this.player = a, this.videoTag = a.getPlayer(), this.$video = a.$video, this.$mod = a.$mod, this.$UILayer = null, this.$control = null, this.feature = a.config.html5VodUIFeature, c = this, this.elements = {}, this.constvars = {progressWidth: 0}
    }, a.Html5UI.fn = a.Html5UI.prototype = {getCurVideo: function () {
        return this.player.getCurVideo()
    }, init: function () {
        this.initDom(), this.controlReady()
    }, initDom: function () {
        this.$UILayer = this.$mod.find(a.html5skin.elements.layer), this.$control = this.$UILayer.find(a.html5skin.elements.control)
    }, controlReady: function () {
        function a(a) {
            try {
                var d = "build" + a;
                b.isFunction(c[d]) && c[d](c.player, c.$video, c.$control, c.$UILayer)
            } catch (e) {
            }
        }

        var c = this;
        b.each(this.feature, function (d, e) {
            c.player.isForbiddenH5UIFeature(e) || (e in c.player.config.html5FeatureExtJS ? b.ajax({url: c.player.config.html5FeatureExtJS[e] + "?v=" + (new Date).valueOf(), dataType: "script", success: function () {
                a(e)
            }}) : a(e))
        }), this.player.isUseH5UIFeature("controlbar") && (this.player.config.isHtml5ControlAlwaysShow || (this.$video.on(c.getClickName(), function (a) {
            c.isHidden() ? (c.show(), c.beginHide(5e3)) : c.hide(), a.preventDefault(), a.stopPropagation()
        }), this.hideControlTimer = 0, this.$video.on("play",function () {
            c.beginHide(3e3)
        }).on("pause paused",function () {
            c.beginHide(800)
        }).one("timeupdate", function () {
            c.show(), c.beginHide(3e3)
        })))
    }, beginHide: function (a) {
        var b = this;
        a = a || 5e3, this.stopHide(), this.hideControlTimer = setTimeout(function () {
            b.hide()
        }, a)
    }, stopHide: function () {
        this.hideControlTimer && (clearTimeout(this.hideControlTimer), this.hideControlTimer = 0)
    }, hide: function () {
        this.$UILayer.addClass("tvp_controls_hide"), this.$control.trigger("tvp:control:hide")
    }, show: function () {
        this.hideControlTimer && (clearTimeout(this.hideControlTimer), this.hideControlTimer = 0), this.$UILayer.removeClass("tvp_controls_hide"), this.$control.trigger("tvp:control:show")
    }, isHidden: function () {
        return this.$UILayer.hasClass("tvp_controls_hide")
    }, getDuration: function () {
        return this.player.getDuration()
    }, getClickName: function () {
        return b.os.hasTouch ? "tap" : "click"
    }}
}(tvp, tvp.$), function (a, b) {
    b.extend(a.Html5UI.fn, {buildoverlay: function (c, d, e, f) {
        function g() {
            clearTimeout(m), k.loading.show(), k.play.hide()
        }

        function h() {
            m = setTimeout(function () {
                k.loading.hide(), k.play.show()
            }, 500)
        }

        function i() {
            clearTimeout(m), k.loading.hide(), k.play.hide()
        }

        var j = d[0], k = {}, l = this, m = null, n = ((b.os.iphone || b.os.ipod) && b.os.version >= "6", !1);
        b.each(a.html5skin.elements.overlay, function (a, b) {
            k[a] = f.find(b)
        }), k.loading.hide(), d.on("playing seeked", i).on("pause paused",function () {
            !c.config.isHtml5ShowPlayBtnOnPause || l.isTouching || c.isGetingInfo || c.isDefinitionSwitching || h()
        }).on("seeking waiting", g);
        var o = function (a) {
            k.play.off("click" == a.type ? "touchend" : "click", o), n || (n = !0, j.load()), j.play()
        };
        k.play.on("click", o), k.play.on("touchend", o)
    }})
}(tvp, tvp.$), function (a, b) {
    b.extend(a.Html5UI.fn, {buildtips: function (c, d, e, f) {
        function g(a, c) {
            b.isUndefined(c) && (c = 5), h.main.addClass("tvp_show"), h.desc.text(a), 0 != c && setTimeout(function () {
                h.main.removeClass("tvp_show"), h.desc.text("")
            }, 1e3 * c)
        }

        var h = {};
        b.each(a.html5skin.elements.tips, function (a, b) {
            h[a] = f.find(b)
        }), b.extend(a.Html5Player.fn, {showTips: g})
    }})
}(tvp, tvp.$), function (a, b) {
    b.extend(a.Html5UI.fn, {buildtitle: function (c, d, e, f) {
        var g = {};
        b.each(a.html5skin.elements.title, function (a, b) {
            g[a] = f.find(b)
        }), d.on("tvp:video:ajaxsuc", function () {
            g.text.text(c.curVideo.getTitle())
        })
    }})
}(tvp, tvp.$), function (a, b) {
    b.extend(a.Html5UI.fn, {buildplaypause: function (c, d, e, f) {
        var g = f.find(a.html5skin.elements.play), h = d[0], i = this;
        g.on(b.os.hasTouch ? "touchend" : "click", function () {
            h.paused ? h.play() : h.pause()
        }), d.on("paused pause",function () {
            i.isTouching || g.addClass("tvp_play").removeClass("tvp_pause")
        }).on("play playing", function () {
            g.addClass("tvp_pause").removeClass("tvp_play")
        })
    }})
}(tvp, tvp.$), function (a, b) {
    b.extend(a.Html5UI.fn, {buildtimepanel: function (c, d, e) {
        var f = {};
        b.each(a.html5skin.elements.timePanel, function (a, b) {
            f[a] = e.find(b)
        }), b.isUndefined(f.total) || 0 == f.total.length || d.on("durationchange tvp:video:src", function () {
            f.total.text(b.formatSeconds(c.getDuration()))
        }), b.isUndefined(f.cur) || 0 == f.cur.length || d.on("timeupdate",function () {
            f.cur.text(b.formatSeconds(this.currentTime))
        }).on("tvp:player:videochange", function () {
            f.cur.text(b.formatSeconds(0))
        }), e.bind("tvp:progress:touchstart", function (a, c) {
            f.cur.text(b.formatSeconds(c.time))
        })
    }})
}(tvp, tvp.$), function (a, b) {
    b.extend(a.Html5UI.fn, {buildprogress: function (c, d, e) {
        function f(a) {
            if (!c.getDuration())return null;
            var b = a.pageX, d = i.total.offset().left, f = 0, g = i.total.width(), h = 0, j = 0;
            d > b ? b = d : b > g + d && (b = g + d), j = b - d, f = j / g, h = c.getDuration() * f;
            var k = {pos: j, precent: f, time: h};
            return e.trigger("tvp:progress:touchstart", k), k
        }

        var g = this, h = d[0], i = {};
        this.isTouching = !1, b.each(a.html5skin.elements.progress, function (a, b) {
            i[a] = e.find(b)
        }), i.total.bind("touchstart", function (a) {
            if (a = a.originalEvent ? a.originalEvent : a, 1 == a.targetTouches.length && !g.isTouching) {
                g.isTouching = !0, a.preventDefault(), h.pause();
                var b = f(a.targetTouches[0]);
                !!b && g.setProgress(b.pos, i), c.isDefinitionSwitching = !1, i.total.bind("touchmove",function (a) {
                    if (a = a.originalEvent ? a.originalEvent : a, 1 == a.targetTouches.length) {
                        var b = f(a.targetTouches[0]);
                        !!b && g.setProgress(b.pos, i), a.preventDefault()
                    }
                }).bind("touchend", function (a) {
                    if (a = a.originalEvent ? a.originalEvent : a, g.isTouching = !1, 1 == a.changedTouches.length) {
                        var b = f(a.changedTouches[0]);
                        !!b && g.setProgress(b.pos, i), c.seek(b.time), a.preventDefault(), a.stopPropagation(), i.total.unbind("touchmove"), i.total.unbind("touchend"), e.trigger("tvp:progress:touchend")
                    }
                })
            }
        }), d.bind("timeupdate", function (a) {
            if (a = a.originalEvent ? a.originalEvent : a, !g.isHidden() && !c.isDefinitionSwitching && 4 == a.target.readyState) {
                var b = h.currentTime / c.getDuration() * i.total.width();
                g.setProgress(b, i)
            }
        }), d.bind("progress",function () {
            if (!g.isHidden() && !c.isDefinitionSwitching) {
                var a = 0;
                h.buffered && h.buffered.length > 0 && h.buffered.end && c.getDuration() && (a = h.buffered.end(0) / c.getDuration() * i.total.width(), i.loaded.css("width", a))
            }
        }).bind("tvp:video:src", function () {
            c.isDefinitionSwitching || g.resetProgress()
        }), e.bind("tvp:control:show", function () {
            var a = h.currentTime / c.getDuration() * i.total.width();
            g.setProgress(a, i)
        }), b.extend(this, {resetProgress: function () {
            i.cur.css("width", "0px"), i.handle.css("left", "0px"), i.loaded.css("width", "0px")
        }})
    }, setProgress: function (a, b) {
        var c = b.total.width(), d = b.handle.width(), e = a - d / 2;
        e = Math.min(e, c - d), e = Math.max(e, 0), b.cur.css("width", a + "px"), b.handle.css("left", e + "px")
    }})
}(tvp, tvp.$), function (a, b) {
    var c = null;
    b.extend(a.Html5Player, {isFullScreen: !1}), b.extend(a.Html5UI.fn, {buildfullscreen: function (d, e, f, g) {
        var h = (e[0], this);
        c = f.find(a.html5skin.elements.fullscreen), c.on("click", function () {
            h.checkIsFullScreen() ? h.cancelFullScreen() : h.enterFullScreen()
        }), "onwebkitfullscreenchange"in g[0] ? g.bind("webkitfullscreenchange", function () {
            document.webkitIsFullScreen || h.cancelFullScreen()
        }) : e.bind("webkitendfullscreen ", function () {
            h.cancelFullScreen()
        }), b(document).on("keydown", function (a) {
            document.webkitIsFullScreen && 27 == a.keyCode && h.cancelFullScreen()
        }), b.extend(a.Html5Player.fn, {enterFullScreen: function () {
            h.enterFullScreen()
        }, cancelFullScreen: function () {
            h.cancelFullScreen()
        }})
    }, checkIsFullScreen: function () {
        return c.hasClass("tvp_unfullscreen")
    }, enterFullScreen: function () {
        this.player.config.isHtml5UseFakeFullScreen ? this.enterFakeFullScreen() : this.enterRealFullScreen(), this.player.isFullScreen = !0, this.player.callCBEvent("onfullscreen", !0)
    }, cancelFullScreen: function () {
        this.player.config.isHtml5UseFakeFullScreen ? this.cancelFakeFullScreen() : this.cancelRealFullScreen(), this.player.isFullScreen = !1, this.player.callCBEvent("onfullscreen", !1)
    }, enterRealFullScreen: function () {
        var b = this, c = b.player, d = c.$UILayer, e = b.$video, f = this.$control.find(a.html5skin.elements.fullscreen), g = d[0], h = e[0];
        g.webkitRequestFullScreen ? (g.webkitRequestFullScreen(), d.css("width", screen.width).css("height", screen.height), e.css("width", screen.width).css("height", screen.height)) : h.webkitSupportsFullscreen && h.webkitEnterFullscreen(), f.removeClass("tvp_fullscreen").addClass("tvp_unfullscreen")
    }, cancelRealFullScreen: function () {
        var b = this, c = b.player, d = c.$UILayer, e = b.$video, f = this.$control.find(a.html5skin.elements.fullscreen);
        f.removeClass("tvp_unfullscreen").addClass("tvp_fullscreen"), document.webkitCancelFullScreen && (document.webkitCancelFullScreen(), e.css("width", c.config.width).css("height", c.config.height), d.css("width", c.config.width).css("height", c.config.height))
    }, enterFakeFullScreen: function () {
        b("body").addClass("fullscreen"), this.$video.addClass("fullscreen"), this.player.$mod.addClass("fullscreen"), this.player.$videomod.addClass("fullscreen"), c.removeClass("tvp_fullscreen"), c.addClass("tvp_unfullscreen")
    }, cancelFakeFullScreen: function () {
        b("body").removeClass("fullscreen"), this.$video.removeClass("fullscreen"), this.player.$mod.removeClass("fullscreen"), this.player.$videomod.removeClass("fullscreen"), c.removeClass("tvp_unfullscreen"), c.addClass("tvp_fullscreen")
    }})
}(tvp, tvp.$), function (a, b) {
    b.extend(a.Html5UI.fn, {buildbigben: function (c, d, e, f) {
        var g = {}, h = (d[0], 0);
        b.each(a.html5skin.elements.bigben, function (a, b) {
            g[a] = f.find(b)
        }), e.on("tvp:progress:touchstart",function (a, d) {
            g.main.show(), g.desc.text(b.formatSeconds(d.time)), g.bar.width(d.time / c.getDuration() * 100 + "%"), d.time < h ? g.ffrw.addClass("tvp_ico_rw") : g.ffrw.removeClass("tvp_ico_rw"), h = d.time
        }).on("tvp:progress:touchend", function () {
            g.main.hide(), g.desc.text("")
        })
    }})
}(tvp, tvp.$), function (a, b) {
    b.extend(a.Html5UI.fn, {builddefinition: function (c, d, e) {
        var f = {}, g = c.curVideo;
        b.each(a.html5skin.elements.definition, function (a, b) {
            f[a] = e.find(b)
        }), d.bind("tvp:video:src", function () {
            b.when(g.getFormatList()).then(function (c) {
                if (1 == c.list.length)return f.main.hide(), f.list.hide(), f.button.hide(), void 0;
                var d = b.isFunction(g.getPlayFormat) ? g.getPlayFormat() : g.getFormat(), e = a.html5lang.getDefiName(d), h = {}, i = "";
                b.each(c.list, function (b, c) {
                    h[c] = a.html5lang.getDefiName(c)
                });
                var j = {curv: d, curn: e, list: h}, k = a.$.tmpl(a.html5skin.definitionList);
                i = k({data: j}), f.list.html(i), e && (f.button.text(e), "none" == f.button.css("display") && f.button.show()), f.main.show()
            })
        }), f.button.click(function () {
            f.list.toggle()
        }), e.on("tvp:progress:touchstart", function () {
            "none" != f.list.css("display") && f.list.hide()
        });
        var h = this;
        f.list.undelegate("li", "touchend"), f.list.delegate("li", "touchend", function () {
            var a = b(this), c = a.data("fmt");
            c && (h.player.swtichDefinition(c), f.list.hide())
        })
    }})
}(tvp, tvp.$), function (a, b) {
    b.extend(a.Html5UI.fn, {buildposterlayer: function (c, d, e, f) {
        var g = f.find(a.html5skin.elements.posterlayer.main), h = g.find(a.html5skin.elements.posterlayer.img), i = this, j = function (a) {
            if (a = a || c.curVideo.getPoster() || c.config.pic, 0 == a.length) {
                var d = h.attr("src");
                "" != d && (a = d)
            }
            b.isString(a) && a.length > 0 ? (a = b.filterXSS(a), h.attr("src", a), k()) : l()
        }, k = function () {
            g.show(), d.one("play playing", l)
        }, l = function () {
            g.hide()
        };
        c.config.isHtml5ShowPosterOnStart && j(), b.extend(this, {setPoster: j, showPoster: k, hidePoster: l}), b.extend(c, {setPoster: j}), (b.os.iphone || b.os.ipod) && c.config.isiPhoneShowPosterOnPause && d.on("pause paused", function () {
            i.setPoster()
        })
    }})
}(tvp, tvp.$), function (a, b) {
    b.extend(a.Html5UI.fn, {buildshadow: function (a, c, d, e) {
        var f = b('<div class="tvp_shadow"></div>').appendTo(e), g = this;
        a.config.isHtml5ControlAlwaysShow || f.bind(g.getClickName(), function (a) {
            g.isHidden() ? (g.show(), g.beginHide(8e3)) : g.hide(), a.preventDefault(), a.stopPropagation()
        })
    }})
}(tvp, tvp.$), function (a, b) {
    b.extend(a.Html5UI.fn, {buildpromotion: function (c, d, e, f) {
        function g(c) {
            var d = {cmd: 3526, val: c, itype: function () {
                return b.os.iPad ? 2 : b.os.iPhone || b.os.ipod ? 1 : b.os.android ? 3 : 4
            }(), url: window != top ? document.referrer : document.location.href};
            a.report(d)
        }

        if (b.os.ipad) {
            var h = {};
            b.each(a.html5skin.elements.promotion, function (a, b) {
                h[a] = f.find(b)
            }), h.link.bind("click", function () {
                g(2)
            }), b.isString(c.config.iPadPromotionText) && c.config.iPadPromotionText.length > 0 && h.link.text(c.config.iPadPromotionText), h.main.show(), g(1)
        }
    }})
}(tvp, tvp.$);
/*  |xGv00|98add024b4b26a2444a4a5cf80334a75 */