/*
This is written assuming that the server, username, and password could change
at any time, since it is possible that the user could edit settings while
keeping the popup open (however unlikely).

The state is a little tricky to manage, as there are many edge cases to
consider. E.g. user needs to be connected and able to access API. First, check
for reachability and if API requires auth, if it does, then check if the stored
username/password work. If they do, or API does not require auth, then the user
is connected. This somewhat complex criteria can lead to overbloated condition
checking. For now I think it's okay, but if we add features (e.g. allow undo,
allow in-place editing) I think it might make sense to have a separate state
publisher object. Therefore, it can notify when the user is connected, when
a bookmark is saved, etc. and keep a log of the state.
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
    "review" : $(".review_area")
  },
  login_form : $(".login_area form[name=login_form]"),
  login: {
    username : $(".login_area input[name=username]"),
    password : $(".login_area input[name=password]"),
    feedback : $(".login_area .feedback")
  },
  review : {
    notes_section : $(".review_area .notes_section"),
    notes : $(".review_area .notes"),
    date : $(".review_area .date"),
  },
  save_button_txt : $(".save-button span"),
  save_button : $(".save-button")
};

var page_status = "unsaved"; //saved|already_saved
var connection_status = "connected"; //need_login|cannot_connect
var current_area = "save";
var current_url = "";

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
          alert("Error occurred, please refresh");
        } else {
          //show the save animation
          dom.save_area.animate({
            height: "15px",
            opacity: "1"
          });
          dom.green_overlay.fadeIn();
          page_status = "saved";
        }
      });
    });

    dom.save_area.css({opacity: ".5"});
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
        onConnection();
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
called once the "already saved" check completes
*/
function onCheckSaved(response){
  if(connection_status == "connected"){
    if(response.hasOwnProperty("results") && response.results != "error"){
      if(response.results.length > 0){
        page_status == "already_saved";
        var page = response.results[0];
        dom.save_button_txt.html("Saved to Bookmarks")
        dom.save_button.on("click", openFrontEnd);
        if(page.notes.trim() == ""){
          dom.review.notes_section.hide();
        } else {
          page.notes_section.show();
          dom.review.notes.html(page.notes);
        }
        switchArea("review");
      }
    }
  }
}

/*
called once user is fully connected to API,
regardless of whether there is no authentication
or if they input correct credentials
*/
function onConnection(){
  /* current_url should be set (since fetching url from storage is fast)
     as a failsafe, ensure current_url has been set
  */
  if(current_url == ""){
    getCurrentPage(function(response){
      current_url = response.url;
      POPUP_PROXY.checkSaved(response.url, onCheckSaved);
    });
  } else {
    POPUP_PROXY.checkSaved(current_url, onCheckSaved);
  }
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
      onConnection();
    }
  }

  POPUP_PROXY.testConnection(function(response){
    if(response.can_connect){
      if(response.auth_required){
        POPUP_PROXY.verifyAuth(onAuth);
      } else {
        connection_status = "connected";
        onConnection();
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
    current_url = response.url;

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
