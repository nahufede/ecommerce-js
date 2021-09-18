import { getCategories, getGenders } from "../firebase/db-calls.js";
import { capitalize } from "../script.js";

const categoriesNav = () => {

  getGenders().then((gender)=>{
    gender.forEach((el) => {

      if(document.querySelector('.loadingnav')){document.querySelector('.loadingnav').remove()}

      const { name } = el

      let navItemMin = document.createElement('li')
      navItemMin.className = 'nav-item dropdown'
      navItemMin.innerHTML = `
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">${name.toUpperCase()}</a>
          <ul class="dropdown-menu linkborder" id="categoriesmininav_${name}" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" reference="${name}" href="#">Principal</a></li>
          </ul>
      `

      let navItemsMin

      if (document.querySelector(".navitemsmin")) {
        navItemsMin = document.querySelector(".navitemsmin");
      }

      navItemsMin.prepend(navItemMin)

      let navItem = document.createElement('li');
      navItem.className = 'nav-item dropdown'
      navItem.innerHTML = `
      <a class="nav-link dropdown-toggle navman" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">${name.toUpperCase()}</a>
      <ul class="dropdown-menu linkborder" id="categoriesnav_${name}" aria-labelledby="navbarDropdown">
        <li><a class="dropdown-item" reference="${name}" href="#">Principal</a></li>
      </ul>`
  
    let navItems

    if (document.querySelector(".navitems")) {
      navItems = document.querySelector(".navitems");
    }

    navItems.prepend(navItem)
    })

    gender.forEach((el)=>{

      const { name } = el
      
      getCategories(`categories_${name}`).then((el) => {
    
        let categoriesnav = document.querySelector(`#categoriesnav_${name}`);
        let categoriesmininav = document.querySelector(`#categoriesmininav_${name}`);
        
        el.forEach((el) => {
          let name = capitalize(el.name)
          let categoriesNav = document.createElement("li");
          categoriesNav.innerHTML = `<a class="dropdown-item click-category" id="${el.name}" href="#">${name}</a>`;
          categoriesnav.appendChild(categoriesNav);
        });
    
        el.forEach((el) => {
          let name = capitalize(el.name)
          let categoriesNav = document.createElement("li");
          categoriesNav.innerHTML = `<a class="dropdown-item click-category" id="${el.name}" href="#">${name}</a>`;
          categoriesmininav.appendChild(categoriesNav);
        });
      });

    })
  })
};

export const Navbar = () => {

  categoriesNav();

  let cart = JSON.parse(localStorage.getItem("carrito")) || [];
  let productQuantity = 0;
  let i;
  for (i = 0; i < cart.length; i++) {
    productQuantity += cart[i].quantity;
  }

  let conditionalDisplay = "d-none";

  if (cart.length > 0) {
    conditionalDisplay = "";
  }

  return `<nav class="navbar navbar-expand-lg navbar-light d-none d-lg-block" reference="navbar">
            <div class="container-fluid mynav">
              <a href="" class="navbar-brand" reference="home">LUCCA</a>
              <button class="navbar-toggler p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 navitems">
                  <li class="nav-item d-flex align-items-center loadingnav pe-2">
                    <a class="nav-link active navcontact px-2" aria-current="page" reference="contact" href="#">Cargando</a>
                    <div class="spinner-border spinner-border-sm" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </li> 
                  <li class="nav-item">
                    <a class="nav-link active navcontact" aria-current="page" reference="contact" href="#">CONTACTO</a>
                  </li>
                </ul>
                <form id="search-form" class="d-flex justify-content-end" onkeypress="if(event.keyCode == 13) event.returnValue = false;">
                  <input class="form-control me-4" id="search" type="search" placeholder="Buscar" aria-label="Search">
                </form>
                <a>
                  <i class="bi bi-cart3 carrito" reference="cart"></i>
                  <span class='badge badge-warning ${conditionalDisplay} scale-up-center' id='lblCartCount'> ${productQuantity} </span>
                </a>
                <span class="admin-nav">
                  <li class="nav-item dropdown admindrop">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-person"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end adminlog" aria-labelledby="navbarDropdown">
                      <li><a class="dropdown-item" reference="admin" href="#">Iniciar sesión</a></li>
                    </ul>
                  </li>
                </span>
              </div>
            </div>
          </nav>
          <nav class="navbar navbar-expand-lg navbar-light d-md-block d-lg-none">
            <div class="container-fluid mynav">
              <a class="navbar-brand" reference="home" href="">LUCCA</a>
              <button class="navbar-toggler p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mt-3 navitemsmin">
                  <li class="nav-item d-flex justify-content-between">
                    <a class="nav-link active" aria-current="page" reference="contact" href="#">CONTACTO</a>
                    <span class="d-flex">
                      <form id="search-form" class="d-flex justify-content-end">
                        <input class="form-control" id="search" type="search" placeholder="Buscar" aria-label="Search">
                      </form>
                      <a>
                      <i class="bi bi-cart3 ps-3 carrito" reference=cart></i>
                      <span class='badge badge-warning ${conditionalDisplay} scale-up-center' id='lblCartCount'>
                        ${productQuantity} </span>
                      </a>
                    </span>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-person"></i>
                    </a>
                    <ul class="dropdown-menu adminlog1 linkborder" aria-labelledby="navbarDropdown">
                      <li><a class="dropdown-item" reference="admin" href="#">Iniciar sesión</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div id="spinnerdiv">
            <div class="spinner-border" style="width: 4.5rem; height: 4.5rem;" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>`;
};

export default Navbar;
