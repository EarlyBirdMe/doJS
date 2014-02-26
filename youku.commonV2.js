(function(window) {
// Use the correct document accordingly with window argument (sandbox)
var document = window.document,
	documentElement = document.documentElement || document.body,
	navigator = window.navigator,
	location = window.location;

YKUC = window.YKUC || (function() {

	var o;
	function unit() {
		var b = {}, a;
		b.u = function (j, h) {
			var g = { it: b, sup: b[h] };
			return function () {
				j.apply(g, arguments);
				return b;
			}
		};
		return b;
	}

	function get_style(elm, rule_name){
		var strValue = "";
		if(document.defaultView && document.defaultView.getComputedStyle){
			strValue = document.defaultView.getComputedStyle(elm, "").getPropertyValue(rule_name);
		}
		else if(elm.currentStyle){
			rule_name = rule_name.replace(/\-(\w)/g, function (strMatch, p1){
				return p1.toUpperCase();
			});
			strValue = elm.currentStyle[rule_name];
		}
		return strValue;
	}

	function parse_color(c) {
		var ret={}, i;
		if(!c) return {str: 'transparent', rgb: []};
		if((i = c.indexOf('rgb')) >= 0) {
			ret.val = c.substr(i+1).substr(0, c.length-2-i).split(',').map(function(e) {return parseInt(e.strip())});
			ret.str = '#'+ret.val.map(function(e) {return parseInt(e).toString(16).toUpperCase()}).join('');
		} else if((i = c.indexOf('#')) >= 0) {
			if(c.length == 7) {
				ret.str = c;
				ret.val = [c.substr(1, 2), c.substr(2, 2), c.substr(5, 2)].map(function(e) {return parsetInt(e, 16);});
			}
		}
		return ret;
	}

	function toggle(e) {
		if(!e || typeof e !== 'object') error('toggle: argument must be a Dom object!');
		if(get_style(e, 'display') != 'none')
			e.style.display = 'none';
		else
			e.style.display = 'block';
	}

	function $C(elementName) {
		return Element.extend(document.createElement(elementName));
	}

	function is_empty_obj( obj ) {
		for ( var name in obj ) {
			return false;
		}
		return true;
	}

	function error(msg) {
		throw new Error(msg);
	}

	function click(elm, right, double) {
		var type = double? 'dbclick' : 'click',
			button = right? 1 : 0,
			evt;
		elm = $(elm);
		if (document.createEvent) {
		  evt = document.createEvent('MouseEvent');
		  evt.initMouseEvent(type, true, true, window,
			0, 0, 0, 0, 0, false, false, false, false,
			button, null);
		  elm.dispatchEvent(evt);
		} else {
		  evt = document.createEventObject();
		  evt.button = button;
		  elm.fireEvent('on'+type, evt);
		}
		return elm;
	}

	function get_selection(e)
	{
		var e = e || null;
		//Mozilla and DOM 3.0
		if('selectionStart' in e) {
			var l = e.selectionEnd - e.selectionStart;
			return { start: e.selectionStart, end: e.selectionEnd, length: l, text: e.value.substr(e.selectionStart, l) };
		} else if(document.selection) { //IE
			e.focus();
			var r = document.selection.createRange();
			var tr = e.createTextRange();
			var tr2 = tr.duplicate();
			tr2.moveToBookmark(r.getBookmark());
			tr.setEndPoint('EndToStart',tr2);
			if (r == null || tr == null) return { start: e.value.length, end: e.value.length, length: 0, text: '' };
			var text_part = r.text.replace(/[\r\n]/g,'.'); //for some reason IE doesn't always count the \n and \r in the length
			var text_whole = e.value.replace(/[\r\n]/g,'.');
			var the_start = text_whole.indexOf(text_part,tr.text.length);
			return { start: the_start, end: the_start + text_part.length, length: text_part.length, text: r.text };
		} else return { start: e.value.length, end: e.value.length, length: 0, text: ''}; //Browser not supported
	}

	function replace_selection(e,replace_str,selection)
	{
		var e = e || null;
		selection = selection || get_selection(e);
		var start_pos = selection.start;
		var end_pos = start_pos + replace_str.length;
		e.value = e.value.substr(0, start_pos) + replace_str + e.value.substr(selection.end, e.value.length);
		set_selection(the_id,start_pos,end_pos);
		return {start: start_pos, end: end_pos, length: replace_str.length, text: replace_str};
	}

	function set_selection(e,start_pos,end_pos)
	{
		var e = e || null;

		if('selectionStart' in e)
		{ //Mozilla and DOM 3.0
			e.focus();
			e.selectionStart = start_pos;
			e.selectionEnd = end_pos;
		} else if(document.selection) { //IE
			e.focus();
			var tr = e.createTextRange();

			//Fix IE from counting the newline characters as two seperate characters
			var stop_it = start_pos;
			for (var i=0; i < stop_it; i++) if( e.value.charAt(i).search(/[\r\n]/) != -1 ) start_pos = start_pos - .5;
			stop_it = end_pos;
			for (var i=0; i < stop_it; i++) if( e.value.charAt(i).search(/[\r\n]/) != -1 ) end_pos = end_pos - .5;

			tr.moveEnd('textedit',-1);
			tr.moveStart('character',start_pos);
			tr.moveEnd('character',end_pos - start_pos);
			tr.select();
		}
		return get_selection(e);
	}

	function U16_8(_1) {
		var i, len, c;
		var ary = [];
		len = _1.length;
		for (i = 0; i < len; i++) {
			c = _1.charCodeAt(i);
			if ((c >= 0x0001) && (c <= 0x007F)) {
				ary.push(_1.charAt(i));
			} else if (c > 0x07FF) {
				ary.push(String.fromCharCode(0xE0 | ((c >> 12) & 0x0F)));
				ary.push(String.fromCharCode(0x80 | ((c >> 6) & 0x3F)));
				ary.push(String.fromCharCode(0x80 | ((c >> 0) & 0x3F)));
			} else {
				ary.push(String.fromCharCode(0xC0 | ((c >> 6) & 0x1F)));
				ary.push(String.fromCharCode(0x80 | ((c >> 0) & 0x3F)));
			}
		}
		return ary.join('');
	}
	function U8_16(_1) {
		var i, len, c;
		var char2, char3;
		var ary = [];
		len = _1.length;
		i = 0;
		while (i < len) {
			c = _1.charCodeAt(i++);
			switch (c >> 4) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
				// 0xxxxxxx
				ary.push(_1.charAt(i - 1));
				break;
			case 12:
			case 13:
				// 110x xxxx   10xx xxxx
				char2 = _1.charCodeAt(i++);
				ary.push(String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F)));
				break;
			case 14:
				// 1110 xxxx 10xx xxxx 10xx xxxx
				char2 = _1.charCodeAt(i++);
				char3 = _1.charCodeAt(i++);
				ary.push(String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0)));
				break;
			}
		}
		return ary.join('');
	}

	var _2 = "ABCDEFGHIJKLMNOP" +
			 "QRSTUVWXYZabcdef" +
			 "ghijklmnopqrstuv" +
			 "wxyz0123456789+/" +
			 "=";

	function decode64(_1) {
		if(!_1) return '';
		var _3 = "";
		var _4, _5, _6;
		var _7, _8, _9, _a;
		var i = 0;
		_1 = _1.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		do {
			_7 = _2.indexOf(_1.charAt(i++));
			_8 = _2.indexOf(_1.charAt(i++));
			_9 = _2.indexOf(_1.charAt(i++));
			_a = _2.indexOf(_1.charAt(i++));
			_4 = (_7 << 2) | (_8 >> 4);
			_5 = ((_8 & 15) << 4) | (_9 >> 2);
			_6 = ((_9 & 3) << 6) | _a;
			_3 = _3 + String.fromCharCode(_4);
			if (_9 != 64) {
				_3 = _3 + String.fromCharCode(_5);
			}
			if (_a != 64) {
				_3 = _3 + String.fromCharCode(_6);
			}
		} while (i < _1.length);
		return U8_16(_3);
	}
	function encode64(input) {
		input = U16_8(input);
	   var output = "";
	   var chr1, chr2, chr3 = "";
	   var enc1, enc2, enc3, enc4 = "";
	   var i = 0;

	   do {
		  chr1 = input.charCodeAt(i++);
		  chr2 = input.charCodeAt(i++);
		  chr3 = input.charCodeAt(i++);

		  enc1 = chr1 >> 2;
		  enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		  enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		  enc4 = chr3 & 63;

		  if (isNaN(chr2)) {
			 enc3 = enc4 = 64;
		  } else if (isNaN(chr3)) {
			 enc4 = 64;
		  }

		  output = output +
			 _2.charAt(enc1) +
			 _2.charAt(enc2) +
			 _2.charAt(enc3) +
			 _2.charAt(enc4);
		  chr1 = chr2 = chr3 = "";
		  enc1 = enc2 = enc3 = enc4 = "";
	   } while (i < input.length);

	   return output;
	}

	function num_pad(num, len) {
		if(isNaN(num) || !len || isNaN(len)) return;
		var str = num+'';
		while(str.length < len) {
			str = '0'+str;
		}
		return str;
	}

  function getOffsetParent(element) {
    if (element == document.body) return $(element);

    while ((element = element.parentNode) && element != document.body)
      if (Element.getStyle(element, 'position') != 'static')
        return $(element);

    return $(document.body);
  }

	return {
		unit: unit,
		$C: $C,
		get_style: get_style,
		parse_color: parse_color,
		toggle: toggle,
		error: error,
		click: click,
		is_empty_obj: is_empty_obj,
		get_selection: get_selection,
		replace_selection: replace_selection,
		getOffsetParent: getOffsetParent,
		set_selection: set_selection,
		encode64: encode64,
		decode64: decode64,
		num_pad: num_pad
	};
})();

(function(o) {
	function range(btn, bar, opt) {
		var that;
		btn = (typeof btn == 'string') ? $(btn) : btn;
		bar = (typeof bar == 'string') ? $(bar) : bar;
		if(!bar || !btn) return;
		if(this instanceof arguments.callee) that = this;
		else that = {};
		opt = opt || {};
		opt.step = opt.step || 10;
		opt.max = opt.max || 100;
		opt.min = opt.min || 0;
		opt.ret = opt.ret || null;
		opt.step_func = (typeof opt.step_func == 'function')? opt.step_func : null;
		opt.ret = (typeof opt.ret == 'string')? $(opt.ret) : btn;
		that.btn = btn; that.bar = bar; that.opt = opt;
		that.drag_start = drag_start.bindAsEventListener(that);
		that.drag_step = drag_step.bindAsEventListener(that);
		that.drag_end = drag_end.bindAsEventListener(that);
		that.prevent_select = prevent_select.bindAsEventListener(that);
		Event.observe(bar, 'mousedown', that.drag_start);
		Event.observe(btn, 'mousedown', that.drag_start);
		Event.observe(bar, 'dragstart', function(evt) {Event.stop(evt)});
		return that;
	}
	function drag_start(evt) {
		this._pos_x = Event.pointerX(evt);
		this._off_x = this._pos_x - this.bar.cumulativeOffset().left;
		this.btn.style.left = this._off_x + 'px';
		this._off_max = this._off_max || this.bar.getWidth();
		Event.observe(document, 'mousemove', this.drag_step);
		Event.observe(document, 'mouseup', this.drag_end);
		Event.observe(document, 'selectstart', this.prevent_select);
		document.onmousedown = function() {return false};
		calc_percent.apply(this, [this._off_x]);
	}
	function drag_step(evt) {
		var x = Event.pointerX(evt),
			delta = this._pos_x - x,
			_off_x = this._off_x - delta;
		_off_x = _off_x < 0? 0 : _off_x > this._off_max? this._off_max : _off_x;
		this.btn.style.left = _off_x + 'px';
		calc_percent.apply(this, [_off_x]);
		Event.stop(evt);
	}
	function calc_percent(_off_x) {
		this.percent = Math.ceil(_off_x * (100 / this.opt.step) / this._off_max)*this.opt.step;
		if(typeof this.opt.ret == 'object' && 'update' in this.opt.ret)
			this.opt.ret.update(this.percent + '%');
		if(this.opt.step_func) {
			if(this.step_timeout) {
				clearTimeout(this.step_timeout);
				this.step_timeout = null;
			}
			this.step_timeout = setTimeout(function(){(this.opt.step_func)(this.percent)}.bind(this), 100);
		}
	}
	function drag_end(evt) {
		Event.stopObserving(document, 'mousemove', this.drag_step);
		Event.stopObserving(document, 'mouseup', this.drag_end);
		Event.stopObserving(document, 'selectstart', this.prevent_select);
		document.onmousedown = function() {return true};
	}
	function prevent_select(evt) {
		Event.stop(evt);
	}
	o.range = range;
})(YKUC);

(function(o) {
	var toString = Object.prototype.toString;
	var class2type = [];
	$A("Boolean Number String Function Array Date RegExp Object".split(" ")).each(function(name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});
	o.type = function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ toString.call(obj) ] || "object";
	},
	o.isFunction = function( obj ) {
		return o.type(obj) === "function";
	},

	o.isArray = Array.isArray || function( obj ) {
		return o.type(obj) === "array";
	},

	// A crude way of determining if an object is a window
	o.isWindow = function( obj ) {
		return obj && typeof obj === "object" && "setInterval" in obj;
	},

	o.isNaN = function( obj ) {
		return obj == null || !rdigit.test( obj ) || isNaN( obj );
	}

	o.isPlainObject = function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || o.type(obj) !== "object" || obj.nodeType || o.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
			!hasOwn.call(obj, "constructor") &&
			!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	o.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !o.isFunction(target) ) {
			target = {};
		}

		// extend jQuery itself if only one argument is passed
		if ( length === i ) {
			target = this;
			--i;
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( o.isPlainObject(copy) || (copyIsArray = o.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && o.isArray(src) ? src : [];

						} else {
							clone = src && o.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	}

	var div = document.createElement( "div" ),
		documentElement = document.documentElement,
		all,
		a,
		select,
		opt,
		input,
		marginDiv,
		support,
		fragment,
		body,
		testElementParent,
		testElement,
		testElementStyle,
		tds,
		events,
		eventName,
		i,
		isSupported;

	// Preliminary tests
	div.setAttribute("className", "t");
	div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";

	all = div.getElementsByTagName( "*" );
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return {};
	}

	// First batch of supports tests
	select = document.createElement( "select" );
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName( "input" )[ 0 ];

	support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName( "tbody" ).length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName( "link" ).length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: ( a.getAttribute( "href" ) === "/a" ),

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.55$/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: ( input.value === "on" ),

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// Will be defined later
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", function() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent( "onclick" );
	}

	// Check if a radio maintains it's value
	// after being appended to the DOM
	input = document.createElement("input");
	input.value = "t";
	input.setAttribute("type", "radio");
	support.radioValue = input.value === "t";

	input.setAttribute("checked", "checked");
	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.firstChild );

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	div.innerHTML = "";

	// Figure out if the W3C box model works as expected
	div.style.width = div.style.paddingLeft = "1px";

	body = document.getElementsByTagName( "body" )[ 0 ];
	// We use our own, invisible, body unless the body is already present
	// in which case we use a div (#9239)
	testElement = document.createElement( body ? "div" : "body" );
	testElementStyle = {
		visibility: "hidden",
		width: 0,
		height: 0,
		border: 0,
		margin: 0
	};
	if ( body ) {
		o.extend( testElementStyle, {
			position: "absolute",
			left: -1000,
			top: -1000
		});
	}
	for ( i in testElementStyle ) {
		testElement.style[ i ] = testElementStyle[ i ];
	}
	testElement.appendChild( div );
	testElementParent = body || documentElement;
	testElementParent.insertBefore( testElement, testElementParent.firstChild );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	support.boxModel = div.offsetWidth === 2;

	if ( "zoom" in div.style ) {
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		// (IE < 8 does this)
		div.style.display = "inline";
		div.style.zoom = 1;
		support.inlineBlockNeedsLayout = ( div.offsetWidth === 2 );

		// Check if elements with layout shrink-wrap their children
		// (IE 6 does this)
		div.style.display = "";
		div.innerHTML = "<div style='width:4px;'></div>";
		support.shrinkWrapBlocks = ( div.offsetWidth !== 2 );
	}

	div.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
	tds = div.getElementsByTagName( "td" );

	// Check if table cells still have offsetWidth/Height when they are set
	// to display:none and there are still other visible table cells in a
	// table row; if so, offsetWidth/Height are not reliable for use when
	// determining if an element has been hidden directly using
	// display:none (it is still safe to use offsets if a parent element is
	// hidden; don safety goggles and see bug #4512 for more information).
	// (only IE 8 fails this test)
	isSupported = ( tds[ 0 ].offsetHeight === 0 );

	tds[ 0 ].style.display = "";
	tds[ 1 ].style.display = "none";

	// Check if empty table cells still have offsetWidth/Height
	// (IE < 8 fail this test)
	support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );
	div.innerHTML = "";

	// Check if div with explicit width and no margin-right incorrectly
	// gets computed margin-right based on width of container. For more
	// info see bug #3333
	// Fails in WebKit before Feb 2011 nightlies
	// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
	if ( document.defaultView && document.defaultView.getComputedStyle ) {
		marginDiv = document.createElement( "div" );
		marginDiv.style.width = "0";
		marginDiv.style.marginRight = "0";
		div.appendChild( marginDiv );
		support.reliableMarginRight =
			( parseInt( ( document.defaultView.getComputedStyle( marginDiv, null ) || { marginRight: 0 } ).marginRight, 10 ) || 0 ) === 0;
	}

	// Remove the body element we added
	testElement.innerHTML = "";
	testElementParent.removeChild( testElement );

	// Technique from Juriy Zaytsev
	// http://thinkweb2.com/projects/prototype/detecting-event-support-without-browser-sniffing/
	// We only care about the case where non-standard event systems
	// are used, namely in IE. Short-circuiting here helps us to
	// avoid an eval call (in setAttribute) which can cause CSP
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	if ( div.attachEvent ) {
		for( i in {
			submit: 1,
			change: 1,
			focusin: 1
		} ) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	// Null connected elements to avoid leaks in IE
	testElement = fragment = select = opt = body = marginDiv = div = input = null;

	o.support = support;

})(YKUC);

(function(o) {

var elemdisplay = {},
	iframe, iframeDoc,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
	timerId,
	fxAttrs = [
		// height animations
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		// width animations
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		// opacity animations
		[ "opacity" ]
	],
	fxNow,
	requestAnimationFrame = window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame;
	var cssNumber = {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	};
	var camelCase = function( string ) {
		return string.replace("/-([a-z])/ig", fcamelCase );
	}
	var fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	}

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout( clearFxNow, 0 );
	return ( fxNow = (new Date()).getTime() );
}

function clearFxNow() {
	fxNow = undefined;
}

function genFx( type, num ) {
	var obj = {};

	$A(fxAttrs.concat.apply([], fxAttrs.slice(0,num))).each(function(name) {
		obj[name] = type;
	});

	return obj;
}
	o.genFx = genFx;


	function isHidden(dom) {
		if(!dom || !dom.nodeType || dom.nodeType !== 1) return false;
		var dim, display, parent, overflow, position;
		display = dom.getStyle('display');
		if(display === 'none') return true;
		dim = dom.getDimensions();
		if(dim.height === 0 && dim.width === 0) return true;
		overflow = dom.getStyle('overflow');
		if(dim.height === 0 || dim.width === 0 && overflow == 'hidden') return true;
		if(dim.type && dim.type == 'hidden') return true;
		var position = dom.getStyle('position');
		if(position && (position != 'static' || position != 'auto')) {
			return false;
		}
		parent = dom.up();
		if(isHidden(parent)) return true;
		return false;
	}
	o.isHidden = isHidden;

	var mElm;

	mElm = function(elm) {
		return new mElm.fn.init(elm);
	}

	mElm.fn = mElm.prototype = {
		constructor: mElm,
		init: function(elm) {
			if(typeof(elm) == 'string') {
				elm = $$(elm);
			} else if(o.isFunction(elm)) {
				elm = elm.call();
			}

			if(!elm && !o.isArray(elm)) return ;
			this.e = o.isArray(elm)? elm : [elm];
		}
	};

	mElm.fn.init.prototype = mElm.fn;
	o.extend(mElm.fn, {
		ani: function(prop, speed, easing, callback) {
			var optall = this.speed(speed, easing, callback);
			//TODO: temporarily not support queue
			//return this[ optall.queue === false ? "each" : "queue" ]
				// XXX 'this' does not always have a nodeName when running the
				// test suite
			return this.each(function() {

				var opt = o.extend( {}, optall ),
					isElement = this.nodeType === 1,
					hidden = isElement && isHidden(this),
					name, val, p,
					display, e,
					parts, start, end, unit, style;

				// will store per property easing and be used to determine when an animation is complete
				opt.animatedProperties = {};

				for ( p in prop ) {

					// property name normalization
					name = camelCase( p );
					if ( p !== name ) {
						prop[ name ] = prop[ p ];
						delete prop[ p ];
					}

					val = prop[ name ];

					// easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)
					if ( o.isArray( val ) ) {
						opt.animatedProperties[ name ] = val[ 1 ];
						val = prop[ name ] = val[ 0 ];
					} else {
						opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';
					}

					if ( val === "hide" && hidden || val === "show" && !hidden ) {
						return opt.complete.call( this );
					}

					if ( isElement && ( name === "height" || name === "width" ) ) {
						// Make sure that nothing sneaks out
						// Record all 3 overflow attributes because IE does not
						// change the overflow attribute when overflowX and
						// overflowY are set to the same value
						opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

						// Set display property to inline-block for height/width
						// animations on inline elements that are having width/height
						// animated
						if ( this.getStyle('display') === 'inline' &&
								 this.getStyle('float') === 'none' ) {
							if ( !o.support.inlineBlockNeedsLayout ) {
								this.style.display = "inline-block";

							} else {
								display = defaultDisplay( this.nodeName );

								// inline-level elements accept inline-block;
								// block-level elements need to be inline with layout
								if ( display === "inline" ) {
									this.style.display = "inline-block";

								} else {
									this.style.display = "inline";
									this.style.zoom = 1;
								}
							}
						}
					}
				}

				if ( opt.overflow != null ) {
					this.style.overflow = "hidden";
				}

				for ( p in prop ) {
					e = new mElm.fn.fx( this, opt, p );
					val = prop[ p ];

					if ( rfxtypes.test(val) ) {
						e[ val === "toggle" ? hidden ? "show" : "hide" : val ]();

					} else {
						parts = rfxnum.exec( val );
						start = e.cur();

						if ( parts ) {
							end = parseFloat( parts[2] );
							unit = parts[3] || ( cssNumber[ p ] ? "" : "px" );

							// We need to compute starting value
							style = {};
							if ( unit !== "px" ) {
								style[p] = (end || 1) + unit;
								this.setStyle(style);
								start = ((end || 1) / e.cur()) * start;
								style[p] = start + unit;
								this.setStyle(style);
							}

							// If a +=/-= token was provided, we're doing a relative animation
							if ( parts[1] ) {
								end = ( (parts[ 1 ] === "-=" ? -1 : 1) * end ) + start;
							}

							e.custom( start, end, unit );

						} else {
							e.custom( start, val, "" );
						}
					}
				}

				// For JS strict compliance
				return true;
			})
		},
		speed: function(speed, easing, fn) {
			var opt = speed && typeof speed === "object" ? o.extend({}, speed) : {
				complete: fn || !fn && easing ||
					o.isFunction( speed ) && speed,
				duration: speed,
				easing: fn && easing || easing && !o.isFunction(easing) && easing
			};

			opt.duration = mElm.fn.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
				opt.duration in mElm.fn.fx.speeds ? mElm.fn.fx.speeds[opt.duration] : mElm.fn.fx.speeds._default;

			// Queueing
			opt.old = opt.complete;
			opt.complete = function( noUnmark ) {
				if ( o.isFunction( opt.old ) ) {
					opt.old.call( this );
				}
			};

			return opt;
		},
		each: function(fn) {
			this.e.each(function(o) {fn.apply(o)});
		},
		timers: [],
		fx: function( elem, options, prop ) {
			this.options = options;
			this.elem = elem;
			this.prop = prop;

			options.orig = options.orig || {};
		},
		easing: {
			linear: function( p, n, firstNum, diff ) {
				return firstNum + diff * p;
			},
			swing: function( p, n, firstNum, diff ) {
				return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
			}
		}
	});

	mElm.fn.fx.prototype = {
		// Simple function for setting a style value
		update: function() {
			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			(mElm.fn.fx.step[this.prop] || mElm.fn.fx.step._default)( this );
		},

		// Get the current size
		cur: function() {
			if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) ) {
				return this.elem[ this.prop ];
			}

			var parsed,
				r = o.get_style(this.elem, this.prop);
			// Empty strings, null, undefined and "auto" are converted to 0,
			// complex values such as "rotate(1rad)" are returned as is,
			// simple values such as "10px" are parsed to Float.
			return isNaN( parsed = parseFloat( r ) ) ? !r || r === "auto" ? 0 : r : parsed;
		},

		// Start an animation from one number to another
		custom: function( from, to, unit ) {
			var self = this,
				fx = mElm.fn.fx,
				raf;

			this.startTime = fxNow || createFxNow();
			this.start = from;
			this.end = to;
			this.unit = unit || this.unit || ( cssNumber[ this.prop ] ? "" : "px" );
			this.now = this.start;
			this.pos = this.state = 0;

			function t( gotoEnd ) {
				return self.step(gotoEnd);
			}

			t.elem = this.elem;

			if ( t() && mElm.fn.timers.push(t) && !timerId ) {
				// Use requestAnimationFrame instead of setInterval if available
				if ( requestAnimationFrame ) {
					timerId = true;
					raf = function() {
						// When timerId gets set to null at any point, this stops
						if ( timerId ) {
							requestAnimationFrame( raf );
							fx.tick();
						}
					};
					requestAnimationFrame( raf );
				} else {
					timerId = setInterval( fx.tick, fx.interval );
				}
			}
		},

		// Simple 'show' function
		show: function() {
			// Remember where we started, so that we can go back to it later
			this.options.orig[this.prop] = this.elem.getStyle(this.prop);
			this.options.show = true;

			// Begin the animation
			// Make sure that we start at a small width/height to avoid any
			// flash of content
			this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());

			// Start by showing the element
			this.elem.show();
			if(this.elem.getStyle('display') === 'none')
				this.elem.style.display = 'block';
		},

		// Simple 'hide' function
		hide: function() {
			// Remember where we started, so that we can go back to it later
			this.options.orig[this.prop] = this.elem.getStyle(this.prop);
			this.options.hide = true;

			// Begin the animation
			this.custom(this.cur(), 0);
		},

		// Each step of an animation
		step: function( gotoEnd ) {
			var t = fxNow || createFxNow(),
				done = true,
				elem = this.elem,
				options = this.options,
				i, n;

			if ( gotoEnd || t >= options.duration + this.startTime ) {
				this.now = this.end;
				this.pos = this.state = 1;
				this.update();

				options.animatedProperties[ this.prop ] = true;

				for ( i in options.animatedProperties ) {
					if ( options.animatedProperties[i] !== true ) {
						done = false;
					}
				}

				if ( done ) {
					// Reset the overflow
					if ( options.overflow != null && !o.support.shrinkWrapBlocks ) {

						$A([ "", "X", "Y" ]).each(function (value, index) {
							elem.style[ "overflow" + value ] = options.overflow[index];
						});
					}

					// Hide the element if the "hide" operation was done
					if ( options.hide ) {
						elem.hide();
					}

					// Reset the properties, if the item has been hidden or shown
					if ( options.hide || options.show ) {
						for ( var p in options.animatedProperties ) {
							var sy = {};
							sy[p] = options.orig[p];
							elem.setStyle(sy);
						}
					}

					// Execute the complete function
					options.complete.call( elem );
				}

				return false;

			} else {
				// classical easing cannot be used with an Infinity duration
				if ( options.duration == Infinity ) {
					this.now = t;
				} else {
					n = t - this.startTime;
					this.state = n / options.duration;

					// Perform the easing function, defaults to swing
					this.pos = mElm.fn.easing[ options.animatedProperties[ this.prop ] ]( this.state, n, 0, 1, options.duration );
					this.now = this.start + ((this.end - this.start) * this.pos);
				}
				// Perform the next step of the animation
				this.update();
			}

			return true;
		}

	}

	o.extend(mElm.fn.fx, {
		tick: function() {
			for ( var timers = mElm.fn.timers, i = 0 ; i < timers.length ; ++i ) {
				if ( !timers[i]() ) {
					timers.splice(i--, 1);
				}
			}

			if ( !timers.length ) {
				mElm.fn.fx.stop();
			}
		},

		interval: 13,

		stop: function() {
			clearInterval( timerId );
			timerId = null;
		},

		speeds: {
			slow: 600,
			fast: 200,
			// Default speed
			_default: 400
		},

		step: {
			opacity: function( fx ) {
				fx.elem.setStyle({opacity: fx.now});
			},

			_default: function( fx ) {
				if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
					fx.elem.style[ fx.prop ] = (fx.prop === "width" || fx.prop === "height" ? Math.max(0, fx.now) : fx.now) + fx.unit;
				} else {
					fx.elem[ fx.prop ] = fx.now;
				}
			}
		}
	});

	o.effect = mElm;
})(YKUC);

(function(o) {
	function loadScript(src, func,script) {
		if(typeof script == 'undefined'){var script = o.$C('script')};
		script.src = src;
		if(func) {
			if('readyState' in script) {
				script.onreadystatechange = function() {
					if(script.readyState == 'loaded' || script.readyState == 'complete') func.apply();
				}
			} else {
				script.onload = func;
			}
		}
		return $$('head')[0].appendChild(script);
	}
	var render = function(ready, options, data) {
		var script, html;
		if(!data || !ready || typeof ready !== 'function' || !options)
			return o.error('template argument error!');
		if(typeof EJS == 'undefined') {
			script = loadScript(ucloader.ejs, function() {render.apply(this, [ready, options, data]);});
			return;
		}
		html = new EJS(options).render(data);
		ready(html);
		return;
	}
	o.render = render;
	o.loadScript = loadScript;
})(YKUC);

(function (b) {
    var m, j, a, g = 8,
        h;
    b.scrollTo = function (p, n, o) {
        g = o || g;
        h = p - n;
        j = [h];
        j[g] = 0;
        a = 1;
        for (a; a < g; a++) {
            j[a] = (h = h / 2)
        }
        clearInterval(m);
        m = setInterval(function () {
            if (j.length) {
                window.scrollTo(0, n + j.shift());
                return
            }
            clearInterval(m)
        }, 13)
    }
})(YKUC);
	
