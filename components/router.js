import { Contacto } from "../components/views/contact.js";
import { Hombre } from "../components/views/hombre.js";
import { Admin } from "../components/admin/admin.js";
import { Mujer } from "../components/views/mujer.js";
import { Home } from "../components/views/home.js";
import { ItemList } from "../components/items/itemList.js";
import { itemDetail } from "../components/items/itemDetail.js";
import { LogOut, LogIn } from "../firebase/user.js";
import { Checkout } from "../components/cart/checkout.js";
import { Upload } from "./admin/products/upload.js";
import { AllProducts } from "./admin/products/products.js";
import { CategoriesDashboard } from "./admin/categories/dash.js";
import { ProductsDashboard } from "./admin/products/dash.js";
import { Consultas } from "../components/admin/consultas.js";
import { ShowCategories } from "./admin/categories/categories.js";
import { CreateCategories } from "./admin/categories/create.js";
import { CreateGender } from "./admin/categories/creategender.js"
import { Footer } from "./footer.js";
import { Navbar } from "./nav.js";
import { DBModal } from "./modal.js";
import { ShowGenders } from "./admin/categories/genders.js";

let nav = document.querySelector("#nav");
let app = document.querySelector("#app");
let footer = document.querySelector("#footer");
let modal = document.querySelector("#modal");

nav.innerHTML = Navbar();
footer.innerHTML = Footer();
modal.innerHTML = DBModal();

if (app.innerHTML == "") {
  app.innerHTML = Home();
}

export const Router = () => {
  window.addEventListener("click", (e) => {
    let id = e.target.getAttribute("id");

    switch (id) {
      case "hombre":
        e.preventDefault();
        app.innerHTML = Hombre();
        break;

      case "mujer":
        e.preventDefault();
        app.innerHTML = Mujer();
        break;

      case "contact":
        e.preventDefault();
        app.innerHTML = Contacto();
        break;

      case "home":
        e.preventDefault();
        app.innerHTML = Home();
        break;

      case "admin":
        e.preventDefault();
        app.innerHTML = Admin();
        break;

      case "cart":
        e.preventDefault();
        app.innerHTML = Checkout();
        break;

      case "upload":
        e.preventDefault();
        app.innerHTML = Upload();
        break;

      case "allproducts":
        e.preventDefault();
        app.innerHTML = AllProducts();
        break;

      case "categoriesdash":
        e.preventDefault();
        app.innerHTML = CategoriesDashboard();
        break;

      case "showcategories":
        e.preventDefault();
        app.innerHTML = ShowCategories();
        break;

      case "showgenders":
        e.preventDefault();
        app.innerHTML = ShowGenders();
        break;

      case "createcategory":
        e.preventDefault();
        app.innerHTML = CreateCategories();
        break;

      case "creategender":
        e.preventDefault();
        app.innerHTML = CreateGender();
        break;

      case "productsdash":
        e.preventDefault();
        app.innerHTML = ProductsDashboard();
        break;

      case "consultas":
        e.preventDefault();
        app.innerHTML = Consultas();
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
};
