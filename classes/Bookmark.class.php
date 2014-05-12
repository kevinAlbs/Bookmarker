<?php
require_once("API.class.php");
class Bookmark extends API{
	private static $instance = NULL;
	protected function __construct($reqType, $data){
		parent::__construct($reqType, $data);
	}
	public static function getInstance($reqType, $data){
		if(Bookmark::$instance == NULL){
			Bookmark::$instance = new Bookmark($reqType, $data);
		}
		return Bookmark::$instance;
	}
	public function save(){
		echo "Saving bookmark";
		$url = $this->reqParam("url", "Page URL not passed");
		$title = $this->reqParam("title", "Page title not passed");
		$notes = $this->optParam("notes", "");
		//save in database, return insert_id
	}
	public function archive(){
		$cat = $this->optParam("category", "all");
	}
	public function delete(){
		echo "Deleting bookmark";
		//id should be first data item
		$id = $this->reqParam("id", "Bookmark id not passed");
	}
}