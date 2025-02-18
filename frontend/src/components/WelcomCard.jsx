import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaArrowRight } from "react-icons/fa6";
import { useState, useContext } from "react";
import bgImage from "../assets/pexels-lilartsy-1925537.png";
import { ShowContext } from "../App";

export default function WelcomeCard() {
  const [hover, setHover] = useState(false);
  const { handleShow } = useContext(ShowContext);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "40px",
      }}
    >
      <Card
        style={{
          width: "95%",
          borderRadius: "26px",
          backgroundImage: `linear-gradient(to right, #090D2D , rgba(19,21,53,0.2)),url(${bgImage})`,
          backgroundSize: "cover",
          border: "none",
          height: "35vh",
        }}
      >
        <Card.Body
          style={{
            marginTop: "15px",
            marginLeft: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "start",
          }}
        >
          <Card.Title
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Welcome Back, username
          </Card.Title>
          <div
            style={{
              marginTop: "17px",
              marginLeft: "13px",
              fontWeight: "bold",
            }}
          >
            <Card.Text style={{ color: "#A0A5CC" }}>
              Glad to see you again!
            </Card.Text>
            <Card.Text style={{ color: "#A0A5CC" }}>
              Start your organization journey Now
            </Card.Text>
          </div>
          <Button
            variant="link"
            style={{
              color: "white",
              textDecoration: "none",
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
            onClick={handleShow}
          >
            Check your tools
            <FaArrowRight style={{ marginTop: "5px" }} />
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
