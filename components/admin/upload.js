export const Upload = (e) => {

    return (
        `<div class="container">
        <div class="row">
            <div class="col-12">
              <div class="d-flex flex-row justify-content-center">
                <a id="home" class="contactbreadcrumb" href="">Inicio</a>
                <a id="admin" class="contactbreadcrumb" href="">> Administrador</a>
                <p>> Nuevos</p>
            </div>
            </div>
            <div class="col-12 my-5 d-flex">
              <div class="col-6">
                <h1>SUBIR PRODUCTOS</h1>
              </div>
              <div class="col-6 form">
                  <form id="createForm">
                      <div class="form-floating mb-3">
                          <input type="text" class="form-control" id="floatingName" placeholder="Traje de baño">
                          <label for="floatingName">Nombre</label>
                      </div>
                      <div class="form-floating mb-3">
                          <select class="form-select" id="floatingCategory" aria-label="Floating label category">
                              <option selected>Seleccionar</option>
                              <option value="1">Camisas</option>
                              <option value="2">Trajes de baño</option>
                              <option value="3">Buzos</option>
                          </select>
                          <label for="floatingCategory">Categoria</label>
                      </div>
                      <div class="input-group mb-3">
                          <span class="input-group-text">$</span>
                          <input type="text" class="form-control" id="price" aria-label="Amount (to the nearest dollar)">
                          <span class="input-group-text">.00</span>
                      </div>
                      <div class="form-floating mb-3">
                          <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"
                              style="height: 100px"></textarea>
                          <label for="floatingTextarea">Descripción</label>
                      </div>
                      <div class="mb-3">
                          <input class="form-control" type="file" id="formFileMultiple" multiple>
                      </div>
                      <div class="progress mb-3">
                          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                              style="width: 0%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <button type="submitBtn" class="mybutton submitBtn">Subir</button>
                  </form>
              </div>
            </div>
        </div>
    </div>`
    )
}

export default Upload;