(function(o) {
	o.Dialog = function(e, prop) {
		var it = o.unit(),
			wrap, cl,
			u = it.u;
		// default dialog configurations
		prop = prop || {};
		prop.width = prop.width || 'auto';
		prop.height = prop.height || 'auto';
		prop.dragable = prop.dragable || false;
		prop.className = prop.className || '';
		prop.close = prop.close || false;
		prop.clClassName = prop.clClassName || false;

		it.wrap = wrap = e || document.body.appendChild(o.$C('div'));
		wrap.setStyle({
			width: !isNaN(prop.width)? prop.width+'px' : prop.width,
			height: !isNaN(prop.height)? prop.height+'px' : prop.height,
			display: 'none'
		});
		wrap.addClassName(prop.className);

		function addcl() {
			if(prop.close) {
				if(typeof(prop.close) === 'object' && 'nodeName' in prop.close) {
					cl = wrap.appendChild(prop.close);
				} else {
					cl = o.$C('div').addClassName('cl').update('<a href="javascript:;"><em>关闭x</em></a>');
					if(prop.clClassName) cl.addClassName(prop.clClassName);
					wrap.appendChild(cl);
				}
				Event.observe(cl, 'click', function(e) {it.close();});
			}
		}

		it.css = u(function(style) {
			wrap.setStyle(style);
		});

		it.position = u(function(x, y) {
			var pos = {position: 'absolute'};
			if(x) pos.left = x+'px';
			if(y) pos.top = y+'px';
			wrap.setStyle(pos);
		});

		it.content = u(function(html) {
			wrap.update(html);
		});

		it.show = u(function(noani) {
			if(prop.close) addcl();
			if(noani) return it.css({display:'block'});
			else o.effect(wrap).ani({opacity:'show'}, 150);
		});

		it.close = u(function(noani) {
			if(noani) wrap.hide();
			else o.effect(wrap).ani({opacity: 'hide'}, 150);
		});

		it.destory = u(function() {
			wrap.remove();
			prop = wrap = null;
		});

		it.addbtn = u(function(str) {
			var act = wrap.down('.act'),
				btn;
			if(!act) {
				act = wrap.appendChild(o.$C('div'));
				act.addClassName('act');
			}
			btn = o.$C('button');
			//btn.type = 'button';
			btn.innerHTML = str;
			act.appendChild(btn);
			it.btns = it.btns || [];
			it.btns.push(btn);
		});

		it.center = u(function() {
			var x,y,offparent,poff,vdim={},
				scroll = document.viewport.getScrollOffsets(),
				wdim = wrap.getDimensions();
			offparent = YKUC.getOffsetParent(wrap);
			vdim.width = offparent.nodeName.toLowerCase() == 'body'?
				document.viewport.getWidth() : offparent.getWidth();
			vdim.height = document.viewport.getHeight();
			x = (vdim.width - wdim.width) / 2;
			y = (vdim.height - wdim.height) / 2;
			if(scroll.top > 0) y += scroll.top;

			while(offparent.nodeName.toLowerCase() != 'body'
				 && offparent.nodeName.toLowerCase() != 'html') {
				poff = offparent.cumulativeOffset();
				y -= poff.top;
				offparent = YKUC.getOffsetParent(offparent);
			}
			if(y < 0) y = 20;
			it.position(x, y);
		});

		return it;
	}

	o.Confirm = function(param,title,width,height,cfElem) {
		var _width = width || 180,_height = height || 100, _cfElem = cfElem || $('YK_overlay_del');
		var it = new Qwindow({
			title:		title || '',
			size:		{width: _width,height: _height},
			content	:   {type: "element", value: _cfElem},
			showhandle: false, 
			elements: '',
			showmask: false 
		});	
		_cfElem.down('[_uc="text"]').innerHTML = param;
		_cfElem.style.display = 'block';		
		var that = o.unit(),u = that.u;
		
		it.yes = u(function(func) {
			if(typeof func == 'function') it.onyes = func;
		});
		it.no = u(function(func) {
			if(typeof func == 'function') it.onno = func;
		});
		it.confirm = u(function() {
			if(typeof it.onyes == 'function') {
				it.onyes();
			}
			it.hide();
		});
		it.cancel = u(function() {
			if(typeof it.onno == 'function'){
				it.onno();
			}
			it.hide();
		});
		Event.observe($(it.dom.winbody).down('[_uc="yes"]'), 'click', it.confirm);
		Event.observe($(it.dom.winbody).down('[_uc="no"]'), 'click', it.cancel);
		return it;
	}

})(YKUC);

(function(o) {
	var wc_timeout;
	o.Composer = function(e, tools, prop, callback) {
		if(!e || !e.nodeName || e.nodeName.toLowerCase() != 'textarea')
			return null;
		var arg = Array.prototype.slice.call(arguments, 4)[0] || [];
		this.e = e;
		this.count = 0;
		this.prop = prop = prop || {};
		this.prop.elm_wordcount = prop.elm_wordcount || null;
		this.prop.btn_publish = prop.btn_publish || null;
		this.prop.pub_params = prop.pub_params || {};
		this.prop.init_content = prop.init_content || '';
		this.prop.submit_url = prop.submit_url || '/u/post/';
		this.prop.can_be_null = prop.can_be_null || false;
		this.prop.disable_publish = prop.disable_publish || false;
		this.tools = tools || [];
		this.add_action = function(hook,func,arg) { add_action.call(this, hook,func,arg)};
		this.hook_function_prepub = {};
		this.tool_act = {
			'emotion': emotion,
			'topic': topic,
			'video': video
		};
		this.finish = typeof callback == 'function' ? function() { callback.apply(this, arg)} : null;
		for(var i=0,len=tools.length; i < len; i++) { exec_tools.apply(this, [tools[i]]); }
		
		this.chk_defval = function(type){
			if(type == 'foucs' && e.id == 'YK_talk_main'){
				if(trim(e.value) == '' || trim(e.value) == _this.prop.init_content){
					e.value = '';
					e.removeClassName('form_input_defaultvalue');	
				}
			}else if(type == 'blur' && e.id == 'YK_talk_main'){
				if(trim(e.value) == '' || trim(e.value) == _this.prop.init_content){
					e.value = _this.prop.init_content;
					e.addClassName('form_input_defaultvalue');	
				}
			}	
		}
		
		if(!Prototype.Browser.IE){
			Event.observe(e, 'input', word_count.bind(this));
		}else{
			//Event.observe(e, 'propertchange', word_count.bind(this));
		}
		Event.observe(e, 'keyup', word_count.bind(this));
		Event.observe(e, 'mouseup', word_count.bind(this));
		var _this = this;	
		Event.observe(e, 'blur', function(){
			word_count.bind(this);
			_this.chk_defval('blur');
		});
		
		Event.observe(e, 'focus', function(){ 
			word_count.bind(this);
			_this.chk_defval('foucs');			
		});
		Event.observe(e, 'keypress', publish.bind(this));
		if(this.prop.btn_publish) {
			this.prop.submit_url = this.prop.btn_publish.getAttribute('req');
			Event.observe(this.prop.btn_publish, 'click', publish.bind(this));
		}
		this.e.value = this.prop.init_content;
		if(this.e.value){ this.e.addClassName('form_input_defaultvalue');	 }
		if(!this.fakeE) {
			this.fakeE = YKUC.$C('div');
			pos = this.e.cumulativeOffset();
			css = {
				fontSize: this.e.getStyle('fontSize'),
				lineHeight: this.e.getStyle('lineHeight'),
				//width: this.e.getStyle('width'),
				paddingTop: this.e.getStyle('paddingTop'),
				paddingLeft: this.e.getStyle('paddingLeft'),
				paddingRight: this.e.getStyle('paddingRight'),
				paddingBottom: this.e.getStyle('paddingBottom'),
				borderTopWidth: this.e.getStyle('borderTopWidth'),
				borderRightWidth: this.e.getStyle('borderRightWidth'),
				borderBottomWidth: this.e.getStyle('borderBottomWidth'),
				borderLeftWidth: this.e.getStyle('borderLeftWidth'),
				borderStyle: 'solid ',
				overflow: 'hidden',
				position: 'absolute',
				//top: pos.top+'px',
				//left: pos.left+'px',
				top: 0,
				left: 0,
				visibility: 'hidden',
				zIndex: -1
			};
			for(var i in css) {
				if(!css.hasOwnProperty(i)) continue;
				var cur_css = css[i];
				if(!cur_css) delete css[i];
			}
			this.fakeE.setStyle(css);
			this.e.up().appendChild(this.fakeE);
		}
		setTimeout(word_count.bind(this, false), 0);
		this.word_count = word_count;
		return this;
	}
	
	function add_action(hook,func,arg){
		switch(hook.type){
			case 'prepub' :
				var callback = function (callbackArg){
					return func.call(this, arg,callbackArg);
				};
				this.hook_function_prepub[hook.name] = callback;
				break;
			default:
				break;
		}
	}

	function emotion(panel, req) {
		nova_request(function(res) {
			var div = o.$C('div'), a = o.$C('a'), con;
			res = typeof res == 'object' ? res : res.stripScripts().evalJSON(true);
			panel.setAttribute('loading', 'false');

			panel.replaceChild((con = div.cloneNode(1)), panel.down());
			con = con.addClassName('faces').appendChild(div.cloneNode(1)).addClassName('ico__faces_act');
			res.each(function(elm, i) {
				var ca = con.appendChild(a.cloneNode(0));
				ca.setAttribute('href', 'javascript:;');
				ca.setAttribute('title', elm.code);
				ca.update('<em>'+elm.code+'</em>');
				ca.addClassName(elm['class']? elm['class'] : 'o'+(++i));
				Event.observe(ca, 'click', function(event) {
					event = event || window.event;
					if(event.button !== 0) return;
					var target = Event.findElement(event, 'a');
					this.chk_defval('foucs');
					this.e.value = this.e.value.substr(0, this.selection.start)+target.title+this.e.value.substr(this.selection.end);
					o.set_selection(this.e, this.selection.start+target.title.length, this.selection.start+target.title.length);
					word_count.apply(this);
				}.bind(this));
			}.bind(this));
		}.bind(this), req, {}, 'get');
	}

	function topic(res) {}
	function video(panel, req) {
		var tips = panel.down('.tips'),
			url = panel.down('input'),
			btn = panel.down('button');
		panel.setAttribute('loading', 'false');
		var _this = this;
		var submit = function(event) {
			/* submit hot key is Enter */
			if(event.type.indexOf('key') >= 0 && event.keyCode != 13) return;
			/* if already in request not submit at the same time */
			if(url.getAttribute('processing') === 'true') return;
			/* null url can not be accepted */
			if(url.value === '') { tips.show(); setTimeout(function(){tips.hide();}, 2000); return; }
			url.setAttribute('processing', 'true');
			nova_request(function(res){
				url.setAttribute('processing', 'false');
				url.value = '';
				res = typeof res == 'object' ? res : res.stripScripts().evalJSON(true);
				if('error' in res) {
					tips.innerHTML = res.error;
					tips.show(); setTimeout(function(){tips.hide();}, 2000);
					return;
				}
				if('shorturl' in res) {
					_this.chk_defval('foucs');
					this.e.value = this.e.value.substr(0, this.selection.start)+res.shorturl+' '+this.e.value.substr(this.selection.end);
					setTimeout(function() {this.word_count(false)}.bind(this), 0);
					o.set_selection(this.e, this.selection.start+res.shorturl.length, this.selection.start+res.shorturl.length);
				}
				o.click(document);
			}.bind(this), req, {vurl: url.value}, 'get');
		}.bindAsEventListener(this);
		Event.observe(url, 'keypress', submit);
		Event.observe(btn, 'click', submit);
		Event.observe(panel, 'click', function(event) {Event.stop(event)});
	}

	function exec_tools(h) {
		if(!h) return;
		var act = h.getAttribute('act'), req = h.getAttribute('req'), menu = h.up('.dropmenu');
		this.evt = this.evt || {};
		var panel = o.$C('div').addClassName('panel').update(
			'<div style="margin:20px auto;text-align:center"><span class="ico__loading_32"></span></div>');
		panel.setAttribute('loading', 'true');

		this.evt[act] = function(menu, act, panel, req, event){
			event = event || window.event;
			if(event.button !== 0 || !menu) return;
			var yk_tool = menu.up('.qwindow');
			if(typeof yk_tool != 'undefined') yk_tool = yk_tool.down('.tool');
			this.selection = o.get_selection(this.e);
			if(menu.hasClassName('dropmenu_expand')) {
				menu.removeClassName('dropmenu_expand');
				Event.stopObserving(document, 'click', this.evt[act]);
				if(typeof yk_tool != 'undefined') yk_tool.style.height = yk_tool.getHeight() - 110 + 'px'; 
				menu.down('.panel').hide();
				return ;
			}
			Event.stop(event);
			o.click(document);
			menu.addClassName('dropmenu_expand');
			if(typeof yk_tool != 'undefined') yk_tool.style.height = yk_tool.getHeight() + 110 + 'px';
			if(menu.down('.panel')) {
				panel = menu.down('.panel').show();
			} else {
				panel = menu.appendChild(panel).show(); 
			}
			if(panel.getAttribute('loading') === 'true') {
				this.tool_act[act.substr(act.lastIndexOf('.')+1)].apply(this, [panel, req]);
			}
			Event.observe(document, 'click', this.evt[act]);
		}.bind(this, menu, act, panel, req);
		Event.observe(h, 'click', this.evt[act]);
	}

	function overflow() {
		if(!this.e) return;
		var that = this, times=4, to = null;
		var tt = (function(){
			var t = true; color_orig = that.e.getStyle('backgroundColor');
			return function() {
				if(!t) {
					t = true; this.setStyle({backgroundColor: '#FFDDDD'});
				} else {
					t = false; this.setStyle({backgroundColor: color_orig});
				}
				if(times-- <= 0) try {clearInterval(to)} catch(e) {};
			}.bind(that.e);
		})();
		to = setInterval(tt, 150);
	}

	function publish(event) {
		var data, loading, isCrossDomain=0;
		var logafter = function() {
			notify.init();
			publish.apply(this, [event]);
		}.bind(this);
		if(event.type.toLowerCase().indexOf('key')>=0 && (!event.ctrlKey || (event.keyCode != '13' && event.keyCode != '10'))) return;
		if(!islogin()) {
			login(function() {window.location.reload()});
			return;
		}
		//hooks
		if(typeof this.prop.hooks_beforecommit == 'object' && this.prop.hooks_beforecommit.length > 0){
			var hookreturn;
			for(var i=0;i<this.prop.hooks_beforecommit.length;i++){
				if(this.prop.hooks_beforecommit[i].isopen == true && typeof this.prop.hooks_beforecommit[i].func == 'function'){
					hookreturn = this.prop.hooks_beforecommit[i].func(this);
					if(undefined != hookreturn){
						switch(hookreturn){
							case -1 : return;break;
							case -2 : continue;break;
							default: break;
						}
					}
				}
			}
		}
		
		if(isNaN(this.count) || isNaN(this.maxTweetSize) || this.processing) return overflow.apply(this);
		if(this.count > this.maxTweetSize) return overflow.apply(this);
		if(this.count == 0 && !this.prop.can_be_null) return overflow.apply(this);
		this.e.value = this.e.value.strip();
		if(this.e.value == '' && !this.prop.can_be_null) return overflow.apply(this);
		//if(this.e.value == '0' && !this.prop.can_be_null) return overflow.apply(this);
		this.processing = true;
		if(this.prop.btn_publish && (loading = this.prop.btn_publish.down('.pub_btn'))) {
			loading.className = 'sending';
		}
	
		this.prop.pub_params.text = this.e.value;
		if((data = this.e.getAttribute('data'))) {
			data = ('{'+decodeURIComponent(data)+'}').evalJSON(1);
			for(var i in data) {
				this.prop.pub_params[i] = data[i];
			}
		}else{
			data={};
		}
		for(var i in this.hook_function_prepub){
			if(typeof this.hook_function_prepub[i] == 'function'){
				this.hook_function_prepub[i](this);
			}
		}
        // 发送回调
        var finishPub = function(){
            this.processing = false;
            if(loading) loading.className = 'pub_btn';
            // get callback params
            if (isCrossDomain){
                var _iframeHandle = this._iframe.contentDocument? this._iframe.contentDocument: this._iframe.contentWindow.document;
                var _iframeScriptTag = _iframeHandle.getElementsByTagName('script');
                for(var i=0,len=_iframeScriptTag.length; i<len; i++ ){
                    if (_iframeScriptTag[i].type == 'text/json-result'){
                        this.ret = _iframeScriptTag[i].innerHTML.evalJSON();
                        break;
                    }
                }
            }
            // (hook) aftercommit to do 
            if(typeof this.prop.hooks_aftercommit == 'object' && this.prop.hooks_aftercommit.length > 0){
                    var hookreturn;
                    for(var i=0;i<this.prop.hooks_aftercommit.length;i++){
                        if(this.prop.hooks_aftercommit[i].isopen == true && typeof this.prop.hooks_aftercommit[i].func == 'function'){
                            hookreturn = this.prop.hooks_aftercommit[i].func(this);
                            if(undefined != hookreturn){
                                switch(hookreturn){
                                    case -1 : return;break;
                                    case -2 : continue;break;
                                    default: break;
                                }
                            }
                        }
                    }
            }

            if('zh' in this.ret) {
                if(!this.errTips){
                    this.errTips = new Qwindow({
                        title:		'',
                        showmask:   false,
                        size:		{width:300, height:100},
                        content:	{type: 'html', value: '<div class="talk_tips" style="text-align:center;padding-top:40px;"><div class="msg"><span class="ico__info"></span><span class="txt"></span></div></div>'}
                    });	
                }
                this.errTips.dom.winbody.down('.txt').update(this.ret.zh);
                this.errTips.setPosrefer(this.e).setPos("top","left").show();
                setTimeout(function(){this.errTips.hide()}.bind(this), 2000);
                return;
            }
            
            this.e.value = '';
            word_count.apply(this);
            if(typeof this.finish == 'function') {this.finish()}
        }.bind(this);
        
         // 跨域访问: php返回的结果形式：
        /* 
		 <!DOCTYPE html><html><body><script>document.domain="youku.com";</script><script type="text/json-result">your result(json)</script></body></html>'
        */
		if (this.prop.submit_url.indexOf('http://')>=0 && this.prop.submit_url.indexOf(location.host)<0){
            isCrossDomain = 1;
            this.prop.pub_params['crossdomain'] = isCrossDomain;
            this.processing = false;
            var _iframeName = 'iframe_name_composer';
            
            if (empty(this._iframe)){   // 创建一个iframe
                try {
                    this._iframe = document.createElement('<iframe name="'+ _iframeName +'">');
                } catch (e) {
                    this._iframe = document.createElement('iframe');
                    this._iframe.name = _iframeName;
                }
                this._iframe.style.display = 'none';
                document.body.appendChild(this._iframe);
            }
            
            if (this._iframe.readyState){   // iframe.onload
                this._iframe.onreadystatechange = function(){
                    if (this._iframe.readyState && this._iframe.readyState=='complete'){
                        finishPub.apply(this);
                    }
                }.bind(this);
            } else {
                this._iframe.onload = finishPub.bind(this);
            }
            
            // 创建表单，并提交
            var _form = document.createElement('form');
            _form.action = this.prop.submit_url;
            _form.target = _iframeName;
            _form.method = 'post';
            for (var i in this.prop.pub_params){
                var _input = document.createElement('input');
                _input.name = i;
                _input.value = this.prop.pub_params[i];
                _input.type = 'hidden';
                _form.appendChild(_input);
            }
            document.body.appendChild(_form);
            _form.submit();
            
        } else { // 不跨域 
            nova_request(function(ret) {
                this.ret = typeof ret == 'object' ? ret : ret.stripScripts().evalJSON(true);
                finishPub.apply(this);
            }.bind(this), this.prop.submit_url, this.prop.pub_params, 'post');
        }                
	}

	function word_count(event) {
		if(wc_timeout) {
			clearTimeout(wc_timeout);
			wc_timeout = null;
		}
		wc_timeout = setTimeout(real_word_count.bind(this, event), 50);
	}
	function real_word_count(event) {
		var tips,text,sel,pos,val,height,
			wc = this.prop.elm_wordcount;
		this.count = (trim(this.e.value) == this.prop.init_content) ? 0 : this.e.value.length;
		if(wc && wc.nodeType) {
			tips = wc.innerHTML;
			if(!isNaN(this.maxTweetSize) && this.count > this.maxTweetSize)  {
				wc.setStyle({color: '#CC0000'});
			} else {
				wc.setStyle({color: ''});
			}
			if(this.prop.disable_publish != false){	
				if(this.count < 1 || (!isNaN(this.maxTweetSize) && this.count > this.maxTweetSize))  {
					if(!this.prop.disable_publish.hasClassName('form_btn_disabled'))
						this.prop.disable_publish.addClassName('form_btn_disabled');
				}else{
					if(this.prop.disable_publish.hasClassName('form_btn_disabled'))
						this.prop.disable_publish.removeClassName('form_btn_disabled');
				}
			}
			this.maxTweetSize = this.maxTweetSize || parseInt(tips.substr(tips.indexOf('/')+1));
			wc.innerHTML = this.count+tips.substr(tips.indexOf('/'));
		}
		if(this.fakeE) {
			setTimeout(auto_expand.bind(this), 100);
		}
		return true;
	}

	function auto_expand() {
		var hCheck = !(Prototype.Browser.IE || Prototype.Browser.Opera),
			paddingBottom = parseInt(this.e.getStyle('paddingBottom')),
			paddingTop = parseInt(this.e.getStyle('paddingTop'));
		if(!this.e.expandMin || !this.e.expandMax) {
			// set height restrictions
			var p = this.e.className.match(/expand(\d+)\-*(\d+)*/i);
			this.e.expandMin = parseInt(this.e.getStyle('height')) || (p ? parseInt('0'+p[1], 10) : 0);
			this.e.expandMax = 300 || (p ? parseInt('0'+p[2], 10) : 99999);
		}
		// find content length and box width
		var vlen = this.e.value.length, ewidth = this.e.offsetWidth;
		if (vlen != this.e.valLength || ewidth != this.e.boxWidth) {

			if (hCheck && (vlen < this.e.valLength || ewidth != this.e.boxWidth)) this.e.style.height = "0px";
			var scrollHeight = Prototype.Browser.WebKit? this.e.scrollHeight - paddingTop - paddingBottom : this.e.scrollHeight;
			var h = Math.max(this.e.expandMin, Math.min(scrollHeight, this.e.expandMax));

			this.e.style.overflow = (scrollHeight > h ? "auto" : "hidden");
			this.e.style.height = h + "px";

			this.e.valLength = vlen;
			this.e.boxWidth = ewidth;
		}

		return true;
	}

})(YKUC);

(function(o) {
	o.fMoney = function(l){
		   l = l.toString().split(".")[0].split("").reverse(); 
		   for(var i = 0; i < l.length; i ++ )  
		   {  
		      l[i]= ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "") + l[i];  
		   }  
		   return l.reverse().join("");  
		},
   o.updateST = function(fElement,fText,add){
			if(fNum = fElement.innerHTML.replace(/[^\d]/g,"")){
				fNum = parseInt(fNum);
			}else{
				fNum = 0;
			}
			switch(add){
			   case '+':
				   fNum++;
			     break
			   case '-':
				   fNum--;
			     break
			   default:
				   fNum++;
			   }
			fElement.innerHTML = fText.replace(/%/ig,o.fMoney(fNum));
		},
	o.sprintf = function(){
	    var arg = arguments,
	        str = arg[0] || '',
	        i, n;
	    for (i = 1, n = arg.length; i < n; i++) {
	        str = str.replace(/%s/, arg[i]);
	    }
	    return str;
	},
    o.copy2ClipboardExec=function(txt){  
        if(window.clipboardData){  
            window.clipboardData.clearData();  
            window.clipboardData.setData("Text",txt);  
        }  
        else if(navigator.userAgent.indexOf("Opera")!=-1){  
            window.location=txt;  
        }  
        else if(window.netscape){  
            try{  
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
            }  
            catch(e){  
                alert("您的firefox安全限制限制您进行剪贴板操作，请打开’about:config’将signed.applets.codebase_principal_support’设置为true’之后重试，相对路径为firefox根目录/greprefs/all.js");  
                return false;  
            }  
            var clip=Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);  
            if(!clip)return;  
            var trans=Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);  
            if(!trans)return;  
            trans.addDataFlavor('text/unicode');  
            var str=new Object();  
            var len=new Object();  
            var str=Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);  
            var copytext=txt;str.data=copytext;  
            trans.setTransferData("text/unicode",str,copytext.length*2);  
            var clipid=Components.interfaces.nsIClipboard;  
            if(!clip)return false;  
            clip.setData(trans,null,clipid.kGlobalClipboard);  
        } else{
			return false;
		} 
    },
    o.copy2Clipboard=function(id){
    	var tempval = $(id);
    	
        try{
            if(o.copy2ClipboardExec(tempval.innerHTML + ' 这个优酷视频空间不错，和大家分享一下')!=false){  
                alert('复制成功！现在就粘贴到QQ或MSN中和朋友们分享吧。');  
            }else{
         	   alert("您使用的浏览器不支持此复制功能，请使用Ctrl+C或鼠标右键。");
        	   tempval.select();
            }
    	}catch(e){
    	   alert("您使用的浏览器不支持此复制功能，请使用Ctrl+C或鼠标右键。");
    	   tempval.select();
    	 }
    },
    o.addFavoriteExec = function(target, url){
    	try{
    	    if (window.sidebar) { // Mozilla Firefox Bookmark
    	        window.sidebar.addPanel(target, url,"");
    	    }else if( window.external ) { // IE Favorite
    	        window.external.AddFavorite( url, target);
    	    }else{
    	    	alert('你所使用的浏览器不支持此功能，请按"CTRL+D"来收藏当前页面');
    	    }
    	}catch(e){
     	   alert('你所使用的浏览器不支持此功能，请按"CTRL+D"来收藏当前页面');
     	 }
    },
    o.addFavorite = function(id){
    	o.addFavoriteExec($$('title')[0].innerHTML.replace(/[\n\r\t]/g, ""),$(id).innerHTML);
    }
})(YKUC);

window.YKUC = YKUC;


})(window);

