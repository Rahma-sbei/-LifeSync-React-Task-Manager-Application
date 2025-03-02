import React, { useState } from "react";

const ExpenseForm = ({ addExpense }) => {
  const [expense, setExpense] = useState({
    date: "",
    description: "",
    amount: "",
    status: false,
  });

  const [errors, setErrors] = useState({ amount: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });

    if (name === "amount") {
      if (value <= 0) {
        setErrors({ ...errors, amount: "Amount must be a positive number" });
      } else {
        setErrors({ ...errors, amount: "" });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(expense.amount);

    console.log("Expense state before submitting:", expense);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrors({ ...errors, amount: "Amount must be a positive number" });
      return;
    }

    addExpense({
      ...expense,
      amount: parsedAmount,
    });

    setExpense({
      date: "",
      description: "",
      amount: "",
      status: false,
    });
  };

  return (
    <form className="expenseForm" onSubmit={handleSubmit}>
      <input
        type="date"
        name="date"
        className="form-control"
        value={expense.date}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="description"
        className="form-control"
        placeholder="Description"
        value={expense.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="amount"
        className="form-control"
        placeholder="Amount"
        value={expense.amount}
        onChange={handleChange}
        required
      />
      {errors.amount && <small className="text-danger">{errors.amount}</small>}

      <button type="submit" className="btn2">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
