import { getFirestore } from "../../firebase/firebase.js"

let db = getFirestore();

const contactFormValidation = () => {

    let validation

    let contactForm = document.querySelector('#contactForm')

    // VALIDANDO FORMULARIO 

    let regExp=/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/
    let regExpPhone=/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/

    for (let i = 0; i < 5; i++) {

        if(contactForm[i].value === ""){
            contactForm[i].classList.add('is-invalid')
            contactForm[i].classList.remove('is-valid')
        } else {
            contactForm[i].classList.add('is-valid')
            contactForm[i].classList.remove('is-invalid')
        }   
    }

    if ((contactForm[0].value != "")&&
        (contactForm[1].value != "")&&
        (contactForm[2].value != "")&&
        (contactForm[3].value != "")){
        validation = true;
    }   else {
        validation = false;
    }

    if(validation){
        contactForm[4].removeAttribute('disabled');
        contactForm[4].style.opacity = 1;
    }else{
        contactForm[4].setAttribute('disabled','true');
        contactForm[4].style.opacity = 0.6;
    }
}

window.addEventListener('change', ()=>{
    if(document.querySelector('#pagecontact')){
        contactFormValidation()
    }
})

export const Contacto = () => {

    window.addEventListener("keypress", function(event){
        if (event.key === 'Enter'){
            event.preventDefault();
        }
    }, false);

    window.addEventListener('click', (e)=>{

        let contactForm = document.querySelector('#contactForm')
        
        if(e.target.getAttribute('id') === 'contactbutton'){
        
           let name = contactForm[0].value;
           let email = contactForm[1].value;
           let phone = Number(contactForm[2].value);
           let message = contactForm[3].value;
           let date = new Date().toLocaleDateString();
           
           db.collection("consultas").add({
            name,
            email,
            phone,
            message,
            date
            })
            .then((docRef) => {
                contactForm.reset();
                document.querySelector('#alertsuccess').style.display = "block"
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

        };
    })

    return (`
    <div class="container-fluid">
        <div class="row" id="pagecontact">
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
                <form id="contactForm" class="row g-3 d-flex flex-column mt-5">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="validationServer01" placeholder="Nombre" required>
                        <label for="validationServer01" class="form-label" style="padding-left: 1.3rem;">Nombre</label>
                        <div class="valid-feedback">
                        Correcto!
                        </div>
                        <div id="validationServerUsernameFeedback" class="invalid-feedback">
                            Elige un nombre
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="validationServer02" placeholder="Email" required>
                        <label for="validationServer02" class="form-label" style="padding-left: 1.3rem;">Email</label>
                        <div class="valid-feedback">
                        Correcto!
                        </div>
                        <div id="validationServer02Feedback" class="invalid-feedback">
                            Introduce un correo válido
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="validationServer03" placeholder="Teléfono" required>
                        <label for="validationServer03" style="padding-left: 1.3rem;">Teléfono</label>
                        <div class="valid-feedback">
                        Correcto!
                        </div>
                        <div id="validationServer03Feedback" class="invalid-feedback">
                            Introduce un número válido
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea class="form-control" placeholder="Leave a comment here" id="validationServer04"
                            style="height: 150px" required></textarea>
                        <label for="validationServer04" style="padding-left: 1.3rem;">Mensaje</label>
                        <div class="valid-feedback">
                        Correcto!
                        </div>
                        <div id="validationServer03Feedback" class="invalid-feedback">
                            Escribe un mensaje. Mínimo 15 carácteres.
                        </div>
                    </div>
                    <button id="contactbutton" class="mybutton noprevent" disabled="true" style="opacity:0.6;" onkeypress="(e)=>{if(e.which === 13){return false}}" type="submit">ENVIAR</button>
                    <button class="mybutton loadingbtn" type="button" disabled style="display:none;">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Enviando
                    </button>
                </form>
            </div>
        </div>
    </div>`)
}

export default Contacto;