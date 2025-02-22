import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Dimg from "../assets/BackgroundCard1.png";

import Pimg from "../assets/bgsc.png";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { FaUsers, FaListCheck, FaUserPlus } from "react-icons/fa6";
import "../App.css";
import { useLocation, useNavigate } from "react-router-dom";
export default function OneBoard() {
  const location = useLocation();
  const [collaborators, setCollaborators] = useState([]);
  const navigate = useNavigate();
  const [task, setTask] = useState({ task: " " });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setTask({ [e.target.id]: e.target.value });
  };
  const { board } = location.state || {};
  const [tasks, setasks] = useState(board.tasks);

  useEffect(() => {
    const urlu = `http://localhost:6005/api/boardusers/${board._id}`;
    const urlt = `http://localhost:6005/api/boardtasks/${board._id}`;

    axios
      .get(urlu)
      .then((res) => {
        setCollaborators(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(urlt)
      .then((res) => {
        setasks(res.data);
        console.log(tasks);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [board._id]);

  const addTask = () => {
    const url = `http://localhost:6005/api/addTask/${board._id}`;
    axios
      .patch(url, task)
      .then((response) => {
        setasks([...tasks, task.task]);
        console.log(response.data);
        alert(response.data.msg);
        handleClose();
      })
      .catch((error) => {
        alert(error.response.data.msg);
        console.error("Error on adding Board");
      });
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
                {board.title}
              </Card.Title>
              <Card.Text style={{ color: "#9D5AFF" }}>
                {" "}
                Manage your shared Tasks
              </Card.Text>
            </div>
          </div>
          <Button
            variant="primary"
            className="profbtn1"
            onClick={() => navigate("/TaskBoard", { state: { board } })}
          >
            Back
          </Button>
        </Card>

        <Card
          style={{
            marginTop: "50px",
            paddingTop: "50px",
            paddingBottom: "50px",

            width: "95%",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "rgb(2, 8, 41)",
            backgroundImage:
              "linear-gradient(to right,rgb(2, 8, 41),#17183B,rgba(72, 92, 245, 0.4))",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "40px",
              alignItems: "start",
              width: "70%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "60px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "600px",
                  gap: "30px",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: `url('${Pimg}')`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "10px",
                  }}
                >
                  <FaListCheck size={25} color="white" />
                </div>
                <Card.Text
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "white",
                    marginRight: "240px",
                    letterSpacing: "2px",
                    marginBottom: "3px",
                  }}
                >
                  List Of Tasks
                </Card.Text>
                <Button className="btn2" onClick={handleShow}>
                  Add Task
                </Button>
              </div>

              <div
                style={{
                  marginTop: "50px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {tasks.map((task) => (
                  <Card.Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "200",
                      color: "rgb(178, 128, 252)",
                      marginTop: "0px",
                      letterSpacing: "2px",
                    }}
                  >
                    -{task}
                  </Card.Text>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              width: "1px",
              height: "60vh",
              background:
                "linear-gradient(to bottom, transparent, #aaa, transparent)",
            }}
          ></div>
          <div
            style={{
              width: "50%",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "40px",
                alignItems: "center",
                width: "40%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "60px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "30px",
                  }}
                >
                  {" "}
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundImage: `url('${Pimg}')`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "10px",
                    }}
                  >
                    <FaUsers size={25} color="white" />
                  </div>
                  <Card.Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "white",
                      letterSpacing: "2px",
                      marginBottom: "3px",
                    }}
                  >
                    Collaborators
                  </Card.Text>
                </div>

                <div
                  style={{
                    marginTop: "50px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  {collaborators.map((person) => (
                    <Card.Text
                      style={{
                        fontSize: "20px",
                        fontWeight: "200",
                        color: "rgb(178, 128, 252)",
                        marginTop: "0px",
                        letterSpacing: "2px",
                      }}
                    >
                      -{person}
                    </Card.Text>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className={`invitemodall ${show ? "show" : ""}`}>
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
        <h2 style={{ marginTop: "35px", color: "white" }}>Add a new Task</h2>
        <h4
          style={{
            marginBottom: "30px",
            color: "rgb(178, 128, 252)",
            fontSize: "20px",
          }}
        >
          This task will be visible to all of this boards collaborators
        </h4>
        <div className="modalContent">
          <Form>
            <Form.Group
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
                Task
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="enter a task to add to the board"
                onChange={handleChange}
                id="task"
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
              <Button className="btn1" onClick={addTask}>
                Add
              </Button>
              <Button className="btn2" onClick={handleClose}>
                Back
              </Button>
            </div>
          </Form>
        </div>
      </div>{" "}
    </>
  );
}
