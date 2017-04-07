/**
 * 
 */
$(document)
		.ready(
				function() {

					// String columnNames, MultiValueMap<String, Object> map,
					// String order, String sort

					$("#sitebtn").on("click", function() {
						var da = {
							columnNames : "",
							map : "",
							order : "DESC",
							sort : "C_ID"
						}
						$.ajax({
							url : "table/T_PROC_DEMO_TWO/queryAll.action",
							data : da,
							success : function(result) {
								console.log(result);
							}
						});
					});

					// 加载树
					$('#tree_parm_catalog1')
							.tree(
									{
										url : 'basicdata/getSubCataLogByKey.action?rootKey=SITE_TYPE&needRootNode=false',
										method : 'post',
										onLoadSuccess : function(node, data) {
											console.log(node, data);
											/*
											 * var roots =
											 * $('#tree_parm_catalog').tree('getRoots');
											 * $('#tree_parm_catalog').tree('select',roots[0].target);
											 * var treeNode = roots[0]; var
											 * isCascade =
											 * $('#isCascade').attr('checked') ==
											 * 'checked'; $('#dg_r').datagrid({
											 * url :
											 * 'basicdata/queryParms.action',
											 * method : 'post', queryParams: {
											 * isCascade: isCascade, catalogId:
											 * treeNode.id, keyword : null } });
											 */
										}
									});

					$("#t2").datagrid(
									{
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
											 * var pagin = $('#t1') .datagrid(
											 * 'getPager'); var $pagnum =
											 * $(pagin[0]) .find(
											 * ".pagination-num");
											 */
											/* $pagnum.parent().prev(); */
											return {
												rows : data,
												total : data.length
											};
										},

										columns : [
												[
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
															formatter : function(
																	val, row,
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
														} ],
												[

														{
															field : 'filename',
															title : '文件名称',
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
															title : '发布单位',
															align : 'right',
															sortable : true
														},
														{
															field : 'status',
															title : '发布状态',
															width : 80,
															sortable : true,
															formatter : function(
																	val, row,
																	index) {
																if (val == "未发布") {
																	return '<span style="color:#43b3f7;">'
																			+ val
																			+ '</span>';
																}
																return val;
															}
														}, {
															field : 'date',
															title : '提交日期',
															width : 120,
															align : 'center'
														} /*
															 * , { field :
															 * 'filepath', title :
															 * '操作', formatter :
															 * function( val,
															 * row, index) {
															 * return '<a
															 * target="_blank"
															 * href="'+val+'">' +
															 * '查看' + '</a>'; } }
															 */] ]

									});

					window.onresize = function() {
						setTimeout(domresize, 300);
					};
					// 改变表格宽高
					function domresize() {
						$('#t2').datagrid('resize', {

							/* height:$("#body").height()-$('#search_area').height(), */
							width : $(".grid_panel").width()
						});
					}
				});

var siteQuery = {
	doSearch : function() {
		alert("查询111");
	}
}