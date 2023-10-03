<?php
    require_once "../../config/conexion.php";

    $date = date("YmdHis");

    $action = $_POST['action'];
    $nombre = $_POST['product'];
    $cantidad = intval($_POST['quantity']);
    $descripcion = $_POST['description'];
    $p_normal = intval($_POST['price']);
    $p_rebajado = intval($_POST['priceOff']);
    $categoria = intval($_POST['category']);
    
    switch ($action) {
        case 'create':

            $img = $_FILES['image'];
            $name = $img['name'];
            $tmpname = $img['tmp_name'];
            $foto = $date . ".jpg";
            $destino = "../img/" . $foto;

            $query = mysqli_query($conexion, "INSERT INTO productos(nombre, descripcion, precio_normal, precio_rebajado, cantidad, imagen, id_categoria) VALUES ('$nombre', '$descripcion', '$p_normal', '$p_rebajado', $cantidad, '$foto', $categoria)");
            if ($query) {
                move_uploaded_file($tmpname, $destino);
            };

            break;
        case 'update':

            $id = intval($_POST['id']);
            $query = mysqli_query($conexion, "UPDATE productos SET nombre = '$nombre', descripcion = '$descripcion', precio_normal = '$p_normal', precio_rebajado = '$p_rebajado', cantidad = $cantidad, id_categoria = $categoria WHERE id = $id");

            if (isset($_FILES['image'])) {

                $img = $_FILES['image'];
                $name = $img['name'];
                $tmpname = $img['tmp_name'];
                $foto = $date . ".jpg";
                $destino = "../img/" . $foto;

                $queryImage = mysqli_query($conexion, "UPDATE productos SET imagen = '$foto' WHERE id = $id");

                if ($queryImage) {
                    move_uploaded_file($tmpname, $destino);
                };

            }

            break;

    }
?>
