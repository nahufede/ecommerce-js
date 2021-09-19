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

    const { category, description, gender, img, name, price } = product;
    
    await RelatedItems(category).then((res) => {
      relatedProducts.append(res);
    }); 

    return `<div class="container-fluid container-itemDetail">
    <div class="row" id="${id}">
      <div class="col-12 col-md-6 d-flex">
        <img class="container-itemDetail__img" alt="ProdImg" src="${img}" />
      </div>
      <div class="col-10 col-md-6 container-itemDetail__details ms-auto me-auto">
        <div class="d-flex flex-row">
          <a reference="home" class="contactbreadcrumb">Inicio</a>
          <a class="contactbreadcrumb click-category" id=${category}>> ${capitalize(category)}</a>
        </div>
        <div class="pe-3">
          <h1 class="product-name mx-0">${name}</h1>
          <p class="mx-0" style="font-size: 1.3rem;">${description}</p>
          <p class="mx-0" style="font-size: 2rem;">$${price.toLocaleString()}</p>
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
      <div><h2 class="fontzing">PRODUCTOS RELACIONADOS</h2></div>
      ${relatedProducts.innerHTML}
      </div>
    </div>
  </div>`;
  },
};

export default itemDetail;
