import React from "react";
import img from "../assets/Screenshot 2025-02-26 190407.png";
import "../App.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div
      style={{
        backgroundImage: `url('${img}')`,
        backgroundSize: "cover",
        minHeight: "100vh",
        minWidth: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        //justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: "70px",
          fontWeight: "bold",
          color: "#aaa",
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "end",
          border: "1px solid white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
            marginTop: "20px",
            marginRight: "40px",
            border: "1px solid white",
          }}
        >
          <Link>
            <Button
              className="btn2"
              style={{ width: "120px", letterSpacing: "1px" }}
            >
              Sign Up
            </Button>
          </Link>
          <Link>
            <Button
              className="btn1"
              style={{ width: "95px", letterSpacing: "1px" }}
            >
              Log In
            </Button>
          </Link>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "70%",
          border: "1px solid white",
        }}
      >
        <div
          style={{
            fontSize: "70px",
            fontWeight: "bold",
            color: "#aaa",
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid white",
          }}
        >
          Welcome to Task Manager
        </div>
        <div style={{ border: "1px solid white" }}>Welcome to Task Manager</div>
      </div>
    </div>
  );
}
