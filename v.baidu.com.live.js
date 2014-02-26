if(!window.serverTime){
    window.serverTime = new Date();
}
window.serverTimeDiff = (+new Date()) - (+window.serverTime);
function NOW(){
    return new Date((+new Date()) - window.serverTimeDiff);
}
function getDate(dateString){
    var date=NOW();
    var time = dateString.toString();
    if(time.match(/(\D|^)(\d{10})(\D|$)/)){
        date.setTime(parseInt(RegExp.$2, 10)*1000);
    }else if(time.match(/(\D|^)(\d{13})(\D|$)/)){
        date.setTime(parseInt(RegExp.$2, 10));
    }else if(time.match(/(\D|^)(\d{14})(\D|$)/)){
        var t = RegExp.$2;
        var y = parseInt(t.substr(0,4),10),
            m = parseInt(t.substr(4,2),10),
            d = parseInt(t.substr(6,2),10),
            ho= parseInt(t.substr(8,2),10),
            mi= parseInt(t.substr(10,2),10),
            se= parseInt(t.substr(12,2),10);
        date = new Date(y, m-1, d, ho, mi, se);
    }else if(time.match(/(\D|^)\d{12}(\D|$)/)){
        var t = RegExp.$2;
        var y = parseInt(t.substr(0,4),10),
            m = parseInt(t.substr(4,2),10),
            d = parseInt(t.substr(6,2),10),
            ho= parseInt(t.substr(8,2),10),
            mi= parseInt(t.substr(10,2),10),
            se= 0;
        date = new Date(y, m-1, d, ho, mi, se);
    }else if(time.match(/(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?/)){
        var y = parseInt(RegExp.$1,10);
        var m = parseInt(RegExp.$2,10);
        var d = parseInt(RegExp.$3,10);
        var ho= parseInt(RegExp.$4,10);
        var mi= parseInt(RegExp.$5,10);
        var se= parseInt(RegExp.$6,10)||0;
        date = new Date(y, m-1, d, ho, mi, se);
    }else{
        date = new Date(time);
    }
    return date;
}
                        
function paddingString(str, width, fillchar, cut) {
    fillchar = fillchar || " ";
    cut = cut || false;
    width = width || 0;
    var posit = (width < 0);
    str = str.toString();
    width = Math.abs(width);
    while(str.length < width){
        if(posit) str += fillchar;
        else str = fillchar + str;
    }
    if(cut){
        if(posit) str = str.substr(0, width);
        else str = str.substr(str.length - width);
    }
    return str;
}
    
function formatDate(date, format, cut){
    var MMM_arr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var MC_arr = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
    var DC_arr = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "二十一", "二十二", "二十三", "二十四", "二十五", "二十六", "二十七", "二十八", "二十九", "三十", "三十一"];
    var WDC_arr = ["日", "一", "二", "三", "四", "五", "六"];
    var WD_arr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var res = format;
    res = res.replace(/\$\{yyyy\}/g, paddingString(date.getFullYear(), 4, '0', cut));
    res = res.replace(/\$\{y\}/g, date.getFullYear());
    res = res.replace(/\$\{MMM\}/g, MMM_arr[date.getMonth()]);
    res = res.replace(/\$\{MM\}/g, paddingString(date.getMonth() + 1, 2, '0', cut));
    res = res.replace(/\$\{MC\}/g, MC_arr[date.getMonth()]);
    res = res.replace(/\$\{M\}/g, date.getMonth() + 1);
    res = res.replace(/\$\{dd\}/g, paddingString(date.getDate(), 2, '0', cut));
    res = res.replace(/\$\{dc\}/g, DC_arr[date.getDate()]);
    res = res.replace(/\$\{d\}/g, date.getDate());
    res = res.replace(/\$\{WDC\}/g, WDC_arr[date.getDay()]);
    res = res.replace(/\$\{WD\}/g, WD_arr[date.getDay()]);

    res = res.replace(/\$\{HH\}/g, paddingString(date.getHours(), 2, '0', cut));
    res = res.replace(/\$\{H\}/g, date.getHours());
    res = res.replace(/\$\{hh\}/g, paddingString((date.getHours() - 1) % 12 + 1, 2, '0', cut));
    res = res.replace(/\$\{mm\}/g, paddingString(date.getMinutes(), 2, '0', cut));
    res = res.replace(/\$\{m\}/g, date.getMinutes());
    res = res.replace(/\$\{ss\}/g, paddingString(date.getSeconds(), 2, '0', cut));
    res = res.replace(/\$\{s\}/g, date.getSeconds());
    res = res.replace(/\$\{msms\}/g, paddingString(date.getMilliseconds(), 4, '0', cut));
    res = res.replace(/\$\{ms\}/g, date.getMilliseconds());

    return res;
}

var right_url = "http://hz.tvsou.com/jm/hao123/hao123News_SYx7slix.asp?date=" + formatDate(NOW(), "${yyyy}-${MM}-${dd}") + "&ids=";
var right_url_map = {
    //'cntv': "http://tv.cntv.cn/api/epg/info?cb=updateCNTVPro&c=",
    'cntv': '/commonapi/httpproxy/?url=http://live.hao123.com/cntvdata/<%=id%>&refer=http://live.hao123.com',
    'tvsou': '/commonapi/httpproxy/?url=http://live.hao123.com/tvsoudata/<%=id%>&refer=http://live.hao123.com'
};
function fetch_proxy(url, id){
    var fetcher = "http://dy.hao123.com/fetchproxy?app=live&url=",
        type,
        cntvid,
        tvsouurl,
        cntvurl;
    var el = $('.folder .folder-list .item[tvsouid="' + id + '"]');
    if(!id){
		$("#player aside.epg ul.live-pro-now").html('<li style="background:none;color:#AAA;">暂无节目单！</li>');
		$("#content").addClass('no-programs');
        //$.getScript(fetcher + encodeURIComponent(url)); 
        return;
    }
    if(el.attr('cntvid')){
        type = 'cntv';
        cntvid = el.attr('cntvid');
        cntvurl = url + cntvid;
    }else{
        type = 'tvsou';
    }
    tvsouurl = url + id;
    if(type == 'tvsou' && window.epgList && window.epgList[id]){
        UpdatePrograms([{id: id, list: window.epgList[id]}]);
        return;
    };
    if(!type || type == 'tvsou'){
        //$.getScript(fetcher + encodeURIComponent(tvsouurl)); 
        $.getJSON(right_url_map['tvsou'].replace('<%=id%>', id), function(data){
            if(!data || data.length < 1){
                return;
            }
            UpdatePrograms([data]);
        });
        return;
    };
    
    if(type == 'cntv'){
        if(window.prodata && window.prodata[cntvid]){
            UpdatePrograms([window.prodata[cntvid]]);
            return;
        };
        $.getJSON(right_url_map['cntv'].replace('<%=id%>',cntvid), function(data){
            if(!data || data.length < 1){
                return;
            }
            updateCNTVPro(data);
        });
    };
}

