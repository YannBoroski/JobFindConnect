<?php
require_once('../../Model/model.php');
$bdd = new Bdd();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id_Pdg = $_GET['id'];

    if (empty($id_Pdg)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
        exit;
    }

    $companies = $bdd->getCompaniesByPdgId($id_Pdg);

    if ($companies) {
        http_response_code(200);
        echo json_encode($companies);
    } else {
        http_response_code(200);
        echo json_encode(["error" => "No companies found for the given Pdg ID"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>