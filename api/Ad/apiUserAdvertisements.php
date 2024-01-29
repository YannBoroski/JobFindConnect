<?php
include_once('../../Model/model.php');
$bdd = new Bdd();
if ($_SERVER['REQUEST_METHOD'] === 'GET' ){
    $userID = $_GET['userId'];
    if (empty($userID)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
        exit;
    }
    $ads = $bdd->getAdWithCorrespondingDomainsWithUser($userID);
    if ($ads) {
        http_response_code(200);
        echo json_encode($ads);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "No advertisements found for the given user ID"]);
    }
}