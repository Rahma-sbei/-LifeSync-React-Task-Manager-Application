const express = require("express");
const boardRoute = express.Router();

//import function from controller
const {
  createTaskBoard,
  inviteUser,
  addTask,
  getBoards,
  getBoardUsers,
  getBoardTasks,
  deleteBoard,
} = require("../controllers/boardController");

//define routes
boardRoute.get("/boards", getBoards);
boardRoute.get("/boardusers/:id", getBoardUsers);
boardRoute.get("/boardtasks/:id", getBoardTasks);
boardRoute.delete("/boards/:id", deleteBoard);
boardRoute.post("/createboards", createTaskBoard);
boardRoute.patch("/invite/:id", inviteUser);
boardRoute.patch("/addTask/:id", addTask);

module.exports = boardRoute;
