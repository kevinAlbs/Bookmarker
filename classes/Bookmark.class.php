<?php
require_once("API.class.php");
require_once("DB.class.php");
class Bookmark extends API{
	private static $instance = NULL;
	protected function __construct($reqType, $data){
		parent::__construct($reqType, $data);
	}
	private function output($results){
		echo "{results: [";
		$first = TRUE;
		while($row = mysqli_fetch_assoc($results)){
			if($first){
				$first = false;
			}
			else{
				echo ",";
			}
			printf("{url: '%s',", $row['url']);
			printf("notes: '%s',", $row['notes']);
			printf("title: '%s',", $row['title']);
			printf("date_added: '%s',", $row['date_added']);
			printf("category: '%s',", $row['category']);
			printf("id: %d,", $row['id']);
			printf("list_position: %d}", $row['list_position']);
		}
		echo "]}";
	}
	private function success($msg = ""){
		echo "{results: 'success'";//hmm..
		if($msg != ""){
			echo ", message: '" . $msg ."'";
		}
		echo "}";
	}
	private function error($msg = ""){
		echo "{results: 'error'";
		if($msg != ""){
			echo ", message: '" . $msg ."'";
		}
		echo "}";
	}
	public static function getInstance($reqType, $data){
		if(Bookmark::$instance == NULL){
			Bookmark::$instance = new Bookmark($reqType, $data);
		}
		return Bookmark::$instance;
	}
	public function save(){
		$url = $this->reqParam("url", "Page URL not passed");
		$title = $this->reqParam("title", "Page title not passed");
		$notes = $this->optParam("notes", "");

		//save in database, return insert_id
		$id = DB::getInstance()->insertBookmark($url, $title, $notes);
		echo "{insert_id: " . $id . "}";
	}
	//should check integrity (i.e. that the category exists)
	public function archive(){
		$id = $this->reqParam("id", "Bookmark id not passed");
		$catId = intval($this->optParam("category", -1));

		DB::getInstance()->updateBookmark($id, NULL, NULL, NULL, $catId);
		$this->success();
	}
	public function archiveMultiple(){
		$idList = $this->reqParam("idList", "Bookmark id list not passed");
		$catId = $this->reqParam("category", "Category id not passed");
		$ids = explode("|", $idList);
		DB::getInstance()->updateBookmarkSet($ids, NULL, NULL, NULL, $catId);
		$this->success();
	}

	public function delete(){
		echo "Deleting bookmark";
		//id should be first data item
		$id = $this->reqParam("id", "Bookmark id not passed");
		DB::getInstance()->deleteBookmark($id);
		echo $this->success();
	}
	public function addCategory(){
		$catName = $this->reqParam("category_name", "Category name not passed");
		//this is the name
		$id = DB::getInstance()->addCategory($catName);
		echo "{insert_id: " . $id . "}";
	}
	public function renameCategory(){
		$catId = $this->reqParam("category", "Category id not passed");
		$catName = $this->reqParam("category_name", "Category name not passed");
		DB::getInstance()->renameCategory($catId, $catName);
		echo $this->success();
	}
	//Deletes category by moving them all to general. General is not allowed to be deleted.
	public function deleteCategory(){
		$catId = intval($this->reqParam("category", "Category id not passed"));
		DB::getInstance()->deleteCategory($catId);
		echo $this->success();	
	}
	public function fetch(){
		$category = $this->optParam("category", NULL);
		//blank category means unarchived
		$results = DB::getInstance()->getBookmarks($category);
		$this->output($results);
	}

	public function fetchCategories(){
		$results = DB::getInstance()->getCategories();
		echo "{'results': [";
		$first = true;
		while($row = mysqli_fetch_assoc($results)){
			if($first) $first = false;
			else echo ",";
			printf("{name: '%s', id: %d}", $row['name'], $row['id']);
		}
		echo "]}";
	}
}