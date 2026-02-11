let users = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = null;

const table = document.getElementById("userTable");
const modal = document.getElementById("modal");

function saveToStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}

function renderUsers(data = users) {
  table.innerHTML = "";
  data.forEach((u, i) => {
    table.innerHTML += `
      <tr>
        <td class="px-6 py-3">${u.name}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td>${u.date}</td>
        <td class="space-x-2">
          <button onclick="editUser(${i})" class="text-blue-600">Edit</button>
          <button onclick="deleteUser(${i})" class="text-red-600">Delete</button>
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
}

function saveUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const role = document.getElementById("role").value;

  if (!name || !email) {
    alert("All fields required!");
    return;
  }

  if (editIndex !== null) {
    users[editIndex].name = name;
    users[editIndex].email = email;
    users[editIndex].role = role;
  } else {
    users.push({
      name,
      email,
      role,
      date: new Date().toLocaleDateString()
    });
  }

  saveToStorage();
  renderUsers();
  closeModal();
}

function editUser(index) {
  editIndex = index;
  document.getElementById("name").value = users[index].name;
  document.getElementById("email").value = users[index].email;
  document.getElementById("role").value = users[index].role;
  openModal();
}

function deleteUser(index) {
  if (confirm("Delete user?")) {
    users.splice(index, 1);
    saveToStorage();
    renderUsers();
  }
}

document.getElementById("searchInput").addEventListener("input", e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(keyword) ||
    u.email.toLowerCase().includes(keyword)
  );
  renderUsers(filtered);
});

renderUsers();
