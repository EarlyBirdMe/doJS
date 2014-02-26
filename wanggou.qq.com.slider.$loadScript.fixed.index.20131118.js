window['PP.wg.index.time'] && window['PP.wg.index.time'].push(new Date());
function $addClass(ids, cName) {
    $setClass(ids, cName, "add");
};
function $addEvent(obj, type, handle) {
    if (!obj || !type || !handle) {
        return;
    }
    if (obj instanceof Array) {
        for (var i = 0, l = obj.length; i < l; i++) {
            $addEvent(obj[i], type, handle);
        }
        return;
    }
    if (type instanceof Array) {
        for (var i = 0, l = type.length; i < l; i++) {
            $addEvent(obj, type[i], handle);
        }
        return;
    }
    window.__allHandlers = window.__allHandlers || {};
    window.__Hcounter = window.__Hcounter || 1;
    function setHandler(obj, type, handler, wrapper) {
        obj.__hids = obj.__hids || [];
        var hid = 'h' + window.__Hcounter++;
        obj.__hids.push(hid);
        window.__allHandlers[hid] = {type: type, handler: handler, wrapper: wrapper}
    }

    function createDelegate(handle, context) {
        return function () {
            return handle.apply(context, arguments);
        };
    }

    if (window.addEventListener) {
        var wrapper = createDelegate(handle, obj);
        setHandler(obj, type, handle, wrapper)
        obj.addEventListener(type, wrapper, false);
    }
    else if (window.attachEvent) {
        var wrapper = createDelegate(handle, obj);
        setHandler(obj, type, handle, wrapper)
        obj.attachEvent("on" + type, wrapper);
    }
    else {
        obj["on" + type] = handle;
    }
};
function $addRd(url, rd) {
    url = url.replace(/？/g, "?");
    var reg = /ptag[=,]\d+\.\d+\.\d+/i, hasQuery = /\?/.test(url);
    hasAnchor = url.indexOf('#') > -1;
    if (reg.test(url)) {
        url = url.replace(reg, "PTAG=" + rd);
    } else {
        url = hasAnchor ? url.replace("#", (hasQuery ? "&" : "?") + "PTAG=" + rd + "#") : (url + (hasQuery ? "&" : "?") + "PTAG=" + rd);
    }
    return url;
};
function $addToken(url, type) {
    var token = $getToken();
    if (url == "" || (url.indexOf("://") < 0 ? location.href : url).indexOf("http") != 0) {
        return url;
    }
    if (url.indexOf("#") != -1) {
        var f1 = url.match(/\?.+\#/);
        if (f1) {
            var t = f1[0].split("#"), newPara = [t[0], "&g_tk=", token, "&g_ty=", type, "#", t[1]].join("");
            return url.replace(f1[0], newPara);
        } else {
            var t = url.split("#");
            return[t[0], "?g_tk=", token, "&g_ty=", type, "#", t[1]].join("");
        }
    }
    return token == "" ? (url + (url.indexOf("?") != -1 ? "&" : "?") + "g_ty=" + type) : (url + (url.indexOf("?") != -1 ? "&" : "?") + "g_tk=" + token + "&g_ty=" + type);
};
function $addUniq(arr, obj) {
    if (!arr) {
        arr = [obj];
        return arr;
    }
    for (var i = arr.length; i--;) {
        if (arr[i] === obj) {
            return arr;
        }
    }
    arr.push(obj);
    return arr;
};
function $addUrlRd(url, rd, biz) {
    try {
        biz = biz ? biz : "biFocusAd";
        if (biz == "biFocusAd" || biz == "martCpc" || biz == "focusAd") {
            var targetUrl = decodeURIComponent($getQuery("url", url));
            url = /ptag|PTAG/.test(targetUrl) ? (url.replace(/\d+\.\d+\.\d+/, "") + encodeURIComponent(rd)) : (url + encodeURIComponent((targetUrl.indexOf("?") > -1 ? "&" : "?") + "ptag=" + rd));
        } else if (biz == "biXuanPin") {
            url = url.replace(/(\&amp\;|&)pageurl/, encodeURIComponent('?PTAG=' + rd) + '&amp;pageurl');
        }
        return url;
    } catch (e) {
        return url;
    }
};
var $appendHtml = function (o, html) {
    if (o && o.nodeType == 1) {
        var domf = document.createDocumentFragment(), tmp = document.createElement('div');
        tmp.innerHTML = $xss(html, "none");
        var nodes = tmp.childNodes;
        for (var i = 0, len = nodes.length; i < len; i++) {
            domf.appendChild(nodes[i].cloneNode(true));
        }
        o.appendChild(domf);
    }
};
function $arrayClone(arr) {
    return arr.slice(0);
};
function $arrayFilter(arr, filterFn) {
    if (arr.filter) {
        return arr.filter(filterFn);
    } else {
        var subArr = [];
        for (var i = 0, j = arr.length; i < j; i++) {
            if (filterFn(arr[i], i, arr)) {
                subArr.push(arr[i]);
            }
        }
        return subArr;
    }
};
function $arrayLookup(arr, item, fn) {
    for (var i = 0, j = arr.length; i < j; i++) {
        if ((fn ? fn(arr[i], i) : arr[i]) === item) {
            return i;
        }
    }
    return-1;
};
function $arrayRemove(source, target, compFunc) {
    var count = 0, len = source.length;
    for (var c = 0; c < len; c++) {
        if (compFunc ? compFunc(source[c]) : (source[c] === target)) {
            source.splice(c--, 1);
            count++;
        }
    }
    return count;
};
function $autoLoadImages(option) {
    var opt = {scrollOffsetH: 100, initSrcName: 'init_src'};
    if (option) {
        for (var key in option) {
            opt[key] = option[key];
        }
    }
    if (window['_PP_core_autoLoadImages_data']) {
        if (window['_PP_core_autoLoadImages_data'].nosrcLength == 0) {
            clearInterval(window._PP_core_autoLoadImages_data.ptr);
            window._PP_core_autoLoadImages_data.ptr = setInterval(function () {
                doScroll();
            }, 100);
        }
        window['_PP_core_autoLoadImages_data'].allNum = 0;
        return;
    }
    window['_PP_core_autoLoadImages_data'] = {allNum: 0, nosrcImages: [], nosrcLength: 0, ciguid: 0, ptr: null};
    clearInterval(window._PP_core_autoLoadImages_data.ptr);
    window._PP_core_autoLoadImages_data.ptr = setInterval(function () {
        doScroll()
    }, 100);
    function doScroll() {
        var data = window['_PP_core_autoLoadImages_data'], allImage = document.images;
        if (allImage.length > data.allNum) {
            data.nosrcImages = [];
            for (var i = 0, j = allImage.length; i < j; i++) {
                var src = allImage[i].getAttribute(opt.initSrcName);
                if (src && !allImage[i].getAttribute("iguid")) {
                    data.nosrcImages.push([allImage[i], src, $getY(allImage[i])]);
                }
            }
            data.nosrcLength = data.nosrcImages.length;
            data.allNum = allImage.length;
        }
        if (data.nosrcLength == 0) {
            if (data.ptr != null) {
                clearInterval(data.ptr);
                data.ptr = null;
                data.allNum = 0;
                data.nosrcImages = [];
            }
            return;
        }
        ;
        var bodyCache = document.body, domCache = (document.compatMode == 'BackCompat') ? bodyCache : document.documentElement, offsetH = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop, visibleH = offsetH + domCache.clientHeight;
        for (var i = 0, j = data.nosrcImages.length; i < j; i++) {
            if (!data.nosrcImages[i]) {
                continue;
            }
            if ((visibleH + opt.scrollOffsetH) > data.nosrcImages[i][2]) {
                var _item = data.nosrcImages[i];
                _item[0].setAttribute("src", _item[1]);
                _item[0].setAttribute("iguid", data.ciguid++);
                delete data.nosrcImages[i];
                data.nosrcLength--;
            }
        }
    }
};
function $batchBiXuanPin(opt) {
    var option = {dataList: [], business: "pp", type: 1, sortType: 0, idList: [], mask: 0, staticFileUrl: "", templateId: "", templateType: "json", contentList: [], serverTime: null, pageSize: 0, onInit: $empty(), onEach: $empty(), onRender: null, onSuccess: $empty(), timeout: 3000, beginTime: "", endTime: "", byCgi: g_batchBiXuanPin_byCgi && p_batchBiXuanPin_byCgi};
    $option(option, opt);
    var inptr = null;
    var hasReqStaticFile = false;
    var cgiCallback = getCgiCallback();
    var stateObj = {};
    var retCode = null;
    var pcObj = {};
    init();
    if (option.dataList.length > 0) {
        processData();
    } else {
        var now = option.serverTime ? option.serverTime : $getServerTime();
        if (!option.byCgi || ((option.endTime && now > new Date(option.endTime)) || (option.beginTime && now < new Date(option.beginTime)))) {
            loadStaticData();
        } else {
            loadCgiData();
            startTimer();
        }
    }
    function init() {
        for (var i = 0, j = option.contentList.length; i < j; i++) {
            option.contentList[i] = $id(option.contentList[i]);
        }
        var arr = null;
        if ((option.pageSize + "").indexOf("|") > -1) {
            arr = option.pageSize.split("|");
        }
        for (var i = 0, j = option.idList.length; i < j; i++) {
            stateObj[option.idList[i]] = false;
            pcObj[option.idList[i]] = arr ? arr[i] : option.pageSize;
        }
    }

    function loadCgiData() {
        var url = "http://" + (option.business == "wg" ? "opt.buy.qq.com" : "express.paipai.com") + "/tws/xuanpin/xuanpin_multi_search?" + $buildParam({type: option.type, id: option.idList.join("|"), scence: 0, mask: option.mask, pageurl: encodeURIComponent(location.href), curl: document.referrer ? encodeURIComponent(document.referrer) : "", pi: 0, sortType: option.sortType, ps: option.pageSize, debug_uin: $getUin(), callback: cgiCallback, t: Math.round(new Date() / (1000 * 60))});
        retCode = $returnCode({id: 180408, url: url, frequence: 2});
        $loadScript(url);
        window[cgiCallback] = function (json) {
            retCode.report(json.errCode == 0 ? true : false, json.errCode);
            if (json.errCode == "0") {
                clearTimeout(inptr);
                option.dataList = json.data;
                processData();
            } else {
                loadStaticData();
            }
        };
    }

    function getCgiCallback() {
        if (!$batchBiXuanPin.counter) {
            $batchBiXuanPin.counter = 0;
        }
        $batchBiXuanPin.counter++;
        return"biXpCallback" + $batchBiXuanPin.counter;
    }

    function startTimer() {
        inptr = setTimeout(function () {
            if (option.dataList.length == 0) {
                loadStaticData();
            }
        }, option.timeout);
    }

    function loadStaticData() {
        if (!option.staticFileUrl || hasReqStaticFile) {
            return;
        }
        var cbName = option.staticFileUrl.match(/\w*(?=\.js)/)[0];
        $loadScript(option.staticFileUrl + "?t=" + Math.round(new Date() / (1000 * 60)));
        window[cbName] = function (json) {
            if (json.errCode != "0") {
                return;
            }
            option.dataList = json.data;
            processData();
        };
        window[cgiCallback] = function (json) {
            retCode && (retCode.report(json.errCode == 0 ? true : false, json.errCode));
        };
        hasReqStaticFile = true;
    }

    function processData() {
        option.onInit();
        renderHtml();
        if (IsDataComplete()) {
            option.onSuccess();
        } else {
            loadStaticData();
        }
    }

    function renderHtml() {
        for (var i = 0, j = option.dataList.length; i < j; i++) {
            var groupId = option.type == 1 ? option.dataList[i].fixId : option.dataList[i].id;
            var groupIndex = getGroupIndex(groupId);
            if (stateObj[groupId]) {
                continue;
            }
            var list = option.dataList[i].list;
            if (list.length == 0) {
                continue;
            }
            var pc = pcObj[groupId] * 1;
            if (list.length > pc) {
                list = $randomSubArray(list, pc);
            }
            option.onEach(list, groupIndex, groupId);
            if (option.templateId) {
                var html = "";
                if (option.templateType == 'json') {
                    html = $formatArray(option.templateId, list);
                }
                else {
                    var tmp = [], tpl = $id(option.templateId).text;
                    for (var h = 0; h < list.length; h++) {
                        tmp.push($jsonToTpl(list[h], tpl));
                    }
                    ;
                    html = tmp.join('');
                }
                $setHtml(option.contentList[groupIndex], html);
            } else if (option.onRender) {
                option.onRender(list, groupIndex, groupId);
            }
            stateObj[groupId] = true;
        }
    };
    function getGroupIndex(groupId) {
        for (var i = 0, j = option.idList.length; i < j; i++) {
            if (option.idList[i] == groupId) {
                return i;
            }
        }
        return-1;
    };
    function IsDataComplete() {
        if (hasReqStaticFile) {
            return true;
        } else {
            for (var i = 0, j = option.idList.length; i < j; i++) {
                if (!stateObj[option.idList[i]]) {
                    return false;
                }
            }
        }
        return true;
    }
};
function $biFocusAd(opt) {
    var option = {dataList: [], idList: [], staticFileUrl: "", templateType: "json", templateIdList: null, contentList: null, pageSize: 0, pcs: "", serverTime: null, delay: 0, onInit: $empty(), onSuccess: $empty(), onEach: $empty(), onRender: null, timeout: 3000, beginTime: "", endTime: "", byCgi: g_biFocusAd_byCgi && p_biFocusAd_byCgi};
    $option(option, opt);
    var inptr = null;
    var hasReqStaticFile = false;
    var thisFunc = arguments.callee;
    var cgiCallback = getCgiCallback();
    var stateObj = new Array(option.idList.length);
    var isTimeout = false;
    init();
    if (option.dataList.length > 0) {
        processData();
    } else {
        var now = option.serverTime ? option.serverTime : $getServerTime();
        if (!option.byCgi || ((option.endTime && now > new Date(option.endTime)) || (option.beginTime && now < new Date(option.beginTime)))) {
            loadStaticData();
        } else {
            loadCgiData();
            startTimer();
        }
    }
    function init() {
        if (option.contentList) {
            if ($isArray(option.contentList)) {
                for (var i = 0, j = option.contentList.length; i < j; i++) {
                    if ($isArray(option.contentList[i])) {
                        var list = option.contentList[i];
                        for (var m = 0, n = list.length; m < n; m++) {
                            list[m] = $id(list[m]);
                        }
                    } else {
                        option.contentList[i] = $id(option.contentList[i]);
                    }
                }
            } else {
                option.contentList = $id(option.contentList);
            }
        }
        for (var i = 0, j = stateObj.length; i < j; i++) {
            stateObj[i] = [];
        }
        if (!!option.pcs) {
            option.pageSize = {};
            var pcs = option.pcs.split(",");
            for (var i = 0, j = pcs.length; i < j; i++) {
                var arr = pcs[i].split(":");
                option.pageSize[arr[0]] = arr[1];
            }
        }
    }

    function loadCgiData() {
        var url = "http://express.paipai.com/tws/focus/focus_show_direction?" + $buildParam({gids: option.idList.join("|"), url: encodeURIComponent(location.href), urlref: document.referrer ? encodeURIComponent(document.referrer) : "", pc: typeof option.pageSize == "object" ? "" : option.pageSize, pcs: option.pcs, callback: cgiCallback, debug_uin: $getUin(), t: Math.round(new Date() / (1000 * 60))});
        setTimeout(function () {
            $loadScript(url)
        }, option.delay);
        window[cgiCallback] = function (json) {
            if (json.errCode == "0") {
                clearTimeout(inptr);
                option.dataList = json.list;
                processData();
            } else {
                loadStaticData();
            }
        };
    }

    function getCgiCallback() {
        if (!thisFunc.counter) {
            thisFunc.counter = 0;
        }
        thisFunc.counter++;
        return"biFocusAd" + thisFunc.counter;
    }

    function startTimer() {
        inptr = setTimeout(function () {
            if (option.dataList.length == 0) {
                loadStaticData();
                isTimeout = true;
            }
        }, option.timeout);
    }

    function loadStaticData() {
        if (!option.staticFileUrl || hasReqStaticFile) {
            return;
        }
        $loadScript(option.staticFileUrl + "?t=" + Math.round(new Date() / (1000 * 60)));
        var cbName = option.staticFileUrl.match(/\w*(?=\.js)/)[0];
        window[cbName] = function (json) {
            if (json.errCode != "0") {
                return;
            }
            option.dataList = json.list;
            processData();
        };
        window[cgiCallback] = $empty();
        hasReqStaticFile = true;
    }

    function processData() {
        option.onInit();
        renderHtml();
        var isComplete = IsDataComplete();
        if (option.staticFileUrl && !hasReqStaticFile && !isComplete) {
            loadStaticData();
        }
        if (!option.staticFileUrl || hasReqStaticFile || isComplete) {
            option.onSuccess();
        }
    }

    function renderHtml() {
        for (var i = 0, j = option.dataList.length; i < j; i++) {
            var locations = option.dataList[i].locations;
            var groupId = option.dataList[i].groupid;
            var groupIndex = $inArray(groupId * 1, option.idList);
            if (groupIndex == -1 || locations.length == 0) {
                continue;
            }
            for (var m = 0, n = locations.length; m < n; m++) {
                if (stateObj[groupIndex][m]) {
                    continue;
                }
                var locationId = locations[m].locationid;
                var plans = locations[m].plans;
                if (!!option.pcs && !option.pageSize[locationId]) {
                    continue;
                }
                if (plans.length == 0) {
                    stateObj[groupIndex][m] = false;
                    continue;
                }
                var pageSize = getLocationSize(locationId);
                if (pageSize == 0) {
                    continue;
                }
                if (plans.length > pageSize) {
                    if (isTimeout) {
                        plans = plans.slice(0, pageSize);
                    } else {
                        plans = $randomSubArray(plans, pageSize);
                    }
                }
                option.onEach(plans, groupId, locationId, groupIndex, m);
                if (option.templateIdList) {
                    var templateId = getTemplate(groupIndex, m);
                    if (option.templateType == 'json') {
                        var html = $formatArray(templateId, plans);
                    } else {
                        var tmp = [], html = '', tpl = $id(templateId).text;
                        for (var k = 0; k < plans.length; k++) {
                            tmp.push($jsonToTpl(plans[k], tpl));
                        }
                        ;
                        html = tmp.join('');
                    }
                    $appendHtml(getContentDom(groupIndex, m, locationId), html);
                } else if (option.onRender) {
                    option.onRender(plans, groupId, locationId, groupIndex, m);
                }
                ;
                stateObj[groupIndex][m] = true;
            }
        }
    };
    function getTemplate(groupIndex, locationIndex) {
        if (typeof option.templateIdList == "string") {
            return option.templateIdList;
        } else if ($isArray(option.templateIdList)) {
            if (typeof option.templateIdList[groupIndex] == "string") {
                return option.templateIdList[groupIndex];
            } else {
                return option.templateIdList[groupIndex][locationIndex]
            }
        }
        return"";
    }

    function getLocationSize(locationId) {
        return typeof option.pageSize == "number" ? option.pageSize : option.pageSize[locationId];
    }

    function getContentDom(groupIndex, locationIndex, locationId) {
        if (!option.contentList) {
            return $id('f' + locationId);
        } else if ($isArray(option.contentList)) {
            if ($isArray(option.contentList[groupIndex])) {
                return option.contentList[groupIndex][locationIndex];
            } else {
                return option.contentList[groupIndex];
            }
        } else {
            return option.contentList;
        }
    }

    function IsDataComplete() {
        if (hasReqStaticFile) {
            return true;
        } else {
            for (var i = 0, j = stateObj.length; i < j; i++) {
                if (stateObj[i].length == 0) {
                    return false;
                }
                for (var m = 0, n = stateObj[i].length; m < n; m++) {
                    if (!stateObj[i][m]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
};
$break = window["$break"] || function (t) {
    return t === window["$break"];
};
function $buildParam(opt) {
    var arr = [];
    for (var o in opt) {
        o && (arr.push(o + "=" + opt[o]));
    }
    return arr.join("&");
};
function $categoryOrder(opt) {
    var option = {ps: 15, timeout: 3000, onSuccess: $empty(), onTimeout: $empty()}
    $option(option, opt);
    var cbName = "floorOrderCallback";
    loadData();
    var inptr = setTimeout(function () {
        window[cbName] = $empty();
        option.onTimeout();
    }, option.timeout);

    function loadData() {
        $loadScript("http://focus.paipai.com/categorydirect/directionshow?qquin=" + $getUin() + "&ps=" + option.ps + "&callback=" + cbName + "&t=" + Math.round(new Date() / (1000 * 60 * 60)));
        window[cbName] = function (json) {
            clearTimeout(inptr);
            if (json.errCode != "0") {
                option.onTimeout();
                return;
            }
            option.onSuccess(json.data, json.strategyId);
        };
    }
};
function $child(node, val, fn, filter) {
    var results = [], filter = filter || $empty();
    if (!node)return results;
    walk(node.firstChild, function (n) {
        if (!n) {
            return;
        }
        var actual = n.nodeType === 1 && n.nodeName.toLowerCase();
        if (typeof actual === 'string' && (actual === val || typeof val !== 'string') && filter(n)) {
            results.push(n);
            fn && fn(n, results.length - 1);
        }
    });
    return results;
    function walk(n, func) {
        func(n);
        while (n && (n = n.nextSibling)) {
            func(n, func);
        }
    }
};
var $chooseV2 = function (option) {
    var opt = {sid: "", item: "", pi: 1, sorttype: 5, ctype: 0, ch: 0, page: 1, pageSize: 64, property: 7, timeout: 3000, templateId: "", contentId: "", isWaterfall: true, onEach: null, onSuccess: null, onFailure: null, serverTime: null, beginTime: "", endTime: "", staticFileUrl: "", dataList: [], totalNum: 0, totalPage: 0, stepHeight: [], step: 1, byCgi: g_batchBiXuanPin_byCgi && p_batchBiXuanPin_byCgi};
    $option(opt, option);
    var inptr = null;
    var thisFunc = arguments.callee;
    var hasReqStaticFile = false;
    var cbName = getCallBackName();
    var stepLen = opt.stepHeight.length;
    var page = opt.page;
    init();
    function init() {
        var now = opt.serverTime ? opt.serverTime : $getServerTime();
        if (!opt.byCgi || ((opt.endTime && now > new Date(opt.endTime)) || (opt.beginTime && now < new Date(opt.beginTime)))) {
            loadStaticData();
        } else {
            loadCgiData();
            startTimer();
        }
    }

    function loadCgiData() {
        var url = "http://focus.paipai.com/martpolicy2/choose?searchtype=1&" + $buildParam({callback: cbName, searchid: opt.sid, sorttype: opt.sorttype, ctype: opt.ctype, itemid: opt.item, ch: opt.ch, pc: opt.pageSize, pi: opt.page, t: Math.round(new Date() / (1000 * 60))});
        window[cbName] = function (json) {
            if (json.errCode == "0") {
                clearTimeout(inptr);
                opt.totalNum = json.total;
                opt.dataList = json.itemlist;
                opt.totalPage = Math.ceil(opt.totalNum / opt.pageSize);
                processData();
            } else {
                loadStaticData();
            }
        };
        $loadScript(url);
    }

    function getCallBackName() {
        !thisFunc.cgiCount && (thisFunc.cgiCount = 0);
        thisFunc.cgiCount++;
        return"chooseBIcallBack" + thisFunc.cgiCount;
    }

    function loadStaticData() {
        if (!opt.staticFileUrl || hasReqStaticFile) {
            opt.onFailure && opt.onFailure();
            return;
        }
        var callbackName = opt.staticFileUrl.match(/\w*(?=\.js)/)[0];
        window[callbackName] = function (json) {
            if (json.errCode != "0") {
                opt.onFailure && opt.onFailure();
                return;
            }
            opt.totalNum = json.total;
            opt.dataList = json.itemlist;
            opt.totalPage = Math.ceil(opt.totalNum / opt.pageSize);
            processData();
        };
        $loadScript(opt.staticFileUrl + "?t=" + Math.round(new Date() / (1000 * 60)));
        hasReqStaticFile = true;
    }

    function startTimer() {
        inptr = setTimeout(function () {
            if (opt.dataList.length == 0) {
                loadStaticData();
            }
        }, opt.timeout);
    }

    function processData() {
        if (hasReqStaticFile) {
            var list = opt.dataList.slice((opt.page - 1) * opt.pageSize, opt.pageSize);
            opt.dataList = list;
        }
        if (opt.onEach) {
            var list = opt.dataList;
            for (var i = 0, len = list.length; i < len; ++i) {
                opt.onEach(i, list[i]);
            }
        }
        renderHtml();
        if (stepLen) {
            opt.onSuccess && (opt.step == stepLen || page == opt.totalPage) && opt.onSuccess(opt.totalNum, opt.dataList);
            opt.step++;
        } else {
            opt.onSuccess && opt.onSuccess(opt.totalNum, opt.dataList);
        }
        $autoLoadImages();
    }

    function renderHtml() {
        if (opt.contentId && opt.templateId) {
            var list = opt.dataList;
            if (opt.isWaterfall) {
                var col = opt.contentId.length, htmls = [], tempInd = stepLen ? (opt.step - 1) * opt.pageSize : 0;
                for (var i = 0, len = list.length; i < len; ++i) {
                    var tData = list[i], ind = tempInd + i, curCol = ind % col;
                    !htmls[curCol] && (htmls[curCol] = []);
                    tData.tIndex = Math.abs((ind % 2) + ((parseInt(ind / col, 10) % 2) == 0 ? 1 : -2));
                    htmls[curCol].push($formatJson(opt.templateId, tData));
                }
                for (var j = 0; j < col; ++j) {
                    !htmls[j] && (htmls[j] = []);
                    if (stepLen && opt.step > 1) {
                        $id(opt.contentId[j]).appendChild(parseDom("ul", htmls[j].join("")));
                    } else {
                        $setHtml($id(opt.contentId[j]), htmls[j].join(""));
                    }
                }
                if (stepLen && (opt.step < stepLen)) {
                    $scroll({height: opt.stepHeight[opt.step], clean: opt.step == 1, func: function () {
                        (page < opt.totalPage) && loadCgiData();
                    }});
                }
            } else {
                $setHtml($id(opt.contentId), $formatArray(opt.templateId, list));
            }
        }
    }

    function parseDom(domTag, str) {
        var dom = document.createElement(domTag), docf = document.createDocumentFragment();
        $setHtml(dom, str);
        var cnodes = children(dom), cnLen = cnodes.length;
        for (var i = 0; i < cnLen; ++i) {
            var nod = cnodes[i];
            if (nod && nod.nodeType === 1) {
                docf.appendChild(nod);
            }
        }
        return docf;
    }

    function children(elem) {
        var r = [];
        var n = elem.firstChild;
        for (; n; n = n.nextSibling) {
            if (n.nodeType === 1) {
                r.push(n);
            }
        }
        return r;
    }
};
function $decodeHtml(content) {
    if (content == null) {
        return"";
    }
    return $strReplace(content, {"&amp;": '&', "&quot;": '\"', "\\'": '\'', "&lt;": '<', "&gt;": '>', "&nbsp;": ' ', "&#39;": '\'', "&#09;": '\t', "&#40;": '(', "&#41;": ')', "&#42;": '*', "&#43;": '+', "&#44;": ',', "&#45;": '-', "&#46;": '.', "&#47;": '/', "&#63;": '?', "&#92;": '\\', "<BR>": '\n'});
};
function $delClass(ids, cName) {
    $setClass(ids, cName, "remove");
};
function $delEvent(obj, type, handle) {
    if (!obj || !type || !handle) {
        return;
    }
    if (obj instanceof Array) {
        for (var i = 0, l = obj.length; i < l; i++) {
            $delEvent(obj[i], type, handle);
        }
        return;
    }
    if (type instanceof Array) {
        for (var i = 0, l = type.length; i < l; i++) {
            $delEvent(obj, type[i], handle);
        }
        return;
    }
    function find(obj, type, handler) {
        var hids = obj.__hids;
        if (!hids || !window.__allHandlers) {
            return null;
        }
        for (var i = hids.length - 1; i >= 0; i--) {
            var hid = hids[i];
            var h = window.__allHandlers[hid];
            if (h && h.type == type && h.handler == handler) {
                var wrapper = h.wrapper;
                window.__allHandlers[hid] = null;
                delete window.__allHandlers[hid];
                hids.splice(i, 1);
                obj.__hids = hids;
                return wrapper;
            }
        }
        return null;
    }

    if (window.removeEventListener) {
        obj.removeEventListener(type, find(obj, type, handle) || handle, false);
    }
    else if (window.detachEvent) {
        obj.detachEvent("on" + type, find(obj, type, handle) || handle);
    }
};
function $each(jn, fn) {
    var len = jn.length;
    if ("number" === typeof len) {
        for (var i = 0; i < len; i++) {
            try {
                fn(jn[i], i);
            } catch (e) {
                if ($break(e)) {
                    break;
                } else {
                    throw e;
                }
                ;
            }
        }
    } else {
        for (var k in jn) {
            try {
                fn(jn[k], k);
            } catch (e) {
                if ($break(e)) {
                    break;
                } else {
                    throw e;
                }
                ;
            }
        }
    }
};
function $empty() {
    return function () {
        return true;
    }
};
function $focusAd(opt) {
    var option = {dataList: [], idList: [], time: "", beginTime: "", endTime: "", staticFileUrl: "", templateIdList: [], contentList: [], onInit: $empty(), onEach: $empty(), autoRender: true, onRender: $empty(), onSuccess: $empty(), timeout: 3000, byCgi: g_focusAd_byCgi && p_focusAd_byCgi, cgiRule: $empty()};
    $option(option, opt);
    var inptr = null;
    var hasReqStaticFile = false;
    var cgiCallback = getCgiCallback();
    var completeDataCount = 0;
    var handledTagObj = {};
    var retCode = null;
    if (option.dataList.length > 0) {
        processData();
    } else {
        if (option.byCgi && option.cgiRule()) {
            loadCgiData();
            startTimer();
        } else {
            loadStaticData();
        }
    }
    function loadCgiData() {
        var url = "http://express.paipai.com/tws/focus/focus_search?" + $buildParam({id: option.idList.join("|"), curl: encodeURIComponent(location.href), callback: cgiCallback, time: option.time, begin: option.beginTime, end: option.endTime, t: Math.round(new Date() / (1000 * 60))});
        retCode = $returnCode({id: 180331, url: url, frequence: 2});
        $loadScript(url);
        window[cgiCallback] = function (json) {
            retCode.report(json.errCode == 0 ? true : false, json.errCode);
            if (json.errCode == "0") {
                clearTimeout(inptr);
                option.dataList = json.list;
                processData();
            } else {
                loadStaticData();
            }
        };
    }

    function getCgiCallback() {
        if (!$focusAd.counter) {
            $focusAd.counter = 0;
        }
        $focusAd.counter++;
        return"focusAd" + $focusAd.counter;
    }

    function startTimer() {
        inptr = setTimeout(function () {
            if (option.dataList.length == 0) {
                loadStaticData();
            }
        }, option.timeout);
    }

    function loadStaticData() {
        if (!option.staticFileUrl || hasReqStaticFile) {
            return;
        }
        $loadScript(option.staticFileUrl + "?t=" + Math.round(new Date() / (1000 * 60)));
        var cbName = option.staticFileUrl.match(/\w*(?=\.js)/)[0];
        window[cbName] = function (json) {
            if (json.errCode != "0") {
                return;
            }
            option.dataList = json.list;
            processData();
        };
        window[cgiCallback] = function (json) {
            retCode && (retCode.report(json.errCode == 0 ? true : false, json.errCode));
        };
        hasReqStaticFile = true;
    }

    function processData() {
        option.onInit();
        renderHtml();
        checkDataIsComplete();
    }

    function renderHtml() {
        for (var i = 0, j = option.dataList.length; i < j; i++) {
            var adId = option.dataList[i].groupid;
            if (handledTagObj[adId]) {
                continue;
            }
            var list = option.dataList[i].ad;
            if (list.length == 0) {
                continue;
            }
            option.onEach(adId, list);
            if (option.autoRender) {
                $setHtml(option.contentList[i], $formatArray(option.templateIdList[i], list));
            } else {
                option.onRender(adId, list);
            }
            handledTagObj[adId] = true;
            completeDataCount++;
        }
    };
    function checkDataIsComplete() {
        if (completeDataCount < option.idList.length) {
            loadStaticData();
        } else {
            option.onSuccess();
        }
    }
};
function $focusCpc(opt) {
    var option = {id: "", content: "", template: "", onRender: $empty(), onEach: $empty(), onSuccess: $empty()}, thisFunc = arguments.callee, dataList = null;
    $option(option, opt);
    !thisFunc.counter && (thisFunc.counter = 0);
    thisFunc.counter++;
    var callback = "focusCpc" + thisFunc.counter;
    $loadScript("http://focus.paipai.com/focuscpc/focuscpcshow?id=" + option.id + "&callback=" + callback);
    window[callback] = function (json) {
        if (json.errCode != "0") {
            return;
        }
        dataList = json.locations;
        renderHtml();
        option.onSuccess();
    }
    function renderHtml() {
        for (var i = 0, j = dataList.length; i < j; i++) {
            var plans = dataList[i].plans;
            option.onEach(plans, dataList[i].locationid, i);
            if (option.template && option.content) {
                var tpl = getTemplate(i);
                var content = $id(getDomContainer(i));
                var html = $formatArray(tpl, plans);
                $appendHtml(content, html);
            } else {
                option.onRender(plans, dataList[i].locationid, i);
            }
        }
    }

    function getTemplate(index) {
        return $isArray(option.template) ? option.template[index] : option.template;
    }

    function getDomContainer(index) {
        return $isArray(option.content) ? option.content[index] : option.content;
    }
};
(function () {
    var _formatArray_cache = {};
    $formatArray = function (str, data) {
        var fn = !/\W/.test(str) ? _formatArray_cache[str] = _formatArray_cache[str] || $formatArray($id(str).innerHTML) : new Function("arr", "var p=[];p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');return p.join('');");
        return data ? fn(data) : fn;
    }
})();
(function () {
    var _formatJson_cache = {};
    $formatJson = function (str, data) {
        var fn = !/\W/.test(str) ? _formatJson_cache[str] = _formatJson_cache[str] || $formatJson($id(str).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return data ? fn(data) : fn;
    }
})();
function $getCookie(name) {
    var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"), val = document.cookie.match(reg);
    return val ? (val[2] ? unescape(val[2]) : "") : null;
};
function $getFirst(elem) {
    elem = elem.firstChild;
    return elem && elem.nodeType != 1 ? $getNext(elem) : elem;
};
function $getHeight(e) {
    var show = e.style.display;
    show == "none" && (e.style.display = "");
    var box = e.getBoundingClientRect();
    var h = box.height ? box.height : (box.bottom - box.top);
    e.style.display = show;
    return h;
};
function $getLast(elem) {
    elem = elem.lastChild;
    return elem && elem.nodeType != 1 ? $getPrev(elem) : elem;
};
function $getNext(elem) {
    do {
        elem = elem.nextSibling;
    } while (elem && elem.nodeType != 1);
    return elem;
};
function $getParent(el, targetTag, maxSearchDeep) {
    while (el && el.tagName.toLowerCase() != targetTag && maxSearchDeep > 0) {
        el = el.parentNode;
        maxSearchDeep--;
    }
    if (el && el.tagName.toLowerCase() != targetTag) {
        return null;
    }
    return el;
};
function $getPrev(elem) {
    do {
        elem = elem.previousSibling;
    } while (elem && elem.nodeType != 1);
    return elem;
};
function $getQuery(name, url) {
    var u = arguments[1] || window.location.search, reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"), r = u.substr(u.indexOf("\?") + 1).match(reg);
    return r != null ? r[2] : "";
};
function $getServerTime(url) {
    var sysTime = document.getElementById('SYSTIME');
    if (sysTime) {
        var ts = sysTime.value.substring(0, 19).split('-'), dObj = new Date(ts[0], parseInt(ts[1], 10) - 1, ts[2], ts[3], ts[4], ts[5]);
        return dObj;
    }
    var xhr = $xhrMaker(), url = url || ("http://" + window.location.hostname + "/favicon.ico?t=" + Math.random());
    try {
        xhr.open("HEAD", url, false);
        xhr.send();
    } catch (e) {
        return new Date();
    }
    return new Date(xhr.getResponseHeader("Date"));
};
function $getTarget(e, parent, tag) {
    var e = window.event || e, tar = e.srcElement || e.target;
    if (parent && tag && tar.nodeName.toLowerCase() != tag) {
        while (tar = tar.parentNode) {
            if (tar == parent || tar == document.body || tar == document) {
                return null;
            } else if (tar.nodeName.toLowerCase() == tag) {
                break;
            }
        }
    }
    ;
    return tar;
};
function $getTimeDistance(ts) {
    var timeLeft = [0, 0, 0, 0];
    timeLeft[0] = (ts > 86400) ? parseInt(ts / 86400) : 0;
    ts = ts - timeLeft[0] * 86400;
    timeLeft[1] = (ts > 3600) ? parseInt(ts / 3600) : 0;
    ts = ts - timeLeft[1] * 3600;
    timeLeft[2] = (ts > 60) ? parseInt(ts / 60) : 0;
    timeLeft[3] = ts - timeLeft[2] * 60;
    return timeLeft;
};
function $getToken() {
    var skey = $getCookie("skey"), token = skey == null ? "" : $time33(skey);
    return token;
};
function $getUin() {
    var uin = $getCookie("uin") || $getCookie('uin_cookie') || $getCookie('pt2gguin') || $getCookie('o_cookie') || $getCookie('luin') || $getCookie('buy_uin');
    return uin ? parseInt(uin.replace("o", ""), 10) : "";
};
function $getY(e) {
    var t = e.offsetTop || 0;
    while (e = e.offsetParent) {
        t += e.offsetTop;
    }
    return t;
};
function $getYP(e) {
    var t = $getY(e), e = e.parentNode;
    while (0 === t && document.body != e) {
        t = $getY(e);
        e = e.parentNode;
    }
    return t;
};
function $hasClass(old, cur) {
    if (!old || !cur)return null;
    var arr = (typeof old == 'object' ? old.className : old).split(' ');
    for (var i = 0, len = arr.length; i < len; i++) {
        if (cur == arr[i]) {
            return cur;
        }
    }
    ;
    return null;
};
function $hoverNav(opt) {
    var option = {nav: "", navItemTag: "li", startIndex: 0, drop: "", offset: 0, isFixed: true, className: "current", onItemMouseover: $empty(), onItemMouseout: $empty(), onMouseout: $empty(), timeout: 100};
    var outInptr = null;
    var overInptr = null;
    $option(option, opt);
    option.nav = $id(option.nav);
    option.drop = $id(option.drop);
    var subNavList = $child(option.nav, option.navItemTag);
    $addEvent(option.nav, "mouseover", function (ev) {
        clearTimeout(outInptr);
        clearTimeout(overInptr);
        var navItem = $getTarget(ev);
        navItem = $getParent(navItem, option.navItemTag, 5);
        if (!navItem) {
            return;
        }
        overInptr = setTimeout(function () {
            showNavItem(navItem);
        }, 100);
    });
    $mouseout(option.nav, function () {
        clearTimeout(overInptr);
        outInptr = setTimeout(mouseout, option.timeout)
    });
    $mouseover(option.drop, function () {
        clearTimeout(outInptr);
    });
    $mouseout(option.drop, function () {
        clearTimeout(overInptr);
        outInptr = setTimeout(mouseout, option.timeout)
    });
    function mouseout() {
        option.drop.style.display = "none";
        option.drop.style.top = option.offset + "px";
        for (var i = 0, j = subNavList.length; i < j; i++) {
            $delClass(subNavList[i], option.className);
        }
        option.onMouseout();
    }

    function showNavItem(navItem) {
        var index = $inArray(navItem, subNavList);
        if (index == -1) {
            return;
        }
        option.onItemMouseover(index, navItem);
        index >= option.startIndex ? $addClass(navItem, option.className) : "";
        for (var i = option.startIndex, j = subNavList.length; i < j; i++) {
            if (index != i) {
                $delClass(subNavList[i], option.className);
                option.onItemMouseout(i, subNavList[i])
            }
            ;
        }
        if ($strTrim(option.drop.innerHTML)) {
            option.drop.style.display = "block";
        } else {
            option.drop.style.display = "none";
        }
        setFloatPos(index);
    }

    function setFloatPos(navIndex) {
        var navItem = subNavList[navIndex];
        var itemTop = $getYP(navItem);
        var itemHeight = $getHeight(navItem);
        var floatHeight = $getHeight(option.drop);
        var body = document.compatMode == 'BackCompat' ? document.body : document.documentElement;
        var scrollTop = body.scrollTop == 0 ? document.body.scrollTop : body.scrollTop;
        var navTop = $getY(option.nav);
        if (scrollTop > navTop) {
            if (option.isFixed) {
                if (floatHeight > itemTop + itemHeight) {
                    option.drop.style.top = "0px";
                } else {
                    option.drop.style.top = itemTop + itemHeight - floatHeight + ($isBrowser("ie8") ? 25 : 0) + "px";
                }
            } else {
                if (floatHeight > itemTop + itemHeight - scrollTop) {
                    option.drop.style.top = (scrollTop - navTop + option.offset) + "px";
                } else {
                    option.drop.style.top = (itemTop + itemHeight - navTop - floatHeight + option.offset) + "px";
                }
            }
        } else {
            if (floatHeight > itemTop + itemHeight - navTop) {
                option.drop.style.top = option.offset + "px";
            } else {
                option.drop.style.top = (itemHeight + itemTop - navTop - floatHeight + option.offset) + "px";
            }
        }
    }
};
function $id(id) {
    return typeof(id) == "string" ? document.getElementById(id) : id;
};
function $inArray(t, arr) {
    if (arr.indexOf) {
        return arr.indexOf(t);
    }
    for (var i = arr.length; i--;) {
        if (arr[i] === t) {
            return i * 1;
        }
    }
    ;
    return-1;
};
function $isArray(source) {
    return'[object Array]' == Object.prototype.toString.call(source);
};
function $isBrowser(str) {
    str = str.toLowerCase();
    var b = navigator.userAgent.toLowerCase();
    var arrB = [];
    arrB['firefox'] = b.indexOf("firefox") != -1;
    arrB['opera'] = b.indexOf("opera") != -1;
    arrB['safari'] = b.indexOf("safari") != -1;
    arrB['chrome'] = b.indexOf("chrome") != -1;
    arrB['gecko'] = !arrB['opera'] && !arrB['safari'] && b.indexOf("gecko") > -1;
    arrB['ie'] = !arrB['opera'] && b.indexOf("msie") != -1;
    arrB['ie6'] = !arrB['opera'] && b.indexOf("msie 6") != -1;
    arrB['ie7'] = !arrB['opera'] && b.indexOf("msie 7") != -1;
    arrB['ie8'] = !arrB['opera'] && b.indexOf("msie 8") != -1;
    arrB['ie9'] = !arrB['opera'] && b.indexOf("msie 9") != -1;
    arrB['ie10'] = !arrB['opera'] && b.indexOf("msie 10") != -1;
    return arrB[str];
};
function $isWidthScreen() {
    var body = document.body;
    if (body.getAttribute("noAutoAdjust")) {
        return!!body.getAttribute("wideScreen");
    } else {
        return screen.availWidth >= 1280;
    }
};
function $itilReport(option) {
    var opt = {bid: "1", mid: "01", res: [], onBeforeReport: null, delay: 5000}
    for (var k in option) {
        opt[k] = option[k];
    }
    if (opt.res.length > 0) {
        window.reportWebInfo = function (json) {
        };
        window.setTimeout(function () {
            opt.onBeforeReport && opt.onBeforeReport(opt);
            var pstr = opt.bid + opt.mid + "-" + opt.res.join("|");
            var url = "http://focus.paipai.com/webreport/ReportWebInfo?report=" + pstr + "&t=" + new Date() / 1000;
            $loadUrl({url: url});
        }, opt.delay);
    }
};
function $jsonToTpl(json, tpl) {
    return tpl.replace(/{#(\w+)#}/g, function (a, b) {
        return json[b] || ""
    });
};
function $loadImg(obj, attr) {
    if (!obj)return;
    var attr = attr || "back_src", images = obj.getElementsByTagName("IMG");
    for (var i = 0, len = images.length; i < len; i++) {
        var oImg = images[i], src = oImg.getAttribute(attr);
        '' == oImg.src && src && (oImg.src = src);
    }
};
function $loadKeywords(url, callback) {
    var id = url.replace(/^.*\//, '').replace('.js', '');
    if (id.length == 0) {
        return;
    }
    window[id] = function (obj) {
        if (obj.errCode != 0) {
            return;
        }
        callback(obj.keywordAreas);
    }
    $loadScript(url);
};
function $loadPpmsData(url, callback) {
    var mc = url.match(/\d+(?=.js)/);
    if (mc.length == 0) {
        return;
    }
    var cbName = "showPageData" + mc[0];
    $loadScript(url);
    window[cbName] = function (json) {
        callback(json.data);
    }
};
function $loadScript(obj) {
    if (!$loadScript.counter) {
        $loadScript.counter = 1;
    }
    var isObj = typeof(obj) == "object", url = isObj ? obj.url : arguments[0], id = isObj ? obj.id : arguments[1], obj = isObj ? obj : arguments[2], _head = document.head || document.getElementsByTagName("head")[0] || document.documentElement, _script = document.createElement("script"), D = new Date(), _time = D.getTime(), _isCleared = false, _timer = null, o = obj || {}, data = o.data || '', charset = o.charset || "gb2312", isToken = o.isToken, timeout = o.timeout, isAutoReport = o.isAutoReport || false, reportOptions = o.reportOptions || {}, reportType = o.reportType || 'current', reportRetCodeName = o.reportRetCodeName, reportSuccessCode = typeof(o.reportSuccessCode) == "undefined" ? 200 : o.reportSuccessCode, reportErrorCode = typeof(o.reportErrorCode) == "undefined" ? 500 : o.reportErrorCode, reportTimeoutCode = typeof(o.reportTimeoutCode) == "undefined" ? 600 : o.reportTimeoutCode, onload = o.onload, onsucc = o.onsucc, callbackName = o.callbackName || '', callback = o.callback, errorback = o.errorback, _jsonpLoadState = 'uninitialized';
    var complete = function (errCode) {
        if (!_script || _isCleared) {
            return;
        }
        _isCleared = true;
        if (_timer) {
            clearTimeout(_timer);
            _timer = null;
        }
        _script.onload = _script.onreadystatechange = _script.onerror = null;
        if (_head && _script.parentNode) {
            _head.removeChild(_script);
        }
        _script = null;
        if (callbackName) {
            if (callbackName.indexOf('.') == -1) {
                window[callbackName] = null;
                try {
                    delete window[callbackName];
                }
                catch (e) {
                }
            }
            else {
                var arrJ = callbackName.split("."), p = {};
                for (var j = 0, jLen = arrJ.length; j < jLen; j++) {
                    var n = arrJ[j];
                    if (j == 0) {
                        p = window[n];
                    }
                    else {
                        if (j == jLen - 1) {
                            try {
                                delete p[n];
                            }
                            catch (e) {
                            }
                        }
                        else {
                            p = p[n];
                        }
                    }
                }
            }
        }
        if (_jsonpLoadState != "loaded" && typeof errorback == "function") {
            errorback(errCode);
        }
        if (isAutoReport && reportType != 'cross') {
            _retCoder.report(_jsonpLoadState == "loaded", errCode);
        }
    };
    var jsontostr = function (d) {
        var a = [];
        for (var k in d) {
            a.push(k + '=' + d[k]);
        }
        return a.join('&');
    };
    if (isAutoReport && reportOptions) {
        if (reportType == 'cross') {
            $returnCode(reportOptions).reg();
        }
        else {
            reportOptions.url = reportOptions.url || url.substr(0, url.indexOf('?') == -1 ? url.length : url.indexOf('?'));
            var _retCoder = $returnCode(reportOptions);
        }
    }
    if (data) {
        url += (url.indexOf("?") != -1 ? "&" : "?") + (typeof data == 'string' ? data : jsontostr(data));
    }
    if (callbackName && typeof callback == "function") {
        var oldName = callbackName;
        if (callbackName.indexOf('.') == -1) {
            callbackName = window[callbackName] ? callbackName + $loadScript.counter++ : callbackName;
            window[callbackName] = function (jsonData) {
                _jsonpLoadState = 'loaded';
                if (isAutoReport && reportRetCodeName) {
                    reportSuccessCode = jsonData[reportRetCodeName];
                }
                callback.apply(null, arguments);
                onsucc && (onsucc());
            };
        }
        else {
            var arrJ = callbackName.split("."), p = {}, arrF = [];
            for (var j = 0, jLen = arrJ.length; j < jLen; j++) {
                var n = arrJ[j];
                if (j == 0) {
                    p = window[n];
                }
                else {
                    if (j == jLen - 1) {
                        p[n] ? (n = n + $loadScript.counter++) : '';
                        p[n] = function (jsonData) {
                            _jsonpLoadState = 'loaded';
                            if (isAutoReport && reportRetCodeName) {
                                reportSuccessCode = jsonData[reportRetCodeName];
                            }
                            callback.apply(null, arguments);
                            onsucc && (onsucc());
                        };
                    }
                    else {
                        p = p[n];
                    }
                }
                arrF.push(n);
            }
            callbackName = arrF.join('.');
        }
        url = url.replace('=' + oldName, '=' + callbackName);
    }
    _jsonpLoadState = 'loading';
    id = id ? (id + _time) : _time;
    url = (isToken !== false ? $addToken(url, "ls") : url);
    _script.charset = charset;
    _script.id = id;
    _script.onload = _script.onreadystatechange = function () {
        var uA = navigator.userAgent.toLowerCase();
        if (!(!(uA.indexOf("opera") != -1) && uA.indexOf("msie") != -1) || /loaded|complete/i.test(this.readyState)) {
            if (typeof onload == "function") {
                onload();
            }
            complete(_jsonpLoadState == "loaded" ? reportSuccessCode : reportErrorCode);
        }
    };
    _script.onerror = function () {
        complete(reportErrorCode);
    };
    if (timeout) {
        _timer = setTimeout(function () {
            complete(reportTimeoutCode);
        }, parseInt(timeout, 10));
    }
    setTimeout(function () {
        _script.src = url;
        try {
            _head.insertBefore(_script, _head.lastChild);
        } catch (e) {
        }
    }, 0);
};
function $loadUrl(o) {
    o.element = o.element || 'script';
    var el = document.createElement(o.element);
    el.charset = o.charset || 'utf-8';
    o.onBeforeSend && o.onBeforeSend(el);
    el.onload = el.onreadystatechange = function () {
        if (/loaded|complete/i.test(this.readyState) || navigator.userAgent.toLowerCase().indexOf("msie") == -1) {
            o.onLoad && o.onLoad();
            clear();
        }
    };
    el.onerror = function () {
        clear();
    };
    el.src = o.url;
    document.getElementsByTagName('head')[0].appendChild(el);
    function clear() {
        if (!el) {
            return;
        }
        el.onload = el.onreadystatechange = el.onerror = null;
        el.parentNode && (el.parentNode.removeChild(el));
        el = null;
    }
};
function $martCpc(opt) {
    var option = {dataList: null, idList: [], pc: 0, pcs: "", care: 0, mask: 0, areaOn: "", templateType: "json", templateIdList: null, contentList: [], onInit: $empty(), onEach: $empty(), onRender: null, onSuccess: $empty()};
    var thisFunc = arguments.callee;
    $option(option, opt);
    init();
    loadCgiData();
    function init() {
        if (option.contentList.length > 0) {
            for (var i = 0, j = option.contentList.length; i < j; i++) {
                var list = option.contentList[i];
                for (var m = 0, n = list.length; m < n; m++) {
                    list[m] = $id(list[m]);
                }
            }
        }
    }

    function loadCgiData() {
        if (!thisFunc.counter) {
            thisFunc.counter = 0;
        }
        thisFunc.counter++;
        var callbackName = "martCallback" + thisFunc.counter;
        var url = "http://express.paipai.com/tws/martcpc/martcpcshow?" + $buildParam({actid: option.idList.join("|"), url: encodeURIComponent(location.href), callback: callbackName, pc: option.pc, pcs: option.pcs, mask: option.mask, care: option.care, ch: 0, areaOn: option.areaOn, duin: $getUin(), t: Math.round(new Date() / (1000 * 60))});
        $loadScript(url);
        window[callbackName] = function (json) {
            if (json.errCode == "0") {
                option.dataList = json.activity;
                processData();
            }
        };
    }

    function processData() {
        option.onInit(option);
        renderHtml();
        option.onSuccess(option);
    }

    function renderHtml() {
        for (var i = 0, j = option.dataList.length; i < j; i++) {
            var activeId = option.dataList[i].activeId;
            var activeIndex = $inArray(activeId * 1, option.idList);
            var areas = option.dataList[i].area;
            areas.sort(function (a, b) {
                return a.areaId - b.areaId;
            });
            for (var m = 0, n = areas.length; m < n; m++) {
                var areaId = areas[m].areaId;
                var tabs = areas[m].tabs;
                option.onEach(tabs, activeId, areaId, activeIndex, m);
                if (option.templateIdList) {
                    var templateId = getTemplate(activeIndex, m);
                    if (!templateId) {
                        continue;
                    }
                    if (option.templateType == 'json') {
                        var html = $formatArray(templateId, tabs);
                    }
                    else {
                        var tmp = [], html = '', tpl = $id(templateId).text;
                        for (var x = 0, y = tabs.length; x < y; x++) {
                            tmp.push($jsonToTpl(tabs[x], tpl));
                        }
                        ;
                        html = tmp.join('');
                    }
                    var dom = option.contentList.length > 0 ? option.contentList[activeIndex][m] : $id("m" + areaId);
                    $setHtml(dom, html);
                } else if (option.onRender) {
                    option.onRender(tabs, activeId, areaId, activeIndex, m);
                }
            }
        }
    }

    function getTemplate(activityIndex, areaIndex) {
        if (typeof option.templateIdList == "string") {
            return option.templateIdList;
        } else if (option.templateIdList instanceof Array) {
            if (typeof option.templateIdList[activityIndex] == "string") {
                return option.templateIdList[activityIndex];
            } else {
                return option.templateIdList[activityIndex][areaIndex]
            }
        }
        return"";
    }
};
function $mouseout(obj, func) {
    obj.onmouseout = function (e) {
        var e = window.event || e, target = e.toElement || e.relatedTarget, parent = target;
        while (parent && parent !== this) {
            parent = parent.parentNode;
        }
        if (parent !== this) {
            func(this);
        }
    }
};
function $mouseover(obj, func) {
    obj.onmouseover = function (e) {
        var e = window.event || e, target = e.fromElement || e.relatedTarget, parent = target;
        while (parent && parent !== this) {
            parent = parent.parentNode;
        }
        if (parent !== this) {
            func(this);
        }
    }
};
(function () {
    if (typeof window.$msg == "object") {
        return;
    }
    var msg = function () {
        this.listener;
        this.topics = {};
    };

    function runBatch(param, call) {
        if (param instanceof Array) {
            for (var i = param.length; i--;) {
                call(param[i]);
            }
            return;
        }
        param && call(param);
    }

    msg.prototype = {addListener: function (topic, callback) {
        var tqs = this.topics;
        callback && runBatch(topic, function (t) {
            tqs[topic] = $addUniq(tqs[t], callback);
        });
    }, removeListener: function (topic, callback) {
        var tqs = this.topics;
        callback && runBatch(topic, function (t) {
            tqs[t] && $arrayRemove(tqs[t], callback);
        });
    }, send: function (topic, msg) {
        var tqs = this.topics;
        var error = [];
        runBatch(topic, function (t) {
            var tq = tqs[t];
            if (tq) {
                $each(tq.slice(), function (callback) {
                    try {
                        callback(t, msg);
                    } catch (e) {
                        error.push(e)
                    }
                    ;
                });
            }
        });
        if (error && error.length > 0) {
            try {
                window.setTimeout(function () {
                    throw error
                }, 0);
            } catch (e) {
            }
        }
    }};
    window.$msg = new msg();
})();
function $namespace(name) {
    for (var arr = name.split(','), r = 0, len = arr.length; r < len; r++) {
        for (var i = 0, k, name = arr[r].split('.'), parent = {}; k = name[i]; i++) {
            i === 0 ? eval('(typeof ' + k + ')==="undefined"?(' + k + '={}):"";parent=' + k) : (parent = parent[k] = parent[k] || {});
        }
    }
};
function $option() {
    var pt = arguments[0];
    for (var i = 1, len = arguments.length; i < len; i++) {
        for (var k in arguments[i]) {
            pt[k] = arguments[i][k]
        }
    }
    return pt;
};
function $preventDefault(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    } else {
        window.event.returnValue = false;
    }
    ;
    return false;
};
function $randomInt(num1, num2) {
    if (num2 == undefined) {
        num2 = num1;
        num1 = 0;
    }
    return Math.floor(Math.random() * (num2 - num1) + num1);
};
function $randomSubArray(arr, len, filter) {
    if (arr.length < len) {
        len = arr.length;
    }
    var obj = {}, list = [];
    filter = filter ? filter : (function () {
        return true;
    });
    do {
        var index = $randomInt(arr.length);
        if (!obj[index] && filter(list, index)) {
            obj[index] = index + 1;
            list.push(arr[index]);
        }
    } while (list.length < len);
    return list;
};
function $ranklist(opt) {
    var option = {rankIdList: [], dataList: [], domList: [], ptagList: [], templateId: "", templateType: "json", length: 0, onInit: $empty(), onEach: $empty(), onSuccess: $empty()};
    $option(option, opt);
    init();
    loadData();
    function init() {
        for (var i = 0, j = option.domList.length; i < j; i++) {
            option.domList[i] = $id(option.domList[i]);
        }
    }

    function showData(json) {
        option.onInit();
        var dataList = option.dataList;
        var template = $id(option.templateId).text;
        for (var i = 0, j = dataList.length; i < j; i++) {
            if (!option.dataList[i].ruleData || !option.dataList[i].itemData) {
                continue;
            }
            var ruleId = option.dataList[i].ruleData.ruleId;
            var index = getGroupIndex(ruleId);
            if (index == -1) {
                continue;
            }
            var randDataList = option.dataList[i].itemData;
            var ptag = option.ptagList[index];
            var html = [];
            var len = randDataList.length;
            if (option.length instanceof Array) {
                len = option.length[index];
            } else if (option.length > 0) {
                len = Math.min(len, option.length);
            }
            ;
            for (var m = 0; m < len; m++) {
                var dataItem = randDataList[m];
                if (!dataItem) {
                    continue;
                }
                if (ptag) {
                    dataItem.ptag = ptag;
                }
                option.onEach(dataItem, index, m, ruleId);
                if (option.templateType == "normal") {
                    html.push($jsonToTpl(dataItem, template));
                } else {
                    html.push($formatJson(option.templateId, dataItem));
                }
            }
            $setHtml(option.domList[index], html.join(""));
        }
        option.onSuccess();
    }

    function getGroupIndex(ruleId) {
        for (var i = 0, j = option.rankIdList.length; i < j; i++) {
            if (option.rankIdList[i] == ruleId) {
                return i;
            }
        }
        ;
        return-1;
    }

    function loadData() {
        if (option.rankIdList.length == 0) {
            return;
        }
        var arrItem = [], count = 0, len = 0;
        arrItem[0] = [];
        for (var i = 0, total = option.rankIdList.length; i < total; i++) {
            if (count == 50) {
                count = 0;
                arrItem[++len] = [];
            }
            arrItem[len].push(option.rankIdList[i]);
            count++;
        }
        if (!$ranklist.counter) {
            $ranklist.counter = 0;
        }
        $ranklist.counter++;
        for (var i = 0; i <= len; i++) {
            var callback = "ranklistCallback" + ($ranklist.counter * 10 + i);
            var url = 'http://express.paipai.com/tws/rank/RankBatchQuery?rankIds=' + arrItem[i].join('|') + "&callback=" + callback + "&t=" + Math.round(new Date().getTime() / (1000 * 60));
            loadRankData(url, callback);
        }
        ;
        function loadRankData(url, callback) {
            var _retCode = $returnCode({url: url, frequence: 2});
            $loadScript(url);
            window[callback] = function (json) {
                _retCode.report(json.errCode == 0 ? true : fakse, json.errCode);
                if (json.errCode != 0 || json.data.length == 0) {
                    return;
                }
                option.dataList = json.data;
                showData();
            };
        }
    };
};
function $report(url) {
    $loadUrl({'url': url + ((url.indexOf('?') == -1) ? '?' : '&') + Math.random(), 'element': 'img'});
};
function $returnCode(opt) {
    var option = {url: "", action: "", sTime: "", eTime: "", retCode: "", errCode: "", frequence: 1, refer: "", uin: "", domain: "paipai.com", from: 1, report: report, isReport: false, timeout: 3000, timeoutCode: 444, formatUrl: true, reg: reg};
    try {
        option['refer'] = location.href;
    } catch (e) {
    }
    for (var i in opt) {
        option[i] = opt[i];
    }
    if (option.url) {
        option.sTime = new Date();
    }
    if (option.timeout) {
        setTimeout(function () {
            if (!option.isReport) {
                option.report(false, option.timeoutCode);
            }
        }, option.timeout);
    }
    function reg() {
        this.sTime = new Date();
        if (!this.action) {
            return;
        }
        var rcookie = $getCookie("retcode"), cookie2 = [];
        rcookie = rcookie ? rcookie.split("|") : [];
        for (var i = 0; i < rcookie.length; i++) {
            if (rcookie[i].split(",")[0] != this.action) {
                cookie2.push(rcookie[i]);
            }
        }
        cookie2.push(this.action + "," + this.sTime.getTime());
        $setCookie("retcode", cookie2.join("|"), 60, "/", this.domain);
    }

    function report(ret, errid) {
        if (this.isReport == true) {
            return;
        }
        this.isReport = true;
        this.eTime = new Date();
        this.retCode = ret ? 1 : 2;
        this.errCode = isNaN(parseInt(errid)) ? "0" : parseInt(errid);
        if (this.action) {
            this.url = "http://retcode.paipai.com/" + this.action;
            var rcookie = $getCookie("retcode"), ret = "", ncookie = [];
            rcookie = rcookie ? rcookie.split("|") : [];
            for (var i = 0; i < rcookie.length; i++) {
                if (rcookie[i].split(",")[0] == this.action) {
                    ret = rcookie[i].split(",");
                }
                else {
                    ncookie.push(rcookie[i]);
                }
            }
            $setCookie("retcode", ncookie.join("|"), 60, "/", this.domain);
            if (!ret) {
                return;
            }
            this.sTime = new Date(parseInt(ret[1]));
        }
        if (!this.url) {
            return;
        }
        var domain = this.url.replace(/^.*\/\//, '').replace(/\/.*/, ''), timer = this.eTime - this.sTime, cgi = encodeURIComponent(this.formatUrl ? this.url.match(/^[\w|/|.|:|-]*/)[0] : this.url);
        this.reportUrl = "http://c.isdspeed.qq.com/code.cgi?domain=" + domain + "&cgi=" + cgi + "&type=" + this.retCode + "&code=" + this.errCode + "&time=" + timer + "&rate=" + this.frequence + (this.uin ? ("&uin=" + this.uin) : "");
        if (this.reportUrl && Math.random() < (1 / this.frequence) && this.url) {
            $report(this.reportUrl);
        }
    }

    return option;
};
function $scroll(opt) {
    var that = arguments.callee;
    if (that.isBind === undefined) {
        that.isBind = false;
        that.heightList = [];
        that.funcList = [];
        that.optList = [];
        that.visibleH = document.documentElement.clientHeight || document.body.clientHeight;
    }
    if (opt.clean == true) {
        that.heightList = [];
        that.funcList = [];
        that.optList = [];
    }
    var _win = window, _doc = document;
    if (opt.parent) {
        _win = opt.parent.window;
        _doc = opt.parent.document;
        that.visibleH = _doc.documentElement.clientHeight || _doc.body.clientHeight;
    }
    var height = opt.height != undefined ? opt.height : $getY($id(opt.id));
    if (that.visibleH < height) {
        that.heightList.push(height * 1);
        that.funcList.push(opt.func);
        that.optList.push(opt);
    } else {
        opt.func(opt);
    }
    ;
    if (that.isBind) {
        that.isBind = true;
    } else {
        $addEvent(_win, 'scroll', onScroll);
        $addEvent(_win, 'resize', onScroll);
    }
    ;
    function onScroll() {
        $throttle(doScroll, null, 100);
    }

    function doScroll() {
        var len = that.heightList.length;
        if (len === 0) {
            $delEvent(_win, 'scroll', onScroll);
            $delEvent(_win, 'resize', onScroll);
            return null;
        }
        ;
        var dv = _doc.defaultView, y = (dv) ? dv.pageYOffset : 0, h = that.visibleH, arrHeight = [], arrFunc = [], arrOpt = [];
        var doList = [];
        try {
            h += Math.max(_doc.body.scrollTop, _doc.documentElement.scrollTop, y);
        } catch (e) {
        }
        for (var i = 0; i < len; i++) {
            if (h > that.heightList[i]) {
                doList.push(that.optList[i]);
            } else {
                arrHeight.push(that.heightList[i]);
                arrFunc.push(that.funcList[i]);
                arrOpt.push(that.optList[i]);
            }
        }
        ;
        that.heightList = arrHeight;
        that.funcList = arrFunc;
        that.optList = arrOpt;
        if (doList.length > 0) {
            execTask(doList);
        }
    }

    function execTask(taskList) {
        for (var i = 0, j = taskList.length; i < j; i++) {
            taskList[i].func(taskList[i]);
        }
    }
};
function $setClass(ids, cName, kind) {
    if (!ids) {
        return;
    }
    var set = function (obj, cName, kind) {
        if (!obj) {
            return;
        }
        var oldName = obj.className, arrName = oldName ? oldName.split(' ') : [];
        if (kind == "add") {
            if (!$hasClass(oldName, cName)) {
                arrName.push(cName);
                obj.className = arrName.join(' ');
            }
        }
        else if (kind == "remove") {
            var newName = [];
            for (var i = 0, l = arrName.length; i < l; i++) {
                if (cName != arrName[i] && ' ' != arrName[i]) {
                    newName.push(arrName[i]);
                }
            }
            obj.className = newName.join(' ');
        }
    };
    if (typeof(ids) == "string") {
        var arrDom = ids.split(",");
        for (var i = 0, l = arrDom.length; i < l; i++) {
            if (arrDom[i]) {
                set($id(arrDom[i]), cName, kind);
            }
        }
    }
    else if (ids instanceof Array) {
        for (var i = 0, l = ids.length; i < l; i++) {
            if (ids[i]) {
                set(ids[i], cName, kind);
            }
        }
    }
    else {
        set(ids, cName, kind);
    }
};
function $setCookie(name, value, expires, path, domain, secure) {
    var exp = new Date(), expires = arguments[2] || null, path = arguments[3] || "/", domain = arguments[4] || null, secure = arguments[5] || false;
    expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
    document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
};
function $setHtml(o, html) {
    if (o && o.nodeType == 1) {
        o.innerHTML = $xss(html, "none");
    }
};
function $slider(obj) {
    var opt = {titleId: "", titleTag: "", contentId: "", contentTag: "", prevId: "", nextId: "", perView: 1, className: "current", eventType: "mouseover", initIndex: NaN, timeLag: 300, funcInit: $empty(), funcTabInit: $empty(), func: $empty(), onPage: $empty(), nodeWalker: null, auto: false, autoKeep: true, autoTimes: 100, autoLag: 5000, fadeLag: 50, fadeTimes: 500, initSpeed: 100, effect: 'none', width: 0, height: 0, backAttr: "back_src", isLoadInit: true, focusIndex: setEffect, clearAuto: function () {
        clearInterval(autoIntr)
    }, cont: null, tabs: null, funcTabChange: $empty()};
    for (var i in obj) {
        opt[i] = obj[i]
    }
    ;
    ((opt.width == 0 && opt.effect == "scrollx") || (opt.height == 0 && opt.effect == "scrolly")) && (opt.effect = "none");
    var total = 0, autoCount = 0, isInit = true, intr = null, autoIntr = null, _imgs = [];
    if (opt.contentId) {
        var oContent = $id(opt.contentId), _cont = (opt.nodeWalker || $child)(oContent, opt.contentTag, function (dom) {
            switch (opt.effect) {
                case"none":
                    dom.style.display = "none";
                    break;
                case"scrollx":
                    dom.style.width = opt.width + "px";
                    dom.style.styleFloat = dom.style.cssFloat = "left";
                    dom.style.visibility = "hidden";
                    break;
                case"scrolly":
                    dom.style.height = opt.height + "px";
                    dom.style.visibility = "hidden";
                    break;
                case"fade":
                    dom.style.display = "none";
                    dom.style.position = "absolute";
                    dom.style.left = 0;
                    dom.style.top = 0;
                    break;
            }
            ;
            opt.funcInit(total++, dom);
        });
        if (opt.auto) {
            $addEvent(oContent, "mouseover", function () {
                clearInterval(autoIntr);
            });
            opt.autoKeep && $addEvent(oContent, "mouseout", function () {
                setAuto();
            });
        }
        ;
        opt.cont = _cont;
    }
    var len = opt.perView, now = 0;
    if (opt.titleId) {
        var oTitle = $id(opt.titleId), _tabs = (opt.nodeWalker || $child)(oTitle, opt.titleTag, function (dom) {
            opt.funcTabInit(now, dom);
            dom.setAttribute("index", now++);
        });
        $addEvent(oTitle, opt.eventType, function (e) {
            var tar = $getTarget(e, oTitle, opt.titleTag);
            if (tar && $inArray(tar, _tabs) != -1) {
                var cur = tar.getAttribute("index") * 1;
                clearInterval(autoIntr);
                if (cur != current) {
                    intr = setTimeout(function () {
                        opt.funcTabChange(cur, opt);
                        setEffect(cur);
                    }, opt.timeLag);
                }
            }
        });
        $addEvent(oTitle, "mouseout", function (e) {
            var tar = $getTarget(e, oTitle, opt.titleTag);
            if (tar) {
                clearTimeout(intr);
                opt.auto && opt.autoKeep && setAuto();
            }
        });
        opt.tabs = _tabs;
        total = now;
    }
    ;
    var pageTotal = Math.ceil(total / len), current = isNaN(opt.initIndex) ? $randomInt(pageTotal) : opt.initIndex, autoTotal = opt.autoTimes * total - 1;
    setEffect(current);
    opt.auto && setAuto();
    if (opt.prevId) {
        if (opt.prevId.indexOf(",") > -1) {
            var prevs = opt.prevId.split(",");
            for (var i = 0, j = prevs.length; i < j; i++) {
                $addEvent($id(prevs[i]), "click", showPrev);
            }
        } else {
            $addEvent($id(opt.prevId), "click", showPrev);
        }
    }
    if (opt.nextId) {
        if (opt.nextId.indexOf(",") > -1) {
            var nexts = opt.nextId.split(",");
            for (var i = 0, j = nexts.length; i < j; i++) {
                $addEvent($id(nexts[i]), "click", showNext);
            }
        } else {
            $addEvent($id(opt.nextId), "click", showNext);
        }
    }
    isInit = false;
    return opt;
    function setAuto() {
        autoIntr && clearInterval(autoIntr);
        autoIntr = setInterval(function () {
            if (autoCount >= autoTotal) {
                clearInterval(autoIntr);
            } else {
                setEffect((now = current + 1) >= pageTotal ? 0 : now);
                autoCount++;
            }
        }, opt.autoLag);
    }

    function setEffect(cur) {
        if (!opt.contentId) {
            showItem(cur);
            current = cur;
            return;
        }
        ;
        if (isInit) {
            switch (opt.effect) {
                case"scrollx":
                    oContent.style.position = "relative";
                    oContent.style.width = (total + 1) * opt.width + "px";
                    oContent.style.left = -current * opt.width + "px";
                    break;
                case"scrolly":
                    oContent.style.position = "relative";
                    oContent.style.top = -current * opt.height + "px";
                    break;
                case"fade":
                    oContent.style.position = "relative";
                    break;
            }
            ;
            for (var i = 0; i < len; i++) {
                (now = cur + i) < total && showItem(now);
            }
            ;
            opt.onPage(cur);
            current = cur;
        } else {
            var fadeStep = Math.floor(opt.fadeTimes / opt.fadeLag), fadeIntr = null, fadeCount = 0;
            if (opt.globeFadeIntr) {
                switch (opt.effect) {
                    case"fade":
                        _cont[current].style.zIndex = 0;
                        _cont[cur].style.zIndex = 1;
                        _cont[current].style.filter = "alpha(opacity=0)";
                        _cont[current].style.opacity = 0;
                        _cont[cur].style.filter = "alpha(opacity=1)";
                        _cont[cur].style.opacity = 1;
                        current = cur;
                        break;
                }
                clearInterval(opt.globeFadeIntr);
            }
            opt.globeFadeIntr = null;
            switch (opt.effect) {
                case"none":
                    for (var i = 0; i < len; i++) {
                        (now = current * len + i) < total && (_cont[now].style.display = "none");
                        (now = cur * len + i) < total && showItem(now);
                    }
                    ;
                    opt.onPage(cur);
                    current = cur;
                    break;
                case"scrollx":
                    var left = getSpeed(opt.width);
                    showItem(cur);
                    opt.globeFadeIntr = fadeIntr = setInterval(function () {
                        if (fadeCount++ >= fadeStep) {
                            clearInterval(fadeIntr);
                            opt.globeFadeIntr = null;
                            oContent.style.left = -left.end + "px";
                            current = cur;
                        } else {
                            oContent.style.left = -getMove(left) + "px";
                            left.t = left.t < opt.fadeTimes ? (left.t + opt.fadeLag) : opt.fadeTimes;
                        }
                        ;
                    }, opt.fadeLag);
                    break;
                case"scrolly":
                    var top = getSpeed(opt.height);
                    showItem(cur);
                    opt.globeFadeIntr = fadeIntr = setInterval(function () {
                        if (fadeCount++ >= fadeStep) {
                            clearInterval(fadeIntr);
                            opt.globeFadeIntr = null;
                            oContent.style.top = -top.end + "px";
                            current = cur;
                        } else {
                            oContent.style.top = -getMove(top) + "px";
                            top.t = top.t < opt.fadeTimes ? (top.t + opt.fadeLag) : opt.fadeTimes;
                        }
                        ;
                    }, opt.fadeLag);
                    break;
                case"fade":
                    showItem(cur);
                    opt.globeFadeIntr = fadeIntr = setInterval(function () {
                        if (fadeCount++ >= fadeStep) {
                            clearInterval(fadeIntr);
                            opt.globeFadeIntr = null;
                            _cont[current].style.zIndex = 0;
                            _cont[cur].style.zIndex = 1;
                            current = cur;
                        } else {
                            var per = fadeCount / fadeStep;
                            _cont[current].style.filter = "alpha(opacity=" + (1 - per) * 100 + ")";
                            _cont[current].style.opacity = 1 - per;
                            _cont[cur].style.filter = "alpha(opacity=" + (per * 100) + ")";
                            _cont[cur].style.opacity = per;
                        }
                        ;
                    }, opt.fadeLag);
                    break;
            }
            ;
        }
        function getSpeed(s) {
            var flag = (cur - current) < 0 ? -1 : 1, end = cur * s, here = (cur - flag) * s, oFirst = _cont[0];
            current == 0 && (oFirst.style.position = "static");
            if (current + 1 == total && cur == 0) {
                flag = 1;
                end = (current + 1) * s;
                here = current * s;
                oFirst.style.position = "relative";
                opt.effect == "scrollx" ? oFirst.style.left = end + "px" : oFirst.style.top = end + "px";
            }
            ;
            return{t: 0, distance: flag * s, end: end, here: here}
        }

        function getMove(obj) {
            var b = obj.here, c = obj.distance, d = opt.fadeTimes, t = obj.t / d - 1;
            return parseInt(-c * (t * t * t * t - 1) + b, 10);
        }

        function showItem(cur) {
            if (opt.contentId && !_imgs[cur] && (isInit == false || (isInit == true && opt.isLoadInit == true))) {
                $loadImg(_cont[cur], opt.backAttr);
                _imgs[cur] = true;
            }
            ;
            if (opt.contentId) {
                _cont[cur].style.display == "none" && (_cont[cur].style.display = "block");
                _cont[cur].style.visibility == "hidden" && (_cont[cur].style.visibility = "visible");
            }
            ;
            if (opt.titleId) {
                for (var i = 0, len = _tabs.length; i < len; i++) {
                    i != cur && $delClass(_tabs[i], opt.className);
                }
                $addClass(_tabs[cur], opt.className);
                _tabs[cur].style.display == "none" && (_tabs[cur].style.display = "block");
            }
            ;
            opt.func(cur);
        }
    }

    function showPrev(e) {
        $preventDefault(e);
        clearInterval(autoIntr);
        setEffect((now = current - 1) < 0 ? (pageTotal - 1) : now);
    }

    function showNext(e) {
        $preventDefault(e);
        clearInterval(autoIntr);
        setEffect((now = current + 1) >= pageTotal ? 0 : now);
    }
};
function $strReplace(str, re, rt) {
    if (rt != undefined) {
        replace(re, rt);
    } else {
        for (var key in re) {
            replace(key, re[key]);
        }
        ;
    }
    ;
    function replace(a, b) {
        var arr = str.split(a);
        str = arr.join(b);
    };
    return str;
};
function $strTrim(str, code) {
    var argus = code || "\\s";
    var temp = new RegExp("(^" + argus + "*)|(" + argus + "*$)", "g");
    return str.replace(temp, "");
};
function $throttle(method, context, delay) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
        method.call(context);
    }, delay);
};
function $time33(str) {
    for (var i = 0, len = str.length, hash = 5381; i < len; ++i) {
        hash += (hash << 5) + str.charAt(i).charCodeAt();
    }
    ;
    return hash & 0x7fffffff;
};
function $todaySaleV3(opt) {
    var option = {day: "", templateId: "", templateType: "json", content: "", length: 0, onInit: $empty(), onEach: $empty(), onSuccess: $empty(), dataList: []}
    $option(option, opt);
    option.day = option.day ? option.day : ($getServerTime("/").getDay());
    $loadScript("http://static.paipaiimg.com/tjw/sale_json/tejia_day" + option.day + ".js?t=" + Math.round(new Date() / (1000 * 60 * 60 * 24 * 7)));
    window.fillSale = function (json) {
        option.dataList = filterDataByTime(json.data);
        option.onInit();
        if (option.templateId) {
            var template = $id(option.templateId).text;
            var html = [];
            var list = option.dataList;
            option.length = option.length == 0 ? list.length : option.length > list.length ? list.length : option.length;
            for (var i = 0, j = option.length; i < j; i++) {
                option.onEach(list[i], i);
                if (option.templateType == 'json') {
                    html.push($formatJson(option.templateId, list[i]));
                } else {
                    html.push($jsonToTpl(list[i], template));
                }
            }
            option.content = $id(option.content);
            $setHtml(option.content, html.join(""));
        } else {
            for (var i = 0, j = option.length; i < j; i++) {
                option.onEach(list[i], i);
            }
        }
        option.onSuccess();
    };
    function filterDataByTime(list) {
        var hour = new Date().getHours();
        hour = hour < 8 ? 0 : hour;
        return $arrayFilter(list, function (item, index) {
            return(hour == parseInt(item.uploadTime, 10)) && (item.restStock > 0);
        });
    }
};
function $tuan(opt) {
    var option = {content: "", templateId: "", templateType: "json", dataSource: "pp", tuantype: 193, classattr: 0, startIndex: 0, length: 0, dataList: [], date: null, day: 1, onInit: $empty(), onEach: $empty(), onSuccess: $empty(), autoRender: true, onRender: $empty()}
    for (var o in opt) {
        option[o] = opt[o];
    }
    if (!option.date) {
        option.date = new Date($getServerTime("/"));
    }
    option.day = option.date.getDate();
    $loadScript("http://www.paipai.com/tjw/express/tuan/tuan" + option.dataSource + "_static_" + option.day + ".js?t=" + parseInt((new Date()).getTime() / 1000 / 3600 / 24));
    var callback = option.dataSource == "pp" ? "tuanpp_callback_static" : "tuansmart_callback_static";
    window[callback] = function (json) {
        getDataList(json);
        option.onInit();
        if (option.autoRender) {
            option.renderHtml();
        } else {
            option.onRender();
        }
        option.onSuccess();
    }
    function getDataList(json) {
        var list = json.data.TuanItem;
        option.dataList = [];
        if (option.classattr.constructor != Array)option.classattr = [option.classattr];
        for (var i = 0, j = list.length; i < j; i++) {
            for (var k = 0; k < option.classattr.length; k++) {
                if ((option.tuantype & (list[i].tuanType * 1)) == 0) {
                    continue;
                }
                if (option.classattr[k] == 0) {
                    (inArray(option.dataList, list[i].itemId) == -1) && option.dataList.push(list[i]);
                } else if (option.classattr[k] & list[i].classAttr) {
                    (inArray(option.dataList, list[i].itemId) == -1) && option.dataList.push(list[i]);
                }
            }
        }
    }

    function inArray(list, itemId) {
        for (var i = 0, j = list.length; i < j; i++) {
            if (list[i].itemId == itemId) {
                return i;
            }
        }
        ;
        return-1;
    }

    option.renderHtml = function () {
        option.length == 0 && (option.length = option.dataList.length);
        option.length > option.dataList.length && (option.length = option.dataList.length);
        var html = [];
        var template = $id(option.templateId).text;
        for (var i = option.startIndex, j = option.length + option.startIndex; i < j; i++) {
            var dataItem = option.dataList[i];
            if (!dataItem) {
                continue;
            }
            option.onEach(dataItem, i);
            if (option.templateType == "normal") {
                html.push($jsonToTpl(dataItem, template));
            }
            else {
                html.push($formatJson(option.templateId, dataItem));
            }
        }
        option.content.innerHTML = $xss(html.join(""), "none");
    }
    return option;
};
function $xhrMaker() {
    var xhr;
    try {
        xhr = new XMLHttpRequest();
    } catch (e) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                xhr = null;
            }
        }
    }
    ;
    return xhr;
};
function $xss(str, type) {
    if (!str) {
        return str === 0 ? "0" : "";
    }
    switch (type) {
        case"none":
            return str + "";
            break;
        case"html":
            return str.replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g,function (r) {
                return"&#" + r.charCodeAt(0) + ";"
            }).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />");
            break;
        case"htmlEp":
            return str.replace(/[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g, function (r) {
                return"&#" + r.charCodeAt(0) + ";"
            });
            break;
        case"url":
            return escape(str).replace(/\+/g, "%2B");
            break;
        case"miniUrl":
            return str.replace(/%/g, "%25");
            break;
        case"script":
            return str.replace(/[\\"']/g,function (r) {
                return"\\" + r;
            }).replace(/%/g, "\\x25").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\x01/g, "\\x01");
            break;
        case"reg":
            return str.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g, function (a) {
                return"\\" + a;
            });
            break;
        default:
            return escape(str).replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g,function (r) {
                return"&#" + r.charCodeAt(0) + ";"
            }).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />");
            break;
    }
};
$namespace("PP.wg.index");
PP.wg.index = {itilArea: {leftNav: false, slider: false, todaySale: false, brandAct: false, brandTemai: true, xinpin: true}};
PP.wg.index.init = function () {
    this.buildNav();
    this.bindSlider();
    this.buildRightArea();
    this.buildRecmdArea();
    this.buildFloor();
    this.loadBaoyou();
    this.bindItilReport();
};
PP.wg.index.buildNav = function () {
    $loadKeywords("http://static.paipaiimg.com/sinclude/keyword/project/pj42.js", function (keywordAreas) {
        PP.wg.index.itilArea.leftNav = true;
        var categoryList = ["lady", "man", "shoes", "underwear", "beauty", "bag", "fashion", "sports", "furniture", "food", "book", "life", "3c", "chong"];
        $hoverNav({nav: "leftNav", navItemTag: "li", drop: "subNav", className: "on", offset: 0, isFixed: false, onItemMouseover: function (index) {
            if (!keywordAreas[index]) {
                return;
            }
            var list = keywordAreas[index].level1words, leftList = $arrayFilter(list, function (element) {
                return element.extInfo1 == "left";
            }), rightList = $arrayFilter(list, function (element) {
                return element.extInfo1 == "right";
            }), rightBottomList = $arrayFilter(keywordAreas[index].topwords, function (element) {
                return element.extInfo1 == "rightBottom";
            });
            $id("subNavLeft").innerHTML = $formatArray("subNavTpl", leftList);
            $id("subNavRight").innerHTML = $formatArray("subNavTpl", rightList) + $formatArray("subNavProTpl", rightBottomList);
            $id("subNav").className = "wg_dropdown_cont custom_" + categoryList[index];
        }});
    });
};
PP.wg.index.bindSlider = function () {
    var isWide = $isWidthScreen(), showLastAd = false, sliderContent = $id("sliderContent"), sliderTitle = $id("sliderTitle");
    $biFocusAd({idList: isWide ? [388, 389, 390, 391, 392, 393, 769] : [1038, 770], staticFileUrl: "", templateIdList: "sliderTpl", contentList: sliderContent, pcs: isWide ? "1622:1,1623:1,1624:1,1625:1,1626:1,1627:1,2660:1" : "3375:6,2661:1", onEach: function (dataList, groupId, locationId, groupIndex, locationIndex) {
        if ((groupId == 769 || groupId == 770) && dataList[0]) {
            if (dataList[0].materialdesc == 'ppindexslider') {
                showLastAd = true;
            }
        }
    }, serverTime: new Date(), onSuccess: function () {
        PP.wg.index.itilArea.slider = true;
        var sliderArea = $id("sliderArea");
        var sliderPager = $id("sliderPager");
        var initIndex = isWide ? NaN : 0;
        if (showLastAd) {
            sliderTitle.innerHTML += "<li>&bull;</li>";
            initIndex = 6;
        } else if ($child(sliderContent, "li").length > 6) {
            sliderContent.removeChild($getLast(sliderContent));
        }
        $mouseover(sliderArea, function () {
            $delClass(sliderPager, "hidden");
        });
        $mouseout(sliderArea, function () {
            $addClass(sliderPager, "hidden");
        });
        $slider({auto: true, width: isWide ? 825 : 585, effect: "scrollx", className: "on", titleId: "sliderTitle", titleTag: "li", contentId: "sliderContent", contentTag: "li", initIndex: initIndex, prevId: "sliderPrev", nextId: "slierNext"});
    }});
};
PP.wg.index.buildRightArea = function () {
    bindNotice();
    showTodaySale();
    showChong();
    function bindNotice() {
        $loadPpmsData("http://static.paipaiimg.com/js/data/ppms.page14110.js", function (dataList) {
            var noticeList = $id("noticeList");
            noticeList.innerHTML = $formatArray("noticeTpl", dataList);
            if (dataList.length > 3) {
                $delClass($id("noticePager"), "hidden");
                $slider({initIndex: 0, contentId: noticeList, contentTag: "li", perView: 3, prevId: "noticePrev", nextId: "noticeNext"});
            }
        });
    }

    function showTodaySale() {
        $todaySaleV3({templateId: "todaySaleTpl", templateType: "normal", content: $id("todaySale"), onEach: function (dataItem, itemIndex) {
            dataItem.comdyUrl = "http://www.wanggou.com/sale.shtml?item=" + dataItem.comdyId + "&PTAG=20219.17.1";
            dataItem.discount = (dataItem.todayPrice * 10 / dataItem.marketPrice).toFixed(1).replace(".0", "");
        }, onSuccess: function () {
            PP.wg.index.itilArea.todaySale = true;
            $slider({contentId: this.content, contentTag: "div", prevId: "todaySalePrev", nextId: "todaySaleNext", func: function (index) {
                var saleItem = this.cont[index];
                if (saleItem.getAttribute("timer")) {
                    return;
                }
                var beginTime = new Date(saleItem.getAttribute("beginTime").replace(/-/g, "/"));
                var endTime = beginTime.setHours(beginTime.getHours() + 1);
                showTimer($getFirst(saleItem), endTime);
                saleItem.setAttribute("timer", "true");
            }});
        }});
        function showTimer(timerDom, endTime) {
            (function () {
                var now = new Date();
                if (now > endTime) {
                    timerDom.innerHTML = "<span>剩余<em>0</em>分<em>0</em>秒</span>";
                    return;
                }
                var timeInfo = $getTimeDistance(parseInt((endTime - now) / 1000));
                timerDom.innerHTML = "<span>剩余<em>" + timeInfo[2] + "</em>分<em>" + timeInfo[3] + "</em>秒</span>";
                setTimeout(arguments.callee, 1000);
            })();
        }
    }

    function showChong() {
        $id("chongPanel").src = "http://virtual.paipai.com/entra/getpanel?id=77&vb2ctag=1_10_3_533&height=220&width=200&t=1348111261587";
    }
}
PP.wg.index.buildRecmdArea = function () {
    var curTab = null, titleStyles = ["ft_brand_on", "ft_tuan_on", "ft_xin_on", "ft_tiao_on"];
    showTopshop();
    $slider({titleId: "promoteTitle", titleTag: "a", contentId: "promoteContent", contentTag: "div", className: "on", func: function (cur) {
        $id("promoteTitle").className = "floor_tab_hd " + titleStyles[cur];
        if (this.tabs[cur].getAttribute("hasDone")) {
            return;
        }
        curTab = this.tabs[cur];
        switch (cur) {
            case 0:
                showTemai();
                showBrandFocus();
                break;
            case 1:
                showTuanData();
                break;
            case 2:
                showXinpin();
                break;
            case 3:
                showTiao();
                break;
        }
    }});
    function showTuanData() {
        $tuan({content: $id("tuanItems"), templateId: "tuanTpl", templateType: "normal", length: 8, classattr: 0, tuantype: 1, onEach: function (dataItem, dataIndex) {
            dataItem.ptag = "PTAG=20219.74." + (13 + dataIndex);
        }, onSuccess: function () {
            curTab.setAttribute("hasDone", "true");
            curTab = null;
        }});
    }

    function showTemai() {
        var now = new Date(), st = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 00, 00, 01), et = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        $focusAd({idList: [18], autoRender: false, beginTime: Math.round(st.getTime() / 1000), endTime: Math.round(et.getTime() / 1000), onRender: function (adId, dataList) {
            dataList = $arrayFilter(dataList, function (item) {
                return!!item.userData2;
            });
            dataList.sort(function (a, b) {
                return b.beginshowtime - a.beginshowtime;
            });
            $each(dataList, function (item, itemIndex) {
                item.clickurl = $addUrlRd(item.clickurl, "20219.74." + (5 + itemIndex), "biFocusAd").replace("www.paipai.com%2Ftemai%2Flist.shtml", "www.wanggou.com%2Fsale%2Ftemai_list.shtml");
            });
            $setHtml($id("brandTemai"), $formatArray("temaiTpl", dataList.slice(0, 6)));
            curTab.setAttribute("hasDone", "true");
            curTab = null;
        }});
    }

    function showXinpin() {
        var xinData = null;
        $loadPpmsData("http://static.paipaiimg.com/js/data/ppms.page15240.js", function (dataList) {
            xinData = $arrayFilter(dataList, function (dataItem) {
                return dataItem.isShowInIndex == "1";
            });
            $each(xinData, function (dataItem) {
                dataItem.url = "http://www.wanggou.com/xin/?PTAG=20219.75.1#ver=a&gender=" + dataItem.gender;
                dataItem.indexNewLink = $addRd(dataItem.indexNewLink, "20219.75.7");
            });
            $setHtml($id("xinNav"), $formatArray("xinNavTpl", xinData));
            $martCpc({idList: [34443], pc: 3, onSuccess: function () {
                var commDatas = this.dataList[0];
                $each(xinData, function (item, index) {
                    item.dataList = commDatas.area[item.areaId - 1].tabs;
                    for (var i = 0, list = item.dataList, j = list.length; i < j; i++) {
                        list[i].clickUrl = $addUrlRd(list[i].clickUrl, "20219.75." + (2 + i), "martCpc");
                        list[i].uploadPicUrl1 = item.style == "1" ? list[i].uploadPicUrl2 : list[i].uploadPicUrl1;
                    }
                    ;
                });
                $slider({titleId: "xinNav", titleTag: "li", className: "on", func: function (index) {
                    var xinItem = xinData[index];
                    $setHtml($id("xinItems"), $formatArray("xinItemTpl", xinItem.dataList));
                    $setHtml($id("xinComm"), '<a href="' + xinData[0].indexNewLink + '" title="' + xinData[0].indexNewName + '" target="_blank"><img src="' + xinData[0].indexNewImg + '" alt="' + xinData[0].indexNewName + '"></a><i class="icon_arrivals"></i>');
                    $setHtml($id("xinBg"), '<a href="' + xinItem.url + '" target="_blank"><img src="' + xinItem.indexBgImg + '" alt="" width="1225" height="240"></a>');
                }});
            }});
            curTab.setAttribute("hasDone", "true");
            curTab = null;
        });
    }

    function showBrandFocus() {
        var conts = $child($id("brandFocus"), "div");
        $biFocusAd({idList: [990], staticFileUrl: "", templateIdList: "brandFocusTpl", contentList: [conts], pcs: '3244:3,3245:1', serverTime: new Date(), onSuccess: function () {
            $id("brandFocus").innerHTML = conts[0].innerHTML + conts[1].innerHTML;
            conts = null;
        }});
    }

    function showTiao() {
        $biFocusAd({idList: [1308], staticFileUrl: "", templateIdList: "tiaoItemTpl", contentList: "tiaoItems", pcs: '4009:10,4010:0,4011:0', serverTime: new Date(), onSuccess: function () {
            curTab.setAttribute("hasDone", "true");
            curTab = null;
        }});
        $loadPpmsData("http://static.paipaiimg.com/js/data/ppms.page15512.js", function (dataList) {
            var tiaoBg = $id("tiaoBg");
            var rdMap = ["20219.79.1", "20219.79.12", "20219.79.13"];
            $each(dataList, function (item, index) {
                item.link = $addRd(item.link, rdMap[index]);
            })
            tiaoBg.href = dataList[0].link;
            tiaoBg.getElementsByTagName("img")[0].src = dataList[0].img;
            $setHtml($id("tiaoActItems"), $formatArray("tiaoActTpl", dataList.slice(1)));
        });
    }

    function showTopshop() {
        var isWide = $isWidthScreen();
        $focusCpc({id: isWide ? 'TVaw-JUSPpRpRgoGGIlalvXTM17rXboT' : 'TVaw-JUSPpRpRgoGGIlalpt0zyvOxoQs', template: "topshopTpl", content: "topShops", onSuccess: function () {
            PP.wg.index.itilArea.brandAct = true;
            $slider({initIndex: 0, contentId: "topShops", contentTag: "li", prevId: "topShopPrev", nextId: "topShopNext", perView: isWide ? 3 : 2});
        }});
    }
};
PP.wg.index.buildFloor = function () {
    var cateOrderData = null;
    var timestamp = Math.round(new Date() / (1000 * 60 * 60));
    var now = new Date();
    var _this = this;
    var midAdStyle = [
        ["a_r1_c1", "a_r1_c2", "a_r1_c3", "a_r2_c2", "a_r2_c3"],
        ["b_r1_c1", "b_r1_c2", "b_r2_c1", "b_r2_c2", "b_r2_c3"],
        ["a_r1_c1", "a_r1_c2", "a_r1_c3"],
        ["a_r1_c1", "a_r1_c2", "a_r1_c3", "a_r2_c1", "a_r2_c2", "a_r2_c3"]
    ];
    var floorData = [
        {defaultCateIndex: 0, cateList: [
            {tag: "lady", tagId: 1, adId: 374, adStyleIndex: 0, tiaoId: 10684},
            {tag: "man", tagId: 2, adId: 375, adStyleIndex: 1, tiaoId: 10121},
            {tag: "shoes", tagId: 3, adId: 376, adStyleIndex: 0, tiaoId: 10645},
            {tag: "underwear", tagId: 4, adId: 377, adStyleIndex: 1, tiaoId: 10643}
        ]},
        {defaultCateIndex: 0, cateList: [
            {tag: "beauty", tagId: 5, adId: 378, xuanPinId: 237},
            {tag: "bag", tagId: 6, xuanPinId: 195, adId: 379, tiaoId: 10641},
            {tag: "fashion", tagId: 7, adId: 380, xuanPinId: 228, tiaoId: 10642},
            {tag: "sports", tagId: 8, adId: 1022, adStyleIndex: 0}
        ]},
        {defaultCateIndex: 0, cateList: [
            {tag: "furniture", tagId: 9, adId: 382, xuanPinId: 202, tiaoId: 10648},
            {tag: "food", tagId: 10, adId: 383, xuanPinId: 227, rankId: 12050},
            {tag: "life", tagId: 11, adId: 384, xuanPinId: 218, rankId: 49057},
            {tag: "book", tagId: 12, adId: 385, xuanPinId: 203, rankId: 56112},
            {tag: "auto", tagId: 14, adId: 623, adStyleIndex: 0}
        ]},
        {defaultCateIndex: 0, cateList: [
            {tag: "3c", tagId: 13, adId: 386, xuanPinId: 199},
            {tag: "chong", tagId: 20, adId: 476, adStyleIndex: 3, ifm: "http://buy.888.qq.com/static/quick/?bc_tag=10074.8.1"},
            {tag: "go", tagId: 21, adId: 1259, adId2: 1260, ifm: "http://105.img.lvren.com/static/act/qq_wanggou/search_flight_hotel.html"}
        ]}
    ];
    var tagClassMap = {lady: 0, man: 1, shoes: 0, underwear: 1, chong: 3};
    var hasLogoDataLoaded = false;
    var firstLoadDone = false;
    showKeywords();
    loadCateOrderData();
    function showKeywords() {
        var tabdata = {'潮流女装': 'lady', '精致男装': 'man', '品质鞋靴': 'shoes', '舒适内衣': 'underwear', '美容美妆': 'beauty', '皮具箱包': 'bag', '饰品手表': 'fashion', '运动户外': 'sports', '车品爱好': 'auto', '家居频道': 'furniture', '食品频道': 'food', '母婴童装': 'life', '图书音像': 'book', '3c数码': '3c', '3C数码': '3c', '充值': 'chong', '家居家装': 'furniture', '旅游': 'go'};
        var urlarr = ["http://static.paipaiimg.com/sinclude/keyword/project/pj43.js", "http://static.paipaiimg.com/sinclude/keyword/project/pj88.js"];
        $each(urlarr, function (item, index) {
            $loadKeywords(urlarr[index], function (keywordAreas) {
                if (index == 0) {
                    for (var i = 0, n = keywordAreas.length; i < n; i++) {
                        var tabindex = keywordAreas[i].topwords[0].keyword;
                        var leftKeyworDom = $id("leftKeyword_" + tabdata[tabindex]);
                        leftKeyworDom && (leftKeyworDom.innerHTML = $formatJson("leftKeyworTpl", keywordAreas[i]));
                    }
                } else {
                    for (var i = 0, n = keywordAreas.length; i < n; i++) {
                        var tabindex = keywordAreas[i].areaName;
                        if (i < 7) {
                            var rightKeyworDom = $id("rightKeyword_" + tabdata[tabindex]);
                            rightKeyworDom && (rightKeyworDom.innerHTML = $formatArray("rightKeyworTpl", keywordAreas[i].level1words));
                        } else {
                            var rightLogoDom = $id("rightLogo_" + tabdata[tabindex]);
                            rightLogoDom && (rightLogoDom.innerHTML = $formatArray("floorRightLogoTpl", keywordAreas[i].level1words));
                        }
                    }
                }
            });
        });
    }

    function loadCateOrderData() {
        var cateNum = 0;
        for (var fl = 0; fl < 4; fl++) {
            cateNum += floorData[fl].cateList.length;
        }
        $categoryOrder({ps: cateNum, onSuccess: function (orderData, strategyId) {
            floorData.strategyId = strategyId;
            cateOrderData = orderData;
            analyzeDefaultCate();
            initFloorTab();
            reportCategoryOrder();
        }, onTimeout: function () {
            setRandomDefaultCate();
            initFloorTab();
        }});
    }

    function initFloorTab() {
        showMidFocusAd();
        showMiddleComm();
        showRankComm(2, floorData[2].defaultCateIndex);
        for (var fl = 0; fl < 4; fl++) {
            var defaultCateIndex = floorData[fl].defaultCateIndex;
            $slider({titleId: "floorTab" + fl, titleTag: "a", contentId: "floor" + fl, contentTag: "div", initIndex: defaultCateIndex, floor: fl, func: function (cur) {
                var cateItem = floorData[this.floor].cateList[cur], tag = cateItem.tag;
                tag = tag == "food" ? "foods" : tag;
                $id(this.titleId).className = "floor_tab_hd ft_" + tag + "_on";
                firstLoadDone && showMidFocusAdOnDemand(this.floor, cur)
                firstLoadDone && showMiddleCommOnDemand(this.floor, cur);
                if (this.floor == 2) {
                    showRankComm(2, cur)
                }
                ;
                if (this.floor != 3) {
                    showRigthHotRecmd(this.floor, cur);
                }
                if (cateItem.ifm && !cateItem.ifmHasLoaded) {
                    $id("rightFrm_" + tag).src = cateItem.ifm;
                    cateItem.ifmHasLoaded = true;
                }
                if (tag == "go") {
                    showMidCommByFocusData(this.floor, cur);
                }
            }});
        }
    }

    function showMidFocusAd() {
        var idList = [];
        var contentList = [];
        for (var fl = 0; fl < 4; fl++) {
            var defaultItem = floorData[fl].cateList[floorData[fl].defaultCateIndex];
            idList.push(defaultItem.adId);
            createMidAdSubDom(defaultItem);
            var childDomList = $child($id("midImgAd_" + defaultItem.tag), "span");
            contentList.push(childDomList);
        }
        $biFocusAd({idList: idList, staticFileUrl: "", templateIdList: "midImgAdTpl", contentList: contentList, pageSize: 1, serverTime: now, onEach: function (dataList, groupId, locationId, locationIndex) {
            var floorIndex = $inArray(groupId * 1, this.idList);
            var cateList = floorData[floorIndex].cateList;
            var tabIndex = findCateIndexByAdId(cateList, groupId);
            $each(dataList, function (dataItem, itemIndex) {
                dataItem.clickurl = $addUrlRd(dataItem.clickurl, "20219." + (19 + floorIndex * 4 + tabIndex) + "." + (locationIndex + 2), "biFocusAd")
            });
        }, onSuccess: function () {
            for (var fl = 0; fl < 4; fl++) {
                floorData[fl].cateList[floorData[fl].defaultCateIndex].hasLoadMiddleImg = true;
            }
            $autoLoadImages();
            firstLoadDone = true;
        }});
        function findCateIndexByAdId(cateList, adId) {
            for (var i = 0, j = cateList.length; i < j; i++) {
                if (cateList[i].adId == adId) {
                    return i;
                }
            }
            return-1;
        }
    }

    function showMidFocusAdOnDemand(fl, index) {
        var cateItem = floorData[fl].cateList[index];
        if (cateItem.hasLoadMiddleImg) {
            return;
        }
        createMidAdSubDom(cateItem);
        $biFocusAd({idList: [cateItem.adId], staticFileUrl: "", templateIdList: "midImgAdTpl", contentList: [$child($id("midImgAd_" + cateItem.tag), "span")], pageSize: 1, onEach: function (dataList, groupId, locationId, groupIndex, locationIndex) {
            $each(dataList, function (dataItem, itemIndex) {
                if (groupId != 623) {
                    dataItem.clickurl = $addUrlRd(dataItem.clickurl, "20219." + (19 + fl * 4 + index) + "." + (locationIndex + 2), "ptag", "biFocusAd");
                }
            });
        }, onSuccess: function () {
            floorData[fl].cateList[index].hasLoadMiddleImg = true;
            $autoLoadImages();
        }});
    }

    function showMidCommByFocusData(fl, index) {
        var cateItem = floorData[fl].cateList[index];
        if (cateItem.hasLoadMidComm2) {
            return;
        }
        $biFocusAd({idList: [cateItem.adId2], staticFileUrl: "", templateIdList: "floorMidCommTpl", contentList: "middleComm_go", pageSize: 1, onEach: function (dataList, groupId, locationId, groupIndex, locationIndex) {
            $each(dataList, function (dataItem, itemIndex) {
                dataItem.clickUrl = dataItem.clickurl;
                dataItem.itemFullName = dataItem.materialdesc;
                dataItem.uploadPicUrl1 = dataItem.material;
                dataItem.activePrice = dataItem.materialname * 100;
            });
        }, onSuccess: function () {
            floorData[fl].cateList[index].hasLoadMidComm2 = true;
            $autoLoadImages();
        }});
    }

    function createMidAdSubDom(cateItem) {
        var styleIndex = cateItem.adStyleIndex == undefined ? 2 : cateItem.adStyleIndex;
        cateItem.adStyleIndex = styleIndex;
        var styleList = midAdStyle[styleIndex];
        var subLength = styleList.length;
        var html = [];
        for (var i = 0; i < subLength; i++) {
            html.push("<span class='" + styleList[i] + "'></span>");
        }
        $id("midImgAd_" + cateItem.tag).innerHTML = html.join("");
    }

    function analyzeDefaultCate() {
        for (var fl = 0; fl < 4; fl++) {
            $each(floorData[fl].cateList, function (item, index) {
                item.order = getCateOrder(item.tagId);
            });
            var tempArr = $arrayClone(floorData[fl].cateList);
            tempArr.sort(function (item1, item2) {
                return item1.order - item2.order;
            });
            var defaultCate = tempArr[0];
            floorData[fl].defaultCateIndex = findCateIndex(floorData[fl].cateList, defaultCate.tag);
        }
    }

    function getCateOrder(tagId) {
        var order = $arrayLookup(cateOrderData, tagId, function (item) {
            return item.moduleId * 1;
        });
        order == -1 && (order = tagId);
        return order;
    }

    function setRandomDefaultCate() {
        for (var fl = 0; fl < 4; fl++) {
            floorData[fl].defaultCateIndex = $randomInt(floorData[fl].cateList.length);
        }
    }

    function findCateIndex(cateList, tag) {
        for (var i = 0, j = cateList.length; i < j; i++) {
            if (cateList[i].tag == tag) {
                return i;
            }
        }
        return 0;
    }

    function showMiddleComm() {
        var idList = [];
        var contentList = [];
        for (var fl = 1; fl < 4; fl++) {
            var defaultItem = floorData[fl].cateList[floorData[fl].defaultCateIndex];
            var xuanPinId = defaultItem.xuanPinId;
            if (xuanPinId) {
                idList.push(xuanPinId);
                contentList.push("middleComm_" + defaultItem.tag);
                defaultItem.hasLoadMiddleComm = true;
            }
            ;
        }
        $batchBiXuanPin({idList: idList, type: 1, templateId: "floorMidCommTpl", staticFileUrl: "http://static.paipaiimg.com/sinclude/tws/xpfree/2012/5/xpfreen1218.js", contentList: contentList, pageSize: 5, serverTime: now, mask: 2, onEach: function (itemList, groupIndex, groupId) {
            var floorIndex = groupIndex + 1;
            var tabIndex = findCateIndexByXuanpinId(floorData[floorIndex].cateList, groupId);
            for (var i = 0, j = itemList.length; i < j; i++) {
                itemList[i].itemFullName = $decodeHtml($decodeHtml(itemList[i].itemFullName));
                itemList[i].clickUrl = $addUrlRd(itemList[i].clickUrl, "20219." + (19 + floorIndex * 4 + tabIndex) + "." + (5 + i), "ptag", "biXuanPin");
            }
        }, onSuccess: function () {
            for (var fl = 1; fl < 4; fl++) {
                floorData[fl].cateList[floorData[fl].defaultCateIndex].hasLoadMiddleComm = true;
            }
            $autoLoadImages();
        }});
        function findCateIndexByXuanpinId(cateList, xuanPinId) {
            for (var i = 0, j = cateList.length; i < j; i++) {
                if (cateList[i].xuanPinId == xuanPinId) {
                    return i;
                }
            }
            return-1;
        }
    }

    function showMiddleCommOnDemand(fl, index) {
        var cateItem = floorData[fl].cateList[index];
        if (!cateItem.xuanPinId || cateItem.hasLoadMiddleComm) {
            return;
        }
        $batchBiXuanPin({idList: [cateItem.xuanPinId], type: 1, templateId: "floorMidCommTpl", staticFileUrl: "http://static.paipaiimg.com/sinclude/tws/xpfree/2012/5/xpfreen1218.js", contentList: ["middleComm_" + cateItem.tag], pageSize: 5, mask: 2, onEach: function (itemList, groupIndex, groupId) {
            for (var i = 0, j = itemList.length; i < j; i++) {
                itemList[i].itemFullName = $decodeHtml($decodeHtml(itemList[i].itemFullName));
                itemList[i].clickUrl = $addUrlRd(itemList[i].clickUrl, "20219." + (19 + fl * 4 + index) + "." + (5 + i), "biXuanPin");
            }
        }, onSuccess: function () {
            floorData[fl].cateList[index].hasLoadMiddleComm = true;
            $autoLoadImages();
        }});
    }

    function showRankComm(fl, index) {
        var cateItem = floorData[fl].cateList[index];
        if (!cateItem.rankId || cateItem.hasLoadRightRank) {
            return;
        }
        $ranklist({rankIdList: [cateItem.rankId], domList: ["rightRank_" + cateItem.tag], templateId: "floorRankTpl", length: 4, onEach: function (dataItem, groupIndex, itemIndex) {
            dataItem.itemName = unescape(dataItem.itemName);
            dataItem.image = unescape(dataItem.itemPicUrl_120x120).replace("120x120", "80x80");
            dataItem.ptag = "20219." + (19 + fl * 4 + index) + ".10";
        }, onSuccess: function () {
            $autoLoadImages();
        }});
    }

    function showRigthHotRecmd(fl, index) {
        var cateItem = floorData[fl].cateList[index];
        if (!cateItem.tiaoId || cateItem.hasLoadTiaoData) {
            return;
        }
        $chooseV2({sid: cateItem.tiaoId, pageSize: 10, templateId: "tiaoTpl", contentId: "hotRecmd_" + cateItem.tag, isWaterfall: false, staticFileUrl: "", onEach: function (itemIndex, dataItem) {
            dataItem.img160x160 = dataItem.img200x200.replace("200x200.jpg", "160x160.jpg");
            dataItem.clickUrl += ("&ptag=20219." + (19 + fl * 4 + index) + ".8");
        }, onSuccess: function (total, list) {
            $slider({contentId: "hotRecmd_" + cateItem.tag, contentTag: "div", prevId: "hotRecmdPrev_" + cateItem.tag, nextId: "hotRecmdNext_" + cateItem.tag});
            cateItem.hasLoadTiaoData = true;
        }});
    }

    function reportCategoryOrder() {
        setTimeout(function () {
            var params = [];
            $each(floorData, function (item, index) {
                var defaultCate = floorData[index].cateList[floorData[index].defaultCateIndex];
                params.push(defaultCate.tagId + ":" + (defaultCate.order + 1));
            });
            var url = "http://focus.paipai.com/categorydirect/directionreport?qquin=" + $getUin() + "&module=" + params.join("|") + "&strategyId=" + floorData.strategyId + "&pageurl=" + encodeURIComponent(location.href) + "&curl=" + encodeURIComponent(location.href) + "&callback=floorOrderCallback&t=" + Math.random();
            $loadScript(url);
            window.floorOrderCallback = $empty();
        }, 1000);
    };
};
PP.wg.index.loadBaoyou = function () {
    var Length = 10;
    var data = [
        {martId: '33574', moduleName: "美容美妆", staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229347832031.js'},
        {martId: '33581', moduleName: "男装", staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229699152032.js'},
        {martId: '33582', moduleName: "女装", staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229729452033.js'},
        {martId: '33583', moduleName: "运动户外", staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229509112034.js'},
        {martId: '33584', moduleName: "数码家电", staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229493212035.js'},
        {martId: '33585', moduleName: "鞋包配饰", staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229880862036.js'},
        {martId: '33586', moduleName: "家居家装", staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw229213382037.js'},
        {martId: '33587', moduleName: "食品保健", staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw239846872038.js'},
        {martId: '33588', moduleName: "母婴用品", staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw239400572039.js'},
        {martId: '33589', moduleName: "文化娱乐", staticUrl: 'http://static.paipaiimg.com/sinclude/xml/tjw/tjw2013/tjw1/tjw239895822040.js'}
    ];
    loadBaoyouCateData();
    function loadBaoyouCateData() {
        $loadScript("http://focus.paipai.com/categorydirect/directionshow?qquin=" + $getUin() + "&ps=10&callback=baoyouOrderCallback&scendid=2&t=" + Math.random());
        window.baoyouOrderCallback = function (json) {
            var initIndex = 0;
            if (json.errCode == "0" && json.data) {
                var firstCateName = json.data[0].moduleName;
                initIndex = $arrayLookup(data, firstCateName, function (item, itemIndex) {
                    return item.moduleName;
                });
            } else {
                initIndex = $randomInt(data.length);
            }
            $slider({titleId: "baoyouTitle", titleTag: "li", contentId: "baoyouContent", contentTag: "ul", className: "cur", initIndex: initIndex, func: function (i) {
                if (!data[i].hasLoad) {
                    showBaoyou(i, this.cont[i]);
                }
            }});
        };
    }

    function showBaoyou(index, dom) {
        $martCpc({idList: [data[index].martId], templateType: "json", pc: Length, onEach: function (itemList) {
            for (var i = 0, j = itemList.length; i < j; i++) {
                itemList[i].clickUrl = $addUrlRd(itemList[i].clickUrl, "20219.65." + (index + 1), "martCpc");
            }
        }, onRender: function (itemList, martId, areaId) {
            dom.innerHTML = $formatArray("baoyouTpl", itemList);
            if (Length - itemList.length > 0) {
                addItem(index, Length - itemList.length, dom);
            } else {
                data[index].hasLoad = true;
                $autoLoadImages();
            }
        }});
    }

    function addItem(index, len, dom) {
        var callback = data[index].staticUrl.match(/\w*(?=\.js)/)[0];
        $loadScript(data[index].staticUrl);
        window[callback] = function (json) {
            if (json.errCode != "0") {
                return;
            }
            var dataList = json.data.adList;
            var newList = [];
            for (var i = 0; i < len; i++) {
                if (dataList[i]) {
                    dataList[i].clickUrl = 'http://item.wanggou.com/' + dataList[i].id + "?PTAG=20219.65." + (index + 1);
                    dataList[i].commFullName = dataList[i].recmdRegName;
                    dataList[i].uploadPicUrl1 = dataList[i].img160x160;
                    dataList[i].newPrice = (dataList[i].newPrice - 0) * 100;
                    newList.push(dataList[i]);
                }
            }
            dom.innerHTML += $formatArray("baoyouTpl", newList);
            data[index].hasLoad = true;
            $autoLoadImages();
        }
    }
};
PP.wg.index.bindItilReport = function () {
    var itilArea = this.itilArea;
    $itilReport({bid: "5", mid: "01", res: ["0:0", "1:0", "2:0", "3:0", "4:0"], onBeforeReport: function () {
        this.res = ["0:" + (itilArea.leftNav ? 1 : 0), "1:" + (itilArea.slider ? 1 : 0), "2:" + (itilArea.todaySale ? 1 : 0), "3:" + (itilArea.brandAct ? 1 : 0)];
    }});
};
PP.wg.index.init();
window['PP.wg.index'] = '21010:20131118:20131119154813';
window['PP.wg.index.time'] && window['PP.wg.index.time'].push(new Date());
/*  |xGv00|b95803a0f79ef6337ac3301651e78ca7 */