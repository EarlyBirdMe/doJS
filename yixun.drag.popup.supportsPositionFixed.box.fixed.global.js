$.extend($, {
	strlen	: function(str) {
		if (typeof str != 'string') return 0;
		return str.replace(/[^\x00-\xff]/gi, 'xx').length;
	}
});

var G = {};
G.domain = /51buy\.com/.test(location.host) ? '51buy.com' : 'yixun.com';
G.DOMAIN = {
	WWW_ICSON_COM	: 'www.'+G.domain,
	ACT_ICSON_COM	: 'act.'+G.domain,
	EVENT_ICSON_COM	: 'event.'+G.domain,
	ITEM_ICSON_COM	: 'item.'+G.domain,
	BUY_ICSON_COM	: 'buy.'+G.domain,
	BASE_ICSON_COM	: 'base.'+G.domain,
	S_ICSON_COM	: 's.'+G.domain,
	LIST_ICSON_COM	: 'list.'+G.domain,
	ST_ICSON_COM	: 'st.'+G.domain,
	ACT_ICSON_COM	: 'act.'+G.domain
};
G.prefix = {
	st	: 'http://st.'+G.domain+'/',
	ssl : false,
	st_ssl : 'https://st.'+G.domain+'/'
};
G.createFnQueue = function(shift) {
	var _list = [];

	return {
		add	: function(fn) {
			if ($.isFunction(fn)) 
				_list.push(fn);
		},

		exec	: function(o) {
			if (shift !== false) {
				while (_list.length > 0) {
					_list.shift()(o);
				}
			}
			else {
				for (var i = 0, len = _list.length; i < len; i++) {
					if (_list[i](o) === false) {
						return false; // 类似事件的回调函数
					}
				}
			}
		},

		clear	: function() {
			_list.length = 0;
		}
	};
};

G.app = {}; // 应用
G.logic = {}; // 业务公共逻辑相关
G.ui = {}; // 界面相关
G.util = {}; // 工具相关

if ($.browser.msie && parseInt($.browser.version, 10) < 7) {
	try {
		document.execCommand("BackgroundImageCache", false, true);
	} catch(e) {}
} 
/**
 * Cookie 相关操作
 * @see 达人的开发js库
 */
G.util.cookie = {
	get	: function(name) {
		var r = new RegExp("(^|;|\\s+)" + name + "=([^;]*)(;|$)");
		var m = document.cookie.match(r);
		return (!m ? "": unescape(m[2]));
	},

	add	: function(name, v, path, expire, domain) {
		var s = name + "=" + escape(v)
			+ "; path=" + ( path || '/' ) // 默认根目录
			+ (domain ? ("; domain=" + domain) : ''); 
		if (expire > 0) {
			var d = new Date();
			d.setTime(d.getTime() + expire * 1000);
			s += ";expires=" + d.toGMTString();
		}
		document.cookie = s;
	},

	del	: function(name, domain) {
		document.cookie = name + "=;path=/;" +(domain ? ("domain=" + domain + ";") : '') +"expires=" + (new Date(0)).toGMTString();
	}
}; 

/**
 * token 相关操作
 * 公司skey口令转换
 */
G.util.token = {
	//给连接加上token
	addToken : function(url,type){
		//type标识请求的方式,jq标识jquery，lk标识普通链接,fr标识form表单,ow打开新窗口
		var token=this.getToken();
		//只支持http和https协议，当url中无协议头的时候，应该检查当前页面的协议头
		if(url=="" || (url.indexOf("://")<0?location.href:url).indexOf("http")!=0){
			return url;
		}
		if(url.indexOf("#")!=-1){
			var f1=url.match(/\?.+\#/);
			 if(f1){
				var t=f1[0].split("#"),newPara=[t[0],"&g_tk=",token,"&g_ty=",type,"#",t[1]].join("");
				return url.replace(f1[0],newPara);
			 }else{
				var t=url.split("#");
				return [t[0],"?g_tk=",token,"&g_ty=",type,"#",t[1]].join("");
			 }
		}
		//无论如何都把g_ty带上，用户服务器端判断请求的类型
		return token==""?(url+(url.indexOf("?")!=-1?"&":"?")+"g_ty="+type):(url+(url.indexOf("?")!=-1?"&":"?")+"g_tk="+token+"&g_ty="+type);
	},
	//获取转换后的token
	getToken : function(){
		var skey=G.util.cookie.get("skey"),
			token=skey==null?"":this.time33(skey);
			return token;
	},
	//skey转token
	time33 : function(str){
		//哈希time33算法
		for(var i = 0, len = str.length,hash = 5381; i < len; ++i){
		   hash += (hash << 5) + str.charAt(i).charCodeAt();
		};
		return hash & 0x7fffffff;
	}
}
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
/*global define: false*/

var Mustache;

(function (exports) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = exports; // CommonJS
  } else if (typeof define === "function") {
    define(exports); // AMD
  } else {
    Mustache = exports; // <script>
  }
}((function () {

  var exports = {};

  exports.name = "mustache.js";
  exports.version = "0.7.0";
  exports.tags = ["{{", "}}"];

  exports.Scanner = Scanner;
  exports.Context = Context;
  exports.Writer = Writer;

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var nonSpaceRe = /\S/;
  var eqRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  function testRe(re, string) {
    return RegExp.prototype.test.call(re, string);
  }

  function isWhitespace(string) {
    return !testRe(nonSpaceRe, string);
  }

  var isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };

  function escapeRe(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  exports.escape = escapeHtml;

  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      this.tail = this.tail.substring(match[0].length);
      this.pos += match[0].length;
      return match[0];
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var match, pos = this.tail.search(re);

    switch (pos) {
    case -1:
      match = this.tail;
      this.pos += this.tail.length;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, pos);
      this.tail = this.tail.substring(pos);
      this.pos += pos;
    }

    return match;
  };

  function Context(view, parent) {
    this.view = view;
    this.parent = parent;
    this.clearCache();
  }

  Context.make = function (view) {
    return (view instanceof Context) ? view : new Context(view);
  };

  Context.prototype.clearCache = function () {
    this._cache = {};
  };

  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  Context.prototype.lookup = function (name) {
    var value = this._cache[name];

    if (!value) {
      if (name === ".") {
        value = this.view;
      } else {
        var context = this;

        while (context) {
          if (name.indexOf(".") > 0) {
            var names = name.split("."), i = 0;

            value = context.view;

            while (value && i < names.length) {
              value = value[names[i++]];
            }
          } else {
            value = context.view[name];
          }

          if (value != null) {
            break;
          }

          context = context.parent;
        }
      }

      this._cache[name] = value;
    }

    if (typeof value === "function") {
      value = value.call(this.view);
    }

    return value;
  };

  function Writer() {
    this.clearCache();
  }

  Writer.prototype.clearCache = function () {
    this._cache = {};
    this._partialCache = {};
  };

  Writer.prototype.compile = function (template, tags) {
    var fn = this._cache[template];

    if (!fn) {
      var tokens = exports.parse(template, tags);
      fn = this._cache[template] = this.compileTokens(tokens, template);
    }

    return fn;
  };

  Writer.prototype.compilePartial = function (name, template, tags) {
    var fn = this.compile(template, tags);
    this._partialCache[name] = fn;
    return fn;
  };

  Writer.prototype.compileTokens = function (tokens, template) {
    var fn = compileTokens(tokens);
    var self = this;

    return function (view, partials) {
      if (partials) {
        if (typeof partials === "function") {
          self._loadPartial = partials;
        } else {
          for (var name in partials) {
            self.compilePartial(name, partials[name]);
          }
        }
      }

      return fn(self, Context.make(view), template);
    };
  };

  Writer.prototype.render = function (template, view, partials) {
    return this.compile(template)(view, partials);
  };

  Writer.prototype._section = function (name, context, text, callback) {
    var value = context.lookup(name);

    switch (typeof value) {
    case "object":
      if (isArray(value)) {
        var buffer = "";

        for (var i = 0, len = value.length; i < len; ++i) {
          buffer += callback(this, context.push(value[i]));
        }

        return buffer;
      }

      return value ? callback(this, context.push(value)) : "";
    case "function":
      var self = this;
      var scopedRender = function (template) {
        return self.render(template, context);
      };

      var result = value.call(context.view, text, scopedRender);
      return result != null ? result : "";
    default:
      if (value) {
        return callback(this, context);
      }
    }

    return "";
  };

  Writer.prototype._inverted = function (name, context, callback) {
    var value = context.lookup(name);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0)) {
      return callback(this, context);
    }

    return "";
  };

  Writer.prototype._partial = function (name, context) {
    if (!(name in this._partialCache) && this._loadPartial) {
      this.compilePartial(name, this._loadPartial(name));
    }

    var fn = this._partialCache[name];

    return fn ? fn(context) : "";
  };

  Writer.prototype._name = function (name, context) {
    var value = context.lookup(name);

    if (typeof value === "function") {
      value = value.call(context.view);
    }

    return (value == null) ? "" : String(value);
  };

  Writer.prototype._escaped = function (name, context) {
    return exports.escape(this._name(name, context));
  };

  /**
   * Calculates the bounds of the section represented by the given `token` in
   * the original template by drilling down into nested sections to find the
   * last token that is part of that section. Returns an array of [start, end].
   */
  function sectionBounds(token) {
    var start = token[3];
    var end = start;

    var tokens;
    while ((tokens = token[4]) && tokens.length) {
      token = tokens[tokens.length - 1];
      end = token[3];
    }

    return [start, end];
  }

  /**
   * Low-level function that compiles the given `tokens` into a function
   * that accepts three arguments: a Writer, a Context, and the template.
   */
  function compileTokens(tokens) {
    var subRenders = {};

    function subRender(i, tokens, template) {
      if (!subRenders[i]) {
        var fn = compileTokens(tokens);
        subRenders[i] = function (writer, context) {
          return fn(writer, context, template);
        };
      }

      return subRenders[i];
    }

    return function (writer, context, template) {
      var buffer = "";
      var token, sectionText;

      for (var i = 0, len = tokens.length; i < len; ++i) {
        token = tokens[i];

        switch (token[0]) {
        case "#":
          sectionText = template.slice.apply(template, sectionBounds(token));
          buffer += writer._section(token[1], context, sectionText, subRender(i, token[4], template));
          break;
        case "^":
          buffer += writer._inverted(token[1], context, subRender(i, token[4], template));
          break;
        case ">":
          buffer += writer._partial(token[1], context);
          break;
        case "&":
          buffer += writer._name(token[1], context);
          break;
        case "name":
          buffer += writer._escaped(token[1], context);
          break;
        case "text":
          buffer += token[1];
          break;
        }
      }

      return buffer;
    };
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have a fifth item: an array that contains
   * all tokens in that section.
   */
  function nestTokens(tokens) {
    var tree = [];
    var collector = tree;
    var sections = [];
    var token, section;

    for (var i = 0; i < tokens.length; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case "#":
      case "^":
        token[4] = [];
        sections.push(token);
        collector.push(token);
        collector = token[4];
        break;
      case "/":
        if (sections.length === 0) {
          throw new Error("Unopened section: " + token[1]);
        }

        section = sections.pop();

        if (section[1] !== token[1]) {
          throw new Error("Unclosed section: " + section[1]);
        }

        if (sections.length > 0) {
          collector = sections[sections.length - 1][4];
        } else {
          collector = tree;
        }
        break;
      default:
        collector.push(token);
      }
    }

    // Make sure there were no open sections when we're done.
    section = sections.pop();

    if (section) {
      throw new Error("Unclosed section: " + section[1]);
    }

    return tree;
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var token, lastToken, squashedTokens = [];

    for (var i = 0; i < tokens.length; ++i) {
      token = tokens[i];

      if (lastToken && lastToken[0] === "text" && token[0] === "text") {
        lastToken[1] += token[1];
        lastToken[3] = token[3];
      } else {
        lastToken = token;
        squashedTokens.push(token);
      }
    }

    return squashedTokens; 
  }

  function escapeTags(tags) {
    if (tags.length !== 2) {
      throw new Error("Invalid tags: " + tags.join(" "));
    }

    return [
      new RegExp(escapeRe(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRe(tags[1]))
    ];
  }

  /**
   * Breaks up the given `template` string into a tree of token objects. If
   * `tags` is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. ["<%", "%>"]). Of
   * course, the default is to use mustaches (i.e. Mustache.tags).
   */
  exports.parse = function (template, tags) {
    tags = tags || exports.tags;

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var tokens = [],      // Buffer to hold the tokens
        spaces = [],      // Indices of whitespace tokens on the current line
        hasTag = false,   // Is there a {{tag}} on the current line?
        nonSpace = false; // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          tokens.splice(spaces.pop(), 1);
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr;

    while (!scanner.eos()) {
      start = scanner.pos;
      value = scanner.scanUntil(tagRes[0]);

      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(["text", chr, start, start + 1]);
          start += 1;

          if (chr === "\n") {
            stripSpace(); // Check for whitespace on the current line.
          }
        }
      }

      start = scanner.pos;

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) {
        break;
      }

      hasTag = true;
      type = scanner.scan(tagRe) || "name";

      // Skip any whitespace between tag and value.
      scanner.scan(whiteRe);

      // Extract the tag value.
      if (type === "=") {
        value = scanner.scanUntil(eqRe);
        scanner.scan(eqRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === "{") {
        var closeRe = new RegExp("\\s*" + escapeRe("}" + tags[1]));
        value = scanner.scanUntil(closeRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = "&";
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) {
        throw new Error("Unclosed tag at " + scanner.pos);
      }

      tokens.push([type, value, start, scanner.pos]);

      if (type === "name" || type === "{" || type === "&") {
        nonSpace = true;
      }

      // Set the tags for the next time around.
      if (type === "=") {
        tags = value.split(spaceRe);
        tagRes = escapeTags(tags);
      }
    }

    tokens = squashTokens(tokens);

    return nestTokens(tokens);
  };

  // The high-level clearCache, compile, compilePartial, and render functions
  // use this default writer.
  var _writer = new Writer();

  /**
   * Clears all cached templates and partials in the default writer.
   */
  exports.clearCache = function () {
    return _writer.clearCache();
  };

  /**
   * Compiles the given `template` to a reusable function using the default
   * writer.
   */
  exports.compile = function (template, tags) {
    return _writer.compile(template, tags);
  };

  /**
   * Compiles the partial with the given `name` and `template` to a reusable
   * function using the default writer.
   */
  exports.compilePartial = function (name, template, tags) {
    return _writer.compilePartial(name, template, tags);
  };

  /**
   * Compiles the given array of tokens (the output of a parse) to a reusable
   * function using the default writer.
   */
  exports.compileTokens = function (tokens, template) {
    return _writer.compileTokens(tokens, template);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  exports.render = function (template, view, partials) {
    return _writer.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  exports.to_html = function (template, view, partials, send) {
    var result = exports.render(template, view, partials);

    if (typeof send === "function") {
      send(result);
    } else {
      return result;
    }
  };

  return exports;

}())));
 
G.util.post = function(url, data, okfn){
	G.util.post.pIndex = (G.util.post.pIndex || 0) + 1;
	var iframe = $('<iframe name="pIframe_'+G.util.post.pIndex+'" src="about:blank" style="display:none" width="0" height="0" scrolling="no" allowtransparency="true" frameborder="0"></iframe>').appendTo($(document.body));

	var ipts = [];
	$.each(data, function(k, v){
		ipts.push('<input type="hidden" name="'+k+'" value="" />');
	});
	
	if(!/(\?|&(amp;)?)fmt=[^0 &]+/.test(url)) url += (url.indexOf('?') > 0 ? '&' : '?') + 'fmt=1';

	var form = $('<form action="'+url+'" method="post" target="pIframe_'+G.util.post.pIndex+'">'+ipts.join('')+'</form>').appendTo($(document.body));

	$.each(data, function(k, v){
		form.children('[name='+k+']').val(v);
	});

	iframe[0].callback = function(o){
		if(typeof okfn == 'function') okfn(o);
		$(this).src = 'about:blank';
		$(this).remove();
		form.remove();
		iframe = form = null;
	};
	if($.browser.msie && $.browser.version == 6.0){
		iframe[0].pIndex = G.util.post.pIndex;
		iframe[0].ie6callback = function(){
			form.target = 'pIframe_' + this.pIndex;
			form.submit();
		};
		iframe[0].src = location.protocol + '//st.'+G.domain+'/static_v1/htm/ie6post.htm';
	} else {
		form.submit();
	}
};

/*新增token处理*/
G.util.getACSRFToken=function(){
        if(G.util.cookie.get("g_tk")){
		  return G.util._DJB(G.util.cookie.get("g_tk"))
		}else{
		  return false;
		};
}

G.util._DJB=function(str){
		var hash = 5381;
		for(var i = 0, len = str.length; i < len; ++i){
			hash += (hash << 5) + str.charAt(i).charCodeAt();
		}
		return hash & 0x7fffffff;
	}

G.util.token_post = function(options){
    var opt=jQuery.extend({
			  "type":"POST",
			  "cache":false,
			  "dataType":"json",
			  "timeout":8000
	        }, options);
	
	//加上token值
	if(G.util.getACSRFToken()){
		opt.url=options.url+"&token="+G.util.getACSRFToken();
	}
	
	//调用jQuery AJAX
	jQuery.ajax(opt);
};
 
G.util.parse = {
	url	: function(){

		var _myDecode = function(q){
			var q = (q + '').replace(/(&amp;|\?)/g, "&").split('&');
			var p = {};
			var c = q.length;
			for (var i = 0; i < c; i++) {
				var pos = q[i].indexOf('=');
				if ( - 1 == pos) continue;
				p[q[i].substr(0, pos).replace(/[^a-zA-Z0-9_]/g, '')] = unescape(q[i].substr(pos + 1));
			}

			return p;
		};

		var hash = location.href.toString().indexOf('#');
		if(hash < 0) hash = '';
		else {
			hash = location.href.toString().substring(hash, location.href.toString().length);
		}
		return {
			search	: _myDecode(location.search.substr(1)),
			hash	: _myDecode(hash)
		};
	},

	encodeHtml	: function(str){
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, "&#039;").replace(/"/g, "&quot;");
	},

	decodeHtml	: function(str){
		return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#0?39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
	},


	/**
	 * 格式化时间戳
	 * @param {Integer} ts 待转换时间戳
	 * @param {String} fstr 格式串如y-m-d h:i:s 不区分大小写
	 */
	timeFormat	: function(ts, fstr) {
		var d = G.util.parse.getTimeInfo(ts);
		var r = {
			y: d.year,
			m: d.month,
			d: d.date,
			h: d.hour,
			i: d.minute,
			s: d.sec,
			w: d.week
		};
		$.each(r, function(k, v){
			if(k != 'y' && v < 10) r[k] = '0' + v;
		});
		return fstr.replace(/(?!\\)(y|m|d|h|i|s|w)/gi,
		function(a0, a1) {
			return r[a1.toLowerCase()];
		});
	},

	/**
	 * 时间戳转换成时间对象
	 */
	getTimeInfo	: function(t) {
		var week = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
		var d = new Date(t * 1000);
		return {
			year: d.getFullYear(),
			month: d.getMonth() + 1,
			date: d.getDate(),
			hour: d.getHours(),
			minute: d.getMinutes(),
			sec: d.getSeconds(),
			week: week[d.getDay()]
		};
	},
	
	/**
	 * 将变量转换为json格式字符串
	 */
	jsonToStr : function(obj) {
		if(typeof(obj) == "number") {
			return isFinite(obj) ? obj.toString() : '""';
		} else if(typeof(obj) == "string") {
			return '"' + obj.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g,
	            function(){   
		            var a = arguments[0];
		            return  (a == '\n') ? '\\n' :
		            	(a == '\r') ? '\\r' :
		            	(a == '\t') ? '\\t' : ''
		    	}
			) + '"';
		} else if(typeof(obj) == "boolean") {
			return obj ? 'true' : 'false';
		} else if($.isArray(obj)) {
			var jsonStr = '';
			for(var i = 0; i < obj.length; i++) {
				if(jsonStr == '')
					jsonStr = G.util.parse.jsonToStr(obj[i]);
				else
					jsonStr += ',' + G.util.parse.jsonToStr(obj[i]);
			}
			return '[' + jsonStr + ']';
		} else if($.isPlainObject(obj)) {
			var jsonStr = '';
			for(var p in obj) {
				if(jsonStr == '')
					jsonStr = '"' + p + '":' + G.util.parse.jsonToStr(obj[p]);
				else
					jsonStr += ',"' + p + '":' + G.util.parse.jsonToStr(obj[p]);
			}
			return '{' + jsonStr + '}';
		} else
			return '""';
	}
}; 
/**
 * 请求本地存储
 * 避免操作的紊乱
 * @param Function fn 回调函数，它的参数是cache对象
 */
G.util.localShare = (function(){
	// 事件队列
	var _queue = G.createFnQueue(),
		_scriptLoaded = 0,
		_localCache = false;

	return function(fn) {
		_queue.add(fn);

		if (_scriptLoaded == 2 && _localCache) { // 加载已完成
			_queue.exec(_localCache);
			return;
		}

		if (_scriptLoaded == 1) { // 加载中
			return;
		}

		_scriptLoaded = 1;

		var ver = '1.1';
		//var url = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'st.icson.com/static_v1/js/app/localShare.js?v=' + ver ;
		var _prefix = ('https:' == document.location.protocol ? 'https://' : 'http://');
		$.ajax({
			url	: 'http://st.icson.com/static_v1/js/app/localShare.js?v=' + ver,
			//url	: _prefix + 'st.icson.com/static_v1/js/app/localShare.js?v=' + ver,
			dataType	: 'script',
			crossDomain	: true,
			cache	: true,
			scriptCharset	: 'gb2312',
			success	: function() {
				G.app.localShare(function() {
					_scriptLoaded = 2;
					_localCache = this,
					_queue.exec(_localCache);
				});
			}
		});
	};
})();
 
