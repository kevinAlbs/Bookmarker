<?php
class Node{
	public $data;
	public $prev = NULL, $next = NULL;
	public function __construct($data){
		$this->data = $data;
	}
}