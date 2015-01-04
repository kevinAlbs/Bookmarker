<?php
require_once("config.php");

/*
Default user id is 0.
*/

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
		//log this -> mysqli_error($this->cxn);
		throw new Exception("Internal database error");
	}

	public function insertBookmark($url, $title, $notes, $user_id=0){
		$q = sprintf("INSERT INTO bookmark (`url`, `title`, `notes`, `date_added`, `user_id`) VALUES('%s', '%s', '%s', NOW(), %d)", $this->esc($url), $this->esc($title), $this->esc($notes), intval($user_id));
		if(!mysqli_query($this->cxn, $q)){
			$this->dbErr();
		}
		return mysqli_insert_id($this->cxn);
	}

	public function updateBookmark($id, $url=NULL, $title=NULL, $notes=NULL, $category=NULL, $user_id=0){
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
		$qStr .= " AND `user_id`=" . intval($user_id);
		if(!mysqli_query($this->cxn, $qStr)){
			$this->dbErr();
		}
	}

	public function updateBookmarkSet($ids, $url=NULL, $title=NULL, $notes=NULL, $category=NULL, $user_id=0){
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
		$qStr .= " AND `user_id`=" . intval($user_id);
		if(!mysqli_query($this->cxn, $qStr)){
			$this->dbErr();
		}
	}

	public function deleteBookmarkSet($ids, $user_id=0){
		for($i = 0; $i < sizeof($ids); $i++){
			$ids[$i] = intval($ids[$i]);
		}
		$q = "DELETE FROM bookmark WHERE `id` IN (" . implode(",", $ids) . ")";
		$q .= " AND `user_id`=" . intval($user_id);
		if(!mysqli_query($this->cxn, $q)){
			$this->dbErr();
		}
	}
	public function deleteBookmark($id, $user_id=0){
		$q = sprintf("DELETE FROM bookmark WHERE `id`=%d", intval($id));
		$q .= " AND `user_id`=" . intval($user_id);
		if(!mysqli_query($this->cxn, $q)){
			$this->dbErr();
		}
	}

	public function getBookmarks($category=NULL, $user_id=0){
		$qStr = "SELECT * FROM bookmark WHERE `user_id`=" . intval($user_id);
		if($category !== NULL){
			$qStr .= " AND `category`=" . intval($category);
		}

		$qStr .= " ORDER BY `date_added` DESC";
		if(!$results = mysqli_query($this->cxn, $qStr)){
			$this->dbErr();
		}
		return $results;
	}

	public function addCategory($name, $user_id=0){
		$q = sprintf("INSERT INTO category (`name`, `user_id`) VALUES('%s', %d)", $this->esc($name), intval($user_id));
		if(!mysqli_query($this->cxn, $q)){
			$this->dbErr();
		}
		return mysqli_insert_id($this->cxn);
	}
	public function renameCategory($id, $newName,$user_id=0){
		$q = sprintf("UPDATE category SET `name`= '%s' WHERE `id`=%d AND `user_id`=%d", $this->esc($newName), $id, $user_id);
		if(!mysqli_query($this->cxn, $q)){
			$this->dbErr();
		}
	}
	public function deleteCategory($id, $user_id=0){
		$id = intval($id);
		//queue category is -1, general category is 0

		//delete bookmarks from this category
		if(!mysqli_query($this->cxn, sprintf("DELETE FROM bookmark WHERE `category`=%d AND `user_id`=%d", $id, $user_id))){
			$this->dbErr();
		}

		if(!mysqli_query($this->cxn, sprintf("DELETE FROM category WHERE `id`=%d AND `user_id`=%d", $id, $user_id))){
			$this->dbErr();
		}
	}
	public function getCategories($user_id=0){
		$q = sprintf("SELECT * FROM category WHERE `user_id`=%d", $user_id);
		$results = mysqli_query($this->cxn, $q);
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
			throw new Exception("Cannot find user with password");
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
