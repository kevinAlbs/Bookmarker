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


/*
chrome.browserAction.setIcon({
		path: "img/icon_filled_19.png"
});
*/
/* add the same methods as the PHP API for bookmarks and categories */
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		switch(request.msg){
			case "is_page_saved":
			return true;
			break;
		}
});
