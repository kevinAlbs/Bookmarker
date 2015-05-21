/*
Right now this popup sends messages to the background page, however, it can
access chrome.storage without it. I'm going to leave it as is, in case I
ever go back to using a content script injection.

Assume that the server, username, and password could change at any time, since
it is possible that the user could edit settings while keeping the popup open
(however unlikely)
*/
var dom = {
  title: $("input[name=title]"),
  url: $(".url"),
  notes: $("input[name=notes]"),
  view_link : $("#view"),
  save_area : $(".save_area"),
  green_overlay: $(".save_area .green_overlay"),
  green_fill: $(".save-button .fill"),
  areas : $(".area"),
  area : {
    "login" : $(".login_area"),
    "save" : $(".save_area"),
    "cannot_connect" : $(".cannot_connect_area"),
    "review_area" : $(".review_area")
  },
  login_form : $(".login_area form[name=login_form]"),
  login: {
    username : $(".login_area input[name=username]"),
    password : $(".login_area input[name=password]"),
    feedback : $(".login_area .feedback")
  }
};

var page_status = "unsaved"; //saved
var connection_status = "connected"; //need_login|cannot_connect
var current_area = "save";

function openFrontEnd(e){
  e.preventDefault();
  POPUP_PROXY.getInfo(function(info){
    window.open(info.server + "front-end");
  });
}

function getCurrentPage(callback){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    if(tabs.length > 0){
      var tab = tabs[0];
      callback({
        url: tab.url,
        title: tab.title
      });
    } else {
      callback({
        url: "",
        title: ""
      })
    }
  });
}

function switchArea(name){
  dom.areas.hide();
  dom.area[name].show();
  current_area = name;
}

function onEnterPressed(){
  //if the current state is possible to save a bookmark, save
  if(current_area == "save" && page_status == "unsaved" && connection_status == "connected"){
    getCurrentPage(function(page){
      POPUP_PROXY.saveBookmark(page.url, page.title, function(response){
        if(response.results == "error"){
          dom.save_message.addClass("error").html("Error occurred, please refresh");
        }
      });
    });

    //show the save animation
    dom.save_area.animate({
      height: "15px",
    }, 300, "linear", function(){
      window.setTimeout(function(){
        dom.save_area.fadeOut()
      }, 1000);
      dom.green_fill.animate({
        height: "16px"
      });
    });
    dom.green_overlay.fadeIn();
    page_status = "saved";
  }
}

function onLoginSubmit(e){
  e.preventDefault();
  function onAuth(response){
      if(response.results == "error"){
        if(response.server_connection){
          //show error
          dom.login.feedback.html(response.message).show();
          switchArea("login");
          connection_status = "need_login";
        } else {
          switchArea("cannot_connect");
          connection_status = "cannot_connect";
        }
      } else {
        //hide login form
        connection_status = "connected";
        switchArea("save");
      }
  }

  function onSetInfo(){
    POPUP_PROXY.verifyAuth(onAuth);
  }

  POPUP_PROXY.setInfo({
    username : dom.login.username.val(),
    password : dom.login.password.val()
  }, onSetInfo);


}

/*
Tests connection. If authentication is required, checks if it can log in with
stored user credentials
*/
function initConnection(){
  function onAuth(response){
    if(response.results == "error"){
      switchArea("login");
      connection_status = "need_login";
    } else {
      connection_status = "connected";
    }
  }

  POPUP_PROXY.testConnection(function(response){
    if(response.can_connect){
      connection_status = "connected";
      if(response.auth_required){
        POPUP_PROXY.verifyAuth(onAuth);
      }
    } else {
      switchArea("cannot_connect");
      connection_status = "cannot_connect";
    }
  });
}

function init(){
  POPUP_PROXY.getInfo(function(response){
    dom.login.username.val(response.username);
  });

  initConnection();

  dom.view_link.on("click", openFrontEnd);

  getCurrentPage(function(response){
    dom.title.val(response.title);
    dom.url.html(response.url);
  });

  $(document).on("keypress", function(e){
    switch(e.keyCode){
      case 13:
      onEnterPressed();
      break;
    }
  });

  dom.login_form.on("submit", onLoginSubmit);
  $(".settings-link").attr("href", chrome.extension.getURL("options.html"));
  dom.notes.focus();

}

init();
