import { getFirestore, storage } from "../../../firebase/firebase.js";
import { getGenders } from "../../../firebase/db-calls.js";
import { auth } from "../../../firebase/firebase.js";

let db = getFirestore();
let storageRef = storage().ref();

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("createCatBtn")) {
    e.preventDefault();
    createCategory();
  }
});

const categoryFormValidation = () => {
  let categoryForm = document.querySelector("#createcategory");

  let validation;

  for (let i = 0; i < 3; i++) {
    if (categoryForm[i].value === "") {
      categoryForm[i].classList.add("is-invalid");
      categoryForm[i].classList.remove("is-valid");
      validation = false;
    } else {
      categoryForm[i].classList.add("is-valid");
      categoryForm[i].classList.remove("is-invalid");
      validation = true;
    }
  }

  let progressBar = document.querySelector(".progress-bar-1");

  const progressValidation = () => {
    let progressVal = [];

    for (let i = 0; i < 3; i++) {
      if(categoryForm[i].classList.contains('is-valid')){
        progressVal.push(1);
      }
    }

    let progressForm = progressVal.reduce((a, b) => a + b, 0);

    switch (progressForm) {
      case 1:
        progressBar.style.width = "33%";
        break;
      case 2:
        progressBar.style.width = "66%";
        break;
      case 3:
        progressBar.style.width = "100%";
        break;
      default:
        progressBar.style.width = "0%";
        break;
    }
  };

  progressValidation();

  if (validation) {
    categoryForm[3].removeAttribute("disabled");
    categoryForm[3].style.opacity = 1;
  }
};

window.addEventListener("change", () => {
  if (document.querySelector("#createCategories")) {
    let selectGender = document.querySelector(".addcategorygender");

    if (document.querySelector("#createcategory")) {
      let createcategory = document.querySelector("#createcategory");

      if (createcategory[0].value.length > 0) {
        createcategory[1].removeAttribute("disabled");
      }

      if (createcategory[1].length === 1) {
        getGenders().then((genders) => {
          genders.forEach((el) => {
            const option = document.createElement("option");

            const { name } = el;

            option.innerHTML = name.charAt(0).toUpperCase() + name.slice(1);
            option.setAttribute("value", name.toLowerCase());

            selectGender.appendChild(option);
          });
        });
      }
    }

    categoryFormValidation();
  }
});

export function createCategory() {
  let createcategory = document.querySelector("#createcategory");
  let progressBar = document.querySelector(".progress-bar-1");

  progressBar.style.width = "0%";

  document.querySelector(".createCatBtn").style.display = "none";
  document.querySelector(".loadingbtn").style.display = "block";

  /* document.querySelector('.progress-bar-2').parentElement.style.display = "block"; */

  // ASIGNACION DE ELEMENTOS DEL FORM
  let name = createcategory[0].value.toLowerCase();
  let gender = createcategory[1].value.toLowerCase();
  let file = createcategory[2].files[0];

  db.collection(`categories_${gender}`)
    .add({
      name,
      gender,
      img: "",
    })
    .then((docRef) => {
      var uploadTask = storageRef
        .child(`categories/${gender}/${docRef.id}`)
        .put(file);

      uploadTask.on(
        "state_changed",
        function (snapshot) {
          var progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          progressBar.style.width = `${progress}%`;

          console.log(progressBar.style.width);

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
            db.collection(`categories_${gender}`)
              .doc(docRef.id)
              .update({
                img: downloadURL,
              })
              .then(() => {
                createcategory.reset();
                document.querySelector("#alertsuccess").style.display = "block";
                document.querySelector(".loadingbtn").style.display = "none";
                document.querySelector(".progress").style.display = "none";
                setTimeout(() => {
                  app.innerHTML = CreateCategories();
                }, 5000);
              });
          });
        }
      );
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

export const CreateCategories = () => {

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

  return `<div class="container-fluid p-0">
        <div class="row" id="createCategories">
            <div class="col-12">
                <div class="d-flex flex-row justify-content-center">
                    <a reference="home" class="contactbreadcrumb">Inicio</a>
                    <a reference="categoriesdash" class="contactbreadcrumb">> Categorias</a>
                    <p class="d-none d-sm-block">> Añadir Categoria</p>
                </div>
            </div>
            <div class="col-12 col-sm-10 offset-1 my-5 d-flex flex-wrap justify-content-center">
              <div class="col-10 col-md-6">
                <h1 class="fontzing mb-4">CREAR CATEGORIA</h1>
              </div>
              <div class="col-10 col-md-6 form">
              <form class="row g-3" id="createcategory">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="validationServer01" placeholder="Traje de baño" required>
                        <label for="validationServer01" class="form-label" style="padding-left: 1.3rem;">Nombre</label>
                        <div class="valid-feedback">
                            Correcto!
                        </div>
                        <div id="validationServer01Feedback" class="invalid-feedback">
                            Elige un nombre
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <select class="form-select addcategorygender" disabled="true" id="validationServer02"
                            aria-describedby="validationServer02Feedback" required>
                            <option selected disabled value="">Seleccionar</option>
                        </select>
                        <label for="validationServer02" style="padding-left: 1.3rem;" class="form-label">Género</label>
                        <div class="valid-feedback">
                            Correcto!
                        </div>
                        <div id="validationServer02Feedback" class="invalid-feedback">
                            Selecciona un género
                        </div>
                    </div>
                    <div class="mb-3">
                        <input class="form-control" type="file" id="validationServer03">
                        <div class="valid-feedback">
                            Archivo seleccionado
                        </div>
                        <div id="validationServer03Feedback" class="invalid-feedback">
                            Selecciona una imagen
                        </div>
                    </div>
                    <div class="progress mb-3 px-0">
                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark progress-bar-1" role="progressbar" style="width: 0%"
                        aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <button type=submit" class="mybutton createCatBtn" disabled="true" style="opacity:0.6;">Añadir</button>
                    <button class="mybutton loadingbtn" type="button" disabled style="display:none;">
                    <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Subiendo
                    </button>
                </form>
              </div>
            </div>
        </div>
        <div class="col-12" id="alertsuccess" style="display:none;">
            <svg xmlns="http://www.w3.org/2000/svg" style="display:none;">
                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </symbol>
            </svg>
            <div class="alert alert-success d-flex align-items-center justify-content-center mt-3" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                <div>
                Nueva categoría creada con éxito!
                </div>
            </div>
        </div>
    </div>`;
  };
};

export default CreateCategories;
