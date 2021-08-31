import { getCategories } from "../../firebase/products.js";

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
                                align-items: center;`;

      let image = document.createElement("div");
      image.className = "focuscategoryimages";
      image.innerHTML = `<h1>${el.name}</h1>`
      image.style.cssText = `background-image: url('${el.img}')`;

      category.appendChild(image);

      allCategories.appendChild(category);
    });

    if (document.querySelector(".mancategories")) {
      let manContainer = document.querySelector(".mancategories");
      manContainer.appendChild(allCategories);
      console.log("hola");
    }
  });
};

export const Mujer = () => {
  categoriesPage();

  return `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="landingwoman"></div>
                    </div>
                </div>
                <div class="row mancategories"></div>
            </div>
    `;
};

export default Mujer;
