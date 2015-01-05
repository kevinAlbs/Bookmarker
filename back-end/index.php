<?php
header("Content-Type: application/json");
require_once("../config.php");
function jsonMessage($msg = "", $results = "success"){
	echo '{"results": "' . $results . '"';
	if($msg != ""){
		echo ', "message": "' . $msg .'"';
	}
	echo '}';
}

function run(){
	global $API_CLASSES, $API_FUNCTIONS;

	$parts = isset($_SERVER['PATH_INFO']) ? explode('/', $_SERVER['PATH_INFO']) : array();
	$class = "";
	$fn = "";
	$data = $_GET;
	$reqType = "GET";

	//first part is empty, second should be class, third should be fn
	if(sizeof($parts) < 3){
		//nothing provided
		die("Send POST/GET request of form <class>/<function>");
	}
	else if(sizeof($parts) > 3){
		//there is also data
		$data = array_splice($parts, 3);
	}
	$class = $parts[1];
	$fn = $parts[2];

	if(isset($_POST['ispost'])){
		$reqType = "POST";
		$data = $_POST;
	}

	if(in_array($class, $API_CLASSES) && in_array($fn, $API_FUNCTIONS[$class])){
		//load class (singleton) and check if function exists
		$className = ucfirst($class);
		require_once("classes/" .  $className . ".class.php");
		try {
			$obj = $className::getInstance($reqType, $data);
			$obj->$fn();
		} catch(Exception $e){
			jsonMessage($e->getMessage(), "error");
		}
	}
	else{
		echo "API class or function not found";
	}
}

run();

?>
