<?php
include_once('../../Model/model.php');
$bdd = new Bdd();
$bdd->deleteMessage($_POST['id']);
?>
