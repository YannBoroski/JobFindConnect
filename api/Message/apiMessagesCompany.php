<?php
include_once('../../Model/model.php'); 
$bdd = new Bdd();
if ($_SERVER['REQUEST_METHOD'] === 'GET' ){
    $pdgId = $_GET['id'];
    if (empty($pdgId)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
        exit;
    }
    $messages = $bdd->getMessagesWithStatusByPdgId($pdgId);
    if ($messages) {
        http_response_code(200);
        echo json_encode($messages);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "No messages found for the given company ID"]);
    }
}