import { clients, saveClients } from "./data.js";
import { fetchClientsAPI } from "./utils.js";

const table = document.getElementById("clientTable");
const form = document.getElementById("clientForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const companyInput = document.getElementById("company");
const notesInput = document.getElementById("notes");

let editId = null;

async function init() {
  try {
    if (clients.length === 0) {
      const apiClients = await fetchClientsAPI();

      const mappedClients = apiClients.map((u) => ({
        id: Date.now() + Math.random(),
        name: u.name,
        email: u.email,
        company: "Freelance Inc.",
        notes: "",
      }));

      clients.push(...mappedClients);
      saveClients();
    }
  } catch (error) {
    console.error("API Error:", error);
  }

  render();
}

function render() {
  table.innerHTML = "";

  [...clients]
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((c) => {
      table.innerHTML += `
        <tr>
          <td>${c.name}</td>
          <td>${c.email}</td>
          <td>${c.company}</td>
          <td>${c.notes || ""}</td>
          <td>
            <button class="edit-btn" onclick="editClient(${c.id})">Edit</button>
            <button class="delete-btn" onclick="deleteClient(${c.id})">Delete</button>
          </td>
        </tr>
      `;
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!nameInput.value || !emailInput.value) {
    alert("Name and Email are required");
    return;
  }

  const isEdit = editId !== null;

  const clientData = {
    id: isEdit ? editId : Date.now().toString(),
    name: nameInput.value,
    email: emailInput.value,
    company: companyInput.value || "Freelance Inc.",
    notes: notesInput.value || "",
  };

  if (isEdit) {
    const index = clients.findIndex((c) => c.id === editId);
    clients[index] = clientData;
    editId = null;
  } else {
    clients.push(clientData);
  }

  saveClients();
  render();
  form.reset();
});

window.editClient = (id) => {
  const client = clients.find((c) => c.id === id);
  if (!client) return;

  nameInput.value = client.name;
  emailInput.value = client.email;
  companyInput.value = client.company;
  notesInput.value = client.notes;

  editId = id;
};

window.deleteClient = (id) => {
  const index = clients.findIndex((c) => c.id === id);

  if (index !== -1) {
    clients.splice(index, 1);
    saveClients();
    render();
  }
};

init();
