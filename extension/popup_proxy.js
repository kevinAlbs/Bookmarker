/*
Proxy for popup to interface API
*/
var POPUP_PROXY = (function(){
  var that = {};

  that.getInfo = function(callback){
    chrome.storage.sync.get({
      server: "",
      username: "",
      password: ""
    }, callback);
  };

  that.setInfo = function(info, callback){
    chrome.storage.sync.set(info, callback);
  }

  /*
  callback is a function which accepts an object
  {
    can_connect : true|false
    auth_required : true|false
  }
  */
  that.testConnection = function(callback){
    that.getInfo(function(info){
      var api_root = info.server + "back-end/index.php"
      $.ajax({
        url: api_root + "/user/isEnabled",
        dataType: "json",
        success: function(response){
          callback({
            can_connect : true,
            auth_required : response
          });
        },
        error : function(){
          callback({
            can_connect : false,
            auth_required : false
          });
        }
      })
    })
  };

  /*
  Attempts to verify credentials stored in sync storage
  */
  that.verifyAuth = function(callback){
    //get credentials and server root
    that.getInfo(function(info){
      //try to save
      var api_root = info.server + "back-end/index.php/";
      var params = {
        ispost : true,
        username : info.username,
        password : info.password
      };
      $.ajax({
        url: api_root + "user/authenticate",
        method: "post",
        data: params,
        success: function(resp){
          resp["server_connection"] = true;
          if(callback){
            callback(resp);
          }
        },
        error: function(resp){
          if(callback){
            callback({
              "results" : "error",
              "message" : "Cannot connect to server " + api_root,
              "server_connection" : false
            });
          }
        }
      });
    });
  };

  that.saveBookmark = function(url, title, callback){
    //get credentials and server root
    that.getInfo(function(info){
      //try to save
      var api_root = info.server + "back-end/index.php/";
      var params = {
        ispost: true,
        url: url,
        title: title,
        auth_username : info.username,
        auth_password : info.password
      };
      $.ajax({
        url: api_root + "bookmark/save",
        method: "post",
        data: params,
        success: function(resp){
          if(callback){
            callback(resp);
          }
        }
      });
    });
  }

  that.checkSaved = function(url, callback){
    that.getInfo(function(info){
      //try to save
      var api_root = info.server + "back-end/index.php/";
      var params = {
        ispost: true,
        url: url,
        auth_username : info.username,
        auth_password : info.password
      };
      $.ajax({
        url: api_root + "bookmark/fetchByUrl",
        method: "post",
        data: params,
        success: function(resp){
          if(callback){
            callback(resp);
          }
        }
      });
    });
  }

  return that;
}());
