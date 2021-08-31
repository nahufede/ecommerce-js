import { getFirestore, storage } from "./firebase.js";
import { DBProducts } from "../components/admin/dbproducts.js";
import { DBModal } from "../components/modal.js"

let db = getFirestore();
let storageRef = storage().ref();
let app = document.querySelector("#app");

export const getCategories = async (x) => {

  let itemCollection

  if(x === "man"){
    itemCollection = db.collection('categories_man');
  } else if (x === "woman"){
    itemCollection = db.collection('categories_woman')
  }

  if(itemCollection !== undefined){
    const querySnapshot = await itemCollection.get();

    let categories = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return categories;
  }
};

export const getItems = async () => {

  const itemCollection = db.collection("products");
  const querySnapshot = await itemCollection.orderBy("name").get();

  let allProducts = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return allProducts;
}

window.addEventListener("click", async (e) => {
  let focus = e.target;

  if (focus.classList.contains("deleteBtn")) {
    let id = focus.parentElement.getAttribute('id');
    let folder = focus.parentElement.parentElement.children[1].innerHTML.toLowerCase()

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
          location.reload();
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