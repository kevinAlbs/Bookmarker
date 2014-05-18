<?php
$API_URL = "http://localhost/bookmarks/back-end/index.php/";
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Bookmarks</title>
  <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
  <meta name="description" content="">
  <meta name="author" content="Kevin Albertson">

  <style>

	*{
		margin: 0px;
		padding: 0px;
		font-family: "Open Sans", "Arial";
		font-size: 10px;
		font-weight: normal;
	}
	b{
		font-weight: bold;
	}
	h1{
		font-size: 16px;
		margin-bottom: 3px;
	}
	div.content{
		width: 600px;
		padding-right: 25px;
		padding-top: 25px;
		padding-bottom: 25px;
		margin-left: 220px;
	}
	.button{
		cursor: pointer;
	}
	.button:hover{
		text-decoration: underline;
	}
	#bm_list{
		list-style-type: none;
	}
	#bm_list li{
		position: relative;
		border-top: 1px black solid;
		padding-left: 44px;
		padding-top: 6px;
		padding-bottom: 6px;
		background: #FFF;
		cursor: pointer;
	}

	#bm_list li.ui-sortable-helper{
		border-bottom: 1px black solid;
	}
	
	#bm_list li:last-child{
		border-bottom: 1px black solid;
	}
	#bm_list li h1{
		font-size: 12px;
	}
	#bm_list li .right{
		position: absolute;
		right: 12px;
		top: 6px;
		text-align: right;
	}
	#bm_list .right p{
		color: #e34e4e;
	}
	#bm_list .right time{
		color: #2663ff;
	}
	#bm_list header p{
		color: #808080;
	}
	#bm_list .left{
		position: absolute;
		top: 6px;
		left: 6px;
	}
	#bm_list .left .box{
		background: #FFF;
		border: 1px black solid;
		width: 15px;
		height: 15px;
		display: inline-block;
		position: absolute;
		top: 7px;
		left: 10px;
		cursor: pointer;
	}
	.box.active .fill{
		width: 15px;
		height: 15px;
		top: 0px;
		left: 0px;
		display: block;
	}
	.box:hover .fill{
		display: block;
	}
	.box .fill{
		position: absolute;
		left: 2px;
		top: 2px;
		width: 11px;
		height: 11px;
		background: #2663ff;
		display: none;
	}
	#bm_list .handle{display: none;}
	#bm_list li:hover .handle{
		display: block;
	}
	#sidebar{
		width: 175px;
		position: fixed;
		top: 60px;
		left: 20px;
	}
	#search{
		border: 1px black solid;
		background: #eeeeee;
		padding: 4px 8px;
		margin-bottom: 10px;
	}
	#search:focus{
		background: #fbfbfb;
	}
	#cats{
		list-style-type: none;
	}
	#cats.selection li{
		font-weight: bold;
	}
	#cats li{
		padding: 5px 0px;
		display: block;
		cursor: pointer;
	}
	#cats li:hover{
		text-decoration: underline;
	}
	#cats li.fixed{
		color: #971099;
	}
	#cats li.active{
		color: #e34e4e;
	}
	#loader{
		display: none;
		margin: 10px 0px;
	}
	#sidebar .menu{
		border-top: 1px black solid;
		padding-top: 10px;
		margin-top: 20px;
	}
	.selection.button{
		display: none;
	}
	#none{display: none;}
  </style>

  <!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>
