<?php
include "header.php"
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Company page</title>
    <!--BOOTSTRAP-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <style>
.container.mt-5 {
    padding: 20px;
    background-color: #F5F5F5;
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
    </style>
</head>
<body>
    <div class="container mt-5" style="background-color: #F5F5F5;">
        <!--<div class="card border-0 shadow-lg p-4">-->
            <div class="card-body" id="card-body-entreprise">
                <div class="row mb-4">
                    <div class="col-md-6">
                        <h2>Nom de l'entreprise</h2>
                        <h6>Website:<a href=""></a></h6>
                        <p>Description de l'entreprise</p>
                   </div>
                     <div class="col-md-6 text-center">
                        <img src="#" alt="Company logo" id="entreprise-logo" class="img-fluid rounded-circle shadow" style="max-width: 200px;">
                    </div>
                </div>

                <hr>

                <div class="row mt-4">
                    <div class="col-md-6">
                        <strong>Industry:</strong> <span id="entreprise-secteur"></span>
                        <br>
                        <strong>Size:</strong> <span id="entreprise-taille"></span>
                        <br>
                        <strong>Creation date:</strong> <span id="entreprise-date-fondation"></span>
                        <br>
                        <strong>Headquarters:</strong> <span id="entreprise-siegeSocial"></span>
                    </div>
                    <div class="col-md-6">
                        <strong>Mail:</strong> <span id="entreprise-mail"></span>
                        <br>
                        <strong>Phone:</strong> <span id="entreprise-phone"></span>
                        <br>
                        <strong>Verified:</strong> <span id="entreprise-estVerifiee"></span>
                        <br>
                        <strong>CEO ID:</strong> <span id="entreprise-pdg-id"></span>
                    </div>
                </div>
                <hr>
                <div class="row mt-4">
                    <div class="col-md-6">
                        <strong>Score:</strong> <span id="entreprise-score"></span>
                    </div>
                    <div class="col-md-6">
                        <strong>Number of ads:</strong> <span id="entreprise-nombre-Ads"></span>
                    </div>
                </div>
                <hr>
                <div class="row mt-4">
                    <div class="col-md-12">
                        <strong>Address (if different from the head office) :</strong>
                        <p id="entreprise-adresseSiPasSiegeSocial"></p>
                    </div>
                </div>
            </div>
        <!--</div>-->
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="../Controller/controllerEntreprise.js"></script>
</body>
</html>