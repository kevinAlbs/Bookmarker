MODAL.save_bookmark = (function(){
  var that = {};
  var dom = $(".modal#save_bookmark");

  function updateTitle(){
    var val = $(this).val();
    //check if valid url
    if(val.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i)){
      /*
      TODO: fetch page and get title
      */
    }
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

  that.show = function(){
    dom.fadeIn();
    $(document).on("keyup", onKeyUp);
    //TODO listen for changes in URL and update title field by sending ajax request
    setCurrentModal(that);
  }

  that.hide = function(){
    $(document).off("keyup", onKeyUp);
    dom.fadeOut();
    unsetCurrentModal(that);
  }

  dom.find("form").on("submit", submit);
  dom.find("form [name=url]").on("keyup", updateTitle);
  dom.find(".close").on("click", that.hide);
  return that;
}());
