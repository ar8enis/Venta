<?php require_once "config/conexion.php";
require_once "config/config.php";
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Carrito de Compras</title>
    <!-- Favicon-->
    <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
    <!-- Bootstrap icons-->
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" /> -->
    <!-- Core theme CSS (includes Bootstrap)-->
    <link href="assets/css/styles.css" rel="stylesheet" />
    <link href="assets/css/estilos.css" rel="stylesheet" />
    <!-- JSPDF -->
    <script src="https://unpkg.com/jspdf@1.5.3/dist/jspdf.min.js"></script>
    <!-- JSPDF AUTOTABLE -->
    <script src="https://unpkg.com/jspdf-autotable@3.5.3/dist/jspdf.plugin.autotable.js"></script>
    <!--  -->

</head>

<body>
    <!-- Navigation-->
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="./">< Volver</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    </div>
    <!-- Header-->
    <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder">Carrito</h1>
                <p class="lead fw-normal text-white-50 mb-0">Tus Productos Agregados.</p>
            </div>
        </div>
    </header>
    <section class="py-5">
        <div class="container px-4 px-lg-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table id="tabla_productos" class="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Producto</th>
                                    <th style="text-align: right">Precio</th>
                                    <th style="text-align: right">Cantidad</th>
                                    <th style="text-align: right">Sub Total</th>
                                </tr>
                            </thead>
                            <tbody id="tblCarrito">

                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-md-8 col-sm-12 mt-20">
                    <h3 style="margin-bottom: 30px">Datos de contacto</h3>
                    <div class="mt-20 contact-form-item">
                        <label aria-required for="customer_name">Nombre:</label>
                        <input id="customer_name" type="text">
                    </div>
                    <div class="mt-20 contact-form-item">
                        <label aria-required for="customer_phone">Teléfono:</label>
                        <input placeholder="Número de teléfono a 10 dígitos" id="customer_phone" type="tel" pattern="[0-9]{10}" max="10">
                    </div>
                    <div class="mt-20 contact-form-item">
                        <label aria-required for="customer_postal_code">Código Postal:</label>
                        <input id="customer_postal_code" type="tel" pattern="[0-9]{5}" max="5">
                    </div>
                    <div class="mt-20 contact-form-item">
                        <label aria-required for="customer_mail">Correo:</label>
                        <input id="customer_mail" type="email">
                    </div>
                    <div class="mt-20 contact-form-item">
                        <label aria-required for="customer_message">Mensaje:</label>
                        <textarea id="customer_message"></textarea>
                    </div>

                    <button onClick="quotationDownload();" class="btn btn-primary mt-5">Descargar cotización</button>
                    <!-- <h4>Total a Pagar: <span id="total_pagar">0.00</span></h4>
                    <div class="d-grid gap-2">
                        <div id="paypal-button-container"></div>
                        <button class="btn btn-warning" type="button" id="btnVaciar">Vaciar Carrito</button>
                    </div> -->
                </div>
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
    <!-- <script src="https://www.paypal.com/sdk/js?client-id=<?php echo CLIENT_ID; ?>&locale=<?php echo LOCALE; ?>&currency=MXN"></script> -->
    <script src="assets/js/scripts.js"></script>
    <script src="assets/js/cotización.js"></script>
</body>

</html>