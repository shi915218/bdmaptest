/**
 * 
 */
$(function(){
	
	function SingleBar($barDom,opts){
		this.bardom=$barDom;
		this.opts=opts;
		var self=this;
		$(this.bardom).on('click','a',function(e){
			 $(this).parent().find("a").removeClass("active")
        	 $(this).addClass("active");
			 self.value= $(this).attr("value");
			opts.onItemClick.call(this,e);
		});
		this.value = $($barDom).find('a.active').attr("value");
		
	}
	function Plugin(options){
		var opts=$.fn.singlebar.defaults;
		if(typeof options =="string"){
			var $bar =$(this).data("singlebar");
			if($bar!=null){
				
			}
			return ;
		}
		opts=$.extend(opts,options);
		return this.each(function(){
			var $bar =$(this).data("singlebar");
			if($bar == null){				
				$(this).data("singlebar",$bar =new SingleBar(this,opts));
			}
		});
	}
	Plugin.prototype.getValue=function(){
		return this.value;
	}

	$.fn.singlebar=Plugin;
	SingleBar.defaults={
			onItemClick:function(){}
	}
})