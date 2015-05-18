var C = {
	'ALL' : '-2',
	'QUEUE': '-1',
	'GENERAL' : '0'
};
//API_ROOT is defined as the url to back-end/index.php
var listStart = -1, oldPrev = -1;//list reordering variables
var curCat = C.QUEUE;//queue
var shiftDown = false;
var mostRecent = null;//most recently clicked bookmark
//shortcuts values are actions which get passed to performUIAction
var shortcuts = {
	"s" : "save_bookmark",
	"d" : "delete"
};
var MODAL = {}; //populated in other files
var current_modal = null;
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
function niceMonth(m){
	switch(m){
		case 0:  return "Jan";
		case 1:  return "Feb";
		case 2:  return "March";
		case 3:  return "April";
		case 4:  return "May";
		case 5:  return "June";
		case 6:  return "July";
		case 7:  return "Aug";
		case 8:  return "Sep";
		case 9:  return "Oct";
		case 10: return "Nov";
		case 11: return "Dec";
	}
}
function realDate(dateStr){
	var date = new Date(dateStr);
	var hour = date.getHours();
	var min = date.getMinutes();
	if(min < 10){
		min = "0" + min;
	}
	var ampm = hour >= 12 ? "pm" : "am";
	hour = (hour > 12) ? hour - 12 : hour;
	hour = (hour == 0) ? 12 : hour;
	return niceMonth(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear() + " " + hour + ":" + min + ampm;
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

function setCurrentModal(val){
	if(current_modal != null){
		throw "Cannot open more than one modal";
	}
	current_modal = val;
}
function unsetCurrentModal(val){
	//only unset if matches currently open one
	if(val == current_modal){
		current_modal = null;
	} else{
		throw "Cannot close a different modal";
	}
}
function isModalShowing(){
	return current_modal != null;
}

function remember(username, password){
	//add to local storage
	if(window.localStorage === undefined){
		console.log("Cannot remember, no local storage support");
	} else {
		window.localStorage.setItem("username", username);
		window.localStorage.setItem("password", password);
	}
}

function forget(){
	window.localStorage.removeItem("username");
	window.localStorage.removeItem("password");
}

function tryRemember(callback){
	var u = window.localStorage.getItem("username");
	var p = window.localStorage.getItem("password");
	if(u !== null && p !== null){
		model.tryLogin(u,p,callback);
	} else{
		callback.call(window, {results: "error"});
	}
}

function passLogin(){
	$(".userarea").show();
	$("#welcome").html("Hello " + model.getUsername() + ".");
	model.init(null, function(){
		switchCategory(C.QUEUE);
	});
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

var loader_active = false;
function toggleLoader(val){
	var loader_state = false;

	function iterate(){
		$("#bar_loader").css({
			"background-color" : loader_state ? "#000" : "rgb(98,98,98)"
		});
		$("#bar_loader .fill").css({
			"background-color" : loader_state ? "rgb(98,98,98)" : "#000",
			"width" : "0%"
		});
		$("#bar_loader .fill").animate({
			"width" : "100%"
		}, 1000, "linear", function(){
			console.log("yep");
			if(loader_active){
				loader_state = !loader_state;
				iterate();
			}
		});
	};

	loader_active = val;
	if(loader_active){
		$("#bar_loader").show();
		iterate();
	} else {
		$("#bar_loader").hide();
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
			time: "saved " + prettyDate(bms[i].date_added) + " on " + realDate(bms[i].date_added),
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

function performUIAction(action){
	var selected = $("#bm_list li:has(.box.active)");
	var selectedList = [];
	for(var i = 0; i < selected.size(); i++){
		selectedList.push(parseInt($(selected.get(i)).attr("data-id")));
	}
	switch(action){
		case "delete":
			if(selectedList.length == 0) return;
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
			var catName = window.prompt("Enter new category name (blank otherwise)");
			if(catName){
				catName = catName.trim();
				if (catName == "") {
					return;//TODO show error feedback
				}
			} else { return; }
				model.addCategory(catName);
				break;
		case "rename_cat":
			var newName = window.prompt("Enter new category name (blank otherwise)");
			if(newName){
				newName = newName.trim();
				if(newName == "") {
					return;//TODO show error feedback
				}
			} else { return; }
				model.renameCategory(newName, curCat);
				$("#cats li[data-id=" + curCat + "], #category").html(newName);
				break;
		case "delete_cat":
			var go = window.confirm("Are you sure you wish to delete the category AND all bookmarks?");
			if(go){
				model.deleteCategory(curCat);
				$("#cats").find("li[data-id=" + curCat + "]").detach();
				switchCategory(C.ALL);
			}
			break;
		case "logout":
			forget();
			window.location.reload();
			break;
		case "save_bookmark":
			MODAL.save_bookmark.show();
			break;
	}
}

function onButton(){
	performUIAction($(this).attr("data-action"));
}

function onDeleteButton(e){
	e.preventDefault();
	var el = $(this).parents("li");
	var id = el.attr("data-id");
	model.deleteSelected([id], curCat);
	el.fadeOut(500, function(){
		el.detach();
	});
}

function onEditButton(e){
	e.preventDefault();
	var el = $(this).parents("li");
	var id = el.attr("data-id");
	MODAL.save_bookmark.show(id);
}
function onMoreButton(e){
	e.preventDefault();
}
//using model cache, refresh current list
function refreshCategory(){
	showList(model.getList(curCat));
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
		refreshCategory();
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
	var c = String.fromCharCode(e.keyCode).toLowerCase();
	if(!isModalShowing() && c in shortcuts){
		performUIAction(shortcuts[c]);
	}
}

$(document).ready(function(){
	$(".button").click(onButton);
	//set up events
	//$("#bm_list").sortable();
	//event delegation
	$("#bm_list").on("click", "li .box", toggleBox);
	$("#bm_list").on("click", "li .delete-link", onDeleteButton);
	$("#bm_list").on("click", "li .edit-link", onEditButton);
	$("#bm_list").on("click", "li .more-link", onMoreButton);
	$("#cats").on("click", "li", catClicked);
	$(window).on("beforeunload", function(){
		if(model.numRequestsLingering() > 0)
			return "Unsaved data, are you sure you want to leave?";
	})
	$(document).on("keydown", onKeyDown);
	$(document).on("keyup", onKeyUp);
});
