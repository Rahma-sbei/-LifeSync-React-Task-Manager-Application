import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dimg from "../../assets/bgsc.png";
import Dimg2 from "../../assets/BackgroundCard1.png";
import { Card, Button } from "react-bootstrap";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ExpenseForm from "./ExpensesForm";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState({
    person: "",
    date: "",
    category: "",
    status: "",
  });

  const url = "http://localhost:6005/api/expenses";
  const getExpenses = () => {
    const token = localStorage.getItem("token");
    let id;
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        id = decodedToken.id;
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
    console.log(id);
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.expenses);
        console.log("user id ", id);

        const myExpenses = res.data.expenses.filter((exp) => exp.userId === id);
        setExpenses(myExpenses);
        console.log("my expenses", expenses);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const addExpense = (expense) => {
    const token = localStorage.getItem("token");
    let id;
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        id = decodedToken.id;
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
    console.log(id);
    const fullExpense = { ...expense, userId: id };
    console.log("in adding function", fullExpense);

    axios
      .post(url, fullExpense)
      .then((response) => {
        console.log(response.data);
        alert(response.data.msg);
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
        console.error("Error on adding task");
      });
  };

  const editExpense = (id, updatedExpense) => {
    console.log("Button clicked", updatedExpense);
    axios
      .put(`${url}/${id}`, updatedExpense)
      .then((response) => {
        console.log(response.data);
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense._id === id ? { ...expense, ...updatedExpense } : expense
          )
        );
      })
      .catch((error) => {
        alert(error);
        console.error("Error on adding task");
      });
  };

  const deleteExpense = (id) => {
    axios
      .delete(`http://localhost:8008/api/expenses/${id}`)
      .then((res) => {
        setExpenses(expenses.filter((expense) => expense._id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const calculateTotal = () => {
    return expenses.reduce((total, expense) => {
      const amount = parseFloat(expense.amount);
      if (isNaN(amount)) {
        console.warn("Invalid amount for expense:", expense); // Log invalid data
        return total; // Skip this expense
      }
      return total + amount;
    }, 0);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredExpenses = expenses.filter((expense) => {
    const isPersonMatch =
      filter.person === "" || expense.personResponsible === filter.person;
    const isDateMatch = filter.date === "" || expense.date === filter.date;
    const isCategoryMatch =
      filter.category === "" || expense.category === filter.category;
    const isStatusMatch =
      filter.status === "" ||
      (filter.status === "Paid" ? expense.status : !expense.status);

    return isPersonMatch && isDateMatch && isCategoryMatch && isStatusMatch;
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "50px",
        alignItems: "center",
        gap: "40px",
      }}
    >
      <Card
        style={{
          width: "80%",

          backgroundImage: `url('${Dimg2}')`,
          backgroundSize: "cover",
          borderRadius: "20px",
          color: "white",
          fontWeight: "bold",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          border: "none",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "90px",
              height: "90px",
              display: "flex",
              marginLeft: "50px",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage: `url('${Dimg}')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              borderRadius: "20px",
            }}
          >
            <FaMoneyCheckDollar size={40} color="white" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "30px",
              gap: "10px",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <Card.Title
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                letterSpacing: "3px",
              }}
            >
              My Expense Manager
            </Card.Title>
            <Card.Text style={{ color: "#9D5AFF" }}>
              Manage and keep track of all your expenses here
            </Card.Text>
          </div>
        </div>
      </Card>
      <div
        style={{
          padding: "30px",
          marginTop: "30px",
          minHeight: "200px",
          width: "95%",
          borderRadius: "20px",
          border: "none",
          backgroundColor: "#17183B",
          backgroundImage:
            "linear-gradient(to right, #080D2A,#17183B,rgba(72, 92, 245, 0.4))",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <h2
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            color: " rgb(202, 183, 219)",
            letterSpacing: "3px",
            marginLeft: "40px",
            marginTop: "20px",
          }}
        >
          Total Expenses: ${calculateTotal()}
        </h2>

        <ExpenseForm addExpense={addExpense} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: "30px",
            gap: "40px",
          }}
        >
          <input
            type="date"
            name="date"
            placeholder="Filter by date"
            value={filter.date}
            onChange={handleFilterChange}
            style={{
              borderRadius: "20px",
              backgroundColor: "#2b1c43a7",
              border: " 2px outset #a0a0a0",
              padding: "10px 20px",
              color: "#aaa",
              fontSize: "15px",
              fontWeight: "600",
              letterSpacing: "1px",
            }}
          />

          <select
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
            style={{
              borderRadius: "20px",
              backgroundColor: "#2b1c43a7",
              border: " 2px outset #a0a0a0",
              padding: "10px 20px",
              color: "#aaa",
              fontSize: "15px",
              fontWeight: "600",
              letterSpacing: "1px",
            }}
          >
            <option value="">Filter By Status</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>

        <table
          className="table table-bordered table-striped mt-3"
          style={{ border: "1px solid #2b1c43a7", borderRadius: "20px" }}
        >
          <thead className="thead-light">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.date}</td>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
                <td>{expense.status ? "Paid" : "Unpaid"}</td>
                <td>
                  <Button
                    className="btn btn-warning btn-sm mr-2"
                    onClick={() =>
                      editExpense(expense._id, {
                        ...expense,
                        status: !expense.status,
                      })
                    }
                  >
                    Toggle Status
                  </Button>
                  <button
                    className="btn btn-danger btn-sm ml-8"
                    onClick={() => deleteExpense(expense._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses;
