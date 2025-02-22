import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Dimg from "../assets/pixelcut-export.jpg";
import Divider from "./Divider";
import Pimg from "../assets/bgsc.png";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import "../App.css";

export default function TaskBoard() {
  const [collaboratoremail, setcollaboratoremail] = useState({ email: "" });
  const [activeBoardId, setActiveBoardId] = useState(null);
  const handleClose = () => {
    setActiveBoardId(null);
    setcollaboratoremail({ email: "" });
  };
  const handleShow = (boardId) => setActiveBoardId(boardId);
  const [boards, setBoards] = useState([]);
  const [collaboratorNames, setCollaboratorNames] = useState({});
  const [currentUserId, setcurrentUserId] = useState();
  const [newBoard, setnewBoard] = useState({
    title: "",
  });
  const navigate = useNavigate();
  const getCollabratorNames = (boardId) => {
    const url = `http://localhost:6005/api/boardusers/${boardId}`;

    return axios
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
        return [];
      });
  };

  const deleteBoard = (boardId) => {
    const delUrl = `http://localhost:6005/api/boards/${boardId}`;
    console.log(boardId);
    if (window.confirm("are you sure you want to delete this board")) {
      axios
        .delete(delUrl)
        .then(() => {
          setBoards((prevBoards) =>
            prevBoards.filter((board) => board._id !== boardId)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setcurrentUserId(decodedToken.id);
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
    if (currentUserId) {
      axios
        .get("http://localhost:6005/api/boards")
        .then(async (res) => {
          const boards = res.data;
          const myBoards = boards.filter((board) =>
            board.users.includes(currentUserId)
          );
          setBoards(myBoards);

          const names = {};
          for (const board of myBoards) {
            const collaborators = await getCollabratorNames(board._id);
            names[board._id] = collaborators.join(", ");
          }
          setCollaboratorNames(names);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [currentUserId]);

  const handleChange = (e) => {
    setnewBoard({ [e.target.id]: e.target.value });
  };
  const handleCollaborator = (e) => {
    setcollaboratoremail({ [e.target.id]: e.target.value });
    console.log(collaboratoremail);
  };

  const inviteToBoard = (boardId) => {
    const url = `http://localhost:6005/api/invite/${boardId}`;
    axios
      .patch(url, collaboratoremail)
      .then((response) => {
        console.log(response.data);
        alert(response.data.msg);
        console.log(collaboratoremail);
        handleClose();
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data.msg);
        console.error("Error on adding Board");
      });
  };

  const addBoard = () => {
    const sentBoard = {
      ...newBoard,
      users: [currentUserId],
      tasks: [],
    };
    axios
      .post("http://localhost:6005/api/createboards", sentBoard)
      .then((response) => {
        console.log(response.data);
        alert(response.data.msg);
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
              <FaPlus size={40} color="white" />
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
                Create New Task
              </Card.Title>
              <Form.Group
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  marginBottom: "10px",
                }}
              >
                <Form.Control
                  className="createboard"
                  type="text"
                  placeholder="Task Board Title"
                  onChange={handleChange}
                  id="title"
                />
              </Form.Group>
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
            <Button variant="primary" className="profbtn1" onClick={addBoard}>
              Create Board
            </Button>
          </div>
        </Card>

        <Card
          style={{
            minHeight: "40vh",
            width: "90%",
            marginTop: "50px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "rgb(2, 8, 41)",
            backgroundImage:
              "linear-gradient(to right,rgb(2, 8, 41),#17183B,rgba(72, 92, 245, 0.4))",
            backgroundSize: "cover",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: "40px",
            paddingBottom: "40px",

            paddingRight: "80px",
            gap: "20px",
          }}
        >
          {boards.map((board, index) => (
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "90px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "25px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "50px",
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
                    {board.title}
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
                    {collaboratorNames[board._id]}
                  </Card.Text>
                </div>
                <div style={{ display: "flex", gap: "30px" }}>
                  <Button
                    className="btn2"
                    onClick={() => navigate("/OneBoard", { state: { board } })}
                  >
                    Add Tasks <FaPlus size={20} style={{ marginLeft: "5px" }} />
                  </Button>
                  <Button
                    className="btn1"
                    onClick={() => handleShow(board._id)}
                  >
                    Invite Collaborator
                    <FaPlus size={20} style={{ marginLeft: "5px" }} />
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "25px",
                    }}
                    onClick={() => deleteBoard(board._id)}
                  >
                    🗑️
                  </Button>

                  <div
                    className={`invitemodall ${
                      activeBoardId === board._id ? "show" : ""
                    }`}
                  >
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
                    <h2 style={{ marginTop: "30px", color: "white" }}>
                      Invite Collaborator
                    </h2>
                    <h4
                      style={{
                        marginBottom: "30px",
                        color: "rgb(170, 169, 169)",
                      }}
                    >
                      Enter the email of your collaborator to invite
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
                            Collaborator Email
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={collaboratoremail.email}
                            placeholder="email"
                            onChange={handleCollaborator}
                            id="email"
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
                          <Button
                            className="btn1"
                            onClick={() => inviteToBoard(board._id)}
                          >
                            Invite
                          </Button>
                          <Button className="btn2" onClick={handleClose}>
                            Back
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
              {index < boards.length - 1 && <Divider />}
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}
