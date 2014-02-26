//http://chong.qq.com/home/haoma.shtml
(function(factory) {
    if (typeof define === 'function') {
        define(factory);
    } else {
        factory();
    }
})(function(require, exports) {
    var Utils = exports;
    var $ = require('jquery/jquery');
    var dialog = require('./dialog');
    var qv = require('./qv');
    $.getScript('http://pingjs.qq.com/ping.js', function() {
        try {
            if (typeof(pgvMain) == 'function') if (isIframe()) {
                pgvMain('', {
                    statIframe: true
                });
            } else {
                pgvMain();
            }
        } catch (e) {}
    });
    (function() {
        window.vipSignNew = require('sign');
        vipSignNew.init();
    })();
    Utils.getQueryString = function(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        if (!match) {
            return '';
        } else {
            if (!/^[0-9a-zA-Z]*$/.test(match[1])) {
                return false;
            }
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        }
    }
    Utils.setHaomaSrc = function(actid) {
        if (typeof actid == 'undefined') {
            var actid = 1;
        }
        var domain = 'qq.com';
        var qcookie = require('cookie');
        qcookie.set('haoma_src', actid, {
            domain: domain,
            path: '/',
            expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 12)
        });
    };
    (function() {
        var src = Utils.getQueryString('srcfrom');
        if ( !! src && !isNaN(src)) {
            Utils.setHaomaSrc(src);
        }
    })();
    (function() {
        var pathArr = ['/index.html', '/pay.html', '/shop.html', '/zc/index.html', '/zc/pay.html'];
        var flags = {
            '/index.html': 1,
            '/pay.html': 2,
            '/shop.html': 3,
            '/zc/index.html': 4,
            '/zc/pay.html': 5
        }
        var path = window.location.pathname;
        if (/\/$/.test(path)) {
            path = path + 'index.html';
        }
        for (var i = 0; i < pathArr.length; i++) {
            if (pathArr[i] == path) {
                var flag = flags[path];
                var speedReport = require('speed');
                speedReport.init({
                    productFlag: 169,
                    webFlag: 2035,
                    delayTime: 4,
                    isReportPerformance: true
                });
                setTimeout(function() {
                    speedReport.report(timePoint, flag, 2);
                }, 3000);
                break;
            }
        }
    })();
    var CSRF = require('./csrf');
    var Mustache = require('mustache/mustache');
    window.ptlogin = require('./ptlogin');
    var NAVBAR_LOGIN_TIPS_TPL = '您好，<span class="mod_userinfo_name">{{nickname}} </span>\
                                <a href="http://vip.qq.com/my/level.html" target="_blank">\
                                    <span class="{{getClubIcon}}"></span>\
                                </a>\
                                <a href="{haomaDomain}/usercenter.html" target="_blank" title="个人中心" class="mod_userinfo_usercenter">\
                                    <span> 个人中心</span>\
                                </a>\
                                <a href="javascript:void(0)" title="退出" class="mod_userinfo_logout">\
                                    <span> 退出</span>\
                                </a>';
    NAVBAR_LOGIN_TIPS_TPL = NAVBAR_LOGIN_TIPS_TPL.replace(/\{haomaDomain\}/g, AC.HAOMA_DOMAIN);
    var LOGIN_AREA_TPL = '<div class="mod_userinfo_avatar">\
                             <a><img src="{{faceurl}}" title="您好,{{nickname}}" alt="您好,{{nickname}}"></a>\
                         </div>\
                         <div class="mod_userinfo_name">\
                             <span>{{getPrompt}}</span>\
                             <a href="{{getExternalCenterUrl}}" class="mod_userinfo_center">{{getExternalCenterName}}</a>\
                         </div>\
                         <div class="mod_userinfo_mark">\
                             <a href="http://vip.qq.com/my/level.html" target="_blank"><span class="{{getClubIcon}}"></span></a>\
                             <a href="http://vip.qq.com/help/help_bank.html" target="_blank"><span class="{{getBankpayIcon}}"></span></a>\
                             <a class="mod_userinfo_quit" href="javascript:void(0)">退出</a>\
                         </div>';
    var LOGIN_BOX_TPL = '<a href="javascript:void(0)" title="用户登录" class="mod_userinfo_login_entry">用户登录</a>';
    Utils.loadScript = function(cgiSrc, paramsObj, callback, cbName) {
        cbName = cbName || 'callback';
        paramsObj = paramsObj || {};
        paramsObj.g_tk = CSRF.getCSRFToken();
        qv.net.getJSON(cgiSrc + '?' + cbName + '=?', paramsObj, function(json) {
            callback(json);
        }, {
            plugins: {
                'qq.cgiSpeedReport': {}
            }
        });
    };
    Utils.loadViiScript = function(cgiSrc, paramsObj, callback, cbName) {
        cbName = cbName || 'callback';
        paramsObj = paramsObj || {};
        paramsObj.g_tk = CSRF.getCSRFToken();
        qv.net.getJSON(cgiSrc + '?' + cbName + '=?', paramsObj, function(json) {
            if ('login' == json.msg) {
                return ptlogin.open();
            }
            callback(json);
        }, {
            plugins: {
                'qq.cgiSpeedReport': {
                    'reportParams': 'r'
                }
            }
        });
    };
    Utils.getHashString = function(name) {
        var match = RegExp('[#&]' + name + '=([^&?]*)').exec(window.location.hash);
        if (!match) {
            return '';
        } else {
            if (!/^[0-9a-zA-Z]*$/.test(match[1])) {
                return false;
            }
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        }
    }
    Utils.initializeNavbar = function(mainId, subId) {
        $('.more_service').hover(function() {
            $('.lk_vip_service').addClass('current');
            $('.pop_vip_service').show();
        }, function() {
            $('.lk_vip_service').removeClass('current');
            $('.pop_vip_service').hide();
        });
        var searchBox = require('./searchbox');
        searchBox.init('请输入生日、纪念日、手机号码、心仪数字', '.searchbox input', '.search_buttom button');
    };
    Utils.setNavbarAid = function(aid) {
        var defaultAid = 'lianghao.default.navbar';
        if (typeof aid != 'string') {
            aid = defaultAid;
        }
        var aidDom = $('.mod_vip') || $('.mod_xf');
        aidDom.attr('href', 'http://pay.qq.com/qqvip/index.shtml?aid=' + aid);
        aidDom.attr('target', '_blank');
    };
    Utils.showLoginArea = function(containerId) {
        Utils.loadScript(AC.HAOMA_DOMAIN + '/cgi/getUserInfo.php', {
            data: 'uin,nick_name,face_url,is_club,level,is_year_club,bank_pay'
        }, function(json) {
            renderLoginArea(json.data, containerId, {});
        });
    };
    Utils.showDefaultLoginBox = function(containerId) {
        $(containerId).html(LOGIN_BOX_TPL).click(function() {
            ptlogin.open();
        });
    };
    Utils.init = function() {
        document.domain = "qq.com";
        try {
            document.execCommand('BackgroundImageCache', false, true);
        } catch (e) {};
        regJqueryValInput();
        initInput();
        ptlogin.init({
            loginMaskShow: true
        });
        ptlogin.bind('login', function() {
            getNavbarLoginInfo();
        });
        ptlogin.bind('logout', function() {
            $('#nonLogin .mod_userinfo_login').unbind('click').click(function() {
                ptlogin.open();
            });
            $('#nonLogin').show();
            $('#loginTips').hide();
            $('.mod_xf').removeClass('mod_xf').addClass('mod_vip');
        });
        var pattern = /(http[s]?\:\/\/)?(.*)\.qq\.com\/*(([^#]*)\.|([^#]*)\/|([^#]*)$){0,1}/;
        var matches = pattern.exec(location.href);
        if (!matches) {
            Utils.setNavbarAid();
        } else {
            var mainId = matches[2];
            var subId = matches[4] || matches[5] || matches[6];
            if (!subId) {
                subId = 'index';
            }
            var aid = mainId + '.' + subId + '.navbar';
            Utils.setNavbarAid(aid);
        }
        if (this.isLogin()) {
            ptlogin.trigger('login');
        } else {
            $('#nonLogin .mod_userinfo_login').click(function() {
                ptlogin.open();
            });
        }
        $('body input').attr('autocomplete', 'off');
    };
    Utils.isIE = function() {
        return $.browser.msie;
    };
    Utils.isIE6 = function() {
        return $.browser.msie && ($.browser.version == "6.0") && !$.support.style;
    };
    Utils.copyToClipboard = function(text) {
        if (window.clipboardData) {
            window.clipboardData.setData("Text", text);
            alert('复制成功');
        } else {
            alert('您使用的浏览器不支持复制到粘贴板功能');
        }
    }
    Utils.getRandom = function(min, max, num) {
        var offset = max - min + 1;
        if (num == 1) {
            return Math.floor(Math.random() * offset) + min;
        } else if (num > 1) {
            var resArr = [];
            for (var i = 0; i < num;) {
                var randomNum = Math.floor(Math.random() * offset) + min;
                var j = 0;
                for (j = 0; j < resArr.length; j++) {
                    if (resArr[j] == randomNum) break;
                }
                if (j == resArr.length) {
                    resArr.push(randomNum);
                    i++;
                }
                if (resArr.length >= offset) break;
            }
            return resArr;
        }
    };
    Utils.isValidString = function(str) {
        var reg = /^[a-z0-9\_\.]{0,100}$/i;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    }
    Utils.isValidUin = function(uin) {
        var pat = /^\d{5,12}$/;
        return pat.test(uin);
    }
    Utils.isValidNum = function(num) {
        var pat = /^\d+$/;
        return pat.test(num);
    }
    Utils.isValidCdkey = function(cdkey) {
        var pat = /^[A-Za-z0-9]{16}$/;
        return pat.test(cdkey);
    }
    Utils.isValidPhone = function(phone) {
        var pat = /^1(3|5|8)[0-9]{9}$/;
        return pat.test(phone);
    }
    Utils.isLogin = function() {
        var uin = ptlogin.getUin();
        var skey = ptlogin.getSessionKey();
        if (uin != 0 || skey != '') {
            return true;
        } else {
            return false;
        }
    };
    Utils.isArray = function(value) {
        return Object.prototype.toString.apply(value) === '[object Array]';
    }

    function isItemContainerInArray(array, item) {
        for (var i = array.length - 1; i >= 0; i--) {
            if (array[i] == item) {
                return true;
            }
        }
        return false;
    };

    function getNavbarLoginInfo() {
        Utils.loadScript(AC.HAOMA_DOMAIN + '/cgi/getUserInfo.php', {
            data: 'uin,nick_name,is_club,is_year_club,level'
        }, function(json) {
            if (json.ret == 0) {
                renderNavbarLoginInfo(json.data);
            }
        });
    };

    function renderNavbarLoginInfo(json) {
        if (1 != json.is_login) {
            ptlogin.trigger('logout');
            return;
        }
        if (1 == json.is_club) {
            $('.mod_vip').removeClass('mod_vip').addClass('mod_xf');
        }
        var view = {
            uin: json.uin,
            nickname: json.nick_name,
            club: json.is_club,
            yearclub: json.is_year_club,
            level: json.level,
            getClubIcon: function() {
                if (0 == this.club) {
                    return 'ico_vip_off';
                } else if (1 == this.club && 0 == this.yearclub) {
                    if (typeof this.level != 'undefined' && this.level > 0) {
                        return 'ico_vip' + this.level;
                    } else {
                        return 'ico_vip';
                    }
                } else if (1 == this.club && 1 == this.yearclub) {
                    if (typeof this.level != 'undefined' && this.level > 0) {
                        return 'ico_yvip' + this.level;
                    } else {
                        return 'ico_vip';
                    }
                }
            }
        };
        var tipsHtml = Mustache.render(NAVBAR_LOGIN_TIPS_TPL, view);
        $('#loginTips').html(tipsHtml);
        $('#loginTips .mod_userinfo_logout').click(function() {
            ptlogin.logout();
        });
        $('#nonLogin').hide();
        $('#loginTips').show();
    };

    function renderLoginArea(json, containerId, config) {
        if (1 != json.is_login) {
            ptlogin.trigger('logout');
            return ptlogin.open();
        }
        var deafultConfig = {
            prompt: '您好，' + json.nick_name,
            externalCenter: {
                url: AC.HAOMA_DOMAIN + '/usercenter.html',
                name: '个人中心'
            }
        };
        config = $.extend(deafultConfig, config);
        var view = {
            faceurl: json.face_url,
            uin: json.uin,
            nickname: json.nick_name,
            club: json.is_club,
            yearclub: json.is_year_club,
            level: json.level,
            bank_pay: json.bank_pay,
            getClubIcon: function() {
                if (0 == this.club) {
                    return 'ico_vip_off';
                } else if (1 == this.club && 0 == this.yearclub) {
                    if (typeof this.level != 'undefined' && this.level > 0) {
                        return 'ico_vip' + this.level;
                    } else {
                        return 'ico_vip';
                    }
                } else if (1 == this.club && 1 == this.yearclub) {
                    if (typeof this.level != 'undefined' && this.level > 0) {
                        return 'ico_yvip' + this.level;
                    } else {
                        return 'ico_vip';
                    }
                }
            },
            getBankpayIcon: function() {
                return this.bank_pay == 1 ? 'ico_cft' : 'ico_cft_off';
            },
            getPrompt: function() {
                return config.prompt;
            },
            getExternalCenterUrl: function() {
                return config.externalCenter.url;
            },
            getExternalCenterName: function() {
                return config.externalCenter.name;
            }
        };
        var html = Mustache.render(LOGIN_AREA_TPL, view);
        $(containerId).html(html);
        $(containerId + ' .mod_userinfo_quit').click(function() {
            ptlogin.logout();
        });
    };

    function isIframe() {
        return (top != self);
    }

    function showHide(from, to) {
        var tips_layer = $(to);
        $(from).hover(function() {
            tips_layer.fadeIn(300);
        }, function() {
            tips_layer.fadeOut(300);
        });
    }

    function flashEle(ele, txt, speed) {
        $(ele).css('visibility', '').html(txt);
    }

    function flashEleShow(ele, txt, speed) {
        var cnt = 0,
            ele = $(ele);
        txt && ele.html(txt);
        ele.css('visibility', '');
        var interval = window.setInterval(function() {
            if (++cnt % 2) {
                ele.css('visibility', 'hidden');
            } else {
                ele.css('visibility', '');
            }
            if (cnt >= 6) {
                window.clearInterval(interval);
            }
        }, speed || 400);
    }

    function initInput(selector) {
        initIEInput();
        var ele = $(selector || document.body);
        ele.delegate(':text', {
            'keydown': function(e) {
                return true;
            },
            'keyup': function(e) {
                var target = $(this),
                    replaceReg;
                if (target.hasClass('only_number_letter')) {
                    replaceReg = /[^a-zA-Z0-9]/g;
                } else if (target.hasClass('only_number')) {
                    replaceReg = /\D/g;
                } else if (target.hasClass('only_letter')) {
                    replaceReg = /[^a-zA-Z]/g;
                }
                var val = target.val();
                target.val(val.replace(replaceReg, ''));
            },
            'focus': function(e) {
                if (Utils.isIE()) {
                    var placeholder = $(this).attr('placeholder');
                    if ($(this).val() == placeholder) {
                        $(this).val('').removeClass('input_gray');
                    }
                }
            },
            'focusout': function(e) {
                if (Utils.isIE()) {
                    var placeholder = $(this).attr('placeholder');
                    if ('' == $(this).val()) {
                        $(this).val(placeholder).addClass('input_gray');
                    }
                }
            }
        });
    }

    function regJqueryValInput() {
        $.fn.valInput = function() {
            var ele = $(this);
            if (Utils.isIE() && !arguments.length) {
                var val = ele.val();
                if (ele.is(':text[placeholder]') && val == ele.attr('placeholder')) {
                    return '';
                }
                return val;
            } else {
                return $.fn.val.apply(ele, arguments);
            }
        }
    }

    function initIEInput() {
        if (Utils.isIE()) {
            var inputText = $(':text[placeholder]');
            inputText.each(function(i) {
                var placeholder = $(this).attr("placeholder");
                if (placeholder != '') {
                    $(this).val(placeholder).addClass('input_gray');
                }
            });
        }
    }

    function isOnlyNum(e) {
        var keyCode = e.keyCode || e.charCode;
        if (keyCode != 46 && keyCode != 8 && keyCode != 9 && keyCode != 37 && keyCode != 39) {
            if (!((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105))) {
                return false;
            }
        }
        return true;
    }

    function isOnlyLetter(e) {
        var keyCode = e.keyCode || e.charCode;
        if (keyCode != 46 && keyCode != 8 && keyCode != 9 && keyCode != 37 && keyCode != 39) {
            if (!(keyCode >= 65 && keyCode <= 90)) {
                return false;
            }
        }
        return true;
    }

    function isOnlyNumLetter(e) {
        var keyCode = e.keyCode || e.charCode;
        if (keyCode != 46 && keyCode != 8 && keyCode != 9 && keyCode != 37 && keyCode != 39) {
            if (!((keyCode >= 65 && keyCode <= 90) || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105))) {
                return false;
            }
        }
        return true;
    }

    function showTopSearchAndHotAct() {
        $.getScript('http://imgcache.gtimg.cn/ACT/vip_act/act_data/10921.json.js', function() {
            var json = Data_10921000.data.userdefine.form_10000.data;
            var tpl = '<a searchtype="num" num="{num}" href="javascript:void(0)" value="{num}">{num}</a>';
            var html = '';
            for (var i = 0; i < json.length; i++) {
                html = html + tpl.replace(/\{num\}/g, json[i]['field_0']);
            }
            $('#hotNums').html(html);
            $('#hotNums').delegate('a', 'click', function() {});
            var json = Data_10921000.data.userdefine.form_10003.data;
            var tpl = '<li><a href="{href}" target="_blank" index="{i}"><img src="{imgsrc}"></a></li>';
            var html = '';
            for (var i = 0; i < json.length; i++) {
                html = html + tpl.replace(/\{imgsrc\}/g, json[i]['field_0']).replace(/\{href\}/, json[i]['field_1']).replace(/\{i\}/, i);
            }
            $('#actList').html(html);
            $('#actList').delegate('a', 'click', function() {});
        });
    }

    function alertMsg(msg) {
        dialog.show({
            brief: msg,
            buttons: [{
                wording: '确定'
            }]
        });
    }

    function alertSysErr() {
        alertMsg('系统错误，请稍后重试');
    }

    function toYuan(fen, isInt) {
        return (fen / 100).toFixed(isInt ? 0 : 2);
    }
    Utils.motionNav = function() {
        var navs = $(".mod_nav>li");
        navs.each(function() {
            if (!$(this).hasClass("current")) {
                var nav = $(this).children("a");
                nav.find(".front").css({
                    top: 0
                });
                nav.find(".back").css({
                    top: -42
                });
                nav.hover(function() {
                    $(this).find(".front").stop().animate({
                        top: 42
                    });
                    $(this).find(".back").stop().animate({
                        top: 0
                    });
                }, function() {
                    $(this).find(".front").stop().animate({
                        top: 0
                    });
                    $(this).find(".back").stop().animate({
                        top: -42
                    });
                });
            }
        })
    }
    Utils.showHide = showHide;
    Utils.flashEle = flashEle;
    Utils.flashEleShow = flashEleShow;
    Utils.showTopSearchAndHotAct = showTopSearchAndHotAct;
    Utils.alertMsg = alertMsg;
    Utils.alertSysErr = alertSysErr;
    Utils.toYuan = toYuan;
}); /*  |xGv00|97b0ac768cf1a53afe6b7e9ee7f03779 */