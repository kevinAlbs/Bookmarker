var C = {
	'ALL' : '-2',
	'QUEUE': '-1',
	'GENERAL' : '0'
};
var root = "http://localhost/bookmarks/back-end/index.php/";
var listStart = -1, oldPrev = -1;//list reordering variables
var curCat = C.QUEUE;//queue
var shiftDown = false;
var mostRecent = null;//most recently clicked bookmark

/*
	Keep a local list of only everything on hand which can be updated on (delete, update, and addition)
	This can be used for search.
	http://lunrjs.com/
*/
/* Gets timezone without daylight savings */
Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}
function prettyDate(dateStr){
	function pluralize(time, type){
		if(time != 1){
			return time + " " + type + "s" + " ago";
		}
		else{
			return time + " " + type + " ago";
		}
	}
	var pretty = "just now";
	var date = new Date(dateStr);
	var now = new Date();
	var hourOff = now.stdTimezoneOffset()/60;
	//hourOff is positive if the UTC offset is negative...ok...
	now.setHours(now.getHours() - hourOff + 5);

	var diff = now.getTime() - date.getTime();

	if(diff < 1000){
		pretty = "just now";
	}
	else if(diff < 60 * 1000){
		pretty = pluralize(Math.round(diff/1000), "second");
	}
	else if(diff < 60 * 60 * 1000){
		pretty = pluralize(Math.round(diff/(60 * 1000)), "minute");
	}
	else if(diff < 24 * 60 * 60 * 1000){
		pretty = pluralize(Math.round(diff/(60 * 60 * 1000)), "hour");
	}
	else if(diff < 30 * 24 * 60 * 60 * 1000){
		pretty = pluralize(Math.round(diff/(24 * 60 * 60 * 1000)), "day");
	}
	else if(diff < 12 * 30 * 24 * 60 * 60 * 1000){
		pretty = pluralize(Math.round(diff/(30 * 24 * 60 * 60 * 1000)), "month");
	}
	else{
		pretty = "over a year ago";
	}
	return pretty;
}
function showStatus(msg){
	if(!msg){
		$("#status_wrapper").fadeOut(250);
	}
	else{
		$("#status_wrapper").fadeIn(250);
		$("#status").html(msg);
	}
}
function showCategories(json){
	var cats = json.results;
	var cat_list = $("#cats");
	cat_list.find("li").not(".fixed").detach();//remove non-fixed categories
	for(var i = 0; i < cats.length; i++){
		cat_list.loadTemplate($("#category-template"),{
			catname: cats[i].name,
			catid: cats[i].id
		}, {append: true})
	}
}
function UIAddCategory(catName, catId){
	var cat_list = $("#cats");
	cat_list.loadTemplate($("#category-template"), {
		catname: catName,
		catid: catId
	}, {append: true});
}
function showList(json){
	var bms = json;
	var bm_list = $("#bm_list").empty();
	if(bms.length == 0){
		$("#none").show();
	}
	else{
		$("#none").hide();
	}
	for(var i = 0; i < bms.length; i++){
		var title = bms[i].title;
		var data = {
			title: bms[i].title,
			url: bms[i].url,
			time: prettyDate(bms[i].date_added),
			notes: bms[i].notes,
			id: bms[i].id
		};
		if(curCat == C.ALL){
			data.catName = "[" + model.getCatName(bms[i].category) + "]";
		}
		bm_list.loadTemplate($("#bookmark-template"), data, {append: true});
	}
	mostRecent = null;
}

/* called when a list item checkbox is toggled */
function refreshSelected(){
	if($("li .box.active").size() == 0){
		//remove the delete selected and categorization clickable classes
		$(".selection.button").hide();
		$(".unselection.button").show();
		$("#cats").removeClass("selection");
	}
	else{
		$("#cats").addClass("selection");
		$(".selection.button").show();
		$(".unselection.button").hide();
	}
}
function toggleBox(e){
	if(shiftDown && mostRecent != null){
		//activate all boxes from between this box and the most recent
		var bmList = $("#bm_list li");
		var thisItem = $(this).parent().parent();
		var i = bmList.index(thisItem);
		var j = bmList.index(mostRecent);
		if(i != j){
			//make sure not equal
			if(i > j){
				//swap
				var tmp = i;
				i = j;
				j = tmp;
			}
			for(var k = i; k <= j; k++){
				$(bmList.get(k)).find(".box").addClass("active");
			}
			mostRecent = null;
		}
	}
	else{
		if($(this).hasClass("active")){
			mostRecent = null;
			$(this).removeClass("active");
		}
		else{
			mostRecent = $(this).parent().parent();//li
			$(this).addClass("active");
		}
	}
	
	refreshSelected();
}

