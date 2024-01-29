<?php
include_once('../../Model/model.php');
$bdd = new Bdd();
if ($_SERVER['REQUEST_METHOD'] === 'POST' ){

    $messageID = $_POST['id'];
    $status = $_POST['Status'];
    if (empty($messageID) || empty($status)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
        exit;
    }
    $res = $bdd->setMessageStatus($messageID, $status);
    http_response_code(200);
    echo json_encode(["success" => "Message status updated"]);
    exit;
}
