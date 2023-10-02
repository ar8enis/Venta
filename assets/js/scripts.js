$(document).ready(function () {

    let productos = [];
    let items = {
        id: 0
    }
    
    const filesForDownload = [
        { path: "assets/catalogs/lavadora.pdf", name: "Catálogo de Lavadoras - 2023.pdf" },
        { path: "assets/catalogs/licuadoras.pdf", name: "Catálogo de Licuadoras - 2023.pdf" },
        { path: "assets/catalogs/refrigerador.pdf", name: "Catálogo de Refrigeradores - 2023.pdf" },
        { path: "assets/catalogs/ventiladores.pdf", name: "Catálogo de Ventiladores - 2023.pdf" },
    ];

    mostrar();
    $('.navbar-nav .nav-link[category="all"]').addClass('active');

    $('.nav-link').click(function () {
        let productos = $(this).attr('category');

        $('.nav-link').removeClass('active');
        $(this).addClass('active');

        $('.productos').css('transform', 'scale(0)');

        function ocultar() {
            $('.productos').hide();
        }
        setTimeout(ocultar, 400);

        function mostrar() {
            $('.productos[category="' + productos + '"]').show();
            $('.productos[category="' + productos + '"]').css('transform', 'scale(1)');
        }
        setTimeout(mostrar, 400);
    });

    $('.nav-link[category="all"]').click(function () {
        function mostrarTodo() {
            $('.productos').show();
            $('.productos').css('transform', 'scale(1)');
        }
        setTimeout(mostrarTodo, 400);
    });

    $('.agregar').click( function(e){
        e.preventDefault();
        const id = $(this).data('id');
        items = {
            id: id
        }
        productos.push(items);
        localStorage.setItem('productos', JSON.stringify(productos));
        mostrar();
    })
    $('#btnCarrito').click(function(e){
        $('#btnCarrito').attr('href','carrito.php');
    })
    $('#btnVaciar').click(function(){
        localStorage.removeItem("productos");
        $('#tblCarrito').html('');
        $('#total_pagar').text('0.00');
    })
    //categoria
    $('#abrirCategoria').click(function(){
        $('#categorias').modal('show');
    })
    //productos
    $('#abrirProducto').click(function () {
        $('#productos').modal('show');
    })
    $('.eliminar').click(function(e){
        e.preventDefault();
        if (confirm('Esta seguro de eliminar?')) {
            this.submit();
        }
    });
    $('#download_catalogs').click(function (e) {
        e.preventDefault();

        const temporaryLink = document.createElement("a");
        temporaryLink.style.display = 'none';

        document.body.appendChild(temporaryLink);

        for(let i = 0; i < filesForDownload.length; i++ ){

            const download = filesForDownload[i];

            temporaryLink.setAttribute( 'href', download.path );
            temporaryLink.setAttribute( 'download', download.name );

            temporaryLink.click();

        }

    })
});

function mostrar(){
    if (localStorage.getItem("productos") != null) {
        let array = JSON.parse(localStorage.getItem('productos'));
        if (array) {
            $('#carrito').text(array.length);
        }
    }
}
