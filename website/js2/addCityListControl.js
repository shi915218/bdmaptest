function parseDom(arg) {
	//html字符串转化成dom
	var objE = document.createElement("div");
	objE.innerHTML = arg;
	return objE.childNodes[0];
};

function CityListControl(){
	  // 默认停靠位置和偏移量
	  this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
	  this.defaultOffset = new BMap.Size(20, 20);
	}

	// 通过JavaScript的prototype属性继承于BMap.Control
  CityListControl.prototype = new BMap.Control();

	// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
	// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
  CityListControl.prototype.initialize = function(map){
	  	 /* var cityList=["杭州","宁波","温州","湖州","嘉兴","绍兴","金华","衢州","舟山","台州","丽水"];*/
	  var html='<div class="sel"><div class="btn_dropdown"><a id="website">浙江省</a><span class="dropdown_handle"></span></div>';
	      html+='  <div class="dropdownDiv" style="display:none;width:860px;">';
	      html+=' <ul class="dropdown_list"><li ><div class="province"><span>省</span><a id="website">浙江省</a></div></li>       '
	      html+='  <li ><div class="city"><span>市</span>';
	      html+='<ul>';
	    
	      html+='<li><a id="hangzhouCity">杭州</a></li>';
	    
	      html+='</ul>';
	      html+=' </div></li>';
	      html+=' </ul>';
         html+='<div class="county"><span>县(市、区)</span><ul><li><a id="gsCounty">拱墅区</a></li></ul></div>';
         html+='</div>';
        html+='</div>';	
	    //字符串转化成dom节点
        var div = this._div = parseDom(html);
        this.bind();
	  // 添加DOM元素到地图中
	  map.getContainer().appendChild(div);
	  // 将DOM元素返回
	   return div;
	}

  CityListControl.prototype.bind = function()
  {
  	 var div = this._div;	
  	$(div).find(".btn_dropdown").bind("click",function(){	
  	  var display=$(".dropdownDiv").css("display"); 
  	  if(display=="none"){
  		  $(".dropdownDiv").css("display","block");		  
  	  }else{
  		  $(".dropdownDiv").css("display","none");
  		  }
    }) 
    
   
 
 $(div).find(".city ul li a").bind("mouseenter",function(e){
		var abtn = $(e.currentTarget);	 
		$(".county").css("display","block");
}) 
 
}