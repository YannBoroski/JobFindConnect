<?php
require_once('../../Model/model.php');
$bdd = new Bdd();
if (isset($_GET['id'])) {
    $userId = $_GET['id'];
    $userOutput = $bdd->getProfil($userId);
    $role = $userOutput[0]['role'];
    if ($role == 'Admin'){
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
}