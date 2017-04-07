function Marker(data){
	this.data=data;
}
Marker.prototype.init= function(){
	var data=this.data;
	var _this=this;
	  var p0 = data.point.split(",")[0];  
      var p1 = data.point.split(",")[1];
      var id=data.id;
      var point=new BMap.Point(p0, p1)  
      var marker = new BMap.Marker(point);
      var label = new BMap.Label(data.name,{offset:new BMap.Size(20,-10)});
 	  label.setStyle({
		color : "#fff",
		backgroundColor:'#D9487E',//文本背景色
		borderColor:'transparent',//文本框边框色													
		fontSize : "14px",		
		cursor:'pointer',	
		fontFamily:"微软雅黑"
		});
 	/*if(data.type=="0201"||data.type=="0202"||data.type=="0204"){
 		 label.setStyle({	 	 			
				backgroundColor:'#D9487E'//文本背景色	 	 			
				});
 	}else if(data.type=="0203"){
 		 label.setStyle({	 	 			
	 				backgroundColor:'#EFB201'//文本背景色	 	 			
	 				});
 	}else if(data.type=="0301"){
 		 label.setStyle({	 	 			
	 				backgroundColor:'#9DC000'//文本背景色	 	 			
	 				});
 	}*/
	     marker.setLabel(label);
     marker.addEventListener("click",function(){
    	 _this.detailInfo(id);
     });
     label.addEventListener("click",function(){
    	 _this.detailInfo(id);
     })
     return marker;
}

Marker.prototype.detailInfo= function(id){
	var url="";
	url+=window.location.protocol+"//"+window.location.hostname+":"+window.location.port;
	url+="/marketsystem-war/portal/test/websiteDetail.action?id="+id
	location.replace(url);	
}
