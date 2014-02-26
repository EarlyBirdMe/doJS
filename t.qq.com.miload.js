MILoad = function(b, c) {
//    http://www.cnblogs.com/snandy/archive/2011/04/26/2029537.html
//    http://www.cnblogs.com/snandy/archive/2011/04/29/2032376.html
    var a = document.createElement('script');
    if (c) {
        a.onload = a.onerror = a.onreadystatechange = function() {
            var s = this.readyState;
            if (!s || (s && (s == 'loaded' || s == 'complete'))) {
                c(b);
            }
            a.parentNode.removeChild(a);
        }
    }
    a.setAttribute('type', 'text/javascript');
    a.setAttribute('charset', 'utf-8');
    a.setAttribute('src', b);
    document.getElementsByTagName('head')[0].appendChild(a)
};