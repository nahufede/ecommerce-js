import { getFirestore, storage } from "../../../firebase/firebase.js";
import { auth } from "../../../firebase/firebase.js";
import { getGenders } from "../../../firebase/db-calls.js";
import { Navbar } from "../../nav.js"

let db = getFirestore();
let storageRef = storage().ref();

window.addEventListener("click", async (e) => {
  let focus = e.target;

  if (focus.parentElement.classList.contains("edit-background")) {
    e.preventDefault()
    
    let folder = focus.parentElement.getAttribute('folder');
    let id = focus.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
    let input = focus.parentElement.parentElement.parentElement.parentElement.children[3]
    let button = focus.parentElement.parentElement.parentElement.parentElement.children[3].children[2]
    let title = focus.parentElement.parentElement.parentElement.parentElement.children[3].children[0]
    let name = focus.parentElement.parentElement.children[0].innerHTML.toLowerCase();
    let loadingbtn = focus.parentElement.parentElement.parentElement.parentElement.children[4]
    let file
    
    title.innerHTML = `Modificar ${name}`

    input.style.display = "block"

    input.addEventListener('change', ()=>{

      file = input.children[1].files[0]
      button.removeAttribute("disabled");
      button.style.opacity = 1;
    })

    button.addEventListener('click', ()=>{

    button.style.display = "none"
    input.style.display = "none"
    loadingbtn.style.display = "block"

    var uploadTask = storageRef
        .child(`${folder}/${id}`)
        .put(file);

      uploadTask.on(
        "state_changed",
        function (snapshot) {
          var progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          console.log(progress);

          loadingbtn.innerText = `Subiendo ${progress}%`

          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING:
              console.log("Upload is running");
              break;
          }
        },
        function (error) {
          console.log(error);
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            db.collection(`genders`)
              .doc(id)
              .update({
                background: downloadURL,
              })
              .then(() => {
                loadingbtn.innerText = `Actualizado!`
                loadingbtn.classList.add('bg-warning')
                loadingbtn.style.color = 'black'
                setTimeout(()=>{
                  app.innerHTML = ShowGenders();
                }, 1500)
              });
            }
          )
        }
      )    
    })
  }

  if (focus.parentElement.classList.contains("edit-portada")) {
    e.preventDefault()
    
    let folder = focus.parentElement.getAttribute('folder');
    let id = focus.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
    let input = focus.parentElement.parentElement.parentElement.parentElement.children[3]
    let button = focus.parentElement.parentElement.parentElement.parentElement.children[3].children[2]
    let title = focus.parentElement.parentElement.parentElement.parentElement.children[3].children[0]
    let name = focus.parentElement.parentElement.children[0].innerHTML.toLowerCase();
    let loadingbtn = focus.parentElement.parentElement.parentElement.parentElement.children[4]
    let file

    title.innerHTML = `Modificar ${name}`

    input.style.display = "block"

    input.addEventListener('change', ()=>{

      file = input.children[1].files[0]
      button.removeAttribute("disabled");
      button.style.opacity = 1;
    })

    button.addEventListener('click', ()=>{
    
    button.style.display = "none"
    input.style.display = "none"
    loadingbtn.style.display = "block"

    var uploadTask = storageRef
        .child(`${folder}/${id}`)
        .put(file);

      uploadTask.on(
        "state_changed",
        function (snapshot) {
          var progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          console.log(progress);

          loadingbtn.innerText = `Subiendo ${progress}%`

          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING:
              console.log("Upload is running");
              break;
          }
        },
        function (error) {
          console.log(error);
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            db.collection(`genders`)
              .doc(id)
              .update({
                portada: downloadURL,
              })
              .then(() => {
                loadingbtn.innerText = `Actualizado!`
                loadingbtn.classList.add('bg-warning')
                loadingbtn.style.color = 'black'
                setTimeout(()=>{
                  app.innerHTML = ShowGenders();
                }, 1500)
              });
            }
          )
        }
      )    
    })
  }

  if (focus.parentElement.classList.contains("deleteGender")) {
    e.preventDefault();

    let id = focus.parentElement.parentElement.parentElement.getAttribute("id");

    let confirmacion = confirm("Desea eleminar todo el género?");

    if (confirmacion) {
      let background = storageRef.child(`genders/${id}`);
      let portada = storageRef.child(`portadas/${id}`);

      background
        .delete()
        .then(function () {
          console.log("imagen borrada");
        })
        .catch(function (error) {
          console.log("error ->", error);
        });

      portada
        .delete()
        .then(function () {
          console.log("imagen borrada");
        })
        .catch(function (error) {
          console.log("error ->", error);
        });

      db.collection("genders")
        .doc(id)
        .delete()
        .then(() => {
          console.log("documento eliminado");
          app.innerHTML = ShowGenders();
          nav.innerHTML = Navbar();
        })
        .catch((error) => {
          console.error("error ->", error);
        });
    }
  }
});

