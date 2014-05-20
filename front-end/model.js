//handles local storage and ajax requests
//periodically pings server to check if any other bookmarks have been added since last refreshed. If so, refresh everything. [not so sure about best way to handle this]
var model = (function(){
	var that = {};
	var bookmarkCache = {
		lookup : null//maps category (including 'all') to bookmark list
	};
	var catCache = {};
	var ajaxRequests = 0;//semaphore type

	//initialize category list
	addAjax({
		url: root + "bookmark/fetchCategories",
		dataType: "json",
		success: function(data){
			var cats = data.results;
			for(var i = 0; i < cats.length; i++){
				catCache[cats[i].id] = cats[i].name;
			}
			showCategories(data);
		}
	});
		
	function addAjax(param){
		param.complete = ajaxComplete;
		$.ajax(param);
		ajaxRequests++;
		//$("#loader").show();
	}
	function ajaxComplete(){
		ajaxRequests--;
		if(ajaxRequests == 0){
			//$("#loader").hide();
		}
	}
	that.getList = function(catId){
		//ajax call, update cache
		return (catId in bookmarkCache.lookup) ? bookmarkCache.lookup[catId] : [];
	}
	//idList is array of id values
	that.deleteSelected = function(idList, curCat){
		//delete from all and curCat cache
		var selectedString = "";
		var first = true;
		for(var i = 0; i < idList.length; i++){
			if(!first) selectedString += "|";
			else first = false;
			selectedString += idList[i];
		}
		addAjax({
			url: root + "bookmark/deleteMultiple",
			method: "post",
			data: {
				idList: selectedString,
				ispost: true 
			}
		});
	}
	that.archiveSelected = function(idList, curCat){
		//move over from cache as well and update category
		var selectedString = "";
		var first = true;
		for(var i = 0; i < idList.length; i++){
			if(!first) selectedString += "|";
			else first = false;
			selectedString += idList[i];
		}
		addAjax({
			url: root + "bookmark/archiveMultiple",
			method: "post",
			data: {
				idList: selectedString,
				category: catId,
				ispost: true 
			}
		});
	}
	that.init = function(allBookmarks){
		//populate cache
		var bms = allBookmarks.results;
		bookmarkCache.lookup = [];
		bookmarkCache.lookup['-2'] = bms; //since this is by reference, changes to other categories, notes, etc. need not be repeated
		for(var i = 0; i < bms.length; i++){
			var cat = bms[i].category;
			if(!(cat in bookmarkCache.lookup)){
				bookmarkCache.lookup[cat] = [];
			}
			bookmarkCache.lookup[cat].push(bms[i]);
		}
		//show queue
		showList(that.getList('-1'));
	}

	return that;
}());