var st = {
	sid: null,
	confirm: null,
	dialog: null,
	source: null,
	stream: null,
	re_composer: null,
	comments : null,
	init: function() {
		
		//容器
		this.dom = $$('[_uc="st"]')[0];
		if(!this.dom){ return; }
		//事件
		Event.observe(this.dom, 'click', this.handler_event.bind(this));
		
		this.dom_status = $$('[_uc="st_status"]')[0];
		this.dom_notice = $$('[_uc="st_notice"]')[0];
		this.dom_pager = $$('[_uc="st_pager"]')[0];
		this.dom_location = $$('[_uc="st_location"]')[0];
		this.dom_tab = $$('[_uc="st_tab"]')[0];
		this.dom_stat = $$('[_uc="st_stat"]')[0];
		//模板
		this.tpl_notice = $$('script[_uc="st_template_notice"]')[0];
		this.tpl_status = $$('script[_uc="st_template_status"]')[0];
		this.tpl_pager = $$('script[_uc="st_template_pager"]')[0];
		this.tpl_playerfn = $$('script[_uc="st_template_playerfn"]')[0];
		
		this.html_loading = '<div style="text-align:center;"><span class="ico__loading_16" style="vertical-align:middle;"></span></div>'
		
		//当前浏览信息
		if (this.dom_status == undefined) {return;}
		var type = this.dom_status.getAttribute('_type');
		var tid = this.dom_status.getAttribute('_tid');
		var uid = this.dom_status.getAttribute('_uid');
		var pagesize = this.dom_status.getAttribute('_size');
		
		this.uid = uid;
		this.tid = tid;
		this.pagesize = parseInt(pagesize, 10);
		this.is_single = this.tid ? true : false; 		
		this.type = type ? type : '';
		this.page = 1;
		
		this.viewinfo = {};
		this.ajaxurl = '/u/get_status';
		this.ajaxurl_single = '/u/get_status_single';
		this.videos = {};//存储顶踩信息
		this.is_init = true; //第一次装载
		this.lasttime = new Date(); //记录动态更新时间
		this.trycount = 0;
		
		//发表行为
		this.main_composer_init();
		
		if(this.tpl_status){ //新全前端模板方式
			//获取数据绘制
			this.update(1);
		}else{
			this.parsev();
			this.video_tips();
		}
			
	},
	
	update: function(page){
		var page = arguments[0] ? page : this.page; 
		var _this = this;
		this.dom_status.update(this.html_loading);
		if(this.dom_pager){
			this.dom_pager.update('');
		}
		this.getStatusData(this.type, this.page, function(data){ 
			//新注册用户动态
			if( _this.page == 1 
				&& (
				       (data.status && (data.status < 0 || data.status.statuses.length == 0))
					|| (data.subs && (data.subs < 0 || data.subs.users.length == 0))
				) 
				&& _this.trycount < 2
			){
				setTimeout(function(){
					_this.trycount ++;
					_this.update(1);	
				}, 1000);
			}else{ 
				var dataqueue = _this.getDataQueue(data);
				_this.drawStatusData(dataqueue, true);
			}
		});
	},
	
	getDataQueue: function(data){
		if(this.type == 'subscribe'){
			if(typeof(data.subs) == 'object' && data.subs.users){
				return data.subs.users;
			}
		}else{
			if(typeof(data.status) == 'object' && data.status.statuses){
				return data.status.statuses;
			}	
		}
		return [];
	},
	
	//缓存数据
	storageData: function(type, page, data){
		if(!this.cache[type]){ this.cache[type] = {}; }
		this.cache[type]['p' + page] = data;
	},
	
	setViewInfo: function(data){
		this.viewinfo = {};
		for(var key in data){
			this.viewinfo[key] = data[key];			
		}
		if(this.dom_stat){
			if(data.status.total){
				this.dom_stat.update(data.status.total);	
			}else{
				this.dom_stat.update(0);	
			}
		}
	},
	
	newst: function(event){
		notify.newst(event);
	},
	
	changetype: function(event){
		var dom_handle = event.tagName? event : Event.element(event);
		var type = dom_handle.getAttribute('_type');
		this.type = type;
		this.page = 1;
		var _this = this;
		if(this.dom_tab){
			var handles = this.dom_tab.select('a[_click="changetype"]');
			handles.each(function(handle){
				handle.parentNode.removeClassName('current');
			});
		}
		dom_handle.parentNode.addClassName('current');
		
		this.update();
	},
	
	getStatusData: function(type, page, func){
		var url = '';
		var params = {};
		if(this.is_single){
			url = this.ajaxurl_single;
			params = {'uid': this.uid, 'tid': this.tid}; 	
		}else{
			url = this.ajaxurl;
			params = {'uid': this.uid, 'type': type, 'page':page, 't': +new Date()};
			if(this.pagesize){
				params.size = this.pagesize;	
			}		
		}
		var _this = this;
		nova_request(function(data) {
			if(!data){ return; }
			var data = typeof data == 'object' ? data : data.stripScripts().evalJSON(true);
			_this.setViewInfo(data);			
			func.apply(this, [data]);		
		}, url, params, 'get');
	},
	
	_getLastTimeFormat: function(){
		var now = new Date();
		//偏移秒
		var offset = (now.getTime() - this.lasttime.getTime())/1000;
		if(offset<60){//秒
			return Math.round(offset) + '秒前看到这里';	
		}else if(offset<60*60){//分钟
			return Math.round(offset/60) + '分钟前看到这里';
		}else{
			return Math.round(offset/3600) + '小时前看到这里';
		}
	},
	
	drawStatusData: function(dataqueue, needpaging, divline){
		
		if(!dataqueue){return;}
		
		//是否是分页更新，分页重新填充内容
		var needpaging = arguments[1] ? arguments[1] : false;
		
		var params_status = {
								 type		: this.type
								,user		: this.viewinfo.user
								,data		: dataqueue
								,guestid	: this.viewinfo.guestId
								,is_single	: this.is_single
								,needpaging : needpaging
							};

		var params_pager = 	this.type == 'subscribe'
							? {
								 type	: this.type
								,pz		: Math.ceil(this.viewinfo.subs.total/this.viewinfo.count)
								,pn		: this.page
								,total	: this.viewinfo.subs.total
							}
							: {
								 type	: this.type
								,pz		: Math.ceil(this.viewinfo.status.total/this.viewinfo.count)
								,pn		: this.page	
								,total	: this.viewinfo.status.total
							};
								
		var params_notice = {
								type	: this.type
							};
		
		
		var updatetext = this._getLastTimeFormat();
		this.lasttime = new Date();
		
		var _this = this;

		//渲染动态
		YKUC.render(function(html) {
			//将html转化为节点并做后续处理
			var div = YKUC.$C('div').update(html),
				streams = _this.dom_status,
				rsnull = streams.select('.YK_rsnull');
				childs = streams.down('.streams');
			if(!streams) return;
				
			if(!needpaging){
				if(typeof st.cmd == 'undefined'||st.cmd != 'newst'){
					var fElement = $$('[_uc="st_total"]')[0];
					if(typeof fElement != 'undefined'){
						YKUC.updateST(fElement,'全部 % 个','+');
					}
					fElement = $$('[_uc="infostatus"]')[0];
					if(typeof fElement != 'undefined'){
						YKUC.updateST(fElement,'%','+');
					}
				}
			}
					
			div.addClassName('streams');
			
			//分页
			if(needpaging){
				streams.update('');
				streams.appendChild(div, childs);
				var publish_twee = div.select('.YK_id');
				if(idcard){
					idcard.hide();
					idcard.bind(publish_twee);
				}
			}
			//新增
			else{
				if(childs){ streams.insertBefore(div, streams.down('.streams')); }
				else{ streams.appendChild(div, childs); }
				if(rsnull && rsnull.length > 0){ rsnull.each(function(o) {o.remove()}); }
				div.style.display = 'none';
				div.style.height = div.getDimensions().height+'px';
				YKUC.effect(div).ani({height:'show'}, 'fast', 'swing', function(){
					var ss;
					div.style.height = 'auto';
					try {
						if(divline){
							//删除老的标识
							$$('.streams .spacer_record').each(function(item){
								item.className = 'spacer';
								item.innerHTML = '';
							});
							//增加新的标识
							var spacer = div.select('.stream').last().next();
							var timemark = document.createElement('span');
							timemark.className = 'timerecord';
							timemark.innerHTML = updatetext;							
							spacer.className = 'spacer_record';
							spacer.appendChild(timemark);							
						}
						//div.select('.stream').last().next().hide();
						//div.next('.streams').select('.stream').last().next().show();
					} catch(e) {};
					var publish_twee = div.select('.YK_id');
					if(idcard){
						idcard.hide();
						idcard.bind(publish_twee);
					}
				});
			}
			
			//分析视频
			_this.parsev();
			_this.video_tips();
			
			if(_this.is_single){ 
				if($('loadComment')){//展开评论
					_this.comment($('loadComment'));
				}
				if($('loadFirstVideo')){//播放第一个视频
					_this.playv($('loadFirstVideo'));
				}
				//展开text
				$$('a[_autoexpand="true"]').each(function(handle){
					_this.more(handle);	
				});
			}
			if(homemodule_readystate){ homemodule_readystate['status'] = true;	 }
			if(_this.is_init){
				_this.is_init = false;
				/*
				if(_this.type == 'subscribe'){
					var offset = _this.dom_location.cumulativeOffset();
					var b = navigator.userAgent.indexOf('AppleWebKit/') > -1 ? document.body : document.documentElement;
					YKUC.effect(b).ani({scrollTop: offset.top - 20}, 'normal', null, function() {});	
				}*/
			}
						
		}
		,this.tpl_status ? {element: this.tpl_status, type: '<'} : {url: ucloader.version+'/u/js/status.ejs', type: '<'} 
		,params_status);
		
		if(!this.is_single){ //list
			if(needpaging){
				//分页
				YKUC.render(
					function(html) { 
						if(_this.dom_pager){
							_this.dom_pager.update(html); 
						}
					}
					,{element: this.tpl_pager, type: '<'} 
					,params_pager
				);
				//通知
				YKUC.render(
					function(html) {
						_this.dom_notice.update(html);
					}
					,{element: this.tpl_notice, type: '<'} 
					,params_notice
				);
			}
		}
		
	},
	dropmenu: function(event){
		var e = Event.element(event);
		var panel = e.up('.extend').down('.panel');
		YKUC.toggle(panel);
		document.body.onclick = function(){	panel.setStyle({'display':'none'});}
		Event.stop(event);
	},
	turn: function(event){
		var dom_page = Event.element(event);
		//if(dom_page.tagName.toLowerCase () == 'i'){ dom_page = dom_page.parentNode;  }
		if (dom_page.tagName.toLowerCase () != 'a') {dom_page = dom_page.up('a');}
		var pn = 1;
		if (dom_page.hasAttribute('_pn')) pn = parseInt(dom_page.getAttribute('_pn'), 10);
		var _this = this;
		if(this.dom_pager){
			this.dom_pager.update(this.html_loading);
		}
		if(pn != this.page){
			hz.parseHz('tl_pager');
			this.page = pn;
			this.getStatusData(this.type, this.page, function(data){ 
				var dataqueue = _this.getDataQueue(data);
				_this.drawStatusData(dataqueue, true);
				
				if(_this.dom_location){
					var offset = _this.dom_location.cumulativeOffset();
					var b = navigator.userAgent.indexOf('AppleWebKit/') > -1 ? document.body : document.documentElement;
					YKUC.effect(b).ani({scrollTop: offset.top - 20}, 'fast', null, function() {});	
				}
			});
		}
	},
	
	getStatusAction: function(s){
		var act = '';
		if(s.source == 9){
			act = '留言';
		}else if(s.retweeted_status && s.retweeted_status['text'] && s.mediasVideo.length){
			act = '转发了';
		}else if(s.retweeted_status && s.retweeted_status['text'] && !s.mediasVideo.length){
			act = '转发';
		}else if(s.source == 0 && s.mediasVideo.length){
			act = '分享了';
		}else if(s.source == 0 && !s.mediasVideo.length){
			act = '分享';	
		}else if(s.source == 20){
			act = '顶了';
		}else if(s.source ==13 || (s.source >= 1000 && s.medias)){
			act = '上传了';
		}
		else if(s.source == 7){
			if(s.show_medias){ act = '评论了';
			}else{act = '评论'; }
		}else{
			if(s.show_medias){ act = '评论了'; 
			}else{ act = '评论'; }
		}	

		return act;
	},
	
	getRessAction: function(s){
		var act = '';
		if(s.source == 9){
			act = '留言';
		}else if(s.retweeted_status && s.retweeted_status['text']){
			act = '转发';
		}else if(s.source == 0){
			act = '分享';
		}else if(s.source == 20){
			act = '顶';
		}else if(s.source ==13 || s.source >= 1000 && s.medias){
			act = '上传';
		}else if(s.source == 7){
			act = '评论';
		}else{
			act = '评论';
		}
		return act;
	},
	
	main_composer_init: function() {
		var editor = $$('#YK_publisher textarea')[0],
			tools = $$('#YK_publisher .tool [act]'),
			wc = $$('#YK_publisher .counter')[0],
			bp = $$('#YK_publisher [act="composer.publish"]')[0],
			ucmt = Nova.Cookie.get('ucmt');
			if(!editor) return;
		if(!ucmt) ucmt = '';
		disable_publish = bp.down('div');
		var _this = this;
		new YKUC.Composer(
			editor,
			tools,
			{
				elm_wordcount: wc,
				btn_publish: bp,
				init_content: YKUC.decode64(ucmt),
				disable_publish: disable_publish,
				init_content: '看到什么有趣的视频？贴出来和大家一起分享吧！'
			},function(){
				if(st.type != 'friends_timeline'){  
					var handle = $$('a[_type=friends_timeline]')[0];
					if(handle){ st.changetype(handle); }
					return;
				}
				if(!this.ret || typeof this.ret != 'object') return;
				st.drawStatusData([this.ret]);
			}
		)
	},
	render_status: function(statuses, divline) {
		var ss;
		if(!statuses) return;
		if(!YKUC.isArray(statuses)) {
			ss = [];
			for(var o in statuses) {
				if(statuses.hasOwnProperty(o)) {
					ss.push(statuses[o]);
				}
			}
		} else {
			ss = statuses;
		}
		var guestid,ids,feedComment = $$('.YK_stream')[0].down('.streams .stream .feed .panel .feed_comment');
		if(!feedComment){
			ids = decodeURIComponent('{'+ $('is_self_exist').getAttribute('data') + '}').evalJSON(1);
			guestid = ids.uid;
		}else{
			ids = decodeURIComponent('{'+ feedComment.getAttribute('data') + '}').evalJSON(1);
			guestid = ids.guestid;
		}
		YKUC.render(function(html) {
			var div = YKUC.$C('div').update(html),
				streams = $$('.YK_stream')[0],
				rsnull = streams.select('.YK_rsnull');
				childs = streams.down('.streams');
			if(!streams) return;

			if(typeof st.cmd == 'undefined'||st.cmd != 'newst'){
				var fElement = $$('[_uc="st_total"]')[0];
				if(typeof fElement != 'undefined')
					YKUC.updateST(fElement,'全部 % 个','+');
				fElement = $$('[_uc="infostatus"]')[0];
				if(typeof fElement != 'undefined')
					YKUC.updateST(fElement,'%','+');
			}			
			div.addClassName('streams');
			if(childs) streams.insertBefore(div, streams.down('.streams'));
			else streams.appendChild(div, childs);
			if(rsnull && rsnull.length > 0) rsnull.each(function(o) {o.remove()});
			div.style.display = 'none';
			div.style.height = div.getDimensions().height+'px';
			YKUC.effect(div).ani({height:'show'}, 'fast', 'swing', function(){
				var ss;
				div.style.height = 'auto';
				try {
					if(divline) div.select('.stream').last().next().addClassName('spacer_news');
					//div.select('.stream').last().next().hide();
					//div.next('.streams').select('.stream').last().next().show();
				} catch(e) {};
				var publish_twee = div.select('.YK_id');
				idcard.hide();
				idcard.bind(publish_twee);
			});
		}, {url: ucloader.version+'/u/js/status.ejs', type: '>'}, {statuses: statuses, guestid: guestid});
	},
	handler_event: function(event) {
		var cmd;
		this.source = Element.extend(Event.element(event));
		if((cmd = this.source.getAttribute('_click'))) {
			try {st[cmd](event)} catch(e) {alert(e)};
		}else{
			this.source = this.source.up('a',0);
			if(this.source && (cmd = this.source.getAttribute('_click'))) {
				try {st[cmd](event)} catch(e) {alert(e)};
			}
		}
	},
	destory: function(event) {
		var data, offsets;
		this.sources = Element.extend(Event.element(event));
		this.stream = this.sources.up('.stream');
		data = ('{'+decodeURIComponent(this.stream.getAttribute('data'))+'}').evalJSON(1);
		offsets = this.sources.cumulativeOffset();
		if(!this.confirm) this.confirm = new YKUC.Confirm('确认删除该动态吗？');
		this.confirm.hideHandle().hideMask();
		this.confirm.yes(function() {
			nova_request(function(res) {
				var single;
				if(!res) return;
				res = typeof res === 'string'? res.stripScripts() : res;
				if(parseInt(res) > 0) {
					single = this.stream.up('.YK_single');
					if(single) single.update('此条动态已被原作者删除!');
					else YKUC.effect(this.stream).ani({height:'hide'}, 'fast', null, function() {this.next(0).remove();this.remove()});
					Try.these(this.stream.next().hide.bind(this));
					
					var fElement = $$('[_uc="st_total"]')[0];
					if(typeof fElement != 'undefined')
						YKUC.updateST(fElement,'全部 % 个','-');
					fElement = $$('[_uc="infostatus"]')[0];
					if(typeof fElement != 'undefined')
						YKUC.updateST(fElement,'%','-');
					
					var fElement = $$("#status_wrap .YK_stream .streams")[0];
					if(typeof fElement !='undefined'){
						var s = $$("#status_wrap .YK_stream .stream[data]");
						if(s.length<=1){
						window.location.href = window.location.href.replace(/(\?page=\d+$)|(page=\d+&)|(&page=\d+$)/ig, "");
						}
					}
				} else {
					alert('操作失败，网络异常导致此问题，请刷新后再试');
					//alert(res);
				}
			}.bind(this), '/u/destory/sid/'+data.sid, {}, 'get');
		}.bind(this));
		this.confirm.setPosrefer(this.sources).setPos(-130,-80).show();
	},
	comment: function(event) {
		var src_status, src_stream, data, cmtcb, cmtcon, composer, counter, tools, publish, auto;
		if('nodeName' in event) {
			this.sources = event;
			auto = true;
		} else {
			this.sources = Event.element(event);
		}
		src_status = this.sources.up('.stream');
		if((cmtcon = src_status.down('.YK_comments'))) {
			return cmtcon.remove();
		}
		cmtcon = src_status.down('.feed').appendChild(YKUC.$C('div')).addClassName('YK_comments');
		cmtcon.update('<div style="text-align:center;"><span class="ico__loading_16"><span></div>');
		cmtcon.style.display = 'block';
		try {
			data = ('{'+decodeURIComponent(src_status.getAttribute('data'))+'}').evalJSON(1);
			src_stream = ('{'+decodeURIComponent(src_status.getAttribute('data'))+'}').evalJSON(1);
		} catch(e) {alert(e); return};
		this.comments = src_status;
		var ids= decodeURIComponent('{'+this.sources.up('.feed_comment').getAttribute('data')+'}').evalJSON(1);
		var tid = data.sid;	
		
		cmtcb = function (cmts, tid) {
			try {
				cmts = typeof cmts == 'object' ? cmts : cmts.stripScripts().evalJSON(true);
			} catch(e) {};
			YKUC.render(function(html) {
				var transchk, cmtorichk;
				cmtcon.update(html);
				Try.these(function(){cmtcon.select('.comment').last().addClassName('lastitem')}.bind(this));
				counter = cmtcon.down('.counter');
				tools = cmtcon.select('.YK_toolbar [act]');
				publish = cmtcon.select('.action [req]')[0];
				composer = new YKUC.Composer(cmtcon.down('textarea'), tools, {
					elm_wordcount: counter,
					btn_publish: publish,
					pub_params: {status_id: src_stream.sid}
				}, function() {
					if(!this.ret || typeof this.ret != 'object') return;				
					//sync
					var data,
					_reg = new RegExp("(\\d+)",'g'),
				    _reg2 = new RegExp("(^\\D{2})",'g'),
				    fElement,
				    fNum,
				    fText;
					
					try {
						data = decodeURIComponent('{'+composer.e.getAttribute('data')+'}').evalJSON(1);
					} catch(e) {data = {}};
					
					if(data.is_status != 'undefined' && data.is_status ==1 || data.is_status == 'true'){
						fElement = st.sources.up(".feed").down(".panel .feed_trans a");
						YKUC.updateST(fElement,'转发(%)','+');
						var fElement = $$('[_uc="st_total"]')[0];
						if(typeof fElement != 'undefined')
							YKUC.updateST(fElement,'全部 % 个','+');
					}
					if(data.comment_ori != 'undefined' && data.comment_ori ==1 || data.comment_ori == 'true'){
						fElement = st.sources.up(".feed").down(".pub_info a",1);
						fText = '原文评论(%)';
						YKUC.updateST(fElement,fText,'+');	
					}
					a = src_status.down(".feed .panel .feed_comment a").innerHTML;
					a = Number(a.substring(3,a.length-1)) + 1;
					if(isNaN(a)) a=1;
					src_status.down(".feed .panel .feed_comment a").innerHTML='评论(' + a + ')';
					/*翻页下，评论计数器实效
					fElement = st.sources.up(".feed").down(".panel .feed_comment a");
					fText = fElement.innerHTML.match(_reg2)[0];
					YKUC.updateST(fElement,fText);*/
					YKUC.render(function(html) {
						var div = YKUC.$C('div').update(html),
							streams = cmtcon.down('.streams');
						div = streams? cmtcon.insertBefore(div.down(), streams) : cmtcon.appendChild(div.down());
						Try.these(function(){cmtcon.select('.comment').last().addClassName('lastitem')}.bind(this));
						div.style.height = div.getDimensions().height+'px';
						div.style.display = 'none';
						YKUC.effect(div).ani({height:'show'}, 'fast', function(){this.style.height = 'auto'});
					}, {url: ucloader.version+'/u/js/comments.ejs', type: '<'}, {comments:{comments:[this.ret]}, one: true,owner: ids.owner,guest: ids.guestid, 'tid': tid});
					var last_comm = src_status.down('.feed .YK_comments .streams .comment .avatar .YK_id');
					var last_comm_t = src_status.down('.feed .YK_comments .streams .comment .text').select('.YK_id');
					idcard.hide();
					idcard.bind(last_comm);
					idcard.bind(last_comm_t);
				});
			
				//验证码
				if(composer.e.up('.editor').up(0).down(".YK_icode")){
					composer.e.up('.editor').up(0).down(".YK_icode").remove();
				}	
				var verifycookie = Nova.Cookie.get('stverify');
				if(verifycookie){
					verifytime =new Date();
					if(verifycookie >= verifytime.getTime()){
						st.verifyfun(composer);
					}
				}
				//hooks
				composer.prop.hooks_aftercommit = new Array();
				verifyAfterCommit = function(obj){
					return st.verifyAfterCommit(obj);
				}.bind(this);
				composer.prop.hooks_aftercommit.push({'isopen':true,'func':verifyAfterCommit});			
				composer.prop.hooks_beforecommit = new Array();
				verifyBeforeCommit = function(obj){
					return st.verifyBeforeCommit(obj);
				}.bind(this);				
				composer.prop.hooks_beforecommit.push({'isopen':true,'func':verifyBeforeCommit});
			
				transchk = src_status.select('input.sharechk')[0];
				cmtorichk = src_status.select('input.cmtorichk')[0];
				transchk.id = 'transchk'+data.sid;
				cmtorichk.id = 'cmtorichk'+data.sid;
				transchk.next('label').setAttribute('for', transchk.id);
				cmtorichk.next('label').setAttribute('for', cmtorichk.id);
				if(typeof src_stream.resid != 'undefined') {
					var suser = cmtcon.up('.stream').select('.sourceuser a')[0];
					if(suser) {
						suser = suser.innerHTML.substr(1);
						cmtorichk.next('label').innerHTML = '同时评论原文 ';
						cmtorichk.up().show();
					} else {
						transchk.up().hide();
					}
				}
				transchk.onchange = function(event) {
					try {
						data = decodeURIComponent('{'+composer.e.getAttribute('data')+'}').evalJSON(1);
					} catch(e) {data = {}};
					if(this.checked){
						data.is_status = true;
					}else data.is_status = false;
					data = encodeURIComponent(JSON.stringify(data).replace(/[{}]/g, ''));
					composer.e.setAttribute('data', data);
				}
				cmtorichk.onchange = function(event) {
					try {
						data = decodeURIComponent('{'+composer.e.getAttribute('data')+'}').evalJSON(1);
					} catch(e) {data = {}};
					if(this.checked) data.comment_ori = true;
					else data.comment_ori = false;
					data = encodeURIComponent(JSON.stringify(data).replace(/[{}]/g, ''));
					composer.e.setAttribute('data', data);
				}
				composer.add_action({'type':'prepub','name':'cmTrans'},function(arg){
					arguments[1].prop.pub_params.status_text = '';
					if( typeof arguments[1].prop.pub_params.is_status != 'undefined' && arguments[1].prop.pub_params.is_status == true){
						var commentTrans = arg.composer.e.readAttribute("_replyTrans");
						if(commentTrans == null || commentTrans.length < 1){
							commentTrans = arg.composer.e.readAttribute("_replyTransInit");
						}
						if(commentTrans == null || commentTrans.length < 1){
							if(typeof arg.composer.e.up(".feed").down(".source") != 'undefined'){
								commentTrans = arg.composer.e.up(".feed").down(".text").innerHTML;
								commentTrans = commentTrans.replace(/<img[^<]+?alt="(.+?)"[^<]+?>/img, "[$1]").replace(/<a[^<]+?>(.+?)<\/a>/img, "$1 ").stripTags().replace(/[\n\t\r]+/ig, ' ');
								var usernameElement = arg.composer.e.up(".feed").down(".username");
								if(typeof usernameElement !='undefined'){
									var username = usernameElement.innerHTML.replace(/<[^<>]+?>/img,'').replace(/[\s]/img,'');
									commentTrans = ' //@'+ username +' '+ commentTrans;
								}else{
									commentTrans = ' //'+commentTrans;
								}
							}
						}else{
							arg.composer.e.writeAttribute({"_replyTrans": ''});
						}
						if(commentTrans != null && commentTrans.length > 0){
							arguments[1].prop.pub_params.status_text = arguments[1].prop.pub_params.text + ' ' + commentTrans;
						}else{
						    arguments[1].prop.pub_params.status_text = arguments[1].prop.pub_params.text;
						}
						
					}
				},{'composer':composer});
				
				if(!auto) YKUC.set_selection(composer.e, 0, 0);
				var comm_card = cmtcon.select('.YK_id');
				idcard.hide();
				idcard.bind(comm_card);	
			}.bind(this), {url: ucloader.version+'/u/js/comments.ejs', type: '<' }, {comments: cmts,owner: ids.owner,guest: ids.guestid,ststat: ids.ststat, 'tid': tid});
		}.bind(this);
		
		nova_request(function(res) {
			cmtcb.apply(this, [res, tid]);
		}.bind(this), '/u/stcmts/', {sid: data.sid}, 'get');	
	},
	reply: function(event) {
		var uname, composer, data, reply_data,content;
		this.sources = Event.element(event);
		uname = this.sources.up('.comment').select('.username a')[0].innerHTML+'：';
		content = this.sources.up('.comment').select('.text')[0];
		content = content.cloneNode(1);
		content.down(".username").remove();
		content.down(".pubdate").remove();
		content = content.innerHTML.replace(/<img[^<]+?alt="(.+?)"[^<]+?>/img, "[$1]").replace(/<a[^<]+?>(.+?)<\/a>/img, "$1 ").stripTags().replace(/[\n\t\r]+/ig, ' ');
		composer = this.sources.up('.YK_comments').select('.editor textarea')[0];
		if(composer.value.strip() != '') {
			if(composer.value.indexOf('回复 @') > 0)
				composer.value = '回复 @'+uname+composer.value;
			else
				composer.value = '回复 @'+uname+composer.value.substr(composer.value.indexOf('：')+1);
		} else {
			composer.value = '回复 @'+uname;
		}
		//composer.value += content;
		var _replyTrans = '//@'+ uname + content;
		composer.writeAttribute({"_replyTrans": _replyTrans});
		reply_data = decodeURIComponent('{'+this.sources.up('.comment').getAttribute('data')+'}').evalJSON(1);
		try {
			data = decodeURIComponent('{'+composer.getAttribute('data')+'}').evalJSON(1);
		} catch(e) {data = {}};
		for(var i in reply_data) {
			data[i] = reply_data[i];
		}
		data = JSON.stringify(data).replace(/[{}]/g, '');
		composer.setAttribute('data', encodeURIComponent(data));
		YKUC.set_selection(composer, composer.value.length, composer.value.length);
	},
	del: function(event){
		var element = Event.element(event); 
		try {
			var a = element.up(".feed").down(".panel .feed_comment a").innerHTML;
			a = a.substring(3,a.length-1) - 1;
			element.up(".feed").down(".panel .feed_comment a").innerHTML='评论(' + a + ')';
		} catch(e){};
		element.up('.comment').hide();
		var json_ = element.up('.comment').getAttribute('data');
		var data = decodeURIComponent(json_);
		var params = "";
		var arr = data.split(',');
		for(var index=0;index<arr.length;index++){
			var s = arr[index].split(':');
			s[0] = s[0].substr(1,s[0].length-2);
			params += s[0] + "=" + s[1] + "&";
		}
		var feed_comment = element.up(".feed").down(".panel .feed_comment");
		if(feed_comment) {
			var par = decodeURIComponent('{'+feed_comment.getAttribute("data")+'}').evalJSON(1);
			params += 'owner='+par.owner+'&guestid='+par.guestid;
		} else {
			try {
				var par = decodeURIComponent('{'+element.up('.stream').getAttribute('data')+'}').evalJSON(1);;
				params += 'owner='+par.uid;
			} catch(e) {};
		}
		nova_request(function(){}, '/u/deleteComment/', params, 'post');
	},
	retweet: function(event) {
		var composer, counter, tools, publish, data, params, source, init_content, rrtext;
		this.sources = Element.extend(Event.element(event));
		if(!islogin()) {
			login(function() {window.location.reload()});
			return;
		}
		try {
			data = decodeURIComponent('{'+this.sources.up('.stream').getAttribute('data')+'}').evalJSON(1);
		} catch(e) {return};
		params = {retweet_id: data.sid, retweet_uid: data.uid};
		if(!this.dialog) {
			this.dialog = new Qwindow({
				title:		'',
				size:		{width:460},
				//posrefer:   this.sources,
				//pos	:       {top:-290, left:-300},
				elements:   '',
				showmask:   true,
				content:	{type: 'element', value: $('YK_trans')}
			});	
			$('YK_trans').style.display = 'block';
			this.finish = new Qwindow({
				title:		'',
				size:		{width:180, height:80},
				pos: 		{top:'middle', left:'center'},
				showhandle: false, 
				elements:   '',
				showmask:   true ,
				content:	{type: 'html', value: $('YK_overlay_trans_ok').innerHTML}
			});	
			var msgElem = $(this.finish.dom.winbody).down('[_uc="msg"]');
				msgElem.innerHTML += '转发成功！'
			
			
			composer = $(this.dialog.dom.winbody).down('textarea');
			counter = $(this.dialog.dom.winbody).down('.counter');
			tools = $(this.dialog.dom.winbody).select('.YK_toolbar [act]');
			publish = $(this.dialog.dom.winbody).select('.action [req]')[0]; 
			$('toShare').onchange = function() {
				var data, chk = $('toShare');
				try {
					data = decodeURIComponent('{'+composer.getAttribute('data')+'}').evalJSON(1);
				} catch(e) {data = {}};
				if(chk.checked) data.is_comment = 1;
				else data.is_comment = 0;
				data = encodeURIComponent(JSON.stringify(data).replace(/[{}]/g, ''));
				composer.setAttribute('data', data);
			}.bind(this);
			this.re_composer = new YKUC.Composer(composer, tools, {
				elm_wordcount: counter,
				can_be_null: true,
				btn_publish: publish
			}, function(dialog, finish) {
				//sync
				var data;
				var _reg = new RegExp("(\\d+)",'g'),
			    fElement,
			    fNum,
			    fText;
				try {
					data = decodeURIComponent('{'+composer.getAttribute('data')+'}').evalJSON(1);
				} catch(e) {data = {}};
				if(data.is_comment != 'undefined' && data.is_comment ==1|| data.is_status == 'true'){
					fElement = st.sources.up(".feed").down(".panel .feed_comment a");
					fText = '评论(%)';
					YKUC.updateST(fElement,fText,'+');
				}
			
				fElement = st.sources.up(".feed").down(".panel .feed_trans a");
				fText = '转发(%)';
				YKUC.updateST(fElement,fText,'+');
			
				dialog.hide();
				(function (that) {
					finish.show();
					setTimeout(function(){
						finish.hide();
						if($('YK_notice')) {
							that.ret.link = $('YK_trans').down('.feed .username a').getAttribute('href');
							st.drawStatusData([that.ret]);
						}
					}, 1000);
				}).defer(this);
				
			}, [this.dialog, this.finish]);
				
				//hooks
				this.re_composer.prop.hooks_aftercommit = new Array();
				verifyAfterCommit = function(obj){
					return st.verifyAfterCommit(obj);
				}.bind(this);
				this.re_composer.prop.hooks_aftercommit.push({'isopen':true,'func':verifyAfterCommit});			
				this.re_composer.prop.hooks_beforecommit = new Array();
				verifyBeforeCommit = function(obj){
					return st.verifyBeforeCommit(obj);
				}.bind(this);				
				this.re_composer.prop.hooks_beforecommit.push({'isopen':true,'func':verifyBeforeCommit});
		}
						//验证码
				if(this.re_composer.e.up('.editor').up(0).down(".YK_icode")){
					this.re_composer.e.up('.editor').up(0).down(".YK_icode").remove();
				}	
				var verifycookie = Nova.Cookie.get('stverify');
				if(verifycookie){
					verifytime =new Date();
					if(verifycookie >= verifytime.getTime()){
						st.verifyfun(this.re_composer);
					}
				}

				
		if((source = this.sources.up('.stream').down('.source'))) {
			if(!source.down('.pub_info')) return;
			$(this.dialog.dom.winbody).down('.username').update(source.down('.sourceuser').innerHTML.replace(/转发自/, ''));
			init_content = ' //@'
				+this.sources.up('.stream').down('.username').select('a')[0].innerHTML.stripTags();	
			rrtext = this.sources.up('.stream').down('.text');
			if(rrtext.hasClassName('short')) {
				rrtext = rrtext.up().select('div.more')[0];
			}
			init_content += ' ' + rrtext.innerHTML.replace(/<span\ class="more">.+<\/span>/, '').replace(/<img[^<]+?alt="(.+?)"[^<]+?>/img, "[$1]").stripTags().replace(/[\n\t\r]+/ig, ' ');
		} else {
			source = this.sources.up('.stream');
			$(this.dialog.dom.winbody).down('.username').update(source.down('.username').innerHTML.replace(/<a([^>]+)>([^@])/, '<a$1>@$2'));
		}
		
		$(this.dialog.dom.winbody).down('.text').update(source.down('.text').innerHTML);
		var pubinfo = $(this.dialog.dom.winbody).down('.pub_info');
		if(pubinfo){
			Try.these(function() { pubinfo.remove(); }.bind(this));
		}
		if(source.down('.text').hasClassName('short')) {
			var handle = $(this.dialog.dom.winbody).down('.text').select('a[_click="more"]')[0]
			if(handle){ handle.remove(); }
		}	
		this.re_composer.e.value = init_content || '';
		this.re_composer.prop.pub_params = params;
		this.re_composer.word_count();
		source = source.hasClassName('source')? source.up('.stream') : source;
		/*
		source.appendChild($(this.dialog.dom.winbody));
		source.appendChild($(this.finish.dom.winbody));
		*/
		this.dialog.show();
		YKUC.set_selection(this.re_composer.e, 0, 0);	
	},
	playv: function(event) {
		//this.sources = Element.extend(Event.element(event));
		if('nodeName' in event) {
			this.sources = event;
		} else {
			this.sources = Event.element(event);
			if(this.sources.className == 'icon__tv'){//ico__tv
				this.sources = this.sources.parentNode;
			}
		}
		
		if(this.sources.up('.current') && this.sources.up('.current').tagName.toUpperCase() == 'UL'){ return;  }
		
		var data
		, preview=this.sources.up('.stream').down('.preview')//单个
		, videocoll= this.sources.up('.stream').down('.collgrids')//多个
		, ykplayer, playerbox = {}
		, YK_videolinks = this.sources.up(".stream").down(".YK_videolinks");
		ykplayer = $('YK_player');
		if(!ykplayer) {
			this.sources.href = this.sources.getAttribute('_href');
			this.sources.target = '_blank';
			return;
		}
		ykplayer = ykplayer.cloneNode(1);
		data = decodeURIComponent('{'+this.sources.getAttribute('data')+'}').evalJSON(1);
	
		if(!data.player) return;
		
		try {this.sources.up('.stream.').down('.YK_player').remove()}catch(e){};
		
		ykplayer.id = '';
		playerbox.elm = ykplayer.down('.player_box');
		playerbox.id = playerbox.elm.id = 'pbox'+(new Date().getTime())+''+Math.round(Math.random()*10000);
		if(preview){
			preview.up().insertBefore(ykplayer, preview);
			if(typeof YK_videolinks != 'undefined'){
				YK_videolinks = YK_videolinks.cloneNode(1);
				YK_videolinks.down("li").style.display = 'block';
				ykplayer.appendChild(YK_videolinks);
			}/*
			if(typeof data.showTitle != 'undefined'){
				var player_href = this.sources.getAttribute('_href');
				var player_title = this.sources.getAttribute('title');
				var player_title_html = '<div class="player_title"><a _hz="s_video_title" target="_blank" href="' + player_href + '">' + player_title + '</a></div>';
				ykplayer.innerHTML = player_title_html + ykplayer.innerHTML;
			}*/
			preview.hide();
			ykplayer.show();
		}else if(videocoll){
			videocoll.insert({after : ykplayer});
			var current = videocoll.select('.current')[0];
			var tagName = this.sources.tagName.toUpperCase(); //LI A
			var video = tagName=='LI' ? this.sources.parentNode : this.sources.parentNode.parentNode;
			if(current){ current.removeClassName('current');  }
			video.addClassName('current');
			ykplayer.show();
		}
		
		this.addswf(playerbox.id, data);
	
		//定位播放器位置
		var stream = this.sources.up('.stream');
		if(stream){
			var offset = stream.cumulativeOffset();
			var b = navigator.userAgent.indexOf('AppleWebKit/') > -1 ? document.body : document.documentElement;
			YKUC.effect(b).ani({scrollTop: offset.top - 20}, 'fast', null, function() {});
		}
		
		var videoid = data.player.split('sid/')[1].split('/v.swf')[0];
		//videoid = 'XMjM0OTEwMjA';
		
		var div = new Element('div');
		div.setAttribute('_fn', videoid);
		ykplayer.appendChild(div);
		
		this.drawfn(videoid);
		
	},
	
	Video: function(videoid, up, down){
		this.videoid = videoid;
		this.up = up;
		this.down = down;
		this.token = '';
		this.isup = false;
		if((Nova.Cookie.get("updown_" + videoid)) == 1){ this.isup = true; }
		this.isdown = false;
		if((Nova.Cookie.get("updown_" + videoid)) == -1){ this.isdown = true; }
		this.isfavo = false;
		this.f_up = function(code){
			if(code == 1 || code == 2){
				this.isup = true;
				this.up ++;
				Nova.Cookie.set("updown_"+this.videoid, 1 ,1);
				st.drawfn(this.videoid);
			}else if(code == -1){
				alert('您已经顶过。');
			}else if(code == -2){
				alert('未登录');	
			}else if(code == -4){
				alert('您不能顶自己的视频。');
			}else{
				alert('操作失败。');	
			}
		}
		this.f_down = function(code){
			if(code == 1 || code == 2){
				this.isdown = true;
				this.down ++;
				Nova.Cookie.set("updown_"+this.videoid, -1 ,1);
				st.drawfn(this.videoid);
			}else if(code == -1){
				alert('您已经踩过。');
			}else if(code == -2){
				alert('未登录');	
			}else if(code == -4){
				alert('您不能踩自己的视频。');
			}else{
				alert('操作失败。');	
			}
		}
		this.f_favo = function(code){
			if(code == 1 || code  == 2 || code == -2){
				this.isfavo = true;
				st.drawfn(this.videoid);
			}else if(code == -1){
				alert('未登录');
				return;
			}else if(code == -4){
				alert('您不能够收藏自己的视频。');
			}else{
				alert('操作失败。');
			}
		}		
	},
	
	updownv: function(event){
		var sources = Element.extend(Event.element(event));
		if(sources.tagName.toUpperCase() == 'EM'){
			sources = sources.parentNode;
		}
		
		var videoid = sources.getAttribute('_videoid'); 
		var type = sources.getAttribute('_action');
		var t = this.videos[videoid].token;
		var s = hcbt(t);
			
		var data = '{'
		+ '"videoId":"'+ videoid +'",' 
		+ '"type":"'+ type + '",' 
		+ '"t":"' + t + '",' 
		+ '"s":"' + s + '"'
		+ '}';
		
		var url = 'http://' + ucloader.vdomain + '/QVideo/~ajax/updown?' + '__ap=' + data + '&__callback=st.videos["'+ videoid +'"].f_'+ type;
		
		var updown = function(){
			var script = YKUC.loadScript(url, function(){ 
				script.parentNode.removeChild(script); 
			});	
		}
		
		if(!islogin()){
			login(updown);	
		}else{
			updown();	
		}
		
	},
		
	favov: function(event){
		var sources = Element.extend(Event.element(event));		
		var videoid = sources.getAttribute('_videoid');
		var data = '{'
		+ '"videoId":"'+ videoid +'"'
		+ '}';
		var url = 'http://' + ucloader.vdomain + '/QVideo/~ajax/addFav?' + '__ap=' + data + '&__callback=st.videos["'+ videoid +'"].f_favo';
		
		var favo = function(){
			var script = YKUC.loadScript(url, function(){
				script.parentNode.removeChild(script);
			});	
		}
		
		if(!islogin()){
			login(favo);	
		}else{
			favo();	
		}
	},
	
	drawfn: function(videoid){
		var _this = this;
		var video = this.videos[videoid];
		var draw = function(video){
			YKUC.render(function(html) {
					var fns = $$('div[_fn="'+ video.videoid +'"]');
					if(!fns.length){ return; }
					fns.each(function(fn){
						fn.update(html);
						var f2nds = fn.select('.fn2nd');
						f2nds.each(function(f){
							//IE6 Exception
							f.onmouseover = function(){ try{f.parentNode.addClassName('fn_hover');}catch(e){} }
							f.onmouseout = function(){ try{f.parentNode.removeClassName('fn_hover');}catch(e){} }								
						});
					});
				 }
				,{element: _this.tpl_playerfn, type: '<'} 
				,{
					 'video': video
				 }
			);	
		}		
		if(!video){
			nova_request(function(o){
				if(o){
					if(o.token){
						var video = new _this.Video(o.videoid, o.up, o.down);
						video.token = o.token;
						_this.videos[o.videoid] = video;
						draw(video);
					}
				}
			},'/u/getVideoUpDown',{videoid: videoid},'post');
		}else{
			draw(video);
		}
		
	},
	
	closev: function(event) {
		this.sources = Element.extend(Event.element(event));
		var preview=this.sources.up('.stream').down('.preview')
		, videocoll= this.sources.up('.stream').down('.collgrids')//多个
		, ykplayer = this.sources.up('.stream').select('.YK_player')[0];
		if(preview){
			preview.show();
		}else if(videocoll){
			var current = videocoll.select('.current')[0];
			if(current){
				current.removeClassName('current');	
			}
		}
		ykplayer.hide();
		ykplayer.remove();
	},
	newv: function(event) {
		this.sources = Element.extend(Event.element(event));
		var playerbox = this.sources.up('.YK_player').down('.player_box').down(),
			player = navigator.appName.indexOf("Microsoft") != -1? window[playerbox.id] : playerbox,
			playInfo = {};
		try{
			playInfo = player.getNsData();
		}catch(e){
			return;
		}
		window.PlayerSeek = window.PlayerSeek || function(){};
		window.PlayerPause = window.PlayerPause || function(){};
		var url = 'http://v.youku.com/v_showMini/id_'
		if(playInfo.vidEncoded && playInfo.videoEncoded != 'null'){
			url += playInfo.vidEncoded;
			if(playInfo.time){
				url += ('_ft_'+ playInfo.time);
			}
			url += '.html';
			var win = window.open(url, 'newv', "width=480, height=400, toolbar=no, location=0, menubar=no, scrollbars=no, resizable=no, status=no");
			win.focus();
		}else{
			return;
		}

		this.closev(event);
	},
	addswf: function(id, data) {
		if(typeof SWFObject == 'undefined') {
			YKUC.loadScript(ucloader.swf, this.addswf.bind(this, id, data));
			return;
		}
		
		var fo = new SWFObject(data.player, 'pswf'+id.substr(4), '100%', '100%', 7, '#FFFFFF');

		if(!fo.installedVer.major && data.m3u8) {
			$(id).update('<video width="100%" height="100%" src="'+data.m3u8+'" controls="true"></video>');
		} else {
			if(data.from.indexOf('youku') >= 0) {
				fo.addVariable('playMovie', 'true');
				if(typeof data.miniVideo != 'undefined'){
					fo.addVariable('isAutoPlay', 'false');
				}else{
					fo.addVariable('isAutoPlay', 'true');
				}
				fo.addVariable('auto', 1);
				fo.addVariable('allowFullScreen', 'true');
				fo.addVariable('adss', '0');
				if(data.noRelatedVideo) {
					fo.addVariable('isShowRelatedVideo', 'false');
				}
			}
			if(data.show_ce == 0)fo.addVariable('show_ce',0);
			if(data.showsearch == 0)fo.addVariable('showsearch',0);
			fo.addParam('allowscriptaccess', 'always');
			fo.addParam('wmode', 'transparent');
			fo.addParam('allowfullscreen', 'true');
			fo.write(id);
		}
	},
	parsev: function() {
		var players=$$('.YK_player[data]','.v_player[data]'), len=players.length, p, data, pbox={};
		if(!len) return;
		for(var i=0; i<len; i++) {
			p = players[i];
			data = decodeURIComponent('{'+p.getAttribute('data')+'}').evalJSON(1);
			if(!data || !data.player) continue;
			pbox.elm = p.down('.player_box');
			pbox.id = pbox.elm.id = 'pbox'+(new Date().getTime())+''+Math.round(Math.random()*10000);
			if(i>0){ data.miniVideo = null; }
			this.addswf(pbox.id, data);
		}
	},
	showpage: function(event) {
		this.sources = Element.extend(Event.element(event));
		YKUC.toggle(this.sources.up('.pages').down('.list'));
	},
	pager: function(event) {
		var page, src_status, src_stream, pager_cb, cmtcon, cmtss;
		this.sources = Element.extend(Event.element(event));
		var ids= decodeURIComponent('{'+this.sources.up('.feed').down(".panel .actions .feed_comment ").getAttribute('data')+'}').evalJSON(1);
		page = this.sources.getAttribute('page');
		if(!page || !parseInt(page)) return;
		src_status = this.sources.up('.stream');
		src_stream = ('{'+decodeURIComponent(src_status.getAttribute('data'))+'}').evalJSON(1);
		cmtcon = this.sources.up('.YK_comments');
		cmtss = cmtcon.select('.streams');
		for(var i = 0,len=cmtss.length; i < len; i++) {
			if((len - i) <= 1) {cmtss = cmtss[i];continue;}
			cmtss[i].remove();
		}
		cmtss.update('<div style="text-align:center"><span class="ico__loading_16"></span></div>');
		var tid = src_stream.sid;
		function pager_cb(res) {
			res = typeof res == 'object' ? res : res.stripScripts().evalJSON(true);
			YKUC.render(function(html) {
				cmtss.replace(html);
				(function() {
					cmtcon.down('textarea').focus();
					Try.these(function() {cmtcon.select('.comment').last().addClassName('lastitem')});
				}).defer();
			}, {url: ucloader.version+'/u/js/comments.ejs', type: '<'}, {comments: res, one: true, page: page,owner: ids.owner,guest: ids.guestid, 'tid': tid});
			var new_page = cmtcon.select('.YK_id');
			idcard.hide();
			idcard.bind(new_page);
		}
		nova_request(pager_cb, '/u/stcmts/', {sid: src_stream.sid, page: page}, 'get');
	},
	more: function(event) {
		var cur;
		if(event.tagName){
			this.sources = event;
		}else{
			this.sources = Element.extend(Event.element(event));
		}
		cur = this.sources.up('.text');
		cur.hide();
		if(cur.hasClassName('more')) {
			cur.up().select('div.short')[0].show();
		} else {
			cur.up().select('div.more')[0].show();
		}
	},
	ctdestory: function(event) {
		var data, offsets;
		this.sources = Element.extend(Event.element(event));
		this.stream = this.sources.up('.stream');
		data = ('{'+decodeURIComponent(this.stream.getAttribute('data'))+'}').evalJSON(1);
		offsets = this.sources.cumulativeOffset();
		if(!this.confirm) this.confirm = new YKUC.Confirm('确认删除这条评论？');
		this.confirm.yes(function() {
			nova_request(function(res) {
				var single;
				if(!res) return;
				res = typeof res === 'string'? res.stripScripts() : res;
				if(parseInt(res) > 0) {
					single = this.stream.up('.YK_single');
					if(single) single.update('此条评论已被原作者删除!');
					else YKUC.effect(this.stream).ani({height:'hide'}, 'fast', null, function() {this.remove()});
					Try.these(this.stream.next().hide());
				} else alert(res);
			}.bind(this), '/u/deleteComment', {"cid":data.cid,"cid_uid":data.uid,"owner":data.suid}, 'post');
		}.bind(this));
		this.confirm.setPosrefer(this.sources).setPos(-130,-80).show();
	},
	ctreply: function(event) {
		var uname, composer, data, reply_data, cmtcon, src_stream;
		this.sources = Event.element(event);
		var ids, feed_comment = this.sources.up('.feed_comment');
		if(feed_comment) ids = decodeURIComponent('{'+feed_comment.getAttribute('data')+'}').evalJSON(1);
		else ids = {owner:null, guest:null};
		src_status = this.sources.up('.feed');
		if((cmtcon = src_status.down('.YK_comments'))) {
			return cmtcon.remove();
		}
		cmtcon = src_status.appendChild(YKUC.$C('div')).addClassName('YK_comments');
		cmtcon.update('<div style="text-align:center;"><span class="ico__loading_16"><span></div>');
		cmtcon.style.display = 'block';
		src_stream = decodeURIComponent('{'+src_status.up('.stream').getAttribute('data')+'}').evalJSON(1);
		YKUC.render(function(html) {
			var transchk, cmtorichk;
			cmtcon.update(html);
			counter = cmtcon.down('.counter');
			tools = cmtcon.select('.YK_toolbar [act]');
			publish = cmtcon.select('.action [req]')[0];
			composer = new YKUC.Composer(cmtcon.down('textarea'), tools, {
				elm_wordcount: counter,
				btn_publish: publish,
				pub_params: {status_id: src_stream.sid}
			}, function() {
				if(!this.ret || typeof this.ret != 'object') return;
				YKUC.render(function(html) {
					var div = YKUC.$C('div').update(html);
					div = cmtcon.insertBefore(div.down(), cmtcon.down('.streams'));
					div.style.height = div.getDimensions().height+'px';
					div.style.display = 'none';
					YKUC.effect(div).ani({height:'show'}, 'fast', function(){this.style.height = 'auto'});
				}, {url: ucloader.version+'/u/js/comments.ejs', type: '<' }, {comments:{comments:[this.ret]}, one: true,owner: ids.owner,guest: ids.guestid});
			});
			transchk = src_status.select('input.sharechk')[0];
			cmtorichk = src_status.select('input.cmtorichk')[0];
			transchk.id = 'transchk'+src_stream.sid;
			cmtorichk.id = 'cmtorichk'+src_stream.sid;
			transchk.next('label').setAttribute('for', transchk.id);
			cmtorichk.next('label').setAttribute('for', cmtorichk.id);
			if(typeof src_stream.resid != 'undefined') {
				cmtorichk.up().show();
			}
			transchk.observe('click', function(event){  
				var chk = Event.element(event);
				try {
					data = decodeURIComponent('{'+composer.e.getAttribute('data')+'}').evalJSON(1);
				} catch(e) {data = {}};
				if(chk.checked) data.is_status = true;
				else data.is_status = false;
				data = encodeURIComponent(JSON.stringify(data).replace(/[{}]/g, ''));
				composer.e.setAttribute('data', data);
			}); 
			cmtorichk.observe('click', function(event){  
				var chk = Event.element(event);
				try {
					data = decodeURIComponent('{'+composer.e.getAttribute('data')+'}').evalJSON(1);
				} catch(e) {data = {}};
				if(chk.checked) data.comment_ori = true;
				else data.comment_ori = false;
				data = encodeURIComponent(JSON.stringify(data).replace(/[{}]/g, ''));
				composer.e.setAttribute('data', data);
			}); 
			YKUC.set_selection(composer.e, 0, 0);

			uname = this.sources.up('.stream').select('.username a[href^="http"]')[0].innerHTML+': ';
			if(composer.e.value.strip() != '') {
				if(composer.e.value.indexOf('回复 @') > 0)
					composer.e.value = '回复 @'+uname+composer.e.value;
				else
					composer.e.value = '回复 @'+uname+composer.e.value.substr(composer.e.value.indexOf(':')+1);
			} else {
				composer.e.value = '回复 @'+uname;
			}
			var content = composer.e.up('.feed').down('.text');
			content = content.cloneNode(1);
			content.down(".username").remove();
			content.down(".pubtime").remove();
			content = content.innerHTML.replace(/<img[^<]+?alt="(.+?)"[^<]+?>/img, "[$1]").replace(/<a[^<]+?>(.+?)<\/a>/img, "$1 ").stripTags().replace(/[\n\t\r]+/ig, ' ');
			var _replyTrans = '//@'+ uname + content;
			composer.e.writeAttribute({"_replyTransInit": _replyTrans});
			composer.add_action({'type':'prepub','name':'cmTrans'},function(arg){
					arguments[1].prop.pub_params.status_text = '';
					if( typeof arguments[1].prop.pub_params.is_status != 'undefined' && arguments[1].prop.pub_params.is_status == true){
						var commentTrans = arg.composer.e.readAttribute("_replyTrans");
						if(commentTrans == null || commentTrans.length < 1){
							commentTrans = arg.composer.e.readAttribute("_replyTransInit");
						}
						if(commentTrans == null || commentTrans.length < 1){
							if(typeof arg.composer.e.up(".feed").down(".source") != 'undefined'){
								commentTrans = arg.composer.e.up(".feed").down(".text").innerHTML;
								commentTrans = commentTrans.replace(/<img[^<]+?alt="(.+?)"[^<]+?>/img, "[$1]").replace(/<a[^<]+?>(.+?)<\/a>/img, "$1 ").stripTags().replace(/[\n\t\r]+/ig, ' ');
							}
						}else{
							arg.composer.e.writeAttribute({"_replyTrans": ''});
						}
						if(commentTrans != null && commentTrans.length > 0){
							arguments[1].prop.pub_params.status_text = arguments[1].prop.pub_params.text + ' ' + commentTrans;
						}else{
						    arguments[1].prop.pub_params.status_text = arguments[1].prop.pub_params.text;
						}
					}
			},{'composer':composer});
			
			reply_data = decodeURIComponent('{'+this.sources.up('.stream').getAttribute('data')+'}').evalJSON(1);
			try {
				data = decodeURIComponent('{'+composer.e.getAttribute('data')+'}').evalJSON(1);
			} catch(e) {data = {}};
			for(var i in reply_data) {
				data[i] = reply_data[i];
			}
			data = JSON.stringify(data).replace(/[{}]/g, '');
			composer.e.setAttribute('data', encodeURIComponent(data));
			YKUC.set_selection(composer.e, composer.e.value.length, composer.e.value.length);
		}.bind(this), {url: ucloader.version+'/u/js/comments.ejs', type: '<'}, {comments: {comments:[]},owner: ids.owner,guest: ids.guestid});
	},
	myctdestory: function(event) {
		var data, offsets;
		this.sources = Element.extend(Event.element(event));
		this.stream = this.sources.up('.stream');
		data = ('{'+decodeURIComponent(this.stream.getAttribute('data'))+'}').evalJSON(1);
		offsets = this.sources.cumulativeOffset();
		if(!this.confirm) this.confirm = new YKUC.Confirm('确认删除这条评论？');
		this.confirm.yes(function() {
			nova_request(function(res) {
				var single;
				if(!res) return;
				res = typeof res === 'string'? res.stripScripts() : res;
				if(parseInt(res) > 0) {
					single = this.stream.up('.YK_single');
					if(single) single.update('此条评论已被原作者删除!');
					else YKUC.effect(this.stream).ani({height:'hide'}, 'fast', null, function() {this.remove()});
					Try.these(this.stream.next().hide());
				} else alert('没有删除权限！');
			}.bind(this), '/u/destoryMycm', {"commentId": data.cid, "videoId": data.vid, "delfr":data.fr}, 'post');
		}.bind(this));
		this.confirm.setPosrefer(this.sources).setPos(-130,-80).show();
	},
	video_tips: function(){
		var videoA = $$(".video_wall a")[0],tips = $$('.video_wall .tips')[0];
		if(typeof videoA !='undefined' && typeof tips != 'undefined'){
			Event.observe(videoA, 'mouseover',temp_tips_show);
			Event.observe(videoA, 'mouseout', temp_tips_hide);
		}
		function temp_tips_show(){
			tips.setStyle({display: 'block'});
		}
		function temp_tips_hide(){
			tips.setStyle({display: 'none'});
		}
	},
	ms_atit:function(event) {
		if(ms.atit)ms.atit(event);
	},
	join_pls: function(event) {
		var target = Element.extend(Event.element(event)), i = 0, videos = [], len;
		target = target.up('[_uc="sub"]').select('[_uc="subPlsMenu"]');
		i = len = target.length;
		while(i-- > 0) {
			videos[i] = target[i].id.substr(target[i].id.indexOf('_')+1);
		}
		try { PlayList.add(videos); } catch(e) {}
	},
	chVerifyImg:function(obj){
		$(obj).up(".YK_icode").down("img").src =  "/u/verify?time =" + Math.random();
	},
	verifyfun: function(obj,isremove){
		var verifytype;
		if(isremove && isremove=='remove' && obj.e.up('.editor').up(0).down('.YK_icode') != undefined){
			obj.e.up('.editor').up(0).down('.YK_icode').remove();
			return;
		}
		var verifyParent = obj.e.up('.editor').up(0),verify_input,verify_img;
		var ykicode = '<div class="YK_icode"><label>验证码:</label><input type="text" style="width:110px;" value="请输入右图的字符" class="form_input form_input_s form_input_defaultvalue"><img src="/u/verify?time =' + Math.random() +'" style="height:33px;width:92px;"><span class="action">看不清,<a href="javascript:return false;" onclick="st.chVerifyImg(this);">点此刷新</a></span></div>';
		if((verifytype = verifyParent.getAttribute('_verifytype'))) {
			switch(verifytype){
				case 'mini':
					ykicode = '<div class="YK_icode"><input type="text" style="width:40px;margin-right:5px;"  class="form_input form_input_s form_input_defaultvalue"><img src="/u/verify?time =' + Math.random() +'" style="height:33px;width:92px;margin-right:5px;"><span class="action" style="padding:0;"><a href="javascript:return false;" onclick="st.chVerifyImg(this);">刷新</a></span></div>';
					break;
				default:
					break;
			}
		}
		if(typeof verifyParent.down('.YK_icode') == 'undefined'){
			verifyParent.insert(ykicode);
			verify_input = verifyParent.down('.YK_icode input');
			verify_img   =  verifyParent.down('.YK_icode img')
			Event.observe(verify_input, 'focus', function(){
				verify_input.removeClassName('form_input_defaultvalue');
				if(verify_input.value == '请输入右图的字符'){verify_input.value = '';}
			}.bind(this));	
			Event.observe(verify_input, 'blur', function(){
				verify_input.value = verify_input.value.replace(/(^\s*)|(\s*$)/ig,'');
				if(verify_input.value == '' || verify_input.value == '请输入右图的字符'){
					verify_input.addClassName('form_input_defaultvalue');
					if(verifytype != 'mini'){
						verify_input.value = '请输入右图的字符';
					}else{
						verify_input.value = '';
					}
				}
			}.bind(this));	
		}
					
		verify_input = verifyParent.down('.YK_icode input');
		verify_img   =  verifyParent.down('.YK_icode img');
		if(verifytype != 'mini'){
			verify_input.value = '请输入右图的字符';
		}else{
			verify_input.value = '';
		}
		//verify_img.src = "/u/verify?time =" + Math.random();
		obj.prop.pub_params.verify = null;
		obj.prop.pub_params.verifycode = null;
	},
	verifyBeforeCommit: function(obj){					
		if(obj.e.up('.editor').up(0).down('.YK_icode')){
			var verify_input = obj.e.up('.editor').up(0).down(".YK_icode input");
			if(verify_input.value =='' || verify_input.value == '请输入右图的字符'){
				//alert('请输入验证码');
				var loopnum = 3,currentnum=1;
				var intervalProcess = setInterval(function(){
					if(currentnum%2 == 1){
						verify_input.setStyle({'background-color':'rgb(255, 221, 221)'});
					}else{
						setTimeout(function(){verify_input.setStyle({'background-color':'rgb(255, 255, 255)'});}.bind(this), 100);
					}
					if(currentnum > loopnum){clearInterval(intervalProcess);verify_input.setStyle({'background-color':'rgb(255, 255, 255)'});}
					currentnum++;
				}.bind(this), 300);
				return -1;
			}
			obj.prop.pub_params.verify = 1;
			obj.prop.pub_params.verifycode = verify_input.value;
		}
		return 1;
	},
	verifyAfterCommit: function(obj,cookiename){
		var cookiename = cookiename || 'stverify';
		obj.prop.pub_params.verify = null;
		obj.prop.pub_params.verifycode = null;
		verifytime =new Date();
		if(obj && obj.ret && obj.ret.captcha_expire && obj.ret.captcha_expire > 0){ //验证
			Nova.Cookie.set(cookiename, verifytime.getTime() + obj.ret.captcha_expire, 1, '/', window.location.host);
			obj.ret.captcha_expire = 0;
			st.verifyfun(obj);
			return -1;
		}
					
		verifycookie = Nova.Cookie.get(cookiename);
		if(verifycookie && verifycookie >= verifytime.getTime()){
			st.verifyfun(obj);
		}else{
			if(obj.e.up('.editor').up(0).down('.YK_icode')){
				if('en' in obj.ret) {
					st.verifyfun(obj);
				}else{
					st.verifyfun(obj,'remove');
				}
			}
		}
		return 1;
	}
};

