window.QZFL = window.QZONE = window.QZFL || window.QZONE || {};
QZFL.version = "2.1.1.7";
QZFL._qzfl = 2.116;
QZFL.emptyFn = function() {};
QZFL.returnFn = function(v) {
    return v;
};
(function() {
    var ua = QZFL.userAgent = {},
        agent = navigator.userAgent,
        nv = navigator.appVersion,
        r, m, optmz;
    ua.adjustBehaviors = QZFL.emptyFn;
    if (window.ActiveXObject) {
        ua.ie = 6;
        (window.XMLHttpRequest || (agent.indexOf('MSIE 7.0') > -1)) && (ua.ie = 7);
        (window.XDomainRequest || (agent.indexOf('Trident/4.0') > -1)) && (ua.ie = 8);
        (agent.indexOf('Trident/5.0') > -1) && (ua.ie = 9);
        (agent.indexOf('Trident/6.0') > -1) && (ua.ie = 10);
        ua.isBeta = navigator.appMinorVersion && navigator.appMinorVersion.toLowerCase().indexOf('beta') > -1;
        if (ua.ie < 7) {
            try {
                document.execCommand('BackgroundImageCache', false, true);
            } catch (ign) {}
        }
        QZFL._doc = document;
        optmz = function(st) {
            return function(fns, tm) {
                var aargs;
                if ('function' == typeof fns) {
                    aargs = Array.prototype.slice.call(arguments, 2);
                    return st(function() {
                        fns.apply(null, aargs);
                    }, tm);
                } else if ('string' == typeof fns) {
                    return st(fns, tm);
                }
            };
        };
        window.setTimeout = QZFL._setTimeout = optmz(QZFL.nativeSetTimeout = window.setTimeout);
        window.setInterval = QZFL._setInterval = optmz(QZFL.nativeSetInterval = window.setInterval);
    } else if (document.getBoxObjectFor || typeof(window.mozInnerScreenX) != 'undefined') {
        r = /(?:Firefox|GranParadiso|Iceweasel|Minefield).(\d+\.\d+)/i;
        ua.firefox = parseFloat((r.exec(agent) || r.exec('Firefox/3.3'))[1], 10);
    } else if (!navigator.taintEnabled) {
        m = /AppleWebKit.(\d+\.\d+)/i.exec(agent);
        ua.webkit = m ? parseFloat(m[1], 10) : (document.evaluate ? (document.querySelector ? 525 : 420) : 419);
        if ((m = /Chrome.(\d+\.\d+)/i.exec(agent)) || window.chrome) {
            ua.chrome = m ? parseFloat(m[1], 10) : '2.0';
        } else if ((m = /Version.(\d+\.\d+)/i.exec(agent)) || window.safariHandler) {
            ua.safari = m ? parseFloat(m[1], 10) : '3.3';
        }
        ua.air = agent.indexOf('AdobeAIR') > -1 ? 1 : 0;
        ua.isiPod = agent.indexOf('iPod') > -1;
        ua.isiPad = agent.indexOf('iPad') > -1;
        ua.isiPhone = agent.indexOf('iPhone') > -1;
    } else if (window.opera) {
        ua.opera = parseFloat(window.opera.version(), 10);
    } else {
        ua.ie = 6;
    }
    if (!(ua.macs = agent.indexOf('Mac OS X') > -1)) {
        ua.windows = ((m = /Windows.+?(\d+\.\d+)/i.exec(agent)), m && parseFloat(m[1], 10));
        ua.linux = agent.indexOf('Linux') > -1;
        ua.android = agent.indexOf('Android') > -1;
    }
    ua.iOS = agent.indexOf('iPhone OS') > -1;
    !ua.iOS && (m = /OS (\d+(?:_\d+)*) like Mac OS X/i.exec(agent), ua.iOS = m && m[1] ? true : false);
})();
QZFL.object = {
    map: function(object, scope) {
        return QZFL.object.extend(scope || window, object);
    },
    extend: function() {
        var args = arguments,
            len = arguments.length,
            deep = false,
            i = 1,
            target = args[0],
            opts, src, clone, copy;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if (typeof target !== "object" && typeof target !== "function") {
            target = {};
        }
        if (len === i) {
            target = QZFL;
            --i;
        }
        for (; i < len; i++) {
            if ((opts = arguments[i]) != null) {
                for (var name in opts) {
                    src = target[name];
                    copy = opts[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && typeof copy === "object" && !copy.nodeType) {
                        if (src) {
                            clone = src;
                        } else if (QZFL.lang.isArray(copy)) {
                            clone = [];
                        } else if (QZFL.object.getType(copy) === 'object') {
                            clone = {};
                        } else {
                            clone = copy;
                        }
                        target[name] = QZFL.object.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    },
    each: function(obj, callback) {
        var value, i = 0,
            length = obj.length,
            isObj = (length === undefined) || (typeof(obj) == "function");
        if (isObj) {
            for (var name in obj) {
                if (callback.call(obj[name], obj[name], name, obj) === false) {
                    break;
                }
            }
        } else {
            for (value = obj[0]; i < length && false !== callback.call(value, value, i, obj); value = obj[++i]) {}
        }
        return obj;
    },
    getType: function(obj) {
        return obj === null ? 'null' : (obj === undefined ? 'undefined' : Object.prototype.toString.call(obj).slice(8, -1).toLowerCase());
    },
    routeRE: /([\d\w_]+)/g,
    route: function(obj, path) {
        obj = obj || {};
        path = String(path);
        var r = QZFL.object.routeRE,
            m;
        r.lastIndex = 0;
        while ((m = r.exec(path)) !== null) {
            obj = obj[m[0]];
            if (obj === undefined || obj === null) {
                break;
            }
        }
        return obj;
    },
    bind: function(obj, fn) {
        var slice = Array.prototype.slice,
            args = slice.call(arguments, 2);
        return function() {
            obj = obj || this;
            fn = typeof fn == 'string' ? obj[fn] : fn;
            fn = typeof fn == 'function' ? fn : QZFL.emptyFn;
            return fn.apply(obj, args.concat(slice.call(arguments, 0)));
        };
    },
    ease: function(src, tar, rule) {
        if (tar) {
            if (typeof(rule) != 'function') {
                rule = QZFL.object._eachFn;
            }
            QZFL.object.each(src, function(v, k) {
                if (typeof(v) == 'function') {
                    tar[rule(k)] = v;
                }
            });
        }
    },
    _easeFn: function(name) {
        return '$' + name;
    }
};
QZFL.namespace = QZFL.object;
QZFL.runTime = {
    isDebugMode: false,
    error: QZFL.emptyFn,
    warn: QZFL.emptyFn
};
QZFL.console = window.console || {};
QZFL.console.log = QZFL.console.log ||
function() {};
QZFL.console.print = QZFL.console.log;
QZFL.widget = {};
QZFL.object.map(QZFL.object, QZFL);
QZFL.config = QZFL.config || {};
(typeof QZFL.config.debugLevel == 'undefined') && (QZFL.config.debugLevel = 0);
(typeof QZFL.config.defaultDataCharacterSet == 'undefined') && (QZFL.config.defaultDataCharacterSet = "GB2312");
(typeof QZFL.config.DCCookieDomain == 'undefined') && (QZFL.config.DCCookieDomain = "qzone.qq.com");
(typeof QZFL.config.domainPrefix == 'undefined') && (QZFL.config.domainPrefix = "qq.com");
(typeof QZFL.config.domain == 'undefined') && (QZFL.config.domain = "qzs.qq.com");
(typeof QZFL.config.resourceDomain == 'undefined') && (QZFL.config.resourceDomain = "qzonestyle.gtimg.cn");
QZFL.config.gbEncoderPath = "http://" + QZFL.config.domain + "/qzone/v5/toolpages/";
QZFL.config.FSHelperPage = "http://" + QZFL.config.domain + "/qzone/v5/toolpages/fp_gbk.html";
QZFL.config.defaultShareObject = "http://" + QZFL.config.resourceDomain + "/qzone/v5/toolpages/getset.swf";
QZFL.config.staticServer = "http://" + QZFL.config.resourceDomain + "/ac/qzone/qzfl/lc/";
QZFL.css = {
    classFileNameCache: {},
    convertHexColor: function(color) {
        color = String(color || '');
        color.charAt(0) == '#' && (color = color.substring(1));
        color.length == 3 && (color = color.replace(/([0-9a-f])/ig, '$1$1'));
        return color.length == 6 ? [parseInt(color.substr(0, 2), 16), parseInt(color.substr(2, 2), 16), parseInt(color.substr(4, 2), 16)] : [0, 0, 0];
    },
    rgb2hsl: function(r, g, b) {
        var t, red = Math.max(r / 255, 0),
            green = Math.max(g / 255, 0),
            blue = Math.max(b / 255, 0),
            max = Math.max(red, green, blue),
            min = Math.min(red, green, blue),
            result = {
                h: 0,
                s: 0,
                l: Math.max((max + min) / 2, 0)
            };
        if (max != min) {
            if (max == red) {
                result.h = (t = 60 * ((green - blue) / (max - min))) < 0 ? (t + 360) : t;
            } else if (max == green) {
                result.h = (60 * ((blue - red) / (max - min)) + 120);
            } else if (max == blue) {
                result.h = (60 * ((red - green) / (max - min)) + 240);
            }
            if (result.l <= 0.5) {
                result.s = (max - min) / (2 * result.l);
            } else if (0.5 < result.l) {
                result.s = (max - min) / (2 - 2 * result.l);
            }
            result.h = Math.round(result.h);
            result.s = Math.round(result.s * 100) / 100;
            result.l = Math.round(result.l * 100) / 100;
        }
        return result;
    },
    getStyleSheetById: function(id) {
        var s;
        return (s = QZFL.dom.get(id)) && s.sheet || (s = document.styleSheets) && s[id];
    },
    getRulesBySheet: function(sheetId) {
        var ss = typeof(sheetId) == "object" ? sheetId : QZFL.css.getStyleSheetById(sheetId),
            rs = {},
            head, base;
        if (ss && !(rs = ss.cssRules || ss.rules)) {
            if (head = document.getElementsByTagName('head')[0]) {
                if (base = head.getElementsByTagName('base')[0]) {
                    QZFL.dom.removeElement(base);
                    rs = ss.cssRules;
                    head.appendChild(base);
                }
            }
        }
        return rs;
    },
    getRuleBySelector: function(sheetId, selector) {
        selector = (String(selector)).toLowerCase();
        var _ss = QZFL.css.getStyleSheetById(sheetId),
            _rs = QZFL.css.getRulesBySheet(_ss);
        for (var i = 0, len = _rs.length; i < len; ++i) {
            if (selector == _rs[i].selectorText.toLowerCase()) {
                return _rs[i];
            }
        }
        return null;
    },
    insertCSSLink: function(url, opts) {
        var sid, doc, t, cssLink, head;
        if (QZFL.css.classFileNameCache[url]) {
            return;
        }
        if (typeof opts == "string") {
            sid = opts;
        }
        opts = (typeof opts == "object") ? opts : {};
        sid = opts.linkID || sid;
        doc = opts.doc || document;
        head = doc.getElementsByTagName("head")[0];
        cssLink = ((t = doc.getElementById(sid)) && (t.nodeName == "LINK")) ? t : null;
        if (!cssLink) {
            cssLink = doc.createElement("link");
            sid && (cssLink.id = sid);
            cssLink.rel = cssLink.rev = "stylesheet";
            cssLink.type = "text/css";
            cssLink.media = opts.media || "screen";
            head.appendChild(cssLink);
        }
        try {
            url && (cssLink.href = url);
        } catch (ign) {}
        QZFL.css.classFileNameCache[url] = true;
        return (QZFL.userAgent.ie < 9 && cssLink.sheet) || cssLink;
    },
    insertStyleSheet: function(sheetId, rules) {
        var node = document.createElement("style");
        node.type = 'text/css';
        sheetId && (node.id = sheetId);
        document.getElementsByTagName("head")[0].appendChild(node);
        if (rules) {
            if (node.styleSheet) {
                node.styleSheet.cssText = rules;
            } else {
                node.appendChild(document.createTextNode(rules));
            }
        }
        return node.sheet || node;
    },
    removeStyleSheet: function(id) {
        var _ss = QZFL.css.getStyleSheetById(id);
        _ss && QZFL.dom.removeElement(_ss.owningElement || _ss.ownerNode);
    },
    _reClassToken: /\s+/,
    updateClassName: function(elem, removeNames, addNames) {
        if (!elem || elem.nodeType != 1) {
            return "";
        }
        var oriName = elem.className,
            _s = QZFL.css,
            ar, b;
        if (removeNames && typeof(removeNames) == 'string' || addNames && typeof(addNames) == 'string') {
            if (removeNames == '*') {
                oriName = '';
            } else {
                ar = oriName.split(_s._reClassToken);
                var i = 0,
                    l = ar.length,
                    n;
                oriName = {};
                for (; i < l; ++i) {
                    ar[i] && (oriName[ar[i]] = true);
                }
                if (addNames) {
                    ar = addNames.split(_s._reClassToken);
                    l = ar.length;
                    for (i = 0; i < l; ++i) {
                        (n = ar[i]) && !oriName[n] && (b = oriName[n] = true);
                    }
                }
                if (removeNames) {
                    ar = removeNames.split(_s._reClassToken);
                    l = ar.length;
                    for (i = 0; i < l; i++) {
                        (n = ar[i]) && oriName[n] && (b = true) && delete oriName[n];
                    }
                }
            }
            if (b) {
                ar.length = 0;
                for (var k in oriName) {
                    ar.push(k);
                }
                oriName = ar.join(' ');
                elem.className = oriName;
            }
        }
        return oriName;
    },
    hasClassName: function(elem, name) {
        return (elem && name) ? (elem.classList ? elem.classList.contains(name) : (name && ((' ' + elem.className + ' ').indexOf(' ' + name + ' ') > -1))) : false;
    },
    addClassName: function(elem, names) {
        var _s = QZFL.css;
        return names && ((elem && elem.classList && !_s._reClassToken.test(names)) ? elem.classList.add(names) : _s.updateClassName(elem, null, names));
    },
    removeClassName: function(elem, names) {
        var _s = QZFL.css;
        return names && ((elem && elem.classList && !_s._reClassToken.test(names)) ? elem.classList.remove(names) : _s.updateClassName(elem, names));
    },
    replaceClassName: function(elems, a, b) {
        QZFL.css.swapClassName(elems, a, b, true);
    },
    swapClassName: function(elems, a, b, _isRep) {
        if (elems && typeof(elems) == "object") {
            if (elems.length === undefined) {
                elems = [elems];
            }
            for (var elem, i = 0, l = elems.length; i < l; ++i) {
                if ((elem = elems[i]) && elem.nodeType == 1) {
                    if (QZFL.css.hasClassName(elem, a)) {
                        QZFL.css.updateClassName(elem, a, b);
                    } else if (!_isRep && QZFL.css.hasClassName(elem, b)) {
                        QZFL.css.updateClassName(elem, b, a);
                    }
                }
            }
        }
    },
    toggleClassName: function(elem, name) {
        if (!elem || elem.nodeType != 1) {
            return;
        }
        var _s = QZFL.css;
        if (elem.classList && name && !_s._reClassToken.test(name)) {
            return elem.classList.toggle(name);
        }
        if (_s.hasClassName(elem, name)) {
            _s.updateClassName(elem, name);
        } else {
            _s.updateClassName(elem, null, name);
        }
    }
};
QZFL.dom = {
    getById: function(id) {
        return document.getElementById(id);
    },
    getByName: function(name, tagName, rt) {
        return QZFL.selector((tagName || "") + '[name="' + name + '"]', rt);
    },
    get: function(e) {
        return (typeof(e) == "string") ? document.getElementById(e) : e;
    },
    getNode: function(e) {
        return (e && (e.nodeType || e.item)) ? e : document.getElementById(e);
    },
    removeElement: function(elem) {
        if (elem = QZFL.dom.get(elem)) {
            if (QZFL.userAgent.ie > 8 && elem.tagName == "SCRIPT") {
                elem.src = "";
            }
            elem.removeNode ? elem.removeNode(true) : (elem.parentNode && elem.parentNode.removeChild(elem));
        }
        return elem = null;
    },
    searchChain: function(elem, prop, func) {
        prop = prop || 'parentNode';
        while (elem && elem.nodeType && elem.nodeType == 1) {
            if (!func || func.call(elem, elem)) {
                return elem;
            }
            elem = elem[prop];
        }
        return null;
    },
    searchElementByClassName: function(elem, className) {
        elem = QZFL.dom.get(elem);
        return QZFL.dom.searchChain(elem, 'parentNode', function(el) {
            return QZFL.css.hasClassName(el, className);
        });
    },
    getElementsByClassName: function(className, tagName, context) {
        return QZFL.selector((tagName || '') + '.' + className, QZFL.dom.get(context));
    },
    isAncestor: function(a, b) {
        return a && b && a != b && QZFL.dom.contains(a, b);
    },
    getAncestorBy: function(elem, method) {
        elem = QZFL.dom.get(elem);
        return QZFL.dom.searchChain(elem.parentNode, 'parentNode', function(el) {
            return el.nodeType == 1 && (!method || method(el));
        });
    },
    getFirstChild: function(elem) {
        elem = QZFL.dom.get(elem);
        return elem.firstElementChild || QZFL.dom.searchChain(elem && elem.firstChild, 'nextSibling', function(el) {
            return el.nodeType == 1;
        });
    },
    getLastChild: function(elem) {
        elem = QZFL.dom.get(elem);
        return elem.lastElementChild || QZFL.dom.searchChain(elem && elem.lastChild, 'previousSibling', function(el) {
            return el.nodeType == 1;
        });
    },
    getNextSibling: function(elem) {
        elem = QZFL.dom.get(elem);
        return elem.nextElementSibling || QZFL.dom.searchChain(elem && elem.nextSibling, 'nextSibling', function(el) {
            return el.nodeType == 1;
        });
    },
    getPreviousSibling: function(elem) {
        elem = QZFL.dom.get(elem);
        return elem.previousElementSibling || QZFL.dom.searchChain(elem && elem.previousSibling, 'previousSibling', function(el) {
            return el.nodeType == 1;
        });
    },
    swapNode: function(node1, node2) {
        if (node1.swapNode) {
            node1.swapNode(node2);
        } else {
            var prt = node2.parentNode,
                next = node2.nextSibling;
            if (next == node1) {
                prt.insertBefore(node1, node2);
            } else if (node2 == node1.nextSibling) {
                prt.insertBefore(node2, node1);
            } else {
                node1.parentNode.replaceChild(node2, node1);
                prt.insertBefore(node1, next);
            }
        }
    },
    createElementIn: function(tagName, elem, insertFirst, attrs) {
        var _e = (elem = QZFL.dom.get(elem) || document.body).ownerDocument.createElement(tagName || "div"),
            k;
        if (typeof(attrs) == 'object') {
            for (k in attrs) {
                if (k == "class") {
                    _e.className = attrs[k];
                } else if (k == "style") {
                    _e.style.cssText = attrs[k];
                } else {
                    _e[k] = attrs[k];
                }
            }
        }
        insertFirst ? elem.insertBefore(_e, elem.firstChild) : elem.appendChild(_e);
        return _e;
    },
    getStyle: function(el, property) {
        el = QZFL.dom.get(el);
        if (!el || el.nodeType == 9) {
            return null;
        }
        var w3cMode = document.defaultView && document.defaultView.getComputedStyle,
            computed = !w3cMode ? null : document.defaultView.getComputedStyle(el, ''),
            value = "";
        switch (property) {
        case "float":
            property = w3cMode ? "cssFloat" : "styleFloat";
            break;
        case "opacity":
            if (!w3cMode) {
                var val = 100;
                try {
                    val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity;
                } catch (e) {
                    try {
                        val = el.filters('alpha').opacity;
                    } catch (e) {}
                }
                return val / 100;
            } else {
                return parseFloat((computed || el.style)[property]);
            }
            break;
        case "backgroundPositionX":
            if (w3cMode) {
                property = "backgroundPosition";
                return ((computed || el.style)[property]).split(" ")[0];
            }
            break;
        case "backgroundPositionY":
            if (w3cMode) {
                property = "backgroundPosition";
                return ((computed || el.style)[property]).split(" ")[1];
            }
            break;
        }
        if (w3cMode) {
            return (computed || el.style)[property];
        } else {
            return (el.currentStyle[property] || el.style[property]);
        }
    },
    setStyle: function(el, properties, value) {
        if (!(el = QZFL.dom.get(el)) || el.nodeType != 1) {
            return false;
        }
        var tmp, bRtn = true,
            w3cMode = (tmp = document.defaultView) && tmp.getComputedStyle,
            rexclude = /z-?index|font-?weight|opacity|zoom|line-?height/i;
        if (typeof(properties) == 'string') {
            tmp = properties;
            properties = {};
            properties[tmp] = value;
        }
        for (var prop in properties) {
            value = properties[prop];
            if (prop == 'float') {
                prop = w3cMode ? "cssFloat" : "styleFloat";
            } else if (prop == 'opacity') {
                if (!w3cMode) {
                    prop = 'filter';
                    value = value >= 1 ? '' : ('alpha(opacity=' + Math.round(value * 100) + ')');
                }
            } else if (prop == 'backgroundPositionX' || prop == 'backgroundPositionY') {
                tmp = prop.slice(-1) == 'X' ? 'Y' : 'X';
                if (w3cMode) {
                    var v = QZFL.dom.getStyle(el, "backgroundPosition" + tmp);
                    prop = 'backgroundPosition';
                    typeof(value) == 'number' && (value = value + 'px');
                    value = tmp == 'Y' ? (value + " " + (v || "top")) : ((v || 'left') + " " + value);
                }
            }
            if (typeof el.style[prop] != "undefined") {
                el.style[prop] = value + (typeof value === "number" && !rexclude.test(prop) ? 'px' : '');
                bRtn = bRtn && true;
            } else {
                bRtn = bRtn && false;
            }
        }
        return bRtn;
    },
    createNamedElement: function(type, name, doc) {
        var _doc = doc || document,
            element;
        try {
            element = _doc.createElement('<' + type + ' name="' + name + '">');
        } catch (ign) {}
        if (!element) {
            element = _doc.createElement(type);
        }
        if (!element.name) {
            element.name = name;
        }
        return element;
    },
    getRect: function(elem) {
        if (elem = QZFL.dom.get(elem)) {
            var box = QZFL.object.extend({}, elem.getBoundingClientRect());
            if (typeof box.width == 'undefined') {
                box.width = box.right - box.left;
                box.height = box.bottom - box.top;
            }
            return box;
        }
    },
    getPosition: function(elem) {
        var box, s, doc;
        if (box = QZFL.dom.getRect(elem)) {
            if (s = QZFL.dom.getScrollLeft(doc = elem.ownerDocument)) {
                box.left += s, box.right += s;
            }
            if (s = QZFL.dom.getScrollTop(doc)) {
                box.top += s, box.bottom += s;
            }
            return box;
        }
    },
    setPosition: function(el, pos) {
        QZFL.dom.setXY(el, pos['left'], pos['top']);
        QZFL.dom.setSize(el, pos['width'], pos['height']);
    },
    getXY: function(elem) {
        var box = QZFL.dom.getPosition(elem) || {
            left: 0,
            top: 0
        };
        return [box.left, box.top];
    },
    getSize: function(elem) {
        var box = QZFL.dom.getPosition(elem) || {
            width: -1,
            height: -1
        };
        return [box.width, box.height];
    },
    setXY: function(elem, x, y) {
        var _ml = parseInt(QZFL.dom.getStyle(elem, "marginLeft")) || 0,
            _mt = parseInt(QZFL.dom.getStyle(elem, "marginTop")) || 0;
        QZFL.dom.setStyle(elem, {
            left: ((parseInt(x, 10) || 0) - _ml) + "px",
            top: ((parseInt(y, 10) || 0) - _mt) + "px"
        });
    },
    getScrollLeft: function(doc) {
        var _doc = doc || document;
        return (_doc.defaultView && _doc.defaultView.pageXOffset) || Math.max(_doc.documentElement.scrollLeft, _doc.body.scrollLeft);
    },
    getScrollTop: function(doc) {
        var _doc = doc || document;
        return (_doc.defaultView && _doc.defaultView.pageYOffset) || Math.max(_doc.documentElement.scrollTop, _doc.body.scrollTop);
    },
    getScrollHeight: function(doc) {
        var _doc = doc || document;
        return Math.max(_doc.documentElement.scrollHeight, _doc.body.scrollHeight);
    },
    getScrollWidth: function(doc) {
        var _doc = doc || document;
        return Math.max(_doc.documentElement.scrollWidth, _doc.body.scrollWidth);
    },
    setScrollLeft: function(value, doc) {
        var _doc = doc || document;
        _doc[_doc.compatMode == "CSS1Compat" && !QZFL.userAgent.webkit ? "documentElement" : "body"].scrollLeft = value;
    },
    setScrollTop: function(value, doc) {
        var _doc = doc || document;
        _doc[_doc.compatMode == "CSS1Compat" && !QZFL.userAgent.webkit ? "documentElement" : "body"].scrollTop = value;
    },
    getClientHeight: function(doc) {
        var _doc = doc || document;
        return _doc.compatMode == "CSS1Compat" ? _doc.documentElement.clientHeight : _doc.body.clientHeight;
    },
    getClientWidth: function(doc) {
        var _doc = doc || document;
        return _doc.compatMode == "CSS1Compat" ? _doc.documentElement.clientWidth : _doc.body.clientWidth;
    },
    _SET_SIZE_RE: /^\d+(?:\.\d*)?(px|%|em|in|cm|mm|pc|pt)?$/,
    setSize: function(el, w, h) {
        el = QZFL.dom.get(el);
        var _r = QZFL.dom._SET_SIZE_RE,
            m;
        QZFL.dom.setStyle(el, "width", (m = _r.exec(w)) ? (m[1] ? w : (parseInt(w, 10) + 'px')) : 'auto');
        QZFL.dom.setStyle(el, "height", (m = _r.exec(h)) ? (m[1] ? h : (parseInt(h, 10) + 'px')) : 'auto');
    },
    getDocumentWindow: function(doc) {
        var _doc = doc || document;
        return _doc.parentWindow || _doc.defaultView;
    },
    getElementsByTagNameNS: function(node, ns, tgn) {
        node = node || document;
        var res = [];
        if (node.getElementsByTagNameNS) {
            return node.getElementsByTagName(ns + ":" + tgn);
        } else if (node.getElementsByTagName) {
            var n = document.namespaces;
            if (n.length > 0) {
                var l = node.getElementsByTagName(tgn);
                for (var i = 0, len = l.length; i < len; ++i) {
                    if (l[i].scopeName == ns) {
                        res.push(l[i]);
                    }
                }
            }
        }
        return res;
    },
    getElementByTagNameBubble: function(elem, tn) {
        if (!tn) {
            return null;
        }
        var maxLv = 15;
        tn = String(tn).toUpperCase();
        if (tn == 'BODY') {
            return document.body;
        }
        elem = QZFL.dom.searchChain(elem = QZFL.dom.get(elem), 'parentNode', function(el) {
            return el.tagName == tn || el.tagName == 'BODY' || (--maxLv) < 0;
        });
        return !elem || maxLv < 0 ? null : elem;
    },
    insertAdjacent: function(elem, where, html, isText) {
        var range, pos = ['beforeBegin', 'afterBegin', 'beforeEnd', 'afterEnd'],
            doc;
        if (QZFL.lang.isElement(elem) && pos[where] && (QZFL.lang.isString(html) || QZFL.lang.isElement(html))) {
            if (elem.insertAdjacentHTML) {
                elem['insertAdjacent' + (typeof(html) == 'object' ? 'Element' : (isText ? 'Text' : 'HTML'))](pos[where], html);
            } else {
                range = (doc = elem.ownerDocument).createRange();
                range[where == 1 || where == 2 ? 'selectNodeContents' : 'selectNode'](elem);
                range.collapse(where < 2);
                range.insertNode(typeof(html) != 'string' ? html : isText ? doc.createTextNode(html) : range.createContextualFragment(html));
            }
            return true;
        }
        return false;
    }
};
QZFL.event = {
    KEYS: {
        BACKSPACE: 8,
        TAB: 9,
        RETURN: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46
    },
    _eventListDictionary: {},
    _fnSeqUID: 0,
    _objSeqUID: 0,
    addEvent: function(obj, eventType, fn, argArray) {
        var cfn, res = false,
            l, handlers;
        if (!obj) {
            return res;
        }
        if (!obj.eventsListUID) {
            obj.eventsListUID = "e" + (++QZFL.event._objSeqUID);
        }
        if (!(l = QZFL.event._eventListDictionary[obj.eventsListUID])) {
            l = QZFL.event._eventListDictionary[obj.eventsListUID] = {};
        }
        if (!fn.__elUID) {
            fn.__elUID = "e" + (++QZFL.event._fnSeqUID) + obj.eventsListUID;
        }
        if (!l[eventType]) {
            l[eventType] = {};
        }
        if (!l[eventType].handlers) {
            l[eventType].handlers = {};
        }
        handlers = l[eventType].handlers;
        if (typeof(handlers[fn.__elUID]) == 'function') {
            return false;
        }
        cfn = function(evt) {
            return fn.apply(obj, !argArray ? [QZFL.event.getEvent(evt)] : ([QZFL.event.getEvent(evt)]).concat(argArray));
        };
        if (obj.addEventListener) {
            obj.addEventListener(eventType, cfn, false);
            res = true;
        } else if (obj.attachEvent) {
            res = obj.attachEvent("on" + eventType, cfn);
        } else {
            res = false;
        }
        if (res) {
            handlers[fn.__elUID] = cfn;
        }
        return res;
    },
    removeEvent: function(obj, eventType, fn) {
        var cfn = fn,
            res = false,
            l = QZFL.event._eventListDictionary,
            r;
        if (!obj) {
            return res;
        }
        if (!fn) {
            return QZFL.event.purgeEvent(obj, eventType);
        }
        if (obj.eventsListUID && l[obj.eventsListUID] && l[obj.eventsListUID][eventType]) {
            l = l[obj.eventsListUID][eventType].handlers;
            if (l && l[fn.__elUID]) {
                cfn = l[fn.__elUID];
                r = l;
            }
        }
        if (obj.removeEventListener) {
            obj.removeEventListener(eventType, cfn, false);
            res = true;
        } else if (obj.detachEvent) {
            obj.detachEvent("on" + eventType, cfn);
            res = true;
        } else {
            return false;
        }
        if (res && r && r[fn.__elUID]) {
            delete r[fn.__elUID];
        }
        return res;
    },
    purgeEvent: function(obj, type) {
        var l, h;
        if (obj.eventsListUID && (l = QZFL.event._eventListDictionary[obj.eventsListUID]) && l[type] && (h = l[type].handlers)) {
            for (var k in h) {
                if (obj.removeEventListener) {
                    obj.removeEventListener(type, h[k], false);
                } else if (obj.detachEvent) {
                    obj.detachEvent('on' + type, h[k]);
                }
            }
        }
        if (obj['on' + type]) {
            obj['on' + type] = null;
        }
        if (h) {
            l[type].handlers = null;
            delete l[type].handlers;
        }
        return true;
    },
    getEvent: function(evt) {
        var evt = window.event || evt || null,
            c, _s = QZFL.event.getEvent,
            ct = 0;
        if (!evt) {
            c = arguments.callee;
            while (c && ct < _s.MAX_LEVEL) {
                if ((evt = c.arguments[0]) && (typeof(evt.button) != "undefined" && typeof(evt.ctrlKey) != "undefined")) {
                    break;
                }++ct;
                c = c.caller;
            }
        }
        return evt;
    },
    getButton: function(evt) {
        var e = QZFL.event.getEvent(evt);
        if (!e) {
            return -1
        }
        if (QZFL.userAgent.ie) {
            return e.button - Math.ceil(e.button / 2);
        } else {
            return e.button;
        }
    },
    getTarget: function(evt) {
        var e = QZFL.event.getEvent(evt);
        if (e) {
            return e.srcElement || e.target;
        } else {
            return null;
        }
    },
    getCurrentTarget: function(evt) {
        var e = QZFL.event.getEvent(evt);
        if (e) {
            return e.currentTarget || document.activeElement;
        } else {
            return null;
        }
    },
    cancelBubble: function(evt) {
        evt = QZFL.event.getEvent(evt);
        if (!evt) {
            return false
        }
        if (evt.stopPropagation) {
            evt.stopPropagation();
        } else {
            if (!evt.cancelBubble) {
                evt.cancelBubble = true;
            }
        }
    },
    preventDefault: function(evt) {
        evt = QZFL.event.getEvent(evt);
        if (!evt) {
            return false
        }
        if (evt.preventDefault) {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
    },
    mouseX: function(evt) {
        evt = QZFL.event.getEvent(evt);
        return evt.pageX || (evt.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    },
    mouseY: function(evt) {
        evt = QZFL.event.getEvent(evt);
        return evt.pageY || (evt.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    },
    getRelatedTarget: function(ev) {
        ev = QZFL.event.getEvent(ev);
        var t = ev.relatedTarget;
        if (!t) {
            if (ev.type == "mouseout") {
                t = ev.toElement;
            } else if (ev.type == "mouseover") {
                t = ev.fromElement;
            } else {}
        }
        return t;
    },
    onDomReady: function(fn) {
        var _s = QZFL.event.onDomReady;
        QZFL.event._bindReady();
        _s.pool.push(fn);
    },
    _bindReady: function() {
        var _s = QZFL.event.onDomReady;
        if (typeof _s.pool != 'undefined') {
            return;
        }
        _s.pool = _s.pool || [];
        if (document.readyState === "complete") {
            return setTimeout(QZFL.event._readyFn, 1);
        }
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", QZFL.event._domReady, false);
            window.addEventListener("load", QZFL.event._readyFn, false);
        } else if (document.attachEvent) {
            document.attachEvent("onreadystatechange", QZFL.event._domReady);
            window.attachEvent("onload", QZFL.event._readyFn);
            var toplevel = false;
            try {
                toplevel = window.frameElement == null;
            } catch (e) {}
            if (document.documentElement.doScroll && toplevel) {
                QZFL.event._ieScrollCheck();
            }
        }
    },
    _readyFn: function() {
        var _s = QZFL.event.onDomReady;
        _s.isReady = true;
        while (_s.pool.length) {
            var fn = _s.pool.shift();
            QZFL.lang.isFunction(fn) && fn();
        }
        _s.pool.length == 0 && (_s._fn = null);
    },
    _domReady: function() {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", QZFL.event._domReady, false);
            QZFL.event._readyFn();
        } else if (document.attachEvent) {
            if (document.readyState === "complete") {
                document.detachEvent("onreadystatechange", QZFL.event._domReady);
                QZFL.event._readyFn();
            }
        }
    },
    _ieScrollCheck: function() {
        if (QZFL.event.onDomReady.isReady) {
            return;
        }
        try {
            document.documentElement.doScroll("left");
        } catch (e) {
            setTimeout(QZFL.event._ieScrollCheck, 1);
            return;
        }
        QZFL.event._readyFn();
    },
    delegate: function(delegateDom, selector, eventType, fn, argsArray) {
        var path = "http://" + QZFL.config.resourceDomain + "/ac/qzfl/release/expand/delegate.js?max_age=864000";
        QZFL.imports(path, function() {
            QZFL.event.delegate(delegateDom, selector, eventType, fn, argsArray);
        });
    },
    undelegate: function(delegateDom, selector, eventType, fn) {}
};
QZFL.event.on = QZFL.event.addEvent;
QZFL.event.bind = QZFL.object.bind;
QZFL.event.getEvent.MAX_LEVEL = 10;
QZFL.lang = {
    isString: function(o) {
        return QZFL.object.getType(o) == "string";
    },
    isArray: function(o) {
        return QZFL.object.getType(o) == "array";
    },
    isFunction: function(o) {
        return QZFL.object.getType(o) == "function";
    },
    isHashMap: function(o) {
        return QZFL.object.getType(o) == "object";
    },
    isNode: function(o) {
        return o && (typeof(o.nodeName) != 'undefined' || typeof(o.nodeType) != 'undefined');
    },
    isElement: function(o) {
        return o && o.nodeType == 1;
    }
};
(function(window, undefined) {
    var cachedruns, assertGetIdNotName, Expr, getText, isXML, contains, compile, sortOrder, hasDuplicate, outermostContext, strundefined = "undefined",
        MAX_NEGATIVE = 1 << 31,
        baseHasDuplicate = true,
        expando = "sizzle" + -(new Date()),
        Token = String,
        document = window.document,
        docElem = document.documentElement,
        dirruns = 0,
        done = 0,
        pop = [].pop,
        push = [].push,
        slice = [].slice,
        indexOf = [].indexOf ||
    function(elem) {
        var i = 0,
            len = this.length;
        for (; i < len; i++) {
            if (this[i] === elem) {
                return i;
            }
        }
        return -1;
    }, markFunction = function(fn, value) {
        fn[expando] = value == null || value;
        return fn;
    }, createCache = function() {
        var cache = {},
            keys = [];
        return markFunction(function(key, value) {
            if (keys.push(key) > Expr.cacheLength) {
                delete cache[keys.shift()];
            }
            return (cache[key + " "] = value);
        }, cache);
    }, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), operators = "([*^$|!~]?=)", attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)", rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"), rpseudo = new RegExp(pseudos), rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[ \t\r\n\f]*[+~]/, rheader = /h\d/i, rinputs = /input|select|textarea|button/i, rbackslash = /\\(?!\\)/g, matchExpr = {
        "ID": new RegExp("^#(" + characterEncoding + ")"),
        "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
        "NAME": new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
        "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
        "ATTR": new RegExp("^" + attributes),
        "PSEUDO": new RegExp("^" + pseudos),
        "CHILD": new RegExp("^:(only|nth|first|last)-child(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
        "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
    }, assert = function(fn) {
        var div = document.createElement("div");
        try {
            return fn(div);
        } catch (e) {
            return false;
        } finally {
            div = null;
        }
    }, assertTagNameNoComments = assert(function(div) {
        div.appendChild(document.createComment(""));
        return !div.getElementsByTagName("*").length;
    }), assertHrefNotNormalized = assert(function(div) {
        div.innerHTML = "<a href='#'></a>";
        return div.firstChild && typeof div.firstChild.getAttribute !== strundefined && div.firstChild.getAttribute("href") === "#";
    }), assertAttributes = assert(function(div) {
        div.innerHTML = "<select></select>";
        var type = typeof div.lastChild.getAttribute("multiple");
        return type !== "boolean" && type !== "string";
    }), assertUsableClassName = assert(function(div) {
        div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
        if (!div.getElementsByClassName || !div.getElementsByClassName("e").length) {
            return false;
        }
        div.lastChild.className = "e";
        return div.getElementsByClassName("e").length === 2;
    }), assertUsableName = assert(function(div) {
        div.id = expando + 0;
        div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
        docElem.insertBefore(div, docElem.firstChild);
        var pass = document.getElementsByName && document.getElementsByName(expando).length === 2 + document.getElementsByName(expando + 0).length;
        assertGetIdNotName = !document.getElementById(expando);
        docElem.removeChild(div);
        return pass;
    });
    try {
        slice.call(docElem.childNodes, 0)[0].nodeType;
    } catch (e) {
        slice = function(i) {
            var elem, results = [];
            for (;
            (elem = this[i]); i++) {
                results.push(elem);
            }
            return results;
        };
    }

    function Sizzle(selector, context, results, seed) {
        results = results || [];
        context = context || document;
        var match, elem, xml, m, nodeType = context.nodeType;
        if (!selector || typeof selector !== "string") {
            return results;
        }
        if (nodeType !== 1 && nodeType !== 9) {
            return [];
        }
        xml = isXML(context);
        if (!xml && !seed) {
            if ((match = rquickExpr.exec(selector))) {
                if ((m = match[1])) {
                    if (nodeType === 9) {
                        elem = context.getElementById(m);
                        if (elem && elem.parentNode) {
                            if (elem.id === m) {
                                results.push(elem);
                                return results;
                            }
                        } else {
                            return results;
                        }
                    } else {
                        if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                            results.push(elem);
                            return results;
                        }
                    }
                } else if (match[2]) {
                    push.apply(results, slice.call(context.getElementsByTagName(selector), 0));
                    return results;
                } else if ((m = match[3]) && assertUsableClassName && context.getElementsByClassName) {
                    push.apply(results, slice.call(context.getElementsByClassName(m), 0));
                    return results;
                }
            }
        }
        return select(selector.replace(rtrim, "$1"), context, results, seed, xml);
    }
    Sizzle.matches = function(expr, elements) {
        return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function(elem, expr) {
        return Sizzle(expr, null, null, [elem]).length > 0;
    };

    function createInputPseudo(type) {
        return function(elem) {
            var name = elem.nodeName.toLowerCase();
            return name === "input" && elem.type === type;
        };
    }

    function createButtonPseudo(type) {
        return function(elem) {
            var name = elem.nodeName.toLowerCase();
            return (name === "input" || name === "button") && elem.type === type;
        };
    }

    function createPositionalPseudo(fn) {
        return markFunction(function(argument) {
            argument = +argument;
            return markFunction(function(seed, matches) {
                var j, matchIndexes = fn([], seed.length, argument),
                    i = matchIndexes.length;
                while (i--) {
                    if (seed[(j = matchIndexes[i])]) {
                        seed[j] = !(matches[j] = seed[j]);
                    }
                }
            });
        });
    }
    getText = Sizzle.getText = function(elem) {
        var node, ret = "",
            i = 0,
            nodeType = elem.nodeType;
        if (!nodeType) {
            for (;
            (node = elem[i]); i++) {
                ret += getText(node);
            }
        } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
            if (typeof elem.textContent === "string") {
                return elem.textContent;
            } else {
                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                    ret += getText(elem);
                }
            }
        } else if (nodeType === 3 || nodeType === 4) {
            return elem.nodeValue;
        }
        return ret;
    };
    isXML = Sizzle.isXML = function(elem) {
        var documentElement = elem && (elem.ownerDocument || elem).documentElement;
        return documentElement ? documentElement.nodeName !== "HTML" : false;
    };
    contains = Sizzle.contains = docElem.contains ?
    function(a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
        return a === bup || !! (bup && bup.nodeType === 1 && adown.contains && adown.contains(bup));
    } : docElem.compareDocumentPosition ?
    function(a, b) {
        return b && !! (a.compareDocumentPosition(b) & 16);
    } : function(a, b) {
        if (b) {
            while ((b = b.parentNode)) {
                if (b === a) {
                    return true;
                }
            }
        }
        return false;
    };
    Sizzle.attr = function(elem, name) {
        var val, xml = isXML(elem);
        if (!xml) {
            name = name.toLowerCase();
        }
        if ((val = Expr.attrHandle[name])) {
            return val(elem);
        }
        if (xml || assertAttributes) {
            return elem.getAttribute(name);
        }
        return ((val = elem.getAttributeNode(name)) || elem.getAttribute(name)) && elem[name] === true ? name : val && val.specified ? val.value : null;
    };
    Expr = Sizzle.selectors = {
        cacheLength: 50,
        createPseudo: markFunction,
        match: matchExpr,
        attrHandle: assertHrefNotNormalized ? {} : {
            "href": function(elem) {
                return elem.getAttribute("href", 2);
            },
            "type": function(elem) {
                return elem.getAttribute("type");
            }
        },
        find: {
            "ID": assertGetIdNotName ?
            function(id, context, xml) {
                if (typeof context.getElementById !== strundefined && !xml) {
                    var m = context.getElementById(id);
                    return m && m.parentNode ? [m] : [];
                }
            } : function(id, context, xml) {
                if (typeof context.getElementById !== strundefined && !xml) {
                    var m = context.getElementById(id);
                    return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ? [m] : undefined : [];
                }
            },
            "TAG": assertTagNameNoComments ?
            function(tag, context) {
                if (typeof context.getElementsByTagName !== strundefined) {
                    return context.getElementsByTagName(tag);
                }
            } : function(tag, context) {
                var elem, tmp = [],
                    i = 0,
                    results = context.getElementsByTagName(tag);
                if (tag === "*") {
                    for (;
                    (elem = results[i]); i++) {
                        if (elem.nodeType === 1) {
                            tmp.push(elem);
                        }
                    }
                    return tmp;
                }
                return results;
            },
            "NAME": assertUsableName &&
            function(tag, context) {
                if (typeof context.getElementsByName !== strundefined) {
                    return context.getElementsByName(name);
                }
            },
            "CLASS": assertUsableClassName &&
            function(className, context, xml) {
                if (typeof context.getElementsByClassName !== strundefined && !xml) {
                    return context.getElementsByClassName(className);
                }
            }
        },
        relative: {
            ">": {
                dir: "parentNode",
                first: true
            },
            " ": {
                dir: "parentNode"
            },
            "+": {
                dir: "previousSibling",
                first: true
            },
            "~": {
                dir: "previousSibling"
            }
        },
        preFilter: {
            "ATTR": function(match) {
                match[1] = match[1].replace(rbackslash, "");
                match[3] = (match[4] || match[5] || "").replace(rbackslash, "");
                if (match[2] === "~=") {
                    match[3] = " " + match[3] + " ";
                }
                return match.slice(0, 4);
            },
            "CHILD": function(match) {
                match[1] = match[1].toLowerCase();
                if (match[1] === "nth") {
                    if (!match[2]) {
                        Sizzle.error(match[0]);
                    }
                    match[3] = +(match[3] ? match[4] + (match[5] || 1) : 2 * (match[2] === "even" || match[2] === "odd"));
                    match[4] = +((match[6] + match[7]) || match[2] === "odd");
                } else if (match[2]) {
                    Sizzle.error(match[0]);
                }
                return match;
            },
            "PSEUDO": function(match) {
                var unquoted, excess;
                if (matchExpr["CHILD"].test(match[0])) {
                    return null;
                }
                if (match[3]) {
                    match[2] = match[3];
                } else if ((unquoted = match[4])) {
                    if (rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                        unquoted = unquoted.slice(0, excess);
                        match[0] = match[0].slice(0, excess);
                    }
                    match[2] = unquoted;
                }
                return match.slice(0, 3);
            }
        },
        filter: {
            "ID": assertGetIdNotName ?
            function(id) {
                var attrId = id.replace(rbackslash, "");
                return function(elem) {
                    return elem.getAttribute("id") === attrId;
                };
            } : function(id) {
                var attrId = id.replace(rbackslash, "");
                return function(elem) {
                    var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                    return node && node.value === attrId;
                };
            },
            "TAG": function(nodeName) {
                if (nodeName === "*") {
                    return function() {
                        return true;
                    };
                }
                nodeName = nodeName.replace(rbackslash, "").toLowerCase();
                return function(elem) {
                    return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                };
            },
            "CLASS": function(className) {
                var pattern = classCache[expando][className + " "];
                return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                    return pattern.test(elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "");
                });
            },
            "ATTR": function(name, operator, check) {
                return function(elem) {
                    var result = Sizzle.attr(elem, name);
                    if (result == null) {
                        return operator === "!=";
                    }
                    if (!operator) {
                        return true;
                    }
                    result += "";
                    return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.substr(result.length - check.length) === check : operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.substr(0, check.length + 1) === check + "-" : false;
                };
            },
            "CHILD": function(type, argument, first, last) {
                var doneName = done++;
                if (type === "nth") {
                    return last === 0 && first === 1 ?
                    function(elem) {
                        return !!elem.parentNode;
                    } : function(elem) {
                        var start, cache, outerCache, idx, node, diff, childkey = dirruns + " " + doneName,
                            parent = elem.parentNode;
                        if (parent) {
                            start = [parent.firstChild];
                            outerCache = parent[expando] || (parent[expando] = {});
                            cache = outerCache[type] || [];
                            idx = cache[1];
                            diff = cache[2];
                            node = idx && parent.childNodes[idx];
                            for (;
                            (node = ++idx && node && node.nextSibling || (diff = idx = 0) || start.pop());) {
                                if (node.nodeType === 1 && ++diff && elem === node) {
                                    outerCache[type] = [childkey, idx, diff];
                                    break;
                                }
                            }
                            diff -= last;
                            return diff === first || (diff % first === 0 && diff / first >= 0);
                        }
                    };
                }
                return function(elem) {
                    var node = elem;
                    if (type === "only" || type === "first") {
                        while ((node = node.previousSibling)) {
                            if (node.nodeType === 1) {
                                return false;
                            }
                        }
                    }
                    node = elem;
                    if (type === "only" || type === "last") {
                        while ((node = node.nextSibling)) {
                            if (node.nodeType === 1) {
                                return false;
                            }
                        }
                    }
                    return true;
                };
            },
            "PSEUDO": function(pseudo, argument) {
                var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                if (fn[expando]) {
                    return fn(argument);
                }
                if (fn.length > 1) {
                    args = [pseudo, pseudo, "", argument];
                    return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        var idx, matched = fn(seed, argument),
                            i = matched.length;
                        while (i--) {
                            idx = indexOf.call(seed, matched[i]);
                            seed[idx] = !(matches[idx] = matched[i]);
                        }
                    }) : function(elem) {
                        return fn(elem, 0, args);
                    };
                }
                return fn;
            }
        },
        pseudos: {
            "not": markFunction(function(selector) {
                var input = [],
                    results = [],
                    matcher = compile(selector.replace(rtrim, "$1"));
                return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                    var elem, unmatched = matcher(seed, null, xml, []),
                        i = seed.length;
                    while (i--) {
                        if ((elem = unmatched[i])) {
                            seed[i] = !(matches[i] = elem);
                        }
                    }
                }) : function(elem, context, xml) {
                    input[0] = elem;
                    matcher(input, null, xml, results);
                    return !results.pop();
                };
            }),
            "has": markFunction(function(selector) {
                return function(elem) {
                    return Sizzle(selector, elem).length > 0;
                };
            }),
            "contains": markFunction(function(text) {
                return function(elem) {
                    return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                };
            }),
            "enabled": function(elem) {
                return elem.disabled === false;
            },
            "disabled": function(elem) {
                return elem.disabled === true;
            },
            "checked": function(elem) {
                var nodeName = elem.nodeName.toLowerCase();
                return (nodeName === "input" && !! elem.checked) || (nodeName === "option" && !! elem.selected);
            },
            "selected": function(elem) {
                if (elem.parentNode) {
                    elem.parentNode.selectedIndex;
                }
                return elem.selected === true;
            },
            "parent": function(elem) {
                return !Expr.pseudos["empty"](elem);
            },
            "empty": function(elem) {
                var node;
                for (node = elem.firstChild; node; node = node.nextSibling) {
                    if (node.nodeName > "@" || node.nodeType === 3 || node.nodeType === 4) {
                        return false;
                    }
                }
                return true;
            },
            "header": function(elem) {
                return rheader.test(elem.nodeName);
            },
            "text": function(elem) {
                var attr;
                return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type);
            },
            "radio": createInputPseudo("radio"),
            "checkbox": createInputPseudo("checkbox"),
            "file": createInputPseudo("file"),
            "password": createInputPseudo("password"),
            "image": createInputPseudo("image"),
            "submit": createButtonPseudo("submit"),
            "reset": createButtonPseudo("reset"),
            "button": function(elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === "button" || name === "button";
            },
            "input": function(elem) {
                return rinputs.test(elem.nodeName);
            },
            "focus": function(elem) {
                var doc = elem.ownerDocument;
                return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !! (elem.type || elem.href || ~elem.tabIndex);
            },
            "active": function(elem) {
                return elem === elem.ownerDocument.activeElement;
            },
            "first": createPositionalPseudo(function() {
                return [0];
            }),
            "last": createPositionalPseudo(function(matchIndexes, length) {
                return [length - 1];
            }),
            "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
                return [argument < 0 ? argument + length : argument];
            }),
            "even": createPositionalPseudo(function(matchIndexes, length) {
                var i = 0;
                for (; i < length; i += 2) {
                    matchIndexes.push(i);
                }
                return matchIndexes;
            }),
            "odd": createPositionalPseudo(function(matchIndexes, length) {
                var i = 1;
                for (; i < length; i += 2) {
                    matchIndexes.push(i);
                }
                return matchIndexes;
            }),
            "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
                var i = argument < 0 ? argument + length : argument;
                for (; --i >= 0;) {
                    matchIndexes.push(i);
                }
                return matchIndexes;
            }),
            "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
                var i = argument < 0 ? argument + length : argument;
                for (; ++i < length;) {
                    matchIndexes.push(i);
                }
                return matchIndexes;
            })
        }
    };

    function siblingCheck(a, b) {
        var cur = a && b && a.nextSibling;
        for (; cur; cur = cur.nextSibling) {
            if (cur === b) {
                return -1;
            }
        }
        return a ? 1 : -1;
    }
    sortOrder = docElem.compareDocumentPosition ?
    function(a, b) {
        var compare;
        if (a === b) {
            hasDuplicate = true;
            return 0;
        }
        if ((compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b))) {
            if (compare & 1 || a.parentNode && a.parentNode.nodeType === 11) {
                if (a === document || contains(document, a)) {
                    return -1;
                }
                if (b === document || contains(document, b)) {
                    return 1;
                }
                return 0;
            }
            return compare & 4 ? -1 : 1;
        }
        return a.compareDocumentPosition ? -1 : 1;
    } : function(a, b) {
        var cur, i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [a],
            bp = [b];
        if (a === b) {
            hasDuplicate = true;
            return 0;
        } else if (a.sourceIndex && b.sourceIndex) {
            return (~b.sourceIndex || MAX_NEGATIVE) - (contains(document, a) && ~a.sourceIndex || MAX_NEGATIVE);
        } else if (!aup || !bup) {
            return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : 0;
        } else if (aup === bup) {
            return siblingCheck(a, b);
        }
        cur = a;
        while ((cur = cur.parentNode)) {
            ap.unshift(cur);
        }
        cur = b;
        while ((cur = cur.parentNode)) {
            bp.unshift(cur);
        }
        while (ap[i] === bp[i]) {
            i++;
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === document ? -1 : bp[i] === document ? 1 : 0;
    };
    [0, 0].sort(sortOrder);
    baseHasDuplicate = !hasDuplicate;
    Sizzle.uniqueSort = function(results) {
        var elem, duplicates = [],
            i = 1,
            j = 0;
        hasDuplicate = baseHasDuplicate;
        results.sort(sortOrder);
        if (hasDuplicate) {
            for (;
            (elem = results[i]); i++) {
                if (elem === results[i - 1]) {
                    j = duplicates.push(i);
                }
            }
            while (j--) {
                results.splice(duplicates[j], 1);
            }
        }
        return results;
    };
    Sizzle.error = function(msg) {
        throw new Error("Syntax error, unrecognized expression: " + msg);
    };

    function tokenize(selector, parseOnly) {
        var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[expando][selector + " "];
        if (cached) {
            return parseOnly ? 0 : cached.slice(0);
        }
        soFar = selector;
        groups = [];
        preFilters = Expr.preFilter;
        while (soFar) {
            if (!matched || (match = rcomma.exec(soFar))) {
                if (match) {
                    soFar = soFar.slice(match[0].length) || soFar;
                }
                groups.push(tokens = []);
            }
            matched = false;
            if ((match = rcombinators.exec(soFar))) {
                tokens.push(matched = new Token(match.shift()));
                soFar = soFar.slice(matched.length);
                matched.type = match[0].replace(rtrim, " ");
            }
            for (type in Expr.filter) {
                if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                    tokens.push(matched = new Token(match.shift()));
                    soFar = soFar.slice(matched.length);
                    matched.type = type;
                    matched.matches = match;
                }
            }
            if (!matched) {
                break;
            }
        }
        return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    }

    function addCombinator(matcher, combinator, base) {
        var dir = combinator.dir,
            checkNonElements = base && combinator.dir === "parentNode",
            doneName = done++;
        return combinator.first ?
        function(elem, context, xml) {
            while ((elem = elem[dir])) {
                if (elem.nodeType === 1 || checkNonElements) {
                    return matcher(elem, context, xml);
                }
            }
        } : function(elem, context, xml) {
            var data, cache, outerCache, dirkey = dirruns + " " + doneName;
            if (xml) {
                while ((elem = elem[dir])) {
                    if (elem.nodeType === 1 || checkNonElements) {
                        if (matcher(elem, context, xml)) {
                            return true;
                        }
                    }
                }
            } else {
                while ((elem = elem[dir])) {
                    if (elem.nodeType === 1 || checkNonElements) {
                        outerCache = elem[expando] || (elem[expando] = {});
                        if ((cache = outerCache[dir]) && cache[0] === dirkey) {
                            if ((data = cache[1]) === true || data === cachedruns) {
                                return data === true;
                            }
                        } else {
                            cache = outerCache[dir] = [dirkey];
                            cache[1] = matcher(elem, context, xml) || cachedruns;
                            if (cache[1] === true) {
                                return true;
                            }
                        }
                    }
                }
            }
        };
    }

    function elementMatcher(matchers) {
        return matchers.length > 1 ?
        function(elem, context, xml) {
            var i = matchers.length;
            while (i--) {
                if (!matchers[i](elem, context, xml)) {
                    return false;
                }
            }
            return true;
        } : matchers[0];
    }

    function condense(unmatched, map, filter, context, xml) {
        var elem, newUnmatched = [],
            i = 0,
            len = unmatched.length,
            mapped = map != null;
        for (; i < len; i++) {
            if ((elem = unmatched[i])) {
                if (!filter || filter(elem, context, xml)) {
                    newUnmatched.push(elem);
                    if (mapped) {
                        map.push(i);
                    }
                }
            }
        }
        return newUnmatched;
    }

    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
        if (postFilter && !postFilter[expando]) {
            postFilter = setMatcher(postFilter);
        }
        if (postFinder && !postFinder[expando]) {
            postFinder = setMatcher(postFinder, postSelector);
        }
        return markFunction(function(seed, results, context, xml) {
            var temp, i, elem, preMap = [],
                postMap = [],
                preexisting = results.length,
                elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
                matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
            if (matcher) {
                matcher(matcherIn, matcherOut, context, xml);
            }
            if (postFilter) {
                temp = condense(matcherOut, postMap);
                postFilter(temp, [], context, xml);
                i = temp.length;
                while (i--) {
                    if ((elem = temp[i])) {
                        matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                    }
                }
            }
            if (seed) {
                if (postFinder || preFilter) {
                    if (postFinder) {
                        temp = [];
                        i = matcherOut.length;
                        while (i--) {
                            if ((elem = matcherOut[i])) {
                                temp.push((matcherIn[i] = elem));
                            }
                        }
                        postFinder(null, (matcherOut = []), temp, xml);
                    }
                    i = matcherOut.length;
                    while (i--) {
                        if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                            seed[temp] = !(results[temp] = elem);
                        }
                    }
                }
            } else {
                matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                if (postFinder) {
                    postFinder(null, results, matcherOut, xml);
                } else {
                    push.apply(results, matcherOut);
                }
            }
        });
    }

    function matcherFromTokens(tokens) {
        var checkContext, matcher, j, len = tokens.length,
            leadingRelative = Expr.relative[tokens[0].type],
            implicitRelative = leadingRelative || Expr.relative[" "],
            i = leadingRelative ? 1 : 0,
            matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, true),
            matchAnyContext = addCombinator(function(elem) {
                return indexOf.call(checkContext, elem) > -1;
            }, implicitRelative, true),
            matchers = [function(elem, context, xml) {
                return (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            }];
        for (; i < len; i++) {
            if ((matcher = Expr.relative[tokens[i].type])) {
                matchers = [addCombinator(elementMatcher(matchers), matcher)];
            } else {
                matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                if (matcher[expando]) {
                    j = ++i;
                    for (; j < len; j++) {
                        if (Expr.relative[tokens[j].type]) {
                            break;
                        }
                    }
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && tokens.slice(0, i - 1).join("").replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && tokens.join(""));
                }
                matchers.push(matcher);
            }
        }
        return elementMatcher(matchers);
    }

    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
        var matcherCachedRuns = 0,
            bySet = setMatchers.length > 0,
            byElement = elementMatchers.length > 0,
            superMatcher = function(seed, context, xml, results, expandContext) {
                var elem, j, matcher, setMatched = [],
                    matchedCount = 0,
                    i = "0",
                    unmatched = seed && [],
                    outermost = expandContext != null,
                    contextBackup = outermostContext,
                    elems = seed || byElement && Expr.find["TAG"]("*", expandContext && context.parentNode || context),
                    dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);
                if (outermost) {
                    outermostContext = context !== document && context;
                    cachedruns = matcherCachedRuns;
                }
                for (;
                (elem = elems[i]) != null; i++) {
                    if (byElement && elem) {
                        for (j = 0;
                        (matcher = elementMatchers[j]); j++) {
                            if (matcher(elem, context, xml)) {
                                results.push(elem);
                                break;
                            }
                        }
                        if (outermost) {
                            dirruns = dirrunsUnique;
                            cachedruns = ++matcherCachedRuns;
                        }
                    }
                    if (bySet) {
                        if ((elem = !matcher && elem)) {
                            matchedCount--;
                        }
                        if (seed) {
                            unmatched.push(elem);
                        }
                    }
                }
                matchedCount += i;
                if (bySet && i !== matchedCount) {
                    for (j = 0;
                    (matcher = setMatchers[j]); j++) {
                        matcher(unmatched, setMatched, context, xml);
                    }
                    if (seed) {
                        if (matchedCount > 0) {
                            while (i--) {
                                if (!(unmatched[i] || setMatched[i])) {
                                    setMatched[i] = pop.call(results);
                                }
                            }
                        }
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched);
                    if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                        Sizzle.uniqueSort(results);
                    }
                }
                if (outermost) {
                    dirruns = dirrunsUnique;
                    outermostContext = contextBackup;
                }
                return unmatched;
            };
        return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function(selector, group) {
        var i, setMatchers = [],
            elementMatchers = [],
            cached = compilerCache[expando][selector + " "];
        if (!cached) {
            if (!group) {
                group = tokenize(selector);
            }
            i = group.length;
            while (i--) {
                cached = matcherFromTokens(group[i]);
                if (cached[expando]) {
                    setMatchers.push(cached);
                } else {
                    elementMatchers.push(cached);
                }
            }
            cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
        }
        return cached;
    };

    function multipleContexts(selector, contexts, results) {
        var i = 0,
            len = contexts.length;
        for (; i < len; i++) {
            Sizzle(selector, contexts[i], results);
        }
        return results;
    }

    function select(selector, context, results, seed, xml) {
        var i, tokens, token, type, find, match = tokenize(selector);
        if (!seed) {
            if (match.length === 1) {
                tokens = match[0] = match[0].slice(0);
                if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && !xml && Expr.relative[tokens[1].type]) {
                    context = Expr.find["ID"](token.matches[0].replace(rbackslash, ""), context, xml)[0];
                    if (!context) {
                        return results;
                    }
                    selector = selector.slice(tokens.shift().length);
                }
                for (i = matchExpr["needsContext"].test(selector) ? -1 : tokens.length - 1; i >= 0; i--) {
                    token = tokens[i];
                    if (Expr.relative[(type = token.type)]) {
                        break;
                    }
                    if ((find = Expr.find[type])) {
                        if ((seed = find(token.matches[0].replace(rbackslash, ""), rsibling.test(tokens[0].type) && context.parentNode || context, xml))) {
                            tokens.splice(i, 1);
                            selector = seed.length && tokens.join("");
                            if (!selector) {
                                push.apply(results, slice.call(seed, 0));
                                return results;
                            }
                            break;
                        }
                    }
                }
            }
        }
        compile(selector, match)(seed, context, xml, results, rsibling.test(selector));
        return results;
    }
    if (document.querySelectorAll) {
        (function() {
            var disconnectedMatch, oldSelect = select,
                rescape = /'|\\/g,
                rattributeQuotes = /\=[ \t\r\n\f]*([^'"\]]*)[ \t\r\n\f]*\]/g,
                rbuggyQSA = [":focus"],
                rbuggyMatches = [":active"],
                matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector;
            assert(function(div) {
                div.innerHTML = "<select><option selected=''></option></select>";
                if (!div.querySelectorAll("[selected]").length) {
                    rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
                }
                if (!div.querySelectorAll(":checked").length) {
                    rbuggyQSA.push(":checked");
                }
            });
            assert(function(div) {
                div.innerHTML = "<p test=''></p>";
                if (div.querySelectorAll("[test^='']").length) {
                    rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')");
                }
                div.innerHTML = "<input type='hidden'/>";
                if (!div.querySelectorAll(":enabled").length) {
                    rbuggyQSA.push(":enabled", ":disabled");
                }
                div.querySelectorAll("*,:x");
                rbuggyQSA.push(",.*:");
            });
            rbuggyQSA = new RegExp(rbuggyQSA.join("|"));
            select = function(selector, context, results, seed, xml) {
                if (!seed && !xml && !rbuggyQSA.test(selector)) {
                    var groups, i, old = true,
                        nid = expando,
                        newContext = context,
                        newSelector = context.nodeType === 9 && selector;
                    if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                        groups = tokenize(selector);
                        if ((old = context.getAttribute("id"))) {
                            nid = old.replace(rescape, "\\$&");
                        } else {
                            context.setAttribute("id", nid);
                        }
                        nid = "[id='" + nid + "'] ";
                        i = groups.length;
                        while (i--) {
                            groups[i] = nid + groups[i].join("");
                        }
                        newContext = rsibling.test(selector) && context.parentNode || context;
                        newSelector = groups.join(",");
                    }
                    if (newSelector) {
                        try {
                            push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0));
                            return results;
                        } catch (qsaError) {} finally {
                            if (!old) {
                                context.removeAttribute("id");
                            }
                        }
                    }
                }
                return oldSelect(selector, context, results, seed, xml);
            };
            if (matches) {
                assert(function(div) {
                    disconnectedMatch = matches.call(div, "div");
                    matches.call(div, "[test!='']:x");
                    rbuggyMatches.push("!=", pseudos);
                });
                rbuggyMatches = new RegExp(rbuggyMatches.join("|"));
                Sizzle.matchesSelector = function(elem, expr) {
                    expr = expr.replace(rattributeQuotes, "='$1']");
                    if (!isXML(elem) && !rbuggyMatches.test(expr) && !rbuggyQSA.test(expr)) {
                        try {
                            var ret = matches.call(elem, expr);
                            if (ret || disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                                return ret;
                            }
                        } catch (e) {}
                    }
                    return Sizzle(expr, null, null, [elem]).length > 0;
                };
            }
        })();
    }
    Sizzle.expando = expando;
    Expr.pseudos["nth"] = Expr.pseudos["eq"];

    function setFilters() {}
    Expr.filters = setFilters.prototype = Expr.pseudos;
    Expr.setFilters = new setFilters();
    var makeArray = function(array, results) {
            array = Array.prototype.slice.call(array, 0);
            if (results) {
                results.push.apply(results, array);
                return results;
            }
            return array;
        };
    try {
        Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType;
    } catch (e) {
        makeArray = function(array, results) {
            var i = 0,
                ret = results || [];
            if (toString.call(array) === "[object Array]") {
                Array.prototype.push.apply(ret, array);
            } else {
                if (typeof array.length === "number") {
                    for (var l = array.length; i < l; i++) {
                        ret.push(array[i]);
                    }
                } else {
                    for (; array[i]; i++) {
                        ret.push(array[i]);
                    }
                }
            }
            return ret;
        };
    }
    if (typeof define === "function" && define.amd) {
        define(function() {
            return Sizzle;
        });
    } else {
        window.Sizzle = Sizzle;
    }
    QZFL.selector = window.Sizzle = Sizzle;
    QZFL.object.makeArray = QZFL.dom.collection2Array = makeArray;
    QZFL.dom.uniqueSort = Sizzle.uniqueSort;
    QZFL.dom.contains = Sizzle.contains;
})(window);;
(function() {
    var _handler = QZFL.ElementHandler = function(selector, context) {
            this.elements = null;
            this._isElementHandler = true;
            this._init(selector, context);
        };
    _handler.prototype = {
        _init: function(selector, context) {
            if (QZFL.lang.isString(selector)) {
                this.elements = QZFL.selector(selector, context);
            } else if (selector instanceof QZFL.ElementHandler) {
                this.elements = selector.elements.slice();
            } else if (QZFL.lang.isArray(selector)) {
                this.elements = selector;
            } else if (selector && ((selector.nodeType && selector.nodeType !== 3 && selector.nodeType !== 8) || selector.setTimeout)) {
                this.elements = [selector];
            } else {
                this.elements = [];
            }
        },
        findElements: function(selector) {
            var _pushstack = [],
                _s;
            this.each(function(el) {
                _s = QZFL.selector(selector, el);
                if (_s.length > 0) {
                    _pushstack = _pushstack.concat(_s);
                }
            });
            return _pushstack;
        },
        find: function(selector) {
            return _el.get(this.findElements(selector));
        },
        filter: function(expr, elems, not) {
            if (not) {
                expr = ":not(" + expr + ")";
            }
            return _el.get(QZFL.selector.matches(expr, elems || this.elements));
        },
        each: function(fn) {
            QZFL.object.each(this.elements, fn);
            return this;
        },
        concat: function(elements) {
            return _el.get(this.elements.concat( !! elements._isElementHandler ? elements.elements : elements));
        },
        get: function(index) {
            return _el.get(this.elements[index]);
        },
        eq: function(index) {
            return this.elements[index || 0];
        },
        slice: function() {
            return _el.get(Array.prototype.slice.apply(this.elements, arguments));
        }
    };
    var _el = QZFL.element = {
        get: function(selector, context) {
            return new _handler(selector, context);
        },
        extend: function(object) {
            QZFL.object.extend(_handler, object);
        },
        extendFn: function(object) {
            QZFL.object.extend(_handler.prototype, object);
        },
        getVersion: function() {
            return _handler.version;
        }
    }
})();
QZFL.element.extend({
    version: "1.0"
});
QZFL.element.extendFn({
    bind: function(evtType, fn, argArr) {
        if (typeof(fn) != 'function') {
            return false;
        }
        return this.each(function(el) {
            QZFL.event.addEvent(el, evtType, fn, argArr);
        });
    },
    unBind: function(evtType, fn) {
        return this.each(function(el) {
            QZFL.event[fn ? 'removeEvent' : 'purgeEvent'](el, evtType, fn);
        });
    },
    onHover: function(fnOver, fnOut) {
        this.onMouseOver(fnOver);
        return this.onMouseOut(fnOut);
    },
    onMouseEnter: function(fn) {
        return this.bind('mouseover', function(evt) {
            var rel = QZFL.event.getRelatedTarget(evt);
            if (QZFL.lang.isFunction(fn) && !QZFL.dom.isAncestor(this, rel)) {
                fn.call(this, evt);
            }
        });
    },
    onMouseLeave: function(fn) {
        return this.bind('mouseout', function(evt) {
            var rel = QZFL.event.getRelatedTarget(evt);
            if (QZFL.lang.isFunction(fn) && !QZFL.dom.isAncestor(this, rel)) {
                fn.call(this, evt);
            }
        });
    },
    delegate: function(selector, eventType, fn, argsArray) {
        if (typeof(fn) != 'function') {
            return false;
        }
        return this.each(function(el) {
            QZFL.event.delegate(el, selector, eventType, fn, argsArray);
        });
    },
    undelegate: function(selector, eventType, fn) {
        return this.each(function(el) {
            QZFL.event.undelegate(el, selector, eventType, fn);
        });
    }
});
QZFL.object.each(['onClick', 'onMouseDown', 'onMouseUp', 'onMouseOver', 'onMouseMove', 'onMouseOut', 'onFocus', 'onBlur', 'onKeyDown', 'onKeyPress', 'onKeyUp'], function(name, index) {
    QZFL.ElementHandler.prototype[name] = function(fn) {
        return this.bind(name.slice(2).toLowerCase(), fn);
    };
});
QZFL.element.extendFn({
    setHtml: function(value) {
        return this.setAttr("innerHTML", value);
    },
    getHtml: function(index) {
        var _e = this.elements[index || 0];
        return !!_e ? _e.innerHTML : null;
    },
    setVal: function(value) {
        if (QZFL.object.getType(value) == "array") {
            var _v = "\x00" + value.join("\x00") + "\x00";
            this.each(function(el) {
                if (/radio|checkbox/.test(el.type)) {
                    el.checked = el.nodeType && ("\x00" + _v.indexOf(el.value.toString() + "\x00") > -1 || _v.indexOf("\x00" + el.name.toString() + "\x00") > -1);
                } else if (el.tagName == "SELECT") {
                    QZFL.object.each(el.options, function(e) {
                        e.selected = e.nodeType == 1 && ("\x00" + _v.indexOf(e.value.toString() + "\x00") > -1 || _v.indexOf("\x00" + e.text.toString() + "\x00") > -1);
                    });
                } else {
                    el.value = value;
                }
            })
        } else {
            this.setAttr("value", value);
        }
        return this;
    },
    getVal: function(index) {
        var _e = this.elements[index || 0],
            _v;
        if (_e) {
            if (_e.tagName == "SELECT") {
                _v = [];
                if (_e.selectedIndex < 0) {
                    return null;
                }
                if (_e.type == "select-one") {
                    _v.push(_e.value);
                } else {
                    QZFL.object.each(_e.options, function(e) {
                        if (e.nodeType == 1 && e.selected) {
                            _v.push(e.value);
                        }
                    });
                }
            } else {
                _v = _e.value;
            }
        } else {
            return null
        }
        return _v;
    },
    hasClass: function(className) {
        if (this.elements && this.elements.length) {
            return QZFL.css.hasClassName(this.elements[0], className);
        }
        return false;
    },
    addClass: function(className) {
        return this.each(function(el) {
            QZFL.css.addClassName(el, className);
        })
    },
    removeClass: function(className) {
        return this.each(function(el) {
            QZFL.css.removeClassName(el, className);
        })
    },
    toggleClass: function(className) {
        return this.each(function(el) {
            QZFL.css.toggleClassName(el, className);
        })
    },
    getSize: function(index) {
        var _e = this.elements[index || 0];
        return !!_e ? QZFL.dom.getSize(_e) : null;
    },
    getXY: function(index) {
        var _e = this.elements[index || 0];
        return !!_e ? QZFL.dom.getXY(_e) : null;
    },
    setSize: function(width, height) {
        return this.each(function(el) {
            QZFL.dom.setSize(el, width, height);
        })
    },
    setXY: function(X, Y) {
        return this.each(function(el) {
            QZFL.dom.setXY(el, X, Y);
        })
    },
    hide: function() {
        return this.each(function(el) {
            QZFL.dom.setStyle(el, "display", "none");
        })
    },
    show: function(isBlock) {
        return this.each(function(el) {
            QZFL.dom.setStyle(el, "display", isBlock ? 'block' : '');
        })
    },
    getStyle: function(key, index) {
        var _e = this.elements[index || 0];
        return !!_e ? QZFL.dom.getStyle(_e, key) : null;
    },
    setStyle: function(key, value) {
        return this.each(function(el) {
            QZFL.dom.setStyle(el, key, value);
        })
    },
    setAttr: function(key, value) {
        key = (key == "class" ? "className" : key);
        return this.each(function(el) {
            el[key] = value;
        });
    },
    getAttr: function(key, index) {
        key = key == "class" ? "className" : key;
        var node = this.elements[index || 0];
        return node ? (node[key] === undefined ? node.getAttribute(key) : node[key]) : null;
    }
});
QZFL.element.extendFn({
    getPrev: function() {
        var _arr = [];
        this.each(function(el) {
            var _e = QZFL.dom.getPreviousSibling(el);
            _arr.push(_e);
        });
        return QZFL.element.get(_arr);
    },
    getNext: function() {
        var _arr = [];
        this.each(function(el) {
            var _e = QZFL.dom.getNextSibling(el);
            _arr.push(_e);
        });
        return QZFL.element.get(_arr);
    },
    getChildren: function() {
        var _arr = [];
        this.each(function(el) {
            var node = QZFL.dom.getFirstChild(el);
            while (node) {
                if ( !! node && node.nodeType == 1) {
                    _arr.push(node);
                }
                node = node.nextSibling;
            }
        });
        return QZFL.element.get(_arr);
    },
    getParent: function() {
        var _arr = [];
        this.each(function(el) {
            var _e = el.parentNode;
            _arr.push(_e);
        });
        return QZFL.element.get(_arr);
    }
});
QZFL.element.extendFn({
    create: function(tagName, attributes) {
        var _arr = [];
        this.each(function(el) {
            _arr.push(QZFL.dom.createElementIn(tagName, el, false, attributes));
        });
        return QZFL.element.get(_arr);
    },
    appendTo: function(el) {
        var el = (el.elements && el.elements[0]) || QZFL.dom.get(el);
        return this.each(function(element) {
            el.appendChild(element)
        });
    },
    insertAfter: function(el) {
        var el = (el.elements && el.elements[0]) || QZFL.dom.get(el),
            _ns = el.nextSibling,
            _p = el.parentNode;
        return this.each(function(element) {
            _p[!_ns ? "appendChild" : "insertBefore"](element, _ns);
        });
    },
    insertBefore: function(el) {
        var el = (el.elements && el.elements[0]) || QZFL.dom.get(el),
            _p = el.parentNode;
        return this.each(function(element) {
            _p.insertBefore(element, el)
        });
    },
    remove: function() {
        return this.each(function(el) {
            QZFL.dom.removeElement(el);
        })
    }
});
QZFL.queue = (function() {
    var _o = QZFL.object;
    var _queue = {};
    var _Queue = function(key, queue) {
            if (this instanceof arguments.callee) {
                this._qz_queuekey = key;
                return this;
            }
            if (_o.getType(queue = queue || []) == "array") {
                _queue[key] = queue;
            }
            return new _Queue(key);
        };
    var _extend = {
        push: function(key, fn) {
            fn = this._qz_queuekey ? key : fn;
            _queue[this._qz_queuekey || key].push(fn);
        },
        shift: function(key) {
            var _q = _queue[this._qz_queuekey || key];
            if (_q) {
                return QZFL.queue._exec(_q.shift());
            }
        },
        getLen: function(key) {
            return _queue[this._qz_queuekey || key].length;
        },
        run: function(key) {
            var _q = _queue[this._qz_queuekey || key];
            if (_q) {
                _o.each(_q, QZFL.queue._exec);
            }
        },
        timedChunk: function(key, conf) {
            var _q = _queue[this._qz_queuekey || key],
                _conf;
            if (_q) {
                _conf = QZFL.lang.propertieCopy(conf, QZFL.queue._tcCof, null, true);
                setTimeout(function() {
                    var _start = +new Date();
                    do {
                        QZFL.queue.shift(key);
                    }
                    while (QZFL.queue.getLen(key) > 0 && (+new Date() - _start < _conf.runTime));
                    if (QZFL.queue.getLen(key) > 0) {
                        setTimeout(arguments.callee, _conf.waitTime);
                        _conf.onWait();
                    } else {
                        _conf.onRunEnd();
                    }
                }, 0);
            }
        },
        _tcCof: {
            'runTime': 50,
            'waitTime': 25,
            'onRunEnd': QZFL.emptyFn,
            'onWait': QZFL.emptyFn
        },
        _exec: function(value, key, source) {
            if (!value || _o.getType(value) != "function") {
                if (_o.getType(key) == "number") {
                    source[key] = null;
                }
                return false;
            }
            try {
                return value();
            } catch (e) {
                QZFL.console.print("QZFL Queue Got An Error: [" + e.name + "]  " + e.message, 1)
            }
        }
    };
    _o.extend(_Queue.prototype, _extend);
    _o.extend(_Queue, _extend);
    return _Queue;
})();
QZFL.string = {
    RegExps: {
        trim: /^\s+|\s+$/g,
        ltrim: /^\s+/,
        rtrim: /\s+$/,
        nl2br: /\n/g,
        s2nb: /[ ]{2}/g,
        URIencode: /[   
 !-)+,/:-?[-^`{-~]/g,
        escHTML: {
            re_amp: /&/g,
            re_lt: /</g,
            re_gt: />/g,
            re_apos: /'/g,
            re_quot: /"/g
        },
        escString: {
            bsls: /\\/g,
            sls: /\//g,
            nl: /\n/g,
            rt: /\r/g,
            tab: /\t/g
        },
        restXHTML: {
            re_amp: /&amp;/g,
            re_lt: /&lt;/g,
            re_gt: /&gt;/g,
            re_apos: /&(?:apos|#0?39);/g,
            re_quot: /&quot;/g
        },
        write: /\{(\d{1,2})(?:\:([xodQqb]))?\}/g,
        isURL: /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i,
        cut: /[\x00-\xFF]/,
        getRealLen: {
            r0: /[^\x00-\xFF]/g,
            r1: /[\x00-\xFF]/g
        },
        format: /\{([\d\w\.]+)\}/g
    },
    commonReplace: function(s, p, r) {
        return s.replace(p, r);
    },
    listReplace: function(s, l) {
        if (QZFL.lang.isHashMap(l)) {
            for (var i in l) {
                s = QZFL.string.commonReplace(s, l[i], i);
            }
            return s;
        } else {
            return s + '';
        }
    },
    trim: function(str) {
        return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.trim, '');
    },
    ltrim: function(str) {
        return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.ltrim, '');
    },
    rtrim: function(str) {
        return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.rtrim, '');
    },
    nl2br: function(str) {
        return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.nl2br, '<br />');
    },
    s2nb: function(str) {
        return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.s2nb, '&nbsp;&nbsp;');
    },
    URIencode: function(str) {
        var cc, ccc;
        return (str + "").replace(QZFL.string.RegExps.URIencode, function(a) {
            if (a == " ") {
                return "+";
            } else if (a == "") {
                return "";
            }
            cc = a.charCodeAt(0);
            ccc = cc.toString(16);
            return "%" + ((cc < 16) ? ("0" + ccc) : ccc);
        });
    },
    escHTML: function(str) {
        var t = QZFL.string.RegExps.escHTML;
        return QZFL.string.listReplace((str + ""), {
            '&amp;': t.re_amp,
            '&lt;': t.re_lt,
            '&gt;': t.re_gt,
            '&#039;': t.re_apos,
            '&quot;': t.re_quot
        });
    },
    escString: function(str) {
        var t = QZFL.string.RegExps.escString,
            h = QZFL.string.RegExps.escHTML;
        return QZFL.string.listReplace((str + ""), {
            '\\\\': t.bsls,
            '\\n': t.nl,
            '': t.rt,
            '\\t': t.tab,
            '\\/': t.sls,
            '\\\'': h.re_apos,
            '\\"': h.re_quot
        });
    },
    restXHTML: function(str) {
        var t = QZFL.string.RegExps.restXHTML;
        return QZFL.string.listReplace((str + ""), {
            '<': t.re_lt,
            '>': t.re_gt,
            ''': t.re_apos,
            '"': t.re_quot,
            '&': t.re_amp
        });
    },
    write: function(strFormat, someArgs) {
        if (arguments.length < 1 || !QZFL.lang.isString(strFormat)) {
            return '';
        }
        var rArr = QZFL.lang.arg2arr(arguments),
            result = rArr.shift(),
            tmp;
        return result.replace(QZFL.string.RegExps.write, function(a, b, c) {
            b = parseInt(b, 10);
            if (b < 0 || (typeof rArr[b] == 'undefined')) {
                return '(n/a)';
            } else {
                if (!c) {
                    return rArr[b];
                } else {
                    switch (c) {
                    case 'x':
                        return '0x' + rArr[b].toString(16);
                    case 'o':
                        return 'o' + rArr[b].toString(8);
                    case 'd':
                        return rArr[b].toString(10);
                    case 'Q':
                        return '"' + rArr[b].toString(16) + '"';
                    case 'q':
                        return '`' + rArr[b].toString(16) + ''';
                    case 'b':
                        return '<' + !! rArr[b] + '>';
                    }
                }
            }
        });
    },
    isURL: function(s) {
        return QZFL.string.RegExps.isURL.test(s);
    },
    escapeURI: function(s) {
        if (window.encodeURIComponent) {
            return encodeURIComponent(s);
        }
        if (window.escape) {
            return escape(s);
        }
        return '';
    },
    fillLength: function(source, l, ch, isRight) {
        if ((source = String(source)).length < l) {
            var ar = new Array(l - source.length);
            ar[isRight ? 'unshift' : 'push'](source);
            source = ar.join(ch || '0');
        }
        return source;
    },
    cut: function(str, bitLen, tails) {
        str = String(str);
        bitLen -= 0;
        tails = tails || '';
        if (isNaN(bitLen)) {
            return str;
        }
        var len = str.length,
            i = Math.min(Math.floor(bitLen / 2), len),
            cnt = QZFL.string.getRealLen(str.slice(0, i));
        for (; i < len && cnt < bitLen; i++) {
            cnt += 1 + (str.charCodeAt(i) > 255);
        }
        return str.slice(0, cnt > bitLen ? i - 1 : i) + (i < len ? tails : '');
    },
    getRealLen: function(s, isUTF8) {
        if (typeof(s) != 'string') {
            return 0;
        }
        if (!isUTF8) {
            return s.replace(QZFL.string.RegExps.getRealLen.r0, "**").length;
        } else {
            var cc = s.replace(QZFL.string.RegExps.getRealLen.r1, "");
            return (s.length - cc.length) + (encodeURI(cc).length / 3);
        }
    },
    format: function(str) {
        var args = Array.prototype.slice.call(arguments),
            v;
        str = String(args.shift());
        if (args.length == 1 && typeof(args[0]) == 'object') {
            args = args[0];
        }
        QZFL.string.RegExps.format.lastIndex = 0;
        return str.replace(QZFL.string.RegExps.format, function(m, n) {
            v = QZFL.object.route(args, n);
            return v === undefined ? m : v;
        });
    }
};
QZFL.string.restHTML = QZFL.string.restXHTML;
QZFL.util = {
    buildUri: function(s) {
        return new QZFL.util.URI(s);
    },
    URI: function(s) {
        if (!(QZFL.object.getType(s) == "string")) {
            return null;
        }
        if (s.indexOf("://") < 1) {
            s = location.protocol + "//" + location.host + (s.indexOf("/") == 0 ? "" : location.pathname.substr(0, location.pathname.lastIndexOf("/") + 1)) + s;
        }
        var depart = s.split("://");
        if (QZFL.object.getType(depart) == "array" && depart.length > 1 && (/^[a-zA-Z]+$/).test(depart[0])) {
            this.protocol = depart[0].toLowerCase();
            var h = depart[1].split("/");
            if (QZFL.object.getType(h) == "array") {
                this.host = h[0];
                this.pathname = "/" + h.slice(1).join("/").replace(/(\?|\#).+/i, "");
                this.href = s;
                var se = depart[1].lastIndexOf("?"),
                    ha = depart[1].lastIndexOf("#");
                this.search = (se >= 0) ? depart[1].substring(se) : "";
                this.hash = (ha >= 0) ? depart[1].substring(ha) : "";
                if (this.search.length > 0 && this.hash.length > 0) {
                    if (ha < se) {
                        this.search = "";
                    } else {
                        this.search = depart[1].substring(se, ha);
                    }
                }
                return this;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
};
QZFL.string = QZONE.string || {};
QZFL.string.parseXML = function(text) {
    var doc;
    if (window.ActiveXObject) {
        doc = QZFL.lang.tryThese(function() {
            return new ActiveXObject('MSXML2.DOMDocument.6.0');
        }, function() {
            return new ActiveXObject('MSXML2.DOMDocument.5.0');
        }, function() {
            return new ActiveXObject('MSXML2.DOMDocument.4.0');
        }, function() {
            return new ActiveXObject('MSXML2.DOMDocument.3.0');
        }, function() {
            return new ActiveXObject('MSXML2.DOMDocument');
        }, function() {
            return new ActiveXObject('Microsoft.XMLDOM');
        });
        doc.async = "false";
        doc.loadXML(text);
        if (doc.parseError.reason) {
            return null;
        }
    } else {
        var parser = new DOMParser();
        doc = parser.parseFromString(text, "text/xml");
        if (doc.documentElement.nodeName == 'parsererror') {
            return null;
        }
    }
    return doc.documentElement;
};
QZFL.string.timeFormatString = function(date, ptn, baseTime) {
    try {
        date = date.getTime ? date : (new Date(date));
    } catch (ign) {
        return '';
    }
    var me = QZFL.string.timeFormatString,
        map = me._map,
        unt = me._units,
        rel = false,
        t, delta, v;
    if (!ptn) {
        baseTime = baseTime || new Date();
        delta = Math.abs(date - baseTime);
        for (var i = 0, len = unt.length; i < len; ++i) {
            t = map[unt[i]];
            if (delta > t[1]) {
                return Math.floor(delta / t[1]) + t[2];
            }
        }
        return "刚刚";
    } else {
        return ptn.replace(me._re, function(a, b, c) {
            (rel = b.charAt(0) == '_') && (b = b.charAt(1));
            if (!map[b]) {
                return a;
            }
            if (!rel) {
                v = date[map[b][0]]();
                b == 'y' && (v %= 100);
                b == 'M' && v++;
                return v < 10 ? QZFL.string.fillLength(v, 2, c) : v.toString();
            } else {
                return Math.floor(Math.abs(date - baseTime) / map[b][1]);
            }
        });
    }
};
QZFL.string.timeFormatString._re = /\{([_yYMdhms]{1,2})(?:\:([\d\w\s]))?\}/g;
QZFL.string.timeFormatString._map = {
    y: ['getYear', 31104000000],
    Y: ['getFullYear', 31104000000, '\u5E74\u524D'],
    M: ['getMonth', 2592000000, '\u4E2A\u6708\u524D'],
    d: ['getDate', 86400000, '\u5929\u524D'],
    h: ['getHours', 3600000, '\u5C0F\u65F6\u524D'],
    m: ['getMinutes', 60000, '\u5206\u949F\u524D'],
    s: ['getSeconds', 1000, '\u79D2\u524D']
};
QZFL.string.timeFormatString._units = ['Y', 'M', 'd', 'h', 'm', 's'];
QZFL.string.StringBuilder = function() {
    this._strList = QZFL.lang.arg2arr(arguments);
};
QZFL.string.StringBuilder.prototype = {
    append: function(str) {
        this._strList.push(String(str));
    },
    insertFirst: function(str) {
        this._strList.unshift(String(str));
    },
    appendArray: function(arr) {
        this._strList = this._strList.concat(arr);
    },
    toString: function(spliter) {
        return this._strList.join(spliter || '');
    },
    clear: function() {
        this._strList.splice(0, this._strList.length);
    }
};
QZFL.lang.isValidXMLdom = function(o) {
    return !!(o && o.xml && /^<\?xml/.test(o.xml));
};
QZFL.lang.arg2arr = function(refArgs, start) {
    return Array.prototype.slice.call(refArgs, (start || 0));
};
QZFL.lang.getObjByNameSpace = function(ns, setup) {
    if (typeof(ns) != 'string') {
        return ns;
    }
    var l = ns.split("."),
        r = window;
    try {
        for (var i = 0, len = l.length; i < len; ++i) {
            if (typeof(r[l[i]]) == 'undefined') {
                if (setup) {
                    r[l[i]] = {};
                } else {
                    return;
                }
            }
            r = r[l[i]];
        }
        return r;
    } catch (ignore) {
        return;
    }
};
QZFL.lang.objectClone = function(obj, preventName) {
    if ((typeof obj) == 'object') {
        var res = (QZFL.lang.isArray(obj)) ? [] : {};
        for (var i in obj) {
            if (i != preventName) res[i] = QZFL.lang.objectClone(obj[i], preventName);
        }
        return res;
    } else if ((typeof obj) == 'function') {
        return Object;
    }
    return obj;
};
QZFL.lang.obj2str = function(obj) {
    var t, sw;
    if (typeof(obj) == 'object') {
        if (obj === null) {
            return 'null';
        }
        if (window.JSON && window.JSON.stringify) {
            return JSON.stringify(obj);
        }
        sw = QZFL.lang.isArray(obj);
        t = [];
        for (var i in obj) {
            t.push((sw ? "" : ("\"" + QZFL.string.escString(i) + "\":")) + obj2str(obj[i]));
        }
        t = t.join();
        return sw ? ("[" + t + "]") : ("{" + t + "}");
    } else if (typeof(obj) == 'undefined') {
        return 'undefined';
    } else if (typeof(obj) == 'number' || typeof(obj) == 'function') {
        return obj.toString();
    }
    return !obj ? "\"\"" : ("\"" + QZFL.string.escString(obj) + "\"");
};
QZFL.lang.propertieCopy = function(s, b, propertiSet, notOverWrite) {
    var l = (!propertiSet || typeof(propertiSet) != 'object') ? b : propertiSet;
    s = s || {};
    for (var p in l) {
        if (!notOverWrite || !(p in s)) {
            s[p] = l[p];
        }
    }
    return s;
};
QZFL.lang.tryThese = function() {
    for (var i = 0, len = arguments.length; i < len; ++i) {
        try {
            return arguments[i]();
        } catch (ign) {}
    }
    return;
};
QZFL.lang.chain = function(u, v) {
    var calls = QZFL.lang.arg2arr(arguments);
    return function() {
        for (var i = 0, len = calls.length; i < len; ++i) {
            if (calls[i] && calls[i].apply(null, arguments) === false) {
                return false;
            }
        }
        return true;
    };
};
QZFL.lang.uniqueArray = function(arr) {
    if (!QZFL.lang.isArray(arr)) {
        return arr;
    }
    var flag = {},
        index = 0;
    while (index < arr.length) {
        if (flag[arr[index]] == typeof(arr[index])) {
            arr.splice(index, 1);
            continue;
        }
        flag[arr[index].toString()] = typeof(arr[index]);
        ++index;
    }
    return arr;
};
QZFL.XHR = function(actionURL, cname, method, data, isAsync, nocache) {
    var _s = QZFL.XHR,
        prot, n;
    cname = cname || ("_xhrInstence_" + _s.counter);
    if (!(_s.instance[cname] instanceof QZFL.XHR)) {
        _s.instance[cname] = this;
        _s.counter++;
    }
    prot = _s.instance[cname]
    prot._name = cname;
    prot._nc = !! nocache;
    prot._method = ((typeof method == 'string' ? method : '').toUpperCase() != "GET") ? "POST" : "GET";
    if (!(prot._uriObj = new QZFL.util.URI(actionURL))) {
        throw (new Error("URL not valid!"));
    }
    prot._uri = actionURL;
    prot._data = data;
    this.onSuccess = QZFL.emptyFn;
    this.onError = QZFL.emptyFn;
    this.charset = "gb2312";
    this.proxyPath = "";
    return prot;
};
QZFL.XHR.instance = {};
QZFL.XHR.counter = 0;
QZFL.XHR.path = "http://" + QZFL.config.resourceDomain + "/ac/qzfl/release/expand/xhr_base.js?max_age=864001", QZFL.XHR.prototype.send = function() {
    var _s = QZFL.XHR,
        fn;
    if (this._method == 'POST' && !this._data) {
        return false;
    }
    if (typeof this._data == "object") {
        this._data = _s.genHttpParamString(this._data, this.charset);
    }
    if (this._method == 'GET' && this._data) {
        this._uri += (this._uri.indexOf("?") < 0 ? "?" : "&") + this._data;
    }
    fn = (location.host && (this._uriObj.host != location.host)) ? '_DoXsend' : '_DoSend';
    if (_s[fn]) {
        return _s[fn](this);
    } else {
        QZFL.imports(_s.path, (function(th) {
            return function() {
                _s[fn](th);
            };
        })(this));
        return true;
    }
};
QZFL.XHR.genHttpParamString = function(o, cs) {
    cs = (cs || "gb2312").toLowerCase();
    var r = [];
    for (var i in o) {
        r.push(i + "=" + ((cs == "utf-8") ? encodeURIComponent(o[i]) : QZFL.string.URIencode(o[i])));
    }
    return r.join("&");
};
QZFL.XHR._errCodeMap = {
    400: {
        msg: 'Bad Request'
    },
    401: {
        msg: 'Unauthorized'
    },
    403: {
        msg: 'Forbidden'
    },
    404: {
        msg: 'Not Found'
    },
    999: {
        msg: 'Proxy page error'
    },
    1000: {
        msg: 'Bad Response'
    },
    1001: {
        msg: 'No Network'
    },
    1002: {
        msg: 'No Data'
    },
    1003: {
        msg: 'Eval Error'
    }
};
QZFL.XHR._DoXsend = function(o) {
    var sender, uri = o._uriObj;

    function clear(obj) {
        try {
            obj._sender = obj._sender.callback = obj._sender.errorCallback = obj._sender.onreadystatechange = null;
        } catch (ign) {}
        if (QZFL.userAgent.safari || QZFL.userAgent.opera) {
            setTimeout('QZFL.dom.removeElement($("_xsend_frm_' + obj._name + '"))', 1000);
        } else {
            QZFL.dom.removeElement(QZFL.dom.get("_xsend_frm_" + obj._name));
        }
    }
    if (o._sender === null || o._sender === void(0)) {
        sender = document.createElement("iframe");
        sender.id = "_xsend_frm_" + o._name;
        sender.style.width = sender.style.height = 0;
        sender.style.borderWidth = "0";
        sender.callback = function(data) {
            o.onSuccess(data);
            clear(o);
        };
        sender.errorCallback = function(num) {
            o.onError(QZFL.XHR._errCodeMap[num]);
            clear(o);
        };
        document.body.appendChild(sender);
        o._sender = sender;
    }
    o.GBEncoderPath = QZFL.config.gbEncoderPath || "";
    o._sender.src = "http://" + uri.host + (this.proxyPath || "/xhr_proxy_gbk.html");
    return true;
};
QZFL.XHR._DoSend = function(th) {
    var sender;
    if (!th._sender) {
        if (window.XMLHttpRequest) {
            sender = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            try {
                !(sender = new ActiveXObject("Msxml2.XMLHTTP")) && (sender = new ActiveXObject("Microsoft.XMLHTTP"));
            } catch (ign) {}
        }
        if (!sender) {
            return false;
        }
        th._sender = sender;
    }
    try {
        th._sender.open(th._method, th._uri, true);
    } catch (err) {
        return false;
    }
    (th._method == 'POST') && (th._sender.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'));
    (th._nc) && (th._sender.setRequestHeader('If-Modified-Since', 'Thu, 1 Jan 1970 00:00:00 GMT'), th._sender.setRequestHeader('Cache-Control', 'no-cache'));
    th._sender.onreadystatechange = function() {
        try {
            if (th._sender.readyState == 4) {
                if (th._sender.status >= 200 && th._sender.status < 300) {
                    th.onSuccess({
                        text: th._sender.responseText,
                        xmlDom: th._sender.responseXML
                    });
                } else {
                    if (QZFL.userAgent.safari && (QZFL.object.getType(th._sender.status) == 'undefined')) {
                        th.onError(QZFL.XHR._errCodeMap[1002]);
                    } else {
                        th.onError(QZFL.XHR._errCodeMap[th._sender.status]);
                    }
                }
                delete th._sender;
                th._sender = null;
            }
        } catch (err) {}
    };
    th._sender.send((th._method == 'POST' ? th._data : void(0)));
    return true;
};
QZFL.XHR.prototype.destroy = QZFL.emptyFn;
QZFL.FormSender = function(actionURL, method, data, charset) {
    this.name = "_fpInstence_" + QZFL.FormSender.counter;
    QZFL.FormSender.instance[this.name] = this;
    QZFL.FormSender.counter++;
    var c = String(charset).toLowerCase();
    if (typeof(actionURL) == 'object' && actionURL.nodeType == 1 && actionURL.tagName == 'FORM') {
        this.instanceForm = actionURL;
    } else {
        this.method = method || "POST";
        this.uri = actionURL;
        this.charset = (c == 'utf-8' || c == 'gbk' || c == 'gb2312' || c == 'gb18030') ? c : 'gb2312';
        this.data = (typeof(data) == "object" || typeof(data) == 'string') ? data : null;
        this.proxyURL = (this.charset == "utf-8") ? QZFL.config.FSHelperPage.replace(/_gbk/, "_utf8") : QZFL.config.FSHelperPage;
    }
    this._sender = null;
    this.onSuccess = QZFL.emptyFn;
    this.onError = QZFL.emptyFn;
    this.startTime = 0;
    this.endTime = 0;
    this.postTime = 0;
};
QZFL.FormSender.instance = {};
QZFL.FormSender.counter = 0;
QZFL.FormSender._errCodeMap = {
    999: {
        msg: 'Connection or Server error'
    }
};
QZFL.FormSender.pluginsPool = {
    "formHandler": [],
    "onErrorHandler": []
};
QZFL.FormSender._pluginsRunner = function(pType, data) {
    var _s = QZFL.FormSender,
        l = _s.pluginsPool[pType],
        t = data,
        len;
    if (l && (len = l.length)) {
        for (var i = 0; i < len; ++i) {
            if (typeof(l[i]) == "function") {
                t = l[i](t) || data;
            }
        }
    }
    return t;
};
QZFL.FormSender._clear = function(o) {
    o._sender = o._sender.callback = o._sender.errorCallback = null;
    if (QZFL.userAgent.safari || QZFL.userAgent.opera) {
        setTimeout('QZFL.dom.removeElement(document.getElementById("_fp_frm_' + o.name + '"))', 50);
    } else {
        QZFL.dom.removeElement(document.getElementById("_fp_frm_" + o.name));
    }
    o.endTime = +new Date;
    QZFL.FormSender._pluginsRunner('onRequestComplete', o);
    o.instanceForm = null;
};
QZFL.FormSender.prototype.send = function() {
    this.startTime = +new Date;
    if (this.charset == 'utf-8') {
        var win = arguments.callee == parent.QZFL.FormSender.prototype.send ? window : parent,
            isspeedup = win.QZFL.cookie.get('blabla') == 'dynamic',
            extend = QZFL.object.extend,
            realurl = this.uri,
            ajaxurl = isspeedup ? ('http://' + win.location.host + '/proxy') : realurl,
            canUseXHR = win.QZFL.config.canUseXHR2;
        if (1 && ((isspeedup && win.QZFL.config.xhrProxyEnable == 1) || (canUseXHR && canUseXHR(ajaxurl)))) {
            var data = typeof this.data == 'object' ? extend(this.data, {
                qzreferrer: location.href
            }) : [this.data, 'qzreferrer=' + encodeURIComponent(location.href)].join('&');
            return (this.postTime = +new Date, this.type = 'xhr'), win.QZFL.ajaxPost(ajaxurl, data, {
                onload: this.onSuccess,
                instance: this,
                headers: isspeedup ? {
                    'X-Real-Url': realurl
                } : {}
            });
        }
    }
    if (this._sender === null || this._sender === void(0)) {
        var timer, sender = document.createElement("iframe");
        sender.id = sender.name = "_fp_frm_" + this.name;
        sender.style.cssText = "width:0;height:0;border-width:0;display:none;";
        sender.callback = (function(th) {
            return function() {
                th.resultArgs = arguments;
                th.msg = 'ok';
                th.onSuccess.apply(th, arguments);
                QZFL.FormSender._clear(th);
            }
        })(this);
        var errcallback = (function(th) {
            var f = function() {
                    th.resultArgs = arguments;
                    th.msg = QZFL.FormSender._errCodeMap[999].msg;
                    QZFL.FormSender._pluginsRunner('onErrorHandler', th);
                    QZFL.FormSender._clear(th);
                    th.onError();
                };
            return function() {
                if (typeof th.resultArgs == 'object') {
                    return;
                }
                if (this.readyState == 'complete' || typeof this.readyState == 'undefined') {
                    if ('sended'.indexOf(this.state) > -1) {
                        this.onload = this.onreadystatechange = null;
                        f();
                    }
                }
            }
        })(this);
        document.body.appendChild(sender);
        sender.errorCallback = errcallback;
        sender.onload = sender.onreadystatechange = errcallback;
        sender.state = 'initing';
        this._sender = sender;
    }
    if (!this.instanceForm) {
        var t = this,
            ie = QZFL.userAgent.ie,
            ifrurl, ifrHTML, data = t.data;
        ifrHTML = '<!DOCTYPE html><html lang="zh-cn"><head><meta http-equiv="content-type" content="text/html; charset=' + t.charset + '" /><meta charset="' + t.charset + '" />';
        if (ie) {
            ifrurl = 'javascript:document.open();document.domain="' + document.domain + '";var me=parent.QZFL.FormSender.instance["' + t.name + '"];document.write(me.ifrHTML);document.close();';
        }
        ifrHTML = ifrHTML + '<script type="text/javascript">' + (ie && ('document.charset="' + t.charset + '"') || '') + ';document.domain="' + document.domain + '";frameElement.submited=void(0);frameElement.state="sending";<\/script><\/head><body>';
        ifrHTML = ifrHTML + '<form action="' + t.uri + '" accept-charset="' + t.charset + '" id="p" enctype="application/x-www-form-urlencoded;charset=' + t.charset + '" method="post">';
        ifrHTML = ifrHTML + '<input type="hidden" name="qzreferrer" id="qzreferrer" />';
        ifrHTML = ifrHTML + '<\/form><script type="text/javascript">var me=parent.QZFL.FormSender.instance["' + t.name + '"],doc=document,f=doc.getElementById("p"),d=me.jsonData,fg=doc.createDocumentFragment();if(typeof d=="string"){var l=d.split("&");for(var i=0;i<l.length;i++){var kv=l[i].split("=");var ipt=doc.createElement("input");ipt.type="hidden";ipt.name=kv[0];ipt.value=decodeURIComponent(kv[1]);fg.appendChild(ipt);}}else{for(var i in d){var ipt=doc.createElement("input");ipt.type="hidden";ipt.name=i;ipt.value=d[i];fg.appendChild(ipt);}}f.appendChild(fg);doc.getElementById("qzreferrer").value=parent.location.href;f.submit();me.postTime=+new Date;frameElement.submited=true;frameElement.state="sended";<\/script><\/body><\/html>';
        t.ifrHTML = ifrHTML;
        t.ifrurl = ifrurl;
        t.jsonData = data;
        ie ? setTimeout((function(th) {
            return function() {
                th._sender.state = 'inited';
                th._sender.src = th.ifrurl;
            }
        })(t), 10) : (sender.src = 'javascript:;');
        if (!ie) {
            var d = sender.contentDocument || sender.contentWindow.document;
            if (d) {
                d.open();
                d.write(t.ifrHTML);
                d.close();
            }
        }
    } else {
        this.instanceForm.target = (sender.name = sender.id);
        this._sender.submited = true;
        this.instanceForm.submit();
    }
    return true;
};
QZFL.FormSender.prototype.destroy = function() {
    var n = this.name;
    delete QZFL.FormSender.instance[n]._sender;
    QZFL.FormSender.instance[n]._sender = null;
    delete QZFL.FormSender.instance[n];
    QZFL.FormSender.counter--;
    return null;
};
QZFL.JsLoader = function() {
    this.onload = QZFL.emptyFn;
    this.onerror = QZFL.emptyFn;
};
QZFL.JsLoader.prototype.load = function(src, doc, opt) {
    var opts = {},
        t = typeof(opt),
        o = this;
    if (t == "string") {
        opts.charset = opt;
    } else if (t == "object") {
        opts = opt;
    }
    opts.charset = opts.charset || "gb2312";
    doc = doc || document;
    QZFL.userAgent.ie ? setTimeout(function() {
        o._load(src, doc, opts);
    }, 0) : o._load(src, doc, opts);
};
QZFL.JsLoader.prototype._load = function(src, doc, opts) {
    var _ie = QZFL.userAgent.ie,
        o = this,
        tmp, k, _rm = QZFL.dom.removeElement,
        _ae = QZFL.event.addEvent,
        _new = false,
        _js;
    _js = doc.createElement("script");
    _ae(_js, (_ie && (typeof doc.documentMode == 'undefined' || doc.documentMode < 9) ? "readystatechange" : "load"), function() {
        if ('_loaded_complete_undefined_'.indexOf(this.readyState) > -1) {
            _rm(this);
            o.onload();
            _js = _ae = o = null;
        }
    });
    _ae(_js, 'error', function() {
        _rm(this);
        o.onerror();
        _js = _ae = o = null;
    });
    for (k in opts) {
        if (typeof(tmp = opts[k]) == "string" && k.toLowerCase() != "src") {
            _js.setAttribute(k, tmp);
        }
    }
    _js.src = src;
    doc.getElementsByTagName("head")[0].appendChild(_js);
};
QZFL["js" + "Loader"] = QZFL.JsLoader;
QZFL.cookie = {
    set: function(name, value, domain, path, hour) {
        if (hour) {
            var expire = new Date();
            expire.setTime(expire.getTime() + 3600000 * hour);
        }
        document.cookie = name + "=" + value + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + QZFL.config.domainPrefix + ";"));
        return true;
    },
    get: function(name) {
        var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"),
            m = document.cookie.match(r);
        return (!m ? "" : m[1]);
    },
    del: function(name, domain, path) {
        document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + QZFL.config.domainPrefix + ";"));
    }
};
QZFL.object.map(QZFL.lang || {});
var ua = window.ua || QZFL.userAgent,
    $e = QZFL.element.get,
    $ = QZFL.dom.get,
    removeNode = QZFL.dom.removeElement,
    addEvent = QZFL.event.addEvent,
    removeEvent = QZFL.event.removeEvent,
    getEvent = QZFL.event.getEvent;
QZFL.Storage = {
    helperUrl: "http://v.qq.com/storage_helper.html",
    ifrCallback: null,
    instance: null,
    getInstance: function() {
        var _ins = this["instance"];
        if (_ins) {
            return _ins;
        }
        return null;
    }
};
QZFL.Storage.create = function(cb, opt) {
    if (typeof cb != "function") {
        return;
    }
    opt = opt || {};
    var db = null,
        dbname = opt.dbname || "qzone_database",
        defaultDomain = opt.domain || document.domain,
        helperUrl = opt.helper || QZFL.Storage.helperUrl,
        share = opt.share || false,
        _clientStore = ["globalStorage", "localStorage", "userData"];
    var _cs = QZFL.Storage;
    var createHelper = function(th, type) {
            var i = document.createElement("iframe");
            i.id = "userData_iframe_" + dbname;
            i.style.display = "none";
            QZFL.Storage.ifrCallback = function() {
                db = i.contentWindow.create(dbname, type);
                if (db) {
                    cb(th);
                } else {
                    cb(false);
                }
            };
            i.src = helperUrl;
            document.body.appendChild(i);
        };
    var getExpireDate = function(days) {
            var d = new Date();
            days = days || 365 * 3;
            d.setDate(d.getDate() + days);
            return d.toUTCString();
        }
    var _backend = {};
    _backend.userData = {
        isSupport: !! window.ActiveXObject,
        type: 1,
        get: function(key, cb) {
            db.load(dbname);
            var val = db.getAttribute(key);
            (typeof cb == "function") && cb(val);
            return val;
        },
        set: function(key, value) {
            try {
                db.load(dbname);
                db.setAttribute(key, value);
                db.save(dbname);
                return true;
            } catch (ex) {
                return false;
            }
        },
        remove: function(key) {
            db.load(dbname);
            db.removeAttribute(key);
            db.save(dbname);
        },
        init: function() {
            if (share) {
                createHelper(this, "userData");
                return;
            }
            var el = (document.documentElement || document.body);
            el.addBehavior("#default#userdata");
            el.load(dbname);
            db = el;
            cb(this);
        },
        clear: function() {
            try {
                db.load(dbname);
                db.expires = new Date(1234567890000).toUTCString();
                db.save(dbname);
                db.load(dbname);
                db.expires = getExpireDate();
                db.save(dbname);
                return true;
            } catch (ex) {
                return false;
            }
        }
    };
    _backend.globalStorage = {
        isSupport: typeof window.globalStorage != "undefined",
        type: 2,
        get: function(key, cb) {
            var v = (v = db.getItem(key)) && v.value ? v.value : v;
            (typeof cb == "function") && cb(v);
            return v;
        },
        set: function(key, value) {
            try {
                db.setItem(key, value);
                return true;
            } catch (ex) {
                return false;
            }
        },
        remove: function(key) {
            db.removeItem(key);
        },
        init: function() {
            if (db = window.globalStorage[share ? defaultDomain : document.domain]) {
                cb(this);
            } else {
                cb(false);
            }
        },
        clear_flag: false,
        clear_arr: [],
        clear: function(cb) {
            var ar = this.clear_arr;
            if (this.clear_flag) {
                return;
            }
            this.clear_flag = true;
            for (var k in db) {
                ar.push(k);
            }
            var clearXItems = function(x) {
                    x = x > ar.length ? ar.length : x;
                    for (var i = 0; i < x; i++) {
                        var k = ar.shift();
                        db.removeItem(k);
                    }
                    if (ar.length > 0) {
                        QZFL.console.print(ar.length);
                        setTimeout(function() {
                            clearXItems(x);
                        }, 50);
                    } else {
                        typeof cb == "function" && cb();
                    }
                }
            clearXItems(5);
        }
    };
    _backend.localStorage = {
        isSupport: typeof window.localStorage != "undefined",
        type: 3,
        get: _backend.globalStorage.get,
        set: _backend.globalStorage.set,
        remove: _backend.globalStorage.remove,
        init: function() {
            if (share) {
                createHelper(this, "localStorage");
                return;
            }
            if (db = window.localStorage) {
                cb(this);
            } else {
                cb(false);
            }
        },
        clear: function() {
            db.clear();
        }
    };
    (function() {
        try {
            for (var i = 0, len = _clientStore.length; i < len; i++) {
                if (_backend[_clientStore[i]].isSupport) {
                    (_cs["instance"] = _backend[_clientStore[i]]).init();
                    return;
                }
            }
            cb(false);
        } catch (e) {
            var img = new Image();
            img.src = "http://pinghot.qq.com/pingd?dm=v.qq.com.hot&url=/virtualpage/storage.html&arg=&hottag=txv.storage.error&hotx=9999&hoty=9999&rand=13106";
            cb(false);
        }
    })();
};
(function(qs) {
    var isDoing = false,
        queue = [],
        opt = {
            share: true,
            domain: "qq.com"
        };
    qs.setOptions = function(opts) {
        opt = opts;
    };
    qs.init = function() {
        var args = arguments;
        if (isDoing) {
            queue.push([args[0], args[1]]);
            return;
        }
        queue.push([args[0], args[1]]);
        isDoing = true;
        qs.create(function(ins) {
            var t;
            if (ins) {
                qs.get = ins.get;
                qs.set = ins.set;
                qs.remove = ins.remove;
                qs.clear = ins.clear;
                while (t = queue.pop()) {
                    ins[t[0]].apply(null, t[1]);
                }
            } else {
                while (t = queue.pop()) {
                    if (QZFL.lang.isArray(t) && t[0] == "get" && t[1] && typeof t[1][1] == "function") {
                        t[1][1](null);
                    }
                }
                qs.get = function(key, cb) {
                    if (QZFL.lang.isFunction(cb)) {
                        cb(null);
                    }
                    return null;
                }
            }
        }, opt);
    };
    qs.get = function() {
        var args = [].slice.call(arguments, 0),
            timer = null,
            fn;
        if (QZFL.lang.isFunction(args[1])) {
            fn = args[1];
            timer = setTimeout(function() {
                fn.call(null, null);
                fn = QZFL.emptyFn;
            }, 500);
            args[1] = function(v) {
                clearTimeout(timer);
                fn.call(null, v);
                fn = QZFL.emptyFn;
            }
        }
        qs.init("get", args);
    };
    qs.set = function() {
        qs.init("set", arguments);
    };
    qs.remove = function() {
        qs.init("remove", arguments);
    };
    qs.clear = function() {
        qs.init("clear", arguments);
    };
})(QZFL.Storage);
QZFL.Tween = function(el, property, func, startValue, finishValue, duration) {
    this._func = func || QZFL.transitions.simple;
    this._obj = QZFL.dom.get(el);
    this.isColor = /^#/.test(startValue);
    this._prop = property;
    var reSuffix = /\d+([a-z%]+)/i.exec(startValue);
    this._suffix = reSuffix ? reSuffix[1] : "";
    this._startValue = this.isColor ? 0 : parseFloat(startValue);
    this._finishValue = this.isColor ? 100 : parseFloat(finishValue);
    if (this.isColor) {
        this._startColor = QZFL.css.convertHexColor(startValue);
        this._finishColor = QZFL.css.convertHexColor(finishValue);
    }
    this._duration = duration || 10;
    this._timeCount = 0;
    this._startTime = 0;
    this._changeValue = this._finishValue - this._startValue;
    this.currentValue = 0;
    this.isPlayed = false;
    this.isLoop = false;
    this.onMotionStart = QZFL.emptyFn;
    this.onMotionChange = QZFL.emptyFn;
    this.onMotionStop = QZFL.emptyFn;
};
QZFL.Tween.prototype.start = function(loop) {
    this._reloadTimer();
    this.isPlayed = true;
    this._runTime();
    this.isLoop = loop ? true : false;
    this.onMotionStart.apply(this);
    return "d"
};
QZFL.Tween.prototype.pause = function() {
    this.isPlayed = false;
};
QZFL.Tween.prototype.stop = function() {
    this.isPlayed = false;
    this._playTime(this._duration + 0.1);
};
QZFL.Tween.prototype._reloadTimer = function() {
    this._startTime = new Date().getTime() - this._timeCount * 1000;
};
QZFL.Tween.prototype._playTime = function(time) {
    var _isEnd = false;
    if (time > this._duration) {
        time = this._duration;
        _isEnd = true;
    }
    var pValue = this._func(time, this._startValue, this._changeValue, this._duration);
    this.currentValue = /(opacity)|(zoom)/i.test(this._prop) ? pValue : (/(transform)/i.test(this._prop) ? "scale(" + pValue + ")" : Math.round(pValue));
    if (this.isColor) {
        this.currentValue = QZFL.Tween.getColor(this._startColor, this._finishColor, pValue);
    }
    var _try2setCSS = QZFL.dom.setStyle(this._obj, this._prop, this.currentValue + this._suffix);
    if (!_try2setCSS) {
        this._obj[this._prop] = this.currentValue + this._suffix;
    }
    this.onMotionChange.apply(this, [this._obj, this._prop, this.currentValue]);
    if (_isEnd) {
        this.isPlayed = false;
        if (this.isLoop) {
            this.isPlayed = true;
            this._reloadTimer();
        }
        this.onMotionStop.apply(this);
        if (window.CollectGarbage) {
            CollectGarbage();
        }
    }
};
QZFL.Tween.prototype._runTime = function() {
    var o = this;
    if (o.isPlayed) {
        o._playTime((new Date().getTime() - this._startTime) / 1000);
        setTimeout(function() {
            o._runTime.apply(o, [])
        }, 0);
    }
};
QZFL.Tween.prototype.getPercent = function() {
    return (this.currentValue - this._startValue) / this._changeValue * 100;
};
QZFL.Tween.prototype.swapValue = function() {
    if (this.isColor) {
        var tempValue = this._startColor.join(",");
        this._startColor = this._finishColor;
        this._finishColor = tempValue.split(",");
    } else {
        var tempValue = this._startValue;
        this._startValue = this._finishValue;
        this._finishValue = tempValue;
        this._changeValue = this._finishValue - this._startValue;
    }
};
QZFL.Tween.getColor = function(startColor, finishColor, percent) {
    var _sc = startColor,
        _fc = finishColor,
        _color = [];
    if (percent > 100) {
        percent = 100;
    }
    if (percent < 0) {
        percent = 0;
    }
    for (var i = 0; i < 3; i++) {
        _color[i] = Math.floor(_sc[i] * 1 + (percent / 100) * (_fc[i] - _sc[i])).toString(16);
        if (_color[i].length < 2) {
            _color[i] = "0" + _color[i];
        }
    }
    return "#" + _color.join("");
};
QZFL.transitions = {
    simple: function(time, startValue, changeValue, duration) {
        return changeValue * time / duration + startValue;
    },
    regularEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    regularEaseOut: function(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    regularEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
};
QZFL.config.DCCookieDomain = "live.qq.com";
QZFL.config.domainPrefix = "live.qq.com";
QZFL.config.defaultDataCharacterSet = "utf-8";
QZFL.config.defaultShareObject = "http://live.qq.com/toolpages/getset.swf";
try {
    if (window.location.href.indexOf("http://cache.tv.qq.com") >= 0) {
        QZFL.config.FSHelperPage = "http://cache.tv.qq.com/v9/toolpages/fp_utf8.html";
    }
} catch (e) {}
if (typeof Live == "undefined" || !Live) {
    var Live;
    Live = QZFL;
    if (typeof QQLive != "undefined" && !QQLive) {
        Live.object.extend(Live, QQLive);
    }
    Live.isLoaded = false;
    Live.ver = "$Rev: 3924 $";
    Live.lastmodify = "$Date: 2010-08-18 13:36:04 +0800 (周三, 18 八月 2010) $";
};
Live.JSONGetter = function(extObj) {
    var gcGet, paramToStr, createFunName, callError, callSuccess, callComplete, hasFire = false,
        timer = null,
        df = document.createDocumentFragment();
    extObj = QZFL.object.extend({}, extObj);
    gcGet = function(callbackName, script) {
        var pNode;
        if (script && QZFL.lang.isElement(script)) {
            script.onreadystatechange = null;
            pNode = script.parentNode;
            if (pNode && QZFL.lang.isElement(pNode)) {
                pNode.removeChild(script);
            }
        }
        window[callbackName] = undefined;
        try {
            df = null;
            delete window[callbackName];
        } catch (e) {}
    };
    paramToStr = function(parameters, encodeURI) {
        var str = "",
            key, parameter;
        for (key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                key = encodeURI ? encodeURIComponent(key) : key;
                parameter = encodeURI ? encodeURIComponent(parameters[key]) : parameters[key];
                str += key + "=" + parameter + "&";
            }
        }
        return str.replace(/&$/, "");
    };
    createFunName = function(jsonCache) {
        var num = ((!isNaN(jsonCache) && jsonCache != 0) ? (parseInt(new Date().valueOf() / (jsonCache * 1000), 10)) : Live.JSONGetter.counter++);
        while (typeof window["jsonp" + num] == "function") {
            num++;
        }
        return "jsonp" + num;
    };
    callError = function(callback, errorMsg) {
        if (typeof(callback) == 'function') {
            callback(errorMsg);
        }
    };
    callSuccess = function(callback, data) {
        if (typeof(callback) == 'function') {
            callback(data, extObj);
        }
    };
    callComplete = function(callback) {
        hasFire = true;
        clearTimeout(timer);
        if (typeof(callback) == 'function') {
            callback();
        }
    };
    this.beforeSend = QZFL.emptyFn;
    this.get = function(options) {
        options = options || {};
        var url = options.url,
            callbackParameter = options.callbackParameter || 'callback',
            parameters = options.data || {},
            script, callbackName = options.jsonpFunName || createFunName(options.jsonCache),
            prefix = "?",
            containCallback = false,
            charset = QZFL.lang.isString(options.charset) ? options.charset : "utf-8",
            timeout = isNaN(options.timeout) ? 5000 : options.timeout;
        if (!url) {
            return;
        }
        if (QZFL.userAgent.ie <= 8 && df.createElement) {
            script = df.createElement('script');
        } else {
            script = document.createElement('script');
        }
        if (url.indexOf("?") >= 0) {
            prefix = "&";
            if (url.indexOf(callbackParameter + "=") != -1) {
                url = url.replace(callbackParameter + "=?", callbackParameter + "=" + callbackName);
                containCallback = true;
            }
        }
        if (!containCallback) {
            parameters[callbackParameter] = callbackName;
        }
        url += prefix + paramToStr(parameters, true);
        if (options.jsonCache == 0) {
            url += (url.match(/\?/) ? "&" : "?") + "_=" + new Date().valueOf();
        }
        window[callbackName] = function(data) {
            callComplete(options.complete);
            if (typeof(data) === 'undefined') {
                callError(options.error, 'Invalid JSON data returned');
            } else {
                callSuccess(options.success, data);
            }
            gcGet(callbackName, script);
        };
        script.charset = charset;

        function errorHandle(msg) {
            if (!hasFire) {
                gcGet(callbackName, script);
                callComplete(options.complete);
                callError(options.error, msg);
            }
        }
        if (options.timeout < 10) {
            options.timeout *= 1000;
        }
        if (!Live.JSONGetter.isSupportOnError) {
            script.onreadystatechange = (function(th) {
                var hasReturn = false;
                return (function() {
                    if (script && (script.readyState == "loaded" || script.readyState == "complete") && !hasFire) {
                        if (hasReturn) {
                            try {
                                errorHandle('Error while trying to access the URL');
                            } catch (e) {}
                        }
                        hasReturn = true;
                    }
                });
            })(this);
        } else {
            script.onerror = function() {
                this.onerror = null;
                errorHandle('Error while trying to access the URL');
            }
            script.onload = function() {
                this.onload = null;
                if (!hasFire) {
                    errorHandle('Error while trying to access the URL');
                }
            }
        }
        if (typeof this.beforeSend == "function") {
            this.beforeSend();
        }
        timer = setTimeout(function() {
            errorHandle('Timeout while trying to access the URL');
            window[callbackName] = QZFL.emptyFn;
        }, options.timeout);
        (Live.JSONGetter.useDf ? df : document.getElementsByTagName('head')[0]).appendChild(script);
        QZFL.userAgent.ie ? setTimeout(function() {
            script.src = url;
        }, 0) : script.src = url;
    };
}
Live.JSONGetter.counter = new Date().valueOf();
Live.JSONGetter.useDf = (function() {
    var ret = false,
        df;
    if (QZFL.userAgent.ie) {
        df = document.createDocumentFragment();
        ret = typeof df.appendChild != "undefined" && typeof df.createElement != "undefined";
    }
    return ret;
})();
Live.JSONGetter.isSupportOnError = (function() {
    var ret = false,
        script = document.createElement("script");
    if ("onerror" in script && script.onerror) {
        ret = typeof(script.onerror) == "function";
    } else {
        script.setAttribute("onerror", "return;");
        ret = typeof(script.onerror) == "function";
    }
    return ret;
})();
QZFL.element.extendFn({
    val: function(value) {
        if (value == undefined) {
            return this.getVal();
        }
        this.setVal(value);
    },
    attr: function(key, value) {
        if (value == undefined) {
            return this.getAttr(key);
        }
        this.setAttr(key, value);
    },
    html: function(value) {
        if (value == undefined) {
            return this.getHtml();
        }
        this.setHtml(value);
    },
    text: function(value) {
        var attr = "innerText"
        if (!this.elements[0]) return "";
        if (typeof this.elements[0].innerText == "undefined") {
            attr = "textContent";
        }
        if (value == undefined) {
            return this.getAttr(attr);
        }
        this.setAttr(attr, value);
    },
    css: function(key, value) {
        if (value == undefined) {
            return this.getStyle(key);
        }
        this.setStyle(key, value);
    },
    toggle: function() {
        if (this.getStyle("display") != "none") {
            this.setStyle("display", "none");
            return;
        }
        this.setStyle("display", "");
    },
    focus: function() {
        if (this.elements[0]) {
            this.elements[0].focus();
        }
    },
    select: function() {
        if (this.elements[0]) {
            this.elements[0].select();
        }
    },
    size: function() {
        return this.elements.length;
    },
    removeAttr: function(name) {
        this.each(function(el) {
            el.setAttribute(name, "");
            if (el.nodeType == 1) {
                el.removeAttribute(name);
            }
        })
    },
    index: function(ele) {
        return QZFL.inArray(ele && ele._isElementHandler ? ele.elements[0] : ele, this.elements);
    },
    load: function(url, data, cachetime, callback) {
        if (QZFL.object.getType(data) == "function") {
            callback = data;
            data = null;
            cachetime = 0;
        } else if (QZFL.object.getType(cachetime) == "function") {
            callback = cachetime;
            if (QZFL.object.getType(data) == "number") {
                cachetime = data;
                data = null;
            } else if (isHashMap(data)) {
                cachetime = 0;
            }
        }
        var self = this;
        QZFL.ajaxHandle.get(url, data, cachetime, function(d) {
            var _data = d.replace(/<script(.|\s)*?\/script>/ig, "");
            self.setHtml(_data);
            if (QZFL.object.getType(callback) == "function") {
                callback(self, _data);
            }
        });
    }
});
QZFL.ajaxHandle = {
    ajaxSettings: {
        async: true,
        cache: true,
        data: null,
        global: true,
        url: location.href,
        type: "get",
        dataType: "text",
        timeout: 5,
        charset: "utf-8",
        jsonCache: 0,
        CSRF: false
    },
    time33: function(skey) {
        for (var i = 0, len = skey.length, hash = 5381; i < len; ++i) {
            hash += (hash << 5) + skey.charAt(i).charCodeAt();
        };
        return hash & 0x7fffffff;
    },
    getToken: function() {
        var skey = QZFL.cookie.get("skey"),
            token = !! skey ? QZFL.ajaxHandle.time33(skey) : "";
        return token;
    },
    ajax: function(setting) {
        if ( !! setting && typeof setting.type == "string" && setting.type.toUpperCase() == "POST" && typeof setting.CSRF == "undefined") {
            setting.CSRF = true;
        }
        var s = {};
        QZFL.object.extend(s, this.ajaxSettings);
        QZFL.object.extend(s, setting);
        if ( !! s.CSRF) {
            s.url += (s.url.match(/\?/) ? "&" : "?") + "g_tk=" + QZFL.ajaxHandle.getToken();
        }
        var _ajaxobj = null;
        var _dataType = s.dataType.toUpperCase();
        if (s.type.toUpperCase() == "POST") {
            var formSender = new QZFL.FormSender(s.url, 'POST', s.data, s.charset);
            formSender.onSuccess = function(json) {
                postSuccess(json);
            };
            formSender.onError = postError;
            beforeSend();
            formSender.send();
        } else {
            switch (_dataType) {
            case "JSON":
            case "TEXT":
            case "XML":
                {
                    if (s.jsonCache != 0) {
                        s.url += (s.url.match(/\?/) ? "&" : "?") + "_=" + parseInt(new Date().valueOf() / (s.jsonCache * 1000), 10)
                    }
                    _ajaxobj = new QZFL.XHR(s.url, s.cname, s.type, s.data, s.async, !s.cache);
                    _ajaxobj.charset = s.charset;
                    _ajaxobj.onSuccess = success;
                    _ajaxobj.onError = error;
                    beforeSend();
                    _ajaxobj.send();
                    break;
                }
            case "JSONP":
                {
                    var evt, extObj = {}
                    try {
                        evt = QZFL.event.getEvent(window.event);
                    } catch (e) {}
                    if ( !! evt && typeof evt.type != "undefined" && !! evt.type) {
                        extObj.evtType = evt.type;
                    }
                    _ajaxobj = new Live.JSONGetter(extObj);
                    _ajaxobj.beforeSend = beforeSend;
                    _ajaxobj.get(s);
                    break;
                }
            case "SCRIPT":
                {
                    if (s.jsonCache != 0) {
                        s.url += (s.url.match(/\?/) ? "&" : "?") + "_=" + parseInt(new Date().valueOf() / (s.jsonCache * 1000), 10)
                    }
                    var jsloader = new QZFL.JsLoader();
                    jsloader.onload = function() {
                        scriptSuccess();
                    };
                    jsloader.onerror = function() {
                        scriptError();
                    }
                    beforeSend();
                    jsloader.load(s.url, document, s.charset);
                    break;
                }
            }
        }

        function beforeSend() {
            if (s.beforeSend) {
                s.beforeSend(s);
            }
        }

        function success(data) {
            if (s.success) {
                if (_dataType == "JSON") {
                    jsonsuccess(data["text"]);
                } else {
                    var _dataprop = _dataType == "TEXT" ? "text" : "xmlDom";
                    s.success(data[_dataprop]);
                }
            }
            complete();
        }

        function postSuccess(json) {
            if (s.success) {
                s.success(json);
            }
            postComplete();
        }

        function postError() {
            if (typeof s.error == "function") {
                s.error();
            }
            postComplete();
        }

        function postComplete() {
            if (typeof s.complete == "function") {
                s.complete();
            }
        }

        function scriptSuccess() {
            if (typeof s.success == "function") {
                s.success();
            }
            scriptComplete();
        }

        function scriptError() {
            if (typeof s.error == "function") {
                s.error();
            }
            scriptComplete();
        }

        function scriptComplete() {
            if (typeof s.complete == "function") {
                s.complete();
            }
        }

        function jsonsuccess(text) {
            if (s.success) {
                try {
                    if (typeof JSON == "object" && typeof JSON.parse == "function") {
                        var jsonObj = JSON.parse(text);
                        s.success(jsonObj);
                        jsonObj = null;
                        return;
                    };
                    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
                    cx.lastIndex = 0;
                    if (cx.test(text)) {
                        text = text.replace(cx, function(a) {
                            return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                        });
                    }
                    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '').replace(/new Date\(\]\)/g, "]"))) {
                        eval("var __json=" + text + ";");
                        s.success(__json);
                        __json = null;
                        return;
                    }
                } catch (ex) {
                    if (s.error) {
                        s.error();
                    }
                }
            }
        }

        function error(errRet) {
            if (s.error) {
                s.error(errRet || "", QZFL.XHR.instance[_ajaxobj._name]);
            }
            complete();
        }

        function timeout() {
            if (typeof s.timeout == "function") {
                s.timeout(QZFL.XHR.instance[_ajaxobj._name]);
            }
            complete();
        }

        function complete() {
            if (s.complete) {
                if ( !! _ajaxobj && !! _ajaxobj._name) s.complete(QZFL.XHR.instance[_ajaxobj._name], s);
                else s.complete(null, s);
            }
            if (s.async && !! _ajaxobj && (_dataType == "TEXT" || _dataType == "XML")) {
                try {
                    _ajaxobj = _ajaxobj.destroy();
                } catch (exception) {}
            }
        }
    },
    get: function(url, data, cachetime, callback, dataType) {
        if (QZFL.object.getType(data) == "function") {
            callback = data;
            data = null;
            cachetime = 0;
        } else if (QZFL.object.getType(cachetime) == "function") {
            callback = cachetime;
            if (QZFL.object.getType(data) == "number") {
                cachetime = data;
                data = null;
            } else if (isHashMap(data)) {
                cachetime = 0;
            }
        }
        dataType = dataType || "text";
        this.ajax({
            url: url,
            data: data,
            dataType: dataType,
            type: "get",
            jsonCache: cachetime,
            success: callback
        });
    },
    getScript: function(url, callback) {
        this.ajax({
            url: url,
            success: callback,
            dataType: "script"
        });
    },
    getJsonp: function(url, data, cachetime, callback) {
        this.get(url, data, cachetime, callback, "jsonp");
    },
    getJson: function(url, data, cachetime, callback) {
        this.get(url, data, cachetime, callback, "json");
    },
    ajaxQueue: function(queConf) {
        var urlInfo = queConf.urls;
        var success = queConf.success || QZFL.emptyFn;
        var error = queConf.error || QZFL.emptyFn;
        var complete = queConf.complete || QZFL.emptyFn;
        var beforeSend = queConf.beforeSend || QZFL.emptyFn;
        urlInfo = QZFL.object.getType(urlInfo) == "array" ? urlInfo : [urlInfo];
        var isErr = false;
        jsonInfo = {};

        function finish(key, json) {
            jsonInfo[key] = json;
            urlInfo.shift();
            if ( !! urlInfo.length) {
                return;
            }
            if ( !! isErr) return;
            success(jsonInfo);
        }

        function failed(key) {
            isErr = true;
            urlInfo.shift();
            if (typeof error == "function") {
                error(key);
            }
        }

        function allEnd() {
            if ( !! urlInfo.length) {
                return;
            }
            complete();
        }
        var uLen = urlInfo.length;
        beforeSend();
        for (var i = 0; i < uLen; i++) {
            new function() {
                var idx = i;
                var name = urlInfo[idx].name;
                $j.ajax({
                    "url": urlInfo[idx].url,
                    "dataType": urlInfo[idx].dataType,
                    "type": "get",
                    "data": urlInfo[idx].data,
                    "success": function(json) {
                        finish(name, json);
                    },
                    "error": function() {
                        failed(name);
                    },
                    "complete": function() {}
                })
            }
        }
    }
}
window.$j = QZFL.ajaxHandle;
QZFL.element.extendFn({
    delegate: (function() {
        var eventHandle = function(evt) {
                var target = QZFL.event.getTarget(evt),
                    handleArr = this.handleList[evt.type];
                if ( !! handleArr) {
                    for (var idx = 0, len = handleArr.length; idx < len; idx++) {
                        if (handleArr[idx]) {
                            while (this !== target && QZFL.lang.isElement(target)) {
                                if (isMatch(handleArr[idx], target)) {
                                    handleArr[idx].handler.apply(target, arguments);
                                }
                                if (handleArr[idx] && handleArr[idx].isBubble) {
                                    target = target.parentNode;
                                } else {
                                    break;
                                }
                            }
                            target = QZFL.event.getTarget(evt);
                        }
                    }
                }
            },
            quickParse = function(selector) {
                var reg = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?(?:\[([\w=]+)\])?$/;
                var quick = reg.exec(selector);
                if (quick) {
                    quick[1] = (quick[1] || "").toLowerCase();
                    quick[3] = quick[3] && new RegExp("(?:^|\\s)" + quick[3] + "(?:\\s|$)");
                }
                return quick || selector;
            },
            quickIs = function(elem, m) {
                if (!QZFL.lang.isArray(m)) {
                    return false;
                }
                var attrs = elem.attributes || {};
                var r = true;
                if ( !! m[4]) {
                    r = false;
                    var arr = m[4].split("=");
                    if (arr.length == 1) {
                        r = !! attrs[arr[0]];
                    } else if (arr.length == 2) {
                        r = (arr[1] == elem.getAttribute(arr[0]));
                    }
                }
                return ((!m[1] || elem.nodeName.toLowerCase() === m[1]) && (!m[2] || (attrs.id || {}).value === m[2]) && (!m[3] || m[3].test((attrs["class"] || {}).value)) && r);
            },
            isMatch = function(handleObj, target) {
                return (typeof handleObj.selector == "object" && quickIs(target, handleObj.selector)) || (typeof handleObj.selector == "string" && QZFL.inArray(target, $e(handleObj.selector).elements) != -1);
            };
        return function(selector, type, fn, argArr, isBubbleBoolean) {
            var elem = this.elements[0],
                isBubble = false,
                handleList, handleObj;
            if (typeof selector != "string" || selector.length == 0 || typeof fn != "function") {
                return this;
            } else if (!elem || elem.nodeType == 3 || elem.nodeType == 8) {
                return this;
            }
            if (typeof(argArr) === "boolean") {
                isBubbleBoolean = argArr;
            }
            if (typeof(isBubbleBoolean) !== "boolean") {
                isBubble = false;
            } else {
                isBubble = isBubbleBoolean;
            }
            handleList = elem.handleList;
            handleObj = {
                handler: fn,
                selector: quickParse(selector),
                isBubble: isBubble
            };
            if (!handleList) {
                handleList = elem.handleList = {};
            }
            if (!handleList[type]) {
                handleList[type] = [handleObj];
                QZFL.event.addEvent(elem, type, eventHandle, argArr);
            } else {
                handleList[type].push(handleObj);
            }
            return this;
        }
    })(),
    undelegate: function(selector, type) {
        var elem = this.elements[0];
        if (typeof selector == "string" && typeof type == "string" && !! elem && !! elem.handleList && !! elem.handleList[type]) {
            var idx = 0;
            var handleList = elem.handleList[type];
            var len = handleList.length;
            for (; idx < len; idx++) {
                if ( !! handleList[idx] && (handleList[idx].selector[0] === selector || handleList[idx].selector === selector)) {
                    delete handleList[idx];
                }
            }
        }
        return this;
    }
});
QZFL.element.extendFn((function() {
    var filter = {
        animate: function(obj, conf, callback) {
            if (typeof conf.speed == "undefined") {
                conf.speed = 300;
            };
            var start = new Date();
            var oPac = conf.from ? conf.from : parseInt(parseFloat(obj.getStyle('opacity')) * 100) || (conf.opacity == "hide" ? 100 : 0);
            var oadd = conf.to - oPac;
            filter.doMove(obj, oPac / 100);
            obj.setStyle("display", "block");
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                var endsec = new Date() - start;
                if (endsec > conf.speed) {
                    clearInterval(obj.timer);
                    if (conf.opacity == "hide") {
                        obj.hide();
                    }
                    filter.doMove(obj, conf.to / 100);
                    if (typeof callback == "function") {
                        callback(obj);
                    }
                    return;
                }
                var value = parseInt((endsec / conf.speed) * oadd + oPac) / 100;
                filter.doMove(obj, value);
            }, 50);
            return;
        },
        doMove: function(obj, value) {
            obj.each(function(targetobject, i) {
                if (typeof targetobject.style.opacity != "undefined") {
                    targetobject.style.opacity = value;
                } else if ( !! Live.userAgent.ie) {
                    targetobject.style.filter = "alpha(opacity=" + value * 100 + ")";
                } else if (typeof targetobject.style.MozOpacity != "undefined") {
                    targetobject.style.MozOpacity = value;
                }
            });
        }
    };
    return {
        fadeIn: function(conf, callback) {
            conf = QZFL.object.extend({
                from: 20,
                to: 100,
                speed: 300
            }, conf);
            conf.opacity = "show";
            filter.animate(this, conf, callback);
        },
        fadeOut: function(conf, callback) {
            conf = QZFL.object.extend({
                from: 100,
                to: 20,
                speed: 300
            }, conf);
            conf.opacity = "hide";
            filter.animate(this, conf, callback);
        },
        fadeTo: function(conf, callback) {
            conf.opacity = "to";
            filter.animate(this, conf, callback);
        }
    }
})());
Live.lazyLoad = (function() {
    var map_el = {};
    var el_obj = [];
    var download_count = 0;
    var last_offset = -1;
    var doc_el;
    var lazy_load_tag;
    var map_func = {};
    var tmp_count = 0;
    var is_finish = true;

    function initVar(tags, scrollElm) {
        if (scrollElm) {
            doc_el = scrollElm;
        } else {
            doc_el = document.compatMode == 'BackCompat' ? document.body : document.documentElement;
        }
        lazy_load_tag = tags || ["img", "iframe"];
    };

    function initElementMap() {
        var all_el = [];
        for (var i = 0, len = lazy_load_tag.length; i < len; i++) {
            var el = $e(lazy_load_tag[i] + "[lz_src]").elements;
            for (var j = 0, len2 = el.length; j < len2; j++) {
                all_el.push(el[j]);
            }
        }
        for (var key = 0, len = all_el.length; key < len; key++) {
            if (typeof(all_el[key]) == "object" && all_el[key].getAttribute("lz_src")) {
                el_obj.push(all_el[key]);
            } else {}
        }
        for (var i = 0, len = el_obj.length; i < len; i++) {
            var o_img = el_obj[i];
            o_img.style.visibility = "hidden";
            var t_index = Math.round(QZFL.dom.getXY(o_img)[1] - QZFL.dom.getXY(doc_el)[1])
            if (map_el[t_index]) {
                map_el[t_index].push(i);
            } else {
                var t_array = [];
                t_array[0] = i;
                map_el[t_index] = t_array;
                download_count++;
            }
        }
    };

    function getScreenShowHeight() {
        var scrollTop = window.pageYOffset || doc_el.scrollTop;
        return doc_el.clientHeight + scrollTop;
    };

    function doLoading() {
        tmp_count++;
        if (!download_count) {
            is_finish = true;
            return;
        }
        var img_show_height = getScreenShowHeight();
        if (last_offset >= img_show_height) {
            setTimeout(doLoading, 200);
            return;
        }
        last_offset = img_show_height;
        for (var key in map_el) {
            if (img_show_height > key) {
                var t_o = map_el[key];
                var img_vl = t_o.length;
                for (var l = 0; l < img_vl; l++) {
                    el_obj[t_o[l]].src = el_obj[t_o[l]].getAttribute("lz_src");
                    el_obj[t_o[l]].style.visibility = "visible";
                }
                delete map_el[key];
                download_count--;
            } else {}
        }
        for (var key in map_func) {
            if (img_show_height > key) {
                var t_o = map_func[key];
                var img_vl = t_o.length;
                for (var l = 0; l < img_vl; l++) {
                    t_o[l]();
                }
                delete map_func[key];
                download_count--;
            }
        }
        setTimeout(doLoading, 200);
    };

    function appleShowImg() {
        for (var i = 0, len = el_obj.length; i < len; i++) {
            el_obj[i].src = el_obj[i].getAttribute("lz_src");
            el_obj[i].style.visibility = "visible";
        }
        delete el_obj;
        delete map_el;
        download_count = 0;
    }

    function init(tags, scrollElm) {
        initVar(tags, scrollElm);
        initElementMap();
        is_finish = false;
        setTimeout(function() {
            doLoading();
        }, 0);
    };

    function lazyFunc(element, callback, fix) {
        fix = fix || 0;
        if (!element.getXY) {
            element = $e(element);
        }
        var t_index = element.getXY()[1] + fix;
        if (map_func[t_index]) {
            map_func[t_index].push(callback);
        } else {
            var t_array = [];
            t_array[0] = callback;
            map_func[t_index] = t_array;
            download_count++;
        }
        if (is_finish) {
            is_finish = false;
            doLoading();
        }
    };

    function resetLastOffset(offset) {
        last_offset = offset;
    };

    function reset() {
        map_el = {};
        el_obj = [];
        download_count = 0;
        last_offset = -1;
        lazy_load_tag;
        map_func = {};
        tmp_count = 0;
        is_finish = true;
    }
    return {
        init: init,
        lazyFunc: lazyFunc,
        getScreenShowHeight: getScreenShowHeight,
        reset: reset,
        resetLastOffset: resetLastOffset
    }
})();
var _irt = {
    version: '0.0.7',
    dataHandler: 'http://tj.video.qq.com/fcgi-bin/set_cookie?otype=json&',
    dataHandler_video: 'http://tj.video.qq.com/fcgi-bin/set_cookie?otype=json&',
    _account: '',
    _u_eventid: '',
    _debug: false,
    init: function(_identity) {
        var irt = this;
        this._account = _identity;
        this._track();
    },
    _trackStart: function(_identify) {
        if (_identify.indexOf("-") < 0) return 'invalid user identify.';
        this.init(_identify);
        return this;
    },
    _track: function() {
        this._feedBack();
    },
    record_video_api: function(video_id, duration, video_category_label, tag) {
        if (tag + "" == "0") {
            this._u_eventid = Math.abs(parseInt((navigator.userAgent ^ new Date().getTime()) * Math.random())) + video_id;
            this._feedBack_video(video_id, duration, video_category_label, tag);
            return;
        }
        this._feedBack_video(video_id, duration, video_category_label, tag);
    },
    _feedBack: function() {
        var _m = Array("id=" + this._account, "pt=" + encodeURIComponent(document.title), "dm=" + encodeURIComponent(window.location.host), "pa=" + encodeURIComponent(window.location.pathname), "sr=" + document.body.clientWidth + 'x' + document.body.clientHeight, "ul=" + (navigator.language || "zh-CN"), "tv=" + this.version, "r=" + new Date().getTime(), "url=" + encodeURIComponent(window.location.href), "ua=" + encodeURIComponent(navigator.userAgent.toString())).join('&');
        var _imgURL = this.dataHandler + _m;
        this._img = new Image();
        this._img.src = _imgURL;
    },
    _feedBack_video: function(video_id, duration, video_category_label, tag) {
        var _m = Array("ta=" + tag, "eid=" + this._u_eventid, "pt=" + encodeURIComponent(document.title), "vid=" + video_id, "du=" + duration, "la=" + encodeURIComponent(video_category_label), "r=" + new Date().getTime()).join('&');
        var _imgURL = this.dataHandler_video + _m;
        this._img = new Image();
        this._img.src = _imgURL;
    }
};
Live.Callback = function(flags) {
    flags = flags || "";
    flags = Live.Callback.flagCache[flags] || Live.Callback.setFlag(flags);
    var readyList = [],
        stack = [],
        memory, fired, firing, start, index, length, $self = this,
        add = function(args) {
            args = args || [];
            var idx = 0,
                len, type, item;
            for (len = args.length; idx < len; idx++) {
                item = args[idx];
                type = QZFL.object.getType(item);
                if (type == "array") {
                    add(item);
                } else if (type == "function") {
                    if (!flags.unique || !$self.has(item)) {
                        readyList.push(item);
                    }
                }
            }
        },
        fire = function(context, args) {
            args = args || [];
            memory = !flags.memory || [context, args];
            fired = true;
            firing = true;
            index = start || 0;
            start = 0;
            length = readyList.length;
            for (; readyList && index < length; index++) {
                if (readyList[index].apply(context, args) === false && flags.stopOnFalse) {
                    memory = true;
                    break;
                }
            }
            firing = false;
            if (readyList) {
                if (!flags.once) {
                    if (stack && stack.length) {
                        memory = stack.shift();
                        $self.fireWith(memory[0], memory[1]);
                    }
                } else if (memory === true) {
                    $self.disable();
                } else {
                    readyList = [];
                }
            }
        };
    this.getList = function() {
        return readyList;
    }
    this.empty = function() {
        readyList = [];
        return this;
    }
    this.disable = function() {
        readyList = stack = memory = undefined;
        return this;
    }
    this.lock = function() {
        stack = undefined;
        if (!memory || memory === true) {
            $self.disable();
        }
        return this;
    }, this.locked = function() {
        return !stack;
    }
    this.add = function() {
        if (QZFL.lang.isArray(readyList)) {
            var len = readyList.length;
            add(arguments);
            if (firing) {
                length = readyList.length;
            } else if (flags.memory === true && flags.stopOnFalse !== true && QZFL.lang.isArray(memory)) {
                start = len;
                fire(memory[0], memory[1]);
            }
        }
        return this;
    }
    this.remove = function() {
        if (QZFL.lang.isArray(readyList)) {
            var args = arguments,
                idx = 0,
                i = 0,
                len = args.length;
            for (; idx < len; idx++) {
                for (i = 0; i < readyList.length; i++) {
                    if (args[idx] === readyList[i]) {
                        if (firing) {
                            if (i <= length) {
                                length--;
                                if (i <= index) {
                                    index--;
                                }
                            }
                        }
                        readyList.splice(i--, 1);
                        if (flags.unique) {
                            break;
                        }
                    }
                }
            }
        }
        return this;
    }
    this.fireWith = function(context, args) {
        if (stack) {
            if (firing) {
                if (!flags.once) {
                    stack.push([context, args]);
                }
            } else if (!(flags.once && memory)) {
                fire(context, args);
            }
        }
        return this;
    }
    this.fire = function() {
        this.fireWith(this, arguments);
        return this;
    }
    this.fired = function() {
        return !!fired;
    }
}
Live.Callback.prototype = {
    has: function(fn) {
        return Live.Callback.inArray(fn, this.getList()) === -1 ? false : true;
    },
    disabled: function() {
        return !this.getList();
    }
}
Live.Callback.flagCache = {};
Live.Callback.setFlag = function(flags) {
    var argDefineArr = "once memory unique stopOnFalse".split(" "),
        ret = {},
        flagArray, idx, len;
    if (QZFL.lang.isString(flags)) {
        flagArray = flags.split(/\s+/);
        for (idx = 0, len = flagArray.length; idx < len; idx++) {
            if (Live.Callback.inArray(flagArray[idx], argDefineArr) !== -1) {
                ret[flagArray[idx]] = true;
            }
        }
    }
    Live.Callback.flagCache[flags] = ret;
    return ret;
}
Live.Callback.inArray = function(val, arr) {
    var idx, len;
    if (QZFL.lang.isArray(arr)) {
        if (QZFL.lang.isFunction(Array.prototype.indexOf)) {
            return arr.indexOf(val);
        } else {
            for (idx = 0, len = arr.length; idx < len; idx++) {
                if (val === arr[idx]) {
                    return idx;
                }
            }
        }
    }
    return -1;
}
Live.Deferred = function(fn) {
    var doneList = new Live.Callback("once memory"),
        failList = new Live.Callback("once memory"),
        progressList = new Live.Callback("memory"),
        lists = {
            resolve: doneList,
            reject: failList,
            notify: progressList
        },
        state = "pending",
        key;
    this.getList = function(key) {
        return key ? lists[key] : lists;
    }
    this.getState = function() {
        return state;
    }
    this.setState = function(val) {
        state = val;
        return this;
    }
    for (key in lists) {
        this[key] = (function(key) {
            return function(args) {
                lists[key].fire(args);
                return this;
            }
        })(key);
        this[key + "With"] = (function(key) {
            return function(context, args) {
                lists[key].fireWith(context, args);
                return this;
            }
        })(key);
    }
    this.done(function() {
        state = "resolved";
    }, failList.disable, progressList.lock).fail(function() {
        state = "rejected";
    }, doneList.disable, progressList.lock);
    if (QZFL.lang.isFunction(fn)) {
        fn.call(this, this);
    }
}
Live.Deferred.prototype = {
    done: function() {
        var args = [].slice.call(arguments);
        this.getList("resolve").add(args);
        return this;
    },
    fail: function() {
        var args = [].slice.call(arguments);
        this.getList("reject").add(args);
        return this;
    },
    progress: function() {
        var args = [].slice.call(arguments);
        this.getList("notify").add(args);
        return this;
    },
    then: function(doneFn, failFn, progressFn) {
        return this.done(doneFn).fail(failFn).progress(progressFn);
    },
    always: function() {
        var args = [].slice.call(arguments);
        return this.done(args).fail(args).progress(args);
    },
    promise: function(obj) {
        if (obj == null) {
            obj = this;
        } else {
            for (var key in this) {
                if (QZFL.lang.isFunction(this[key])) {
                    obj[key] = this[key];
                }
            }
        }
        return obj;
    },
    isResolved: function() {
        return this.getList("resolve").fired();
    },
    isRejected: function() {
        return this.getList("reject").fired();
    },
    isFired: function() {
        return this.isRejected() || this.isResolved();
    },
    pipe: function(doneFn, failFn, progressFn) {
        var $self = this;
        return new Live.Deferred(function(defer) {
            QZFL.object.each({
                done: [doneFn, "resolve"],
                fail: [failFn, "reject"],
                progress: [progressFn, "notify"]
            }, function(data, handle) {
                var fn = data[0],
                    act = data[1],
                    ret;
                if (QZFL.lang.isFunction(fn)) {
                    $self[handle](function() {
                        ret = fn.apply(this, arguments);
                        if (Live.Deferred.checkIsDeferred(ret)) {
                            ret.promise().then(defer.resolve, defer.reject, defer.notify);
                        } else {
                            defer[act + "With"](this === $self ? defer : this, [ret]);
                        }
                    })
                } else {
                    $self[handle](defer[act]);
                }
            });
        }).promise();
    }
}
Live.Deferred.checkIsDeferred = function(obj) {
    return obj && QZFL.lang.isFunction(obj.promise);
}
Live.Deferred.when = function(firstDefer) {
    var args = [].slice.call(arguments, 0),
        idx = 0,
        len = args.length,
        readyCount = len,
        pValues = [],
        item, defer = (len <= 1 && firstDefer && QZFL.lang.isFunction(firstDefer.promise)) ? firstDefer : new Live.Deferred(),
        promise = defer.promise(),
        resolveFn = function(i) {
            return function(val) {
                args[i] = arguments.length > 1 ? [].slice.call(arguments, 0) : val;
                if (!(--readyCount)) {
                    defer.resolveWith(promise, args);
                }
            }
        },
        progressFn = function(i) {
            return function(val) {
                pValues[i] = arguments.length > 1 ? [].slice.call(arguments, 0) : val;
                defer.notify(promise, pValues[i]);
            }
        };
    if (len > 1) {
        for (; idx < len; idx++) {
            item = args[idx];
            if (Live.Deferred.checkIsDeferred(item)) {
                item.promise().then(resolveFn(idx), item.reject, progressFn(idx));
            } else {
                readyCount--;
            }
        }
    } else if (defer !== firstDefer) {
        defer.resolveWith(defer, len ? [firstDefer] : []);
    }
    return promise;
}
Live.mypv = {
    dm: location.hostname || location.host,
    report: function() {
        var host = this.dm;
        var ptag = Live.mypv.getPtag();
        if (ptag != "") {
            Live.mypv.setCookiePtag('ptag', ptag, host);
        }
        var itype = 0,
            hostVal = {
                "cache.tv.qq.com": 1,
                "imgcache.qq.com": 1,
                "film.qq.com": 2,
                "3g.v.qq.com": 3
            };
        if ( !! hostVal[host]) {
            itype = hostVal[host];
        }
        window.imgpvr = new Image();
        window.imgpvr.src = ['http://rcgi.video.qq.com/pv_report?', "refer=", encodeURIComponent(document.referrer), "&ptag=", QZFL.cookie.get('ptag'), "&itype=", itype, "&t=", new Date().valueOf()].join("");
    },
    getPtag: function() {
        var url = document.location.toString().toLowerCase(),
            host = this.dm;
        var ptag = "",
            keyArr = ['ptag', 'adtag', 'pgv_ref'];
        for (var i = 0, len = keyArr.length; i < len; i++) {
            ptag = txv.common.getUrlParam(keyArr[i], url);
            if ( !! ptag) {
                break;
            }
        }
        if (!ptag) {
            var dm = Live.mypv.getDomainOfURL(document.referrer);
            if ("" != dm && host != dm) {
                ptag = dm.replace(/\./g, "_");
            }
            if (!ptag) {
                ptag = Live.mypv.getCookiePtag('ptag');
            }
        }
        return ptag;
    },
    getDomainOfURL: function(url) {
        var dm = "";
        if (typeof url == "undefined" || null == url || "" == url) {
            return dm;
        }
        var regex = /.*\:\/\/([^\/]*).*/;
        var match = url.match(regex);
        if (typeof match != "undefined" && null != match) {
            dm = match[1];
        }
        return dm;
    },
    getCookiePtag: function(key) {
        key = key || 'ptag';
        var pqtag = QZFL.cookie.get(key);
        var pqtagArr = pqtag.split('|');
        return pqtagArr[0];
    },
    setCookiePtag: function(key, val, dm) {
        var pqtag = QZFL.cookie.get(key);
        var pqtagArr = pqtag.split('|');
        var newpqtag = [val];
        for (var i = 1, len = pqtagArr.length; i < len; i++) {
            newpqtag.push('|' + pqtagArr[i]);
        }
        QZFL.cookie.set(key, newpqtag.join(''), dm);
    }
};
Live.QTAG_SET_FLAG = false;
Live.QTAG = {
    dm: location.hostname || location.host,
    init: function() {
        var me = this;
        var referDomain = Live.mypv.getDomainOfURL(document.referrer);
        if (me.dm != referDomain) {
            me.clearCookieQtag();
        }
        $e(document).undelegate("[_qtag]", "click").delegate("[_qtag]", "click", function(evt) {
            var flag = Live.QTAG_SET_FLAG;
            var $this = $e(this);
            if (!flag) {
                var qtag = $this.attr('_qtag');
                if ( !! qtag && qtag != '') {
                    me.setCookieQtag(qtag);
                    Live.QTAG_SET_FLAG = true;
                }
            }
        }, true);
        $e(document).delegate("body", "click", function(evt) {
            var flag = Live.QTAG_SET_FLAG;
            if (!flag && me.checkLinkTag(evt, this)) {
                var qtag = me.getDefaultQtag();
                me.setCookieQtag(qtag);
            }
            Live.QTAG_SET_FLAG = false;
        }, true);
    },
    getQtag: function(elem, evt) {
        var me = this;
        var target = elem,
            curEle = document,
            qtag = "";
        while (curEle != target && QZFL.lang.isElement(target)) {
            var ele = $e(target);
            var tmp = ele.attr('_qtag');
            if (!tmp || '' == tmp) {
                tmp = ele.attr('_hot');
            }
            if ( !! tmp && '' != tmp) {
                qtag = tmp;
                break;
            }
            target = target.parentNode;
        }
        if ('' == qtag) {
            qtag = me.getDefaultQtag();
        }
        return qtag;
    },
    checkQtag: function(elem, evt) {
        if (Live.QTAG_SET_FLAG) {
            return;
        }
        var $ele = $e(elem);
        var qtag = $ele.attr('_qtag');
        if ( !! qtag && qtag != '') {
            Live.QTAG.setCookieQtag(qtag);
            Live.QTAG_SET_FLAG = true;
            return;
        }
        var hot = $ele.attr('_hot');
        if ( !! hot && hot != '') {
            Live.QTAG.setCookieQtag(hot);
            Live.QTAG_SET_FLAG = true;
            return;
        }
    },
    getCookieQtag: function() {
        var pqtag = QZFL.cookie.get('ptag');
        var pqtagArr = pqtag.split('|');
        if (pqtagArr.length < 2) {
            return "";
        }
        return pqtagArr[1];
    },
    setCookieQtag: function(val) {
        var key = 'ptag',
            me = this;
        var pqtag = QZFL.cookie.get(key);
        var pqtagArr = pqtag.split('|');
        var newpqtag = [pqtagArr[0], '|' + val];
        if (pqtagArr.length > 2) {
            for (var i = 2, len = pqtagArr.length; i < len; i++) {
                newpqtag.push('|' + pqtagArr[i]);
            }
        }
        QZFL.cookie.set(key, newpqtag.join(''), me.dm);
    },
    getDefaultQtag: function() {
        var pathName = location.pathname;
        if (pathName.length < 1 || pathName == '/') {
            return location.hostname.replace(/\./g, "_");
        }
        var pos = pathName.indexOf('/', 1);
        if (pos == -1) {
            return pathName.substring(1);
        } else {
            return pathName.substring(1, pos);
        }
    },
    clearCookieQtag: function() {
        var key = 'ptag',
            me = this;
        var pqtag = QZFL.cookie.get(key);
        var pqtagArr = pqtag.split('|');
        if (pqtagArr.length > 1) {
            var newpqtag = [pqtagArr[0]];
            for (var i = 2, len = pqtagArr.length; i < len; i++) {
                newpqtag.push('|' + pqtagArr[i]);
            }
            QZFL.cookie.set(key, newpqtag.join(''), me.dm);
        }
    },
    checkLinkTag: function(oriEvt, curEle) {
        var target = QZFL.event.getTarget(oriEvt);
        if ('A' == target.tagName || 'A' == curEle.tagName) {
            return true;
        }
        while (curEle != target && QZFL.lang.isElement(target)) {
            if ('A' == target.tagName) {
                return true;
            }
            target = target.parentNode;
        }
        return false;
    }
};
Live.openviplinkreport = {
    conf: {
        selector: "a[data-openvip]",
        paramName: "aid"
    },
    init: function(_conf) {
        QZFL.object.extend(this.conf, _conf);
        var name = this.conf.paramName,
            reg = new RegExp("([&|\?]" + name + "=)(.+?)(&.+|$)");
        $e(document).undelegate(this.conf.selector, "click").delegate(this.conf.selector, "click", function(evt) {
            var url = this.href,
                param = encodeURIComponent(Live.openviplinkreport.getParam(this));
            if (QZFL.string.isURL(url)) {
                if (reg.test(url)) {
                    url = url.replace(reg, "$1" + param + "$3");
                } else {
                    url += (url.indexOf("?") == -1 ? "?" : "&") + name + "=" + param;
                }
                this.href = url;
            }
        }, true);
        window.__tencentplayer_getaidparam = function() {
            return Live.openviplinkreport.getParam(document, "flash");
        };
    },
    getParam: function(elem, defaultQtag) {
        return [Live.mypv.getPtag(), Live.QTAG.getQtag(elem) || defaultQtag || "flash"].join("$$");
    }
}
Live.tj2 = {
    jspath: "http://pingjs.qq.com/ping.js",
    comscorePath: "http://b.scorecardresearch.com/beacon.js",
    comscoreParam: {
        "c1": 2,
        "c2": 6036207
    },
    keyPrefix: "ISD.LIVEWEB.",
    initPGVGlobalParam: function() {
        pgvVirtualDomain = "";
        pvCurDomain = "";
        pvCurUrl = "";
    },
    hot: function(key) {
        function doSend() {
            Live.tj2.initPGVGlobalParam();
            pgvSendClick({
                hottag: Live.tj2.keyPrefix + key
            });
        };
        if (typeof(pgvSendClick) == 'function') {
            doSend();
        } else {
            $j.getScript(Live.tj2.jspath, doSend);
        }
    },
    button: function(key, virtualPage, virtualDomain) {
        function doSend() {
            if (typeof virtualPage == "undefined") {
                var pagename = key;
                var arrKey = key.split(".");
                if (arrKey.length > 0) {
                    pagename = arrKey[0];
                }
                pagename += ".html";
                virtualPage = "/virtualpage/" + pagename;
            }
            Live.tj2.initPGVGlobalParam();
            if (typeof virtualDomain != "undefined") {
                pgvSendClick({
                    hottag: Live.tj2.keyPrefix + key,
                    virtualURL: virtualPage,
                    virtualDomain: virtualDomain
                });
            } else {
                pgvSendClick({
                    hottag: Live.tj2.keyPrefix + key,
                    virtualURL: virtualPage
                });
            }
        };
        if (typeof(pgvSendClick) == 'function') {
            doSend();
        } else {
            $j.getScript(Live.tj2.jspath, doSend);
        }
    },
    senseParam: null,
    pv: function(extData) {
        var pvHostFilter = {};
        pvHostFilter["v.qq.com"] = true;
        pvHostFilter["film.qq.com"] = true;
        pvHostFilter["3g.v.qq.com"] = true;
        pvHostFilter["cache.tv.qq.com"] = true;
        pvHostFilter["imgcache.qq.com"] = true;
        if (pvHostFilter[location.host]) {
            if (typeof Live.mypv != "undefined") {
                Live.mypv.report();
            }
        }
        var hostFilter = {};
        hostFilter["v.qq.com"] = true;
        hostFilter["boke.qq.com"] = true;
        hostFilter["cache.tv.qq.com"] = true;
        hostFilter["play.v.qq.com"] = true;
        hostFilter["imgcache.qq.com"] = true;
        hostFilter["sns.video.qq.com"] = true;
        if (hostFilter[location.host]) {
            Live.tj2.pv_irt();
            Live.tj2.pv_comscore();
        }
        Live.tj2.pv_pgv(extData);
    },
    pv_pgv: function(extData) {
        extData = extData || {};
        if (top != window) {
            extData["statIframe"] = true;
        }

        function doSend() {
            Live.tj2.initPGVGlobalParam();
            if (typeof pgvVirtualURL != "undefined") {
                pgvVirtualURL = "";
            }
            if (typeof pvRepeatCount != "undefined") {
                pvRepeatCount = 1;
            }
            if (!extData && !Live.tj2.senseParam) {
                pgvMain();
            } else {
                var _extd = {};
                if ( !! Live.tj2.senseParam) Live.object.extend(_extd, {
                    "senseParam": Live.tj2.senseParam
                });
                if ( !! extData) {
                    Live.object.extend(_extd, extData);
                    if ( !! extData.virtualURL) {
                        pvCurUrl = extData.virtualURL;
                    }
                }
                pgvMain("", _extd);
            }
        };

        function doErrReport() {
            window.pingjsReqImg = new Image();
            window.pingjsReqImg.src = ["http://rcgi.video.qq.com/web_report?cmd=2563", "&str1=", encodeURIComponent(Live.tj2.jspath)].join('');
        };
        if (typeof(pgvMain) == "function") {
            doSend();
        } else {
            $j.ajax({
                url: Live.tj2.jspath,
                success: doSend,
                error: doErrReport,
                dataType: "script"
            });
        }
    },
    pv_irt: function() {
        if (typeof(_irt) != "undefined") {
            _irt.init("");
        }
    },
    pv_comscore: function() {
        $j.getScript(Live.tj2.comscorePath, function() {
            if (typeof(Live.tj2.comscoreParam.c10) == "undefined") {
                Live.tj2.comscoreParam.c10 = Live.cookie.get("pvid");
            }
            try {
                COMSCORE.beacon(Live.tj2.comscoreParam);
            } catch (err) {
                Live.tj2.button("comscore.error");
            }
        });
    },
    watch: function() {
        $e("body").bind("click", function() {
            if (typeof(pgvWatchClick) == 'function') {
                Live.tj2.initPGVGlobalParam();
                pgvWatchClick();
            }
        });
    },
    performance: function(flag1, flag2, flag3) {
        var timing = window.performance || window.msPerformance || window.webkitPerformance;
        if (!timing) {
            return;
        }
        timing = timing.timing;
        var times = [];
        var d00 = timing.domainLookupStart;
        times[0] = timing.domainLookupEnd;
        times[1] = timing.requestStart;
        times[2] = timing.responseStart;
        times[3] = timing.responseEnd;
        times[4] = timing.domComplete;
        times[5] = timing.loadEventEnd;
        var s = [
            ["http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=", flag1, "&flag2=", flag2, "&flag3=", flag3].join('')];
        for (var i = 0, len = times.length; i < len; i++) {
            if ( !! times[i]) s.push((i + 1) + "=" + (times[i] - d00));
        }
        window._speed_img = new Image();
        window._speed_img.src = s.join("&");
    }
};
Live.pgv = Live.tj2;
Live.virtualpgv = {
    virtualHost: "pgv.live.qq.com",
    virtualPath: "/liveweb/",
    pv: function(url) {
        Live.tj2.initPGVGlobalParam();
        Live.tj2.pv_pgv({
            virtualDomain: Live.virtualpgv.virtualHost,
            virtualURL: [Live.virtualpgv.virtualPath, url].join("")
        });
    }
};
Live.Pager = function() {
    this.eleContainer = null;
    this.alwayShow = false;
    this.totalPage = 0;
    this.pageSize = Live.Pager.Const.PG_DEF_PAGESIZE;
    this.previousPage = 0;
    this.currentPage = 0;
    this.offsetPage = Live.Pager.Const.PG_DEF_OFFSETSIZE;
    this.staus = Live.Pager.Const.PG_STATUS_READY;
    this.initialized = false;
    this.onTurnPage = function(page, pagesize) {
        return true;
    };
    this.totalCnt = 0;
    this.id = Live.Pager.maxId;
    this.hideEmpty = true;
    this.Templet = {
        CONTENT: '<form method="get" action="##" id="pager_form_{id}">{begin}<p class="mod_pagenav_main">{previous}<span class="mod_pagenav_count">{first}{prevdot}{pager}{nextdot}{last}</span>{pagecount}{summary}{next}</p><p class="mod_pagenav_option"><span class="mod_pagenav_turn">{goinput}{gobutton}</span></p></form>',
        FIRST_DISABLE: '',
        FIRST_ENABLE: '<a href="##" title="1" id="pager_first_{id}"><span>1</span></a>\n',
        LAST_DISABLE: '',
        LAST_ENABLE: '<a href="##" title="{totpage}" id="pager_last_{id}"><span>{totpage}</span></a>\n',
        PREVIOUS_DISABLE: '<span class="mod_pagenav_disable"><span>上一页</span></span>\n',
        PREVIOUS_ENABLE: '<a href="##" id="pager_previous_{id}" title="上一页"><span>上一页</span></a>\n',
        NEXT_DISABLE: '<span class="mod_pagenav_disable"><span>下一页</span></span>\n',
        NEXT_ENABLE: '<a href="##" title="下一页" id="pager_next_{id}"><span>下一页</span></a>\n',
        PAGE_NORMAL: '<a href="##" id="pager_num_{id}_{pagenum}" title="{pagenum}"><span>{pagenum}</span></a>\n',
        PAGE_CURRENT: '<span class="current"><span>{pagenum}</span></span>\n',
        GO_PAGE_INPUT: '<span class="mod_pagenav_turn">转到<input type="text" id="pager_input_{id}" name="PageCount" autocomplete="off"/>页\n',
        GO_PAGE_BUTTON: '<button type="submit" id="pager_btn_{id}"><span>确定</span></button>\n',
        PAGE_COUNT: '<span class="mod_pagenav_count2"><span class="current">{curpg}</span>/{totpage}</span>\n',
        PREVDOT_ENABLE: '<span class="mod_pagenav_more"><span>…</span></span>\n',
        PREVDOT_DISABLE: "",
        NEXTDOT_ENABLE: '<span class="mod_pagenav_more"><span>…</span></span>\n',
        NEXTDOT_DISABLE: "",
        SUMMARY: "",
        BEGIN: ""
    };
    Live.Pager.items[Live.Pager.maxId] = this;
    Live.Pager.maxId++;
}
Live.Pager.Const = {
    PG_STATUS_READY: 0,
    PG_STATUS_GO: 1,
    PG_DEF_OFFSETSIZE: 2,
    PG_DEF_PAGESIZE: 20
}
Live.Pager.maxId = 0;
Live.Pager.items = {};
Live.Pager.prototype.init = function(eleContainer, totalPage) {
    if (!eleContainer || !totalPage) return;
    this.eleContainer = eleContainer;
    this.totalPage = totalPage;
    this.initialized = true;
}
Live.Pager.prototype.fillPager = function() {
    if (!this.initialized || !this.currentPage || !this.eleContainer) return;
    var pageArr = [];
    var pageHTML = '';
    var start, end, i;
    var aBtn, aForm;
    this.currentPage = parseInt(this.currentPage, 10);
    this.offsetPage = parseInt(this.offsetPage);
    start = (this.currentPage - this.offsetPage > 0) ? (this.currentPage - this.offsetPage) : 1;
    end = (this.currentPage + this.offsetPage <= this.totalPage) ? (this.currentPage + this.offsetPage) : this.totalPage;
    var leftoffset, rightoffset;
    leftoffset = this.currentPage - start;
    leftoffset = leftoffset > 0 ? leftoffset : 0;
    rightoffset = end - this.currentPage;
    rightoffset = rightoffset > 0 ? rightoffset : 0;
    if (leftoffset + rightoffset < this.offsetPage * 2) {
        m = Math.abs(leftoffset - rightoffset);
        if (leftoffset < rightoffset) {
            end = end + m;
        } else {
            start = start - m;
        }
    }
    if (end > this.totalPage) end = this.totalPage;
    if (start < 1) start = 1;
    if (start - 1 >= 2 && this.currentPage - start >= 2) {
        start++;
    }
    if (end + 2 == this.totalPage) {
        end++;
    }
    for (i = start; i <= end && i <= this.totalPage; i++) {
        if (i == 1 && this.currentPage != 1) continue;
        if (i == this.totalPage && this.currentPage != this.totalPage) continue;
        if (i == this.currentPage) {
            pageArr.push(this.Templet.PAGE_CURRENT.replace(/\{pagenum\}/g, i));
        } else {
            pageArr.push(this.Templet.PAGE_NORMAL.replace(/\{pagenum\}/g, i));
        }
    }
    pageHTML = this.Templet.CONTENT.replace(/\{pager\}/g, pageArr.join(''));
    pageHTML = pageHTML.replace(/\{prevdot\}/g, start - 1 > 1 ? this.Templet.PREVDOT_ENABLE : this.Templet.PREVDOT_DISABLE);
    pageHTML = pageHTML.replace(/\{nextdot\}/g, this.totalPage - end > 1 ? this.Templet.NEXTDOT_ENABLE : this.Templet.NEXTDOT_DISABLE);
    pageHTML = pageHTML.replace(/\{first\}/g, (this.currentPage == 1) ? this.Templet.FIRST_DISABLE : this.Templet.FIRST_ENABLE);
    pageHTML = pageHTML.replace(/\{previous\}/g, (this.currentPage == 1) ? this.Templet.PREVIOUS_DISABLE : this.Templet.PREVIOUS_ENABLE);
    pageHTML = pageHTML.replace(/\{next\}/g, (this.currentPage == this.totalPage) ? this.Templet.NEXT_DISABLE : this.Templet.NEXT_ENABLE);
    pageHTML = pageHTML.replace(/\{last\}/g, (this.currentPage == this.totalPage) ? this.Templet.LAST_DISABLE : this.Templet.LAST_ENABLE);
    pageHTML = pageHTML.replace(/\{goinput\}/g, this.Templet.GO_PAGE_INPUT);
    pageHTML = pageHTML.replace(/\{gobutton\}/g, this.Templet.GO_PAGE_BUTTON);
    pageHTML = pageHTML.replace(/\{summary\}/g, this.Templet.SUMMARY);
    pageHTML = pageHTML.replace(/\{pagecount\}/g, this.Templet.PAGE_COUNT);
    pageHTML = pageHTML.replace(/\{id\}/g, this.id);
    pageHTML = pageHTML.replace(/\{begin\}/g, this.Templet.BEGIN);
    pageHTML = pageHTML.replace(/\{totpage\}/g, this.totalPage);
    pageHTML = pageHTML.replace(/\{curpg\}/g, this.currentPage);
    pageHTML = pageHTML.replace(/\{pagenum\}/g, this.currentPage);
    pageHTML = pageHTML.replace(/\{totalcnt\}/g, this.totalCnt);
    if (this.totalPage <= 1 && this.alwayShow == false) {
        this.eleContainer.style.display = (this.hideEmpty ? 'none' : '');
    } else {
        this.eleContainer.style.display = '';
    }
    this.eleContainer.innerHTML = pageHTML;
    for (i = start; i <= end; i++) {
        if (aBtn = $('pager_num_' + this.id + '_' + i)) {
            QZONE.event.addEvent(aBtn, 'click', QZONE.event.bind(this, 'goPage', i));
        }
    }
    var self = this;
    if (aBtn = $('pager_first_' + this.id)) QZONE.event.addEvent(aBtn, 'click', QZONE.event.bind(this, 'goPage', 1, this.pageSize));
    if (aBtn = $('pager_previous_' + this.id)) QZONE.event.addEvent(aBtn, 'click', QZONE.event.bind(this, 'goPage', this.currentPage - 1, this.pageSize));
    if (aBtn = $('pager_next_' + this.id)) QZONE.event.addEvent(aBtn, 'click', QZONE.event.bind(this, 'goPage', this.currentPage + 1, this.pageSize));
    if (aBtn = $('pager_last_' + this.id)) QZONE.event.addEvent(aBtn, 'click', QZONE.event.bind(this, 'goPage', this.totalPage, this.pageSize));
    if (aForm = $('pager_form_' + this.id)) {
        aForm.onsubmit = function() {
            if (self.checkPage()) {
                var $ele = $e('#pager_input_' + self.id);
                var ijumppage = QZFL.string.trim($ele.getVal());
                self.goPage(ijumppage);
                return false;
            }
            return false;
        };
    }
};
Live.Pager.prototype.goPage = function(page) {
    page = parseInt(page, 10);
    if (isNaN(page)) page = 1;
    if (page < 1) {
        page = 1;
    } else if (page > this.totalPage) {
        page = this.totalPage;
    }
    this.previousPage = this.currentPage;
    this.currentPage = page;
    Live.event.preventDefault();
    if (typeof this.onTurnPage == 'function') {
        if (!this.onTurnPage(this.currentPage, this.pageSize)) {
            return false;
        }
    }
    this.fillPager();
    return false;
}
Live.Pager.prototype.checkPage = function() {
    var $ele = $e('#pager_input_' + this.id);
    var ijumppage = QZFL.string.trim($ele.getVal());
    if (ijumppage.length == 0) {
        this.showError("您未输入页码，请输入数字页码！");
        $ele.focus();
        $ele.elements[0].select();
        return false;
    }
    if (/^\d+$/.test(ijumppage) == false) {
        this.showError("您输入的页码不正确，请重新输入数字页码！");
        $ele.elements[0].focus();
        $ele.elements[0].select();
        return false;
    }
    ijumppage = parseInt(ijumppage, 10);
    if (ijumppage <= 0 || ijumppage > this.totalPage) {
        this.showError("您输入的页码不存在，请重新输入数字页码！");
        $ele.elements[0].focus();
        $ele.elements[0].select();
        return false;
    }
    return true;
}
Live.Pager.prototype.showError = function(msg) {
    alert(msg);
}
Live.Pager.prototype.refresh = function() {
    this.goPage(this.currentPage);
}
Live.TabShow = function() {
    this.config = {
        tabItems: null,
        contentItems: null,
        getType: "ajax",
        ajaxAttr: "rel",
        tabShowCss: "current",
        mouseEvt: "mouseover",
        mouseDelay: 300,
        enableClick: true,
        callback: null,
        jsonInterval: 0,
        jsonpFun: null,
        isReturnFalse: true,
        showCss: null,
        hideCss: null,
        afterShowContent: null,
        defaultIndex: 0,
        foceLoad: false
    }
    _timer = [];
};
Live.TabShow.prototype = {
    init: function(_config) {
        for (var prop in _config) {
            this.config[prop] = _config[prop];
        }
        var self = this;
        if (this.config.mouseEvt == "mouseover") {
            this.config.tabItems.each(function(el, i) {
                var $el = $e(el);
                $el.attr("hideFocus", "true");
                $el.bind("mouseover", function() {
                    _timer[0] = setTimeout(function() {
                        self.change(i);
                    }, self.config.mouseDelay);
                });
                $el.bind("mouseout", function() {
                    if (_timer && _timer[0] != -1) {
                        clearTimeout(_timer[0]);
                        _timer[0] = -1;
                    }
                });
                if (self.config.enableClick) {
                    $e(el).bind("click", function() {
                        self.change(i);
                        if (self.config.isReturnFalse == true) return false;
                    });
                }
            });
        } else {
            this.config.tabItems.each(function(el, i) {
                if (typeof el == "number") {
                    var tmp = el;
                    el = i;
                    i = tmp;
                }
                $e(el).bind(self.config.mouseEvt, function() {
                    self.change(i);
                });
            });
        }
        if (this.config.defaultIndex >= 0) {
            this.change(this.config.defaultIndex);
        }
    },
    change: function(index) {
        var contentItemsCnt = this.config.contentItems.size();
        if (contentItemsCnt != 1 && (index < 0 || index > contentItemsCnt - 1)) return;
        var $content = contentItemsCnt == this.config.tabItems.size() ? this.config.contentItems.get(index) : this.config.contentItems.get(0);
        var $tab = this.config.tabItems.get(index);
        var self = this;
        if (this.config.getType == "ajax" || this.config.getType == "html" || this.config.getType == "json" || this.config.getType == "jsonp" || this.config.getType == "script") {
            if ( !! this.config.foceLoad || contentItemsCnt != this.config.tabItems.size() || Live.string.trim($content.html()).length == 0) {
                if (this.config.getType == "ajax" || this.config.getType == "html") {
                    $content.load(this.config.tabItems.get(index).attr(this.config.ajaxAttr), function() {
                        self.config.callback($content, {}, $tab);
                        self.showContent(index);
                        self.afterShowContentHandle($tab, $content, index);
                        return;
                    });
                } else if (this.config.getType == "json") {
                    $j.getJson(this.config.tabItems.get(index).attr(this.config.ajaxAttr), this.config.jsonInterval, function(json) {
                        if (typeof self.config.callback == "function") {
                            self.config.callback($content, json, $tab);
                            self.showContent(index);
                            self.afterShowContentHandle($tab, $content, index);
                        }
                    });
                } else if (this.config.getType == "jsonp") {
                    $j.ajax({
                        dataType: "jsonp",
                        url: self.config.tabItems.get(index).attr(this.config.ajaxAttr),
                        jsonpFunName: self.config.jsonpFun,
                        jsonCache: self.config.jsonInterval,
                        success: function(json) {
                            self.config.callback($content, json, $tab);
                            self.showContent(index);
                            self.afterShowContentHandle($tab, $content, index);
                        }
                    });
                } else if (this.config.getType == "script") {
                    $j.ajax({
                        dataType: "script",
                        url: self.config.tabItems.get(index).attr(this.config.ajaxAttr),
                        jsonCache: self.config.jsonInterval,
                        success: function(json) {
                            self.config.callback($content, {}, $tab);
                            self.showContent(index);
                            self.afterShowContentHandle($tab, $content, index);
                        }
                    });
                }
            } else {
                self.showContent(index);
                self.afterShowContentHandle($tab, $content, index);
            }
        } else {
            self.showContent(index);
            self.afterShowContentHandle($tab, $content, index);
        }
    },
    showContent: function(index) {
        if ( !! this.config.showCss || !! this.config.hideCss) {
            this.config.tabItems.attr("className", this.config.hideCss);
            this.config.tabItems.get(index).attr("className", this.config.showCss);
        } else {
            this.config.tabItems.removeClass(this.config.tabShowCss);
            var $item = this.config.tabItems.get(index);
            if (typeof $item.addClass == "function") {
                this.config.tabItems.get(index).addClass(this.config.tabShowCss);
            } else {
                $j($item).addClass(this.config.tabShowCss);
            }
        }
        if (this.config.contentItems.size() == this.config.tabItems.size()) {
            this.config.contentItems.hide();
            var cur = this.config.contentItems.get(index);
            if (cur.show) {
                cur.show();
            } else {
                cur = $j(cur);
                cur.show();
            }
            var $img = cur.find("img[_src]");
            $img.each(function(e) {
                if (!e.getAttribute("src")) {
                    e.style.visibility = "";
                    e.src = e.getAttribute("_src");
                    e.removeAttribute("_src");
                }
            });
        }
    },
    afterShowContentHandle: function($tab, $content, index) {
        if (typeof this.config.afterShowContent == "function") {
            this.config.afterShowContent($tab, $content, index);
        }
    }
};
Live.SimpleImgShow = function() {
    this.config = {
        showCnt: 6,
        items: null,
        playRight: null,
        playLeft: null,
        curPage: 0,
        disCss: "over",
        leftDisCss: null,
        rightDisCss: null,
        showImgOnInit: true,
        defaultIndex: 0,
        isPolish: true,
        isLoopPlay: false,
        onchange: null
    }
}
Live.SimpleImgShow.prototype = {
    init: function(_config) {
        for (var prop in _config) {
            this.config[prop] = _config[prop];
        }
        var self = this;
        this.config.playRight.attr("hideFocus", "true");
        this.config.playRight.bind("mouseup", function() {
            self.moveR();
        });
        this.config.playLeft.attr("hideFocus", "true");
        this.config.playLeft.bind("mouseup", function() {
            self.moveL();
        });
        if (this.config.defaultIndex >= 0) {
            this.show(this.config.defaultIndex);
        }
    },
    play: function(offset) {
        var istart = 0,
            iend = 0;
        if (offset < 0 && this.config.curPage == 0) {
            if ( !! this.config.isLoopPlay) {
                istart = (Math.ceil(this.config.items.size() / this.config.showCnt) - 1) * this.config.showCnt + offset;
                iend = Math.ceil(this.config.items.size() / this.config.showCnt) * this.config.showCnt + offset - 1;
            } else {
                return;
            }
        }
        if (offset > 0 && this.config.curPage == Math.ceil(this.config.items.size() / this.config.showCnt) - 1) {
            if ( !! this.config.isLoopPlay) {
                istart = offset;
                iend = this.config.showCnt + offset - 1;
            } else {
                return;
            }
        }
        if ((offset < 0 && this.config.curPage == 0) || (offset > 0 && this.config.curPage == Math.ceil(this.config.items.size() / this.config.showCnt) - 1)) {
            null;
        } else {
            istart = this.config.curPage * this.config.showCnt + offset;
            iend = (this.config.curPage + 1) * this.config.showCnt + offset - 1;
        }
        istart = istart < 0 ? 0 : istart;
        iend = iend > this.config.items.size() - 1 ? this.config.items.size() - 1 : iend;
        if ( !! this.config.isPolish) {
            if (iend - istart + 1 < this.config.showCnt) {
                istart = istart - (this.config.showCnt - (iend - istart)) + 1;
            }
        }
        this.showBySE(istart, iend, offset);
    },
    showBySE: function(istart, iend, offset) {
        for (var i = istart; i <= iend; i++) {
            var $item = this.config.items.get(i);
            if (!$item) return;
            if ( !! this.config.showImgOnInit) {
                var $img = $item.find("img");
                if (!$img.attr("src")) {
                    $img.attr("src", $img.attr("_src"));
                }
            }
            $item.show();
        }
        for (var i = 0; i < istart; i++) {
            this.config.items.get(i).hide();
        }
        for (var i = iend + 1, len = this.config.items.elements.length; i < len; i++) {
            this.config.items.get(i).hide();
        }
        if (offset > 0) {
            if (this.config.curPage == Math.ceil(this.config.items.size() / this.config.showCnt) - 1) {
                this.config.curPage = 0;
            } else {
                this.config.curPage += Math.floor(offset / this.config.showCnt);
            }
        } else if (offset < 0) {
            if (this.config.curPage == 0) {
                this.config.curPage = Math.ceil(this.config.items.size() / this.config.showCnt) - 1
            } else {
                this.config.curPage -= Math.floor(Math.abs(offset) / this.config.showCnt);
            }
        }
        this.setBtn();
        if (typeof this.config.onchange == "function") {
            this.config.onchange(istart, iend, this.config.curPage);
        }
    },
    show: function(tabidx) {
        var istart = 0,
            iend = 0,
            itemSize = this.config.items.size(),
            totalPage = Math.ceil(itemSize / this.config.showCnt),
            offset;
        if (tabidx > 0 && tabidx == (totalPage - 1) && !! this.config.isPolish) {
            iend = itemSize - 1;
            istart = itemSize - this.config.showCnt;
        } else {
            istart = tabidx * this.config.showCnt;
            iend = istart + this.config.showCnt - 1;
        }
        offset = istart - this.config.curPage * this.config.showCnt;
        this.showBySE(istart, iend, offset);
    },
    moveR: function() {
        this.play(this.config.showCnt);
    },
    moveL: function() {
        this.play(-1 * this.config.showCnt);
    },
    setBtn: function() {
        if (this.config.curPage <= 0) {
            if ( !! this.config.leftDisCss) {
                this.config.playLeft.addClass(this.config.leftDisCss);
            } else {
                this.config.playLeft.addClass(this.config.disCss);
            }
        } else {
            if ( !! this.config.leftDisCss) {
                this.config.playLeft.removeClass(this.config.leftDisCss);
            } else {
                this.config.playLeft.removeClass(this.config.disCss);
            }
        }
        if (this.config.curPage == Math.ceil(this.config.items.size() / this.config.showCnt) - 1) {
            if ( !! this.config.rightDisCss) {
                this.config.playRight.addClass(this.config.rightDisCss);
            } else {
                this.config.playRight.addClass(this.config.disCss);
            }
        } else {
            if ( !! this.config.rightDisCss) {
                this.config.playRight.removeClass(this.config.rightDisCss);
            } else {
                this.config.playRight.removeClass(this.config.disCss);
            }
        }
    }
};
if (typeof(Live.common) == "undefined") {
    Live.common = {};
}
Live.SearchBox = function() {
    this.config = {
        defaultTxt: "请输入关键词",
        inputBox: $e("#iWord"),
        sugSelector: $e("#sgt_list"),
        searchBtn: $e("#sbutton"),
        suggestCgi: Live.SearchBox.search_suggest,
        searchCgi: Live.SearchBox.search_cgi,
        searchForm: document.sform,
        sugCover: $e("#mod_keywords_list"),
        elStag: $e("#searchbox_hid_stag"),
        elTj2btn: $e("#searchbox_hid_tj2btn"),
        defaultCls: "mod_search_txt",
        focusCls: "onfocus",
        showSuggest: true,
        callback: {
            onInputboxFocus: Live.emptyFn,
            onInputboxBlur: Live.emptyFn
        }
    };
    this.selectedIndex = -1;
    this.itemsCount = 0;
    this.timer = [];
    this.hadModify = false;
    if (arguments.length === 1 && QZFL.lang.isHashMap(arguments[0])) {
        Live.object.extend(this.config, arguments[0]);
    }
}
Live.SearchBox.search_cgi = "http://v.qq.com/search.html";
Live.SearchBox.search_suggest = "http://ncgi.video.qq.com/tvideo/fcgi-bin/smartbox?plat=2&ver=0&num=10&otype=json&query=";
Live.SearchBox.prototype = {
    init: function(_conf) {
        _conf = _conf || {};
        Live.object.extend(this.config.callback, _conf.callback);
        Live.object.extend(this.config, _conf);
        var me = this;
        if (this.config.defaultTxt != QZFL.string.trim(this.config.inputBox.val())) {
            this.getDefauKeyword();
        }
        if (QZFL.lang.isElement(this.config.searchForm)) {
            this.config.searchForm.action = this.config.searchCgi;
            this.config.searchForm.onsubmit = function() {
                if (!me.onBeforeSubmit()) {
                    return false;
                }
                return me.go();
            }
        }
        if (this.config.showSuggest) {
            this.initSmartBox();
            this.bindListClickEvt();
        }
    },
    getDefauKeyword: function() {
        var $me = this;
        QZFL.Storage.get("txv_search_keyword", function(v) {
            if (QZFL.lang.isString(v) && v) {
                v = v.split("|");
                $me.config.defaultTxt = QZFL.string.filterAngAndQt(v[0]);
            }
        });
    },
    isSupportPlaceholder: (function() {
        var ret = null;
        return function() {
            if (typeof ret != "boolean") {
                ret = 'placeholder' in document.createElement('input');
            }
            return ret;
        }
    })(),
    submit: function() {
        if (this.go()) {
            this.config.searchForm.submit();
        }
    },
    go: function() {
        var val = QZFL.string.trim(this.config.inputBox.val());
        if (val == "" || val == "请输入关键词") {
            return false;
        }
        if (document.charset != 'utf-8' && Live.userAgent.ie) {
            var charset = document.charset;
            document.charset = 'utf-8';
            setTimeout(function() {
                document.charset = charset;
            }, 0);
        }
        this.config.searchForm.action = this.search_cgi || this.config.searchCgi;
        return true;
    },
    onBeforeSubmit: function() {
        return true;
    },
    resetInputBox: function(resetTxt) {
        var $el = this.config.inputBox;
        var v = QZFL.string.trim($el.val());
        if (v == "" || v == this.config.defaultTxt) {
            if (resetTxt) {
                $el.val(this.config.defaultTxt);
            }
        }
        $el.removeClass(this.config.focusCls);
    },
    onKeyup: function(e) {
        var me = this;
        if (e.keyCode == 38 || e.keyCode == 40) {
            clearTimeout(me.timer[0]);
            return;
        }
        this.timer[0] = setTimeout(function() {
            clearTimeout(me.timer[0]);
            me.selectedIndex = -1;
            me.getSuggest();
        }, 300);
    },
    onKeydown: function(e) {
        this.resetInputBox(false);
        this.config.inputBox.addClass(this.config.focusCls);
        if (e.keyCode == 38) {
            this.choose("up", true);
        } else if (e.keyCode == 40) {
            this.choose("down", true);
        }
    },
    onSmartBoxBlur: function() {
        this.hideSelector();
        this.resetInputBox(true);
        typeof this.config.callback.onInputboxBlur == 'function' && this.config.callback.onInputboxBlur();
    },
    initSmartBox: function() {
        var me = this,
            $el = this.config.inputBox;
        $el.bind("keyup", function(e) {
            me.onKeyup(e);
            me.hadModify = true;
        });
        $el.bind("keydown", function(e) {
            me.onKeydown(e);
            me.hadModify = true;
        });
        $el.bind("blur", function() {
            me.onSmartBoxBlur();
        });
        $el.bind("focus", function() {
            var v = QZFL.string.trim(this.value);
            if (v == me.config.defaultTxt && (me.config.defaultTxt == "请输入关键词" || !me.hadModify)) {
                this.value = "";
            } else {
                $el.select();
            }
            $el.addClass("onfocus");
            typeof me.config.callback.onInputboxFocus == 'function' && me.config.callback.onInputboxFocus();
        });
        $el.bind("webkitspeechchange", function(evt) {
            QZFL.event.cancelBubble(evt);
            if (evt.results && evt.results.length > 0) {
                this.value = evt.results[0].utterance;
                me.getSuggest();
                me.hadModify = true;
            }
        });
    },
    choose: function(key, fill) {
        fill = fill | false;
        if (typeof key == "string") {
            if (key == "up") {
                if (this.selectedIndex <= 0) {
                    this.selectedIndex = this.itemsCount;
                }
                this.selectedIndex--;
            } else if (key == "down") {
                if (this.selectedIndex >= this.itemsCount - 1) {
                    this.selectedIndex = -1;
                }
                this.selectedIndex++;
            }
        } else if (typeof key == "number") {
            this.selectedIndex = key;
        }
        this.config.sugSelector.find("li.current").removeClass("current");
        var curItem = this.config.sugSelector.find("li:eq(" + this.selectedIndex + ")");
        curItem.addClass("current");
        if ( !! fill) {
            this.setVal(curItem);
        }
    },
    setVal: function(curItem) {
        this.config.inputBox.val(curItem.text());
    },
    hideSelector: function() {
        this.config.sugSelector.html("");
        this.config.sugSelector.hide();
        this.config.sugCover.hide();
        Live.SearchBox.hideSuggestCb.fire();
    },
    getSuggest: function() {
        var me = this;
        var val = QZFL.string.trim(this.config.inputBox.val());
        if (val == "") {
            this.hideSelector();
            return;
        }
        $j.getScript(this.config.suggestCgi + encodeURIComponent(val), function() {
            if (typeof(QZOutputJson) == "undefined" || !QZOutputJson.head || !QZFL.lang.isArray(QZOutputJson.item)) {
                me.hideSelector();
                return;
            }
            me.itemsCount = QZOutputJson.item.length;
            if (me.itemsCount == 0) {
                me.hideSelector();
                return;
            }
            me.renderSuggest(QZOutputJson);
            me.bindListMouseEvt();
            try {
                setTimeout(function() {
                    var height, str = me.config.sugSelector.html();
                    if (str.length > 0) {
                        Live.SearchBox.showSuggestCb.fire();
                        height = me.config.sugSelector.getSize()[1];
                        if (height > 0) {
                            me.config.sugCover.css("height", height + 2 + "px");
                        }
                    }
                }, 25);
            } catch (e) {
                QZFL.console.print(e);
            }
        });
    },
    renderSuggest: function(json) {
        var sb = [],
            config = this.config;
        for (var i = 0, len = json.item.length; i < len; i++) {
            sb.push(["<li><a href='javascript:;' target='_self'>", json.item[i].w, "<\/a><\/li>"].join(""));
        }
        config.sugSelector.html(sb.join(""));
        config.sugSelector.show();
        config.sugCover.show(true);
    },
    getElementIndex: function(el) {
        var i = -1;
        if (QZFL.lang.isElement(el) && QZFL.lang.isElement(el.parentNode)) {
            QZFL.object.each(el.parentNode.childNodes, function(elem, idx) {
                if (el === elem) {
                    i = idx;
                    return false;
                }
            });
        }
        return i;
    },
    onListClick: function(el) {
        var i = this.getElementIndex(el);
        this.choose(i, true);
        this.hideSelector();
        this.submit();
    },
    bindListMouseEvt: function() {
        var me = this,
            $el = this.config.sugSelector;
        $el.find("li").each(function(el, i) {
            QZFL.event.addEvent(el, "mouseover", function() {
                me.choose(i);
                me.config.inputBox.unBind("blur");
            });
            QZFL.event.addEvent(el, "mouseout", function() {
                me.config.inputBox.bind("blur", function() {
                    me.onSmartBoxBlur();
                });
            });
        });
    },
    bindListClickEvt: function() {
        var me = this;
        this.config.sugSelector.undelegate("li", "click").delegate("li", "click", function(e) {
            me.onListClick(this, e);
        }, true);
    }
};
Live.SearchBox.showSuggestCb = new Live.Callback("unique");
Live.SearchBox.hideSuggestCb = new Live.Callback("unique");
Live.SearchBox.addOnShowSelectorCallBack = Live.SearchBox.showSuggestCb.add;
Live.SearchBox.addOnHideSelectorCallBack = Live.SearchBox.hideSuggestCb.add;
Live.ComplexSearchBox = function() {
    Live.SearchBox.call(this);
    this.typemap = {
        DY: 1,
        TV: 2,
        DM: 3,
        MV: 22,
        ZY: 10,
        YC: 103,
        JLP: 9
    };
    this.hotkeyObj = {
        go: "search.search",
        smartBox: "search.smartbox",
        smartBoxStag: "txt.smart_index",
        defaultStag: "txt.index"
    };
}
Live.ComplexSearchBox.prototype = new Live.SearchBox();
QZFL.object.extend(Live.ComplexSearchBox.prototype, {
    onBeforeSubmit: function() {
        var ret = true,
            $stag = this.config.elStag,
            curItem, act;
        if (this.config.sugSelector.html() != "" && this.selectedIndex != -1) {
            curItem = this.config.sugSelector.find("li:eq(" + this.selectedIndex + ")");
            act = curItem.attr("act");
            if (act == "click") {
                Live.tj2.button(this.hotkeyObj.smartBox);
                var url = curItem.attr("playurl");
                if (url && url != "") {
                    window.open(url);
                }
                this.hideSelector();
                ret = false;
            } else {
                $stag.val(this.hotkeyObj.smartBoxStag);
                this.config.elTj2btn.val(this.hotkeyObj.smartBox);
            }
            this.hideSelector();
        } else {
            $stag.val(this.hotkeyObj.defaultStag);
            this.config.elTj2btn.val(this.hotkeyObj.go);
        }
        return ret;
    },
    onListClick: function(el, e) {
        var act = el.getAttribute("act"),
            idx = this.getElementIndex(el),
            $stag = this.config.elStag;
        if (act == "click") {
            Live.tj2.button(this.hotkeyObj.smartBox);
            var url = el.getAttribute("playurl");
            if (url && url != "") {
                window.open(url);
            }
            QZFL.event.preventDefault(e);
            e.returnValue = false;
            this.hideSelector();
            return;
        }
        this.config.elTj2btn.val(this.hotkeyObj.smartBox);
        $stag.val(this.hotkeyObj.smartBoxStag);
        this.choose(idx, true);
        this.hideSelector();
        this.submit();
        QZFL.event.preventDefault(e);
        this.config.elTj2btn.val(this.hotkeyObj.go);
        $stag.val(this.hotkeyObj.defaultStag);
    },
    renderSuggest: function(json) {
        var sitem, bigtypename, siid, bigtypeid, sb = [],
            typemap = this.typemap;
        if (!json || !QZFL.lang.isArray(json.item)) {
            return;
        }
        var vDomain = "http://v.qq.com";
        var tmpUrl = "";
        for (var i = 0; i < json.item.length; i++) {
            sitem = json.item[i];
            bigtypename = sitem["class"];
            siid = sitem["id"];
            bigtypeid = -1;
            if (sitem.ex && sitem.ex.typeid) {
                bigtypeid = parseInt(sitem.ex.typeid, 10);
            }
            if (!(sitem.sharp == "高清" || sitem.sharp == "超清")) {
                sitem.sharp = "";
            }
            if (siid == "") {
                sb.push(['<li act="search"><a href="javascript:;" target="_self"><span class="result_detail"><span class="result_title">', sitem.title, '</span></span></a></li>'].join(""));
            } else {
                switch (bigtypeid) {
                case typemap.DY:
                    {
                        if (sitem.url.indexOf("cover") != -1) {
                            sitem.url = txv.common.getDetailUrl(sitem.id);
                            if (sitem.url.indexOf(vDomain) == -1) {
                                sitem.url = [vDomain, sitem.url].join("");
                            }
                        }
                        sb.push(['<li act="search" playurl="', sitem.url, '"><a href="javascript:;" target="_self"><span class="result_type">', sitem["class"], '</span><span class="result_detail"><span class="result_title">', sitem.title, '</span><span class="result_HD">', sitem.sharp, '</span></span></a> </li>'].join(""));
                        break;
                    }
                case typemap.TV:
                    {
                        if (sitem.url.indexOf("cover") != -1) {
                            sitem.url = txv.common.getDetailUrl(sitem.id);
                            if (sitem.url.indexOf(vDomain) == -1) {
                                sitem.url = [vDomain, sitem.url].join("");
                            }
                        }
                        sb.push(['<li act="search" playurl="', sitem.url, '"><a href="javascript:;" target="_self"><span class="result_type">', sitem["class"], '</span><span class="result_detail"><span class="result_title">', sitem.title, '</span><span class="result_HD">', sitem.sharp, '</span><span class="result_new">', sitem.ex.title, '</span></span></a></li>'].join(""));
                        break;
                    }
                case typemap.MV:
                    {
                        sb.push(['<li act="search" playurl="', sitem.url, '"><a href="javascript:;" target="_self"><span class="result_type">', sitem["class"], '</span><span class="result_detail"><span class="result_title">', sitem.title, '</span><span class="result_singer">歌手：', sitem.ex.title, '</span><span class="result_HD">', sitem.sharp, '</span></span></a></li>'].join(""));
                        break;
                    }
                case typemap.YC:
                case typemap.ZY:
                    {
                        sb.push(['<li act="search" playurl="', sitem.url, '"><a href="javascript:;" target="_self"><span class="result_type">', sitem["class"], '</span><span class="result_detail"><span class="result_title">', sitem.title, '</span></span></a></li>'].join(""));
                        if (sitem.ex && sitem.ex.id) {
                            tmpUrl = txv.common.getDetailUrl(sitem.ex.id, bigtypeid);
                            if (tmpUrl.indexOf(vDomain) == -1) {
                                tmpUrl = [vDomain, tmpUrl].join("");
                            }
                            sb.push(['<li act="click" playurl="', tmpUrl, '"><a href="javascript:;" target="_self"><span class="result_new_info"> - 最新一期 (第', sitem.ex.date.substring(0, 10), '期)</span><span class="result_new_info_detail">', sitem.ex.byname, '</span></a></li>'].join(""));
                            this.itemsCount++;
                        }
                        break;
                    }
                case typemap.JLP:
                    {
                        sb.push(['<li act="search" playurl="', sitem.url, '"><a href="javascript:;" target="_self"><span class="result_type">', sitem["class"], '</span><span class="result_detail"><span class="result_title">', sitem.title, '</span><span class="result_HD">', sitem.sharp, '</span></span></a></li>'].join(""));
                        break;
                    }
                default:
                    {
                        sb.push(['<li act="search" playurl="', sitem.url, '"><a href="javascript:;" target="_self"><span class="result_type">', sitem["class"], '</span><span class="result_detail"><span class="result_title">', sitem.title, '</span></span></a></li>'].join(""));
                        if (sitem.ex && sitem.ex.id) {
                            tmpUrl = txv.common.getDetailUrl(sitem.ex.id, bigtypeid);
                            if (tmpUrl.indexOf(vDomain) == -1) {
                                tmpUrl = [vDomain, tmpUrl].join("");
                            }
                            sb.push(['<li act="click" playurl="', tmpUrl, '"><a href="javascript:;" target="_self"><span class="result_new_info"> - 最新一期 (第', sitem.ex.date.substring(0, 10), '期)</span><span class="result_new_info_detail">', sitem.ex.byname, '</span></a></li>'].join(""));
                            this.itemsCount++;
                        }
                        break;
                    }
                }
            }
        }
        this.config.sugSelector.html(sb.join(""));
        this.config.sugSelector.show();
        this.config.sugCover.css("display", "block");
    },
    setVal: function(curItem) {
        if (curItem.getAttr("act") == "search" || curItem.getAttr("act") == "click") {
            this.config.inputBox.val([curItem.find(".result_title").text(), curItem.find(".result_singer").text().replace(/歌手[:：]/g, ''), curItem.find(".result_type").text().replace(/\(|\)|（|）/g, '')].join(" "));
        }
    }
});
Live.SimpleSearchBox = function() {
    Live.ComplexSearchBox.call(this);
    this.hotkeyObj = {
        go: "search.minisearch",
        smartBox: "search.minismartbox",
        smartBoxStag: "txt.smart_slide",
        defaultStag: "txt.slide"
    };
}
Live.SimpleSearchBox.prototype = new Live.ComplexSearchBox();
QZFL.object.extend(Live.SimpleSearchBox.prototype, {
    renderSuggest: function(json) {
        var sitem, bigtypename, siid, bigtypeid, sb = [],
            typemap = this.typemap;
        if (!json || !QZFL.lang.isArray(json.item)) {
            return;
        }
        var vDomain = "http://v.qq.com";
        var tmpUrl = "";
        for (var i = 0; i < json.item.length; i++) {
            sitem = json.item[i];
            bigtypename = sitem["class"];
            siid = sitem["id"];
            bigtypeid = -1;
            if (sitem.ex && sitem.ex.typeid) {
                bigtypeid = parseInt(sitem.ex.typeid, 10);
            }
            if (!(sitem.sharp == "高清" || sitem.sharp == "超清")) {
                sitem.sharp = "";
            }
            if (siid == "") {
                sb.push(['<li act="search" class="result"><a href="javascript:void(0);">', sitem.title, '</a></li>'].join(""));
            } else {
                switch (bigtypeid) {
                case typemap.DY:
                case typemap.TV:
                case typemap.DM:
                case typemap.JLP:
                    {
                        sb.push(['<li class="result" act="search" playurl="', sitem.url, '"><a href="javascript:void(0);">', sitem.title, '</a><span>', sitem["class"], '</span></li>'].join(""));
                        break;
                    }
                case typemap.MV:
                    {
                        sb.push(['<li class="result" act="search" playurl="', sitem.url, '"><a href="javascript:void(0);">', sitem.title, '</a><i style="display: none;">', sitem.ex.title, '</i><span>', sitem["class"], '</span></li>'].join(""));
                        break;
                    }
                case typemap.YC:
                case typemap.ZY:
                    {
                        sb.push(['<li class="result" act="search" playurl="', sitem.url, '"><a href="javascript:void(0);">', sitem.title, '</a><span>', sitem["class"], '</span></li>'].join(""));
                        if (sitem.ex && sitem.ex.id) {
                            tmpUrl = txv.common.getPlayUrl(sitem.ex.id);
                            if (tmpUrl.indexOf(vDomain) == -1) {
                                tmpUrl = [vDomain, tmpUrl].join("");
                            }
                            sb.push(['<li class="sub"  act="click" playurl="', tmpUrl, '"><a href="javascript:void(0);"><span>最新一期（', sitem.ex.date.substring(0, 10), '）</span><span>', sitem.ex.byname, '</span></a></li>'].join(""));
                            this.itemsCount++;
                        }
                        break;
                    }
                default:
                    {
                        if (sitem.ex && sitem.ex.id) {
                            sb.push(['<li class="result" act="search" playurl="', sitem.url, '"><a href="javascript:void(0);">', sitem.title, '</a><span>', sitem["class"], '</span></li>'].join(""));
                            if (sitem.ex && sitem.ex.id) {
                                tmpUrl = txv.common.getPlayUrl(sitem.ex.id);
                                if (tmpUrl.indexOf(vDomain) == -1) {
                                    tmpUrl = [vDomain, tmpUrl].join("");
                                }
                                sb.push(['<li class="sub"  act="click" playurl="', tmpUrl, '"><a href="javascript:void(0);"><span>最新一期（', sitem.ex.date.substring(0, 10), '）</span><span>', sitem.ex.byname, '</span></a></li>'].join(""));
                                this.itemsCount++;
                            }
                        } else {
                            sb.push(['<li class="result" act="search" playurl="', sitem.url, '"><a href="javascript:void(0);">', sitem.title, '</a><span>', sitem["class"], '</span></li>'].join(""));
                        }
                        break;
                    }
                }
            }
        }
        this.config.sugSelector.html(sb.join(""));
        this.config.sugSelector.show();
        this.config.sugCover.css("display", "block");
    },
    setVal: function(curItem) {
        if (curItem.getAttr("act") == "search") {
            this.config.inputBox.val([curItem.find("a").text(), curItem.find("i").text(), curItem.find("span").text()].join(" "));
        }
    }
});
Live.SearchBox.typedef = {
    DEFAULT: 0,
    COMPLEX: 1,
    SIMPLE: 2
}
Live.SearchBox.defaultInit = function(type, conf) {
    conf = conf || {};
    type = parseInt(type, 10);
    var sb;
    switch (type) {
    case Live.SearchBox.typedef.COMPLEX:
        {
            sb = new Live.ComplexSearchBox();
            break;
        }
    case Live.SearchBox.typedef.SIMPLE:
        {
            sb = new Live.SimpleSearchBox();
            break;
        }
    case Live.SearchBox.typedef.DEFAULT:
    default:
        {
            sb = new Live.SearchBox();
            break;
        }
    }
    sb.init(conf);
}
Live.FloatMenu = function(config) {
    this.mark1 = false;
    this.mark2 = false;
    this.effectShow = false;
    this.effectShowDuration = 200;
    this.effectShowTimer = null;
    this.menuHeight = 0;
    this.showing = false;
    this.isNeedChangeDisplay = true;
    this.area = null;
    this.menu = null;
    this.areaOutdelay = 500;
    this.menuOutdelay = 100;
    this.onShow = null;
    this.onHide = null;
    var self = this,
        isShowing = false;
    for (var prop in config) {
        this[prop] = config[prop];
    }
    if (this.useHtml5()) {
        this.area.bind("click", function(evt) {
            if (isShowing) {
                self.mark1 = false;
                self.mark2 = false;
                self.hideMenu();
                isShowing = false;
            } else {
                self.mark1 = true;
                self.mark2 = true;
                self.showMenu();
                isShowing = true;
            }
            QZFL.event.preventDefault(evt);
        });
    } else {
        if (typeof this.area.onMouseEnter == "function") {
            this.area.onMouseEnter(function() {
                self.mark1 = true;
                self.showMenu();
            });
            this.menu.onMouseEnter(function(e) {
                self.mark2 = true;
                self.showMenu();
            });
            this.area.onMouseLeave(function() {
                self.mark1 = false;
                setTimeout(function() {
                    self.hideMenu();
                }, self.areaOutdelay);
            });
            this.menu.onMouseLeave(function(e) {
                self.mark2 = false;
                setTimeout(function() {
                    self.hideMenu();
                }, self.menuOutdelay);
            });
        } else if (typeof this.area.mouseenter == "function") {
            this.area.mouseenter(function() {
                self.mark1 = true;
                self.showMenu();
            });
            this.menu.mouseenter(function(e) {
                self.mark2 = true;
                self.showMenu();
            });
            this.area.mouseleave(function() {
                self.mark1 = false;
                setTimeout(function() {
                    self.hideMenu();
                }, self.areaOutdelay);
            });
            this.menu.mouseleave(function(e) {
                self.mark2 = false;
                setTimeout(function() {
                    self.hideMenu();
                }, self.menuOutdelay);
            });
        }
    }
};
Live.FloatMenu.prototype = {
    showMenu: function() {
        if (!this.showing && (this.mark1 || this.mark2)) {
            this.showing = true;
            if (this.onShow) {
                this.onShow(this);
            }
            if (this.effectShow) {
                this.setEffectShow(1);
            } else if (this.isNeedChangeDisplay) {
                this.menu.show();
            }
        } else {}
    },
    useHtml5: function() {
        return Live.userAgent.isiPad || Live.userAgent.isiPhone || (/\(ipod;/i.test(navigator.userAgent));
    },
    hideMenu: function() {
        if (!(this.mark1 || this.mark2)) {
            if (this.onHide) {
                this.onHide(this);
            }
            if (this.effectShow) {
                this.setEffectShow(2);
            } else if (this.isNeedChangeDisplay) {
                this.menu.hide();
            }
            this.showing = false;
        }
    },
    setEffectShow: function(type) {
        if (this.menuHeight == 0) {
            this.menuHeight = parseInt(this.menu.css("height"), 10) || 0;
        }
        if (this.menuHeight == 0) {
            return;
        }
        var $me = this,
            per = 10,
            h, v = this.menuHeight / 10;
        clearInterval(this.effectShowTimer);
        switch (type) {
        case 1:
            {
                h = 0;
                this.menu.css("height", "0px");
                this.menu.show();
                this.effectShowTimer = setInterval(function() {
                    h += v;
                    if (h >= $me.menuHeight) {
                        $me.menu.css("height", $me.menuHeight + "px");
                        clearInterval($me.effectShowTimer);
                    } else {
                        $me.menu.css("height", h + "px");
                    }
                }, $me.effectShowDuration / per);
                break;
            }
        case 2:
            {
                h = this.menuHeight;
                this.menu.css("height", h + "px");
                this.effectShowTimer = setInterval(function() {
                    h -= v;
                    if (h <= 0) {
                        $me.menu.hide();
                        clearInterval($me.effectShowTimer);
                    } else {
                        $me.menu.css("height", h + "px");
                    }
                }, $me.effectShowDuration / per);
                break;
            }
        }
    },
    getEventTarget: function(e) {
        e = e || window.event;
        return e.target || e.srcElement;
    }
};
Live.retCode = {
    snid: 0,
    TYPE: {
        SUC: 1,
        ERR: 2
    },
    config: {
        cgi: "http://isdspeed.qq.com/cgi-bin/v.cgi",
        sampling: 1
    },
    commCode: {
        error: 11,
        MQzone_Err: 12
    },
    report: function(appid, rettype, delay, errcode) {
        if (!appid) return;
        if (isNaN(rettype) || rettype < 1) return;
        if (typeof delay == "undefined") return;
        var url = this.config.cgi;
        url += "?flag1=" + appid.toString() + "&flag2=" + rettype.toString() + "&1=" + Live.retCode.config.sampling + "&2=" + delay;
        if (errcode) url += "&flag3=" + errcode.toString();
        var imgSend = new Image();
        imgSend.src = url;
    }
};
Live.RetCode = function(appid) {
    this.appid = appid;
    this.timer = {
        begin: 0,
        end: 0
    }
    this.SNID = Live.retCode.snid;
    this.isReported = false;
    Live.retCode.snid++;
}
Live.RetCode.prototype = {
    begin: function() {
        this.timer.begin = new Date().valueOf();
    },
    end: function() {
        this.timer.end = this.timer.end || new Date().valueOf();
    },
    reprot: function(rettype, retcode) {
        this.report(rettype, retcode);
    },
    report: function(rettype, retcode) {
        if (this.isReported) return;
        this.end();
        var delay = this.timer.end - this.timer.begin;
        Live.retCode.report(this.appid, rettype, delay, retcode);
        this.isReported = true;
    },
    reprotSuc: function() {
        this.reportSuc();
    },
    reportSuc: function() {
        this.report(Live.retCode.TYPE.SUC);
    },
    reportErr: function(errcode) {
        errcode = errcode || Live.retCode.commCode.error;
        this.report(Live.retCode.TYPE.ERR, errcode);
    }
};
Live = Live || {};
Live.txv = {
    isLoaded: false,
    ver: "$Rev: 11343 $",
    lastmodify: "$Date: 2011-09-29 10:37:23 +0800 (周四, 29 九月 2011) $",
    isDebug: false
};
var txv = window.txv = Live.txv;
Live.tj2.keyPrefix = "txv.";
Live.virtualpgv.virtualPath = "/txv/";
if (QZFL && QZFL.object) {
    QZFL.object.extend(Live, {
        inArray: function(elem, array) {
            if (Live.object.getType(array) != "array") return -1;
            for (var i = 0, length = array.length; i < length; i++) {
                if (array[i] === elem) return i;
            }
            return -1;
        }
    });
    if (location.hostname != "v.qq.com" || (QZFL.userAgent.ie && QZFL.userAgent.ie < 8)) {
        QZFL.Storage.helperUrl = "http://v.qq.com/storage_helper.html";
        QZFL.Storage.setOptions({
            share: true
        });
    }
}
Live.txv.path = {
    trimpath: "http://imgcache.qq.com/tencentvideo_v1/js/trimpath.min.js",
    filmCritic: "http://sns.video.qq.com/fcgi-bin/liveportal/getfilmcritic?otype=json",
    userComment: "http://sns.video.qq.com/fcgi-bin/liveportal/comment?otype=json",
    videoInfo: "http://sns.video.qq.com/tvideo/fcgi-bin/video?otype=json",
    videoTagInfo: "http://sns.video.qq.com/tvideo/fcgi-bin/vtag?otype=json",
    search_cgi: "http://v.qq.com/search.html?mi_pagenum=0&ms_search_type=1&ms_sort=0&ms_mode=0&pagetype=3",
    search_suggest: "http://sns.video.qq.com/fcgi-bin/soso_suggestion?sm_category=3&sm_need_num=10&otype=json&sm_key=",
    search_suggest2: "http://ncgi.video.qq.com/tvideo/fcgi-bin/smartbox?plat=2&ver=0&num=10&otype=json&query=",
    pingfencgi: "http://sns.video.qq.com/fcgi-bin/portalscore?otype=json",
    favouritecgi: "http://sns.video.qq.com/fcgi-bin/liveportal/favorite",
    weiboget: "http://sns.video.qq.com/tvideo/fcgi-bin/opmicroblog?otype=json",
    weiboSend: "http://sns.video.qq.com/tvideo/fcgi-bin/pubmblog",
    weiboSend_2: "http://sns.video.qq.com/tvideo/fcgi-bin/livepubmblog4po",
    videoRelate: "http://sns.video.qq.com/tvideo/fcgi-bin/relatedvideo?otype=json",
    singerMVList: "http://sns.video.qq.com/tvideo/fcgi-bin/GetSingerMV?otype=json",
    flashReport: "http://rcgi.video.qq.com/tencentvideo_report?",
    html5_video_cgi: "http://vv.video.qq.com/geturl?otype=json",
    addMvMusicBox: "http://s.plcloud.music.qq.com/fcgi-bin/fcg_mvlist_add.fcg",
    queryMvMusicBox: "http://s.plcloud.music.qq.com/fcgi-bin/fcg_mvlist_isadded.fcg",
    delMvMusicBox: "http://s.plcloud.music.qq.com/fcgi-bin/fcg_mvlist_mod.fcg",
    mvMusicFav: "http://qzone-music.qq.com/fcg-bin/fcg_mvlist_add.fcg",
    videoViewNum: "http://sns.video.qq.com/tvideo/fcgi-bin/viewnum?otype=json",
    getCoverInfo: "http://sns.video.qq.com/fcgi-bin/coverdetail?otype=json",
    hls_video_cgi: "http://vv.video.qq.com/gethls?otype=json&format=2",
    coverViewNum: "http://sns.video.qq.com/fcgi-bin/dlib/dataout_pc?auto_id=55&otype=json",
    videoRecommend: "http://sns.video.qq.com/fcgi-bin/dlib/dataout_pc?auto_id=163&otype=json",
    bokeplayhost: "play.v.qq.com",
    kid_list_autodata: "http://sns.video.qq.com/fcgi-bin/dlib/dataout_pc?auto_id=53&",
    bookcgi: "http://sns.video.qq.com/fcgi-bin/liveportal/nbook",
    getBookCgi: 'http://sns.video.qq.com/fcgi-bin/liveportal/norder',
    recommendCgi: "http://sns.video.qq.com/tvideo/fcgi-bin/spvote",
    queryHistoryRecordCgi: "http://ncgi.video.qq.com/tvideo/fcgi-bin/myview",
    addHistoryRecordCgi: "http://rcgi.video.qq.com/report/myviewreport",
    batchgetscoreCgi: "http://sns.video.qq.com/tvideo/fcgi-bin/batchgetscore",
    batchgetplaymount: "http://sns.video.qq.com/tvideo/fcgi-bin/batchgetplaymount",
    myopnumCgi: "http://ncgi.video.qq.com/tvideo/fcgi-bin/myopnum",
    getVideoListCgi: "http://c.v.qq.com/vuserinfor",
    getUserULikeCgi: "http://sns.video.qq.com/tvideo/fcgi-bin/favVideo",
    userOrderListCgi: "http://pay.video.qq.com/fcgi-bin/order",
    myinterestCgi: "http://ncgi.video.qq.com/tvideo/fcgi-bin/myinterest",
    getVideoRecommonCgi: "http://sns.video.qq.com/tvideo/fcgi-bin/mediacommend",
    getCoverRecommonCgi: "http://sns.video.qq.com/fcgi-bin/dlib/dataout_pc?auto_id=162&",
    getUserUploadVideoNumCgi: "http://c.v.qq.com/uvcount",
    checkIsVip: "http://pay.video.qq.com/fcgi-bin/payvip?otype=json",
    getUserPayTicket: "http://pay.video.qq.com/fcgi-bin/getmyticket?otype=json",
    exchange: "http://pay.video.qq.com/fcgi-bin/cdkey_exchange?otype=json",
    userAllTicket: "http://pay.video.qq.com/fcgi-bin/user_ticket?otype=json",
    web_report: "http://rcgi.video.qq.com/web_report"
};
Live.txv.login = {
    _imgObj: null,
    config: {
        appid: "532001601",
        uinCookie: "uin",
        encuinCookie: "encuin",
        nickCookie: "lw_nick",
        quickLogin: true,
        jumpurl: "",
        clientjumpurl: null,
        showMask: true,
        success: null,
        logout: null,
        rejectLogin: null,
        login_cgi: "http://c.video.qq.com/cgi-bin/login?otype=json",
        show_uniq: false,
        show_content: "",
        login_btn_text: "登录",
        logout_btn_text: "[退出]",
        logout_nick_html: "",
        disLogCallback: false
    },
    _loginEvtList: [],
    _logoutEvtList: [],
    onShowMask: null,
    onHideMask: null,
    _openLoginEvtList: [],
    _closeLoginEvtList: [],
    _clearLoginStatusCbObj: new Live.Callback("unique"),
    addClearLoginStatusCallback: function(fn) {
        this._clearLoginStatusCbObj.add(fn);
    },
    init: function(_config, iscallback) {
        iscallback = !! iscallback;
        Live.object.extend(this.config, _config);
        txv.login.setStatus(iscallback, false);
    },
    ReTryType: {
        openclient: 1,
        reloadcgi: 2
    },
    isOpend: false,
    isLogin: function() {
        return (txv.login.getUin() > 10000);
    },
    setStatus: function(iscallback, reloadnick) {
        if (txv.login.getUin() == 0) {
            txv.login.logout();
            return;
        }
        if (txv.login.getNick() == "" || reloadnick == true) {
            $j.getScript(txv.login.config.login_cgi + "&_=" + new Date().valueOf() + "&g_tk=" + $j.getToken(), function() {
                if (typeof QZOutputJson != "undefined") {
                    if (QZOutputJson.result && QZOutputJson.result.code == "0") {
                        if (typeof QZOutputJson.encuin != "undefined") {
                            if (location.host.indexOf("qq.com") >= 0) {
                                Live.cookie.set(txv.login.config.encuinCookie, QZOutputJson.encuin + "|" + txv.login.getUin(), location.host, "/");
                            }
                        }
                        if (typeof QZOutputJson.nick != "undefined") {
                            if (location.host.indexOf("qq.com") >= 0) {
                                Live.cookie.set(txv.login.config.nickCookie, QZOutputJson.nick + "|" + txv.login.getUin(), location.host, "/");
                            }
                            txv.login.showOnline();
                            if (iscallback != false && typeof txv.login.config.success == "function") {
                                txv.login.config.success();
                                txv.login.config.success = null;
                            }
                            if (!txv.login.config.disLogCallback) {
                                Live.txv.login._fireLoginCallback();
                            }
                            txv.login.config.disLogCallback = false;
                        } else {
                            txv.login.showOnline();
                        }
                    } else if (QZOutputJson.result && QZOutputJson.result.code != "0") {
                        if (QZOutputJson.result.code == "100001") {
                            txv.login.logout();
                        } else if (QZOutputJson.result.code == "2504") {
                            txv.login.showOnline();
                        }
                    }
                } else {
                    txv.login.logout();
                }
            });
            txv.login._imgObj = new Image();
            txv.login._imgObj.src = "http://sns.video.qq.com/tvideo/fcgi-bin/loginstat";
        } else {
            txv.login.showOnline();
            if (iscallback == true && typeof txv.login.config.success == "function") {
                txv.login.config.success();
            }
            Live.txv.login._fireLoginCallback();
        }
    },
    getUin: function() {
        if (Live.string.trim(Live.cookie.get("skey")) == "") {
            return 0;
        }
        var uin = parseInt(Live.cookie.get(txv.login.config.uinCookie).replace(/^o0*/g, ""), 10);
        if (uin <= 10000) {
            return 0;
        }
        return uin;
    },
    getEncUin: function() {
        if (Live.string.trim(Live.cookie.get("skey")) == "") {
            return "";
        }
        var n = Live.cookie.get(txv.login.config.encuinCookie);
        if (n == "") {
            return n;
        }
        var arr = n.split("|");
        if (arr[1] && arr[1] == this.getUin()) return decodeURIComponent(arr[0]);
        return "";
    },
    getNick: function() {
        if (Live.string.trim(Live.cookie.get("skey")) == "") {
            return "";
        }
        var n = Live.cookie.get(txv.login.config.nickCookie);
        if (n == "") {
            return n;
        }
        var arr = n.split("|");
        if (arr[1] && arr[1] == this.getUin()) return decodeURIComponent(arr[0]);
        return "";
    },
    showOnline: function(isShowNick) {
        var login_nick = $e("#login_nick");
        login_nick.text(txv.login.getNick());
        var login_action = $e("#login_action");
        login_action.text(txv.login.config.logout_btn_text);
        login_action.unBind("click");
        login_action.bind("click", txv.login.logout);
    },
    showNotLogin: function() {
        var login_nick = $e("#login_nick");
        login_nick.html(txv.login.config.logout_nick_html);
        var login_action = $e("#login_action");
        login_action.text(txv.login.config.login_btn_text);
        login_action.unBind("click");
        login_action.bind("click", txv.login.openLogin);
    },
    setConfig: function(key, val) {
        if (typeof key == "string" && typeof val != "undefined") {
            txv.login.config[key] = val;
        } else if (typeof key == "object") {
            QZFL.object.extend(txv.login.config, key);
        }
    },
    showMask: function(centerId, w, h, showAtCenter, onScroll) {
        var hookScroll, $center = $e("#" + centerId);
        showAtCenter = typeof showAtCenter == "undefined" ? true : showAtCenter;
        if (!$("mask_layer")) {
            $e("body").create("div", {
                "id": "mask_layer",
                "class": "mask_layer"
            });
            if (Live.userAgent.ie == 6) {
                $e("#mask_layer").css("height", document.documentElement.scrollHeight);
            }
        } else {
            $e("#mask_layer").show();
        }
        if ($center.size() == 0) {
            return;
        }
        if (!txv.common.useHtml5() && showAtCenter) {
            txv.login.showAtCenter($(centerId), w, h);
            if (QZFL.userAgent.ie == 6) {
                onScroll = QZFL.lang.isFunction(onScroll) ? onScroll : QZFL.emptyFn;
                hookScroll = function() {
                    txv.login.showAtCenter($(centerId), w, h);
                    onScroll();
                }
                txv.login.onHideMask = function() {
                    $e(window).unBind('scroll', hookScroll);
                }
                $e(window).bind('scroll', hookScroll);
            } else {
                $center.css("position", "fixed");
            }
        }
        if (typeof txv.login.onShowMask == "function") {
            txv.login.onShowMask();
        }
    },
    hideMask: function() {
        $e("#mask_layer").hide();
        if (typeof txv.login.onHideMask == "function") {
            txv.login.onHideMask();
        }
    },
    openLogin: function(_config) {
        txv.login.isOpend = true;
        Live.object.extend(txv.login.config, _config);
        var url = "",
            loginwin, width = 490,
            heigh = 328,
            jumpurl = txv.login.config.jumpurl,
            clientjumpurl = txv.login.config.clientjumpurl,
            baseUrl = "http://ui.ptlogin2.qq.com/cgi-bin/login?link_target=blank&target=self",
            applogopic = "http://i.gtimg.cn/qqlive/images/20130521/i1369106644_1.jpg?max_age=6048000",
            siteLogo = "";
        if ($("login_win") == null) {
            $e("body").create("div", {
                "id": "login_win",
                "innerHTML": "<iframe name=\"_login_frame_quick_\" id=\"_login_frame_quick_\" frameborder=\"no\" scrolling=\"no\" width=\"100%\" height=\"100%\" src=\"about:blank\"><\/iframe>"
            });
        }
        if (txv.login.config.showMask && !txv.common.useHtml5()) {
            txv.login.showMask("login_win");
        }
        loginwin = $("login_win");
        loginwin.style.display = "none";
        window.__j_url = clientjumpurl;
        if (QZFL.userAgent.isiPhone) {
            baseUrl += "&style=8&hln_css=" + encodeURIComponent(applogopic);
            width = 320;
            heigh = 475;
        } else if (QZFL.userAgent.android) {
            baseUrl += "&style=9&hln_css=" + encodeURIComponent(applogopic);
            width = 320;
            heigh = 427;
        } else {
            baseUrl += "&style=11&hln_logo=" + encodeURIComponent(siteLogo);
        }
        url = [baseUrl, "&appid=", txv.login.config.appid, "&f_url=loginerroralert&qlogin_auto_login=0", "&s_url=", escape("http://imgcache.qq.com/liveportal_v1/toolpages/redirect.html?clientjumpurl=" + escape(clientjumpurl || window.location.href) + "&jumpurl=" + jumpurl)].join('');
        $("_login_frame_quick_").src = url;
        txv.login.showAtCenter(loginwin, width, heigh);
        try {
            if (txv.login.isLogin() && Live.cookie.get("skey") != "") {
                Live.tj2.button("LOGIN.UIN_OPEN");
            }
        } catch (err) {}
        txv.log("[openlogin]:uin=" + txv.login.getUin() + ",skey=" + Live.cookie.get("skey"));
        txv.login.clearLoginCookie();
        txv.login._fireOpenLoginCallback();
    },
    showAtCenter: function(loginwin, w, h) {
        if (!loginwin) return;
        var scrhei = document.body.scrollTop;
        w = w || 373;
        h = h || 235;
        if (0 == scrhei) scrhei = document.documentElement.scrollTop;
        var clihei = document.documentElement.clientHeight;
        if (0 == clihei) clihei = document.body.clientHeight;
        loginwin.style.width = w + "px";
        loginwin.style.height = h + "px";
        loginwin.style.top = Live.userAgent.ie != 6 ? "50%" : ((clihei / 2 + scrhei) - h / 2 + "px");
        loginwin.style.left = "50%";
        loginwin.style.marginLeft = -w / 2 + "px";
        loginwin.style.marginTop = Live.userAgent.ie != 6 ? (-h / 2 + "px") : ("0px");
        loginwin.style.position = Live.userAgent.ie != 6 ? "fixed" : "absolute";
        loginwin.style.zIndex = "10001";
        loginwin.style.display = "block";
        loginwin.style.padding = "0px";
        loginwin.style.backgroundColor = "#ffffff";
        if (txv.common.useHtml5()) {
            document.documentElement.scrollTop = 0;
        }
    },
    clearLoginCookie: function() {
        Live.cookie.set(txv.login.config.nickCookie, "", location.host, "/", -24);
        Live.cookie.set(txv.login.config.encuinCookie, "", location.host, "/", -24);
        Live.cookie.set("skey", "", ".qq.com", "/", -24);
        txv.login.showNotLogin();
        this._clearLoginStatusCbObj.fire();
    },
    logout: function(evt) {
        txv.login.clearLoginCookie();
        if (typeof txv.login.config.logout == "function") {
            txv.login.config.logout(evt);
        }
        Live.txv.login._fireLogoutCallback(evt);
    },
    addLoginCallback: function(fn) {
        if (typeof fn == "function" && Live.inArray(fn, txv.login._loginEvtList) == -1) {
            Live.txv.login._loginEvtList.push(fn);
        }
    },
    addLogoutCallback: function(fn) {
        if (typeof fn == "function" && Live.inArray(fn, txv.login._logoutEvtList) == -1) {
            Live.txv.login._logoutEvtList.push(fn);
        }
    },
    addOpenLoginCallback: function(fn) {
        if (typeof fn == "function" && Live.inArray(fn, txv.login._openLoginEvtList) == -1) {
            Live.txv.login._openLoginEvtList.push(fn);
        }
    },
    addCloseLoginCallback: function(fn) {
        if (typeof fn == "function" && Live.inArray(fn, txv.login._closeLoginEvtList) == -1) {
            Live.txv.login._closeLoginEvtList.push(fn);
        }
    },
    _fireEvt: function(evtList, evt) {
        if (!evtList) return;
        for (var i = 0, len = evtList.length; i < len; i++) {
            if (typeof evtList[i] == "function") {
                evtList[i].call(window, evt);
            }
        }
    },
    _fireLoginCallback: function(evt) {
        Live.txv.login._fireEvt(Live.txv.login._loginEvtList, evt);
    },
    _fireLogoutCallback: function(evt) {
        Live.txv.login._fireEvt(Live.txv.login._logoutEvtList);
    },
    _fireOpenLoginCallback: function(evt) {
        Live.txv.login._fireEvt(Live.txv.login._openLoginEvtList, evt);
    },
    _fireCloseLoginCallback: function(evt) {
        Live.txv.login._fireEvt(Live.txv.login._closeLoginEvtList, evt);
    }
};

function ptlogin2_onResize(width, height) {
    $("_login_frame_quick_").style.height = height + "px";
    $("_login_frame_quick_").style.width = width + "px";
    txv.login.showAtCenter($("login_win"), width, height);
}

function ptlogin2_onClose(isSuc) {
    $e("#login_win").remove();
    txv.login.isOpend = false;
    txv.login.hideMask();
    if (isSuc) {
        ptlogin2_onSuccess();
    } else {
        if (typeof(txv.login.config.rejectLogin) == "function") {
            txv.login.config.rejectLogin();
        }
    }
    txv.login._fireCloseLoginCallback();
}

function ptlogin2_onSuccess() {
    txv.login.setStatus(true, true);
}

function __rdt__() {
    if ( !! __j_url) while (__j_url.indexOf('%') != -1 && __j_url.indexOf('?') == -1) {
        __j_url = unescape(__j_url);
    } else {
        window.location.reload();
    }
    window.location.href = __j_url;
}
Live.txv = Live.txv || {};
Live.txv.log = function(msg) {
    Live.txv.log_arr.push(msg);
    if (txv.log.isdebug == 2) {
        QZFL.console.print(msg);
    }
}
Live.txv.log_arr = [];
Live.txv.logDump = function() {
    if (typeof txv.logDump.render == "function") {
        txv.logDump.render();
    } else {
        $j.getScript("http://" + QZFL.config.domain + "/tencentvideo_v1/js/txv.logdump.min.js", function() {
            txv.logDump.render();
        });
    }
}
Live.txv.trace = function(msg) {
    if (txv.log.isdebug >= 1) {
        QZFL.console.print(msg);
    }
}
Live.txv.dump = function(obj) {
    if (txv.log.isdebug >= 1 && typeof console == "object") {
        console.dir(obj);
    }
}
Live.txv.log.isdebug = -1;
Live.txv.common = {
    rootPath: "",
    conf: {
        needGoToLoginPage: false,
        needShowVipIcon: true,
        needInitPageHotKey: true,
        needWinSafariHack: false,
        isFilmPage: false,
        needInitSearchBar: true,
        alwaysShowMytvMenu: false
    },
    getUrlParam: function(p, u) {
        u = u || document.location.toString();
        var oRegex = new RegExp('[\?&#]' + p + '=([^&#]+)', 'i');
        var oMatch = oRegex.exec(u);
        if (oMatch && oMatch.length > 1) return oMatch[1];
        return '';
    },
    initPage: function(extData) {
        extData = extData || {};
        var playPageFlag = QZFL.object.getType(extData) == "object" && extData.playPageFlag ? extData.playPageFlag : false,
            modV2MainHead = $("txvLeftSitemap"),
            isV2 = !! modV2MainHead || !! $("headSimpleV2"),
            $historyLink;
        txv.log("init page");
        if ( !! txv.common.initPageFlag) {
            return;
        }
        if (location.host != "film.qq.com") {
            txv.vip.changeErrHandle(Live.emptyFn);
        }
        Live.object.extend(txv.common.conf, extData);
        txv.common.initPageFlag = true;
        if (this.conf.needWinSafariHack) {
            this.winSafariHack();
        }
        if (isV2) {
            setTimeout(function() {
                txv.common.initMainNavSubNav();
            }, 0);
            if (txv.common.useHtml5()) {
                if (QZFL.userAgent.isiPhone) {
                    QZFL.css.addClassName(document.body, "iphone");
                } else if (QZFL.userAgent.isiPad) {
                    QZFL.css.addClassName(document.body, "ipad");
                }
                $historyLink = $e("#toggleHistory");
                $historyLink.attr("target", "self")
                $historyLink.attr("href", "javascript:;");
            } !! modV2MainHead ? txv.common.initMainNavV2() : txv.common.initSimpHeadV2(playPageFlag);
            this.initSearchBar(playPageFlag, !! modV2MainHead, isV2);
            this.initPersonalCenter();
            this.initNavPop(isV2);
            txv.headfavorite.init();
        } else {
            txv.common.initMytvMenu(playPageFlag);
        }
        txv.login.init(( !! extData && !! extData.login) ? extData.login : null, true);
        txv.history.init(playPageFlag, isV2);
        if (txv.common.conf.needShowVipIcon) {
            txv.common.initVipIcon();
        }
        if (txv.common.isWebqq()) {
            $e(".mod_login").hide();
            $e("a").attr("target", "_self");
            var searchform = document.sform;
            if ( !! searchform) {
                searchform.target = "_self";
            }
        }
        Live.lazyLoad.init(["img"]);
        txv.common.initPageHotKey(isV2);
        Live.QTAG.init();
        Live.openviplinkreport.init();
        if ( !! extData && extData.watch == true) {
            Live.tj2.watch();
        }
        if ( !! extData && !! extData.tj2 && !! extData.tj2.forbidden) {} else {
            Live.tj2.pv(( !! extData && !! extData.tj2) ? extData.tj2 : null);
        }
        txv.common.getNickInterval();
    },
    initMainNavV2: function() {
        var isSupportTransition = txv.common.isSupportedCSSProperty("transition"),
            navMenu, $nav = $e("#txvLeftSitemap"),
            isAlwayShowNav = true,
            showNavCls = "unfold",
            $menu, h = 39,
            menu, $toggle, $modPop, mod, showCls = "hover";

        function toggleNav(isShow) {
            var $link = $e("#modTxvMainHeadLink");
            if (isShow && !txv.common.useHtml5()) {
                QZFL.css.addClassName($("toggleShowNav"), "cur");
                $link.attr("href", "http://v.qq.com");
                $link.attr("title", "首页");
                $link.text("首页");
            } else {
                QZFL.css.removeClassName($("toggleShowNav"), "cur");
                $link.attr("href", "javascript:;");
                $link.attr("title", "分类导航");
                $link.text("分类导航");
            }
        }
        if (txv.common.useHtml5() || !isSupportTransition) {
            if (!$nav.hasClass(showNavCls)) {
                $menu = $nav.find(".mod_nav_site");
                isAlwayShowNav = false;
                h = $menu.find("li").size() * h;
                navMenu = new Live.FloatMenu({
                    menu: $menu,
                    area: $e("#toggleShowNav"),
                    areaOutdelay: 100,
                    effectShow: true,
                    effectShowDuration: 100,
                    menuHeight: h,
                    onShow: function(obj) {
                        txv.common.btnTj("mainnav.hover");
                        toggleNav(true);
                        $nav.addClass(showNavCls);
                    },
                    onHide: function(obj) {
                        $nav.removeClass(showNavCls);
                        toggleNav(false);
                    }
                });
            }
            $toggle = $e("#modHeadToggleDownloadPop");
            $modPop = $e("#modHeadDownloadPop");
            mod = $("modHeadDownload");
            menu = new Live.FloatMenu({
                menu: $modPop,
                area: $toggle,
                areaOutdelay: 100,
                isNeedChangeDisplay: false,
                onShow: function(obj) {
                    QZFL.css.addClassName(mod, showCls);
                },
                onHide: function(obj) {
                    QZFL.css.removeClassName(mod, showCls);
                }
            });
        }
        if (isAlwayShowNav == false || !$nav.hasClass(showNavCls)) {
            $nav.onMouseEnter(function(evt) {
                txv.common.btnTj("mainnav.hover");
                toggleNav(true);
            });
            $nav.onMouseLeave(function(evt) {
                toggleNav(false);
            });
        }
        txv.common.initTopBanner();
    },
    initTopBanner: function() {
        var $mod = $e("#modTopBanner");
        if (txv.common.useHtml5()) {
            $mod.remove();
        } else if ($mod.size() == 1) {
            $mod.show();
            $mod.delegate("a.top_banner_close", "click", function() {
                $mod.remove();
            });
        }
    },
    winSafariHack: function() {
        if (QZFL.userAgent.windows && QZFL.userAgent.safari) {
            QZFL.css.addClassName(document.getElementsByTagName("body").item(0), "win_safari");
        } else {
            this.macSafariAndChromeHack();
        }
    },
    macSafariAndChromeHack: function() {
        if (QZFL.userAgent.macs) {
            if (QZFL.userAgent.safari) {
                QZFL.css.addClassName(document.getElementsByTagName("body").item(0), "mac_safari");
            } else if (QZFL.userAgent.chrome) {
                QZFL.css.addClassName(document.getElementsByTagName("body").item(0), "mac_chrome");
            }
        }
    },
    initNavPop: function(isV2) {
        var $modHistory = null,
            $modSearch = null,
            isIe6 = (QZFL.userAgent.ie == 6),
            h, $mod, historyPop, collectPop, smartboxPop, loginPop, tipsPop;
        historyPop = txv.Popmanager.addInstance("historyPop");
        txv.history.addShowHistoryCallback(function() {
            if (isV2 && txv.common.conf.playPageFlag && isIe6) {
                if (!$modHistory) {
                    $modHistory = $e("#history_pop");
                }
                if ($modHistory.find(".pop_timeline_nothing").size()) {
                    $modHistory.find("iframe").css("height", "202px");
                } else {
                    h = $modHistory.attr("clientHeight");
                    if (isNaN(h) || h < 10) {
                        $mod = $e("#modHistoryContent"), h = $mod.find("dt").size() * 22 + $mod.find("dd").size() * 28 + 22 + 40;
                    } else {
                        h = h - (parseInt($modHistory.css("paddingTop"), 10) || 0);
                    }
                    $modHistory.find("iframe").css("height", h + "px");
                }
            }
            historyPop.open();
        });
        txv.history.addHideHistoryCallback(function() {
            historyPop.close();
        });
        collectPop = txv.Popmanager.addInstance("collectPop");
        txv.headfavorite.addShowListCb(function() {
            collectPop.open();
        });
        txv.headfavorite.addHideListCb(function() {
            collectPop.close();
        });
        smartboxPop = txv.Popmanager.addInstance("smartboxPop");
        Live.SearchBox.addOnShowSelectorCallBack(function() {
            var mod;
            if (txv.common.conf.playPageFlag && isIe6) {
                if (!$modSearch) {
                    $modSearch = $e("#modHeadSearchSuggest");
                }
                $modSearch.find("iframe").css("height", QZFL.dom.getSize("mod_keywords_list")[1] + "px");
            }
            smartboxPop.open();
        });
        Live.SearchBox.addOnHideSelectorCallBack(function() {
            smartboxPop.close();
        });
        loginPop = txv.Popmanager.addInstance("loginPop");
        txv.login.addOpenLoginCallback(function() {
            loginPop.open();
        });
        txv.login.addCloseLoginCallback(function() {
            loginPop.close();
        });
        tipsPop = txv.Popmanager.addInstance("tipsPop");
        txv.tips.addOnHideTipsCallBack(function() {
            tipsPop.close();
        });
        txv.tips.addOnShowTipsCallBack(function() {
            tipsPop.open();
        });
    },
    initSimpHeadV2: function(playPageFlag) {
        txv.nav = {};
        txv.nav.myhome = {};

        function onShowMenu() {
            if (QZFL.lang.isFunction(txv.nav.myhome.onShowMenu)) {
                txv.nav.myhome.onShowMenu();
            }
        }

        function onHideMenu() {
            if (QZFL.lang.isFunction(txv.nav.myhome.onHideMenu)) {
                txv.nav.myhome.onHideMenu();
            }
        }
        var $newNav = $e("#modNewSimpleNav"),
            $modChannel = $e("#modNavChannels"),
            $toggle, isSetHeight = false,
            $menu = $modChannel.find(".pop_nav_channels"),
            showCls = "hover",
            navMenu, simplNavMenuPop;
        if ($newNav.size() == 1) {
            simplNavMenuPop = txv.Popmanager.addInstance("simplNavMenuPop");
            $toggle = $e("#modSimpleNavMore");
            navMenu = new Live.FloatMenu({
                menu: $menu,
                area: $toggle,
                areaOutdelay: 100,
                isNeedChangeDisplay: false,
                onShow: function(obj) {
                    onShowMenu();
                    $modChannel.addClass(showCls);
                    if (!isSetHeight && playPageFlag && QZFL.userAgent.ie == 6) {
                        $modChannel.find("iframe").css("height", ($menu.attr("clientHeight") || 100) + "px");
                        isSetHeight = true;
                    }
                    simplNavMenuPop.open();
                },
                onHide: function(obj) {
                    $modChannel.removeClass(showCls);
                    onHideMenu();
                    simplNavMenuPop.close();
                }
            });
        }
        if (playPageFlag) {
            setTimeout(function() {
                QZFL.dom.createElementIn("iframe", $menu.elements[0], true, {
                    src: "about:blank",
                    className: "iframe_mask",
                    frameborder: "0"
                });
            }, 20);
        }
    },
    getAvatar: function(uin, size) {
        size = size || 50;
        return ["http://qlogo", uin % 4 + 1, ".store.qq.com/qzone/", uin, "/", uin, "/", size].join("");
    },
    initPersonalCenter: function() {
        var $modPersonal = $e("#mod_head_user"),
            $modLogin = $e("#modSimpleNavLogin"),
            $modPop = $e("#mod_head_user_content"),
            defaultAvatar, iframe, menu, $modTriggler = $e("#mod_head_user_trigger"),
            $modAvatar = $modTriggler.find("img"),
            $modViplogo = $modPersonal.find("[data-type='viplogo']"),
            showCls = "open",
            mytvPop;
        if ($modPersonal.size() == 0) {
            txv.common.navLoginAdaptor();
            return;
        }
        defaultAvatar = $modAvatar.attr("src");
        mytvPop = txv.Popmanager.addInstance("mytvPop");

        function loginCallback() {
            userAvatar = txv.common.getAvatar(txv.login.getUin(), 50);
            $modAvatar.attr("src", userAvatar);
            txv.vip.isVip(function(isVip) {
                if (isVip) {
                    $modViplogo.removeClass("ico_vip_grey").addClass("ico_vip").show();
                } else {
                    $modViplogo.removeClass("ico_vip").addClass("ico_vip_grey").show();
                }
            });
            if ($modLogin.size() == 1) {
                $modLogin.hide();
                $modPersonal.find("[data-type='nickname']").text(txv.login.getNick());
                $modPersonal.show();
            }
        }

        function logoutCb() {
            $modPersonal.removeClass(showCls);
            $modViplogo.hide();
            $modAvatar.attr("src", defaultAvatar);
            if ($modLogin.size() == 1) {
                $modPersonal.hide();
                $modLogin.show();
            }
            mytvPop.close();
        }
        if (txv.login.isLogin()) {
            loginCallback();
        }
        txv.login.addLoginCallback(loginCallback);
        txv.login.addLogoutCallback(logoutCb);
        txv.login.addClearLoginStatusCallback(logoutCb);
        menu = new Live.FloatMenu({
            menu: $e("#mod_head_user_pop"),
            area: $modTriggler,
            isNeedChangeDisplay: false,
            areaOutdelay: 100,
            onShow: function(obj) {
                if (txv.login.isLogin()) {
                    $modPersonal.addClass(showCls);
                    mytvPop.open();
                }
            },
            onHide: function(obj) {
                if (txv.login.isLogin()) {
                    $modPersonal.removeClass(showCls);
                    mytvPop.close();
                }
            }
        });
        if (txv.common.conf.playPageFlag) {
            iframe = document.createElement("iframe");
            iframe.src = "about:blank";
            iframe.frameborder = "0";
            iframe.className = "iframe_mask";
            iframe.style.height = "196px";
            $modPop.getParent().eq(0).insertBefore(iframe, $modPop.eq(0));
        }
        $modTriggler.onClick(function(evt) {
            if (!txv.login.isLogin()) {
                QZFL.event.preventDefault(evt);
                txv.login.openLogin();
            }
        });
        $e(document).delegate("[data-type='login']", "click", function(evt) {
            txv.login.openLogin();
        }, true).delegate("[data-type='logout']", "click", function(evt) {
            txv.login.logout();
        }, true);
    },
    navLoginAdaptor: function() {
        var $modLogin = $e("#modHeadLogin"),
            $modPersonal = $e("#modHeadPersonal");

        function loginCallback() {
            txv.vip.isVip(function(isVip) {
                txv.common.refreshHeadVipIcon(isVip);
            });
            if ($modLogin.size() == 1) {
                $modLogin.hide();
                $modPersonal.find("[data-type='nickname']").text(txv.login.getNick());
                $modPersonal.show();
            }
        }

        function logoutCb() {
            $modPersonal.hide();
            $modLogin.fadeIn();
        }
        if (txv.login.isLogin()) {
            loginCallback();
        }
        txv.login.addLoginCallback(loginCallback);
        txv.login.addLogoutCallback(logoutCb);
        txv.login.addClearLoginStatusCallback(logoutCb);
        $e(document).delegate("[data-type='login']", "click", function(evt) {
            txv.login.openLogin();
        }, true).delegate("[data-type='logout']", "click", function(evt) {
            txv.login.logout();
        }, true);
    },
    isSupportedCSSProperty: (function() {
        var div = null,
            prefix = 'Khtml O Moz Webkit'.split(' '),
            len = prefix.length;
        return function(prop) {
            var ret = false,
                idx = 0;
            if (!QZFL.lang.isString(prop)) {
                return ret;
            }
            if (!div) {
                div = document.createElement("div");
            }
            if (prop in div.style) {
                ret = true;
            } else if (("-ms-" + prop) in div.style) {
                ret = true;
            } else {
                prop = prop.replace(/^[a-z]/, function(val) {
                    return val.toUpperCase();
                });
                for (; idx < len; idx++) {
                    if ((prefix[idx] + prop) in div.style) {
                        ret = true;
                        break;
                    }
                }
            }
            return ret;
        }
    })(),
    initVipIcon: function(isSetVisibility) {
        var modIconId = "header_vip_icon",
            modIcon = $(modIconId);
        if (!QZFL.lang.isElement(modIcon)) {
            return;
        }

        function loginCallback() {
            txv.vip.isVip(txv.common.refreshHeadVipIcon);
        }
        txv.login.addLogoutCallback(function() {
            isSetVisibility ? QZFL.dom.setStyle(modIcon, "visibility", "hidden") : QZFL.dom.setStyle(modIcon, "display", "none");
            $e("[_type=vipBtnText]").text("开通会员");
        });
        txv.login.addLoginCallback(loginCallback);
        if (txv.login.isLogin()) {
            loginCallback();
        }
    },
    refreshHeadVipIcon: function(isVip) {
        var modIconId = "header_vip_icon",
            modIcon;
        if (txv.common.conf.isFilmPage) {
            modIcon = $(modIconId);
            if (isVip) {
                QZFL.css.removeClassName(modIcon, "icon_notVip");
                QZFL.css.removeClassName(modIcon, "ico_dianying_gray");
                modIcon.setAttribute("title", "会员续费");
                $e("[_type=vipBtnText]").text("会员续费");
            } else {
                QZFL.css.addClassName(modIcon, "icon_notVip");
                modIcon.setAttribute("title", "开通会员");
                $e("[_type=vipBtnText]").text("开通会员");
            }
            QZFL.dom.setStyle(modIcon, "visibility", "");
            QZFL.dom.setStyle(modIcon, "display", "");
        } else {
            if (isVip) {
                $e("[data-type='viplogo']").removeClass("ico_vip_grey").addClass("ico_vip");
            } else {
                $e("[data-type='viplogo']").removeClass("ico_vip").addClass("ico_vip_grey");
            }
        }
    },
    initPageHotKey: function(isV2) {
        if (!this.conf.needInitPageHotKey) {
            return;
        }
        $e(document).undelegate("[_hot]", "click").delegate("[_hot]", "click", function(evt) {
            var hot = "",
                parentNode;
            if (QZFL.lang.isElement(this)) {
                hot = this.getAttribute("_hot");
                if (hot) {
                    txv.common.btnTj(hot);
                }
                Live.QTAG.checkQtag(this, evt);
            }
        }, true);
    },
    initMainNavSubNav: function() {
        var id = "mod_nav_sub_list",
            $modList = $e("#" + id),
            width = 0,
            gap = 0,
            totalWidth, $linkItems = $modList.find("a.nav_itme"),
            sum = $linkItems.size();
        if ($modList.size() == 1 && sum > 0 && $modList.hasClass("mod_nav_sub_adaptive")) {
            totalWidth = $modList.getParent().attr("clientWidth");
            $linkItems.each(function(el) {
                width += el.clientWidth - parseFloat(QZFL.dom.getStyle(el, "paddingLeft")) - parseFloat(QZFL.dom.getStyle(el, "paddingRight"));
            });
            gap = (totalWidth - width) / (sum * 2);
            QZFL.css.insertStyleSheet(id + "_style", '.mod_nav_sub ul li .nav_itme{padding:0 ' + gap + 'px}');
            if ($modList.animate) {
                $j("#mod_nav_sub_list").animate({
                    opacity: 1
                }, 50);
            } else {
                $modList.fadeIn({
                    speed: 20
                });
            }
        }
    },
    initSearchBar: function(playPageFlag, isMainNav, isV2) {
        if (!txv.common.conf.needInitSearchBar) {
            return false;
        }
        var $mod_search = $e("#mod_search"),
            modSearchWord, modSugWrap, form, searchIframeId = "txv_iframe_" + new Date().getTime(),
            isMainNav = typeof(isMainNav) == "boolean" ? isMainNav : QZFL.lang.isElement($("head_main")),
            conf = {},
            type = isMainNav || isV2 ? Live.SearchBox.typedef.COMPLEX : Live.SearchBox.typedef.SIMPLE;
        modSearchWord = $("iWord");
        var time = new Date().getTime();
        if (QZFL.lang.isElement(modSearchWord)) {
            if (modSearchWord.value == "") {
                QZFL.Storage.get("txv_search_keyword", function(v) {
                    if (QZFL.lang.isString(v) && v) {
                        v = v.split("|");
                        modSearchWord.value = QZFL.string.filterAngAndQt(v[0]);
                    }
                });
            } else {
                if (isMainNav) {
                    QZFL.Storage.set("txv_search_keyword", [modSearchWord.value, time].join("|"));
                } else {
                    QZFL.Storage.get("txv_search_keyword", function(v) {
                        if (QZFL.lang.isString(v) && v) {
                            v = v.split("|");
                            if (v[1] + 3600000 < time) {
                                QZFL.Storage.set("txv_search_keyword", [modSearchWord.value, time].join("|"));
                            } else {
                                modSearchWord.value = QZFL.string.filterAngAndQt(v[0]);
                            }
                        }
                    });
                }
            }
        }
        form = $("sform");
        modSugWrap = $("modHeadSearchSuggest");
        Live.SearchBox.addOnShowSelectorCallBack(function() {
            if (playPageFlag && !$(searchIframeId) && QZFL.lang.isElement(modSugWrap)) {
                QZFL.dom.createElementIn("iframe", modSugWrap, true, {
                    className: "iframe_mask",
                    src: "about:blank",
                    id: searchIframeId,
                    frameborder: "0"
                });
            }
            QZFL.dom.setStyle(modSugWrap, "display", "block");
        });
        Live.SearchBox.addOnHideSelectorCallBack(function() {
            QZFL.dom.setStyle(modSugWrap, "display", "none");
        });
        conf = {
            suggestCgi: txv.path.search_suggest2,
            searchCgi: txv.path.search_cgi,
            callback: {
                onInputboxFocus: function() {
                    QZFL.css.addClassName(form, "focus");
                },
                onInputboxBlur: function() {
                    QZFL.css.removeClassName(form, "focus");
                }
            }
        }
        Live.SearchBox.defaultInit(type, conf);
        if (playPageFlag && document.sformFoot) {
            Live.SearchBox.defaultInit(Live.SearchBox.typedef.DEFAULT, {
                searchForm: document.sformFoot,
                inputBox: $e("#iWordFoot"),
                sugSelector: $e("#sgt_list_foot"),
                sugCover: $e("#mod_keywords_list_foot"),
                searchBtn: $e("#sbuttonFoot"),
                defaultCls: "foot_search_txt",
                suggestCgi: txv.path.search_suggest
            });
            if (QZFL.lang.isElement(modSearchWord)) {
                $e("#iWordFoot").val(modSearchWord.value);
            }
        }
    },
    initMytvMenu: function(playPageFlag) {
        var pop = $e("#myhome_pop");
        if (pop.size() == 0) return;
        var myhome = $e("#myhome");
        txv.nav = {};
        txv.nav.myhome = {};
        txv.nav.myhome.onShowMenu = QZFL.emptyFn;
        txv.nav.myhome.onHideMenu = QZFL.emptyFn;
        if (myhome.elements.length) {
            if (playPageFlag) {
                myhome.addClass("border_hack");
                myhome.addClass("user_border_hack");
            }
            var menu = new Live.FloatMenu({
                menu: pop,
                area: myhome.find("h6 a"),
                areaOutdelay: 100,
                onShow: function(obj) {
                    myhome.addClass("open");
                    txv.nav.myhome.onShowMenu();
                },
                onHide: function(obj) {
                    myhome.removeClass("open");
                    txv.nav.myhome.onHideMenu();
                }
            });
        }
    },
    getNickInterval: function() {
        var interTimers = 0,
            retry = 0,
            intertimer = null;

        function _error() {
            if (++retry <= 5) {
                setTimeout(sendget, 60000);
            } else {
                clearInterval(intertimer);
                intertimer = null;
            }
        }

        function sendget() {
            if (txv.login.isLogin()) {
                $j.ajax({
                    url: txv.login.config.login_cgi,
                    dataType: "jsonp",
                    CSRF: true,
                    success: function(json) {
                        if ( !! json && !! json.result && json.result.code == 0) {
                            retry = 0;
                            Live.tj2.button("PTLOGIN.SKEY_INTER." + (interTimers++), "/virtualpage/skey.html");
                        } else {
                            _error();
                        }
                    },
                    error: _error
                });
            }
        }
        intertimer = setInterval(sendget, 1800000);
    },
    bindBtnTj: function() {
        $e("._hotkey").bind("click", function() {
            txv.common.btnTj(this.getAttribute("_hot"));
        });
    },
    btnTj: function(key) {
        Live.tj2.button(key);
    },
    isIframe: function() {
        return (window != top);
    },
    isWebqq: function() {
        if (!txv.common.isIframe()) return false;
        try {
            if (typeof top.webqq != "undefined") {
                return true;
            }
        } catch (e) {
            return false;
        }
    },
    showDevImg: function() {},
    getDetailUrl: function(coverid, typeid) {
        typeid = typeid || 0;
        var pathname = "";
        if (typeid == 0 || Live.inArray(typeid, [1, 2, 98]) >= 0) {
            pathname = "/detail/";
        } else {
            pathname = "/cover/";
        }
        return [txv.common.rootPath, pathname, coverid.charAt(0), "/", coverid, ".html"].join("");
    },
    getPlayUrl: function(id, videoid) {
        if (!id) return "";
        if (id.length > 0 && id === videoid) {
            return txv.common.getPlayUrl(id);
        }
        if (id.length == 15) {
            var str = [txv.common.rootPath, "/cover/", id.charAt(0), "/", id, ".html"].join("");
            if ( !! videoid) {
                str += "?vid=" + videoid;
            }
            return str;
        } else {
            return txv.common.getVideoPlayUrl(id);
        }
    },
    getPrevUrl: function(id, videoid, typeid) {
        if (typeof typeid == "undefined" || !typeid) {
            typeid = 0;
        }
        var str = [txv.common.rootPath, (typeid <= 2 ? "/prev/" : "/cover/"), id.charAt(0), "/", id].join("");
        if ( !! videoid) {
            if (typeid == 2) {
                str += "/" + videoid + ".html";
            } else {
                str += ".html?vid=" + videoid;
            }
        } else {
            str += ".html";
        }
        return str;
    },
    getVideoPlayUrl: function(vid) {
        if (typeof(vid) !== "string" || vid.length < 11) {
            return "";
        }
        return [txv.common.rootPath, "/page/", vid.substr(0, 1), "/", vid.substr(9, 1), "/", vid.substr(10, 1), "/", vid, ".html"].join("");
    },
    getBokePlayUrl: function(vid) {
        if (typeof(vid) !== "string" || vid.length < 11) {
            return "";
        }
        return [txv.common.rootPath, "/boke/page/", vid.substr(0, 1), "/", vid.substr(9, 1), "/", vid.substr(10, 1), "/", vid, ".html"].join("");
    },
    filterUrlPramaVid: function(vid) {
        if ( !! vid) {
            var pVidOk = true;
            var pVids = vid.split("|");
            for (var i = 0; i < pVids.length; i++) {
                var v = pVids[i].split("_");
                if (v[0].length != 11 || (v.length == 2 && isNaN(v[1])) || v.length > 2) {
                    pVidOk = false;
                    break;
                }
            }
            if (pVidOk) {
                return vid;
            } else {
                return "";
            }
        }
        return "";
    },
    getStaticPlayUrl: function(cid, vid) {
        var str = [txv.common.rootPath, "/cover/", cid.charAt(0), "/", cid, ".html?vid=", vid].join("");
        return str;
    },
    getPayUrl: function(cid) {
        return ["/pay/newpay.html?id=", cid].join("");
    },
    getVideoSnap: function(lpszVID, idx) {
        var szPic;
        var uin;
        var hash_bucket = 10000 * 10000;
        var object = lpszVID;
        if (lpszVID.indexOf("_") > 0) {
            var arr = lpszVID.split("_");
            lpszVID = arr[0];
            idx = parseInt(arr[1]);
        }
        var uint_max = 0x00ffffffff + 1;
        var hash_bucket = 10000 * 10000;
        var tot = 0;
        for (var inx = 0; inx < lpszVID.length; inx++) {
            var nchar = lpszVID.charCodeAt(inx);
            tot = (tot * 32) + tot + nchar;
            if (tot >= uint_max) tot = tot % uint_max;
        }
        uin = tot % hash_bucket;
        if (idx == undefined) idx = 0;
        if (idx == 0) {
            szPic = ["http://vpic.video.qq.com/", uin, "/", lpszVID, "_160_90_3.jpg"].join("");
        } else {
            szPic = ["http://vpic.video.qq.com/", uin, "/", lpszVID, "_", "160_90_", idx, "_1.jpg"].join("");
        }
        return szPic;
    },
    getFullUrlPath: function(path) {
        var h = window.location.host;
        if (h == "sns.video.qq.com" || h == "play.v.qq.com" || h == "page.video.qq.com") {
            h = "v.qq.com";
        }
        return [window.location.protocol, "//", h, txv.common.rootPath, path].join("");
    },
    formatVideoTitle: function(tt) {
        var reg1 = /^(\d{2})(\d{2})(\d{2})([^_]+)(_?\d*)$/ig,
            reg2 = /^(\d{4})(\d{2})(\d{2})([^_]+)(_?\d*)$/ig;
        if (!reg2.test(tt) && reg1.test(tt)) {
            tt = tt.replace(reg1, "$4 20$1-$2-$3期");
        }
        return tt;
    },
    useHtml5: function() {
        if (txv.common.getUrlParam("usehtml5") == "true") {
            return true;
        }
        return Live.userAgent.isiPad || Live.userAgent.isiPhone || (/\(ipod;/i.test(navigator.userAgent));
    },
    formatNum: function(num) {
        if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(num)) {
            return num;
        }
        var a = RegExp.$1,
            b = RegExp.$2,
            c = RegExp.$3;
        var re = new RegExp("(\\d)(\\d{3})(,|$)");
        while (re.test(b))
        b = b.replace(re, "$1,$2$3");
        return a + "" + b + "" + c;
    },
    gotoLoginPage: function(url) {
        if (txv.common.conf.needGoToLoginPage) {
            window.location.href = "http://v.qq.com/pay/login.html?j=" + encodeURIComponent(url || location.href);
        } else {
            txv.login.logout();
        }
        if (window.event) {
            window.event.returnValue = false;
        }
    },
    getClassEn: function(typeid) {
        var de = {
            "1": "movie",
            "2": "tv",
            "3": "cartoon",
            "4": "sports",
            "5": "ent",
            "10": "variety",
            "14": "variety",
            "20": "variety",
            "22": "music",
            "24": "finance",
            "9": "doco",
            "23": "news",
            "100": "education"
        }
        return de[typeid] || "";
    },
    getClassChsName: function(typeid) {
        var de = {
            "1": "电影",
            "2": "电视剧",
            "3": "动漫",
            "4": "体育",
            "5": "娱乐",
            "10": "综艺",
            "14": "综艺",
            "20": "综艺",
            "22": "MV",
            "24": "财经",
            "9": "纪录片",
            "23": "新闻",
            "100": "教育"
        }
        return de[typeid] || "";
    },
    isEventSupported: function(eventName) {
        if ("string" != typeof eventName && eventName.length == 0) {
            return false;
        }
        var isSupported = false;
        var TAGNAMES = {
            'select': 'input',
            'change': 'input',
            'propertychange': 'input',
            'input': 'input',
            'submit': 'form',
            'reset': 'form',
            'error': 'img',
            'load': 'img',
            'abort': 'img'
        };
        var el = document.createElement(TAGNAMES[eventName] || 'div');
        if ( !! el) {
            eventName = "on" + eventName;
            isSupported = (eventName in el);
            if (!isSupported) {
                el.setAttribute(eventName, "return;");
                isSupported = typeof el.getAttribute(eventName) == "function";
            }
        }
        return isSupported;
    },
    formatTimeBySec: function(s, formatStr) {
        if (isNaN(s) || !QZFL.lang.isString(formatStr)) {
            return "";
        }
        var ret = {};
        ret.h = Math.floor(s / 3600);
        ret.hh = ret.h < 10 ? ("0" + ret.h) : ret.h;
        ret.m = Math.floor(s / 60) - ret.h * 60;
        ret.mm = ret.m < 10 ? ("0" + ret.m) : ret.m;
        ret.s = s % 60;
        ret.ss = ret.s < 10 ? ("0" + ret.s) : ret.s;
        return formatStr.replace(/{([smh]+)}/g, function(m, key) {
            return typeof(ret[key]) === "undefined" ? m : ret[key];
        });
    },
    strToDate: function(timeStr) {
        var regTime = /^(\d{4})-(\d{2})-(\d{2})(\s+?(\d{2}):(\d{2}):(\d{2}))?$/,
            dateArr, date;
        date = new Date(timeStr);
        if (isNaN(date.getDate())) {
            if (QZFL.lang.isString(timeStr) && (dateArr = timeStr.match(regTime))) {
                if (dateArr[4] && dateArr[4].length > 0) {
                    date = new Date(parseInt(dateArr[1], 10), parseInt(dateArr[2], 10) - 1, parseInt(dateArr[3], 10), parseInt(dateArr[5], 10), parseInt(dateArr[6], 10), parseInt(dateArr[7], 10));
                } else {
                    date = new Date(parseInt(dateArr[1], 10), parseInt(dateArr[2], 10) - 1, parseInt(dateArr[3], 10));
                }
            }
        }
        if (isNaN(date.getDate())) {
            return null;
        }
        return date;
    },
    getFunCallTrace: function() {
        var stack = [],
            caller = arguments.callee.caller;

        function getFunctionName(func) {
            if (typeof func == 'function' || typeof func == 'object') {
                var name = ('' + func).match(/function\s*([\w\$]*)\s*\(/);
            }
            return name && name[1] || "[unknown]";
        }
        while (caller) {
            stack.unshift(getFunctionName(caller));
            caller = caller && caller.caller;
        }
        return stack;
    },
    isNeedGoTo3gWeb: function() {},
    get3gWebPlayUrl: function(url, cb) {
        cb();
    },
    getCoverImgtagHtml: function(tag, positionArr) {
        var str = '',
            tag1Tpl = '<sup class="{param}">{text}</sup>',
            tag2Tpl = '<span class="{param}"><em class="mark_inner">{text}</em></span>',
            tag3Tpl = '<span class="{param}"><em class="mask_txt">{text}</em></span>',
            tag4Tpl = '<sup class="{param}">{text}</sup>';
        positionArr = positionArr || [1, 2, 3, 4];
        if (tag) {
            if (tag.tag_3 && tag.tag_3.id > 0 && QZFL.inArray(3, positionArr) != -1) {
                str += QZFL.string.format(tag3Tpl, tag.tag_3);
            }
            if (tag.tag_4 && tag.tag_4.id > 0 && QZFL.inArray(4, positionArr) != -1) {
                str += QZFL.string.format(tag4Tpl, tag.tag_4);
            }
            if (tag.tag_1 && tag.tag_1.id > 0 && QZFL.inArray(1, positionArr) != -1) {
                str += QZFL.string.format(tag1Tpl, tag.tag_1);
            }
            if (tag.tag_2 && tag.tag_2.id > 0 && QZFL.inArray(2, positionArr) != -1) {
                str += QZFL.string.format(tag2Tpl, tag.tag_2);
            }
        }
        return str;
    }
};
QZFL.object.extend(QZFL.string, {
    filterAngleBrk: function(str) {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },
    filterQuote: function(str) {
        return str.replace(/'/g, "&acute;").replace(/"/g, "&quot;");
    },
    filterAngAndQt: function(str) {
        str = QZFL.string.filterAngleBrk(str);
        str = QZFL.string.filterQuote(str);
        return str;
    }
});
(function() {
    if (txv.log.isdebug == -1) {
        var u = txv.common.getUrlParam("debug"),
            l = -1;
        switch (u) {
        case "true":
        case "2":
            l = 2;
            break;
        case "trace":
        case "1":
            l = 1;
            break;
        }
        txv.log.isdebug = l;
    }
})();
txv.Popmanager = function(name) {
    this.status = txv.Popmanager.StatusDef.CLOSE;
    this.name = name;
    this.switchStatus = function(status) {
        status = parseInt(status, 10);
        if (status == this.status) {
            return;
        }
        var instances = txv.Popmanager.getAllInstances(),
            key, ret;
        switch (status) {
        case txv.Popmanager.StatusDef.CLOSE:
            {
                ret = true;
                for (key in instances) {
                    if (instances[key].getStatus() === txv.Popmanager.StatusDef.OPEN && key != this.getName()) {
                        ret = false;
                        break;
                    }
                }
                if (ret) {
                    txv.Popmanager.onHidePop();
                }
                break;
            }
        case txv.Popmanager.StatusDef.OPEN:
            {
                ret = true;
                for (key in instances) {
                    if (key != this.getName() && txv.Popmanager.StatusDef.OPEN === instances[key].getStatus()) {
                        ret = false;
                        break;
                    }
                }
                if (ret) {
                    txv.Popmanager.onShowPop();
                }
                break;
            }
        }
        this.status = status;
    };
    this.open = function() {
        this.switchStatus(txv.Popmanager.StatusDef.OPEN);
    };
    this.close = function() {
        this.switchStatus(txv.Popmanager.StatusDef.CLOSE);
    };
    this.getStatus = function() {
        return this.status;
    };
    this.getName = function() {
        return this.name;
    };
};
(function() {
    var instances = {},
        showPopCb = new Live.Callback("unique"),
        hidePopCb = new Live.Callback("unique");
    txv.Popmanager.addInstance = function(name) {
        if (!(instances[name] instanceof txv.Popmanager)) {
            instances[name] = new txv.Popmanager(name);
        }
        return instances[name];
    };
    txv.Popmanager.getAllInstances = function() {
        return instances;
    };
    txv.Popmanager.onShowPop = function() {
        showPopCb.fire();
    };
    txv.Popmanager.onHidePop = function() {
        hidePopCb.fire();
    };
    txv.Popmanager.addShowPopCallback = showPopCb.add;
    txv.Popmanager.addHidePopCallback = hidePopCb.add;
    txv.Popmanager.StatusDef = {
        OPEN: 1,
        CLOSE: 2
    };
})();
Live.txv.tips = function(tipTle, tleTxt, cntTxt) {
    this.divName = "ipop";
    this.title = "温馨提示";
    this.showTitle = tleTxt;
    this.showContent = cntTxt;
    this.linkText = "";
    this.linkHref = "";
    this.btnShowText = "";
    this.btnShowHref = "javascript:;";
    this.btnShowClass = "btn_strong"
    this.btnShowTarget = "_self";
    this.btnCloseText = "关闭";
    this.btnCloseClass = "btn_normal";
    this.iconClass = "";
    this.tipsType = txv.tips.ConstTipsType.Message;
    this.needRemind = 0;
    this.needChoose = 0;
    this.textChoose = "";
    this.width = 0;
    this.height = 0;
    this.top = 0;
    this.left = 0;
    this.display = "block";
    this.padding = "0px";
    this.isShowClose = true;
    this.InitPosition();
    this.floatTimer = 2 * 1000;
    this.t_Closer = '<a href="javascript:;" class="mod_pop_close">关闭</a>';
    this._t_Remind = "";
    this.t_Title = "";
    this._t_Choose = "";
    this._t_closeFunc = 0;
    this.showAtCenter = true;
}
Live.txv.tips.ConstTipsType = {
    Warning: 1,
    Message: 2,
    Float: 3
}
Live.txv.tips.prototype = {
    bulitIcon: function() {
        this._Icon = '<div class="icon"><i class="' + this.iconClass + '"></i></div>';
    },
    bulitHeader: function() {
        this.t_Header = ['<div class="mod_pop_hd">'].join('');
        if (QZFL.lang.isString(this.title) && this.title.length > 0) {
            this.t_Header = [this.t_Header, "<h3>", this.title, "</h3>"].join("");
        } else {
            this.t_Header = [this.t_Header, "<h3>", "</h3>"].join("");
        }
        if (this.isShowClose) {
            this.t_Header += this.t_Closer;
        }
        this.t_Header += "</div>";
    },
    bulitContentTitle: function() {
        this._TitleShow = '<h4 class="title">' + this.showTitle + '</h4>';
    },
    bulitContent: function() {
        this._Link = (this.linkText != "") ? ('<a href="' + this.linkHref + '">' + this.linkText + '</a>') : '';
        var arr = ['<div class="cont"><p>', this.showContent, this._Link, "</p>"];
        if (this.needChoose && !! this._t_Choose) {
            arr.push(this._t_Choose);
        }
        if (this.needRemind && !! this._t_Remind) {
            arr.push(this._t_Remind);
        }
        arr.push('</div>');
        this._t_ContentShow = arr.join("");
    },
    bulitNormalTxt: function() {
        this.bulitContentTitle();
        this.bulitContent();
        this._t_TextShow = ['<div class="text">', this._TitleShow, this._t_ContentShow, '</div>'].join("");
    },
    bulitSimpTxt: function() {
        this._t_TextShow = '<div class="text">' + this.showContent + '</div>';
    },
    bulitBtn: function() {
        this._BtnShow = (this.btnShowText != '') ? ('<a class="' + this.btnShowClass + '" href="' + this.btnShowHref + '" target="' + this.btnShowTarget + '"><span>' + this.btnShowText + '</span></a>') : '';
        this._BtnClose = (this.btnCloseText != '') ? ('<a class="' + this.btnCloseClass + '" href="javascript:;"><span>' + this.btnCloseText + '</span></a>') : '';
        this._t_BtnText = (this._BtnShow + this._BtnClose) != '' ? '<div class="mod_pop_ft">' + this._BtnShow + this._BtnClose + '</div>' : '';
    },
    bulitSimpTips: function() {
        this.bulitSimpTxt();
        return ['<div class="mod_hint">', this._Icon, this._t_TextShow, "</div>", this._t_BtnText].join("");
    },
    bulitFloatTips: function() {
        this.bulitSimpTxt();
        return ['<div class="mod_hint">', this._Icon, this._t_TextShow, "</div>"].join("");
    },
    bulitNormalTips: function() {
        this.bulitNormalTxt();
        return [this.t_Header, '<div class="mod_diglog"><div class="diglog_alert"><div class="diglog_alert_inner">', this._Icon, this._t_TextShow, "</div></div></div>", this._t_BtnText].join("");
    },
    setTipsTitle: function(t) {
        if (typeof(t) === "string") {
            this.title = t;
            this.bulitHeader();
        }
    },
    setShowAtCenter: function(showAtcenter) {
        if (typeof showAtcenter == "boolean") {
            this.showAtCenter = showAtcenter;
        }
    }
}
Live.txv.tips.prototype.InitPosition = function() {
    var scrhei = document.body.scrollTop;
    var wid = 373;
    var hei = 235;
    if (this.tipsType === txv.tips.ConstTipsType.Float) {
        var w = (QZFL.userAgent.ie && QZFL.userAgent.ie < 8) ? 20 : 15;
        wid = this.showContent.length * w + 160;
        hei = 110;
    }
    if (0 == scrhei) scrhei = document.documentElement.scrollTop;
    var clihei = document.documentElement.clientHeight;
    if (0 == clihei) clihei = document.body.clientHeight;
    this.width = wid;
    this.height = hei;
    if (this.showAtCenter) {
        this.top = (clihei / 2 + scrhei) - this.height / 2;
        this.left = (document.body.scrollWidth - this.width) / 2;
    }
    this.position = "absolute";
    this.display = "block";
    this.padding = 0;
}
Live.txv.tips.prototype.onBtnOk = function() {}
Live.txv.tips.prototype.onBtnClose = function() {}
Live.txv.tips.prototype.SetType = function(type) {
    this.tipsType = type;
    switch (type) {
    case Live.txv.tips.ConstTipsType.Warning:
        this.iconClass = 'icon_hint_warn';
        break;
    case Live.txv.tips.ConstTipsType.Message:
    case Live.txv.tips.ConstTipsType.Float:
    default:
        this.iconClass = 'icon_hint_succeed';
        break;
    }
    this.bulitIcon();
}
Live.txv.tips.prototype.SetBtn = function(showBtnTxt, closeBtnTxt, btnShowHref, btnShowTarget) {
    this.btnShowText = showBtnTxt;
    if ( !! btnShowHref && !! btnShowTarget) {
        this.btnShowHref = btnShowHref;
        this.btnShowTarget = btnShowTarget;
    }
    if (closeBtnTxt != "") {
        this.btnCloseText = closeBtnTxt;
    }
    this.bulitBtn();
}
Live.txv.tips.prototype.SetLink = function(txt, href) {
    this.linkText = txt;
    this.linkHref = href;
    this.bulitContent();
}
Live.txv.tips.prototype.SetPostion = function(x, y) {
    this.top = y;
    this.left = x;
}
Live.txv.tips.prototype.AddRemind = function() {
    this.needRemind = 1;
    this._t_Remind = '<p class="input_middle"><input type="checkbox" name="input_remind" value="1" id="input_remind" /><label for="input_remind">不再提醒</label></p>';
    this.bulitContent();
}
Live.txv.tips.prototype.AddChoose = function(txt) {
    this.needChoose = 1;
    this._t_Choose = '<p class="input_middle"><input type="checkbox" name="input_choose" value="1" id="input_choose" /><label for="input_choose">' + txt + '</label></p>';
    this.bulitContent();
}
Live.txv.tips.prototype.SetHide = function() {
    $e("#" + this.divName).hide();
    txv.login.hideMask();
}
Live.txv.tips.prototype.HideClose = function() {
    this.isShowClose = false;
}
Live.txv.tips.prototype._init = function() {
    this.bulitBtn();
    this.bulitHeader();
    if (this.tipsType === txv.tips.ConstTipsType.Float) {
        this.tipsHTML = this.bulitFloatTips();
    } else {
        this.tipsHTML = this.bulitNormalTips();
    }
}
Live.txv.tips.prototype.FillPage = function() {
    var $body, iframeId = this.divName + "_iframe",
        $iframe, height, containerId, $me = this,
        needIframe = (txv.common.conf.playPageFlag && !txv.common.useHtml5());
    if (!$(this.divName)) {
        $body = $e("body");
        $body.create("div", {
            "id": this.divName,
            "class": "mod_pop"
        });
    }
    if (!QZFL.lang.isString(this.tipsHTML) || this.tipsHTML.length <= 0) {
        this._init();
    }
    var divObj = $e("#" + this.divName);
    divObj.hide();
    divObj.html(this.tipsHTML);
    divObj.addClass("mod_pop");
    this.InitPosition();
    divObj.css("width", this.width + "px");
    divObj.css("height", "auto");
    if (this.showAtCenter) {
        divObj.css("top", "50%");
        divObj.css("marginLeft", -this.width / 2 + "px");
        divObj.css("marginTop", -this.height / 2 + "px");
        divObj.css("left", "50%");
    } else {
        divObj.css("top", this.top + "px");
        divObj.css("left", this.left + "px");
    }
    divObj.css("position", this.position);
    divObj.css("display", this.display);
    divObj.css("padding", this.padding);
    height = parseInt(divObj.css("height"));
    if (isNaN(height)) {
        var div = $(this.divName);
        if (div) {
            height = div.scrollHeight;
        }
    }
    if (needIframe) {
        divObj.create("iframe", {
            scrolling: "no",
            id: iframeId,
            frameborder: "0"
        });
        $iframe = $e("#" + iframeId);
        $iframe.hide();
        $iframe.css("position", "absolute");
        $iframe.css("top", "0");
        $iframe.css("left", "0");
        $iframe.css("width", this.width + "px");
        $iframe.css("height", height + "px");
        $iframe.css("border", "none");
        $iframe.css("zIndex", "100");
        $iframe.show();
        var childDiv = divObj.find(">div");
        childDiv.css("position", "relative");
        childDiv.css("zIndex", "101");
    }
    divObj.show();
    if (typeof Live.txv.tips.onShowTips == "function") {
        Live.txv.tips.onShowTips();
    }
    txv.login.showMask(this.divName, this.width, height, this.showAtCenter);

    function hideTips() {
        divObj.hide();
        txv.login.hideMask();
        if (typeof Live.txv.tips.onHideTips == "function") {
            Live.txv.tips.onHideTips();
        }
    }
    divObj.find(".mod_pop_close").bind('click', function() {
        hideTips();
        if (typeof($me.onBtnClose) == "function") {
            $me.onBtnClose();
        }
        try {
            if ($e('#input_remind').elements[0].checked) {
                QZFL.cookie.set('ql_alert', 1, "v.qq.com", "/", 24 * 365 * 2);
            }
        } catch (e) {}
    });
    if (this.btnShowText != "") {
        divObj.find("." + this.btnShowClass).bind('click', function(event) {
            hideTips();
            QZFL.event.preventDefault(event);
            if (typeof($me.onBtnOk) == "function") {
                $me.onBtnOk();
            }
        });
    }
    divObj.find("." + this.btnCloseClass).bind('click', function() {
        hideTips();
        if (typeof($me.onBtnClose) == "function") {
            $me.onBtnClose();
        }
    });
    if (this.tipsType == txv.tips.ConstTipsType.Float) {
        var timer = isNaN(this.floatTimer) ? 1000 : this.floatTimer;
        setTimeout(function() {
            hideTips();
        }, timer);
    }
}
Live.txv.tips.onShowTipsEventList = [];
Live.txv.tips.onHideTipsEventList = [];
Live.txv.tips.addOnShowTipsCallBack = function(fn) {
    if (typeof fn == "function") {
        Live.txv.tips.onShowTipsEventList.push(fn);
    }
}
Live.txv.tips.addOnHideTipsCallBack = function(fn) {
    if (typeof fn == "function") {
        Live.txv.tips.onHideTipsEventList.push(fn);
    }
}
Live.txv.tips.onShowTips = function() {
    if (QZFL.lang.isArray(Live.txv.tips.onShowTipsEventList)) {
        for (var idx = 0, len = Live.txv.tips.onShowTipsEventList.length; idx < len; idx++) {
            if (typeof Live.txv.tips.onShowTipsEventList[idx] == "function") {
                Live.txv.tips.onShowTipsEventList[idx]();
            }
        }
    }
}
Live.txv.tips.onHideTips = function() {
    if (QZFL.lang.isArray(Live.txv.tips.onHideTipsEventList)) {
        for (var idx = 0, len = Live.txv.tips.onHideTipsEventList.length; idx < len; idx++) {
            if (typeof Live.txv.tips.onHideTipsEventList[idx] == "function") {
                Live.txv.tips.onHideTipsEventList[idx]();
            }
        }
    }
}
Live.txv.tips.ShowTips = function(divId, title, msg1, msg2, btn1, btn2, type, callback) {
    divId = divId || "";
    title = "温馨提示";
    msg1 = msg1 || "";
    msg2 = msg2 || "";
    btn1 = btn1 || "";
    btn2 = btn2 || "";
    type = type || "";
    if (divId == "") {
        return;
    }
    if (msg1 == "") {
        return;
    }
    if (type == "") {
        type = txv.tips.ConstTipsType.Warning;
    }
    var tip = new txv.tips(title, msg1, msg2);
    tip.SetBtn(btn1, btn2);
    tip.SetType(type);
    tip.onBtnOk = function() {
        tip.SetHide();
        if (typeof(callback) == "function") {
            callback();
        }
    }
    tip.FillPage(divId);
}
Live.txv.tips.ShowFloatTips = function(msg, time) {
    if (QZFL.lang.isString(msg) && msg.length > 0) {
        var tips = new txv.tips();
        tips.showContent = msg;
        if (!isNaN(time)) {
            tips.floatTimer = time * 1000;
        }
        tips.SetType(txv.tips.ConstTipsType.Float);
        tips.FillPage();
    }
}
Live.txv.tips.ShowSimpMsgTips = function(title, msg, btnTxt, cb) {
    if (QZFL.lang.isString(msg) && QZFL.lang.isString(title)) {
        var tips = new txv.tips();
        tips.showTitle = title;
        tips.showContent = msg;
        tips.btnCloseClass = "btn_strong";
        if ( !! btnTxt) {
            tips.btnCloseText = btnTxt;
            cb = typeof(cb) === "function" ? cb : QZFL.emptyFn;
            tips.onBtnClose = cb;
        }
        tips.SetType(txv.tips.ConstTipsType.Message);
        tips.FillPage();
    }
}
Live.txv.tips.ShowSimpWarningTips = function(title, msg, btnTxt, cb) {
    if (QZFL.lang.isString(msg) && QZFL.lang.isString(title)) {
        var tips = new txv.tips();
        tips.showTitle = title;
        tips.showContent = msg;
        tips.btnCloseClass = "btn_strong";
        if ( !! btnTxt) {
            tips.btnCloseText = btnTxt;
            cb = typeof(cb) === "function" ? cb : QZFL.emptyFn;
            tips.onBtnClose = cb;
        }
        tips.SetType(txv.tips.ConstTipsType.Warning);
        tips.FillPage();
    }
}
Live.txv.vip = (function() {
    var checkVipDeferred = null,
        checkStorageDefer = null,
        waitCommit = false,
        vipInfoObj = null,
        changeStatusCb = new Live.Callback("unique"),
        showGetVipInfoErrTips = function() {
            txv.tips.ShowSimpWarningTips("获取会员信息失败", "服务器繁忙，暂时无法获取您的会员信息！请尝试重新登录您的账号。");
            checkVipDeferred = null;
        },
        onGetVipInfoErr = showGetVipInfoErrTips,
        getVipStorageKey = function() {
            return "fm_v_" + txv.login.getUin();
        },
        delVipStorageInfo = function() {
            QZFL.Storage.set(getVipStorageKey(), "");
            QZFL.Storage.remove(getVipStorageKey());
        },
        getVipStorageInfo = function() {
            if (checkStorageDefer instanceof Live.Deferred) {
                return checkStorageDefer;
            }
            checkStorageDefer = new Live.Deferred();
            if (txv.login.isLogin()) {
                QZFL.Storage.get(getVipStorageKey(), function(v) {
                    if (QZFL.object.getType(v) == "object" && QZFL.lang.isString(v.value)) {
                        v = v.value;
                    }
                    if ( !! checkStorageDefer) {
                        if (QZFL.lang.isString(v) && v.length > 0) {
                            checkStorageDefer.resolve(v);
                        } else {
                            checkStorageDefer.reject();
                        }
                    }
                });
            } else {
                checkStorageDefer.reject();
            }
            return checkStorageDefer;
        },
        setLocalVipInfo = function(time) {
            if (txv.login.isLogin() && QZFL.lang.isString(time)) {
                QZFL.Storage.set(getVipStorageKey(), [txv.login.getUin(), time, new Date().getTime()].join("|"));
            }
        },
        commitVipByServer = function(defer, needTime) {
            if (waitCommit) {
                setTimeout(function() {
                    commitVipByServer(defer, needTime);
                }, 25);
                return;
            }
            if (!(defer instanceof Live.Deferred)) {
                return;
            }
            defer.always(function() {
                waitCommit = false;
            });
            defer.done(function(json) {
                if (json && json.endTime) {
                    setLocalVipInfo(json.endTime);
                }
            }).fail(delVipStorageInfo);
            if (defer.isFired()) {
                return;
            }
            needTime = needTime ? 1 : 0;
            if (vipInfoObj && (!needTime || vipInfoObj.endTime)) {
                vipInfoObj.vip ? defer.resolve(vipInfoObj) : defer.reject(vipInfoObj);
                return;
            }
            waitCommit = true;
            var retObj = new Live.RetCode(100057);
            $j.ajax({
                "url": txv.path.checkIsVip,
                "data": {
                    uin: txv.login.getUin(),
                    t: needTime ? 1 : 0
                },
                "dataType": "jsonp",
                "CSRF": true,
                "beforeSend": function() {
                    retObj.begin();
                },
                "success": function(json) {
                    if (json && json.result) {
                        if (json.result.code == 0) {
                            vipInfoObj = {
                                endTime: json.endTime,
                                vip: json.vip
                            };
                            retObj.reprotSuc();
                            changeStatusCb.fire(json.vip == 1);
                        } else if (json.result.code == -11) {
                            retObj.reportErr(json.result.code);
                            txv.login.clearLoginCookie();
                            if (QZFL.lang.isFunction(txv.vip.onNotLogin)) {
                                txv.vip.onNotLogin(defer, needTime);
                            } else {
                                defer.reject(json);
                            }
                            waitCommit = false;
                            gc();
                            reportError({
                                str1: "not login"
                            });
                            return;
                        } else {
                            retObj.reportErr(json.result.code);
                            onGetVipInfoErr();
                            reportError({
                                str1: "cgi return error code:" + json.result.code
                            });
                        }
                        if (json.vip) {
                            defer.resolve(json);
                        } else {
                            defer.reject(json);
                        }
                    } else {
                        retObj.reportErr(-13);
                        onGetVipInfoErr();
                        defer.reject(json);
                        reportError({
                            str1: "invalid json"
                        });
                    }
                },
                error: function(msg) {
                    msg = msg || "cgi error";
                    retObj.reportErr(-500);
                    onGetVipInfoErr();
                    defer.reject();
                    reportError({
                        str1: msg
                    });
                }
            });
        },
        reportError = function(data) {
            var url = "http://rcgi.video.qq.com/web_report?cmd=2562&ctype=1&",
                img = new Image(),
                arr = [];
            QZFL.object.extend(data, {
                ua: navigator.userAgent
            });
            for (var k in data) {
                arr.push(k + "=" + encodeURIComponent(data[k]));
            }
            url = url + arr.join("&");
            img.src = url;
        },
        checkIsVip = function(commitByServer) {
            if (!txv.login.isLogin()) {
                var defer = new Live.Deferred();
                defer.reject();
                return defer;
            }
            if (commitByServer) {
                gc();
                if (!(checkVipDeferred instanceof Live.Deferred)) {
                    checkVipDeferred = new Live.Deferred();
                }
                commitVipByServer(checkVipDeferred, true);
                return checkVipDeferred;
            }
            if (!(checkVipDeferred instanceof Live.Deferred)) {
                checkVipDeferred = new Live.Deferred();
            }
            getVipStorageInfo().done(function(cookieval) {
                if (QZFL.lang.isString(cookieval)) {
                    var cookievalArr = cookieval.split("|"),
                        curDate = new Date(),
                        oneDay = 24 * 60 * 60 * 1000;
                    if (cookievalArr.length == 3 && !isNaN(cookievalArr[2]) && (curDate.getTime() - cookievalArr[2]) < oneDay) {
                        if (!waitCommit && cookievalArr[0] == txv.login.getUin() && txv.common.strToDate(cookievalArr[1]) > curDate) {
                            checkVipDeferred.resolve({
                                endTime: cookievalArr[1]
                            });
                            return;
                        }
                    }
                }
                commitVipByServer(checkVipDeferred);
            }).fail(function() {
                commitVipByServer(checkVipDeferred);
            });
            return checkVipDeferred;
        },
        isVip = function(fn, commitByServer) {
            fn = QZFL.lang.isFunction(fn) ? fn : QZFL.emptyFn;
            if (!txv.login.isLogin()) {
                fn(false);
            } else {
                if (commitByServer || !(checkVipDeferred instanceof Live.Deferred)) {
                    checkVipDeferred = checkIsVip(commitByServer);
                }
                checkVipDeferred.always(function() {
                    var ret = (checkVipDeferred instanceof Live.Deferred) ? checkVipDeferred.isResolved() : false;
                    fn(ret);
                });
            }
        },
        gc = function() {
            if (checkVipDeferred instanceof Live.Deferred && checkVipDeferred.isFired()) {
                checkVipDeferred = null;
            }
            if (checkStorageDefer instanceof Live.Deferred && checkStorageDefer.isFired()) {
                checkStorageDefer = null;
            }
            vipInfoObj = null;
        };
    txv.login.addLogoutCallback(gc);
    return {
        isVip: isVip,
        checkIsVip: checkIsVip,
        commitVipByServer: commitVipByServer,
        showErrTips: showGetVipInfoErrTips,
        getVipStorageInfo: getVipStorageInfo,
        delVipStorageInfo: delVipStorageInfo,
        changeErrHandle: function(fn) {
            if (QZFL.lang.isFunction(fn)) {
                onGetVipInfoErr = fn;
            }
        },
        addChangeStatusCb: changeStatusCb.add,
        onNotLogin: null
    };
})()
Live.txv.book = {
    constvar: {
        tipstitle: {
            book: '成功订阅当前节目！',
            cancel: '取消订阅成功！',
            error: '订阅失败，请稍后再试。',
            login: '登录超时，请重新登录',
            bookerror: '订阅失败，请稍后再试。',
            cancelerror: '取消订阅失败，请稍后再试。'
        },
        tipscontent: {
            book: '在您订阅的节目开始前5分钟，我们会通过<br />QQ消息提醒您观看',
            cancel: '',
            error: '请稍后再试'
        },
        bookbtntext: {
            alt: '订阅后，系统会在节目更新后通过QQ消息提醒您观看。',
            book: '订阅节目更新信息',
            cancel: '取消通知'
        },
        bookbtntextspan: {
            alt: '订阅后，系统会在节目更新后通过QQ消息提醒您观看。',
            book: '预订',
            cancel: '取消预订'
        }
    },
    config: {
        cgi: "http://sns.video.qq.com/fcgi-bin/liveportal/nbook?otype=json&f=2&",
        id: '',
        tid: '',
        type: 0,
        op: 2,
        attr: "bookid",
        bookbtn: null,
        keyprefix: '',
        logincallback: null,
        btnspan: false
    },
    ids: null,
    items: null,
    TipBoxShow: function(title, msg, iconType) {
        var tips = new txv.tips("Message", title, msg);
        if (iconType == 1) {
            tips.SetType(txv.tips.ConstTipsType.Message);
        } else {
            tips.SetType(txv.tips.ConstTipsType.Warning);
        }
        tips.FillPage();
    },
    TipBoxShowTiny: function(msg) {
        var g_tip = new txv.tips("", "", msg);
        g_tip.SetType(txv.tips.ConstTipsType.Float);
        g_tip.FillPage();
    },
    TipBoxShowConfirm: function(idx) {
        var self = this;
        var title = "确定取消订阅？";
        var msg = "取消订阅后您将不再收到节目开始的提醒";
        var g_tip = null;
        g_tip = new txv.tips("Message", title, msg);
        g_tip.SetType(txv.tips.ConstTipsType.Warning);
        g_tip.SetBtn("确定", "取消");
        g_tip.onBtnOk = function() {
            self._cancel(idx);
        }
        g_tip.FillPage();
    },
    init: function(_config) {
        var self = this,
            defaultText = [],
            defaultTitle = [];
        self.items = [];
        self.ids = {};
        Live.object.extend(self.config, _config);
        if (!self.config.bookbtn) {
            return;
        }
        txv.login.addLoginCallback(function() {
            self.isBooked();
            if (typeof self.config.logincallback == "function") {
                self.config.logincallback();
            }
        });
        txv.login.addLogoutCallback(function() {
            self.initItemData();
            self.config.bookbtn.each(function(el, i) {
                el.title = defaultTitle[i];
                var $el = $e(el);
                if (self.config.btnspan == true) {
                    $el.find("span").html(defaultText[i]);
                } else {
                    $el.text(defaultText[i]);
                }
            });
        });
        this.initItemData();
        self.isBooked();
        self.config.bookbtn.each(function(el, i) {
            var $el = $e(el);
            defaultTitle.push(el.title);
            if (self.config.btnspan == true) {
                defaultText.push($el.find("span").html());
            } else {
                defaultText.push($el.text());
            }
            $el.bind("click", function() {
                switch (self.items[i].stat) {
                case 2:
                    self.book(i);
                    break;
                case 3:
                    self.cancel(i);
                    break;
                }
            });
        });
    },
    initItemData: function() {
        this.items = [];
        for (var i = 0; i < this.config.bookbtn.size(); ++i) {
            var $btn = this.config.bookbtn.get(i),
                _bookid = $btn.getAttr(this.config.attr) || this.config.id,
                _tid = $btn.getAttr("tid") || this.config.tid;
            this.ids[_bookid] = i;
            this.items.push({
                "stat": 2,
                "id": _bookid,
                "tid": _tid,
                "btn": $btn
            });
        }
    },
    book: function(idx) {
        var self = this;
        var uin = txv.login.getUin();
        if (uin <= 10000) {
            txv.login.openLogin({
                success: function() {
                    self.book(idx);
                }
            });
            return false;
        }
        var url = self.config.cgi + "uin=" + uin + "&op=2&id=" + self.items[idx].id + "&t=" + self.config.type + "&g_tk=" + $j.getToken();
        if (self.config.type == 2) {
            url += "&tid=" + self.items[idx].tid;
        }
        $j.getJsonp(url, function(json) {
            if (!json) return;
            self.onBook(json, idx);
        });
    },
    onBook: function(json, idx) {
        var self = this;
        if (json.suc == -1) {
            txv.login.openLogin({
                success: function() {
                    self.book(idx);
                }
            });
            return;
        }
        if (json.suc != 0) {
            this.TipBoxShow(self.constvar.tipstitle.error, self.constvar.tipscontent.error, 0);
            return;
        }
        this.TipBoxShow(self.constvar.tipstitle.book, self.constvar.tipscontent.book, 1);
        if (isNaN(idx)) {
            return;
        }
        self.items[idx].stat = 3;
        this.undateBookStatus(idx, true);
        if ( !! $e("#zt_nbook")) {
            if ($e("#zt_nbook").hasClass("show_btn_2")) {
                $e("#zt_nbook").removeClass("show_btn_2");
                $e("#zt_nbook").addClass("show_btn_1");
            }
            if ($e("._book").hasClass("btn_2")) {
                $e("._book").removeClass("btn_2");
                $e("._book").addClass("btn_1");
            }
            if ($e("._book").hasClass("bt_notice")) {
                $e("._book").removeClass("bt_notice");
                $e("._book").addClass("bt_cancel");
            }
        }
        self.items[idx].btn.setAttr('title', '');
        if (self.items[idx].btn.hasClass("c_yd")) {
            self.items[idx].btn.removeClass("c_yd");
            self.items[idx].btn.addClass("c_ca");
        }
    },
    cancel: function(idx) {
        var uin = txv.login.getUin(),
            self = this;
        if (uin <= 10000) {
            txv.login.openLogin({
                success: function() {
                    self.cancel(idx);
                }
            });
            return;
        }
        this.TipBoxShowConfirm(idx);
        return;
    },
    _cancel: function(idx) {
        var self = this;
        var url = self.config.cgi + "uin=" + txv.login.getUin() + "&op=3&id=" + self.items[idx].id + "&t=" + self.config.type + "&g_tk=" + $j.getToken();
        if (self.config.type == 2) {
            url += "&tid=" + self.items[idx].tid;
        }
        $j.getJsonp(url, function(json) {
            if (!json) return;
            self.onCancel(json, idx);
        });
    },
    onCancel: function(json, idx) {
        var self = this;
        if (json.suc == -1) {
            txv.login.openLogin({
                success: function() {
                    self.cancel(idx);
                }
            });
            return;
        }
        if (json.suc != 0) {
            this.TipBoxShow(self.constvar.tipstitle.error, self.constvar.tipscontent.error, 0);
            return;
        }
        self.items[idx].stat = 2;
        this.undateBookStatus(idx, false);
        if ( !! $e("#zt_nbook")) {
            if ($e("#zt_nbook").hasClass("show_btn_1")) {
                $e("#zt_nbook").removeClass("show_btn_1");
                $e("#zt_nbook").addClass("show_btn_2");
            }
            if ($e("._book").hasClass("btn_1")) {
                $e("._book").removeClass("btn_1");
                $e("._book").addClass("btn_2");
            }
            if ($e("._book").hasClass("bt_cancel")) {
                $e("._book").removeClass("bt_cancel");
                $e("._book").addClass("bt_notice");
            }
        }
        if (self.items[idx].btn.hasClass("c_ca")) {
            self.items[idx].btn.removeClass("c_ca");
            self.items[idx].btn.addClass("c_yd");
        }
        self.TipBoxShowTiny("取消订阅成功！");
    },
    undateBookStatus: function(idx, isBooked) {
        var str = isBooked ? this.constvar.bookbtntext.cancel : this.constvar.bookbtntextspan.book,
            alt = isBooked ? this.constvar.bookbtntext.alt : "";
        if (isNaN(idx) || !(txv.book.items[idx] && txv.book.items[idx].btn instanceof QZFL.ElementHandler)) {
            return;
        }
        if (txv.book.items[idx].btn.attr("data-notUpdateStatus")) {
            return;
        }
        if (txv.book.config.btnspan == true) {
            txv.book.items[idx].btn.find("span").html(str);
        } else {
            txv.book.items[idx].btn.text(str);
        }
        this.items[idx].btn.setAttr('title', alt);
    },
    isBooked: function() {
        var self = this;
        var uin = txv.login.getUin();
        if (uin <= 10000) {
            return false;
        }
        var url = self.config.cgi + "uin=" + uin + "&op=0&t=" + self.config.type + "&g_tk=" + $j.getToken();
        $j.getJsonp(url, function(json) {
            if (!json) return;
            self.onIsBooked(json);
        });
    },
    onIsBooked: function(json) {
        var self = this;
        if (json.suc == -1) {
            txv.login.clearLoginCookie();
            return;
        }
        if (json.suc != 0 || !isArray(json.pros)) {
            return;
        }
        for (var i = 0; i < self.items.length; ++i) {
            self.items[i].stat = 2;
            this.undateBookStatus(i, false);
            if ( !! $e("#zt_nbook")) {
                if ($e("#zt_nbook").hasClass("show_btn_1")) {
                    $e("#zt_nbook").removeClass("show_btn_1");
                    $e("#zt_nbook").addClass("show_btn_2");
                }
                if ($e("._book").hasClass("btn_1")) {
                    $e("._book").removeClass("btn_1");
                    $e("._book").addClass("btn_2");
                }
                if ($e("._book").hasClass("bt_cancel")) {
                    $e("._book").removeClass("bt_cancel");
                    $e("._book").addClass("bt_notice");
                }
            }
            if (self.items[i].btn.hasClass("c_ca")) {
                self.items[i].btn.removeClass("c_ca");
                self.items[i].btn.addClass("c_yd");
            }
        }
        for (var i = 0; i < json.pros.length; ++i) {
            if (typeof self.ids[json.pros[i].id] == 'number') {
                var _idx = self.ids[json.pros[i].id];
                self.items[_idx].stat = 3;
                this.undateBookStatus(_idx, true);
                if ( !! $e("#zt_nbook")) {
                    if ($e("#zt_nbook").hasClass("show_btn_2")) {
                        $e("#zt_nbook").removeClass("show_btn_2");
                        $e("#zt_nbook").addClass("show_btn_1");
                    }
                    if ($e("._book").hasClass("btn_2")) {
                        $e("._book").removeClass("btn_2");
                        $e("._book").addClass("btn_1");
                    }
                    if ($e("._book").hasClass("bt_notice")) {
                        $e("._book").removeClass("bt_notice");
                        $e("._book").addClass("bt_cancel");
                    }
                }
                if (self.items[_idx].btn.hasClass("c_yd")) {
                    self.items[_idx].btn.removeClass("c_yd");
                    self.items[_idx].btn.addClass("c_ca");
                }
            }
        }
    }
}
Live.txv.history = {
    option: {
        coverid: '',
        tit: null,
        lnk: null,
        isPay: 0,
        vid: ""
    },
    mod_id: "history_pop",
    hisList: null,
    localList: {},
    localUserStorgeKeyArr: null,
    uinStorageKey: "ten_video_history_uin_storage_key",
    key: "ten_video_history",
    template: "<li key='{key}'><span class='mod_video_name no_time'><a href='{lnk}' _hot='nav.history.click' _qtag='nav.history' title='{tit}'>{tit}</a></span><a href='{lnk}' _hot='nav.history.see'>{ltxt}</a><button _hot='nav.history.del' type='button' _key='{key}' title='删除' _idx={idx}>X</button></li>",
    rmAllTemp: "<p class='mod_clear_play' id='rmAllHistory'><a href='javascript:;'><b class='mod_icons'></b>清空播放记录</a></p>",
    iframeTemp: "<iframe scrolling=\"no\" frameborder=\"0\"></iframe>",
    noResultTpl: '<div class="no_record"><i class="icon icon_alert"></i><p>{tips}</p></div>',
    notLoginNoResultTpl: '<div class="pop_info_nothing pop_timeline_login"><a href="javascript:;" class="btn_login" data-type="login">登录</a><p class="hint_text">请登录查看历史记录</p></div>',
    getMoreBtnTpl: '<a href="http://v.qq.com/mytv/history.html" target="_blank" class="btn_pop_link" data-type="getMoreHistory"><span class="ico_text">{tips}</span></a>',
    noResultCls: "no_record_pop",
    noLoginCls: "mod_history_pop_login",
    emptyTips: "您暂时还没有历史记录",
    errorTips: "获取数据失败",
    timeLongLimit: 600,
    reportTimer: 0,
    reportToServerTimeLimit: 30,
    v2: false,
    onShowHistory: QZFL.emptyFn,
    onHideHistory: QZFL.emptyFn,
    isSorted: false,
    localAddLock: false,
    isBatchReport: false,
    playPageFlag: false,
    showSimpleRecordCnt: 10,
    localStorageRecordCnt: 10,
    timeFlagDef: {
        finish: -2,
        begin: -1
    },
    lastReportToServerKeyid: "",
    _onShowContentCbObj: new Live.Callback("unique"),
    _onHideContentCbObj: new Live.Callback("unique"),
    addShowHistoryCallback: function(fn) {
        txv.history._onShowContentCbObj.add(fn);
    },
    addHideHistoryCallback: function(fn) {
        txv.history._onHideContentCbObj.add(fn);
    },
    setCurVideo: function(opt) {
        QZFL.object.extend(txv.history.option, opt);
    },
    init: function(playPageFlag, v2) {
        txv.history.v2 = !! v2;
        txv.history.playPageFlag = !! playPageFlag;
        var area, $container, menu, $trigger, showCls = "open";
        if (txv.history.v2) {
            txv.history.initV2();
        } else {
            area = $e("#history");
            $container = $e("#" + txv.history.mod_id);
            $trigger = area.find("h6 a");
            if ($trigger.size() == 0) {
                $trigger = $e("#modHistoryTrigger");
                showCls = "mod_history_open";
            }
            menu = new Live.FloatMenu({
                menu: $container,
                area: $trigger,
                areaOutdelay: 100,
                onShow: function(obj) {
                    area.addClass(showCls);
                    if (QZFL.string.trim($container.html()).length == 0) {
                        txv.history.showEmpty(" 正在努力获取数据..");
                        txv.history.showHistory();
                        txv.common.btnTj("history");
                    }
                    if ($("history_list") && typeof txv.history.onShowHistory == "function") {
                        txv.history.onShowHistory();
                    }
                    txv.history._onShowContentCbObj.fire();
                },
                onHide: function(obj) {
                    area.removeClass(showCls);
                    if (typeof txv.history.onHideHistory == "function") {
                        txv.history.onHideHistory();
                    }
                    txv.history._onHideContentCbObj.fire();
                }
            });
        }
        this.bindRm();
        txv.login.addLoginCallback(function() {
            txv.history.isBatchReport = false;
            txv.history.batchReportToServer(txv.history.showSimpleRecordCnt, function() {
                txv.history.showHistory(txv.history.showSimpleRecordCnt);
            });
        });
        txv.login.addLogoutCallback(function() {
            txv.history.showLocalHistory(txv.history.showSimpleRecordCnt);
            txv.history.hisList = null;
        });
        txv.login.addClearLoginStatusCallback(function() {
            txv.history.showLocalHistory(txv.history.showSimpleRecordCnt);
            txv.history.hisList = null;
        });
        if (!playPageFlag) {
            txv.history.batchReportToServer(txv.history.showSimpleRecordCnt);
        }
    },
    initV2: function() {
        txv.history.mod_id = "modHistoryContent";
        var isSupportTransition = txv.common.isSupportedCSSProperty("transition"),
            menu, $toggle, $container = $e("#history_pop"),
            $modContent = $e("#" + txv.history.mod_id),
            markToggle = false,
            markPop = false,
            timer = null,
            curCls = "hover";
        txv.history.template = '<dd key="{key}"><a href="{lnk}" _hot="nav.history.click" _qtag="nav.history" title="{tit}" target="_blank" class="video_name">{tit}</a><span class="video_timestamp">{timeTips}</span><a href="javascript:;" _hot="nav.history.del"  _key="{key}" title="删除" _idx={idx} class="btn_close">×</a></dd>';
        txv.history.noResultTpl = '<div class="pop_info_nothing"><i class="ico_film_large"></i><p class="hint_text">{tips}</p></div>';
        txv.history.noResultCls = "mod_history_pop_nothing";
        txv.history.iframeTemp = '<iframe src="about:blank" frameborder="0" class="iframe_mask"></iframe>';
        txv.history.rmAllTemp = '<a href="javascript:;" class="btn_clear" id="rmAllHistory"><i class="ico_clear"></i><span class="ico_text">清空播放记录</span></a>';

        function mouseoutHandle() {
            clearTimeout(timer);
            timer = setTimeout(function() {
                if (!(markToggle || markPop)) {
                    QZFL.css.removeClassName($("modHistory"), "open");
                    if (typeof txv.history.onHideHistory == "function") {
                        txv.history.onHideHistory();
                    }
                    txv.history._onHideContentCbObj.fire();
                }
            }, 200);
        }

        function showHistoryHandle() {
            txv.common.btnTj("history.hover");
            QZFL.css.addClassName($("modHistory"), "open");
            if (txv.history.playPageFlag && $container.find("iframe").size() === 0) {
                var iframe = document.createElement("iframe"),
                    parentNode = $container.find(".pop_info_main").elements[0];
                iframe.src = "about:blank";
                iframe.frameborder = "0";
                iframe.className = "iframe_mask";
                if (QZFL.lang.isElement(parentNode) && $modContent.size() == 1) {
                    parentNode.insertBefore(iframe, $modContent.elements[0]);
                }
            }
            if (QZFL.string.trim($modContent.html()).length == 0) {
                txv.history.showEmpty(" 正在努力获取数据..");
                txv.history.showHistory();
                txv.common.btnTj("history");
            }
            if (typeof txv.history.onShowHistory == "function") {
                txv.history.onShowHistory();
            }
            txv.history._onShowContentCbObj.fire();
        }
        if (!txv.common.useHtml5() && isSupportTransition) {
            $toggle = $e("#modHistory");
            $toggle.onMouseEnter(function(evt) {
                clearTimeout(timer);
                if (markToggle || markPop) {
                    markToggle = true;
                } else {
                    markToggle = true;
                    showHistoryHandle();
                }
            });
            $toggle.onMouseLeave(function(evt) {
                markToggle = false;
                mouseoutHandle();
            });
            $container.bind("mouseover", function(evt) {
                markPop = true;
                clearTimeout(timer);
            });
            $container.bind("mouseout", function(evt) {
                markPop = false;
                mouseoutHandle();
            });
        } else {
            $toggle = $e("#toggleHistory");
            menu = new Live.FloatMenu({
                menu: $container,
                area: $toggle,
                areaOutdelay: 100,
                isNeedChangeDisplay: false,
                onShow: function(obj) {
                    showHistoryHandle();
                },
                onHide: function(obj) {
                    QZFL.css.removeClassName($("modHistory"), "open");
                    if (typeof txv.history.onHideHistory == "function") {
                        txv.history.onHideHistory();
                    }
                    txv.history._onHideContentCbObj.fire();
                }
            });
        }
        $container.undelegate("dl>dd", "mouseover").delegate("dl>dd", "mouseover", function(evt) {
            $container.find("dd." + curCls).removeClass(curCls);
            QZFL.css.addClassName(this, curCls);
        }, true).undelegate("dl>dd", "mouseout").delegate("dl>dd", "mouseout", function(evt) {
            QZFL.css.removeClassName(this, curCls);
        }, true).delegate("a[data-type='getMoreHistory']", "click", function(evt) {
            if (!txv.login.isLogin()) {
                QZFL.event.preventDefault(evt);
                txv.login.openLogin();
            }
        }, true);
    },
    getStorageKey: function(vid, coverid) {
        return QZFL.string.trim([coverid, vid].join("_"));
    },
    bindRm: function() {
        var $doc = $e(document),
            $modPop = $e("#" + txv.history.mod_id);
        $doc.undelegate("[_hot='nav.history.del']", "click");
        $doc.delegate("[_hot='nav.history.del']", "click", function(evt) {
            QZFL.event.preventDefault(evt);
            txv.history.rm(this.getAttribute("_key"), this.getAttribute("_idx") || 0);
            txv.common.btnTj("history.delete");
        });
        $doc.delegate("#rmAllHistory", "click", function(evt) {
            QZFL.event.preventDefault(evt);
            txv.history.removeAll();
            txv.common.btnTj("history.blank");
        }, true);
    },
    getHistory: function(_conf) {
        var conf = {
            cb: Live.emptyFn,
            onError: Live.emptyFn,
            cur: 0,
            pn: txv.history.showSimpleRecordCnt,
            isSimp: true
        },
            data = {
                t: 1,
                otype: "json"
            },
            isSimp, retObj = new Live.RetCode(100031);
        Live.object.extend(conf, _conf);
        if (conf.exParam) {
            Live.object.extend(data, conf.exParam);
        }
        isSimp = typeof(conf.isSimp) == "boolean" ? conf.isSimp : true;
        data.cur = conf.cur;
        data.pn = conf.pn;
        if (conf.exParam) {
            Live.object.extend(data, conf.exParam);
        }
        if (isSimp) {
            data.simp = 1;
        }
        conf.onError = QZFL.lang.isFunction(conf.onError) ? conf.onError : Live.emptyFn;
        $j.ajax({
            url: txv.path.queryHistoryRecordCgi,
            dataType: "jsonp",
            data: data,
            CSRF: true,
            beforeSend: function() {
                retObj.begin();
            },
            success: function(json) {
                if (QZFL.object.getType(json) === "object" && QZFL.object.getType(json.result) === "object") {
                    if (json.result.code == 0) {
                        conf.cb(json);
                        retObj.reprotSuc();
                    } else if (json.result.code == -11) {
                        retObj.reportErr(-11);
                        if (isSimp) {
                            txv.login.clearLoginCookie();
                            txv.history.showLocalHistory(txv.history.showSimpleRecordCnt);
                        } else {
                            txv.common.gotoLoginPage();
                        }
                    } else {
                        retObj.reportErr(json.result.code);
                        conf.onError()
                    }
                } else {
                    retObj.reportErr(-1);
                    conf.onError();
                }
            },
            error: function() {
                retObj.reportErr(-1);
                conf.onError();
            }
        });
    },
    getLocalUserStorgeKeyArr: function(cb) {
        cb = typeof cb == "function" ? cb : QZFL.emptyFn;
        if (QZFL.lang.isArray(txv.history.localUserStorgeKeyArr)) {
            cb(txv.history.localUserStorgeKeyArr);
        } else {
            QZFL.Storage.get(txv.history.uinStorageKey, function(val) {
                txv.history.localUserStorgeKeyArr = txv.history.parseLocalRecord(val);
                var tmpArr = [];
                var remark = {};
                var arr = txv.history.localUserStorgeKeyArr;
                var hasDefault = false;
                for (var idx = 0, iLen = arr.length; idx < iLen; idx++) {
                    if (QZFL.lang.isString(arr[idx])) {
                        var opt = arr[idx].split(",");
                        if (typeof(remark[opt[0]]) === "undefined") {
                            remark[opt[0]] = true;
                            tmpArr.push(arr[idx]);
                        }
                        if (opt[0] === txv.history.key) {
                            hasDefault = true;
                        }
                    }
                }
                if (hasDefault == false) {
                    var curTime = txv.history.getCurTimeStmp();
                    tmpArr.push([txv.history.key, curTime, curTime].join(","));
                }
                QZFL.Storage.set(txv.history.uinStorageKey, tmpArr.join("|"));
                txv.history.localUserStorgeKeyArr = tmpArr;
                cb(txv.history.localUserStorgeKeyArr);
            });
        }
    },
    getLocalList: function(key, cb) {
        if (typeof(key) !== "string" || key.length === 0) {
            return false;
        }
        cb = typeof cb == "function" ? cb : QZFL.emptyFn;
        if (QZFL.lang.isArray(txv.history.localList[key])) {
            cb(txv.history.localList[key]);
        } else {
            QZFL.Storage.get(key, function(val) {
                txv.history.localList[key] = txv.history.parseLocalRecord(val);
                cb(txv.history.localList[key]);
            });
        }
    },
    showLocalHistory: function(count) {
        count = count || txv.history.showSimpleRecordCnt;
        var storagekey = txv.history.makeUserStorageKey(),
            his = txv.history.localList[storagekey],
            len, readyShowList = [],
            time, lnk, tit, ltxt, hasSame;
        if (!QZFL.lang.isArray(his)) {
            txv.history.getLocalList(storagekey, function() {
                txv.history.showLocalHistory(count);
            });
            return;
        }
        len = his.length;
        if (len == 0) {
            txv.history.showEmpty();
            return;
        }
        for (var i = 0; i < len; i++) {
            if (typeof(his[i]) != "string") {
                continue;
            }
            var opt = his[i].split(',');
            if (opt.length < 4) {
                continue;
            }
            time = opt[3] * 1;
            ltxt = "继续观看";
            if (time == -2 || time == opt[4]) {
                ltxt = "重新观看";
            }
            lnk = txv.history.getPlayUrl(opt[0], opt[5]);
            tit = QZFL.string.filterAngAndQt(opt[1]);
            readyShowList.push({
                key: opt[0],
                lnk: lnk,
                tit: tit,
                idx: i,
                ltxt: ltxt,
                date: opt[2],
                time: time,
                timeTips: txv.history.getTipsByTime(time, opt[4])
            });
            if (readyShowList.length === count) {
                break;
            }
        }
        txv.history.v2 ? txv.history.renderHistoryV2(readyShowList) : txv.history.renderHistory(readyShowList);
    },
    isFinished: function(time, total) {
        time = txv.history.timeAdaptor(time);
        return txv.history.timeLongLimit >= total || time == total || time == txv.history.timeFlagDef.finish;
    },
    timeAdaptor: function(time, total) {
        if (time < 0) {
            if (time == txv.history.timeFlagDef.finish) {
                time = total;
            } else {
                time *= -1;
            }
        }
        return time;
    },
    getTipsByTime: function(time, total) {
        var tips = "";
        time = parseInt(time, 10);
        total = parseInt(total, 10);
        time = txv.history.timeAdaptor(time, total);
        if (txv.history.isFinished(time, total)) {
            tips = "已看完";
        } else if (time >= 3600) {
            if (time % 3600 == 0) {
                tips = txv.common.formatTimeBySec(time, "{h}小时");
            } else {
                tips = txv.common.formatTimeBySec(time, "{h}小时{m}分");
            }
            tips = "观看至" + tips;
        } else if (time < 60) {
            tips = "观看不足1分钟";
        } else {
            if (time % 60 == 0) {
                tips = txv.common.formatTimeBySec(time, "{m}分");
            } else {
                tips = txv.common.formatTimeBySec(time, "{m}分{s}秒");
            }
            tips = "观看至" + tips;
        }
        return tips;
    },
    showHistory: function(count) {
        count = count || txv.history.showSimpleRecordCnt;
        if (!txv.login.isLogin()) {
            txv.history.showLocalHistory(count);
            return;
        }
        if (txv.history.hisList != null) {
            txv.history.renderContent(txv.history.hisList);
            return;
        }
        txv.history.getHistory({
            cb: txv.history.renderContent,
            cur: 1,
            pn: count,
            isSimp: true,
            onError: function() {
                txv.history.showEmpty(txv.history.errorTips);
            }
        });
    },
    renderContent: function(json) {
        txv.history.hisList = json;
        if (!json || json.tot == 0 || !json.list) {
            txv.history.showEmpty();
            return;
        }
        var len = json.list.length,
            tmpObj;
        for (var i = 0; i < len; i++) {
            tmpObj = json.list[i];
            if (!tmpObj.lnk) {
                tmpObj.lnk = txv.history.getPlayUrl(tmpObj);
            }
            if (!tmpObj.ltxt) {
                tmpObj.ltxt = (tmpObj.time == txv.history.timeFlagDef.finish || tmpObj.time == tmpObj.tl) ? "重新观看" : "继续观看";
            }
            if (!tmpObj.tit) {
                tmpObj.tit = QZFL.string.filterAngAndQt(txv.history.getTitle(tmpObj));
            }
            tmpObj.timeTips = txv.history.getTipsByTime(tmpObj.time, tmpObj.tl);
            tmpObj.key = tmpObj.keyid;
            tmpObj.idx = i;
        }
        txv.history.v2 ? txv.history.renderHistoryV2(json.list) : txv.history.renderHistory(json.list);
    },
    renderHistory: function(readyList) {
        var $container = $e("#" + txv.history.mod_id),
            d, ul, mod, html = "",
            idx = 0,
            len;
        if (!QZFL.lang.isArray(readyList) || readyList.length == 0) {
            txv.history.showEmpty(txv.history.emptyTips);
        } else {
            len = readyList.length;
            for (; idx < len; idx++) {
                html += QZFL.string.format(txv.history.template, readyList[idx]);
            }
        }
        txv.trace("renderHistory start");
        if ($container.size() > 0) {
            $container.removeClass(txv.history.noResultCls);
            ul = $("history_list");
            if (ul) {
                txv.trace("already has ul");
                ul.innerHTML = html;
            } else {
                if (txv.history.playPageFlag || $container.attr("useIframe") == "1") {
                    if ($container.find("iframe").size() == 1) {
                        $container.find("div").remove();
                        d = document.createElement("div");
                        d.innerHTML = txv.history.rmAllTemp;
                        mod = $container.elements[0];
                        QZFL.dom.createElementIn("ul", mod, true, {
                            id: "history_list",
                            innerHTML: html
                        });
                        mod.insertBefore(d.firstChild, mod.lastChild);
                    } else {
                        html = ["<ul id=\"history_list\">", html, "</ul>", txv.history.rmAllTemp, txv.history.iframeTemp].join("");
                        $container.html(html);
                    }
                } else {
                    txv.trace("no need iframe");
                    html = ["<ul id=\"history_list\">", html, "</ul>", txv.history.rmAllTemp].join("");
                    $container.html(html);
                }
            }
            if (txv.history.playPageFlag && QZFL.userAgent.ie == 6) {
                var h = len * 26 + 53;
                $container.find("iframe").css("height", h + "px");
                $container.css("height", h + "px");
            }
        }
    },
    renderHistoryV2: function(readyList) {
        var dayDef = {
            today: 0,
            yesterday: -1,
            earlier: -999
        },
            isNew = !$("modHeadLogin"),
            moreBtnHtml, $mod = $e("#" + txv.history.mod_id),
            $container, h, wrapHtml = '<div class="pop_timeline_wrap"><div class="timeline_video_wrap">{content}</div></div>',
            contentHtml = "",
            time, idx = 0,
            len, dateObj = new Date(),
            today = dateObj.getDate(),
            curTime = dateObj.getTime(),
            oneDayTime = 86400000,
            todayHtml = "",
            yesterdayHtml = "",
            earlierHtml = "";

        function render(type, html) {
            if (html.length > 0) {
                switch (type) {
                case dayDef.today:
                    {
                        contentHtml += '<dl class="timeline_video_list history_today"><dt><i class="timeline_dot">●</i><span class="timeline_date date_green"><i class="triangle_left"></i>今天</span></dt>' + html + '</dl>';
                        break;
                    }
                case dayDef.yesterday:
                    {
                        contentHtml += '<dl class="timeline_video_list history_yesterday"><dt><i class="timeline_dot">●</i><span class="timeline_date date_blue"><i class="triangle_left"></i>昨天</span></dt>' + html + '</dl>';
                        break;
                    }
                case dayDef.earlier:
                    {
                        contentHtml += '<dl class="timeline_video_list history_earlier"><dt><i class="timeline_dot">●</i><span class="timeline_date date_orange"><i class="triangle_left"></i>更早</span></dt>' + html + '</dl>';
                        break;
                    }
                }
            }
        }
        if (!QZFL.lang.isArray(readyList) || readyList.length == 0) {
            txv.history.showEmpty(txv.history.emptyTips);
            return;
        }
        len = readyList.length;
        for (; idx < len; idx++) {
            if (txv.history.getStorageKey(txv.history.option.vid, txv.history.option.coverid) === readyList[idx].key) {
                readyList[idx].timeTips = "正在观看";
            }
            if (!isNew) {
                readyList[idx].timeTips = "";
            }
            var str = QZFL.string.format(txv.history.template, readyList[idx]),
                date;
            time = readyList[idx].date * 1000;
            if (curTime - oneDayTime * 2 > time) {
                earlierHtml += str;
            } else {
                dateObj.setTime(time);
                date = dateObj.getDate();
                if (today == date) {
                    todayHtml += str;
                } else if (today - 1 == date) {
                    yesterdayHtml += str;
                } else {
                    earlierHtml += str;
                }
            }
        }
        render(dayDef.today, todayHtml);
        render(dayDef.yesterday, yesterdayHtml);
        render(dayDef.earlier, earlierHtml);
        if (contentHtml.length > 0) {
            $e("#history_pop").removeClass(txv.history.noLoginCls).removeClass(txv.history.noResultCls);
            moreBtnHtml = txv.history.getMoreBtnTpl.replace("{tips}", txv.login.isLogin() ? "查看更多" : "登录查看更多");
            if (!isNew) {
                moreBtnHtml = txv.history.rmAllTemp;
            }
            $mod.html(wrapHtml.replace(/{content}/, contentHtml + moreBtnHtml));
            if (QZFL.userAgent.ie == 6) {
                $container = $e("#history_pop");
                h = $container.attr("clientHeight") - (parseInt($container.css("paddingTop"), 10) || 0);
                $container.find("iframe").css("height", h + "px");
            }
        } else {
            txv.history.showEmpty(txv.history.emptyTips);
        }
    },
    getPlayUrl: function(json, isPay) {
        var url = "",
            key, keyArr, cid, vid, time;
        if (typeof(json) === "string") {
            key = json;
            keyArr = key.split("_");
            cid = keyArr[0];
            vid = keyArr[1];
            if (!isNaN(keyArr[2])) {
                vid += "_" + keyArr[2];
            }
            if (typeof(cid) === "string" && cid.length > 0) {
                url = txv.common.getStaticPlayUrl(cid, vid);
            } else if (typeof(vid) === "string" && vid.length > 0) {
                url = txv.common.getVideoPlayUrl(vid);
            }
        } else if (QZFL.object.getType(json) === "object") {
            keyArr = json.keyid.split("_");
            time = json.time < 0 ? json.time * -1 : json.time;
            if (keyArr.length == 3) {
                keyArr[1] = keyArr[1] + "_" + keyArr[2];
            }
            if (json.ctypeid == 7) {
                url = txv.common.getBokePlayUrl(keyArr[1]);
            } else if (keyArr[0].length > 0) {
                url = txv.common.getPlayUrl(keyArr[0], keyArr[1]);
            } else {
                url = txv.common.getVideoPlayUrl(keyArr[1]);
            }
            if (time > 0) {
                if (url.indexOf("?") === -1) {
                    url += "?start=" + time;
                } else {
                    url += "&start=" + time;
                }
            }
        }
        if ((isPay == 1 && QZFL.lang.isString(json)) || (QZFL.inArray(json.ispay, [4, 5, 6]) !== -1 && QZFL.inArray(json.ctypeid, [1, 39]) != -1)) {
            return "http://film.qq.com" + url;
        }
        return "http://v.qq.com" + url;
    },
    getTitle: function(json) {
        if (!json) {
            return "";
        }
        json.title = json.title || "";
        json.vtit = json.vtit || "";
        if (json.ctypeid == 2 || json.ctypeid == 3) {
            var arr = json.vtit.match(/^([^_]+)_(\d+)$/);
            if ( !! arr && arr.length == 3) {
                if (json.vtit.indexOf("预告片") == -1) {
                    return [arr[1], " 第", arr[2], "集"].join("");
                } else {
                    return [json.title, " 第", arr[2], "集", arr[1]].join("");
                }
            } else {
                arr = json.vtit.match(/^([^_]+)_(\d+)_(\d+)$/);
                if ( !! arr && arr.length == 4) {
                    return [arr[1], " 第", arr[2], "集"].join("");
                }
            }
            return json.title + " " + json.vtit;
        } else if (QZFL.inArray(json.ctypeid, [1, 98]) != -1) {
            var reg = new RegExp("^" + json.title + "_\\d+");
            if (reg.test(json.vtit)) {
                return json.title || json.vtit;
            } else {
                return json.vtit;
            }
        } else if (json.ctypeid == 39) {
            return json.title || json.vtit;
        } else {
            return txv.common.formatVideoTitle(json.vtit);
        }
    },
    add: function(flag, time, total) {
        var keyid, retObj;
        ++txv.history.reportTimer;
        txv.history.addToLocal(time, total, flag);
        if (!txv.login.isLogin()) {
            txv.trace("not login!!");
            return;
        }
        if (flag == -3 && txv.history.reportTimer != txv.history.reportToServerTimeLimit) {
            txv.trace("没达到次数限制，不上报服务器:" + txv.history.reportTimer);
            return;
        } else if (flag == txv.history.timeFlagDef.begin || flag == 0) {
            txv.trace("不上报开始播放:");
            return;
        }
        txv.history.reportTimer = 0;
        keyid = txv.history.getStorageKey(txv.history.option.vid, txv.history.option.coverid);
        time = Math.ceil(time);
        total = Math.ceil(total)
        if (keyid.length < 2 && keyid.indexOf("_") === -1) {
            txv.trace("add history error: not enough options!");
            return;
        } else if (txv.history.lastReportToServerKeyid != keyid) {
            txv.history.lastReportToServerKeyid = keyid;
            txv.history.batchReportToServer(txv.history.showSimpleRecordCnt);
            return;
        }
        retObj = new Live.RetCode(100030);
        $j.ajax({
            url: txv.path.addHistoryRecordCgi,
            dataType: "jsonp",
            data: {
                t: 3,
                time: time,
                keyid: keyid,
                otype: "json"
            },
            CSRF: true,
            beforeSend: function() {
                retObj.begin();
            },
            success: function(json) {
                txv.trace("set history record success!");
                retObj.reprotSuc();
            },
            error: function() {
                txv.trace("set history record error!");
                retObj.reportErr();
            }
        });
    },
    onRemove: function(key) {
        var $mod = $e("li[key=" + key + "]");
        $mod.remove();
        txv.history.onRemoveLocal(key, txv.history.makeUserStorageKey());
        txv.history.hisList = null;
        txv.history.showHistory();
    },
    rm: function(key, idx, cb, errcb) {
        if (typeof key != "string" || key.length == 0) {
            return;
        }
        if (!txv.login.isLogin()) {
            var $mod = $e("#" + txv.history.mod_id + " [key=" + key + "]");
            idx = !isNaN(idx) ? idx : 0;
            $mod.remove();
            txv.history.rmLocal(key, idx);
            return;
        }
        if (typeof(idx) === "function") {
            cb = idx;
        }
        cb = QZFL.lang.isFunction(cb) ? cb : txv.history.onRemove;
        var retObj = new Live.RetCode(100070);
        $j.ajax({
            url: txv.path.queryHistoryRecordCgi,
            dataType: "jsonp",
            data: {
                t: 4,
                keyid: key,
                otype: "json"
            },
            CSRF: true,
            beforeSend: function() {
                retObj.begin();
            },
            success: function(json) {
                if (QZFL.object.getType(json) !== "object") {
                    retObj.reportErr(-1);
                    typeof errcb == "function" && errcb();
                } else if ( !! json.result && json.result.code == 0) {
                    cb(key);
                    retObj.reprotSuc();
                } else if ( !! json.result && json.result.code == -11) {
                    retObj.reportErr(11);
                    txv.login.clearLoginCookie();
                    cb(key);
                } else {
                    retObj.reportErr(-2);
                    typeof errcb == "function" && errcb();
                }
            },
            error: function(msg) {
                if (QZFL.lang.isString(msg) && msg.indexOf("time")) {
                    retObj.reportErr(-1);
                } else {
                    retObj.reportErr(-2);
                }
                typeof errcb == "function" && errcb();
            }
        });
    },
    removeAll: function(cb) {
        txv.history.removeAllLocal();
        txv.common.btnTj("nav.history.del_all");
        if (txv.login.isLogin()) {
            QZFL.Storage.set(txv.history.makeUserStorageKey(), "");
            cb = QZFL.lang.isFunction(cb) ? cb : QZFL.emptyFn;
            var retObj = new Live.RetCode(100070);
            $j.ajax({
                url: txv.path.queryHistoryRecordCgi,
                dataType: "jsonp",
                data: {
                    t: 5,
                    otype: "json"
                },
                CSRF: true,
                success: function(json) {
                    if (QZFL.object.getType(json) !== "object") {
                        retObj.reportErr(-2);
                        return;
                    }
                    if ( !! json.result && json.result.code == -11) {
                        txv.trace("rm all record fail,not login");
                        txv.login.clearLoginCookie();
                        cb(null);
                        retObj.reportErr(11);
                    } else if ( !! json.result && json.result.code == 0) {
                        txv.history.hisList = [];
                        txv.history.showEmpty();
                        cb(json);
                        retObj.reprotSuc();
                    } else {
                        retObj.reportErr(-2);
                    }
                },
                error: function(msg) {
                    if (QZFL.lang.isString(msg) && msg.indexOf("time")) {
                        retObj.reportErr(-1);
                    } else {
                        retObj.reportErr(-2);
                    }
                }
            });
        }
    },
    showEmpty: function(tips) {
        tips = tips || txv.history.emptyTips;
        var $mod = $e("#" + txv.history.mod_id),
            $modPop = $e("#history_pop"),
            html = this.noResultTpl.replace("{tips}", tips),
            cls = txv.history.noResultCls;
        if (!txv.history.v2) {
            if (txv.history.playPageFlag) {
                html += txv.history.iframeTemp;
                if (QZFL.userAgent.ie == 6) {
                    $mod.css("height", "62px");
                }
            }
            $mod.addClass(cls);
        } else {
            if (tips === txv.history.emptyTips && !txv.login.isLogin()) {
                $modPop.removeClass(cls);
                html = txv.history.notLoginNoResultTpl;
                cls = txv.history.noLoginCls;
            }
            if (txv.history.playPageFlag && QZFL.userAgent.ie == 6) {
                $modPop.find("iframe").css("height", "202px");
            }
            $modPop.addClass(cls);
        }
        $mod.html(html);
    },
    toString: function(key, curTime, time, total) {
        if (QZFL.lang.isString(txv.history.option.tit)) {
            txv.history.option.isPay = txv.history.option.isPay ? 1 : 0;
            txv.history.option.tit = txv.history.option.tit.replace(",", "&#44;");
            return [key, txv.history.option.tit, curTime, time, total, txv.history.option.isPay].join(',');
        }
        return "";
    },
    removeStorageByKey: function(key) {
        if (typeof(key) !== "string") {
            return;
        }
        QZFL.Storage.set(key, "");
    },
    checkSorageIsExist: (function() {
        var hadChecked = [];
        return function(key) {
            if (typeof(hadChecked[key]) !== "undefined" && hadChecked[key]) {
                return hadChecked[key];
            }
            hadChecked[key] = false;
            var iLen = txv.history.localUserStorgeKeyArr.length;
            for (var idx = 0; idx < iLen; idx++) {
                if (typeof(txv.history.localUserStorgeKeyArr[idx]) === "string" && txv.history.localUserStorgeKeyArr[idx].indexOf(key) === 0) {
                    hadChecked[key] = true;
                    return true;
                }
            }
            return false;
        }
    })(),
    updateStorageArr: function(key, curTime, type) {
        if (arguments.length < 2 || !QZFL.lang.isString(key) || isNaN(curTime)) {
            return;
        }
        for (var idx = 0, iLen = txv.history.localUserStorgeKeyArr.length; idx < iLen; idx++) {
            var str = txv.history.localUserStorgeKeyArr[idx];
            if (QZFL.lang.isString(str) && str.indexOf(key + ",") === 0) {
                var tmp = str.split(",");
                type = type || 1;
                if (type === 1) {
                    tmp[1] = curTime;
                } else {
                    tmp[2] = curTime;
                }
                txv.history.localUserStorgeKeyArr[idx] = tmp.join(",");
                QZFL.Storage.set(txv.history.uinStorageKey, txv.history.localUserStorgeKeyArr.join("|"));
                return;
            }
        }
        txv.history.localUserStorgeKeyArr.unshift([key, curTime, curTime].join(","));
        QZFL.Storage.set(txv.history.uinStorageKey, txv.history.localUserStorgeKeyArr.join("|"));
    },
    addToLocal: function(time, total, flag) {
        var key = txv.history.getStorageKey(txv.history.option.vid, txv.history.option.coverid),
            needUpdate = false,
            curTime = txv.history.getCurTimeStmp(),
            storageNumLimit = 5,
            storagekey = txv.history.makeUserStorageKey(),
            his, len;
        if (!txv.history.option.tit || !txv.history.option.lnk || key.length < 2 || txv.history.localAddLock || key.indexOf("_") === -1) {
            txv.trace("add local history error: option error");
            return;
        }
        if (!QZFL.lang.isArray(txv.history.localUserStorgeKeyArr)) {
            txv.history.getLocalUserStorgeKeyArr(function() {
                txv.history.addToLocal(time, total, flag);
            });
            return;
        }
        if (!txv.history.checkSorageIsExist(storagekey)) {
            txv.history.localUserStorgeKeyArr.push([storagekey, curTime, curTime].join(","));
            QZFL.Storage.set(txv.history.uinStorageKey, txv.history.localUserStorgeKeyArr.join("|"));
        }
        if (txv.history.localUserStorgeKeyArr.length > storageNumLimit + 1) {
            var removeKey, time = curTime,
                removeIdx;
            for (var idx = 0, iLen = txv.history.localUserStorgeKeyArr.length; idx < iLen; idx++) {
                if (QZFL.lang.isString(txv.history.localUserStorgeKeyArr[idx])) {
                    var t = txv.history.localUserStorgeKeyArr[idx].split(",");
                    if (t[1] <= time && t[0] !== txv.history.key) {
                        time = t[1];
                        removeKey = t[0];
                        removeIdx = idx;
                    }
                }
            }
            if (!isNaN(removeIdx) && removeIdx < iLen) {
                txv.history.localUserStorgeKeyArr.splice(removeIdx, 1);
                QZFL.Storage.set(txv.history.uinStorageKey, txv.history.localUserStorgeKeyArr.join("|"));
            }
            txv.history.removeStorageByKey(removeKey);
        }
        txv.trace(["add local history", time, total].join(','));
        txv.trace("storage key:" + storagekey);
        txv.history.getLocalList(storagekey);
        if (!QZFL.lang.isArray(txv.history.localList[storagekey])) {
            txv.history.getLocalList(storagekey, function() {
                txv.history.addToLocal(time, total, flag);
            });
            return;
        }
        his = txv.history.localList[storagekey];
        len = his.length;
        txv.history.localAddLock = true;
        if (len > txv.history.localStorageRecordCnt || (len == txv.history.localStorageRecordCnt && his[0].indexOf(key) !== 0)) {
            his.pop();
        }
        var str = txv.history.toString(key, curTime, time, total);
        if (len == 0) {
            his.unshift(str);
            needUpdate = true;
        } else if (his[0].indexOf(key) == 0) {
            his[0] = str;
        } else {
            txv.history.onRemoveLocal(key, storagekey);
            his.unshift(str);
            needUpdate = true;
        }
        QZFL.Storage.set(storagekey, his.join('|'));
        txv.history.updateStorageArr(storagekey, curTime, 1);
        txv.history.localAddLock = false;
        if (!txv.login.isLogin() && needUpdate) {
            txv.history.showLocalHistory(txv.history.showSimpleRecordCnt);
        }
    },
    onRemoveLocal: function(key, storagekey) {
        var his = txv.history.localList[storagekey];
        if (typeof(key) != "string" || QZFL.object.getType(his) != "array") {
            return;
        }
        var keyArr = key.split("_");
        for (var i = 0, len = his.length; i < len; i++) {
            if (typeof(his[i]) != "string") {
                continue;
            }
            if (his[i].indexOf(key) == 0) {
                his.splice(i, 1);
                break;
            }
            if ( !! keyArr[0] && his[i].indexOf(keyArr[0]) == 0) {
                his.splice(i, 1);
                break;
            }
            if ( !! keyArr[1] && his[i].indexOf(keyArr[1]) == 0) {
                his.splice(i, 1);
                break;
            }
        }
        txv.history.localList[storagekey] = his;
        QZFL.Storage.set(storagekey, his.join('|'));
    },
    rmLocal: function(key, idx) {
        if (typeof key != "string" || key.length == 0) {
            return;
        }
        var storagekey = "";
        idx = !isNaN(idx) ? idx : 0;
        storagekey = txv.history.makeUserStorageKey();
        if (!QZFL.lang.isArray(txv.history.localList[storagekey])) {
            txv.history.getLocalList(storagekey, function() {
                txv.history.rmLocal(key);
            });
            return;
        }
        txv.history.onRemoveLocal(key, storagekey);
        if (storagekey !== txv.history.key) {
            txv.history.onRemoveLocal(key, txv.history.key);
        }
        if (!txv.login.isLogin()) {
            txv.history.showLocalHistory(txv.history.showSimpleRecordCnt);
        }
    },
    getCurTimeStmp: function() {
        return Math.ceil((+new Date()) / 1000);
    },
    removeAllLocal: function() {
        var localKey = txv.history.key,
            userKey = txv.history.makeUserStorageKey();
        txv.history.localList[localKey] = [];
        txv.history.localList[userKey] = [];
        txv.history.localList = [];
        QZFL.Storage.set(localKey, "");
        QZFL.Storage.set(userKey, "");
        if (!txv.login.isLogin()) {
            if (!QZFL.lang.isArray(txv.history.localUserStorgeKeyArr)) {
                txv.history.getLocalUserStorgeKeyArr(function() {
                    txv.history.removeAllLocal();
                })
                return;
            }
            QZFL.object.each(txv.history.localUserStorgeKeyArr, function(val) {
                if (QZFL.lang.isString(val)) {
                    var arr = val.split(",");
                    QZFL.Storage.set(arr[0], "");
                }
            });
            txv.history.localUserStorgeKeyArr = [];
            QZFL.Storage.set(txv.history.uinStorageKey, "");
            txv.history.showEmpty();
        }
    },
    getHistoryTimeByKey: function(vid, coverid, cb) {
        vid = vid || txv.history.option.vid;
        coverid = coverid || txv.history.option.coverid;
        cb = typeof(cb) !== "function" ? Live.emptyFn : cb;
        var key = txv.history.getStorageKey(vid, coverid),
            hls = [],
            recordArr = [],
            storagekey = txv.history.makeUserStorageKey(),
            time = 0;
        if (QZFL.lang.isArray(txv.history.localList[storagekey])) {
            hls = txv.history.localList[storagekey];
        } else {
            txv.history.getLocalList(storagekey, function() {
                txv.history.getHistoryTimeByKey(vid, coverid, cb);
            });
            return;
        }
        if (hls.length == 0) {
            time = 0;
        } else {
            for (var idx = 0, len = hls.length; idx < len; idx++) {
                recordArr = hls[idx].split(",");
                if (recordArr.length < 4) {
                    continue;
                }
                if (QZFL.inArray(recordArr[0], [key, vid, coverid]) != -1) {
                    recordArr[3] = parseInt(recordArr[3]);
                    if (isNaN(recordArr[3]) || QZFL.inArray(recordArr[3], [-2, -1]) != -1) {
                        time = 0;
                    } else if (recordArr[3] < 0) {
                        time = recordArr[3] * -1;
                    }
                    time = recordArr[3];
                    break;
                }
            }
        }
        cb(time);
    },
    parseLocalRecord: function(val) {
        var retArr = [];
        if (QZFL.object.getType(val) == "object" && typeof(val.value) == "string") {
            val = val.value;
        }
        if ("string" == typeof(val) && val.length > 0) {
            retArr = val.split("|");
        }
        return retArr;
    },
    makeUserStorageKey: function() {
        return txv.login.isLogin() ? (txv.history.key + txv.login.getUin()) : txv.history.key;
    },
    filterSameRecord: function(arr) {
        var retArr = [],
            map = {},
            idxMap = {},
            tmpArr = [];
        if (QZFL.lang.isArray(arr)) {
            QZFL.object.each(arr, function(val) {
                if (QZFL.lang.isString(val)) {
                    tmpArr = val.split("+");
                    val = encodeURI(val);
                    if (QZFL.lang.isString(tmpArr[0])) {
                        var idx = tmpArr[0].indexOf("_");
                        if (idx > 0) {
                            tmpArr[0] = tmpArr[0].substr(idx);
                        }
                        if (typeof(map[tmpArr[0]]) === "undefined") {
                            map[tmpArr[0]] = tmpArr[2];
                            retArr.push(val);
                            idxMap[tmpArr[0]] = retArr.length - 1;
                        } else if (map[tmpArr[0]] < tmpArr[2]) {
                            map[tmpArr[0]] = tmpArr[2];
                            retArr[idxMap[tmpArr[0]]] = val;
                        }
                    }
                }
            });
        }
        return retArr;
    },
    getBatchReportToServerData: function() {
        var c = {
            localList: false,
            userList: false
        },
            lastReportTime = {
                localList: 0,
                userList: 0
            },
            curTime = txv.history.getCurTimeStmp(),
            reportArr = [],
            opt = [],
            tmpStr = "",
            userStorageKey = txv.history.makeUserStorageKey(),
            localList = txv.history.localList[txv.history.key],
            userList = txv.history.localList[userStorageKey],
            iLen = Math.max(localList.length, userList.length);
        QZFL.object.each(txv.history.localUserStorgeKeyArr, function(val, idx) {
            if (QZFL.lang.isString(val)) {
                var arr = val.split(",");
                if (val.indexOf(txv.history.key + ",") === 0) {
                    c.localList = arr[1];
                    lastReportTime.localList = arr[2];
                } else if (val.indexOf(userStorageKey + ",") === 0) {
                    if (arr[1] >= arr[2]) {
                        c.userList = true;
                        lastReportTime.userList = arr[2];
                    }
                }
            }
        });
        lastReportTime.localList = lastReportTime.userList;
        if (c.localList >= lastReportTime.localList) {
            c.localList = true;
        } else {
            c.localList = false;
        }
        if (!(c.localList || c.userList)) {
            return reportArr;
        }
        for (var idx = 0; idx < iLen; idx++) {
            if (typeof(localList[idx]) === "string" && c.localList) {
                opt = localList[idx].split(",");
                if (opt.length >= 4 && QZFL.lang.isString(opt[0]) && opt[0].indexOf("_") !== -1) {
                    if (opt[2] >= lastReportTime.localList) {
                        tmpStr = [opt[0], opt[3], opt[2]].join("+");
                        reportArr.push(tmpStr);
                    } else {
                        c.localList = false;
                        if (c.userList == false) {
                            break;
                        }
                    }
                }
            }
            if (typeof(userList[idx]) === "string" && c.userList) {
                opt = userList[idx].split(",");
                if (opt.length >= 4 && QZFL.lang.isString(opt[0]) && opt[0].indexOf("_") !== -1) {
                    if (opt[2] >= lastReportTime.userList) {
                        tmpStr = [opt[0], opt[3], opt[2]].join("+");
                        reportArr.push(tmpStr);
                    } else {
                        c.userList = false;
                        if (c.localList == false) {
                            break;
                        }
                    }
                }
            }
        }
        return txv.history.filterSameRecord(reportArr);
    },
    batchReportToServer: function(count, cb) {
        count = count || txv.history.showSimpleRecordCnt;
        cb = typeof(cb) === "function" ? cb : QZFL.emptyFn;
        if (!txv.login.isLogin() || txv.history.isBatchReport) {
            cb();
            return;
        }
        var userStorageKey = txv.history.makeUserStorageKey(),
            reportArr, retObj, curTime = txv.history.getCurTimeStmp();
        if (!QZFL.lang.isArray(txv.history.localList[txv.history.key])) {
            txv.history.getLocalList(txv.history.key, function() {
                txv.history.batchReportToServer(count, cb);
            });
            return;
        }
        if (!QZFL.lang.isArray(txv.history.localList[userStorageKey])) {
            txv.history.getLocalList(userStorageKey, function() {
                txv.history.batchReportToServer(count, cb);
            });
            return;
        }
        if (!QZFL.lang.isArray(txv.history.localUserStorgeKeyArr)) {
            txv.history.getLocalUserStorgeKeyArr(function() {
                txv.history.batchReportToServer(count, cb);
            });
            return;
        }
        reportArr = txv.history.getBatchReportToServerData();
        if (reportArr.length > 0) {
            txv.trace("list:" + reportArr.join("|"));
            retObj = new Live.RetCode(100031);
            $j.ajax({
                url: txv.path.addHistoryRecordCgi,
                dataType: "jsonp",
                data: {
                    t: 4,
                    cur: 1,
                    simp: 1,
                    pn: count,
                    list: reportArr.join("|"),
                    otype: "json"
                },
                CSRF: true,
                beforeSend: function() {
                    retObj.begin();
                },
                success: function(json) {
                    txv.history.isBatchReport = true;
                    txv.trace("batchReportToServer success!");
                    txv.dump(json);
                    retObj.reprotSuc(json);
                    if (QZFL.object.getType(json) === "object" && QZFL.object.getType(json.result) === "object" && json.result.code === 0) {
                        txv.history.updateStorageArr(txv.history.key, curTime, 2);
                        txv.history.updateStorageArr(userStorageKey, curTime, 2);
                        txv.history.hisList = json;
                        txv.history.renderContent(json);
                    }
                    cb();
                },
                error: function() {
                    txv.history.isBatchReport = true;
                    txv.trace("batchReportToServer error!");
                    retObj.reportErr();
                    cb();
                }
            });
        } else {
            cb();
        }
    }
};

function _flash_view_history(flag, time, total) {
    if (arguments.length != 3) {
        return;
    }
    txv.trace("_flash_view_history:" + flag + "," + time + "," + total);
    if (-1 != flag && total < txv.history.timeLongLimit) {
        txv.trace("小于一定时长的视频只记录开始播放点,当前限制为:" + txv.history.timeLongLimit);
        return;
    }
    if (-2 == flag) {
        txv.trace("播放结束了");
        time = -2;
    }
    txv.history.add(flag, time, total);
}
txv.headfavorite = {
    conf: {
        jsurl: "http://qzs.qq.com/tencentvideo_v1/js/txv.userbehavior.min.js",
        verStorageName: "txv_headfavorite_ver",
        jsStorageName: "txv_headfavorite_js",
        curVer: "1.0",
        localCacheTime: 86400000,
        containerId: "mod_head_favorites",
        trigglerId: "mod_head_favorites_trigger",
        popId: "mod_head_favorites_pop",
        contentTpl: '<ul class="favorites_list">{list}</ul><a href="http://v.qq.com/mytv/collect.html" target="_blank" class="btn_pop_link btn_pop_more" _hot="nav.collect"><span class="ico_text">查看更多</span></a>',
        itemTpl: '<li _hot="nav.collect.click" _qtag="nav.collect"><i class="dot"></i><a href="{url}" title="{hoverTitle}" class="video_name" target="{target}">{name}</a><span class="video_timestamp">{date}</span></li>',
        showCls: "open",
        contentId: "mod_head_favorites_content",
        noContentCls: "mod_favorites_pop_nothing",
        noContentTpl: '<div class="pop_info_nothing"><i class="ico_film_large"></i><p class="hint_text">{tips}</p></div>',
        noContentTips: "您暂时还没有收藏记录",
        getDataErrorTips: "获取数据失败，请稍后尝试刷新页面",
        notLoginCls: "mod_favorites_pop_login",
        noPlayrightTips: "由于版权方要求，本视频只能使用腾讯视频客户端播放",
        notLoginTpl: '<div class="pop_info_nothing pop_info_login"><a href="javascript:;" class="btn_login" data-type="login">登录</a><p class="hint_text">{tips}</p></div>',
        notLoginTips: "请登录查看收藏记录"
    },
    _onShowListCb: new Live.Callback("unique"),
    _onHideListCb: new Live.Callback("unique"),
    userData: {},
    addShowListCb: function(fn) {
        txv.headfavorite._onShowListCb.add(fn);
    },
    addHideListCb: function(fn) {
        txv.headfavorite._onHideListCb.add(fn);
    },
    init: function(_conf) {
        QZFL.object.extend(this.conf, _conf);
        var menu, $container = $e("#" + this.conf.containerId),
            $triggler = $e("#" + this.conf.trigglerId);
        if ($container.size() == 0 || $triggler.size() == 0) {
            return;
        }
        menu = new Live.FloatMenu({
            menu: $container,
            area: $triggler,
            areaOutdelay: 100,
            isNeedChangeDisplay: false,
            onShow: function(obj) {
                var uin, jsonData;
                if (txv.login.isLogin()) {
                    uin = txv.login.getUin();
                    jsonData = txv.headfavorite.userData[uin];
                    if (typeof jsonData == "undefined") {
                        txv.headfavorite.getData();
                    } else if (jsonData === false) {
                        txv.headfavorite.onGetDataError();
                    } else if ($container.attr("uin") != uin) {
                        $container.attr("uin", uin);
                        txv.headfavorite.renderData(jsonData);
                    }
                } else {
                    txv.headfavorite.onNotLogin();
                }
                $container.addClass(txv.headfavorite.conf.showCls);
                txv.headfavorite._onShowListCb.fire();
            },
            onHide: function(obj) {
                $container.removeClass(txv.headfavorite.conf.showCls);
                txv.headfavorite._onHideListCb.fire();
            }
        });
        txv.login.addLogoutCallback(function() {
            txv.headfavorite.userData = {};
        });
        if (txv.common.conf.playPageFlag) {
            var iframe = document.createElement("iframe");
            iframe.src = "about:blank";
            iframe.frameborder = "0";
            iframe.className = "iframe_mask";
            $container.find("div.pop_info_main").eq(0).insertBefore(iframe, $(txv.headfavorite.conf.contentId));
        }
        $triggler.onClick(function(evt) {
            if (!txv.login.isLogin()) {
                QZFL.event.preventDefault(evt);
                txv.login.openLogin();
            }
        });
        if (QZFL.userAgent.ie == 6) {
            $container.delegate("li", "mouseover", function(evt) {
                QZFL.css.addClassName(this, "hover");
            }, true).delegate("li", "mouseout", function(evt) {
                QZFL.css.removeClassName(this, "hover");
            }, true);
        }
    },
    onNotLogin: function() {
        var $pop = $e("#" + this.conf.popId),
            $content = $e("#" + this.conf.contentId);
        $content.html(txv.headfavorite.conf.notLoginTpl.replace("{tips}", txv.headfavorite.conf.notLoginTips));
        $pop.removeClass(txv.headfavorite.conf.noContentCls).addClass(txv.headfavorite.conf.notLoginCls);
        txv.headfavorite._adaptIframeHeight(164);
    },
    getData: function() {
        txv.headfavorite.onGetingData();
        if (txv.headfavorite.isNeedLoadJs()) {
            txv.headfavorite.loadJs(function(isSuc) {
                if (isSuc) {
                    txv.headfavorite._getData();
                } else {
                    txv.headfavorite.onGetDataError();
                }
            });
        } else {
            this._getData();
        }
    },
    _adaptIframeHeight: function(hei) {
        if (QZFL.userAgent.ie == 6 && txv.common.conf.playPageFlag) {
            var $container = $e("#" + this.conf.containerId),
                $iframe = $container.find("iframe"),
                $pop = $e("#" + this.conf.popId);
            hei = hei || $pop.attr("clientHeight");
            if (hei > 0) {
                $iframe.css("height", hei + "px");
            }
        }
    },
    _getData: function() {
        txv.favourite.getUserCollectData({
            e: 10,
            onSuccess: function(json) {
                txv.headfavorite.onGetDataSuc(json);
            },
            onError: function() {
                txv.headfavorite.onGetDataError();
            },
            onNotLogin: function() {
                txv.headfavorite.onNotLogin();
            }
        });
    },
    onGetDataError: function() {
        txv.headfavorite.showEmpty(txv.headfavorite.conf.getDataErrorTips);
        txv.headfavorite.userData[txv.login.getUin()] = false;
    },
    onGetingData: function() {
        txv.headfavorite.showEmpty("正在努力获取数据");
    },
    showEmpty: function(tips) {
        var $pop = $e("#" + this.conf.popId),
            $content = $e("#" + this.conf.contentId);
        tips = tips || txv.headfavorite.conf.noContentTips;
        $content.html(txv.headfavorite.conf.noContentTpl.replace("{tips}", tips));
        $pop.removeClass(txv.headfavorite.conf.notLoginCls).addClass(txv.headfavorite.conf.noContentCls);
        txv.headfavorite._adaptIframeHeight(213);
    },
    onGetDataSuc: function(json) {
        txv.headfavorite.userData[txv.login.getUin()] = json;
        if (json && json.shoucanglist && json.shoucanglist.length > 0) {
            txv.headfavorite.renderData(json);
        } else {
            txv.headfavorite.showEmpty(txv.headfavorite.conf.noContentTips);
        }
    },
    renderData: function(json) {
        if (!json || !json.shoucanglist || json.shoucanglist.length == 0) {
            txv.headfavorite.showEmpty(txv.headfavorite.conf.noContentTips);
            return;
        }
        var html = "",
            $content = $e("#" + txv.headfavorite.conf.contentId),
            itemTpl = txv.headfavorite.conf.itemTpl,
            idx, len, tmpObj, popDom = $(txv.headfavorite.conf.popId);
        QZFL.css.removeClassName(popDom, txv.headfavorite.conf.noContentCls);
        QZFL.css.removeClassName(popDom, txv.headfavorite.conf.notLoginCls);
        for (idx = 0, len = json.shoucanglist.length; idx < len; idx++) {
            tmpObj = json.shoucanglist[idx];
            tmpObj.url = txv.headfavorite.getUrl(tmpObj);
            tmpObj.date = "";
            if (typeof tmpObj.time == "string") {
                tmpObj.date = tmpObj.time.slice(0, 10);
            }
            tmpObj.name = txv.history.getTitle({
                vtit: tmpObj.title,
                ctypeid: tmpObj.type_id
            });
            if (txv.headfavorite.canPlay(tmpObj.playright) && tmpObj.url.indexOf("http://cache.tv.qq.com/") == -1) {
                tmpObj.hoverTitle = tmpObj.name;
                tmpObj.target = "_blank";
            } else {
                tmpObj.hoverTitle = txv.headfavorite.conf.noPlayrightTips;
                tmpObj.target = "_self";
                tmpObj.url = "javascript:;";
            }
            html += QZFL.string.format(itemTpl, tmpObj);
        }
        $content.html(txv.headfavorite.conf.contentTpl.replace("{list}", html));
        setTimeout(function() {
            txv.headfavorite._adaptIframeHeight();
        }, 20);
    },
    getUrl: function(obj) {
        var str = "";
        if (!obj) {
            return str;
        }
        if (obj.exid.length > 0) {
            str = txv.common.getPlayUrl(obj.exid, obj.vid);
        } else {
            str = txv.common.getPlayUrl(obj.vid);
        }
        if (QZFL.inArray(obj.pay_status, [4, 5, 6]) != -1) {
            str = "http://film.qq.com/" + str;
        } else {
            str = "http://v.qq.com/" + str;
        }
        if (QZFL.string.isURL(obj.vid)) {
            str = obj.vid;
        }
        return str;
    },
    canPlay: function(playright) {
        var ret = true;
        if (QZFL.lang.isString(playright) && playright.indexOf("+2+") == -1) {
            ret = false;
        }
        return ret;
    },
    isNeedLoadJs: function() {
        return typeof txv.Favourite == "undefined" || !QZFL.lang.isFunction(txv.favourite.getUserCollectData);
    },
    loadJs: function(cb) {
        txv.headfavorite.getLocalJs(function(isSuc) {
            if (isSuc) {
                cb(isSuc);
            } else {
                $j.ajax({
                    url: txv.headfavorite.conf.jsurl,
                    dataType: "text",
                    error: function() {
                        var ret = false,
                            isLoad = false;
                        $j.getScript(txv.headfavorite.conf.jsurl, function() {
                            if (isLoad) {
                                return;
                            }
                            ret = true;
                            cb(true);
                        });
                        setTimeout(function() {
                            if (!ret) {
                                isLoad = true;
                                cb(false);
                            }
                        }, 500);
                    },
                    success: function(text) {
                        var ret = true;
                        try {
                            eval(text);
                        } catch (e) {
                            ret = false;
                        }
                        cb(ret);
                        if (ret) {
                            txv.headfavorite.saveJsToLocal(text);
                        }
                    }
                });
            }
        });
    },
    getLocalJs: function(cb) {
        QZFL.Storage.get(txv.headfavorite.conf.verStorageName, function(val) {
            var arr = [],
                nowTime = (+new Date());
            if (val && QZFL.lang.isString(val) && val.indexOf("$$") != -1) {
                arr = val.split("$$");
                if (arr[0] == txv.headfavorite.conf.curVer && arr[1] + txv.headfavorite.conf.localCacheTime > nowTime) {
                    QZFL.Storage.get(txv.headfavorite.conf.jsStorageName, function(val) {
                        var ret = true;
                        if (val) {
                            try {
                                eval(val);
                            } catch (e) {
                                ret = false;
                            }
                            cb(ret);
                        } else {
                            cb(false);
                        }
                    });
                } else {
                    cb(false);
                }
            } else {
                cb(false);
            }
        })
    },
    saveJsToLocal: function(jsText) {
        QZFL.Storage.set(txv.headfavorite.conf.jsStorageName, jsText);
        QZFL.Storage.set(txv.headfavorite.conf.verStorageName, [txv.headfavorite.conf.curVer, (+new Date())].join("$$"));
    }
}
Live.txv.template = {
    _isLoadingJS: false,
    timer: {
        waitJS: 0
    },
    FILL_TYPE: {
        TPL_ID: 1,
        TPL_STR: 2
    },
    convertTime: function(d) {
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var hour = d.getHours();
        var min = d.getMinutes();
        var sec = d.getSeconds();

        function fillZero(str) {
            return str < 10 ? "0" + str : str;
        }
        return {
            "year": d.getFullYear(),
            "month": month,
            "day": day,
            "hour": fillZero(hour),
            "min": fillZero(min),
            "sec": fillZero(sec)
        }
    },
    MODIFIERS: {
        formatTime: function(str) {
            if (!/\d+/.test(str)) return str;
            var v = parseInt(str) * 1000;
            var d = new Date(v);
            var dd = Live.txv.template.convertTime(d);
            return [[dd.year, dd.month, dd.day].join("-"), [dd.hour, dd.min, dd.sec].join(":")].join(" ");
        },
        getTimeLong: function(time) {
            var m = parseInt(time / 60);
            var s = time % 60;
            return "" + m + "分钟" + s + "秒";
        },
        getAvatar: function(uin, size) {
            size = size || 50;
            return ["http://qlogo", uin % 4 + 1, ".store.qq.com/qzone/", uin, "/", uin, "/", size].join("")
        },
        getTimeLong2: function(time) {
            var m = parseInt(time / 60);
            var s = time % 60;
            return "" + m + "&#039;" + s + "&#034;";
        },
        getTimeLong3: function(time) {
            var m = parseInt(time / 60);
            var s = time % 60;
            if (m < 10) m = "0" + m;
            if (s < 10) s = "0" + s;
            return [m, ":", s].join("");
        },
        getFormatNum: function(num) {
            if (!num || typeof(num) != "number") return 0;
            var na = ("" + num).split("").reverse();
            var re = [];
            for (var i = 0, len = na.length; i < len; i++) {
                if (i > 0 && i % 3 == 0) {
                    re.push(',');
                }
                re.push(na[i]);
            }
            return re.reverse().join("");
        },
        encode2: function(str) {
            return encodeURIComponent(str.replace(/<em[^>]+>/g, "").replace(/<\/em>/g, ""));
        },
        getZY_TV_URL: function(tvid) {
            if (!tvid || tvid == "") tvid = -1;
            return ["http://v.qq.com/variety/type/list_", tvid, "_0_0.html"].join("");
        },
        getZY_TP_URL: function(lxid) {
            if (!lxid || lxid == "") lxid = -1;
            return ["http://v.qq.com/variety/type/list_", lxid, "_0_0.html"].join("");
        },
        filterComment: function(str) {
            return str.replace(/\\r\\n/ig, "<br/>");
        },
        getPlayUrl: function(cid) {
            return txv.common.getPlayUrl(cid);
        },
        getDetailUrl: function(cid, typeid) {
            return txv.common.getDetailUrl(cid, typeid || 0);
        },
        getVideoPlayUrl: function(vid) {
            return txv.common.getVideoPlayUrl(vid);
        },
        getBokePlayUrl: function(vid) {
            return txv.common.getBokePlayUrl(vid);
        },
        encode: function(str) {
            return encodeURIComponent(str);
        },
        searchurl: function(tag) {
            return txv.path.search_cgi + "&ms_key=" + encodeURIComponent(tag);
        },
        getVideoSnap: function(vid) {
            return txv.common.getVideoSnap(vid, 0);
        },
        getKuainvPlayUrl: function(cid) {
            if (!cid) return "";
            if (cid.length == 15) {
                var str = [txv.common.rootPath, "/kuainv/cover/", cid.charAt(0), "/", cid, ".html"].join("");
                return str;
            }
            return "";
        },
        filterStr: function(str) {
            return QZFL.string.filterAngAndQt(str);
        },
        escHTML: function(str) {
            return QZFL.string.escHTML(str);
        },
        restHTML: function(str) {
            return QZFL.string.restHTML(str);
        },
        nl2br: function(str) {
            return QZFL.string.nl2br(str);
        },
        getTimeDiff: function(time) {
            if (isNaN(time)) {
                return time;
            }
            if (/^\d{10}$/.test(time)) {
                time = time * 1000;
            }
            var dd = new Date(time);
            var now = new Date();
            var todaySec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
            var t0 = new Date().valueOf();
            var sec = parseInt((t0 - time) / 1000);
            var strtm = "";
            if (sec < 60) {
                strtm = "刚刚";
            } else if (sec > 60 && sec < 3600) {
                strtm = Math.ceil(sec / 60) + "分钟前";
            } else {
                var dataObj = Live.txv.template.convertTime(dd);
                if (sec >= 3600 && sec < todaySec) {
                    strtm = "今天 " + dataObj.hour + ":" + dataObj.min;
                } else if (sec > todaySec && sec < todaySec + 86400) {
                    strtm = "昨天 " + dataObj.hour + ":" + dataObj.min;
                } else {
                    strtm = dataObj.month + "月" + dataObj.day + "日" + " " + dataObj.hour + ":" + dataObj.min;
                }
            }
            return strtm;
        }
    },
    fillHtml: function(json, tplid, containerid, isClear, modifiers, filltype, callback, isResetLink) {
        function fill(_json, _tplid, _containerid, _isClear, _modifiers, _filltype, _callback, _isResetLink) {
            txv.template._isLoadingJS = false;
            var container = $(_containerid);
            if (!container) return;
            if (typeof filltype == "undefined") {
                filltype = Live.txv.template.FILL_TYPE.TPL_ID;
            }
            if ((filltype == Live.txv.template.FILL_TYPE.TPL_ID && !$(_tplid)) || (filltype == Live.txv.template.FILL_TYPE.TPL_STR && !_tplid)) return;
            if (typeof _isClear == "undefined") {
                _isClear = true;
            }
            if (typeof filltype == "undefined") {
                filltype = Live.txv.template.FILL_TYPE.TPL_ID;
            }
            _json._MODIFIERS = _modifiers || Live.txv.template.MODIFIERS;
            var myTemplateObj = filltype == Live.txv.template.FILL_TYPE.TPL_ID ? TrimPath.parseDOMTemplate(_tplid) : TrimPath.parseTemplate(_tplid);
            var result = myTemplateObj.process(_json);
            if ( !! _isClear) {
                container.innerHTML = result;
            } else {
                container.innerHTML += result;
            }
            if (typeof _isResetLink == "undefined") {
                _isResetLink = true;
            }
            if ( !! _isResetLink && txv.common.isWebqq()) {
                $e("#" + _containerid + " a").attr("target", "_self");
            }
            if (typeof _callback == "function") {
                _callback();
            }
        }
        if (typeof TrimPath == "undefined") {
            if (txv.template._isLoadingJS == false) {
                txv.template._isLoadingJS = true;
                $j.getScript(Live.txv.path.trimpath, function() {
                    fill(json, tplid, containerid, isClear, modifiers, filltype, callback, isResetLink);
                });
            } else {
                setTimeout(function() {
                    txv.template.fillHtml(json, tplid, containerid, isClear, modifiers, filltype, callback, isResetLink);
                }, 100);
            }
        } else {
            fill(json, tplid, containerid, isClear, modifiers, filltype, callback, isResetLink);
        }
    }
} /*  |xGv00|e5a9f32ed5c95f2a1e47f0e4aebe2bec */