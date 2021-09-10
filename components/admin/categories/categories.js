import { getCategories, getGenders } from "../../../firebase/products.js";
import { getFirestore, storage } from "../../../firebase/firebase.js";

let db = getFirestore();
let storageRef = storage().ref();

export const ShowCategories = () => {

    getGenders().then((el)=>{

      document.querySelector('.categoriesbuttons').innerText = ""

      let categoriesbuttons = document.querySelector(".categoriesbuttons")

      el.forEach(el => {
        const { name } = el;

        let button = document.createElement('button')
        button.innerHTML = name.toUpperCase()
        button.className = "mybutton mb-2 fontzing"
        button.setAttribute('id', 'catlist')

        categoriesbuttons.appendChild(button)
      })
    })

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
              document.querySelector('#categorieslist').innerHTML = ""

              getCategories(`categories_hombre`).then((categories) => {
                setList("#categorieslist", categories, gender)  
              })
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
          let gender = e.target.parentElement.getAttribute('gender')
          let database = e.target.parentElement.getAttribute('db');
          let newname = e.target.parentElement.parentElement.children[1].value.toLowerCase();

          var docRef = db.collection(database).doc(id);

          return docRef
            .update({
              name: newname
            })
            .then(() => {
            
              document.querySelector('#categorieslist').innerHTML = ""

              getCategories(`${database}`).then((categories) => {
                setList("#categorieslist", categories, gender)  
              })
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        }

        if(e.target.getAttribute('id') === "catlist"){

          document.querySelector('#categorieslist').innerText = ""

          let name = e.target.innerHTML.toLowerCase()
          
          getCategories(`categories_${name}`).then((categories) => {
            setList("#categorieslist", categories, name)  
          })
        }
    })
    
  const setList = (db, categories, text) => {
    let catList = document.createElement("div");
      catList.className = "row pt-4";

      let categoriesList;

      if (document.querySelector(db)) {
        categoriesList = document.querySelector(db);
      }

      const setCategories = () => {
        categories.forEach((el) => {
          /* Destrucuring sobre el objeto */

          const { name, img, id, gender } = el;

          const card = document.createElement("div");
          card.className =
            "col-6 col-sm-4 col-xl-2 d-flex justify-content-center mb-4 dbcard";
          card.innerHTML = `<div class="card" style="width: 15rem; height: 10rem;">
        <div class="card-body card-space p-0" style="background-image: url(${img})">
          <div class="card-inner justify-content-evenly" style="height: 90%;">
            <h5 class="text-center fontzing2">${name.toUpperCase()}</h5>
            <input class="inputedit" type="text" value="${name.toUpperCase()}"/>
              <span class="d-flex flex-column justify-content-center" gender="${text}" db="categories_${gender}" id="${id}">
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

  return `
    <div class="container-fluid categoriespage">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-row justify-content-center">
              <a reference="home" class="contactbreadcrumb">Inicio</a>
              <a reference="admin" class="contactbreadcrumb">> Administrador</a>
              <a reference="categoriesdash" class="contactbreadcrumb">> Categorias</a>
              <p class="d-none d-sm-block">> Ver Categorias</p>
          </div>
        </div>
      </div>
      <div class="row p-0">
        <div class="col-12 my-5">
          <div class="col-12">
            <h1 class="text-center mb-5 fontzing">CATEGORIAS</h1>
          </div>
          <div class="col-12 d-flex justify-content-around flex-wrap">
            <div class="col-12 col-sm-3">
                <h3 class="text-center mb-3 fontzing">GÉNEROS</h3>
                  <div class="d-flex flex-column categoriesbuttons py-3">
                  </div>
            </div>
            <div class="col-12 col-sm-9">
              <h3 class="text-center fontzing">LISTA</h3>
              <div class="container" id="categorieslist">
                <h5 class="text-center fontzing">SELECCIONA UNA CATEGORIA</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
`;
};
