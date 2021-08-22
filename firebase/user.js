import { auth } from "./firebase.js";
import { Admin } from "../components/admin.js";

export const LogOut = () => {
    auth().signOut().then(() => {
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
      .then(()=> app.innerHTML = Admin())
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