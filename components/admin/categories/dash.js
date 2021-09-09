export const CategoriesDashboard = () => {

  return (
          `<div class="container">
              <div class="row">
              <div class="col-12 col-sm-6 offset-sm-3 d-flex flex-column justify-content-around" style="height: 60vh;">
                      <div class="d-flex flex-row justify-content-center">
                          <a reference="home" class="contactbreadcrumb">Inicio</a>
                          <a reference="admin" class="contactbreadcrumb">> Administrador</a>
                          <p>> Categorias</p>
                      </div>
                      <h1 class="text-center fontzing">CATEGORIAS</h1>
                      <div class="d-flex flex-column">
                        <button reference="showcategories" class="mybutton mb-2" type="button">Ver Categorias</button>
                        <button reference="createcategory" class="mybutton mb-2" type="button">Añadir Categoria</button>
                      </div>
                  </div>
              </div>
          </div>`
  )
}


export default CategoriesDashboard;