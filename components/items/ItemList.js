import { getFirestore } from "../../firebase/firebase.js";

let db = getFirestore();
let app = document.querySelector("#app");

export async function ItemList(category) {
  app.innerHTML = "";

  let allProducts = [];
  let itemListContainer = document.createElement("div");
  itemListContainer.className = "container";
  itemListContainer.classList.add("container-itemList");
  itemListContainer.innerHTML = `
                        <h1 class="text-center container-itemList__title">${category}</h1>
                      `;

  let products = document.createElement("div");
  products.className = "row";
  itemListContainer.appendChild(products);

  const itemCollection = db.collection("products");
  let filteredItems = itemCollection.where("category", "==", category);

  const querySnapshot = await filteredItems.get();

  allProducts = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  allProducts.forEach((el) => {
    let prodContainer = document.createElement("div");
    prodContainer.className = "col-md-4 col-6";
    let prod = document.createElement("div");
    prodContainer.appendChild(prod);
    prod.className = "card";
    prod.classList.add("itemList-product");
    prod.innerHTML = `<a href="">  
                <img src="${el.img}" class="card-img itemList-product__image" id="${el.id}" alt="${el.name}">
                <div class="card-body itemList-product__name">
                    <p class="card-title text-center">${el.name}</p>
                </div>
                </a>
            `;

    products.appendChild(prodContainer);
  });

  if (allProducts.length === 0) {
    itemListContainer.innerHTML = `<h1 class="text-center container-itemList__title">${category}</h1>
    <h2>No hay productos</h2>`;
  }
  app.appendChild(itemListContainer);
}

export async function RelatedItems(category) {
  let relatedProducts = [];

  let products = document.createElement("div");
  products.className = "row";

  const itemCollection = db.collection("products");
  let filteredItems = itemCollection.where("category", "==", category);

  const querySnapshot = await filteredItems.get();

  relatedProducts = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  relatedProducts.forEach((el) => {
    let prodContainer = document.createElement("div");
    prodContainer.className = "col-md-4 col-6";
    prodContainer.style = "margin: 2% 0% 2% 0%;";
    let prod = document.createElement("div");
    prodContainer.appendChild(prod);
    prod.className = "card";
    prod.classList.add("itemList-product");
    prod.innerHTML = `<a href="">  
                <img src="${el.img}" class="card-img itemList-product__image" id="${el.id}" alt="${el.name}">
                <div class="card-body itemList-product__name">
                    <p class="card-title text-center">${el.name}</p>
                </div>
                </a>
            `;
    products.appendChild(prodContainer);
  });
  return products;
}

export async function SearchResults(search) {
  app.innerHTML = "";

  let allProducts = [];
  let itemListContainer = document.createElement("div");
  itemListContainer.className = "container";
  itemListContainer.classList.add("container-itemList");
  itemListContainer.innerHTML = `
                        <h3>Mostrando resultados de "${search}"</h3>
                      `;

  let products = document.createElement("div");
  products.className = "row";
  itemListContainer.appendChild(products);

  const itemCollection = db.collection("products");

  const querySnapshot = await itemCollection.get();

  allProducts = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  let categoryFilter = allProducts.filter((item) =>
    item.category.toLowerCase().includes(search.toLowerCase())
  );
  let nameFilter = allProducts.map((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredItems = categoryFilter.concat(nameFilter);
  filteredItems.forEach((el) => {
    let prodContainer = document.createElement("div");
    prodContainer.className = "col-md-4 col-6";
    let prod = document.createElement("div");
    prodContainer.appendChild(prod);
    prod.className = "card";
    prod.classList.add("itemList-product");
    prod.innerHTML = `<a href="">  
                <img src="${el.img}" class="card-img itemList-product__image" id="${el.id}" alt="${el.name}">
                <div class="card-body itemList-product__name">
                    <p class="card-title text-center">${el.name}</p>
                </div>
                </a>
            `;

    products.appendChild(prodContainer);
  });

  if (filteredItems.length === 0) {
    products.innerHTML = "<h1>No hay productos</h1>";
  }
  app.appendChild(itemListContainer);
}