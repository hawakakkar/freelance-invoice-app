import { clients, invoices, saveInvoices } from "./data.js";

const form = document.getElementById("invoiceForm");
const list = document.getElementById("invoiceList");
const select = document.getElementById("clientSelect");

let editIndex = null;

function loadClients() {
  select.innerHTML = clients
    .map((c) => `<option value="${c.id}">${c.name}</option>`)
    .join("");
}

function getTotalRevenue() {
  return invoices.reduce((sum, inv) => sum + inv.amount, 0);
}

function getPaidCount() {
  return invoices.filter((inv) => inv.paid).length;
}

function getUnpaidCount() {
  return invoices.filter((inv) => !inv.paid).length;
}

function renderStats() {
  console.log("Revenue:", getTotalRevenue());
  console.log("Paid:", getPaidCount());
  console.log("Unpaid:", getUnpaidCount());
}

function render() {
  list.innerHTML = invoices
    .map((inv, i) => {
      return `
        <div class="card">
          <h3>${inv.service}</h3>
          <p>${inv.desc}</p>
          <p>$${inv.amount}</p>
          <p>${inv.date}</p>
          <p>Status: ${inv.paid ? "Paid" : "Unpaid"}</p>

          <button class="toggle-btn" onclick="toggle(${i})">Toggle</button>
          <button class="edit-btn" onclick="editInvoice(${i})">Edit</button>
          <button class="delete-btn" onclick="del(${i})">Delete</button>
        </div>
      `;
    })
    .join("");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    id: editIndex === null ? Date.now() : invoices[editIndex].id,
    clientId: select.value,
    service: service.value,
    desc: desc.value,
    amount: Number(amount.value),
    date: date.value,
    paid: editIndex === null ? false : invoices[editIndex].paid,
  };

  if (editIndex === null) {
    invoices.push(data);
  } else {
    invoices[editIndex] = data;
    editIndex = null;
  }

  saveInvoices();
  render();
  renderStats();
  form.reset();
});

window.editInvoice = (i) => {
  const inv = invoices[i];

  select.value = inv.clientId;
  service.value = inv.service;
  desc.value = inv.desc;
  amount.value = inv.amount;
  date.value = inv.date;

  editIndex = i;
};

window.toggle = (i) => {
  invoices[i].paid = !invoices[i].paid;
  saveInvoices();
  render();
  renderStats();
};

window.del = (i) => {
  invoices.splice(i, 1);
  saveInvoices();
  render();
  renderStats();
};

loadClients();
render();
renderStats();
