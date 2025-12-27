// Calculator
let display = document.getElementById("display");

function press(val) {
  display.value += val;
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}

function clearDisplay() {
  display.value = "";
}

// Theme toggle
const switcher = document.getElementById("themeSwitch");

if (localStorage.getItem("theme") === "dark") {
  document.body.className = "dark";
  switcher.checked = true;
}

switcher.addEventListener("change", () => {
  const theme = switcher.checked ? "dark" : "light";
  document.body.className = theme;
  localStorage.setItem("theme", theme);
});
// Save history
function saveHistory(entry) {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.unshift(entry);
  localStorage.setItem("calcHistory", JSON.stringify(history));
}

// Load history
function loadHistory() {
  const list = document.getElementById("historyList");
  if (!list) return;

  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

  list.innerHTML = "";

  if (history.length === 0) {
    list.innerHTML = "<li>No history yet</li>";
    return;
  }

  history.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item}
      <button onclick="deleteHistory(${index})">✖</button>
    `;
    list.appendChild(li);
  });
}

// Delete one item
function deleteHistory(index) {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.splice(index, 1);
  localStorage.setItem("calcHistory", JSON.stringify(history));
  loadHistory();
}

// Clear all history
function clearHistory() {
  localStorage.removeItem("calcHistory");
  loadHistory();
}

document.addEventListener("DOMContentLoaded", loadHistory);
// Save history
function saveHistory(entry) {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.unshift(entry);
  localStorage.setItem("calcHistory", JSON.stringify(history));
}

// Load history
function loadHistory() {
  const list = document.getElementById("historyList");
  if (!list) return;

  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

  list.innerHTML = "";

  if (history.length === 0) {
    list.innerHTML = "<li>No history yet</li>";
    return;
  }

  history.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item}
      <button onclick="deleteHistory(${index})">✖</button>
    `;
    list.appendChild(li);
  });
}

// Delete one item
function deleteHistory(index) {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.splice(index, 1);
  localStorage.setItem("calcHistory", JSON.stringify(history));
  loadHistory();
}

// Clear all history
function clearHistory() {
  localStorage.removeItem("calcHistory");
  loadHistory();
}

document.addEventListener("DOMContentLoaded", loadHistory);
// Boxes logic
// ===== BOXES WITH HISTORY =====

const boxHistoryKey = "boxHistory";

// Load history on page load
document.addEventListener("DOMContentLoaded", loadBoxHistory);

document.querySelectorAll(".box input").forEach(input => {
  input.addEventListener("change", () => {
    const box = input.parentElement;
    const mul = Number(box.dataset.mul);
    const output = box.querySelector("span");

    try {
      const baseValue = eval(input.value || 0);
      const result = baseValue * mul;

      output.innerText = result;

      saveBoxHistory(`${input.value} × ${mul} = ${result}`);
    } catch {
      output.innerText = "Error";
    }
  });
});

// Save history
function saveBoxHistory(entry) {
  let history = JSON.parse(localStorage.getItem(boxHistoryKey)) || [];
  history.unshift(entry);
  localStorage.setItem(boxHistoryKey, JSON.stringify(history));
  loadBoxHistory();
}

// Load history
function loadBoxHistory() {
  const list = document.getElementById("boxHistory");
  if (!list) return;

  let history = JSON.parse(localStorage.getItem(boxHistoryKey)) || [];
  list.innerHTML = "";

  if (history.length === 0) {
    list.innerHTML = "<li>No history yet</li>";
    return;
  }

  history.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item}
      <button onclick="deleteBoxHistory(${index})">✖</button>
    `;
    list.appendChild(li);
  });
}

// Delete one entry
function deleteBoxHistory(index) {
  let history = JSON.parse(localStorage.getItem(boxHistoryKey)) || [];
  history.splice(index, 1);
  localStorage.setItem(boxHistoryKey, JSON.stringify(history));
  loadBoxHistory();
}

// Clear all history
function clearBoxHistory() {
  localStorage.removeItem(boxHistoryKey);
  loadBoxHistory();
}
// ===== EXPORT BOX HISTORY AS PDF =====
function exportBoxHistoryPDF() {
  const history = JSON.parse(localStorage.getItem("boxHistory")) || [];

  if (history.length === 0) {
    alert("No history to export");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Boxes Calculation History", 10, 10);

  doc.setFontSize(10);
  const date = new Date().toLocaleString();
  doc.text(`Generated on: ${date}`, 10, 18);

  let y = 30;

  history.forEach((item, index) => {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
    doc.text(`${index + 1}. ${item}`, 10, y);
    y += 8;
  });

  doc.save("boxes-history.pdf");
}
