<?php
require_once("API.class.php");
require_once("DB.class.php");
class Category extends API{
	private static $instance = NULL;
	protected function __construct($reqType, $data){
		parent::__construct($reqType, $data);
	}
	public static function getInstance($reqType, $data){
		if(static::$instance == NULL){
			static::$instance = new Category($reqType, $data);
		}
		return static::$instance;
	}
	public function fetch(){
		$user_id = ACCOUNTS_ENABLED ? $this->reqAuth() : 0;
		$results = DB::getInstance()->getCategories($user_id);
		echo '{"results": [';
		$first = true;
		while($row = mysqli_fetch_assoc($results)){
			if($first) $first = false;
			else echo ",";
			printf('{"name": "%s", "id": %d}', $row['name'], $row['id']);
		}
		echo "]}";
	}

	public function add(){
		$user_id = ACCOUNTS_ENABLED ? $this->reqAuth() : 0;
		$catName = $this->reqParam("category_name", "Category name not passed");
		//this is the name
		$id = DB::getInstance()->addCategory($catName, $user_id);
		echo '{"insert_id": ' . $id . '}';
	}
	public function rename(){
		$user_id = ACCOUNTS_ENABLED ? $this->reqAuth() : 0;
		$catId = $this->reqParam("category", "Category id not passed");
		$catName = $this->reqParam("category_name", "Category name not passed");
		DB::getInstance()->renameCategory($catId, $catName, $user_id);
		echo $this->success();
	}
	//Deletes category by moving them all to general. General is not allowed to be deleted.
	public function delete(){
		$user_id = ACCOUNTS_ENABLED ? $this->reqAuth() : 0;
		$catId = intval($this->reqParam("category", "Category id not passed"));
		DB::getInstance()->deleteCategory($catId, $user_id);
		echo $this->success();
	}
}
