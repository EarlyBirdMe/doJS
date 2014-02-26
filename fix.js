jQuery(function($){
		
		var g = document.getElementById('PD_PL_F_Rectangle2');
		var t = $(g).offset().top;
		var isIE6= !!window.ActiveXObject&&!window.XMLHttpRequest;
		if(isIE6){
			document.body.style.backgroundImage = 'url(about:blank)';
			document.body.style.backgroundAttachment = 'fixed';
		}
		function reTop(){
			if(g.style.position == ''){
				t = $(g).offset().top;
			}
			var bodyT = document.body.scrollTop || document.documentElement.scrollTop;
			var wraperT = $('#wraper').offset().top || 0;
			if(t<=bodyT){
				
				if(isIE6){
					g.style.position='absolute';
					g.style.top = bodyT-wraperT + 'px';
				}else{
					g.style.position='fixed';
					g.style.top='0';
				}
			}else{
				g.style.position=''
			}
		}
		window.onresize = window.onscroll = function(){
			
			reTop();
		}
		
		
	})/*  |xGv00|45f60f36f7c3bc344c5f57f45c3880f9 */