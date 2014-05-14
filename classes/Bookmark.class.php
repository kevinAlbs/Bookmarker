<?php
require_once("API.class.php");
require_once("DB.class.php");
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
		echo "Saving bookmark<br/>";
		$url = $this->reqParam("url", "Page URL not passed");
		$title = $this->reqParam("title", "Page title not passed");
		$notes = $this->optParam("notes", "");

		//save in database, return insert_id
		$id = DB::getInstance()->insertBookmark($url, $title, $notes);
	}
	public function archive(){
		$id = $this->reqParam("id", "Bookmark id not passed");
		$cat = $this->optParam("category", "uncategorized");

		DB::getInstance()->updateBookmark($id, NULL, NULL, NULL, $cat);
	}
	public function delete(){
		echo "Deleting bookmark";
		//id should be first data item
		$id = $this->reqParam("id", "Bookmark id not passed");

		DB::getInstance()->deleteBookmark($id);
	}
	public function fetch(){
		$category = $this->optParam("category", "");
		//blank category means unarchived
	}
}