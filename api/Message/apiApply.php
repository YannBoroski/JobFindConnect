<?php
include_once('../../Model/model.php');
$bdd = new Bdd();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $idUser = $_POST['userId'];
    $idAd = $_POST['adId'];
    $message = $_POST['message'];
    if (isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['email']) && isset($_POST['phone'])) {
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $result = $bdd->createMessageOffline($idUser, $idAd, $message, $firstName, $lastName, $email, $phone);
    } else {
    $result = $bdd-> createMessage($idUser, $idAd, $message);    
}
    if ($result) {
        http_response_code(200);
        echo json_encode(["success" => "Message created"]);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Message not created"]);
    }
}