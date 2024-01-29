<?php

require_once('../../Model/model.php');
$bdd = new Bdd();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'];
    if (empty($id)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
        exit;
    }
    $domains = $bdd->getDomainsByUserId($id);
    if ($domains) {
        http_response_code(200);
        echo json_encode($domains);
    } else {
        http_response_code(200);
        echo json_encode(["error" => "No domains found for the given user ID"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
