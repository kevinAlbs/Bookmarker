<?php
define('ROOT', 'http://localhost/bookmarks/');
define('DB_USER', '');
define('DB_PASS', '');
define('DB_HOST', '');
define('DB_DB', '');
define('ACCOUNTS_ENABLED', false);

/*
Captcha is Recaptcha (https://www.google.com/recaptcha/)
Sign up for an account and create a key for your domain if you
want to use the default captcha integration. This will put a
captcha on account registration
*/

//only if CAPTCHA_ENABLED is true do these keys have any effect
define('CAPTCHA_ENABLED', false);
define('CAPTCHA_SITE_KEY', '');
define('CAPTCHA_SECRET_KEY', '');
