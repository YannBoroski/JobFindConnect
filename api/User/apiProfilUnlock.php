<?php
require_once('../../Model/model.php');

$bdd = new Bdd();

if (isset($_GET['id'])) {
  $userId = $_GET['id'];
  $profilData = $bdd->getProfilUnlock($userId);

  if (!empty($profilData)) {
    header('Content-Type: application/json');
    echo json_encode($profilData);
  } else {
    http_response_code(404);
    echo json_encode(["error" => "Profil non trouvé"]);
  }
} else {
  http_response_code(400);
  echo json_encode(["error" => "ID de profil manquant"]);
}
?>