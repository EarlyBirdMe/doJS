var CSSload = function (link, callback) {
    var cssLoaded = false;
    try {
        if (link.sheet && link.sheet.cssRules.length > 0) {
            cssLoaded = true;
        } else if (link.styleSheet && link.styleSheet.cssText.length > 0) {
            cssLoaded = true;
        } else if (link.innerHTML && link.innerHTML.length > 0) {
            cssLoaded = true;
        }
    }
    catch (ex) {
    }
    if (cssLoaded) {
        callback();
    } else {
        setTimeout(function () {
            CSSload(link);
        }, 100);
    }
};