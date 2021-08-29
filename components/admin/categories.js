import { getCategories } from "../../firebase/products.js";
import { getFirestore } from "../../firebase/firebase.js";

export const Categories = () => {

    window.addEventListener('click', (e)=>{

        if(e.target.classList.contains('deleteCat')){
            let id = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('id');

            let confirmacion = confirm("Desea eleminar el elemento?");

            if(confirmacion){
            let db = getFirestore();
            db.collection('categories_man')
            .doc(id)
            .delete()
            .then(() => {
            app.innerHTML = Categories();
            })
            .catch((error) => {
            console.error("error ->", error);
            });
            }
        }
    })
    
  // LLAMADO FIREBASE DE CATEGORIAS

  getCategories().then((categories) => {

      let catList = document.createElement("div");
      catList.className = "row pt-4";

      let categoriesContainer;

      if (document.querySelector("#categoriespage")) {
        categoriesContainer = document.querySelector("#categoriespage");
      }

      const setCategories = () => {
        categories.forEach((el) => {
          /* Destrucuring sobre el objeto */

          const { name, img, id } = el;

          const card = document.createElement("div");
          card.className =
            "col-6 col-md-4 d-flex justify-content-center mb-4 dbcard";
          card.innerHTML = `<div class="card" style="width: 15rem; height: 15rem;" id="${id}">
        <div class="card-body card-space p-0" style="background-image: url(${img})">
          <div class="card-inner justify-content-evenly" style="height: 90%;">
            <h2 class="text-center">${name.toUpperCase()}</h2>
              <span class="d-flex flex-column justify-content-center">
                <button type="button" class="btn mybutton editCat mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Editar
                </button>
                <button type="button" class="btn mybutton deleteCat">Eliminar
                </button>
              </span>
          </div>
        </div>
      </div>
      `;
          catList.appendChild(card);
        });

        categoriesContainer.appendChild(catList);
      };

      setCategories();
    });

  return `
    <div class="container categoriespagepage">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-row justify-content-center">
            <a id="home" class="contactbreadcrumb" href="">Inicio</a>
            <a id="admin" class="contactbreadcrumb" href="">> Administrador</a>
            <p>> Categorias</p>
          </div>
        </div>
      </div>
      <div class="row p-0">
        <div class="col-12 my-5">
          <div class="col-12">
            <h1 class="text-center mb-5">CATEGORIAS</h1>
          </div>
          <div class="col-12">
            <div class="container" id="categoriespage">
            </div>
            <nav aria-label="Page navigation example" class="d-flex justify-content-center mt-3">
              <ul class="pagination mypagination">
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
`;
};
