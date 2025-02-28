import React, { useState } from "react";
import img from "../assets/Screenshot 2025-02-26 190407.png";
import "../App.css";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

export default function LandingPage() {
  const [hover, setHover] = useState(false);

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
          border: "1px solid red",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "50px",
            alignItems: "start",
            marginRight: "40px",
            paddingTop: "20px",
          }}
        >
          <Link
            style={{
              display: "flex",
              alignItems: "start",
              textDecoration: "none",
            }}
          >
            <Button
              className="btn2"
              style={{
                marginTop: "0px",
                width: "120px",
                letterSpacing: "1px",
              }}
            >
              Sign Up
            </Button>
          </Link>
          <Link
            style={{
              display: "flex",
              alignItems: "start",
              textDecoration: "none",
            }}
          >
            <Button
              className="btn1"
              style={{ width: "95px", letterSpacing: "1px", marginTop: "0px" }}
            >
              Log In
            </Button>
          </Link>
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "75%",
          border: "1px solid white",
        }}
      >
        <Card
          style={{
            width: "60%",
            display: "flex",
            alignItems: "center",
            gap: "40px",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid white",
            backgroundColor: "transparent",
          }}
        >
          <Card.Text
            style={{ fontSize: "70px", fontWeight: "bold", color: "#aaa" }}
          >
            Welcome to Task Manager
          </Card.Text>
          <Card.Text
            style={{
              fontSize: "30px",
              color: "rgb(157, 144, 178)",
              fontFamily: "Candara",
              letterSpacing: "3px",
            }}
          >
            Organize every aspect of your life,
            <br></br>
            Become your best version
          </Card.Text>
          <div>
            <Button
              style={{
                color: "black",
                backgroundColor: "rgb(165, 155, 171)",
                borderRadius: "20px",
                textDecoration: "none",
                border: "none",
                padding: "10px 25px",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                gap: hover ? "20px" : "10px",
              }}
              onMouseEnter={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
            >
              Get Started
              <FaArrowRight style={{ marginTop: "5px" }} />
            </Button>
          </div>
        </Card>
        <div style={{ border: "1px solid white" }}>Welcome to Task Manager</div>
      </div>
    </div>
  );
}
