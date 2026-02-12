function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function renderDashboard() {
  const users = getUsers();
  const products = getProducts();

  // Update total
  document.getElementById("totalUsers").textContent = users.length;
  document.getElementById("totalProducts").textContent = products.length;

  // Update latest users
  const table = document.getElementById("latestUsers");
  if (!table) return;

  const latest = users.slice(-5).reverse();
  table.innerHTML = "";

  latest.forEach(user => {
    table.innerHTML += `
      <tr>
        <td class="px-6 py-3">${user.name}</td>
        <td class="px-6 py-3">${user.email}</td>
        <td class="px-6 py-3">${user.role}</td>
        <td class="px-6 py-3">${user.date}</td>
      </tr>
    `;
  });
}

// Render pertama kali
renderDashboard();

// 🔥 AUTO UPDATE realtime antar tab
window.addEventListener("storage", function (event) {
  if (event.key === "users" || event.key === "products") {
    renderDashboard();
  }
});

// 🔥 AUTO UPDATE dalam halaman yang sama
setInterval(renderDashboard, 1000);

