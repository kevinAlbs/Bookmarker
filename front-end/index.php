<?php
require_once("../config.php");
define("API_ROOT", ROOT . "back-end/index.php/");
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Bookmarks</title>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
  <link href='styles.css' rel='stylesheet' type='text/css'>
  <link rel="icon" type="image/png" href="favicon.png" />
  <meta name="description" content="Bookmarker front-end">
  <meta name="author" content="Kevin Albertson">

  <style>
  #bar_loader{
    position: fixed;
    top: 0px;
    height: 4px;
    background: #000;
    width: 100%;
    z-index: 10;
  }
  #bar_loader .fill{
    width: 10%;
    height: 100%;
    margin: 0px auto;
    background: rgb(98,98,98);
  }
  </style>

  <script src='https://www.google.com/recaptcha/api.js'></script>
  <!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>
<body>
  <?php require_once("modal.php"); ?>
  <div id="bar_loader">
    <div class="fill"></div>
  </div>
	<div id="container">
		<aside id="sidebar">
			<!--<input type="text" id="search" value="search"/>-->
      <div class="sidebar-top">
        <div class="userarea">
          <span id="welcome"></span>
          <span class='button' data-action='logout'>Logout</span>
        </div>
        <span class='button' data-action='import'>Import Bookmarks</span>
      </div>
      
			<ul id="cats">
				<li data-id="-2" class='fixed all'>All</li>
				<li data-id="-1" class="fixed">Queue <span class="add">(+)</span></li>
				<li data-id="0" class="fixed">General <span class="add">(+)</span></li>
			</ul>
			<p class='button fixed' data-action='add_cat'>+ add new</p>
			<div class="menu">
				<p data-action="select" class="unselection button">Select All</p>
				<p data-action="unselect" class="selection button">Unselect All</p>
				<p data-action="delete" class="selection button">Delete Selected <span class="shortcut" title="Keyboard shortcut to delete selected bookmarks is 'd'">[d]</span></p>
				<p id="status_wrapper"><span id="status">Loading</span><span class="dots">...</span></p>
			</div>
		</aside>
		<div class="content">
			<div id="topbar">
        <!--<a class='button' href='settings.php'>Settings</a>-->
        <span class='button' data-action='save_bookmark'>Save Bookmark <span class="shortcut" title="Keyboard shortcut to save bookmark is 's'">[s]</span></span>
        <span class='button' data-action='delete_cat'>Delete Category</span>
        <span class='button' data-action='rename_cat'>Rename Category</span>
      </div>
			<h1 id="category">Queue</h1>
			<p id="none">You can save bookmarks to the <b>Queue</b> by pressing <span class='shortcut'>[s]</span> or grab the <a target="_blank" href="https://chrome.google.com/webstore/detail/simple-bookmarker/epecificbpajmadjnlglfhdhccdeceha?utm_source=chrome-app-launcher-info-dialog">Chrome extension</a> to save pages while browsing.</p>
			<ul id="bm_list">
			</ul>
		</div>
	</div>

	<script type="text/html" id="category_template">
	<li data-id="<%= catid %>">
    <%=catname%> <span class="add">(+)</span>
	</li>
	</script>

	<script type="text/html" id="bookmark_template">
	<li data-id="<%= id %>">
		<div class="left">
			<img class="handle" src="handle.jpg" alt="Handle"/>
			<div class="box"><div class="fill"></div></div>
		</div>
    <header>
			<h2><%= catName %></h2><h1><a href="<%= url %>" target="_blank"><%= title %></a></h1>
			<p><%= url %></p>
		</header>
    <div>
      <p class="note"><%= notes %></p>
      <time><%= time %></time>
    </div>
    <div class="controls">
      <a href="#" class="edit-link">Edit</a>
      <a href="#" class="delete-link">Delete</a>
    </div>
    <div class="more-box">
    </div>
	</li>
	</script>
	<script src="js/lib/jquery.js"></script>
	<!-- custom build -->
	<script src="js/lib/jquery-ui.js"></script>
  <script src="js/lib/micro-template.js"></script>
	<script src="js/time.js"></script>
  <script src="js/main.js"></script>
  <script src="js/cache.js"></script>
	<script src="js/proxy.js"></script>
  <script src="js/modal/save_bookmark.js"></script>
  <script src="js/modal/import.js"></script>
  <script src="js/modal/user.js"></script>
	<script>
    var API_ROOT = '<?php echo API_ROOT ?>';

    <?php
    if(file_get_contents(API_ROOT . "user/isEnabled") == "true"):
    ?>

    //try to remember
    tryRemember(function(resp){
      if(resp.results == "error"){
        //show user modal window
        MODAL.user.show();
      } else {
        //user remembered
        passLogin();
      }
    });

    //show log out button
    $(".button[data-action=logout]").show();
    <?php
    else:
    ?>

    PROXY.init(<?php echo file_get_contents(API_ROOT . "bookmark/fetch"); ?>);

    <?php
    endif;
    ?>

	</script>
</body>
</html>
