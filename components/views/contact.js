import { getFirestore } from "../../firebase/firebase.js"

let db = getFirestore();

export const Contacto = () => {

    window.addEventListener('click', (e)=>{

        let form = document.querySelector('#contactForm')
        
        if(e.target.getAttribute('id') === 'contactbutton'){
        
           let name = form[0].value;
           let email = form[1].value;
           let phone = Number(form[2].value);
           let message = form[3].value;
           let date = new Date().toLocaleDateString();
           
           db.collection("consultas").add({
            name,
            email,
            phone,
            message,
            date
            })
            .then((docRef) => {
                form.reset();
                document.querySelector('#alertsuccess').style.display = "block"
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

        };
    })

    return (
        
            `   
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-sm-6 offset-sm-3">
                        <div class="d-flex flex-row justify-content-center">
                        <a id="home" class="contactbreadcrumb" href="">Inicio</a>
                        <p>> Contacto</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12" id="alertsuccess" style="display: none;">
                        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                            <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </symbol>
                        </svg>
                        <div class="alert alert-success d-flex align-items-center justify-content-center m-0" role="alert">
                            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                            <div>
                            Consulta enviada con éxito! Pronto nos comunicaremos contigo
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-sm-6 offset-sm-3">
                        <h1 class="text-center mt-3">CONTACTO</h1>
                        <p class="text-center mt-3">Dejanos tu consulta y te responderemos a la brevedad</p>
                        <form id="contactForm" class="d-flex flex-column mt-5">
                            <div class="form-floating mb-3">
                                <input type="text" required class="form-control" id="floatingName" placeholder="Nombre">
                                <label for="floatingInput">Nombre</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="email" required class="form-control" id="floatingPassword" placeholder="Email">
                                <label for="floatingEmail">Email</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" required class="form-control" id="floatingPhone" placeholder="Teléfono">
                                <label for="floatingPhone">Teléfono</label>
                            </div>
                            <div class="form-floating mb-3">
                                <textarea class="form-control" required placeholder="Leave a comment here" id="floatingTextarea2"
                                    style="height: 150px"></textarea>
                                <label for="floatingTextarea2">Mensaje</label>
                            </div>
                            <button id="contactbutton" class="mybutton noprevent" disabled="true" type="submit">ENVIAR</button>
                        </form>
                    </div>
                </div>
            </div>`)
}

export default Contacto;