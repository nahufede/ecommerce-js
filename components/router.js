import { Contacto } from "../components/views/contact.js";
import { Hombre } from "../components/views/hombre.js";
import { Admin } from "../components/admin/admin.js";
import { Mujer } from "../components/views/mujer.js";
import { Home } from "../components/views/home.js"
import { ItemList } from "../components/items/itemList.js";
import { itemDetail } from "../components/items/itemDetail.js";
import { LogOut, LogIn } from "../firebase/user.js";
import { Checkout } from "../components/cart/checkout.js";
import { Upload } from "../components/admin/upload.js";
import { DBProducts } from "../components/admin/dbproducts.js";
import { Categories } from "../components/admin/categories.js"
import { ProductsDashboard } from "../components/admin/productsdash.js";
import { Consultas } from "../components/admin/consultas.js";

export const Router = () => {
    window.addEventListener("click", (e) => {
      
        let id = e.target.getAttribute("id");
      
        switch (id) {
          case "hombre":
            e.preventDefault()
            app.innerHTML = Hombre();
            break;
      
          case "mujer":
            e.preventDefault()
            app.innerHTML = Mujer();
            break;
      
          case "contact":
            e.preventDefault()
            app.innerHTML = Contacto();
            break;
      
          case "home":
            e.preventDefault()
            app.innerHTML = Home();
            break;
      
          case "admin":
            e.preventDefault()
            app.innerHTML = Admin();
            break;
      
          case "cart":
            e.preventDefault()
            app.innerHTML = Checkout();
            break;
      
          case "upload":
            e.preventDefault()
            app.innerHTML = Upload();
            break;
      
          case "databproducts":
            e.preventDefault()
            app.innerHTML = DBProducts();
            break;
      
          case "editcategories":
            e.preventDefault()
            app.innerHTML = Categories();
            break;
      
          case "productsdash":
            e.preventDefault()
            app.innerHTML = ProductsDashboard();
          break;
      
          case "consultas":
            e.preventDefault()
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
}