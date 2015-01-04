var drawer_html = null;
var fetching = false, fetch_callbacks = [];

/* either fetches html, or if already fetching, adds callback */
function fetchHtml(callback){
	if (callback) {
		fetch_callbacks.push(callback);
	}
	if(fetching){
		//just add callback, return
		return;
	}
	fetching = true;
	$.ajax({
	    url: chrome.extension.getURL("drawer.html"),
	    dataType: "html",
	    success: function(data){
	    	drawer_html = data;
	    	for(var i = 0; i < fetch_callbacks.length; i++){
	    		fetch_callbacks[i]();
	    	}
	    	fetching = false;
	    }
	});
}


/* add the same methods as the PHP API for bookmarks and categories */
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		switch(request.msg){
			case "fetch_url":
				var t = sender.tab;
				sendResponse({url: t.url});//pretty strange that the tab can't even access it's own url
				break;
			case "fetch_html":
				if(drawer_html !== null){
					sendResponse({html: drawer_html});
				} else {
					fetchHtml(function(){sendResponse({html: drawer_html});});
				}
				break;
			case "save_url":
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
fetchHtml();
