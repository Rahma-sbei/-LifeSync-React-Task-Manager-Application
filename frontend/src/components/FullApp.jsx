import React, { createContext, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NavBar from "./NavBar";
import HomePage from "./HomePage/HomePage";
import Footer from "./Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import TasksPage from "./Tasks/TasksPage";
import MyProfile from "./MyProfile";
import TaskBoard from "./Boards/TaskBoards";
import AllBoards from "./Boards/AllBoards";
import OneBoard from "./Boards/OneBoard";
import Expenses from "./Expenses/Expenses";
import LandingPage from "./LandingPage";
import Admin from "./Admin";
import PrivateRoute from "./PrivateRoute";

export const UserContext = createContext();

export default function FullApp() {
  //routes where navigation bar will not be rendered
  const noNavBarPages = ["/", "/signIn", "/signUp"];
  const [currentUser, setCurrentUser] = useState(null);
  //determine the current location for conditional rendering of the navigation bar
  const location = useLocation();

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div
        style={{
          background: " #080D2A",
          backgroundImage: `
        radial-gradient(ellipse at center top, #1B1B37 0%, rgba(4, 7, 26, 0.2) 50%),
        radial-gradient(ellipse at 60% 50%, #3436A8 0%, rgba(27, 27, 54, 0.15) 70%),
        radial-gradient(ellipse at center bottom, #485CF5 0%, rgba(4, 7, 26, 0.2) 55%),
        radial-gradient(ellipse at 30% 70%, #485CF5 0%, rgba(27, 27, 54, 0.1) 80%),
        radial-gradient(ellipse at 70% 60%, #3436A8 0%, rgba(4, 7, 26, 0.2) 90%)
      `,
          backgroundSize: "cover",
          minHeight: "100vh",
          margin: "0px",
          padding: "0px",
          paddingBottom: "30px",
        }}
      >
        {/*conditional rendering of the navigation bar*/}
        {!noNavBarPages.includes(location.pathname) && <NavBar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Expenses" element={<Expenses />} />
          <Route path="/Tasks" element={<TasksPage />} />
          <Route path="/Profile" element={<MyProfile />} />
          <Route path="/TaskBoard" element={<TaskBoard />} />
          <Route path="/AllBoards" element={<AllBoards />} />
          <Route path="/OneBoard" element={<OneBoard />} />
          <Route path="/AllBoards" element={<AllBoards />} />
          <Route
            path="/Admin"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>

        <Footer />
      </div>
    </UserContext.Provider>
  );
}
