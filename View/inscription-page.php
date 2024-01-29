<?php
include "header.php"
?>
<!DOCTYPE html>
<html lang="en">
<?php
session_start();

// if (isset($_SESSION['user_id'])) {
?>
  <?php
// } else {
//     header('Location: login.php');
//     exit;
//   }
  ?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Profile</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>
<body>
    <div class="container mt-5">
        <form id="inscription-form">
            <div class="mb-3">
                <label for="username-input" class="form-label">Username:</label>
                <input type="text" class="form-control" id="username-input" name="username" required>
            </div>

            <div class="mb-3">
                <label for="password-input" class="form-label">Password:</label>
                <input type="password" class="form-control" id="password-input" name="password" required>
            </div>

            <div class="mb-3">
                <label for="firstname-input" class="form-label">First Name:</label>
                <input type="text" class="form-control" id="firstname-input" name="firstname" required>
            </div>

            <div class="mb-3">
                <label for="lastname-input" class="form-label">Last Name:</label>
                <input type="text" class="form-control" id="lastname-input" name="lastname" required>
            </div>

            <div class="mb-3">
                <label for="birth-date-input" class="form-label">Birth Date:</label>
                <input type="date" class="form-control" id="birth-date-input" name="birth_date" required>
            </div>

            <div class="mb-3">
                <label for="mail-input" class="form-label">Email:</label>
                <input type="email" class="form-control" id="mail-input" name="mail" required>
            </div>

            <div class="mb-3">
                <label for="role-input" class="form-label">Role:</label>
                <select class="form-select" id="role-input" name="role" required>
                    <option value="">-- Select a role --</option>
                    <option value="User">User</option>
                    <option value="Entreprise">Entreprise</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="phone-input" class="form-label">Phone:</label>
                <input type="tel" class="form-control" id="phone-input" name="phone">
            </div>

            <div class="mb-3">
                <label for="visibilitee-input" class="form-label">Visibility:</label>
                <select class="form-select" id="visibilitee-input" name="visibilitee">
                    <option value="">-- Select a visibility --</option>
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary" id="inscription-button">Inscription</button>
        </form>
    </div>

    <script src="../Controller/controllerCreateUser.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>
