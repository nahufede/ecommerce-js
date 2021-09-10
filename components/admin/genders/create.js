import { getFirestore, storage } from "../../../firebase/firebase.js";

let db = getFirestore();
let storageRef = storage().ref();

window.addEventListener("click", (e) => {
    if (e.target.classList.contains("createGenderBtn")) {
      e.preventDefault();
      createGender();
    }
});

const createGender = () => {

    let createGender = document.querySelector('#createGender')

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

            console.log('Upload is ' + progress + '% done');
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
                    console.log("Document successfully updated!");
                    app.innerHTML = CreateGender();
                    
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
        `<div class="container">
        <div class="row" id="">
            <div class="col-12">
              <div class="d-flex flex-row justify-content-center">
                <a reference="home" class="contactbreadcrumb">Inicio</a>
                <a reference="admin" class="contactbreadcrumb">> Administrador</a>
                <a reference="gendersdash" class="contactbreadcrumb">> Géneros</a>
                <p class="d-none d-sm-block">> Añadir Género</p>
            </div>
            </div>
            <div class="col-12 my-5 d-flex flex-wrap justify-content-center">
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
                    <button type="submitBtn" class="mybutton createGenderBtn">Añadir</button>
                </form>
              </div>
            </div>
        </div>
    </div>`
    )
}

export default CreateGender;