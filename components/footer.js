export const Footer = () => {

    return (
            `<div class="container mt-3">
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
                        <a href="https://wa.me/34645049621" target="_blank" class="socialmedia">CONSULTAS Y PEDIDOS</a>
                    </div>
                </div>
                <div class="col-12 prefooter">
                    <h4 class="mb-0 fontzing">RECIBI LAS NOVEDADES</h4>
                    <form class="d-flex flex-column align-items-center mt-4 w-100">
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
                        
                        <a href="https://instagram.com/__lucca._" target="_blank" class="iglink mb-3"><i class="bi bi-instagram iglink"></i></a>
                        <i class="bi bi-facebook"></i>
                    </div>
                    <div class="col-8 offset-2 footerlinks mt-5">
                        <a href="#navbar" reference="hombre">Hombre</a>
                        <a href="#navbar" reference="mujer">Mujer</a>
                        <a href="#navbar" reference="contact">Contacto</a>
                    </div>
                    <div class="col-12 info">
                        <div>
                            <i class="bi bi-whatsapp"></i>
                            <a href="https://wa.me/34645049621" target="_blank" class="socialmedia mb-3">357894473</a>
                        </div>
                        <div>
                            <i class="bi bi-envelope"></i>
                            <p>blabla@gmail.com</p>
                        </div>
                        <div>
                            <i class="bi bi-geo-alt"></i>
                            <a href="https://goo.gl/maps/RYdLajm3pCPf3m5o9" target="_blank" class="socialmedia mb-3">San Telmo</a>
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