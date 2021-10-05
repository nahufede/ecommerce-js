import { getItems } from "../../../firebase/db-calls.js";
import { getFirestore, storage } from "../../../firebase/firebase.js";
import { auth } from "../../../firebase/firebase.js";
import { capitalize } from "../../../script.js"
import { getCategories } from "../../../firebase/db-calls.js";


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
          app.innerHTML = AllProducts();
        })
        .catch((error) => {
          console.error("error ->", error);
        });
    }
  }

  if (focus.classList.contains("editBtn")) {

    let gender = focus.parentElement.getAttribute('gender');

    let selectItems;

    document.querySelector(".saveEdit").style.display = "block";
    document.querySelector("#alertsuccess").style.display = "none";

    if (document.querySelector(".categoryoptions")) {
      selectItems = document.querySelector(".categoryoptions");
    }

   selectItems.innerHTML = `<option selected="">Seleccionar</option>`

    getCategories(`categories_${gender}`).then((categories) => {

      categories.forEach((el, index) => {
        const option = document.createElement("option");

        const { name } = el;
        
        option.innerHTML = capitalize(name);
        option.setAttribute("value", index + 1);

        selectItems.appendChild(option);
      });
    });

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
            if (editForm[1][i].innerHTML === capitalize(category)) {
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
    e.preventDefault()

    let exampleModal

    document.querySelector(".saveEdit").style.display = "none";
    document.querySelector(".loadingbtn").style.display = "block";

    if(document.querySelector('#dbproductsmodal')){
        exampleModal = document.querySelector('#dbproductsmodal')
    }

    let editForm;

    editForm = document.querySelector(".editForm");

    let id = e.target.parentElement.parentElement.getAttribute("id");

    var docRef = db.collection("products").doc(id);

    let selectedCategory = editForm[1].value;
    let editCategory = (editForm[1][selectedCategory].innerHTML).toLowerCase();
    let sizes = editForm[4].selectedOptions
    let sizesLength = editForm[4].selectedOptions.length
    let selectedSizes = []

    for (let i = 0; i < sizesLength; i++) {
      selectedSizes.push(sizes[i].value)
    }

    return docRef
      .update({
        name: editForm[0].value,
        price: editForm[2].value,
        category: editCategory,
        description: editForm[3].value,
        sizes: selectedSizes
      })
      .then(() => {

        document.querySelector("#alertsuccess").style.display = "block";
        document.querySelector(".loadingbtn").style.display = "none";
    
        setTimeout(()=> {
          let body = document.querySelector('body');

          body.className = "";
          body.style = "";

          let modal = document.querySelector('.modal-backdrop');
          modal.remove();

          let dbp = document.querySelector('#dbproductsmodal');
          dbp.className = "modal fade";
          dbp.style.display = "none";
          dbp.setAttribute("aria-hidden","true");
          dbp.setAttribute("role","");
          app.innerHTML = AllProducts()},
          3000
          )
        
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
});

export const AllProducts = () => {
  
  // LLAMADO FIREBASE DE PRODUCTOS

  getItems().then((products) => {

    document.querySelector(".spinner1").style.display = "none";

    let viewList = document.createElement('div')
    viewList.className = "row justify-content-center pt-4"

    let dbproductsContainer 

    if (document.querySelector("#dbproducts")) {
      dbproductsContainer  = document.querySelector("#dbproducts")
    }

    const setProducts = () => {
      
      products.forEach((el) => {
      /* Destrucuring sobre el objeto */

      const { name, img, category, gender, id } = el;

      const card = document.createElement('div');
      card.className = "col-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4 dbcard"
      card.innerHTML = 
      `<div class="card" style="width: 13rem; height: 13rem; border:none;">
        <div class="card-body card-space p-0" style="background-image: url(${img})">
          <div class="card-inner" id="${id}" gender="${gender}">
            <h5 class="text-center fontzing">${name}</h5>
            <p>${capitalize(category)}</p>
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

  return `
    <div class="container dbproductspage">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-row justify-content-center">
            <a reference="home" class="contactbreadcrumb">Inicio</a>
            <a reference="productsdash" class="contactbreadcrumb">> Productos</a>
            <p class="d-none d-sm-block">> Editar Items</p>
          </div>
        </div>
      </div>
      <div class="row p-0">
        <div class="col-12 my-5">
          <div class="col-12">
            <h1 class="text-center mb-5 fontzing">MIS PRODUCTOS</h1>
          </div>
            <div class="container" id="dbproducts">
            </div>
            <div class="text-center pt-5 spinner1">
            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    `;
  };
};

export default AllProducts;