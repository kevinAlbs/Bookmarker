<?php
require_once("API.class.php");
require_once("DB.class.php");
require_once("Node.class.php");
class Bookmark extends API{
	private static $instance = NULL;
	protected function __construct($reqType, $data){
		parent::__construct($reqType, $data);
	}
	public static function getInstance($reqType, $data){
		if(static::$instance == NULL){
			static::$instance = new Bookmark($reqType, $data);
		}
		return static::$instance;
	}
	private function outputBookmark($row){
		printf('{"url": "%s",', $row['url']);
		printf('"notes": "%s",', $row['notes']);
		printf('"title": "%s",', htmlentities($row['title']));
		printf('"date_added": "%s",', $row['date_added']);
		printf('"category": %d,', $row['category']);
		printf('"id": %d,', $row['id']);
		printf('"next": %d}', $row['next']);
	}
	private function output($results){
		//first build the linked list
		//if there are any cycles, remove the bad node and place it in front
		echo '{"results": [';
		$first = TRUE;
		while($row = mysqli_fetch_assoc($results)){
			if($first){
				$first = false;
			}
			else{
				echo ",";
			}
			$this->outputBookmark($row);
		}
		echo "]}";
	}

	public function save(){
		$user_id = ACCOUNTS_ENABLED ? $this->reqAuth() : 0;
		$url = $this->reqParam("url", "Page URL not passed");
		$title = $this->reqParam("title", "Page title not passed");
		$notes = $this->optParam("notes", "");

		//save in database, return insert_id
		$id = DB::getInstance()->insertBookmark($url, $title, $notes, $user_id);
		$this->outputBookmark(DB::getInstance()->getBookmark($id, $user_id));
	}

	public function import(){
		$user_id = ACCOUNTS_ENABLED ? $this->reqAuth() : 0;
		$bookmarks = $this->reqParam("bookmark_data", "Bookmark data not passed");
		foreach($bookmarks as $bookmark){
			if(!array_key_exists("title", $bookmark)){
				throw new Exception("Title missing from a bookmark");
			}
			if(!array_key_exists("url", $bookmark)){
				throw new Exception("URL missing from a bookmark");
			}
		}

		//save in database, return insert_id
		$ids = DB::getInstance()->insertBookmarks($bookmarks, $user_id);
		$this->output(DB::getInstance()->getBookmarksFromIds($ids, $user_id));
	}

	public function update(){
		$user_id = ACCOUNTS_ENABLED ? $this->reqAuth() : 0;
		$bookmark_id = $this->reqParam("id", "Bookmark id not passed");
		$title = $this->optParam("title", NULL);
		$url = $this->optParam("url", NULL);
		$notes = $this->optParam("notes", NULL);
		DB::getInstance()->updateBookmark($bookmark_id, $url, $title, $notes, NULL, $user_id);
		echo "{}";
	}

	//should check integrity (i.e. that the category exists)
	public function archive(){
		$user_id = ACCOUNTS_ENABLED ? $this->reqAuth() : 0;
		$id = $this->reqParam("id", "Bookmark id not passed");
		$catId = intval($this->optParam("category", -1));

		DB::getInstance()->updateBookmark($id, NULL, NULL, NULL, $catId, $user_id);
		$this->success();
	}
	public function archiveMultiple(){
		$user_id = ACCOUNTS_ENABLED ? $this->reqAuth() : 0;
		$idList = $this->reqParam("idList", "Bookmark id list not passed");
		$catId = $this->reqParam("category", "Category id not passed");
		$ids = explode("|", $idList);
		DB::getInstance()->updateBookmarkSet($ids, NULL, NULL, NULL, $catId, $user_id);
		$this->success();
	}

	public function deleteMultiple(){
		$user_id = ACCOUNTS_ENABLED ? $this->reqAuth() : 0;
		$idList = $this->reqParam("idList", "Bookmark id list not passed");
		$ids = explode("|", $idList);
		DB::getInstance()->deleteBookmarkSet($ids, $user_id);
		$this->success();
	}

	public function delete(){
		$user_id = ACCOUNTS_ENABLED ? $this->reqAuth() : 0;
		//id should be first data item
		$id = $this->reqParam("id", "Bookmark id not passed");
		DB::getInstance()->deleteBookmark($id, $user_id);
		echo $this->success();
	}

	public function fetch(){
		$user_id = ACCOUNTS_ENABLED ? $this->reqAuth() : 0;
		$category = $this->optParam("category", NULL);
		if($category == -2){
			//all category
			$category = NULL;
		}
		$results = DB::getInstance()->getBookmarks($category, $user_id);
		$this->output($results);
	}

	public function fetchByUrl(){
		$user_id = ACCOUNTS_ENABLED ? $this->reqAuth() : 0;
		$url = $this->reqParam("url", "Bookmark url not passed");
		$results = DB::getInstance()->getBookmarkByUrl($url, $user_id);
		$this->output($results);
	}

}
