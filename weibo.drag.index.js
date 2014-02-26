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
STK.register("pl.relation.follow.source.htmlBase", function (a) {
    var b = a.kit.extra.language;
    return{listOrder: b('<div class="layer_menu_list" style="display:none;position:absolute; top:180px; left:400px; z-index:99;" node-type="outer"><ul> <li><a href="javascript:void(0);" action-type="order" action-data="by=time" node-type="time">#L{按关注时间排序}</a></li> <li><a href="javascript:void(0);" action-type="order" action-data="by=update" node-type="update">#L{按最近更新排序}</a></li> <li><a href="javascript:void(0);" action-type="order" action-data="by=word" node-type="word">#L{按昵称首字母排序}</a></li> <li><a href="javascript:void(0);" action-type="order" action-data="by=hot" node-type="hot">#L{按最近联系排序}</a></li><li><a href="javascript:void(0);" action-type="order" action-data="by=fans" node-type="fans">#L{按粉丝数排序}</a></li></ul></div>'), orderArrow: '<span class="W_arrow S_link1"><em class="down">◆</em></span>', listScope: b('<div class="layer_menu_list" style="position:absolute; top:180px; left:400px; z-index:99;" node-type="outer"><ul> <li><a href="javascript:void(0);" action-type="scope" action-data="type=0">#L{全部关注}</a></li> <li><a href="javascript:void(0);" action-type="scope" action-data="type=1">#L{互相关注}</a></li></ul></div>'), editGroup: b(' <div class="layer_setup_followlists edit_list" node-type="outer">  <div class="form_table lsfl_edit_list">  <dl class="clearfix"><dt><span class="must CH S_spetxt">*</span>#L{分组名}：</dt>   <dd class="conbox"><input type="text" class="W_inputStp" node-type="group_name"></dd></dl> <dl class="clearfix"> <dt>#L{分组描述}：</dt><dd class="conbox"><textarea node-type="group_describe" name="" cols="" rows="" class="W_inputStp list_desc"></textarea></dd>  </dl>   </div>  <div class="btn"><a class="W_btn_a" href="javascript:void(0);" node-type="submit"><span>#L{保存}</span></a><a class="W_btn_b" href="javascript:void(0);" node-type="cancel"><span>#L{取消}</span></a></div> </div>'), addToOtherGroup: b('<div node-type="outer" class="layer_menu_list myfollow_select" style="display:none;position:absolute; top:10px; left:50px; z-index:99;"><div class="ms_sg_tit" node-type="pleaseSelect">#L{请选择分组}：</div><div style="display:none" class="ms_tips W_tips tips_warn clearfix" node-type="notice"><p class="icon"><span class="icon_warnS"></span></p><p class="txt"  node-type="notice_word"><em class="W_fb" node-type="notice_gname">上海吃货</em>已满！<a href="#">#L{开通微博会员}</a>#L{可提高组员上限}</p><p></p> </div> <div style="display:none" class="ms_tips W_tips tips_succ clearfix" node-type="topSuccess"><p class="icon"><span class="icon_succS"></span></p><p class="txt">#L{已成功添加组员到}<em class="S_spetxt" node-type="topCount">1</em>#L{个分组}</p></div><ul class="ms_list clearfix" node-type="group_list"> </ul><ul class="ms_opt"><li class="opt"><a href="javascript:void(0);" node-type="createGroup">#L{创建新分组}</a></li><li class="notetxt" node-type="formOuter" style="display:"> <div class="quick_form" node-type="form"><p class="row" node-type="create_group" action-type="create_group" style="display:none" handle="true"><input type="" class="W_input" value="#L{新分组}" placeholder="#L{新分组}" node-type="create_gname"><a href="javascript:void(0);" class="W_btn_a" node-type="submit"><span>#L{创建}</span></a><a href="javascript:void(0);" node-type="create_cancel" action-type="create_cancel" class="cancal">#L{取消}</a></p><div class="W_tips tips_del clearfix" node-type="warning" style="display:none;" handle="true"><p class="icon"><span class="icon_delS"></span></p> <p class="txt" node-type="warning_word">#L{错误提示}</p><p class="close"><a href="javascript:void(0);" class="W_ico12 icon_close" node-type="warning_close"></a></p></div></div> </li><li class="line" node-type="line" style="display:none;"></li></ul></div>'), groupItem: b('<#et list data><#list data as item><li><a href="javascript:void(0);"><input node-type="group_update" action-type="group_update" id="${data.ukey}_${item.gid}" value="${item.gid}" type="checkbox" class="W_checkbox" name="gid"<#if (item.checked)>checked="checked"</#if> ><label  title="${item.gname}" for="${data.ukey}_${item.gid}" gname="${item.gname}" class="S_txt2">${item.gname}</label></a></li></#list></#et>'), addGroupMember: b('<div a="b" node-type="outer" class="layer_menu_list myfollow_search" style="display:none;position:absolute; top:10px; left:350px; z-index:99;"><ul><li class="quick_form"><input node-type="member_input" type="" value="#L{输入昵称或备注}" class="W_input" placeholder="#L{输入已关注人昵称或备注}"></li><li class="title" style="background:#EEE" node-type="recotitle">#L{从你关注的人中推荐组员}</li><div node-type="recolist"></div><li class="title" node-type="relatitle">"<em class="S_spetxt" node-type="relavalue">夏夏</em>"#L{相关用户}</li><div node-type="relalist"></div></ul></div>'), addMemberItem: b('<#et list data><#list data as item><li ucardconf="type=0" action-type="member" action-data="<#if (item.bilateral)>bilateral=${item.bilateral}</#if>&profile_image_url=${item.profile_image_url}&introduce=${item.introduce}&uid=${item.uid}&gid=${item.gid}&gname=${item.gname}<#if (item.encodeRemark)>&remark=${item.encodeRemark}</#if>&screen_name=${item.screen_name}<#if (item.vip)>&vip=true</#if><#if (item.verify == "person")>&verify=person<#elseif (item.verify == "enterprise")>&verify=enterprise<#elseif (item.verify == "daren")>&verify=daren<#elseif (item.verify == "vgirl")>&verify=vgirl</#if>" class="notetxt"><img usercard="id=${item.uid}" class="headpic" height="50" width="50" src="${item.profile_image_url}"><div class="con"><p class="name" usercard="id=${item.uid}">${item.screen_name}<#if (item.verify == "person")><i class="W_ico16 approve"></i><#elseif (item.verify == "enterprise")><i class="W_ico16 approve_co"></i><#elseif (item.verify == "daren")><i class="W_ico16 ico_club"></i><#elseif (item.verify == "vgirl")><i class="W_ico16 ico_vlady"></i></#if><#if (item.vip)><i class="W_ico16 ico_member"></i></#if></p><p class="info S_txt2"><#if (item.remark)>${item.remark}<#else>${item.introduce}</#if></p><p class="info S_txt2">${item.short_gname}</p></div></li></#list></#et>'), groupListItem: b('<#et list data><div class="myfollow_list S_line2 SW_fun" node-type="user_item" action-data="uid=${data.uid}&screen_name=${data.screen_name}&gid=${data.gid}<#if (data.screen_remark)>&remark=${data.screen_remark}</#if>" action-type="user_item"><div class="selected"></div> <div class="face" action-type="ignore_list"><a href="${data.url}" target="_blank"> <img src="${data.profile_image_url}" usercard="id=${data.uid}" alt="${data.screen_name}"></a> </div> <ul class="info"><li><a node-type="screen_name" class="S_func1" action-type="ignore_list" href="${data.url}" target="_blank" title="<#if (data.remark)>${data.remark}<#else>${data.screen_name}</#if>"><#if (data.short_remark)>${data.short_remark}<#else>${data.screen_name}</#if></a><#if (data.verify)><#if (data.verify == "person")><a target="_blank" href="http://verified.weibo.com/verify"><i title="#L{新浪个人认证}" class="W_ico16 approve" action-type="ignore_list"></i></a><#elseif (data.verify == "enterprise")><a target="_blank" href="http://verified.weibo.com/verify"><i title="#L{新浪机构认证}" class="W_ico16 approve_co" action-type="ignore_list"></i></a><#elseif (data.verify == "daren")><a target="_blank" href="http://club.weibo.com/intro"><i title="#L{微博達人}" class="W_ico16 ico_club" node-type="daren" action-type="ignore_list"></i></a><#elseif (data.verify == "vgirl")><a target="_blank" href="http://vgirl.weibo.com"><img src="http://img.t.sinajs.cn/t4/style/images/common/transparent.gif" title="#L{微博女郎}" alt="#L{微博女郎}" class="W_ico16 ico_vlady"></a></#if></#if><#if (data.vip)><a title="#L{微博會員}" target="_blank" href="http://vip.weibo.com/personal?from=main"><i class="W_ico16 ico_member" action-type="ignore_list"></i></a></#if></li><li><#if (data.bilateral)><span><em class="W_ico12 icon_addtwo"></em>#L{互相关注}</span><#else><span><em class="W_ico12 icon_addone"></em>#L{已关注}</span></#if></li><li><a class="S_link2" action-data="gid=${data.gid}&uid=${data.uid}" action-type="set_group"diss-data="refer_sort=relationManage&location=${data.location}&refer_flag=add" node-type="set_group" href="javascript:void(0);" title="${data.gname}">${data.short_gname}<span class="W_arrow"><em class="down">◆</em></span></a></li></ul><div class="intro S_txt2"><#if (data.introduce)>#L{简介}:${data.introduce}<#else>TA#L{还没有填写个人简介}</#if></div><div class="introHover"><#if (data.bilateral)><a href="javascript:void(0);" class="letter" action-type="webim.conversation" action-data="uid=${data.uid}&nick=${data.screen_name}"><i class="W_chat_stat W_chat_stat_offline" ></i>#L{私信}</a><#else><a href="javascript:void(0);" class="letter" action-type="begFollow" action-data="uid=${data.uid}&nick=${data.screen_name}">#L{求关注}</a></#if><span class="W_vline S_line1_c">|</span><a href="javascript:void(0);" action-type="set_remark" >#L{设置备注}</a><span class="W_vline S_line1_c">|</span><a href="javascript:void(0);" action-type="cancel_follow_single" >#L{取消关注}</a></div></div></#et>'), groupListItem_old: b('<#et list data><div class="myfollow_list S_line2 SW_fun" node-type="user_item" action-data="uid=${data.uid}<#if (data.screen_remark)>&remark=${data.screen_remark}</#if>" action-type="user_item"><div class="selected"></div><div class="face" action-type="ignore_list"> <a href="${data.url}"><img src="${data.profile_image_url}" usercard="id=${data.uid}" alt="${data.screen_name}"></a></div><ul class="info"><li><a action-type="ignore_list" class="S_func1" href="${data.url}" title="${data.screen_name}">${data.screen_name}</a><#if (data.verify)><#if (data.verify == "person")><a target="_blank" href="http://verified.weibo.com/verify"><i title="#L{新浪个人认证}" class="W_ico16 approve" action-type="ignore_list"></i></a><#elseif (data.verify == "enterprise")><a target="_blank" href="http://verified.weibo.com/verify"><i title="#L{新浪机构认证}" class="W_ico16 approve_co" action-type="ignore_list"></i></a><#elseif (data.verify == "daren")><a target="_blank" href="http://club.weibo.com/intro"><i title="#L{微博達人}" class="W_ico16 ico_club" node-type="daren" action-type="ignore_list"></i></a><#elseif (data.verify == "vgirl")><a target="_blank" href="http://vgirl.weibo.com"><img src="http://img.t.sinajs.cn/t4/style/images/common/transparent.gif" title="#L{微博女郎}" alt="#L{微博女郎}" class="W_ico16 ico_vlady"></a></#if></#if><#if (data.vip)><a title="#L{微博會員}" target="_blank" href="http://vip.weibo.com/personal?from=main"><i class="W_ico16 ico_member" action-type="ignore_list"></i></a></#if> </li><li><a href="javascript:;" action-type="set_remark" item-func="setRemark">(<#if (data.remark)>\t${data.remark}<#else>#L{设置备注}</#if>)</a></li><li><a class="S_link2" action-data="gid=${data.gid}&uid=${data.uid}" action-type="set_group"diss-data="refer_sort=relationManage&location=${data.location}&refer_flag=add" node-type="set_group" href="javascript:void(0);" title="${data.gname}">${data.short_gname}        \t<span class="W_arrow"><em class="down">◆</em></span></a>   </li></ul></div></#et>')}
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
STK.register("pl.relation.follow.source.trans", function (a) {
    var b = a.kit.io.inter(), c = b.register;
    c("cfinvite", {url: "/aj/invite/unread?_wv=5", method: "get"});
    c("followby", {url: "/aj/relation/followbyother?_wv=5", method: "get"});
    c("adds", {url: "/aj/relation/groupupdate?_wv=5", method: "post"});
    c("addmulti", {url: "/aj/f/group/update?_wv=5", method: "post"});
    c("addone", {url: "/aj/relation/groupupdate?_wv=5", method: "post"});
    c("removes", {url: "/aj/f/group/remove?_wv=5", method: "post"});
    c("unFollow", {url: "/aj/f/unfollow?_wv=5", method: "post"});
    c("attention", {url: "/aj/relation/attention?_wv=5", method: "get"});
    c("recommend", {url: "/aj/f/group/recommend?_wv=5", method: "get"});
    c("remarkname", {url: "/aj/f/remarkname?_wv=5", method: "post"});
    c("addgroup", {url: "/aj/f/group/add?_wv=5", method: "post"});
    c("renameGroup", {url: "/aj/relation/rename?_wv=5", method: "post"});
    c("deletegroup", {url: "/aj/relation/delete?_wv=5", method: "post"});
    c("removecf", {url: "/aj/f/removeclosefriend?_wv=5", method: "post"});
    c("getLeftNavCount", {url: "/aj/relation/groupnums?_wv=5", method: "post"});
    return b
});
STK.register("kit.extra.parseURL", function (a) {
    return function () {
        return STK.historyM && STK.historyM.parseURL ? STK.historyM.parseURL() : a.core.str.parseURL(location.href)
    }
});
STK.register("pl.relation.follow.plugin.setOrder", function (a) {
    var b = {time: 1, update: 3, word: 2, hot: 4, fans: 5}, c, d, e, f;
    return function (g, h) {
        a.preventDefault();
        d = h.setOrder = h.setOrder || {};
        h.pluginList.push(d);
        var i = a.position(g.el);
        c = {reset: function () {
            a.removeNode(d.orderPanel.outer);
            h.setOrder = d = undefined
        }, go: function (c) {
            h.nodes.list_container.innerHTML = "";
            h.orderby = b[c.data.by];
            var d = a.kit.extra.parseURL(), e = a.core.json.queryToJson(d.query), f = e.page, g = {page: 1, t: h.orderby || 1, ftype: h.scopeby || 0};
            h.trans.getTrans("followby", {onSuccess: function (b) {
                h.nodes.list_container.innerHTML = b.data;
                h.nodes = a.kit.dom.parseDOM(a.builder(h.node).list);
                h.tinyAction.disableManager();
                a.custEvent.fire(h.node, "resetManager")
            }, onError: function (a) {
            }, onFail: function (a) {
            }}).request(g)
        }};
        var j = function () {
            if (!d.orderPanel || !e) {
                d.orderPanel = h.parseDOM(a.builder(h.html.listOrder).list);
                d.dEvt = a.delegatedEvent(d.orderPanel.outer);
                d.dEvt.add("order", "click", c.go);
                f = a.sizzle('em[node-type="arrow"]', g.el)[0];
                e = h.hider(g.el, d.orderPanel.outer, {hideEvent: function () {
                    f.className = "down"
                }, showEvent: function () {
                    f.className = "up"
                }});
                a.custEvent.add(h.node, "resetManager", c.reset);
                document.body.appendChild(d.orderPanel.outer)
            }
            d.destroy = c.reset;
            a.setStyle(a.sizzle('[node-type="' + g.data.by + '"]', d.orderPanel.outer)[0], "display", "none");
            a.setXY(d.orderPanel.outer, {t: i.t + g.el.offsetHeight + 2, l: i.l + 1})
        };
        j()
    }
});
STK.register("pl.relation.follow.plugin.setScope", function (a) {
    var b, c, d;
    return function (b, e) {
        a.preventDefault();
        S = e.setScope = e.setScope || {};
        e.pluginList.push(S);
        var f = a.kit.extra.parseURL(), g = a.core.json.queryToJson(f.query), h = a.position(b.el), i = {reset: function () {
            a.removeNode(S.scopePanel.outer);
            e.setScope = S = undefined
        }, go: function (b) {
            e.nodes.list_container.innerHTML = "";
            e.scopeby = b.data.type;
            S.scopePanel.outer.style.display = "none";
            var c = a.kit.extra.parseURL(), d = a.core.json.queryToJson(c.query), f = d.page;
            e.trans.getTrans("followby", {onSuccess: function (b) {
                e.nodes.list_container.innerHTML = b.data;
                e.nodes = a.kit.dom.parseDOM(a.builder(e.node).list);
                e.tinyAction.disableManager();
                a.custEvent.fire(e.node, "resetManager")
            }, onError: function (a) {
            }, onFail: function (a) {
            }}).request({page: g.page || 1, t: e.orderby || 1, ftype: e.scopeby || 0})
        }}, j = function () {
            if (!e.setScope || !S.scopePanel) {
                S.scopePanel = e.parseDOM(a.builder(e.html.listScope).list);
                d = a.sizzle('em[node-type="arrow"]', b.el)[0];
                e.hider(b.el, S.scopePanel.outer, {hideEvent: function () {
                    d.className = "down"
                }, showEvent: function () {
                    d.className = "up"
                }});
                c = a.delegatedEvent(S.scopePanel.outer);
                c.add("scope", "click", i.go);
                a.custEvent.add(e.node, "resetManager", i.reset)
            }
            S.destroy = i.reset;
            document.body.appendChild(S.scopePanel.outer);
            a.setXY(S.scopePanel.outer, {t: h.t + b.el.offsetHeight + 2, l: h.l + 1})
        };
        j()
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
STK.register("common.dialog.inviteFollow", function (a) {
    var b = '<#et begFollow data><div class="layer_invite_question" node-type="begFollowPanel"><input type="hidden" name="fuid" value="${data.uid}"><#if (data.questionList&&data.questionList.length)><div class="inqueBg"><p class="question_title">#L{答对&nbsp;%s &nbsp;的问题，即可发送邀请：}</p><dl class="clearfix"><dt>#L{提问：}</dt><dd><select name="qid" class="htc_select" node-type="questionList"><#list data.questionList as list><option value="${list.question}">${list.question_text}</option></#list></select></dd><dt><span class="S_spetxt">*</span>#L{回答：}</dt><dd class="form_table_single"><input node-type="answer" type="text" value="#L{在这里填写答案}" class="W_input" name="answer"><div class="M_notice_del" node-type="answer_error" style="display:none;"></div></dd></dl></div></#if><dl class="inqueBgNo clearfix"><dt><span class="S_spetxt">*</span>#L{说点什么吧：}</dt><dd class="additional form_table_single"><textarea node-type="content" class="W_input" cols="" rows="" name="content">#L{介绍一下自己吧}</textarea><div class="M_notice_del" style="display:none;" node-type="content_error"></div></dd></dl><div class="btn"><a href="javascript:;" node-type="submit" class="W_btn_a"><span>#L{发送邀请}</span></a><a node-type="cancel" href="javascript:;" class="W_btn_b"><span>#L{取消}</span></a></div></div></#et>', c = a.kit.extra.language, d = '<span class="icon_del"></span><span class="txt">{error}</span>';
    return function (e) {
        e = e || {};
        var f, g, h = a.parseParam({answer: "#L{在这里填写答案}", content: "#L{介绍一下自己吧}", success: "#L{邀请发送成功！}", ans_error: "#L{请输入答案哦。}", con_error: "#L{请输入你想说的话。}", title: "#L{邀请%s关注我}", defMsg: "", callback: a.core.func.empty, succCallback: a.core.func.empty}, e || {}), i = e.trans || "answer", j = e.successCb || function () {
            a.ui.tip("lite", {msg: c(h.success), type: "succM", timer: "500"})
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
STK.register("kit.extra.custData", function (a) {
    return function (b, c) {
        if (c && typeof c == "string")c = c.toLowerCase(); else {
            a.log("need a string param as the second arguments");
            return
        }
        return{set: function (d, e) {
            if (!!a.isNode(b)) {
                var f = a.queryToJson(b.getAttribute(c) || "") || {};
                f[d] = e;
                b.setAttribute(c, a.jsonToQuery(f))
            }
        }, get: function (d) {
            if (!a.isNode(b))return"";
            var e = a.queryToJson(b.getAttribute(c) || "") || {};
            return e[d] || ""
        }}
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
STK.register("pl.relation.follow.plugin.setGroup", function (a) {
    var b, c = '<span class="W_arrow"><em class="down">◆</em></span>', d = '<span class="W_arrow"><em class="up">◆</em></span>', e, f = !0, g = !1, h, i, j, k;
    return function (b, c) {
        k = b.dEvent;
        var e = {}, f = "", j, l, m, n = [], o, p, q = !0, r = {click: function (a) {
            var b = a.evt, c = b.target || b.srcElement;
            if (l.outer.style.display == "none" || g != a.data.uid) {
                s.hideCallback();
                t(a)
            } else u();
            return!1
        }, bdClick: function (b) {
            var d = a.fixEvent(b), e = d.target || d.srcElement;
            if (!!e) {
                var f = a.kit.dom.parentElementBy(e, c.nodes.user_list, function (a) {
                    if (a.getAttribute("action-type") == "user_item")return!0
                });
                if (a.contains(l.outer, e) || l.outer == e || h && h.el == e || f && f.getAttribute("action-type") == "user_item")return;
                u()
            }
        }}, s = {getData: function () {
            var b = [], d = [], e = l.group_update;
            for (var f in e)if (e[f].checked) {
                var g = a.core.dom.next(e[f]).innerHTML;
                b.push(g);
                d.push(e[f].value)
            }
            b.length || (b = [c.L("#L{未分组}")]);
            return{gnames: b, gids: d}
        }, addUserCB: function () {
            var b = a.kit.extra.actionData(h.el), c = s.getData();
            b.set("gid", c.gids.join(","));
            h.el.innerHTML = d;
            a.core.dom.insertHTML(h.el, a.core.str.leftB(c.gnames.join(","), 12), "afterbegin");
            h.el.setAttribute("title", c.gnames.join(","))
        }, removeUserCB: function () {
            if (!h || !!h.el.parentNode) {
                var b = a.kit.extra.actionData(h.el), c = s.getData();
                b.set("gid", c.gids.join(","));
                h.el.innerHTML = d;
                a.core.dom.insertHTML(h.el, a.core.str.leftB(c.gnames.join(","), 12), "afterbegin");
                h.el.setAttribute("title", c.gnames.join(","))
            }
        }, hideCallback: function () {
            if (!(!h || !h.el || !h.el.parentNode)) {
                var b = !1, d = !1, e = a.kit.dom.parentElementBy(h.el, c.nodes.list_container, function (a) {
                    if (a.getAttribute("action-type") == "user_item")return!0
                }), f = l.group_update;
                for (var g in f)if (f[g].checked) {
                    b = !0;
                    f[g].value == c.cgid && (d = !0)
                }
                c.cgid != "allFollow" && (c.cgid == 0 && b || c.cgid != 0 && c.cgid != "allFollow" && !d) && a.removeNode(e);
                a.custEvent.fire(c.node, "updateLeftNavCount");
                h = undefined
            }
        }}, t = function (b) {
            try {
                u()
            } catch (d) {
            }
            i = a.common.getDiss(c.dissData, b.el);
            g = b.data.uid;
            h = b;
            l.handleState = !1;
            l.outer.style.display = "";
            var e = b.data.gid.split(",");
            l.setData({uids: [b.data.uid], gids: e, nick: b.data.nick, actNode: b.el, sex: b.data.sex || "m"});
            l.setDissNode(b.el);
            var f = a.position(b.el);
            a.setXY(l.outer, {t: f.t + b.el.offsetHeight + 2, l: f.l});
            var j = a.sizzle("em", b.el)[0];
            j.className = "up"
        }, u = function () {
            l.outer.style.display = "none";
            l.handleState = !1;
            if (h) {
                var b = a.sizzle("em", h.el)[0];
                b && (b.className = "down")
            }
            s.hideCallback()
        }, v = function () {
        }, w = function () {
            l = c.groupPanel.getOne({from: "single", addUserCB: s.addUserCB, removeUserCB: s.removeUserCB})
        }, x = function () {
            k.add("set_group", "click", r.click);
            a.addEvent(document.body, "click", r.bdClick)
        }, y = function () {
            v();
            w();
            x()
        }, z = function () {
            k.remove("set_group", "click", r.click);
            a.removeEvent(document.body, "click", r.bdClick);
            a.removeNode(l.outer)
        };
        y();
        e.destroy = z;
        return e
    }
});
STK.register("ui.prompt", function (a) {
    var b = '<div class="layer_prompt" node-type="outer"><p class="son_title" node-type="inner"></p><dl class="clearfix"><dt node-type="label"></dt><dd><input type="text" class="W_input W_input_default" value="" node-type="input" /><p class="S_error" node-type="errorBox"><span class="icon_del"></span><span node-type="errorTxt"></span></p></dd></dl><div class="btn"><a class="W_btn_d" href="javascript:void(0);" node-type="OK"></a><a class="W_btn_b" href="javascript:void(0);" node-type="cancel"></a></div></div>';
    return function (c) {
        var d, e, f, g, h, i, j = a.kit.extra.language, k = {check: function () {
            var a = d.check(i.value);
            a.status ? k.hideError() : k.showError(a.msg);
            return a.status
        }, showError: function (a) {
            e.errorBox.style.visibility = "visible";
            e.errorTxt.innerHTML = a
        }, hideError: function () {
            e.errorBox.style.visibility = "hidden"
        }}, l = {ok: function () {
            k.check() && d.OK(i.value)
        }}, m = {init: function () {
            m.pars();
            m.build();
            m.bind()
        }, pars: function () {
            d = a.parseParam({title: j("#L{提示}"), notice: "", value: "", info: "", label: "", OK: a.funcEmpty, cancel: a.funcEmpty, check: function () {
                return{status: !0}
            }, OKText: j("#L{确定}"), cancelText: j("#L{取消}"), id: ""}, c || {})
        }, build: function () {
            f = a.ui.dialog(d.id);
            f.setContent(j(b));
            f.setTitle(d.title);
            e = f.getDomList(!0);
            g = e.OK;
            h = e.cancel;
            i = e.input;
            e.inner.innerHTML = d.info;
            e.label.innerHTML = d.label;
            g.innerHTML = "<span>" + d.OKText + "</span>";
            h.innerHTML = "<span>" + d.cancelText + "</span>";
            e.errorBox.style.visibility = "hidden";
            e.errorTxt.innerHTML = "";
            f.inputNode = i;
            f.input = a.kit.dom.smartInput(i);
            f.input.setValue(d.value);
            f.input.setNotice(d.notice);
            f.input.restart();
            f.show().setMiddle()
        }, bind: function () {
            a.custEvent.add(f.input, "enter", l.ok);
            a.addEvent(g, "click", l.ok);
            a.addEvent(h, "click", f.hide);
            a.addEvent(i, "blur", k.check);
            a.custEvent.add(f, "hide", function () {
                a.custEvent.remove(f, "hide", arguments.callee);
                a.custEvent.remove(f.input, "enter", l.ok);
                a.removeEvent(g, "click", l.ok);
                a.removeEvent(h, "click", f.hide);
                a.removeEvent(i, "blur", k.check);
                d.cancel();
                f.destroy()
            })
        }};
        m.init();
        f.showError = k.showError;
        f.hideError = k.hideError;
        return f
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
            h.input.setMaxLength(30);
            setTimeout(function () {
                var b = h.inputNode;
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
STK.register("pl.relation.follow.plugin.setRemark", function (a) {
    return function (b, c) {
        var d = a.kit.dom.parentElementBy(b.el, c.nodes.list_container, function (a) {
            if (a.getAttribute("action-type") == "user_item")return!0
        }), e = a.kit.extra.actionData(d), f = a.queryToJson(d.getAttribute("action-data")), g = decodeURIComponent(f.remark);
        a.common.dialog.setRemark({remark: f.remark ? a.decodeHTML(g) : undefined, uid: a.core.json.queryToJson(d.getAttribute("action-data")).uid, callback: function (b) {
            var c = a.sizzle('[node-type="screen_name"]', d)[0];
            if (!b) {
                text = f.screen_name;
                e.del("remark")
            } else {
                text = b;
                e.set("remark", encodeURIComponent(text))
            }
            c.title = text;
            var g = a.core.str.leftB(a.encodeHTML(text), 16);
            g != a.encodeHTML(text) && (g = a.core.str.leftB(g, 15) + "...");
            c.innerHTML = g
        }})
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
STK.register("pl.relation.follow.plugin.setGroupName", function (a) {
    var b = a.kit.extra.language;
    return function (c) {
        var d = {}, e, f, g = c.dEvent, h = "private", i = {cancel: function () {
            e.hide()
        }, submit: function () {
            c.trans.getTrans("renameGroup", {onSuccess: function (a) {
                window.location.reload()
            }, onError: function (b) {
                e.hide();
                a.common.layer.ioError(b.code, b)
            }}).request({name: f.group_name.value, desc: f.group_describe.value, gid: c.cgid, mode: h, _t: 0})
        }}, j = function (c) {
            f.group_name.value = a.decodeHTML(decodeURIComponent(c.data.gname));
            f.group_describe.value = a.decodeHTML(decodeURIComponent(c.data.gdesc));
            e.appendChild(f.outer);
            e.setTitle(b("#L{编辑分组信息}"));
            e.show().setMiddle();
            h = c.data.mode || h
        }, k = function () {
            e = a.ui.dialog();
            f = a.kit.dom.parseDOM(a.builder(c.html.editGroup).list)
        }, l = function () {
            g.add("edit_group_name", "click", j);
            a.addEvent(f.cancel, "click", i.cancel);
            a.addEvent(f.submit, "click", i.submit)
        }, m = function () {
            k();
            l()
        };
        m();
        var n = function () {
            e.destroy();
            g.remove("edit_group_name", "click", j);
            a.removeEvent(f.cancel, "click", i.cancel);
            a.removeEvent(f.submit, "click", i.submit)
        };
        return{destroy: n}
    }
});
STK.register("pl.relation.follow.plugin.deleteGroup", function (a) {
    return function (b, c) {
        a.ui.confirm(c.L('#L{确定要删除}"' + decodeURIComponent(b.data.gname) + '"分组吗？<br />#L{此分组下的人不会被取消关注。}'), {OK: function () {
            c.trans.getTrans("deletegroup", {onSuccess: function (a) {
                window.location.href = "http://weibo.com/" + $CONFIG.uid + "/myfollow"
            }, onFail: function (b) {
                a.ui.alert(b.msg);
                S.groupPanel.hide();
                action.destroy()
            }, onError: function (b) {
                a.ui.alert(b.msg);
                S.groupPanel.hide();
                action.destroy()
            }}).request({gid: c.cgid})
        }})
    }
});
STK.register("pl.relation.follow.plugin.cancelFollow", function (a) {
    var b = {refer_sort: "relationManage", location: "", refer_flag: "unfollow_all"}, c = {};
    return function (d, e) {
        var f = e.L("#L{这些人}");
        d.elem && (c = a.common.getDiss(b, d.elem));
        if (d.type == "multi") {
            e.tinyAction.pushSelected();
            if (!e.managerState)return;
            var g = [];
            for (var h in e.selected)g.push(a.core.json.queryToJson(e.selected[h].getAttribute("action-data")).uid);
            e.selected.length == 1 && (f = '"' + a.core.json.queryToJson(e.selected[0].getAttribute("action-data")).screen_name + '"')
        }
        var i = function (b, c) {
            e.trans.getTrans(c, {onSuccess: function () {
                switch (d.type) {
                    case"single":
                        var b = d.unfollow;
                        if (b) {
                            a.core.dom.hasClassName(d.node, "selected") && a.fireEvent(d.node, "click");
                            a.removeNode(d.node)
                        } else {
                            var c = a.sizzle('[node-type="set_group"]', d.node)[0], f = c.title.split(","), g = [];
                            for (var h in f)g.push(f[h]);
                            c.title = g.join(",");
                            c.innerHTML = a.encodeHTML(g.join(",").slice(0, 10)) + "...";
                            var i = a.core.json.queryToJson(c.getAttribute("action-data"));
                            c.setAttribute("action-data", a.core.json.jsonToQuery(i))
                        }
                        break;
                    case"multi":
                        for (var h in e.selected)a.removeNode(e.selected[h]);
                        break;
                    default:
                }
                e.tinyAction.disableManager();
                a.custEvent.fire(e.node, "updateLeftNavCount")
            }, onFail: function (b) {
                a.ui.alert(b.msg)
            }, onError: function (b) {
                a.ui.alert(b.msg)
            }}).request(b)
        }, j = {uid: d.type == "single" ? d.uid : g.join(",")};
        j = a.core.json.merge(c, j);
        a.ui.confirm(a.core.util.language("#L{确认要取消对%s的关注吗？}", {}, d.type == "single" ? d.nick : f), {OK: function () {
            j.refer_flag = d.type == "single" ? "unfollow" : "unfollow_all";
            i(j, "unFollow")
        }})
    }
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
STK.register("lib.litter.bubbleLayer", function (a) {
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
            f = a.ui.layer({template: k});
            g = f.getBox();
            h = f.getDomList().inner;
            j = f.getDomList().arrow;
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
STK.register("lib.litter.popCard", function (a) {
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
        this.bubLayer = a.lib.litter.bubbleLayer(undefined, undefined, b.template);
        this.cardPanel = this.bubLayer.getBox();
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
STK.register("common.group.groupListPanel", function (a) {
    var b = a.kit.extra.language, c = $CONFIG.miyou == "1", d = b("#L{我的推荐}");
    return function (e) {
        var f = {}, g = a.C("div"), h = {}, i = {}, j, k = a.delegatedEvent(g), l = $CONFIG.imgPath + "style/images/common/transparent.gif", m = [
            {mode: "public", className: "W_ico16 i_conn_public", title: b("#L{所有人可见}")},
            {mode: "private", className: "W_ico16 i_conn_private", title: b("#L{仅自己可见}")},
            {mode: "friend", className: "W_ico16 i_conn_list", title: b("#L{组内成员可见}")}
        ], n = function (a, b, c) {
            if (!!a) {
                c && (c = c.toUpperCase());
                var d = a[b];
                while (d) {
                    if (d.nodeType == 1 && (c ? d.nodeName == c : !0))break;
                    d = d[b]
                }
                return d
            }
        }, o = e.multi ? 'style="display:none;"' : '<#if (item.belong==1)><#else>style="display:none;"</#if>', p = '<h4 class="lsfl_visibility" style="display:none;"><img class="#{className}" alt="" src="' + l + '">#{title}</h4><div class="lsfl_listsBox"><ul node-type="#{mode}" class="lsfl_listsBox_ul"></ul></div>', q = a.core.util.easyTemplate('<#et listItem gList><#list gList as item><li <#if (item.recom_join)> class="S_bg1"</#if> <#if (item.recom_add)> class="S_bg1" style="width:auto;"</#if> ><label for="${item.gid}"><input action-type="select" id="${item.gid}" type="checkbox"<#if (item.recom_join)> recom_join="1" </#if> <#if (item.belong==1)>checked="checked"</#if> class="W_checkbox" value="${item.gid}"><span >${item.gname}</span></label><#if (item.recom_join)><span class="S_bg1 S_txt2">(' + b("#L{建议加为这个分组}") + ")</span>" + "</#if>" + "<#if (item.recom_add)>" + '<span class="S_bg1 S_txt2">(' + b("#L{勾选此组即可将这个帐号推荐给粉丝}") + ")</span>" + "</#if>" + "</li>" + "</#list>" + "</#et>"), r = "", s = function (b) {
            var c = document.createTextNode(b), d = a.C("div");
            d.appendChild(c);
            var e = d.innerHTML;
            d = c = null;
            return e
        }, t = function () {
            var b = "";
            for (var c = 0; c < m.length; c++)b += a.templet(p, m[c]);
            g.innerHTML = b;
            j = a.kit.dom.parseDOM(a.core.dom.builder(g).list);
            e.data && D(e.data)
        }, u = function () {
            var b = !1;
            for (var f = 0; f < m.length; f++) {
                var i = m[f].mode;
                !e.multi && i === "private" && (j[i].innerHTML = r);
                if (h[i]) {
                    for (var k = h[i].length; k--;) {
                        h[i][k].desc && (h[i][k].desc = h[i][k].desc);
                        h[i][k].gname == d && (b = !0)
                    }
                    var l = q(h[i]).toString();
                    j[i].innerHTML += l
                } else(!c || i !== "private") && A(j[i], !0)
            }
            !h["public"] && !b && e.data.length < 20 && (j["public"].innerHTML += q([
                {belong: 0, desc: "", gid: "-1", gname: d, mode: "public", recom_add: 1}
            ]).toString());
            try {
                var n = a.sizzle('input[node-type="cfSelect"]', g)[0] || {}, o = (e.cftype || 0) > 0;
                setTimeout(function () {
                    n.checked = o
                }, 0)
            } catch (p) {
            }
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
        var v = function (b) {
            var c = n(b, "parentNode", "li");
            if (!!c) {
                var d = a.sizzle('input[action-type="select"]', c)[0];
                i[d.id] || (i[d.id] = {});
                return i[d.id]
            }
        }, w = {addCloseFriend: function (a) {
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
        }}, x = function () {
            k.add("select", "click", w.select);
            k.add("miyouHelp", "click", w.miyouHelp)
        }, y = function () {
        }, z = function () {
            t();
            x();
            y()
        }, A = function (b, c) {
            var d = a.domPrev(b.parentNode);
            if (d.style.display === (c ? "" : "none")) {
                d.style.display = c ? "none" : "";
                b.parentNode.style.display = c ? "none" : ""
            }
        }, B = function () {
            return g
        }, C = function (b) {
            var c = b.mode || "private";
            h[c] = h[c] || [];
            h[c].push(b);
            var d = q([b]).toString();
            a.insertHTML(j[c], d, "beforeend");
            A(j[c], !0)
        }, D = function (b) {
            h = {};
            if (a.isArray(b))for (var c = 0, d = b.length; c < d; c++) {
                var e = b[c].mode || "private";
                h[e] = h[e] || [];
                h[e].push(b[c])
            }
            u()
        }, E = function () {
            var b = [], c = {suda: [], diss: {allGroup: 0, autoSelect: 0, gid: [], uid: $CONFIG.uid}}, d = a.sizzle('input[action-type="select"]', g), f = a.sizzle('input[node-type="cfSelect"]', g)[0] || {}, h, i;
            c.diss.allGroup = d.length;
            for (var j = d.length; j--;) {
                var k = {};
                h = i = !1;
                if (d[j].checked) {
                    h = !0;
                    var l = v(d[j]);
                    if (l) {
                        k.gid = d[j].value;
                        b.push(k)
                    }
                }
                if (d[j].getAttribute("recom_join")) {
                    i = !0;
                    c.diss.autoSelect++;
                    c.diss.gid.push(d[j].value)
                }
                (i || h) && c.suda.push(d[j].value + (i ? "_a" : "_b") + (h ? "_1" : "_0"))
            }
            var m = (e.cftype || 0) > 0;
            f.checked !== m && (b.isCfInvite = f.checked ? "add" : "delete");
            b.suda_diss = c;
            return b
        }, F = function () {
            u()
        }, G = function () {
            h = {};
            u()
        }, H = function () {
            k.destroy();
            i = null;
            h = null;
            j = null;
            g = null
        }, I = function () {
            var b = a.sizzle('input[action-type="select"]', g);
            return b.length
        };
        z();
        f.getOuter = B;
        f.length = I;
        f.add = C;
        f.setData = D;
        f.getData = E;
        f.reset = F;
        f.clear = G;
        f.destroy = H;
        return f
    }
});
STK.register("common.layer.vipError", function (a) {
    var b = '<#et temp data><div node-type="outer" class="layer_point"><dl class="point clearfix"><dt><span class="${data.icon}" node-type="icon"></span></dt><dd node-type="inner">${data.info}</dd></dl><div class="btn"><a href="###" <#if (data.lbtnStyle == 1)>class="W_btn_a"<#else if (data.lbtn == 0)>class="W_btn_b"</#if> node-type="lbtn"><span><#if (data.lbtnIcon == 1)><i class="W_ico16 ico_member"></i></#if>${data.lbtnText}</span></a><a href="###" <#if (data.rbtnStyle == 1)>class="W_btn_a"<#else if (data.rbtn == 0)>class="W_btn_b"</#if> node-type="rbtn"><span><#if (data.rbtnIcon == 1)><i class="W_ico16 ico_member"></i></#if>${data.rbtnText}</span></a></div></div></#et>', c = {success: "icon_succM", error: "icon_errorM", warn: "icon_warnM", "delete": "icon_delM", question: "icon_questionM"}, d = a.kit.extra.language, e = function (e) {
        var f, g, h;
        f = a.parseParam({title: d("#L{提示}"), icon: "warn", info: "", lbtnFunc: a.funcEmpty, lbtnStyle: 0, lbtnIcon: 0, lbtnText: d("#L{立即开通会员}"), rbtnFunc: a.funcEmpty, rbtnStyle: 0, rbtnIcon: 0, rbtnText: d("#L{立即开通会员}")}, e);
        f.icon = c[f.icon];
        var g = a.ui.layer({template: a.core.util.easyTemplate(b, f).toString()}), i = g.getDomList();
        h = a.ui.dialog();
        h.setContent(g.getBox());
        h.setTitle(f.title);
        var j = function () {
            f.lbtnFunc();
            h.hide()
        }, k = function () {
            f.rbtnFunc();
            h.hide()
        };
        a.addEvent(i.lbtn, "click", j);
        a.addEvent(i.rbtn, "click", k);
        a.custEvent.add(h, "hide", function () {
            a.custEvent.remove(h, "hide", arguments.callee);
            a.removeEvent(i.lbtn, "click", j);
            a.removeEvent(i.rbtn, "click", k)
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
    var b = ["changeStatus", "follow", "unFollow", "removeFans", "block", "unBlock", "addFriends", "removeFriends", "updateRemark"];
    return a.common.listener.define("common.channel.relation", b)
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
                    d.fire("changeStatus", {uid: f.uid, action: b, both: f.relation && f.relation.follow_me == 1});
                    var h = g.onSuccessCb;
                    typeof h == "function" && h(f)
                }, onError: function (b, c) {
                    a.common.layer.ioError(b.code, b);
                    var d = g.onFailCb;
                    typeof d == "function" && d()
                }, requestAjax: i, param: h, onRelease: function () {
                    var a = g.onFailCb;
                    typeof a == "function" && a()
                }};
                f.validateIntercept(c, h, j)
            }});
            i.request(h)
        } else a.common.trans.relation.request(b, {onSuccess: function (a, c) {
            var f = e(g, a.data);
            d.fire(b, f);
            d.fire("changeStatus", {uid: f.uid, action: b, both: f.relation && f.relation.follow_me == 1});
            var h = g.onSuccessCb;
            typeof h == "function" && h(f)
        }, onError: function (b, c) {
            a.common.layer.ioError(b.code, b);
            var d = g.onFailCb;
            typeof d == "function" && d()
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
STK.register("lib.follow.followButton", function (a) {
    var b = a.kit.extra.language, c = a.templet, d = a.common.channel.relation, e = '<div class="W_btn_c"><span><em class="W_ico12 icon_addone"></em>#L{已关注}<em class="W_vline S_txt2">|</em><a class="S_link1" href="javascript:void(0);" action-type="unFollow" action-data="#{actionData}">#L{取消}</a></span></div>', f = '<div class="W_btn_c"><span><em class="W_ico12 icon_addtwo"></em>#L{互相关注}<em class="W_vline S_txt2">|</em><a class="S_link1"  href="javascript:void(0);" action-type="unFollow" action-data="#{actionData}">#L{取消}</a></span></div>', g = '<b class="W_btn_c"><span><em class="W_ico12 icon_addone"></em>#L{已关注}<a style="display:none" action-type="unFollow" action-data="#{actionData}"></a></span></b>', h = '<b class="W_btn_c"><span><em class="W_ico12 icon_addtwo"></em>#L{互相关注}<a style="display:none" action-type="unFollow" action-data="#{actionData}"></a></span></b>', i = '<a class="W_btn_b" href="javascript:void(0)" action-type="follow" action-data="#{actionData}"><span><em class="addicon">+</em>#L{关注}</span></a>', j = '<a class="W_btn_b" href="javascript:void(0)" action-type="follow" action-data="#{actionData}"><span><em class="W_ico12 icon_addone"></em><em class="W_vline S_txt2">|</em><em class="addicon">+</em>#L{关注}</span></a>', k = '<div class="W_addbtn_even">#L{已加入黑名单}<span class="W_vline">|</span><a class="S_link2" href="javascript:void(0);" action-type="unBlock" action-data="#{actionData}"><em>#L{解除}</em></a></div>', l = '<a class="W_btn_b" href="javascript:void(0);"><span><b class="loading"></b>关注</span></a>';
    return function (m) {
        var n = {}, m = a.parseParam({outer: null, outNodeExpr: '[node-type="followBtnBox"]', temp_follow: b(e), temp_followBoth: b(f), temp_follow_nocancel: b(g), temp_followBoth_nocancel: b(h), temp_unfollow: b(i), temp_unfollowFan: b(j), temp_block: b(k), temp_loading: b(l), refer_sort: "", refer_flag: "", needSync: !1, followOpts: null}, m), o, p = a.common.relation.followPrototype, q = a.common.dialog.setGroup, r = a.ui.confirm, s = a.ui.tip;
        a.custEvent.define(n, ["change", "showDialog"]);
        var t = a.delegatedEvent(m.outer), u, v = function (b) {
            return a.core.dom.dir.parent(b, {expr: m.outNodeExpr})[0]
        }, w = {follow: function (b) {
            a.preventDefault();
            if (!!v(b.el)) {
                var d = b.el.getAttribute("action-data"), e = b.data, f = v(b.el), g = f.innerHTML, h;
                e.onSuccessCb = function (b) {
                    var e = b.relation, g = e && e.follow_me == 1, h = b.nocancel == 1;
                    f.innerHTML = c(m[(g ? "temp_followBoth" : "temp_follow") + (h ? "_nocancel" : "")], {actionData: d});
                    a.custEvent.fire(n, "change", {state: "follow", spec: b});
                    b.groupList = b.group;
                    if (!b.nogroup) {
                        o || (o = q());
                        o.show(b);
                        a.custEvent.fire(n, "showDialog")
                    }
                };
                e.onFailCb = function (b) {
                    h && (f.innerHTML = h);
                    a.custEvent.fire(n, "showDialog")
                };
                e.onRelease = function () {
                    f.innerHTML = g
                };
                setTimeout(function () {
                    h = f.innerHTML;
                    f.innerHTML = m.temp_loading;
                    e.refer_sort = e.refer_sort || m.refer_sort;
                    e.refer_flag = e.refer_flag || m.refer_flag;
                    p.follow(e)
                }, 0)
            }
        }, unFollow: function (d) {
            a.preventDefault();
            if (!!v(d.el)) {
                var e = d.data, f = a.jsonToQuery(e), g = v(d.el), h;
                e.onSuccessCb = function (b) {
                    var d = b.relation, e = d && d.follow_me == 1;
                    g.innerHTML = c(m[e ? "temp_unfollowFan" : "temp_unfollow"], {actionData: f});
                    a.custEvent.fire(n, "change", {state: "unfollow", spec: b})
                };
                e.onFailCb = function (a) {
                    h && (g.innerHTML = h)
                };
                var i = function (b) {
                    var c = parseInt(a.getStyle(b, "zIndex")), d;
                    while (b == document.body) {
                        b = b.parentNode;
                        d = parseInt(a.getStyle(b, "zIndex"));
                        d > c && (c = d);
                        if (!a.contains(document.body, b))return
                    }
                    return c
                }, j = function () {
                    h = g.innerHTML;
                    g.innerHTML = m.temp_loading;
                    e.refer_sort = "";
                    p.unFollow(e)
                };
                u && u.destroy();
                u = s("confirm", {type: "ask", msg: b("#L{确定不再关注%s？}", e.fnick), hideCallback: function () {
                    u.destroy && u.destroy();
                    u = null
                }, okCallback: j});
                u.setLayerXY(d.el);
                u.setIndex("100000");
                u.aniShow()
            }
        }, unBlock: function (d) {
            a.preventDefault();
            if (!!v(d.el)) {
                var e = d.el.getAttribute("action-data"), f = d.data, g = v(d.el), h;
                f.onSuccessCb = function () {
                    g.innerHTML = c(m.temp_unfollow, {actionData: e});
                    a.custEvent.fire(n, "change", {state: "unfollow,unBlock", spec: d})
                };
                f.onFailCb = function (a) {
                    h && (g.innerHTML = h)
                };
                var i = function () {
                    h = g.innerHTML;
                    g.innerHTML = m.temp_loading;
                    p.unBlock(f)
                };
                r(b("#L{确认将此用户从你的黑名单中移除吗？}"), {OK: i});
                a.custEvent.fire(n, "showDialog")
            }
        }}, x = function (b) {
            var d = b.uid, e = b.action.toLowerCase(), f = b.both, g = b.fan, h = a.sizzle(m.outNodeExpr + " [action-type]", m.outer);
            for (var i = 0, j = h.length, k, l, n; i < j; i++) {
                k = h[i];
                n = a.queryToJson(k.getAttribute("action-data"));
                if (n.uid == d) {
                    var o = v(k), p = a.jsonToQuery(n);
                    if (e == "unfollow")o.innerHTML = c(m[g ? "temp_unfollowFan" : "temp_unfollow"], {actionData: p}); else if (e == "unblock")o.innerHTML = c(m.temp_unfollow, {actionData: p}); else if (e == "follow") {
                        var q = n.nocancel == 1;
                        o.innerHTML = c(m[(f ? "temp_followBoth" : "temp_follow") + (q ? "_nocancel" : "")], {actionData: p})
                    }
                }
            }
        }, y = function () {
            a.foreach(w, function (a, b) {
                t.add(b, "click", a)
            });
            m.needSync && d.register("changeStatus", x)
        }, z = function () {
            if (m.outer) {
                a.foreach(w, function (a, b) {
                    t.remove(b, "click", a)
                });
                t.destroy()
            }
            m.needSync && d.remove("changeStatus", x)
        }, A = function () {
            m.outer && y()
        };
        A();
        n.destroy = z;
        return n
    }
});
STK.register("common.dialog.recommendPeople", function (a) {
    var b = a.kit.extra.language, c = a.common.trans.relation, d = a.common.layer.ioError, e = a.core.str.leftB, f = a.core.str.bLength, g = a.ui.dialog, h, i = '<div class="WB_global_layer_independent" node-type="outer" style="position:absolute;z-index:10001;"><div class="W_layer"><div class="bg"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div class="content"><div class="title" node-type="title"><span node-type="title_content"></span></div><a class="W_close" node-type="close" href="javascript:void(0);"></a><div class="layer_recommend_attention clearfix"><div class="recommend_box" node-type="scroll"><dl class="recommended clearfix"><dt class="W_fl"><a href="javascript:void(0);" target="_blank"><img width="50" height="50" node-type="avatar" src="" alt=""></a></dt><dd class="W_fl"><div class="txt" node-type="recommend"></div></dd></dl><div class="group_box"><div class="arrow"><em class="line">◆</em><span class="bg">◆</span></div><div node-type="inner"></div></div></div><div class="btn"><a href="/' + $CONFIG.uid + '/publicgroup?from=groupsreco" target="_blank" node-type="link">管理我的推荐»</a></div>' + "</div>" + "</div>" + "</td>" + "</tr>" + "</tbody>" + "</table>" + "</div>" + "</div>" + "</div>", j = '<div class="recommend_tips" node-type="tip"><span class="icon_succ"></span>#{msg} #{link}</div>', k = '<div class="recommend_tips" node-type="tip"><span class="#{icon}"></span> #{msg} #{link}</div>', l = '<a target="_blank" href="#{url}">#{text}</a>', m = '<b class="W_btn_c"><span><em class="W_ico12 icon_addone"></em>#L{已关注}<a style="display:none" action-type="unFollow" action-data="#{actionData}"></a></span></b>', n = 16, o = !1, p = {}, q = {}, r, s, t, u, v, w, x = function (c) {
        a.foreach(a.sizzle("[action-type=follow]", c), function (c) {
            if (c.parentNode.getAttribute("node-type") == "followBtnBox") {
                var d = a.queryToJson(c.getAttribute("action-data"));
                c.parentNode.innerHTML = a.templet(b(m), {actionData: c.getAttribute("action-data")})
            }
        })
    }, y = function (b) {
        b = b || [];
        "length"in b || (b = [b]);
        var c = [];
        a.foreach(b, function (b) {
            b.text && b.url && c.push(a.templet(l, b))
        });
        return b.length == 1 ? '<em class="W_vline S_txt4">|</em>' + c.join("") : '<em class="W_vline S_txt4"></em>' + c.join('<em class="W_vline S_txt4">|</em>')
    }, z = function (b) {
        return a.core.dom.dir.parent(b, {expr: "[node-type=group]"})[0]
    }, A = function (b, d) {
        var e = b.join("_");
        c.request("recommendfollow", {onSuccess: function (b, c) {
            d(p[e] = a.builder(b.data).list.group[0])
        }, onFail: H, onError: H}, {cuid: $CONFIG.uid, fuid: q.uid, gid: b[0], page: b[1], count: b[2], gname: encodeURIComponent(b[3])})
    }, B = {show: function (b) {
        var c = a.fixEvent(b).target, d = c.getAttribute("usercard");
        if (!!d) {
            u || (u = a.common.layer.userCard(c, {order: "t", zIndex: 10002}));
            u.showCard(c, d, event)
        }
    }, hide: function (b) {
        var c = a.fixEvent(b).target, d = c.getAttribute("usercard");
        !d || u && u.hideCard(c, d, event)
    }}, C = {page: function (b) {
        var c = b.data, d = b.el, e = z(d), f = e.getAttribute("followed");
        A([c.gid, c.page, c.count, e.getAttribute("gname")], function (b) {
            a.replaceNode(b, e);
            if (f) {
                b.setAttribute("followed", "followed");
                x(b)
            }
        })
    }, follow_group: function (d) {
        var e = d.data, f = d.el, g = z(f);
        e.gname = encodeURIComponent(g.getAttribute("gname"));
        var i = c.getTrans("followGroup", {onComplete: function (c, d) {
            var e = {onSuccess: function (c, d) {
                var e = c.data;
                v && v.parentNode && a.removeNode(v);
                v = a.builder(a.templet(b(j), {msg: c.msg, link: y(e.link)})).list.tip[0];
                a.core.dom.insertElement(r.getDomList().inner, v, "afterbegin");
                if (a.sizzle("[node-type=group]", r.getOuter()).length > 1)a.removeNode(g); else {
                    g.setAttribute("followed", "followed");
                    x(g)
                }
                r.getDomList().scroll.scrollTop = 0
            }, onFail: H, onError: function (c, d) {
                var e = c.data;
                v && v.parentNode && a.removeNode(v);
                v = a.builder(a.templet(b(k), {icon: e.type == 1 ? "icon_delS" : "icon_errorS", msg: c.msg, link: y(e.link)})).list.tip[0];
                a.core.dom.insertElement(r.getDomList().inner, v, "afterbegin");
                r.getDomList().scroll.scrollTop = 0
            }, requestAjax: i, param: d};
            if (h) {
                h.destroy();
                h = null
            }
            h = a.common.dialog.validateCode();
            h.validateIntercept(c, d, e)
        }});
        i.request(e)
    }, close: function () {
        r.hide()
    }}, D = function () {
        p = {};
        recom_tip = r.getDomList().nomore_appear && r.getDomList().nomore_appear.checked ? "1" : "0";
        c.request("closerecommend", {}, {recom_tip: recom_tip, cuid: $CONFIG.uid});
        o = !1;
        w && E[w]({recom_tip: recom_tip})
    }, E = {old: function (a) {
        a.recom_tip == "1" && E.send("user_aftermark", "1");
        E.send("user_aftermark", "close")
    }, "new": function (a) {
        a.recom_tip == "1" && E.send("tblog_rec_att", "no_appear");
        E.send("tblog_rec_att", "close_butt")
    }, send: function (a, b) {
        window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack(a, b)
    }}, F = function () {
        r = g(null, {template: b(i)});
        s = a.delegatedEvent(r.getOuter());
        t = a.lib.follow.followButton({outer: r.getOuter(), temp_follow_nocancel: b('<b class="W_btn_c"><span><em class="W_ico12 icon_addone"></em>#L{已关注}<a style="display:none" action-type="unFollow" action-data="#{actionData}"></a></span></b>'), temp_followBoth_nocancel: b('<b class="W_btn_c"><span><em class="W_ico12 icon_addone"></em>#L{已关注}<a style="display:none" action-type="unFollow" action-data="#{actionData}"></a></span></b>'), temp_unfollow: b('<a class="W_btn_b" href="javascript:void(0)" action-type="follow" action-data="#{actionData}"><span><em class="addicon">+</em>#L{关注}</span></a>'), temp_unfollowFan: b('<a class="W_btn_b" href="javascript:void(0)" action-type="follow" action-data="#{actionData}"><span><em class="addicon">+</em>#L{关注}</span></a>'), needSync: !0});
        a.foreach(C, function (a, b) {
            s.add(b, "click", a)
        });
        a.custEvent.add(r, "hide", D);
        a.addEvent(r.getOuter(), "mouseover", B.show);
        a.addEvent(r.getOuter(), "mouseout", B.hide)
    }, G = function (c) {
        var d = c.data, g, h;
        p = {};
        if (!d || !(d = a.trim(d)))o = !1; else {
            r || F();
            var i = f(q.fnick) > n ? e(q.fnick, n) + "..." : q.fnick;
            r.getDomList().nomore_appear && (r.getDomList().nomore_appear.checked = !1);
            r.setContent(d);
            g = a.builder(r.getOuter()).list;
            h = g.group && g.group[0] && g.group[0].getAttribute("gname");
            w = h ? "new" : "old";
            if (h) {
                r.setTitle(b("#L{@%s 向你推荐}", i || "TA"));
                g.recommend[0].innerHTML = b("#L{Hi，我是 @%s，谢谢你关注我。}", i) + "<br/>" + b("#L{以下是我挑选的一些不错的帐号，推荐你关注他们！}")
            } else {
                r.setTitle(b("#L{@%s 的粉丝还关注了这些人}", i || "TA"));
                g.recommend[0].innerHTML = b("#L{Hi，我的粉丝还关注他们，觉得有意思就加个关注吧}", i)
            }
            g.avatar[0].setAttribute("src", g.imageurl[0].value);
            g.avatar[0].setAttribute("alt", i);
            g.avatar[0].parentNode.setAttribute("href", "/" + q.uid);
            document.body.appendChild(r.getOuter());
            r.show().setMiddle();
            window.WBEXP && function () {
                window.WBEXP.collect({key: "afterfollow", value: h ? "groupsreco" : "hisfanslike"}, {src: "http://rs.sinajs.cn/j.gif"});
                window.WBEXP.send();
                if (!h) {
                    var b = a.sizzle('[node-type="user"]', r.getOuter());
                    if (!b)return;
                    var c = [];
                    for (var d in b)c.push(b[d].getAttribute("uid"));
                    window.WBEXP.add("uids", c.join(","), {src: "http://rs.sinajs.cn/p2pmark.gif"});
                    window.WBEXP.add("uid", $CONFIG.uid, {src: "http://rs.sinajs.cn/p2pmark.gif"});
                    window.WBEXP.send()
                }
            }()
        }
    }, H = function (a) {
        d(a.code, a)
    };
    return function (b) {
        if (o != !0) {
            o = !0;
            q = {fnick: b.fnick, uid: b.uid};
            c.request("recommendfollow", {onSuccess: function (a, b) {
                G(a)
            }, onFail: function () {
                o = !1
            }, onError: function () {
                o = !1
            }}, {cuid: $CONFIG.uid, fuid: q.uid});
            var d = {};
            d.destroy = function () {
                if (r) {
                    a.removeEvent(r.getOuter(), "mouseover", B.show);
                    a.removeEvent(r.getOuter(), "mouseout", B.hide);
                    a.custEvent.remove(r, "hide", D);
                    devt.destroy();
                    r.destroy()
                }
                r = null;
                devt = null;
                q = null;
                u && u.destroy();
                u = null
            };
            return d
        }
    }
});
STK.register("common.dialog.setGroup", function (a) {
    var b = 30, c = "http://rs.sinajs.cn/sgmark.gif", d = a.kit.extra.language, e = d("<span>#L{等待对方接受邀请}</span>"), f = {0: d('<span><em class="addicon">+</em>#L{加密友}</span>'), 1: d("<span>#L{已为密友}</span>"), 2: d("<span>#L{等待对方接受邀请}</span>")}, g = {enable: "W_btn_b", disable: "W_btn_c_disable"}, h = {f: d("#L{邀请她成为你的密友，进行更亲密互动}："), m: d("#L{邀请他成为你的密友，进行更亲密互动}：")}, i = !0;
    return function () {
        var e = {}, h = a.ui.dialog(), j = a.ui.alert, k = {groupBox: '<div class="layer_setup_followlists follow_success" node-type="group_panel" ><input type="hidden" node-type="uid" name="touid"><div class="lsfl_Tit form_table_single" node-type="remarkPanel">#L{备注名称：}<input node-type="remarkInput" type="text" value="#L{设置备注}" class="W_input" name="remark"><div class="M_notice_del" style="display:none;"><span class="icon_del"></span>#L{备注姓名是非法的}</div></div><div class="lsfl_Tit"></div><div class="lsfl_gTit clearfix"><div class="left" node-type="message"></div><div class="right W_textb" action-type="tipsLayer"><span class="icon_askS"></span>#L{为什么要设置分组？}<div class="layer_tips" node-type="groupTips" style="display: none;"><ul><li>#L{可以在首页查看设定分组的微博} </li><li>#L{将已经关注的人设置分组，方便管理}</li><li>#L{分组信息是保密的，只有自己可见}</li></ul><span style="left:180px" class="arrow_up"></span></div></div></div><div><div class="W_loading" node-type="loading"><span>#L{正在加载，请稍候...}</span></div><div node-type="groupList"></div></div><div node-type="addGroupPanel"><div class="lsfl_addNew" node-type="showBtnBox"><a class="addnew" href="javascript:;" action-type="showBtn" suda-uatrack="key=group_aftermark&value=new"><span class="ico_addinv"></span><span class="txt">#L{创建新分组}</span></a></div><div class="lsfl_creaNew form_table_single" node-type="addGroupBox" style="display:none;"><input node-type="groupInput" type="text" value="#L{新分组}" class="W_input"><div style="display:none;" node-type="errorTips" class="M_notice_del"><span class="icon_del"></span></div><a href="javascript:;" class="W_btn_a btn_noloading" action-type="addGroup" node-type="addGroup"><span><b class="loading"></b><em node-type="createBtnTxt">#L{创建}</em></span></a><a href="javascript:;" action-type="hideBtn">#L{取消}</a><div class="reco W_fr"><input node-type="ispublic" type="checkbox" class="W_checkbox" id="id_all"><label class="check_all" for="id_all">#L{推荐给大家}</label></div></div></div><div class="btn"><a href="javascript:;" class="W_btn_a btn_noloading" action-type="submit" node-type="submit"><span><b class="loading"></b><em node-type="btnText">#L{保存}</em></span></a><a href="javascript:;" class="W_btn_b" action-type="cancel" suda-uatrack="key=group_aftermark&value=close"><span>#L{取消}</span></a></div></div>', checkBox: '<input type="checkbox" value="{value}" name="gid" class="W_checkbox" {checked} id="group_{groupId}"><label for="group_{groupId}">{name}</label>'}, l = {title: "#L{关注成功}", gEmpty: "#L{分组名不能为空}", rEmpty: "#L{备注名不能为空}", gMaxLen: "#L{请不要超过16个字符}", gDefVal: "#L{新分组}", okLabel: "#L{设置成功}", rDefVal: "#L{设置备注}", message: "#L{为 %s 选择分组}", repeat: "#L{此分组名已存在}"}, m = !1, n = [], o = 0, p = 0, q, r, s, t, u, v, w, x, y, z, A, B = {cfSuc_1: d("#L{密友邀请已经发送，请等待对方接受}"), cfSuc_2: d("#L{你已经成功添加对方为密友，你们彼此已经是密友啦}"), cfSucTit_1: d("#L{需要对方通过邀请才能加为密友}")}, C = function (a) {
            s.remarkInput.value = d(l.rDefVal);
            s.groupInput.value = d(l.gDefVal);
            s.loading.style.display = "";
            s.groupList.innerHTML = "";
            s.showBtnBox.style.display = "";
            s.addGroupBox.style.display = "none"
        }, D = function () {
            a.common.dialog.recommendPeople(q)
        }, E = function (a, b) {
            var c, e;
            if (a == "addGroup") {
                c = d("#L{创建}");
                e = "createBtnTxt"
            } else {
                c = d("#L{保存}");
                e = "btnText"
            }
            if (b == "normal") {
                s[a].className = "W_btn_a btn_noloading";
                s[e].innerHTML = c
            } else {
                s[a].className = "W_btn_a_disable";
                s[e].innerHTML = d("#L{保存中...}")
            }
        }, F = function (b) {
            C(b);
            q = a.parseParam({uid: "", fnick: "", sex: "m", hasRemark: !0, fromFollow: !1, groupList: [], title: d(l.title), successCb: function () {
            }, cancelCb: function () {
            }}, b);
            b.tarEl && (q = a.common.getDiss(q, b.tarEl));
            y = q.successCb;
            z = q.cancelCb;
            s.uid.value = q.uid;
            if (q.hasRemark) {
                s.remarkInput.removeAttribute("disabled");
                s.remarkPanel.style.display = ""
            } else {
                s.remarkInput.setAttribute("disabled", "disabled");
                s.remarkPanel.style.display = "none"
            }
            q.groupList.length ? L(q.groupList) : N.request({uid: q.uid});
            s.message.innerHTML = d(l.message, ' <span class="W_fb">' + q.fnick + "</span>");
            h.setTitle(q.title);
            h.insertElement(s.group_panel, "beforeend");
            h.show().setTop().setMiddle()
        }, G = function (b) {
            if (!!b) {
                if (q && q.fromFollow != !0)return;
                var d = parseInt(Math.random() * 1e4), e = a.C("img");
                e.src = c + "?n=" + b.allGroup + "_" + b.autoSelect + "&gid=" + b.gid.join(",") + "&uid=" + b.uid + "&rd=" + d;
                document.body.appendChild(e);
                setTimeout(function () {
                    e.parentNode.removeChild(e)
                }, 3e3)
            }
        }, H = function (a) {
            var a = a || {};
            h.hide()
        }, I = {defVal: d(l.gDefVal), check: function (b) {
            var c = "";
            b === "" || b === this.defVal ? c = l.gEmpty : a.core.str.bLength(b) > 16 && (c = l.gMaxLen);
            return d(c)
        }, checkRepeat: function (a) {
            var b = "";
            for (var c = n.length; c--;)if (a === n[c].gname) {
                b = l.repeat;
                break
            }
            return d(b)
        }, showError: function (a) {
            s.errorTips.innerHTML = '<span class="icon_del"></span>' + a;
            s.errorTips.style.display = ""
        }, hideError: function () {
            s.errorTips.style.display = "none"
        }}, J = {defVal: d(l.rDefVal), check: function (b) {
            var c = "";
            b === "" ? c = l.rEmpty : a.core.str.bLength(b) > 16 && (c = l.gMaxLen);
            return d(c)
        }, showError: function (a) {
        }, hideError: function () {
        }}, K = function (b) {
            var c = a.C("li"), d = k.checkBox.replace(/\{value\}/g, b.gid).replace(/\{groupId\}/g, b.gid).replace(/\{name\}/g, b.gname).replace(/\{checked\}/g, b.belong ? "checked" : "");
            c.innerHTML = d;
            return c
        }, L = function (b) {
            n = b;
            s.addGroupPanel.style.display = b.length >= 20 ? "none" : "";
            a.common.trans.relation.request("checkcloserelation", {onSuccess: function (c, d) {
                var e = c.data.relation || {};
                p = c.data.close_friends_count || 0;
                var f = e[q.uid] || 0;
                !(f > 0);
                var g = {data: b, cftype: f || 0, fnick: q.fnick, uid: q.uid};
                r = a.common.group.groupListPanel(g);
                s.groupList.appendChild(r.getOuter());
                s.loading.style.display = "none";
                s.miyou_count.innerHTML = "(" + p + "/140人)"
            }}, {uid: q.uid})
        }, M = {errorCd: function (b, c) {
            if (b.code == "100096" || b.code == "100097" || b.code == "100098") {
                var e = a.common.layer.vipError(b.code, {info: b.data.html, lbtnFunc: function () {
                    location.href = b.data.gurl
                }});
                a.custEvent.add(e, "hide", H)
            } else a.ui.alert(b && b.msg || d("#L{保存失败！}"));
            E("submit", "normal")
        }, getGroupSuccess: function (a, b) {
            var c = a.data || [];
            L(c)
        }, setGroupSuccess: function (b, c) {
            E("submit", "normal");
            H();
            y(b, c);
            a.ui.tip("lite", {msg: d(l.okLabel), type: "succM", timer: "500"});
            setTimeout(D, 550)
        }, setGroupError: function (a, b) {
            I.showError(a.msg)
        }, addGroupSuccess: function (a, b) {
            E("addGroup", "normal");
            var c = a.data, e;
            s.addGroupPanel.style.display = c.length >= 20 ? "none" : "";
            for (var f in c)if (c[f].belong === 1) {
                e = c[f];
                break
            }
            e && n.push(e);
            r.add(e);
            S.hideAddPanel();
            s.groupInput.value = d(l.gDefVal);
            r.length() >= 20 && (s.addGroupPanel.style.display = "none")
        }}, N = a.common.trans.group.getTrans("list", {onSuccess: M.getGroupSuccess, onError: M.errorCd}), O = a.common.trans.group.getTrans("update", {onSuccess: M.setGroupSuccess, onError: M.errorCd, onFail: M.errorCd}), P = a.common.trans.group.getTrans("batchSet", {onSuccess: M.setGroupSuccess, onError: M.errorCd}), Q = a.common.trans.group.getTrans("add", {onSuccess: M.addGroupSuccess, onError: function (b, c) {
            E("addGroup", "normal");
            a.ui.alert(b.msg)
        }}), R = function (b) {
            var c = document.createTextNode(b), d = a.C("div");
            d.appendChild(c);
            var e = d.innerHTML;
            d = c = null;
            return e
        }, S = {showAddPanel: function () {
            s.showBtnBox.style.display = "none";
            s.addGroupBox.style.display = "";
            s.groupInput.focus();
            s.ispublic.checked = i
        }, hideAddPanel: function () {
            s.showBtnBox.style.display = "";
            s.addGroupBox.style.display = "none";
            I.hideError();
            s.groupInput.value = I.defVal
        }, addGroup: function () {
            var b = R(a.trim(s.groupInput.value)), c = I.check(b) || I.checkRepeat(b);
            if (c)I.showError(c); else {
                I.hideError();
                E("addGroup", "loading");
                Q.request({name: b, ispublic: s.ispublic.checked ? "1" : ""})
            }
        }, submit: function () {
            var b = {};
            m = !0;
            b.type = "s";
            var c = r.getData();
            A = c.isCfInvite;
            var e = [], f = s.remarkInput.value;
            f === d(l.rDefVal) && (f = "");
            b.remark = f;
            var g = s.uid.value;
            b.user = g;
            b.gid = a.jsonToStr(c);
            if (c.suda_diss && q.fromFollow == !0) {
                var h = c.suda_diss.suda, i = c.suda_diss.diss;
                window.SUDA && window.SUDA.uaTrack && window.SUDA.uaTrack("group_aftermark", "save:" + h.join(","))
            }
            E("submit", "loading");
            O.request(b)
        }, cancel: function () {
            m = !1;
            H()
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
            c.keyCode == "13" ? S.submit() : f > b && (d.value = a.core.str.leftB(e, b))
        }, showGroupTips: function () {
            s.groupTips.style.display = ""
        }, hideGroupTips: function () {
            s.groupTips.style.display = "none"
        }, closefriendBtn: function (b) {
            b.data.type != "remove" && a.common.trans.relation.getTrans("addCloseFriend", {onSuccess: function (a) {
                switch (a.data.cftype) {
                    case 1:
                    case"1":
                        s.closefriendBtn.innerHTML = f[1];
                        break;
                    default:
                        s.closefriendBtn.innerHTML = f[2]
                }
                s.closefriendBtn.setAttribute("action-data", "type=remove");
                s.miyou_count.innerHTML = "(" + ++p + "/140人)"
            }, onError: function (a) {
                s.miyouNotice_text.innerHTML = a.msg;
                s.closefriendBtn.className = g.enable
            }}).request({uid: [s.uid.value], name: "", inviteid: "", content: ""})
        }}, T = function () {
            W();
            U();
            V()
        }, U = function () {
            var b = h.getDomList(1).close;
            b.setAttribute("suda-uatrack", "key=group_aftermark&value=close");
            a.custEvent.define(e, ["hide"]);
            t = a.core.evt.delegatedEvent(s.group_panel);
            u = S.inputFocus(I);
            v = S.inputBlur(I);
            w = S.inputFocus(J);
            x = S.inputBlur(J);
            a.addEvent(s.remarkInput, "focus", w);
            a.addEvent(s.remarkInput, "blur", x);
            a.addEvent(s.groupInput, "focus", u);
            a.addEvent(s.groupInput, "blur", v);
            a.addEvent(s.remarkInput, "keyup", S.inputMaxLen);
            a.addEvent(s.groupInput, "keyup", S.inputMaxLen);
            t.add("showBtn", "click", S.showAddPanel);
            t.add("hideBtn", "click", S.hideAddPanel);
            t.add("addGroup", "click", S.addGroup);
            t.add("submit", "click", S.submit);
            t.add("cancel", "click", S.cancel);
            t.add("tipsLayer", "mouseover", S.showGroupTips);
            t.add("tipsLayer", "mouseout", S.hideGroupTips)
        }, V = function () {
            a.custEvent.add(h, "hide", function () {
                a.custEvent.fire(e, ["hide"]);
                m || z();
                var b = r.getData();
                b && b.suda_diss && G(b.suda_diss.diss)
            })
        }, W = function () {
            var b = a.core.dom.builder(d(k.groupBox));
            s = a.kit.dom.parseDOM(b.list)
        }, X = function () {
            a.custEvent.undefine(e, ["hide"]);
            a.removeEvent(s.remarkInput, "focus", w);
            a.removeEvent(s.remarkInput, "blur", x);
            a.removeEvent(s.groupInput, "focus", u);
            a.removeEvent(s.groupInput, "blur", v);
            a.removeEvent(s.remarkInput, "keyup", S.inputMaxLen);
            a.removeEvent(s.groupInput, "keyup", S.inputMaxLen);
            u = null;
            v = null;
            w = null;
            x = null;
            t && t.destroy()
        };
        T();
        e.show = F;
        e.hide = H;
        e.destroy = X;
        return e
    }
});
STK.register("common.relation.baseFollow", function (a) {
    var b = window.$CONFIG || {}, c = b.imgPath + "/style/images/common/transparent.gif";
    return function (b) {
        var c = {}, d = a.common.channel.relation, e = a.core.evt.delegatedEvent(b), f = a.common.relation.followPrototype, g = a.kit.extra.merge, h = a.kit.extra.language, i = a.common.dialog.setGroup(), j = {unFollowTips: h("#L{确认取消关注吗？}"), bothFollow: h("#L{互相关注}"), singleFollow: h("#L{已关注}")}, k = {follow: h('<div class="W_btn_c"><span><em class="W_ico12 icon_addone"></em>#L{已关注}<em class="W_vline S_txt2">|</em><a class="S_link2" action-type="{actionType}" action-data="uid={uid}&fnick={fnick}&f=1&nogroup={nogroup}" href="javascript:void(0);"><em>#L{取消}</em></a></span></div>'), unFollow: h('<a action-type="follow" action-data="uid={uid}&fnick={fnick}&f=1&nogroup={nogroup}" href="javascript:void(0);" class="W_btn_b"><span>{followMe}<em class="addicon">+</em>#L{关注}</span></a>'), block: h('<div class="W_addbtn_even">#L{已加入黑名单}<span class="W_vline">|</span><a action-type="unBlock" action-data="uid={uid}&fnick={fnick}&f=1" href="javascript:void(0);" class="S_link2"><em>#L{解除}</em></a></div>'), loading: h('<b class="loading"></b>#L{加关注}'), followMe: h('<em class="W_ico12 icon_addone"></em><em class="W_vline S_txt2">|</em>')}, l = function (a, b) {
            b = b || {};
            var c = a;
            for (var d in b)c = c.replace("{" + d + "}", b[d]);
            return c
        }, m = function (c) {
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
        }, n = {followed: function (a) {
            var b = m(a.uid);
            if (!!b) {
                var c = "addbtn_d", d = j.singleFollow, e = "unFollow", f = a.relation || {};
                if (f.following && f.follow_me) {
                    c = "addbtn_c";
                    d = j.bothFollow;
                    e = "unFollow"
                }
                var g = l(k.follow, {className: c, focDoc: d, actionType: e, uid: a.uid, fnick: a.fnick, nogroup: a.nogroup || ""});
                b.innerHTML = g || ""
            }
        }, unFollow: function (a) {
            var b = m(a.uid);
            if (!!b) {
                var c = a.relation || {}, d = l(k.unFollow, {followMe: c.follow_me ? k.followMe : "", uid: a.uid, fnick: a.fnick});
                b.innerHTML = d
            }
        }, blocked: function (a) {
            var b = m(a.uid);
            if (!!b) {
                var c = l(k.block, {uid: a.uid, fnick: a.fnick});
                b.innerHTML = c
            }
        }}, o = {followListener: function (a) {
            n.followed(a)
        }, unFollowListener: function (a) {
            n.unFollow(a)
        }, blockListener: function (a) {
            n.blocked(a)
        }, unBlockListener: function (a) {
            n.unFollow(a)
        }, removeFansListener: function (a) {
            var b = a.relation || {};
            b.following ? n.followed(a) : n.unFollow(a)
        }}, p = {follow: function (b) {
            var d = a.sizzle("span", b.el)[0];
            d.innerHTML = k.loading;
            var e = b.el.dataset && b.el.dataset.mark || b.el.getAttribute("data-mark") || "", g = {};
            e && (g = a.queryToJson(e));
            var h = a.common.getDiss(a.kit.extra.merge(a.kit.extra.merge({onSuccessCb: function (b) {
                var d = {uid: b.uid, fnick: b.fnick, groupList: b.group, hasRemark: !0, nogroup: b.nogroup || "", fromFollow: !0};
                a.custEvent.fire(c, "followSucc", d);
                d.nogroup || i.show(d)
            }, onFailCb: function () {
                a.custEvent.fire(c, "followFail")
            }}, b.data || {}), g), b.el);
            f.follow(h)
        }, unFollow: function (b) {
            if (!b.data.nogroup) {
                var c = b.data.fnick || h("#L{该用户}");
                tipFollow = a.ui.tip("confirm", {msg: j.unFollowTips, okCallback: function () {
                    f.unFollow(a.common.getDiss(b.data, b.el))
                }}), tipFollow.setText(h("#L{确定不再关注}") + c + "?");
                tipFollow.setLayerXY(b.el);
                tipFollow.aniShow()
            } else f.unFollow(a.common.getDiss(b.data, b.el))
        }, unBlock: function (b) {
            a.ui.confirm(h("#L{确认将此用户从你的黑名单中解除吗？}"), {OK: function () {
                f.unBlock(b.data)
            }})
        }}, q = function () {
            r();
            s()
        }, r = function () {
            d.register("block", o.blockListener);
            d.register("follow", o.followListener);
            d.register("unBlock", o.unBlockListener);
            d.register("unFollow", o.unFollowListener);
            d.register("removeFans", o.removeFansListener)
        }, s = function () {
            e.add("follow", "click", p.follow);
            e.add("unBlock", "click", p.unBlock);
            e.add("unFollow", "click", p.unFollow);
            a.custEvent.define(c, ["followSucc", "followFail"])
        }, t = function (b) {
            if (!a.core.dom.isNode(b))throw"[STK.common.relation.baseFollow]:node is not a Node!"
        }, u = function () {
            e.destroy();
            i.destroy();
            d.remove("block", o.blockListener);
            d.remove("follow", o.followListener);
            d.remove("unBlock", o.unBlockListener);
            d.remove("unFollow", o.unFollowListener);
            d.remove("removeFans", o.removeFansListener);
            o = null
        };
        q();
        c.destroy = u;
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
                d = a.lib.litter.popCard({template: j});
                h = a.common.relation.baseFollow(d.cardPanel);
                a.custEvent.add(h, "followSucc", x);
                a.custEvent.add(h, "followFail", x);
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
            o.register("unFollow", y.rmCache);
            o.register("changeStatus", y.rmCache)
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
STK.register("pl.relation.follow.plugin.addGroupMember", function (a) {
    var b, c, d, e, f, g, h = {}, i, j, k, l = 0, m = {up: 38, down: 40, left: 37, right: 39, enter: 13}, n = function (b) {
        var c = a.C("img");
        c.src = b;
        c.style.display = "none";
        document.body.appendChild(c);
        setTimeout(function () {
            c.parentNode.removeChild(c)
        }, 3e4)
    }, o = function (b) {
        var c = a.fixEvent(b), d = c.target, e = d.getAttribute("usercard");
        if (!!e) {
            g || (g = a.common.layer.userCard(d, {order: "t"}));
            g.showCard(d, e, c)
        }
    }, p = function (b) {
        var c = a.fixEvent(b), d = c.target, e = d.getAttribute("usercard");
        if (!!e) {
            g || (g = a.common.layer.userCard(d, {order: "t"}));
            g.hideCard(d, e, c)
        }
    };
    return function (d, f) {
        var g = f.cgid, q = {code96: {main: "#L{该组成员已达上限，你可以管理分组后再尝试！}", notice: '<span class="S_spetxt">#L{开通会员}</span>#L{可提高分组成员上限}<a href="http://vip.weibo.com/prividesc?priv=11010" target="_blank" class="S_link2"> #L{了解更多}»</a>', leftBtn: "#L{管理分组}", leftLink: "http://weibo.com/" + $CONFIG.uid + "/myfollow?gid=" + g, rightBtn: "#L{开通会员}", rightLink: "http://vip.weibo.com/paycenter?from=group"}, code97: {main: "#L{该组成员已达上限，你可以管理分组后再尝试！}", leftBtn: "#L{管理分组}", leftLink: "http://weibo.com/" + $CONFIG.uid + "/myfollow?gid=" + g, rightBtn: "#L{我知道了}"}, code98: {}}, r = '<#et list data><div node-type="outer" style="" class="W_layer"><div class="bg"><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><div class="content" node-type="layout_content"><div class="title" node-type="title">#L{提示}</div><a href="javascript:void(0);" node-type="close" class="W_close"></a><div class="layer_point" node-type="inner"><dl class="point clearfix"><dt><span class="icon_warnM"></span></dt><dd><p class="W_texta"><a href="javascript:void(0);">${data.main}</p><#if (data.notice)><p class="W_textb">${data.notice}</p></#if></dd></dl><div class="btn"><a href="${data.leftLink}" class="W_btn_a"><span>${data.leftBtn}</span></a><a <#if (data.rightLink)>href="${data.rightLink}"<#else>href="javascript:void(0);" node-type="close_btn"</#if> class="W_btn_i" <#if (data.nodeType)>node-type="${data.nodeType}"</#if>><span><img class="ico_member" alt="" src="http://img.t.sinajs.cn/t4/style/images/common/transparent.gif">${data.rightBtn}</span></a></div></div></div></td></tr></tbody></table></div></div></#et>';
        b = f.node;
        var s = function () {
            var b = arguments[1], c = w(), d = c[b].getAttribute("action-data");
            d = a.core.json.queryToJson(d);
            var e = d.gname;
            d.gname = d.gname + "," + f.topHandler.getName();
            if (d.remark) {
                d.remark = decodeURIComponent(d.remark);
                d.short_remark = a.core.str.leftB(d.remark, 15);
                d.short_remark != d.remark && (d.short_remark += "...")
            }
            d.url = "http://weibo.com/u/" + d.uid;
            d.gid += "," + g;
            d = a.core.json.merge(k, d);
            var h = {fuid: d.uid, action: "add", gid: g, _t: 0};
            h = a.core.json.merge(k, h);
            f.trans.getTrans("adds", {onSuccess: function (a) {
                x.success(a, d)
            }, onFail: x.fail, onError: x.error}).request(h)
        }, t = function (b) {
            b.remark && (b.screen_remark = encodeURIComponent(b.remark));
            var c = a.core.util.easyTemplate(f.html.groupListItem, b).toString(), e = f.parseDOM(a.builder(c).list);
            f.listHandler.insertItemBefore([e.user_item]);
            u(d.node, f.L("#L{添加成功！}"))
        }, u = function (b, c) {
            e = a.ui.tip("alert", {direct: "up", type: "succ", msg: c});
            e.setLayerXY(b);
            e.aniShow();
            setTimeout(function () {
                e.aniHide()
            }, 1e3)
        }, v = function () {
            var b = arguments[1], d = w();
            for (var e in d)d[e].style.background = "#FFF";
            d[b].style.background = "#EEE";
            var f = d[b].getAttribute("action-data");
            c.member_input.value = a.core.json.queryToJson(f).screen_name
        }, w = function () {
            return a.sizzle('li[action-type="member"]', c.outer)
        }, x = {success: function (b, c) {
            a.custEvent.fire(i, "onClose");
            c.short_gname = a.encodeHTML(a.core.str.leftB(c.gname, 12) + "...");
            c.remark && (c.remark = decodeURIComponent(c.remark));
            c.url = "http://weibo.com/u/" + c.uid;
            c.gid += "," + g;
            t(c);
            A();
            var e = a.kit.extra.custData(d.node, "suda-uatrack");
            e.set("value", "putin:" + g + ":" + c.uid);
            var f = "http://rs.sinajs.cn/sgfollow2.gif?uid=" + $CONFIG.uid;
            n(f)
        }, error: function (b) {
            var c, d = function (b) {
                var c = a.ui.dialog(null, {template: f.L(b)});
                c.show();
                c.setMiddle();
                var d = a.sizzle('[node-type="close_btn"]', c.getBox());
                d[0] && a.addEvent(d[0], "click", c.hide)
            };
            switch (b.code) {
                case 100096:
                case"100096":
                    c = a.core.util.easyTemplate(r, q.code96).toString();
                    d(c);
                    break;
                case 100097:
                case"100097":
                    c = a.core.util.easyTemplate(r, q.code97).toString();
                    d(c);
                    break;
                case 100098:
                case"100098":
                    c = a.core.util.easyTemplate(r, q.code97).toString();
                    d(c);
                    break;
                default:
                    a.ui.alert(b.msg || f.L("#L{添加失败！}"))
            }
        }, fail: function (b) {
            a.ui.alert(b.msg)
        }}, y = {click: function () {
            if (c.outer.style.display == "none") {
                z();
                B()
            } else A()
        }, keyup: function (b) {
            var d = a.fixEvent(b);
            if (!c.member_input.value)B(b); else {
                c.member_input.value = a.core.str.leftB(c.member_input.value, 40);
                C(c.member_input.value, b)
            }
        }, inputClick: function () {
            c.member_input.value = ""
        }, bdClick: function (b) {
            var e = a.fixEvent(b);
            !a.contains(d.node, e.target) && !a.contains(c.outer, e.target) && A()
        }}, z = function () {
            c.outer.style.display = "";
            var b = a.position(d.node);
            a.setXY(c.outer, {t: b.t + d.node.offsetHeight + 6, l: b.l - 1});
            j.className = "up";
            D.reset();
            c.member_input.value = f.L("#L{输入昵称或备注}")
        }, A = function () {
            if (!!c.outer) {
                c.outer.style.display = "none";
                if (!j)return;
                j.className = "down"
            }
        }, B = function () {
            f.trans.getTrans("recommend", {onSuccess: function (b) {
                if (!!b.data.length) {
                    b.data = b.data.slice(0, 5);
                    for (var c in b.data) {
                        b.data[c].short_gname = a.core.str.leftB(b.data[c].gname, 10);
                        b.data[c].remark && (b.data[c].encodeRemark = encodeURIComponent(b.data[c].remark))
                    }
                    var d = a.core.util.easyTemplate(f.html.addMemberItem, b.data);
                    D.setReco(d)
                }
            }, onError: function () {
            }, onFail: function () {
            }}).request({gid: g})
        }, C = function (b, d) {
            if (d.keyCode != m.up && d.keyCode != m.down && d.keyCode != m.left && d.keyCode != m.right) {
                var e = l++;
                setTimeout(function () {
                    if (c.outer.style.display != "none") {
                        if (e != l - 1)return;
                        f.trans.getTrans("attention", {onSuccess: function (b) {
                            D.reset();
                            if (!!b.data.length) {
                                b.data = b.data.slice(0, 5);
                                for (var c in b.data) {
                                    b.data[c].short_gname = a.core.str.leftB(b.data[c].gname, 10);
                                    b.data[c].remark && (b.data[c].encodeRemark = encodeURIComponent(b.data[c].remark))
                                }
                                var d = a.core.util.easyTemplate(f.html.addMemberItem, b.data);
                                D.setRela(d)
                            }
                        }, onError: function () {
                        }, onFail: function () {
                        }}).request({type: 0, q: b, extend_info: 1})
                    }
                }, 500)
            }
        }, D = {setReco: function (a) {
            c.recotitle.style.display = "";
            c.recolist.innerHTML = a
        }, setRela: function (a) {
            c.relatitle.style.display = "";
            c.relavalue.innerHTML = c.member_input.value;
            c.relalist.innerHTML = a
        }, hideRela: function () {
            c.relatitle.style.display = "none"
        }, hideReco: function () {
            c.recotitle.style.display = "none"
        }, reset: function () {
            c.recolist.innerHTML = "";
            c.relalist.innerHTML = "";
            D.hideRela();
            D.hideReco()
        }}, E = function () {
            d.node = a.sizzle('[action-type="add_group_member"]', f.node)[0];
            if (!d.node)return!1;
            k = a.common.getDiss(f.dissData, d.node);
            c = f.parseDOM(a.builder(f.html.addGroupMember).list);
            document.body.appendChild(c.outer);
            j = a.sizzle('[node-type="arrow"]', d.node)[0];
            return!0
        }, F = function () {
            i = a.ui.mod.suggest({textNode: c.member_input, uiNode: c.outer, actionType: "member", actionData: "nick", flag: ""});
            a.custEvent.add(i, "onSelect", s);
            a.custEvent.add(i, "onIndexChange", v);
            a.custEvent.fire(i, "open", c.member_input);
            a.addEvent(d.node, "click", y.click);
            a.addEvent(c.member_input, "keyup", y.keyup);
            a.addEvent(c.member_input, "click", y.inputClick);
            a.addEvent(c.outer, "mouseover", o);
            a.addEvent(c.outer, "mouseout", p);
            a.addEvent(document.body, "click", y.bdClick)
        }, G = function () {
            a.custEvent.remove(i, "onSelect", s);
            a.custEvent.remove(i, "onIndexChange", v);
            a.removeEvent(d.node, "click", y.click);
            a.removeEvent(c.member_input, "keyup", y.keyup);
            a.removeEvent(c.member_input, "click", y.inputClick);
            a.removeEvent(c.outer, "mouseover", o);
            a.removeEvent(c.outer, "mouseout", p);
            a.removeEvent(document.body, "click", y.bdClick);
            a.removeNode(c.outer);
            c = j = d.node = undefined;
            d = {}
        }, H = function () {
            visible = !0;
            !E() || F()
        };
        H();
        h.destroy = G;
        h.init = H;
        return h
    }
});
STK.register("pl.relation.follow.plugin.addToOtherGroup", function (a) {
    var b = $CONFIG.group || [], c = '<span class="W_arrow"><em class="down">◆</em></span>', d = "", e, f, g = {}, h, i = [], j = {}, k, l, m, n, o;
    return function (b) {
        var c = {addGroupCB: function () {
        }, addUserCB: function () {
        }, removeUserCB: function () {
        }, updateInfoCard: function () {
            if (a.historyM) {
                a.custEvent.fire(b.node, "updateLeftNavCount");
                a.historyM.pushState(window.location.toString().replace(/^http:\/\/.*?\//, "/"))
            } else window.location.reload()
        }, getUids: function () {
            var c = [];
            b.tinyAction.pushSelected();
            for (var d in b.selected) {
                var e = b.selected[d].getAttribute("action-data");
                c.push(a.queryToJson(e).uid)
            }
            return c
        }}, d = {click: function (b) {
            var c = a.fixEvent(b), d = c.target || c.srcElement;
            g.outer.style.display == "none" ? e(d) : f()
        }, bdClick: function (b) {
            var c = a.fixEvent(b), d = c.target || c.srcElement;
            if (!a.contains(g.outer, d)) {
                if (m == d || a.contains(m, d))return;
                g.outer.style.display != "none" && f()
            }
        }}, e = function (d) {
            if (!!b.managerState) {
                g.handleState = !1;
                g.outer.style.display = "";
                var e = c.getUids();
                if (e.length == 1) {
                    var f = b.selected[0];
                    if (!f)i = "m"; else var h = f.getAttribute("action-data"), i = a.queryToJson(h).sex
                }
                g.setData({uids: e, sex: i || "m"});
                d.getAttribute("node-type") != "add_to_other_group" && (d = a.kit.dom.parentElementBy(d, b.node, function (a) {
                    if (a.getAttribute("node-type") == "add_to_other_group")return!0
                }));
                var j = a.position(d);
                a.setXY(g.outer, {t: j.t + d.offsetHeight + 2, l: j.l});
                o && (o.className = "up")
            }
        }, f = function () {
            if (!!g.outer) {
                g.outer.style.display = "none";
                if (g.handleState) {
                    b.tinyAction.clearSelected();
                    c.updateInfoCard()
                }
                g.handleState = !1;
                o && (o.className = "down")
            }
        }, h = function () {
            n = b.cgid;
            m = b.nodes.add_to_other_group;
            o = a.sizzle('[node-type="arrow"]', m)[0];
            g = b.groupPanel.getOne({hideGid: n, data: {}, dissNode: m, addGroupCB: c.addGroupCB, addUserCB: c.addUserCB, removeUserCB: c.removeUserCB});
            a.removeNode(g.cancel_follow)
        }, i = function () {
            a.addEvent(m, "click", d.click);
            a.addEvent(document.body, "click", d.bdClick)
        }, k = function () {
            h();
            i()
        };
        k();
        var l = function () {
            a.removeEvent(m, "click", d.click);
            a.removeEvent(document.body, "click", d.bdClick);
            a.removeNode(g.outer)
        };
        j.destroy = l;
        j.init = k;
        return j
    }
});
STK.register("pl.relation.follow.plugin.moveoutGroup", function (a) {
    var b;
    return function (c, d) {
        d.tinyAction.pushSelected();
        if (!!d.managerState) {
            b = a.common.getDiss(d.dissData, c.el);
            var e = [];
            for (var f in d.selected)e.push(a.core.json.queryToJson(d.selected[f].getAttribute("action-data")).uid);
            var g = {gid: d.cgid, uids: e.join(",")};
            g = a.core.json.merge(b, g);
            a.ui.confirm(d.L("#L{确定要从当前分组移出这些人吗}") + "?", {OK: function () {
                d.trans.getTrans("removes", {onSuccess: function (b) {
                    for (var c in d.selected)a.removeNode(d.selected[c]);
                    d.tinyAction.disableManager();
                    a.custEvent.fire(d.node, "updateLeftNavCount")
                }, onFail: function (b) {
                    a.ui.alert(b.msg)
                }, onError: function (b) {
                    a.ui.alert(b.msg)
                }}).request(g)
            }})
        }
    }
});
STK.register("pl.relation.follow.plugin.hider", function (a) {
    return function (b, c, d) {
        var e = [], f = !1, d = a.parseParam({hideEvent: a.core.func.empty, showEvent: a.core.func.empty}, d);
        a.custEvent.define(c, ["showEvent", "hideEvent"]);
        a.custEvent.add(c, "hideEvent", d.hideEvent);
        a.custEvent.add(c, "showEvent", d.showEvent);
        var g = function () {
            c.style.display = "";
            a.custEvent.fire(c, "showEvent")
        }, h = function () {
            c.style.display = "none";
            a.custEvent.fire(c, "hideEvent")
        }, i = {srcmover: function () {
            f = !0;
            g()
        }, srcmout: function () {
            f = !1;
            setTimeout(function () {
                f || h()
            }, 300)
        }, targetmover: function () {
            f = !0
        }, targetmout: function () {
            f = !1;
            setTimeout(function () {
                f || h()
            }, 300)
        }};
        a.addEvent(b, "mouseover", i.srcmover);
        a.addEvent(b, "mouseout", i.srcmout);
        a.addEvent(c, "mouseover", i.targetmover);
        a.addEvent(c, "mouseout", i.targetmout);
        g();
        var j = function () {
            a.removeEvent(b, "mouseover", i.srcmover);
            a.removeEvent(b, "mouseout", i.srcmout);
            a.removeEvent(c, "mouseover", i.targetmover);
            a.removeEvent(c, "mouseout", i.targetmout);
            setTimeout(function () {
                a.custEvent.remove(c, "hideEvent", d.hideEvent)
            }, 500);
            e = []
        };
        return{destroy: j}
    }
});
STK.register("pl.relation.follow.plugin.pager", function (a) {
    return function (b, c) {
        if ($CONFIG.bigpipe != "true") {
            var d = a.kit.extra.parseURL(), e = a.core.json.queryToJson(d.query);
            e.page = b.data.page || 1;
            e.ftype = c.scopeby || e.ftype || 0;
            e.t = c.orderby || e.t || 1;
            c.cgid && c.cgid != "0" ? e.gid = c.cgid : e.ignoreg = 1;
            window.location.href = "http://" + d.host + "/" + d.path + "?" + a.core.json.jsonToQuery(e)
        }
    }
});
STK.register("pl.relation.follow.plugin.listHandler", function (a) {
    return function (b) {
        if (!!b.nodes.user_list) {
            var c = {};
            c.box = b.nodes.user_list;
            var d = [], e = {refresh: function () {
                c.items = a.sizzle('div[action-type="user_item"]', c.box);
                d = [];
                for (var b in c.items) {
                    var e = c.items[b].getAttribute("action-data");
                    d.push(a.queryToJson(e).uid)
                }
            }, replace: function (a) {
                b.nodes.user_list.innerHTML = a;
                e.refresh()
            }, insertItemBefore: function (f) {
                b.nodes.empty && (b.nodes.empty.style.display = "none");
                e.refresh();
                if (!c.items[0])for (; f.length;) {
                    var g = f.pop(), h = a.queryToJson(g.getAttribute("action-data")).uid;
                    if (a.core.arr.indexOf(h, d) >= 0)continue;
                    try {
                        b.topHandler.setCount("+")
                    } catch (i) {
                    }
                    c.box.appendChild(g)
                } else for (; f.length;) {
                    var g = f.pop(), h = a.queryToJson(g.getAttribute("action-data")).uid;
                    if (a.core.arr.indexOf(h, d) >= 0)continue;
                    try {
                        b.topHandler.setCount("+")
                    } catch (i) {
                    }
                    a.core.dom.insertBefore(g, c.items[0])
                }
                e.refresh()
            }, insertItemAfter: function (b) {
                var d = c.items.length - 1;
                for (; b.length;)a.core.dom.insertAfter(b.pop(), c.items[d]);
                e.refresh()
            }, removeSelected: function () {
                b.tinyAction.pushSelected();
                for (; b.selected.length;)a.removeNode(b.selected.pop());
                e.refresh()
            }, clearSelected: function () {
                b.tinyAction.pushSelected();
                for (; b.selected.length;)a.removeClassName(b.selected.pop(), "selected");
                b.managerState = !1;
                b.tinyAction.disableManager()
            }};
            e.refresh();
            return e
        }
    }
});
STK.register("pl.relation.follow.plugin.topHandler", function (a) {
    return function (b) {
        if (!!b.nodes.title_name) {
            var c = {};
            c.name = b.nodes.title_name;
            c.count = b.nodes.title_count;
            c.notice = b.nodes.title_notice;
            c.describe = b.nodes.title_describe;
            var d = {setName: function (a) {
                c.name.innerHTML = a
            }, getName: function () {
                if (b.cgid == "allFollow" || b.cgid == 0)return null;
                var c = $CONFIG.group;
                for (var d in c)if (c[d].gid == b.cgid)return a.decodeHTML(c[d].gname)
            }, setCount: function (e, f) {
                var g = d.getCount(), h = d.getName();
                if (!!h) {
                    var i = a.sizzle('a[title="' + h + '"]', a.E("pl_leftNav_relation"))[0];
                    h = a.encodeHTML(h);
                    var j = b.L("#L{个}");
                    switch (e) {
                        case"+":
                            c.count.innerHTML = "(" + ++g + j + ")";
                            i.innerHTML = h + "(" + g + ")";
                            break;
                        case"-":
                            c.count.innerHTML = "(" + --g + j + ")";
                            i.innerHTML = h + "(" + g + ")";
                            break;
                        case"=":
                            c.count.innerHTML = "(" + f + j + ")";
                            i.innerHTML = h + "(" + f + ")"
                    }
                }
            }, getCount: function () {
                var b = d.getName(), c = a.sizzle('a[title="' + b + '"]', a.E("pl_leftNav_relation"))[0];
                return c.innerHTML.replace(/^.*\((\d+)\)$/, "$1") || 0
            }, showNotice: function () {
                c.notice.style.display = ""
            }, hideNotice: function () {
                c.notice.style.display = "none"
            }, getDescribe: function () {
                return a.sizzle("a", c.describe)[0] ? "" : c.describe.innerHTML
            }, setDescribe: function (a) {
                c.describe.innerHTML = a || b.L("自建分组：快来为你的分组添加描述吧！")
            }};
            window.ac = d;
            return d
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
STK.register("common.relation.userSearch", function (a) {
    return function (b, c) {
        var d = {}, e, f, g, h = "";
        c = c || {};
        c.callback = c.callback || a.funcEmpty;
        var i = c.focusedNode || b.parentNode, j = {btnClick: function (b) {
            b && a.preventDefault(b);
            var d = e.input.value;
            d !== h && c.callback(e.input.value, e.submit)
        }, inputFocus: function () {
            a.addClassName(i, "focused")
        }, inputBlur: function () {
            a.removeClassName(i, "focused")
        }}, k = function () {
            a.addEvent(e.input, "focus", j.inputFocus);
            a.addEvent(e.input, "blur", j.inputBlur);
            a.addEvent(e.submit, "click", j.btnClick)
        }, l = function () {
        }, m = function () {
            n();
            o();
            k();
            l()
        }, n = function () {
            if (!a.core.dom.isNode(b))throw"[STK.common.relation.userSearch]:node is not a Node!"
        }, o = function () {
            var d = a.core.dom.builder(b);
            e = a.kit.dom.parseDOM(d.list);
            f = a.common.bubble.myFollowSuggest({transName: "myFollowList", type: c.type || 0, textNode: e.input, width: c.width || 137, dontSelectFirst: c.dontSelectFirst, callback: function (a) {
                c.callback(a, e.submit)
            }});
            f.show();
            h = e.input.getAttribute("notice");
            g = a.kit.dom.smartInput(e.input, {notice: h, noticeClass: "input_default", maxLength: 40})
        }, p = function () {
            f && f.hide && f.hide();
            f && f.destroy && f.destroy();
            g && g.destroy && g.destroy();
            e.submit && a.removeEvent(e.submit, "click", j.btnClick);
            e.input && a.removeEvent(e.input, "focus", j.inputFocus);
            e.input && a.removeEvent(e.input, "blur", j.inputBlur);
            f = g = j = e = null
        };
        m();
        d.destroy = p;
        return d
    }
});
STK.register("pl.relation.follow.plugin.searchHandler", function (a) {
    return function (b) {
        if (!!b.nodes.search) {
            var c = b.search = b.search || {}, d = {}, e, f = !0, g = {keyup: function (b) {
                var c = a.fixEvent(b);
                c.keyCode == 13 && g.submit();
                d.input.value = a.core.str.leftB(d.input.value, 40)
            }, submit: function () {
                a.preventDefault();
                var b = encodeURIComponent(d.input.value), c = window.location.href;
                if (/\?/.test(c)) {
                    /(\?|\&)page=([^&]+)/.test(c) && (c = c.replace(/(\?|\&)page=([^&]+)/, "$1page=1"));
                    /(\?|\&)gid=([^&]+)/.test(c) && (c = c.replace(/(\?|\&)gid=([^&]+)/, "$1"));
                    /(\?|\&)search=([^&]+)/.test(c) ? c = c.replace(/(\?|\&)search=([^&]+)/, "$1search=" + b) : c = c + "&search=" + b
                } else c = c + "?search=" + b;
                window.location.href = c
            }, reset: function () {
                try {
                    g.destroy()
                } catch (a) {
                }
                j()
            }, destroy: function () {
                a.removeEvent(d.submit, "click", g.submit);
                a.removeEvent(d.input, "click", g.focus);
                a.removeEvent(d.input, "blur", g.blur)
            }, focus: function () {
                if (f) {
                    d.input.value = "";
                    f = !1
                }
            }, blur: function () {
                if (!d.input.value) {
                    d.input.value = b.L("#L{输入昵称或备注}");
                    f = !0
                }
            }}, h = function () {
                d.search = b.nodes.search;
                d.submit = b.nodes.search_submit;
                d.input = b.nodes.search_input;
                d.input.setAttribute("node-type", "input");
                e = a.common.relation.userSearch(d.search, {type: 0, width: "auto", dontSelectFirst: !0, focusedNode: d.search.children[0], callback: function (a, b) {
                    typeof a != "string" && (a = a.screen_name);
                    a = encodeURIComponent(a || "");
                    b ? window.location.href = b.href + "?search=" + a : window.location.href = "/" + $CONFIG.uid + "/myfollow?search=" + a
                }})
            }, i = function () {
                a.addEvent(d.submit, "click", g.submit);
                a.addEvent(d.input, "click", g.focus);
                a.addEvent(d.input, "blur", g.blur)
            }, j = function () {
                f = !0;
                h();
                i()
            };
            j();
            return g
        }
    }
});
STK.register("pl.relation.follow.plugin.groupPanel", function (a) {
    var b, c = !0, d = {sex: $CONFIG.sex}, e = {uids: [], gids: [], inputs: []}, f = a.kit.extra.language, g = {f: f("#L{请选择分组}"), m: f("#L{请选择分组}")}, h = {showCreateGroup: function (a, b) {
        h.hideNotice(a);
        h.hideWarn(a);
        a.create_group.style.display = "";
        a.create_gname.value = b.L("#L{新分组}");
        a.createGroup.style.display = "none";
        c = !0
    }, createCancel: function (a, b) {
    }, submit: function (b, d) {
        var f = b.create_gname.value;
        if (!f || f == d.L("#L{新分组}") || c)h.showWarn(b, d.L("#L{请输入分组名称}")); else {
            h.hideWarn(b);
            d.trans.getTrans("addgroup", {onSuccess: function (c) {
                var f;
                for (var g in c.data)if (c.data[g].gname == b.create_gname.value) {
                    f = c.data[g].gid;
                    break
                }
                var i = '<li><a href="javascript:void(0);"><input action-type="group_update" node-type="group_update"  value="' + f + '" checked="checked" type="checkbox" class="W_checkbox" name="gid">' + '<label for="id2" class="S_txt2">' + a.encodeHTML(b.create_gname.value) + "</label></a></li>\t";
                a.insertHTML(b.group_list, i, "beforeend");
                h.hideCreateGroup(b);
                $CONFIG.group && $CONFIG.group.push({gid: f, gname: b.create_gname.value});
                e.inputs = b.group_update = a.sizzle('input[node-type="group_update"]', b.outer);
                h.addUser(b, d, {el: {value: f}});
                b.createGroup.style.display = $CONFIG.group.length >= 20 ? "none" : "";
                d.tinyAction.updateLeft(f, b.create_gname.value, e.uids.length);
                b.conf.addGroupCB(f)
            }, onFail: function (a) {
                h.showWarn(b, a.msg)
            }, onError: function (a) {
                h.showWarn(b, a.msg)
            }}).request({mode: "private", name: b.create_gname.value, desc: "", _t: 0})
        }
    }, cancelFollow: function (b, c, d) {
        var e = d.getAttribute("action-data");
        e = a.queryToJson(e, d);
        var f = a.kit.dom.parentElementBy(b.conf.actNode, c.nodes.user_list, function (a) {
            if (a.getAttribute("action-type") == "user_item")return!0
        });
        c.cancelFollow({type: "single", origin: "cancel_follow", node: f, elem: d, nick: e.nick, uid: e.uid}, c)
    }, groupUpdate: function (a, b, c) {
        c.el.checked ? h.addUser(a, b, c) : h.removeUser(a, b, c)
    }, addUser: function (c, d, f) {
        var g = {type: "m", _t: 0, user: "[" + e.uids.join(",") + "]", gid: "[" + f.el.value + "]"};
        g = a.core.json.merge(b, g);
        g.refer_flag = c.conf.from == "single" ? "add" : "add_all";
        h.hideWarn(c);
        h.hideNotice(c);
        i.addUser(g, d, {succ: function (a) {
            c.conf.addUserCB(f);
            h.hideNotice(c);
            h.hideWarn(c);
            h.showSuccTip(c, d)
        }, fail: function (a) {
            h.showWarn(c, a.msg);
            f.el.checked = !1
        }, error: function (b) {
            var e = "", g = a.core.dom.next(f.el).innerHTML;
            switch (b.code) {
                case 100097:
                case"100097":
                    e = d.L('<em class="W_fb">' + g + "</em> #L{已满}! ");
                    break;
                case 100096:
                case"100096":
                case 100098:
                case"100098":
                    e = d.L('<em class="W_fb">' + g + "</em> #L{已满}! " + '<a href="http://vip.weibo.com/paycenter?from=group">#L{开通微博会员}</a> #L{可提高组员上限}');
                    break;
                default:
                    e = b.msg
            }
            h.showNotice(c, e);
            f.el.checked = !1
        }})
    }, removeUser: function (c, d, f) {
        var g = {gid: f.el.value, uids: e.uids.join(",")};
        g = a.core.json.merge(b, g);
        g.refer_flag = c.conf.from == "single" ? "remove" : "remove_all";
        i.removeUser(g, d, {succ: function () {
            c.conf.removeUserCB(f);
            h.hideNotice(c);
            h.hideWarn(c);
            h.showSuccTip(c, d)
        }, fail: function (a) {
            h.showWarn(c, a.msg);
            f.el.checked = "checked"
        }, error: function (a) {
            h.showNotice(c, a.msg);
            f.el.checked = "checked"
        }})
    }, showSuccTip: function (a, b) {
        var c = a.group_update, d = 0;
        for (var e in c)c[e].checked && d++;
        if (d <= 0) {
            a.pleaseSelect.style.display = "";
            a.topSuccess.style.display = "none"
        } else {
            a.topCount.innerHTML = d;
            a.topSuccess.style.display = "";
            a.notice.style.display = "none"
        }
    }, showWarn: function (a, b) {
        a.warning.style.display = "";
        a.warning_word.innerHTML = b
    }, showNotice: function (a, b) {
        a.notice.style.display = "";
        a.notice_word.innerHTML = b;
        a.topSuccess.style.display = "none"
    }, hideWarn: function (a) {
        a.warning.style.display = "none"
    }, hideNotice: function (a) {
        a.notice.style.display = "none"
    }, hideCreateGroup: function (a) {
        a.create_group.style.display = "none";
        a.createGroup.style.display = "";
        h.hideNotice(a);
        h.hideWarn(a)
    }, hideSuccTip: function (a) {
        a.topSuccess.style.display = "none"
    }, reset: function (b, c) {
        var d = a.sizzle('input[node-type="group_update"]', b.outer);
        for (var e in d)d[e].checked = !1;
        var f = a.sizzle('[handle="true"]', b.form);
        for (var e in f)f[e].style.display = "none";
        h.hideCreateGroup(b);
        h.hideNotice(b);
        h.hideWarn(b);
        h.hideSuccTip(b);
        b.topCount.innerHTML = 0;
        b.pleaseSelect.style.display = "";
        b.createGroup.style.display = $CONFIG.group.length >= 20 ? "none" : ""
    }}, i = {addUser: function (a, b, c) {
        b.trans.getTrans("addmulti", {onSuccess: function (a) {
            c && c.succ(a)
        }, onFail: function (a) {
            c && c.fail(a)
        }, onError: function (a) {
            c && c.error(a)
        }}).request(a)
    }, removeUser: function (a, b, c) {
        b.trans.getTrans("removes", {onSuccess: function (a) {
            c && c.succ(a)
        }, onFail: function (a) {
            c && c.fail(a)
        }, onError: function (a) {
            c && c.error(a)
        }}).request(a)
    }};
    return function (f) {
        var g = f.html.addToOtherGroup, i = f.html.groupItem, j, k = {setChecked: function (a, b) {
            b.gids = b.gids || [];
            if (b.gids.length)for (var c in b.gids)for (var d in e.inputs)e.inputs[d].value == b.gids[c].toString() && (e.inputs[d].checked = "checked");
            a.topCount.innerHTML = b.gids.length
        }, setUid: function (a, b) {
            e.uids = b
        }, setSex: function (a, b) {
            d.sex = b
        }, setDiss: function (c) {
            b = a.common.getDiss(f.dissData, c)
        }, setCancelFollow: function (b, c) {
            if (!!b.cancel_follow) {
                var d = {nick: c.nick, uid: c.uids[0]};
                b.cancel_follow.setAttribute("action-data", a.jsonToQuery(d))
            }
        }}, l = function (b, c) {
            var d = b.outer, e = a.sizzle('input[value="' + c.hideGid + '"]', d)[0];
            e && a.removeNode(e.parentNode.parentNode)
        }, m = function (b, c) {
            var d = a.delegatedEvent(b);
            d.add("group_update", "click", j.groupUpdate);
            return d
        }, n = function (b) {
            a.addEvent(b.createGroup, "click", j.showCreateGroup);
            a.addEvent(b.submit, "click", j.submit);
            a.addEvent(b.create_cancel, "click", j.createCancel);
            a.addEvent(b.create_gname, "click", j.clearGName);
            a.addEvent(b.cancel_follow, "click", j.cancelFollow);
            a.addEvent(b.warning_close, "click", j.hideWarn)
        }, o = function (b) {
            var d = a.getUniqueKey(), o, p, q, r = a.parseParam({from: "all", gpList: $CONFIG.group || [], hideGid: undefined, data: {}, dissNode: a.C("div"), addGroupCB: a.core.func.empty, addUserCB: a.core.func.empty, removeUserCB: a.core.func.empty, cancelFollowCB: a.core.func.empty}, b), s = [];
            for (var t in r.gpList)s.push(r.gpList[t]);
            r.gpList = s;
            r.gpList.ukey = d;
            j = {showCreateGroup: function () {
                o.handleState = !0;
                h.showCreateGroup(o, f)
            }, clearGName: function () {
                if (c) {
                    o.create_gname.value = "";
                    c = !1
                }
            }, hideWarn: function () {
                h.hideWarn(o)
            }, hideNotice: function () {
                h.hideNotice(o)
            }, submit: function () {
                o.handleState = !0;
                h.submit(o, f)
            }, createCancel: function () {
                h.hideCreateGroup(o, f)
            }, groupUpdate: function (a) {
                o.handleState = !0;
                h.groupUpdate(o, f, a)
            }, cancelFollow: function (b) {
                var c = a.fixEvent(b);
                o.handleState = !0;
                h.cancelFollow(o, f, c.target)
            }};
            o = a.kit.dom.parseDOM(a.builder(g).list);
            o.conf = r;
            o.group_list.innerHTML = a.core.util.easyTemplate(i, r.gpList).toString();
            o.group_update = e.inputs = a.sizzle('input[node-type="group_update"]', o.outer);
            document.body.appendChild(o.outer);
            l(o, r);
            m(o.outer, r);
            n(o);
            o.setData = function (b) {
                o.handleState = !1;
                o.dissNode = r.dissNode;
                var b = a.parseParam({uids: [], gids: [], nick: "", actNode: a.C("div"), sex: "m"}, b);
                o.conf.actNode = b.actNode;
                o.conf.nick = b.nick;
                k.setUid(o, b.uids);
                k.setSex(o, b.sex);
                k.setDiss(o.dissNode);
                k.setCancelFollow(o, b);
                h.reset(o, f);
                k.setChecked(o, b)
            };
            o.setDissNode = function (a) {
                o.dissNode = a;
                k.setDiss(o.dissNode)
            };
            return o
        }, p = function () {
        }, q = {};
        q.getOne = o;
        q.destroy = p;
        return q
    }
});
STK.register("pl.relation.follow.plugin.controlBar", function (a) {
    var b;
    return function (c, d) {
        if (!!d.nodes.controlBar) {
            var e = {}, f, g, h, i = 91, j, k, l, m, n, o, p = 39, q = function (b) {
                m = a.core.util.scrollPos();
                var c = a.core.dom.getSize(d.nodes.user_list);
                l = g + c.height - i - p - 12;
                a.core.util.browser.IE6 && (l += p);
                m.top > k && m.top < l ? r() : s()
            }, r = function () {
                var b = 0;
                a.core.util.browser.IE6 && (b += m.top - n - p);
                a.removeClassName(f, "page_fixed_bar");
                a.addClassName(f, "S_line2");
                f.style.position = j;
                f.style.top = p + b + "px";
                a.core.dom.insertElement(f.parentNode, o, "afterbegin")
            }, s = function () {
                a.removeClassName(f, "S_line2");
                a.addClassName(f, "page_fixed_bar");
                f.style.position = "";
                f.style.top = "";
                a.removeNode(o)
            }, t = function () {
                f = d.nodes.controlBar;
                o = f.cloneNode(!0);
                var b = d.nodes.user_list.children[0], c = f.parentNode;
                n = a.position(c).t;
                h = a.position(f).t;
                g = a.position(d.nodes.user_list).t;
                b && (i = a.core.dom.getSize(b).height);
                if (a.core.util.browser.IE6) {
                    k = h;
                    j = "absolute"
                } else {
                    k = h - p;
                    j = "fixed"
                }
            }, u = function () {
            }, v = function () {
                t();
                u();
                b = setInterval(q, 200)
            };
            v();
            var w = function () {
                clearInterval(b)
            };
            e.destroy = w;
            e.init = v;
            return e
        }
    }
});
STK.register("pl.relation.follow.plugin.begFollow", function (a) {
    var b = !1;
    return function (c, d) {
        if (!b) {
            b = !0;
            var e = a.kit.dom.parentElementBy(c.el, d.nodes.user_list, function (a) {
                if (a.getAttribute("action-type") == "user_item")return!0
            }), f = a.queryToJson(e.getAttribute("action-data"));
            a.common.trans.relation.request("questions", {onSuccess: function (c, d) {
                a.common.dialog.inviteFollow({name: f.screen_name, uid: f.uid, questionList: c.data});
                b = !1
            }, onFail: function () {
                b = !1
            }, onError: function (c, d) {
                c && c.code == "100060" ? c.msg && a.ui.confirm(c.msg, {icon: "warn", OKText: a.kit.extra.language("#L{立刻绑定}"), OK: function () {
                    window.location.href = "http://account.weibo.com/settings/mobile";
                    return a.preventDefault()
                }}) : a.common.layer.ioError(c.code, c);
                b = !1
            }}, {uid: f.uid})
        }
    }
});
STK.register("pl.relation.follow.plugin.adTween", function (a) {
    var b = a.core.ani.tween, c = a.core.dom.firstChild, d = -20;
    return function (e, f) {
        var g = f.nodes.ad_tip;
        if (!!g) {
            var h = !0, i = b(g, {end: function () {
                g.appendChild(c(g));
                g.style.top = "0px"
            }, duration: 500}), j = setInterval(function () {
                h && i.play({top: d})
            }, 2500), k = {mouseover: function () {
                h = !1
            }, mouseout: function () {
                h = !0
            }};
            a.addEvent(g.parentNode, "mouseover", k.mouseover);
            a.addEvent(g.parentNode, "mouseout", k.mouseout);
            return{destroy: function () {
                clearInterval(j);
                a.removeEvent(g.parentNode, "mouseover", k.mouseover);
                a.removeEvent(g.parentNode, "mouseoout", k.mouseoout);
                i && i.destroy && i.destroy()
            }}
        }
    }
});
STK.register("pl.relation.follow.plugin.updateLeftNavCount", function (a) {
    return function (b) {
        var c = {}, d = !1, e = function () {
            if (!d) {
                d = !0;
                b.trans.request("getLeftNavCount", {onSuccess: function (a) {
                    d = !1;
                    var c = f();
                    if (!!c && !!a.data.count) {
                        var e = a.data.count;
                        for (var g in c) {
                            var h = "gid_" + c[g].getAttribute("gid");
                            if (!e[h])continue;
                            c[g].innerHTML = c[g].innerHTML.replace(/\(\d+\)$/, "(" + e[h] + ")");
                            try {
                                c[g].getAttribute("gid") == b.cgid && b.nodes.title_count && (b.nodes.title_count.innerHTML = b.nodes.title_count.innerHTML.replace(/\d+/, e[h]));
                                b.cgid == 0 && b.nodes.title_count && (b.nodes.title_count.innerHTML = b.nodes.title_count.innerHTML.replace(/\d+/, e.gid_nogroup))
                            } catch (i) {
                            }
                        }
                    }
                }, onError: function (a) {
                    d = !1
                }}, {})
            }
        }, f = function () {
            return a.sizzle('a[node-type="leftNav_group"]', a.E("pl_leftNav_relation"))
        };
        a.custEvent.add(b.node, "updateLeftNavCount", e);
        c.destroy = function () {
            a.custEvent.remove(b.node, "updateLeftNavCount", e)
        };
        return c
    }
});
STK.register("pl.relation.follow.plugin.recommendGroup", function (a) {
    return function (b) {
        var c = b.dEvent, d = {}, e = function (b) {
            a.common.trans.relation.getTrans("recommendWholeGroup", {onSuccess: function (c) {
                a.ui.confirm(a.kit.extra.language('#L{确认不再推荐 "' + decodeURIComponent(b.data.gname) + '" 分组？}'), {OK: function () {
                    window.location.reload()
                }})
            }, onError: function (b) {
                a.common.layer.ioError(b.code, b)
            }}).request(b.data)
        }, f = function (b) {
            a.common.trans.relation.getTrans("recommendWholeGroup", {onSuccess: function (a) {
                window.location.reload()
            }, onError: function (b) {
                a.common.layer.ioError(b.code, b)
            }}).request(b.data)
        }, g = function (a) {
            switch (a.data.mode) {
                case"public":
                default:
                    f(a);
                    break;
                case"private":
                    e(a)
            }
        };
        c.add("recommend_group", "click", g);
        d.destroy = function () {
            c.remove("recommend_group", "click", g)
        };
        return d
    }
});
STK.register("pl.relation.follow.source.entry", function (a) {
    var b, c, d = {enabled: "W_btn_d", disabled: "W_btn_c_disable"};
    return function (e) {
        if (!!e && !c) {
            b = a.pl.relation.follow;
            var f, g, h, i = [], j = function () {
                c = {};
                c.node = e;
                c.args = {};
                c.args.max = 1;
                c.itemGroup = {};
                c.nodes = a.kit.dom.parseDOM(a.builder(e).list);
                if (!c.nodes.user_list) {
                    var f = a.sizzle('[class="W_empty"]', c.nodes.list_container)[0];
                    if (f) {
                        a.insertHTML(f, '<div node-type="user_list" class="mylistBox clearfix"></div>', "afterend");
                        f.setAttribute("node-type", "empty");
                        c.nodes = a.kit.dom.parseDOM(a.builder(e).list);
                        c.nodes.empty = f
                    }
                }
                if (c.nodes.hidden) {
                    var h = a.queryToJson(c.nodes.hidden.value);
                    c.cgid = h.gid
                }
                c.dissData = {refer_sort: "", location: "", refer_flag: ""};
                c.parseDOM = a.kit.dom.parseDOM;
                c.L = a.kit.extra.language;
                c.trans = b.source.trans;
                c.pluginList = [];
                c.managerState = !1;
                c.html = b.source.htmlBase;
                c.selected = [];
                c.recom = [];
                c.hider = b.plugin.hider;
                c.cancelFollow = b.plugin.cancelFollow;
                c.listHandler = b.plugin.listHandler(c);
                c.topHandler = b.plugin.topHandler(c);
                c.searchHandler = b.plugin.searchHandler(c);
                c.tinyAction = {select: function (b) {
                    if (b.el.className.indexOf("selected") >= 0) {
                        a.removeClassName(b.el, "selected");
                        var d = a.kit.extra.actionData(b.el);
                        delete c.itemGroup["uid_" + d.get("uid")]
                    } else {
                        a.addClassName(b.el, "selected");
                        var e = a.sizzle('[node-type="set_group"]', b.el)[0], d = a.kit.extra.actionData(b.el);
                        c.itemGroup["uid_" + d.get("uid")] = e
                    }
                    c.tinyAction.pushSelected();
                    c.selected.length >= c.args.max ? c.tinyAction.enableManager() : c.tinyAction.disableManager()
                }, enableManager: function () {
                    if (c.nodes.moveout_group) {
                        a.removeClassName(c.nodes.moveout_group, d.disabled);
                        a.addClassName(c.nodes.moveout_group, d.enabled)
                    }
                    if (c.nodes.cancel_follow) {
                        a.removeClassName(c.nodes.cancel_follow, d.disabled);
                        a.addClassName(c.nodes.cancel_follow, d.enabled)
                    }
                    if (c.nodes.add_to_other_group) {
                        a.removeClassName(c.nodes.add_to_other_group, d.disabled);
                        a.addClassName(c.nodes.add_to_other_group, d.enabled)
                    }
                    if (c.nodes.cancel_cf) {
                        a.removeClassName(c.nodes.cancel_cf, d.disabled);
                        a.addClassName(c.nodes.cancel_cf, d.enabled)
                    }
                    c.managerState = !0;
                    c.nodes.selectText.style.display = "";
                    c.nodes.cancel_select.style.display = "";
                    c.nodes.selectCount.innerHTML = c.selected.length
                }, disableManager: function () {
                    if (c.nodes.moveout_group) {
                        a.removeClassName(c.nodes.moveout_group, d.enabled);
                        a.addClassName(c.nodes.moveout_group, d.disabled)
                    }
                    if (c.nodes.cancel_follow) {
                        a.removeClassName(c.nodes.cancel_follow, d.enabled);
                        a.addClassName(c.nodes.cancel_follow, d.disabled)
                    }
                    if (c.nodes.add_to_other_group) {
                        a.removeClassName(c.nodes.add_to_other_group, d.enabled);
                        a.addClassName(c.nodes.add_to_other_group, d.disabled)
                    }
                    if (c.nodes.cancel_cf) {
                        a.removeClassName(c.nodes.cancel_cf, d.enabled);
                        a.addClassName(c.nodes.cancel_cf, d.disabled)
                    }
                    c.managerState = !1;
                    c.nodes.selectText.style.display = "none";
                    c.nodes.cancel_select.style.display = "none";
                    c.itemGroup = {}
                }, pushSelected: function () {
                    c.selected = [];
                    var b = a.sizzle('div[action-type="user_item"]', c.nodes.user_list);
                    if (!!b[0])for (var d in b)b[d].className.indexOf("selected") >= 0 && c.selected.push(b[d])
                }, clearSelected: function () {
                    c.tinyAction.pushSelected();
                    for (var b in c.selected)a.removeClassName(c.selected[b], "selected");
                    c.tinyAction.disableManager()
                }, pushRecom: function () {
                    if (!!c.nodes.recommend_list) {
                        c.recom = [];
                        var b = a.sizzle('div[action-type="user_item"]', c.nodes.recommend_list);
                        for (var d in b)c.recom.push(b[d])
                    }
                }, updateInvite: function () {
                    c.cgid == "miyou" && !!c.nodes.title_invite && c.trans.getTrans("cfinvite", {onSuccess: function (a) {
                        c.nodes.title_invite_c.style.display = "none"
                    }}).request({})
                }, updateLeft: function (b, c, d) {
                    var e = a.sizzle('[node-type="moreGroup"]', a.E("pl_leftNav_relation"))[0];
                    if (!!e) {
                        c = a.encodeHTML(c);
                        var f = '<div class="lev2"><a bpfilter="relation" action-type="leftnav_link" href="/' + $CONFIG.uid + "/myfollow?gid=" + b + '" class="S_txt1" title="' + c + '">' + c + "(" + d + ")</a></div>";
                        a.insertHTML(e, f, "beforeend")
                    }
                }};
                g = {set_order: {type: "mouseover", action: b.plugin.setOrder}, set_scope: {type: "mouseover", action: b.plugin.setScope}, user_item: {type: "click", action: c.tinyAction.select}, delete_group: {type: "click", action: b.plugin.deleteGroup}, moveout_group: {type: "click", action: b.plugin.moveoutGroup}, set_remark: {type: "click", action: b.plugin.setRemark}, switchType: {type: "click", action: b.plugin.pager}, cancel_select: {type: "click", action: c.tinyAction.clearSelected}, scroll_to_recommend: {type: "click", action: function () {
                    var b;
                    (b = a.E("pl_relation_recomFollow")) && a.core.util.scrollTo(b, {top: 100, step: 1})
                }}, begFollow: {type: "click", action: b.plugin.begFollow}}
            }, k = function () {
                a.custEvent.define(e, ["addItem", "resetManager", "updateLeftNavCount"]);
                a.custEvent.add(e, "addItem", function (a, b) {
                    c.listHandler.insertItemBefore(b)
                });
                a.custEvent.add(e, "resetManager", function () {
                    c.nodes = a.kit.dom.parseDOM(a.builder(e).list);
                    c.searchHandler.reset();
                    var b = a.kit.extra.parseURL(), d = a.core.json.queryToJson(b.query), f = d.page;
                    a.historyM && a.historyM.setQuery({page: f || 1, t: c.orderby || 1, ftype: c.scopeby || 0});
                    for (var g in i)try {
                        i[g].destroy && i[g].destroy();
                        i[g].init && i[g].init()
                    } catch (h) {
                    }
                })
            }, l = function () {
                f = a.delegatedEvent(e);
                f.add("ignore_list", "click", function (a) {
                    return!1
                });
                f.add("webim.conversation", "click", function (b) {
                    a.preventDefault();
                    return!1
                });
                f.add("cancel_follow", "click", function (a) {
                    c.cancelFollow({type: "multi", origin: a.el.getAttribute("action-type"), elem: a.el}, c)
                });
                f.add("cancel_follow_single", "click", function (b) {
                    a.preventDefault();
                    var d = a.kit.dom.parentElementBy(b.el, c.node, function (a) {
                        var b = a.getAttribute("action-type");
                        if (b == "user_item")return!0
                    }), e = a.core.json.queryToJson(d.getAttribute("action-data"));
                    c.cancelFollow({type: "single", origin: "cancel_follow", node: d, elem: b.el, nick: e.screen_name, uid: e.uid}, c);
                    return!1
                });
                f.add("cancel_cf", "click", function (a) {
                    c.cancelFollow({type: "multi", origin: a.el.getAttribute("action-type"), elem: a.el}, c)
                });
                for (var b in g)f.add(b, g[b].type, function (b) {
                    return function (d) {
                        a.preventDefault();
                        b.action(d, c);
                        return!1
                    }
                }(g[b]))
            }, m = function () {
                c.dEvent = f;
                c.groupPanel = b.plugin.groupPanel(c);
                i.push(b.plugin.addGroupMember({}, c));
                i.push(b.plugin.addToOtherGroup(c));
                i.push(b.plugin.controlBar({}, c));
                i.push(b.plugin.setGroup({dEvent: f}, c));
                i.push(b.plugin.adTween({}, c));
                i.push(b.plugin.updateLeftNavCount(c));
                i.push(b.plugin.setGroupName(c));
                i.push(b.plugin.recommendGroup(c))
            }, n = function () {
                j();
                k();
                l();
                m();
                c.init = n;
                h = setInterval(c.tinyAction.updateInvite, 3e4)
            };
            n();
            c.destroy = function () {
                f.remove("ignore_list", "click");
                for (var b in g)f.remove(b, g[b].type);
                a.custEvent.remove(e, "addItem");
                a.custEvent.remove(e, "resetManager");
                a.custEvent.remove(e, "updateLeftNavCount");
                clearInterval(h);
                for (var b in i)try {
                    i[b].destroy && i[b].destroy()
                } catch (d) {
                }
                c = undefined
            };
            return c
        }
    }
});
STK.pageletM.register("pl.relation.follow.index", function (a) {
    var b = a.E("pl_relation_myfollow"), c = a.pl.relation.follow.source.entry(b);
    return c
});
