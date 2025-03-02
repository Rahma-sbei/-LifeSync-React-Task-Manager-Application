const Expense = require("../models/Expenses");
require("dotenv").config();
const getExpenses = async (request, response) => {
  try {
    const expenses = await Expense.find();
    if (expenses) {
      response.status(200).json({
        expenses: expenses,
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

const getOneExpenses = async (request, response) => {
  const id = request.params.id;
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
const postExpense = async (request, response) => {
  const expense = request.body;
  try {
    const newExpense = await Expense.create(expense);
    response.status(200).json({ msg: " expense successfully added" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "Error adding expense" });
  }
};

const putExpense = async (request, response) => {
  const id = request.params.id;
  const expense = request.body;
  try {
    await Expense.findByIdAndUpdate(id, expense);
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
