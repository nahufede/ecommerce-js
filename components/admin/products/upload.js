import { getCategories, getGenders } from "../../../firebase/db-calls.js";
import { getFirestore, storage } from "../../../firebase/firebase.js";
import { auth } from "../../../firebase/firebase.js";

let db = getFirestore();
let storageRef = storage().ref();

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("submitBtn")) {
    e.preventDefault();
    createElements(e);
  }
});

const uploadFormValidation = () => {
  let createForm = document.querySelector("#createForm");

  let validation;

  for (let i = 0; i < 6; i++) {
    if (createForm[i].value === "") {
      createForm[i].classList.add("is-invalid");
      createForm[i].classList.remove("is-valid");
      validation = false;
    } else {
      createForm[i].classList.add("is-valid");
      createForm[i].classList.remove("is-invalid");
      validation = true;
    }
  }

  let progressBar = document.querySelector(".progress-bar-1");

  const progressValidation = () => {
    let progressVal = [];

    for (let i = 0; i < 6; i++) {
      if(createForm[i].classList.contains('is-valid')){
        progressVal.push(1);
      }
    }

    let progressForm = progressVal.reduce((a, b) => a + b, 0);

    switch (progressForm) {
      case 1:
        progressBar.style.width = "17%";
        break;
      case 2:
        progressBar.style.width = "33%";
        break;
      case 3:
        progressBar.style.width = "50%";
        break;
      case 4:
        progressBar.style.width = "65%";
        break;
      case 5:
        progressBar.style.width = "85%";
        break;
      case 6:
        progressBar.style.width = "100%";
        break;
      default:
        progressBar.style.width = "0%";
        break;
    }
  };

  progressValidation();

  if (validation) {
    createForm[6].removeAttribute("disabled");
    document.querySelector(".submitBtn").style.opacity = 1;
  }

  let name = createForm[0].value;

  if(name.length > 0){
    createForm[1].removeAttribute("disabled");
  }

  let selectGender = document.querySelector(".categorygender");

  if(selectGender.length === 1 ){
    getGenders().then((genders) => {

      genders.forEach((el) => {
        const option = document.createElement("option");
  
        const { name } = el;
  
        option.innerHTML = name.charAt(0).toUpperCase() + name.slice(1);
        option.setAttribute("value", name.toLowerCase());
        option.className = "genderselect"
  
        selectGender.appendChild(option);
      });
    });
  }
  
  selectGender.addEventListener('change', ()=>{
    
    let gender = createForm[1];
    let selectItems = document.querySelector(".categoryupload");

    createForm[2].removeAttribute("disabled");

    getCategories(`categories_${gender.value}`).then((el) => {

      selectItems.innerHTML = '<option selected="" disabled="" value="">Seleccionar</option>'

      let categories = el;

      categories.forEach((el) => {
        const option = document.createElement("option");

        const { name } = el;

        option.innerHTML = name.charAt(0).toUpperCase() + name.slice(1);
        option.setAttribute("value", name.toLowerCase());

        selectItems.appendChild(option);
      });
    });
  })
};

window.addEventListener("change", () => {
  if (document.querySelector("#uploadpage")) {
    uploadFormValidation();
  }
});

export function createElements(e) {
  // PREVENT DEFAULT PARA QUE NO RECARGUE LA PAGINA AL DARLE SUBMIT
  e.preventDefault();
  document.querySelector(".submitBtn").style.display = "none";
  document.querySelector(".loadingbtn").style.display = "block";
  document.querySelector(".progress-bar-1").style.width = "0%"

  // ASIGNACION DE ELEMENTOS DEL FORM
  let name = createForm[0].value;
  let gender = createForm[1].value;
  let category = createForm[2].value;
  let price = createForm[3].value;
  let description = createForm[4].value;
  let file = createForm[5].files[0];

  db.collection("products")
    .add({
      name,
      price,
      gender,
      description,
      category,
      img: "",
    })
    .then((docRef) => {
      let progressBar = document.querySelector(".progress-bar-1");

      var uploadTask = storageRef
        .child(`products/${category.toLowerCase()}/${docRef.id}`)
        .put(file);

      uploadTask.on(
        "state_changed",
        function (snapshot) {
          var progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          progressBar.style.width = `${progress}%`;
          document.querySelector('.loadingbtn').innerHTML = `<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
          Subiendo  ${progress}%`;

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              break;
            case firebase.storage.TaskState.RUNNING:
              break;
          }
        },
        function (error) {
          console.log(error);
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            db.collection("products")
              .doc(docRef.id)
              .update({
                img: downloadURL,
              })
              .then(() => {
                createForm.reset();
                document.querySelector("#alertsuccess").style.display = "block";
                document.querySelector(".loadingbtn").style.display = "none";
                document.querySelector(".progress-bar-1").parentElement.style.display = "none";
                setTimeout(()=>{
                  app.innerHTML = Upload();
                },
                5000)
              });
          });
        }
      );
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

