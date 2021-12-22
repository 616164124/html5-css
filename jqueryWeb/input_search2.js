var flag1 = 0;
var flag2 = 0;
var pos=-1, pos2=-1;
 
function init(){	
	var t, t2;
	$("#listEmail").css("top",$("#inputBox").css("top")+$("#inputBox").css("height"));
	$("#listEmail").css("left",$("#inputBox").css("left"));
	$("#listName").css("top",$("#inputBox").css("top")+$("#inputBox").css("height"));
	$("#listName").css("left",$("#inputBox").css("left"));
	hide();
	$("li").css("font-size",$("#s_custemail").css("font-size"));
	$("li").css("font-size",$("#s_custname").css("font-size"));
	$("li").css("text-align","left");
	
	bindInput();
 
	var email = $("#s_custemail");
	var name = $("#s_custname");
 
	$("#listEmail li").mouseup(function(e){
		var str = $(this).text();
		setValue(email, str);
	});
 
	$("#listName li").mouseup(function(){
		var str = $(this).text();
		setValue(name, str);
	}); 
	
	$('#listEmail li').mousemove(function(e){
		pos = getMouseLocation(e);		
	});
 
	$('#listName li').mousemove(function(e){
		pos2 = getMouseLocation(e);
	});
		
	$("#s_custemail").blur(function(){
		if( pos==-1 || !isOutOfBound(pos,1) ){
			pos = -1;
			hide();
		}
	});
 
	$("#s_custname").blur(function(){
		if( pos==-1 || !isOutOfBound(pos,0) ){
			pos = -1;
			hide();
		}
	});	
}
 
 
function bindInput(){
	//IE
	if (window.ActiveXObject){
		document.getElementById('s_custemail').attachEvent("onpropertychange",show1);
		document.getElementById('s_custname').attachEvent("onpropertychange",show2);
	}else{
		$("#s_custemail").bind("input",show1);
		$("#s_custname").bind("input",show2);
	}
}
 
function show1(){
	var s_value = $("#s_custemail").val();
	$("#listEmail").children().children("li").hide();
	showListEmail();
	if(s_value.length >= 1){
		$("#listEmail").children().children("li").each(function(){
			var tmp = $(this).text().substr(0,$(this).text().length);
						
			if(tmp && s_value==tmp.substr(0,s_value.length)){
				$(this).show();
				flag1 = 1;
			}
		});
	}
}
 
function show2(){
	var s_value = $("#s_custname").val();
	$("#listName").children().children("li").hide();
	showListName();
	if(s_value.length >= 1){
		$("#listName").children().children("li").each(function(){
			var tmp = $(this).text().substr(0,$(this).text().length);
						
			if(tmp && s_value==tmp.substr(0,s_value.length)){
				$(this).show();
				flag1 = 1;
			}
		});
	}
}
 
function hide(){
	$("#listEmail").css("display","none");
	$("#listName").css("display","none");
}
 
function setValue(obj, str){
	obj.val(str);
	hide();
	obj.focus();
}
 
function showListEmail(){
    var obj = $('#s_custemail');
    $("#listEmail").css("left",parseInt(obj.offset().left));
    $("#listEmail").css("top",parseInt(obj.offset().top +obj.outerHeight()));    
    $("#listEmail").css('display', 'block');
}
 
function showListName(){
    var obj = $('#s_custname');
    $("#listName").css("left",parseInt(obj.offset().left));
    $("#listName").css("top", parseInt(obj.offset().top + obj.outerHeight()));    
    $("#listName").css('display', 'block');
}
 
function getEvent() //同时兼容ie和ff的写法
{
    if (document.all)
        return window.event;
    func = getEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0) {
            if ((arg0.constructor == Event 
            	|| arg0.constructor == MouseEvent) 
            	|| (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
                return arg0;
            }
        }
        func = func.caller;
    }
    return null;
}
 
function getMouseLocation(event) {
	var __is_ff = (navigator.userAgent.indexOf("Firefox") != -1); //Firefox 
    var e = getEvent(event);
    var mouseX = 0;
    var mouseY = 0;
	var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
	var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
	if (__is_ff) {
        mouseX = e.layerX + document.body.scrollLeft;
        mouseY = e.layerY + document.body.scrollLeft;
    }
    else {
        mouseX = e.pageX || e.clientX + scrollX;
        mouseY = e.pageY || e.clientY + scrollY;
    }
    return { x: mouseX, y: mouseY };
}
 
function isOutOfBound(pos, flag){
	var obj;
	if (flag) {
		obj = $('#listEmail');
	}else{
		obj = $('#listName');
	}
	if (pos && obj 
		&&pos.x >= obj.offset().left
		&& pos.x <= obj.offset().left+obj.outerWidth()
		&& pos.y >= obj.offset().top
		&& pos.y <= obj.offset().top+obj.outerHeight() ) {
		return true;
	};
    return false;
}
————————————————
版权声明：本文为CSDN博主「xiao2macf」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/xxm524/article/details/50596836