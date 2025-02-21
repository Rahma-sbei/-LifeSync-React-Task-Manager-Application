const express = require("express");
const boardRoute = express.Router();

const {
  createTaskBoard,
  inviteUser,
  addTask,
  getBoards,
  getBoardUsers,
} = require("../controllers/boardController");

boardRoute.get("/boards", getBoards);
boardRoute.get("/boardusers/:id", getBoardUsers);
boardRoute.post("/createboards", createTaskBoard);
boardRoute.patch("/invite/:id", inviteUser);
boardRoute.patch("/addTask/:id", addTask);

module.exports = boardRoute;
