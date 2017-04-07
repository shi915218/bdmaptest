function parseDom(arg) {
	//html字符串转化成dom
	var objE = document.createElement("div");
	objE.innerHTML = arg;
	return objE.childNodes[0];
};


function WebsiteControl(){
	 // 默认停靠位置和偏移量
	  this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
	  this.defaultOffset = new BMap.Size(10, 20);
}
 WebsiteControl.prototype=new BMap.Control();

 WebsiteControl.prototype.initialize = function(map){
	 var html='<div class="websiteControl"><div class="amap"><a>网点地图</a></div><div class="alist"><a>网点列表</a></div></div>';
	 var div = this._div = parseDom(html);
	this.animation();
	  // 添加DOM元素到地图中
	  map.getContainer().appendChild(div);
	  // 将DOM元素返回
	  return div;
}
 WebsiteControl.prototype.animation = function()
 {
 	 var div = this._div;
 	
 	 $(div).mouseenter(function()
 	 {
 		  $(".websiteControl .amap").animate({right:"50px"},100);
 		  $(".websiteControl .alist").animate({right:"0px"},100);	
 	 });
 	 $(div).mouseleave(function() 
 	{
 		$(".websiteControl .amap").animate({width:"50px",right:"5px"},100);
 		 $(".websiteControl .alist").animate({width:"50px",right:"-45px"},100);	
 	});
 }