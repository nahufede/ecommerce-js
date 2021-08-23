import { getFirestore } from "../firebase/firebase.js";

let db = getFirestore();
let app = document.querySelector("#app");

export async function ItemList(category) {
  app.innerHTML = "";

  let allProducts = [];

  let products = document.createElement("div");
  products.className = "container";
  products.style.cssText =
    "display: flex ; flex-direction: column ; margin: 5rem";

  const itemCollection = db.collection("products");
  let filteredItems = itemCollection.where("category", "==", category);

  const querySnapshot = await filteredItems.get();

  allProducts = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  allProducts.forEach((el) => {
    let prod = document.createElement("div");
    prod.className = "card";
    prod.setAttribute("id", el.id);
    prod.style = "width: 14rem;";
    prod.innerHTML = `
            
                <img src="${el.img}" class="card-img-top" style="height: 12rem;" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${el.name}</h5>
                    <p class="card-text">${el.description}</p>
                    <p class="card-text">${el.price}</p>
                    <p class="card-text">${el.category}</p>
                </div>
            `;

    products.appendChild(prod);
  });

  if (allProducts.length === 0) {
    products.innerHTML = "<h1>No hay productos</h1>";
  }
  app.appendChild(products);
}

export async function SearchResults(search) {
  app.innerHTML = "";

  let allProducts = [];

  let products = document.createElement("div");
  products.className = "container";
  products.style.cssText =
    "display: flex ; flex-direction: column ; margin: 5rem";

  const itemCollection = db.collection("products");

  const querySnapshot = await itemCollection.get();

  allProducts = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  let categoryFilter = allProducts.filter((item) =>
    item.category.toLowerCase().includes(search.toLowerCase())
  );
  let nameFilter = allProducts.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredItems = categoryFilter.concat(nameFilter);
  filteredItems.forEach((el) => {
    let prod = document.createElement("div");
    prod.className = "card";
    prod.setAttribute("id", el.id);
    prod.style = "width: 14rem;";
    prod.innerHTML = `
            
                <img src="${el.img}" class="card-img-top" style="height: 12rem;" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${el.name}</h5>
                    <p class="card-text">${el.description}</p>
                    <p class="card-text">${el.price}</p>
                    <p class="card-text">${el.category}</p>
                </div>
            `;

    products.appendChild(prod);
  });

  if (filteredItems.length === 0) {
    products.innerHTML = "<h1>No hay productos</h1>";
  }
  app.appendChild(products);
}
