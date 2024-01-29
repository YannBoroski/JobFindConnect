<?php
require_once('../../Model/model.php');
$bdd = new Bdd();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = $_POST['nom'];
    $description = $_POST['description'];
    $URL = $_POST['URL'];
    $Secteur_activitee = $_POST['Secteur_activitee'];
    $taille = $_POST['taille'];
    $date_de_fondation = $_POST['date_de_fondation'];
    $siegeSocial = $_POST['siegeSocial'];
    $mail = $_POST['mail'];
    $phone = $_POST['phone'];
    $Pdg_id = $_POST['Pdg_id'];

    if ($bdd->entrepriseExist($nom)) {
        http_response_code(409);
        echo json_encode(["error" => "Enterprise already exists"]);
        exit;
    }
    
    $success = $bdd->createEntreprise($nom, $description, $URL, $Secteur_activitee, $taille, $date_de_fondation, $siegeSocial, $mail, $phone,$Pdg_id);
    
    if ($success) {
        http_response_code(201);
        echo json_encode(["success" => "Enterprise created"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to create enterprise"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>