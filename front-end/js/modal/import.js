/*
Modal for both saving new bookmarks and editing existing ones
*/
MODAL.import = (function(){
  var that = {};
  var dom = {
    root: $(".modal#import"),
    data: $(".modal#import textarea[name=bookmark_data]"),
    left_half: $(".modal#import .left-half"),
    right_half: $(".modal#import .right-half"),
    preview_list : $(".modal#import .preview .list")
  };

  function submit(e){
    e.preventDefault();
    var raw = dom.data.val();
    var data = parse(raw);
    if(data === false){
      //TODO: show error
      console.log("Cannot parse");
      return;
    }
    updatePreview(data);
    model.importBookmarks(data, function(){
      switchCategory(C.QUEUE);
      refreshCategory();
      that.hide();
    });
  }

  function onKeyUp(e){
    if(e.keyCode == 27){ //esc
      that.hide();
    }
  }

  function onParseButton(e){
    e.preventDefault();
    var raw = dom.data.val();
    var data = parse(raw);
    if(data === false){
      //TODO: show error
      console.log("Cannot parse");
      return;
    }
    updatePreview(data);
    reveal();
  }

  function updatePreview(data){
    dom.preview_list.empty();
    var num_to_show = Math.min(data.length, 5);
    for(var i = 0; i < num_to_show; i++){
      var url = data[i].url;
      var title = data[i].title;
      var item = $("<a>").attr("href", url).html(title);
      dom.preview_list.append(item);
    }
    if(data.length == 0){
      dom.preview_list.append("<p>No bookmarks found</p>");
    }
    if(num_to_show < data.length){
      dom.preview_list.append("<p>[" + (data.length - num_to_show) + " more bookmarks]");
    }
  }

  function reveal(){
    //shows right half
    dom.right_half.show().animate({
      "width" : "48%",
      "padding-left" : "2%"
    });
    dom.left_half.animate({
      "width" : "50%"
    });
  }

  function parse(raw){
    var html, out = [];
    try{
      html = $(raw);
    } catch(e){
      return false;
    }
    //find all anchors
    var as = html.find("a");
    for(var i = 0; i < as.size(); i++){
      var anch = $(as.get(i))
      var title = anch.html();
      var url = anch.attr("href");
      out.push({
        "title" : title,
        "url" : url
      });
    }
    return out;
  }

  that.show = function(){
    dom.root.fadeIn();
    $(document).on("keyup", onKeyUp);
    setCurrentModal(that);
  }

  that.hide = function(){
    $(document).off("keyup", onKeyUp);
    dom.root.fadeOut();
    unsetCurrentModal(that);
  }

  dom.root.find(".parse").on("click", onParseButton);
  dom.root.find("input[type=submit]").on("click", submit);
  dom.root.find(".close").on("click", that.hide);
  return that;
}());
