<?php require_once "config/conexion.php"; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Refrigeración y Proyectos San Antonio.</title>

    <meta charset="utf-8" />
    <meta name="title" content="Refrigeración y Proyectos San Antonio." />
    <meta name="description" content="Los expertos en refrigeración." />
    <meta property="og:image" content="assets/img/logo.jpg" />
    <meta property="og:image:type" content="image/jpg" />
    <meta property="og:image:width" content="436" />
    <meta property="og:image:height" content="228" />
    <meta name="theme-color" content=" #000000" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Favicon-->
    <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
    <!-- Bootstrap icons-->
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" /> -->
    <!-- Core theme CSS (includes Bootstrap)-->
    <link href="assets/css/styles.css" rel="stylesheet" />
    <link href="assets/css/estilos.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
</head>
<style type="text/css">

    .btn-wsp{
        position: fixed;
        width: 55px;
        height: 55px;
        line-height: 55px;
        bottom: 110px;
        right: 30px;
        background: #0df053;
        color: #fff;
        border-radius: 50px;
        text-align: center;
        font-size: 30px;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.3);
        z-index: 100;
    }

    .btn-mail{
        position: fixed;
        width: 55px;
        height: 55px;
        line-height: 55px;
        bottom: 170px;
        right: 30px;
        background: #D6320E;
        color: #fff;
        border-radius: 50px;
        text-align: center;
        font-size: 30px;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.3);
        z-index: 100;
    }

    .btn-mail:hover{
        opacity: 0.7;
        color: white !important;
    }

    .btn-dnw{
        position: fixed;
        width: 55px;
        height: 55px;
        line-height: 55px;
        bottom: 230px;
        right: 30px;
        background: #0066ff;
        color: #fff;
        border-radius: 50px;
        text-align: center;
        font-size: 30px;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.3);
        z-index: 100;
    }

    .btn-dnw:hover{
        opacity: 0.7;
        color: white !important;
    }

    .btn-wsp:hover{
        text-decoration: none;
        color: #0df053;
        background: #fff;
    }

</style>
<body>
    <!-- //* BOTÓN CARRITO -->
    <a href="#" class="btn-flotante" id="btnCarrito">
        Carrito
        <span class="badge bg-success" id="carrito">0</span>
    </a>
    <!-- //* BOTÓN EMAIL -->
    <a href="mailto:ventasrefrigeracion@refrigeracionyproyectossanantonio.com?subject=Cotizacion" class="btn-mail" title="Contactanos">
        <i class="fa fa-envelope"></i>
    </a>
    <!-- //* BOTÓN WHATSAPP -->
    <a href="http://api.whatsapp.com/send?phone=+522224267863" class="btn-wsp" target="_blank" title="Contactanos">
        <i class="fa fa-whatsapp";></i>
    </a>
    <!-- //* BOTÓN CATÁLOGOS -->
    <a href="#" id="download_catalogs" class="btn-dnw" title="Descargar catálogos">
        <i class="fa fa-download" aria-hidden="true"></i>
    </a>

    <!-- Navigation-->
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <!--a class="navbar-brand" href="#">Vida Informático</a-->
                <h1><img width="150" height="150" src="assets\img/logo.jpg"></h1>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <a href="#" class="nav-link text-info" category="all">Todo</a>
                        <?php
                            $query = mysqli_query($conexion, "SELECT * FROM categorias");
                            while ($data = mysqli_fetch_assoc($query)) { ?>
                                <a href="#" class="nav-link" category="<?php echo $data['categoria']; ?>"><?php echo $data['categoria']; ?></a>
                            <?php }
                        ?>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    <!-- Header-->
    <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder">Refrigeracion y Proyectos San Antonio</h1>
                <p class="lead fw-normal text-white-50 mb-0">Los expertos en refrigeración.</p>
            </div>
        </div>
    </header>
    <section class="py-5">
        <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <?php
                $query = mysqli_query($conexion, "SELECT p.*, c.id AS id_cat, c.categoria FROM productos p INNER JOIN categorias c ON c.id = p.id_categoria");
                $result = mysqli_num_rows($query);
                if ($result > 0) {
                    while ($data = mysqli_fetch_assoc($query)) { ?>
                        <div class="col mb-5 productos" category="<?php echo $data['categoria']; ?>">
                            <div class="card h-100">
                                <!-- Sale badge-->
                                <div class="badge bg-danger text-white position-absolute" style="top: 0.5rem; right: 0.5rem"><?php echo ($data['precio_normal'] > $data['precio_rebajado']) ? 'Oferta' : ''; ?></div>
                                <!-- Product image-->
                                <img class="card-img-top" src="assets/img/<?php echo $data['imagen']; ?>" alt="..." />
                                <!-- Product details-->
                                <div class="card-body p-4">
                                    <div class="text-center">
                                        <!-- Product name-->
                                        <h5 class="fw-bolder"><?php echo $data['nombre'] ?></h5>
                                        <p><?php echo $data['descripcion']; ?></p>
                                        <!-- Product reviews-->
                                        <div class="d-flex justify-content-center small text-warning mb-2">
                                            <div class="bi-star-fill"></div>
                                            <div class="bi-star-fill"></div>
                                            <div class="bi-star-fill"></div>
                                            <div class="bi-star-fill"></div>
                                            <div class="bi-star-fill"></div>
                                        </div>
                                        <!-- Product price-->
                                        <span class="text-muted text-decoration-line-through"><?php echo $data['precio_normal'] ?></span>
                                        <?php echo $data['precio_rebajado'] ?>
                                    </div>
                                </div>
                                <!-- Product actions-->
                                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center"><a class="btn btn-outline-dark mt-auto agregar" data-id="<?php echo $data['id']; ?>" href="#">Agregar al carrito</a></div>
                                </div>
                            </div>
                        </div>
                <?php  }
                } ?>

            </div>
        </div>
    </section>
    <!-- Footer-->
    <footer class="py-5 bg-dark">
        <div class="container">
            <p class="m-0 text-center text-white">Copyright &copy; refrigeracionyproyectossanantonio 2021</p>
        </div>
    </footer>
    <!-- Bootstrap core JS-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Core theme JS-->
    <script src="assets/js/jquery-3.6.0.min.js"></script>
    <script src="assets/js/scripts.js"></script>
</body>

</html>