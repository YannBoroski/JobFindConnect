<?php 
include "./header.php"
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to JFC (JobFindConnect)</title>
    <link rel="icon" type="image/x-icon" href="../img/JFC-favicon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="../style.css">
    <style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: 'Work Sans', sans-serif;
        background-color: #f0f2f5;
    }
    .content-center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: calc(100vh);
    }
    h2 {
        margin-top: -25px;
        margin-bottom: 20px;
        text-align: center;
    }
    .image-container {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }
    img {
        max-width: 100%;
        height: auto;
    }
    .card-container {
        display: flex;
        gap: 20px;
    }
    .no-wrap {
    white-space: nowrap;
    }
    </style>
</head>
<body>
    <div class="content-center">
        <h2><i class="fa-solid fa-briefcase"></i>   Welcome to Job Find Connect!  <i class="fa-solid fa-briefcase"></i></h2>
        <div class="image-container">
            <img src="../img/JFC_home_img.jpg" alt="JFC home page picture">
        </div>
        <div class="card-container">
            <div class="card" style="width: 18rem;">
                <div class="card-body text-center">
                    <h5 class="card-title no-wrap">Looking for a job ? <i class="fa-solid fa-magnifying-glass"></i></h5>
                    <a href="advertisement-show-page.php"><button class="btn btn-primary">See jobs</button></a>
                </div>
            </div>
            <div class="card" style="width: 18rem;">
                <div class="card-body text-center">
                    <h5 class="card-title no-wrap">Looking for a company ? <i class="fa-solid fa-magnifying-glass"></i></h5>
                    <a href="entreprise-liste.page.php"><button class="btn btn-primary">See companies</button></a>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/97643acdd7.js" crossorigin="anonymous"></script>
</body>
</html>