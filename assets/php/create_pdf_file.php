<?php

    if (!is_dir($_SERVER['DOCUMENT_ROOT'].'/assets/pdf/')) {
        mkdir($_SERVER['DOCUMENT_ROOT'].'/assets/pdf/');
    }

    $filename = $_POST['filename'];

    move_uploaded_file($_FILES['pdf']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . '/assets/pdf/' . $filename . '.pdf');
?>