export const Footer = () => {
    return (
            `<div class="container">
            <div class="row">
                <div class="col-6 truck">
                    <i class="bi bi-truck"></i>
                </div>
                <div class="col-6 whatsapp">
                    <i class="bi bi-whatsapp wp"></i>
                </div>
                <div class="col-12 d-flex text-center">
                    <div class="col-6">
                        <p>ENVIOS A TODO EL PAIS</p>
                    </div>
                    <div class="col-6">
                        <p>CONSULTAS Y PEDIDOS</p>
                    </div>
                </div>
                <div class="col-12 prefooter">
                    <h4 class="mb-0">RECIBI LAS NOVEDADES</h4>
                    <form class="d-flex flex-column mt-4">
                        <input class="form-control me-2" id="novedades" type="search" placeholder="Email" aria-label="Search">
                        <button id="emailbutton" type="submit">ENVIAR</button>
                    </form>
                </div>
            </div>
        </div>
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center social">
                        <i class="bi bi-instagram"></i>
                        <i class="bi bi-facebook"></i>
                    </div>
                    <div class="col-6 offset-3 footerlinks mt-5">
                        <a href="">Hombre</a>
                        <a href="">Mujer</a>
                        <a href="">Contacto</a>
                    </div>
                    <div class="col-12 info">
                        <div>
                            <i class="bi bi-whatsapp"></i>
                            <p>357894473</p>
                        </div>
                        <div>
                            <i class="bi bi-envelope"></i>
                            <p>blabla@gmail.com</p>
                        </div>
                        <div>
                            <i class="bi bi-geo-alt"></i>
                            <p>San Telmo</p>
                        </div>
                    </div>
                    <div class="col-12 mt-3 last-title mb-3">
                        <h4>LUCCA</h4>
                    </div>
                </div>
            </div>
        </footer>`
    )
}

export default Footer;