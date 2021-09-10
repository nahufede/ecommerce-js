import { getFirestore, storage } from "../../../firebase/firebase.js";
import { getGenders } from "../../../firebase/products.js"


let db = getFirestore();
let storageRef = storage().ref();

window.addEventListener("click", (e) => {
    if (e.target.classList.contains("createCatBtn")) {
      e.preventDefault();
      createCategory();
    }
});

window.addEventListener('change', ()=>{

    let selectGender = document.querySelector(".addcategorygender");

    if(document.querySelector('#createcategory')){

        let createcategory = document.querySelector('#createcategory');

        if(createcategory[0].value.length > 0){
        createcategory[1].removeAttribute("disabled")
        }

        if(createcategory[1].length === 1){

        getGenders().then((genders) => {
        
            console.log(genders);

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
})

export function createCategory() {

    let createcategory = document.querySelector('#createcategory')

    // ASIGNACION DE ELEMENTOS DEL FORM
    let name = (createcategory[0].value).toLowerCase()
    let gender = (createcategory[1].value).toLowerCase();
    let file = createcategory[2].files[0];

    db.collection(`categories_${gender}`).add({
        name,
        gender,
        img: ""
    })
    .then((docRef) => {

        var uploadTask = storageRef.child(`categories/${gender}/${docRef.id}`).put(file);

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
                db.collection(`categories_${gender}`).doc(docRef.id).update({
                    "img": downloadURL
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    app.innerHTML = CreateCategories();
                    
                });
            });
        });    
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

export const CreateCategories = () => {

    return (
        `<div class="container">
        <div class="row" id="">
            <div class="col-12">
                <div class="d-flex flex-row justify-content-center">
                    <a reference="home" class="contactbreadcrumb">Inicio</a>
                    <a reference="admin" class="contactbreadcrumb">> Administrador</a>
                    <a reference="categoriesdash" class="contactbreadcrumb">> Categorias</a>
                    <p>> Añadir Categoria</p>
                </div>
            </div>
            <div class="col-12 my-5 d-flex flex-wrap justify-content-center">
              <div class="col-10 col-md-6">
                <h1 class="fontzing">CREAR CATEGORIA</h1>
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
                        <input class="form-control" type="file" id="validationServer03" multiple>
                        <div class="valid-feedback">
                            Archivo seleccionado
                        </div>
                        <div id="validationServer03Feedback" class="invalid-feedback">
                            Selecciona una imagen
                        </div>
                    </div>
                    <button type="submitBtn" class="mybutton createCatBtn">Añadir</button>
                </form>
              </div>
            </div>
        </div>
    </div>`
    )
}

export default CreateCategories;