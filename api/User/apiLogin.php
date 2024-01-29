<?php
require_once('../../Model/model.php');

$bdd = new Bdd();

$username = $_POST['username'];
$password = $_POST['password'];
$passSorti = $bdd->getPass($username);
if (password_verify($password, $passSorti)) {
  $user = $bdd->loginProfil($username, $passSorti);
  if ($user) {
    $superId = $user[0]['id'];
    $bdd->lastLogin($superId);
    session_start();
    $_SESSION['user_id'] = $user;

    echo json_encode(array(
      'success' => true,
    ));
  } else {
    echo json_encode(array(
      'success' => false,
      'message' => 'Identifiants incorrects',
    ));
  }
} else {
  echo json_encode(array(
    'success' => false,
    'message' => 'Identifiants incorrects',
  ));
}
?>