var _pid = "xxx1";
var _deviceid = "smartphone";
var _version = "2.0.1";
var _debug = true;
var path = "";
var static_playurl = "";
var static_isVr = true;
var vv_sessionId = "";
var isVvBegin = false;
var isVvEnd = false;
var static_currentTime = 0;
var static_videoDuration = 0;
var static_support_auto_play = true;

function playerReady() {
    var a = window.navigator.userAgent;
    if (a.indexOf("Android 4") != -1 && a.indexOf("Chrome") == -1) {}
    try {
        $.get("http://m.youku.com/exter/stat/mlog.html", {
            xplayer: "playerReady"
        }, function(e, d, f) {}, "json")
    } catch (c) {}
    try {
        var b = document.getElementsByTagName("object");
        if (b.length > 0) {
            isVvEnd = true
        }
    } catch (c) {}
}
function adapterVideoSizeForX() {
    try {
        var k = $(".detailimgbox")[0];
        var j = $("#youkuplayer")[0];
        var d = false;
        var m = window.navigator.userAgent;
        var c = true;
        if (m.indexOf("iPad") != -1 || m.indexOf("Nexus 7") != -1) {
            c = false
        }
        try {
            d = document.getElementsByTagName("video")[0]
        } catch (i) {
            d = false
        }
        if (d && d.currentTime > 0) {
            var l = 0;
            var h = 0;
            var g = 0;
            var a = 0;
            if (m.indexOf("Android 4") != -1 && m.indexOf("Chrome") == -1) {
                l = window.screen.availWidth;
                h = window.screen.availHeight
            } else {
                l = window.innerWidth;
                h = window.innerHeight + 1
            }
            l = document.documentElement.clientWidth;
            h = document.documentElement.clientHeight + 1;
            var f = d.videoWidth / d.videoHeight;
            var b = 0;
            var g = document.body.clientWidth;
            b = l / h;
            if (l < h) {
                a = Math.round(g / f);
                if (c) {
                    j.style.width = g + "px"
                }
                j.style.height = a + "px";
                if (f > 16 / 9) {
                    if (c) {
                        k.style.width = g + "px"
                    }
                    k.style.height = Math.round(g / (16 / 9)) + "px"
                } else {
                    if (c) {
                        k.style.width = g + "px"
                    }
                    k.style.height = a + "px"
                }
                if (f < 1 && f <= b) {
                    if (c) {
                        k.style.width = g + "px"
                    }
                    k.style.height = Math.round(g / (4 / 3)) + "px";
                    if (c) {
                        j.style.width = Math.round(g / (4 / 3) * f) + "px"
                    }
                    j.style.height = Math.round(g / (4 / 3)) + "px"
                }
                if (!static_isVr) {
                    window.scrollTo(0, 0)
                }
                static_isVr = true
            } else {
                a = Math.round(g / b);
                if (f >= b) {
                    if (c) {
                        k.style.width = g + "px"
                    }
                    k.style.height = Math.round(g / b) + "px";
                    if (c) {
                        j.style.width = g + "px"
                    }
                    j.style.height = Math.round(g / f) + "px"
                } else {
                    if (c) {
                        k.style.width = g + "px"
                    }
                    k.style.height = a + "px";
                    if (c) {
                        j.style.width = Math.round(a * f) + "px"
                    }
                    j.style.height = a + "px"
                }
                window.scrollTo(0, 80);
                static_isVr = false
            }
        }
    } catch (i) {}
}
var static_interval = setInterval(function() {
    var a = false;
    try {
        a = document.getElementsByTagName("video")[0]
    } catch (b) {
        a = false
    }
    if (a && a.currentTime > 0) {
        adapterVideoSizeForX();
        clearInterval(static_interval)
    }
}, 200);
window.onresize = function() {
    setTimeout(function() {
        adapterVideoSizeForX();
        var a = document.getElementsByTagName("video")[0];
        if (a.currentTime > 0 && !a.paused) {
            try {
                $.get("http://m.youku.com/exter/stat/mlog.html", {
                    type: "resize",
                    screen: window.screen.availWidth < window.screen.availHeight ? "VR" : "HR",
                    currentTime: a.currentTime
                }, function(d, c, e) {}, "json")
            } catch (b) {}
        }
    }, 300)
};

