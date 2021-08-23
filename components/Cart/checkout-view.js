export const Checkout = () => {
    return `
    <div class="container">
        <div class="card" id="card-success">

        </div>

        <div class="card">
            <div class="card-content" id="tajeta-checkout">
                <div class="card-header">
                    <h1 class="text-left">Carrito</h1>
                </div>

                <div class="card-body">
                    <div class="d-flex justify-content-between finalizarCompra row">
                        <div class="col-md-5" id="">
                            <div class="container">
                                <div class="row card carrito-checkout">
                                    <table id="carrito-checkout" class="u-full-width">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <br>
                                <div class="d-flex justify-content-end">
                                    <div class="total-pesos">Total: $</div>
                                    <div class="total-pesos" id="totalCarrito"></div>
                                </div>
                            </div>
                        </div>
                        <div class="datosPersonales_finalizarCompra col-md-6">

                            <form onsubmit="return false" class="finalizarCompraForm">
                                <div class="form-row">
                                    <div class="col">
                                        <label for="nombre">Nombre</label>
                                        <input class="form-control" type="text" id="nombre"
                                            placeholder="Nombre y apellido">
                                    </div>
                                    <div class="col">
                                        <label for="email">Email</label>
                                        <input class="form-control" type="email" id="email" placeholder="mail@mail.com">
                                    </div>
                                    <div class="col">
                                        <label class="w-100" for="tel">Telefono</label>
                                        <input class="form-control" type="text" placeholder="(011) 1234 5678" id="tel">
                                    </div>
                                </div>

                                <div class="d-flex justify-content-center">
                                    <input class="btn btn-dark" style="width:100%; margin: 2rem;" id="btn-buy" type="submit" value="Realizar pedido">
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
    </div>


    `
}