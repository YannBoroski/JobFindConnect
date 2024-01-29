<?php
require_once('../../Model/model.php');
$bdd = new Bdd();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['titre']) && isset($_POST['description']) && isset($_POST['job_type']) && isset($_POST['salary_range']) && isset($_POST['expiration_date']) && isset($_POST['required_experiences']) && isset($_POST['required_education']) && isset($_POST['location']) && isset($_POST['company_id']) && isset($_POST['domain_id'])) {
        try {
            $titre = $_POST['titre'];
            $description = $_POST['description'];
            $job_type = $_POST['job_type'];
            $salary_range = $_POST['salary_range'];
            $expiration_date = $_POST['expiration_date'];
            $required_experiences = $_POST['required_experiences'];
            $required_education = $_POST['required_education'];
            $location = $_POST['location'];
            $isRemote = ($_POST['isRemote'] == "on") ? 1 : 0;
            $id_Company = $_POST['company_id'];
            $id_Domaine = $_POST['domain_id'];
            $titleJob = $_POST['Title_of_job'];
            $result = $bdd->createAd($titre, $description, $job_type, $salary_range, $expiration_date, $required_experiences, $required_education, $location, $isRemote, $id_Company, $id_Domaine, $titleJob);
            if ($result) {
                echo "Ad created successfully.";
            } else {
                echo "Error: Unable to create the ad.";
            }
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
        }
    } else {
        echo "Error: Missing parameters.";
    }
} else {
    echo "Error: Invalid request method.";
}
?>
