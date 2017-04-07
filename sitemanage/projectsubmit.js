/**
 * 
 */
var siteApprove=(function() {


	function init (){
		$("#approveTable").datagrid({
			url : "/marketsystem-war/test_getdata.action",
			loadMsg : "加载中...",
			toolbar : "#tb1",
			/* fitColumns:true, */
			/* fit:true, */
			loadFilter : function(data) {
				console.log(data);
				// 您可以把原始数据变成标准数据格式。该函数必须返回标准数据对象，含有
				// 'total' 和 'rows' 属性。
				// return JSON.parse(data);
				/*
				 * var pagin = $('#t1') .datagrid( 'getPager'); var
				 * $pagnum = $(pagin[0]) .find( ".pagination-num");
				 */
				/* $pagnum.parent().prev(); */
				return {
					rows : data,
					total : data.length
				};
			},

			columns : [[
							{
								checkbox : true,
								width : 30,
								rowspan : 2,
								field : 'id'
							},
							{
								title : '一组',
								colspan : 3
							},
							{
								field : 'filepath',
								title : '操作',
								rowspan : 2,
								formatter : function(val, row,
										index) {
									return '<a target="_blank" href="'
											+ val
											+ '">'
											+ '查看'
											+ '</a>';
								}
							}, {
								title : '二组',
								colspan : 2
							} ],[
							{
								checkbox : true,
								width : 30,											
								field : 'id'
							},
							{
								field : 'filename',
								title : '网点名称',
								width : 100,
								sortable : true
							},
							{
								field : 'filetype',
								title : '类型',
								width : 80,
								align : 'right',
								sortable : true
							},
							{
								field : 'unit',
								title : '网点类别',
								align : 'right',
								sortable : true
							}, {
								field : 'date',
								title : '创建时间',
								width : 120,
								align : 'center'
							},
							 /*{
								field : 'date',
								title : '上报时间',
								width : 120,
								align : 'center'
							},*/
							{
								field : 'status',
								title : '审批状态',
								width : 80,
								sortable : true,
								formatter : function(val, row,
										index) {
									if (val == "未发布") {
										return '<span style="color:#43b3f7;">'
												+ val + '</span>';
									}
									return val;
								}
							} /*
								 * , { field : 'filepath', title :
								 * '操作', formatter : function( val,
								 * row, index) { return '<a
								 * target="_blank" href="'+val+'">' +
								 * '查看' + '</a>'; } }
								 */] ]

		});
	}
	
	var module={};
	module.init=init;
	module.doSearch=doSearch;
	//init();
	function doSearch () {
		$("#approveTable").datagrid('load',{
			/*itemid: $('#itemid').val(),
			productid: $('#productid').val()*/
		});
	}
	/*return {doSearch:doSearch}*/
	return module;
})();