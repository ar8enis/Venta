//? FORMATO DE MONEDA EN MXN
const MXNCurrency = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
});

var pageCounter = 1;
var tableLength = 0;

//? SE EJECUTA AL CARGAR EL DOM
window.addEventListener('DOMContentLoaded', async () => {
    createQuotationTable();
});

//! COTIZACIÓN EN PDF
const quotationDownload = async e => {

    const res = await getFolioSequence();
    const doc = new jsPDF('p', 'mm', 'a4');
    const table = document.querySelector('#tabla_productos');

    const customer_name = document.getElementById('customer_name').value;
    const customer_phone = document.getElementById('customer_phone').value;
    const customer_mail = document.getElementById('customer_mail').value;
    const customer_message = document.getElementById('customer_message').value;
    const customer_postal_code = document.getElementById('customer_postal_code').value;
    const { folio } = JSON.parse(res);

    if (customer_name.trim() === "") {
        alert('Por favor llena el campo "Nombre"');
        return;
    }

    if (customer_phone.trim() === "") {
        alert('Por favor llena el campo "Teléfono"');
        return;
    }

    if (customer_mail.trim() === "") {
        alert('Por favor llena el campo "Correo"');
        return;
    }

    if (customer_message.trim() === "") {
        alert('Por favor llena el campo "Mensaje"');
        return;
    }

    if (customer_postal_code.trim() === "") {
        alert('Por favor llena el campo "Código Postal"');
        return;
    }

    doc.autoTable({
        html: table,
        tableWidth: 190,
        pageBreak: 'auto',
        margin: {
            top: 100,
            left: 10,
            bottom: 10
        },
        styles: {
            lineColor: [0, 0, 0],
        },
        columnStyles: {
            0: { cellWidth: 100, halign: 'left' },
            1: { cellWidth: 30, halign: 'left' },
            2: { cellWidth: 30, halign: 'left' },
            3: { cellWidth: 30, halign: 'left' },
        },
        headStyles: {
            font: 'helvetica',
            fontStyle: 'bold',
            lineColor: [0, 0, 0],
            textColor: 20,
            lineWidth: 0.1,
            fillColor: [255, 255, 255],
            halign: 'left',
            valign: 'middle',
            cellPadding: 2,
        },
        bodyStyles: {
            fontSize: 9,
            fillColor: [255, 255, 255],
            halign: 'left',
            valign: 'middle',
            lineWidth: 0.1,
            fontStyle: 'normal',
            cellPadding: 2,
        },
        didDrawPage: function () {
            quotationLayout(doc, customer_name, customer_phone, customer_mail, customer_postal_code, folio);
        },
        willDrawCell: function (data) {
            if ((data.column.index === 0 || data.column.index === 3) && data.row.section === 'body' && data.row.index === tableLength) {
                doc.setFontStyle('bold');
            }
        },
    });

    const blob = doc.output('blob');

    try {
        await savePdf(blob, folio);
    } catch (error) {
        alert('Ocurrió un error al generar la cotización.');
        return;
    }

    sendMail(customer_name, customer_phone, customer_mail, customer_message, customer_postal_code, folio, table);
    localStorage.removeItem('productos');

    window.open(doc.output('bloburl'), '_blank', "toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,modal=yes,top=200,left=500,width=1200,height=900");

}

