import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Dimg from "../assets/vecteezy_abstract-technology-futuristic-glowing-blue-and-purple-light_11545796.jpg";
import { jwtDecode } from "jwt-decode";
import Pimg from "../assets/bgsc.png";
import { Button } from "react-bootstrap";
import axios from "axios";
import { FaUsers, FaListCheck } from "react-icons/fa6";
import "../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import Divider from "./Divider";
export default function AllBoards() {
  const location = useLocation();

  const [task, setTask] = useState({ task: " " });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [boards, setBoards] = useState([]);
  const [currentUserId, setcurrentUserId] = useState();
  const [collaboratorNames, setCollaboratorNames] = useState({});

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
          const myBoards = res.data.filter((board) =>
            board.users.includes(currentUserId)
          );
          setBoards(myBoards);
          console.log("my Boards", boards);

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
                My Boards
              </Card.Title>
              <Card.Text style={{ color: "rgb(181, 162, 255)" }}>
                See All Your Boards
              </Card.Text>
            </div>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                marginLeft: "50px",
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
                letterSpacing: "2px",
                marginBottom: "3px",
              }}
            >
              List Of Boards
            </Card.Text>
          </div>
          {boards.map((board, index) => (
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "70px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "25px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "90px",
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
                    className="btn1"
                    onClick={() => navigate("/OneBoard", { state: { board } })}
                  >
                    View Task
                  </Button>
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
