<?php
require_once('../../Model/model.php');

$bdd = new Bdd();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $column = $_POST['columnToChange'];
    $value = $_POST['value'];
    $id = $_POST['id'];
    $bdd->updateCompany($id, $column, $value);
    echo json_encode(["success" => "User updated"]);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
