<?php
    require_once "../../config/conexion.php";

    $action = $_POST['action'];

    switch ($action) {
        case 'create':

            $category = $_POST['category'];
            $query = mysqli_query($conexion, "INSERT INTO categorias(categoria) VALUES ('$category')");

            break;
        case 'update':

            $id = $_POST['id'];
            $category = $_POST['category'];
            $query = mysqli_query($conexion, "UPDATE categorias SET categoria = '$category' WHERE id = $id");

            break;

    }
?>
