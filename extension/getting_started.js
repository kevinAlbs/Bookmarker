chrome.storage.sync.get({
  server: "",
  username: "",
  password: ""
}, function(resp){
  $("#create").attr("href", resp.server + "front-end");
});

$("#authenticate").attr("href", chrome.extension.getURL("options.html"));
