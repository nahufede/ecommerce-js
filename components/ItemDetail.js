import { getFirestore } from "../firebase/firebase.js";
import { ItemList, RelatedItems } from "../components/ItemList.js";

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

    await RelatedItems(product.category).then((res) => {
      relatedProducts.append(res);
      console.log(relatedProducts)
    });

    return `<div class="container container-itemDetail">
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
      ${relatedProducts.innerHTML}
      </div>
    </div>
  </div>`;
  },
};

export default itemDetail;
