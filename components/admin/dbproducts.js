import { getItems } from "../../firebase/products.js";

export const DBProducts = () => {
  
  // LLAMADO FIREBASE DE PRODUCTOS

  getItems().then((products) => {

    let viewList = document.createElement('div')
    viewList.className = "row justify-content-center pt-4"

    let dbproductsContainer 

    if (document.querySelector("#dbproducts")) {
      dbproductsContainer  = document.querySelector("#dbproducts")
    }

    const setProducts = () => {
      
      products.forEach((el) => {
      /* Destrucuring sobre el objeto */

      const { name, img, category, id } = el;

      const card = document.createElement('div');
      card.className = "col-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4 dbcard"
      card.innerHTML = 
      `<div class="card" style="width: 13rem; height: 13rem; border:none;">
        <div class="card-body card-space p-0" style="background-image: url(${img})">
          <div class="card-inner" id="${id}">
            <h5 class="text-center">${name}</h5>
            <p>${category}</p>
              <button type="button" class="btn editBtn mybutton2 mb-2" data-bs-toggle="modal" data-bs-target="#dbproductsmodal">
              Editar
              </button>
              <button type="button" class="btn deleteBtn mybutton">Eliminar
              </button>
          </div>
        </div>
      </div>
      `
      viewList.appendChild(card);
    });

    dbproductsContainer.appendChild(viewList)

    }

    setProducts()
  });

  return `
    <div class="container dbproductspage">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-row justify-content-center">
            <a id="home" class="contactbreadcrumb" href="">Inicio</a>
            <a id="admin" class="contactbreadcrumb" href="">> Administrador</a>
            <a id="admindashboard" class="contactbreadcrumb" href="">> Productos</a>
            <p>> Editar Items</p>
          </div>
        </div>
      </div>
      <div class="row p-0">
        <div class="col-12 my-5">
          <div class="col-12">
            <h1 class="text-center mb-5">MIS PRODUCTOS</h1>
          </div>
            <div class="container" id="dbproducts">
            </div>
          </div>
        </div>
      </div>
`;
};
