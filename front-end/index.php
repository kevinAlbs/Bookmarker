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
			<h1>Queue</h1>
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
				cat_list.loadTemplate($("#category-template"),{
					catname: cats[i].name,
					catid: cats[i].id
				}, {append: true})
			}
		}
		function showList(json){
			var bms = json.results;
			var bm_list = $("#bm_list").empty();
			for(var i = 0; i < bms.length; i++){
				bm_list.loadTemplate($("#bookmark-template"), {
					title: bms[i].title,
					url: bms[i].url,
					time: prettyDate(bms[i].date_added),
					notes: bms[i].notes,
					id: bms[i].id
				}, {append: true});
			}
		}
		function fetchList(cat){
			//ajax call, update cache
		}
		function deleteCategory(e){}
		function deleteBookmarks(e){}
		function onListReorder(e){}
		/* called when a list item checkbox is toggled */
		function refreshSelected(){
			if($("li .box.active").size() == 0){
				//remove the delete selected and categorization clickable classes
				$(".selection.button").hide();
				$(".unselection.button").show();
			}
			else{
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
					addAjax({
						url: root + "bookmark/deleteMultiple",
						method: "post",
						data: {
							idList: selectedString,
							ispost: true 
						}
					})
				break;
			}
		}

		$(".button").click(onButton);
  		//set up events
  		$("#bm_list").sortable({
  			distance: 12
  		});
		//event delegation
		$("#bm_list").on("click", "li .box", toggleBox);

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