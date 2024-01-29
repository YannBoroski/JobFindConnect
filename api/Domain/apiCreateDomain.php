<?php
require_once('../../Model/model.php');
$bdd = new Bdd();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $Nom = $_POST['nom'];
    $Description = $_POST['description'];
    $SalaireMoyen = $_POST['salaire_moyen'];
    $NiveauEduc = $_POST['niveau_educ'];
    $tendanceMarche = $_POST['tendance_marche'];

    if (empty($Nom) || empty($Description) || empty($SalaireMoyen) || empty($NiveauEduc) || empty($tendanceMarche)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
        exit;
    }

    if ($bdd->domainExist($Nom)) {
        http_response_code(409);
        echo json_encode(["error" => "Domain already exists"]);
        exit;
    }
    
    $success = $bdd->createDomain($Nom, $Description, $SalaireMoyen, $NiveauEduc, $tendanceMarche);

    if ($success) {
        echo json_encode(["success" => "Domain created"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to create domain"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>