function init(g, b, d) {
    var f = document.getElementById("videoplayer");
    playcode = getPlayUrl(g, d);
    getLog("----playcode----:" + playcode);

    function e() {
        try {
            var j = document.getElementById("playBtn");
            j.style.background = "url(http://m.youku.com/exter/sina/jsloader/img/player_html5.png) no-repeat 0px -240px";
            $("#playBtnDiv").hide()
        } catch (k) {}
        getLog("----play----");
        video_vv_begin(g, b, playcode, static_support_auto_play)
    }
    f.addEventListener("play", e, false);
    var i = document.getElementById("playBtn");
    i.addEventListener("click", h, false);

    function h(j) {
        if (static_support_auto_play) {
            static_support_auto_play = false
        }
        if (f.paused) {
            f.play()
        } else {
            f.pause()
        }
    }
    f.addEventListener("pause", function() {
        var j = document.getElementById("playBtn");
        j.style.background = "url(http://m.youku.com/exter/sina/jsloader/img/player_html5.png) no-repeat 0px -160px"
    }, false);
    f.addEventListener("timeupdate", function() {
        try {
            var j = $("#videoplayer")[0];
            if (j.currentTime > 0) {
                static_currentTime = Math.floor(j.currentTime);
                static_videoDuration = Math.floor(j.duration);
                a()
            }
        } catch (k) {}
    }, false);

    function a() {
        try {
            var q = $(".detailimgbox")[0];
            var l = $("#videoplayer")[0];
            var r = 0;
            var o = 0;
            var n = 0;
            var j = 0;
            var s = window.navigator.userAgent;
            if (s.indexOf("Android 4") != -1 && s.indexOf("Chrome") == -1) {
                r = window.screen.availWidth;
                o = window.screen.availHeight
            } else {
                r = window.innerWidth;
                o = window.innerHeight + 1
            }
            r = document.documentElement.clientWidth;
            o = document.documentElement.clientHeight + 1;
            var m = l.videoWidth / l.videoHeight;
            var k = 0;
            var n = document.body.clientWidth;
            k = r / o;
            if (r < o) {
                j = Math.round(n / m);
                l.style.width = n + "px";
                l.style.height = j + "px";
                if (m > 16 / 9) {
                    q.style.width = n + "px";
                    q.style.height = Math.round(n / (16 / 9)) + "px"
                } else {
                    q.style.width = n + "px";
                    q.style.height = j + "px"
                }
                if (m < 1 && m <= k) {
                    q.style.width = n + "px";
                    q.style.height = Math.round(n / (4 / 3)) + "px";
                    l.style.width = Math.round(n / (4 / 3) * m) + "px";
                    l.style.height = Math.round(n / (4 / 3)) + "px"
                }
                if (!static_isVr) {
                    window.scrollTo(0, 0)
                }
                static_isVr = true
            } else {
                j = Math.round(n / k);
                if (m >= k) {
                    q.style.width = n + "px";
                    q.style.height = Math.round(n / k) + "px";
                    l.style.width = n + "px";
                    l.style.height = Math.round(n / m) + "px"
                } else {
                    q.style.width = n + "px";
                    q.style.height = j + "px";
                    l.style.width = Math.round(j * m) + "px";
                    l.style.height = j + "px"
                }
                window.scrollTo(0, 116);
                static_isVr = false
            }
        } catch (p) {}
    }
    function c() {
        try {
            var k = $(".detailimgbox")[0];
            var j = $("#videoplayer")[0];
            k.style.width = document.body.clientWidth + "px";
            k.style.height = Math.round(document.body.clientWidth / (16 / 9)) + "px";
            j.style.width = document.body.clientWidth + "px";
            j.style.height = Math.round(document.body.clientWidth / (16 / 9)) + "px"
        } catch (l) {}
    }
    window.onresize = function() {
        setTimeout(function() {
            a();
            var j = document.getElementById("videoplayer");
            if (j.currentTime > 0 && !j.paused) {
                try {
                    $.get("http://m.youku.com/exter/stat/mlog.html", {
                        type: "resize",
                        screen: window.screen.availWidth < window.screen.availHeight ? "VR" : "HR",
                        currentTime: j.currentTime
                    }, function(m, l, n) {}, "json")
                } catch (k) {}
            }
        }, 300)
    };
    f.addEventListener("ended", function() {
        video_vv_end(g, static_currentTime, static_currentTime > 0 && static_videoDuration > 0, "ended");
        getLog("----ended----");
        var j = document.getElementById("playBtn");
        if (j) {
            j.style.background = "url(http://m.youku.com/exter/sina/jsloader/img/player_html5.png) no-repeat 0px -160px"
        }
        isVvBegin = false;
        isVvEnd = false
    }, false);
    window.onload = function() {
        getLog("----onload----")
    };
    window.onunload = function() {
        getLog("----onunload----")
    };
    window.onbeforeunload = function() {
        getLog("----onbeforeunload----");
        video_vv_end(g, static_currentTime, (static_currentTime == static_videoDuration && static_currentTime > 0 && static_videoDuration > 0), "cancel")
    };
    c()
}
function getLog(a) {
    if (_debug) {
        console.log(a)
    }
}
function setCookie(a, c) {
    var b = 365;
    var d = new Date();
    d.setTime(d.getTime() + b * 24 * 60 * 60 * 1000);
    document.cookie = a + "=" + escape(c) + ";expires=" + d.toGMTString()
}
function getCookie(b) {
    var a = document.cookie.match(new RegExp("(^| )" + b + "=([^;]*)(;|$)"));
    if (a != null) {
        return unescape(a[2])
    }
    return null
}
function getSessionId(b, c) {
    var d = new Date();
    var a = d.getTime();
    return hex_md5(a + b + c)
}
function getGuid() {
    try {
        _guid = getCookie("YOUKUSESSID");
        getLog("getGuid guid: >>" + _guid)
    } catch (a) {
        getLog(a)
    }
    _guid = "jlhmijc8idqpohnmsjpqaceuv0";
    return hex_md5(_guid)
}
function getTime() {
    var a = new Date();
    initial_time = a.getTime();
    return initial_time
}
function initial() {
    var a = path + "/wireless_api3/initial";
    initial_time = getTime();
    var b = {
        pid: _pid,
        deviceid: _deviceid,
        time: initial_time
    };
    $.post(a, b, function(d, g, c) {
        try {
            getLog(d.guid)
        } catch (f) {
            getLog(f)
        }
        getLog("initial---------------success")
    })
}
function video_vv_end(a, h, c, d) {
    console.log("video_vv_end:" + c);
    if (!isVvEnd && vv_sessionId) {
        isVvEnd = true;
        getLog("video_vv_end---------------start");
        var b;
        var f = path + "/wireless_api3/statis/vv";
        _complete = 0;
        static_currentTime = h ? h : static_currentTime;
        static_currentTime = static_currentTime.toFixed(2);
        _duration = static_currentTime;
        try {
            b = document.getElementsByTagName("video")[0];
            if (b.ended) {
                _complete = 1
            }
        } catch (g) {
            _complete = 0;
            _duration = static_currentTime
        }
        if (c) {
            _complete = 1
        } else {
            _complete = 0
        }
        getLog(_duration);
        _guid = getGuid();
        json_data = {
            pid: _pid,
            guid: _guid,
            id: a,
            type: "end",
            sessionid: vv_sessionId,
            ver: _version,
            complete: _complete,
            duration: _duration,
            play_types: "net",
            network: "net"
        };
        $.post(f, json_data, function(i, j, e) {
            getLog("video_vv_end---------------success")
        });
        try {
            $.get("http://m.youku.com/exter/stat/mlog.html", {
                type: "vv_end",
                complete: _complete,
                endtype: d,
                duration: _duration,
                id: a,
                guid: _guid,
                sessionid: vv_sessionId
            }, function(i, e, j) {}, "json")
        } catch (g) {}
    }
}
function playEnd() {
    if (!isVvEnd) {
        isVvEnd = true;
        getLog("video_vv_end---------------start");
        var a = static_vid;
        var c = path + "/wireless_api3/statis/vv";
        var b = document.getElementsByTagName("video")[0];
        _complete = 0;
        _duration = b.currentTime.toFixed(2);
        if (b.ended) {
            _complete = 1;
            _duration = (player.totalTime()).toFixed(2)
        }
        getLog(_duration);
        _guid = getGuid();
        json_data = {
            pid: _pid,
            guid: _guid,
            id: a,
            type: "end",
            sessionid: vv_sessionId,
            ver: _version,
            complete: _complete,
            duration: _duration,
            play_types: "net",
            network: "net",
        };
        $.post(c, json_data, function(f, g, e) {
            getLog("video_vv_end---------------success")
        })
    }
    try {
        $.get("http://m.youku.com/exter/stat/mlog.html", {
            xplayer: "playEnd",
            complete: _complete,
            duration: _duration,
            id: a,
            guid: _guid,
            sessionid: vv_sessionId
        }, function(f, e, g) {}, "json")
    } catch (d) {}
}
function video_vv_begin(a, i, h, d) {
    if (!isVvBegin) {
        isVvBegin = true;
        var b = path + "/wireless_api3/statis/vv";
        _time = getTime();
        _guid = getGuid();
        vv_sessionId = getSessionId(a, _guid);
        json_data = {
            pid: _pid,
            sessionid: vv_sessionId,
            guid: _guid,
            id: a,
            type: "begin",
            ver: _version,
            time: _time,
            play_types: "net",
            network: "net",
            play_codes: h
        };
        $.post(b, json_data, function(j, k, e) {
            getLog("video_vv_begin---------------success")
        });
        try {
            $.get("http://m.youku.com/exter/stat/mlog.html", {
                type: "vv_begin",
                id: a,
                guid: _guid,
                sessionid: vv_sessionId,
                auto_play: d ? true : false
            }, function(j, e, k) {}, "json")
        } catch (g) {}
        var f = isLogin();
        if (f) {
            var c = path + "/smartphone/history";
            $.get(c, {
                vid: a,
                showid: i
            }, function(e) {
                getLog(e)
            })
        }
    }
}
function playStart() {
    if (!isVvBegin) {
        isVvBegin = true;
        var a = static_vid;
        var h = static_showid;
        var g = 200;
        var b = path + "/wireless_api3/statis/vv";
        _time = getTime();
        _guid = getGuid();
        vv_sessionId = getSessionId(a, _guid);
        json_data = {
            pid: _pid,
            sessionid: vv_sessionId,
            guid: _guid,
            id: a,
            type: "begin",
            ver: _version,
            time: _time,
            play_types: "net",
            network: "net",
            play_codes: g
        };
        $.post(b, json_data, function(i, j, e) {
            getLog("video_vv_begin---------------success")
        })
    }
    try {
        $.get("http://m.youku.com/exter/stat/mlog.html", {
            xplayer: "playStart",
            id: a,
            guid: _guid,
            sessionid: vv_sessionId
        }, function(i, e, j) {}, "json")
    } catch (f) {}
    var d = isLogin();
    if (d) {
        var c = path + "/smartphone/history";
        $.get(c, {
            vid: a,
            showid: h
        }, function(e) {
            getLog(e)
        })
    }
}
function retryGetPlayUrl(vid, os, _guid, reason, callback) {
    try {
        var playurlApi = "wireless/videos/<vid>/playurl";
        playurlApi = playurlApi + "?pid=JsLoaderForWeibo";
        playurlApi = playurlApi.replace(/<vid>/, vid);
        playurlApi = playurlApi + "&format=2,4,6&guid=" + _guid;
        playurlApi = "http://m.youku.com/webapp/weiboProxy?d1=" + S4() + "" + S4() + "&api=" + encodeURIComponent(playurlApi) + "&d2=" + S4() + "&isPost=false&ah=all&reason=" + reason;
        $.ajax({
            type: "GET",
            url: playurlApi,
            cache: false,
            dataType: "json",
            beforeSend: function() {},
            complete: function() {},
            success: function(response, status, xhr) {
                var getPlayUrl = "";
                playurl = getOsPlayUrl(os, response);
                if (playurl) {
                    getPlayUrl = "success";
                    static_playurl = playurl;
                    if (playurl.indexOf("m3u8") == -1 && playurl.indexOf("mp4") != -1) {
                        getRealPlayUrl(playurl)
                    } else {
                        setPlayUrl(playurl)
                    }
                } else {
                    getPlayUrl = "failed";
                    callback()
                }
                try {
                    $.get("http://m.youku.com/exter/stat/mlog.html", {
                        retry_playurl: getPlayUrl,
                        status: response.status,
                        response_code: xhr.status,
                        reason: reason,
                        vid: vid
                    }, function(response, status, xhr) {
                        console.log(response)
                    }, "json")
                } catch (e) {
                    console.log(e)
                }
            },
            error: function(xhr, status) {
                var resp = eval("(" + xhr.responseText + ")");
                var getPlayUrl = "failed";
                try {
                    $.get("http://m.youku.com/exter/stat/mlog.html", {
                        retry_playurl: getPlayUrl,
                        status: resp.status,
                        response_code: xhr.status,
                        reason: reason,
                        vid: vid,
                        code: resp.code
                    }, function(response, status, xhr) {
                        console.log(response)
                    }, "json")
                } catch (e) {
                    console.log(e)
                }
                callback()
            }
        })
    } catch (e) {
        console.log(e);
        callback()
    }
}
function getPlayUrl(a, d) {
    var b = "";
    var c = path + "/wireless_api3/videos/" + a + "/playurl";
    getLog("getPlayUrl url: >> " + c);
    _guid = getGuid();
    json_data = {
        format: "2,4,6",
    };
    $.get(c, json_data, function(h, j, g) {
        playcode = 200;
        if (h.status == "success") {
            getLog("---==================" + h.status);
            getLog(j);
            b = getOsPlayUrl(d, h);
            getLog("---------------getPlayUrl--------------------start");
            getLog(b);
            getLog("---------------getPlayUrl--------------------end");
            if (b) {
                $("#videoplayer")[0].src = b;
                try {
                    var f = window.navigator.userAgent;
                    if (f.indexOf("Android 4") != -1 && f.indexOf(" UC ") == -1) {
                        $("#videoplayer")[0].autoplay = true
                    }
                } catch (i) {}
                static_playurl = b;
                if (b.indexOf("m3u8") == -1 && b.indexOf("mp4") != -1) {
                    getRealPlayUrl(b)
                } else {
                    setPlayUrl(b)
                }
            } else {
                retryGetPlayUrl(a, d, _guid, "no_3gphd", function() {
                    $("#detail_title").html("<font color='#F53300;'>没有该视频的移动格式，请到<a style='color:#0099DE;' href='http://v.youku.com/v_show/id_" + a + ".html'>PC网页版</a>观看:) </font>")
                })
            }
        } else {
            playcode = h.code;
            getLog(h.code);
            retryGetPlayUrl(a, d, _guid, "status_failed", function() {
                alert("正在转码，请稍后再试！！")
            })
        }
        getLog("getPlayUrl-------------------------playcode:>" + playcode);
        getLog("getPlayUrl =========================== ok");
        return playcode
    })
}
function get_Cookie(a) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(a + "=");
        if (c_start != -1) {
            c_start = c_start + a.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length
            }
            return (document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}
