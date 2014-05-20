console.log("Bookmarker content script running");
var injection = $("<div id='bm_extension_bookmark'><h1>Bookmark Page</h1></div>");
$("body").append(injection);