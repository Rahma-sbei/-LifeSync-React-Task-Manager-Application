const Board = require("../models/TaskBoards");
const User = require("../models/User");

require("dotenv").config();

const createTaskBoard = async (req, res) => {
  const { title, users, tasks } = req.body;

  try {
    if (!title || !Array.isArray(users) || !Array.isArray(tasks)) {
      return res
        .status(400)
        .json({ msg: "Invalid input. Provide title, users, and tasks." });
    }

    const newTaskBoard = new Board({
      title,
      users: users,
      tasks,
    });

    await newTaskBoard.save();

    res.status(201).json({
      taskBoard: newTaskBoard,
      msg: "TaskBoard successfully created",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error while creating TaskBoard", error });
  }
};
const getBoards = async (req, res) => {
  try {
    const boards = await Board.find();
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
const inviteUser = async (req, res) => {
  const boardId = req.params.id;
  const email = req.body.email;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ msg: "This user does not exist" });
    } else {
      const userId = user._id;
      const board = await Board.findById(boardId);
      if (!board) {
        res.status(404).json({ msg: "Board does not exist" });
      }
      if (board.users.includes(userId)) {
        res.status(400).json({ msg: "User is already in the board" });
      } else {
        board.users.push(userId);

        await board.save();

        res.status(200).json({
          board,
          msg: "User successfully added to the board",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error while inviting user", error });
  }
};
const addTask = async (req, res) => {
  const boardId = req.params.id;
  const task = req.body.task;
  try {
    const board = await Board.findById(boardId);
    if (!board) {
      res.status(404).json({ msg: "Board does not exist" });
    }
    if (board.tasks.includes(task)) {
      res.status(400).json({ msg: "Task is already in the board" });
    } else {
      board.tasks.push(task);

      await board.save();

      res.status(200).json({
        board,
        msg: "Task successfully added to the board",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error while inviting user", error });
  }
};

const getBoardUsers = async (req, res) => {
  const boardId = req.params.id;
  try {
    const board = await Board.findById(boardId);
    if (!board) {
      res.status(404).json({ msg: "Board not found" });
    } else {
      let names = await Promise.all(
        board.users.map(async (userId) => {
          const user = await User.findById(userId);
          return user?.userName;
        })
      );

      res.status(200).json(names);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error getting users", error });
  }
};

module.exports = {
  createTaskBoard,
  inviteUser,
  addTask,
  getBoards,
  getBoardUsers,
};
