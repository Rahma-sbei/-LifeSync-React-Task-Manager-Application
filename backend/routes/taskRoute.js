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

//define endpoints
taskRoute.get("/tasks", getTasks); //This endpoint returns a list of all existing tasks
taskRoute.get("/tasks/:id", getOneTask); //This endpoint accepts id from URL params, returns details of a single task
taskRoute.post("/tasks", postTask); //This endpoint accepts task object from request body, creates a new task
taskRoute.delete("/tasks/:id", deleteTask); //This endpoint accepts id from URL params, deletes a task
taskRoute.patch("/tasks/:id", updateTaskStatus); //This endpoint accepts id from URL params, updates the status of a task

module.exports = taskRoute;
