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