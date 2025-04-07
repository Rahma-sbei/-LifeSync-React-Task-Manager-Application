const Board = require("../models/TaskBoards");
const User = require("../models/User");

require("dotenv").config();

//Create a new tasks board
const createTaskBoard = async (req, res) => {
  const { title, users, tasks } = req.body; // get the required input from the request body

  //check the validity of the given input
  try {
    if (!title || !Array.isArray(users) || !Array.isArray(tasks)) {
      return res
        .status(400)
        .json({ msg: "Invalid input. Provide title, users, and tasks." });
    }

    //create a new document
    const newTaskBoard = new Board({
      title,
      users: users,
      tasks,
    });

    await newTaskBoard.save(); //save it in the db

    res.status(201).json({
      taskBoard: newTaskBoard,
      msg: "TaskBoard successfully created",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error while creating TaskBoard", error });
  }
};

//get list of all boards in the db
const getBoards = async (req, res) => {
  try {
    const boards = await Board.find(); //retrieve list of boards
    if (boards) {
      res.status(200).json(boards);
    } else {
      res.status(400).json({
        msg: "No boards found yet",
      });
    }
  } catch (error) {
    console.log("error retrieving tasks", error);
  }
};
// invite a user to a task board by email
const inviteUser = async (req, res) => {
  const boardId = req.params.id; // Get board ID from URL params
  const email = req.body.email; // Get email of user to invite

  try {
    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ msg: "This user does not exist" });
    }

    // Get user ID
    const userId = user._id;
    const board = await Board.findById(boardId); // Find task board by ID

    if (!board) {
      return res.status(404).json({ msg: "Board does not exist" });
    }

    // Check if the user is already part of the board
    if (board.users.includes(userId)) {
      return res.status(400).json({ msg: "User is already in the board" });
    }

    // Add user to the board's users list
    board.users.push(userId);
    await board.save(); // Save updated board

    res.status(200).json({
      board,
      msg: "User successfully added to the board",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error while inviting user", error });
  }
};

// add a new task to an existing task board
const addTask = async (req, res) => {
  const boardId = req.params.id; // Get task board ID
  const task = req.body.task; // Get task data

  try {
    const board = await Board.findById(boardId); // Find the board by ID
    if (!board) {
      return res.status(404).json({ msg: "Board does not exist" });
    }

    // Check if task already exists in the board
    if (board.tasks.includes(task)) {
      return res.status(400).json({ msg: "Task is already in the board" });
    }

    // Add new task to the board
    board.tasks.push(task);
    await board.save(); // Save updated board

    res.status(200).json({
      board,
      msg: "Task successfully added to the board",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error while adding task", error });
  }
};

// get all users in a task board
const getBoardUsers = async (req, res) => {
  const boardId = req.params.id; // get board ID from URL params

  try {
    const board = await Board.findById(boardId); // Find the board in the database by ID
    if (!board) {
      return res.status(404).json({ msg: "Board not found" });
    }

    // get the user names of each user ID in the board's users array
    let names = await Promise.all(
      board.users.map(async (userId) => {
        const user = await User.findById(userId);
        return user?.userName; // Return user name if found
      })
    );
    res.status(200).json(names);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error getting users", error });
  }
};

// get all tasks in a task board
const getBoardTasks = async (req, res) => {
  const boardId = req.params.id; // Get board ID

  try {
    const board = await Board.findById(boardId); // Find board by ID
    if (!board) {
      return res.status(404).json({ msg: "Board not found" });
    }

    res.status(200).json(board.tasks); // Return tasks from the board
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error getting tasks", error });
  }
};
const deleteBoard = async (req, res) => {
  const id = req.params.id;
  try {
    await Board.findByIdAndDelete(id);
    res.status(200).json({ msg: "Board Successfully deleted" });
  } catch (error) {
    res.status(500).json({ msg: "error on deleting task" });
  }
};

module.exports = {
  createTaskBoard,
  inviteUser,
  addTask,
  getBoards,
  getBoardUsers,
  getBoardTasks,
  deleteBoard,
};
