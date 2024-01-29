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
    <title>Domains</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <style>
      td img {
        width: 15vh;
        height: 15vh;
        object-fit: cover;
        border-radius: 50%;
      }
      td button {
        float:right;
        margin-left :2vh;
}
td {
  margin:1vh;
}
    </style>
</head>

<body>
  <div class="container-fluid">
    <div id ="corpsDomaine" class="table-responsive">
    <table id="myTable" class="table table-stripped">
  </table>
  
    </div>
    <div class="text-center">
    <a class="btn btn-primary align-center" href="./domaine-creation-page.php" role="button">Create your domain</a>
    </div>
    </div>
    <script src="../Controller/controllerDomaine.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

</body>

</html>
<?php
} else {
    header('Location: login.php');
    exit;
  }
  ?>
