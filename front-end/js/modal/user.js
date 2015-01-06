MODAL.user = (function(){
  var that = {};
  var feedback_timer;
  var dom = $(".modal#user");
  function feedback(msg){
    if(feedback_timer != null){
      window.clearTimeout(feedback_timer);
    }
    var el = $("#user .feedback");
    feedback_timer = window.setTimeout(function(){
      el.fadeOut();
    }, 10000);
    el.html(msg).show();
  }

  that.hide = function(){
    dom.fadeOut();
    unsetCurrentModal(that);
  }

  that.show = function(){
    dom.show();
    setCurrentModal(that);
    /*
    do not allow user to get past login window
    until they log in or register successfully
    */
    $("#user .register form").on("submit", function(e){
      e.preventDefault();
      var u = $(this).find("[name=username]").val();
      var p = $(this).find("[name=password]").val();
      var r = $(this).find("[name=remember]").prop("checked");
      var c = "";
      var cEl =  $(this).find("[name=g-recaptcha-response]");
      if(cEl.size() == 1){
        c = cEl.val();
      }
      model.tryRegister(u, p, c, function(data){
        if(data.results == "success"){
          feedback("Welcome " + u + "!");
          passLogin();
          that.hide();
          if(r){
            remember(u,p);
          }
        } else{
          feedback("Could not register, try another name");
          grecaptcha.reset();
        }
      });
    });

    $("#user .login form").on("submit", function(e){
      e.preventDefault();
      var u = $(this).find("[name=username]").val();
      var p = $(this).find("[name=password]").val();
      var r = $(this).find("[name=remember]").prop("checked");
      model.tryLogin(u, p, function(data){
        if(data.results == "success"){
          feedback("Welcome " + u + "!");
          passLogin();
          that.hide();
          if(r){
            remember(u,p);
          }
        } else{
          feedback("Could not login");
        }
      });
    });
  }

  return that;
}());
