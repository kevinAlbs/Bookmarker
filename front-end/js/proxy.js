/*
A proxy for the API
*/
var PROXY = (function(){
	var that = {};
	var ajaxRequests = 0;
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
		toggleLoader(true);
	}

	function ajaxComplete(){
		ajaxRequests--;
		if(ajaxRequests == 0){
			showStatus(false);
			toggleLoader(false);
		}
	}

	function initHelper(bookmarkData){
		CACHE.initBookmarks(bookmarkData.results);
		//switch category to QUEUE
		switchCategory(C.QUEUE);
	}

	that.getBookmark = function(bookmark_id){
		return CACHE.getBookmark(bookmark_id);
	};

	that.updateBookmark = function(bookmark_id, url, title, notes, callback){
		addAjax({
			url: API_ROOT + "bookmark/update",
			data : {
				ispost: true,
				id: bookmark_id,
				url: url,
				notes: notes,
				title: title
			},
			method: "post",
			dataType: "json",
			success : function(response){
				CACHE.updateBookmark(bookmark_id, url, title, notes);
				if(callback){
					callback.call(window, response);
				}
			}
		});
	};

	that.saveBookmark = function(url,title,notes,catId, callback){
		if(catId == C.ALL){
			throw "Cannot add to All category";
		}
		addAjax({
			url: API_ROOT + "bookmark/save",
			data : {
				ispost: true,
				url: url,
				notes: notes,
				title: title
			},
			method: "post",
			dataType: "json",
			success : function(response){
				CACHE.addBookmark(response);
				if(callback){
					callback.call(window, response);
				}
			}
		});
	};

	that.importBookmarks = function(bookmarks, callback){
		//get imported to Queue
		addAjax({
			url: API_ROOT + "bookmark/import",
			data : {
				ispost: true,
				bookmark_data : bookmarks
			},
			method: "post",
			dataType: "json",
			success : function(response){
				if(!response.hasOwnProperty("results")){
					alert("Server error has occured");
				}
				if(response["results"] == "error"){
					alert("Error importing: " + response["message"]);
					return;
				}
				var bookmarks = response.results;
				for(var i = 0; i < bookmarks.length; i++){
					CACHE.addBookmark(bookmarks[i]);
				}
				if(callback){
					callback.call(window, response);
				}
			}
		});
	};

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
		CACHE.deleteCategory(catId);
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
					CACHE.addCategory(data.insert_id, catName);
				}
		})
	};

	that.renameCategory = function(catName, catId){
		CACHE.renameCategory(catId, catName);
		addAjax({
			url: API_ROOT + "category/rename",
			data: {
				ispost: true,
				category_name: catName,
				category: catId
			},
			method: "post"
		});
	};

	that.numRequestsLingering = function(){
		return ajaxRequests;
	};

	that.getList = function(catId){
		//ajax call, update cache
		return CACHE.getList(catId);
	};

	that.getCatName = function(catId){
		return CACHE.getCatName(catId);
	};

	//idList is array of id values
	that.deleteSelected = function(idList, curCat){
		CACHE.deleteBookmarks(idList);
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
	};

	that.archiveSelected = function(idList, curCat, toCat){
		CACHE.archiveBookmarks(idList, curCat, toCat);
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
	};

	that.getUsername = function(){
		return user.name;
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
				captcha: captcha,
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

	that.init = function(bookmarkData, bookmarkCallback){
		if(!bookmarkData){
			addAjax({
				url : API_ROOT + "bookmark/fetch",
				dataType : "json",
				success : initHelper
			});
		} else {
			initHelper(bookmarkData);
			if(bookmarkCallback){
				bookmarkCallback.call();
			}
		}

		//initialize category list
		addAjax({
			url: API_ROOT + "category/fetch",
			dataType: "json",
			success: function(data){
				var cats = data.results;
				CACHE.initCategories(cats);
				showCategories(data);
			}
		});
	};

	return that;
}());
