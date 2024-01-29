<?php
include "header.php"
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile</title>
    <!--BOOTSTRAP-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <style>
.container.mt-5 {
    padding: 20px;
    border-radius: 10px;
}

#entreprise-logo {
    margin-top: -20px;
}

.content{
    padding-top: -100px;
}

.card border-0 p-4 {
    background-color: #F5F5F5;
}

.card-body > .row.mb-4 {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-body h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.card-body h6 a {
    color: #007BFF;
    text-decoration: none;
}

.card-body h6 a:hover {
    text-decoration: underline;
}

#entreprise-logo {
    max-width: 200px;
    border: 3px solid #ddd;
    padding: 5px;
}

.row.mt-4 > div.col-md-6 {
    padding: 10px;
}

.card-body strong {
    font-size: 16px;
    margin-right: 5px;
}

#entreprise-adresseSiPasSiegeSocial {
    margin-top: 10px;
}

.show-more-button {
    margin-top: 10px;
}
body {
  background-color: rgb(245, 245, 245);
}
    </style>
</head>
<body>
    <div class="container mt-5">
            <div class="card-body" id="card-body-profile">

            </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="../Controller/controllerPublicProfile.js"></script>
</body>
</html>