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

    const { category, description, gender, img, name, price, sizes, promo } = product;
    
    await RelatedItems(category, gender, name, id).then((res) => {
      relatedProducts.append(res);
    }); 

    let sizeContainer = document.createElement('div')
    let sizeTitle = document.createElement('p')
    let normalPrice = document.createElement('p')

    if(sizes){
    sizes.forEach(el=>{

      if(el === 'Seleccionar'){
        return
      }

      let div = document.createElement('div')
      div.innerText = el
      div.style.cssText = "border: 1px solid black;padding: 4px 8px; margin: 0 3px"
      sizeContainer.append(div)

      sizeTitle.innerHTML = `<p class="mb-3 text-center">Talles en stock:</p>`
    })}

    let promotional = document.createElement('p')

    if(promo){
      normalPrice.innerHTML = `<p class="m-0 fontzing" style="font-size: 2rem;">ANTES <span style="margin: 0;text-decoration: line-through red 4px;">&nbsp;$${price.toLocaleString()}&nbsp;</span></p>`
      promotional.innerHTML = `<p class="m-0 fontzing" style="font-size: 3rem;">AHORA $<span style="margin: 0;text-decoration: underline 4px;">${promo.toLocaleString()}!</span></p>`
    } else {
      promotional.style.display = "none"
      normalPrice.innerHTML = `<p class="m-0 fontzing" style="font-size: 3rem;">$<span style="margin: 0">${price.toLocaleString()}</span></p>`
    }

    return `<div class="container-fluid container-itemDetail">
    <div class="row px-5" id="${id}">
      <div class="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center p-0">
        <img class="container-itemDetail__img p-3" style="object-fit: cover; object-position: top; height:550px" alt="ProdImg" src="${img}" />
      </div>
      <div class="col-12 col-md-6 container-itemDetail__details d-flex flex-column px-4 py-3">
        <div class="d-flex flex-row">
          <a reference="home" class="contactbreadcrumb">Inicio</a>
          <a class="contactbreadcrumb click-category" gender="${gender}" category=${category}>> ${capitalize(category)}</a>
        </div>
        <div class="size-container">
          <h1 class="product-name mx-0">${name}</h1>
          <p class="mx-0" style="font-size: 1.3rem;">${description}</p>
          ${normalPrice.innerHTML}
          ${promotional.innerHTML}
          ${sizeTitle.innerHTML}
          <div class="d-flex align-items-center justify-content-center mb-5">
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
