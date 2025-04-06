const Expense = require("../models/Expenses");
require("dotenv").config();
// GET all expenses from the database
const getExpenses = async (request, response) => {
  try {
    const expenses = await Expense.find(); // Fetch all expense documents
    if (expenses) {
      // If any expenses found, return them with status 200
      response.status(200).json({ expenses });
    } else {
      response.status(404).json({ message: "No expenses found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Error fetching expenses" });
  }
};

// GET a single expense by ID
const getOneExpenses = async (request, response) => {
  const id = request.params.id; //get the ID from route parameters
  try {
    const expense = await Expense.findById(id);
    if (expense) {
      response.status(200).json({
        expense: expense,
      });
    } else {
      response.status(404).json({
        message: "No expenses found",
      });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: "Error fetching expenses",
    });
  }
};
// POST a new expense to the database
const postExpense = async (request, response) => {
  const expense = request.body; // get the expense info from the request body
  try {
    const newExpense = await Expense.create(expense);
    response.status(200).json({ msg: " expense successfully added" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "Error adding expense" });
  }
};
//update an existing expense
const putExpense = async (request, response) => {
  const id = request.params.id; // get the id of the req parameters
  const expense = request.body; //get the new expense info from the req body
  try {
    await Expense.findByIdAndUpdate(id, expense); // find target document and update it
    response.status(200).json({
      message: "Expense updated successfully",
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: "Error updating expense",
    });
  }
};
//delete the given expense from the databse
const deleteExpense = async (request, response) => {
  const id = request.params.id;
  try {
    await Expense.findByIdAndDelete(id);
    response.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: "Error deleting expense",
    });
  }
};

module.exports = {
  getExpenses,
  getOneExpenses,
  postExpense,
  putExpense,
  deleteExpense,
};
