<?php
require_once('../../Model/model.php');
$bdd = new Bdd();
$tableauEntreprises = $bdd->getEntreprises();
echo json_encode($tableauEntreprises);
exit;

