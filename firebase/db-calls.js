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
  const querySnapshot = await itemCollection.orderBy("name", "desc").get();

  let allGenders = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return allGenders;
}

export const getOrders = async (parametro) => {

  const itemCollection = db.collection("orders");

  let querySnapshot

  if(parametro){
    querySnapshot = await itemCollection.where("send", "==", true).get();
  } else {
    querySnapshot = await itemCollection.where("send", "==", false).get();
  }

  let allorders = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return allorders;
}

export const getConsultas = async () => {

  let itemCollection

  itemCollection = db.collection('consultas');
  const querySnapshot = await itemCollection.get();

  let consultas = querySnapshot.docs.map((doc) => ({
  ...doc.data(),
  id: doc.id,
  }));

  return consultas;
};