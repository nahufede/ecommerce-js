import { Navbar } from "./components/nav.js";
import { Footer } from "./components/footer.js";
import { Home } from "./components/home.js";
import { Contacto } from "./components/contact.js";
import { Hombre } from "./components/hombre.js";
import { Admin } from "./components/admin.js";
import { Mujer } from "./components/mujer.js";
import { getCategories } from "./firebase/products.js";
import { ItemList } from "./components/itemList.js";
import { itemDetail } from "./components/itemDetail.js";
import { auth } from "./firebase/firebase.js";
import { createElement } from "./firebase/products.js";
import { LogOut, LogIn } from "./firebase/user.js";
import { SearchResults } from "./components/itemList.js";
import { Checkout } from "./components/Cart/checkout.js";
import { CreateProduct } from "./components/upload.js";

let full = document.querySelector("#full");
let nav = document.querySelector("#nav");
let app = document.querySelector("#app");
let footer = document.querySelector("#footer");

nav.innerHTML = Navbar();
footer.innerHTML = Footer();

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
  }
});

getCategories("nav");

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
  
  if (id === "loginbutton") {
    LogIn();
  }

  if (id === "logoutbutton") {
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