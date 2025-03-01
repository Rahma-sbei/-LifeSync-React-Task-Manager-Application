const express = require("express");
const expenseRoute = express.Router();
const expenseController = require("../controllers/expenseController");

expenseRoute.get("/expenses", expenseController.getExpenses);
expenseRoute.get("/expenses/:id", expenseController.getOneExpenses);
expenseRoute.post("/expenses", expenseController.postExpense);
expenseRoute.put("/expenses/:id", expenseController.putExpense);
expenseRoute.delete("/expenses/:id", expenseController.deleteExpense);

module.exports = expenseRoute;