export const Upload = () => {
  
  const user = auth().currentUser;

    if(user === null){
    return (
            `<div class="container">
            <div class="row">
                <div class="col-10 offset-1 col-md-6 offset-md-3 userdiv">
                    <div class="d-flex flex-row justify-content-center">
                        <a reference="home" class="contactbreadcrumb">Inicio</a>
                        <p>> Administrador</p>
                    </div>
                    <h1 class="text-center mt-3">INICIAR SESI??N</h1>
                    <p class="text-center mt-3">ACCESO DE USUARIO</p>
                    <form id="userForm" class="d-flex flex-column mt-5">
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="floatingEmail" placeholder="Email">
                            <label for="floatingInput">Email</label>
                        </div>
                        <div class="form-floating mb-3" id="userpass">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Contrase??a">
                            <label for="floatingPassword">Contrase??a</label>
                        </div>
                        <button reference="login" class="mybutton" type="submit">INICIAR SESI??N</button>
                    </form>
                </div>
            </div>
        </div>`
    )} else {

  return `
      <div class="container-fluid">
        <div class="row" id="uploadpage">
            <div class="col-12">
              <div class="d-flex flex-row justify-content-center">
                <a reference="home" class="contactbreadcrumb">Inicio</a>
                <a reference="productsdash" class="contactbreadcrumb">> Productos</a>
                <p class="d-none d-sm-block">> Subir Item</p>
              </div>
            </div>
            <div class="col-12 my-5 d-flex flex-wrap justify-content-center p-0">
              <div class="col-10 col-md-6">
                <h1 class="fontzing text-center">SUBIR PRODUCTOS</h1>
              </div>
              <div class="col-10 col-md-6 form px-3">
                <form class="row g-3" id="createForm" onkeypress="if(event.keyCode == 13) event.returnValue = false;">
                    <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="validationServer01" placeholder="Traje de ba??o" required>
                    <label for="validationServer01" class="form-label" style="padding-left: 1.3rem;">Nombre</label>
                    <div class="valid-feedback">
                        Correcto!
                    </div>
                    <div id="validationServer01Feedback" class="invalid-feedback">
                        Elige un nombre
                    </div>
                    </div>
                    <div class="form-floating mb-3">
                        <select class="form-select categorygender" disabled="true" id="validationServer02"
                            aria-describedby="validationServer02Feedback" required>
                            <option selected disabled value="">Seleccionar</option>
                        </select>
                        <label for="validationServer02" style="padding-left: 1.3rem;" class="form-label">G??nero</label>
                        <div class="valid-feedback">
                            Correcto!
                        </div>
                        <div id="validationServer02Feedback" class="invalid-feedback">
                            Selecciona un g??nero
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <select class="form-select categoryupload" disabled="true" id="validationServer03"
                            aria-describedby="validationServer03Feedback" required>
                            <option selected disabled value="">Seleccionar</option>
                        </select>
                        <label for="validationServer03" style="padding-left: 1.3rem;" class="form-label">Categoria</label>
                        <div class="valid-feedback">
                            Correcto!
                        </div>
                        <div id="validationServer02Feedback" class="invalid-feedback">
                            Selecciona una categor??a
                        </div>
                    </div>
                
                    <div class="input-group mb-3">
                    <label for="validationServer04" class="form-label" style="display: none;">Precio</label>
                    <span class="input-group-text">$</span>
                    <input type="number" class="form-control" id="validationServer04"
                        aria-label="Amount (to the nearest dollar)" required>
                    <span class="input-group-text">.00</span>
                    <div class="valid-feedback">
                        Correcto!
                    </div>
                    <div id="validationServer04Feedback" class="invalid-feedback">
                        Introducir precio
                    </div>
                    </div>
                
                    <div class="form-floating mb-3">
                    <textarea class="form-control" id="validationServer05" placeholder="Required example textarea" required
                        style="height: 100px"></textarea>
                    <label for="validationServer05" style="padding-left: 1.3rem;">Descripci??n</label>
                    <div class="valid-feedback">
                        Correcto!
                    </div>
                    <div id="validationServer05Feedback" class="invalid-feedback">
                        Escribe una descripci??n
                    </div>
                    </div>
                    <div class="mb-3">
                    <input class="form-control" type="file" id="validationServer06">
                    <div class="valid-feedback">
                        Archivo seleccionado
                    </div>
                    <div id="validationServer06Feedback" class="invalid-feedback">
                        Selecciona una imagen
                    </div>
                    </div>
                    <div class="progress mb-3 px-0">
                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark progress-bar-1" role="progressbar" style="width: 0%"
                        aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <button type="submit" class="mybutton submitBtn" disabled="true" style="opacity:0.6;">Subir</button>
                    <button class="mybutton loadingbtn" type="button" disabled style="display:none;">
                    <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Subiendo
                    </button>
                </form>
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
                  Nuevo an??ncio creado con ??xito!
                  </div>
              </div>
            </div>
        </div>
      </div>`;
  };
};

export default Upload;
