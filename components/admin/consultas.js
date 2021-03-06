import { getFirestore } from "../../firebase/firebase.js";
import { getConsultas } from "../../firebase/db-calls.js";
import { auth } from "../../firebase/firebase.js";

let db = getFirestore();

window.addEventListener("click", async (e) => {
  let focus = e.target;
  
  if (focus.parentElement.classList.contains("deleteConsult")) {

    e.preventDefault()

    let id = focus.parentElement.parentElement.parentElement.parentElement.getAttribute('id');

    let confirmacion = confirm("Desea eleminar el elemento?");

    if (confirmacion) {

      db.collection("consultas")
        .doc(id)
        .delete()
        .then(() => {
          app.innerHTML = Consultas();
        })
        .catch((error) => {
          console.error("error ->", error);
        });
    }
  }
})

export const Consultas = () => {

    getConsultas().then((consultas)=>{

        document.querySelector(".spinner1").style.display = "none";

        if(consultas.length === 0){
          document.querySelector('#consultas h4').style.display = 'block'
        }

        let consultasContainer 
        let viewList = document.createElement('div')
        viewList.className = "row justify-content-center pt-4"

        if (document.querySelector("#consultas")) {
        consultasContainer  = document.querySelector("#consultas")
        }

        consultas.forEach((el) => {
        /* Destrucuring sobre el objeto */
    
        const { name, email, phone, message, date, id } = el;
    
        const card = document.createElement('div');
        card.className = "col-12 col-md-6 d-flex justify-content-center mb-4"
        card.innerHTML = 
        `<div class="card w-100" id=${id}>
            <div class="card-body d-flex flex-wrap align-items-center consultcard">
              <div class="col-12 d-flex justify-content-between">
                  <h5 class="card-title"><i class="bi bi-person me-2"></i>${name}</h5>
                  <a href="" class="deleteConsult"><i class="bi bi-trash-fill"></i></a>
              </div>
              <div class="col-12 py-3">
                <p class="card-text">${message}</p>
              </div>
              <div class="col-12 d-flex flex-wrap">
                <div class="col-12 py-3">
                  <h6 class="card-subtitle"><i class="bi bi-envelope me-2"></i>${email}</h6>
                </div>
                <div class="col-6">
                  <a href="https://wa.me/+${phone}" target="_blank"><i class="bi bi-telephone-forward me-2"></i>${phone}</a>
                </div>
                <div class="col-6">
                  <p class="card-text text-end"><i class="bi bi-calendar-check-fill me-2"></i>${date}</p>
                </div>
              </div>
            </div>
        </div>
        `
        viewList.appendChild(card);
        });
    
        consultasContainer.appendChild(viewList)
    })

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
return (`
<div class="container">
  <div class="row">
    <div class="col-12">
      <div class="d-flex flex-row justify-content-center">
        <a reference="home" class="contactbreadcrumb">Inicio</a>
        <p class="d-none d-sm-block">> Consultas</p>
      </div>
    </div>
  </div>
  <div class="row p-0">
    <div class="col-12 my-5">
      <div class="col-12">
        <h1 class="text-center fontzing mb-5">CONSULTAS</h1>
      </div>
      <div class="col-12" id="consultas">
        <h4 class="text-center mb-5" style="display:none">NO HAY CONSULTAS NUEVAS</h4>
        <div class="text-center spinner1 pt-5 mt-5">
          <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
              <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`)
  }
};