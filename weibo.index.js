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
STK.register("common.channel.topTip", function (a) {
    var b = ["refresh", "readed", "currentGroup", "unread", "apps", "dm", "dmConnected", "dmOpenIm", "logoClick"];
    return a.common.listener.define("common.channel.topTip", b)
});
STK.register("common.channel.feed", function (a) {
    var b = ["forward", "publish", "comment", "delete", "refresh", "reply", "feedTagUpdate", "feedTagMoreUpdate", "qfaceAdd", "qfaceCount"];
    return a.common.listener.define("common.channel.feed", b)
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
STK.register("kit.dom.simpleSearchInput", function (a) {
    return function (b, c) {
        c = a.parseParam({judge: function (a) {
            if (a.getAttribute("node-type") == "input_search")return!0
        }, className: "focused"}, c);
        var d = {};
        if (!a.isNode(b)) {
            d.destroy = a.funcEmpty;
            return d
        }
        a.kit.dom.smartInput(b, {notice: b.getAttribute("notice") || "", noticeClass: "input_default", maxLength: 40});
        var e = a.kit.dom.parentElementBy(b, document.body, c.judge);
        if (!a.isNode(e)) {
            d.destroy = a.funcEmpty;
            return d
        }
        var f = function () {
            a.addClassName(e, c.className)
        }, g = function () {
            a.removeClassName(e, c.className)
        };
        a.addEvent(b, "focus", f);
        a.addEvent(b, "blur", g);
        d.destroy = function () {
            a.removeEvent(b, "focus", f);
            a.removeEvent(b, "blur", g)
        };
        return d
    }
});
STK.register("common.feed.groupAndSearch.homeFeedDelegateEvent", function (a) {
    var b = a.kit.extra.language, c = b("#L{搜索关注人说的话}"), d = b("#L{查找作者、内容或标签}");
    return function (b, c, d) {
        var e = b, f = {}, g = c;
        d = d || {};
        var h = d.isBigPipe, i = e.search, j = e.keyword, k = e.simpleSearch, l = e.singleForm, m, n = function () {
            a.core.evt.preventDefault();
            return!1
        };
        a.addEvent(l, "submit", n);
        k && (m = a.kit.dom.simpleSearchInput(k));
        j && a.kit.dom.smartInput(j, {notice: j.getAttribute("notice") || "", currentClass: "S_line4", maxLength: 40});
        var o = function (b) {
            var c = a.sizzle('[action-type="simpleSearchBtn"]', l)[0];
            a.fireEvent(c, "click")
        };
        a.core.evt.hotKey.add(k, ["enter"], o);
        var p = function (b) {
            var c = a.core.evt.fixEvent(b);
            c = c.target;
            if (c.tagName.toLowerCase() == "a") {
                var d = c.getAttribute("action-type");
                d != "link" && a.core.evt.preventDefault()
            }
        };
        h && a.addEvent(e.cnt, "click", p);
        var q = a.core.evt.delegatedEvent(e.cnt);
        h && q.add("search_type", "click", function (a) {
            g.searchFilterChange.call(c, a.data.type);
            if (window.WBAD && window.WBAD.refresh) {
                var b = {rt: 2};
                window.WBAD.refresh(b)
            }
        });
        q.add("search_date", "click", function (a) {
            g.showCalendar.call(c, a.el, a.data.type);
            a.el.blur()
        });
        q.add("simpleSearchBtn", "click", function (a) {
            g.searchKeyword.call(c, h)
        });
        q.add("search_button", "click", function (a) {
            g.searchStart.call(c, h)
        });
        q.add("search_adv", "click", function (a) {
            g.advDisplayToggle.call(c, i, a.data.type)
        });
        if (h) {
            q.add("order_by_time", "click", function (a) {
                g.orderByTime.call(c, a.data)
            });
            q.add("order_by_activity", "click", function (a) {
                g.orderByActivity.call(c, a.data)
            })
        }
        q.add("order_by_smart", "click", function (a) {
            g.smartSort.call(c, a);
            if (window.WBAD && window.WBAD.refresh) {
                var b = {rt: 2};
                window.WBAD.refresh(b)
            }
        });
        q.add("smart_back_home", "click", function (a) {
            g.smartBackHome.call(c, a)
        });
        q.add("smartSortSelect", "click", function (a) {
            g.smartSortSelect.call(c, a);
            if (window.WBAD && window.WBAD.refresh) {
                var b = {rt: 2};
                window.WBAD.refresh(b)
            }
        });
        f.destroy = function () {
            a.removeEvent(l, "submit", n);
            k && m.destroy();
            h && a.removeEvent(e.cnt, "click", p);
            q.destroy();
            a.core.evt.hotKey.remove(k, ["enter"], o)
        };
        return f
    }
});
STK.register("common.feed.groupAndSearch.template.calendar", function (a) {
    var b = '<#et userlist data><div class="selector"><select node-type="month" class="month htc_select"><#if (data.hidePastMonth)><#if (!(data.start.year == data.showDate.year&& data.currDate.month>0))><option value="0" ${data.showDate.month==0?\'selected=""\':\'\'}>#L{一月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>1)||(data.end.year == data.showDate.year&& data.currDate.month<1)))><option value="1" ${data.showDate.month==1?\'selected=""\':\'\'}>#L{二月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>2)||(data.end.year == data.showDate.year&& data.currDate.month<2)))><option value="2" ${data.showDate.month==2?\'selected=""\':\'\'}>#L{三月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>3)||(data.end.year == data.showDate.year&& data.currDate.month<3)))><option value="3" ${data.showDate.month==3?\'selected=""\':\'\'}>#L{四月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>4)||(data.end.year == data.showDate.year&& data.currDate.month<4)))><option value="4" ${data.showDate.month==4?\'selected=""\':\'\'}>#L{五月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>5)||(data.end.year == data.showDate.year&& data.currDate.month<5)))><option value="5" ${data.showDate.month==5?\'selected=""\':\'\'}>#L{六月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>6)||(data.end.year == data.showDate.year&& data.currDate.month<6)))><option value="6" ${data.showDate.month==6?\'selected=""\':\'\'}>#L{七月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>7)||(data.end.year == data.showDate.year&& data.currDate.month<7)))><option value="7" ${data.showDate.month==7?\'selected=""\':\'\'}>#L{八月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>8)||(data.end.year == data.showDate.year&& data.currDate.month<8)))><option value="8" ${data.showDate.month==8?\'selected=""\':\'\'}>#L{九月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>9)||(data.end.year == data.showDate.year&& data.currDate.month<9)))><option value="9" ${data.showDate.month==9?\'selected=""\':\'\'}>#L{十月}</option></#if><#if (!((data.start.year == data.showDate.year&& data.currDate.month>10)||(data.end.year == data.showDate.year&& data.currDate.month<10)))><option value="10" ${data.showDate.month==10?\'selected=""\':\'\'}>#L{十一月}</option></#if><#if (!(data.end.year == data.showDate.year&& data.currDate.month<11))><option value="11" ${data.showDate.month==11?\'selected=""\':\'\'}>#L{十二月}</option></#if><#else><option value="0" ${data.showDate.month==0?\'selected=""\':\'\'}>#L{一月}</option><option value="1" ${data.showDate.month==1?\'selected=""\':\'\'}>#L{二月}</option><option value="2" ${data.showDate.month==2?\'selected=""\':\'\'}>#L{三月}</option><option value="3" ${data.showDate.month==3?\'selected=""\':\'\'}>#L{四月}</option><option value="4" ${data.showDate.month==4?\'selected=""\':\'\'}>#L{五月}</option><option value="5" ${data.showDate.month==5?\'selected=""\':\'\'}>#L{六月}</option><option value="6" ${data.showDate.month==6?\'selected=""\':\'\'}>#L{七月}</option><option value="7" ${data.showDate.month==7?\'selected=""\':\'\'}>#L{八月}</option><option value="8" ${data.showDate.month==8?\'selected=""\':\'\'}>#L{九月}</option><option value="9" ${data.showDate.month==9?\'selected=""\':\'\'}>#L{十月}</option><option value="10" ${data.showDate.month==10?\'selected=""\':\'\'}>#L{十一月}</option><option value="11" ${data.showDate.month==11?\'selected=""\':\'\'}>#L{十二月}</option></#if></select><select node-type="year" class="year htc_select"><#list data.years as year><option value="${year}"${(data.showDate.year==year)?\' selected=""\':""}>${year}</option></#list></select></div><ul class="weeks"><li>#L{日}</li><li>#L{一}</li><li>#L{二}</li><li>#L{三}</li><li>#L{四}</li><li>#L{五}</li><li>#L{六}</li></ul><ul class="days"><#list data.dates as list><li><#if (list!="")><#if ((data.start.year==data.showDate.year&&data.start.month==data.showDate.month&&(data.start.date<=list&&list<=data.start.max))||(data.start.year==data.showDate.year&&data.start.month<data.showDate.month)||(data.start.year<data.showDate.year&&data.showDate.year<data.end.year)||(data.showDate.year==data.end.year&&data.showDate.month<data.end.month)||(data.showDate.year==data.end.year&&data.showDate.month==data.end.month&&list<=data.end.date))><a action-type="date" href="#date" onclick="return false;" title="${data.showDate.year}-${data.showDate.month+1}-${list}"year="${data.showDate.year}" month="${data.showDate.month+1}" day="${list}"${(data.today.year==data.showDate.year&&data.today.month==data.showDate.month&&list==data.showDate.date)?\' class="day"\':\'\'}><strong>${list}</strong></a><#else>${list}</#if></#if></li></#list></ul>';
    return b
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
STK.register("kit.dom.firstChild", function (a) {
    var b = a.core.dom.next;
    return function (a) {
        var c = a.firstChild;
        c && c.nodeType != 1 && (c = b(c));
        return c
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
STK.register("kit.extra.parseURL", function (a) {
    return function () {
        return STK.historyM && STK.historyM.parseURL ? STK.historyM.parseURL() : a.core.str.parseURL(location.href)
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
STK.register("common.feed.groupAndSearch.filter.base", function (a) {
    function h(a, b) {
        if (a == null || b == null)return!0;
        a = (new Date(a.replace(/-/g, "/"))).getTime();
        b = (new Date(b.replace(/-/g, "/"))).getTime();
        return a <= b
    }

    function g(a) {
        this.nodes = a
    }

    var b = a.kit.extra.language, c = b('<ul class="tipscon tips_warn"><li class="icon"><span class="icon_warnS"></span></li><li class="txt">#L{开始日期不能小于结束日期}</li></ul>'), d = b('<ul class="tipscon tips_warn"><li class="icon"><span class="icon_warnS"></span></li><li class="txt">#L{请输入搜索关键字！}</li></ul>'), e = '<li tag_name="#{TAG_NAME}" node-type="feed_tag"><a class="tag" onclick="return false;" href="javascript:void(0);"><i url="?is_tag=1&tag_name=#{TAG_NAME}" action-data="tag_name=#{TAG_NAME}" action-type="feed_tag_active">#{TAG_NAME}</i><span class="S_txt1">(<i node-type="count">#{COUNT}</i>)</span><em><span action-data="del_tag=#{TAG_NAME}" action-type="feed_tag_del" class="icon_del_s"></span></em></a></li>', f = {TAG: {ITEM: b('<li tag_name="#{TAG_NAME}" action-type="feed_tag_hover" node-type="feed_tag"><a class="tag" onclick="return false;" href="javascript:void(0);"><i url="?is_tag=1&tag_name=#{TAG_NAME}" action-data="tag_name=#{TAG_NAME}" action-type="feed_tag_active" title="#L{查看这个标签下的微博}">#{TAG_NAME}</i><span class="S_txt2">(<i node-type="count">#{COUNT}</i>)</span><em><span class="W_ico12 icon_edit" action-data="old_tag=#{TAG_NAME}" action-type="feed_tag_edit" title="#L{修改这个标签}"></span><span class="W_ico12 icon_close" action-data="del_tag=#{TAG_NAME}" action-type="feed_tag_del" title="#L{删除这个标签}"></span></em></a></li>'), EDIT: b('<span><input node-type="tag_edit_form" type="text" class="W_input" value="#{TAG_NAME}"><a class="W_btn_d" action-type="tag_edit_submit" action-data="old_tag=#{TAG_NAME}" href="javascript:void(0);" onclick="return false"><span>#L{保存}</span></a><a class="W_btn_b" action-type="tag_edit_cancel" action-data="old_tag=#{TAG_NAME}" href="javascript:void(0);" onclick="return false"><span>#L{取消}</span></a></span>')}};
    g.prototype.initFilter = function (a) {
        this.reset();
        this.defineCustEvent && this.defineCustEvent();
        this.init && this.init(a)
    };
    g.prototype.TEMP = {ALL: b("#L{全部}"), ORIGINAL: b("#L{原创}"), PICTURE: b("#L{图片}"), VIDEO: b("#L{视频}"), MUSIC: b("#L{音乐}"), TAGS: b("#L{标签}"), MOOD: b("#L{心情}")};
    g.prototype.defaultConfig = {gid: 0, isAllType: 0, is_ori: 0, is_forward: 0, is_pic: 0, is_video: 0, is_music: 0, is_tag: 0, is_mood: 0, is_text: 0, key_word: null, start_time: null, end_time: null, rank: null, mblogsort: null, stateNum: null};
    g.prototype.feed_tag_ismore = !1;
    g.prototype.searchStart = function () {
        this.isAdvSearched = !0;
        this.hasError != !0 && this.collectParameter(this.nodes.searchForm)
    };
    g.prototype.setSearchTypeUI = function (b) {
        b = b != null ? b : this.config.currentType;
        var c = a.kit.extra.language(this.feedType), d = a.core.util.easyTemplate(c), e = this.config.gid;
        e = e == null || e * 1 == 0 ? "" : "?gid=" + e;
        var f = a.kit.extra.parseURL();
        f = f.path;
        var g = e == "" ? "?" : "&", h = {list: [
            {id: 0, name: this.TEMP.ALL, url: "/" + f + e},
            {id: 1, name: this.TEMP.ORIGINAL, url: "/" + f + e + g + "is_ori=1"},
            {id: 2, name: this.TEMP.PICTURE, url: "/" + f + e + g + "is_pic=1"},
            {id: 3, name: this.TEMP.VIDEO, url: "/" + f + e + g + "is_video=1"},
            {id: 4, name: this.TEMP.MUSIC, url: "/" + f + e + g + "is_music=1"}
        ], count: 4, current: b * 1}, i = d(h);
        this.nodes.feedType.innerHTML = i
    };
    g.prototype.setAdvForm = function (b) {
        var c = a.sizzle("input[type=checkbox]", this.nodes.searchForm), d = c[0], e = c[3], f = c[4], g = c[5], h = c[1], i = c[2];
        switch (b * 1) {
            case 1:
                h.checked = !1;
                break;
            case 2:
                i.checked = !1;
                f.checked = !1;
                g.checked = !1;
                break;
            case 3:
                i.checked = !1;
                e.checked = !1;
                g.checked = !1;
                break;
            case 4:
                i.checked = !1;
                e.checked = !1;
                f.checked = !1
        }
    };
    g.prototype.hideAdvSearch = function () {
        var a = this.nodes.search, b = a.children || a.childNodes, c = b[0], d = b[1];
        c.style.display = "";
        d.style.display = "none"
    };
    g.prototype.collectParameter = function (c) {
        var e, f = {}, g = a.core.json.clone(this.config);
        delete g.currentType;
        delete g.isAllType;
        if (c != null) {
            e = a.core.util.htmlToJson(c);
            for (var h in e)if (h != "key_word")g[h] = e[h]; else {
                var i = a.hasby(this.defaultSearchTip, function (a, b) {
                    return a === e[h]
                });
                if (i.length != 0 || e[h] == "") {
                    this.nodes.advSearchErr.innerHTML = d;
                    return
                }
                g[h] = e[h];
                this.nodes.advSearchErr.innerHTML = ""
            }
            g.is_search = "1"
        } else this.nodes.advSearchErr.innerHTML = "";
        this.defaultCount != null && (g.count = this.defaultCount);
        for (h in g) {
            var j = g[h];
            j != null && j * 1 !== 0 && j !== "" && (f[h] = g[h])
        }
        f.start_time == b("#L{选择日期}") && delete f.start_time;
        f.end_time == b("#L{选择日期}") && delete f.end_time;
        var k = this.isGroupAll != null ? this.isGroupAll() : !1, l = this.isFilterAll();
        a.core.evt.custEvent.fire(this.custKeySearch, "search", ["search", f, {isGroupAll: k, isFilterAll: l}])
    };
    g.prototype.isFilterAll = function () {
        var a = !0;
        this.config != null && this.config.currentType != null && (a = this.config.currentType * 1 == 0 ? !0 : !1);
        return a
    };
    g.prototype.searchFilterChange = function (a) {
        var b = this.config.gid, c = this.config.key_word, d = this.config.profile_ftype;
        this.reset();
        this.config.gid = b;
        this.config.key_word = c;
        this.config.profile_ftype = d;
        switch (a) {
            case"0":
                this.config.isAllType = 1;
                break;
            case"1":
                this.config.is_ori = 1;
                break;
            case"2":
                this.config.is_pic = 1;
                break;
            case"3":
                this.config.is_video = 1;
                break;
            case"4":
                this.config.is_music = 1;
                break;
            case"5":
                this.config.is_tag = 1;
                break;
            case"6":
                this.config.is_mood = 1
        }
        this.config.currentType = a;
        this.setSearchTypeUI();
        this.collectParameter()
    };
    g.prototype.searchKeyword = function () {
        if (!this.nodes.keyword[0] || a.trim(this.nodes.keyword[0].value) != "") {
            var c = this.nodes.keyword[0].value, d = [b("#L{搜索我说的话}"), b("#L{搜索他说的话}"), b("#L{搜索她说的话}")], e;
            a.foreach(d, function (a) {
                if (a === c) {
                    e = 1;
                    return!1
                }
            });
            if (e)return;
            if (this.hasError != !0) {
                this.isAdvSearched = !0;
                this.collectParameter(this.nodes.singleForm)
            }
        }
    };
    g.prototype.showCalendar = function (d, e) {
        function j(a) {
            var b;
            e == "1" ? b = h(a, i.config.end_time) : b = h(i.config.start_time, a);
            e == "1" ? b && (i.config.start_time = a) : b && (i.config.end_time = a);
            i.nodes.advSearchErr.innerHTML = b ? "" : c;
            i.hasError = !b
        }

        var f = a.core.str.trim(d.value), g, i = this;
        e == "1" ? g = new a.common.feed.groupAndSearch.include.calendar(0, {source: d, callback: j}) : g = new a.common.feed.groupAndSearch.include.calendar(f, {source: d, callback: j});
        if (!d.addSupportDelete) {
            d.addSupportDelete = !0;
            d.name === "start_time" && a.addEvent(d, "keydown", function (c) {
                a.preventDefault(c);
                c = a.getEvent();
                var e = c.keyCode || c.which;
                if (e === 27 || e === 46 || e === 8)d.value = b("#L{选择日期}");
                i.nodes.advSearchErr && (i.nodes.advSearchErr.innerHTML = "")
            })
        }
    };
    var i = {orderByAll: "0", orderByBlog: "1", orderByActive: "2"};
    g.prototype.switchProfileTabs = function (b) {
        var c = a.sizzle('[node-type="fav_adv_item"]', this.nodes.feed_adv_tabs);
        a.foreach(c, function (b) {
            a.removeClassName(b, "current")
        });
        a.addClassName(b.el, "current")
    };
    g.prototype.orderByAll = function (b) {
        this.switchProfileTabs(b);
        a.setStyle(this.nodes.search_adv_rightbar, "display", "");
        a.setStyle(this.nodes.feed_nav_adv, "display", "");
        a.setStyle(this.nodes.activity_nav, "display", "");
        a.setStyle(this.nodes.search, "display", "none");
        this.config.profile_ftype = i.orderByAll;
        this.searchFilterChange.call(this, "0")
    };
    g.prototype.orderByBlog = function (b) {
        this.switchProfileTabs(b);
        a.setStyle(this.nodes.search_adv_rightbar, "display", "");
        a.setStyle(this.nodes.feed_nav_adv, "display", "");
        a.setStyle(this.nodes.activity_nav, "display", "none");
        a.setStyle(this.nodes.search, "display", "none");
        this.config.profile_ftype = i.orderByBlog;
        this.searchFilterChange.call(this, "0")
    };
    g.prototype.orderByActive = function (b) {
        this.switchProfileTabs(b);
        a.setStyle(this.nodes.search_adv_rightbar, "display", "none");
        a.setStyle(this.nodes.feed_nav_adv, "display", "none");
        a.setStyle(this.nodes.activity_nav, "display", "");
        a.setStyle(this.nodes.search, "display", "none");
        a.setStyle(this.nodes.search_adv_layers, "display", "none");
        this.reset();
        this.config.profile_ftype = i.orderByActive;
        this.collectParameter()
    };
    var j = function () {
        var b = Array.prototype.slice.apply(arguments);
        if (!a.core.arr.isArray(b[0]))throw"The diff function needs an array as first parameter";
        var c = a.core.arr.unique(b.shift());
        if (c.length == 0)return[];
        b = b.length == 1 ? b[0] : a.core.arr.unique(Array.prototype.concat.apply([], b));
        return a.core.arr.clear(a.core.arr.foreach(c, function (c) {
            return a.core.arr.inArray(c, b) ? null : c
        }))
    };
    g.prototype.tagGetUnit = function (b) {
        var c = a.sizzle('[tag_name="' + b + '"]', this.nodes.feed_tag_list);
        return c && c[0] ? c[0] : null
    };
    g.prototype.tagGetFirst = function () {
        var b = a.sizzle('[node-type="feed_tag"]', this.nodes.feed_tag_list);
        return b && b[0] ? b[0] : null
    };
    g.prototype.tagActive = function (b) {
        var c = b.data.tag_name;
        this.tagClearCurrent();
        this.reset();
        if (c) {
            this.config.tag_name = c;
            a.addClassName(b.el, "S_txt1")
        }
        this.config.is_tag = 1;
        this.collectParameter()
    };
    g.prototype.tagClearCurrent = function () {
        var b = a.sizzle("i.S_txt1", this.nodes.feed_tag_list);
        b.length > 0 && a.core.arr.foreach(b, function (b) {
            a.removeClassName(b, "S_txt1")
        })
    };
    g.prototype.tagAutoToggle = function () {
        this.config.is_tag == 1 ? this.tagShow() : this.tagHide()
    };
    g.prototype.tagAppend = function (b) {
        a.core.dom.insertHTML(a.sizzle("ul", this.nodes.feed_tag_list)[0], a.core.util.templet(f.TAG.ITEM, {TAG_NAME: b, COUNT: 1}))
    };
    g.prototype.tagUpdateCount = function (b, c) {
        if (!b)return!1;
        var d = this.tagGetUnit(b), e, f;
        if (d) {
            e = a.builder(d).list.count[0];
            f = c + parseInt(e.innerHTML);
            f < 0 && (f = 0);
            e.innerHTML = "" + f
        } else this.tagAppend(b)
    };
    g.prototype.tagUpdateChange = function (a) {
        var b = a.res ? a.res.split(" ") : [], c = a.now ? a.now.split(" ") : [], d = j(b, c), e = j(c, b);
        if (d.length > 0)for (var f in d)this.tagUpdateCount(d[f], -1);
        if (e.length > 0)for (var f in e)this.tagUpdateCount(e[f], 1)
    };
    g.prototype.tagListClose = function () {
        var b = this.nodes.feed_tag_list;
        if (!!a.isNode(b)) {
            a.setStyle(b, "display", "none");
            a.setStyle(this.nodes.feed_nav_adv, "display", "");
            this.searchFilterChange.call(this, "0")
        }
    };
    g.prototype.tagMoreUp = function (b) {
        this.feed_tag_ismore = !1;
        this.nodes.tag_container.scrollTop = 0;
        a.setStyle(this.nodes.tag_container, "height", "40px");
        a.setStyle(this.nodes.tag_container, "overflowY", "hidden");
        a.setStyle(this.nodes.tag_container, "overflow", "hidden");
        a.setStyle(this.nodes.more_tags_up, "display", "none");
        a.setStyle(this.nodes.more_tags_drop, "display", "");
        a.setStyle(this.nodes.feed_tag_pagebar, "display", "none")
    };
    g.prototype.tagMoreDrop = function (b) {
        this.feed_tag_ismore = !0;
        var c = a.core.dom.getSize(this.nodes.tag_show);
        if (c.height > 106) {
            a.setStyle(this.nodes.tag_container, "height", "106px");
            a.setStyle(this.nodes.tag_container, "overflowX", "hidden");
            a.setStyle(this.nodes.tag_container, "overflowY", "scroll");
            this.nodes.tag_container.scrollTop = "0px"
        } else a.setStyle(this.nodes.tag_container, "height", "");
        a.setStyle(this.nodes.more_tags_up, "display", "");
        a.setStyle(this.nodes.more_tags_drop, "display", "none");
        a.setStyle(this.nodes.feed_tag_pagebar, "display", "")
    };
    g.prototype.tagHide = function () {
        this.tagClearCurrent();
        this.nodes.feed_tag_list && a.setStyle(this.nodes.feed_tag_list, "display", "none")
    };
    g.prototype.tagShow = function () {
        a.setStyle(this.nodes.search_adv_layers, "display", "");
        var b = this.tagGetFirst();
        if (b) {
            a.addClassName(a.sizzle('[action-type="feed_tag_active"]', b)[0], "S_txt1");
            a.setStyle(this.nodes.feed_tag_list, "display", "");
            a.setStyle(this.nodes.feed_nav_adv, "display", "none")
        } else this.tagHide()
    };
    var k;
    g.prototype.tagEditFormShow = function (b) {
        this.tagEditFormHide(k);
        var c = this.tagGetUnit(b);
        c.setAttribute("isediting", "1");
        a.removeClassName(c, "S_bg1 S_line1 current");
        var d = a.kit.dom.firstChild(c);
        a.setStyle(d, "display", "none");
        var e = a.core.dom.next(d);
        if (!e)a.core.dom.insertHTML(c, a.core.util.templet(f.TAG.EDIT, {TAG_NAME: b}), "beforeend"); else {
            a.sizzle('input[node-type="tag_edit_form"]', e)[0].value = b;
            a.setStyle(e, "display", "")
        }
        k = b
    };
    g.prototype.tagEditFormHide = function (b) {
        var c = this.tagGetUnit(b);
        if (c) {
            c.setAttribute("isediting", "0");
            var d = a.kit.dom.firstChild(c);
            a.setStyle(d, "display", "");
            a.setStyle(a.core.dom.next(d), "display", "none")
        }
    };
    g.prototype.tagEditFormFocus = function () {
        var b = a.sizzle('[node-type="tag_edit_form"]', this.nodes.tag_show)[0];
        b && a.core.dom.selectText(b, {start: 0, len: b.value.length})
    };
    g.prototype.tagEditForm = function (a) {
        this.tagEditFormShow(a.data.old_tag)
    };
    g.prototype.tagEditFormCancel = function (a) {
        this.tagEditFormHide(a.data.old_tag)
    };
    g.prototype.tagEditSubmit = function (c) {
        var d = a.sizzle("input", c.el.parentNode)[0].value, e = c.data.old_tag, g = this.tagGetUnit(e), h = a.sizzle('[node-type="count"]', g)[0].innerHTML, i = a.core.dom.hasClassName(a.sizzle('[action-type="feed_tag_active"]', g)[0], "S_txt1"), j = this;
        if (d == e)this.tagEditFormCancel(c); else {
            var k = {old_tag: e, new_tag: d};
            a.common.trans.feed.getTrans("feedTagEdit", {onSuccess: function (b) {
                var c = a.kit.dom.parseDOM(a.builder(a.core.util.templet(f.TAG.ITEM, {TAG_NAME: b.data.tag, COUNT: h})).list);
                i && a.core.dom.addClassName(a.sizzle('[action-type="feed_tag_active"]', c.feed_tag)[0], "S_txt1");
                a.core.dom.replaceNode(c.feed_tag, g)
            }, onFail: function (c) {
                a.ui.alert(c.msg || b("#L{更新失败}"))
            }, onError: function (c) {
                a.ui.alert(c.msg || b("#L{更新失败}"))
            }}).request(k)
        }
    };
    g.prototype.tagDel = function (c) {
        var d = this, e = function () {
            var e = c.el, f = d;
            a.common.trans.feed.getTrans("feedTagDel", {onSuccess: function (b) {
                var c = a.kit.dom.parentElementBy(e, f.nodes.feed_tag_list, function (a) {
                    if (a.getAttribute("node-type") == "feed_tag")return!0
                });
                c.parentNode.removeChild(c);
                !f.tagGetFirst() && f.tagHide()
            }, onFail: function (c, d) {
                a.ui.alert(c.msg || b("#L{删除失败}"))
            }, onError: function (c, d) {
                a.ui.alert(c.msg || b("#L{删除失败}"))
            }}).request(a.common.getDiss(c.data))
        };
        a.ui.confirm(b("#L{你确定要删除这个微博标签吗？}"), {textSmall: b("#L{删除微博标签不会将对应的微博一起删除}"), OK: e})
    };
    g.prototype.tagPage = function (b) {
        var c = this;
        a.common.trans.feed.getTrans("feedTagListHtml", {onSuccess: function (b) {
            var d = a.core.dom.builder(b.data.html), e = d.list.feed_tag_pagebar, f = d.list.tag_show;
            c.nodes.feed_tag_pagebar.innerHTML = e && e[0] && e[0].innerHTML;
            c.nodes.tag_show.innerHTML = f && f[0] && f[0].innerHTML;
            c.feed_tag_ismore && c.tagMoreDrop()
        }, onFail: function (b, c) {
            a.ui.alert(b.msg)
        }, onError: function (b, c) {
            a.ui.alert(b.msg)
        }}).request(a.common.getDiss(b.data))
    };
    g.prototype.reset = function () {
    };
    g.prototype.destroy = function () {
    };
    g.prototype.refresh = function () {
    };
    return g
});
STK.register("common.feed.groupAndSearch.template.feedType", function () {
    var a = '<#et userlist data><#list data.list as list><li action-type="search_type" action-data="type=${list.id}" href="${list.url}" <#if (data.current==list.id)>class="t_itm current"<#else>class="t_itm"</#if>><a <#if (data.current==list.id)>class="t_lk S_txt1 S_bg2"<#else>class="t_lk"</#if> href="${list.url}">${list.name}</a></li></#list>';
    return a
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
STK.register("common.feed.groupAndSearch.template.closeFriendType", function () {
    var a = '<#et userlist data><#list data.list as list><li action-type="cf_tab_change" action-data="cftype=${list.id}"${data.current==list.id?\' class="current S_txt1"\':\'\'}><#if (data.current==list.id)><span>${list.name}</span><#else><a href="${list.url}">${list.name}</a></#if></li><#if (data.count!=list.id)><li class="W_vline">|</li></#if></#list>';
    return a
});
STK.register("common.feed.groupAndSearch.filter.homeFeed", function (a) {
    var b = a.kit.extra.parseURL(), c = a.kit.extra.language, d = a.core.util.easyTemplate, e = c("#L{搜索关注人说的话}"), f = c("#L{收起}"), g = c("#L{展开}"), h = c("#L{查找作者、内容或标签}"), i = c("#L{全部}"), j = c("#L{原创}"), k = c("#L{图片}"), l = c("#L{视频}"), m = c("#L{音乐}"), n = c('<a class="W_btn_round2" node-type="mblog_sort_link" title="#L{按由新到旧的微博发表时间排序}" href="javascript:void(0);"><span><i class="W_ico16 icon_bytime"></i>#L{时间排序}<em class="W_arrow"><em node-type="mblog_sort_arrow">◆</em></em></span></a>'), o = c('<a class="W_btn_round2" node-type="mblog_sort_link" title="#L{按你对微博感兴趣程度排序}" href="javascript:void(0);"><span><i class="W_ico16 icon_bypopular"></i>#L{智能排序}<em class="W_arrow"><em node-type="mblog_sort_arrow">◆</em></em></span></a>'), p = a.common.feed.groupAndSearch.filter.base;
    return function (c, f) {
        var g = new p(c, f), q, r = 0, s = 0;
        g.defineCustEvent = function () {
            this.custKeySearch = a.core.evt.custEvent.define(this, "search");
            this.custKeyNewFeed = a.core.evt.custEvent.define(this, "newFeed");
            this.custSmartSort = a.core.evt.custEvent.define(this, "smartSort");
            this.custChangeFeedType = a.core.evt.custEvent.define(this, "changeFeedType")
        };
        g.undefineCustEvt = function (b) {
            b ? a.core.evt.custEvent.undefine(this, b) : a.core.evt.custEvent.undefine(this)
        };
        g.hostDomain = b.path;
        g.defaultCount = 15;
        g.defaultSearchTip = [e, h];
        g.feedType = a.common.feed.groupAndSearch.template.feedType;
        g.init = function (a) {
            s = this.nodes.cnt ? this.nodes.cnt.getAttribute("mblogsorttype") ? this.nodes.cnt.getAttribute("mblogsorttype") : "0" : "0";
            var b = a.pageQuery;
            this.config = b;
            if (b != null && b.is_search == "1")this.isAdvSearched = !0; else if (b != null) {
                this.config.currentType = 0;
                b.is_ori && b.is_ori == "1" && (this.config.currentType = 1);
                b.is_pic && b.is_pic == "1" && (this.config.currentType = 2);
                b.is_video && b.is_video == "1" && (this.config.currentType = 3);
                b.is_music && b.is_music == "1" && (this.config.currentType = 4)
            }
        };
        g.newFeedNotify = function (b) {
            var c = b.count;
            !c || this.isAdvSearched != !0 && a.core.evt.custEvent.fire(this.custKeyNewFeed, "newFeed", [b])
        };
        g.advDisplayToggle = function (b, c) {
            b = b || this.nodes.search;
            c = c * 1;
            var d = a.domPrev(b);
            if (c == 0) {
                a.setStyle(this.nodes.feed_nav_adv, "display", "none");
                a.setStyle(this.nodes.search_adv_rightbar, "display", "none");
                a.setStyle(this.nodes.search, "display", "")
            } else {
                var e = a.kit.extra.parseURL().url;
                if (e.indexOf("ismiyou=1") == -1) {
                    a.setStyle(this.nodes.feed_nav_adv, "display", "");
                    a.setStyle(this.nodes.search_adv_rightbar, "display", "")
                }
                a.setStyle(this.nodes.search, "display", "none")
            }
        };
        g.advSearchToggle = function (a, b) {
            a = a || this.nodes.search;
            b = b * 1;
            var c, d, e;
            b == null && (b = this.isAdvSearched != null && this.isAdvSearched == !0 ? 0 : 1);
            c = this.config.gid;
            d = this.config.currentType;
            this.reset();
            this.config.gid = c;
            this.config.currentType = d;
            this.nodes.searchForm.reset();
            if (b == 0) {
                this.advDisplayToggle(null, 0);
                this.config.currentType > 0 && this.config.currentType < 5 && this.setAdvForm(this.config.currentType)
            } else if (b == 1) {
                this.advDisplayToggle(null, 1);
                if (this.isAdvSearched != null && this.isAdvSearched == !0 || this.config.currentType == null) {
                    this.searchFilterChange(0);
                    this.clearSimpleSearch()
                }
                this.isAdvSearched = null;
                return
            }
        };
        var t;
        g.clearSimpleSearch = function () {
            if (typeof t == "undefined") {
                var a = document.createElement("input");
                t = "placeholder"in a;
                a = null
            }
            t ? this.nodes.simpleSearch.value = "" : this.nodes.simpleSearch.value = h
        };
        g.searchStart = function () {
            this.isAdvSearched = !0;
            this.hasError != !0 && this.collectParameter(this.nodes.searchForm);
            this.setSmartUI(0);
            if (!this.nodes.keyword || a.trim(this.nodes.keyword.value) != "" && a.trim(this.nodes.simpleSearch.value) != e)if (window.WBAD && window.WBAD.refresh) {
                var b = {rt: 2};
                window.WBAD.refresh(b)
            }
        };
        g.searchKeyword = function () {
            if (!this.nodes.simpleSearch || a.trim(this.nodes.simpleSearch.value) != "" && a.trim(this.nodes.simpleSearch.value) != h) {
                if (this.hasError != !0) {
                    this.isAdvSearched = !0;
                    this.collectParameter(this.nodes.singleForm)
                }
                this.config.key_word = a.trim(this.nodes.simpleSearch.value);
                this.setSearchTypeUI();
                this.setSmartUI(0);
                if (window.WBAD && window.WBAD.refresh) {
                    var b = {rt: 2};
                    window.WBAD.refresh(b)
                }
            }
        };
        g.switchTabs = function (b) {
            var c = this.nodes.feed_type_tabs;
            if (!!a.isNode(c)) {
                var d = b + "_tab", e = a.sizzle("li.current", c);
                a.foreach(e, function (b) {
                    a.removeClassName(b, "current");
                    var c = a.builder(b).list;
                    c.bg && a.removeNode(c.bg[0])
                });
                var f = '<div class="W_tabarrow_big S_bg4" node-type="bg"></div>', g = a.builder(c).list;
                if (g[d]) {
                    var h = g[d][0];
                    a.addClassName(h, "current");
                    a.insertHTML(h, f, "beforeend")
                }
            }
        };
        g.orderByTime = function () {
            this.advDisplayToggle(null, 1);
            a.setStyle(this.nodes.activity_nav, "display", "none");
            a.setStyle(this.nodes.activity_help, "display", "none");
            var b = this.config.gid, c = this.config.ismiyou, d = this.config.whisper;
            this.reset();
            this.config.gid = b;
            this.config.ismiyou = c;
            this.config.whisper = d;
            this.setSearchTypeUI(0);
            var e = {count: 15, gid: b, ismiyou: c, whisper: d, isGroupAll: f}, f = this.isGroupAll() && "" + this.config.whisper != "1" && "" + this.config.ismiyou != "1";
            s != "1" || !f ? e.mblogsort = 2 : e.mblogsort = 1;
            a.core.evt.custEvent.fire(this.custKeySearch, "search", ["search", e, {isGroupAll: !0, isFilterAll: !0}]);
            s == "1" && f ? this.setSmartUI(1) : this.setSmartUI(0);
            this.switchTabs("feed_group");
            var g = this.getFeedType();
            a.core.evt.custEvent.fire(this.custChangeFeedType, "changeFeedType", [
                {feedType: g}
            ])
        };
        g.orderByActivity = function () {
            this.setSmartUI(0);
            a.setStyle(this.nodes.feed_nav_adv, "display", "none");
            a.setStyle(this.nodes.activity_nav, "display", "");
            a.setStyle(this.nodes.activity_help, "display", "");
            a.setStyle(this.nodes.search_adv_rightbar, "display", "none");
            a.setStyle(this.nodes.search, "display", "none");
            var b = this.config.gid, c = this.config.ismiyou, d = this.config.whisper;
            this.reset();
            this.config.gid = b;
            this.config.ismiyou = c;
            this.config.whisper = d;
            this.config.activity = 1;
            this.switchTabs("feed_activity");
            var e = this.isGroupAll() && "" + this.config.whisper != "1" && "" + this.config.ismiyou != "1", f = {count: 15, gid: b, ismiyou: c, whisper: d, isGroupAll: e, activity: 1};
            a.core.evt.custEvent.fire(this.custKeySearch, "search", ["search", f, {isGroupAll: !0, isFilterAll: !1}]);
            var g = this.getFeedType();
            a.core.evt.custEvent.fire(this.custChangeFeedType, "changeFeedType", [
                {feedType: g}
            ])
        };
        g.setGroupUI = function () {
        };
        g.setGroupLayerUI = function () {
        };
        g.setSearchTypeUI = function (b) {
            b = b != null ? b : this.config.currentType;
            var c = a.kit.extra.language(this.feedType), e = d(c), f = a.kit.extra.parseURL();
            f = "/" + f.path;
            var g, h;
            if (this.config.whisper == 1) {
                f += "?whisper=1";
                this.config.key_word != null && (f += "&key_word=" + this.config.key_word + "&is_search=1");
                h = "&"
            } else {
                g = this.config.gid;
                g = g == null || g * 1 == 0 ? "" : "?gid=" + g;
                h = g == "" ? "?" : "&";
                f += g;
                if (this.config.key_word != null) {
                    f += h + "key_word=" + encodeURIComponent(this.config.key_word) + "&is_search=1";
                    h = "&"
                }
            }
            var n = {list: [
                {id: 0, name: i, url: f, suda: "all"},
                {id: 1, name: j, url: f + h + "is_ori=1", suda: "org"},
                {id: 2, name: k, url: f + h + "is_pic=1", suda: "pic"},
                {id: 3, name: l, url: f + h + "is_video=1", suda: "video"},
                {id: 4, name: m, url: f + h + "is_music=1", suda: "music"}
            ], count: 4, current: b * 1}, o = e(n);
            this.nodes.feedType.innerHTML = o
        };
        g.searchFilterChange = function (a) {
            a != "0" && delete this.config.mblogsort;
            var b = this.config.gid, c = this.config.key_word, d = this.config.whisper, e = this.config.ismiyou, f = this.config.mblogsort;
            this.reset();
            this.config.gid = b;
            c != null && (this.config.is_search = 1);
            this.config.key_word = c;
            this.config.whisper = d;
            this.config.ismiyou = e;
            switch (a) {
                case"0":
                    this.config.isAllType = 1;
                    break;
                case"1":
                    this.config.is_ori = 1;
                    break;
                case"2":
                    this.config.is_pic = 1;
                    break;
                case"3":
                    this.config.is_video = 1;
                    break;
                case"4":
                    this.config.is_music = 1
            }
            this.config.currentType = a;
            this.setSearchTypeUI();
            var g = this.isGroupAll() && this.config.is_search != 1 && "" + this.config.whisper != "1" && "" + this.config.ismiyou != "1";
            f && g && (this.config.mblogsort = f);
            g && s == "1" && a == "0" && this.config.isAllType && this.config.isAllType == 1 ? this.setSmartUI(1) : this.setSmartUI(0);
            this.collectParameter()
        };
        g.isGroupAll = function () {
            var a = !0;
            this.config != null && this.config.gid != null && (a = this.config.gid ? !1 : !0);
            return a
        };
        g.reset = function () {
            this.config = {}
        };
        g.smartSort = function (b) {
            if (!b) {
                var c = a.sizzle("[action-type='order_by_smart']", this.nodes.smartSortMore)[0];
                b = {el: c, data: a.queryToJson(c.getAttribute("action-data"))}
            }
            var d = a.kit.extra.actionData(this.nodes.smartSortSelect);
            d.set("cur", b.data.cur);
            s = 1;
            delete this.config.gid;
            this.setSmartUI(1);
            this.reset();
            this.setSearchTypeUI(0);
            this.config.stateNum = r;
            r = 0;
            this.config.mblogsort = 1;
            this.collectParameter();
            a.core.evt.custEvent.fire(this.custSmartSort, "smartSort", ["nowIsSmartSort"])
        };
        g.setSmartUI = function (b) {
            var c = this.nodes.smartSortSelect, d = this.nodes.smartSortMore;
            c && (c.innerHTML = b ? o : n);
            d && (d.style.display = "none");
            var e = b ? "smart" : "time", f = a.kit.extra.actionData(this.nodes.smartSortSelect);
            f.set("cur", e)
        };
        g.smartBackHome = function (b) {
            var c = a.kit.extra.actionData(this.nodes.smartSortSelect);
            c.set("cur", b.data.cur);
            delete this.config.mblogsort;
            s = 0;
            this.config.mblogsort = 2;
            this.setSmartUI(0);
            this.searchFilterChange(0)
        };
        g.getIsSmartSort = function () {
            return s == "1"
        };
        g.smartSortSelect = function (b) {
            var c = this.nodes.smartSortMore, d = this.nodes.smartSortSelect, e = this;
            if (c && d) {
                var f = function (b) {
                    var c = a.sizzle("[node-type='mblog_sort_link']", e.nodes.cnt)[0];
                    !c || (b == "up" ? a.addClassName(c, "W_arrow_turn") : b == "down" && a.removeClassName(c, "W_arrow_turn"))
                }, g = c.style.display;
                if (g == "none") {
                    var h = b.data.cur, i = a.sizzle("[action-type='order_by_smart'],[action-type='smart_back_home']", c);
                    a.foreach(i, function (b) {
                        var c = a.queryToJson(b.getAttribute("action-data") || "");
                        c.cur == h ? a.setStyle(b, "display", "none") : a.setStyle(b, "display", "")
                    });
                    a.core.evt.custEvent.fire(this.custSmartSort, "smartSort", ["select"])
                }
                var j = function (b) {
                    var e = b ? a.core.evt.fixEvent(b).target : null;
                    if (e && !a.core.dom.contains(c, e) && !a.core.dom.contains(d, e)) {
                        a.core.dom.setStyle(c, "display", "none");
                        a.removeEvent(document.body, "click", j);
                        f("down")
                    }
                };
                if (g == "none") {
                    f("up");
                    a.core.dom.setStyle(c, "display", "");
                    a.addEvent(document.body, "click", j)
                } else {
                    f("down");
                    a.core.dom.setStyle(c, "display", "none");
                    a.removeEvent(document.body, "click", j)
                }
            }
        };
        g.getGroupInfo = function () {
            var a = this.isGroupAll();
            return a ? "" + this.config.whisper == "1" ? "whisper" : "" + this.config.ismiyou == "1" ? "ismiyou" : 0 : this.config.gid
        };
        g.getFeedType = function () {
            var a = "1" == "" + this.config.activity;
            return a ? "activity" : "mblog"
        };
        return g
    }
});
STK.register("common.feed.groupAndSearch.homeFeed", function (a) {
    return function (b, c) {
        if (b != null) {
            c = c || {};
            var d = c.isBigPipe, e = a.core.dom.builder(b);
            e.list = a.kit.dom.parseDOM(e.list);
            var f = e.list;
            f.cnt = e.box;
            var g = a.common.feed.groupAndSearch.filter.homeFeed(f);
            g.initFilter(c);
            var h = a.common.feed.groupAndSearch.homeFeedDelegateEvent(f, g, c);
            g.destroy = function () {
                h.destroy();
                g.undefineCustEvt()
            };
            return g
        }
    }
});
STK.register("common.feed.inter.feedInter", function (a) {
    function c(b) {
        this.custKeySuccess = a.core.evt.custEvent.define(this, "success");
        this.custKeyFailure = a.core.evt.custEvent.define(this, "failure");
        this.init(b.pageQuery)
    }

    var b = function (b) {
        var c = a.C("div");
        c.innerHTML = b;
        window.WBEXP && window.WBEXP.start(c);
        c = null
    };
    c.prototype = {param: null, defaultConfig: {gid: 0, is_ori: 0, is_forward: 0, is_pic: 0, is_video: 0, is_music: 0, is_tag: 0, is_text: 0, key_word: null, start_time: null, end_time: null, page: 0, count: 0, since_id: 0, max_id: 0, pre_page: 0, end_id: 0, is_search: 0, whisper: 0, tag_name: null, rank: 0, is_mood: 0, mblogsort: 0, max_msign: 0, end_msign: 0, profile_ftype: 0, ismiyou: 0, cftype: 0, activity: 0, preview: 0, app_type: 0, filtered_min_id: 0}, pageParam: ["page", "count", "since_id", "max_id", "pre_page", "end_id", "pagebar", "uid", "max_msign", "end_msign", "filtered_min_id"], extraParam: ["activity_id", "ac_page"], key: [], init: function (b) {
        b = a.core.json.clone(b);
        for (var c in b)c in this.defaultConfig || delete b[c];
        this.initQuery = b
    }, evtSearch: function () {
        var b = arguments, c = b[1], d = b[2];
        this.type = c;
        this.param = {};
        for (var e in d)this.param[e] = d[e];
        this.key = [];
        var f = a.core.util.getUniqueKey();
        this.param._k = f;
        this.key.push(f);
        this.collectParameter(c)
    }, evtRequest: function () {
        var b = arguments, c = b[1], d = b[2] || {};
        this.type = c;
        this.param == null && (this.param = this.initQuery != null ? a.core.json.clone(this.initQuery) : {});
        var e = this.pageParam;
        for (var f = 0, g = e.length; f < g; f++) {
            var h = e[f];
            d[h] != null ? this.param[h] = d[h] : delete this.param[h]
        }
        var i = this.extraParam;
        for (var f = 0, g = i.length; f < g; f++) {
            var h = i[f];
            d[h] != null ? this.param[h] = d[h] : delete this.param[h]
        }
        h = a.core.util.getUniqueKey();
        this.type == "newFeed" || this.type == "lazyload" ? this.key.push(h) : this.key = [];
        this.param._k = h;
        this.key.push(h);
        this.collectParameter(c)
    }, getTrans: function () {
        if (this.inter == null) {
            var c = this.trans, d = this;
            c = c.getTrans(this.transKey, {onSuccess: function (c, e) {
                if (d.key.join(",").indexOf(c.key) != -1) {
                    a.core.evt.custEvent.fire(d.custKeySuccess, "success", [c.data, d.type]);
                    b(c.data)
                }
            }, onError: function (b, c) {
                a.core.evt.custEvent.fire(d.custKeyFailure, "failure", [b.data, d.type])
            }, onFail: function (b, c) {
                a.core.evt.custEvent.fire(d.custKeyFailure, "failure", ["", d.type])
            }, noQueue: !0});
            this.inter = c
        }
        return this.inter
    }, collectParameter: function (b) {
        this.type != "lazyload" && this.type != "newFeed" && this.isBigPipe && this.setHash(this.param);
        var c = this.getTrans(), d;
        if (this.param.key_word) {
            var e = encodeURIComponent(this.param.key_word);
            d = a.kit.extra.merge(this.param, {key_word: e})
        } else d = this.param;
        c.request(d)
    }, setHash: function (b) {
        b = a.core.json.clone(b);
        var c = ["count", "pagebar"];
        for (var d = 0, e = c.length; d < e; d++)c[d]in b && delete b[c[d]];
        var f = a.core.json.clone(this.defaultConfig);
        for (var g in f)b[g] != null ? f[g] = b[g] : f[g] = null;
        STK.historyM.setQuery(f)
    }};
    return c
});
STK.register("common.feed.inter.homeFeedInter", function (a) {
    var b = function (b) {
        this.custKeySuccess = a.core.evt.custEvent.define(this, "success");
        this.custKeyFailure = a.core.evt.custEvent.define(this, "failure");
        this.init(b.pageQuery);
        this.isBigPipe = b != null && b.isBigPipe
    }, c = a.common.feed.inter.feedInter.prototype;
    for (var d in c)b.prototype[d] = c[d];
    b.prototype.trans = a.common.trans.feed;
    b.prototype.transKey = "homeSearch";
    b.prototype.setHash = function (b) {
        b = a.core.json.clone(b);
        var c = ["count", "pagebar"];
        for (var d = 0, e = c.length; d < e; d++)c[d]in b && delete b[c[d]];
        var f = a.core.json.clone(this.defaultConfig);
        for (var g in f)b[g] != null ? f[g] = b[g] : f[g] = null;
        f.lf = null;
        STK.historyM.setQuery(f)
    };
    b.prototype.destroy = function (b) {
        b ? a.core.evt.custEvent.undefine(this, b) : a.core.evt.custEvent.undefine(this)
    };
    return function (a) {
        return new b(a)
    }
});
STK.register("common.trans.favorite", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("add", {url: "/aj/fav/mblog/add?_wv=5", method: "post"});
    c("del", {url: "/aj/fav/mblog/del?_wv=5", method: "post"});
    c("change", {url: "/aj/fav/tag/renew?_wv=5", method: "get"});
    c("tagList", {url: "/aj/fav/tag/list?_wv=5", method: "get"});
    c("delTag", {url: "/aj/fav/tag/destroy?_wv=5", method: "post"});
    c("updateTag", {url: "/aj/fav/tag/update?_wv=5", method: "post"});
    c("alter", {url: "/aj/fav/tag/alter?_wv=5", method: "post"});
    c("favlist", {url: "/aj/fav/mblog/favlist?_wv=5", method: "get"});
    c("getFav", {url: "/aj/fav/mblog/byTag?_wv=5", method: "get"});
    c("saveTag", {url: "/aj/fav/mblog/save?_wv=5", method: "post"});
    c("legend", {url: "/aj/fav/mblog/legend?_wv=5", method: "get"});
    c("edit", {url: "/aj/fav/tag/edit?_wv=5", method: "get"});
    return b
});
STK.register("common.feed.feedList.utils", function (a) {
    var b = a.kit.dom.parentAttr, c = a.core.evt.preventDefault, d = {getMid: function (a, c) {
        return a.mid || (a.mid = b(a, "mid", c))
    }, getFeedNode: function (b, c) {
        var e = d.getMid(b, c), f = d.getFeeds(c, 'mid="' + e + '"');
        for (var g = 1; g < f.length; g++)if (a.contains(f[g], b))return f[g];
        return f[0]
    }, getFeeds: function (b, c) {
        return a.sizzle("[" + c + "]", b)
    }, preventDefault: function (b) {
        a.preventDefault();
        return!1
    }, getFeedTrans: a.common.trans.feed.getTrans, getFavoriteTrans: a.common.trans.favorite.getTrans};
    return d
});
STK.register("common.feed.feedList.imageLikeWhiteList", function (a) {
    return function () {
        var a = !1, b = ($CONFIG.uid + "").split(""), c = ["2439860924", "2617768431", "1377943607", "1111681197", "1418859182", "1005343850", "1596771247", "1151306150", "1273509644", "1650555225", "1478641362", "1714883493", "1056937372", "1957919150", "1650751185", "1210454405", "1688756227", "1909668815", "1652975110", "2279131215", "1640292292", "1411421222", "1340230523", "2189475170", "1617764514", "1315648622", "2637346087", "1652503967", "1143373133", "2157028175", "1729169932", "1280811967", "1833469433", "1764389994", "1591509437", "1676636885", "1262112935", "2624021013", "2270193684", "1674456642", "2745232187", "1835301005", "1740622827", "1803877301", "2812264724", "1852016647", "1360825794", "2247117267", "2878583552", "2886784515", "1548979361", "3063039825", "1912510323", "1966325285", "2920092163", "3019833245", "2506410783", "3036675267", "1729030041", "3235915170", "1976047295", "2126255307", "2425455271", "1385892075", "1233463251", "1729076850", "1605275581", "1957375697", "1798857424", "2790784425", "2016713117", "1787355915", "1928349275", "1658790201", "2407023267", "1984946117", "1970683355", "1382274984", "1674710384", "1833036301", "1790518657", "1680967943", "1862732053", "1396386905", "1708062733", "1787875513", "2355472515", "1161646031", "2306169161", "1980500411", "1663593323", "1767645900", "2394143903"];
        for (var d = 0, e = c.length; d < e; d++)if ($CONFIG.uid == c[d]) {
            a = !0;
            break
        }
        return b[b.length - 2] == 5 || a
    }
});
STK.register("common.feed.feedList.feedTemps", function (a) {
    var b = a.kit.extra.language, c = $CONFIG.imgPath + "/style/images/common/loading.gif", d = a.common.feed.feedList.imageLikeWhiteList();
    return{loadingIMG: b('<div class="W_loading"><span>#L{正在加载，请稍候}...</span></div>'), newFeedTipHTML: b('<a node-type="feed_list_newBar" action-type="feed_list_newBar" class="notes" href="javascript:void(0);" suda-data="key=tblog_home_new&value=feed_new_weibo">#L{有} [n] #L{条新微博}，#L{点击查看}</a>'), activityNewFeedTipHTML: b('<a node-type="feed_list_newBar" action-type="feed_list_newBar" class="notes" href="javascript:void(0);">#L{有} [n] #L{条新动态}，#L{点击查看}</a>'), newCloseFriendFeed: b('<a node-type="feed_list_newBar" action-type="feed_list_newBar" class="notes" href="javascript:void(0);">#L{有新密友微博}，#L{点击查看}</a>'), loadingHTML: b('<div class="W_loading" requestType="[n]"><span>#L{正在加载，请稍候}...</span></div>'), loadErrorRetryHTML: b('<div class="zero_tips S_txt2"><span>#L{加载失败}，<a action-type="feed_list_retry" requestType="[n]" href="javascript:void(0)">#L{请重试}</a></span></div>'), loadErrorEndHTML: b('<div class="zero_tips S_txt2" requestType="[n]"><span>#L{加载失败}。</span></div>'), mediaIMGTEMP: b('<#et temp data><p class="medis_func S_txt3"><a action-type="feed_list_media_toSmall"  href="javascript:void(0);" class="retract" <#if (data.suda && data.suda.retract)>suda-data="${data.suda.retract}"</#if>><em class="W_ico12 ico_retract"></em>#L{收起}</a><i class="W_vline">|</i><a href="javascript:;" action-type="images_view_tobig" action-data="${data.acdata}" class="show_big" <#if (data.suda && data.suda.showBig)>suda-data="${data.suda.showBig}"</#if>><em class="W_ico12 ico_showbig"></em>#L{查看大图}</a><i class="W_vline">|</i><a action-type="feed_list_media_toLeft" href="javascript:void(0);" class="turn_left" <#if (data.suda && data.suda.left)>suda-data="${data.suda.left}"</#if>><em class="W_ico12 ico_turnleft"></em>#L{向左转}</a><i class="W_vline">|</i><a action-type="feed_list_media_toRight" <#if (data.suda && data.suda.right)>suda-data="${data.suda.right}"</#if> href="javascript:void(0);" class="turn_right"><em class="W_ico12 ico_turnright"></em>#L{向右转}</a></p><div class="smallcursor"  action-type="feed_list_media_bigimgDiv" <#if (data.suda && data.suda.big)>suda-data="${data.suda.big}"</#if>><img dynamic-id="${data.uniqueId}"   action-type="feed_list_media_bigimg" src="${data.bigSrc}" width="${data.bigWidth}"/></div></#et>'), mediaIMGTEMPwithBtn: b('<#et temp data><p class="medis_func S_txt3"><a action-type="feed_list_media_toSmall"  href="javascript:void(0);" class="retract" <#if (data.suda && data.suda.retract)>suda-data="${data.suda.retract}"</#if>><em class="W_ico12 ico_retract"></em>#L{收起}</a><i class="W_vline">|</i><a href="javascript:;" action-type="images_view_tobig" action-data="${data.acdata}" class="show_big" <#if (data.suda && data.suda.showBig)>suda-data="${data.suda.showBig}"</#if>><em class="W_ico12 ico_showbig"></em>#L{查看大图}</a><i class="W_vline">|</i><a action-type="feed_list_media_toLeft" href="javascript:void(0);" class="turn_left" <#if (data.suda && data.suda.left)>suda-data="${data.suda.left}"</#if>><em class="W_ico12 ico_turnleft"></em>#L{向左转}</a><i class="W_vline">|</i><a action-type="feed_list_media_toRight" <#if (data.suda && data.suda.right)>suda-data="${data.suda.right}"</#if> href="javascript:void(0);" class="turn_right"><em class="W_ico12 ico_turnright"></em>#L{向右转}</a></p><div class="smallcursor"  action-type="feed_list_media_bigimgDiv" <#if (data.suda && data.suda.big)>suda-data="${data.suda.big}"</#if>>' + (d ? '<div class="artwork_box artwork_box_hover"><span action-type="feed_list_image_like" action-data="mid=${data.mid}&photo_id=${data.pid}&is_liked=${data.is_liked}&count=${data.count}&object_id=${data.object_id}"><#if (data.is_liked)><a class="W_btn_alpha" title="#L{取消赞}" href="javascript:void(0)"><i class="icon_praised"></i><span node-type="count">(${data.count})</span></a><#else><a class="W_btn_alpha" title="#L{赞}" href="javascript:void(0)"><i class="icon_praise"></i><span node-type="count">(${data.count})</span></a></#if></span>' : "") + '<img dynamic-id="${data.uniqueId}"   action-type="feed_list_media_bigimg" src="${data.bigSrc}" width="${data.bigWidth}"/>' + (d ? "</div>" : "") + "</div>" + "</#et>"), mediaVideoMusicTEMP: b('<#et temp data><p class="medis_func S_txt3"><a href="javascript:void(0);" action-type="feed_list_media_toSmall" class="retract"><em class="W_ico12 ico_retract"></em>#L{收起}</a><i class="W_vline">|</i><a href="${data.short_url}"  action-type="feed_list_url"  title="${data.fTitle}" class="show_big" target="_blank"><em class="W_ico12 ico_showbig"></em>${data.title}</a><i class="W_vline">|</i><a action-type="feed_list_media_toFloat" action-data="title=${data.fTitle}" href="javascript:void(0);" class="turn_right">#L{弹出}</a></p><div node-type="feed_list_media_big${data.type}Div" style="text-align:center;min-height:18px;"><img class="loading_gif" src="' + c + '"/></div>' + "</#et>"), mediaVideoMusicFloatTEMP: b('<#et temp data><div node-type="outer" class="W_layer" style=""><div class="bg"><table border="0" cellspacing="0" cellpadding="0"><tr><td><div class="content"><div class="title"><h3>${data.title}</h3></div><a href="####" onclick="return false;" node-type="close" class="W_close"></a><div node-type="mediaContent" style="text-align:center;width:440px;"><img style="margin:10px;" class="loading_gif" src="' + c + '"/></div>' + "</div>" + "</td>" + "</tr>" + "</table>" + "</div>" + "</div>" + "</#et>"), widgetTEMP: b('<#et temp data><p class="medis_func S_txt3"><a href="javascript:void(0);" action-type="feed_list_media_toSmall" class="retract"><em class="W_ico12 ico_retract"></em>#L{收起}</a><i class="W_vline">|</i><a <#if (data.suda)>suda-data="${data.suda}"</#if> href="${data.full_url}" title="${data.full_url}" class="show_big" target="_blank"><em class="W_ico12 ico_showbig"></em>${data.title}</a></p><div node-type="feed_list_media_widgetDiv"><img class="loading_gif" src="' + c + '"/></div>' + "</#et>"), qingTEMP: b('<#et temp data><p class="medis_func S_txt3"><a href="javascript:void(0);" action-type="feed_list_media_toSmall" class="retract"><em class="W_ico12 ico_retract"></em>#L{收起}</a><i class="W_vline">|</i><a <#if (data.suda)>suda-data="${data.suda}"</#if> href="${data.full_url}" title="${data.full_url}" class="show_big" target="_blank"><em class="W_ico12 ico_showbig"></em>${data.title}</a></p><div node-type="feed_list_media_qingDiv"><img class="loading_gif" src="' + c + '"/></div>' + "</#et>"), commonMediaTEMP: b('<#et temp data><p class="medis_func S_txt3"><a href="javascript:void(0);" action-type="common_list_media_hide" action-data="type=${data.type}&id=${data.id}" suda-data="key=tblog_activity_click&value=fold_play" class="retract"><em class="W_ico12 ico_retract"></em>#L{收起}</a><i class="W_vline">|</i><a href="${data.url}"  action-type="feed_list_url"  title="${data.title}" class="show_big" target="_blank" suda-data="key=tblog_activity_click&value=url_click"><em class="W_ico12 ico_showbig"></em>${data.title}</a><#if (data.tofloat)><i class="W_vline">|</i><a action-type="common_list_media_toFloat" action-data="title=${data.title}&type=${data.type}&id=${data.id}" href="javascript:void(0);" class="turn_right" suda-data="key=tblog_activity_click&value=bomb_play">#L{弹出}</a></#if></p><div node-type="common_list_media_Div" style="text-align:center;min-height:18px;"><img class="loading_gif" src="' + c + '"/></div>' + "</#et>"), translateTEMP: b('<#et temp data><div class="layer_tips" node-type="feed_translate" style="position:absolute;"><a class="W_ico12 icon_close" href="javascript:void(0)" suda-data="key=tblog_bowen_translate&value=close_button" action-type="feed_translate_close"></a><div class="S_txt2">#L{翻译结果}:</div><div node-type="translate_rs">${data.text}</div><div class="copyright S_txt2"><span class="cr_l">#L{翻译结果由}<a href="http://weibo.com/youdaocidian" target="_blank" suda-data="key=tblog_bowen_translate&value=click_youdao_link" title="#L{有道词典}">#L{有道词典}</a>#L{提供，仅供参考}。</span> <a href="javascript:void(0)" suda-data="key=tblog_bowen_translate&value=click_i_translate" action-type="feed_translate_by_me" action-data="${data.bymedata}">#L{我来翻译}</a></div></div></#et>')}
});
STK.register("kit.dom.lastChild", function (a) {
    var b = a.core.dom.prev;
    return function (a) {
        var c = a.lastChild;
        c && c.nodeType != 1 && (c = b(c));
        return c
    }
});
STK.register("common.channel.window", function (a) {
    return a.common.listener.define("common.channel.window", ["scroll"])
});
STK.register("common.extra.lazyload", function (a) {
    function f() {
        clearTimeout(c);
        c = setTimeout(e, 300)
    }

    function e() {
        var b = a.core.util.scrollPos(), c = a.core.util.pageSize(), d = {scrollLeft: b.left, scrollTop: b.top, winWidth: c.win.width, winHeight: c.win.height, pageWidth: c.page.width, pageHeight: c.page.height};
        a.common.channel.window.fire("scroll", d)
    }

    function d(b, c, d, e) {
        var f, g, h, i = b.length, j = new Date;
        if (b.length > 0)for (var k = b.length - 1; k >= 0; k--) {
            f = b[k];
            h = d.parent ? f.parentNode : f;
            g = a.core.dom.position(h).t;
            if (g > e.top && g < e.bottom) {
                b.splice(k, 1);
                c(f)
            }
        }
    }

    var b = !1, c;
    return function (c, e, g) {
        if (b == !1) {
            b = !0;
            a.addEvent(window, "scroll", f);
            a.addEvent(window, "resize", f);
            f()
        }
        var h = function (b) {
            var f = {type: "", threshold: 600, parent: !1, over: !1};
            f = a.core.obj.parseParam(f, g);
            d(c, e, g, {top: f.over ? 0 : b.scrollTop, bottom: parseInt(b.scrollTop + b.winHeight + f.threshold, 10)})
        };
        a.common.channel.window.register("scroll", h);
        var i = {destroy: function () {
            a.common.channel.window.remove("scroll", h)
        }};
        return i
    }
});
STK.register("common.feed.feedList.baseFeedList", function (a) {
    var b = a.common.feed.feedList.utils, c = a.common.feed.feedList.feedTemps, d = a.kit.dom.firstChild, e = a.kit.dom.lastChild, f = a.core.dom.insertElement, g = function (b) {
        a.custEvent.fire(b, "clearTips", "base")
    }, h = function (b, e) {
        var f;
        switch (b) {
            case"waiting":
                f = c.loadingHTML;
                break;
            case"retry":
                f = c.loadErrorRetryHTML;
                break;
            case"end":
                f = c.loadErrorEndHTML
        }
        return d(a.builder(f.replace("[n]", e)).box)
    };
    return function (c, i) {
        a.isNode(c) || a.log("baseFeedList : parameter node is not a document node!");
        i = a.parseParam({page: 1, end_id: ""}, i);
        var j = {}, k = new Date, l = a.core.evt.delegatedEvent(c), m, n, o = 0, p = parseInt(i.page), q = !1, r = {}, s = i.end_id;
        l.add("feed_list_retry", "click", function (d) {
            g(c);
            var e = d.el.getAttribute("requestType"), f = j[e];
            f.top ? u("waiting", e) : v("waiting", e);
            a.custEvent.fire(x, "request", [e, r[e].data]);
            return b.preventDefault(d.evt)
        });
        var t = function () {
            if (p < 2) {
                var a = x.getFirstFeed();
                a && (s = a.getAttribute("mid"))
            }
        }, u = function (a, b) {
            q = !0;
            x.removeTopNode();
            f(c, m = h(a, b), "afterbegin")
        }, v = function (a, b) {
            x.removeBottomNode();
            c.appendChild(n = h(a, b))
        }, w = !0, x = {extra: {}, extraData: {}, getNode: function () {
            return c
        }, getNewBar: function () {
            return a.sizzle('[node-type="feed_list_newBar"]', c)
        }, removeNewBar: function () {
            var b = x.getNewBar();
            b && b.length > 0 && a.core.dom.removeNode(b[0])
        }, clearNewBar: function () {
            var b = x.getNewBar();
            if (b && b.length > 0)for (var c in b)a.core.dom.removeNode(b[c]);
            m = null
        }, getRecommend: function () {
            return a.sizzle('[node-type="feed_list_recommend"]', c)
        }, removeRecommend: function () {
            var b = x.getRecommend();
            if (b && b.length > 0)for (var c in b)a.core.dom.removeNode(b[c])
        }, getNodeList: function () {
            var b = a.sizzle('div[action-type="feed_list_item"]', c);
            return b.length ? b : !1
        }, getDEvent: function () {
            return l
        }, removeTopNode: function () {
            a.removeNode(m);
            m = null
        }, setTopNode: function (a) {
            m = a
        }, removeBottomNode: function () {
            a.removeNode(n);
            n = null
        }, setBottomNode: function (a) {
            n = a
        }, getEndId: function () {
            return s
        }, isTopWaiting: function () {
            return q
        }, getCurrentPage: function () {
            return p
        }, setCurrentPage: function (a) {
            p = a
        }, getFeedCount: function () {
            return b.getFeeds(c, 'action-type="feed_list_item"').length
        }, setRequestAction: function (b, c) {
            j[b] = a.parseParam({top: !1, center: !1, bottom: !1}, c)
        }, setRequestData: function (a, b) {
            r[a] = {data: b, time: 0}
        }, getExtraData: function (a) {
            return x.extraData[a]
        }, setExtraData: function (a, b) {
            x.extraData[a] = b
        }, setExtraFunction: function (a, b) {
            x.extra[a] = b
        }, regCustEvent: function (b, c) {
            a.custEvent.define(x, b);
            a.custEvent.add(x, b, c)
        }, isFeed: function (a) {
            return a.getAttribute("mid") && !a.getAttribute("feedtype") ? !0 : !1
        }, getFirstFeed: function () {
            var b = d(c);
            while (b && !x.isFeed(b))b = a.core.dom.next(b);
            return b
        }, getLastFeed: function () {
            var b = e(c);
            while (!x.isFeed(b))b = a.core.dom.prev(b);
            return b
        }, getFirstFeedId: function () {
            var b = x.getFirstFeed();
            if (b) {
                for (var c = 0; c < o && b; c++)b = a.core.dom.next(b);
                if (b)return b.getAttribute("mid")
            }
        }, getLastFeedId: function () {
            var b = a.sizzle('[node-type="feed_list_shieldKeyword"]', c)[0], d = b ? b : e(c), f = n ? a.core.dom.prev(n) : a.core.dom.prev(d);
            if (f)return f.getAttribute("mid")
        }, getFirstFeedAttr: function (b) {
            var c = x.getFirstFeed();
            if (c) {
                for (var d = 0; d < o && c; d++)c = a.core.dom.next(c);
                if (c)return c.getAttribute(b)
            }
            return""
        }, getLastFeedAttr: function (b) {
            var d = a.sizzle('[node-type="feed_list_shieldKeyword"]', c)[0], f = d ? d : e(c), g = n ? a.core.dom.prev(n) : a.core.dom.prev(f);
            return g ? g.getAttribute(b) : ""
        }, showZeroTip: function () {
            var b = a.sizzle('div[node-type="feed_list_zero"]', c)[0];
            b && (b.style.display = "")
        }, hideZeroTip: function () {
            var b = a.sizzle('div[node-type="feed_list_zero"]', c)[0];
            b && (b.style.display = "none")
        }, insertFakeFeed: function (b) {
            if (typeof b != "string")a.log("insertFakeFeed feedHtml is not String!"); else {
                x.hideZeroTip();
                o++;
                var d = a.C("div");
                d.innerHTML = b;
                var e = a.sizzle('div[action-type="feed_list_item"]', d);
                e = e[0];
                var f = a.core.util.scrollPos().top;
                m ? a.core.dom.insertBefore(e, m) : a.core.dom.insertElement(c, e, "afterbegin");
                if (f > 350) {
                    var g = a.core.dom.getSize(e).height, h = f + g - 1;
                    document.body.scrollTop = h;
                    document.documentElement.scrollTop = h
                }
            }
        }, updateFeed: function (b, e) {
            if (b && e && j[e]) {
                x.hideZeroTip();
                var f = j[e];
                if (f.top) {
                    q = !1;
                    x.removeTopNode();
                    for (var g = 0; g < o; g++)a.removeNode(d(c));
                    o = 0;
                    a.insertHTML(c, b, "afterbegin")
                } else if (f.bottom) {
                    x.removeBottomNode();
                    a.insertHTML(c, b)
                }
                a.custEvent.fire(x, "updateFeed", [e, b])
            }
        }, showWait: function (b) {
            if (b && j[b]) {
                var d = j[b];
                if (d.top) {
                    u("waiting", b);
                    d.bottom && x.removeBottomNode()
                } else d.bottom && v("waiting", b);
                if (d.center) {
                    m && a.core.util.hideContainer.appendChild(m);
                    n && a.core.util.hideContainer.appendChild(n);
                    c.innerHTML = "";
                    m && c.appendChild(m);
                    n && c.appendChild(n)
                }
                r[b].time = 0
            }
        }, showError: function (b) {
            if (b && j[b]) {
                var c = j[b], d = r[b], e;
                if (d.time >= 3) {
                    d.time = 0;
                    e = "end"
                } else {
                    d.time++;
                    e = "retry"
                }
                c.top ? u(e, b) : c.bottom && v(e, b);
                a.custEvent.fire(x, "showError", b)
            }
        }, resetStartTime: function () {
            var a = k;
            k = new Date;
            return k - a
        }, clearAllTimeTip: function () {
            var b = a.sizzle('[node-type="feed_list_timeTip"]', c), d = b.length, e = null, f = null;
            for (var g = d - 1; g >= 0; g--) {
                e = b[g];
                f = a.core.dom.prev(e);
                f && a.removeClassName(f, "WB_feed_new");
                e && a.removeNode(e)
            }
        }, updateTimeTip: function (b) {
            var d = a.sizzle('[node-type="feed_list_timeText"]', c);
            d.length > 0 && (d[0].innerHTML = b)
        }}, y = function () {
            var b = x.getFirstFeed();
            !s && p < 2 && b && (s = b.getAttribute("mid"));
            a.custEvent.define(x, ["request", "updateFeed", "clearTips", "updateEndId", "showError", "inView", "smartSort", "showRecommendTip", "stopRecommendTip"]);
            a.custEvent.add(x, "updateEndId", t)
        };
        y();
        x.destroy = function () {
            l.destroy();
            a.custEvent.undefine(x)
        };
        return x
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
        var d, f, g = c && c.editorWrapEl, h = c && c.textEl, i = {}, j = [], k, l = {}, m, n, o = function () {
            if (!a.isNode(g))throw"publishTo need a wrapper node to parseDOM"
        }, p = a.getUniqueKey(), q = function (a) {
            var b = [], c;
            b.push('<div style="position: absolute;display:none;z-index:29999;outline:none;" hideFocus="true" node-type="publishTo" class="layer_menu_list" tabindex="10">');
            b.push('<ul id="' + p + '">');
            b.push('<li><a title="#L{公开-你发表的微博可以被大家公开查看哦}" suda-data="key=tblog_edit_exposure&value=edit_public" href="javascript:void(0)" action-data="rank=0&text=#L{公开}&rankid=" action-type="publishTo"><i class="W_ico16 i_conn_public"></i>#L{公开}</a></li>');
            b.push($CONFIG.miyou === 1 ? '<li><a title="#L{密友圈-发表的微博只有你的密友才能看到}" href="javascript:void(0)" action-data="rank=2&text=#L{密友圈}&rankid=" action-type="publishTo"><i class="W_ico16 i_conn_close_friend"></i>#L{密友圈}</a></li>' : "");
            b.push('<li><a title="#L{仅自己可见-发表的微博只有自己才能看到}" suda-data="key=tblog_edit_exposure&value=edit_private" href="javascript:void(0)" action-data="rank=1&text=#L{仅自己可见}&rankid=" action-type="publishTo"><i class="W_ico16 i_conn_private"></i>#L{仅自己可见}</a></li>');
            b.push('<li class="line"></li>');
            b.push('<li><a action-type="more" href="javascript:void(0);"><i class="W_ico16 i_conn_list"></i>#L{分组可见}</a></li>');
            b.push("</ul></div>");
            return b.join("")
        }, r = function (a) {
            var b = [], c = a.length, d;
            c > 8 ? b.push('<ul class="scroll_bar" style="width:110px;" id="' + p + '">') : b.push('<ul class="scroll_bar" style="height:auto;width:110px;" id="' + p + '">');
            for (var e = 0; e < c; e++) {
                d = a[e];
                b.push('<li><a action-type="publishTo" action-data="rank=3&text=' + d.gname + "&rankid=" + d.gid + '" title="' + d.gname + '" href="javascript:void(0);" onclick="return false;"><i class="W_ico16 i_conn_list"></i>' + d.gname + "</a></li>")
            }
            b.push("</ul>");
            b.push('<ul><li class="line"></li>');
            b.push('<li class="opt"><a href="javascript:void(0)" onclick="return false;" action-type="back">#L{返回}</a></li>');
            b.push("</ul>");
            return b.join("")
        }, s = function () {
            f = a.kit.dom.parseDOM(a.builder(g).list);
            f.wrap || (f.wrap = g);
            n = f.wrap.className
        }, t = function () {
            d = function () {
                var c = {}, d, i, l, o, s = f.showPublishTo;
                i = d = s && s.getAttribute("action-data") && a.core.json.queryToJson(s.getAttribute("action-data")) || {rank: "all", rankid: ""};
                c.node = a.core.evt.delegatedEvent(g);
                var t = !1, u = {hotKeyChangeRank: function (c, f) {
                    var g = f.match(/\d+/);
                    if (g && g[0]) {
                        var h = parseInt(g[0], 10) - 1, i = [
                            {rank: 0, rankid: "", text: b("#L{公开}"), title: b("#L{公开-你发表的微博可以被大家公开查看哦}")},
                            {rank: 2, rankid: "", text: b("#L{密友圈}"), title: b("#L{密友圈-发表的微博只有你的密友才能看到}")},
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
                    var d = a.E(p);
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
                }, miYouStyle: function (b, c) {
                    var d = "2", e = $CONFIG.lang == "zh-cn" ? "" : "_CHT";
                    d == c.rank ? a.core.dom.addClassName(f.wrap, "send_weibo_cf" + e) : a.core.dom.removeClassName(f.wrap, "send_weibo_cf" + e)
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
                    f.wrap.className = n;
                    z.btnContent(o.content);
                    z.btnTitle(o.title);
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
                    y.content(m)
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
                        var a = b(r(e));
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
                    var d = b(q(c));
                    f.publishTo = a.insertHTML(document.body, d, "beforeend");
                    m = f.publishTo.innerHTML
                }, C = function () {
                    if (!a.isNode(f.showPublishTo))return 0;
                    l = f.publishTotext;
                    o = {content: l.innerHTML, title: f.showPublishTo.getAttribute("title")};
                    v();
                    return 1
                }, D = C();
                a.custEvent.define(z, ["show", "hide", "changeRank"]);
                return D ? z : null
            }();
            d && d.bindAltKey && d.bindAltKey()
        }, u = function () {
            o();
            s();
            t()
        };
        u();
        return d
    }
});
STK.register("kit.dom.autoHeightTextArea", function (a) {
    var b = a.core.util.browser.MOZ, c = function (c) {
        var d = a.core.dom.getStyle, e;
        c.defaultHeight || (c.defaultHeight = parseInt(d(c, "height"), 10) || parseInt(c.offsetHeight, 10) || 20);
        if (a.core.util.browser.IE) {
            var f = parseInt(d(c, "paddingTop"), 10) + parseInt(d(c, "paddingBottom"), 10);
            e = Math.max(c.scrollHeight - f, c.defaultHeight)
        } else {
            var f = b ? 0 : parseInt(d(c, "paddingTop"), 10) + parseInt(d(c, "paddingBottom"), 10), g = a.E("_____textarea_____");
            if (!g) {
                g = a.C("textarea");
                g.id = "_____textarea_____";
                document.body.appendChild(g)
            }
            if (g.currentTarget != c) {
                var h = [];
                h.push("width:" + d(c, "width"));
                h.push("font-size:" + d(c, "fontSize"));
                h.push("font-family:" + d(c, "fontFamily"));
                h.push("line-height:" + d(c, "lineHeight"));
                h.push("padding-left:" + d(c, "paddingLeft"));
                h.push("padding-right:" + d(c, "paddingRight"));
                h.push("padding-top:" + d(c, "paddingTop"));
                h.push("padding-bottom:" + d(c, "paddingBottom"));
                h.push("top:-1000px");
                h.push("height:0px");
                h.push("position:absolute");
                h.push("overflow:hidden");
                h.push("");
                h = h.join(";");
                g.style.cssText = h
            }
            g.value = c.value;
            e = Math.max(g.scrollHeight - f, c.defaultHeight);
            g.currentTarget = c
        }
        return e
    };
    return function (b) {
        function j(b) {
            var c = a.core.dom.getStyle, d, e = [];
            e.push("width:" + c(b, "width"));
            e.push("font-size:" + c(b, "fontSize"));
            e.push("font-family:" + c(b, "fontFamily"));
            e.push("line-height:" + c(b, "lineHeight"));
            e.push("padding-left:" + c(b, "paddingLeft"));
            e.push("padding-right:" + c(b, "paddingRight"));
            e.push("padding-top:" + c(b, "paddingTop"));
            e.push("padding-bottom:" + c(b, "paddingBottom"));
            e.push("top:-1000px");
            e.push("height:0px");
            e.push("position:absolute");
            e.push("overflow:hidden");
            e.push("");
            e = e.join(";");
            return e
        }

        var d = b.textArea, e = b.maxHeight, f = b.inputListener, g = d.style, h;
        (h = function () {
            typeof f == "function" && f();
            setTimeout(function () {
                var a = c(d) || 0, b;
                e = e || a;
                var f = a > e;
                b = f ? e : a;
                g.overflowY = f ? "auto" : "hidden";
                g.height = Math.min(e, a) + "px"
            }, 0)
        })();
        if (!a.core.util.browser.IE)try {
            a.common.channel.at.register("open", function () {
                a.E("_____textarea_____").style.cssText = j(d)
            })
        } catch (i) {
            a.log(i)
        }
        if (!d.binded) {
            a.addEvent(d, "keyup", h);
            a.addEvent(d, "focus", h);
            a.addEvent(d, "blur", h);
            d.binded = !0;
            d.style.overflow = "hidden"
        }
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
STK.register("common.trans.forward", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("toMicroblog", {url: "/aj/mblog/forward?_wv=5", method: "post"});
    c("toMicrogroup", {url: "/aj/weiqun/forward?_wv=5", method: "post"});
    c("toMiyouCircle", {url: "/aj/mblog/forwardmiyou?_wv=5", method: "post"});
    c("setDefault", {url: "/aj/mblog/repost/setdefault?_wv=5", method: "post"});
    c("simpleForwardLinks", {url: "/aj/mblog/repost/unexpanded?_wv=5", method: "get"});
    c("detailForwardLinks", {url: "/aj/mblog/repost/small?_wv=5", method: "get"});
    c("microgroupList", {url: "/aj/weiqun/mylist?_wv=5", method: "get"});
    c("importMiyou", {url: "/aj/f/closefriendsrecom?_wv=5", method: "get"});
    c("toPriv_delete", {url: "/aj/message/del?_wv=5", method: "post"});
    c("toPriv_getMsg", {url: "/aj/message/getmessagedetail?_wv=5", method: "get"});
    return b
});
STK.register("common.forward.utils", function (a) {
    var b = {checkAtNum: function (a) {
        var b = a.match(/@[a-zA-Z0-9\u4e00-\u9fa5_]{0,20}/g), c = a.match(/\/\/@[a-zA-Z0-9\u4e00-\u9fa5_]{0,20}/g);
        b = b ? b.length : 0;
        c = c ? c.length : 0;
        return b - c
    }, preventDefault: function (b) {
        a.core.evt.preventDefault(b);
        return!1
    }};
    return b
});
STK.register("common.content.report", function (a) {
    return function (b) {
        window.open("http://weibo.com/complaint/complaint.php?url=" + a.kit.extra.parseURL().url);
        a.core.evt.preventDefault(b.evt);
        return!1
    }
});
STK.register("kit.extra.toFeedText", function (a) {
    return function (b) {
        if (typeof b != "string")throw"[kit.extra.toFeedText]:need string as first parameter";
        var c = a.core.str.parseHTML(b), d = [];
        for (var e = 0, f = c.length; e < f; e += 1)if (!c[e][2])d.push(c[e][0]); else if (c[e][2].toLowerCase() === "img") {
            var g = c[e][3].match(/(?:alt\s*=\s*["|']?([^"|'|\s]+)["|']?)/), h = c[e][3].match(/(?:brand_face\s*=\s*["|']?([^"|'|\s]+)["|']?)/);
            h ? d.push(h[1]) : g && d.push(g[1])
        }
        return d.join("")
    }
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
STK.register("common.trans.validateCode", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("checkValidate", {url: "/aj/pincode/verified?_wv=5", method: "post"});
    return b
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
STK.register("common.forward.toMicroblog", function (a) {
    var b = a.kit.extra.language, c = null, d = a.common.dialog.validateCode(), e = b('<#et userlist data><div node-type="toMicroblog_client" class="toMicroblog<#if (data.isDialog == true)>Layer</#if>"><#if (data.isDialog == true)><div class="forward_content" node-type="content"><#if (data.showArrow == true)><span class="W_arrow" action-type="origin_all"><em class="down">◆</em></span></#if>${data.content}</div></#if><div class="feed_repeat"><div class="input clearfix"><p class="num" node-type="num">140 #L{字}</p><textarea class="W_input" name="" rows="" cols="" title="#L{转发微博}#L{内容}" node-type="textEl">${data.reason}</textarea><div class="action clearfix" node-type="widget"><span class="W_ico16 ico_faces" title="#L{表情}" node-type="smileyBtn"></span><ul node-type="cmtopts" class="commoned_list"><#if (data.forwardNick)><li node-type="forwardLi"><label><input type="checkbox" node-type="forwardInput" class="W_checkbox" />#L{同时评论给} ${data.forwardNick}</label></li></#if><#if (data.originNick)><li node-type="originLi"><label><input type="checkbox" node-type="originInput" class="W_checkbox" /><#if (data.forwardNick)>#L{同时评论给原文作者} <#else>#L{同时评论给} </#if>${data.originNick}</label></li></#if></ul></div><p class="btn"><a action-data="rank=0" action-type="showPublishTo" node-type="showPublishTo" href="javascript:void(0)" title="#L{公开-你发表的微博可以被大家公开查看哦}"><span node-type="publishTotext" class="W_autocut">#L{公开}</span><span class="W_arrow"><em node-type="publish_to_arrow">◆</em></span></a><a href="#" title="#L{转发}#L{按钮}" onclick="return false;" class="W_btn_d btn_noloading" node-type="submit"><span><b class="loading"></b><em node-type="btnText">#L{转发}</em></span></a></p></div></div><#if (data.isDialog == true)><div node-type="forward_link"></div></#if></div>'), f = {notice: "#L{请输入转发理由}", defUpdate: "#L{转发微博}", netError: "#L{系统繁忙}", success: "#L{转发成功}!", retry: '#L{读取失败，请}<a href="#" onclick="return false;" action-type="retry" value="retry">#L{重试}</a>', off: "#L{关闭}", on: "#L{开启}"}, g = {limitNum: 140, tipText: b(f.notice), count: "disable"}, h = function (a, c) {
        c == "normal" ? a.innerHTML = b("#L{转发}") : a.innerHTML = b("#L{提交中...}")
    };
    return function (i, j, k) {
        if (i == null || j == null)throw new Error("[common.forward.toMicroblog]Required parameter client is missing");
        var l = k.data, m = 56, n = !1, o = l.originNick ? "@" + l.originNick : "", p = a.kit.extra.toFeedText(l.origin.replace(/<[^>]+>/gi, ""));
        l.content = p + "";
        if (a.bLength(a.core.str.decodeHTML(a.kit.extra.toFeedText(p + o))) > m) {
            l.content = a.leftB(p, m - a.bLength(o)) + "...";
            n = !0
        } else l.content = l.origin;
        o ? o = '<a class="S_func1" href="/' + (l.domain || l.rootuid || l.uid) + '" target="_blank">' + o + "</a>:" : o = "";
        l.content = o + l.content;
        var q = l.reason || "", r = l.forwardNick ? "//@" + l.forwardNick + ":" + " " : "", s, t, u, v, w, x, y, z, A, B, C, D, E, F, G = !1, H = !1, I, J, K = a.common.forward.utils, L, M = {};
        M.client = i;
        M.opts = k.data || {};
        M.isInit = !1;
        u = a.parseParam({appkey: "", styleId: "1", mark: ""}, M.opts);
        a.custEvent.define(M, ["forward", "hide", "center", "count"]);
        var N = function () {
            if (v)w === "error" && a.common.extra.shine(t.textEl); else {
                var d = a.trim(s.API.getWords() || "");
                d === b(f.notice) && (d = "");
                v = !0;
                w = "loading";
                t.submit.className = "W_btn_a_disable";
                h(t.btnText, "loading");
                var e = {};
                e.appkey = u.appkey;
                e.mid = j;
                e.style_type = u.styleId;
                e.mark = u.mark;
                e.reason = d || b(f.defUpdate);
                t.originInput && t.originInput.checked && (e.is_comment_base = "1");
                if (t.forwardInput && t.forwardInput.checked) {
                    e.is_comment = "1";
                    G = !0
                }
                L && L.disable();
                if (L) {
                    var g = L.rank();
                    e.rank = g.rank;
                    e.rankid = g.rankid
                }
                e = a.common.getDiss(e, t.submit);
                if (l.postdata) {
                    var i = l.postdata.split(";");
                    for (var k = 0; i[k]; k++) {
                        var m = i[k].split(",");
                        m[0] && m[0] && (e[m[0]] = m[1])
                    }
                }
                c = e;
                if (K.checkAtNum(d) > 5) {
                    a.ui.confirm(b("#L{单条微博里面@ 太多的人，可能被其它用户投诉。如果投诉太多可能会被系统封禁。是否继续转发？}"), {OK: function () {
                        x.request(e)
                    }, cancel: function () {
                        v = !1;
                        w = "";
                        t.submit.className = "W_btn_d btn_noloading";
                        h(t.btnText, "normal")
                    }});
                    return
                }
                x.request(e)
            }
        }, O = function (a) {
            if ((a.keyCode === 13 || a.keyCode === 10) && a.ctrlKey) {
                s.API.blur();
                N()
            }
        }, P = function () {
            var a = s.API.count(), c = g.limitNum - a, d = c >= 0 ? !0 : !1;
            if (d) {
                v = !1;
                w = "";
                d && (t.num.innerHTML = b("#L{还可以输入%s字}", "<span>" + c + "</span>"))
            } else {
                v = !0;
                w = "error";
                t.num.innerHTML = b("#L{已经超过%s字}", '<span class="S_error">' + Math.abs(c) + "</span>")
            }
        }, Q = function (d, e) {
            v = !1;
            w = "";
            c = null;
            t.submit.className = "W_btn_d btn_noloading";
            h(t.btnText, "normal");
            try {
                d.data.isComment = G;
                d.data.isToMiniBlog = !0;
                a.custEvent.fire(M, "forward", [d.data, e, k.inDialog]);
                a.common.channel.feed.fire("forward", [d.data, e, k.inDialog])
            } catch (g) {
            }
            a.custEvent.fire(M, "hide");
            setTimeout(function () {
                a.ui.litePrompt(b(f.success), {type: "succM", timeout: "500"})
            }, 150);
            G = !1;
            s.API.reset();
            L && L.reset()
        }, R = function (c, d) {
            v = !1;
            w = "";
            t.submit.className = "W_btn_d btn_noloading";
            h(t.btnText, "normal");
            c.msg = c.msg || b(f.netError);
            a.common.layer.ioError(c.code, c);
            G = !1;
            L && L.enable()
        }, S = function (c, d) {
            v = !1;
            w = "";
            t.submit.className = "W_btn_d btn_noloading";
            h(t.btnText, "normal");
            a.ui.alert(b(f.netError));
            L && L.enable()
        }, T = function () {
            A.request({mid: j, d_expanded: C, expanded_status: H ? D === "on" ? 1 : 2 : ""});
            H = !0
        }, U = function () {
            C = a.core.util.storage.get("forward_link_status");
            C == "null" && (C = "off");
            D = C
        }, V = function (b) {
            if (b == null)throw new Error("[common.forward.toMicroblog]function - setSwitchStatus required parameter sStatus is missing");
            y.request({d_expanded: b});
            a.core.util.storage.set("forward_link_status", b);
            C = b
        }, W = function () {
            B = a.builder(i);
            B = a.kit.dom.parseDOM(B.list).toMicroblog_client;
            s = a.common.editor.base(B, g);
            s.widget(a.common.editor.widget.face(), "smileyBtn");
            t = s.nodeList;
            L = a.common.editor.plugin.publishTo({editorWrapEl: i, textEl: t.textEl});
            a.addEvent(t.textEl, "focus", function () {
                I = setInterval(function () {
                    P()
                }, 200)
            });
            a.addEvent(t.textEl, "blur", function () {
                clearInterval(I)
            });
            s.API.insertText(r + a.core.str.decodeHTML(a.kit.extra.toFeedText(q)));
            a.kit.dom.autoHeightTextArea({textArea: t.textEl, maxHeight: 145, inputListener: a.funcEmpty});
            F && T()
        }, X = function () {
            a.addEvent(t.submit, "click", N);
            a.addEvent(t.textEl, "keypress", O);
            if (F) {
                E = a.delegatedEvent(B);
                E.add("origin_all", "click", function (a) {
                    t.content.innerHTML = o + l.origin
                });
                E.add("report", "click", function (b) {
                    return a.common.content.report(b)
                });
                E.add("switch", "click", function (c) {
                    var d = {1: "on", 2: "off"}, e = d[c.data.id];
                    V(e);
                    a.setStyle(c.el, "left", e == "on" ? "23px" : "0px");
                    c.el.setAttribute("action-data", e == "on" ? "id=2" : "id=1");
                    c.el.setAttribute("title", e == "on" ? b(f.off) : b(f.on))
                });
                E.add("retry", "click", function (a) {
                    T()
                });
                E.add("show", "click", function (a) {
                    D = a.data.id * 1 == 1 ? "on" : "off";
                    T()
                })
            }
        }, Y = function () {
        }, Z = function (a, b) {
            D = D == "on" ? "off" : "on";
            t.forward_link.innerHTML = a.data.html || "";
            if (t.cmtopts && a.data.permission && a.data.permission.allowComment == 0) {
                t.cmtopts.style.display = "none";
                t.cmtopts.innerHTML = ""
            } else if (t.originLi && a.data.permission && a.data.permission.allowRootComment == 0) {
                t.originLi.style.display = "none";
                t.originLi.innerHTML = ""
            }
        }, _ = function () {
            t.forward_link.innerHTML = b(f.retry)
        }, ba = function (a, b) {
            D = D == "on" ? "off" : "on"
        }, bb = function () {
            a.ui.alert(b(f.netError))
        }, bc = function () {
            x = a.common.trans.forward.getTrans("toMicroblog", {onComplete: function (a, b) {
                var e = {onSuccess: Q, onError: R, requestAjax: x, param: c, onRelease: function () {
                    v = !1;
                    w = "";
                    t.submit.className = "W_btn_d btn_noloading";
                    h(t.btnText, "normal");
                    G = !1;
                    L && L.enable()
                }};
                d.validateIntercept(a, b, e)
            }, onFail: S, onTimeout: R});
            y = a.common.trans.forward.getTrans("setDefault", {onSuccess: ba, onError: bb, onFail: bb});
            z = a.common.trans.forward.getTrans("simpleForwardLinks", {onSuccess: Z, onError: _, onFail: _});
            A = a.common.trans.forward.getTrans("detailForwardLinks", {onSuccess: Z, onError: _, onFail: _})
        }, bd = function () {
        }, be = function () {
            U();
            bc();
            W();
            X();
            bd();
            Y()
        }, bf = function (b) {
            if (M.isInit == !1) {
                k.data.isDialog = b;
                F = b;
                k.data.showArrow = n;
                a.addHTML(i, a.core.util.easyTemplate(e, k.data));
                s || be();
                M.isInit = !0
            } else B && a.setStyle(B, "display", "");
            s.API.focus(0)
        }, bg = function () {
            a.common.extra.shine(s.nodeList.textEl)
        }, bh = function () {
            s.API.blur();
            B != null && a.setStyle(B, "display", "none")
        }, bi = function () {
            a.removeEvent(t.submit, "click", N);
            a.removeEvent(t.textEl, "keypress", O);
            a.custEvent.undefine(M);
            E && E.remove("origin_all", "click");
            E && E.remove("report", "click");
            E && E.remove("switch", "click");
            E && E.remove("retry", "click");
            E && E.remove("show", "click");
            E = null;
            d && d.destroy && d.destroy();
            L && L.destroy && L.destroy();
            s.closeWidget();
            I && clearInterval(I);
            s = null;
            t = null;
            x = null;
            B = null;
            for (var b in M)delete M[b];
            M = null
        };
        M.show = bf;
        M.hide = bh;
        M.shine = bg;
        M.destory = bi;
        return M
    }
});
STK.register("common.forward.toMiyouCircle", function (a) {
    var b = a.kit.extra.language, c = null, d = a.common.dialog.validateCode(), e = b('<#et userlist data><div node-type="toMiyouCircle_client" class="toMicroblog<#if (data.isDialog == true)>Layer</#if>"><#if (data.isDialog == true)><div class="W_tips tips_warn clearfix"><p class="icon"><span class="icon_warnS"></span></p><p class="txt">#L{将微博定向转发到密友圈，只有你的密友可见这条微博。}</p></div><div class="forward_content" node-type="content"><#if (data.showArrow == true)><span class="W_arrow" action-type="origin_all"><em class="down">◆</em></span></#if>${data.content}</div></#if><div class="feed_repeat"><div class="input clearfix"><p class="num" node-type="num">140 #L{字}</p><textarea class="W_input" name="" rows="" cols="" title="#L{转发微博}#L{内容}" node-type="textEl">${data.reason}</textarea><div class="W_tips tips_warn clearfix" node-type="importWrap" style="display:none;"><p class="icon"><span class="icon_warnS"></span></p><p class="txt">#L{导入密友：你还没有密友，快去加}<span node-type="importMiyou"></span>#L{密友吧，跟他们一起分享有趣的信息。}</p></div><div class="action clearfix" node-type="widget"><span class="W_ico16 ico_faces" title="#L{表情}" node-type="smileyBtn"></span><ul node-type="cmtopts" class="commoned_list"><#if (data.forwardNick)><li node-type="forwardLi"><label><input type="checkbox" node-type="forwardInput" class="W_checkbox" />#L{同时评论给} ${data.forwardNick}</label></li></#if><#if (data.originNick)><li node-type="originLi"><label><input type="checkbox" node-type="originInput" class="W_checkbox" /><#if (data.forwardNick)>#L{同时评论给原文作者} <#else>#L{同时评论给} </#if>${data.originNick}</label></li></#if></ul></div><p class="btn"><a suda-data="key=tblog_tran_miyou&value=temporarily_add" action-type="putAside" node-type="putAside" href="javascript:void(0)" onclick="return false" title="#L{暂时不添加}" style="display:none"><span node-type="putAsidetext">#L{暂时不添加}</span></a><a href="#" title="#L{转发}#L{按钮}" onclick="return false;" class="W_btn_d btn_noloading" node-type="submit"><span><b class="loading"></b><em node-type="btnText">#L{转发}</em></span></a></p></div></div><#if (data.isDialog == true)><div node-type="forward_link"></div></#if></div>'), f = {notice: "#L{请输入转发理由}", defUpdate: "#L{转发微博}", netError: "#L{系统繁忙}", success: "#L{转发成功}!", retry: '#L{读取失败，请}<a href="#" onclick="return false;" action-type="retry" value="retry">#L{重试}</a>', off: "#L{关闭}", on: "#L{开启}"}, g = {limitNum: 140, tipText: b(f.notice), count: "disable"};
    return function (h, i, j) {
        (h == null || i == null) && a.log("[common.forward.toMiyouCircle]Required parameter client is missing");
        var k = !0, l, m = j.data, n = 56, o = !1, p = m.originNick ? "@" + m.originNick : "", q = a.kit.extra.toFeedText(m.origin.replace(/<[^>]+>/gi, ""));
        m.content = q + "";
        if (a.bLength(a.core.str.decodeHTML(a.kit.extra.toFeedText(q + p))) > n) {
            m.content = a.leftB(q, n - a.bLength(p)) + "...";
            o = !0
        } else m.content = m.origin;
        p ? p = '<a class="S_func1" href="/' + (m.domain || m.rootuid || m.uid) + '" target="_blank">' + p + "</a>:" : p = "";
        m.content = p + m.content;
        var r = m.reason || "", s = m.forwardNick ? "//@" + m.forwardNick + ":" + " " : "", t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I = !1, J = !1, K, L, M = a.common.forward.utils, N, O = {};
        O.client = h;
        O.opts = j.data || {};
        O.isInit = !1;
        v = a.parseParam({appkey: "", styleId: "1", mark: ""}, O.opts);
        a.custEvent.define(O, ["forward", "hide", "center", "count"]);
        var P = {changeBtnText: function (a, c) {
            c == "normal" ? a.innerHTML = u.importWrap.style.display == "none" ? b("#L{转发}") : b("#L{确认添加并转发}") : a.innerHTML = b("#L{提交中...}")
        }, canForward: function () {
            var a = t.API.count(), c = g.limitNum - a, d = c >= 0 ? !0 : !1;
            if (d) {
                w = !1;
                x = "";
                d && (u.num.innerHTML = b("#L{还可以输入%s字}", "<span>" + c + "</span>"))
            } else {
                w = !0;
                x = "error";
                u.num.innerHTML = b("#L{已经超过%s字}", '<span class="S_error">' + Math.abs(c) + "</span>")
            }
        }, getForwardInfo: function () {
            B.request({mid: i, d_expanded: E, expanded_status: J ? F === "on" ? 1 : 2 : ""});
            J = !0
        }, setSwitchStatus: function (b) {
            if (b == null)throw new Error("[common.forward.toMicroblog]function - setSwitchStatus required parameter sStatus is missing");
            z.request({d_expanded: b});
            a.core.util.storage.set("forward_link_status", b);
            E = b
        }}, Q = {updateForward: function (d) {
            if (w)x === "error" && a.common.extra.shine(u.textEl); else {
                var e = a.trim(t.API.getWords() || "");
                e === b(f.notice) && (e = "");
                w = !0;
                x = "loading";
                u.submit.className = "W_btn_a_disable";
                P.changeBtnText(u.btnText, "loading");
                var g = {};
                g.appkey = v.appkey;
                g.mid = i;
                g.style_type = v.styleId;
                g.mark = v.mark;
                g.reason = e || b(f.defUpdate);
                u.importWrap.style.display != "none" && (g.uids = l || "");
                u.originInput && u.originInput.checked && (g.is_comment_base = "1");
                if (u.forwardInput && u.forwardInput.checked) {
                    g.is_comment = "1";
                    I = !0
                }
                g.rank = 2;
                g.rankid = "";
                g.group_source = "group_all";
                g.location = "tranlayout";
                g.module = "tranlayout";
                if (m.postdata) {
                    var h = m.postdata.split(";");
                    for (var j = 0; h[j]; j++) {
                        var k = h[j].split(",");
                        k[0] && k[0] && (g[k[0]] = k[1])
                    }
                }
                c = g;
                if (M.checkAtNum(e) > 5) {
                    a.ui.confirm(b("#L{单条微博里面@ 太多的人，可能被其它用户投诉。如果投诉太多可能会被系统封禁。是否继续转发？}"), {OK: function () {
                        y.request(g)
                    }, cancel: function () {
                        w = !1;
                        x = "";
                        u.submit.className = "W_btn_d btn_noloading";
                        P.changeBtnText(u.btnText, "normal")
                    }});
                    return
                }
                y.request(g)
            }
        }, putAside: function () {
            u.importWrap.style.display = "none";
            u.putAside.style.display = "none";
            u.btnText.innerHTML = b("#L{转发}");
            u.submit.removeAttribute("suda-data")
        }, ctrlUpdateForward: function (a) {
            if ((a.keyCode === 13 || a.keyCode === 10) && a.ctrlKey) {
                t.API.blur();
                Q.updateForward()
            }
        }}, R = function () {
            E = a.core.util.storage.get("forward_link_status");
            E == "null" && (E = "off");
            F = E
        }, S = function (d, e) {
            w = !1;
            x = "";
            c = null;
            u.submit.className = "W_btn_d btn_noloading";
            P.changeBtnText(u.btnText, "normal");
            try {
                d.data.isComment = I;
                d.data.isToMiniBlog = !0;
                a.custEvent.fire(O, "forward", [d.data, e, j.inDialog]);
                a.common.channel.feed.fire("forward", [d.data, e, j.inDialog])
            } catch (g) {
            }
            a.custEvent.fire(O, "hide");
            setTimeout(function () {
                a.ui.litePrompt(b(f.success), {type: "succM", timeout: "500"})
            }, 150);
            Q.putAside();
            I = !1;
            t.API.reset()
        }, T = function (c, d) {
            w = !1;
            x = "";
            u.submit.className = "W_btn_d btn_noloading";
            P.changeBtnText(u.btnText, "normal");
            c.msg = c.msg || b(f.netError);
            a.common.layer.ioError(c.code, c);
            I = !1
        }, U = function (c, d) {
            w = !1;
            x = "";
            u.submit.className = "W_btn_d btn_noloading";
            P.changeBtnText(u.btnText, "normal");
            a.ui.alert(b(f.netError))
        }, V = function (a, b) {
            F = F == "on" ? "off" : "on"
        }, W = function () {
            a.ui.alert(b(f.netError))
        }, X = function (a, b) {
            F = F == "on" ? "off" : "on";
            u.forward_link.innerHTML = a.data.html || "";
            if (u.cmtopts && a.data.permission && a.data.permission.allowComment == 0) {
                u.cmtopts.style.display = "none";
                u.cmtopts.innerHTML = ""
            } else if (u.originLi && a.data.permission && a.data.permission.allowRootComment == 0) {
                u.originLi.style.display = "none";
                u.originLi.innerHTML = ""
            }
        }, Y = function () {
            u.forward_link.innerHTML = b(f.retry)
        }, Z = function () {
            C = a.common.trans.forward.getTrans("importMiyou", {onSuccess: function (c) {
                k = c.data && !c.data.show_recom;
                if (!k) {
                    var d = c.data && c.data.list, e = "";
                    if (a.core.arr.isArray(d) && d.length != 0) {
                        for (var f = 0, g = d.length; f < g; f++)e += '<a class="name" href="' + d[f].url + '">@' + d[f].name + "</a>";
                        u.importMiyou.innerHTML = e;
                        u.importWrap.style.display = "";
                        u.putAside.style.display = "";
                        u.btnText.innerHTML = b("#L{确认添加并转发}");
                        u.submit.setAttribute("suda-data", "key=tblog_tran_miyou&value=confirm_add_tran")
                    }
                    l = c.data && c.data.ids
                }
            }, onError: function () {
            }}).request({});
            y = a.common.trans.forward.getTrans("toMiyouCircle", {onComplete: function (a, b) {
                var e = {onSuccess: S, onError: T, requestAjax: y, param: c, onRelease: function () {
                    w = !1;
                    x = "";
                    u.submit.className = "W_btn_d btn_noloading";
                    P.changeBtnText(u.btnText, "normal");
                    I = !1
                }};
                d.validateIntercept(a, b, e)
            }, onFail: U, onTimeout: T});
            z = a.common.trans.forward.getTrans("setDefault", {onSuccess: V, onError: W, onFail: W});
            A = a.common.trans.forward.getTrans("simpleForwardLinks", {onSuccess: X, onError: Y, onFail: Y});
            B = a.common.trans.forward.getTrans("detailForwardLinks", {onSuccess: X, onError: Y, onFail: Y})
        }, _ = function () {
            D = a.builder(h);
            D = a.kit.dom.parseDOM(D.list).toMiyouCircle_client;
            t = a.common.editor.base(D, g);
            t.widget(a.common.editor.widget.face(), "smileyBtn");
            u = t.nodeList;
            a.addEvent(u.textEl, "focus", function () {
                K = setInterval(function () {
                    P.canForward()
                }, 200)
            });
            a.addEvent(u.textEl, "blur", function () {
                clearInterval(K)
            });
            t.API.insertText(s + a.core.str.decodeHTML(a.kit.extra.toFeedText(r)));
            a.kit.dom.autoHeightTextArea({textArea: u.textEl, maxHeight: 145, inputListener: a.funcEmpty});
            H && P.getForwardInfo()
        }, ba = function () {
            a.addEvent(u.submit, "click", Q.updateForward);
            a.addEvent(u.putAside, "click", Q.putAside);
            a.addEvent(u.textEl, "keypress", Q.ctrlUpdateForward);
            if (H) {
                G = a.delegatedEvent(D);
                G.add("origin_all", "click", function (a) {
                    u.content.innerHTML = p + m.origin
                });
                G.add("report", "click", function (b) {
                    return a.common.content.report(b)
                });
                G.add("switch", "click", function (c) {
                    var d = {1: "on", 2: "off"}, e = d[c.data.id];
                    P.setSwitchStatus(e);
                    a.setStyle(c.el, "left", e == "on" ? "23px" : "0px");
                    c.el.setAttribute("action-data", e == "on" ? "id=2" : "id=1");
                    c.el.setAttribute("title", e == "on" ? b(f.off) : b(f.on))
                });
                G.add("retry", "click", function (a) {
                    P.getForwardInfo()
                });
                G.add("show", "click", function (a) {
                    F = a.data.id * 1 == 1 ? "on" : "off";
                    P.getForwardInfo()
                })
            }
        }, bb = function () {
            R();
            Z();
            _();
            ba()
        }, bc = function (b) {
            if (O.isInit == !1) {
                j.data.isDialog = b;
                H = b;
                j.data.showArrow = o;
                a.addHTML(h, a.core.util.easyTemplate(e, j.data));
                t || bb();
                O.isInit = !0
            } else D && a.setStyle(D, "display", "");
            t.API.focus(0)
        }, bd = function () {
            a.common.extra.shine(t.nodeList.textEl)
        }, be = function () {
            t.API.blur();
            D != null && a.setStyle(D, "display", "none")
        }, bf = function () {
            a.removeEvent(u.submit, "click", Q.updateForward);
            a.removeEvent(u.putAside, "click", Q.putAside);
            a.removeEvent(u.textEl, "keypress", Q.ctrlUpdateForward);
            a.custEvent.undefine(O);
            G && G.remove("origin_all", "click");
            G && G.remove("report", "click");
            G && G.remove("switch", "click");
            G && G.remove("retry", "click");
            G && G.remove("show", "click");
            G = null;
            d && d.destroy && d.destroy();
            t.closeWidget();
            K && clearInterval(K);
            t = null;
            u = null;
            y = null;
            D = null;
            for (var b in O)delete O[b];
            O = null
        };
        O.show = bc;
        O.hide = be;
        O.shine = bd;
        O.destory = bf;
        return O
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
STK.register("common.content.message.upload.getExt", function (a) {
    var b = {csv: "csv", doc: "word", docx: "word", xls: "excel", xlsx: "excel", ppt: "ppt", pptx: "ppt", pdf: "pdf", rar: "rar", zip: "rar", txt: "txt", mp3: "music", avi: "video", flv: "video", mkv: "video", mp4: "video", mpeg: "video", mpg2: "video", rmvb: "video"};
    return function (c) {
        var d = a.trim(c.match(/[^\.]+$/)[0]).toLowerCase();
        return typeof b[d] != "undefined" ? b[d] : "default"
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
STK.register("common.forward.toPrivateMsg", function (a) {
    var b = a.kit.extra.language, c, d, e = {limitNum: 300, count: "disable"}, f = b('<#et userlist data><div node-type="toPrivateMsg_client" class="toPrivateMsg<#if (data.isDialog == true)>Layer</#if>"><dl class="${data.className} clearfix"><dt>#L{收信人：}</dt><dd><input type="text" name="" class="W_input" node-type="msgTo" value="${data.msgTo}" /></dd><dt>#L{内　容：}</dt><dd><div class="feed_repeat"><div class="input clearfix" node-type="uploadTd"><div class="action clearfix actionControl" node-type="widget"><a class="W_ico16 ico_faces" title="#L{表情}" href="#" onclick="return false;" node-type="smileyBtn"></a><a class="W_ico16 icon_sw_img" title="#L{图片}" href="#" onclick="return false;" node-type="picBtn"></a><a class="W_ico16 icon_sw_accessory" title="#L{文件}" href="#" onclick="return false;" node-type="attachBtn"></a><div id="uploadSwf" node-type="uploadSwf" class="flash" style="background:#000;filter:alpha(opacity=0)9;opacity:0;"></div></div><p class="num" node-type="num">#L{还可输入 } <span>' + e.limitNum + "</span> #L{字}</p>" + '<textarea class="W_input" name="" rows="" cols="" title="#L{转发到}#L{私信}#L{内容}" node-type="textEl">#L{给你推荐一条微博} &#13;&#10;' + "<#if (data.url)>" + "${data.url}" + "</#if>" + "</textarea>" + '<p class="btn"><a href="#" title="#L{转发}#L{按钮}" onclick="return false;" class="W_btn_d btn_noloading" node-type="submit"><span><b class="loading"></b><em node-type="btnText">#L{发送}</em></span></a></p>' + '<ul class="p_sendlist" node-type="uploadList" style="display:none" fid=""></ul>' + "</div>" + "</div>" + "</dd>" + "</dl>" + "</div>"), g = {notice: "#L{请输入转发理由}", nameNotice: "#L{请输入收信人昵称}", defUpdate: "#L{转发微博}", netError: "#L{系统繁忙}", success: "#L{转发成功}!", retry: '#L{读取失败，请}<a href="#" onclick="return false;" action-type="retry" value="retry">#L{重试}</a>', off: "#L{关闭}", on: "#L{开启}"}, h = function (a, c) {
        c == "normal" ? a.innerHTML = b("#L{发送}") : a.innerHTML = b("#L{提交中...}")
    };
    return function (i, j, k) {
        function K() {
            a.trim(o.msgTo.value) === b(g.nameNotice) && (o.msgTo.value = "")
        }

        function J() {
            a.trim(o.msgTo.value) === "" && (o.msgTo.value = b(g.nameNotice))
        }

        function I() {
            a.removeEvent(o.msgTo, "focus", I);
            y = new a.common.bubble.myFollowSuggest({textNode: o.msgTo, callback: function (a) {
            }});
            y.show()
        }

        var l = a.common.dialog.validateCode();
        if (i == null || j == null)throw new Error("[common.forward.toPrivateMsg]Required parameter client is missing");
        var m = k.data, n, o, p, q, r, s, t, u, v, w, x = a.common.forward.utils, y, z = {};
        z.client = i;
        z.opts = k || {};
        z.isInit = !1;
        a.custEvent.define(z, ["forward", "hide", "center"]);
        var A = function () {
            q = !1;
            r = "";
            o.submit.className = "W_btn_d btn_noloading";
            h(o.btnText, "normal")
        }, A = function () {
            if (d) {
                q = !1;
                r = "";
                d = null;
                o.submit.className = "W_btn_d btn_noloading";
                h(o.btnText, "normal")
            }
        }, B = function () {
            if (d) {
                var b = a.common.content.message.upload.getFlash(c), e = 1;
                if (b && b.getUploadStatus)try {
                    e = b.getUploadStatus()
                } catch (f) {
                    e = b.getUploadStatus
                } else e = 0;
                if (e == 0) {
                    var g = o.uploadList.getAttribute("fid") || "";
                    g.length != 0 && (g = g.substring(0, g.length - 1));
                    d.fids = g;
                    d = a.common.getDiss(d, o.submit);
                    if (m && m.postdata) {
                        var h = m.postdata.split(";");
                        for (var i = 0; h[i]; i++) {
                            var j = h[i].split(",");
                            j[0] && j[0] && (d[j[0]] = j[1])
                        }
                    }
                    s.request(d)
                }
            }
        }, C = function () {
            var c = n.API.getExtra();
            if (q)r === "error" && a.common.extra.shine(o.textEl); else {
                var e = a.trim(n.API.getWords() || "");
                e === b(g.notice) && (e = "");
                var f = a.trim(o.msgTo.value);
                f === b(g.nameNotice) && (f = "");
                if (e === "") {
                    a.common.extra.shine(o.textEl);
                    return
                }
                q = !0;
                r = "loading";
                o.submit.className = "W_btn_a_disable";
                h(o.btnText, "loading");
                var i = {};
                i.text = e || b(g.defUpdate);
                var k = o.uploadList.getAttribute("fid") || "";
                if (k.length != 0) {
                    k = k.substring(0, k.length - 1);
                    i.fids = k
                }
                i.appkey = z.opts.data.appkey;
                i.id = j;
                i.screen_name = f;
                d = i;
                B()
            }
        }, D = function (b) {
            if ((b.keyCode === 13 || b.keyCode === 10) && b.ctrlKey) {
                n.API.blur();
                a.core.evt.fireEvent(o.submit, "click")
            }
        }, E = function () {
            var a = n.API.count(), c = e.limitNum - a, d = c >= 0 ? !0 : !1;
            if (d) {
                q = !1;
                r = "";
                d && (o.num.innerHTML = b("#L{还可以输入%s字}", "<span>" + c + "</span>"))
            } else {
                q = !0;
                r = "error";
                o.num.innerHTML = b("#L{已经超过%s字}", '<span class="S_error">' + Math.abs(c) + "</span>")
            }
        }, F = function (c, e) {
            d = null;
            q = !1;
            r = "";
            o.submit.className = "W_btn_d btn_noloading";
            h(o.btnText, "normal");
            try {
                a.custEvent.fire(z, "forward", [c.data, e, k.inDialog]);
                a.common.channel.feed.fire("forward", [c.data, e, k.inDialog])
            } catch (f) {
            }
            a.custEvent.fire(z, "hide");
            setTimeout(function () {
                a.ui.litePrompt(b(g.success), {type: "succM", timeout: "500"})
            }, 150);
            n.API.reset();
            w.reset()
        }, G = function (b, c) {
            q = !1;
            d = null;
            r = "";
            o.submit.className = "W_btn_d btn_noloading";
            h(o.btnText, "normal");
            a.common.layer.ioError(b.code, b)
        }, H = function (b, c) {
            q = !1;
            r = "";
            d = null;
            o.submit.className = "W_btn_d btn_noloading";
            h(o.btnText, "normal");
            a.common.layer.ioError(b.code, b)
        }, L = function () {
            var b;
            t = a.builder(i);
            b = a.kit.dom.parseDOM(t.list);
            t = b.toPrivateMsg_client;
            n = a.common.editor.base(t, e);
            n.widget(a.common.editor.widget.face(), "smileyBtn");
            c = a.common.content.message.upload.loadSwf(b.uploadTd);
            w = a.common.content.message.upload.delegateEvt(b.uploadList);
            o = n.nodeList;
            a.addEvent(o.textEl, "focus", function () {
                v = setInterval(function () {
                    E()
                }, 200)
            });
            a.addEvent(o.textEl, "blur", function () {
                clearInterval(v)
            });
            a.kit.dom.autoHeightTextArea({textArea: o.textEl, maxHeight: 145, inputListener: a.funcEmpty})
        }, M = function () {
            a.addEvent(o.submit, "click", C);
            a.addEvent(o.textEl, "keypress", D);
            a.addEvent(o.msgTo, "focus", I);
            a.addEvent(o.msgTo, "focus", K);
            a.addEvent(o.msgTo, "blur", J)
        }, N = function () {
        }, O = function () {
            s = a.common.trans.message.getTrans("create", {onComplete: function (a, b) {
                var c = {onSuccess: F, onError: G, requestAjax: s, param: b, onRelease: function () {
                    q = !1;
                    d = null;
                    r = "";
                    o.submit.className = "W_btn_d btn_noloading";
                    h(o.btnText, "normal")
                }};
                l.validateIntercept(a, b, c)
            }, onFail: H})
        }, P = function () {
            a.common.channel.flashUpImg.register("completeUpload", B);
            a.common.channel.flashUpImg.register("cannelUpload", A)
        }, Q = function () {
            O();
            L();
            M();
            N();
            P()
        }, R = function (c) {
            if (z.isInit == !1) {
                k.data.className = c ? "layer_forward_group" : "forward__letter";
                u = c;
                k.data.msgTo = b(g.nameNotice);
                k.data.isDialog = c;
                k.data.origin = a.trim(k.data.origin);
                k.data.url && (k.data.url = k.data.url.replace(/\?.*$/, ""));
                a.addHTML(i, a.core.util.easyTemplate(f, k.data));
                n || Q();
                z.isInit = !0
            } else t && a.setStyle(t, "display", "");
            n.API.focus(0)
        }, S = function () {
            n.API.blur();
            t != null && a.setStyle(t, "display", "none")
        }, T = function () {
            a.removeEvent(o.submit, "click", C);
            a.removeEvent(o.textEl, "keypress", D);
            a.removeEvent(o.msgTo, "focus", K);
            a.removeEvent(o.msgTo, "blur", J);
            a.custEvent.undefine(z);
            y && y.destroy();
            n.closeWidget();
            d = null;
            v && clearInterval(v);
            l && l.destroy && l.destroy();
            n = null;
            o = null;
            s = null;
            t = null;
            for (var b in z)delete z[b];
            z = null
        };
        z.show = R;
        z.hide = S;
        z.destory = T;
        return z
    }
});
STK.register("common.forward.publisher", function (a) {
    var b = a.kit.extra.language, c = a.common.forward, d = b('<#et userlist data><div node-type="forward_tab" class="profile_tab S_line5"><ul class="pftb_ul S_line1"><li class="pftb_title">#L{转发到}：</li><#list data.tab as list><li <#if (list.last_one)> class="pftb_itm pftb_itm_lst S_line1" <#else> class="pftb_itm S_line1" </#if>><#if (list.id==3)><span class="icon_rtnew"></span></#if><a href="#" onclick="return false;" action-type="tab_item" action-data="id=${list.id}"<#if (list.id==data.type)> class="pftb_lk S_line5 S_txt1 S_bg5 current"<#else> class="pftb_lk S_line5 S_txt1 S_bg1"</#if><#if (list.suda)> suda-data="key=tblog_tran_miyou&value=miyou_group_click"</#if>>${list.name}<#if (list.id==3)><i title="#L{他是你的密友哦~}" class="W_ico16 i_conn_close_friend"></i></#if></a></li></#list></ul></div><div node-type="forward_client"></div>'), e = [
        {id: 1, name: b("#L{我的微博}"), first_one: !0},
        {id: 3, name: b("#L{密友圈}"), suda: !0},
        {id: 2, name: b("#L{私信}"), last_one: !0}
    ];
    return function (f, g) {
        if (f == null)throw new Error("[common.forward.publisher]Required parameter mid is missing");
        g = g || {type: 1, styleId: "1"};
        var h = {instances: {}}, i = g.type, j, k, l, m, n, o, p = a.kit.extra.toFeedText, q = {1: c.toMicroblog, 2: c.toPrivateMsg, 3: c.toMiyouCircle}, r = {appkey: "", domInit: !1, forwardNick: "", originNick: "", origin: "", reason: "", url: null, styleId: "1", allowComment: "1", allowForward: "1", allowRootComment: "1", uid: "", rootuid: "", pid: "", domain: "", mark: "", postdata: ""}, s = function () {
            if (g.domInit == !1)var b = a.core.util.easyTemplate(d), c = b({type: i, tab: e, tab_count: e.length}).toString(), f = a.builder(c);
            var h = a.kit.dom.parseDOM(f.list);
            j = h.forward_tab;
            k = h.forward_client;
            return f.box
        };
        a.custEvent.define(h, ["hide", "center", "forward"]);
        var t = function (a) {
            if (f == null)throw new Error("[common.forward.publisher]Required parameter inner is missing");
            l = a;
            v();
            w(i, {data: g, client: k})
        }, u = function (a) {
            m && (m.className = "pftb_lk S_line5 S_txt1 S_bg1");
            m = a.el;
            m.className = "pftb_lk S_line5 S_txt1 S_bg5 current";
            i = a.data.id || i;
            w(i, {data: g, client: k})
        }, v = function () {
            m = a.sizzle('a[class="pftb_lk S_line5 S_txt1 S_bg5 current"]', l);
            m = m.length > 0 ? m[0] : null;
            var b = a.sizzle('div[node-type="forward_tab"]', l);
            b = b.length > 0 ? b[0] : null;
            if (b) {
                n = a.delegatedEvent(b);
                n.add("tab_item", "click", function (a) {
                    i != a.data.id && u(a)
                })
            }
        }, w = function (c, d) {
            o != null && o.hide();
            c = c.toString();
            var e;
            if (h.instances[c] == null) {
                var g = {}, i;
                for (var j in r)g[j] = d.data[j];
                g.type = c;
                i = {client: k, data: g, inDialog: !0};
                if (parseInt(c) != 1) {
                    if (i.data.allowForward === "0") {
                        i.data.originNick = "";
                        i.data.origin = b("#L{此微博已被原作者删除}")
                    }
                    i.data.reason = p(i.data.reason);
                    i.data.origin = p(i.data.origin)
                }
                e = q[c](k, f, i);
                h.instances[c] = e;
                a.custEvent.add(e, "hide", function () {
                    a.custEvent.fire(h, "hide")
                });
                a.custEvent.add(e, "center", function () {
                    a.custEvent.fire(h, "center")
                });
                a.custEvent.add(e, "forward", function (b, c) {
                    a.custEvent.fire(h, "forward", c)
                })
            } else e = h.instances[c];
            e.show(!0);
            o = e
        }, x = function () {
            for (var b in h.instances) {
                var c = h.instances[b];
                c.destory();
                c = null
            }
            h.instances = null;
            a.custEvent.undefine(h);
            j = null;
            k = null;
            l = null;
            m = null;
            n && n.remove("tab_item", "click");
            n = null
        };
        h.getDom = s;
        h.init = t;
        h.destroy = x;
        return h
    }
});
STK.register("common.dialog.forward", function (a) {
    var b = {title: "#L{转发微博}", commentPerson: "#L{同时评论给}", originPerson: "#L{同时评论给原文作者}", notice: "#L{请输入转发理由}", defUpdate: "#L{转发微博}"}, c = a.kit.extra.language;
    return function (d) {
        var e = {}, f, g, h, i;
        f = a.parseParam({styleId: "1"}, d);
        var j;
        a.custEvent.define(e, ["forward", "hide", "show"]);
        var k = function (d, f) {
            if (typeof d != "string" && typeof d != "number")throw new Error("$.common.dialog.forward.show need string (or number) as weiboId");
            g = d;
            f.pic && (f.pid = f.pic);
            var k = a.parseParam({appkey: "", type: 1, origin: "", reason: "", originNick: "", forwardNick: "", title: c(b.title), domInit: !1, url: null, styleId: "1", allowComment: "1", allowForward: "1", allowRootComment: "1", pid: "", domain: "", mark: "", postdata: ""}, f);
            i = a.ui.dialog();
            i.setTitle(k.title);
            h = new a.common.forward.publisher(g, k);
            i.appendChild(h.getDom());
            i.setBeforeHideFn(function () {
                j.className = "detail";
                h.destroy();
                i.clearBeforeHideFn()
            });
            j = i.getInner();
            j.className = "detail layer_forward";
            j.style.height = "260px";
            i.show();
            m();
            h.init(j);
            j.style.height = "";
            a.custEvent.add(h, "hide", function () {
                l()
            });
            a.custEvent.add(h, "center", function () {
            });
            a.custEvent.add(h, "forward", function (b, c) {
                a.custEvent.fire(e, "forward", c)
            });
            a.custEvent.add(i, "hide", function () {
                var b = i, c = arguments.callee;
                a.custEvent.remove(b, "hide", c);
                i = null;
                b = null;
                a.custEvent.fire(e, "hide")
            });
            a.custEvent.fire(e, "show", {box: i});
            e.publisher = h
        }, l = function () {
            n();
            i.hide()
        }, m = function () {
            i.setMiddle(j)
        }, n = function () {
            h.destroy()
        };
        e.show = k;
        e.destroy = n;
        return e
    }
});
STK.register("common.feed.feedList.plugins.forward", function (a) {
    var b = a.common.feed.feedList.utils, c = a.kit.extra.language("#L{转发}"), d = a.kit.extra.language;
    return function (e, f) {
        if (!e)a.log("forward : need object of the baseFeedList Class"); else {
            f = a.parseParam({forwardStyleId: "1"}, f);
            var g = e.getNode(), h = {}, i, j, k = !1, l = function (d, e) {
                k = !1;
                if (!j) {
                    j = a.common.dialog.forward({styleId: e.forwardStyleId});
                    a.custEvent.add(j, "forward", function (a, b) {
                        if (!!i && !!b.isToMiniBlog) {
                            var d = i.innerHTML.match(/\(([\d]*)\)/);
                            i.innerHTML = c + "(" + (d ? parseInt(d[1]) + 1 : 1) + ")"
                        }
                    });
                    a.custEvent.add(j, "show", function (c, d) {
                        if (d && d.box) {
                            var e = d.box.getOuter(), f = a.common.getDiss({module: "tranlayout"}, b.getFeedNode(i, g));
                            delete f.location;
                            e.setAttribute("diss-data", a.core.json.jsonToQuery(f))
                        }
                    });
                    a.custEvent.add(j, "hide", function () {
                        a.core.util.browser.IE6 && document.body.focus();
                        (function (a) {
                            setTimeout(function () {
                                try {
                                    a && a.focus()
                                } catch (b) {
                                }
                            }, 200)
                        })(i)
                    })
                }
                j.show(d, e)
            }, m = function (c, e) {
                i = c;
                var f = c.getAttribute("error-msg");
                if (f) {
                    a.ui.alert(f);
                    return b.preventDefault()
                }
                if (e.allowForward == "0") {
                    a.ui.alert(d("#L{抱歉，此微博已经被删除，无法进行转发哦，请试试其他内容吧。 }"));
                    return b.preventDefault()
                }
                var h = b.getMid(c, g), j = b.getFeedNode(c, g), m = {}, n = a.sizzle('[node-type="feed_list_content"]', j)[0];
                m.uid = e.uid ? e.uid : "";
                m.uid = e.rootuid ? e.rootuid : "";
                m.url = (e || "") && e.url;
                if (!n) {
                    a.log("forward : there is not '[node-type=\"feed_list_content\"]' in the feed_item ");
                    return b.preventDefault()
                }
                var o = a.sizzle('[node-type="feed_list_reason"]', n)[0];
                if (!o) {
                    var p = a.sizzle("[nick-name]", j);
                    p.length && (m.originNick = p[0].getAttribute("nick-name"));
                    m.reason = n.innerHTML
                } else {
                    m.originNick = a.sizzle('[node-type="feed_list_originNick"]', n)[0].getAttribute("nick-name") || "";
                    m.reason = (o.innerHTML || "").replace(/[\r\n]+/g, "")
                }
                var q = a.sizzle('[node-type="feed_list_forwardContent"]', j)[0];
                if (q) {
                    m.forwardNick = e.name || m.originNick;
                    m.originNick = a.sizzle('[node-type="feed_list_originNick"]', q)[0].getAttribute("nick-name");
                    var r = a.sizzle('[node-type="feed_list_reason"]', q)[0];
                    if (!r) {
                        a.log("forward : there is not 'em' node in the feed_list_forwardContent node ");
                        return b.preventDefault()
                    }
                    m.origin = r.innerHTML
                } else {
                    m.origin = m.reason;
                    delete m.reason
                }
                for (var s in e)m[s] = e[s];
                if (!k) {
                    k = !0;
                    l(h, m)
                }
            };
            e.getDEvent().add("feed_list_forward", "click", function (c) {
                var d = c.el, e = d.dataset && d.dataset.mark || d.getAttribute("data-mark") || "", f = {};
                e && (f = a.queryToJson(e));
                c.data = a.core.json.merge(c.data, f);
                m(c.el, c.data);
                return b.preventDefault()
            });
            h.showForward = m;
            h.destroy = function () {
                if (j) {
                    a.custEvent.remove(j);
                    j.destroy();
                    j = null
                }
                i = e = g = null
            };
            return h
        }
    }
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
STK.register("ui.tipAlert", function (a) {
    var b = a.core.util.easyTemplate;
    return function (c) {
        c = a.parseParam({direct: "up", showCallback: a.core.func.empty, hideCallback: a.core.func.empty, type: "succ", msg: ""}, c);
        var d = a.ui.tipPrototype(c), e = d.getInner(), f = d.getOuter();
        f.className = "W_layer";
        e.className = "bg";
        var g = c.template || '<#et temp data><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div node-type="msgDiv" class="content layer_mini_info"><p class="clearfix"><span class="icon_${data.type}"></span>${data.msg}&nbsp; &nbsp; &nbsp; </p></div></td></tr></tbody></table></#et>', h = a.builder(b(g, {type: c.type, msg: c.msg}).toString());
        d.setContent(h.box);
        var i = d.destroy;
        d.destroy = function () {
            i();
            d = null
        };
        return d
    }
});
STK.register("common.feed.feedList.plugins.deleteFeed", function (a) {
    var b = a.common.feed.feedList.utils, c, d, e, f = a.common.channel.feed, g = a.kit.extra.language, h = a.core.util.templet, i = {DERRORTEXT: g("#L{删除失败}！"), TIPCONFIRM: g('<table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div class="content layer_mini_info layer_mini_center">#{CONTENT}<p class="btn"><a node-type="ok" class="W_btn_a" href="javascript:void(0)"><span>#L{确定}</span></a><a node-type="cancel" class="W_btn_b" href="javascript:void(0)"><span>#L{取消}</span></a></p></div></td></tr></tbody></table>'), DELETETOP: g('<p class="texta_c clearfix">#L{此条微博为置顶状态，}</p><p class="texta_c clearfix">#L{确认要删除这条微博吗？}</p>')}, j = function (b, d) {
        e = a.ui.tipAlert({showCallback: function () {
            setTimeout(function () {
                e.anihide()
            }, 600)
        }, hideCallback: function () {
            c = undefined;
            e.destroy();
            e = null
        }, msg: b, type: "error", direct: "down"});
        e.setLayerXY(d);
        e.aniShow()
    }, k = function (c, d, e, g) {
        var h = b.getFeedNode(e, g);
        h.style.height = h.offsetHeight + "px";
        h.style.overflow = "hidden";
        var i = a.tween(h, {end: function () {
            var b = a.core.dom.neighbor(h).parent('[action-type="feed_list_item"]').finish(), d = h.getAttribute("mid"), f = a.sizzle('[node-type="followNum"]', b), j = a.sizzle('[node-type="feed_merge_lists"]', b)[0], k = a.sizzle('[node-type="feed_list_portraitBox"]', b)[0], l, m = a.sizzle("li", k);
            a.foreach(m, function (b) {
                var c = b.getAttribute("prev_id");
                c == d && a.removeNode(b)
            });
            if (f.length != 0) {
                a.foreach(f, function (a) {
                    l = parseInt(a.innerHTML, 10) - 1;
                    a.innerHTML = l
                });
                f[0] && parseInt(f[0].innerHTML, 10) == 0 && a.removeNode(j)
            }
            h.innerHTML = "";
            a.removeNode(h);
            g = e = h = null;
            i.destroy();
            c.getFeedCount() < 1 && window.location.reload()
        }}).play({height: 0});
        f.fire("delete")
    };
    return function (f) {
        if (!f)a.log("deleteFeed : need object of the baseFeedList Class"); else {
            var g = f.getNode(), l = f.getDEvent(), m = {}, n = {init: function () {
                n.bind()
            }, bind: function () {
                f.getDEvent().add("feed_list_delete", "click", n.requestDelete)
            }, requestDelete: function (e) {
                a.custEvent.fire(f, "clearTips", "deleteFeed");
                var l = e.el, m = b.getMid(l, g);
                if (c != m) {
                    c = m;
                    var n = b.getFeedNode(l, g).getAttribute("feedtype"), o = {okCallback: function () {
                        b.getFeedTrans("delete", {onSuccess: function () {
                            k(f, m, l, g)
                        }, onFail: function () {
                            j(i.DERRORTEXT, l)
                        }, onError: function (b) {
                            b.code == "100003" ? a.common.layer.ioError(b.code, b) : j(b.msg, l)
                        }}).request({mid: m})
                    }, hideCallback: function () {
                        c = undefined
                    }, direct: "down"};
                    n && n == "top" && (o.template = h(i.TIPCONFIRM, {CONTENT: i.DELETETOP}));
                    d = a.ui.tipConfirm(o);
                    d.setLayerXY(l);
                    d.aniShow();
                    return b.preventDefault(e.evt)
                }
            }, hideTip: function (a) {
                d && (a ? d.hide() : d.anihide())
            }, destroy: function () {
                e && e.destroy();
                d && d.destroy();
                d = e = okCallback = n = m = null
            }};
            n.init();
            m.hideTip = n.hideTip;
            m.destroy = n.destroy;
            return m
        }
    }
});
STK.register("common.favorite.favorite", function (a) {
    var b = a.kit.extra.language, c = b("#L{成功}!"), d = b("#L{失败}!"), e = b("#L{取消收藏}"), f = b("#L{收藏}"), g = b("#L{加标签}"), h, i = "", j = b("#L{您已经收藏过此微博}！"), k = b("#L{添加收藏标签}"), l = b("#L{收藏成功!}"), m = function (b, c, d) {
        if (!!b) {
            h = a.ui.tipAlert({showCallback: function () {
                setTimeout(function () {
                    h && h.anihide()
                }, d ? 1500 : 600)
            }, hideCallback: function () {
                h && h.destroy();
                h = null
            }, msg: b, type: d ? "del" : undefined});
            h.setLayerXY(c);
            h.aniShow()
        }
    }, n, o, p, q = function (c) {
        return a.ui.tipConfirm({info: b("#L{确认要取消收藏这条微博吗？}"), okCallback: function () {
            n && n()
        }, hideCallback: function () {
            o && o()
        }})
    }, r = function (b, g, h, i, j, k, l) {
        var n = i == "add" ? f : e, o = a.common.getDiss({mid: g, mark: k}, h);
        o = a.core.json.merge(o, l);
        a.common.trans.favorite.getTrans(i, {onSuccess: function (d) {
            i == "add" ? d.data && !d.data.ispower && (j = !0) : j = !0;
            j && m(n + c, h);
            a.custEvent.fire(b, "success", d)
        }, onFail: function () {
            m(n + d, h, !0);
            a.custEvent.fire(b, "fail")
        }, onError: function (c) {
            m(c.msg || n + d, h, !0);
            a.custEvent.fire(b, "error", c)
        }}).request(o)
    };
    return function (b, d) {
        var e = {};
        b = a.parseParam({showTip: !0, mid: null, node: null, mark: ""}, b);
        if (!b.mid || !b.node)a.log("opts.mid, opts.node 都不能为空!"); else {
            a.custEvent.define(e, ["success", "showForward", "fail", "error", "cancel"]);
            e.add = function () {
                r(e, b.mid, b.node, "add", b.showTip, b.mark, d)
            };
            e.del = function () {
                n = function () {
                    r(e, b.mid, b.node, "del", b.showTip, b.mark, d)
                };
                o = function () {
                    a.custEvent.fire(e, "cancel")
                };
                p = p || q();
                p.setLayerXY(b.node);
                p.aniShow()
            };
            e.hideTip = function () {
                h && h.hide()
            };
            e.anihideTip = function () {
                h && h.anihide()
            };
            e.msgTipDetroy = function () {
                h && h.destroy();
                h = null
            };
            e.destroy = function () {
                h && h.destroy();
                a.custEvent.undefine(e);
                e = b = h = p = null
            };
            e.showSuccTip = function (a) {
                m(g + c, a)
            };
            e.showErrTip = function (a, b) {
                m(b, a, !0)
            };
            return e
        }
    }
});
STK.register("kit.items.DataController", function (a) {
    return function (b) {
        var c = {}, d = {}, e = [], f = 0;
        a.custEvent.define(c, ["DispItem", "DeletedItem", "ItemSuggest"]);
        c.addItems = function (b) {
            a.isArray(b) || (b = [b]);
            for (var c = 0, g = b.length; c < g; c++) {
                var h = b[c];
                if (!d[h.id]) {
                    f++;
                    d[h.id] = {data: h, index: e.length};
                    e.push(h)
                }
            }
        };
        c.removeItems = function (b) {
            a.isArray(b) || (b = [b]);
            for (var c = 0, g = b.length; c < g; c++) {
                var h = b[c];
                if (d[h.id]) {
                    f > 0 && f--;
                    var i = d[h.id].index;
                    delete d[h.id];
                    e[i] = null
                }
            }
        };
        c.getResult = function () {
            var a = [];
            for (var b = 0, c = e.length; b < c; b++)e[b] && a.push(e[b]);
            return a
        };
        c.getResultLength = function () {
            return f
        };
        c.hasKey = function (a) {
            return d[a.id]
        };
        c.destroy = function () {
            a.custEvent.undefine(c);
            c = d = e = f = undefined
        };
        return c
    }
});
STK.register("kit.items.DispItem", function (a) {
    return function (b) {
        if (typeof b != "object")throw"DispItem need param object";
        if (typeof b.custObj != "object")throw"DispItem need custObj custEvent depute";
        if (typeof b.chosenTpl != "string")throw"DispItem need chosenTpl param";
        if (typeof b.unChosenTpl != "string")throw"DispItem need unChosenTpl param";
        if (!a.isNode(b.nodeList))throw"DispItem need nodeList to depute dom";
        if (typeof b.limitCount != "undefined" && typeof b.DataController == "undefined")throw"DispItem need DataController when set limitCount";
        var c = a.core.util.easyTemplate, d = a.kit.extra.language, e = a.kit.dom.firstChild, f = a.kit.extra.merge, g = {}, h;
        g.addItems = function (e, f) {
            a.isArray(e) || (e = [e]);
            var g = c(d(f.type == "chosen" ? b.chosenTpl : b.unChosenTpl), e).toString();
            a.insertHTML(b.nodeList, g, "beforeend")
        };
        g.removeItems = function (c, d) {
            a.isArray(c) || (c = [c]);
            for (var e = 0, f = c.length; e < f; e++) {
                var g = a.sizzle("[itemid='" + (d ? c[e].id : c[e]) + "']", b.nodeList);
                g.length && a.removeNode(g[0])
            }
        };
        var i = function (f, g) {
            a.isArray(f) || (f = [f]);
            for (var h = 0, i = f.length; h < i; h++) {
                var j = a.sizzle("[itemid='" + f[h].id + "']", b.nodeList);
                if (j.length) {
                    var k = a.C("DIV"), l = c(d(g ? b.chosenTpl : b.unChosenTpl), [f[h]]).toString();
                    k.innerHTML = l;
                    a.replaceNode(e(k), j[0])
                }
            }
        }, j = function () {
            if (b.limitCount) {
                var a = b.DataController.getResultLength();
                return a >= b.limitCount ? !0 : !1
            }
            return!1
        };
        g.setCheckedItems = function (a) {
            i(a, !0)
        };
        g.setUncheckedItems = function (a) {
            i(a, !1)
        };
        h = a.delegatedEvent(b.nodeList);
        h.add("check", "click", function (c) {
            setTimeout(function () {
                if (!j()) {
                    var d = f(c.data, {data: c.el.getAttribute("action-data")});
                    g.setCheckedItems(d);
                    a.custEvent.fire(b.custObj, "DispItem", {type: "check", data: d})
                } else a.custEvent.fire(b.custObj, "DispItem", {type: "focusInput", data: {}})
            }, 0)
        });
        h.add("uncheck", "click", function (c) {
            setTimeout(function () {
                var d = f(c.data, {data: c.el.getAttribute("action-data")});
                g.setUncheckedItems(d);
                a.custEvent.fire(b.custObj, "DispItem", {type: "uncheck", data: d})
            }, 0)
        });
        g.destroy = function () {
            h && h.destroy();
            c = d = e = f = g = h = i = j = undefined
        };
        return g
    }
});
STK.register("kit.items.DeletedItem", function (a) {
    return function (b) {
        if (typeof b != "object")throw"DeletedItem need param object";
        if (typeof b.custObj != "object")throw"DeletedItem need custObj custEvent depute";
        if (typeof b.template != "string")throw"DeletedItem need template to display";
        if (!a.isNode(b.nodeList))throw"DeletedItem need nodeList to depute dom";
        if (!a.isNode(b.insertBeforeNode))throw"DeletedItem need insertBeforeNode to insert dom";
        var c = a.core.util.easyTemplate, d = a.kit.extra.language, e = a.kit.extra.merge, f = {}, g;
        f.addItems = function (e) {
            a.isArray(e) || (e = [e]);
            var f = c(d(b.template), e).toString();
            a.insertHTML(b.insertBeforeNode, f, "beforebegin")
        };
        f.removeItems = function (c, d) {
            a.isArray(c) || (c = [c]);
            for (var e = 0, f = c.length; e < f; e++) {
                var g = a.sizzle("[itemid='" + (d ? c[e].id : c[e]) + "']", b.nodeList);
                g.length && a.removeNode(g[0])
            }
        };
        g = a.delegatedEvent(b.nodeList);
        g.add("remove", "click", function (c) {
            setTimeout(function () {
                var d = e(c.data, {data: c.el.getAttribute("action-data")});
                f.removeItems(d, !0);
                a.custEvent.fire(b.custObj, "DeletedItem", {type: "remove", data: d})
            }, 0)
        });
        f.destroy = function () {
            g && g.destroy();
            c = d = e = g = f = undefined
        };
        return f
    }
});
STK.register("kit.extra.dynamicInputWidth", function (a) {
    return function (b, c) {
        c = c || {};
        var d = {}, e, f, g, h = a.core.dom.getSize, i = a.core.dom.setStyle, j, k;
        a.custEvent.define(d, "textChange");
        var l = function () {
            if (!e) {
                e = 1;
                var b = a.core.dom.cssText("");
                b.push("width", "1000px");
                b.push("height", "55px");
                b.push("position", "absolute");
                b.push("left", "-10000px");
                b.push("top", "-10000px");
                b.push("visibility", "hidden");
                var c = b.getCss();
                e = 1;
                var d = '<div node-type="wrap" style="' + c + '">' + '<span node-type="before"></span>' + "</div>", h = a.core.dom.builder(d);
                g = h.box;
                f = a.kit.dom.parseDOM(h.list);
                document.body.appendChild(g)
            }
        }, m = {focus: function () {
            clearTimeout(k);
            k = setTimeout(m.focusFun, 200)
        }, focusFun: function () {
            var e = b.value;
            if (c.limitWords) {
                var g = a.bLength(e);
                g > c.limitWords && (b.value = e = a.leftB(e, c.limitWords))
            }
            if (e == j)m.focus(); else {
                j = e;
                l();
                f.before.innerHTML = a.encodeHTML(e);
                var k = h(f.before), n = k.width + 20;
                c.maxInputWidth && n > c.maxInputWidth && (n = c.maxInputWidth);
                i(b, "width", n + "px");
                m.focus();
                a.custEvent.fire(d, "textChange", e)
            }
        }, blur: function () {
            clearTimeout(k)
        }}, n = function () {
            a.addEvent(b, "focus", m.focus);
            a.addEvent(b, "blur", m.blur)
        }, o = function () {
            a.removeEvent(b, "focus", m.focus);
            a.removeEvent(b, "blur", m.blur);
            d = null
        }, p = {custObj: d, destroy: o};
        n();
        return p
    }
});
STK.register("kit.items.ItemSuggest", function (a) {
    return function (b) {
        if (typeof b != "object")throw"ItemSuggest need object params";
        if (typeof b.textEl == "undefined")throw"ItemSuggest need textEl";
        if (typeof b.uiNode == "undefined")throw"ItemSuggest need uiNode";
        if (typeof b.suggestConf == "undefined")throw"ItemSuggest need suggestConf";
        if (typeof b.custObj == "undefined")throw"ItemSuggest need custObj";
        var c = a.kit.dom.parseDOM(a.builder(b.uiNode).list), d, e, f;
        b = a.kit.extra.merge({actionType: "suggestItem", actionData: "index", suggestType: "local"}, b);
        var g = {}, h = a.ui.mod.suggest({textNode: b.textEl, uiNode: b.uiNode, actionType: b.actionType, actionData: b.actionData}), i = {BACKSPACE: 8, SPACE: 32}, j = a.core.util.easyTemplate, k = a.kit.extra.language, l = a.core.dom.getSize, m = {hideSuggest: function () {
            a.setStyle(b.uiNode, "display", "none");
            a.custEvent.fire(h, "close", {})
        }, keyboardSubmit: function () {
            a.custEvent.fire(b.custObj, "ItemSuggest", {type: "keyboardSubmit", data: {}})
        }, addOneItem: function () {
            var c = a.trim(b.textEl.value), e = b.suggestConf.regexp;
            if (c)if (e(c)) {
                a.custEvent.fire(b.custObj, "ItemSuggest", {type: "addItem", data: {id: c}});
                a.setStyle(b.textEl, "width", "20px");
                b.textEl.value = "";
                m.hideSuggest();
                d = null
            } else a.custEvent.fire(b.custObj, "ItemSuggest", {type: "inputError", data: {value: c}})
        }, localSearch: function (a) {
            var c = b.suggestConf.data, d = b.suggestConf.searchKey, e = [], f = b.suggestConf.suggestMaxCount, g = 0;
            for (var h = 0, i = c.length; h < i; h++)if (c[h][d] && c[h][d].indexOf(a) == 0)if (f) {
                if (!(g < f))break;
                g++;
                e.push(c[h])
            } else e.push(c[h]);
            return e
        }, setLayerPos: function () {
            a.kit.dom.layoutPos(b.uiNode, b.textEl)
        }, getTemplate: function (d) {
            var e = j(k(b.suggestConf.template), d);
            c.suggestContent.innerHTML = e;
            m.setLayerPos();
            if (d.length) {
                a.setStyle(b.uiNode, "display", "");
                a.custEvent.fire(h, "open", b.textEl)
            } else m.hideSuggest()
        }, reqSucc: function (b, c) {
            a.isArray(b.data) ? m.getTemplate(b.data) : m.getTemplate([])
        }, reqFail: function (a, b) {
            m.getTemplate([])
        }, buildTrans: function () {
            e = b.suggestConf.trans.getTrans(b.suggestConf.transName, {onSuccess: m.reqSucc, onError: m.reqFail, onFail: m.reqFail})
        }, textChange: function (c, d) {
            d && (d = a.trim(d));
            if (!d)m.hideSuggest(); else if (b.suggestType === "local") {
                var e = m.localSearch(d);
                m.getTemplate(e)
            } else if (b.suggestType === "net") {
                clearTimeout(f);
                f = setTimeout(function () {
                    m.sendRequest(d)
                }, 100)
            }
            a.custEvent.fire(b.custObj, "ItemSuggest", {type: "textChange", data: {value: d}})
        }, sendRequest: function (a) {
            e || m.buildTrans();
            e.abort();
            e.request({q: a})
        }, removeJudge: function () {
            var c = b.textEl.value;
            c == "" && a.custEvent.fire(b.custObj, "ItemSuggest", {type: "remove", data: {}})
        }, onSpace: function (b) {
            b = a.fixEvent();
            var c = b.keyCode || b.which;
            if (c == i.SPACE) {
                m.addOneItem();
                a.preventDefault()
            }
        }, onKeyDown: function (b) {
            b = a.fixEvent();
            var c = b.keyCode || b.which;
            if (c == i.BACKSPACE)m.removeJudge(); else if (b.ctrlKey && (c == 13 || c == 10)) {
                m.hideSuggest();
                m.keyboardSubmit()
            }
        }, blur: function () {
            var a = m.hideSuggest;
            setTimeout(function () {
                a();
                a = undefined
            }, 150)
        }, changeCurrent: function (c, e) {
            var f = b.suggestConf.currentClass;
            d && a.removeClassName(d, f);
            var g = a.sizzle(b.suggestConf.itemTagName, b.uiNode);
            if (g[e]) {
                a.addClassName(g[e], f);
                d = g[e]
            } else d = null
        }, selectItem: function (c, e) {
            c = a.fixEvent();
            if (!c.ctrlKey) {
                var f = a.sizzle(b.suggestConf.itemTagName, b.uiNode);
                if (f[e]) {
                    a.setStyle(b.textEl, "width", "20px");
                    b.textEl.value = "";
                    var g = f[e].getAttribute("action-data");
                    a.custEvent.fire(b.custObj, "ItemSuggest", {type: "select", data: g});
                    m.hideSuggest();
                    try {
                        b.textEl.focus()
                    } catch (h) {
                    }
                    d = null
                }
            }
        }}, n = a.kit.extra.dynamicInputWidth(b.textEl, {maxInputWidth: b.maxInputWidth, limitWords: b.limitWords});
        a.custEvent.add(n.custObj, "textChange", m.textChange);
        a.addEvent(b.textEl, "blur", m.blur);
        a.addEvent(b.textEl, "keypress", m.onSpace);
        a.addEvent(b.textEl, "keydown", m.onKeyDown);
        a.custEvent.add(h, "onIndexChange", m.changeCurrent);
        a.custEvent.add(h, "onSelect", m.selectItem);
        g.destroy = function () {
            a.custEvent.fire(h, "close", {});
            n && a.custEvent.undefine(n.custObj);
            n && n.destroy();
            a.removeEvent(b.textEl, "blur", m.blur);
            a.removeEvent(b.textEl, "keypress", m.onSpace);
            a.removeEvent(b.textEl, "keydown", m.onKeyDown);
            c = d = e = f = g = h = i = j = k = l = m = n = undefined
        };
        return g
    }
});
STK.register("kit.items.DataItemPicker", function (a) {
    return function (b) {
        var c = a.core.dom.getSize, d = a.kit.extra.merge, e = {}, f, g, h, i, j, k, l, m, n = 0, o = !1, p = function () {
            if (typeof b != "object")throw"DataItemPicker need params object";
            if (!a.isNode(b.container))throw"DataItemPicker need container(node)";
            if (typeof b.DispItem == "undefined")throw"DataItemPicker need DispItem(boolean)";
            if (typeof b.DispItemConf != "object")throw"DataItemPicker need DispItemConf";
            if (typeof b.DeletedItem == "undefined")throw"DataItemPicker need DeleteItem(boolean)";
            if (typeof b.DeletedItemConf != "object")throw"DataItemPicker need DeletedItemConf";
            if (typeof b.ItemSuggest == "undefined")throw"DataItemPicker need DeleteItem(boolean)";
            if (typeof b.ItemSuggestConf != "object")throw"DataItemPicker need ItemSuggestConf";
            k = b.DispItem;
            l = b.DeletedItem;
            m = b.ItemSuggest;
            o = b.resetHeight
        }, q = function () {
            f = a.kit.dom.parseDOM(a.builder(b.container).list)
        }, r = function () {
            if (m) {
                a.addEvent(f.container, "click", u.focusInput);
                a.addEvent(f.suggestInput, "focus", u.suggestFocus);
                a.addEvent(f.suggestInput, "blur", u.suggestBlur)
            }
        }, s = function () {
            g = a.kit.items.DataController({custObj: e});
            k && (h = a.kit.items.DispItem({custObj: g, limitCount: b.limitCount, DataController: g, nodeList: f.dispItemList, chosenTpl: b.DispItemConf.chosenTpl, unChosenTpl: b.DispItemConf.unChosenTpl}));
            l && (i = a.kit.items.DeletedItem({custObj: g, template: b.DeletedItemConf.template, nodeList: f.container, insertBeforeNode: f.suggestInput}));
            m && (j = a.kit.items.ItemSuggest({textEl: f.suggestInput, uiNode: b.ItemSuggestConf.suggestList, suggestType: b.ItemSuggestConf.suggestType, suggestConf: b.ItemSuggestConf.suggestConf, maxInputWidth: b.ItemSuggestConf.maxInputWidth, limitWords: b.ItemSuggestConf.limitWords, regexp: b.ItemSuggestConf.regexp, custObj: g}));
            k && a.custEvent.add(g, "DispItem", function (b, c) {
                if (c.type == "check") {
                    if (!u.getLimitReach()) {
                        g.addItems(c.data);
                        i.addItems(c.data);
                        a.custEvent.fire(e, "checkedDespItem", {data: c})
                    }
                    u.resetHeight();
                    u.focusInput()
                } else if (c.type == "uncheck") {
                    g.removeItems(c.data);
                    i.removeItems(c.data, !0);
                    u.resetHeight();
                    u.focusInput()
                } else c.type == "focusInput" && u.focusInput()
            });
            l && a.custEvent.add(g, "DeletedItem", function (b, c) {
                if (c.type == "remove") {
                    g.removeItems(c.data);
                    h.setUncheckedItems(c.data);
                    u.resetHeight();
                    a.custEvent.fire(e, "DeletedItemRemove", {DataController: g})
                }
            });
            m && a.custEvent.add(g, "ItemSuggest", function (b, c) {
                if (c.type == "remove") {
                    var j = a.sizzle("[action-type='remove']:last", f.container);
                    if (j.length) {
                        var k = a.queryToJson(j[0].getAttribute("action-data"));
                        k = d(k, {data: j[0].getAttribute("action-data")});
                        g.removeItems(k);
                        i.removeItems(k, !0);
                        h.setUncheckedItems(k);
                        u.resetHeight()
                    }
                    a.custEvent.fire(e, "backspaceKey", {})
                } else if (c.type == "select") {
                    var l = c.data, k = a.queryToJson(l);
                    k = d(k, {data: l});
                    var m = g.hasKey(k);
                    if (!m) {
                        if (!u.getLimitReach()) {
                            g.addItems(k);
                            i.addItems(k);
                            h.setCheckedItems(k)
                        }
                        u.resetHeight()
                    }
                } else if (c.type == "textChange") {
                    u.resetHeight();
                    a.custEvent.fire(e, "textChange", c.data)
                } else if (c.type == "inputError")a.custEvent.fire(e, "inputError", c.data); else if (c.type == "addItem") {
                    var n = c.data.id, k = {id: n, data: "id=" + n + "&text=" + n, text: n}, m = g.hasKey(k);
                    if (!m) {
                        if (!u.getLimitReach()) {
                            g.addItems(k);
                            i.addItems(k);
                            h.setCheckedItems(k);
                            a.custEvent.fire(e, "spaceAddItem", c.data)
                        }
                        u.resetHeight()
                    }
                } else c.type == "keyboardSubmit" && a.custEvent.fire(e, "keyboardSubmit", c.data)
            })
        }, t = function () {
            a.custEvent.define(e, ["resultChange", "textChange", "inputError", "keyboardSubmit", "backspaceKey", "DeletedItemRemove", "spaceAddItem", "checkedDespItem"])
        }, u = {suggestFocus: function () {
            n = 1
        }, suggestBlur: function () {
            n = 0
        }, getLimitReach: function () {
            if (b.limitCount) {
                var a = g.getResultLength();
                return a >= b.limitCount ? !0 : !1
            }
            return!1
        }, focusInput: function () {
            if (!n) {
                a.kit.extra.textareaUtils.setCursor(f.suggestInput);
                n = 1
            }
        }, resetHeight: function () {
            if (!!o) {
                var d = g.getResultLength();
                if (d) {
                    var e = a.position(f.suggestInput), h = a.position(f.container), i = c(f.suggestInput), j = e.t + i.height - h.t + 3, k = c(f.container).height;
                    k != j && a.setStyle(f.container, "height", j + "px")
                } else a.setStyle(f.container, "height", b.containerMinHeight + "px")
            }
        }}, v = function () {
            p();
            q();
            r();
            s();
            t()
        };
        v();
        e.getDispItem = function () {
            return h
        };
        e.getDeletedItem = function () {
            return i
        };
        e.getDataController = function () {
            return g
        };
        e.focusInput = u.focusInput;
        e.resetHeight = u.resetHeight;
        e.destroy = function () {
            g.destroy();
            k && h && h.destroy();
            l && i && i.destroy();
            if (m) {
                j && j.destroy();
                a.removeEvent(f.container, "click", u.focusInput);
                a.removeEvent(f.suggestInput, "focus", u.suggestFocus);
                a.removeEvent(f.suggestInput, "blur", u.suggestBlur)
            }
            e = f = g = h = i = j = undefined;
            c = d = k = l = m = n = v = u = undefined
        };
        return e
    }
});
STK.register("kit.dom.addClassNames", function (a) {
    return function (b, c) {
        c = c.split(/\s+/g);
        var d = " " + b.className + " ";
        a.foreach(c, function (a) {
            var b = new RegExp(" " + a + " ");
            b.test(d) || (d += a + " ")
        });
        b.className = a.trim(d)
    }
});
STK.register("kit.dom.removeClassNames", function (a) {
    return function (b, c) {
        c = c.split(/\s+/g);
        var d = " " + b.className + " ";
        a.foreach(c, function (a) {
            var b = new RegExp(" " + a + " ");
            d = d.replace(b, " ")
        });
        b.className = a.trim(d)
    }
});
STK.register("kit.dom.borderedInput", function (a) {
    var b = a.kit.dom.addClassNames, c = a.kit.dom.removeClassNames;
    return function (d, e) {
        e = a.parseParam({addClass: "W_input W_input_focus", removeClass: "W_input_focus", findEl: null}, e);
        var f = {};
        if (!a.isNode(d))return{destroy: a.funcEmpty};
        var g = function () {
            var a;
            e.findEl ? a = e.findEl(d) : a = d;
            return a
        }, h = function () {
            var a = g();
            b(a, e.addClass)
        }, i = function () {
            var a = g();
            c(a, e.removeClass)
        };
        a.addEvent(d, "focus", h);
        a.addEvent(d, "blur", i);
        f.destroy = function () {
            a.removeEvent(d, "focus", h);
            a.removeEvent(d, "blur", i)
        };
        return f
    }
});
STK.register("common.extra.rectsPosition", function (a) {
    var b = a.core.util.browser, c = {}, d = 5, e = 20, f = {t: function (a, b) {
        return a.t > b.h
    }, b: function (a, b) {
        return a.b > b.h
    }, l: function (a, b) {
        return a.l > b.w
    }, r: function (a, b) {
        return a.r > b.w
    }}, g = {domSize: function (b) {
        var c = a.core.dom.getSize(b);
        return{w: Math.max(c.width, a.getStyle(b, "width").replace(/px|auto/gi, "")), h: Math.max(c.height, a.getStyle(b, "height").replace(/px|auto/gi, ""))}
    }, mouseXY: function (c) {
        var d = {x: c.pageX, y: c.pageY};
        if (b.IE6 || b.IE7) {
            var e = a.core.util.scrollPos();
            d.x = d.x + e.left;
            d.y = d.y + e.top
        }
        return d
    }, getRows: function (a) {
        var c = a.getClientRects();
        if (b.IE6 || b.IE7) {
            var d = [], e = {}, f;
            for (var g = 0, h = c.length; g < h; g++) {
                var i = c[g];
                e[i.top] || (e[i.top] = []);
                e[i.top].push(i)
            }
            for (var j in e) {
                var k = e[j], h = k.length, l = k[0];
                h > 1 && (l.right = k[h - 1].right);
                d.push(l)
            }
            c = d
        }
        return c
    }, getTextRect: function (b, c) {
        var d = a.parseParam({evt: ""}, c), e = a.core.util.scrollPos(), f;
        if (!b.getClientRects) {
            var h = g.domSize(b);
            return{width: h.w, height: h.h, left: "", right: "", top: "", bottom: ""}
        }
        var i = {rows: g.getRows(b)}, j = g.mouseXY(d.evt), k = {x: j.x - e.left, y: j.y - e.top};
        for (var l = 0, m = i.rows.length; l < m; l++) {
            var n = i.rows[l];
            l == 0 && (f = n);
            if (k.y > n.top && k.y < n.bottom) {
                f = n;
                break
            }
        }
        if (a.IE) {
            var h = g.domSize(b);
            f = a.parseParam({width: h.w, height: h.h, left: "", right: "", top: "", bottom: ""}, f)
        }
        return f
    }, getDistance: function (b, c) {
        var d = a.core.util.winSize(), e = g.getTextRect(b, c);
        return{win: d, rect: e, w: e.width, h: e.height, t: e.top, l: e.left, r: d.width - e.right, b: d.height - e.bottom}
    }, getSeat: function (b, c, d) {
        var h = a.parseParam({distance: e, priority: "trbl"}, d), i = g.getDistance(b, d), j = g.domSize(c);
        i.area = "b";
        var k = h.priority.split("");
        for (var l = 0, m = k.length; l < m; l++) {
            var n = k[l];
            if (!f[n])throw'priority error, random use "tbrl" combination';
            if (f[n](i, j)) {
                i.area = n;
                break
            }
        }
        return i
    }, setArrow: function (b) {
        var c = a.parseParam({evt: "", node: "", layer: "", arrow: "", priority: "trbl", css_t: "arrow arrow_b", css_r: "arrow arrow_l", css_b: "arrow arrow_t", css_l: "arrow arrow_r", offset: d, distance: e}, b);
        if (!c.node)throw"target node is undefined";
        if (!c.layer)throw"layer node is undefined";
        if (!c.arrow)throw"arrow node is undefined";
        var f = g.getSeat(c.node, c.layer, c), h = f.area, i = f.rect;
        c.arrow.className = c["css_" + h];
        var j = g.domSize(c.layer), k = a.scrollPos(), l, m;
        if (h == "t" || h == "b") {
            l = h == "t" ? i.top + k.top - j.h - c.offset : i.bottom + k.top + c.offset;
            m = i.left + k.left - c.distance
        } else {
            l = i.top + k.top - c.distance;
            m = h == "r" ? i.right + k.left + c.offset : i.left + k.left - j.w - c.offset
        }
        c.layer.style.top = l + "px";
        c.layer.style.left = m + "px"
    }, setLayer: function (b) {
        var c = a.parseParam({evt: "", node: "", layer: "", priority: "btrl", offsetX: 0, offsetY: 0}, b);
        if (!c.node)throw"target node is undefined";
        if (!c.layer)throw"layer node is undefined";
        var d = g.getSeat(c.node, c.layer, c), e = d.area, f = d.rect, h = g.domSize(c.layer), i = a.scrollPos(), j, k;
        if (e == "t" || e == "b") {
            j = e == "t" ? f.top + i.top - h.h + c.offsetY : f.bottom + i.top - c.offsetY;
            k = f.left + i.left + c.offsetX
        } else {
            j = f.top + i.top + c.offsetY;
            k = e == "r" ? f.right + i.left - c.offsetX : f.left + i.left - h.w + c.offsetX
        }
        c.layer.style.top = j + "px";
        c.layer.style.left = k + "px"
    }};
    c.getTextRect = g.getTextRect;
    c.getDistance = g.getDistance;
    c.getSeat = g.getSeat;
    c.setArrow = g.setArrow;
    c.setLayer = g.setLayer;
    return c
});
STK.register("common.favorite.tagBubble", function (a) {
    var b = function (a, b) {
        window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack(a, b)
    };
    return function (c) {
        var d, e, f, g, h, i, j, k, l = {}, m = 0, n, o, p, q = a.kit.extra.language, r = a.core.util.easyTemplate, s = {ADD: {text: q("#L{最多两个标签，用空格分隔}"), className: "W_tips tips_warn clearfix", classNameS: "icon_warnS"}, DEFAULT: {text: q("#L{添加标签来管理你的收藏吧！}"), className: "W_tips tips_warn clearfix", classNameS: "icon_warnS"}, ERROR: {text: q("#L{仅支持中英文、数字、减号与“_”}"), className: "W_tips tips_del clearfix", classNameS: "icon_delS"}, MAX: {text: q("#L{每条微博最多添加两个标签}"), className: "W_tips tips_del clearfix", classNameS: "icon_delS"}, SAME: {text: q("#L{标签不能重复}"), className: "W_tips tips_del clearfix", classNameS: "icon_delS"}}, t = function () {
            if (typeof c == "undefined")throw"tagBubble need params";
            if (!a.isNode(c.el))throw"tagBubble need el to show";
            if (typeof c.mid == "undefined")throw"tagBubble need mid to commit";
            if (typeof c.serverData == "undefined")throw"tagBubble need serverData to show"
        }, u = function () {
            d = (c.serverData.my_tags || "").split(" ");
            d.length == 1 && d[0] == "" && (d.length = 0);
            e = c.serverData.mblog_tags || [];
            var b = x.getLabel(), h = {labelText: b.text, labelClass: b.className, labelClassS: b.classNameS, uniqueId: a.getUniqueKey()}, i = '<#et favouriteBubble data><div class="layer_favor_addtags" node-type="eventnode" style="width:215px;_width:240px;"><div class="W_tips tips_succ clearfix"><p class="icon"><span class="icon_succS"></span></p><p class="txt">#L{收藏成功!}</p></div><div class="input_outer" node-type="container"><input type="text" class="W_input" style="width:10px;" value="" name="${data.uniqueId}" id="${data.uniqueId}" node-type="suggestInput" autocomplete="off"/></div><div class="W_tips ${data.labelClass} clearfix" node-type="tipState"><p class="icon"><span class="${data.labelClassS}" node-type="tipStateS"></span></p><p class="txt" node-type="labelText">${data.labelText}</p></div><div class="tags" node-type="dispItemList"></div><div class="btn"><a class="W_btn_d btn_noloading" href="javascript:void(0)" action-type="commitBtn" node-type="commitBtn"><span><b class="loading"></b><em node-type="btnText">#L{添加}</em></span></a><a class="W_btn_b" href="javascript:void(0)" action-type="cancelBtn"><span>#L{取消}</span></a></div></div><div node-type="suggestList" class="layer_menu_list" style="position:absolute;z-index:10000;display:none;"><ul node-type="suggestContent"></ul></div></#et>', j = r(q(i), h).toString();
            g = a.ui.bubble({isHold: !0});
            g.setContent(j);
            f = a.kit.dom.parseDOM(a.builder(g.getOuter()).list)
        }, v = function () {
            k = a.common.trans.favorite.getTrans("alter", {onSuccess: x.commitSucc, onError: x.commitError, onFail: x.commitFail});
            j = a.delegatedEvent(f.eventnode);
            j.add("commitBtn", "click", x.commitBtn);
            j.add("cancelBtn", "click", x.cancelBtn);
            p = a.kit.dom.borderedInput(f.suggestInput, {addClass: "W_input_focus", removeClass: "W_input_focus", findEl: function (a) {
                return f.container
            }})
        }, w = function () {
            var b = [];
            d.length && (b = b.concat(x.buildItems(d)));
            e.length && (b = b.concat(x.buildItems(e)));
            var c = {};
            for (var i = 0, j = b.length; i < j; i++)c[b[i].id] = b[i];
            b.length = 0;
            for (var k in c)b[b.length] = c[k];
            h = a.kit.items.DataItemPicker({resetHeight: !1, limitCount: 2, container: g.getOuter(), DispItem: !0, DeletedItem: !0, ItemSuggest: !0, DispItemConf: {chosenTpl: '<#et chosenTpl data><#list data as list><a class="S_link1 choose" href="javascript:void(0)" action-type="uncheck" action-data="${list.data}" itemid="${list.id}">${list.text}</a></#list></#et>', unChosenTpl: '<#et unChosenTpl data><#list data as list><a class="S_link1" href="javascript:void(0)" action-type="check" action-data="${list.data}" itemid="${list.id}">${list.text}</a></#list></#et>'}, DeletedItemConf: {template: function () {
                var a = window.$CONFIG && window.$CONFIG.imgPath || "http://img.t.sinajs.cn/t4/";
                return'<#et deleteList data><#list data as list><span class="W_btn_deltags" href="javascript:void(0)" itemid="${list.id}">${list.text}<a class="W_ico12 icon_close" href="javascript:void(0)" action-type="remove" action-data="${list.data}"></a></span></#list></#et>'
            }()}, ItemSuggestConf: {suggestType: "none", suggestList: f.suggestList, suggestConf: {regexp: function (a) {
                return a === "全部" || a === "未加标签" || a === "未加標籤" ? !1 : /^[a-zA-Z0-9\u4e00-\u9fa5\-_]+$/.test(a) ? !0 : !1
            }, suggestMaxCount: 5, itemTagName: "li", currentClass: "cur", template: '<#et suggest data><#list data as list><li action-type="suggestItem" action-data="${list.data}"><a href="javascript:void(0)">${list.text}</a></li></#list></#et>', data: b, searchKey: "text"}, maxInputWidth: 200, limitWords: 12}, containerMinHeight: 22})
        }, x = {deletedItemRemove: function (b, c) {
            var d = a.trim(f.suggestInput.value);
            x.regExpTest({}, {value: d})
        }, commitSucc: function () {
            a.custEvent.fire(l, "success", {})
        }, commitError: function (b, c) {
            a.custEvent.fire(l, "error", {msg: b.msg})
        }, commitFail: function () {
            a.custEvent.fire(l, "error", {msg: q("#L{标签添加失败}")})
        }, getResultStr: function () {
            var a = i.getResult(), b = [];
            for (var c = 0, d = a.length; c < d; c++)b.push(a[c].id);
            return b.join(" ")
        }, cancelBtn: function (b) {
            a.preventDefault(b.evt);
            g.hide()
        }, realSubmit: function (b) {
            var d = x.getResultStr();
            b && (d ? d += " " + b : d = b);
            if (!d)g.hide(); else {
                var e = {mid: c.mid, tags: d};
                e = a.common.getDiss(e);
                m = 1;
                try {
                    f.suggestInput.blur()
                } catch (h) {
                }
                k.request(e);
                g.hide()
            }
        }, inArray: function (a, b) {
            for (var c = 0, d = b.length; c < d; c++)if (b[c].id == a)return!0;
            return!1
        }, commit: function () {
            x.commitSuda();
            var b = a.trim(f.suggestInput.value);
            if (b) {
                var c = i.getResult();
                if (c.length >= 2) {
                    x.setLabel("max");
                    h.focusInput()
                } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5\-_]+$/.test(b)) {
                    x.setLabel("error");
                    h.focusInput()
                } else {
                    var d = x.inArray(b, c);
                    if (d) {
                        x.setLabel("same");
                        h.focusInput()
                    } else x.realSubmit(b)
                }
            } else x.realSubmit()
        }, commitBtn: function (b) {
            a.preventDefault(b.evt);
            m || x.commit()
        }, getLabel: function () {
            return d.length ? s.ADD : s.DEFAULT
        }, buildItems: function (a) {
            var b = [];
            for (var c = 0, d = a.length; c < d; c++) {
                var e = a[c];
                b.push({id: e, data: "id=" + e + "&text=" + e, text: e})
            }
            return b
        }, regExpTest: function (a, b) {
            var c = b.value;
            if (c == "" || /^[a-zA-Z0-9\u4e00-\u9fa5\-_]+$/.test(c)) {
                var d = i.getResultLength();
                d ? x.setLabel("add") : x.setLabel("right")
            }
        }, backSpaceKey: function () {
            x.regExpTest({}, {value: ""})
        }, setLabel: function (a, b) {
            if (a == "right") {
                var c = x.getLabel();
                f.labelText.innerHTML = c.text;
                f.tipState.className = c.className;
                f.tipStateS.className = c.classNameS
            } else {
                var c = s[a.toUpperCase()];
                f.labelText.innerHTML = b || c.text;
                f.tipState.className = c.className;
                f.tipStateS.className = c.classNameS
            }
        }, inputError: function (a, b) {
            b.value === "全部" || b.value === "未加标签" || b.value === "未加標籤" ? x.setLabel("error", q("#L{对不起，不能使用此标签}")) : x.setLabel("error")
        }, bubbleHide: function () {
            m || x.closeSuda();
            A();
            a.custEvent.remove(g, "hide", arguments.callee)
        }, showFavSucc: function () {
            m || a.custEvent.fire(l, "success", {blankNoTag: !0});
            m = undefined;
            a.custEvent.remove(g, "hide", arguments.callee)
        }, setPos: function () {
            var b = a.position(c.el);
            if (!o || o.l != b.l || o.t != b.t) {
                o = b;
                a.common.extra.rectsPosition.setArrow({node: c.el, layer: g.getDom("outer"), arrow: g.getDom("arrow"), priority: "btrl"})
            }
        }, spaceAddItemSuda: function () {
            b("favor", "input_tag")
        }, checkedDespItemSuda: function () {
            b("favor", "click_tag")
        }, closeSuda: function () {
            b("favor", "identify_cancel")
        }, commitSuda: function () {
            b("favor", "identify_do")
        }}, y = function () {
            a.custEvent.define(l, ["success", "error"]);
            a.custEvent.add(h, "textChange", x.regExpTest);
            a.custEvent.add(h, "inputError", x.inputError);
            a.custEvent.add(h, "keyboardSubmit", x.commit);
            a.custEvent.add(h, "backspaceKey", x.backSpaceKey);
            a.custEvent.add(h, "DeletedItemRemove", x.deletedItemRemove);
            a.custEvent.add(h, "spaceAddItem", x.spaceAddItemSuda);
            a.custEvent.add(h, "checkedDespItem", x.checkedDespItemSuda)
        }, z = function () {
            var b = h.getDispItem(), f = x.buildItems(d.slice(0, 5));
            b.addItems(f, {type: "unChosen"});
            var j = h.getDeletedItem(), k = x.buildItems(e);
            j.addItems(k);
            b.setCheckedItems(k);
            i = h.getDataController();
            i.addItems(k);
            document.body.appendChild(g.getOuter());
            g.show();
            a.custEvent.add(g, "hide", x.showFavSucc);
            a.custEvent.add(g, "hide", x.bubbleHide);
            x.setPos();
            o = a.position(c.el);
            n = setInterval(x.setPos, 1e3);
            h.resetHeight();
            h.focusInput()
        }, A = function () {
            p && p.destroy && p.destroy();
            clearInterval(n);
            j && j.destroy();
            h && h.destroy();
            a.removeNode(g.getOuter());
            g && g.destroy();
            a.custEvent.undefine(h);
            d = e = h = i = j = k = n = o = undefined;
            f = n = q = r = s = x = z = B = A = p = undefined
        }, B = function () {
            t();
            u();
            v();
            w();
            y();
            z()
        };
        B();
        l.destroy = A;
        return l
    }
});
STK.register("common.feed.feedList.plugins.favorite", function (a) {
    var b = a.common.feed.feedList.utils, c = a.kit.extra.language, d, e = c("#L{取消收藏}"), f = c("#L{收藏}"), g, h = function () {
        window.location.href = "/fav";
        return
    }, i = function (b, i, j, k, l, m, n, o) {
        g && g.destroy();
        var p = !0;
        l === !1 && m === !0 && (p = !1);
        g = a.common.favorite.favorite({showTip: p, mid: k, node: i, mark: n}, o);
        if (!g)a.log("favoriteObj is undefined!"); else {
            var q = e, r = "";
            a.custEvent.add(g, "success", function (e, f) {
                if (l && !m) {
                    g && g.destroy();
                    j.style.height = j.offsetHeight + "px";
                    j.innerHTML = "";
                    var n = a.tween(j, {end: function () {
                        n.destroy();
                        a.removeNode(j);
                        i = j = null;
                        var c = a.kit.extra.parseURL(), d = a.core.json.queryToJson(c.query), e = "";
                        c.path == "fav" && (e = "page");
                        a.custEvent.fire(b, "request", [e, d]);
                        b.getFeedCount() < 1 && h()
                    }}).play({height: 0})
                } else {
                    i.innerHTML = q;
                    i.className = r;
                    i.setAttribute("favorite", m ? "1" : "0");
                    if (m && f.data && f.data.ispower) {
                        i.setAttribute("tagBubble", "1");
                        var o = a.common.favorite.tagBubble({mid: k, el: i, serverData: f.data || {}});
                        a.custEvent.add(o, "success", function (b, c) {
                            a.custEvent.undefine(o);
                            o = undefined;
                            c.blankNoTag || g.showSuccTip(i);
                            i.removeAttribute("tagBubble")
                        });
                        a.custEvent.add(o, "error", function (b, d) {
                            a.custEvent.undefine(o);
                            o = undefined;
                            g.showErrTip(i, d.msg || c("#L{标签添加失败}"));
                            i.removeAttribute("tagBubble")
                        })
                    }
                }
                d = null
            });
            a.custEvent.add(g, "fail", function () {
                d = null
            });
            a.custEvent.add(g, "error", function () {
                d = null
            });
            a.custEvent.add(g, "cancel", function () {
                d = null
            });
            if (m)g.add(); else {
                r = "";
                q = f;
                g.del()
            }
        }
    }, j = function (a, c, e, f, h) {
        var j = c.el, k = b.getMid(j, e), l = c.data.mark, m = b.getFeedNode(j, e);
        if (d != k) {
            j.getAttribute("tagBubble") && setTimeout(function () {
                g && g.msgTipDetroy()
            }, 0);
            d = k;
            var n = j.getAttribute("favorite") != "1";
            i(a, j, m, k, f, n, l, c.data)
        }
    };
    return function (c, d) {
        if (!c)a.log("favorite : need object of the baseFeedList Class"); else {
            d = a.parseParam({isFavoritePage: !1}, d);
            var e = c.getNode(), f = {};
            a.custEvent.define(f, "showForward");
            c.getDEvent().add("feed_list_favorite", "click", function (g) {
                a.custEvent.fire(c, "clearTips", "favorite");
                var h = g.el, i = h.dataset && h.dataset.mark || h.getAttribute("data-mark") || "", k = {};
                i && (k = a.queryToJson(i));
                g.data = a.core.json.merge(g.data, k);
                j(c, g, e, d.isFavoritePage, f);
                return b.preventDefault(g.evt)
            });
            f.hideTip = function (a) {
                g && (a ? g.hideTip() : g.anihideTip());
                setTimeout(function () {
                    g && g.msgTipDetroy()
                }, 0)
            };
            f.destroy = function () {
                g && g.destroy()
            };
            return f
        }
    }
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
STK.register("kit.extra.setPlainHash", function (a) {
    return function (b) {
        try {
            var c = window.$CONFIG;
            c && c.bigpipe === "true" && a.historyM ? a.historyM.setPlainHash(b) : window.location.hash = b
        } catch (d) {
        }
    }
});
STK.register("common.dialog.commentPrivateSetting", function (a) {
    var b = 1, c = 0, d = {}, e, f, g = 0, h, i = {}, j = 0, k = 0, l = a.kit.extra.language, m = function () {
        var d = a.getUniqueKey, f = a.core.util.easyTemplate, g = a.kit.dom.parseDOM, i = {id1: "key" + d(), id2: "key" + d(), id3: "key" + d(), showType: b, set: c}, j = '<#et privateSetting data><div class="detail layer_setup_privacy" node-type="content"><div class="W_tips tips_warn clearfix"><p class="icon"><span class="icon_warnS"></span></p><p class="txt">#L{为了避免受到不必要的骚扰，建议设置“可信用户”可以评论我的微博。}</p></div><p class="privacy_title">#L{设置谁可以评论我的微博}</p><ul class="privacy_repliable">\t<li><label for="${data.id1}"><input type="radio" class="W_radio" value="0" name="comment" id="${data.id1}" action-type="choose" <#if (data.showType == 1)>checked="checked"</#if><#if (data.showType==2 && data.set==0)>checked="checked"</#if>/>&nbsp;#L{所有人}<span class="S_txt2">#L{（不包括你的黑名单用户）}</span></label></li>  <li><label for="${data.id2}"><input type="radio" class="W_radio" value="2" name="comment" id="${data.id2}" action-type="choose" <#if (data.showType==2 && data.set==2)>checked="checked"</#if>/>&nbsp;#L{可信用户}<span class="S_txt2">#L{（包括我关注的人、新浪认证用户、微博达人以及手机绑定用户）}</span></label></li>  <li><label for="${data.id3}"><input type="radio" class="W_radio" value="1" name="comment" id="${data.id3}" action-type="choose" <#if (data.showType==2 && data.set==1)>checked="checked"</#if>/>&nbsp;#L{我关注的人}</label></li></ul><div class="btn"><a href="javascript:void(0)" class="W_btn_d" action-type="OK" node-type="OK" style="visibility:hidden;"><span>#L{保存}</span></a><#if (data.showType==1)><a href="javascript:void(0)" class="W_btn_b" action-type="cancel" node-type="noMore"><span>#L{不再提示}</span></a></#if><#if (data.showType==2)><a href="javascript:void(0)" class="W_btn_b" action-type="hide" node-type="hide"><span>#L{取消}</span></a></#if></div></div></#et>';
        e = a.ui.dialog();
        e.setTitle(l("#L{评论隐私设置}"));
        e.setContent(f(l(j), i).toString());
        h = g(a.builder(e.getOuter()).list)
    }, n = {chooseItem: function (d) {
        g = d.el.value;
        b == 1 ? a.setStyle(h.OK, "visibility", g == 0 ? "hidden" : "visible") : a.setStyle(h.OK, "visibility", g == c ? "hidden" : "visible")
    }, save: function (b) {
        g = parseInt(g, 10);
        if (g > -1) {
            if (j)return;
            j = 1;
            i.save.request({comment: g})
        }
        return a.preventDefault(b.evt)
    }, cancel: function (b) {
        if (!k) {
            k = 1;
            s();
            e.hide();
            i.noMore.request({bubbletype: 5, time: 604800});
            return a.preventDefault(b.evt)
        }
    }, hide: function (b) {
        s();
        e.hide();
        return a.preventDefault(b.evt)
    }}, o = {getSetErr: function () {
        a.ui.alert(l("#L{对不起，评论隐私设置获取失败}"))
    }, getAlert: function (b, c, d) {
        var f = a.ui.tipAlert({showCallback: function () {
            setTimeout(function () {
                f && f.anihide()
            }, 500)
        }, hideCallback: function () {
            f && f.destroy();
            b ? setTimeout(function () {
                d && d();
                s();
                e.hide()
            }, 200) : d && d()
        }, msg: c, type: b ? undefined : "del"});
        return f
    }, saveSuccess: function (b, c) {
        e.hide();
        a.ui.litePrompt(l("#L{保存成功}"), {type: "succM", timeout: "1000", hideCallback: function () {
            window.location.reload()
        }})
    }, saveError: function () {
        var a = o.getAlert(!1, l("#L{保存失败，请重试}"), function () {
            j = 0
        });
        a.setLayerXY(h.OK);
        a.aniShow()
    }, noMoreSuccess: function () {
        k = 0
    }, noMoreError: function () {
        k = 0
    }}, p = function () {
        g = 0;
        k = 0;
        f = a.delegatedEvent(h.content);
        f.add("choose", "click", n.chooseItem);
        f.add("OK", "click", n.save);
        f.add("cancel", "click", n.cancel);
        f.add("hide", "click", n.hide)
    }, q = function () {
        i.save = a.common.trans.comment.getTrans("privateSetting", {onSuccess: o.saveSuccess, onError: o.saveError});
        i.noMore = a.common.trans.comment.getTrans("privateNoMore", {onSuccess: o.noMoreSuccess, onError: o.noMoreError})
    }, r = function (a) {
        if (a) {
            a.data && a.data.set && (c = a.data.set);
            b = !c ? 1 : 2
        }
        q();
        m();
        p();
        e.show();
        e.setMiddle()
    }, s = function () {
        f && f.destroy()
    };
    d.show = r;
    return d
});
STK.register("common.comment.inter", function (a) {
    var b = null, c = function () {
    }, d = a.ui.alert, e, f = a.common.dialog.commentPrivateSetting, g = a.kit.extra.language, h = function (b, c) {
        if (b && b.code) {
            b.code != "100000" && b.code != "100005" && a.common.layer.ioError(b.code, b);
            c(b)
        }
    };
    return function (f, i) {
        e = a.common.dialog.validateCode();
        var j = {}, k = 0, l = a.common.trans.comment;
        f = a.parseParam({delete_success: c, delete_fail: c, delete_error: c, add_success: c, add_fail: c, add_error: c, smallList_success: c, smallList_fail: c, smallList_error: c}, f || {});
        j.conf = a.parseParam({act: b, mid: b, cid: b, uid: $CONFIG.uid, page: b, forward: b, isroot: b, content: b, type: b, is_block: b, appkey: b}, i);
        j.merge = function (b) {
            b = a.kit.extra.merge(j.conf, b);
            return a.core.obj.clear(b)
        };
        j.request = function (b, c) {
            if (!k) {
                k = 1;
                var i = j.merge(c), m = l.getTrans(b, {onComplete: function (c, j) {
                    if (b == "add") {
                        var l = {onSuccess: function (a, c) {
                            h(a, function (a) {
                                f[b + (a.code == "100000" ? "_success" : "_fail")](a, i)
                            })
                        }, onError: function (c, e) {
                            f[b + "_error"](c, i);
                            c.code == "100005" ? d(g("#L{由于对方隐私设置，你无法进行评论。}"), {textSmall: g("#L{绑定手机后可以更多地参与评论。}") + '<a href="http://account.weibo.com/settings/mobile" target="_blank">' + g("#L{立即绑定}") + "</a>"}) : a.common.layer.ioError(c.code, c)
                        }, param: i, requestAjax: m};
                        e.validateIntercept(c, j, l)
                    } else h(c, function (a) {
                        if (a.code == "100000")f[b + "_success"](a, i); else {
                            var c = f[b + "_fail"];
                            typeof c == "function" ? f[b + "_fail"](a, i) : f[b + "_success"](a, i)
                        }
                    });
                    k = 0
                }, onFail: function () {
                    k = 0
                }});
                m.request(i)
            }
        };
        j.load = function (a) {
            j.request("smallList", a)
        };
        j.del = function (a) {
            j.request("delete", a)
        };
        j.post = function (a) {
            j.request("add", a)
        };
        e.addUnloadEvent();
        return j
    }
});
STK.register("common.comment.reply", function (a) {
    var b = a.kit.extra.language, c = a.common.trans.comment, d = a.core.dom.setStyle, e = a.core.dom.getStyle, f = a.core.evt.preventDefault, g = a.kit.extra.setPlainHash, h = [], i = {}, j = {reply: b("#L{回复}"), alert: b("#L{写点东西吧，评论内容不能为空哦。}"), success: b("#L{评论成功}"), block: b("#L{同时将此用户加入黑名单}")}, k = new RegExp(["^", j.reply, "@([^:]*):"].join("")), l = function (a, c) {
        c == "normal" ? a.innerHTML = b("#L{评论}") : a.innerHTML = b("#L{提交中...}")
    }, m = function (b, c) {
        var e = {}, f, h, i, m, n, o, p, q, r, s, t, u, v, w, x, y;
        a.custEvent.define(e, ["reply"]);
        var z = a.core.evt.delegatedEvent(b), A = {add_success: function (c, g) {
            y = 0;
            n.className = "W_btn_d btn_noloading";
            l(p, "normal");
            f.API.reset();
            f.API.insertText(t);
            f.API.blur();
            d(b, "display", "none");
            c.forward = q;
            a.custEvent.fire(e, "reply", [c, g]);
            a.ui.litePrompt(j.success, {type: "succM", timeout: "500"})
        }, add_fail: function (a) {
            y = 0;
            n.className = "W_btn_d btn_noloading";
            l(p, "normal")
        }, add_error: function (a) {
            y = 0;
            n.className = "W_btn_d btn_noloading";
            l(p, "normal")
        }}, B = function (b) {
            if (!y) {
                y = 1;
                a.core.evt.preventDefault();
                q = i.checked ? 1 : 0;
                r = a.core.str.trim(m.value);
                u = r.match(k);
                if (r == t || r == "")a.ui.alert(j.alert, {OK: function () {
                    y = 0
                }}); else {
                    if (!u || !u[1] || u[1] != s)c.cid = s = null;
                    r = a.leftB(r, 280);
                    c.content = r;
                    var d = a.core.dom.neighbor(b.el).parent('[node-type="feed_list_repeat"]').finish();
                    if (!d) {
                        a.log("common.comment.reply: 评论列表的展示区不存在！");
                        return
                    }
                    v = a.common.getDiss(a.kit.extra.merge(c, {act: "reply", content: r, forward: q, isroot: 0, repeatNode: d}), b.el);
                    b && b.el ? b.el.className = "W_btn_a_disable" : n && (n.className = "W_btn_a_disable");
                    l(p, "loading");
                    g("_rnd" + (+(new Date)).toString());
                    h = a.common.comment.inter(A, v);
                    v = a.kit.extra.merge(b.data, v);
                    h.post(v)
                }
            }
        };
        i = a.sizzle('[node-type="forward"]', b)[0];
        m = a.sizzle('[node-type="textEl"]', b)[0];
        n = a.sizzle('[action-type="doReply"]', b)[0];
        p = a.sizzle('[node-type="btnText"]', b)[0];
        x = a.core.json.jsonToQuery(c);
        n.setAttribute("action-data", x);
        s = c.content;
        t = [j.reply, "@", s, ":"].join("");
        f = a.common.editor.base(b, {count: "disable"});
        f.widget(a.common.editor.widget.face(), "smileyBtn");
        w = f.API.getWords();
        w == "" ? f.API.insertText(t) : f.API.insertText("");
        z.add("doReply", "click", B);
        a.core.evt.hotKey.add(b, ["ctrl+enter"], function () {
            a.fireEvent(n, "click")
        });
        a.kit.dom.autoHeightTextArea({textArea: m, maxHeight: 9999, inputListener: function () {
            var b = a.trim(m.value);
            a.bLength(b) > 280 && (m.value = a.leftB(b, 280))
        }});
        e.focus = function () {
            f.API.insertText("")
        };
        return e
    }, n = function (b, c) {
        var d = a.core.arr.indexOf(b, h);
        if (!i[d]) {
            h[d = h.length] = b;
            i[d] = m(b, c)
        }
        return i[d]
    };
    return function (b, c) {
        (!c || !c.mid) && a.log("common/comment/reply.js-------mid is not defined");
        return n(b, c)
    }
});
STK.register("common.comment.commentMsg", function (a) {
    return{noPhoneReplyMsg: '#L{由于用户设置，你无法回复评论。}<br><a href="http://account.weibo.com/settings/mobile" target="_blank">#L{绑定手机}</a>#L{后可以更多地参与评论。}', noPowerReplyMsg: "#L{由于用户设置，你无法回复评论。}"}
});
STK.register("common.dialog.commentDialogue", function (a) {
    var b = a.common.comment.commentMsg, c = a.kit.extra.language, d = {TITLE: c("#L{查看对话}"), FRAME: c('<div class="detail layer_comments_list"><div node-type="more" class="more_list S_link2"></div><div node-type="repeat_list" class="WB_feed"></div></div>'), MOREAREA: {LOADING: c('<p class="layer_comments_list_loading">&nbsp;#L{加载中...}</p>'), DELETEED: c("#L{回复记录中部分评论已被原作者删除。}"), RETRY: c('#L{加载失败，请}<a action-type="older" href="javascript:void(0)" onclick="return false;">#L{重试}</a>#L{。}'), DEFAULT: c('<a action-type="older" href="javascript:void(0)" onclick="return false;"><span class="more_arrow">&laquo;</span>#L{查看更早的评论}</a>')}}, e = {unReply: c(b.noPhoneReplyMsg), unPower: c(b.noPowerReplyMsg)}, f = a.common.trans.comment, g = a.ui.dialog({isHold: !0}), h = null, i = null, j = a.common.trans.comment, k, l = !1;
    return function () {
        var b, c, m, n, o, p, q, r = !0, s = !1, t = [], u = function () {
            g.setTitle(d.TITLE);
            g.setContent(d.FRAME);
            var b = g.getInner();
            k = a.kit.dom.parseDOM(a.builder(b).list);
            k.outer = g.getOuter();
            k.inner = b;
            v();
            l = !0
        }, v = function () {
            q = a.core.evt.delegatedEvent(k.outer);
            q.add("older", "click", b.getDialogueList);
            q.add("replycomment", "click", w.show);
            a.custEvent.add(g, "hide", b.reset)
        }, w = {show: function (b) {
            var c = b.el;
            {
                if (!a.core.dom.hasClassName(c, "unclick_rep")) {
                    b.data && b.data.ispower == "1" ? j.getTrans("isComment", {onComplete: function (d) {
                        if (d.code == "100000")w.showReply(b); else {
                            if (h) {
                                h.anihide && h.anihide();
                                h.destroy && h.destroy();
                                h = null
                            }
                            if (d.code == "100022")h = a.ui.tipAlert({msg: e.unPower, type: "warn"}); else if (d.code == "100001") {
                                c && c.setAttribute("isphone", "1");
                                h = a.ui.tipAlert({msg: e.unReply, type: "warn"})
                            } else h = a.ui.tipAlert({msg: d.msg, type: "warn"});
                            h.setLayerXY(c);
                            h.aniShow();
                            a.addClassName(c, "unclick_rep");
                            i && window.clearTimeout(i);
                            i = window.setTimeout(function () {
                                h.anihide && h.anihide();
                                h.destroy && h.destroy();
                                h = null
                            }, 3e3)
                        }
                    }}).request(b.data) : w.showReply(b);
                    return a.preventDefault(b.evt)
                }
                if (h) {
                    h.anihide && h.anihide();
                    h.destroy && h.destroy();
                    h = null
                }
                var d = c.getAttribute("isPhone");
                d ? h = a.ui.tipAlert({msg: e.unReply, type: "warn"}) : h = a.ui.tipAlert({msg: e.unPower, type: "warn"});
                h.setLayerXY(c);
                h.aniShow();
                i && window.clearTimeout(i);
                i = window.setTimeout(function () {
                    h.anihide && h.anihide();
                    h.destroy && h.destroy();
                    h = null
                }, 3e3)
            }
        }, showReply: function (b) {
            var c = b.el, d, e, f;
            while (c.tagName.toLowerCase() != "dl")c = c.parentNode;
            d = a.sizzle('[node-type="commentwrap"]', c)[0];
            var g = b.el;
            e = g.getAttribute("status");
            if (a.core.dom.getStyle(d, "display") != "none" && e == "true") {
                g.setAttribute("status", "false");
                a.core.dom.setStyle(d, "display", "none")
            } else {
                g.setAttribute("status", "true");
                a.core.dom.setStyle(d, "display", "");
                f && f.focus()
            }
            if (!e) {
                f = a.common.comment.reply(d, b.data);
                w.funcs.add(f)
            }
        }, reply: function (b, c) {
            a.common.channel.feed.fire("reply", {obj: b, ret: c, cid: n});
            c.data && c.data.content && w.newDialogue(c.data.content)
        }, newDialogue: function (b) {
            a.core.dom.insertHTML(a.kit.dom.firstChild(k.repeat_list), b, "beforeend")
        }, funcs: {add: function (b) {
            var c = w.funcs.get(b);
            if (!t[c]) {
                t.push(b);
                a.custEvent.add(b, "reply", w.reply)
            }
        }, remove: function (b) {
            if (t[b]) {
                a.custEvent.remove(b);
                t[b] = null;
                delete t[b]
            }
        }, get: function (a) {
            var b, c = !1;
            for (var d = 0; d < t.length; d++) {
                var e = t[d];
                if (e == a) {
                    b = d;
                    c = !0;
                    break
                }
            }
            return b
        }, destroy: function () {
            for (var a = 0; a < t.length; a++)w.funcs.remove(a)
        }}};
        b = {show: function (a) {
            !l && u();
            r = !0;
            c = a.data.cid;
            m = a.data.ouid;
            n = c;
            o = a.data.cuid;
            p = a.data.type || "small";
            b.display();
            b.getDialogueList()
        }, getCid: function () {
            var d = !1, e = a.kit.dom.firstChild(k.repeat_list);
            if (e)var d = e.getAttribute("cid");
            if (d) {
                c = d;
                b.moreArea.show()
            } else b.moreArea.hide()
        }, getDialogueList: function () {
            var a = {cid: c, type: p, ouid: m, cuid: o};
            r && (a.is_more = 1);
            if (!s) {
                b.loading.start();
                f.getTrans("dialogue", {onComplete: function (a) {
                    b.loading.end();
                    if (a.code == "100000") {
                        a.data && a.data.html && b.addContent(a.data.html);
                        r = !1;
                        b.getCid();
                        b.moreArea.setContent(a.msg ? a.msg : d.MOREAREA.DEFAULT)
                    } else if (a.code == "100001") {
                        b.moreArea.setContent(d.MOREAREA.RETRY);
                        b.moreArea.show()
                    } else if (a.code == "100011") {
                        b.moreArea.setContent(d.MOREAREA.DELETEED);
                        b.moreArea.show()
                    }
                }}).request(a)
            }
        }, loading: {start: function () {
            s = !0;
            b.moreArea.setContent(d.MOREAREA.LOADING)
        }, end: function () {
            s = !1;
            b.moreArea.setContent(d.MOREAREA.DEFAULT)
        }}, addContent: function (b) {
            a.core.dom.insertHTML(k.repeat_list, b, "afterbegin")
        }, moreArea: {show: function () {
            a.setStyle(k.more, "display", "")
        }, hide: function () {
            a.setStyle(k.more, "display", "none")
        }, setContent: function (a) {
            k.more.innerHTML = a
        }}, display: function () {
            b.clear();
            g.show();
            g.setMiddle();
            a.setStyle(k.outer, "top", parseInt(a.getStyle(k.outer, "top")) - 30 + "px")
        }, clear: function () {
            k.repeat_list.innerHTML = ""
        }, reset: function () {
            r = !0;
            b.moreArea.show();
            b.clear();
            w.funcs.destroy()
        }, destroy: function () {
            b = null, w = null;
            w.funcs.destroy();
            i && window.clearTimeout(i);
            h && h.anihide && h.anihide();
            h && h.destroy && h.destroy();
            h = null
        }};
        return b
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
STK.register("common.trans.qFace", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("qface", {url: "/aj/comment/qface?_wv=5", method: "get"});
    c("simpqface", {url: "/aj/comment/simpqface?_wv=5", method: "get"});
    c("addqface", {url: "/aj/comment/addqface?_wv=5", method: "post"});
    c("bigqface", {url: "/aj/comment/bigqface?_wv=5", method: "get"});
    c("getAttiudesList", {url: "/aj/comment/attiudes?_wv=5", method: "get"});
    return b
});
STK.register("common.layer.qFace", function (a) {
    var b = a.kit.extra.language, c = {LOADING: b('<div class="W_loading" style="padding-top:10px;padding-bottom:10px;text-align:center"><span>#L{正在加载，请稍候}...</span><i by="` 3`" style="display:none">Your 5\'6.5" cannot fully feed U\'s pit!muhahaha... XD</i></div>')}, d = {}, e = a.common.trans.qFace, f = {pos: "right-bottom", posOffsetX: -185, posOffsetY: 5, arrow: "t", arrowPos: "right", type: "qface", holdOpen: !1}, g = a.ui.bubbleLayer(), h = a.core.evt.delegatedEvent(g.getOuter());
    d.binded = !1;
    d.loaded = !1;
    d.data = {simpqface: null};
    var i = a.C("div");
    i.className = "layer_quick_reply";
    var j = function (a) {
        typeof a == "string" ? i.innerHTML = a : i.appendChild(a)
    };
    g.setContent(i);
    g.setContent = j;
    var k = {parseParam: function (b, c) {
        d.param = b;
        d.options = a.parseParam(f, c || {})
    }, rebuildUI: function () {
        g.setArrow(d.options.arrow, d.options.arrowPos)
    }, getData: function () {
        if (!d.loaded) {
            d.loaded = !0;
            if (d.data[d.options.type] && d.data[d.options.type] !== null)g.setContent(d.data.simpqface); else {
                g.setContent(c.LOADING);
                e.getTrans(d.options.type, {onSuccess: function (a) {
                    d.data[d.options.type] === null && (d.data[d.options.type] = a.data.html);
                    g.setContent(a.data.html)
                }}).request(d.param.data)
            }
        }
    }, show: function () {
        k.flushPos();
        g.show();
        k.getData()
    }, flushPos: function () {
        a.kit.dom.layoutPos(g.getOuter(), d.param.el, {pos: d.options.pos, offsetX: d.options.posOffsetX, offsetY: d.options.posOffsetY})
    }, bind: function () {
        h.add("qface_send", "click", k.send);
        h.add("feed_list_comment", "click", k.openComment);
        d.binded = !0
    }, bindCustEvt: function () {
        a.custEvent.add(g, "show", function () {
            setTimeout(function () {
                a.addEvent(document.body, "click", k.close)
            }, 0)
        });
        a.custEvent.add(g, "hide", function () {
            d.stopBoxClose = !1;
            a.removeEvent(document.body, "click", k.close)
        })
    }, close: function (b) {
        if (d.stopBoxClose)return!0;
        var c = a.fixEvent(b);
        if (!a.contains(g.getOuter(), c.target) && d.param.el !== c.target) {
            g.hide();
            d.loaded = !1
        }
    }, send: function (b) {
        var c = {qid: b.data.qid, mid: b.data.mid || d.param.data.mid};
        e.getTrans("addqface", {onSuccess: function (b, c) {
            a.common.channel.feed.fire("qfaceAdd", {mid: d.param.data.mid, html: b.data.html});
            b.uid && a.common.channel.feed.fire("qfaceCount", {mid: d.param.data.mid});
            if (!d.options.holdOpen) {
                g.hide();
                d.loaded = !1
            }
        }, onFail: k.sentProblem, onError: k.sentProblem}).request(c)
    }, sentProblem: function (b) {
        b.msg && a.ui.alert(b.msg)
    }, openComment: function (b) {
        var c = a.sizzle('[action-type="feed_list_comment"]', d.param.el.parentNode)[0], e = a.sizzle('[node-type="feed_list_repeat"]', a.kit.dom.parentElementBy(d.param.el, document.body, function (a) {
            if (a.nodeName == "DD")return!0
        }))[0];
        if (c && e)if (e.style.display == "none")a.core.evt.fireEvent(c, "click"); else {
            var f = a.sizzle('[node-type="textEl"]', e)[0];
            f && f.focus()
        }
        g.hide();
        return a.core.evt.preventDefault(b.evt)
    }};
    return function (b, c) {
        var e = {};
        d.stopBoxClose = !1;
        var f = function () {
            !d.binded && k.bind();
            k.parseParam(b, c);
            k.rebuildUI();
            k.bindCustEvt();
            k.show()
        };
        f();
        e.destroy = function () {
            g.destroy();
            a.removeEvent(document.body, "click", k.close);
            h.remove("qface_send", "click", k.send);
            h.remove("feed_list_comment", "click", k.openComment)
        };
        return e
    }
});
STK.register("common.comment.plugins.qFace", function (a) {
    var b = {listNum: 9}, c = a.common.trans.qFace;
    return function (d, e) {
        var f, g, h, i = {}, j = 0, k = {simpqFaceShow: function (b) {
            g = a.common.layer.qFace(b, {type: "simpqface"});
            return a.preventDefault(b.evt)
        }, sWritten: function (c) {
            if (h == c.mid) {
                var e = a.sizzle('[node-type="qfaceList_container"]', i.list)[0], f = a.sizzle('[node-type="qfaceList"]', i.list)[0];
                e && (e.style.display = "");
                var g = $CONFIG.uid, j = a.sizzle('li[uid="' + g + '"]', f)[0], l = a.builder(c.html).box.firstChild;
                l.setAttribute("uid", g);
                k.showList();
                j && a.core.dom.removeNode(j);
                if (b.listNum > 0) {
                    var e = a.sizzle("li", i.list), m = e.length - 1, n = a.sizzle("[node-type='morebtn']", d)[0];
                    if (m >= b.listNum) {
                        a.core.dom.removeNode(e[m - 1]);
                        n && a.setStyle(n, "display", "")
                    } else n && a.setStyle(n, "display", "none")
                }
                a.core.dom.insertElement(f, l, "afterbegin")
            }
        }, showList: function () {
            i.list.style.display == "none" && a.setStyle(i.list, "display", "")
        }, send: function (b) {
            var d = {qid: b.data.qid, mid: b.data.mid};
            c.getTrans("addqface", {onSuccess: function (b, c) {
                a.common.channel.feed.fire("qfaceAdd", {mid: c.mid, html: b.data.html});
                b.uid && a.common.channel.feed.fire("qfaceCount", {mid: c.mid})
            }, onFail: k.sentProblem, onError: k.sentProblem}).request(d)
        }, sentProblem: function (b) {
            b.msg && a.ui.alert(b.msg)
        }, prev: function (b) {
            a.preventDefault();
            var c = b.data;
            if (c.link != "0") {
                j = j - 1;
                k.page(c);
                return!1
            }
        }, next: function (b) {
            a.preventDefault();
            var c = b.data;
            if (c.link != "0") {
                j = j + 1;
                k.page(c);
                return!1
            }
        }, page: function (a) {
            c.getTrans("getAttiudesList", {onSuccess: function (a, b) {
                d.innerHTML = a.data.html
            }, onFail: k.sentProblem, onError: k.sentProblem}).request(a)
        }}, l = function () {
            if (!d || !e.mid)throw"Node is not exists OR mid is undefined";
            h = e.mid
        }, m = function () {
            i.list = d
        }, n = function () {
            f = a.core.evt.delegatedEvent(d);
            f.add("simpqface", "click", k.simpqFaceShow);
            f.add("feed_qface_prev", "click", k.prev);
            f.add("feed_qface_next", "click", k.next);
            f.add("qface_send", "click", k.send)
        }, o = function () {
            a.common.channel.feed.register("qfaceAdd", k.sWritten)
        }, p = function () {
            l();
            m();
            n();
            o()
        };
        p();
        return{send: k.send, destroy: function () {
            f.destroy();
            a.common.channel.feed.remove("qfaceAdd", k.sWritten);
            k = f = g = undefined
        }}
    }
});
STK.register("common.comment.commentTemp", function (a) {
    return{reply: '<div class="WB_media_expand repeat S_line1 S_bg1" node-type="commentwrap" style=""><div class="WB_arrow"><em class="S_line1_c">◆</em><span class=" S_bg1_c">◆</span></div><div class="S_line1 input clearfix"><textarea action-type="check" class="W_input" node-type="textEl" name="" rows="" cols="" style="margin: 0px 0px 3px; padding: 4px 4px 0px; border-style: solid; border-width: 1px; font-size: 12px; font-family: Tahoma, 宋体; word-wrap: break-word; line-height: 18px; overflow: hidden; outline: none; height: 20px;" range="11&amp;0"></textarea><div class="action"><span class="W_ico16 ico_faces" node-type="smileyBtn"></span><ul class="commoned_list" node-type="widget"><li><label><input type="checkbox" name="" node-type="forward" class="W_checkbox">#L{同时转发到我的微博}</label></li></ul></div><p class="btn"><a href="javascript:void(0);" class="W_btn_a btn_noloading" action-type="doReply" ><span><b class="loading"></b><em node-type="btnText">#L{评论}</em></span></a></p></div></div>'}
});
STK.register("common.comment.comment", function (a) {
    var b = a.common.comment.commentMsg, c = a.common.comment.commentTemp, d = a.kit.extra.setPlainHash, e = a.common.comment.reply, f = "", g = [], h = {}, i = a.ui.alert, j = a.kit.extra.language, k = a.custEvent, l = k.fire, m = null, n = null, o = a.common.trans.comment, p = {content: j("#L{写点东西吧，评论内容不能为空哦。}"), "delete": j("#L{确定要删除该回复吗}"), reply: j("#L{回复}"), blcok: j("#L{同时将此用户加入黑名单}"), unReply: j(b.noPhoneReplyMsg), unPower: j(b.noPowerReplyMsg)}, q = function (b, g) {
        var h, q, r = g.mid, s, t, u, v, w, x, y, z, A, B, C = new RegExp(["^", p.reply, "@([^:]*):(.*)"].join("")), D = a.core.str, E = a.common.dialog.commentDialogue(), F = {}, G, H, I = g.isMain, J = function (c) {
            var e = a.trim(w.value), k = e.match(C);
            if (e == "" || k && a.trim(k[2]) == "")i(p.content); else {
                if (!k || !k[1] || k[1] != v)t = v = null;
                f = a.sizzle('em[node-type="btnText"]', c.el)[0].innerHTML;
                if (c && c.el) {
                    c.el.className = "W_btn_a_disable";
                    a.sizzle('em[node-type="btnText"]', c.el)[0].innerHTML = j("#L{提交中...}")
                } else {
                    a.sizzle('[action-type="post"]', b)[0].className = "W_btn_a_disable";
                    a.sizzle('em[node-type="btnText"]', b)[0].innerHTML = j("#L{提交中...}")
                }
                d("_rnd" + (+(new Date)).toString());
                var l = a.core.dom.neighbor(c.el).parent('[node-type="feed_list_repeat"]').finish();
                if (!l) {
                    a.log("common.comment.comment: 评论列表的展示区不存在！");
                    return
                }
                var m = a.common.getDiss({act: k ? "reply" : "post", cid: t, content: D.leftB(e, 280), isroot: y && y.checked ? "1" : "0", forward: x && x.checked ? "1" : "0", appkey: g.appkey, mark: g.mark, repeatNode: l}, c.el);
                m = a.core.json.merge(m, c.data);
                h.post(m)
            }
        }, K = function (b) {
            var d = b.el, f = b.data.cid, h = b.data.nick, i = g.mark || "", k = a.core.dom.dir(d, {dir: "parent", expr: ".info", matchAll: !1})[0], l = d.getAttribute("status"), m = F[f] && F[f].DOM, n = m ? a.core.dom.contains(document.body, m) : !1;
            if (m && a.getStyle(m, "display") != "none" && n)a.setStyle(m, "display", "none"); else {
                if (!m || !n) {
                    m = a.builder(j(c.reply)).list.commentwrap[0];
                    k && a.core.dom.insertAfter(m, k);
                    var o = a.kit.extra.merge(b.data, {mid: r, cid: f, content: h, mark: i, module: "scommlist"});
                    F[f] = {handle: e(m, o), DOM: m};
                    a.custEvent.add(F[f].handle, "reply", N)
                }
                a.setStyle(m, "display", "");
                F[f] && F[f].handle.focus()
            }
        }, L = a.core.evt.delegatedEvent(b);
        L.add("post", "click", J);
        L.add("reply", "click", function (b) {
            var c = b.el;
            if (a.core.dom.hasClassName(c, "unclick_rep")) {
                if (m) {
                    m.anihide && m.anihide();
                    m.destroy && m.destroy();
                    m = null
                }
                var d = c.getAttribute("isPhone");
                d ? m = a.ui.tipAlert({msg: p.unReply, type: "warn"}) : m = a.ui.tipAlert({msg: p.unPower, type: "warn"});
                m.setLayerXY(c);
                m.aniShow();
                n && window.clearTimeout(n);
                n = window.setTimeout(function () {
                    m.anihide && m.anihide();
                    m.destroy && m.destroy();
                    m = null
                }, 3e3)
            } else b.data && b.data.ispower == "1" ? o.getTrans("isComment", {onComplete: function (d) {
                if (d.code == "100000") {
                    var e, f, g;
                    (e = b.data) && (f = e.nick) && K(b)
                } else {
                    if (m) {
                        m.anihide && m.anihide();
                        m.destroy && m.destroy();
                        m = null
                    }
                    if (d.code == "100022")m = a.ui.tipAlert({msg: p.unPower, type: "warn"}); else if (d.code == "100001") {
                        c && c.setAttribute("isphone", "1");
                        m = a.ui.tipAlert({msg: p.unReply, type: "warn"})
                    } else m = a.ui.tipAlert({msg: d.msg, type: "warn"});
                    m.setLayerXY(c);
                    m.aniShow();
                    a.addClassName(c, "unclick_rep");
                    n && window.clearTimeout(n);
                    n = window.setTimeout(function () {
                        m.anihide && m.anihide();
                        m.destroy && m.destroy();
                        m = null
                    }, 3e3)
                }
            }}).request(b.data) : K(b)
        });
        L.add("delete", "click", function (b) {
            var c = b.data.block, d = b.data.block ? ['<input node-type="block_user" id="block_user" name="block_user" value="1" type="checkbox"/><label for="block_user">', p.blcok, "</label>"].join("") : "", e = a.ui.confirm(p["delete"], {OK: function (a) {
                var c = a.block_user, d, e;
                (d = b.data) && (e = d.cid) && h.del({act: "delete", cid: e, is_block: c ? "1" : "0"})
            }, textComplex: d})
        });
        var M = function (a) {
            u = a.data.cid;
            E.show(a)
        };
        L.add("commentDialogue", "click", M);
        a.common.channel.feed.register("reply", function (a) {
            a.cid == u && O(a.ret)
        });
        var N = function (a, b, c) {
            O(b, c)
        }, O = function (b, c) {
            var d = b.data;
            if (!d)return!1;
            t = v = null;
            s += 1;
            typeof I == "undefined" && d.comment && z && a.insertHTML(z, d.comment, "afterend");
            l(q, "count", s);
            l(q, "comment", {count: s, html: d.comment, repeatNode: c.repeatNode});
            if (d.feed) {
                l(q, "feed");
                a.common.channel.feed.fire("forward", {html: d.feed})
            }
            P.changeSubmitBtn();
            return!0
        }, P = {changeSubmitBtn: function () {
            var c = a.sizzle("em[node-type='btnText']", b)[0], d = a.sizzle("a[action-type='post']", b)[0];
            d.className = "W_btn_d btn_noloading";
            f && (c.innerHTML = f)
        }, add_success: function (a, b) {
            if (O(a, b)) {
                w.value = "";
                w.focus()
            }
        }, add_fail: function () {
            P.changeSubmitBtn()
        }, add_error: function () {
            P.changeSubmitBtn()
        }, delete_success: function (c, d) {
            s = Math.max(s - 1, 0);
            l(q, "count", s);
            var e = a.sizzle(["dl[comment_id=", d.cid, "]"].join(""), b)[0];
            e && e.parentNode.removeChild(e);
            l(q, "del", {commont_id: d.cid})
        }, delete_fail: function (a, b) {
        }, smallList_success: function (c, d) {
            d.focus = d.focus || !0;
            var e = c.data;
            if (!!e) {
                e.html && (b.innerHTML = e.html);
                d.filter !== 4 ? l(q, "count", [s = e.count * 1 || 0]) : l(q, "count", [s = d.count * 1 || 0]);
                w = a.sizzle("textarea", b)[0];
                setTimeout(function () {
                    w && a.kit.dom.autoHeightTextArea({textArea: w, maxHeight: 9999, inputListener: function () {
                        var b = a.trim(w.value);
                        D.bLength(b) > 280 && (w.value = D.leftB(b, 280))
                    }});
                    if (w)try {
                        A = a.common.editor.base(b, f);
                        A.widget(a.common.editor.widget.face(), "smileyBtn");
                        d.focus && a.core.dom.selectText(w, {start: 0});
                        d.focus && w.focus()
                    } catch (c) {
                    }
                }, 25);
                x = a.sizzle("input[name=forward]", b)[0];
                y = a.sizzle("input[name=isroot]", b)[0];
                z = a.sizzle("div[node-type=commentList]", b)[0];
                H = a.sizzle('[action-type="post"]', b)[0];
                a.core.evt.hotKey.add(z, ["ctrl+enter"], function () {
                    a.fireEvent(H, "click")
                });
                var f = {count: "disabled"}, g = a.sizzle('[node-type="feed_quick_comment_list"]', b)[0];
                if (g) {
                    G = a.common.comment.plugins.qFace(g, {mid: d.mid});
                    L.add("qface_send", "click", G.send)
                }
            }
        }};
        h = a.common.comment.inter(P, g);
        q = k.define(h, ["count", "feed", "comment", "del"]);
        h.destroy = function () {
            A && A.closeWidget();
            if (G) {
                L.remove("qface_send", "click", G.send);
                G.destroy();
                G = undefined
            }
            a.foreach(F, function (b) {
                a.custEvent.remove(b.handle);
                b.DOM = null;
                b.handle = null
            });
            a.core.evt.hotKey.remove(z, ["ctrl+enter"]);
            n && window.clearTimeout(n);
            m && m.anihide && m.anihide();
            m && m.destroy && m.destroy();
            m = null
        };
        return h
    }, r = function (b, c) {
        var d = a.core.arr.indexOf(b, g);
        if (!h[d]) {
            g[d = g.length] = b;
            h[d] = q(b, c)
        }
        return h[d]
    };
    return function (a, b) {
        if (!a || !a.mid)throw"mid is not defined";
        var c = r(b, a);
        if (b.firstChild) {
            b.innerHTML = "";
            b.style.display = "none";
            c.destroy()
        } else if (a) {
            a.act = "list";
            c.load(a);
            b.style.display = ""
        }
        return c
    }
});
STK.register("common.trans.versionTip", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("save", {url: "/aj/guide/versiontip?_wv=5", method: "post"});
    c("userGuider", {url: "/aj/bubble/add?_wv=5", method: "post"});
    c("closeBubble", {url: "/aj/bubble/closebubble?_wv=5", method: "get"});
    return b
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
STK.register("common.dialog.commentDialogueTip", function (a) {
    var b = a.common.guide.util.tipLayer(), c = {binded: null, node: null, target: null, tip: null}, d, e, f = 0, g = a.E("pl_content_versionTip");
    if (!g)a.log("pl host element not valid."); else {
        var h = a.core.evt.delegatedEvent(g), i = {autoinit: function () {
            if (!f)if (c.binded)c.binded === c.node && i.show(); else {
                d = a.sizzle('[messageTip="20"]', g)[0];
                if (d) {
                    var b = i.getTarget(c.node);
                    if (b) {
                        c.binded = c.node;
                        i.createTip();
                        i.show()
                    }
                } else f = 1
            }
        }, getTarget: function (b) {
            return a.sizzle('[action-type="commentDialogue"]', b)[0]
        }, createTip: function () {
            c.tip = a.kit.dom.parseDOM(a.builder(d).list);
            c.tip.outer = d;
            h.add("iKnow", "click", i.close);
            a.addEvent()
        }, close: function (b) {
            i.signKnown(b.data);
            i.hide();
            return a.core.evt.preventDefault(b.evt)
        }, show: function () {
            c.target = i.getTarget(c.binded);
            a.setStyle(c.tip.outer, "visibility", "visible");
            e = window.setInterval(i.flushLocation, 200)
        }, flushLocation: function () {
            var a = {target: c.target, layer: c.tip.outer, pos: "top", arrow: c.tip.arrow}, d = b.getLayerPosition(a.target, a.layer, a.pos, a.arrow);
            b.setPosition(a, d)
        }, hide: function () {
            if (c.binded === c.node && c.tip) {
                a.setStyle(c.tip.outer, "visibility", "hidden");
                e && window.clearInterval(e)
            }
        }, signKnown: function (b) {
            a.common.trans.versionTip.getTrans("closeBubble", {onSuccess: function () {
                f = 1
            }}).request(b)
        }};
        return function (a) {
            c.node = a;
            return{hide: i.hide, show: i.autoinit}
        }
    }
});
STK.register("kit.dom.rotateImage", function (a) {
    var b = {}, c = function (c) {
        var d = a.core.dom.uniqueID(c);
        return b[d] || (b[d] = {})
    }, d = {0: 0, 90: 1, 180: 2, 270: 3}, e = function (a, b) {
        a = ((b || 0) + a) % 360;
        a < 0 && (a = 360 + a);
        var c = Math.PI * a / 180, d = Math.round(Math.cos(c) * Math.pow(10, 15)) / Math.pow(10, 15), e = Math.round(Math.sin(c) * Math.pow(10, 15)) / Math.pow(10, 15);
        return{sin: e, cos: d, M11: d, M12: -e, M21: e, M22: d, angle: a, rotation: c}
    }, f = function (b, c, f, g) {
        f = f || 440;
        var h = e(c, g.oldAngle);
        c = g.oldAngle = h.angle;
        b.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h.M11 + ",M12=" + h.M12 + ",M21=" + h.M21 + ",M22=" + h.M22 + ",SizingMethod='auto expand')";
        a.setStyle(b.parentNode, "position", "relative");
        if (d[c] % 2 == 0) {
            b.width = g.originalWidth;
            b.height = g.originalHeight;
            a.setStyle(b.parentNode, "height", b.height + "px");
            a.setStyle(b, "position", "static")
        } else if (d[c] % 2 == 1) {
            b.height = g.originalHeight > f ? f : g.originalHeight;
            b.width = b.height * g.originalWidth / g.originalHeight;
            a.setStyle(b.parentNode, "height", b.width + "px");
            a.setStyle(b, "position", "absolute");
            a.setStyle(b, "left", Math.abs((b.parentNode.offsetWidth - b.height) / 2) + "px");
            a.setStyle(b, "top", "0")
        }
    }, g = function (a, b, c, d) {
        var e = a;
        d.oldAngle = e.angle = ((e.angle == undefined ? 0 : e.angle) + b) % 360;
        if (e.angle >= 0)var f = Math.PI * e.angle / 180; else var f = Math.PI * (360 + e.angle) / 180;
        var g = Math.cos(f), h = Math.sin(f), i = document.createElement("canvas");
        e.oImage ? i.oImage = e.oImage : i.oImage = e;
        var j = new Image;
        j.onload = function () {
            i.style.width = i.width = Math.abs(g * j.width) + Math.abs(h * j.height);
            i.style.height = i.height = Math.abs(g * j.height) + Math.abs(h * j.width);
            if (i.width > c) {
                i.style.width = c + "px";
                i.style.height = c * j.width / j.height + "px"
            }
            var a = i.getContext("2d");
            a.save();
            f <= Math.PI / 2 ? a.translate(h * j.height, 0) : f <= Math.PI ? a.translate(i.width, -g * j.height) : f <= 1.5 * Math.PI ? a.translate(-g * j.width, i.height) : a.translate(0, -h * j.width);
            a.rotate(f);
            try {
                a.drawImage(j, 0, 0, j.width, j.height)
            } catch (b) {
            }
            a.restore();
            i.angle = e.angle;
            e.parentNode.replaceChild(i, e);
            i.id = e.id;
            j.onload = null
        };
        j.src = i.oImage.src;
        return i
    }, h = function () {
        var a = ["transform", "MozTransform", "webkitTransform", "OTransform"], b = 0, c = document.createElement("div").style;
        while (a[b] && !(a[b]in c))++b;
        return a[b]
    }(), i = function (b, c, f, g) {
        var i = e(c, g.oldAngle), j;
        c = g.oldAngle = i.angle;
        if (!g.rotated) {
            g.rotated = !0;
            j = a.C("div");
            j.style.position = "relative";
            g.textAlign = j.style.textAlign = a.getStyle(b.parentNode, "textAlign");
            b.parentNode.insertBefore(j, b);
            j.appendChild(b);
            b.style.position = "absolute"
        } else j = b.parentNode;
        if (d[c] % 2 == 0) {
            g.originalWidth > f ? g.imgViewWidth = b.width = f : g.imgViewWidth = b.width = g.originalWidth;
            g.imgViewHeight = b.height = g.originalHeight
        } else if (d[c] % 2 == 1) {
            g.originalHeight > f ? g.imgViewWidth = b.height = f : g.imgViewWidth = b.height = g.originalHeight;
            g.imgViewHeight = b.width = b.height * g.originalWidth / g.originalHeight
        }
        j.style.height = g.imgViewHeight + "px";
        f > j.offsetWidth && (j.style.width = f + "px");
        b.style[h] = "matrix(" + i.M11 + "," + i.M21 + "," + i.M12 + "," + i.M22 + ", 0, 0)";
        var k = (g.imgViewHeight - g.imgViewWidth) / 2, l = (g.imgViewWidth - g.imgViewHeight) / 2;
        if (d[c] % 2 == 0) {
            b.style.top = "0px";
            g.textAlign == "center" ? b.style.left = (j.offsetWidth - g.imgViewWidth) / 2 + "px" : b.style[g.textAlign == "right" ? "right" : "left"] = "0px"
        } else {
            b.style.top = k + "px";
            g.textAlign == "center" ? b.style.left = l + (j.offsetWidth - g.imgViewWidth) / 2 + "px" : b.style[g.textAlign == "right" ? "right" : "left"] = l + "px"
        }
    }, j = function (b, d, e) {
        var j = c(b);
        if (!("originalWidth"in j)) {
            j.originalWidth = b.width;
            j.originalHeight = b.height
        }
        e || (e = j.originalWidth);
        h ? i(b, d, e, j) : "getContext"in a.C("canvas") ? g(b.canvas ? b.canvas : b, d, e, j) : "filters"in a.C("div") && f(b, d, e, j)
    }, k = {rotateRight: function (a, b, c) {
        j(a, b == undefined ? 90 : b, c)
    }, rotateLeft: function (a, b, c) {
        j(a, b == undefined ? -90 : -b, c)
    }, rotateDefault: function (a) {
        var b = c(a);
        b.oldAngle && j(a, 360 - b.oldAngle, b.originalWidth)
    }, removeDataCache: function (c) {
        var d = a.uniqueID(c), e;
        if (h)if (e = c.parentNode && c.parentNode.parentNode) {
            c.parentNode.parentNode.insertBefore(c, e);
            a.removeNode(e)
        }
        b[d] && delete b[d]
    }, destroy: function () {
        b = {}
    }};
    return k
});
STK.register("common.trans.weiboDetail", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("delete", {url: "/aj/comment/del?_wv=5", method: "post"});
    c("deleteWeibo", {url: "/aj/mblog/del?_wv=5", method: "post"});
    c("delmblog", {url: "/aj/mblog/del?_wv=5", method: "post"});
    c("feedlist", {url: "/aj/comment/big?_wv=5", method: "get"});
    c("forward", {url: "/aj/mblog/info/big?_wv=5", method: "get"});
    c("mediaShow", {url: "http://api.weibo.com/widget/show.jsonp", varkey: "jsonp", method: "get", requestMode: "jsonp"});
    c("qingShow", {url: "http://api.t.sina.com.cn/widget/show.json?source=3818214747", varkey: "callback", method: "get", requestMode: "jsonp"});
    c("widget", {url: "/aj/mblog/showinfo?_wv=5", method: "post"});
    c("third_rend", {url: "/aj/mblog/renderfeed?_wv=5", method: "post"});
    return b
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
STK.register("common.feed.widget", function (a) {
    var b = {};
    return{add: function (c, d) {
        if (!b[c]) {
            b[c] = a.widget.parse(d);
            b[c].init()
        }
    }, clear: function (a) {
        if (b[a]) {
            b[a].destroy();
            delete b[a]
        }
    }, destroy: function () {
        for (var a in b) {
            b[a].destroy();
            delete b[a]
        }
    }}
});
STK.register("common.content.weiboDetail.utils", function (a) {
    return function () {
        var b = a.core.evt.preventDefault, c = a.kit.extra.language, d = a.kit.dom.firstChild, e = a.kit.dom.parentAttr, f = a.core.util.getUniqueKey, g = a.core.dom.uniqueID, h = a.core.dom.sizzle, i = a.core.dom.next, j = 40, k = 450, l = c("#L{加载失败}!"), m = c("#L{很抱歉，该内容无法显示，请稍后再试。}"), n, o, p = a.kit.dom.fix, q = a.core.util.easyTemplate, r = a.common.feed.feedList.feedTemps, s = a.core.dom.hasClassName, t = a.core.dom.addClassName, u = a.core.dom.removeClassName, v = a.common.trans.weiboDetail.getTrans, w = a.kit.dom.rotateImage, x = a.kit.extra.toFeedText, y = a.kit.extra.parseURL().url, z = $CONFIG.imgPath + "/style/images/common/loading.gif", A, B = {mediaVideoMusicTEMP: c('<#et temp data><p class="medis_func S_txt3"><a href="${data.short_url}" title="${data.fTitle}" class="show_big" target="_blank">${data.title}</a></p><div node-type="feed_list_media_big${data.type}Div" style="text-align:center;min-height:18px;"><img class="loading_gif" src="' + z + '"/></div>' + "</#et>"), widgetTEMP: c('<#et temp data><p class="medis_func S_txt3"><#if (!data.notForward)><a href="javascript:void(0);" action-type="feed_list_media_toSmall" class="retract"><em class="W_ico12 ico_retract"></em>#L{收起}</a><i class="W_vline">|</i></#if><a <#if (data.suda)>suda-data="${data.suda}"</#if> href="${data.full_url}" title="${data.full_url}" class="show_big" target="_blank"><em class="W_ico12 ico_showbig"></em>${data.title}</a></p><div node-type="feed_list_media_widgetDiv"><img class="loading_gif" src="' + z + '"/></div>' + "</#et>"), qingTEMP: c('<#et temp data><p class="medis_func S_txt3"><#if (!data.notForward)><a href="javascript:void(0);" action-type="feed_list_media_toSmall" class="retract"><em class="W_ico12 ico_retract"></em>#L{收起}</a><i class="W_vline">|</i></#if><a <#if (data.suda)>suda-data="${data.suda}"</#if> href="${data.full_url}" title="${data.full_url}" class="show_big" target="_blank"><em class="W_ico12 ico_showbig"></em>${data.title}</a></p><div node-type="feed_list_media_qingDiv"><img class="loading_gif" src="' + z + '"/></div>' + "</#et>")}, C = {getMid: function (a, b) {
            return a.mid || (a.mid = e(a, "mid", b))
        }, getFeedNode: function (a) {
            while (a && a.getAttribute && a.getAttribute("node-type") !== "weibo_info" && a.tagName && a.tagName.toLowerCase() != "dl")a = a.parentNode;
            return a
        }, preventDefault: function (a) {
            b(a);
            return!1
        }, tabSwitch: function (a, b, c, d) {
            var e = a.parentNode, f = !1, g = c.split(" "), i;
            if (d) {
                var j = a.getAttribute("action-type"), k = a.getAttribute("action-data"), l = j === "forword_tab_click" && (k === "privatemsg" || k === "microgroup");
                d.feed_list.style.display = l ? "none" : "";
                d.feed_cate.style.display = l ? "none" : ""
            }
            if (!s(a, b)) {
                i = h("." + b, e)[0];
                for (var m = 0; m < g.length; m++)u(i, g[m]);
                t(a, c);
                f = !0
            }
            a.blur();
            return f
        }, getMediaPDNodes: function (b, c) {
            return{prev: a.sizzle("[node-type=feed_list_media_prev]", b)[0], disp: a.sizzle("[node-type=feed_list_media_disp]", b)[0]}
        }, smallImgFun: function (b) {
            var c = b.el, d = C.preventDefault(b.evt);
            if (c.loading)return d;
            c.tagName.toLowerCase() !== "img" && (c = a.sizzle("img", c)[0]);
            c.loading = 1;
            var e = c.src.replace("/thumbnail/", "/bmiddle/"), g = "http://photo.weibo.com/" + data.uid + "/wbphotos/large/photo_id/" + data.mid + "?refer=weibofeedv5", h = C.getFeedNode(c), i = h.getAttribute("isForward") ? 1 : "", j, l;
            if (!h) {
                a.log("parents attribute mid node is undefined!");
                return d
            }
            h.isForward = i;
            var m = C.getMediaPDNodes(h, i);
            if (!m || !m.prev || !m.disp) {
                a.log('node-type="feed_list_media_prev" or node-type="feed_list_media_disp" in a feed\'s node is undefined!');
                return d
            }
            var n = function () {
                c.loading = 0;
                if (j) {
                    c.bigImgWidth = j.width;
                    j.onload = null
                }
                l && (l.style.display = "none");
                m.prev.style.display = "none";
                m.disp.innerHTML = "";
                m.disp.appendChild(a.builder(q(r.mediaIMGTEMP, {notForward: !i, uniqueId: f(), bigSrc: e, largeSrc: g, bigWidth: c.bigImgWidth > k ? k : c.bigImgWidth, suda: {retract: "key=feed_image_click&value=image_zoomout", showBig: "key=tblog_newimage_feed&value=single_larger_image", left: "key=feed_image_click&value=image_turnlift", right: "key=feed_image_click&value=image_turnright", big: "key=feed_image_click&value=image_zoomout"}}).toString()).box);
                m.disp.style.display = ""
            };
            if (c.bigImgWidth)n(); else {
                var o = c.offsetWidth, p = parseInt(c.offsetHeight / 2 - 8);
                (l = a.core.dom.next(c)).style.cssText = "margin:" + p + "px " + parseInt(o / 2 - 8) + "px " + p + "px -" + parseInt(o / 2 + 8) + "px;";
                l.style.display = "";
                (j = new Image).onload = n;
                j.src = e
            }
            return d
        }, bigImgFun: function (b, c, d) {
            var e = b.el, f = C.preventDefault(b.evt);
            if (!d && !/(img)|(canvas)/.test(b.evt.target.tagName.toLowerCase()))return f;
            var g = C.getFeedNode(e);
            if (!g)a.log("parents attribute mid is undefined!"); else {
                g.disp = "";
                var h = C.getMediaPDNodes(g, g.isForward);
                if (!h.prev) {
                    a.log('media: node-type="feed_list_media_prev" is not be found in feed item');
                    return
                }
                if (!h.disp) {
                    a.log('media: node-type="feed_list_media_disp" is not be found in feed item');
                    return
                }
                a.position(h.disp).t < a.scrollPos().top && g.scrollIntoView();
                h.prev.style.display = "";
                h.disp.style.display = "none";
                h.disp.innerHTML = "";
                var i = g.getAttribute("mid");
                i && a.common.feed.widget.clear(i);
                return f
            }
        }, toFloatFun: function (b, c, d) {
            o && a.fireEvent(o, "click");
            var e = b.el, f = decodeURIComponent(b.data.title), g = C.getMid(e, c), h = d.dispContentNode[g], i = h.mediaData, j = a.builder(q(r.mediaVideoMusicFloatTEMP, {title: decodeURIComponent(f)}).toString()), k = j.list.outer[0], l = j.list.mediaContent[0];
            o = j.list.close[0];
            document.body.appendChild(k);
            n = p(k, "rb");
            if (i) {
                l.innerHTML = "";
                l.appendChild(a.builder(i).box);
                n.setFixed(!0)
            } else d.dispContentNode[g] = l;
            a.addEvent(o, "click", function () {
                a.removeEvent(o, "click", arguments.callee);
                n && n.destroy();
                a.removeNode(k);
                n = j = k = o = null
            });
            return C.bigImgFun(b, c, !0)
        }, newsFeed: function (b, c) {
            var d = b.el;
            while (d && !a.hasClassName(d, "WB_info"))d = d.parentNode;
            var e = a.sizzle("[node-type=feed_list_news]", d)[0];
            e && (e.style.display = c ? "" : "none")
        }, smallVideoMusicClickFun: function (b, c, d, e) {
            try {
                var f = b.el, g = b.data, h = C.getFeedNode(f), i = h.getAttribute("isForward") ? 1 : "", j = C.getMid(f, c), k = C.getMediaPDNodes(h, i);
                if (!k.prev) {
                    a.log('media: node-type="feed_list_media_prev" is not be found in feed item');
                    return
                }
                if (h.disp == g.short_url)return;
                h.disp = g.short_url;
                h.isForward = i;
                k.prev.style.display = "none";
                var m = decodeURIComponent(g.title), o = a.bLength(m) > 71 ? a.leftB(m, 70) + "..." : m;
                m = a.bLength(m) > 24 ? a.leftB(m, 23) + "..." : m;
                k.disp.innerHTML = "";
                k.disp.appendChild(a.builder(q(i ? r.mediaVideoMusicTEMP : B.mediaVideoMusicTEMP, {notForward: !i, short_url: decodeURIComponent(g.short_url), full_url: decodeURIComponent(g.full_url), title: m, fTitle: o, type: d}).toString()).box);
                if (!k.disp) {
                    a.log('media: node-type="feed_list_media_disp" is not be found in feed item');
                    return
                }
                k.disp.style.display = "";
                var p = a.sizzle('div[node-type="feed_list_media_big' + d + 'Div"]', k.disp)[0];
                if (!p) {
                    a.log('media: note-type="feed_list_media_big' + d + 'Div" is not be found in feed_list_media_disp node!');
                    return
                }
                e.dispContentNode[j] = p;
                var s = "default";
                try {
                    a.IE ? s = "object" : navigator.plugins["Shockwave Flash"] ? s = "embed" : s = "html5"
                } catch (t) {
                }
                var u = function () {
                    p.innerHTML = l
                }, w = function (b) {
                    if (!b.result || b.error_code || b.error)u(); else {
                        var c = e.dispContentNode[j];
                        c.mediaData = b.result;
                        c.innerHTML = "";
                        c.appendChild(a.builder(c.mediaData).box);
                        n && n.setFixed(!0)
                    }
                };
                v("mediaShow", {onComplete: w, onFail: u}).request({vers: 3, lang: $CONFIG.lang, mid: j, short_url: g.short_url.replace(/http\:\/\/(t|sinaurl)\.cn\//, ""), template_name: s, source: "3818214747"});
                a.scrollTo(k.disp, {step: 1})
            } catch (t) {
                a.log("video err : ", t.message)
            }
        }, rotateImg: function (b, c) {
            var d = b.el, e = C.getFeedNode(d);
            if (!d.parentNode.uid) {
                var h = a.sizzle('img[action-type="feed_list_media_bigimg"]', e)[0];
                d.parentNode.uid = g(h) + "_" + f();
                h.setAttribute("id", d.parentNode.uid)
            }
            var i = c === "right" ? "rotateRight" : "rotateLeft";
            w[i](a.E(d.parentNode.uid), 90, k)
        }, getForwardOptions: function (a) {
            var b = d(a), c = C.getFeedNode(b), e = c.getAttribute("mid"), f = h("div.WB_text", a)[0], g = h('[node-type="feed_list_forwardContent"]', c)[0], i = h('[action-type="feed_list_media_img"]', a)[0] || h('[action-type="feed_list_media_bigimg"]', a)[0], j = i && i.src && i.src.replace(/^.*?\/([^\/]+).gif$/, "$1");
            f = h("em", f)[0];
            var k = x(f.innerHTML), l = f.getAttribute("nick-name"), m = null, n = null;
            if (g) {
                m = k;
                n = l;
                k = x(h("div.WB_text", g)[0].innerHTML);
                l = h("a.WB_name", g)[0].getAttribute("nick-name")
            }
            return{mid: e, appkey: "", url: y, originNick: l, reason: m, origin: k, forwardNick: n, pid: j, styleId: 2}
        }, getCount: function (a) {
            var b = a.match(/\(([\d]*)\)/);
            b = b ? parseInt(b[1]) : 0;
            return b
        }, qingExpand: function (b, c, d) {
            var e = b.el, f = C.getMid(e, c), g = b.data, h = C.getFeedNode(e, c), i = h.getAttribute("isForward") ? "1" : "", k = C.getMediaPDNodes(h, i);
            if (h.disp != g.short_url) {
                h.isForward = i;
                a.common.feed.widget.clear(f);
                k.disp.innerHTML = "";
                k.disp.appendChild(a.builder(q(B.qingTEMP, {notForward: !i, short_url: decodeURIComponent(g.short_url), full_url: decodeURIComponent(g.full_url), title: decodeURIComponent(g.title), suda: decodeURIComponent(g.suda || "")}).toString()).box);
                k.prev.style.display = "none";
                k.disp.style.display = "";
                var l = a.sizzle('div[node-type="feed_list_media_qingDiv"]', k.disp)[0], n = function (b) {
                    var c = b.code;
                    if (c + "" == "1") {
                        b = b.data;
                        if (!b.result)return;
                        l.innerHTML = b.result;
                        a.common.feed.widget.add(f, k.disp)
                    } else o(b)
                }, o = function (a) {
                    l.innerHTML = m
                }, p = g.template_name;
                p ? p == "video" && (a.IE ? p = "object" : navigator.plugins && navigator.plugins["Shockwave Flash"] ? p = "embed" : p = "html5") : p = "";
                v("qingShow", {onComplete: n, onFail: o}).request({short_url: g.short_url, lang: window.$CONFIG && window.$CONFIG.lang || "zh-cn", mid: f, vers: 3, template_name: p});
                a.scrollTo(k.disp, {step: 1, top: j})
            }
        }, thirdExpand: function (b, c, d) {
            var e = b.el, f = C.getMid(e, c), g = b.data, h = C.getFeedNode(e, c), i = h.getAttribute("isForward") ? "1" : "", j = C.getMediaPDNodes(h, i);
            if (h.disp != g.short_url) {
                h.disp = g.short_url;
                h.isForward = i;
                a.common.feed.widget.clear(f);
                j.disp.innerHTML = "";
                j.disp.appendChild(a.builder(q(B.widgetTEMP, {notForward: !i, short_url: decodeURIComponent(g.short_url), full_url: decodeURIComponent(g.full_url), title: decodeURIComponent(g.title), suda: decodeURIComponent(g.suda || "")}).toString()).box);
                j.prev.style.display = "none";
                j.disp.style.display = "";
                var k = a.sizzle('div[node-type="feed_list_media_widgetDiv"]', j.disp)[0];
                v("third_rend", {onSuccess: function (b) {
                    b = b.data;
                    if (!!b.html) {
                        k.innerHTML = b.html;
                        a.scrollTo(j.disp, {step: 1});
                        a.common.feed.widget.add(f, j.disp)
                    }
                }, onFail: function (a) {
                    k.innerHTML = a && a.msg || l
                }, onError: function (a) {
                    k.innerHTML = a && a.msg || l
                }}).request(a.kit.extra.merge({isforward: i, mid: f}, g))
            }
        }, widgetExpand: function (b, c, d) {
            var e = b.el, f = C.getMid(e, c), g = b.data, h = C.getFeedNode(e, c), i = h.getAttribute("isForward") ? "1" : "", j = C.getMediaPDNodes(h, i);
            if (h.disp != g.short_url) {
                h.disp = g.short_url;
                h.isForward = i;
                a.common.feed.widget.clear(f);
                j.disp.innerHTML = "";
                j.disp.appendChild(a.builder(q(B.widgetTEMP, {notForward: !i, short_url: decodeURIComponent(g.short_url), full_url: decodeURIComponent(g.full_url), title: decodeURIComponent(g.title), suda: decodeURIComponent(g.suda || "")}).toString()).box);
                j.prev.style.display = "none";
                j.disp.style.display = "";
                var k = a.sizzle('div[node-type="feed_list_media_widgetDiv"]', j.disp)[0];
                v("widget", {onSuccess: function (b) {
                    b = b.data;
                    if (!!b.html) {
                        k.innerHTML = b.html;
                        a.scrollTo(j.disp, {step: 1});
                        a.common.feed.widget.add(f, j.disp)
                    }
                }, onFail: function (a) {
                    k.innerHTML = a && a.msg || l
                }, onError: function (a) {
                    k.innerHTML = a && a.msg || l
                }}).request({short_url: decodeURIComponent(g.short_url), isforward: i, mid: f})
            }
        }};
        return C
    }
});
STK.register("common.feed.feedList.plugins.comment", function (a) {
    var b = a.common.feed.feedList.utils, c = a.core.dom.uniqueID, d = a.common.feed.feedList.feedTemps, e = {}, f = a.common.trans.comment.getTrans, g = a.kit.extra.language("#L{评论}"), h = a.kit.extra.language("#L{转发}"), i = a.common.content.weiboDetail.utils(), j = a.kit.extra.language, k = a.common.trans.comment, l = a.kit.extra.setPlainHash;
    return function (m) {
        var n = !1, o = null, p = null, q = {};
        if (!m)a.log("comment : need object of the baseFeedList Class"); else {
            var r = m.getNode(), s = {}, t = !1, u = function (b, c, d, e) {
                var f = b.parentNode, g = !1, h = c.split(" "), i;
                if (!a.core.dom.hasClassName(b, c)) {
                    i = a.core.dom.sizzle("." + e, f)[0];
                    for (var j = 0; j < h.length; j++)a.core.dom.removeClassName(i, h[j]);
                    a.core.dom.addClassName(i, d);
                    a.core.dom.addClassName(b, c);
                    g = !0
                }
                b.blur();
                return g
            }, v = function (f) {
                t = !1;
                var i = f.el, k = c(i), o = e[k], s = b.getMid(i, r), v = b.getFeedNode(i, r), w;
                if ($CONFIG.location == "home") {
                    w = a.core.dom.neighbor(i).parent('[node-type="feed_list_funcLink"]').next('[node-type="feed_list_repeat"]').finish();
                    w == i && (w = a.sizzle('[node-type="feed_list_repeat"]', v)[0])
                } else w = a.sizzle('[node-type="feed_list_repeat"]', v)[0];
                var x = i.dataset && i.dataset.mark || i.getAttribute("data-mark") || "", y = {};
                x && (y = a.queryToJson(x));
                if (!w)a.log("feedList.plugins.comment: 评论列表的展示区不存在！"); else {
                    if (!o) {
                        l("_rnd" + (+(new Date)).toString());
                        o = e[k] = a.common.comment.comment(a.common.getDiss(a.core.json.merge(a.core.json.merge({mid: s, appkey: f.data.appkey, isMain: !0}, f.data), y), f.el), w);
                        a.custEvent.add(o, "count", function (a, b) {
                            if (!(parseInt(b) < 1)) {
                                i.innerHTML = g + "(" + b + ")";
                                $CONFIG.location == "home" && z(w)
                            }
                        });
                        a.custEvent.add(o, "comment", function (b, c) {
                            var d = c.repeatNode;
                            p = a.sizzle('a[node-type="feed_list_commentTabAll"]', d)[0];
                            var e = a.sizzle('[node-type="feed_list_commentList"]', d)[0], f = c.html, g = parseInt(c.count), h = a.sizzle('[node-type="feed_list_commentListNum"]', d)[0];
                            parseInt(g) > 0 && h && (h.innerHTML = j("#L{共}") + g + j("#L{条}"));
                            if (!p)f && a.insertHTML(e, f, "afterbegin"); else if (!q[s])f && a.insertHTML(e, f, "afterbegin"); else {
                                e.innerHTML = q[s];
                                u(p, "current S_txt1", "S_func1", "current");
                                n = !1;
                                f && a.insertHTML(e, f, "afterbegin")
                            }
                            q[s] = e.innerHTML
                        });
                        a.custEvent.add(o, "feed", function () {
                            var b = a.sizzle('a[action-type="feed_list_forward"]', i.parentNode)[0];
                            if (!b)a.log("feedList.plugins.comment: 转发按钮节点不存在！"); else {
                                var c = b.innerHTML.match(/\(([\d]*)\)/);
                                b.innerHTML = h + "(" + (c ? parseInt(c[1]) + 1 : 1) + ")"
                            }
                        });
                        a.custEvent.add(o, "del", function (b, c) {
                            p = a.sizzle('a[node-type="feed_list_commentTabAll"]', v)[0];
                            var d = a.sizzle('[node-type="feed_list_commentList"]', v)[0];
                            if (q[s])if (!n)d && (q[s] = d.innerHTML); else {
                                var e = document.createElement("div");
                                e.innerHTML = q[s];
                                a.core.util.hideContainer.appendChild(e);
                                var f = a.sizzle(["dl[comment_id=", c.cid, "]"].join(""), e)[0];
                                f && f.parentNode.removeChild(f);
                                q[s] = e.innerHTML;
                                a.core.util.hideContainer.removeChild(e);
                                e = null
                            } else p && (q[s] = d.innerHTML)
                        });
                        w.innerHTML = d.loadingIMG;
                        w.style.display = "";
                        a.custEvent.fire(m, "commentShow", i)
                    } else {
                        a.custEvent.remove(o);
                        o.destroy();
                        delete e[k];
                        w.on = 0;
                        w.innerHTML = "";
                        w.style.display = "none";
                        $CONFIG.location == "home" && A(w);
                        a.custEvent.fire(m, "commentHide", i)
                    }
                    return b.preventDefault()
                }
            }, w = function (b) {
                a.core.evt.preventDefault();
                if (!t) {
                    t = !0;
                    v(b)
                }
            }, x = {getListByType: function (c, d) {
                var e = c.data, g = e.mid, h = c.el, k = b.getFeedNode(h, r), m = u(c.el, "current S_txt1", "S_func1", "current");
                if (!m)return i.preventDefault();
                l("_rnd" + (+(new Date)).toString());
                f("cfilter", {onSuccess: function (b) {
                    d.innerHTML = b.data.html;
                    n || (q[g] = b.data.html);
                    var c = a.sizzle('[node-type="feed_list_commentListNum"]', k)[0];
                    c && b.data && typeof b.data.count != "undefined" && (c.innerHTML = j("#L{共}") + b.data.count + j("#L{条}"));
                    k = null
                }, onFail: function (b) {
                    a.ui.alert(b.msg || a.kit.extra.language("#L{接口返回数据错误}"));
                    k = null
                }, onError: function (b) {
                    a.ui.alert(b.msg || a.kit.extra.language("#L{接口返回数据错误}"));
                    k = null
                }}).request(e);
                return!1
            }}, y = function (c) {
                a.preventDefault();
                var d = c.data.mid;
                n = c.el.getAttribute && c.el.getAttribute("node-type") == "feed_list_commentTabAll" ? !1 : !0;
                var e = c.el, f = b.getFeedNode(e, r), g = c.data, h = a.sizzle('[node-type="feed_list_commentList"]', f)[0];
                q[d] || (q[d] = h.innerHTML);
                h ? x.getListByType(c, h) : a.log("feedList.plugins.comment: 评论列表不存在！")
            }, z = function (b) {
                a.common.dialog.commentDialogueTip && a.common.dialog.commentDialogueTip(b).show()
            }, A = function (b) {
                a.common.dialog.commentDialogueTip && a.common.dialog.commentDialogueTip(b).hide()
            };
            m.getDEvent().add("feed_list_comment", "click", w);
            m.getDEvent().add("feed_list_commentSearch", "click", y);
            m.getDEvent().add("feed_private_tipclose", "click", function (c) {
                var d = c.data && c.data.type, e = b.getFeedNode(c.el, r), f = a.sizzle("[node-type='feed_privateset_tip']", e), g = c.data || {}, h = g.bubbletype || 7, i = g.time || 7, j = f.length && f[0];
                j && a.setStyle(j, "display", "none");
                k.getTrans("privateNoMore", {onSuccess: function () {
                    d && (window.location.href = c.el.getAttribute("href"))
                }, onError: a.funcEmpty}).request({bubbletype: h, time: i * 86400});
                return b.preventDefault()
            });
            m.regCustEvent("showComment", function (a, b) {
                w(b)
            });
            s.destroy = function () {
                for (var a in e)e[a].destroy();
                p = null;
                q = null;
                e = {};
                o = null
            };
            return s
        }
    }
});
STK.register("common.trans.feed.attitude", function (a) {
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
STK.register("common.feed.feedList.plugins.media", function (a) {
    var b = a.common.feed.feedList.utils, c = a.common.feed.feedList.feedTemps, d = a.core.util.easyTemplate, e = a.kit.extra.language, f = e("#L{加载失败}!"), g = e("#L{很抱歉，该内容无法显示，请稍后再试。}"), h = a.core.util.browser.IE, i = 40, j = 450, k = function (b, c) {
        return{prev: a.sizzle("[node-type=feed_list_media_prev]", b)[0], disp: a.sizzle("[node-type=feed_list_media_disp]", b)[0]}
    }, l = function (e, f, g) {
        var h = e.el, i = e.data, l = decodeURIComponent(i.pic_objects || ""), m = l.split("|");
        if (!h.loading) {
            h.tagName.toLowerCase() !== "img" && (h = a.sizzle("img", h)[0]);
            h.loading = 1;
            var n = /\/thumbnail\/.+(?=\.\w+)/.exec(h.src);
            n && (n = n[0].replace("/thumbnail/", ""));
            var o = h.src.replace("/thumbnail/", "/bmiddle/"), p = "http://photo.weibo.com/" + i.uid + "/wbphotos/large/photo_id/" + i.mid + "?refer=weibofeedv5", q = b.getFeedNode(h, f), r = q.getAttribute("isForward") ? 1 : "", s = b.getMid(h, f), t = "pid=" + (i.pid ? i.pid : n) + "&mid=" + i.mid + "&uid=" + i.uid + "&pic_objects=" + i.pic_objects, u, v;
            if (!q) {
                a.log("parents attribute mid node is undefined!");
                return
            }
            q.isForward = r;
            var w = k(q, r);
            if (!w || !w.prev || !w.disp) {
                a.log('node-type="feed_list_media_prev" or node-type="feed_list_media_disp" in a feed\'s node is undefined!');
                return
            }
            if (g.voteObj[s]) {
                g.voteObj[s].destroy();
                delete g.voteObj[s]
            }
            var x = function () {
                h.loading = 0;
                if (u) {
                    h.bigImgWidth = u.width;
                    u.onload = null
                }
                v && (v.style.display = "none");
                w.prev.style.display = "none";
                w.disp.innerHTML = "";
                w.disp.appendChild(a.builder(d(c.mediaIMGTEMPwithBtn, {notForward: !r, uniqueId: a.core.util.getUniqueKey(), bigSrc: o, acdata: t, pid: i.pid ? i.pid : n, mid: i.mid, is_liked: +m[1], count: m[2] || 0, object_id: m[3], bigWidth: h.bigImgWidth > j ? j : h.bigImgWidth, suda: {retract: "key=feed_image_click&value=image_zoomout", showBig: "key=tblog_newimage_feed&value=single_larger_image", left: "key=feed_image_click&value=image_turnlift", right: "key=feed_image_click&value=image_turnright", big: "key=feed_image_click&value=image_zoomout"}}).toString()).box);
                w.disp.style.display = "";
                var b = a.sizzle('[node-type="count"]', w.disp)[0];
                b && b.innerHTML == "(0)" && a.removeNode(b)
            };
            if (h.bigImgWidth)x(); else {
                var y = h.offsetWidth, z = parseInt(h.offsetHeight / 2 - 8);
                (v = a.core.dom.next(h)).style.cssText = "margin:" + z + "px " + parseInt(y / 2 - 8) + "px " + z + "px -" + parseInt(y / 2 + 8) + "px;";
                (u = new Image).onload = x;
                u.src = o
            }
        }
    }, m = function (c, d, e) {
        var f = c.el;
        if (!!e || !!/(img)|(canvas)/.test(c.evt.target.tagName.toLowerCase())) {
            var g = b.getFeedNode(f, d);
            if (!g) {
                a.log("parents attribute mid is undefined!");
                return
            }
            g.disp = "";
            var h = k(g, g.isForward);
            if (!h || !h.prev || !h.disp) {
                a.log('node-type="feed_list_media_prev" or node-type="feed_list_media_disp" in a feed\'s node is undefined!');
                return
            }
            a.position(h.disp).t < a.scrollPos().top && g.scrollIntoView();
            h.prev.style.display = "";
            h.disp.style.display = "none";
            h.disp.innerHTML = ""
        }
    }, n = function (c, d, e) {
        var f = c.el, g = b.getFeedNode(f, d);
        if (!f.parentNode.uid) {
            var h = a.sizzle('img[action-type="feed_list_media_bigimg"]', g)[0];
            f.parentNode.uid = a.core.dom.uniqueID(h) + "_" + a.core.util.getUniqueKey();
            h.setAttribute("id", f.parentNode.uid)
        }
        a.kit.dom.rotateImage.rotateRight(a.E(f.parentNode.uid), e, j)
    }, o = function (e, g, j, l) {
        var m = e.el, n = e.data, o = b.getFeedNode(m, g), p = o.getAttribute("isForward") ? "1" : "", r = b.getMid(m, g), s = k(o, p);
        if (!s || !s.prev || !s.disp)a.log('node-type="feed_list_media_prev" or node-type="feed_list_media_disp" in a feed\'s node is undefined!'); else {
            if (o.disp == n.short_url)return;
            if (l.voteObj[r]) {
                l.voteObj[r].destroy();
                delete l.voteObj[r]
            }
            o.disp = n.short_url;
            o.isForward = p;
            s.prev.style.display = "none";
            var t = decodeURIComponent(n.title), u = a.bLength(t) > 71 ? a.leftB(t, 70) + "..." : t;
            t = a.bLength(t) > 24 ? a.leftB(t, 23) + "..." : t;
            s.disp.innerHTML = "";
            s.disp.appendChild(a.builder(d(c.mediaVideoMusicTEMP, {notForward: !p, short_url: decodeURIComponent(n.short_url), full_url: decodeURIComponent(n.full_url), title: t, fTitle: u, type: j}).toString()).box);
            s.disp.style.display = "";
            var v = a.sizzle('div[node-type="feed_list_media_big' + j + 'Div"]', s.disp)[0];
            if (!v) {
                a.log('media: node-type="feed_list_media_big' + j + 'Div" is not be found in feed_list_media_disp node!');
                return
            }
            l.dispContentNode[r] = v;
            var w = "default";
            try {
                h ? w = "object" : navigator.plugins["Shockwave Flash"] ? w = "embed" : w = "html5"
            } catch (x) {
            }
            var y = function () {
                v.innerHTML = f
            }, z = function (b) {
                if (!b.result || b.error_code || b.error)y(); else {
                    var c = l.dispContentNode[r];
                    c.mediaData = b.result;
                    c.innerHTML = "";
                    c.appendChild(a.builder(c.mediaData).box);
                    q && q.setFixed(!0)
                }
            };
            b.getFeedTrans("mediaShow", {onComplete: z, onFail: y}).request({vers: 3, lang: $CONFIG.lang, mid: r, short_url: n.short_url.replace(/http\:\/\/(t|sinaurl)\.cn\//, ""), template_name: w, source: "3818214747"});
            j === "video" && a.scrollTo(s.disp, {step: 1, top: i})
        }
    }, p, q, r = function (e, f, g) {
        p && a.fireEvent(p, "click");
        var h = e.el, i = e.data.title, j = b.getMid(h, f), k = g.dispContentNode[j], l = k.mediaData, n = a.builder(d(c.mediaVideoMusicFloatTEMP, {title: a.encodeHTML(i)}).toString()), o = n.list.outer[0], r = n.list.mediaContent[0];
        p = n.list.close[0];
        document.body.appendChild(o);
        q = a.kit.dom.fix(o, "rb");
        if (l) {
            r.innerHTML = "";
            r.appendChild(a.builder(l).box);
            q.setFixed(!0)
        } else g.dispContentNode[j] = r;
        a.addEvent(p, "click", function () {
            a.removeEvent(p, "click", arguments.callee);
            q && q.destroy();
            if (a.IE) {
                var b = a.sizzle("object", o);
                for (var c = 0, d = b.length; c < d; c++) {
                    var e = b[c];
                    e && (e = e.parentNode) && (e.innerHTML = "")
                }
            }
            a.removeNode(o);
            q = n = o = p = null
        });
        m(e, f, !0)
    }, s = function () {
        p && a.fireEvent(p, "click")
    }, t = function (e, g, h) {
        var i = e.el, j = b.getMid(i, g), l = e.data, m = b.getFeedNode(i, g), n = m.getAttribute("isForward") ? "1" : "", o = k(m, n);
        if (m.disp != l.short_url && !!o.disp) {
            o.disp.innerHTML = "";
            a.common.feed.widget.clear(j);
            o.disp.appendChild(a.builder(d(c.widgetTEMP, {notForward: !n, short_url: decodeURIComponent(l.short_url), full_url: decodeURIComponent(l.full_url), title: decodeURIComponent(l.title), suda: decodeURIComponent(l.suda || "")}).toString()).box);
            o.prev.style.display = "none";
            o.disp.style.display = "";
            var p = a.sizzle('div[node-type="feed_list_media_widgetDiv"]', o.disp)[0];
            b.getFeedTrans("widget", {onSuccess: function (b) {
                b = b.data;
                if (!!b.html) {
                    p.innerHTML = b.html;
                    a.common.feed.widget.add(j, o.disp)
                }
            }, onFail: function (a) {
                p.innerHTML = a && a.msg || f
            }, onError: function (a) {
                p.innerHTML = a && a.msg || f
            }}).request({short_url: decodeURIComponent(l.short_url), isforward: n, mid: j});
            m.disp = l.short_url;
            m.isForward = n
        }
    }, u = function (e, g, h) {
        var i = e.el, j = b.getMid(i, g), l = e.data, m = b.getFeedNode(i, g), n = m.getAttribute("isForward") ? "1" : "", o = k(m, n);
        if (m.disp != l.short_url) {
            o.disp.innerHTML = "";
            a.common.feed.widget.clear(j);
            o.disp.appendChild(a.builder(d(c.widgetTEMP, {notForward: !n, short_url: decodeURIComponent(l.short_url), full_url: decodeURIComponent(l.full_url), title: decodeURIComponent(l.title), suda: decodeURIComponent(l.suda || "")}).toString()).box);
            o.prev.style.display = "none";
            o.disp.style.display = "";
            var p = a.sizzle('div[node-type="feed_list_media_widgetDiv"]', o.disp)[0];
            b.getFeedTrans("third_rend", {onSuccess: function (b) {
                b = b.data;
                if (!!b.html) {
                    p.innerHTML = b.html;
                    a.common.feed.widget.add(j, o.disp)
                }
            }, onFail: function (a) {
                p.innerHTML = a && a.msg || f
            }, onError: function (a) {
                p.innerHTML = a && a.msg || f
            }}).request(a.kit.extra.merge({isforward: n, mid: j}, l));
            m.disp = l.short_url;
            m.isForward = n
        }
    }, v = function (e, f, h) {
        var j = e.el, l = b.getMid(j, f), m = e.data, n = b.getFeedNode(j, f), o = n.getAttribute("isForward") ? "1" : "", p = k(n, o);
        if (n.disp != m.short_url) {
            p.disp.innerHTML = "";
            a.common.feed.widget.clear(l);
            p.disp.appendChild(a.builder(d(c.qingTEMP, {notForward: !o, short_url: decodeURIComponent(m.short_url), full_url: decodeURIComponent(m.full_url), title: decodeURIComponent(m.title), suda: decodeURIComponent(m.suda || "")}).toString()).box);
            p.prev.style.display = "none";
            p.disp.style.display = "";
            var q = a.sizzle('div[node-type="feed_list_media_qingDiv"]', p.disp)[0], r = function (b) {
                var c = b.code;
                if (c + "" == "1") {
                    b = b.data;
                    if (!b.result)return;
                    q.innerHTML = b.result;
                    a.common.feed.widget.add(l, p.disp)
                } else s(b)
            }, s = function (a) {
                q.innerHTML = g
            }, t = m.template_name;
            t ? t == "video" && (a.IE ? t = "object" : navigator.plugins && navigator.plugins["Shockwave Flash"] ? t = "embed" : t = "html5") : t = "";
            b.getFeedTrans("qingShow", {onComplete: r, onFail: s}).request({short_url: m.short_url, lang: window.$CONFIG && window.$CONFIG.lang || "zh-cn", mid: l, vers: 3, template_name: t});
            n.disp = m.short_url;
            n.isForward = o;
            a.scrollTo(p.disp, {step: 1, top: i})
        }
    };
    return function (c) {
        if (!c)a.log("media : need object of the baseFeedList Class"); else {
            var d = c.getNode(), f = c.getDEvent(), g = {}, h = !0, i = {dispContentNode: {}, voteObj: {}}, j = function () {
                a.custEvent.fire(c, "clearTips", "media")
            };
            f.add("feed_list_media_toSmall", "click", function (c) {
                a.common.feed.widget.clear(b.getMid(c.el, d));
                j();
                m(c, d, !0);
                return b.preventDefault(c.evt)
            });
            f.add("feed_list_media_img", "click", function (a) {
                j();
                l(a, d, i);
                return b.preventDefault(a.evt)
            });
            f.add("feed_list_media_bigimgDiv", "click", function (a) {
                j();
                m(a, d);
                return b.preventDefault(a.evt)
            });
            f.add("feed_list_media_toRight", "click", function (a) {
                j();
                n(a, d, 90);
                return b.preventDefault(a.evt)
            });
            f.add("feed_list_media_toLeft", "click", function (a) {
                j();
                n(a, d, -90);
                return b.preventDefault(a.evt)
            });
            f.add("feed_list_media_video", "click", function (a) {
                j();
                o(a, d, "video", i);
                return b.preventDefault(a.evt)
            });
            f.add("feed_list_media_music", "click", function (b) {
                a.preventDefault();
                j();
                o(b, d, "music", i);
                return
            });
            f.add("feed_list_media_toFloat", "click", function (e) {
                j();
                a.custEvent.fire(c, "clearToFloat");
                r(e, d, i);
                return b.preventDefault(e.evt)
            });
            a.custEvent.define(c, "clearToFloat");
            a.custEvent.add(c, "clearToFloat", s);
            f.add("feed_list_media_magic", "click", function (c) {
                j();
                c.data.swf ? a.common.magic(c.data.swf) : a.log("魔法表情的地址不存在: node上的action-data swf不存在!");
                return b.preventDefault(c.evt)
            });
            f.add("feed_list_media_v5update", "click", function (c) {
                j();
                c.data.swf ? a.common.magic(decodeURIComponent(c.data.swf), undefined, {isV5update: !0}) : a.log("魔法表情的地址不存在: node上的action-data swf不存在!");
                return b.preventDefault(c.evt)
            });
            f.add("feed_list_media_widget", "click", function (c) {
                var e = a.fixEvent(c.evt), f = e.target, g = b.getFeedNode(f, d), h = a.kit.dom.parseDOM(a.builder(g).list), k = h.feed_list_pulishMood;
                if (k) {
                    a.isArray(k) || (k = [k]);
                    for (var l = 0, m = k.length; l < m; l++) {
                        var n = k[l];
                        if (f == n || a.core.dom.contains(n, f))return
                    }
                }
                j();
                t(c, d, i);
                return b.preventDefault(c.evt)
            });
            f.add("feed_list_third_rend", "click", function (a) {
                j();
                u(a, d, i);
                return b.preventDefault(a.evt)
            });
            f.add("feed_list_media_qing", "click", function (a) {
                j();
                v(a, d, i);
                return b.preventDefault(a.evt)
            });
            f.add("feed_list_url", "click", function (c) {
                var e = c.el, f = b.getMid(e, d), g = b.getFeedNode(e, d), h = "";
                g && (h = g.getAttribute("minfo") ? "&" + g.getAttribute("minfo") : "");
                var i = a.core.dom.neighbor(e).parent('[node-type="feed_list_repeat"]').finish(), j = g.dataset && g.dataset.mark || g.getAttribute("data-mark") || "";
                j ? i && i != e ? window.open(e.href + "?u=" + $CONFIG.oid + "&m=" + f + h) : window.open(e.href + "?u=" + $CONFIG.oid + "&m=" + f + "&" + j + h) : window.open(e.href + "?u=" + $CONFIG.oid + "&m=" + f + h);
                return b.preventDefault()
            });
            f.add("vote_toSmallInfo", "click", function (c) {
                var e = c.el, f = b.getFeedNode(e, d), g = a.kit.dom.parseDOM(a.builder(f).list);
                g.vote_bigInfo && (g.vote_bigInfo.style.display = "none");
                g.vote_smallInfo && (g.vote_smallInfo.style.display = "");
                return a.preventDefault(c.evt)
            });
            f.add("vote_toBigInfo", "click", function (c) {
                var e = c.el, f = b.getFeedNode(e, d), g = a.kit.dom.parseDOM(a.builder(f).list);
                g.vote_smallInfo && (g.vote_smallInfo.style.display = "none");
                g.vote_bigInfo && (g.vote_bigInfo.style.display = "");
                return a.preventDefault(c.evt)
            });
            f.add("vote_refresh_code", "click", function (b) {
                var c = b.el, d = c.src.replace(/ts=.+/, "") + "ts=" + a.getUniqueKey();
                c.src = d;
                return a.preventDefault(b.evt)
            });
            f.add("images_view_tobig_topRight", "click", function (c) {
                var e = b.getFeedNode(c.el, d), g = a.sizzle('[action-type="images_view_tobig"]', e)[0];
                f.fireInject(g, "click", c.evt)
            });
            f.add("feed_list_image_like", "click", function (c) {
                if (!!h) {
                    h = !1;
                    var f = c.el, g = a.core.json.merge(c.data, {location: $CONFIG.location, object_type: "pic", ref: "feed"});
                    a.common.trans.feed.attitude.getTrans("objLike", {onSuccess: function (c, g) {
                        var i = c.data.is_del ? !0 : !1, j = g.count;
                        i ? j-- : j++;
                        var l = j > 0 ? j : 0, m;
                        i ? m = l != 0 ? e('<a class="W_btn_alpha" title="#L{赞}" href="javascript:"><i class="icon_praise"></i><span>(' + l + ")</span></a>") : e('<a class="W_btn_alpha" title="#L{赞}" href="javascript:"><i class="icon_praise"></i></a>') : m = l != 0 ? e('<a class="W_btn_alpha" title="#L{取消赞}" href="javascript:"><i class="icon_praised"></i><span>(' + l + ")</span></a>") : e('<a class="W_btn_alpha" title="#L{取消赞}" href="javascript:"><i class="icon_praised"></i></a>');
                        f.innerHTML = m;
                        var n = a.kit.extra.actionData(f);
                        n.set("count", l);
                        n.set("is_liked", i ? 0 : 1);
                        var o = b.getFeedNode(f, d), p = o.getAttribute("isForward") ? 1 : "", q = k(o, p), r = a.sizzle('[action-type="feed_list_media_img"]', q.prev)[0], s = a.kit.extra.actionData(r), t = decodeURIComponent(s.get("pic_objects")), u = t.split("|");
                        u[1] = i ? 0 : 1;
                        u[2] = l;
                        s.set("pic_objects", encodeURIComponent(u.join("|")));
                        var v = a.sizzle('[action-type="images_view_tobig"]', q.disp)[0], w = a.kit.extra.actionData(v);
                        w.set("pic_objects", encodeURIComponent(u.join("|")));
                        h = !0
                    }, onFail: function (b) {
                        a.ui.alert(b.msg);
                        h = !0
                    }, onError: function (b) {
                        a.ui.alert(b.msg);
                        h = !0
                    }}).request(g)
                }
            });
            f.add("fl_url_addparams", "click", function (a) {
                var c = a.el, e = b.getMid(c, d), f = b.getFeedNode(c, d), g = "";
                f && (g = f.getAttribute("tbinfo") ? "&" + f.getAttribute("tbinfo") : "");
                var h = f.getAttribute("omid") || "", i = "mid=" + e + (h ? "&omid=" + h : "") + g;
                window.open(c.href.indexOf("?") > -1 ? c.href + "&" + i : c.href + "?" + i);
                return b.preventDefault()
            });
            g.destroy = function () {
                q && q.destroy();
                d = f = undefined;
                a.common.feed.widget.destroy();
                a.custEvent.remove(c, "clearToFloat", s)
            };
            return g
        }
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
STK.register("common.trans.feed.feed", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("publish", {url: "/aj/mblog/add?_wv=5", method: "post"});
    c("delete", {url: "/aj/mblog/del?_wv=5", method: "post"});
    c("forward", {url: "/aj/mblog/forward?_wv=5", method: "post"});
    c("list", {url: "/aj/fav/mblog/favlist?_wv=5", method: "get"});
    c("getfeed", {url: "/aj/mblog/fsearch?_wv=5", method: "get"});
    c("memberTopFeed", {url: "/aj/mblog/markmembermblog?_wv=5", method: "post"});
    c("recmodlayer", {url: "/aj/photo/recomlayer?_wv=5", method: "get"});
    return b
});
STK.register("kit.extra.multiimages", function (a) {
    var b = $CONFIG.imgPath, c = a.common.feed.feedList.imageLikeWhiteList(), d = '<div style="top:0px;left:0px;display:none;" node-type="recLayer" class="W_layer"><div class="bg"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div class="content"><a href="javascript:;" action-type="closeRecLayer" class="W_close"></a><div class="layer_view_morepic"><div class="W_tips clearfix"><p class="txt">#L{翻完啦！}<a href="javascript:;" target="_blank" node-type="toprofile"></a></p></div><div class="view_pic" node-type="recBox"></div></div></div></td></tr></tbody></table></div></div>', e = '<#et recimg data><ul class="pic_list clearfix"><#list data.recimgs as list><li><a target="_blank" href="${list.imgsrc}"><img src="${list.img}"></a></li></#list></ul></#et>', f = '<#et images data><div class="" node-type="imagesBox"><p class="medis_func S_txt3"><#if (data.toSmall == 1)><a href="javascript:;" action-type="tosmall" class="retract"><em class="W_ico12 ico_retract"></em>#L{收起}</a><i class="W_vline">|</i></#if><a action-type="images_view_tobig" node-type="tobig" action-data="pid=${data.currentPid}" href="javascript:;" suda-data="key=tblog_newimage_feed&value=view_larger_image" class="show_big"><em class="W_ico12 ico_showbig"></em>#L{查看大图}</a><i class="W_vline">|</i><a href="javascript:;"  action-type="turnLeft" class="turn_left"><em class="W_ico12 ico_turnleft"></em>#L{向左转}</a><i class="W_vline">|</i><a href="javascript:;" action-type="turnRight" class="turnRight"><em class="W_ico12 ico_turnright"></em>#L{向右转}</a></p><div class="pic_list_view"><div class="pic_show_box" style="position:relative;">\t<ul class="clearfix leftcursor" node-type="picShow"><li node-type="imgBox">' + (c ? '<div class="artwork_box">' : "") + '<div node-type="imgSpanBox"><img node-type="imgShow" src="${data.currentUrl}"></div>' + (c ? '<span node-type="multi_image_like" action-type="multi_image_like" action-data="mid=${data.mid}&photo_id=${data.pid}&is_liked=${data.is_liked}&count=${data.count}&object_id=${data.object_id}"><#if (data.is_liked)><a class="W_btn_alpha" title="#L{取消赞}" href="javascript:void(0)"><i class="icon_praised"></i><span node-type="count">(${data.count})</span></a><#else><a class="W_btn_alpha" title="#L{赞}" href="javascript:void(0)"><i class="icon_praise"></i><span node-type="count">(${data.count})</span></a></#if></span></div>' : "") + '<img class="picloading" node-type="loading" style="display:none;" src="' + b + 'style/images/common/loading.gif">' + "</li></ul>" + d + "</div>" + '<div class="pic_choose_box clearfix">' + '<a href="javascript:;" node-type="prev" action-type = "prev" class="arrow_left_small btn_pic_prevdis S_bg2" title="#L{上一页}"><em class="ico_pic_prev S_txt3">&lt;</em></a>' + '<div class="stage_box">' + '<ul class="choose_box clearfix" node-type="picChoose">' + "<#list data.picChoose as picChoose>" + '<li><a href="javascript:;"<#if (picChoose.pid == data.currentPid)> class="current"</#if> node-type="thumbItem" action-type="thumbItem" action-data="pid=${picChoose.pid}"><img class="S_line2" src="${picChoose.url}" alt=""></a></li>' + "</#list>" + "</ul>" + "</div>" + '<a href="javascript:;" node-type="next" action-type="next" class="arrow_right_small btn_pic_prevdis S_bg2" title="#L{下一页}"><em class="ico_pic_next S_txt3">&gt;</em></a>' + "</div>" + "</div>" + "</#et>", g = {};
    return function (b) {
        var c = {}, d, h, i = "", j = 0, k = 0, l = "", m, n, o = {}, p = 450, q = !1, r = !1, s = !1, t = a.kit.extra.language, u = [], v, w = "", x = a.parseParam({currentPid: "", pids: [], pic_objects: "", picShowWidth: 440, sum: 7, thumbWidth: 59, mid: "", uid: "", isForward: 0, toSmall: 1}, b), y = [], z = [], A = [], B = [], C = !0, D = {getIndex: function (a, b) {
            var c = 0;
            for (var d = 0; a[d]; d++)if (a[d] == b) {
                c = d;
                break
            }
            return c
        }, setPic: function (b, c) {
            var e = b.pid;
            if (e != l) {
                var f = a.common.extra.imageURL(e, {size: "bmiddle"}), g = a.C("img");
                o[e] = g;
                l = e;
                d.loading.style.display = "";
                g.onload = function () {
                    g.onload = null;
                    D.setpid();
                    d.loading.style.display = "none";
                    var c = a.core.ani.tween(d.imgSpanBox, {duration: 150, end: function () {
                        d.imgSpanBox.innerHTML = "";
                        a.setStyle(d.imgSpanBox, "height", "");
                        d.imgSpanBox.appendChild(g);
                        a.tween(d.imgSpanBox, {duration: 100, animationType: "easeoutcubic"}).play({opacity: 1}).destroy();
                        var c = d.multi_image_like;
                        if (c) {
                            b.is_liked ? c.innerHTML = +b.count != 0 ? t('<a class="W_btn_alpha" title="#L{取消赞}" href="javascript:"><i class="icon_praised"></i><span >(' + b.count + ")</span></a>") : t('<a class="W_btn_alpha" title="#L{取消赞}" href="javascript:"><i class="icon_praised"></i></a>') : c.innerHTML = +b.count != 0 ? t('<a class="W_btn_alpha" title="#L{赞}" href="javascript:"><i class="icon_praise"></i><span>(' + b.count + ")</span></a>") : t('<a class="W_btn_alpha" title="#L{赞}" href="javascript:"><i class="icon_praise"></i></a>');
                            c.setAttribute("action-data", "mid=" + x.mid + "&photo_id=" + b.pid + "&is_liked=" + b.is_liked + "&count=" + b.count + "&object_id=" + b.object_id)
                        }
                    }});
                    c.play({opacity: .3}).destroy()
                };
                g.src = f;
                for (var h = 0; u[h]; h++)u[h].onload = null;
                u.push(g)
            }
        }, setIndex: function (b) {
            switch (b) {
                case"min":
                    j--;
                    break;
                case"add":
                    j++;
                    break;
                default:
                    j = b
            }
            j < 0 && (j = 0);
            if (j > k - 1) {
                j = k - 1;
                D.showRec()
            } else a.position(d.imagesBox).t < a.scrollPos().top && a.scrollTo(d.imagesBox, {top: 120, step: 10});
            j > k - 3 && D.getRecPics();
            D.setCurrentThumb();
            D.scrollList()
        }, showRec: function () {
            if (!!s) {
                var b = a.core.dom.getSize(d.picShow), c = a.core.dom.getSize(d.recLayer);
                b.height < c.height && (d.picShow.style.height = c.height + "px");
                var e = v || (b.height - c.height) / 2;
                e = e - c.height / 2;
                e > b.height - c.height && (e = b.height - c.height);
                e < 0 && (e = 0);
                d.recLayer.style.left = (b.width - c.width) / 2 + "px";
                d.recLayer.style.top = e + "px";
                d.recLayer.style.display = "";
                q = !0
            }
        }, scrollList: function () {
            return function (a, b) {
                var c = Math.floor(x.sum / 2), e = j;
                b && (e = a);
                var f = k;
                if (f > x.sum) {
                    var g = e - c;
                    if (g <= 0) {
                        g = 0;
                        if (d.prev.className != "arrow_left_small btn_pic_prevdis S_bg2") {
                            d.prev.className = "arrow_left_small btn_pic_prevdis S_bg2";
                            d.prev.innerHTML = '<em class="ico_pic_prev S_txt3">&lt;</em>'
                        }
                    } else if (d.prev.className != "arrow_left_small S_bg3") {
                        d.prev.className = "arrow_left_small S_bg3";
                        d.prev.innerHTML = '<em class="ico_pic_prev S_txt1">&lt;</em>'
                    }
                    if (g >= f - x.sum) {
                        g = f - x.sum;
                        if (d.next.className != "arrow_right_small btn_pic_prevdis S_bg2") {
                            d.next.className = "arrow_right_small btn_pic_prevdis S_bg2";
                            d.next.innerHTML = '<em class="ico_pic_next S_txt3">&gt;</em>'
                        }
                    } else if (d.next.className != "arrow_right_small S_bg3") {
                        d.next.className = "arrow_right_small S_bg3";
                        d.next.innerHTML = '<em class="ico_pic_next S_txt1">&gt;</em>'
                    }
                    var h = 0 - x.thumbWidth * g;
                    n.play({marginLeft: h})
                }
            }
        }(), setCurrentThumb: function () {
            for (var b in d.thumbItem)a.removeClassName(d.thumbItem[b], "current");
            a.addClassName(d.thumbItem[j], "current")
        }, rotateImg: function (b, c) {
            var e = b.el, f = a.sizzle("img", d.imgSpanBox)[0];
            !f && (f = document.getElementById(w));
            e.parentNode.uid = a.core.dom.uniqueID(f) + "_" + a.core.util.getUniqueKey();
            w = e.parentNode.uid;
            f.setAttribute("id", e.parentNode.uid);
            a.kit.dom.rotateImage.rotateRight(a.E(e.parentNode.uid), c, p)
        }, getImgsrc: function (a, b, c) {
            var d = "http://photo.weibo.com/" + a + "/wbphotos/large/mid/" + b + "/pid/" + c + "?refer=weibofeedv5";
            return d
        }, setpid: function () {
            var a = "pid=" + l + "&mid=" + x.mid + "&uid=" + x.uid + "&pic_objects=" + x.pic_objects;
            d.tobig.setAttribute("action-data", a)
        }, getRecPics: function () {
            if (!r) {
                r = !0;
                a.common.trans.feed.feed.getTrans("recmodlayer", {onSuccess: function (b) {
                    var c = b.data.recom_list, f = c.length;
                    if (f == 0)s = !1; else {
                        var g = [], h = "http://weibo.com/" + x.uid + "/album?from=reclayer&wvr=5&loc=tabalbum#profile_tab";
                        for (var i = 0; i < f; i++)g.push({imgsrc: h, img: a.common.extra.imageURL(c[i].pid, {size: "square"})});
                        d.toprofile.innerHTML = t("#L{看%s的更多图片}", b.data.user.gender == "m" ? "他" : "她");
                        d.toprofile.setAttribute("href", h);
                        d.recBox.innerHTML = a.core.util.easyTemplate(e, {recimgs: g}).toString();
                        s = !0
                    }
                }, onFail: function (a) {
                    s = !1;
                    d.recLayer && (d.recLayer.style.display = "none");
                    q = !1
                }, onError: function (a) {
                    s = !1;
                    d.recLayer && (d.recLayer.style.display = "none");
                    q = !1
                }}).request({mid: x.mid, uid: x.uid})
            }
        }}, E = function () {
            var b = decodeURIComponent(x.pic_objects);
            b = b.split(",");
            for (var c = 0, e = b.length; c < e; c++) {
                var g = b[c];
                g = g.split("|");
                y.push(g[0]);
                z.push(g[1]);
                A.push(g[2]);
                B.push(g[3])
            }
            var h = y.length == 1 && y[0] == "" ? x.pids : y;
            l = x.currentPid || h[0];
            k = h.length;
            j = D.getIndex(h, l);
            var i = [], o = [];
            for (var c = 0; c < k; c++)o.push({pid: h[c], url: a.common.extra.imageURL(h[c], {size: "square"})});
            var p = a.core.util.easyTemplate(t(f), {picShow: i, picChoose: o, currentPid: h[j], currentUrl: a.common.extra.imageURL(h[j], {size: "bmiddle"}), isForward: x.isForward, toSmall: x.toSmall, pic_objects: x.pic_objects, is_liked: +z[j], count: A[j] || 0, object_id: B[j], mid: x.mid, pid: h[j]}).toString(), q = a.builder(p);
            d = a.kit.dom.parseDOM(q.list);
            m = a.delegatedEvent(d.imagesBox);
            d.picChoose.style.marginLeft = "1px";
            var r = d.count;
            r && r.innerHTML == "(0)" && a.removeNode(r);
            n = a.core.ani.tween(d.picChoose, {duration: 150});
            D.setIndex(j);
            D.setpid()
        }, F = {gesture: function (b) {
            b = a.fixEvent(b);
            var c = b.clientX - a.position(d.picShow).l;
            if (c < x.picShowWidth * 3 / 10)if (j == 0)if (x.toSmall == 1) {
                d.picShow.className = "clearfix smallcursor";
                i = "small"
            } else {
                d.picShow.className = "clearfix";
                i = ""
            } else {
                d.picShow.className = "clearfix leftcursor";
                i = "left"
            } else if (c < x.picShowWidth * 7 / 10)if (x.toSmall == 1) {
                d.picShow.className = "clearfix smallcursor";
                i = "small"
            } else {
                d.picShow.className = "clearfix";
                i = ""
            } else if (c > x.picShowWidth * 7 / 10)if (q)if (x.toSmall == 1) {
                d.picShow.className = "clearfix smallcursor";
                i = "small"
            } else {
                d.picShow.className = "clearfix";
                i = ""
            } else {
                d.picShow.className = "clearfix rightcursor";
                i = "right"
            }
        }, left: function () {
            if (!a.inArray(document.activeElement.tagName.toUpperCase(), ["TEXTAREA", "INPUT", "SELECT"])) {
                var b = a.position(d.imagesBox).t, c = a.core.dom.getSize(d.imagesBox).height, e = a.scrollPos().top, f = a.winSize().height;
                if (e > b + c)return;
                if (e + f < b)return;
                q && F.closeRecLayer();
                D.setIndex("min");
                D.setPic({pid: y[j] || x.pids[j], is_liked: +z[j], count: A[j] || 0, object_id: B[j]}, !0)
            }
        }, right: function () {
            if (!a.inArray(document.activeElement.tagName.toUpperCase(), ["TEXTAREA", "INPUT", "SELECT"])) {
                var b = a.position(d.imagesBox).t, c = a.core.dom.getSize(d.imagesBox).height, e = a.scrollPos().top, f = a.winSize().height;
                if (e > b + c)return;
                if (e + f < b)return;
                D.setIndex("add");
                D.setPic({pid: y[j] || x.pids[j], is_liked: +z[j], count: A[j] || 0, object_id: B[j]})
            }
        }, gestureClick: function (b) {
            switch (i) {
                case"left":
                    q && F.closeRecLayer();
                    F.left();
                    window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack("tblog_newimage_feed", "image_feed_next");
                    break;
                case"small":
                    F.tosmall();
                    break;
                case"right":
                    b = a.fixEvent(b);
                    v = b.pageY - a.position(d.picShow).t;
                    F.right();
                    window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack("tblog_newimage_feed", "image_feed_next")
            }
        }, prev: function () {
            var a = j - 7;
            D.scrollList(a, !0)
        }, next: function () {
            var a = j + 7;
            D.scrollList(a, !0)
        }, tosmall: function (b) {
            x.toSmall != 0 && a.custEvent.fire(c, "tosmall")
        }, thumbItem: function (a) {
            q && F.closeRecLayer();
            var b = a.data.pid, c = D.getIndex(x.pids, b), d = c < j ? !0 : !1;
            D.setIndex(c);
            D.setPic({pid: y[j] || x.pids[j], is_liked: +z[j], count: A[j] || 0, object_id: B[j]}, d);
            window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack("tblog_newimage_feed", "image_feed_next")
        }, turnRight: function (a) {
            D.rotateImg(a, 90)
        }, turnLeft: function (a) {
            D.rotateImg(a, -90)
        }, closeRecLayer: function () {
            d.picShow.style.height = "auto";
            d.recLayer.style.display = "none";
            q = !1
        }, like: function (b) {
            var b = a.fixEvent(b);
            a.core.evt.stopEvent(b);
            if (!!C) {
                C = !1;
                var e = d.multi_image_like, f = a.queryToJson(e.getAttribute("action-data"));
                f = a.core.json.merge(f, {location: $CONFIG.location, object_type: "pic", ref: "feed"});
                a.common.trans.feed.attitude.getTrans("objLike", {onSuccess: function (b, d) {
                    var f = b.data.is_del ? !0 : !1, g = d.count;
                    f ? g-- : g++;
                    var h = g > 0 ? g : 0, i;
                    f ? i = h != 0 ? t('<a class="W_btn_alpha" title="#L{赞}" href="javascript:"><i class="icon_praise"></i><span>(' + h + ")</span></a>") : t('<a class="W_btn_alpha" title="#L{赞}" href="javascript:"><i class="icon_praise"></i></a>') : i = h != 0 ? t('<a class="W_btn_alpha" title="#L{取消赞}" href="javascript:"><i class="icon_praised"></i><span>(' + h + ")</span></a>") : t('<a class="W_btn_alpha" title="#L{取消赞}" href="javascript:"><i class="icon_praised"></i></a>');
                    e.innerHTML = i;
                    var j = a.kit.extra.actionData(e);
                    j.set("count", h);
                    j.set("is_liked", f ? 0 : 1);
                    for (var k = 0, l = B.length; k < l; k++)if (B[k] == d.object_id) {
                        z[k] = f ? "0" : "1";
                        A[k] = h;
                        break
                    }
                    a.custEvent.fire(c, "rewritedata", {isDel: f, count: h, object_id: d.object_id});
                    C = !0
                }, onFail: function (b) {
                    a.common.layer.ioError(b.code, b);
                    C = !0
                }, onError: function (b) {
                    a.common.layer.ioError(b.code, b);
                    C = !0
                }}).request(f)
            }
        }}, G = function () {
            a.addEvent(d.picShow, "mousemove", F.gesture);
            a.addEvent(d.picShow, "click", F.gestureClick);
            d.multi_image_like && a.addEvent(d.multi_image_like, "click", F.like);
            m.add("tosmall", "click", F.tosmall);
            m.add("thumbItem", "click", F.thumbItem);
            m.add("prev", "click", F.prev);
            m.add("next", "click", F.next);
            m.add("turnLeft", "click", F.turnLeft);
            m.add("turnRight", "click", F.turnRight);
            m.add("closeRecLayer", "click", F.closeRecLayer);
            if (g.left) {
                a.core.evt.hotKey.remove(document.body, ["Left"], g.left, {type: "keydown"});
                a.core.evt.hotKey.remove(document.body, ["Right"], g.right, {type: "keydown"})
            }
            g.left = F.left;
            g.right = F.right;
            a.core.evt.hotKey.add(document.body, ["Left"], F.left, {type: "keydown"});
            a.core.evt.hotKey.add(document.body, ["Right"], F.right, {type: "keydown"});
            a.custEvent.define(c, ["tosmall", "rewritedata"])
        }, H = function () {
            E();
            G()
        };
        H();
        var I = function () {
            a.removeEvent(d.picShow, "mousemove", F.gesture);
            a.removeEvent(d.picShow, "click", F.gestureClick);
            d.multi_image_like && a.removeEvent(d.multi_image_like, "click", F.like);
            a.core.evt.hotKey.remove(document.body, ["Left"], F.left, {type: "keydown"});
            a.core.evt.hotKey.remove(document.body, ["Right"], F.right, {type: "keydown"});
            m.destroy();
            a.removeNode(d.imagesBox)
        }, J = function () {
            return d.imagesBox
        };
        c.destroy = I;
        c.getOuter = J;
        return c
    }
});
STK.register("common.feed.feedList.plugins.images", function (a) {
    var b = $CONFIG.imgPath;
    return function (c) {
        if (!c)a.log("images : need object of the baseFeedList Class"); else {
            var d = c.getNode(), e = c.getDEvent(), f = a.common.feed.feedList.utils, g = {}, h = !1, i, j = {getPDNodes: function (b) {
                return{prev: a.sizzle("[node-type=feed_list_media_prev]", b)[0], disp: a.sizzle("[node-type=feed_list_media_disp]", b)[0]}
            }, getActionData: function (a, b) {
                return a.tagName.toLowerCase == "body" ? null : a.getAttribute("node-type") == b ? a.getAttribute("action-data") : arguments.callee(a.parentNode, b)
            }}, k = {fl_pics: function (c) {
                if (!h) {
                    h = !0;
                    if (!i) {
                        i = a.C("img");
                        i.className = "loading_gif";
                        i.style.cssText = "margin:32px 18px 18px -47px;";
                        i.src = b + "style/images/common/loading.gif"
                    }
                    var e = c.data || {};
                    c.el.parentNode.appendChild(i);
                    i.style.display = "";
                    var g = a.C("img"), k = f.getFeedNode(c.el, d), l = j.getPDNodes(k), m = a.core.json.queryToJson(j.getActionData(c.el, "fl_pic_list")), n = m.pic_ids.split(","), o = m.uid, p = m.mid ? m.mid : f.getMid(c.el, d), q = e.pic_id || n[0], r = m.pic_objects || "";
                    g.onload = function () {
                        g.onload = null;
                        i.style.display = "none";
                        i = null;
                        l.prev.style.display = "none";
                        var b = a.kit.extra.multiimages({pids: n, pic_objects: r, currentPid: q, mid: p, uid: o});
                        l.disp.appendChild(b.getOuter());
                        l.disp.style.display = "";
                        h = !1;
                        a.custEvent.add(b, "tosmall", function (c, d) {
                            a.position(l.disp).t < a.scrollPos().top && k.scrollIntoView();
                            l.disp.style.display = "none";
                            l.prev.style.display = "";
                            b.destroy()
                        });
                        a.custEvent.add(b, "rewritedata", function (b, c) {
                            var d = a.sizzle('[node-type="fl_pic_list"]', l.prev)[0], e = a.kit.extra.actionData(d), f = decodeURIComponent(e.get("pic_objects"));
                            f = f.split(",");
                            var g = f.length, h = [], i = [], j = [], k = [];
                            for (var m = 0, n = g; m < n; m++) {
                                var o = f[m];
                                o = o.split("|");
                                if (o[3] == c.object_id) {
                                    o[1] = c.isDel ? "0" : "1";
                                    o[2] = c.count
                                }
                                h.push(o[0]);
                                i.push(o[1]);
                                j.push(o[2]);
                                k.push(o[3])
                            }
                            var p = [];
                            for (var m = 0, n = g; m < n; m++)p.push(h[m] + "|" + i[m] + "|" + j[m] + "|" + k[m]);
                            e.set("pic_objects", encodeURIComponent(p.join(",")));
                            var q = a.sizzle('[node-type="tobig"]', l.disp)[0], r = a.kit.extra.actionData(q);
                            r.set("pic_objects", encodeURIComponent(p.join(",")))
                        })
                    };
                    var s = a.common.extra.imageURL(q, {size: "bmiddle"});
                    g.src = s
                }
            }}, l = function () {
                e.add("fl_pics", "click", k.fl_pics)
            }, m = function () {
                l()
            };
            m();
            g.destroy = function () {
                e.destroy()
            };
            return g
        }
    }
});
STK.register("common.feed.feedList.plugins.commonMedia", function (a) {
    var b = a.common.feed.feedList.utils, c = a.kit.dom.parentAttr, d = a.common.feed.widget, e = a.common.feed.feedList.feedTemps, f = a.core.util.easyTemplate, g = a.kit.extra.language, h = g("#L{加载失败}!"), i = g("#L{很抱歉，该内容无法显示，请稍后再试。}"), j = a.core.util.browser.IE, k = a.common.trans.feed, l = {}, m = function (b) {
        return{prev: a.sizzle("[node-type=common_list_media_prev]", b)[0], disp: a.sizzle("[node-type=common_list_media_disp]", b)[0]}
    }, n = function (a) {
        return{activity: "act_id", feed: "mid"}[a] || "mid"
    }, o = function (a, b, d) {
        var b = n(b);
        return a.getAttribute(b) || c(a, b, d)
    }, p = function (b, c, d) {
        var c = n(c);
        return a.sizzle("[" + c + "=" + b + "]", d)[0]
    }, q = function (b, c) {
        var g = b.data, j = b.el, n = a.queryToJson(j.getAttribute("data-param"));
        n.lang = $CONFIG && $CONFIG.lang;
        var q = a.queryToJson(j.getAttribute("data-trans")).name, r = j.getAttribute("data-feedtype"), s = o(b.el, r, c), t = p(s, r, c), u = m(t), v = a.builder(f(e.commonMediaTEMP, {title: g.title, url: g.url, tofloat: g.tofloat == "1", type: r, id: s}).toString()), w = v.list.common_list_media_Div[0];
        k.request(q, {onSuccess: function (a) {
            var b = a.data, c = b.render_data;
            l[s] = c;
            w.innerHTML = c;
            d.clear(s);
            d.add(s, u.disp)
        }, onError: function (a) {
            w.innerHTML = i
        }, onFail: function () {
            w.innerHTML = h
        }}, n);
        if (w) {
            u.disp.appendChild(v.box);
            u.disp.style.display = "";
            u.prev.style.display = "none";
            return!1
        }
    }, r = function (a, b) {
        var c = a.data.id, e = a.data.type, f = p(c, e, b), g = m(f);
        d.clear(c);
        g.disp.innerHTML = "";
        g.disp.style.display = "none";
        g.prev.style.display = ""
    }, s, t, u = function (b, c, d) {
        s && a.fireEvent(s, "click");
        var g = b.el, h = b.data.title, i = b.data.id;
        videoHTML = l[i];
        var j = a.builder(f(e.mediaVideoMusicFloatTEMP, {title: h}).toString()), k = j.list.outer[0], m = j.list.mediaContent[0];
        s = j.list.close[0];
        document.body.appendChild(k);
        t = a.kit.dom.fix(k, "rb");
        if (videoHTML) {
            m.innerHTML = "";
            m.appendChild(a.builder(videoHTML).box);
            t.setFixed(!0)
        }
        a.addEvent(s, "click", function () {
            a.removeEvent(s, "click", arguments.callee);
            t && t.destroy();
            if (a.IE) {
                var b = a.sizzle("object", k);
                for (var c = 0, d = b.length; c < d; c++) {
                    var e = b[c];
                    e && (e = e.parentNode) && (e.innerHTML = "")
                }
            }
            a.removeNode(k);
            t = j = k = s = null
        });
        r(b, c)
    }, v = function () {
        s && a.fireEvent(s, "click")
    };
    return function (c) {
        if (!c)a.log("media : need object of the baseFeedList Class"); else {
            var d = c.getNode(), e = c.getDEvent(), f = {}, g = function () {
                a.custEvent.fire(c, "clearTips", "media")
            };
            e.add("common_list_media_show", "click", function (a) {
                g();
                q(a, d);
                return b.preventDefault(a.evt)
            });
            e.add("common_list_media_hide", "click", function (a) {
                g();
                r(a, d);
                return b.preventDefault(a.evt)
            });
            e.add("common_list_media_toFloat", "click", function (e) {
                g();
                a.custEvent.fire(c, "clearToFloat");
                u(e, d);
                return b.preventDefault(e.evt)
            });
            a.custEvent.define(c, "clearToFloat");
            a.custEvent.add(c, "clearToFloat", v);
            f.destroy = function () {
                t && t.destroy();
                d = e = undefined;
                a.common.feed.widget.destroy();
                a.custEvent.remove(c, "clearToFloat", v)
            };
            return f
        }
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
STK.register("common.feed.feedList.plugins.page", function (a) {
    var b = a.common.feed.feedList.utils, c = typeof $CONFIG != "undefined" && $CONFIG.bigpipe == "true";
    return function (d, e) {
        if (!d)a.log("page : need object of the baseFeedList Class"); else {
            e = a.parseParam({style: 1, loadCount: 15}, e);
            var f = {}, g = d.getNode(), h, i = function (b) {
                a.custEvent.fire(d, "clearTips", "page");
                var c = d.getCurrentPage(), f = {page: b, pre_page: d.getCurrentPage(), count: e.loadCount, end_id: d.getEndId(), max_msign: d.getLastFeedAttr("msign"), filtered_min_id: d.getLastFeedAttr("filtered_min_id")};
                parseInt(c, 10) == b - 1 ? f.end_msign = -1 : f.max_msign = -1;
                d.setCurrentPage(b);
                d.setRequestData("page", f);
                if (b == 1) {
                    h.top = !0;
                    delete f.end_id
                } else h.top = !1;
                d.setRequestAction("page", h);
                d.showWait("page");
                if (a.position(g.parentNode).t < a.scrollPos().top)if (a.E("pl_content_biztips")) {
                    var i = a.E("pl_content_biztips");
                    a.core.util.scrollTo(i, {step: 10, top: 50})
                } else a.core.util.scrollTo(g.parentNode, {step: 10, top: 40});
                a.custEvent.fire(d, "request", ["page", a.parseParam(f)])
            };
            d.regCustEvent("toFirstPage", function () {
                i(1)
            });
            d.setRequestAction("page", h = {center: !0, bottom: !0});
            var j, k, l, m, n, o, p = {pageMoreDisplay: function (c) {
                if (n == undefined) {
                    m.style.display = "";
                    c = a.fixEvent(c);
                    var d = l.getAttribute("action-data");
                    if (d) {
                        d = a.core.json.queryToJson(d);
                        if (d.currentPage) {
                            var e = 1 * d.currentPage, f = a.kit.dom.firstChild(m), g = 1 * (d.countPage || a.kit.dom.children(m).length), h = (g - e - 9) * (a.kit.dom.outerHeight(f) - 1);
                            h > 0 && (m.scrollTop = h)
                        }
                    }
                }
                n = 1;
                return b.preventDefault(c)
            }, pageMoreOver: function (a) {
                n == undefined && (m.style.display = "");
                n = 1;
                return b.preventDefault(a)
            }, pageMoreOut: function (a) {
                n = 0;
                clearTimeout(o);
                o = setTimeout(function () {
                    if (n == 0) {
                        m && (m.style.display = "none");
                        n = undefined
                    }
                }, 500);
                return b.preventDefault(a)
            }, pageNClick: function (a) {
                var c = a.el;
                c.className != "current" && i(parseInt(a.data.page));
                if (window.WBAD && window.WBAD.refresh) {
                    var d = {rt: 3};
                    window.WBAD.refresh(d)
                }
                return b.preventDefault(a.evt)
            }}, q = function () {
                j = a.sizzle('div[node-type="feed_list_page"]', g)[0];
                if (!!j) {
                    if (c) {
                        k = a.core.evt.delegatedEvent(j);
                        k.add("feed_list_page_n", "click", p.pageNClick);
                        k.add("feed_list_page_first", "click", p.pageNClick);
                        k.add("feed_list_page_pre", "click", p.pageNClick);
                        k.add("feed_list_page_next", "click", p.pageNClick)
                    }
                    if ((m = a.sizzle('div[action-type="feed_list_page_morelist"]', j)[0]) && (l = a.sizzle('a[action-type="feed_list_page_more"]', j)[0])) {
                        a.addEvent(l, "mouseover", p.pageMoreDisplay);
                        a.addEvent(m, "mouseover", p.pageMoreOver);
                        a.addEvent(l, "mouseout", p.pageMoreOut);
                        a.addEvent(m, "mouseout", p.pageMoreOut)
                    }
                }
            }, r = function () {
                if (j) {
                    clearTimeout(o);
                    k && k.destroy && k.destroy();
                    if (l) {
                        a.removeEvent(l, "mouseover", p.pageMoreOver);
                        a.removeEvent(m, "mouseover", p.pageMoreOver);
                        a.removeEvent(l, "mouseout", p.pageMoreOut);
                        a.removeEvent(m, "mouseout", p.pageMoreOut)
                    }
                    l = m = n = undefined
                }
            }, s = function (b, c) {
                if (c == "page") {
                    a.custEvent.fire(d, "lazyload");
                    d.getCurrentPage() == 1 && a.custEvent.fire(d, "updateEndId")
                }
                r();
                q()
            };
            a.custEvent.add(d, "updateFeed", s);
            q();
            f.destroy = function () {
                a.custEvent.remove(d, "updateFeed", s);
                r()
            };
            return f
        }
    }
});
STK.register("common.feed.feedList.plugins.activityPage", function (a) {
    var b = a.common.feed.feedList.utils;
    return function (c, d) {
        if (!c)a.log("page : need object of the baseFeedList Class"); else {
            d = a.parseParam({loadCount: 15}, d);
            var e, f = {}, g = {}, h = c.getNode(), i = {setPageId: function (a, b) {
                g[a] = b
            }, getPageId: function (a) {
                return g[a] || 0
            }, clear: function () {
                g = {}
            }};
            c.setRequestAction("activityPage", e = {center: !0, bottom: !0});
            var j = function (b, f) {
                a.custEvent.fire(c, "clearTips", "activityPage");
                var g = b.page;
                f == "next" && i.setPageId(g, b.activity_id);
                var b = {ac_page: g, count: d.loadCount, activity_id: f == "next" ? b.activity_id : i.getPageId(g)};
                c.setCurrentPage(g);
                c.setRequestData("activityPage", b);
                g == 1 ? e.top = !0 : e.top = !1;
                c.setRequestAction("activityPage", e);
                c.showWait("activityPage");
                a.position(h.parentNode).t < a.scrollPos().top && h.parentNode.scrollIntoView();
                a.custEvent.fire(c, "request", ["activityPage", a.parseParam(b)])
            };
            c.getDEvent().add("feed_list_activitypage_prev", "click", function (a) {
                j(a.data, "prev");
                return b.preventDefault(a.evt)
            });
            c.getDEvent().add("feed_list_activitypage_next", "click", function (a) {
                j(a.data, "next");
                return b.preventDefault(a.evt)
            });
            var k = function (b, d) {
                d == "activityPage" && a.custEvent.fire(c, "lazyload", {})
            };
            a.custEvent.add(c, "updateFeed", k);
            c.regCustEvent("toActivity", function () {
                j({page: 1}, "prev")
            });
            f.destroy = function () {
                a.custEvent.remove(c, "updateFeed", k);
                e = g = i = j = k = null
            };
            return f
        }
    }
});
STK.register("common.map", function (a) {
    var b = "http://js.t.sinajs.cn/t5/";
    if (!1)b = $CONFIG.jsPath;
    var c = b + "home/static/map/", d = '<div class="W_layer" node-type="outer" style="display:none;position:absolute;z-index:500">\n\t\t  <div class="bg">\n\t\t\t\t<table border="0" cellspacing="0" cellpadding="0">\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t\t\t<div node-type="inner" class="map_box">\n\t\t\t\t\t\t\t\t\t\t<iframe node-type="iframe" frameborder="0" scrolling="no" src="about:blank;" style="width: 400px; height: 250px; border: 0pt none;" id="mini_map_panel"></iframe>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<a node-type="close" title="关闭" class="W_close" href="javascript:;"></a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t</table>\n\t\t\t\t<div node-type="arrow" class="arrow arrow_b"></div>\n\t\t\t</div>\n\t\t</div>', e = function () {
        var b;
        return function () {
            var e = !1;
            if (!b) {
                b = a.ui.mod.layer(d);
                var f = a.core.obj.sup(b, ["show"]).show, g = b.getDom("close"), h = b.getOuter(), i = b.getDom("iframe"), j = function () {
                    b.hide()
                };
                a.addEvent(g, "click", j);
                b.refresh = function () {
                    e = !1;
                    return this
                };
                b.show = function (b, d) {
                    if (!b)a.log("common.map : node is no defined"); else {
                        if (e) {
                            f();
                            return
                        }
                        d = a.parseParam({longitude: "", latitude: "", head: "", internal: "", addr: ""}, d);
                        var g = d.internal == 0 ? "g" : "m";
                        i.onload = i.onreadystatechange = function () {
                            if (!e && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                                f();
                                i.onload = i.onreadystatechange = null;
                                e = !0
                            }
                        };
                        i.src = [c, g, "map.html?ver=", $CONFIG.version, "&", a.jsonToQuery(d)].join("")
                    }
                };
                document.body.appendChild(h);
                b.destroy = function () {
                    a.removeEvent(g, "click", j);
                    a.removeNode(h);
                    e = !1;
                    b = null;
                    return this
                }
            }
            return b
        }
    }();
    return e
});
STK.register("common.trans.map", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("getInternalInfo", {url: "http://api.weibo.com/2/location/geocode/is_domestic.json", method: "get", varkey: "callback", requestMode: "jsonp"});
    return b
});
STK.register("common.feed.feedList.plugins.map", function (a) {
    var b = a.common.feed.feedList.utils;
    return function (c) {
        if (!c)a.log("map : need object of the baseFeedList Class"); else {
            var d, e;
            c.getDEvent().add("feed_list_geo_info", "click", function (c) {
                var f = a.fixEvent(), g = c.el, h = c.data, i = h.geo;
                if (!i)a.log("map: feed_list_geo_info node geo is empty"); else {
                    var j = function (a) {
                    }, k = function (b) {
                        if (typeof b == "object" && b.code == 1) {
                            var k = b.data.geo.type, l = i.split(",");
                            d || (d = a.common.map());
                            e != g && d && d.refresh();
                            d.show(g, {latitude: l[1], longitude: l[0], head: h.head, addr: h.title, internal: k});
                            a.common.extra.rectsPosition.setArrow({evt: f, node: c.el, layer: d.getDom("outer"), arrow: d.getDom("arrow")});
                            e = g
                        } else j()
                    };
                    a.common.trans.map.getTrans("getInternalInfo", {onComplete: k, onFail: j}).request({coordinates: i + ",geo", source: "4526198296"});
                    return b.preventDefault(c.evt)
                }
            });
            var f = function (b) {
                if (!!e) {
                    var c = a.fixEvent(b).target;
                    e != c && !a.contains(e, c) && d && d.hide()
                }
            };
            a.addEvent(document, "click", f);
            a.custEvent.add(d, "hide", function () {
                e = undefined
            });
            var g = {destroy: function () {
                a.removeEvent(document, "click", f);
                a.custEvent.remove(d);
                d && d.destroy()
            }};
            return g
        }
    }
});
STK.register("common.feed.formatFeedTime", function (a) {
    var b = a.kit.extra.language, c = b("#L{月}"), d = b("#L{日}"), e = b("#L{今天}"), f = b("#L{秒前}"), g = b("#L{分钟前}");
    return function (a, c) {
        var d = a.getFullYear(), h = c.getFullYear(), i = a.getMonth() + 1, j = c.getMonth() + 1, k = a.getDate(), l = c.getDate(), m = a.getHours(), n = c.getHours(), o = c.getMinutes(), p = new Date;
        p.setTime(c.getTime() + 288e5);
        var q = p.getUTCFullYear(), r = p.getUTCMonth() + 1, s = p.getUTCDate(), t = p.getUTCHours(), u = p.getUTCMinutes();
        n < 10 && (n = "0" + n);
        t < 10 && (t = "0" + t);
        o < 10 && (o = "0" + o);
        u < 10 && (u = "0" + u);
        var v = a - c;
        v = v > 0 ? v : 0;
        v = v / 1e3;
        if (d != h)return q + "-" + r + "-" + s + " " + t + ":" + u;
        if (i != j || k != l)return b("#L{%s月%s日 %s:%s}", r, s, t, u);
        if (m != n && v > 3600)return e + " " + t + ":" + u;
        if (v < 51) {
            v = v < 1 ? 1 : v;
            return Math.floor((v - 1) / 10) + 1 + "0" + f
        }
        return Math.floor(v / 60 + 1) + g
    }
});
STK.register("common.feed.feedList.plugins.updateTime", function (a) {
    var b = a.common.feed.formatFeedTime, c = typeof $CONFIG != "undefined" && "timeDiff"in $CONFIG ? $CONFIG.timeDiff : 0, d = function (d) {
        var e = a.sizzle('a[node-type="feed_list_item_date"]', d), f = new Date;
        f.setTime(f.getTime() - c);
        var g;
        for (var h = 0; h < e.length; h++) {
            var i = e[h], j = i.getAttribute("date");
            if (!/^\s*\d+\s*$/.test(j))continue;
            var k = new Date;
            k.setTime(parseInt(j, 10));
            i.innerHTML = b(f, k);
            g == undefined && (g = f.getTime() - k.getTime() < 6e4)
        }
        return g
    };
    return function (b) {
        if (!b)a.log("updateTime : need object of the baseFeedList Class"); else {
            var c = b.getNode(), e, f = function (a) {
                clearTimeout(e);
                e = setTimeout(function () {
                    d(c) ? f(1e4) : f(6e4)
                }, a)
            }, g = function () {
                f(1e4)
            };
            f(1e4);
            a.custEvent.add(b, "updateFeed", g);
            var h = {destroy: function () {
                clearTimeout(e);
                a.custEvent.remove(b, "updateFeed", g);
                h = b = c = e = f = g = null
            }};
            return h
        }
    }
});
STK.register("common.feed.feedList.plugins.delOverFeeds", function (a) {
    var b = a.common.feed.feedList.utils, c = 1e3, d = function (a, c) {
        var d = b.getFeeds(a, 'action-type="feed_list_item"');
        for (var e = d.length; e > c; e--)a.removeChild(d[e - 1]);
        d = undefined
    };
    return function (b, e) {
        if (!b)a.log("delOverFeeds : need object of the baseFeedList Class"); else {
            e = a.parseParam({feedOverNum: c}, e);
            var f = {}, g = b.getNode(), h = function () {
                d(g, e.feedOverNum)
            };
            b.regCustEvent("delOverFeeds", h);
            f.destroy = function () {
                a.custEvent.remove(b, "delOverFeeds", h);
                f = g = undefined
            };
            return f
        }
    }
});
STK.register("common.feed.feedList.plugins.lazyload", function (a) {
    return function (b, c) {
        if (!b)a.log("lazyload : need object of the baseFeedList Class"); else {
            var d = {}, e = b.getNode(), f, g = 0, h = function () {
                f && f.destroy();
                var c = a.sizzle('div[node-type="lazyload"]', e)[0];
                if (!!c) {
                    b.setBottomNode(c);
                    f = a.common.extra.lazyload([c], function () {
                        var c = {pre_page: b.getCurrentPage(), page: b.getCurrentPage(), max_id: b.getLastFeedId(), end_id: b.getEndId(), count: g == 1 ? 15 : 15, pagebar: g == 1 ? 1 : 0, max_msign: b.getLastFeedAttr("msign"), filtered_min_id: b.getLastFeedAttr("filtered_min_id")};
                        b.setRequestData("lazyload", c);
                        b.showWait("lazyload");
                        a.custEvent.fire(b, "request", ["lazyload", a.parseParam(c)]);
                        f.destroy();
                        f = undefined
                    }, {threshold: a.winSize().height * 1.5})
                }
            };
            b.setRequestAction("lazyload", {bottom: !0});
            b.regCustEvent("lazyload", function () {
                g = 0;
                h()
            });
            a.custEvent.add(b, "updateFeed", function (a, b) {
                if (b == "lazyload") {
                    g = g == 0 ? 1 : 0;
                    h()
                }
            });
            h();
            d.destroy = function () {
                f && f.destroy();
                a.custEvent.remove(b, "lazyload");
                d = b = e = f = undefined
            };
            return d
        }
    }
});
STK.register("common.feed.feedList.plugins.newFeed", function (a) {
    var b = a.common.feed.feedList.utils, c = a.common.feed.feedList.feedTemps, d = a.kit.dom.firstChild;
    return function (e) {
        if (!e)a.log("newFeed : need object of the baseFeedList Class "); else {
            var f = {}, g = e.getNode(), h = !0, i = 0, j = 0, k = "mblog", l = function () {
                return k === "activity" ? 1 : 0
            };
            e.setRequestAction("newFeed", {top: !0});
            e.setExtraFunction("showNewFeedTip", function (b) {
                if (j == 0) {
                    b = a.parseParam({count: 0, isFilterAll: !1, feedType: "mblog"}, b);
                    k = b.feedType;
                    i = b.count;
                    h = !!b.isFilterAll;
                    if (e.isTopWaiting() || !i)return;
                    e.removeTopNode();
                    e.clearNewBar();
                    var f = {mblog: c.newFeedTipHTML, activity: c.activityNewFeedTipHTML}[b.feedType];
                    a.insertHTML(g, f.replace("[n]", i), "AfterBegin");
                    e.setTopNode(d(g));
                    a.custEvent.fire(e, "stopRecommendTip")
                }
            });
            a.custEvent.add(e, "updateFeed", function (b, c) {
                if (c == "newFeed") {
                    var d = a.sizzle("dl.feed_list_new", g)[1];
                    d && a.removeClassName(d, "feed_list_new");
                    a.custEvent.fire(f, "delOverFeeds");
                    e.removeRecommend();
                    a.custEvent.fire(e, "showRecommendTip");
                    setTimeout(function () {
                        j = 0
                    }, 3e4)
                }
            });
            a.custEvent.add(e, "showError", function (a, b) {
                b == "newFeed" && setTimeout(function () {
                    j = 0
                }, 3e4)
            });
            a.custEvent.add(e, "request", function (a, b) {
                b == "newFeed" && (j = 1)
            });
            e.getDEvent().add("feed_list_newBar", "click", function (b) {
                a.custEvent.fire(e, "clearTips", "newFeed");
                var c = l();
                if ((c || h) && i <= 50) {
                    if (e.getCurrentPage() == 1) {
                        if (c)a.custEvent.fire(e, "toActivity"); else {
                            var d = {since_id: e.getFirstFeedId(), end_msign: e.getFirstFeedAttr("msign"), activity: c};
                            e.setRequestData("newFeed", d);
                            e.showWait("newFeed");
                            a.custEvent.fire(e, "request", ["newFeed", a.parseParam(d)])
                        }
                        try {
                            SUDA.log()
                        } catch (f) {
                        }
                    } else c ? a.custEvent.fire(e, "toActivity") : a.custEvent.fire(e, "toFirstPage");
                    a.kit.extra.setPlainHash("_rnd" + (+(new Date)).toString())
                } else c ? a.custEvent.fire(e, "toActivity") : a.custEvent.fire(e, "backToAll");
                try {
                    a.preventDefault(b.evt)
                } catch (f) {
                }
                if (window.WBAD && window.WBAD.refresh) {
                    var g = {rt: 2};
                    window.WBAD.refresh(g)
                }
                a.historyM && a.historyM.getURL().query.indexOf("lf=reg") != -1 && a.historyM.setQuery({lf: 0});
                return!1
            });
            e.getDEvent().add("feed_tip_tosmart", "click", function (c) {
                a.custEvent.fire(e, "smartSort");
                return b.preventDefault(c.evt)
            });
            a.hotKey.add(document.documentElement, ["r"], function (a) {
                if (!a.ctrlKey) {
                    var b = e.getNewBar()[0];
                    b && e.getDEvent().fireDom(b, "click", null)
                }
            }, {type: "keyup", disableInInput: !0});
            return f
        }
    }
});
STK.register("common.feed.feedList.plugins.backToAll", function (a) {
    var b = a.common.feed.feedList.utils;
    return function (c) {
        if (!c)a.log("backToAll : need object of the baseFeedList Class"); else {
            var d = {}, e = c.getNode(), f = function () {
                a.custEvent.fire(c, "clearTips", "toAllLink");
                var b = {count: 15};
                c.setRequestData("backToAll", b);
                c.showWait("backToAll");
                c.setCurrentPage(1);
                window.scrollTo(0, 0);
                a.custEvent.fire(c, "request", ["backToAll", a.parseParam(b)])
            };
            c.regCustEvent("backToAll", function () {
                f()
            });
            c.setRequestAction("backToAll", {top: !0, center: !0, bottom: !0});
            a.custEvent.add(c, "updateFeed", function (b, d) {
                d == "backToAll" && a.custEvent.fire(c, "lazyload")
            });
            c.getDEvent().add("feed_list_toAllLink", "click", function (a) {
                f();
                return b.preventDefault(a.evt)
            });
            return d
        }
    }
});
STK.register("common.feed.feedList.plugins.search", function (a) {
    return function (b) {
        if (!b)a.log("search : need object of the baseFeedList Class"); else {
            var c = {};
            b.setRequestAction("search", {top: !0, center: !0, bottom: !0});
            b.setRequestData("search", {count: 15});
            a.custEvent.add(b, "updateFeed", function (c, d) {
                if (d == "search") {
                    b.setCurrentPage(1);
                    a.custEvent.fire(b, "updateEndId");
                    a.custEvent.fire(b, "lazyload")
                }
            });
            return c
        }
    }
});
STK.register("common.feed.feedList.plugins.imgAdvLoading", function (a) {
    var b, c = {};
    return function (d, e) {
        if (!d)a.log(" imgAdvLoading : need object of the baseFeedList Class"); else {
            var f = {}, g = [], h, i, j, k = function () {
                h = null;
                g.shift();
                j && (j.onload = j.onerror = null);
                clearTimeout(i);
                m()
            }, l = function () {
                var a = g[0];
                if (a && !c[a]) {
                    h = 1;
                    var b = new Image;
                    c[a] = b;
                    b.onload = b.onerror = k;
                    i = setTimeout(k, 1e4);
                    j = b;
                    b.setAttribute("src", a.replace(/\/thumbnail\//, "/bmiddle/"))
                } else k()
            }, m = function () {
                !h && g.length && l()
            }, n = function (b) {
                b = a.isArray(b) ? b : [b];
                Array.prototype.push.apply(g, b);
                m()
            };
            a.custEvent.add(d, "updateFeed", function (b, c, d) {
                if (!!d) {
                    var e = d.match(/<[^<]*feed_list_media_bgimg[^>]*>/g);
                    if (e) {
                        e = a.foreach(e, function (a) {
                            var b = a.match(/src\s*=\s*(?:'|")*([^'"]*)/);
                            if (b && (b = b[1]) && b.indexOf(".gif") == -1)return b
                        });
                        n(e)
                    }
                }
            });
            var o = a.foreach(a.sizzle("img[node-type=feed_list_media_bgimg]", d.getNode()), function (a) {
                var b = a.getAttribute("src");
                if (b && b.indexOf(".gif") == -1)return b
            }), p, q = function () {
                if (b)r(); else {
                    a.addEvent(window, "load", function () {
                        if (!b) {
                            clearTimeout(p);
                            b = 1;
                            r()
                        }
                    });
                    p = setTimeout(function () {
                        b = 1;
                        r()
                    }, 5e3)
                }
            }, r = function () {
                o && o.length && n(o)
            };
            q();
            f.destroy = function () {
                g = [];
                k()
            };
            return f
        }
    }
});
STK.register("common.feed.feedList.plugins.feedHotKey", function (a) {
    return function (b) {
        var c = {}, d = function (a) {
            var a = a || window.event, b = a.target || a.srcElement;
            return b && /^embed|object$/i.test(b.tagName.toLowerCase()) ? !0 : !1
        }, e = function (a) {
            var c = b.getNodeList();
            if (!d(a)) {
                var e = 0, f = STK.core.util.scrollPos, g = STK.core.dom.position, h = 0;
                for (e = 0; e < c.length; e++) {
                    h = g(c[e]).t;
                    var i = h - f().top;
                    if (i > 42)break
                }
                STK.core.util.scrollTo(c[e], {step: 4, top: 42})
            }
        }, f = function (a) {
            if (!d(a)) {
                var c = b.getNodeList(), e = 0, f = STK.core.util.scrollPos, g = STK.core.dom.position, h = 0;
                for (e = 0; e < c.length; e++) {
                    h = g(c[e]).t;
                    var i = h - f().top;
                    if (i >= 0)break
                }
                e == 0 ? STK.core.util.scrollTo(document.documentElement, {step: 4}) : STK.core.util.scrollTo(c[e - 1], {step: 4, top: 42})
            }
        }, g = function (c) {
            if (!d(c)) {
                var e = b.getNewBar()[0], f = 0;
                if (e) {
                    var h = 80;
                    clearTimeout(g.timer);
                    var i = a.position(e), j = a.core.dom.getSize(e), k = a.core.util.winSize().height;
                    if (k < i.t + j.height + h) {
                        var l = a.position(b.getNode()).t - h;
                        l > 0 && (f = l)
                    }
                    g.timer = setTimeout(function () {
                        b.getDEvent().fireDom(e, "click", null)
                    }, 500)
                }
                window.scrollTo(0, f)
            }
        };
        a.hotKey.add(document.documentElement, ["j"], e, {type: "keydown", disableInInput: !0});
        a.hotKey.add(document.documentElement, ["k"], f, {type: "keydown", disableInInput: !0});
        a.hotKey.add(document.documentElement, ["."], g, {type: "keydown", disableInInput: !0});
        c.destroy = function () {
            a.hotKey.remove(document.documentElement, ["j"], e, {type: "keydown", disableInInput: !0});
            a.hotKey.remove(document.documentElement, ["k"], f, {type: "keydown", disableInInput: !0});
            a.hotKey.remove(document.documentElement, ["."], g, {type: "keydown", disableInInput: !0})
        };
        return c
    }
});
STK.register("common.feed.feedList.plugins.feedShield", function (a) {
    var b = a.common.feed.feedList.utils, c = a.kit.extra.language, d = a.templet, e = a.common.trans.feed, f = {FRAME: '<div style="display:none;position:absolute" node-type="FSLayer" action-type="feed_list_layer" class="layer_menu_list"></div>', SHIELD: {USER: {ITEM: c('<li><a action-type="feed_list_shield_by_user" href="javascript:void(0)" suda-data="#{SUDA_DATA}" action-data="filter_type=1&uid=#{UID}&nickname=#{NICKNAME}&gender=#{GENDER}">#L{屏蔽%s的微博}</a></li>', "#{NICKNAME}"), CONFIRM: c("<span>#L{确认屏蔽}<strong> #{NICKNAME}</strong> #L{的微博吗？}</span>"), SMALLTEXT: '#L{在“我的首页”将自动屏蔽%s的新微博。}<br />#L{可以在}<a href="http://account.weibo.com/set/feed" target="_blank">#L{帐号设置-隐私设置}</a>#L{中增加或取消屏蔽。}'}, MID: {ITEM: c('<li><a action-type="feed_list_shield_by_mid" href="javascript:void(0)"  suda-data="#{SUDA_DATA}" action-data="filter_type=0&mid=#{MID}&justhide=#{JUSTHIDE}">#L{隐藏这条微博}</a></li>'), CONFIRM: c("<span>#L{确认屏蔽} <strong>#{NICKNAME} #L{的微博吗？}</strong></span>"), SMALLTEXT: c('#L{系统将在你的首页自动屏蔽}#{GENDER}#L{的新微博。}<br />#L{可以在}<a href="http://account.weibo.com/set/feed" target="_blank">#L{帐号设置-隐私设置}</a>中设置和取消屏蔽。}')}, APP: {ITEM: c('<li><a action-type="feed_list_shield_by_app" href="javascript:void(0)"  suda-data="#{SUDA_DATA}" action-data="filter_type=2&uid=#{UID}&nickname=#{NICKNAME}&mid=#{MID}&appname=#{APPNAME}&gender=#{GENDER}&member_type=#{MEMBERTYPE}">#L{屏蔽来自%s的微博}<span class="W_ico16 ico_member"></span></a></li>', "#{APPNAME}"), CONFIRM: c("<span>#L{确认屏蔽来自}<strong> #{APPNAME} </strong> #L{的微博吗？}</span><br />"), SMALLTEXT: c('#L{在“我的首页”将自动屏蔽来自它的新微博。}<br />#L{可以在}<a href="http://account.weibo.com/set/feedsource" target="_blank">#L{帐号设置-隐私设置}</a>#L{中取消屏蔽。}'), SMALLTEXTMEMBER: c('#L{您当前为}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>#L{，}#L{可正常使用屏蔽功能，}<br />#L{可在}<a href="http://account.weibo.com/set/feedsource" target="_blank">#L{帐号设置-隐私设置}</a>#L{中取消屏蔽。}')}, KEYWORD: {ITEM: c('<li><a action-type="feed_list_shield_setkeyword" href="javascript:void(0)" action-data="member_type=#{member_type}" suda-data="key=tblog_screen_keyword&value=screen_keyword">#L{屏蔽关键词}<span class="W_ico16 ico_member"></span></a></li>')}, AD: {ITEM: c('<li><a action-type="feed_list_shield_by_ad" href="javascript:void(0)" suda-data="#{SUDA_DATA}" action-data="filter_type=1&mid=#{MID}&mark=#{MARK}&feedtype=#{FEEDTYPE}">#L{对此条微博不感兴趣}</a></li>'), CONFIRM: c("<span>#L{确认屏蔽}<strong> #{NICKNAME}</strong> #L{的微博吗？}</span>"), SMALLTEXT: '#L{在“我的首页”将自动屏蔽%s的新微博。}<br />#L{可以在}<a href="http://account.weibo.com/set/feed" target="_blank">#L{帐号设置-隐私设置}</a>#L{中增加或取消屏蔽。}'}}, TIPS: {USER: {USERMAX: {TITLE: c("#L{提示}"), CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{抱歉！你已经屏蔽了5人的微博，不能继续操作了。}</p><p class="S_txt2">#L{但你可以试试下面的办法}</p></dd></dl><div class="btn"><a class="W_btn_b" href="http://account.weibo.com/set/feed"><span>#L{管理我的屏蔽}</span></a><a class="W_btn_a" href="http://vip.weibo.com/paycenter?from=pbyh"><span><em class="W_ico16 ico_member"></em>#L{立即开通会员}</span></a></div>')}, MEMBERMAX: {TITLE: c("#L{提示}"), CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{你的屏蔽数已满，等会员升级后再试吧！}</p></dd></dl><div class="btn"><a href="http://vip.weibo.com/privilege"><span>#L{了解更多会员特权}&raquo;</span></a><a action-type="iknow" class="W_btn_d" href="javascript:void(0)"><span>#L{知道了}</span></a></div>')}, MEMBERTIMEOUT: {TITLE: c("#L{提示}"), CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{抱歉！你已经屏蔽了太多人的微博，不能继续操作了。}</p><p class="S_txt2">#L{但你可以试试下面的办法}</p></dd></dl><div class="btn"><a class="W_btn_b" href="http://account.weibo.com/set/feed"><span>#L{管理我的屏蔽}</span></a><a class="W_btn_a" href="http://vip.weibo.com/paycenter"><span><em class="W_ico16 ico_member"></em>#L{立即开通会员}</span></a></div>')}}, APP: {UNABLE: {TITLE: c("#L{该来源暂时不可屏蔽哦。}"), CONTENT: c('<a href="http://weibo.com/zt/s?k=9286" target="_blank">#L{我要提建议。}</a>')}, NOPERISSION: {TITLE: c("#L{提示}"), CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{您还不是微博会员，不能使用此功能！}</p><p class="S_txt2">#L{开通}<a class="S_link2" href="http://vip.weibo.com/paycenter">#L{微博会员}</a>#L{，可屏蔽来自第三方的应用}</p><p class="S_txt2"><a href="http://vip.weibo.com/privilege"><span>#L{了解更多会员特权}&raquo;</span></a></p></dd></dl><div class="btn"><a class="W_btn_b" href="http://account.weibo.com/set/feedsource"><span>#L{管理我的屏蔽}</span></a><a class="W_btn_a" href="http://vip.weibo.com/paycenter?from=pbly"><span><em class="W_ico16 ico_member"></em>#L{立即开通会员}</span></a></div>')}, MEMBERTIMEOUT: {TITLE: c("#L{提示}"), CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{您的会员身份已过期，不能使用此功能！}</p><p class="S_txt2">#L{您可以先}<a class="S_link2" href="http://vip.weibo.com/paycenter">#L{开通会员}</a>#L{再来屏蔽第三方应用}</p></dd></dl><div class="btn"><a class="W_btn_b" href="http://account.weibo.com/set/feedsource"><span>#L{管理我的屏蔽}</span></a><a class="W_btn_a" href="http://vip.weibo.com/paycenter"><span><em class="W_ico16 ico_member"></em>#L{立即开通会员}</span></a></div>')}}}};
    return function (g) {
        var h, i;
        if (!g)throw"that : need object of the baseFeedList Class";
        var j, k, l = {}, m = g.getNode(), n = g.getDEvent(), o, p, q = {cache: null, dEvt: null, init: function () {
            q.cache = a.ui.dialog({isHold: !0});
            a.addClassName(q.cache.getInner(), "layer_point");
            q.dEvt = a.core.evt.delegatedEvent(q.cache.getInner());
            q.dEvt.add("iknow", "click", q.cache.hide)
        }, show: function (a) {
            q.cache.setTitle(a.title);
            q.cache.setContent(a.content);
            q.cache.show();
            q.cache.setMiddle()
        }, destroy: function () {
            q.dEvt.destroy();
            q = undefined
        }}, r = function (b) {
            var d = {title: c("#L{提示}"), warnMsg: c("#L{你还不是微博会员，不能使用此功能！}"), OKText: c("#L{关闭}"), textComplex: c('<a href="http://vip.weibo.com/paycenter?from=guide2&topnav=1&wvr=5"><span>#L{开通微博会员}&raquo;</span></a>#L{可屏蔽带有已添加关键字的微博}<a href="http://vip.weibo.com/privilege"><span>#L{了解更多会员特权}&raquo;</span></a>'), vip: c("#L{开通会员}")};
            b == "app" && (d.textComplex = c('<a href="http://vip.weibo.com/paycenter?from=guide2&topnav=1&wvr=5"><span>#L{开通微博会员}&raquo;</span></a>#L{可屏蔽来自第三方应用发的微博}<a href="http://vip.weibo.com/privilege"><span>#L{了解更多会员特权}&raquo;</span></a>'));
            a.ui.vipConfirm(d.warnMsg, {icon: "warn", title: d.title, toBeVipText: d.vip, textComplex: d.textComplex, OKText: d.OKText, toBeVip: function () {
                a.preventDefault();
                window.location.href = "http://vip.weibo.com/paycenter?refer=publish"
            }});
            l.hide()
        }, l = {create: function () {
            h = a.kit.dom.parseDOM(a.core.dom.builder(f.FRAME).list).FSLayer;
            a.sizzle("body")[0].appendChild(h);
            p = a.core.evt.delegatedEvent(h);
            p.add("feed_list_shield_by_user", "click", t.user.behavior);
            p.add("feed_list_shield_by_mid", "click", t.mid.behavior);
            p.add("feed_list_shield_by_app", "click", t.app.behavior);
            p.add("feed_list_shield_by_ad", "click", t.ad.behavior);
            p.add("feed_list_shield_setkeyword", "click", function (b) {
                var c = b.data;
                if (c.member_type != 1)r("keyword"); else {
                    l.hide();
                    a.custEvent.fire(g, "setkeyword")
                }
            })
        }, toggle: function (a) {
            k = a.el;
            h || l.create();
            if (i === k)if (h.style.display == "none") {
                l.show();
                l.setLayerPos()
            } else l.hide(); else {
                j = a.data;
                l.reDisplay()
            }
        }, reDisplay: function () {
            var b = [];
            for (var c in t)b.push(t[c].item());
            h.innerHTML = "<ul>" + b.join("") + "</ul>";
            b = null;
            l.setLayerPos();
            l.show();
            i && (i.className = "W_ico12 icon_choose");
            i && a.setStyle(i, "visibility", "");
            i = k
        }, show: function () {
            a.setStyle(k, "visibility", "visible");
            k.className = "W_ico12 icon_chooseup";
            h && a.setStyle(h, "display", "");
            a.addEvent(document.body, "click", l.autoHide)
        }, hide: function () {
            a.setStyle(k, "visibility", "");
            k.className = "W_ico12 icon_choose";
            h && a.setStyle(h, "display", "none");
            a.removeEvent(document.body, "click", l.autoHide)
        }, setLayerPos: function () {
            var b = a.core.dom.getSize(h), c = a.core.dom.getSize(k), d = a.core.dom.position(k);
            a.setStyle(h, "top", d.t + c.height + "px");
            a.setStyle(h, "left", d.l + c.width - b.width + "px")
        }, outLayer: function () {
            o && clearTimeout(o);
            o = window.setTimeout(function () {
                l.autoHide()
            }, 50)
        }, autoHide: function (b) {
            var c = a.core.evt.getEvent(), d = a.fixEvent(c);
            !a.core.dom.contains(h, d.target) && !a.core.dom.contains(k, d.target) && d.target !== k && l.hide()
        }, reflushFeedList: function () {
        }}, s = function (c, d, e) {
            var f = b.getFeedNode(d, e);
            f.style.height = f.offsetHeight + "px";
            f.style.overflow = "hidden";
            var g = a.tween(f, {duration: 200, end: function () {
                var b = a.core.dom.neighbor(f).parent('[action-type="feed_list_item"]').finish(), h = f.getAttribute("mid"), i = a.sizzle('[node-type="followNum"]', b), j = a.sizzle('[node-type="feed_merge_lists"]', b)[0], k = a.sizzle('[node-type="feed_list_portraitBox"]', b)[0], l, m = a.sizzle("li", k);
                a.foreach(m, function (b) {
                    var c = b.getAttribute("prev_id");
                    c == h && a.removeNode(b)
                });
                if (i.length != 0) {
                    a.foreach(i, function (a) {
                        l = parseInt(a.innerHTML, 10) - 1;
                        a.innerHTML = l
                    });
                    i[0] && parseInt(i[0].innerHTML, 10) == 0 && a.removeNode(j)
                }
                f.innerHTML = "";
                a.removeNode(f);
                e = d = f = null;
                g.destroy();
                c.getFeedCount() < 1 && window.location.reload()
            }}).play({height: 0})
        }, t = {mid: {item: function () {
            return j.mid && j.blocktype != "ad" ? d(f.SHIELD.MID.ITEM, {MID: j.mid, JUSTHIDE: j.justhide || 0, SUDA_DATA: j.mblogsorttype == "1" ? "key=smart_feed&value=hidden_feed" : ""}) : ""
        }, behavior: function (a) {
            var b = k, c = a.data;
            c.location = $CONFIG.location;
            e.getTrans("feedShield", {onComplete: function (a) {
                a.justhide = c.justhide;
                t.user.handle(a, b)
            }}).request(c);
            l.hide()
        }, handle: function (a, b) {
            u(a, b)
        }}, user: {item: function () {
            return j.blocktype != "ad" && j.uid && j.nickname && (!j.miyou || j.miyou != "1") ? d(f.SHIELD.USER.ITEM, {UID: j.uid, NICKNAME: j.nickname, GENDER: j.gender, SUDA_DATA: j.mblogsorttype == "1" ? "key=smart_feed&value=block_sbsfeed" : ""}) : ""
        }, behavior: function (b) {
            var g = b.data;
            g.location = $CONFIG.location;
            var h = k;
            a.ui.confirm(d(f.SHIELD.USER.CONFIRM, {UID: b.data.uid, NICKNAME: b.data.nickname, GENDER: b.data.gender == "m" ? "他" : "她"}), {textSmall: c(f.SHIELD.USER.SMALLTEXT, b.data.gender == "m" ? c("#L{他}") : c("#L{她}")), OK: function () {
                e.getTrans("feedShield", {onComplete: function (a) {
                    t.user.handle(a, h)
                }}).request(g)
            }});
            l.hide()
        }, handle: function (a, b) {
            u(a, b)
        }}, app: {item: function () {
            return j.blocktype != "ad" && j.uid && j.nickname && j.mid && j.appname && j.isactive && j.isactive == "1" && (!j.miyou || j.miyou != "1") ? d(f.SHIELD.APP.ITEM, {UID: j.uid, NICKNAME: j.nickname, APPNAME: j.appname, MID: j.mid, GENDER: j.gender, SUDA_DATA: j.mblogsorttype == "1" ? "key=smart_feed&value=block_appkey" : "", MEMBERTYPE: j.member_type || 0}) : ""
        }, behavior: function (b) {
            var c = k, g = b.data;
            g.location = $CONFIG.location;
            if (g.member_type != 1)r("app"); else {
                a.ui.confirm(d(f.SHIELD.APP.CONFIRM, {UID: b.data.uid, NICKNAME: b.data.nickname, APPNAME: b.data.appname, GENDER: b.data.gender == "m" ? "他" : "她"}), {textSmall: g.member_type == 1 ? f.SHIELD.APP.SMALLTEXTMEMBER : f.SHIELD.APP.SMALLTEXT, OK: function () {
                    e.getTrans("feedShield", {onComplete: function (a) {
                        t.user.handle(a, c)
                    }}).request(g)
                }});
                l.hide()
            }
        }, handle: function (a, b) {
            u(a, b)
        }}, keyword: {item: function () {
            return j.blocktype != "ad" ? d(f.SHIELD.KEYWORD.ITEM, {member_type: j.member_type}) : ""
        }}, ad: {item: function () {
            return j.mid && j.mark && j.feedtype && j.blocktype && j.blocktype == "ad" ? d(f.SHIELD.AD.ITEM, {FEEDTYPE: j.feedtype, MARK: j.mark, MID: j.mid, SUDA_DATA: "key=tblog_ad_spread&value=not_interested"}) : ""
        }, behavior: function (a) {
            var b = a.data;
            b.location = $CONFIG.location;
            var c = k;
            e.getTrans("adShield", {onComplete: function (a) {
                s(g, c, m);
                l.hide()
            }}).request(b)
        }, handle: function (a, b) {
            s(g, b, m);
            l.hide()
        }}}, u = function (b, c) {
            var d = "error";
            b.justhide == 1 && (b.code = "100000");
            if (b.code == "100000") {
                d = "succM";
                s(g, c, m)
            } else if (b.code == "100033") {
                if (b.data && b.data.member_type > -1) {
                    var e = {title: f.TIPS.USER.USERMAX.TITLE, content: f.TIPS.USER.USERMAX.CONTENT};
                    switch (b.data.member_type) {
                        case 0:
                            break;
                        case 1:
                            e.content = f.TIPS.USER.MEMBERMAX.CONTENT;
                            break;
                        case 2:
                            e.content = f.TIPS.USER.MEMBERTIMEOUT.CONTENT;
                            break;
                        default:
                    }
                    q.show(e);
                    return
                }
            } else if (b.code == "100035") {
                if (b.data && b.data.member_type > -1) {
                    var e = {title: f.TIPS.APP.NOPERISSION.TITLE, content: f.TIPS.APP.NOPERISSION.CONTENT};
                    switch (b.data.member_type) {
                        case 0:
                            break;
                        case 1:
                            break;
                        case 2:
                            e.content = f.TIPS.APP.MEMBERTIMEOUT.CONTENT;
                            break;
                        default:
                    }
                    q.show(e);
                    return
                }
                a.ui.alert(f.TIPS.APP.UNABLE.TITLE, {type: "warn", textSmall: f.TIPS.APP.UNABLE.COCONTENT})
            } else a.ui.litePrompt(b.msg, {type: d, timeout: "1000"})
        }, v = function () {
            n.add("feed_list_shield", "click", l.toggle);
            q.init()
        };
        v();
        l.destroy = function () {
            p.destroy();
            q.destroy();
            i = h = p = q = l = undefined
        };
        return l
    }
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
STK.register("common.dialog.moodComment", function (a) {
    return function (b) {
        var c = a.getUniqueKey(), d = '<#et comment data><div class="layer_mood_detail" node-type="moodContent"><dl class="details"><dt><img height="32" width="32" src="${data.mood_url}"<#if (data.mood_title)> title="${data.mood_title}"</#if>/></dt><dd><span class="arrow"></span>${data.content}</dd></dl><div class="input" node-type="widget"><p class="btn_face" node-type="smileyBtn" title="#L{表情}"><span class="faces"></span></p><p class="num S_txt2" node-type="numCount">#L{还可以输入%s字}</p><textarea cols="" rows="" name="" node-type="textEl"></textarea><ul class="forword"><li><label for="' + c + '"><input type="checkbox" class="W_checkbox" node-type="isForward" id="' + c + '">#L{同时转发到我的微博}</label></li>' + "</ul>" + '<p class="btn" title="#L{评论}"><a href="javascript:void(0)" class="W_btn_d btn_noloading" action-type="comment" node-type="commentBtn"><span><b class="loading"></b><em node-type="btnText">#L{评论}</em></span></a></p>' + "</div>" + "</div>", e = {}, f, g, h = a.kit.extra.language, i = null, j = {limitNum: 140, count: "disable"}, k = null, l = a.ui.dialog(b), m = function () {
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
            g = a.kit.dom.parseDOM(a.builder(l.getInner()).list)
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
                    a.ui.litePrompt(h("#L{评论成功}"), {type: "succM", timeout: "1000"});
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
STK.register("common.channel.mood", function (a) {
    var b = ["changeMoodState", "bubbleClose"];
    return a.common.listener.define("common.channel.mood", b)
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
STK.register("common.dialog.moodList", function (a) {
    return function (b) {
        var c = {}, d, e = a.kit.extra.language, f, g, h = e('<div node-type="pageNodeOuter"><div class="W_loading" style="width:325px;padding-top:15px;padding-bottom:15px;text-align:center"><span>#L{正在加载，请稍候}...</span></div></div>'), i = function () {
            if (!b.trans)throw"moodList need trans sendRequest";
            if (!b.transName)throw"moodList need transName"
        }, j = function () {
            d = a.ui.dialog();
            d.setTitle(e("#L{心情列表}"));
            d.setContent(h);
            var b = d.getInner();
            f = a.kit.dom.parseDOM(a.builder(b).list)
        }, k = function () {
            g = a.common.mood.moodPageSearch({fromWhere: "dialog", contentNode: f.pageNodeOuter, delegateNode: f.pageNodeOuter, trans: b.trans, transName: b.transName, extra: {style: "simp"}})
        }, l = function () {
            d && d.setMiddle && d.setMiddle()
        }, m = function () {
            a.custEvent.add(g, "setMiddle", l)
        }, n = function () {
            i();
            j();
            k();
            m()
        }, o = function () {
            g && g.destroy && g.destroy();
            f = d = g = undefined
        };
        c.show = function () {
            d && d.show();
            d && d.setMiddle()
        };
        c.hide = function () {
            d && d.hide()
        };
        c.destroy = o;
        n();
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
                var d = a.ui.tipAlert({showCallback: function () {
                    setTimeout(function () {
                        d && d.anihide()
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
STK.register("ui.mod.tab", function (a) {
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
            var j = a.kit.dom.parseDOM(a.builder(i.getInner()).list), l = function () {
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
            a.ui.mod.tab(x, {evtType: "click", tNodes: '[node-type="tab"]', className: "current", removeClassNames: "pftb_lk S_line5 S_txt1 S_bg1", addClassNames: "pftb_lk current S_line5 S_txt1 S_bg5", cb: [R.init, S.init]});
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
            L.close = f.getDomList().close[0];
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
            f.setLayout(d, {offsetX: -24, offsetY: 5})
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
STK.register("common.dialog.publish", function (a) {
    var b = '<#et temp data><div class="detail" node-type="outer"><div class="send_weibo clearfix" node-type="wrap"><div class="title_area clearfix"><div class="title" node-type="info"></div><div class="num S_txt2" node-type="num"><span>140</span>#L{字}</div><div class="key S_textb"  ></div></div><div class="input clicked" style="width:460px;"><textarea name="" class="input_detail" node-type="textEl"></textarea><div class="send_succpic" style="display:none" node-type="successTip"><span class="icon_succB"></span><span class="txt">#L{发布成功}</span></div><span class="arrow"></span></div><div class="func_area clearfix"><div class="func"><div class="limits"><a href="javascript:void(0);" node-type="showPublishTo" action-type="showPublishTo" action-data="rank=0"><span node-type="publishTotext" class="W_autocut">#L{公开}</span><span class="W_arrow"><em node-type="publish_to_arrow">◆</em></span></a></div><a href="javascript:void(0)" class="send_btn disable" diss-data="module=shissue" node-type="submit">#L{发布}</a></div><div class="kind S_txt3" node-type="widget"><span class="kind_detail"><#if (data.smileyBtn)><a href="javascript:void(0)" class="W_ico16 icon_sw_face" node-type="smileyBtn">#L{表情}</a></#if><#if (data.picBtn)><a href="javascript:void(0)" class="W_ico16 icon_sw_img" node-type="picBtn">#L{图片}</a></#if></span></div></div></div></div>', c = {title: "#L{有什么新鲜事想告诉大家}"}, d = a.kit.extra.language, e = {limitNum: 140, extendText: '<a target="_blank" class="S_txt2" href="http://weibo.com/z/guize/gongyue.html">#L{发言请遵守社区公约}</a>，'};
    return function (f) {
        var g = {}, h, i, j, k, l, m, n, o, p, q, r;
        h = a.parseParam({templete: d(b), appkey: "", styleId: "1", smileyBtn: !0, picBtn: !0, pid: ""}, f);
        o = a.custEvent.define(g, "publish");
        a.custEvent.define(g, "hide");
        var s = function () {
            var b = l.textEl;
            if (i)j === "error" && a.common.extra.shine(b); else {
                i = !0;
                j = "loading";
                var c = a.common.getDiss(t(), l.submit);
                c.pub_type = "dialog";
                r && r.disable();
                n.request(c)
            }
        }, t = function () {
            var b = m.API.getWords();
            p && b.indexOf(p) === -1 && (b = b + p);
            var c = {};
            c.appkey = h.appkey;
            c.style_type = h.styleId;
            c.text = b;
            var d = m.API.getExtra();
            if (d)if (d.indexOf("=") < 0)c.pic_id = m.API.getExtra() || ""; else {
                var e = d, f = a.core.json.queryToJson(e);
                for (var g in f)c[g] = f[g];
                a.log(c)
            }
            if (r && r.rank) {
                var i = r.rank();
                c.rank = i.rank;
                c.rankid = i.rankid
            }
            return c
        }, u = function (a) {
            if ((a.keyCode === 13 || a.keyCode === 10) && a.ctrlKey) {
                s();
                m.API.blur()
            }
        }, v = function (a, b) {
            var c = b.isOver;
            if (!c) {
                i = !1;
                j = "";
                l.submit.className = "send_btn";
                l.num.innerHTML = (e.extendText ? d(e.extendText) : "") + d("#L{还可以输入%s字}", "<span>" + (140 - b.count) + "</span>")
            } else {
                i = !0;
                j = "error";
                l.submit.className = "send_btn disable"
            }
        }, w = function (b, c) {
            j = "";
            l.successTip.style.display = "";
            l.textEl.value = "";
            setTimeout(function () {
                i = !1;
                l.successTip.style.display = "none";
                k && k.hide();
                l.submit && (l.submit.className = "send_btn")
            }, 2e3);
            a.custEvent.fire(o, "publish", [b.data, c]);
            a.common.channel.feed.fire("publish", [b.data, c]);
            l.submit.className = "send_btn disable";
            m.API.reset();
            r && r.reset && r.reset()
        }, x = function (b, c) {
            i = !1;
            j = "";
            b.msg = b.msg || d("操作失败");
            a.common.layer.ioError(b.code, b);
            l.submit && (l.submit.className = "send_btn");
            r && r.enable()
        }, y = function (a) {
            l.textEl.value = "";
            m.API.insertText(a.content);
            l.info.innerHTML = a.info;
            a.appkey && (h.appkey = a.appkey);
            if (a.content) {
                i = !1;
                j = "";
                l.submit.className = "send_btn"
            } else {
                i = !0;
                j = "error";
                l.submit.className = "send_btn disable"
            }
        }, z = function () {
            i = !1
        }, A = function () {
            m = a.common.editor.base(a.core.util.easyTemplate(a.kit.extra.language(h.templete), h).toString(), e);
            h.smileyBtn && m.widget(a.common.editor.widget.face({useAlign: !0}), "smileyBtn");
            h.picBtn && m.widget(a.common.editor.widget.image(), "picBtn");
            l = m.nodeList;
            r = a.common.editor.plugin.publishTo({editorWrapEl: l.wrap, textEl: l.textEl});
            q = a.common.dialog.validateCode()
        }, B = function () {
            a.addEvent(l.submit, "click", s);
            a.addEvent(l.textEl, "keypress", u)
        }, C = function () {
            r && r.miYouStyle.apply(null, arguments)
        }, D = function () {
            a.custEvent.add(m, "textNum", v);
            r && a.custEvent.add(r, "changeRank", C)
        }, E = function () {
            n = a.common.trans.feed.getTrans("publish", {onComplete: function (a, b) {
                var c = {onSuccess: w, onError: x, requestAjax: n, param: t(), onRelease: function () {
                    i = !1;
                    j = "";
                    l.submit && (l.submit.className = "send_btn");
                    r && r.enable()
                }};
                q.validateIntercept(a, b, c)
            }, onFail: x, onTimeout: x})
        }, F = function () {
            A();
            B();
            D();
            E()
        }, G = function (b) {
            m || F();
            var e = a.parseParam({appkey: "", content: "", defaultValue: "", info: "", title: d(c.title)}, b);
            k = a.ui.dialog();
            k.setTitle(e.title);
            k.appendChild(l.outer);
            k.show();
            k.setMiddle();
            y(e);
            m.API.focus();
            a.custEvent.add(k, "hide", function () {
                a.custEvent.remove(k, "hide", arguments.callee);
                m.closeWidget();
                z();
                k = null;
                a.custEvent.fire(o, "hide")
            });
            p = e.defaultValue
        }, H = function () {
            k.hide()
        }, I = function (a) {
            m.API.addExtraInfo(a)
        }, J = function (a) {
            m.API.disableEditor(a)
        }, K = function () {
            k && k.hide();
            l && l.submit && a.removeEvent(l.submit, "click", s);
            l && l.textEl && a.removeEvent(l.textEl, "keypress", u);
            a.custEvent.remove(m, "textNum", v);
            r && a.custEvent.remove(r, "changeRank", C);
            a.custEvent.undefine(o, "publish");
            q && q.destroy && q.destroy();
            r && r.destroy && r.destroy();
            l = null;
            n = null;
            i = !1;
            for (var b in g)delete g[b];
            g = null
        };
        g.addExtraInfo = I;
        g.disableEditor = J;
        g.show = G;
        g.hide = H;
        g.destroy = K;
        return g
    }
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
                a.ui.litePrompt(g("#L{分享成功}"), {type: "succM", timeout: "500", hideCallback: function () {
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
STK.register("common.dialog.moodSmallPublish", function (a) {
    return function (b) {
        var c = {}, d = a.kit.extra.language, e = d('<div class="W_loading" style="width:325px;padding-top:15px;padding-bottom:15px;text-align:center"><span>#L{正在加载，请稍候}...</span></div>'), f = null, g = null, h = null, i;
        b = a.parseParam({isHold: !0}, b);
        var j = function () {
            f = a.ui.dialog(b);
            f.setTitle(d("#L{Hey！今天心情如何？}"));
            f.setContent(e);
            a.custEvent.define(c, ["success", "error"]);
            n()
        }, k = function (b) {
            a.ui.alert(b.msg);
            f && f.hide()
        }, l = function (b, e) {
            a.custEvent.fire(c, "success", e);
            o();
            a.ui.litePrompt(d("#L{发布成功}"), {type: "succM", timeout: "1000"});
            a.common.channel.mood.fire("changeMoodState", {state: "published"})
        }, m = function (b, d) {
            a.custEvent.fire(c, "error", d)
        }, n = function () {
            a.common.trans.mood.getTrans("simppublish", {onSuccess: function (b) {
                var c = b.data.html;
                f.setContent(c);
                var d = f.getDomList().inner[0], e = f.getDomList().layoutContent[0];
                g = a.builder(e).list;
                h = a.common.mood.moodPublish(d);
                i = a.common.mood.shareFeed({node: d, layoutNode: e});
                a.custEvent.add(h, "success", l);
                a.custEvent.add(h, "error", m);
                f.setMiddle()
            }, onError: k, onFail: k}).request()
        }, o = function () {
            f && f.hide()
        }, p = function () {
            f && f.show();
            f && f.setMiddle()
        }, q = function () {
            i && i.destroy && i.destroy();
            f && f.destroy && f.destroy();
            f = g = i = undefined
        }, r = function () {
            h && h.reset && h.reset()
        };
        j();
        c.show = p;
        c.hide = o;
        c.destroy = q;
        c.reset = r;
        return c
    }
});
STK.register("common.feed.feedList.plugins.mood", function (a) {
    var b = a.common.feed.feedList.utils, c = a.kit.extra.language, d = a.kit.extra.codec;
    return function (e, f) {
        if (!e)a.log("forward : need object of the baseFeedList Class"); else {
            f = a.parseParam({}, f);
            var g = e.getNode(), h = {}, i, j, k, l = !1, m = !1, n = !1, o = function (b, c) {
                l = !1;
                if (!i) {
                    i = a.common.dialog.moodSmallPublish();
                    a.custEvent.add(i, "success", function (a, b) {
                    })
                } else i.reset();
                i.show()
            }, p = function (b, c) {
                n = !1;
                k = a.common.dialog.moodList({trans: a.common.trans.mood, transName: "myfiltersimp"});
                k.show()
            }, q = function (e) {
                m = !1;
                var f = e.data.mid, h = e.data.nickName, k = h + c("#L{的心情}");
                if (a.bLength(k) > 20) {
                    k = d.decode(k);
                    k = d.encode(a.leftB(k, 20)) + "..."
                }
                var l = b.getFeedNode(e.el, g), n = a.kit.dom.parseDOM(a.builder(l).list), o = n.mood_content.value, p = decodeURIComponent(e.data.mood_url), q = e.data.title || "";
                j = a.common.dialog.moodComment({mid: f, title: k, nickName: h, content: o, mood_url: p, mood_title: q});
                a.custEvent.add(i, "success", function (a, b) {
                });
                j.show()
            }, r = 0;
            e.getDEvent().add("feed_list_pulishMood", "click", function (c) {
                b.preventDefault();
                if (!r) {
                    r = 1;
                    a.common.trans.mood.getTrans("getpublishstate", {onSuccess: function (a, b) {
                        r = 0;
                        var c = parseInt(a.data.published || "0");
                        if (c) {
                            if (n)return;
                            n = !0;
                            p()
                        } else {
                            if (l)return;
                            l = !0;
                            o()
                        }
                    }, onError: function () {
                        r = 0
                    }, onFail: function () {
                        r = 0
                    }}).request()
                }
            });
            e.getDEvent().add("feed_list_shareMood", "click", function (a) {
                b.preventDefault();
                if (!m) {
                    m = !0;
                    q(a)
                }
            });
            h.destroy = function () {
                if (i) {
                    a.custEvent.remove(i);
                    i.destroy && i.destroy();
                    i = null
                }
                if (j) {
                    a.custEvent.remove(j);
                    j.destroy && j.destroy();
                    j = null
                }
                if (k) {
                    k.destroy && k.destroy();
                    k = null
                }
                k = j = i = e = g = null
            };
            return h
        }
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
STK.register("common.feed.feedList.plugins.surprise", function (a) {
    var b = a.ui.confirm, c = a.kit.extra.language, d = 3, e = 3, f = function (a) {
        return a < 7 ? c("#L{%s秒，你作弊了吧！} ", a) : a < 30 ? c("#L{恭喜，%s秒就完成了！} ", a) : a < 120 ? c("#L{用时%s秒，还可以！}", a) : c("#L{%s秒才做完，你作弊了吧！} ", a)
    };
    return function (g) {
        var h, i, j, k, l = [], m = 8, n, o = !1, p = 10, q = null;
        if (g.style.display != "none") {
            h = a.sizzle("[node-type=fl_pic_list]", g)[0];
            if (!h)return;
            i = a.sizzle("[action-type=fl_pics]", h);
            if (i.length < 8)return;
            if ("MozTransform"in document.documentElement.style || "WebkitTransform"in document.documentElement.style || "OTransform"in document.documentElement.style || "msTransform"in document.documentElement.style) {
                if (g.getAttribute("data-surprise") == "true")return;
                var r = function () {
                    var b = !0;
                    o && a.foreach(l, function (a) {
                        a.getAttribute("data-index") != a.getAttribute("data-nowindex") && (b = !1)
                    });
                    return o && b
                }, s = function (a) {
                    var b, c;
                    b = parseInt(a / d);
                    b = 85 * b;
                    c = a % d;
                    c = 85 * c;
                    return{top: b, left: c}
                }, t = function (a) {
                    return a - 1 == m && a % d != 0 || a + 1 == m && a % d != d - 1 || a - d == m || a + d == m
                }, u = function (a) {
                    var b, c;
                    b = parseInt(a / d);
                    c = a % d;
                    return b == 0 ? c == 0 ? [a + 1, a + d] : c == d - 1 ? [a - 1, a + d] : [a + 1, a - 1, a + d] : b == e - 1 ? c == 0 ? [a + 1, a - d] : c == d - 1 ? [a - 1, a - d] : [a + 1, a - 1, a - d] : c == 0 ? [a + 1, a - d, a + d] : c == d - 1 ? [a - 1, a - d, a + d] : [a + 1, a - 1, a - d, a + d]
                }, v = function () {
                    var b = a.core.arr.clear(u(m)), c = Math.floor(Math.random() * b.length), d = b[c];
                    if (d == q) {
                        b[c] = null;
                        b = a.core.arr.clear(b);
                        c = Math.floor(Math.random() * b.length);
                        d = b[c]
                    }
                    var e;
                    a.foreach(l, function (a) {
                        a.getAttribute("data-nowindex") == d && (e = a)
                    });
                    q = m;
                    w({el: e})
                }, w = function (a) {
                    var d = a.el, e = parseInt(d.getAttribute("data-nowindex"));
                    if (t(e)) {
                        var g = s(m), h = "transform:translate(" + g.left + "px," + g.top + "px)";
                        d.style.cssText += ["", "-webkit-" + h, "-moz-" + h, "-o-" + h, "-ms-" + h, h, ""].join(";");
                        d.setAttribute("data-nowindex", m);
                        m = [e, e = m][0];
                        o && !n && (n = +(new Date))
                    }
                    if (r()) {
                        var i = parseInt((+(new Date) - n) / 1e3);
                        b(f(i), {OKText: c("#L{再来一局}"), OK: z, cancelText: c("#L{不玩了...}"), cancel: A})
                    }
                }, x = function () {
                    l = [];
                    j = a.C("div");
                    j.style.cssText += ";position:relative;height:242px;";
                    a.foreach(i, function (b, c) {
                        var d = a.C("img"), e = s(c), f = "transform:translate(" + e.left + "px ," + e.top + "px)";
                        d.src = b.src;
                        d.style.cssText += ";position:absolute;height:80px;width:80px;top:0px;left:0px;-webkit-transition:-webkit-transform 0.2s ease;-moz-transition:-moz-transform 0.2s ease;-o-transition:-o-transform 0.2s ease;-ms-transition:-ms-transform 0.2s ease;transition:transform 0.2s ease;" + ["-webkit-" + f, "-moz-" + f, "-o-" + f, "-ms-" + f, f, ""].join(";");
                        j.appendChild(d);
                        if (c == 8) {
                            var f = "transform:translate(" + e.left + "px ," + (e.top + 300) + "px) rotate(30deg)";
                            d.style.cssText += "-webkit-transition:-webkit-transform 1.5s ease, opacity 1.5s ease;-moz-transition:-moz-transform 1.5s ease, opacity 1.5s ease;-o-transition:-o-transform 1.5s ease, opacity 1.5s ease;-ms-transition:-ms-transform 1.5s ease, opacity 1.5s ease;transition:transform 1.5s ease, opacity 1.5s ease;";
                            setTimeout(function () {
                                d.style.cssText += [";", "-webkit-" + f, "-moz-" + f, "-o-" + f, "-ms-" + f, f, "opacity:0", ";"].join(";");
                                setTimeout(function () {
                                }, 2e3)
                            }, 10)
                        } else {
                            d.setAttribute("action-type", "fl_surprise_item");
                            d.setAttribute("data-index", c);
                            d.setAttribute("data-nowindex", c);
                            l.push(d)
                        }
                    });
                    var b = a.C("a");
                    b.setAttribute("action-type", "fl_surprise_close");
                    b.href = "javascript:void(0);";
                    b.style.cssText += ";position:absolute;top:0px;right:0";
                    b.innerHTML = c('<font size="4" color="red">#L{退出游戏}</font>');
                    j.appendChild(b);
                    h.style.display = "none";
                    h.parentNode.appendChild(j);
                    g.setAttribute("data-surprise", "true");
                    k = a.delegatedEvent(j);
                    k.add("fl_surprise_item", "click", w);
                    k.add("fl_surprise_close", "click", A)
                }, y = function () {
                    setTimeout(function () {
                        try {
                            v();
                            --p > 0 ? y() : o = !0
                        } catch (a) {
                            A()
                        }
                    }, 300)
                }, z = function () {
                    try {
                        p = 10;
                        o = !1;
                        n = null;
                        q = null;
                        y()
                    } catch (a) {
                        A()
                    }
                }, A = function () {
                    try {
                        k && k.destroy();
                        a.removeNode(j);
                        h.style.display = "";
                        g.removeAttribute("data-surprise")
                    } catch (b) {
                    }
                };
                try {
                    x()
                } catch (B) {
                    A()
                }
                setTimeout(y, 700);
                var C = {};
                C.destroy = A;
                return C
            }
            return
        }
    }
});
STK.register("common.feed.feedList.plugins.attitudeMini", function (a) {
    return function (b) {
        var c = 3e3, d, e = a.common.trans.attitude, f = b.getNode(), g = !1, h, i = {}, j = [], k = a.common.feed.feedList.utils, l = b.getDEvent(), m, n = !0, o = [], p = {}, q, r, s, t = 600, u = 350, v = '<div class="W_layer" style="left: 670.5px; top: 2580px; display:none;" node-type="outer"> <div class="bg"><table border="0" cellspacing="0" cellpadding="0"> <tbody><tr><td> <div class="content layer_emotion" node-type="inner"><ul class="emotion_list clearfix" node-type="faceList"></ul> </div></td></tr></tbody></table><div class="arrow arrow_t"></div></div></div>';
        h = a.kit.dom.parseDOM(a.builder(v).list);
        document.body.appendChild(h.outer);
        r = a.delegatedEvent(h.outer);
        var w, x, y = {go: function (b) {
            x = b.el;
            w = parseInt(x.innerHTML.replace(/^.*\((\d+)\)$/, "$1")) || 0;
            if (a.core.dom.contains(b.el, b.evt.relatedTarget) || h && h.outer.style.display != "none" && b.data.mid == q)A(); else {
                y.stop(b, !0);
                g = !0;
                a.addEvent(window, "scroll", y.scroll);
                s = setTimeout(function () {
                    y.trans(b)
                }, t)
            }
        }, fill: function (b) {
            if (!!n) {
                n = !1;
                var c = a.core.json.merge(b.data, {location: $CONFIG.location});
                e.getTrans("miniadd", {onSuccess: function (c) {
                    w = parseInt(x.innerHTML.replace(/^.*\((\d+)\)$/, "$1")) || 0;
                    var d = a.sizzle("em", b.el)[0], e = c.data.is_del ? !0 : !1, f = "W_ico20 icon_praised_b" + (e ? "" : "c");
                    e ? w > 0 && w-- : w++;
                    b.el.innerHTML = '<em class="' + f + '"></em>(' + w + ")";
                    if (!e && c.data.html && h) {
                        m && (m.style.display = "none");
                        b.el.title = a.kit.extra.language("#L{取消赞}");
                        a.insertHTML(h.faceList, c.data.html, "afterbegin")
                    } else {
                        b.el.title = a.kit.extra.language("#L{赞}");
                        a.removeNode(a.sizzle('[uid="' + $CONFIG.uid + '"]', h.faceList)[0]);
                        m && (m.style.display = "");
                        a.sizzle("[uid]", h.faceList).length <= 0 && y.stop(b, !0)
                    }
                    var g = a.sizzle('[node-type="faceMore"]', h.faceList)[0];
                    w > 4 ? g && g.style.display == "none" && (g.style.display = "") : g && g.style.display != "none" && (g.style.display = "none");
                    n = !0
                }, onError: function (b) {
                    a.ui.alert(b.msg);
                    n = !0
                }}).request(c)
            }
        }, trans: function (b) {
            if (h && q && h.mid == q && h.mid == b.data.mid) {
                if (h.outer.style.display == "none" && a.sizzle("[uid]", h.outer).length) {
                    var c = a.position(b.el);
                    h.outer.style.display = "";
                    a.setXY(h.outer, {t: c.t + b.el.offsetHeight + 6, l: c.l + b.el.offsetWidth / 2 - 36})
                }
            } else {
                h && h.outer && (h.outer.style.display = "none");
                e.getTrans("minismall", {onSuccess: function (c) {
                    A();
                    if (!!g) {
                        w = c.data.total_number;
                        q = b.data.mid;
                        b.el && (b.el.innerHTML = b.el.innerHTML.replace(/\((.*?)\)/m, "") + (c.data.total_number ? "(" + c.data.total_number + ")" : ""));
                        if (c.data.total_number == "0")return;
                        var d = a.kit.dom.parseDOM(a.builder(c.data.html).list);
                        h.faceList.innerHTML = d.faceList.innerHTML;
                        var e = a.sizzle("[uid]", h.faceList);
                        a.sizzle('[uid="' + $CONFIG.uid + '"]', h.faceList)[0] || (m = e[3]);
                        h.mid = b.data.mid;
                        document.body.appendChild(h.outer);
                        h.outer.style.display = "";
                        var f = a.position(b.el);
                        a.setXY(h.outer, {t: f.t + b.el.offsetHeight + 6, l: f.l + b.el.offsetWidth / 2 - 36});
                        y.checkPosition(b.el)
                    }
                }, onError: function () {
                }}).request({mid: k.getMid(b.el, f), location: $CONFIG.location})
            }
        }, stop: function (a, b) {
            g = !1;
            if (b)z(); else {
                A();
                j.push(setTimeout(z, u))
            }
        }, checkPosition: function (b) {
            p = a.position(h.outer);
            clearInterval(o);
            o = setInterval(function () {
                var c = a.position(b);
                (p.l != parseInt(c.l + b.offsetWidth / 2 - 36) || p.t != parseInt(c.t + b.offsetHeight + 6)) && y.stop()
            }, 500)
        }, cancelLike: function (b) {
            a.preventDefault();
            w--;
            a.removeNode(a.core.dom.neighbor(b.el).parent("li").getCurrent());
            x.title = a.kit.extra.language("#L{赞}");
            x.innerHTML = '<em class="W_ico20 icon_praised_b"></em>(' + w + ")";
            m && (m.style.display = "");
            a.sizzle("[uid]", h.faceList).length <= 0 && (h.outer.style.display = "none");
            e.getTrans("minidel", {onSuccess: a.core.func.empty, onError: a.core.func.empty}).request(b.data)
        }, scroll: function () {
            g = !1;
            setTimeout(z, 300)
        }}, z = function () {
            clearTimeout(s);
            A();
            clearInterval(o);
            h && (h.outer.style.display = "none");
            p = undefined;
            a.removeEvent(window, "scroll", y.scroll)
        }, A = function () {
            while (j.length)clearTimeout(j.pop())
        }, B = !1, C = function (b) {
            if (!B) {
                B = !0;
                var c = a.core.json.merge(b.data, {location: $CONFIG.location});
                e.getTrans("objLike", {onSuccess: function (c) {
                    var d = c.data.is_del ? !0 : !1, e = "W_ico20 icon_praised_b" + (d ? "" : "c"), f = d ? a.kit.extra.language("#L{赞}") : a.kit.extra.language("#L{取消赞}"), g = b.el.innerHTML.match(/\>\s*(\d+)\</);
                    g = g ? parseInt(g[1] || 0) : 0;
                    d ? g-- : g++;
                    var h = g > 0 ? g : "";
                    b.data && b.data.hide_num == 1 && (h = "");
                    b.el.innerHTML = '<span class="btn_26px btn_inborder"><em class="' + e + '"></em>' + '<em class="S_link1">' + h + "</em></span>";
                    b.el.title = f;
                    B = !1
                }, onFail: function (b) {
                    a.ui.alert(b.msg);
                    B = !1
                }, onError: function (b) {
                    a.ui.alert(b.msg);
                    B = !1
                }}).request(c)
            }
        }, D = function (a) {
            d = (new Date).getTime()
        }, E = function (b) {
            var c = (new Date).getTime();
            if (!(c - d < 3e3))try {
                var e = b.el, f = a.core.dom.neighbor(e).parent("[action-type=feed_list_item]").child("[node-type=feed_list_media_prev]").finish();
                f && a.common.feed.feedList.plugins.surprise(f)
            } catch (g) {
            }
        }, F = function () {
            l.add("feed_list_like", "mouseover", y.go);
            l.add("feed_list_like", "click", y.fill);
            l.add("feed_list_like", "mousedown", D);
            l.add("feed_list_like", "mouseup", E);
            l.add("feed_list_like", "mouseout", y.stop);
            r.add("like_del", "click", y.cancelLike);
            l.add("object_like", "click", C)
        }, G = function () {
            F();
            a.addEvent(h.outer, "mouseover", function () {
                clearTimeout(j)
            });
            a.addEvent(h.outer, "mouseout", function () {
                y.stop()
            })
        };
        G();
        i.destroy = function () {
            l.remove("feed_list_like", "mouseover", y.go);
            l.remove("feed_list_like", "click", y.fill);
            l.remove("feed_list_like", "mouseout", y.stop);
            l.remove("object_like", "click", C);
            r.destroy();
            a.removeEvent(h.outer, "mouseover");
            a.removeEvent(h.outer, "mouseout")
        };
        return i
    }
});
STK.register("common.trans.setting", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("checkNick", {url: "/ajax/relation/checkNick", method: "post"});
    c("baseInfo", {url: "/ajax/relation/baseInfo", method: "post"});
    c("changeEmail", {url: "/ajax/relation/changeEmail", method: "post"});
    c("changePwd", {url: "/ajax/relation/changePwd", method: "post"});
    c("receivingInfo", {url: "/ajax/relation/receivingInfo", method: "post"});
    c("changeDomain", {url: "/ajax/settings/changedomain", method: "post"});
    c("addTags", {url: "/t4/home/_html/common/data/addTags.js", method: "post"});
    c("delTag", {url: "/t4/home/_html/common/data/delTag.js", method: "post"});
    c("tagList", {url: "/t4/home/_html/common/data/tagList.js", method: "get"});
    c("addTagsLayerSubmit", {url: "/aj/tags/addtags?_wv=5", method: "post"});
    c("medalCard", {url: "/aj/badge/card?_wv=5", method: "get"});
    c("darenCard", {url: "/aj/club/card?_wv=5", method: "get"});
    c("getDarenCard", {url: "/aj/badge/card?_wv=5", method: "get"});
    c("levelCard", {url: "/aj/user/rankdetail?_wv=5", method: "get"});
    c("creditCard", {url: "/aj/credit/card?_wv=5", method: "get"});
    c("privateSetting", {url: "/aj/account/setatmeprivacy?_wv=5", method: "post"});
    c("privateNoMore", {url: "/aj/bubble/closebubble?_wv=5", method: "get"});
    c("privateGroupInfo", {url: "/Aj/User/Setsendme?_wv=5", method: "get"});
    c("message_set", {url: "/aj/account/setmessageprivacy?_wv=5", method: "post"});
    c("comment_set", {url: "/aj/account/setcommentprivacy?_wv=5", method: "post"});
    c("removeshield", {url: "/aj/message/unblock?_wv=5", method: "post"});
    c("getshield", {url: "/aj/message/blockset?_wv=5", method: "post"});
    c("addshield", {url: "/aj/message/blockset?_wv=5", method: "post"});
    c("shieldSuggest", {url: "/aj/user/lenovosearch?_wv=5", method: "get"});
    c("shield", {url: "/aj/message/block?_wv=5", method: "post"});
    c("install", {url: "/aj/settings/plugins?_wv=5", method: "post"});
    c("getSetting", {url: "/aj/message/settingdetail?_wv=5", method: "post"});
    c("plugin", {url: "/aj/message/settings?_wv=5", method: "post"});
    c("setting", {url: "/aj/settings/privacypost?_wv=5", method: "post"});
    return b
});
STK.register("comp.guide.smartSortGuide", function (a) {
    var b = {LAYER: '<div class="W_layer" style="position: absolute; clear: both; overflow: hidden; z-index: 10003; visibility: visible; display: none;" node-type="outer"><div node-type="inner"></div></div>'};
    return function (c, d) {
        var e = a.sizzle('[node-type="smartSortSelect"]')[0];
        if (!a.isNode(e))throw"SmartSortGuide say: I need a target!";
        var f = {}, g = a.ui.mod.layer(b.LAYER), h, i, j = [], k = {}, l = 0, m = 0, n, o, p = [
            {x: -422, y: -55},
            {x: -515, y: -120},
            {x: -408, y: 24},
            {x: -435, y: 24}
        ], q = {init: function () {
            q.parseDom();
            q.bind();
            q.start()
        }, bind: function () {
            h = a.core.evt.delegatedEvent(i.inner);
            h.add("next", "click", q.next);
            h.add("close", "click", q.close);
            h.add("end", "click", q.end);
            a.custEvent.define(f, ["end", "close"])
        }, parseParam: function () {
            k = a.parseParam(k, d)
        }, parseDom: function () {
            g.html("");
            g.appendChild(c);
            i = a.kit.dom.parseDOM(a.builder(c).list);
            i.outer = g.getOuter();
            i.inner = g.getInner();
            a.setStyle(c, "display", "");
            n = a.core.dom.position(e);
            q.step.init()
        }, step: {init: function () {
            if (i.step) {
                a.isNode(i.step) && (i.step = [i.step]);
                l = i.step.length;
                a.setStyles(i.step, "display", "none")
            }
        }, start: function () {
            l > 0 && q.step.display(m)
        }, display: function (b) {
            o && a.setStyle(o, "display", "none");
            var c = i.step[b], d = a.core.dom.getSize(c);
            a.setStyle(c, "display", "");
            a.setStyle(i.outer, "width", d.width + "px");
            a.setStyle(i.outer, "height", d.height + "px");
            a.setStyle(i.outer, "top", n.t + p[b].y + "px");
            a.setStyle(i.outer, "left", n.l + p[b].x + "px");
            o = c
        }, next: function () {
            q.step.display(++m)
        }}, start: function () {
            a.contains(document.body, i.outer) || document.body.appendChild(i.outer);
            g.show();
            a.ui.mod.mask.showUnderNode(i.outer);
            q.step.start()
        }, next: function (b) {
            q.step.next();
            return a.preventDefault(b.evt)
        }, close: function (b) {
            a.ui.mod.mask.hide();
            a.custEvent.fire(f, "close");
            q.destroy();
            return a.preventDefault(b.evt)
        }, end: function (b) {
            a.ui.mod.mask.hide();
            a.custEvent.fire(f, "end");
            q.destroy();
            return a.preventDefault(b.evt)
        }, destroy: function () {
            h.destroy();
            a.custEvent.undefine(f);
            a.core.dom.removeNode(i.outer);
            f = q = h = g = p = undefined
        }};
        q.init();
        f.destroy = q.destroy;
        return f
    }
});
STK.register("common.feed.feedList.plugins.smartSort", function (a) {
    var b = a.common.feed.feedList.utils, c = a.kit.extra.language, d = {EXPENDOM: c('<a action-type="feed_list_smartCollect" href="javascript:void(0);"><span class="txt">#L{收起}</span><span class="W_arrow"><em class="up">◆</em></span></a>'), COLLECTDOM: c('<a action-type="feed_list_smartExpend" href="javascript:void(0);"><span class="txt">#L{展开}</span><span class="W_arrow"><em class="down">◆</em></span></a>')};
    return function (c) {
        if (!c)a.log("favorite : need object of the baseFeedList Class"); else {
            var e = c.getNode(), f = c.getDEvent(), g, h, i = 5, j = {init: function () {
                j.bind();
                j.accessGuideAndPlay()
            }, bind: function () {
                f.add("feed_list_smartCollect", "click", function (a) {
                    j.smartFeedToggle(a, 1)
                });
                f.add("feed_list_smartExpend", "click", function (a) {
                    j.smartFeedToggle(a, 0)
                });
                f.add("feed_list_smartSortTipClose", "click", j.smartSortTipClose);
                f.add("feed_list_goToSmart", "click", j.goToSmartSort);
                f.add("feed_list_smartSortGuide", "click", j.smartSortGuide);
                a.custEvent.add(c, "updateFeed", j.smartSortGuide)
            }, smartSortTipClose: function (a) {
                j.noDisturb(a.data);
                c.clearNewBar()
            }, goToSmartSort: function (d) {
                j.noDisturb(d.data);
                c.clearNewBar();
                a.custEvent.fire(c, "smartSort");
                return b.preventDefault(d.evt)
            }, noDisturb: function (b) {
                b.bubbletype > -1 && a.common.trans.setting.request("privateNoMore", {}, b)
            }, smartFeedToggle: function (c, f) {
                mid = b.getMid(c.el, e), feedNode = b.getFeedNode(c.el, e);
                var g = a.sizzle("[node-type='feed_list_smartTools']", feedNode)[0], h = a.sizzle("[node-type='feed_list_smartContent']", feedNode)[0];
                h && (h.style.display = f ? "none" : "");
                g && (g.innerHTML = f ? d.COLLECTDOM : d.EXPENDOM);
                return b.preventDefault(c.evt)
            }, smartSortGuide: function (b) {
                var d = a.sizzle('[node-type="smartSortGuide"]')[0], e = a.sizzle('[node-type="smartSort"]')[0];
                if (d) {
                    j.stopAccess();
                    g = a.comp.guide.smartSortGuide(d, e);
                    a.custEvent.add(g, "end", function () {
                        j.noDisturb({bubbletype: 27});
                        c.clearNewBar();
                        a.custEvent.fire(c, "smartSort")
                    });
                    a.custEvent.add(g, "deny", function () {
                        j.noDisturb({bubbletype: 27});
                        c.clearNewBar();
                        a.custEvent.fire(c, "smartBackHome")
                    });
                    a.custEvent.add(g, "close", function () {
                        j.noDisturb({bubbletype: 27});
                        c.clearNewBar()
                    })
                }
                i > 0 ? i-- : j.stopAccess()
            }, accessGuideAndPlay: function () {
                i = 5;
                j.stopAccess();
                h = setInterval(j.smartSortGuide, 2e3)
            }, stopAccess: function () {
                h && clearInterval(h)
            }, destroy: function () {
                g && g.destroy();
                j.stopAccess();
                g = j = undefined
            }};
            j.init();
            return{destroy: j.destroy}
        }
    }
});
STK.register("common.feed.feedList.plugins.forwardMerge", function (a) {
    return function (b) {
        if (!b)a.log("forwardMerge : need object of the baseFeedList Class"); else {
            var c = {}, d, e, f, g, h, i, j = b.getNode(), k = b.getDEvent(), l = a.common.feed.feedList.utils, j = b.getNode(), m = {seeAll: function (b) {
                var c = b.el, d = a.fixEvent(b.evt);
                if (d.target.tagName.toLowerCase() != "img") {
                    var e = l.getFeedNode(c, j), f = a.sizzle('[node-type="feed_list_portraitBox"]', e)[0], g = a.sizzle('[node-type="feed_list_wrapForward"]', e)[0], h = a.sizzle('[node-type="feed_list_foldForward"]', e)[0];
                    f && (f.style.display = "none");
                    h && (h.style.display = "");
                    g && (g.style.display = "")
                }
            }, foldForward: function (b) {
                var c = l.getFeedNode(b.el, j), d = a.sizzle('[node-type="feed_list_portraitBox"]', c)[0], e = a.sizzle('[node-type="feed_list_wrapForward"]', c)[0], f = a.sizzle('[node-type="followNum"]', c)[0], g = a.sizzle('[action-type="feed_list_foldForward"]', c);
                if (!!e) {
                    d && (d.style.display = "");
                    e && (e.style.display = "none");
                    g.length > 0 && (g[0].style.display = "none");
                    var h = a.sizzle('[node-type="feed_list_item_date"]', c)[0];
                    h && h.scrollIntoView()
                }
            }}, n = {init: function () {
                n.bind()
            }, bind: function () {
                k.add("feed_list_seeAll", "click", m.seeAll);
                k.add("feed_list_foldForward", "click", m.foldForward)
            }, destroy: function () {
                k.destroy()
            }};
            n.init();
            c.destroy = n.destroy;
            return c
        }
    }
});
STK.register("common.feed.feedList.plugins.activityShield", function (a) {
    var b = a.common.feed.feedList.utils, c = a.kit.extra.language, d = a.templet, e = a.common.trans.feed, f = {FRAME: '<div style="display:none;position:absolute" node-type="FSLayer" action-type="feed_list_layer" class="layer_menu_list"></div>', SHIELD: {USER: {ITEM: c('<li><a action-type="activity_list_shield_by_user" href="javascript:void(0)" suda-data="#{SUDA_DATA}" action-data="filter_type=1&uid=#{UID}&nickname=#{NICKNAME}&gender=#{GENDER}">#L{屏蔽} #{NICKNAME} #L{的微博}</a></li>'), CONFIRM: c("<span>#L{确认屏蔽}<strong> #{NICKNAME}</strong> #L{的微博吗？}</span>"), SMALLTEXT: '#L{在“我的首页”将自动屏蔽%s的新微博。}<br />#L{可以在}<a href="http://account.weibo.com/set/feed" target="_blank">#L{帐号设置-隐私设置}</a>#L{中增加或取消屏蔽。}'}, ACT_ID: {ITEM: c('<li><a action-type="activity_list_shield_by_mid" href="javascript:void(0)"  suda-data="#{SUDA_DATA}" action-data="filter_type=0&act_id=#{ACT_ID}&uid=#{UID}">#L{隐藏这条动态}</a></li>'), CONFIRM: c("<span>#L{确认屏蔽} <strong>#{NICKNAME} #L{的动态吗？}</strong></span>"), SMALLTEXT: c('#L{系统将在你的首页自动屏蔽}#{GENDER}#L{的新动态。}<br />#L{可以在}<a href="http://account.weibo.com/set/feed" target="_blank">#L{帐号设置-隐私设置}</a>中设置和取消屏蔽。}')}, APP: {ITEM: c('<li><a action-type="activity_list_shield_by_app" href="javascript:void(0)"  suda-data="#{SUDA_DATA}" action-data="filter_type=2&uid=#{UID}&nickname=#{NICKNAME}&act_id=#{ACT_ID}&appname=#{APPNAME}&gender=#{GENDER}&member_type=#{MEMBERTYPE}">#L{屏蔽来自} #{APPNAME} #L{的微博}</a></li>'), CONFIRM: c("<span>#L{确认屏蔽来自}<strong> #{APPNAME} </strong> #L{的微博吗？}</span><br />"), SMALLTEXT: c('#L{在“我的首页”将自动屏蔽来自它的新微博。}<br />#L{可以在}<a href="http://account.weibo.com/set/feedsource" target="_blank">#L{帐号设置-隐私设置}</a>#L{中取消屏蔽。}'), SMALLTEXTMEMBER: c('#L{您当前为}<a href="http://vip.weibo.com/privilege">#L{微博会员}</a>#L{，}#L{可正常使用屏蔽功能，}<br />#L{可在}<a href="http://account.weibo.com/set/feedsource" target="_blank">#L{帐号设置-隐私设置}</a>#L{中取消屏蔽。}')}}, TIPS: {USER: {USERMAX: {TITLE: c("#L{提示}"), CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{抱歉！你已经屏蔽了5人的微博，不能继续操作了。}</p><p class="S_txt2">#L{但你可以试试下面的办法}</p></dd></dl><div class="btn"><a class="W_btn_b" href="http://account.weibo.com/set/feed"><span>#L{管理我的屏蔽}</span></a><a class="W_btn_i" href="http://vip.weibo.com/paycenter"><span><img src="' + $CONFIG.imgPath + "style/images/common/transparent.gif?version=" + $CONFIG.version + '" alt="" class="ico_member">#L{立即开通会员}</span></a></div>')}, MEMBERMAX: {TITLE: c("#L{提示}"), CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{你的屏蔽数已满，等会员升级后再试吧！}</p></dd></dl><div class="btn"><a href="http://vip.weibo.com/privilege"><span>#L{了解更多会员特权}&raquo;</span></a><a action-type="iknow" class="W_btn_d" href="javascript:void(0)"><span>#L{知道了}</span></a></div>')}, MEMBERTIMEOUT: {TITLE: c("#L{提示}"), CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{抱歉！你已经屏蔽了太多人的微博，不能继续操作了。}</p><p class="S_txt2">#L{但你可以试试下面的办法}</p></dd></dl><div class="btn"><a class="W_btn_b" href="http://account.weibo.com/set/feed"><span>#L{管理我的屏蔽}</span></a><a class="W_btn_i" href="http://vip.weibo.com/paycenter"><span><img src="' + $CONFIG.imgPath + "style/images/common/transparent.gif?version=" + $CONFIG.version + '" alt="" class="ico_member">#L{立即开通会员}</span></a></div>')}}, APP: {UNABLE: {TITLE: c("#L{该来源暂时不可屏蔽哦。}"), CONTENT: c('<a href="http://weibo.com/zt/s?k=9286" target="_blank">#L{我要提建议。}</a>')}, NOPERISSION: {TITLE: c("#L{提示}"), CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{您还不是微博会员，不能使用此功能！}</p><p class="S_txt2">#L{开通}<a class="S_link2" href="http://vip.weibo.com/paycenter">#L{微博会员}</a>#L{，可屏蔽来自第三方的应用}</p><p class="S_txt2"><a href="http://vip.weibo.com/privilege"><span>#L{了解更多会员特权}&raquo;</span></a></p></dd></dl><div class="btn"><a class="W_btn_b" href="http://account.weibo.com/set/feedsource"><span>#L{管理我的屏蔽}</span></a><a class="W_btn_i" href="http://vip.weibo.com/paycenter"><span><img src="' + $CONFIG.imgPath + "style/images/common/transparent.gif?version=" + $CONFIG.version + '" alt="" class="ico_member">#L{立即开通会员}</span></a></div>')}, MEMBERTIMEOUT: {TITLE: c("#L{提示}"), CONTENT: c('<dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="S_txt1">#L{您的会员身份已过期，不能使用此功能！}</p><p class="S_txt2">#L{您可以先}<a class="S_link2" href="http://vip.weibo.com/paycenter">#L{开通会员}</a>#L{再来屏蔽第三方应用}</p></dd></dl><div class="btn"><a class="W_btn_b" href="http://account.weibo.com/set/feedsource"><span>#L{管理我的屏蔽}</span></a><a class="W_btn_i" href="http://vip.weibo.com/paycenter"><span><img src="' + $CONFIG.imgPath + "style/images/common/transparent.gif?version=" + $CONFIG.version + '" alt="" class="ico_member">#L{立即开通会员}</span></a></div>')}}}}, g, h;
    return function (i) {
        if (!i)throw"that : need object of the baseFeedList Class";
        var j, k, l = {}, m = i.getNode(), n = i.getDEvent(), o, p, q = {cache: null, dEvt: null, init: function () {
            q.cache = a.ui.dialog({isHold: !0});
            a.addClassName(q.cache.getInner(), "layer_point");
            q.dEvt = a.core.evt.delegatedEvent(q.cache.getInner());
            q.dEvt.add("iknow", "click", q.cache.hide)
        }, show: function (a) {
            q.cache.setTitle(a.title);
            q.cache.setContent(a.content);
            q.cache.show();
            q.cache.setMiddle()
        }, destroy: function () {
            q && q.dEvt && q.dEvt.destroy();
            q.cache = null;
            q = undefined
        }}, l = {create: function () {
            g = a.kit.dom.parseDOM(a.core.dom.builder(f.FRAME).list).FSLayer;
            a.sizzle("body")[0].appendChild(g);
            p = a.core.evt.delegatedEvent(g);
            p.add("activity_list_shield_by_user", "click", s.user.behavior);
            p.add("activity_list_shield_by_mid", "click", s.actId.behavior);
            p.add("activity_list_delete", "click", s.actId.my_behavior);
            p.add("activity_list_shield_by_app", "click", s.app.behavior)
        }, toggle: function (a) {
            k = a.el;
            g || l.create();
            if (h === k)if (g.style.display == "none") {
                l.show();
                l.setLayerPos()
            } else l.hide(); else {
                j = a.data;
                l.reDisplay()
            }
        }, reDisplay: function () {
            var b = [];
            for (var c in s)b.push(s[c].item());
            g.innerHTML = "<ul>" + b.join("") + "</ul>";
            b = null;
            l.setLayerPos();
            l.show();
            h && a.setStyle(h, "visibility", "");
            h = k
        }, show: function () {
            a.setStyle(k, "visibility", "visible");
            g && a.setStyle(g, "display", "");
            a.addEvent(document.body, "click", l.autoHide)
        }, hide: function () {
            a.setStyle(k, "visibility", "");
            g && a.setStyle(g, "display", "none");
            a.removeEvent(document.body, "click", l.autoHide)
        }, setLayerPos: function () {
            var b = a.core.dom.getSize(g), c = a.core.dom.getSize(k), d = a.core.dom.position(k);
            a.setStyle(g, "top", d.t + c.height + "px");
            a.setStyle(g, "left", d.l + c.width - b.width + "px")
        }, outLayer: function () {
            o && clearTimeout(o);
            o = window.setTimeout(function () {
                l.autoHide()
            }, 50)
        }, autoHide: function (b) {
            var c = a.core.evt.getEvent(), d = a.fixEvent(c);
            !a.core.dom.contains(g, d.target) && !a.core.dom.contains(k, d.target) && d.target !== k && l.hide()
        }, reflushFeedList: function () {
        }}, r = function (c, d, e) {
            var f = b.getFeedNode(d, e);
            f.style.height = f.offsetHeight + "px";
            f.style.overflow = "hidden";
            var g = a.tween(f, {duration: 200, end: function () {
                f.innerHTML = "";
                a.removeNode(f);
                e = d = f = null;
                g.destroy();
                c.getFeedCount() < 1 && window.location.reload()
            }}).play({height: 0})
        }, s = {actId: {item: function () {
            if (j.act_id) {
                var a = "", b = f.SHIELD.ACT_ID.ITEM;
                j.cuid == j.uid && (b = c("<li>" + (j.count_obj <= 1 ? '<a action-type="activity_list_delete" href="javascript:void(0)"  suda-data="" action-data="filter_type=0&act_id=#{ACT_ID}&uid=#{UID}">#L{删除这条动态}</a>' : "") + '<a target="_blank" href="http://app.weibo.com/myaction?refer=single_feed">#L{动态隐私设置}</a></li>'));
                return d(b, {ACT_ID: j.act_id, UID: j.uid})
            }
            return""
        }, behavior: function (a) {
            var b = k, c = a.data;
            c.location = $CONFIG.location;
            e.getTrans("activityShield", {onComplete: function (a) {
                s.user.handle(a, b)
            }}).request(c);
            l.hide()
        }, my_behavior: function (b) {
            var d = k, f = b.data;
            a.ui.confirm(c("#L{确认要删除这条动态吗？}"), {OK: function () {
                e.getTrans("activityDelete", {onComplete: function (a) {
                    t(a, d);
                    l.hide()
                }}).request(f)
            }})
        }, handle: function (a, b) {
            t(a, b)
        }}, user: {item: function () {
            return j.uid && j.nickname ? d(f.SHIELD.USER.ITEM, {ACT_ID: j.act_id, NICKNAME: j.nickname, GENDER: j.gender, SUDA_DATA: j.mblogsorttype == "1" ? "key=smart_feed&value=block_sbsfeed" : ""}) : ""
        }, behavior: function (b) {
            var g = b.data;
            g.location = $CONFIG.location;
            var h = k;
            a.ui.confirm(d(f.SHIELD.USER.CONFIRM, {UID: b.data.uid, NICKNAME: b.data.nickname, GENDER: b.data.gender == "m" ? "他" : "她"}), {textSmall: c(f.SHIELD.USER.SMALLTEXT, b.data.gender == "m" ? c("#L{他}") : c("#L{她}")), OK: function () {
                e.getTrans("activityShield", {onComplete: function (a) {
                    s.user.handle(a, h)
                }}).request(g)
            }})
        }, handle: function (a, b) {
            t(a, b)
        }}, app: {item: function () {
            return j.uid && j.nickname && j.mid && j.appname && j.isactive && j.isactive == "1" ? d(f.SHIELD.APP.ITEM, {UID: j.uid, NICKNAME: j.nickname, APPNAME: j.appname, ACT_ID: j.act_id, GENDER: j.gender, SUDA_DATA: j.mblogsorttype == "1" ? "key=smart_feed&value=block_appkey" : "", MEMBERTYPE: j.member_type || 0}) : ""
        }, behavior: function (b) {
            var c = k, g = b.data;
            g.location = $CONFIG.location;
            a.ui.confirm(d(f.SHIELD.APP.CONFIRM, {UID: b.data.uid, NICKNAME: b.data.nickname, APPNAME: b.data.appname, GENDER: b.data.gender == "m" ? "他" : "她"}), {textSmall: g.member_type == 1 ? f.SHIELD.APP.SMALLTEXTMEMBER : f.SHIELD.APP.SMALLTEXT, OK: function () {
                e.getTrans("activityShield", {onComplete: function (a) {
                    s.user.handle(a, c)
                }}).request(g)
            }});
            l.hide()
        }, handle: function (a, b) {
            t(a, b)
        }}}, t = function (b, c) {
            var d = "error";
            if (b.code == "100000") {
                d = "succM";
                r(i, c, m)
            } else if (b.code == "100033") {
                if (b.data && b.data.member_type > -1) {
                    var e = {title: f.TIPS.USER.USERMAX.TITLE, content: f.TIPS.USER.USERMAX.CONTENT};
                    switch (b.data.member_type) {
                        case 0:
                            break;
                        case 1:
                            e.content = f.TIPS.USER.MEMBERMAX.CONTENT;
                            break;
                        case 2:
                            e.content = f.TIPS.USER.MEMBERTIMEOUT.CONTENT;
                            break;
                        default:
                    }
                    q.show(e);
                    return
                }
            } else if (b.code == "100035") {
                if (b.data && b.data.member_type > -1) {
                    var e = {title: f.TIPS.APP.NOPERISSION.TITLE, content: f.TIPS.APP.NOPERISSION.CONTENT};
                    switch (b.data.member_type) {
                        case 0:
                            break;
                        case 1:
                            break;
                        case 2:
                            e.content = f.TIPS.APP.MEMBERTIMEOUT.CONTENT;
                            break;
                        default:
                    }
                    q.show(e);
                    return
                }
                a.ui.alert(f.TIPS.APP.UNABLE.TITLE, {type: "warn", textSmall: f.TIPS.APP.UNABLE.COCONTENT})
            } else a.ui.litePrompt(b.msg, {type: d, timeout: "1000"})
        }, u = function () {
            n.add("activity_list_shield", "click", l.toggle);
            q.init()
        };
        u();
        l.destroy = function () {
            p && p.destroy();
            q && q.destroy();
            p = q = l = undefined;
            g = null;
            h = null
        };
        return l
    }
});
STK.register("common.channel.relation", function (a) {
    var b = ["follow", "unFollow", "removeFans", "block", "unBlock", "addFriends", "removeFriends", "updateRemark"];
    return a.common.listener.define("common.channel.relation", b)
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
STK.register("common.feed.feedList.plugins.recommendFeed", function (a) {
    return function (b) {
        if (!b)a.log("recommendFeed: need object of the baseFeedList Class "); else {
            if (!b.getRecommend()[0]) {
                a.log("recommendFeed: need object of the baseFeedList Class ");
                return
            }
            var c = {}, d = a.common.dialog.setGroup(), e, f = b.getDEvent(), g, h, i, j, k, l = a.kit.extra.language, m = a.common.trans.feed, n = a.common.channel.relation, o = !1, p = {followed: l('<div node-type="followed" href="" class="W_btn_c"><span>#L{已关注}</span></div>'), layerTemp: function (a) {
                var b = '<div style="position: absolute; display:none;" node-type="closeLayer" class="layer_menu_list"><ul><li><a action-type="closeRecommendByDay" href="javascript:void(0)" action-data="code=close" suda-data="key=tblog_feed_recommend&value=close_lose' + a + '">#L{仅当天关闭}</a></li>' + "</ul>" + "</div>";
                return b
            }}, q = {create: function (b) {
                var c = "";
                b.data && b.data.suda && (c = b.data.suda);
                k = a.kit.dom.parseDOM(a.core.dom.builder(l(p.layerTemp(c))).list).closeLayer;
                document.body.appendChild(k);
                g = a.delegatedEvent(k);
                g.add("closeRecommendByDay", "click", q.closeByDay);
                g.add("closeRecommendForever", "click", q.closeForever)
            }, show: function (b) {
                b.className = "W_ico12 icon_chooseup";
                var c = a.core.dom.getSize(k), d = a.core.dom.getSize(j), e = a.core.dom.position(j);
                a.setStyle(k, "top", e.t + d.height + "px");
                a.setStyle(k, "left", e.l + d.width - c.width + "px");
                k.style.display = "";
                a.addEvent(document.body, "click", q.autoHide)
            }, hide: function (b) {
                k.style.display = "none";
                b ? b.className = "W_ico12 icon_choose" : a.sizzle('[action-type="feed_recommend_close"]', j)[0].className = "W_ico12 icon_choose";
                a.removeEvent(document.body, "click", q.autoHide)
            }, autoHide: function () {
                var b = a.core.evt.getEvent(), c = a.fixEvent(b);
                !a.core.dom.contains(k, c.target) && !a.core.dom.contains(j, c.target) && c.target !== j && q.hide()
            }, closeByDay: function (c) {
                a.preventDefault();
                q.hide();
                a.removeNode(e);
                a.custEvent.fire(b, "stopRecommendTip");
                m.getTrans("closeRecommend", {onSuccess: function () {
                }, onError: function () {
                }}).request(c.data);
                u.destroy()
            }, closeForever: function (c) {
                a.preventDefault();
                q.hide();
                a.removeNode(e);
                a.custEvent.fire(b, "stopRecommendTip");
                m.getTrans("closeRecommend", {onSuccess: function () {
                }, onError: function () {
                }}).request(c.data);
                u.destroy()
            }}, r = {follow: function (b) {
                a.preventDefault();
                var c = b.el, e = a.kit.extra.merge({onSuccessCb: function (a) {
                    d.show({uid: a.uid, fnick: a.fnick, groupList: a.group, hasRemark: !0})
                }}, b.data || {});
                e = a.common.getDiss(e, b.el);
                a.common.relation.followPrototype.follow(e)
            }, refresh: function (c) {
                a.preventDefault();
                e = b.getRecommend()[0];
                if (!o) {
                    o = !0;
                    m.getTrans("refreshRecommend", {onSuccess: function (b) {
                        e.innerHTML = a.builder(b.data.html).list.feed_list_recommend[0].innerHTML;
                        j = a.sizzle('[node-type="feed_recommend_close"]', e)[0];
                        o = !1
                    }, onError: function (a) {
                        o = !1
                    }, onFail: function (a) {
                        o = !1
                    }}).request({})
                }
            }, close: function (b) {
                a.preventDefault();
                u.build();
                k || q.create(b);
                k.style.display != "none" ? q.hide(b.el) : q.show(b.el)
            }}, s = function (b) {
                var c = a.core.dom.sizzle("[action-data*=uid=" + b + "]", e)[0];
                if (!!c)return c
            }, t = {followListener: function (b) {
                var c = s(b.uid);
                if (!!c) {
                    c.style.display = "none";
                    var d = a.kit.dom.parentElementBy(c, e, function (a) {
                        if (a.getAttribute("node-type") == "followBtn")return!0
                    });
                    a.sizzle('[node-type="followed"]', d)[0] || a.insertHTML(d, p.followed);
                    h = a.sizzle('[node-type="followed"]', d)[0];
                    a.core.dom.next(c).style.display = ""
                }
            }, unFollowListener: function (b) {
                var c = s(b.uid);
                if (!!c) {
                    h = a.sizzle('[node-type="followed"]', c.parentNode)[0];
                    h.style.display = "none";
                    c.style.display = ""
                }
            }}, u = {init: function () {
                u.build();
                u.bind();
                u.bindListener()
            }, build: function () {
                e = b.getRecommend()[0];
                j = a.sizzle('[node-type="feed_recommend_close"]', e)[0]
            }, bind: function () {
                f.add("followBtn", "click", r.follow);
                f.add("feed_recommend_fresh", "click", r.refresh);
                f.add("feed_recommend_close", "click", r.close)
            }, bindListener: function () {
                n.register("follow", t.followListener);
                n.register("unFollow", t.unFollowListener)
            }, destroy: function () {
                f.destroy();
                g.destroy();
                h = null;
                b = e = f = null;
                n.remove("follow", t.followListener);
                n.remove("unFollow", t.unFollowListener);
                n = null
            }};
            u.init();
            c.destroy = u.destroy;
            return c
        }
    }
});
STK.register("common.feed.feedList.plugins.recommendTip", function (a) {
    return function (b) {
        var c = {}, d, e = 18e4, f = a.common.trans.feed, g = a.kit.extra.language, h = b.getDEvent(), i = $CONFIG.recfeed, j = !1;
        !i && !a.core.obj.isEmpty(b.getRecommend()) && (i = 1);
        var k = {yellowHTML: g('<a node-type="feed_list_newBar" action-type="moreRecommend" class="notes" href="javascript:void(0);" suda-data="key=tblog_feed_recommend&value=yellow_banner_click">#L{你关注的人还没有新微博，我们为你推荐了一些精彩微博　点击查看}</a>')}, l = {showTip: function () {
            d && clearInterval(d);
            b.getRecommend()[0] || i && (d = setInterval(function () {
                b.removeTopNode();
                b.clearNewBar();
                var c = window.$CONFIG && $CONFIG.uid || "";
                window.WBEXP && window.WBEXP.collect && window.WBEXP.collect({uid: c}, {src: "http://rs.sinajs.cn/wgzhttj.gif"});
                a.insertHTML(b.getNode(), k.yellowHTML, "AfterBegin");
                h.add("moreRecommend", "click", l.moreRecommend);
                clearInterval(d)
            }, e))
        }, stopTip: function () {
            d && clearInterval(d)
        }, moreRecommend: function () {
            a.preventDefault();
            if (!j) {
                j = !0;
                f.getTrans("refreshRecommend", {onSuccess: function (c) {
                    b.removeTopNode();
                    b.clearNewBar();
                    c.data.html && c.data.html != "null" && a.insertHTML(b.getNode(), c.data.html, "AfterBegin");
                    h.remove("moreRecommend", "click", l.moreRecommend);
                    a.common.feed.feedList.plugins.recommendFeed(b);
                    l.showTip();
                    j = !1
                }, onError: function (a) {
                    j = !1
                }}).request({})
            }
        }};
        a.custEvent.add(b, "showRecommendTip", l.showTip);
        a.custEvent.add(b, "stopRecommendTip", l.stopTip);
        c.destroy = function () {
            h.destroy();
            a.custEvent.remove(b, "showRecommendTip", l.showTip);
            a.custEvent.remove(b, "stopRecommendTip", l.stopTip);
            d && clearInterval(d);
            a.common.feed.feedList.plugins.recommendFeed.destroy()
        };
        return c
    }
});
STK.register("common.feed.feedList.plugins.recGroupMembers", function (a) {
    var b = a.common.feed.feedList.utils;
    return function (b) {
        if (!b)a.log("quote : need object of the baseFeedList Class"); else {
            var c = {}, d, e, f, g, h = [], i, j, k, l = a.kit.extra.language, m = {suc: l("#L{已成功加入该分组}")}, n = {setCount: function () {
                h = [];
                for (var b = 0; e[b]; b++)if (e[b].checked) {
                    var c = e[b].getAttribute("action-data"), d = a.core.json.queryToJson(c);
                    h.push(d.uid)
                }
                var j = h.length;
                f.innerHTML = j;
                j == e.length ? g.checked = !0 : g.checked = !1;
                j > 0 ? a.core.dom.removeClassName(i, "W_btn_a_disable") : a.core.dom.addClassName(i, "W_btn_a_disable")
            }, getNodes: function () {
                e || (e = a.sizzle('input[action-type="selectOne"]', d));
                f || (f = a.sizzle('[node-type="count"]', d)[0] || null);
                g || (g = a.sizzle('[action-type="selectAll"]', d)[0] || null);
                i || (i = a.sizzle('[action-type="addToGroup"]', d)[0] || null);
                if (!j) {
                    var b = a.historyM ? a.historyM.parseURL() : a.core.str.parseURL(location.href), c = a.core.json.queryToJson(b.query);
                    j = c.gid || ""
                }
            }}, o = {selectOne: function (a) {
                n.getNodes();
                n.setCount()
            }, selectAll: function (a) {
                n.getNodes();
                if (g.checked)for (var b = 0; e[b]; b++)e[b].checked = !0; else for (var b = 0; e[b]; b++)e[b].checked = !1;
                n.setCount()
            }, addToGroup: function (b) {
                if (!!h[0]) {
                    var c = a.common.trans.group;
                    c.getTrans("update", {onSuccess: function (c, d) {
                        var e, f = a.ui.tipAlert({showCallback: function () {
                            e = setTimeout(function () {
                                f && f.anihide();
                                window.location.reload()
                            }, 2e3)
                        }, hideCallback: function () {
                            f && f.destroy();
                            f = null
                        }, msg: m.suc});
                        f.setLayerXY(b.el);
                        f.aniShow()
                    }, onError: function (b, c) {
                        a.ui.alert(b.msg, {})
                    }}).request({gid: '["' + j + '"]', type: "m", user: '["' + h.join('","') + '"]'})
                }
            }}, p = function () {
                k.add("selectOne", "click", o.selectOne);
                k.add("selectAll", "click", o.selectAll);
                k.add("addToGroup", "click", o.addToGroup)
            }, q = function () {
                k = b.getDEvent();
                d = b.getNode();
                nodes = b.getNodeList();
                p()
            };
            q();
            var r = function () {
                k.remove("selectOne", "click", o.selectOne);
                k.remove("selectAll", "click", o.selectAll);
                k.remove("addToGroup", "click", o.addToGroup);
                k.destroy();
                e = null;
                f = null;
                i = null;
                g = null
            };
            c.destroy = r;
            return c
        }
    }
});
STK.register("common.editor.plugin.textareaUtils", function (a) {
    var b = {}, c = document.selection;
    b.selectionStart = function (a) {
        if (!c)return a.selectionStart;
        var b = c.createRange(), d, e, f = 0, g = document.body.createTextRange();
        g.moveToElementText(a);
        for (f; g.compareEndPoints("StartToStart", b) < 0; f++)g.moveStart("character", 1);
        return f
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
STK.register("common.feed.feedList.plugins.keywordShield", function (a) {
    var b = a.common.feed.feedList.utils, c = a.kit.extra.language;
    return function (d) {
        if (!d) {
            a.log("feed区不存在");
            return!1
        }
        var e = {}, f = ["", "<#et temp data>", '<div class="W_shield_kw">', '<dl class="add_kw">', '<dt><i class="kw_tit">#L{需要屏蔽的关键词：}</i></dt>', "<dd>", '<div class="W_input W_input_default" node-type="keycontainer">', "<#if (data.blist.length)>", "<#list data.blist as bitem>", '<a class="W_btn_arrow tag_newstyle  exceed" href="javascript:void(0);" node-type="keyNode">', '<span class="S_txt1 S_func1">', '<i title="${bitem}">${bitem}</i>', '<em class="W_ico12 icon_close" action-data="key=${bitem}" href="javascript:void(0)" class="W_ico12 icon_close" action-type="deleteKey" suda-data="key=tblog_screen_keyword&value=delete_keyword"></em>', "</span></a>", "</#list>", "</#if>", "<#if (data.list.length)>", "<#list data.list as item>", '<a class="W_btn_arrow tag_newstyle ', '" href="javascript:void(0);" node-type="keyNode">', '<span class="S_txt1 S_func1">', '<i title="${item}">${item}</i>', '<em class="W_ico12 icon_close" action-data="key=${item}" href="javascript:void(0)" class="W_ico12 icon_close" action-type="deleteKey" suda-data="key=tblog_screen_keyword&value=delete_keyword"></em>', "</span></a>", "</#list>", ' &nbsp;<input type="text" node-type="input" class="flow_input S_txt2" value="#L{请输入关键词}">', "<#else>", ' &nbsp;<input type="text" style="width:275px;" value="添加关键词,最多${data.maxcount}个屏蔽词,多个关键词用空格分隔" node-type="input" class="flow_input S_txt2">', "</#if>", '<p style="display:none;" class="note S_txt2" node-type="tiptext"></p>', "</div>", '<div class="W_tips tips_error clearfix"  style="display:none;" node-type="errorTip">', "</div></dd>", "</dl>", '<div class="footer_new clearfix">', '<span class="footer_l">', '<a target="_blank" suda-uatrack="key=tblog_screen_keyword&value=more_install" href="http://account.weibo.com/set/feed" class="S_link1">#L{更多屏蔽设置}</a>', "</span>", "<span>", '<a href="javascript:void(0);" class="W_btn_d" suda-data="key=tblog_screen_keyword&value=add_keyword" action-type="addKey" node-type="addNode" href="javascript:void(0)"><span>保存</span></a>', '&nbsp;<a href="javascript:void(0);" class="W_btn_b" action-type="cannel"><span>取消</span></a>', "</span>", "</div></div>", "</#et>"].join(""), g = '<a class="W_btn_arrow tag_newstyle" href="javascript:void(0);" node-type="keyNode"><span class="S_txt1 S_func1"><i title="${item}">${item}</i><em class="W_ico12 icon_close" action-data="key=${item}" href="javascript:void(0)" class="W_ico12 icon_close" action-type="deleteKey" suda-data="key=tblog_screen_keyword&value=delete_keyword"></em></span></a>', h = {0: {messageTip: '#L{此功能为微博会员特权，请先}<a target="_blank" href="http://vip.weibo.com/paycenter?from=pbkeyword">#L{开通会员}</a>#L{再添加屏蔽关键词}  <a target="_blank" href="http://vip.weibo.com/prividesc?priv=1104">#L{了解更多信息}</a>', zeroTip: '#L{此功能为微博会员特权，请先}<a target="_blank" href="http://vip.weibo.com/paycenter?from=pbkeyword">#L{开通会员}</a>再添加屏蔽关键词<a target="_blank" href="http://vip.weibo.com/prividesc?priv=1104">#L{了解更多信息}</a>', nokeyTip: "#L{你暂时还没有添加关键词}"}, 1: {nokeyTip: '#L{你暂时还没有添加关键词，}<a href="javascript:void(0)" action-type="gotoAdd">#L{立即添加}</a>'}, 2: {nokeyTip: '#L{你暂时还没有添加关键词，}<a href="javascript:void(0)" action-type="gotoAdd">#L{立即添加}</a>'}, 3: {messageTip: '#L{此功能为微博会员特权，}<a target="_blank" href="http://vip.weibo.com/paycenter?from=pbkeyword">#L{开通会员}</a>#L{可立即屏蔽含以下关键词的微博}<a target="_blank" href="http://vip.weibo.com/prividesc?priv=1104">#L{了解更多信息}</a>', zeroTip: '#L{此功能为微博会员特权，请先}<a target="_blank" href="http://vip.weibo.com/paycenter?from=pbkeyword">#L{开通会员}</a>#L{再添加屏蔽关键词}<a target="_blank" href="http://vip.weibo.com/prividesc?priv=1104">#L{了解更多信息}</a>', nokeyTip: "#L{你还未设置关键词}"}}, i = {empty: c("#L{请输入关键词}"), "char": c("#L{关键词仅支持中英文和数字}"), tooShort: c("#L{屏蔽的关键词不可少于3个字符}"), tooLong: c("#L{屏蔽的关键词不可超过20个字符}"), has: c("#L{此关键词已存在，请重新输入}")}, j = {simple: '<p class="icon"><span class="icon_errorS"></span></p><p class="txt">#L{最多3个关键词}，<a href="http://vip.weibo.com/paycenter?from=pbkeyword">#L{升级成为年费会员}</a>#L{可添加6个关键词}</p><p class="close"><a  href="javascript:void(0);" class="W_ico12 icon_close" action-type="tipclose"></a></p>', change: '<p class="icon"><span class="icon_errorS"></span></p><p class="txt">你已变为普通会员，仅保留3个关键字<a href="http://vip.weibo.com/paycenter?from=pbkeyword">#L{开通年费会员}</a>#L{可恢复6个关键词}</p><p class="close"><a  href="javascript:void(0);" class="W_ico12 icon_close" action-type="tipclose"></a></p>', limit: '<p class="icon"><span class="icon_errorS"></span></p><p class="txt">#L{最多6个关键字，删除方可添加更多}</p><p class="close"><a  href="javascript:void(0);" class="W_ico12 icon_close" action-type="tipclose"></a></p>'}, k = a.ui.dialog({isHold: !0}), l = d.getDEvent(), m = [], n = !1, o = !1, p, q = !1, r = !1, s = !1, t = 3, u = 20, v, w, x, y = {DEvent: null, setInputValue: function (a) {
            var b = 0;
            p == "1" ? b = v : p == "2" && (b = w);
            if (a) {
                y.nodes.input.style.width = "275px";
                y.nodes.input.value = c("#L{添加关键词,最多%s个屏蔽词,多个关键词用空格分隔}").replace("%s", b)
            } else {
                y.nodes.input.style.width = "";
                y.nodes.input.value = c("#L{请输入关键词}")
            }
            y.defaultInput = y.nodes.input.value;
            y.nodes.input.blur();
            y.nodes.input.focus()
        }, init: function () {
            y.DEvent = a.delegatedEvent(k.getInner());
            y.DEvent.add("addKey", "click", y.submitAddKey);
            y.DEvent.add("deleteKey", "click", y.deleteKey);
            y.DEvent.add("cannel", "click", y.hideDiag);
            y.DEvent.add("tipclose", "click", y.tipclose)
        }, show: function (b) {
            k.setTitle(c("#L{屏蔽关键词}"));
            k.setContent(b);
            y.nodes = a.kit.dom.parseDOM(a.builder(k.getInner()).list);
            a.addEvent(y.nodes.input, "focus", y.inputFocus);
            a.addEvent(y.nodes.input, "blur", y.inputBlur);
            a.addEvent(y.nodes.input, "keyup", y.addKey);
            if (!q) {
                y.nodes.addNode.className = "W_btn_a_disable";
                y.nodes.input.disabled = "true"
            }
            k.show();
            k.setMiddle();
            y.defaultInput = a.core.str.trim(y.nodes.input.value)
        }, publishFunc: function () {
            x.hide();
            a.ui.litePrompt(c("#L{推荐成功。}"), {type: "succM", timeout: "500", hideCallback: function () {
                window.location.reload()
            }})
        }, hidePublishFunc: function () {
            window.location.reload()
        }, publishWeibo: function () {
            if (!!s) {
                s = !1;
                if (!x) {
                    x = a.common.dialog.publish({styleId: "1", picBtn: !1});
                    x.show({title: c("#L{微博会员新特权，把它推荐给你的粉丝吧~}"), content: c("#L{微博会员新特权【屏蔽关键词】，魔法般的让那些烦人的微博都消失啦，哈哈···点击了解此特权：http://vip.weibo.com/prividesc?priv=1104}")});
                    x.addExtraInfo("pic_id=90b35fa5jw1dzhhft0m93j");
                    a.custEvent.add(x, "publish", y.publishFunc);
                    a.custEvent.add(x, "hide", y.hidePublishFunc)
                }
            }
        }, tipclose: function () {
            y.nodes.errorTip.style.display = "none"
        }, hideDiag: function () {
            k.hide()
        }, showTip: function () {
            if (p == 1) {
                if (m.length >= v) {
                    y.nodes.errorTip.innerHTML = c(j.limit);
                    y.nodes.errorTip.style.display = "";
                    return!1
                }
            } else if (p == 2) {
                if (m.length <= v && m.length > t) {
                    y.nodes.errorTip.innerHTML = c(j.change);
                    y.nodes.errorTip.style.display = "";
                    return!1
                }
                if (m.length >= t) {
                    y.nodes.errorTip.innerHTML = c(j.simple);
                    y.nodes.errorTip.style.display = "";
                    return!1
                }
            }
            y.nodes.errorTip.style.display = "none";
            return!0
        }, addKey: function () {
            if (!y.showTip())y.nodes.input.value = ""; else {
                var b = a.fixEvent(), c = y.nodes.input.value;
                y.layoutTip();
                if (!q || !/[^a-zA-Z0-9\u4e00-\u9fa5]\s*/.test(c))return!1;
                var d = a.core.str.trim(y.nodes.input.value) == y.defaultInput ? [] : y.nodes.input.value.split(/\s+/g);
                d = a.core.arr.clear(d);
                var e = y.checkKeys(d, m);
                if (!r)return;
                if (n)return!1;
                n = !0;
                s = !0;
                for (var f = 0; f < d.length; f++) {
                    var h = g.replace(/\${item}/g, d[f]);
                    a.core.dom.insertHTML(y.nodes.input, h, "beforebegin")
                }
                m = m.concat(d);
                n = !1;
                y.setInputValue(0);
                y.layoutTip();
                a.preventDefault()
            }
        }, layoutTip: function () {
            var b = y.nodes.input.value, d = a.core.str.trim(y.nodes.input.value) == y.defaultInput ? [] : b.split(/\s+/g);
            d = a.core.arr.clear(d);
            var e = y.checkKeys(d, m);
            if (!r & e != "empty") {
                y.nodes.tiptext.className = "note S_txt2 S_error";
                y.nodes.tiptext.innerHTML = i[e]
            } else {
                y.nodes.tiptext.className = "note S_txt2";
                y.nodes.tiptext.innerHTML = c("#L{限3-20个字符，空格分隔}")
            }
            y.nodes.tiptext.style.display = "";
            var f = a.core.dom.position(y.nodes.input), g = a.core.dom.position(y.nodes.keycontainer);
            y.nodes.tiptext.style.left = f.l - g.l + "px";
            y.nodes.tiptext.style.top = f.t - g.t + a.core.dom.getSize(y.nodes.input).height + "px"
        }, submitAddKey: function () {
            if (!n) {
                n = !0;
                var c = {}, d = a.core.str.trim(y.nodes.input.value) == y.defaultInput ? [] : y.nodes.input.value.split(/\s+/g);
                d = a.core.arr.clear(d);
                var e = y.checkKeys(d, m);
                if (e != "empty" && !r) {
                    y.layoutTip();
                    n = !1;
                    return!1
                }
                m = m.concat(d);
                r && (s = !0);
                c.blockwords = m.join(" ");
                b.getFeedTrans("update", {onSuccess: function () {
                    r = !0;
                    k.hide();
                    s ? y.publishWeibo() : window.location.reload();
                    n = !1
                }, onError: function (b) {
                    a.ui.alert(b.msg);
                    n = !1
                }}).request(c)
            }
        }, deleteKey: function (b) {
            a.preventDefault();
            if (!n) {
                n = !0;
                var c = a.kit.dom.parentElementBy(b.el, k.getInner(), function (a) {
                    if (a.getAttribute("node-type") == "keyNode")return!0
                }), d = a.core.arr.indexOf(b.data.key, m);
                if (d == -1)return;
                m.splice(d, 1);
                c && a.removeNode(c);
                m.length || y.setInputValue(1);
                n = !1
            }
        }, inputFocus: function (b) {
            a.core.str.trim(y.nodes.input.value) == y.defaultInput && (y.nodes.input.value = "");
            y.layoutTip()
        }, inputBlur: function (b) {
            y.nodes.tiptext.style.display = "none";
            a.core.str.trim(y.nodes.input.value) == "" && (y.nodes.input.value = y.defaultInput)
        }, checkKeys: function (b, c) {
            var d = "";
            if (!b.length) {
                r = !1;
                d = "empty";
                return d
            }
            var e = {"char": function (a) {
                if (/[^a-zA-Z0-9\u4e00-\u9fa5]/.test(a))return!0
            }, tooShort: function (b) {
                if (a.core.str.bLength(b) < t)return!0
            }, tooLong: function (b) {
                if (a.core.str.bLength(b) > u)return!0
            }, has: function (b) {
                if (a.core.arr.indexOf(a.core.str.trim(b), m) != -1)return!0
            }};
            for (var f in e)for (var g = 0, h = b.length; g < h; g++)if (e[f](b[g])) {
                r = !1;
                d = f;
                return d
            }
            r = !0;
            return d
        }, destroy: function () {
            y.DEvent.destroy();
            if (x) {
                a.custEvent.remove(x, "publish", y.publishFunc);
                a.custEvent.remove(x, "hide", y.hidePublishFunc);
                x.destroy && x.destroy()
            }
            a.removeEvent(y.nodes.input, "focus", y.inputFocus);
            a.removeEvent(y.nodes.input, "blur", y.inputBlur);
            a.removeEvent(y.nodes.input, "keyup", y.addKey);
            k = null
        }}, z = function (e) {
            var f = d.getNode(), g = b.getFeeds(f, 'node-type="feed_list_shieldKeyword"')[0], h = a.core.dom.dir(g, {dir: "next", expr: '[action-type="feed_list_item"]', endpoint: b.getFeeds(f, 'node-type="feed_list_page"')[0], matchAll: !0});
            if (o) {
                h.length && a.core.arr.foreach(h, function (b, c) {
                    a.removeNode(b)
                });
                e.el.innerHTML = c("#L{查看已过滤微博}");
                o = !o
            } else {
                if (n)return!1;
                n = !0;
                b.getFeedTrans("showfiltermblogs", {onSuccess: function (b) {
                    a.insertHTML(g, b.data, "afterend");
                    o = !o;
                    e.el.innerHTML = c("#L{收起已过滤微博}");
                    n = !1
                }, onError: function () {
                    n = !1
                }}).request(e.data)
            }
            return b.preventDefault
        }, A = function () {
            if (n)return!1;
            n = !0;
            k || (k = a.ui.dialog());
            y.init();
            b.getFeedTrans("showblock", {onSuccess: function (b) {
                n = !1;
                var d = {isMember: !1, messageTip: "", zeroTip: "", nokeyTip: "", list: [], blist: [], userType: "0", maxcount: 3};
                p = b.data.is_member;
                d = a.parseParam(d, h[p]);
                if (p == "1" || p == "2")q = d.isMember = !0;
                d.userType = p;
                v = b.data.filter_year || 6;
                w = b.data.filter_normal || 3;
                p == "1" ? d.maxcount = v : p == "2" && (d.maxcount = w);
                b.data.blockwords && (d.list = b.data.blockwords.split(/\s+/g));
                b.data.unblockwords && (d.blist = b.data.unblockwords.split(/\s+/g));
                m = d.blist.concat(d.list);
                var e = c(a.core.util.easyTemplate(f, d).toString());
                y.show(e);
                m.length > 0 && y.nodes.input && y.nodes.input.focus();
                s = !1;
                n = !1
            }, onError: function () {
                n = !1
            }}).request({});
            return b.preventDefault
        };
        l.add("feed_list_shieldBar", "click", z);
        l.add("setKeyword", "click", A);
        a.custEvent.define(d, "setkeyword");
        a.custEvent.add(d, "setkeyword", A);
        e.destroy = function () {
            l.destroy();
            y.destroy();
            a.custEvent.remove(d, "setkeyword", A)
        };
        return e
    }
});
STK.register("common.dialog.orientGrpMem", function (a) {
    var b = a.kit.extra.language, c = a.common.relation.followPrototype, d = '<div class="W_layer" node-type="outer" style="display:none;position:absolute;z-index:10001"><div class="bg"><table border="0" cellspacing="0" cellpadding="0"><tr><td><div class="content" node-type="layoutContent"><div class="title" node-type="title"><span node-type="title_content"></span></div><a href="javascript:void(0);" class="W_close" title="#L{关闭}" node-type="close"></a><div node-type="inner" class="layer_group_person"></div></div></td></tr></table></div></div>';
    return function (e) {
        var f = 0, g = [], h = 1, i, j, k, l, m, n, o, p = !1, q = {}, r = function (a) {
            if (!j || !k)return!1;
            j.innerHTML = "(" + a + ")";
            a == 0 ? k.className = "W_btn_a_disable" : k.className = "W_btn_a"
        }, s = a.common.trans.group.getTrans("orientGroup", {onSuccess: function (c) {
            var d = c.data.html;
            d && m.setContent(d);
            u.initPars();
            if (p) {
                o = "#L{查看分组成员}：(" + c.data.num + "#L{人})";
                m.setTitle(b(o));
                a.custEvent.fire(q, "showDia", !0);
                p = !1
            }
        }, onError: function (c) {
            a.ui.alert(c.msg || b("#L{错误}"));
            a.custEvent.fire(q, "showDia", !1)
        }}), t = {prev: function (b) {
            a.preventDefault();
            h = h - 1;
            i.page = b.data.page;
            s.request(i)
        }, next: function (b) {
            a.preventDefault();
            h = h + 1;
            i.page = b.data.page;
            s.request(i)
        }, tab: function (b) {
            a.preventDefault();
            h = 1;
            var c = b.data;
            i.page = c.page;
            i.g_type = c.g_type;
            s.request(i)
        }, followBtnClick: function (b) {
            a.preventDefault();
            if (f == 0)return!1;
            var d = {};
            if (g.length) {
                d.uid = g.join(",");
                d.location = "all";
                d.refer_sort = "targeted-micro";
                d.refer_flag = "all";
                d.onSuccessCb = function () {
                    i.page = h;
                    s.request(i)
                };
                c.follow(d)
            }
        }, itemClick: function (b) {
            var c = b.data.uid, d = a.core.arr.indexOf(c, g);
            if (d < 0) {
                g.push(c);
                r(++f);
                b.el.className = "myfollow_list selected S_line2 SW_fun"
            } else {
                g.splice(d, 1);
                r(--f);
                b.el.className = "myfollow_list S_line2 SW_fun"
            }
        }}, u = {init: function () {
            m = a.ui.mod.dialog(b(d));
            a.kit.dom.drag(m.getDom("title"), {actObj: m, moveDom: m.getOuter()});
            q = m;
            u.bind()
        }, bind: function () {
            a.custEvent.define(q, "showDia");
            l = a.core.evt.delegatedEvent(m.getDom("outer"));
            for (var b in t)l.add(b, "click", t[b])
        }, newGroup: function (b) {
            p = !0;
            h = 1;
            i = a.parseParam({uid: "", gid: "", g_type: 0, page: 1}, b);
            s.request(i)
        }, initPars: function () {
            try {
                f = 0;
                g = [];
                n = a.builder(m.getDom("inner")).list;
                j = n.followNumNode[0];
                k = n.followBtn[0]
            } catch (b) {
            }
        }, destroy: function () {
            l && l.destroy();
            m.hide();
            m = null
        }};
        u.init();
        q.newGroup = u.newGroup;
        q.destroy = u.destroy;
        return q
    }
});
STK.register("common.feed.feedList.plugins.orientGrpMem", function (a) {
    var b = a.common.feed.feedList.utils;
    return function (c) {
        if (!c)a.log("orientGrpMem : need object of the baseFeedList Class"); else {
            var d, e, f, g, h = !1, i = function () {
                var c = g.offsetHeight, e = b.getFeedNode(g), f = d.getOuter(), h = a.position(e);
                h.l = h.l + e.offsetWidth / 2 - f.offsetWidth / 2;
                h.t = h.t + c;
                d.setPosition(h)
            }, j = {feed_list_grpMember: function (c) {
                f = b.getMid(c.el);
                g = c.el;
                if (e == f || h)return!1;
                if (!d) {
                    d = a.common.dialog.orientGrpMem();
                    d.setBeforeHideFn(function () {
                        e = undefined;
                        h = !1
                    });
                    a.custEvent.add(d, "showDia", function (a, b) {
                        if (f != e && b) {
                            d.show();
                            i();
                            e = f
                        }
                        h = !1
                    })
                }
                h = !0;
                d.newGroup(c.data);
                return b.preventDefault(c.evt)
            }}, k = {init: function () {
                k.bind()
            }, bind: function () {
                c.getDEvent().add("feed_list_grpMember", "click", j.feed_list_grpMember)
            }, destroy: function () {
                c.getDEvent().remove("feed_list_grpMember", "click", j.feed_list_grpMember);
                d && d.destroy && d.destroy()
            }};
            k.init();
            var l = {};
            l.destroy = k.destroy;
            return l
        }
    }
});
STK.register("common.feed.feedList.plugins.adFeed", function (a) {
    var b = a.common.feed.feedList.utils;
    return function (c) {
        if (!c)a.log("wbmlLoader : need object of the baseFeedList Class"); else {
            var d = {}, e = c.getNode(), f = function (c) {
                var d = b.getMid(c.el, e), f = b.getFeedNode(c.el, e), g = c.evt, h = a.core.evt.fixEvent(g).target, i = a.sizzle("[extra-data]", f);
                if (i[0]) {
                    var j = h.getAttribute("extra-data") || "", k = c.el.getAttribute("href", 4) || h.getAttribute("href", 4), l = a.core.json.queryToJson(j);
                    l.mid = d;
                    var m = f.getAttribute("data-mark") || "", n = a.queryToJson(m);
                    l = a.core.json.merge(l, n);
                    if (j) {
                        b.preventDefault(c.evt);
                        a.common.trans.feed.getTrans("setAD", {onSuccess: function () {
                            k && (window.location.href = k)
                        }, onFail: function () {
                            k && (window.location.href = k)
                        }, onError: function () {
                            k && (window.location.href = k)
                        }}).request(l);
                        return!1
                    }
                }
            };
            c.getDEvent().add("feed_list_ad", "click", f);
            d.destroy = function () {
            };
            return d
        }
    }
});
STK.register("common.feed.feedList.plugins.wbmlLoader", function (a) {
    var b = a.common.feed.feedList.utils;
    return function (b) {
        if (!b)a.log("wbmlLoader : need object of the baseFeedList Class"); else {
            var c = {}, d = b.getNode(), e = {}, f = function (b) {
                var c = b.getAttribute("wbml-data"), f = a.core.json.queryToJson(c);
                if (f.preload) {
                    mid = a.kit.dom.parentAttr(b, "mid", d);
                    mid = "repload" + mid;
                    if (e[mid])return;
                    a.common.feed.widget.clear(mid);
                    a.common.feed.widget.add(mid, b);
                    e[mid] = b
                }
            }, g = function (b, c) {
                setTimeout(function () {
                    var b = a.sizzle("[mid]", d)[0], c = a.sizzle("[wbml-data]", b)[0];
                    c && f(c)
                }, 100)
            }, h = function () {
                var b = a.core.util.scrollPos(), c = a.core.util.pageSize(), d = {scrollLeft: b.left, scrollTop: b.top, winWidth: c.win.width, winHeight: c.win.height, pageWidth: c.page.width, pageHeight: c.page.height};
                a.common.channel.window.fire("scroll", d)
            }, i = function (b, c) {
                c != "lazyload" && c != "newFeed" && (e = {});
                setTimeout(function () {
                    var b = a.sizzle("div[wbml-data]", d);
                    b = a.common.extra.lazyload(b, function (a) {
                        f(a)
                    }, {threshold: a.winSize().height});
                    h()
                }, 100)
            };
            i();
            setTimeout(function () {
                var b = a.core.util.scrollPos(), c = a.core.util.pageSize(), d = {scrollLeft: 0, scrollTop: 0, winWidth: c.win.width + b.left, winHeight: c.win.height + b.top, pageWidth: c.page.width, pageHeight: c.page.height};
                a.common.channel.window.fire("scroll", d)
            }, 300);
            a.common.channel.feed.register("forward", g);
            a.common.channel.feed.register("publish", g);
            a.custEvent.add(b, "updateFeed", i);
            c.destroy = function () {
                a.custEvent.remove(b, "updateFeed", i);
                a.common.channel.feed.remove("forward", g);
                a.common.channel.feed.remove("publish", g);
                e = null
            };
            return c
        }
    }
});
STK.register("common.feed.feedList.plugins.followbtn", function (a) {
    var b = a.kit.extra.language, c = a.common.channel.relation, d = a.common.relation.followPrototype, e = {followed: b('<a node-type="feedfollow" href="javascript:void(0)" class="W_btn_c"><span>#L{已关注}</span></a>'), unfollow: b('<a node-type="feedfollow" action-type="feedfollow" href="javascript:void(0)" class="W_btn_b"><span><em class="addicon">+</em>#L{关注}</span></a>')};
    return function (b) {
        if (!b)a.log("follow: need object of the baseFeedList Class "); else {
            var f = {}, g, h, i, j = function (b) {
                return a.sizzle("[feedfollow_uid=" + b + "]", g)
            }, k = function (b) {
                var c = a.kit.extra.merge({onSuccessCb: function (b) {
                    i = i || a.common.dialog.setGroup();
                    i.show({uid: b.uid, fnick: b.fnick, groupList: b.group, hasRemark: !0})
                }}, b.data || {});
                c = a.kit.extra.merge(c, a.queryToJson(b.el.getAttribute("data-mark") || "") || {});
                c = a.common.getDiss(c, b.el);
                d.follow(c);
                a.preventDefault()
            }, l = function (b) {
                var c = b.uid, d = j(c);
                for (var f = 0, g = d.length, h, i, k; f < g; f++) {
                    h = a.builder(e.followed).list.feedfollow[0];
                    h.setAttribute("feedfollow_uid", c);
                    h.setAttribute("action-data", d[f].getAttribute("action-data"));
                    (i = d[f].getAttribute("data-mark")) && h.setAttribute("data-mark", i);
                    (k = d[f].getAttribute("diss-data")) && h.setAttribute("diss-data", k);
                    a.replaceNode(h, d[f])
                }
            }, m = function (b) {
                var c = b.uid, d = j(c);
                for (var f = 0, g = d.length, h, i, k; f < g; f++) {
                    h = a.builder(e.unfollow).list.feedfollow[0];
                    h.setAttribute("feedfollow_uid", c);
                    h.setAttribute("action-data", d[f].getAttribute("action-data"));
                    (i = d[f].getAttribute("data-mark")) && h.setAttribute("data-mark", i);
                    (k = d[f].getAttribute("diss-data")) && h.setAttribute("diss-data", k);
                    a.replaceNode(h, d[f])
                }
            }, n = function () {
                g = b.getNode()
            }, o = function () {
                h = b.getDEvent();
                h.add("feedfollow", "click", k);
                c.register("follow", l);
                c.register("unFollow", m)
            }, p = function () {
                n();
                o()
            }, q = function () {
                i && i.destroy();
                i = null;
                h && h.destroy();
                h = null;
                c.remove("follow", l);
                c.remove("unFollow", m)
            };
            p();
            f.destroy = q;
            return f
        }
    }
});
STK.register("common.feed.feedList.plugins.translate", function (a) {
    var b = a.core.util.easyTemplate, c = a.kit.extra.language, d = a.kit.extra.toFeedText, e = a.kit.extra.textareaUtils, f = "#" + c("#L{我来翻译}") + "#", g = a.common.feed.feedList.feedTemps.translateTEMP, h = 300, i = a.common.feed.feedList.feedTemps.loadingIMG;
    return function (c) {
        var j = c.getNode(), k = c.getDEvent(), l, m = {}, n = {}, o = [], p = function (b) {
            var c = {parent: "[node-type=feed_list_reason],[node-type=feed_list_content]", translate: "[node-type=feed_translate]"}, d = a.core.dom.dir(b, {dir: "parent", expr: c.parent})[0], e = d ? a.core.dom.dir(d, {dir: "next", expr: c.translate})[0] : null;
            return{parent: d, translate: e}
        }, q = function (b, c) {
            c = c || {};
            var d = c.callback || a.funcEmpty, e = c.text || "";
            if (n[b])d(n[b].translated); else {
                var f = a.common.trans.feed.getTrans("translate", {onSuccess: function (a) {
                    var c = a.data;
                    n[b] = {prev: e, translated: c};
                    d(c)
                }, onError: function (a) {
                    var b = a.msg;
                    b && d(b)
                }});
                f.request({text: e})
            }
        }, r = function (a, b) {
            if (a.type != "mouseout" && a.type != "mouseover")return!1;
            var c = a.relatedTarget ? a.relatedTarget : a.type == "mouseout" ? a.toElement : a.fromElement;
            while (c && c != b)c = c.parentNode;
            return c != b
        }, s, t = function (b) {
            clearTimeout(s);
            s = setTimeout(function () {
                var c = p(b.el), d = c.translate;
                d && a.custEvent.fire(d, "hide")
            }, h)
        }, u = function (c) {
            clearTimeout(s);
            s = setTimeout(function () {
                var e = c.data, f = c.el, j = p(c.el), k = j.translate;
                if (!k) {
                    var l = {text: i, bymedata: a.jsonToQuery(c.data)}, m = a.builder(b(g, l).toString()).list, n = m.translate_rs[0], k = m.feed_translate[0], t;
                    while (t = o.shift())t.parentNode && a.custEvent.fire(t, "hide");
                    o.push(k);
                    var u = function (a) {
                        a = a || window.event;
                        r(a, k) && clearTimeout(s)
                    }, v = function (b) {
                        b = b || window.event;
                        if (r(b, k)) {
                            clearTimeout(s);
                            s = setTimeout(function () {
                                k && a.custEvent.fire(k, "hide")
                            }, h)
                        }
                    }, w = function (b) {
                        var c = b.obj;
                        if (c) {
                            a.removeNode(c);
                            a.custEvent.remove(c, "hide", w);
                            a.custEvent.undefine(c, "hide");
                            a.removeEvent(c, "mouseout", v);
                            a.removeEvent(c, "mouseover", u)
                        }
                    };
                    a.custEvent.define(k, "hide");
                    a.custEvent.add(k, "hide", w);
                    a.addEvent(k, "mouseout", v);
                    a.addEvent(k, "mouseover", u);
                    a.insertAfter(k, j.parent);
                    q(e.mid, {text: a.decodeHTML(d(j.parent.innerHTML)), callback: function (a) {
                        n.innerHTML = a
                    }});
                    try {
                        window.SUDA && SUDA.uaTrack && SUDA.uaTrack("tblog_bowen_translate", "click_translate")
                    } catch (x) {
                    }
                }
            }, h)
        }, v = function (b) {
            var c = a.core.dom.dir(b.el, {dir: "parent", expr: "[node-type=feed_translate]"})[0];
            c && a.custEvent.fire(c, "hide")
        }, w = function (b) {
            var c = b.data, d, g, h = 1;
            !l && (l = a.common.dialog.forward());
            l.show(c.mid, {originNick: c.originnick, origin: n[c.mid].prev, url: c.url, reason: f, type: h});
            if (d = l.publisher) {
                d = d.instances[h].client;
                (g = a.sizzle("[node-type=textEl]", d)[0]) && e.setCursor(g)
            }
        }, x = function () {
            k.add("feed_translate", "mouseover", u);
            k.add("feed_translate", "mouseout", t);
            k.add("feed_translate_close", "click", v);
            k.add("feed_translate_by_me", "click", w)
        }, y = function () {
            var b;
            while (b = o.shift())b.parentNode && a.custEvent.fire(b, "hide");
            k.add("feed_translate", "mouseover", u);
            k.add("feed_translate", "mouseout", t);
            k.remove("feed_translate_close", "click", v);
            k.remove("feed_translate_by_me", "click", w)
        };
        x();
        m.destroy = y;
        return m
    }
});
STK.register("common.feed.feedList.plugins.jumpurl", function (a) {
    return function (b) {
        if (!b)a.log("quote : need object of the baseFeedList Class"); else {
            var c = function (a, b) {
                return a == b || a == document.body || !a ? !1 : a.tagName.toUpperCase() == "A" ? !0 : c(a.parentNode, b)
            }, d = function (a) {
                var b = a.evt, d = a.el, e = a.data, f = decodeURIComponent(e.url), g = e.target;
                c(b.target, a.el) || (g == "_blank" ? window.open(f) : location.href = f)
            }, e = function (a) {
                a.data.short_url && window.open(a.data.short_url)
            }, f = b.getDEvent();
            f.add("fl_jumpurl", "click", d);
            f.add("fl_objjumpurl", "click", e);
            var g = {};
            g.destroy = function () {
                f.destroy()
            };
            return g
        }
    }
});
STK.register("common.trans.photoview", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("list", {url: "/aj/photo/popview", method: "get"});
    c("bloginfo", {url: "/aj/mblog/photolayer", method: "get"});
    c("poprecomalbum", {url: "/aj/photo/poprecomalbum", method: "get"});
    c("commentList", {url: "/aj/comment/big?_wv=5", method: "get"});
    c("forwardList", {url: "/aj/mblog/info/big?_wv=5", method: "get"});
    c("toMicroblog", {url: "/aj/mblog/forward?_wv=5", method: "post"});
    return b
});
STK.register("lib.photoview.source.util", function (a) {
    var b = a.foreach, c = a.setStyle;
    return{mix: function (a, b) {
        for (var c in b)b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    }, throttle: function (a, b) {
        b = b ? b : 150;
        if (b === -1)return function () {
            a.apply(this, arguments)
        };
        var c;
        return function () {
            var d = +(new Date);
            if (!c || d - c > b) {
                c = d;
                a.apply(this, arguments)
            }
        }
    }, debounce: function (a, b, c, d) {
        var e;
        return function () {
            var f = d || this, g = arguments, h = function () {
                e = null;
                c || a.apply(f, g)
            }, i = c && !e;
            clearTimeout(e);
            e = setTimeout(h, b);
            i && a.apply(f, g)
        }
    }, empty: function (a) {
        var b;
        if (a)while (b = a.firstChild)a.removeChild(b)
    }, setStyles: function (a, d) {
        b(d, function (b, d) {
            c(a, d, b)
        })
    }}
});
STK.register("lib.photoview.source.channel", function (a) {
    var b = ["like", "likeChanged", "commentCount", "forwordCount", "fakeForwordData"];
    return a.common.listener.define("lib.photoview.source.channel", b)
});
STK.register("lib.photoview.source.mask", function (a) {
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
STK.register("lib.photoview.source.eventemiter", function (a) {
    var b = a.custEvent, c = function (a, b) {
        for (var c in b)b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    }, d = function (b, c) {
        return b && a.core.arr.indexOf(c, b) !== -1
    }, e = Object.create || function (a) {
        function b() {
        }

        b.prototype = a;
        return new b
    }, f = function (a, b, d) {
        var f = e(b.prototype);
        a.prototype = f;
        f.constructor = a;
        c(f, d);
        return a
    }, g = function (a) {
        this.addEvents(a)
    };
    g.prototype = {addEvents: function (c) {
        if (!!c && !!c.length) {
            a.isArray(c) || (c = [].concat(c));
            b.define(this, c);
            this._events = (this._events || []).concat(c);
            return this
        }
    }, removeEvents: function () {
        b.remove(this);
        b.undefine(this);
        this._events = []
    }, on: function (a, c, e) {
        d(this._events, a) || this.addEvents(a);
        b.add(this, a, c, e);
        return this
    }, un: function (a, c) {
        b.remove(this, a, c);
        return this
    }, once: function (a, c) {
        d(this._events, a) || this.addEvents(a);
        b.once(this, a, c);
        return this
    }, fire: function (a, c) {
        b.fire(this, a, c);
        return this
    }};
    g.extend = function (a, b) {
        var d = typeof a;
        if (d === "function")return f(a, g, b);
        if (d === "object") {
            b = a;
            var e = new g(b.events);
            c(e, b);
            return e
        }
        return a
    };
    return g
});
STK.register("lib.photoview.source.overlayer", function (a) {
    function C(a) {
        a[1] === undefined && (a[1] = a[0]);
        a[2] === undefined && (a[2] = a[0]);
        a[3] === undefined && (a[3] = a[1]);
        return a
    }

    function B(c, d) {
        d = d || b;
        var e = A(c), f = A(d), g = (f.width - e.width) / 2, h = (f.height - e.height) / 2;
        d === b && a.getStyle(c, "position") !== "fixed" && (h += a.scrollPos().top);
        c.style.top = (h > 0 ? h : 0) + "px";
        c.style.left = (g > 0 ? g : 0) + "px"
    }

    function A(a) {
        if (a === b)return r();
        var c, d, e = a.style;
        if (e.display == "none") {
            e.visibility = "hidden";
            e.display = "";
            c = a.offsetWidth;
            d = a.offsetHeight;
            e.display = "none";
            e.visibility = "visible"
        } else {
            c = a.offsetWidth;
            d = a.offsetHeight
        }
        c += y(a, "marginLeft") + y(a, "marginRight");
        d += y(a, "marginTop") + y(a, "marginBottom");
        return{width: c, height: d}
    }

    function z(a, b) {
        switch (b) {
            case"height":
                return y(a, "marginTop") + y(a, "marginBottom") + y(a, "paddingTop") + y(a, "paddingBottom") + y(a, "borderTopWidth") + y(a, "borderBottomWidth");
            case"width":
                return y(a, "marginLeft") + y(a, "marginRight") + y(a, "paddingLeft") + y(a, "paddingRight") + y(a, "borderLeftWidth") + y(a, "borderRightWidth");
            default:
        }
        return y(a, b)
    }

    function y(b, c) {
        var d = parseInt(a.getStyle(b, c), 10);
        return isNaN(d) ? 0 : d
    }

    function x(a, b) {
        return a < b ? a : b
    }

    function w(a, b) {
        return a > b ? a : b
    }

    var b = window, c = document, d = document.documentElement, e = a.addEvent, f = a.removeEvent, g = a.core.util.easyTemplate, h = a.kit.extra.language, i = a.core.dom, j = a.core.evt, k = j.custEvent, l = a.lib.photoview.source, m = l.eventemiter, n = l.util.debounce, o = l.mask, p = STK.core.util.browser, q = navigator.userAgent.indexOf("Mac OS X") > -1 ? 0 : 17, r = a.winSize, s = a.foreach, t = a.core.json.merge, u = function (b, c) {
        s(c, function (c, d) {
            a.setStyle(b, d, c)
        })
    }, v = function () {
        if (v.value !== undefined)return v.value;
        var a = document.createElement("div"), b = a.cloneNode(!1), c = !1, e = document.body || function () {
            c = !0;
            return d.appendChild(document.createElement("body"))
        }();
        a.style.cssText = "position:fixed;top:42px";
        e.appendChild(a);
        e.appendChild(b);
        var f = a.offsetTop !== b.offsetTop;
        e.removeChild(a);
        e.removeChild(b);
        c && d.removeChild(e);
        v.value = f;
        return f
    }, D = ["show", "hide", "beforeHide", "resize"], E = m.extend(function (c, i) {
        if (!(this instanceof E))return new E(c, i);
        var j = this;
        m.call(j, D);
        var k = r(), l = k.width, s = k.height;
        i = t({limits: {maxWidth: l, maxHeight: s, minWidth: l / 2, minHeight: s / 2}, offset: [0, 0], style: {zIndex: 999, position: "absolute"}, pid: "", mid: "", pic_objects: ""}, i, {isDeep: !0});
        C(i.offset);
        var u = decodeURIComponent(i.pic_objects);
        u = u.split(",");
        var v = [], w = [], x = [], y = [];
        for (var z = 0, A = u.length; z < A; z++) {
            var B = u[z];
            B = B.split("|");
            v.push(B[0]);
            w.push(B[1]);
            x.push(B[2]);
            y.push(B[3])
        }
        var F = 0;
        for (var G = 0, H = v.length; G < H; G++)if (v[G] == i.pid) {
            F = G;
            break
        }
        var I = a.ui.mod.layer(h(g(c, {is_liked: +w[F], count: x[F] || 0, object_id: y[F], mid: i.mid, pid: v[F] || i.pid}).toString()));
        j._layer = I;
        j._node = I.getOuter();
        j.hidden = !0;
        j.get = function (a) {
            return i[a]
        };
        j.set = function (a, b) {
            i[a] = b
        };
        I.hide();
        var J = n(function () {
            j.resize()
        }, 50), K = d.style, L = 0, M = function () {
            var b = a.scrollPos(), c = b.left, d = b.top;
            L = d;
            K.overflow = "hidden";
            p.MOZ && p.Version < 20 && (K.marginTop = 0 - d + "px");
            K.paddingRight = q + "px"
        }, N = function () {
            K.overflow = "";
            K.marginTop = "0px";
            K.marginRight = "0px";
            b.scrollTo(0, L)
        }, O = function () {
            j.hide()
        };
        j.on("show", function () {
            M();
            o.showUnderNode(j._node, {opacity: .75});
            o.resetSize();
            e(b, "resize", J);
            a.hotKey.add(d, ["esc"], O, {type: "keyup"})
        });
        j.on("hide", function () {
            a.hotKey.remove(d, ["esc"], O, {type: "keyup"});
            o.back();
            f(b, "resize", J);
            N();
            var c = o.getNode();
            a.setStyle(c, "opacity", .3);
            o.resetSize()
        });
        j._initEvts()
    }, {hidden: !0, _initEvts: function () {
        var b = this, c = b._node, d = j.delegatedEvent(c);
        b._delegate = d;
        d.add("close", "click", function (c) {
            b.hide();
            a.stopEvent(c.evt);
            return!1
        });
        var g = function (c) {
            c = a.fixEvent(c);
            var d = b.getDom("box"), e = c.target;
            d !== e && !a.contains(d, e) && a.contains(document.body, e) && b.hide()
        };
        e(c, "click", g);
        b.once("destroy", function () {
            f(c, "click", g)
        })
    }, _initUI: function () {
        var a = this._node, b = this.get("style");
        b.position = v() ? "fixed" : "absolute";
        u(a, b)
    }, _rendered: !1, _render: function () {
        var a = c.body, b = this._node;
        i.contains(a, b) || a.appendChild(b);
        this._initUI();
        this._rendered = !0
    }, getOuter: function () {
        return this._node
    }, getDom: function (a) {
        return this._layer.getDom(a)
    }, getDelegate: function () {
        return this._delegate
    }, getOffset: function (a) {
        var b = this.get("offset");
        return a === "x" ? b[1] + b[3] : b[0] + b[2]
    }, setSize: function (a, b) {
        var c = this, d = c._node, e = c.getDom("box");
        u(e, {position: "absolute", width: a + "px", height: b + "px"});
        B(e, d);
        c.set("size", [a, b]);
        c.fire("resize", {width: a, height: b})
    }, resize: function () {
        var a = this;
        if (!a._resizing) {
            var b = a.get("limits"), c = a._node, d = a.getDom("box"), e = r();
            u(c, {overflow: "auto", width: e.width + "px", height: e.height + "px"});
            B(c);
            var f = e.width - a.getOffset("x"), g = e.height - a.getOffset("y");
            f -= z(d, "width");
            g -= z(d, "height");
            f = w(x(f, b.maxWidth), b.minWidth);
            g = w(x(g, b.maxHeight), b.minHeight);
            a.set("screen", [f, g]);
            a._resizing = !0;
            a.setSize(f, g);
            a._resizing = !1;
            return a
        }
    }, show: function () {
        var a = this;
        if (a.hidden) {
            var b = c.body, d = a._node;
            i.contains(b, d) || b.appendChild(d);
            a._rendered || a._render();
            a._layer.show();
            a.fire("show");
            a.resize();
            a.hidden = !1
        }
        return a
    }, hide: function () {
        var a = this;
        if (!a.hidden && a.fire("beforeHide") !== !1) {
            a._layer.hide();
            a.fire("hide");
            a.hidden = !0;
            i.removeNode(a._node)
        }
        return a
    }, destroy: function () {
        var a = this, b = a._layer;
        a.hidden || a.hide();
        a.fire("destroy");
        a.removeEvents();
        a._delegate.destroy();
        k.undefine(b);
        k.remove(b);
        a._layer = null;
        a._node = null
    }});
    return E
});
STK.register("lib.photoview.source.imagedisplay", function (a) {
    var b = window.document, c = window.setTimeout, d = $CONFIG.imgPath + "/style/images/common/loading.gif", e = "about:blank", f = a.lib.photoview.source, g = f.eventemiter, h = f.util, i = a.kit.dom.parseDOM, j = a.insertHTML, k = a.addEvent, l = a.foreach, m = a.setStyle, n = a.removeEvent, o = 37, p = 38, q = 39, r = 40, s = "left", t = "right", u = function (b, c, d, e, f) {
        if (typeof e == "function") {
            f = e;
            e = null
        }
        a.tween(b, {duration: d, animationType: e || "easeoutcubic", end: f}).play(c).destroy()
    }, v = h.throttle, w = h.debounce, x = h.setStyles, y = function (a) {
        a.style.display = "block"
    }, z = function (a) {
        a.style.display = "none"
    }, A = function (a, c) {
        var d = b.createElement("IMG");
        c && (d.onload = c);
        d.src = a || e;
        d.setAttribute("hidefocus", !0);
        return d
    }, B = function () {
        var a = A(d, function () {
            x(a, {position: "absolute", top: "50%", left: "50%", marginTop: -1 * (a.height / 2) + "px", marginLeft: -1 * (a.width / 2) + "px"});
            a.onload = null
        });
        return a
    }, C = function (c) {
        var d = c.relatedTarget, e = c.fromElement;
        if (!d || e && e === c.target) {
            d = c.toElement || e;
            c.relatedTarget = d
        }
        return d == null ? !0 : d ? d !== this && d.prefix !== "xul" && this !== b && !a.contains(this, d) : !1
    }, D = function (d, f) {
        var h, k, n = "", D, E, F, G, H, I, J = "", K = "", L = !1, M = function (c) {
            var d = i(a.builder(c).list);
            h = c;
            k = d.loader || j(c, "<div></div>");
            n = k.className;
            k.setAttribute("tabIndex", -1);
            k.setAttribute("hidefocus", !0);
            k.onselectstart = function () {
                return!1
            };
            k.ondblclick = function () {
                var a = b.selection;
                a ? a.empty() : window.getSelection().removeAllRanges();
                return!1
            };
            x(k, {position: "relative", outline: "none", "-moz-user-select": "none", "-webkit-user-select": "none"});
            D = k.appendChild(A());
            E = k.appendChild(A());
            F = k.appendChild(B());
            l([D, E, F], z)
        }, N = function (c) {
            var d = a[c ? "addEvent" : "removeEvent"];
            d(k, "click", S);
            d(h, "mousemove", S);
            d(h, "mouseout", S);
            d(h, "mouseover", S);
            d(b, "keydown", S)
        }, O = function () {
            if (!L) {
                L = !0;
                N(!0);
                _.fire("show")
            }
        }, P = function () {
            if (L) {
                L = !1;
                l([D, E, F], z);
                K = e;
                D.src = e;
                E.src = e;
                N(!1);
                _.fire("hide")
            }
        }, Q = v(function (b) {
            var c = "", d = G, e = a.position(h), f = b.pageX - e.l, g = b.pageY - e.t;
            f < d * .5 ? c = s : f >= d * .5 && (c = t);
            if (c !== J) {
                J = c;
                k.className = [n, c + "cursor"].join(" ")
            }
            _.fire("mousemove", {x: f, y: g, event: b})
        }, 10), R = v(function (a) {
            _.fire("navigate", {dir: a})
        }, 400), S = function (c) {
            var d = c.type;
            c = a.fixEvent(c);
            switch (d) {
                case"mousemove":
                    Q(c);
                    break;
                case"mouseover":
                case"mouseout":
                    C.call(h, c) && _.fire(d, c);
                    break;
                case"click":
                    J && R(J);
                    break;
                case"keydown":
                case"keypress":
                    var e = c.target;
                    if (b.body !== e && (/TEXTAREA|SELECT/.test(e.nodeName.toUpperCase()) || e.type === "text"))return;
                    a.stopEvent(c);
                    var g = c.which || c.keyCode || c.charCode, i = "";
                    switch (g) {
                        case 72:
                        case p:
                            f.scrollTop -= 50;
                            break;
                        case r:
                            f.scrollTop += 50;
                            break;
                        case o:
                            i = s;
                            break;
                        case 76:
                        case q:
                            i = t
                    }
                    i && R(i)
            }
        }, T = function (a, b, c) {
            var d = a.width, e = a.height, f = d / e;
            if (d > 0 && e > 0)if (f >= b / c) {
                if (d > b) {
                    d = b;
                    e = d / f
                }
            } else if (e > c) {
                e = c;
                d = e * f
            }
            return{width: d, height: e}
        }, U = function () {
            var a = D;
            x(a, {position: "absolute", top: "50%", left: "50%", marginLeft: a.width / -2 + "px", marginTop: a.height / -2 + "px"})
        }, V = function () {
            if (!!I) {
                var a = D, b = T(I, G, H);
                a.width = b.width;
                a.height = b.height;
                U()
            }
        }, W = 300, X = null, Y = function () {
            Z();
            X = c(function () {
                y(F)
            }, W)
        }, Z = function () {
            var a = X;
            if (a) {
                clearTimeout(a);
                X = null
            }
            z(F)
        };
        M(d);
        var _ = g.extend({events: ["navigate", "mousemove", "mouseover", "mouseout"], getOuter: function () {
            return h
        }, load: w(function (b, d) {
            if (!b || b !== K) {
                L ? K !== e && y(D) : O();
                Y();
                K = b;
                var f = new Image, g = function (e) {
                    var h = f.width, i = f.height;
                    f = g = f.onload = f.onerror = null;
                    if (e === "error") {
                        if (d) {
                            d();
                            d = null
                        }
                    } else c(function () {
                        if (K !== b)d = null; else {
                            I = {width: h, height: i};
                            var c = E;
                            E = D;
                            D = c;
                            m(D, "opacity", 0);
                            y(D);
                            a.insertAfter(E, D);
                            if (d) {
                                d();
                                d = null
                            }
                            _.fire("load", {src: b, width: h, height: i});
                            D.src = b;
                            V();
                            u(E, {opacity: .1}, 200, function () {
                                z(E);
                                m(E, "opacity", 0)
                            });
                            u(D, {opacity: 1}, 150, function () {
                                Z()
                            })
                        }
                    }, 1)
                };
                f.onload = function () {
                    g("load")
                };
                f.onerror = function () {
                    g("error")
                };
                f.src = b
            }
        }, 10), resize: function (a, b) {
            if (a !== G || b !== H) {
                G = a;
                H = b;
                x(k, {width: a + "px", height: b + "px"});
                V()
            }
        }, show: O, hide: P, destroy: function () {
            _.hide();
            _.fire("destroy");
            _.removeEvents();
            D = null;
            k = null;
            E = null
        }});
        return _
    };
    return D
});
STK.register("lib.photoview.source.carousel", function (a) {
    function V() {
        var a = this, b = a.get("numItems");
        if (!!b && !a.isAnimating()) {
            var c = a._carouselEl, d = a.get("firstVisible"), e = a.get("numVisible"), f = d + e - 1;
            f = f > b - 1 ? b - 1 : f;
            var g = a._items, h = g[d].el, i = g[f].el, j;
            if (i)while (j = p(i))c.removeChild(j);
            if (h)while (j = o(h))c.removeChild(j);
            c.style.left = "0px";
            a.flush()
        }
    }

    function U(a, b, c) {
        var d = this, e = d.get("numVisible"), f = d._selectedItem;
        d.get("selectOnScroll") && d.get("selectedItem") !== f && d.setSelectedItem(f);
        d.fire("afterScroll", {dir: c, first: d.get("firstVisible"), last: b})
    }

    function T(a, b) {
        var c = this, d = c.get("CLASSES"), e, f = c._items, g = c.get("numItems"), h = c.get("numVisible"), i = c.get("firstVisible"), l = b, m = i + h - 1, n, o = d.SELECTED_ITEM;
        if (i + h > g - 1) {
            m = g - 1;
            i = D(m - h, 0);
            c.set("firstItem", i)
        }
        isNaN(a) && (a = i);
        if (l !== a) {
            if (l >= 0 && l < g) {
                n = f[l];
                n && (e = n.el) && k(e, o)
            }
            if (f[a]) {
                var p = f[a].status === X;
                if (g > h) {
                    var q = ~~(h / 2), r = a - q;
                    r < 0 && (r = 0);
                    g - r < h && (r = D(g - h, 0));
                    (!p || r !== i) && c.scrollTo(r)
                } else {
                    p || c.scrollTo(a);
                    (a < i || a > m) && c.scrollTo(a)
                }
                (e = f[a].el) && setTimeout(function () {
                    e && a === c._selectedItem && j(e, o)
                }, 200)
            }
        }
    }

    function S() {
        var a = !1, b = this, c = b.get("CLASSES"), d = c.PREV_DISABLED, e = c.NEXT_DISABLED, f, g, l = b.get("numItems"), m = b.get("firstVisible");
        if (!!b._rendered) {
            f = b.get("navigation");
            if (g = f.prev) {
                var n = b.get("prevStateFn");
                if (!n()) {
                    i(g, "click", b.get("pcFn"));
                    j(g, d);
                    b._prevEnabled = !1
                } else a = !b._prevEnabled;
                if (a) {
                    h(g, "click", b.get("pcFn"));
                    k(g, d);
                    b._prevEnabled = !0
                }
            }
            a = !1;
            if (g = f.next) {
                var o = b.get("nextStateFn");
                if (!o()) {
                    i(g, "click", b.get("ncFn"));
                    j(g, e);
                    b._nextEnabled = !1
                } else a = !b._nextEnabled;
                if (a) {
                    h(g, "click", b.get("ncFn"));
                    k(g, e);
                    b._nextEnabled = !0
                }
            }
        }
    }

    function R(a) {
        var b = this, c = 0, d = 0, e = "width";
        c = b._itemSize || Q.call(b, e);
        d = c * a;
        return d
    }

    function Q(a, b) {
        var c = this, d, e = 0, f = !1;
        d = b || q(c._carouselEl);
        if (!d)return 0;
        f = a === "height";
        e = L(d, f ? "height" : "width");
        return e
    }

    function P(a, b) {
        var c = document.createElement(a);
        b = b || {};
        b.className && j(c, b.className);
        b.styles && v(c, b.styles);
        b.parent && b.parent.appendChild(c);
        b.id && c.setAttribute("id", b.id);
        b.html && (b.html.nodeName ? c.appendChild(b.html) : c.innerHTML = b.html);
        return c
    }

    function O(a, b) {
        var c = N(a);
        r(a, "width", b - c + "px")
    }

    function N(b) {
        return L(b, "width") - parseInt(a.getStyle(b, "width"))
    }

    function M(a, b) {
        switch (b) {
            case"height":
                return L(a, "marginTop") + L(a, "marginBottom") + L(a, "paddingTop") + L(a, "paddingBottom") + L(a, "borderTopWidth") + L(a, "borderBottomWidth");
            case"width":
                return L(a, "marginLeft") + L(a, "marginRight") + L(a, "paddingLeft") + L(a, "paddingRight") + L(a, "borderLeftWidth") + L(a, "borderRightWidth");
            default:
        }
        return L(a, b)
    }

    function L(b, c, d) {
        function g(b, c) {
            var d = parseFloat(a.getStyle(b, c));
            return isNaN(d) ? 0 : d
        }

        function f(b, c) {
            var d = parseInt(a.getStyle(b, c), 10);
            return isNaN(d) ? 0 : d
        }

        var e;
        if (!b)return 0;
        typeof d == "undefined" && (d = "int");
        switch (c) {
            case"height":
                e = b.offsetHeight;
                e > 0 ? e += f(b, "marginTop") + f(b, "marginBottom") : e = g(b, "height") + f(b, "marginTop") + f(b, "marginBottom") + f(b, "borderTopWidth") + f(b, "borderBottomWidth") + f(b, "paddingTop") + f(b, "paddingBottom");
                break;
            case"width":
                e = b.offsetWidth;
                e > 0 ? e += f(b, "marginLeft") + f(b, "marginRight") : e = g(b, "width") + f(b, "marginLeft") + f(b, "marginRight") + f(b, "borderLeftWidth") + f(b, "borderRightWidth") + f(b, "paddingLeft") + f(b, "paddingRight");
                break;
            default:
                d === "int" ? e = f(b, c) : d === "float" ? e = g(b, c) : e = a.getStyle(b, c)
        }
        return e
    }

    function K(a, b) {
        return(a = String(a)) ? a.replace(J, function (a) {
            var c = a.length, d = a.substring(1, c - 1), e = b[d];
            return e === undefined ? a : e
        }) : a
    }

    function I(a, b) {
        var c = a.length;
        while (c--)if (b(a[c]))return c;
        return-1
    }

    function H(b, c) {
        var d = a.core.arr.indexOf(c, b);
        d !== -1 && b.splice(d, 1);
        return d
    }

    function G(a, b) {
        if (a.filter)return a.filter(b);
        var c = [];
        for (var d = 0, e = -1, f = a.length; d < f; d++)b(a[d], d) && (c[++e] = a[d]);
        return c
    }

    function F(a, b) {
        "use strict";
        if (a.map)return a.map(b);
        if (typeof b != "function")throw TypeError("map need a function");
        var c = a, d = c.length >>> 0, e = Array(d);
        for (var f = 0; f < d; f++)f in c && (e[f] = b.call(null, c[f], f, c));
        return e
    }

    function E(a, b) {
        return a < b ? a : b
    }

    function D(a, b) {
        return a > b ? a : b
    }

    function C(a) {
        return typeof a == "function"
    }

    function B(a) {
        return typeof a == "number"
    }

    var b = a.lib.photoview.source, c = b.eventemiter, d = a.tween, e = a.core.json.merge, f = a.foreach, g = a.preventDefault, h = a.addEvent, i = a.removeEvent, j = a.addClassName, k = a.removeClassName, l = a.insertHTML, m = a.kit.dom.parseDOM, n = a.core.dom, o = n.prev, p = n.next, q = n.firstChild, r = a.setStyle, s = STK.core.util.browser, t = window.Math, u = b.util, v = u.setStyles, w = [].push, x = [].unshift, y = [].slice, z = function (a) {
        return y.call(a.children, 0)
    };
    try {
        y.call(document.documentElement.children, 0)[0].nodeType
    } catch (A) {
        z = function (a) {
            var b = [], a = a.firstChild;
            while (a) {
                a.nodeType === 1 && (b[b.length] = a);
                a = a.nextSibling
            }
            return b
        }
    }
    var J = /\{\w[\w.]*?\}/g, W = 0, X = 1, Y = !0, Z = function (a) {
        return a.status === X
    }, $ = ["click", "show", "hide", "render", "selectedItemChange", "itemLoad", "itemAdded", "itemRemoved", "itemSelected"], _ = c.extend(function (a, b) {
        if (!(this instanceof _))return new _(a, b);
        if (!a || a.nodeType !== 1)throw Error("Carousel construct failed, el not a valid html element.");
        var d = this;
        c.call(d, $);
        b = e({itemSize: 0, itemMargin: 1, numItems: 0, numVisible: 1, firstVisible: 0, scrollIncrement: 1, currentPage: 1, selectedItem: -1, itemTemplate: "", animation: {method: "easeoutcubic", speed: 300}, CLASSES: {WRAP: "carousel", LIST: "carousel-list", CLIP: "carousel-clip", ITEM: "carousel-item", SELECTED_ITEM: "current", PREV_DISABLED: "disabled", NEXT_DISABLED: "disabled"}}, b, {isDeep: !0});
        d.get = function (a) {
            return b[a]
        };
        d.set = function (a, c) {
            b[a] = c
        };
        d.init(a, b)
    }, {_items: null, _carouselEl: null, _clipEl: null, _itemSize: 0, _itemMargin: 0, _isAnimating: !1, _rendered: !1, _selectedItem: -1, hidden: !1, init: function (b, c) {
        var d = this, e = c.CLASSES, h = m(a.builder(b).list), i, k;
        h.prev = h.prev || l(b, '<div class="carousel-prev"></div>');
        h.next = h.next || l(b, '<div class="carousel-next"></div>');
        h.clip = h.clip || l(b, '<div class="' + e.CLIP + '"></div>');
        h.list = h.list || l(h.clip, '<ul class="' + e.LIST + '"></ul>');
        i = h.clip;
        k = h.list;
        j(b, e.WRAP);
        j(i, e.CLIP);
        j(k, e.LIST);
        v(i, {overflow: "hidden", position: "relative"});
        v(k, {overflow: "hidden", position: "relative"});
        var n = {prev: h.prev, next: h.next};
        f(n, function (a, b) {
            j(a, "carousel-nav")
        });
        d._items = [];
        d._parseItems();
        d.set("navigation", n);
        d.set("element", b);
        d.set("numItems", d._items.length);
        d._el = b;
        d._clipEl = i;
        d._carouselEl = k;
        d.hide();
        d.set("pcFn", function (a) {
            g(a);
            d.get("prevClick")(a) !== !1 && d.scrollPrev()
        });
        d.set("ncFn", function (a) {
            g(a);
            d.get("nextClick")(a) !== !1 && d.scrollNext()
        });
        var o = function () {
            return!0
        };
        d.set("prevClick", o);
        d.set("nextClick", o);
        d.set("prevStateFn", function () {
            return!d.isBOF()
        });
        d.set("nextStateFn", function () {
            return!d.isEOF()
        });
        d._initEvts()
    }, show: function () {
        var a = this, b;
        if (a.hidden) {
            b = a._el.style;
            b.visibility = "visible";
            b.display = "block";
            a.hidden = !1;
            a.fire("show")
        }
        return a
    }, hide: function () {
        var a = this;
        if (!a.hidden) {
            a.hidden = !0;
            a._el.style.display = "none";
            a.fire("hide")
        }
        return a
    }, isBOF: function () {
        return this.get("numItems") === 0 || this.get("firstVisible") === 0
    }, isEOF: function () {
        var a = this, b = a.get("firstVisible"), c = a.get("numItems"), d = b + a.get("numVisible");
        return d >= c
    }, render: function (a) {
        var b = this;
        if (!b._rendered) {
            b.show();
            b._refreshUi();
            b._syncUiItems();
            return!0
        }
    }, _parseItems: function () {
    }, _initUiState: function () {
        var b = this, c = b._el, d = b._clipEl, e = b._carouselEl, f, g = q(e), h, i, j, k, l, m;
        a.setStyle(d, "width", "");
        m = 0;
        l = L(c, "width");
        l -= M(c, "width") + M(d, "width");
        g = q(e);
        if (!g) {
            f = e.appendChild(b._createItem({}));
            f.style.visibility = "hidden";
            g = f
        }
        h = Q.call(b, "width", g);
        i = Q.call(b, "height", g);
        j = L(g, "marginRight", "int");
        b.set("itemSize", h);
        b.set("itemMargin", j);
        f && a.removeNode(f);
        if (l > 0) {
            k = t.floor((l + j) / h);
            b.set("numVisible", k);
            m = t.floor((l - k * (h - j)) / (k - 1)) - j
        }
        b.set("addMargin", m)
    }, _refreshUi: function () {
        var a = this, b = a._items.length;
        a._initUiState();
        if (!(b < 1)) {
            var c = a._clipEl, d = a._carouselEl, e = a.get("itemSize"), f = a.get("itemMargin"), g = a.get("numVisible"), h = a.get("addMargin");
            f += h;
            g <= b && (a._itemMargin = f);
            var i = e + h;
            v(c, {marginRight: "auto", marginLeft: "auto", width: g * i - f + "px"});
            r(d, "width", b * i + "px");
            a._itemSize = i;
            a._rendered = !0;
            a.fire("render")
        }
    }, _syncUiForItemAdd: function () {
        var a = this;
        a._rendered || a._refreshUi();
        a._syncUiItems()
    }, _syncUiItems: function () {
        if (!!Y) {
            var a = this, b = a._items, c = a._itemMargin;
            if (c > 0)for (var d = b.length, e; d--;) {
                e = b[d];
                if (e.status === X && e.margin !== c) {
                    e.margin = c;
                    r(b[d].el, "marginRight", c + "px")
                }
            }
            var f = a._carouselEl;
            r(f, "width", z(f).length * a._itemSize + "px");
            a._selectedItem < 0 && a.setSelectedItem(a.get("selectedItem"))
        }
    }, flush: function (a, b) {
        var c = this, d, e = c._items, f = c._carouselEl, g = c.get("numVisible"), h = c.get("firstVisible"), i = c.get("numItems"), j, k, l, m = 0, n, o = 0;
        if (!!i) {
            if (typeof a != "number" || typeof b != "number") {
                a = h;
                a < 0 && (a = 0);
                b = E(a + g - 1, i - 1);
                if (a + g > i - 1) {
                    b = i - 1;
                    a = D(b - g, 0)
                }
            } else b >= i && (b = i - 1);
            if (a < h) {
                l = c._findClosestSibling(a);
                o = L(f, "left", "int")
            }
            k = b - a + 1;
            if (k > 0) {
                Y = !1;
                while (a <= b) {
                    d = e[a];
                    j = d.el;
                    if (!j || d.status === W) {
                        j = c._createItem(d.data);
                        d.el = j;
                        d.status = X;
                        c.fire("itemLoad", {prev: e[a - 1], next: e[a + 1], data: d})
                    }
                    if (j.parentNode !== f) {
                        if (l) {
                            ++m;
                            f.insertBefore(j, l)
                        } else f.appendChild(j);
                        c.fire("itemAdded", d)
                    }
                    ++a
                }
                Y = !0;
                c._syncUiItems();
                if (m > 0) {
                    n = 0 - m;
                    o += R.call(c, n);
                    f.style.left = o + "px"
                }
            }
        }
    }, scrollTo: function (b) {
        var c = this, e, f, g, h, i, j, k, l, m, n, o = c._items;
        j = c.get("numItems");
        i = c.get("firstVisible");
        if (!isNaN(b) && j !== 0 && b !== i && !c.isAnimating()) {
            e = c._carouselEl;
            f = c.get("animation");
            k = c.get("numVisible");
            b < 0 && (b = 0);
            j - b < k && (b = D(j - k, 0));
            if (b === i)return;
            h = i > b ? "backward" : "forward";
            n = i + k - 1;
            n = n > j - 1 ? j - 1 : n;
            m = c.fire("beforeScroll", {dir: h, first: i, last: n});
            if (m === !1)return;
            var p = b, q = b + k - 1;
            p > n + 1 && (p = n + 1);
            c.flush(p, q);
            g = 0 - b;
            if (i > 0) {
                var s = a.core.arr.indexOf(o[i].el, z(c._carouselEl));
                if (s !== -1 && s !== i) {
                    g += i - s;
                    g = g > 0 ? 0 : g
                }
            }
            n = b + k;
            n = n > j - 1 ? j - 1 : n;
            l = R.call(c, g);
            c.set("firstVisible", b);
            if (f) {
                var t = function () {
                    c._isAnimating = !1;
                    U.call(c, b, n, h)
                };
                c._isAnimating = !0;
                d(e, {duration: f.speed, animationType: f.method, end: t}).play({left: l}).destroy()
            } else {
                r(e, "left", l + "px");
                U.call(c, b, n, h)
            }
        }
    }, scrollNext: function () {
        var a = this;
        a.scrollTo(a.get("firstVisible") + a.get("scrollIncrement"))
    }, scrollPrev: function () {
        var a = this;
        a.scrollTo(a.get("firstVisible") - a.get("scrollIncrement"))
    }, addItems: function (a, b) {
        var c = this, d = c._items, e = a.length, f = c._itemMargin, g = a && a.length;
        if (!!g) {
            a = F(a, function (a) {
                return{data: a, el: null, status: W, margin: 0}
            });
            if (d.length > 0 && b) {
                x.apply(d, a);
                c.set("firstVisible", c.get("firstVisible") + g);
                var h = c.get("selectedItem");
                if (h !== -1) {
                    h += g;
                    c._selectedItem = h;
                    c.set("selectedItem", h)
                }
            } else w.apply(d, a);
            c.set("numItems", d.length)
        }
    }, rewriteItem: function (a, b) {
        var c = this._items, d = b ? c[b] : c[this._selectedItem];
        d.data.is_liked = a.is_liked;
        d.data.likecount = a.count
    }, removeItems: function (b) {
        var c = this, d = c._items, e, f, g = b.length;
        while (g--) {
            e = b[g];
            H(d, e);
            (f = e.el) && a.removeNode(f)
        }
        c.set("numItems", d.length);
        c.resize();
        c.fire("itemsRemoved")
    }, setSelectedItem: function (a) {
        var b = this, c = b._items.length - 1, d = b._selectedItem;
        a = parseInt(a);
        if (isNaN(a) || a < 0)a = 0;
        if (c < 0)b.set("selectedItem", a); else {
            a > c && (a = c);
            if (d !== a) {
                b.set("selectedItem", a);
                b._selectedItem = a;
                b.fire("selectedItemChange", {prevValue: d, newValue: a})
            }
        }
    }, clear: function () {
        var a = this;
        a.set("numItems", 0);
        a.set("firstVisible", 0);
        a.set("selectedItem", -1);
        a._selectedItem = -1;
        a._rendered = !1;
        a._items = [];
        var b = a._carouselEl;
        b.innerHTML = "";
        b.style.left = "0"
    }, resize: function () {
        var a = this, b = a._carouselEl;
        if (!!a.get("numItems") && !a.isAnimating()) {
            u.empty(b);
            b.style.left = "0";
            a._rendered = !1;
            a._refreshUi();
            a.flush()
        }
    }, filter: function (a) {
        return G(this._items, a)
    }, slice: function (a, b) {
        var c = this._items, d = c.length;
        a = a < 0 ? 0 : a;
        b = b > d ? d : b;
        return c.slice(a, b)
    }, destroy: function () {
        this.clear();
        S.call(this);
        this.removeEvents();
        this._el = null;
        this._clipEl = null;
        this._carouselEl = null
    }, isAnimating: function () {
        return this._isAnimating
    }, _createItem: function (a) {
        var b = this, c = b.get("CLASSES").ITEM, d = a.className, e = b._itemMargin, f;
        c && d && d !== c && (c += " " + d);
        return P("LI", {className: d, html: a.html || K(b.get("itemTemplate"), a)})
    }, _findClosestSibling: function (a) {
        var b = this, c = b._items, d = c.length, e = a + 1, f, g, h;
        while (e < d && !f) {
            g = c[e++].el;
            h = g && g.parentNode;
            h && h.nodeType === 1 && (f = g)
        }
        return f
    }, _initEvts: function () {
        var b = this;
        b.on("itemAdded", function (a, c) {
            b._syncUiForItemAdd(c)
        });
        b.on("selectedItemChange", function (a, c) {
            T.call(b, c.newValue, c.prevValue);
            b.fire("itemSelected", b._items[c.newValue])
        });
        b.on("afterScroll", function (a, c) {
            V.call(b, c);
            S.call(b, c)
        });
        b.on("render", function (a) {
            b._setNavigation(b.get("navigation"));
            S.call(b, a);
            b.show()
        });
        b.on("itemsRemoved", function (a) {
            b._setNavigation(b.get("navigation"));
            S.call(b, a)
        });
        b.on("click", function (a, c) {
            b._itemClickHandler(c) && g(c)
        });
        h(b._el, "click", function (c) {
            b.fire("click", a.fixEvent(c))
        })
    }, _setNavigation: function (a) {
        var b = this;
        a.prev && h(a.prev, "click", b.get("pcFn"));
        a.next && h(a.next, "click", b.get("ncFn"))
    }, _itemClickHandler: function (a) {
        var b = this, c = b._el, d = b._carouselEl, e, f = a.target, g = f.tagName.toUpperCase();
        if (g !== "INPUT" && g !== "SELECT" && g !== "TEXTAREA") {
            while (f && f !== c && f !== d) {
                if (f.nodeName.toUpperCase() === "LI")break;
                f = f.parentNode
            }
            e = I(b._items, function (a) {
                return a.el === f
            });
            if (e >= 0) {
                b.setSelectedItem(e);
                return!0
            }
            return!1
        }
    }});
    return _
});
STK.register("ui.tab", function (a) {
    return function (b) {
        var c = {}, d, e, f, g, h, i = {}, j = null, k = {selectTab: function (b) {
            if (!i[b]) {
                a.custEvent.fire(m, "tabInit", b);
                i[b] = !0
            }
            k.showTab(b);
            j && a.custEvent.fire(m, "tabOut", j);
            a.custEvent.fire(m, "tabIn", b);
            j = b
        }, showTab: function (b) {
            if (j) {
                e[j][0].className = c.defaultClassName;
                a.core.dom.setStyle(e[j][1], "display", "none")
            }
            e[b][0].className = c.currentClassName;
            a.core.dom.setStyle(e[b][1], "display", "")
        }}, l = {tabSwitch: function (a) {
            var b = a.el, c = b.getAttribute("node-type") || "";
            c != j && k.selectTab(c)
        }}, m = {getOuter: function () {
            return g
        }, getDEvent: function () {
            return h
        }, getDom: function (a) {
            return e[a] ? e[a] : null
        }, setContent: function (b, c) {
            typeof c == "string" ? e[b].innerHTML = info : a.isNode(c) && e[b].appendChild(c)
        }, destroy: function () {
            h.destroy();
            i = null
        }}, n = {init: function () {
            n.pars();
            n.build();
            n.bind();
            k.selectTab(c.currentTab)
        }, pars: function () {
            c = a.core.obj.parseParam({templete: "", currentTab: "tab1", eventType: "click", currentClassName: "pftb_lk current S_line5 S_txt1 S_bg5", defaultClassName: "pftb_lk S_line5 S_txt1 S_bg1"}, b || {})
        }, build: function () {
            d = a.core.dom.builder(c.templete);
            e = d.list;
            f = e.content[0];
            g = d.list.tabs[0]
        }, bind: function () {
            a.custEvent.define(m, ["tabInit", "tabIn", "tabOut"]);
            h = a.core.evt.delegatedEvent(g);
            h.add("tab", c.eventType, l.tabSwitch)
        }};
        n.init();
        return m
    }
});
STK.register("lib.photoview.source.likelayer", function (a) {
    function d(b) {
        var c = b.relatedTarget, d = b.fromElement;
        if (!c || d && d === b.target) {
            c = b.toElement || d;
            b.relatedTarget = c
        }
        return c == null ? !0 : c ? c !== this && c.prefix !== "xul" && this !== document && !a.contains(this, c) : !1
    }

    var b = a.addEvent, c = a.removeEvent;
    return function (e, f) {
        function t() {
            if (n) {
                clearTimeout(n);
                n = 0;
                l.style.display = "none"
            }
        }

        function s() {
            clearTimeout(m)
        }

        if (!!e) {
            f = a.parseParam({mid: null, relatedTarget: null, style: {}}, f);
            if (!f.mid)throw Error("options invald, mid is null.");
            var g = a.common.trans.attitude, h = '<div class="W_layer" style="display:none;" node-type="outer" ><div class="bg"><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><div class="content layer_emotion"><ul class="emotion_list clearfix" node-type="faceList"></ul></div></td></tr></tbody></table><div class="arrow arrow_t"></div></div></div>', i = {}, j = !1, k = {}, l, m, n, o = f.relatedTarget, p = 500, q, r, u = {checkBigVisible: function () {
                return o ? o.style.display !== "none" : !1
            }, go: function (a) {
                var b = a.currentTarget || this;
                if (d.call(b, a)) {
                    j || w();
                    r = parseInt(e.innerHTML.replace(/.*\((\d+)\).*/, "$1"), 10) || 0;
                    if (u.checkBigVisible())return;
                    if (l.style.display !== "none") {
                        s();
                        return
                    }
                    n = setTimeout(function () {
                        u.trans()
                    }, p)
                }
            }, trans: function () {
                g.getTrans("minismall", {onSuccess: function (b) {
                    if (!!n) {
                        r = +b.data.total_number;
                        if (!r)return;
                        var c = a.kit.dom.parseDOM(a.builder(b.data.html).list);
                        k.faceList.innerHTML = c.faceList.innerHTML;
                        k.mid = f.mid;
                        l.style.display = "";
                        var d = e.innerHTML;
                        d = /(<em[^>]*>.*?<\/em>)/i.test(d) && RegExp.$1 || d;
                        d += r > 0 ? "(" + r + ")" : "";
                        e.innerHTML = d;
                        var g = a.position(e);
                        a.setXY(l, {t: g.t + e.offsetHeight + 6, l: g.l + e.offsetWidth / 2 - 36})
                    }
                }, onFail: function () {
                }, onError: function () {
                }}).request({mid: f.mid, location: $CONFIG.location})
            }, stop: function (a) {
                var b = a && a.currentTarget || this;
                a || t();
                if (!a || d.call(b, a)) {
                    s();
                    m = setTimeout(t, 300)
                }
            }, cancelLike: function (b) {
                a.preventDefault();
                r--;
                a.removeNode(a.core.dom.neighbor(b.el).parent("li").getCurrent());
                e.title = a.kit.extra.language("#L{赞}");
                e.innerHTML = '<em class="W_ico20 icon_praised_b"></em>' + (r ? "(" + r + ")" : "");
                a.sizzle("[uid]", k.faceList).length <= 0 && t();
                g.getTrans("minidel", {onSuccess: a.core.func.empty, onError: a.core.func.empty}).request(b.data)
            }}, v = function () {
                b(e, "click", t);
                b(e, "mouseout", u.stop);
                b(l, "mouseover", s);
                b(l, "mouseout", u.stop);
                q = a.delegatedEvent(l);
                q.add("like_del", "click", u.cancelLike)
            }, w = function () {
                j = !0;
                k = a.kit.dom.parseDOM(a.builder(h).list);
                l = k.outer;
                var b = f.style.zIndex;
                b && a.setStyle(l, "zIndex", b);
                document.body.appendChild(l);
                v()
            }, x = function () {
                b(e, "mouseover", u.go)
            };
            x();
            i.hide = t;
            i.destroy = function () {
                c(e, "mouseover", u.go);
                if (!!j) {
                    t();
                    q.destroy();
                    c(e, "click", t);
                    c(e, "mouseout", u.stop);
                    c(l, "mouseout", u.stop);
                    c(l, "mouseover", s);
                    a.removeNode(l);
                    e = null;
                    l = null;
                    q = null
                }
            };
            return i
        }
    }
});
STK.register("lib.photoview.source.inter", function (a) {
    var b = null, c = function () {
    }, d = a.ui.alert, e, f = a.common.dialog.commentPrivateSetting, g = a.kit.extra.language, h = function (b, c) {
        if (b && b.code) {
            b.code != "100000" && b.code != "100005" && a.common.layer.ioError(b.code, b);
            c(b)
        }
    };
    return function (f, i) {
        e = a.common.dialog.validateCode();
        var j = {}, k = 0, l = a.common.trans.comment;
        f = a.parseParam({delete_success: c, delete_fail: c, delete_error: c, add_success: c, add_fail: c, add_error: c, smallList_success: c, smallList_fail: c, smallList_error: c}, f || {});
        j.conf = a.parseParam({act: b, mid: b, cid: b, uid: $CONFIG.uid, page: b, forward: b, isroot: b, content: b, type: b, is_block: b, appkey: b}, i);
        j.merge = function (b) {
            b = a.kit.extra.merge(j.conf, b);
            return a.core.obj.clear(b)
        };
        j.request = function (b, c) {
            if (!k) {
                k = 1;
                var i = j.merge(c), m = l.getTrans(b, {onComplete: function (c, j) {
                    if (b == "add") {
                        var l = {onSuccess: function (a, c) {
                            h(a, function (a) {
                                f[b + (a.code == "100000" ? "_success" : "_fail")](a, i)
                            })
                        }, onError: function (c, e) {
                            f[b + "_error"](c, i);
                            c.code == "100005" ? d(g("#L{由于对方隐私设置，你无法进行评论。}"), {textSmall: g("#L{绑定手机后可以更多地参与评论。}") + '<a href="http://account.weibo.com/settings/mobile" target="_blank">' + g("#L{立即绑定}") + "</a>"}) : a.common.layer.ioError(c.code, c)
                        }, param: i, requestAjax: m};
                        e.validateIntercept(c, j, l)
                    } else h(c, function (a) {
                        if (a.code == "100000")f[b + "_success"](a, i); else {
                            var c = f[b + "_fail"];
                            typeof c == "function" ? f[b + "_fail"](a, i) : f[b + "_success"](a, i)
                        }
                    });
                    k = 0
                }, onFail: function () {
                    k = 0
                }});
                m.request(i)
            }
        };
        j.load = function (a, b) {
            f.smallList_success(a, b)
        };
        j.del = function (a) {
            j.request("delete", a)
        };
        j.post = function (a) {
            j.request("add", a)
        };
        e.addUnloadEvent();
        return j
    }
});
STK.register("lib.photoview.source.commentTemp", function (a) {
    return{reply: '<div class="reply_media_expand" style="" node-type="commentwrap"><div class="WB_arrow" style="left: 195px;"><em class="S_line">◆</em><span class=" S_bg">◆</span></div><div class="S_line1 input clearfix"><textarea name="" action-type="check" node-type="textEl" rows="" cols="" title="回复评论" class="W_input" style="height:18px;"></textarea><div class="show_comment_btn"><div class="action"><span class="W_ico16 ico_faces" node-type="smileyBtn"></span><ul class="commoned_list" node-type="widget"><li><label><input type="checkbox" name="" node-type="forward" class="W_checkbox"><em class="cut_off">#L{同时转发到微博}</em></label></li></ul></div><p class="btn"><a href="javascript:void(0);" class="W_btn_b btn_noloading" action-type="doReply"><span><b class="loading"></b><em node-type="btnText">评论</em></span></a></p></div></div></div>'}
});
STK.register("lib.photoview.source.setTextarea", function (a) {
    function h(b) {
        var c = b.parentNode;
        return c && c.nodeType === 1 && a.contains(document.body, c)
    }

    function g(c, d) {
        a.foreach(d, function (a, d) {
            b(c, d, a)
        })
    }

    var b = a.setStyle, c = a.addEvent, d = a.removeEvent, e = a.addClassName, f = a.removeClassName;
    return function (b, i) {
        var j, k = 0, l, m = 0, n = function () {
            if (!b || !h(b))r(); else {
                var a = b.scrollTop;
                if (a !== m)if (a >= l) {
                    e(i, "set_top");
                    g(i, {position: "relative", zoom: 1, top: a - l + "px", zIndex: 9999})
                } else {
                    f(i, "set_top");
                    g(i, {position: "relative", top: "0px"})
                }
                m = b.scrollTop
            }
        }, o = function () {
            j && clearInterval(j);
            j = setInterval(n, 100)
        }, p = function (a) {
            k && clearTimeout(k);
            clearInterval(j);
            n();
            k = setTimeout(o, 100)
        }, q = function (b, d) {
            if (!b || !d)throw new Error("Illegal argument. target and reference not a valid node.");
            l = a.position(d, {parent: b}).t;
            c(b, "scroll", p);
            o()
        }, r = function () {
            if (!!b) {
                d(b, "scroll", p);
                if (k) {
                    clearTimeout(k);
                    k = null
                }
                if (j) {
                    clearInterval(j);
                    j = null
                }
                b = null;
                i = null
            }
        };
        q(b, i);
        var s = {destroy: r};
        return s
    }
});
STK.register("lib.photoview.source.comment", function (a) {
    function H(b) {
        var c = a.builder(b);
        G(c.list);
        return c.box
    }

    function G(a) {
        a = g(a);
        for (var b in a)a.hasOwnProperty(b) && (F[b] = a[b])
    }

    var b = a.lib.photoview.source, c = b.util.mix, d = a.common.comment.commentMsg, e = a.lib.photoview.source.commentTemp, f = a.common.comment.reply, g = a.kit.dom.parseDOM, h = "", i = a.ui.alert, j = a.ui.tipAlert, k = a.kit.extra.language, l = a.custEvent, m = a.sizzle, n = a.setStyle, o = a.core.dom, p = a.core.evt.preventDefault, q = a.common.trans.comment, r = a.kit.dom.children, s = a.core.evt.removeEvent, t = a.addClassName, u = a.removeClassName, v, w, x, y, z = !1, A = !1, B = !1, C = 1, D, E = '<div class="W_loading"><span>正在加载中，请稍候...</span></div>', F = {}, I = function (a, b) {
        return m(a, b)[0]
    }, J = a.lib.photoview.source.channel, K = {content: k("#L{写点东西吧，评论内容不能为空哦。}"), "delete": k("#L{确定要删除该回复吗}"), reply: k("#L{回复}"), blcok: k("#L{同时将此用户加入黑名单}"), notice: k("#L{输入评论内容}"), unReply: k(d.noPhoneReplyMsg), unPower: k(d.noPowerReplyMsg)}, L = function (a) {
        return parseInt(a.innerHTML.replace(/[^\d]+/, "")) || 0
    }, M = function (d, g) {
        var p = g.mid, u, A, C, E, G, L, M, P = new RegExp(["^", K.reply, "@([^:]*):(.*)"].join("")), R = a.core.str, S = a.common.dialog.commentDialogue(), T = {}, U, V, W, X = function (b) {
            var e = a.trim(w.value), f = e.match(P);
            if (e == "" || f && a.trim(f[2]) == "" || e == "输入评论内容")i(K.content); else {
                if (!f || !f[1] || f[1] != C)u = C = null;
                h = a.sizzle('em[node-type="btnText"]', b.el)[0].innerHTML;
                b && b.el ? b.el.className = "W_btn_a_disable" : I('[action-type="post"]', d).className = "W_btn_a_disable";
                var j = a.common.getDiss({act: f ? "reply" : "post", cid: u, content: R.leftB(e, 280), isroot: G && G.checked ? "1" : "0", forward: E && E.checked ? "1" : "0", appkey: g.appkey, mark: g.mark, type: "photolayer"}, b.el);
                c(j, {log_type: "weibo", refer_sort: "layer", location: $CONFIG.location, pdetail: $CONFIG.page_id});
                bh.post(j)
            }
        }, Y = function (b) {
            var d = b.el, h = b.data.cid, i = b.data.nick, j = "photolayer", m = g.mark || "", n = o.dir(d, {dir: "parent", expr: ".info", matchAll: !1})[0], q = T[h] && T[h].DOM, r = q ? a.core.dom.contains(document.body, q) : !1;
            if (q && a.getStyle(q, "display") != "none" && r)a.setStyle(q, "display", "none"); else {
                if (!q || !r) {
                    q = a.builder(k(e.reply)).list.commentwrap[0];
                    n && a.core.dom.insertAfter(q, n);
                    var s = {mid: p, cid: h, content: i, mark: m, module: "scommlist", type: j};
                    c(s, {log_type: "weibo", refer_sort: "layer", location: $CONFIG.location, pdetail: $CONFIG.page_id});
                    T[h] = {handle: f(q, s), DOM: q};
                    l.add(T[h].handle, "reply", bc)
                }
                a.setStyle(q, "display", "");
                T[h] && T[h].handle.focus()
            }
        }, Z = function () {
            var a, b, c = function () {
                b && window.clearTimeout(b);
                if (a) {
                    a.aniHide();
                    a.destroy();
                    a = null
                }
            }, d = function (d) {
                c();
                a = j({msg: d, type: "warn"});
                b = window.setTimeout(c, 3e3);
                return a
            };
            d.hide = c;
            return d
        }(), _ = function (b) {
            var c = b.el, d = b.data, e;
            if (a.core.dom.hasClassName(c, "unclick_rep")) {
                var f = c.getAttribute("isPhone");
                f ? e = Z(K.unReply) : e = Z(K.unPower);
                e.setLayerXY(c);
                e.aniShow()
            } else d && d.ispower == "1" ? q.getTrans("isComment", {onComplete: function (a) {
                if (a.code == "100000") {
                    var f, g;
                    d && (f = d.nick) && Y(b)
                } else {
                    if (a.code == "100022")e = Z(K.unPower); else if (a.code == "100001") {
                        e = Z(K.unReply);
                        c && c.setAttribute("isphone", "1")
                    } else e = Z(K.msg);
                    e.setLayerXY(c);
                    e.aniShow();
                    t(c, "unclick_rep")
                }
            }, onSuccess: a.funcEmpty}).request(d) : Y(b)
        }, ba = function (b) {
            var c = b.data.block ? ['<input node-type="block_user" id="block_user" name="block_user" value="1" type="checkbox"/><label for="block_user">', K.blcok, "</label>"].join("") : "";
            a.ui.confirm(K["delete"], {OK: function (a) {
                var c = a.block_user, d, e;
                (d = b.data) && (e = d.cid) && bh.del({act: "delete", cid: e, is_block: c ? "1" : "0"})
            }, textComplex: c})
        }, bb = function (a) {
            A = a.data.cid;
            S.show(a)
        }, bc = function (a, b) {
            bd(b)
        }, bd = function (b) {
            var c = b.data;
            if (!c)return!1;
            u = C = null;
            if (c.comment && y) {
                a.insertHTML(y, c.comment, "afterbegin");
                Q()
            }
            c.feed && J.fire("forwardCount", 1);
            J.fire("commentCount", 1);
            bf.changeSubmitBtn();
            return!0
        }, be = function () {
            if (!B) {
                var a = F.commentMore;
                if (a.getAttribute("data-local") === "1") {
                    var b = F.todo_more, c = r(b), d = c.length, e = D.pagenum < D.totalpage;
                    while (d-- > 4)n(c[d], "display", "");
                    a.removeAttribute("data-local");
                    n(a, "display", e ? "block" : "none");
                    Q()
                } else {
                    z = !0;
                    O(bh)
                }
            }
        }, bf = {changeSubmitBtn: function () {
            var a = I("em[node-type='btnText']", d), b = I("a[action-type='post']", d);
            b.className = "W_btn_d btn_noloading";
            h && (a.innerHTML = h)
        }, add_success: function (a, b) {
            if (bd(a)) {
                w.value = "输入评论内容";
                var c = I("[node-type=showCommentBtn]", v), d = I("a[node-type=submit]", c);
                d.className = "W_btn_d";
                n(c, "display", "none");
                n(w, "height", "25px")
            }
        }, add_fail: function () {
            bf.changeSubmitBtn()
        }, add_error: function () {
            bf.changeSubmitBtn()
        }, delete_success: function (a, b) {
            var c = I(['div[comment_id="' + b.cid + '"]'].join(""), d);
            if (c) {
                c.parentNode.removeChild(c);
                J.fire("commentCount", -1);
                Q()
            }
        }, delete_fail: function (a, b) {
        }, smallList_success: function (c, e) {
            e.focus = !1;
            var f = c, g = {limitNum: 140, tipText: K.notice, count: "disable"};
            if (!!f) {
                d.innerHTML = "";
                d.appendChild(H(c.html));
                w = F.textEl;
                V = setTimeout(function () {
                    if (w) {
                        a.kit.dom.autoHeightTextArea({textArea: w, maxHeight: 9999, inputListener: function () {
                            var b = a.trim(w.value);
                            R.bLength(b) > 280 && (w.value = R.leftB(b, 280))
                        }});
                        try {
                            L = a.common.editor.base(d, g);
                            L.widget(a.common.editor.widget.face(), "smileyBtn");
                            e.focus && a.core.dom.selectText(w, {start: 0});
                            e.focus && w.focus()
                        } catch (b) {
                        }
                    }
                }, 150);
                a.addEvent(w, "focus", N);
                E = I("input[name=forward]", d);
                G = I("input[name=isroot]", d);
                x = I("div[node-type=commentList]", d);
                y = I("div[node-type=todo_more]", d);
                a.core.evt.hotKey.add(x, ["ctrl+enter"], X);
                var h = I('[node-type="feed_quick_comment_list"]', d);
                if (h) {
                    U = a.common.comment.plugins.qFace(h, {mid: e.mid});
                    bg.add("qface_send", "click", U.send)
                }
                var i = m("div[node-type=scroller]")[1];
                W && W.destroy();
                W = b.setTextarea(i, x);
                bg.add("reply", "click", _);
                bg.add("delete", "click", ba);
                bg.add("post", "click", X);
                bg.add("commentDialogue", "click", bb);
                bg.add("commentMoreBtn", "click", be)
            }
        }}, bg = a.delegatedEvent(d), bh = a.lib.photoview.source.inter(bf, g);
        l.define(bh, ["count", "feed", "comment", "del", "destroy"]);
        bh.disposed = !1;
        bh.destroy = function () {
            if (!bh.disposed) {
                bh.disposed = !0;
                if (L) {
                    L.closeWidget();
                    L.destroy();
                    L = null;
                    M = null
                }
                if (V) {
                    clearTimeout(V);
                    V = null
                }
                if (W) {
                    W.destroy();
                    W = null
                }
                if (U) {
                    bg.remove("qface_send", "click", U.send);
                    U.destroy();
                    U = null
                }
                a.foreach(T, function (a) {
                    l.remove(a.handle);
                    l.undefine(a.handle);
                    a.DOM = null;
                    a.handle = null
                });
                a.core.evt.hotKey.remove(x, ["ctrl+enter"], X);
                Z.hide();
                bg.remove("commentMoreBtn", "click", be);
                bg.remove("check", "foucs", N);
                bg.remove("reply", "click", _);
                bg.remove("delete", "click", ba);
                bg.remove("post", "click", X);
                bg.remove("commentDialogue", "click", bb);
                bg.destroy();
                s(w, "focus", N);
                l.remove(bh);
                l.undefine(bh)
            }
        };
        return bh
    }, N = function () {
        a.trim(w.value) == "输入评论内容" && (w.value = "");
        var b = I("[node-type=showCommentBtn]", v), c = I("a[node-type=submit]", b);
        c.className = "W_btn_d btn_noloading";
        n(b, "display", "")
    }, O = function (b, c) {
        if (!B) {
            B = !0;
            var d = {};
            d.id = T.mid;
            d.type = "photolayer";
            d.page = C || 1;
            z && (F.showCommentMore.innerHTML = E);
            a.common.trans.photoview.getTrans("commentList", {onSuccess: function (a, c) {
                P(b, a, c)
            }, onError: function () {
                i("系统繁忙")
            }}).request(d)
        }
    }, P = function (b, c, d) {
        if (!b.disposed) {
            B = !1;
            var e = c.data, f = e && a.trim(e.html || "");
            if (!A) {
                A = !0;
                U.load(T, {focus: !0, mid: T.mid});
                n(F.showCommentBtn, "display", f ? "none" : "block")
            }
            var g = c.data.page, h = F.commentMore, i = F.showCommentMore, j = F.todo_more, k = !1;
            if (f) {
                if (g.pagenum === 1) {
                    var l = I("cite[node-type=commentCount]", T.tab), m = parseInt(e.count, 10) || 0;
                    l.innerHTML = m > 0 ? "(" + m + ")" : "";
                    f = a.builder(f);
                    var o = r(f.box), p = o.length, q = 4;
                    k = p > q;
                    if (k) {
                        h.setAttribute("data-local", "1");
                        while (p-- > q)n(o[p], "display", "none")
                    }
                    j.appendChild(f.box)
                } else {
                    k = g.pagenum < g.totalpage;
                    a.insertHTML(j, f)
                }
                C = g.pagenum + 1;
                D = g
            }
            n(h, "display", k ? "block" : "none");
            i.innerHTML = "查看更多评论";
            Q()
        }
    }, Q = function () {
        var a = F.todo_more;
        if (a) {
            var b = r(a), c = b.length, d = c - 1, e = F.commentMore.style.display === "none";
            while (c--) {
                var f = b[c];
                e && c === d ? t(f, "last") : u(f, "last")
            }
        }
    }, R = function (a) {
        var b = I("cite[node-type=commentCount]", T.tab), c = L(b);
        a < 0 ? --c : ++c;
        b.innerHTML = c > 0 ? "(" + c + ")" : ""
    }, S = !1, T, U, V = function (a, b, c) {
        U = a;
        T = c;
        v = b;
        A = !1;
        z = !1;
        C = 1;
        B = !1;
        O(a)
    }, W = function () {
        S = !0;
        J.register("commentCount", R)
    };
    return function (a, b) {
        S || W(b);
        if (!a || !a.mid || !(a = a.html))throw"mid is not defined";
        var c = M(b, a);
        V(c, b, a);
        return c
    }
});
STK.register("lib.photoview.source.forward", function (a) {
    var b = a.setStyle, c = a.sizzle, d = a.lib.photoview.source, e = d.util.mix, f = a.kit.dom.parseDOM, g = a.kit.extra.language, h = a.common.forward.utils, i = a.core.evt.preventDefault, j = d.channel, k = a.kit.dom.children, l = a.kit.extra.toFeedText, m = a.core.dom, n = a.addClassName, o = a.removeClassName, p = a.core.evt.removeEvent, q = a.ui.alert, r = a.ui.tip, s, t, u = !1, v, w, x, y, z = 1, A, B = !1, C = !1, D = {}, E = {}, F = '<div class="W_loading"><span>正在加载中，请稍候...</span></div>', G = {notice: "#L{请输入转发理由}", defUpdate: "#L{转发微博}", netError: "#L{系统繁忙}", success: "#L{转发成功}!", retry: '#L{读取失败，请}<a href="#" onclick="return false;" action-type="retry" value="retry">#L{重试}</a>', off: "#L{关闭}", on: "#L{开启}"}, H = function (a, b) {
        b == "normal" ? a.innerHTML = g("#L{转发}") : a.innerHTML = g("#L{提交中...}")
    }, I = function (a, b) {
        return c(a, b)[0]
    }, J = function (a) {
        return parseInt(a.innerHTML.replace(/[^\d]+/, "")) || 0
    }, K = function (a) {
        a = f(a);
        for (var b in a)a.hasOwnProperty(b) && (E[b] = a[b])
    }, L = function (b) {
        var c = a.builder(b);
        K(c.list);
        return c.box
    }, M, N = !1, O, P, Q, R, S = !1, T = function () {
        return s || (s = a.common.dialog.validateCode())
    }, U = function (b) {
        a.common.dialog.forward().show(b.mid, b.forwardOpts)
    }, V = function (a) {
        var b = a.data;
        if (!!b) {
            var d = c("div[node-type=header]")[0], e = c("div.text", d)[0], f = m.dir.parent(a.el, {expr: ".comment_list", matchAll: !0})[0], g = l(e.innerHTML), h = l(c("em", f)[0].innerHTML), i = b.mid, j = {type: b.allowForward, origin: g, reason: h, originNick: b.rootname, forwardNick: b.name, title: "转发微博", domInit: !1, url: b.url, styleId: "1", allowComment: "1", allowForward: "1", allowRootComment: "1", pid: b.pid, mark: "", domain: "u/" + b.rootuid};
            U({mid: i, forwardOpts: j})
        }
    }, W = function (a) {
        E.textEl.value == "请输入转发理由" && (E.textEl.value = "");
        b(E.showforwradFace, "display", "");
        E.submit.className = "W_btn_d btn_noloading"
    }, X = function () {
        if (!!y) {
            var a = y.API.count(), b = 140 - a, c = b >= 0 ? !0 : !1;
            if (c) {
                O = !1;
                R = ""
            } else {
                O = !0;
                R = "error"
            }
        }
    }, Y = function (b) {
        var c = b;
        if (!c)return!1;
        a.insertHTML(E.todo_more, c, "afterbegin");
        j.fire("forwardCount", 1);
        Z();
        return!0
    }, Z = function () {
        var a = E.todo_more;
        if (a) {
            var b = k(a), c = b.length, d = c - 1, e = E.forwardMoreBtn.style.display === "none";
            while (c--) {
                var f = b[c];
                e && c === d ? n(f, "last") : o(f, "last")
            }
        }
    }, $ = function (c, d) {
        O = !1;
        E.submit.className = "W_btn_d";
        H(E.btnText, "normal");
        b(E.textEl, "height", "25px");
        b(E.showforwradFace, "display", "none");
        try {
            c.data.isComment = N;
            c.data.isToMiniBlog = !0
        } catch (e) {
        }
        setTimeout(function () {
            a.ui.litePrompt(g(G.success), {type: "succM", timeout: "500"})
        }, 150);
        N = !1;
        y.API.reset();
        var f = c.data.html;
        Y(f);
        E.textEl.value = "请输入转发理由"
    }, _ = function (b) {
        var c = a.common.trans.feed.feed.getTrans("delete", {onSuccess: ba, onError: bb, onFail: function () {
        }}), d = b.data, e = {};
        e.mid = d.mid;
        c.request(e)
    }, ba = function (a, b) {
        var c = I(['div[mid="' + b.mid + '"]'].join(""), t);
        c && c.parentNode.removeChild(c);
        j.fire("forwardCount", -1);
        Z()
    }, bb = function (b, c) {
        O = !1;
        E.submit.className = "W_btn_d btn_noloading";
        H(E.btnText, "normal");
        b.msg = b.msg || g(G.netError);
        a.common.layer.ioError(b.code, b);
        N = !1
    }, bc = function (a, b) {
        O = !1;
        R = "";
        E.submit.className = "W_btn_d btn_noloading";
        H(E.btnText, "normal");
        q(g(G.netError))
    }, bd = function (b) {
        if (O)R === "error" && a.common.extra.shine(E.textEl); else {
            var c = a.trim(y.API.getWords() || "");
            c == g(G.notice) && (c = "");
            var d = {};
            d.reason = c || g(G.defUpdate);
            d.style_type = 3;
            d.rank = 0;
            d.mid = Q;
            d.location = $CONFIG.location || "";
            O = !0;
            R = "loading";
            E.submit.className = "W_btn_a_disable";
            E.originInput && E.originInput.checked && (d.is_comment_base = "1");
            if (E.forwardInput && E.forwardInput.checked) {
                d.is_comment = "1";
                N = !0
            }
            d = a.common.getDiss(d, E.submit);
            e(d, {log_type: "weibo", refer_sort: "layer", location: $CONFIG.location});
            var f = a.common.trans.photoview.getTrans("toMicroblog", {onComplete: function (a, b) {
                var c = {onSuccess: $, onError: bb, requestAjax: f, param: d, onRelease: function () {
                    O = !1;
                    R = "";
                    E.submit.className = "W_btn_d btn_noloading";
                    H(E.btnText, "normal");
                    N = !1
                }};
                T().validateIntercept(a, b, c)
            }, onFail: bc, onTimeout: bb});
            if (h.checkAtNum(c) > 5) {
                a.ui.confirm(g("#L{单条微博里面@ 太多的人，可能被其它用户投诉。如果投诉太多可能会被系统封禁。是否继续转发？}"), {OK: function () {
                    f.request(d)
                }, cancel: function () {
                    O = !1;
                    R = "";
                    E.submit.className = "W_btn_d btn_noloading";
                    H(E.btnText, "normal")
                }});
                return
            }
            f.request(d)
        }
    }, be = function (a) {
        if ((a.keyCode === 13 || a.keyCode === 10) && a.ctrlKey) {
            y.API.blur();
            bd()
        }
    }, bf = function (b) {
        if (!B) {
            B = !0;
            var c = {};
            c.id = D.mid;
            c.type = "photolayer";
            c.page = z;
            C && (E.forwardMoreBtnBox.innerHTML = F);
            a.common.trans.photoview.getTrans("forwardList", {onSuccess: bg, onError: function () {
                q("系统繁忙")
            }}).request(c)
        }
    }, bg = function (c, d) {
        B = !1;
        var e = c.data, f = e && a.trim(e.html || "");
        if (!u) {
            u = !0;
            bh()
        }
        var g = e.page, h = E.todo_more, i = E.forwardMoreBtn, j = E.forwardMoreBtnBox, l = !1;
        if (f) {
            if (g.pagenum === 1) {
                var m = I("cite[node-type=forwardCount]", D.tab), n = parseInt(e.count, 10) || 0;
                m.innerHTML = n > 0 ? "(" + n + ")" : "";
                f = a.builder(f);
                var o = k(f.box), p = o.length, q = 4;
                l = p > q;
                if (l) {
                    i.setAttribute("data-local", "1");
                    while (p-- > q)b(o[p], "display", "none")
                }
                h.appendChild(f.box)
            } else {
                l = g.pagenum < g.totalpage;
                a.insertHTML(h, f)
            }
            z = g.pagenum + 1;
            A = g
        } else z === 1 && b(E.showforwradFace, "display", "");
        b(i, "display", l ? "block" : "none");
        j.innerHTML = "查看更多转发";
        Z()
    }, bh = function () {
        var b = D, e = b.forwardBox, f = b.repost.html;
        Q = b.mid;
        e.innerHTML = "";
        e.appendChild(L(f));
        t = e;
        v = setTimeout(function () {
            a.kit.dom.autoHeightTextArea({textArea: E.textEl, maxHeight: 145, inputListener: function () {
            }});
            if (E.textEl)try {
                var b = {limitNum: 140, tipText: g(G.notice), count: "disable"};
                y = a.common.editor.base(t, b);
                y.widget(a.common.editor.widget.face(), "smileyBtn")
            } catch (c) {
            }
        }, 100);
        a.addEvent(E.textEl, "focus", function () {
            P && clearInterval(P);
            P = setInterval(X, 200);
            W()
        });
        a.addEvent(E.textEl, "blur", function () {
            clearInterval(P)
        });
        a.addEvent(E.btnText, "click", bd);
        var h = c("div[node-type=scroller]")[1];
        w && w.destroy();
        w = d.setTextarea(h, E.forward)
    }, bi = function (a) {
        var b = I("cite[node-type=forwardCount]", D.tab), c = J(b);
        a < 0 ? --c : ++c;
        b.innerHTML = c > 0 ? "(" + c + ")" : ""
    }, bj = function () {
        if (!B) {
            var a = E.forwardMoreBtn;
            if (a.getAttribute("data-local") === "1") {
                var c = E.todo_more, d = k(c), e = d.length, f = A.pagenum < A.totalpage;
                while (e-- > 4)b(d[e], "display", "");
                a.removeAttribute("data-local");
                b(a, "display", f ? "block" : "none");
                Z()
            } else {
                C = !0;
                bf()
            }
        }
    }, bk = function (a) {
        M = a.dEvent;
        if (!M)throw Error("dEvent is null.");
        j.register("forwardCount", bi);
        M.add("feed_list_forward", "click", V);
        M.add("forwardMore", "click", bj);
        M.add("feed_list_delete", "click", _)
    }, bl = function () {
        if (P) {
            clearInterval(P);
            P = null
        }
        if (y) {
            y.closeWidget();
            y.destroy();
            y = null;
            x = null
        }
        if (v) {
            clearTimeout(v);
            v = null
        }
        if (w) {
            w.destroy();
            w = null
        }
        if (s) {
            s.destroy();
            s = null
        }
        M.remove("feed_list_forward", "click", V);
        M.remove("forwardMore", "click", bj);
        M.remove("feed_list_delete", "click", _);
        p(E.btnText, "click", bd);
        j.remove("forwardCount", bi)
    }, bm = function (a) {
        u = !1;
        C = !1;
        B = !1;
        D = a;
        z = 1;
        bf()
    }, bn = {init: bk, update: bm, destroy: bl};
    return function (a) {
        bk(a);
        return bn
    }
});
STK.register("lib.photoview.source.userinfo", function (a) {
    var b = a.kit.dom.parseDOM, c = a.sizzle, d = a.kit.dom.children, e = a.core.json.merge, f = a.custEvent, g = a.lib.photoview.source, h = g.util.mix, i = '<div class="W_loading"><span>正在加载中，请稍候...</span></div>', j = function (b, c, d) {
        b && a.setStyle(b, c, d)
    }, k = function (b, c) {
        var d = parseInt(a.getStyle(b, c), 10);
        return isNaN(d) ? 0 : d
    }, l = Object.create || function (a) {
        function b() {
        }

        b.prototype = a;
        return new b
    }, m = {}, n = function (c) {
        var d = a.builder(c), e = b(d.list);
        for (var f in e)e.hasOwnProperty(f) && (m[f] = e[f]);
        return d.box
    }, o = function (a, b) {
        return c(a, b)[0]
    }, p = function () {
        function w(b) {
            a.ui.alert(b.msg);
            i = !1
        }

        function v() {
            i = !1;
            k = !0;
            m = 0;
            n = 0;
            p = 0
        }

        function u(b) {
            var c = a.builder(b);
            t(c.list);
            return c.box
        }

        function t(a) {
            a = b(a);
            for (var c in a)a.hasOwnProperty(c) && (s[c] = a[c])
        }

        var c = g.channel, f = a.common.trans.attitude, i = !1, k = !0, l = !1, m = 0, n = 0, p = 0, q = 0, r, s = {}, x = function (b) {
            var c = s.faceS, e = b.is_del;
            if (e) {
                var f = $CONFIG.uid, g = o('[uid="' + f + '"]', c);
                g && a.removeNode(g)
            } else a.insertHTML(c, b.html, "afterbegin");
            var h = b.count > 0;
            j(c, "display", h ? "block" : "none");
            j(s.faceEmpty, "display", h ? "none" : "block");
            var i = d(c);
            if (i.length >= p) {
                var k = i[i.length - 1];
                j(k, "display", e ? "block" : "none")
            }
        }, y = function (b) {
            if (!i) {
                i = !0;
                var d = o('[action-type="like"]', s.tab), g = o("em", d), j = "W_ico20", k = "icon_praised_bc", l = "icon_praised_b", m = q, n = a.hasClassName(g, k);
                j += " " + (n ? l : k);
                m = Math.max(m + (n ? -1 : 1), 0);
                q = m;
                d.title = n ? "赞" : "取消赞";
                d.innerHTML = '<em class="' + j + '"></em>' + (m > 0 ? "(" + m + ")" : "");
                c.fire("likeChanged", {isDel: n, num: m});
                var p = b && b.data || a.queryToJson(d.getAttribute("action-data"));
                p = e(p, {location: $CONFIG.location});
                h(p, {log_type: "weibo", refer_sort: "layer", location: $CONFIG.location});
                f.getTrans("miniadd", {onSuccess: function (a) {
                    i = !1;
                    var b = a.data;
                    b.count = m;
                    x(b)
                }, onFail: w, onError: w}).request(p)
            }
        }, z = function (a) {
            k && c.fire("like", a);
            return!1
        }, A = function (a, b) {
            var c = parseInt(a.page) || 1;
            if (!m || m !== c) {
                m = c;
                k = !1;
                a.type = "photolayer";
                f.getTrans("likebig", {onSuccess: function (a) {
                    k = !0;
                    var c = a.data, d = c && c.page;
                    if (d) {
                        m = d.pagenum;
                        n = d.totalpage;
                        p = d.pageRecNum;
                        q = +c.total_number || 0;
                        var e = s.panel, f = u(c.html);
                        e.innerHTML = "";
                        e.appendChild(f);
                        b && b()
                    }
                }, onFail: w, onError: w}).request(a)
            }
        }, B = function (a) {
            var b = a.data;
            b.mid || (b.mid = r);
            A(b)
        }, C, D;
        return{init: function (b) {
            var d = b.tab, e = b.panel;
            s.tab = d;
            s.panel = e;
            t(a.builder(d).list);
            C = b.dEvent;
            l = !1;
            C.add("like", "click", z);
            C.add("like_del", "click", z);
            C.add("page", "click", B);
            c.register("like", y);
            D = g.likelayer(d.firstChild, {mid: b.mid, relatedTarget: e, style: {zIndex: 10001}})
        }, load: function (b) {
            b = a.parseParam({mid: null}, b);
            var c = s.panel;
            c.innerHTML = '<div class="W_loading" style="margin:0 0 10px 8px;"><span>正在加载中，请稍候...</span></div>';
            v();
            r = b.mid;
            k = !1;
            setTimeout(function () {
                l || A(b, z)
            }, 100)
        }, destroy: function () {
            l = !0;
            D.destroy();
            c.remove("like", y);
            C.remove("like", "click", z);
            C.remove("like_del", "click", z);
            C.remove("page", "click", B)
        }}
    }(), q = function () {
        function c(c) {
            c = b(c);
            for (var d in c)c.hasOwnProperty(d) && (a[d] = c[d])
        }

        var a = {}, d = null, e = null;
        return{init: function (b) {
            d = b.dEvent;
            a.tab = b.tab;
            a.panel = b.panel
        }, load: function (b) {
            var c = w.repost_list;
            e && e.destroy();
            var f = a.panel;
            f.innerHTML = i;
            e = g.forward({dEvent: d});
            e.update({forwardBox: f, repost: c, mid: b.mid, tab: a.tab})
        }, destroy: function () {
            if (e) {
                e.destroy();
                e = null
            }
        }}
    }(), r = function () {
        function e(c) {
            var e = a.builder(c);
            d(b(e.list));
            return e.box
        }

        function d(a) {
            a = b(a);
            for (var d in a)a.hasOwnProperty(d) && (c[d] = a[d])
        }

        var c = {}, f, h;
        return{init: function (a) {
            f = a.dEvent;
            c.tab = a.tab;
            c.panel = a.panel
        }, load: function (b) {
            b = a.parseParam({mid: null, page: 1}, b);
            var d = c.panel;
            d.innerHTML = i;
            h && h.destroy();
            h = g.comment({html: w.comment_list, dEvent: f, mid: b.mid, tab: c.tab}, d)
        }, destroy: function () {
            if (h) {
                h.destroy();
                h = null
            }
        }}
    }(), s, t = !1, u, v, w, x = function (b) {
        function c(a, b) {
            return d.getDom(a)[b || 0]
        }

        var d = s;
        d && d.destroy();
        var e = "tab3";
        d = a.ui.tab({templete: b, eventType: "click", currentTab: e, currentClassName: "current", defaultClassName: ""});
        s = d;
        var g = {}, h = function (a, b) {
            var d = l(b);
            typeof d.init == "function" && d.init({mid: v, dEvent: u, tab: c(a, 0), panel: c(a, 1)});
            g[a] = d
        }, i = d.destroy;
        d.destroy = function () {
            i();
            f.undefine(d);
            f.remove(d);
            a.foreach(g, function (a) {
                a.destroy()
            });
            g = null
        };
        var j = function (a) {
            var b = c("tabarrow");
            if (b) {
                var d = c(a), e = d.offsetLeft + ~~(d.offsetWidth / 2) - 6;
                b.style.left = e + "px"
            }
        }, k = function (a) {
            var b = g[a];
            j(a);
            b.load({mid: v})
        };
        f.add(d, "tabIn", function (a, b) {
            k(b)
        });
        h("tab1", p);
        h("tab2", q);
        h("tab3", r);
        k(e);
        return d
    }, y = function (a) {
        var b = ['<div node-type="content" class="media_expand_outer">', '<div class="WB_arrow" node-type="tabarrow"><em class="S_line">◆</em><span class="S_bg">◆</span></div>', '<div class="media_expand emotion_module" node-type="tab1" style="display:none"></div>', '<div class="media_expand" node-type="tab2" style="display:none"></div>', '<div class="media_expand" node-type="tab3" style="display:none"></div>', "</div>"].join("");
        a = (a || "").replace(/>\s\s*</g, "><");
        var c = m.userinfoBox, d = a + b;
        c.innerHTML = "";
        c.appendChild(n(d));
        x(m.userinfoBox)
    }, z = function () {
        if (s) {
            s.destroy();
            s = null
        }
    }, A = function (a) {
        var b = m.userinfoBox;
        b && (b.innerHTML = a)
    }, B = function (b) {
        var c = '<div node-type="scroller" class="scroller_box"><div node-type="userinfoBox" class="inner_box"></div></div>';
        b.innerHTML = "";
        b.appendChild(n(c));
        u = a.delegatedEvent(b)
    }, C = function (a, b) {
        if (!b)A("抱歉，此微博已被删除。"); else {
            w = b;
            v = a;
            y(b.mblog.html)
        }
    }, D = {update: C, setLoading: function (a) {
        if (!a || !t) {
            z();
            t = a;
            A(a ? i : "")
        }
    }, resize: function (a) {
        var b = m.scroller, c = k(b, "marginTop") + k(b, "marginBottom") + k(b, "borderTopWidth") + k(b, "borderBottomWidth") + k(b, "paddingTop") + k(b, "paddingBottom");
        j(b, "height", Math.max(a.height - c, 0) + "px")
    }, destroy: function () {
        z();
        if (u) {
            u.destroy();
            u = null
        }
    }};
    return function (a) {
        B(a);
        return D
    }
});
STK.register("lib.photoview.source.recommonedlayer", function (a) {
    function g(b, c) {
        c = c || window;
        var d = f(b), e = f(c), g = (e.width - d.width) / 2, h = (e.height - d.height) / 2;
        c === window && (h += a.scrollPos().top);
        b.style.top = (h > 0 ? h : 0) + "px";
        b.style.left = (g > 0 ? g : 0) + "px"
    }

    function f(b) {
        if (b === window)return a.winSize();
        var c, d, e = b.style;
        if (e.display === "none") {
            e.visibility = "hidden";
            e.display = "";
            c = b.offsetWidth;
            d = b.offsetHeight;
            e.display = "none";
            e.visibility = "visible"
        } else {
            c = b.offsetWidth;
            d = b.offsetHeight
        }
        return{width: c, height: d}
    }

    function e(b, c) {
        a.foreach(c, function (c, d) {
            a.setStyle(b, d, c)
        })
    }

    var b = a.tween, c = a.lib.photoview.source, d = c.eventemiter;
    return function (c) {
        function y() {
            if (!!q) {
                w();
                f.destroy();
                z.removeEvents();
                a.removeNode(i);
                q = !1;
                i = null;
                k = null
            }
        }

        function x() {
            h || g(i, k)
        }

        function w() {
            z.un("load");
            if (!s && !h) {
                a.removeEvent(document, "click", n);
                s = !0;
                b(i, {duration: 300, animationType: "easeoutcubic", end: function () {
                    h = !0;
                    u();
                    i.style.visibility = "hidden";
                    a.removeNode(i)
                }}).play({opacity: 0}).destroy()
            }
        }

        function p(b, c) {
            var d = function (b) {
                o = !1;
                a.ui.alert(b.msg)
            };
            o = !0;
            a.common.trans.photoview.getTrans("poprecomalbum", {onComplete: a.funcEmpty, onSuccess: function (a) {
                o = !1;
                var b = a.data;
                b && c(b)
            }, onFail: d, onError: d}).request(b)
        }

        function n(b) {
            b = a.fixEvent(b);
            var c = k, d = b.target;
            c !== d && !a.contains(c, d) && a.contains(document.body, d) && w()
        }

        function m(b) {
            f = b || a.delegatedEvent(i);
            f.add("close", "click", function (b) {
                w();
                a.stopEvent(b.evt);
                return!1
            });
            f.add("refresh", "click", function (b) {
                w();
                z.fire("refresh", b);
                a.stopEvent(b.evt);
                return!1
            });
            return f
        }

        function l(b) {
            var c = '<div class="layer_album_end"><table><tbody><tr><td>' + b + "</td></tr></tbody></table>" + "</div>", d = a.insertHTML(j, c);
            i = d;
            m();
            return d
        }

        var f = null, h = !0, i = null, j = c, k = c, o = !1, q = !1, r = !1, s = !1, t = {}, u = function () {
            s = !1
        }, v = function (c) {
            if (!(s || !h || o || r)) {
                var d = function () {
                    h = !1;
                    i.parentNode !== k && k.appendChild(i);
                    x();
                    e(i, {visibility: "visible", opacity: 0});
                    a.addEvent(document, "click", n);
                    s = !0;
                    b(i, {duration: 300, animationType: "easeoutcubic", end: u}).play({opacity: 1}).destroy()
                };
                if (!q) {
                    z.once("load", d);
                    p(c, function (a) {
                        var b = a.html;
                        if (b) {
                            q = !0;
                            i = l(b);
                            e(i, {display: "block", visibility: "hidden"});
                            r = !0;
                            setTimeout(function () {
                                r = !1;
                                z.fire("load")
                            }, 300)
                        }
                    })
                } else d()
            }
        }, z = d.extend({show: v, hide: w, resize: x, destroy: y});
        return z
    }
});
STK.register("lib.photoview.index", function (a) {
    function B(a, b) {
        return i(a, {size: b || "mw1024"})
    }

    function A(a, b) {
        return(a = String(a)) ? a.replace(z, function (a) {
            var c = a.length, d = a.substring(1, c - 1), e = b[d];
            return e === undefined ? a : e
        }) : a
    }

    function y(a, b) {
        "use strict";
        if (a.map)return a.map(b);
        if (typeof b != "function")throw TypeError("map need a function");
        var c = a, d = c.length >>> 0, e = Array(d);
        for (var f = 0; f < d; f++)f in c && (e[f] = b.call(null, c[f], f, c));
        return e
    }

    function x(a, b) {
        return c(a, b || 1)
    }

    var b = a.common.feed.feedList.imageLikeWhiteList(), c = window.setTimeout, d = a.lib.photoview.source, e = d.channel, f = a.common.trans.photoview, g = d.util, h = a.ui.alert, i = a.common.extra.imageURL, j = a.preventDefault, k = a.funcEmpty, l = a.tween, m = a.setStyle, n = a.addClassName, o = a.kit.extra.language, p = g.throttle, q = g.debounce, r = g.mix, s = Math.max, t = Math.min, u = function (a, b) {
        var c = a.length;
        while (c--)if (b(a[c]))return c;
        return-1
    }, v = function (b, c) {
        var d = 0;
        switch (c) {
            case"height":
                d = b.offsetHeight;
                break;
            case"width":
                d = b.offsetWidth
        }
        d || (d = parseInt(a.getStyle(b, c), 10));
        return isNaN(d) ? 0 : d
    }, w = function (b) {
        var c = window.console;
        c && c.error ? c.error(b) : a.log(b)
    }, z = /\{\w[\w.]*?\}/g, C = '<#et temp data><div class="layer_multipic_preview" node-type="outer"><div node-type="box" class="multipic_preview"><a role="button" action-type="close" href="#" class="close" title="#L{关闭}">&times;</a><div node-type="scroller" class="scroller"><div node-type="inner" class="inner clearfix"><div node-type="userinfo" class="info_box W_fr"></div><div node-type="desktop" class="pic_box"><div node-type="display" class="pic_show_box"><div node-type="loader" class="pic"></div><div node-type="wrapIcon" class="pos_icon">' + (b ? '<div class="pos_margin" node-type="likeBtn" action-type="image_like" action-data="mid=${data.mid}&photo_id=${data.pid}&is_liked=${data.is_liked}&count=${data.count}&object_id=${data.object_id}"><#if (data.is_liked)><a href="javascript:" class="W_btn_alpha" title="#L{取消赞}"><i class="icon_praised"></i><span node-type="count">(${data.count})</span></a><#else><a href="javascript:" class="W_btn_alpha" title="#L{赞}"><i class="icon_praise"></i><span node-type="count">(${data.count})</span></a></#if></div>' : "") + '<a node-type="togglesize" action-type="togglesize" href="javascript:" class="W_btn_alpha"><i class="icon_narrow"></i><span>#L{适应页面}</span></a>' + '<a node-type="maximum" action-type="maximum" href="javascript:" class="W_btn_alpha" title="#L{查看原图}"><i class="icon_maximum"></i><span>#L{查看原图}</span></a>' + "</div>" + "</div>" + '<div node-type="carousel" class="pic_choose_box">' + '<div node-type="prev" class="arrow_boxL"><a href="javascript:;" class="arrow_left_small" title="#L{上一页}"><em class="ico_pic_prev">&lt;</em></em></a></div>' + '<div node-type="clip" class="stage_box"><ul node-type="list" class="choose_box clearfix"></ul></div>' + '<div node-type="next" class="arrow_boxR"><a href="javascript:;" class="arrow_right_small" title="#L{下一页}"><em class="ico_pic_next">&gt;</em></em></a></div>' + "</div>" + "</div>" + "</div>" + "</div>" + "</div>" + "</div>" + "</#et>", D = !1, E = !1, F, G, H, I, J = null, K, L, M, N, O, P, Q, R, S, T = !1, U, V, W, X, Y, Z, $ = function (b) {
        var c, e = p(function (a) {
            !T && K[a] && i(a) && bk(K[a], k, a)
        }, 300), f = function () {
            c && clearTimeout(c);
            c = x(function () {
                e(j())
            }, 1e3)
        }, g = function () {
            var a = 2, b = 3, c = 0, d = [], e = {};
            F.on("hide", function () {
                e = {};
                d = []
            });
            var f = function (a) {
                var b = new Image;
                c++;
                e[a] = 1;
                b.onload = b.onerror = function () {
                    b = b.onload = b.onerror = null;
                    c--;
                    g()
                };
                b.src = a
            }, g = function () {
                var b;
                while (c < a && d.length) {
                    b = d.pop();
                    e[b] || f(b)
                }
            }, h = function () {
                c = 0;
                g()
            }, i = function (a) {
                return B(a.data.pid)
            };
            return function () {
                var a = t.get("numItems"), c = t.get("selectedItem"), e = b, f = 0, g = 0;
                c === -1 && (c = 0);
                f = c - e;
                f = f > 0 ? f : 0;
                g = c + e + 1;
                g = g > a ? a : g;
                d = y(t.slice(f, g), i);
                h()
            }
        }(), h = function () {
            if (Z) {
                U ? Z.innerHTML = +(V || 0) != 0 ? o('<a href="javascript:" class="W_btn_alpha" title="#L{取消赞}"><i class="icon_praised"></i><span>(' + (V || 0) + ")</span></a>") : o('<a href="javascript:" class="W_btn_alpha" title="#L{取消赞}"><i class="icon_praised"></i></a>') : Z.innerHTML = +(V || 0) != 0 ? o('<a href="javascript:" class="W_btn_alpha" title="#L{赞}"><i class="icon_praise"></i><span>(' + (V || 0) + ")</span></a>") : o('<a href="javascript:" class="W_btn_alpha" title="#L{赞}"><i class="icon_praise"></i></a>');
                Z.setAttribute("action-data", "mid=" + X + "&photo_id=" + Y + "&is_liked=" + U + "&count=" + (V || 0) + "&object_id=" + W)
            }
        }, i = function (a) {
            var b = t.get("firstVisible"), c = t.get("scrollIncrement");
            if (a === "next") {
                var d = t.get("numItems"), e = t.get("numVisible"), f = b + e;
                f = f > d - 1 ? d - 1 : f;
                return f + c >= d
            }
            return b - c <= 0
        }, j = function () {
            var a = t.get("firstVisible"), b = t.get("selectedItem"), c = t.get("numItems"), d = a + t.get("numVisible");
            d = d > c - 1 ? c - 1 : d;
            return d - b < b - a ? "next" : "prev"
        }, n = function () {
            return!K.next
        }, q = function () {
            return!!K.prev || !t.isBOF()
        }, r = function () {
            return!!K.next || !t.isEOF()
        }, s = function () {
            g();
            h()
        }, t = d.carousel(b, {itemSize: 60, itemMargin: 5, numVisible: 20, scrollIncrement: 10, itemTemplate: '<a href="javascript:;" suda-uatrack="key=tblog_newimage_feed&value=left_right_nextpage"><img src="about:blank"></a>', CLASSES: {SELECTED_ITEM: "current", PREV_DISABLED: "btn_pic_prevdis", NEXT_DISABLED: "btn_pic_nextdis"}}).on("itemLoad",function (b, c) {
            var d = c.data, e = c.prev, f = c.next, g = d.data, h = g.pid, i = d.el, j = B(h, "square"), k = new Image;
            k.onload = k.onerror = function () {
                var b = a.sizzle("img", i)[0];
                k = k.onload = k.onerror = null;
                b.src = j;
                b = null
            };
            k.src = j
        }).on("itemSelected",function (a, b) {
            var c = b.data, d = c.pid, e = c.mid, g = B(d);
            U = +c.is_liked, V = c.likecount, W = c.object_id;
            X = e, Y = d;
            G.load(g, s);
            f();
            bn(c)
        }).on("afterScroll",function (a, b) {
            var c = b.dir === "forward" ? "next" : "prev";
            e(c)
        }).on("itemsRemoved", function () {
            var a = "next", b = K[a];
            if (!b) {
                a = "prev";
                b = K[a];
                b || (a = "")
            }
            !T && a && i(a) && bk(b, function () {
                t.flush()
            }, a)
        });
        t.set("prevStateFn", q);
        t.set("nextStateFn", r);
        t.set("prevClick", function (a) {
            e("prev")
        });
        t.set("nextClick", function (a) {
            e("next")
        });
        var u = !1, w = !1, z = {duration: 300, animationType: "easeoutcubic", end: function () {
            w = !1
        }}, A = p(function (a) {
            if (!w && !!u) {
                var b = a.get("element"), c = v(b, "height");
                u = !1;
                w = !0;
                var d = function () {
                    m(b, "bottom", 0 - c + "px");
                    l(b, z).play({bottom: 0, opacity: 1}).destroy()
                };
                a.isAnimating() ? a.once("afterScroll", d) : d()
            }
        }, 400), C = p(function (a, b) {
            if (!w && !u) {
                var c = a.get("element"), d = v(c, "height");
                u = !0;
                if (!b) {
                    w = !0;
                    var e = function () {
                        m(c, "bottom", 0);
                        l(c, z).play({bottom: 0 - d, opacity: 0}).destroy()
                    };
                    a.isAnimating() ? a.once("afterScroll", e) : e()
                } else m(c, "bottom", 0 - d + "px")
            }
        }, 400);
        t.toggle = function (a, b) {
            a ? A(t) : C(t, b)
        };
        t.isEnd = function () {
            if (n()) {
                var a = t.get("numItems"), b = t.get("selectedItem");
                return a && t.isEOF() && b === a - 1
            }
            return!1
        };
        t.preload = function () {
            f()
        };
        return t
    }, _ = function (b, c) {
        var e = !0, f = null, g = !1, h = F.getDom("maximum"), i = F.getDom("togglesize"), j = F.getDom("wrapIcon");
        Z = F.getDom("likeBtn");
        var k = function (a) {
            g = a;
            var b = a ? "" : "none";
            m(j, "display", b)
        }, l = function (b) {
            f = b;
            var c = b.width + bb, d = b.height;
            if (e) {
                var g = F.get("limits"), h = F.get("screen"), j = F.get("size"), k = a.winSize(), l = c, m = d, n = g.minWidth, p = k.width - F.getOffset("x");
                c = s(t(c, g.maxWidth), n);
                c = s(c, j[0]);
                c >= n && c > p && (c = p);
                if (c < l) {
                    var q = (l - 290) / m;
                    d = (c - 290) / q
                }
                d = s(d, h[1]);
                F.setSize(c, d)
            } else F.resize();
            i.title = o(e ? "#L{适应页面}" : "#L{放大图片}");
            a.sizzle("i", i)[0].className = e ? "icon_narrow" : "icon_enlarge";
            a.sizzle("span", i)[0].innerHTML = o(e ? "#L{适应页面}" : "#L{放大图片}")
        }, n = function (b) {
            var c = b.relatedTarget, d = b.fromElement;
            if (!c || d && d === b.target) {
                c = b.toElement || d;
                b.relatedTarget = c
            }
            return c == null ? !0 : c ? c !== this && c.prefix !== "xul" && this !== document && !a.contains(this, c) : !1
        }, u = function (a, b) {
            n.call(a.currentTarget || this, a) && bd[b ? "stop" : "start"]()
        }, w = function (a) {
            u.apply(this, [a, !1])
        }, x = function (a) {
            u.apply(this, [a, !0])
        }, y = d.imagedisplay(b, c).on("show",function () {
            var b = H && H.get("element");
            if (b) {
                a.addEvent(b, "mouseout", w);
                a.addEvent(b, "mouseover", x);
                y.once("hide", function () {
                    a.removeEvent(b, "mouseout", w);
                    a.removeEvent(b, "mouseover", x)
                })
            }
        }).on("navigate",function (a, b) {
            var c = b.dir, d = -1;
            d = H.get("selectedItem") + (c === "left" ? -1 : 1);
            if (c !== "left" && !be() && H.isEnd()) {
                bf();
                H.once("itemSelected", bg)
            }
            d > -1 && H.setSelectedItem(d);
            ba("left_right_nextpage")
        }).on("load",function (a, b) {
            l(b)
        }).on("hide",function (a) {
            e = !0
        }).on("mousemove", p(function (a, c) {
            var d = 95, e = v(b, "height"), f = c.y > e - d ? 1 : 0;
            bd[f ? "show" : "start"]();
            g || k(1)
        }, 50)).on("mouseout",function (b, c) {
            k(0);
            var d = c.relatedTarget, e = H.get("element");
            e && (d === e || a.contains(e, d)) && bd.stop()
        }).on("mouseover", q(function (a, b) {
            k(1)
        }, 90)), z = F.getDelegate();
        z.add("maximum", "click", function (a) {
            var b = r({}, S), c = A("http://photo.weibo.com/{uid}/wbphotos/large/mid/{mid}/pid/{pid}", b);
            window.open(c);
            return!1
        });
        var B = function (a) {
            if (f) {
                e = !e;
                l(f)
            }
        };
        z.add("togglesize", "click", function () {
            B()
        });
        var C = function (b) {
            var c = b.el, d = a.core.json.merge(b.data, {location: $CONFIG.location, object_type: "pic", ref: "layer"});
            a.common.trans.feed.attitude.getTrans("objLike", {onSuccess: function (b) {
                var e = b.data.is_del ? !0 : !1, f = d.count;
                e ? f-- : f++;
                var g = f > 0 ? f : 0, h;
                e ? h = g != 0 ? o('<a class="W_btn_alpha" title="#L{赞}" href="javascript:"><i class="icon_praise"></i><span>(' + g + ")</span></a>") : o('<a class="W_btn_alpha" title="#L{赞}" href="javascript:"><i class="icon_praise"></i></a>') : h = g != 0 ? o('<a class="W_btn_alpha" title="#L{取消赞}" href="javascript:"><i class="icon_praised"></i><span>(' + g + ")</span></a>") : o('<a class="W_btn_alpha" title="#L{取消赞}" href="javascript:"><i class="icon_praised"></i></a>');
                c.innerHTML = h;
                var i = a.kit.extra.actionData(c);
                i.set("count", g);
                i.set("is_liked", e ? 0 : 1);
                H.rewriteItem({is_liked: e ? "0" : "1", count: g})
            }, onFail: function (b) {
                a.common.layer.ioError(b.code, b)
            }, onError: function (b) {
                a.common.layer.ioError(b.code, b)
            }}).request(d)
        };
        z.add("image_like", "click", C);
        return y
    }, ba = function (a, b) {
        if (!b) {
            b = a;
            a = "tblog_newimage_feed"
        }
        var c = window.SUDA;
        c && c.uaTrack && c.uaTrack(a, b)
    }, bb = 290, bc = function (b, c) {
        D = !0;
        F = d.overlayer(C, {limits: {maxWidth: 1314, maxHeight: 710, minWidth: 740, minHeight: 400}, offset: [0, 35], style: {zIndex: 1e4}, pid: c.pid, mid: c.mid, pic_objects: c.pic_objects});
        var e = F.getOuter(), f = F.getDom("count");
        f && f.innerHTML == "(0)" && a.removeNode(f);
        var g = 0;
        F.on("resize", function (a, b) {
            var c = b.width - bb, d = b.height, e = F.getDom("desktop");
            m(e, "width", c + "px");
            m(e, "height", d + "px");
            var f = F.getOuter();
            f.scrollTop = 0;
            if (g !== c) {
                g = c;
                H.resize()
            }
            G.resize(c, d);
            I.resize(b);
            J && J.resize()
        });
        F.on("hide", function () {
            bo();
            G.hide();
            H.toggle(0, !0);
            H.clear();
            bg()
        });
        G = _(F.getDom("display"), e);
        H = $(F.getDom("carousel"));
        I = d.userinfo(F.getDom("userinfo"));
        F.once("destroy", function () {
            F.hide();
            H.destroy();
            G.destroy();
            I.destroy();
            F = null;
            H = null;
            I = null;
            G = null
        })
    }, bd = function () {
        function e() {
            a || (a = c(function () {
                H.toggle(0);
                a = null
            }, 3e3))
        }

        function d() {
            if (E) {
                b();
                H.toggle(1);
                e()
            }
        }

        function b() {
            if (a) {
                clearTimeout(a);
                a = null
            }
        }

        var a = null, f = function () {
            d()
        };
        r(f, {show: d, start: e, stop: b});
        return f
    }(), be = function () {
        return!!S.multiuser
    }, bf = function () {
        if (!J) {
            J = d.recommonedlayer(F.getDom("desktop"));
            J.on("refresh", function () {
                H.setSelectedItem(0)
            })
        }
        J.show({uid: S.uid})
    }, bg = function () {
        J && J.hide()
    }, bh = function (a) {
        var b = S.pid, c = S.mid, d = u(a, function (a) {
            return a.pid === b && a.mid === c
        });
        d === -1 && (d = 0);
        H.set("selectedItem", d);
        H.flush()
    }, bi = function (a, b) {
        D || bc(document.body, a);
        bo(a);
        F.show();
        a = r({mid: "", pid: "", type: 0, uid: $CONFIG.uid, page_id: $CONFIG.page_id}, a);
        S = a;
        G.load(B(a.pid));
        E = !1;
        H.render();
        H.toggle(!1, !0);
        I.setLoading(1);
        bk(a, function (a) {
            if (a) {
                bh(a.pic_list);
                E = !0;
                bd()
            }
        })
    }, bj = function () {
        if (D) {
            D = !1;
            F.destroy();
            F = null
        }
    }, bk = function (a, b, d) {
        if (!T) {
            var e = function () {
                c(function () {
                    T = !1
                }, 500)
            }, g = function (a) {
                e();
                w(a)
            };
            a.uid = S.uid;
            var h = !1;
            T = !0;
            (function i(a, b) {
                f.getTrans("list", {onError: g, onFail: g, onComplete: k, onSuccess: function (a) {
                    if (!(a = a.data)) {
                        if (!h) {
                            K = {prev: 0, next: 0};
                            h = !0;
                            var c = {type: 0, mid: Q, pid: R, uid: S.uid};
                            i(c, function (a) {
                                a && bh(a.pic_list)
                            });
                            return
                        }
                    } else {
                        bl({prev: a.pic_prev, next: a.pic_next, direction: d});
                        (h || !d) && H.clear();
                        H.addItems(a.pic_list, d === "prev");
                        b && b(a)
                    }
                    e()
                }}).request(a)
            })(a, b)
        }
    }, bl = function (a) {
        var b = a.direction, c = a.prev, d = a.next, e = -1;
        b === "next" && (c = e);
        b === "prev" && (d = e);
        c !== e && (K.prev = c);
        d !== e && (K.next = d)
    }, bm = function (a) {
        Q = a.mid;
        R = a.pid
    }, bn = function (a) {
        if (!!a.mid) {
            r(S, a);
            x(function () {
                bs(a)
            })
        }
    }, bo = function (a) {
        P = "";
        Q = "";
        R = "";
        K = {prev: 0, next: 0};
        L = {};
        M = {};
        N = {};
        O = {};
        T = !1;
        var b = decodeURIComponent(a.pic_objects);
        b = b.split(",");
        var c = [], d = [], e = [], f = [];
        for (var g = 0, h = b.length; g < h; g++) {
            var i = b[g];
            i = i.split("|");
            c.push(i[0]);
            d.push(i[1]);
            e.push(i[2]);
            f.push(i[3])
        }
        var j = 0;
        for (var k = 0, l = c.length; k < l; k++)if (c[k] == a.pid) {
            j = k;
            break
        }
        if (Z) {
            +d[j] ? Z.innerHTML = +(e[j] || 0) != 0 ? o('<a href="javascript:" class="W_btn_alpha" title="#L{取消赞}"><i class="icon_praised"></i><span>(' + (e[j] || 0) + ")</span></a>") : o('<a href="javascript:" class="W_btn_alpha" title="#L{取消赞}"><i class="icon_praised"></i></a>') : Z.innerHTML = +(e[j] || 0) != 0 ? o('<a href="javascript:" class="W_btn_alpha" title="#L{赞}"><i class="icon_praise"></i><span>(' + (e[j] || 0) + ")</span></a>") : o('<a href="javascript:" class="W_btn_alpha" title="#L{赞}"><i class="icon_praise"></i></a>');
            Z.setAttribute("action-data", "mid=" + a.mid + "&photo_id=" + (c[j] || a.pid) + "&is_liked=" + d[j] + "&count=" + (e[j] || 0) + "&object_id=" + f[j])
        }
    }, bp = function (a) {
        r(L, a.mblog_list);
        r(M, a.comment_list);
        r(N, a.mblog_like_list);
        r(O, a.repost_list)
    }, bq = function (a) {
        return L[a] ? {mid: a, mblog: L[a], like_list: N[a], comment_list: M[a], repost_list: O[a]} : null
    }, br = function (a, b, c) {
        f.getTrans("bloginfo", {onComplete: k, onError: c, onFail: c, onTimeout: c, onSuccess: b}).request({mids: a})
    }, bs = function (a) {
        var b = a.mid, c = a.pid;
        if (P !== b) {
            P = b;
            var d = function (a, b) {
                try {
                    I.setLoading(0);
                    I.update(a, b)
                } catch (c) {
                }
            }, e = function (a, b) {
                d(a, null);
                H.removeItems(H.filter(function (b) {
                    return b.data.mid === a
                }))
            }, f = !1, g = bq(b);
            if (g && f)d(b, g); else {
                I.setLoading(1);
                br(b, function (a) {
                    var f = a.data, g = f.mblog_list, h = g && g.hasOwnProperty(b);
                    h && bp(f);
                    x(function () {
                        if (b === P)if (h) {
                            bm({mid: b, pid: c});
                            d(b, bq(b))
                        } else e(b, f)
                    })
                })
            }
        }
    }, bt = !1;
    return{show: function (a, b) {
        if (bt)return!1;
        var c = a.mid;
        br(c, function (d) {
            bt = !1;
            var e = d.data, f = e.mblog_list, g = f && f.hasOwnProperty(c);
            g ? bi(a, b) : h(o("#L{抱歉，此微博已被删除}。"))
        }, function () {
            bt = !1
        })
    }, hide: function () {
        F && F.hide()
    }, destroy: bj}
});
STK.register("common.feed.feedList.plugins.photoview", function (a) {
    return function (b, c) {
        if (!b)a.log("photoview: Illegal argument"); else {
            var d = {}, e = a.lib.photoview.index, f = b.getNode(), g = b.getDEvent(), h = function (b) {
                var c = b.evt, d = b.data;
                a.preventDefault(c);
                e.show(d, c)
            };
            g.add("images_view_tobig", "click", h);
            d.destroy = function () {
                g.remove("images_view_tobig", "click", h);
                e.destroy()
            };
            return d
        }
    }
});
STK.register("common.feed.feedList.plugins.spreadFeed", function (a) {
    var b = a.common.feed.feedList.utils, c = a.common.channel.feed;
    return function (d, e) {
        if (!d)a.log("favorite : need object of the baseFeedList Class"); else {
            var f = d.getNode(), g = {}, h = 1, i, j = function (b, c) {
                var d = a.kit.dom.parentElementBy(b, c, function (a) {
                    if (a.getAttribute("node-type") == "feed_spread")return!0
                });
                return d
            }, k = {myPage: {}, getKey: function (b) {
                var c;
                if (!b._currKey) {
                    c = a.getUniqueKey();
                    b._currKey = c
                } else c = b._currKey;
                return c
            }, getPage: function (a) {
                var b = k.getKey(a), c = 1;
                k.myPage[b] ? c = k.myPage[b] : k.setPage(a, c);
                return c
            }, setPage: function (a, b) {
                var c = k.getKey(a);
                k.myPage[c] = b
            }}, l = function (b) {
                b.style.overflow = "hidden";
                b.style.position = "relative";
                var e = a.tween(b, {end: function () {
                    b.innerHTML = "";
                    a.removeNode(b);
                    b = null;
                    e.destroy();
                    d.getFeedCount() < 1 && window.location.reload()
                }}).play({height: 0});
                c.fire("delete")
            }, m = function (b, c) {
                var d = a.sizzle("[node-type='feed_spread_list']", c), e = d[0], f = d.length, g = -e.offsetWidth, j = b == "2" ? 2 : 3;
                h = k.getPage(c);
                var l = a.sizzle("[node-type='feed_spread_contain']", c)[0];
                if (i == undefined) {
                    var m = a.getStyle(l, "marginLeft"), n = parseFloat(m);
                    n.toString() != "NaN" ? i = n : i = 0
                }
                var o = g * (h - 1) * j + i, p = Math.ceil(f / j);
                h == p && p != 1 && (o = o + (b == "2" ? 51 : 75));
                var q = a.tween(l, {end: function () {
                    q.destroy();
                    var a = o + "px";
                    h == 1 && (a = "");
                    l && (l.style.marginLeft = a)
                }}).play({marginLeft: o})
            }, n = function (b, c) {
                h = k.getPage(c);
                if (!!c) {
                    var d = b == "2" ? 2 : 3, e, f = ['<ul class="WB_sld_ctrl">'], g = a.sizzle("[node-type='feed_spread_list']", c).length, i = a.sizzle("[node-type='feed_spread_pagePrev']", c)[0], j = a.sizzle("[node-type='feed_spread_pageNext']", c)[0], m = a.sizzle("[node-type='feed_spread_page']", c)[0];
                    if (g == 0)l(c); else {
                        e = Math.ceil(g / d);
                        if (h > e) {
                            h = parseInt(e);
                            k.setPage(c, h)
                        }
                        if (e > 1) {
                            if (h == 1) {
                                i && (i.style.display = "none");
                                f.push('<li><a class="W_ico16 icon_sld_lft_dis" href="javascript:void(0);"></a></li>')
                            } else {
                                i && (i.style.display = "none");
                                f.push('<li action-type="feed_spread_pagePrev" action-data="page=' + (h - 1) + "&type=" + b + '"><a class="W_ico16 icon_sld_lft" href="javascript:void(0);"></a></li>')
                            }
                            for (var n = 1; n <= e; n++)n == parseInt(h) ? f.push('<li><span class="W_ico12 icon_dotyl"></span></li>') : f.push('<li action-type="feed_spread_page" action-data="page=' + n + "&type=" + b + '"><span class="W_ico12 icon_dotgy"></span></li>');
                            if (h == e) {
                                j && (j.style.display = "none");
                                i && (i.style.display = "");
                                f.push('<li><a class="W_ico16 icon_sld_rgt_dis" href="javascript:void(0);"></a></li>')
                            } else {
                                j && (j.style.display = "");
                                f.push('<li action-type="feed_spread_pageNext" action-data="page=' + (h + 1) + "&type=" + b + '"><a class="W_ico16 icon_sld_rgt" href="javascript:void(0);"></a></li>')
                            }
                            f.push("</ul>");
                            m && (m.innerHTML = f.join(""))
                        } else {
                            i && (i.style.display = "none");
                            j && (j.style.display = "none");
                            m && (m.innerHTML = "")
                        }
                    }
                }
            };
            d.getDEvent().add("feed_spread_page", "click", function (a) {
                var c = j(a.el, f), d = a.data;
                k.setPage(c, parseInt(d.page));
                n(d.type, c);
                m(d.type, c);
                return b.preventDefault(a.evt)
            });
            d.getDEvent().add("feed_spread_pagePrev", "click", function (a) {
                var c = a.data, d = j(a.el, f);
                h = k.getPage(d);
                if (!(h <= 1)) {
                    k.setPage(d, h - 1);
                    n(c.type, d);
                    m(c.type, d);
                    return b.preventDefault(a.evt)
                }
            });
            d.getDEvent().add("feed_spread_pageNext", "click", function (c) {
                var d = c.data, e = a.sizzle("[node-type='feed_spread_list']", l).length, g = d.type == "2" ? 2 : 3, i = Math.ceil(e / g), l = j(c.el, f);
                h = k.getPage(l);
                if (!(h >= i)) {
                    k.setPage(l, h + 1);
                    n(d.type, l);
                    m(d.type, l);
                    return b.preventDefault(c.evt)
                }
            });
            d.getDEvent().add("feed_spread_close", "click", function (c) {
                var d = c.el, e = j(d, f), g = c.data, h = a.kit.dom.parentElementBy(d, e, function (a) {
                    if (a.getAttribute("node-type") == "feed_spread_list")return!0
                });
                a.common.trans.feed.getTrans("delSpread", {onSuccess: function () {
                    h && (h.style.overflow = "hidden");
                    var b = STK.core.util.browser;
                    if (b.IE6 || b.IE7 || b.IE8) {
                        d.parentNode.style.position = "static";
                        a.removeNode(d)
                    }
                    var c = a.sizzle("[node-type='feed_spread_list']", e).length;
                    if (c == 1)l(e); else var f = a.tween(h, {end: function () {
                        f.destroy();
                        var b = a.tween(h, {end: function () {
                            b.destroy();
                            h && a.removeNode(h);
                            if (c > 0) {
                                n(g.type, e);
                                m(g.type, e)
                            } else l(e)
                        }, duration: 500}).play({width: 0})
                    }, duration: 200}).play({opacity: 0})
                }, onFail: function (b) {
                    a.common.layer.ioError(b.code, b)
                }, onError: function (b) {
                    a.common.layer.ioError(b.code, b)
                }}).request(g);
                return b.preventDefault(c.evt)
            });
            g.destroy = function () {
            };
            return g
        }
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
STK.register("common.dialog.popularizeLayer", function (a) {
    return function (b) {
        var c = a.kit.extra.language, d = a.parseParam({src: "http://promote.vip.weibo.com/promote?from=promote_home", isHold: !0, width: "460", height: "367", mid: "", title: c("#L{粉丝头条}"), succCallback: a.core.func.empty, failCallback: a.core.func.empty}, b || {}), e, f, g = "http://weibo.com", h = {}, i = function (b) {
            var c = "popularizeLayer_" + a.getUniqueKey(), h = decodeURIComponent(d.src) + "&mid=" + d.mid + "&rnd=" + a.getUniqueKey() + "&ru=" + g, i = a.builder('<iframe id="' + c + '" name="' + c + '" node-type="frame" width="' + d.width + '" height="' + d.height + '" allowtransparency="true" scrolling="no" frameborder="0" ></iframe>');
            e.setTitle(d.title);
            e.setContent(i.box);
            e.show().setMiddle();
            var j = a.E(c);
            setTimeout(function () {
                j.setAttribute("_src", h);
                f = a.lib.connect.iframe(j);
                f.on("setHeight", function (a, b, c, d) {
                    var f = c;
                    if (!!f) {
                        f = (f | 0) + "px";
                        b.style.height != f && (b.style.height = f);
                        e.show().setMiddle();
                        d("callback")
                    }
                })
            }, 200);
            j.attachEvent ? j.attachEvent("onload", function () {
                j.height = d.height;
                e.setMiddle()
            }) : j.onload = function () {
                j.height = d.height;
                e.setMiddle()
            }
        }, j = function () {
            e = a.ui.dialog(d)
        }, k = function () {
            f && f.destroy && f.destroy();
            e && e.destroy && e.destroy()
        };
        j();
        h.show = i;
        h.destroy = k;
        return h
    }
});
STK.register("common.dialog.popularizeEffect", function (a) {
    var b = !1, c = a.kit.extra.language;
    return function (d) {
        var e = a.parseParam({mid: ""}, d || {}), f = a.ui.dialog({isHold: !0}), g = a.delegatedEvent(f.getOuter()), h = {}, i = function () {
            if (!b) {
                b = !0;
                f.setTitle(c("#L{推广效果}"));
                a.common.trans.feed.request("popularizeEffect", {onSuccess: function (c) {
                    f.setContent(c.data.html);
                    f.show().setMiddle();
                    var d = f.getOuter(), e = a.sizzle('[action-type="widget_publish"]', d);
                    a.addEvent(e[0], "click", l);
                    b = !1
                }, onFail: function (c) {
                    f.destroy();
                    a.common.layer.ioError(c.code, c);
                    b = !1
                }, onError: function (c) {
                    f.destroy();
                    a.common.layer.ioError(c.code, c);
                    b = !1
                }}, {mid: e.mid})
            }
        }, j = function (b) {
            var c = a.common.dialog.popularizeLayer({mid: e.mid});
            c.show();
            g.remove("fl_pop", "click", j)
        }, k = function (b) {
            g.remove("widget_publish", "click", k);
            b.data.title = b.data.title && decodeURIComponent(b.data.title) || "";
            b.data.content = b.data.content && decodeURIComponent(b.data.content) || "";
            a.common.dialog.publish().show(b.data)
        }, l = function (a) {
            setTimeout(function () {
                f.destroy()
            }, 1)
        };
        g.add("fl_pop", "click", j);
        g.add("widget_publish", "click", k);
        var m = function () {
            g.remove("fl_pop", "click", j);
            g.remove("widget_publish", "click", k);
            f.destroy()
        };
        h.show = i;
        h.destroy = m;
        return h
    }
});
STK.register("lib.feed.plugins.popularize", function (a) {
    return function (b) {
        var c = b.getDEvent(), d = {}, e, f, g = function (b) {
            var c = b.data.mid || i(b.el);
            e = a.common.dialog.popularizeLayer({mid: c});
            e.show()
        }, h = function (b) {
            var c = b.data.mid || i(b.el);
            f = a.common.dialog.popularizeEffect({mid: c});
            f.show()
        }, i = function (b) {
            var c = a.core.dom.neighbor(b).parent('[action-type="feed_list_item"]').finish();
            return c.getAttribute("mid")
        };
        c.add("fl_pop", "click", g);
        c.add("fl_pop_effect", "click", h);
        d.destroy = function () {
            c.remove("fl_pop", "click", g);
            c.remove("fl_pop_effect", "click", h);
            e && e.destroy && e.destroy();
            f && f.destroy && f.destroy()
        };
        return d
    }
});
STK.register("lib.feed.plugins.fansTop", function (a) {
    return function (b) {
        var c, d, e, f = {}, g = function (b) {
            clearTimeout(d);
            c.style.display = "";
            var e = a.core.dom.getSize(c), f = a.position(b.el), g = a.core.dom.getSize(b.el), h = f.l + g.width, i = f.t - e.height / 2;
            a.core.util.browser.IE6 ? i += 15 : a.core.util.browser.IE || (i += 10);
            c.style.left = h + 10 + "px";
            c.style.top = i + "px"
        }, h = function () {
            d = setTimeout(function () {
                c.style.display = "none"
            }, 300)
        }, i = function () {
            clearTimeout(d)
        }, j = function () {
            e = b.getDEvent();
            e.add("feed_list_fansTopFeed", "mouseover", g);
            e.add("feed_list_fansTopFeed", "mouseout", h);
            a.addEvent(c, "mouseover", i);
            a.addEvent(c, "mouseout", h)
        }, k = function () {
            c = a.sizzle('[node-type="feed_list_fansTopLayer"]', b.getNode());
            if (!!c && !!c[0]) {
                c = c[0];
                j()
            }
        };
        setTimeout(k, 300);
        f.destroy = function () {
            e.remove("feed_list_fansTopFeed", "mouseover", g);
            e.remove("feed_list_fansTopFeed", "mouseout", h);
            a.removeEvent(c, "mouseover", i);
            a.removeEvent(c, "mouseout", h);
            a.removeNode(c)
        };
        return f
    }
});
STK.register("common.trans.feed.thirdExpand", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("Addtbcard", {url: "/Aj/Thirdinter/Addtbcard?_wv=5", method: "post"});
    return b
});
STK.register("lib.feed.plugins.thirdExpand", function (a) {
    return function (b) {
        if (!b)a.log("thirdExpand : need object of the baseFeedList Class"); else {
            var c = b.getNode(), d = b.getDEvent(), e = b.utils, f = {}, g = a.common.trans.feed.thirdExpand, h = {getPDNodes: function (b) {
                return{prev: a.sizzle("[node-type=feed_list_media_prev]", b)[0], disp: a.sizzle("[node-type=feed_list_media_disp]", b)[0]}
            }, getMid: function (b, c) {
                return b.mid || (b.mid = a.kit.dom.parentAttr(b, "mid", c))
            }, getFeeds: function (b, c) {
                return a.sizzle("[" + c + "]", b)
            }, getFeedNode: function (b, c) {
                var d = h.getMid(b, c), e = h.getFeeds(c, 'mid="' + d + '"');
                for (var f = 1; f < e.length; f++)if (a.contains(e[f], b))return e[f];
                return e[0]
            }, getActionData: function (a, b) {
                return a.tagName.toLowerCase == "body" ? null : a.getAttribute("node-type") == b ? a.getAttribute("action-data") : arguments.callee(a.parentNode, b)
            }, getActionNode: function (b, c) {
                return a.sizzle('[node-type="' + c + '"]', b)
            }, showActionNode: function (a, b) {
                var c = h.getActionNode(a, b);
                for (var d = 0; c[d]; d++)c[d].style.display = ""
            }, hideActionNode: function (a, b) {
                var c = h.getActionNode(a, b);
                for (var d = 0; c[d]; d++)c[d].style.display = "none"
            }, getItemIds: function () {
            }}, i = {fl_third_expand: function (a) {
                var b = h.getFeedNode(a.el, c);
                h.showActionNode(b, "WB_card_hide");
                h.hideActionNode(b, "WB_card_show")
            }, fl_third_pack: function (a) {
                var b = h.getFeedNode(a.el, c);
                h.hideActionNode(b, "WB_card_hide");
                h.showActionNode(b, "WB_card_show")
            }, fl_third_addtbcart: function (b) {
                var d = b.data || {}, e = h.getFeedNode(b.el, c), f = h.getPDNodes(e).prev, i = a.sizzle("li", f), j = [];
                for (var k = 0; i[k]; k++) {
                    var l = i[k].getAttribute("action-data") || "", m = a.queryToJson(l);
                    m && m.item_id && j.push(m.item_id)
                }
                d.item_id = j.join(",");
                g.getTrans("Addtbcard", {onSuccess: function (c) {
                    if (c.data.html) {
                        var d = a.builder(c.data.html).box;
                        a.replaceNode(d, b.el)
                    }
                }, onFail: function (b) {
                    a.ui.alert(b.msg)
                }, onError: function (b) {
                    a.ui.alert(b.msg)
                }}).request(d)
            }, feed_reclist_unfold: function (b) {
                var d = a.sizzle('div[node-type="feed_reclist"]', c);
                if (d[0]) {
                    b.el.style.display = "none";
                    d[0].style.display = ""
                }
            }}, j = function () {
                d.add("fl_third_expand", "click", i.fl_third_expand);
                d.add("fl_third_pack", "click", i.fl_third_pack);
                d.add("fl_third_addtbcart", "click", i.fl_third_addtbcart);
                d.add("feed_reclist_unfold", "click", i.feed_reclist_unfold)
            }, k = function () {
                j()
            };
            k();
            var l = function () {
                d && d.destroy && d.destroy()
            };
            f.destroy = l;
            return f
        }
    }
});
STK.register("common.feed.feedList.homeFeedList", function (a) {
    return function (b, c) {
        if (!b)a.log("in homeFeedList: node is not defined!"); else {
            var d = a.common.feed.feedList, e, f, g = [], h = d.baseFeedList(b, c);
            g.push((d = d.plugins).forward(h));
            g.push(e = d.deleteFeed(h));
            g.push(f = d.favorite(h));
            g.push(d.comment(h));
            g.push(d.media(h));
            g.push(d.images(h));
            g.push(d.commonMedia(h));
            g.push(d.page(h));
            g.push(d.activityPage(h));
            g.push(d.map(h));
            g.push(d.updateTime(h));
            g.push(d.delOverFeeds(h));
            g.push(d.lazyload(h));
            g.push(d.newFeed(h));
            g.push(d.backToAll(h));
            g.push(d.search(h));
            g.push(d.imgAdvLoading(h));
            g.push(d.feedHotKey(h));
            g.push(d.feedShield(h));
            g.push(d.mood(h));
            g.push(d.smartSort(h));
            g.push(d.forwardMerge(h));
            g.push(d.activityShield(h));
            g.push(d.attitudeMini(h));
            g.push(d.recommendFeed(h));
            g.push(d.recommendTip(h));
            g.push(d.wbmlLoader(h));
            g.push(d.recGroupMembers(h));
            g.push(d.keywordShield(h));
            g.push(d.orientGrpMem(h));
            g.push(d.followbtn(h));
            g.push(d.adFeed(h));
            g.push(d.photoview(h, c));
            g.push(d.translate(h));
            g.push(d.jumpurl(h));
            g.push(a.lib.feed.plugins.thirdExpand(h));
            g.push(d.spreadFeed(h));
            g.push(a.lib.feed.plugins.popularize(h));
            g.push(a.lib.feed.plugins.fansTop(h));
            a.custEvent.add(h, "clearTips", function (a, b) {
                if (b == "favorite")e.hideTip(); else if (b == "deleteFeed")f.hideTip(); else {
                    f.hideTip(b == "base");
                    e.hideTip(b == "base")
                }
            });
            var i = h.destroy;
            h.destroy = function () {
                i();
                for (var a = 0; a < g.length; a++)try {
                    g[a].destroy()
                } catch (b) {
                }
                h = d = e = f = g = i = undefined
            };
            return h
        }
    }
});
STK.register("pl.content.homeFeed.source.init", function (a) {
    return function (b, c) {
        var d = {}, e = a.kit.extra.language, f, g, h, i, j, k, l, m, n, o = $CONFIG != null && $CONFIG.bigpipe != null && ($CONFIG.bigpipe === "true" || $CONFIG.bigpipe === !0), p = {}, q = {}, r = {newFeed: function (a) {
            var b = a.data || {}, c = 0, d = f.getGroupInfo() + "", e = f.getFeedType();
            e === "mblog" ? d === "0" ? c = b.status || 0 : c = b["status_" + d] || 0 : d === "0" ? c = b.activity || 0 : c = b["activity_" + d] || 0;
            f.newFeedNotify({count: c, feedType: e})
        }, fakeFeed: function (b) {
            var c = a.core.str.parseURL(location.href).query, d = a.core.json.queryToJson(c);
            if (!d.ismiyou || d.ismiyou !== "1")if (l && m && f && f.isAdvSearched != !0) {
                typeof b != "string" && (b = b != null ? b.html : "");
                h.clearNewBar();
                h.insertFakeFeed(b)
            }
        }}, s = function () {
            t();
            u();
            w();
            x();
            y();
            z();
            A()
        }, t = function () {
            if (b == null || b != null && !a.core.dom.isNode(b))throw"[comp.centent.homeFeed]:argsCheck()-The param node is not a DOM node.";
            c = a.core.obj.parseParam({html: ""}, c);
            j = function () {
                var b = a.kit.extra.parseURL(), c = a.core.json.queryToJson(b.query);
                l = c.gid == null && c.ismiyou == null && c.whisper == null;
                m = c.is_ori != 1 && c.is_pic != 1 && c.is_video != 1 && c.is_music != 1 && c.is_foward != 1 && c.is_text != 1 && c.key_word == null && c.start_time == null && c.end_time == null && c.activity == null;
                return c
            }()
        }, u = function () {
            c.html && (b.innerHTML = c.html);
            i = {feedNav: a.core.dom.sizzle('[node-type="feed_nav"]', b)[0], feedList: a.core.dom.sizzle('[node-type="feed_list"]', b)[0]};
            if (!i.feedNav || !i.feedList)throw"[comp.centent.homeFeed]:parseDOM()-You should provide the nodes required."
        }, v = function () {
            var b;
            j.page ? b = j.page : b = 1;
            l && m && b == 1 && a.custEvent.fire(h, "showRecommendTip")
        }, w = function () {
            f = a.common.feed.groupAndSearch.homeFeed(i.feedNav, {pageQuery: j, isBigPipe: o});
            g = a.common.feed.inter.homeFeedInter({pageQuery: j, isBigPipe: o});
            h = a.common.feed.feedList.homeFeedList(i.feedList, {page: j.page, end_id: j.end_id});
            v()
        }, x = function () {
            var b = a.E("focus_feed_list"), c = i.feedList;
            b && (b.onfocus = function () {
                var a = c.getElementsByTagName("a");
                a.length > 1 && a[0].focus();
                return!1
            })
        }, y = function () {
            a.custEvent.add(f, "search", function () {
                h.showWait("search");
                var b = arguments[3];
                if (b != null) {
                    l = b.isGroupAll;
                    m = b.isFilterAll
                }
                l && m && !arguments[2].is_search ? a.custEvent.fire(h, "showRecommendTip") : a.custEvent.fire(h, "stopRecommendTip");
                g.evtSearch.apply(g, arguments)
            });
            a.custEvent.add(f, "smartSort", function (b, c) {
                if (c === "nowIsSmartSort") {
                    try {
                        a.common.channel.topTip.remove("readed", r.newFeed)
                    } catch (d) {
                    }
                    a.common.channel.topTip.fire("currentGroup", 0);
                    a.common.channel.topTip.fire("currentStatusType", "0");
                    a.common.channel.topTip.register("readed", r.newFeed)
                }
            });
            a.custEvent.add(h, "request", function () {
                var b = arguments, c;
                if (b.length < 3)throw new Error("[comp.content.homeFeed]:bindCustEvt()-custom event 'success' should supply enough arguments.");
                c = b[1];
                c == "page" && l && m && (b[2].page == 1 ? a.custEvent.fire(h, "showRecommendTip") : a.custEvent.fire(h, "stopRecommendTip"));
                (c == "newFeed" || c == "toFirstPage") && f.getIsSmartSort() && (f.config.mblogsort = 1);
                if (c == "backToAll") {
                    delete f.config.key_word;
                    if (f.isAdvSearched)f.advSearchToggle.call(f, null, 1); else {
                        f.advSearchToggle.call(f, null, 1);
                        f.searchFilterChange.call(f, "0")
                    }
                } else g.evtRequest.apply(g, arguments)
            });
            h.regCustEvent("smartSort", function () {
                if (o)f.smartSort(); else {
                    var b = a.kit.extra.parseURL();
                    window.location.href = "/" + b.path + "?" + "mblogsort=1"
                }
            });
            a.custEvent.add(g, "success", function () {
                var a = arguments, b, c;
                if (a.length < 3)throw new Error("[comp.content.homeFeed]:bindCustEvt()-custom event 'success' should supply enough arguments.");
                b = a[1];
                c = a[2];
                if (c == "newFeed" && b) {
                    var d = Math.ceil(h.resetStartTime() / 6e4), f = e("[n]#L{你看到这里}");
                    h.clearAllTimeTip();
                    var g = e("#L{之前}");
                    if (d >= 60 && d < 1440) {
                        var i = parseInt(d / 60, 10), j = d - i * 60;
                        g = i + e("#L{小时}") + (j > 0 ? j + e("#L{分钟前，}") : e("#L{前，}"))
                    } else d < 60 && (g = d + e("#L{分钟前，}"));
                    f = f.replace("[n]", g);
                    h.updateFeed(b, c);
                    h.updateTimeTip(f)
                } else h.updateFeed(b, c)
            });
            a.custEvent.add(g, "failure", function () {
                if (arguments.length < 3)throw new Error("[comp.content.homeFeed]:bindCustEvt()-custom event 'success' should supply enough arguments.");
                var a = arguments[2];
                h.showError(a)
            });
            a.custEvent.add(f, "newFeed", function () {
                h.extra.showNewFeedTip(a.parseParam({count: 0, isFilterAll: m, feedType: "mblog"}, arguments[1]))
            });
            a.custEvent.add(f, "changeFeedType", function (b, c) {
                var d = c.feedType;
                a.common.channel.topTip.fire("currentStatusType", d === "activity" ? "1" : "0")
            })
        }, z = function () {
            k = setTimeout(function () {
                var b = f.getGroupInfo(), c = a.core.arr.indexOf(b, ["whisper", "ismiyou"]) === -1;
                if (c) {
                    var d = f.getFeedType();
                    a.common.channel.topTip.fire("currentGroup", b);
                    a.common.channel.topTip.fire("currentStatusType", d === "activity" ? "1" : "0");
                    a.common.channel.topTip.register("readed", r.newFeed)
                }
            }, 30010);
            a.common.channel.feed.register("publish", r.fakeFeed);
            a.common.channel.feed.register("forward", r.fakeFeed)
        }, A = function () {
        }, B = function () {
            k && clearTimeout(k);
            a.common.channel.feed.remove("publish", r.fakeFeed);
            a.common.channel.feed.remove("forward", r.fakeFeed);
            f.destroy();
            g.destroy();
            h.destroy();
            var b = a.E("focus_feed_list");
            b && (b.onfocus = null)
        };
        s();
        d.destroy = B;
        return d
    }
});
STK.pageletM.register("pl.content.homeFeed.index", function (a) {
    var b = {}, c = a.E("pl_content_homeFeed"), d = a.pl.content.homeFeed.source.init(c, b);
    return d
});