//重新排序cntv传过来的数据数组
function _cntvdatasort(a, b){
    return a.time > b.time? 1:(a.time < b.time? -1:0);
}

//针对cntv数据单独做的数据请求处理
function fetch_proxy_cntv(fetch_url, url, counter){
    var now = NOW(),
        year = now.getFullYear(),
        month = now.getMonth(),
        date = now.getDate(),
        _url = '';
    _url = url + '&d=' + formatDate(new Date(year, month, date + counter), "${yyyy}${MM}${dd}");
    return $.getScript(fetch_url + encodeURIComponent(_url));
}

var getMaxBeforeNow = function(arr){
    var maxi = -1;
    var max = new Date(0);
    var now = NOW();
    for(var i = 0; i < arr.length; i ++){
        var d = getDate(arr[i].time);
        arr[i].index = i;
        if(d < now && max < d){
            maxi = i;
            max = d;
        }
    }
    if(maxi){
        return arr[maxi];
    }else{
        return {name:"没有数据", time:"", index:-1};
    }
};

var cookie_option = {};
cookie_option.expires = new Date(9999, 11, 31, 0,0,0);
cookie_option.path = "/";
//if(location.href.match(/\.hao123\.com/)) cookie_option.domain = "hao123.com";
var last_key;
var origin_title = document.title;
var all_stations = [];
$("#player .switcher-layer [key]").each(function(idx,elem){
    all_stations.push(elem.getAttribute("key"));
});
function getHistory(){
  var history = T.cookie.get("LIVE_HIS");
  try{
    if(!history){
      history = [];
    }else{
      history = T.json.parse(history);
      if(!$.isArray(history)) history = [];
    }
  }catch(ex){ history = []; }
  return history;
}
function rebuildStationHistory(history){
  var $his = $("#player .pages [tab=history]").empty();
  for(var i = 0; i < history.length; i ++){
    $("#player .pages [tab=stations] [type] .item[key='" + history[i] + "']").eq(0).clone(true).appendTo($his).children("em,i").remove();
  }
}
rebuildStationHistory(getHistory());
var link_key = null;
if(location.pathname.match(/^(?:\/live)?\/([\w-\.]+)/) && playStation(link_key = RegExp.$1)){
}else{
    link_key = null;
    var ll = T.cookie.get("LAST_LIVE");
    if(ll && playStation(ll)){
    }else if($("#player .pages .item[key]").attr("key")){
        playStation($("#player .pages .item[key]").attr("key"));
    }
}

window.updateProList = false;

function UpdatePrograms(data){
  var el = $(".page .folder-list li[key='" + last_key + "']");
  if(!window.updateProList && (data[0].id != el.attr('cntvid') && data[0].id != el.attr('tvsouid'))){
    _updateCurPro(data[0]);
    return;
  };
  var obj = data[0];
  var now = formatDate(NOW(), "${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}");
  if(!window.updateProList && obj){

    var $list = $("#player aside.epg ul.live-pro-now").empty();
    for(var i = 0, cnt = 0; i < Math.min(obj.list.length - 1,200); i++){
        
      if(obj.list[i+1].time >= now){
        var $item = $("<li/>")
                    .text(formatDate(getDate(obj.list[i].time),"${HH}:${mm}") + " " + obj.list[i].name)
                    .appendTo($list)
                    .attr("time", formatDate(getDate(obj.list[i].time),"${yyyy}${MM}${dd}${HH}${mm}${ss}"));
        $item.attr("title", $item.text());

        if(obj.list[i].time < now){
          $item.addClass("cur");
          if(obj.id == el.attr('cntvid') || obj.id == el.attr('tvsouid')){
            $("#live-list-now .live-list li span[key='"  + last_key + "']").find('.live-pro').html(obj.list[i].name);
            $("#live-list-now .live-list li span[key='"  + last_key + "']").find('.live-pro').attr('title', obj.list[i].name);
          }
          // if(obj.id == 'cctv5' || obj.id == '6'){
          //   $('.forcctv5 .cctv5-ol .onlive').html(obj.list[i].name);
          //   $('.forcctv5 .cctv5-url a').attr('title', obj.list[i].name);
          //   $('.forcctv5 .cctv5-url a').attr('href', $('.page .folder-list li[key=cctv5]').attr('cntvurl') || $('.page .folder-list li[key=cctv5]').attr('fytvurl'));
          // }
        }
        $item = null;
      }
    }
    
    updateProgram(obj);
    
  }else if(window.updateProList){
        updateProgram(obj);
        window.updateProList = false;
  }
}