G.util.ping = {
	VISIT_INFO_KEY	: 'vinfo',
	_visMap	: ['lastVisit'],
	_performance	: false,

	getVisitInfo	: function() {
		var self = G.util.ping,
			visitInfo = G.util.cookie.get(self.VISIT_INFO_KEY),
			ret = {};

		visitInfo = visitInfo.split(',');
		$.each(self._visMap, function(k, v) {
			ret[v] = visitInfo[k] || '';
		});

		return ret;
	},

	setVisitInfo	: function(key, val) {
		var self = G.util.ping,
			visitInfo = self.getVisitInfo(),
			p = {},
			r = [];

		if (arguments.length < 2) {
			p = key;
		}
		else {
			p[key] = val;
		}

		visitInfo = $.extend(visitInfo, key);
		$.each(self._visMap, function(k, v) {
			r[k] = visitInfo[v] || '';
		});

		G.util.cookie.add(self.VISIT_INFO_KEY, r.join(','), '/', 24 * 3600 * 365, '.'+G.domain);
	},

	getPerformanceTiming	: function() {
		var self = G.util.ping;

		if (self._performance === false) {
			var perf = window.performance;

			if (!perf || !perf.timing) {
				return [];
			}
			else {
				var timeList = [
						'navigationStart',
						'unloadEventStart',
						'unloadEventEnd',
						'redirectStart',
						'redirectEnd',
						'fetchStart',
						'domainLookupStart',
						'domainLookupEnd',
						'connectStart',
						'connectEnd',
						'requestStart',
						'responseStart',
						'responseEnd',
						'domLoading',
						'domInteractive',
						'domContentLoadedEventStart',
						'domContentLoadedEventEnd',
						'domComplete',
						'loadEventStart',
						'loadEventEnd'
					],
					perfvalues = [];

				for (var _len = timeList.length, i = _len-1; i >= 1; i--) {
					perfvalues[i] = perf.timing[timeList[i]] - perf.timing[timeList[0]];
				}

				self._performance = perfvalues;
			}
		}

		return self._performance;
	},

	timeStat	: (function() {
		var url = "http://isdspeed.qq.com/cgi-bin/r.cgi",
			tm = 2000,
			f1 = 1470;

		function _send(ts, f2, f3, ext) {
			var __send = (function(_ts, _f2, _f3, _ext) {
				return function() {
					if (($.type(_ts) == 'array' && _ts.length == 0) || $.isEmptyObject(_ts)) {
						return;
					}

					var v = [
						"flag1=" + f1,
						"flag2=" + _f2,
						"flag3=" + _f3
					],
					_img = new Image();

					$.each(_ts, function(_k, _v) {
						if (_k != 0) {
							v.push(_k + '=' + (_v <= 0 ? 0 : _v));
						}
					});

					_ext = _ext || {};
					for (var key in _ext) {
						v.push(key + "=" + _ext[key])
					}

					_img.src = url + "?" + v.join("&");
				}
			})(ts, f2, f3, ext);

			setTimeout(__send, tm);
		}
		return _send;
	})(),

	reportPerformance	: function(_f2, _f3, _ext) {
		var oldOnload = window.onload;

		window.onload = function() {
			if ($.isFunction(oldOnload)) oldOnload.apply(window);
			oldOnload = null;
			setTimeout(function() {
				G.util.ping.timeStat(G.util.ping.getPerformanceTiming(), _f2, _f3, _ext);
			}, 2000);
		};
	},

	// 商品详情页图片加载时间上报
	reportItemPicLoad: function(startTime, isBigImage) {
		var timeout = 2000;
		var duration = (new Date()).getTime() - startTime;
		var reportUrl = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=1470&flag2=50&flag3=" + (isBigImage ? 9 : 10) + "&1=" + duration;
		setTimeout(function() {
			(new Image()).src = reportUrl;
		}, timeout);
	},

	init	: function(url, domain) {
		// 登录数上报
		var vinfo = G.util.ping.getVisitInfo(),
			nowTime = Math.round((new Date()).getTime()/1000);

		// 达到时限(5分钟)并且是登录用户 进行上报 - “同时在线”
		if ((nowTime - (vinfo.lastVisit || 0) >= 300) && G.logic.login.getLoginUid()) { //300 = 5 * 60 (5分钟)
			(new Image()).src = "http://isdspeed.qq.com/cgi-bin/v.cgi?flag1=320001&flag2=1&flag3=600&1=1&2=0";
			vinfo.lastVisit = nowTime;
			G.util.ping.setVisitInfo(vinfo);
		}

		$(document).ready(function() { //特殊域名上报，有缓存，影响不大
			if (!url) {
				var domainPre = location.host.replace(/\.51buy\.com/, "");
				url = location.pathname;
				if (location.pathname == '/index.php' || location.pathname == '/json.php') {
					var args = G.util.parse.url();
					if (args.search.mod) {
						url = location.pathname.substr(0, location.pathname.length-4) + '_' + args.search.mod + '_' + (args.search.act || 'page');
					}
				}
			}

			var site_id = G.util.cookie.get('wsid'),
			url = "/_site_" + site_id +'/' + domainPre + url;

			$.ajax({
				url	: 'http://st.icson.com/static_v1/js/app/ping.js?v=1.7',
				dataType	: 'script',
				type	: 'get',
				cache	: true,
				success	: function() {
					if (!G.app.ping) return;

					$("body").bind('mousedown',function(e) {
						if (G.app.ping.stat) {
							G.app.ping.statClick(e && e.target, {
								pageid	: window.yPageId || 0,
								plevel	: window.yPageLevel || 0
							});
						}
					});

					setTimeout(function() {
						G.app.ping.stat({
							pageid	: window.yPageId || 0,
							plevel	: window.yPageLevel || 0
						});
					}, 100);
				}
			});

		

			$.ajax({
				//url	: 'http://mat1.gtimg.com/mini2009/js/cdn/pingMini.js',
				url	: 'http://pingjs.qq.com/tcss.ping.js',
				dataType	: 'script',
				type	: 'get',
				cache	: true,
				success	: function() {
				    pgvMain({repeatApplay: "true",virtualDomain: "51buy.qq.com", virtualURL: "51buy.qq.com/site_"+site_id+".html"});
					// 拍拍统计URL
					window.pp_req_url = document.URL.replace(/^http:\/\/([^\/]+)(\/|$)/, 'http://$1/_site_' + site_id + '/');
					$.ajax({
						//url	: 'http://static.paipaiimg.com/js/pp.foot.20100630.js?t=20110726153054',
					  	//url : 'http://static.paipaiimg.com/js/version/2012/08/pp.foot.20120806.js?t=20130108',
						//url : 'http://static.paipaiimg.com/js/version/2013/03/pp.foot.20130327.js',
						url : 'http://static.paipaiimg.com/js/version/2013/05/pp.foot.20130514.js?t=20130514095737',
						dataType	: 'script',
						type	: 'get',
						cache	: true,
						success	: function() {
							if (typeof(pgvMain) == 'function') {
								setTimeout(function() {
									$(document).click(function(e) {
										var filter = 'a,img,button,input,textarea,select',
											target = e && e.target;

										if ( target && filter.indexOf(target.nodeName.toString().toLowerCase()) !== -1 && $.isFunction(window.pgvSendClick) ) {
											while(target && target.nodeName.toString() !== 'BODY') {
												var hotName = target.getAttribute('hotName') || target.getAttribute('hotname');

												if ( hotName) {
													hotName += '';
													pgvSendClick({virtualDomain : "icson.qq.com", virtualURL : url, hottag : hotName.replace(/^(I\.)?(.*)$/i, function(a,b,c) {return site_id + '.' +  c; })  });
													pgvSendClick({virtualDomain : "icson_"+site_id+".qq.com", virtualURL : url, hottag : hotName.replace(/^(I\.)?(.*)$/i, function(a,b,c) {return site_id + '.' +  c; })  });
												}
												target = target.parentNode;
											}
										}
									});
								}, 1);
							}
						}
					}); //end of ajax pp.foot
				}
			}); //end of ajax pingMini
			
			if(!G.util.cookie.get("visitkey")){
				$.ajax({
					url	: 'http://service.paipai.com/cgi-bin/ping',
					dataType	: 'jsonp',
					jsonpCallback : 'getPingDataCallBack',
					type	: 'get',
					cache	: false,
					success	: function(data) {
						G.util.cookie.add('visitkey', data.visitkey, '/', parseInt((new Date(2099,11,31)-new Date())/(1000*60*60)), '.'+G.domain);
					}
				})
			}

			if (/clickstream=false/.test(window.location.href)) {
				G.util.cookie.del('clickstream', '.'+G.domain);
			}
			else if (/clickstream=true/.test(window.location.href)) {
				G.util.cookie.add('clickstream', 'true', '/', 1800, '.'+G.domain);
			}

			if (G.util.cookie.get('clickstream') == 'true' || (window.sessionStorage && (window.sessionStorage.getItem('clickstream') == 'true'))) {
				$.ajax({
					url	: 'http://st.icson.com/static_v1/statistic/js/stat.ui.js?v=1.3',
					dataType	: 'script',
					crossDomain	: true,
					cache	: true,
					scriptCharset	: 'utf-8',
					success	: function() {
						//
					}
				});
			}

			if (/mediav_id/.test(window.location.href)) {
				var mediav_arr = window.location.href.split('mediav_id');
				if (mediav_arr.length >=2 ) {
					var mediav_time = Math.round(new Date().getTime()/1000),
						mediav_value = mediav_arr[1].split('&')[0].split('=')[1] + "|" + mediav_time;

					G.util.cookie.add('mediav_data', mediav_value, '/', 604800, '.'+G.domain);
				}	
			}

			//国双
			if (/gsadid/.test(window.location.href)) {
				var gsadid_arr = window.location.href.split('gsadid');
				if (gsadid_arr.length >=2 ) {
					var gsadid_time = Math.round(new Date().getTime()/1000),
						gsadid_value = gsadid_arr[1].split('&')[0].split('=')[1] + "|" + gsadid_time;

					G.util.cookie.add('gsadid_data', gsadid_value, '/', 604800, '.'+G.domain);
				}	
			}
		}); //end of ready
	} //end of init
}; 
(function(G, $, undefined){
	function tip(opt){
        var instanceOf = function(o, type) {
            return (o && o.hasOwnProperty && (o instanceof type));
        };
        if (!(instanceOf(this, tip))) {
            return new tip(opt);
        }
        opt = jQuery.extend({}, {
			"position" : "rightBottom",  // 提示tip相对于target的位置, 可选：'leftTop','rightTop','rightBottom','leftBottom'
			"distance" : 20,  //尖角相对于tip顶点的距离
			"width" : "120",
			"html" : "",	//提示信息
			"target" : null,	//tip相对停靠的节点, 类型： selector
			"buttons" : null,	//tip中的按钮文字, 如 ['确定', '取消']
			"group" : null,		//tip所属的组，当设定了这个参数，属于同一组的tip将在document中最多显示一个
			"className" : "global_tip",	//tip最外层 节点的样式
			"time" : null // time毫秒后自动关闭, 当存在按钮时，该参数无效
		//  "click_1" : function(){}	//点击第n个按钮时的回调函数, 从1开始
		}, opt || {});

		var self = this, target = $(opt.target), instance = target.data('tipInstnace');
		if(instance)
			instance.close();

		//属于同一组的tip只显示一个
		tip.instance = tip.instance || [];
		if(opt.group){
			for(var i = 0, len = tip.instance.length; i < len; i++){
				if(tip.instance[i].opt.group === opt.group){
					tip.instance[i].close();
				}
			}
		};

		var showButtons = (opt.buttons && !$.isArray(opt.buttons) ) || ($.isArray(opt.buttons) && opt.buttons.length > 0 );
		this.element = $('<div class="'+opt.className+'"><div class="content">'+opt.html+'</div>'+ ( showButtons ? '<div class="buttons"></div>' : '') +'<span class="arrow">◆<span class="inner">◆</span></span></div>').css('width', opt.width);
		this.opt = opt;
		this.opt.id = new Date().getTime();

		//展现按钮
		if(showButtons){
			var str = $.map( $.isArray(opt.buttons)? opt.buttons : [opt.buttons], function(value, index){
				return '<a href="#" onclick="return false" class="'+ ( index == 0 ? 'btn_strong' : 'btn_common' )+'">'+ value +'</a>';
			}).join('');
			var buttons = this.element.find('.buttons');
			buttons.append(str);
			buttons.find('a').each(function(index){
				$(this).click(function(){
					if( self.element.triggerHandler('click_' + ( index + 1 )) !== false )
						self.close();
				});
			}).first().focus();
		}
		this.element.appendTo(document.body);

		//time毫秒后自动关闭
		if(!showButtons && opt.time ){
			this.timer = setTimeout(function(){
				self.close();
			}, parseInt(opt.time, 10));
		}

		//确定尖角的位置
		var arrowCss = {}, innerCss = {}, distance = parseInt(opt.distance, 10);
		var sizeTop = $.browser.mozilla ? 12 : ($.browser.webkit ? 12 : 13)
		var sizeBottom = $.browser.mozilla ? 10 : ($.browser.webkit ? 10 : 10)
		switch(opt.position){
			case "leftTop" :
				arrowCss = { bottom : -1 * sizeTop, right : distance };
				innerCss = { top : -1 };
				break;
			case "rightTop" :
				arrowCss = { left : distance, bottom : -1 * sizeTop};
				innerCss = { top : -1 };
				break;
			case "leftBottom" :
				arrowCss = {top : -1 * sizeBottom, right : distance };
				innerCss = {top : 1 }
				break;
			default :
				arrowCss = { top : -1 * sizeBottom, left : distance};
				innerCss = { top : 1 };
				break;
		}

		var arrow = $(".arrow", this.element);
		arrow.css(arrowCss);
		$(".inner", this.element).css(innerCss);

		//确定整个tip的位置
		var arrowOffset = arrow.offset(),  targetOffset = target.offset(), point1, point2;
		switch(opt.position){
			case "leftTop":
			case "rightTop":
				point1 = {
					x : parseInt(arrowOffset.left, 10) + parseInt(arrow.width(), 10) / 2,
					y : parseInt(arrowOffset.top, 10) + parseInt( arrow.height(), 10)
				};

				point2 = {
					x : parseInt(targetOffset.left, 10) + parseInt(target.width(), 10) / 2,
					y : parseInt(targetOffset.top, 10)
				}
				break;
			default:
				point1 = {
					x : parseInt(arrowOffset.left, 10) + parseInt(arrow.width(), 10) / 2,
					y : parseInt(arrowOffset.top, 10)
				};

				point2 = {
					x : parseInt(targetOffset.left, 10) + parseInt(target.width(), 10) / 2,
					y : parseInt(targetOffset.top, 10) + parseInt(target.height(), 10)
				}
				break;
		}
		var pos = this.element.position();
		this.element.css({
			"left" : parseInt(pos.left) - point1.x + point2.x,
			"top" : parseInt(pos.top) - point1.y + point2.y
		});

		var self = this;
		self._close = function(){
			self && self.close();
		};
		$(window).bind('resize', self._close);

		tip.instance.push(this);
		target.data('tipInstnace', this);

		//通过形参绑定事件
		for(var name in opt){
			if( /^click_\d$/.test(name.toString())){
				this.bind(name, opt[name]);
			}
		}
	};

	$.extend(tip.prototype, {
		//绑定按钮事件
		bind : function(){
			this.element.bind.apply(this.element, $.makeArray(arguments) );
		},

		//关闭tip
		close: function(){
			clearTimeout(this.timer);
			$(window).unbind('resize', self._close);
			this.element.data('tipInstnace', null);
			for(var i = 0, len = tip.instance.length; i < len; i++ ){
				if( tip.instance[i].opt.id == this.opt.id){
					tip.instance.splice(i, 1);
					break;
				}
			}
			this.element.remove();
		},

		//tip中的按钮
		getButtons :function(){
			return this.element.find(".buttons>a");
		},

		//tip最外层dom(jquery对象)
		getElement : function(){
			return this.element;
		},

		//tip是否显示
		isShow: function(){
			return this.element[0].style.display !== 'none'
		},

		//显示tip
		show : function(){
			this.element[0].style.display = 'block';
		},

		//隐藏tip
		hide: function(){
			this.element[0].style.display = 'none';
		}
	});
	G.ui.arrowTip = tip;
})(G, jQuery); 
(function(window, $, undefined){
	function autoCompleteItem(opt){
		
		this.opt = $.extend({}, {
			'tpl' : '',
			"itemActiveClass" : '',
			"data" : null,
			"index" : -1,
			"url" : ""
		}, opt || {});
		
		this.init();
	}	
	
	autoCompleteItem.prototype = {
		constructor : autoCompleteItem,
		trigger: function(){
			this.element && this.element.triggerHandler.apply(this.element, Array.prototype.slice.call(arguments, 0, arguments.length));
		},
		bind: function(){
			this.element && this.element.bind.apply(this.element, Array.prototype.slice.call(arguments, 0, arguments.length));
		},
		init: function(){
			var self = this,
				_html = this.opt.tpl.toString().replace(/{([^}]+)}/g, function(a, b){
					return undefined === self.opt.data[b] ? '' : self.opt.data[b] 	
				})
				
			this.element = $(_html);
			
			this.element.hover(function(){self.active()}, function(){self.unActive()}).click(function(){
				self.trigger('item_click', self.opt.data);
				return false;
			});
		},
		active: function(){
			this.element && this.element.addClass(this.opt.itemActiveClass);
			this.mouseIn = true;
			this.trigger('active', this.opt.index);
		},
		unActive: function(){
			this.mouseIn = false;
			this.element && this.element.removeClass(this.opt.itemActiveClass);
			this.trigger('unactive');
		},
		remove: function(){
			this.element.remove();
		},
		isActive: function(){
			return !!this.mouseIn;
		},
		getData: function(){
			return this.opt.data;
		}
		
	}
	function autoComplete(opt){
		
		if( !( this.hasOwnProperty && this instanceof autoComplete )){
			return new autoComplete(opt);
		}
		
		this.opt = $.extend({}, {
			"target" : null,
			"listOnClass" : "",
			"delayTime" : 200,
			"elementClass" : "autocomplete",
			"cache" : true,
			"itemTPL" : "<li>{label}</li>",
			"itemActiveClass" : 'on',
			"params" : "",
			"keyName" : "kw",
			"cache" : true
		}, opt || {});
		
		var target = $(this.opt.target);
		
		if(target.length === 0){
			return null;
		}
		
		this.target = target.eq(0);
		
		this.items = [];
		
		this.init();
	};
	
	autoComplete.prototype = {
		constructor : autoComplete,
		keyCode: {
			ALT: 18,
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			COMMAND: 91,
			COMMAND_LEFT: 91, // COMMAND
			COMMAND_RIGHT: 93,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			MENU: 93, // COMMAND_RIGHT
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			WINDOWS: 91 // COMMAND
		},			
		
		
		resize: function(){

			var target = this.target, targetPos = target.offset();
			
			this.element.css({
			//	"width" : ( parseFloat(target.outerWidth(), 10) || 0 ) - ( parseFloat( element.css("border-left-width"), 10) || 0 )  - ( parseFloat( element.css("border-right-width"), 10) || 0 ) - ( parseFloat( element.css("padding-left"), 10) || 0 ) - ( parseFloat( element.css("padding-right"), 10) || 0 ),
				"left" : ( targetPos.left || 0 ),
				"top" : ( parseFloat(targetPos.top, 10) || 0 ) + ( parseFloat(target.outerHeight(), 10) || 0 ) - ( parseFloat(target.css("border-bottom-width"), 10) || 0 )
			});
		},
		
		init: function(){
			var self = this,
				target = this.target,
				opt = this.opt,
				element = $('<ul class="' + opt.elementClass + '"></ul>');
				
			this.element = element;			
			
			$(window).bind('resize', function(){
				self.resize();
			});
			
			this.resize();
			
		
			this.items = [];
			
			this.target.click(function(){
				if(self.items.length > 0){
					self.show();
				}
			});
			this.target.bind("keydown.autocomplete", function(ev){
				self.bindKeyDown(ev);
			});
			
			this.target.bind("keyup.autocomplete", function(event){
				var key = event.keyCode, 
					keyCode = self.keyCode;
				if( key === keyCode.UP || key === keyCode.DOWN || key === keyCode.ENTER || key === keyCode.NUMPAD_ENTER || key === keyCode.LEFT || key === keyCode.RIGHT  ){	
					return ;
				}
				self.queryDelaySend();
			});
			
			this.target.bind("enter.autocomplete", function(){self.hide()});

			this.target.bind("click.autocomplete", function(){self.hide()});
			
			this.target.bind("blur", function(){
				setTimeout(function(){
					self.hide();
				}, 200);
			});
		},
		
		destory : function(){
			
		},
		
		ajax: function(value){
			var self = this;
			
			self.hide();
			this.term = value;
			
			this.cache = this.cache || {};
			
			if(this.opt.cache && undefined !== self.cache[value]){
				self.requestSuccess(self.cache[value]);
			}
			else{
				var param = {};
				
				if(self.opt.keyName){
					param[self.opt.keyName] = value;
				}
				
				self.xhr && self.xhr.abort();
				self.xhr = $.ajax({
					"url" : self.opt.url,
					"data" : $.extend(param, self.opt.params || {}),
					"async" : true,
					"dataType" : "jsonp",
					"cache" : false,
					"crossDomain" : true,
					"scriptCharset" : "gb2312",
					"success" : function(json){
						if(self.opt.cache){
							self.cache[value] = json;
						}
						
						self.requestSuccess(json);
					}
				});
			}
					
		},
		requestSuccess: function(data){
			var self = this,
				result = {response: data};
			this.trigger("success", result);
			
			this.hide();
			if($.isArray(result.response)){
				for(var i = 0 , len = result.response.length; i < len; i++){
					var _item  = new autoCompleteItem({
						data :  result.response[i],
						tpl: self.opt.itemTPL,
						itemActiveClass : self.opt.itemActiveClass,
						itemTPL : self.opt.itemTPL,
						index : i
					});
					this.bindItem(_item);
					this.element.append(_item.element);
					this.items.push(_item);
				}
				
				if(result.response.length > 0){
					this.show();
				}
			}
		},
		bindItem: function(item){
			var self = this;
			
			item.bind('item_click', function(event, data){
				self.target[0].value  = data.value;
				self.hide();
				self.trigger('complete', {from: 'click', index : item.opt.index});
			});
			
			item.bind('active', function(event, index){
				for(var i = 0, len = self.items.length; i < len; i++){
					if( i !== index){
						self.items[i].unActive();
					}
				}
			})
		},
		bindKeyDown: function(event){
			var self = this, keyCode = self.keyCode;
			
			switch( event.keyCode ) {
			case keyCode.UP:
				if(self.isActive()){
					self.prev();
					event.preventDefault();
				}
				break;
			case keyCode.DOWN:
				if(self.isActive()){
					self.next();
					event.preventDefault();
				}
				break;
			case keyCode.ENTER:
			case keyCode.NUMPAD_ENTER:
				self.trigger("enter");
			case keyCode.ESCAPE:
				self.hide( event );
				break;
			default:
			//	self.queryDelaySend();
				break;
			}			

		},
		queryDelaySend: function(){
			var self = this;
			
			clearTimeout(self.delayTimer);
			self.delayTimer = setTimeout(function(){
				var _value =  self.target[0].value;
				if(self.term !==_value){
					if($.trim(_value) !== ""){
						self.ajax(_value);
					}
					else{
						self.term = "";
						self.xhr && self.xhr.abort();
						self.hide();
					}
				}
			}, self.opt.delayTime);
		},
		show: function(){
			this.resize();
			this.activeStatus = true;
			this.element && this.element.addClass(this.opt.listOnClass);
			this.element.appendTo("body");
			this.trigger("show");
		},
		hide : function(){
			this.activeStatus = false;
			this.element && this.element.removeClass(this.opt.listOnClass);
			this.element.detach();
			for(var i = 0, len = this.items.length; i < len; i++){
				this.items[i].remove();
			}
			this.items = [];			
			this.trigger("hide");		
		},
		getActiveIndex: function(){
			var _activeIndex = -1;
			for(var i = 0, len = this.items.length ; i < len; i++){
				if(true === this.items[i].isActive()){
					_activeIndex = i;
					break;
				}
			}
			
			return _activeIndex;
		
		},
		prev: function(){
			var _activeIndex = this.getActiveIndex();
			if( -1 !== _activeIndex){
				this.items[_activeIndex].unActive();
				this.target.val(this.term);
			}
			
			_activeIndex = (_activeIndex === -1 ? this.items.length : _activeIndex ) - 1;
			
			if( _activeIndex > -1 ){
				var _item = this.items[_activeIndex];
				_item.active();
				this.target.val(_item.getData().value);
			}
		},		
		next: function(){
			var _activeIndex = this.getActiveIndex();
			if( -1 !== _activeIndex){
				this.items[_activeIndex].unActive();
				this.target.val(this.term);
			}
			
			if( _activeIndex + 1 < this.items.length){
				var _item = this.items[_activeIndex + 1];
				_item.active();
				this.target.val(_item.getData().value);
			}
		},
		isActive: function(){
			return !!this.activeStatus;
		},
		trigger: function(){
			this.element && this.element.triggerHandler.apply(this.element, Array.prototype.slice.call(arguments, 0, arguments.length));
		},
		bind: function(){
			this.element && this.element.bind.apply(this.element, Array.prototype.slice.call(arguments, 0, arguments.length));
		}
	
	}
	
	G.ui.autoComplete = autoComplete;

})(window, jQuery); 
/*
 *  Author: Jacky
 *  Date: 2010-7-14
 *  Description: flash plugin of jQuery
 * */
