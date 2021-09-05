import { getFirestore } from "./firebase.js";

let db = getFirestore();

export const getCategories = async (x) => {

  let itemCollection

  if(x === "man"){
    itemCollection = db.collection('categories_man');
  } else if (x === "woman"){
    itemCollection = db.collection('categories_woman');
  }

  if(itemCollection !== undefined){
    const querySnapshot = await itemCollection.get();

    let categories = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return categories;
  }
};

export const getItems = async () => {

  const itemCollection = db.collection("products");
  const querySnapshot = await itemCollection.orderBy("name").get();

  let allProducts = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return allProducts;
}