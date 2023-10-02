<?php
require_once "config/conexion.php";
if (isset($_POST)) {
    if ($_POST['action'] == 'buscar') {
        $array['datos'] = array();
        $total = 0;
        for ($i=0; $i < count($_POST['data']); $i++) { 
            $id = $_POST['data'][$i]['id'];
            $query = mysqli_query($conexion, "SELECT * FROM productos WHERE id = $id");
            $result = mysqli_fetch_assoc($query);
            $data['id'] = $result['id'];
            $data['precio'] = $result['precio_rebajado'];
            $data['nombre'] = $result['nombre'];
            $total = $total + $result['precio_rebajado'];
            array_push($array['datos'], $data);
        }
        $array['total'] = $total;
        echo json_encode($array);
        die();
    }

    if ($_POST['action'] === 'getFolio') {

        $query = mysqli_query($conexion, "SELECT folio FROM folio");
        $result = mysqli_fetch_assoc($query);

        $folio = intval($result['folio']) + 1;
        $updateQuery = mysqli_query($conexion, "UPDATE folio SET folio = $folio WHERE id = 1");

        echo json_encode($result);
        die();
    }


}

?>