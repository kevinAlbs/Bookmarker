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
	#bm_list li h1, #bm_list li h2{
		font-size: 12px;
		display: inline-block;
	}
	#bm_list li h2{
		font-size: 10px;
		font-weight: bold;
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