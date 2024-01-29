<?php
require_once('../../Model/model.php');

$bdd = new Bdd();

if (isset($_GET['id'])) {
  $entrepriseId = $_GET['id'];
  $entrepriseData = $bdd->getEntreprise($entrepriseId);

  if (!empty($entrepriseData)) {
    header('Content-Type: application/json');
    echo json_encode($entrepriseData);
  } else {
    http_response_code(404);
    echo json_encode(["error" => "Company not found"]);
  }
} else {
  http_response_code(400);
  echo json_encode(["error" => "Missing company ID"]);
}
?>