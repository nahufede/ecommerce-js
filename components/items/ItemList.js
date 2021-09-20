import { getFirestore } from "../../firebase/firebase.js";

let db = getFirestore();
let app = document.querySelector("#app");

export const ItemList = async (category, gender) => {
  
  app.innerHTML = "";
  
  let allProducts = [];
  let itemListContainer = document.createElement("div");
  itemListContainer.className = "container-fluid";
  itemListContainer.classList.add("container-itemList");
  itemListContainer.innerHTML = `
                        <h1 class="text-center container-itemList__title">${category} de ${gender}</h1>
                      `;

  let products = document.createElement("div");
  products.className = "row p-3";
  itemListContainer.appendChild(products);

  const itemCollection = db.collection("products");
  let filteredItems = itemCollection.where("gender", "==", gender).where("category", "==", category);

  const querySnapshot = await filteredItems.get();

  allProducts = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  allProducts.forEach((el) => {
    const { name, id, img } = el;

      let prodContainer = document.createElement("div");
      prodContainer.className = "col-12 col-md-4 p-3";
      let prod = document.createElement("div");
      prodContainer.appendChild(prod);
      prod.className = "card";
      prod.classList.add("itemList-product");
      prod.innerHTML = `<a href="" class="itemdetail" style="background-image: url('${img}'); height: 21rem; background-position: center; background-size: cover; background-repeat: no-repeat;" alt="${name}" id="${id}">
                      <div class="card-body itemList-product__name" style="position: absolute;width: 100%;bottom: 0; padding: 1rem 0;">
                          <p class="card-title text-center m-0" style="font-size: 0.8rem">${name}</p>
                      </div>
                      </a>
                  `;

      products.appendChild(prodContainer);
    });

  if (allProducts.length === 0) {
    itemListContainer.innerHTML = `<h1 class="text-center container-itemList__title">${category} de ${gender}</h1>
    <h3 class="text-center pt-5">No hay productos</h3>`;
  }
  app.appendChild(itemListContainer);
}

export const RelatedItems = async (category, gender, id) => {
  let relatedProducts = [];

  let products = document.createElement("div");
  products.className = "col-10 offset-1 d-flex flex-column";

  console.log(id);

  const itemCollection = db.collection("products");
  let filteredItems = itemCollection.where("gender", "==", gender).where("category", "==", category).limit(3);

  const querySnapshot = await filteredItems.get();

  relatedProducts = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  relatedProducts.forEach((el) => {

    const { name, id, img } = el;

    let prodContainer = document.createElement("div");
    prodContainer.className = "col-12 col-md-4 p-3";
    let prod = document.createElement("div");
    prodContainer.appendChild(prod);
    prod.className = "card";
    prod.classList.add("itemList-product");
    prod.innerHTML = `
    <a href="" class="itemdetail" style="background-image: url('${img}'); height: 21rem; background-position: center; background-size: cover; background-repeat: no-repeat;" alt="${name}" id="${id}">
      <div class="card-body itemList-product__name" style="position: absolute;width: 100%;bottom: 0; padding: 1rem 0;">
        <p class="card-title text-center m-0" style="font-size: 0.8rem">${name}</p>
      </div>
    </a>
`;
    products.appendChild(prodContainer);
  });
  return products;
}