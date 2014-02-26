
	document.domain='qq.com';
	document.getElementById('file_name').value='';
	document.getElementById('form_upload').reset();
	document.getElementById("upload_c_iframe").src='about:blank';
	var cutPhotoJs = {
		initSystems : function() {
			var soCut = new SWFObject("http://mat1.gtimg.com/www/mb/swf/face/miniblog_20130428.swf", "qqminiblog", "100%", "100%", "9.0.28", "#FFFFFF");
				soCut.addParam("allowNetworking", "all");
				soCut.addParam("allowScriptAccess", "always");
				soCut.addParam("allowFullScreen", "true");
				soCut.addParam("scale", "noscale");
				soCut.addParam("wmode", "transparent");
				soCut.addVariable("wbVipWhite", "true");
				soCut.addVariable("uidurl", "http://mat1.gtimg.com/www/mb/img/p1/head_normal_180.png?cache="+Math.random());
				soCut.addVariable("tmpurl", "http://upload.t.qq.com/uploadhead");
				soCut.addVariable("tmpimgurl", "http://mat1.gtimg.com/www/mb/img/p1/head_normal_120.png");
				soCut.addVariable("imgurl", "http://upload.t.qq.com/uploadheadpic.php");
				soCut.addVariable("langver", "zh_CN");
                soCut.addVariable("xmlurl", "http://mat1.gtimg.com/www/mb/swf/face/picData_20130117.xml");
                soCut.addVariable("filterHead", "false");
                soCut.addVariable("filtertext", "汶川地震五周年，设置灰色头像，缅怀遇难同胞");
				soCut.write("cutphoto");
		},
		uploadFileError : function(type, code) {
			if ( type == 'filesize')
			{
				alert('文件大小不超过2M');
			}
			else if ( type == 'filename')
			{
				alert('请选择jpg、jpeg、gif、png格式的图片');
			}
		},
		uploadingError : function(ecode) {
			alert('似乎发生了一点点意外。请稍后重试');
		},
		uploadingSucess : function(scode) {
		},
		uploadedError : function(ecode) {
            MI.Bos({"name":"uploadFaceFailed","iBak1":ecode});
			if (ecode == '-1')
			{
				alert('请选择jpg、jpeg、gif、png格式的图片');
			}
			else if (ecode == '-2')
			{
				alert('文件大小不超过2M');
			}
			else if (ecode == '-3')
			{
				alert('您的登录状态消失，请重新登录');
				window.location.href="http://t.qq.com/login.php";
			}
			else
			{
				alert('似乎发生了一点点意外，请稍后重试');
			}

		},
		uploadedSucess : function(scode,type) {
            MI.Bos({"name":"uploadFaceSuccess"});
			document.getElementById("upload_c_iframe").src='about:blank';
			if (MI.Face){
                if(type)
                {
                    MI.Bos({"name":"uploadFaceSuccess_Filter"});
                    MI.Face.saveSuccess({'guide':'修改头像成功！','content':'#露个脸#愿遇难的同胞安息！愿每个活着的人珍重！一起设置灰色头像为雅安默哀，让灾区人民感觉到他们的生命从来不是孤岛！http://p.t.qq.com/setting/face'});
                }
                else
                {
                    MI.Face.saveSuccess();
                }

			}
			else {
				MI.tip('上传头像成功',function(){
					window.location.reload();
				});
			}
		},
		cancelProgramm: function() {
			window.location.reload();
		},
        uploadSaveMethod:function(code,obj)
        {
            if(obj.name)
            {
                MI.Bos({"name":"uploadFaceWithFrame",'iBak1':code,"iBak2":obj.id,'sBak1':obj.name});
            }

        }
	}

	var cameraHeadJs = {
		initSystems : function(){
			MI.swf.CameraHead = 'http://mat1.gtimg.com/www/mb/swf/cameraHead_111018.swf';

			var html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="CameraHead" width="100%" height="100%" \
						codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab">\
							<param name="movie" value="' + MI.swf.CameraHead + '" />\
							<param name="wmode" value="transparent" />\
							<param name="quality" value="high" />\
							<param name="allowScriptAccess" value="always"/>\
							<param value="langVer=' + window.MILang + '" name="FlashVars" />\
							<embed src="' + MI.swf.CameraHead + '" quality="high" width="100%" height="100%" name="CameraHead" \
							align="middle" play="true" loop="false" quality="high" wmode="transparent" allowScriptAccess="always"\
							FlashVars="langVer=' + window.MILang + '" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer">\
							</embed>\
						</object>';
			var swf = UI.html(html)[0];
			UI.append(swf, UI.G('camphoto'));
			hideLoading();
		},
		getUrl:function(){
			return 'http://upload.t.qq.com/uploadheadpic.php';
		},
		uploadedError:function(ecode){
			if(ecode == '-1' || ecode == '-2'){
			}
			else if(ecode == '-3'){
				MI.alert('您的登录状态消失，请重新登录');
				window.location.href = 'http://t.qq.com/login.php';
			}
			else{
				MI.alert('似乎发生了一点点意外，请稍后重试');
			}
		},
		uploadedSuccess:function(scode){
			document.getElementById("upload_c_iframe").src='about:blank';
			if(MI.Face){
				MI.Face.saveSuccess();
			}
			else{
				MI.tip('上传头像成功', function(){
					window.location.reload();
				});
			}
		}
	}
	function hideLoading(){
		UI.hide(UI.GC('.maskLoading')[0]);
	}
	cutPhotoJs.initSystems();
	//cameraHeadJs.initSystems();

