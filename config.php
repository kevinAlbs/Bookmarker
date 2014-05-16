<?php
define('ROOT', 'localhost/bookmarks');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_HOST', 'localhost');
define('DB_DB', 'bookmarker');
$API_CLASSES =  array("bookmark", "user");
$API_FUNCTIONS = array("bookmark" => array("save","archive","archiveMultiple","delete","addCategory","renameCategory","deleteCategory","fetch","fetchCategories"));
