// storage.js
export function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

export function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

export function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

export function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}
