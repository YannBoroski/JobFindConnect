<?php
include "header.php"
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
    <title>Create your Company Profile</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <style>
        .required {
            color: red;
        }
    </style>
</head>

<body>

<div class="container mt-5">
<form id="inscription-form" method="POST" enctype="multipart/form-data">

        <div class="mb-3">
            <label for="enterprise-name-input" class="form-label">Company name:<span class="required">*</span></label>
            <input type="text" class="form-control" id="enterprise-name-input" name="nom" required>
        </div>

        <div class="mb-3">
            <label for="description-input" class="form-label">Company description:<span class="required">*</span></label>
            <textarea class="form-control" id="description-input" name="description" rows="3" required></textarea>
        </div>

        <div class="mb-3">
            <label for="website-input" class="form-label">Website:<span class="required">*</span></label>
            <input type="text" class="form-control" id="website-input" name="URL" required>
        </div>

        <div class="mb-3">
            <label for="activity-sector-input" class="form-label">Industry Sector:<span class="required">*</span></label>
            <input type="text" class="form-control" id="activity-sector-input" name="Secteur_activitee" required>
        </div>

        <div class="mb-3">
            <label for="size-input" class="form-label">Size:<span class="required">*</span></label>
            <select class="form-select" id="size-input" name="taille" required>
                <option value="">-- Select a size --</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-49">11-49 employees</option>
                <option value="50-199">50-199 employees</option>
                <option value="200-499">200-499 employees</option>
                <option value="500-999">500-999 employees</option>
                <option value="1000-4999">1000-4999 employees</option>
                <option value="5000+">5000+ employees</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="creation-date-input" class="form-label">Foundation date:<span class="required">*</span></label>
            <input type="date" class="form-control" id="creation-date-input" name="date_de_fondation" required>
        </div>

        <div class="mb-3">
            <label for="headquarters-input" class="form-label">Headquarters:<span class="required">*</span></label>
            <input type="text" class="form-control" id="headquarters-input" name="siegeSocial" required>
        </div>

        <div class="mb-3">
            <label for="email-input" class="form-label">Mail:</label>
            <input type="email" class="form-control" id="email-input" name="mail">
        </div>

        <div class="mb-3">
            <label for="phone-input" class="form-label">Phone:</label>
            <input type="tel" class="form-control" id="phone-input" name="phone">
        </div>

        <button type="submit" class="btn btn-primary" id="inscription-button">Inscription</button>
    </form>
</div>

<script src="../Controller/controllerCreateEntreprise.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>
<?php
} else {
    header('Location: login.php');
    exit;
  }
  ?>