import { auth } from "../../firebase/firebase.js";

export const Admin = () => {

    const user = auth().currentUser;

    if(user === null){
    return (
            `<div class="container">
            <div class="row">
                <div class="col-12 col-sm-6 offset-sm-3 userdiv">
                    <div class="d-flex flex-row justify-content-center">
                        <a id="home" class="contactbreadcrumb" href="">Inicio</a>
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
                        <button id="login" class="mybutton" type="submit">INICIAR SESIÓN</button>
                    </form>
                </div>
            </div>
        </div>`
    )} else {
        return (
            `<div class="container">
                <div class="row">
                    <div class="col-12 col-sm-6 offset-sm-3 d-flex flex-column">
                        <div class="d-flex flex-row justify-content-center">
                            <a id="home" class="contactbreadcrumb" href="">Inicio</a>
                            <p>> Administrador</p>
                        </div>
                        <h1 class="text-center mt-3">SESIÓN INICIADA</h1>
                        <p class="text-center mt-3">${user.email}</p>
                        <button id="upload" class="mybutton mb-2" type="button">Subir Items</button>
                        <button id="databproducts" class="mybutton mb-2" type="button">Editar Items</button>
                        <button id="editcategories" class="mybutton mb-2" type="button">Editar Categorias</button>
                        <button id="logout" class="mybutton mb-2" type="button">Cerrar Sesión</button>
                    </div>
                </div>
            </div>`
    )
    }
}

export default Admin;