import { getFirestore, storage } from "../../../firebase/firebase.js";

let db = getFirestore();
let storageRef = storage().ref();

window.addEventListener("click", async (e) => {
  let focus = e.target;
  
  if (focus.parentElement.classList.contains("deleteGender")) {

    e.preventDefault()

    let id = focus.parentElement.parentElement.parentElement.parentElement.getAttribute('id');

    let confirmacion = confirm("Desea eleminar el elemento?");

    if (confirmacion) {

      let focusImg = storageRef.child(`genders/${id}`);

      focusImg
        .delete()
        .then(function () {
          console.log("imagen borrada");
        })
        .catch(function (error) {
          console.log("error ->", error);
        });

      db.collection("genders")
        .doc(id)
        .delete()
        .then(() => {
          console.log("documento eliminado");
          app.innerHTML = ShowGenders();
        })
        .catch((error) => {
          console.error("error ->", error);
        });
    }
  }
})

export const ShowGenders = () => {

    const getGenders = async () => {

        let itemCollection
      
        itemCollection = db.collection('genders');
        const querySnapshot = await itemCollection.get();
      
        let consultas = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        }));
      
        return consultas;
    };

    getGenders().then((genders)=>{

        let gendersContainer 
        let viewList = document.createElement('div')
        viewList.className = "row justify-content-center pt-4"

        if (document.querySelector("#genders")) {
        gendersContainer  = document.querySelector("#genders")
        }

        genders.forEach((el) => {
        /* Destrucuring sobre el objeto */
    
        const { name, id } = el;
    
        const card = document.createElement('div');
        card.className = "col-12 col-md-4 d-flex justify-content-center mb-4"
        card.innerHTML = 
        `<div class="card w-100" id=${id}>
            <div class="card-body d-flex flex-column consultcard">
              <span class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">${name}</h5>
                <a href="" class="deleteGender"><i class="bi bi-trash-fill"></i></a>
              </span>
            </div>
        </div>
        `
        viewList.appendChild(card);
        });
    
        gendersContainer.appendChild(viewList)
    })

    return (`
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-row justify-content-center">
            <a id="home" class="contactbreadcrumb">Inicio</a>
            <a id="admin" class="contactbreadcrumb">> Administrador</a>
            <a id="categoriesdash" class="contactbreadcrumb">> Categorias</a>
            <p>> GÉNEROS</p>
          </div>
        </div>
      </div>
      <div class="row p-0">
        <div class="col-12 my-5">
          <div class="col-12">
            <h1 class="text-center mb-5">Géneros</h1>
          </div>
          <div class="col-12" id="genders">
          </div>
        </div>
      </div>
    </div>`)
}

export default ShowGenders;