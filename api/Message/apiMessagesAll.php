<?php
include "../../Model/model.php";
$bdd = new Bdd();
if ($_SERVER['REQUEST_METHOD'] === 'GET' ){
    $messages = $bdd->getAllMessages();
    if ($messages) {
        http_response_code(200);
        echo json_encode($messages);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "No messages found for the given user ID"]);
    }
}