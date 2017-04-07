/**
 * 
 */

console.log(window.parent)
var parent=window.parent.document;
var treenav= parent.getElementById("app_tree_sidebar");
if(treenav){
	treenav.style.display="none";
parent.getElementById("contentDiv").style.left="0px"; 
}