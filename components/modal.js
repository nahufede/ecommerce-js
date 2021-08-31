import { getCategories } from "../firebase/products.js";

export const DBModal = () => {

    getCategories('man').then((categories) => {
      let selectItems;

      categories.forEach((el, index) => {
        const option = document.createElement("option");

        /* Destrucuring sobre el objeto p */
        const { name } = el;

        option.innerHTML = name;
        option.setAttribute("value", index + 1);

        if (document.querySelector(".categoryoptions")) {
          selectItems = document.querySelector(".categoryoptions");
        }

        selectItems.appendChild(option);
      });
    });

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
            <button class="btn btn-primary saveEdit">Guardar cambios</button>
          </form>
        </div>
      </div>
    </div>
  </div>`;
  };