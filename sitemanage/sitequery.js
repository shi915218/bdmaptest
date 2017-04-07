/**
 * 
 */
$(document).ready(function() {

    var siteQuery = function sitequery() {

    	var queryparams={
    			pageSize:10,
    			page:1,
    			type:1
    	};
        function init() {
        	 // 加载树
           
        	getQueryCatagory();
        	
            $("#t2").datagrid({
                url: "/marketsystem-war/sitemanage/siteQuery.action",
                loadMsg: "加载中...",
                toolbar: "#tb1",
                height: $(".mk-iframe-content").height() - $('.searchpanel').height()-50,
                /* fitColumns:true, */
                /* fit:true, */
                /*pagination:true,*/
                loadFilter: function(data) {
                    console.log(data);
                    // 您可以把原始数据变成标准数据格式。该函数必须返回标准数据对象，含有								
                    createPagin($("#t2"), data.total);
                    return data;
                },
                onSelectAll:function(){
                	//$("#allcheck")[0].checked=true;
                },
                onUnselect:function(){
                	///$("#allcheck")[0].checked=false;
                },
                columns: [[{
                    checkbox: true,
                    width: 30,
                    rowspan: 2,
                    field: 'id',
                    frozen: true
                },{
                    title: '一组',
                    colspan: 3,
                    frozen: true
                },{
                    field: 'filepath',
                    title: '操作',
                    rowspan: 2,
                    formatter: function(val, row, index) {
                        return '<a target="_blank" href="' + val + '">' + '查看' + '</a>';
                    }
                },{
                    title: '二组',
                    colspan: 2
                }], [{
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
            bind();
        }
        function bind() {
        	$(".sitetypebar ").singlebar({
        		onItemClick:function(){
        			var type=$(this).attr("type");
	               	 getQueryCatagory(type);
	               	 queryData({
	               		 type:type
	       			 });
        		}
        	});
        	$("#categorybar ").singlebar({
        		onItemClick:function(){
        			/*var type=$(this).attr("type");
	               	 getQueryCatagory(type);
	               	 queryData({
	               		 type:type
	       			 });*/
        		}
        	});
        	$("#areabar ").singlebar({
        		onItemClick:function(){
        			/*var type=$(this).attr("type");
	               	 getQueryCatagory(type);
	               	 queryData({
	               		 type:type
	       			 });*/
        		}
        	});
            /* $(".sitetypebar ").on('click',".btn-link",function(e){    
            	 $(this).parent().find(".btn-link").removeClass("active")
            	 $(this).addClass("active");
            	 var type=$(this).attr("type");
            	 getQueryCatagory(type);
            	 queryData({
            		 type:type
    			 });
            	
             })*/
             $("#sortbar").on("click","input",function(e){
            	var sorttype= $(this).attr("sorttype");
            	if(sorttype){
            		var order = $(this).combobox("getValue");
               	 queryData({
               		 sort:sorttype,
               		 order:order
       			 });
            	}
            	
             })
             $("#unfocusbtn ").on('click',function(e){
//            	 var params={};
//            	 var ids= $('#t2').datagrid("getSelections");
//            	 if(ids&&ids.length>0){
//	            	 params=$.extend(params,{id:ids[0].id});
//	            	 $.ajax({
//	        		 type:"POST",
//	        		 url:"sitemanage/siteUnsubscribe.action",
//	        		 dataType:"json",
//	        		 data:JSON.stringify(params),
//	        		 success:function(data){
//	        			 console.log("changetype",data);
//	        		 },
//	        		 error:function(){	        			 
//	        		 }
//	        	 });
//            	}
             })
             $("#focusbtn ").on('click',function(e){
//            	 var params={};
//            	 var ids= $('#t2').datagrid("getSelections");
//            	 if(ids&&ids.length>0){
//            	 params=$.extend(params,{id:ids[0].id});
//	            	 $.ajax({
//	            		 type:"POST",
//	            		 url:"sitemanage/siteSubscribe.action",
//	            		 dataType:"json",
//	            		 data:JSON.stringify(params),
//	            		 success:function(data){
//	            			 console.log("changetype",data);
//	            		 },
//	            		 error:function(){
//	            			 
//	            		 }
//	            	})
//            	}
             })
             $("#addbtn").on('click',function(e){
            	 var params={};
            	// var ids= $('#t2').datagrid("getSelections");
            	 params=$.extend(params,{});
            	 $.ajax({
            		 type:"POST",
            		 url:"sitemanage/addsite.action",
            		 dataType:"json",
            		 data:JSON.stringify(params),
            		 success:function(data){
            			 console.log("changetype",data);
            			 $.ajax({
                    		 type:"POST",
                    		  url: 'basicdata/getSubCataLogByKey.action?rootKey=SITE_CATEGORY&needRootNode=false',
                    		 dataType:"json",
                    		 data:JSON.stringify(params),
                    		 success:function(data){
                    			 console.log("subcate",data);
                    			 $("#addwin_type").html(getCataHtml(data));
                    			 $("#addsitewin").window({
                    				 width:600,
                    				 height:400,
                    				 modal:true
                    			 });
                    		 },
                    		 error:function(){
                    			 
                    		 }
                    	})            			 
            		 },
            		 error:function(){            			 
            		 }
            	})
             })   
             
              $("#savebtn").on('click',function(e){
            	 var params={};
            	// var ids= $('#t2').datagrid("getSelections");
            	 params=$.extend(params,{});
            	 $.ajax({
            		 type:"POST",
            		 url:"sitemanage/addsite.action",
            		 dataType:"json",
            		 data:JSON.stringify(params),
            		 success:function(data){
            			 console.log("changetype",data);
            		 },
            		 error:function(){            			 
            		 }
            	})
             })   
             $("#delbtn").on('click',function(e){
            	   $.ajax({
            		         url:'sitemanage/getCatalogData.action',       //跨域到http://www.wp.com，另，http://test.com也算跨域
            		        type:'GET',                                //jsonp 类型下只能使用GET,不能用POST,这里不写默认为GET
            		        dataType:'jsonp',                          //指定为jsonp类型
            		        data:{"name":"Zjmainstay"},                //数据参数
            		        jsonp:'callback',                          //服务器端获取回调函数名的key，对应后台有$_GET['callback']='getName';callback是默认值
            		        jsonpCallback:'getName',                   //回调函数名
            		        success:function(result){    
            		        	console.log(result);
            		        	//成功执行处理，对应后台返回的getName(data)方法。
            		          //  $("#myData").html('1、My name is '+result.name+'.I\'m '+result.age+' years old.<br />');
            		        },
            		         error:function(msg){
            		             // alert(msg.toSource());                 //执行错误
            		         }
            		     }); 
            /*	 var params={};
            	
            	 var ids= $('#t2').datagrid("getSelections");
            	 if(ids&&ids.length>0){
            		 params=$.extend(params,{id:ids[0].id});
                	 $.ajax({
                		 type:"POST",
                		 url:"sitemanage/delsite.action",
                		 dataType:"json",
                		 data:JSON.stringify(params),
                		 success:function(data){
                			 console.log("changetype",data);
                		 },
                		 error:function(){                			 
                		 }
                	})
            	 } */           
             })
             window.onresize = function() {
            	 domresize();
             };
        }
        
        function getQueryCatagory(type){
        	var url ='basicdata/getSubCataLogByKey.action?rootKey=SITE_QUERY&needRootNode=false';
        	if(type==2){
        		url ='basicdata/getSubCataLogByKey.action?rootKey=STREET_QUERY&needRootNode=false';  		   
        	}else if(type==3){
        		url ='basicdata/getSubCataLogByKey.action?rootKey=DISTRCT_QUERY&needRootNode=false';  
        	}
        	 $('#tree_parm_catalog1').tree({
                 url: url,
                 method: 'post',
                 onBeforeSelect:function(node){
                 	console.log(node)
                 	//点击子节点才能被选中，点击父节点不能被选择
                 	if(node.isLeaf){
                 		return true;
                 	}        	
                 	
                 	return false;
                 },
                 onSelect:function(node){
                 	console.log(node)
                 	//点击子节点才能被选中，点击父节点不能被选择
                 	var qparams={};
                 	qparams[node.type]=node.value;
                 	queryData(qparams);                 	
                 },
                 onLoadSuccess: function(node, data) {
                     var roots =$('#tree_parm_catalog1').tree('getRoots');
 					$('#tree_parm_catalog1').tree('select',roots[0].target);
                    
                 }
             });
        }
        function getCataHtml(data){
        	var html="";
        	
        	return html;
        }
        function queryData(qparams,fun){
        	 var params={};
        	 params=$.extend(params,queryparams);
        	 if(qparams){
        		 params=$.extend(params,qparams);        		 
        	 }    
        	 $('#t2').datagrid({
                 queryParams: params
             });
        }

        function createPagin($grid, total) {
            var gridopt = $($grid).data("datagrid").options;
            var paginopt = $('#marketpagin').data("pagination").options;
            if (paginopt == undefined || total != paginopt.total) {
                $('#marketpagin').pagination({
                    beforePageText: '',
                    afterPageText: '',
                    displayMsg: '',
                    total: total,
                    pageSize: queryparams.pageSize,
                    /* beforePageText: '第',    
    		             afterPageText: '页 共 {pages}页',    
    		             displayMsg: '显示 {from}到{to} ,共 {total}条记录',   */
                    layout: ['sep', 'prev', 'links', 'next', 'sep'],
                    /*layout:['list','sep','first','prev','links','next','last','sep','refresh'],*/
                    onSelectPage: function(page, pageSize) {
                        var d_datagrid = $('#t2').data("datagrid");
                        var o_params = d_datagrid.options.queryParams || {};
                        o_params = $.extend(o_params, {
                            page: page,
                            pageSize: pageSize
                        }) ;
                        $('#t2').datagrid({
                            queryParams: o_params
                        });
                    }
                });
            }

        }


       
        // 改变表格宽高
        function domresize() {
            $('#t2').datagrid('resize', {
                height: $(".mk-iframe-content").height() - $('.searchpanel').height()-50,
                width: $(".mk-iframe-content").width()
            });
        }

       /* var siteQuery = {
            doSearch: function() {
                alert("查询111");
            }
        }*/
        $("#inputsearch").searchbox({ searcher:function(){
        	var param={
        			name:$("#inputsearch").val()
        	}
        	queryData(param);
        }});
       
        
        return {init:init};
    }
    siteQuery().init();

    //function (){}
});
function getName(){
	console.log("这里是getname");
}