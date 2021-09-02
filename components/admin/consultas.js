import { getFirestore } from "../../firebase/firebase.js";

let db = getFirestore();

export const Consultas = () => {

    const getConsultas = async (x) => {

        let itemCollection
      
        itemCollection = db.collection('consultas');
        const querySnapshot = await itemCollection.get();
      
        let consultas = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        }));
      
        return consultas;
    };

    getConsultas().then((consultas)=>{

        let consultasContainer 
        let viewList = document.createElement('div')
        viewList.className = "row justify-content-center pt-4"

        if (document.querySelector("#consultas")) {
        consultasContainer  = document.querySelector("#consultas")
        }

        consultas.forEach((el) => {
        /* Destrucuring sobre el objeto */
    
        const { name, email, phone, message, date, id } = el;
    
        const card = document.createElement('div');
        card.className = "col-6 col-md-4 d-flex justify-content-center mb-4"
        card.innerHTML = 
        `<div class="card" style="width: 18rem;" id=${id}>
            <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${email}</h6>
            <p class="card-text">${message}</p>
            <a href="https://wa.me/${phone}" target="_blank">${phone}</a>
            <p class="card-text">${date}</p>
            </div>
        </div>
        `
        viewList.appendChild(card);
        });
    
        consultasContainer.appendChild(viewList)
    })

    return (`
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="d-flex flex-row justify-content-center">
            <a id="home" class="contactbreadcrumb">Inicio</a>
            <a id="admin" class="contactbreadcrumb">> Administrador</a>
            <p>> Consultas</p>
          </div>
        </div>
      </div>
      <div class="row p-0">
        <div class="col-12 my-5">
          <div class="col-12">
            <h1 class="text-center mb-5">CONSULTAS</h1>
          </div>
          <div class="col-12" id="consultas">
          </div>
        </div>
      </div>
    </div>`)
}