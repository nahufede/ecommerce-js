import { Navbar } from "./components/nav.js";
import { Footer } from "./components/footer.js";
import { Home } from "./components/home.js";
import { Contacto } from "./components/contact.js";
import { Hombre } from "./components/hombre.js";
import { Mujer } from "./components/mujer.js";
import { getCategories } from "./firebase/products.js"

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
      getCategories()
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
  }
});