function isLogin() {
    var b = get_Cookie("headerstr");
    var b = b.replace(new RegExp("073", "gm"), ";");
    var b = b.replace(new RegExp('"', "gm"), "");
    var b = b.replace(/\\/g, "");
    var c = get_Cookie("userid");
    var a = get_Cookie("u");
    var d = get_Cookie("zuhe");
    if (d) {
        enkey_str = StingMd5(b, c, a);
        if (enkey_str == d) {
            return true
        }
        return true
    }
    return false
}
function StingMd5(b, d, a) {
    var c = String(b) + String(d) + String(a) + "smartphone";
    hexMd5 = hex_md5(c);
    sub_hexMd5 = hexMd5.substring(4, 8);
    return sub_hexMd5
}
function getOsPlayUrl(c, b) {
    var a = "";
    if (Number(c) == 1) {
        if ((b.results["3gphd"]).length == 1) {
            a = b.results["3gphd"][0]["url"]
        }
    } else {
        if (Number(c) == 9) {
            if ((b.results["3gphd"]).length == 1) {
                a = b.results["3gphd"][0]["url"]
            } else {}
        } else {
            if (Number(c) == 2) {
                if ((b.results["m3u8_flv"]).length == 1) {
                    a = b.results["m3u8_flv"][0]["url"]
                }
            }
        }
    }
    return a
}
function getRealPlayUrl(a) {
    try {
        var c = {};
        $.get(a, c, function(f, d, h) {
            try {
                if (f[0].server) {
                    static_playurl = f[0].server
                }
            } catch (g) {}
            setPlayUrl(static_playurl)
        }, "jsonp")
    } catch (b) {
        setPlayUrl(a)
    }
}
function setPlayUrl(b) {
    $("#videoplayer")[0].src = b;
    $("#playBtnDiv").show();
    $("#playBtnDiv").click(function() {
        $("#videoplayer")[0].play();
        $("#playBtnDiv").hide()
    });
    try {
        var a = window.navigator.userAgent;
        if (a.indexOf("Android 4") != -1) {
            window.setTimeout(function() {
                $("#videoplayer")[0].play();
                $("#playBtnDiv").hide()
            }, 500)
        }
    } catch (c) {}
}
function S4() {
    return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
};