function onButton(){
	var selected = $("#bm_list li:has(.box.active)");
	var selectedList = [];
	for(var i = 0; i < selected.size(); i++){
		selectedList.push(parseInt($(selected.get(i)).attr("data-id")));
	}
	switch($(this).attr("data-action")){
		case "delete":
			if(selectedList.length == 1 || confirm("Are you sure you wish to delete " + selectedList.length + " bookmarks?")){
				selected.detach();
				refreshSelected();
				model.deleteSelected(selectedList, curCat);
			}
		break;
		case "select":
			$("#bm_list li .box").addClass("active");
			refreshSelected();
			mostRecent = null;
		break;
		case "unselect":
			$("#bm_list li .box").removeClass("active");
			refreshSelected();
			mostRecent = null;
		break;
		case "add_cat":
			var catName = window.prompt("Enter new category name (blank otherwise)").trim();//TODO dear god change this
			if(catName == ""){
				return;//TODO show error feedback
			}
			model.addCategory(catName);
		break;
		case "rename_cat":
			var newName = window.prompt("Enter new category name (blank otherwise)").trim();//TODO dear god change this
			if(newName == ""){
				return;//TODO show error feedback
			}
			model.renameCategory(newName, curCat);
			$("#cats li[data-id=" + curCat + "]").html(newName);
		break;
		case "delete_cat":
			var go = window.confirm("Are you sure you wish to delete the category AND all bookmarks?");
			if(go){
				model.deleteCategory(curCat);
				$("#cats").find("li[data-id=" + curCat + "]").detach();
				switchCategory(C.ALL);
			}
		break;
	}
}

function switchCategory(catId){
	curCat = catId;
	if(catId != C.ALL && catId != C.QUEUE && catId != C.GENERAL){
		$(".button[data-action=delete_cat],.button[data-action=rename_cat]").fadeIn();
	}
	else{
		$(".button[data-action=delete_cat],.button[data-action=rename_cat]").hide();
	}
	showList(model.getList(catId));
	var catName = model.getCatName(catId);
	$("#category").html(catName);
}
function catClicked(){
	var selected = $("#bm_list li:has(.box.active)");
	var catId = $(this).attr("data-id");

	if(curCat == catId){return;}

	if(selected.size() == 0){
		//switch to new category
		switchCategory(catId);
	}
	else{
		//archive to that category
		console.log("archiving");	
		if(catId == C.ALL){
			alert("Cannot categorize to 'all'");
			return;
		}
		var selectedList = [];
		var first = true;
		for(var i = 0; i < selected.size(); i++){
			selectedList.push($(selected.get(i)).attr("data-id"));
		}

		$(".box.active").removeClass("active");
		refreshSelected();
		model.archiveSelected(selectedList, curCat, catId);
		//Reshow current list
		
		if(curCat != C.ALL){
			selected.detach();//should not remove if viewing everything anyway
		}

	}
	
}

function onKeyDown(e){
	if(e.keyCode == 16){
		shiftDown = true;
	}
}
function onKeyUp(e){
	if(e.keyCode == 16){
		shiftDown = false;
	}
}
$(".button").click(onButton);
//set up events
//$("#bm_list").sortable();
//event delegation
$("#bm_list").on("click", "li .box", toggleBox);
$("#cats").on("click", "li", catClicked);
$(window).on("beforeunload", function(){
	if(model.numRequestsLingering() > 0)
		return "Unsaved data, are you sure you want to leave?";
})
$(document).on("keydown", onKeyDown);
$(document).on("keyup", onKeyUp);