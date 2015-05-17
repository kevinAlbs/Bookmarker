<?php
require_once("API.class.php");
class Util extends API{
	private static $instance = NULL;
	protected function __construct($reqType, $data){
		parent::__construct($reqType, $data);
	}

	private static function output($valid, $title=""){
		if(!$valid){
			printf('{"valid": false, "title": ""}');
		} else {
			printf('{"valid": true, "title": "%s"}', $title);
		}
	}
	public static function getInstance($reqType, $data){
		if(static::$instance == NULL){
			static::$instance = new Util($reqType, $data);
		}
		return static::$instance;
	}

	public function fetchTitle(){
		$url = $this->reqParam("url");
		if(filter_var($url, FILTER_VALIDATE_URL)){
			$ch = curl_init($url);
			curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (compatible; http://kevinalbs.com/bookmarks)");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
			$data = curl_exec($ch);
			curl_close($ch);
			if(!$data){
				self::output(false);
				return;
			}
			//check if there is a title tag
			$start = stripos($data, "<title>");

			if($start === FALSE){
				self::output(false);
				return;
			}

			$end = stripos($data, "</title>", $start);
			if($end === FALSE){
				self::output(false);
				return;
			}

			self::output(true, substr($data, $start + 7, $end - 7 - $start));

		} else {
			self::output(false);
			return;
		}

	}

}
