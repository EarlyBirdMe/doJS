if (typeof(QQVIPFS) == "undefined" || !QQVIPFS) {
    var QQVIPFS = {};
    QQVIPFS.version = "1.0.0.1";
    QQVIPFS.author = "The Club Dev Team, ISRD, Tencent Inc.";
}
QQVIPFS.ServiceId = {SUIT: 1001, SKIN: 1002, FACE: 1003, BIZHI: 1004, PINYIN: 1005, QQRING: 1008, WEIBO: 1010, BIAOQING: 1011, GROUPFACE: 1013, MUSICSKIN: 1014, QDESKSKIN: 1015, FLASHRING: 1016, MAGICBQ: 1017};
QQVIPFS.MainFrom = {IM_SKIN: 997, SEARCH: 998, APPBOX: 999, FS_INDEX: 1000, SUIT: 1001, SKIN: 1002, FACE: 1003, BIZHI: 1004, PINYIN: 1005, ZHUANQU: 1007, QQRING: 1008, WEIBO: 1010, BIAOQING: 1011, WEEKLY: 1012, GROUPFACE: 1013, MUSICSKIN: 1014, FLASHRING: 1015, ACTAOYUN: 2001};
QQVIPFS.Utils = {styleLogin: function (aid, opt) {
    var _aid = aid || 'neirong_index';
    var _opt = opt || {callback: function () {
        QQVIPFS.Utils.showUserTips(_aid);
    }};
    if (typeof(qq) != 'undefined' && qq.login) {
        qq.login.open(function () {
            if (typeof(zb) != 'undefined' && zb.widget && zb.widget.siteLayout) {
                zb.widget.siteLayout.getUserInfoAsync(function (event) {
                    QQVIP.dataCenter.save('nr_userInfo', {uin: event.data.uin, nickname: event.data.name, clublevel: event.data.vipLevel, isclub: event.data.isVip ? '1' : '0', today: event.data.today, faceurl: event.data.faceUrl});
                    if (typeof(opt.callback) == 'function') {
                        opt.callback();
                    }
                });
            }
        });
        return;
    }
    var _list = ['clientuin', 'clientkey', 'skey', 'uin'];
    for (i in _list) {
        QQVIP.cookie.del(_list[i]);
    }
    login(_opt);
}, showUserTips: function (aid, params) {
    if (typeof(zb) != 'undefined' && zb.widget && zb.widget.siteLayout) {
        zb.widget.siteLayout.updatePayButton(aid);
        zb.widget.siteLayout.getUserInfoAsync(function (event) {
            QQVIP.dataCenter.save('nr_userInfo', {uin: event.data.uin, nickname: event.data.name, clublevel: event.data.levelQQClub, isclub: event.data.isQQClub ? '1' : '0', today: event.data.today, faceurl: event.data.faceUrl});
        })
        return;
    }
    var _params = params || {};
    var _userParams = _params.userParams || '';
    var _loginStyle = _params.loginStyle || 'openLogin';
    var _callbackFunction = _params.callback || '';
    if (_loginStyle == 'openLogin') {
        _loginStyle = _loginStyle + '()';
    } else {
        if (_callbackFunction != '') {
            _loginStyle = _loginStyle + '(\'' + aid + '\',{callback:function(){' + _callbackFunction + ';}})';
        } else {
            _loginStyle = _loginStyle + '(\'' + aid + '\')';
        }
    }
    var token = QQVIP.security.getAntiCSRFToken();
    var _url = "http://function.qq.com/common/getuserinfo.php?cmd=10014&params={1}&g_tk=" + token;
    var _lInfoN = '<div class="logout"><span>您还未登录，</span><a href="javascript:' + _loginStyle + ';">请登录</a><a href="{AIDLINK}" class="mod_vip" target="_blank">开通年费会员</a></div>';
    var _lInfoY = '<div class="login"><span>您好，{NAME}[{UIN}]</span> <a href="javascript:QQVIPFS.Utils.logOut();">退出</a><a href="{AIDLINK}" class="{MOD_VIP}" target="_blank">开通年费会员</a></div>';
    var _aidLinkTpl = 'http://pay.qq.com/qqvip/?aid=vip.gongneng.subsite.%s.kaitong_nav_button_nlogin';
    var _aidLink = _aidLinkTpl.replace('%s', aid || 'neirong_index');
    var _userInfo = _vip_func_get_user_info_element_();
    _userInfo && (_userInfo.innerHTML = _lInfoN.replace(/\{AIDLINK\}/g, _aidLink).replace(/\{MOD_VIP\}/g, 'mod_vip'));
    if (QQVIPFS.Utils.checkCookie()) {
        _url = _url.replace('{1}', _userParams);
        var _jsLd = new QQVIP.JsLoader();
        _jsLd.load(_url);
        _com_getUserInfo = function (json) {
            if (json.result == 0) {
                var _sClubTips = json.data.isclub ? 'mod_xf' : 'mod_vip';
                _userInfo && (_userInfo.innerHTML = _lInfoY.replace(/\{(\w+)\}/g, function (_0, _1) {
                    var _map = {'{NAME}': json.data.nickname, '{UIN}': json.data.uin, '{AIDLINK}': _aidLink, '{MOD_VIP}': _sClubTips};
                    return _map[_0];
                }));
                QQVIP.dataCenter.save('nr_userInfo', json.data);
            }
        }
    }
}, showDialog: function (tipsInfo) {
    var _W = 500, _H = 240;
    tipsInfo.weibo = tipsInfo.weibo || '';
    var tipsHTML = '<div class="mod_pop_wrap"><div class="hd_pop_gb"><h3>温馨提示</h3><button type="button" title="关闭弹出层" onclick="$(\'mod_pop_mask\').style.display=\'none\';$(\'tips_window\').style.display=\'none\';return false;">关闭</button></div><div class="bd_pop_gb"><div class="info_{type}"><h4>{brief}</h4><p>{detail}</p><p class="pic_succ">{openvip}</p></div></div><div id="sureBtn" class="ft_pop_gb">{weibo}<a href="javascript:void(0);" onclick="$(\'mod_pop_mask\').style.display=\'none\';$(\'tips_window\').style.display=\'none\';return false;" class="btn_fit_pop"><span>确&nbsp;&nbsp;定</span></a></div></div>';
    tipsTpl = tipsHTML.replace(/\{(\w+)\}/g, function (_0, _1) {
        return tipsInfo[_1];
    });
    var _clientHeight = QQVIP.dom.getClientHeight();
    var _clientWidth = QQVIP.dom.getClientWidth();
    var _scrollHeight = QQVIP.dom.getScrollHeight();
    var _scrollTop = QQVIP.dom.getScrollTop();
    $('mod_pop_mask').style.display = '';
    $('mod_pop_mask').style.height = _scrollHeight + 'px';
    $('mod_pop_mask').style.width = _clientWidth + 'px';
    $('tips_window').innerHTML = tipsTpl;
    $('tips_window').style.width = _W + 'px';
    if (tipsInfo.openvip != '') {
        $('sureBtn').style.display = 'none';
    }
    if (QQVIP.userAgent.ie < 7) {
        $('tips_window').style.top = (_clientHeight - _H) / 2 + _scrollTop + 'px';
    } else {
        $('tips_window').style.top = (_clientHeight - _H) / 2 + 'px';
    }
    $('tips_window').style.left = (_clientWidth - _W) / 2 + 'px';
    $('tips_window').style.display = 'block';
    QQVIPFS.Utils.killFocus();
}, showWeibo: function (content, pic, surl, pref, heightDiff) {
    var _info = {"content": content, "pic": pic, "sid": '1256', "surl": surl, "pref": pref};
    QQVIPFS.Utils.showWeiboDialog(_info, heightDiff);
}, showWeiboDialog: function (weiboInfo, heightDiff) {
    heightDiff = heightDiff || 0;
    var _W = 600, _H = 240;
    var _clientHeight = QQVIP.dom.getClientHeight();
    var _clientWidth = QQVIP.dom.getClientWidth();
    var _scrollHeight = QQVIP.dom.getScrollHeight();
    var _scrollTop = QQVIP.dom.getScrollTop();
    $('mod_pop_mask').style.height = _scrollHeight + 'px';
    $('mod_pop_mask').style.width = _clientWidth + 'px';
    $('mod_pop_mask').style.display = '';
    $('tips_weibo').style.width = _W + 'px';
    $('tips_weibo').style.height = _H + 'px';
    if (QQVIP.userAgent.ie < 7) {
        $('tips_weibo').style.top = (_clientHeight - _H) / 2 - heightDiff + _scrollTop + 'px';
    } else {
        $('tips_weibo').style.top = (_clientHeight - _H) / 2 - heightDiff + 'px';
    }
    $('tips_weibo').style.left = (_clientWidth - _W) / 2 + 'px';
    var tipsHTML = '<div class="mod_pop_wrap" style="border:0"><div class="hd_pop_gb"><h3>腾讯微博</h3><button type="button" title="关闭弹出框" onclick="$(\'mod_pop_mask\').style.display=\'none\';$(\'tips_weibo\').style.display=\'none\';if(Nr.checkCookie()){QQVIPFS.Utils.showUserTips(\'neirong_face\');}return false;">关闭</button></div><iframe id="weiboWinFrame" scrolling="no" frameborder="0" name="weiboWinFrame" marginheight="0" marginwidth="0" style="width:600px; height:320px;" src="http://radio.t.qq.com/open/share.php?txt={content}&pic={pic}&surl={surl}&sid={sid}&pref={pref}"></iframe></div>';
    tipsTpl = tipsHTML.replace(/\{(\w+)\}/g, function (_0, _1) {
        return weiboInfo[_1];
    });
    $('tips_weibo').innerHTML = tipsTpl;
    $('tips_weibo').style.display = 'block';
    QQVIPFS.Utils.killFocus();
}, showFriendList: function (dlgParams, btnCallback) {
    var _params = dlgParams || {};
    _params.name = _params.name || '请选择好友';
    _params.uin = _params.uin || '';
    if (QQVIP.object.getType(_params.infos) != 'array') {
        _params.infos = [];
    }
    var _cb = (typeof(btnCallback) != 'function') ? (function () {
    }) : btnCallback;
    var _W = 560, _H = 320;
    var CST_FLASH_ID = "__friend_list__";
    var CST_URL_FRIENDLIST = "http://imgcache.qq.com/club/neirong/swf/friendList.swf";
    var _info = {noflash: {"type": "alert", "brief": "", "detail": '好友列表插件无法显示，flash版本可能过低，请试试<a href="http://www.adobe.com/go/getflashplayer" target="_blank">升级flash</a>。', "openvip": ''}};
    if (QQVIP.media.getFlashVersion().major < 9) {
        return QQVIPFS.Utils.showDialog(_info['noflash']);
    }
    var _tplList = '<div class="mod_pop_wrap"><div class="hd_pop_gb"><h3>{1}</h3><button type="button" title="关闭好友列表">关闭</button></div><div class="bd_pop_gb"><div class="pop_pad"><ul class="pop_friendbox clearfix">{2}</ul><div class="flashbox"><div class="flash_innr"></div></div></div></div><div class="ft_pop_gb"><a href="javascript:void(0);" class="btn_fit_pop"><span>确&nbsp;定</span></a><a href="javascript:void(0);" class="btn_fit_pop"><span>关&nbsp;闭</span></a></div></div>';
    _tplList = _tplList.replace(/\{(\w+)\}/g, function (_0, _1) {
        var _li = '';
        QQVIP.object.each(_params.infos, function (v) {
            _li += '<li>' + v + '</li>';
        });
        var _map = {'{1}': _params.name, '{2}': _li};
        return _map[_0];
    });
    var _elDiv = $('friend_list_div');
    _elDiv.innerHTML = _tplList;
    var _elMask = $('mod_pop_mask');
    var _elCloseBtnTop = $e("#friend_list_div div.hd_pop_gb button").elements[0];
    var _elSureBtn = $e("#friend_list_div div.ft_pop_gb a").elements[0];
    var _elCloseBtnBottom = $e("#friend_list_div div.ft_pop_gb a").elements[1];
    var _elFlashDiv = $e("#friend_list_div div.flash_innr").elements[0];
    _elFlashDiv.innerHTML = QQVIP.media.getFlashHtml({'id': CST_FLASH_ID, 'name': CST_FLASH_ID, 'width': '530', 'height': '211', 'quality': 'high', 'pluginspage': 'http://www.macromedia.com/go/getflashplayer', 'align': 'middle', 'play': 'true', 'loop': 'true', 'scale': 'showall', 'wmode': 'transparent', 'FlashVars': 'f_uin=' + (_params.uin), 'devicefont': 'false', 'bgcolor': '#fff8ee', 'menu': 'true', 'allowScriptAccess': 'always', 'src': CST_URL_FRIENDLIST + '?r=' + Math.random()});
    var _elFlash = $(CST_FLASH_ID);
    QQVIP.object.each([_elCloseBtnTop, _elCloseBtnBottom], function (obj) {
        QQVIP.event.addEvent(obj, 'click', function (e) {
            _elDiv.style.display = 'none';
            _elMask.style.display = 'none';
        });
    });
    QQVIP.event.addEvent(_elSureBtn, 'click', function (e) {
        if (typeof(_elFlash.get_data) == "undefined") {
            return(window.alert('很抱歉，系统无法接收你的好友列表！'));
        }
        var _friendsList = _elFlash.get_data();
        if (!_friendsList) {
            return(window.alert('请选择好友列表！'));
        }
        _elDiv.style.display = 'none';
        _cb(_friendsList);
    });
    var _clientHeight = QQVIP.dom.getClientHeight();
    var _clientWidth = QQVIP.dom.getClientWidth();
    var _scrollHeight = QQVIP.dom.getScrollHeight();
    var _scrollTop = QQVIP.dom.getScrollTop();
    _elMask.style.display = 'block';
    _elMask.style.height = _scrollHeight + 'px';
    _elMask.style.width = _clientWidth + 'px';
    _elMask.style.display = '';
    _elDiv.style.width = _W + 'px';
    if (QQVIP.userAgent.ie < 7) {
        _elDiv.style.top = (_clientHeight - _H) / 2 + _scrollTop + 'px';
    } else {
        _elDiv.style.top = (_clientHeight - _H) / 2 + 'px';
    }
    _elDiv.style.left = (_clientWidth - _W) / 2 + 'px';
    _elDiv.style.display = 'block';
    QQVIPFS.Utils.killFocus();
}, checkCookie: function () {
    return!!(QQVIP.cookie.get('uin') || QQVIP.cookie.get('clientuin'));
}, getQuery: function (key) {
    var currHref = location.href;
    var sValue = currHref.match(new RegExp("[\?&]" + key + "=([^&]*)(&?)", "i"));
    return sValue && String(sValue[1]) || '';
}, logOut: function () {
    var _list = ['clientuin', 'clientkey', 'skey', 'uin'];
    for (i in _list) {
        QQVIP.cookie.del(_list[i]);
    }
    location.replace(location.href);
}, speedRpt: function (flag1, flag2, flag3, times) {
    var _url = ['http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=', flag1, '&flag2=', flag2, '&flag3=', flag3].join('');
    for (var i = 1, len = times.length; i < len; i++) {
        _url += ['&', i, '=', times[i]].join('');
    }
    _url += ['&r=', Math.random()].join('');
    var _img = new Image();
    _img.src = _url;
}, pvClickSend: function (tag) {
    if (typeof(pgvSendClick) == "function") {
        pgvSendClick({hottag: tag});
    }
}, cutString: function (str, len, szTail, escFlag) {
    var ret = [];
    var _escFlag = (typeof(escFlag) == 'undefined') ? true : false;
    str = QQVIP.string.restXHTML(str);
    var slen = str.length;
    for (var i = 0; i < slen && i < len; i++) {
        ret.push(str.charAt(i).toString());
    }
    (slen > len) && (ret.push(szTail));
    return!!(_escFlag) ? QQVIP.string.escHTML(ret.join("")) : (ret.join(""));
}, urlDecode: function (url) {
    if (typeof(decodeURIComponent) != "undefined") {
        try {
            return decodeURIComponent(url);
        }
        catch (e) {
            return url
        }
    }
    return url;
}, tj2LogSend: function (json) {
    json = json || {};
    var serviceId = json.serviceId || 0, operate = json.operate || '', itemId = json.itemId || 0, result = json.result || 0, mainFrom = json.mainFrom || 0, subFrom = json.subFrom || 0, subFrom2 = json.subFrom2 || 0, toUin = json.toUin || 0, level = json.level || -1, iExt1 = json.iExt1 || 0, uiExt1 = json.uiExt1 || 0, sExt1 = json.sExt1 || '';
    var token = QQVIP.security.getAntiCSRFToken();
    var _url = 'http://function.qq.com/common/tj2Log.php?';
    var _arr = [_url, 'serviceId=', serviceId, '&operate=', operate, '&itemId=', itemId, '&result=', result, '&mainFrom=', mainFrom, '&subFrom=', subFrom, '&subFrom2=', subFrom2, '&toUin=', toUin, '&level=', level, '&iExt1=', iExt1, '&uiExt1=', uiExt1, '&sExt1=', sExt1, '&g_tk=', token];
    var _js = new QQVIP.JsLoader();
    _js.load(_arr.join(''), null, 'GB2312');
}, checkPinyin: function () {
    if (QQVIP.userAgent.ie && QQVIP.userAgent.ie > 0) {
        var _axObj = null;
        try {
            _axObj = new ActiveXObject("QQPYSetupChecker.QQPYChecker");
            if (_axObj.GetVersion()) {
                return 1;
            } else {
                return-1;
            }
        } catch (e) {
            return-1;
        }
    }
    return 2;
}, killFocus: function () {
    var _arr = ['A', 'BUTTON'];
    QQVIP.object.each(_arr, function (v) {
        $e(v).each(function (o) {
            o.onfocus = function () {
                this.blur();
            };
        });
    });
}, goTo: function (serviceId, cateId, callbackFunc, isHot) {
    var _pageNum = $('__pnInput').value;
    var _pageTotal = $('__pnTotal').value;
    var _page = parseInt(_pageNum);
    if (!(_page <= _pageTotal && _page >= 1)) {
        window.alert('请填写有效的页码');
        $('__pnInput').focus();
        return;
    }
    QQVIPFS.Utils.switchNavCate(serviceId, cateId, _page, callbackFunc, isHot);
    QQVIPFS.Utils.killFocus();
}, showPaging: function (serviceId, cateId, tp, cp, callbackFunc, isHot) {
    if (!isHot) {
        isHot = 0;
    }
    var _paging = new QQVIPFS.Paging('<a href="javascript:void(0);" onclick=\'QQVIPFS.Utils.switchNavCate(\"' + serviceId + '\",\"' + cateId + '\",{PAGE},' + callbackFunc + ',\"' + isHot + '\");return false;\'><span>{PAGENAME}</span></a> ', '<span class="current"><span>{PAGENAME}</span></span> ', '<span class="mod_pagenav_disable"><span>{PAGENAME}</span></span> ', '<span class="mod_pagenav_more"><span>{PAGENAME}</span></span> ', '<p class=\'mod_pagenav_main\'>{PRE}<span class=\'mod_pagenav_count\'> {PAGING}</span>{NEXT}</p><p class=\'mod_pagenav_option\'><span class=\'mod_pagenav_turn\'>到<input type=\'hidden\' id=\'__pnTotal\' value=\'{TOTALPAGE}\' /><input type=\'text\' id=\'__pnInput\' value=\'{PAGE}\' maxlength=\'6\' />页 <button onclick=\'QQVIPFS.Utils.goTo(\"' + serviceId + '\",\"' + cateId + '\",' + callbackFunc + ',\"' + isHot + '\");return false;\'><span>确定</span></button></span></p>', 10, 2);
    $('paging').innerHTML = _paging.update(parseInt(tp), parseInt(cp));
    $('__pnInput').onkeypress = function (event) {
        var _evt = event || window.event;
        if (_evt.keyCode == QQVIP.event.KEYS.RETURN) {
            QQVIPFS.Utils.goTo(serviceId, cateId, callbackFunc, isHot);
        }
    }
}, switchCateArr: new Array(), cacheJsonArr: new Array(), cacheHotJsonArr: new Array(), cacheNotExist: new Array(), cacheHotNum: new Array(), currentCateId: 0, currentIsHot: 0, timeSort: function (serviceId, callbackFunc) {
    QQVIPFS.Utils.currentIsHot = 0;
    var _cateName = QQVIPFS.Utils.currentCateId;
    var _cateIdArr = _cateName.split("_");
    _cateIdArr.pop();
    var _cateId = _cateIdArr.join("_");
    if (QQVIPFS.Utils.cacheNotExist[serviceId] && QQVIPFS.Utils.cacheNotExist[serviceId][_cateId]) {
        callbackFunc(QQVIPFS.Utils.cacheNotExist[serviceId][_cateId], 0, 0);
        return;
    }
    var _totalPage = QQVIPFS.Utils.cacheJsonArr[_cateName].basic.tp;
    var _totalCount = QQVIPFS.Utils.cacheJsonArr[_cateName].basic.totalCount;
    var _dataArr = QQVIPFS.Utils.splitJson(1, QQVIPFS.Utils.cacheJsonArr[_cateName]);
    callbackFunc(_dataArr, _totalCount, 1, 0);
    QQVIPFS.Utils.showPaging(serviceId, _cateIdArr.join("_"), _totalPage, 1, callbackFunc, 0);
}, hotSort: function (serviceId, callbackFunc) {
    QQVIPFS.Utils.currentIsHot = 1;
    var _getAllJsFunc = function (serviceId, cateName) {
        QQVIPFS.Utils.currentCateId = _cateName;
        var _urlTpl = "http://imgcache.qq.com/club/style/json/{SERVICE}/{JSNAME}.js?20120831";
        var _url = _urlTpl.replace(/\{SERVICE\}/, serviceId).replace(/\{JSNAME\}/, cateName);
        var _xhr = new QQVIP.XHR(_url, null, 'GET', null, true, true);
        _xhr.send();
        _xhr.onSuccess = function (json) {
            var callback = function (_d) {
                QQVIPFS.Utils.cacheJsonArr[cateName] = _d;
                QQVIPFS.Utils.hotSort(serviceId, callbackFunc);
            };
            eval(json['text']);
        };
    };
    var _cateName = QQVIPFS.Utils.currentCateId != 0 ? QQVIPFS.Utils.currentCateId : QQVIPFS.Utils.cateArr.join("_") + "_all";
    var _cateNameArr1 = _cateName.split("_");
    _cateNameArr1.pop();
    var _cateId = _cateNameArr1.join("_");
    if (QQVIPFS.Utils.cacheNotExist[serviceId] && QQVIPFS.Utils.cacheNotExist[serviceId][_cateId]) {
        callbackFunc(QQVIPFS.Utils.cacheNotExist[serviceId][_cateId], 0, 0);
        return;
    }
    var _dataArr = QQVIPFS.Utils.cacheJsonArr[_cateName] || [];
    if (_dataArr.length == 0) {
        _getAllJsFunc(serviceId, _cateName);
    } else {
        var _cateName = QQVIPFS.Utils.currentCateId;
        var _cateNameArr = _cateName.split("_");
        var _suffixName = _cateNameArr[_cateNameArr.length - 1];
        if (_suffixName == "default" && _dataArr.basic.tp > 10) {
            _cateNameArr[_cateNameArr.length - 1] = "all";
            _cateName = _cateNameArr.join("_");
            _getAllJsFunc(serviceId, _cateName);
        } else {
            var _dataArr = QQVIPFS.Utils.cacheJsonArr[_cateName];
            var _arrNum = _dataArr.data.length;
            var _dataInfo = [];
            for (var i = 0; i < _arrNum; i++) {
                _dataInfo[i] = _dataArr.data[i];
            }
            for (var i = 0; i < _arrNum; i++) {
                _dataInfo[i] = _dataInfo[i].split("||");
            }
            var _hotIndex = _dataInfo[0].length - 1;
            _dataInfo = _dataInfo.sort(function (a, b) {
                return b[_hotIndex] - a[_hotIndex]
            });
            for (var i = 0; i < _arrNum; i++) {
                _dataInfo[i] = _dataInfo[i].join("||");
            }
            QQVIPFS.Utils.cacheHotJsonArr = {"basic": {"tp": _dataArr.basic.tp, "pageStep": _dataArr.basic.pageStep, "totalCount": _dataArr.basic.totalCount}, "data": _dataInfo};
            var _pageDataArr = QQVIPFS.Utils.splitJson(1, QQVIPFS.Utils.cacheHotJsonArr);
            callbackFunc(_pageDataArr, QQVIPFS.Utils.cacheHotJsonArr.basic.totalCount, 1, 1);
            QQVIPFS.Utils.showPaging(serviceId, _cateName, QQVIPFS.Utils.cacheHotJsonArr.basic.tp, 1, callbackFunc, 1)
        }
    }
}, switchNavTag: function (cateId, isColor) {
    var _cateArr = cateId.split("_");
    QQVIPFS.Utils.cateArr = _cateArr;
    var _unFocus = function (el) {
        el.className = '';
    }
    var _navTag = $e('#style_mod_classification1 li li>a');
    _navTag.each(function (el) {
        _unFocus(el.parentNode);
    });
    var _typeCateArr = ['style', 'theme', 'type'];
    _typeCateArr[2] = isColor ? 'color' : _typeCateArr[2];
    var i = 0;
    _navTag.each(function (el) {
        var _navTagA = $e('#style_mod_classification1 li li>a');
        _navTagA.each(function (el) {
            if (el.getAttribute('_id') == _typeCateArr[i] + "_" + _cateArr[i]) {
                el.parentNode.className = 'current';
            }
        });
        i++;
    });
    var _subNavTag = $e('#style_mod_classification1 li li>div>a');
    _subNavTag.each(function (el) {
        _unFocus(el);
    });
    _subNavTag.each(function (el) {
        if (el.getAttribute('_id') == _typeCateArr[1] + "_" + _cateArr[1]) {
            el.className = 'current';
            var pos = el.parentNode.parentNode.offsetLeft;
            el.parentNode.style.left = -pos + 10 + "px";
            el.parentNode.parentNode.className = 'current';
        }
    });
}, switchNavCate: function (serviceId, cateId, page, callbackFunc, isHot) {
    var _jsName;
    if (cateId.indexOf("all") != -1 || cateId.indexOf("default") != -1) {
        _jsName = cateId;
    } else {
        var pageName = "all";
        if (page < 11) {
            pageName = "default";
        }
        _jsName = cateId + "_" + pageName;
    }
    if (QQVIPFS.Utils.currentIsHot == 1 || (isHot && isHot == 1)) {
        if (page == 1) {
            QQVIPFS.Utils.currentCateId = _jsName;
            QQVIPFS.Utils.hotSort(serviceId, callbackFunc);
        } else {
            var _pageDataArr = QQVIPFS.Utils.splitJson(page, QQVIPFS.Utils.cacheHotJsonArr);
            callbackFunc(_pageDataArr, QQVIPFS.Utils.cacheHotJsonArr.basic.totalCount, 1, 1);
            QQVIPFS.Utils.showPaging(serviceId, cateId, QQVIPFS.Utils.cacheHotJsonArr.basic.tp, page, callbackFunc, 1);
        }
    } else {
        QQVIPFS.Utils.currentCateId = _jsName;
        QQVIPFS.Utils.cacheJsonArr[_jsName] = QQVIPFS.Utils.cacheJsonArr[_jsName] || "0";
        if (QQVIPFS.Utils.cacheNotExist[serviceId]) {
            QQVIPFS.Utils.getJsonData(serviceId, cateId, page, callbackFunc, _jsName);
        } else {
            var _urlTpl = "http://imgcache.qq.com/club/style/json/{SERVICE}/notExist.js";
            var _url = _urlTpl.replace(/\{SERVICE\}/, serviceId);
            var _xhr = new QQVIP.XHR(_url, null, 'GET', null, true, true);
            _xhr.send();
            _xhr.onSuccess = function (json) {
                var callback = function (_d) {
                    QQVIPFS.Utils.cacheNotExist[serviceId] = _d;
                    QQVIPFS.Utils.getJsonData(serviceId, cateId, page, callbackFunc, _jsName);
                };
                eval(json['text']);
            };
        }
    }
}, getJsonData: function (serviceId, cateId, page, callbackFunc, jsName) {
    if (QQVIPFS.Utils.cacheNotExist[serviceId][cateId]) {
        callbackFunc(QQVIPFS.Utils.cacheNotExist[serviceId][cateId], 0, 0);
    } else if (QQVIPFS.Utils.cacheJsonArr[jsName] != 0) {
        var _totalPage = QQVIPFS.Utils.cacheJsonArr[jsName].basic.tp;
        var _totalCount = QQVIPFS.Utils.cacheJsonArr[jsName].basic.totalCount;
        var dataArr = QQVIPFS.Utils.splitJson(page, QQVIPFS.Utils.cacheJsonArr[jsName]);
        callbackFunc(dataArr, _totalCount, 1, 0);
        QQVIPFS.Utils.showPaging(serviceId, cateId, _totalPage, page, callbackFunc, 0);
    } else {
        QQVIPFS.Utils.switchCateArr[serviceId] = QQVIPFS.Utils.switchCateArr[serviceId] || "0_0_0";
        cateId = (cateId == 0) ? QQVIPFS.Utils.switchCateArr[serviceId] : cateId;
        var _urlTpl = "http://imgcache.qq.com/club/style/json/{SERVICE}/{JSNAME}.js?20120831";
        var _url = _urlTpl.replace(/\{SERVICE\}/, serviceId).replace(/\{JSNAME\}/, jsName);
        var _xhr = new QQVIP.XHR(_url, null, 'GET', null, true, true);
        _xhr.send();
        _xhr.onSuccess = function (json) {
            var callback = function (_d) {
                var dataArr = QQVIPFS.Utils.splitJson(page, _d);
                callbackFunc(dataArr, _d.basic.totalCount, 1, 0);
                QQVIPFS.Utils.showPaging(serviceId, cateId, _d.basic.tp, page, callbackFunc, 0);
                QQVIPFS.Utils.cacheJsonArr[jsName] = _d;
            };
            eval(json['text']);
        };
    }
    QQVIPFS.Utils.switchCateArr[serviceId] = cateId;
}, splitJson: function (page, json) {
    var _pageStep = json.basic.pageStep;
    var _start = (page - 1) * _pageStep;
    var _end = (_start + _pageStep) > json.data.length ? json.data.length : (_start + _pageStep);
    var _dataArr = new Array();
    for (var i = _start, j = 0; i < _end; i++, j++) {
        _dataArr[j] = json.data[i];
    }
    return _dataArr;
}, getRecZq: function (id) {
    var _url = "http://imgcache.qq.com/club/item/zhuanqu/json/rec.js";
    var _htmlTpl = "<li><a href=\"http://style.qq.com/zhuanqu/{zq}.html?cid={classId}\"><img src=\"http://imgcache.qq.com/club/item/zhuanqu/rec_jpg/{classId}.jpg\" /></a><p><a href=\"http://style.qq.com/zhuanqu/{zq}.html?cid={classId}\">{name}</a></p></li>";
    var _xhr = new QQVIP.XHR(_url, null, 'GET', null, true, true);
    _xhr.send();
    _xhr.onSuccess = function (json) {
        var callback = function (_d) {
            var _html = "";
            for (var i = 0; i < _d.length; i++) {
                _html += _htmlTpl.replace(/\{zq\}/g, _d[i].zq).replace(/\{classId\}/g, _d[i].classId).replace(/\{name\}/g, _d[i].name);
            }
            $(id).innerHTML = _html;
        };
        eval(json['text']);
    };
}};
QQVIPFS.Item = (function () {
    var _queryDeco = function (id1, id2, id3) {
        try {
            document.domain = "qq.com";
        } catch (e) {
        }
        var _arr = ['cmd=1', 'r=' + Math.random(), 'count=3', 'dec0=' + id1, 'dec1=' + id2, 'dec2=' + id3];
        var _url = 'http://redirect.zb.qq.com/cgi-bin/setdec.fcg?g_tk=' + QQVIP.security.getAntiCSRFToken();
        var _xhr = new QQVIP.XHR(_url, null, 'POST', _arr.join('&'), true, true);
        _xhr.send();
        return _xhr;
    };
    var _query7Deco = function (id7) {
        try {
            document.domain = "qq.com";
        } catch (e) {
        }
        var _arr = ['cmd=2', 'r=' + Math.random(), 'auto_dec=' + id7 + ';'];
        var _url = 'http://redirect.zb.qq.com/cgi-bin/setdec.fcg?g_tk=' + QQVIP.security.getAntiCSRFToken();
        var _xhr = new QQVIP.XHR(_url, null, 'POST', _arr.join('&'), true, true);
        _xhr.send();
        return _xhr;
    };
    var _queryFace = function (id, type, size) {
        try {
            document.domain = "qq.com";
        } catch (e) {
        }
        var _url = 'http://face.qq.com/client/webface.php';
        var token = QQVIP.security.getAntiCSRFToken();
        var _cmd = (type % 2 == 0) ? 'set_static_face' : 'set_dynamic_face';
        var _arr = ['item_id=' + id, 'size=' + size, 'cmd=' + _cmd, 'g_tk=' + token];
        var _xhr = new QQVIP.XHR(_url, null, 'POST', _arr.join('&'), true, true);
        _xhr.send();
        return _xhr;
    };
    var _queryThemeFace = function (themeId) {
        try {
            document.domain = "qq.com";
        } catch (e) {
        }
        var _url = 'http://face.qq.com/client/webface.php';
        var _cmd = 'set_autoface_theme';
        var token = QQVIP.security.getAntiCSRFToken();
        var _arr = ['theme_id=' + themeId, 'cmd=' + _cmd, 'g_tk=' + token];
        var _xhr = new QQVIP.XHR(_url, null, 'POST', _arr.join('&'), true, true);
        _xhr.send();
        return _xhr;
    };
    var _setDeco = function (id1, id2, id3, params, onlyType) {
        params = params || {};
        params.aid = params.aid || '';
        params.adtag = params.adtag || '';
        params.itemName = params.itemName || '';
        params.showDialogWay = params.showDialogWay || '';
        params.hottag = params.hottag || '';
        params.from = params.from || '';
        params.fee = params.fee || '';
        params.mainFrom = params.mainFrom || 0;
        params.subFrom = params.subFrom || 0;
        params.subFrom2 = params.subFrom2 || 0;
        var _fee_map = {free: '<span class="red">该套皮肤可以免费对好友展示。开通QQ会员，全场皮肤让好友看见！更有7天自动换皮肤特权！</span>', moon: '<span class="red">您享有QQ等级特权，该套皮肤可以免费对好友展示。开通QQ会员，全场皮肤让好友看见！更有7天自动换皮肤特权！</span>', sun: '<span class="red">您享有QQ等级特权，该套皮肤可以免费对好友展示。开通QQ会员，全场皮肤让好友看见！更有7天自动换皮肤特权！</span>', vip: '<span class="red">开通QQ会员，设置的皮肤可让好友与您聊天的时候看见！更有7天自动换皮肤特权！</span>'};
        var _info = {setsucc: {"type": "success", "brief": "QQ皮肤" + (params.itemName) + "设置成功！<br />(如果您设置了七天自动换皮肤，自动换皮肤将失效)", "detail": '您可以使用<a href="http:\/\/im.qq.com" target="_blank">最新版QQ<\/a>，重新登录QQ客户端查看QQ皮肤效果。</span>', "openvip": ''}, notvip: {"type": "alert", "brief": "对不起！您还不是会员，不能使用会员专用皮肤。", "detail": "开通QQ会员全场皮肤任意使用！", "openvip": '<a class="mod_vip_em" href="http:\/\/pay.qq.com\/qqvip\/?aid=' + (params.aid) + '&ADTAG=' + (params.adtag) + '"  target="_blank">开通会员<\/a>'}, setfail: {"type": "alert", "brief": "对不起！设置失败。", "detail": "请您稍候再试试看。", "openvip": ''}, low_qqlevel: {"type": "alert", "brief": "对不起！设置失败。", "detail": "", "openvip": ''}};
        try {
            document.domain = "qq.com";
        } catch (e) {
        }
        if (!QQVIPFS.Utils.checkCookie()) {
            if (params.showDialogWay == 'iframe') {
                return top.openLogin();
            } else if (typeof(styleLogin) == 'function') {
                return styleLogin('zhuangban.dec_sort', {callback: function () {
                    QQVIPFS.Utils.showUserTips('zhuangban.dec_sort');
                    QQVIPFS.Item.setDeco(id1, id2, id3, params, onlyType);
                }});
            } else {
                return openLogin();
            }
        }
        if (onlyType) {
            var jsonp = new QQVIP.JSONGetter('http://function.qq.com/common/getviptype.php', 'GetVipType', {level: onlyType, g_tk: QQVIP.security.getAntiCSRFToken()});
            jsonp.onSuccess = function (json) {
                if (json && json.retCode == 0 && json.retData) {
                    if (json.retData.result) {
                        QQVIPFS.Item.setDeco(id1, id2, id3, params, 0);
                    } else if (onlyType >= 9999) {
                        QQVIPFS.Utils.showDialog({"type": "alert", "brief": "对不起！这是豪华版会员专属QQ皮肤。", "detail": '开通豪华版会员可以免费设置，同时尊享豪华版会员更多特权。', "openvip": '<a class="mod_vip_em" href="http:\/\/pay.qq.com\/qqvip\/?aid=vip.gongneng.subsite.zhuangban.zhuanshu_haohua_vip"  target="_blank">开通会员<\/a>'});
                    } else if (onlyType >= 365) {
                        QQVIPFS.Utils.showDialog({"type": "alert", "brief": "对不起！这是年费会员专属QQ皮肤。", "detail": '开通年费会员可以免费设置，同时尊享年费会员更多特权。', "openvip": '<a class="mod_vip_em" href="http:\/\/pay.qq.com\/qqvip\/?aid=vip.gongneng.subsite.zhuangban.zhuanshu_year_vip"  target="_blank">开通会员<\/a>'});
                    } else if (onlyType > 1) {
                        QQVIPFS.Utils.showDialog({"type": "alert", "brief": "", "detail": '对不起！您还不是' + onlyType + '级会员，不能使用' + onlyType + '级会员专属特权！', "openvip": '<a class="mod_vip_em" href="http:\/\/pay.qq.com\/qqvip\/?aid=vip.gongneng.subsite.zhuangban.zhuanshu_level_vip"  target="_blank">开通会员<\/a>'});
                    } else {
                        QQVIPFS.Utils.showDialog({"type": "alert", "brief": "对不起！这是QQ会员专属QQ皮肤。", "detail": '开通QQ会员可以免费设置，同时尊享会员更多特权。', "openvip": '<a class="mod_vip_em" href="http:\/\/pay.qq.com\/qqvip\/?aid=vip.gongneng.subsite.zhuangban.zhuanshu_vip"  target="_blank">开通会员<\/a>'});
                    }
                } else if (json && json.retCode == -1) {
                    if (params.showDialogWay == 'iframe') {
                        return top.openLogin();
                    } else if (typeof(styleLogin) == 'function') {
                        return styleLogin('zhuangban.dec_sort', {callback: function () {
                            QQVIPFS.Utils.showUserTips('zhuangban.dec_sort');
                            QQVIPFS.Item.setDeco(id1, id2, id3, params, onlyType);
                        }});
                    } else {
                        return openLogin();
                    }
                } else {
                    QQVIPFS.Utils.showDialog({"type": "alert", "brief": "", "detail": '系统繁忙，请稍后再试！', "openvip": ''});
                }
            };
            jsonp.onError = jsonp.onTimeout = function () {
                QQVIPFS.Utils.showDialog({"type": "alert", "brief": "", "detail": '系统繁忙，请稍后再试！', "openvip": ''});
            };
            jsonp.send();
            return;
        }
        var _getWeiboArr = function (id) {
            var _imgDeco = 'http://imgcache.qq.com/club/item/decorate/res/static/{MOD}/{ID}/{ID}_eff.png';
            var _img = _imgDeco.replace(/\{MOD\}/, id % 10).replace(/\{ID\}/g, id);
            var _cont = "【QQ风尚】我使用了QQ皮肤，你们觉得我的聊天窗口如何？";
            return{"content": encodeURIComponent(_cont), "pic": encodeURIComponent(_img), "surl": encodeURIComponent("http://style.qq.com/decorate/"), "pref": 'internal.style.qq.qqskin.share'};
        };
        var _weiboArrInfo = _getWeiboArr(id1);
        var _weiboTpl = "<a href=\"javascript:void(0);\" onclick=\"QQVIPFS.Utils.showWeibo('{content}','{pic}','{surl}','{pref}','{height}');$('tips_window').style.display='none';QQVIPFS.Utils.pvClickSend('ISD.QQVIP.STYLE.QQSKIN_" + params.from + ".WEIBO');return false;\" class=\"btn_fit_pop\"><span class=\"btn_weibo\">分享到微博</span></a>";
        var height = 0;
        if (params.from == 'appbox') {
            height = 80;
        }
        var _weiboInfo = _weiboTpl.replace(/\{content\}/g, _weiboArrInfo.content).replace(/\{pic\}/g, _weiboArrInfo.pic).replace(/\{surl\}/g, _weiboArrInfo.surl).replace(/\{pref\}/g, _weiboArrInfo.pref).replace(/\{height\}/g, height);
        _info["setsucc"].weibo = _weiboInfo;
        var _jsDeco = _queryDeco(id1, id2, id3);
        _jsDeco.onSuccess = function (json) {
            QQVIPFS.Utils.cacheHotNum[id1] = parseInt(QQVIPFS.Utils.cacheHotNum[id1]) + 1;
            var _tj2 = (function () {
                var _userInfo = QQVIP.dataCenter.get('nr_userInfo');
                var _level = -1;
                if (!_userInfo) {
                    _userInfo = QQVIP.dataCenter.get('appbox_userInfo');
                    if (_userInfo) {
                        _level = _userInfo.level;
                    }
                }
                else {
                    _level = _userInfo.clublevel;
                }
                var _d = {serviceId: QQVIPFS.ServiceId.SKIN, operate: 'set', itemId: id1, result: 0, mainFrom: params.mainFrom, subFrom: params.subFrom, subFrom2: params.subFrom2, level: _level};
                QQVIPFS.Utils.tj2LogSend(_d);
                (new Image()).src = 'http://brandcgi.vip.qq.com/vipworth/index.php/report?type=skin';
            })();
            var callback = function (_d) {
                if ('try_login' == _d.rc) {
                    if (params.showDialogWay == 'iframe') {
                        return top.openLogin();
                    } else {
                        return openLogin();
                    }
                }
                if (_info[_d.rc]) {
                    var _userInfo = QQVIP.dataCenter.get('nr_userInfo');
                    var isClub = 0;
                    if (!_userInfo) {
                        _userInfo = QQVIP.dataCenter.get('appbox_userInfo');
                        if (!_userInfo) {
                            isClub = top.loginUserInfo.is_club;
                        } else {
                            isClub = _userInfo.is_club;
                        }
                    }
                    else {
                        isClub = _userInfo.isclub;
                    }
                    if (params.showDialogWay == 'iframe') {
                        if (_d.rc == 'low_qqlevel') {
                            _info[_d.rc].brief = '您的QQ等级还没达到要求，暂不能使用该皮肤。';
                            _info[_d.rc].openvip = '<a class="mod_vip_em" href="http:\/\/pay.qq.com\/qqvip\/?aid=' + (params.aid) + '&ADTAG=' + (params.adtag) + '"  target="_blank">开通会员<\/a>';
                            _info[_d.rc].detail += '<span class="red">开通QQ会员，全场皮肤任意使用，更可尊享皮肤好友可见特权！</span>';
                        } else if (_d.rc == "notvip") {
                            _info[_d.rc].openvip = '<a class="mod_vip_em" href="http:\/\/pay.qq.com\/qqvip\/?aid=' + (params.aid) + '&ADTAG=' + (params.adtag) + '"  target="_blank">开通会员<\/a>';
                        } else if (_d.rc == "setsucc") {
                            try {
                                QQVIPFS.Utils.pvClickSend(params.hottag);
                            } catch (e) {
                            }
                            if (id1 == 1) {
                                _info[_d.rc].brief = '恢复默认皮肤成功！';
                                _info[_d.rc].detail = '';
                            } else {
                                if (isClub == 0) {
                                    _info[_d.rc].openvip = '<a class="mod_vip_em" href="http:\/\/pay.qq.com\/qqvip\/?aid=' + (params.aid) + '&ADTAG=' + (params.adtag) + '"  target="_blank">开通会员<\/a>';
                                    if (params.from == 'appbox') {
                                        _info[_d.rc].detail = '<span class="red">开通QQ会员，设置的皮肤可让好友与您聊天的时候看见！</span>';
                                    } else {
                                        _info[_d.rc].detail += '<br/><span class="red">开通QQ会员，设置的皮肤可让好友与您聊天的时候看见！</span>';
                                    }
                                }
                                else {
                                    if (params.from == 'appbox') {
                                        _info[_d.rc].detail = '<span class="red">您是尊贵的QQ会员，设置的皮肤可让好友在与您聊天时看见！</span>';
                                    } else {
                                        _info[_d.rc].detail += '<br/><span class="red">您是尊贵的QQ会员，设置的皮肤可让好友在与您聊天时看见！</span>';
                                    }
                                }
                            }
                        }
                        top.dialog.show(_info[_d.rc]);
                    } else {
                        if (_d.rc == 'low_qqlevel') {
                            _info[_d.rc].brief = '您的QQ等级还没达到要求，暂不能使用该皮肤。';
                            _info[_d.rc].openvip = '<a class="mod_vip_em" href="http:\/\/pay.qq.com\/qqvip\/?aid=' + (params.aid) + '&ADTAG=' + (params.adtag) + '"  target="_blank">开通会员<\/a>';
                            if (params.from == 'appbox') {
                                _info[_d.rc].openvip = '<a class="mod_vip_em" href="javascript:client_goto_web(\'http:\/\/pay.qq.com\/qqvip\/?aid=' + (params.aid) + '&ADTAG=' + (params.adtag) + '\',1);">开通会员<\/a>';
                            }
                            _info[_d.rc].detail += '<span class="red">开通QQ会员，全场皮肤任意使用，更可尊享皮肤好友可见特权！</span>';
                        }
                        else {
                            if (id1 == 1) {
                                _info[_d.rc].brief = '恢复默认皮肤成功！';
                                _info[_d.rc].detail = '';
                            } else {
                                if (isClub == 0) {
                                    _info[_d.rc].brief = 'QQ皮肤设置成功！';
                                    _info[_d.rc].openvip = '<a class="mod_vip_em" href="http:\/\/pay.qq.com\/qqvip\/?aid=' + (params.aid) + '&ADTAG=' + (params.adtag) + '"  target="_blank">开通会员<\/a>';
                                    if (params.from == 'appbox') {
                                        _info[_d.rc].detail = _fee_map[params.fee];
                                        _info[_d.rc].openvip = '<a class="mod_vip_em" href="javascript:client_goto_web(\'http:\/\/pay.qq.com\/qqvip\/?aid=' + (params.aid) + '&ADTAG=' + (params.adtag) + '\',1);">开通会员<\/a>';
                                    } else {
                                        _info[_d.rc].detail += '<br/><span class="red">开通QQ会员，设置的皮肤可让好友与您聊天的时候看见！</span>';
                                    }
                                }
                                else {
                                    if (params.from == 'appbox') {
                                        _info[_d.rc].detail = '<span class="red">您是尊贵的QQ会员，设置的皮肤可让好友在与您聊天时看见！</span>';
                                    } else {
                                        _info[_d.rc].detail += '<br/><span class="red">您是尊贵的QQ会员，设置的皮肤可让好友在与您聊天时看见！</span>';
                                    }
                                }
                            }
                        }
                        QQVIPFS.Utils.showDialog(_info[_d.rc]);
                    }
                } else {
                    if (params.showDialogWay == 'iframe') {
                        top.dialog.show(_info["setfail"]);
                    } else {
                        QQVIPFS.Utils.showDialog(_info["setfail"]);
                    }
                }
            };
            eval(json['text']);
        };
    };
    var _setAutoDeco = function (id7, params) {
        params = params || {};
        params.aid = params.aid || '';
        params.adtag = params.adtag || '';
        params.itemName = params.itemName || '';
        params.from = params.from || '';
        params.mainFrom = params.mainFrom || 0;
        params.subFrom = params.subFrom || 0;
        params.subFrom2 = params.subFrom2 || 0;
        var _getWeekDay = function () {
            var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            return weekday[new Date().getDay()];
        };
        var _info = {setsucc: {"type": "success", "brief": '设置成功！', "detail": '设置自动换肤后，皮肤每天更换！<br />若再次设置单个皮肤，自动换肤功能将停止。<br />您可以使用<a href="http:\/\/im.qq.com" target="_blank">最新版QQ<\/a>，重新登录QQ客户端查看QQ皮肤效果。', "openvip": ''}, notvip: {"type": "alert", "brief": "您的免费使用资格已经使用完毕。", "detail": "开通会员可以免费设置，同时尊享会员更多特权。", "openvip": '<a class="mod_vip_em" href="http:\/\/pay.qq.com\/qqvip\/?aid=' + (params.aid) + '&ADTAG=' + (params.adtag) + '"  target="_blank">开通会员<\/a>'}, setfail: {"type": "alert", "brief": "对不起！设置失败。", "detail": "请您稍候再试试看。", "openvip": ''}};
        try {
            document.domain = "qq.com";
        } catch (e) {
        }
        if (!Nr.checkCookie()) {
            return styleLogin('auto_sort', {callback: function () {
                QQVIPFS.Utils.showUserTips('auto_sort');
                _setAutoDeco(id7, params);
            }});
        }
        var _jsDeco = _query7Deco(id7);
        _jsDeco.onSuccess = function (json) {
            var _tj2 = function (_result) {
                var _userInfo = QQVIP.dataCenter.get('nr_userInfo');
                var _level = -1;
                if (_userInfo) {
                    _level = _userInfo.clublevel;
                }
                var _d = {serviceId: QQVIPFS.ServiceId.SKIN, operate: 'auto_set', itemId: 0, result: _result, mainFrom: params.mainFrom, subFrom: params.subFrom, subFrom2: params.subFrom2, level: _level};
                QQVIPFS.Utils.tj2LogSend(_d);
                (new Image()).src = 'http://brandcgi.vip.qq.com/vipworth/index.php/report?type=skin';
            };
            var callback = function (_d) {
                if ('try_login' == _d.rc) {
                    return openLogin();
                }
                if (_info[_d.rc]) {
                    var _userInfo = QQVIP.dataCenter.get('nr_userInfo');
                    var isClub = 0;
                    if (!_userInfo) {
                        _userInfo = QQVIP.dataCenter.get('appbox_userInfo');
                        isClub = _userInfo.is_club;
                    }
                    else {
                        isClub = _userInfo.isclub;
                    }
                    if (isClub == 1) {
                        _info[_d.rc].detail += '<br/><span class="red">您是尊贵的QQ会员，设置的皮肤可让好友在与您聊天时看见！</span>';
                    } else if (parseInt(_d.ts, 10)) {
                        _info[_d.rc].detail = '您已经获得了免费试用7天皮肤套装功能的资格。有效期为' + QQVIP.string.timeFormatString(parseInt(_d.ts, 10) * 1000, '{Y}年{M}月{d}日') + '。有效期过后，皮肤将不能自动更换。<br /><a href="http://pay.qq.com/qqvip/index.shtml?aid=vip.gongneng.subsite.zhuangban.auto_sort.prompt" target="_blank">开通会员</a>全场皮肤免费设置，永久有效！<br />' + _info[_d.rc].detail;
                    }
                    QQVIPFS.Utils.showDialog(_info[_d.rc]);
                    if (_d.rc == 'setsucc') {
                        _tj2(0);
                    }
                    else if (_d.rc != 'notvip') {
                        _tj2(1);
                    }
                }
            };
            eval(json['text']);
        };
    };
    var _setFace = function (id, type, size, params) {
        params = params || {};
        params.aid = params.aid || '';
        params.adtag = params.adtag || '';
        params.itemName = params.itemName || '';
        params.showDialogWay = params.showDialogWay || '';
        params.hottag = params.hottag || '';
        params.from = params.from || '';
        params.mainFrom = params.mainFrom || 0;
        params.subFrom = params.subFrom || 0;
        params.subFrom2 = params.subFrom2 || 0;
        params.callback = params.callback || '';
        var _info = {0: {"type": "success", "brief": "QQ头像" + (params.itemName) + "设置成功！<br />(如果您设置了七天自动换头像，自动换头像将失效)", "detail": '请查看您的QQ客户端头像，动态头像需要QQ2008正式版及其以上版本才能展现动态效果。<a href="http:\/\/im.qq.com" target="_blank">请下载最新版QQ<\/a>', "openvip": ''}, 1000: {"type": "alert", "brief": "参数错误，请刷新页面重试！", "detail": '', "openvip": ''}, 1002: {"type": "alert", "brief": "对不起！您还不是会员，不能设置动态头像。", "detail": "开通QQ会员全场头像任意使用！", "openvip": '<a class="mod_vip_em" href="http:\/\/pay.qq.com\/qqvip\/?aid=' + (params.aid) + '&ADTAG=' + (params.adtag) + '" target="_blank">开通会员<\/a>'}, 1020: {"type": "alert", "brief": "您更换头像过于频繁，请稍候再操作！", "detail": '', "openvip": ''}, setfail: {"type": "alert", "brief": "对不起！设置失败。", "detail": "请您稍候再试试看。", "openvip": ''}};
        try {
            document.domain = "qq.com";
        } catch (e) {
        }
        if (!QQVIPFS.Utils.checkCookie()) {
            if (params.showDialogWay == 'iframe') {
                return top.openLogin();
            } else {
                return openLogin();
            }
        }
        var _getWeiboArr = function (faceId, type, size) {
            var _faceUrl = 'http://imgcache.qq.com/club/item/face/img/{MOD}/{ID}.';
            var _id = (1 == size) ? [faceId, '_100'].join('') : faceId;
            var _img = _faceUrl.replace(/\{MOD\}/, faceId % 10).replace(/\{ID\}/, _id);
            var _imgType = (type % 2 == 1) ? 'gif' : (1 == size ? 'png' : 'bmp');
            _img += _imgType;
            var _cont = "【QQ风尚】刚刚更换了QQ头像，个性亮相从“头”开始！";
            return{"content": encodeURIComponent(_cont), "pic": encodeURIComponent(_img), "surl": encodeURIComponent("http://style.qq.com/face/"), "pref": 'internal.style.qq.face.share'};
        };
        var _weiboArrInfo = _getWeiboArr(id, type, size);
        var _weiboTpl = "<a href=\"javascript:void(0);\" onclick=\"QQVIPFS.Utils.showWeibo('{content}','{pic}','{surl}','{pref}','{height}');$('tips_window').style.display='none';QQVIPFS.Utils.pvClickSend('ISD.QQVIP.STYLE.FACE_" + params.from + ".WEIBO');return false;\" class=\"btn_fit_pop\"><span class=\"btn_weibo\">分享到微博</span></a>";
        var height = 0;
        if (params.from == 'appbox') {
            height = 80;
        }
        var _weiboInfo = _weiboTpl.replace(/\{content\}/g, _weiboArrInfo.content).replace(/\{pic\}/g, _weiboArrInfo.pic).replace(/\{surl\}/g, _weiboArrInfo.surl).replace(/\{pref\}/g, _weiboArrInfo.pref).replace(/\{height\}/g, height);
        _info[0].weibo = _weiboInfo;
        var _jsFace = _queryFace(id, type, size);
        _jsFace.onSuccess = function (json) {
            var _tj2 = function (_result) {
                var _userInfo = QQVIP.dataCenter.get('nr_userInfo');
                var _level = -1;
                if (!_userInfo) {
                    _userInfo = QQVIP.dataCenter.get('appbox_userInfo');
                    if (_userInfo) {
                        _level = _userInfo.level;
                    }
                }
                else {
                    _level = _userInfo.clublevel;
                }
                var _d = {serviceId: QQVIPFS.ServiceId.FACE, operate: 'set', itemId: id, result: _result, mainFrom: params.mainFrom, subFrom: params.subFrom, subFrom2: params.subFrom2, level: _level};
                QQVIPFS.Utils.tj2LogSend(_d);
                if (type == 1) {
                    (new Image()).src = 'http://brandcgi.vip.qq.com/vipworth/index.php/report?type=face';
                }
            };
            var callback = function (json) {
                if (1001 == json.result) {
                    if (params.showDialogWay == 'iframe') {
                        return top.openLogin();
                    } else {
                        return openLogin();
                    }
                }
                if (json.result == 1) {
                    json.result = 0;
                }
                if (json.result == 0 || json.result != 1002) {
                    _tj2(json.result);
                }
                if (_info[json.result]) {
                    if (params.showDialogWay == 'iframe') {
                        if (json.result == 1002) {
                            _info[json.result].openvip = "<a class=\"bt_quick_join\" href=\"http://pay.qq.com/qqvip/?aid=" + params.aid + "&ADTAG=" + params.adtag + "\" target=\"_blank\" aid=\"" + params.aid + "\"><span class=\"dis\">开通会员</span></a>";
                        } else if (json.result == 0) {
                            try {
                                QQVIPFS.Utils.pvClickSend(params.hottag);
                            } catch (e) {
                            }
                        }
                        top.dialog.show(_info[json.result]);
                    } else {
                        if (json.result == 1002 && params.from == 'appbox') {
                            _info[json.result].openvip = '<a class="mod_vip_em" href="javascript:client_goto_web(\'http:\/\/pay.qq.com\/qqvip\/?aid=' + (params.aid) + '&ADTAG=' + (params.adtag) + '\',1);">开通会员<\/a>';
                        }
                        QQVIPFS.Utils.showDialog(_info[json.result]);
                        if (json.result == 0 && params.callback != '') {
                            params.callback(id, type);
                        }
                    }
                } else {
                    if (params.showDialogWay == 'iframe') {
                        top.dialog.show(_info["setfail"]);
                    } else {
                        QQVIPFS.Utils.showDialog(_info["setfail"]);
                    }
                }
            };
            eval(json['text']);
        };
    };
    var _setFaceTheme = function (themeId, params) {
        params = params || {};
        params.aid = params.aid || '';
        params.adtag = params.adtag || '';
        params.itemName = params.itemName || '';
        params.showDialogWay = params.showDialogWay || '';
        params.hottag = params.hottag || '';
        params.from = params.from || '';
        params.mainFrom = params.mainFrom || 0;
        params.subFrom = params.subFrom || 0;
        params.subFrom2 = params.subFrom2 || 0;
        var _info = {0: {"type": "success", "brief": "QQ头像7天套装设置成功！", "detail": '请查看您的QQ客户端头像，动态头像需要QQ2008正式版及其以上版本才能展现动态效果。<a href="http:\/\/im.qq.com" target="_blank">请下载最新版QQ<\/a>', "openvip": ''}, 1000: {"type": "alert", "brief": "参数错误，请刷新页面重试！", "detail": '', "openvip": ''}, 1002: {"type": "alert", "brief": "对不起！您还不是QQ会员，不能使用会员特权功能！", "detail": "开通QQ会员全场头像任意使用！", "openvip": '<a class="mod_vip_em" href="http:\/\/pay.qq.com\/qqvip\/?aid=' + (params.aid) + '&ADTAG=' + (params.adtag) + '" target="_blank">开通会员<\/a>'}, 1020: {"type": "alert", "brief": "您更换头像过于频繁，请稍候再操作！", "detail": '', "openvip": ''}, setfail: {"type": "alert", "brief": "对不起！设置失败。", "detail": "请您稍候再试试看。", "openvip": ''}};
        try {
            document.domain = "qq.com";
        } catch (e) {
        }
        if (!QQVIPFS.Utils.checkCookie()) {
            if (params.showDialogWay == 'iframe') {
                return top.openLogin();
            } else {
                return openLogin();
            }
        }
        var _faceThemeXhr = _queryThemeFace(themeId);
        _faceThemeXhr.onSuccess = function (json) {
            var _tj2 = (function () {
                var _userInfo = QQVIP.dataCenter.get('nr_userInfo');
                var _level = -1;
                if (_userInfo) {
                    _level = _userInfo.clublevel;
                }
                var _d = {serviceId: QQVIPFS.ServiceId.FACE, operate: 'auto_set', itemId: themeId, result: 0, mainFrom: params.mainFrom, subFrom: params.subFrom, subFrom2: params.subFrom2, level: _level};
                QQVIPFS.Utils.tj2LogSend(_d);
                (new Image()).src = 'http://brandcgi.vip.qq.com/vipworth/index.php/report?type=face';
            })();
            var callback = function (json) {
                if (1001 == json.result) {
                    if (params.showDialogWay == 'iframe') {
                        return top.openLogin();
                    } else {
                        return openLogin();
                    }
                }
                if (_info[json.result]) {
                    if (params.showDialogWay == 'iframe') {
                        if (json.result == 1002) {
                            _info[json.result].openvip = "<a class=\"bt_quick_join\" href=\"http://pay.qq.com/qqvip/?aid=" + params.aid + "&ADTAG=" + params.adtag + "\" target=\"_blank\"><span class=\"dis\">开通会员</span></a>";
                        } else if (json.result == 0) {
                            try {
                                QQVIPFS.Utils.pvClickSend(params.hottag);
                            } catch (e) {
                            }
                        }
                        top.dialog.show(_info[json.result]);
                    } else {
                        QQVIPFS.Utils.showDialog(_info[json.result]);
                    }
                } else {
                    if (params.showDialogWay == 'iframe') {
                        top.dialog.show(_info["setfail"]);
                    } else {
                        QQVIPFS.Utils.showDialog(_info["setfail"]);
                    }
                }
            };
            eval(json['text']);
        };
        _faceThemeXhr.onError = function () {
            QQVIPFS.Utils.showDialog(_commonInfo["setfail"]);
        };
        _faceThemeXhr.onTimeout = function () {
            QQVIPFS.Utils.showDialog(_commonInfo["setfail"]);
        };
        _faceThemeXhr.send();
    };
    var _setWeibo = function (id, params) {
        params = params || {};
        params.aid = params.aid || '';
        params.adtag = params.adtag || '';
        params.showDialogWay = params.showDialogWay || '';
        params.from = params.from || '';
        params.mainFrom = params.mainFrom || 0;
        params.subFrom = params.subFrom || 0;
        params.subFrom2 = params.subFrom2 || 0;
        document.domain = "qq.com";
        if (!QQVIPFS.Utils.checkCookie()) {
            if (params.showDialogWay == 'iframe') {
                return top.openLogin();
            } else {
                return openLogin();
            }
        }
        var SETOK = 0;
        var UNREGISTER = -2;
        var SYSBUSY = -3;
        var _info = {"0": {"type": "success", "brief": "设置成功！", "detail": '您可以<a href="http:\/\/t.qq.com" target="_blank">打开自己的微博</a>查看效果!<br>', "openvip": ''}, "-2": {"type": "alert", "brief": "设置失败(您尚未开通微博)", "detail": '您可以<a href="http:\/\/t.qq.com" target="_blank">点击这里</a>开通微博', "openvip": ''}, "-3": {"type": "alert", "brief": "系统繁忙!", "detail": '您可以稍后再试。', "openvip": ''}, "setfail": {"type": "alert", "brief": "设置失败<br />", "detail": "操作失败,请您稍后重试", "openvip": ''}};
        var _arr = ['op=2', 'r=' + Math.random(), 'id=' + id];
        var _url = 'http://t.qq.com/asyn/theme_save.php';
        var _xhr = new QQVIP.XHR(_url, null, 'POST', _arr.join('&'), true, true);
        _xhr.charset = 'UTF-8';
        _xhr.send();
        _xhr.onSuccess = function (json) {
            var _tj2 = (function () {
                var _userInfo = QQVIP.dataCenter.get('nr_userInfo');
                var _level = -1;
                if (_userInfo) {
                    _level = _userInfo.clublevel;
                }
                var _d = {serviceId: QQVIPFS.ServiceId.WEIBO, operate: 'set', itemId: id, result: 0, mainFrom: params.mainFrom, subFrom: params.subFrom, subFrom2: params.subFrom2, level: _level};
                QQVIPFS.Utils.tj2LogSend(_d);
            })();
            var _str = json["text"];
            var _obj = eval('(' + _str + ')');
            var _msg = [_obj.result, _obj.msg].join("|");
            if (_obj.result == -1) {
                if (params.showDialogWay == 'iframe') {
                    return top.openLogin();
                } else {
                    return openLogin();
                }
            }
            if (_info[_obj.result]) {
                if (params.showDialogWay == 'iframe') {
                    top.dialog.show(_info[_obj.result]);
                } else {
                    QQVIPFS.Utils.showDialog(_info[_obj.result]);
                }
            } else {
                if (params.showDialogWay == 'iframe') {
                    top.dialog.show(_info["setfail"]);
                } else {
                    QQVIPFS.Utils.showDialog(_info[_obj.result]);
                }
            }
        };
    };
    var _ddWallpic = function (obj, id, isCal, params) {
        params = params || {};
        params.from = params.from || '';
        params.isDyn = params.isDyn || 0;
        var _url = 'http://style.qq.com/bizhi/detail.html?type=all&typeid=0&id={1}&cal={2}';
        if (params.isDyn == 1) {
            _url = 'http://style.qq.com/bizhi/dyndetail.html?type=class&typeid=72&id={1}&cal={2}';
        }
        obj.href = _url.replace(/\{(\w+)\}/g, function (_0, _1) {
            var _map = {'{1}': id, '{2}': isCal};
            return _map[_0];
        });
        obj.target = '_blank';
    };
    var _ddWallpicItem = function (obj, id, isCal, params) {
        params = params || {};
        params.from = params.from || '';
        var _url = 'http://imgcache.qq.com/club/item/wallpic/items/{1}/{2}/{3}';
        var _Screen = function (cache) {
            var _CACHE = cache;
            this.getSize = function () {
                return[window.screen.width, window.screen.height];
            };
            this.getSuitableSize = function () {
                var realSize = this.getSize();
                var minSize = Number.MAX_VALUE, minIndex;
                var tempSize;
                var i;
                for (i = 0; i < _CACHE.length; i++) {
                    tempSize = Math.max((realSize[0] - _CACHE[i][0]) / realSize[0], (realSize[1] - _CACHE[i][1]) / realSize[1]);
                    if (minSize > tempSize) {
                        minSize = tempSize;
                        minIndex = i;
                    }
                    if (minSize <= 0) {
                        break;
                    }
                }
                return _CACHE[minIndex];
            };
        };
        var _screen = new _Screen([
            [800, 600],
            [1024, 768],
            [1280, 800],
            [1280, 1024],
            [1366, 768],
            [1440, 900],
            [1600, 1200],
            [1680, 1050]
        ]);
        var _rs = _screen.getSuitableSize().join('_');
        var _name = [_rs, '_', id, '.jpg'].join('');
        obj.href = _url.replace(/\{(\w+)\}/g, function (_0, _1) {
            var _map = {'{1}': id % 10, '{2}': id, '{3}': (isCal == 1) ? 'c_' + _name : _name};
            return _map[_0];
        });
        obj.target = '_blank';
    };
    var _tt_suit = null;
    var _setSuit = function (id, params) {
        params = params || {};
        params.aid = params.aid || '';
        params.adtag = params.adtag || '';
        params.szDeco = params.szDeco || '0|0|0';
        params.szFace = params.szFace || '0|0|0';
        params.showDialogWay = params.showDialogWay || '';
        params.hottag = params.hottag || '';
        params.from = params.from || '';
        params.mainFrom = params.mainFrom || 0;
        params.subFrom = params.subFrom || 0;
        params.subFrom2 = params.subFrom2 || 0;
        _tt_suit && clearInterval(_tt_suit);
        var _updateNum = 0;
        var _status = {'face': null, 'deco': null};
        var _arrFace = String(params.szFace).split('|');
        var _arrDeco = String(params.szDeco).split('|');
        var _info = {setsuc: {"type": "success", "brief": "套装（QQ头像、QQ皮肤）设置成功！", "detail": '您可以使用<a href="http://im.qq.com/" target="_blank">最新版QQ</a>，实时查看QQ头像和皮肤效果；<br />若您使用老版本QQ，请您重新登录后查看皮肤效果。', "openvip": ''}, setfacesuc: {"type": "alert", "brief": "套装包括：QQ头像和QQ皮肤，其中：<br />QQ头像设置成功，QQ皮肤设置失败！", "detail": "请您再次设置一下套装！", "openvip": ''}, setdecosuc: {"type": "alert", "brief": "套装包括：QQ头像和QQ皮肤，其中：<br />QQ皮肤设置成功，QQ头像设置失败！", "detail": "请您再次设置一下套装！", "openvip": ''}, notvip: {"type": "alert", "brief": "对不起！您还不是会员，不能设置套装。", "detail": "开通QQ会员全场套装任意使用！", "openvip": '<a class="mod_vip_em" href="http:\/\/pay.qq.com\/qqvip\/?aid=' + (params.aid) + '&ADTAG=' + (params.adtag) + '" target="_blank">开通会员<\/a>'}, setfail: {"type": "alert", "brief": "对不起！设置失败。", "detail": "请您稍候再试试看。", "openvip": ''}};
        try {
            document.domain = "qq.com";
        } catch (e) {
        }
        if (!QQVIPFS.Utils.checkCookie()) {
            if (params.showDialogWay == 'iframe') {
                return top.openLogin();
            } else {
                return openLogin();
            }
        }
        var _userInfo = QQVIP.dataCenter.get('nr_userInfo');
        var _jsDeco = _queryDeco(_arrDeco[0], _arrDeco[1], _arrDeco[2]);
        _jsDeco.onSuccess = function (json) {
            var callback = function (_d) {
                _status.deco = _d.rc;
            };
            eval(json['text']);
        };
        var _jsFace = _queryFace(_arrFace[0], _arrFace[1], _arrFace[2]);
        _jsFace.onSuccess = function (json) {
            var callback = function (_d) {
                _status.face = (_d.result == 1) ? 0 : _d.result;
            };
            eval(json['text']);
        };
        var _tj2 = function (_ret, _msg) {
            _msg = _msg || '';
            var _level = -1;
            if (params.showDialogWay == 'iframe') {
                _level = -1;
            }
            else if (params.from == 'appbox') {
                _appbox_userInfo = QQVIP.dataCenter.get('appbox_userInfo');
                _level = _appbox_userInfo.level;
            }
            else {
                var _userInfo = QQVIP.dataCenter.get('nr_userInfo');
                if (_userInfo) {
                    _level = _userInfo.clublevel;
                }
            }
            var _d = {serviceId: QQVIPFS.ServiceId.SUIT, operate: 'set', itemId: id, result: _ret ? 0 : 1, mainFrom: params.mainFrom, subFrom: params.subFrom, subFrom2: params.subFrom2, level: _level};
            QQVIPFS.Utils.tj2LogSend(_d);
        };
        var _getWeiboArr = function (id) {
            var _imgWeibo = 'http://imgcache.qq.com/club/item/taozhuang/prev/{MOD}/{ID}.jpg';
            var _img = _imgWeibo.replace(/\{MOD\}/, id % 10).replace(/\{ID\}/, id);
            var _cont = "【QQ风尚】我使用了QQ风尚套装（QQ头像+QQ皮肤），完美搭配一键搞定！";
            return{"content": encodeURIComponent(_cont), "pic": encodeURIComponent(_img), "surl": encodeURIComponent("http://style.qq.com/tz/"), "pref": 'internal.style.qq.taozhuang.share'};
        };
        var _weiboArrInfo = _getWeiboArr(id);
        var _weiboTpl = "<a href=\"javascript:void(0);\" onclick=\"QQVIPFS.Utils.showWeibo('{content}','{pic}','{surl}','{pref}');$('tips_window').style.display='none';QQVIPFS.Utils.pvClickSend('ISD.QQVIP.STYLE.TZ.WEIBO');return false;\" class=\"btn_fit_pop\"><span class=\"btn_weibo\">分享到微博</span></a>";
        var _weiboInfo = _weiboTpl.replace(/\{content\}/g, _weiboArrInfo.content).replace(/\{pic\}/g, _weiboArrInfo.pic).replace(/\{surl\}/g, _weiboArrInfo.surl).replace(/\{pref\}/g, _weiboArrInfo.pref);
        _info["setsuc"].weibo = _weiboInfo;
        var _chkStatus = function () {
            _updateNum += 1;
            if (_status.face != null && _status.deco != null) {
                clearInterval(_tt_suit);
                if (_status.face == 1001 || _status.deco == 'try_login') {
                    return openLogin();
                }
                var _msg = [_status.face, _status.deco].join('|');
                if (_status.face == 0 && _status.deco == 'setsucc') {
                    try {
                        QQVIPFS.Utils.pvClickSend(params.hottag);
                    } catch (e) {
                    }
                    if (params.showDialogWay == 'iframe') {
                        top.dialog.show(_info["setsuc"]);
                    } else {
                        QQVIPFS.Utils.showDialog(_info["setsuc"]);
                        QQVIPFS.Utils.cacheHotNum[id] = parseInt(QQVIPFS.Utils.cacheHotNum[id]) + 1;
                    }
                    _tj2(1, _msg);
                } else if (_status.face == 1002 || _status.deco == 'notvip') {
                    if (params.showDialogWay == 'iframe') {
                        _info["notvip"].openvip = "<a class=\"bt_quick_join\" href=\"http://pay.qq.com/qqvip/?aid=" + params.aid + "&ADTAG=" + params.adtag + "\" target=\"_blank\" aid=\"" + params.aid + "\"><span class=\"dis\">开通会员</span></a>";
                        top.dialog.show(_info["notvip"]);
                    } else {
                        if (params.from == 'appbox') {
                            _info["notvip"].openvip = '<a class="mod_vip_em" href="javascript:client_goto_web(\'http:\/\/pay.qq.com\/qqvip\/?aid=' + (params.aid) + '&ADTAG=' + (params.adtag) + '\',1);">开通会员<\/a>';
                        }
                        QQVIPFS.Utils.showDialog(_info["notvip"]);
                    }
                } else if (_status.face != 0 && _status.deco == 'setsucc') {
                    if (params.showDialogWay == 'iframe') {
                        top.dialog.show(_info["setdecosuc"]);
                    } else {
                        QQVIPFS.Utils.showDialog(_info["setdecosuc"]);
                    }
                    _tj2(2, _msg);
                } else if (_status.face == 0 && _status.deco != 'setsucc') {
                    if (params.showDialogWay == 'iframe') {
                        top.dialog.show(_info["setfacesuc"]);
                    } else {
                        QQVIPFS.Utils.showDialog(_info["setfacesuc"]);
                    }
                    _tj2(3, _msg);
                } else {
                    if (params.showDialogWay == 'iframe') {
                        top.dialog.show(_info["setfail"]);
                    } else {
                        QQVIPFS.Utils.showDialog(_info["setfail"]);
                    }
                    _tj2(0, _msg);
                }
            }
            if (_updateNum >= 100) {
                _tt_suit && clearInterval(_tt_suit);
            }
        };
        _tt_suit = setInterval(_chkStatus, 100);
    };
    var _ddPinYinSkin = function (id, params) {
        params = params || {};
        params.from = params.from || '';
        params.mainFrom = params.mainFrom || 0;
        params.subFrom = params.subFrom || 0;
        params.subFrom2 = params.subFrom2 || 0;
        var _info = {setfail: {"type": "alert", "brief": "对不起！在线安装未成功，可能原因：<br />", "detail": "1、未安装QQ输入法或版本过低，<a href=\"http://shurufa.qq.com/\" target=\"_blank\">请下载最新版>></a>；<br />2、浏览器安全级别设置过高；<br />3、屏蔽IE控件等引起。", "openvip": ''}};
        var _url = 'http://dl_dir.qq.com/qqvip/pinyin/{1}/{2}.qpys';
        _url = _url.replace('{1}', id % 10).replace('{2}', id);
        var _tj2 = (function () {
            var _userInfo = QQVIP.dataCenter.get('nr_userInfo');
            var _level = -1;
            if (_userInfo) {
                _level = _userInfo.clublevel;
            }
            var _d = {serviceId: QQVIPFS.ServiceId.PINYIN, operate: 'download', itemId: id, result: 0, mainFrom: params.mainFrom, subFrom: params.subFrom, subFrom2: params.subFrom2, level: _level};
            QQVIPFS.Utils.tj2LogSend(_d);
        })();
        var _pyCheck = QQVIPFS.Utils.checkPinyin();
        if (_pyCheck == 1) {
            window.location.href = ["QQPinyin://skin/?version==578&&skinname==qqvip_pyskin_", id, ".tmpskn&&url==", _url].join('');
        } else if (_pyCheck == 2) {
            window.location.href = _url;
        } else {
            QQVIPFS.Utils.showDialog(_info["setfail"]);
        }
    };
    var _ddBiaoQingPack = function (id, params) {
        params = params || {};
        params.from = params.from || '';
        params.mainFrom = params.mainFrom || 0;
        params.subFrom = params.subFrom || 0;
        params.subFrom2 = params.subFrom2 || 0;
        var _url = 'http://dl_dir.qq.com/qqvip/biaoqing/{1}/{2}.eif';
        _url = _url.replace('{1}', id % 10).replace('{2}', id);
        var _tj2 = (function () {
            var _userInfo = QQVIP.dataCenter.get('nr_userInfo');
            var _level = -1;
            if (_userInfo) {
                _level = _userInfo.clublevel;
            }
            var _d = {serviceId: QQVIPFS.ServiceId.BIAOQING, operate: 'download', itemId: id, result: 0, mainFrom: params.mainFrom, subFrom: params.subFrom, subFrom2: params.subFrom2, level: _level};
            QQVIPFS.Utils.tj2LogSend(_d);
        })();
        var _id = "__ddBiaoQing_IfrId";
        if (!$(_id)) {
            var _ifr = document.createElement('iframe');
            document.body.appendChild(_ifr);
            _ifr.style.display = "none";
            _ifr.id = _id;
        }
        $(_id).src = _url;
        return false;
    };
    var _ddSigBiaoQing = function (id, params) {
        params = params || {};
        params.from = params.from || '';
        params.mainFrom = params.mainFrom || 0;
        params.subFrom = params.subFrom || 0;
        params.subFrom2 = params.subFrom2 || 0;
        var _info = {notIE: {"type": "alert", "brief": "", "detail": '<h4>很抱歉，您所使用的浏览器不支持添加为QQ自定义表情功能，请换IE或TT浏览器试试。</h4>', "openvip": ''}};
        var _url = 'http://imgcache.qq.com/club/item/biaoqing/sig_item/{1}/{2}.gif';
        _url = _url.replace('{1}', id % 10).replace('{2}', id);
        var _tj2 = (function () {
            var _userInfo = null;
            zb.user.getInfoAsync(function (data) {
                _userInfo = data;
            }, false);
            var _level = -1;
            if (_userInfo) {
                _level = _userInfo.levelQQlub;
            }
            var _d = {serviceId: QQVIPFS.ServiceId.SIGBIAOQING, operate: 'install', itemId: id, result: 0, mainFrom: params.mainFrom, subFrom: params.subFrom, subFrom2: params.subFrom2, level: _level};
            QQVIPFS.Utils.tj2LogSend(_d);
        })();
        var bIE = !!window.ActiveXObject;
        if (bIE && _url) {
            var cpAdder = new ActiveXObject("QQCPHelper.CPAdder");
            cpAdder.AddCustomEmotion(_url);
        }
        else {
            QQVIPFS.Utils.showDialog(_info["notIE"]);
        }
        return false;
    };
    var _setRing = function (id, params) {
        params = params || {};
        params.aid = params.aid || '';
        params.adtag = params.adtag || '';
        params.from = params.from || '';
        params.name = params.name || '';
        params.funcType = params.funcType || '';
        params.uin = params.uin || '';
        params.cb = (typeof(params.cb) != 'function') ? (function () {
        }) : (params.cb);
        params.mainFrom = params.mainFrom || 0;
        params.subFrom = params.subFrom || 0;
        params.subFrom2 = params.subFrom2 || 0;
        var CST_URL_SETRING = "http://qqring.qq.com/qqring_new/set_ring_json.php";
        var _info = {setSucc: {"type": "success", "brief": "炫铃设置成功！", "detail": '当您对好友设置了炫铃，好友又对您设置了好友铃音时，好友将只会听到他对您设置的好友铃音。', "openvip": ''}, notVip: {"type": "alert", "brief": "对不起！您还不是会员，不能设置炫铃。", "detail": "开通QQ会员全场炫铃任意使用！", "openvip": '<a class="mod_vip_em" href="http:\/\/pay.qq.com\/qqvip\/?aid=' + (params.aid) + '&ADTAG=' + (params.adtag) + '" target="_blank">开通会员<\/a>'}, limitedErr: {"type": "alert", "brief": "对不起！炫铃设置失败！", "detail": '对不起，您设置的人数已经到达上限。如需继续设置，请删除部分已设置的炫铃。', "openvip": ''}, setSuccBean: {"type": "success", "brief": "炫铃设置成功！", "detail": '您是非会员用户，好友设置上限为<strong>{1}</strong>人，体验资格还剩<strong>{2}</strong>天', "openvip": '<a class="mod_vip_em" href="http:\/\/pay.qq.com\/qqvip\/?aid=' + (params.aid) + '&ADTAG=' + (params.adtag) + '" target="_blank">开通会员<\/a>'}, setSuccPart: {"type": "alert", "brief": "", "detail": '{1}', "openvip": ''}, setFail: {"type": "alert", "brief": "对不起！炫铃设置失败！", "detail": "{1}", "openvip": ''}};
        if (!QQVIPFS.Utils.checkCookie()) {
            return openLogin();
        }
        var _userInfo = QQVIP.dataCenter.get('nr_userInfo');
        if (_userInfo != null && _userInfo.isclub == 0 && _userInfo.isbean == 0) {
            return QQVIPFS.Utils.showDialog(_info["notVip"]);
        }
        QQVIPFS.Utils.showFriendList({uin: params.uin, name: '设置炫铃', infos: ['名称：' + QQVIPFS.Utils.cutString(params.name, 8, "..."), '应用类型：' + params.funcType]}, function (friendsList) {
            var _queryRing = function (id, friends) {
                try {
                    document.domain = "qq.com";
                } catch (e) {
                }
                var token = QQVIP.security.getAntiCSRFToken();
                var _arr = ['id=' + id, 'friends=' + friends, 'cmd=set_ring', 'g_tk=' + token];
                var _xhr = new QQVIP.XHR(CST_URL_SETRING, null, 'POST', _arr.join('&'), true, true);
                _xhr.send();
                return _xhr;
            };
            var _detailErr = function (json) {
                var _msg = '';
                var _succUserNum = json.succUserList.length;
                var _failUserNum = json.failUserList.length;
                var _limitUserNum = json.limitUserList.length;
                var _systemUserNum = json.systemUserList.length;
                var _noFriendNum = json.noFriendList.length;
                var _failNumTotal = _failUserNum + _limitUserNum + _systemUserNum + _noFriendNum;
                if (_succUserNum > 0) {
                    _msg += ['您对<strong>', _succUserNum, '</strong>位好友设置炫铃成功！', '<br />'].join('');
                }
                if (_failNumTotal > 0) {
                    _msg += ['您对<strong>', _failNumTotal, '</strong>位好友设置炫铃失败！详情信息如下：<br />'].join('');
                    for (var i = 0; i < _noFriendNum; i++) {
                        _msg += ['您不是"', json.noFriendList[i].name, '[', json.noFriendList[i].uin, ']"的好友，请互相添加为好友；<br />'].join('');
                    }
                    for (var i = 0; i < _limitUserNum; i++) {
                        _msg += ['达到设置上限（', json.quotaNum, '），无法为"', json.limitUserList[i].name, '[', json.limitUserList[i].uin, ']"设置炫铃；<br />'].join('');
                    }
                    for (var i = 0; i < _systemUserNum; i++) {
                        _msg += [json.systemUserList[i].uin, '是系统保留号，不能设置炫铃；<br />'].join('');
                    }
                    for (var i = 0; i < _failUserNum; i++) {
                        _msg += ['由于网络原因，无法为"', json.failUserList[i].name, '[', json.failUserList[i].uin, ']"设置炫铃；<br />', ].join('');
                    }
                }
                return _msg;
            };
            var _jsRing = _queryRing(id, friendsList);
            _jsRing.onSuccess = function (json) {
                var _reportBrand = function () {
                    var urlTpl = 'http://brandcgi.vip.qq.com/vipworth/index.php/report?type=vipring&g_tk={g_tk}';
                    var url = urlTpl.replace('{g_tk}', QQVIP.security.getAntiCSRFToken());
                    var _jsLoader = new QQVIP.jsLoader();
                    _jsLoader.load(url);
                }
                var callback = function (_d) {
                    var _msg = {};
                    var _result = 0;
                    var _code = _d.result;
                    if ('notLogin' == _code) {
                        return openLogin();
                    }
                    if (_info[_code]) {
                        _msg = _info[_code];
                        if (_code == 'setSucc' || _code == 'setSuccBean' || _code == 'setSuccPart') {
                            _reportBrand();
                        }
                        switch (_code) {
                            case'setSuccBean':
                            {
                                _msg.detail = _msg.detail.replace('{1}', _d.quotaNum).replace('{2}', _d.endTime);
                                break;
                            }
                            case'setSuccPart':
                            case'setFail':
                            {
                                _msg.detail = _msg.detail.replace('{1}', _detailErr(_d));
                                _result = 1;
                                break;
                            }
                        }
                    } else {
                        _msg = _info["setFail"];
                        _msg.detail = _msg.detail.replace('{1}', '请稍后再试！');
                        _result = 1;
                    }
                    QQVIPFS.Utils.showDialog(_msg);
                    var _tj2 = (function () {
                        var _userInfo = QQVIP.dataCenter.get('nr_userInfo');
                        var _level = -1;
                        if (_userInfo) {
                            _level = _userInfo.clublevel;
                        }
                        var _d = {serviceId: QQVIPFS.ServiceId.QQRING, operate: 'set', itemId: id, result: _result, mainFrom: params.mainFrom, subFrom: params.subFrom, subFrom2: params.subFrom2, level: _level};
                        QQVIPFS.Utils.tj2LogSend(_d);
                    })();
                    (params.cb)();
                };
                eval(json['text']);
            };
        });
    };
    var _preRing = function (el, id, fileType, params) {
        params = params || {};
        params.from = params.from || '';
        var CST_ID_FILE = "_s_qqring_prev_file_";
        var CST_URL_RINGFILE = "http://imgcache.qq.com/ring_file/{1}/{2}.{3}";
        var _timer = null;
        var _mapFileType = {1: 'mid', 2: 'wav', 3: 'arm'};
        $e("td a.ico_ing").each(function (o) {
            o.className = 'ico_try';
            o.title = "试听";
        });
        el.className = 'ico_ing';
        el.title = "播放中";
        var _file = CST_URL_RINGFILE.replace(/\{(\w+)\}/g, function (_0, _1) {
            var _t = typeof(_mapFileType[fileType]) != 'undefined' ? _mapFileType[fileType] : '';
            var _dir = id % 100;
            var _map = {'{1}': String(_dir).length == 1 ? "0" + (_dir) : _dir, '{2}': id, '{3}': _t};
            return _map[_0];
        });
        var _player = (function () {
            _timer && (clearTimeout(_timer));
            try {
                ($("QQRingPlayer")) && ($("QQRingPlayer").controls.stop());
            } catch (e) {
            }
            if (!$(CST_ID_FILE)) {
                var _div = document.createElement("div");
                _div.id = CST_ID_FILE;
                document.body.appendChild(_div);
            }
            if (navigator.appName == 'Netscape') {
                $(CST_ID_FILE).innerHTML = '<object id="QQRingPlayer" type="application/x-ms-wmp" width="0" height="0"><param name="URL" value="' + _file + '" /><param name="autoStart" value="true"><param name="playCount" value="1"></object>';
            } else {
                var _clientHeight = QQVIP.dom.getClientHeight();
                var _clientWidth = QQVIP.dom.getClientWidth();
                var _W = 260;
                var _H = 250;
                var top = Math.ceil((_clientHeight - _H) / 2);
                var left = Math.ceil((_clientWidth - _W) / 2);
                if (QQVIP.userAgent.ie < 7) {
                    window.open('http://style.qq.com/qqring/ie6ring.html?file=' + _file, 'ie6ring', 'height=270, width=260, top=' + top + ', left=' + left + ', toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no')
                } else {
                    $(CST_ID_FILE).innerHTML = '<object id=QQRingPlayer classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,7,1112" standby="Loading Microsoft Windows? Media Player components..." type="application/x-oleobject" width="0" height="0" style="width: 1px; height: 1px"><param name="URL" value="' + _file + '" /><param name="autoStart" value="true"><param name="playCount" value="1"></object>'
                }
            }
            _timer = window.setTimeout(function () {
                el.className = 'ico_try';
                el.title = "试听";
                try {
                    ($("QQRingPlayer")) && ($("QQRingPlayer").controls.stop());
                } catch (e) {
                }
            }, 5000);
        })();
    };
    return{setDeco: _setDeco, setAutoDeco: _setAutoDeco, setFace: _setFace, setFaceTheme: _setFaceTheme, setWeibo: _setWeibo, setSuit: _setSuit, setRing: _setRing, preRing: _preRing, ddWallpic: _ddWallpic, ddWallpicItem: _ddWallpicItem, ddPinYinSkin: _ddPinYinSkin, ddBiaoQingPack: _ddBiaoQingPack, ddSigBiaoQing: _ddSigBiaoQing};
})();
QQVIPFS.Div = (function () {
    var _imgFace = 'http://imgcache.qq.com/club/item/face/img/{1}/{2}.{3}';
    var _imgDeco = 'http://imgcache.qq.com/club/item/decorate/res/static/{1}/{2}/{3}.png';
    var _tpl = {deco: '<div><div id="_nr_zb_s" align="center"><br /><br /><br /><img height="32" width="32" src="http://imgcache.qq.com/club/common/images/loading.gif"/></div><img id="_nr_zb_b" onload="$(\'_nr_zb_s\').style.display=\'none\';$(\'_nr_zb_b\').style.display=\'\';" height="131" width="439" src="{IMG}"/><p>QQ皮肤在聊天窗口应用时的效果图，<span class="red">点击小图立即设置！</span></p></div>', decov2: '<div><div id="_nr_zb_s" align="center"><br /><br /><br /><img height="32" width="32" src="http://imgcache.qq.com/club/common/images/loading.gif"/></div><img id="_nr_zb_b" onload="$(\'_nr_zb_s\').style.display=\'none\';$(\'_nr_zb_b\').style.display=\'\';" height="131" width="439" src="{IMG}"/></div>', deco_imskin: '<div><div id="_nr_zb_s" align="center"><br /><br /><br /><img height="32" width="32" src="http://imgcache.qq.com/club/common/images/loading.gif"/></div><img id="_nr_zb_b" onload="$(\'_nr_zb_s\').style.display=\'none\';$(\'_nr_zb_b\').style.display=\'\';" height="131" width="439" src="{IMG}"/><p>点击小图，立刻设置&nbsp;&nbsp;&nbsp;&nbsp;</p></div>', weibo: '<div><div id="_nr_zb_s" align="center"><br /><br /><br /><img height="32" width="32" src="http://imgcache.qq.com/club/common/images/loading.gif"/></div><img id="_nr_zb_b" onload="$(\'_nr_zb_s\').style.display=\'none\';$(\'_nr_zb_b\').style.display=\'\';" height="131" width="439" src="{IMG}"/><p>QQ皮肤在聊天窗口应用时的效果图，<span class="red">点击小图立即设置！</span></p></div>', deco_7: '<div><div id="_nr_zb_s_7" align="center"><br /><br /><br /><img height="32" width="32" src="http://imgcache.qq.com/club/common/images/loading.gif"/></div><img id="_nr_zb_b_7" onload="$(\'_nr_zb_s_7\').style.display=\'none\';$(\'_nr_zb_b_7\').style.display=\'\';" height="131" width="439" src="{IMG}"/><p>QQ皮肤在聊天窗口应用时的效果图，此皮肤将出现在<span class="red">{DAY}！</span></p></div>', face: '<cite class="{CLASS}"><img id="_nr_face_40" alt="{NAME}" src="{IMG1}"/><img id="_nr_face_100" onload="$(\'_nr_face_40\').style.display=\'none\';$(\'_nr_face_100\').style.display=\'\';" alt="{NAME}" src="{IMG2}" style="display:none" /></cite><p class="f_name">{DAYS}设置了</p><p><span class="red">{NUM}</span>次</p>', facev2: '<cite class="{CLASS}"><img id="_nr_face_40" alt="{NAME}" src="{IMG1}"/><img id="_nr_face_100" onload="$(\'_nr_face_40\').style.display=\'none\';$(\'_nr_face_100\').style.display=\'\';" alt="{NAME}" src="{IMG2}" style="display:none" /></cite><p class="f_name">{NAME}</p>', suit: '<div class="innr"><div class="pic_s"><img src="{IMG1}" /></div><div class="pic_b"><img alt="皮肤" src="{IMG2}"/></div><div class="pic_35"><img src="{IMG1}" width="35" height="35"/></div><div id="count" class="info"><span class="tips_layout">一键设置完美搭配的头像+QQ皮肤</span><div class="set_info" id="suit_hot_word"></div></div></div><div class="pops_bg"></div>'};
    var _setPos = function (obj, size, event) {
        var _obj_w = size[0] || 200;
        var _obj_h = size[1] || 100;
        var evt = event || window.event;
        var _x = evt.clientX;
        var _y = evt.clientY;
        var _width = QQVIP.dom.getClientWidth();
        var _height = QQVIP.dom.getClientHeight();
        var _sl = QQVIP.dom.getScrollLeft();
        var _st = QQVIP.dom.getScrollTop();
        var _right = _width - _x;
        var _bottom = _height - _y;
        if (_right >= _obj_w) {
            obj.style.left = _x + _sl + 5 + "px";
        } else if (_x >= _obj_w) {
            obj.style.left = _x - _obj_w + 15 + "px";
        }
        var _t = evt.pageY || _y + _st;
        if (_bottom >= _obj_h) {
            obj.style.top = _t + 15 + "px";
        } else {
            obj.style.top = _t - _obj_h + "px";
        }
    };
    var _getPreviewFaceSmall = function (tpl, id, type) {
        return tpl.replace(/\{(\w+)\}/g, function (m0, m1) {
            var _map = {'{1}': id % 10, '{2}': id, '{3}': (type % 2 == 1 ? 'gif' : 'bmp')};
            return _map[m0];
        });
    };
    var _getPreviewFace = function (tpl, id, type, size) {
        return tpl.replace(/\{(\w+)\}/g, function (m0, m1) {
            var _map = {'{1}': id % 10, '{2}': ((1 == size) ? [id, '_100'].join('') : id), '{3}': ((type % 2 == 1) ? 'gif' : (1 == size ? 'png' : 'bmp'))};
            return _map[m0];
        });
    };
    var _getPreviewDeco = function (tpl, id) {
        return tpl.replace(/\{(\w+)\}/g, function (_0, _1) {
            var _map = {'{1}': id % 10, '{2}': id, '{3}': [id, '_eff'].join('')};
            return _map[_0];
        });
    };
    var _hideDiv = function (id) {
        $(id).style.display = 'none';
    };
    var _showSuit = function (szFace, szDeco, itemTotal, isHot, event) {
        var evt = event || window.event;
        QQVIP.event.cancelBubble(evt);
        var obj = $('skin_show_div2');
        _setPos(obj, [590, 185], evt);
        if (obj.style.display != 'block') {
            var _arrFace = szFace.split('|');
            var _arrDeco = szDeco.split('|');
            var _url_1 = _getPreviewFace(_imgFace, _arrFace[0], _arrFace[1], _arrFace[2]);
            var _url_2 = _getPreviewDeco(_imgDeco, _arrDeco[0]);
            obj.innerHTML = (_tpl['suit']).replace(/\{(\w+)\}/g, function (_0, _1) {
                var _map = {'{IMG1}': _url_1, '{IMG2}': _url_2};
                return _map[_0];
            });
            if (isHot && isHot == 1) {
                $("suit_hot_word").innerHTML = "<span>该套装</span>近7天设置了<b>" + itemTotal + "</b>次</div>";
            }
            obj.style.display = 'block';
        }
    };
    var _showDeco = function (id, itemTotal, isHot, event) {
        var evt = event || window.event;
        var _deco_tpl = '<div><div id="_nr_zb_s" align="center"><br /><br /><br /><img height="32" width="32" src="http://imgcache.qq.com/club/common/images/loading.gif"/></div><img id="_nr_zb_b" onload="$(\'_nr_zb_s\').style.display=\'none\';$(\'_nr_zb_b\').style.display=\'\';" height="131" width="439" src="{IMG}"/><p>点击小图立即设置，该皮肤{DAYS}设置了<span class="red">{NUM}</span>次</p></div>';
        var el = QQVIP.event.getTarget(evt);
        while (el) {
            if ((el.tagName || '').toUpperCase() != 'LI') {
                el = el.parentNode;
            } else {
                var item = $e(el).find('.icon_viponly');
                if (item.elements.length > 0 && item.getStyle('display') != 'none') {
                    _deco_tpl = '<div><div id="_nr_zb_s" align="center"><br /><br /><br /><img height="32" width="32" src="http://imgcache.qq.com/club/common/images/loading.gif"/></div><img id="_nr_zb_b" onload="$(\'_nr_zb_s\').style.display=\'none\';$(\'_nr_zb_b\').style.display=\'\';" height="131" width="439" src="{IMG}"/><p style="width: 430px;"><span style="float: left; width: 130px;">QQ会员专属QQ皮肤 </span><span style="float: left; width: 300px; display: block; text-align: right;">点击小图立即设置，该皮肤{DAYS}设置了<span class="red">{NUM}</span>次</span></p></div>';
                }
                break;
            }
        }
        QQVIP.event.cancelBubble(evt);
        var obj = $('skin_show_div');
        _setPos(obj, [480, 180], evt);
        var _days = (isHot == 1 ? '近7天' : '今天');
        if (obj.style.display != 'block') {
            var _url_1 = _getPreviewDeco(_imgDeco, id);
            obj.innerHTML = _deco_tpl.replace(/\{(\w+)\}/g, function (_0, _1) {
                var _map = {'{IMG}': _url_1, '{NUM}': itemTotal, '{DAYS}': _days};
                return _map[_0];
            });
            obj.style.display = 'block';
        }
    };
    var _showFace = function (id, type, size, name, itemTotal, isHot, event) {
        var evt = event || window.event;
        var obj = $('img100face');
        QQVIP.event.cancelBubble(evt);
        _setPos(obj, [120, 140], evt);
        var _days = (isHot == 1 ? '近7天' : '今天');
        if (obj.style.display != 'block') {
            var _url_1 = _getPreviewFaceSmall(_imgFace, id, type);
            var _url_2 = _getPreviewFace(_imgFace, id, type, size);
            obj.innerHTML = (_tpl['face']).replace(/\{(\w+)\}/g, function (_0, _1) {
                var _map = {'{CLASS}': (1 == size) ? '_' : 'f_face small', '{NAME}': name, '{NUM}': itemTotal, '{IMG1}': _url_1, '{IMG2}': _url_2, '{DAYS}': _days};
                return _map[_0];
            });
            obj.style.display = 'block';
        }
    };
    return{showFace: function (id, type, size, name, event) {
        var evt = event || window.event;
        var obj = $('img100face');
        QQVIP.event.cancelBubble(evt);
        _setPos(obj, [120, 140], evt);
        if (obj.style.display != 'block') {
            var _url_1 = _getPreviewFaceSmall(_imgFace, id, type);
            var _url_2 = _getPreviewFace(_imgFace, id, type, size);
            obj.innerHTML = (_tpl['facev2']).replace(/\{(\w+)\}/g, function (_0, _1) {
                var _map = {'{CLASS}': (1 == size) ? '_' : 'f_face small', '{NAME}': name, '{IMG1}': _url_1, '{IMG2}': _url_2};
                return _map[_0];
            });
            obj.style.display = 'block';
        }
    }, showFaceSetNum: function (id, type, size, name, hotNum, isHot, event) {
        var _itemTotal = -1;
        if (typeof(QQVIPFS.Utils.cacheHotNum[id]) != 'undefined') {
            _itemTotal = QQVIPFS.Utils.cacheHotNum[id];
        }
        if (isHot == 1) {
            _itemTotal = hotNum;
            _showFace(id, type, size, name, _itemTotal, isHot, event);
        } else {
            if (_itemTotal == -1) {
                _get_item_hs = function (json) {
                    if (json.ret && json.ret == 0) {
                        _itemTotal = json.value;
                        QQVIPFS.Utils.cacheHotNum[id] = _itemTotal;
                        $e("div.bigface span.red").elements[0].innerHTML = _itemTotal;
                    } else {
                        QQVIPFS.Utils.cacheHotNum[id] = 1;
                    }
                }
                QQVIPFS.Utils.cacheHotNum[id] = 0;
                var _url = 'http://function.qq.com/common/itemQuery.php?serviceId=' + QQVIPFS.ServiceId.FACE + '&itemId=' + id + '&operate=2&g_tk=' + QQVIP.security.getAntiCSRFToken();
                var _jsLd = new QQVIP.JsLoader();
                _jsLd.load(_url);
                _showFace(id, type, size, name, 0, isHot, event);
            } else {
                _showFace(id, type, size, name, _itemTotal, isHot, event);
            }
        }
    }, checkFaceSetNum: function (id, hotNum, isHot, event) {
        if (QQVIPFS.Utils.cacheHotNum[id] == 0 && isHot != 1) {
            _get_item_hs = function (json) {
                if (json.ret && json.ret == 0) {
                    var _itemTotal = json.value;
                    QQVIPFS.Utils.cacheHotNum[id] = _itemTotal;
                    $e("div.div.bigface span.red").elements[0].innerHTML = _itemTotal;
                } else {
                    QQVIPFS.Utils.cacheHotNum[id] = 1;
                }
            }
            var _url = 'http://function.qq.com/common/itemQuery.php?serviceId=' + QQVIPFS.ServiceId.Face + '&itemId=' + id + '&operate=2&g_tk=' + QQVIP.security.getAntiCSRFToken();
            var _jsLd = new QQVIP.JsLoader();
            _jsLd.load(_url);
        }
    }, showDeco: function (id, event) {
        var evt = event || window.event;
        QQVIP.event.cancelBubble(evt);
        var obj = $('skin_show_div');
        _setPos(obj, [480, 180], evt);
        if (obj.style.display != 'block') {
            var _url_1 = _getPreviewDeco(_imgDeco, id);
            obj.innerHTML = (_tpl['deco']).replace(/\{(\w+)\}/g, function (_0, _1) {
                var _map = {'{IMG}': _url_1};
                return _map[_0];
            });
            obj.style.display = 'block';
        }
    }, showDecoSetNum: function (id, hotNum, isHot, event) {
        var _itemTotal = -1;
        if (typeof(QQVIPFS.Utils.cacheHotNum[id]) != 'undefined') {
            _itemTotal = QQVIPFS.Utils.cacheHotNum[id];
        }
        if (isHot == 1) {
            _itemTotal = hotNum;
            _showDeco(id, _itemTotal, isHot, event);
        } else {
            if (_itemTotal == -1) {
                _get_item_hs = function (json) {
                    if (json.ret && json.ret == 0) {
                        _itemTotal = json.value;
                        QQVIPFS.Utils.cacheHotNum[id] = _itemTotal;
                        $e("div.skin_show span.red").elements[0].innerHTML = _itemTotal;
                    } else {
                        QQVIPFS.Utils.cacheHotNum[id] = 1;
                    }
                }
                QQVIPFS.Utils.cacheHotNum[id] = 0;
                var _url = 'http://function.qq.com/common/itemQuery.php?serviceId=' + QQVIPFS.ServiceId.SKIN + '&itemId=' + id + '&operate=2&g_tk=' + QQVIP.security.getAntiCSRFToken();
                var _jsLd = new QQVIP.JsLoader();
                _jsLd.load(_url);
                _showDeco(id, 0, isHot, event);
            } else {
                _showDeco(id, _itemTotal, isHot, event);
            }
        }
    }, checkDecoSetNum: function (id, hotNum, isHot, event) {
        if (QQVIPFS.Utils.cacheHotNum[id] == 0 && isHot != 1) {
            _get_item_hs = function (json) {
                if (json.ret && json.ret == 0) {
                    var _itemTotal = json.value;
                    QQVIPFS.Utils.cacheHotNum[id] = _itemTotal;
                    $e("div.skin_show span.red").elements[0].innerHTML = _itemTotal;
                } else {
                    QQVIPFS.Utils.cacheHotNum[id] = 1;
                }
            }
            var _url = 'http://function.qq.com/common/itemQuery.php?serviceId=' + QQVIPFS.ServiceId.SKIN + '&itemId=' + id + '&operate=2&g_tk=' + QQVIP.security.getAntiCSRFToken();
            var _jsLd = new QQVIP.JsLoader();
            _jsLd.load(_url);
        }
    }, showDecoV2: function (id, fee, event) {
        var evt = event || window.event;
        QQVIP.event.cancelBubble(evt);
        var obj = $('skin_show_div');
        _setPos(obj, [480, 180], evt);
        if (obj.style.display != 'block') {
            var _url_1 = _getPreviewDeco(_imgDeco, id);
            obj.innerHTML = (_tpl['decov2']).replace(/\{(\w+)\}/g, function (_0, _1) {
                var _map = {'{IMG}': _url_1};
                return _map[_0];
            });
            obj.style.display = 'block';
        }
    }, showDeco7: function (id, day, event) {
        var evt = event || window.event;
        QQVIP.event.cancelBubble(evt);
        var obj = $('skin_show_div');
        _setPos(obj, [480, 180], evt);
        if (obj.style.display != 'block') {
            var _url_1 = _getPreviewDeco(_imgDeco, id);
            obj.innerHTML = (_tpl['deco_7']).replace(/\{(\w+)\}/g, function (_0, _1) {
                var _map = {'{IMG}': _url_1, '{DAY}': day};
                return _map[_0];
            });
            obj.style.display = 'block';
        }
    }, showImSkin: function (id, event) {
        var evt = event || window.event;
        QQVIP.event.cancelBubble(evt);
        var obj = $('skin_show_div');
        _setPos(obj, [480, 180], evt);
        if (obj.style.display != 'block') {
            var _url_1 = _getPreviewDeco(_imgDeco, id);
            obj.innerHTML = (_tpl['deco_imskin']).replace(/\{(\w+)\}/g, function (_0, _1) {
                var _map = {'{IMG}': _url_1};
                return _map[_0];
            });
            obj.style.display = 'block';
        }
    }, showSuit: function (suitId, szFace, szDeco, hotNum, isHot, event) {
        var _itemTotal = -1;
        if (typeof(QQVIPFS.Utils.cacheHotNum[suitId]) != 'undefined') {
            _itemTotal = QQVIPFS.Utils.cacheHotNum[suitId];
        }
        if (isHot == 1) {
            _itemTotal = hotNum;
            _showSuit(szFace, szDeco, _itemTotal, isHot, event);
        } else {
            if (_itemTotal == -1) {
                _get_item_hs = function (json) {
                    if (json.ret && json.ret == 0) {
                        _itemTotal = json.value;
                        QQVIPFS.Utils.cacheHotNum[suitId] = _itemTotal;
                        $("suit_hot_word").innerHTML = "<span>该套装</span>今天设置了<b>" + _itemTotal + "</b>次</div>";
                        $("suit_hot_word").style.display = "";
                    } else {
                        QQVIPFS.Utils.cacheHotNum[suitId] = 1;
                    }
                }
                QQVIPFS.Utils.cacheHotNum[suitId] = 0;
                var _url = 'http://function.qq.com/common/itemQuery.php?serviceId=' + QQVIPFS.ServiceId.SUIT + '&itemId=' + suitId + '&operate=2&g_tk=' + QQVIP.security.getAntiCSRFToken();
                var _jsLd = new QQVIP.JsLoader();
                _jsLd.load(_url);
                _showSuit(szFace, szDeco, _itemTotal, isHot, event);
            } else {
                _showSuit(szFace, szDeco, _itemTotal, isHot, event);
                $("suit_hot_word").style.display = "";
                $("suit_hot_word").innerHTML = "<span>该套装</span>今天设置了<b>" + _itemTotal + "</b>次</div>";
            }
        }
    }, checkSuitSetNum: function (suitId, szFace, szDeco, hotNum, isHot, event) {
        if (QQVIPFS.Utils.cacheHotNum[suitId] == 0 && isHot != 1) {
            _get_item_hs = function (json) {
                if (json.ret && json.ret == 0) {
                    var _itemTotal = json.value;
                    QQVIPFS.Utils.cacheHotNum[suitId] = _itemTotal;
                    $("suit_hot_word").innerHTML = "<span>该套装</span>今天设置了<b>" + _itemTotal + "</b>次</div>";
                    $("suit_hot_word").style.display = "";
                } else {
                    QQVIPFS.Utils.cacheHotNum[suitId] = 0;
                }
            }
            var _url = 'http://function.qq.com/common/itemQuery.php?serviceId=' + QQVIPFS.ServiceId.SUIT + '&itemId=' + suitId + '&operate=2&g_tk=' + QQVIP.security.getAntiCSRFToken();
            var _jsLd = new QQVIP.JsLoader();
            _jsLd.load(_url);
        }
    }, hideFace: function (event) {
        var evt = event || window.event;
        QQVIP.event.cancelBubble(evt);
        _hideDiv('img100face');
    }, hideDeco: function (event) {
        var evt = event || window.event;
        QQVIP.event.cancelBubble(evt);
        _hideDiv('skin_show_div');
    }, hideSuit: function (event) {
        var evt = event || window.event;
        QQVIP.event.cancelBubble(evt);
        _hideDiv('skin_show_div2');
    }}
})();
QQVIPFS.Paging = function (normalTpl, activeTpl, disableTpl, moreTpl, barTpl, size, blank) {
    var _TEMPLATE = [normalTpl, activeTpl, disableTpl, moreTpl, barTpl];
    var _SIZE = size, _BLANK = blank;
    var _format = function (format, totalPage, pageId, pageName) {
        return format.replace(/\{TOTALPAGE\}/g, totalPage).replace(/\{PAGE\}/g, pageId).replace(/\{PAGENAME\}/g, pageName);
    };
    this.update = function (total, current) {
        if (current < 1 || current > total) {
            return'';
        }
        var outputString = _format(_TEMPLATE[4], total, current, current);
        var outputBuilder = [];
        var begin = current - Math.floor((_SIZE - 1) / 2);
        var end = current + Math.ceil((_SIZE - 1) / 2);
        var beginBlank = 1 - begin;
        var endBlank = end - total;
        if (beginBlank > 0) {
            end += beginBlank;
        }
        if (endBlank > 0) {
            begin -= endBlank;
        }
        if (begin < 1) {
            begin = 1;
        } else if (begin > 1) {
            begin += _BLANK;
        }
        if (end > total) {
            end = total;
        } else if (end < total) {
            end -= _BLANK;
        }
        outputString = outputString.replace(/\{PRE\}/g, _format(_TEMPLATE[(current > 1) ? 0 : 2], total, current - 1, '上一页'));
        if (begin != 1) {
            outputBuilder.push(_format(_TEMPLATE[0], total, '1', '1'));
            outputBuilder.push(_format(_TEMPLATE[3], total, '', '...'));
        }
        for (var i = begin; i <= end; i++) {
            outputBuilder.push(_format(_TEMPLATE[(i != current) ? 0 : 1], total, i, i));
        }
        if (end != total) {
            outputBuilder.push(_format(_TEMPLATE[3], total, '', '...'));
            outputBuilder.push(_format(_TEMPLATE[0], total, total, total));
        }
        outputString = outputString.replace(/\{NEXT\}/g, _format(_TEMPLATE[(current < total) ? 0 : 2], total, current + 1, '下一页'));
        return outputString.replace('{PAGING}', outputBuilder.join(''));
    };
};
QQVIPFS.SearchBar = (function () {
    var _gBzId = 0;
    var CST_SEARCH_TEXT = "请输入搜索关键字";
    var CST_SEARCH_HOTTAG = "ISD.QQVIP.FENGSHANG.SEARCHBAR_CLICK.";
    var CST_BZCONF = {1003: {'name': '头像'}, 1004: {'name': '壁纸'}, 1002: {'name': 'QQ皮肤'}, 1001: {'name': '套装'}, 1008: {'name': '炫铃'}};
    var CST_SEARCH_URL_BASE = "http://style.qq.com/search/index.html";
    var CST_SEARCH_URL = CST_SEARCH_URL_BASE + '?id={1}&wd={2}';
    var _init = function (bzId) {
        if (document.getElementById('nav_mainSearchbox') && document.getElementById('nav_mainSearchbox').id) {
            return;
        }
        var _timer = null;
        _gBzId = typeof(CST_BZCONF[bzId]) != 'undefined' ? parseInt(bzId, 10) : 0;
        var _domDivSelecttext = $e("div.selecttext").elements[0];
        if (typeof(CST_BZCONF[_gBzId]) != 'undefined') {
            _domDivSelecttext.innerHTML = CST_BZCONF[_gBzId].name;
        } else {
            _domDivSelecttext.innerHTML = '全部';
        }
        var _elSearchText = $('wd');
        _elSearchText.value = CST_SEARCH_TEXT;
        _elSearchText.onkeyup = function (evt) {
            var _evt = evt || window.event;
            if (_evt.keyCode == QQVIP.event.KEYS.RETURN) {
                _search();
            }
        };
        _elSearchText.onblur = function (evt) {
            if (_elSearchText.value == '') {
                _elSearchText.value = CST_SEARCH_TEXT;
            }
        };
        _elSearchText.onfocus = function (evt) {
            if (_elSearchText.value == CST_SEARCH_TEXT) {
                _elSearchText.value = '';
            }
            _elSearchText.select();
        };
        var _domUlSelectlist = $e('.vip_header .grid_c1 .selectlist').elements[0];
        QQVIP.object.each([_domDivSelecttext, _domUlSelectlist], function (obj) {
            QQVIP.event.addEvent(obj, 'mouseover', function (e) {
                _timer && (clearTimeout(_timer));
                _domUlSelectlist.style.display = 'block';
            });
            QQVIP.event.addEvent(obj, 'mouseout', function (e) {
                _timer = setTimeout(function () {
                    _domUlSelectlist.style.display = 'none';
                }, 300);
            });
        });
        var _domListItem = $e('.vip_header .grid_c1 .selectlist li');
        _domListItem.each(function (el) {
            addEvent(el, 'click', function (evt, el) {
                var _text = String(el.innerHTML).replace(/<.*?>/g, '');
                _domDivSelecttext.innerHTML = _text;
                _domUlSelectlist.style.display = 'none';
                _gBzId = el.id;
            }, [el]);
        });
        QQVIPFS.Utils.killFocus();
    };
    var _isCurrPage = function () {
        var _href = String(location.href).split('?')[0];
        return!!(_href == CST_SEARCH_URL_BASE);
    };
    var _search = function () {
        var _wd = $('wd').value;
        _wd = QQVIP.string.trim(_wd);
        QQVIPFS.Utils.pvClickSend(CST_SEARCH_HOTTAG + _gBzId);
        (_wd == CST_SEARCH_TEXT) && (_wd = '');
        if (!_isCurrPage()) {
            var _url = CST_SEARCH_URL.replace(/\{(\w+)\}/g, function (_0, _1) {
                var _map = {'{1}': _gBzId, '{2}': QQVIP.string.escapeURI(_wd)};
                return _map[_0];
            });
            window.location = _url;
        } else {
            QQVIPFS.Search.btnSearch(_gBzId, _wd);
        }
    };
    return{init: _init, search: _search};
})();
QQVIPFS.Slider = (function () {
    var _D = QQVIP.dom;
    var _C = function (el) {
        var _arr = [];
        var el = _D.getFirstChild(el);
        while (el) {
            if (!!el && el.nodeType == 1) {
                _arr.push(el);
            }
            el = el.nextSibling;
        }
        return _arr;
    };
    var _Slide = function (conf) {
        conf = conf || {};
        this._target = 0;
        this._curIndex = 0;
        this._play = true;
        this._timer = null;
        this._eventType = conf.eventType || 'mouseover', this._autoPlayInterval = conf.autoPlayInterval || 3 * 1000;
        this._container = $(conf.container);
        this._panelWrapper = $(conf.panelWrapper) || _D.getFirstChild(this._container);
        this._sliders = _C(this._panelWrapper);
        this._navWrapper = $(conf.navWrapper) || _D.getNextSibling(this._panelWrapper) || null;
        this._navs = (this._navWrapper && _C(this._navWrapper)) || null;
        this._effect = conf.effect || 'scrollx';
        this._panelSize = (this._effect.indexOf("scrolly") == -1 ? conf.width : conf.height) || _D.getSize(_D.getFirstChild(this._panelWrapper))[this._effect.indexOf("scrolly") == -1 ? 0 : 1];
        this._count = conf.count || _C(this._panelWrapper).length;
        this._navClassOn = conf.navClassOn || "on";
        this._changeProperty = this._effect.indexOf("scrolly") == -1 ? "left" : "top";
        this._step = this._effect.indexOf("scroll") == -1 ? 1 : (conf.Step || 5);
        this._slideTime = conf.slideTime || 10;
        this.init();
        this.run(true);
    };
    _Slide.prototype = {init: function () {
        _D.setStyle(this._container, "overflow", "hidden");
        _D.setStyle(this._container, "position", "relative");
        _D.setStyle(this._panelWrapper, "position", "relative");
        if (this._effect.indexOf("scrolly") == -1) {
            _D.setStyle(this._panelWrapper, "width", this._count * (this._panelSize + 200) + "px");
            QQVIP.object.each(this._sliders, function (el) {
                el.style.styleFloat = el.style.cssFloat = "left";
            });
        }
        if (this._navs) {
            var _this = this;
            if (_this._eventType == 'click') {
                QQVIP.object.each(this._navs, function (el, i) {
                    el.onclick = (function (_this) {
                        return function () {
                            QQVIP.css.addClassName(el, _this._navClassOn);
                            _this._play = false;
                            _this._curIndex = i;
                            _this._play = true;
                            _this.run();
                        }
                    })(_this)
                });
            } else {
                QQVIP.object.each(this._navs, function (el, i) {
                    el.onmouseover = (function (_this) {
                        return function () {
                            QQVIP.css.addClassName(el, _this._navClassOn);
                            _this._play = false;
                            _this._curIndex = i;
                            _this.run();
                        }
                    })(_this)
                    el.onmouseout = (function (_this) {
                        return function () {
                            QQVIP.css.removeClassName(el, _this._navClassOn);
                            _this._play = true;
                            _this.run();
                        }
                    })(_this)
                });
            }
        }
    }, run: function (isInit) {
        if (this._curIndex < 0) {
            this._curIndex = this._count - 1;
        } else if (this._curIndex >= this._count) {
            this._curIndex = 0;
        }
        this._target = -1 * this._panelSize * this._curIndex;
        var _this = this;
        if (this._navs) {
            QQVIP.object.each(this._navs, function (el, i) {
                _this._curIndex == (i) ? QQVIP.css.addClassName(el, _this._navClassOn) : QQVIP.css.removeClassName(el, _this._navClassOn);
            });
        }
        this.scroll();
        if (this._effect.indexOf("fade") >= 0) {
            _D.setStyle(this._panelWrapper, "opacity", isInit ? 0.5 : 0.1);
            this.fade();
        }
    }, scroll: function () {
        clearTimeout(this._timer);
        var _this = this, _cur_property = parseInt(this._panelWrapper.style[this._changeProperty]) || 0, _distance = (this._target - _cur_property) / this._step;
        if (Math.abs(_distance) < 1 && _distance != 0) {
            _distance = _distance > 0 ? 1 : -1;
        }
        if (_distance != 0) {
            this._panelWrapper.style[this._changeProperty] = (_cur_property + _distance) + "px";
            this._timer = setTimeout(function () {
                _this.scroll();
            }, this._slideTime);
        } else {
            this._panelWrapper.style[this._changeProperty] = this._target + "px";
            if (this._play) {
                this._timer = setTimeout(function () {
                    _this._curIndex++;
                    _this.run();
                }, this._autoPlayInterval);
            }
        }
    }, fade: function () {
        var _opacity = _D.getStyle(this._panelWrapper, "opacity");
        var _this = this;
        if (_opacity < 1) {
            _D.setStyle(this._panelWrapper, "opacity", parseFloat(_opacity) + 0.02);
            setTimeout(function () {
                _this.fade();
            }, 1);
        }
    }};
    return{init: function (el, conf) {
        conf = conf || {};
        conf.container = el;
        return new _Slide(conf);
    }};
})();
function mb_onResize(s) {
    $('tips_weibo').style.width = s.width + 'px';
    $('tips_weibo').style.height = s.height + 27 + 'px';
    $('weiboWinFrame').style.width = s.width + 'px';
    $('weiboWinFrame').style.height = s.height + 'px';
};
function mb_onClose() {
    $('tips_weibo').style.display = 'none';
    $('mod_pop_mask').style.display = 'none';
    if (Nr.checkCookie()) {
        QQVIPFS.Utils.showUserTips('neirong_zq');
    }
};
window.Nr = QQVIPFS.Utils;
window.Item = QQVIPFS.Item;
window.Div = QQVIPFS.Div;
window.Paging = QQVIPFS.Paging;
window.SearchBar = QQVIPFS.SearchBar;
window.styleLogin = QQVIPFS.Utils.styleLogin;
/*  |xGv00|2c791d39008639e6e32a4d5be25c49c9 */