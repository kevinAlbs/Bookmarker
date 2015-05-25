var C = {
	'ALL' : '-2',
	'QUEUE': '-1',
	'GENERAL' : '0'
};
var MODAL = {}; //populated in modal/ files

var curCat = C.QUEUE
		, shiftDown = false
 		, mostRecent = null //most recently clicked bookmark
		//shortcuts values are actions which get passed to performUIAction
		, shortcuts = {
			"s" : "save_bookmark",
			"d" : "delete"
		}
		, current_modal = null
		, loader_active = false
		;

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
		PROXY.tryLogin(u,p,callback);
	} else{
		callback.call(window, {results: "error"});
	}
}

function passLogin(){
	$(".userarea").show();
	$("#welcome").html("Hello " + PROXY.getUsername() + ".");
	PROXY.init(null, function(){
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
		}, 500, "linear", function(){
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
		$("#bar_loader").fadeOut();
	}
}

function showCategories(json){
	var cats = json.results;
	var cat_list = $("#cats");
	cat_list.find("li").not(".fixed").detach();//remove non-fixed categories
	for(var i = 0; i < cats.length; i++){
		var html = tmpl("category_template", {
			catname: cats[i].name,
			catid: cats[i].id
		});
		cat_list.append(html);
	}
}

function UIAddCategory(catName, catId){
	var cat_list = $("#cats");
	var html = tmpl("category_template", {
		catname: catName,
		catid: catId
	});
	cat_list.append(html);
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
	for(var i = bms.length - 1; i >= 0; i--){
		createDomBookmark(bms[i], false);
	}
	mostRecent = null;
}

/*
Adds to top of the list
*/
function createDomBookmark(json, is_update){
	var bm_list = $("#bm_list");
	var title = json.title.trim();
	var data = {
		title: title == "" ? "(Untitled)" : title,
		url: json.url,
		time: "saved " + TIME.prettyDate(json.date_added) + " on " + TIME.realDate(json.date_added),
		notes: json.notes,
		id: json.id
	};
	if(curCat == C.ALL){
		data.catName = "[" + PROXY.getCatName(json.category) + "]&nbsp;";
	} else {
		data.catName = "";
	}
	var html = tmpl("bookmark_template", data);
	if(!is_update){
		bm_list.prepend(html);
	} else {
		bm_list.find("[data-id=" + json.id + "]").replaceWith(html);
	}
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
				PROXY.deleteSelected(selectedList, curCat);
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
				PROXY.addCategory(catName);
				break;
		case "rename_cat":
			var newName = window.prompt("Enter new category name (blank otherwise)");
			if(newName){
				newName = newName.trim();
				if(newName == "") {
					return;//TODO show error feedback
				}
			} else { return; }
				PROXY.renameCategory(newName, curCat);
				$("#cats li[data-id=" + curCat + "], #category").html(newName);
				break;
		case "delete_cat":
			var go = window.confirm("Are you sure you wish to delete the category AND all bookmarks?");
			if(go){
				PROXY.deleteCategory(curCat);
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
		case "import":
			MODAL.import.show();
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
	PROXY.deleteSelected([id], curCat);
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
//using PROXY cache, refresh current list
function refreshCategory(){
	showList(PROXY.getList(curCat));
}

function switchCategory(catId){
	curCat = catId;
	if(catId != C.ALL && catId != C.QUEUE && catId != C.GENERAL){
		$(".button[data-action=delete_cat],.button[data-action=rename_cat]").fadeIn();
	}
	else{
		$(".button[data-action=delete_cat],.button[data-action=rename_cat]").hide();
	}
	showList(PROXY.getList(catId));
	var catName = PROXY.getCatName(catId);
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
		PROXY.archiveSelected(selectedList, curCat, catId);
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
		if(PROXY.numRequestsLingering() > 0)
			return "Unsaved data, are you sure you want to leave?";
	})
	$(document).on("keydown", onKeyDown);
	$(document).on("keyup", onKeyUp);

});
