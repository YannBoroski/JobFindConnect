<?php
include_once('../../Model/model.php');
$bdd = new Bdd();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $id = $_POST['id'];
  $bdd->deleteAd($id);
  
  echo json_encode(["success" => "User updated"]);
} else {
  http_response_code(405);
  echo json_encode(["error" => "Method not allowed"]);
}