chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.msg == "fetch_url"){
			var t = sender.tab;
			sendResponse({url: t.url});//pretty strange that the tab can't even access it's own url
		}
});