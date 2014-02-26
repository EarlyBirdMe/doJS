$.fn.adfocus = function (options) {
    var opts = {
        drection: "",
        numbox: "",
        imgbox: "",
        speed: "",
        addClass: "",
        imgboxWidth: "",
        imgboxHeight: "",
        imgLen: "",
        autorun: true,
        usevent: ""
    }
    $.extend(opts, options);
    return this.each(function () {
        var adTimer = null;
        var _this = $(this);
        var jwbindex = 0;

        if(opts.imgbox == 0){
            var imgListBox = _this;
        }else{
            var imgListBox = _this.find(opts.imgbox);
        }
        var imglistWidth = opts.imgboxWidth;
        var imglistHeight = opts.imgboxHeight;
        var imglistBoxChid = imgListBox.find("li");
        var len = imglistBoxChid.length/opts.imgLen;
        var _html = "";
        for (var i = 0; i < len; i++) {
            if(i == 0) {
                _html += "<i class='"+opts.addClass+"'></i>";
            }else{
                _html += "<i></i>";
            }
        }
        _this.find(opts.numbox).html(_html);
        var oNumList = _this.find(opts.numbox).children();
        oNumList.bind(opts.usevent, function () {
            jwbindex = oNumList.index(this);
            action(jwbindex);
        });
        $.data(_this[0], "slideReady",1);

        if(opts.autorun) {
            imgListBox.hover(function () {
                clearInterval(adTimer);
            }, function () {
                timer();
            });
        }
        function timer() {
            if(adTimer){
                clearInterval(adTimer);
                adTimer = null;
            };
            adTimer = setInterval(function () {
                action(jwbindex);
                jwbindex++;
                if (jwbindex == len) {
                    jwbindex = 0;
                }
            }, opts.speed)
        };
        if(opts.autorun) timer();
        _this.bind("slide.start",function(){
            if(opts.autorun) timer();
        });
        _this.bind("slide.stop",function(){
            clearInterval(adTimer);
        });
        if (opts.prevbtn) {
            _this.find(opts.prevbtn).bind("click",function(){
                clearInterval(adTimer);
                jwbindex == 0 && (jwbindex = len);
                jwbindex--;
                action(jwbindex);
            });
        }
        if (opts.nextbtn) {
            _this.find(opts.nextbtn).bind("click",function(){
                clearInterval(adTimer);
                jwbindex == len-1 && (jwbindex = -1);
                jwbindex++;
                action(jwbindex);
            });
        }
        function action(oindex) {
            if (opts.drection == "left") {
                imgListBox.width(imglistWidth * imglistBoxChid.length);
                imglistBoxChid.css({
                    float: "left"
                });
                imgListBox.stop().animate({
                    left: -imglistWidth * oindex * opts.imgLen
                }, 500);
            } else if (opts.drection == "up") {
                imgListBox.stop().animate({
                    scrollTop: imglistHeight * oindex
                }, 500);
            } else if (opts.drection == "filter") {
                _this.css({
                    "position": "relative"
                })
                imglistBoxChid.eq(oindex).css({
                    "position": "absolute",
                    "left": "0px",
                    "top": "0px"
                }).stop().animate({
                        opacity: 1
                    }, 500).css({
                        "z-index": "1"
                    }).siblings().stop().animate({
                        opacity: 0
                    }, 500).css({
                        "z-index": "0"
                    });
            }
            oNumList.removeClass(opts.addClass).eq(oindex).addClass(opts.addClass);
        }
    });
};