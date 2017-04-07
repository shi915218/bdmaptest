/**
 * 
 */
$(document).ready(function(){
	var siteApprove=(function($) {

		var queryparams={
    			pageSize:10,
    			page:1,
    			type:1
    	};
		function init (){
		    $("#inputsearch").searchbox({ searcher:function(){
	        	var param={
	        			name:$("#inputsearch").val()
	        	}
	        	queryData(param);
	        }});
	       
			$("#approveTable").datagrid({
	            url: "/marketsystem-war/sitemanage/siteQuery.action",
	            loadMsg: "加载中...",
	            height: $(".grid_siteAppr_content").height() - $('.grid_bar1').height() - 50,
	            /* fitColumns:true, */
	            /* fit:true, */
	            /*pagination:true,*/
	            loadFilter: function(data) {
	                console.log(data);
	                // 您可以把原始数据变成标准数据格式。该函数必须返回标准数据对象，含有								
	                createPagin($("#approveTable"), data.total);
	                return data;
	            },
	            onSelectAll:function(){
	            	//$("#allcheck")[0].checked=true;
	            },
	            onUnselect:function(){
	            	//$("#allcheck")[0].checked=false;
	            },
	            columns: [[{
	                checkbox: true,
	                width: 30,
	                field: 'id',
	                frozen: true
	            },{
	                field: 'filepath',
	                title: '操作',
	                formatter: function(val, row, index) {
	                    return '<a target="_blank" href="' + val + '">' + '查看' + '</a>';
	                }
	            },{
	                field: 'filename',
	                title: '文件名称',
	                width: 200,
	                sortable: true
	            },{
	                field: 'filetype',
	                title: '类型',
	                width: 180,
	                align: 'right',
	                sortable: true
	            },{
	                field: 'unit',
	                title: '发布单位',
	                align: 'right',
	                sortable: true
	            },{
	                field: 'status',
	                title: '发布状态',
	                width: 180,
	                sortable: true,
	                formatter: function(val, row, index) {
	                    if (val == "未发布") {
	                        return '<span style="color:#43b3f7;">' + val + '</span>';
	                    }
	                    return val;
	                }
	            },{
	                field: 'date',
	                title: '提交日期',
	                width: 120,
	                align: 'center'
	            }]]

	        });	
		}
		
		function bind(){
			$(".approvebar").on('click',"a",function(){
				$(this).parent().find(".btn-link").removeClass("active")
		       	 $(this).addClass("active");
		       	 var type=$(this).attr("type");
		       	// getQueryCatagory(type);
		       	 queryData({
		       		 type:type
					 });
			});			
		}
		
		function run(){
			init();
			bind();
		}
		run();
		var module={};

		 function createPagin($grid, total) {
	            var gridopt = $($grid).data("datagrid").options;
	            var paginopt = $('#approvepagin').data("pagination");
	            if (paginopt == undefined || total != paginopt.total) {
	                $('#approvepagin').pagination({
	                    beforePageText: '',
	                    afterPageText: '',
	                    displayMsg: '',
	                    total: total,
	                    pageSize: queryparams.pageSize,
	                    layout: ['sep', 'prev', 'links', 'next', 'sep'],
	                    /*layout:['list','sep','first','prev','links','next','last','sep','refresh'],*/
	                    onSelectPage: function(page, pageSize) {
	                        var d_datagrid = $grid.data("datagrid");
	                        var o_params = d_datagrid.options.queryParams || {};
	                        o_params = $.extend(o_params, {
	                            page: page,
	                            pageSize: pageSize
	                        }) ;
	                        $grid.datagrid({
	                            queryParams: o_params
	                        });
	                    }
	                });
	            }
	        }
		 
		 function queryData(qparams,fun){
	      	 var params={};
	      	 params=$.extend(params,queryparams);
	      	 if(qparams){
	      		 params=$.extend(params,qparams);        		 
	      	 }    
	      	 $('#approveTable').datagrid({
	               queryParams: params
	           });
	      }
		return module;
	})(jQuery);
})
