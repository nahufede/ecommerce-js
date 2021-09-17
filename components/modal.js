export const DBModal = () => {

    return `
    <div class="modal fade" id="dbproductsmodal" tabindex="-1" aria-labelledby="dbproductsmodal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content p-3 modalParent">
          <form class="editForm">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="floatingName" />
              <label for="floatingName">Nombre</label>
            </div>
            <div class="form-floating mb-3">
              <select class="form-select categoryoptions" id="floatingCategory" aria-label="Floating label category">
                <option selected>Seleccionar</option>
              </select>
              <label for="floatingCategory">Categoria</label>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">$</span>
              <input type="text" class="form-control" id="price" aria-label="Amount (to the nearest dollar)" />
              <span class="input-group-text">.00</span>
            </div>
            <div class="form-floating mb-3">
              <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"
                style="height: 100px"></textarea>
              <label for="floatingTextarea">Descripción</label>
            </div>
            <div class="d-flex justify-content-center">
            <button class="btn btn-primary saveEdit mybutton">Guardar</button>
            <button class="mybutton loadingbtn" type="button" disabled style="display:none;">
              <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
              Actualizando
            </button>
            </div>
            <div class="col-12" id="alertsuccess" style="display:none;">
            <svg xmlns="http://www.w3.org/2000/svg" style="display:none;">
                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </symbol>
            </svg>
            <div class="alert alert-success d-flex align-items-center justify-content-center mt-3" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                <div>
                Actualizado éxitosamente
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>`;
  };