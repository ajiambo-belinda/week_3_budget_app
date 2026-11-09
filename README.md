# My Budget Tracker

## Overview

My Budget Tracker is a simple web application that helps users track their expenses in one place. The application allows users to enter expense details, categorize spending, and view expenses in a structured table. The project focuses on building strong HTML, CSS, and JavaScript fundamentals while creating a clean and user-friendly interface.

## Features

* Add expense form with:

  * Expense name
  * Amount
  * Category selection
  * Date selection
* Expense table displaying:

  * Expense name
  * Amount
  * Category
  * Date
* Budgeting tips video section
* Instructions section explaining how to use the tracker
* Responsive design for desktop, tablet, and phone screens
* Professional styling using CSS
* Custom typography with Google Fonts
* Card-based layout using the CSS Box Model
* JavaScript budget logic:

  * Collects the monthly budget and expense details using input prompts
  * Calculates the remaining balance
  * Calculates the percentage of the budget spent
  * Shows a budget status message
  * Displays clearly labeled results in the browser console

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Google Fonts

## Project Structure

```text
budget-tracker/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Color Palette

The application uses a clean and professional color palette:

* Dark Green: #166534
* Darker Green (hover): #14532d
* Light Blue: #dbeafe
* White: #ffffff
* Light Gray: #f5f7fb

## CSS Features Implemented

* Custom Google Fonts
* Styled forms and buttons
* Styled expense table
* Alternating table row colors
* Hover effects
* Responsive video section using `aspect-ratio`
* Media queries for tablet and phone screens
* Scrollable table on small screens
* Borders, margins, and padding
* Rounded corners
* Card-style containers

## JavaScript Features Implemented

* Variables for budget and expense data
* User input using `prompt()`
* Conversion of input to numbers using `Number()`
* Reusable functions:

  * `calculateRemainingBalance()`
  * `calculatePercentageSpent()`
  * `getBudgetStatus()`
* Output displayed in the browser console

## How to Run the Project

1. Download or clone the project files.
2. Open the project folder.
3. Open `index.html` in your web browser.
4. Enter your budget and expense details in the prompts that appear.
5. Press **F12** and open the **Console** tab to view the budget summary.

No additional installation is required.

## Future Improvements

* Connect the Add Expense form to JavaScript so expenses appear in the table.
* Calculate total expenses automatically.
* Add income tracking.
* Store data using local storage or a database.
* Generate expense reports and charts.

## Author

Belinda Ajiambo

## License

This project was created for learning purposes as part of a web development assignment.