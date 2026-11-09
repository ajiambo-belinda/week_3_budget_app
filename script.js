// ===== 1. Confirm the script loaded =====
console.log("SpendWise script loaded successfully!");

// ===== 2. Store application data =====
let monthlyBudget = 0;
let expenseName = "";
let expenseCategory = "";
let expenseAmount = 0;
let remainingBalance = 0;

// ===== 3. Collect user input =====
monthlyBudget = Number(prompt("Enter your monthly budget (KSh):"));
expenseName = prompt("Enter the name of your expense (e.g. House Rent):");
expenseCategory = prompt("Enter the expense category (e.g. Rent, Transport):");
expenseAmount = Number(prompt("Enter the expense amount (KSh):"));

// ===== 5. Reusable functions =====
function calculateRemainingBalance(budget, expense) {
  return budget - expense;
}

function calculatePercentageSpent(budget, expense) {
  return (expense / budget) * 100;
}

function getBudgetStatus(balance) {
  if (balance < 0) {
    return "Over budget!";
  } else if (balance === 0) {
    return "You have used your whole budget.";
  } else {
    return "You are within your budget.";
  }
}

// ===== 4. Perform calculations =====
remainingBalance = calculateRemainingBalance(monthlyBudget, expenseAmount);
let percentageSpent = calculatePercentageSpent(monthlyBudget, expenseAmount);
let status = getBudgetStatus(remainingBalance);

// ===== 6. Display results in the console =====
console.log("===== SpendWise Budget Summary =====");
console.log("Monthly Budget: KSh " + monthlyBudget);
console.log("Expense Name: " + expenseName);
console.log("Expense Category: " + expenseCategory);
console.log("Expense Amount: KSh " + expenseAmount);
console.log("Remaining Balance: KSh " + remainingBalance);
console.log("Percentage of Budget Spent: " + percentageSpent.toFixed(1) + "%");
console.log("Status: " + status);