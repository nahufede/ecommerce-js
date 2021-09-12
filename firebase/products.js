import { getFirestore } from "./firebase.js";

let db = getFirestore();

export const getCategories = async (x) => {

  let itemCollection

  if(x){
    itemCollection = db.collection(x);
  }

  if(itemCollection !== undefined){
    const querySnapshot = await itemCollection.orderBy("name").get();

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

export const getGenders = async () => {

  const itemCollection = db.collection("genders");
  const querySnapshot = await itemCollection.orderBy("name").get();

  let allGenders = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return allGenders;
}