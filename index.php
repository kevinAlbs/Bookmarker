<?php
require_once("config.php");
function run(){
	global $API_CLASSES;
	
	$parts = isset($_SERVER['PATH_INFO']) ? explode('/', $_SERVER['PATH_INFO']) : array();
	$class = "";
	$fn = "";
	$data = $_GET;
	$reqType = "GET";

	//first part is empty, second should be class, third should be fn
	if(sizeof($parts) < 3){
		//nothing provided
		die("Send POST/GET request of form /&lt;class&gt;/&lt;function&gt;");
	}
	else if(sizeof($parts) > 3){
		//there is also data
		$data = array_splice($parts, 3);
	}
	$class = $parts[1];
	$fn = $parts[2];

	if(isset($_POST['data'])){
		$reqType = "POST";
		$data = $_POST;
	}

	if(in_array($class, $API_CLASSES)){
		//load class (singleton) and check if function exists
		$className = ucfirst($class);
		require_once("classes/" .  $className . ".class.php");
		$obj = $className::getInstance($reqType, $data);
		$obj->$fn();
	}
}

run();

?>