function _updateCurTvsouPro(data){

    var _data = data,
        _source = 'tvsou',
        id;
    var el = $("#live-list-now .live-list li span[cntvid='']"),
        list = [],
        time = formatDate(NOW(), "${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}"),
        title;
    window.tvsou_livenow = data;
    $.each(el, function(index, item){
        var _el = el.eq(index),
        id = _el.attr('tvsouid');
        if(!data || !data[id] || data[id].list == null){
            return;
        }
        list = data[id].list;
        for(var i = 0;i < list.length;i ++){
            if(i == list.length -1 || list[i].time < time && list[i + 1].time > time){
                title = list[i].name;
                break;
            }
            if(list[i].time == time){
                title = list[i].name;
                break;
            }
        
        };
        _el.find('.live-pro')
                    .attr('title', title)
                    .html(title);
    });    
}

function _updateCurPro(data, source){
    var _data = data,
        source,
        id,
        el,
        list = [],
        time,
        tmp = {},
        title;
    window.cntv_livenow = data;
    $.each(_data, function(key, val){
        if(_data.id){
            return;
        }
        _source = source || 'tvsou';
        id = _data[key].id;
        el = $("#live-list-now .live-list li span[" + _source + "id='"  + id + "']");
        if(!_data[key].list){
            return;
        };

        list = _data[key].list;
        time = formatDate(NOW(), "${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}");
        for(var i = 0;i < _data[key].list.length;i ++){
            var _time = getDate(_data[key].list[i].st),
                _timeNext; 
            _time = formatDate(_time, '${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}');
            if(typeof _data[key].list[i + 1] == 'undefined'){
                title = _data[key].list[i].t;
                break;
            };
            _timeNext = getDate(_data[key].list[i + 1].st);
            _timeNext = formatDate(_timeNext, '${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}');
            if(_time < time && _timeNext > time){
                title = _data[key].list[i].t;
                break;
            }
            if(_time == time){
                title = _data[key].list[i].t;
                break;
            } 
        };
        el.find('.live-pro')
                    .attr('title', title)
                    .html(title);
    });
};

/*deal with cntv data*/
function updateCNTVPro(data){
    var _data = data;
    if(!_data){
        return;
    }
    _cntvToTvsou(_data);
}

/*cntv to tvsou's format*/
function _cntvToTvsou(data){
    var _data= data,
        tmp = {},
        name = '',
        time = '';
    window.prodata = window.prodata || {};
    window.prodata[_data.id] = {};
    window.prodata[_data.id].id = _data.id;
    window.prodata[_data.id].title = _data.channelName;
    window.prodata[_data.id].source = 'cntv';
    window.prodata[_data.id].list = [];
    
    for(var i in _data.list){
        if(_data.list[i] && _data.list[i].program){
            for(var j = 0;j < _data.list[i].program.length;j ++){
                tmp.name = _data.list[i].program[j].t;
                time = getDate(_data.list[i].program[j].st);
                tmp.time = formatDate(time, '${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}');
                window.prodata[_data.id].list.push(tmp);
                tmp = {};
            };
        }
    };
    UpdatePrograms([window.prodata[_data.id]]);
}
/**/
function getMockCaipiaoData(){
    var obj = {},
        tmp = {};
    obj.id = 'ssq';
    obj.list = [];
    obj.list.push({'time': '其他时段 ', 'name': '彩民故事—公益草原情'});
    obj.list.push({'time': '每周二四日 21:30 ', 'name': '双色球开奖直播'});
    obj.list.push({'time': '每周一三五 21:30 ', 'name': '七乐彩开奖直播'});
    obj.list.push({'name': '在线投注双色球', 'url': 'http://hao123.lecai.com/lottery/ssq/?agentId=5511'});
    obj.list.push({'name': '在线投注福彩3D', 'url': 'http://hao123.lecai.com/lottery/fc3d/?agentId=5511'});
    obj.list.push({'name': '在线投注七乐彩', 'url': 'http://hao123.lecai.com/lottery/qlc/?agentId=5511'});
    var str= '';
    $.each(obj.list, function(index, item){
        if(item.time){
            str += '<li title="">'+ item.time + item.name +'</li>';
        }
        if(item.url){
            str += '<li><a target="_blank" href="' + item.url + '" title="' + item.name +'">' + item.name +'</a></li>';
        }
    })
    $('#player .epg .live-pro-now')
        .html(str)
        .attr('focklist', 'true');
}      

function changePlaySource(url, type){
     $('#playerBox').html(
                type == 1 ? '<iframe id="iframePlayer" src="' + url + '" style="width:550px;height:405px;" frameborder="0" scrolling="no"></iframe>' :
                    T.swf.createHTML({
                        id: "flashPlayer",
                        url: url,
                        width: 550,
                        height: 405,
                        devicefont: false,
                        wmode: 'opaque',
                        allowScriptAccess: 'always',
                        allowFullscreen: true,
                        allownetworking: 'all'
                    })
        )
}

