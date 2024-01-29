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
    <title>Create Profile</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>
<body>
    <div class="container mt-5">
    <form id="domain-form">
    <div class="mb-3">
        <label for="nom-input" class="form-label">Name:</label>
        <input type="text" class="form-control" id="nom-input" name="nom" required>
    </div>

    <div class="mb-3">
        <label for="description-input" class="form-label">Description:</label>
        <textarea class="form-control" id="description-input" name="description" required></textarea>
    </div>

    <div class="mb-3">
        <label for="salaire-moyen-input" class="form-label">Average Salary:</label>
        <input type="number" class="form-control" id="salaire-moyen-input" name="salaire_moyen" required>
    </div>

    <div class="mb-3">
        <label for="niveau-educ-input" class="form-label">Education Level :</label>
        <select class="form-select" id="niveau-educ-input" name="niveau_educ" required>
            <option value="">-- Select an Education Level --</option>
            <option value="Bac">Bac</option>
            <option value="Bac+2">Bac+2</option>
            <option value="Bac+3">Bac+3</option>
            <option value="Bac+5">Bac+5</option>
        </select>
    </div>

    <div class="mb-3">
        <label for="tendance-marche-input" class="form-label">Market Trend:</label>
        <select class="form-select" id="tendance-marche-input" name="tendance_marche" required>
            <option value="">-- Select a Market trend --</option>
            <option value="Growing">Growing</option>
            <option value="Declining">Declining</option>
            <option value="Stable">Stable</option>
        </select>
    </div>

    <button type="submit" class="btn btn-primary" id="inscription-button">Creation (An admin will have to accept it)</button>
</form>
    </div>

    <script src="../Controller/controllerCreateDomaine.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>

<?php
} else {
    header('Location: login.php');
    exit;
  }
  ?>
