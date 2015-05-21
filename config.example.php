<?php
define('ROOT', 'http://localhost/bookmarks/');
define('DB_USER', '');
define('DB_PASS', '');
define('DB_HOST', '');
define('DB_DB', '');
define('ACCOUNTS_ENABLED', false);
define('CAPTCHA_ENABLED', false);

$API_CLASSES =  array("bookmark", "user", "category", "util");
$API_FUNCTIONS = array(
  "bookmark" => array("save", "archive", "archiveMultiple", "delete", "deleteMultiple", "fetch", "update", "import", "fetchByUrl"),
  "category" => array("rename", "delete", "fetch", "add"),
  "user" => array("add", "authenticate", "isEnabled"),
  "util" => array("fetchTitle")
);

/*
Captcha is Recaptcha (https://www.google.com/recaptcha/)
Sign up for an account and create a key for your domain if you
want to use the default captcha integration. This will put a
captcha on account registration
*/

//only if CAPTCHA_ENABLED is true do these keys have any effect
define('CAPTCHA_SITE_KEY', '');
define('CAPTCHA_SECRET_KEY', '');
