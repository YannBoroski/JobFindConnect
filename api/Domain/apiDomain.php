<?php
require_once('../../Model/model.php');
$bdd = new Bdd();
if (isset($_GET['id'])) {
    $userId = $_GET['id'];
    $userOutput = $bdd->getProfil($userId);
    $role = $userOutput[0]['role'];
    if ($role == 'Admin'){
        $tableauDomain = $bdd->getDomains(true);
        $tableauDomain['admin'] = true;
        echo json_encode($tableauDomain);
        exit;
    } else{
        $tableauDomain = $bdd->getDomains(false);
        $tableauDomain['admin'] = false;
        echo json_encode($tableauDomain);
        exit;
    }
}