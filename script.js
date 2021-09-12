import { SearchResults } from "./components/items/itemList.js";
import { Router } from "./components/router.js";

window.addEventListener('DOMContentLoaded', ()=> Router())

let searchForm = document.getElementById("search-form");
let searchTerm = document.getElementById("search");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let search = searchTerm.value;
  SearchResults(search);
});

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}