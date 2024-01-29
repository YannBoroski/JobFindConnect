<?php
require_once('../../Model/model.php');

$bdd = new Bdd();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = $_POST['username'];
  $pass = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $firstname = $_POST['firstname'];
  $lastname = $_POST['lastname'];
  $birth_date = $_POST['birth_date'];
  $mail = $_POST['mail'];
  $role = $_POST['role'];
  $phone = $_POST['phone'];
  $visibilitee = $_POST['visibilitee'];

  if(empty($username) || empty($pass) || empty($firstname) || empty($lastname) || empty($birth_date) || empty($mail) || empty($role) || empty($phone) || empty($visibilitee)){
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit;
  }
  if ($bdd->profilExist($username)) {
    http_response_code(409);
    echo json_encode(["error" => "User already exists"]);
    exit;
  }
  if($role != 'Entreprise' && $role != 'User'){
    http_response_code(400);
    echo json_encode(["error" => "Role not valid"]);
    exit;
  }
  $bdd->createProfil($pass, $username, $firstname, $lastname, $birth_date, $mail, $role, $phone, $visibilitee);
  echo json_encode(["success" => "User created"]);
 

} else {
  http_response_code(405);
  echo json_encode(["error" => "Method not allowed"]);
}
?>