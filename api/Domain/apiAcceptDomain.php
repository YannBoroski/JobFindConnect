<?php
require_once('../../Model/model.php');

$bdd = new Bdd();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $id = $_POST['id'];
  $value = $bdd->acceptDomain($id);
  if($value == true){
    echo json_encode(["success" => "User updated"]);
  }
    else{
        echo json_encode(["error" => "Method not allowed"]);
    }
} else {
  http_response_code(405);
  echo json_encode(["error" => "Method not allowed"]);
}