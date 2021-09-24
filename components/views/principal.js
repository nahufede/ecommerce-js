import { getCategories } from "../../firebase/db-calls.js";
import { ItemList } from "../items/itemList.js";

let app = document.querySelector("#app");

const categoriesPage = (genero) => {

  getCategories(genero).then((categories) => {

    let gender = genero.slice(11)

    document.querySelector(".spinner").style.display = "none";

    let allCategories = document.createElement("div");
    allCategories.className = "col-12 d-flex flex-wrap all-categories";

    categories.forEach((el) => {
      let category = document.createElement("div");
      category.className = "col-12 col-md-6 col-xl-4 my-5";
      category.style.cssText = `
                                display: flex; 
                                justify-content: center; 
                                align-items: center;
                                text-shadow: 1px 1px 10px black;
                                text-decoration: none;
                                `;

      let image = document.createElement("div");
      image.setAttribute('href',"")
      image.setAttribute('gender',gender)
      image.setAttribute('category',el.name)
      image.className = "focuscategoryimages click-category";
      image.innerHTML = `<h1 class="fontzing">${el.name}</h1>`
      image.style.cssText = `background-image: url('${el.img}'); text-decoration: none; cursor: pointer;`;

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

  /* window.addEventListener('click', (e)=>{
    if(e.target.classList.contains('focuscategoryimages')){
      let category = e.target.innerText;
      let gender = e.target.attributes.gender.value;
      e.preventDefault()
      ItemList(category, gender)
    }
  }) */

  return `
            <div class="container-fluid">
                <div class="row d-none d-md-block">
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
