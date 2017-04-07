var websiteType={
		init:function(){			
			this.show();
			this.bind();
		},
		show:function(){			
			$.ajax({
	             url: 'basicdata/getSubCataLogByKey.action?rootKey=SITEQUERY',        
	             success: function(data){
	            	var jsonObj=eval(data);	            	
	            	jsonObj=jsonObj[0].children;
	            	console.log(jsonObj)
	            	var html="";	        
	              for(var i=0;i<jsonObj[0].children.length;i++){
	            	  var child=jsonObj[0].children[i];
	            	  html+='<div style="margin-top:13px;" value="'+child.value+'"><span class="fl" style="line-height:25px;padding-right:20px;padding-left:20px;">'+child.name+':</span><ul  style="overflow:hidden;">';
	            	  for(var j=0;j<child.children.length;j++){
	            		  if(child.children[j].name.length<=10){
	            		  html+='<li style="float:left;line-height:25px;width:130px"><input style="position:relative;"type="checkbox" value="'+child.children[j].value+'"><span>'+child.children[j].name+'</span></li>'	           		
	            	  }else{
	            		  html+='<li style="float:left;line-height:25px;"><input style="position:relative;"type="checkbox" value="'+child.children[j].value+'"><span>'+child.children[j].name+'</span></li>' 
	            	  }
	              }
	            	  html+='</ul></div><div style="clear:both"></div>';
	                }	          
	               $(".website_table").html(html);  
	             }
		})
		},
	bind:function()
    {								
		$(".websiteType_detail_footer a").on("click",function(e){
			var btn=$(e.currentTarget);
			var className=btn.attr("class");
			if(className=="btn_all"){
				$(".website_table input[type=checkbox]").prop("checked",true);
			}else if(className=="btn_clear"){
				$(".website_table input[type=checkbox]").prop("checked",false);
			}else if(className="btn_sure"){	
				publicMethod.historyParam();		
			}
		
		})
			
		
		 $(".btn_websiteType").click(function(){
			$(".websiteType_detail").css("display",'block');
			$(".website_table input[type=checkbox]").prop("checked",false);
			 var param=publicMethod.getRequestParam();			
			 if(param.types!=undefined){															
					var types=param.types.split(",");															
				  	for(var i=0;i<types.length;i++){					  	
				     $(".website_table input[type=checkbox][value='"+types[i]+"'").prop("checked","ture")					  	
				  	}											 
			 }	
			 
		  }) 
		  			 
		  			
		$(".btn_sure").click(function(){
			$(".websiteType_detail").css("display",'none');
		})
			$(".btn_close").click(function(){
			$(".websiteType_detail").css("display",'none');
		})

    }
		  			  
		
}