/*needes to update params before put online*/
/*fetch_proxy需要修改，for tvsou and cntv,切换iframe的src，需要调整以适应两个资源*/
function playStation(key){
    if(last_key == key) return false;
    $("#change-source").html("");
    var $item = $("#player [tab=stations] [key='" + escape(key)+"']"),
        url,
        source,
        urlSource,
        stKey = key;
    /*shuangseqiu*/
    if(stKey == 'ssq'){
        getMockCaipiaoData();
        $('#content').hide();
    }else{
        if($('#player .epg .live-pro-now').attr('focklist')){
            $('#player .epg .live-pro-now').removeAttr('focklist');
        }
        $('#content').show();
    }
    /*shuangseqiu end*/
    if($item.attr('cntvid')){
        source = 'cntv';
    }else{
        source = 'tvsou';
    };

    //获取分割出的url
	url = $item.attr('defurl');
    var urls = new Array();
    if (typeof url !== "undefined"){
        urls = url.split(";");
    }

    //获取分割出的type
    var type = $item.attr("type");
    var types = new Array();
    if (typeof type !== "undefined") {
        types = type.split(";");
    }
	/*
    url = $item.attr("letvurl") || $item.attr("cntvurl") || $item.attr("fytvurl")
            ||$item.attr("pptvurl")||$item.attr("hstvurl")
            ||$item.attr("pluginurl")||$item.attr("nopluginurl");
    if($item.attr("letvurl")){
        urlSource = 'letv';
    }
    else if($item.attr("cntvurl")){
        urlSource = 'cntv';
    }
    else if($item.attr("fytvurl")){
        urlSource = 'fytv';
    }
    else if($item.attr("pptvurl")){
        urlSource = 'pptv';
    }
    else if($item.attr("cntvurl")){
        urlSource = 'hstv';
    }else{
        urlSource = '';
    };
	*/
    var source_map = ['letv', 'cntv','fytv', 'pptv', 'hstv'];
    var title_map = { 'letv': '乐视', 'cntv': 'cntv', 'fytv': '风云直播', 'pptv': 'pptv', 'hstv': '华数'};
    var pos;
    if(url){
        var history = getHistory();
        if((pos = $.inArray(key,history)) > -1){
          history.splice(pos, 1);
        }
        last_key = key;

        // if($item.attr('cntvid') == 'cctv5' || $item.attr('tvsouid') == '6'){
        //     $('#player-frame').hide();
        //     $('.play-btn').hide();
        //     $('.forcctv5').removeClass('hidden');
        // }else{
        //     $('#player-frame').removeAttr('style');
        //     $('.play-btn').removeAttr('style');
        //     $('.forcctv5').addClass('hidden');
        // }
        if(stKey != 'ssq'){
            fetch_proxy(right_url_map[source],$item.attr('tvsouid'));
        }
        //$('#player-frame').removeAttr('_src');
        //$('.player-frame').find('.play-btn').hide();;
        $("#player aside.epg h3").text($item.attr("title"));
        history.unshift(key);
        if(history.length > 12) history.pop();
        T.cookie.set("LIVE_HIS", T.json.stringify(history), cookie_option);
        rebuildStationHistory(history);
        
        T.cookie.set("LAST_LIVE", key, cookie_option);
		/*
        $("#player-frame").attr("src" , "about:blank");
        setTimeout(function(){
            $("#player-frame").attr("src", url);
        }, 100);
		*/
        if(urls.length > 1) {
           var dom_str = "<em>若当前播放不顺畅，可点击这里切换：</em>";
           for (var i = 0; i < urls.length; i++){
                types[i] = types[i] || 2;
                dom_str += "<a defurl=" + urls[i] + " type=" + types[i] + "><img src=" + window.L.getSiteLogoByUrl(urls[i]) + "/></a>";
           }
           $("#change-source").html(dom_str);
           //为第一个节点添加默认样式
           var selectedNode = $("#change-source").children("a").eq(0);
           selectedNode.addClass("cur");
           var curtype = types[0];
           $("#change-source a").on("click", function() {
                selectedNode.removeClass("cur");
                selectedNode = $(this);
                selectedNode.addClass("cur");
                var changeurl = $(this).attr("defurl");
                
                var currenturl;
                if (curtype !=1){
                    currenturl = $("#flashPlayer embed").attr("src") || "";
                }else{ 
                    currenturl = $("#iframePlayer").attr("src") || "";
                }
                
                //如果点击url与当前播放的url相同，则不刷新页面
                if(changeurl == currenturl) 
                    return false;
                curtype = $(this).attr("type");
                changePlaySource(changeurl, curtype);
           });
        }
        $('#playerBox').html(
                types[0] == 1 ? '<iframe id="iframePlayer" src="' + urls[0] + '" style="width:550px;height:405px;" frameborder="0" scrolling="no"></iframe>' :
                    T.swf.createHTML({
                        id: "flashPlayer",
                        url: urls[0],
                        width: 550,
                        height: 405,
                        devicefont: false,
                        wmode: 'opaque',
                        allowScriptAccess: 'always',
                        allowFullscreen: true,
                        allownetworking: 'all'
                    })
        )

        $("#player aside .playing").removeClass("playing").removeClass("playing-and-with-program");
        var $li = $("#player aside .page .item[key='"+escape(key)+"']").addClass("playing");
        if(T.browser.ie < 7 && $li.hasClass("with-program" && $('.folder[folder=hots]').has($li).length != 0)){
          $li.addClass("playing-and-with-program");
        }
        document.title = $item.attr("title") + "_" + origin_title;
		/*
        if(window.history.pushState){
            if(location.pathname != (location.hostname=="live.hao123.com"? "/":"/live/")+key){
                window.history.replaceState({key:key},$item.title + "-" + origin_title, (location.hostname=="live.hao123.com"?"/":"/live/")+key+(!location.search || location.search.indexOf('?')>-1?location.search:("?"+location.search)));
            }
        }
		*/
        /*show all resources
        if($('#change-source a').length > 0){
            $('#change-source').hide();
            $('#change-source a').remove();
            
        }
        for(var i = 0;i < source_map.length;i ++){
            if($item.attr(source_map[i] + 'url') && source_map[i] != urlSource){
                $('#change-source em').after(
                    $('<a />')
                        .attr('linkurl', $item.attr(source_map[i] + 'url'))
                        .html('<img width="16" height="16" src="/static/img/live/' + source_map[i] + '.jpg" title="' + title_map[source_map[i]] + '"/>')
                );
            }else if($item.attr(source_map[i] + 'url') && source_map[i] == urlSource){
                $('#change-source').append(
                    $('<a />')
                        .addClass('cur')
                        .attr('linkurl', $item.attr(source_map[i] + 'url'))
                        .html('<img width="16" height="16" src="/static/img/live/' + source_map[i] + '.jpg" title="' + title_map[source_map[i]] + '"/>')
                );
            }
        }
        if($('#change-source a').length > 1){
            $('#change-source').show();
        }else{
            $('#change-source').hide();
        }
		*/
        tracker.send({level:2,page:'hao123-v-live',type:'station',station:key});
        return true;
    }
    return false;
}
$(window).on("popstate", function(e){
    var obj = e.state;
    obj && obj.key && playStation(obj.key);
});

G.placeholder.bind("station_search", "搜索电视台", "search_holder");


