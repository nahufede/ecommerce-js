export const ProductsDashboard = () => {

    return (
            `<div class="container">
                <div class="row">
                <div class="col-12 col-sm-6 offset-sm-3 d-flex flex-column justify-content-around" style="height: 60vh;">
                        <div class="d-flex flex-row justify-content-center">
                            <a id="home" class="contactbreadcrumb" href="">Inicio</a>
                            <a id="admin" class="contactbreadcrumb" href="">> Administrador</a>
                            <p>> Productos</p>
                        </div>
                        <h1 class="text-center">PRODUCTOS</h1>
                        <div class="d-flex flex-column">
                            <button id="upload" class="mybutton mb-2" type="button">Subir Items</button>
                            <button id="databproducts" class="mybutton mb-2" type="button">Editar Items</button>
                            <button id="logout" class="mybutton mb-2" type="button">Cerrar Sesión</button>
                        </div>
                    </div>
                </div>
            </div>`
    )
}


export default ProductsDashboard;