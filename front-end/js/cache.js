/*
Represents local user cache
*/
var CACHE = (function(){
  var that = {}
    //maps category id (including 'all') to list of bookmark id's
    , category_ordering = {}
    //maps bookmark id to bookmark object
    , bookmark_map = {}
    //maps category id to name
    , category_names = {}
    ;

  category_names[C.ALL] = "All";
  category_names[C.QUEUE] = "Queue";
  category_names[C.GENERAL] = "General";

  category_ordering[C.ALL] = [];
  category_ordering[C.QUEUE] = [];
  category_ordering[C.GENERAL] = [];

  /*
  If to_cat omitted, this just removes it from from_cat
  */
  function moveFromCategory(bookmark_id, from_cat, to_cat){
    bookmark_id = parseInt(bookmark_id);
    var index = category_ordering[from_cat + ""].indexOf(bookmark_id);
    if(index == -1){
      throw "Invalid cache, bookmark " + bookmark_id + " missing";
    }
    category_ordering[from_cat + ""].splice(index, 1);
    if(to_cat !== undefined){
      category_ordering[to_cat + ""].unshift(bookmark_id);
    }
  }

  that.addBookmark = function(bookmark){
    category_ordering[C.ALL].unshift(bookmark.id);
    category_ordering[bookmark.category].unshift(bookmark.id);
    bookmark_map[bookmark.id] = bookmark;
  }

  that.updateBookmark = function(bookmark_id, url, title, notes){
    var bm = that.getBookmark(bookmark_id);
    bm.url = url;
    bm.title = title;
    bm.notes = notes;
  }

  that.deleteBookmark = function(bookmark_id){
    bookmark_id = parseInt(bookmark_id);
    var bm = that.getBookmark(bookmark_id);
    moveFromCategory(bookmark_id, C.ALL);
    moveFromCategory(bookmark_id, bm.category);
  }

  that.deleteBookmarks = function(bookmark_id_list){
    for(var i = 0; i < bookmark_id_list.length; i++){
      var bm_id = bookmark_id_list[i];
      that.deleteBookmark(bm_id);
    }
  }

  that.getBookmark = function(bookmark_id){
    bookmark_id = parseInt(bookmark_id);
    if(!bookmark_map.hasOwnProperty(bookmark_id)){
      throw "Invalid cache, bookmark " + bookmark_id + " not among bookmark_map";
    }
    return bookmark_map[bookmark_id];
  }

  that.archiveBookmarks = function(bookmark_id_list, from_cat, to_cat){
    if(from_cat == to_cat){
			return;
		}
		for(var i = 0; i < bookmark_id_list.length; i++){
			var bm = that.getBookmark(bookmark_id_list[i]);
      moveFromCategory(bm.id, bm.category, to_cat);
      bm.category = to_cat;
		}
  }

  that.addCategory = function(category_id, category_name){
    category_names[category_id] = category_name;
    category_ordering[category_id] = [];
    console.log("adding category to cache");
  }

  that.renameCategory = function(category_id, category_name){
    category_names[category_id] = category_name;
  }

  that.getCatName = function(category_id){
    if(category_names.hasOwnProperty(category_id)){
      return category_names[category_id];
    }
    console.log(category_names);
    throw "request for invalid catgory id " + category_id;
  }

  that.getList = function(category_id){
    var list = category_ordering[category_id];
    var bookmark_list = [];
    for(var i = 0; i < list.length; i++){
        bookmark_list.push(bookmark_map[list[i]]);
    }
    return bookmark_list;
  }
  that.initCategories = function(allCategories){
    for(var i = 0; i < allCategories.length; i++){
      var cat = allCategories[i];
      category_names[cat.id] = cat.name;
      if(!category_ordering.hasOwnProperty(cat.id)){
        category_ordering[cat.id] = [];
      }
    }
  }
  that.initBookmarks = function(allBookmarks){
    for(var i = 0; i < allBookmarks.length; i++){
      var bm = allBookmarks[i];
      if(!category_ordering.hasOwnProperty(bm.category)){
        category_ordering[bm.category] = [];
      }
      category_ordering[C.ALL].push(bm.id);
      category_ordering[bm.category].push(bm.id);
      bookmark_map[bm.id] = bm;
    }
  }
  return that;
}());