var notify = {
	interval:null,
	pop:null,
	loading: '<div style="text-align:center" style="height:46px;clear:both;"><span class="ico__loading_16"></span></div>',
	sec: 10000,
	since: 0,
	notifyLock: 'open',
	init:function(sec) {
        if (location.host=='u.youku.com' || location.host=='otu.youku.com') return;//老版u盘，不执行该逻辑
		if(this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}
		if(!islogin()) return;
		this.since = this.getSinceId();
		this.interval = setTimeout(this.check.bind(this), 300);
	},
	changeInterval: function(sec) {
		this.sec = sec || 10000;
	},
	getSinceId: function(){
		var sid = 0;
		var ykstream = $$('.YK_stream')[0];
		if(ykstream){
			var newstream = ykstream.down('.stream');
			if(newstream){
				var data = 	newstream.getAttribute('data');
				if(data){
					sid = decodeURIComponent('{'+ data +'}').evalJSON(1).sid; 
				}
			}	
		}
		if(!sid){ sid = 0; }
		return sid;
	},
	
	check: function() {
		if(this.notifyLock != 'close'){
			nova_request(function(res){
				res = typeof res == 'object' ? res : res.stripScripts().evalJSON(true);
				if(!res || typeof res != 'object') {
					clearInterval(this.interval);
					this.interval = null;
					return;
				}
				if('en' in res && res.en == 'ERR_NO_AUTH') {
					clearInterval(this.interval);
					this.interval = null;
					return;
				}
				this.notify(res);
			}.bind(this), '/u/notifynew/?'+new Date().getTime(), {}, 'get');
		}
		this.interval = setTimeout(this.check.bind(this), this.sec);
	},
	reset: function() {
		nova_request(function(){}, '/u/notify/act_reset', {'types':'[1,2,3,4,5,6,7,8,9]'}, 'post');
	},
	resetNew: function(fields) {
		if(!fields)return;
		nova_request(function(ret){}, '/u/notifynew/act_reset', {'fields':fields}, 'get');
	},
	notify: function(res) {
		var  notice, noticehtml = '';
		this.notice = $('YK_notice');
		if(!this.notice) {			
			if(this.notice) Event.observe(this.notice, 'click', this.newst.bind(this));
		}
		if(typeof res.en != 'undefined') return clearInterval(this.interval);
		for(var i in res) {
			if(res.hasOwnProperty(i)) {
				res[i] = parseInt(res[i]);
			}
		}		
		if(this.notice) {
			notice = this.notice.getAttribute('notice');
			if(notice == 'friends_timeline' && res.statuses && res.statuses != 0) {
				if(parseInt(res.statuses) > 99) res.statuses = 99;
				noticehtml += '新增'+res.statuses+'条动态，刷新看看';
				this.notice.store('num', res.statuses);
			}
			if(notice == 'subscribe' && res.subscribe && res.subscribe != 0) {
				if(parseInt(res.subscribe) > 99) res.subscribe = 99;
				noticehtml += '新增'+res.subscribe+'条视频订阅动态，刷新看看';
				this.notice.store('num', res.subscribe);
			}
			if(!noticehtml) return;
			this.notice.down('a').update(noticehtml);
			this.notice.show();
		}
	},
	newst: function(event) {
		var notice;
		if(this.notifyLock != 'close'){
			this.notifyLock = 'close';
			var _temp = this;
			setTimeout(function(){_temp.notifyLock = 'open';}, _temp.sec * 3);
			this.newstExec(event);
			/*
			if(this.notice){
				notice = this.notice.getAttribute('notice');
			}
			if(moreupdate && notice == 'subscribe'){
				moreupdate.newstExec(event);
				this.notifyLock = 'open';
			}else{
				this.newstExec(event);
			}
			*/
		}
	},
	newstExec: function(event) {
		var render_func, type, user_type, notice, streams, num;
		this.sources = Element.extend(Event.element(event));
		st.cmd = this.sources.getAttribute('_click');
		if(!this.sources.hasClassName('YK_notice')) {
			this.sources = this.sources.up('.YK_notice');
		}
		num = this.sources.retrieve('num', 0);
		if(num>20 || st.page != 1){ st.update(1);  return; }
		/*if(num > 20) return window.location.reload();
		if(window.location.href.indexOf('page_') >= 0 || window.location.href.indexOf('page=') >= 0) {
			num = parseInt(window.location.href.substr(window.location.href.indexOf('page')+5));
			if(num > 1) {
				window.location.href = window.location.href.replace(/page([_=])\d+/, 'page$1'+1);
				return;
			}
		}*/

		notice = this.sources.getAttribute('notice');
		if(notice == 'show_statuses') {
			type = 'usertype_timeline';
			user_type = '2';
		} else if(notice == 'star_statuses') {
			type = 'usertype_timeline';
			user_type = '1';
		}
		else if(notice == 'subscribe') {
			type = 'subscribe';
			user_type = '';
		} else{
			type = 'friends_timeline';
			user_type = '';
		}
		streams = this.sources.next('.YK_stream');
		render_func = function(res) {
			loading.remove();
			this.notifyLock = 'open';
			res = typeof res == 'object' ? res : res.stripScripts().evalJSON(true);
			if(!res) return;
			if(!YKUC.isArray(res)) {
				var tmp = [];
				for(var i in res) {
					if(res.hasOwnProperty(i)) {
						tmp.push(res[i]);
					}
				}
				res = tmp;
			}
			st.drawStatusData(res, false, true);
			this.since = res.last().id || this.since;
		};
		this.sources.hide();
		loading = YKUC.$C('div').update(this.loading);
		this.sources.up().insertBefore(loading, this.sources);
		this.since = st.page == 1 ? this.getSinceId() : this.since;//this.since < 1 ? 1 :this.since;
		nova_request(
			render_func.bind(this)
			, st.ajaxurl
			, {type: type, ut:user_type, since: this.since, exself:1}
		);
	}
};

