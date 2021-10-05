import { getFirestore } from "../../firebase/firebase.js";
import { capitalize } from "../../script.js";
import { RelatedItems } from "./ItemList.js";

let db = getFirestore();

export const itemDetail = {
  render: async (id) => {
    var docRef = db.collection("products").doc(id);

    let product;
    let relatedProducts = document.createElement("div");
    relatedProducts.className = "container";

    await docRef.get().then((doc) => {
      if (doc.exists) {
        product = { ...doc.data(), id: doc.id };
      }
    });

    const { category, description, gender, img, name, price, sizes } = product;
    
    await RelatedItems(category, gender, name, id).then((res) => {
      relatedProducts.append(res);
    }); 

    let sizeContainer = document.createElement('div')
    
    sizes.forEach(el=>{

      if(el === 'Seleccionar'){
        return
      }

      let div = document.createElement('div')
      div.innerText = el
      sizeContainer.append(div)
    })

    return `<div class="container-fluid container-itemDetail">
    <div class="row" id="${id}">
      <div class="col-12 col-md-6 d-flex">
        <img class="container-itemDetail__img" alt="ProdImg" src="${img}" />
      </div>
      <div class="col-10 col-md-6 container-itemDetail__details ms-auto me-auto">
        <div class="d-flex flex-row">
          <a reference="home" class="contactbreadcrumb">Inicio</a>
          <a class="contactbreadcrumb click-category" gender="${gender}" category=${category}>> ${capitalize(category)}</a>
        </div>
        <div class="pe-3 size-container">
          <h1 class="product-name mx-0">${name}</h1>
          <p class="mx-0" style="font-size: 1.3rem;">${description}</p>
          <p class="mx-0" style="font-size: 2rem;">$${price.toLocaleString()}</p>
          <div class="d-flex flex-row align-items-center justify-content-evenly mb-4">
          ${sizeContainer.innerHTML}
          </div>
          <button class="btn btn-dark btn-add-product m-0">AGREGAR AL CARRITO</button>
        </div>
      </div>
    </div>
    <div class="container-fluid">
        <div class="col-12">
            <div class="line"></div>
        </div>
    </div>
    <div class="container-itemDetail__related">
      <div>
        <div class="row">
          <h2 class="fontzing pb-3">PRODUCTOS RELACIONADOS</h2> 
          ${relatedProducts.innerHTML}
        </div>
      </div>
    </div>
  </div>`;
  },
};

export default itemDetail;
