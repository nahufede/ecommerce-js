import { auth } from "../../firebase/firebase.js";
import { LogIn, LogOut } from "../../firebase/user.js"

let app = document.querySelector('#app')

window.addEventListener("click", (e) => {

    let reference = e.target.getAttribute("reference");

    if(reference === "login") {
        e.preventDefault()
        LogIn();
    }

    if(reference === "logout") {
        e.preventDefault()
        LogOut();
    }
  });

export const Admin = () => {

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
        return (
            `<div class="container">
                <div class="row">
                    <div class="col-12 col-sm-6 offset-sm-3 d-flex flex-column justify-content-between">
                        <div class="d-flex flex-row justify-content-center">
                            <a reference="home" class="contactbreadcrumb">Inicio</a>
                            <p>> Administrador</p>
                        </div>
                        <h1 class="text-center fontzing">SESIÓN INICIADA</h1>
                        <p class="text-center mt-3">${user.email}</p>
                        <div class="d-flex flex-column">
                            <button reference="categoriesdash" class="mybutton mb-2" type="button">Categorias</button>
                            <button reference="consultas" class="mybutton mb-2" type="button">Consultas</button>
                            <button reference="gendersdash" class="mybutton mb-2" type="button">Géneros</button>
                            <button reference="ordenes" class="mybutton mb-2" type="button">Pedidos</button>
                            <button reference="productsdash" class="mybutton mb-2" type="button">Productos</button>
                            <button reference="logout" class="mybutton mb-2" type="button">Cerrar Sesión</button>
                        </div>
                    </div>
                </div>
            </div>
            `
    )
    }
}

export default Admin;