(function(G, $, window, undefined){

 	var $$ = function(path, s){
 			
 		this.instance = 'jswf_' + (new Date).getTime();

		var options = this.options = $.extend({}, $$.options, s);
		var id = this.id = options.id || this.instance;
		var container =$(options.container || "<div></div>");

		$$.CallBacks[this.instance] = {};

		var params = options.params, vars = options.vars, callBacks = options.callBacks;
		var properties = $.extend({}, {height: options.height, width: options.width}, options.properties);

		var self = this;

		for (var callBack in callBacks){
			$$.CallBacks[this.instance][callBack] = (function(option){
				return function(){
					return option.apply(self.object, arguments);
				};
			})(callBacks[callBack]);
			vars[callBack] = 'G.ui.swf.CallBacks.' + this.instance + '.' + callBack;
		}

		params.flashVars = $.param(vars);

		if ($.browser.msie){
			properties.classid = 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';
    		properties.codebase = 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0';
			params.movie = path;
		} else {
			properties.type = 'application/x-shockwave-flash';
			properties.data = path;
		}

		var build = ['<object id="', id ,'"'];
		
		for(var property in properties){
				build.push(' ', property , '="' , properties[property] , '"');
		}
		
		build.push('>');
		for (var param in params){
			if (params[param] !== undefined ) build.push('<param name="' , param , '" value="' , params[param] , '" />');
		}
		build.push('</object>');
		$.each(container, function(i,v){
			v.innerHTML = build.join('');;
		}); 
 		this.getObject();
 		
 	};
	$.extend($$, {
	 		options: {
				id: null,
				height: 1,
				width: 1,
				container: null,
				properties: {
					align: "middle"
				},
				params: {
					quality: 'high',
					allowScriptAccess: 'always',
					wMode: 'transparent',
					swLiveConnect: true,
					menu: false
				},
				callBacks: {},
				vars: {}
			},
	        CallBacks: {},
	        remote: function(obj, fn){
				var rs = obj.CallFunction('<invoke name="' + fn + '" returntype="javascript">' + __flash__argumentsToXML(arguments, 2) + '</invoke>');
				return eval(rs);
			}
	});
	
	$.extend($$.prototype, {
		toElement: function(){
			return this.object;
		},
		getObject: function(){
			var self = this;
			this.object = document[this.id] || window[this.id];
			if(!this.object)
				setTimeout(function(){self.getObject()}, 1);
		},
		remote: function(){
			var par = [this.toElement()];
			for(var i = 0, len = arguments.length ; i < len ; i++)
				par.push(arguments[i]);
			return $$.remote.apply($$, par);
		}
	 
	});

	$$.getVersion = function () {
	    var n = navigator;
	    if (n.plugins && n.mimeTypes.length) {
	        var plugin = n.plugins["Shockwave Flash"];
	        if (plugin && plugin.description) {
	            return plugin.description
	                    .replace(/([a-zA-Z]|\s)+/, "")
	                    .replace(/(\s)+r/, ".") + ".0";
	        }
	    } else if (window.ActiveXObject && !window.opera) {
	        for (var i = 10; i >= 2; i--) {
	            try {
	                var c = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + i);
	                if (c) {
	                    var version = c.GetVariable("$version");
	                    return version.replace(/WIN/g,'').replace(/,/g,'.');
	                }
	            } catch(e) {}
	        }
	    }
	};

 	G.ui.swf = $$;
 
 })(G, jQuery, window); 
/**
 * 
 */
G.ui.drag = (function(){
	// 当前拖拽元素
	var _curEle = null;
	// 响应拖拽的元素
	var _curEleLauncher = null;
	// 初始横坐标
	var _x = 0;
	// 初始纵坐标
	var _y = 0;
	// 当前横坐标
	var _cx = false;
	// 当前纵坐标
	var _cy = false;
	// 其他参数
	var _opt = {};

	/**
	* 移动中的事件
	* @param {Event} e 产生的事件
	*/
	function _moving(e){
		e.stopPropagation();
		e.preventDefault();
		if(!_curEle || !_curEleLauncher) return;
		var sl = $(window).scrollLeft();
		var st = $(window).scrollTop();
		var x = _x + e.clientX + sl;
		var y = _y + e.clientY + st;
		// 限制在可见区域内
		x=Math.min(Math.max(x, sl), $(window).width() - $(_curEle).outerWidth() + sl);
		y=Math.min(Math.max(y, st), $(window).height() - $(_curEle).outerHeight() + st);

		if(x < 0) x = 0;
		if(y < 0) y = 0;

		if($(_curEle).css('position') == 'fixed'){
			$(_curEle).offset({ left:x, top:y});
		} else {
			$(_curEle).offset({ left:x, top:y});
		}
		_cx = x;
		_cy = y;
	}

	function _start(e){
		e.stopPropagation();
		e.preventDefault();
		if(!_curEle || !_curEleLauncher) return;
		var sl = $(window).scrollLeft();
		var st = $(window).scrollTop();
		_x = _curEle.offsetLeft-e.clientX-sl;
		_y = _curEle.offsetTop-e.clientY-st;
		if($(_curEle).css('position') == 'fixed'){
			_x += sl;
			_y += st;
		}

		_cx = false;
		_cy = false;
		
		var d = _curEleLauncher&&_curEleLauncher.setCapture ? _curEleLauncher : document;
		$(d).bind('mousemove.moving', _moving).bind('mouseup.stop', _stop);
		setEventCapture(d);
	}

	function _stop(e){
		if(!_curEleLauncher) return;

		var d = _curEleLauncher&&_curEleLauncher.setCapture ? _curEleLauncher : document;
		$(d).unbind('mousemove.moving');
		$(d).unbind('mouseup.stop');

		if(typeof _opt.onstop == 'function') _opt.onstop.apply(_curEleLauncher);
		if(_opt.fixed && _cx !== false && _cy !== false){
			var sl = $(window).scrollLeft();
			var st = $(window).scrollTop();
			$(_curEle).fixedPosition({
				fixedTo	: 'top',
				fixedTop	: _cy < st ? 0 : (_cy - st),
				fixedLeft	: _cx < sl ? 0 : (_cx - sl)
			});
		}
		_curEle = null;
		_curEleLauncher = null;
		_x = 0;
		_y = 0;
		releaseEventCapture(d);
	}

	// 设置事件捕获
	function setEventCapture(target) {
		if (target.setCapture) target.setCapture();
		else if (window.captureEvents || document.captureEvents) (window.captureEvents || document.captureEvents)(Event.MouseMove | Event.MouseUp);
	}

	// 释放事件捕获
	function releaseEventCapture(target) {
		if (target.releaseCapture) target.releaseCapture();
		else if (window.releaseEvents || document.releaseEvents) (window.releaseEvents || document.releaseEvents)(Event.MouseMove | Event.MouseUp);
	}	

	return {
		enable	: function(e, el, opt){
			if(typeof el == 'string') el = $('#' + el).get(0);
			if(typeof e == 'string') {
				if(!el) el = $('#' + e+'_head').get(0);
				e = $('#' + e).get(0);
			}
			if(!e || !el) return;
			_opt = opt || {};
			$(el).mousedown(function(ee){
				_curEle = e;
				_curEleLauncher = el;
				_start(ee);
			});
		}
	};
})(); 
G.ui.droplist = {
	attach	: function(){
		// ...
	}
}; 
/**
 * 弹出层等
 * 规定，普通元素的最大zIndex为1099，全屏模态框的iframe的zIndex为1100、div为1101，弹出层的均大于1101
 * @param {Object} o 传递的参数
 */
G.ui.modal = (function(){
	var fullModal = null;
	return {
		create	: function(obj, fixed){
			var ifr = null;
			if(!obj){
				ifr = fullModal && fullModal.length > 0 ? fullModal : $('<iframe src="javascript:void(0)"></iframe>').css({
					opacity	: 0,
					background	: '#000',
					left	: '0',
					display	: 'none',
					zIndex	: 1100,
					top	: '0',
					position	: 'absolute'
				});

				ifr.css({
					width	: $(window).width() + 'px',
					height	: $(window).height() + 'px'
				});

				ifr.appendTo($('body')).show();
				if(fixed){
					ifr.fixedPosition({
						fixedTo		: 'top',
						fixedTop	: 0,
						fixedLeft	: 0
					});
				} else {
					ifr.css({
						left	: $(window).scrollLeft(),
						top	: $(window).scrollTop()
					});
				}
			} else {
				ifr = $('<iframe style="z-index:-1;width:'+$(obj).innerWidth()+'px;height:'+$(obj).innerHeight()+'px" src="javascript:void(0)" frameborder="0" scrolling="no" width="100%" height="100%"></iframe>').css({
					opacity	: 0,
					background	: '#FFF',
					left	: '0',
					top	: '0',
					position	: 'absolute'
				});
				ifr.appendTo(obj);
			}

			return ifr;
		}
	};
})();

G.ui.popup = {
	_cssLoaded	: false,
	_loadCss	: function(){
		if(this._cssLoaded) return;
		this._cssLoaded = true;
		var cssFile = G.prefix.st + "static_v1/css/package/package_v1.css";
		if( G.prefix.ssl )
		{
			cssFile = G.prefix.st_ssl + "static_v1/css/package/package_v1.css";
		}
		var cssExists = false;
		$('link').each(function(){
			if($(this).attr('href') == cssFile){
				cssExists = true;
				return false;
			}
		});

		if(!cssExists) $('<link href="'+cssFile+'" rel="stylesheet" type="text/css" charset="utf-8" />').appendTo($('head'));
	},
	_zIndex	: 1101,
	/**
	* 创建一个弹出层
	* @param {Object} opt 参数设置
	* @return {
	* 	close	: function(){}, //关闭
	* 	show	: function(){}, // 显示
	* }
	*/
	create	: function(opt){
		this._loadCss();
		var _header = null, _content = null,
			_opt = opt || {},
			fixH = _opt.height > 50;

		_opt.width = _opt.width || 500;
		//_opt.fixed = false;
		_opt.fixed = _opt.fixed === false ? false : true;

		var o = $('<div style="box-shadow:2px 2px 4px rgba(0, 0, 0, 0.5);z-index:'+(++this._zIndex)+';'+(fixH ? ('height:'+_opt.height+'px') : '')+';width:'+_opt.width+'px;" class="layer_global">\
<div class="layer_global_main">\
<div class="layer_global_title">\
<h3><span class="jian">&gt;</span>'+(_opt.title || '温馨提示')+'<span></span></h3>\
<button title="关闭" ytag="84777"><span class="none">╳</span></button>\
</div>\
<div class="layer_global_cont layer_cont_15">\
</div>\
</div>\
</div>');

		o.appendTo($('body'));
		// 定位
		if(_opt.fixed){
			o.fixedPosition({
				fixedTo	: 'top'
			});
		}

		_header = o.find('.layer_global_main .layer_global_title')[0];
		_content = o.find('.layer_global_main .layer_global_cont')[0];

		if(opt.contWidth == '30') $(_content).removeClass('layer_cont_15').addClass('layer_cont_30');
		function _createModal(obj){
			o.mIframe = G.ui.modal.create(obj, o.ifFixedPosition());
		}

		function _setAtCenter(w, h){
			if(null == w) w = o.width();
			if(null == h) h = o.height();
			var ww = $(window).width(),
				wh = $(window).height();

			var xw = (_opt.fullscreen && ww < w ? 0 : (ww/2-w/2)),
				xh = (_opt.fullscreen && wh < h ? 0 : (wh/2-h/2));
			if(o.ifFixedPosition()){
				o.fixedPosition({
					fixedTo	: 'top',
					fixedLeft	: xw,
					fixedTop	: xh
				});
			} else {
				o.css("left", $(window).scrollLeft() + xw + "px");
				o.css("top", $(window).scrollTop() + xh + "px");
			}

			if(_opt.fullscreen && !o.mDiv){
				var div = $('<div></div>').css({
					opacity	: 0.05,
					background	: '#000',
					display	: 'none',
					zIndex	: 1101,
					width	: $(window).width()+'px',
					height	: $(window).height()+'px'
				}).appendTo('body');

				if(o.ifFixedPosition()){
					div.fixedPosition({
						fixedTo		: 'top',
						fixedLeft	: 0,
						fixedTop	: 0
					});
				} else {
					div.css({
						left	: $(window).scrollLeft(),
						top	: $(window).scrollTop(),
						position	: 'absolute'
					});
				}

				div.show();

				if(!o.ifFixedPosition()){
					if($.browser.msie){
						$("html").css({'overflow' : "hidden"});
					}else{
						$("body").css({'overflow' : "hidden"});
					}
				}
				o.mDiv = div;
			}

			if($.browser.msie && $.browser.version >= 6.0 && !o.mIframe){
				_createModal(_opt.fullscreen ? null : o);
			}
		}

		function _close(triggerDefaultAction){
			if (_opt.fullscreen && o.mDiv) { // 全屏模式销毁模态框
				o.mDiv.remove();
				o.mDiv = null;
				if (o.mIframe) {
					o.mIframe.remove();
					o.mIframe = null;
				}

				if(!o.ifFixedPosition()){
					if($.browser.msie){
						$('html').css({
							'overflow' : 'scroll',
							'overflow-x' : 'hidden'
						});
					}else{
						$('body').css({
							'overflow' : 'scroll',
							'overflow-x' : 'hidden'
						});
					}
				}
			}

			if (triggerDefaultAction !== false && $.isFunction(_opt.closeFn))
				_opt.closeFn.apply(null);

			o.hide();
		}

		$(_header).children('button').click(_close);

		!_opt.disableDrag && G.ui.drag.enable(o.get(0), _header, {
			fixed	: o.ifFixedPosition()
		});
		if(fixH) _setAtCenter(_opt.width, fixH ? _opt.height : 300);
		else _close(); // 默认隐藏

		return {
			onclose	: function(closeFn){
				_opt.closeFn = closeFn;
			},
			close	: _close,
			hide	: _close,
			show	: function(){
				//o.fadeIn(100);
				o.show();
				_setAtCenter();
			},
			paint	: function(uFunc){
				if(!$.isFunction(uFunc)) return;

				var cbObj = {
					header	: _header,
					content	: _content
				};

				return uFunc.apply(o, [cbObj]);
			},
			setAtCenter	: _setAtCenter,
			resize	: function(newSize){
				if(!$.isPlainObject(newSize)) return;
				if(newSize.width) o.css('width', newSize.width + 'px');
				if(newSize.height > 50) {
					o.css('height', newSize.height + 'px');
					$(_content).height(newSize.height - 50);
				}

				_setAtCenter();
			}, 
			resizeNoCenter : function(newSize){
				if(!$.isPlainObject(newSize)) return;
				if(newSize.width) o.css('width', newSize.width + 'px');
				if(newSize.height > 50) {
					o.css('height', newSize.height + 'px');
					$(_content).height(newSize.height - 50);
				}

			}
		};
	},
	_msgPopup	: null,
	showMsg	: function(msg){
		var args = arguments,
			opt = args[1] || {};
		if($.type(opt) != 'object'){
			// 兼容map
			opt = {};
			$.each({
				1	: 'type',
				2	: 'okFn',
				3	: 'closeFn',
				4	: 'cancelFn',
				5	: 'okText',
				6	: 'cancelText'
			}, function(k, v){
				if(args[k] != null) opt[v] = args[k];
			});

			if(opt.okText && opt.cancelText) opt.btns = 3;
		}

		if(!this._msgPopup){
			this._msgPopup = G.ui.popup.create({
				title	: '提示',
				width	: 500,
				height	: 170,
				fullscreen	: 1
			});
		}

		var levels = {
			//0	: 'info',
			1	: 'warn',
			2	: 'error',
			3	: 'right'//,
			//4	: 'help'
		};
		if(!(opt.type in levels)) opt.type = 1;

		if(!$.isArray(msg)){
			msg = [msg];
		}

		opt.btns = opt.btns || 1;
		this._msgPopup.paint((function(_){
			return function(uObj){
				$(uObj.content).empty().html(' <div class="layer_global_mod">\
	<b class="icon icon_msg4 icon_msg4_'+levels[opt.type]+'"></b>'+(msg.length >= 1 ? ('<h4 class="layer_global_tit">'+msg[0]+'</h4>') : '')+'\
	'+(msg.length >= 2 ? ('<p>'+msg[1]+'</p>') : '')+(msg.slice(2, msg.length).join(''))+'\
	<div class="wrap_btn"><a class="btn_strong" href="#" onclick="return false">'+(opt.okText||'确定')+'</a> <a class="btn_common" href="#" onclick="return false">'+(opt.cancelText||'取消')+'</a></div>\
	</div>');

				$(".wrap_btn .btn_strong", uObj.content).click(function(){
					var kill = true;
					if($.isFunction(opt.okFn)) {
						kill = opt.okFn() !== false;
					}
					if(kill) _.hide(false);
				})[(opt.btns & 1) ? 'show' : 'hide']();

				$(".wrap_btn .btn_common", uObj.content).click(function(){
					var kill = true;
					if($.isFunction(opt.cancelFn)) {
						kill = opt.cancelFn() !== false;
					}
					if(kill) _.hide(false);
				})[(opt.btns & 2) ? 'show' : 'hide']();

				_.show();
			};
		})(this._msgPopup));

		// setting pop close callback function
		this._msgPopup.onclose($.isFunction(opt.closeFn) ? opt.closeFn : $.noop);
		return this._msgPopup;
	}
};

(function($){
	var __fixed = {},
		__fixedId = 0,
		__supportsPositionFixed = null,
		supportsPositionFixed = function() {
			if(__supportsPositionFixed === null){
				var dom = $( '<span id="supportsPositionFixed" style="position:fixed;width:1px;height:1px;top:25px;"></span>' ).appendTo($('body'));
				var offset = dom.offset();
				dom.remove();
				__supportsPositionFixed = (offset.top - $(window).scrollTop()) === 25;
			}
			return Boolean(__supportsPositionFixed);
		},
		__fixCss = false,
		fixCss = function(){
			if(__fixCss !== false) return;
			var _body = $("body");
			var url = "http://st.icson.com/static_v1/img/blank.gif";
			if (G.prefix.ssl )
			{
				url = G.prefix.st_ssl + "/static_v1/img/blank.gif";
			}
			if( (_body.css("background-image")) == "none" ) {
				_body.css({
					"background-image"	: "url("+url+")",
					"background-attachment"	:"fixed"
				});
			} else {
				_body.css("background-attachment", "fixed");
			}
			__fixCss = true;
		};

	$.fn.ifFixedPosition = function(){
		if(!this.attr("id") || this.attr("id").length == 0) return false;
		return !!__fixed[this.attr("id")];
	},
	$.fn.fixedPosition = function(options) {
		var defaults = {
			fixedTo: "bottom",
			fixedTop: 0,
			fixedBottom: 0,
			fixedLeft: false,
			effect: false,
			effectSpeed: 1000
		};

		//var _body = $("body");
		var options = $.extend(defaults, options);

		return this.each( function() {
			var fb = $(this);
			if(!fb.attr("id") || fb.attr("id").length == 0) fb.attr("id", "positionFixedID"+(__fixedId++) );
			if( !supportsPositionFixed() ) {
				fixCss();
				var expr = "";
				if(options.fixedTo == "top") {
					expr = '$(document).scrollTop()';
					if(options.fixedTop > 0){
						expr += '+' + options.fixedTop;
					}
				} else {
					expr = '$(document).scrollTop() - $("#'+fb.attr("id")+'").outerHeight() + (document.documentElement.clientHeight || document.body.clientHeight)';
					if(options.fixedBottom > 0){
						expr += '-' + options.fixedBottom;
					}
				}

				fb.css('position', 'absolute');
				if(fb.length > 0 && fb[0].style && fb[0].style.setExpression) fb[0].style.setExpression('top', 'eval('+expr+')');
				else fb.css('top', (options.fixedTop || 0) + 'px');
				if(options.fixedLeft !== false){
					fb.css('left', $(document).scrollLeft() + (options.fixedLeft - 0) + 'px');
				}
			} else {
				fb.css('position', 'fixed');
				if(options.fixedTo == "top") {
					fb.css('top', (options.fixedTop || 0) + 'px');
				} else {
					fb.css('bottom', (options.fixedBottom || 0) + 'px');
				}
				if(options.fixedLeft !== false){
					fb.css('left', options.fixedLeft + 'px');
				}
			}

			__fixed[$(this).attr("id")] = 1;
			if(options.effect){
				switch(options.effect) {
					case "fadeIn":
						fb.hide().fadeIn(options.effectSpeed);
					break;
					case "slideDown":
						fb.hide().slideDown(options.effectSpeed);
					break;
				}
			}
		} );
	};
})(jQuery); 
/**
 * icson的模板处理
 * @author myforchen
 */
