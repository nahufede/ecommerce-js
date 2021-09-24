import { getOrders } from "../../firebase/db-calls.js";
import { getFirestore } from "../../firebase/firebase.js";
import { auth } from "../../firebase/firebase.js";

let db = getFirestore();
let app = document.querySelector("#app");

window.addEventListener("click", async (e) => {
  let focus = e.target;

  if (focus.getAttribute("id") === "entregado") {
    e.preventDefault();

    let orderId =
      focus.parentElement.parentElement.parentElement.getAttribute("id-order");

    let confirmacion = confirm("Desea marcar la órden como enviada?");

    if (confirmacion) {
      var docRef = db.collection("orders").doc(orderId);

      return docRef
        .update({
          send: true,
        })
        .then(()=>{
          app.innerHTML = Orders();
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
  }

  if (focus.getAttribute("id") === "renew") {
    e.preventDefault();

    let orderId =
      focus.parentElement.parentElement.parentElement.getAttribute("id-order");

    let confirmacion = confirm("Desea marcar la órden como nueva?");

    if (confirmacion) {
      var docRef = db.collection("orders").doc(orderId);

      return docRef
        .update({
          send: false,
        })
        .then(()=>{
          app.innerHTML = Orders();
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
  }

  if (focus.parentElement.classList.contains("deleteOrder")) {
    e.preventDefault();

    let id = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('id-order');

    let confirmacion = confirm("Desea eleminar el pedido?");

    if (confirmacion) {
      db.collection("orders")
        .doc(id)
        .delete()
        .then(() => {
          console.log("documento eliminado");
          app.innerHTML = Orders();
        })
        .catch((error) => {
          console.error("error ->", error);
        });
      }
  }
});

export const Orders = () => {
  getOrders().then((orders) => {

    document.querySelector(".spinner1").style.display = "none";

    if (orders.length === 0) {
      document.querySelector("#new-orders h5").style.display = "block";
    }

    let newOrdersContainer;

    let orderList = document.createElement("div");
    orderList.className = "row justify-content-center";

    if (document.querySelector("#new-orders")) {
      newOrdersContainer = document.querySelector("#new-orders");
    }

    orders.forEach((el, index) => {
      /* Destrucuring sobre el objeto */

      const { user, date, id, products } = el;
      const { name, email, phone } = user;

      let cartList = document.createElement("tbody");

      products.forEach((product) => {
        const { name, img, quantity, id } = product;

        const row = document.createElement("tr");
        row.setAttribute("id", id);
        row.innerHTML = `<td>
                        ${name}
                    </td>
                    <td>
                        ${quantity}
                    </td>
                    <td class="checkout-img" style="background-image: url('${img}')">
                    </td>
                `;
        cartList.appendChild(row);
      });

      const card = document.createElement("div");
      card.className = "accordion accordion-flush";
      card.setAttribute("id", "accordionFlushExample");
      card.innerHTML = `<div class="accordion-item">
        <h2 class="accordion-header" id="flush-heading${id}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${id}" aria-expanded="false" aria-controls="flush-collapse${id}"><i class="bi bi-calendar3 me-2"></i>${date}</button>
        </h2>
        <div id="flush-collapse${id}" class="accordion-collapse collapse" aria-labelledby="flush-heading${id}" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body" id-order="${id}">
            <div class="col-12 d-flex flex-wrap" style="min-height: 15rem;">
              <div class="col-12 col-md-4 d-flex flex-column justify-content-between">
               <p class="m-0"><i class="bi bi-person me-2"></i>${name}</p>
               <p class="m-0"><i class="bi bi-envelope me-2"></i>${email}</p>
               <a href="https://wa.me/+549${phone}" target="_blank"><i class="bi bi-telephone-forward me-2"></i>${phone}</a>
               <a href="" id="entregado"><i class="bi bi-bag-check me-2"></i>Marcar como entregado</a>
              </div>
              <div class="col-12 col-md-8 orderCard_products">
                <table id="orderCards" class="u-full-width w-100">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Cantidad</th>
                      <th>Imagen</th>
                      ${cartList.innerHTML}
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
      orderList.appendChild(card);
    });

    newOrdersContainer.appendChild(orderList);
  });

  getOrders(true).then((orders) => {

    document.querySelector(".spinner2").style.display = "none";

    if (orders.length === 0) {
      document.querySelector("#old-orders h5").style.display = "block";
    }

    let oldOrdersContainer;

    let orderList = document.createElement("div");
    orderList.className = "row justify-content-center";

    if (document.querySelector("#old-orders")) {
      oldOrdersContainer = document.querySelector("#old-orders");
    }

    orders.forEach((el, index) => {
      /* Destrucuring sobre el objeto */

      const { user, date, id, products } = el;
      const { name, email, phone } = user;

      let cartList = document.createElement("tbody");

      products.forEach((product) => {
        const { name, img, quantity, id } = product;

        const row = document.createElement("tr");
        row.setAttribute("id", id);
        row.innerHTML = `<td>
                      ${name}
                  </td>
                  <td>
                      ${quantity}
                  </td>
                  <td class="checkout-img" style="background-image: url('${img}')">
                  </td>
              `;
        cartList.appendChild(row);
      });

      const card = document.createElement("div");
      card.className = "accordion accordion-flush";
      card.setAttribute("id", "accordionFlushExample");
      card.innerHTML = `<div class="accordion-item">
      <h2 class="accordion-header" id="flush-heading${id}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${id}" aria-expanded="false" aria-controls="flush-collapse${id}"><i class="bi bi-calendar3 me-2"></i>${date}</button>
      </h2>
      <div id="flush-collapse${id}" class="accordion-collapse collapse" aria-labelledby="flush-heading${id}" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body" id-order="${id}">
          <div class="col-12 d-flex flex-wrap" style="min-height: 15rem;">
            <div class="col-12 col-md-4 d-flex flex-column justify-content-between">
             <p class="m-0"><i class="bi bi-person me-2"></i>${name}</p>
             <p class="m-0"><i class="bi bi-envelope me-2"></i>${email}</p>
             <a href="https://wa.me/${phone}" target="_blank"><i class="bi bi-telephone-forward me-2"></i>${phone}</a>
             <p class="m-0"><i class="bi bi-bag-check me-2"></i>Articulo entregado</p>
             <a href="" id="renew"><i class="bi bi-node-plus me-2"></i>Marcar como nuevo</a>
             <a href="" class="deleteOrder"><i class="bi bi-trash-fill"></i></a>
            </div>
            <div class="col-12 col-md-8 orderCard_products">
              <table id="orderCards" class="u-full-width w-100">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Imagen</th>
                    ${cartList.innerHTML}
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
      orderList.appendChild(card);
    });

    oldOrdersContainer.appendChild(orderList);
  });

  const user = auth().currentUser;

  if(user === null){
  return (
          `<div class="container">
          <div class="row">
              <div class="col-12 col-sm-6 offset-sm-3 userdiv">
                  <div class="d-flex flex-row justify-content-center">
                      <a reference="home" class="contactbreadcrumb">Inicio</a>
                      <p>> Administrador</p>
                  </div>
                  <h1 class="text-center mt-3">INICIAR SESIÓN</h1>
                  <p class="text-center mt-3">ACCESO DE USUARIO</p>
                  <form id="userForm" class="d-flex flex-column mt-5">
                      <div class="form-floating mb-3">
                          <input type="email" class="form-control" id="floatingEmail" placeholder="Email">
                          <label for="floatingInput">Email</label>
                      </div>
                      <div class="form-floating mb-3" id="userpass">
                          <input type="password" class="form-control" id="floatingPassword" placeholder="Contraseña">
                          <label for="floatingPassword">Contraseña</label>
                      </div>
                      <button reference="login" class="mybutton" type="submit">INICIAR SESIÓN</button>
                  </form>
              </div>
          </div>
      </div>`
  )} else {
  return `
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-row justify-content-center">
            <a reference="home" class="contactbreadcrumb">Inicio</a>
            <p class="d-none d-sm-block">> Órdenes</p>
          </div>
        </div>
      </div>
      <div class="row p-0">
        <div class="col-12 my-5 px-4">
          <div class="col-12">
            <h1 class="text-center fontzing mb-5">ÓRDENES</h1>
          </div>
          <div class="col-12 my-5" id="new-orders">
            <h2 class="my-3 fontzing">NUEVAS</h2>
            <h5 class="my-5 ps-3" style="display:none">NO HAY PEDIDOS NUEVOS</h5>
            <div class="text-center spinner1">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
          <div class="col-12 my-5" id="old-orders">
            <h2 class="my-3 fontzing">ANTIGUAS</h2>
            <h5 class="my-5 ps-3" style="display:none">NO HAY PEDIDOS ANTIGUOS</h5>
            <div class="text-center spinner2">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  };
};

export default Orders;
