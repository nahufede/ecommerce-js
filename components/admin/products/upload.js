import { getCategories, getGenders } from "../../../firebase/products.js";
import { getFirestore, storage } from "../../../firebase/firebase.js";

let db = getFirestore();
let storageRef = storage().ref();

/* window.addEventListener("keypress", function(event){
    if (event.key === 'Enter'){
        event.preventDefault();
    }
}, false); */

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
      if (createForm[i].value.length != 0) {
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
};

window.addEventListener('click', (e)=>{
  if(e.target.classList.contains('genderselect')){
   
    let createForm = document.querySelector("#createForm");

    let selectItems = document.querySelector(".categoryupload");

    selectItems.innerHTML = '<option selected="" disabled="" value="">Seleccionar</option>'

    let gender = createForm[1];

    if (gender.length > 1) {
      createForm[2].removeAttribute("disabled");

      getCategories(`categories_${gender.value}`).then((el) => {
        let categories = el;

        categories.forEach((el) => {
          const option = document.createElement("option");

          const { name } = el;

          option.innerHTML = name.charAt(0).toUpperCase() + name.slice(1);
          option.setAttribute("value", name.toLowerCase());

          selectItems.appendChild(option);
        });
      });
    }
  }
})

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
  document.querySelector(".progress-bar-1").parentElement.style.display =
    "none";

  // ASIGNACION DE ELEMENTOS DEL FORM
  let name = createForm[0].value;
  let category = createForm[2].value;
  let price = createForm[3].value;
  let description = createForm[4].value;
  let file = createForm[5].files[0];

  category = category.charAt(0).toUpperCase() + category.slice(1);

  db.collection("products")
    .add({
      name,
      price,
      description,
      category,
      img: "",
    })
    .then((docRef) => {
      let progressBar = document.querySelector(".progress-bar-2");

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
            db.collection("products")
              .doc(docRef.id)
              .update({
                img: downloadURL,
              })
              .then(() => {
                console.log("Document successfully updated!");
                progressBar.classList.add("bg-warning");

                app.innerHTML = Upload();
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

  return `<div class="container">
        <div class="row" id="uploadpage">
            <div class="col-12">
              <div class="d-flex flex-row justify-content-center">
                <a reference="home" class="contactbreadcrumb">Inicio</a>
                <a reference="admin" class="contactbreadcrumb">> Administrador</a>
                <a reference="productsdash" class="contactbreadcrumb">> Productos</a>
                <p class="d-none d-sm-block">> Subir Item</p>
            </div>
            </div>
            <div class="col-12 my-5 d-flex flex-wrap justify-content-center">
              <div class="col-10 col-md-6">
                <h1 class="fontzing">SUBIR PRODUCTOS</h1>
              </div>
              <div class="col-10 col-md-6 form">
              <form class="row g-3" id="createForm">
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
                        <select class="form-select categorygender" disabled="true" id="validationServer02"
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
                            Selecciona una categoría
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
                    <label for="validationServer05" style="padding-left: 1.3rem;">Descripción</label>
                    <div class="valid-feedback">
                        Correcto!
                    </div>
                    <div id="validationServer05Feedback" class="invalid-feedback">
                        Escribe una descripción
                    </div>
                    </div>
                    <div class="mb-3">
                    <input class="form-control" type="file" id="validationServer06" multiple>
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
                    <div class="progress mb-3 px-0">
                    <div class="progress-bar progress-bar-striped progress-bar-animated progress-bar-2" role="progressbar" style="width: 0%"
                        aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <button type="submitBtn" class="mybutton submitBtn" disabled="true" style="opacity:0.6;">Subir</button>
                    <button class="mybutton loadingbtn" type="button" disabled style="display:none;">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Subiendo
                    </button>
                </form>
              </div>
            </div>
        </div>
    </div>`;
};

export default Upload;
