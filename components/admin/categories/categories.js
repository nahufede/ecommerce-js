import { getCategories, getGenders } from "../../../firebase/db-calls.js";
import { getFirestore, storage } from "../../../firebase/firebase.js";
import { Navbar } from "../../nav.js";
import { auth } from "../../../firebase/firebase.js";

let db = getFirestore();
let storageRef = storage().ref();

export const ShowCategories = () => {

    getGenders().then((el)=>{

      document.querySelector(".spinner1").style.display = "none";

      if(document.querySelector('.categoriespage')){
        
      document.querySelector('.categoriesbuttons').innerText = ""

      let categoriesbuttons = document.querySelector(".categoriesbuttons")

      el.forEach(el => {
        const { name } = el;

        let button = document.createElement('button')
        button.innerHTML = name.toUpperCase()
        button.className = "mybutton mb-2 fontzing"
        button.setAttribute('id', 'catlist')

        categoriesbuttons.appendChild(button)
      })}
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

              getCategories(`categories_${gender}`).then((categories) => {
                setList("#categorieslist", categories, gender)  
              })
              nav.innerHTML = Navbar();
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

              nav.innerHTML = Navbar();

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

            document.querySelector(".spinner1").style.display = "none";

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

  const user = auth().currentUser;

    if(user === null){
    return (
            `<div class="container">
            <div class="row">
                <div class="col-12 col-sm-6 offset-sm-3 userdiv">
                    <div class="d-flex flex-row justify-content-center">
                        <a reference="home" class="contactbreadcrumb">Inicio</a>
                        <p>> Administrador</p>
                    </div>
                    <h1 class="text-center mt-3">INICIAR SESIÓN</h1>
                    <p class="text-center mt-3">ACCESO DE USUARIO</p>
                    <form id="userForm" class="d-flex flex-column mt-5">
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="floatingEmail" placeholder="Email">
                            <label for="floatingInput">Email</label>
                        </div>
                        <div class="form-floating mb-3" id="userpass">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Contraseña">
                            <label for="floatingPassword">Contraseña</label>
                        </div>
                        <button reference="login" class="mybutton" type="submit">INICIAR SESIÓN</button>
                    </form>
                </div>
            </div>
        </div>`
    )} else {

  return `
    <div class="container-fluid categoriespage">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-row justify-content-center">
              <a reference="home" class="contactbreadcrumb">Inicio</a>
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
            <div class="col-12 col-sm-3 text-center">
                <h3 class="text-center mb-3 fontzing">GÉNEROS</h3>
                  <div class="d-flex flex-column categoriesbuttons py-3">
                  </div>
                  <div class="spinner-border spinner1" role="status">
                      <span class="visually-hidden">Loading...</span>
                  </div>
            </div>
            <div class="col-12 col-sm-9">
              <h3 class="text-center fontzing">LISTA</h3>
              <div class="container text-center" id="categorieslist">
                <h5 class="text-center fontzing mb-3">SELECCIONA UNA CATEGORIA</h5>
                  <div class="spinner-grow spinner1" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
};
