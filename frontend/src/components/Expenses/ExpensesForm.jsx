import React, { useState } from "react";
// ExpenseForm component handles expense data input and submission

export default function ExpenseForm({ addExpense }) {
  // State to store expense details (date, description, amount, status)
  const [expense, setExpense] = useState({
    date: "",
    description: "",
    amount: "",
    status: false,
  });

  // State to track validation errors for amount field
  const [errors, setErrors] = useState({ amount: "" });

  // Handle input field changes and update expense state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });

    // Validate 'amount' field and set appropriate error message
    if (name === "amount") {
      if (value <= 0) {
        setErrors({ ...errors, amount: "Amount must be a positive number" });
      } else {
        setErrors({ ...errors, amount: "" });
      }
    }
  };

  // Handle form submission to add an expense
  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(expense.amount); // Parse amount as float for validation

    console.log("Expense state before submitting:", expense);

    // If parsed amount is invalid or non-positive, set error message and stop submission
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrors({ ...errors, amount: "Amount must be a positive number" });
      return;
    }

    // Add expense by passing expense data to the addExpense function
    addExpense({
      ...expense,
      amount: parsedAmount, // Ensure amount is stored as a number
    });

    // Reset form fields after successful submission
    setExpense({
      date: "",
      description: "",
      amount: "",
      status: false,
    });
  };

  return (
    <form className="expenseForm" onSubmit={handleSubmit}>
      {/* Date input field for selecting expense date */}
      <input
        type="date"
        name="date"
        className="form-control"
        value={expense.date}
        onChange={handleChange}
        required
      />

      {/* Description input field for entering expense description */}
      <input
        type="text"
        name="description"
        className="form-control"
        placeholder="Description"
        value={expense.description}
        onChange={handleChange}
        required
      />

      {/* Amount input field for entering the expense amount */}
      <input
        type="number"
        name="amount"
        className="form-control"
        placeholder="Amount"
        value={expense.amount}
        onChange={handleChange}
        required
      />
      {/* Display error message if amount validation fails */}
      {errors.amount && <small className="text-danger">{errors.amount}</small>}

      {/* Submit button to add the expense */}
      <button type="submit" className="btn2">
        Add Expense
      </button>
    </form>
  );
}