var friends = {
	sources: null,
	oppanel: null,
	pubDialog: null,
	init: function() {
		//var YKuserlist = $$(['.YK_profile', '.YK_userlist', '.YK_stats', '#hotuser', '#minifans']);
		YKuserlist =  $$(['[_uc="friends"]']);
		if(!YKuserlist) return;
		YKuserlist.each(function(o) {Event.observe(o, 'click', this.handler_event.bind(this))}.bind(this));
	},
	handler_event: function(event) {
		var cmd;
		this.sources = Element.extend(Event.element(event));
		if((cmd = this.sources.getAttribute('_click'))) {
			try {friends[cmd](event);Event.stop(event);} catch(e) {alert(e)};
		}
	},
	follow: function(event) {
		var  ftext,preFtext,data, dataElem, frElem, loading = '<span class="ico__loading_16" style="width:20px;margin-left:10px;"></span>';
		if(!islogin()) {
			login(function() {window.location.reload()});
			return;
		}
		this.sources = Element.extend(Event.element(event));
		try{hz.handler_object(this.sources)}catch(e){};
		dataElem = this.sources.up('[_fr="data"]');
		if(!dataElem || !dataElem.getAttribute('data')) return ;
		data = decodeURIComponent('{'+dataElem.getAttribute('data')+'}').evalJSON(0);
		//统计
		if(typeof data.modid != 'undefined') {
			switch(data.modid)
			{
			case 'nav':
				//try{hz.postHz(4006752,1000515)}catch(e){};
				try{hz.postHz(4008108,1000503)}catch(e){};
				break;
			case 'profile':
				try{hz.postHz(4006753,1000515)}catch(e){};
				break;
			case 'page_fans':
				//try{hz.postHz(4006758,1000515)}catch(e){};
				try{hz.postHz(4008457,1000503)}catch(e){};
				
				break;
			case 'page_follow':
				try{hz.postHz(4006757,1000515)}catch(e){};
				break;
			case 'aside_visitor':
				//try{hz.postHz(1,'search_video')}catch(e){};
				break;
			case 'aside_fans':
				try{hz.postHz(4006755,1000515)}catch(e){};
				break;	
			case 'aside_follow':
				try{hz.postHz(4006754,1000515)}catch(e){};
				break;				
			default:
				break;
			}
		}
		if(!data.userid) return;
		data.is_self = $('is_self_exist');
		frElem = this.sources.up('[_fr="elem"]');
		preFtext = this.sources.innerHTML;
		this.sources.innerHTML = loading;
		nova_request(function(res) {
			res = typeof res == 'object' ? res : res.stripScripts().evalJSON(1);
			if('en' in res ) {
				if( res.en == 'ERR_NO_AUTH'){
					login(function() {window.location.reload()});
				}else{
					if(!this.errTips){
						this.errTips = new Qwindow({
							title:		'',
							showmask:   false,
							size:		{width:300, height:100},
							content:	{type: 'html', value: '<div class="talk_tips" style="text-align:center;padding-top:40px;"><div class="msg"><span class="ico__info"></span><span class="txt">11</span></div></div>'}
						});	
					}
					if(res.en == 'ERR_USER_OVERFRIENDS')res.zh = '亲，操作太频繁了哦！';
					$(this.errTips.dom.winbody).down('.txt').update(res.zh);
					this.errTips.show();
					setTimeout(function(){this.errTips.hide()}.bind(this), 2000);
				}
				this.sources.innerHTML = preFtext;
				return;
			}
			this.sources.innerHTML = '';
			if(data.following==1) {
				ftext = '互相订阅';
			} else {
				ftext = '已订阅';
				if(typeof(data.juji) != 'undefined') ftext = '已接受通知';
			}
			if(typeof data.modtype != 'undefined') {
				switch(data.modtype)
				   {
				   case 'nav':
						frElem.innerHTML = '<span class="form_btn_text">'+ ftext +'</span>';
						if(pfans = $$('[_uc="infofans"]')[0]){
							YKUC.updateST(pfans,'%','+');
						}
						frElem.addClassName('form_btn_disabled');
						
						var profile_fr_elem = $('profile_fr_elem');
						profile_fr_elem.innerHTML = '<div class="followed">' + ftext + '<span class="splite">|</span> <a _click="unfollow" href="javascript:;">取消</a></div>';
						
						if (window.location.href.match(/followings/i)) {
						    if(pfans = $$('[_uc="friendsfans"]')[0]){
							    YKUC.updateST(pfans,'粉丝(%)','+');
						    }
						}
						
						QUcenter.showFollowWin(frElem, 1, data.userid);
						hz.postHz(4008212, 1000502);
						
						break;
					case 'profile':
						var profile_fr_elem = $('nav_fr_elem');
						profile_fr_elem.innerHTML = '<span class="form_btn_text">'+ ftext +'</span>';
						profile_fr_elem.addClassName('form_btn_disabled');
						
						frElem.innerHTML = '<div class="followed">' + ftext + '<span class="splite">|</span> <a _click="unfollow" href="javascript:;">取消</a></div>';	
						
						if(pfans = $$('[_uc="infofans"]')[0]){
							YKUC.updateST(pfans,'%','+');
						}

						if (window.location.href.match(/followings/i)) {
						    if(pfans = $$('[_uc="friendsfans"]')[0]){
							    YKUC.updateST(pfans,'粉丝(%)','+');
						    }
						}
						
						QUcenter.showFollowWin(frElem, 1, data.userid);
						hz.postHz(4008211, 1000502);
						
						break;
				   case 'search':
				   case 'friends':
						frElem.innerHTML = ftext;
						 if(data.is_self){
							 if(pfollow = $$('[_uc="infofollow"]')[0]){
								YKUC.updateST(pfollow,'%','+');
							 }
							 if(ffollow = $$('[_uc="friendsfollow"]')[0]){
								YKUC.updateST(ffollow,'订阅(%)','+');
							 }
						 }
						var panelulElem = dataElem.down('[_fr="panelul"]'),
							dataString = '"modtype":"friends","userid":"'+ data.userid +'", "following":"'+ data.following +'", "followed":"1"';
						panelulElem.insert({top:'<li><a href="javascript:;" _click="unfollow">取消订阅</a></li>'});
						dataElem.writeAttribute({data:dataString});
					 break;
				   case 'aside':
						frElem.innerHTML = ftext;
						 if(data.is_self){
							if(pfollow = $$('[_uc="infofollow"]')[0]){
								YKUC.updateST(pfollow,'%','+');
							}
							if(ffollow = $$('[_uc="friendsfollow"]')[0]){
								YKUC.updateST(ffollow,'订阅(%)','+');
							}
						 }
					 break;
				   case 'official'://名人堂页面
						if(data.following==1) {
							ftext = '<span>互相订阅</span>';
						} else {
							ftext = '<span>已订阅</span>';
						}
						frElem.innerHTML = ftext;
						var dataString = '"modtype":"official","userid":"'+ data.userid +'","following":"'+ data.following +'","followed":"1"';
						dataString = encodeURIComponent(dataString);
						dataElem.writeAttribute({data:dataString});
					 break;
				   default:
					 break;
				   }
			}
			var encode_uid = dataElem.down('.YK_id').getAttribute('encode_uid');
			idcard.cache[encode_uid] = null;
			//this.close_subScr_tips(0);
		}.bind(this), '/u/friends/follow_'+ data.userid, {}, 'get');
	},
	unfollow: function(event) {
		var  ftext,preFtext,data, dataElem, frElem,loading = '<span class="ico__loading_16" style="width:20px;margin-left:10px;"></span>';
		if(!islogin()) {
			login(function() {window.location.reload()});
			return;
		}
		
		QUcenter.hideFollowWin();
		
		this.sources = Element.extend(Event.element(event));
		dataElem = this.sources.up('[_fr="data"]');
		if(!dataElem || !dataElem.getAttribute('data')) return ;
		data = decodeURIComponent('{'+dataElem.getAttribute('data')+'}').evalJSON(0);
		if(!data.userid) return;
		data.is_self = $('is_self_exist');
		frElem = dataElem.down('[_fr="elem"]');
		preFtext = this.sources.innerHTML;
		this.sources.innerHTML = loading;
		
		if(typeof data.modid != 'undefined') {
			switch(data.modid)
			{
			case 'nav':
				//try{hz.postHz(4008108,1000503)}catch(e){};
				break;
			case 'profile':
				//try{hz.postHz(4006753,1000515)}catch(e){};
				break;
			case 'page_fans':
				try{hz.postHz(4008461,1000503)}catch(e){};
				break;
			case 'page_follow':
				try{hz.postHz(4008449,1000503)}catch(e){};
				break;
			case 'aside_visitor':
				//try{hz.postHz(1,'search_video')}catch(e){};
				break;
			case 'aside_fans':
				//try{hz.postHz(4006755,1000515)}catch(e){};
				break;	
			case 'aside_follow':
				//try{hz.postHz(4006754,1000515)}catch(e){};
				break;				
			default:
				break;
			}
		}
		
		nova_request(function(res) {
			res = typeof res == 'object' ? res : res.stripScripts().evalJSON(1);
			if('en' in res ) {
				if( res.en == 'ERR_NO_AUTH'){
					login(function() {window.location.reload()});
				}else{
					if(!this.errTips){
						this.errTips = new Qwindow({
							title:		'',
							showmask:   false,
							size:		{width:300, height:100},
							content:	{type: 'html', value: '<div class="talk_tips" style="text-align:center;padding-top:40px;"><div class="msg"><span class="ico__info"></span><span class="txt">11</span></div></div>'}
						});	
					}
					if(res.en == 'ERR_FRIENDSHIPS_DESTROYMUCH')res.zh = '亲，操作太频繁了哦！';
					$(this.errTips.dom.winbody).down('.txt').update(res.zh);
					this.errTips.show();
					setTimeout(function(){this.errTips.hide()}.bind(this), 2000);
				}
				this.sources.innerHTML = preFtext;
				return;
			}
			
			if(data.buttonTitle) {
				ftext = data.buttonTitle;
			} else {
				ftext = '订阅';
			}
			if(typeof data.modtype != 'undefined') {
				switch(data.modtype)
				   {
				   case 'nav':
						//
						break;
					case 'profile':
						frElem.innerHTML = '<div class="form_btn form_btn_s form_btnmaj_s"><span _click="follow" class="form_btn_text">'+ ftext +'</span></div>';
						if(pfans = $$('[_uc="infofans"]')[0]){
							YKUC.updateST(pfans,'%','-');
						}
						var profile_fr_elem = $('nav_fr_elem');
						var usertype =  profile_fr_elem.readAttribute('usertype'); 
						if(!usertype){
							profile_fr_elem.innerHTML = '<span _click="follow" class="form_btn_text">订阅</span>';
						}else{
							if(usertype == 1){
								profile_fr_elem.innerHTML = '<span _click="follow" class="form_btn_text">关注明星动态</span>';
							}else if((usertype == 2)){
								profile_fr_elem.innerHTML = '<span _click="follow" class="form_btn_text">关注节目更新</span>';
							}	 
						}
						profile_fr_elem.removeClassName('form_btn_disabled');
						
						if (window.location.href.match(/followings/i)) {
						    if(pfans = $$('[_uc="friendsfans"]')[0]){
							    YKUC.updateST(pfans,'粉丝(%)','-');
						    }
						}
						 break;
				   case 'search':
				   case 'friends':
						
						 if(data.is_self){
							 if(pfollow = $$('[_uc="infofollow"]')[0]){
								YKUC.updateST(pfollow,'%','-');
							 }
							 if(ffollow = $$('[_uc="friendsfollow"]')[0]){
								YKUC.updateST(ffollow,'订阅(%)','-');
							 }
							if (!window.location.href.match(/followers/i) && !window.location.href.match(/searchUser/i)) {
								window.setTimeout(function(){
									dataElem.next().remove();
									YKUC.effect(dataElem).ani({height:'hide'}, 'fast', null, function(){this.remove()});
								}.bind(this), 1000);
							} else {
								var panelulElem = dataElem.down('[_fr="panelul"]'),
									dataString = '"modtype":"friends","userid":"'+ data.userid +'", "following":"'+ data.following +'", "followed":""';
								dataElem.writeAttribute({data:dataString});
								this.sources.up().remove();
								panelulElem.up().hide();
								panelulElem.up('.dropmenu').removeClassName('dropmenu_expand');
								frElem.innerHTML = '<div class="form_btn form_btn_s form_btnsub_s"><span _click="follow" class="form_btn_text">订阅</span></div>';
							}
						 }else{
								var panelulElem = dataElem.down('[_fr="panelul"]'),
									dataString = '"modtype":"friends","userid":"'+ data.userid +'", "following":"'+ data.following +'", "followed":""';
								dataElem.writeAttribute({data:dataString});
								this.sources.up().remove();
								panelulElem.up().hide();
								panelulElem.up('.dropmenu').removeClassName('dropmenu_expand');
								frElem.innerHTML = '<div class="form_btn form_btn_s form_btnsub_s"><span _click="follow" class="form_btn_text">订阅</span></div>';
						 }				 
					 break;
				   case 'aside':
						//
					 break;
				   default:
					 break;
				   }
			}
			var encode_uid = dataElem.down('.YK_id').getAttribute('encode_uid');
			idcard.cache[encode_uid] = null;
		}.bind(this), '/u/friends/unfollow_'+data.userid, {}, 'get');
	},
	showop: function(event) {
		var it, name, oppanel, hideFun, dropmenu;
		if(!this.sources) this.sources = Element.extend(Event.element(event));
		it = this.sources.getAttribute('it');
		name = this.sources.getAttribute('uname');
		this.sources = this.sources.up('.dropmenu');
		oppanel = this.sources.down('.panel');
		hideFun = (function () {
			var dropmenu = oppanel.up('.dropmenu_expand');
			Event.stopObserving(document, 'click', hideFun);
			if(!dropmenu) return;
			oppanel.hide();
			dropmenu.removeClassName('dropmenu_expand');
		}.bindAsEventListener(this));
		if(this.sources.hasClassName('dropmenu_expand')) {
			oppanel.hide();
			Event.stopObserving(document, 'click', hideFun);
			this.sources.removeClassName('dropmenu_expand');
		} else {
			YKUC.click(document);
			this.sources.appendChild(oppanel);
			oppanel.select('a').each(function(o) {
				o.setAttribute('it', it);
				o.setAttribute('uname', name);
				if(it && it != '他' && o.getAttribute('_click') == 'atit') {
					o.update(o.innerHTML.replace('他', it));
				}
			});
			oppanel.show();
			this.sources.addClassName('dropmenu_expand');
			Event.observe(document, 'click', hideFun);
		}
	},
	unfans: function(event) {
		
		var  ftext,data, dataElem, frElem,loading = '<span class="ico__loading_16" style="width:20px;margin-left:10px;"></span>';
		if(!islogin()) {
			login(function() {window.location.reload()});
			return;
		}
		this.sources = Element.extend(Event.element(event));
		if (window.location.href.match(/followings/i)) {
			try{hz.postHz(4008451,1000503)}catch(e){};
		}else if(window.location.href.match(/followers/i)){
			try{hz.postHz(4008458,1000503)}catch(e){};			
		}else{
			//
		}		
		dataElem = this.sources.up('[_fr="data"]');
		if(!dataElem || !dataElem.getAttribute('data')) return ;
		data = decodeURIComponent('{'+dataElem.getAttribute('data')+'}').evalJSON(0);
		if(!data.userid) return;
		frElem = dataElem.down('[_fr="elem"]');
		data.is_self = $('is_self_exist');
		this.sources.innerHTML = loading;
		

		nova_request(function(res) {
			res = typeof res == 'object' ? res : res.stripScripts().evalJSON(1);

			if(typeof data.modtype != 'undefined') {
				switch(data.modtype)
				   {
				   case 'friends':					
						 if(data.is_self){
							 if(pfans = $$('[_uc="infofans"]')[0]){
								YKUC.updateST(pfans,'%','-');
							 }
							 if(ffans = $$('[_uc="friendsfans"]')[0]){
								YKUC.updateST(ffans,'粉丝(%)','-');
							 }
							if (window.location.href.match(/followers/i)) {
								window.setTimeout(function(){
									dataElem.next().remove();
									YKUC.effect(dataElem).ani({height:'hide'}, 'fast', null, function(){this.remove()});
								}.bind(this), 1000);
							} else {
								var panelulElem = dataElem.down('[_fr="panelul"]'),
									dataString = '"modtype":"friends","userid":"'+ data.userid +'", "following":"", "followed":"'+ data.followed +'"';
								dataElem.writeAttribute({data:dataString});
								this.sources.up().remove();
								panelulElem.up().hide();
								panelulElem.up('.dropmenu').removeClassName('dropmenu_expand');
								if(data.followed) {
									frElem.innerHTML = '已订阅';
								}
							}
						 }else{
								var panelulElem = dataElem.down('[_fr="panelul"]'),
									dataString = '"modtype":"friends","userid":"'+ data.userid +'", "following":"", "followed":"'+ data.followed +'"';
								dataElem.writeAttribute({data:dataString});
								this.sources.up().remove();
								panelulElem.up().hide();
								panelulElem.up('.dropmenu').removeClassName('dropmenu_expand');
								if(data.followed) {
									frElem.innerHTML = '已订阅';
								}
						 }							 
					 break;
				   case 'search':
					    var panelulElem = dataElem.down('[_fr="panelul"]');
					 	this.sources.up().remove();
						panelulElem.up().hide();
						panelulElem.up('.dropmenu').removeClassName('dropmenu_expand');
						if(data.following==1 && data.followed==1) {
							frElem.innerHTML = '已订阅';
						}
						dataString = '"modtype":"search","userid":"'+ data.userid +'", "following":"0", "followed":"'+ data.followed +'"';
						dataElem.writeAttribute({data:dataString});
					 break;
				   case 'aside':
						//
					 break;
				   default:
					 break;
				   }
			}
		}.bind(this), '/u/friends/unfans_'+data.userid, {}, 'get');
	},
	chstar: function(event) {
		if(!this.sources) this.sources = Element.extend(Event.element(event));
		try{hz.handler_object(this.sources)}catch(e){};
		this.sources.up('.extend').replace('<span class="ico__loading_16"></span> 读取中...');
//		nova_request(function(response){	
//			$('hotUser').innerHTML = response;
//			var hot_users = $$('#hotUser .YK_id');
//			idcard.hide();
//			idcard.bind(hot_users);
//		},'/u/hotUser/',{},'get');
		nova_update('hotUser', '/u/hotUser/', {}, 'get', function(){var hot_users = $$('#hotUser .YK_id');try{idcard.hide();idcard.bind(hot_users);}catch(e){}});
	},
	chshotv: function(event) {
		if(!this.sources) this.sources = Element.extend(Event.element(event));
		try{hz.handler_object(this.sources)}catch(e){}
		var pn = parseInt(this.sources.getAttribute('_page')) + 1;
		pn = pn<25?pn:1;//最多翻25页
		this.sources.up('.extend').replace('<span class="ico__loading_16"></span> 读取中...');
		nova_update('hotShow', '/u/hotShow/', {'pn':pn}, 'get');
	},
	init_pub_dialog: function() {
		if(!this.pubDialog) {
			var composer = {}, pubDialog;
			this.pubDialog = pubDialog = new Qwindow({
				title:		'给他留言',
				size:		{width:570},
				content:	{type: 'element', value: $('YK_interaction')}
			});	
			this.finish = new Qwindow({
				title:		'',
				size:		{width:180, height:80},
				pos: 		{top:'middle', left:'center'},
				showhandle: false, 
				elements:   '',
				showmask:   true ,
				content:	{type: 'html', value: $('YK_overlay_trans_ok').innerHTML}
			});	
			var msgElem = $(this.finish.dom.winbody).down('[_uc="msg"]');
				msgElem.innerHTML += '发布成功！'
			
			composer.e = $(this.pubDialog.dom.winbody).down('textarea');
			composer.tools = $(this.pubDialog.dom.winbody).select('.YK_toolbar [act]');
			composer.publisher = $(this.pubDialog.dom.winbody).select('[act="composer.publish"]')[0];
			composer.word_count = $(this.pubDialog.dom.winbody).down('.counter');
			this.pubDialog.composer = new YKUC.Composer(composer.e, composer.tools, {
				btn_publish: composer.publisher,
				elm_wordcount: composer.word_count
			}, function(pubDialog,finish) {
				pubDialog.hide();
				finish.show();
				setTimeout(function(){
					finish.hide();
				}, 1000);
			}, [this.pubDialog, this.finish]);
		}
	},
	atit: function(event) {
		if(!islogin()) {
			login();
			return;
		}
		var it, name, len;
		this.sources = Element.extend(Event.element(event));
		if (window.location.href.match(/followings/i)) {
			try{hz.postHz(4008452,1000503)}catch(e){};
		}else if(window.location.href.match(/followers/i)){
			try{hz.postHz(4008460,1000503)}catch(e){};			
		}else{
			//
		}		
		it = this.sources.getAttribute('it') || '他';
		name = this.sources.getAttribute('uname');
		this.init_pub_dialog(name, it);
		if(!name) return;
		this.pubDialog.dom.winbody.down('h3').update('@对'+it+'说');
		this.pubDialog.composer.e.value = '对@'+name+' 说：';
		this.pubDialog.composer.word_count();
		len = this.pubDialog.composer.e.value.length;
		//YKUC.set_selection(this.pubDialog.composer.e, len, len);
		this.pubDialog.hideTitle().show();
		YKUC.click(document);
	},
	ms_atit:function(event) {
		if(ms.atit)ms.atit(event);
	},
	recit: function(event) {
		var name, desc;
		if(!islogin()) {
			login(function() {window.location.reload()});
			return;
		}
		this.sources = Element.extend(Event.element(event));
		if (window.location.href.match(/followings/i)) {
			try{hz.postHz(4008450,1000503)}catch(e){};
		}else if(window.location.href.match(/followers/i)){
			try{hz.postHz(4008459,1000503)}catch(e){};			
		}else{
			try{hz.handler_object(this.sources)}catch(e){};
		}
		name = this.sources.getAttribute('uname');
		this.init_pub_dialog(name);
		if(!name) return;
		desc = this.sources.getAttribute('desc') || '';
		if(desc) desc = desc.replace(/[ \r\n]{1,}/g, '\ ').substr(0, 200);
		if(desc && desc !='null'){
			desc = desc + ' ';
		}else{
			desc='';
		}

		this.pubDialog.dom.winbody.down('h3').update('推荐给粉丝');
		if(desc == ''){
			this.pubDialog.composer.e.value = '@'+name+' 的视频空间很好看，推荐大家订阅！';
		}else{
			desc = desc.replace(/\[\/*url\]/img,'');
			this.pubDialog.composer.e.value = '@'+name+' 的视频空间很好看，推荐大家订阅！【以下是简介】' + desc;
		}
		this.pubDialog.composer.word_count();
		len = this.pubDialog.composer.e.value.length;
		//YKUC.set_selection(this.pubDialog.composer.e, len, len);
		this.pubDialog.hideTitle().show();
		YKUC.click(document);
	},
	more: function(event) {
		this.sources = Element.extend(Event.element(event));
		var dataEle,moreEle,shortEle;
		dataEle = this.sources.up('[_fr="item"]');
		moreEle = dataEle.down('[_fr="more"]');
		shortEle = dataEle.down('[_fr="short"]');
		if(shortEle.style.display != 'none'){
			shortEle.style.display = 'none';
			moreEle.style.display = 'block';
		}else{
			shortEle.style.display = 'block';
			moreEle.style.display = 'none';
		}
	},
	close_subScr_tips: function(flag) {
		
		var subScribe=$('subScribeTips').hide();
		if(typeof subScribe != 'undefined'){
			subScribe.hide();
		}
		if(flag != 0){
			nova_request(null, '/u/firstrun/?t=SUBSCRIBE');
		}
	},
	open_subScr_tips: function() {
		var subScribe=$('subScribeTips').hide();
		if(typeof subScribe != 'undefined'){
			subScribe.show();
		}	
	},
	showpage: function(event) {
		this.sources = Element.extend(Event.element(event));
		YKUC.toggle(this.sources.up('.pages').down('.list'));
	}
};

var rc = {
		source: null,
		init: function() {
			var YKlist = $$(['[_cc="recommend"]']);
			if(!YKlist) return;
			YKlist.each(function(o) {
				Event.observe(o, 'click', this.handler_event.bind(this));
				this.select_all_init(o);
			}.bind(this));
		},
		handler_event: function(event) {
			var cmd;
			this.source = Element.extend(Event.element(event));
			if((cmd = this.source.getAttribute('_click'))) {
				try {rc[cmd](event);Event.stop(event);} catch(e) {alert(e)};
			}else{
				this.source = this.source.up('[_click]',0);
				if(this.source && (cmd = this.source.getAttribute('_click'))) {
					try {rc[cmd](event)} catch(e) {alert(e)};
				}
			}
		},
		select_all: function(event) {
			var modelem = this.source.up('[_cc="recommend"]');
			var users   = modelem.select('[_u]'); 
			if(!users) return;
			users.each(function(o) {
				o.style.display = 'block';
			});
		},
		select_all_init: function(modelem) {
			var users   = modelem.select('[_u]'); 
			if(!users) return;
			users.each(function(o) {
				o.style.display = 'block';
			});
		},
		Inverse: function(event) {
			var modelem = this.source.up('[_cc="recommend"]');
			var users   = modelem.select('[_u]'); 
			if(!users) return;
			users.each(function(o) {
				if(o.style.display == 'block'){
					o.style.display = 'none';
				}else{
					o.style.display = 'block';
				}
			});
		},
		follow_all: function(event) {			
			var friendIds = '';
			var modelem = this.source.up('[_cc="recommend"]');
			var users   = modelem.select('[_u]'); 
			if(!users) return;
			users.each(function(o) {
				if(o.style.display == 'block'){
					friendIds += '-' + o.getAttribute('_u');
				}
			}.bind(this));
			friendIds = friendIds.replace(/^-/img, "");
			nova_request(function(res) {
				res = typeof res == 'object' ? res : res.stripScripts().evalJSON(1);
				var fElement = $$('#asideProfile [_uc="infofollow"]')[0];
				if('total' in res && res.total > 0) {
					fElement.update(res.total);
				}
				//modelem.hide();
				//fElement.focus();
				setTimeout(function(){
				   location.reload();
				}, 1000);
			}.bind(this), '/u/batchFriends', {"follow":friendIds}, 'post');
		},
		select_user: function(event) {
			var user = this.source.select('[_u]');
			if(!user)return;
			if(user[0].style.display == 'block'){
				user[0].style.display = 'none';
			}else{
				user[0].style.display = 'block';
			}
		}
};


var advert = {
	advert: null,
	init: function() {
		var cl;
		if(!this.advert) this.advert = $('YK_advert');
		if(!this.advert) return;
		cl = this.advert.down('.cl');
		if(cl) Event.observe(cl, 'click', this.close.bind(this));
	},
	close: function(event) {
		Nova.Cookie.set('ucnt', '', -1, null);
		Nova.Cookie.set('ucnt', this.advert.getAttribute('nid'), 30, null, document.domain);
		this.advert.remove();
	}
};

var winevt = {
	mainTalk: null,
	elTop: null,
	offTop: null,
	offHeight: null,
	init: function() {
		this._feedback = this.feedback.bindAsEventListener(this);
		if($$('.YK_gotop')[0]){
			Event.observe(window, 'scroll', this.scrolltop.bind(this));
		}else if($$('.sideTool')[0]){
			Event.observe(window, 'scroll', this.scrolltopsidebar.bind(this));
		}
		Event.observe(window, 'scroll', this._feedback);
		Event.observe(window, 'blur', this.notify.bind(this, 'pause'));
		Event.observe(window, 'focus', this.notify.bind(this, 'continue'));
		if((this.mainTalk = $('YK_talk_main'))) {
			Event.observe(window, 'unload', this.memory.bind(this));
		}
		this.ie6 = Prototype.Browser.IE && parseInt(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE")+5))==6;

	},
	feedback: function(event) {
		var offTop = document.viewport.getScrollOffsets().top,
			offHeight = document.viewport.getDimensions().height,
			feedback = $('feedback');

		if(!feedback) {
			Event.stopObserving(window, 'scroll', this._feedback);
			return;
		}
		if(this.ie6)
			feedback.setStyle({'position': 'absolute', 'top':(offTop + 160)+'px'});
	},
	scrolltop: function(event) {
		var offTop = document.viewport.getScrollOffsets().top,
			offHeight = document.viewport.getDimensions().height;
		if(!this.elTop) {
			this.elTop = $$('.YK_gotop')[0];
			Event.observe(this.elTop, 'click', this.goTop.bind(this));
		}
		if(this.ie6) {
			var h = 90, b = 100;
			this.elTop.setStyle({'top':(offHeight + offTop - 190)+'px'});
		}
		if(!this.elTop) return;
		if(!offTop || !offHeight || offTop < offHeight / 2) {
			this.elTop.style.display = 'none';
		} else {
			this.elTop.style.display = 'block';
		}
		this.offTop = offTop;
		this.offHeight = offHeight;
	},
	scrolltopsidebar: function(event) {
		var offTop = document.viewport.getScrollOffsets().top,
			offHeight = document.viewport.getDimensions().height;
			
		var _this = this;	
		if(!this.elTop_sidebar) {
			this.elTop_sidebar = $$('.sideTool')[0];
			this.elTop_gotop = $('gotop');
			Event.observe(this.elTop_gotop.select('a')[0], 'click', function(){
				_this.goTop();
				return false;
			});
		}
		if(this.ie6) {
			if(this.elTop_gotop.getStyle('display') == 'none')	{
				this.elTop_sidebar.setStyle({'top':(offHeight + offTop - 288)+'px'});
			}else if(this.elTop_gotop.getStyle('display') == 'block'){
				this.elTop_sidebar.setStyle({'top':(offHeight + offTop - 224)+'px'});
			}
		}
		if(!this.elTop_sidebar) return;
		if(!offTop || !offHeight || offTop < offHeight / 2) {
			this.elTop_gotop.setStyle({'display': 'none'});
		} else {
			this.elTop_gotop.setStyle({'display': 'block'});
		}
		this.offTop = offTop;
		this.offHeight = offHeight;
	},
	goTop: function(event) {
		if(this.offTop > 3000) return YKUC.scrollTo(3000, 0);
		YKUC.scrollTo(this.offTop, 0);
		return false;
	},
	memory: function(event) {
		if(!this.mainTalk) return;
		if(this.mainTalk.value == '')
			Nova.Cookie.set('ucmt', '', -1, null, document.domain);
		else
			Nova.Cookie.set('ucmt', YKUC.encode64(this.mainTalk.value.substr(0, 140)), 3, null, document.domain);
	},
	notify: function(type, event) {
		if(type == 'pause') notify.changeInterval(30000);
		else notify.changeInterval();
	}
};
var util = {
	//数字千分格式化
	formatnum: function(n){
		n  =  n+'';   
		if(n.indexOf(',')>0){  
			n = n.replace(/,/gi,'') + '';   
		}  
		var re=/(-?\d+)(\d{3})/; 
		while(re.test(n)){    
			n = n.replace(re,'$1,$2')    
		}
		return n;  
	},
	//补零
	fillzero: function(n){
		if(n<10){ return '0' + n; }
		return '' + n;
	},
	shortDate: function(tp) {
		var d, now = new Date(), delta;
		tp = parseInt(tp);
		if(!tp || isNaN(tp)) return '';
		d = new Date(tp*1000);
		delta = Math.round((now - d) / 1000);
		
		var yyyy = d.getFullYear();
		var mm = d.getMonth() + 1; 		 mm = this.fillzero(mm);  
		var dd = d.getDate();			 dd = this.fillzero(dd);
		var HH = d.getHours();			 HH = this.fillzero(HH);
		var MM = d.getMinutes();		 MM = this.fillzero(MM);
		
		var t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate())/1000;
		var t1 = d.getTime()/1000;
		
		//1分钟内
		if(delta < 60){ return '刚刚'; } 
		//1小时内
		else if(delta < 3600){ return Math.floor(delta/60) +'分钟前'; }
		//当天内
		else if(t1 > t0){ return  Math.floor(delta/3600)+'小时前'; }
		//昨天
		else if(t0 - t1 < 24*3600){ return '昨天 ' + HH + ':' + MM; }
		//前天
		else if(t0 - t1 < 48*3600){ return '前天 ' + HH + ':' + MM; }
		//一周内
		else if(delta < 7*24*3600){ return Math.floor(delta/(24*3600)) + '天前';
		}else{
			//本年内 || 去年但是当前是1月份
			if(yyyy == now.getFullYear() || (now.getFullYear() - yyyy == 1 && now.getMonth()==0)){ return mm + '-' + dd + ' ' + HH + ':' + MM;	 }
			//全年但当前是2月份及以后
			else{ return yyyy + '-' + mm + '-' + dd; }
		}

		return delta;
	},
	timeFormat: function(tp) {
		var d, year, month, day, hour, min, sec;
		tp = parseInt(tp);
		if(!tp || isNaN(tp)) return '';
		d = new Date(tp*1000);
		year = d.getFullYear();
		month = d.getMonth()+1;
		day = d.getDate();
		hour = d.getHours();
		min = d.getMinutes();
		sec = d.getSeconds();
		return year+'-'+YKUC.num_pad(month, 2)+'-'+YKUC.num_pad(day, 2)+' '+YKUC.num_pad(hour, 2)+':'+YKUC.num_pad(min, 2)+':'+YKUC.num_pad(sec, 2);
	},
	jsPager: function(total, page, prop) {
		var pager = {}, zone;
		total = parseInt(total);
		page = parseInt(page);
		if(!total || !page) return;

		prop = prop || {};
		pager.rows = prop.rows || 10;
		pager.nums = prop.nums || 10;
		pager.page = page || 1;
		pager.page_count = Math.ceil(total/pager.rows);
		if(pager.page > pager.page_count)
			pager.page = pager.page_count;
		zone = pager.page - Math.round(pager.nums * 0.6);
		zone = zone < 0? 0 : zone;
		pager.max = pager.nums + zone;
		pager.max = Math.min(pager.page_count, pager.max);
		pager.min = zone + pager.nums;
		if(pager.page_count <= pager.nums)
			pager.min = 1;
		else if(pager.page_count < pager.min)
			pager.min = pager.page_count - pager.nums + 1;
		else
			pager.min = zone + 1;

		return pager;
	},
	/* 当前页居中型分页
	 * 允许显示的页码数量为奇数 
	 * 允许的最小数量为7
	 * 页码数量含pass字符, ...等同一个页码
	 */
	//pn 当前页
	//pz 总页数
	//pm 允许显示的页码数量
	pagerNumWithPass: function(pn, pz, pm){
		if(pn > pz){ pn = pz; }
		//5以上的奇数
		if(pm%2 == 0){ pm = pm+1; }
		if(pm < 7){ pm = 7; }
		var pns = [];
		//直接显示
		if(pz<=pm){ for(var i=1; i<=pz; i++){ pns.push(i); } }
		//超出有省略
		else{
			var pass = '...';
			var offset = (pm-5)/2;
			var l = false;
			var r = false;
			if(pn-offset>2){ l = true; }
			if(pn+offset<pz-1){ r= true; }
			//左侧
			if(l && !r){
				for(var i=pz-(pm-3); i<=pz; i++){ pns.push(i); }
				pns = [1, '...'].concat(pns);
			}
			//右侧
			else if(!l && r){
				for(var i=1; i<pm-1; i++){ pns.push(i); }
				pns = pns.concat('...', pz);	
			}
			//两侧
			else{
				for(var i=pn-offset; i<=pn+offset; i++){ pns.push(i); }
				pns = [1, '...'].concat(pns).concat('...', pz);
			}			
		}
		return pns;	
	}
};

var ucwelcome = {
	dialog: null,
	steps: null,
	mask: null,
	init: function() {
		this.dialog = $('YK_welcome');
		if(!this.dialog) return;
		this.mask = this.dialog.next();
		this.steps = this.dialog.select('.step');
		Event.observe(this.dialog, 'click', this.handler_event.bind(this));
	},
	handler_event: function(event) {
		var cmd;
		this.sources = Element.extend(Event.element(event));
		if((cmd = this.sources.getAttribute('_click'))) {
			try {this[cmd](event);Event.stop(event);} catch(e) {alert(e)};
		}
	},
	next: function(event) {
		var step, elmss;
		this.sources = Element.extend(Event.element(event));
		if((step = this.sources.getAttribute('index')) && (step = parseInt(step)) && step > 0) {
			if(step < this.steps.length) {
				this.steps.each(function(o) {
					if(o.hasClassName('step_'+(step+1))) o.style.display = 'block';
					else o.style.display = 'none';
				});
			} else {
				this.finish();
			}
		}
	},
	finish: function(event) {
		if(event) params = 'GUIDEE';
		else params = 'GUIDE';
		params = 'UPGRADE';
		this.dialog.remove();
		this.mask.remove();
		nova_request(null, '/u/firstrun/?t='+params);
	}
}
var ucguide = {
	guide: null,
	steps: null,
	step: null,
	mask: null,
	guideWin: null,
	guideCard: null,
	guideWinE: null,
	guideCardE: null,
	cookieName: null,
	day: null,
	init: function() {
		this.guide = $('newuserguide');
		if(!this.guide) return;
		this.steps = this.guide.select('.step');
		this.guideWinE = this.guide.down('.YK_guide');
		this.guideCardE = this.guide.down('.YK_guideline');
		this.mask = $$('.YK_mask')[0];
		if(-1 == this.init_func()){
			return;
		}
		Event.observe(this.guideWinE, 'click', this.handler_event.bind(this));
		Event.observe(this.guideCardE, 'click', this.handler_event.bind(this));

	},
	init_func:function(){
		this.cookieName = 'ng'+userid;
		var d = new Date();
		this.day = d.getDate();
		if(this.step = Nova.Cookie.get(this.cookieName)){
			this.step = this.step.split(/-/);
			if(typeof this.step[1] !='undefined' && this.step[1] == this.day){
				return -1;
			}else{
				if(typeof this.step[1] !='undefined'){
					this.step = parseInt(this.step[0]);
				}else{
					this.step = 1;
				}
			}
		}else{
			this.step = 1;
		}
		if(this.step < 1 || this.step > 6){
			this.step = 1;
		}
		if(!this.guideWin) {
				this.guideWin = new Qwindow({
					size	: {width:680, height:500},
					content	: {type:"element", value:this.guideWinE},
					posrefer: window,
					pos: { top:'middle', left:'center' },
					showhandle: true,
					title: "欢迎进入优酷视频空间",
					showmask: true 
				});			
		}
		if(!this.guideCard) {
			this.guideCard = new Qcard({
				pos:'tb',
				content : {type:'element',value: this.guideCardE},
				refer: this.guide.down('.card_step_5'),
				zindex:50000	
			});
		}
		if(this.step <= 4){
			this.guideWinE.style.display = 'block';
			this.guideWinE.down('.step_' + this.step ).style.display = 'block';
			this.guideWin.show();
			switch(this.step){
				case 1:
					this.guideWin.setTitle('欢迎进入优酷视频空间');
					break;
				case 2:
					this.guideWin.setTitle('关注节目更新');
					break;
				case 3:
					this.guideWin.setTitle('关注明星和视频上传者');
					break;
				case 4:
					this.guideWin.setTitle('优酷精选推荐');
					break;					
			}
		}else{
			this.guideCardE.style.display = 'block';
			this.guideCardE.down('.step_'+this.step).style.display = 'block';
			this.guide.down('.card_step_'+this.step).style.display = 'block';
			this.mask.style.display='block';
			this.guideCard.setRefer(this.guide.down('.card_step_'+this.step +' img'));	
			if(this.step == 7){
				this.guideCard.setPos('lr');
			}
			this.guideCard.show();
		}
		Nova.Cookie.set(this.cookieName, this.step+'-'+this.day, 30, '/u/', window.location.host);
		return 1;
	},
	handler_event: function(event) {
		var cmd;
		this.sources = Element.extend(Event.element(event));
		if((cmd = this.sources.getAttribute('_click'))) {
			try {this[cmd](event);} catch(e) {alert(e)};
		}
	},
	next: function(event) {
		var nexstep;
		this.sources = Element.extend(Event.element(event));
		if((this.step = this.sources.getAttribute('index')) && (this.step = parseInt(this.step)) && this.step > 0) {
			if(this.step < this.steps.length) {
				nexstep = this.step+1;
				this.steps[this.step-1].style.display = 'none';
				this.steps[this.step].style.display = 'block';
				if(nexstep<=4){
					switch(nexstep){
						case 1:
							this.guideWin.setTitle('欢迎进入优酷视频空间');
							break;
						case 2:
							this.guideWin.setTitle('关注节目更新');
							break;
						case 3:
							this.guideWin.setTitle('关注明星和视频上传者');
							break;
						case 4:
							this.guideWin.setTitle('优酷精选推荐');
							break;					
					}
				}
				if(this.step >= 4){
					if(this.step == 4){this.guideWin.hide().destroy();}
					if(this.step > 4){this.guide.down('.card_step_'+this.step).style.display = 'none';}
					
					this.guideCardE.style.display = 'block';
					this.guideCardE.down('.step_'+nexstep).style.display = 'block';
					this.guide.down('.card_step_'+nexstep).style.display = 'block';
					if(this.step == 5){window.scrollTo(3000,0)}
					this.mask.style.display='block';
					this.guideCard.setRefer(this.guide.down('.card_step_'+nexstep +' img'));	
					if(nexstep == 7){
						this.guideCard.setPos('lr');
					}
					this.guideCard.show();
				}
				Nova.Cookie.set(this.cookieName, nexstep+'-'+this.day, 30, '/u/', window.location.host);
				this.step++;
			} else {			
				this.close();
				Nova.Cookie.set(this.cookieName, '', -1, '/u/', window.location.host);
				this.finish();
			}
		}
	},
	chtab:function(event){
		var titleE,titleEs,titleId,titleText,titleloop,userList;
		this.sources = Element.extend(Event.element(event));
		titleE = this.sources.up('li');
		titleId = titleE.id;
		titleText = titleE.readAttribute("_title");
		titleEs = this.sources.up('ul').select('li');
		titleEs.each(function(o) {
					if(o.id == titleId){
						o.innerHTML = '<em>'+o.down('a').innerHTML+'</em>';
						o.addClassName('current');
					}else{
						if(typeof o.down('em') == 'undefined'){
							o.innerHTML = '<a _click="chtab" href="javascript:;">'+o.down('a').innerHTML+'</a>';
							o.removeClassName('current');
						}else{
							o.innerHTML = '<a _click="chtab" href="javascript:;">'+o.down('em').innerHTML+'</a>';
						}
					}
					if(titleEs.indexOf(o) < 5){
						o.innerHTML += '<span class="splite">|</span>';
					}		
		});
		userList = this.guideWinE.down('.YK_userlist');
		userList.select('.fans').each(function(o) {
			o.style.display = 'none';
		});
		if(typeof userList.down('[_list="'+titleId+'"]') == 'undefined'){
			nova_request(function(res){
			userList.innerHTML = '<div class="fans" _list="'+titleId+'" >' + res +'</div>' + userList.innerHTML;
			}, '/u/getUsersByCategory/','key='+titleText,'post');
		}else{
			userList.down('[_list="'+titleId+'"]').style.display = 'block';
		}
	},
	follow: function(event){
		friends.follow(event);
	},
	close: function(){
		this.steps[this.step-1].style.display = 'none';
		this.guide.down('.card_step_'+this.step).style.display = 'none';
		this.guideCard.destroy();
		this.mask.remove();
	},
	finish: function() {
		nova_request(null, '/u/firstrun/?t=NEWUSER');
	}
}
var upgradeguide = {
	guide: null,
	guideWinE: null,
	follow:friends.follow,
	changefollow:this.changefollow,
	init: function() {
		this.guide = $('getUsersByCategory_wrap');
		if(!this.guide) return;
		this.completefeed = document.getElementById("completefeed");
		this.feeding = document.getElementById("feeding");
		this.feeding_innull = document.getElementById("feeding_innull");
		this.guideWinE = this.guide.down('.YK_feeding');
		if(this.guideWinE) Event.observe(this.guideWinE, 'click', this.handler_event.bind(this));
		if(this.completefeed) Event.observe(this.completefeed, 'click', this.hideFeed.bind(this));
		if(this.feeding){
			Event.observe(this.feeding, 'click',this.toggleFeed.bind(this));
		}
		if(this.feeding_innull){
			Event.observe(this.feeding_innull	, 'click',this.showFeed.bind(this));
		}
	},
	handler_event: function(event) {
		var cmd;
		this.sources = Element.extend(Event.element(event));
		if((cmd = this.sources.getAttribute('_click'))) {
			try {this[cmd](event);} catch(e) {alert(e)};
		}
	},
	follow_all: function(event){
		this.sources = Element.extend(Event.element(event));
		dataElem = this.sources.up().previous().down('[_frall="follow_all"]');
		if(!dataElem || !dataElem.getAttribute('alluser')) return ;
		allusers = dataElem.getAttribute('alluser');
		allusers.split(',').each(function(o){
			nova_request(function(res){
				
				}, '/u/friends/follow_'+o, {}, 'get');
				if($('_f_'+o)) $('_f_'+o).update('已订阅');
			}
		);
	},
	setLock: function(){
		if($$(".YK_feeding")[0].style.display == "none"){ return false; }
		else{ return true; }
	},
	toggleFeed: function(){
		this.locked = this.setLock();
		if(this.locked == false){
			this.showFeed();
		}else{
			this.hideFeed();
		}
	},
	showFeed: function(){
			var feed = $$(".YK_feeding")[0];
			feed.style.display = "block";
			var feedHeight = feed.offsetHeight;
			var counttime = 500;
			var delaytime = 20;
			var timer = 0;
			feed.style.height = 0;
			timer = window.setInterval(function(){
				feed.style.height = parseInt(feed.style.height) + Math.round(feedHeight/Math.ceil(counttime/delaytime)) + "px";
				if(feedHeight - parseInt(feed.style.height) < Math.round(feedHeight/Math.ceil(counttime/delaytime))){
					window.clearInterval(timer);
					feed.style.height = feedHeight + "px";
					feed.removeAttribute("style");
					$$(".pagetab .form_btn_text")[0].innerHTML="收起列表";
					$$(".pagetab .form_btn_text")[0].removeAttribute("style");
					this.locked = true;
				}
			},delaytime);
	},
	hideFeed: function(){
			var feed = $$(".YK_feeding")[0];
			var feedHeight = feed.offsetHeight;
			var counttime = 500;
			var delaytime = 20;
			var timer = 0;
			feed.style.height = feedHeight + "px";
			timer = window.setInterval(function(){
				feed.style.height = parseInt(feed.style.height) - Math.round(feedHeight/Math.ceil(counttime/delaytime)) + "px";
				if(parseInt(feed.style.height) < Math.round(feedHeight/Math.ceil(counttime/delaytime))){
					window.clearInterval(timer);
					feed.style.height = feedHeight + "px";
					feed.style.display = "none";
					$$(".pagetab .form_btn_text")[0].update("订阅更多");
					this.locked = false;
				}
			},delaytime);
	},
	changefollow: function(event){
		this.sources = Element.extend(Event.element(event));
		dataElem = this.sources.up().next().down('[_change="stor"]');
		if(!dataElem || !dataElem.getAttribute('stor')) return ;
		data = decodeURIComponent('{'+dataElem.getAttribute('stor')+'}').evalJSON(0);
		if(data.catename){
		var that = this;
		if(typeof that.sources.up().next() != 'undefined') that.sources.up().next().update('<div class="collgrid3w"><div class="ico__loading_32" style="display:block"></div></div>');
		nova_request(function(res){
				if(typeof that.sources.up().next() != 'undefined'){
					that.sources.up().next().update(res);
				}
			}, '/u/getUsersByCategory/','catename='+data.catename,'post');

		}
	}
}
var recommenduser = {
	recommend: null,
	guideWin: null,
	guideWinE: null,
	init: function() {
		this.recommend = $('recommendusernew');
		if(!this.recommend) return;
		this.guideWinE = this.recommend.down('.YK_guide');
	
		Event.observe(this.guideWinE, 'click', this.handler_event.bind(this));
		Event.observe(this.recommend, 'click', this.handler_event.bind(this));
	},
	handler_event: function(event) {
		var cmd;
		this.sources = Element.extend(Event.element(event));
		if((cmd = this.sources.getAttribute('_click'))) {
			try {this[cmd](event);} catch(e) {alert(e)};
		}
	},
	chtab0:function(event){
		this.sources = Element.extend(Event.element(event));
		if(!this.guideWin) {
			this.guideWin = new Qwindow({
				size	: {width:680, height:500},
				content	: {type:"element", value:this.guideWinE},
				posrefer: window,
				pos: { top:'middle', left:'center' },
				showhandle: true,
				title: "优酷精选推荐",
				showmask: true 
			});	
			this.guideWin.dom.winclose.onclick = function(){ this.close(); }.bind(this);
		}
		this.guideWinE.style.display = 'block';		
		this.guideWin.show();
		titleEs = this.guideWinE.down('.YK_type').down('ul').select('li');
		titleEs.each(function(o) {
			if(o.readAttribute("_id") == this.sources.readAttribute("_id")){
			//if(o.readAttribute("_id") == this.sources.readAttribute("_id") && typeof o.down('a') != 'undefined' &&  o.down('a').readAttribute("_click") == 'chtab'){
				if(typeof o.down('em') == 'undefined'){
					this.chtab(null,o.down('a') );
				}else{
					this.chtab(null,o.down('em') );
				}
			}
		}.bind(this));
	},
	chtab:function(event,sources){
		var titleE,titleEs,titleId,titleText,titleloop,userList;
		if(typeof sources == 'undefined'){
			this.sources = Element.extend(Event.element(event));
		}else{
			this.sources = sources;
		}
		titleE = this.sources.up('li');
		titleId = titleE.readAttribute("_id");
		titleText = titleE.readAttribute("_title");
		titleEs = this.sources.up('ul').select('li');
		titleEs.each(function(o) {
					if(o.readAttribute("_id") == titleId){
						if(typeof o.down('em') == 'undefined'){
							o.innerHTML = '<em>'+o.down('a').innerHTML+'</em>';
						}else{
							o.innerHTML = '<em>'+o.down('em').innerHTML+'</em>';
						}
						o.addClassName('current');
					}else{
						if(typeof o.down('em') == 'undefined'){
							o.innerHTML = '<a _click="chtab" href="javascript:;">'+o.down('a').innerHTML+'</a>';
							o.removeClassName('current');
						}else{
							o.innerHTML = '<a _click="chtab" href="javascript:;">'+o.down('em').innerHTML+'</a>';
						}
					}
					if(titleEs.indexOf(o) < 5){
						o.innerHTML += '<span class="splite">|</span>';
					}		
		});
		userList = this.guideWinE.down('.YK_userlist');
		userList.select('.fans').each(function(o) {
			o.style.display = 'none';
		});
		if(typeof userList.down('[_list="'+titleId+'"]') == 'undefined'){
			nova_request(function(res){
			userList.innerHTML = '<div class="fans" _list="'+titleId+'" >' + res +'</div>' + userList.innerHTML;
			}, '/u/getUsersByCategory/','key='+titleText,'post');
		}else{
			userList.down('[_list="'+titleId+'"]').style.display = 'block';
		}
	},
	follow: function(event){
		friends.follow(event);
	},
	close: function(){
		this.guideWin.hide();
		setTimeout(function(){
				   location.reload();
		}, 1000);
	}
}

var feedback = {
	feed: null,
	textTouch: null,
	init: function() {
		this.feed = {};
		this.feed.e = $('feedback');
		this.ykret();
		if(!this.feed.e) return;
		this.feed.handle = this.feed.e.down('.handle');
		this.feed.win = this.feed.e.down('.feed');
		this.feed.close = this.feed.e.select('.close');
		this.feed.like = this.feed.e.down('.like');
		this.feed.unlike = this.feed.e.down('.unlike');
		this.feed.text = this.feed.e.down('textarea');
		this.feed.submit = this.feed.e.select('.input button')[0];
		this.textTouch = this.feed.text.value;
		Event.observe(this.feed.handle, 'click', function(){YKUC.toggle(this.feed.win)}.bind(this));
		this.feed.close.each(function(o){
			Event.observe(o, 'click', function(){
				YKUC.toggle(this.feed.win)
			}.bind(this))
		}.bind(this));
		Event.observe(this.feed.like, 'click', this.chlike.bindAsEventListener(this));
		Event.observe(this.feed.unlike, 'click', this.chlike.bindAsEventListener(this));
		Event.observe(this.feed.text, 'focus', this.startedit.bindAsEventListener(this));
		Event.observe(this.feed.text, 'blur', this.startedit.bindAsEventListener(this));
		Event.observe(this.feed.text, 'keypress', this.finishedit.bindAsEventListener(this));
		Event.observe(this.feed.submit, 'click',  this.finishedit.bindAsEventListener(this));
	},
	ykret : function() {
		this.feed.ykret = $$('.YK_return')[0];
		if(!this.feed.ykret) return;
		Event.observe(this.feed.ykret, 'click', this.ykret_handle.bind(this));
	},
	ykret_handle: function(event) {
		var cmd, source = Element.extend(Event.element(event));
		if((cmd = source.getAttribute('_click'))) {
			try {this['ykret_'+cmd](event)} catch(e) {alert(e)};
		}
	},
	ykret_advice: function(event) {
		if(!this.feed.e) {return;}
		var steps = this.feed.e.select('.step');
		this.feed.e.style.display = 'block';
		this.feed.win.style.display = 'block';
		steps[0].show(); steps[1].hide();
		this.feed.like.removeClassName('selected');
		this.feed.unlike.removeClassName('selected');
		this.feed.text.setAttribute('touch', 'no');
		this.feed.text.style.color = '';
		if(this.textTouch) this.feed.value = this.textTouch;
	},
	ykret_close: function(event) {
		this.feed.ykret.remove();
		nova_request(function() {}, '/u/firstrun/t_ROLLTIP', {}, 'get');
	},
	chlike: function(event) {
		var like = Element.extend(Event.element(event));
		while(!like.getAttribute('act')) {
			like = like.up('div');
		}
		if(like.hasClassName('like')) {
			this.feed.unlike.removeClassName('selected');
			this.feed.like.addClassName('selected');
		} else {
			this.feed.like.removeClassName('selected');
			this.feed.unlike.addClassName('selected');
		}
	},
	startedit: function(event) {
		if(event.type.toLowerCase() == 'focus') {
			this.feed.text.value = '';
			this.feed.text.style.color = 'black';
			this.feed.text.setAttribute('touch', 'yes');
		} else if(this.feed.text.value == '' || this.feed.text.value == this.textTouch) {
			this.feed.text.value = this.textTouch;
			this.feed.text.style.color = '';
			this.feed.text.setAttribute('touch', 'no');
		}
	},
	finishedit: function(event) {
		var ipt = YKUC.$C('input'), div = YKUC.$C('div'), from, source, keyword, url, step;
		form = this.feed.e.down('form');
		if(event.type.toLowerCase().indexOf('key')>=0 && (!event.ctrlKey || (event.keyCode != '13' && event.keyCode != '10'))) return;

		if(!this.feed.like.hasClassName('selected') && !this.feed.unlike.hasClassName('selected')) {
			this.overflow(this.feed.like);
			this.overflow(this.feed.unlike);
			Event.stop(event);
			return;
		}

		if(this.feed.text.getAttribute('touch') != 'yes') {
			this.feed.text.value = '';
		}
		if(this.feed.text.value.length > 100) {
			this.feed.text.value = this.feed.text.value.substr(0, 100);
		}

		if(this.feed.like.hasClassName('selected')) {
			this.feed.e.select('input[name="state"]')[0].value = '1';
		} else {
			this.feed.e.select('input[name="state"]')[0].value = '0';
		}
		if(!form.down('.hideParams')) {
			div.hide();
			div.addClassName('hideParams');
			source = div.appendChild(ipt.cloneNode(0));
			source.name = 'source'; source.value = '4';
			url = div.appendChild(ipt.cloneNode(0));
			url.name = 'url'; url.value = window.location.href;
			keyword = div.appendChild(ipt.cloneNode(0));
			keyword.name = 'keyword';
			form.appendChild(div);
		}
		if(event.type.toLowerCase().indexOf('key')>=0) form.submit();
		step = this.feed.e.select('.step');
		step[0].hide(); step[1].show();
		setTimeout(function() {
			YKUC.effect(this.feed.e).ani({opacity:'hide'}, 'fast');
		}.bind(this), 2000);
	},
	overflow: function(e) {
		var times=4, to = null;
		var tt = (function(){
			var t = true;
			return function() {
				if(!t) {
					t = true; this.setStyle({backgroundColor: '#FFDDDD'});
				} else {
					t = false; this.setStyle({backgroundColor: ''});
				}
				if(times-- <= 0) try {clearInterval(to)} catch(e) {};
			}.bind(e);
		})();
		to = setInterval(tt, 150);
	}
}
var badge = {
	init: function() {
		var badges = $('YK_badges');
		if(!badges) return;
		var moyk = badges.select('[_type="moyk"]'); 
		if(!moyk || !moyk.length) return;
		var timer = null,delay=100,card = new Qcard(),cardnode = $(card.getNode());

		cardnode.observe('mouseover', function(){
			clearTimeout(timer);
		});
		cardnode.observe('mouseout', function(){ 
			timer = setTimeout(function(){
				card.hide()
			}, delay);
		});
		moyk.each(function(o) { 
			o.observe('mouseover', function(){ 
				var cardstr = 'badge_' + o.readAttribute('badgetitle'); 
				var cardstrHTML = $(cardstr).innerHTML;
				clearTimeout(timer);
				timer = setTimeout(function(){
					card
					.setContent('html', cardstrHTML)
					.setRefer(o)
					.show();
				}, delay);
				hz.handler_object(o);
			});	
			o.observe('mouseout', function(){ 
				timer = setTimeout(function(){
					card.hide()
				}, delay);
			});			
		}); 
	}
};
var skinset = {
	init: function() {
			var usCorner = $('usCorner'), usBody = $('usBody');
			if(!usCorner) return;
			if(usBody) {
				usCorner.href = 'javascript:;';
				YKUC.loadScript(ucloader.usjs);
			}
	}
};

var BoardContent = {
	addPlayer: function(videoid, videoname, domid, mode){
		var _this = this;
		if(typeof SWFObject == 'undefined') {
			return YKUC.loadScript(ucloader.swf, function(){ _this.addPlayer(videoid, videoname, domid); });
		}
		var fo = new SWFObject(ucloader.player, 'video'+videoname, '100%', '100%', 7, '#FFFFFF');
		fo.addVariable('playMovie', 'true');
		fo.addVariable('VideoIDS', videoid);
		fo.addVariable('winType', mode);
		fo.addVariable('isAutoPlay', 'false');				
		fo.addVariable('auto', 1);
		fo.addVariable('allowFullScreen', 'true');
		fo.addVariable('adss', '0');
		fo.addParam('allowscriptaccess', 'always');
		fo.addParam('wmode', 'transparent');
		fo.addParam('allowfullscreen', 'true');
		fo.write(domid);
	},
	init: function(){
		if(!$('boardhtmlcontent')){ return; }
		var box = $('boardhtmlcontent').up('.YK_box');
		var place = box.scrollWidth > 500 ? 'left' : 'right';
		
		
		var delafterbr = function(dom){
			if(!dom || !dom.nextSibling){ return false; }
			var dom = dom.nextSibling;
			if(dom.tagName){ if(dom.tagName.toUpperCase() == 'BR'){ dom.parentNode.removeChild(dom); return ; } else{  return false;  } }
			else{ return delafterbr(dom); }	
		}
		
		this.videos_show = [];
		var videos = $$('#boardhtmlcontent .v');
		var images = $$('#boardhtmlcontent img')
		for(var i=0, len=videos.length; i<len; i++){ delafterbr(videos[i].parentNode); }
		for(var i=0, len=images.length; i<len; i++){ delafterbr(images[i]); }
		//查重
		for(var i=0, len=videos.length; i<len; i++){
			var videobox = videos[i];
			var videoinfo = videobox.id.split('_');
			var video = {
				'videoid' 	: videoinfo[videoinfo.length-2],
				'domid'		: videobox.id
			}
			var isexist = false;
			for(var j=0; j<this.videos_show.length; j++){
				if(this.videos_show[j].videoid == video.videoid){
					var box = videobox.parentNode; 
					box.parentNode.removeChild(box);
					isexist = true;
					break;
				}	
			}
			if(!isexist){ 
				videobox.style.width = '190px';
				videobox.style.height = Math.ceil(190/4*3 + 10) + 'px';
				this.videos_show.push(video);
			}
		}
		//$('boardhtmlcontent').setStyle({'visibility': 'visible'});
		
		if(place == 'left'){
			this.resetsize('left');
		}else{
			this.resetsize('right');	
		}
	},
	resetsize: function(place){
		var width = 0;
		if(place == 'left'){
			width = 650;	
		}else{
			width = 190;
		}
		$$('.YK_board')[0].setStyle({'width': width + 'px'});
		
		var videos = $$('#boardhtmlcontent .v');
		var images = $$('#boardhtmlcontent img');
		for(var i=0; i<videos.length; i++){
			var video = videos[i];
			video.setStyle({'width': width + 'px', 'height': Math.ceil((width/4)*3 + 10) + 'px' });	
		}
		
		var mode = 'index';
		if(place == 'left'){
			mode = '';	
		}
		$$('#boardhtmlcontent .fBar').each(function(o){
			o.style.fontSize = place == 'left' ? '14px' : '12px';
		});
		for(var i=0; i<this.videos_show.length; i++){
			var v = this.videos_show[i];
			this.addPlayer(v.videoid, v.domid, v.domid, mode);	
		}
		
		for(var i=0; i<images.length; i++){
			var image = images[i];
			var w = parseInt(image.getAttribute('_width'), 10);
			var h = parseInt(image.getAttribute('_height'), 10);
			if(w<width){ width = w; }			
			image.width = width;
			image.height = width/(w/h);	
		}	
	}
}

function favtips() {
	if($('favtips')) nova_request(null, '/u/firstrun/?t=FAV');
}



var vd = {
		source: null,
		init: function() {
			var videoList = $$('[_uc="vd"]');
			if(!videoList) return;
			videoList.each(function(o) {
				Event.observe(o, 'click', this.handler_event.bind(this))
			}.bind(this));
			this.parsev();
			if($('hlbox')) YKUC.loadScript(ucloader.hljs);
		},
		handler_event: function(event) {
			var cmd;
			this.source = Element.extend(Event.element(event));
			if((cmd = this.source.getAttribute('_click'))) {
				try {vd[cmd](event);Event.stop(event);} catch(e) {alert(e)};
			}else{
				this.source = this.source.up('[_click]',0);
				if(this.source && (cmd = this.source.getAttribute('_click'))) {
					try {vd[cmd](event)} catch(e) {alert(e)};
				}
			}
		},
		parsev: function(range) {
			var players=range ? range.select('[_uc="vd"]') : $$('[_uc="vd"]'), len=players.length, p, data, pbox={};
			if(!len) return;
			for(var i=0; i<len; i++) {
				p = players[i];
				pbox.elm = p.down('[_vd="player"]');
				if(!pbox.elm) continue;
				data = decodeURIComponent('{'+pbox.elm.getAttribute('data')+'}').evalJSON(1);
				if(!data || !data.player) continue;
				pbox.id = pbox.elm.id = 'pbox'+(new Date().getTime())+''+Math.round(Math.random()*10000);
				st.addswf(pbox.id, data);
			}
		}
};

var search = {
	source: null,
	init: function() {		
		var YK_search = $$('[_uc="search"]');
		if(!YK_search) return;
		YK_search.each(function(o) {
			Event.observe(o, 'click', this.handler_event.bind(this))
		}.bind(this));	
		
		this.load();		
	},
	handler_event: function(event){
		var cmd;
		this.source = Element.extend(Event.element(event));
		if((cmd = this.source.getAttribute('_click'))) {
			try {search[cmd](event);Event.stop(event);} catch(e) {alert(e)};
		}else{
			this.source = this.source.up('[_click]',0);
			if(this.source && (cmd = this.source.getAttribute('_click'))) {
				try {search[cmd](event)} catch(e) {alert(e)};
			}
		}
	},
	load: function(){
		var rc = $$('#record li');
		for(var i=0;i<rc.length;i++){
			(function(i){
				rc[i].onmouseover = function(){this.className='active';}
				rc[i].onmouseout = function(){this.className='';}
			 })(i);
		}
	},
	clear: function(){
		var rc = $('record');
		var htm = '<div class="null">没有历史记录</div>';
		rc.update(htm);
		Nova.Cookie.set('qh','');
	},
	remove: function(){
		var s = this.source.previous().title;
		if(s=='') return false;
		this.source.up().remove();				
		var sh = decodeURIComponent(Nova.Cookie.get('qh'));
		var shs = sh.split(',');
		var str = '';
		for(var i=0;i<shs.length;i++){
			if(shs[i]==s){
				s = null;
				continue;
			}else{
				str += shs[i]+',';
			}
		}
		Nova.Cookie.set('qh',encodeURIComponent(str.substr(0,str.length-1)));
	},
	fold: function(){
		this.source.next().style.display = 'none';
		this.source.up().addClassName('record_disable');
		this.source.update('展开'+'<span class="arrow"></span>');		
		this.source.setAttribute('_click','unfold');
	},
	unfold: function(){
		this.source.next().style.display = 'block';
		this.source.up().removeClassName('record_disable');
		this.source.update('收起'+'<span class="arrow"></span>');
		this.source.setAttribute('_click','fold');		
	}  		  
};

var idcard = {
	timer: null,
	delay: 400,	
	cache: {},
	card: null,
	uidcurrent: '',
	init: function(){
		try{ this.bind($$('.YK_id'));}catch(e){}
	},
	hide: function(){
		clearTimeout(this.timer);
		if(this.card){
			this.card.hide();
		}
	},
	bind: function(target){
		var _this = this;
		
		//array length=0
		var handles = target 
					? ((!target.length && typeof(target.splice) != 'function')  ?  [target] : target) 
					: [];

		handles.each(function(o){
			_this._addEvent(o, 'mouseenter', function(e){
				clearTimeout(_this.timer);
				var e = e || window.event;
				var eo = {
					'element': e.target || e.srcElement,
					'pos': 	_this._getMousePos(e)
				}
				_this.timer = setTimeout(function(){
					_this.show(o, eo)
				}, _this.delay);
			});
			_this._addEvent(o, 'mouseleave',function(){
				clearTimeout(_this.timer);
				_this.timer = setTimeout(function(){
					_this.hide()
				}, _this.delay);
			});	
		});
	},
	show: function(o, e){
		var _this = this;
		var encode_uid = o.getAttribute("encode_uid");
		if(encode_uid == null || encode_uid ==''){ return; }
		var cardplace = o.getAttribute("cardplace");
		var loading = '<span class="ico__loading_16"></span>';
		this.uidcurrent = encode_uid;
		
		if(!this.card){
			this.card = new Qcard();
			var cardnode = $(this.card.getNode());
			this._addEvent(cardnode, 'mouseenter', function(){
				clearTimeout(_this.timer);
			});
			this._addEvent(cardnode, 'mouseleave',function(){ 
				_this.timer = setTimeout(function(){
					_this.hide()
				}, _this.delay);
			});
		}
		
		this.card
		.setContent('html', loading)
		.setRefer(o)
		.setType(0)
		.setPos(cardplace)
		.show(null, e);

		if('undefined' != typeof(this.cache[encode_uid]) && this.cache[encode_uid] != null){
			this.card.setContent('html', this.cache[encode_uid]);
		}else{			
			var position;
			if(typeof(_hzdata)!='undefined' && typeof(_hzdata.page.ename)!='undefined'){
				position = o.up('[_hzp]'); 
				if(typeof(position) != 'undefined' && position != null){position= position.readAttribute('_hzp');}
			}
			nova_request(function(res){
				var begin = res.indexOf('<tag>');
				var end = res.indexOf('</tag>');
				var data = res.slice(begin+5,end);
				if(_this.uidcurrent==encode_uid){
					_this.card.setContent('html', data);
				}
				_this.cache[encode_uid] = data;
				return;
			},'/u/getUserCard/', {id:encode_uid, pos:position}, 'post');
		}
	},
	follow: function(v,follow,type,eventObj){
		if(!islogin()) {
			login(function() {window.location.reload();});
			return;
		}
		nova_request(function(){
			$$('.qcard .qcard_box .YK_idcard .operate')[0].down('.form_btn').remove();
		},'/u/friends/follow_'+ v, {}, 'get');

		idcard.cache[v] = null;
		var op = $$('.qcard .qcard_box .YK_idcard .operate')[0];

		try{
			var hzpos = op.readAttribute('_hzpos');
			if(hzpos == null)hzpos='';
			hz.handler_object(eventObj,hzpos+'icard_follow');
		}catch(e){};
		
		var od = '<span class="contact">' + op.down('.contact').innerHTML + '</span><div class="clear"></div>';
		if(follow==1){
			op.innerHTML = '<div class="follow_state"><span class="mutual">互相订阅 <span class="splite">|</span> <a href="javascript:;" onclick="idcard.unfollow(\''+v+'\',1,'+type+',this);">取消</a></span></div>'+od+'<div class="clear"></div>';
		}else{
			op.innerHTML = '<div class="follow_state"><span class="followed">已订阅<span class="splite">|</span><a href="javascript:;" onclick="idcard.unfollow(\''+v+'\',0,'+type+',this);">取消</a></span></div>'+od+'<div class="clear"></div>';
		}
		return;
	},
	unfollow: function(v,follow,type,eventObj){
		if(!islogin()) {
			login(function() {window.location.reload();});
			return;
		}

		nova_request(function(){},'/u/friends/unfollow_'+ v, {}, 'get');
		idcard.cache[v] = null;
		var op = $$('.qcard .qcard_box .YK_idcard .operate')[0];
		try{
			var hzpos = op.readAttribute('_hzpos');
			if(hzpos == null)hzpos='';
			hz.handler_object(eventObj,hzpos+'icard_unfollow');
		}catch(e){};
		
		var od = '<span class="contact">' + op.down('.contact').innerHTML + '</span><div class="clear"></div>';
		if(type==1 || type==2){
			var str = '<div class="follow_state"><div class="form_btn form_btn_s form_btnmaj_s"><span class="form_btn_text" onclick="idcard.follow(\''+v+'\','+follow+','+type+',this);">订阅更新</span></div></div>'+od;
		}else{
			var str = '<div class="follow_state"><div class="form_btn form_btn_s form_btnmaj_s"><span class="form_btn_text" onclick="idcard.follow(\''+v+'\','+follow+','+type+',this);">订阅</span></div></div>'+od;
		}
		op.update(str);
		return;
	},
	atit: function(v,it,name){
		if(!islogin()) {
			login(function() {window.location.reload();});
			return;
		}
		
		friends.init_pub_dialog(name, it);
		if(!name) return;
		friends.pubDialog.dom.winbody.down('h3').update('@对'+it+'说');
		friends.pubDialog.composer.e.value = '对@'+name+' 说：';
		friends.pubDialog.composer.word_count();
		len = friends.pubDialog.composer.e.value.length;
		friends.pubDialog.hideTitle().show();
		YKUC.click(document);
	},
    pmsgShow: function(node){   // 私信
        if (node.getAttribute('_uc') == 'st_send_pmsg'){
            this.hide();
            privateMsg_box.show(node);
        }
    },
	_addEvent: function(dom, eventname, func){
		if(window.addEventListener){
			if(eventname == 'mouseenter' || eventname == 'mouseleave'){
				function fn(e){
					var a = e.currentTarget, b = e.relatedTarget;
					if(!elContains(a, b) && a!=b){
						func.call(e.currentTarget,e);
					}	
				}
				function elContains(a, b){
					try{ return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16); }catch(e){}
				}
				if(eventname == 'mouseenter'){
					dom.addEventListener('mouseover', fn, false);
				}else{
					dom.addEventListener('mouseout', fn, false);
				}
			}else{
				dom.addEventListener(eventname, func, false);
			}
		}else if(window.attachEvent){
			try{ dom.attachEvent('on' + eventname, func);}catch(e){}
		}
	},
	_getMousePos: function(e){ 
		var x = 0, y = 0;
		var e = e || window.event;
		var windowscroll = {
			'top': document.documentElement ? document.documentElement.scrollTop + document.body.scrollTop : document.body.scrollTop,
			'left':	document.documentElement ? document.documentElement.scrollLeft + document.body.scrollLeft : document.body.scrollLeft
		}
		return {
			x: e.clientX + windowscroll.left,
			y: e.clientY + windowscroll.top
		};
	}
};

var msg = {
	mail_msg: null,
	init: function(){
		if($('home_email_verify')===null|| $('home_email_verify').down()===null) return ;
		var _this = this;
		_this.mail_msg = $('home_email_verify');
		Event.observe(_this.mail_msg.down(2).next(1),'click',function(){ _this.no_mail();});
		Event.observe(_this.mail_msg.select('[_resend="1"]')[0],'click',function(){ _this.re_send();});
	},
	no_mail: function(){
		this.mail_msg.down(1).style.display = 'none';	 
		this.mail_msg.down(1).next().style.display = 'block';		 
	},
	re_send: function(){
		var _this = this;
		if(!islogin()) alert('请先登录！');
		nova_request(function(r){
			if(r==1){
				_this._prompt(1,170,50,"邮件发送成功");
				_this.mail_msg.down(1).style.display = 'block';
				_this.mail_msg.down(1).next().style.display = 'none';
			}else if(r==-2){
				_this._prompt(2,170,50,"邮件发送失败");
			}
		},'/user/validateMail/',{},'get')
	},
	_prompt: function(type,w,h,msg){
		var _cls1,_cls2;
		if(type==1){//success
			_cls1 = 'YK_overlay_modifysuccess';
			_cls2 = 'ico__success';
		}else if(type==2){//fail
			_cls1 = 'YK_overlay_modifyfail';
			_cls2 = 'ico__prompt';
		}
		var _htm = '<div class="'+_cls1+'" style="display:block;"><div class="prompt"><h6><span class="'+_cls2+'"></span>'+msg+'</h6></div></div>';
		var win = new Qwindow();
		win.setSize(w,h).setContent('html',_htm).hideHandle().show();
		setTimeout(function(){ win.hide().destroy();},1500);
	}		 
};

var hz = {
	source: null,
	hzsource: null,
	init: function() {
		var YKstream = $$('body')[0];
		if(!YKstream) return;
		Event.observe(YKstream, 'click', this.handler_event.bind(this));
	},
	handler_event: function(event) {
		var hzname;
		this.source = Element.extend(Event.element(event));
		this.hzsource = this.source;
		if((hzname = this.hzsource.getAttribute('_hz'))) {
			try {this.parseHz(hzname);} catch(e) {};
		}else{
			this.hzsource = this.hzsource.up('[_hz]',0);
			if(this.hzsource && (hzname = this.hzsource.getAttribute('_hz'))) {
				try {this.parseHz(hzname);} catch(e) {};
			}
		}
	},
	handler_object: function(o,hzname) {
		if(hzname){
			this.parseHz(hzname);return;
		}
		var hzname;
		this.source = o;
		this.hzsource = this.source;
		if((hzname = this.hzsource.getAttribute('_hz'))) {
			try {this.parseHz(hzname);} catch(e) {};
		}else{
			this.hzsource = this.hzsource.up('[_hz]',0);
			if(this.hzsource && (hzname = this.hzsource.getAttribute('_hz'))) {
				try {this.parseHz(hzname);} catch(e) {};
			}
		}
	},
	parseHz:function(hzname){
        if(typeof(_hzdata) == 'undefined' || typeof(_hzdata.page) == 'undefined' || _hzdata.page.isopen != true || hzname == 'undefined' || typeof(_hzdata[hzname]) =='undefined')return;
		var hzdata = _hzdata[hzname],hzpageid = hzdata.pid || _hzdata.page.id;
		if(hzdata.type == 1){ //normal
			this.postHz(hzdata.id,hzpageid);
		}else if(hzdata.type == 2){ //YK_box
			switch(hzdata.box){
				default:
					break;
				case 1:
					try{
						if(this.source.up("a",0).href.match(/helpsPreview/i)){
							this.postHz(hzdata.help,hzpageid);
						}
					}catch(e){
						//alert(e);
					}
					break;
				case 2:
					try{
						if(this.source.nodeName.match(/a/i) || (this.source = this.source.up("a",0))){
							if(this.source.up(0).nodeName.match(/h3/i)){
								this.postHz(hzdata.topic,hzpageid);
							}else{
								this.postHz(hzdata.title,hzpageid);
							}
						}
					}catch(e){
						//alert(e);
					}
					break;
				case 3:
					try{
						if(this.source.nodeName.match(/a/i) || (this.source = this.source.up("a",0))){
							if(this.source.up(0).nodeName.match(/h3/i)){
								this.postHz(hzdata.activity,hzpageid);
							}else{
								this.postHz(hzdata.activitypic,hzpageid);
							}
						}
					}catch(e){
						//alert(e);
					}
					break;
			}
		}else if(hzdata.type == 3){ // 
		
		}else if (hzdata.type == 4) {		
			this.postHz(hzdata.id,hzpageid);
			if((hzparams = this.hzsource.getAttribute('_hzparams'))) {
				try {this.postHz2(hzparams);} catch(e) {};
			}else{
				this.hzsource = this.hzsource.up('[_hzparams]',0);
				if(this.hzsource && (hzparams = this.hzsource.getAttribute('_hzparams'))) {
					try {this.postHz2(hzparams);} catch(e) {};
				}
			}
		}
	},
	postHz:function(cp,cpp){
		if(cp>0 && cpp>0){
			var url = 'http://hz.youku.com/red/click.php?tp=1&cp=' + cp +'&cpp=' + cpp + '&time='+Math.random()+'&url=#';
//			var script = $('hzscript');
//			if(script == null){
//				script = document.createElement("script");
//				script.id = 'hzscript';
//			}
//			YKUC.loadScript(url,function(){},script);
			var img = $('hzImg');
			if(img == null){
				img = new Image(1,1);
				img.id = 'hzImg';
				img.onload = function(){return;}
				document.body.appendChild(img);
			}
			img.src = url;
		}
	},
	postHz2:function(params){//relatedVideo
		if (typeof(params) == 'string'){
			var o = params.evalJSON();
			var query = '';
			for (var e in o) query += e.toString() + '=' + o[e] + '&';
			var url = 'http://hz.youku.com/red/relatedVideoClick.php?'+ query + 'time='+Math.random();
//			var script = $('hz2script');
//			if(script == null){
//				script = document.createElement("script");
//				script.id = 'hz2script';
//			}
//			YKUC.loadScript(url,function(){},script);
			var img = $('hz2Img');
			if(img == null){
				img = new Image(1,1);
				img.id = 'hz2Img';
				img.onload = function(){return;}
				document.body.appendChild(img);
			}
			img.src = url;
		}
	}
};

var searchvideo = {
	source: null,
	s_form: null,
	s_input: null,
	s_btn: null,
	s_card: null,
	init: function() {
		this.s_form = $('searchvideoform'),this.s_input = $('searchvideoinput'),this.s_btn = $('searchvideobtn');
		if(!this.s_form) return;
		//Event.observe(this.s_form, 'click', this.handler_event.bind(this));
		this.s_init();
	},
	s_init: function(){
		//改写默认enter提交
		this.s_input.onkeydown=function(event){	
          e = event ? event :(window.event ? window.event : null);
			if(e.keyCode==13){
				  this.s_input.value = this.s_input.value.replace(/(^\s*)|(\s*$)/ig,'');
				  YKUC.click(this.s_btn);
				  return;
			}
		 }.bind(this);
		 
		this.s_input_init_v = this.s_input.readAttribute('_init_v');
		if(!this.s_input_init_v)this.s_input_init_v = '';
		
		this.s_input.value = this.s_input.value.replace(/(^\s*)|(\s*$)/ig,'');
		if(this.s_input.value == '' || this.s_input.value == this.s_input_init_v){this.s_input.addClassName('form_input_defaultvalue');}
		Event.observe(this.s_input, 'focus', function(){
			this.s_input.removeClassName('form_input_defaultvalue');
			if(this.s_input.value == this.s_input_init_v){this.s_input.value = '';}
			this.hidecard();
		}.bind(this));	
		Event.observe(this.s_input, 'blur', function(){
		    this.s_input.value = this.s_input.value.replace(/(^\s*)|(\s*$)/ig,'');
			if(this.s_input.value == '' && this.s_input_init_v){this.s_input.value = this.s_input_init_v;}
			if(this.s_input.value == '' || this.s_input.value == this.s_input_init_v){this.s_input.addClassName('form_input_defaultvalue');}
			this.hidecard();
		}.bind(this));	
		Event.observe(this.s_btn, 'click', function(){
			try{hz.handler_object(1,'search_video')}catch(e){};
		    this.s_input.value = this.s_input.value.replace(/(^\s*)|(\s*$)/ig,'');
			if(this.s_input.value == '' || this.s_input.value == this.s_input_init_v){
				this.showcard();return;
			}else{
				this.s_submit();
			}
		}.bind(this));
	},
	s_submit: function(){
		if (window.location.href.match(/view_2/i)) {
			this.s_form.action = this.s_form.action + 'view_2';
		} 
		this.s_form.submit();
	},
    showcard: function(){
		if(this.timer)clearTimeout(this.timer);
        if(!this.s_card){ this.s_card = new Qcard(); }
        this.s_card
        .setRefer(document.getElementById("searchvideoinput").parentNode)
        .setContent('html',document.getElementById("searchLayer").innerHTML)
		.hide();
		$(this.s_card.getNode().down('.qcard_content')).setStyle({ minWidth: '120px',  width: '120px'}); 
        this.s_card.show();
        this.timer = setTimeout(function(){ this.hidecard(); }.bind(this),3000);
    },
    hidecard: function(){
        if(!this.s_card)return;
		if(this.timer)clearTimeout(this.timer);
        this.s_card.hide();
    }
};


/*新首页*/
/*我正在看*/
var watchinglist = {
	pagenum: 1,
	perpage: 8,
	data: [],
	init: function(){
		var type = 'show';
		this.panel = $('watchinglist_panel');
		this.pager = $('watchinglist_pager');
		var datanode = $('watchinglist_data');
		if( this.panel && this.pager && datanode){
			var data = datanode.text.split('----------');
			var tmp = [];
			for(var i=0; i<data.length; i++){
				if(data[i].indexOf('item') != -1){
					tmp.push({index:tmp.length,  html:data[i]});	
				}	
			}
			this.data = tmp;
			if(this.data.length){ this.showPage(1); }
		}
	},
	bind: function(){
		var _this = this;
		this.pager.select('[_pn]').each(function(p){
			Event.observe(p, 'click', function(){ 
				var pn = p.getAttribute('_pn');
				_this.showPage(pn);
			});
		});	
		
	},
	showPage: function(n){
		var n = parseInt(n, 10);
		if(n==1 && !this.data.length){
			this.panel.innerHTML = '<div class="null" style="float:none;text-align:center;padding:20px 0 20px 0;">没有播放记录</div>';	
			return null;	
		}
		var start = (n-1)*this.perpage;
		var end = start + this.perpage - 1;
		if(start>this.data.length-1){ return null; }
		if(end>this.data.length-1){ end = this.data.length-1; }
		var data = this.data.slice(start, end+1);
		this.pagenum = n;
		this.panel.update('');
		for(var i=start; i<=end; i++){
			var node = this.parseOne(i);
			if(node){
				this.panel.appendChild(node);
			}	
		}
		this.pager.update(this.parsePager(n));
		this.bind();
		
		return this;
	},
	parseOne: function(index){
		var d = this.data[index];
		if(!d){ return null; }
		var o = new Element('div');
		o.setAttribute('index', d.index);
		o.update(d.html);
		//xp IE img load bug
		setTimeout(function(){
			var img = o.select('img')[0];
			var src = img.getAttribute('_src');
			img.src = src;
		}, Math.random(100));	
		var handle = this.getDelhandle(o);
		if(handle){
			handle.setAttribute('index', d.index);	
		}
		var _this = this;
		var isTouch = ("createTouch" in document) && ('ontouchstart' in window);
		var del = o.select('.r_action')[0];
		var conti = o.select('.r_continue')[0];
		if(del){	
			if(isTouch){
				del.show();
				conti.show();				
			}else{
				Event.observe(del.parentNode, 'mouseover', function(){
					if(del){ del.show(); }
					if(conti){ conti.show(); }
				});
				Event.observe(del.parentNode, 'mouseout', function(){
					if(del){ del.hide(); }
					if(conti){ conti.hide(); }
				});
			}
			Event.observe(del.select('a em')[0], 'click', function(){
				var index = parseInt(del.select('a em')[0].getAttribute('index'));
				_this.delOne(index);	
			});
		}
		
		return o;
	},
	getDelhandle: function(o){
		var handle = o.select('.r_action a em')[0]
		if(handle){
			return handle;	
		}
		return null;
	},
	delOne: function(index){
		var o = this.panel.select('[index='+index +']')[0];
		if(o){
			var d = eval('(' + decodeURIComponent(o.select('.item')[0].getAttribute('delinfo')) + ')');
			var delurl = 'http://yus.navi.youku.com/playlog/delete.json?'
					+ 'token=' + d.token
					+ '&v=' + d.videoid
					+ '&fid=' + d.folderid
					+ '&shid=' + d.showid
					+ '&' + Math.random();
			o.remove();
			//发送删除
			var img = new Image();
			img.src = delurl;
			//整理数据
			for(var i=0; i<this.data.length; i++){
				if(this.data[i].index == index){
					this.data.splice(i, 1);
					break;	
				}
			}
			if(!this.showPage(this.pagenum)){
				if(this.pagenum-1 >= 1){
					this.showPage(this.pagenum-1);	
				}	
			}
		}
		
		return this;	
	},
	parsePager: function(pn){
		
		var  pt =  Math.ceil(this.data.length/this.perpage)
			,prev = pn-1
			,next = pn+1
			,pns = util.pagerNumWithPass(pn, pt, 7)
			,html = '';
		
		//少于两页不显示分页
		if(pt<2){ return html; }
			
		if(pn==1){
			html += '<a class="arrow disable" href="javascript:;">&lt;&lt;上一页</a>';
		}else{	
			html += '<a class="arrow" _pn="'+ prev +'" onclick="hz.postHz(4007489, 1000502)" href="javascript:;">&lt;&lt;上一页</a>';
		}
		if(pn==pt){
			html += '<a class="arrow disable" href="javascript:;">下一页&gt;&gt;</a>';
		}else{
			html += '<a class="arrow" _pn="'+ next +'" onclick="hz.postHz(4007490, 1000502)" href="javascript:;">下一页&gt;&gt;</a>';
		}
		
		
		return html;
	}
		
}
/*猜我喜欢*/
var guesslike = {
	minlength: 9,//每页数量，预存储的最小数量
	data: [],//数据队列
	pn: 1,//请求页码
	count: 0, //位置索引
	lock: false,//数据加载状态锁
	init: function(){
		this.h = $('likelist_handler');
		this.p = $('likelist_panel');
		if(!this.h || !this.p){ return; }
		var datanode = $('likelist_data');
		if(!datanode){ return; }
		var data = datanode.text.split('----------');
		var tmp = [];
		for(var i=0; i<data.length; i++){
			if(data[i].indexOf('nv') != -1){ tmp.push(data[i]);}	
		}
		this.data = tmp;
		if(this.data.length){
			this.data.splice(0, this.minlength);
			this.updateIndex();
			this.showHandler();	
			this.bind();
		}
		this.markreadystate();
	},
	bind: function(){
		var _this = this;
		this.p.select('.nv').each(function(v, index){
			_this.bindv(v);
		});
	},
	bindv: function (v){
		var _this = this;
		var thumb = v.select('.nv_link')[0];
		var title = v.select('.nv_title a')[0];
		var data = eval('(' + v.readAttribute('logdata') + ')');
		data.pos = v.getAttribute('pos');
		Event.observe(thumb, 'click', function(){ _this.postLog(data); });
		Event.observe(title, 'click', function(){ _this.postLog(data); });
		var unlike = v.select('.delete')[0];
		if(!unlike){ return node; }
		Event.observe(unlike, 'click', function(){
			unlike.hide();
			if(unlike.getAttribute('unlike') != 'true'){
				unlike.setAttribute('unlike', 'true');
				_this.unlike(v);		
			}			
		});
	},
	//换一换
	change: function(){
		if(this.h.innerHTML != ''){ this.h.innerHTML = '<div class="ico__loading_16"></div>'; }
		var _this = this;
		if(this.data.length < this.minlength){
			this.updateData(function(){
				_this.showList();			
			});
		}else{
			this.showList();
		}
	},
	//不喜欢
	unlike: function(v){
		var _this = this;	
		YKUC.effect(v.parentNode).ani({opacity: 0}, 'fast', null, function(){ 
			var node = _this.parseOne(0);
			if(node){
				node.setStyle({'opacity': 0});
				v.parentNode.insert({'after': node});
				YKUC.effect(node).ani({opacity: 100}, 'normal');
				_this.bindv(node.select('.nv')[0]);		
			}
			v.parentNode.remove();
			_this.updateIndex();
		});
		//及时补充后备项
		if(this.data.length <= this.minlength){ 
			if(!this.lock){ this.updateData(); }//未返回防止重复	
		}		
	},
	record: {
		maxlength: 100,//排除视频的最大数量
		cookiename: 'unlikeids',//记录cookie名称
		get: function(){
			var d = Nova.Cookie.get(this.cookiename);
			if(!d){ 
				return []; 
			}
			return d.split(',');	
		},
		add: function(id){
			var d = this.get();
			if(!this.check(id)){
				d.push(id);
				//超出容量消除第一个
				if(d.length > this.maxlength){
					d.unshift();	
				}
				Nova.Cookie.set(d.join(','));
				return true;
			}
			return false;
		},
		//检测是否存在
		check: function(id){
			var d = this.get();
			for(var i=0; i<d.length; i++){
				if(d[i] == id){
					return true;
				}		
			}
			return false;
		}
	},
	//显示列表
	showList: function(){
		this.p.update('');
		if(this.data.length){
			var mx = this.data.length>this.minlength ? this.minlength : this.data.length;
			var count = 0;
			var cls = YKUC.$C('div').addClassName('clear');
			while(count < mx){ 
				var node = this.parseOne(0);
				if(node){
					this.p.appendChild(node); 
					count++; 
					if(count % 3 == 0){
						this.p.appendChild(cls.cloneNode(true));
					}
				}
			}
			this.p.appendChild(cls.cloneNode(true));
		}else{
			this.p.update('<div style="color:#909090;padding:0 0 10px 0;text-align:center;">抱歉, 没有获得数据。</div>');	
		}
		this.count++;
		this.updateIndex();
		this.showHandler();
		this.bind();
	},
	//显示换一换操作
	showHandler: function(){
		var _this = this;
		var a = new Element('a', {'href': 'javascript:;'}).update('<em class="ico__change"></em><span class="text">换一换</span>');
		a.addClassName('change');
		a.onclick = function(){ hz.postHz(4007464, 1000502); _this.change(); };
		this.h.update(a); 
	},
	//请求更新数据
	updateData: function(callback){
		var req = '/u/home_like_content/pn/' + this.pn;
		var _this = this;
		this.lock = true;
		nova_request(function(res) {
			_this.lock = false;
			if(res){
				res = res.split('----------');
				//去除无效值
				var tmp = [];
				for(var i=0; i<res.length; i++){
					if(res[i].indexOf('nv') != -1){
						tmp.push(res[i]);
					}	
				}
				_this.data = _this.data.concat(tmp);
				if(typeof(callback) == 'function'){ callback(); }
			}else{
				callback();	
			}	
		}, req, {}, 'get');	
		this.pn ++;
	},
	//更新位置索引
	updateIndex: function(){
		var _this = this;
		this.p.select('.nv').each(function(v, index){
			v.writeAttribute('pos', _this.count*_this.minlength + index);
		});
	},
	//UI核心方法转化一个视频单位
	parseOne: function(index){
		var html = this.data[index];
		if(!html){ return null; }
		var node = new Element('div').update(html);
		this.data.splice(index, 1);
		var v = node.select('.nv')[0]; if(!v){ return null; }
		var _this = this;
		var img = node.select('.nv_thumb img')[0];
		if(img){
			img.onload = function(){
				var w = this.width;
				var h = this.height;
				if(w/h<1.6){ //4:3 
					this.parentNode.className = 'nv_thumb nv_thumb_clip';
					this.style.height = this.width/4*3 + 'px';
				}else{
					this.style.height = this.width/448*252 + 'px';	
				}
				this.style.visibility = 'visible';	
			}
			//for IE load bug
			setTimeout(function(){
				var src = img.getAttribute('_src');
				img.src = src;
			}, Math.random(100));	
		}
		return node;
	},
	//点击观看发送日志
	postLog: function(data){
		var url = 'http://e.stat.youku.com/personalization/log?'
		var req = '';
		data.req_id = new Date().getTime() + this._getrandstring(3);
		for(var key in data){
			req += (req != '' ? '&' : '') + key + '=' + data[key];	
		}
		new Image().src = url + req;		
	},
	_getrandstring: function(n){
		var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var len = str.length;
		var randstr = '';
		for(var i=0; i<n; i++){
			var index = Math.floor(len*Math.random());	
			randstr += str.charAt(index);
		}
		return randstr;
	}, 
	markreadystate: function(){
		if(homemodule_readystate){
			homemodule_readystate['commend'] = true;	
		}
	}
}

var ykminiheader_nav = {
	init: function(){
		var nav = $$('.YK_mainnav')[0];
		if(!nav){ return; }
		var lis = nav.select('li');
		this.navmenus = [];
		var _this = this;
		lis.each(function(li){
			var handle = li.select('.handle')[0]; 
			var panel = li.select('.panel')[0];
			if(handle && panel){ _this.navmenus.push(li); }
		});	
		
		if(this.navmenus.length){ this.bind(); }
	},
	bind: function(){
		var _this = this;
		this.navmenus.each(function(option){
			Event.observe(option, 'mouseover', function(){ option.addClassName('active');
				if(option.getAttribute('_hz')){
					hz.parseHz(option.getAttribute('_hz'));	
					option.removeAttribute('_hz');
				}
			 });
			Event.observe(option, 'mouseout', function(){ option.removeClassName('active'); });
		});
	}
}

var userbaseinfo = {
	init: function(){
		this.panel = $('baseinfo');
		this.handle = $('baseinfo_edit');
		if(this.panel && this.handle){
			this.bind();	
		}	
	},
	bind: function(){
		var isTouch = ("createTouch" in document) && ('ontouchstart' in window);
		var _this = this;
		if(isTouch){
			this.handle.show();
		}else{
			Event.observe(this.panel, 'mouseover', function(){ _this.handle.show(); });
			Event.observe(this.panel, 'mouseout', function(){ _this.handle.hide(); });	
		}
	}	
}

var dynamictips = {
	init: function(){
		this.tips = $('dynamic_notice');
		if(!this.tips){ return; }
		this.handle = this.tips.select('.ico__close')[0];
		if(!this.handle){ return; }
		this.cookiename = 'dytips';
		if(!Nova.Cookie.get(this.cookiename)){ this.show();	}
		this.bind();
	},
	bind: function(){
		var _this = this;
		Event.observe(this.handle, 'click', function(){ _this.hide(); });
	},
	show: function(){
		this.tips.show();
	},
	hide: function(){
		this.tips.hide();
		Nova.Cookie.set(this.cookiename, 'hide', 365*1000, null);
	}	
}

/* 私信 */
var privatemsg = {
    init: function(){
        var nav = $('private_messsage_page');
        if (!nav) {return;}
        
        this.uid = nav.getAttribute('data-uid');
        this.cuid = nav.getAttribute('data-cuid');
        this.pageType = nav.getAttribute('data-pagetype') || 'list';
        this.pageFrom = nav.getAttribute('data-pagefrom') || 'ucenter';
        this.isShowDelBox = 0;
        this.delBox = {};
        this.delMsgNode = '';
        this.noticeSafeBox = {};
        this.sendMsgContent = '';
        this.myDomain = 'http://' + (window.location.host.indexOf('u.youku')==0? 'i.youku.com': window.location.host);
        $$(".YK_index").each(function(obj){
            Event.observe(obj, 'click', this.bindEvent.bind(this));
        }.bind(this));
        
        this.loadData();
    },
    loadData: function(){
        var url = this.myDomain + ((this.pageType != "one")? '/u/~ajax/getPrivateMsgList': '/u/~ajax/getPrivateMsgOner');
        var data = (this.pageType != "one")? {uid:this.uid, pagefrom:this.pageFrom}: {uid:this.uid, cuid: this.cuid, pagefrom:this.pageFrom}
        //nova_request(function(ret){this.loadDataCallback(ret);}.bind(this), url, data);
        nova_call(url, data, 'privatemsg.loadDataCallback', undefined, 1);
    },
    loadDataCallback: function(data){
        if (this.pageType != 'one'){
            $('pmsg_list_total').update(data.totalMsg);
            $('pmsg_content').update(data.content);
            nova_call(this.myDomain+'/u/~ajax/getNewBroadcastMsg', {uid:this.uid}, '', undefined, 1);    // 广播系统消息与当前用户建立关系
        } else {
            if ($$('.streams')[0]) {$$(".streams")[0].remove();}
            if ($('pmsg_spacer')) {$('pmsg_spacer').remove();}
            if ($('pmsg_pagenum')) {$('pmsg_pagenum').remove();}
            $('pmsg_oner_total').update(data.totalMsg);
            $('pmsg_oner_content').insert({bottom:data.content});           
            if ($$('.streams')[0].getAttribute("data-unread")>'0'){this.clearUnreadMark();}
            
            this.initReplyMsgComposer();
        }

        // 名片
        idcard.hide();
        idcard.bind($$('.YK_id'));
    },   
    bindEvent: function(evt){
        var element = Element.extend(Event.element(evt));
        try{
            if (this.pageType == 'list'){
                if (element.hasClassName('pmsg_delete')){this.delConversation(element); Event.stop(evt);}
                else if (element.getAttribute('_uc') == 'st_send_pmsg'){privateMsg_box.showBox(element); Event.stop(evt);}
                else if (element.hasClassName('clear_unread')){this.clearUnreadMark(element); Event.stop(evt);}
            } else if (this.pageType == 'one'){
                if (element.hasClassName('pmsg_del_one')){this.delSingleMsg(element); Event.stop(evt);}
                else if (element.hasClassName('pmsg_reply')){
                    $('pmsg_reply_box').focus();
                    YKUC.scrollTo(document.viewport.getScrollOffsets().top, 0);
                    Event.stop(evt);
                }
            }
            if (element.hasClassName('pmsg_pagenum')){this.pageTruning(element);}
            if (element.hasClassName('contentLink')){this.checkLink(evt);}
            if (element.hasClassName('pmsg_st')){this.pmsgStatistics(element.getAttribute('data-st'));}
        }catch(e){}                
    },
    delConversation: function(node){    // list
        var cuid = node.getAttribute('data-cuid');
        this.delMsgNode = node.up(4);
        this._deleteMsgBox('确定删除与该用户的所有站内信？', {            
            'ok': function(){nova_call(this.myDomain + '/u/~ajax/delPrivateMsgConversation',{uid:this.uid,cuid:cuid}, 'privatemsg.delConversationCallback', undefined, 1);}.bind(this),
            'cancel': function(){}
        });
    },
    delConversationCallback: function(ret){
        var text = (ret>0)? '站内信对话已成功删除': '站内信对话删除失败！（'+ ret +'）',
            width = (ret>0)? 220: 290;
        this._noticeMsgBox(text, width, ret);
        if (ret > 0){
            this.delMsgNode.next().remove();
            this.delMsgNode.remove();
            $('pmsg_list_total').update($('pmsg_list_total').lastChild.nodeValue-1);
            if ($$(".streams")[0].childElements().length == 0) this.loadData();
        }
    },
    delSingleMsg: function(node){   //oner
        var msgid = node.getAttribute('data-msgid');
        this.delMsgNode = node.up(3);
        this._deleteMsgBox('确定删除该条站内信？', {
            'ok': function(){nova_call(this.myDomain+'/u/~ajax/delPrivateMsgOner',{uid:this.uid,msgid:msgid}, 'privatemsg.delSingleMsgCallback', undefined, 1);}.bind(this),
            'cancel': function(){}
        });
    },
    delSingleMsgCallback: function(ret){
        var text = (ret>0)? '站内信对话已成功删除': '站内信对话删除失败！（'+ ret +'）',
            width = (ret>0)? 220: 290;
        this._noticeMsgBox(text, width, ret);
        if (ret > 0){
            $('pmsg_oner_total').update($('pmsg_oner_total').lastChild.nodeValue-1);
            if (this.delMsgNode.next(2)){
                this.delMsgNode.next().remove();
                this.delMsgNode.remove();
            } else if (this.delMsgNode.previous(2)){
                this.delMsgNode.previous().remove();
                this.delMsgNode.remove();
            } else {
                this.delMsgNode.up().remove();
                if ($$(".streams")[0].childElements().length == 0){
                    $$(".ucenterpager")[0].remove();
                    this.loadData();
                }                                  
            }
        }
    },
    clearUnreadMark: function(node){
        if (this.pageType != 'one'){
            var cuid = node.getAttribute('data-cuid'),
                unreadNum = node.getAttribute('data-unread'),
                locationUrl = node.getAttribute('data-url');
            if (unreadNum > 0){
                nova_call(this.myDomain+'/u/~ajax/clearUnreadMsgMark', {uid:this.uid, cuid:cuid, locationUrl:locationUrl}, 'privatemsg.clearUnreadMarkCallback', undefined, 1);
                //nova_request(function(){window.location=locationUrl;}, this.myDomain+'/u/~ajax/clearUnreadMsgMark', {cuid:cuid});
            } else {
                window.location=locationUrl;
            }
        } else {
            nova_call(this.myDomain+'/u/~ajax/clearUnreadMsgMark', {uid:this.uid,cuid:this.cuid}, '', undefined, 1);
            //nova_request(function(){}, this.myDomain+'/u/~ajax/clearUnreadMsgMark', {cuid:this.cuid});
        }
    },
    clearUnreadMarkCallback: function(ret){
        window.location = ret.locationUrl;
    },
    pageTruning: function(node){
        var page = node.getAttribute('data-pagenum');
        var url = this.myDomain + ((this.pageType != 'one')? '/u/~ajax/getPrivateMsgList': '/u/~ajax/getPrivateMsgOner');
        var data = {uid:this.uid, page: page, pagefrom:this.pageFrom};
        if (this.pageType == 'one') data.cuid = this.cuid;
        //nova_request(function(ret){this.loadDataCallback(ret);}.bind(this), url, data);
        nova_call(url, data, 'privatemsg.loadDataCallback', undefined, 1);
    },
    initReplyMsgComposer: function(){
        var editor = $$('.YK_talk textarea')[0],
            tools = [],
            wc = $$('.YK_talk .counter')[0],
            bp = $$('.YK_toolbar [act="composer.publish"]')[0];
        if(!editor) return;
        
        var hooks_beforecommit = new Array();
        var _this = this;
        pmsgGetOnerInfo = function(){
            var latestOwner = $$(".streams")[0].getAttribute("data-latest");
            var onerInfo = {uid:_this.uid, cuid:_this.cuid, 'pagetype':'webpage', latestowner:latestOwner, pagefrom:_this.pageFrom};
            editor.setAttribute('data', JSON.stringify(onerInfo).replace(/[{}]/g, ''));
            _this.sendMsgContent = $('pmsg_reply_box').value;
        };
        hooks_beforecommit.push({'isopen':true,'func':pmsgGetOnerInfo});

        new YKUC.Composer(
            editor,
            tools,
            {
                elm_wordcount: wc,
                btn_publish: bp,
                hooks_beforecommit: hooks_beforecommit
            },
            function(){
                if(!this.ret || typeof this.ret != 'object') return;
                var text, width;                
                if (this.ret.code > 0){ 
                    text = '站内信发送成功';
                    width = 180;
                    
                    // 内容回写
                    var insertAnchor = $$('.streams')[0].down();
                    if (this.ret.rewriteType == 'separate'){
                        insertAnchor.insert({before: this.ret.rewriteMsg});
                    } else {
                        insertAnchor.insert( {top: this.ret.rewriteMsg});
                    }
                    $('pmsg_oner_total').update(parseInt($('pmsg_oner_total').lastChild.nodeValue)+1);
                    $$(".streams")[0].setAttribute("data-latest", this.ret.latestOwner);
                } else {
                    if (this.ret.code == -1030){text='此内容包含禁忌词，无法发送！';width=280;}
                    else if (this.ret.code == -1040){text='该用户不存在!';width=180;}                
                    else if (this.ret.code == -1050){text='你无法向TA发站内信！';width=220;}
                    else if (this.ret.code == -1060){text='请勿连续发送相同内容！';width=240;}
                    else if (this.ret.code == -1070){text='您聊天速度太快，先休息会儿！';width=280;}
                    else {text='站内信发送失败！（'+ this.ret.code +'）';width=270;} //190
                    
                    $('pmsg_reply_box').value = _this.sendMsgContent;
                }
                _this._noticeMsgBox(text, width, this.ret.code);
                _this.pmsgStatistics('4007430#1000669');
            } //function
        );
    },
    checkLink: function(evt){
        var element = Element.extend(Event.element(evt));
        var link = element.getAttribute('data-link');
        if (link.indexOf('youku.com')>=0){
            window.open(link, '_blank');
        } else {
            this._noticeSafeLinkBox(evt, element);
        }
        Event.stop(evt);
        document.body.onclick = function(){
            if (!privatemsg.noticeSafeBox) return;
            privatemsg.noticeSafeBox.hide(); 
        }
    },
    pmsgStatistics: function(str){  //str=cp#cpp
        var code = str.split('#');
        if (code.length >= 2){  //code[0]:cp; code[1]:cpp
            Nova.addScript('http://hz.youku.com/red/click.php?tp=1&cp='+ code[0] +'&cpp='+ code[1] +'&r='+Math.random());
        }
        
    },
    _deleteMsgBox: function(notice, action){
        var html = '<div class="manager_tips" id="del_psmg_box"><div class="tips_title"><span class="ico__fail"><em>提示</em></span>删除确认</div>' +
                        '<div class="tips_content"><span>'+ notice +'</span></div>' +
                        '<div class="tips_action">' +
                        '<div class="form_btn form_btn_s form_btnmaj_s"><span id="del_ok" class="form_btn_text">确 认</span></div>' +
                        '<div class="form_btn form_btn_s form_btnsub_s"><span id="del_cancel" class="form_btn_text">取 消</span></div>' +
                    '</div></div>';
        if (!this.isShowDelBox) {this.delBox = new Qwindow(); this.isShowDelBox++;}
        this.delBox.setSize(250, 130).setContent('html', html).show();
        $('del_psmg_box').select('#del_ok')[0].onclick = function(){action.ok();this.delBox.hide();}.bind(this)
        $('del_psmg_box').select('#del_cancel')[0].onclick = function(){action.cancel();this.delBox.hide();}.bind(this)
    },
    _noticeMsgBox: function(notice, width, type){
        var classname = (type>0)? 'ico__success': 'ico__fail';
        var html = '<div class="manager_tips"><div class="tips_title"><span class="'+ classname +'"><em>提示</em></span>'+ notice +'</div></div>';
        var noticeBox = new Qwindow();
        if (type>0) noticeBox.hideHandle();
        noticeBox.setSize(width, 60).setContent('html', html).show();
        setTimeout(function(){noticeBox.hide();}, type>0?1000:5000); 
    },
    _noticeSafeLinkBox: function(evt, element){
        var html = '<div class="manager_tips">' +
                        '<div class="tips_title"><span class="ico__fail"><em>提示</em></span>安全提示</div>' +
                        '<div class="tips_content"><span>站外链接可能会存在风险，请您小心访问。</span></div>' +
                        '<div class="tips_action">' +
                        '<div class="form_btn form_btn_s form_btnmaj_s"><a id="show_ok" class="form_btn_text" href="#" target="_blank">继续访问</a></div>'+
                        '<div class="form_btn form_btn_s form_btnsub_s"><span id="show_cancel" class="form_btn_text">取 消</span></div>'+
                        '</div>'+
                    '</div>';
        var iWidth = 300,iHeight = 130;
        var iTop = evt.clientY < iHeight ? 30 : -iHeight - 20;
        var iLeft;
        if (element.offsetHeight < 20 ){
            iLeft = (evt.pageX ? evt.pageX : evt.clientX + this._getScrollRange().left) - this._getOffsetPos(element).left - iWidth/2;
        } else {
            iLeft = (evt.pageX ? evt.pageX : evt.clientX + this._getScrollRange().left) - this._getOffsetPos(element.parentNode.parentNode).left -iWidth/2;
        }
        if (!(this.noticeSafeBox instanceof Qwindow)){
            this.noticeSafeBox = new Qwindow({
                'zindex': 2000,
                'elements': 'select',
                'showmask': false
            });
        }
        this.noticeSafeBox
            .setSize(iWidth,iHeight)
            .setPosrefer(element)
            .setPos(iTop, iLeft)
            .setContent('html', html)
            .setShowCallback(this._safeLinkCallBack)
            .show();
        this.noticeSafeBox.getElements().win.onclick = function(evt){
            if(evt.stopPropagation){ evt.stopPropagation(); }
            else{ evt.cancelBubble = true; }
        };        
        $('show_ok').setAttribute('href', element.getAttribute('data-link')); 
    },
    _getOffsetPos: function(o) {
        function pageX(o){ try {return o.offsetParent ? o.offsetLeft +  pageX(o.offsetParent) : o.offsetLeft; } catch(e){ return 0; } }
        function pageY(o){ try {return o.offsetParent ? o.offsetTop + pageY(o.offsetParent) : o.offsetTop; } catch(e){ return 0; } }
        return {'top': pageY(o), 'left': pageX(o)};
    },_getScrollRange: function(){
        var x = document.documentElement ? document.documentElement.scrollLeft + document.body.scrollLeft : document.body.scorllLeft;
        var y = document.documentElement ? document.documentElement.scrollTop + document.body.scrollTop : document.body.scorllTop;
        return { left:x,top:y };
    },
    _safeLinkCallBack: function(){
        var btns = $$('.tips_action .form_btn_text');
        for(var i=0,len=btns.length;i<len;i++){
            btns[i].onclick = function(){
                privatemsg.noticeSafeBox.hide();
            };
        }
    }
}

/*
 *  私信弹窗
 */
var privateMsg_box = {
    hasShowDialog: 0,
    pmsgDialog: {},
    sendMsgContent: '',
    myDomain: 'http://' + (window.location.host.indexOf('u.youku')==0? 'i.youku.com': window.location.host),
    uinfo: {},
    
    showBox: function(node){
        if(!islogin()) {
			login(function() {window.location.reload()});
			return;
		}
        
        var url = this.myDomain + '/u/~ajax/privateMsgBox',
            param = {};
        this.uinfo = {
            uid: node.getAttribute('data-uid'),
            cuid: node.getAttribute('data-cuid'),
            cname: node.getAttribute('data-cname'),
            writeTypte: node.getAttribute('data-writetype'),
            pagefrom: empty($('private_messsage_page'))? 'ucenter': $('private_messsage_page').getAttribute('data-pagefrom'),
            statisticData: node.getAttribute('data-st')            
        };
        if(!this.hasShowDialog){
            nova_call(url, param, 'privateMsg_box.showBoxCallback', undefined, 1);
        }else{
            this.showBoxCallback(this.html);
        }
        this.pmsgBoxStatistics('showBox', this.uinfo.statisticData);
    },
    showBoxCallback: function(html){
        this.html = html;
        var boxHtml = new Element('div').update(html);
        if(empty(this.pmsgDialog)){
            this.pmsgDialog = new Qwindow({
                size:{width:450},
                content: {type: 'element', value: boxHtml}
            });
        }
        if (!this.hasShowDialog++){
            this.initPmsgBoxComposer(boxHtml, this.uinfo);
        }
        this.pmsgDialog.show();
        this.handlePmsgBox(boxHtml, this.uinfo);
    },
    initPmsgBoxComposer: function(boxHtml, uinfo){
        var composer = {},
            _this = this;
        composer.e = boxHtml.select('textarea')[0];
        composer.tools = boxHtml.select('.YK_toolbar [act]');
        composer.publisher = boxHtml.select('[act="composer.publish"]')[0];
        composer.word_count = boxHtml.select('.counter')[0];
        
        composer.hooks_beforecommit = new Array();
        pmsgGetReceiverInfo = function(){
            var cname = $('input_cname').value,
                isChgReceiver = $('input_cname').value !== $('input_cname').getAttribute('data-cname'),
                cuid = $('input_cname').getAttribute('data-cuid') || null;
            var receiverInfo = {ischg:isChgReceiver, uid:uinfo.uid, cuid:cuid, cname:cname, pagetype:'dialog', 
                                pagewritetype:uinfo.writeTypte, pagefrom:uinfo.pagefrom};
            boxHtml.select('[_uc="pmsg_box"]')[0].setAttribute('data', JSON.stringify(receiverInfo).replace(/[{}]/g, ''));
            
            _this.sendMsgContent = boxHtml.select('[_uc="pmsg_box"]')[0].value;
            if (empty(cname)){_this._noticeMsgTip('请输入昵称'); return -1;}            
            _this.pmsgBoxStatistics('send', uinfo.statisticData);
        };				
        composer.hooks_beforecommit.push({'isopen':true,'func':pmsgGetReceiverInfo});
        
        _this.pmsgDialog.composer = new YKUC.Composer(
            composer.e, 
            composer.tools, 
            {
                btn_publish: composer.publisher,
                elm_wordcount: composer.word_count,
                hooks_beforecommit: composer.hooks_beforecommit
            },
            function() {_this.sendPmsgCallBack(this.ret);}
        );
    },
    sendPmsgCallBack: function(ret){
        var text, width;
        if (ret.code > 0){
            text = '站内信发送成功';
            this._noticeMsgBox(text, 180, ret.code);
            // 发送的信息回写
            if (!empty(ret.rewriteType) && ret.rewriteType=="rewritelist"){
                var cuid,pmsgHandlers = $$('.stream');
                for (var i=0, len=pmsgHandlers.length; i<len; i++){
                    cuid = pmsgHandlers[i].getAttribute('data-cuid');
                    if (ret.cuid == cuid){
                        pmsgHandlers[i].next().remove();
                        pmsgHandlers[i].remove();
                        break;
                    }
                }
                if ($('pmsg_list')){
                    Element.insert($('pmsg_list'), {top: ret.rewriteMsg});
                } else {
                    var html = '<div class="streams" id="pmsg_list">' + ret.rewriteMsg + '</div>';
                    $('pmsg_content').update(html);
                }                
                if (ret.cuid != cuid)  $('pmsg_list_total').update(parseInt($('pmsg_list_total').lastChild.nodeValue)+1);
            }
        } else {
            if (ret.code == -1050){
                this._noticeMsgTip('你无法向TA发站内信');
            } else {
                if (ret.code == -1030){text = '此内容包含禁忌词，无法发送！';width = 280;}
                else if (ret.code == -1040){text = '该用户不存在!';width = 180;}
                else if (ret.code == -1060){text='请勿连续发送相同内容！';width=240;}
                else if (ret.code == -1070){text='您聊天速度太快，先休息会儿！';width=280;}
                else {text = '站内信发送失败！（'+ ret.code +'）';width = 270;}
                this._noticeMsgBox(text, width, ret.code);
            }
        }
    },
    _noticeMsgBox: function(notice, width, type){
        if (type>0){this.pmsgDialog.hide();} else {$$('[_uc="pmsg_box"]')[0].value = this.sendMsgContent;}
        var classname = (type>0)? 'ico__success': 'ico__fail';
        var html = '<div class="manager_tips"><div class="tips_title"><span class="'+ classname +'"><em>提示</em></span>'+ notice +'</div></div>';
        var noticeBox = new Qwindow();
        if (type>0) noticeBox.hideHandle();
        noticeBox.setSize(width, 60).setContent('html', html).show();
        setTimeout(function(){noticeBox.hide();}, type>0?1000:5000); 
    },
    _noticeMsgTip: function(notice){
        var html = '<span class="ico__fail"><em>提示</em></span><span class="hint">'+ notice +'</span>';
        $('send_pmsg_error').update(html);
        $('send_pmsg_error').show();
        $$('[_uc="pmsg_box"]')[0].value = this.sendMsgContent;
    },
    handlePmsgBox: function(boxHtml, uinfo){
        $('input_cname').onclick = function(){$('send_pmsg_error').hide();};
        boxHtml.select('[_uc="pmsg_box"]')[0].onclick = function(){$('send_pmsg_error').hide();};
        
        $('send_pmsg_error').hide();
        $('input_cname').value = uinfo.cname||'';
        $('input_cname').setAttribute('data-cname', uinfo.cname||'');
        $('input_cname').setAttribute('data-cuid', uinfo.cuid||null);
        $$('[_uc="pmsg_box"]')[0].value = '';
        this.sendMsgContent = '';
    },
    pmsgBoxStatistics: function(action, str){ // str=cp1#cp2#cpp {cp1:弹窗; cp2:发送}
        if (!empty(str)){
            var code = str.split('#');
            if (code.length >= 3){
                if (action == 'showBox'){
                    Nova.addScript('http://hz.youku.com/red/click.php?tp=1&cp='+ code[0] +'&cpp='+ code[2] +'&r='+ Math.random());
                } else if (action == 'send'){
                    Nova.addScript('http://hz.youku.com/red/click.php?tp=1&cp='+ code[1] +'&cpp='+ code[2] +'&r='+ Math.random());
                }
            }//if
        }//if
    }
    
}

/**
 * 系统消息.
 */
var sysmsg = {
     init: function(){
        var nav = $('system_messsage_page');
        if (!nav) {return;}
        $$('.YK_index').each(function(obj){
            Event.observe(obj, 'click', this.bindEvent.bind(this));
        }.bind(this));
        this.myDomain = 'http://' + (window.location.host.indexOf('u.youku')==0? 'i.youku.com': window.location.host);
        this.uid = $('system_messsage_page').getAttribute('data-uid');
        
        this.loadData();
     },
     loadData: function(){
         var url = this.myDomain+'/u/~ajax/getSysMsgList';
         nova_call(url, {uid:this.uid}, 'sysmsg.loadDataCallback', undefined, 1);
         //nova_request(function(ret){this.loadDataCallback(ret);}.bind(this), this.myDomain+'/u/~ajax/getSysMsgList', {});
     },
     loadDataCallback: function(ret){
		 if(!$('sysmsg_content'))return;
         $('sysmsg_content').update(ret.content);
     },
     bindEvent: function(evt){
         var element = Element.extend(Event.element(evt));
         if (element.hasClassName('pmsg_pagenum')){this.pageTruning(element);}
         else if (element.hasClassName('detail_sysmsg')){this.sysmsgContent(element); Event.stop(evt);}
         else if (element.parentNode.hasClassName('detail_sysmsg')){this.sysmsgContent(element.parentNode); Event.stop(evt);}
     },
     pageTruning: function(node){
        var page = node.getAttribute('data-pagenum');
        var url = this.myDomain + '/u/~ajax/getSysMsgList';
        //nova_request(function(ret){this.loadDataCallback(ret);}.bind(this), this.myDomain+url, {page: page});
        nova_call(url, {uid:this.uid, page:page}, 'sysmsg.loadDataCallback', undefined, 1);
    },
    sysmsgContent: function(node){
        var dealHandle = node.previous(0);
        if (node.hasClassName('collapse')){
            node.removeClassName('collapse');
            node.innerHTML = '查看详情<span><em>展开</em></span>';
            dealHandle.innerHTML = '...';        
            
        } else {
            node.addClassName('collapse');
            node.innerHTML = '收起详情<span><em>收起</em></span>';
            dealHandle.innerHTML = node.up(0).getAttribute('data-morecontent');
        }
    }
};

/**
 *滚动页面
 */
var pageScroll = {
	init:function(){
		this.homeInit();
	},
	homeInit: function(){
		if (!window.location.href.match(/\/u\/home/i))return;
		var el;
		if (window.location.href.match(/ut=3/i)) {
			el = $('home_update');
			this.scrollToElement(el);
		}else if(window.location.href.match(/ut=91/i)){
			el = $('home_favo');
			this.scrollToElement(el);
		}
	},
	scrollToElement: function(o){
		var offset = $(o).cumulativeOffset();
		var b = navigator.userAgent.indexOf('AppleWebKit/') > -1 ? document.body : document.documentElement;
		YKUC.effect(b).ani({scrollTop: offset.top - 20}, 'normal', null, function() {});	
	}
};
/**
 *加载更多更新
 */
var moreupdate = {
	isAvailable: 1,
	init: function(){
		this.homeUpdateInit();
	},
	homeUpdateInit: function(){
		if (!window.location.href.match(/\/u\/home/i))return;
		var el = $('home_update');
		if(!el)return;
		var _this = this;
		Event.observe($(window), 'scroll', _this.loadHomeUpdate.bind(_this));
	},
	loadHomeUpdate: function(){
		if(moreupdate.isAvailable != 1)return;
		var newDataLoading = $('home_update_loading');
		var newDataLoadingTop = newDataLoading.up().cumulativeOffset().top;
		var yScroll = document.documentElement ? document.documentElement.scrollTop + document.body.scrollTop : document.body.scrollTop;
		var winHeight = document.documentElement ? document.documentElement.clientHeight : window.innerHeight;
		var max_id = 0, home_update_content = $('home_update_content'), home_update_contentArr = home_update_content.select('.videoup'),markNumber = home_update_content.readAttribute('_markNumber'),new_markNumber=0;
		if(home_update_contentArr.length > 0){
			max_id = home_update_contentArr.last().readAttribute('_sid');
		}
		if(markNumber && markNumber - home_update_contentArr.length>0){
			new_markNumber = markNumber - home_update_contentArr.length;
		}
		
		if(moreupdate.isAvailable == 1 &&　yScroll + winHeight + 200 >= newDataLoadingTop){
			moreupdate.isAvailable = 0;
			//alert(yScroll +'--'+ winHeight +'--'+ newDataLoadingTop);
			newDataLoading.style.display = 'block';
			nova_request(function(res){
				newDataLoading.style.display = 'none';
				
				if(res == 0){
					setTimeout(function(){moreupdate.isAvailable = 1;}.bind(this), 10000);
				}else{
					home_update_content.innerHTML += res;
					setTimeout(function(){moreupdate.isAvailable = 1;}.bind(this), 300);
					idcard.bind(home_update_content.select('.YK_id'));
				}
			}.bind(this), '/u/home_update/', {max_id: max_id,count: 12,ajaxget: 1,mn: new_markNumber}, 'get');
		}
	},
	newstExec: function(event){
		var notice = $('YK_notice');
		if(!notice)return;
		var loading =  '<div style="text-align:center" style="height:46px;clear:both;"><span class="ico__loading_16"></span></div>';
		loading = YKUC.$C('div').update(loading);
		notice.insertBefore(loading, notice.down('a'));
		notice.down('a').hide();
		nova_request(function(res){
			loading.remove();
			notice.down('a').show();
			notice.style.display = 'none';
			$('home_update_content').innerHTML = res;
			idcard.bind(home_update_content.select('.YK_id'));
			notify.resetNew('subscribe');
		}.bind(this), '/u/home_update/', {max_id: 0,count: 18,ajaxget: 1,mn: 0,newst: 1}, 'get');
	}
};
var lazyloading = {
	isAvailable: 1,
	qwindow : null,
	showid : null,
	currline:null,
	init: function(){
		this.homeUpdateInit();
		this.ex();
	},
	homeUpdateInit: function(){
		if (!window.location.href.match(/\/u\/home/i))return;
		var el = $('streams_update');
		if(!el)return;
		var _this = this;
		Event.observe($(window), 'scroll', _this.loadHomeUpdate.bind(_this));
	},
	loadHomeUpdate: function(){
		var _this = this;
		if(moreupdate.isAvailable != 1)return;
		var newDataLoading = $('home_update_loading');
		var newDataLoadingTop = newDataLoading.up().cumulativeOffset().top;
		var yScroll = document.documentElement ? document.documentElement.scrollTop + document.body.scrollTop : document.body.scrollTop;
		var winHeight = document.documentElement ? document.documentElement.clientHeight : window.innerHeight;
		var streams_update = $('streams_update'); 
	        var pn = streams_update.readAttribute('pn');
	        var maxpn = streams_update.readAttribute('maxpn');
		if(lazyloading.isAvailable == 1 &&　yScroll + winHeight + 200 >= newDataLoadingTop){
			lazyloading.isAvailable = 0;
			//console.log(yScroll +'--'+ winHeight +'--'+ newDataLoadingTop+'-----pn'+pn);
			newDataLoading.style.display = 'block';
			nova_request(function(res){
				newDataLoading.style.display = 'none';
				if(pn > maxpn) return;	
				if(res == 0){
					setTimeout(function(){lazyloading.isAvailable = 1;}.bind(this), 10000);
				}else{
					streams_update.innerHTML += res;
					setTimeout(function(){lazyloading.isAvailable = 1;}.bind(this), 300);
					streams_update.writeAttribute('pn',parseInt(pn)+1)
					_this.ex();
								}
			}.bind(this), '/u/home/', {'type':'showfriends_timeline','pn':pn,'pz':5,'ajax': 1}, 'get');
		}
	},
	ex:function(){
		var _this = this;
		 (function(){
		     var btns = $$('.videoshow .vs_close');
		     if(btns.length > 0){
			 for(var i=0;i<btns.length;i++){
				if(btns[i].getAttribute('_type') == 'friend'){
				     (function(i){
					 btns[i].onclick = function(ele){
					     if(!_this.qwindow){ createwin(); }
					     _this.qwindow
					     .setContent("html",document.getElementById("cont").innerHTML)
					     .showHandle()
					     .setSize(260,150)
					     .show();
					     setData(ele);
					     return false;
					 }
				     })(i);
				}else if(btns[i].getAttribute('_type') == 'watching'){
					(function(i){
					 	btns[i].onclick = function(ele){
							var followed = btns[i].getAttribute('_followed');
							setData(ele);
							if(followed == 1){
							     if(!_this.qwindow){ createwin(); }
							     _this.qwindow
							     .setContent("html",document.getElementById("cont").innerHTML)
							     .showHandle()
							     .setSize(260,150)
							     .show();
							     return false;
							}else{
								delWatching(btns[i]);
							}
							
						}
					})(i);
				
				}
			 }
			 function delWatching(btn){
				if(!_this.tk || !_this.vid) return;
				_this.currline.remove();
				delUrl = "http://yus.navi.youku.com/playlog/delete.json?token="+_this.tk+"&v="+_this.vid+"&fid="+_this.fid+"&shid="+_this.encodeshowid+"&"+Math.random();
				var img = new Image();
				img.src = delUrl;
			 }
			 function createwin(){
			     	_this.qwindow = new Qwindow({
				 'zindex': 2000,
				 'elements': 'select',
				 'showmask': true
			     });
			 }
			function setData(ele){
				var e = ele || window.event;
				var tgt = e.target || e.srcElement
				if(tgt.up(2)) _this.currline = tgt.up(2);
				_this.showid = tgt.getAttribute('_showid');
				var li = tgt.up();
				if(li.getAttribute('_type') == 'watching'){
					_this.type = 'watching';
					_this.tk = li.getAttribute('_token');
					_this.vid = li.getAttribute('_vid');
					_this.fid = li.getAttribute('_folderid');
					_this.encodeshowid = li.getAttribute('_showid');
				}
			}
		     }
		 })();
		(function(){
			$$('.act_cancel').each(
				function(o){
					o.onclick = function(ele){
					var e = ele || window.event;
					var tgt = e.target || e.srcElement
					var showid = tgt.getAttribute('_showid');
					if(tgt.up().previous()) {
						tgt.up().hide();
						tgt.up().previous().show();
					}
					nova_request(function(){
						var close = tgt.up(1).select('[class="vs_close"]')[0];
						if(close){
							close.setAttribute("_followed",0);
						}
					},'/u/playLogSubscribe/shid_'+showid, {'type':3}, 'get');
				}
			}
			);
			$$('.act_notify').each(
				function(o){
					o.onclick=function(ele){
						var e = ele || window.event;
						var tgt = e.target || e.srcElement
						var showid = tgt.getAttribute('_showid');
						if(tgt.up().next()){
							tgt.up().hide();
							tgt.up().next().show();
						}
						nova_request(function(){
							var close = tgt.up(1).select('[class="vs_close"]')[0];
							if(close){
								close.setAttribute("_followed",1);
							}
						},'/u/playLogSubscribe/shid_'+showid, {'type':2}, 'get');
					}
				}
			);
		})();
	},
	delRecord : function(){
		if(this.type && this.type == 'watching'){
			if(this.tk && this.vid){
				if(!this.fid) this.fid = 0;
				delUrl = "http://yus.navi.youku.com/playlog/delete.json?token="+this.tk+"&v="+this.vid+"&fid="+this.fid+"&shid="+this.encodeshowid+"&"+Math.random();
				var img = new Image();
				img.src = delUrl;

			}

		}
		this.currline.remove();
		nova_request(function(){},'/u/playLogSubscribe/shid_'+ this.showid, {'type':3}, 'get');
	}
};
var watching = {
	elements:null,
	init : function(){
		if(!$$('li.nv_status')) return;
		this.elements = $$('li.nv_status');
		this.isShowDelBox = 0;
		this.delBox = {};
		this.bind();
    },
	bind : function(){
		var _this = this;
		this.elements.each(function(o){
					var a = o.select('a');
					a[0].onclick=function(e){
						var e = e || window.event;
						var tgt = e.target || e.srcElement
						var vid = tgt.getAttribute('_vid');
						var tk = tgt.getAttribute('_tk');
						var fid = tgt.getAttribute('_folderid');
						var showid = tgt.getAttribute('_showid');
						var sub = tgt.getAttribute('_sub');
						if(!tk || !vid) return;
						if(sub==1){
							_this._deleteMsgBox('删除该播放记录同时会取消追剧，确定要删除吗?', {            
					            'ok': function(){
					            	if(tgt.up(1)) tgt.up(1).remove();
					            	var delUrl = "http://yus.navi.youku.com/playlog/delete.json?token="+tk+"&v="+vid+"&fid="+fid+"&shid="+showid+"&"+Math.random();
			        				var delUrlShow = "http://yus.navi.youku.com/playlog/show/delete.json?token="+tk+"&v="+vid+"&fid="+fid+"&shid="+showid+"&"+Math.random();
									var img = new Image();
									img.src = delUrl;
									var img2 = new Image();
									img2.src = delUrlShow;
					             },
					            'cancel': function(){}
							  }
					        );
							return;
						}else{
							if(tgt.up(1)) tgt.up(1).remove();
							var delUrl = "http://yus.navi.youku.com/playlog/delete.json?token="+tk+"&v="+vid+"&fid="+fid+"&shid="+showid+"&"+Math.random();
							var delUrlShow = "http://yus.navi.youku.com/playlog/show/delete.json?token="+tk+"&v="+vid+"&fid="+fid+"&shid="+showid+"&"+Math.random();
							var img = new Image();
							img.src = delUrl;
							var img2 = new Image();
							img2.src = delUrlShow;
						}
					}
				}
				);
	},
    _deleteMsgBox: function(notice,action){
            var html = '<div class="manager_tips" id="del_playlist_box"><div class="tips_title"><span class="ico__fail"><em>提示</em></span>删除确认</div>' +
                            '<div class="tips_content"><span>'+ notice +'</span></div>' +
                            '<div class="tips_action">' +
                            '<div class="form_btn form_btn_s form_btnmaj_s"><span id="del_ok" class="form_btn_text">确 认</span></div>' +
                            '<div class="form_btn form_btn_s form_btnsub_s"><span id="del_cancel" class="form_btn_text">取 消</span></div>' +
                        '</div></div>';
            if (!this.isShowDelBox) {
            	this.delBox = new Qwindow(); 
            	this.isShowDelBox++;
            }
            this.delBox.setSize(250, 150).setContent('html', html).show();
            $('del_playlist_box').select('#del_ok')[0].onclick = function(){action.ok();this.delBox.hide();}.bind(this)
            $('del_playlist_box').select('#del_cancel')[0].onclick = function(){action.cancel();this.delBox.hide();}.bind(this)
    }  
};
var homemodule_readystate = {
	'status' : false,
	'commend': false	
}

function ready_init() {
	//导航下拉菜单
	ykminiheader_nav.init();
	userbaseinfo.init();
	hz.init();
	notify.init();
	dynamictips.init();
	st.init();
	friends.init();
	advert.init();
	winevt.init();
	ucwelcome.init();
	feedback.init();
	badge.init();
	skinset.init();
	search.init();
	vd.init();
	rc.init();
	favtips();
	idcard.init();
	ucguide.init();
	upgradeguide.init();
	searchvideo.init();
	recommenduser.init();
	searchvideo.init();
	/*我的首页-我正在看*/
	watchinglist.init();
	/*我的首页-猜我喜欢*/
	guesslike.init();
	msg.init();
    sysmsg.init();  // 系统通知
	privatemsg.init();  // 私信
	pageScroll.init();
	moreupdate.init(); 
	lazyloading.init(); 
	watching.init();
	Nova.addScript('http://urchin.lstat.youku.com'+ucloader.version+'/index/js/urchin.js');
}

ready_init.defer();
callback = function(){window.location.reload()}
