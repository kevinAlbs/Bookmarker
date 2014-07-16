//handles local storage and ajax requests
//periodically pings server to check if any other bookmarks have been added since last refreshed. If so, refresh everything. [not so sure about best way to handle this]
var model = (function(){
	var that = {};
	var bookmarkCache = {
		lookup : {//maps category (including 'all') to bookmark list
			'-2' : [],
			'-1' : [],
			'0' : []
		}
	};
	var catCache = {
		'-2' : 'All',
		'-1' : 'Queue',
		'0' : 'General'
	};
	var ajaxRequests = 0;//semaphore type

	//initialize category list
	addAjax({
		url: root + "category/fetch",
		dataType: "json",
		success: function(data){
			var cats = data.results;
			for(var i = 0; i < cats.length; i++){
				catCache[cats[i].id] = cats[i].name;
			}
			showCategories(data);
		}
	});
	
	function addAjax(param, msg){
		param.complete = ajaxComplete;
		$.ajax(param);
		ajaxRequests++;
		showStatus("Background requests in progress");
		//$("#loader").show();
	}
	function ajaxComplete(){
		ajaxRequests--;
		if(ajaxRequests == 0){
			//$("#loader").hide();
			showStatus(false);
		}
	}
	function addToCache(bm, cat){
		if(!(cat in bookmarkCache.lookup)){
			bookmarkCache.lookup[cat] = [];
		}
		for(var i = 0; i < bookmarkCache.lookup.length; i++){
			if(bookmarkCache.lookup[i] == bm){
				return;//this check is necessary if user tries to add bookmark from all category
			}
		}
		bookmarkCache.lookup[cat].push(bm);
	}
	//TODO change to O(1) when cache is changed to object instead of array
	function getBookmark(id, cat, deleteBm){
		var arr = bookmarkCache.lookup[cat + ''];
		for(var i = 0; i < arr.length; i++){
			if(id == arr[i].id){
				if(deleteBm){
					return arr.splice(i, 1)[0];
				}
				return arr[i];
			}
		}
	}
	that.deleteCategory = function(catId){
		addAjax({
			url: root + "category/delete",
			data: {
				ispost: true,
				category: catId
			},
			method: "post",
			dataType: 'json',
			success: function(data){
				console.log("Category deleted");
			}
		});
	};
	that.addCategory = function(catName){
		addAjax({
				url: root + "category/add",
				data: {
					ispost: true,
					category_name: catName
				},
				method: "post",
				dataType: 'json',
				success: function(data){
					UIAddCategory(catName, data.insert_id);//ui
					catCache[data.insert_id + ""] = catName;
				}
		})
	};
	that.renameCategory = function(catName, catId){
		addAjax({
			url: root + "category/rename",
			data: {
				ispost: true,
				category_name: catName,
				category: catId
			},
			method: "post"
		});
	}
	that.numRequestsLingering = function(){
		return ajaxRequests;
	}
	that.updateNote = function(bm_id, newNote){}
	that.getList = function(catId){
		//ajax call, update cache
		return (catId in bookmarkCache.lookup) ? bookmarkCache.lookup[catId] : [];
	}
	//idList is array of id values
	that.deleteSelected = function(idList, curCat){
		for(var i = 0; i < idList.length; i++){
			var bm = null;
			if(curCat == C.ALL){
				//delete from individual category, not all, update cat in title
				bm = getBookmark(idList[i], curCat, true);//delete from all
				getBookmark(bm.id, bm.category, true);//delete from individual category
			}
			else{
				bm = getBookmark(idList[i], curCat, true);
			}
		}
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
	that.archiveSelected = function(idList, curCat, toCat){
		if(curCat == toCat){
			return;
		}
		for(var i = 0; i < idList.length; i++){
			var bm = null;
			if(curCat == C.ALL){
				//delete from individual category, not all, update cat in title
				bm = getBookmark(idList[i], curCat, false);//don't delete
				getBookmark(bm.id, bm.category, true);//delete from individual category
			}
			else{
				bm = getBookmark(idList[i], curCat, true);
			}
			addToCache(bm, toCat);
			bm.category = toCat;
			//update category in ALL list
		}
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
				category: toCat,
				ispost: true 
			}
		});
	}
	that.getCatName = function(catId){
		if(!(catId in catCache)){
			return "Not loaded";
		}
		return catCache[catId];
	}
	that.init = function(allBookmarks){
		console.log("Initializing");
		console.log(allBookmarks);
		//populate cache
		var bms = allBookmarks.results;
		bookmarkCache.lookup = [];
		bookmarkCache.lookup[C.ALL] = bms; //since this is by reference, changes to other categories, notes, etc. need not be repeated
		for(var i = 0; i < bms.length; i++){
			var cat = bms[i].category;
			if(cat == C.ALL){
				console.log("Error: Something categorized to all");
				return;
			}
			addToCache(bms[i], cat);
		}
	}

	return that;
}());