(function(){
    var station_search = T.g("station_search");
    var sug = T.dom.query("#player suggest")[0];
    var ul = T.dom.query("ul", sug)[0];
    var intval = 0;
    var lis = $(sug).find("li");
    T.event.on(station_search, "focus", function(){
        T.dom.removeClass(sug, "hide");
        var last = "-";
        intval = setInterval((function(){
            var v = station_search.value;
            var hideall = (v == "");
            if(v == last) return;
            last = v;
            for(var i = 0, cnt = 0; i < lis.length; i++){
                var filter = {name:lis[i].getAttribute("title"), spell:lis[i].getAttribute("spell")};
                if(cnt < 10 && !hideall && (filter.name.indexOf(v) > -1 || filter.spell.toLowerCase().indexOf(v.toLowerCase()) > -1)){
                    cnt++;
                    T.dom.removeClass(lis[i], "hide");
                }else{
                    T.dom.addClass(lis[i], "hide");
                }
            }
            return arguments.callee;
        })(), 100);
    });
    T.event.on(station_search, "blur", function(){
        T.dom.addClass(sug, "hide");
        clearInterval(intval);
        intval = 0;
    });
})();


/* for program list */
var tvsous = [];
var tvsou_map = {};
$("[tvsouid]").each(function(idx,elem){
    if(!tvsou_map.hasOwnProperty($(elem).attr("tvsouid"))){
      tvsou_map[$(elem).attr("tvsouid")] = {
        'key':$(elem).attr("key")
      }
      tvsous.push($(elem).attr("tvsouid"));
    }
});
var plids = tvsous.join(",");
var l_hots = $(".dropdown .tab li[forkey=dl_hots]")[0];
var l_cctv = $(".dropdown .tab li[forkey=dl_cctv]")[0];
var l_stv = $(".dropdown .tab li[forkey=dl_stv]")[0];
var l_zj = $(".dropdown .tab li[forkey=dl_zj]")[0];
var l_huashu = $(".dropdown .tab li[forkey=dl_huashu]")[0];
var l_zonghe = $(".dropdown .tab li[forkey=dl_zonghe]")[0];
var l_ty = $(".dropdown .tab li[forkey=dl_ty]")[0];
var pl1 = $("#pl1")[0];
var pl2 = $("#pl2")[0];
var cur_today_pl = [];
var curEpgId = "";
var epgList = {};
var epgObj = {};
var _DEFAULT_EPG_="46";

T.event.on(T.g("daytab"), "click", function(e){
    var dt = T.event.getTarget(e);
    while(dt!=document.body && dt.tagName.toLowerCase() != "li"){
        dt = dt.parentNode;
    }
    if(dt.tagName.toLowerCase() != "li"){
        return;
    }
    try{
        T.dom.removeClass(T.dom.query("#daytab li.cur")[0], "cur");
    }catch(err){}
    T.dom.addClass(dt, "cur");
    refreshPL();
});

// fetch_proxy("http://hz.tvsou.com/jm/hao123/getlist_b_s98WQxkus.asp?&d=" + parseInt(NOW().getTime()/4.32e7) + "&ids=" + plids);


T.event.on(T.dom.query(".dropdown_button")[0], "click", function(e){
    T.event.stopPropagation(e);
    var div = T.dom.query(".dropdown")[0];
    if(T.dom.hasClass(div, "hide")){
        T.dom.removeClass(div, "hide");
        T.dom.addClass(T.dom.query(".dropdown_button")[0], "down");
        var bpos = T.dom.getPosition(T.dom.query(".dropdown_button")[0]);
        var cpos = T.dom.getPosition(T.g("program_list"));
        T.dom.setPosition(div, {left:bpos.left - cpos.left, top:bpos.top-cpos.top+23});
        T.dom.addClass(T.g("program_list"), "expand_stations");
    }else{
        T.dom.addClass(div, "hide");
        T.dom.removeClass(T.dom.query(".dropdown_button")[0], "down");
        T.dom.removeClass(T.g("program_list"), "expand_stations");
    }
});
T.event.on(T.dom.query(".dropdown")[0], "click", function(e){
    var obj = T.event.getTarget(e);
    var key = obj.getAttribute("tvsoukey") || obj.getAttribute("key");
    if(key){
        window.updateProList = true;
        $('#content').show();
        T.cookie.set("LAST_LIVE_EPG", key, cookie_option);
        if(obj.getAttribute("cntvkey") && window.epgList[obj.getAttribute("cntvkey")]){
            updateProgram({id: obj.getAttribute("cntvkey"), source: 'cntv', list: window.epgList[obj.getAttribute("cntvkey")]});
        }
        else if(obj.getAttribute("key") && window.epgList[key]){
            updateProgram({id:key, list:window.epgList[key]});
        }
        else{
            fetch_proxy(right_url_map['tvsou'], key);
        }
    }else{
        T.event.stopPropagation(e);
    }
});
T.event.on(document.body, "click", function(){
    T.dom.addClass(T.dom.query(".dropdown")[0], "hide");
    T.dom.removeClass(T.dom.query(".dropdown_button")[0], "down");
    T.dom.removeClass(T.g("program_list"), "expand_stations");
});

