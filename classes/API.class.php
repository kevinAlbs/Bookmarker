<?php
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
}