//! LAYOUT DEL PDF
const quotationLayout = (doc, name, phone, email, postal, folio) => {

    const img = new Image();
    const quotationFolio = `COT000${folio}`;
    const currentDate = dayjs(Date.now());
    const limitDate = currentDate.add(5, 'day');

    //? DATOS DE LA EMPRESA
    img.src = '../assets/img/logo.jpg';
    doc.addImage(img, 'JPG', 9, 3, 51, 58);

    doc.setFontSize(14);
    doc.setFontStyle('bold');
    doc.text(200, 10, 'Refrigeracion y Proyectos San Antonio.', 'right');
    
    doc.setFontSize(12);
    doc.setFontStyle('normal');
    doc.text(200, 15, 'Los expertos en refrigeración.', 'right');
    
    doc.setFontSize(10);
    // doc.text(10, 65, 'Calle Menorca #31 Fracc. Galaxias de Almecatla', 'left');
    doc.text(10, 65, 'Cuautlancingo, Puebla.', 'left');
    doc.text(10, 70, 'Código Postal: 72713', 'left');

    doc.setFontStyle('bold');
    doc.text(10, 85, 'Teléfono:', 'left');

    doc.setFontStyle('normal');
    doc.text(28, 85, '55 6792 3283', 'left');

    doc.setFontStyle('bold');
    doc.text(10, 90, 'Visítanos:', 'left');

    doc.setFontStyle('normal');
    doc.text(28, 90, 'www.refrigeracionyproyectossanantonio.com', 'left');

    doc.setFontStyle('bold');
    doc.text(10, 95, 'Correo:', 'left');

    doc.setFontStyle('normal');
    doc.text(28, 95, 'ventasrefrigeracion@refrigeracionyproyectossanantonio.com', 'left');

    //? DATOS DEL CLIENTE
    doc.setFontSize(12);
    doc.setFontStyle('bold');
    doc.text(200, 50, quotationFolio, 'right');

    doc.setFontSize(10);
    doc.text(200, 60, 'Cliente', 'right');
    doc.setFontStyle('normal');
    doc.text(200, 65, `Nombre: ${name.trim()}`, 'right');
    doc.text(200, 70, `Tel. ${phone.trim()}`, 'right');
    doc.text(200, 75, `Correo: ${email.trim()}`, 'right');
    doc.text(200, 80, `C.P. ${postal.trim()}`, 'right');

    doc.setFontSize(8);
    doc.text(200, 91, `Fecha de expedición: ${currentDate.format('DD/MM/YYYY')}`, 'right');
    doc.text(200, 95, `Fecha de vigencia: ${limitDate.format('DD/MM/YYYY')}`, 'right');

    doc.setFontSize(9);
    doc.text(10, 293, 'Quedo atento a cualquier comentario o duda que tenga acerca de mis productos o servicios', 'left');
    doc.text(200, 293, `${pageCounter}`, 'right');

    pageCounter++;
}

//* CONTRUCCIÓN DE LA TABLA HTML EN LA VISTA CARRITO
const createQuotationTable = () => {
    if (localStorage.getItem("productos") != null) {

        const array = JSON.parse(localStorage.getItem('productos'));

        if (array.length > 0) {

            $.ajax({
                url: '../../ajax.php',
                type: 'POST',
                async: true,
                data: {
                    action: 'buscar',
                    data: array
                },
                success: function (response) {

                    const totalArray = [];
                    const res = JSON.parse(response);

                    // AGRUPAMOS LOS PRODUCTOS POR NOMMBRE EN UN OBJETO
                    const reduceProducts = res.datos.reduce((acc, current) => {

                        const producto = current.nombre.trim();

                        acc[producto] = acc[producto] ?? [];
                        acc[producto].push(current);

                        return acc;

                    }, {});

                    const groupedProducts = Object.entries(reduceProducts).sort(); // SORT() PARA ORDENAR ALFABETICAMENTE
                    // [0] = NOMBRE DEL PRODUCTO
                    // [1] = LOS DATOS DEL PRODUCTO

                    let html = '';
                    groupedProducts.forEach(element => {

                        const productName = element[0];
                        const productPrice = parseInt(element[1][0].precio);
                        const productQuantity = element[1].length;
                        const productSubTotal = parseInt(productQuantity * productPrice)

                        html += `
                                <tr>
                                    <td style="padding: 5px;">${productName}</td>
                                    <td style="padding: 5px;text-align: right">${MXNCurrency.format(productPrice)}</td>
                                    <td style="padding: 5px;text-align: right">${productQuantity}</td>
                                    <td style="padding: 5px;text-align: right">${MXNCurrency.format(productSubTotal)}</td>
                                </tr>`;

                        totalArray.push(productSubTotal);
                    });

                    tableLength = totalArray.length;
                    const total = totalArray.reduce((acc, current) => { return acc + current }, 0);

                    html += `
                                <tr>
                                    <td colspan="3" style="font-weight: bolder; border-top: 2px solid #000;">TOTAL</td>
                                    <td style="font-weight: bolder; border-top: 2px solid #000;text-align: right">${MXNCurrency.format(total)}</td>
                                </tr>`;

                    $('#tblCarrito').html(html);
                    // $('#total_pagar').text(res.total);
                    // paypal.Buttons({
                    //     style: {
                    //         color: 'blue',
                    //         shape: 'pill',
                    //         label: 'pay'
                    //     },
                    //     createOrder: function(data, actions) {
                    //         // This function sets up the details of the transaction, including the amount and line item details.
                    //         return actions.order.create({
                    //             purchase_units: [{
                    //                 amount: {
                    //                     value: res.total
                    //                 }
                    //             }]
                    //         });
                    //     },
                    //     onApprove: function(data, actions) {
                    //         // This function captures the funds from the transaction.
                    //         return actions.order.capture().then(function(details) {
                    //             // This function shows a transaction success message to your buyer.
                    //             alert('Transaction completed by ' + details.payer.name.given_name);
                    //         });
                    //     }
                    // }).render('#paypal-button-container');
                },
                error: function (error) {
                    console.error(error);
                }
            });
        }
    }
}

