define('ui/widget/dialog', function (require) {
    var $ = require('lib/jquery');
    var template = require('ui/template');
    var uid = 0;
    var Dialog = function (options) {
        this.id = 'dialog_' + (++uid);
        this.dom = null;
        this.mask = null;
        this.timer = null;
        this.options = $.extend({title: '提示', toolbar: '', footer: '', content: '', submitButtonText: '确定', cancelButtonText: '取消', dragable: true, destroyWhenClosed: true, autoClose: false, autoCloseDelay: 1500, useModal: true, closeAfterSubmit: true, showCloseButton: true, showSubmitButton: true, showCancelButton: true, showHeader: true, showFooter: true, onCreated: function () {
        }, onOpened: function () {
        }, onClosed: function () {
        }, onDestroyed: function () {
        }, onSubmitted: function () {
        }, onCanceled: function () {
        }, width: '362px', height: '150px', zIndex: 5000, mainStyle: 'popup_msg', template: Dialog.template, autoPosit: true, left: '25%', top: '25%', animation: null, needHide3d: true}, options || {});
        Dialog.instances[this.id] = this;
    }
    Dialog.prototype = {create: function () {
        var _this = this;
        var tplData = {};
        tplData.id = this.id;
        tplData.showHeader = this.options.showHeader ? '' : 'display:none;';
        tplData.showFooter = this.options.showFooter ? '' : 'display:none;';
        tplData.showCloseButton = this.options.showCloseButton ? '' : 'display:none;';
        tplData.showSubmitButton = this.options.showSubmitButton ? '' : 'display:none;';
        tplData.showCancelButton = this.options.showCancelButton ? '' : 'display:none;';
        tplData.footer = this.options.footer ? this.options.footer : '';
        tplData.content = this.options.content.replace('<%=dialogId%>', this.id);
        tplData = $.extend(this.options, tplData);
        if (this.options.useModal) {
            this.mask = new Dialog.Mask({zIndex: this.options.zIndex - 1, target: this.options.maskTarget});
            this.mask.create();
        }
        var dialog = template.parse(this.options.template, tplData);
        $(document.body).append(dialog);
        if ($.browser.msie && !window.XMLHttpRequest) {
            var divHeight = $('#' + this.id).height();
            $('#' + this.id).find(' > iframe').height(divHeight);
        }
        this.dom = $('#' + this.id).get(0);
        $('#' + this.id + '_close').click(function () {
            _this.close();
            return false;
        });
        $('#' + this.id + '_submit').click(function () {
            if (_this.options.onSubmitted.call(_this) || _this.options.closeAfterSubmit) {
                _this.close();
            }
            return false;
        });
        $('#' + this.id + '_cancel').click(function () {
            _this.options.onCanceled.call(_this);
            _this.close();
            return false;
        });
        if (this.options.dragable) {
        }
        this.options.onCreated.call(this);
    }, open: function () {
        if (this.options.needHide3d) {
            $("#unity3dContainer").hide();
        }
        if (this.dom == null) {
            this.create();
        }
        if (this.options.autoPosit) {
            this.setPosition();
        }
        var animation = this.options.animation;
        switch (animation) {
            case'fade':
                $(this.dom).fadeIn();
                break;
            case'slide':
                $(this.dom).slideDown();
                break;
            default:
                $(this.dom).show();
                break;
        }
        var _this = this;
        if (this.options.autoClose) {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(function () {
                _this.close();
            }, this.options.autoCloseDelay);
        }
        if (this.mask) {
            this.mask.show();
        }
        this.options.onOpened.call(this);
    }, close: function () {
        var animation = this.options.animation;
        switch (animation) {
            case'fade':
                $(this.dom).fadeOut();
                break;
            case'slide':
                $(this.dom).slideUp();
                break;
            default:
                $(this.dom).hide();
                break;
        }
        if (this.mask) {
            this.mask.hide();
        }
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (this.options && this.options.onClosed) {
            this.options.onClosed.call(this);
        }
        if (this.options && this.options.destroyWhenClosed) {
            var _this = this;
            setTimeout(function () {
                _this.destroy();
            }, 10);
        }
        if (this.options.needHide3d) {
            $("#unity3dContainer").show();
        }
    }, resize: function (size, resizeContent) {
        if (resizeContent) {
            var target = $('.popup_bd', this.dom);
        } else {
            var target = $(this.dom);
        }
        if (size.width) {
            target.css({'width': size.width});
        }
        if (size.height) {
            target.css({'height': size.height})
        }
    }, changeButtonText: function (type, text) {
        switch (type) {
            case'submit':
                var btn = $('#' + this.id + '_submit').get(0);
                break;
            case'cancel':
                var btn = $('#' + this.id + '_cancel').get(0);
                break;
        }
        btn.innerHTML = text;
    }, setPosition: function () {
        if (!this.options.autoPosit) {
            return;
        }
        var topPos = $(document).scrollTop() || 0, win = window;
        if (topPos < 0) {
            topPos = 0;
        }
        $(this.dom).css({left: Math.floor(($(window).width() - $(this.dom).width()) / 2) + 'px', top: Math.floor(($(window).height() - $(this.dom).height()) / 2) + topPos + 'px'});
    }, onWindowResized: function () {
        this.setPosition();
        if (this.mask) {
            this.mask.onWindowResized();
        }
    }, cancelAutoClose: function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }, restoreAutoClose: function () {
        var _this = this;
        this.timer = setTimeout(function () {
            _this.close();
        }, this.options.autoCloseDelay);
    }, destroy: function () {
        try {
            $(this.dom).find('iframe').remove();
            $(this.dom).remove();
            if (this.mask) {
                this.mask.destroy();
            }
            this.options.onDestroyed.call(this);
            this.dom = null;
            this.options = null;
            Dialog.instances[this.id] = null;
            delete Dialog.instances[this.id];
        } catch (_) {
        }
    }};
    Dialog.template = '<div id="<%=id%>" style="position: absolute; visibility: visible; display: block; z-index: 9999;  width:<%=width%>; height:<%=height%>; ">\
          <div class="mgp_popup <%=mainStyle%>" style="width:<%=width%>;height:<%=height%>">\
           <div class="popup_hd" style="<%=showHeader%>" id="<%=id%>_header">\
            <div class="popup_title">\
             <i class="popup_icon"></i>\
             <h2><%=title%></h2>\
            </div>\
            <span class="popup_close" style="<%=showCloseButton%>">\
             <a href="#" rel="close" title="关闭" id="<%=id%>_close" onclick="return false;">关闭</a>\
            </span>\
           </div>\
           <div class="popup_bd">\
            <%=content%>\
            <div class="popup_op" style="<%=showFooter%>" id="<%=id%>_footer">\
             <%=footer%>\
             <a href="#" class="popup_btn" rel="sure" style="<%=showSubmitButton%>" onclick="return false;"><span id="<%=id%>_submit"><%=submitButtonText%></span></a><a href="#" rel="cancel" class="popup_btn" style="<%=showCancelButton%>" onclick="return false;"><span id="<%=id%>_cancel"><%=cancelButtonText%></span></a>\
            </div>\
           </div>\
          </div>\
        </div>';
    Dialog.contentTemplate = '<div class="msg_box">\
           <i class="msg_icon <%=icon%>"></i>\
           <div class="msg_text"><%=content%></div>\
          </div>';
    Dialog.contentIcons = {'warning': 'i_war', 'success': 'i_suc', 'error': 'i_err', 'confirm': 'i_que', 'tips': 'i_tip'};
    Dialog.instances = {};
    Dialog.confirm = function (options) {
        var options = $.extend({}, options);
        options.content = template.parse(Dialog.contentTemplate, {icon: Dialog.contentIcons.confirm, content: options.content || ''});
        var dialog = new Dialog(options);
        dialog.open();
        return dialog;
    };
    Dialog.notice = function (options) {
        var options = $.extend({type: 'warning', showCancelButton: false}, options);
        options.content = template.parse(Dialog.contentTemplate, {icon: Dialog.contentIcons[options.type], content: options.content || ''});
        var dialog = new Dialog(options);
        dialog.open();
        return dialog;
    }
    Dialog.close = function (id) {
        if (id) {
            Dialog.instances[id].close();
        } else {
            for (var ins in Dialog.instances) {
                Dialog.instances[ins].close();
            }
        }
    }
    Dialog.destroy = function () {
        for (var ins in Dialog.instances) {
            try {
                Dialog.instances[ins].destroy();
            } catch (ex) {
            }
        }
        Dialog.instances = null;
    }
    Dialog.Mask = function (options) {
        this.options = $.extend({target: document.body, zIndex: 990, opacity: 0.5}, options || {});
        this.dom = null;
    }
    Dialog.Mask.prototype = {create: function () {
        var width = $(this.options.target).get(0).scrollWidth, height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), zIndex = this.options.zIndex, opacity = this.options.opacity;
        this.dom = document.createElement('div');
        document.body.appendChild(this.dom);
        $(this.dom).css({'position': 'absolute', 'zIndex': zIndex, 'left': 0, 'top': 0, 'width': width + 'px', 'height': height + 'px', 'display': 'none'});
        $(this.dom).append('<div style="position:absolute; left:0; top:0; width:' + width + 'px;height:' + height + 'px; background:#000000;z-index:' + zIndex + ';opacity:' + opacity + '; filter:alpha(opacity=' + (opacity * 100) + ');-moz-opacity:' + opacity + ';"></div>');
        if ($.browser.msie) {
            $(this.dom).append('<iframe style="opacity:0; filter:alpha(opacity=0);-moz-opacity:0;" scrolling="No" style="" border="0" frameborder="0" width="' + width + '" height="' + height + '"></iframe>');
        } else if ($.browser.opera) {
            $(this.dom).append('<img onmousedown="return false;" galleryimg="no" style="z-index:' + zIndex + '" width="' + width + '" height="' + height + '"/>');
        }
    }, show: function () {
        if (!this.dom) {
            this.create();
        }
        $(this.dom).show();
    }, hide: function () {
        $(this.dom).hide();
    }, onWindowResized: function () {
        var width = $(this.options.target).get(0).scrollWidth, height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        $(this.dom).css({'width': width + 'px', 'height': height + 'px'});
        $(this.dom).find('div').css({'width': width + 'px', 'height': height + 'px'});
        $(this.dom).find('iframe').css({'width': width + 'px', 'height': height + 'px'});
        $(this.dom).find('img').css({'width': width + 'px', 'height': height + 'px'});
    }, destroy: function () {
        $(this.dom).remove();
        this.dom = null;
        this.options = null;
    }}
    Dialog.onWindowResized = function () {
        for (var id in Dialog.instances) {
            try {
                Dialog.instances[id].onWindowResized();
            } catch (_) {
            }
        }
    }
    $(window).bind('windowResize', function () {
        Dialog.onWindowResized();
    });
    (function () {
        var timer = null;
        $(window).resize(function () {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                $(window).trigger('windowResize');
                timer = null;
            }, 100);
        });
    })();
    return Dialog;
});