export const ShowGenders = () => {
  getGenders().then((genders) => {
    document.querySelector(".spinner1").style.display = "none";

    let gendersContainer;
    let viewList = document.createElement("div");
    viewList.className = "d-flex pt-3 justify-content-evenly flex-wrap";

    if (document.querySelector("#genders")) {
      gendersContainer = document.querySelector("#genders");
    }

    genders.forEach((gender) => {
      /* Destrucuring sobre el objeto */

      const { name, id, background, portada } = gender;

      const card = document.createElement("div");
      card.className = "col-12 col-md-5 d-flex justify-content-center mb-4";
      card.innerHTML = `<div class="card gendercard p-2" id=${id}>
            <div class="d-flex align-items-center justify-content-between px-1">
            <h5 class="fontzing my-2 text-center">${name.toUpperCase()}</h5>
            <a href="" class="deleteGender"><i class="bi bi-trash-fill" style="color: black"></i></a>
            </div>
            <div class="card-body d-flex flex-column genderimg mb-2" style="background-image: url('${background}')">
              <span class="d-flex justify-content-end fontzing2">
                <h4 class="card-title m-0">Fondo</h4>
                <a folder="genders" class="d-flex align-items-center edit-background"><i class="bi bi-pencil text-white ms-2" style="cursor:pointer"></i></a>
              </span>
            </div>
            <div class="card-body d-flex flex-column genderimg mb-2" style="background-image: url('${portada}')">
              <span class="d-flex justify-content-end fontzing2">
                <h4 class="card-title m-0">Portada</h4>
                <a folder="portadas" class="d-flex align-items-center edit-portada"><i class="bi bi-pencil text-white ms-2" style="cursor:pointer"></i></a>
              </span>
            </div>
            <div id="upload-bg" style="display: none">
              <h5 class="fontzing text-center"></h5>
              <input class="form-control" style="font-size: 0.6rem" type="file">
              <button type="submit" class="mybutton upload-img-gender mt-2" disabled="true" style="opacity:0.6; width: 100%">Actualizar</button>
          </div>
          <button class="mybutton loadingbtn" type="button" disabled style="display:none; width: 100%">
          <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
          Subiendo
          </button>
        </div>
        `;
      viewList.appendChild(card);
    });

    gendersContainer.appendChild(viewList);
  });

  const user = auth().currentUser;

  /* if (user === null) {
    return `<div class="container">
            <div class="row">
                <div class="col-10 offset-1 col-md-6 offset-md-3 userdiv">
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
        </div>`;
  } else { */
    return `
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-row justify-content-center">
            <a reference="home" class="contactbreadcrumb">Inicio</a>
            <a reference="gendersdash" class="contactbreadcrumb">> Géneros</a>
            <p class="d-none d-sm-block">> Ver Géneros</p>
          </div>
        </div>
      </div>
      <div class="row p-0">
        <div class="col-12 my-3" id="genders">
            <h1 class="text-center py-3 m-0 fontzing">GÉNEROS</h1>
          <div class="text-center pt-5 spinner1">
            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  
};

export default ShowGenders;