/*获取单个电视台节目的回调函数*/    /*fetch_proxy需要修改，for tvsou and cntv*/
function updateProgram(obj){
    var source = obj.source || 'tvsou',
        $item = $("#player .item[" + source + "id='" + obj.id + "']").eq(0);
    if($item.length){
        window.curEpgId = obj.id;
        window.epgList = window.epgList || {};
        window.epgList[obj.id] = obj.list;
        var daytab = T.g("daytab");
        T.dom.empty(daytab);
        $("#program_list .dropdown_button .title").eq(0).text($item.attr('title'));
        if(obj.source || obj.source == 'cntv'){
            $('#daytab').attr('source', 'cntv');
        }else{
            $('#daytab').attr('source', 'tvsou');
        }
        $('#daytab').attr('sourceid', obj.id);
        var bd = NOW();
        var li;
        for(var last = "", i = 0, dc = 0; i < obj.list.length && dc < 7; i++){
            var d = getDate(obj.list[i].time);
            var dt = formatDate(d, "${yyyy}年${MM}月${dd}日");
            if(last != dt){
                li = document.createElement("li");
                if(dt == formatDate(bd, "${yyyy}年${MM}月${dd}日")){
                    li.className = "today cur";
                    li.appendChild(document.createElement("i"));
                    if(T.browser.ie<7)T.dom.addClass(li,"today_cur");
                }
                if(dt >= formatDate(bd, "${yyyy}年${MM}月${dd}日")){
                  dc++;
                  daytab.appendChild(li);
                  var pw = document.createElement("p");
                  pw.className = "wd";
                  var p = document.createElement("p");
                  pw.className = "dt";
                  $(pw).text(formatDate(d, "星期${WDC}"))
                  $(p).text(dt);
                  li.setAttribute("dt", formatDate(d,"${yyyy}${MM}${dd}"));
                  li.appendChild(p);
                  li.appendChild(pw);
                }
                last = dt;
            }
        }
		$("#content").removeClass('no-programs');
        refreshPL();
    }
};

/*fetch_proxy需要修改，for tvsou and cntv, 每天节目单更新*/
function refreshPL(){
  var cur = $("#daytab .cur").attr("dt")+'000000';
  var prefix = formatDate(getDate(cur), "${yyyy}-${MM}-${dd}");
  var spl = prefix + " 12:00:00";
  var now = formatDate(NOW(), "${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}");
  $([pl1,pl2]).empty();
  var source,
      $item,
      replay;
  if($("#player .item[cntvid='" + window.curEpgId + "']").eq(0).length != 0){
    $item = $("#player .item[cntvid='" + window.curEpgId + "']").eq(0);
    source = 'cntvid';
  }else{
    $item = $("#player .item[tvsouid='" + window.curEpgId + "']").eq(0);
    source = 'tvsouid';
  }
  replay = $item.attr('cntvreplay') || '0';
  var j = 0;
  for(var i = 0; i < window.epgList[window.curEpgId].length; i++){
    var ep = window.epgList[window.curEpgId][i];
    if(ep.time.substr(0,10) == prefix){
      var $item = $("<li />")
            .append($('<em />').html(formatDate(getDate(ep.time),"${HH}:${mm}")+" "+ep.name))
            .attr("title",ep.name).attr("time",formatDate(getDate(ep.time),"${HH}${mm}${ss}"))
            .attr('index', i);
      var _time = NOW(),
          timeline = new Date(_time.getFullYear(), _time.getMonth(), _time.getDate(), 19, 00, 00),
          url;
      timeline = formatDate(timeline, "${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}");
      if($('#daytab').attr('source') && $('#daytab').attr('source') == 'cntv' && replay != '0'){
          if(ep.time < timeline && ep.time < now){
              url = 'http://tv.cntv.cn/live/' + $('#daytab').attr('sourceid') + '?date=' 
          + formatDate(NOW(), "${yyyy}${MM}${dd}") + '&index=' + j;
              j ++;
          }
      }
      if( ep.time <= now && (!epgList[curEpgId][i+1] || epgList[curEpgId][i+1].time>now)){
        $item.addClass("cur");
      }
      if(ep.time<spl){
        $item.appendTo(pl1);
      }else{
        $item.appendTo(pl2);
      }
    }
  }

};

/*fetch_proxy需要修改，for tvsou and cntv, 修改右侧节目list的状态，当天节目list状态以及热播电视的节目状态*/
function refreshPlayState(){
  var now = formatDate(NOW(), "${yyyy}${MM}${dd}${HH}${mm}${ss}");
  var todaytab = $("#daytab .today.cur");
  var i;
  if(todaytab.length){
    var today = todaytab.attr("dt");
    var items = $("#program_list .programs li");
    for(i = 0; i < items.length - 1;i++){
      var tm = today+items.eq(i).attr("time");
      var ntm = today+items.eq(i+1).attr("time");
      if(tm <= now && ntm > now){
        break;
      }
    }
    items.eq(i).addClass("cur").siblings().removeClass("cur").parent().siblings().children(".cur").removeClass("cur");
  }
  var items = $("#player aside.epg .live-pro-now li");
  /*fock pro list don't need to refresh*/
  if(items.length && !$("#player aside.epg .live-pro-now").attr('focklist')){
    for(i = 0; i < items.length - 1;i++){
      var tm = items.eq(i).attr("time");
      var ntm = items.eq(i+1).attr("time");
      if(tm <= now && ntm > now){
        break;
      }
    }
    items.eq(i).addClass("cur").siblings().removeClass("cur");
    if(i > 5){
      items.filter(":lt("+(i-5)+")").remove();
    }
  }
  var hots = $("#player .pages [folder=hots] .item");
  for(var i = 0; i < hots.length; i++){
    var $item = hots.eq(i),$em = $item.children("em");
    var time = $item.attr("time"), program = $item.attr("program") || "精彩节目";
    $em.text(time + " " + program);
    var now = formatDate(getDate(NOW() - 18e5), "${HH}:${mm}");
    if(now < time){
      $item.addClass("with-program");
      if($item.hasClass("playing") && T.browser.ie < 7){
        $item.addClass("playing-and-with-program");
      }
    }else{
      $item.removeClass("with-program").removeClass("playing-and-with-program");
    }
  }
  if(window.cntv_livenow && window.tvsou_livenow){
    _updateCurPro(window.cntv_livenow);
    _updateCurTvsouPro(window.tvsou_livenow);
  }
  
  return arguments.callee;
};
setInterval(refreshPlayState(), 10000);

