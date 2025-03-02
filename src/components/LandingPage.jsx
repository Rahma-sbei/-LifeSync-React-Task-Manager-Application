import React, { useState, useEffect } from "react";
import img from "../assets/Screenshot 2025-02-26 190407.png";
import "../App.css";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import {
  FaListCheck,
  FaClipboardCheck,
  FaMoneyBillTrendUp,
} from "react-icons/fa6";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [hover, setHover] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  const features = [
    {
      id: 1,
      title: "Task Manager",
      description: "Organize Your Tasks ",
      icon: <FaListCheck size={50} color="#9F42E5" />,
    },
    {
      id: 2,
      title: "Collaboration Boards",
      description: "Collaborate with friends",
      icon: <FaClipboardCheck size={50} color="#9F42E5" />,
    },
    {
      id: 3,
      title: "Budget Manager",
      description: "Manage Your Spending",
      icon: <FaMoneyBillTrendUp size={50} color="#9F42E5" />,
    },
  ];

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
          justifyContent: "space-between",
        }}
      >
        <Card.Text
          style={{
            fontSize: "20px",
            fontWeight: "200",
            color: "#09b392",
            marginTop: "30px",
            fontFamily: "Candara",
            letterSpacing: "2px",
            marginLeft: "250px",
          }}
        >
          LifeSync
        </Card.Text>
        <div
          style={{
            display: "flex",
            gap: "50px",
            alignItems: "start",
            marginRight: "50px",
            paddingTop: "30px",
          }}
        >
          <Link
            to="/signUp"
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
            to="/signIn"
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
          alignItems: "center",
          width: "80%",
          gap: "100px",
          // border: "1px solid white",
        }}
      >
        <Card
          style={{
            width: "55%",
            display: "flex",
            alignItems: "center",
            gap: "40px",
            paddingTop: "40px",
            backgroundColor: "transparent",
            border: "none",
            // border: "1px solid white",
          }}
        >
          <Card.Text
            style={{ fontSize: "70px", fontWeight: "bold", color: "#aaa" }}
          >
            Welcome to LifeSync
          </Card.Text>
          <Card.Text
            style={{
              fontSize: "30px",
              color: "rgb(157, 144, 178)",
              fontFamily: "Candara",
              letterSpacing: "3px",
              // border: "1px solid white",
              width: "100%",
            }}
          >
            Organize every aspect of your life
            <br></br>
            Become your best version
          </Card.Text>
          <div>
            <Link to="/signUp" style={{ textDecoration: "none " }}>
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
                  boxShadow: "0 0 20px 10px rgba(165, 155, 171, 0.72)",
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
            </Link>
          </div>
        </Card>
        <div
          style={{
            // border: "1px solid white",
            overflow: "hidden",
            width: "45%",
            height: "65vh",
            display: "flex",
            justifyContent: "end",
            paddingRight: "30px",
            alignItems: "center",
            position: "relative",
            borderRadius: "20px",
          }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ y: "100%", opacity: 0 }}
              animate={
                i === index
                  ? { y: ["100%", "0%", "-100%"], opacity: [0, 1, 0] }
                  : { opacity: 0 }
              }
              transition={{
                duration: 4,
                ease: "easeInOut",
              }}
              style={{
                width: "80%",
                height: "30vh",
                backgroundColor: "rgba(204, 170, 230, 0.54)",
                borderRadius: "20px",
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "83%",
                  height: "20vh",
                  backgroundColor: "rgba(230, 227, 233, 0.27)",
                  borderRadius: "20px",
                  boxShadow: "0 0 20px 10px rgba(230, 227, 233, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                {feature.icon}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "30px",
                      color: "white",
                      fontFamily: "Candara",
                      letterSpacing: "3px",
                      fontWeight: "bold",
                    }}
                  >
                    {feature.title}
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      color: "rgb(122, 91, 172)",
                      fontFamily: "Candara",
                      letterSpacing: "1px",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
