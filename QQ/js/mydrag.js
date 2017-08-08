//通过class获取元素集合
function getByClass(clsName,parentId){

	var oParent = parentId?document.getElementById(parentId):document,
	    eles = [],
	    elements = oParent.getElementsByTagName("*"),
	    length = elements.length;
	    for(var i=0;i<length;i++){
	    	if(elements[i].className == clsName){
	    		eles.push(elements[i]);
	    	}
	    }  
	    return eles;
}

//当文档加载完毕之后执行拖拽的方法
window.onload = drag;
function drag(){
	var oTitle=getByClass('login_logo_webqq','loginPanel')[0];
	
	//在标题上按下
	oTitle.onmousedown = fnDown;

	//关闭
	var oClose = document.getElementById('ui_boxyClose');
	oClose.onclick = function(){
		document.getElementById('loginPanel').style.display = 'none';
	}


	//当鼠标点击的时候进行状态切换
	var loginState=document.getElementById('loginState'),
       stateList=document.getElementById('loginStatePanel'),
       lis=stateList.getElementsByTagName('li'),
       stateTxt=document.getElementById('login2qq_state_txt'),
       loginStateShow=document.getElementById('loginStateShow');

       loginState.onclick = function(){
       	stateList.style.display = 'block';
       }

       var size = lis.length;
       for(var i=0;i<size;i++){
       	lis[i].onmouseover = function(){
       		this.style.background = '#567';       		
       	};
       	lis[i].onmouseout = function(){
       		this.style.background = "#fff";
       	};
       	lis[i].onmousedown = function(){
       		stateList.style.display = 'none';
       		//获取li标签的class属性加给loginStateShow这个div的class
       		/*var childs = lis[i].getElementsByTagName('div');
       		var text = childs[1].childNodes[0].nodeValue;
       		alert(text);*/
       		var idname = this.id;

       		//给他添加一个class名为idName
       		loginStateShow.className = '';
       		loginStateShow.className = 'login-state-show '+idname;

       		 var textdiv = getByClass('stateSelect_text',idname);
       		// var text = textdiv[0].childNodes[0].nodeValue;
       		// stateTxt.childNodes[0].nodeValue = text;
       		
       		stateTxt.innerHTML = textdiv[0].innerHTML;
       	}
       }

   







}

function fnDown(event){
	//获取当前鼠标点击的x和y值
	event = event || window.event;
	var x = event.clientX;
	var y = event.clientY;

	//鼠标按下时鼠标与panel之间的距离	
	var oDrag=document.getElementById('loginPanel');
	var offX = x - oDrag.offsetLeft;
	var offY = y - oDrag.offsetTop;
//	alert(offX +","+offY);		
	
	//现在鼠标执行鼠标拖动的方法	
	document.onmousemove = function(event){    //闭包
		event = event || window.event;
		fnMove(event,offX,offY);
	}

	//当鼠标按键松开
	document.onmouseup = function(){
		document.onmousemove = null;
		document.onmouseup = null;
	}
}

//鼠标移动
function fnMove(event,x,y){
	var oDrag=document.getElementById('loginPanel');
	var mouseX = event.clientX;
	var mouseY = event.clientY;

	var l = mouseX-x;
	var t = mouseY-y;

	//判断panel是否已经被拖出浏览器之外
	
	//获取浏览器的宽和高
	var winW = document.documentElement.clientWidth || document.body.clientWidth;
	var winH = document.documentElement.clientHeight || document.body.clientHeight;

	//开始移动时panel框距左边和上边的距离
	var ofx = oDrag.offsetWidth;
	var ofy = oDrag.offsetHeight;

	var maxl = winW - ofx;
	var maxt = winH - ofy;
	

	//我们只需要就算x方向上移动的范围和y方向上移动的范围即可
	//即maxl~minl   maxt~mint
	
	//左边
	if(l<=0){
		l = 0;
	}
	//右边
	if(l>=maxl-10){
		l = maxl-10;
	}
	//上边
	 if(t<=0){
	 	t = 0;
	 }
	 //下边
	 if(t>=maxt-10){
	 	t = maxt;
	 }
	

	 oDrag.style.left=l+'px';
     oDrag.style.top=t+'px';


     document.title = "ofx:"+ofx+",ofy:"+ofy+"   l:"+l+",t:"+t;
	
}








