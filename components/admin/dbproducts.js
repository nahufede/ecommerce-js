import { getItems } from "../../firebase/products.js";
import { getFirestore, storage } from "../../firebase/firebase.js"

let db = getFirestore();
let storageRef = storage().ref();

window.addEventListener("click", async (e) => {
  let focus = e.target;

  if (focus.classList.contains("deleteBtn")) {
    let id = focus.parentElement.getAttribute('id');
    let folder = focus.parentElement.childNodes[3].innerHTML.toLowerCase();

    let confirmacion = confirm("Desea eleminar el elemento?");

    if (confirmacion) {
      let focusImg = storageRef.child(`products/${folder}/${id}`);

      focusImg
        .delete()
        .then(function () {
          console.log("imagen borrada");
        })
        .catch(function (error) {
          console.log("error ->", error);
        });

      db.collection("products")
        .doc(id)
        .delete()
        .then(() => {
          console.log("documento eliminado");
          app.innerHTML = DBProducts();
        })
        .catch((error) => {
          console.error("error ->", error);
        });
    }
  }

  if (focus.classList.contains("editBtn")) {

    let exampleModal

    if(document.querySelector('#dbproductsmodal')){
      exampleModal = document.querySelector('#dbproductsmodal')
    }

    let editForm;

    editForm = document.querySelector(".editForm");

    let id = focus.parentElement.getAttribute('id');

    var docRef = db.collection("products").doc(id);

    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {

          let product = { ...doc.data(), id: doc.id };
          const { name, price, description, category } = product;

          let categoryLength = editForm[1].length;

          for (let i = 0; i < categoryLength; i++) {
            if (editForm[1][i].innerHTML === category) {
              editForm[1].value = i;
            }
          }

          editForm.setAttribute("id", id);
          editForm[0].value = name;
          editForm[2].value = price;
          editForm[3].value = description;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  if (focus.classList.contains("saveEdit")) {
    e.preventDefault();

    let exampleModal

    if(document.querySelector('#dbproductsmodal')){
        exampleModal = document.querySelector('#dbproductsmodal')
    }

    let editForm;

    editForm = document.querySelector(".editForm");

    let id = e.target.parentElement.getAttribute("id");

    var docRef = db.collection("products").doc(id);

    let selectedCategory = editForm[1].value;
    let editCategory = editForm[1][selectedCategory].innerHTML;

    return docRef
      .update({
        name: editForm[0].value,
        price: editForm[2].value,
        category: editCategory,
        description: editForm[3].value,
      })
      .then(() => {
        console.log("Document successfully updated!");
        location.reload()
        app.innerHTML = DBProducts()
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
});

export const DBProducts = () => {
  
  // LLAMADO FIREBASE DE PRODUCTOS

  getItems().then((products) => {

    let viewList = document.createElement('div')
    viewList.className = "row justify-content-center pt-4"

    let dbproductsContainer 

    if (document.querySelector("#dbproducts")) {
      dbproductsContainer  = document.querySelector("#dbproducts")
    }

    const setProducts = () => {
      
      products.forEach((el) => {
      /* Destrucuring sobre el objeto */

      const { name, img, category, id } = el;

      const card = document.createElement('div');
      card.className = "col-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4 dbcard"
      card.innerHTML = 
      `<div class="card" style="width: 10rem; height: 13rem; border:none;">
        <div class="card-body card-space p-0" style="background-image: url(${img})">
          <div class="card-inner" id="${id}">
            <h5 class="text-center fontzing">${name}</h5>
            <p>${category}</p>
              <button type="button" class="btn editBtn mybutton2 mb-2" data-bs-toggle="modal" data-bs-target="#dbproductsmodal">
              Editar
              </button>
              <button type="button" class="btn deleteBtn mybutton">Eliminar
              </button>
          </div>
        </div>
      </div>
      `
      viewList.appendChild(card);
    });

    dbproductsContainer.appendChild(viewList)

    }

    setProducts()
  });

  return `
    <div class="container dbproductspage">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-row justify-content-center">
            <a id="home" class="contactbreadcrumb">Inicio</a>
            <a id="admin" class="contactbreadcrumb">> Administrador</a>
            <a id="admindashboard" class="contactbreadcrumb">> Productos</a>
            <p>> Editar Items</p>
          </div>
        </div>
      </div>
      <div class="row p-0">
        <div class="col-12 my-5">
          <div class="col-12">
            <h1 class="text-center mb-5">MIS PRODUCTOS</h1>
          </div>
            <div class="container" id="dbproducts">
            </div>
          </div>
        </div>
      </div>
`;
};
