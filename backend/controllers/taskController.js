const Task = require("../models/Task");
require("dotenv").config();

//Posting a task to the database
const postTask = async (req, res) => {
  const task = req.body; // get task from body
  try {
    const newTask = new Task(task); //create a new Task document using the given data
    await newTask.save();

    res.status(200).json({ task: newTask, msg: " task successfully added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error on adding task. ", error });
  }
};

//Toggle the status of the task
const updateTaskStatus = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId); // find the task by the given id
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    //toggle the staus of the task
    task.status = task.status === "Incomplete" ? "Complete" : "Incomplete";
    await task.save(); //save changes

    res.status(200).json({ task, msg: "Task status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error updating task status", error });
  }
};

//get list of all tasks in the database
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(400).json({
        msg: "No task found yet",
      });
    }
  } catch (error) {
    console.log("error retrieving tasks", error);
  }
};

//find a specific task based of the given id
const getOneTask = async (req, res) => {
  const taskId = req.params.id; //get id as part of the URL
  try {
    const task = await Task.findById(taskId);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(400).json({
        msg: "No task with this id has been found .",
      });
    }
  } catch (error) {
    console.log("error retrieving tasks", error);
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ msg: "Task Successfully deleted" });
  } catch (error) {
    res.status(500).json({ msg: "error on deleting task" });
  }
};
module.exports = {
  postTask,
  getTasks,
  deleteTask,
  updateTaskStatus,
  getOneTask,
};
