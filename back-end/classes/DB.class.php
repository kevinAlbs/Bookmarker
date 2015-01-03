<?php
require_once("config.php");
class DB{
	private $cxn = NULL;
	private static $instance = NULL;
	private function __construct(){
		$this->cxn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_DB);
	}
	public static function getInstance(){
		if(DB::$instance == NULL){
			DB::$instance = new DB();
		}
		return DB::$instance;
	}

	private function esc($txt){
		return mysqli_real_escape_string($this->cxn, $txt);
	}
	private function dbErr(){
		throw new Exception("Database error: " . mysqli_error($this->cxn));
	}

	public function insertBookmark($url, $title, $notes, $user_id=false){
		$q = "INSERT INTO bookmark (`url`, `title`, `notes`, `date_added`";
		if($user_id !== false){
			$q .= ",`user_id`";
		}
		$q .= ") VALUES('%s', '%s', '%s', NOW()";
		if($user_id !== false){
			$q .= ",%d)";
			$q = sprintf($q, $this->esc($url), $this->esc($title), $this->esc($notes), intval($user_id));
		} else {
			$q .= ")";
			$q = sprintf($q, $this->esc($url), $this->esc($title), $this->esc($notes));
		}

		if(!mysqli_query($this->cxn, $q)){
			$this->dbErr();
		}
		return mysqli_insert_id($this->cxn);
	}

	public function updateBookmark($id, $url=NULL, $title=NULL, $notes=NULL, $category=NULL){
		$qStr = "UPDATE bookmark SET ";
		if($url != NULL){
			$qStr .= sprintf("url='%s',", $this->esc($url));
		}
		if($title != NULL){
			$qStr .= sprintf("title='%s',", $this->esc($title));
		}
		if($notes != NULL){
			$qStr .= sprintf("notes='%s',", $this->esc($notes));
		}
		if($category != NULL){
			$qStr .= sprintf("category=%d,", intval($category));
		}
		if(substr($qStr, strlen($qStr)-1, 1) == ','){
			$qStr = substr($qStr, 0, strlen($qStr)-1);
		}
		else{
			throw new Exception("No update values passed");
		}
		$qStr .= " WHERE `id`=" . intval($id);
		if(!mysqli_query($this->cxn, $qStr)){
			$this->dbErr();
		}
	}
	public function updateBookmarkSet($ids, $url=NULL, $title=NULL, $notes=NULL, $category=NULL){
		$qStr = "UPDATE bookmark SET ";
		if($url != NULL){
			$qStr .= sprintf("url='%s',", $this->esc($url));
		}
		if($title != NULL){
			$qStr .= sprintf("title='%s',", $this->esc($title));
		}
		if($notes != NULL){
			$qStr .= sprintf("notes='%s',", $this->esc($notes));
		}
		if($category != NULL){
			$qStr .= sprintf("category=%d,", intval($category));
		}
		if(substr($qStr, strlen($qStr)-1, 1) == ','){
			$qStr = substr($qStr, 0, strlen($qStr)-1);
		}
		else{
			throw new Exception("No update values passed");
		}
		for($i = 0; $i < sizeof($ids); $i++){
			$ids[$i] = intval($ids[$i]);
		}
		$qStr .= " WHERE `id` IN (" . implode(",", $ids) . ")";
		if(!mysqli_query($this->cxn, $qStr)){
			$this->dbErr();
		}
	}
	public function deleteBookmarkSet($ids){
		for($i = 0; $i < sizeof($ids); $i++){
			$ids[$i] = intval($ids[$i]);
		}
		if(!mysqli_query($this->cxn, "DELETE FROM bookmark WHERE `id` IN (" . implode(",", $ids) . ")")){
			$this->dbErr();
		}
	}
	public function deleteBookmark($id){
		if(!mysqli_query($this->cxn, sprintf("DELETE FROM bookmark WHERE `id`=%d", intval($id)))){
			$this->dbErr();
		}
	}

	public function getBookmarks($category=NULL){
		$qStr = "SELECT * FROM bookmark";
		if($category !== NULL){
			$qStr .= " WHERE `category`=" . intval($category) ."";
		}
		$qStr .= " ORDER BY `date_added` DESC";
		if(!$results = mysqli_query($this->cxn, $qStr)){
			$this->dbErr();
		}
		return $results;
	}

	public function addCategory($name){
		if(!mysqli_query($this->cxn, sprintf("INSERT INTO category (`name`) VALUES('%s')", $name))){
			$this->dbErr();
		}
		return mysqli_insert_id($this->cxn);
	}
	public function renameCategory($id, $newName){
		if(!mysqli_query($this->cxn, sprintf("UPDATE category SET `name`= '%s' WHERE `id`=%d", $newName, $id))){
			$this->dbErr();
		}
	}
	public function deleteCategory($id){
		$id = intval($id);
		//queue category is -1, general category is 0

		//delete bookmarks from this category
		if(!mysqli_query($this->cxn, sprintf("DELETE FROM bookmark WHERE `category`=%d", $id))){
			$this->dbErr();
		}

		if(!mysqli_query($this->cxn, sprintf("DELETE FROM category WHERE `id`=%d", $id))){
			$this->dbErr();
		}
	}
	public function getCategories(){
		$results = mysqli_query($this->cxn, "SELECT * FROM category");
		if(!$results) $this->dbErr();
		return $results;
	}

	public function userExists($username){
		$q = sprintf("SELECT `username` FROM user WHERE `username`='%s'", $this->esc($username));
		$results = mysqli_query($this->cxn, $q);
		if(!$results) $this->dbErr();
		if(mysqli_num_rows($results) == 0){
			return false;
		} else {
			return true;
		}
	}

	public function addUser($username, $pass){
		//check if username exists
		if($this->userExists($username, $pass)){
			throw new InvalidArgumentException("User " . $username . " already exists");
		} else if(!$pass){
			throw new InvalidArgumentException("Invalid password");
		}
		$q = sprintf("INSERT INTO user (`username`, `password`) VALUES('%s', sha1('%s'))", $username, $pass);
		if(!mysqli_query($this->cxn, $q)){
			$this->dbErr();
		} else{
			return true;
		}
	}

	public function getUserId($username, $pass){
		$q = sprintf("SELECT `user_id` FROM user WHERE `username`='%s' AND `password`=sha1('%s')", $this->esc($username), $this->esc($pass));
		$results = mysqli_query($this->cxn, $q);
		if(!$results) $this->dbErr();
		if(mysqli_num_rows($results) == 0){
			throw new Exception("User does not exist");
		} else {
			$arr = mysqli_fetch_assoc($results);
			return $arr['user_id'];
		}
	}
	public function authenticateUser($username, $pass){
		//feels weird, but reduces duplication
		try{
			$this->getUserId($username, $pass);
			return true;
		} catch(Exception $e){
			return false;
		}
	}
}