//给IE6加hover事件
if(T.browser.ie < 7){
    /*programlist hover*/
    $("#daytab").on("mouseover", "li", function(e){
        e = T.event.get(e);
        var target = T.event.getTarget(e);
        for(var t = target; t && t!=document.body; t = t.parentNode){
            if(T.dom.query.matchesSelector(t, "#daytab li")){
                T.dom.addClass(t, "hover");
                break;
            }
        }
    }).on("mouseout", "li", function(e){
        e = T.event.get(e);
        var target = T.event.getTarget(e);
        for(var t = target; t && t!=document.body; t = t.parentNode){
            if(T.dom.query.matchesSelector(t, "#daytab li")){
                T.dom.removeClass(t, "hover");
                break;
            }
        }
    });
    $("#player .pages .item").on("mouseover",function(e){
        e = T.event.get(e);
        var target = T.event.getTarget(e);
        for(var t = target; t && t!=document.body; t = t.parentNode){
            if(T.dom.query.matchesSelector(t, "#player .pages .item")){
                T.dom.addClass(t, "hover");
                break;
            }
        }
    }).on("mouseout", function(e){
        e = T.event.get(e);
        var target = T.event.getTarget(e);
        for(var t = target; t && t!=document.body; t = t.parentNode){
            if(T.dom.query.matchesSelector(t, "#player .pages .item")){
                T.dom.removeClass(t, "hover");
                break;
            }
        }
    });
    $(".switcher, .switcher-layer").on("mouseover","b",function(){
        $(this).addClass("hover");
    }).on("mouseout", "b",function(){
        $(this).removeClass("hover");
    });
    $("suggest").on("mouseover","li",function(){
        $(this).addClass("cur");
    }).on("mouseout", "li",function(){
        $(this).removeClass("cur");
    });
    $("#player .pages h4").on("mouseover",function(e){
        $(this).addClass("hover");
    }).on("mouseout",function(e){
        $(this).removeClass("hover");
    });
    $("#program_list .dropdown .pages").on("mouseover","li",function(e){
        $(this).addClass("hover");
    }).on("mouseout","li",function(e){
        $(this).removeClass("hover");
    });
}
/* end for program list */

function updateEpg(obj){
  window.epgObj = obj;
  //console.log(JSON.stringify(obj));
  /*var lastepg = T.cookie.get("LAST_LIVE_EPG")||$("#player [tab=stations] [folder=hots] .item").attr("tvsouid");
  if(window.epgObj[lastepg])fetch_proxy(window.epgObj[lastepg].epgurl + "&d=" + parseInt(NOW().getTime()/4.32e7));*/
}

function cctvTab(){
    T.dom.addClass(l_cctv, "cur");
    T.dom.removeClass(l_stv, "cur");
    T.dom.removeClass(l_zj, "cur");
    T.dom.removeClass(l_huashu, "cur");
    T.dom.removeClass(l_zonghe, "cur");
    T.dom.removeClass(l_ty, "cur");
    T.dom.addClass(T.g("dl_zj"), "hide");
    T.dom.addClass(T.g("dl_huashu"), "hide");
    T.dom.addClass(T.g("dl_zonghe"), "hide");
    T.dom.addClass(T.g("dl_ty"), "hide");
    T.dom.addClass(T.g("dl_stv"), "hide");
    T.dom.removeClass(T.g("dl_cctv"), "hide");
}
function stvTab(){
    T.dom.addClass(l_stv, "cur");
    T.dom.removeClass(l_cctv, "cur");
    T.dom.removeClass(l_zj, "cur");
    T.dom.removeClass(l_huashu, "cur");
    T.dom.removeClass(l_zonghe, "cur");
    T.dom.removeClass(l_ty, "cur");
    T.dom.addClass(T.g("dl_zj"), "hide");
    T.dom.addClass(T.g("dl_huashu"), "hide");
    T.dom.addClass(T.g("dl_zonghe"), "hide");
    T.dom.addClass(T.g("dl_ty"), "hide");
    T.dom.addClass(T.g("dl_cctv"), "hide");
    T.dom.removeClass(T.g("dl_stv"), "hide");
}
function zjTab(){
    T.dom.addClass(l_zj, "cur");
    T.dom.removeClass(l_cctv, "cur");
    T.dom.removeClass(l_stv, "cur");
    T.dom.removeClass(l_huashu, "cur");
    T.dom.removeClass(l_zonghe, "cur");
    T.dom.removeClass(l_ty, "cur");
    T.dom.addClass(T.g("dl_huashu"), "hide");
    T.dom.addClass(T.g("dl_zonghe"), "hide");
    T.dom.addClass(T.g("dl_ty"), "hide");
    T.dom.addClass(T.g("dl_stv"), "hide");
    T.dom.addClass(T.g("dl_cctv"), "hide");
    T.dom.removeClass(T.g("dl_zj"), "hide");
}
function huashuTab(){
	T.dom.addClass(l_huashu, "cur");
    T.dom.removeClass(l_cctv, "cur");
	T.dom.removeClass(l_stv, "cur");
    T.dom.removeClass(l_zj, "cur");
    T.dom.removeClass(l_zonghe, "cur");
    T.dom.removeClass(l_ty, "cur");
    T.dom.addClass(T.g("dl_zj"), "hide");
    T.dom.addClass(T.g("dl_zonghe"), "hide");
    T.dom.addClass(T.g("dl_ty"), "hide");
    T.dom.addClass(T.g("dl_stv"), "hide");
    T.dom.addClass(T.g("dl_cctv"), "hide");
    T.dom.removeClass(T.g("dl_huashu"), "hide");
}
function zongheTab(){
    T.dom.addClass(l_zonghe, "cur");
    T.dom.removeClass(l_cctv, "cur");
    T.dom.removeClass(l_stv, "cur");
    T.dom.removeClass(l_zj, "cur");
    T.dom.removeClass(l_huashu, "cur");
    T.dom.removeClass(l_ty, "cur");
    T.dom.addClass(T.g("dl_zj"), "hide");
    T.dom.addClass(T.g("dl_huashu"), "hide");
    T.dom.addClass(T.g("dl_ty"), "hide");
    T.dom.addClass(T.g("dl_stv"), "hide");
    T.dom.addClass(T.g("dl_cctv"), "hide");
    T.dom.removeClass(T.g("dl_zonghe"), "hide");
}
function tyTab(){
    T.dom.addClass(l_ty, "cur");
    T.dom.removeClass(l_cctv, "cur");
    T.dom.removeClass(l_stv, "cur");
    T.dom.removeClass(l_zj, "cur");
    T.dom.removeClass(l_huashu, "cur");
    T.dom.removeClass(l_zonghe, "cur");
    T.dom.addClass(T.g("dl_zj"), "hide");
    T.dom.addClass(T.g("dl_huashu"), "hide");
    T.dom.addClass(T.g("dl_zonghe"), "hide");
    T.dom.addClass(T.g("dl_stv"), "hide");
    T.dom.addClass(T.g("dl_cctv"), "hide");
    T.dom.removeClass(T.g("dl_ty"), "hide");
}
cctvTab();

