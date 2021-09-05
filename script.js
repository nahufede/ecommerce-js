import { Navbar } from "./components/nav.js";
import { Footer } from "./components/footer.js";
import { Home } from "./components/views/home.js";
import { ItemList, SearchResults } from "./components/items/itemList.js";
import { DBModal } from "./components/modal.js"
import { Router } from "./components/router.js";
import { Consultas } from "./components/admin/consultas.js";
import { DBProducts } from "./components/admin/dbproducts.js";
import Hombre from "./components/views/hombre.js";
import { Categories } from "./components/admin/categories.js";

let nav = document.querySelector("#nav");
let app = document.querySelector("#app");
let footer = document.querySelector("#footer");
let modal = document.querySelector("#modal");

nav.innerHTML = Navbar();
footer.innerHTML = Footer();
modal.innerHTML = DBModal();

if(app.innerHTML == ""){app.innerHTML = Categories()}

window.addEventListener('DOMContentLoaded', ()=> Router())

let searchForm = document.getElementById("search-form");
let searchTerm = document.getElementById("search");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let search = searchTerm.value;
  SearchResults(search);
});