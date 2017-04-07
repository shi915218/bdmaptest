var pager={
		current:1,
		pageCount:20,
		total:1000,
		init:function(){									
			pager.show();
			pager.bind();
		},
		show:function(){	
			var num=$(".pagenum.active").attr("val");
			if(num){
			pager.current=parseInt(num);
			}
			var lihtml="";
			var pages=Math.ceil(pager.total/pager.pageCount);
			var current=pager.current;					
			var firstPage=1;
			var endPage=pages;
			
			if(current-2>1)
			{
				firstPage=current-2;
			}
			if(current+2<pages)
			{
				endPage=current+2;
			}
			if(endPage-firstPage<=4)
			{
				endPage=firstPage+4;
				if(endPage>pages)
				{
					endPage=pages;
				}
			}
			if(endPage-firstPage<=4)
			{
				firstPage=endPage-4;
				if(firstPage<1)
				{
					firstPage=1;
				}
			}
			
			if(pager.total>0){					
				for(var k=firstPage;k<=endPage;k++){
					if(k>pages){
						break;
					}
					if(pager.current==k){
						lihtml+="<li><a  class='pagenum active' val='"+(k)+"'>"+(k)+"</a></li>";	
						
					}else{
						lihtml+="<li><a  class='pagenum ' val='"+(k)+"'>"+(k)+"</a></li>";
					}
				}
			}else{					
				$(".body_left_pager").html("<li class=''>没有相关数据</li>");
				return ;
			}
		
			lihtml="<li><a class='turnpage prev'> &lt;</a></li>"+lihtml+"<li><a class='turnpage next'>&gt;</a></li>";
			var html="<ul>" +lihtml+"</ul>" ;

			$(".body_left_pager").html(html);
		},	
		bind:function(){
			$(".body_left_pager li a").bind("click",function(e){			
				var abtn=$(e.currentTarget);
				var num=null;							
				if(abtn.hasClass("turnpage")){						
					var isPrev=abtn.hasClass("prev");
					if(isPrev){
						//上一页
							num=$(".pagenum.active").attr("val");
							$(".body_left_pager li a[val="+num+"]").removeClass("active");
							 num=parseInt(num)-1;
								if(num==0){
						     		num=1;
							   }
							$(".body_left_pager li a[val="+num+"]").addClass("active");																				
					}else{
						//下一页						
							num=$(".pagenum.active").attr("val");	
							$(".body_left_pager li a[val="+num+"]").removeClass("active");
							num=(parseInt(num)+1);
							var pages=Math.ceil(pager.total/pager.pageCount);
							if(num==pages+1){
					     		num=pages;
						    }
							$(".body_left_pager li a[val="+num+"]").addClass("active");																					
					    }
				}else{
					//页数										
					$(".body_left_pager li a").removeClass("active");
					num=abtn.attr("val");
					$(".body_left_pager li a[val="+num+"]").addClass("active");				
				}							
				pager.init();
			})						
		}				
}