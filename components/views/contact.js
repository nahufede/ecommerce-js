export const Contacto = () => {
    return (
            `<div class="container">
            <div class="row">
                <div class="col-12 col-sm-6 offset-sm-3">
                    <div class="d-flex flex-row justify-content-center">
                        <a id="home" class="contactbreadcrumb" href="">Inicio</a>
                        <p>> Contacto</p>
                    </div>
                    <h1 class="text-center mt-3">CONTACTO</h1>
                    <p class="text-center mt-3">Dejanos tu consulta y te responderemos a la brevedad</p>
                    <form id="contactForm" class="d-flex flex-column mt-5">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingName" placeholder="Nombre">
                            <label for="floatingInput">Nombre</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="floatingPassword" placeholder="Email">
                            <label for="floatingEmail">Email</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingPhone" placeholder="Teléfono">
                            <label for="floatingPhone">Teléfono</label>
                        </div>
                        <div class="form-floating mb-3">
                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                                style="height: 150px"></textarea>
                            <label for="floatingTextarea2">Mensaje</label>
                        </div>
                        <button id="contactbutton" type="submit">ENVIAR</button>
                    </form>
                </div>
            </div>
        </div>`)
}

export default Contacto;