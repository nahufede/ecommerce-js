import { getFirestore } from "../../firebase/firebase.js"

let db = getFirestore();
let app = document.querySelector("#app");

const findProducts = async (search) => {

    let products = document.createElement("div");

    products.className = "row px-3";

    const itemCollection = db.collection("products");

    const querySnapshot = await itemCollection.get();

    let allProducts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const filteredItems = allProducts.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    filteredItems.forEach((el) => {
        const { name, id, img } = el;

        let prodContainer = document.createElement("div");
        prodContainer.className = "col-md-4 col-6 px-3 pb-3";
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

    if(document.querySelector('.container-itemList')){
        
    let container = document.querySelector('.container-itemList')

    container.innerHTML = ` <div class="row">
                                <h3 class="pt-4 fontzing text-center">Mostrando resultados de</h3>
                                <h3 class="pb-4 fontzing text-center">"${search}"</h3>
                            </div>
                            <div class="row noresults" style="display:none">
                                <h3 class="pt-4 fontzing text-center">No hay resultados relacionados</h3>
                            </div>
                            `
    container.appendChild(products)
    }

    if(filteredItems.length === 0){
        document.querySelector('.noresults').style.display = "block"
    }
}

export const Search = (search) => {

    findProducts(search)
  
    return `<div class="container container-itemList">
            <div class="row">
                <h3 class="pt-4 fontzing text-center">Mostrando resultados de</h3>
                <h3 class="pb-4 fontzing text-center">"${search}"</h3>
            </div>
            <div class="row noresults" style="display:none">
                <h3 class="pt-4 fontzing text-center">No hay resultados relacionados</h3>
            </div>
        </div>
        `;
}

export default Search;
