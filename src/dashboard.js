import { getUsers, getProducts } from "./storage.js";

document.getElementById("totalUsers").innerText = getUsers().length;
document.getElementById("totalProducts").innerText = getProducts().length;

const latestUsers = getUsers().slice(-5).reverse();
const table = document.getElementById("latestUsers");

table.innerHTML = "";

latestUsers.forEach(user => {
  table.innerHTML += `
    <tr class="border-b">
      <td class="py-3">${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>${user.date}</td>
    </tr>
  `;
});
