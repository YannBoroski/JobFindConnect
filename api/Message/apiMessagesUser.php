<?php
include "../../Model/model.php";
$bdd = new Bdd();
if ($_SERVER['REQUEST_METHOD'] === 'GET' ){
    $userId = $_GET['userId'];
    if (empty($userId)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
        exit;
    }
    $messages = $bdd->getMessagesWithUserId($userId);
    if ($messages) {
        http_response_code(200);
        echo json_encode($messages);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "No messages found for the given user ID"]);
    }
}