import { Navbar } from "../nav.js";

let nav = document.querySelector("#nav");

let articulosCarrito = [];

document.addEventListener("DOMContentLoaded", () => {
  articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add-product")) {
    addProduct(e);
  }
  if (e.target.classList.contains("btn-remove-product")) {
    removeProduct(e);
  }
});

function addProduct(e) {
  e.preventDefault();
  const productoSeleccionado =
    e.target.parentElement.parentElement.parentElement;
  obtenerDatosProducto(productoSeleccionado);
  nav.innerHTML = Navbar();
}

function removeProduct(e) {
  e.preventDefault();
  const productoId = e.target.getAttribute("data-id");
  articulosCarrito = articulosCarrito.filter(
    (producto) => producto.id !== productoId
  );
  app.innerHTML = Checkout();
  guardarStorage();
<<<<<<< HEAD:components/Cart/checkout-view.js
  app.innerHTML = Checkout();
=======
  nav.innerHTML = Navbar();
>>>>>>> c0798a6011c167b20e68059de91d08725ae95732:components/Cart/checkout.js
}

function obtenerDatosProducto(producto) {
  /* Extraemos informacion del producto seleccionado */
  const productoAgregado = {
    imagen: producto.querySelector("img").src,
    nombre: producto.querySelector(".product-name").textContent,
    id: producto.getAttribute("id"),
    cantidad: 1,
  };
  const existe = articulosCarrito.some(
    (producto) => producto.id === productoAgregado.id
  );

  if (existe) {
    /* Agregar al carrito un producto ya existente */
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === productoAgregado.id) {
        producto.cantidad++;
        return producto;
      } else {
        return producto;
      }
    });
    articulosCarrito = [...productos];
  } else {
    /* Agregar al carrito un producto que no estaba antes*/
    articulosCarrito = [...articulosCarrito, productoAgregado];
  }
  guardarStorage();
}

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

export const Checkout = () => {
  let cartList = document.createElement("tbody");
  articulosCarrito.forEach((p) => {
    /* Destrucuring sobre el objeto p */
    const { nombre, imagen, cantidad, id } = p;

    const row = document.createElement("tr");
    row.innerHTML = `
                <td>
                    <img class="img-carrito" src="${imagen}" width=100>
                </td>
                <td>
                    ${nombre}
                </td>
                <td>
                    ${cantidad}
                </td>
                <td>
                    <a href="#" class="btn-remove-product" data-id="${id}"> Eliminar </a>
                </td>
                
            `;
    cartList.appendChild(row);
  });
  if (articulosCarrito.length === 0) {
    return `<div class="container">
            <h1>El carrito está vacío.</h1>
      </div>`;
  }
  return `
    <div class="container">

        <div class="card">
            <div class="card-content" id="tajeta-checkout">
                <div class="card-header">
                    <h1 class="text-left">Carrito</h1>
                </div>

                <div class="card-body">
                    <div class="d-flex justify-content-between finalizarCompra row">
                        <div class="col-md-5" id="">
                            <div class="container">
                                <div class="row carrito-checkout">
                                    <table id="carrito-checkout" class="u-full-width">
                                        <thead>
                                            <tr>
                                                <th>Producto</th>
                                                <th>Nombre</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        ${cartList.innerHTML}
                                    </table>
                                </div>
                                <br>

                            </div>
                        </div>
                        <div class="datosPersonales_finalizarCompra col-md-6">

                            <form onsubmit="return false" class="finalizarCompraForm">
                                <div class="form-row">
                                    <div class="col">
                                        <label for="nombre">Nombre</label>
                                        <input class="form-control" type="text" id="nombre"
                                            placeholder="Nombre y apellido">
                                    </div>
                                    <div class="col">
                                        <label for="email">Email</label>
                                        <input class="form-control" type="email" id="email" placeholder="mail@mail.com">
                                    </div>
                                    <div class="col">
                                        <label class="w-100" for="tel">Telefono</label>
                                        <input class="form-control" type="text" placeholder="(011) 1234 5678" id="tel">
                                    </div>
                                </div>

                                <div class="d-flex justify-content-center">
                                    <input class="btn btn-dark" style="width:100%; margin: 2rem;" id="btn-buy" type="submit" value="Realizar pedido">
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
    </div>


    `;
};
