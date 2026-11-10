// ===== DATA =====
const STORAGE_KEY = "spendwise-data";
const CATEGORIES = ["Food", "Transport", "Rent", "Entertainment", "Other"];

const defaultData = {
  budget: 30000,
  expenses: [
    { id: 1, name: "Groceries", amount: 2500, category: "Food", date: "2026-08-20" },
    { id: 2, name: "Bus Fare", amount: 300, category: "Transport", date: "2026-08-21" },
    { id: 3, name: "House Rent", amount: 15000, category: "Rent", date: "2026-08-22" },
    { id: 4, name: "Movie Night", amount: 1200, category: "Entertainment", date: "2026-08-23" },
    { id: 5, name: "Electricity", amount: 1500, category: "Other", date: "2026-08-24" }
  ],
  goals: []
};

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.expenses) && Array.isArray(saved.goals)) return saved;
  } catch (e) { /* ignore, use defaults */ }
  return JSON.parse(JSON.stringify(defaultData));
}

function saveData() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
}

let state = loadData();

// ===== HELPERS =====
const $ = (id) => document.getElementById(id);
const money = (n) => "KSh " + Number(n).toLocaleString();
const newId = () => Date.now() + Math.floor(Math.random() * 1000);

function esc(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function showMsg(id, text, type) {
  $(id).textContent = text;
  $(id).className = "msg " + type;
}

// ===== CALCULATIONS (loops over arrays) =====
function totalSpent() {
  let total = 0;
  for (const e of state.expenses) total += e.amount;
  return total;
}

function totalSaved() {
  let total = 0;
  for (const g of state.goals) total += g.saved;
  return total;
}

function spentByCategory() {
  const totals = {};
  for (const c of CATEGORIES) totals[c] = 0;
  for (const e of state.expenses) totals[e.category] = (totals[e.category] || 0) + e.amount;
  return totals;
}

function percent(part, whole) {
  return whole > 0 ? (part / whole) * 100 : 0;
}

// ===== RENDER: DASHBOARD =====
function renderDashboard() {
  const spent = totalSpent();
  const remaining = state.budget - spent;
  const used = percent(spent, state.budget);

  $("d-budget").textContent = money(state.budget);
  $("d-spent").textContent = money(spent);
  $("d-remaining").textContent = money(remaining);
  $("d-remaining").classList.toggle("negative", remaining < 0);
  $("d-saved").textContent = money(totalSaved());

  // Decision making: progress bar colour and feedback message
  const bar = $("d-bar");
  const status = $("d-status");
  bar.style.width = Math.min(used, 100) + "%";
  bar.className = "fill";
  status.className = "status";

  if (state.budget <= 0) {
    status.textContent = "Set a monthly budget on the Budget page to start tracking.";
  } else if (used > 100) {
    status.textContent = "Over budget by " + money(Math.abs(remaining)) + ". Review your expenses.";
    status.classList.add("danger");
    bar.classList.add("danger");
  } else if (used >= 80) {
    status.textContent = "You have used " + used.toFixed(1) + "% of your budget. Spend carefully.";
    status.classList.add("warning");
    bar.classList.add("warning");
  } else {
    status.textContent = "On track: " + used.toFixed(1) + "% of your budget used.";
    status.classList.add("good");
  }

  // Spending by category
  const totals = spentByCategory();
  let catHtml = "";
  for (const c of CATEGORIES) {
    const share = percent(totals[c], spent);
    catHtml +=
      '<div class="cat-row"><div><span>' + c + "</span><span>" + money(totals[c]) + "</span></div>" +
      '<div class="bar"><div class="fill" style="width:' + share + '%"></div></div></div>';
  }
  $("d-cats").innerHTML = catHtml;

  // Recent expenses (newest 5)
  const recent = [...state.expenses].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  let recentHtml = "";
  for (const e of recent) {
    recentHtml +=
      "<li><span>" + esc(e.name) + '<br><span class="muted">' + e.category + " · " + e.date +
      "</span></span><strong>" + money(e.amount) + "</strong></li>";
  }
  $("d-recent").innerHTML = recentHtml || '<li class="muted">No expenses yet.</li>';
}

// ===== RENDER: EXPENSES =====
function fillCategoryOptions() {
  let options = "";
  for (const c of CATEGORIES) options += '<option value="' + c + '">' + c + "</option>";
  $("e-category").innerHTML = options;
  $("e-filter").innerHTML = '<option value="All">All categories</option>' + options;
}

function renderExpenses() {
  const filter = $("e-filter").value;
  let rows = "";

  for (const e of state.expenses) {
    if (filter !== "All" && e.category !== filter) continue;
    rows +=
      "<tr><td>" + esc(e.name) + "</td><td>" + money(e.amount) + "</td><td>" + e.category +
      "</td><td>" + e.date + '</td><td><button class="danger-btn" data-delete="' + e.id +
      '">Delete</button></td></tr>';
  }

  $("e-body").innerHTML = rows || '<tr><td colspan="5" class="muted">No expenses to show. Add one above.</td></tr>';
}

// ===== RENDER: SAVINGS =====
function renderSavings() {
  let html = "";

  for (const g of state.goals) {
    const done = percent(g.saved, g.target);
    const complete = g.saved >= g.target;
    html +=
      '<div class="card" data-goal="' + g.id + '">' +
      '<div class="goal-top"><h3>' + esc(g.name) + '</h3><button class="danger-btn" data-remove="' + g.id + '">Remove</button></div>' +
      '<div class="bar"><div class="fill" style="width:' + Math.min(done, 100) + '%"></div></div>' +
      '<p class="muted">' + money(g.saved) + " of " + money(g.target) + " (" + Math.min(done, 100).toFixed(0) + "%)" +
      (complete ? " · Goal reached!" : "") + "</p>" +
      '<div class="goal-add"><input type="number" placeholder="Amount to save" aria-label="Amount to save toward ' + esc(g.name) +
      '"><button data-save="' + g.id + '">Add savings</button></div></div>';
  }

  $("g-list").innerHTML = html || '<div class="card muted">No savings goals yet. Create your first goal above.</div>';
}

function renderAll() {
  renderDashboard();
  renderExpenses();
  renderSavings();
}

// ===== ACTIONS =====
function addExpense() {
  const name = $("e-name").value.trim();
  const amount = Number($("e-amount").value);
  let date = $("e-date").value;

  if (name === "") return showMsg("e-msg", "Enter an expense name.", "error");
  if ($("e-amount").value === "" || amount <= 0) return showMsg("e-msg", "Enter an amount greater than 0.", "error");
  if (date === "") date = new Date().toISOString().split("T")[0];

  state.expenses.push({ id: newId(), name, amount, category: $("e-category").value, date });
  saveData();

  $("e-name").value = "";
  $("e-amount").value = "";
  $("e-date").value = "";
  renderAll();
  showMsg("e-msg", "Expense added.", "success");
}

function addGoal() {
  const name = $("g-name").value.trim();
  const target = Number($("g-target").value);

  if (name === "") return showMsg("g-msg", "Enter a goal name.", "error");
  if ($("g-target").value === "" || target <= 0) return showMsg("g-msg", "Enter a target greater than 0.", "error");

  state.goals.push({ id: newId(), name, target, saved: 0 });
  saveData();

  $("g-name").value = "";
  $("g-target").value = "";
  renderAll();
  showMsg("g-msg", "Goal created.", "success");
}

function saveBudget() {
  const value = Number($("b-input").value);
  if ($("b-input").value === "" || value <= 0) return showMsg("b-msg", "Enter a budget greater than 0.", "error");

  state.budget = value;
  saveData();
  renderAll();
  showMsg("b-msg", "Budget saved.", "success");
}

function showPage(page) {
  for (const section of document.querySelectorAll(".page")) {
    section.classList.toggle("active", section.id === page);
  }
  for (const btn of document.querySelectorAll(".nav-btn")) {
    btn.classList.toggle("active", btn.dataset.page === page);
  }
}

// ===== EVENT LISTENERS =====
for (const btn of document.querySelectorAll(".nav-btn")) {
  btn.addEventListener("click", () => showPage(btn.dataset.page));
}

$("e-add").addEventListener("click", addExpense);
$("g-add").addEventListener("click", addGoal);
$("b-save").addEventListener("click", saveBudget);
$("e-filter").addEventListener("change", renderExpenses);

// Delete an expense (one listener handles every Delete button)
$("e-body").addEventListener("click", (event) => {
  const id = event.target.dataset.delete;
  if (!id) return;
  state.expenses = state.expenses.filter((e) => e.id !== Number(id));
  saveData();
  renderAll();
});

// Add savings to, or remove, a goal
$("g-list").addEventListener("click", (event) => {
  const saveId = event.target.dataset.save;
  const removeId = event.target.dataset.remove;

  if (removeId) {
    state.goals = state.goals.filter((g) => g.id !== Number(removeId));
  } else if (saveId) {
    const input = event.target.parentElement.querySelector("input");
    const amount = Number(input.value);
    if (input.value === "" || amount <= 0) return;
    const goal = state.goals.find((g) => g.id === Number(saveId));
    goal.saved += amount;
  } else {
    return;
  }

  saveData();
  renderAll();
});

// ===== START =====
fillCategoryOptions();
$("b-input").value = state.budget;
renderAll();