G.ui.template = {
	/**
	 * 使用id为tpl的元素内容作为模板，o作为数据，来填充id为bed的元素
	 * 模板内容格式：
	 * &lt;!--something&lt;@list@&gt;listcontent&lt;@_list@&gt;somethingelse--&gt;
	 * @param {String} bedId 模板填充的元素ID, false则直接返回值
	 * @param {Object} o 用来填充的数据
	 * @param {String} tplId 承载模板的元素ID，如果是false模板内容就直接使用TPL参数，如果没有指定tplId就是bedId + '_tpl'
	 * @param {String} TPL 模板内容
	 * @param {Boolean} isReturn 是否作为字符串返回
	 */
	fillWithTPL	: function(bedId, o, tplId, TPL, isReturn) {
		if (!o) return;
		if (!tplId && tplId !== false) tplId = bedId+'_tpl';
		TPL = (tplId === false) 
				? (TPL || '') 
				: $('#'+tplId).html().replace(/^\s*<!--/, "").replace(/-->\s*$/, "");

		var BLOCKS = {};
		TPL = TPL.replace(/<@([0-9a-zA-Z_-]+)@>((.|\s)*?)<@_\1@>/g, function(a0, a1, a2) {
			BLOCKS[a1] = a2;
			return '[#'+a1+'#]';
		});
		$.each(BLOCKS, function(key, tpl) {
			var ot = [], 
				p = o[key];
			if (p) {
				$.each(p, function(pp, tt) {
					ot.push(G.ui.template.fillWithTPL(false, tt, false, tpl.replace(/<_index_>/g, pp-0+1)));
					//ot.push(tpl.replace(/<_index_>/g, pp-0+1).replace(/\{([0-9a-zA-Z_-]+)\}/g, function(a0, a1) {
					//	return tt[a1]!==undefined ? tt[a1] : '';
					//}));
				});
			}

			BLOCKS[key] = ot.join('');
		});

		var htm = TPL.replace(
								/\{([0-9a-zA-Z_-]+)\}/g, 
								function(a0,a1) {
									return o[a1]!==undefined ? o[a1] : ''; 
								}).replace(
									/\[#([0-9a-zA-Z_-]+)#\]/g, 
									function(a0,a1) { 
										return BLOCKS[a1]!==undefined ? BLOCKS[a1] : a1;
									}).replace(/^\s+/, '');

		if (isReturn || bedId === false) {
			return htm;
		} else {
			$('#' + bedId).html(htm);
		}
	}
}; 
G.ui.tips = {
	err	: function(str, target, opt){
		this._set(str, 2, target, opt);
	},
	info	: function(str, target, opt){
		this._set(str, 0, target, opt);
	},
	warn	: function(str, target, opt){
		this._set(str, 1, target, opt);
	},
	suc	: function(str, target, opt){
		this._set(str, 3, target, opt);
	},
	help	: function(str, target, opt){
		this._set(str, 4, target, opt);
	},
	none	: function(target, opt){
		this._set(false, 0, target, opt);
	},

	_set	: function(str, level, target, opt){
		opt = $.extend({
			autoHide	: true,
			style	: ''
		}, opt || {});

		/**
		 * 默认：小提示，接在元素后面
		 * inner: 小提示，替换innerHTML
		 * bigtop: 大提示，元素上方
		 */
		if(opt.style != 'inner' && opt.style != 'bigtop') opt.style = '';

		var tipsName = 'tips' + opt.style,
			ttn = 'tipstimeout' + opt.style;

		if($(target).data(ttn)){
			clearTimeout($(target).data(ttn));
			$(target).removeData(ttn);
		}

		var tips = $(target).data(tipsName),
			size = opt.style == 'bigtop' ? 'big' : '';
		if(!tips || tips.parent().length == 0){ // 不在DOM数中
			tips = $(G.logic.constants.getTipStr(str, level, false, size));
			$(target).data(tipsName, tips);
			if(opt.style == 'inner'){
				target.empty().append(tips);
			} else if(opt.style == 'bigtop'){
				tips.insertBefore(target);
			} else {
				tips.insertAfter(target);
			}
		}

		tips.hide();
		if(str === false) return;

		if(level == null || !(level in G.logic.constants.tipsLevel)) level = 0;

		var newClassName = '';
		if(opt.style == 'bigtop'){
			newClassName = 'para_blo para_' + G.logic.constants.tipsLevel[level] + ' cart_tip';
		} else {
			newClassName = 'para_inb para_' + G.logic.constants.tipsLevel[level];
		}
		tips.empty()
			.html(G.logic.constants.getTipStr(str, level, true, size))
			.removeClass().addClass(newClassName)
			.fadeIn(200);

		if (opt.autoHide) {
			$(target).data(ttn, setTimeout(function(){
				tips && tips.fadeOut(200);
			}, $.type(opt.autoHide) == 'boolean' ? 5000 : opt.autoHide));
		}
	},

	//add by allenzhou 购物车专用
	_setCart	: function(str, level, target, opt){
		opt = $.extend({
			autoHide	: true,
			style	: ''
		}, opt || {});

		/**
		 * 默认：小提示，接在元素后面
		 * inner: 小提示，替换innerHTML
		 * bigtop: 大提示，元素上方
		 */
		if(opt.style != 'inner' && opt.style != 'bigtop') opt.style = '';

		var tipsName = 'tips' + opt.style,
			ttn = 'tipstimeout' + opt.style;

		if($(target).data(ttn)){
			clearTimeout($(target).data(ttn));
			$(target).removeData(ttn);
		}

		var tips = $(target).data(tipsName),
			size = opt.style == 'bigtop' ? 'big' : '';
		if(!tips || tips.parent().length == 0){ // 不在DOM数中
			tips = $(G.logic.constants.getTipStr_cart(str, level, false, size));
			$(target).data(tipsName, tips);
			if(opt.style == 'inner'){
				target.empty().append(tips);
			} else if(opt.style == 'bigtop'){
				tips.insertBefore(target);
			} else {
				tips.insertAfter(target);
			}
		}

		tips.hide();
		if(str === false) return;

		if(level == null || !(level in G.logic.constants.tipsLevel)) level = 0;

		var newClassName = '';
		if(opt.style == 'bigtop'){
			newClassName = 'para_blo para_' + G.logic.constants.tipsLevel[level] + ' cart_tip';
		} else {
			newClassName = 'para_inb para_' + G.logic.constants.tipsLevel[level];
		}
		tips.empty()
			.html(G.logic.constants.getTipStr_cart(str, level, true, size))
			.removeClass().addClass(newClassName)
			.fadeIn(200);

		if (opt.autoHide) {
			$(target).data(ttn, setTimeout(function(){
				tips && tips.fadeOut(1000 * 10);
			}, $.type(opt.autoHide) == 'boolean' ? 5000 : opt.autoHide));
		}
	},
	
	setLoading	: function(target){
		// ...
	},

	unsetLoading	: function(target){

	},
	swapInput	: function(opt){
		if(!opt || !opt.target) return null;
		opt.defaultValue = opt.defaultValue || '';
		opt.focusClass = opt.focusClass || '';
		opt.blurClass = opt.blurClass || '';

	

		$(opt.target).focus({opt:opt}, function(e){
			var v = $(this).val();
			(v == e.data.opt.defaultValue || v == '') && $(this).val('');
			$(this).removeClass(e.data.opt.blurClass).addClass(e.data.opt.focusClass);
			(v.indexOf(e.data.opt.defaultValue)>=0) && $(this).val(v.replace(e.data.opt.defaultValue,''))
		}).blur({opt:opt}, function(e){
			var v = $(this).val();
			if(v == e.data.opt.defaultValue || v == '') {
				$(this).val(e.data.opt.defaultValue).removeClass(e.data.opt.focusClass).addClass(e.data.opt.blurClass);
			} else {
				$(this).removeClass(e.data.opt.blurClass).addClass(e.data.opt.focusClass);
			}
			(v.indexOf(e.data.opt.defaultValue)>=0) && $(this).val(v.replace(e.data.opt.defaultValue,''))
		});

		$(opt.target).blur();
		return $(opt.target);
	}
}; 
/**
 * 
 */
G.ui.page = function(url, currentPage, pageCount, neighborLength){
	url += '';
	currentPage -= 0;
	pageCount -= 0;
	neighborLength = neighborLength || 3;

	if(pageCount < 2 )
		return "";

	var start = currentPage  - neighborLength, end = currentPage + neighborLength;
		str = "";;

	if(start <= 4){
		start = 2;
	}

	start = start > 1 ? start : 2;

	end = end < pageCount ? (end < currentPage ? currentPage : end) : ( pageCount - 1 );

	var linkAttr = "";
	if(url.indexOf('javascript:') == 0){
		linkAttr = ' href="#" onclick="' + url.substr(11) + ';return false"';
	} else {
		linkAttr = ' href="' + url + '"';
	}
	//上一页
	str += currentPage == 1 ? '<span class="page-start"><b>&lt;</b>上一页</span>' : ('<a' + linkAttr.replace(/\{page\}/g, currentPage - 1) + ' class="page-prev"><b>&lt;</b>上一页</a>');

	//第一页
	str += currentPage == 1 ? '<span class="page-this">1</span>' : ('<a' + linkAttr.replace(/\{page\}/g, 1) + '>1</a>');

	if( start != 2 )
		str += '<span class="page-break">...</span>';

	for(var i = start; i < end + 1; i++){
		if(i == currentPage) 
			str += '<span class="page-this">' + currentPage + '</span>';
		else 
			str +=  '<a' + linkAttr.replace(/\{page\}/g, i) + '>' + i + '</a>';
	}
  
	if( end != pageCount - 1 )
		str += '<span class="page-break">...</span>';
  
	//最后一页
	str += currentPage != pageCount  ? ('<a' + linkAttr.replace(/\{page\}/g, pageCount) + '>' + pageCount + '</a>') : ('<span class="page-this">'+pageCount+'</span>');

	//下一页
	str += currentPage != pageCount  ? ('<a' + linkAttr.replace(/\{page\}/g, currentPage + 1) + ' class="page-next">下一页<b>&gt;</b></a>') : '<span class="page-end">下一页<b>&gt;</b></span>';

	//输入框跳转
	var jumpStr = url.indexOf('javascript:') == 0 ? "$.globalEval('" + url.substr(11).replace(/'/g, '\\\'').replace(/\{page\}/g, "'+a+'") + "')" : ('location.href=\''+url.replace(/'/g, '\\\'').replace(/\{page\}/g, "'+a+'")+'\''),
		fnStr = 'var a=parseInt($(\'input[name=iptpage]\',$(this).parent()).val(),10);a=(!!a&&a>0&&a<=' + pageCount + ')?a:1;' + jumpStr+';';

	str += '<span class="page-skip"> 到第<input type="text" value="' + currentPage + '" maxlength="3" name="iptpage" onkeydown="if(event.keyCode==13){$(\'button[name=go]\',$(this).parent()).click();return false;}">页<button name="go" value="go" onclick="'+fnStr+'return false">确定</button></span>';

	return str;
};
 
G.logic.constants = {
	userLevelName	: {
		0	: '土星会员',
		1	: '铜盾会员',
		2	: '银盾会员',
		3	: '金盾会员',
		4	: '钻石会员',
		5	: '皇冠会员',
		6	: '易金鲸'
	},
	/**
	* 获取小图地址
	* @param String pCharId 商品编号
	* @param Integer picIndex 图片序号
	*/
	getSmallUrl	: function(pCharId, picIdx){
		return this._getPicUrl(pCharId, 'small', picIdx);
	},
	getSSUrl	: function(pCharId, picIdx){
		return this._getPicUrl(pCharId, 'ss', picIdx);
	},
	getMMUrl	: function(pCharId, picIdx){
		return this._getPicUrl(pCharId, 'mm', picIdx);
	},
	getMiddleUrl	: function(pCharId, picIdx){
		return this._getPicUrl(pCharId, 'middle', picIdx);
	},
	getBigUrl	: function(pCharId, picIdx){
		return this._getPicUrl(pCharId, 'mpic', picIdx);
	},
	getPic160Url	: function(pCharId, picIdx){
		return this._getPicUrl(pCharId, 'pic160', picIdx);
	},
	getPic60Url	: function(pCharId, picIdx){
		return this._getPicUrl(pCharId, 'pic60', picIdx);
	},
	getPic200Url	: function(pCharId, picIdx){
		return this._getPicUrl(pCharId, 'pic200', picIdx);
	},
	getBigUrl	: function(pCharId, picIdx){
		return this._getPicUrl(pCharId, 'mpic', picIdx);
	},
	
	_getPicUrl	: function(pCharId, type, picIdx){
		/*
		if(pCharId.length > 10){
			pCharId = pCharId.substr(0, 10);
		}
		var part1 = pCharId.substr(0, 2),
			part2 = pCharId.substr(3, 3),
			part3 = pCharId.substr(7, 3);
		*/
		var parts = pCharId.split("R", 2);
		pCharId = parts[0];
		parts = pCharId.split("-", 3);
		var part1 = parts[0], part2 = parts[1], part3 = parts[2];
		return 'http://img'+(parseInt(part3)%2?'1':'2')+'.icson.com/product/'+type+'/'+part1+'/'+part2+'/'+pCharId+(picIdx==0 ? '' : ('-' + (picIdx < 10 ? ('0'+picIdx) : picIdx)))+'.jpg';
		//return 'http://img2.icson.com/IcsonPic/'+type+'/'+pCharId+(picIdx==0 ? '' : ('-' + (picIdx < 10 ? ('0'+picIdx) : picIdx)))+'.jpg';
	},
	tipsLevel	: {
		0	: 'info',
		1	: 'warn',
		2	: 'error',
		3	: 'right',
		4	: 'help'
	},
	getTipStr	: function(str, level, skipParent, size){
		if(str == null) return '';

		if(level == null || !(level in G.logic.constants.tipsLevel)) level = 0;
		if(level == 0 || level == 4) level = 1; // 两种样式缺失
		var levelName = G.logic.constants.tipsLevel[level],
			html = '';
		if (size == 'big') {
			if($.type(str) != 'array') str = [str];
			var ext = [];
			if(str.length > 1){
				var tmp = str.shift();
				$.each(str, function(k, exti){
					ext.push('<p>'+exti+'</p>');
				})
				str.unshift(tmp);
			}

			if(ext.length > 0) ext = '<div class="bd">'+ext.join('')+'</div>';
			else ext = '';
			html = '<div class="inner"> <b class="icon icon_msg3 icon_msg3_'+levelName+'"></b><div class="hd"><strong class="tit">'+(str.length>0?str[0]:'')+'</strong></div>'+ext+'</div>';
			html = skipParent ? html : '<div class="para_blo para_' + levelName + '">' + html + '</div>';
		} else {
			html = '<b class="icon icon_msg0 icon_msg0_' + levelName + '"></b><span class="para_tit">' + str + '</span>';
			html = skipParent ? html : '<p class="para_inb para_' + levelName + '">' + html + '</p>';
		}
		return html;
	},

	//add by allenzhou 购物车专用,因为dom结构不一样,getTipStr这个方法很多地方都调用了,所以复制一个专用的
	getTipStr_cart	: function(str, level, skipParent, size){
		if(str == null) return '';

		if(level == null || !(level in G.logic.constants.tipsLevel)) level = 0;
		if(level == 0 || level == 4) level = 1; // 两种样式缺失
		var levelName = G.logic.constants.tipsLevel[level],
			html = '';
		if (size == 'big') {
			if($.type(str) != 'array') str = [str];
			var ext = [];
			if(str.length > 1){
				var tmp = str.shift();
				$.each(str, function(k, exti){
					ext.push('<p>'+exti+'</p>');
				})
				str.unshift(tmp);
			}

			if(ext.length > 0) ext = ext.join('');
			else ext = '';
			html = '<div class="inner"> <b class="icon icon_msg3 icon_msg3_'+levelName+'"></b><div class="hd"><strong class="tit">'+(str.length>0?str[0]:'')+'</strong></div>'+ext+'</div>';
			html = skipParent ? html : '<div class="para_blo para_' + levelName + '">' + html + '</div>';
		} else {
			html = '<b class="icon icon_msg0 icon_msg0_' + levelName + '"></b><span class="para_tit">' + str + '</span>';
			html = skipParent ? html : '<p class="para_inb para_' + levelName + '">' + html + '</p>';
		}
		return html;
	},
	
	goToCart	: function(param, isInstallment, obj){
		if (!param) return;

		var ytag = $(obj).attr('ytag') || $(obj).attr('YTAG') || '';
		if(window.yPageId == 0 && window.yPageLevel == 0) ytag = '';
		else if(ytag) ytag = window.yPageLevel + '.' + window.yPageId + '' + ytag;
		G.util.cookie.add('backurl', location.href, '/', 0, '.'+G.domain);
		if (typeof param == 'object') {
			if (param.pid > 0) {
				location.href = 'http://buy.'+G.domain+'/cart.html?'
						+ ( ( (param.isPackage && param.isPackage == 1) ? 'pkgid=' : 'pid=' ) + param.pid )
						+ '&pnum='
						+ (param.pnum || 1)
						+ ( (param.isPackage && param.isPackage == 1) ? '' : ('&mid=' + (param.mid || param.pid)) ) /* 随心配主商品ID */
						+ ( (param.price_id && param.price_id > 0) ? ('&price_id=' + param.price_id) : '' ) /* 多价格ID */
						+ (isInstallment != 0 ? '&ism=' + isInstallment : '')
						+ (ytag ? ('&ytag=' + ytag) : '');
			}
		}
		else {
			location.href = 'http://buy.'+G.domain+'/cart.html?ids=' + param + (isInstallment==1?'&ism=1':'')+ (ytag ? ('&ytag=' + ytag) : '');
		}
	},
	goToCartWithThis	: function(obj, param, isInstallment){
		return G.logic.constants.goToCart(param, isInstallment, obj);
	},

	allowedWhInfo: {
		'1': '上海',
		'1001' : '深圳',
		'2001' : '北京',
		'3001' : '武汉',
		'4001' : '重庆',
		'5001' : '西安'
	},
	serviceAreasSeq : ['2621' ,'3225' ,'1591' ,'1' , '403' ,'201', '1323', '1718' ,'789' ,'556' ,'131' ,'2858' ,'814', '1454' , '1144','2329' ,
'2490' ,'1900' ,'1830' ,'999' ,'2212' ,'299' ,'2016' ,'158' ,'2652' ,'3077' ,'693' ,'2996' ,'2130' ,'2160' ,'2878'],
	
	//上海站(华东仓)易迅快递覆盖的省份:目前只有[上海,浙江,江苏,安徽]
	sh_icson_delivery_city:['2621'],
	
	serviceAreas: {
	    //省份ID:[省份名称,分站ID,默认三级地区ID]
		'2621' : ['上海', '1','2626'],
		'3225' : ['浙江', '1','3227'],
		'1591' : ['江苏', '1','1593'],
		'1' : ['安徽', '1','9'],
		'2130' : ['宁夏', '5001','2132'],
		'2160' : ['青海', '5001','2162'],
		'403' : ['广东', '1001','421'],
		'201' : ['福建', '1001','203'],
		'1718' : ['江西', '3001','1720'],
		'789' : ['海南', '1001','791'],
		'3077' : ['云南', '4001','3079'],
		'556' : ['广西', '1001','601'],
		'2878' : ['新疆', '5001','2880'],
		'2996' : ['西藏', '4001','2998'],
		'131' : ['北京', '2001','3803'],
		'2858' : ['天津', '2001','2860'],
		'814' : ['河北', '2001','816'],
		'1144' : ['河南', '3001','1146'],
		'2329' : ['山东', '2001','2331'],
		'2490' : ['山西', '2001','2492'],
		'1900' : ['辽宁', '2001','1902'],
		'1830' : ['吉林', '2001','1832'],
		'999' : ['黑龙江', '2001','1001'],
		'2212' : ['陕西', '5001','2226'],
		'299' : ['甘肃', '5001','302'],
		'2016' : ['内蒙古', '2001','2018'],
		'1454' : ['湖南', '3001','1456'],
		'693' : ['贵州', '4001','695'],
		'1323' : ['湖北', '3001','4046'],
		'158' : ['重庆', '4001','200'],
		'2652' : ['四川', '4001','2654']
	},
	getLocationId:function(){
	   var prid = G.util.cookie.get('prid')||"2626_2621"; //取不到cookie则定位至上海市徐汇区
	   return prid;
	},
	setLocationId:function(prid){
	   if(prid){
	     G.util.cookie.add("prid", prid, '/', 30 * 24 * 3600, '.'+G.domain);
		 return true;
	   }else{
	     return false;
	   }
	},
	getSiteId:function(){
		var wsid = G.util.cookie.get('wsid')||1; //默认到上海站
		return wsid;
	  },
	setSiteId:function(wsid){
		  if(wsid){
			 G.util.cookie.add("wsid", wsid, '/', 30 * 24 * 3600, '.'+G.domain);
			 return true;
		   }else{
			 return false;
		   }
	},
	getProvId:function() {
		var locationIds = G.logic.constants.getLocationId().split('_');
		return locationIds[1];
	}, 
	categoryAds : {
		'0' : ['dh-1big-phone', 'dh-3small-phone'],
		'1' : ['dh-1big-digital', 'dh-3small-digital'],
		'2' : ['dh-1big-computer', 'dh-3small-computer'],
		'3' : ['dh-1big-hardware', 'dh-3small-hardware'],
		'4' : ['dh-1big-fujian', 'dh-3small-fujian'],
		'5' : ['dh-1big-big_e', 'dh-3small-big_e'],
		'6' : ['dh-1big-house_e', 'dh-3small-house_e'],
		'7' : ['dh-1big-kitchen', 'dh-3small-kitchen'],
		'8' : ['dh-1big-office', 'dh-3small-office'],
		'9' : ['dh-1big-car', 'dh-3small-car'],
		'10' : ['dh-1big-bodycare', 'dh-3small-bodycare'],
		'11' : ['dh-1big-grocery', 'dh-3small-grocery']
	}
};

$.extend(G.logic.constants, {
	getWhId : (function(){
	
		var _queue = G.createFnQueue(),
			_determined = 0;
			

		return function(fn){
		    _whId = G.logic.constants.getSiteId();
			_queue.add(fn);
			if (_determined == 2 || _whId !== false) { // 加载已完成
				_queue.exec(_whId);
				return;
			}
	
			if (_determined == 1) { // 加载中
				return;
			}
	
			_determined = 1;
			$.get('http://' + G.DOMAIN.BASE_ICSON_COM + '/json.php?mod=user&act=getwhid', function(o) {
				_determined = 2;
				_whId = 1; // 默认上海站
				_prId = 2621;
				if (o && o.errno == 0) {
					if (G.logic.constants.allowedWhInfo[o.data]) {
						_whId = o.data;
						_prId = o.prid;
					}
				}

				G.logic.constants.setSiteId(_whId);
				G.logic.constants.setLocationId(G.logic.constants.serviceAreas[_prId][2] + '_' + _prId);
				
				_queue.exec(_whId);
			}, 'jsonp');
		};
	})()
});
 
G.logic.validate = {
	checkURL	: function(url){
		var urlpt = /^(https?:\/\/|ftp:\/\/)?(([a-z0-9\-]*\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;\/]*)?)?(#[a-z][a-z0-9+_\-\.%=&amp;\/]*)?$/i;
		return urlpt.test(url);
	},

	checkMobilePhone	: function(phone){
		var ppt = /^((\(\d{3}\))|(\d{3}\-))?1\d{10}$/;
		return ppt.test(phone);
	},

	checkEmail	: function(email){
		return /^[a-z0-9_\-]+(\.[_a-z0-9\-]+)*@([_a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)$/i.test(email);
	},

	/**
	 * 判断是否普通电话号码
	 * @param {String} tp 输入字符串
	 * @param {Integer} type 可选的参数，默认都判断，类型（1国内，2国外）
	 */
	checkTelephone	: function(tp, type){
		var pt1 = /^([0-9]{3}|0[0-9]{3})-[1-9][0-9]{6,7}(-[0-9]{1,6})?$/,
			pt2 = /^[0-9]{4}-([0-9]{3}|0[0-9]{3})-[0-9]{7,8}$/,
			type = type || (1|2);

		if(((type & 1)==1) && pt1.test(tp)) return true;
		if(((type & 2)==2) && pt2.test(tp)) return true;
		return false;
	},
	/**
	 * 判断是否电话号码或者手机
	 * @param {String} str 输入字符串
	 */
	checkPhone	: function(str){
		return this.checkTelephone(str) || this.checkMobilePhone(str);
	},

	/**
	 * 判断是否自然数
	 * @param {String} str 输入字符串
	 */
	checkNumber	: function(str){
		return /^[1-9]\d*$/.test(str);
	},
	/**
	 * 检查字符串类型，中、英文、数字
	 * @param {String} str 字符串
	 * @param {Integer} type 判断类型，1，只含有中文；2，只含有英文；4，只含有数字；可按位或
	 */
	checkChars	: function(str, type){
		var regstr = "^[";
		type = type || (1|2|4);
		if((type & 1) == 1) regstr += "\u4E00-\u9FA5";
		if((type & 2) == 2) regstr += "a-zA-Z";
		if((type & 4) == 4) regstr += "0-9";
		regstr += "]*$";
		return (new RegExp(regstr, '')).test(str);
	},
	checkOrderId	: function(order_id){
		return order_id && order_id.length == 10 && G.logic.validate.checkNumber(order_id);
	},
	lenMon	: function(opt) {
		if(!opt || !opt.target) return null;
		opt = {
			target	: opt.target,
			minLen	: opt.minLen || 0,
			maxLen	: opt.maxLen || Infinity,
			sucClass	: opt.sucClass || '',
			failClass	: opt.failClass || '',
			defaultValue : opt.defaultValue || '',
			tipCtrl	: opt.tipCtrl || null,
			charLenStyle	: opt.charLenStyle || false
		};

		function k() {
			var v = $(opt.target).val(),
				length = opt.charLenStyle ? $.strlen(v) : v.length;
				length = v == opt.defaultValue ? 0 : length;
			if (opt.tipCtrl) {
				$(opt.tipCtrl).html('<b>' + length + '</b>/' + opt.maxLen);
				if (length < opt.minLen || length > opt.maxLen) {
					$('b', opt.tipCtrl).removeClass(opt.sucClass).addClass(opt.failClass);;
				} else {
					$('b', opt.tipCtrl).removeClass(opt.failClass).addClass(opt.sucClass);;
				}
			}
		}

		k();
		return $(opt.target).keyup(k).bind('paste', k);
	}
}; 
G.logic.login = {
	_refer					: null, //来源
	_refUrl					: '',

	_loginUser			: false,
	_loginPopup			: false,

	_userFnQueue		: G.createFnQueue(),
	_qqloginFnQueue	: G.createFnQueue(),
	_loginFnQueue		: G.createFnQueue(false),
	_logoutFnQueue	: G.createFnQueue(false),

	_loginNameCutLen : 8,

	/**
	 * 截断字符串，汉字及全角标点长度为2，ASSIC字符长度为1，用于用户名的显示
	 * 如果原始字符串长度不大于cutLen，则返回原始字符串，
	 * 否则返回截断后的字符串（长度不大于cutLen）加...
	 * 例如：
	 * 		原始字符串 strOriginal = abcdefghijkl，cutLen = 8，则返回 cutStr = abcdefgh...
	 * 		原始字符串 strOriginal = abcdefgh，    cutLen = 8，则返回 cutStr = abcdefgh
	 *  	原始字符串 strOriginal = abcdefg，     cutLen = 8，则返回 cutStr = abcdefg
	 * @param {String} strOriginal 需要截断的原始字符串
	 * @param {Int}    cutLen      截断长度 
	 * @return {String} cutStr     截断之后的字符串
	 */
	cutString : function(strOriginal, cutLen) {
		if (cutLen <= 0 || strOriginal.replace(/[^\x00-\xff]/g, "**").length <= cutLen){
			return strOriginal;
		}

		var cutStr = strOriginal;
		while (cutStr.replace(/[^\x00-\xff]/g, "**").length > cutLen){
			cutStr = cutStr.substr(0, cutStr.length - 1);
		}

		if (cutStr.length < strOriginal.length) {
			cutStr += '...';
		}
		return cutStr;
	},

	popup	: function(redirect_url) {
		// 如果redirect_url是字符串，则login之后定向到redirect_url，否则定向到location.href
		var login_url = "https://base."+G.domain+"/login.html?url=" + encodeURIComponent(typeof redirect_url == 'string' ? redirect_url : location.href);
		location.href = login_url;
		return true;
	},

	/**
	 * 提交登录的行为，不进行参数检查
	 * @param {String} account 登录帐号
	 * @param {String} pass 密码
	 * @param {Function} sucFn 成功之后的回调函数
	 * @param {Function} failFn 失败之后的回调函数
	 * @param {Object} others 其他参数对，用来补充登录需要的参数
	 */
	login	: function(account, pass, sucFn, failFn, others) {
		var param = {
			account	: account,
			password	: pass
		};

		$.each(others || {}, function(k, v) {
			param[k] = v;
		});

		G.util.post('https://' + G.DOMAIN.BASE_ICSON_COM + '/json.php?mod=login&fmt=1', param, function(o) {
			if (o && o.errno == 0) {
				if ($.isFunction(sucFn)) {
					//sucFn();
					sucFn(o);
				}
			}
			else {
				if ($.isFunction(failFn)) {
					failFn(o && o.errno ? o.errno : null);
				}
			}
		});
	},

	/**
	 * 更新页头部分，需要根据用户登录状态修改两部分内容：“用户登录情况”， “我的订单”。
	 */
	updateHead	: function() {
	
		G.logic.constants.getWhId(function(whId) {
			if (!G.logic.constants.allowedWhInfo[whId]) {
				location.replace('http://www.'+G.domain+'/');
				return;
			}

			G.logic.login.getLoginUser(function(o) {
				var $page_toolbar = $('#PageToolbar'),
					$page_nav = $('#PageLoginStatusbar'),
					$page_welcome = $('#PageWelcome'),
					$page_my_order_li = $('#PageMyOrderLi');

				//删除用户登录部分
				if ($page_welcome.length > 0) {
					$page_welcome.remove();
				}
				else {
					$('#PageLogin').remove();
					$('#PageLoginByQQBtn').remove();
					$('#PageRegLi').remove();
				}
				// 删除新用户频道入口广告
				$('#NewUserCoupon').remove();

				if (o && o.errno == 0) { //用户登录
					var d = o.data,
						str = '';

					if (d.icsonid.toString().indexOf('Login_QQ_') == 0 || 'true' === G.util.cookie.get('__BINDQQACCOUNT')) {
						str = '<i class="icon_qq">&nbsp;</i>欢迎您，QQ用户';
						var cps_msg = G.util.cookie.get("cps_msg").split('|');
						if (cps_msg.length >= 2 && cps_msg[0] == d.uid) {
							cps_msg.shift();
							str = G.util.parse.encodeHtml(cps_msg.join('|'));

							if (G.util.cookie.get('cps_src') == 'qqcb') { /*当前是QQCB的联合登录*/
								var _html = '<div class="mod_top_banner">\
<div class="main_area">\
<div class="sale_tip">\
<strong>QQ彩贝联盟商家：</strong>\
易迅-QQ会员购物成功最高返<span class="redf">4320</span>彩贝积分，\
普通用户最高返2880彩贝积分<a ytag="06807" href="http://cb.qq.com/get_jifen.html" target="_blank" title="积分详情">(详情)</a>\
</div>\
<div class="login_status">\
<span class="qqUser login_btn"><span class="name">'+ str +'\
<a ytag="06808" href="http://cb.qq.com/my/my_jifen_source.html" target="_blank" title="我的彩贝积分" class="my_caibei">我的彩贝积分</a>\
</div>\
</div>\
</div>';
								setTimeout(function() {
									$('body').prepend(_html);
								}, 500);
							}
						}
						else {
							var qq_nick = G.util.cookie.get("qq_nick").split('|');
							if (qq_nick.length >= 2 && qq_nick[0] == d.uid) {
								qq_nick.shift();
								str += G.logic.login.cutString(G.util.parse.encodeHtml(qq_nick.join('|')), G.logic.login._loginNameCutLen);
							//	str += "，";
							}
						}
					}
					else if (d.icsonid.toString().indexOf('Login_Alipay_') == 0) { /* 支付宝 */
						var ali_user_grade = parseInt(o.data.status_bits & (1 << 0));
						if (1 == ali_user_grade) { //1, 金账户
							str = '欢迎您，支付宝VIP：' + G.logic.login.cutString(G.util.parse.encodeHtml(d.name || d.icsonid), G.logic.login._loginNameCutLen) + '，'
						}
						else {
							str = G.logic.login.cutString(G.util.parse.encodeHtml( d.name || d.icsonid), G.logic.login._loginNameCutLen) + ' 您好'
						}
					}
					else if (/^\d+@51fanli$/.test(d.icsonid.toString())) { //51fanli
						var cps_msg = G.util.cookie.get("cps_msg").split('|');
						if (cps_msg.length >= 2 && cps_msg[0] == d.uid) {
							str = cps_msg[1];
						}
					}
					else if (d.icsonid.toString().indexOf('Login_SHAuto_') == 0) { /* 安悦用户 */
						str = '欢迎您，安悦用户：' +G.logic.login.cutString(G.util.parse.encodeHtml( d.icsonid.substr(13) ), G.logic.login._loginNameCutLen) + ' 您好'
					}
					else if (d.icsonid.toString().indexOf('Login_SAND_') == 0) { /* 杉德用户 */
						str = '欢迎您，杉德用户：' +G.logic.login.cutString(G.util.parse.encodeHtml( d.icsonid.substr(11) ), G.logic.login._loginNameCutLen) + ' 您好'
					}
					else {
						str = '欢迎您，' + G.logic.login.cutString(G.util.parse.encodeHtml( d.icsonid ), G.logic.login._loginNameCutLen);
					}
					
					$page_nav.prepend( '<li id="PageWelcome" class="item"><span class="welcome">' + str + '</span>[<a ytag="06300" href="javascript:;" name="quit" hotName="I.INDEX.HEAD_EXIT" onclick="return false">退出</a>]</li>');
					$page_nav.find('a[name=quit]').click(G.logic.login.logout);

					//更新“我的订单”部分
					var _default = '正在加载...';
					$page_my_order_li.find('div.mod_order').html(_default); //“我的订单”默认内容
					G.logic.login.mouseEnterAndOut($page_my_order_li.find('div.menu'), function($target) { //mouseenter callback
						if ($target.find('div.mod_order').html() == _default) {
							G.util.post('http://d.'+G.domain+'/json.php?mod=index&act=getmyorders&fmt=1', { /*data*/ }, function(o) {
								if (o && 'errno' in o && 'data' in o) { //结构合理
									if (o.errno == 0) { //操作成功
										if ($.isArray(o.data)) { //显示订单信息列表
											var html = '';
											var ytagBase = 6302;
											if (o.data.length > 0) {
												html += '<ul>';
												for (var i=0, len=o.data.length; i<len; i++) {
													var _orderStatus = o.data[i].order_status;
													var _orderStatus_Class = (_orderStatus.indexOf("作废") > 0 ) ? 'wait' : '';
													html += '<li>\
	<div class="pic_wrap">\
		<a ytag="0' + (ytagBase++) + '" href="http://item.'+G.domain+'/item-' + o.data[i].product_id + '.html" target="_blank"><img alt="' + o.data[i].product_name + '" src="'+o.data[i].product_img+'"></a>\
	</div>\
	<div class="order_info">\
		<dl>\
			<dt><a ytag="0' + (ytagBase++) + '" href="http://base.'+G.domain+'/orderdetail-' + o.data[i].order_id + '.html" target="_blank">' + o.data[i].order_id + '</a></dt>\
			<dd>' + o.data[i].order_date + '</dd>\
		</dl>\
	</div>\
	<div class="order_status"><span class="'+_orderStatus_Class+'">'+_orderStatus+'</span>'+o.data[i].order_delay+'</div>\
</li>';
												}
												html += '</ul>';
												html += '<p class="order_old"><a ytag="06301" title="更早订单" href="http://base.'+G.domain+'/myorder.html?YTAG=1.100000003">更早订单<i class="dot_arrow"></i></a></p>';
											}
											else {
												html += '没有记录';
											}

											$target.find('div.mod_order').html(html);
											return ;
										}
										else if ($.type(o.data) == 'string') {
											$target.find('div.mod_order').html(o.data);
											return ;
										}
									}
								}

								$target.find('div.mod_order').html('订单信息加载失败，请您稍后重试'); //失败
							});
						}
					}, null, 'menu_hover'); //注册“我的订单”部分事件响应
				}
				else { //显示“登录”，“注册”
					var loginInfo = '登录&nbsp;';
					var registerInfo = '注册&nbsp;';
					var urlReg = 'https://base.'+G.domain+'/register.html';
					var distributorClass = '';
					if ( location.href.match(/^http:\/\/b\.51buy\.com/) ||
						 (location.href == 'http://event.'+G.domain+'/event/478cfee.html') ||
						 (location.href == 'http://event.'+G.domain+'/event/4819461.html') ||
						 (location.href == 'http://event.'+G.domain+'/event/479d18f.html' )
					    )
					{
						loginInfo = '大客户登录&nbsp;';
						registerInfo = '大客户注册&nbsp;';
						urlReg = 'http://b.'+G.domain+'/retailerreg.html';
						distributorClass = ' item_login_distributor';
					}
					
					//NOTE: 下面HTML部分的换行，不要试图修改。
					var nhref = window.LOGIN_NO_JUMP ? (LOGIN_NO_JUMP === true ? 'http://www.'+G.domain+'/' : LOGIN_NO_JUMP) : location.href,
						loginHtml = '<li id="PageLogin" class="item' + distributorClass + '">\
<a ytag="06800" href="https://base.'+G.domain+'/login.html?url=' + encodeURIComponent(location.href)+'" >' + loginInfo + '</a>\
</li>\
<li id="PageLoginByQQBtn" class="item loginbyqq"><a ytag="06805" href="http://3c.buy.qq.com/www/icson/redirect.html?url=http%3A%2F%2Fui.ptlogin2.qq.com%2Fcgi-bin%2Flogin%3Fappid%3D700024506%26s_url%3Dhttp%253A%252F%252F3c.buy.qq.com%252Fwww%252Ficson%252Flogin.html%253Furl%253Dhttp%25253A%25252F%25252Fbase.'+G.domain+'%25252Findex.php%25253Fmod%25253Duser%252526act%25253Dptloginqq%26qlogin_auto_login%3D1%26hide_close_icon%3D1"><i class="dot_qq">&nbsp;</i></a></li>\
<li id="PageRegLi" class="item"><a ytag="06806" id="PageRegBtn" href="' + urlReg + '">' + registerInfo + '</a></li>';
					$page_nav.prepend(loginHtml);

					var purl = G.util.parse.url();
					purl = purl.search.url || purl.hash.url || location.href; //回跳地址
					if (! /^http:\/\/([a-zA-Z0-9_-]+\.|)51buy\.com/.test(purl)){
						purl = '';
					}
					G.logic.login._refUrl = purl;

					if (purl) {
						var url1 = 'http://base.'+G.domain+'/index.php?mod=user&act=ptloginqq&url=' + encodeURIComponent(purl);
						var url2 = 'http://3c.buy.qq.com/www/icson/login.html?url=' + encodeURIComponent(url1);
						var url3 = 'http://ui.ptlogin2.qq.com/cgi-bin/login?appid=700024506&qlogin_auto_login=1&hide_close_icon=1&style=14&pt_logo_14=1&pt_open_appid=1&s_url=' + encodeURIComponent(url2);
						var url = 'http://3c.buy.qq.com/www/icson/redirect.html?url=' + encodeURIComponent(url3);
						/*
						var _qq = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=215585&redirect_uri=' + encodeURIComponent('http://base.'+G.domain+'/index.php?mod=user&act=loginqqauthcode&url=' + encodeURIComponent(purl));
						*/
						var _qq = url;
						$('#qqauthlogin').attr('href', _qq);
						$('#PageLoginByQQBtn a').attr('href', _qq);
						$('#ali_login').attr('href', 'http://base.'+G.domain+'/index.php?mod=user&act=toalipaylogin&url=' + encodeURIComponent(purl));
						$('#PageRegBtn').attr('href', urlReg + '?url=' + encodeURIComponent(purl));
						$('#PageLogin a.menu_hd').attr('href', 'https://base.'+G.domain+'/login.html?url=' + encodeURIComponent(purl));
					}

					G.logic.login.bindHeadLoginHandler($('#PageLogin div.menu')); //登录浮层父节点

					//更新“我的订单”部分
					$('#PageMyOrderLi div.mod_order').html('<p class="empty"><a ytag="06807" href="https://base.'+G.domain+'/login.html?url=' + encodeURIComponent(location.href)+'">登录</a>后查看最近的订单信息</p>');
					G.logic.login.mouseEnterAndOut($('#PageMyOrderLi div.menu'), null, null, 'menu_hover');
				}
				
				// 判断是否显示新人专享
				if ($('#NewUserCoupon').length == 0 && o && o.errno == 0) {
					if(o.data.exp_point <= 0) {
						// 获得广告信息
						var siteId = G.logic.constants.getSiteId();
						G.logic.getAdItem(siteId, 'homepage', function(data) {
							var imgAdDatas = data['newuser-banner'],
								textAdDatas = data['newuser-text'],
								imgAdHtml = textAdHtml = '';
							if (typeof(imgAdDatas) !== 'undefined') {
								imgAdHtml = '<a ytag="07501" target="_blank" title="' + imgAdDatas[0]['content'] + '" href="' + imgAdDatas[0]['url'] + '"><img alt="" src="' + imgAdDatas[0]['img_wide'] + '"></a>';
							}
							if (typeof(textAdDatas) !== 'undefined' ) {
								if (textAdDatas.length >= 2) {
									textAdHtml += '<a ytag="07502" target="_blank" class="ico_new" href="' + textAdDatas[1]['url'] + '">' + textAdDatas[1]['content'] + '</a>';
									textAdHtml += '<a ytag="07503" target="_blank" class="ico_lottery" href="' + textAdDatas[0]['url'] + '">' + textAdDatas[0]['content'] + '</a>';
								} else {
									textAdHtml += '<a ytag="07502" target="_blank" class="ico_new" href="' + textAdDatas[0]['url'] + '">' + textAdDatas[0]['content'] + '</a>';
								}
							}
							var newUserStr = '<li id="NewUserCoupon" class="item coupon">\
												<div class="info">\
													<a ytag="07500" class="hd" href="http://u.'+G.domain+'/xinren" target="_blank"><i class="dot_coupon"></i><span>新用户专享</span></a>\
													<div class="mod_coupon">\
														<div class="bg_img">' + imgAdHtml + '</div>\
														<p class="c_link">' + textAdHtml + '</p>\
														<a class="close" title="关闭" href="javascript:void(0);">关闭</a>\
														<div class="layout_arrow_top"> <span class="">◆</span><i>◆</i> </div>\
													</div>\
												</div>\
											</li>';
							if ($('#NewUserCoupon').length == 0) {
								$page_nav.prepend(newUserStr);
							}
							$mod_coupon_box = $page_nav.find('div.mod_coupon');
							window.isOnCoupon = false;
							$page_nav.find('div.info').mouseover(function(){
								window.isOnCoupon = true;
								$mod_coupon_box.show();
							}).mouseout(function(){
								window.isOnCoupon = false;
								window.setTimeout(function(){
									if (!window.isOnCoupon) {
										$mod_coupon_box.hide();
									}
								}, 500);
							}).find('a.close').click(function(){
								$(this).parent().hide();
							});
						});
					} else {
						var newUserStr = '<li id="NewUserCoupon" class="item coupon">\
							<div class="info">\
								<a ytag="07500" class="hd" href="http://vip.'+G.domain+'/" target="_blank"><i class="dot_coupon"></i><span>会员俱乐部</span></a>\
							</div>\
						</li>';
						if ($('#NewUserCoupon').length == 0) {
							$page_nav.prepend(newUserStr);
						}
					}
				}
			});
		});
	},

	/**
	 * 下拉菜单：mouseenter 时添加 <hover_class> 样式；反之去掉。
	 * @param jQueryObject $target 目标节点
	 * @param Function mouseEnterCb 鼠标进入时的回调函数
	 * @param Function mouseOutCb 鼠标离开时的回调函数
	 * @param String hover_class 鼠标划过时，添加的样式类
	 */
	mouseEnterAndOut : function($target, mouseEnterCb, mouseOutCb, hover_class) {
		var _timeOut = 300,
			_fnTm = null,
			_class = hover_class || 'hover',
			_clrFnTm = function() {
				if (_fnTm) {
					clearTimeout(_fnTm);
					_fnTm = null;
				}
			},
			_overFn = function() {
				_clrFnTm();
				$target.addClass(_class);
				if (mouseEnterCb) {
					mouseEnterCb($target);
				}
			},
			_outFn = function() {
				_clrFnTm();
				_fnTm = setTimeout(function() {
					$target.removeClass(_class);
					if (mouseOutCb) {
						mouseOutCb($target);
					}
				}, _timeOut);
			};

		$target.hover(_overFn, _outFn); //注册
	},

	//绑定头部登录需要的事件处理函数
	bindHeadLoginHandler : function($login_div) {
		var $login_btn = $login_div.find('div.mod_login_bd dd.item_submit button'),
			$input_account = $login_div.find('div.mod_login_bd input[type="text"]'),
			$input_pwd = $login_div.find('div.mod_login_bd input[type="password"]'),
			$error_tip = $login_div.find('div.mod_login_bd dd.error');

		var _clearLoginArea = function() { //清空登录浮层
			_clearErr();
			$input_account.val('');
			$input_pwd.val('');
		}

		G.logic.login.mouseEnterAndOut($login_div, null, _clearLoginArea, 'menu_hover'); //注册弹出事件

		//登录部分
		var _setErr = function($obj, msg) {
			$obj && $obj.addClass('status_error');
			$error_tip.html('<i class="dot_error"></i>' + msg).show();
		};
		var _clearErr = function() {
			$input_account.removeClass('status_error');
			$input_pwd.removeClass('status_error');
			$error_tip.hide().html('');
		};

		var _onLoginCheck = function() {
			_clearErr();

			var ret = false;
			if ($.trim($input_account.val()) == '') {
				_setErr($input_account, '请输入您的易迅帐号');
			}
			else if ($.trim($input_pwd.val()) == '') {
				_setErr($input_pwd, '请输入您的易迅密码');
			}
			else {
				ret = true;
			}

			return ret;
		};
		var _onLoginSuc = function() {
			var href = $.trim(location.href);
			if (G.logic.login._refUrl && G.logic.login._refUrl != href) {
				location.replace(G.logic.login._refUrl);
			}
			else {
				G.logic.login.updateHead();
			}
		};
		var _onLoginFailed = function(errno) {
			switch(errno) {
				case 66:
					_setErr($input_pwd, '密码错误，请您重新填写');
					break
				case 67:
					_setErr($input_account, '该登录帐号不存在');
					break
				default:
					_setErr(false, '对不起，登录失败');
					break;
			}
		};

		$login_btn.click(function(event) { //浮层登录按钮点击
			var checkRet = _onLoginCheck();
			if (checkRet) {
				G.logic.login.login(
					$.trim($input_account.val()),
					$.trim($input_pwd.val()),
					_onLoginSuc,
					_onLoginFailed
				);
			}
		});
	},

	getLoginUid	: function() {
		var uid = G.util.cookie.get("uid");
		if (G.logic.validate.checkNumber(uid)) {
			return uid;
		}

		return false;
	},

	forceFlushUser	: function() {
		var fTime = Math.random();
		G.util.cookie.add('randpro', fTime, '/', 24 * 3600, '.'+G.domain);
		return fTime;
	},

	// 获取已经登录的用户资料
	_getLoginUser	: function(callback, force) {
		var self = G.logic.login,
			cbFn = $.isFunction(callback) ? callback : $.noop,
			uid = self.getLoginUid();

		if (self._loginUser != false && self._loginUser.data && self._loginUser.data.uid == uid) {
			cbFn(self._loginUser);
			return;
		}

		self._userFnQueue.add(cbFn);
		if (self._userLoading) {
			return;
		}
		self._userLoading = true;

		var fTime = G.util.cookie.get('randpro');
		if (force) {
			fTime = self.forceFlushUser();
		}
		var qplusNick = G.util.cookie.get('qplus_nick');
		var tsp = '';
		if (qplusNick != '') {
			tsp = '&' + new Date().getTime();
		}
		$.ajax({
			type: "GET",
			url: G.util.token.addToken('http://' + G.DOMAIN.BASE_ICSON_COM + '/json.php?mod=user&act=profile&uid=' + uid + '&r=' + fTime + tsp,'jq'),
			success: function(o) {
				self._userLoading = false;
				self._userFnQueue.exec(o);
				self._loginUser = o;
			},
			dataType: 'jsonp',
			cache	: true,
			crossDomain	: true
			//jsonpCallback	: 'loadLoginUserCb'
		});
	},

	_getLoginQQUser	: function(callback) {
		if (parent) {
			try {
				if (parent.limitIframeRequest == true) {
					return;
				}
			}catch(e){
				//
			}
		}
		/*
		var url = 'http://a1.shop.qq.com/act.php?mod=checkuserq&func=redirect&id=icson&url='+encodeURIComponent('http://base.'+G.domain+'/index.php?mod=user&act=loginqq&url='+encodeURIComponent('http://st.'+G.domain+'/static_v1/htm/loginjump.htm'))+'&furl='+encodeURIComponent('http://st.'+G.domain+'/static_v1/htm/loginjump.htm');
		*/
		var url = 'http://3c.buy.qq.com/www/icson/login.html?auto=1&url='//
+ encodeURIComponent('http://base.'+G.domain+'/index.php?mod=user&act=ptloginqq&url=' + encodeURIComponent('http://st.'+G.domain+'/static_v1/htm/loginjump.htm'))//
+ '&furl=' + encodeURIComponent('http://st.'+G.domain+'/static_v1/htm/loginjump.htm');
		var iframe = $('<iframe src="about:blank" style="display:none"></iframe>');
		$('body').prepend(iframe);

		var cbFn = $.isFunction(callback) ? callback : $.noop;
		iframe[0].callback = function() {
			cbFn();
			$(this).src = 'about:blank';
			$(this).remove();
			this.callback = null;
		}

		if ($.browser.msie && parseInt($.browser.version) < 9) {
			G.util.post.pIndex = (G.util.post.pIndex || 0) + 1;
			iframe[0].pIndex = G.util.post.pIndex;
			iframe[0].ie6callback = function() {
				this.src = url;
			};
			iframe[0].src = location.protocol + '//st.'+G.domain+'/static_v1/htm/ie6post.htm';
		}
		else {
			iframe[0].src = url;
		}
		window.limitIframeRequest = true;
	},

	getLoginUser	: function(callback, getQQLoginStatus, force) {
		var self = G.logic.login,
			uid = self.getLoginUid();

		self._refer = (self._refer === null) ? document.referrer : self._refer;
		if (!uid) {
			// 来源不是易迅网站或者没有登录过
			// 返利用户特殊标记 QQACCT 为 2
			var cps_info = G.util.cookie.get('cps_info');
			if (getQQLoginStatus !== false && ((/^\s*linktech\|\|A100060164/i.test(cps_info) && G.util.cookie.get('QQACCT') == 2) || (((self._refer != '' && !/^http:\/\/([a-z0-9]+\.|)51buy\.com/i.test(document.referrer)) || !G.util.cookie.get('QQACCT')) && !cps_info))) {
				self._qqloginFnQueue.add(callback);
				if (self._qquserLoading) {
					return;
				}

				self._qquserLoading = true;
				self._getLoginQQUser(function() {
					self.getLoginUser(function(o) {
						self._refer = '';
						if (o && o.errno == 0) {
							G.util.cookie.add('QQACCT', o.data.icsonid.replace(/^Login_QQ_/i, ''), '/', 0, '.'+G.domain); // 会话期
						}
						self._qquserLoading = false;
						self._qqloginFnQueue.exec(o);
					}, false, force);
				});
			}
			else {
				self._refer = '';
				$.isFunction(callback) && callback(false);
			}
			return;
		}

		self._refer = '';
		self._getLoginUser(callback, force);
	},

	logout	: function(cbFn) {
		if(G.util.cookie.get("wg_skey")){
			$.ajax({
				type: "GET",
				url: "http://base.'+G.domain+'/json.php?mod=user&act=logout&callback=success",
				success: function(o) {
					G.logic.login.updateHead();
				},
				dataType: "jsonp",
				cache: true,
                crossDomain: true
			});
			G.util.cookie.del('wg_skey', '.'+G.domain);
			
		}
			$.ajax({
				type: "GET",
				url: "http://user.buy.qq.com/cgi-bin/userlogin/logout?callback=success&g_tk="+G.util._DJB(G.util.cookie.get("ptskey"))+"&g_ty=ls",
				success: function(o) {
					G.logic.login.updateHead();
				},
				dataType: 'jsonp',
				cache	: false,
				crossDomain	: true
			});
			G.util.cookie.del('skey', '.'+G.domain);
		
		G.util.cookie.del('ptskey', '.'+G.domain);
		G.util.cookie.del('uid', '.'+G.domain);
		G.util.cookie.del('qq_nick', '.'+G.domain);
		G.util.cookie.del('cps_src', '.'+G.domain); /* 当前登录是从推广商处跳转并联合登录, 而非本地登录 */
		G.util.cookie.del('BOUND_QQACCT', '.'+G.domain);
		G.util.cookie.del('__BINDQQACCOUNT', '.'+G.domain);


		G.logic.login._logoutFnQueue.exec();
		$.isFunction(cbFn) && cbFn();

		if (window.LOGIN_NO_JUMP) {
			location.replace(LOGIN_NO_JUMP === true ? 'http://www.'+G.domain+'/' : LOGIN_NO_JUMP);
		}
		else {
			G.logic.login.updateHead();
			G.logic.header.getShoppingCart();
		}
	},

	onlogout	: function(cbFn) {
		$.isFunction(cbFn) && G.logic.login._logoutFnQueue.add(cbFn);
	},

	ifLogin	: function(thisObj, argumentsParent) {
		var uid = G.logic.login.getLoginUid();
		if (!uid) {
			G.logic.login.popup(thisObj && argumentsParent ? (function(_) {
				return function() {
					var args = [];
					for(var i = _.length - 1; i >= 0; i--) {
						args.unshift(_[i]);
					}
					_.callee.apply(thisObj, args);
				};
			})(argumentsParent) : $.noop);

			return false;
		}

		return true;
	},

	ifLoginJump	: function() {
		var uid = G.logic.login.getLoginUid();
		if (!uid) {
			var url = 'http://www.'+G.domain+'/';
			if (!window.skipJumpPage) {
				url = 'https://base.'+G.domain+'/login.html?url=' + encodeURIComponent(location.href);
			}
			location.replace(url);
			return false;
		}

		return true;
	},

	jump	: function() {
		//
	}
}; 
G.logic.header = {
	_Q_SHOW_DEF_TEXT : '输入品牌或商品进行搜索',
	loginStatus : function() {
		G.logic.login.updateHead();

		G.ui.tips.swapInput({
			target : $('#q_show'),
			defaultValue : G.logic.header._Q_SHOW_DEF_TEXT,
			focusClass : 'mod_search_txt',
			blurClass : 'mod_search_txt no_cur'
		}); // 搜索栏

		if ($.browser.msie && $.browser.version == 6) {
			$("#q_show").next().click(function() {
				if ( G.logic.header.query() ) {
					$(this).parents("form")[0].submit();
				}
			});
		}

		//this.setBust();//防止被iframe

	//	this.locateRegion(); // 分站切换

		this.category.init(); // 类目部分

		this.getShoppingCart(); // 购物车

	//	this.getHotKey(); // 搜索热词

		this.ga(); // Google 分析

		this.recordLs(); // 来源记录

		this.autoComplete(); //

		//this.initTopAdvertise(); // 顶部通知

		this.updateQQBuyEntry(); // QQ网购入口

		this.initTopNotice(); // 顶部通知初始化
		
		//this.checkProvId();//判断省份id与站点是否一致

//		setTimeout(function() {
//			if (location.href.match(/^http:\/\/item\.(icson|51buy)\.com\/item-/)
//				|| location.href.match(/^http:\/\/act\.(icson|51buy)\.com\/promo-/)
//				|| location.href.match(/^http:\/\/((sz|www)\.|)(icson|51buy)\.com($|\/([^\.]+)?$)/)) {
//
//				$.ajax({
//					url : 'http://st.icson.com/static_v1/js/app/tray_popup.js?v=2.0',
//					cache : true,
//					type : 'GET',
//					crossDomain : true,
//					scriptCharset : 'gb2312',
//					dataType : 'script',
//					success : function() {
//						G.app.tray_popup.launch();
//					}
//				});
//			}
//		}, 0);

//		$(function() {
//			logStat.initStat();
//		});
	},

	/**
	 * 防止被iframe
	 */
	setBust : function() {
		if (window.top !== window.self) {
			try {
				if (window.top.location.host) {

				} else {
					this.bust();
				}
			} catch (ex) {
				this.bust();
			}
		}
	},

	bust : function() {
		document.write = "";
		if (location.host == 'admin.icson.com') {
			return;
		}
		window.top.location = window.self.location;
		setTimeout(function() {
			document.body.innerHTML = '';
		}, 0);
		window.self.onload = function(evt) {
			document.body.innerHTML = '';
		};
	},

	/**
	 * 更新QQ网购入口部分HTML
	 */
	updateQQBuyEntry : function() {
		var $entry = $('#QQBuyEntry');
		
		var newHTML = [
'<li class="item"><a ytag="07101" target="_blank" href="http://buy.qq.com?WGTAG=1000.24.1.1">QQ网购&nbsp;</a></li>',
'<li class="item"><a ytag="07102" target="_blank" href="http://www.paipai.com?ptag=10126.11.1">拍拍&nbsp;</a></li>',
'<li class="item current"><a ytag="07104" target="_blank" href="http://www.'+G.domain+'">易迅&nbsp;</a></li>'
].join('');
		$entry.append(newHTML);
	},

	/**
	 * 更新QQ网购入口部分HTML，窄屏
	 */
	updateQQBuyEntryZhai : function() {
		var $entry = $('#QQBuyEntry');
		var html = $entry.html();
		if( (html||'').match('QQ网购') )
			return;
		
		var newHTML = [
'<li class="item"><a ytag="07101" target="_blank" href="http://buy.qq.com?WGTAG=1000.24.1.1">QQ网购&nbsp;</a></li>',
'<li class="item"><a ytag="07102" target="_blank" href="http://www.paipai.com?ptag=10126.11.1">拍拍&nbsp;</a></li>',
'<li class="item current"><a ytag="07104" target="_blank" href="http://www.'+G.domain+'">易迅&nbsp;</a></li>'
].join('');

		$entry.append(newHTML)
		
	},

	/**
	 * 纪录
	 */
	recordLs : function() {
		var params = G.util.parse.url();

		$.each(params, function(i, param) {
			$.each(param, function(k, v) {
				k = (k + '').toLowerCase();
				if (k == 'ls' || k == 'us') {
					G.util.cookie.add(k, v, '/', 7 * 24 * 3600, '.'+G.domain);
				}
			});
		});
	},

	autoComplete : function() {
		function domReady() {
			G.logic.constants.getWhId(function(whId) {
				var areaCode = G.util.cookie.get("wsid");
				var charset = (document.charset || document.characterSet || "").toLowerCase();
				var autoComlete = G.ui.autoComplete({
					"target" : "#q_show",
					"listOnClass" : "autocomplete_status_on",
					"itemActiveClass" : "status_on",
					"itemTPL" : "<li><span>{label}</span><cite>约{count}个搜索结果</cite></li>",
					"url" : "http://search.paipai.com/cgi-bin/isuggest_yixun?AreaCode=" + areaCode + "&charset=utf-8&rcharset=gbk",
					"keyName" : 'KeyWord',
					"delayTime" : 250,
					"cache" : true
				});
				var curInputKey;//当前用户输入的关键词
				var wordList = [];//返回推荐关键词列表


				autoComlete.bind("success", function(event, data) {
					var json = data.response, items = [];
					if (json && json.list && json.list.length > 0) {
						curInputKey = json.hotclass[0][0];			
						for (var i = 0, len = json.list.length; i < len; i++) {
							var _item = json.list[i];
							items.push({
								"value" : _item[0],
								"count" : _item[1],
								"label" : _item[0]
							});
						}
					}
					data.response = items;
					wordList = items;
				});

				autoComlete.bind("complete", function() {	
					reportClickLog();
                    $("#q_show").parents("form").submit();
                });
				autoComlete.bind("enter.autocomplete", function(){
					reportClickLog();
				});
				//直接点击搜索上报
				$("#q_show").parents("form").children('.search_submit').click(function(){
					if($("#q_show").val() && $("#q_show").val() != G.logic.header._Q_SHOW_DEF_TEXT){
						reportClickLog();
					}				
				});

				function reportClickLog(){
					//搜索smartbox上报 lgType{|}ls{|}subls{|}herf
					var clickLogUrl = "http://search.paipai.com/cgi-bin/clicklog";
					var visitkey = G.util.cookie.get("visitkey"),uin = G.util.cookie.get("uid");
					var site_config = {
						"1":"4",
						"1001":"10",
						"2001":"13",
						"3001":"42",
						"4001":"43",
						"5001":"44"
					};
					var wsid =  G.util.cookie.get("wsid");
					var srcId = site_config[wsid];
					var ls=1030,pos=0;//1030表示直接点击搜索按钮
					var selectedKey = $("#q_show").val();
					var refUrl,hrefUrl;
					for(var i = 0, l = wordList.length; i < l; i++){
						if(selectedKey == wordList[i]["value"]){
							pos = i+1;
						}
					}
					if(pos > 0){
						//as=2表示smartbox来源
						ls = 1027;//表示通过smartbox下拉选中
						$("#as").val(2);
						refUrl = encodeURIComponent(curInputKey);
						hrefUrl = encodeURIComponent(selectedKey);
					}else if(pos == 0){
						refUrl = encodeURIComponent(selectedKey);
						hrefUrl = l;//当直接搜索时，上报smartbox显示关键词条数
					}				
					$.getScript(clickLogUrl + "?srcid=" + srcId + "&uin=" + uin + "&ls=" + ls + "&subls=" + pos + "&visitKey=" + visitkey + "&ref=" + refUrl + "&herf=" + hrefUrl);

				}

			});
		}

		$(domReady);
	},
	_kefuLink : {
		1 : 'http://b.qq.com/webc.htm?new=0&sid=4006401878&eid=218808P8z8p8y8x8Q8R8K&o=http://www.'+G.domain+'&q=7',
		1001 : 'http://b.qq.com/webc.htm?new=0&sid=4008286699&eid=218808P8z8p8x8z8y8x8z&o=http://www.'+G.domain+'&q=7',
		2001 : 'http://b.qq.com/webc.htm?new=0&sid=4008280055&eid=218808P8z8p8P8q8R8q8p&o=http://www.'+G.domain+'&q=7',
		3001 : 'http://b.qq.com/webc.htm?new=0&sid=4008280055&eid=218808P8z8p8P8q8R8q8p&o=http://www.'+G.domain+'&q=7',
		4001 : 'http://b.qq.com/webc.htm?new=0&sid=4008286699&eid=218808P8z8p8x8z8y8x8z&o=http://www.'+G.domain+'&q=7',
		5001 : 'http://b.qq.com/webc.htm?new=0&sid=4008286699&eid=218808P8z8p8x8z8y8x8z&o=http://www.'+G.domain+'&q=7' 
	},

	locateRegion : function() {
		var container = $("#i_region");

		if (container.length === 0)
			return;

		var self = arguments.callee, constant = G.logic.constants;

		constant.getWhId(function(whId) {

			var $currentPrId = G.logic.constants.getProvId();
			
			var proname = constant.serviceAreas[$currentPrId][0];

			if (proname) {
				container.html('<p class="trans_to"><span class="trans">送至</span><a href="#" class="change"><span>' + proname + '</span><span class="dot_change"></span></a></p>'); // 分站名
			} else {
				container.html('<p class="trans_to"><span class="trans">送至</span><a href="#" class="change"><span>上海</span><span class="dot_change"></span></a></p>');
			}
			
			var current = '';
			var tosite = '';
			var list = [];
			var ytag = 1000;
			$.each(G.logic.constants.allowedWhInfo, function(w_whid, w_name) {
				var li = '<div class="city_item"><div class="storage_item"><p>' + w_name + '仓服务：</p><ul>';

				for (var i = 0;i < 31;i++) {
					var prid = G.logic.constants.serviceAreasSeq[i];
					var prInfo = G.logic.constants.serviceAreas[prid];
					if (w_whid == prInfo[1]) {
						current = ($currentPrId == prid) ? 'class="current"' : '';
						tosite = ($currentPrId == prid) ? '' : 'alt="前往' + prInfo[0] + '" title="前往' + prInfo[0] + '"';
						ytag++;
						li += '<li><a ytag="0' + ytag + '"' + tosite + ' href="#" ' + current + ' onclick="return false" w="' + w_whid + '" p="' + prid +'">' + prInfo[0] + '</a></li>';
					}
				}
				li += '</ul></div></div>';
				list.push(li);
				
			});
			
			var $jumpCity = $('<div class="jump_city">\
					<div class="city">' + list.join('') + '<p class="tip">易迅商品暂时只支持配送至中国大陆地区</p></div>\
					<p class="load"></p>\
					<p class="f"><span class="icon icon_msg0 icon_msg0_warn"></span>切换失败，请<a class="switch_fail_btn" href="#">返回重试</a></p>\
					</div>').appendTo(container);

			G.logic.login.mouseEnterAndOut(container, null, null, 'area_change_hover');

			$('div.city li a', $jumpCity).click(function() {
				self.lastClickDom = this;
				if (!G.logic.constants.serviceAreas[$(this).attr('p')]) {
					return;
				} else {
					if ($(this).attr('p') == $currentPrId) {
						return;
					}
					G.logic.header.switchSite($(this).attr('w'), $(this).attr('p'));
					G.logic.constants.setLocationId(G.logic.constants.serviceAreas[$(this).attr('p')][2] + '_' + $(this).attr('p'));
				}
			});

			$('a.switch_fail_btn', $jumpCity).click(function() {
				self.lastClickDom && $(self.lastClickDom).triggerHandler('click');
				return false;
			});
		}); // end if		
	},

	// 跳转分站
	switchSite : function(destSiteId, provId) {
		destSiteId = parseInt(destSiteId);
		provId = parseInt(provId);
		
		var self = arguments.callee,
			siteName = G.logic.constants.allowedWhInfo[destSiteId],
			provName = G.logic.constants.serviceAreas[provId][0];

		if (!this.xhr) {
			var version = "4.0";

			self.xhr = $.ajax({
				type : "GET",
				timeout : 30 * 1000,
				scriptCharset : 'gb2312',
				url : 'http://st.icson.com/static_v1/js/app/switchSite.js?v='
						+ version,
				dataType : 'script',
				cache : true,
				crossDomain : true
			});
		}

		var container = $("#i_region");
		self.xhr.done(function() {
			G.app.switchSite.tryToSwitchTo(destSiteId, location.href);
		}).fail(function() {
			container.find('.load').css('display', 'none');
			container.find('.f').css('display', 'block');
			container.find('.close').css('display', 'block');
		});

		container.find('.load').html('<span class="loading_82_21"></span>正在切换到<span class="where">' + provName + '</span>……').css('display', 'block');
		container.find(".city, .nor, .f, .close").css('display', 'none');
	},

	ga : function() {
		var _gaq = _gaq || [];

		var gaAccount = {
			1 : 'UA-10104379-19',
			1001 : 'UA-10104379-17',
			2001 : 'UA-10104379-18'
		};
		window._gaq = _gaq;

		G.logic.constants.getWhId(function(whId) {
			window._gaq.push(['_setAccount', 'UA-10104379-15']); // 51buy的统计变成15
			window._gaq.push(['_setCustomVar', 1, 'site_id',
					'site_' + whId, 2]);
			window._gaq.push(['_trackPageview']);
			window._gaq.push(['_setAccount', gaAccount[whId]]);
			window._gaq.push(['_deleteCustomVar', 1]);
			window._gaq.push(['_trackPageview']);

//			var url = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
//
//			$(function() {
//				$.ajax({
//					"url" : url,
//					"type" : "get",
//					"dataType" : "script",
//					"cache" : true,
//					"async" : true
//				});
//			});
		});
	},

	// 搜索
	query : function() {
		var input = $("#q_show"),
			v = $.trim(input.val()),
			ret = true,
			href = input.attr("_href");

		if (v === G.logic.header._Q_SHOW_DEF_TEXT && href) {
			window.location.href = href;
			ret = false;
		} else if (v === "" || v === G.logic.header._Q_SHOW_DEF_TEXT) {
			input.focus();
			ret = false;
		}

		if ($('#q_show').parents("form").find('input[name="YTAG"]').length === 0) {
			var ytag = (window.yPageLevel || 0) + '.' + (window.yPageId || 0) + '02000';
			$('#q_show').parents("form").append($('<input type="hidden" name="YTAG" value="' + ytag + '" />'));
		}

		return ret;
	},

	// 热门关键词
	getHotKey : function() {
		var dom = $("#i_keyword");
		if (dom.length === 0)
			return;

		var qplusNick = G.util.cookie.get('qplus_nick');
		var tsp = '';
		if (qplusNick != '') {
			tsp = '&' + new Date().getTime();
		}
		G.logic.constants.getWhId(function(whId) {
			//var url = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'd.'+G.domain+'/json.php?mod=hotkey&act=page' + tsp ;
			$.ajax({
				type : "GET",
				url : 'http://d.'+G.domain+'/json.php?mod=hotkey&act=page' + tsp,
				success : function(o) {
					if (o && o.errno == 0) {
						dom.html(o.data);
					}
				},
				dataType : 'jsonp',
				cache : true,
				crossDomain : true,
				scriptCharset:"gb2312",
				jsonpCallback : 'loadSiteHotKey_' + whId
			});
		});
	},

	// 拉取购物车数据
	getShoppingCart : function() {
		var $panel = $("#i_cart_info");

		if ($panel.length == 0)
			return;

		var uid = G.logic.login.getLoginUid(),
			itemCount = 0,
			cart_wrap_empty,
			_finishShoppingCartCount = false, // 加载购物车数字
			_finishShoppingCartDetail = false, // 加载购物车详情

		_initCart = function(count) { // 初始化购物车
			itemCount = count;
			cart_wrap_empty = (count == 0) ? ' cart_wrap_empty' : '';
			_finishShoppingCartCount = true;

			$panel.html('<a ytag="04700" id="J_cartInfo_a" class="cart_wrap' + cart_wrap_empty + '"' + 'href="http://buy.'+G.domain+'/cart.html">'
				+ '<i class="dot_cart"></i><span>购物车（' + count + '）件</span></a>'
				+ '<div class="cart_list" style="display:none">正在努力为您加载购物车信息…</div>').mouseenter(function(event) {

				var $target = $('div.cart_list', this);
				$target.show();
				_printCart($target);
			}).mouseleave(function(event) {
				if(itemCount == 0){
					$('#J_cartInfo_a').addClass('cart_wrap_empty');
				}
				$('div.cart_list', this).hide();
			});
		},

		_printCart = function($target) { // 打印购物车详情
			if (itemCount != 0) { // 发送请求，获取购物车详情
				$target.css({
					width: null
				});
				
				//上海站(华东仓)易迅快递覆盖的省份:目前只有[上海,浙江,江苏,安徽]
				var _cityId = G.logic.constants.getLocationId().split("_")[1] || 2621;//当前省份ID
				var _freePrice = 29;
				$.each(G.logic.constants.sh_icson_delivery_city || {}, function(k, v) {
					if (v == _cityId) {
						_freePrice = 99;
					}
				})
				
				var	yunfei_block = '<dd class="fee_tip">满'+_freePrice+'元免运费</dd>';
				var _cart_item_tpl = '<ul>\
<@rows@>\
<li>\
<div class="pic_wrap"><a ytag="0{ytag1}" href="{product_url}" target="_blank"><img alt="{product_name}" src="{product_img}"></a></div>\
<div class="txt_wrap">\
<div class="name"><a ytag="0{ytag2}" href="{product_url}" target="_blank">{product_name}</a></div>\
<div class="action">\
<span class="rmb">&yen;</span><span class="price">{product_price}</span>\
<span class="ride">x</span>{product_count}\
</div>\
</div>\
</li>\
<@_rows@>\
<dl>\
<dt>\
共<span class="rmb">{total_count}</span>件商品\
总计：<span class="rmb">&yen;</span><span class="price">{total_price}</span>\
</dt>'
+ yunfei_block +
'<dd><a ytag="04701" class="balance" href="http://buy.'+G.domain+'/cart.html" title="去购物车结算">去购物车结算</a></dd>\
</dl>\
</ul>',
				_formatRetData = function( data ) { // 转换返回的数据为HTML
					var _pinfo = {
						total_count : 0,
						total_price : 0,
						rows : []
					};
					var ytagBase = 4702;

					$.each(data, function(i, item) {
						_pinfo.total_count += parseInt(item.buy_count);
						_pinfo.total_price += item.price * item.buy_count / 100;
						_pinfo.rows.push({
							product_url : 'http://item.'+G.domain+'/item-' + item.product_id + '.html',
							product_name : item.name,
							product_img : G.logic.constants.getPic60Url(item.product_char_id, 0),
							product_price : (item.price / 100).toFixed(1),
							product_count : item.buy_count,
							ytag1: ytagBase++,
							ytag2: ytagBase++
						});
					});
					_pinfo.total_price = _pinfo.total_price.toFixed(1);

					return G.ui.template.fillWithTPL(false, _pinfo, false, _cart_item_tpl);
				};

				if (!_finishShoppingCartDetail) {
					$target.html('加载中…');
					if (uid) { // 加载登录态购物车信息
						$.getJSON('http://'+ G.DOMAIN.BUY_ICSON_COM + '/json.php?mod=shoppingcart&act=list&callback=?&uid=' + uid, function(ret){
							  if (ret && ret.hasOwnProperty('errno')) {
								  _finishShoppingCartDetail = true;
  
								  ret.errno = parseInt(ret.errno)
								  switch (ret.errno) {
									  case 0 : // success
										  var _pinfoHtml = _formatRetData(ret.data);
										  $target.html(_pinfoHtml);
										  break;
  
									  case 3 : // TTC ERROR
										  $target.html('服务器出了点小状况，请稍候...');
										  break;
  
									  case 500 : // uid empty
									  case 501 : // uid invalid
									  default :
										  break;
								  }
							  }
							  else { // 请求出错
							  }
					
						});
					
					} else { // 加载未登录态购物车信息
						G.util.localShare(function(cache) {
							var cart = cache.getItem('shoppingcart'), productInfo = [];

							if (cart) {
								$.each(cart.list, function(k, item) {
									productInfo.push(item[0] + '|' + item[1] + '|' + item[2]);
								});
							}
							if (productInfo.length > 0) {
								G.util.post(
									'http://' + G.DOMAIN.BUY_ICSON_COM + '/json.php?mod=shoppingcart&act=listnotlogin',
									{
										cart : productInfo.join(',')
									},
									function(ret) {
										if (ret && ret.hasOwnProperty('errno')) {
											_finishShoppingCartDetail = true;

											ret.errno = parseInt(ret.errno)
											switch (ret.errno) {
												case 0 : // success
													var _pinfoHtml = _formatRetData(ret.data);
													$target
															.html(_pinfoHtml);
													break;
												case 3 : // TTC
													// ERROR
													$target
															.html('服务器出了点小状况，请稍候...');
													break;
												default : // TODO
													break;
											}
										}
										else { // 请求出错 TODO
										}
									},
									'jsonp'
								);
							}
						});
					}
				}
			}
			else { // 打印空购物车信息
				//$target.html('您还未添加任何商品到购物车中');
				var cartAd = G.common.headConfig.CART,cartAdHtml="";
				if(cartAd.img){
					cartAdHtml = '<div class="cart_list_seven_year"><a target="_blank" href="'+cartAd.url+'" title="'+cartAd.name+'"><img src="'+cartAd.img+'" /></a></div>'
				}
				$target.css({
					width: 196
				});
				$('#J_cartInfo_a').removeClass('cart_wrap_empty');
				if(uid){//已登录状态
					$target.html('<div style="padding:25px 10px;line-height:20px;"><p>您的购物车是空的</p><p>快挑选喜欢的商品加入购物车吧</p>'+cartAdHtml+'</div>');
				}else{//未登录状态
					$target.html('<div style="padding:25px 10px;line-height:20px;"><p>您的购物车是空的</p><p>如您已添加商品，可<a style="color:#317EE7" href="https://base.'+G.domain+'/login.html?url='+encodeURIComponent(location.href)+'">登录</a>查看</p>'+cartAdHtml+'</div>');
				}
			}
		};

		if (uid) { // 登录
			$.getJSON(
				"http://d."+G.domain+"/json.php?mod=ajax&act=cart&callback=?",
				function(json) {
					_initCart(json && json.errno == 0 && json.data.num || 0);
				}
			);
		}
		else { // 未登录
			G.util.localShare(function(cache) {
				var cart = cache.getItem('shoppingcart'), num = 0;

				if (cart) {
					$.each(cart.list, function(k, item) {
						num += item[1] - 0;
					});
				}

				_initCart(num);
			});
		}
	},

	category : {
		config : {
			headIn: 10,
			headOut : 100,
			panelOut: 200,
			liIn: 100
		},

		ytag_base : 85,

			//一级菜单模板
		FIRSTTPL : '<div id="i_sort_list">\
	<div class="cate_normal">\
		<@first_list@>\
		<div cateid="{id}" class="item">\
			<div class="item_hd">\
				<dl>\
					<dt class="top_cate">\
						<a hotname="I.CATEGORY.FIRST.{index}" href="{url}" target="_blank" ytag="{ytag}">{text}<i class="dot_cate"></i></a>\
						{hllink}\
					</dt>\
					<dd class="sub_cate">\
						<@key_list@>\
						<a hotname="I.CATEGORY.FIRST.KEYWORD.{index}" target="_blank" href="{url}" ytag="{ytag}">{name}</a>\
						<@_key_list@>\
					</dd>\
				</dl>\
			</div>\
			<div class="item_bd">\
			</div>\
		</div>\
		<@_first_list@>\
	</div>\
	<div class="cate_easy">\
		<@easy_list@>\
		<div cateid="{id}" class="item">\
			<div class="item_hd">\
				<dl>\
					<dt class="top_cate">\
						<a hotname="I.CATEGORY.FIRST.{index}" target="_blank" href="{url}" ytag="{ytag}">{text}<i class="dot_cate"></i></a>\
						{hllink}\
					</dt>\
				</dl>\
			</div>\
			<div class="item_bd">\
			</div>\
		</div>\
		<@_easy_list@>\
	</div>\
</div>',

		//二级菜单模板
		SECONDTPL : '<div class="list">\
	<@second_list@>\
	<dl>\
		<dt class="t">{second_name}</dt>\
		<dd>\
			<@third_list@>\
			<a hotname="I.CATEGORY.SECOND.{index}" target="_blank" href="{url}" ytag="{ytag}">{name}</a>\
			<@_third_list@>\
		</dd>\
	</dl>\
	<@_second_list@>\
</div>\
<div class="hot">\
	<@recommend_img_list@>\
	{recommend_img_list_html}\
	<@_recommend_img_list@>\
	<@recommend_list@>\
		<p class="t">{recommend_name}</p>\
	<ul>\
		<@recommend_link_list@>\
		<li><a hotname="I.CATEGORY.RECOMMEND.{index}" href="{recommend_link_url}" target="_blank" ytag="{ytag}">{recommend_link_name}</a></li>\
		<@_recommend_link_list@>\
	</ul>\
	<@_recommend_list@>\
</div>{iframe_str}',

		//渲染一级菜单
		renderFirst: function() {
			var self = this,
				panel = $("#category_panel");

			if ( panel.length == 0 ) return;

			var CONFIG = window.CATEGORY_CONFIG,
				dataSource = { first_list : [], easy_list : [] };
			var categoryIndex = 1;
			
			var siteId = G.logic.constants.getSiteId();
			
			var tagLink = ['<a hotname="I.CATEGORY.FIRST.KEYWORD.10.9" target="_blank" href="http://act.'+G.domain+'/recommend.html" class="link_extra" ytag="87009">装机宝<i>&nbsp;</i></a>',
						   '<a hotname="I.CATEGORY.FIRST.KEYWORD.10.1" target="_blank" href="http://act.'+G.domain+'/carproduct.html" class="link_extra" ytag="94001">爱车宝<i>&nbsp;</i></a>',
						   '<span style="color:#333333">，</span><a hotname="I.CATEGORY.FIRST.KEYWORD.10.15" target="_blank" href="http://chong.'+G.domain+'" ytag="98001">充值中心<i>&nbsp;</i></a>',
						   '<a hotname="I.CATEGORY.FIRST.KEYWORD.1.10" target="_blank" href="http://event.'+G.domain+'/event/80316703.html" class="link_extra" ytag="85009">合约机<i>&nbsp;</i></a>',
						   '<a hotname="I.CATEGORY.FIRST.KEYWORD.1.10" target="_blank" href="http://event.'+G.domain+'/event/80868722.html" class="link_extra" ytag="85009">合约机<i>&nbsp;</i></a>',
						   '<span style="color:#333333">，</span><a hotname="I.CATEGORY.FIRST.KEYWORD.10.11" target="_blank" href="http://www.'+G.domain+'/household_clean.html" ytag="95001">家庭清洁<i>&nbsp;</i></a>',
						   '<span style="color:#333333">，</span><a hotname="I.CATEGORY.FIRST.KEYWORD.10.12" target="_blank" href="http://www.'+G.domain+'/daily_food.html" ytag="96000">食品<i>&nbsp;</i></a><span style="color:#333333">，</span><a hotname="I.CATEGORY.FIRST.KEYWORD.10.12" target="_blank" href="http://www.'+G.domain+'/home_furnishing.html" ytag="96000">家居百货<i>&nbsp;</i></a>']

			$.each(window.CATEGORY_CONFIG, function(i, item) {
				var hlLink	= '';								
				if(item['text'] == "硬件/外设"){
					hlLink = tagLink[0];	
				}
				if(item['text'] == "汽车用品"){
					hlLink = tagLink[1];	
				}
				if(item['text'] == "票务旅游" || item['text'] == "机票酒店"){
					hlLink = tagLink[2];	
				}
				if(item['text'] == "手机/配件" && 1001 == siteId){
					hlLink = tagLink[3];	
				}
				if(item['text'] == "手机/配件" && 1 == siteId){
					hlLink = tagLink[4];	
				}
				if(item['text'] == "个人护理"){
					hlLink = tagLink[5];	
				}
				if(item['text'] == "母婴"){
					hlLink = tagLink[6];	
				}
				
				var data = {
						id : i,
						ytag : (self.ytag_base + categoryIndex - 1) * 1000,
						index : categoryIndex,
						url : item['url'] + ( item['url'] === "#" ? '" onclick="return false' : '" style="cursor:pointer'),
						text : item['text'],
						key_list : [],
						hllink : hlLink,
						citem : ((categoryIndex == 1) || (categoryIndex == 2) || (categoryIndex == 5)) ? 'class="item"' : ''
					},
					firstIndex = data.index,
					secondIndex = 1;

				categoryIndex++;
				item['keyword'] = item['keyword'] || [];
				$.each(item['keyword'], function(j, key) {
					data.key_list.push({
						name : key['text'],
						url : key['url'],
						ytag : secondIndex > 10 ? '' : ((self.ytag_base + firstIndex - 1) * 1000 + secondIndex),
						index : firstIndex + '.' +  secondIndex
					});
					secondIndex++;
				});
				if (item['highlight'])
					dataSource.first_list.push(data);
				else
					dataSource.easy_list.push(data);
		  	});

			panel.html( G.ui.template.fillWithTPL(false, dataSource, false, self.FIRSTTPL));
			$("#i_sort_list .cate_easy>div:first-child").addClass("item_first");
			panel.mouseleave(function() {
				self.clearTimeout();
				self.panelOutTimer = setTimeout(function() {
					//$("#i_sort_list>div>div").removeClass("i_item_status_on");
					$("#i_sort_list>div>div").removeClass("item_hover");
					$("#i_sort_list>div>div .i_cont_iframe").css({display : 'none'});
					self.needSlide && $("#category_container").removeClass('i_status_on');
				}, self.config.panelOut);
			});
		},

		clearTimeout: function() {
			this.headInTimer && clearTimeout(this.headInTimer);
			this.headOutTimer && clearTimeout(this.headOutTimer);
			this.panelOutTimer && clearTimeout(this.panelOutTimer);
			this.liInTimer && clearTimeout(this.liInTimer);

			this.headInTimer = 0;
			this.headOutTimer =0;
			this.panelOutTimer=0;
			this.liInTimer = 0;
		},

		//渲染二级菜单
		renderSecond: function(li) {
			var isIE6 = ($.browser.msie && $.browser.version == 6);
			var self = this,
				firstIndex = parseInt($(li).attr('cateid')),
				iframe_str = isIE6 ? '<iframe class="i_cont_iframe" style="width:0px;height:0px"></iframe>' : '',
				dataSource = {
					second_list: [],
					recommend_list : [],
					iframe_str : iframe_str,
					recommend_img_list : []
				},
				secondIndex = 1;

			//左侧二级导航
			$.each(window.CATEGORY_CONFIG[li.attr("cateid")]['list'], function(i, item) {
				var data = {
					second_name: item['text'],
					third_list:[]
				},thirdIndex = 1;
				$.each(item['list'], function(j, link) {
					data.third_list.push({
						name : link['text'],
						url : link['url'],
						ytag : thirdIndex > 50 ? '' : ((self.ytag_base + firstIndex) * 1000 + 100 + (secondIndex - 1) * 50 + thirdIndex), // 二级导航从xx101开始, 以50每小类递增
						index : firstIndex + '.' +  secondIndex + '.' + thirdIndex
					});
					thirdIndex++;
				});
				dataSource.second_list.push(data);
				secondIndex++;
			});

			secondIndex = 1;
			//右侧推荐
			$.each(window.CATEGORY_CONFIG[li.attr("cateid")]['recommend'] || {}, function(i, item) {
				var data = {
						recommend_name :  item['name'],
						recommend_link_list : []
					},
					count = item['list'].length, thirdIndex = 1;

				$.each(item['list'], function(j, link) {
					data.recommend_link_list.push({
						"recommend_link_name" : link['text'],
						"recommend_link_url" : link['url'],
						"ytag" : (self.ytag_base + firstIndex) * 1000 + (1000 - thirdIndex), // 热门从xx999开始递减
						"index" : firstIndex + '.' +  secondIndex + '.' + thirdIndex
					});
					thirdIndex++;
				});
				dataSource.recommend_list.push(data);
				dataSource.recommend_img_list.push({
					"recommend_img_list_html" : '<a id="hot_img' + li.attr("cateid") + '" class="hot_img" title="" hotname="I.CATEGORY.HOTIMG.'+firstIndex+'.'+secondIndex+'.1" ytag="'+ parseInt((self.ytag_base + firstIndex) * 1000 + (1000 - (thirdIndex+10)))+'"><script type="text/javascript">G.logic.header.category.showAdv(' + li.attr("cateid") + ');</script></a>'
				})
				secondIndex++;
			});

			var subPanel = li.find(".item_bd");
			subPanel.html( G.ui.template.fillWithTPL(false, dataSource, false, this.SECONDTPL));

			this.adjustPanelPos(li);
		},

		showAdv : function (cateId) {
			var siteId = G.logic.constants.getSiteId();
			if (G.logic.constants.categoryAds[cateId]) {
				G.logic.getAdItem(siteId, 'mobile-shouyefenleidaohang', G.logic.header.category.setCategoryAd);
				G.logic.header.category.curCategory = $("#hot_img" + cateId);
				G.logic.header.category.curCateId = cateId;
			}
		},

		curCategory: '',

		curCateId: '',

		setCategoryAd: function(adData) {
			var img = []
			var imgs1 = adData[G.logic.constants.categoryAds[G.logic.header.category.curCateId][0]];
			var imgs2 = adData[G.logic.constants.categoryAds[G.logic.header.category.curCateId][1]];
			var hotname, ytag;
			if(G.logic.header.category.curCategory){
				hotname = G.logic.header.category.curCategory.attr("hotname");
				ytag = G.logic.header.category.curCategory.attr("ytag");
			}
			if (imgs1) {
				var ad1;
				for (var i in imgs1) {
					ad1 = imgs1[i];
					if (ad1['img_wide'] != '') {
						img.push('<a href="' + ad1['url'] + '" hotname="'+hotname+'" ytag="'+ytag+'" target="_blank"><img src="' + ad1['img_wide'] + '" alt="' + ad1['content'] + '" title="' + ad1['content'] + '"></a>')
					}
				}
				
				
			}

			if (imgs2) {
				var ad2;
				for (var j in imgs2) {
					ad2 = imgs2[j];
					if (ad2['img_wide'] != '') {
						img.push('<a href="' + ad2['url'] + '" hotname="'+hotname+'" ytag="'+ytag+'" target="_blank"><img src="' + ad2['img_wide'] + '" alt="' + ad2['content'] + '" title="' + ad2['content'] + '"></a>')
					}
				}
			}
					
			if (G.logic.header.category.curCategory != '') {
				G.logic.header.category.curCategory.html(img.join(''));
			}
			return false;
		},

		// 调整展开层的位置
		adjustPanelPos: function(li) {
			var isIE6 = ($.browser.msie && $.browser.version == 6);
			var subPanel = li.find(".item_bd");
			isIE6 && subPanel.find(".i_cont_iframe").css({'width' : subPanel.width(), height : subPanel.height()});

			// 定位展开层位置
			var ADGESIZE = 20,
				liY = parseFloat(li.offset()['top'], 10),
				liH = parseFloat(li.outerHeight(), 10),
				panelH = parseFloat(subPanel.outerHeight(), 10),
				cateTop = parseFloat($("#category_panel").offset()['top'], 10),
				scrollY = parseFloat($(window).scrollTop(), 10),
				innerH = parseFloat($(window).height(), 10),
				panelTop = innerH - panelH - liY - ADGESIZE + scrollY; // 放到可视窗口底部

			// 对齐到分类模块顶部
			if (panelTop < cateTop - liY - 2)
				panelTop = cateTop - liY - 2;

			// 对齐到可是窗口顶部
			if (panelTop < scrollY - liY - 1)
				panelTop = scrollY - liY - 1;

			// 对齐到当前分类顶部
			if (panelTop >  -2)
				panelTop =  -2;

			// 对齐到当前分类底部
			if (panelTop < liH - panelH + 1)
				panelTop = liH - panelH + 1;

			subPanel.css({"top" : panelTop + "px"});
		},

		mousehover: function(li) {
			//$("#i_sort_list>div>div").removeClass('i_item_status_on');
			$("#i_sort_list>div>div").removeClass('item_hover');
			$("#i_sort_list>div>div .i_cont_iframe").css({display:'none'});
			//li.addClass('i_item_status_on');
			li.addClass('item_hover');
			li.find('.i_cont_iframe').css({display:''});

			if (!li.data('rendered')) {
				li.data('rendered', true);
				this.renderSecond(li);
			}
			else {
				this.adjustPanelPos(li); // 如果此二级panel已经渲染过，只调整位置
			}
		},

		//渲染分类菜单
		showPanel: function() {
			var self = this;

			self.sendRequest(function() {
				self.renderFirst();
				$("#i_sort_list>div>div").mouseenter(function() {
					var li = $(this);
					self.clearTimeout();
					self.liInTimer = setTimeout(function() {
						if ( false === li.hasClass('item_hover') ) {
							self.mousehover(li);
						}
					}, self.config.liIn);
				});
			});
		},

		sendRequest: function(callback) {
			var self = this;

			self.callbackList = self.callbackList || [];
			if ( window.CATEGORY_CONFIG === undefined ) {
				self.callbackList.push(callback);
				G.logic.constants.getWhId(function(whId) {
					// 获取版本号
					/*
					var d = new Date(),
						categoryVersion = d.getFullYear().toString() + (d.getMonth() + 1).toString() + d.getDate().toString() + d.getHours().toString();
					$.ajax({
						url			: 'http://d.'+G.domain+'/json.php?mod=ajax&act=catver&site_id=' + whId,
						dataType	: 'jsonp',
						async		: false,
						success		: function(opt) {
											if (opt && (opt.errno == 0) && opt.data) {
												categoryVersion = opt.data;
											}
										},
						cache		: false,
						crossDomain : true
					});
					*/
					// 异步请求版本号在IE6下有bug，改为5分钟更新一次版本号, categoryVersion*300是秒数
					var areaMap = ["","11","1011"];
					var areaCode = (G.util.cookie.get("areasInfo")).split("_");
					var areaType = parseInt(areaCode[0].replace(/\D/,"")) ?  parseInt(areaCode[0].replace(/\D/,"")) :0;
					var areaId = areaMap[areaType] ? areaMap[areaType] : whId; 
					var d = new Date(),
						categoryVersion = parseInt(d/(1000*60*5));
					var url = "http://st.icson.com/static_v1/js/app/categories_" + areaId + ".js?v=" + categoryVersion;
					if ( G.prefix.ssl ) {
						url = "http://st.icson.com/static_v1/js/app/categories_" + areaId + ".js?v=" + categoryVersion;
					}
					$.ajax({
						"type" : "get",
						"dataType" : "script",
						"url" : url,
						"crossDomain" : true,
						"cache" : true,
						"scriptCharset" : 'gbk',
						"success" : function() {
							while(self.callbackList.length) {
								self.callbackList.shift().call(self);
							}
						},
						"context" : self
					});
				});
			}
			else{
				callback.call(self);
			}
		},
		//显示产品分类
		init: function() {
			var self = this,
				container = $("#category_container");

			if (container.length  ===0 ) {
				return;
			}

			var needSlide = self.needSlide = !container.hasClass("i_status_on");

			needSlide && container.find(">h3:first-child").hover(function() {
				self.clearTimeout();
		 		self.headInTimer = setTimeout(function() {
		 			container.addClass('i_status_on');
		 			//$("#i_sort_list>div>div").removeClass('i_item_status_on');
		 			$("#i_sort_list>div>div").removeClass('item_hover');
					$("#i_sort_list>div>div .i_cont_iframe").css({display:'none'});
		 			self.showPanel();
		 		}, self.config.headIn);
			}, function() {
				self.clearTimeout();
				self.headOutTimer = setTimeout(function() {
					container.removeClass('i_status_on');
				}, self.config.headOut);
			});

			!needSlide && self.showPanel();
		}
	},

	openKF : function() {
		var wWidth = 504,
			wHeight = 404,
			wLeft = ($(window).width() - wWidth) / 2,
			wTop = ($(window).height() - wHeight) / 2;

		G.logic.constants.getWhId(function(whId) {
			window.open(
				G.logic.header._kefuLink[whId],
				'_blank',
				'height=' + wHeight + ',width=' + wWidth + ',toolbar=no,scrollbars=no,menubar=no,status=no,left=' + wLeft + ',top=' + wTop
			);
		});
	},

	// 顶部广告
	initTopAdvertise : function(opt, needWidth) {
		var self = this,
			arg = arguments;

		if (undefined === opt) {
			G.logic.constants.getWhId(function(whId) {
				$.ajax({
					type : "GET",
					url : 'http://' + G.DOMAIN.ACT_ICSON_COM + '/json.php?mod=topadv&act=page&jsontype=str',
					success : function(data) {
						arg.callee.call(self, data, needWidth);
					},
					dataType : 'jsonp',
					cache : true,
					crossDomain : true,
					jsonpCallback : 'loadtopadv_' + whId
				});
			});

			return;
		}

		if (!opt || $.isEmptyObject(opt) || (!opt.ssbg && !opt.bsbg))
			return;

		var link = {},
			iswidth = window.screen.availWidth >= 1280 && (needWidth !== false);

		$.each(['s', 'b'], function(index, p) {
			link[p] = opt[p + 'sbg']
						? G.ui.template.fillWithTPL(
							false,
							{
								'target' : opt[p + 'tar'],
								'background' : opt[p + (iswidth ? 'b' : 's') + 'bg'],
								'href' : opt[p + 'href']
							},
							false,
							'<a target="{target}" style="background:url({background})" href="{href}"></a>'
						)
						: '';
		})

		// only single size
		if (!link.s || !link.b) {
			var dom = $('<div class="top_banner">' + (link.s || link.b) + '</div>');

			$('.i_wrap_tooolbar').prepend(dom);

			// dom.animate({height: link.b ? '200px' : '40px'}, 200);
			dom.css('height', link.b ? '200px' : '40px');
		}
		else {
			function _onReady(whId) {
				var isOpen = false,
					mouseIn = false,
					timeout = true;

				var dom = $('<div class="top_banner">' + link.s + '</div>'), timer = null;

				$('.i_wrap_tooolbar').prepend(dom);

				var _slideDown = function() {
					dom.html(link.b);
					dom.animate({
						height : '200px'
					}, 400, function() {
						isOpen = true
					});
				}

				var _slideUp = function() {
					dom.animate({
						height : '40px'
					}, 200, function() {
						dom.html(link.s);
						isOpen = false;
					});
				}

				var siteConfig = {
					'1' : 'sh',
					'1001' : 'sz',
					"2001" : 'bj'
				};
				if (siteConfig[whId] && !G.util.cookie.get('indextopadv_' + siteConfig[whId])) {
					_slideDown();
					setTimeout(function() {
						_slideUp();
					}, 3000);
					G.util.cookie.add('indextopadv_' + siteConfig[whId], '1', '/', 36000 * 24, ''+G.domain);
				}
				else {
					dom.html(link.s).css('height', '40px');
				}
			}

			G.logic.constants.getWhId(function(whId) {
				_onReady(whId);
			});
		}
	},

	/**
	 * 初始化顶部通知。notice 属性{id, content, link, timestamp}
	 */
	initTopNotice : function() {
		$(function() {
			if (('page' in G) && ('notice' in G.page) && $.type(G.page.notice) == 'array' && G.page.notice.length > 0) {
				var notices = G.page.notice,
					html = [],
					liParts = [],
					ytagBase = 6501;
				$.each(notices, function(i, notice) {
					liParts.push('<li _notice_id="' + notice.id + '"><a ytag="0' + (ytagBase++) + '" href="' + (notice.link || 'javascript:;') + '" target="_blank">' + notice.content + '</a></li>');
				});

				if (liParts.length > 0) { // 有需要添加的新notice
					html.push('<div id="PageTopNotice" class="yx_wrap yx_wrap_notice">\
	<div class="yx_notice">\
		<div class="mod_mask"></div>\
		<div class="mod_notice">\
			<i class="dot_speak"></i>\
			<div class="notice_list">\
				<ul>');
					html.push(liParts.join(''));
					html.push('</ul>\
			</div>\
		</div>\
	</div>\
</div>');
					$(html.join('')).insertAfter($('div.yx_top_toolbar')); //添加到工具栏之后
					if (liParts.length > 1) {
						G.logic.header.asHander = setInterval('G.logic.header.autoScroll(".notice_list")',3000);
					}
				}
			}/*else {
				if (('page' in G) && ('notice' in G.page)) {
					var html = [];
					html.push('<div id="PageTopNotice" class="yx_wrap yx_wrap_notice"><div class="yx_notice yx_notice_brandhead"></div></div>');
					$(html.join('')).insertAfter($('div.yx_top_toolbar')); //添加到工具栏之后
				}
			}*/
		});
	},

	/**
	 * 初始化头部的搜索
	 */
	initDefaultSearch : function() {
		var defaultKeyManual = window.G !== undefined
										&& window.G.page !== undefined
										&& window.G.page.defaultSearch != undefined
										&& !$.isEmptyObject(G.page.defaultSearch);

		if (defaultKeyManual === false) {
			return;
		}

		var search = G.page.defaultSearch,
			title = $.trim(G.page.defaultSearch.title),
			href = $.trim(G.page.defaultSearch.href);

		if (!title || !href)
			return;

		var input = $("#q_show"),
			events = input.data("events");

		if (!events || !events.focus)
			return;

		input.data("events").focus[0].data.opt.defaultValue = title;
		G.logic.header._Q_SHOW_DEF_TEXT = title;
		input.val(title).attr("_href", href);
    var _h_t = $('#yx_slogan');
    if(_h_t.length) {
        if($('#yx_slogan').attr('ini')) {
          return;
        }
        $('#yx_slogan').attr('ini',1);
          var _h_left = '+=130';
          var _h_delay = 3000;
          var _h_start = 0;
          var _h_do = function(){
              if(_h_start == 2 || _h_start == 0) {
                  _h_left = _h_left == '+=130' ? '-=130' : '+=130';
              }
              _h_t.animate({
                  left: _h_left
              }, 1500, function(){
                  _h_left == '+=130' ? _h_start-- : _h_start++;
                  setTimeout(_h_do, _h_delay);
              });
          };
          setTimeout(_h_do, _h_delay);
    }
      if($('#top_service_num').length) {
          if($('#top_service_num').attr('ini')) {
            return;
          }
          $('#top_service_num').attr('ini',1);
          G.app.header = {};
      G.app.header.msgNum = 0;
      G.app.header.isInit = false;
      G.app.header.handleMsg = function(obj) {
          if(obj && obj.errno == 0 && obj.data) {
              if(!isNaN(parseInt(obj.data))) {
                  //价格保护
                  G.app.header.msgNum = G.app.header.msgNum + parseInt(obj.data); //通用数字
                  $('#top_service_content').append('<li>'+obj.data+'条价格保护赔付，<a target="_blank" href="'+obj.url+'">查看</a></li>');
              }else {
                  //其他消息
                  if(obj.data.length) {
                      var total = 0;
                      for(var i=0;i<obj.data.length;i++) {
                          var item = obj.data[i];
                          total = item.count + total;
                          if(item.count) {
                              $('#top_service_content').append('<li>'+item.count+'条'+item.name+'回复，<a target="_blank" href="'+item.url+'">查看</a></li>');
                          }
                      }
                      G.app.header.msgNum = G.app.header.msgNum + total;
                      if(G.app.header.msgNum) {
                          $('#top_service_num').html(G.app.header.msgNum);
                      }
                  }
              }
              if(!G.app.header.isInit && G.app.header.msgNum) {
                  G.app.header.isInit = true;
                  var tick;
                  $('#top_service_trigger').mouseenter(function() {
                      $('#top_service_layer').show();
                      clearTimeout(tick);
                      tick = setTimeout(function(){
                          $('#top_service_layer').hide();
                      },3000)

                  });
                  $('#top_service_layer').mouseenter(function() {
                      if(tick) {
                          clearTimeout(tick);
                      }
                  });
                  $('#top_service_layer').mouseleave(function() {
                      $('#top_service_layer').hide();
                  });
              }
              if(G.app.header.msgNum) {
                  $('#top_service_num').html(G.app.header.msgNum);
                  $('#top_service_num').show();
              }
          }
      }
	  G.logic.login.getLoginUser(function(o){
			if(o && o.data && $('#top_service_num').length){
			 $.ajax({
				  url : 'http://d.'+G.domain+'/json.php?mod=ajax&act=getPriceRecord&callback=G.app.header.handleMsg',
				  dataType    : 'script',
				  //crossDomain : true,
				  cache   : false,
				  scriptCharset   : 'gb2312'
			  });
			  
				$.ajax({
				  url : 'http://service.'+G.domain+'/json.php?mod=orderurge&act=getnoticemsg&callback=G.app.header.handleMsg',
				  dataType    : 'script',
				  //crossDomain : true,
				  cache   : false,
				  scriptCharset   : 'gb2312'
			  });
			}
		});
         
    }
	},

	/**
	 * 关闭顶部通知
	 */
	closeTopNotice : function() {
		var $targets = $('#PageTopNotice');

		if ($targets.length > 0) {
			G.util.localShare(function(cache) {
				var closedIds = cache.getItem('index.top_notice') || [];
				if ($.type(closedIds) == 'object') {
					var closedIdsStr = new Array();
					$.each(closedIds, function(i, closedId) {
						closedIdsStr[i] = closedId;
					});

					closedIds = closedIdsStr;
				}

				$targets.find('li').each(function(i, dom) { // 将当前关闭的notice
					// 存到前端存储
					var $dom = $(dom),
						notice_id = parseInt($dom.attr('_notice_id'));

					if (notice_id != NaN && notice_id > 0) {
						if (closedIds.length == 10) {
							closedIds.pop();
						}
						if ($.inArray(notice_id, closedIds) == -1) {
							closedIds.push(notice_id);
						}
					}
				});

				cache.setItem('index.top_notice', closedIds);
				$targets.animate({'height':0},200,function() {
					$(this).hide();
					if (G.logic.header.asHander != '')
					clearInterval(G.logic.header.asHander);
				});
			});
		}
	},

	autoScroll : function (obj) {
		$(obj).find("ul:first").animate({
			marginTop:"-24px"
		 }, 500, function() {
			 $(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
		});
	},

	asHander : '',
	
	checkProvId : function() {//判断省份与真实ip是否一致
		//1为已经选择过
		var pridCheck = G.util.cookie.get('prid_check');
		if (pridCheck != 1) {
			var _prId = '';
			$.get('http://' + G.DOMAIN.BASE_ICSON_COM + '/json.php?mod=user&act=getrealprid', function(o) {
				if (o && o.errno == 0) {
						_prId = o.prid;
				}
				
				//站点与真实ip不一致时
				
				if (G.logic.constants.serviceAreas[_prId] && G.logic.constants.serviceAreas[_prId][1] != G.logic.constants.getSiteId()) {
					var list = [];
					var ytag = 1200;
					
					var $currentPrId = G.logic.constants.getProvId();
					var pre = G.logic.constants.serviceAreas[$currentPrId][0];
					var current = G.logic.constants.serviceAreas[_prId][0];
					
					$.each(G.logic.constants.allowedWhInfo, function(w_whid, w_name) {
						var li = '<div class="storage_item"><p>' + w_name + '仓服务：</p><ul>';

						for (var i = 0;i < 31;i++) {
							var prid = G.logic.constants.serviceAreasSeq[i];
							var prInfo = G.logic.constants.serviceAreas[prid];
							if (w_whid == prInfo[1]) {
								var tosite = ($currentPrId == prid) ? '' : 'alt="前往' + prInfo[0] + '" title="前往' + prInfo[0] + '"';
								ytag++;
								li += '<li><a ytag="0' + ytag + '"' + tosite + ' href="#" ' + ' onclick="G.logic.header.changeProv(this);return false;" w="' + w_whid + '" p="' + prid +'">' + prInfo[0] + '</a></li>';
							}
						}
						li += '</ul></div>';
						list.push(li);
					});
					
					var citytips = '<div class="yx_pop_areatip">\
				        <div class="areatip_hd">\
				          <dl>\
				            <dt>请选择本次购物送至省份，以获得准确的商品信息。</dt>\
				            <dd>送至当前IP所在省份：<a ytag="01401" href="#" onclick="G.logic.header.changeProv(this);return false;" class="btn_strong" w="' + G.logic.constants.serviceAreas[_prId][1] + '" p="' + _prId +'">' + current + '</a>　上次收货省份：<a ytag="01402" href="#" onclick="G.logic.header.changeProv(this);return false;" class="btn_strong" w="' + G.logic.constants.serviceAreas[$currentPrId][1] + '" p="' + $currentPrId +'">' + pre + '</a></dd>\
				          </dl>\
				          <p class="other_select"><a href="javascript:;" hidefocus="true" onclick="if ($(\'.areatip_bd\').css(\'display\') == \'none\') {$(\'.areatip_bd\').slideDown(\'fast\');$(this).parent().addClass(\'other_select_open\');G.logic.header.dialog.resizeNoCenter({height: \'386\'});} else {$(\'.areatip_bd\').slideUp(\'fast\');$(this).parent().removeClass(\'other_select_open\');G.logic.header.dialog.resizeNoCenter({height: \'170\'});};">选择其他省份<i class="arrow"></i></a></p>\
				        </div>\
				        <div class="areatip_bd">' + list.join('') + '<p class="tip">易迅商品暂时只支持配送至中国大陆地区</p>\
						        </div>\
						      </div>\
						    </div>\
						  </div>';
					G.ui.popup._msgPopup = G.ui.popup.create({
						title	: '欢迎来到易迅网',
						width	: 500,
						height	: 170,
						fullscreen	: 1
					});
					G.logic.header.dialog = G.ui.popup.showMsg(
									'',
									1,
									function() { //okFunc
									},
									function() { //closeFunc
										G.logic.header.closeCheckProvId();
									},
									function() { //cancelFunc
									},
									"",
									""
							);
					$('.layer_global_cont').html(citytips);
					$('.layer_global_cont').removeClass('layer_cont_15');
				}

			}, 'jsonp');
		}
	},

	dialog : '',
	
	closeCheckProvId : function() {//关闭选择
		$('#positionFixedID0').hide();
		G.util.cookie.add('prid_check', 1, '/', 7 * 24 * 3600, '.'+G.domain);
	},
	
	setProvId : function(prid) {//设置省份
		var whid = G.logic.constants.serviceAreas[prid][0];
		G.logic.header.switchSite(whid, prid);
		G.logic.constants.setLocationId(G.logic.constants.serviceAreas[prid][2] + '_' + prid);
	},
	
	changeProv : function(obj) {//切换省份
		if (!G.logic.constants.serviceAreas[$(obj).attr('p')]) {
			return;
		} else {
			if ($(obj).attr('p') != G.logic.constants.getProvId()) {
				G.logic.header.switchSite($(obj).attr('w'), $(obj).attr('p'));
				G.logic.constants.setLocationId(G.logic.constants.serviceAreas[$(obj).attr('p')][2] + '_' + $(obj).attr('p'));
			} else {
				G.logic.header.dialog.close();
			}
		}
		G.logic.header.closeCheckProvId();
	}
	
	
}; 
logStat = {
	//获取点击事件的log数据
	getLog:function(e){
		var srcEls = e.target,chkEls,elsPos,tempNode,tempStr,tempFlag;
		//获取点击事件Log来源元素（在来源元素中检查是否有自定义属性"lg"，有则说明是需上报的元素）
		if (srcEls.getAttribute("lg")){
			tempNode = srcEls;
		}else if (srcEls.parentNode && srcEls.parentNode.tagName == "A" && srcEls.parentNode.getAttribute("lg")){
			tempNode = srcEls.parentNode;
		}
		if (tempNode){
			tempStr = tempNode.getAttribute("lg");				//获取log值
			tempStr = tempStr + (tempNode.getAttribute("pos") ? "{|}" + tempNode.getAttribute("pos"):"{|}1");	//获取二级log值的
			
			//如果是连接，则获取当前点击连接url，否则依次尝试获取元素的title、alt、(id|name|tagName)、innerText
			if (tempNode.getAttribute("href") && tempNode.getAttribute("href").indexOf("#") == -1){
				tempStr = tempStr + "{|}" + escape(tempNode.getAttribute("href"));
			}else{
				if (tempNode.getAttribute("title")){
					tempStr = tempStr + "{|}" + tempNode.getAttribute("title");
				}else if (tempNode.getAttribute("alt")){
					tempStr = tempStr + "{|}" + tempNode.getAttribute("alt");
				}else{
					if (tempNode.tagName == "INPUT" || tempNode.tagName == "BUTTON" || tempNode.innerText == ""){
						tempFlag = (tempNode.id)?tempNode.id:tempNode.name;
						tempFlag = (tempFlag)?tempFlag:tempNode.tagName;
						tempStr = tempStr + "{|}" + tempFlag;
					}else{
						tempStr = tempStr + "{|}" + tempNode.innerText;
					}
				}
			}
			//此处逻辑防止在的网速或响应速度慢时上报统计请求被abort
			if (tempNode.getAttribute("lgType")){
				tempStr = tempNode.getAttribute("lgType") + "{|}" + tempStr;	//如果点击元素有自定义数据lgType则打上自定义标识lgType
			}else if ( tempNode.getAttribute("target") === "_blank"){
				tempStr = "0{|}" + tempStr;		//否则打上标识0
			}else{
				tempStr = "1{|}" + tempStr;		//如果点击元素有连接并且不是新开窗口打开则打上标识1
			}
			G.logic.constants.getWhId(function(whId){
				var site_config = {
					'1' : 4,
					"1001" : 10,
					"2001" : 13,
					"3001" : 42,
					"4001" : 43,//重庆
					"5001" : 44//西安
				};
				
				whId = site_config[whId] ? site_config[whId] : 4;
				
				logStat.chkLog(whId + "{|}" + tempStr);				//发送上报统计请求
			});
		}
	},
	//发送log统计请求(对于非点击类型可构建log字符串后直接调用此方法)
	chkLog:function(str){
		var chkUrl = "http://search.paipai.com/cgi-bin/clicklog",tempStr;
		//获取visitkey（用户前端唯一标识，长效cookie，越长越好，paipai设到2099年），uin（没有会返回空或null），refUrl(当前页面url)
		var visitkey = G.util.cookie.get("visitkey"),uin = G.util.cookie.get("uid"),refUrl = escape(document.URL);
		tempStr = str.split("{|}");
		if (tempStr[2] == 3000) {
			G.logic.constants.getWhId(function(whId){
				var site_config = {
					'1' : 4,
					"1001" : 10,
					"2001" : 13,
					"3001" : 42,
					"4001" : 43,//重庆
					"5001" : 44//西安
				};
				
				whId = site_config[whId] ? site_config[whId] : 4;
				chkUrl = chkUrl + "?srcid=" + whId + "&uin=" + tempStr[5] + "&ls=" + tempStr[2] + "&subls=" + tempStr[3] + "&visitKey=" + visitkey + "&ref=" + refUrl + "&herf=" + tempStr[4];
				logStat.loadScript(chkUrl + "&t=" + (new Date()).getTime(),"chkStatScript");
			});
		} else {
			if (tempStr[2]){
				chkUrl = chkUrl + "?srcid=" + tempStr[0] + "&uin=" + uin + "&ls=" + tempStr[2] + "&subls=" + tempStr[3] + "&visitKey=" + visitkey + "&ref=" + refUrl + "&herf=" + tempStr[4];
				if (tempStr[1] == "1"){					//在当前窗口跳转，打上临时cookie，在跳转后判断是否有临时Cookie:"lgStat",如果有则发起异步统计请求并清空临时cookie
					G.util.cookie.add("lgStat",chkUrl,'/', 0, '.'+G.domain);
				}else{			
					//否则如果是新开窗口或页面交互点击，则直接发起异步统计请求
					logStat.loadScript(chkUrl + "&t=" + (new Date()).getTime(),"chkStatScript");
				}
			}
		}
		
	},
	//详情点击log统计（传参：index=点击位置；commid=商品id；leadclassid=商品页子类目）
	chkItem:function(index,commid,leadclassid, im){
		G.logic.constants.getWhId(function(whId){
			var site_config = {
				'1' : 4,
				"1001" : 10,
				"2001" : 13,
				"3001" : 42,
				"4001" : 43,//重庆
				"5001" : 44//西安
			};
			var searchlogURL = "http://search.paipai.com/cgi-bin/search_log?srcid=" + site_config[whId] + "&";
			var visitkey = G.util.cookie.get("visitkey"), dom = $("#q_show"), keyword = '';
			
			if(dom.length > 0 ){
				keyword = dom.val();
				keyword  =  keyword === "输入品牌或商品进行搜索" ? '' : keyword;
			}
			
			var uin = G.util.cookie.get("uid");
			var ref = document.URL;
			var tempUrl = searchlogURL + "pos=" + index + "&visitkey=" + visitkey + "&uin=" + uin + "&ref="+ escape(ref) + "&commid=" + commid +"&leafclassid="+ ( leadclassid || '' ) +"&keyword=" + keyword +"&t=" + (new Date).getTime();
			
			if(im === undefined){
				G.util.cookie.add("lgStat", tempUrl, '/', 0, '.'+G.domain);
			}
			else{
				logStat.loadScript(tempUrl);
			}
		});
	},
	//初始化统计上报
	initStat:function(o){
		if (o){for (var name in o){this[name] = o[name]}}
		
		
		$(document).bind('click', logStat.getLog);

		//如果cookie中有统计上报请求，则页面渲染后发送该请求并清空该请求
		var val = G.util.cookie.get('lgStat');
		if (val){
			setTimeout(function(){logStat.loadScript( val + "?t=" + (new Date).getTime());G.util.cookie.del('lgStat', '.'+G.domain)},0);
		}
	},
	loadScript : function(url,id,obj){
		//创建一个script并加载script
		//参数：id:'放置script的id',url:'载入的地址'
		setTimeout(function(){
			var s = document.createElement("script"),
				time=new Date().getTime(),
				o=obj||{},			
				charset=o.charset|| "gb2312";
			id= id?(id+time):time,
			url=url;
			s.charset=charset;
			s.id = id;
			document.getElementsByTagName("head")[0].appendChild(s);
			s.src = url;
			return s;
		},0);
	}
};

//innerText兼容处理
if (!$.browser.msie){
	HTMLElement.prototype.__defineGetter__("innerText",
		function(){
			var tempStr = "";
			var tempNode = this.childNodes;
			for(var i=0; i<tempNode.length; i++) {
				if(tempNode[i].nodeType==1){
					tempStr += tempNode[i].innerText;
				}else if(tempNode[i].nodeType==3){
					tempStr += tempNode[i].nodeValue;
				}
			}
			return tempStr;
		}
	);
}

/*************************

调用，直接在页面底部执行:logStat.initStat()

非点击类或阻塞式的统计调用方式（如mouseover）：在该实现函数中调用chkLog函数
如：

	if (typeof(els) == "object" && (els.getAttribute("attr") || els.getAttribute("uin"))){
		goodMsgFloat["initGoodMsg"](els);				//mouseover调用函数
		var tempStr = "4{|}0{|}5027{|}1{|}鼠标移入促销按钮";
		logStat.chkStat(tempStr);
	}


20101213 log修改：
1） 商品列表中的大图和商品标题点击增加详情log点击，添加方法为:在大图和商品标题的跳转连接（<a>标签）中添加:onclick="logStat.chkItem(商品循环展示索引,商品id,类目id)"；
2） 商品列表中的大图和商品标题点击pos由原来固定为"1"修改成按商品循环展示的index赋值；
3） 商品列表中评论的点击pos由原来固定为"1"修改成按商品循环展示的index赋值；
4） 商品列表中加入购物车按钮增加点击pos，按商品循环展示的index赋值；
5） 分类点击(1001)只统计到第一次从搜索框搜索后的分类，再次点击分类后展示的产品分类遗漏添加:lg="1001"
**************************/
 
G.logic.getAdItem = function(site_id, channel_id, beforeFunc, afterFunc) {
	G.logic.getAdItem.options = G.logic.getAdItem.options || { beforeFunc : {}, afterFunc : {} };
	var key = site_id + "_" + channel_id;
	if(beforeFunc && $.isFunction(beforeFunc)) {
		G.logic.getAdItem.options.beforeFunc[key] = beforeFunc;
	}
	if(afterFunc && $.isFunction(afterFunc)) {
		G.logic.getAdItem.options.afterFunc[key] = afterFunc;
	}
  //$.getScript('http://d.icson.com/ad/' + key + '.js?' + new Date().getTime());
  $.ajax({
    url : 'http://d.icson.com/ad/' + key + '.js',
    dataType    : 'script',
    cache   : false,
    scriptCharset   : 'gb2312'
  });
}

G.logic.getAdItem.dealAd = function(ad_data, site_id, channel_id) {
	var key = site_id + "_" + channel_id;
	if(G.logic.getAdItem.options.beforeFunc[key]) {
		if (G.logic.getAdItem.options.beforeFunc[key](ad_data) === false) {
			return;
		}
	}
	var isWide = (window.screen.availWidth >= 1280) ? 1 : 0;
	$("div[ad_id]").each(function() {
		var node = $(this);
		var pid = node.attr("ad_id");
		if(!ad_data[pid]) {
			return;
		}
		var tpl = '';
		node.html().replace(/<!--\s*((?:.|\s)+?)\s*-->/, function() {
			tpl = arguments[1];
		});
		var html = '';
		var index = 0;
		for(var i in ad_data[pid]) {
			var ad = ad_data[pid][i];
    		var data = {
    			'url' : ad['url'],
    			'img' : (isWide || !ad['img_narrow']) ? ad['img_wide'] : ad['img_narrow'],
    			'width' : (isWide || !ad['img_narrow']) ? ad['w_width'] : ad['n_width'],
    			'height' : (isWide || !ad['img_narrow']) ? ad['w_height'] : ad['n_height'],
    			'text' : ad['content'],
    			'index' : ++index
    		}; 
    		html += tpl.replace(/{(url|img|text|index|width|height)}/g, function() {
    			return data[arguments[1]];
    		});
		}
		node.replaceWith(html);
	});
    if(G.logic.getAdItem.options.afterFunc[key]) {
		G.logic.getAdItem.options.afterFunc[key](ad_data);
	}
}

 
G.logic.productpool = {
	load : function(site_id, channel_id, beforeFunc, afterFunc) {
		$.ajax({
			'url' : "http://d.icson.com/productpool/" + site_id + "_" + channel_id + ".js?v=" + new Date().getTime(),
			'dataType' : 'script',
			'success' : function() {
				if($.isFunction(beforeFunc)) {
					if(beforeFunc(G.logic.productpool.data) === false)
						return;
				}
				G.logic.productpool._parse();
				if($.isFunction(afterFunc)) {
					afterFunc(G.logic.productpool.data);
				}
			},
			'error' : function() {
				G.logic.productpool.data = {};
				G.logic.productpool._parse();
			}
		});
	},
	
	_parse : function() {
		$("div[pp_id]").each(function() {
			var node = $(this);
			var pid = node.attr("pp_id");
			if(!G.logic.productpool.data[pid]) {
				return;
			}
			var tpl = '';
			node.html().replace(/<!--\s*((?:.|\s)+?)\s*-->/, function() {
				tpl = arguments[1];
			});
			var html = '';
			var index = 0;
			for(var i in G.logic.productpool.data[pid]['products']) {
				var product = G.logic.productpool.data[pid]['products'][i];
				var sell_points = product['selling_point'].split(";");
	    		while(sell_points.length < 4) {
	    			sell_points.push('');
	    		}
	    		var data = {
	    			'index' : ++index,
	    			'name' : product['name'],
	    			'desc' : product['description'],
	    			'img' : product['pic_url'],
	    			'url' : product['link'],
	    			'text' : product['text'],
	    			'price' : product['icson_price'],
	    			'cur_price' : product['promotional_price'] || '',
	    			'sell_point1' : sell_points[0],
	    			'sell_point2' : sell_points[1],
	    			'sell_point3' : sell_points[2],
	    			'sell_point4' : sell_points[3]
	    		};
	    		var symbols = '';
	    		for(var s in data) {
	    			if(symbols == '')
	    				symbols = s;
	    			else
	    				symbols += '|' + s;
	    		}
	    		html += tpl.replace(new RegExp("{(" + symbols + ")}", "g"), function() {
	    			return data[arguments[1]];
	    		});
			}
			node.replaceWith(html);
		});
	}
}; 
/*  |xGv00|4c8448a1915343b6b27ae31241134b1c */