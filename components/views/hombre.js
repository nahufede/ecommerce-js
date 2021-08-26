import { getCategories } from "../../firebase/products.js";

const categoriesPage = () => {

  getCategories().then((categories) => {
    let allCategories = document.createElement("div");
    allCategories.className = "col-12 d-flex flex-wrap all-categories mt-3";

    categories.forEach((el) => {
      let category = document.createElement("div");
      category.className = "col-12 col-md-6 col-lg-4 my-3";
      category.style.cssText = `
                                display: flex; 
                                justify-content: center; 
                                align-items: center;`;

      let image = document.createElement("div");
      image.className = "images";
      image.innerHTML = el.name;
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

export const Hombre = () => {
  categoriesPage();

  return `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                    class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                    aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                    aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="img/prueba.jpg" class="d-block w-100" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="img/prueba2.jpg" class="d-block w-100" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="img/prueba3.jpg" class="d-block w-100" alt="...">
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row mancategories"></div>
            </div>
    `;
};

export default Hombre;
