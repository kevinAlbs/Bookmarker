MODAL.save_bookmark = (function(){
  var that = {};
  var dom = {
    root: $(".modal#save_bookmark"),
    url: $(".modal#save_bookmark input[name=url]"),
    title: $(".modal#save_bookmark input[name=title]"),
    title_update : $(".modal#save_bookmark #title_update")
  };
  var url_fetcher; //ajax object
  var override_autofill = false;

  /*
  cancels title autofill if it is in progress
  */
  function abortAutofill(){
    if(url_fetcher){
      url_fetcher.abort();
      url_fetcher = null;
    }
  }
  
  function autofillTitle(){
    if(override_autofill){
      return;
    }
    var val = dom.url.val();
    //check if valid url
    if(val.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i)){
      abortAutofill();
      url_fetcher = $.ajax({
        url : API_ROOT + "util/fetchTitle?url=" + val,
        dataType : "json",
        success: function(json){
          if(override_autofill){
            return;
          }
          if(json.valid){
            dom.title.val(json.title);
          }
          url_fetcher = null;
        }
      });
    }
  }

  function cancelAutofillTitle(){
    abortAutofill();
    override_autofill = true;
  }

  function submit(e){
    e.preventDefault();
    var in_url = $(this).find("[name=url]");
    var in_title = $(this).find("[name=title]")
    var in_notes = $(this).find("[name=notes]")

    var url = in_url.val();
    var title = in_title.val();
    var notes = in_notes.val();

    var cat = (curCat == C.ALL) ? C.QUEUE : curCat; //cannot add to All
    model.saveBookmark(url, title, notes, cat, function(resp){
      if("results" in resp && resp.results == "error"){
        alert("Error adding bookmark: " + resp.message);
      } else {
        //refresh list
        refreshCategory();

        //clear inputs
        in_url.val("");
        in_title.val("");
        in_notes.val("");

        that.hide();

      }
    });
  }

  function onKeyUp(e){
    if(e.keyCode == 27){ //esc
      that.hide();
    }
  }

  that.show = function(edit_id){
    dom.url.val("");
    dom.title.val("");
    override_autofill = false;
    dom.root.fadeIn();
    $(document).on("keyup", onKeyUp);
    setCurrentModal(that);
  }

  that.hide = function(){
    abortAutofill();
    $(document).off("keyup", onKeyUp);
    dom.root.fadeOut();
    unsetCurrentModal(that);
  }

  dom.root.find("form").on("submit", submit);
  dom.url.on("keyup", autofillTitle);
  dom.title.on("keydown", cancelAutofillTitle);
  dom.root.find(".close").on("click", that.hide);
  dom.title_update.on("click", function(e){
    e.preventDefault();
    override_autofill = false;
    autofillTitle();
  });
  return that;
}());
