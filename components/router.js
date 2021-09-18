import { Navbar } from "./nav.js";
import { Footer } from "./footer.js";
import { DBModal } from "./modal.js";
import { Home } from "../components/views/home.js";
import { Upload } from "./admin/products/upload.js";
import { Admin } from "../components/admin/admin.js";
import { Principal } from "./views/principal.js";
import { ShowGenders } from "./admin/genders/genders.js";
import { Checkout } from "../components/cart/checkout.js";
import { Contacto } from "../components/views/contact.js";
import { AllProducts } from "./admin/products/products.js";
import { ProductsDashboard } from "./admin/products/dash.js";
import { Consultas } from "../components/admin/consultas.js";
import { CreateGender } from "./admin/genders/create.js";
import { CreateCategories } from "./admin/categories/create.js";
import { CategoriesDashboard } from "./admin/categories/dash.js";
import { ShowCategories } from "./admin/categories/categories.js";
import { GendersDashboard } from "./admin/genders/dash.js";
import { Orders } from "./admin/orders.js";

let nav = document.querySelector("#nav");
let app = document.querySelector("#app");
let footer = document.querySelector("#footer");
let modal = document.querySelector("#modal");

nav.innerHTML = Navbar();
footer.innerHTML = Footer();
modal.innerHTML = DBModal();

if (app.innerHTML == "") {app.innerHTML = Home()}

export const Router = () => {
  window.addEventListener("click", (e) => {
    let reference = e.target.getAttribute("reference");

    switch (reference) {
      case "hombre":
        e.preventDefault();
        app.innerHTML = Principal('categories_hombre', 'landingman');
        break;

      case "mujer":
        e.preventDefault();
        app.innerHTML = Principal('categories_mujer', 'landingwoman');
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
        
      case "gendersdash":
        e.preventDefault();
        app.innerHTML = GendersDashboard();
        break;

      case "productsdash":
        e.preventDefault();
        app.innerHTML = ProductsDashboard();
        break;

      case "consultas":
        e.preventDefault();
        app.innerHTML = Consultas();
        break;
      
      case "ordenes":
        e.preventDefault();
        app.innerHTML = Orders();
        break;
    }
  });
};
