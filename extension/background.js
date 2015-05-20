var fetching = false, fetch_callbacks = [];


/*
Installation initialization
*/
chrome.runtime.onInstalled.addListener(function(details){
	if(details.reason == "install"){
		//initialize with default server
		chrome.storage.sync.set({
			server: "https://kevinalbs.com/bookmarks/",
			username : "",
			password : ""
		});
		chrome.tabs.create({
			"url" : chrome.extension.getURL("getting_started.html")
		});
	}
});

/* add the same methods as the PHP API for bookmarks and categories */
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		switch(request.msg){
			case "get_current_page":
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					if(tabs.length > 0){
						var tab = tabs[0];
						sendResponse({
							url: tab.url,
							title: tab.title
						});
					} else {
						sendResponse({
							url: "",
							title: ""
						})
					}
				});
				return true;
				break;
			case "save_page":
				//get credentials and server root
				chrome.storage.sync.get({
					server: "",
					username: "",
					password: ""
				}, function(stg){
					//try to save
					var api_root = stg.server + "back-end/index.php/";
					var params = request.data;
					params.auth_username = stg.username;
					params.auth_password = stg.password;
					$.ajax({
						url: api_root + "bookmark/save",
						method: "post",
						data: params,
						success: function(resp){
							sendResponse(resp);
						}
					});
				});
				return true;
				break;
			case "get_settings":
				chrome.storage.sync.get({
					server: "",
					username: "",
					password: ""
				}, function(stg){
					sendResponse(stg);
				});
				return true;
				break;
			case "test_auth":
				//test authentication (TODO)
				break;
		}
});
