import { getItems } from "../../firebase/products.js";
import { getCategories } from "../../firebase/products.js";

export const Modal = () => {
  return `<!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content p-3 modalParent">
        <form class="editForm">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingName" />
            <label for="floatingName">Nombre</label>
          </div>
          <div class="form-floating mb-3">
            <select class="form-select categoryoptions" id="floatingCategory" aria-label="Floating label category">
              <option selected>Seleccionar</option>
            </select>
            <label for="floatingCategory">Categoria</label>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">$</span>
            <input type="text" class="form-control" id="price" aria-label="Amount (to the nearest dollar)" />
            <span class="input-group-text">.00</span>
          </div>
          <div class="form-floating mb-3">
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"
              style="height: 100px"></textarea>
            <label for="floatingTextarea">Descripción</label>
          </div>
          <button class="btn btn-primary saveEdit">Guardar cambios</button>
        </form>
      </div>
    </div>
  </div>
</div>`;
};

export const DBProducts = () => {
  let modal = document.querySelector("#modal");
  let productsLength

  getCategories().then((el) => {
    let categories = el;

    let selectItems;

    categories.forEach((el, index) => {
      const option = document.createElement("option");

      /* Destrucuring sobre el objeto p */
      const { name } = el;

      option.innerHTML = name;
      option.setAttribute("value", index + 1);

      if (document.querySelector(".categoryoptions")) {
        selectItems = document.querySelector(".categoryoptions");
      }

      selectItems.appendChild(option);
    });
  });

  getItems().then((products) => {

    productsLength = products.length

    let viewList;

    if (document.querySelector(".cuerpo")) {
      viewList = document.querySelector(".cuerpo")
    }

    viewList.innerHTML = ""

    const setProducts = (parameter) => {

      const mappingCart = (x) => {
        let start = x * 5;
        let end = start + 5;
  
        products = products.slice(start, end);
      }

      mappingCart(parameter)
      
      products.forEach((el) => {
      /* Destrucuring sobre el objeto */

      const { name, img, category, id } = el;

      const row = document.createElement("tr");
      row.setAttribute("id", id);

      row.innerHTML = `
                <td style="background-image: url(${img})" class="tableimage">
                </td>
                <td>
                    ${name}
                </td>
                <td>
                    ${category}
                </td>
                <td>
                  <a class="btn btn-warning delete">Borrar</a>
                </td>
                <td>
                  <button type="button" class="btn btn-info editBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Editar
                  </button>
                </td>
                
            `;
      viewList.appendChild(row);
    });}

    const pagination = (productsLength) => {
      let pageDivision = Math.ceil(productsLength / 5);
      let pageNumbers = [];
  
      for (let i = 0; i < pageDivision; i++) {
        pageNumbers.push(i + 1);
      }
  
      if(document.querySelector('.mypagination')){
        let paginationFather = document.querySelector('.mypagination')
        paginationFather.innerHTML = ""
  
        let preview = document.createElement('li')
        preview.classList = "page-item"
        preview.innerHTML = `<a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        </a>`
        paginationFather.appendChild(preview)
        
        pageNumbers.map((el, index)=>{
          el = document.createElement('li')
          el.className = "page-item"
          el.innerHTML= `<a class="page-link pagenumber" page="${index}" href="#">${index+1}</a>`
          paginationFather.appendChild(el)
        })
  
        let next = document.createElement('li')
        next.className = "page-item"
        next.innerHTML = `<a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
                          </a>`
        paginationFather.appendChild(next)
      }
  
    };

    pagination(productsLength)

    if(document.querySelector('.pagenumber')){
      window.addEventListener('click',(e)=>{

        if(e.target.classList.contains('pagenumber')){

          let page = e.target.getAttribute('page')
  
          setProducts(page);
        }
      })
    }
  });

  return `
  <div class="container dbproductspage">
  <div class="row">
    <div class="col-12">
      <div class="d-flex flex-row justify-content-center">
        <a id="home" class="contactbreadcrumb" href="">Inicio</a>
        <a id="admin" class="contactbreadcrumb" href="">> Administrador</a>
        <p>> Productos</p>
      </div>
    </div>
    <div class="col-12 my-5 d-flex flex-row">
      <div class="col-12 col-md-4">
        <h1>MIS PRODUCTOS</h1>
      </div>
      <div class="col-12 col-md-8">
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
          <nav aria-label="Page navigation example" class="d-flex justify-content-center">
            <ul class="pagination mypagination">
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</div>
<br>
</div>
`;
};
