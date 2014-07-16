<?php
$API_URL = "http://localhost/bookmarks/back-end/index.php/";
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Settings - Bookmarks</title>
  <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
  <link href='styles.css' rel='stylesheet' type='text/css'>
  <meta name="description" content="Bookmarker front-end">
  <meta name="author" content="Kevin Albertson">

  <style>
  #container{
  	padding-left: 20px;
  	padding-top: 20px;
  }
  #import_input{
  	width: 500px;
  	min-height: 8em;
  }
  </style>

  <!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>
<body>
	<div id="container">
		<h2>Import Bookmarks</h2>
		<p>Netscape Bookmark format</p>
		<textarea id="import_input"></textarea><br/>
		<button id="import_button">Import</button>
		
	</div>
	
	
	<script src="jquery.js"></script>
	<!-- custom build -->
	<script src="jquery-ui.js"></script>
	<script>
		var root = "http://localhost/bookmarks/back-end/index.php/";

		function addBookmark(bm, callback){
			$.ajax({
				url: root + "bookmark/save",
				data: {
					url: bm.url,
					title: bm.title,
					ispost: true
				},
				method: "post",
				success: function(){
					callback();
				}
			})
		}
		function importBookmarks() {
			var parsed = $($("#import_input").val());
			if (!parsed) {
				return;
			}
			var bms = parsed.find("a");
			var bm_arr = [];
			for(var i = 0; i < bms.size(); i++){
				var bm = $(bms.get(i));
				bm_arr.push({
					url : bm.attr("href"),
					title : bm.html()
				});
			}

			var index = -1;
			function onAdd(){
				index++;
				if (index >= bm_arr.length){
					return;
				}
				addBookmark(bm_arr[index], onAdd);
			}
			onAdd();
			
		}
		$("#import_button").click(importBookmarks);
	</script>
</body>
</html>