export const GendersDashboard = () => {

  return (
          `<div class="container">
              <div class="row">
              <div class="col-12 col-sm-6 offset-sm-3 d-flex flex-column justify-content-around" style="height: 60vh;">
                      <div class="d-flex flex-row justify-content-center">
                          <a id="home" class="contactbreadcrumb">Inicio</a>
                          <a id="admin" class="contactbreadcrumb">> Administrador</a>
                          <p>> Géneros</p>
                      </div>
                      <h1 class="text-center fontzing">GÉNEROS</h1>
                      <div class="d-flex flex-column">
                        <button id="showgenders" class="mybutton mb-2" type="button">Ver Géneros</button>
                        <button id="creategender" class="mybutton mb-2" type="button">Añadir Género</button>
                      </div>
                  </div>
              </div>
          </div>`
  )
}


export default GendersDashboard;