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
        $('#categoria_id').val('');
        $('#nombre').val('');
        $('#categoria_accion').val('create');
        $('#categorias').modal('show');
    })
    //productos
    $('#abrirProducto').click(function () {

        document.querySelector('#foto').setAttribute('required', true);

        $('#producto_id').val('');
        $('#producto_action').val('create');

        $('#nombre').val('');
        $('#cantidad').val('');
        $('#descripcion').val('');
        $('#p_normal').val('');
        $('#p_rebajado').val('');
        $('#categoria').val('');
        $('#foto').val('');

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

$('#form_productos').submit(function (e) {

    e.preventDefault();
    
    const id = document.querySelector('#producto_id');
    const action = document.querySelector('#producto_action');
    const product = document.querySelector('#nombre');
    const quantity = document.querySelector('#cantidad');
    const description = document.querySelector('#descripcion');
    const price = document.querySelector('#p_normal');
    const priceOff = document.querySelector('#p_rebajado');
    const category = document.querySelector('#categoria');
    const image = document.querySelector('#foto').files[0];

    const form = new FormData();
    form.append('id', id.value);
    form.append('action', action.value);
    form.append('product', product.value);
    form.append('quantity', quantity.value);
    form.append('description', description.value);
    form.append('price', price.value);
    form.append('priceOff', priceOff.value);
    form.append('category', category.value);
    form.append('image', image);

    $.ajax({
        url: '../assets/php/create_or_update_product.php',
        type: 'POST',
        async: true,
        processData: false,
        contentType: false,
        data: form,
        complete: function () {
            window.location.reload();
        },
        error: function (error) {
            console.error(error);
            alert('Ocurrió un error');
        }
    });

});

function editProductOnClick(row) {

    const { id, product, descripcion, price, priceoff, quantity, category } = row.dataset;

    document.querySelector('#foto').removeAttribute('required');

    $('#producto_id').val(id);
    $('#producto_action').val('update');

    $('#nombre').val(product);
    $('#cantidad').val(quantity);
    $('#descripcion').val(descripcion);
    $('#p_normal').val(price);
    $('#p_rebajado').val(priceoff);
    $('#categoria').val(category);

    $('#productos').modal('show');
}

$('#form_categorias').submit(function (e) {

    e.preventDefault();

    const id = document.querySelector('#categoria_id');
    const category = document.querySelector('#nombre');
    const action = document.querySelector('#categoria_accion');

    $.ajax({
        url: '../assets/php/create_or_update_category.php',
        type: 'POST',
        async: true,
        data: {
            id: id.value,
            category: category.value,
            action: action.value,
        },
        complete: function () {
            window.location.reload();
        },
        error: function (error) {
            console.error(error);
            alert('Ocurrió un error');
        }
    });

});

function editCategoryOnClick(row) {

    const { id, description } = row.dataset;

    $('#categoria_id').val(id);
    $('#categoria_accion').val('update');
    $('#nombre').val(description);

    $('#categorias').modal('show');

}
