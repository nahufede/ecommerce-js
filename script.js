import { Router } from "./components/router.js";
import { Search } from "./components/views/search.js"
import { ItemList } from "./components/items/ItemList.js";
import { itemDetail } from "./components/items/itemDetail.js";

window.addEventListener('DOMContentLoaded', ()=> Router())

let searchForm1 = document.getElementById("search-form1");
let searchTerm1 = document.getElementById("search1");

let searchForm2 = document.getElementById("search-form2");
let searchTerm2 = document.getElementById("search2");


searchForm1.addEventListener("keyup", (e) => {
    e.preventDefault();

    let valuelength = e.target.value.length
    
    if (valuelength > 3) {
        let search = searchTerm1.value;
        app.innerHTML = Search(search);
    } else if (valuelength > 0){
        app.innerHTML = `
        <div class="container-fluid" style="height: 30vh;display: flex;align-items: center;justify-content: center;">
          <div class="row">
            <h3 class='text-center fontzing'>Sigue escribiendo ...</h3>
          </div>
        </div>
        `
    } else if(valuelength === 0){
      app.innerHTML = 
      `<div class="container-fluid" style="height: 30vh;display: flex;align-items: center;justify-content: center;">
        <div class="row">
          <h2 class='text-center fontzing'>Realice una nueva búsqueda</h2>
          <a class="text-center" href="" style="text-decoration:none; color:black;" reference="home">Inicio<i class="bi bi-house-fill ms-2"></i></a>
        </div>
      </div>`
    }
});

searchForm2.addEventListener("keyup", (e) => {
  e.preventDefault();

  let valuelength = e.target.value.length
  
  if (valuelength > 3) {
      let search = searchTerm2.value;
      app.innerHTML = Search(search);
  } else if (valuelength > 0){
      app.innerHTML = `
      <div class="container-fluid" style="height: 30vh;display: flex;align-items: center;justify-content: center;">
        <div class="row">
          <h3 class='text-center fontzing'>Sigue escribiendo ...</h3>
        </div>
      </div>
      `
  } else if(valuelength === 0){
    app.innerHTML = 
    `<div class="container-fluid" style="height: 30vh;display: flex;align-items: center;justify-content: center;">
      <div class="row">
        <h2 class='text-center fontzing'>Realice una nueva búsqueda</h2>
        <a class="text-center" href="" style="text-decoration:none; color:black;" reference="home">Inicio<i class="bi bi-house-fill ms-2"></i></a>
      </div>
    </div>`
  }
});

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

window.addEventListener("click", (e) => {

  if (e.target.classList.contains("click-category")) {
    let category = e.target.attributes.id.value;
    console.log(category);
    ItemList(category)
  }

  if (e.target.classList.contains("itemdetail")) {
    e.preventDefault();
    let productId = e.target.attributes.id.value;
    itemDetail.render(productId).then((response) => {
      app.innerHTML = response;
    });
  }
});