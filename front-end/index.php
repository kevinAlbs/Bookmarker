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
	div.content{
		width: 600px;
		padding: 25px;
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
	#bm_list .left .box:hover .fill{
		display: block;
	}
	#bm_list .left .box .fill{
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

  </style>

  <!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>
<body>
	<div class="content">
		<ul id="bm_list">
			<li>
				<div class='left'>
					<img class='handle' src='handle.jpg' alt='Handle'/>
					<div class='box'><div class="fill"></div></div>
				</div>
				<header>
					<h1>Google</h1>
					<p>http://google.com</p>
				</header>
				<div class='right'>
					<p>This was a great page</p>
					<time>saved 10 minutes ago</time>
				</div>
			</li>
			<li>
				<div class='left'>
					<img class='handle' src='handle.jpg' alt='Handle'/>
					<div class='box'><div class="fill"></div></div>
				</div>
				<header>
					<h1>Google</h1>
					<p>http://google.com</p>
				</header>
				<div class='right'>
					<p>This was a great page</p>
					<time>saved 10 minutes ago</time>
				</div>
			</li>
			<li>
				<div class='left'>
					<img class='handle' src='handle.jpg' alt='Handle'/>
					<div class='box'><div class="fill"></div></div>
				</div>
				<header>
					<h1>Google</h1>
					<p>http://google.com</p>
				</header>
				<div class='right'>
					<p>This was a great page</p>
					<time>saved 10 minutes ago</time>
				</div>
			</li>
		</ul>
	</div>
	<script>
		/*
			Keep a local list of only everything on hand which can be updated on (delete, update, and addition)
			This can be used for search.
			http://lunrjs.com/
		*/
		function showList(json, cat){
			console.log(json);
		}
		function fetchList(cat){

		}
		//initialize with queue list
  		showList(<?php echo file_get_contents($API_URL . "bookmark/fetch?category=-1"); ?>);
  	</script>
</body>
</html>