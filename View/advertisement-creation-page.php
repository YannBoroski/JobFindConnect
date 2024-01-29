<?php
include "header.php";
?>
<!DOCTYPE html>
<html lang="en">
<?php
session_start();
if (isset($_SESSION['user_id'][0])) {
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Advertisement</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>
<body>
    <div class="container mt-5">
        <form id="advertisement-form">

            <div class="mb-3">
                <label for="title-input" class="form-label">Title:</label>
                <input type="text" class="form-control" id="title-input" name="titre" required>
            </div>

            <div class="mb-3">
                <label for="description-input" class="form-label">Description:</label>
                <textarea class="form-control" id="description-input" name="description" required></textarea>
            </div>
            <div class="mb-3">
                <label for="titlejob-input" class="form-label">Title of the job:</label>
                <input type="text" class="form-control" id="titlejob-input" name="Title_of_job" required>
            </div>
            
            <div class="mb-3">
                <label for="job-type-input" class="form-label">Job type:</label>
                <input type="text" class="form-control" id="job-type-input" name="job_type" required>
            </div>

            <div class="mb-3">
                <label for="salary-input" class="form-label">Salary range</label>
                <input type="text" class="form-control" id="salary-input" name="salary_range" required>
            </div>

            <div class="mb-3">
                <label for="expiration-date-input" class="form-label">Expiration date of the offer</label>
                <input type="date" class="form-control" id="expiration-date-input" name="expiration_date" required>
            </div>

            <div class="mb-3">
                <label for="required-experience-input" class="form-label">Required Experiences</label>
                <select class="form-select" id="required-experience-input" name="required_experiences" required>
                    <option value="">Select Required experience</option>
                    <option value="Moins de 1 an">Less than a year</option>
                    <option value="1-2 ans">1-2 years</option>
                    <option value="2-5 ans">2-5 years</option>
                    <option value="Plus de 5 ans">More than 5 years</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="required-education-input" class="form-label">Required Education</label>
                <select class="form-select" id="required-education-input" name="required_education" required>
                    <option value="">-- Sélectionnez l'éducation requise --</option>
                    <option value="Bac">Bac</option>
                    <option value="Bac+2">Bac+2</option>
                    <option value="Bac+3">Bac+3</option>
                    <option value="Bac+5">Bac+5</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="location-input" class="form-label">Location</label>
                <input type="text" class="form-control" id="location-input" name="location" required>
            </div>

            <div class="mb-3">
                <label for="is-remote-input" class="form-check-label">Do remote work</label>
                <input type="checkbox" class="form-check-input" id="is-remote-input" name="isRemote">
            </div>

            <button type="submit" class="btn btn-primary" id="advertisement-button">Create the advertisement</button>
        </form>
    </div>

    <script src="../Controller/controllerCreateAd.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>
<?php
} else {
    header('Location: login.php');
    exit;
}
?>
