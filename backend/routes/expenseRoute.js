const express = require("express");
const expenseRoute = express.Router();

//import function from controller

const {
  getExpenses,
  getOneExpenses,
  postExpense,
  putExpense,
  deleteExpense,
} = require("../controllers/expenseController");

//define routes
expenseRoute.get("/expenses", getExpenses);
expenseRoute.get("/expenses/:id", getOneExpenses);
expenseRoute.post("/expenses", postExpense);
expenseRoute.put("/expenses/:id", putExpense);
expenseRoute.delete("/expenses/:id", deleteExpense);

module.exports = expenseRoute;
