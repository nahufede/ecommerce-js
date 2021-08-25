import { auth } from "../firebase/firebase.js";

export const Navbar = () => {

    const user = auth().currentUser;

    return (
            `<nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid mynav">
              <a class="navbar-brand" id="home" href="">LUCCA</a>
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
                      <li><hr class="dropdown-divider"></li>
                    </ul>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle navwoman" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      MUJER
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
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
                <form id="search-form" class="d-flex">
                  <input class="form-control me-4" id="search" type="search" placeholder="Buscar" aria-label="Search">
                </form>
                <a><i class="bi bi-cart3 carrito" id=cart></i></a>
              </div>
            </div>
          </nav>`
      )
}

export default Navbar;