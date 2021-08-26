import { Navbar } from "./components/nav.js";
import { Footer } from "./components/footer.js";
import { Home } from "./components/views/home.js";
import { Contacto } from "./components/views/contact.js";
import { Hombre } from "./components/views/hombre.js";
import { Admin } from "./components/admin/admin.js";
import { Mujer } from "./components/views/mujer.js";
import { getCategories } from "./firebase/products.js";
import { ItemList } from "./components/items/itemList.js";
import { itemDetail } from "./components/items/itemDetail.js";
import { createElement } from "./components/admin/upload.js";
import { LogOut, LogIn } from "./firebase/user.js";
import { SearchResults } from "./components/items/itemList.js";
import { Checkout } from "./components/cart/checkout.js";
import { Upload } from "./components/admin/upload.js";
import { DBProducts } from "./components/admin/dbproducts.js";
import { Modal } from "./components/admin/dbproducts.js"

let nav = document.querySelector("#nav");
let app = document.querySelector("#app");
let footer = document.querySelector("#footer");

nav.innerHTML = Navbar();
footer.innerHTML = Footer();
modal.innerHTML = Modal();

window.addEventListener("DOMContentLoaded", () => (app.innerHTML = Home()));

window.addEventListener("click", (e) => {
  if (e.target.type !== "file") {
    e.preventDefault();
  }

  let id = e.target.getAttribute("id");

  switch (id) {
    case "hombre":
      app.innerHTML = Hombre();
      getCategories("manContainer");
      break;

    case "mujer":
      app.innerHTML = Mujer();
      break;

    case "contact":
      app.innerHTML = Contacto();
      break;

    case "home":
      app.innerHTML = Home();
      break;

    case "admin":
      app.innerHTML = Admin();
      break;

    case "cart":
      app.innerHTML = Checkout();
      break;

    case "upload":
      app.innerHTML = Upload();
      break;

    case "dbproducts":
      app.innerHTML = DBProducts();
      break;
  }
});

window.addEventListener("click", (e) => {
  let id = e.target.getAttribute("id");

  if (e.target.classList.contains("click-category")) {
    let category = e.target.attributes.id.value;
    ItemList(category);
  }

  if (e.target.classList.contains("card-img")) {
    let productId = e.target.attributes.id.value;
    itemDetail.render(productId).then((response) => {
      app.innerHTML = response;
    });
  }
  
  if (id === "login") {
    LogIn();
  }

  if (id === "logout") {
    LogOut();
  }

});

let searchForm = document.getElementById("search-form");
let searchTerm = document.getElementById("search");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let search = searchTerm.value;
  SearchResults(search);
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("submitBtn")) {
    e.preventDefault();
    createElement(e);
  }
});