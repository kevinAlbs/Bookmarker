<?php
require_once("API.class.php");
require_once("DB.class.php");
class User extends API{
	private static $instance = NULL;
	protected function __construct($reqType, $data){
		parent::__construct($reqType, $data);
	}
	public static function getInstance($reqType, $data){
		if(static::$instance == NULL){
			static::$instance = new User($reqType, $data);
		}
		return static::$instance;
	}

	public function isEnabled(){
		echo ACCOUNTS_ENABLED ? "true" : "false";
	}

	public function add(){
		$username = $this->reqParam("username", "Username not passed");
		$password = $this->reqParam("password", "Password not passed");
		$captcha = $this->optParam("captcha", "");

		if(CAPTCHA_ENABLED){
			if(trim($captcha) === ""){
				throw new Exception("Captcha required but not passed");
			}
			$param = [
				"secret" => CAPTCHA_SECRET_KEY,
				"response" => $captcha,
				"remoteip" => $_SERVER["REMOTE_ADDR"]
			];
			$url = "https://www.google.com/recaptcha/api/siteverify?" . http_build_query($param);
			$response = json_decode(file_get_contents($url));
			if(!$response->success) {
				throw new Exception("Captcha incorrect");
			}
		}
		try{
			DB::getInstance()->addUser($username, $password);
			echo $this->success();
		} catch(InvalidArgumentException $iae) {
			echo $this->error("Could not register");
		} catch(Exception $e){
			echo $this->error("Database exception occured");
		}
	}

	public function authenticate(){
		$username = $this->reqParam("username", "Username not passed");
		$password = $this->reqParam("password", "Password not passed");
		try {
			if(DB::getInstance()->authenticateUser($username, $password)){
				echo $this->success();
			} else {
				echo $this->error("Could not log in");
			}
		} catch(Exception $e){
			echo $this->error("Database exception occured");
		}
	}


}
