import { getFirestore, storage } from "../../../firebase/firebase.js";

let db = getFirestore();
let storageRef = storage().ref();

window.addEventListener("click", (e) => {
    if (e.target.classList.contains("createGenderBtn")) {
      e.preventDefault();
      createGender();
    }
});

const genderFormValidation = () => {
    let genderForm = document.querySelector("#createGender");

    let validation;

    for (let i = 0; i < 2; i++) {
        if (genderForm[i].value === "") {
            genderForm[i].classList.add("is-invalid");
            genderForm[i].classList.remove("is-valid");
            validation = false;
        } else {
            genderForm[i].classList.add("is-valid");
            genderForm[i].classList.remove("is-invalid");
            validation = true;
        }
    }

    let progressBar = document.querySelector(".progress-bar-1");

    const progressValidation = () => {
        let progressVal = [];

        for (let i = 0; i < 2; i++) {
            if(genderForm[i].classList.contains('is-valid')){
                progressVal.push(1);
            }
        }

        let progressForm = progressVal.reduce((a, b) => a + b, 0);

        switch (progressForm) {
            case 1:
                progressBar.style.width = "50%";
                break;
            case 2:
                progressBar.style.width = "100%";
                break;
            default:
                progressBar.style.width = "0%";
                break;
        }
    };

    progressValidation();

    if (validation) {
        genderForm[2].removeAttribute("disabled");
        genderForm[2].style.opacity = 1;
    }
};

window.addEventListener('change', ()=>{
    if(document.querySelector('#genderpage')){
        genderFormValidation()
    }
})

const createGender = () => {

    let createGender = document.querySelector('#createGender')

    let progressBar = document.querySelector(".progress-bar-1");

    progressBar.style.width = "0%";

    document.querySelector(".createGenderBtn").style.display = "none";
    document.querySelector(".loadingbtn").style.display = "block";

    // ASIGNACION DE ELEMENTOS DEL FORM
    let name = (createGender[0].value).toLowerCase();
    let file = createGender[1].files[0];

    db.collection(`genders`).add({
        name,
        img: ""
    })
    .then((docRef) => {

        var uploadTask = storageRef.child(`genders/${docRef.id}`).put(file);

        uploadTask.on('state_changed', function (snapshot) {
            var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            progressBar.style.width = `${progress}%`;
            
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            console.log(error);
        }, function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                db.collection(`genders`).doc(docRef.id).update({
                    "img": downloadURL
                })
                .then(() => {
                    createGender.reset();
                    document.querySelector("#alertsuccess").style.display = "block";
                    document.querySelector(".loadingbtn").style.display = "none";
                    document.querySelector(".progress").style.display = "none";
                    setTimeout(() => {
                        app.innerHTML = CreateGender();;
                    }, 5000);
                });
            });
        });    
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

export const CreateGender = () => {

    return (
        `<div class="container-fluid p-0">
        <div class="row" id="genderpage">
            <div class="col-12">
              <div class="d-flex flex-row justify-content-center">
                <a reference="home" class="contactbreadcrumb">Inicio</a>
                <a reference="admin" class="contactbreadcrumb">> Administrador</a>
                <a reference="gendersdash" class="contactbreadcrumb">> Géneros</a>
                <p class="d-none d-sm-block">> Añadir Género</p>
            </div>
            </div>
            <div class="col-12 col-sm-10 offset-sm-1 my-5 d-flex flex-wrap justify-content-center">
              <div class="col-10 col-md-6">
                <h1 class="fontzing">CREAR GÉNERO</h1>
              </div>
              <div class="col-10 col-md-6 form">
              <form class="row g-3" id="createGender">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="validationServer01" placeholder="Hombre" required>
                        <label for="validationServer01" class="form-label" style="padding-left: 1.3rem;">Nombre</label>
                        <div class="valid-feedback">
                            Correcto!
                        </div>
                        <div id="validationServer01Feedback" class="invalid-feedback">
                            Elige un nombre
                        </div>
                    </div>
                    <div class="mb-3">
                        <input class="form-control" type="file" id="validationServer02" multiple>
                        <div class="valid-feedback">
                            Archivo seleccionado
                        </div>
                        <div id="validationServer02Feedback" class="invalid-feedback">
                            Selecciona una imagen
                        </div>
                    </div>
                    <div class="progress mb-3 px-0">
                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark progress-bar-1" role="progressbar" style="width: 0%"
                        aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <button type="submitBtn" class="mybutton createGenderBtn" disabled="true" style="opacity:0.6;">Añadir</button>
                    <button class="mybutton loadingbtn" type="button" disabled style="display:none;">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Subiendo
                    </button>
                </form>
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
                Nuevo género creado con éxito!
                </div>
            </div>
        </div>
        </div>
    </div>`
    )
}

export default CreateGender;