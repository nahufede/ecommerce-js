import { getItems } from "../../firebase/products.js";

export const DBProducts = () => {
  getItems().then((el) => {

    let products = el;

    let cartList
    
    products.forEach((el) => {

      /* Destrucuring sobre el objeto */

      const { name, img, category, id } = el;

      const row = document.createElement("tr");
      row.innerHTML = `
                <td>
                    <img class="img-carrito" src="${img}" width=100>
                </td>
                <td>
                    ${name}
                </td>
                <td>
                    ${category}
                </td>
                <td>
                    <a href="#" class="btn-remove-product" data-id="${id}"> Eliminar </a>
                </td>
                
            `;
        
    if(document.querySelector('.cuerpo')){
      cartList = document.querySelector('.cuerpo');
    }
      cartList.appendChild(row);
    });
  });

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
        <div class="col-4">
          <h1>MIS PRODUCTOS</h1>
        </div>
        <div class="col-8">
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
                          <th>Categoria</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody class="cuerpo">
                      </tbody>
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
