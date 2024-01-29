<?php
require_once('../../Model/model.php');
$bdd = new Bdd();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['user_id'];
    $domainId = $_POST['domain_id'];
    if (empty($id) || empty($domainId)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
        exit;
    }
    $success = $bdd->linkDomainToUser($id, $domainId);
    if ($success) {
        echo json_encode(["success" => "Domain linked to user"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to link domain to user"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);

}