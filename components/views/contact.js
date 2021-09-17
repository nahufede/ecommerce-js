import { getFirestore } from "../../firebase/firebase.js";

let db = getFirestore();
let app = document.querySelector("#app");

window.addEventListener("keyup", (e) => {
  if (e.target.classList.contains("textareamsj")) {
    let caracteres = e.target.value;
    caracteres = caracteres.replaceAll(" ", "");
    document.getElementById(
      "caracterestextarea"
    ).innerHTML = `${caracteres.length}/256`;
  }
});

const contactFormValidation = () => {
  let validation = 0;

  let contactForm = document.querySelector("#contactForm");

  let progressBar = document.querySelector(".progress-bar-1");

  const progressValidation = () => {
    let progressVal = [];

    for (let i = 0; i < 4; i++) {
      if(contactForm[i].classList.contains('is-valid')){
        progressVal.push(1);
      }
    }

    let progressForm = progressVal.reduce((a, b) => a + b, 0);

    switch (progressForm) {
      case 1:
        progressBar.style.width = "25%";
        break;
      case 2:
        progressBar.style.width = "50%";
        break;
      case 3:
        progressBar.style.width = "75%";
        break;
      case 4:
        progressBar.style.width = "100%";
        break;
      default:
        progressBar.style.width = "0%";
        break;
    }
  };

  // VALIDANDO FORMULARIO

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  for (let i = 0; i < 5; i++) {
    if (contactForm[i].value === "") {
      contactForm[i].classList.add("is-invalid");
      contactForm[i].classList.remove("is-valid");
      validation -= 1;
    } else {
      if (contactForm[i].getAttribute("type") === "email") {
        let email = contactForm[i].value;
        let response = validateEmail(email);
        if (response === true) {
          contactForm[i].classList.add("is-valid");
          contactForm[i].classList.remove("is-invalid");
        } else {
          contactForm[i].classList.add("is-invalid");
          contactForm[i].classList.remove("is-valid");
        }
      } else if (contactForm[i].getAttribute("name") === "telefono") {
        let number = contactForm[i].value;
        number = number.replaceAll(" ", "").replaceAll("-", "");
        if (!isNaN(Number(number)) && number.length >= 6) {
          contactForm[i].classList.add("is-valid");
          contactForm[i].classList.remove("is-invalid");
        } else {
          contactForm[i].classList.add("is-invalid");
          contactForm[i].classList.remove("is-valid");
        }
      } else if (contactForm[i].getAttribute("name") === "textareamsj") {
        let mensaje = contactForm[i].value;
        mensaje = mensaje.replaceAll(" ", "");
        if (mensaje.length >= 15 && mensaje.length <= 256) {
          contactForm[i].classList.add("is-valid");
          contactForm[i].classList.remove("is-invalid");
        } else {
          contactForm[i].classList.add("is-invalid");
          contactForm[i].classList.remove("is-valid");
        }
      } else {
        contactForm[i].classList.add("is-valid");
        contactForm[i].classList.remove("is-invalid");
        validation += 1;
      }
    }
  }

  if (validation === 0) {
    contactForm[4].removeAttribute("disabled");
    contactForm[4].style.opacity = 1;
  } else {
    contactForm[4].setAttribute("disabled", "true");
    contactForm[4].style.opacity = 0.6;
  }

  progressValidation();
};

window.addEventListener("change", () => {
  if (document.querySelector("#pagecontact")) {
    contactFormValidation();
  }
});

export const Contacto = () => {
  window.addEventListener(
    "keypress",
    function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    },
    false
  );

  window.addEventListener("click", (e) => {
    let contactForm = document.querySelector("#contactForm");

    if (e.target.getAttribute("id") === "contactbutton") {
      document.querySelector(".loadingbtn").style.display = "block";
      document.querySelector("#contactbutton").style.display = "none";

      e.preventDefault();

      let name = contactForm[0].value;
      let email = contactForm[1].value;
      let phone = Number(contactForm[2].value);
      let message = contactForm[3].value;
      let date = new Date().toLocaleDateString();

      db.collection("consultas")
        .add({
          name,
          email,
          phone,
          message,
          date,
        })
        .then(() => {
          contactForm.reset();
          contactForm[4].style.display = "none";
          document.querySelector("#alertsuccess").style.display = "block";
          document.querySelector(".loadingbtn").style.display = "none";
          document.querySelector(".progress").style.display = "none";
          setTimeout(()=>{app.innerHTML = Contacto()},5000)
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  });

  return `
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
            <div class="col-12 col-sm-6 offset-sm-3 px-3">
                <h1 class="text-center mt-3 fontzing">CONTACTO</h1>
                <p class="text-center mt-3">Dejanos tu consulta y te responderemos a la brevedad</p>
                <form id="contactForm" class="row g-3 d-flex flex-column align-items-center mt-3">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="validationServer01" placeholder="Nombre" required>
                        <label for="validationServer01" class="form-label" style="padding-left: 1.3rem;">Nombre</label>
                        <div class="valid-feedback ps-2">
                        Correcto!
                        </div>
                        <div id="validationServerUsernameFeedback" class="invalid-feedback ps-2">
                            Elige un nombre
                        </div>
                    </div>
                    <div class="form-floating">
                        <input type="email" class="form-control" id="validationServer02" placeholder="Email" required>
                        <label for="validationServer02" class="form-label" style="padding-left: 1.3rem;">Email</label>
                        <div class="valid-feedback ps-2">
                        Correcto!
                        </div>
                        <div id="validationServer02Feedback" class="invalid-feedback ps-2">
                            Introduce un correo válido
                        </div>
                    </div>
                    <div class="form-floating">
                        <input type="text" class="form-control" name="telefono" id="validationServer03" placeholder="Teléfono" required>
                        <label for="validationServer03" style="padding-left: 1.3rem;">Teléfono</label>
                        <div class="valid-feedback ps-2">
                        Correcto!
                        </div>
                        <div id="validationServer03Feedback" class="invalid-feedback ps-2">
                            Introduce un número válido. Código de área sin 0 ni 15. Ej. +54 9 115 842 0029
                        </div>
                    </div>
                    <div class="form-floating">
                        <textarea class="form-control textareamsj" placeholder="Leave a comment here" id="validationServer04"
                            style="height: 150px" name="textareamsj" required></textarea>
                        <label for="validationServer04" style="padding-left: 1.3rem;">Mensaje</label>
                        <div class="valid-feedback ps-2">
                        Correcto!
                        </div>
                        <div id="validationServer03Feedback" class="invalid-feedback ps-2">
                        Escribe un mensaje. Mínimo 15 carácteres y máximo 256.
                        </div>
                        <p id="caracterestextarea">0/256</p>
                    </div>
                    <div class="progress mb-3 px-0" style="width: 97%">
                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark progress-bar-1" role="progressbar" style="width: 0%"
                        aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <button id="contactbutton" class="mybutton" disabled="true" style="opacity:0.6;" onkeypress="(e)=>{if(e.which === 13){return false}}" type="submit">ENVIAR</button>
                    <button class="mybutton loadingbtn" type="button" disabled style="display:none;">
                    <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Enviando
                    </button>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-12" id="alertsuccess" style="display: none;">
                <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                    <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </symbol>
                </svg>
                <div class="alert alert-success d-flex align-items-center justify-content-center mt-3" role="alert">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                    <div>
                    Consulta enviada con éxito! Pronto nos comunicaremos contigo
                    </div>
                </div>
            </div>
        </div>
    </div>`;
};

export default Contacto;
