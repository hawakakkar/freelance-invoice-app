import { clients, invoices } from "./data.js";
import { fetchQuote } from "./utils.js";

const totalClients = document.getElementById("totalClients");
const totalInvoices = document.getElementById("totalInvoices");
const totalRevenue = document.getElementById("totalRevenue");
const invoiceStats = document.getElementById("invoiceStats");
const quoteBox = document.getElementById("quoteBox");

function loadStats() {
  totalClients.innerText = `Clients: ${clients.length}`;
  totalInvoices.innerText = `Invoices: ${invoices.length}`;

  const revenue = invoices.reduce((sum, i) => sum + i.amount, 0);
  totalRevenue.innerText = `Revenue: $${revenue}`;

  const paid = invoices.filter((i) => i.paid).length;
  const unpaid = invoices.filter((i) => !i.paid).length;

  invoiceStats.innerText = `Paid: ${paid} | Unpaid: ${unpaid}`;
}

async function loadQuote() {
  const q = await fetchQuote();
  quoteBox.innerHTML = `
    <h3>Motivation</h3>
    <p>"${q.text}"</p>
    <small>- ${q.author}</small>
  `;
}

loadStats();
loadQuote();
