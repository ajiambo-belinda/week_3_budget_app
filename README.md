# SpendWise

## Project Description

SpendWise is a budget tracker that helps users manage their money in one place. It has a sidebar layout with four pages:

* **Dashboard:** shows the budget, total spent, remaining balance, and savings, with a progress bar, a spending breakdown by category, and recent expenses.
* **Expenses:** lets users add, filter, and delete expenses.
* **Savings:** lets users create savings goals and track progress toward each one.
* **Budget:** lets users set their monthly budget.

Data is saved in the browser using localStorage, so it is still there after a page refresh. The layout is responsive for desktop, tablet, and phone screens.

## Technologies Used

* HTML5
* CSS3 (Flexbox, Grid, media queries, Google Fonts)
* JavaScript (arrays, loops, conditionals, DOM manipulation, event listeners, localStorage)
* Git and GitHub
* Netlify

## GitHub Repository Information

* **Repository:** https://github.com/ajiambo-belinda/week_3_budget_app
* **Visibility:** Public
* **Branch:** `main`

## Live Website

**Live URL:** https://wiselyspend.netlify.app

## Deployment Process Summary

1. Created a Git repository in the project folder and committed the project files.
2. Created a public repository on GitHub and pushed the code to the `main` branch.
3. In Netlify, used **Add new site > Import an existing project** and connected the GitHub repository.
4. Left the build command empty, because the project is plain HTML, CSS, and JavaScript, and deployed.
5. Tested the live site: navigation, adding and deleting expenses, savings goals, saved data, and responsiveness on a phone screen.
6. Made an update, committed it, and pushed it to GitHub. Netlify rebuilt and published the change automatically, which confirmed that automatic deployment works.

## Challenges Encountered During Deployment

* **An old `prompt()` popup appeared on the live site.** The deployed site was still using an earlier `script.js` that asked for the monthly budget with `prompt()`. I fixed it by replacing the file with the new version, redeploying, and doing a hard refresh (Ctrl + Shift + R) to clear the cached script.
* **Drag-and-drop deploys do not update automatically.** To get automatic deployments, I connected the site to the GitHub repository instead.

## Lessons Learned

* A deployed site only shows what was actually pushed, so check that the right files are in the repository before deploying.
* Browsers cache files, so a hard refresh is needed to see updates.
* Connecting Netlify to GitHub means every `git push` updates the live site, which makes updating much faster.
* Testing the live site on a phone and on different screen sizes finds problems that testing locally can miss.
* Small, clear commit messages make it easier to see what changed in each deployment.

## Author

Belinda Ajiambo