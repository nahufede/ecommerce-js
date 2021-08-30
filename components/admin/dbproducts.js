import { getItems } from "../../firebase/products.js";

export const DBProducts = () => {
  
  // LLAMADO FIREBASE DE PRODUCTOS

  getItems().then((products) => {

    /* productsLength = products.length */

    let viewList = document.createElement('div')
    viewList.className = "row justify-content-center pt-4"

    let dbproductsContainer 

    if (document.querySelector("#dbproducts")) {
      dbproductsContainer  = document.querySelector("#dbproducts")
    }

    /* const mappingCart = (x) => {
      let start = x * 8;
      let end = start + 8;

      products = products.slice(start, end);
    }
 */
    const setProducts = () => {

      /* mappingCart(parameter) */
      
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

    /* const pagination = (productsLength) => {
      let pageDivision = Math.ceil(productsLength / 8);
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

    pagination(productsLength) */

    /* if(document.querySelector('.pagenumber')){
      window.addEventListener('click',(e)=>{

        if(e.target.classList.contains('pagenumber')){

          let page = e.target.getAttribute('page')
          
          console.log(page);

          setProducts(page);
        }
      })
    } */
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
      </div>
      <div class="row p-0">
        <div class="col-12 my-5">
          <div class="col-12">
            <h1 class="text-center mb-5">MIS PRODUCTOS</h1>
          </div>
          <div class="col-12">
            <div class="container" id="dbproducts">
            </div>
            <nav aria-label="Page navigation example" class="d-flex justify-content-center mt-3">
              <ul class="pagination mypagination">
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
`;
};
