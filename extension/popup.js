$("#save").on("click", function(e){
  e.preventDefault();
  //get current tab
  chrome.tabs.query({"active":true}, function(tabs){
    if(tabs.length == 0){
      return;
    }
    var tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, {cmd: "open_drawer"});
    window.close();
  });
})

chrome.runtime.sendMessage({msg: "get_settings"}, function(response){
  $("#view").attr("href", response.server + "front-end");
})

$("#settings").attr("href", chrome.extension.getURL("options.html"));
