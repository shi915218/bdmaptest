/**
 * 分页器
 */
$(function($){
	function Plugin(dom){
		var mpag = $.data(dom,"marketpagination");
	/*	$("	<ul>
				<li class="item prev"><span>上一页</span></li>
				<li class="item active"><span>1</span></li>
				<li class="item "><span>2</span></li>
				<li class="item next"><span>下一页</span></li>
			</ul>
			<div class="pagin_total">共10页</div>
			<div class='pagin_form'>
			<span>到第</span>
			<input type="number" id='topage'>
			<span>页</span><span class="btn btn-primary">确定</span>
			</div>")
*/	}
	$.fn.marketpagination.defaults={
			total:1,
			pageSize:10,
			pageNumber:1,
			//pageList:[]
			
	}
	$.fn.marketpagination.methods={
			
	};
	$.fn.marketpagination=function(options,val){
		if(typeof options =="string"){
			return $.fn.marketpagination.methods[options](this,val);
		}
		options=options||{};
		return this.each(function(){
			var opt;
			var pagin = $.data(this,"marketpagination");
			if(pagin){
				
			}else{
				pagin = $.data(this,"marketpagination",{})
			}
		});
	}
})(jQuery);