const express = require("express");
const taskRoute = express.Router();

//import function from controller
const {
  postTask,
  getTasks,
  deleteTask,
  updateTaskStatus,
  getOneTask,
} = require("../controllers/taskController");

//define routes
taskRoute.get("/tasks", getTasks);
taskRoute.get("/tasks/:id", getOneTask);
taskRoute.post("/tasks", postTask);
taskRoute.delete("/tasks/:id", deleteTask);
taskRoute.patch("/tasks/:id", updateTaskStatus);
module.exports = taskRoute;
