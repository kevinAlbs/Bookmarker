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


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.msg == "fetch_url"){
			var t = sender.tab;
			sendResponse({url: t.url});//pretty strange that the tab can't even access it's own url
		} else if(request.msg == "fetch_html"){
			if(drawer_html !== null){
				sendResponse({html: drawer_html});
			} else {
				fetchHtml(function(){sendResponse({html: drawer_html});});
			}
		}
});
fetchHtml();