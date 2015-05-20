var dom = {
  title: $("input[name=title]"),
  url: $(".url"),
  notes: $("input[name=notes]"),
  view_link : $("#view"),
  save_area : $(".save_area"),
  save_message: $(".save_area .save_message")
};

var state = "can_save"; //just_saved|already_saved|login

function saveTransition(){
  dom.save_area.animate({
    height: "10px"
  });
  dom.save_message.fadeIn();
}

chrome.runtime.sendMessage({msg: "get_settings"}, function(response){
  dom.view_link.attr("href", response.server + "front-end");
});

chrome.runtime.sendMessage({msg: "get_current_page"}, function(response){
  dom.title.val(response.title);
  dom.url.html(response.url);
});

$(document).on("keypress", function(e){
  if(e.keyCode == 13){
    //if the current state is possible to save a bookmark, save
    saveTransition();
  }
});

$("#settings").attr("href", chrome.extension.getURL("options.html"));
dom.notes.focus();
