$(function(){	
  var map={
  bmap:new BMap.Map("bmap"),
  init:function()
	{	 
		var websiteControl = new WebsiteControl();
		// 添加到地图当中
		 this.bmap.addControl(websiteControl);
		 var cityListControl = new CityListControl();
			// 添加到地图当中
		 this.bmap.addControl(cityListControl);
         this.stateEvent();
		 this.show();
		 this.bind();
	},
   show:function()
	{		    
		var param=publicMethod.getRequestParam();
		if(param.id=="website")
		{
			$('.btn_dropdown a').text("浙江省");	 				
		}else if(param.id.indexOf("City")!=-1){	
			$('a[id='+param.id+']').addClass("active");	
			 var name=$('a[id='+param.id+']').text();	
			$('.btn_dropdown a').text(name+"市");
		}
		else if(param.id.indexOf("County")!=-1){	
			$('a[id='+param.id+']').addClass("active");	
			 var name=$('a[id='+param.id+']').text();	
			$('.btn_dropdown a').text(name);
		}
	
	
		if(param.minArea || param.maxArea){
			$('.areaSelect option[minArea='+param.minArea+'][maxArea='+param.maxArea+']').addClass("active");					
			$('.areaSelect option[minArea='+param.minArea+'][maxArea='+param.maxArea+']').prop("selected", true);								
		}else{
			$('.areaSelect option').removeClass("active");							
			$('.areaSelect option.all').prop("selected", true);	
		}
		if(param.types)
		{	
			var types=param.types.split(",");								
			$(".website_table input[type=checkbox]").prop("checked",false);
		  	for(var i=0;i<types.length;i++){	
		  	   $(".website_table input[type=checkbox][value='"+types[i]+"'").prop("checked","ture")		  					  	
		  	}						
		}else{	
			$(".website_table input[type=checkbox]").prop("checked",false);			
		}
		var point = "120.155537,30.287455";
		this.ajaxFun(param.id,point);		
	},
   stateEvent:function()
	{		
		if (window.history && window.history.pushState) {
	         $(window).on('popstate', function (){
	        	         //后退或者前进事件监听	                    
	                      console.log(window.location.href) 	                        
	                    map.show();                        
	             });
	       }
  },
 
   ajaxFun:function(id,str)
	 { 
		 var that=this;
			$.ajax({
	            type: "post",
	            dataType: "json",
	            data:{idStr:id},
	            url: "portal/test/map.action",
	            success: function (data) { 		            	            
	            	if(data){
	            		map.loadData(data,str);
	            	   }
	            }
		     }); 				 
	},
	 //加载数据
	loadData:function(data,str)
	{	 					 				
			var p0 =str.split(",")[0];
			var p1 =str.split(",")[1];
			var strPoint = new BMap.Point(p0,p1);	 						
         	this.bmap.clearOverlays();		
			var listHtml="";
        	   if(data[0].id.toString().indexOf("City")!=-1){
        		   this.bmap.centerAndZoom(strPoint,8); 
        		   this.circleFun(data);			            		
               }else if(data[0].id.toString().indexOf("County")!=-1){
            	  this.bmap.centerAndZoom(strPoint,13);
            	  this.circleFun(data);            	            			            	
            	}else{
          		     this.bmap.centerAndZoom(strPoint,15); 
          		     this.markerFun(data);
		       }  
        	   listHtml+=this.listFun(data)     
        	   var html="<ul>"+listHtml+"</ul>";
        	   
	           $(".body_left_list").html(html); 
	           $(".body_left_detail").slimScroll({
	               height: '500px'
	              });	               	        			            	
	},
		
    markerFun:function(data)
	{		  					
		  for(var i=0;i<data.length;i++){		            		  		           		
			  this.addMarker(data[i]); 
		  }		
	},
	 circleFun:function(data)
		{		  		
			var maxNum=this.maxNumber(data);	
			  for(var i=0;i<data.length;i++){		            		  		           		
			  this.addCircle(data[i],maxNum)
			  }		
		},
   listFun:function(data)
	 {
	      var html="";		  		 
		  for(var i=0;i<data.length;i++){	  	 
		  if(i==0 && $(".body_left_bar ul li.active").attr("id")=="website"){
			  html+='<div class="sortDiv"><a orderBy="area">按照面积排序</a><a orderBy="money">按照营业额排序</a></div>';
			 }
	          html+="<li class='left_detail'><a href='websiteDetail.action'><img class='fl' src='' style='background-color:red;width:100px;height:80px;margin:10px 10px'>" ;
	  	 var classname;
	  	 if(data[i].type=="0201"||data[i].type=="0202"||data[i].type=="0204"){
	  		classname = 'red';
	  	 }else if(data[i].type=="0203"){
	  		classname = 'yellow';
	  	 }else if(data[i].type=="0301"){
	  		classname = 'green';
	  	 }		 				            	
	  	html+="<ul class='fl' style='margin-top:10px;'><li>"+data[i].name+"</li><li>"+data[i].point+"</li><li>11</li><li class='colorType "+classname+"'><a>22</a></li></ul></li></a>";	 				            	 
	   } 	
	   return html;
	 },	
	
   addCircle:function(data,max)
    {
	   var circle=new Circle(data);
	   var arr=circle.init(this.bmap,max);
	    for(var i=0;i<arr.length;i++){
	    	 arr[i].addEventListener("click", function(e){	 
	    		 circle.bindClick(data);
			     map.ajaxFun(data.id,data.point); 
		})
	    }
	/*   var circle=new addCircle(data,max);
	   this.bmap.addOverlay(circle);	 */
   },	
  addMarker:function(data)
   {
	  var marker=new Marker(data);
      var mark=marker.init()	 	         
     this.bmap.addOverlay(mark);
    },		 	    
		 			
	//计算number最大值	 
  maxNumber: function (obj)
  {		 					
	 var max=obj[0].number;
	 for(var i=0;i<obj.length;i++){	 
	  if(parseInt(obj[i].number)>= parseInt(max)){
		 max=obj[i].number;  
	     }
	 }	 				
	return max;
  },
		 				 
   bind:function()
	{	
	     //绑定下拉框事件
	    $(".websiteType").on("change","select",function(e){
	    	var select=$(e.currentTarget);
	    	select.find("option").removeClass("active");
	    	var option=select.find("option:selected")
	        option.addClass("active");
	    	 publicMethod.historyParam();	  
	    })
	    //省市区单击事件
	    
		$(".sel").on("click","li a",function(e){
			 $(".sel a").removeClass("active")
			 var btnli = $(e.currentTarget);
			     btnli.addClass("active");
				var val=btnli.text(); 	
		  		 $(".dropdownDiv").css("display","none");
		  		var id= btnli.attr("id");
		  		if(id=="website"){
		  			$(".btn_dropdown a").text("浙江省");	
		  		}else{
		  			$(".btn_dropdown a").text(val+"市");
		  		}
		  	   var requestParams=publicMethod.getRequestParam();
		        requestParams.id=id;
		       var urlParam=publicMethod.getUrl(requestParams);	
		       var pathname=location.pathname         
		       window.history.pushState(urlParam, "",pathname.substring(18)+""+urlParam);
		       var point = "120.155537,30.287455";
		       map.ajaxFun(id,point);
		})
	    
	    //左侧导航绑定单击事件
	      $(".body_left_bar li").on("click",function(e){
	    	var btn=$(e.currentTarget);
	    	 $(".body_left_bar ul li").removeClass("active");	 		     
	    	btn.addClass("active");
	        var param=publicMethod.getActiveParam();
	      
	    })
	    
	      //排序按钮绑定事件	 
	  $(".body_left_list").on("click",".sortDiv a",function(e) {
		  $(".body_left_list .sortDiv a").removeClass("active ASC DESC");		 
			var btn = $(e.currentTarget);
			btn.addClass("active");
			var direction = btn.attr("direction");			
		   if (direction == undefined || direction == "undefined") {
			   direction = "DESC";
			}
			if (direction == "ASC") {
				direction = "DESC"
			} else {
				direction = "ASC"
			}
		  btn.addClass(direction).attr("direction",direction);							   
	      publicMethod.historyParam();	   		  
		});	
	}	 
   } 
    websiteType.init();
	map.init(); 
	pager.init();
});