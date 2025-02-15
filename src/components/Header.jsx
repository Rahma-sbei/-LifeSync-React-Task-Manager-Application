import React from "react";
import { Card } from "react-bootstrap";
import { FaListCheck } from "react-icons/fa6";
import Dimg from "../assets/bgsc.png";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Link } from "react-router-dom";

export default function Header({ currentDate }) {
  return (
    <Card
      style={{
        width: "80%",
        backgroundImage: "linear-gradient(to right, #080D2A,#17183B)",
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
          <FaListCheck size={40} color="white" />
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
            My Tasks Manager
          </Card.Title>
          <Card.Text style={{ color: "#9D5AFF" }}>{currentDate}</Card.Text>
        </div>
      </div>
      <div
        style={{
          marginRight: "30px",
          display: "flex",
          height: "40px",
          gap: "30px",
          fontWeight: "bold",
        }}
      >
        <Link to="/TaskBoard">
          <Button variant="primary" className="taskbtn1">
            Create Task Board
          </Button>
        </Link>
        <Link to="/AllBoards">
          <Button variant="outline-light" className="taskbtn2">
            View My Boards
          </Button>
        </Link>
      </div>
    </Card>
  );
}
