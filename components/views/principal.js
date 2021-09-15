import { getCategories } from "../../firebase/db-calls.js";
import { ItemList } from "../items/itemList.js";

let app = document.querySelector("#app");

const categoriesPage = (genero) => {

  getCategories(genero).then((categories) => {

    document.querySelector(".spinner").style.display = "none";

    let allCategories = document.createElement("div");
    allCategories.className = "col-12 d-flex flex-wrap all-categories mt-3";

    categories.forEach((el) => {
      let category = document.createElement("div");
      category.className = "col-12 col-md-6 col-xl-4 my-5";
      category.style.cssText = `
                                display: flex; 
                                justify-content: center; 
                                align-items: center;
                                text-shadow: 1px 1px 10px black;
                                text-decoration: none;
                                cursor: pointer;`;

      let image = document.createElement("a");
      image.className = "focuscategoryimages";
      image.innerHTML = `<h1 class="fontzing">${el.name}</h1>`
      image.style.cssText = `background-image: url('${el.img}'); text-decoration: none`;

      category.appendChild(image);

      allCategories.appendChild(category);
    });

    if (document.querySelector(".thecategories")) {
      let categoriesContainer = document.querySelector(".thecategories");
      categoriesContainer.appendChild(allCategories);
    }
  });
};

export const Principal = (genero, landing) => {
  categoriesPage(genero);

  window.addEventListener('click', (e)=>{
    let category = e.target.innerText;
    if(e.target.classList.contains('focuscategoryimages')){
      e.preventDefault()
      ItemList(category)
    }
  })

  return `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="${landing}"></div>
                    </div>
                </div>
                <div class="row thecategories"></div>
                  <div class="text-center spinner pt-5 mt-5">
                    <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
              </div>
    `;
};

export default Principal;
