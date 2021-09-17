import { getFirestore, storage } from "../../../firebase/firebase.js";
import { auth } from "../../../firebase/firebase.js";

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

        document.querySelector(".spinner1").style.display = "none";

        let gendersContainer 
        let viewList = document.createElement('div')
        viewList.className = "col-12 d-flex pt-3 justify-content-evenly flex-wrap"

        if (document.querySelector("#genders")) {
        gendersContainer  = document.querySelector("#genders")
        }

        genders.forEach((el) => {
        /* Destrucuring sobre el objeto */
    
        const { name, id, img } = el;
    
        const card = document.createElement('div');
        card.className = "col-12 col-md-5 offset-md-1 d-flex justify-content-center mb-4"
        card.innerHTML = 
        `<div class="card gendercard" id=${id}>
            <div class="card-body d-flex flex-column genderimg" style="background-image: url('${img}')">
              <span class="d-flex justify-content-between">
                <h5 class="card-title fontzing">${name.toUpperCase()}</h5>
                <a href="" class="deleteGender"><i class="bi bi-trash-fill text-white"></i></a>
              </span>
            </div>
        </div>
        `
        viewList.appendChild(card);
        });
    
        gendersContainer.appendChild(viewList)
    })

    const user = auth().currentUser;

    if(user === null){
    return (
            `<div class="container">
            <div class="row">
                <div class="col-12 col-sm-6 offset-sm-3 userdiv">
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

    return (`
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-row justify-content-center">
            <a reference="home" class="contactbreadcrumb">Inicio</a>
            <a reference="gendersdash" class="contactbreadcrumb">> Géneros</a>
            <p class="d-none d-sm-block">> Ver Géneros</p>
          </div>
        </div>
      </div>
      <div class="row p-0">
        <div class="col-12 my-3">
          <div class="col-12">
            <h1 class="text-center py-3 m-0 fontzing">GÉNEROS</h1>
          </div>
          <div class="col-10 offset-1 d-flex flex-column align-items-center" id="genders">
          </div>
          <div class="text-center pt-5 spinner1">
            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>`)
  }
};

export default ShowGenders;