import React, { useState } from "react";
import { MDBContainer, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import "../App.css";
import { Button } from "react-bootstrap";
import siImg from "../assets/signInImage.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const url = "http://localhost:6005/api/signIn";
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (user.email === "" || user.password === "") {
      alert("Please fill all the fields to sign in. ");
    } else {
      e.preventDefault();
      axios
        .post(url, user)
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("token", token);
          console.log(response.data);
          console.log(response.data);
          console.log(response.data.role);
          if (response.data.role === "user") {
            navigate("/Home");
          } else {
            navigate("/Admin");
          }
        })
        .catch((error) => {
          alert(error.response.data.msg);
          console.error("There was an error!", error);
        });
    }
  };

  return (
    <MDBContainer
      style={{
        backgroundImage: `url('${siImg}')`,
        backgroundSize: "cover",
        minHeight: "100vh",
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MDBCard
        style={{
          height: "600px",
          width: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(32, 33, 46, 0.59)",
          borderRadius: "20px",
          boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.2)",
          border: "3px solid #787ea3",
          position: "relative",
        }}
      >
        <div
          style={{
            borderRadius: "20px",
            position: "absolute",
            width: "100%",
            height: "100%",
            backdropFilter: "blur(10px)",
            zIndex: "1",
          }}
        ></div>

        <MDBCardBody
          className="px-5"
          style={{
            zIndex: "2",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "50px",
            marginRight: "50px",
            marginTop: "30px",
          }}
        >
          <h2
            style={{
              fontSize: "31px",
              fontWeight: "bold",
              color: "white",
              fontFamily: "monospace",
              marginLeft: "17px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            Sign In to your account
          </h2>
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: "50px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "40px",
            }}
          >
            <MDBInput
              className="signUpInput"
              size="lg"
              placeholder="Enter email"
              id="email"
              onChange={handleChange}
            />
            <MDBInput
              className="signUpInput"
              size="lg"
              type="password"
              placeholder="Enter password"
              id="password"
              onChange={handleChange}
            />
            <Button size="lg" type="submit" className="signbtn">
              SignIn
            </Button>
            <div className="text-center">
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "200",
                  color: "white",
                  letterSpacing: "1.5px",
                }}
              >
                Don't have an account yet?
                <Link
                  to="/signUp"
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#09b392",
                    letterSpacing: "1.5px",
                    marginLeft: "5px",
                  }}
                >
                  Create an account
                </Link>
              </p>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
