import {getFirestore, storage} from '../../firebase/firebase.js'

let db = getFirestore();

export const DBProducts = async () => {

    const itemCollection = db.collection('products')
    const querySnapshot = await itemCollection.get()

    let allProducts = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    let cartList = document.createElement("tbody");

    allProducts.forEach((el) => {
      /* Destrucuring sobre el objeto p */
      const { nombre, imagen, cantidad, id } = el;
      console.log(el);
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
      /* cartList.appendChild(row); */
    });
    if (allProducts.length === 0) {
      return `<div class="container">
              <h1>El carrito está vacío.</h1>
        </div>`;
    }
    return `
    <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="d-flex flex-row justify-content-center">
          <a id="home" class="contactbreadcrumb" href="">Inicio</a>
          <a id="admin" class="contactbreadcrumb" href="">> Administrador</a>
          <p>> Productos</p>
        </div>
      </div>
      <div class="col-12 my-5 d-flex">
        <div class="col-6">
          <h1>MIS PRODUCTOS</h1>
        </div>
        <div class="col-6">
          <div class="card">
            <div class="card-content" id="tajeta-checkout">
              <div class="card-body">
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
                        /* ${cartList.innerHTML} */
                      </thead>
                    </table>
                  </div>
                  <br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br>
</div>`;
  };

