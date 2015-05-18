/*
Modal for both saving new bookmarks and editing existing ones
*/
MODAL.save_bookmark = (function(){
  var that = {};
  var dom = {
    root: $(".modal#save_bookmark"),
    url: $(".modal#save_bookmark input[name=url]"),
    title: $(".modal#save_bookmark input[name=title]"),
    notes: $(".modal#save_bookmark input[name=notes]"),
    title_update : $(".modal#save_bookmark #title_update")
  };
  var url_fetcher; //ajax object
  var override_autofill = false;
  var current_id = -1; //if this is editing, set to something other than -1

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
    if(current_id != -1){
      model.updateBookmark(current_id, url, title, notes, function(resp){
        if("results" in resp && resp.results == "error"){
          alert("Error adding bookmark: " + resp.message);
        } else {
          //refresh list
          refreshCategory();
          that.hide();
        }
      });
    } else {
      //saving new
      var cat = (curCat == C.ALL) ? C.QUEUE : curCat; //cannot add to All
      model.saveBookmark(url, title, notes, cat, function(resp){
        if("results" in resp && resp.results == "error"){
          alert("Error adding bookmark: " + resp.message);
        } else {
          //refresh list
          refreshCategory();
          that.hide();
        }
      });
    }

  }

  function onKeyUp(e){
    if(e.keyCode == 27){ //esc
      that.hide();
    }
  }

  that.show = function(edit_id){
    if(edit_id !== undefined){
      current_id = edit_id;
      override_autofill = true;
      var bm = model.getBookmark(edit_id, false);
      dom.url.val(bm.url);
      dom.title.val(bm.title);
      dom.notes.val(bm.notes);
    } else {
      //new bookmark
      current_id = -1;
      dom.url.val("");
      dom.title.val("");
      dom.notes.val("");
      override_autofill = false;
    }
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
