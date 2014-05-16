<?php
require_once("config.php");
class DB{
	private $cxn = NULL;
	private static $instance = NULL;
	private function __construct(){
		$this->cxn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_DB);
	}
	private function esc($txt){
		return mysqli_real_escape_string($this->cxn, $txt);
	}
	private function dbErr(){
		throw new Exception("Database error: " . mysqli_error($this->cxn));
	}
	public static function getInstance(){
		if(DB::$instance == NULL){
			DB::$instance = new DB();
		}
		return DB::$instance;
	}
	public function insertBookmark($url, $title, $notes){
		if(!mysqli_query($this->cxn, sprintf("INSERT INTO bookmark (`url`, `title`, `notes`, `date_added`) VALUES('%s', '%s', '%s', NOW())", $this->esc($url), $this->esc($title), $this->esc($notes)))){
			$this->dbErr();
		}
	}

	public function updateBookmark($id, $url=NULL, $title=NULL, $notes=NULL, $category=NULL){
		$qStr = "UPDATE bookmark SET ";
		if($url != NULL){
			$qStr .= sprintf("url='%s',", $this->esc($url));
		}
		if($title != NULL){
			$qStr .= sprintf("url='%s',", $this->esc($title));
		}
		if($notes != NULL){
			$qStr .= sprintf("url='%s',", $this->esc($notes));
		}
		if($category != NULL){
			$qStr .= sprintf("url='%s',", $this->esc($category));
		}
		if(substr($qStr, strlen($qStr)-1, 1) == ','){
			$qStr = substr($qStr, 0, strlen($qStr)-1);
		}
		else{
			throw new Exception("No update values passed");
		}
		if(!mysqli_query($this->cxn, $qStr)){
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
			$qStr .= " WHERE `category`='" . $this->esc($category) ."'";
		}
		$qStr .= " ORDER BY `date_added`";
		if(!$results = mysqli_query($this->cxn, $qStr)){
			$this->dbErr();
		}
		return $results;
	}

	public function getCategories(){
		$results = mysqli_query($this->cxn, "SELECT DISTINCT(`category`) FROM bookmark");
		if(!$results) $this->dbErr();
		return $results;
	}
}