let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;

const table = document.getElementById("productTable");
const modal = document.getElementById("modal");

function saveToStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

function renderProducts(data = products) {
  table.innerHTML = "";
  data.forEach((p, i) => {
    table.innerHTML += `
      <tr>
        <td class="px-6 py-3">${p.name}</td>
        <td>Rp ${p.price}</td>
        <td>${p.stock}</td>
        <td>${p.date}</td>
        <td class="space-x-2">
          <button onclick="editProduct(${i})" class="text-blue-600">Edit</button>
          <button onclick="deleteProduct(${i})" class="text-red-600">Delete</button>
        </td>
      </tr>
    `;
  });
}

function openModal() {
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  editIndex = null;
  clearForm();
}

function clearForm() {
  document.getElementById("pname").value = "";
  document.getElementById("price").value = "";
  document.getElementById("stock").value = "";
}

function saveProduct() {
  const name = document.getElementById("pname").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;

  if (!name || !price || !stock) {
    alert("All fields required!");
    return;
  }

  if (editIndex !== null) {
    products[editIndex].name = name;
    products[editIndex].price = price;
    products[editIndex].stock = stock;
  } else {
    products.push({
      name,
      price,
      stock,
      date: new Date().toLocaleDateString()
    });
  }

  saveToStorage();
  renderProducts();
  closeModal();
}

function editProduct(index) {
  editIndex = index;
  document.getElementById("pname").value = products[index].name;
  document.getElementById("price").value = products[index].price;
  document.getElementById("stock").value = products[index].stock;
  openModal();
}

function deleteProduct(index) {
  if (confirm("Delete product?")) {
    products.splice(index, 1);
    saveToStorage();
    renderProducts();
  }
}

document.getElementById("searchInput").addEventListener("input", e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword)
  );
  renderProducts(filtered);
});

renderProducts();
