import { getCategories } from "../../../firebase/products.js";
import { getFirestore, storage } from "../../../firebase/firebase.js";

let man = "categories_man"
let woman = "categories_woman"

let db = getFirestore();
let storageRef = storage().ref();

export const ShowCategories = () => {

    window.addEventListener('click', (e)=>{

        if(e.target.classList.contains('deleteCat')){
            let id = e.target.parentElement.getAttribute('id');
            let gender = e.target.parentElement.getAttribute('gender')
            let database = e.target.parentElement.getAttribute('db')

            let confirmacion = confirm("Desea eleminar el elemento?");

            if(confirmacion){

            let focusImg = storageRef.child(`categories/${gender}/${id}`);

            focusImg
              .delete()
              .then(function () {
                console.log("imagen borrada");
              })
              .catch(function (error) {
                console.log("error ->", error);
              });

            let db = getFirestore();

            db.collection(`${database}`)
            .doc(id)
            .delete()
            .then(() => {
            app.innerHTML = ShowCategories();
            })
            .catch((error) => {
            console.error("error ->", error);
            });
            }
        }

        if(e.target.classList.contains('editCat')){
          e.target.parentElement.parentElement.children[1].style.display = "block"
          e.target.parentElement.parentElement.children[0].style.display = "none"
          e.target.parentElement.children[0].style.display = "none"
          e.target.parentElement.children[1].style.display = "block"
        }

        if(e.target.classList.contains('saveCat')){
          
          let id = e.target.parentElement.getAttribute('id')
          let database = e.target.parentElement.parentElement.getAttribute('db');
          let newname = e.target.parentElement.parentElement.children[1].value.toLowerCase();

          var docRef = db.collection(database).doc(id);

          return docRef
            .update({
              name: newname
            })
            .then(() => {
              console.log("Document successfully updated!");
              app.innerHTML = ShowCategories()
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        }
    })
    
  const setList = (db, categories, database, text) => {
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
          card.innerHTML = `<div class="card" style="width: 15rem; height: 15rem;">
        <div class="card-body card-space p-0" style="background-image: url(${img})">
          <div class="card-inner justify-content-evenly" style="height: 90%;">
            <h5 class="text-center fontzing2">${name.toUpperCase()}</h5>
            <input class="inputedit" type="text" value="${name.toUpperCase()}"/>
              <span class="d-flex flex-column justify-content-center" gender="${text}" db="${database}" id="${id}">
                <button type="button" class="btn mybutton2 editCat mb-2">
                        Editar<i class="bi bi-pencil ms-1"></i>
                </button>
                <button type="button" class="btn mybutton2 saveCat mb-2" style="display:none;">
                        Guardar<i class="bi bi-check2-square ms-1"></i>
                </button>
                <button type="button" class="btn mybutton deleteCat">Eliminar<i class="bi bi-trash-fill ms-1"></i>
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
    setList("#categoriesman", categories, man, 'man')  
  });

  getCategories('woman').then((categories) => {
    setList("#categorieswoman", categories, woman, 'woman')  
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
            <h1 class="text-center mb-5 fontzing">CATEGORIAS</h1>
          </div>
          <div class="col-12 d-flex justify-content-around flex-wrap">
            <div class="col-12 col-xl-5">
              <h3 class="text-center mb-3 fontzing">HOMBRE</h3>
              <div class="container" id="categoriesman">
              </div>
              <nav aria-label="Page navigation example" class="d-flex justify-content-center mt-3">
              </nav>
            </div>
            <div class="col-12 col-xl-5">
              <h3 class="text-center mb-3 fontzing">MUJER</h3>
              <div class="container" id="categorieswoman">
              </div>
              <nav aria-label="Page navigation example" class="d-flex justify-content-center mt-3">
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
`;
};
