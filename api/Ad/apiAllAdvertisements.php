<?php
include_once('../../Model/model.php');
$bdd = new Bdd();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $ads = $bdd->getAllAdsAndDomainsAndCompanyNameWithIt();

    if ($ads) {
        http_response_code(200);
        echo json_encode($ads);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "No advertisements found for the given company ID"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}