function adjustFlashHeigh(v){
	$('cutphoto').style.height = v + 'px';
    if($("qqminiblog"))
    {
        $('qqminiblog').style.height = v + 'px';
    }
}

function isCanUseCustomHead(){
    var QQvip = 0;
    var level = 1;
    var WBvip = 0;
    if(QQvip > 0 || level >= 6 || WBvip > 0)
    {
        return 1;
    }
	return 0;
}

function dispatchAS3Method(v,param){
	if (v == 'error_use_custom_head'){
        MI.Bos({"name":"uploadFaceFrameNoPrv","sBak1":param});
        var WBvipWhite = 1;
        if(WBvipWhite == 1){
        	MI.alert('<span style="font-size:12px;font-weight: 100;"><b>无法保存相框效果（'+param+'）</b><br>QQ会员、微博会员或Lv6及以上用户才可享受相框特权 <br>您需要 <a href="http://t.qq.com/?doTask=1" target="_blank">提高微博等级</a> 或 <a href="http://pay.qq.com/qqvip/index.shtml?aid=vip.gongneng.bd.weibo.biankuang" target="_blank">开通QQ会员</a> 或 <a href="http://vip.t.qq.com" target="_blank">开通微博会员</a></span> ');
        }else{
        	MI.alert('<span style="font-size:12px;font-weight: 100;"><b>无法保存相框效果（'+param+'）</b><br>QQ会员、微博会员或Lv6及以上用户才可享受相框特权 <br>您需要 <a href="http://t.qq.com/?doTask=1" target="_blank">提高微博等级</a> 或 <a href="http://pay.qq.com/qqvip/index.shtml?aid=vip.gongneng.bd.weibo.biankuang" target="_blank">开通QQ会员</a></span> ');
        }
	}
}

	
	function switchTab(idx){
		var o = UI.children(UI.GC('.homeTab')[0]);
		for(var i = 0; i < o.length; i++){
			if(UI.hasClass(o[i], 'select'))
				UI.removeClass(o[i], 'select');
		}
		UI.addClass(o[idx], 'select');

		var t = UI.children(UI.G('head'));
		if(UI.hasClass(t[idx], 'hideHead')){
			UI.removeClass(t[idx], 'hideHead');
		}
		for(var i=0; i < t.length; i++){
			if(i != idx){
				if(!UI.hasClass(t[i], 'hideHead')){
					UI.addClass(t[i], 'hideHead');
				}
			}
		}

		if(idx == 1){
			var temp = UI.children(UI.G('camphoto'));
			if(temp.length == 1)
				cameraHeadJs.initSystems();
			MI.Bos('btnCameraHead');
		}


	}

	function upload_c()
	{
		document.getElementById("upload_c").style.display="block";
		document.getElementById("head").style.display="none";
		document.getElementById("upload_a").style.display="none";
		document.getElementById("homeTit").style.display="none";
	}
	function checkFormC(o)
	{
		if (o.file_name.value == '')
		{
			alert('请选择需要上传的图片');
			return false;
		}
		else
		{
			o.submit();
		}
	}

	function checkFile(str)
	{
		var pos = str.lastIndexOf(".");
		var lastname = str.substring(pos,str.length)  //此处文件后缀名也可用数组方式获得str.split(".")
		if (lastname.toLowerCase()!=".jpg"
		&& lastname.toLowerCase()!=".jpeg"
		&& lastname.toLowerCase()!=".gif"
		&& lastname.toLowerCase()!=".png")
		{
			document.getElementById('uploadBtn').style.display= "none";
			alert('请选择jpg、jpeg、gif、png格式的图片');
		    return false;
		}
		else
		{
			document.getElementById('uploadBtn').focus();
			return true;
		}

	}
	function showResult(ecode)
	{
		if (ecode == 0)
		{
			cutPhotoJs.uploadedSucess();
		}
		else
		{
			cutPhotoJs.uploadedError(ecode);
		}
	}
	function iniPage()
	{
		var pos = window.location.href.indexOf('#ord');
		if (pos > 0)
		{
			upload_c();
		}
	}

	MIRun(function(){
		UI.ready(function(){
			var save_sync = $$(document.body,'.avatar_sync_pn')[0];
			if(save_sync) {
				var save_sync_pn = $$(save_sync,'.btn3_txt5')[0];
				var avatarList = UI.GT(save_sync,'li');
				var faceType = '';
				if(avatarList.length) faceType = UI.A(UI.GT(avatarList[0],'img')[0],'type');
				UI.each(avatarList,function(o,i) {
					o.onclick = function(){
						faceType = UI.A(UI.GT(this,'img')[0],'type');
						UI.each(avatarList,function(li){
							if(li != o) UI.removeClass(li,'select');
							else UI.addClass(li,'select');
						})
					}
				});

 				save_sync_pn.onclick = function(){
					MI.ajax({
						type : 'get',
						url : 'http://upload.t.qq.com/asyn/faceSave.php',
						data : {face:faceType},
						success : function(data){
							data = MI.json(data);
							if(data.result == 0) {
								MI.tip('修改头像成功！',function(){
									document.location.reload();
								});
							} else {
								MI.alert(data.msg);
							}
						}
					})
				}
			}
		})
	});
