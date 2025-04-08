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

boardRoute.get("/boards", getBoards); //This endpoint returns list of all existing boards
boardRoute.get("/boardusers/:id", getBoardUsers); //This endpoint accepts id from url params, returns list of all user in a board
boardRoute.get("/boardtasks/:id", getBoardTasks); //This endpoint accepts id from url params, returns list of all tasks in a board
boardRoute.delete("/boards/:id", deleteBoard); //This endpoint accepts id from url params, deletes task
boardRoute.post("/createboards", createTaskBoard); //This endpoint accepts task object from request body, creates boqrd
boardRoute.patch("/invite/:id", inviteUser); //This endpoint accepts id from url params, task object from request body
boardRoute.patch("/addTask/:id", addTask); //This endpoint accepts boad id from url params, task object from request body

module.exports = boardRoute;
