g.component.ok_ad = $("adLinks") ? true : false;
g.component.ok_app = $("slideList") ? true : false;
var goToReg = function (a) {
    $.winName.set("type", a);
    window.location.href = "index.html"
};
function reSetGuard() {
    window.open(getURL("http://aq.qq.com/cn2/manage/enter?to=question&mb_flow_type=setdir&outurl=setdir&source_id=2286"))
}
function gotoGuardDetail() {
    window.open(getURL("http://aq.qq.com/cn2/manage/mobile/mobile_index?source_id=2279"))
}
function gotoGuardPhone() {
    window.open(getURL("http://aq.qq.com/cn2/manage/mobile/mobile_index?source_id=2228"))
}
function gotoAccount() {
    window.open("http://id.qq.com/#account")
}
function NotifyUpgradeResult(a) {
    a == 0 ? $("pwdGuard").src = "http://zc.qq.com/chs/upgrade_err.html?ec=0" : $("pwdGuard").src = "http://zc.qq.com/chs/upgrade_err.html?ec=1";
    $.report.monitor("guard", loginAction.getReportObj())
}
var getPtloginUrl = function (a, b, e, f) {
    var c = "";
    return"http://ptlogin2." + b + "/jump?ptlang=2052&uin=" + e + "&clientkey=" + f + "&keyindex=3&u1=" + a
}, getURL = function () {
    var a = $.cookie.getNewUin(), b = $.cookie.get("clientkey"), e = {pengyou: {base: "http://ptlogin2.qq.com/xiaoyou_clienttop", needlang: 2, with_uin: 2}, vipqq: {base: "http://ptlogin2.qq.com/freereg_vipqq", needlang: 1, with_uin: 2}, qqmail: {base: "http://ptlogin2.qq.com/freereg_qqmail", needlang: 1, with_uin: 2}, qqshow: {base: "http://ptlogin2.qq.com/freereg_qqshow", needlang: 1,
        with_uin: 2}, tenpay: {base: "http://ptlogin2.tenpay.com/jump", needlang: 2, with_uin: 2, target: "https://www.tenpay.com/"}}, f = ["qq", "tenpay", "weibo"], c = {base: "http://ptlogin2.qq.com/jump", needlang: 2, with_uin: 2}, d = function (c, e) {
        var f = c.base, d = [];
        c.needlang == 2 && d.push("ptlang=2052");
        c.with_uin == 2 && a && b && d.push("uin=" + a + "&clientkey=" + b + "&keyindex=3");
        c.other && d.push(c.other);
        e ? d.push("u1=" + encodeURIComponent(e)) : c.target && d.push("u1=" + encodeURIComponent(c.target));
        return d.length > 0 ? f + "?" + d.join("&") : f
    };
    return function (k, l, o, m) {
        var l = l || "qq", o = o || 2, j = false, h = "";
        do if (typeof e[l] == "object" && k.indexOf("http://ptlogin2.") < 0)h = d(e[l]); else {
            for (var h = 0, n = f.length; h < n; h++)if (f[h] == l) {
                j = true;
                break
            }
            k.indexOf("http://ptlogin2.") < 0 && j && a ? (h = c, h.needlang = o, h = d(h, k), b || (h = k)) : h = k
        } while (0);
        if (m)window.open(h); else return h
    }
}();
if (g.component.ok_app)var slide = {preloadImgs: [], totalPage: 3, countPerPage: 7, wording: ["\u60a8\u672a\u5b89\u88c5QQ\u6216\u8005\u672c\u5730\u7684QQ\u6587\u4ef6\u5df2\u7ecf\u88ab\u7834\u574f\uff0c\u8bf7\u91cd\u65b0\u5b89\u88c5QQ\u3002", "\u60a8\u7684QQ\u7248\u672c\u8fc7\u4f4e\uff0c\u4e0d\u652f\u6301\u4ece\u7f51\u9875\u542f\u52a8\u3002"], _appInfo: [
    {id: "b_qqpet", name: "QQ\u5ba0\u7269", desc: "QQ\u5ba0\u7269\u662f\u4e00\u6b3e\u684c\u9762\u5582\u517b\u6e38\u620f\uff0c\u63d0\u4f9b\u60c5\u611f\u4e92\u52a8\u3001\u793e\u533a\u5c0f\u6e38\u620f\u3002",
        buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("http://act.pet.qq.com/pet.htm", "qq", 1), img: "21"},
    {id: "b_phoneqq", name: "\u624b\u673aQQ", desc: "\u968f\u65f6\u968f\u5730\u804a\u5929\u3001\u770b\u65b0\u95fb\u3001\u901b\u7a7a\u95f4\uff0c\u4f53\u9a8c\u7cbe\u5f69\u79fb\u52a8\u751f\u6d3b\u3002", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("http://mobile.qq.com/?from=reg&keyindex=3"), img: "01"},
    {id: "b_vip", name: "QQ\u4f1a\u5458", desc: "\u66f4\u5b89\u5168\uff0c\u66f4\u5f3a\u5927\uff0c\u66f4\u8d34\u5fc3\uff0c\u6e38\u620f\u4e0e\u751f\u6d3b\u4e2d\u4e5f\u4eab\u7279\u6743\u3002",
        buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("", "vipqq"), img: "02", key: 0},
    {id: "b_email", name: "QQ\u90ae\u7bb1", desc: "\u514d\u8d39\u62e5\u6709%uin%@qq.com\uff0c\u8fd8\u80fd\u514d\u8d39\u6ce8\u518c\u82f1\u6587\u5e10\u53f7\uff01", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("", "qqmail"), img: "03"},
    {id: "b_pengyou", name: "\u670b\u53cb\u7f51", desc: "\u8d70\u8fdb\u670b\u53cb\u7f51\uff0c\u670b\u53cb\u5c31\u5728\u4f60\u8eab\u8fb9\u3002", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("", "pengyou"),
        img: "04"},
    {id: "b_lol", name: "\u82f1\u96c4\u8054\u76df", desc: "\u5168\u65b0\u82f1\u96c4\u5bf9\u6218\uff0c\u82f1\u96c4\uff0c\u4e3a\u4f60\u800c\u6218\uff01", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("http://lol.qq.com"), img: "05"},
    {id: "b_qzone", name: "QQ\u7a7a\u95f4", desc: "\u56fd\u5185\u6700\u5927\u7684\u793e\u4ea4\u7f51\u7ad9\uff0c\u597d\u53cb\u52a8\u6001\u3001\u6570\u4e07\u5e94\u7528\u3001\u540d\u4eba\u673a\u6784\u5e94\u6709\u5c3d\u6709\u3002", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("http://i.qq.com/?from=zc.qq.com"),
        img: "06"},
    {id: "b_qshow", name: "QQ\u79c0", desc: "\u8fdb\u5165\u5168\u7403\u7b2c\u4e00\u7684\u865a\u62df\u5f62\u8c61\u88c5\u626e\u4e16\u754c\uff0c10\u4e07\u5957QQ\u79c0\u514d\u8d39\u7a7f\uff01", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("", "qqshow"), img: "07"},
    {id: "b_music", name: "QQ\u97f3\u4e50", desc: "\u514d\u8d39\u97f3\u4e50\u64ad\u653e\u5668\u8f6f\u4ef6\uff0c\u65b0\u6b4c\u5230\u8fbe\u6700\u5feb\u3001\u66f2\u91cf\u6700\u5927\u3002", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("http://music.qq.com/?keyindex=3"),
        img: "08"},
    {id: "b_pet", name: "\u624b\u673aQQ\u6d4f\u89c8\u5668", desc: "\u4e91\u89c8\u5929\u4e0b\u3001\u4e00\u89e6\u5373\u8fbe\uff0c\u5e26\u60a8\u7545\u4eab\u79fb\u52a8\u4e92\u8054\u7f51\u5728\u7ebf\u751f\u6d3b\uff01", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("http://mb.qq.com/"), img: "09"},
    {id: "b_qlive", name: "QQLive", desc: "\u201c\u76f4\u64ad+\u70b9\u64ad\u201d\u968f\u5fc3\u89c2\u770b\uff0c\u9ad8\u6e05\u753b\u8d28\uff0c\u9707\u64bc\u89c6\u542c\uff01", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("http://v.qq.com/index.html?keyindex=3"),
        img: "10"},
    {id: "b_x5", name: "QQ\u70ab\u821e", desc: "\u5168\u7403\u7b2c\u4e00\u97f3\u4e50\u821e\u8e48\u6e38\u620f\uff0c\u65f6\u5c1a\u6d6a\u6f2b\u65b0\u65c5\u7a0b\u7b49\u4f60\u6765\u5f00\u542f\u3002", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("http://x5.qq.com/"), img: "11"},
    {id: "b_style", name: "QQ\u98ce\u5c1a", desc: "\u4e0d\u4f46\u80fd\u88c5\u626e\u60a8\u7684QQ\uff0c\u66f4\u80fd\u88c5\u626e\u60a8\u7684\u7f51\u7edc\u751f\u6d3b\u3002", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("http://style.qq.com"),
        img: "13"},
    {id: "b_mq", name: "\u8d85\u7ea7QQ", desc: "\u4e3a\u60a8\u63d0\u4f9b\u968f\u65f6\u968f\u5730\u7684VIP\u7279\u6743\u670d\u52a1\uff0c\u968f\u8eab\u7279\u6743\u3001\u73a9\u8f6c\u7cbe\u5f69\u3002", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("http://mq.qq.com/"), img: "14"},
    {id: "b_dnf", name: "\u5730\u4e0b\u57ce\u4e0e\u52c7\u58eb", desc: "\u683c\u6597\u7f51\u6e38\u738b\u8005\u4e4b\u4f5c\uff0c260\u4e07\u540c\u65f6\u5728\u7ebf\uff01", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("http://dnf.qq.com/"),
        img: "15"},
    {id: "b_qplus", name: "Q+", desc: "\u7cbe\u5f69\u4e92\u8054\u7f51\uff0c\u4eceQ+\u5f00\u59cb\u3002+\u751f\u6d3b\uff0c+\u5a31\u4e50\uff0c+\u6e38\u620f\uff0c+\u66f4\u591a\u3002", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("http://www.qplus.com/"), img: "16"},
    {id: "b_tenpay", name: "\u8d22\u4ed8\u901a", desc: "\u5728\u7ebf\u652f\u4ed8\u7f51\u7ad9\uff0c\u5145Q\u5e01Q\u70b9\u6253\u6298\uff0c\u66f4\u6709200\u591a\u79cd\u751f\u6d3b\u5e94\u7528\u3002", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("",
        "tenpay"), img: "17"},
    {id: "b_speed", name: "QQ\u98de\u8f66", desc: "\u7a81\u7834200\u4e07\u540c\u65f6\u5728\u7ebf\u3001\u6700\u65f6\u5c1a\u597d\u73a9\u7684\u7ade\u901f\u7c7b\u7f51\u7edc\u6e38\u620f\uff01", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("http://speed.qq.com/"), img: "18"},
    {id: "b_qtalk", name: "QTalk", desc: "\u804a\u5929\u4e0d\u6253\u5b57\uff01\u5feb\u52a0\u5165QTalk\uff0c\u4eab\u53d7\u6700\u65f6\u5c1a\u7684\u8bed\u97f3\u804a\u5929\uff01", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("http://qqtalk.qq.com/"),
        img: "19"},
    {id: "b_roro", name: "\u6d1b\u514b\u738b\u56fd", desc: "\u5343\u4e07\u5c0f\u670b\u53cb\u7684\u9b54\u6cd5\u4e50\u56ed\uff0c\u4e2d\u56fd\u6700\u5927\u7684\u513f\u7ae5\u793e\u533a\uff01", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("http://17roco.qq.com/?ADTAG=ied.innercop.gameweb.qqzc"), img: "27"},
    {id: "b_yulong", name: "\u5fa1\u9f99\u5728\u5929", desc: "\u817e\u8baf\u7b2c\u4e00\u56fd\u6218\u7f51\u6e38\uff01\u5e26\u7ed9\u4f60\u6700\u771f\u5b9e\u7684\u4e07\u4eba\u56fd\u6218\u4f53\u9a8c\uff01", buttonText: "\u7acb\u5373\u4f53\u9a8c",
        link: getURL("http://yl.qq.com/?ADTAG=cop.innercop.qq.zc"), img: "28"},
    {id: "b_qqgame", name: "QQ\u6e38\u620f", desc: "\u5168\u7403\u6700\u5927\u4f11\u95f2\u6e38\u620f\u5e73\u53f0\uff0c\u6597\u5730\u4e3b\u7b4970\u4f59\u6b3e\u6e38\u620f\u4efb\u4f60\u73a9\uff01", buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("http://qqgame.qq.com/download_yd.html"), img: "20"},
    {id: "b_weibo", name: "\u817e\u8baf\u5fae\u535a", desc: "\u4f60\u7684\u5fc3\u58f0\uff0c\u4e16\u754c\u7684\u56de\u58f0\u3002\u7528140\u4e2a\u5b57\u8bb0\u5f55\u751f\u6d3b\u4e2d\u7684\u70b9\u70b9\u6ef4\u6ef4\u3002",
        buttonText: "\u7acb\u5373\u4f53\u9a8c", link: getURL("http://t.qq.com/"), img: "12"}
], _appInfoInit: function () {
    var a = slide._appInfo.length, b = slide.countPerPage, e = Math.ceil(a / b), f = "";
    slide._appInfo.sort(function (a, c) {
        return a.key || c.key ? a.key == 1 ? -1 : 1 : Math.random() > 0.5 ? 1 : -1
    });
    for (var c = 0; c < a; c++) {
        var d = slide._appInfo[c];
        d.link = d.link.replace(/%uin%/, loginAction.newUin);
        d.link = d.link.replace(/%clientkey%/, loginAction.clientKey);
        if (d.id == "b_email")d.desc = d.desc.replace(/%uin%/, loginAction.newUin);
        c % b == 0 && (f +=
            '<li class="one_slide">');
        f += '<img src="http://6.url.cn/zc/chs/img/appicon/' + slide._appInfo[c].img + '.gif" name="' + slide._appInfo[c].img + '" alt="" class="one_app" width="57" height="76" />';
        if ((c + 1) % b == 0 || c == a - 1)f += '<img src="http://6.url.cn/zc/chs/img/appicon/00.png" alt="" width="1" height="120" /></li>'
    }
    slide.totalPage = e;
    $("slideList").innerHTML = f;
    a = "";
    for (c = 0; c < e; c++)e != 1 && (a += c == 0 ? '<li class="slide_ctrl slide_ctrl_a"></li>' : '<li class="slide_ctrl"></li>');
    $("slideList").style.width = 554 * e + "px";
    $("slideControl").innerHTML = a;
    $.e.add("appInfo", "mouseover", function (a) {
        a.stopPropagation()
    })
}, list: $("slideList"), control: $("slideControl"), index: 0, loop: false, init: function () {
    slide._appInfoInit();
    slide._checkVisible();
    $("prevSlide").onclick = function () {
        slide.goToPrev();
        return false
    };
    $("nextSlide").onclick = function () {
        slide.goToNext();
        return false
    };
    $.e.add(slide.list, "mouseover", function (a) {
        var b = $.e.src(a);
        a.stopPropagation();
        if ($.css.hasClass(b, "one_app")) {
            slide.curImg = b;
            for (var a = b.parentNode.getElementsByTagName("IMG"),
                     c = 0; c < slide.countPerPage; ++c) {
                if (!$.css.hasClass(a[c], "one_app"))break;
                b === a[c] ? (slide.showAppInfo(c), b.src = "http://6.url.cn/zc/chs/img/appicon/" + a[c].name + ".gif", b.style.cursor = "pointer", b.style.width = "90px", b.style.height = "120px") : (a[c].style.width = "57px", a[c].style.height = "76px", a[c].src = "http://6.url.cn/zc/chs/img/appicon/" + a[c].name + "s.gif")
            }
        }
    });
    $.e.add(document.body || document.documentElement, "mouseover", function () {
        slide.hideAppInfo();
        if (slide.curImg && (slide.curImg.style.width = "57px", slide.curImg.style.height =
            "76px", slide.curImg.src.indexOf("s.gif") < 0))slide.curImg.src = slide.curImg.src.replace(".gif", "s.gif")
    });
    slide.list.onclick = function (a) {
        a = a || window.event;
        a = a.srcElement || a.target;
        if (a.className.indexOf("one_app") > -1)for (var b = a.parentNode, c = 0; c < slide.countPerPage; ++c)if (a === b.getElementsByTagName("IMG")[c])return window.open(slide._appInfo[slide.index * slide.countPerPage + c].link), $.report.monitor(slide._appInfo[slide.index * slide.countPerPage + c].id), false
    };
    for (var a = slide.control.getElementsByTagName("LI"),
             b = 0; b < slide.totalPage; b++)(function (b) {
        a[b] && $.e.add(a[b], "click", function () {
            slide.goToIndex(b)
        })
    })(b)
}, _setLeft: function (a) {
    var b = parseInt(slide.list.style.left), e = 100, f = a < b ? 1 : -1;
    setTimeout(function () {
        slide.list.style.left = parseInt(slide.list.style.left) - f * e + "px";
        var b = parseInt(slide.list.style.left);
        e = Math.ceil(e * 0.95);
        f == 1 && b <= a || f == -1 && b >= a ? slide.list.style.left = a + "px" : setTimeout(arguments.callee, 40)
    }, 40)
}, showAppInfo: function (a) {
    var b = $("appInfo"), e = b.getElementsByTagName("H2")[0], f = b.getElementsByTagName("P")[0],
        b = b.getElementsByTagName("A")[0];
    e.innerHTML = slide._appInfo[slide.index * slide.countPerPage + a].name;
    f.innerHTML = slide._appInfo[slide.index * slide.countPerPage + a].desc;
    b.innerHTML = slide._appInfo[slide.index * slide.countPerPage + a].buttonText;
    b.href = slide._appInfo[slide.index * slide.countPerPage + a].link;
    b.targetID = slide._appInfo[slide.index * slide.countPerPage + a].id;
    $.e.add(b, "click", function () {
        $.report.monitor(this.targetID)
    });
    b.target = "_blank";
    e = $("slideList").getElementsByTagName("LI")[slide.index].getElementsByTagName("IMG").length -
        1;
    $("appInfo").style.left = 74 * a + 17 + 74 * (parseInt(slide.countPerPage - e) / 2) + "px";
    $("appInfo").className = "app_info"
}, hideAppInfo: function () {
    $("appInfo").className = "app_info hide"
}, randomizeAppInfo: function () {
    var a = parseInt(Math.random() * (slide.countPerPage - 1));
    slide.showAppInfo(a)
}, goToNext: function () {
    slide.goToIndex(slide.index + 1)
}, goToPrev: function () {
    slide.goToIndex(slide.index - 1)
}, goToIndex: function (a) {
    if (a > slide.totalPage - 1)if (slide.loop)a = 0; else return false;
    if (a < 0)if (slide.loop)a = slide.totalPage -
        1; else return false;
    slide.index = a;
    slide._setLeft(0 - slide.index * 554);
    slide._highlightControl(a);
    slide._checkVisible()
}, goToRandom: function () {
    var a = parseInt(Math.random() * 100 % slide.totalPage);
    slide.goToIndex(a)
}, _checkVisible: function () {
    if (!slide.loop)$("prevSlide").className = slide.index <= 0 ? "prev_slide_d" : "prev_slide", $("nextSlide").className = slide.index >= slide.totalPage - 1 ? "next_slide_d" : "next_slide"
}, _highlightControl: function (a) {
    var b = $("slideControl").getElementsByTagName("LI");
    for (i in b)b[i].className =
        i != a ? "slide_ctrl" : "slide_ctrl slide_ctrl_a"
}};
var loginAction = {closeAppInfoUrl: "/cgi-bin/common/close_cyc", defaulAppId: "10000", defaulAppParam: $.winName.get("app_param"), set_guard_type: 1, set_guard_phone: "", itemIndex: -1, enterItem: function (a) {
    if (a < 0 || a > loginAction.destList.length - 1 - 1)return false;
    a = $("loginTo").getElementsByTagName("A")[a].attributes._index.nodeValue;
    window.open(loginAction.destList[a].url)
}, newUin: "", clientKey: "", loaded: false, canStartIM: false, destList: [
    {id: "a_qq", text: "\u767b\u5f55QQ", url: getURL("http://im.qq.com/qq/")},
    {id: "a_weibo",
        text: "\u767b\u5f55\u817e\u8baf\u5fae\u535a", url: getURL("http://t.qq.com/")},
    {id: "a_qzone", text: "\u767b\u5f55QQ\u7a7a\u95f4", url: getURL("http://i.qq.com/?from=zc.qq.com")},
    {id: "a_email", text: "\u767b\u5f55QQ\u90ae\u7bb1", url: getURL("", "qqmail")},
    {id: "a_game", text: "\u767b\u5f55QQ\u6e38\u620f", url: getURL("http://qqgame.qq.com/download_yd.html")},
    {id: "a_vip", text: "\u767b\u5f55QQ\u4f1a\u5458", url: getURL("", "vipqq")}
], getNewUin: function () {
    return $.cookie.getNewUin()
}, getClientKey: function () {
    return $.cookie.get("clientkey")
},
    getReportObj: function () {
        return{uin: loginAction.newUin, retType: $.winName.get("type")}
    }, destinationsInit: function () {
        var a = loginAction.getCloseAppId(), b = loginAction.destList, e = b.length, f = loginAction.newUin, c = loginAction.clientKey;
        for (d in b)b[d].url = b[d].url.replace(/%uin%/g, loginAction.newUin), b[d].url = b[d].url.replace(/%clientkey%/g, c);
        for (var b = "", d = 1; d < e; ++d)b += '<li><a href="javascript:void(0)" _index=' + d + " title=" + loginAction.destList[d].text + ">" + loginAction.destList[d].text + "</a></li>";
        $("loginTo").innerHTML =
            b;
        $.http.get(loginAction.closeAppInfoUrl + "?appid=" + a + "&lang=chs", null, function (b) {
            var d = loginAction.destList[0].text, e = "qq.com";
            browser_version() != 1 && browser_version() != 3 && browser_version() != 5 && (d = "\u4e0b\u8f7d\u5e76\u5b89\u88c5QQ");
            var m = "1", j = loginAction.destList[0].url, h = a;
            switch (b.ec) {
                case 0:
                    d = b.name;
                    m = b.jtype;
                    j = b.jurl;
                    e = b.domain;
                    $("loginToQQ").title = d;
                    break;
                default:
                    h = loginAction.defaulAppId
            }
            loginAction.defaulAppParam && (j = j + "?" + loginAction.defaulAppParam);
            var n = getPtloginUrl(j, e, f, c);
            m == "0" ? $("loginToQQ").href =
                n : (b = document.createElement("script"), b.src = "http://4.url.cn/zc/chs/plugin/" + h + "/login.js?v=10035", document.body.appendChild(b), $.e.add($("loginToQQ"), "click", function (a) {
                $.report.monitor(loginAction.destList[0].id, loginAction.getReportObj());
                var b = window.location.href, c = loginAction.newUin;
                if (b.indexOf("phone_ok.html") > -1)c = $.winName.get("temp_cellphone"), $.report.monitor("phoneOKLogin"); else if (b.indexOf("decimal_ok.html") > -1)typeof comm == "object" && (comm.get_bd_phone_ph() ? c = comm.get_bd_phone_ph() :
                    comm.get_bd_email() && browser_version() == 1 && (c = comm.get_bd_email())); else if (typeof qs == "object" && browser_version() == 1 && qs.mail)c = qs.mail;
                loginAction.startClient(n, c);
                a.stopPropagation();
                a.preventDefault()
            }));
            $("loginToQQ").innerHTML = d;
            d = $.browser("type") == "msie" ? $("loginList").offsetWidth - 8 + "px" : parseInt($.dom.getFinalStyle($("loginList"), "width")) - 8 + "px";
            d = $("login_btn").clientWidth - 8 + "px";
            $("loginSelect").style.width = d
        })
    }, getCloseAppId: function () {
        return $.winName.get("app_id") || loginAction.defaulAppId
    },
    getFromId: function () {
        return $.winName.get("fromId") || 0
    }, goToItem: function (a) {
        if (a == -1)$("loginArea").focus(), $("loginSelect").style.display = "none", loginAction.itemIndex = -1; else {
            if (a < 0 || a > loginAction.destList.length - 1 - 1)return false;
            if ($("loginSelect").style.display == "none")$("loginSelect").style.display = "block";
            var b = $("loginTo").getElementsByTagName("A");
            for (i in b)b[i].className = "";
            b[a].className = "hover";
            loginAction.itemIndex = a
        }
    }, maskPhoneNum: function (a) {
        return a
    }, tabInit: function () {
        var a = $.winName.get("type");
        a || (a = 0);
        a == 0 ? $("nav_1").className += " cur" : a == 3 ? $("nav_3").className += " cur" : $("nav_2").className += " cur"
    }, getUrlParam: function (a) {
        a = window.location.search.match(RegExp("(/?|&)" + a + "=([^&]*)(&|$)"));
        return!a ? "" : unescape(a[2])
    }, init: function (a, b, e) {
        var f = loginAction.getUrlParam("type");
        f && $.winName.set("type", f);
        f = $.winName.get("type");
        if (f == "3") {
            if ($("phone_num"))$("phone_num").innerHTML = loginAction.maskPhoneNum($.winName.get("temp_cellphone"))
        } else if (f == "0" && $.winName.get("phone_flag") && $("phone_num"))$("phone_num").innerHTML =
            loginAction.maskPhoneNum($.winName.get("temp_cellphone"));
        if (/^00/.test($.winName.get("temp_cellphone")))$("bind_phone_pwd") && ($("bind_phone_pwd").style.display = "none");
        loginAction.newUin = a ? a : loginAction.getNewUin();
        loginAction.clientKey = b ? b : loginAction.getClientKey();
        loginAction.set_guard_phone = e ? e : $.winName.get("gurad_phone");
        loginAction.destinationsInit();
        slide.init();
        loginAction.tabInit();
        $.e.add($("loginArea"), "click", function (a) {
            var b = $("loginSelect");
            b.style.display = b.style.display != "block" ?
                "block" : "none";
            a.stopPropagation()
        });
        $.e.add($("loginArea"), "keydown", function (a) {
            switch (a.keyCode) {
                case 40:
                    loginAction.goToItem(loginAction.itemIndex - 0 + 1);
                    a.preventDefault();
                    break;
                case 38:
                    loginAction.goToItem(loginAction.itemIndex - 1);
                    a.preventDefault();
                    break;
                case 13:
                    $("loginSelect").style.display != "none" && loginAction.enterItem(loginAction.itemIndex)
            }
        });
        $.e.add(document.body || document.documentElement, "click", function () {
            $("loginSelect").style.display = "none"
        });
        $.e.add($("loginSelect"), "click", function (a) {
            a.stopPropagation()
        });
        $.e.add($("loginTo"), "click", function (a) {
            a = $.e.src(a);
            if (a.nodeName.toUpperCase() == "A")a = a.attributes._index.nodeValue, a != 0 && window.open(loginAction.destList[a].url), $.report.monitor(loginAction.destList[a].id, loginAction.getReportObj())
        });
        $.e.add($("loginTo"), "mouseover", function (a) {
            var a = $.e.src(a), b = $("loginTo").getElementsByTagName("A");
            for (i in b)if (b[i].className = "", a === b[i])loginAction.itemIndex = i
        });
        loginAction.set_guard_phone && /^1/.test(loginAction.set_guard_phone) ? (loginAction.set_guard_type =
            2, $("gurad_telephone") && ($("gurad_telephone").innerHTML = loginAction.maskPhoneNum(loginAction.set_guard_phone))) : loginAction.set_guard_type = 1;
        $("setGuard") && clickSetGuard();
        $.e.add(window, "resize", loginAction.adjustHelpFriend)
    }, startClient: function (a, b) {
        zc_checkAndLogin(a, b)
    }, goToAd: function (a) {
        switch (a) {
            case 0:
                window.open("http://style.qq.com/");
                $.report.monitor("ad_style");
                break;
            case 1:
                window.open("http://pai.qq.com/");
                $.report.monitor("ad_pai");
                break;
            case 2:
                window.open("http://guanjia.qq.com/act/farm/?ADTAG=WEB.FRAM.INDEX.REG"),
                    $.report.monitor("ad_guanjia_7x")
        }
    }, showHelpFriend: function () {
        document.domain = "qq.com";
        var a = new Date - 0, b = $.winName.get("type") != 0 ? $.cookie.get("_email") : "", a = getURL("http://id.qq.com/reg/index.html?email=" + b + "&time=" + a);
        $("cover").style.display = "block";
        $("helpFriend_iframe").style.display = "block";
        $("helpFriend_iframe").src = a;
        loginAction.adjustHelpFriend();
        $.report.monitor("helpFriend")
    }, hideHelpFriend: function () {
        $("cover").style.display = "none";
        $("helpFriend_iframe").style.display = "none"
    }, adjustHelpFriend: function () {
        var a =
            $.dom.getPageHeight(), b = $.dom.getPageWidth();
        $("cover").style.height = a + "px";
        $("helpFriend_iframe").style.top = (a - $.dom.height($("helpFriend_iframe"))) / 2 + "px";
        $("helpFriend_iframe").style.left = (b - $.dom.width($("helpFriend_iframe"))) / 2 + "px"
    }, showRemenberTip: function () {
    }, showAccountTip: function () {
        var a = document.createElement("a");
        a.href = getURL("http://id.qq.com/index.html#account");
        a.target = "_blank";
        a.className = "paopao1";
        a.style.visibility = "hidden";
        a.innerHTML = '<span class="p_1" >\u65b0\u5e10\u53f7\u4e0d\u597d\u8bb0\uff1f</span>\t\t\t\t\t\t <span class="p_2">\u8bd5\u8bd5\u7528\u624b\u673a\u53f7\u7801\u767b\u5f55\u5427! ...\u53bb\u8bbe\u7f6e&gt;&gt;</span>';
        $("rember_uin").appendChild(a);
        $.winName.get("type") != 3 && $.winName.get("phone_flag") == "0" && window.setTimeout(function () {
            a.style.visibility = "visible"
        }, 1500);
        a.onclick = function () {
            $.report.monitor("paopao")
        }
    }}, change_set_guard_type = function () {
    loginAction.set_guard_type = 1;
    $("set_guard_by_phone_area").style.display = "none";
    $("setGuard") && clickSetGuard()
}, set_grard_by_phone = function () {
    var a = {};
    a.telphone = loginAction.set_guard_phone;
    a.uin = loginAction.newUin;
    $("set_guard_by_phone_button").className = "set_guard_by_phone_button_disable";
    $("set_guard_by_phone_button").disable = true;
    $.post("/cgi-bin/chs/common/secretphone", a, function (a) {
        if (a)switch ($("set_guard_by_phone").className = "hide", a.ec) {
            case 0:
                $("set_guard_by_phone_ec_0").className = "";
                break;
            case 27:
                $("set_guard_by_phone_ec_0").className = "";
                break;
            case 28:
                $("set_guard_by_phone_ec_2").className = "";
                break;
            default:
                $("set_guard_by_phone_ec_1").className = ""
        }
        $("set_guard_by_phone_button").className = "set_guard_by_phone_button";
        $("set_guard_by_phone_button").disable = false
    })
}, clickSetGuard =
    function () {
        if (loginAction.set_guard_type == 2) {
            var a = $("set_guard_by_phone_area");
            a.className == "hide" ? (a.className = "set_guard_by_phone_area", $("setGuard").className = "set_guard set_guard_c") : (a.className = "hide", $("setGuard").className = "set_guard")
        } else if (a = $("pwdGuard"), a.style.display != "block") {
            if (!loginAction.loaded)document.domain = "qq.com", $("pwdGuard").src = "http://ptlogin2.qq.com/up_pwd?clientuin=" + loginAction.newUin + "&clientkey=" + loginAction.clientKey + "&keyindex=3&newfrom=webreg&source_id=1031",
                loginAction.loaded = true;
            a.style.display = "block";
            $("safeMsg").style.height = "205px";
            $("setGuard").className = "set_guard set_guard_c"
        } else a.style.display = "none", $("safeMsg").style.height = "60px", $("setGuard").className = "set_guard"
    };
