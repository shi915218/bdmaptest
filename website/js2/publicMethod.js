var publicMethod={
		 getRequestParam:function()
			{
				var url = location.search; //获取url中"?"符后的字串 	
				var param=url.length>0 ? url.substring(1):"";				
				var requestParam = {}; 						
				var params = param.length ? param.split("&"):[]; 
				var item=null;
				for(var i = 0; i < params.length; i ++) { 
					item=params[i].split("=");
					name=decodeURIComponent(item[0]);
					value=decodeURIComponent(item[1]);
					if(name.length){
						requestParam[name]=value; 
					}					
				 } 			
				return requestParam; 
		   },	
		   
		   getUrl:function(parm)
		    {	 			
				var urlStr="";
				for(var ele in parm){	 						
					urlStr+="&"+ele+"="+parm[ele]
				}
				if(urlStr.length>0){
					urlStr="?"+urlStr.substring(1);
				}	 										
				return urlStr;
		    },	
		    
		   getActiveParam: function()
			{
			     var params={};
			     var id = $(".body_left_bar ul li.active").attr("id");	 		  
			      params.id=id;	 		   	 		     
			     var option1 = $(".areaSelect option.active");
			     var minArea=option1.attr("minArea");
			     var maxArea=option1.attr("maxArea");
			     params.minArea=minArea;
			     params.maxArea=maxArea;
			    			 
			     var a=$(".body_left_list .sortDiv a.active");
			      var orderBy=a.attr("orderBy")
			      var direction=a.attr("direction")
			       
			      params.orderBy=orderBy;			      
			      params.direction=direction;
			         
			    var types=[];
			 			   
			     var checkedbox=$(".website_table input[type=checkbox]:checked");			    
			         checkedbox.each(function(){						
							 types.push($(this).val());					
				     })
			  
			     if(types.length>=1){
			    	 params.types=types;	 		    	 
			     }
			  
				for ( var ele in params) {
					if (params[ele] == undefined || params[ele] == "undefined") {
						delete params[ele];
					}
				}
			     return params;
			    },
			   historyParam:function(){				   
					var requestParam=this.getRequestParam();
			        var activeParam=this.getActiveParam();
			    	activeParam.id=requestParam.id
			    	var urlParam=this.getUrl(activeParam);
			    	 var pathname=location.pathname    			          
			    	 window.history.pushState(urlParam, "",pathname.substring(18)+""+urlParam)
				   
			   }
}