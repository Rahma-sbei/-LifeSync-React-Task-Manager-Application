import React, { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import Divider from "./Divider";
import { Navs, Prof } from "./Navs";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import { FaUser, FaBell, FaBars, FaUserTie } from "react-icons/fa";
import { OffcanvasTitle } from "react-bootstrap";
import { ShowContext } from "../App";

export default function NavBar() {
  const { handleShow, handleClose, show } = useContext(ShowContext);
  const location = useLocation();

  const titles = {
    "/Home": "Home Page",
    "/Tasks": "Tasks Manager",
    "/Profile": " My Profile",
    "/Admin": "Admin Dashboard",
    "/TaskBoard": "Create Task Boards",
    "/AllBoards": "View All Task Boards",
    "/Expenses": "Expenses Manager",
  };
  const currentTitle = titles[location.pathname];
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  const url = "http://localhost:6005/api/users";
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
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
          setRole(res.data.user.role);
        })
        .catch((error) => {
          console.error(error.response.data.msg);
        });
    }
  }, [userId]);

  return (
    <Navbar>
      <Container
        fluid
        style={{
          display: "flex",
          alighnItems: "center",
          justifyContent: "space-between",
          gap: "100px",
          width: "100%",
          padding: "0px 50px",
        }}
      >
        <Navbar.Brand
          style={{ fontSize: "30px", fontWeight: "Bold", color: "white" }}
        >
          {currentTitle}
        </Navbar.Brand>

        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            marginTop: "15px",
            marginRight: "30px",
          }}
        >
          <div
            style={{
              marginLeft: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {role === "admin" && (
              <Link to="/Admin" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined-dark"
                  style={{
                    outline: "none",
                    paddingTop: "10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {" "}
                    <FaUserTie
                      size={18}
                      style={{ color: "white", marginRight: "10px" }}
                    />
                    <Form.Text
                      style={{
                        color: "white",
                        marginBottom: "6px",
                        fontWeight: "bold",
                        fontSize: "17px",
                      }}
                    >
                      Admin Dashboard
                    </Form.Text>
                  </div>
                </Button>
              </Link>
            )}
            <Link to="/Profile" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined-dark"
                style={{
                  outline: "none",
                  paddingTop: "10px",
                  border: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FaUser
                    size={18}
                    style={{ color: "white", marginRight: "10px" }}
                  />
                  <Form.Text
                    style={{
                      color: "white",
                      marginBottom: "6px",
                      fontWeight: "bold",
                      fontSize: "17px",
                    }}
                  >
                    My Profile
                  </Form.Text>
                </div>
              </Button>
            </Link>

            <Button
              variant="outlined-dark"
              style={{
                outline: "none",
              }}
              onClick={handleShow}
            >
              <FaBars size={18} style={{ color: "white" }} />
            </Button>

            <Offcanvas
              show={show}
              onHide={handleClose}
              data-bs-theme="dark"
              placement="end"
              style={{
                background: "rgba(15, 21, 53, 0.8)",
                borderRadius: "10px",
                borderTopLeftRadius: "50px",
                borderBottomLeftRadius: "50px",
                width: "300px",
                marginRight: "20px",
                height: "100vh",
              }}
            >
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <OffcanvasTitle
                style={{
                  color: "white",
                  marginTop: "10px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginLeft: "40px",
                  letterSpacing: "3px",
                  marginBottom: "10px",
                  paddingBottom: "0px",
                }}
              >
                Pages
              </OffcanvasTitle>

              <Offcanvas.Body style={{ paddingTop: "3px" }}>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "95%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                      marginTop: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    {Navs.map((navItem) => (
                      <Link
                        to={navItem.path}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="outlined-dark"
                          className="button"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                          onClick={handleClose}
                        >
                          <div>{navItem.icon}</div>
                          <span
                            style={{ fontSize: "16px", fontWeight: "bold" }}
                          >
                            {navItem.title}
                          </span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                  <Divider />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <OffcanvasTitle
                      style={{
                        color: "white",
                        marginTop: "20px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginLeft: "30px",
                        letterSpacing: "3px",
                        marginBottom: "20px",
                      }}
                    >
                      Account Pages
                    </OffcanvasTitle>
                    {Prof.map((profItem) => (
                      <Link
                        to={profItem.path}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="outlined-dark"
                          className="button"
                          onClick={handleClose}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <div>{profItem.icon}</div>
                          <span
                            style={{ fontSize: "16px", fontWeight: "bold" }}
                          >
                            {profItem.title}
                          </span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </Offcanvas.Body>
            </Offcanvas>

            <NavDropdown
              title={<FaBell size={18} style={{ color: "white" }} />}
              drop="start"
              className="custom-dropdown"
            >
              {[...Array(5)].map((_, index) => (
                <>
                  <NavDropdown.Item style={{ color: "white" }}>
                    Dummy Data
                  </NavDropdown.Item>
                  <NavDropdown.Divider style={{ color: "white" }} />
                </>
              ))}
            </NavDropdown>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
