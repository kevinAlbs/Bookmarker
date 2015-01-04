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
	var user = {
		name : "",
		password : "",
		logged_in : false
	};


	function addAjax(param, msg){
		/* Generalize this method to either send actual ajax requests or requests to the background page to update storage.sync */
		param.complete = ajaxComplete;
		//if user is logged in, append credentials to data
		if(user.logged_in){
			if(!param.hasOwnProperty("data")){
				param.data = {};
			}
			param.data.auth_username = user.name;
			param.data.auth_password = user.password;
		}
		$.ajax(param);
		ajaxRequests++;
		showStatus("Background requests in progress");
	}
	function ajaxComplete(){
		ajaxRequests--;
		if(ajaxRequests == 0){
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
			url: API_ROOT + "category/delete",
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
				url: API_ROOT + "category/add",
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
			url: API_ROOT + "category/rename",
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
			url: API_ROOT + "bookmark/deleteMultiple",
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
			url: API_ROOT + "bookmark/archiveMultiple",
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
	};

	that.tryLogin = function(username, password, callback){
		addAjax({
			url: API_ROOT + "user/authenticate",
			method: "post",
			data: {
				username : username,
				password: password,
				ispost: true
			},
			dataType: "json",
			success: function(data){
				if(data.results == "success"){
					//set user credentials
					user.name = username;
					user.password = password;
					user.logged_in = true;
				}
				callback.call(window, data);
			}
		})
	};
	that.tryRegister = function(username, password, captcha, callback){
		addAjax({
			url: API_ROOT + "user/add",
			method: "post",
			data: {
				username : username,
				password: password,
				ispost: true
			},
			dataType: "json",
			success: function(data){
				if(data.results == "success"){
					//set user credentials
					user.name = username;
					user.password = password;
					user.logged_in = true;
				}
				callback.call(window, data);
			}
		});
	};

	function initHelper(allBookmarks){
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
		//switch category to QUEUE
		switchCategory(C.QUEUE);
	}

	
	that.init = function(allBookmarks){
		if(!allBookmarks){
			addAjax({
				url : API_ROOT + "bookmark/fetch",
				dataType : "json",
				success : initHelper
			});
		} else {
			initHelper(allBookmarks);
		}

		//initialize category list
		addAjax({
			url: API_ROOT + "category/fetch",
			dataType: "json",
			success: function(data){
				var cats = data.results;
				for(var i = 0; i < cats.length; i++){
					catCache[cats[i].id] = cats[i].name;
				}
				showCategories(data);
			}
		});
	};

	return that;
}());
