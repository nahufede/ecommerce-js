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

        if(e.target.classList.contains('editCat')){
          console.log(e.target.parentElement.parentElement.parentElement);
      }
    })
    
  const setList = (db, categories) => {
    let catList = document.createElement("div");
      catList.className = "row pt-4";

      let categoriesList;

      if (document.querySelector(db)) {
        categoriesList = document.querySelector(db);
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
            <h4 class="text-center">${name.toUpperCase()}</h4>
              <span class="d-flex flex-column justify-content-center">
                <button type="button" class="btn mybutton2 editCat mb-2">
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

        categoriesList.appendChild(catList);
      };

      setCategories();
  }

  getCategories('man').then((categories) => {
    setList("#categoriesman", categories)  
  });

  getCategories('woman').then((categories) => {
    setList("#categorieswoman", categories)  
  });

  return `
    <div class="container-fluid categoriespage">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-row justify-content-center">
            <a id="home" class="contactbreadcrumb">Inicio</a>
            <a id="admin" class="contactbreadcrumb">> Administrador</a>
            <p>> Categorias</p>
          </div>
        </div>
      </div>
      <div class="row p-0">
        <div class="col-12 my-5">
          <div class="col-12">
            <h1 class="text-center mb-5">CATEGORIAS</h1>
          </div>
          <div class="col-12 d-flex justify-content-around flex-wrap">
            <div class="col-12 col-xl-5">
              <h3 class="text-center mb-3">HOMBRE</h3>
              <div class="container" id="categoriesman">
              </div>
              <nav aria-label="Page navigation example" class="d-flex justify-content-center mt-3">
                <ul class="pagination mypagination">
                </ul>
              </nav>
            </div>
            <div class="col-12 col-xl-5">
              <h3 class="text-center mb-3">MUJER</h3>
              <div class="container" id="categorieswoman">
              </div>
              <nav aria-label="Page navigation example" class="d-flex justify-content-center mt-3">
                <ul class="pagination mypagination">
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
`;
};
