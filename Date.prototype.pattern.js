Date.prototype.pattern = function (t) {
    var e = {"M+": this.getMonth() + 1, "d+": this.getDate(), "h+": this.getHours(), "H+": this.getHours(), "m+": this.getMinutes(), "s+": this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), S: this.getMilliseconds()}, s = {0: "日", 1: "一", 2: "二", 3: "三", 4: "四", 5: "五", 6: "六"};
    /(y+)/.test(t) && (t = t.replace(RegExp.$1, this.getFullYear().toString().substr(4 - RegExp.$1.length))), /(E+)/.test(t) && (t = t.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "星期" : "周" : "") + s[this.getDay().toString()]));
    for (var g in e)
        e.hasOwnProperty(g) && new RegExp("(" + g + ")").test(t) && (t = t.replace(RegExp.$1, 1 === RegExp.$1.length ? e[g] : ("00" + e[g]).substr(("" + e[g]).length)));
    return t
}