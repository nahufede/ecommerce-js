import { Navbar } from "../nav.js";
import { getFirestore } from "../../firebase/firebase.js"
import { validateEmail } from "../../script.js"

let nav = document.querySelector("#nav");

let db = getFirestore();

let articulosCarrito = [];

document.addEventListener("DOMContentLoaded", () => {
  articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add-product")) {
    e.preventDefault();
    addProduct(e);
  }
  if (e.target.classList.contains("btn-remove-product")) {
    e.preventDefault();
    removeProduct(e);
  }
});

function addProduct(e) {
  e.preventDefault();
  const productoSeleccionado =
    e.target.parentElement.parentElement.parentElement;
  obtenerDatosProducto(productoSeleccionado);

  let cart = JSON.parse(localStorage.getItem("carrito")) || [];
  let productQuantity = 0;
  let i;

  for (i = 0; i < cart.length; i++) {
    productQuantity += cart[i].quantity;
  }

  let cartCount1 = document.querySelector('#lblCartCount1')
  let cartCount2 = document.querySelector('#lblCartCount2')

  cartCount1.innerText = productQuantity
  cartCount2.innerText = productQuantity

  if (cart.length > 0) {
    cartCount1.style.display = "block"
    cartCount2.style.display = "block"
  } else {
    cartCount1.style.display = "none"
    cartCount2.style.display = "none"
  }
} 

function removeProduct(e) {
  e.preventDefault();
  const productoId = e.target.getAttribute("data-id");
  articulosCarrito = articulosCarrito.filter(
    (producto) => producto.id !== productoId
  );
  app.innerHTML = Checkout();
  guardarStorage();
  
  let cart = JSON.parse(localStorage.getItem("carrito")) || [];
  let productQuantity = 0;
  let i;

  for (i = 0; i < cart.length; i++) {
    productQuantity += cart[i].quantity;
  }

  let cartCount1 = document.querySelector('#lblCartCount1')
  let cartCount2 = document.querySelector('#lblCartCount2')

  cartCount1.innerText = productQuantity
  cartCount2.innerText = productQuantity

  if (cart.length > 0) {
    cartCount1.style.display = "block"
    cartCount2.style.display = "block"
  } else {
    cartCount1.style.display = "none"
    cartCount2.style.display = "none"
  }

}

