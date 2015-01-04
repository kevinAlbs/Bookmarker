<?php
define('ROOT', 'localhost/bookmarks');
define('DB_USER', '');
define('DB_PASS', '');
define('DB_HOST', '');
define('DB_DB', '');
define('ACCOUNTS_ENABLED', false);
$API_CLASSES =  array("bookmark", "user", "category");
$API_FUNCTIONS = array(
  "bookmark" => array("save", "archive", "archiveMultiple", "delete", "deleteMultiple", "fetch"),
  "category" => array("rename", "delete", "fetch", "add"),
  "user" => array("add", "authenticate", "isEnabled")
);
