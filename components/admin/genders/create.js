import { getFirestore, storage } from "../../../firebase/firebase.js";
import { auth } from "../../../firebase/firebase.js";
import { Navbar } from "../../nav.js"

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

    for (let i = 0; i < 3; i++) {
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

        for (let i = 0; i < 3; i++) {
            if(genderForm[i].classList.contains('is-valid')){
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
        genderForm[3].removeAttribute("disabled");
        genderForm[3].style.opacity = 1;
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
    let backfile = createGender[1].files[0];
    let frontfile = createGender[2].files[0];

    db.collection(`genders`).add({
        name,
        background: "",
        portada: ""

    })
    .then( async (docRef) => {

        var uploadTask1 = storageRef.child(`genders/${docRef.id}`).put(backfile);

        await uploadTask1.on('state_changed', function (snapshot) {
            
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        }, function (error) {
            console.log(error);
        }, function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask1.snapshot.ref.getDownloadURL().then(function(downloadURL1) {
                db.collection(`genders`).doc(docRef.id).update({
                    "background": downloadURL1
                })
            });
        });

        var uploadTask2 = storageRef.child(`portadas/${docRef.id}`).put(frontfile);
        await uploadTask2.on('state_changed', function (snapshot) {
            var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            progressBar.style.width = `${progress}%`;
            
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        }, function (error) {
            console.log(error);
        }, function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask2.snapshot.ref.getDownloadURL().then(function(downloadURL2) {
                db.collection(`genders`).doc(docRef.id).update({
                    "portada": downloadURL2
                })
                .then(() => {
                    createGender.reset();
                    document.querySelector("#alertsuccess").style.display = "block";
                    document.querySelector(".loadingbtn").style.display = "none";
                    document.querySelector(".progress").style.display = "none";
                    nav.innerHTML = Navbar();
                    setTimeout(() => {
                        app.innerHTML = CreateGender();;
                    }, 3000);
                });
            });
        });
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    })   
}

export const CreateGender = () => {

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

    return (
        `<div class="container-fluid p-0">
        <div class="row" id="genderpage">
            <div class="col-12">
                <div class="d-flex flex-row justify-content-center">
                    <a reference="home" class="contactbreadcrumb">Inicio</a>
                    <a reference="gendersdash" class="contactbreadcrumb">> G??neros</a>
                    <p class="d-none d-sm-block">> A??adir G??nero</p>
                </div>
            </div>
            <div class="col-12 col-sm-10 offset-sm-1 my-5 d-flex flex-wrap justify-content-center">
              <div class="col-10 col-md-6">
                <h1 class="fontzing">CREAR G??NERO</h1>
              </div>
              <div class="col-10 col-md-6 form">
              <form class="row g-3" id="createGender" onkeypress="if(event.keyCode == 13) event.returnValue = false;">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="validationServer01" placeholder="Hombre" required>
                        <label for="validationServer01" class="form-label" style="padding-left: 1.3rem;">Nombre</label>
                        <div class="valid-feedback">
                            Correcto!
                        </div>
                        <div id="validationServer01Feedback" class="invalid-feedback">
                            Elige un nombre
                        </div>
                    </div>
                    <div>
                        <label class="mb-3">Im??gen del fondo</label>   
                        <input class="form-control" type="file" id="validationServer02">
                        <div class="valid-feedback">
                            Archivo seleccionado
                        </div>
                        <div id="validationServer02Feedback" class="invalid-feedback">
                            Selecciona una imagen
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="mb-3">Im??gen de portada</label>
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
                    <button type="submit" class="mybutton createGenderBtn" disabled="true" style="opacity:0.6;">A??adir</button>
                    <button class="mybutton loadingbtn" type="button" disabled style="display:none;">
                    <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
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
                Nuevo g??nero creado con ??xito!
                </div>
            </div>
        </div>
        </div>
    </div>`
        )
    }
};

export default CreateGender;