function obtenerDatosProducto(producto) {
  /* Extraemos informacion del producto seleccionado */
  const productoAgregado = {
    img: producto.querySelector("img").src,
    name: producto.querySelector(".product-name").textContent,
    id: producto.getAttribute("id"),
    quantity: 1,
  };
  const existe = articulosCarrito.some(
    (producto) => producto.id === productoAgregado.id
  );

  if (existe) {
    /* Agregar al carrito un producto ya existente */
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === productoAgregado.id) {
        producto.quantity++;
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

const checkoutFormValidation = () => {
  let checkoutForm = document.querySelector("#checkoutForm");

  let validation = 0

  for (let i = 0; i < 3; i++) {
    if (checkoutForm[i].value === "") {
      checkoutForm[i].classList.add("is-invalid");
      checkoutForm[i].classList.remove("is-valid");
      validation -= 1;
    } else {
      if (checkoutForm[i].getAttribute("type") === "email") {
        let email = checkoutForm[i].value;
        let response = validateEmail(email);
        if (response === true) {
          checkoutForm[i].classList.add("is-valid");
          checkoutForm[i].classList.remove("is-invalid");
        } else {
          checkoutForm[i].classList.add("is-invalid");
          checkoutForm[i].classList.remove("is-valid");
        }
      } else if (checkoutForm[i].getAttribute("name") === "telefono") {
        let number = checkoutForm[i].value;
        number = number.replaceAll(" ", "").replaceAll("-", "");
        if (!isNaN(Number(number)) && number.length >= 6) {
          checkoutForm[i].classList.add("is-valid");
          checkoutForm[i].classList.remove("is-invalid");
        } else {
          checkoutForm[i].classList.add("is-invalid");
          checkoutForm[i].classList.remove("is-valid");
        }
      } else {
        checkoutForm[i].classList.add("is-valid");
        checkoutForm[i].classList.remove("is-invalid");
        validation += 1;
      }
    }
  }

  let progressBar = document.querySelector(".progress-bar-1");

  const progressValidation = () => {
    let progressVal = [];

    for (let i = 0; i < 3; i++) {
      if(checkoutForm[i].classList.contains('is-valid')){
        progressVal.push(1);
      }
    }

    let progressForm = progressVal.reduce((a, b) => a + b, 0);

    switch (progressForm) {
      case 1:
        progressBar.style.width = "33%";
        break;
      case 2:
        progressBar.style.width = "66%";
        break;
      case 3:
        progressBar.style.width = "100%";
        break;
      default:
        progressBar.style.width = "0%";
        break;
    }
  };

  progressValidation();

  if (validation === 1) {
    checkoutForm[3].removeAttribute("disabled");
    checkoutForm[3].style.opacity = 1;
  }
};

window.addEventListener('change', ()=>{
  if(document.querySelector('#checkoutview')){
    checkoutFormValidation();
  }
})

window.addEventListener("click", (e) => {

  let checkoutForm = document.querySelector("#checkoutForm");

  if (e.target.getAttribute("id") === "checkoutbutton"){

    let cartCount1 = document.querySelector('#lblCartCount1')
    let cartCount2 = document.querySelector('#lblCartCount2')
    
    e.preventDefault();
    
    document.querySelector("#checkoutbutton").style.display = "none";
    document.querySelector(".loadingbtn").style.display = "block";

    let name = checkoutForm[0].value;
    let email = checkoutForm[1].value;
    let phone = Number(checkoutForm[2].value);
    let date = new Date().toLocaleDateString();
    let products = articulosCarrito;

    db.collection("orders")
      .add({
        user: {name, email, phone},
        products,
        date,
        send: false
      })
      .then(() => {
        articulosCarrito = [];
        guardarStorage();
        checkoutForm.reset();
        document.querySelector("#alertsuccess").style.display = "block";
        document.querySelector(".loadingbtn").style.display = "none";
        document.querySelector(".progress").style.display = "none";
        cartCount1.style.display = "none"
        cartCount2.style.display = "none"
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
});

export const Checkout = () => {

  let cartList = document.createElement("tbody");

  articulosCarrito.forEach((p) => {
    /* Destrucuring sobre el objeto p */
    const { name, img, quantity, id } = p;

    const row = document.createElement("tr");
    row.innerHTML = 
                `<td>
                    ${name}
                </td>
                <td>
                    ${quantity}
                </td>
                <td class="checkout-img" style="background-image: url('${img}')">
                </td>
                <td>
                    <i class="bi bi-trash-fill btn-remove-product" data-id="${id}"></i>
                </td>
                
            `;
    cartList.appendChild(row);
  });

  if (articulosCarrito.length === 0) {
    return `<div class="container py-5">
              <div className="row">
                <h1 class="fontzing text-center py-5">El carrito está vacío.</h1>
              </div>
            </div>`;
  }
  return `
  <div class="container-fluid">
    <div class="row" id="checkoutview">
      <div class="col-12">
        <h1 class="text-center fontzing m-0 py-5">Carrito</h1>
      </div>
      <div class="col-12 d-flex flex-wrap px-5">
        <div class="col-12 col-md-7 pb-3">
          <table id="carrito-checkout" class="u-full-width w-100">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Imagen</th>
                <th></th>
              </tr>
            </thead>
            ${cartList.innerHTML}
          </table>
        </div>
        <div class="col-12 col-md-5">
          <form id="checkoutForm" class="row g-3 d-flex flex-column align-items-center" onkeypress="if(event.keyCode == 13) event.returnValue = false;">
            <div class="form-floating">
              <input type="text" class="form-control" id="validationServer01" placeholder="Nombre" required>
              <label for="validationServer01" class="form-label" style="padding-left: 1.3rem;">Nombre</label>
              <div class="valid-feedback ps-2">
                Correcto!
              </div>
              <div id="validationServerUsernameFeedback" class="invalid-feedback ps-2">
                Elige un nombre
              </div>
            </div>
            <div class="form-floating">
              <input type="email" class="form-control" id="validationServer02" placeholder="Email" required>
              <label for="validationServer02" class="form-label" style="padding-left: 1.3rem;">Email</label>
              <div class="valid-feedback ps-2">
                Correcto!
              </div>
              <div id="validationServer02Feedback" class="invalid-feedback ps-2">
                Introduce un correo válido
              </div>
            </div>
            <div class="form-floating">
              <input type="text" class="form-control" name="telefono" id="validationServer03" placeholder="Teléfono"
                required>
              <label for="validationServer03" style="padding-left: 1.3rem;">Teléfono</label>
              <div class="valid-feedback ps-2">
                Correcto!
              </div>
              <div id="validationServer03Feedback" class="invalid-feedback ps-2">
                Introduce un número válido. Código de área sin 0 ni 15. Ej. +54 9 115 842 0029
              </div>
            </div>
            <div class="progress mb-3 px-0" style="width: 97%">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark progress-bar-1"
                role="progressbar" style="width: 0%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <button id="checkoutbutton" class="mybutton" style="opacity:0.6;" disabled="true"
              onkeypress="(e)=>{if(e.which === 13){return false}}" type="submit">FINALIZAR MI PEDIDO</button>
            <button class="mybutton loadingbtn" type="button" disabled style="display:none;">
              <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
              Enviando
            </button>
          </form>
        </div>
      </div>
      <div class="col-12" id="alertsuccess" style="display:none;">
            <svg xmlns="http://www.w3.org/2000/svg" style="display:none;">
                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </symbol>
            </svg>
            <div class="alert alert-success d-flex align-items-center justify-content-center mt-3" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                <div>
                  Pedido realizado éxitosamente! Pronto nos pondremos en contacto para concretar el envio.
                </div>
            </div>
        </div>
    </div>
  </div>`;
};
