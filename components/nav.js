import { auth } from "../firebase/firebase.js";
import { getCategories } from "../firebase/products.js";

const categoriesNav = () => {
  getCategories('man').then((el) => {
    let categoriesnav_man;

    if (document.getElementById("categoriesnav_man")) {
      categoriesnav_man = document.querySelector("#categoriesnav_man");
    }

    el.forEach((el) => {
      let categoriesNav = document.createElement("li");
      categoriesNav.innerHTML = `<a class="dropdown-item click-category" id="${el.name}" href="#">${el.name}</a>`;
      categoriesnav_man.appendChild(categoriesNav);
    });
  });

  getCategories('woman').then((el) => {
    let categoriesnav_woman;

    if (document.getElementById("categoriesnav_woman")) {
      categoriesnav_woman = document.querySelector("#categoriesnav_woman");
    }

    el.forEach((el) => {
      let categoriesNav = document.createElement("li");
      categoriesNav.innerHTML = `<a class="dropdown-item click-category" id="${el.name}" href="#">${el.name}</a>`;
      categoriesnav_woman.appendChild(categoriesNav);
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
    productQuantity += cart[i].cantidad;
  }

  let conditionalDisplay = "d-none";

  if (cart.length > 0) {
    conditionalDisplay = "";
  }

  return `<nav class="navbar navbar-expand-lg navbar-light d-none d-lg-block">
            <div class="container-fluid mynav">
              <a class="navbar-brand" id="home">LUCCA</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 navitems">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle navman" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      HOMBRE
                    </a>
                    <ul class="dropdown-menu" id="categoriesnav_man" aria-labelledby="navbarDropdown">
                      <li><a class="dropdown-item" id="hombre" href="#">Principal</a></li>
                    </ul>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle navwoman" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      MUJER
                    </a>
                    <ul class="dropdown-menu" id="categoriesnav_woman" aria-labelledby="navbarDropdown">
                      <li><a class="dropdown-item" id="mujer" href="#">Principal</a></li>
                    </ul>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active navcontact" aria-current="page" id="contact" href="#">CONTACTO</a>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle navadmin" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      ADMIN
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><a class="dropdown-item" id="admin" href="#">Principal</a></li>
                    </ul>
                  </li>
                </ul>
                <form id="search-form" class="d-flex justify-content-end">
                  <input class="form-control me-4" id="search" type="search" placeholder="Buscar" aria-label="Search">
                </form>
                <a>
                  <i class="bi bi-cart3 carrito" id=cart></i>
                  <span class='badge badge-warning ${conditionalDisplay} scale-up-center' id='lblCartCount'> ${productQuantity} </span>
                </a>
              </div>
            </div>
          </nav>
          <nav class="navbar navbar-expand-lg navbar-light d-md-block d-lg-none">
            <div class="container-fluid mynav">
              <a class="navbar-brand" id="home" href="">LUCCA</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mt-3">
                  <li class="nav-item dropdown d-flex justify-content-between">
                    <span>
                      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        HOMBRE
                      </a>
                      <ul class="dropdown-menu linkborder" id="categoriesnav_man" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" id="hombre" href="#">Principal</a></li>
                      </ul>
                    </span>
                    <a>
                      <i class="bi bi-cart3 carrito" id=cart></i>
                      <span class='badge badge-warning ${conditionalDisplay} scale-up-center' id='lblCartCount'>
                        ${productQuantity} </span>
                    </a>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      MUJER
                    </a>
                    <ul class="dropdown-menu linkborder" id="categoriesnav_woman" aria-labelledby="navbarDropdown">
                      <li><a class="dropdown-item" id="mujer" href="#">Principal</a></li>
                    </ul>
                  </li>
                  <li class="nav-item d-flex justify-content-between">
                    <a class="nav-link active" aria-current="page" id="contact" href="#">CONTACTO</a>
                    <form id="search-form" class="d-flex justify-content-end">
                      <input class="form-control" id="search" type="search" placeholder="Buscar" aria-label="Search">
                    </form>
                  </li>
                </ul>
              </div>
            </div>
          </nav>`;
};

export default Navbar;
