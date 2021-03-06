import { auth } from "../../../firebase/firebase.js";

export const GendersDashboard = () => {

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

  return (
          `<div class="container">
              <div class="row">
              <div class="col-12 col-sm-6 offset-sm-3 d-flex flex-column justify-content-around" style="height: 60vh;">
                      <div class="d-flex flex-row justify-content-center">
                          <a reference="home" class="contactbreadcrumb">Inicio</a>
                          <p>> Géneros</p>
                      </div>
                      <h1 class="text-center fontzing">GÉNEROS</h1>
                      <div class="d-flex flex-column">
                        <button reference="showgenders" class="mybutton mb-2" type="button">Ver Géneros</button>
                        <button reference="creategender" class="mybutton mb-2" type="button">Añadir Género</button>
                      </div>
                  </div>
              </div>
          </div>`
    )
  }
};


export default GendersDashboard;