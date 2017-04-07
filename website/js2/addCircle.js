 function Circle(data){
	 this.data=data;
 }
 
 Circle.prototype.init= function(bmap,max){	
	          var data= this.data;
			  var p0 = data.point.split(",")[0];  
		      var p1 = data.point.split(",")[1];
		      var point=new BMap.Point(p0, p1)                                   
		      var cRadius;
			  var circleOpts = {strokeColor:'#4ABC74',strokeWeight: 1,fillColor :'#20A23E'}
			  var labelOpts={position:point,offset:new BMap.Size(-24, -24)};
			var content='<div style="text-align:center"><div style="margin-top:8px;" id="'+data.id+'"><span>'+data.name+'</span><div>'+data.number+'<span>&nbsp;个</span></div></div></div>';				
				var label = new BMap.Label(content, labelOpts);  // 创建文本标注对象
					label.setStyle({
					color : "#FFF",
					backgroundColor:'transparent',//文本背景色
					borderColor:'transparent',//文本框边框色													
					fontSize : "12px",				
					height :"45px",
					width:"45px",
					lineHeight:"16px",
					cursor:'pointer',  						
					fontFamily:"微软雅黑"
					});
			  if(bmap.getZoom()<10){				
				  //缩放级别为8的时候 ，半径在18000-28000之间左右
				     cRadius =5000*this.cosxFun(data.number,max)+18000;			     
			 }	else{
				  //半径控制在600-1000
				  cRadius =180*this.cosxFun(data.number,max)+600;             	 
			 } 
			   var circle = new BMap.Circle(point,cRadius,circleOpts);
			    bmap.addOverlay(circle);  
				bmap.addOverlay(label);					
			 var arr=[circle,label];
				return arr;
		}
  Circle.prototype.bindClick= function(data){	
	 if(data.id.indexOf("City")!=-1){	
		 $('a[id='+data.id+']').addClass("active");	
		 var name=$('a[id='+data.id+']').text();	
		 $('.btn_dropdown a').text(name+"市");
	   }else if(data.id.indexOf("County")!=-1){	
		$('a[id='+data.id+']').addClass("active");	
		 var name=$('a[id='+data.id+']').text();	
		$('.btn_dropdown a').text(name);
	}
	   var requestParams=publicMethod.getRequestParam();
       requestParams.id=data.id;
      var urlParam=publicMethod.getUrl(requestParams);	    
      var pathname=location.pathname         
      window.history.pushState(urlParam, "",pathname.substring(18)+""+urlParam);
	}
		 //利用余弦函数计算圆形半径
	Circle.prototype.cosxFun= function(x,y){	 			 				
		var val=parseInt(y);
		var radius=(Math.cos(x/val*Math.PI+Math.PI)+1);	 				
		return radius;
	}