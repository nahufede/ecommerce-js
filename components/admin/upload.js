import { getCategories } from "../../firebase/products.js";
import { getFirestore, storage } from "../../firebase/firebase.js"

let db = getFirestore();
let storageRef = storage().ref();

export function createElement(e) {

    let createForm = document.querySelector('#createForm')

    // PREVENT DEFAULT PARA QUE NO RECARGUE LA PAGINA AL DARLE SUBMIT
    e.preventDefault();

    let progressBar = document.querySelector('.progress-bar')

    // ASIGNACION DE ELEMENTOS DEL FORM
    let name = createForm[0].value;
    let categories = createForm[1];
    let selectedCategory = createForm[1].value;
    let price = createForm[2].value;
    let description = createForm[3].value;
    let category = categories[selectedCategory].innerHTML
    let file = createForm[4].files[0];

    db.collection('products').add({
        name,
        price,
        description,
        category,
        img: ""
    })
    .then((docRef) => {

        var uploadTask = storageRef.child(`products/${category.toLowerCase()}/${docRef.id}`).put(file);

        uploadTask.on('state_changed', function (snapshot) {
            var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

            progressBar.style.width = `${progress}%`

            console.log(progressBar.style.width);

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
                db.collection("products").doc(docRef.id).update({
                    "img": downloadURL
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    progressBar.classList.add('bg-warning')

                    setTimeout(()=>location.reload(),5000)
                    
                });
            });
        });    
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

export const Upload = () => {

    getCategories().then((el) => {

        let categories = el;
    
        let selectItems

        categories.forEach((el, index) => {

          const option = document.createElement('option');

          /* Destrucuring sobre el objeto p */
          const { name } = el;
    
          option.innerHTML = name
          option.setAttribute('value', index+1)

          if(document.querySelector('.categoryoptions')){
            selectItems = document.querySelector('.categoryoptions')
          }

        selectItems.appendChild(option)
        });
      });

    return (
        `<div class="container">
        <div class="row">
            <div class="col-12">
              <div class="d-flex flex-row justify-content-center">
                <a id="home" class="contactbreadcrumb" href="">Inicio</a>
                <a id="admin" class="contactbreadcrumb" href="">> Administrador</a>
                <p>> Nuevos</p>
            </div>
            </div>
            <div class="col-12 my-5 d-flex">
              <div class="col-6">
                <h1>SUBIR PRODUCTOS</h1>
              </div>
              <div class="col-6 form">
                  <form id="createForm">
                      <div class="form-floating mb-3">
                          <input type="text" class="form-control" id="floatingName" placeholder="Traje de baño">
                          <label for="floatingName">Nombre</label>
                      </div>
                      <div class="form-floating mb-3">
                          <select class="form-select categoryoptions" id="floatingCategory" aria-label="Floating label category">
                              <option selected>Seleccionar</option>
                          </select>
                          <label for="floatingCategory">Categoria</label>
                      </div>
                      <div class="input-group mb-3">
                          <span class="input-group-text">$</span>
                          <input type="text" class="form-control" id="price" aria-label="Amount (to the nearest dollar)">
                          <span class="input-group-text">.00</span>
                      </div>
                      <div class="form-floating mb-3">
                          <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"
                              style="height: 100px"></textarea>
                          <label for="floatingTextarea">Descripción</label>
                      </div>
                      <div class="mb-3">
                          <input class="form-control" type="file" id="formFileMultiple" multiple>
                      </div>
                      <div class="progress mb-3">
                          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                              style="width: 0%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <button type="submitBtn" class="mybutton submitBtn">Subir</button>
                  </form>
              </div>
            </div>
        </div>
    </div>`
    )
}

export default Upload;