$.e.add(window, "load", function () {
    $("setGuard") && $.e.add($("set_guard_by_phone_button"), "click", function () {
        $.winName.get("type") == 3 && $.report.monitor("phoneSetGuard");
        set_grard_by_phone()
    });
    $("setGuard") && $.e.add($("setGuard"), "click", function () {
        clickSetGuard()
    });
    if (g.component.ok_ad) {
        var a = $("adLinks").getElementsByTagName("LI");
        a[0].firstChild.onmouseover = function () {
            this.parentNode.className = "link_active";
            a[1].className = a[2].className = "";
            $("adContents").style.top = "0"
        };
        $.e.add(a[0].firstChild, "click",
            function (a) {
                loginAction.goToAd(0);
                a.preventDefault()
            });
        a[1].firstChild.onmouseover = function () {
            this.parentNode.className = "link_active";
            a[0].className = a[2].className = "";
            $("adContents").style.top = "-80px"
        };
        $.e.add(a[1].firstChild, "click", function (a) {
            loginAction.goToAd(1);
            a.preventDefault()
        });
        a[2].firstChild.onmouseover = function () {
            this.parentNode.className = "link_active";
            a[1].className = a[0].className = "";
            $("adContents").style.top = "-160px"
        };
        $.e.add(a[2].firstChild, "click", function (a) {
            loginAction.goToAd(2);
            a.preventDefault()
        });
        var b = $("adContents").getElementsByTagName("LI");
        $.e.add(b[0], "click", function () {
            loginAction.goToAd(0)
        });
        $.e.add(b[1], "click", function () {
            loginAction.goToAd(1)
        });
        $.e.add(b[2], "click", function () {
            loginAction.goToAd(2)
        })
    }
});
$.e.add(window, "unload", function () {
});
