<?php
$API_URL = "http://localhost/bookmarks/back-end/index.php/";
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Bookmarks</title>
  <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
  <link href='styles.css' rel='stylesheet' type='text/css'>
  <meta name="description" content="Bookmarker front-end">
  <meta name="author" content="Kevin Albertson">

  <style>
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
			<p class='button fixed' data-action='add_cat'>+ add new</p>
			<div class="menu">
				<p data-action="select" class="unselection button">Select All</p>
				<p data-action="unselect" class="selection button">Unselect All</p>
				<p data-action="delete" class="selection button">Delete Selected</p>
				<p id="status_wrapper"><span id="status">Loading</span><span class="dots">...</span></p>
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
			<h2 data-content="catName"></h2> <h1 data-content="title">Google</h1>
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
	<script src="main.js"></script>
	<script src="model.js"></script>
	<script>
		//fetch all bookmarks
		model.init(<?php echo file_get_contents($API_URL . "bookmark/fetch"); ?>);
	</script>
</body>
</html>