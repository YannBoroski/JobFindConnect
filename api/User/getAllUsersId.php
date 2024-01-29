<?php
require_once('../../Model/model.php');

$bdd = new Bdd();


  $profilData = $bdd->getAllProfilid();

  if (!empty($profilData)) {
    header('Content-Type: application/json');
    echo json_encode($profilData);
  } else {
    http_response_code(404);
    echo json_encode(["error" => "Profil non trouvé"]);
  }
?>