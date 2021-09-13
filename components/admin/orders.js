import { getOrders } from "../../firebase/db-calls.js";
import { getFirestore } from "../../firebase/firebase.js";

let db = getFirestore();

window.addEventListener("click", async (e) => {
  let focus = e.target;
  
  if (focus.parentElement.classList.contains("deleteConsult")) {

    e.preventDefault()

    let id = focus.parentElement.parentElement.parentElement.parentElement.getAttribute('id');

    let confirmacion = confirm("Desea eleminar el elemento?");

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
})

export const Orders = () => {

    getOrders().then((orders)=>{

        if(orders.length > 0){
          document.querySelector('#orders h4').style.display = 'none'
        }

        let ordersContainer

        let orderList = document.createElement('div')
        orderList.className = "row justify-content-center pt-4"

        if (document.querySelector("#orders")) {
        ordersContainer  = document.querySelector("#orders")
        }

        orders.forEach((el) => {
        /* Destrucuring sobre el objeto */
    
        const { user, date, id } = el;
    
        const card = document.createElement('div');
        card.className = "col-6 d-flex justify-content-center mb-4"
        card.innerHTML = 
        `<div class="card w-100" id=${id}>
            <div class="card-body d-flex flex-column consultcard">
            <span class="d-flex justify-content-between align-items-center">
              <h5 class="card-title"><i class="bi bi-person me-2"></i>${user.name}</h5>
              <a href="" class="deleteConsult"><i class="bi bi-trash-fill"></i></a>
            </span>
            <p class="card-text">${user.email}</p>
            <span class="d-flex justify-content-between align-items-center">
              <h6 class="card-subtitle"><i class="bi bi-envelope me-2"></i></h6>
              <a href="" target="_blank"><i class="bi bi-telephone-forward me-2"></i></a>
              <p class="card-text align-self-end"><i class="bi bi-calendar-check-fill me-2"></i>${date}</p>
            </span>
            </div>
        </div>
        `
        orderList.appendChild(card);
        });
    
        ordersContainer.appendChild(orderList)
    })

    return (`
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-row justify-content-center">
            <a reference="home" class="contactbreadcrumb">Inicio</a>
            <a reference="admin" class="contactbreadcrumb">> Administrador</a>
            <p class="d-none d-sm-block">> Órdenes</p>
          </div>
        </div>
      </div>
      <div class="row p-0">
        <div class="col-12 my-5">
          <div class="col-12">
            <h1 class="text-center fontzing mb-5">ÓRDENES</h1>
          </div>
          <div class="col-12" id="orders">
            <h4 class="text-center mb-5">NO HAY ÓRDENES NUEVAS</h4>
          </div>
        </div>
      </div>
    </div>`)
}

export default Orders;