timeStat=[0];
var G = G || {};
G.index = G.index || {};
G.index.getCookie = function (a) {
    return(a = document.cookie.match(RegExp("(^| )" + a + "(?:=([^;]*))?(;|$)"))) ? a[2] ? unescape(a[2]) : "" : ""
};
G.index.data = {serverTime: function () {
    var a = (new Date(window.serverTime)).getTime();
    return a ? new Date(a) : new Date
}(), visibleH: function () {
    return document.documentElement.clientHeight || document.body.clientHeight
}(), siteId: function () {
    return G.index.getCookie("wsid") || "1"
}(), areaId: function () {
    return(G.index.getCookie("loc") || "2").split("_")[0] || "2"
}()};
$.extend(G.index, {templates: {tpl_goods: '<li>                        <div class="mod_goods mod_goods_w80" _loaded="true">                            <div class="mod_goods_img load_effect">                                <a target="_blank" href="{URL}" ytag="{ytag}" title="{TITLE}"><img src="{pic80}" alt="{TITLE}" /></a>                            </div>                            <div class="mod_goods_info">                                <p class="{TITCLASS}"><a href="{URL}" target="_blank" title="{PROMOTE}" ytag={ytag}>{PROMOTE}</a></p>                                <p class="mod_goods_price"><span class="mod_price"><i>&yen;</i><span>{PRICE}</span></span></p>                            </div>                        </div>                    </li>', tpl_hotsale: '<li>                        <div class="mod_goods mod_goods_w80" _loaded="true">                            <div class="mod_goods_img load_effect">                                <a target="_blank" href="{URL}" ytag="{ytag}" title="{TITLE}"><img src="{pic80}" alt="{TITLE}" /></a>                            </div>                            <div class="mod_goods_info">                                <p class="mod_goods_promo" style="display:{ISSHOW}"><a href="{URL}" target="_blank" title="已售{SOLDNUM}件" ytag={ytag}>已售{SOLDNUM}件</a></p>                                <p class="mod_goods_tit"><a target="_blank" href="{URL}" ytag="{ytag}" title="{TITLE}">{TITLE}</a></p>                                <p class="mod_goods_price"><span class="mod_price"><i>&yen;</i><span>{PRICE}</span></span></p>                            </div>                        </div>                    </li>',
    tpl_goodsPic: '<li class="sy_mod_fgoods_high">\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img src="{picUrl}" alt="{title}" /></a>\t\t\t\t\t\t</li>', tpl_ad: '<li><a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img _src="{picUrl}" alt="{title}" /></a></li>', tpl_tejia: '<li>                        <div class="mod_goods" _loaded="true">                            <div class="mod_goods_img load_effect">                                <a target="_blank" href="{URL}" ytag="{ytag}" title="{TITLE}"><img src="{IMG}" alt="{TITLE}" /></a>                            </div>                            <div class="mod_goods_info">                                <p class="mod_goods_price"><span class="mod_price"><i>&yen;</i><span>{PRICE}</span></span></p>                                <p class="mod_goods_tit"><a target="_blank" href="{URL}" ytag="{ytag}" title="{TITLE}">{PROMOTE}</a></p>                            </div>                        </div>                    </li>',
    tpl_quick: '<li class="dailybeta_goods_nobtn">\t\t\t\t\t\t<div class="mod_goods mod_goods_w100" _loaded="true">\t\t\t\t\t\t\t<div class="mod_goods_img load_effect">\t\t\t\t\t\t\t\t<a href="{URL}" target="_blank" title="{TITLE}" ytag="{ytag}"><img src="{pic120}" alt="{TITLE}" /><b class="{CLASSNAME}" style="display:none">{SHORT_PROMOTE}</b></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="mod_goods_info">\t\t\t\t\t\t\t\t<p class="mod_goods_tit"><a href="{URL}" target="_blank" title="{TITLE}" ytag="{ytag}">{PROMOTE}</a></p>\t\t\t\t\t\t\t\t<p class="mod_goods_price"><a href="{URL}" target="_blank" title="{TITLE}" ytag="{ytag}"><span class="mod_price mod_price_now"><i>&yen;</i><span>{PRICE}</span></span></a></p>\t\t\t\t\t\t\t\t<div class="mod_goods_stock">\t\t\t\t\t\t\t\t\t<a href="{URL}" target="_blank" title="{TITLE}" ytag="{ytag}"><em>库存</em>\t\t\t\t\t\t\t\t\t<span><i class="mod_goods_stock_bg2" w={STOCKPERCENT} style="width:100%"></i></span></a>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<p class="dailybeta_goods_btn_wrap">\t\t\t\t\t\t\t\t\t<a href="javascript:void(0)" class="dailybeta_goods_btn" pid="{COMMODITYID}" title="立即抢" ytag="{ytag}">立即抢</a>\t\t\t\t\t\t\t\t</p>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</li>',
    tpl_qbTomorrow: '<li>                            <div class="mod_goods mod_goods_w100" _loaded="true">                                <div class="mod_goods_img">                                    <a href="{URL}" target="_blank" title="{TITLE}" ytag="{{$ytag++}}"><img src="{pic120}" alt="{TITLE}" /></a>                                </div>                                <div class="mod_goods_info">                                    <p class="mod_goods_p1"><a href="{URL}" target="_blank" title="{TITLE}" ytag="{ytag}">惊喜价 请期待</a></p>                                    <p class="mod_goods_tit"><a href="{URL}" target="_blank" title="{TITLE}" ytag="{ytag}">{PROMOTE}</a></p>                                </div>                            </div>                        </li>',
    tpl_trigger: "<i>&bull;</i>", tpl_servTrigger: "<p>&bull;</p>", tpl_sliderTrigger: "<li>{index}</li>", tpl_night: '<li>\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t<div class="ulike_thh">\t\t\t\t\t\t\t\t<div class="ulike_thh_img">\t\t\t\t\t\t\t\t\t<a target="_blank" href="http://sale.yixun.com/nightmarket.html?DAP={DAP}#{COMMODITYID}" title="{TITLE}" ytag="{ytag}"><img src="{pic120}" alt="{TITLE}" /></a>\t\t\t\t\t\t\t\t\t<p class="ulike_thh_price" title="省{LESSPRICE}元"><span class="mod_price"><i>&yen;</i><span>{PRICE}</span></span><em style="display:{DISPLAY}">省{LESSPRICE}元</em><i class="ulike_corner"></i></p>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="ulike_thh_info">\t\t\t\t\t\t\t\t\t<p class="ulike_thh_tit">天黑黑开抢<b>3折起</b></p>\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time_wrap">\t\t\t\t\t\t\t\t\t\t<b class="yugaoSpan">距</b>\t\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time">\t\t\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time_item">\t\t\t\t\t\t\t\t\t\t\t\t<span class="timeH">00</span>\t\t\t\t\t\t\t\t\t\t\t\t<s></s>\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t<i></i>\t\t\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time_item">\t\t\t\t\t\t\t\t\t\t\t\t<span class="timeM">00</span>\t\t\t\t\t\t\t\t\t\t\t\t<s></s>\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t<i></i>\t\t\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time_item">\t\t\t\t\t\t\t\t\t\t\t\t<span class="timeS">00</span>\t\t\t\t\t\t\t\t\t\t\t\t<s></s></div></div></div></div></div></div>\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t<a target="_blank" href="http://sale.yixun.com/nightmarket.html?DAP={DAP}" ytag="{ytag}">天黑黑</a>\t\t\t\t\t\t</div>\t\t\t\t\t\t<a target="_blank" href="http://sale.yixun.com/nightmarket.html?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>更多抢购</b><i></i></a>\t\t\t\t\t</li>',
    tpl_moring: '<li>\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t<div class="ulike_thh ulike_zs">\t\t\t\t\t\t\t\t<div class="ulike_thh_img">\t\t\t\t\t\t\t\t\t<a target="_blank" href="http://sale.yixun.com/morningmarket.html?DAP={DAP}#{COMMODITYID}" title="{TITLE}" ytag="{ytag}"><img src="{pic120}" alt="{TITLE}" /></a>\t\t\t\t\t\t\t\t\t<p class="ulike_thh_price" title="省{LESSPRICE}元"><span class="mod_price"><i>&yen;</i><span>{PRICE}</span></span><em style="display:{DISPLAY}">省{LESSPRICE}元</em><i class="ulike_corner"></i></p>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="ulike_thh_info">\t\t\t\t\t\t\t\t\t<p class="ulike_thh_tit">早市开抢<b>3折起</b></p>\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time_wrap">\t\t\t\t\t\t\t\t\t\t<b class="yugaoSpan">距</b>\t\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time">\t\t\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time_item">\t\t\t\t\t\t\t\t\t\t\t\t<span class="timeH">00</span>\t\t\t\t\t\t\t\t\t\t\t\t<s></s>\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t<i></i>\t\t\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time_item">\t\t\t\t\t\t\t\t\t\t\t\t<span class="timeM">00</span>\t\t\t\t\t\t\t\t\t\t\t\t<s></s>\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t<i></i>\t\t\t\t\t\t\t\t\t\t\t<div class="ulike_thh_time_item">\t\t\t\t\t\t\t\t\t\t\t\t<span class="timeS">00</span>\t\t\t\t\t\t\t\t\t\t\t\t<s></s></div></div></div></div></div></div>\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t<a target="_blank" href="http://sale.yixun.com/morningmarket.html?DAP={DAP}" ytag="{ytag}">早市</a>\t\t\t\t\t\t</div>\t\t\t\t\t\t<a target="_blank" href="http://sale.yixun.com/morningmarket.html?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>更多抢购</b><i></i></a>\t\t\t\t\t</li>',
    tpl_tuan: '<li>\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t<div class="ulike_tg">\t\t\t\t\t\t\t\t<div class="ulike_tg_img">\t\t\t\t\t\t\t\t\t<a target="_blank" href="http://tuan.yixun.com/?pos={COMMODITYID}&DAP={DAP}" title="{TITLE}"><img src="{pic120}" alt="{TITLE}" /></a>\t\t\t\t\t\t\t\t\t<p class="ulike_tg_amout">已售出<b>{SALECOUNT}</b>件<i class="ulike_corner"></i></p>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="ulike_tg_info">\t\t\t\t\t\t\t\t\t<p class="ulike_tg_tit"><a target="_blank" href="http://tuan.yixun.com/?pos={COMMODITYID}&DAP={DAP}" title="{TITLE}" ytag="{ytag}">{TITLE}</a></p>\t\t\t\t\t\t\t\t\t<div class="ulike_tg_price">\t\t\t\t\t\t\t\t\t\t团购价 <span class="mod_price"><i>&yen;</i><span>{PRICE}</span></span>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="ulike_tg_price_old">\t\t\t\t\t\t\t\t\t\t易迅价 <span class="mod_price"><i>&yen;</i><del>{mPRICE}</del></span>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t<a target="_blank" href="http://tuan.yixun.com/?DAP={DAP}" ytag="{ytag}">今日团购</a>\t\t\t\t\t\t</div>\t\t\t\t\t\t<a target="_blank" href="http://tuan.yixun.com/?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>更多团购</b><i></i></a>\t\t\t\t\t</li>',
    tpl_new: ' <li>\t\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img src="{picUrl}" alt="{title}" /></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t\t<a target="_blank" href="http://new.yixun.com?DAP={DAP}" title="新品首发" ytag="{ytag}">新品首发</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<a target="_blank" href="http://new.yixun.com?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>进入新品频道</b><i></i></a>\t\t\t\t\t\t</li>',
    tpl_hao: ' <li>\t\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img src="{picUrl}" alt="{title}" /></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t\t<a target="_blank" href="http://hao.yixun.com?DAP={DAP}" title="最惠购" ytag="{ytag}">最惠购</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<a target="_blank" href="http://hao.yixun.com?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>进入最惠购频道</b><i></i></a>\t\t\t\t\t\t</li>',
    tpl_faxian: ' <li>\t\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img src="{picUrl}" alt="{title}" /></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t\t<a target="_blank" href="http://faxian.yixun.com?DAP={DAP}" title="易迅发现" ytag="{ytag}">易迅发现</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<a target="_blank" href="http://faxian.yixun.com?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>进入发现频道</b><i></i></a>\t\t\t\t\t\t</li>',
    tpl_ulikeAd: '<li>\t\t\t\t\t\t\t<div class="ulike_r1_brand">\t\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img src="{picUrl}" alt="{title}" /><span class="ulike_r1_tit"><em>{title}</em><span>{remarks}</span></span></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</li>'}, init: function () {
    0 < location.href.indexOf("admin.icson.com") ? ($("[_module]").each(function () {
        var a = $(this), d = a.show().attr("_f");
        if (d && "function" == typeof G.index[d])G.index[d]({dom: a}); else a.show()
    }), this.loadImgWhenScroll()) :
        this.gettf();
    this.servSlider();
    this.loadImgWhenScroll();
    this.scroll({id: "#j_fslider", func: this.right2FAd});
    this.scroll({id: "#j_5Fl_glider", func: this.slider5F});
    this.notice();
    this.banner();
    $(document).ready(function () {
        var a = $("#j_chong");
        0 != a.length && a.attr("src", a.attr("_src")).removeAttr("_src")
    })
}, banner: function () {
    $("#j_fbanner_close").click(function () {
        $("#j_fbanner").slideUp("normal")
    });
    var a = $("#j_hint p"), d = a.length;
    if (0 < d) {
        var e = 0;
        setInterval(function () {
            var b = (e + 1) % d;
            a.eq(e).fadeOut(500, function () {
                a.eq(b).fadeIn();
                e = b
            })
        }, 3E3)
    }
    var c = $("#j_sbanner");
    0 < c.length && setTimeout(function () {
        c.animate({height: "80px"}, "slow", function () {
            $("#j_sbanner1").fadeOut("slow");
            $("#j_sbanner2").fadeIn("slow")
        })
    }, 15E3)
}, notice: function () {
    function a(a) {
        var e = "next" == a ? (c + 1) % b : (c - 1 + b) % b;
        d.eq(c).stop(0, 1).fadeOut(300, function () {
            d.eq(e).stop(0, 1).fadeIn(300, function () {
                c = e
            })
        })
    }

    var d = $(".notice_list"), e = $("#j_nbtn"), c = 0, b = d.length;
    1 != b && ($("#j_nprev").click(function () {
        a("prev")
    }), $("#j_nnext").click(function () {
        a("next")
    }), e.show())
}, servSlider: function () {
    var a =
        $("#j_serv_glide").find("li"), d = a.length;
    if (1 == d)a.eq(0).show(); else {
        var e = Math.floor(Math.random() * d);
        a.eq(e).show();
        this.createTab($("#j_glide_trig"), this.templates.tpl_servTrigger, d, "on", "p", e);
        this.slider({titleId: "#j_glide_trig", titleTag: "p", contentId: "#j_serv_glide", contentTag: "li", initIndex: e})()
    }
}, getServiceMsg: function () {
    var a = $("#j_serv_num");
    G.logic.login.getLoginUser(function (d) {
        d && (d.data && a.length) && $.ajax({url: "http://service.yixun.com/json.php?mod=orderurge&act=getnoticemsg", dataType: "jsonp",
            cache: !0, scriptCharset: "gb2312", success: function (d) {
                if (0 == d.errno) {
                    d = d.data;
                    for (var c = 0, b = 0, f = d.length; b < f; b++) {
                        var g;
                        (g = d[b].count) && (c += g)
                    }
                    0 < c && a.html(c).show()
                }
            }})
    })
}, gettf: function () {
    function a(a) {
        a.lazyDo = a.lazyDo || "loadScriptWhenScroll";
        if ("function" == typeof c[a.lazyDo])c[a.lazyDo](a)
    }

    var d = window.tfList || [], e = window.tfsList || {}, c = this;
    timeStat[4] = new Date - timeStat[0];
    for (var b = 0, f = d.length; b < f; b++)a(d[b]);
    for (b in e)a(e[b])
}, loadTf: function (a) {
    var d = this.data.siteId, e = a.tfId, c = "&callback=" +
        (a.cb || "G.index.tfDataHandler"), b = "&skey=" + (3E5 < e ? this.data.areaId : d), f, g = "&wsid=" + d, h, k = this.getCookie;
    h = k("yx_uin") || k("uin") || k("buy_uin") || k("pt2gguin") || k("uin_cookie") || k("o_cookie") || k("luin") || "";
    h = "&uin=" + h.replace(/^o/, "");
    "string" == typeof e ? f = "http://s1.smart.yixun.com/w/tf/gettfx?type=jsonp&tfid=" + e + b + c + g + h : e instanceof Array && (k = this.getCookie, f = k("loc") || "0", k = k("prid") || "0", f = f.split("_")[4] || "0", k = k.split("_")[0], d = "&biReserved=0:" + k + "," + f + "," + d, e = e.join(","), f = "http://s1.smart.yixun.com/w/tf/gettfxs?tfids=" +
        e + b + c + g + h + d);
    return this.loadScript({url: f, dataType: "jsonp", error: function (b) {
        $('[_module="' + a.tfId + '"]').each(function () {
            var a = $(this), b = a.attr("_f");
            if (b && "function" == typeof G.index[b])G.index[b]({dom: a});
            G.index.loadImgWhenScroll(a)
        })
    }})
}, tfDataHandler: function (a) {
    function d(a, d) {
        var e = a.attr("_f");
        if (e && "function" == typeof c[e])c[e]({dom: a, data: d}); else a.show();
        c.loadImgWhenScroll(a)
    }

    a = a ? a : {};
    var e = a.data, c = this;
    $('[_module="' + a.tfId + '"]').each(function () {
        var a = $(this), f = a.attr("id").match(/(POS_\d*)_/),
            g = a.attr("_e");
        if (f && (f = f[1]) && e[f]) {
            var h;
            g ? d(a, e[f]) : (c.fillDom(a, e[f], "fill"), (h = a.attr("_lm")) && c.fillDom(a, e[h], "append"))
        }
        !g && d(a)
    })
}, fillDom: function (a, d, e) {
    if (d && 0 != d.length) {
        var c = [], b, f, g, h = "fill" == e;
        e = a.attr(h ? "_tpl" : "_lmTpl") || "tpl_goods";
        b = a.attr(h ? "_ytag" : "_lmYtag") || "30000";
        f = a.attr("_n");
        g = d.length;
        if (!(a.hasClass("sy_mod_rank_bd") && 5 > g)) {
            g = h && f ? Math.min(f, g) : g;
            e = this.templates[e];
            for (f = 0; f < g; f++) {
                var k = d[f];
                this.decorateData(k);
                c.push(e.replace(/\{(\w+)\}/g, function (a, c) {
                    return"ytag" ==
                        c ? b++ : k[c] || ""
                }))
            }
            h ? a.html(c.join("")) : a.append(c.join(""))
        }
    }
}, multiTplFill: function (a, d, e, c) {
    if (d && !(0 > d.length)) {
        for (var b = [], f, g, h, k = 0, m = d.length; k < m; k++) {
            g = d[k];
            h = a[g];
            f = this.templates[g];
            if (0 == h.length)break;
            var n = h.splice(0, 1)[0];
            h = h.check;
            c && (c[g] ? c[g].push(n) : c[g] = [n]);
            this.decorateData(n, h) ? b.push(f.replace(/\{(\w+)\}/g, function (a, b) {
                return"ytag" == b ? e++ : n[b] || ""
            })) : k--
        }
        return b.join("")
    }
}, decorateData: function (a, d) {
    var e = a.AREA_STOCK_INFO ? this.jsonparser(a.AREA_STOCK_INFO) : {}, c = a.EXTDATA ?
        a.EXTDATA : {}, b, f, g, h;
    "string" == typeof c && (0 != c.indexOf("{") && (c = "{" + c + "}"), c = this.jsonparser(c));
    a.mPRICE = a.PRICE;
    if (e = e[this.data.siteId])if (a.mPrice = e.price ? e.price : a.mPrice, b = e.multiInfo || {}, b = "market" == d ? b["4:4"] || b["3:3"] || {} : b["3:3"] || {}, a.PRICE = b.mPrice ? (b.mPrice / 100).toFixed(2) : e.price ? (e.price / 100).toFixed(2) : a.PRICE, a.SALECOUNT = e.sale_count ? e.sale_count : "20", a.LESSPRICE = (a.mPRICE - a.PRICE).toFixed(2), a.DISPLAY = 0 == a.LESSPRICE ? "none" : "inline", "tuan" == d && (!b.ETime || 0 >= b.ETime))return!1;
    if ((f =
        c.list) && (f = f[0]))for (var k in f)a[k] = f[k];
    (h = c.inventory) && (g = a.INVENTORY) && (a.STOCKPERCENT = (g / h).toFixed(2));
    a.ISSHOW = !a.SOLDNUM || 0 == a.SOLDNUM ? "none" : "block";
    a.SOLDNUM += 50;
    a.TITCLASS = "mod_goods_promo";
    e = a.PROMOTE;
    if (!e || "" == e || 7 > e.length)a.PROMOTE = a.TITLE, a.TITCLASS = "mod_goods_tit";
    if (e = a.IMG)0 < e.indexOf("/160?") ? (a.pic120 = e.replace(/\/160\?/, "/120?"), a.pic80 = e.replace(/\/160\?/, "/80?")) : (a.pic120 = e.replace(/\/pic160/, "/middle"), a.pic80 = e.replace(/\/pic160/, "/small"));
    if (c.PROTYPE && c.PROCOUNT &&
        (e = (c.PROCOUNT.match(/\d+/) || [])[0], b = ["用券减", "下单减", "已降"], c = parseInt(c.PROTYPE), e && 1E4 > e && (c = b[c - 1])))a.SHORT_PROMOTE = c + "<br />" + e + "元", a.CLASSNAME = "mod_goods_mark_1";
    (a.URL || a.url).replace(/[\?&]DAP=([^&#]*)/, function (b, c) {
        a.DAP = c
    });
    a.url && (a.url = a.url.replace(/51buy\.com/, "yixun.com"));
    a.URL && (a.URL = a.URL.replace(/51buy\.com/, "yixun.com"));
    return!0
}, loadScriptWhenScroll: function (a) {
    var d = this.loadTf(a), e;
    a.tfId instanceof Array ? (e = "#tfs_" + a.groupId, $('[_group="' + a.groupId + '"]').attr("_arr", a.tfId.join("_"))) :
        e = "#tf_" + a.tfId;
    this.scroll({height: this.getY($(e)) + 300, func: d})
}, mainSlider: function (a) {
    a.dom.show();
    this.createTab($("#j_strigger"), this.templates.tpl_sliderTrigger, $(".slider_img").find("li").length, "on", "li");
    this.slider({titleId: "#j_strigger", titleTag: "li", contentId: ".slider_img", contentTag: "li", prevId: "#j_sprev", nextId: "#j_snext", areaId: "#j_main_slider"})()
}, quickBuy: function (a) {
    a = a.dom;
    "POS_1_200020" == a.attr("id") && (timeStat[5] || (timeStat[5] = new Date - timeStat[0]), "5001" == this.data.siteId &&
        $("li", a).each(function () {
            var a = $(this);
            a.removeClass("dailybeta_goods_nobtn");
            $(".dailybeta_goods_btn", a).unbind().click(function () {
                $(this).attr("pid") && G.header.common.goToCartWithThis(this, {pid: $(this).attr("pid")});
                return!1
            })
        }), a.show(), this.setStock(a))
}, qbTomorrow: function (a) {
    var d = this.data.serverTime, d = (new Date(d.getFullYear(), d.getMonth(), d.getDate(), 9)).getTime() + (9 <= d.getHours() ? 864E5 : 0) - d, e = this.createTimer(d, [
        [$("#j_daily_h"), $("#j_dterm_h")],
        [$("#j_daily_m"), $("#j_dterm_m")],
        [$("#j_daily_s"),
            $("#j_dterm_s")]
    ]);
    e(0, !0);
    setInterval(function () {
        e(0, 0)
    }, 1E3);
    var c = this.loadTf(a), b = 0, f = $(".dailybeta_hd"), g = $(".dailybeta_goods");
    $(".dailybeta_change").click(function () {
        c();
        var a = (b + 1) % 2;
        g.eq(b).hide();
        g.eq(a).show();
        f.eq(b).hide();
        f.eq(a).show();
        b = a;
        return!1
    })
}, setStock: function (a) {
    $("li", a).each(function () {
        var d = $(".mod_goods_stock i", this), e = "mod_goods_stock_bg2", c = a.attr("w") || 0.5, c = 100 * parseFloat(c);
        100 < c ? c = 90 : 0 > c && (c = Math.floor(100 * Math.random() + 1));
        79 < c && 101 > c ? c = Math.floor(20 * Math.random() +
            40) : 49 < c && 80 > c ? c = Math.floor(20 * Math.random() + 20) : 50 > c && 19 < c ? (c = Math.floor(20 * Math.random() + 5), e = "mod_goods_stock_bg1") : 0 <= c && (c = Math.floor(10 * Math.random() + 5), e = "mod_goods_stock_bg1");
        var b = $(".mod_goods_img b", this), f = /debug=(true|1)/.test(location.search) ? 30 : 20;
        c < f ? b.addClass("mod_goods_mark_2").html("即将<br />售罄</b>").show() : b.hasClass("mod_goods_mark_1") && b.show();
        d.animate({width: c + "%"}, 1E3, "", function () {
            d.removeClass().addClass(e)
        })
    })
}, adSlider: function (a) {
    a = a.dom;
    var d = a.attr("id");
    this.createTab($('[_trigger="' +
        d + '"]'), this.templates.tpl_trigger, $("#" + d).find("li").length, "glide_on", "i");
    this.slider({titleId: '[_trigger="' + d + '"]', titleTag: "i", contentId: "#" + d, contentTag: "li", className: "glide_on"})();
    a.show()
}, dealIntrest: function (a) {
    function d() {
        if (!(3 > r)) {
            for (var a = [], b = {}, c, d, e = q, f = 0; 3 > f; f++) {
                if (0 == r)return;
                c = n[p++];
                d = g[c];
                var h = k[c];
                if ("tpl_tuan" == h)d.check = "tuan"; else if ("tpl_night" == h || "tpl_moring" == h)d.check = "market";
                if (0 == d.length) {
                    d = s[h];
                    if (!d || 0 == d.length) {
                        r--;
                        n.splice(--p, 1);
                        continue
                    }
                    for (var m = 0,
                             l = d.length; m < l; m++)g[c].push(d[m]);
                    d = g[c]
                }
                a.push(h);
                b[h] = d;
                p %= r
            }
            return G.index.multiTplFill(b, a, e, s)
        }
    }

    function e(a) {
        var b = $(".ulike_r1 li", a);
        a = $(".ulike_r2 li", a);
        b.eq(0).addClass("ulike_r1_narrow");
        b.eq(6).addClass("ulike_r1_narrow");
        a.eq(0).addClass("ulike_r2_narrow");
        a.hover(function () {
            $(this).addClass("ulike_r2_on")
        }, function () {
            $(this).removeClass("ulike_r2_on")
        })
    }

    if (a) {
        var c, b, f, g;
        if (c = window.tfsList["1"])if (c = c.tfId, (b = a[c[0]]) && (b = b.data) && 0 != b.length)if ((f = a[c[1]]) && (f = f.data) && 0 != f.length)if ((g =
            a[c[2]]) && (g = g.data) && 0 != g.length) {
            var h = "tpl_goods tpl_goods tpl_ulikeAd tpl_ulikeAd tpl_goods tpl_goods tpl_goods tpl_ulikeAd tpl_goods tpl_goods tpl_goods tpl_ulikeAd".split(" "), k = {POS_1: "tpl_tuan", POS_2: "tpl_moring", POS_3: "tpl_night", POS_4: "tpl_new", POS_5: "tpl_hao", POS_6: "tpl_faxian"}, m = {};
            if ((m.tpl_goods = b.POS_1) && 8 < m.tpl_goods.length)if ((m.tpl_ulikeAd = f.POS_1) && 4 < m.tpl_ulikeAd.length) {
                b = this.data.serverTime;
                f = b.getHours();
                f = 11 > f ? 7 > f ? 0 : 1 : 18 > f ? 2 : 3;
                var n = "POS_1 POS_2 POS_3 POS_4 POS_5 POS_6".split(" "),
                    l = a[c[2]].sortData, p = 0, r = 5;
                2 > f ? n.splice(2, 1) : n.splice(1, 1);
                if (l) {
                    n.sort(function (a, b) {
                        return l[a] > l[b]
                    });
                    a = 0;
                    for (c = n.length; a < c; a++)l[n[a]] || (r--, n.splice(a, 1), a--, c--)
                }
                c = 21E3;
                var q = 21500, s = {}, t = this.multiTplFill(m, h, c);
                mod2 = d();
                var w = $('[_group="1"]');
                if (t && mod2) {
                    $(".ulike_r1").html(t);
                    $(".ulike_r2").html(mod2);
                    e($("#ulikeS1"));
                    w.show();
                    for (a = 2; 5 > a && !(8 > m.tpl_goods.length || 3 > m.tpl_ulikeAd.length); a++) {
                        c += 1E3;
                        q += 1E3;
                        t = this.multiTplFill(m, h, c);
                        mod2 = d();
                        if (!t || !mod2)break;
                        w.append('<div class="ulike_bd" id="ulikeS' +
                            a + '" style="display:none"><ul class="ulike_r1">' + t + '</ul><ul class="ulike_r2">' + mod2 + "</ul></div>");
                        e($("#ulikeS" + a))
                    }
                    var u = $(".ulike_bd"), v = 0, x = u.length, h = $(".ulike_r1 li", u.last());
                    12 > h.length ? $(".ulike_r1", u.last()).append('<li><div class="ulike_r1_brand ulike_guang"><a target="_blank" href="http://guang.yixun.com" alt="去逛逛" ytag="24999"><b>想看更多喜欢？</b><i class="ulike_guang_bg"></i></a></div></li>') : h.last().html('<div class="ulike_r1_brand ulike_guang"><a target="_blank" href="http://guang.yixun.com" alt="去逛逛" ytag="24999"><b>想看更多喜欢？</b><i class="ulike_guang_bg"></i></a></div>');
                    h = (new Date(b.getFullYear(), b.getMonth(), b.getDate(), [7, 11, 18, 24][f])).getTime() - b;
                    $(".yugaoSpan").html(0 == f % 2 ? "距开始" : "距结束");
                    var y = this.createTimer(h, [$(".timeH"), $(".timeM"), $(".timeS")]);
                    setInterval(function () {
                        y()
                    }, 1E3);
                    1 != x && ($("#j_ulike_change").click(function () {
                        var a = (v + 1) % x;
                        u.eq(v).hide();
                        u.eq(a).show();
                        v = a;
                        return!1
                    }).show(), this.uLikeAdjust())
                }
            }
        }
    }
}, uLikeAdjust: function () {
    var a = $(".ulike_bd").last(), d = $(".ulike_r1", a).find("li"), e = $(".ulike_r2", a).find("li").last(), a = d.length;
    if (0 != a) {
        var c =
            d.last().html(), b = d.eq(a - 2), f = b.html();
        $(window).bind("resize", function () {
            400 > e.width() ? b.html(c) : b.html(f)
        })
    }
}, hsTabs: function (a) {
    var d = a.tfId;
    a = $("#tf_" + d);
    if (0 != a.length) {
        var e = a.attr("data-attr"), c = this, b = [], f = function () {
            $("#j_mod_" + d).hide();
            return!0
        }, g = function (a, b, c) {
            $(a).remove();
            $(b).remove();
            c && $(c).remove()
        };
        a = function () {
            for (var a = RegExp(/^2\d{6}$/), c, d = 0, h = e.length; d < h; d++)e[d].replace(/^\s*(.*?)\s*$/, function (a, b) {
                c = b
            }), e[d] = c, a.test(c) ? b.push(c + ":5:0:::") : (g("#j_ht_" + c, "#j_gap_" + c, "#j_pool_" +
                c), e.splice(d, 1), d--, h--);
            return 0 == h && f()
        };
        G.index["hotsaleCb" + d] = function (a) {
            var b;
            if (a && (b = a.data) && !$.isEmptyObject(b) && 0 != b.length) {
                for (var h, l = 0, p = e.length; l < p; l++)h = e[l], a = b[h], !a || 5 > a.length ? (g("#j_ht_" + h, "#j_gap_" + h, "#j_pool_" + h), e.splice(l, 1), p--, l--) : (h = $("#j_pool_" + h), c.fillDom(h, a, "fill"), c.hsLazydo({dom: h}));
                0 < p ? (b = Math.floor(Math.random() * p), c.slider({titleId: "#j_rank_" + d, titleTag: "li[_p]", contentId: "#tf_" + d, contentTag: ".sy_mod_rank_bd", initIndex: b, speed: 300})()) : f()
            } else f()
        };
        var h =
            function () {
                $.ajax({url: "http://s1.smart.yixun.com/w/tf/gettfxbypid?poolparam=" + b.join(",") + "&type=jsonp&wsid=" + c.data.siteId + "&tfid=" + d + "&callback=G.index.hotsaleCb" + d, dataType: "script", timeout: 6E3, error: f})
            };
        e ? (e = e.split(","), a() || this.scroll({height: this.getY($("#tf_" + d)) + 400, func: h})) : f()
    }
}, right2FAd: function () {
    G.index.slider({titleId: ".flider_trigger", titleTag: "a", contentId: "#j_fslider", contentTag: "a", className: "flider_trigger_lk_on", initIndex: 0, auto: !1, speed: 500})()
}, slider5F: function () {
    var a =
        G.index.slider, d = a({titleId: "#j_5Fl_gtrigger", titleTag: "i", contentId: "#j_5Fl_glider", contentTag: "li"}), a = a({titleId: "#j_5Fr_gtrigger", titleTag: "i", contentId: "#j_5Fr_glider", contentTag: "li"});
    d();
    a()
}, goodsLazydo: function (a) {
    a = a.dom;
    $(".mod_goods", a).each(function () {
        $(this).parent().addClass("sy_mod_fgoods_low")
    });
    a.show()
}, tejiaLazydo: function (a) {
    var d = a.dom;
    a = a.data || [];
    var e = Math.floor(a.length / 5);
    if (0 == e)d.show(); else if (this.fillDom(d, a.splice(0, 5), "fill"), d.attr("id", "j_tejia0").show(), 1 < e) {
        for (var d =
            d.attr("_ytag"), c = 1; c < e; c++)$("#j_tejia_wrap").append('<ul class="ftejia_goods" id="j_tejia' + c + '" _tpl="tpl_tejia" _ytag="' + (d += 10) + '" style="display:none"></ul>'), this.fillDom($("#j_tejia" + c), a.splice(0, 5), "fill");
        var b = 0;
        $("#j_tejia_change").click(function () {
            var a = (b + 1) % e;
            $("#j_tejia" + b).hide();
            $("#j_tejia" + a).show();
            b = a
        }).show()
    }
}, hsLazydo: function (a) {
    a = a.dom;
    var d = 1;
    0 == a.find(".sy_mod_rank_order").length && $(".mod_goods", a).each(function () {
        $(this).parent().prepend('<i class="sy_mod_rank_order sy_mod_rank_order_' +
            d + '">' + d++ + "</i>")
    })
}, createTimer: function (a, d) {
    if (!(0 >= a))return a = Math.floor(a / 1E3), function () {
        if (!(0 > a)) {
            var e = Math.floor(a / 3600), c = Math.floor(a / 60 % 60), b = a % 60;
            10 > e ? e = "0" + e : "";
            10 > c ? c = "0" + c : "";
            10 > b ? b = "0" + b : "";
            var f = [e, c, b];
            a -= 1;
            for (var g = 0; 3 > g; g++)$.each(d[g], function () {
                $(this).html(f[g])
            })
        }
    }
}, createTab: function (a, d, e, c, b, f) {
    if (!(2 > e)) {
        c = [];
        var g = 1;
        for (b = 0; b < e; b++)c.push(d.replace(/\{(\w+)\}/g, function (a, b) {
            if ("index" == b)return g++
        }));
        a.html(c.join(""));
        a.show()
    }
}, slider: function (a) {
    function d() {
        b.auto &&
        (clearInterval(p), p = setInterval(function () {
            c((g + 1) % b.len)
        }, b.autoLag))
    }

    function e() {
        b.auto && clearInterval(p)
    }

    function c(a, c) {
        if (g != a || c)if (k.removeClass(function () {
            return b.className
        }).eq(a).addClass(b.className), "fade" == b.effect) {
            var d = h.eq(a), e = $("img[" + b.backAttr + "]", d), f;
            0 < e.length && (f = e.attr(b.backAttr)) && e.attr("src", f).removeAttr(b.backAttr);
            q = h.eq(g);
            q.stop(1, 1).fadeOut(b.speed);
            d.stop(1, 1).css({opacity: "0.5"}).show().animate({opacity: "1"}, b.speed);
            g = a;
            s && $.isFunction(s) && (b.curIndex = g, s(b))
        }
    }

    var b = {titleId: "", titleTag: "", contentId: "", contentTag: "", prevId: "", nextId: "", areaId: "", className: "on", initIndex: 0, timeLag: 300, auto: !0, speed: 500, autoLag: 6E3, effect: "fade", backAttr: "_src", callback: ""}, f;
    for (f in a)b[f] = a[f];
    var g = b.initIndex, h = $(b.contentId).find(b.contentTag), k = $(b.titleId).find(b.titleTag), m = $(b.prevId), n = $(b.nextId), l = $(b.areaId), p = null, r = 0 < m.length && 0 < n.length, q = h.eq(g), s = b.callback;
    return function (a) {
        if (a)h = $(b.contentId).find(b.contentTag), k = $(b.titleId).find(b.titleTag), b.len =
            Math.min(k.length, h.length), c(0, 1); else if (0 == l.length && (l = h), b.len = Math.min(k.length, h.length), 0 != b.len)if (1 == b.len)k.hide(), q.show(); else {
            h.each(function () {
                $(this).css({display: "none"})
            });
            a = $("img[" + b.backAttr + "]", q);
            var f;
            0 < a.length && (f = a.attr(b.backAttr)) && a.attr("src", f).removeAttr(b.backAttr);
            q.show();
            k.show();
            c(b.initIndex, 1);
            d();
            k.hover(function () {
                e();
                c(k.index($(this)))
            }, function () {
                d()
            });
            h.hover(function () {
                e()
            }, function () {
                d()
            });
            r && (m.click(function () {
                c((g + b.len - 1) % b.len)
            }).hover(function () {
                    e()
                },
                function () {
                    d()
                }), n.click(function () {
                c((g + 1) % b.len)
            }).hover(function () {
                e()
            }, function () {
                d()
            }), l.hover(function () {
                m.show();
                n.show()
            }, function () {
                m.hide();
                n.hide()
            }))
        }
    }
}, loadScript: function (a) {
    var d = 0;
    if (a.url)return function () {
        1 == d || 2 == d || (d = 1, $.ajax({url: a.url, dataType: a.dataType, timeout: 5E3, success: function (e) {
            d = 2;
            a.success && "function" === typeof a.success && a.success(e)
        }, error: function (e, c) {
            d = 0;
            a.error && "function" === typeof a.error && a.error(c)
        }, cache: !0}))
    }
}, jsonparser: function (a) {
    return"undefined" != typeof JSON &&
        JSON.parse ? JSON.parse(a) : (new Function("return " + a.replace(/^\s+/, "")))()
}, getY: function (a) {
    return 0 == a.length ? 0 : a.offset().top
}, loadImgWhenScroll: function () {
    function a(a) {
        for (var b = 0, d = a.data.length; b < d; b++) {
            var e = a.data[b], h = $(e).attr("_src");
            h && !e.src && $(e).attr("src", h).removeAttr("_src")
        }
    }

    var d = G.index, e = d.data.visibleH;
    return function (c) {
        c = c || document;
        c = $("img[_src]", c);
        var b = {}, f = c.length;
        if (0 != f) {
            for (var g = 0; g < f; g++) {
                var h = c[g], k = d.getY($(h));
                0 != k && (k = k > e ? k : 0, b[k] ? b[k].push(h) : b[k] = [h])
            }
            for (g in b)d.scroll({height: g,
                data: b[g], func: a})
        }
    }
}(), scroll: function (a) {
    function d() {
        c.throttle(e, null, 100)
    }

    function e() {
        var a = g.heightList.length;
        if (0 === a)return b.unbind("scroll", d), b.unbind("resize", d), null;
        var c = h ? h.pageYOffset : 0, e = g.visibleH, l = [];
        try {
            e += Math.max(f.body.scrollTop, f.documentElement.scrollTop, c)
        } catch (p) {
        }
        for (c = 0; c < a && g.heightList[c]; c++)e > g.heightList[c] && (l.push(g.optList[c]), g.heightList.splice(c, 1), g.optList.splice(c, 1), c--);
        if (0 < l.length) {
            a = 0;
            for (e = l.length; a < e; a++)l[a].func(l[a])
        }
    }

    var c = G.index, b = $(window),
        f = document, g = {isBind: !1, heightList: [], optList: [], visibleH: c.data.visibleH}, h = f.defaultView;
    return function (a) {
        !0 == a.clean && (g.heightList = [], g.optList = []);
        var e = void 0 != a.height ? a.height : c.getY($(a.id)), e = e - 200;
        g.visibleH < e ? (g.heightList.push(1 * e), g.optList.push(a)) : a.func(a);
        g.isBind || (d(), b.bind("scroll", d), b.bind("resize", d), g.isBind = !0)
    }
}(), throttle: function (a, d, e) {
    clearTimeout(a.tId);
    a.tId = setTimeout(function () {
        a.call(d)
    }, e)
}});
G.index.init();
/*  |xGv00|f240ed6cde19b81462c1a72e5b5ed2cf */
try {
    G.index.tfDataHandler({"data": {"POS_1": [{"BI_EXTINFO": "{\"R1\":0,\"R2\":2126811872,\"R3\":0,\"R4\":2126812200,\"R5\":32529,\"R6\":2126811959}\n","EXTDATA": {"layout": "5","list": [{"picUrl": "http://img1.icson.com/ICSONAD/201309/1_big20130925174605248590.jpg","picUrl2": "http://img2.icson.com/ICSONAD/201309/1_big20130925174621537266.jpg","remarks": "","title": "乐视TV","url": "http://u.yixun.com/letv?cp-ptss=1810-8-126217-t&DAP=3687773589174994284:563798767808022273:2:10599143"}]},"POOLID": 1793}, {"BI_EXTINFO": "{\"R1\":0,\"R2\":2126811872,\"R3\":0,\"R4\":2126812200,\"R5\":32529,\"R6\":2126811959}\n","EXTDATA": {"layout": "5","list": [{"picUrl": "http://img1.icson.com/ICSONAD/201309/1_big20130924115221637708.jpg","picUrl2": "http://img1.icson.com/ICSONAD/201309/1_big20130924115221637708.jpg","remarks": "","title": "每日精选","url": "http://event.yixun.com/event/123155fb3.html?cp-ptss=1793-2-17466-t&DAP=3687773589174994284:563798767808022273:2:9924788"}]},"POOLID": 1793}, {"BI_EXTINFO": "{\"R1\":0,\"R2\":2126811872,\"R3\":0,\"R4\":2126812200,\"R5\":32529,\"R6\":2126811959}\n","EXTDATA": {"layout": "5","list": [{"picUrl": "http://img2.icson.com/ICSONAD/201309/1_big20130923145647159306.jpg","picUrl2": "http://img2.icson.com/ICSONAD/201309/1_big20130923145647159306.jpg","remarks": "","title": "百货第四波","url": "http://event.yixun.com/event/133233640.html?cp-ptss=1793-2-36769-t&DAP=3687773589174994284:563798767808022273:2:10599224"}]},"POOLID": 1793}, {"BI_EXTINFO": "{\"R1\":0,\"R2\":2126811872,\"R3\":0,\"R4\":2126812200,\"R5\":32529,\"R6\":2126811959}\n","EXTDATA": {"layout": "5","list": [{"picUrl": "http://img2.icson.com/ICSONAD/201309/1_big20130925151021196518.jpg","picUrl2": "http://img2.icson.com/ICSONAD/201309/1_big20130925151021196518.jpg","remarks": "","title": "NOTE3 首发","url": "http://event.yixun.com/event/130451583.html?cp-ptss=1810-8-81972-t&DAP=3687773589174994284:563798767808022273:2:10599177"}]},"POOLID": 1793}, {"BI_EXTINFO": "{\"R1\":0,\"R2\":2126811872,\"R3\":0,\"R4\":2126812200,\"R5\":32529,\"R6\":2126811959}\n","EXTDATA": {"layout": "5","list": [{"picUrl": "http://img1.icson.com/ICSONAD/201309/1_big20130926114912250427.jpg","picUrl2": "http://img1.icson.com/ICSONAD/201309/1_big20130926114912250427.jpg","remarks": "","title": "金九狂欢第4波","url": "http://event.yixun.com/event/1328452d5.html?cp-ptss=1793-2-27798-t&DAP=3687773589174994284:563798767808022273:2:9924715"}]},"POOLID": 1793}, {"BI_EXTINFO": "{\"R1\":0,\"R2\":2126811872,\"R3\":0,\"R4\":2126812200,\"R5\":32529,\"R6\":2126811959}\n","EXTDATA": {"layout": "5","list": [{"picUrl": "http://img1.icson.com/ICSONAD/201309/1_big20130927132321374659.jpg","picUrl2": "http://img1.icson.com/ICSONAD/201309/1_big20130927132321374659.jpg","remarks": "","title": "联想平板首发","url": "http://event.yixun.com/event/131265459.html?cp-ptss=1793-2-57472-t&DAP=3687773589174994284:563798767808022273:2:10689641"}]},"POOLID": 1793}, {"BI_EXTINFO": "{\"R1\":0,\"R2\":2126811872,\"R3\":0,\"R4\":2126812200,\"R5\":32529,\"R6\":2126811959}\n","EXTDATA": {"layout": "5","list": [{"picUrl": "http://img1.icson.com/ICSONAD/201309/1_big20130926132434357131.jpg","picUrl2": "http://img2.icson.com/ICSONAD/201309/1_big20130926132441935351.jpg","remarks": "","title": "亿元掉落三重礼","url": "http://event.yixun.com/event/13220d0d8.html?cp-ptss=1793-2-9350-t&DAP=3687773589174994284:563798767808022273:2:10691344"}]},"POOLID": 1793}, {"BI_EXTINFO": "{\"R1\":0,\"R2\":2126811872,\"R3\":0,\"R4\":2126812200,\"R5\":32529,\"R6\":2126811959}\n","EXTDATA": {"layout": "5","list": [{"picUrl": "http://img2.icson.com/ICSONAD/201309/1_big20130923093231465131.jpg","picUrl2": "http://img2.icson.com/ICSONAD/201309/1_big20130923093231465131.jpg","remarks": "","title": "家电特价送券","url": "http://event.yixun.com/event/13216a97e.html?cp-ptss=1793-2-35370-t&DAP=3687773589174994284:563798767808022273:2:9924773"}]},"POOLID": 1793}]},"iRet": 0,"msg": "","sortData": {"POS_1": 1},"tfId": 300020}
    );
} catch (e) {
}
;