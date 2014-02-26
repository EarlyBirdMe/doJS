(function () {
    var STK = (function () {
        var that = {};
        var errorList = [];
        that.inc = function (ns, undepended) {
            return true
        };
        that.register = function (ns, maker) {
            var NSList = ns.split(".");
            var step = that;
            var k = null;
            while (k = NSList.shift()) {
                if (NSList.length) {
                    if (step[k] === undefined) {
                        step[k] = {}
                    }
                    step = step[k]
                } else {
                    if (step[k] === undefined) {
                        try {
                            step[k] = maker(that)
                        } catch (exp) {
                        }
                    }
                }
            }
        };
        that.regShort = function (sname, sfun) {
            if (that[sname] !== undefined) {
                throw"[" + sname + "] : short : has been register"
            }
            that[sname] = sfun
        };
        that.IE = /msie/i.test(navigator.userAgent);
        that.E = function (id) {
            if (typeof id === "string") {
                return document.getElementById(id)
            } else {
                return id
            }
        };
        that.C = function (tagName) {
            var dom;
            tagName = tagName.toUpperCase();
            if (tagName == "TEXT") {
                dom = document.createTextNode("")
            } else {
                if (tagName == "BUFFER") {
                    dom = document.createDocumentFragment()
                } else {
                    dom = document.createElement(tagName)
                }
            }
            return dom
        };
        that.log = function (str) {
            errorList.push("[" + ((new Date()).getTime() % 100000) + "]: " + str)
        };
        that.getErrorLogInformationList = function (n) {
            return errorList.splice(0, n || errorList.length)
        };
        return that
    })();
    $Import = STK.inc;
    STK.register("core.io.getXHR", function ($) {
        return function () {
            var _XHR = false;
            try {
                _XHR = new XMLHttpRequest()
            } catch (try_MS) {
                try {
                    _XHR = new ActiveXObject("Msxml2.XMLHTTP")
                } catch (other_MS) {
                    try {
                        _XHR = new ActiveXObject("Microsoft.XMLHTTP")
                    } catch (failed) {
                        _XHR = false
                    }
                }
            }
            return _XHR
        }
    });
    STK.register("core.obj.parseParam", function ($) {
        return function (oSource, oParams, isown) {
            var key, obj = {};
            oParams = oParams || {};
            for (key in oSource) {
                obj[key] = oSource[key];
                if (oParams[key] != null) {
                    if (isown) {
                        if (oSource.hasOwnProperty[key]) {
                            obj[key] = oParams[key]
                        }
                    } else {
                        obj[key] = oParams[key]
                    }
                }
            }
            return obj
        }
    });
    STK.register("core.str.parseURL", function ($) {
        return function (url) {
            var parse_url = /^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
            var names = ["url", "scheme", "slash", "host", "port", "path", "query", "hash"];
            var results = parse_url.exec(url);
            var that = {};
            for (var i = 0, len = names.length; i < len; i += 1) {
                that[names[i]] = results[i] || ""
            }
            return that
        }
    });
    STK.register("core.arr.isArray", function ($) {
        return function (o) {
            return Object.prototype.toString.call(o) === "[object Array]"
        }
    });
    STK.register("core.str.trim", function ($) {
        return function (str) {
            if (typeof str !== "string") {
                throw"trim need a string as parameter"
            }
            var len = str.length;
            var s = 0;
            var reg = /(\u3000|\s|\t|\u00A0)/;
            while (s < len) {
                if (!reg.test(str.charAt(s))) {
                    break
                }
                s += 1
            }
            while (len > s) {
                if (!reg.test(str.charAt(len - 1))) {
                    break
                }
                len -= 1
            }
            return str.slice(s, len)
        }
    });
    STK.register("core.json.queryToJson", function ($) {
        return function (QS, isDecode) {
            var _Qlist = $.core.str.trim(QS).split("&");
            var _json = {};
            var _fData = function (data) {
                if (isDecode) {
                    return decodeURIComponent(data)
                } else {
                    return data
                }
            };
            for (var i = 0, len = _Qlist.length; i < len; i++) {
                if (_Qlist[i]) {
                    var _hsh = _Qlist[i].split("=");
                    var _key = _hsh[0];
                    var _value = _hsh[1];
                    if (_hsh.length < 2) {
                        _value = _key;
                        _key = "$nullName"
                    }
                    if (!_json[_key]) {
                        _json[_key] = _fData(_value)
                    } else {
                        if ($.core.arr.isArray(_json[_key]) != true) {
                            _json[_key] = [_json[_key]]
                        }
                        _json[_key].push(_fData(_value))
                    }
                }
            }
            return _json
        }
    });
    STK.register("core.json.jsonToQuery", function ($) {
        var _fdata = function (data, isEncode) {
            data = data == null ? "" : data;
            data = $.core.str.trim(data.toString());
            if (isEncode) {
                return encodeURIComponent(data)
            } else {
                return data
            }
        };
        return function (JSON, isEncode) {
            var _Qstring = [];
            if (typeof JSON == "object") {
                for (var k in JSON) {
                    if (k === "$nullName") {
                        _Qstring = _Qstring.concat(JSON[k]);
                        continue
                    }
                    if (JSON[k] instanceof Array) {
                        for (var i = 0, len = JSON[k].length; i < len; i++) {
                            _Qstring.push(k + "=" + _fdata(JSON[k][i], isEncode))
                        }
                    } else {
                        if (typeof JSON[k] != "function") {
                            _Qstring.push(k + "=" + _fdata(JSON[k], isEncode))
                        }
                    }
                }
            }
            if (_Qstring.length) {
                return _Qstring.join("&")
            } else {
                return""
            }
        }
    });
    STK.register("core.util.URL", function ($) {
        return function (sURL, args) {
            var opts = $.core.obj.parseParam({isEncodeQuery: false, isEncodeHash: false}, args || {});
            var that = {};
            var url_json = $.core.str.parseURL(sURL);
            var query_json = $.core.json.queryToJson(url_json.query);
            var hash_json = $.core.json.queryToJson(url_json.hash);
            that.setParam = function (sKey, sValue) {
                query_json[sKey] = sValue;
                return this
            };
            that.getParam = function (sKey) {
                return query_json[sKey]
            };
            that.setParams = function (oJson) {
                for (var key in oJson) {
                    that.setParam(key, oJson[key])
                }
                return this
            };
            that.setHash = function (sKey, sValue) {
                hash_json[sKey] = sValue;
                return this
            };
            that.getHash = function (sKey) {
                return hash_json[sKey]
            };
            that.valueOf = that.toString = function () {
                var url = [];
                var query = $.core.json.jsonToQuery(query_json, opts.isEncodeQuery);
                var hash = $.core.json.jsonToQuery(hash_json, opts.isEncodeQuery);
                if (url_json.scheme != "") {
                    url.push(url_json.scheme + ":");
                    url.push(url_json.slash)
                }
                if (url_json.host != "") {
                    url.push(url_json.host);
                    if (url_json.port != "") {
                        url.push(":");
                        url.push(url_json.port)
                    }
                }
                url.push("/");
                url.push(url_json.path);
                if (query != "") {
                    url.push("?" + query)
                }
                if (hash != "") {
                    url.push("#" + hash)
                }
                return url.join("")
            };
            return that
        }
    });
    STK.register("core.func.empty", function () {
        return function () {
        }
    });
    STK.register("core.io.ajax", function ($) {
        return function (oOpts) {
            var opts = $.core.obj.parseParam({url: "", charset: "UTF-8", timeout: 30 * 1000, args: {}, onComplete: null, onTimeout: $.core.func.empty, uniqueID: null, onFail: $.core.func.empty, method: "get", asynchronous: true, header: {}, isEncode: false, responseType: "json"}, oOpts);
            if (opts.url == "") {
                throw"ajax need url in parameters object"
            }
            var tm;
            var trans = $.core.io.getXHR();
            var cback = function () {
                if (trans.readyState == 4) {
                    clearTimeout(tm);
                    var data = "";
                    if (opts.responseType === "xml") {
                        data = trans.responseXML
                    } else {
                        if (opts.responseType === "text") {
                            data = trans.responseText
                        } else {
                            try {
                                if (trans.responseText && typeof trans.responseText === "string") {
                                    data = eval("(" + trans.responseText + ")")
                                } else {
                                    data = {}
                                }
                            } catch (exp) {
                                data = opts.url + "return error : data error"
                            }
                        }
                    }
                    if (trans.status == 200) {
                        if (opts.onComplete != null) {
                            opts.onComplete(data)
                        }
                    } else {
                        if (trans.status == 0) {
                        } else {
                            if (opts.onFail != null) {
                                opts.onFail(data, trans)
                            }
                        }
                    }
                } else {
                    if (opts.onTraning != null) {
                        opts.onTraning(trans)
                    }
                }
            };
            trans.onreadystatechange = cback;
            if (!opts.header["Content-Type"]) {
                opts.header["Content-Type"] = "application/x-www-form-urlencoded"
            }
            if (!opts.header["X-Requested-With"]) {
                opts.header["X-Requested-With"] = "XMLHttpRequest"
            }
            if (opts.method.toLocaleLowerCase() == "get") {
                var url = $.core.util.URL(opts.url, {isEncodeQuery: opts.isEncode});
                url.setParams(opts.args);
                url.setParam("__rnd", new Date().valueOf());
                trans.open(opts.method, url, opts.asynchronous);
                try {
                    for (var k in opts.header) {
                        trans.setRequestHeader(k, opts.header[k])
                    }
                } catch (exp) {
                }
                trans.send("")
            } else {
                trans.open(opts.method, opts.url, opts.asynchronous);
                try {
                    for (var k in opts.header) {
                        trans.setRequestHeader(k, opts.header[k])
                    }
                } catch (exp) {
                }
                trans.send($.core.json.jsonToQuery(opts.args, opts.isEncode))
            }
            if (opts.timeout) {
                tm = setTimeout(function () {
                    try {
                        trans.abort()
                    } catch (exp) {
                    }
                    opts.onTimeout({}, trans);
                    opts.onFail(data, trans)
                }, opts.timeout)
            }
            return trans
        }
    });
    STK.register("core.evt.addEvent", function ($) {
        return function (sNode, sEventType, oFunc) {
            var oElement = $.E(sNode);
            if (oElement == null) {
                return false
            }
            sEventType = sEventType || "click";
            if ((typeof oFunc).toLowerCase() != "function") {
                return
            }
            if (oElement.attachEvent) {
                oElement.attachEvent("on" + sEventType, oFunc)
            } else {
                if (oElement.addEventListener) {
                    oElement.addEventListener(sEventType, oFunc, false)
                } else {
                    oElement["on" + sEventType] = oFunc
                }
            }
            return true
        }
    });
    STK.register("core.json.strToJson", function ($) {
        var at, ch, escapee = {'"': '"', "\\": "\\", "/": "/", b: "\b", f: "\f", n: "\n", r: "\r", t: "\t"}, text, error = function (m) {
            throw new Error("SyntaxError: " + m + "," + at + "," + text)
        }, next = function (c) {
            if (c && c !== ch) {
                error("Expected '" + c + "' instead of '" + ch + "'")
            }
            ch = text.charAt(at);
            at += 1;
            return ch
        }, number = function () {
            var number, string = "";
            if (ch === "-") {
                string = "-";
                next("-")
            }
            while (ch >= "0" && ch <= "9") {
                string += ch;
                next()
            }
            if (ch === ".") {
                string += ".";
                while (next() && ch >= "0" && ch <= "9") {
                    string += ch
                }
            }
            if (ch === "e" || ch === "E") {
                string += ch;
                next();
                if (ch === "-" || ch === "+") {
                    string += ch;
                    next()
                }
                while (ch >= "0" && ch <= "9") {
                    string += ch;
                    next()
                }
            }
            number = +string;
            if (isNaN(number)) {
                error("Bad number")
            } else {
                return number
            }
        }, string = function () {
            var hex, i, string = "", uffff;
            if (ch === '"') {
                while (next()) {
                    if (ch === '"') {
                        next();
                        return string
                    } else {
                        if (ch === "\\") {
                            next();
                            if (ch === "u") {
                                uffff = 0;
                                for (i = 0; i < 4; i += 1) {
                                    hex = parseInt(next(), 16);
                                    if (!isFinite(hex)) {
                                        break
                                    }
                                    uffff = uffff * 16 + hex
                                }
                                string += String.fromCharCode(uffff)
                            } else {
                                if (typeof escapee[ch] === "string") {
                                    string += escapee[ch]
                                } else {
                                    break
                                }
                            }
                        } else {
                            string += ch
                        }
                    }
                }
            }
            error("Bad string")
        }, white = function () {
            while (ch && ch <= " ") {
                next()
            }
        }, word = function () {
            switch (ch) {
                case"t":
                    next("t");
                    next("r");
                    next("u");
                    next("e");
                    return true;
                case"f":
                    next("f");
                    next("a");
                    next("l");
                    next("s");
                    next("e");
                    return false;
                case"n":
                    next("n");
                    next("u");
                    next("l");
                    next("l");
                    return null
            }
            error("Unexpected '" + ch + "'")
        }, value, array = function () {
            var array = [];
            if (ch === "[") {
                next("[");
                white();
                if (ch === "]") {
                    next("]");
                    return array
                }
                while (ch) {
                    array.push(value());
                    white();
                    if (ch === "]") {
                        next("]");
                        return array
                    }
                    next(",");
                    white()
                }
            }
            error("Bad array")
        }, object = function () {
            var key, object = {};
            if (ch === "{") {
                next("{");
                white();
                if (ch === "}") {
                    next("}");
                    return object
                }
                while (ch) {
                    key = string();
                    white();
                    next(":");
                    if (Object.hasOwnProperty.call(object, key)) {
                        error('Duplicate key "' + key + '"')
                    }
                    object[key] = value();
                    white();
                    if (ch === "}") {
                        next("}");
                        return object
                    }
                    next(",");
                    white()
                }
            }
            error("Bad object")
        };
        value = function () {
            white();
            switch (ch) {
                case"{":
                    return object();
                case"[":
                    return array();
                case'"':
                    return string();
                case"-":
                    return number();
                default:
                    return ch >= "0" && ch <= "9" ? number() : word()
            }
        };
        return function (source, reviver) {
            var result;
            text = source;
            at = 0;
            ch = " ";
            result = value();
            white();
            if (ch) {
                error("Syntax error")
            }
            return typeof reviver === "function" ? (function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }({"": result}, "")) : result
        }
    });
    STK.register("core.json.jsonToStr", function ($) {
        function f(n) {
            return n < 10 ? "0" + n : n
        }

        if (typeof Date.prototype.toJSON !== "function") {
            Date.prototype.toJSON = function (key) {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
            };
            String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
                return this.valueOf()
            }
        }
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, rep;

        function quote(string) {
            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + string + '"'
        }

        function str(key, holder) {
            var i, k, v, length, mind = gap, partial, value = holder[key];
            if (value && typeof value === "object" && typeof value.toJSON === "function") {
                value = value.toJSON(key)
            }
            if (typeof rep === "function") {
                value = rep.call(holder, key, value)
            }
            switch (typeof value) {
                case"string":
                    return quote(value);
                case"number":
                    return isFinite(value) ? String(value) : "null";
                case"boolean":
                case"null":
                    return String(value);
                case"object":
                    if (!value) {
                        return"null"
                    }
                    gap += indent;
                    partial = [];
                    if (Object.prototype.toString.apply(value) === "[object Array]") {
                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || "null"
                        }
                        v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                        gap = mind;
                        return v
                    }
                    if (rep && typeof rep === "object") {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            k = rep[i];
                            if (typeof k === "string") {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ": " : ":") + v)
                                }
                            }
                        }
                    } else {
                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ": " : ":") + v)
                                }
                            }
                        }
                    }
                    v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                    gap = mind;
                    return v
            }
        }

        return function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {"": value})
        }
    });
    var API_VERSION = 2;
    var OAUTH_LOGIN_URL = "https://api.weibo.com/" + API_VERSION + "/oauth2/authorize";
    var API_PROXY_URL = "https://api.weibo.com/" + API_VERSION + "/";
    var REFRESH_ACCESSTOKEN_URL = "https://api.weibo.com/" + API_VERSION + "/oauth2/access_token";
    var OAUTH_LOGIN_WINDOW;
    var API_CACHE = {};
    var count = 0;

    function showLogin(oArgs) {
        var url = STK.core.util.URL(OAUTH_LOGIN_URL), iWidth = 600, iHeight = 455;
        url.setParam("client_id", oArgs.appkey);
        url.setParam("response_type", "token");
        url.setParam("display", "js");
        url.setParam("redirect_uri", encodeURI(document.location.href));
        OAUTH_LOGIN_WINDOW = window.open(url, "oauth_login_window", "width=" + iWidth + ",height=" + iHeight + ",toolbar=no,menubar=no,resizable=no,status=no,left=" + (screen.width - iWidth) / 2 + ",top=" + (screen.height - iHeight) / 2);
        if (OAUTH_LOGIN_WINDOW) {
            OAUTH_LOGIN_WINDOW.focus()
        }
        return
    }

    function Authorize(options) {
        var jsonData = options || {};
        jsonData.success = 1;
        jsonData.status = 1;
        if (OAUTH_LOGIN_WINDOW) {
            OAUTH_LOGIN_WINDOW.close()
        }
        if (jsonData.error_code) {
            jsonData.success = -1;
            jsonData.status = -1
        }
        var sResult = STK.core.json.jsonToStr(jsonData);
        var oData = {data: sResult, requestType: "login"};
        var data = STK.core.json.jsonToQuery(oData);
        data = escape(data);
        try {
            if (window.postMessage) {
                window.parent.postMessage(data, "*")
            } else {
                window.parent.name = (new Date()).getTime() + (count++) + "^" + document.domain + "&" + window.escape(data)
            }
        } catch (e) {
            throw e.message
        }
    }

    window.Authorize = function (options) {
        setTimeout(function () {
            Authorize(options)
        }, 0)
    };
    function refreshAccessToken(oArgs, cbkIndex) {
        STK.core.io.ajax({url: REFRESH_ACCESSTOKEN_URL, method: "post", responseType: "json", args: oArgs, onComplete: function (sResult) {
            sResult.requestType = "refreshtoken";
            sResult = STK.core.json.jsonToStr(sResult);
            XDProxy.sendMessage(sResult, true, cbkIndex)
        }, onFail: function (sResult) {
            sResult.requestType = "refreshtoken";
            sResult = STK.core.json.jsonToStr(sResult);
            XDProxy.sendMessage(sResult, false, cbkIndex)
        }})
    }

    var XDProxy = {init: function () {
        if (window.postMessage) {
            STK.core.evt.addEvent(window, "message", this.messageHanlder)
        } else {
            this.messagePoll(window, "name")
        }
    }, sendMessage: function (sResult, bStatus, cbkIndex) {
        var oData = {data: escape(sResult), status: bStatus, cbkIndex: cbkIndex};
        var data = STK.core.json.jsonToQuery(oData);
        data = escape(data);
        if (window.postMessage) {
            parent.postMessage(data, "*")
        } else {
            window.parent.name = (new Date()).getTime() + (count++) + "^" + document.domain + "&" + window.escape(data)
        }
    }, messagePoll: function (oWindow, sName) {
        var hash = "";

        function parseData(name) {
            var oData = name.split("^").pop().split("&");
            return{domain: oData[0], data: window.unescape(oData[1])}
        }

        function getWinName() {
            var name = oWindow[sName];
            if (name != hash) {
                hash = name;
                XDProxy.messageHanlder(parseData(name))
            }
        }

        setInterval(getWinName, 1000 / 20)
    }, messageHanlder: function (oEvt) {
        oEvt = oEvt || window.event;
        var data = unescape(oEvt.data), args = STK.core.json.strToJson(data), origin = args.origin || oEvt.origin;
        if (args.requestType == "login") {
            showLogin(args);
            return
        } else {
            if (args.requestType == "refreshtoken") {
                refreshAccessToken(args, cbkIndex);
                return
            }
        }
        var cbkIndex = args.cbk_index;
        delete args.origin;
        delete args.cbk_index;
        XDProxy.ajax(args, cbkIndex)
    }, ajax: function (oArgs, cbkIndex) {
        var _this = this;
        var sHash = [];
        for (var key in oArgs) {
            if (key != "_cache_time") {
                sHash.push(oArgs[key])
            }
        }
        sHash = sHash.join("_");
        var dataExpired = true;
        if (API_CACHE[sHash]) {
            dataExpired = (new Date().valueOf() - API_CACHE[sHash].time) > oArgs._cache_time * 1000
        }
        var _uri = oArgs._uri.substr(1);
        delete oArgs._uri;
        if (dataExpired) {
            STK.core.io.ajax({url: API_PROXY_URL + _uri, method: oArgs.method, responseType: "text", args: oArgs, onComplete: function (sResult) {
                API_CACHE[sHash] = {data: sResult, status: true, time: new Date().valueOf()};
                _this.sendMessage(sResult, true, cbkIndex)
            }, onFail: function (sResult) {
                API_CACHE[sHash] = {data: sResult, status: false, time: new Date().valueOf()};
                _this.sendMessage(sResult, false, cbkIndex)
            }})
        } else {
            _this.sendMessage(API_CACHE[sHash].data, API_CACHE[sHash].status, cbkIndex)
        }
    }};
    XDProxy.init()
})();