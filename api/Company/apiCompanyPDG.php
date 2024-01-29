<?php
require_once('../../Model/model.php');

$bdd = new Bdd();

if (isset($_GET['id']) || isset($_GET['id_Pdg'])) {
  $entrepriseId = isset($_GET['id']) ? $_GET['id'] : $_GET['id_Pdg'];
  $entrepriseData = $bdd->getEntrepriseByPDG($entrepriseId);

  if (!empty($entrepriseData)) {
    header('Content-Type: application/json');
    echo json_encode($entrepriseData);
  } else {
    http_response_code(200);
    echo json_encode(["error" => "Company not found"]);
  }
} else {
  http_response_code(400);
  echo json_encode(["error" => "Missing company ID"]);
}
?>