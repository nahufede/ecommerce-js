import { getCategories } from "../../firebase/products.js";

let app = document.querySelector("#app");

const categoriesPage = () => {

  getCategories('woman').then((categories) => {
    let allCategories = document.createElement("div");
    allCategories.className = "col-12 d-flex flex-wrap all-categories mt-3";

    categories.forEach((el) => {
      let category = document.createElement("div");
      category.className = "col-12 col-md-6 col-xl-4 my-3";
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

    if (document.querySelector(".womancategories")) {
      let womanContainer = document.querySelector(".womancategories");
      womanContainer.appendChild(allCategories);
    }
  });
};

export const Mujer = () => {
  categoriesPage();

  window.addEventListener('click', (e)=>{
    let category = e.target.innerText;
    if(e.target.classList.contains('focuscategoryimages')){
      e.preventDefault()
      app.innerHTML = ItemList(category)
    }
  })

  return `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="landingwoman"></div>
                    </div>
                </div>
                <div class="row womancategories"></div>
            </div>
    `;
};

export default Mujer;
