<?php
require_once("DB.class.php");
class API{
	protected $reqType = "GET";
	protected $data = array();
	protected function __construct($reqType, $data){
		$this->reqType = $reqType;
		$this->data = $data;
	}
	protected function reqParam($p, $m="Required data not passed"){
		if(!isset($this->data[$p])){
			throw new Exception($m);
		}
		return $this->data[$p];
	}
	protected function optParam($p, $def=NULL){
		return isset($this->data[$p]) ? $this->data[$p] : $def;
	}

	protected function success($msg = ""){
		echo '{"results": "success"';//hmm..
		if($msg != ""){
			echo ', "message": "' . $msg .'"';
		}
		echo '}';
	}

	protected function error($msg = ""){
		echo '{"results": "error"';//hmm..
		if($msg != ""){
			echo ', "message": "' . $msg .'"';
		}
		echo '}';
	}

	protected function reqAuth(){
		$u = $this->reqParam("auth_username", "Username not passed");
		$p = $this->reqParam("auth_password", "Password not passed");
		return DB::getInstance()->getUserId($u, $p);
	}
}
