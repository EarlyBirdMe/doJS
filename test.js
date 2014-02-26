/*
(function(){return 1}());
function f(a, b, c, d, e) {
    var q;
    var w;
    w = 10;
    q = 20;
    for (var i = 1; i < 10; ++i) {
        var boo = foo(a);
    }
    for (var i = 0; i < 1; ++i) {
        var boo = bar(c);
    }
    function foo(){  }
    function bar(){  }
    function baz(){  }
}
*/
;(function(){
　　var a = 1;
　　var fn = eval;
 
　　eval('typeof a'); //number
 
　　(eval)('typeof a');//number
 
　　(1,eval)('typeof a');//undefined
 
　　//fn('typeof a');//undefined
}());
console.log('hehe');
/*
1 + 2 + 3;
(1+2) + 3;*/
