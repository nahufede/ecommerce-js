const carritoCheckout = document.querySelector('#carrito-checkout tbody');
var productosCarritoCheckout = JSON.parse(localStorage.getItem('carrito'))
const contenedorCarrito = document.querySelector('#listado-carrito tbody');

function vaciarCarrito() {
    borrarHTML();
    articulosCarrito = [];
    guardarStorage();
}

function guardarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function borrarHTML() {

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    productosCarritoCheckout.forEach(p => {
        /* Destrucuring sobre el objeto p */
        const { nombre, imagen, precio, cantidad, id } = p;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img class="img-carrito" src="${imagen}" width=100>
        </td>
        <td>
            ${nombre}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        
    `
        carritoCheckout.appendChild(row);
    });
})

const arrayPrecios = [];

document.addEventListener('DOMContentLoaded', () => {
    productosCarritoCheckout.forEach(p => {
        var { nombre, imagen, precio, cantidad, id } = p;
        precio = precio.replace('$', '')
        arrayPrecios.push(parseInt(precio));
        var sumaTotal = 0;
        for (let i of arrayPrecios) sumaTotal += i;
        $('#totalCarrito').html(sumaTotal);
        calcularCuotas(sumaTotal);
    });
    function calcularCuotas(total) {
        $("#tres-cuotas").html("3 cuotas sin interés de $ " + parseInt(total / 3));
        $("#seis-cuotas").html("6 cuotas sin interés de $ " + parseInt(total / 6));
        $("#doce-cuotas").html("12 cuotas sin interés de $ " + parseInt(total / 12));
    }
})

$('body').on('submit', '.finalizarCompraForm', function (e) {

    let nombre = e.target[0].value;
    let email = e.target[1].value;
    let tel = e.target[2].value;
    let cuotas = e.target[3].value.replaceAll('_', ' Cuotas de: $');
    let creditCardNumber = e.target[4].value;
    let creditCardName = e.target[5].value;
    let creditCardCVC = e.target[6].value;
    let creditCardDesde = e.target[7].value;
    let credictCardHasta = e.target[8].value;
    let url = "https://jsonplaceholder.typicode.com/posts";

    if (nombre == '' || email == '' || tel == '' || creditCardNumber == '' || creditCardName == '' || creditCardCVC == '' || creditCardDesde == '' || credictCardHasta == '') {
        alert("No ingresaste los datos solicitados! Intentalo de nuevo completando todos los campos")

    } else {
        // SIMULACIÓN DE AJAX POST
        $.ajax({
            url: url,
            type: 'POST',
            data: {
                nombre: nombre,
                email: email,
                tel: tel,
                cuotas: cuotas,
                creditCardNumber: creditCardNumber,
                creditCardName: creditCardName,
                creditCardCVC: creditCardCVC,
                creditCardDesde: creditCardDesde,
                credictCardHasta: credictCardHasta,
            },
            beforeSend: function () {
                vaciarCarrito()
                $('#tajeta-checkout').hide()

            },
            success: function (data) {
                compraRealizadaConExito(data);

            },
        });
    }
});

let compraRealizadaConExito = (data) => {
    let creditCardNumberLast4 = data.creditCardNumber.substr(16)
    let mensajeCompra = `
        <div class="col-md-12">
            <h1>¡Gracias por elegirnos ${data.nombre}!</h1>
            <p><strong>El pago fue realizado con éxito con la tarjeta número: **** - **** - **** - ${creditCardNumberLast4}</strong></p>
            <p>Corroborá las instrucciones de retiro en tu correo: <strong>${data.email}</strong></p>
        </div>
    `;
    $('#card-success').append(mensajeCompra)
    $('#card-success').show()
}