import { auth } from "./firebase.js";
import { Admin } from "../components/admin/admin.js";
import { Home } from "../components/views/home.js"
import { Navbar } from "../components/nav.js";

export const LogOut = () => {

    auth().signOut().then(() => {

        let adminlog = document.querySelector('.adminlog')
        adminlog.innerHTML = `
          <li><a class="dropdown-item" reference="admin" href="#">Iniciar sesión</a></li>
          `
        let adminlog1 = document.querySelector('.adminlog1')
        adminlog1.innerHTML = `
          <li><a class="dropdown-item" reference="admin" href="#">Iniciar sesión</a></li>
          `
          
        app.innerHTML = Admin();
      }).catch((error) => {
        console.log(error);
      });
}

export const LogIn = () => {
    let userForm = document.querySelector("#userForm");
    let email = userForm[0].value;
    let pass = userForm[1].value;

    auth().signInWithEmailAndPassword(email, pass)
      .then(()=> {
        app.innerHTML = Home();
        nav.innerHTML = Navbar();
      })
      .catch(() => {    
        if(document.getElementsByClassName('userdiv')){
            let noRegister = document.createElement('h5')
            let userdiv = document.getElementById('userpass')

            noRegister.innerHTML = 'Error en logueo. Revisar mail y contraseña'
            noRegister.className = 'text-center mt-3'

            userdiv.appendChild(noRegister)
            };
      });
}