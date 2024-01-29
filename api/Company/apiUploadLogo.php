<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        print_r($file);
        $targetDirectory = '../../img/imgCompanies/';

        $targetFile = $targetDirectory . $file['name'];

        $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
        $allowedExtensions = array('jpg', 'jpeg', 'png', 'gif');

        if (in_array($fileType, $allowedExtensions)) {
            if (move_uploaded_file($file['tmp_name'], $targetFile)) {
                echo "File uploaded successfully.";
            } else {
                echo "Error: Unable to move the file to the target directory.";
            }
        } else {
            echo "Error: Invalid file type. Allowed types are jpg, jpeg, png, and gif.";
        }
    } else {
        echo "Error: No file uploaded.";
    }
} else {
    echo "Error: Invalid request method.";
}
?>
