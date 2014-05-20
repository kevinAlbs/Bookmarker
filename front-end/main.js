var C = {
	'ALL' : '-2',
	'QUEUE': '-1',
	'GENERAL' : '0'
};
var root = "http://localhost/bookmarks/back-end/index.php/";
var listStart = -1, oldPrev = -1;//list reordering variables
var curCat = C.QUEUE;//queue

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
}


function deleteCategory(e){}

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
	$(this).toggleClass("active");
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
		break;
		case "unselect":
			$("#bm_list li .box").removeClass("active");
			refreshSelected();
		break;
	}
}

function catClicked(){
	var selected = $("#bm_list li:has(.box.active)");
	var catId = $(this).attr("data-id");
	var catName = $(this).html();

	if(curCat == catId){return;}

	if(selected.size() == 0){
		//switch to new category
		curCat = catId;
		showList(model.getList(catId));
		$("#category").html(catName);
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

$(".button").click(onButton);
//set up events
$("#bm_list").sortable({
	distance: 12,
	start: function(e,ui){
		listStart = $("#bm_list li").index(ui.item);
		oldNext = $("#bm_list li:nth-child(" + (listStart+1) + ")");
		if(oldNext) oldNext = oldNext.attr("data-id");
		else oldNext = -1;
	},
	stop: function(e,ui){
		var listEnd = $("#bm_list li").index(ui.item);
		var newNext = $("#bm_list li:nth-child(" + (listEnd+1) + ")");
		if(newNext) newNext = newNext.attr("data-id");
		else newNext = -1;
		var newPrev = $("#bm_list li:nth-child(" + (listEnd-1) + ")");
		if(newPrev) newPrev = newNext.attr("data-id");
		else newPrev = -1;
		//check if it has changed
		if(listEnd != listStart){
			/*
			addAjax({
				url: root + "bookmark/listOrder",
				method: "post",
				data: {
					ispost: true,
					id: $(ui.item).attr("data-id"),
					oldPrev : oldPrev,
					newNext : newNext,
					newPrev : newPrev
				}
			})
		*/
		}
	}
});
//event delegation
$("#bm_list").on("click", "li .box", toggleBox);
$("#cats").on("click", "li", catClicked);