$("#player").on("click","aside .page .item[key]",function(){

    //todo
    //对
    playStation($(this).attr("key"));
});

$("#player .stations .controler").on("mouseover", ".item", function(){
    var tab = $(this).attr("tab");
    $("#player .stations .pages .page[tab='" + tab + "']").addClass("cur").siblings(".page").removeClass("cur");
    $(this).addClass("cur").siblings(".item").removeClass("cur");
});
$("#switch-light").on("click",function(){
    $("body").toggleClass("light-off");
});
$("#player .switcher b").on("mousedown",function(){
    var $this = $(this);
    if($this.is(".prev")){
      $this.addClass("down");
      var idx = ($.inArray(last_key, all_stations) - 1 + all_stations.length) % all_stations.length;
      playStation(all_stations[idx]);
    }else if($this.is(".next")){
      $this.addClass("down");
      var idx = ($.inArray(last_key, all_stations) + 1) % all_stations.length;
      playStation(all_stations[idx]);
    }else if($this.is(".showall")){
      if($this.hasClass("down")){
        $this.removeClass("down");
        $("#player .switcher-layer").fadeOut("fast");
      }else{
        $this.addClass("down");
        $("#player .switcher-layer").fadeIn("fast").find("[key="+last_key+"]").addClass("playing").
                                     siblings(".playing").removeClass("playing");
      }
    }
}).on("mouseup",function(){
    $(this).filter(":not(.showall)").removeClass("down");
}).on("mouseout",function(){
    $(this).filter(":not(.showall)").removeClass("down");
});
$("#player .switcher-layer .live-list").on("click","span",function(){
    playStation($(this).attr("key"));
    $("#player .switcher-layer").fadeOut("fast");
    $("#player .switcher b.showall").removeClass("down");
});

$("body").on("mousedown",function(e){
    var $target = $(e.target);
    var void_selector = "#player .switcher-layer,#player .switcher .showall";
    if(!($target.is(void_selector) || $target.parents(void_selector).length)){
      $("#player .switcher-layer").fadeOut("fast");
      $("#player .switcher b.showall").removeClass("down");
    }
});
$("suggest").on("mousedown","li",function(){
    playStation($(this).attr("key"));
});
setInterval((function(){
  var d = NOW();
  var timestring = (d.getMonth()+1) + "月" + d.getDate() + "日 星期" + '日一二三四五六'.substr(d.getDay(),1) + " " + (d.getHours()>9?d.getHours():('0'+d.getHours())) + ":" + (d.getMinutes()>9?d.getMinutes():('0'+d.getMinutes()));
  $("#time-area").text(timestring);
  return arguments.callee;
})(),1000);
$("#player").on("click","aside .folder",
    function(e){
        $(this).addClass("exp").siblings(".exp").removeClass("exp");
        if($(this).find(".folder-list").height()>164) $(this).find(".folder-list").css({height:'164px'});
    }
);
$("#player aside .folder[folder=" + (link_key || "hots") + "]").trigger("click");
;;;(function($, global){
	/*
    $('#change-source').on('click', 'a',function(){
        var url = $(this).attr('linkurl');
        $(this).siblings('a').removeClass('cur');
        $(this).addClass('cur');
        $('#player-frame').attr('src', 'about:blank');
        setTimeout(function(){
            $('#player-frame').attr('src', url);
        }, 100);
    });
    $('#program_list .programs').on('click', 'li a',function(){
        var url = $('#player-frame').attr('src');
        $('.play-btn').show();
        $('#player-frame').attr({'src':'about:blank', '_src':url});

    });

    $('.play-btn').click(function(){
        var url = $('#player-frame').attr('_src');
        $('#player-frame').attr({'src':url});
        $('.play-btn').hide();
        setTimeout(function(){
            $('#player-frame').removeAttr('_src');
        }, 100);
    });

    $('.play-btn')
        .mouseover(function(){
            $(this).addClass('cur');
        })
        .mouseout(function(){
            $(this).removeClass('cur');
        });
	*/

    function _getCurPro(){
        var el = $('.switcher-layer .live-list li span'),
            key,
            tvsouid,
            cntvid,
            tar;
        $.getJSON('/commonapi/httpproxy/?url=http://live.hao123.com/tvsoudata/today&refer=http://live.hao123.com', function(data){
            if(!data || data.length < 1){
                return;
            }
            _updateCurTvsouPro(data); 
        });
        $.getJSON('/commonapi/httpproxy/?url=http://live.hao123.com/cntvdata/today&refer=http://live.hao123.com', function(data){
            if(!data || data.length < 1){
                return;
            }
            _updateCurPro(data, 'cntv'); 
        });
    };

    _getCurPro();

})(this.jQuery, this.window);

(function() {
	var ePlayer = document.getElementById('player'),
		a = document.createElement('a');
	ePlayer.style.position = 'relative';
	a.appendChild(document.createTextNode('热辣视频尽在视频广场'));
	a.href = 'http://v.baidu.com/square/';
	a.target = '_blank';
	a.style.cssText = 'position:absolute;top:7px;left:222px;color:#FFFF00';
	ePlayer.appendChild(a);
}());