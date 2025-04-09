import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Dimg from "../assets/cardimgfree22.png";
import Dimg2 from "../assets/BackgroundCard1.png";
import Divider from "./Divider";
import Pimg from "../assets/bgsc.png";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { FaUser, FaAt, FaKey, FaUserLock } from "react-icons/fa6";
import "../App.css";

export default function MyProfile() {
  const [currentUser, setcurrentUser] = useState({});
  const [userId, setUserId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userUpdate, setUpdate] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUpdate({ ...userUpdate, [e.target.id]: e.target.value });
  };
  const url = "http://localhost:6005/api/users";

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("this is the decode token", decodedToken);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
    if (userId) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${url}/${userId}`, { headers })
        .then((res) => {
          setcurrentUser(res.data.user);
          console.log("this is the username", currentUser.userName);
        })
        .catch((error) => {
          console.error(error.response.data.msg);
        });
    }
  }, [userId]);

  const handleUpdate = async (e) => {
    console.log(userUpdate);
    try {
      if (
        userUpdate.userName !== "" ||
        userUpdate.email !== "" ||
        userUpdate.password !== ""
      ) {
        await axios.put(`${url}/${currentUser._id}`, userUpdate);
        alert("Profile updated successfully");
        handleClose();
        window.location.reload();
      } else {
        alert("Fill all fields to proceed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        style={{
          marginTop: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            width: "80%",
            minHeight: "30vh",
            backgroundImage: `url('${Dimg}')`,
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
                marginLeft: "60px",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url('${Pimg}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                borderRadius: "20px",
              }}
            >
              <FaUser size={40} color="white" />
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
                Welcome Back, {currentUser.userName}
              </Card.Title>
              <Card.Text style={{ color: "#9D5AFF" }}>
                {currentUser.email}
              </Card.Text>
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
            <Button variant="primary" className="profbtn1" onClick={handleShow}>
              Edit Profile
            </Button>
          </div>
        </Card>

        <div
          style={{
            display: "flex",
            width: "100%",
            margin: "35px",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          <Card
            style={{
              minHeight: "40vh",
              width: "45%",
              borderRadius: "20px",
              border: "none",
              backgroundColor: "rgb(2, 8, 41)",
              backgroundImage:
                "linear-gradient(to right,rgb(2, 8, 41),#17183B,rgba(72, 92, 245, 0.4))",
              backgroundSize: "cover",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "40px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  marginLeft: "60px",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundImage: `url('${Pimg}')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "10px",
                }}
              >
                <FaUser size={25} color="white" />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Card.Text
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "white",
                    letterSpacing: "2px",
                    marginBottom: "3px",
                  }}
                >
                  Username
                </Card.Text>
                <Card.Text
                  style={{
                    fontSize: "15px",
                    fontWeight: "00",
                    color: "rgb(178, 128, 252)",
                    marginTop: "0px",
                    letterSpacing: "2px",
                  }}
                >
                  {currentUser.userName}
                </Card.Text>
              </div>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                gap: "40px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  marginLeft: "60px",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundImage: `url('${Pimg}')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "10px",
                }}
              >
                <FaAt size={25} color="white" />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Card.Text
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "white",
                    letterSpacing: "2px",
                    marginBottom: "3px",
                  }}
                >
                  Email
                </Card.Text>
                <Card.Text
                  style={{
                    fontSize: "15px",
                    fontWeight: "00",
                    color: "rgb(178, 128, 252)",
                    marginTop: "0px",
                    letterSpacing: "2px",
                  }}
                >
                  {currentUser.email}
                </Card.Text>
              </div>
            </div>
          </Card>
          <Card
            style={{
              minHeight: "40vh",
              width: "45%",
              borderRadius: "20px",
              backgroundImage: `url('${Dimg2}')`,
              backgroundSize: "cover",
              backgroundColor: "rgb(2, 8, 41)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "20px",
              border: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "40px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  marginLeft: "60px",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundImage: `url('${Pimg}')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "10px",
                }}
              >
                <FaUserLock size={25} color="white" />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Card.Text
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "white",
                    letterSpacing: "2px",
                    marginBottom: "3px",
                  }}
                >
                  Role
                </Card.Text>
                <Card.Text
                  style={{
                    fontSize: "15px",
                    fontWeight: "00",
                    color: "rgb(178, 128, 252)",
                    marginTop: "0px",
                    letterSpacing: "2px",
                  }}
                >
                  {currentUser.role}
                </Card.Text>
              </div>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                gap: "40px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "55px",
                  width: "60%",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    marginLeft: "60px",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: `url('${Pimg}')`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "10px",
                  }}
                >
                  <FaKey size={25} color="white" />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Card.Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "white",
                      letterSpacing: "2px",
                      marginBottom: "3px",
                    }}
                  >
                    Password
                  </Card.Text>

                  <Card.Text
                    style={{
                      fontSize: "15px",
                      fontWeight: "00",
                      color: "rgb(178, 128, 252)",
                      marginTop: "0px",
                      letterSpacing: "2px",
                    }}
                  >
                    {currentUser && currentUser.password
                      ? showPassword
                        ? currentUser.password
                        : "•".repeat(currentUser.password.length)
                      : "Loading..."}
                  </Card.Text>
                </div>
              </div>
              <Button
                variant="outline-light"
                size="sm"
                className={showPassword ? "btn1" : "btn2"}
                style={{
                  marginTop: "5px",
                  alignSelf: "start",
                  padding: "0px",
                  marginLeft: "60px",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <div className={`modall ${show ? "show" : ""}`}>
        <div
          style={{
            position: "absolute",
            zIndex: "-2",
            width: "100%",
            height: "100%",
            backdropFilter: "blur(10px)",
            overflow: "auto",
            padding: "0px ",
          }}
        ></div>
        <h2 style={{ marginTop: "50px" }}>Update profile</h2>
        <h4 style={{ marginBottom: "50px" }}>
          Fill out all the firls to update your profile
        </h4>
        <div className="modalContent">
          <Form>
            <Form.Group
              controlId="formBasicEmail"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                marginBottom: "10px",
              }}
            >
              <Form.Label
                style={{
                  fontWeight: "400",
                  color: "white",
                  letterSpacing: "2px",
                  marginLeft: "20px",
                }}
              >
                Username
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={currentUser.userName}
                onChange={handleChange}
                id="userName"
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicEmail"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                marginBottom: "10px",
              }}
            >
              <Form.Label
                style={{
                  fontWeight: "400",
                  color: "white",
                  letterSpacing: "2px",
                  marginLeft: "20px",
                }}
              >
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder={currentUser.email}
                onChange={handleChange}
                id="email"
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicEmail"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                marginBottom: "10px",
              }}
            >
              <Form.Label
                style={{
                  fontWeight: "400",
                  color: "white",
                  letterSpacing: "2px",
                  marginLeft: "20px",
                }}
              >
                Password
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={currentUser.password}
                onChange={handleChange}
                id="password"
              />
            </Form.Group>
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Button className="btn1" onClick={handleUpdate}>
                Update
              </Button>
              <Button className="btn2" onClick={handleClose}>
                Back
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
