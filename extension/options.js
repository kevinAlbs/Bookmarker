var data = {
  server: "",
  username: "",
  password: ""
}
var feedback_timer = null;

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

$("form[name=auth]").on("submit", function(e){
  e.preventDefault();
  var username = $(this).find("[name=username]").val();
  var password = $(this).find("[name=password]").val();
  //authenticate to server
  $.ajax({
    url: data.server + "back-end/index.php/user/authenticate",
    method : "post",
    data : {
      username : username,
      password: password,
      ispost : true
    },
    dataType: "json",
    success : function(resp){
      //correct credentials
      if(resp.results == "success"){
        //set chrome storage
        chrome.storage.sync.set({
          username: username,
          password: password
        }, function(){
          data.username = username;
          data.password = password;
          feedback("Logged in as '" + username + "'!");
          updateFields();
        });
      } else {
        feedback("Incorrect username/password");
      }
    },
    error: function(){
      feedback("Could not reach server at '" + data.server + "'");
    }
  })
  //if it works, update sync storage
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
    feedback("Server url set to '" + serverUrl +  "'");
    updateFields();
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