//* OBTENEMOS EL FOLIO GUARDADO EN LA BASE DE DATOS
const getFolioSequence = async () => {

    const folio = $.ajax({
        url: '../../ajax.php',
        type: 'POST',
        async: true,
        data: {
            action: 'getFolio',
        },
        success: function (response) {

            const { folio } = JSON.parse(response);

            return folio;

        },
        error: function (error) {
            console.error(error);
        }
    });

    return folio

}

// ? ENVIAMOS EL CORREO CON LOS DATOS DEL CLIENTE Y EL PDF DE LA COTIZACIÓN COMO ARCHIVO ADJUNTO
const sendMail = async (name, phone, mail, message, postal, folio) => {

    const tableString = document.getElementById("tabla_contenedor").innerHTML;
    const emailHtmlBody = `<div style='display: flex; flex-direction: column; width: 100%; margin-top: 10px'>
                            <h4>Datos del cliente</h4>
                            <div style="display: flex; width: 100%; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 30px; margin-bottom: 30px;">
                                <div style="display: flex; flex-direction: row; gap: 20px; margin-bottom: 8px;">
                                    <label style="font-weight: bold; width: 120px;">Nombre:</label>
                                    <span>${name}</span>
                                </div>
                                <div style="display: flex; flex-direction: row; gap: 20px; margin-bottom: 8px;">
                                    <label style="font-weight: bold; width: 120px;">Teléfono:</label>
                                    <span>${phone}</span>
                                </div>
                                <div style="display: flex; flex-direction: row; gap: 20px; margin-bottom: 8px;">
                                    <label style="font-weight: bold; width: 120px;">Correo:</label>
                                    <span>${mail}</span>
                                </div>
                                <div style="display: flex; flex-direction: row; gap: 20px; margin-bottom: 8px;">
                                    <label style="font-weight: bold; width: 120px;">Código Postal:</label>
                                    <span>${postal}</span>
                                </div>
                                <div style="display: flex; flex-direction: row; gap: 20px; margin-bottom: 8px;">
                                    <label style="font-weight: bold; width: 120px;">Mensaje:</label>
                                    <span>${message}</span>
                                </div>
                            </div>
                            ${tableString}
                        </div>`;

    $.ajax({
        url: 'assets/php/send_mail.php',
        type: 'POST',
        async: true,
        data: {
            name: name,
            phone: phone,
            mail: mail,
            message: message,
            folio: folio,
            quotation: emailHtmlBody.trim()
        },
        error: function (error) {
            console.error(error);
        }
    });

}

//? FUNCIÓN PARA GUARDAR EL PDF EN EL PROYECTO Y ENVIARLO COMO ARCHIVO ADJUNTO
const savePdf = async (blob, folio) => {

    const form = new FormData();

    form.append('pdf', blob);
    form.append('filename', `COT000${folio}`);

    $.ajax('assets/php/create_pdf_file.php', {
        method: 'POST',
        data: form,
        processData: false,
        contentType: false,
    });
}