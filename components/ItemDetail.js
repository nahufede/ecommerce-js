import { getFirestore } from "../firebase/firebase.js";

let db = getFirestore();

export const itemDetail = {
  render: async (id) => {
    var docRef = db.collection("products").doc(id);

    let response;
    let product;

    await docRef.get().then((doc) => {
      if (doc.exists) {
        product = { ...doc.data(), id: doc.id };

        response = `<div class="container container-itemDetail">
      <div class="row" id="${id}">
        <div class="col-md-6">
          <img class="container-itemDetail__img" alt="ProdImg" src="${product.img}" />
        </div>
        <div class="col-md-6 container-itemDetail__details">
          <span>Inicio > ${product.category} > ${product.name}</span>
          <h1 class="product-name">${product.name}</h1>
          <div><button class="btn btn-dark btn-add-product"">AGREGAR AL CARRITO</button></div>
          <div><p>${product.description}</p></div>
        </div>
      </div>
      <hr class="horizontalLine" />
      <div class="container-itemDetail__related">
        <div><h2>PRODUCTOS RELACIONADOS</h2></div>
        <div class="row">
          <div class="col-md-4 container-itemDetail__relatedProd">
            <img src="" alt="ProdImg" />
          </div>
          <div class="col-md-4 container-itemDetail__relatedProd">
            <img src="" alt="ProdImg" />
          </div>
          <div class="col-md-4 container-itemDetail__relatedProd">
            <img src="" alt="ProdImg" />
          </div>
        </div>
      </div>
    </div>`;
      }
    });

    return response;
  },
};

export default itemDetail;
