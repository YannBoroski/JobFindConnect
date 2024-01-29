<?php
session_start();
if (isset($_SESSION['user_id'][0])) {
?>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../img/JFC-favicon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="../style.css">
    <style>
    @media (min-width: 768px) {
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .navbar .navbar-nav {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .navbar .navbar-nav .nav-item {
        margin-left: 5px;
        margin-right: 5px;
    }

    .navbar-main-content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .navbar-profile-section {
        margin-left: auto;
        margin-right: 5px;
    }
}

    @media (max-width: 767px) {
    #navbarNavDropdown {
        text-align: center;
    }

    #navbarNavDropdown ul {
        width: 100%;
        justify-content: center;
    }

    #navbarNavDropdown .profile-nav {
        margin: 0 auto;
    }
}
    </style>
</head>

<header>
    <nav class="navbar navbar-expand-md text centered-nav">
        <a href="home.php"><img src="../img/logo-JFC.png" alt="Home" style="height: 130px; width: 130px;" class="home-logo"></a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <div class="navbar-main-content">
                <ul class="navbar-nav center-items">
                    <li class="nav-item"><a class="nav-link" href="./home.php">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="./advertisement-show-page.php">Find a job</a></li>
                    <li class="nav-item"><a class="nav-link" href="./entreprise-liste.page.php">Find a company</a></li>
                    <li class="nav-item"><a class="nav-link" href="./domaine-show-page.php">Domains</a></li>
                    <li class="nav-item"><a class="nav-link" href="./messages-show-page.php">Messages</a></li>
                </ul>
            </div>

            <div class="navbar-profile-section">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">My profile</a>
                        <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item" href="profil-page.php">Edit my profile</a>
                            <a class="dropdown-item" href="" id="disconnect">Disconnect</a>
                            <a class="dropdown-item" href="./user-show-page.php?id=<?php echo $_SESSION['user_id'][0]['id']; ?>">My public profile</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <script src="../Controller/controllerLogout.js"></script>
</header>
    <?php
} else {
    
?>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../img/JFC-favicon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="../style.css">
    <style>
    @media (min-width: 768px) {
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .navbar .navbar-nav {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .navbar .navbar-nav .nav-item {
            margin-left: 5px;
            margin-right: 5px;
        }

        .navbar-main-content {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .navbar-profile-section {
            margin-left: auto;
            margin-right: 5px;
        }
    }

    @media (max-width: 767px) {
        #navbarNavDropdown {
            text-align: center;
        }

        #navbarNavDropdown ul {
            width: 100%;
            justify-content: center;
        }

        #navbarNavDropdown .profile-nav {
            margin: 0 auto;
        }
    }
    </style>
</head>
<header>
    <nav class="navbar navbar-expand-md text">
        <a href="home.php"><img src="../img/logo-JFC.png" alt="Home" style="height: 130px; width: 130px;" class="home-logo"></a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <div class="navbar-main-content">
            <ul class="navbar-nav center-items">
                <li class="nav-item"><a class="nav-link" href="./home.php">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="./advertisement-show-page.php">Find a job</a></li>
                <li class="nav-item"><a class="nav-link" href="./entreprise-liste.page.php">Find a company</a></li>
            </ul>
        </div>

        <div class="navbar-profile-section">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="./inscription-page.php">Register</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./login.php">Login</a>
                </li>
            </ul>
        </div>
    </div>
    </nav>
</header>
<?php
  }
  ?>