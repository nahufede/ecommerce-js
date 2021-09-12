import { auth } from "../firebase/firebase.js";
import { getCategories, getGenders } from "../firebase/products.js";
import { capitalize } from "../script.js";

const categoriesNav = () => {

  getGenders().then((gender)=>{
    gender.forEach((el) => {

      const { name } = el

      let navItemMin = document.createElement('li')
      navItemMin.className = 'nav-item dropdown d-flex justify-content-between'
      navItemMin.innerHTML = `
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">${name.toUpperCase()}</a>
          <ul class="dropdown-menu linkborder" id="categoriesminnav_${name}" aria-labelledby="navbarDropdown">
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
      <ul class="dropdown-menu" id="categoriesnav_${name}" aria-labelledby="navbarDropdown">
        <li><a class="dropdown-item" reference="${name}" href="#">Principal</a></li>
      </ul>`
  
    let navItems

    if (document.querySelector(".navitems")) {
      navItems = document.querySelector(".navitems");
    }

    navItems.prepend(navItem)
    })
  })

  getCategories('categories_hombre').then((el) => {
    let categoriesnav_man;

    if (document.getElementById("categoriesnav_hombre")) {
      categoriesnav_hombre = document.querySelector("#categoriesnav_hombre");
    }

    if (document.getElementById("categoriesminnav_hombre")) {
      categoriesnav_hombre = document.querySelector("#categoriesminnav_hombre");
    }

    el.forEach((el) => {
      let name = capitalize(el.name)
      let categoriesNav = document.createElement("li");
      categoriesNav.innerHTML = `<a class="dropdown-item click-category" id="${el.name}" href="#">${name}</a>`;
      categoriesnav_hombre.appendChild(categoriesNav);
      categoriesminnav_hombre.appendChild(categoriesNav);
    });
  });

  getCategories('categories_mujer').then((el) => {
    let categoriesnav_mujer;

    if (document.getElementById("categoriesnav_mujer")) {
      categoriesnav_mujer = document.querySelector("#categoriesnav_mujer");
    }

    if (document.getElementById("categoriesminnav_mujer")) {
      categoriesnav_hombre = document.querySelector("#categoriesminnav_mujer");
    }

    el.forEach((el) => {
      let name = capitalize(el.name)
      let categoriesNav = document.createElement("li");
      categoriesNav.innerHTML = `<a class="dropdown-item click-category" id="${el.name}" href="#">${name}</a>`;
      categoriesnav_mujer.appendChild(categoriesNav);
      categoriesminnav_mujer.appendChild(categoriesNav);
    });
  });
};

export const Navbar = () => {

  categoriesNav();

  const user = auth().currentUser;

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
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 navitems">
                  <li class="nav-item">
                    <a class="nav-link active navcontact" aria-current="page" reference="contact" href="#">CONTACTO</a>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle navadmin" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      ADMIN
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><a class="dropdown-item" reference="admin" href="#">Principal</a></li>
                    </ul>
                  </li>
                </ul>
                <form id="search-form" class="d-flex justify-content-end">
                  <input class="form-control me-4" id="search" type="search" placeholder="Buscar" aria-label="Search">
                </form>
                <a>
                  <i class="bi bi-cart3 carrito" reference="cart"></i>
                  <span class='badge badge-warning ${conditionalDisplay} scale-up-center' id='lblCartCount'> ${productQuantity} </span>
                </a>
              </div>
            </div>
          </nav>
          <nav class="navbar navbar-expand-lg navbar-light d-md-block d-lg-none">
            <div class="container-fluid mynav">
              <a class="navbar-brand" reference="home" href="">LUCCA</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mt-3 navitemsmin">
                  <li class="nav-item d-flex justify-content-between">
                    <a class="nav-link active" aria-current="page" reference="contact" href="#">CONTACTO</a>
                    <form id="search-form" class="d-flex justify-content-end">
                      <input class="form-control" id="search" type="search" placeholder="Buscar" aria-label="Search">
                    </form>
                  </li>
                  <a>
                    <i class="bi bi-cart3 carrito" reference=cart></i>
                    <span class='badge badge-warning ${conditionalDisplay} scale-up-center' id='lblCartCount'>
                      ${productQuantity} </span>
                  </a>
                </ul>
              </div>
            </div>
          </nav>`;
};

export default Navbar;
