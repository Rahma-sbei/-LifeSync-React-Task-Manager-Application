import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import { FaUserTie } from "react-icons/fa6";
import Dimg from "./cardimgfree22.png";
import Pimg from "./bgsc.png";
import { jwtDecode } from "jwt-decode";
import imgg from "./bgProfile.png";

export default function Admin() {
  const url = "http://localhost:6005/api/users";
  const [users, setUsers] = useState([]);
  const [currentUser, setcurrentUser] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setUsers(res.data.users);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const handleDelete = (userId) => {
    if (window.confirm("are you sure you want to delete this user")) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      axios
        .delete(`${url}/${userId}`, { headers })
        .then((res) => {
          setUsers(users.filter((user) => user._id !== userId));
        })
        .catch((error) => {
          console.error(error.response.data.msg);
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: "80%",
          marginTop: "60px",
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
            <FaUserTie size={40} color="white" />
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
              Welcome ,{currentUser.userName}
            </Card.Title>
            <Card.Text style={{ color: "#9D5AFF", marginLeft: "3px" }}>
              View and manage all users in the admin Dashboard
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
        ></div>
      </Card>
      <div
        style={{
          width: "87%",
          margin: "auto",
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "50px",
        }}
      >
        {users.map((user) => (
          <Accordion>
            <Accordion.Item
              eventKey="0"
              style={{
                borderRadius: "20px",
                border: "2px outset #a0a0a0",
                backgroundImage: `url('${imgg}')`,
                backgroundSize: "cover",
              }}
            >
              <Accordion.Header
                style={{
                  borderRadius: "20px",
                  fontWeight: "bold",
                  padding: "10px 10px",
                  borderBottom: "1px solid #e3e3e3",
                  backgroundImage: `url('${imgg}')`,
                  backgroundSize: "cover",
                  cursor: "pointer",
                }}
              >
                {user.userName.toUpperCase()}
              </Accordion.Header>
              <Accordion.Body
                style={{
                  borderRadius: "20px",
                  padding: "15px",
                  fontsize: "16px",
                  lineHeight: "1.5",
                  color: "#333",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h5
                    style={{
                      marginBottom: "10px",
                      color: "white",
                      fontWeight: "bold",
                      letterSpacing: "2px",
                      marginLeft: "20px",
                    }}
                  >
                    Email: {user.email}
                  </h5>
                  <h5
                    style={{
                      marginBottom: "10px",
                      color: "white",
                      fontWeight: "bold",
                      letterSpacing: "2px",
                      marginLeft: "20px",
                    }}
                  >
                    Role: {user.role}
                  </h5>
                </div>
                <div>
                  <Button
                    style={{
                      width: "90px",
                      marginRight: "50px",
                      marginTop: "10px",
                      backgroundColor: "#09b392",
                      border: "none",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                    variant="danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
