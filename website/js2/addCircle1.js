 function parseDom(arg) {
	var objE = document.createElement("div");
	objE.innerHTML = arg;
	return objE.childNodes[0];
};

function addCircle(data,max){
	  var p0 = data.point.split(",")[0];  
      var p1 = data.point.split(",")[1];
      var point=new BMap.Point(p0, p1)            
      this._point = point;
      this._data = data;
      this._max=max;
    }
 addCircle.prototype = new BMap.Overlay();
 addCircle.prototype.initialize = function(map){
      this._map = map;
      var data=this._data
      var p0 = data.point.split(",")[0];  
      var p1 = data.point.split(",")[1];
      var point=new BMap.Point(p0, p1)          
      var max=this._max;
      var cRadius =10*this.cosxFun(data.number,max)+50; 
      cRadius=cRadius+"px";    
      var html="<div class='circle' style='width:"+cRadius+";height:"+cRadius+";position:absolute;background-color:red'><div class='circle_content'><span>"+data.name+"<span><a>"+data.number+"</a></div></div>"
  	  var div = this._div = parseDom(html);     
      this._map.getPanes().labelPane.appendChild(div);    
      return div;
    }
 addCircle.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x -30+ "px";
      this._div.style.top  = pixel.y -20+ "px";
    }
   
 //利用余弦函数计算圆形半径
 addCircle.prototype.cosxFun = function(x,y){				 				
		var val=parseInt(y);
		var radius=(Math.cos(x/val*Math.PI+Math.PI)+1);	 				
		return radius;
	}