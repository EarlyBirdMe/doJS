STK.register("kit.extra.language", function (a) {
    window.$LANG || (window.$LANG = {});
    return function (b) {
        var c = [].splice.call(arguments, 1, arguments.length), d = [b, $LANG].concat(c), e = a.core.util.language.apply(this, d);
        return e
    }
});
STK.register("common.notice.groupAndApp", function (a) {
    function h() {
        (!!f || !!e) && a.jsonp({url: b + "&appkeys=" + f + "&group_ids=" + e, onComplete: function (a) {
            a = a.data;
            var b = {groups: g(a.groups), apps: g(a.apps, "isApp")};
            for (var c in i)i[c](b)
        }, onFail: function () {
        }, onTimeout: function () {
        }})
    }

    var b = "http://rm.api.weibo.com/2/remind/unread_hint.json?source=3818214747&with_url=1", c = !1, d, e = "", f = "", g = function (a, b) {
        var c = b ? [] : {}, d;
        for (var e = 0, f = a.length; e < f; ++e) {
            d = a[e];
            if (b)c.push(d); else for (var g in d) {
                c[g] = d[g];
                break
            }
        }
        return c
    }, i = {}, j = {};
    j.register = function (a, b) {
        i[a] = b;
        if (!c) {
            d = setTimeout(h, 3e3);
            d = setInterval(h, 18e4);
            c = !0
        }
    };
    j.remove = function (a) {
        i[a] && delete i[a];
        if (c) {
            for (var b in i)return;
            clearInterval(d);
            c = !1
        }
    };
    j.setGroupIds = function (a) {
        e = a
    };
    j.setAppkeys = function (a) {
        f = a
    };
    return j
});
STK.register("kit.dom.parseDOM", function (a) {
    return function (a) {
        for (var b in a)a[b] && a[b].length == 1 && (a[b] = a[b][0]);
        return a
    }
});
STK.register("common.group.addGroupPanel", function (a) {
    var b = '<#et addGroup data><div node-type="addGroupPanel" class="form_table lsfl_edit_list"><dl class="clearfix"><dt><span class="must CH S_spetxt" style="color: #f00;">*</span>#L{分组名：}</dt><dd class="conbox"><input watermark="#L{请输入分组名称，最多8个字}" value="#L{请输入分组名称，最多8个字}" node-type="name" name="name" type="text" class="W_inputStp"><div style="display:none;" node-type="err_name" class="M_notice_del clearfix"></div></dd></dl><dl class="clearfix"><dt>#L{分组描述：}</dt><dd class="conbox"><textarea watermark="#L{请输入分组描述，最多70个字}"" node-type="desc" name="desc" class="W_inputStp list_desc" rows="" cols="">#L{请输入分组描述，最多70个字}</textarea><div style="display:none;" node-type="err_desc" class="M_notice_del clearfix"></div></dd></dl></div></#et>', c = '<span class="icon_del"></span><span class="txt">{errMsg}</span>', d = a.kit.extra.language;
    return function (e) {
        e = e || {};
        var f = {}, g = a.getUniqueKey(), h = e.data || {}, i = e.mode || "private", j = e.template || b, k = a.core.util.easyTemplate(d(j)), l = a.core.dom.builder(k({ukey: g, mode: i}).toString()), m = a.kit.dom.parseDOM(l.list), n = e.checkList || {name: function (b) {
            var c = a.trim(b), e = a.bLength(c);
            if (!e)return d("#L{请输入分组名称}");
            if (e > 16)return d("#L{请输入1～16个字符}")
        }}, o = {show: function (a, b) {
            var d = m["err_" + b];
            if (!!d) {
                d.innerHTML = c.replace(/\{errMsg\}/i, a);
                d.style.display = ""
            }
        }, hide: function (a) {
            var b = m["err_" + a];
            !b || (b.style.display = "none")
        }}, p = {blur: function (b) {
            var c = a.fixEvent(b).target, d = c.getAttribute("node-type"), e = c.value, f = n[d], g = c.getAttribute("watermark"), h = typeof f == "function" ? f(e) : "";
            a.trim(e) || (c.value = g);
            h && o.show(h, d)
        }, focus: function (b) {
            var c = a.fixEvent(b).target, d = c.getAttribute("node-type"), e = c.getAttribute("watermark");
            a.trim(c.value) === e && (c.value = "");
            o.hide(d)
        }, descKeyup: function (b) {
            a.bLength(m.desc.value) > 140 && (m.desc.value = a.leftB(m.desc.value, 140))
        }, nameKeyup: function (b) {
            a.bLength(m.name.value) > 16 && (m.name.value = a.leftB(m.name.value, 16))
        }};
        a.addEvent(m.name, "blur", p.blur);
        a.addEvent(m.desc, "blur", p.blur);
        a.addEvent(m.name, "focus", p.focus);
        a.addEvent(m.desc, "focus", p.focus);
        a.addEvent(m.desc, "keyup", p.descKeyup);
        a.addEvent(m.name, "keyup", p.nameKeyup);
        var q = function () {
            return m.addGroupPanel
        }, r = function (b) {
            var c, d;
            for (var e in b) {
                c = m[e];
                if (!a.isArray(c)) {
                    d = c.getAttribute("watermark");
                    a.trim(b[e]) === d && (b[e] = "");
                    e === "tags" && (b[e] = b[e].replace(/[、|\s|，|,|;|；]+/ig, ","))
                }
            }
            return b
        }, s = function (b) {
            var c = a.trim(b.value), d = b.getAttribute("watermark");
            c === d && (c = "");
            return c
        }, t = function () {
            var b = !0;
            for (var c in n) {
                var d = n[c](s(m[c]));
                if (d) {
                    b = !1;
                    o.show(d, c);
                    break
                }
            }
            return b ? r(a.htmlToJson(m.addGroupPanel)) : !1
        }, u = function (b) {
            for (var c in b) {
                var d = m[c];
                if (a.isArray(m[c]))for (var e = d.length; e--;)d[e].value === b[c] && (d[e].checked = !0); else {
                    var f = a.isArray(b[c]) ? b[c].join(" ") : b[c];
                    f = a.decodeHTML(f);
                    f && m[c] && (m[c].value = f)
                }
            }
            h = b
        }, v = function () {
            u(h)
        }, w = function () {
            a.removeEvent(m.name, "blur", p.blur);
            a.removeEvent(m.desc, "blur", p.blur);
            a.removeEvent(m.tags, "blur", p.blur);
            a.removeEvent(m.name, "focus", p.focus);
            a.removeEvent(m.desc, "focus", p.focus);
            a.removeEvent(m.tags, "focus", p.focus);
            a.removeEvent(m.desc, "keyup", p.descKeyup);
            a.removeEvent(m.name, "keyup", p.nameKeyup);
            p = null;
            m = null
        };
        u(h);
        f.reset = v;
        f.getOuter = q;
        f.setData = u;
        f.destroy = w;
        f.getData = t;
        return f
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
STK.register("common.trans.relation", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("cleartrashfans", {url: "/aj/f/trash/cleartrashfans?_wv=5", method: "post"});
    c("deltrashfans", {url: "/aj/f/trash/deltrashfans?_wv=5", method: "post"});
    c("confirmfans", {url: "/aj/f/trash/confirmfans?_wv=5", method: "post"});
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
    c("followGroup", {url: "/aj/f/group/followedgroup?_wv=5", method: "post"});
    c("recommendWholeGroup", {url: "/aj/relation/rename?_wv=5", method: "post"});
    c("recommendUserAdd", {url: "/aj/f/group/addrecommenduser?_wv=5", method: "post"});
    c("recommendUserRemove", {url: "/aj/f/group/remove?_wv=5", method: "post"});
    return b
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
        o.OK.innerHTML = '<span class="btn_30px W_f14">' + h.OKText + "</span>";
        o.toBeVip.innerHTML = '<span class="btn_30px W_f14"><em class="W_ico16 ico_member"></em>' + h.toBeVipText + "</span>";
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
    var b = '<div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="" node-type="icon"></span></dt><dd node-type="inner"><p class="S_txt1" node-type="textLarge"></p><p class="S_txt1" node-type="textComplex"></p><p class="S_txt2" node-type="textSmall"></p></dd></dl><div class="btn"><a class="W_btn_b" node-type="OK"></a><a class="W_btn_a" node-type="cancel"></a><a href="http://vip.weibo.com/paycenter?pageid=byebank" class="W_btn_v" node-type="member"><span><em class="W_ico16 ico_member"></em>#L{立即开通会员}</span></a></div></div>', c = {success: "icon_succM", error: "icon_errorM", warn: "icon_warnM", "delete": "icon_delM", question: "icon_questionM"}, d = a.kit.extra.language, e = function (e, f) {
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
        m.OK.innerHTML = '<span class="btn_30px W_f14">' + g.OKText + "</span>";
        m.cancel.innerHTML = '<span class="btn_30px W_f14">' + g.cancelText + "</span>";
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
STK.register("common.dialog.loginLayer", function (a) {
    var b, c = "http://tjs.sjs.sinajs.cn/t5/register/js/page/remote/loginLayer.js";
    return function (d) {
        d = a.core.obj.parseParam({lang: "zh-cn", loginSuccessUrl: encodeURIComponent(window.location.href)}, d || {});
        if (window.WBtopGlobal_loginLayer)WBtopGlobal_loginLayer(d); else {
            if (b)return;
            b = !0;
            a.core.io.scriptLoader({url: c, onComplete: function () {
                b = !1;
                window.WBtopGlobal_loginLayer(d)
            }, timeout: 1e4, onTimeout: function () {
                b = !1
            }})
        }
    }
});
STK.register("common.layer.ioError", function (a) {
    var b = a.kit.extra.language, c, d;
    return function (e, f, g) {
        var h = {}, i, j, k = function () {
        }, l = {title: b("#L{发布失败}"), warnMsg: b("#L{该组成员已达上限，不能对该组发布定向微博。}"), OKText: b("#L{知道了}"), textComplex: b('#L{微博会员可以提高分组上限} <a href="http://vip.weibo.com/prividesc?priv=1110">#L{了解更多}»</a>'), vip: b("#L{开通会员}")}, m = {init: function () {
            m.data()
        }, data: function () {
            j = a.parseParam({auto: !0, call: k, ok: k, cancel: k}, g);
            i = a.parseParam({location: "", icon: "warn", title: b("#L{提示}"), OKText: b("#L{确 定}"), cancelText: b("#L{取 消}"), suda: ""}, f.data);
            i.msg = f.msg || b("#L{系统繁忙}");
            i.OK = function () {
                a.preventDefault();
                var b = a.queryToJson(i.suda || "");
                b = b.ok || {};
                SUDA.uaTrack && b.key && SUDA.uaTrack(b.key, b.value);
                j.ok();
                i.location && (window.location.href = i.location)
            };
            i.cancel = function () {
                a.preventDefault();
                var b = a.queryToJson(i.suda || "");
                b = b.cancel || {};
                SUDA.uaTrack && b.key && SUDA.uaTrack(b.key, b.value);
                j.cancel()
            }
        }, run: function () {
            var a = n[f.code] || n[100001];
            return a() || j.call(i, f)
        }, destroy: function () {
            c && c.destroy()
        }}, n = {100001: function () {
            a.ui.alert(i.msg, i)
        }, 100002: function () {
            window.location.reload()
        }, 100003: function () {
            a.ui.confirm(i.msg, i)
        }, 100004: function () {
            c || (c = a.common.dialog.authentication());
            c.show()
        }, 100005: function () {
            i.type = f.data && (f.data.type ? f.data.type : "follow");
            i.errortype = f.data && (f.data.errortype || "1");
            return a.common.dialog.memberDialog(i || {})
        }, 100006: function () {
            a.ui.alert(l.warnMsg, {title: l.title, OKText: l.OKText})
        }, 100007: function () {
            a.lib.litter.vipConfirm(l.warnMsg, {icon: "warn", title: l.title, toBeVipText: l.vip, textComplex: l.textComplex, OKText: l.OKText, toBeVip: function () {
                a.preventDefault();
                window.location.href = "http://vip.weibo.com/paycenter?refer=publish"
            }})
        }, 100008: function () {
            !d && (d = a.common.dialog.loginLayer);
            var b = window.$CONFIG && window.$CONFIG.lang || "zh-cn";
            d({lang: b})
        }};
        m.init();
        h.getdata = function () {
            return i
        };
        h.getAction = function (a) {
            return a ? n[a] : n
        };
        h.getCode = function () {
            return f.code || ""
        };
        h.run = m.run;
        j.auto && m.run();
        return h
    }
});
STK.register("common.dialog.addGroup", function (a) {
    return function (b) {
        var c = a.kit.extra.language, d = '<div node-type="outer" class="layer_setup_followlists edit_list"><div node-type="dialog_group_list" class="form_table lsfl_edit_list"></div><div node-type="btnBox" class="btn"><a node-type="submit" href="javascript:;" class="W_btn_a"><span class="btn_30px W_f14">#L{保存}</span></a><a node-type="cancel" href="javascript:;" class="W_btn_b"><span class="btn_30px W_f14">#L{取消}</span></a></div></div>', e = {}, f = a.ui.dialog(), g = a.core.dom.builder(c(d)), h = a.kit.dom.parseDOM(g.list), i, j, k, l, m = a.common.group.addGroupPanel(), n;
        h.dialog_group_list.innerHTML = "";
        a.core.dom.insertElement(h.dialog_group_list, m.getOuter(), "afterbegin");
        f.appendChild(h.outer);
        var o = {onSuccess: function (b, d) {
            r();
            var e = a.ui.tip("lite", {msg: c("#L{设置成功}"), type: "succM", timer: 1e3, hideCallback: function () {
                if (!d.gid) {
                    var a = b.data;
                    for (var c in a)if (a[c].belong === 1) {
                        d.gid = a[c].gid;
                        break
                    }
                }
                typeof k == "function" && k(d || {}, b.data)
            }})
        }, onError: function (b, d) {
            b && b.code === "100060" ? b.msg && a.ui.confirm(b.msg, {icon: "warn", OKText: c("#L{立刻绑定}"), OK: function () {
                window.location.href = "http://account.weibo.com/settings/mobile";
                return a.preventDefault()
            }}) : a.common.layer.ioError(b.code, b)
        }}, p = {submit: function (b) {
            var c = m.getData();
            n && (c = a.core.json.merge(n, c));
            if (!!c) {
                j && (c.gid = j);
                i.request(c)
            }
        }, cancel: function (a) {
            r()
        }};
        a.addEvent(h.submit, "click", p.submit);
        a.addEvent(h.cancel, "click", p.cancel);
        var q = function (b) {
            b = b || {};
            j = b.gid;
            k = b.OK;
            l = b.publish;
            if (b.refer) {
                n = b.refer;
                delete b.refer
            }
            if (j) {
                f.setTitle(c("#L{编辑分组信息}"));
                i = a.common.trans.group.getTrans("modify", {onSuccess: o.onSuccess, onError: o.onError, onFail: o.onError})
            } else {
                f.setTitle(c("#L{创建分组}"));
                i = a.common.trans.group.getTrans("add", {onSuccess: o.onSuccess, onError: o.onError, onFail: o.onError})
            }
            f.show().setMiddle();
            delete b.OK;
            delete b.publish;
            m.setData(b)
        }, r = function () {
            f.hide()
        }, s = function () {
            f.destroy();
            a.removeEvent(h.submit, "click", p.submit);
            a.removeEvent(h.cancel, "click", p.cancel);
            m.destroy()
        };
        e.show = q;
        e.hide = r;
        e.destroy = s;
        return e
    }
});
STK.register("common.extra.foldUnFold", function (a) {
    var b = "height";
    return function (c, d) {
        d = a.parseParam({styleName: b, end: a.core.func.empty}, d);
        var e = c.style.display == "none", f = d.styleName;
        c.style.display = "";
        var g = f == b ? c.offsetHeight : c.offsetWidth, h = {}, i, j;
        if (e) {
            i = "0px";
            j = "unfold";
            h[f] = g
        } else {
            i = g + "px";
            j = "fold";
            h[f] = 0
        }
        c.style.cssText = "overflow: hidden;" + f + ":" + i;
        var k = a.tween(c, {end: function () {
            k.destroy();
            d.end(j)
        }, duration: 333, animationType: "easeoutcubic"});
        k.play(h)
    }
});
STK.register("kit.touch.cantouch", function (a) {
    return STK.core.util.browser.IPAD
});
STK.register("kit.dom.hover", function (a) {
    function b(b, c) {
        var d = c.length;
        while (d--)if (c[d] === b || a.contains(c[d], b))return!0;
        return!1
    }

    var c = {};
    return a.kit.touch.cantouch ? function (d) {
        var e = d.act, f = d.extra || [], g = function (a) {
            d.onmouseover.apply(e, [a])
        }, h = function (a) {
            d.onmouseout.apply(e, [a])
        }, i = function (c, d) {
            b(a.fixEvent(d).target, [e].concat(f)) ? g(d) : h(d)
        };
        if (!("inited"in c)) {
            c.inited = !0;
            a.custEvent.define(c, ["tap"]);
            a.addEvent(document.body, "tap", function (b) {
                a.custEvent.fire(c, "tap", b)
            })
        }
        a.custEvent.add(c, "tap", i);
        return{destroy: function () {
            a.removeEvent(document.body, "tap", i)
        }}
    } : function (b) {
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
STK.register("common.group.groupDrag", function (a) {
    return function (b, c) {
        c = c = a.parseParam({dragsDomType: ""}, c);
        var d = {}, e, f, g, h, i, j, k = !1, l = function () {
            f = a.sizzle(c.dragsDomType, b);
            e = a.builder(b).list
        }, m = {saveSuc: function (b, c) {
            a.custEvent.fire(d, "saveSuc", c)
        }, saveError: function (b, c) {
            a.custEvent.fire(d, "saveError", c)
        }}, n = {mouseDownFunc: function (d) {
            var e = a.fixEvent(d).target, f = a.kit.dom.parentElementBy(e, b, function (a) {
                if (a.getAttribute("node-type") == c.dragsDomType)return!0
            });
            if (!a.IE) {
                d.preventDefault();
                d.stopPropagation()
            }
            k = !0;
            a.addEvent(document, "mouseup", n.outMouseMoveUp);
            a.addEvent(b, "mousemove", n.mouseMoveFunc);
            a.addEvent(b, "mouseup", n.mouseupFunc);
            g = f
        }, outMouseMoveUp: function (c) {
            a.removeEvent(document, "mouseup", n.outMouseMoveUp);
            a.removeEvent(b, "mousemove", n.mouseMoveFunc);
            a.removeEvent(b, "mouseup", n.mouseupFunc);
            k = !1
        }, mouseMoveFunc: function (d) {
            if (!!g && !!k) {
                h = d.clientY;
                var e = a.fixEvent(d).target, f = a.kit.dom.parentElementBy(e, b, function (a) {
                    if (a.getAttribute("node-type") == c.dragsDomType)return!0
                });
                if (!f || g == f)return;
                if (i > h) {
                    a.core.dom.insertBefore(g, f);
                    i = h
                } else {
                    a.core.dom.insertAfter(g, f);
                    i = h
                }
            }
        }, mouseupFunc: function (c) {
            g = null;
            k = !1;
            a.removeEvent(b, "mousemove", n.mouseMoveFunc);
            a.removeEvent(b, "mouseup", n.mouseupFunc)
        }, btn_save: function () {
            var d = {}, e = a.sizzle("[node-type='" + c.dragsDomType + "']", b), f = e.length, g = [];
            for (var h = 0; h < f; h++)g.push(e[h].getAttribute("gid"));
            d.gids = g.join(",");
            a.common.trans.group.getTrans("order", {onSuccess: m.saveSuc, onFail: m.saveError, onError: m.saveError}).request(d)
        }}, o = function () {
            b.onselectstart = function () {
                return!1
            };
            a.addEvent(b, "mousedown", n.mouseDownFunc);
            j = a.core.evt.delegatedEvent(b);
            j.add("btn_save", "click", n.btn_save);
            a.custEvent.define(d, ["saveSuc", "saveError"])
        }, p = function () {
            l();
            o()
        };
        p();
        d.destroy = function () {
            a.removeEvent(b, "mousedown", n.mouseDownFunc);
            a.removeEvent(b, "mousemove", n.mouseMoveFunc);
            a.removeEvent(b, "mouseup", n.mouseupFunc);
            b.onselectstart = null;
            a.custEvent.undefine(d, ["saveSuc", "saveError"]);
            j.remove("btn_save", "click", n.btn_save);
            j.destroy();
            j = null
        };
        return d
    }
});
STK.register("common.group.scroll", function (a) {
    return function (b) {
        b = a.parseParam({container: "", scrollNode: "", scrollitem: '[node-type="left_scroll_item"]', containeritem: '[node-type="left_fixed_item"]', style: "marginTop", delay: 100, srollFlag: !1}, b);
        var c = {}, d = b.srollFlag, e;
        a.custEvent.define(c, ["moveStart", "moving", "moveEnd", "show", "hide"]);
        var f = b.style, g, h, i, j = 0, k = 0, l, m = 20, n = b.container, o = b.scrollNode, p = b.delay, q;
        if (!!n && !!o) {
            var r = a.sizzle(b.containeritem, n)[0];
            l = a.sizzle(b.scrollitem, o)[0];
            var s = function () {
                if (!d)v(); else {
                    g = n.clientHeight;
                    a.core.util.browser.IE6 && g == 0 && (g = n.offsetHeight);
                    h = a.core.dom.getSize(r).height || r.scrollHeight;
                    i = g < h;
                    if (!i) {
                        t();
                        return
                    }
                    var b = g / h, c = parseInt(g * b > m ? g * b : m);
                    l.style.height = c - 7 + "px";
                    o.style.height = g + "px";
                    j = g - c;
                    k = h - g + 10;
                    var e = Math.abs(parseInt(a.getStyle(r, f)) || 0) / k || 0;
                    e > 1 && (e = 1);
                    e < 0 && (e = 0);
                    w.setPos(e)
                }
            }, t = function () {
                w.setPos(0);
                v()
            }, u = function () {
                if (!!d && !!i) {
                    a.custEvent.fire(c, "show");
                    o.style.display = "";
                    o.style.visibility = "visible"
                }
            }, v = function () {
                a.custEvent.fire(c, "hide");
                o.style.visibility = "hidden"
            }, w = {startPercent: 0, startY: 0, setPos: function (b) {
                a.setStyle(r, f, -b * k + "px");
                l.style.position = "relative";
                l.style.top = b * j + "px"
            }, start: function (b) {
                if (!this.draging) {
                    a.custEvent.fire(c, "moveStart");
                    this.draging = !0;
                    b = b || window.event;
                    this.startY = b.clientY;
                    a.preventDefault()
                }
            }, click: function (b) {
                if (!!i && !this.draging) {
                    b = b || window.event;
                    var c = b.clientY, d = c / g;
                    d < 0 && (d = 0);
                    d > 1 && (d = 1);
                    w.setPos(d);
                    this.startPercent = d;
                    a.preventDefault()
                }
            }, move: function (b) {
                if (!!this.draging) {
                    a.custEvent.fire(c, "moving");
                    b = b || window.event;
                    var d = b.clientY;
                    this.currentPercent = (d - this.startY) / j + this.startPercent;
                    this.currentPercent > 1 && (this.currentPercent = 1);
                    this.currentPercent < 0 && (this.currentPercent = 0);
                    this.setPos(this.currentPercent);
                    a.preventDefault()
                }
            }, end: function (b) {
                if (!!this.draging) {
                    a.custEvent.fire(c, "moveEnd");
                    this.draging = !1;
                    this.startPercent = this.currentPercent;
                    this.startY = b.clientY;
                    x()
                }
            }, out: function (b) {
                this.hideTimer && clearTimeout(this.hideTimer);
                var c = a.fixEvent(b);
                if (!!c.relatedTarget && !a.contains(n, c.relatedTarget)) {
                    if (this.draging)return;
                    this.hideTimer = setTimeout(function () {
                        v()
                    }, p)
                }
            }, scrollFun: function (b) {
                if (!!d && !!i) {
                    var c = a.core.util.browser.MOZ ? b.detail : -b.wheelDelta / 40;
                    this.startPercent = (Math.abs(parseInt(a.getStyle(r, f))) + c * 16) / k;
                    if (this.startPercent > 1) {
                        this.startPercent = 1;
                        s()
                    }
                    this.startPercent < 0 && (this.startPercent = 0);
                    this.setPos(this.startPercent);
                    x();
                    a.preventDefault()
                }
            }, scrollToByPercent: function (a) {
                this.setPos(a)
            }}, x = function () {
                e && clearTimeout(e);
                u();
                e = setTimeout(function () {
                    v()
                }, 1e3)
            }, y = {smousedown: function (a) {
                a = a || window.event;
                q = a.clientY
            }, click: function (a) {
                a = a || window.event;
                var b = Math.abs(a.clientY - q);
                b < 20 && w.click(a)
            }, DOMMouseScroll: function (a) {
                e && clearTimeout(e);
                u();
                w.scrollFun(a)
            }, _smousedown: function (a) {
                w.start(a)
            }, dmousemove: function (a) {
                w.move(a)
            }, dmouseup: function (a) {
                w.end(a)
            }, nmouseover: function (b) {
                var c = a.fixEvent(b);
                (!c.relatedTarget || !a.contains(r, c.relatedTarget)) && x()
            }, smouseover: function (a) {
                e && clearTimeout(e);
                u()
            }, smouseout: function (a) {
                w.draging || x()
            }}, z = function () {
                a.addEvent(r, a.core.util.browser.MOZ ? "DOMMouseScroll" : "mousewheel", y.DOMMouseScroll);
                a.addEvent(r, "mouseover", y.nmouseover);
                a.addEvent(l, "mousedown", y._smousedown);
                a.addEvent(document, "mousemove", y.dmousemove);
                a.addEvent(document, "mouseup", y.dmouseup);
                a.addEvent(o, "mousedown", y.smousedown);
                a.addEvent(o, "mouseup", y.click);
                a.addEvent(o, "mouseover", y.smouseover);
                a.addEvent(o, "mouseout", y.smouseout)
            }, A = function (a) {
                d = a
            }, B = function () {
                a.removeEvent(r, a.core.util.browser.MOZ ? "DOMMouseScroll" : "mousewheel", y.DOMMouseScroll);
                a.removeEvent(l, "mousedown", y._smousedown);
                a.removeEvent(document, "mousemove", y.dmousemove);
                a.removeEvent(document, "mouseup", y.dmouseup);
                a.removeEvent(r, "mouseover", y.nmouseover);
                a.removeEvent(o, "click", w.click);
                a.removeEvent(o, "mouseover", y.smouseover);
                a.removeEvent(o, "mouseout", y.smouseout)
            };
            s();
            z();
            c.show = u;
            c.hide = v;
            c.init = s;
            c.scrollToByPercent = w.scrollToByPercent;
            c.destroy = B;
            c.reset = t;
            c.setscrollFlag = A;
            return c
        }
    }
});
STK.register("pl.leftnav.common.source.leftFixed", function (a) {
    return function () {
        var b = {}, c = a.core.util.browser.IE, d = a.sizzle("[node-type='left_fixed']"), e = a.sizzle("[node-type='left_scroll']"), f;
        d = d.length > 0 ? d[0] : "";
        e = e.length > 0 ? e[0] : "";
        a.custEvent.define(b, ["back", "store"]);
        if (a.core.util.browser.IE6 || !e && !d)return b;
        var g = a.common.group.scroll({container: d, scrollNode: e}), h = 42, i = a.sizzle('[node-type="left_fixed_item"]', d)[0], j = a.sizzle('[node-type="left_all"]')[0], k = a.core.dom.getSize(j).height || 0, l = a.position(j).t || 0;
        d._scrool = !1;
        var m = a.E("plc_main"), n, o = function () {
            g.setscrollFlag(!0);
            g.init()
        }, p = function () {
            var b = a.winSize().height, c = (a.position(m).t || 0) + (a.core.dom.getSize(m).height || 0);
            if (a.core.util.browser.IE7) {
                var e = a.sizzle("[node-type='moreList']", d);
                e = e.length > 0 ? e[0] : "";
                e && a.setStyle(a.sizzle("[node-type='moreList']", d)[0], "zoom", "1")
            }
            if (c - a.scrollPos().top - h > b) {
                g.init();
                a.setStyle(d, "height", b - h + "px")
            } else {
                g.init();
                a.setStyle(d, "height", c - a.scrollPos().top - h + 18 + "px")
            }
        }, q = function () {
            a.setStyle(d, "height", "")
        }, r = function () {
            g.hide()
        }, s = function () {
            if (!a.hasClassName(d, "FIXED")) {
                a.addClassName(d, "FIXED");
                d.style.top = h + "px"
            }
        }, t = function () {
            if (a.hasClassName(d, "FIXED")) {
                a.removeClassName(d, "FIXED");
                d.style.top = ""
            }
        }, u = function () {
            d._scrool && o()
        }, v = function () {
            try {
                if (a.scrollPos().top >= k + l - h - 12) {
                    p();
                    if (d._scrool)return;
                    if (c) {
                        a.E("pl_leftnav_common").style.display = "none";
                        a.E("pl_leftnav_app").style.display = "none"
                    }
                    s();
                    a.custEvent.fire(b, "store");
                    d._scrool = !0
                } else {
                    k = parseInt(j.scrollHeight) || 0;
                    if (!d._scrool)return;
                    if (c) {
                        a.E("pl_leftnav_common").style.display = "";
                        a.E("pl_leftnav_app").style.display = ""
                    }
                    t();
                    a.custEvent.fire(b, "back");
                    k = parseInt(j.scrollHeight) || 0;
                    r();
                    q();
                    d._scrool = !1;
                    g.reset();
                    g.setscrollFlag(!1)
                }
            } catch (e) {
            }
        };
        a.addEvent(d, "mouseover", u);
        v();
        f = setInterval(v, 50);
        b.destroy = function () {
            f && window.clearInterval(f);
            a.removeEvent(d, "mouseover", u);
            g && g.destroy && g.destroy();
            i = d = e = null;
            n && window.clearTimeout(n)
        };
        return b
    }
});
STK.register("pl.leftnav.group.source.init", function (a) {
    function v(b) {
        a.foreach(b, function (b) {
            a.removeClassName(b, m)
        })
    }

    function u(b) {
        var c = a.sizzle(p, b)[0] || a.sizzle(q, b)[0];
        c && a.removeNode(c)
    }

    function t(b, c) {
        c = c || {};
        var d = c.isAppend, e = c.num || 0;
        e = e > 100 ? "99+" : e;
        var f = d ? a.sizzle(q, b)[0] : a.sizzle(p, b)[0];
        if (!d) {
            f && a.core.dom.removeNode(f);
            f && s(b);
            a.insertHTML(b, o.replace("{num}", e), "beforeend")
        } else if (!f) {
            d ? a.insertHTML(b, n) : a.insertHTML(a.core.dom.firstChild(b), o.replace("{num}", e), "beforeend");
            s(b)
        }
    }

    var b = a.kit.extra.language, c = a.sizzle.matches, d = a.common.notice.groupAndApp, e, f, g, h = [], i, j, k = b("#L{收起}"), l = b("#L{展开}"), m = "lev_curr", n = '<i class="W_new"></i>', o = '<em class="W_new_count">{num}</em>', p = ".W_new_count", q = ".W_new", r = b('<div class="levmenu S_bg2 S_line1" node-type="group_list_tools" ><ul><li><a href="javascript:void(0)" class="lm_li S_txt1" action-type="group_manage" suda-data="key=tblog_home_new&value=leftgroup_manage">#L{管理该分组}</a></li></ul><ul><li><a href="javascript:void(0)" class="lm_li S_txt1" action-type="group_sort" suda-data="key=tblog_home_new&value=leftgroup_rank">#L{分组排序}</a></li></ul> </div>'), s = function (a) {
        var b = a.getAttribute("gid");
        if (b) {
            var c = "tblog_unread_group", d = "group_show:" + b;
            window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack(c, d)
        }
    }, w, x, y;
    return function (b) {
        if (!b)throw"comp.leftnav.group: node is undefined!";
        if (w == b)return x;
        w = b;
        var n = x = {}, o = a.delegatedEvent(b), q, s, z = a.builder(b).list, A = z.group_draglist[0], B = z.groupList[0], C = z.group_show_list[0], D = z.drag_grouplist_container[0], E, F = z.item, G = z.moreList;
        G = G && G[0];
        var H = z.moreBtn && z.moreBtn[0], I = function (c, d) {
            var e = d.gids.split(",");
            A.style.display = "none";
            B.style.display = "";
            var f = e.length, g = a.sizzle("[node-type='group_list_tools']", b)[0];
            N(g);
            for (var i = f - 1; i >= 0; i--)i > 4 ? a.core.dom.insertElement(G, h[e[i]], "afterbegin") : a.core.dom.insertElement(C, h[e[i]], "afterbegin");
            G && (G.style.display = "");
            H && (H.innerHTML = k);
            H && H.setAttribute("suda-data", "key=tblog_home_new&value=leftgroup_fold");
            H && u(H)
        };
        e = a.common.group.groupDrag(D, {dragsDomType: "dragItem"});
        a.custEvent.add(e, "saveSuc", I);
        var J = H ? !0 : !1, K = function () {
            var b = a.sizzle(p, G);
            b.length ? t(H, {isAppend: "appendToEnd"}) : u(H)
        }, L = b.getAttribute("homeUrl"), M = function (c) {
            var d = a.sizzle("[node-type='group_list_tools']", b)[0];
            if (d)if (c.edit) {
                a.removeEvent(document.body, "click", Q);
                N(d)
            } else {
                a.removeEvent(document.body, "click", Q);
                a.core.dom.prev(d).edit = 0;
                a.core.dom.insertElement(c, d, "afterend");
                c.edit = 1;
                P()
            } else {
                a.insertHTML(c, r, "afterend");
                c.edit = 1;
                P()
            }
        }, N = function (b) {
            if (b) {
                a.core.dom.prev(b).edit = 0;
                a.removeNode(b);
                b = null
            }
        }, O = function () {
            var c = a.sizzle("[node-type='group_list_tools']", b)[0];
            return a.queryToJson(a.core.dom.prev(c).getAttribute("action-data") || "")
        }, P = function () {
            window.setTimeout(function () {
                a.addEvent(document.body, "click", Q)
            }, 0)
        }, Q = function (c) {
            var d = a.fixEvent(c).target;
            if (!a.core.dom.contains(b, d)) {
                a.removeEvent(document.body, "click", Q);
                var e = a.sizzle("[node-type='group_list_tools']", b)[0];
                N(e)
            }
        }, R = function (c) {
            var d = function (a) {
                return a.getAttribute("node-type") == "item" ? a : a.getAttribute("action-type") ? !1 : a == b ? !1 : d(a.parentNode)
            }, e = a.fixEvent(c).target, f = d(e);
            if (f) {
                var g = f.getAttribute("gid"), h = a.sizzle(p, f);
                if (g && h.length) {
                    var i = "tblog_unread_group", j = "group_click:" + g;
                    window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack(i, j)
                }
            }
        }, S = function () {
            o.add("moreBtn", "click", function (b) {
                a.common.extra.foldUnFold(G, {end: function (a) {
                    J = a == "fold";
                    G.style.cssText = J ? "display: none" : "";
                    f = !J;
                    g = f;
                    i = J;
                    var c = b.el;
                    c.innerHTML = J ? l : k;
                    c.setAttribute("suda-data", J ? "key=tblog_home_new&value=leftgroup_unfold" : "key=tblog_home_new&value=leftgroup_fold");
                    J ? H && K() : H && u(H)
                }});
                a.preventDefault(b.evt)
            });
            o.add("create", "click", function () {
                a.common.dialog.addGroup().show({OK: function (a) {
                    window.location.href = "/" + $CONFIG.uid + "/myfollow?gid=" + a.gid
                }, publish: !0})
            });
            o.add("group_sort", "click", function () {
                A.style.display = "";
                B.style.display = "none"
            });
            o.add("group_manage", "click", function (b) {
                a.preventDefault(b.evt);
                var c = O();
                !c.id || (window.location.href = "/" + $CONFIG.uid + "/myfollow?gid=" + c.id)
            });
            o.add("group_sort_i", "click", function (c) {
                a.preventDefault(c.evt);
                var d = a.kit.dom.parentElementBy(c.el, b, function (a) {
                    if (a.getAttribute("node-type") == "group")return!0
                });
                d && M(d)
            });
            a.addEvent(b, "click", R)
        }, T = function (b) {
            b = b.toLowerCase();
            v(F);
            var d = 2, e = b.match(new RegExp("/(" + L + "|mymeyou|friends)" + ".*?.*?(whisper=1|ismiyou=1|isfriends=1)", "i")), f;
            if (!e) {
                e = b.match(new RegExp("/mygroups.*?(gid=\\d+)", "i"));
                d = 1
            }
            if (e && (f = c("[" + e[d] + "]", F)[0])) {
                a.addClassName(f, m);
                u(f)
            }
            clearTimeout(s);
            s = setTimeout(function () {
                a.common.channel.topTip.fire("refresh", {})
            }, 3e3)
        };
        a.historyM && a.historyM.onpopstate(T);
        var U = [];
        for (var V = 0, W = F.length; V < W; ++V) {
            var X = F[V].getAttribute("gid");
            X && U.push(X)
        }
        var Y = function () {
            for (var a = 0; F[a]; a++)if (F[a].getAttribute("ismiyou") == 1)return F[a];
            return!1
        }(), Z = function (b) {
            b = b.data || b;
            b.close_friends_feeds && b.close_friends_feeds > 0 ? a.hasClassName(Y, m) || t(Y, {num: b.close_friends_feeds}) : u(Y);
            H && J && K()
        };
        if (Y) {
            a.common.channel.topTip.register("unread", Z);
            a.common.channel.topTip.register("readed", Z)
        }
        d.setGroupIds(U.join(","));
        d.register("group", function (b) {
            var c = b.groups;
            a.foreach(F, function (d) {
                var e = d.getAttribute("gid");
                e && (c[e] ? a.hasClassName(d, m) || t(d, {num: b.groups[e]}) : u(d))
            });
            H && J && K()
        });
        var _ = function () {
            J = G.style.display != "none";
            G.style.cssText = J ? "display: none" : "";
            var a = H;
            a.innerHTML = J ? l : k;
            a.setAttribute("suda-data", J ? "key=tblog_home_new&value=leftgroup_unfold" : "key=tblog_home_new&value=leftgroup_fold");
            J ? H && K() : H && u(H);
            f = !J
        }, ba = function () {
            j = f;
            !!g == !f && _()
        }, bb = function () {
            g = f;
            !!j != !!f && _()
        }, bc = function () {
            var b = z.group, c;
            i = G.style.display == "none" ? 1 : 0;
            var d = b.length;
            for (var e = 0; e < d; e++) {
                c = b[e];
                h[c.getAttribute("gid")] = c
            }
            y = a.pl.leftnav.common.source.leftFixed();
            a.custEvent.add(y, "store", ba);
            a.custEvent.add(y, "back", bb)
        }, bd = function () {
            S();
            bc()
        };
        bd();
        n.destroy = function () {
            return
        };
        return n
    }
});
STK.pageletM.register("pl.leftnav.group.index", function (a) {
    var b = a.E("pl_leftnav_group");
    return a.pl.leftnav.group.source.init(b)
});
