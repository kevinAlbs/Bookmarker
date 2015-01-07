var data = {
  server: "",
  username: "",
  password: ""
}
var feedback_timer = null;
var advanced_shown = false;

function feedback(msg){
  $("#feedback").html(msg).show();
  window.clearTimeout(feedback_timer);
  feedback_timer = window.setTimeout(function(){
    $("#feedback").fadeOut()
  }, 10000)
}

function updateFields(){
  $("[name=username]").val(data.username);
  $("[name=password]").val(data.password);
  $("[name=url]").val(data.server);
  $("a#register").attr("href", data.server + "front-end/");
}

function tryAuth(username, pass, callback){
  $.ajax({
    url: data.server + "back-end/index.php/user/authenticate",
    method : "post",
    data : {
      username : username,
      password: pass,
      ispost : true
    },
    dataType: "json",
    success : function(resp){
      callback.call(window, resp, "success");
    },
    error: function(resp){
      callback.call(window, null, "error");
    }
  });
}

function usersEnabled(callback){
  $.ajax({
    url: data.server + "back-end/index.php/user/isEnabled",
    method: "post",
    data : {
      ispost : true
    },
    dataType: "json",
    success : function(resp){
      callback.call(window, resp, "success");
    },
    error: function(resp){
      callback.call(window, null, "error");
    }
  });
}

$("form[name=auth]").on("submit", function(e){
  e.preventDefault();
  var username = $(this).find("[name=username]").val();
  var password = $(this).find("[name=password]").val();
  data.username = username;
  data.password = password;
  //set chrome storage
  chrome.storage.sync.set({
    username: username,
    password: password
  });
  tryAuth(username, password, function(resp, status){
    if(status == "error"){
      feedback("Could not reach server at '" + data.server + "'");
    } else {
      if(resp.results == "success"){
        feedback("Logged in as '" + username + "'!");
        updateFields();
      } else {
        feedback("Incorrect username/password.");
      }
    }
  });
});

$("form[name=server]").on("submit", function(e){
  e.preventDefault();
  var serverUrl = $(this).find("[name=url]").val();
  if(serverUrl == ""){
    feedback("Server URL must not be empty")
    return;
  }
  //check if last letter is slash, if not, add it
  if(serverUrl.charAt(serverUrl.length - 1) != "/"){
    serverUrl += "/";
  }
  chrome.storage.sync.set({
    server: serverUrl
  }, function(){
    data.server = serverUrl;
    updateFields();

    //if users are enabled, attempt the login
    usersEnabled(function(resp, status){
      if(status == "error"){
        //means server was unreachable
        feedback("Cannot reach server '" + serverUrl + "'");
      } else {
        if(resp){
          feedback("Server URL set to '" + serverUrl + "'. Please enter username/password.");
        } else{
          feedback("Server URL set to '" + serverUrl +  "'. This server does not require authentication.");
        }

      }
    });
  })
});

chrome.storage.sync.get({
  server: "",
  username: "",
  password: ""
}, function(resp){
  data = resp;
  updateFields();
})

$("#link_advanced").on("click", function(e){
  e.preventDefault();
  if(advanced_shown){
    $("#advanced").fadeOut();
    $(this).html("Show Advanced Settings");
  } else {
    $("#advanced").fadeIn();
    $(this).html("Hide Advanced Settings");
  }
  advanced_shown = !advanced_shown;
});