<body>
	<div id="container">
		<aside id="sidebar">
			<input type="text" id="search" value="search"/>
			<ul id="cats">
				<li data-id="-2" class='fixed'>All</li>
				<li data-id="-1" class="fixed">Queue</li>
				<li data-id="0" class="fixed">General</li>
			</ul>
			<div class="menu">
				<p data-action="select" class="unselection button">Select All</p>
				<p data-action="unselect" class="selection button">Unselect All</p>
				<p data-action="delete" class="selection button">Delete Selected</p>
				<p id="loader">Loading<span class="dots">...</span></p>
			</div>
		</aside>
		<div class="content">
			<h1 id="category">Queue</h1>
			<p id="none">No bookmarks found in category</p>
			<ul id="bm_list">
			</ul>
		</div>
	</div>
	
	<script type="text/html" id="category-template">
	<li data-content="catname" data-template-bind='[{"attribute": "data-id", "value" : "catid"}]'>
	</li>
	</script>

	<script type="text/html" id="bookmark-template">
	<li data-template-bind='[{"attribute": "data-id", "value" : "id"}]'>
		<div class='left'>
			<img class='handle' src='handle.jpg' alt='Handle'/>
			<div class='box'><div class="fill"></div></div>
		</div>
		<header>
			<h1 data-content="title">Google</h1>
			<p data-content="url">http://google.com</p>
		</header>
		<div class='right'>
			<p data-content="notes"></p>
			<time data-content="time"></time>
		</div>
	</li>
	</script>
	<script src="jquery.js"></script>
	<!-- custom build -->
	<script src="jquery-ui.js"></script>
	<script src="template.js"></script>
	<script>

		var ajaxRequests = 0;//semaphore type
		var root = "http://localhost/bookmarks/back-end/index.php/";
		var listStart = -1, oldPrev = -1;//list reordering variables
		var curCat = -1;//queue
		var catCache = {};
		/*
			Keep a local list of only everything on hand which can be updated on (delete, update, and addition)
			This can be used for search.
			http://lunrjs.com/
		*/
		/* Gets timezone without daylight savings */
		Date.prototype.stdTimezoneOffset = function() {
		    var jan = new Date(this.getFullYear(), 0, 1);
		    var jul = new Date(this.getFullYear(), 6, 1);
		    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
		}
		function prettyDate(dateStr){
			function pluralize(time, type){
				if(time != 1){
					return time + " " + type + "s" + " ago";
				}
				else{
					return time + " " + type + " ago";
				}
			}
			var pretty = "just now";
			var date = new Date(dateStr);
			var now = new Date();
			var hourOff = now.stdTimezoneOffset()/60;
			//hourOff is positive if the UTC offset is negative...ok...
			now.setHours(now.getHours() - hourOff + 5);

			var diff = now.getTime() - date.getTime();

			if(diff < 1000){
				pretty = "just now";
			}
			else if(diff < 60 * 1000){
				pretty = pluralize(Math.round(diff/1000), "second");
			}
			else if(diff < 60 * 60 * 1000){
				pretty = pluralize(Math.round(diff/(60 * 1000)), "minute");
			}
			else if(diff < 24 * 60 * 60 * 1000){
				pretty = pluralize(Math.round(diff/(60 * 60 * 1000)), "hour");
			}
			else if(diff < 30 * 24 * 60 * 60 * 1000){
				pretty = pluralize(Math.round(diff/(24 * 60 * 60 * 1000)), "day");
			}
			else if(diff < 12 * 30 * 24 * 60 * 60 * 1000){
				pretty = pluralize(Math.round(diff/(30 * 24 * 60 * 60 * 1000)), "month");
			}
			else{
				pretty = "over a year ago";
			}
			return pretty;
		}
		function showCategories(json){
			var cats = json.results;
			var cat_list = $("#cats");
			cat_list.find("li").not(".fixed").detach();//remove non-fixed categories
			for(var i = 0; i < cats.length; i++){
				catCache[cats[i].id] = cats[i].name;
				cat_list.loadTemplate($("#category-template"),{
					catname: cats[i].name,
					catid: cats[i].id
				}, {append: true})
			}
		}
		function showList(json){
			var bms = json.results;
			var bm_list = $("#bm_list").empty();
			if(bms.length == 0){
				$("#none").show();
			}
			else{
				$("#none").hide();
			}
			for(var i = 0; i < bms.length; i++){
				var title = bms[i].title;
				if(curCat == -2){
					var c = "Queue";
					if(bms[i].category == -1){c = "Queue";}
					else if(bms[i].category == 0 || !(bms[i].category in catCache)){c = "General";}
					else{c = catCache[bms[i].category];}
					//all, show category
					title = "[<b>" + c + "</b>] " + bms[i].title;
				}
				
				bm_list.loadTemplate($("#bookmark-template"), {
					title: title,
					url: bms[i].url,
					time: prettyDate(bms[i].date_added),
					notes: bms[i].notes,
					id: bms[i].id
				}, {append: true});
			}
		}
		function fetchList(catId, catName){
			//ajax call, update cache
			$("#category").html(catName);
			addAjax({
				url: root + "bookmark/fetch",
				method: 'post',
				data:{
					category: catId,
					ispost: true
				},
				dataType: "json",
				success: function(data){
					console.log(data);
					showList(data);
				}
			});
			curCat = catId;
		}
		
		function deleteCategory(e){}
		
		/* called when a list item checkbox is toggled */
		function refreshSelected(){
			if($("li .box.active").size() == 0){
				//remove the delete selected and categorization clickable classes
				$(".selection.button").hide();
				$(".unselection.button").show();
				$("#cats").removeClass("selection");
			}
			else{
				$("#cats").addClass("selection");
				$(".selection.button").show();
				$(".unselection.button").hide();
			}
		}
		function toggleBox(e){
			$(this).toggleClass("active");
			refreshSelected();
		}
		function addAjax(param){
			param.complete = ajaxComplete;
			$.ajax(param);
			ajaxRequests++;
			$("#loader").show();
		}
		function ajaxComplete(){
			ajaxRequests--;
			if(ajaxRequests == 0){
				$("#loader").hide();
			}
		}
		function onButton(){
			var selected = $("#bm_list li:has(.box.active)");
			var selectedString = "";
			var first = true;
			for(var i = 0; i < selected.size(); i++){
				if(!first) selectedString += "|";
				else first = false;
				selectedString += $(selected.get(i)).attr("data-id");
			}
			switch($(this).attr("data-action")){
				case "delete":
					selected.detach();
					refreshSelected();
					addAjax({
						url: root + "bookmark/deleteMultiple",
						method: "post",
						data: {
							idList: selectedString,
							ispost: true 
						}
					})
				break;
				case "select":
					$("#bm_list li .box").addClass("active");
					refreshSelected();
				break;
				case "unselect":
					$("#bm_list li .box").removeClass("active");
					refreshSelected();
				break;
			}
		}

		function catClicked(){
			var selected = $("#bm_list li:has(.box.active)");
			var catId = $(this).attr("data-id");
			var catName = $(this).html();
			if(curCat == catId){return;}

			if(selected.size() == 0){
				//switch to new category
				fetchList(catId, catName);
			}
			else{
				//archive to that category
				console.log("archiving");	
				if(catId == -2){
					alert("Cannot categorize to 'all'")
				}
				var selectedString = "";
				var first = true;
				for(var i = 0; i < selected.size(); i++){
					if(!first) selectedString += "|";
					else first = false;
					selectedString += $(selected.get(i)).attr("data-id");
				}
				if(curCat != -2){
					selected.detach();//should not remove if viewing everything anyway
				}
				$(".box.active").removeClass("active");
				refreshSelected();
				addAjax({
					url: root + "bookmark/archiveMultiple",
					method: "post",
					data: {
						idList: selectedString,
						category: catId,
						ispost: true 
					}
				})
			}
			
		}

		$(".button").click(onButton);
  		//set up events
  		$("#bm_list").sortable({
  			distance: 12,
  			start: function(e,ui){
  				listStart = $("#bm_list li").index(ui.item);
  				oldNext = $("#bm_list li:nth-child(" + (listStart+1) + ")");
  				if(oldNext) oldNext = oldNext.attr("data-id");
  				else oldNext = -1;
  			},
  			stop: function(e,ui){
  				var listEnd = $("#bm_list li").index(ui.item);
  				var newNext = $("#bm_list li:nth-child(" + (listEnd+1) + ")");
  				if(newNext) newNext = newNext.attr("data-id");
  				else newNext = -1;
  				var newPrev = $("#bm_list li:nth-child(" + (listEnd-1) + ")");
  				if(newPrev) newPrev = newNext.attr("data-id");
  				else newPrev = -1;
  				//check if it has changed
  				if(listEnd != listStart){
  					/*
  					addAjax({
  						url: root + "bookmark/listOrder",
  						method: "post",
  						data: {
  							ispost: true,
  							id: $(ui.item).attr("data-id"),
  							oldPrev : oldPrev,
  							newNext : newNext,
  							newPrev : newPrev
  						}
  					})
					*/
  				}
  			}
  		});
		//event delegation
		$("#bm_list").on("click", "li .box", toggleBox);
		$("#cats").on("click", "li", catClicked);
		//initialize with queue list
  		showList(<?php echo file_get_contents($API_URL . "bookmark/fetch?category=-1"); ?>);
  		//initialize category list
  		addAjax({
  			url: root + "bookmark/fetchCategories",
  			dataType: "json",
  			success: function(data){
  				showCategories(data);
  			}
  		});
  	</script>
</body>
</html>