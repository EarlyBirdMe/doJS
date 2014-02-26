Live.book = (function () {
    var retObj = {}, conf = {cgi: "http://sns.video.qq.com/fcgi-bin/liveportal/nbook?otype=json", f: 2};

    function sendData(_conf) {
        _conf = _conf || {};
        _conf = $j.extend({}, conf, _conf);
        if (!Live.login.isLogin()) {
            Live.login.openLogin({success: function () {
                sendData(_conf);
            }});
            return;
        }
        var data = {};
        $j.each(_conf, function (key, val) {
            if ($j.inArray(key, ["op", "uin", "sign", "f", "ver", "t", "id"]) != -1) {
                data[key] = val;
            }
        });
        $j.getJsonp(conf.cgi, data).done(function (json) {
            if (json) {
                if (json.suc == 0) {
                    _conf.success(json);
                    return;
                }
                else if (json.suc == -1) {
                    Live.login.clearLoginCookie();
                }
            }
            _conf.fail();
        }).fail(_conf.fail);
    }

    retObj = {setConf: function (key, val) {
        if (typeof key == "string") {
            conf[key] = val;
        }
        else {
            $j.extend(conf, key);
        }
    }, book: function (_conf) {
        _conf = _conf || {};
        _conf = $j.extend({success: function (json) {
            Live.book.onBookSuc(_conf.id);
        }, fail: Live.book.onBookFail}, _conf);
        _conf.op = 2;
        sendData(_conf);
    }, getList: function (_conf) {
        _conf = _conf || {};
        _conf = $j.extend({success: function (json) {
            Live.book.onGetListSuc(json);
        }, fail: Live.book.onGetListFail}, _conf);
        _conf.op = 1;
        sendData(_conf);
    }, cancel: function (_conf) {
        _conf = _conf || {};
        _conf = $j.extend({success: function (json) {
            Live.book.onCancelSuc(_conf.id);
        }, fail: Live.book.onCancelFail}, _conf);
        _conf.op = 3;
        sendData(_conf);
    }, isBook: function (_conf) {
        _conf = _conf || {};
        $j.extend(_conf, {op: 7, success: function (json) {
            Live.book.onIsBookSuc(json.availd);
        }, fail: Live.book.onIsBookFail});
        sendData(_conf);
    }};
    $j.each(["Book", "GetList", "IsBook", "Cancel"], function (key, val) {
        retObj["on" + val + "Suc"] = function () {
        };
        retObj["on" + val + "Fail"] = function () {
        };
    });
    return retObj;
})();
;
txv.book = (function () {
    var retObj = {}, bookedIdArr = [], conf = {f: 2, t: 4, id: "", typeAttr: "data-booktype", selector: "[data-bookid]", container: document, attr: "data-bookid", triggerEvent: "click", tipstitle: {book: '成功接收更新通知！', cancel: '已取消更新通知！', bookerror: '更新通知开启失败，请稍后再试。', cancelerror: '取消通知失败，请稍后再试。'}, tipscontent: {book: '有更新后我们会及时通过QQ消息提醒您观看，去<a href="http://v.qq.com/mytv/notice.html" target="_blank" class="c_txt2 unline">个人中心</a>查看', cancel: '', error: '请稍后再试'}, needShowTips: true};

    function bindEvent() {
        $j(conf.container || document).on(conf.triggerEvent, conf.selector, function (evt) {
            evt.preventDefault();
            var id = this.getAttribute(conf.attr) || conf.id, type = this.getAttribute(conf.typeAttr) || conf.t;
            if (id) {
                $j.inArray(id, bookedIdArr) == -1 ? Live.book.book({id: id, t: type}) : Live.book.cancel({id: id, t: type});
            }
        });
    }

    function checkIsBook() {
        var idArr = [];
        if (conf.id) {
            idArr.push(conf.id);
        }
        if (conf.selector) {
            $j(conf.selector).each(function (key, el) {
                var id = $j(el).attr(conf.attr);
                if (id && id != conf.id) {
                    idArr.push(id);
                }
            });
            if (idArr.length > 0) {
                Live.book.isBook({id: idArr.join("|")});
            }
        }
    }

    function logout() {
        if (bookedIdArr.length == 0) {
            return;
        }
        bookedIdArr = [];
        if ($j.isFunction(retObj.onLogout)) {
            retObj.onLogout();
        }
        else if (conf.selector) {
            $j(conf.selector).text("预订");
        }
    }

    $j.extend(retObj, Live.book);
    Live.book.onIsBookSuc = function (availd) {
        if ($j.isArray(availd)) {
            $j.each(availd, function (key, val) {
                if (val) {
                    bookedIdArr.push(val.id);
                }
            });
            retObj.onIsBookSuc(availd);
        }
    }
    Live.book.onBookSuc = function (id) {
        bookedIdArr.push(id);
        if (conf.needShowTips) {
            txv.tips.ShowSimpMsgTips(conf.tipstitle.book, conf.tipscontent.book);
        }
        retObj.onBookSuc(id);
    }
    Live.book.onBookFail = function () {
        if (conf.needShowTips) {
            txv.tips.ShowSimpMsgTips(conf.tipstitle.bookerror, conf.tipscontent.error);
        }
        retObj.onBookFail();
    }
    Live.book.onCancelSuc = function (id) {
        var idx = $j.inArray(id, bookedIdArr);
        if (idx != -1) {
            bookedIdArr[idx] = -1;
        }
        if (conf.needShowTips) {
            txv.tips.ShowSimpMsgTips(conf.tipstitle.cancel, conf.tipscontent.cancel);
        }
        retObj.onCancelSuc(id);
    }
    Live.book.onCancelFail = function () {
        if (conf.needShowTips) {
            txv.tips.ShowSimpMsgTips(conf.tipstitle.cancelerror, conf.tipscontent.error);
        }
        retObj.onCancelFail();
    }
    $j.extend(retObj, {init: function (_conf) {
        $j.extend(conf, _conf);
        Live.book.setConf(conf);
        bindEvent();
        txv.login.addLoginCallback(checkIsBook);
        txv.login.addClearLoginStatusCallback(logout);
        if (txv.login.isLogin()) {
            checkIsBook();
        }
    }, onCancelSuc: function (id) {
        $j("[" + conf.attr + "='" + id + "']").text("预订");
    }, onBookSuc: function (id) {
        $j("[" + conf.attr + "='" + id + "']").text("取消预订");
    }, onIsBookSuc: function (availd) {
        $j.each(availd, function (key, val) {
            if (val && val.id) {
                $j("[" + conf.attr + "='" + val.id + "']").text("取消预订");
            }
        });
    }});
    return retObj;
})();
;
(function ($) {
    $ = $j ? $j : jQuery;
    var cidCounter = 0, DATA_SLIDER_CID = 'data-slider-cid', cachedInstances = {};
    win = $(window);
    function Slider(sle, opts) {
        this.attrs = $.extend({}, {element: sle, triggers: "", panels: "", prev: "", next: "", polish: true, autoPlay: false, pauseOnHover: true, autoPlayPausing: false, interval: 5000, effect: 'none', easing: 'easeOutQuart', duration: 500, circular: true, scrollType: 'x', triggerType: 'click', delay: 300, activeIndex: 0, step: 1, skip: 0, length: 0, viewSize: [], beforeSwitch: null, afterSwitch: null, panelEvent: null, preventDefault: true, activeTriggerClass: 'active', prevDisClass: '', nextDisClass: '', count: 0, lazyStr: 'data-src', ajaxStr: 'data-ajax', panelWidth: null, panelHeight: null}, opts);
        this.cid = uniqueCid();
        this.init();
        return this;
    }

    $.Slider = Slider;
    $.extend(Slider.prototype, {_getDatasetRole: function () {
        var element = this.get('element');
        typeof element == 'string' ? element = $(element) : "";
        this.set('element', element);
        this.element = element;
        var role = {};
        var roles = ['trigger', 'panel', 'nav', 'content', 'prev', 'next'];
        $.each(roles, function (index, key) {
            var elems = $('[data-role=' + key + ']', element);
            if (elems.length) {
                role[key] = elems;
            }
        });
        return role;
    }, _getSize: function (obj) {
        var w = parseInt(obj.outerWidth());
        w += parseInt(obj.css('marginLeft')) || 0 + parseInt(obj.css('marginRight')) || 0;
        var h = parseInt(obj.outerHeight());
        h += parseInt(obj.css('marginTop')) || 0 + parseInt(obj.css('marginBottom')) || 0;
        return[w, h];
    }, _initPanels: function (role) {
        var panels = this.get('panels', true);
        var step = this.get('step');
        if (panels.length > 0) {
        } else if (role.panel) {
            panels = role.panel;
        } else if (role.content) {
            panels = role.content.find('> *');
        }
        if (role.content) {
            this.content = role.content;
        }
        if (panels.length === 0) {
            return false;
        }
        if (!this.content) {
            this.content = panels.parent();
        }
        this.set('panels', panels);
        var viewSize = this.get('viewSize');
        var firstPanel = panels.last();
        var w = this.get('panelWidth') || this._getSize(firstPanel)[0];
        var h = this.get('panelHeight') || this._getSize(firstPanel)[1];
        this.set('panelWidth', w);
        this.set('panelHeight', h);
        if (!viewSize[0]) {
            viewSize[0] = w * step;
            viewSize[1] = h * step;
            this.set('viewSize', viewSize);
        }
        var count = this.get('count');
        if (count && count != step) {
            viewSize[0] = w * count;
            viewSize[1] = h * count;
            this.set('viewSize', viewSize);
        }
        if (!viewSize[0]) {
            throw new Error('Please specify viewSize manually');
        }
        var isX = this.get('scrollType') === 'x';
        var contentDiff = parseInt(isX ? viewSize[0] : viewSize[1], 10);
        var panelDiff = parseInt(isX ? w : h, 10);
        var stepDiff = panelDiff * step;
        count ? "" : count = parseInt(contentDiff / panelDiff, 10);
        var length = Math.ceil((panels.length - count) / step);
        var lastShow = (panels.length - count) % step;
        this.set('length', length);
        this.set('contentDiff', contentDiff);
        this.set('stepDiff', stepDiff);
        this.set('lastShow', lastShow);
        this.set('panelDiff', panelDiff);
        this.set('count', count);
        this.set('prop', isX ? 'marginLeft' : 'marginTop');
        this.set('contentMleft', parseInt(this.content.css('marginLeft')) || 0);
        return true;
    }, reload: function (curstep) {
        var that = this, step = this.get('step'), count = this.get('count'), length = this.get('length'), activeIndex = this.get('activeIndex'), prop = this.get('prop'), panels = this.get('panels'), w = this.get('panelWidth'), h = this.get('panelHeight'), contentMleft = this.get('contentMleft'), panelDiff = this.get('panelDiff'), viewSize = this.get('viewSize');
        if (step == curstep) {
            return;
        }
        viewSize[0] = w * curstep;
        viewSize[1] = h * curstep;
        this.set('viewSize', viewSize);
        this.set('step', curstep);
        this.set('count', curstep);
        var curStepDiff = panelDiff * curstep;
        this.set('stepDiff', curStepDiff);
        this.set('contentDiff', curStepDiff);
        var newLength = Math.ceil((panels.length - curstep) / curstep);
        this.set('length', newLength);
        var curLastShow = (panels.length - curstep) % curstep;
        this.set('lastShow', curLastShow);
        var props = {};
        var leftPanelsCount = Math.abs(Math.ceil(parseInt(that.content.css(prop)) / panelDiff));
        var leftExtra = leftPanelsCount % curstep;
        if (leftExtra) {
            if (leftExtra > Math.floor(curstep / 2)) {
                props[prop] = parseInt(this.content.css(prop)) - panelDiff * (curstep - leftExtra);
            } else {
                props[prop] = parseInt(this.content.css(prop)) + panelDiff * leftExtra;
            }
            this.content.css(props);
        }
        if (length == activeIndex) {
            props[prop] = -contentMleft - panels.length * panelDiff + panelDiff * curstep;
            this.content.css(props);
        }
        var newLeftPanelsCount = Math.abs(Math.ceil(parseInt(that.content.css(prop)) / panelDiff));
        var curActiveIndex = Math.ceil(newLeftPanelsCount / curstep);
        this.set('activeIndex', curActiveIndex);
        if (newLeftPanelsCount > leftPanelsCount) {
            this._loadImg({toPanels: panels.slice(leftPanelsCount + step, newLeftPanelsCount + curstep)});
        }
        if (!this.get('circular')) {
            this._setBtnStatus();
        }
    }, _setBtnStatus: function (index, tag) {
        var prevDisClass = this.get('prevDisClass'), nextDisClass = this.get('nextDisClass'), activeIndex = this.get('activeIndex'), prev = this.get('prev'), next = this.get('next'), length = this.get('length');
        if (!prevDisClass || !nextDisClass) {
            return;
        }
        prev.removeClass(prevDisClass);
        next.removeClass(nextDisClass);
        if (!index && !tag) {
            activeIndex == 0 ? prev.addClass(prevDisClass) : "";
            activeIndex == length ? next.addClass(nextDisClass) : "";
            return;
        }
        if (tag == 'prev' && index == 0) {
            prev.addClass(prevDisClass);
        }
        if (tag == 'next' && index == length) {
            next.addClass(nextDisClass);
        }
    }, _stamp: function () {
        var cid = this.cid;
        this.element.attr(DATA_SLIDER_CID, cid);
        cachedInstances[cid] = this;
    }, _initTriggers: function (role) {
        var triggers = this.get('triggers', true);
        if (triggers.length > 0) {
        }
        else if (role.trigger) {
            triggers = role.trigger;
        } else if (role.nav) {
            triggers = role.nav.find('> *');
        }
        else {
            return false;
        }
        if (role.nav) {
            this.nav = role.nav;
        }
        this.set('triggers', triggers);
        if (!this.nav && triggers.length) {
            this.nav = triggers.parent();
        }
        triggers.each(function (i, trigger) {
            $(trigger).data('value', i);
            $(trigger).attr('hideFocus', true);
        });
        return true;
    }, _initBtns: function (role) {
        var prev = this.get('prev', true);
        var next = this.get('next', true);
        if (prev.length > 0 && next.length > 0) {
        }
        else if (role.prev && role.next) {
            prev = role.prev;
            next = role.next;
        } else {
            return false;
        }
        this.set('prev', prev);
        this.set('next', next);
        prev.attr('hideFocus', true);
        next.attr('hideFocus', true);
        return true;
    }, _bindTriggers: function () {
        var that = this, triggers = this.get('triggers');
        if (this.get('triggerType') === 'click') {
            triggers.click(focus);
        }
        else {
            triggers.hover(focus, leave);
        }
        function focus(ev) {
            that._onFocusTrigger(ev.type, $(this).data('value'));
            if (that.get('preventDefault')) {
                ev.preventDefault();
            }
        }

        function leave() {
            clearTimeout(that._switchTimer);
        }
    }, _onFocusTrigger: function (type, index) {
        var that = this;
        if (type === 'click') {
            this.switchTo(index, type);
        }
        else {
            this._switchTimer = setTimeout(function () {
                that.switchTo(index, type);
            }, this.get('delay'));
        }
    }, _switchTrigger: function (toIndex, fromIndex) {
        var triggers = this.get('triggers'), activeClass = this.get('activeTriggerClass');
        if (triggers.length < 1)return;
        triggers.eq(fromIndex).removeClass(activeClass);
        triggers.eq(toIndex).addClass(activeClass);
    }, _bindBtns: function (role) {
        var prev = this.get('prev'), next = this.get('next'), duration = this.get('duration'), effect = this.get('effect'), that = this;
        effect === 'none' ? duration = 100 : "";
        if (!prev || !next) {
            return;
        }
        prev.bind('click', _prev);
        next.bind('click', _next);
        function _prev(ev) {
            var _this = $(this);
            _this.unbind('click', _prev);
            setTimeout(function () {
                _this.bind('click', _prev);
            }, duration);
            that.prev(ev);
            return false;
        }

        function _next(ev) {
            var _this = $(this);
            _this.unbind('click', _next);
            setTimeout(function () {
                _this.bind('click', _next);
            }, duration);
            that.next(ev);
            return false;
        }
    }, _checkCallback: function (func, opts) {
        var that = this;
        if ($.isFunction(func)) {
            func(that, opts);
        }
    }, _switchTo: function (fromIndex, toIndex, ev) {
        if (fromIndex == toIndex) {
            return
        }
        var that = this;
        var panelInfo = this._getPanelInfo(toIndex, fromIndex);
        var beforeSwitch = this.get('beforeSwitch');
        this._checkCallback(beforeSwitch, panelInfo);
        this._switchTrigger(toIndex, fromIndex);
        $.when(that._switchPanel(panelInfo)).done(_callback);
        function _callback() {
            that._loadImg(panelInfo);
            var afterAllSwitch = that.get('afterAllSwitch');
            that._checkCallback(afterAllSwitch, panelInfo);
            if (!ev) {
                return;
            }
            var afterUserSwitch = that.get('afterUserSwitch');
            that._checkCallback(afterUserSwitch, panelInfo);
            var afterSwitch = that.get('afterSwitch');
            that._checkCallback(afterSwitch, panelInfo);
        }
    }, _loadImg: function (panelInfo) {
        var panels = panelInfo.toPanels;
        if (panels.length > 0) {
            var img = panels.find('img'), lazyStr = this.get('lazyStr');
            img.each(function (i, obj) {
                var src = $(obj).attr(lazyStr);
                if (!obj.src && src) {
                    obj.src = src;
                }
            });
        }
    }, _switchPanel: function (panelInfo) {
        var dtd = $.Deferred();
        var effect = this.get('effect');
        var panels = this.get('panels');
        var toPanels = panelInfo.toPanels;
        var that = this;
        var ajaxStr = this.get('ajaxStr');
        var triggers = this.get('triggers');
        if (triggers.length) {
            var currentTrigger = triggers.eq(panelInfo.toIndex);
            var url = currentTrigger.attr(ajaxStr);
            if (url && !toPanels.data('loaded')) {
                toPanels.load(url, function () {
                    toPanels.data('loaded', true);
                    _callback();
                });
            } else {
                _callback();
            }
        } else {
            _callback();
        }
        function _callback() {
            switch (effect) {
                case'none':
                    panels.hide();
                    toPanels.show();
                    break;
                case"nothing":
                    break;
                case'slide':
                    panels.slideUp();
                    toPanels.slideDown();
                    break;
                case'simFade':
                    panels.hide();
                    toPanels.fadeIn();
                    break;
                case'fade':
                    that._fade(panelInfo);
                    break;
                case'scroll':
                    that._scroll(panelInfo);
                    break;
            }
            dtd.resolve();
        }

        return dtd;
    }, _fade: function (panelInfo) {
        if (this.get('step') > 1) {
            throw new Error('Effect "fade" only supports step === 1');
        }
        var fromPanel = panelInfo.fromPanels.eq(0);
        var toPanel = panelInfo.toPanels.eq(0);
        if (this.anim) {
            this.anim.stop(false, true);
        }
        toPanel.show().css('opacity', 1);
        if (panelInfo.toIndex != panelInfo.fromIndex) {
            var that = this;
            var duration = this.get('duration');
            var easing = this.get('easing');
            this.anim = fromPanel.animate({opacity: 0}, duration, easing, function () {
                that.anim = null;
                toPanel.css('zIndex', 2);
                fromPanel.hide().css('zIndex', 1);
            });
        }
        else {
            toPanel.show().css('zIndex', 2);
        }
    }, _skipTrigger: function (skip, type) {
        var skipIndex = this.get('skipIndex');
        var toIndex;
        if (!skipIndex) {
            this.set('skipIndex', skipIndex = 0);
        }
        var toTrigegrs;
        var triggers = this.get('triggers');
        var c = Math.ceil(triggers.length / skip);
        if (type == 'prev') {
            toIndex = (skipIndex - 1 + c) % c;
        }
        if (type == 'next') {
            toIndex = (skipIndex + 1) % c;
        }
        toTrigegrs = triggers.slice(toIndex * skip, (toIndex + 1) * skip);
        triggers.hide();
        toTrigegrs.show();
        this.set('skipIndex', toIndex);
    }, _getPanelInfo: function (toIndex, fromIndex) {
        var panels = this.get('panels');
        var step = this.get('step');
        var count = this.get('count');
        var lastShow = this.get('lastShow');
        var fromPanels, toPanels;
        var length = this.get('length');
        var polish = this.get('polish');
        lastShow = (toIndex == length ? lastShow : 0);
        polish ? "" : lastShow = 0;
        fromPanels = panels.slice(fromIndex * step, fromIndex * step + count - lastShow);
        toPanels = panels.slice(toIndex * step, toIndex * step + count);
        if (lastShow) {
            toPanels = panels.slice((toIndex - 1) * step + lastShow, (toIndex - 1) * step + lastShow + count);
        }
        return{toIndex: toIndex, fromIndex: fromIndex, toPanels: $(toPanels), fromPanels: $(fromPanels)};
    }, _scroll: function (panelInfo) {
        var toIndex = panelInfo.toIndex;
        var fromIndex = panelInfo.fromIndex;
        if (toIndex == fromIndex) {
            return;
        }
        var contentMleft = this.get('contentMleft');
        var polish = this.get('polish');
        var content = this.content;
        var isX = this.get('scrollType') === 'x';
        var prop = isX ? 'marginLeft' : 'marginTop';
        var stepDiff = this.get('stepDiff');
        var length = this.get('length');
        var count = this.get('count');
        var lastShow = this.get('lastShow');
        var panelDiff = this.get('panelDiff');
        var step = this.get('step');
        var _extra = (lastShow && toIndex == length) ? panelDiff * (step - lastShow) : 0;
        var action = this.get('action');
        polish ? "" : _extra = 0;
        var diff = -stepDiff * toIndex + _extra + contentMleft;
        var props = {};
        props[prop] = diff + 'px';
        if (this.anim) {
            this.anim.stop(false, true);
        }
        if (toIndex == 0 && action == 'next') {
            this.content.css(prop, -stepDiff);
        }
        if (toIndex == length && action == 'prev') {
            this.content.css(prop, diff + stepDiff);
        }
        var duration = this.get('duration');
        var easing = this.get('easing');
        var that = this;
        this.anim = this.content.animate(props, duration, easing, function () {
            that.anim = null;
        });
    }, get: function (str, flag) {
        var res = this.attrs[str];
        return res && flag ? this.get('element').find(res) : res;
    }, set: function (key, value) {
        this.attrs[key] = value;
    }, init: function () {
        var role = this._getDatasetRole();
        if (!this._initPanels(role)) {
            return;
        }
        if (this._initBtns(role)) {
            this._bindBtns(role);
        }
        if (!this.get('circular')) {
            this._setBtnStatus();
        }
        if (this.get('length') < 1) {
            return;
        }
        if (this._initTriggers(role)) {
            this._bindTriggers();
        }
        var index = this.get('activeIndex');
        if (index) {
            this._switchTo(0, index);
        }
        var autoPlay = this.get('autoPlay');
        if (autoPlay && $.autoPlay) {
            $.autoPlay.install.call(this);
        }
        this._stamp();
    }, switchTo: function (toIndex, ev) {
        var fromIndex = this.get('activeIndex');
        this._switchTo(fromIndex, toIndex, ev);
        this.set('activeIndex', toIndex);
    }, prev: function (ev) {
        var fromIndex = this.get('activeIndex'), length = this.get('length'), circular = this.get('circular'), prev = this.get('prev');
        var index = (fromIndex - 1 + length + 1) % (length + 1);
        if (!circular) {
            if (index == length) {
                return;
            }
            this._setBtnStatus(index, 'prev');
        }
        this.set('action', 'prev');
        var skip = this.get('skip');
        if (ev && skip) {
            this._skipTrigger(skip, 'prev');
            return;
        }
        this.switchTo(index, ev);
    }, next: function (ev) {
        var fromIndex = this.get('activeIndex'), length = this.get('length'), circular = this.get('circular'), next = this.get('next');
        var index = (fromIndex + 1) % (length + 1);
        if (!circular) {
            if (index == 0) {
                return;
            }
            this._setBtnStatus(index, 'next');
        }
        this.set('action', 'next');
        var skip = this.get('skip');
        if (skip && (ev || (index % skip == 0))) {
            this._skipTrigger(skip, 'next');
        }
        if (skip && ev) {
            return;
        }
        this.switchTo(index, ev);
    }, destroy: function () {
        if (this.get('autoPlay') && $.autoPlay) {
            $.autoPlay.destroy.call(this);
        }
        erase(this.cid, cachedInstances);
        this.element.remove();
    }});
    function erase(target, array) {
        for (var i = 0; i < array.length; i++) {
            if (target === array[i]) {
                array.splice(i, 1);
                return array;
            }
        }
    }

    $.fn.extend({Slider: function (opts) {
        var rs = [];
        this.each(function () {
            var $this = $(this);
            var op = {};
            op.hot = $this.attr('data-exp') || '';
            op.activeIndex = parseInt($this.attr("data-activeIndex")) || 0;
            op.triggerType = $this.attr("data-triggerType") || "click";
            op.step = $this.attr('data-step');
            opts ? "" : opts = {};
            op = $.extend(op, opts);
            rs.push(new Slider($(this), op));
        });
        return rs;
    }});
    $.Slider.query = function (selector) {
        var element = $(selector).eq(0);
        var cid;
        element && (cid = element.attr(DATA_SLIDER_CID));
        return cachedInstances[cid];
    }
    $.autoPlay = {install: function () {
        var element = this.get('element');
        var EVENT_NS = '.' + this.cid;
        var timer;
        var interval = this.get('interval');
        var that = this;
        start();
        function start() {
            stop();
            that.paused = false;
            timer = setInterval(function () {
                if (that.get('autoPlayPausing')) {
                    that.paused = true;
                } else {
                    that.paused = false;
                }
                if (that.paused)return;
                that.next();
            }, interval);
        }

        function stop() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
            that.paused = true;
        }

        this.stop = stop;
        this.start = start;
        this._scrollDetect = throttle(function () {
            that[isInViewport(element) ? 'start' : 'stop']();
        });
        win.on('scroll' + EVENT_NS, this._scrollDetect);
        if (this.get('pauseOnHover')) {
            element.hover(stop, start);
        }
        this._scrollDetect();
    }, destroy: function () {
        var EVENT_NS = '.' + this.cid;
        this.stop && this.stop();
        if (this._scrollDetect) {
            this._scrollDetect.stop();
            win.off('scroll' + EVENT_NS);
        }
    }};
    function uniqueCid() {
        return'slider-' + cidCounter++;
    }

    function throttle(fn, ms) {
        ms = ms || 200;
        var throttleTimer;

        function f() {
            f.stop();
            throttleTimer = setTimeout(fn, ms);
        }

        f.stop = function () {
            if (throttleTimer) {
                clearTimeout(throttleTimer);
                throttleTimer = 0;
            }
        };
        return f;
    }

    function isInViewport(element) {
        var scrollTop = win.scrollTop();
        var scrollBottom = scrollTop + win.height();
        var elementTop = element.offset().top;
        var elementBottom = elementTop + element.height();
        return elementTop < scrollBottom && elementBottom > scrollTop;
    }

    $.justScroll = function JustScroll(sle, op) {
        this.speed = op.speed || 4;
        this.prevDisClass = 'arrow_left_disable';
        this.nextDisClass = 'arrow_right_disable';
        this.element = $(sle);
        for (var key in op) {
            this[key] = op[key];
        }
        this.init();
    }
    var requestAFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
            return window.setTimeout(callback, 16);
        };
    })(), cancelAFrame = (function () {
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (rid) {
            window.clearTimeout(rid);
        };
    })(), isSupportAFrame = function () {
        return(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame) !== undefined;
    }();
    $.extend($.justScroll.prototype, {init: function () {
        this.prev = this.element.find(this.prev);
        this.next = this.element.find(this.next);
        this.panels = this.element.find(this.panels);
        this.content = this.panels.first().parent();
        this.length = this.panels.length;
        this.status = 'stop';
        this.width = (this.panelWidth ? this.panelWidth : this.getWidth(this.panels.first())) * (this.length - this.step);
        this.idx = 1;
        this.px = 2;
        this.bindBtns();
    }, getWidth: function (obj) {
        var w = parseInt(obj.outerWidth());
        w += parseInt(obj.attr('marginLeft')) || 0 + parseInt(obj.attr('marginRight')) || 0;
        return w;
    }, pageMoveOn: function () {
        var self = this;
        self.interval = requestAFrame($.proxy(self.moveOn, self));
    }, pageMoveOut: function () {
        var self = this;
        cancelAFrame(self.interval);
    }, moveOn: function () {
        var self = this;
        var ul = self.content.get(0);
        var l = parseInt(ul.style.left, 10) || 0;
        if (self.status === 'stop') {
            return;
        }
        if (l == 0 && self.status === 'left') {
            self.prev.addClass(self.prevDisClass);
            return;
        }
        if (-l == self.width && self.status === 'right') {
            self.next.addClass(self.nextDisClass);
            return;
        }
        self.idx++;
        if (self.idx % 2 !== 0 && !isSupportAFrame) {
            requestAFrame($.proxy(self.moveOn, self));
            return;
        }
        self.idx = 1;
        if (self.status === 'left' && l < 0) {
            ul.style.left = l + self.px + 'px';
        } else if (self.status === 'right' && -l < self.width) {
            ul.style.left = l - self.px + 'px';
        }
        requestAFrame($.proxy(self.moveOn, self));
    }, bindBtns: function () {
        var self = this, prev = this.prev.get(0), next = this.next.get(0), ele = this.element.get(0);
        prev.onmouseover = function () {
            self.status = "left";
            $(next).removeClass('arrow_right_disable');
        };
        prev.onmouseout = function () {
            self.status = "stop";
        };
        next.onmouseover = function () {
            $(prev).removeClass('arrow_left_disable');
            self.status = "right";
        };
        next.onmouseout = function () {
            self.status = "stop";
        };
        ele.onmouseover = function () {
            clearTimeout(self.rec_out);
            self.rec_hover = setTimeout($.proxy(self.pageMoveOn, self), 1);
        };
        ele.onmouseout = function () {
            clearTimeout(self.rec_hover);
            self.rec_out = setTimeout($.proxy(self.pageMoveOut, self), 1);
        };
    }});
    $.easing['jswing'] = $.easing['swing'];
    $.extend(jQuery.easing, {def: 'easeOutQuad', easeOutQuart: function (x, t, b, c, d) {
        return-c * ((t = t / d - 1) * t * t * t - 1) + b;
    }});
})($j);
;
(function ($) {
    var CONFIG = {options: {axis: 'y', wheel: 40, scroll: true, lockscroll: true, size: 'auto', sizethumb: 'auto', invertscroll: false, disableClass: 'btn-disabled'}};
    $.fn.sly = function (params) {
        var options = $.extend({}, CONFIG.options, params);
        this.each(function () {
            $(this).data('tsb', new Scrollbar($(this), options));
        });
        return this;
    };
    $.fn.sly_reload = function (sScroll) {
        var sbar = $(this).data('tsb');
        if (sbar) {
            return sbar.update(sScroll);
        }
    };
    function Scrollbar(root, options) {
        var oSelf = this, oWrapper = root, oViewport = {obj: $('.viewport', root)}, oContent = {obj: $('.overview', root)}, oScrollbar = {obj: $('.scrollbar', root)}, oTrack = {obj: $('.track', oScrollbar.obj)}, oThumb = {obj: $('.handle', oScrollbar.obj)}, sAxis = options.axis === 'x', sDirection = sAxis ? 'left' : 'top', sSize = sAxis ? 'Width' : 'Height', iScroll = 0, iPosition = {start: 0, now: 0}, iMouse = {}, touchEvents = 'ontouchstart'in document.documentElement;

        function initialize() {
            oSelf.update();
            setEvents();
            return oSelf;
        }

        this.update = function (sScroll) {
            oViewport[options.axis] = !sAxis ? oViewport.obj.height() : oViewport.obj.width();
            oContent[options.axis] = !sAxis ? oContent.obj.height() : oContent.obj.width();
            oContent.ratio = oViewport[options.axis] / oContent[options.axis];
            oScrollbar.obj.toggleClass(CONFIG.options.disableClass, oContent.ratio >= 1);
            oTrack[options.axis] = options.size === 'auto' ? oViewport[options.axis] : options.size;
            oThumb[options.axis] = Math.min(oTrack[options.axis], Math.max(0, (options.sizethumb === 'auto' ? (oTrack[options.axis] * oContent.ratio) : options.sizethumb)));
            oScrollbar.ratio = options.sizethumb === 'auto' ? (oContent[options.axis] / oTrack[options.axis]) : (oContent[options.axis] - oViewport[options.axis]) / (oTrack[options.axis] - oThumb[options.axis]);
            iScroll = (sScroll === 'relative' && oContent.ratio <= 1) ? Math.min((oContent[options.axis] - oViewport[options.axis]), Math.max(0, iScroll)) : 0;
            iScroll = (sScroll === 'bottom' && oContent.ratio <= 1) ? (oContent[options.axis] - oViewport[options.axis]) : isNaN(parseInt(sScroll, 10)) ? iScroll : parseInt(sScroll, 10);
            setSize();
        };
        function setSize() {
            var sCssSize = sSize.toLowerCase();
            oThumb.obj.css(sDirection, iScroll / oScrollbar.ratio);
            oContent.obj.css(sDirection, -iScroll);
            iMouse.start = oThumb.obj.offset()[sDirection];
            oScrollbar.obj.css(sCssSize, oTrack[options.axis]);
            oTrack.obj.css(sCssSize, oTrack[options.axis]);
            oThumb.obj.css(sCssSize, oThumb[options.axis]);
        }

        function setEvents() {
            if (!touchEvents) {
                oThumb.obj.bind('mousedown', start);
                oTrack.obj.bind('mouseup', drag);
            }
            else {
                oViewport.obj[0].ontouchstart = function (event) {
                    if (1 === event.touches.length) {
                        start(event.touches[0]);
                        event.stopPropagation();
                    }
                };
            }
            if (options.scroll && window.addEventListener) {
                oWrapper[0].addEventListener('DOMMouseScroll', wheel, false);
                oWrapper[0].addEventListener('mousewheel', wheel, false);
            }
            else if (options.scroll) {
                oWrapper[0].onmousewheel = wheel;
            }
        }

        function start(event) {
            $("body").addClass("noSelect");
            var oThumbDir = parseInt(oThumb.obj.css(sDirection), 10);
            iMouse.start = sAxis ? event.pageX : event.pageY;
            iPosition.start = oThumbDir == 'auto' ? 0 : oThumbDir;
            if (!touchEvents) {
                $(document).bind('mousemove', drag);
                $(document).bind('mouseup', end);
                oThumb.obj.bind('mouseup', end);
            }
            else {
                document.ontouchmove = function (event) {
                    event.preventDefault();
                    drag(event.touches[0]);
                };
                document.ontouchend = end;
            }
        }

        function wheel(event) {
            if (oContent.ratio < 1) {
                var oEvent = event || window.event, iDelta = oEvent.wheelDelta ? oEvent.wheelDelta / 120 : -oEvent.detail / 3;
                iScroll -= iDelta * options.wheel;
                iScroll = Math.min((oContent[options.axis] - oViewport[options.axis]), Math.max(0, iScroll));
                oThumb.obj.css(sDirection, iScroll / oScrollbar.ratio);
                oContent.obj.css(sDirection, -iScroll);
                if (options.lockscroll || (iScroll !== (oContent[options.axis] - oViewport[options.axis]) && iScroll !== 0)) {
                    oEvent = $.event.fix(oEvent);
                    oEvent.preventDefault();
                }
            }
        }

        function drag(event) {
            if (oContent.ratio < 1) {
                if (options.invertscroll && touchEvents) {
                    iPosition.now = Math.min((oTrack[options.axis] - oThumb[options.axis]), Math.max(0, (iPosition.start + (iMouse.start - (sAxis ? event.pageX : event.pageY)))));
                }
                else {
                    iPosition.now = Math.min((oTrack[options.axis] - oThumb[options.axis]), Math.max(0, (iPosition.start + ((sAxis ? event.pageX : event.pageY) - iMouse.start))));
                }
                iScroll = iPosition.now * oScrollbar.ratio;
                oContent.obj.css(sDirection, -iScroll);
                oThumb.obj.css(sDirection, iPosition.now);
            }
        }

        function end() {
            $("body").removeClass("noSelect");
            $(document).unbind('mousemove', drag);
            $(document).unbind('mouseup', end);
            oThumb.obj.unbind('mouseup', end);
            document.ontouchmove = document.ontouchend = null;
        }

        return initialize();
    }
}(jQuery));
;
;
(function ($) {
    Live.txv.liveComment = {init: function () {
        cmt_id = parseInt(ChannelInfo.commentid) || 0;
        if (cmt_id < 1) {
            return;
        }
        window.registerCoralEvent = {type: 'live', height: 550, loginEvent: function () {
            txv.login.openLogin();
        }, publicLogined: function () {
            var uin = txv.login.getUin(), nick = txv.login.getNick(), headUrl = txv.login.getAvatar();
            document.getElementById('commentIframe').contentWindow.publicLogined(uin, nick, headUrl);
        }, publicLogout: function () {
            var cWin = document.getElementById('commentIframe').contentWindow;
            typeof cWin.publicLogout != 'undefined' ? cWin.publicLogout() : "";
        }};
        txv.login.addLoginCallback(registerCoralEvent.publicLogined);
        txv.login.addClearLoginStatusCallback(registerCoralEvent.publicLogout);
        var coral_np_frame = document.getElementById('np_frame');
        var coral_myScript = document.createElement("script");
        coral_myScript.type = "text/javascript";
        coral_myScript.src = "http://mat1.gtimg.com/www/niuping2013/coralVideo.js?v" + new Date().getDate();
        coral_np_frame.appendChild(coral_myScript);
    }}
})($j);
;
;
(function ($) {
    var op = {sle: "[data-bookid='{id}']", style: 'bookstyle', ico: {unbook: 'ico_unscheduled', book: 'ico_scheduled'}, btn: {unbook: 'btn_unreserve', book: 'btn_reserve'}, text: {unbook: '取消关注', book: '关注', booked: '已关注'}, book: function (id, bool) {
        var obj = $(op.sle.replace('{id}', id)), ico = obj.siblings('i'), style = obj.data(op.style);
        if (!bool) {
            style && obj.removeClass(op.btn.book).addClass(op.btn.unbook);
            obj.text(op.text.book);
            if (ico.length) {
                obj.unbind('mouseover');
                obj.unbind('mouseout');
                ico.removeClass(op.ico.book).addClass(op.ico.unbook);
            }
        } else {
            style && obj.removeClass(op.btn.unbook).addClass(op.btn.book);
            obj.text(op.text.booked);
            if (ico.length) {
                obj.bind('mouseover', function () {
                    obj.text(op.text.unbook);
                });
                obj.bind('mouseout', function () {
                    obj.text(op.text.booked);
                });
                ico.removeClass(op.ico.unbook).addClass(op.ico.book);
            }
        }
    }};
    $.extend(txv.book, {onCancelSuc: function (id) {
        op.book(id, false);
    }, onBookSuc: function (id) {
        op.book(id, true);
    }, onIsBookSuc: function (availd) {
        $.each(availd, function (key, val) {
            if (val && val.id) {
                op.book(val.id, true);
            }
        });
    }});
})($j);
;
(function ($) {
    var CONFIG = {screenClass: "page_normal_width", hoversle: ".j_wanthover", hoverClass: "li_hover", playerSize: [
        [1230, 550],
        [900, 550],
        [990, 403],
        [660, 403]
    ], wondercgi: "http://sns.video.qq.com/fcgi-bin/rmd_keyword?kw={keyword}&type=6&otype=json", numcgi: "http://zb.fp.qq.com/commdatav2?cmd=3&channel_id={playid}"};
    $.fn.extend({hoverClass: function (className, speed) {
        var _className = className || CONFIG.hoverClass;
        return this.each(function () {
            var $this = $(this), mouseOutTimer;
            $this.hover(function () {
                if (mouseOutTimer)clearTimeout(mouseOutTimer);
                $this.addClass(_className);
            }, function () {
                mouseOutTimer = setTimeout(function () {
                    $this.removeClass(_className);
                }, speed || 10);
            });
        });
    }});
    Live.txv.liveCommon = {userVipStatus: -1, init: function (op) {
        this.initStyle();
        this.fixCurrentNav(op);
        txv.common.initPage();
        this.initTab();
        this.initScrollBar();
        this.fillWonderful();
        this.initHover();
    }, initStyle: function () {
        var self = this, btn = $('#playerExpandBtn');
        $(window).resize(function () {
            onresize();
        });
        function onresize() {
            var w = $(this).width();
            w > 1240 ? $('body').removeClass(CONFIG.screenClass) : $('body').addClass(CONFIG.screenClass);
            self.resizePlayer(btn.hasClass('fold') ? true : false);
        }

        onresize();
    }, initHover: function (hoversle, hoverClass) {
        $(hoversle || CONFIG.hoversle).hoverClass(hoverClass);
    }, fixHover: function (sle) {
        if (!sle) {
            return;
        }
        $(sle).on('mouseover mouseout', '.j_wanthover', function (e) {
            var btn = $(e.currentTarget).find('.button');
            btn.is(":hidden") ? btn.show() : btn.hide();
        });
    }, fixCurrentNav: function (op) {
        if (op && op.navcurrent) {
            $('#navigation_live_area a').each(function (i, obj) {
                var cateid = $(obj).data('cateid'), title = $(obj).data('title');
                if (title && title == op.navcurrent || cateid == op.navcurrent) {
                    $(obj).addClass('current');
                    return;
                }
            });
        }
    }, initVideo: function () {
        var defer = $.Deferred();
        if ($('#mod_player').length < 1) {
            defer.reject();
            return;
        }
        var isUseHtml5 = typeof tvp != "undefined" ? tvp.common.isUseHtml5() : false;
        var isDone = false;
        setTimeout(function () {
            if (!isDone) {
                defer.reject();
            }
        }, 2000);
        var size = this.getPlayerSize(true);
        var video = new tvp.VideoInfo();
        video.setChannelId(ChannelInfo.playid);
        video.setChannelExtParam({channelid: ChannelInfo.channelid, channelname: ChannelInfo.channelname});
        ChannelInfo.video = video;
        ChannelInfo.player = new tvp.Player();
        ChannelInfo.player.create({width: size[0], height: size[1], video: video, modId: "mod_player", autoplay: true, playerType: isUseHtml5 ? 'html5' : 'flashLive', flashWmode: 'opaque', type: 1, onwrite: function () {
            isDone = true;
            defer.resolve();
        }, onerror: function () {
            isDone = true;
            defer.reject();
        }});
        Live.login.addLoginCallback(function () {
            if (typeof ChannelInfo.player.flashobj.adLoginCallback == 'function') {
                ChannelInfo.player.flashobj.adLoginCallback(txv.login.getUin());
            }
        });
        this.bindPlayerExpand();
        return defer;
    }, getPlayerSize: function (isFold) {
        var size = CONFIG.playerSize[0], w = $(window).width();
        if (typeof ChannelInfo !== 'undefined') {
            var cateid = ChannelInfo.cateid;
            var cmd_id = parseInt(ChannelInfo.commentid);
            if (cateid != 2 && cmd_id < 1) {
                size = w > 1240 ? CONFIG.playerSize[0] : CONFIG.playerSize[2];
            } else if (isFold) {
                size = w > 1240 ? CONFIG.playerSize[1] : CONFIG.playerSize[3];
            } else {
                size = w > 1240 ? CONFIG.playerSize[0] : CONFIG.playerSize[2];
            }
        }
        return size;
    }, resizePlayer: function (isFold) {
        var size = this.getPlayerSize(isFold);
        if (typeof ChannelInfo !== 'undefined' && ChannelInfo.player) {
            ChannelInfo.player.resize(size[0], size[1]);
        }
    }, bindPlayerExpand: function () {
        var self = this, cmd_id = parseInt(ChannelInfo.commentid), box = $('#playerExpandBox'), btn = $('#playerExpandBtn');
        if (cmd_id < 1 && ChannelInfo.cateid != 2) {
            box.hide();
            btn.parent().hide();
            return;
        }
        if (btn.length > 0 && box.length > 0) {
            btn.click(function () {
                if ($(this).hasClass('fold')) {
                    box.hide();
                    $(this).removeClass('fold').addClass('unfold');
                    self.resizePlayer(false);
                } else {
                    box.show();
                    $(this).removeClass('unfold').addClass('fold');
                    self.resizePlayer(true);
                }
            });
        }
    }, initTab: function (sle, op) {
        if (!$.Slider) {
            return;
        }
        sle = sle || '.j_tabshow';
        var options = $.extend({triggerType: 'hover', activeTriggerClass: 'currentNav', lazyStr: 'data-src', afterSwitch: function (obj, panelInfo) {
            $(panelInfo.toPanels).sly_reload();
            var hot = obj.get('hot');
            hot ? Live.tj2.hot(hot + '.' + panelInfo.toIndex) : "";
        }}, op);
        sle = (typeof sle == "string") ? $(sle) : sle;
        sle.Slider(options);
    }, initScrollBar: function () {
        var $section = $j("#j_scrollbox");
        if (!$.fn.sly || $section.length < 1) {
            return;
        }
        $section.find("[data-role=panel]").each(function (i, e) {
            $(e).sly();
            $(window).resize(function () {
                $(e).sly_reload();
            });
            setTimeout(function () {
                $(e).sly_reload();
            }, 500);
        });
    }, fixday: function () {
        $('.j_fixday').each(function (i, obj) {
            var date = $(obj).data('date').slice(0, 10), str = "", now = new Date(), now_month = now.getMonth() + 1, now_day = now.getDate();

            function NewDate(s) {
                s = s.split('-');
                var date = new Date();
                date.setUTCFullYear(s[0], s[1] - 1, s[2]);
                date.setUTCHours(0, 0, 0, 0);
                return date;
            }

            try {
                var cdate = new Date(date);
                if (isNaN(cdate)) {
                    cdate = NewDate(date);
                }
                var cmonth = cdate.getMonth() + 1, cday = cdate.getDate(), d = cdate.getDay();
                if (now_month == cmonth && now_day == cday) {
                    $(obj).addClass('today');
                }
                switch (d) {
                    case 0:
                        str = "周日";
                        break;
                    case 1:
                        str = "周一";
                        break;
                    case 2:
                        str = "周二";
                        break;
                    case 3:
                        str = "周三";
                        break;
                    case 4:
                        str = "周四";
                        break;
                    case 5:
                        str = "周五";
                        break;
                    case 6:
                        str = "周六";
                        break;
                }
            } catch (e) {
            }
            $(obj).find('[data-role=day]').html(str);
        });
    }, fixProgramIn2Day: function () {
        var todayList = $('#today_list'), yesterdayList = $('#yesterday_list'), todayli = todayList.find('li'), now = new Date(), yesterdayHtml = "", nowdate = parseInt([now.getFullYear(), now.getMonth() + 1, now.getDate() > 9 ? now.getDate() : '0' + now.getDate()].join(''));
        todayli.each(function (i, obj) {
            var date = $(obj).data('date');
            date ? date = parseInt(date.slice(0, 10).split('-').join('')) : "";
            if (date && date < nowdate) {
                var d = $('<div></div>').append($(obj).clone());
                yesterdayHtml += d.html();
                $(obj).hide();
                d.remove();
            }
        });
        if (yesterdayHtml) {
            yesterdayList.find('ul').html(yesterdayHtml);
            yesterdayList.show();
        }
    }, fixBook: function (conf) {
        var op = $.extend({t: 0, needShowTips: false}, conf);
        txv.book.init(op);
    }, replaceUrl: function (url) {
        url = url || document.location.href;
        url = url.split('#');
        if (url.length > 1) {
            url[0] = $.util.setUrlParam('_', parseInt(10000 * Math.random()), url[0]);
            url = url[0] + '#' + url[1];
        } else {
            url = url[0];
        }
        location.replace(url);
    }, checkIsVIP: function (noRepalce) {
        txv.vip.checkIsVip(true).done(function (json) {
            if (json && json.vip == 1) {
                Live.txv.liveCommon.userVipStatus = 2;
                !noRepalce ? Live.txv.liveCommon.replaceUrl() : "";
            } else {
                Live.txv.liveCommon.userVipStatus = 1;
            }
        }).fail(function () {
            if (Live.login.isLogin()) {
                Live.txv.liveCommon.userVipStatus = 1;
            } else {
                Live.txv.liveCommon.userVipStatus = 0;
            }
        });
    }, fixNum: function () {
        $('.online_num').each(function (i, obj) {
            var playid = $(obj).data('playid');
            $.ajax({url: CONFIG.numcgi.replace('{playid}', playid), dataType: "jsonp", jsonCache: 600, success: function (json) {
                if (json && json.ret == 0) {
                    $(obj).text(json.online + '人在看');
                } else {
                    $(obj).text(parseInt(100 * Math.random()) + '人在看');
                }
            }, error: function (xhr, status, error) {
                $(obj).text(parseInt(100 * Math.random()) + '人在看');
            }});
        });
    }, fixClick: function (boxsle, sle) {
        $(boxsle).on('click', sle, function (e) {
            var url = $(e.currentTarget).attr('href');
            url ? location.href = url : "";
        })
    }, fillWonderful: function () {
        if (!(typeof ChannelInfo !== 'undefined' && ChannelInfo.keyword)) {
            callback();
            return;
        }
        function callback(json) {
            if (json && json.msg == 'OK' && json.videos && json.videos.length > 0) {
                txv.template.fillHtml(json, "wonderful_tpl", "wonderful_list", true, txv.template.MODIFIERS, txv.template.FILL_TYPE.TPL_ID, function () {
                });
            } else {
                $('#wonderful_title').hide();
            }
        }

        $.ajax({url: CONFIG.wondercgi.replace('{keyword}', encodeURIComponent(ChannelInfo.keyword)), dataType: "jsonp", jsonCache: 600, data: {size: 12}, success: function (json) {
            callback(json);
        }, error: function (xhr, status, error) {
            callback();
        }});
    }};
})($j);
;
(function ($) {
    Live.txv.liveTvList = {op: {listcgi: 'http://data.v.qq.com/live/api/category/2/channel/query?client=web&with_current_program=1&with_next_programs=1&with_prefix_letter=1&sorty_by=recommend'}, init: function (op) {
        var self = this;
        Live.txv.liveCommon.init(op);
        this.filldata();
        Live.txv.liveCommon.fixBook();
        Live.txv.liveCommon.fixHover('#j_channelist');
    }, filldata: function (json) {
        try {
            var databoxs = $('#j_channelist').find('[data-role=databox]');
            if (!json) {
                json = $('#alldata_tpl').html();
                json = $.trim(json);
                json = $.parseJSON(json);
            } else if (json === 'none') {
                return;
            }
            if (!json) {
                return;
            }
            var _array = [];
            $.each(json.index, function (i, o) {
                _array[i] = {"data": []};
                $.each(json.items, function (j, obj) {
                    if (o == obj.letter) {
                        _array[i].data.push(obj);
                    }
                });
                txv.template.fillHtml(_array[i], "list_tpl", databoxs[i + 1], true, txv.template.MODIFIERS, txv.template.FILL_TYPE.TPL_ID, function () {
                    databoxs.eq(i + 1).find('.j_wanthover').hoverClass('li_hover');
                });
            });
        } catch (e) {
        }
    }};
})($j);
;
(function ($) {
    Live.txv.liveTvPlay = {op: {channelList: 'http://v.qq.com/inc/live/tv_channels.html', programCgi: 'http://v.qq.com/live/tv/program/{id}.html', getTimeCgi: 'http://data.v.qq.com/live/api/channel/{id}/program/foreshow?client=web&time=24hours&with_current=1'}, init: function (op) {
        var that = this;
        var cid = this._getUrlParam();
        if (cid) {
            this.fixUrl(cid);
        }
        Live.txv.liveCommon.initVideo().then(after, after);
        function after() {
            Live.txv.liveCommon.init(op);
            that.fixCurrent();
            that.bindPlay();
            Live.txv.liveCommon.fixBook();
            Live.txv.liveCommon.fixHover('#tv_program_list');
            that.autoUpdate();
            Live.txv.liveCommon.checkIsVIP(true);
            Live.login.addLoginCallback(Live.txv.liveCommon.checkIsVIP);
        }
    }, fixCurrent: function () {
        var box = $('#playerExpandBox'), tab = box.find('.j_tabshow'), slider = $.Slider.query(tab), li = tab.find('li'), index = 0, currentLi = '';
        li.each(function (i, obj) {
            if ($(obj).data('key') == ChannelInfo.channelid) {
                currentLi = $(obj);
                currentLi.addClass('select');
                return false;
            }
        });
        if (currentLi.length) {
            this.fixTitle(currentLi);
            index = currentLi.data('index');
            var _li = currentLi.clone();
            var _ul = currentLi.parent();
            currentLi.remove();
            _li.prependTo(_ul);
            slider.switchTo(index);
        }
    }, fixUrl: function (channelid) {
        var self = this;
        if (channelid) {
            var li = $('#playerExpandBox').find('li');
            li.each(function (i, obj) {
                var key = $(obj).data('key');
                if (key == channelid) {
                    self.switchChannel($(obj));
                    return false;
                }
            });
        }
    }, _getUrlParam: function () {
        var channelid = location.href.split('#');
        if (channelid.length > 1 && channelid != ChannelInfo.channelid) {
            channelid = parseInt(channelid[1]);
        } else {
            return false;
        }
        return channelid;
    }, _setUrlParam: function (id) {
        var url = location.href.split('#')[0];
        url += '#' + id;
        location.href = url;
    }, bindPlay: function () {
        var box = $('#playerExpandBox');
        var self = this;
        box.on('click', 'li', function (e) {
            self.switchChannel($(e.currentTarget));
        });
    }, switchChannel: function (li) {
        var playid = li.data('playid').toString();
        ChannelInfo.channelid = li.data('key');
        ChannelInfo.channelname = li.data('cname');
        ChannelInfo.playid = playid;
        var box = $('#playerExpandBox');
        if (ChannelInfo.player) {
            ChannelInfo.video.setChannelId(playid);
            ChannelInfo.video.setChannelExtParam({channelid: ChannelInfo.channelid, channelname: ChannelInfo.channelname});
            ChannelInfo.player.play(ChannelInfo.video);
        }
        box.find('li').removeClass('select');
        li.addClass('select');
        this.fixTitle(li);
        var id = li.data('key');
        this.changeProgramList(id);
        this._setUrlParam(id);
    }, fixTitle: function (li) {
        var cname = li.data('cname');
        var pname = li.data('pname');
        $('#channel_name').html(cname + '-' + pname);
    }, changeProgramList: function (id) {
        id = id || ChannelInfo.channelid;
        var url = this.op.programCgi.replace('{id}', id);
        $.ajax({url: url, type: 'post', data: {_: new Date().getTime()}, success: function (rs) {
            if (rs) {
                var listbox = $('#tv_program_list');
                listbox.html(rs);
                Live.txv.liveCommon.fixBook();
                listbox.find('.j_wanthover').hoverClass();
            }
        }, error: function (xhr, status, error) {
        }});
    }, updateChannelList: function () {
        var self = this, url = this.op.channelList, box = $('#playerExpandBox'), tab = box.find('.j_tabshow'), slider = $.Slider.query(tab);

        function cb() {
            Live.txv.liveCommon.initTab();
            Live.txv.liveCommon.initScrollBar();
            self.fixCurrent();
        }

        $.ajax({url: url, type: 'post', data: {_: new Date().getTime()}, success: function (rs) {
            if (rs) {
                slider.destroy();
                box.html(rs);
                cb();
            }
        }, error: function (xhr, status, error) {
        }});
    }, autoUpdate: function () {
        var self = this;
        setInterval(function () {
            self.changeProgramList();
            self.updateChannelList();
        }, 300 * 1000);
    }};
})($j);
;
(function ($) {
    Live.txv.liveGameList = {init: function (op) {
        Live.txv.liveCommon.fixProgramIn2Day();
        Live.txv.liveCommon.init(op);
        Live.txv.liveCommon.fixday();
        Live.txv.liveCommon.fixNum();
        Live.txv.liveCommon.fixBook();
        Live.txv.liveCommon.fixClick('#game_list', 'li');
    }};
})($j);
;
(function ($) {
    Live.txv.liveGamePlay = {init: function (op) {
        var that = this;
        Live.txv.liveCommon.initVideo().then(after, after);
        function after() {
            Live.txv.liveCommon.init(op);
            that.fixhot();
            Live.txv.liveCommon.fixBook();
            Live.txv.liveComment.init();
            Live.txv.liveCommon.fixClick('#game_recommend', 'li');
            Live.txv.liveCommon.checkIsVIP(true);
            Live.login.addLoginCallback(Live.txv.liveCommon.checkIsVIP);
        }
    }, fixhot: function () {
        var pid = ChannelInfo.currentid;
        if (!pid) {
            return;
        }
        var cid = ChannelInfo.channelid;
        var _li = '';
        var li = $('#game_recommend').find('li');
        li.each(function (i, obj) {
            var _cid = $(obj).data('channelid');
            var _pid = $(obj).data('id');
            if (_cid == cid && _pid == pid) {
                _li = $(obj);
                return;
            }
        });
        if (_li) {
            li.show();
            _li.hide();
        }
    }};
})($j);
;
(function ($) {
    Live.txv.liveEventPlay = {init: function (op) {
        Live.txv.liveCommon.initVideo().then(after, after);
        function after() {
            Live.txv.liveCommon.init(op);
            Live.txv.liveComment.init();
            Live.txv.liveCommon.checkIsVIP(true);
            Live.login.addLoginCallback(Live.txv.liveCommon.checkIsVIP);
        }
    }};
})($j);
;
(function ($) {
    function fixGoalCallback(json) {
        var items = $('#sport_list').find('.pe_item');
        items.each(function (i, obj) {
            var date = $(obj).data('date'), data = "";
            if (date) {
                date = date.split('-').join('');
            } else {
                return;
            }
            $.each(json, function (j, o) {
                if (o[date]) {
                    data = o[date];
                }
            });
            if (data) {
                var li = $(obj).find('li');
                li.each(function (i, o) {
                    var goal = $(o).find('[data-role=goal]'), support = $(o).find('[data-role=support]'), mid = $(o).data('mid'), cid = $(o).data('cid');
                    if (support.length > 1) {
                        $.each(data, function (j, cur) {
                            if (cur.matchId == mid && cur.competitionId == cid) {
                                if (cur.cateId != 2) {
                                    support.eq(0).html(cur.whsupport || 0);
                                    support.eq(1).html(cur.wasupport || 0);
                                    goal.length > 0 ? goal.html(cur.homeGoal + ":" + cur.awayGoal) : "";
                                } else {
                                    support.eq(0).html(cur.wasupport || 0);
                                    support.eq(1).html(cur.whsupport || 0);
                                    goal.length > 0 ? goal.html(cur.awayGoal + ":" + cur.homeGoal) : "";
                                }
                                $(o).data('hasSupport', true);
                            }
                        });
                    }
                });
            }
        });
    }

    Live.txv.liveSportList = {op: {goalcgi: "http://sportswebapi.qq.com/videoPadMatch/list?deviceId=video_12345&isUpdate=0", supportcgi: "http://sportswebapi.qq.com/user/support?competitionId={cid}&matchId={mid}&type={type}"}, init: function (op) {
        var self = this;
        Live.txv.liveCommon.fixProgramIn2Day();
        this.fixJump();
        Live.txv.liveCommon.fixClick('#sport_list', 'li');
        Live.txv.liveCommon.init(op);
        Live.txv.liveCommon.fixday();
        Live.txv.liveCommon.fixNum();
        Live.txv.liveCommon.fixBook({container: '#sport_list_inner'});
        this.fixGoal();
        this.initSupport();
        this.bindSupport();
        Live.login.addLoginCallback(function () {
            self.initSupport();
            self.bindSupport();
        });
        Live.login.addClearLoginStatusCallback(function () {
            self.initSupport();
            self.bindSupport();
        });
    }, fixJump: function () {
        $('#sport_list').on('click', 'a.btn', function (e) {
            e.stopPropagation();
        });
    }, fixGoal: function () {
        var me = this;
        $.ajax({url: me.op.goalcgi, dataType: "jsonp", jsonCache: 600, success: function (json) {
            if ($.isArray(json) && json[0] == 0 && json[1].length > 0) {
                fixGoalCallback(json[1]);
            }
        }, error: function (xhr, status, error) {
        }});
    }, initSupport: function () {
        var support = $('#sport_list').find('[data-role=supportbtn]');
        support.each(function (i, obj) {
            var cid = $(obj).data('cid'), mid = $(obj).data('mid'), type = $(obj).data('type'), uin = Live.login.getUin(), isSupported = false, str = type + 'support_' + cid + '_' + mid + uin, str1 = '1' + str.slice(1), str2 = '2' + str.slice(1);
            if (Live.cookie.get(str1)) {
                isSupported = str1;
            }
            if (Live.cookie.get(str2)) {
                isSupported = str2;
            }
            if (isSupported) {
                var curtype = isSupported.substr(0, 1);
                $(obj).removeClass('like_btn').addClass('like_btn_disable');
                $(obj).removeAttr('data-able');
                if (type == curtype) {
                    $(obj).find('i').addClass('select');
                } else {
                    $(obj).find('i').removeClass('select');
                }
            } else {
                $(obj).removeClass('like_btn_disable').addClass('like_btn');
                $(obj).attr('data-able', 'true');
                $(obj).find('i').removeClass('select');
            }
        });
    }, bindSupport: function () {
        var me = this, sle = '[data-able=true]';

        function callback(e) {
            e.stopPropagation();
            var obj = $(e.currentTarget), type = obj.data('type'), cid = obj.data('cid'), uin = Live.login.getUin(), mid = obj.data('mid');
            var url = Live.string.format(me.op.supportcgi, {type: type, cid: cid, mid: mid});
            var str = type + 'support_' + cid + '_' + mid + uin;
            var isSupported = Live.cookie.get('1' + str.slice(1)) || Live.cookie.get('2' + str.slice(1));
            if (!isSupported) {
                $.ajax({url: url, dataType: "jsonp", jsonCache: 600, success: function (json) {
                    if ($.isArray(json) && json[0] == 0) {
                        Live.cookie.set(str, 'true', window.location.host, "/", 24);
                        var parent = obj.parents('.pk');
                        parent.find(sle).removeClass('like_btn').addClass('like_btn_disable');
                        parent.find(sle).removeAttr('data-able');
                        obj.find('i').addClass('select');
                        var em = obj.find('em');
                        em.html((parseInt(em.html()) || 0) + 1);
                    }
                }, error: function (xhr, status, error) {
                }});
            }
        }

        $('#sport_list').off('click', sle).on('click', sle, callback);
    }};
})($j);
function __tenplay_getuinfo() {
    if (!Live.login.isLogin()) {
        Live.txv.liveCommon.userVipStatus = 0;
    }
    return Live.txv.liveCommon.userVipStatus;
}
function __flashplayer_openLogin(_param) {
    if (!Live.login.isLogin()) {
        Live.login.openLogin({success: function () {
        }});
    }
}
/*  |xGv00|19ee84eae1bab17981d3eaf6422de6f5 */